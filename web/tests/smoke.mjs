// Tes asap: buka SEMUA matkul → pertemuan → tab di hasil build (dist/), plus interaksi utama.
// Gagal (exit 1) kalau ada error JavaScript, halaman kosong, atau data pertemuan gagal dimuat.
// Jalankan: npm run build && npm test
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const DIST = path.resolve(process.cwd(), process.env.ASTRO_OUT || 'dist');
// Harus sama dengan base saat build: /aplikasi-belajar/ (GitHub Pages) atau / (Vercel, ASTRO_BASE=/).
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
  if (await page.evaluate(() => S.exam !== null || S.prog.quiz[0] !== undefined || store.get(examKey('result'), null)?.ans[0] !== S.meeting.quiz[0].ans)) fail('hasil mode ujian tidak tersimpan terpisah dari latihan');

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

  cur = 'simulasi P8: simpan sesi dan pisahkan hasil';
  const basis = 'sif002-basis-data';
  const web = 'pemrograman-web-dinamis';
  const visit = async (c, m, t) => {
    await page.evaluate(h => go(h), `#/c/${c}/m/${m}/${t}`);
    await ready();
    await page.waitForFunction(([c, m, t]) => S.course?.id === c && S.meeting?.id === m && S.tab === t, [c, m, t]);
  };
  await visit(basis, 'p8', 'quiz');
  const quick = await page.evaluate(() => {
    const q = S.meeting.quiz;
    const chosen = sampleExam(q);
    return [chosen.length, new Set(chosen).size, new Set(chosen.map(i => q[i].q.match(/^\[P\d+\]/)?.[0])).size];
  });
  if (quick.join('/') !== '25/25/7') fail('Simulasi Cepat harus berisi 25 soal unik dari 7 pertemuan Basis Data');
  const practiceBefore = await page.evaluate(() => JSON.stringify(S.prog.quiz));
  await page.getByRole('button', { name: 'Simulasi Cepat · 25 soal' }).click();
  await page.getByRole('button', { name: 'Mulai', exact: true }).click();
  await page.locator('[onclick^="examAnswer"]').first().click();
  await page.reload();
  await ready();
  await page.getByText('Simulasi Cepat • terjawab 1/25').waitFor();
  await page.getByRole('button', { name: 'Selesai & lihat nilai', exact: true }).click();
  await page.getByRole('button', { name: 'Selesai', exact: true }).click();
  await page.getByRole('button', { name: 'Kembali ke latihan' }).waitFor();
  if (await page.evaluate(() => JSON.stringify(S.prog.quiz)) !== practiceBefore) fail('hasil Simulasi Cepat mengubah bank latihan');
  await page.reload();
  await ready();
  await page.getByRole('button', { name: 'Hasil simulasi terakhir' }).click();
  if (!(await page.getByText('Simulasi Cepat •', { exact: false }).count())) fail('hasil Simulasi Cepat tidak dapat ditinjau setelah reload');

  cur = 'lab SQL P6–P8';
  await visit(basis, 'p6', 'simulator');
  const click = name => page.getByRole('button', { name, exact: true }).click();
  const labStatus = () => page.locator('#appMain pre[role=status]').innerText();
  await click('WebStart → phpMyAdmin');
  if (!(await labStatus()).includes('Layanan belum berjalan')) fail('WebStart terbuka sebelum server berjalan');
  await click('Start Servers');
  await click('Ubah porta Apache');
  await click('Cek alamat');
  if (!(await labStatus()).includes('belum cocok')) fail('alamat Apache lama masih diterima');
  await click('WebStart → phpMyAdmin');
  await page.getByLabel('Nama basis data', { exact: true }).fill('perpustakaan');
  await click('Buat basis data');
  await click('Lihat daftar');
  await click('Jalankan SQL');
  if (!(await labStatus()).includes('perpustakaan')) fail('database yang dibuat lewat GUI hilang dari SQL');
  await click('Buat perpustakaan');
  await click('Jalankan SQL');
  if (!(await labStatus()).includes('ERROR 1007')) fail('database duplikat tidak ditolak');
  await click('Buat basis data latihan');
  await click('Jalankan SQL');
  await click('Lihat daftar');
  await click('Jalankan SQL');
  if (!(await labStatus()).includes('perpustakaan_latihan')) fail('database dari SQL tidak muncul di daftar');
  await click('perpustakaan_latihan');
  await click('Operasi');
  await click('Hapus basis data aktif');
  await click('Konfirmasi hapus');
  await click('Hapus basis data latihan');
  await click('Jalankan SQL');
  await click('Konfirmasi hapus');
  if (!(await labStatus()).includes('ERROR 1008')) fail('menghapus basis data yang sudah hilang harus menghasilkan galat');
  await visit(basis, 'p7', 'simulator');
  await click('perpustakaan');
  await click('Buat tabel buku');
  await click('Jalankan SQL');
  await click('Lihat kolom buku');
  await click('Jalankan SQL');
  if (!(await labStatus()).includes('id_buku')) fail('struktur tabel P7 tidak mengikuti perintah CREATE TABLE');
  await visit(basis, 'p8', 'simulator');
  const run = async name => { await click(name); await click('Jalankan SQL'); };
  await run('Tampilkan anggota SI');
  if (!(await labStatus()).includes('ERROR 1046')) fail('SELECT P8 dari sesi kosong harus gagal');
  await run('Buat dan pilih basis data');
  await run('Buat tabel anggota');
  await run('Tampilkan anggota SI');
  if (!(await labStatus()).includes('Empty set')) fail('tabel P8 berisi data sebelum INSERT');
  await run('Coba nama NULL');
  if (!(await labStatus()).includes('ERROR 1048')) fail('INSERT NULL ke kolom wajib tidak ditolak');
  await run('Isi satu anggota');
  await run('Tampilkan anggota SI');
  if (!(await labStatus()).includes('Ahmad Fauzi')) fail('data INSERT P8 tidak muncul di hasil SELECT');
  await run('Coba ROLLBACK setelah DROP');
  await click('Konfirmasi hapus');
  if (!(await labStatus()).includes('Empty set')) fail('DROP TABLE tetap harus berlaku setelah ROLLBACK');

  cur = 'Web P7–P8: perilaku dan penyimpanan draf';
  for (const [meeting, labs] of [['p7', [4, 6]], ['p8', [13]]]) {
    await visit(web, meeting, 'simulator');
    for (const [i, total] of labs.entries()) {
      const card = page.locator('#appMain [id^=blk-]').filter({ has: page.getByRole('button', { name: 'Periksa Kode', exact: true }) }).nth(i);
      const editor = card.locator('textarea');
      await card.getByRole('button', { name: 'Lihat Contoh Jawaban' }).click();
      const solution = await editor.inputValue();
      await card.getByRole('button', { name: 'Periksa Kode' }).click();
      await card.getByText(`Misi (${total}/${total} selesai)`, { exact: true }).waitFor();
      const disabledCode = solution.replace(/(<script>)([\s\S]*?)(<\/script>)/, (_, open, js, close) =>
        open + js.split('\n').map(line => '// ' + line).join('\n') + close);
      await editor.fill(disabledCode);
      await card.getByRole('button', { name: 'Periksa Kode' }).click();
      await card.getByText(/Misi \(\d+\/\d+ selesai\)/).waitFor();
      if (await card.getByText(`Misi (${total}/${total} selesai)`, { exact: true }).count()) fail(`Web ${meeting}: komentar JavaScript lolos semua misi`);
      await page.reload();
      await ready();
      if (await editor.inputValue() !== disabledCode) fail(`Web ${meeting}: draf hilang setelah reload`);
      await card.getByRole('button', { name: 'Ulang dari Awal' }).click();
    }
  }

  cur = 'HTML unduhan';
  const standalone = await ctx.newPage();
  standalone.on('pageerror', e => fail(`HTML unduhan: error JS: ${e.message}`));
  await standalone.goto(URL0 + 'offline.html#/c/sif002-basis-data/m/p6/simulator');
  await standalone.getByRole('button', { name: 'Start Servers' }).waitFor();
  await standalone.getByRole('button', { name: 'Start Servers' }).click();
  await standalone.getByRole('button', { name: 'WebStart → phpMyAdmin' }).click();
  await standalone.getByRole('button', { name: 'Buat basis data', exact: true }).waitFor();
  await standalone.close();

  console.log(`Selesai: ${routes.length} tab, ${fails.length} masalah.`);
} finally {
  await browser.close();
  server.close();
}
if (fails.length) { console.error(`\n${fails.length} masalah ditemukan.`); process.exit(1); }
