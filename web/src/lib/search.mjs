// Indeks "Cari cepat": satu file JSON per mata kuliah (data/cari/<id-matkul>.json).
// Isinya potongan teks pendek dari Materi, Cheat Sheet, Simulator, Flashcard, dan Kuis,
// masing-masing dengan alamat bagiannya, supaya hasil pencarian bisa langsung dilompati.
import { library } from './library.mjs';

const arr = x => (Array.isArray(x) ? x : []);
// Kunci yang isinya bukan teks bacaan (gambar, warna, kode SVG, data awal lab, dsb.)
const SKIP = new Set(['type', 'tone', 'svg', 'src', 'w', 'h', 'minw', 'id', 'target', 'row', 'col', 'style', 'icon', 'profile', 'seed', 'setup', 'url', 'img', 'alt', 'pill', 'starter', 'solution', 'solusi', 'html_starter', 'behavior', 'check', 'tests', 'mode', 'grid', 'answerKey', 'ans']);
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
const plain = s => String(s)
  .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(#?\w+);/g, (m, e) => ENT[e] ?? (e[0] === '#' ? String.fromCharCode(e[1] === 'x' ? parseInt(e.slice(2), 16) : +e.slice(1)) : m))
  .replace(/\*\*|`/g, '')
  .replace(/\s+/g, ' ')
  .trim();
const MAX = 320;
// Kode program/SQL/keluaran terminal ditampilkan apa adanya (bukan HTML): jangan buang teks di antara < dan >
const RAW = new Set(['code', 'sql', 'cmd', 'res', 'preview', 'output', 'cpp', 'js', 'css']);
function rawPieces(s) {
  const out = []; let cur = '';
  String(s).split(/\n/).map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean).forEach(l => {
    if (cur && (cur + ' ' + l).length > MAX) { out.push(cur); cur = l; } else cur = cur ? cur + ' ' + l : l;
  });
  if (cur) out.push(cur);
  return out;
}
// Teks panjang (artikel materi) dipecah per paragraf/butir, lalu per kalimat bila masih kepanjangan
function pieces(s) {
  const out = [];
  String(s).split(/<\/p>|<\/li>|<br\s*\/?>|<\/h\d>|<\/tr>|\n{2,}/i).map(plain).filter(Boolean).forEach(p => {
    if (p.length <= MAX) return out.push(p);
    let cur = '';
    p.split(/(?<=[.!?])\s+/).forEach(k => { if (cur && (cur + ' ' + k).length > MAX) { out.push(cur); cur = k; } else cur = cur ? cur + ' ' + k : k; });
    if (cur) out.push(cur);
  });
  return out;
}
// Ambil semua teks dari satu blok. Baris tabel (array berisi teks) digabung jadi satu potongan.
function blockTexts(def) {
  const out = [];
  const walk = (v, key) => {
    if (v == null) return;
    // id biasanya pengenal internal (tanpa spasi), tapi blok say memakai id untuk terjemahan yang tampil: indeks bila berupa kalimat
    if (key === 'id' && typeof v === 'string' && /\s/.test(v.trim())) { pieces(v).forEach(p => out.push(p)); return; }
    if (SKIP.has(key)) return;
    if (typeof v === 'string') { (RAW.has(key) ? rawPieces(v) : pieces(v)).forEach(p => out.push(p)); return; }
    if (typeof v === 'number' || typeof v === 'boolean') return;
    if (Array.isArray(v)) {
      if (v.length && v.every(x => typeof x === 'string' || typeof x === 'number')) { const p = plain(v.join(' · ')); if (p) out.push(...(p.length > MAX * 2 ? v.flatMap(x => pieces(String(x))) : [p])); return; }
      v.forEach(x => walk(x, key));
      return;
    }
    if (typeof v === 'object') {
      // Pilihan jawaban latihan: cukup jawaban benarnya
      if (Array.isArray(v.options) && 'answer' in v) { walk(v.answer, 'answer'); return; }
      // Selain pilihan jawaban latihan (sudah ditangani di atas), options berisi penjelasan (mis. blok choices): ikut diindeks
      Object.entries(v).forEach(([k, x]) => walk(x, k));
    }
  };
  walk(def, '');
  // Buang duplikat dan potongan yang terlalu pendek untuk berguna
  const seen = new Set();
  return out.filter(p => p.length >= 3 && !/^[\d\s.:·,-]+$/.test(p) && !seen.has(p) && seen.add(p));
}
const titleOf = d => plain(d && (d.title || d.label || d.heading) || '');

// Bentuk indeks: { m: [[id, nomor, judul], …], t: { "<mi>.<tab>.<bi>": judul }, e: [[mi, tab, bi, teks], …] }
// tab: l = materi, c = cheat sheet, s = simulator, f = flashcard, q = kuis
export function courseIndex(c) {
  const meetings = [], titles = {}, entries = [];
  c.meetings.forEach((m, mi) => {
    meetings.push([m.id, m.nomor, plain(m.judul || '')]);
    const add = (tab, bi, title, texts) => {
      if (title) titles[`${mi}.${tab}.${bi}`] = title;
      texts.forEach(t => { if (t !== title) entries.push([mi, tab, bi, t]); });
    };
    [['l', m.materi], ['c', m.cheatsheet], ['s', m.simulator]].forEach(([tab, blocks]) =>
      arr(blocks).forEach((b, bi) => add(tab, bi, titleOf(b), blockTexts(b))));
    arr(m.flashcards).forEach((f, i) => { if (f && (f.q || f.a)) entries.push([mi, 'f', i, plain(`${f.q || ''} → ${f.a || ''}`)]); });
    arr(m.quiz).forEach((q, i) => {
      if (!q || !Array.isArray(q.opts)) return;
      const a = Number(q.ans) >= 0 && Number(q.ans) < q.opts.length ? q.opts[Number(q.ans)] : '';
      entries.push([mi, 'q', i, plain(`${q.q || ''} → ${a}${q.exp ? ' — ' + q.exp : ''}`)]);
    });
  });
  return { m: meetings, t: titles, e: entries };
}
export const searchPaths = () => library.map(c => ({ params: { course: c.id }, props: { course: c } }));
