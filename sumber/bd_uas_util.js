// Alat bersama Basis Data P9–P14 (menuju UAS): data perpustakaan dari modul, seed lab SQL, dan tabel hasil gaya MySQL.
// Data persis seperti modul: lima buku (Bab 9), sepuluh buku (Bab 11), tiga anggota, enam peminjaman (Bab 12).

const BUKU5 = [
  ["BK001", "Dasar Pemrograman Komputer", "Andi Wibowo", 2019, 4],
  ["BK002", "Sistem Basis Data", "Rina Kartika", 2021, 3],
  ["BK003", "Jaringan Komputer Dasar", "Budi Santoso", 2018, 2],
  ["BK004", "Analisis Sistem Informasi", "Siti Nurhaliza", 2022, 6],
  ["BK005", "Statistika untuk Informatika", "Dewi Anggraini", 2020, 1]
];
const BUKU_TAMBAH = [
  ["BK006", "Pemrograman Basis Data", "Andi Wibowo", 2021, 3],
  ["BK007", "Keamanan Informasi", "Maya Sari", 2022, 2],
  ["BK008", "Manajemen Proyek TI", "Andi Wibowo", 2019, 4],
  ["BK009", "Algoritma dan Struktur Data", "Rina Kartika", 2021, 5],
  ["BK010", "Kecerdasan Buatan Dasar", "Maya Sari", 2022, 1]
];
const BUKU10 = BUKU5.concat(BUKU_TAMBAH);
const ANGGOTA = [
  ["AG001", "Ahmad Fauzi", "Sistem Informasi", "2026-09-12", "Y"],
  ["AG002", "Nur Aisyah", "Sistem Informasi", "2026-09-14", "Y"],
  ["AG003", "Rangga Pratama", "Teknik Informatika", "2026-09-15", "T"]
];
const PINJAM = [
  ["PJ0001", "BK002", "AG001", "2026-10-01", "2026-10-08"],
  ["PJ0002", "BK001", "AG002", "2026-10-02", null],
  ["PJ0003", "BK002", "AG003", "2026-10-05", null],
  ["PJ0004", "BK009", "AG001", "2026-10-06", "2026-10-13"],
  ["PJ0005", "BK005", "AG002", "2026-10-07", null],
  ["PJ0006", "BK009", "AG001", "2026-10-10", null]
];

const lit = v => v == null ? "NULL" : typeof v === "number" ? String(v) : `'${v}'`;
const values = rows => rows.map(r => `(${r.map(lit).join(",")})`).join(",\n");

const CREATE_BUKU = "CREATE TABLE buku (id_buku CHAR(5) NOT NULL, judul VARCHAR(80) NOT NULL, pengarang VARCHAR(50) NOT NULL, tahun YEAR NOT NULL, stok INT NOT NULL, PRIMARY KEY (id_buku));";
const CREATE_ANGGOTA = "CREATE TABLE anggota (id_anggota CHAR(5) NOT NULL, nama VARCHAR(50) NOT NULL, prodi VARCHAR(40) NOT NULL, tgl_daftar DATE NOT NULL, status_aktif CHAR(1) NOT NULL DEFAULT 'Y', PRIMARY KEY (id_anggota));";
const CREATE_PINJAM = `CREATE TABLE peminjaman (
  id_pinjam   CHAR(6) NOT NULL,
  id_buku     CHAR(5) NOT NULL,
  id_anggota  CHAR(5) NOT NULL,
  tgl_pinjam  DATE    NOT NULL,
  tgl_kembali DATE    DEFAULT NULL,
  PRIMARY KEY (id_pinjam),
  FOREIGN KEY (id_buku) REFERENCES buku(id_buku),
  FOREIGN KEY (id_anggota)
    REFERENCES anggota(id_anggota)
);`;
const AWAL = "CREATE DATABASE perpustakaan; USE perpustakaan;\n" + CREATE_BUKU + "\n" + CREATE_ANGGOTA;
const SEED = {
  // Bab 9: kedua tabel masih kosong
  kosong: AWAL,
  // Bab 10–11: lima buku, tiga anggota
  lima: AWAL + "\nINSERT INTO buku VALUES\n" + values(BUKU5) + ";\nINSERT INTO anggota VALUES\n" + values(ANGGOTA) + ";",
  // Bab 11–12 Bagian 1: sepuluh buku
  sepuluh: AWAL + "\nINSERT INTO buku VALUES\n" + values(BUKU10) + ";\nINSERT INTO anggota VALUES\n" + values(ANGGOTA) + ";",
  // Bab 12 Bagian 2: ketiga tabel lengkap
  lengkap: AWAL + "\nINSERT INTO buku VALUES\n" + values(BUKU10) + ";\nINSERT INTO anggota VALUES\n" + values(ANGGOTA) + ";\n" + CREATE_PINJAM + "\nINSERT INTO peminjaman VALUES\n" + values(PINJAM) + ";"
};

// Tabel hasil bergaya layar MySQL (+----+)
const hasil = (cols, rows) => {
  const show = v => v == null ? "NULL" : String(v);
  const w = cols.map((c, i) => Math.max(c.length, ...rows.map(r => show(r[i]).length)));
  const line = "+" + w.map(n => "-".repeat(n + 2)).join("+") + "+";
  const fmt = r => "| " + r.map((c, i) => show(c).padEnd(w[i])).join(" | ") + " |";
  if (!rows.length) return "Empty set";
  return [line, fmt(cols), line, ...rows.map(fmt), line, rows.length + (rows.length === 1 ? " row" : " rows") + " in set"].join("\n");
};

// Hasil kueri dihitung langsung oleh lab SQL Sinau (web/src/scripts/sql-lab.js, dialek MariaDB),
// jadi tabel hasil di materi selalu sama dengan yang muncul di Simulator.
const vm = require("vm"), fs = require("fs"), path = require("path");
let LAB = null;
const labCtx = () => {
  if (!LAB) { LAB = {}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../web/src/scripts/sql-lab.js"), "utf8") + "\nthis.runSqlLab = runSqlLab; this.sqlSession = sqlSession;", LAB); }
  return LAB;
};
// jalan(seedKey, sql, prep) → { cols, rows } dari perintah terakhir; galat → lempar (build gagal)
const jalan = (seed, sql, prep) => {
  const c = labCtx(), db = c.sqlSession(); db.dialect = "mariadb";
  for (const part of [SEED[seed] || seed, prep].filter(Boolean)) { const r = c.runSqlLab(db, part); if (!r.ok) throw new Error("bd_uas_util: " + r.text); }
  const r = c.runSqlLab(db, sql);
  if (!r.ok) throw new Error("bd_uas_util: " + sql + "\n" + r.text);
  const last = r.text.split("\n\n").pop();
  if (/^Empty set/.test(last)) return { cols: [], rows: [] };
  const lines = last.split("\n");
  return { cols: lines[0].split(" | "), rows: lines.slice(1, -1).map(l => l.split(" | ")) };
};
// galat(seedKey, sql, prep) → teks "ERROR nnnn: …" (lempar bila ternyata berhasil)
const galat = (seed, sql, prep) => {
  const c = labCtx(), db = c.sqlSession(); db.dialect = "mariadb";
  for (const part of [SEED[seed] || seed, prep].filter(Boolean)) c.runSqlLab(db, part);
  const r = c.runSqlLab(db, sql);
  if (r.ok) throw new Error("bd_uas_util: seharusnya galat: " + sql);
  return r.text.split("\n\n").pop();
};
// kueri(seed, sql) → teks "sql + tabel hasil" untuk blok kode
const kueri = (seed, sql, prep) => { const { cols, rows } = jalan(seed, sql, prep); return sql + "\n" + (rows.length ? hasil(cols, rows) : "Empty set"); };

const KOL_BUKU = ["id_buku", "judul", "pengarang", "tahun", "stok"];
const KOL_ANGGOTA = ["id_anggota", "nama", "prodi", "tgl_daftar", "status_aktif"];
const KOL_PINJAM = ["id_pinjam", "id_buku", "id_anggota", "tgl_pinjam", "tgl_kembali"];

// Lab SQL bersama: nomor galat mengikuti MariaDB (dipakai modul lewat MAMP)
const lab = (o) => ({ type: "sql-lab", dialek: "mariadb", tip: "Simulasi di browser dengan nomor galat MariaDB seperti di modul (MAMP). Perintah yang sama bisa ditempel di tab SQL phpMyAdmin. Satu tombol contoh boleh berisi beberapa perintah sekaligus.", ...o });

module.exports = { jalan, galat, kueri, BUKU5, BUKU_TAMBAH, BUKU10, ANGGOTA, PINJAM, KOL_BUKU, KOL_ANGGOTA, KOL_PINJAM, SEED, CREATE_PINJAM, hasil, lab, values, lit };
