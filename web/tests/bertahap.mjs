// Tes blok "bertahap" (diagram yang menyala bertahap) dan "kode-jelas" (kode dengan penjelas per baris).
// Bertahap: tidak menyorot sebelum diklik (kecuali mode digulir, yang menyala sekali lalu kembali utuh),
// setiap langkah menyorot bagian SVG-nya, klik ulang / Tampilkan semua mengembalikan diagram utuh.
// Kode-jelas: panel inti tampil di awal, setiap catatan muncul saat barisnya diklik, panah/Escape/Kembali bekerja.
// Jalankan: npm run build && node tests/bertahap.mjs
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


// Semua blok bertahap / kode-jelas di materi, langsung dari sumber/
const { lib } = createRequire(path.resolve('../sumber/build.js'))('./build.js');
const found = [];
for (const c of lib) for (const m of c.meetings) (m.materi || []).forEach(b => { if (b && (b.type === 'bertahap' || b.type === 'kode-jelas')) found.push({ c: c.id, m: m.id, b }); });
if (!found.some(x => x.b.type === 'bertahap') || !found.some(x => x.b.type === 'kode-jelas')) { console.error('Blok bertahap/kode-jelas tidak ditemukan di materi.'); process.exit(1); }

const steps0 = box => box.locator('.bt-step');
const fails = [];
const fail = m => { fails.push(m); console.log('  ✗ ' + m); };
// Daftar skrip bundel situs (engine.mjs) dan bundel HTML mandiri (sumber/build.js) harus sama
{
  const list = f => (fs.readFileSync(f, 'utf8').match(/\[\s*'stick\.js'[^\]]*\]/) || [''])[0].replace(/\s+/g, '');
  const a = list(path.resolve('src/lib/engine.mjs')), b = list(path.resolve('../sumber/build.js'));
  if (!a || a !== b) fail(`daftar skrip berbeda: engine.mjs ${a} vs sumber/build.js ${b}`);
}
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
try {
  for (const [vw, reduced] of [[390, false], [1280, true]]) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: 844 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    const page = await ctx.newPage();
    let cur = '';
    page.on('pageerror', e => fail(`${cur}: error JS: ${e.message}`));
    for (const { c, m, b } of found) {
      cur = `${c}/${m} ${b.type} "${b.title}" @${vw}${reduced ? ' (reduced motion)' : ''}`;
      await page.goto(`${URL0}#/c/${c}/m/${m}/materi`);
      await page.waitForFunction(() => document.querySelector('#appMain') && !document.querySelector('#appMain .animate-spin'), null, { timeout: 15000 });
      const blk = page.locator('#appMain [id^="blk-"]').filter({ has: page.locator('h3', { hasText: b.title }) }).filter({ has: page.locator(b.type === 'bertahap' ? '.bt' : '.kj') });
      if (await blk.count() !== 1) { fail(`${cur}: blok tidak ditemukan (${await blk.count()})`); continue; }
      const box = blk.locator(b.type === 'bertahap' ? '.bt' : '.kj');
      // terbaca tanpa interaksi: semua bagian tampil penuh / panel inti terisi
      if (b.type === 'bertahap') {
        if (await box.getAttribute('data-on')) fail(`${cur}: sudah menyorot sebelum diklik`);
        await blk.scrollIntoViewIfNeeded();
        if (b.auto && !reduced) {
          // menyala sendiri sekali saat terlihat, lalu kembali utuh
          const lit = await page.waitForFunction(el => el.dataset.on === '1', await box.elementHandle(), { timeout: 4000 }).then(() => true, () => false);
          if (!lit) fail(`${cur}: mode digulir tidak menyala`);
          const back = await page.waitForFunction(el => !el.dataset.on, await box.elementHandle(), { timeout: 1700 * b.steps.length + 3000 }).then(() => true, () => false);
          if (!back) fail(`${cur}: mode digulir tidak kembali utuh`);
          // pindah tab saat sedang menyala, lalu kembali: diagram harus utuh, tidak tertinggal memudar
          await steps0(box).nth(0).click(); await box.getByRole('button', { name: 'Putar ulang' }).click();
          await page.waitForFunction(el => el.dataset.on === '1', await box.elementHandle());
          await page.getByRole('button', { name: /^\W*(Visual )?Cheat Sheet$/ }).first().click();
          await page.waitForTimeout(2200);
          await page.getByRole('button', { name: /^\W*Materi( Lengkap)?$/ }).first().click();
          const blk2 = page.locator('#appMain [id^="blk-"]').filter({ has: page.locator('h3', { hasText: b.title }) }).filter({ has: page.locator('.bt') });
          await blk2.waitFor();
          if (await blk2.locator('.bt').getAttribute('data-on')) fail(`${cur}: setelah pindah tab diagram tertinggal memudar`);
          await blk2.scrollIntoViewIfNeeded();
        } else {
          await page.waitForTimeout(b.auto ? 1200 : 100);
          if (await box.getAttribute('data-on')) fail(`${cur}: menyala sendiri padahal ${reduced ? 'gerak dikurangi' : 'mode klik'}`);
        }
        const steps = box.locator('.bt-step');
        if (await steps.count() !== b.steps.length) fail(`${cur}: jumlah langkah ${await steps.count()}`);
        for (let k = 1; k <= b.steps.length; k++) {
          await steps.nth(k - 1).click();
          const st = await box.evaluate((el, k) => {
            const on = [...el.querySelectorAll('.bt-part')].filter(p => (p.dataset.s || '').split(' ').includes(String(k)));
            const hl = on.flatMap(p => [...p.querySelectorAll(':scope > .bt-hl, :scope > .bt-hl-line')]);
            return { on: el.dataset.on, n: on.length, pressed: el.querySelectorAll('.bt-step[aria-pressed="true"]').length, hl: hl.length };
          }, k);
          if (st.on !== String(k) || st.pressed !== 1) fail(`${cur}: langkah ${k} tidak terpilih`);
          if (!st.n || !st.hl) fail(`${cur}: langkah ${k} tidak menyorot bagian diagram`);
        }
        await steps.nth(b.steps.length - 1).click();
        if (await box.getAttribute('data-on')) fail(`${cur}: klik ulang langkah tidak mengembalikan diagram utuh`);
        await steps.nth(0).click();
        await box.getByRole('button', { name: 'Tampilkan semua' }).click();
        if (await box.getAttribute('data-on')) fail(`${cur}: Tampilkan semua tidak berfungsi`);
        const ow = await box.evaluate(el => el.querySelector('svg').getBoundingClientRect().width);
        if (ow > vw) fail(`${cur}: diagram lebih lebar dari layar (${ow}px)`);
      } else {
        const pane = box.locator('.kj-pane');
        if (!/\bInti\b/i.test(await pane.innerText())) fail(`${cur}: panel inti kosong`);
        const lines = box.locator('button.kj-ln');
        for (const [i, x] of b.catatan.entries()) {
          const btn = box.locator(`button.kj-ln[data-l="${x.at[x.at.length - 1]}"]`);
          await btn.scrollIntoViewIfNeeded();
          await btn.click();
          const t = await pane.innerText();
          if (!t.includes(x.judul.replace(/<[^>]+>/g, ''))) { fail(`${cur}: catatan ${i + 1} tidak tampil`); continue; }
          const on = await box.locator('.kj-ln.is-on').getAttribute('data-l');
          if (on !== String(x.at[0])) fail(`${cur}: baris ${x.at[0] + 1} tidak disorot (yang disorot ${on})`);
          if (await box.locator('.kj-ln.is-grp').count() !== x.at.length - 1) fail(`${cur}: kelompok baris catatan ${i + 1} salah`);
        }
        // panah bawah pindah ke catatan berikutnya; Escape kembali ke inti
        await lines.first().focus();
        await lines.first().click();
        await page.keyboard.press('ArrowDown');
        if (!(await pane.innerText()).includes(b.catatan[1].judul.replace(/<[^>]+>/g, ''))) fail(`${cur}: panah bawah tidak pindah catatan`);
        await page.keyboard.press('Escape');
        if (!/\bInti\b/i.test(await pane.innerText()) || await box.locator('.kj-ln.is-on').count()) fail(`${cur}: Escape tidak kembali ke inti`);
        await lines.nth(1).click();
        await pane.getByRole('button', { name: /Kembali ke inti/ }).click();
        if (!/\bInti\b/i.test(await pane.innerText())) fail(`${cur}: tombol Kembali ke inti tidak berfungsi`);
        if (!(await page.evaluate(() => document.activeElement && document.activeElement.classList.contains('kj-ln')))) fail(`${cur}: fokus tidak kembali ke baris kode`);
        if (b.urut) {
          const ord = await box.locator('.kj-ord').allInnerTexts();
          if (ord.join() !== b.urut.join()) fail(`${cur}: angka urutan ${ord.join()} ≠ ${b.urut.join()}`);
        }
      }
      const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (over > 0) fail(`${cur}: halaman bergeser ke samping ${over}px`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(fails.length ? `Gagal: ${fails.length} masalah.` : `bertahap: ${found.length} blok × 2 ukuran lulus.`);
process.exit(fails.length ? 1 : 0);
