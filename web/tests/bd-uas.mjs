// Uji lab SQL Basis Data P9–P14 (menuju UAS): setiap tombol contoh dijalankan berurutan seperti mahasiswa
// menekannya, dengan dialek MariaDB. Contoh biasa harus berhasil; contoh ⚠ yang bergalat harus memberi nomor modul.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(new URL('../../sumber/build.js', import.meta.url));
const ctx = {};
vm.runInNewContext(fs.readFileSync(new URL('../src/scripts/sql-lab.js', import.meta.url), 'utf8') + '\nthis.runSqlLab = runSqlLab; this.sqlSession = sqlSession;', ctx);
const materi = require('./materi_bd_uas.js');

// Nomor galat yang diharapkan untuk contoh ⚠ (sesuai modul / MariaDB). Contoh ⚠ yang tidak tercantum harus berjalan (salah diam).
const KODE = {
  'bd-p13': { '⚠ 6 · Buku BK099': 1452, '⚠ 7 · Hapus BK002': 1451, '⚠ 8 · Anggota AG009': 1452, '⚠ Hapus tabel induk': 1451, '⚠ Tipe data berbeda': 1005, '⚠ Menunjuk bukan kunci': 1005, '⚠ Hapus anggota AG001': 1451, '⚠ Mini-case · RK9': 1452 },
  'bd-p14': { '⚠ 8 · Ambiguous': 1052, '⚠ Nama panjang + alias': 1054 }
};
let n = 0;
for (const nomor of [9, 10, 11, 12, 13, 14]) {
  const data = require(`./data_bd_p${nomor}.js`);
  const blok = [...data.simulator, ...data.cheatsheet, ...(materi['p' + nomor] || [])].filter(b => b.type === 'sql-lab');
  assert.ok(blok.length, `P${nomor}: tidak ada blok sql-lab`);
  for (const b of blok) {
    assert.equal(b.dialek, 'mariadb', `${b.profile}: dialek harus mariadb`);
    const db = ctx.sqlSession(); db.dialect = b.dialek;
    const s = ctx.runSqlLab(db, b.seed);
    assert.ok(s.ok, `${b.profile}: seed gagal\n${s.text}`);
    for (const ex of b.examples) {
      const r = ctx.runSqlLab(db, ex.sql);
      const harap = (KODE[b.profile] || {})[ex.label];
      if (harap) assert.ok(!r.ok && r.text.includes('ERROR ' + harap + ':'), `${b.profile} "${ex.label}": harus ERROR ${harap}\n${r.text}`);
      else if (!ex.label.startsWith('⚠')) assert.ok(r.ok, `${b.profile} "${ex.label}" gagal\n${r.text}`);
      else assert.ok(r.ok || /^ERROR \d+/m.test(r.text.split('\n\n').pop()), `${b.profile} "${ex.label}"\n${r.text}`);
      n++;
    }
  }
  // Kunci pilihan pada permainan harus termasuk pilihan
  for (const b of data.simulator.filter(b => b.type === 'exercise'))
    for (const row of b.rows) for (const f of row.fields) { assert.ok(f.options.includes(f.answer), `P${nomor} ${b.title}: kunci "${f.answer}" tidak ada di pilihan`); n++; }
  assert.ok(data.quiz.length >= 15 && data.flashcards.length >= 10, `P${nomor}: kuis/flashcard terlalu sedikit`);
  assert.equal(data.ujian, 'UAS');
}
console.log(`bd-uas: ${n} cek lulus`);
