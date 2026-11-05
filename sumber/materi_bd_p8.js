// Materi Lengkap Basis Data P8: UTS (ulasan P1–P7)
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });

const STEP = [["p1", "P1|Konsep & DBMS", "slate"], ["p2", "P2|Model relasional", "sky"], ["p3", "P3|ERD", "amber"], ["p4", "P4|ERD → tabel + DML", "emerald"], ["p5", "P5|Normalisasi", "rose"], ["p6", "P6|MAMP", "violet"], ["p7", "P7|DDL", "emerald"]];
const peta = diagram({
  label: "Diagram Interaktif", title: "Perjalanan Basis Data Perpustakaan P1–P7", desc: "Kertas (P1–P5) lalu komputer (P6–P7). Klik setiap pertemuan.", minw: 680,
  svg: svg(820, 330,
    `<rect x="10" y="10" width="800" height="200" rx="12" fill="#fffbeb" stroke="#fcd34d" stroke-dasharray="6 4"/>` + text(70, 26, "di atas kertas", { size: 12, color: "#92400e" }) +
    `<rect x="10" y="222" width="800" height="98" rx="12" fill="#ecfdf5" stroke="#6ee7b7" stroke-dasharray="6 4"/>` + text(70, 238, "di komputer", { size: 12, color: "#047857" }) +
    STEP.slice(0, 4).map(([p, t, tone], i) => box(30 + i * 150, 40, 125, 64, t, tone, p, { size: 12 }) + (i < 3 ? arrow(155 + i * 150, 72, 175 + i * 150, 72) : "")).join("") +
    box(640, 130, 150, 64, STEP[4][1], "rose", "p5", { size: 12 }) + path("M542,104 L542,162 L636,162") + text(590, 150, "jalan ke-2", { size: 11, color: "#be123c" }) +
    text(715, 72, "hasil sama:|buku, anggota,|peminjaman", { size: 11, color: "#047857" }) + path("M715,126 L715,96", { dash: "5 4" }) +
    box(300, 245, 140, 60, STEP[5][1], "violet", "p6", { size: 12 }) + arrow(440, 275, 475, 275) + box(480, 245, 140, 60, STEP[6][1], "emerald", "p7", { size: 12 }) +
    path("M480,104 L480,180 L370,180 L370,241")
  ),
  parts: [
    { id: "p1", label: "P1", title: "Konsep dasar", text: "Data vs informasi, lemari arsip, DBMS, mengapa lembar kerja tidak cukup, SQL pertama (SELECT) dan galat 1064/1146/1054/1046." },
    { id: "p2", label: "P2", title: "Model relasional", text: "Istilah relasi/tupel/atribut, aturan tabel, PK, NULL, tipe data, tujuan & komponen sistem basis data." },
    { id: "p3", label: "P3", title: "ERD", text: "Notasi Chen, lima langkah, kardinalitas, jenis atribut (komposit, multi-valued, turunan), derajat relasi." },
    { id: "p4", label: "P4", title: "ERD → tabel + DML", text: "Skema relasi, FK, 4 aturan, peminjaman sebagai tabel penghubung, INSERT/SELECT/UPDATE/DELETE, COMMIT/ROLLBACK. CPMK 1." },
    { id: "p5", label: "P5", title: "Normalisasi (jalan ke-2)", text: "Dari tabel kacau ke 3NF; hasilnya sama dengan P4." },
    { id: "p6", label: "P6", title: "MAMP & phpMyAdmin", text: "Server lokal, porta, lima bagian layar phpMyAdmin, CREATE DATABASE perpustakaan." },
    { id: "p7", label: "P7", title: "DDL", text: "Skema buku diwujudkan dengan CREATE TABLE, diperiksa dengan SHOW TABLES & DESCRIBE." }
  ]
});

module.exports = [
  A("Cara Memakai Halaman Ini", `<p>Halaman ini merangkum Pertemuan 1–7 sebagai bekal UTS. Urutan belajar yang disarankan: (1) baca peta perjalanan di bawah, (2) buka tab <strong>Cheat Sheet</strong> untuk kamus galat dan pasangan istilah, (3) kerjakan tab <strong>Simulator</strong>, (4) ulangi tab <strong>Kuis</strong> sampai skor penuh, (5) buka kembali Materi Lengkap pertemuan yang soalnya masih salah.</p>`, "Panduan"),
  peta,
  { type: "table", label: "Tabel Interaktif", title: "Satu Kasus, Tujuh Wujud", mono: true, headers: ["P", "Wujud perpustakaan"],
    rows: [["1", "Lemari arsip: laci buku, laci anggota"], ["2", "Tabel buku dengan PK id_buku, kolom stok boleh NULL?"], ["3", "Buku —N— dipinjam —M— Anggota (+ tgl_pinjam, tgl_kembali)"], ["4", "buku, anggota, peminjaman(id_pinjam, id_buku*, id_anggota*, …)"], ["5", "peminjaman_kacau → 1NF → buku, anggota, peminjaman"], ["6", "CREATE DATABASE perpustakaan;"], ["7", "CREATE TABLE buku ( … PRIMARY KEY (id_buku) );"]],
    modes: [{ label: "Dua jalan", target: "row", row: 4, title: "P4 = P5", text: "ERD (sebelum ada data) dan normalisasi (sesudah data berantakan) menghasilkan tabel yang sama: tanda rancangannya benar." }] },
  { type: "reveal", label: "Latihan Lisan", title: "Jelaskan dengan Kata-katamu, lalu Buka", items: [
    { prompt: "Mengapa perpustakaan tidak cukup memakai lembar kerja?", answer: "Data berulang, tidak seragam, sulit dipakai bersama, tak ada aturan yang menjaga", reason: "P1." },
    { prompt: "Mengapa id_buku, bukan judul, dipilih sebagai PK?", answer: "Unik, ringkas, stabil; judul bisa sama dan rawan salah ketik", reason: "P2." },
    { prompt: "Bagaimana relasi M:N menjadi tabel?", answer: "Tabel penghubung berisi kedua FK + atribut relasi", reason: "P4." },
    { prompt: "Apa yang terjadi jika peminjaman disimpan dalam satu tabel besar?", answer: "Redundansi → tiga anomali", reason: "P5." },
    { prompt: "Kalau MAMP ditutup, apakah data hilang?", answer: "Tidak; server hanya berhenti", reason: "P6. Data hilang hanya jika DROP." },
    { prompt: "Apa beda DROP dan DELETE?", answer: "DROP (DDL) menghapus tabel; DELETE (DML) menghapus baris", reason: "P4 + P7." }
  ] },
  tip("Hari H", "Baca soal sampai habis, terutama kata <strong>KECUALI</strong> dan <strong>BUKAN</strong>. Untuk soal SQL, periksa: kutip tunggal untuk teks/tanggal, WHERE pada UPDATE/DELETE, koma pada CREATE TABLE, dan titik koma di akhir.", "warn")
];
