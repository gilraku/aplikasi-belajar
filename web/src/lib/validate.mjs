// Validasi materi saat build: kalau ada data yang rusak, build GAGAL dan situs tidak diterbitkan.
// Pesan error menyebut matkul, pertemuan, dan lokasi datanya supaya mudah dicari di sumber/.
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

// Gambar materi ada di web/public/materi/...; build gagal kalau berkasnya tidak ada
const IMG = /^materi\/[a-z0-9/_-]+\.(webp|png|jpg)$/;
const imgOk = src => IMG.test(String(src)) && fs.existsSync(path.resolve(process.cwd(), 'public', String(src)));

// Jenis blok yang dikenali mesin (objek R di src/scripts/engine.js)
export const BLOCK_TYPES = ['text', 'article', 'ayat', 'code', 'playground', 'callout', 'cards', 'list', 'flow', 'row', 'tabs', 'choices', 'table', 'diagram', 'steps', 'shot', 'symbols', 'cara', 'reveal', 'say', 'detective', 'terminal', 'sql-lab', 'trace-lab', 'algo-lab', 'lab-5k', 'lab-imbuhan', 'lab-kalimat', 'lab-kalimat-en', 'lab-jam', 'lab-rute', 'lab-bedah', 'adegan', 'penelusur', 'bertahap', 'kode-jelas', 'exercise'];

const str = z.string().trim().min(1, 'tidak boleh kosong');
const optValue = o => (o && typeof o === 'object' ? o.value : o);
const normKal = s => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();
function canBuildKalimat(it, target) {
  const want = normKal(target), toks = it.tokens || [], alt = it.alt || {};
  const reach = (i, acc) => i === toks.length ? normKal(acc.join(' ')) === want
    : ['', toks[i], ...(alt[i] || [])].some(w => reach(i + 1, w ? acc.concat(w) : acc));
  return reach(0, []);
}

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
  if (b.type === 'algo-lab') {
    const ALGO = { linear: 'cari', biner: 'cari-urut', bubble: '', selection: '', insertion: '', merge: '', quick: '', stack: 'ops:pop', queue: 'ops:deq', linked: 'list', bigo: 'n', array1d: '', array2d: 'matriks', rekursi: 'satu', bst: 'kunci', hash: 'kunci', bfs: 'graf', dfs: 'graf' };
    const d = b.data, int = v => Number.isInteger(v) && v >= 0 && v <= 99, kind = ALGO[b.algo] || '';
    if (!(b.algo in ALGO)) ctx.addIssue({ code: 'custom', path: ['algo'], message: `algo "${b.algo}" tidak dikenal (yang ada: ${Object.keys(ALGO).join(', ')})` });
    if (kind.startsWith('ops:')) {
      const word = kind.slice(4);
      if (!Array.isArray(d) || d.length < 3 || d.length > 10 || !d.every(v => int(v) || v === word) || !d.some(int)) ctx.addIssue({ code: 'custom', path: ['data'], message: `${b.algo} butuh 3–10 perintah: bilangan 0–99 (masuk) atau "${word}" (keluar), minimal satu bilangan` });
    } else if (kind === 'n') {
      if (!Array.isArray(d) || d.length < 2 || d.length > 5 || !d.every(v => Number.isInteger(v) && v >= 1 && v <= 64) || d.some((v, i) => i && d[i - 1] >= v)) ctx.addIssue({ code: 'custom', path: ['data'], message: 'bigo butuh 2–5 nilai n (1–64), urut naik tanpa kembar' });
    } else if (kind === 'matriks') {
      if (!Array.isArray(d) || d.length < 2 || d.length > 4 || !d.every(r => Array.isArray(r) && r.length === d[0].length && r.length >= 2 && r.length <= 5 && r.every(int))) ctx.addIssue({ code: 'custom', path: ['data'], message: 'array2d butuh 2–4 baris, tiap baris 2–5 bilangan 0–99 dengan panjang sama' });
    } else if (kind === 'satu') {
      if (!Array.isArray(d) || d.length !== 1 || !Number.isInteger(d[0]) || d[0] < 1 || d[0] > 7) ctx.addIssue({ code: 'custom', path: ['data'], message: 'rekursi butuh data [n] dengan n 1–7' });
    } else if (kind === 'kunci') {
      if (!Array.isArray(d) || d.length < 3 || d.length > 8 || !d.every(int)) ctx.addIssue({ code: 'custom', path: ['data'], message: `${b.algo} butuh 3–8 bilangan bulat 0–99` });
      if (!int(b.target)) ctx.addIssue({ code: 'custom', path: ['target'], message: `${b.algo} butuh target (angka yang dicari, 0–99)` });
    } else if (kind === 'graf') {
      const ok = Array.isArray(d) && d.length >= 2 && d.length <= 12 && d.every(e => /^[A-H]-[A-H]$/.test(e) && e[0] !== e[2]);
      if (!ok) ctx.addIssue({ code: 'custom', path: ['data'], message: `${b.algo} butuh 2–12 sisi berbentuk "A-B" (huruf A–H, dua huruf berbeda)` });
      if (!(typeof b.target === 'string' && /^[A-H]$/.test(b.target) && ok && d.some(e => e.includes(b.target)))) ctx.addIssue({ code: 'custom', path: ['target'], message: `${b.algo} butuh target berupa huruf simpul awal yang ada di sisi-sisinya` });
    } else if (kind === 'list') {
      if (!Array.isArray(d) || d.length < 2 || d.length > 6 || !d.every(int)) ctx.addIssue({ code: 'custom', path: ['data'], message: 'linked butuh 2–6 bilangan bulat 0–99' });
      if (!int(b.target)) ctx.addIssue({ code: 'custom', path: ['target'], message: 'linked butuh target (angka yang dihapus, 0–99)' });
    } else if (!Array.isArray(d) || d.length < 3 || d.length > 8 || !d.every(int)) ctx.addIssue({ code: 'custom', path: ['data'], message: 'algo-lab butuh data 3–8 bilangan bulat 0–99' });
    else if (ALGO[b.algo] === 'cari-urut' && d.some((v, i) => i && d[i - 1] > v)) ctx.addIssue({ code: 'custom', path: ['data'], message: 'data pencarian biner harus sudah urut naik' });
    if ((kind === 'cari' || kind === 'cari-urut') && !int(b.target)) ctx.addIssue({ code: 'custom', path: ['target'], message: 'algoritma pencarian butuh target (bilangan bulat 0–99)' });
  }
  if (b.type === 'diagram' && typeof b.svg !== 'string') ctx.addIssue({ code: 'custom', path: ['svg'], message: 'diagram butuh svg (string)' });
  if (b.type === 'lab-5k' && !(Array.isArray(b.cols) && b.cols.length && Array.isArray(b.rows) && b.rows.length && Array.isArray(b.contexts) && b.contexts.length))
    ctx.addIssue({ code: 'custom', path: ['rows'], message: 'lab-5k butuh cols[], rows[], dan contexts[]' });
  if (b.type === 'lab-imbuhan' && !(Array.isArray(b.affixes) && b.affixes.length && Array.isArray(b.rules) && b.rules.length))
    ctx.addIssue({ code: 'custom', path: ['affixes'], message: 'lab-imbuhan butuh affixes[] dan rules[]' });
  if (b.type === 'lab-kalimat') {
    if (!Array.isArray(b.items) || !b.items.length) ctx.addIssue({ code: 'custom', path: ['items'], message: 'lab-kalimat butuh minimal 1 kalimat di items[]' });
    else b.items.forEach((it, ii) => {
      if (!Array.isArray(it.tokens) || !it.tokens.length || !Array.isArray(it.accept) || !it.accept.length)
        ctx.addIssue({ code: 'custom', path: ['items', ii], message: 'setiap item lab-kalimat butuh tokens[] dan accept[]' });
      else it.accept.forEach((a, ai) => {
        if (!a || !a.text || !canBuildKalimat(it, a.text))
          ctx.addIssue({ code: 'custom', path: ['items', ii, 'accept', ai, 'text'], message: `kalimat "${a && a.text}" tidak bisa dibentuk dari tokens[] dan alt{}` });
      });
    });
  }
  if (b.type === 'lab-kalimat-en' && !((Array.isArray(b.verbs) && b.verbs.length) || (Array.isArray(b.nouns) && b.nouns.length)))
    ctx.addIssue({ code: 'custom', path: ['verbs'], message: 'lab-kalimat-en butuh verbs[] atau nouns[]' });
  if (b.type === 'lab-jam' && (typeof b.start !== 'number' || !Array.isArray(b.presets) || !b.presets.length))
    ctx.addIssue({ code: 'custom', path: ['presets'], message: 'lab-jam butuh start (angka) dan presets[]' });
  if (b.type === 'adegan') {
    if (typeof b.scene !== 'string' || !/^[a-z0-9-]+$/.test(b.scene)) ctx.addIssue({ code: 'custom', path: ['scene'], message: 'adegan butuh scene berupa id adegan (huruf kecil, angka, tanda -)' });
    if (!Array.isArray(b.steps) || b.steps.some(x => !x || typeof x.sorot !== 'string' || typeof x.html !== 'string')) ctx.addIssue({ code: 'custom', path: ['steps'], message: 'setiap langkah adegan butuh { sorot, html }' });
    if (b.pilih !== undefined && (!b.pilih || !Array.isArray(b.pilih.opsi) || b.pilih.opsi.length < 2 || b.pilih.opsi.some(o => !o || typeof o.v !== 'string' || typeof o.t !== 'string')))
      ctx.addIssue({ code: 'custom', path: ['pilih'], message: 'pilih butuh opsi[] (minimal 2), masing-masing { v, t } berupa teks' });
  }
  if (b.type === 'penelusur') {
    if (!Array.isArray(b.nodes) || b.nodes.length !== 2) ctx.addIssue({ code: 'custom', path: ['nodes'], message: 'penelusur butuh tepat 2 simpul di nodes[]' });
    if (!Array.isArray(b.steps) || !b.steps.length || b.steps.some(x => !x || typeof x.say !== 'string')) ctx.addIssue({ code: 'custom', path: ['steps'], message: 'penelusur butuh minimal 1 langkah, masing-masing dengan say' });
  }
  if (b.type === 'bertahap') {
    if (typeof b.svg !== 'string' || !b.svg.includes('<svg')) ctx.addIssue({ code: 'custom', path: ['svg'], message: 'bertahap butuh svg berupa teks <svg>' });
    if (!Array.isArray(b.steps) || b.steps.length < 2 || b.steps.length > 7 || b.steps.some(x => !x || typeof x.t !== 'string' || typeof x.html !== 'string'))
      ctx.addIssue({ code: 'custom', path: ['steps'], message: 'bertahap butuh 2–7 langkah { t, html }' });
    else if (typeof b.svg === 'string') b.steps.forEach((x, i) => { if (!new RegExp('data-s="[^"]*\\b' + (i + 1) + '\\b').test(b.svg)) ctx.addIssue({ code: 'custom', path: ['steps', i], message: `langkah ${i + 1} tidak menyalakan bagian SVG mana pun (data-s)` }); });
  }
  if (b.type === 'kode-jelas') {
    const kode = b.kode;
    if (!Array.isArray(kode) || !kode.length || kode.some(x => typeof x !== 'string')) ctx.addIssue({ code: 'custom', path: ['kode'], message: 'kode-jelas butuh kode[] berupa baris teks' });
    else {
      if (!Array.isArray(b.catatan) || !b.catatan.length) ctx.addIssue({ code: 'custom', path: ['catatan'], message: 'kode-jelas butuh minimal 1 catatan' });
      else {
        const seen = new Set();
        b.catatan.forEach((x, i) => {
          if (!x || typeof x.judul !== 'string' || typeof x.arti !== 'string' || !Array.isArray(x.at) || !x.at.length || x.at.some(l => !Number.isInteger(l) || l < 0 || l >= kode.length || seen.has(l)))
            ctx.addIssue({ code: 'custom', path: ['catatan', i], message: 'catatan butuh { at: [indeks baris yang ada, tidak dipakai catatan lain], judul, arti }' });
          (x && Array.isArray(x.at) ? x.at : []).forEach(l => seen.add(l));
        });
      }
      if (b.urut !== undefined && (!Array.isArray(b.urut) || b.urut.length !== kode.length || !Array.isArray(b.urutan)))
        ctx.addIssue({ code: 'custom', path: ['urut'], message: 'urut harus sepanjang kode[] dan butuh urutan[] (nama tiap langkah)' });
      else if (b.urut !== undefined && b.urut.some(u => !Number.isInteger(u) || u < 1 || u > b.urutan.length))
        ctx.addIssue({ code: 'custom', path: ['urut'], message: `urut berisi nomor langkah 1–${b.urutan.length} (mulai dari 1, sesuai urutan[])` });
    }
    if (!b.inti || typeof b.inti !== 'object') ctx.addIssue({ code: 'custom', path: ['inti'], message: 'kode-jelas butuh inti { judul, html } (tampil sebelum ada baris yang diklik)' });
  }
  if (b.type === 'lab-bedah') {
    if (!Array.isArray(b.items) || !b.items.length) ctx.addIssue({ code: 'custom', path: ['items'], message: 'lab-bedah butuh minimal 1 kalimat di items[]' });
    else b.items.forEach((it, ii) => {
      const ch = it && it.chunks;
      if (!Array.isArray(ch) || ch.filter(x => x.f === 'P').length !== 1 || ch.filter(x => x.f === 'S').length !== 1 || !ch.every(x => typeof x.t === 'string' && ['S', 'P', 'O', 'Pel', 'K'].includes(x.f) && (x.f !== 'K' || x.k === undefined || ['waktu', 'tempat', 'cara', 'alat', 'tujuan', 'sebab', 'penyerta'].includes(x.k))))
        ctx.addIssue({ code: 'custom', path: ['items', ii], message: 'setiap item lab-bedah butuh chunks[] {t, f} dengan tepat satu S dan satu P; k (jenis) pada K harus dari daftar tombol atau dikosongkan' });
    });
  }
  if (b.type === 'lab-rute' && !(typeof b.start === 'number' && typeof b.money === 'number' && typeof b.due === 'number' && Array.isArray(b.routes) && b.routes.length && b.routes.every(r => r && typeof r.label === 'string' && typeof r.cost === 'number' && typeof r.mins === 'number' && typeof r.say === 'string')))
    ctx.addIssue({ code: 'custom', path: ['routes'], message: 'lab-rute butuh start, money, due, dan routes[] { label, cost, mins, say }' });
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
