// Validasi materi saat build: kalau ada data yang rusak, build GAGAL dan situs tidak diterbitkan.
// Pesan error menyebut matkul, pertemuan, dan lokasi datanya supaya mudah dicari di sumber/.
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

// Gambar materi ada di web/public/materi/...; build gagal kalau berkasnya tidak ada
const IMG = /^materi\/[a-z0-9/_-]+\.(webp|png|jpg)$/;
const imgOk = src => IMG.test(String(src)) && fs.existsSync(path.resolve(process.cwd(), 'public', String(src)));

// Jenis blok yang dikenali mesin (objek R di src/scripts/engine.js)
export const BLOCK_TYPES = ['text', 'article', 'ayat', 'code', 'playground', 'callout', 'cards', 'list', 'flow', 'row', 'tabs', 'choices', 'table', 'diagram', 'steps', 'shot', 'symbols', 'cara', 'reveal', 'say', 'detective', 'terminal', 'sql-lab', 'trace-lab', 'lab-5k', 'lab-imbuhan', 'lab-kalimat', 'lab-kalimat-en', 'lab-jam', 'lab-rute', 'exercise'];

const str = z.string().trim().min(1, 'tidak boleh kosong');
const optValue = o => (o && typeof o === 'object' ? o.value : o);

const Block = z.lazy(() => z.looseObject({
  type: z.enum(BLOCK_TYPES, { error: i => `jenis blok "${i.input}" tidak dikenal (yang ada: ${BLOCK_TYPES.join(', ')})` }),
  blocks: z.array(Block).optional(),
  tabs: z.array(z.looseObject({ blocks: z.array(Block).optional() })).optional()
}).superRefine((b, ctx) => {
  if (b.type === 'exercise') (b.rows || []).forEach((r, ri) => (r.fields || []).forEach((f, fi) => {
    if (Array.isArray(f.options) && f.answer != null && !f.options.map(optValue).includes(f.answer))
      ctx.addIssue({ code: 'custom', path: ['rows', ri, 'fields', fi, 'answer'], message: `jawaban "${f.answer}" tidak ada di pilihan (${f.options.map(optValue).join(' / ')})` });
  }));
  if (b.type === 'shot' && !imgOk(b.src)) ctx.addIssue({ code: 'custom', path: ['src'], message: `gambar "${b.src}" tidak ada (taruh di web/public/materi/<matkul>/<pN>/nama.webp)` });
  if (b.type === 'steps') (b.items || []).forEach((x, i) => { if (x && x.img && !imgOk(x.img.src)) ctx.addIssue({ code: 'custom', path: ['items', i, 'img', 'src'], message: `gambar "${x.img.src}" tidak ada di web/public` }); });
  if (b.type === 'symbols' && !(Array.isArray(b.groups) && b.groups.length && b.groups.every(g => Array.isArray(g.headers) && Array.isArray(g.rows) && g.rows.every(r => r && typeof r.svg === 'string' && typeof r.name === 'string')))) ctx.addIssue({ code: 'custom', path: ['groups'], message: 'symbols butuh groups[] berisi headers[] dan rows[] { svg, name }' });
  if (b.type === 'cara') (b.tabs || []).forEach((t, ti) => ['klik', 'query'].forEach(k => ((t && t[k] && t[k].imgs) || []).forEach((im, ii) => { if (!imgOk(im && im.src)) ctx.addIssue({ code: 'custom', path: ['tabs', ti, k, 'imgs', ii], message: `gambar "${im && im.src}" tidak ada di web/public` }); })));
  if (b.type === 'steps' && !(Array.isArray(b.items) && b.items.length && b.items.every(x => x && typeof x.title === 'string'))) ctx.addIssue({ code: 'custom', path: ['items'], message: 'steps butuh items berisi { title }' });
  if (b.type === 'trace-lab') {
    if (!Array.isArray(b.cases) || !b.cases.length) ctx.addIssue({ code: 'custom', path: ['cases'], message: 'trace-lab butuh minimal 1 kasus' });
    else b.cases.forEach((c, ci) => {
      if (!Array.isArray(c.panes) || !c.panes.length || c.panes.some(p => !Array.isArray(p.code) || !Array.isArray(p.steps) || !p.steps.length))
        ctx.addIssue({ code: 'custom', path: ['cases', ci, 'panes'], message: 'setiap panel butuh code[] dan steps[]' });
      Object.entries(c.asks || {}).forEach(([k, a]) => {
        if (!Array.isArray(a.opts) || a.ans < 0 || a.ans >= a.opts.length) ctx.addIssue({ code: 'custom', path: ['cases', ci, 'asks', k], message: 'jawaban di luar pilihan' });
      });
    });
  }
  if (b.type === 'diagram' && typeof b.svg !== 'string') ctx.addIssue({ code: 'custom', path: ['svg'], message: 'diagram butuh svg (string)' });
}));

const Quiz = z.looseObject({
  q: str,
  opts: z.array(z.string()).min(2, 'minimal 2 opsi'),
  ans: z.number().int('ans harus bilangan bulat'),
  exp: z.string().optional(),
  optExp: z.array(z.string()).optional()
}).superRefine((q, ctx) => {
  if (q.ans < 0 || q.ans >= q.opts.length) ctx.addIssue({ code: 'custom', path: ['ans'], message: `ans = ${q.ans}, padahal opsinya hanya ${q.opts.length} (0–${q.opts.length - 1})` });
  if (q.optExp && q.optExp.length !== q.opts.length) ctx.addIssue({ code: 'custom', path: ['optExp'], message: `optExp ada ${q.optExp.length}, opts ada ${q.opts.length}` });
  if (new Set(q.opts.map(o => o.trim())).size !== q.opts.length) ctx.addIssue({ code: 'custom', path: ['opts'], message: 'ada opsi yang kembar' });
});

const Flashcard = z.looseObject({ q: str, a: str, tag: z.string().optional() });

const Referensi = z.object({
  judul: str,
  url: z.url({ protocol: /^https$/, error: 'url harus https://' }).nullable(),
  sumber: str,
  bahasa: z.enum(['ID', 'EN', 'AR']),
  ket: z.string().optional(),
  bagian: z.string().optional()
});

// Judul bagian di tab Materi (termasuk blok di dalam row/tabs), untuk mencocokkan "bagian" referensi
export function sectionTitles(m) {
  const t = [];
  const walk = list => (Array.isArray(list) ? list : []).forEach(b => {
    if (!b || typeof b !== 'object') return;
    if (typeof b.title === 'string') t.push(b.title);
    if (b.type === 'row') walk(b.blocks);
    if (b.type === 'tabs') (b.tabs || []).forEach(x => walk(x.blocks));
  });
  walk(m.materi);
  return t;
}

const Meeting = z.looseObject({
  id: z.string().regex(/^[a-z0-9-]+$/, 'id hanya huruf kecil, angka, dan "-"'),
  nomor: z.number().int().positive(),
  judul: str,
  ujian: str,
  materi: z.array(Block).optional(),
  cheatsheet: z.array(Block),
  simulator: z.array(Block),
  flashcards: z.array(Flashcard),
  quiz: z.array(Quiz),
  referensi: z.array(Referensi).optional()
}).superRefine((m, ctx) => {
  const titles = sectionTitles(m);
  (m.referensi || []).forEach((r, i) => {
    if (r.bagian && !titles.some(t => t.includes(r.bagian))) ctx.addIssue({ code: 'custom', path: ['referensi', i, 'bagian'], message: `tidak ada bagian Materi yang judulnya memuat "${r.bagian}"` });
  });
});

const Course = z.looseObject({
  id: z.string().regex(/^[a-z0-9-]+$/, 'id hanya huruf kecil, angka, dan "-"'),
  nama: str,
  meetings: z.array(Meeting).min(1, 'belum ada pertemuan')
}).superRefine((c, ctx) => {
  const seen = new Set();
  c.meetings.forEach((m, i) => { if (seen.has(m.id)) ctx.addIssue({ code: 'custom', path: ['meetings', i, 'id'], message: `id pertemuan "${m.id}" dipakai dua kali` }); seen.add(m.id); });
});

const Library = z.array(Course).superRefine((lib, ctx) => {
  const seen = new Set();
  lib.forEach((c, i) => { if (seen.has(c.id)) ctx.addIssue({ code: 'custom', path: [i, 'id'], message: `id matkul "${c.id}" dipakai dua kali` }); seen.add(c.id); });
});

// Ubah path zod (mis. [2,'meetings',3,'quiz',4,'ans']) jadi "AIK › P4 › quiz[4].ans"
function where(lib, path) {
  const out = []; let i = 0;
  const c = lib[path[0]]; out.push(c && c.nama ? c.nama : `matkul[${path[0]}]`); i = 1;
  if (path[1] === 'meetings') { const m = c && c.meetings && c.meetings[path[2]]; out.push(m && m.nomor ? `P${m.nomor}` : `meetings[${path[2]}]`); i = 3; }
  const rest = path.slice(i).map(p => (typeof p === 'number' ? `[${p}]` : '.' + p)).join('').replace(/^\./, '');
  return out.join(' › ') + (rest ? ' › ' + rest : '');
}

export function validateLibrary(lib) {
  const r = Library.safeParse(lib);
  if (r.success) return [];
  return r.error.issues.map(is => `${where(lib, is.path)}: ${is.message}`);
}

// Kunci referensi.js harus menunjuk pertemuan yang ada (salah ketik id tidak boleh diam-diam hilang)
export function validateReferensiKeys(lib, refs) {
  const ada = new Set(lib.flatMap(c => c.meetings.map(m => `${c.id}/${m.id}`)));
  return Object.keys(refs || {}).filter(k => !ada.has(k)).map(k => `referensi.js: kunci "${k}" tidak cocok dengan pertemuan mana pun`);
}
