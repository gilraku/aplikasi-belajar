// Uji cepat simulator SQL (web/src/scripts/sql-lab.js) tanpa browser: node tests/sql-lab.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const ctx = {};
vm.runInNewContext(fs.readFileSync(new URL('../src/scripts/sql-lab.js', import.meta.url), 'utf8') + '\nthis.runSqlLab = runSqlLab; this.sqlSession = sqlSession;', ctx);
const SEED = `CREATE DATABASE perpustakaan; USE perpustakaan;
CREATE TABLE buku (id_buku CHAR(5) NOT NULL, judul VARCHAR(100) NOT NULL, stok INT, PRIMARY KEY (id_buku));
CREATE TABLE anggota (id_anggota CHAR(5) NOT NULL, nama VARCHAR(50) NOT NULL, prodi VARCHAR(40), PRIMARY KEY (id_anggota));
CREATE TABLE peminjaman (id_pinjam CHAR(6) NOT NULL, id_buku CHAR(5) NOT NULL, id_anggota CHAR(5) NOT NULL, tgl_kembali DATE, PRIMARY KEY (id_pinjam));
INSERT INTO buku VALUES ('BK001','Dasar Pemrograman',4), ('BK002','Sistem Basis Data',3), ('BK003','Jaringan Komputer',2);
INSERT INTO anggota VALUES ('AG001','Ahmad','SI'), ('AG002','Nur','SI'), ('AG003','Rangga','TI'), ('AG004','Dimas','TI');
INSERT INTO peminjaman VALUES ('PJ0001','BK002','AG001','2026-10-08'), ('PJ0002','BK001','AG002',NULL), ('PJ0003','BK002','AG003',NULL);`;
const fresh = () => { const db = ctx.sqlSession(); const r = ctx.runSqlLab(db, SEED); assert.ok(r.ok, r.text); return db; };
const run = (sql, db = fresh()) => ctx.runSqlLab(db, sql);
const rows = text => text.split('\n').slice(0, -1);
let n = 0;
const ok = (sql, expect, db) => { const r = run(sql, db); assert.ok(r.ok, sql + '\n' + r.text); if (expect) assert.equal(r.text.split('\n\n').pop(), expect, sql); n++; return r; };
const err = (sql, code, db) => { const r = run(sql, db); assert.ok(!r.ok && r.text.includes('ERROR ' + code), sql + '\n' + r.text); n++; };

// Perilaku lama tetap
ok('SELECT COUNT(*) FROM buku;', 'COUNT(*)\n3\n1 baris');
ok("SELECT judul FROM buku WHERE judul LIKE '%Data' ORDER BY judul DESC LIMIT 1;", 'judul\nSistem Basis Data\n1 baris');
ok('SELECT DISTINCT prodi FROM anggota;', 'prodi\nSI\nTI\n2 baris');
err('SELECT * FROM buku ORDER BY stok WHERE stok > 1;', 1064);
err('SELECT harga FROM buku;', 1054);
// BETWEEN dan IN
ok('SELECT id_buku FROM buku WHERE stok BETWEEN 2 AND 3 ORDER BY id_buku;', 'id_buku\nBK002\nBK003\n2 baris');
ok("SELECT nama FROM anggota WHERE id_anggota IN ('AG001', 'AG004');", 'nama\nAhmad\nDimas\n2 baris');
// JOIN
ok('SELECT p.id_pinjam, b.judul FROM peminjaman p INNER JOIN buku b ON p.id_buku = b.id_buku;', 'id_pinjam | judul\nPJ0001 | Sistem Basis Data\nPJ0002 | Dasar Pemrograman\nPJ0003 | Sistem Basis Data\n3 baris');
ok('SELECT b.judul, p.id_pinjam FROM buku b LEFT JOIN peminjaman p ON p.id_buku = b.id_buku;', 'judul | id_pinjam\nDasar Pemrograman | PJ0002\nSistem Basis Data | PJ0001\nSistem Basis Data | PJ0003\nJaringan Komputer | NULL\n4 baris');
ok('SELECT a.nama FROM peminjaman p RIGHT JOIN anggota a ON p.id_anggota = a.id_anggota WHERE p.id_pinjam IS NULL;', 'nama\nDimas\n1 baris');
ok('SELECT a.nama, b.judul FROM peminjaman p JOIN anggota a ON p.id_anggota = a.id_anggota JOIN buku b ON p.id_buku = b.id_buku WHERE p.tgl_kembali IS NULL;', 'nama | judul\nNur | Dasar Pemrograman\nRangga | Sistem Basis Data\n2 baris');
ok('SELECT buku.judul FROM buku, peminjaman WHERE buku.id_buku = peminjaman.id_buku AND peminjaman.id_anggota = \'AG001\';', 'judul\nSistem Basis Data\n1 baris');
err('SELECT id_buku FROM peminjaman p JOIN buku b ON p.id_buku = b.id_buku;', 1052);
err('SELECT * FROM buku b LEFT JOIN peminjaman p;', 1064);
// Agregat, GROUP BY, HAVING, AS
ok('SELECT prodi, COUNT(*) AS jumlah FROM anggota GROUP BY prodi;', 'prodi | jumlah\nSI | 2\nTI | 2\n2 baris');
ok('SELECT b.judul, COUNT(p.id_pinjam) AS kali FROM buku b LEFT JOIN peminjaman p ON p.id_buku = b.id_buku GROUP BY b.judul HAVING kali >= 1 ORDER BY kali DESC;', 'judul | kali\nSistem Basis Data | 2\nDasar Pemrograman | 1\n2 baris');
ok('SELECT SUM(stok), AVG(stok), MIN(stok), MAX(stok) FROM buku;', 'SUM(stok) | AVG(stok) | MIN(stok) | MAX(stok)\n9 | 3.0000 | 2 | 4\n1 baris');
ok('SELECT id_buku, COUNT(*) FROM peminjaman GROUP BY id_buku HAVING COUNT(*) > 1;', 'id_buku | COUNT(*)\nBK002 | 2\n1 baris');
err('SELECT prodi, nama, COUNT(*) FROM anggota GROUP BY prodi;', 1055);
err('SELECT nama, COUNT(*) FROM anggota;', 1140);
err('SELECT prodi FROM anggota WHERE COUNT(*) > 1 GROUP BY prodi;', 1111);
// ALTER TABLE
{ const db = fresh();
  ok('ALTER TABLE buku ADD tahun YEAR;', null, db);
  ok('SELECT id_buku, tahun FROM buku LIMIT 1;', 'id_buku | tahun\nBK001 | NULL\n1 baris', db);
  ok("ALTER TABLE buku ADD COLUMN penerbit VARCHAR(40) NOT NULL DEFAULT 'Umum' AFTER judul;", null, db);
  ok('DESCRIBE buku;', 'Field | Type | Null | Key\nid_buku | char(5) | NO | PRI\njudul | varchar(100) | NO | \npenerbit | varchar(40) | NO | \nstok | int | YES | \ntahun | year | YES | \n5 baris', db);
  ok('ALTER TABLE buku MODIFY judul VARCHAR(150);', null, db);
  ok('ALTER TABLE buku CHANGE stok jumlah INT;', null, db);
  ok('ALTER TABLE buku RENAME COLUMN jumlah TO eksemplar;', null, db);
  ok('ALTER TABLE buku DROP COLUMN tahun;', null, db);
  ok('SELECT eksemplar FROM buku WHERE id_buku = \'BK001\';', 'eksemplar\n4\n1 baris', db);
  err('ALTER TABLE buku MODIFY judul VARCHAR(5);', 1265, db);
  err('ALTER TABLE buku ADD judul INT;', 1060, db);
  err('ALTER TABLE buku DROP harga;', 1091, db);
  err('ALTER TABLE buku ADD PRIMARY KEY (judul);', 1068, db);
  ok('ALTER TABLE buku RENAME TO koleksi;', null, db);
  ok('SHOW TABLES;', 'Tables_in_perpustakaan\nkoleksi\nanggota\npeminjaman\n3 baris', db);
  ok('INSERT INTO koleksi (id_buku, judul) VALUES (\'BK009\', \'Baru\');', null, db);
  ok('SELECT penerbit FROM koleksi WHERE id_buku = \'BK009\';', 'penerbit\nUmum\n1 baris', db);
  err('ALTER TABLE peminjaman MODIFY tgl_kembali DATE NOT NULL;', 1138, db);
  err('ALTER TABLE anggota MODIFY nama INT;', 1366, db);
}
console.log(`sql-lab: ${n} cek lulus`);
