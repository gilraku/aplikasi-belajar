// Tes jendela modal (<dialog>) dan toast: untuk SETIAP jendela yang dibuka lewat openModal(), pastikan jendela tampil
// sebagai modal, halaman belakang tidak bisa difokus, Esc / klik area gelap / tombol Tutup menutupnya, isinya dikosongkan,
// dan fokus kembali ke tombol pembukanya. Juga: toast terlihat di atas modal, Enter saat keyboard masih menyusun kata
// (IME) tidak dianggap Enter di kotak Cari. Dicek di layar laptop dan HP.
// Jalankan: npm run build && node tests/modal.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const DIST = path.resolve(process.cwd(), process.env.ASTRO_OUT || 'dist');
const BASE = (process.env.ASTRO_BASE || (process.env.VERCEL ? '/' : '/aplikasi-belajar/')).replace(/\/?$/, '/');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const CARI = path.join(DIST, 'data', 'cari');
if (!fs.existsSync(CARI)) { console.error('dist/data/cari belum ada. Jalankan "npm run build" dulu.'); process.exit(1); }

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
const TAB = { l: 'materi', c: 'cheatsheet', s: 'simulator', f: 'flashcard', q: 'quiz' };


const fails = [];
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) fails.push(msg); };
const shotDir = process.env.MODAL_SHOTS;
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});

// Setiap jendela: cara membukanya (tombol yang diklik, atau fungsi), dan teks yang pasti ada di dalamnya.
const MODALS = [
  { name: 'Cari cepat', btn: 'button[aria-label="Cari cepat"]', text: 'Cari cepat', focus: '#cariQ' },
  { name: 'Progresku', btn: 'button[aria-label="Progres belajarku"]', text: 'Progres Belajarku' },
  { name: 'Bagikan', btn: 'header button[aria-label="Bagikan / Unduh"]', text: 'Bagikan ke Teman Kuliah' },
  { name: 'Tambah Materi', fn: 'openImportModal()', text: 'Tambah Materi' },
  { name: 'Hapus semua progres', fn: 'confirmResetProgress()', text: 'Hapus semua progres?', focusText: 'Batal' },
];

async function state(page) {
  return page.evaluate(() => {
    const d = document.getElementById('modalRoot');
    const a = document.activeElement;
    const r = d.getBoundingClientRect();
    return { open: d.open, modal: d.matches(':modal'), kids: d.childElementCount, text: d.textContent,
      inside: d.contains(a), active: a && (a === document.body ? 'BODY' : a.id || a.getAttribute('aria-label') || a.textContent.trim().slice(0, 30)),
      labelled: d.getAttribute('aria-labelledby') ? (document.getElementById(d.getAttribute('aria-labelledby')) || {}).textContent : null,
      rect: { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: innerWidth, h: innerHeight } };
  });
}

for (const vp of [{ name: 'laptop', viewport: { width: 1280, height: 900 } }, { name: 'HP', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]) {
  const ctx = await browser.newContext({ viewport: vp.viewport, isMobile: vp.isMobile, hasTouch: vp.hasTouch, permissions: ['clipboard-read', 'clipboard-write'] });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const page = await ctx.newPage();
  page.on('pageerror', e => fails.push(`[${vp.name}] error JS: ${e.message}`));
  await page.goto(URL0 + '#/c/sif002-basis-data/m/p4');
  await page.waitForSelector('#appHeader button[aria-label="Cari cepat"]');
  const tag = s => `[${vp.name}] ${s}`;

  for (const M of MODALS) {
    for (const how of ['Esc', 'backdrop', 'Tutup']) {
      let opener = null;
      if (M.btn) { opener = page.locator(M.btn).first(); await opener.click(); }
      else await page.evaluate(M.fn);
      await page.waitForFunction(() => document.getElementById('modalRoot').open);
      let s = await state(page);
      ok(s.modal, tag(`${M.name}: tidak terbuka sebagai modal`));
      ok(s.text.includes(M.text), tag(`${M.name}: isi tidak sesuai`));
      ok(s.labelled && s.labelled.includes(M.text.replace('?', '')), tag(`${M.name}: jendela tanpa nama (aria-labelledby)`));
      ok(s.inside, tag(`${M.name}: fokus awal tidak di dalam jendela (${s.active})`));
      if (M.focus) ok(await page.evaluate(sel => document.activeElement === document.querySelector(sel), M.focus) || await page.waitForFunction(sel => document.activeElement === document.querySelector(sel), M.focus, { timeout: 2000 }).then(() => true, () => false), tag(`${M.name}: fokus awal bukan ${M.focus}`));
      if (M.focusText) ok(s.active === M.focusText, tag(`${M.name}: fokus awal "${s.active}", seharusnya "${M.focusText}"`));
      ok(s.rect.top >= 0 && s.rect.left >= 0 && s.rect.right <= s.rect.w + 1 && s.rect.top < s.rect.h, tag(`${M.name}: jendela keluar layar ${JSON.stringify(s.rect)}`));
      if (how === 'Esc') {
        // Tab berkali-kali: fokus tidak boleh keluar ke halaman di belakang
        let escaped = false;
        for (let i = 0; i < 40; i++) { await page.keyboard.press('Tab'); const st = await state(page); if (!st.inside && st.active !== 'BODY' && st.active) { escaped = st.active; break; } }
        ok(!escaped, tag(`${M.name}: Tab keluar ke halaman belakang (${escaped})`));
        if (shotDir && M.name !== 'Tambah Materi') await page.screenshot({ path: `${shotDir}/${vp.name === 'HP' ? 'hp' : 'desk'}-${M.name.replace(/\s+/g, '-').toLowerCase()}.png` });
        await page.keyboard.press('Escape');
      } else if (how === 'backdrop') {
        // klik di dalam jendela tidak menutup, klik di area gelap menutup
        await page.mouse.click(s.rect.left + 6, s.rect.top + 6);
        ok((await state(page)).open, tag(`${M.name}: klik di dalam jendela ikut menutup`));
        const y = vp.name === 'HP' ? s.rect.h - 5 : 5;
        if (y > s.rect.bottom || y < s.rect.top) { await page.mouse.click(5, y); }
        else await page.evaluate(() => closeModal());
      } else {
        await page.click('#modalRoot button[aria-label="Tutup"]');
      }
      await page.waitForFunction(() => !document.getElementById('modalRoot').open, null, { timeout: 3000 }).catch(() => {});
      s = await state(page);
      ok(!s.open && s.kids === 0, tag(`${M.name}: tidak tertutup/dikosongkan lewat ${how}`));
      if (opener) ok(await opener.evaluate(b => document.activeElement === b), tag(`${M.name}: fokus tidak kembali ke tombol pembuka setelah ${how}`));
    }
  }

  // Batal di konfirmasi hapus progres kembali ke Progresku (jendela berganti isi tanpa ditutup)
  await page.evaluate(() => confirmResetProgress());
  await page.getByRole('button', { name: 'Batal' }).click();
  ok((await state(page)).text.includes('Progres Belajarku'), tag('Batal di hapus progres tidak kembali ke Progresku'));

  // Toast di atas modal: salin kode progres saat Progresku terbuka
  await page.getByRole('button', { name: /Salin kode/ }).first().click().catch(() => page.evaluate(() => copyProgressCode()));
  await page.waitForFunction(() => document.getElementById('toastContainer').childElementCount > 0);
  const top = await page.evaluate(() => { const t = document.getElementById('toastContainer').lastElementChild, r = t.getBoundingClientRect();
    return { open: document.getElementById('toastContainer').matches(':popover-open'), inView: r.top >= 0 && r.bottom <= innerHeight && r.height > 0,
      live: (document.getElementById('modalLive') || {}).textContent === t.textContent, modal: document.getElementById('modalRoot').open }; });
  // Wadah toast dibuka (showPopover) SETELAH jendela, jadi berada di atasnya di top layer; pesannya juga dibacakan dari dalam jendela.
  ok(top.modal && top.open && top.inView && top.live, tag(`toast tidak terlihat di atas modal ${JSON.stringify(top)}`));
  if (shotDir) await page.screenshot({ path: `${shotDir}/${vp.name === 'HP' ? 'hp' : 'desk'}-toast-di-atas-modal.png` });
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.getElementById('toastContainer').childElementCount === 0 && !document.getElementById('toastContainer').matches(':popover-open'), null, { timeout: 6000 })
    .then(() => ok(true), () => ok(false, tag('wadah toast tidak tersembunyi lagi setelah toast hilang')));

  // Konfirmasi mode ujian (dibuka dari tab Kuis)
  await page.goto(URL0 + '#/c/sif002-basis-data/m/p4/quiz');
  await page.waitForFunction(() => typeof startExam === 'function' && document.querySelector('#appMain'));
  await page.evaluate(() => startExam());
  let s = await state(page);
  ok(s.modal && s.active === 'Batal', tag(`mode ujian: konfirmasi tidak modal / fokus bukan Batal (${s.active})`));
  await page.keyboard.press('Escape');

  // Enter saat keyboard masih menyusun kata (IME) tidak memindahkan fokus; Enter biasa memindahkan ke hasil pertama
  await page.waitForFunction(() => !document.getElementById('modalRoot').open);
  await page.evaluate(() => openSearch());
  const dbg = await state(page); if (!dbg.open) fails.push(tag('Cari tidak terbuka: ' + JSON.stringify(dbg).slice(0, 200)));
  await page.fill('#cariQ', 'kunci');
  await page.waitForSelector('#cariOut [data-cari]');
  await page.evaluate(() => document.getElementById('cariQ').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 229, isComposing: true, bubbles: true })));
  ok(await page.evaluate(() => document.activeElement.id === 'cariQ'), tag('Enter saat IME menyusun kata ikut lompat ke hasil'));
  await page.press('#cariQ', 'Enter');
  ok(await page.evaluate(() => !!document.activeElement.closest('#cariOut')), tag('Enter biasa tidak lompat ke hasil pertama'));
  await page.keyboard.press('Escape');
  await ctx.close();
}
await browser.close();
server.close();
if (fails.length) { console.log(fails.join('\n')); console.log(`Gagal: ${fails.length} dari ${checks} cek.`); process.exit(1); }
console.log(`modal: ${checks} cek lulus`);
