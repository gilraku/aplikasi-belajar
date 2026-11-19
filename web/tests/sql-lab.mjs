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
// Temuan review: NOT IN dengan NULL, koma di dalam ON, PK kembar setelah MODIFY
ok("SELECT nama FROM anggota WHERE id_anggota NOT IN ('AG001', NULL);", 'Empty set (0 baris)');
ok("SELECT a.nama FROM anggota a JOIN peminjaman p ON a.id_anggota = p.id_anggota AND p.id_buku IN ('BK001', 'BK003') JOIN buku b ON b.id_buku = p.id_buku;", 'nama\nNur\n1 baris');
{ const db = fresh();
  ok("CREATE TABLE t (id VARCHAR(5) NOT NULL, PRIMARY KEY (id)); INSERT INTO t VALUES ('1.1'), ('1.2');", null, db);
  err('ALTER TABLE t MODIFY id INT;', 1062, db);
}
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
// Subquery, ekspresi, fungsi bawaan, kurung, NOT
ok("SELECT judul FROM buku WHERE id_buku IN (SELECT id_buku FROM peminjaman) ORDER BY judul;", 'judul\nDasar Pemrograman\nSistem Basis Data\n2 baris');
ok('SELECT judul FROM buku WHERE id_buku NOT IN (SELECT id_buku FROM peminjaman);', 'judul\nJaringan Komputer\n1 baris');
ok('SELECT judul, stok FROM buku WHERE stok = (SELECT MAX(stok) FROM buku);', 'judul | stok\nDasar Pemrograman | 4\n1 baris');
ok('SELECT judul FROM buku WHERE stok > (SELECT AVG(stok) FROM buku);', 'judul\nDasar Pemrograman\n1 baris');
err('SELECT judul FROM buku WHERE id_buku = (SELECT id_buku FROM peminjaman);', 1242);
err('SELECT judul FROM buku WHERE id_buku IN (SELECT id_buku, id_anggota FROM peminjaman);', 1241);
ok("SELECT CONCAT(nama, ' (', prodi, ')') AS label, UPPER(nama), LENGTH(nama) FROM anggota WHERE id_anggota = 'AG001';", 'label | UPPER(nama) | LENGTH(nama)\nAhmad (SI) | AHMAD | 5\n1 baris');
ok('SELECT judul, stok * 2 AS dobel, stok / 3, ROUND(stok / 3, 1) FROM buku WHERE id_buku = \'BK001\';', 'judul | dobel | stok / 3 | ROUND(stok / 3, 1)\nDasar Pemrograman | 8 | 1.3333 | 1.3\n1 baris');
ok("SELECT id_pinjam, IFNULL(tgl_kembali, 'belum kembali') AS status FROM peminjaman ORDER BY id_pinjam LIMIT 2;", 'id_pinjam | status\nPJ0001 | 2026-10-08\nPJ0002 | belum kembali\n2 baris');
ok("SELECT YEAR(tgl_kembali), MONTH(tgl_kembali), DATEDIFF('2026-10-08', '2026-10-01') FROM peminjaman WHERE tgl_kembali IS NOT NULL;", "YEAR(tgl_kembali) | MONTH(tgl_kembali) | DATEDIFF('2026-10-08', '2026-10-01')\n2026 | 10 | 7\n1 baris");
ok("SELECT nama FROM anggota WHERE (prodi = 'SI' OR prodi = 'TI') AND NOT nama LIKE 'A%' ORDER BY nama;", 'nama\nDimas\nNur\nRangga\n3 baris');
ok("SELECT nama FROM anggota WHERE prodi = 'SI' OR prodi = 'TI' AND nama LIKE 'R%' ORDER BY nama;", 'nama\nAhmad\nNur\nRangga\n3 baris');
assert.match(run('SELECT CURDATE();').text, /^CURDATE\(\)\n\d{4}-\d\d-\d\d\n1 baris$/); n++;
ok('SELECT 7 / 2, 7 DIV 2, 7 % 2;', '7 / 2 | 7 DIV 2 | 7 % 2\n3.5000 | 3 | 1\n1 baris');
ok("SELECT nama FROM anggota WHERE prodi = 'SI' UNION SELECT judul FROM buku WHERE stok < 3;", 'nama\nAhmad\nNur\nJaringan Komputer\n3 baris');
ok('SELECT id_buku, stok FROM buku ORDER BY stok DESC LIMIT 1, 1;', 'id_buku | stok\nBK002 | 3\n1 baris');
{ const db = fresh();
  ok("UPDATE buku SET stok = stok - 1 WHERE id_buku = 'BK001';", null, db);
  ok("UPDATE anggota SET nama = UPPER(nama) WHERE prodi = 'TI';", null, db);
  ok("SELECT stok FROM buku WHERE id_buku = 'BK001';", 'stok\n3\n1 baris', db);
  ok("SELECT nama FROM anggota WHERE prodi = 'TI';", 'nama\nRANGGA\nDIMAS\n2 baris', db);
}
// VIEW, INDEX, UNIQUE, AUTO_INCREMENT, DEFAULT
{ const db = fresh();
  ok("CREATE VIEW v_pinjam AS SELECT a.nama, b.judul FROM peminjaman p JOIN anggota a ON p.id_anggota = a.id_anggota JOIN buku b ON p.id_buku = b.id_buku;", null, db);
  ok("SELECT * FROM v_pinjam WHERE nama LIKE 'N%';", 'nama | judul\nNur | Dasar Pemrograman\n1 baris', db);
  ok("INSERT INTO peminjaman VALUES ('PJ0004','BK003','AG004',NULL);", null, db);
  ok('SELECT COUNT(*) FROM v_pinjam;', 'COUNT(*)\n4\n1 baris', db);
  err("UPDATE v_pinjam SET nama = 'x';", 1288, db);
  ok('CREATE INDEX idx_judul ON buku (judul);', null, db);
  ok('SHOW INDEX FROM buku;', 'Table | Non_unique | Key_name | Column_name\nbuku | 0 | PRIMARY | id_buku\nbuku | 1 | idx_judul | judul\n2 baris', db);
  ok('DROP INDEX idx_judul ON buku;', null, db);
  ok('DROP VIEW v_pinjam;', null, db);
  ok("CREATE TABLE petugas (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50) UNIQUE, aktif INT DEFAULT 1);", null, db);
  ok("INSERT INTO petugas (email) VALUES ('a@x.id'), ('b@x.id');", null, db);
  ok('SELECT * FROM petugas;', 'id | email | aktif\n1 | a@x.id | 1\n2 | b@x.id | 1\n2 baris', db);
  err("INSERT INTO petugas (email) VALUES ('a@x.id');", 1062, db);
  ok('DESCRIBE petugas;', 'Field | Type | Null | Key\nid | int | NO | PRI\nemail | varchar(50) | YES | UNI\naktif | int | YES | \n3 baris', db);
}
// Kunci tamu
{ const db = ctx.sqlSession();
  ok(`CREATE DATABASE pustaka; USE pustaka;
CREATE TABLE buku (id_buku CHAR(5) NOT NULL, judul VARCHAR(50) NOT NULL, PRIMARY KEY (id_buku));
CREATE TABLE anggota (id_anggota CHAR(5) NOT NULL, nama VARCHAR(50), PRIMARY KEY (id_anggota));
CREATE TABLE peminjaman (id_pinjam CHAR(6) NOT NULL, id_buku CHAR(5) NOT NULL, id_anggota CHAR(5), PRIMARY KEY (id_pinjam),
  FOREIGN KEY (id_buku) REFERENCES buku(id_buku),
  CONSTRAINT fk_agt FOREIGN KEY (id_anggota) REFERENCES anggota(id_anggota) ON DELETE SET NULL ON UPDATE CASCADE);
INSERT INTO buku VALUES ('BK001','A'), ('BK002','B'); INSERT INTO anggota VALUES ('AG001','Ahmad'), ('AG002','Nur');
INSERT INTO peminjaman VALUES ('PJ0001','BK001','AG001'), ('PJ0002','BK002','AG002');`, null, db);
  err("INSERT INTO peminjaman VALUES ('PJ0003','BK999','AG001');", 1452, db);
  err("DELETE FROM buku WHERE id_buku = 'BK001';", 1451, db);
  err('DROP TABLE buku;', 3730, db);
  err('TRUNCATE TABLE buku;', 1701, db);
  ok("DELETE FROM anggota WHERE id_anggota = 'AG002';", null, db);
  ok("SELECT id_anggota FROM peminjaman WHERE id_pinjam = 'PJ0002';", 'id_anggota\nNULL\n1 baris', db);
  ok("UPDATE anggota SET id_anggota = 'AG009' WHERE id_anggota = 'AG001';", null, db);
  ok("SELECT id_anggota FROM peminjaman WHERE id_pinjam = 'PJ0001';", 'id_anggota\nAG009\n1 baris', db);
  err("UPDATE buku SET id_buku = 'BK100' WHERE id_buku = 'BK001';", 1451, db);
  ok('DESCRIBE peminjaman;', 'Field | Type | Null | Key\nid_pinjam | char(6) | NO | PRI\nid_buku | char(5) | NO | MUL\nid_anggota | char(5) | YES | MUL\n3 baris', db);
  ok('ALTER TABLE peminjaman DROP FOREIGN KEY peminjaman_ibfk_1;', null, db);
  ok("DELETE FROM buku WHERE id_buku = 'BK002';", null, db);
  err('ALTER TABLE peminjaman ADD FOREIGN KEY (id_buku) REFERENCES buku(id_buku);', 1452, db);
  ok("CREATE TABLE denda (id INT NOT NULL, id_pinjam CHAR(6), PRIMARY KEY (id), FOREIGN KEY (id_pinjam) REFERENCES peminjaman(id_pinjam) ON DELETE CASCADE); INSERT INTO denda VALUES (1, 'PJ0001');", null, db);
  ok("DELETE FROM peminjaman WHERE id_pinjam = 'PJ0001'; SELECT COUNT(*) FROM denda;", 'COUNT(*)\n0\n1 baris', db);
  err('CREATE TABLE x (id INT, ref CHAR(5), FOREIGN KEY (ref) REFERENCES tidak_ada(id));', 1824, db);
}
// DCL
{ const db = fresh();
  ok("CREATE USER 'petugas'@'localhost' IDENTIFIED BY 'rahasia';", null, db);
  ok("GRANT SELECT, INSERT ON perpustakaan.* TO 'petugas'@'localhost';", null, db);
  ok("REVOKE INSERT ON perpustakaan.* FROM 'petugas'@'localhost';", null, db);
  ok("SHOW GRANTS FOR 'petugas'@'localhost';", 'Grants for petugas@localhost\nGRANT USAGE ON *.* TO `petugas`@`localhost`\nGRANT SELECT ON `perpustakaan`.* TO `petugas`@`localhost`\n2 baris', db);
  err("GRANT SELECT ON perpustakaan.* TO 'tamu'@'localhost';", 1410, db);
  err("REVOKE DELETE ON perpustakaan.* FROM 'petugas'@'localhost';", 1141, db);
}
// Dialek MariaDB (modul BD P9–P14 memakai MAMP): nomor/pesan galat mengikuti MariaDB
{ const maria = () => { const db = fresh(); db.dialect = 'mariadb'; return db; };
  const msg = (sql, db) => run(sql, db).text.split('\n\n').pop();
  let db = maria();
  ok('CREATE TABLE salinan AS SELECT * FROM buku; SELECT COUNT(*) FROM salinan;', 'COUNT(*)\n3\n1 baris', db);
  err("INSERT INTO buku (id_buku, stok) VALUES ('BK009', 1);", 1364, maria());
  err("INSERT INTO buku VALUES ('BK0099','x',1);", 1406, maria());
  err("UPDATE buku SET stokk = 1 WHERE id_buku = 'BK001';", 1054, maria());
  assert.match(msg("UPDATE buku SET stokk = 1 WHERE id_buku = 'BK001';", maria()), /in 'SET'/);
  assert.match(msg("UPDATE buku SET stokk = 1 WHERE id_buku = 'BK001';"), /in 'field list'/);
  err("SELECT * FROM buku WHERE judul = Sistem Basis Data;", 1064, maria());
  err('SELECT * FROM buku LIMIT -3;', 1064, maria());
  ok('SELECT judul, COUNT(*) FROM buku;', null, maria());
  err('SELECT judul, COUNT(*) FROM buku;', 1140);
  assert.match(msg('SELECT id_buku FROM peminjaman INNER JOIN buku ON peminjaman.id_buku = buku.id_buku;', maria()), /Column 'id_buku' in SELECT is ambiguous/);
  assert.match(msg('SELECT id_buku FROM peminjaman INNER JOIN buku ON peminjaman.id_buku = buku.id_buku;'), /Column 'id_buku' in field list is ambiguous/);
  db = maria();
  ok('ALTER TABLE peminjaman ADD FOREIGN KEY (id_buku) REFERENCES buku(id_buku);', null, db);
  err('DROP TABLE buku;', 1451, db);
  err('CREATE TABLE x (id INT, ref INT, FOREIGN KEY (ref) REFERENCES buku(id_buku));', 1005, db);
  err('CREATE TABLE x (id INT, ref CHAR(5), FOREIGN KEY (ref) REFERENCES tidak_ada(id));', 1005, db);
  err('DROP TABLE buku;', 3730, (() => { const d = fresh(); run('ALTER TABLE peminjaman ADD FOREIGN KEY (id_buku) REFERENCES buku(id_buku);', d); return d; })());
  n += 3;
}
console.log(`sql-lab: ${n} cek lulus`);
