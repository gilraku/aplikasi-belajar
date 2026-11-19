// Tes blok "adegan" (stick-figure di kanvas) dan "penelusur" (langkah bertombol).
// Untuk setiap adegan di materi: kanvas tergambar, adegan selesai diputar dan semua langkahnya pernah menyala,
// tombol Putar lagi memulai ulang; dengan prefers-reduced-motion adegan diam di keadaan akhir.
// Penelusur: Berikutnya/Sebelumnya berpindah langkah dan kembali ke awal setelah langkah terakhir.
// Jalankan: npm run build && node tests/adegan.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const DIST = path.resolve(process.cwd(), process.env.ASTRO_OUT || 'dist');
const BASE = (process.env.ASTRO_BASE || (process.env.VERCEL ? '/' : '/aplikasi-belajar/')).replace(/\/?$/, '/');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
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

// Semua blok adegan/penelusur di materi, langsung dari sumber/
const { lib } = createRequire(path.resolve('../sumber/build.js'))('./build.js');
const found = [];
for (const c of lib) for (const m of c.meetings) (m.materi || []).forEach(b => { if (b && (b.type === 'adegan' || b.type === 'penelusur')) found.push({ c: c.id, m: m.id, b }); });
if (!found.some(x => x.b.type === 'adegan')) { console.error('Tidak ada blok adegan di materi.'); process.exit(1); }

const fails = [];
const fail = m => { fails.push(m); console.log('  ✗ ' + m); };
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
try {
  for (const reduced of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    const page = await ctx.newPage();
    let cur = '';
    page.on('pageerror', e => fail(`${cur}: error JS: ${e.message}`));
    for (const { c, m, b } of found) {
      cur = `${c}/${m} ${b.type} ${b.scene || b.title}${reduced ? ' (reduced motion)' : ''}`;
      await page.goto(`${URL0}#/c/${c}/m/${m}/materi`);
      await page.waitForFunction(() => document.querySelector('#appMain') && !document.querySelector('#appMain .animate-spin'), null, { timeout: 15000 });
      if (b.type === 'adegan') {
        const el = page.locator(`stick-scene[scene="${b.scene}"]`);
        if (await el.count() !== 1) { fail(`${cur}: elemen adegan tidak ada`); continue; }
        await el.scrollIntoViewIfNeeded();
        const keys = b.steps.map(s => s.sorot);
        const opts = (b.pilih && b.pilih.opsi) || [null];
        const sel = `#appMain .adg:has(stick-scene[scene="${b.scene}"])`;
        // catat setiap langkah yang menyala sampai adegan selesai (sekali per pilihan nilai)
        const watch = (n0) => page.evaluate(async ({ scene, reduced, n0 }) => {
          const el = document.querySelector(`stick-scene[scene="${scene}"]`);
          const box = el.closest('.adg'), lit = new Set();
          const t0 = performance.now();
          while (performance.now() - t0 < 15000) {
            box.querySelectorAll('li.is-on[data-sorot]').forEach(li => lit.add(li.dataset.sorot));
            const v = el.v;
            if (v && !reduced && v.n > n0 && !v.on) break;
            if (reduced && performance.now() - t0 > 1500) break;
            await new Promise(r => setTimeout(r, 40));
          }
          // sesudah selesai: tetap di keadaan akhir (langkah terakhir menyala), tidak kembali ke awal
          await new Promise(r => setTimeout(r, 600));
          const cv = el.querySelector('canvas');
          const g = cv.getContext('2d'), d = g.getImageData(0, 0, cv.width, cv.height).data;
          let ink = 0; for (let i = 3; i < d.length; i += 16) if (d[i] > 0) ink++;
          return { lit: [...lit], ink, plays: el.v ? el.v.n : -1, final: el.dataset.step || '', v: el.dataset.v || '' };
        }, { scene: b.scene, reduced, n0 });
        const litAll = new Set();
        for (let i = 0; i < opts.length; i++) {
          const o = opts[i];
          const tag = o ? ` [${o.t}]` : '';
          let n0 = 0;
          if (o && i > 0) {
            n0 = await page.evaluate(s => document.querySelector(`stick-scene[scene="${s}"]`).v.n, b.scene);
            await page.locator(`${sel} .adg-chip`).nth(i).click();
            if (await page.locator(`${sel} .adg-chip[aria-pressed="true"]`).innerText() !== o.t) fail(`${cur}${tag}: tombol pilihan tidak aktif`);
          }
          const seen = await watch(n0);
          seen.lit.forEach(k => litAll.add(k));
          if (seen.ink < 200) fail(`${cur}${tag}: kanvas kosong`);
          if (o && seen.v !== o.v) fail(`${cur}${tag}: data-v adegan ${seen.v}, seharusnya ${o.v}`);
          if (!seen.final || !keys.includes(seen.final)) fail(`${cur}${tag}: keadaan akhir tidak menyalakan langkah (${seen.final || 'kosong'})`);
          if (!o && seen.final !== keys[keys.length - 1]) fail(`${cur}: keadaan akhir bukan langkah terakhir (${seen.final})`);
          if (!reduced) {
            if (seen.plays <= n0) fail(`${cur}${tag}: adegan tidak diputar`);
            // marks pada kode harus ketemu teksnya
            const want = ((o && o.marks) || b.marks || []).length;
            const marks = await page.locator(`${sel} .adg-p`).count();
            if (marks !== want) fail(`${cur}${tag}: ${want - marks} potongan kode (marks) tidak ditemukan di code`);
          } else if (seen.plays !== 0) fail(`${cur}${tag}: adegan bergerak padahal reduced motion`);
        }
        if (!reduced) {
          const miss = keys.filter(k => !litAll.has(k));
          if (miss.length) fail(`${cur}: langkah tidak pernah menyala: ${miss.join(', ')}`);
          await page.locator(`${sel} .adg-btn`).click();
          if (!(await page.evaluate(s => document.querySelector(`stick-scene[scene="${s}"]`).v.on, b.scene))) fail(`${cur}: Putar lagi tidak memulai adegan`);
        } else if (await page.locator(`${sel} .adg-btn`).count() !== 1) fail(`${cur}: tombol Putar lagi hilang`);
      } else if (!reduced) {
        const box = page.locator('#appMain .pnl').first();
        await box.scrollIntoViewIfNeeded();
        const count = () => box.locator('.pnl-count').innerText();
        const n = b.steps.length;
        if (await count() !== `1 / ${n}`) fail(`${cur}: tidak mulai di langkah 1`);
        for (let i = 2; i <= n; i++) {
          await page.locator('#appMain .pnl').first().getByRole('button', { name: /Berikutnya/ }).click();
          if (await page.locator('#appMain .pnl .pnl-count').first().innerText() !== `${i} / ${n}`) { fail(`${cur}: Berikutnya tidak ke langkah ${i}`); break; }
        }
        await page.locator('#appMain .pnl').first().getByRole('button', { name: /Sebelumnya/ }).click();
        if (await page.locator('#appMain .pnl .pnl-count').first().innerText() !== `${n - 1} / ${n}`) fail(`${cur}: Sebelumnya tidak mundur`);
        await page.locator('#appMain .pnl').first().getByRole('button', { name: /Berikutnya/ }).click();
        await page.locator('#appMain .pnl').first().getByRole('button', { name: /Ulangi/ }).click();
        if (await page.locator('#appMain .pnl .pnl-count').first().innerText() !== `1 / ${n}`) fail(`${cur}: Ulangi tidak kembali ke langkah 1`);
      }
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(fails.length ? `Gagal: ${fails.length} masalah.` : `adegan: ${found.length} blok × 2 mode lulus.`);
process.exit(fails.length ? 1 : 0);
