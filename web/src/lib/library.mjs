// Membaca materi dari ../sumber persis seperti build.js (format data tidak berubah),
// lalu memecahnya: indeks ringan untuk beranda + satu file JSON per pertemuan.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const SUMBER = path.resolve(process.cwd(), '../sumber');
const require = createRequire(path.join(SUMBER, 'build.js'));
const B = require('./build.js');

// Referensi & bacaan lanjut (sumber/referensi.js) digabung ke salinan data, sehingga format sumber/ dan offline.html tetap sama
const REFS = require('./referensi.js');
const lib = B.lib.map(c => Object.assign({}, c, { meetings: c.meetings.map(m => (REFS[`${c.id}/${m.id}`] ? Object.assign({}, m, { referensi: REFS[`${c.id}/${m.id}`] }) : m)) }));

import { validateLibrary, validateReferensiKeys } from './validate.mjs';
const problems = [...validateReferensiKeys(B.lib, REFS), ...validateLibrary(lib)];
if (problems.length) {
  throw new Error(`Data materi tidak valid (${problems.length} masalah):\n  - ` + problems.slice(0, 30).join('\n  - ') + (problems.length > 30 ? `\n  … dan ${problems.length - 30} lagi` : ''));
}

export const library = lib;
export const prompt = B.prompt;
// offline.html berdiri sendiri: gambar materi (web/public/materi/…) disisipkan sebagai data URI
const IMG_REF = /"(materi\/[a-z0-9/_-]+\.(webp|png|jpg))"/g;
const MIME = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg' };
export function inlineImages(library) {
  const json = JSON.stringify(library).replace(IMG_REF, (m, src, ext) =>
    JSON.stringify(`data:${MIME[ext]};base64,` + fs.readFileSync(path.resolve(process.cwd(), 'public', src)).toString('base64')));
  return JSON.parse(json);
}
export const renderOffline = o => B.render(Object.assign({}, o, { library: inlineImages(o.library) }));
export const semester = 'Semester 1';

// Sama dengan aturan di mesin (availableTabs & countInteractive), supaya % kesiapan di beranda tetap benar
const arr = x => (Array.isArray(x) ? x : []);
const INTERACTIVE = new Set(['say', 'diagram', 'steps', 'shot', 'table', 'choices', 'reveal', 'tabs', 'detective', 'terminal', 'sql-lab', 'trace-lab', 'exercise', 'playground']);
function countInteractive(m) {
  let n = 0;
  const walk = list => arr(list).forEach(b => {
    if (!b || typeof b !== 'object') return;
    if (INTERACTIVE.has(b.type) && !(b.type === 'table' && !arr(b.modes).length && !arr(b.headers).some(h => h && h.note))) n++;
    if (b.type === 'row') walk(b.blocks);
    if (b.type === 'tabs') arr(b.tabs).forEach(t => walk(t.blocks));
  });
  walk(m.materi); walk(m.cheatsheet); walk(m.simulator);
  return n;
}
const validQuiz = m => arr(m.quiz).filter(q => q && Array.isArray(q.opts) && q.opts.length >= 2);
const validFc = m => arr(m.flashcards).filter(f => f && (f.q || f.a));
function summary(m) {
  const tabs = [];
  if (arr(m.materi).length) tabs.push('materi');
  if (arr(m.cheatsheet).length) tabs.push('cheatsheet');
  if (arr(m.simulator).length) tabs.push('simulator');
  const fc = validFc(m).length, quiz = validQuiz(m);
  if (fc) tabs.push('flashcard');
  if (quiz.length) tabs.push('quiz');
  return { tabs, ni: countInteractive(m), fc, ans: quiz.map(q => { const a = Number(q.ans); return a >= 0 && a < q.opts.length ? a : 0; }) };
}
const HEAVY = new Set(['materi', 'cheatsheet', 'simulator', 'flashcards', 'quiz', 'ringkasan', 'referensi']);
const light = m => {
  const o = {};
  Object.entries(m).forEach(([k, v]) => { if (!HEAVY.has(k)) o[k] = v; });
  return Object.assign(o, { _lazy: true, _sum: summary(m) });
};
export const indexData = () => library.map(c => Object.assign({}, c, { meetings: c.meetings.map(light) }));
export const meetingPaths = () => library.flatMap(c => c.meetings.map(m => ({ params: { course: c.id, meeting: m.id }, props: { course: c.id, meeting: m } })));

// Versi data untuk memecah cache browser/GitHub Pages setiap kali materi berubah
export const dataVersion = crypto.createHash('sha1').update(JSON.stringify(library)).digest('hex').slice(0, 10);
