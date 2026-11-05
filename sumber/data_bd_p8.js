// Basis Data — Pertemuan 8: UTS (materi P1–P7). Bank soal latihan buatan sendiri, bukan soal ujian asli.
const P4 = require("./data_bd_p4.js");
const lama = JSON.parse(JSON.stringify(P4.quiz)); // soal [P1]–[P4] dari bank CPMK 1
const Q = (p, q, opts, ans, exp) => ({ q: `[P${p}] ${q}`, opts, ans, exp });
const baru = [
  // P5
  Q(5, "Sumber utama dari ketiga anomali data adalah…", ["Redundansi", "Kunci tamu", "Tipe data DATE", "Porta 3306"], 0, "Keterangan yang sama disimpan di banyak tempat."),
  Q(5, "Dosen baru tidak bisa dicatat di tabel jadwal karena belum mengajar kelas mana pun. Ini anomali…", ["Pengubahan", "Penyisipan", "Penghapusan", "Rujukan"], 1, ""),
  Q(5, "Harga produk diperbarui hanya di sebagian baris penjualan. Ini anomali…", ["Pengubahan", "Penyisipan", "Penghapusan", "Transitif"], 0, ""),
  Q(5, "Notasi id_anggota → nama berarti…", ["nama menentukan id_anggota", "Jika id_anggota diketahui, nama pasti bisa ditentukan", "id_anggota adalah kunci tamu", "nama boleh NULL"], 1, "Ketergantungan fungsional."),
  Q(5, "Kolom telepon1, telepon2, telepon3 dalam satu tabel melanggar…", ["1NF", "2NF", "3NF", "Integritas rujukan"], 0, "Kelompok kolom berulang."),
  Q(5, "Ketergantungan id_denda → id_anggota → nama_anggota disebut ketergantungan…", ["Parsial", "Transitif", "Penuh", "Gabungan"], 1, "Dibuang pada 3NF."),
  Q(5, "Tabel dengan kunci primer satu kolom otomatis memenuhi…", ["1NF", "2NF (jika sudah 1NF)", "3NF", "Semua bentuk normal"], 1, "2NF baru terasa pada kunci gabungan."),
  Q(5, "Hasil normalisasi tabel peminjaman_kacau sama dengan hasil…", ["Instalasi MAMP", "Transformasi ERD pada P4", "Perintah DROP", "SHOW DATABASES"], 1, "Dua jalan, satu hasil."),
  // P6
  Q(6, "DBMS disebut server karena…", ["Dibuka seperti dokumen", "Merupakan layanan yang menunggu dan menjawab permintaan", "Hanya berjalan di internet", "Berbentuk berkas .sql"], 1, ""),
  Q(6, "Komponen MAMP yang menyusun halaman phpMyAdmin adalah…", ["Apache", "MySQL", "PHP", "Peramban"], 2, ""),
  Q(6, "Menghapus aplikasi phpMyAdmin akan…", ["Menghapus semua basis data", "Tidak menghapus data di MySQL", "Menghapus tabel buku saja", "Mematikan porta 80 selamanya"], 1, ""),
  Q(6, "Porta bawaan Apache pada MAMP macOS adalah…", ["80", "3306", "8888", "8889"], 2, "MySQL macOS: 8889."),
  Q(6, "Basis data yang menyimpan daftar pengguna dan hak akses MySQL adalah…", ["mysql", "perpustakaan", "information_schema", "phpmyadmin"], 0, "Jangan dihapus."),
  Q(6, "Perintah yang benar untuk membuat basis data adalah…", ["CREATE TABLE perpustakaan;", "CREATE DATABASE perpustakaan;", "NEW DATABASE perpustakaan;", "MAKE perpustakaan;"], 1, ""),
  Q(6, "Halaman localhost/phpMyAdmin tidak dapat dijangkau. Langkah pertama yang tepat…", ["Menghapus basis data mysql", "Menekan Start Servers di MAMP dan mencocokkan alamat", "Mengganti nama basis data", "Menjalankan DROP DATABASE"], 1, ""),
  Q(6, "ERROR 1007 muncul ketika…", ["Membuat basis data dengan nama yang sudah ada", "Menghapus tabel yang tidak ada", "Lupa memilih basis data", "Kunci tamu tidak ditemukan"], 0, ""),
  // P7
  Q(7, "Perintah yang termasuk DDL adalah…", ["INSERT", "SELECT", "CREATE TABLE", "COMMIT"], 2, ""),
  Q(7, "ALTER pada kelompok DDL digunakan untuk…", ["Mengubah isi data", "Mengubah struktur/rangka tabel", "Membatalkan transaksi", "Memberi hak akses"], 1, "Dibahas di Bab 8."),
  Q(7, "Kolom judul berisi teks yang panjangnya berbeda-beda paling banyak 80 huruf. Tipe yang tepat…", ["CHAR(80)", "VARCHAR(80)", "INT(80)", "YEAR"], 1, ""),
  Q(7, "Penulisan nilai tipe DATE yang benar adalah…", ["12/09/2026", "'2026-09-12'", "2026.09.12", "'12-09-2026'"], 1, "Tahun-bulan-hari dalam kutip tunggal."),
  Q(7, "Perintah berikut menghasilkan galat: CREATE TABLE coba (a INT); padahal belum memilih basis data. Galatnya…", ["ERROR 1046", "ERROR 1050", "ERROR 1051", "ERROR 1068"], 0, "No database selected."),
  Q(7, "DROP TABLE anggota; padahal tabel anggota belum dibuat menghasilkan…", ["ERROR 1050", "ERROR 1051", "ERROR 1452", "Berhasil"], 1, "Unknown table."),
  Q(7, "Pada DESCRIBE buku, kolom Null bernilai NO karena…", ["Kolom ditulis NOT NULL", "Kolom bertipe CHAR", "Tabel masih kosong", "Kolom adalah kunci tamu"], 0, ""),
  Q(7, "Dua baris PRIMARY KEY dalam satu CREATE TABLE menghasilkan…", ["ERROR 1068 Multiple primary key defined", "ERROR 1007", "Tabel dengan dua kunci", "ERROR 1046"], 0, ""),
  Q(7, "Satu-satunya cara mengembalikan tabel yang terhapus dengan DROP adalah…", ["ROLLBACK", "Salinan cadangan (backup)", "UNDO TABLE", "SHOW TABLES"], 1, "DROP adalah DDL, tidak bisa di-ROLLBACK.")
];
module.exports = {
  id: "p8", nomor: 8, judul: "UTS: Ulasan Pertemuan 1–7", ujian: "UTS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Satu Benang Merah: dari Lemari Arsip ke CREATE TABLE",
    text: "Halaman ulasan UTS. Ikuti perjalanan perpustakaan dari <strong>konsep data</strong>, <strong>model relasional</strong>, <strong>ERD</strong>, <strong>transformasi ke tabel & SQL DML</strong>, <strong>normalisasi</strong>, <strong>MAMP</strong>, sampai <strong>DDL</strong>. Tab Kuis berisi <strong>bank soal latihan P1–P7</strong> (bukan soal ujian asli)."
  },
  cheatsheet: [
    { type: "callout", tone: "warn", heading: "Strategi UTS", html: "Bank soal ini latihan, bukan bocoran. Kerjakan sampai skor penuh, lalu baca pembahasan setiap soal. Fokus yang paling sering muncul: data vs informasi, hierarki data, aturan tabel relasional, tipe data & NULL, notasi ERD & kardinalitas, 4 aturan transformasi, perintah DML, tiga anomali & 1NF–3NF, peran Apache/MySQL/phpMyAdmin, serta CREATE TABLE dan pesan galatnya." },
    { type: "table", label: "Interaktif 1 • Peta Pertemuan", title: "Tujuh Pertemuan dalam Satu Tabel", headers: ["P", "Topik", "Yang wajib dikuasai"],
      rows: [["1", "Konsep dasar & DBMS", "Data vs informasi, lemari arsip (basis data–tabel–baris–kolom), DBMS, masalah lembar kerja"], ["2", "Model relasional", "Istilah tabel, aturan tabel, kunci primer, NULL, tipe data, tujuan & komponen basis data"], ["3", "ERD", "Notasi Chen, 5 langkah, kardinalitas 1:1/1:N/M:N, jenis atribut, derajat relasi"], ["4", "ERD → tabel + SQL DML", "Skema relasi, kunci tamu, 4 aturan, INSERT/SELECT/UPDATE/DELETE, COMMIT/ROLLBACK"], ["5", "Normalisasi", "Redundansi, 3 anomali, ketergantungan fungsional, 1NF/2NF/3NF"], ["6", "MAMP & phpMyAdmin", "Apache/MySQL/PHP/phpMyAdmin, localhost & porta, basis data sistem, CREATE DATABASE"], ["7", "DDL", "USE, CREATE TABLE, 5 tipe data, NOT NULL, PRIMARY KEY, SHOW TABLES, DESCRIBE, DROP"]],
      modes: [{ label: "Benang merah", target: "none", title: "Satu kasus: perpustakaan", text: "Semua pertemuan memakai kasus yang sama: buku, anggota, peminjaman. P3 menggambarnya, P4 dan P5 (dua jalan) menghasilkan tiga tabel yang sama, P6–P7 mulai membuatnya di komputer." }] },
    { type: "table", label: "Interaktif 2 • Kamus Pesan Galat", title: "Semua Nomor Galat P1–P7", mono: true, headers: ["Galat", "Arti", "P"],
      rows: [["1064", "Kesalahan penulisan (sintaks, koma, spasi di nama)", "1, 7"], ["1146", "Tabel tidak ada (salah nama tabel)", "1"], ["1054", "Kolom tidak dikenal", "1"], ["1046", "Belum memilih basis data", "1, 7"], ["1062", "Kunci primer kembar (Duplicate entry)", "2, 4, 5"], ["1366", "Nilai tidak sesuai tipe data", "2"], ["1048", "Kolom NOT NULL diisi NULL", "2"], ["1452", "Kunci tamu tidak ada di tabel rujukan", "4"], ["1364", "Kolom wajib tanpa nilai bawaan (anomali penyisipan)", "5"], ["1007", "Basis data sudah ada", "6"], ["1050", "Tabel sudah ada", "7"], ["1051", "Tabel yang dihapus tidak ada", "7"], ["1068", "PRIMARY KEY ganda", "7"], ["4161", "Tipe data tidak dikenal (MariaDB)", "7"]],
      defaultNote: "Tip: kelompokkan menurut “sudah ada” (1007, 1050, 1062), “tidak ada” (1046, 1051, 1054, 1146, 1452), dan “salah tulis/isi” (1064, 1366, 1048, 1364, 1068, 4161)." },
    { type: "cards", label: "Interaktif 3 • Kata yang Sering Tertukar", title: "Pasangan Mirip, Beda Arti", cols: 3, items: [
      { badge: "Data vs Informasi", tone: "sky", title: "Mentah vs bermakna", text: "2018 = data. “Ada dua judul dengan stok < 3” = informasi." },
      { badge: "PK vs FK", tone: "rose", title: "Penanda vs penunjuk", text: "PK unik di tabelnya (garis penuh). FK menunjuk PK tabel lain, boleh berulang (titik-titik, MUL)." },
      { badge: "DDL vs DML", tone: "violet", title: "Rangka vs isi", text: "CREATE/ALTER/DROP vs INSERT/SELECT/UPDATE/DELETE." },
      { badge: "ALTER vs UPDATE", tone: "amber", title: "Struktur vs nilai", text: "ALTER menambah kolom; UPDATE mengubah isi kolom." },
      { badge: "DELETE vs DROP", tone: "rose", title: "Baris vs tabel", text: "DELETE menghapus baris (bisa ROLLBACK). DROP menghapus tabel/basis data (tidak bisa)." },
      { badge: "MySQL vs phpMyAdmin", tone: "emerald", title: "Lemari vs loket", text: "Data di MySQL; phpMyAdmin hanya halaman pengelola." }
    ] },
    { type: "table", label: "Interaktif 4 • Kardinalitas ke Tabel", title: "Rumus Kilat P3 → P4", headers: ["Kardinalitas", "Hasil tabel", "Letak FK"],
      rows: [["1 : 1", "2 tabel", "Salah satu (lazimnya tabel yang bergantung)"], ["1 : N", "2 tabel", "Di sisi banyak"], ["M : N", "3 tabel", "Di tabel penghubung (kedua FK + atribut relasi)"]] }
  ],
  simulator: [
    { type: "exercise", label: "Permainan Interaktif 1 • Ini Materi Pertemuan Berapa?", title: "Cocokkan Konsep dengan Pertemuannya", headers: ["Konsep", "Pertemuan"],
      rows: [["Belah ketupat untuk relasi", "P3"], ["ERROR 1452 a foreign key constraint fails", "P4"], ["Anomali penghapusan", "P5"], ["localhost:8888/phpMyAdmin", "P6"], ["DESCRIBE buku; menampilkan year(4)", "P7"], ["Sel berisi satu nilai, kolom sejenis", "P2"], ["Lemari = basis data, laci = tabel", "P1"], ["UPDATE tanpa WHERE", "P4"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["P1", "P2", "P3", "P4", "P5", "P6", "P7"], answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 2 • Galat Apa?", title: "Tebak Nomor Galatnya", headers: ["Kejadian", "Galat"],
      rows: [["INSERT peminjaman dengan id_buku BK999", "1452"], ["CREATE TABLE buku untuk kedua kalinya", "1050"], ["INSERT mahasiswa dengan NIM yang sudah ada", "1062"], ["CREATE DATABASE perpustakaan untuk kedua kalinya", "1007"], ["SELECT * FROM bukku;", "1146"], ["CREATE TABLE tanpa memilih basis data", "1046"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["1007", "1046", "1050", "1062", "1146", "1452"], answer: a }], ok: "✓" })) },
    { type: "terminal", label: "Permainan Interaktif 3 • SQL Campuran", title: "DDL, DML, dan Galatnya dalam Satu Sesi", desc: "Satu sesi dari nol sampai berisi data.", shell: "mysql>", header: "Ulasan P4 + P6 + P7",
      scenarios: [
        { label: "1. Buat basis data", pill: "OK", ok: true, cmd: "CREATE DATABASE perpustakaan;\nUSE perpustakaan;", res: "Query OK, 1 row affected\nDatabase changed", exp: "P6 + P7." },
        { label: "2. Buat tabel anggota", pill: "OK", ok: true, cmd: "CREATE TABLE anggota (\n  id_anggota CHAR(5) NOT NULL,\n  nama VARCHAR(50) NOT NULL,\n  prodi VARCHAR(40) NOT NULL,\n  PRIMARY KEY (id_anggota)\n);", res: "Query OK, 0 rows affected", exp: "P7: kunci jawaban cek pemahaman no. 2." },
        { label: "3. Isi satu anggota", pill: "1 row", ok: true, cmd: "INSERT INTO anggota VALUES ('AG001','Ahmad Fauzi','Sistem Informasi');", res: "Query OK, 1 row affected", exp: "P4: teks dalam kutip tunggal." },
        { label: "4. Isi dengan nama NULL", code: "1048", pill: "ERROR 1048", ok: false, cmd: "INSERT INTO anggota VALUES ('AG002', NULL, 'Teknik Informatika');", res: "ERROR 1048 (23000): Column 'nama' cannot be null", exp: "P2 + P7: NOT NULL menolak nilai kosong." },
        { label: "5. Tampilkan anggota SI", pill: "1 row", ok: true, cmd: "SELECT nama FROM anggota WHERE prodi = 'Sistem Informasi';", res: "+-------------+\n| nama        |\n+-------------+\n| Ahmad Fauzi |\n+-------------+\n1 row in set", exp: "P4: WHERE." },
        { label: "6. Hapus tabel tanpa ROLLBACK", pill: "permanen", ok: false, cmd: "START TRANSACTION;\nDROP TABLE anggota;\nROLLBACK;\nSHOW TABLES;", res: "Query OK, 0 rows affected\nQuery OK, 0 rows affected\nQuery OK, 0 rows affected\nEmpty set", exp: "⚠️ DROP (DDL) langsung permanen, ROLLBACK tidak menolong. Beda dengan DELETE (DML) di P4." }
      ] },
    { type: "reveal", label: "Studi Kasus Ujung ke Ujung", title: "Kasus Baru: Klinik Kampus", items: [
      { prompt: "Cerita: “Pasien datang berobat ke dokter. Setiap kunjungan dicatat tanggal dan keluhannya. Satu pasien bisa ke banyak dokter, satu dokter melayani banyak pasien.” Entitas, relasi, kardinalitas?", answer: "Pasien —M— berobat —N— Dokter; tanggal & keluhan = atribut relasi", reason: "P3: kata benda → entitas, kata kerja → relasi." },
      { prompt: "Skema relasinya (P4)?", answer: "pasien(id_pasien, nama, …) • dokter(id_dokter, nama, spesialis) • kunjungan(id_kunjungan, id_pasien*, id_dokter*, tanggal, keluhan)", reason: "Aturan 4: M:N → tabel penghubung." },
      { prompt: "Seseorang mengusulkan satu tabel kunjungan yang juga memuat nama pasien dan nama dokter. Masalahnya (P5)?", answer: "Redundansi → anomali pengubahan, penyisipan, penghapusan; melanggar 3NF", reason: "nama_pasien bergantung pada id_pasien, bukan pada id_kunjungan." },
      { prompt: "CREATE TABLE dokter (P7)?", answer: "CREATE TABLE dokter ( id_dokter CHAR(5) NOT NULL, nama VARCHAR(50) NOT NULL, spesialis VARCHAR(40) NOT NULL, PRIMARY KEY (id_dokter) );", reason: "Jalankan di basis data klinik (CREATE DATABASE klinik; USE klinik;)." }
    ] }
  ],
  flashcards: [
    { tag: "P1", q: "Data vs informasi?", a: "Data = fakta mentah tanpa konteks. Informasi = hasil olahan yang bermakna & menjawab pertanyaan." },
    { tag: "P1", q: "Padanan lemari arsip?", a: "Lemari = basis data, laci = tabel, kartu = baris, kotak isian = kolom, petugas = DBMS." },
    { tag: "P2", q: "Aturan tabel relasional?", a: "Satu sel satu nilai, satu kolom sejenis, setiap baris unik (PK), urutan baris & kolom bebas." },
    { tag: "P2", q: "NULL artinya?", a: "Belum diketahui/belum diisi. Bukan 0 dan bukan spasi." },
    { tag: "P3", q: "Notasi Chen?", a: "Entitas = persegi panjang, atribut = elips (kunci bergaris bawah), relasi = belah ketupat." },
    { tag: "P3", q: "Cara menentukan kardinalitas?", a: "Dua pertanyaan dari dua arah: satu A berhubungan dengan berapa B? satu B dengan berapa A?" },
    { tag: "P4", q: "4 aturan transformasi?", a: "Entitas → tabel • 1:1 titip salah satu kunci • 1:N kunci sisi satu ke sisi banyak • M:N → tabel penghubung." },
    { tag: "P4", q: "Bentuk UPDATE yang aman?", a: "UPDATE tabel SET kolom = nilai WHERE kondisi; (SELECT dulu dengan WHERE yang sama)." },
    { tag: "P5", q: "1NF, 2NF, 3NF?", a: "Satu sel satu nilai • bergantung pada seluruh kunci • tidak bergantung pada kolom bukan kunci." },
    { tag: "P6", q: "Siapa menyimpan data di MAMP?", a: "MySQL. Apache menerima permintaan, PHP menyusun halaman, phpMyAdmin hanya pengelola." },
    { tag: "P7", q: "CREATE TABLE minimal?", a: "CREATE TABLE t ( kolom TIPE NOT NULL, …, PRIMARY KEY (kolom) );" },
    { tag: "P7", q: "SHOW TABLES vs SHOW DATABASES?", a: "SHOW DATABASES: daftar basis data (P6). SHOW TABLES: daftar tabel di basis data yang dipakai (P7)." }
  ],
  quiz: lama.concat(baru),
  ringkasan: `*RANGKUMAN BASIS DATA — UTS (P1–P7)*
📚 *Benang merah perpustakaan*

P1 Data mentah → informasi bermakna; DBMS = petugas lemari arsip.
P2 Tabel: satu sel satu nilai, kolom sejenis, PK unik; NULL ≠ 0; pilih tipe data.
P3 ERD Chen: entitas ▭, atribut ⬭, relasi ◇; kardinalitas 1:1, 1:N, M:N.
P4 Skema relasi + FK; 1:N FK ke sisi banyak, M:N tabel penghubung; INSERT/SELECT/UPDATE/DELETE (+WHERE!), COMMIT/ROLLBACK.
P5 Redundansi → 3 anomali; FD A → B; 1NF/2NF/3NF; hasil = P4.
P6 MAMP: Apache, MySQL, PHP, phpMyAdmin; localhost(:8888); CREATE DATABASE.
P7 DDL: USE, CREATE TABLE (tipe, NOT NULL, PRIMARY KEY), SHOW TABLES, DESCRIBE, DROP.
⚠️ Galat: 1007/1050/1062 sudah ada • 1046/1051/1054/1146/1452 tidak ada • 1064/1366/1048/1068 salah tulis/isi.`
};
