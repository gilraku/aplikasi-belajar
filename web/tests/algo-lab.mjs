// Tes lab Struktur Data & Algoritma (blok "algo-lab").
// 1) Jejak tiap algoritma dihitung untuk ribuan data acak: hasil akhir harus urut / pencarian harus benar,
//    jumlah batang tetap, tidak ada dua batang di tempat yang sama, jawaban "Tebak dulu" ada di pilihan,
//    dan setiap langkah menyalakan baris kode (C++ dan pseudocode).
// 2) Di browser: semua pelajaran tampil, tombol Lanjut / panah / Tebak dulu / data sendiri bekerja, tanpa galat.
// Jalankan: npm run build && node tests/algo-lab.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

let fail = 0;
const bad = (...m) => { fail++; if (fail < 20) console.error('✗', ...m); };

// ---------- 1. Jejak ----------
const ctx = { esc: s => String(s), hlCpp: s => s, document: { addEventListener() {} }, Math, JSON };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.resolve('src/scripts/algo-lab.js'), 'utf8') + ';this.AL = AL_ALGO;', ctx);
const AL = ctx.AL;
const SORTS = ['bubble', 'selection', 'insertion', 'merge', 'quick'];
let seed = 7; const rnd = k => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % k; };
const cases = [[1, 2, 3], [3, 2, 1], [5, 5, 5], [0, 99, 0, 99], [1, 2, 3, 4, 5, 6, 7, 8], [8, 7, 6, 5, 4, 3, 2, 1]];
for (let t = 0; t < 3000; t++) { const n = 3 + rnd(6); cases.push(Array.from({ length: n }, () => rnd(t % 2 ? 10 : 100))); }
const check = (name, F, n) => F.forEach((f, i) => {
  if (f.bars.length !== n) bad(name, 'jumlah batang', i, f.bars.length);
  const at = f.bars.map(b => `${b.row}:${b.x}:${b.lift ? 1 : 0}`); if (new Set(at).size !== at.length) bad(name, 'batang bertumpuk', i, f.title);
  if (f.q && !(Number.isInteger(f.q.a) && f.q.a >= 0 && f.q.a < f.q.o.length)) bad(name, 'jawaban tebakan', i);
  ['cpp', 'ps'].forEach(l => { const ln = AL[name].lines[l][f.ln]; if (!ln || !ln.length || ln.some(k => !AL[name].code[l][k - 1] || !AL[name].code[l][k - 1].trim())) bad(name, 'baris kode', l, f.ln); });
  if (!f.title || !f.body || !f.grp) bad(name, 'teks kosong', i);
});
for (const d of cases) {
  for (const k of SORTS) {
    const F = AL[k].run(d);
    check(k, F, d.length);
    const got = F[F.length - 1].bars.filter(b => !b.row).sort((p, q) => p.x - q.x).map(b => b.v);
    if (JSON.stringify(got) !== JSON.stringify(d.slice().sort((p, q) => p - q))) bad(k, 'hasil tidak urut', d.join(','), '→', got.join(','));
  }
  const s = d.slice().sort((p, q) => p - q);
  for (const x of [d[rnd(d.length)], 100 - rnd(3), -0 + rnd(100)]) {
    for (const [k, data] of [['linear', d], ['biner', s]]) {
      const F = AL[k].run(data, x), last = F[F.length - 1];
      check(k, F, data.length);
      const m = /^Ketemu: indeks (\d+)$/.exec(last.title);
      if (!!m !== data.includes(x)) bad(k, 'hasil pencarian', data.join(','), x);
      if (m && data[+m[1]] !== x) bad(k, 'indeks salah', data.join(','), x);
      if (k === 'linear' && m && +m[1] !== data.indexOf(x)) bad(k, 'bukan kemunculan pertama', data.join(','), x);
    }
  }
}
console.log(`jejak: ${cases.length} data × ${SORTS.length + 2} algoritma diperiksa`);

// ---------- 2. Browser ----------
const DIST = path.resolve(process.cwd(), process.env.ASTRO_OUT || 'dist');
const BASE = (process.env.ASTRO_BASE || (process.env.VERCEL ? '/' : '/aplikasi-belajar/')).replace(/\/?$/, '/');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
if (!fs.existsSync(path.join(DIST, 'index.html'))) { console.error('dist/ belum ada. Jalankan "npm run build" dulu.'); process.exit(1); }
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (!u.startsWith(BASE)) { res.writeHead(404); return res.end(); }
  let f = path.join(DIST, u.slice(BASE.length));
  if (!f.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const URL0 = `http://127.0.0.1:${server.address().port}${BASE}`;
const { lib } = createRequire(path.resolve('../sumber/build.js'))('./build.js');
const sda = lib.find(c => c.jalur);
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto(URL0 + '#/'); await page.waitForSelector('#mk-' + sda.id);
  const rows = await page.$$eval(`#mk-${sda.id} li`, l => l.length);
  if (rows !== sda.meetings.length) bad('beranda: jumlah pelajaran', rows);
  if (await page.$(`.peta th button:text("${sda.nama}")`)) bad('section ikut peta P1–P16');
  for (const m of sda.meetings) {
    await page.goto(URL0 + `#/c/${sda.id}/m/${m.id}`); await page.waitForSelector('.al');
    const step = () => page.$eval('.al .tabular-nums', e => e.textContent);
    await page.click('.al [data-act="next"]');
    if (!/Langkah 2 dari/.test(await step())) bad(m.id, 'Lanjut', await step());
    await page.keyboard.press('ArrowRight');
    if (!/Langkah 3 dari/.test(await step())) bad(m.id, 'panah kanan', await step());
    await page.keyboard.press('ArrowLeft');
    if (!/Langkah 2 dari/.test(await step())) bad(m.id, 'panah kiri', await step());
    await page.click('.al [data-act="lang"][data-arg="ps"]');
    if (await page.$$eval('.al .al-code .trc-cur', l => l.length) === 0) bad(m.id, 'pseudocode tidak menyala');
    // Tebak dulu: Lanjut terkunci sampai dijawab
    await page.click('.al [data-act="mode"][data-arg="tebak"]');
    for (let i = 0; i < 60; i++) {
      if (await page.$('.al .al-guess [data-act="ans"]:not([disabled])')) {
        if (!(await page.$eval('.al [data-act="next"]', e => e.disabled))) bad(m.id, 'Lanjut tidak terkunci saat menebak');
        await page.click('.al .al-guess [data-act="ans"]'); break;
      }
      if (await page.$eval('.al [data-act="next"]', e => e.disabled)) break;
      await page.click('.al [data-act="next"]');
    }
    // Data sendiri
    await page.fill('.al input[data-key="data"]', '9, 4, 7, 1');
    if (await page.$('.al input[data-key="target"]')) await page.fill('.al input[data-key="target"]', '7');
    await page.press('.al input[data-key="data"]', 'Enter');
    if (!/Langkah 1 dari/.test(await step())) bad(m.id, 'data sendiri tidak dimulai ulang');
    if (!(await page.$eval('.al svg', e => e.getAttribute('aria-label'))).includes(m.id === 'pencarian-biner' ? '1, 4, 7, 9' : '9, 4, 7, 1')) bad(m.id, 'data sendiri tidak dipakai');
    await page.fill('.al input[data-key="data"]', '1, 2');
    await page.click('.al button[type="submit"]');
    if (!(await page.$('.al [role="alert"]'))) bad(m.id, 'data salah tidak ditolak');
    // Sampai selesai
    for (let i = 0; i < 400 && !(await page.$eval('.al [data-act="next"]', e => e.disabled)); i++) await page.click('.al [data-act="next"]');
  }
  const hp = await browser.newPage({ viewport: { width: 375, height: 800 } });
  hp.on('pageerror', e => errs.push(e.message));
  for (const m of sda.meetings) {
    await hp.goto(URL0 + `#/c/${sda.id}/m/${m.id}`); await hp.waitForSelector('.al');
    const w = await hp.evaluate(() => document.documentElement.scrollWidth);
    if (w > 375) bad(m.id, 'HP melebar', w);
  }
  if (errs.length) bad('galat di browser', errs.slice(0, 5));
} finally { await browser.close(); server.close(); }
if (fail) { console.error(`algo-lab: ${fail} masalah`); process.exit(1); }
console.log('algo-lab: semua lolos');
