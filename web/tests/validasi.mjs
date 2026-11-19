// Tes pemeriksa otomatis playground validasi form (PWD P9, profil "validasi" di playground-assessment.js).
// Contoh jawaban harus lolos semua misi perilaku; kode awal tidak boleh lolos misi yang memang belum dikerjakan.
// Jalankan: node tests/validasi.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const { lib } = createRequire(path.resolve('../sumber/build.js'))('./build.js');
const src = fs.readFileSync(new URL('../src/scripts/playground-assessment.js', import.meta.url), 'utf8');
const behavior = new Function(src + ';return playgroundBehavior')().toString();
const blocks = lib.flatMap(c => c.meetings.flatMap(m => (m.simulator || []).filter(b => b.assessment === 'validasi').map(b => ({ where: `${c.id}/${m.id}`, b }))));
assert.ok(blocks.length >= 2, 'playground validasi tidak ditemukan');

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const run = async html => {
  const page = await browser.newPage();
  page.on('dialog', d => d.dismiss());
  const helper = `<script>window.__r=null;addEventListener('message',e=>{if(e.data&&e.data.playgroundAssessment==='t')window.__r=e.data.results});(${behavior})('validasi','t');</script>`;
  await page.setContent(html.replace(/<head\b[^>]*>/i, h => h + helper));
  await page.waitForFunction(() => window.__r, null, { timeout: 5000 });
  const r = await page.evaluate(() => window.__r);
  await page.close();
  return r;
};
let n = 0;
for (const { where, b } of blocks) {
  const keys = b.tasks.map(t => t.behavior).filter(Boolean);
  const sol = await run(b.solution);
  for (const k of keys) { assert.equal(sol[k], true, `${where} "${b.title}": contoh jawaban gagal misi ${k}`); n++; }
  const start = await run(b.starter);
  assert.ok(keys.some(k => !start[k]), `${where} "${b.title}": kode awal sudah lolos semua misi`);
  n++;
}
// Mutasi: pesan error tetap ditulis, tetapi isValid = false dihapus, sehingga data salah tetap tersimpan.
// Misi penolakan (nim, nama, email, jurusan) harus gagal; menulis pesan saja belum berarti menolak.
for (const { where, b } of blocks) {
  const keys = b.tasks.map(t => t.behavior).filter(k => ['nim', 'nama', 'email', 'jurusan'].includes(k));
  if (!keys.length) continue;
  const bocor = b.solution.replace(/isValid = false;?/g, '');
  assert.notEqual(bocor, b.solution, `${where} "${b.title}": pola isValid = false tidak ada`);
  const r = await run(bocor);
  for (const k of keys) { assert.equal(r[k], false, `${where} "${b.title}": misi ${k} lolos walau data salah tetap disimpan`); n++; }
}
// Kode tugas modul apa adanya (innerHTML untuk sel tabel) lolos validasi tetapi gagal misi keamanan
const tugas = blocks.find(x => x.b.title.includes('Tabel')).b;
const modul = tugas.solution.replace(/const row = document\.createElement\("tr"\);[\s\S]*?tableBody\.appendChild\(row\);/, 'const row = document.createElement("tr");\n                row.innerHTML = `<td>${nimInput.value}</td><td>${namaInput.value}</td><td>${jurusanInput.value}</td><td>${emailInput.value}</td>`;\n                tableBody.appendChild(row);');
assert.notEqual(modul, tugas.solution, 'pola baris tabel di contoh jawaban berubah');
const rm = await run(modul);
assert.equal(rm.tabel, true); assert.equal(rm.aman, false); n += 2;
await browser.close();
console.log(`validasi: ${n} cek lulus`);
