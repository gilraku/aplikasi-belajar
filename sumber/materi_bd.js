// Materi Lengkap — Basis Data P2 (modul + pengayaan dari Fathansyah, Date "An Introduction to Database Systems", Elmasri & Navathe)
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });
const lbl = (x, y, t, size) => text(x, y, t, { size: size || 12, color: "#475569", weight: 600 });

const hierarki = diagram({
  label: "Diagram Interaktif", title: "Hierarki Data: dari Bit ke Basis Data", desc: "Makin ke kanan makin besar. Klik setiap tingkat.", minw: 640,
  svg: svg(800, 170,
    [["Bit|0 / 1", "slate", "bit"], ["Byte|1 karakter", "sky", "byte"], ["Field|kolom", "emerald", "fld"], ["Record|baris", "amber", "rec"], ["File|tabel", "violet", "file"], ["Basis|data", "indigo", "db"]]
      .map(([t, tone, id], i) => box(10 + i * 132, 30 + (5 - i) * 4, 115, 90 - (5 - i) * 8 + i * 4, t, tone, id, { size: 14 }) + (i < 5 ? arrow(127 + i * 132, 78, 140 + i * 132, 78) : "")).join("")
  ),
  parts: [
    { id: "bit", label: "Bit", title: "Bit", text: "Satuan terkecil: 0 atau 1." },
    { id: "byte", label: "Byte", title: "Byte", text: "8 bit, cukup untuk menyimpan satu karakter (huruf, angka, simbol)." },
    { id: "fld", label: "Field", title: "Field / kolom / atribut", text: "Sekumpulan karakter yang punya arti: <code>judul</code>, <code>pengarang</code>." },
    { id: "rec", label: "Record", title: "Record / baris / tuple", text: "Kumpulan field tentang satu objek: seluruh data buku BK002." },
    { id: "file", label: "File", title: "File / tabel / relasi", text: "Kumpulan record sejenis: tabel buku." },
    { id: "db", label: "Basis data", title: "Basis data", text: "Kumpulan file/tabel yang saling berhubungan: tabel buku, anggota, peminjaman." }
  ]
});

const istilah = diagram({
  label: "Diagram Interaktif", title: "Tiga Nama untuk Hal yang Sama", desc: "Dosen, buku, dan software memakai istilah berbeda. Klik setiap bagian tabel.", minw: 600,
  svg: svg(800, 300,
    (() => { const W = [90, 175, 105, 75, 75]; const X = W.reduce((a, w, k) => (a.push(k ? a[k - 1] + W[k - 1] : 20), a), []);
      const rows = [["id_buku", "judul", "pengarang", "tahun", "stok"], ["BK001", "Dasar Pemrograman", "Andi", "2019", "4"], ["BK002", "Sistem Basis Data", "Rina", "2021", "3"], ["BK003", "Jaringan Komputer", "Budi", "2018", "2"]];
      return rows.map((r, ri) => `<g data-part="${ri ? "row" : "head"}">` + r.map((v, ci) => `<rect x="${X[ci]}" y="${20 + ri * 52}" width="${W[ci]}" height="48" fill="${ri ? "#ffffff" : C.indigo[0]}" stroke="${ri ? "#cbd5e1" : C.indigo[1]}" stroke-width="1.5"/>` + text(X[ci] + W[ci] / 2, 44 + ri * 52, v, { size: 13, color: ri ? "#0f172a" : C.indigo[2], weight: ri ? 500 : 700 })).join("") + "</g>").join(""); })() +
    `<g data-part="col"><rect x="110" y="16" width="175" height="214" rx="6" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="3"/></g>` +
    box(20, 245, 520, 45, "seluruh tabel", "slate", "tbl", { r: 4, size: 13, dash: "5 4" }) +
    box(570, 20, 220, 270, "", "white", "map") +
    text(680, 50, "Formal → File → Umum", { size: 13, color: "#334155" }) +
    text(680, 95, "Relasi → File → Tabel", { size: 12, color: C.slate[2], weight: 600 }) +
    text(680, 135, "Tuple → Record → Baris", { size: 12, color: C.slate[2], weight: 600 }) +
    text(680, 175, "Atribut → Field → Kolom", { size: 12, color: C.amber[2], weight: 600 }) +
    text(680, 215, "Kardinalitas → jumlah baris", { size: 12, color: C.slate[2], weight: 600 }) +
    text(680, 255, "Derajat → jumlah kolom", { size: 12, color: C.slate[2], weight: 600 })
  ),
  parts: [
    { id: "head", label: "Header", title: "Baris judul (skema)", text: "Nama-nama kolom. Bukan data, jadi tidak dihitung sebagai baris data. ➕ Struktur ini disebut <strong>skema relasi</strong>: <code>buku(id_buku, judul, pengarang, tahun, stok)</code>." },
    { id: "row", label: "Baris", title: "Baris = record = tuple", text: "Satu baris menyimpan keterangan lengkap satu buku. ➕ Jumlah baris disebut <strong>kardinalitas</strong>." },
    { id: "col", label: "Kolom", title: "Kolom = field = atribut", text: "Satu jenis keterangan untuk semua baris. ➕ Jumlah kolom disebut <strong>derajat (degree)</strong>. Kumpulan nilai yang boleh diisi pada satu kolom disebut <strong>domain</strong> (misalnya tahun: 4 digit)." },
    { id: "tbl", label: "Tabel", title: "Tabel = relasi = file", text: "Kata “relasional” berasal dari <em>relation</em> = tabel, bukan dari “hubungan antartabel”. ➕ Model ini dikemukakan E. F. Codd (IBM) pada 1970." },
    { id: "map", label: "Peta istilah", title: "Peta istilah", text: "Istilah formal dipakai di teori, istilah file dipakai di sistem berkas lama, istilah umum dipakai di MySQL/phpMyAdmin. Ketiganya sering muncul bercampur di soal." }
  ]
});

const kunci = diagram({
  label: "Diagram Interaktif • ➕ Tambahan", title: "Kunci Primer, Kandidat, dan Tamu", desc: "Dua tabel yang dihubungkan oleh kunci. Klik setiap kunci.", minw: 620,
  svg: svg(800, 290,
    box(10, 20, 330, 250, "", "white", "") + text(175, 42, "Tabel buku", { size: 14 }) +
    box(25, 60, 140, 42, "🔑 id_buku", "amber", "pk", { size: 13, r: 6 }) + box(180, 60, 145, 42, "isbn", "sky", "ck", { size: 13, r: 6 }) +
    box(25, 112, 300, 36, "judul", "white", "", { size: 12, r: 6 }) + box(25, 156, 300, 36, "pengarang", "white", "", { size: 12, r: 6 }) + box(25, 200, 300, 36, "tahun, stok", "white", "", { size: 12, r: 6 }) +
    box(460, 20, 330, 250, "", "white", "") + text(625, 42, "Tabel peminjaman", { size: 14 }) +
    box(475, 60, 300, 42, "🔑 id_pinjam", "amber", "pk2", { size: 13, r: 6 }) + box(475, 112, 300, 42, "🔗 id_buku", "rose", "fk", { size: 13, r: 6 }) +
    box(475, 164, 300, 36, "nim_anggota", "white", "", { size: 12, r: 6 }) + box(475, 208, 300, 36, "tgl_pinjam, tgl_kembali", "white", "", { size: 12, r: 6 }) +
    path("M473,133 L410,133 L410,8 L95,8 L95,57") + lbl(400, 160, "merujuk ke")
  ),
  parts: [
    { id: "pk", label: "Primary key", title: "Kunci primer (primary key)", text: "Kolom yang dipilih sebagai penanda unik setiap baris: wajib unik dan tidak boleh NULL. Sebaiknya singkat, stabil, dan tidak berubah. Itulah sebabnya <code>judul</code> tidak dipilih." },
    { id: "ck", label: "Candidate key", title: "Kunci kandidat", text: "Kolom lain yang juga unik dan bisa menjadi kunci primer, misalnya ISBN. Kandidat yang tidak dipilih disebut ➕ <strong>kunci alternatif</strong>." },
    { id: "pk2", label: "PK peminjaman", title: "Setiap tabel punya kunci primernya sendiri", text: "Satu buku bisa dipinjam berkali-kali, jadi transaksi peminjaman butuh kunci sendiri." },
    { id: "fk", label: "Foreign key", title: "➕ Kunci tamu (foreign key)", text: "Kolom yang merujuk ke kunci primer tabel lain. Inilah yang menghubungkan tabel. Nilainya harus ada di tabel induk (<em>referential integrity</em>): tidak boleh meminjam buku BK999 yang tidak ada. Materi ini akan dibahas lebih dalam di pertemuan relasi/ERD." }
  ]
});

const komponen = diagram({
  label: "Diagram Interaktif", title: "Komponen Sistem Basis Data", desc: "DBMS adalah intinya: perantara antara pemakai dan data. Klik setiap komponen.", minw: 620,
  svg: svg(800, 300,
    box(10, 20, 150, 60, "👤 User 1", "slate", "usr", { size: 13 }) + box(10, 95, 150, 60, "👤 User 2", "slate", "usr", { size: 13 }) + box(10, 170, 150, 60, "📱 Aplikasi", "white", "app", { size: 13, dash: "5 4" }) +
    arrow(162, 50, 268, 110) + arrow(162, 125, 268, 125) + arrow(162, 200, 268, 140) +
    box(270, 75, 200, 100, "DBMS|MySQL, PostgreSQL,|SQL Server", "violet", "dbms", { size: 14, sw: 4 }) +
    arrow(472, 125, 538, 125) +
    box(540, 50, 250, 150, "", "emerald", "db") + text(665, 72, "Basis data", { size: 14, color: C.emerald[2] }) +
    box(560, 90, 100, 36, "buku", "white", "db", { size: 12 }) + box(670, 90, 100, 36, "anggota", "white", "db", { size: 12 }) + box(560, 140, 210, 36, "peminjaman", "white", "db", { size: 12 }) +
    box(10, 250, 380, 42, "Sistem Operasi (Windows, Linux)", "sky", "os", { size: 13 }) +
    box(410, 250, 380, 42, "Perangkat Keras (server, disk, jaringan)", "amber", "hw", { size: 13 })
  ),
  parts: [
    { id: "hw", label: "Hardware", title: "1. Perangkat keras", text: "Komputer/server, media penyimpanan (harddisk/SSD), memori, dan jaringan." },
    { id: "os", label: "OS", title: "2. Sistem operasi", text: "Program yang mengelola sumber daya komputer dan menjalankan DBMS." },
    { id: "db", label: "Basis data", title: "3. Basis data", text: "Kumpulan tabel yang saling berhubungan. Satu sistem bisa punya banyak basis data (db_perpus, db_akademik)." },
    { id: "dbms", label: "DBMS", title: "4. DBMS (inti)", text: "Database Management System: perangkat lunak yang mengelola basis data, mengatur akses banyak pemakai, keamanan, dan integritas. Contoh: MySQL/MariaDB (dipakai di XAMPP), PostgreSQL, Oracle, SQL Server ➕." },
    { id: "usr", label: "User", title: "5. Pemakai", text: "➕ Jenisnya: <strong>DBA</strong> (administrator basis data), <strong>programmer aplikasi</strong>, <strong>user mahir</strong> (langsung menulis query SQL), dan <strong>user umum</strong> (lewat aplikasi, misalnya mahasiswa di SIAKAD)." },
    { id: "app", label: "Aplikasi", title: "6. Aplikasi lain (opsional)", text: "Program yang dibuat untuk memudahkan pemakai umum, misalnya web PHP yang terhubung ke MySQL. Opsional karena pemakai mahir bisa langsung memakai DBMS." }
  ]
});

const operasi = diagram({
  label: "Diagram Interaktif", title: "8 Operasi Dasar Basis Data", desc: "Dua kelompok: mengubah struktur (DDL) dan mengubah isi (DML). Klik setiap operasi.", minw: 620,
  svg: svg(800, 260,
    box(10, 10, 385, 50, "STRUKTUR (DDL)", "violet", "ddl", { size: 15 }) + box(405, 10, 385, 50, "ISI DATA (DML / CRUD)", "emerald", "dml", { size: 15 }) +
    [["create database", "cdb"], ["drop database", "ddb"], ["create table", "ctb"], ["drop table", "dtb"]].map(([t, id], i) => box(10 + (i % 2) * 195, 75 + Math.floor(i / 2) * 85, 190, 70, t, "white", id, { size: 14 })).join("") +
    [["insert", "ins"], ["retrieve / select", "sel"], ["update", "upd"], ["delete", "del"]].map(([t, id], i) => box(405 + (i % 2) * 195, 75 + Math.floor(i / 2) * 85, 190, 70, t, "white", id, { size: 14 })).join("")
  ),
  parts: [
    { id: "ddl", label: "DDL", title: "Data Definition Language", text: "Perintah yang membentuk dan menghapus <strong>wadah</strong>: database dan tabel. ➕ Termasuk juga ALTER TABLE untuk mengubah struktur." },
    { id: "dml", label: "DML", title: "Data Manipulation Language", text: "Perintah yang mengelola <strong>isi</strong>. Sama dengan CRUD: Create (insert), Read (select), Update, Delete." },
    { id: "cdb", label: "create db", title: "create database", text: "<code>CREATE DATABASE db_perpus;</code>" },
    { id: "ddb", label: "drop db", title: "drop database", text: "<code>DROP DATABASE db_perpus;</code> ⚠️ Semua tabel dan isinya ikut hilang." },
    { id: "ctb", label: "create table", title: "create table", text: "<code>CREATE TABLE buku (id_buku CHAR(5) PRIMARY KEY, judul VARCHAR(80) NOT NULL, …);</code>" },
    { id: "dtb", label: "drop table", title: "drop table", text: "Menghapus tabel beserta isinya. Beda dengan DELETE yang hanya menghapus baris." },
    { id: "ins", label: "insert", title: "insert", text: "<code>INSERT INTO buku VALUES ('BK006', 'Pemrograman Web', 'Wicak', 2023, 2);</code>" },
    { id: "sel", label: "select", title: "retrieve / select", text: "<code>SELECT judul, stok FROM buku WHERE stok &gt; 2;</code>" },
    { id: "upd", label: "update", title: "update", text: "<code>UPDATE buku SET stok = 5 WHERE id_buku = 'BK005';</code> ⚠️ Tanpa WHERE, semua baris berubah." },
    { id: "del", label: "delete", title: "delete", text: "<code>DELETE FROM buku WHERE id_buku = 'BK003';</code> ⚠️ Tanpa WHERE, semua baris terhapus (tabelnya tetap ada)." }
  ]
});

const M = {
  p2: [
    A("Dari Lemari Arsip ke Basis Data", `<p>Bayangkan kantor yang menyimpan arsip pegawai, pembelian, produksi, dan penjualan di lemari. Basis data memindahkan lemari itu ke media penyimpanan elektronik: setiap map menjadi <strong>file/tabel</strong>, dan seluruh lemari menjadi <strong>basis data</strong>. Prinsip utamanya sama dengan lemari yang rapi: <strong>pengaturan data</strong> agar mudah dicari dan tidak berulang.</p>
<p>Modul memberi dua definisi: (1) kumpulan data yang saling berhubungan, disimpan bersama <strong>tanpa pengulangan (redundansi) yang tidak perlu</strong>, untuk memenuhi berbagai kebutuhan; (2) kumpulan file yang saling berkaitan dalam media elektronik sehingga membentuk <strong>satu bangunan data</strong> untuk menginformasikan satu perusahaan/instansi.</p>`, "Bagian 1"),
    hierarki,
    A("Model Data Relasional", `<p>Model data adalah cara mengatur dan menggambarkan data. Model yang paling banyak dipakai saat ini adalah <strong>model relasional</strong>: semua data disimpan dalam <strong>tabel dua dimensi</strong> (baris dan kolom). ➕ Model ini diperkenalkan E. F. Codd pada 1970 dan menjadi dasar MySQL, PostgreSQL, Oracle, dan SQL Server. Model lain yang pernah/masih dipakai: hierarkis, jaringan, dan NoSQL (dokumen, key-value) ➕.</p>`, "Bagian 2"),
    istilah,
    A("Lima Aturan Tabel yang Baik", `<p>Agar komputer bisa mencari, menyaring, dan menghitung tanpa menebak, tabel relasional harus memenuhi aturan berikut (nomor sesuai modul):</p>
<ol><li><strong>Satu sel satu nilai.</strong> Tidak boleh “Rina, Andi” dalam satu sel pengarang. ➕ Ini disebut nilai <em>atomik</em> dan merupakan syarat bentuk normal pertama (1NF).</li><li><strong>Satu kolom sejenis.</strong> Kolom tahun hanya berisi tahun; tidak boleh tercampur teks “belum tahu”.</li><li><strong>Tidak ada baris kembar.</strong> Dijamin oleh kunci primer yang unik.</li><li><strong>Urutan baris tidak berarti.</strong> Baris boleh diurutkan ulang tanpa mengubah arti.</li><li><strong>Urutan kolom tidak berarti.</strong> Kolom boleh ditukar posisinya.</li></ol>`, "Bagian 3"),
    ex("Latihan Interaktif", "Aturan Nomor Berapa yang Dilanggar?", ["Kasus", "Aturan"], ["Aturan 1", "Aturan 2", "Aturan 3"], [
      ["Sel pengarang berisi “Rina Kartika, Andi Wibowo”", "Aturan 1"],
      ["Kolom tahun berisi 2021, 2019, “tahun lalu”", "Aturan 2"],
      ["Dua baris sama-sama ber-id BK001", "Aturan 3"],
      ["Sel nomor_hp berisi dua nomor dipisah garis miring", "Aturan 1"],
      ["Kolom stok berisi 4, 3, “habis”", "Aturan 2"]
    ]),
    kunci,
    rv("Cek Pemahaman", "Layak Jadi Kunci Primer?", [
      { prompt: "nama_mahasiswa", answer: "Tidak", reason: "Bisa ada nama yang sama, dan nama bisa berubah/salah ketik." },
      { prompt: "nim", answer: "Ya", reason: "Unik, singkat, tidak berubah selama kuliah." },
      { prompt: "email", answer: "Kandidat, tetapi kurang ideal", reason: "Unik, tetapi bisa diganti pemiliknya; lebih cocok sebagai kunci alternatif." },
      { prompt: "tanggal_lahir", answer: "Tidak", reason: "Banyak orang lahir di tanggal yang sama." }
    ]),
    A("NULL Bukan Nol", `<p><strong>NULL</strong> berarti nilainya <em>belum diketahui atau belum diisi</em>. Ia berbeda dari angka 0 (sudah dihitung, hasilnya nol) dan berbeda dari spasi atau teks kosong. Kolom yang wajib terisi diberi aturan (constraint) <strong>NOT NULL</strong>; kunci primer otomatis tidak boleh NULL.</p>
<p>➕ Akibat praktis di SQL: ${"<code>WHERE stok = NULL</code>"} tidak akan pernah menemukan apa pun; yang benar ${"<code>WHERE stok IS NULL</code>"}. Fungsi seperti AVG juga mengabaikan NULL, jadi rata-rata stok bisa berbeda jika NULL diganti 0.</p>`, "Bagian 4"),
    { type: "table", label: "Tabel Interaktif", title: "Tipe Data MySQL yang Sering Dipakai", headers: ["Tipe", "Isi", "Contoh kolom"],
      rows: [["CHAR(n)", "Teks panjang tetap", "id_buku CHAR(5), kode_rak CHAR(3)"], ["VARCHAR(n)", "Teks panjang berubah, maks n", "judul VARCHAR(80), nomor_hp VARCHAR(15)"], ["INT", "Bilangan bulat", "stok, jumlah_halaman"], ["DECIMAL(p,s) ➕", "Angka desimal presisi tepat", "harga DECIMAL(10,2), ipk DECIMAL(3,2)"], ["YEAR", "Tahun 4 digit", "tahun_terbit"], ["DATE", "Tanggal YYYY-MM-DD", "tgl_pinjam"], ["DATETIME ➕", "Tanggal dan jam", "waktu_login"], ["TEXT ➕", "Teks sangat panjang", "sinopsis, isi_berita"], ["ENUM ➕", "Salah satu dari daftar", "jenis_kelamin ENUM('L','P')"]],
      modes: [{ label: "Jebakan nomor HP", target: "row", row: 1, title: "nomor_hp = VARCHAR", text: "Tidak dihitung secara matematis, diawali 0 yang akan hilang jika INT, dan bisa memuat + atau tanda hubung." },
        { label: "Uang", target: "row", row: 3, title: "➕ Jangan FLOAT untuk uang", text: "FLOAT menyimpan nilai perkiraan sehingga bisa muncul selisih pembulatan; DECIMAL menyimpan angka persis." }] },
    ex("Latihan Interaktif", "Pilih Tipe Data", ["Kolom", "Tipe"], ["CHAR", "VARCHAR", "INT", "DECIMAL", "YEAR", "DATE"], [
      ["nim (selalu 10 digit, diawali 0 di beberapa angkatan)", "CHAR", "✓ Panjang tetap dan tidak dihitung."],
      ["alamat", "VARCHAR"],
      ["jumlah_sks", "INT"],
      ["harga_buku (Rp 85.500,50)", "DECIMAL"],
      ["tahun_angkatan", "YEAR"],
      ["tgl_lahir", "DATE"],
      ["kode_pos (5 digit)", "CHAR", "✓ Panjang tetap, tidak dihitung, bisa diawali 0 di beberapa negara."]
    ]),
    A("Tujuh Tujuan Basis Data", `<p>Modul menyebut tujuh tujuan (objektif) pemanfaatan basis data: <strong>Speed</strong> (cepat dan mudah), <strong>Space</strong> (efisien ruang, menekan redundansi), <strong>Accuracy</strong> (akurat lewat tipe data, kunci, constraint), <strong>Availability</strong> (data aktif dan historis tetap tersedia), <strong>Completeness</strong> (struktur dan isi bisa dilengkapi), <strong>Security</strong> (siapa boleh melakukan apa), dan <strong>Sharability</strong> (dipakai banyak pemakai sekaligus).</p>`, "Bagian 5"),
    ex("Latihan Interaktif", "Contoh Ini Mewujudkan Tujuan Apa?", ["Contoh", "Tujuan"], ["Speed", "Space", "Accuracy", "Availability", "Completeness", "Security", "Sharability"], [
      ["Mahasiswa hanya bisa melihat nilainya sendiri, dosen bisa mengubah nilai", "Security"],
      ["Ratusan mahasiswa mengisi KRS pada jam yang sama", "Sharability"],
      ["Nama prodi disimpan sekali di tabel prodi, bukan diulang di tiap mahasiswa", "Space"],
      ["Kolom tahun menolak isian “dua ribu”", "Accuracy"],
      ["Mencari 1 dari 50.000 buku dalam hitungan detik", "Speed"],
      ["Menambah kolom email ke tabel anggota tanpa membuat ulang", "Completeness"],
      ["Data peminjaman tahun lalu dipindah ke arsip tetapi masih bisa dibuka", "Availability"]
    ]),
    operasi,
    A("Sistem Basis Data dan DBMS", `<p>Basis data tidak bekerja sendirian. <strong>Sistem basis data</strong> adalah gabungan perangkat keras, sistem operasi, basis data, <strong>DBMS</strong>, pemakai, dan (opsional) aplikasi. DBMS menjadi perantara sehingga banyak pemakai atau program dapat mengakses tabel yang sama secara bersamaan tanpa saling merusak data.</p>`, "Bagian 6"),
    komponen,
    { type: "table", label: "Tabel Interaktif • ➕ Tambahan", title: "Mengapa Tidak Pakai File Biasa (Excel/Arsip)?", headers: ["Masalah sistem file", "Contoh", "Solusi basis data"],
      rows: [["Redundansi", "Alamat anggota ditulis di file anggota dan file peminjaman", "Disimpan sekali, dihubungkan dengan kunci"], ["Inkonsistensi", "Alamat diubah di satu file, file lain masih alamat lama", "Satu sumber data"], ["Sulit diakses", "Mencari buku yang dipinjam lebih dari 3 kali harus buka banyak file", "Query SQL"], ["Isolasi data", "Format file tiap bagian berbeda-beda", "Struktur seragam dalam DBMS"], ["Banyak pemakai", "Dua petugas mengedit file yang sama lalu saling menimpa", "DBMS mengatur akses bersamaan"], ["Keamanan", "Semua yang membuka file bisa melihat semua isi", "Hak akses per pemakai"]],
      modes: [{ label: "Yang paling sering diuji", target: "row", row: 0, title: "Redundansi → inkonsistensi", text: "Data yang disimpan berulang (redundan) membuka peluang data tidak konsisten. Basis data mengatasinya dengan relasi antartabel." }] }
  ]
};
const X = require("./materi_bd_extra.js");
M.p1 = X.P1;
M.p2 = M.p2.concat(X.ERD);
M.p3 = require("./materi_bd_p3.js");
M.p4 = require("./materi_bd_p4.js");
for (const p of ["p5", "p6", "p7", "p8"]) M[p] = require("./materi_bd_" + p + ".js");
module.exports = M;
