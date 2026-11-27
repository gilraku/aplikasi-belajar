// Tes Algoritma dan Pemrograman P9–P15 (menuju UAS).
// 1) Jejak lab (sumber/lab_alp_uas.js): setiap langkah menunjuk baris kode yang ada dan potongan yang distabilo
//    benar-benar ada di baris itu; output akhir sama dengan hasil yang dihitung ulang di sini.
// 2) Tautan internal (#/c/…/m/…) di data ALP menunjuk pertemuan yang ada.
// 3) Di browser: semua tab P9–P15 tampil tanpa galat, setiap lab bisa dijalankan sampai selesai dengan
//    jawaban "Tebak dulu" yang benar, dan tautan ke section Struktur Data & Algoritma bisa diklik.
// Jalankan: npm run build && node tests/alp-uas.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

let fail = 0;
const bad = (...m) => { fail++; console.error('✗', ...m); };
const req = createRequire(path.resolve('../sumber/build.js'));
const { lib } = req('./build.js');
const LAB = req('./lab_alp_uas.js');
const alp = lib.find(c => c.id === 'algoritma-pemrograman');
const NOMOR = [9, 10, 11, 12, 13, 14, 15];

// ---------- 1. Jejak ----------
const seq = (A, K) => String(A.indexOf(K));
const fib = n => (n <= 1 ? n : fib(n - 1) + fib(n - 2));
const EXPECT = {
  P9: [[''], ['3 7 11 15 19 '], ['']],
  P10: [['Budi Januar mendapatkan nilai 75.5\nTono Laksono mendapatkan nilai 89.9\n'], ['Budi Januar mendapatkan nilai 75.5\nkosong mendapatkan nilai 0\n']],
  P11: [['3! = 6\n'], [String(fib(4))]],
  P12: [['Hasil Penjumlahan= 10'], ['Faktorial 4 = 24', 'Faktorial 4 = 4']],
  P13: [['12']],
  P14: [[seq([3, 1, 2, 4, 6], 5)], [seq([10, 12, 9, 7, 20], 9)]],
  P15: [[seq([3, 1, 2, 4, 6], 5), seq([3, 1, 2, 4, 6], 5)], [seq([10, 12, 9, 7, 20], 9)], [seq([1, 2, 3, 4, 6], 5)]]
};
let nStep = 0;
for (const [key, cases] of Object.entries(LAB)) {
  cases.forEach((cs, ci) => {
    cs.panes.forEach((p, pi) => {
      p.steps.forEach((st, si) => {
        nStep++;
        if (!(st.l === -1 || (Number.isInteger(st.l) && st.l >= 0 && st.l < p.code.length))) bad(key, cs.label, 'baris', si, st.l);
        else if (st.l >= 0 && st.p && !p.code[st.l].includes(st.p)) bad(key, cs.label, `langkah ${si}: "${st.p}" tidak ada di baris "${p.code[st.l]}"`);
      });
      const last = p.steps[p.steps.length - 1];
      const want = (EXPECT[key] || [])[ci]?.[pi];
      if (want === undefined) bad(key, cs.label, 'belum ada output yang diharapkan');
      else if (last.o !== want) bad(key, cs.label, `output ${JSON.stringify(last.o)} ≠ ${JSON.stringify(want)}`);
      if (!p.sum) bad(key, cs.label, 'ringkasan kosong');
    });
    Object.entries(cs.asks).forEach(([k, a]) => { if (!(+k >= 0 && +k < Math.max(...cs.panes.map(p => p.steps.length)))) bad(key, cs.label, 'tebakan di luar langkah', k); });
  });
}
// Lab yang dipakai harus persis yang ada di data simulator
for (const n of NOMOR) {
  const m = alp.meetings.find(x => x.nomor === n);
  if (!m) { bad('pertemuan', n, 'tidak ada'); continue; }
  if (m.ujian !== 'UAS') bad(`P${n}`, 'ujian bukan UAS');
  const tl = m.simulator.filter(b => b.type === 'trace-lab');
  if (tl.length !== 1 || tl[0].cases !== LAB['P' + n]) bad(`P${n}`, 'trace-lab tidak memakai LAB.P' + n);
  if (!(m.materi || []).length) bad(`P${n}`, 'materi kosong');
}
console.log(`jejak: ${nStep} langkah di ${Object.values(LAB).flat().length} kasus diperiksa`);

// ---------- 2. Tautan internal ----------
const links = [];
for (const n of NOMOR) {
  const m = alp.meetings.find(x => x.nomor === n);
  for (const [, c, mm] of JSON.stringify(m).matchAll(/href=\\"#\/c\/([a-z0-9-]+)\/m\/([a-z0-9-]+)\\"/g)) {
    links.push(`P${n}→${mm}`);
    const tc = lib.find(x => x.id === c);
    if (!tc || !tc.meetings.some(x => x.id === mm)) bad(`P${n}`, 'tautan ke pertemuan yang tidak ada', c, mm);
  }
}
if (links.length < 8) bad('tautan ke Struktur Data terlalu sedikit', links.length);
console.log(`tautan: ${links.length} diperiksa`);

// ---------- 3. Browser ----------
const DIST = path.resolve(process.cwd(), process.env.ASTRO_OUT || 'dist');
const BASE = (process.env.ASTRO_BASE || (process.env.VERCEL ? '/' : '/aplikasi-belajar/')).replace(/\/?$/, '/');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
if (!fs.existsSync(path.join(DIST, 'index.html'))) { console.error('dist/ belum ada. Jalankan "npm run build" dulu.'); process.exit(1); }
const server = http.createServer((rq, res) => {
  const u = decodeURIComponent(rq.url.split('?')[0]);
  if (!u.startsWith(BASE)) { res.writeHead(404); return res.end(); }
  let f = path.join(DIST, u.slice(BASE.length));
  if (!f.startsWith(DIST)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const URL0 = `http://127.0.0.1:${server.address().port}${BASE}`;
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
try {
  for (const vp of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport: vp });
    const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await page.goto(URL0 + '#/'); await page.waitForFunction(() => typeof go === 'function');
    const visit = async (m, tab) => {
      await page.evaluate(h => go(h), `#/c/algoritma-pemrograman/m/${m}/${tab}`);
      await page.waitForFunction(([m, t]) => S.course?.id === 'algoritma-pemrograman' && S.meeting?.id === m && S.tab === t && !S.meeting._lazy, [m, tab]);
      await page.waitForTimeout(50);
    };
    for (const n of NOMOR) {
      const id = 'p' + n;
      for (const tab of ['materi', 'cheatsheet', 'flashcard', 'quiz']) {
        await visit(id, tab);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        if (over > 2) bad(`P${n} ${tab} @${vp.width}`, `halaman melebar ${over}px`);
      }
      await visit(id, 'simulator');
      const cases = LAB['P' + n];
      const lab = page.locator('#appMain [id^="blk-"]', { has: page.locator('.trc-code'), hasText: 'Telusuri Kode' }).first();
      for (let ci = 0; ci < cases.length; ci++) {
        const cs = cases[ci];
        if (cases.length > 1) await lab.locator('[data-act="pick"]').nth(ci).click();
        for (let i = 0; i < 200 && !(await lab.getByText('Selesai ✓').count()); i++) {
          const opts = lab.locator('[data-act="answer"]');
          if (await opts.count()) {
            const text = await lab.locator('[aria-label="Tebak dulu"]').innerText();
            const hit = Object.entries(cs.asks).find(([, a]) => text.includes(a.q.replace(/<[^>]+>/g, '').slice(0, 25)));
            if (!hit) { bad(`P${n}`, cs.label, 'pertanyaan tidak dikenali'); break; }
            await opts.nth(hit[1].ans).click();
          } else await lab.locator('[data-act="next"]').click();
        }
        if (!(await lab.getByText('Selesai ✓').count())) bad(`P${n}`, cs.label, 'lab tidak sampai selesai');
        const outs = (await lab.locator('[role=status]').allInnerTexts()).map(s => s.trim());
        const want = cs.panes.map(p => p.steps[p.steps.length - 1].o.trim());
        if (JSON.stringify(outs) !== JSON.stringify(want)) bad(`P${n}`, cs.label, `output layar ${JSON.stringify(outs)} ≠ ${JSON.stringify(want)}`);
        if (await lab.getByText('Belum tepat').count()) bad(`P${n}`, cs.label, 'jawaban benar dinilai salah');
      }
      const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (over > 2) bad(`P${n} simulator @${vp.width}`, `halaman melebar ${over}px`);
    }
    // Tautan materi P13 → pelajaran Bubble Sort
    await visit('p13', 'materi');
    const a = page.locator('#appMain a.in-link', { hasText: 'Bubble Sort' }).first();
    if (!(await a.count())) bad('tautan Bubble Sort tidak tampil sebagai <a>');
    else {
      await a.click();
      await page.waitForFunction(() => location.hash.includes('/m/bubble-sort'));
      await page.waitForSelector('#appMain .al-top, #appMain [id^="blk-"]');
    }
    // algo-lab tampil di simulator P13 dan P14
    for (const [m, k] of [['p13', 2], ['p14', 1]]) {
      await visit(m, 'simulator');
      const nAl = await page.locator('#appMain .al-top').count();
      if (nAl < k) bad(`${m}: algo-lab tampil ${nAl}, harus ${k}`);
    }
    if (errs.length) bad(`galat browser @${vp.width}`, errs.slice(0, 3).join(' | '));
    await page.close();
  }
} finally { await browser.close(); server.close(); }

if (fail) { console.error(`Gagal: ${fail} masalah.`); process.exit(1); }
console.log('alp-uas: semua cek lulus');
