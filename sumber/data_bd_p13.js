// Basis Data — Pertemuan 13: Relasi Antar Tabel dan Kunci Tamu (Bab 12 Bagian 1). Sumber: Modul Ajar Basis Data P13.
// Bagian bertanda ➕ bukan dari modul. Pesan galat dihasilkan lab SQL (bd_uas_util.galat), dialek MariaDB.
const { SEED, lab, galat, CREATE_PINJAM, PINJAM, values } = require("./bd_uas_util.js");
const PREP = CREATE_PINJAM + "\nINSERT INTO peminjaman VALUES\n" + values(PINJAM) + ";";
const no = sql => galat("sepuluh", sql, PREP).match(/^ERROR (\d+)/)[1];
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const RAK = "CREATE TABLE rak (\n  id_rak   CHAR(3)     NOT NULL,\n  nama_rak VARCHAR(30) NOT NULL,\n  lantai   INT         NOT NULL,\n  PRIMARY KEY (id_rak)\n);\nINSERT INTO rak VALUES\n('RK1','Rak Pemrograman',1),\n('RK2','Rak Jaringan',1),\n('RK3','Rak Umum',2);";
const RAK_ISI = "ALTER TABLE buku ADD id_rak CHAR(3) NULL;\nUPDATE buku SET id_rak = 'RK1' WHERE id_buku IN ('BK001','BK002','BK006','BK009');\nUPDATE buku SET id_rak = 'RK2' WHERE id_buku IN ('BK003','BK007');\nUPDATE buku SET id_rak = 'RK3' WHERE id_rak IS NULL;\nALTER TABLE buku ADD FOREIGN KEY (id_rak) REFERENCES rak(id_rak);\nSELECT id_buku, judul, id_rak FROM buku;";

module.exports = {
  id: "p13",
  nomor: 13,
  judul: "Relasi Antar Tabel dan Kunci Tamu",
  ujian: "UAS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Tabel Saling Menunjuk Lewat Nilai yang Sama",
    text: "Pasang <strong>kunci tamu</strong> (FOREIGN KEY … REFERENCES), bedakan <strong>tabel induk</strong> dan <strong>tabel anak</strong>, baca DESCRIBE (PRI, MUL), lalu uji tiga penjagaan DBMS lewat galat <strong>1452</strong>, <strong>1451</strong>, dan <strong>1005 errno 150</strong>. Bab 12 Bagian 1."
  },
  cheatsheet: [
    { type: "code", label: "Interaktif 1 • Perintah Inti", title: "Kunci Tamu di Dalam CREATE TABLE", file: "SQL", code: CREATE_PINJAM, note: "Urutan di dalam kurung: <strong>kolom dulu</strong>, lalu PRIMARY KEY, lalu FOREIGN KEY. Tabel <code>buku</code> dan <code>anggota</code> (induk) harus sudah ada." },
    { type: "table", label: "Interaktif 2 • Istilah", title: "Kunci Primer, Kunci Tamu, Induk, Anak", headers: ["Istilah", "Arti", "Pada skema perpustakaan"],
      rows: [
        ["Kunci primer", "Kolom yang nilainya unik, penanda satu baris", "<code>buku.id_buku</code>, <code>anggota.id_anggota</code>, <code>peminjaman.id_pinjam</code>"],
        ["Kunci tamu", "Kolom yang isinya harus sudah ada di kunci primer tabel lain", "<code>peminjaman.id_buku</code>, <code>peminjaman.id_anggota</code>"],
        ["Tabel induk", "Tabel yang <strong>ditunjuk</strong>", "buku, anggota"],
        ["Tabel anak", "Tabel yang <strong>memuat</strong> kunci tamu", "peminjaman"],
        ["Tabel penghubung", "Lahir dari relasi banyak ke banyak; memuat dua kunci tamu", "peminjaman"]
      ],
      modes: [{ label: "Cara mengingat", target: "row", row: 3, title: "Anak membawa nomor induknya", text: "Yang menulis FOREIGN KEY adalah anak. Yang disebut sesudah REFERENCES adalah induk." }] },
    { type: "table", label: "Interaktif 3 • DESCRIBE", title: "Membaca Kolom Key", mono: true, headers: ["Tanda", "Arti"],
      rows: [["PRI", "Kunci primer (ikon kunci emas di tab Struktur)"], ["MUL", "Nilai boleh berulang; kolom kunci tamu (ikon kunci perak). Satu buku boleh dipinjam berkali-kali"], ["Null = YES", "Boleh kosong; di peminjaman hanya tgl_kembali (buku belum kembali)"]] },
    { type: "table", label: "Interaktif 4 • Tiga Penjagaan", title: "Nomor Galat Kunci Tamu", mono: true, headers: ["Galat", "Terjadi saat", "Perbaikan"],
      rows: [
        ["ERROR 1452 … child row", "INSERT/UPDATE anak dengan nilai yang tidak ada di induk (BK099)", "Isi dulu baris induk, atau betulkan nomornya"],
        ["ERROR 1451 … parent row", "DELETE baris induk yang masih ditunjuk, atau DROP TABLE induk", "Hapus dulu baris anaknya, atau biarkan induknya"],
        ["ERROR 1005 errno 150", "CREATE TABLE: tipe beda, yang ditunjuk bukan kunci, atau induk belum dibuat", "Samakan tipe; tunjuk kunci primer; buat induk dulu"]
      ],
      modes: [
        { label: "Hafalan cepat", target: "col", col: 0, title: "1452 anak, 1451 induk", text: "1452 menyebut <em>child row</em> (ditolak di tabel anak). 1451 menyebut <em>parent row</em> (ditolak di tabel induk). Angka 150 selalu berarti masalah kunci tamu." },
        { label: "➕ MySQL 8", target: "row", row: 2, title: "Nomor berbeda", text: "MySQL 8 memberi galat yang lebih spesifik (3780 tipe tidak cocok, 1822 tidak ada indeks, 1824 tabel induk tidak ada) dan 3730 untuk DROP TABLE induk. Modul memakai MariaDB (MAMP), jadi yang keluar 1005 errno 150 dan 1451." }
      ] },
    { type: "table", label: "Interaktif 5 • Syarat", title: "Syarat Kunci Tamu Bisa Dipasang", headers: ["Syarat (modul)", "Catatan"],
      rows: [
        ["Tipe data sama", "CHAR dengan CHAR, INT dengan INT. INT → CHAR(5) gagal (1005 errno 150)"],
        ["Yang ditunjuk kunci primer", "➕ Tepatnya: kolom yang ber-indeks unik (PRIMARY KEY atau UNIQUE). <code>buku.pengarang</code> tidak bisa"],
        ["Tabel induk sudah ada", "Buat buku dan anggota sebelum peminjaman"],
        ["Mesin InnoDB", "Mesin lain (MyISAM) menerima perintah tetapi aturannya tidak terpasang"]
      ] },
    { type: "callout", tone: "warn", label: "Catatan Modul", heading: "\"Panjang harus sama persis\"", html: "Modul menulis kolom kunci tamu harus sama persis tipe <em>dan panjangnya</em>. Pada MariaDB dan MySQL, untuk CHAR/VARCHAR panjang boleh berbeda: <code>id_pinjam CHAR(5)</code> yang menunjuk <code>CHAR(6)</code> tetap bisa dibuat. Masalahnya muncul saat mengisi: <code>'PJ0001'</code> (6 huruf) ditolak <strong>ERROR 1406 Data too long</strong>. Kesimpulannya tetap: samakan panjangnya. Untuk ujian, ikuti jawaban modul." }
  ],
  simulator: [
    lab({ profile: "bd-p13", label: "Lab phpMyAdmin • Praktik Terpandu Modul", title: "Membuat Kunci Tamu dan Mengujinya",
      desc: "Data berisi <strong>sepuluh buku</strong> dan <strong>tiga anggota</strong> (Bab 11). Tabel <code>peminjaman</code> belum ada: buat dulu lewat langkah 2, isi lewat langkah 5, lalu jalankan percobaan yang sengaja gagal (⚠).",
      seed: SEED.sepuluh,
      examples: [
        { label: "1 · Periksa data", sql: "SELECT COUNT(*) AS jumlah_buku FROM buku;\nSELECT COUNT(*) AS jumlah_anggota FROM anggota;" },
        { label: "2 · Buat peminjaman", sql: CREATE_PINJAM },
        { label: "3 · DESCRIBE", sql: "DESCRIBE peminjaman;" },
        { label: "5 · Isi enam baris", sql: "INSERT INTO peminjaman VALUES\n" + values(PINJAM) + ";\nSELECT * FROM peminjaman;" },
        { label: "⚠ 6 · Buku BK099", sql: "INSERT INTO peminjaman VALUES\n('PJ0007','BK099','AG001','2026-10-11',NULL);" },
        { label: "⚠ 7 · Hapus BK002", sql: "DELETE FROM buku WHERE id_buku = 'BK002';" },
        { label: "⚠ 8 · Anggota AG009", sql: "INSERT INTO peminjaman VALUES\n('PJ0007','BK001','AG009','2026-10-11',NULL);" },
        { label: "9 · Hapus BK004 lalu kembalikan", sql: "DELETE FROM buku WHERE id_buku = 'BK004';\nINSERT INTO buku VALUES\n('BK004','Analisis Sistem Informasi','Siti Nurhaliza',2022,6);\nSELECT COUNT(*) AS jumlah_buku FROM buku;" },
        { label: "⚠ Hapus tabel induk", sql: "DROP TABLE buku;" },
        { label: "⚠ Tipe data berbeda", sql: "CREATE TABLE coba (\n  id INT NOT NULL PRIMARY KEY,\n  id_buku INT NOT NULL,\n  FOREIGN KEY (id_buku) REFERENCES buku(id_buku)\n);" },
        { label: "⚠ Menunjuk bukan kunci", sql: "CREATE TABLE ulasan (\n  id_ulasan CHAR(5) NOT NULL PRIMARY KEY,\n  pengarang VARCHAR(50) NOT NULL,\n  FOREIGN KEY (pengarang) REFERENCES buku(pengarang)\n);" },
        { label: "⚠ Hapus anggota AG001", sql: "DELETE FROM anggota WHERE id_anggota = 'AG001';" },
        { label: "Mini-case · tabel rak", sql: RAK },
        { label: "Mini-case · pasang FK rak", sql: RAK_ISI },
        { label: "⚠ Mini-case · RK9", sql: "UPDATE buku SET id_rak = 'RK9' WHERE id_buku = 'BK001';" }
      ] }),
    { type: "exercise", label: "Permainan 1 • Tebak Nomor Galat", title: "Diterima atau Ditolak dengan Galat Apa?", headers: ["Perintah (peminjaman sudah berisi enam baris)", "Hasil"],
      rows: [
        ["INSERT INTO peminjaman VALUES ('PJ0007','BK099','AG001','2026-10-11',NULL);", "1452", "BK099 tidak ada di tabel buku: baris anak ditolak."],
        ["DELETE FROM buku WHERE id_buku = 'BK009';", "1451", "BK009 masih ditunjuk PJ0004 dan PJ0006."],
        ["DELETE FROM buku WHERE id_buku = 'BK010';", "OK", "BK010 belum pernah dipinjam, jadi tidak ada anak yang menunjuknya."],
        ["DROP TABLE anggota;", "1451", "Tabel anggota masih ditunjuk kunci tamu peminjaman."],
        ["CREATE TABLE coba (id INT PRIMARY KEY, id_buku INT, FOREIGN KEY (id_buku) REFERENCES buku(id_buku));", "1005", "INT menunjuk CHAR(5): errno 150."],
        ["DELETE FROM peminjaman WHERE id_pinjam = 'PJ0001';", "OK", "Menghapus baris anak selalu boleh; tidak ada yang menunjuk peminjaman."]
      ].map(([sql, a, ok]) => {
        let hasil = "OK";
        try { hasil = no(sql); } catch (e) { hasil = "OK"; }
        if (hasil !== a) throw new Error("data_bd_p13: kunci permainan tidak cocok: " + sql + " → " + hasil);
        return { cells: [`<code>${esc(sql)}</code>`], fields: [{ options: ["OK", "1452", "1451", "1005"], answer: a }], ok: "✓ " + ok };
      }) },
    { type: "exercise", label: "Permainan 2 • Induk atau Anak?", title: "Peran Setiap Tabel", headers: ["Tabel / relasi", "Peran"],
      rows: [
        ["buku, pada relasi buku–peminjaman", "Induk", "Ditunjuk oleh peminjaman.id_buku."],
        ["peminjaman", "Anak", "Memuat dua kunci tamu."],
        ["anggota, pada relasi anggota–peminjaman", "Induk", "Ditunjuk oleh peminjaman.id_anggota."],
        ["rak, pada mini-case rak buku", "Induk", "Satu rak memuat banyak buku; buku membawa id_rak."],
        ["buku, pada mini-case rak buku", "Anak", "Kini buku memuat kunci tamu id_rak, jadi buku bisa menjadi induk sekaligus anak."]
      ].map(([q, a, ok]) => ({ cells: [q], fields: [{ options: ["Induk", "Anak"], answer: a }], ok: "✓ " + ok })) },
    { type: "reveal", label: "Latihan Bertingkat · Tingkat 2", title: "Tiga Perintah Ditolak: Sebab dan Perbaikannya", items: [
      { prompt: "1. CREATE TABLE denda (id_denda CHAR(5) NOT NULL PRIMARY KEY, id_pinjam CHAR(5) NOT NULL, FOREIGN KEY (id_pinjam) REFERENCES peminjaman(id_pinjam));", answer: "Ganti id_pinjam menjadi CHAR(6), sama dengan peminjaman.id_pinjam.", reason: "Menurut modul, panjangnya harus sama. ➕ Di MariaDB/MySQL tabelnya sebenarnya bisa dibuat, tetapi saat diisi: " + galat("sepuluh", "CREATE TABLE denda (id_denda CHAR(5) NOT NULL PRIMARY KEY, id_pinjam CHAR(5) NOT NULL, FOREIGN KEY (id_pinjam) REFERENCES peminjaman(id_pinjam)); INSERT INTO denda VALUES ('DN001','PJ0001');", PREP).replace(/\. Kolom.*$/, ".") },
      { prompt: "2. CREATE TABLE ulasan (…, pengarang VARCHAR(50) NOT NULL, FOREIGN KEY (pengarang) REFERENCES buku(pengarang));", answer: "Tunjuk kunci primer: id_buku CHAR(5) … REFERENCES buku(id_buku).", reason: "pengarang bukan kunci primer (nilainya berulang: Andi Wibowo tiga buku), jadi " + galat("sepuluh", "CREATE TABLE ulasan (id_ulasan CHAR(5) NOT NULL PRIMARY KEY, pengarang VARCHAR(50) NOT NULL, FOREIGN KEY (pengarang) REFERENCES buku(pengarang));", PREP).replace(/\. Kolom.*$/, ".") },
      { prompt: "3. DELETE FROM anggota WHERE id_anggota = 'AG001';", answer: "Hapus dulu baris peminjaman AG001 (PJ0001, PJ0004, PJ0006), atau biarkan anggotanya tetap ada.", reason: "AG001 masih ditunjuk tiga baris peminjaman → ERROR 1451 (parent row). Jangan mematikan aturannya." }
    ] },
    { type: "reveal", label: "Mini-Case Modul", title: "Pencatatan Rak Buku", items: [
      { prompt: "1. Mana tabel induk dan anak?", answer: "rak = induk, buku = anak.", reason: "Satu rak memuat banyak buku, jadi sisi \"banyak\" (buku) yang membawa nomor rak." },
      { prompt: "2. Buat tabel rak dan isi tiga baris", answer: RAK.replace(/\n/g, " "), reason: "id_rak CHAR(3) sebagai kunci primer." },
      { prompt: "3–4. Tambah kolom, isi, lalu pasang kunci tamu", answer: "ALTER TABLE buku ADD id_rak CHAR(3) NULL; UPDATE … SET id_rak = …; ALTER TABLE buku ADD FOREIGN KEY (id_rak) REFERENCES rak(id_rak);", reason: "Urutan 3 lalu 4: kunci tamu tidak bisa dipasang bila masih ada nomor rak yang tidak ada di tabel rak. Kolom yang masih NULL boleh. Pembagian buku ke rak di lab adalah contoh, modul tidak menentukannya." },
      { prompt: "5. Isi salah satu buku dengan RK9", answer: "ERROR 1452 (child row)", reason: "RK9 tidak ada di tabel rak; buku sekarang tabel anak." },
      { prompt: "Sesudah selesai", answer: "ALTER TABLE buku DROP FOREIGN KEY buku_ibfk_1; ALTER TABLE buku DROP COLUMN id_rak; DROP TABLE rak;", reason: "Kunci tamu dilepas dulu, baru kolom dan tabel induknya. Nama aturan dilihat di SHOW CREATE TABLE buku;. ➕ Lab Sinau tidak mendukung DROP FOREIGN KEY; tekan Atur ulang untuk mengembalikan data." }
    ] }
  ],
  flashcards: [
    { tag: "P13", q: "Apa itu kunci tamu (foreign key)?", a: "Kolom yang isinya harus sudah ada pada kunci primer tabel lain." },
    { tag: "P13", q: "Beda kunci primer dan kunci tamu?", a: "Kunci primer menandai baris di tabelnya sendiri (unik). Kunci tamu menunjuk kunci primer tabel lain (boleh berulang)." },
    { tag: "P13", q: "Tabel induk vs tabel anak?", a: "Induk = yang ditunjuk (buku, anggota). Anak = yang memuat kunci tamu (peminjaman)." },
    { tag: "P13", q: "Bentuk umum pemasangan kunci tamu?", a: "<code>FOREIGN KEY (kolom) REFERENCES tabel_induk(kolom_induk)</code> di dalam CREATE TABLE, sesudah daftar kolom." },
    { tag: "P13", q: "Mengapa buku harus dibuat lebih dulu daripada peminjaman?", a: "Kunci tamu menunjuk tabel buku. Tabel yang ditunjuk belum ada → ERROR 1005 errno 150." },
    { tag: "P13", q: "Mengapa id_buku di peminjaman bertanda MUL, bukan PRI?", a: "Kolom kunci tamu harus boleh berulang: satu buku dapat dipinjam berkali-kali (BK002 dua kali)." },
    { tag: "P13", q: "Arti NULL pada tgl_kembali?", a: "Buku masih di tangan peminjam, belum punya tanggal kembali." },
    { tag: "P13", q: "ERROR 1452 terjadi kapan?", a: "Menambah/mengubah baris anak dengan nilai yang tidak ada di induk (child row). Contoh BK099." },
    { tag: "P13", q: "ERROR 1451 terjadi kapan?", a: "Menghapus baris induk yang masih ditunjuk, atau menghapus tabel induk (parent row)." },
    { tag: "P13", q: "ERROR 1005 errno 150 artinya?", a: "Kunci tamu tidak bisa dibentuk: tipe beda, yang ditunjuk bukan kunci, atau tabel induk belum ada. Angka 150 selalu masalah kunci tamu." },
    { tag: "P13", q: "BK004 belum pernah dipinjam. Bisakah dihapus?", a: "Bisa. Tidak ada baris peminjaman yang menunjuknya." },
    { tag: "P13", q: "Tiga syarat kunci tamu menurut modul?", a: "Tipe (dan panjang) sama, yang ditunjuk kunci primer, tabel induk sudah ada. Ditambah mesin InnoDB." }
  ],
  quiz: [
    { q: "Menurut modul, relasi antar tabel dibangun lewat …", opts: ["Nilai yang sama pada kolom kedua tabel", "Garis penghubung di phpMyAdmin", "Nama tabel yang mirip", "Urutan baris yang sama"], ans: 0, exp: "Relasi dibangun lewat nilai yang sama, bukan garis.", optExp: ["Benar.", "Garis hanya gambar.", "Bukan.", "Bukan."] },
    { q: "Kunci tamu adalah kolom yang …", opts: ["Isinya harus sudah ada pada kunci primer tabel lain", "Nilainya selalu unik", "Boleh berisi apa saja", "Selalu bertipe INT"], ans: 0, exp: "Kunci tamu menunjuk kunci primer tabel lain.", optExp: ["Benar.", "Itu kunci primer.", "Dijaga DBMS.", "Tipe mengikuti induk."] },
    { q: "Pada skema perpustakaan, tabel anak adalah …", opts: ["peminjaman", "buku", "anggota", "buku dan anggota"], ans: 0, exp: "Anak memuat kunci tamu.", optExp: ["Benar.", "Induk.", "Induk.", "Keduanya induk."] },
    { q: "Tabel peminjaman disebut tabel penghubung karena …", opts: ["Lahir dari relasi banyak ke banyak dan memuat dua kunci tamu", "Isinya paling banyak", "Dibuat paling awal", "Tidak memiliki kunci primer"], ans: 0, exp: "Menghubungkan buku dan anggota.", optExp: ["Benar.", "Bukan alasannya.", "Justru paling akhir.", "Punya id_pinjam."] },
    { q: "Penulisan kunci tamu yang benar adalah …", opts: ["FOREIGN KEY (id_buku) REFERENCES buku(id_buku)", "FOREIGN KEY buku(id_buku) REFERENCES (id_buku)", "REFERENCES (id_buku) FOREIGN KEY buku", "FOREIGN (id_buku) KEY buku"], ans: 0, exp: "Kolom anak di dalam kurung, sesudah REFERENCES tabel induk dan kolomnya.", optExp: ["Benar.", "Terbalik.", "Urutan salah.", "Salah sintaks."] },
    { q: "Mengapa tabel buku dan anggota harus dibuat sebelum peminjaman?", opts: ["Kunci tamu peminjaman menunjuk keduanya", "Agar urutan abjad", "Karena buku lebih penting", "Tidak wajib"], ans: 0, exp: "Induk belum ada → ERROR 1005 errno 150.", optExp: ["Benar.", "Bukan.", "Bukan.", "Wajib."] },
    { q: "Pada hasil DESCRIBE peminjaman, kolom id_buku bertanda …", opts: ["MUL", "PRI", "UNI", "Kosong"], ans: 0, exp: "MUL: nilai boleh berulang (kunci tamu).", optExp: ["Benar.", "PRI hanya id_pinjam.", "Bukan unik.", "Bertanda MUL."] },
    { q: "Mengapa kolom kunci tamu harus boleh berulang?", opts: ["Satu buku dapat dipinjam berkali-kali", "Agar boleh NULL", "Agar lebih cepat", "Karena bertipe CHAR"], ans: 0, exp: "BK002 muncul dua kali di peminjaman.", optExp: ["Benar.", "Bukan.", "Bukan.", "Bukan."] },
    { q: "Pada tab Struktur phpMyAdmin, kolom kunci tamu ditandai …", opts: ["Ikon kunci perak", "Ikon kunci emas", "Tulisan FK merah", "Tanda bintang"], ans: 0, exp: "Kunci emas = kunci primer.", optExp: ["Benar.", "Itu kunci primer.", "Bukan.", "Bukan."] },
    { q: "Satu-satunya kolom peminjaman yang boleh kosong adalah …", opts: ["tgl_kembali", "tgl_pinjam", "id_buku", "id_anggota"], ans: 0, exp: "NULL = buku belum dikembalikan.", optExp: ["Benar.", "NOT NULL.", "NOT NULL.", "NOT NULL."] },
    { q: "Pada enam baris peminjaman modul, berapa baris yang tgl_kembali-nya NULL?", opts: ["4", "2", "6", "3"], ans: 0, exp: "PJ0002, PJ0003, PJ0005, PJ0006.", optExp: ["Benar.", "Itu yang sudah kembali.", "Bukan.", "Bukan."] },
    { q: "INSERT peminjaman dengan id_buku 'BK099' menghasilkan …", opts: ["ERROR 1452 child row", "ERROR 1451 parent row", "ERROR 1005 errno 150", "Query OK"], ans: 0, exp: "BK099 tidak ada di tabel buku.", optExp: ["Benar.", "Itu menghapus induk.", "Itu saat CREATE TABLE.", "Ditolak."] },
    { q: "DELETE FROM buku WHERE id_buku = 'BK002'; menghasilkan …", opts: ["ERROR 1451, karena BK002 masih ditunjuk peminjaman", "Query OK, 1 row affected", "ERROR 1452", "ERROR 1146"], ans: 0, exp: "Perbaikan: hapus dulu baris peminjamannya, atau biarkan bukunya.", optExp: ["Benar.", "Ditolak.", "1452 untuk anak.", "Tabelnya ada."] },
    { q: "BK004 belum pernah dipinjam. DELETE FROM buku WHERE id_buku = 'BK004'; …", opts: ["Berhasil, karena tidak ada baris anak yang menunjuknya", "Ditolak 1451", "Ditolak 1452", "Menghapus juga baris peminjaman"], ans: 0, exp: "Penjagaan hanya berlaku bila masih ditunjuk.", optExp: ["Benar.", "Tidak ditunjuk.", "Bukan anak.", "Tidak ada yang dihapus."] },
    { q: "Apa beda keadaan galat 1452 dan 1451?", opts: ["1452 di tabel anak (nilai induk tidak ada); 1451 di tabel induk (masih ditunjuk)", "1452 saat DROP; 1451 saat INSERT", "Keduanya sama", "1452 tipe beda; 1451 tabel tidak ada"], ans: 0, exp: "child row vs parent row.", optExp: ["Benar.", "Terbalik/keliru.", "Berbeda.", "Itu 1005."] },
    { q: "DROP TABLE buku; ketika peminjaman masih menunjuknya menghasilkan (MariaDB) …", opts: ["ERROR 1451", "Query OK", "ERROR 1452", "ERROR 1005"], ans: 0, exp: "➕ MySQL 8 memberi 3730.", optExp: ["Benar.", "Ditolak.", "Bukan.", "Bukan."] },
    { q: "Membuat kunci tamu INT yang menunjuk buku.id_buku CHAR(5) menghasilkan …", opts: ["ERROR 1005 errno 150", "ERROR 1452", "Query OK", "ERROR 1064"], ans: 0, exp: "Tipe beda: aturan tidak dapat dibentuk.", optExp: ["Benar.", "Bukan saat INSERT.", "Ditolak.", "Sintaksnya benar."] },
    { q: "REFERENCES buku(pengarang) ditolak karena …", opts: ["pengarang bukan kunci primer tabel buku", "pengarang bertipe VARCHAR", "Tabel buku belum ada", "Nama kolom terlalu panjang"], ans: 0, exp: "Yang ditunjuk harus kunci primer (atau UNIQUE).", optExp: ["Benar.", "VARCHAR boleh.", "Sudah ada.", "Bukan."] },
    { q: "Perintah berhasil tetapi kunci tamu tidak menjaga apa pun. Penyebab menurut modul …", opts: ["Mesin penyimpanan selain InnoDB", "Tipe data berbeda", "Tabel induk belum ada", "Kolom boleh NULL"], ans: 0, exp: "Periksa SHOW CREATE TABLE: ENGINE=InnoDB.", optExp: ["Benar.", "Itu ditolak 1005.", "Itu ditolak 1005.", "Bukan."] },
    { q: "Pada mini-case rak, mengapa id_rak di buku diisi dulu dengan UPDATE sebelum ALTER TABLE … ADD FOREIGN KEY?", opts: ["Kunci tamu tidak bisa dipasang bila masih ada nomor rak yang tidak terdapat di tabel rak", "Karena ALTER TABLE harus terakhir", "Agar kolom tidak NULL", "Supaya lebih cepat"], ans: 0, exp: "Kolom yang masih NULL boleh; yang tidak boleh nomor yang tidak ada.", optExp: ["Benar.", "Bukan alasannya.", "NULL justru boleh.", "Bukan."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS BASIS DATA — PERTEMUAN 13*
🔗 *Relasi Antar Tabel dan Kunci Tamu (Bab 12 Bagian 1)*

1️⃣ *Relasi* dibangun lewat nilai yang sama, bukan garis.

2️⃣ *Kunci tamu:* isinya harus sudah ada di kunci primer tabel lain. *Induk* = yang ditunjuk (buku, anggota). *Anak* = yang memuat kunci tamu (peminjaman, tabel penghubung dengan dua kunci tamu).

3️⃣ *Perintah:* FOREIGN KEY (id_buku) REFERENCES buku(id_buku), sesudah daftar kolom. Induk dibuat lebih dulu.

4️⃣ *DESCRIBE:* PRI = kunci primer (kunci emas) • MUL = boleh berulang, kunci tamu (kunci perak) • tgl_kembali YES = boleh NULL (belum kembali).

5️⃣ *Galat:* 1452 child row (nilai tak ada di induk, BK099) • 1451 parent row (hapus induk yang ditunjuk, BK002, DROP TABLE buku) • 1005 errno 150 (tipe beda, bukan kunci primer, induk belum ada).

6️⃣ BK004 belum pernah dipinjam → boleh dihapus. Mesin harus InnoDB.`
};
