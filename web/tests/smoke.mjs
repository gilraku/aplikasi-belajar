// Tes asap: buka SEMUA matkul → pertemuan → tab di hasil build (dist/), plus interaksi utama.
// Gagal (exit 1) kalau ada error JavaScript, halaman kosong, atau data pertemuan gagal dimuat.
// Jalankan: npm run build && npm test
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const DIST = path.resolve(process.cwd(), 'dist');
const BASE = '/aplikasi-belajar/';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };

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

const fails = [];
const fail = m => { fails.push(m); console.log('  ✗ ' + m); };
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {}) // PW_CHROMIUM: pakai browser lain bila versinya tidak cocok;
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort()); // font tidak penting untuk tes
  const page = await ctx.newPage();
  let cur = 'beranda';
  page.on('pageerror', e => fail(`${cur}: error JS: ${e.message}`));
  page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(URL0)) fail(`${cur}: ${r.status()} ${r.url()}`); });
  await page.goto(URL0);
  const ready = () => page.waitForFunction(() => !document.querySelector('#appMain .animate-spin'), null, { timeout: 15000 });
  await ready();

  const routes = await page.evaluate(() => LIB.flatMap(c => c.meetings.flatMap(m => availableTabs(m).map(t => ({ h: routeFor(c, m, t.id), c: c.id, m: m.id, tab: t.id, name: `${c.nama} P${m.nomor} ${t.id}` })))));
  console.log(`Membuka ${routes.length} tab…`);
  for (const r of routes) {
    cur = r.name;
    await page.evaluate(h => go(h), r.h);
    try { await ready(); } catch (e) { fail(`${cur}: masih memuat setelah 15 detik`); continue; }
    const st = await page.evaluate(() => ({ c: S.course && S.course.id, m: S.meeting && S.meeting.id, tab: S.tab, text: $('appMain').innerText }));
    if (st.c !== r.c || st.m !== r.m || st.tab !== r.tab) fail(`${cur}: terbuka halaman yang salah (${st.c}/${st.m}/${st.tab})`);
    else if (/Materi gagal dimuat/.test(st.text)) fail(`${cur}: data pertemuan gagal dimuat`);
    else if (st.text.trim().length < 40) fail(`${cur}: isi halaman kosong`);
    if (r.tab === 'materi' || r.tab === 'cheatsheet') {
      const ref = await page.evaluate(() => { const m = S.meeting, want = (m.referensi || []).length && S.tab === ((m.materi || []).length ? 'materi' : 'cheatsheet');
        const box = $('blk-ref'); return { want: !!want, has: !!box, links: box ? box.querySelectorAll('a[href^="https://"][target="_blank"][rel~="noopener"]').length : 0, urls: (m.referensi || []).filter(x => x.url).length, inline: (m.referensi || []).filter(x => x.bagian).length, baca: [...document.querySelectorAll('#appMain span')].filter(e => e.textContent === '📚 Baca juga:').length }; });
      if (ref.want && !ref.has) fail(`${cur}: bagian Referensi tidak tampil`);
      if (!ref.want && ref.has) fail(`${cur}: bagian Referensi tampil di tab yang salah`);
      if (ref.has && ref.links !== ref.urls) fail(`${cur}: ${ref.links} dari ${ref.urls} link referensi tampil`);
      if (ref.has && r.tab === 'materi' && ref.inline && !ref.baca) fail(`${cur}: "Baca juga" tidak muncul di bawah bagian materi`);
    }
    if (r.tab === 'quiz') {
      const btn = page.locator('#appMain [onclick^="answerQuiz"]').first();
      if (await btn.count()) { await btn.click(); if (!(await page.evaluate(() => Object.keys(S.prog.quiz).length))) fail(`${cur}: jawaban kuis tidak tersimpan`); }
      else fail(`${cur}: tidak ada tombol jawaban kuis`);
    }
  }

  cur = 'kuis: ulangi yang salah & mode ujian';
  const qr = routes.find(r => r.tab === 'quiz');
  await page.evaluate(h => go(h), qr.h); await ready();
  await page.evaluate(() => { const q = S.meeting.quiz; answerQuiz(0, (q[0].ans + 1) % q[0].opts.length); });
  await page.evaluate(() => retryWrong());
  if (await page.evaluate(() => S.prog.quiz[0] !== undefined || S.quizFilter !== 'todo')) fail('"Ulangi yang salah" tidak membuka ulang soal yang salah');
  await page.evaluate(() => { startExam(); beginExam(); examAnswer(0, S.meeting.quiz[0].ans); });
  if (await page.locator('#appMain').getByText('Pembahasan:').count()) fail('mode ujian menampilkan pembahasan sebelum selesai');
  await page.evaluate(() => finishExam(true));
  if (await page.evaluate(() => S.exam !== null || S.prog.quiz[0] !== S.meeting.quiz[0].ans)) fail('hasil mode ujian tidak tersimpan');

  cur = 'beranda';
  await page.evaluate(() => go('#/')); await ready();
  if (!(await page.getByText('Lanjutkan belajar').count())) fail('kartu "Lanjutkan belajar" tidak muncul di beranda');

  cur = 'navigasi';
  await page.evaluate(h => go(h), routes[0].h);
  await page.evaluate(h => go(h), routes[1].h);
  await page.goBack(); await ready();
  if ((await page.evaluate(() => location.hash)) !== routes[0].h) fail('tombol Back browser tidak kembali ke halaman sebelumnya');

  cur = 'progres';
  const p2 = await ctx.newPage(); p2.on('pageerror', e => fail(`progres: error JS: ${e.message}`));
  await p2.goto(URL0); await p2.waitForFunction(() => typeof S !== 'undefined' && S.meeting, null, { timeout: 15000 }).catch(() => fail('tidak melanjutkan ke halaman terakhir'));
  const stats = await p2.evaluate(() => PROGRESS.stats());
  if (!stats.quiz) fail('progres kuis tidak terbaca setelah halaman dibuka ulang');
  await p2.evaluate(() => openProgressModal());
  if (!(await p2.getByText('Unduh file progres').count())) fail('modal Progresku tidak terbuka');

  cur = 'beta';
  await p2.goto(URL0 + 'beta/#' + routes[0].h.slice(1));
  await p2.waitForURL(u => !u.pathname.includes('/beta'), { timeout: 5000 }).catch(() => fail('/beta/ tidak dialihkan ke alamat utama'));
  cur = 'PWA offline';
  const man = await p2.evaluate(async b => { const r = await fetch(b + 'manifest.webmanifest'); const j = await r.json(); return { ok: r.ok, icons: j.icons.length, start: j.start_url }; }, BASE);
  if (!man.ok || man.icons < 2 || man.start !== BASE) fail('manifest PWA tidak valid');
  const octx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await octx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const op = await octx.newPage(); op.on('pageerror', e => fail(`PWA offline: error JS: ${e.message}`));
  await op.goto(URL0);
  const swOk = await op.evaluate(async () => { const reg = await Promise.race([navigator.serviceWorker.ready, new Promise(r => setTimeout(() => r(null), 20000))]); return !!(reg && reg.active); });
  if (!swOk) fail('service worker tidak aktif');
  else {
    await octx.setOffline(true);
    const last = routes.filter(r => r.tab === 'materi').pop();
    await op.goto(URL0 + last.h).catch(e => fail('halaman utama tidak terbuka saat offline: ' + e.message));
    await op.waitForFunction(() => typeof S !== 'undefined' && S.meeting && !document.querySelector('#appMain .animate-spin'), null, { timeout: 15000 }).catch(() => fail('materi tidak terbuka saat offline'));
    const txt = await op.evaluate(() => $('appMain').innerText).catch(() => '');
    if (/Materi gagal dimuat/.test(txt) || txt.trim().length < 40) fail('materi kosong/gagal saat offline');
    if ((await op.evaluate(() => getComputedStyle(document.body).backgroundColor)) !== 'rgb(251, 251, 248)') fail('CSS tidak tersimpan untuk offline');
    console.log('  PWA: service worker aktif, materi & CSS terbuka saat offline');
    await octx.setOffline(false);
  }
  await octx.close();

  console.log(`Selesai: ${routes.length} tab, ${fails.length} masalah.`);
} finally {
  await browser.close();
  server.close();
}
if (fails.length) { console.error(`\n${fails.length} masalah ditemukan.`); process.exit(1); }
