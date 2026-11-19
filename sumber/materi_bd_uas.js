// 📖 Materi Lengkap Basis Data P9–P14 (menuju UAS). Sumber: Modul Ajar Basis Data Pertemuan 9–14 (Bab 9–12).
// Setiap istilah dijelaskan: artinya, kapan dipakai, contoh, kesalahan umum. Bagian bertanda ➕ bukan dari modul.
// Kata Kunci dan perumpamaan ("Ibarat") disalin dari modul karena kuis LMS sering menanyakannya persis.
const ADG = require("./adegan_it.js");
const U = require("./bd_uas_util.js");
const { hasil, kueri, jalan, galat, BUKU5, BUKU10, ANGGOTA, PINJAM, KOL_BUKU, KOL_ANGGOTA, KOL_PINJAM } = U;
// Penelusur: tabel sementara per langkah; hl = nomor baris data (0 = baris pertama) yang ditebalkan
const tabel = (cols, rows) => rows.length ? hasil(cols, rows) : "Empty set";
const hlRows = idx => idx.map(i => i + 3);
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const code = (file, src, note, title) => ({ type: "code", label: "Contoh Kode", title, file, code: src, note });
const tbl = (title, headers, rows, modes, label, mono) => ({ type: "table", label: label || "Tabel Interaktif", title, headers, rows, modes, ...(mono ? { mono: true } : {}) });
const ul = items => `<ul class="list-disc pl-5 space-y-1">${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
const salah = (items, heading) => tip(heading || "Kesalahan yang sering terjadi", ul(items), "warn");
const kunci = (n, rows) => ({ type: "table", label: "Kata Kunci Modul", title: `Istilah Kunci Pertemuan ${n}`, headers: ["Istilah", "Arti singkat (sesuai modul)"], rows });
const ibarat = items => ({ type: "reveal", label: "Latihan Interaktif • Perumpamaan Modul", title: "Menurut Modul, Ini Diibaratkan Apa?", items: items.map(([prompt, answer, reason]) => ({ prompt, answer, reason })) });
const modul = (html) => tip("Catatan untuk ujian: kekeliruan atau penyederhanaan di modul", html, "warn");
const M = {};

// ───────────────────────────── P9 ─────────────────────────────
M.p9 = [
  kunci(9, [
    ["DML", "Kelompok perintah SQL yang mengurus isi data, bukan rangkanya."],
    ["INSERT", "Memasukkan baris data baru."],
    ["UPDATE", "Mengubah isi baris yang sudah ada."],
    ["DELETE", "Menghapus baris data."],
    ["WHERE", "Klausa penyaring: baris mana yang dikenai perintah."],
    ["Klausa", "Bagian tambahan perintah SQL, misalnya WHERE pada UPDATE."],
    ["Tanda kutip tunggal", "Pengapit nilai teks dan tanggal pada perintah SQL."],
    ["rows affected", "Keterangan jumlah baris yang terkena sebuah perintah."]
  ]),
  A("DML: Perintah untuk Mengurus Isi Tabel", `<p><strong>DML</strong> (<em>Data Manipulation Language</em>) adalah kelompok perintah SQL untuk mengurus <strong>isi</strong> data: memasukkan (INSERT), mengubah (UPDATE), menghapus (DELETE), dan menampilkan (SELECT, dibahas mulai Bab 10). DML tidak menyentuh <strong>rangka</strong> tabel: nama kolom, tipe data, dan kunci primer tetap seperti saat dibuat.</p>
<p>Rangka tabel diurus <strong>DDL</strong> (<em>Data Definition Language</em>): CREATE, ALTER, DROP (Bab 7 dan 8). Cara membedakannya: kalau yang berubah <em>baris data</em>, itu DML; kalau yang berubah <em>bentuk tabel</em> (kolom bertambah, tabel hilang), itu DDL.</p>
<p>Sepanjang Bab 9 dipakai basis data <code>perpustakaan</code> dengan tabel <code>buku</code> dan <code>anggota</code> yang dibuat di Bab 7–8. Di awal bab, kedua tabel masih <strong>kosong</strong>.</p>`, "Bagian 1"),
  tbl("DDL atau DML?", ["Kelompok", "Mengurus", "Perintah", "Dibahas"], [
    ["DDL", "Rangka tabel", "CREATE, ALTER, DROP", "Bab 7 dan Bab 8"],
    ["DML", "Isi data", "INSERT, UPDATE, DELETE", "Bab 9 (pertemuan ini)"],
    ["DML", "Isi data (menampilkan)", "SELECT", "Bab 10, cabangnya banyak"]
  ], [
    { label: "Jebakan: ALTER vs UPDATE", target: "row", row: 0, title: "Sama-sama \"mengubah\"", text: "<code>ALTER TABLE buku ADD penerbit …</code> mengubah <strong>rangka</strong> (DDL). <code>UPDATE buku SET stok = 6 …</code> mengubah <strong>isi</strong> (DML)." },
    { label: "Jebakan: DROP vs DELETE", target: "row", row: 1, title: "Sama-sama \"menghapus\"", text: "<code>DROP TABLE buku</code> menghapus tabelnya (DDL). <code>DELETE FROM buku</code> menghapus barisnya, tabel tetap ada (DML)." }
  ]),

  A("INSERT: Dua Bentuk Memasukkan Data", `<p><strong>INSERT</strong> menambah baris baru. Modul mengenalkan dua bentuk:</p>
<p><strong>Bentuk pertama</strong>, tanpa nama kolom: <code>INSERT INTO nama_tabel VALUES (nilai1, nilai2, …);</code>. Lebih pendek, tetapi <strong>semua kolom wajib diisi</strong> dan urutannya harus persis seperti urutan kolom di tabel (lihat dengan <code>DESCRIBE buku;</code>).</p>
<p><strong>Bentuk kedua</strong>, menyebut kolom lebih dulu: <code>INSERT INTO nama_tabel (kolom1, kolom2) VALUES (nilai1, nilai2);</code>. <strong>Lebih aman</strong>: urutan bebas, kolom yang punya nilai bawaan (DEFAULT) boleh dilewati, dan perintahnya tetap benar walaupun kelak tabel mendapat kolom baru.</p>
<p><strong>Banyak baris sekaligus:</strong> tulis beberapa kurung, dipisah koma, dengan satu titik koma di akhir. Pesan hasilnya melaporkan jumlah baris yang masuk, misalnya <code>Query OK, 3 rows affected</code>.</p>`, "Bagian 2"),
  code("tab SQL phpMyAdmin", `-- Bentuk pertama
INSERT INTO buku VALUES
('BK001','Dasar Pemrograman Komputer','Andi Wibowo',2019,4);
-- Query OK, 1 row affected

-- Bentuk kedua
INSERT INTO buku (id_buku, judul, pengarang, tahun, stok)
VALUES ('BK002','Sistem Basis Data','Rina Kartika',2021,3);

-- Beberapa baris sekaligus, dipisah koma
INSERT INTO buku VALUES
('BK003','Jaringan Komputer Dasar','Budi Santoso',2018,2),
('BK004','Analisis Sistem Informasi','Siti Nurhaliza',2022,5),
('BK005','Statistika untuk Informatika','Dewi Anggraini',2020,1);
-- Query OK, 3 rows affected`, "Lima baris yang sejak Bab 1 hanya menjadi contoh di atas kertas kini benar-benar tersimpan. Stok BK004 nanti diubah menjadi 6.", "Memasukkan Data Buku"),
  A("Nilai Bawaan (DEFAULT) Bekerja Sendiri", `<p>Kolom <code>status_aktif</code> pada tabel anggota diberi nilai bawaan <code>Y</code> di Bab 8. Artinya: kalau kolom itu <strong>tidak disebut</strong> saat INSERT, DBMS mengisinya sendiri dengan Y.</p>
<p>Ini hanya bisa dimanfaatkan dengan <strong>bentuk kedua</strong>. Pada bentuk pertama, kelima kolom wajib disebut, jadi status_aktif harus ditulis sendiri (misalnya <code>'T'</code>).</p>`),
  code("tab SQL phpMyAdmin", `INSERT INTO anggota (id_anggota, nama, prodi, tgl_daftar) VALUES
('AG001','Ahmad Fauzi','Sistem Informasi','2026-09-12'),
('AG002','Nur Aisyah','Sistem Informasi','2026-09-14');

INSERT INTO anggota VALUES
('AG003','Rangga Pratama','Teknik Informatika','2026-09-15','T');

SELECT * FROM anggota;
${hasil(KOL_ANGGOTA, ANGGOTA)}`, "Baris 1–2: status_aktif tidak disebut, tetapi terisi Y. Inilah nilai bawaan yang dijanjikan di Bab 8.", "Dua Bentuk INSERT pada Tabel anggota"),
  tbl("Cara Menulis Nilai", ["Jenis", "Contoh", "Aturan", "Kalau salah"], [
    ["Teks", "`'Sistem Basis Data'`", "Diapit tanda kutip tunggal", "Tanpa kutip dikira nama kolom: ERROR 1054"],
    ["Tanggal", "`'2026-09-12'`", "Diapit kutip tunggal, urutan tahun-bulan-tanggal", "<code>2026-09-12</code> tanpa kutip dibaca sebagai pengurangan angka"],
    ["Bilangan", "`2021`", "Ditulis apa adanya, tanpa kutip", "<code>'2021'</code> biasanya masih diterima, tetapi bukan kebiasaan yang baik"],
    ["Kosong", "`NULL`", "Ditulis NULL, tanpa kutip", "<code>'NULL'</code> = teks empat huruf, bukan kosong"]
  ], [
    { label: "Kutip tunggal", target: "col", col: 1, title: "Bukan kutip ganda", text: "SQL baku memakai kutip <strong>tunggal</strong> <code>'…'</code>. Teks yang memuat apostrof ditulis dobel: <code>'Jum''at'</code>." },
    { label: "Tanggal", target: "row", row: 1, title: "Tahun-bulan-tanggal", text: "12 September 2026 ditulis <code>'2026-09-12'</code>, bukan <code>'12-09-2026'</code>." }
  ], "Bagian 3"),
  tip("Lewat tampilan: tab Tambahkan dan Jelajahi", "Data juga bisa dimasukkan lewat tab <strong>Tambahkan</strong> di phpMyAdmin: satu kotak isian untuk setiap kolom, dan kolom <em>Jenis</em> menunjukkan tipe data sehingga isian keliru bisa dicegah sejak awal. Hasilnya dilihat di tab <strong>Jelajahi</strong>. Nyaman untuk 1–2 baris; untuk data banyak, perintah SQL lebih cepat dan bisa disimpan lalu dijalankan ulang."),

  A("UPDATE dan DELETE: WHERE Menentukan Barisnya", `<p><strong>UPDATE</strong> mengubah isi baris yang sudah ada: <code>UPDATE nama_tabel SET kolom = nilai_baru WHERE syarat;</code>. Beberapa kolom sekaligus dipisah koma: <code>SET stok = 6, tahun = 2023</code>.</p>
<p><strong>DELETE</strong> menghapus baris: <code>DELETE FROM nama_tabel WHERE syarat;</code>. Yang hilang <strong>barisnya</strong>, bukan sekadar isinya dikosongkan.</p>
<p><strong>WHERE</strong> menentukan baris mana yang dikenai perintah. Paling aman memakai kunci primer (<code>WHERE id_buku = 'BK004'</code>), karena nilainya unik: paling banyak satu baris yang terkena. Syarat pada kolom lain (nama, tahun) bisa mengenai beberapa baris sekaligus.</p>
<p><strong>Tanpa WHERE, perintah dikenakan pada seluruh baris.</strong> Perintahnya tetap sah: tidak ada pesan galat, yang muncul justru pesan berhasil disertai jumlah baris yang terkena. Modul menyebut ini bagian paling berbahaya di mata kuliah ini. Kebiasaan yang menyelamatkan: <strong>tulis klausa WHERE lebih dulu</strong>, baru bagian depannya.</p>`, "Bagian 4"),
  code("tab SQL phpMyAdmin", `-- Stok buku BK004 bertambah satu eksemplar
UPDATE buku SET stok = 6
WHERE id_buku = 'BK004';
-- Query OK, 1 row affected
-- Rows matched: 1  Changed: 1  Warnings: 0

SELECT id_buku, judul, stok FROM buku
WHERE id_buku = 'BK004';
${hasil(["id_buku", "judul", "stok"], [["BK004", "Analisis Sistem Informasi", 6]])}

-- Dimasukkan lalu dihapus lagi
INSERT INTO buku VALUES
('BK006','Buku Uji Coba','Penulis Uji',2024,1);
DELETE FROM buku WHERE id_buku = 'BK006';
-- Tabel kembali berisi lima baris`, "Hanya satu baris yang berubah, sebab WHERE menyebut satu nomor buku yang unik.", "Mengubah dan Menghapus Data"),
  A("Percobaan yang Sengaja Dibiarkan Salah", `<p>Modul mencoba UPDATE dan DELETE <strong>tanpa WHERE</strong> pada tabel <strong>salinan</strong> <code>buku_coba</code>, bukan pada tabel buku. Salinan dibuat dengan <code>CREATE TABLE buku_coba AS SELECT * FROM buku;</code>: tabel baru yang isinya hasil SELECT. Jangan sekali-kali mencobanya pada tabel berisi data penting.</p>
<p>Tidak ada pesan galat sama sekali. Angka <strong>5</strong> pada pesan itulah yang seharusnya menjadi peringatan.</p>`),
  tbl("Tiga Perintah pada buku_coba (5 baris)", ["Perintah", "Pesan", "Akibat"], [
    ["`UPDATE buku_coba SET stok = 0;`", "Query OK, 5 rows affected · Rows matched: 5 Changed: 5", "Seluruh stok menjadi nol: dimaksudkan untuk satu buku, terkena lima"],
    ["`DELETE FROM buku_coba;`", "Query OK, 5 rows affected", "Seluruh isi hilang; SELECT → Empty set. Tabelnya masih ada"],
    ["`DROP TABLE buku_coba;`", "Query OK", "Tabel salinan dihapus (Bab 7)"]
  ], [{ label: "Coba di Simulator", target: "none", title: "Aman dicoba", text: "Tab Simulator punya tombol contoh 8 sampai \"Hapus buku_coba\" dengan urutan yang sama. Datanya bisa dikembalikan kapan saja." }], "Tabel Interaktif"),
  tbl("Membaca Pesan Hasil: rows affected", ["Pesan", "Arti", "Yang diperiksa"], [
    ["`Query OK, 1 row affected`", "Satu baris terkena", "Sesuai bila yang dimaksud satu buku"],
    ["`Query OK, 5 rows affected`", "Lima baris terkena", "Dimaksud satu, terkena lima? WHERE salah atau tidak ada"],
    ["`Rows matched: 5  Changed: 5  Warnings: 0`", "Khusus UPDATE: baris yang cocok dengan WHERE, dan yang benar-benar berubah", "Matched = jumlah baris yang disaring WHERE"],
    ["`Query OK, 0 rows affected`", "Tidak ada baris yang terkena", "Nilai di WHERE salah ketik atau barisnya memang tidak ada"]
  ], [
    { label: "Alat pemeriksa tercepat", target: "col", col: 2, title: "Baca sebelum melanjutkan", text: "Setiap perintah DML yang berhasil melaporkan jumlah baris yang terkena. Bandingkan angka itu dengan jumlah baris yang dimaksud. Kebiasaan ini mencegah banyak kerusakan data." },
    { label: "➕ Changed lebih kecil", target: "row", row: 2, title: "Nilai yang sama tidak dihitung", text: "Kalau stok BK004 sudah 6 lalu di-UPDATE menjadi 6 lagi: <code>Rows matched: 1 Changed: 0</code>. Barisnya cocok, tetapi tidak ada yang berubah." }
  ]),
  tbl("DELETE Bukan DROP TABLE", ["Perintah", "Yang hilang", "Tabel sesudahnya"], [
    ["`DELETE FROM buku WHERE id_buku = 'BK006';`", "Satu baris", "Masih ada, isinya berkurang satu"],
    ["`DELETE FROM buku;`", "Semua baris", "Masih ada, kosong (Empty set)"],
    ["`DROP TABLE buku;`", "Tabel beserta isinya", "Hilang; nama tabel pun tidak ada (Bab 7)"]
  ], [{ label: "Lebih parah lagi", target: "row", row: 2, title: "DROP TABLE", text: "Menghapus tabelnya sekaligus. Seluruh isi dan rangka hilang dalam satu perintah pendek. Satu-satunya jalan kembali adalah salinan cadangan." }]),
  tbl("Enam Masalah Saat Mengisi dan Mengubah Data", ["Pesan", "Penyebab", "Perbaikan"], [
    ["ERROR 1062 Duplicate entry 'BK001' for key 'PRIMARY'", "Nomor buku sudah ada di tabel", "Pakai nomor yang belum pernah dipakai"],
    ["ERROR 1364 Field 'pengarang' doesn't have a default value", "Kolom wajib dilewati, tanpa nilai bawaan", "Isi kolomnya, atau beri nilai bawaan dengan ALTER"],
    ["ERROR 1054 Unknown column 'stokk' in 'SET'", "Nama kolom salah ketik di bagian SET", "Periksa ejaan dengan DESCRIBE"],
    ["ERROR 1054 Unknown column 'Penulis' in 'VALUES'", "Teks tanpa kutip tunggal, dikira nama kolom", "Apit dengan kutip tunggal: 'Penulis'"],
    ["ERROR 1136 Column count doesn't match value count", "Jumlah nilai ≠ jumlah kolom", "Hitung ulang, atau sebut nama kolom"],
    ["Semua baris berubah padahal hanya satu yang dimaksud", "WHERE lupa ditulis. Tanpa pesan galat", "Tulis WHERE lebih dulu; baca rows affected"]
  ], [
    { label: "1054 dua penyebab", target: "col", col: 0, title: "Nomor sama, sebab beda", text: "1054 = DBMS mencari kolom yang tidak ada. Bisa karena nama kolom salah ketik (<code>stokk</code>), bisa karena teks lupa dikutip sehingga dikira nama kolom (<code>Penulis</code>)." },
    { label: "➕ MySQL 8", target: "none", title: "Bunyi pesan bisa sedikit berbeda", text: "Modul memakai MariaDB bawaan MAMP. Di MySQL 8, 1054 berbunyi <code>Unknown column 'stokk' in 'field list'</code>. Nomornya tetap sama." }
  ], "Kesalahan Umum Modul"),
  salah([
    "<strong>Lupa WHERE.</strong> Paling berbahaya karena tidak ada galat. Tulis WHERE dulu, lalu baca rows affected.",
    "<strong>WHERE pada kolom yang tidak unik.</strong> <code>WHERE nama = 'Ahmad Fauzi'</code> bisa mengenai dua orang bernama sama. Pakai kunci primer.",
    "<strong>Bentuk pertama tanpa menghitung kolom.</strong> Lima kolom berarti lima nilai, urut. Tidak yakin? Pakai bentuk kedua.",
    "<strong>Kutip ganda atau tanpa kutip untuk teks dan tanggal.</strong> Pakai kutip tunggal.",
    "<strong>Mengira DELETE menghapus tabel.</strong> DELETE menghapus baris; tabel tetap ada."
  ]),
  ibarat([
    ["DDL dan DML", "DDL = tukang yang membuat lemari. DML = petugas yang mengisi kartunya.", "Petugas menulis kartu baru, mencoret dan membetulkan kartu lama, atau mengeluarkan kartu dari laci. Bentuk lacinya tidak berubah sedikit pun."],
    ["Dua bentuk INSERT", "Dua cara mengisi kartu katalog.", "Cara pertama mengisi semua kotak dari atas ke bawah tanpa melihat namanya: cepat, tapi mudah tergeser satu baris. Cara kedua menyebut nama kotaknya lebih dulu: lebih lambat, tapi hampir tak mungkin salah tempat."],
    ["Klausa WHERE", "Menyebut kartu mana yang dimaksud sebelum menyuruh petugas mencoret.", "\"Coret stoknya jadi nol\" tanpa menyebut kartunya akan dikerjakan petugas pada seluruh kartu di laci, satu per satu, dengan patuh dan tanpa bertanya."],
    ["Angka rows affected", "Petugas yang melapor sesudah bekerja: \"lima kartu sudah dicoret.\"", "Kalau yang dimaksud hanya satu, laporan itu langsung memberi tahu ada yang keliru, dan masih ada waktu memperbaiki sebelum kartu berikutnya ikut tercoret."]
  ])
];

// ───────────────────────────── P10 ─────────────────────────────
const B5 = BUKU5.map(r => r.map(String));
M.p10 = [
  kunci(10, [
    ["Kueri", "Permintaan data yang ditulis dalam bahasa SQL."],
    ["SELECT", "Perintah untuk menampilkan data dari tabel."],
    ["Tanda bintang *", "Berarti semua kolom."],
    ["WHERE", "Klausa penyaring: baris mana yang ditampilkan."],
    ["Operator perbandingan", "Tanda pembanding: sama dengan, lebih besar, lebih kecil."],
    ["AND", "Kedua syarat harus terpenuhi."],
    ["OR", "Salah satu syarat saja sudah cukup."],
    ["NOT", "Pembalik syarat: yang tampil justru yang tidak memenuhi."]
  ]),
  A("SELECT: Menampilkan Isi Tabel", `<p><strong>Kueri</strong> adalah permintaan data yang ditulis dalam bahasa SQL. Perintahnya <strong>SELECT</strong>: sudah dikenal sejak Bab 1, dan mulai Bab 10 dibahas tuntas karena cabangnya paling banyak. Bab 10 dibagi dua pertemuan: Bagian 1 (P10) SELECT dan WHERE, Bagian 2 (P11) pengurutan, pembatasan, dan pencarian pola.</p>
<p><strong>Bentuk:</strong> <code>SELECT * atau daftar_kolom FROM nama_tabel;</code>. <code>SELECT</code> menjawab "kolom apa", <code>FROM</code> menjawab "dari tabel mana".</p>
<p><strong>Tanda bintang <code>*</code></strong> berarti semua kolom. <strong>Menyebut nama kolom</strong> (<code>SELECT judul, stok</code>) hanya menampilkan kolom itu, dengan urutan sesuai yang ditulis. Modul lebih menganjurkan menyebut nama kolom: hasilnya lebih ringkas dan tetap benar walau kelak ada kolom baru.</p>
<p>SELECT tidak mengubah apa pun. Data asli tetap di tabel; yang keluar hanya salinannya.</p>
<p>Data yang dipakai: lima buku dan tiga anggota hasil Bab 9 (stok BK004 = 6).</p>`, "Bagian 1"),
  code("tab SQL phpMyAdmin", kueri("lima", "SELECT judul, pengarang FROM buku;") + "\n\n" + kueri("lima", "SELECT * FROM buku WHERE id_buku = 'BK003';"),
    "Kueri pertama: lima baris tetap keluar (tanpa penyaringan); yang berkurang kolomnya, dari lima menjadi dua. Kueri kedua: satu baris, sebab id_buku adalah kunci primer sehingga syarat pada kolom itu selalu menghasilkan paling banyak satu baris.", "Memilih Kolom dan Menyaring Satu Baris"),

  A("WHERE: Menyaring Baris", `<p><strong>WHERE</strong> adalah klausa penyaring: hanya baris yang memenuhi syarat yang ditampilkan. Bentuk: <code>SELECT daftar_kolom FROM nama_tabel WHERE syarat;</code>. Syarat berisi kolom, operator perbandingan, dan nilai, misalnya <code>stok &gt; 3</code>.</p>
<p>Ada <strong>enam operator perbandingan</strong>. Dua hal yang sering keliru: tanda sama dengan hanya <strong>satu</strong> (<code>=</code>, bukan <code>==</code> seperti di bahasa pemrograman), dan nilai teks tetap diapit <strong>kutip tunggal</strong> (Bab 9). Bilangan ditulis tanpa kutip: <code>stok &gt; 3</code>.</p>`, "Bagian 2"),
  tbl("Enam Operator Perbandingan", ["Operator", "Arti", "Contoh", "Baris keluar (5 buku)"], [
    ["`=`", "Sama dengan", "`id_buku = 'BK003'`", String(jalan("lima", "SELECT id_buku FROM buku WHERE id_buku = 'BK003';").rows.length)],
    ["`<>`", "Tidak sama dengan", "`tahun <> 2019`", String(jalan("lima", "SELECT id_buku FROM buku WHERE tahun <> 2019;").rows.length)],
    ["`>`", "Lebih besar dari", "`stok > 3`", String(jalan("lima", "SELECT id_buku FROM buku WHERE stok > 3;").rows.length)],
    ["`<`", "Lebih kecil dari", "`stok < 3`", String(jalan("lima", "SELECT id_buku FROM buku WHERE stok < 3;").rows.length)],
    ["`>=`", "Lebih besar atau sama dengan", "`tahun >= 2020`", String(jalan("lima", "SELECT id_buku FROM buku WHERE tahun >= 2020;").rows.length)],
    ["`<=`", "Lebih kecil atau sama dengan", "`tahun <= 2020`", String(jalan("lima", "SELECT id_buku FROM buku WHERE tahun <= 2020;").rows.length)]
  ], [
    { label: "= bukan ==", target: "row", row: 0, title: "Satu tanda sama dengan", text: "<code>WHERE tahun == 2020</code> → <code>ERROR 1064 … near '= 2020'</code>. SQL memakai satu tanda sama dengan." },
    { label: ">= mencakup batas", target: "row", row: 4, title: "Batasnya ikut", text: "<code>tahun &gt;= 2020</code> menyertakan buku terbitan 2020 (Statistika). <code>tahun &gt; 2020</code> tidak." },
    { label: "➕ != ", target: "row", row: 1, title: "Bentuk lain tidak sama dengan", text: "MySQL/MariaDB juga menerima <code>!=</code>. Modul memakai <code>&lt;&gt;</code>, bentuk SQL baku." }
  ]),
  code("tab SQL phpMyAdmin", kueri("lima", "SELECT judul, stok FROM buku WHERE stok > 3;") + "\n\n" + kueri("lima", "SELECT judul, tahun FROM buku WHERE tahun <> 2019;"),
    "2 dari 5 baris lolos stok > 3 (angka 3 tanpa kutip, sebab stok bertipe bilangan). tahun <> 2019 mengeluarkan semua kecuali buku terbitan 2019.", "Operator Lebih Besar dan Tidak Sama Dengan"),
  A("Menyaring Nilai Teks", `<p>Untuk kolom teks, nilai diapit kutip tunggal dan tanda <code>=</code> menuntut kecocokan <strong>seluruh isi kolom</strong>.</p>
<ul class="list-disc pl-5 space-y-1"><li><code>WHERE prodi = 'Sistem Informasi'</code> → Ahmad Fauzi dan Nur Aisyah.</li><li><code>'sistem informasi'</code> (huruf kecil) <strong>tetap dikenali</strong>: perbandingan teks di MySQL secara bawaan tidak membedakan huruf besar dan kecil, karena penyortirannya (<em>collation</em>) berakhiran <code>_ci</code> (<em>case insensitive</em>). Perilaku ini bisa berbeda bila penyortiran basis datanya diubah.</li><li><code>'Sistem Info'</code> <strong>tidak dikenali</strong>: isinya tidak persis sama. Pencarian sebagian kata memakai LIKE (Bagian 2, P11).</li></ul>`),
  code("tab SQL phpMyAdmin", kueri("lima", "SELECT nama, prodi FROM anggota\nWHERE prodi = 'Sistem Informasi';") + "\n\n" + kueri("lima", "SELECT nama, status_aktif FROM anggota\nWHERE status_aktif <> 'Y';"),
    "Kolom berisi huruf (status_aktif) juga disaring dengan nilai berkutip. Satu anggota tidak aktif.", "Menyaring Kolom Teks dan Huruf"),

  A("AND, OR, NOT: Menggabungkan Syarat", `<p><strong>AND</strong>: kedua syarat harus terpenuhi sekaligus. <strong>OR</strong>: salah satu syarat terpenuhi sudah cukup. <strong>NOT</strong>: membalik syarat; yang tampil justru yang tidak memenuhi.</p>
<p><strong>Kapan dipakai:</strong> AND untuk mempersempit ("terbitan 2020 ke atas <em>dan</em> stok tiga ke atas"), OR untuk memperluas ("terbitan 2018 <em>atau</em> 2022"). Salah memilih penggabung, hasilnya jauh berbeda: OR hampir selalu menghasilkan lebih banyak baris daripada AND.</p>
<p><strong>Urutan:</strong> AND dikerjakan lebih dulu daripada OR. Bila syarat bercabang, beri <strong>tanda kurung</strong>, persis seperti pada perhitungan matematika.</p>`, "Bagian 3"),
  code("tab SQL phpMyAdmin", kueri("lima", "SELECT judul, tahun, stok FROM buku\nWHERE tahun >= 2020 AND stok >= 3;") + "\n\n" + kueri("lima", "SELECT judul, tahun FROM buku\nWHERE tahun = 2018 OR tahun = 2022;") + "\n\n" + kueri("lima", "SELECT judul, stok FROM buku WHERE NOT stok > 2;"),
    "AND: Statistika (terbitan 2020) tidak ikut, sebab stoknya hanya satu. OR: masing-masing baris memenuhi satu syarat saja. NOT stok > 2 sama dengan stok <= 2, dan bentuk kedua biasanya lebih mudah dibaca.", "AND, OR, dan NOT"),
  tbl("Mengapa Perlu Kurung? (➕ contoh dengan data modul)", ["Kueri", "Dibaca DBMS sebagai", "Hasil"], [
    ["`WHERE tahun = 2018 OR tahun = 2022 AND stok > 5`", "2018, <strong>atau</strong> (2022 dan stok > 5)", jalan("lima", "SELECT judul FROM buku WHERE tahun = 2018 OR tahun = 2022 AND stok > 5;").rows.map(r => r[0]).join(", ")],
    ["`WHERE (tahun = 2018 OR tahun = 2022) AND stok > 5`", "(2018 atau 2022), <strong>dan</strong> stok > 5", jalan("lima", "SELECT judul FROM buku WHERE (tahun = 2018 OR tahun = 2022) AND stok > 5;").rows.map(r => r[0]).join(", ")]
  ], [{ label: "AND lebih dulu", target: "row", row: 0, title: "Tanpa kurung", text: "AND diikat lebih kuat, jadi syarat stok > 5 hanya menempel pada tahun = 2022. Jaringan Komputer Dasar (2018, stok 2) ikut lolos. Dengan kurung, stok > 5 berlaku untuk keduanya." }]),

  A("Urutan Pengerjaan Sebuah Kueri", `<p>SELECT ditulis paling depan, tetapi DBMS mengerjakannya <strong>paling akhir</strong>. Urutannya: <strong>FROM</strong> (ambil tabel) → <strong>WHERE</strong> (buang baris yang tidak memenuhi) → <strong>SELECT</strong> (pilih kolom).</p>
<p>Akibatnya, WHERE <strong>boleh memakai kolom yang tidak ikut ditampilkan</strong>: stok bisa jadi syarat walau yang tampil hanya judul. Penyaringan selesai sebelum kolom dipilih. Telusuri langkahnya di bawah.</p>`, "Bagian 4"),
  (() => {
    const q = "SELECT judul FROM buku WHERE stok > 2;";
    const lolos = B5.map((r, i) => +r[4] > 2 ? i : -1).filter(i => i >= 0);
    return { type: "penelusur", label: "Penelusur Langkah", title: "FROM → WHERE → SELECT", desc: "Tekan <strong>Berikutnya</strong>. Kueri: <code>" + q + "</code>",
      nodes: [{ t: "Tabel buku", s: "5 baris" }, { t: "Hasil", s: "salinan" }],
      steps: [
        { on: 0, label: "1 · FROM buku", msg: tabel(KOL_BUKU, B5), say: "DBMS mengambil <strong>seluruh isi</strong> tabel buku lebih dulu: lima baris, lima kolom." },
        { on: 0, label: "2 · WHERE stok > 2", msg: tabel(KOL_BUKU, B5), hl: hlRows(lolos), say: "Setiap baris diperiksa. Baris yang stoknya lebih dari 2 (ditebalkan) lolos; Jaringan Komputer Dasar (2) dan Statistika (1) disisihkan." },
        { dot: "res", label: "3 · SELECT judul", msg: tabel(["judul"], lolos.map(i => [B5[i][1]])), say: "Baru sekarang kolom dipilih: hanya <code>judul</code>. Kolom stok tidak tampil, padahal tadi dipakai sebagai syarat." }
      ] };
  })(),

  tbl("Enam Masalah Saat Menulis Kueri", ["Keadaan", "Penyebab", "Perbaikan"], [
    ["ERROR 1054 Unknown column 'judl' in 'SELECT'", "Nama kolom salah ketik di SELECT", "Periksa ejaan dengan <code>DESCRIBE buku;</code>"],
    ["ERROR 1064 … near 'Basis Data'", "Nilai teks tidak diapit kutip tunggal", "<code>WHERE judul = 'Sistem Basis Data'</code>"],
    ["ERROR 1064 … near '= 2020'", "Tanda sama dengan ditulis dua kali", "SQL memakai satu tanda sama dengan"],
    ["ERROR 1146 Table 'perpustakaan.bukuu' doesn't exist", "Nama tabel salah ketik", "Periksa daftar tabel dengan <code>SHOW TABLES;</code>"],
    ["Hasil kosong padahal datanya ada", "Syarat terlalu sempit, atau ejaan nilai tidak persis", "Longgarkan syarat; periksa isi kolom tanpa WHERE"],
    ["Semua baris keluar padahal disaring", "Memakai OR padahal yang dimaksud AND", "Periksa penggabung; beri kurung bila bercabang"]
  ], [
    { label: "Empat galat, dua tanpa galat", target: "none", title: "Dua yang terakhir lebih licik", text: "Empat keadaan pertama memunculkan pesan galat. Dua terakhir berjalan mulus tetapi hasilnya bukan yang dimaksud." },
    { label: "➕ MySQL 8", target: "row", row: 0, title: "'field list'", text: "Di MySQL 8 pesannya <code>Unknown column 'judl' in 'field list'</code>. Nomor galatnya sama, 1054." }
  ], "Kesalahan Umum Modul"),
  salah([
    "<strong>Memakai <code>==</code>.</strong> SQL hanya <code>=</code>.",
    "<strong>Teks tanpa kutip.</strong> Teks satu kata dikira nama kolom (1054); teks berspasi menjadi galat sintaks (1064).",
    "<strong>Mengira <code>=</code> mencari sebagian kata.</strong> <code>= 'Sistem Info'</code> tidak menemukan apa-apa. Pakai LIKE (P11).",
    "<strong>OR untuk mempersempit.</strong> \"Terbitan 2020 ke atas <em>yang</em> stoknya tiga ke atas\" berarti AND.",
    "<strong>Mencampur AND dan OR tanpa kurung.</strong> AND dikerjakan lebih dulu."
  ]),
  ibarat([
    ["SELECT", "Menyerahkan formulir permintaan kepada petugas.", "Bertanda bintang: \"salinkan seluruh isi kartunya\". Menyebut kotak tertentu: \"cukup salinkan judul dan stoknya\". Kartu aslinya tidak ke mana-mana; pemohon menerima salinannya."],
    ["WHERE", "Syarat di bawah formulir: \"cukup kartu yang stoknya lebih dari tiga.\"", "Petugas menyisihkan yang tidak memenuhi, lalu menyalin sisanya."],
    ["AND dan OR", "Dua cara petugas membaca syarat.", "\"Terbitan 2020 ke atas dan stok tiga ke atas\": kartu yang hanya memenuhi salah satunya disisihkan. \"Terbitan 2018 atau 2022\": kartu yang memenuhi salah satu saja diambil."],
    ["Urutan pengerjaan kueri", "Petugas mengeluarkan seluruh laci, menyisihkan yang tak memenuhi, baru menyalin kotak yang diminta.", ""]
  ])
];

// ───────────────────────────── P11 ─────────────────────────────
const judulLike = pola => jalan("lima", `SELECT judul FROM buku WHERE judul LIKE '${pola}';`).rows.map(r => r[0]);
M.p11 = [
  kunci(11, [
    ["ORDER BY", "Mengurutkan hasil menurut sebuah kolom."],
    ["ASC", "Urutan menaik, kecil ke besar. Urutan bawaan."],
    ["DESC", "Urutan menurun, besar ke kecil."],
    ["LIMIT", "Membatasi jumlah baris yang ditampilkan."],
    ["DISTINCT", "Membuang nilai kembar pada hasil."],
    ["LIKE", "Mencari sebagian kata, bukan kecocokan penuh."],
    ["% (persen)", "Pengganti berapa pun jumlah huruf pada pola LIKE."],
    ["_ (garis bawah)", "Pengganti tepat satu huruf pada pola LIKE."],
    ["BETWEEN", "Penyaring rentang nilai, termasuk kedua batasnya."],
    ["IN", "Penyaring daftar nilai yang diperbolehkan."],
    ["AS", "Nama lain untuk kolom di tampilan hasil."]
  ]),
  tip("Melanjutkan Bab 10 Bagian 1", "SELECT dan WHERE (P10) dianggap sudah dikuasai. Data masih lima buku dan tiga anggota. Sebagian perintah di sini sudah dikenalkan singkat di P4 (slide SQL); bagian ini membahasnya lengkap sesuai modul Bab 10 Bagian 2."),
  A("ORDER BY: Mengurutkan Hasil", `<p><strong>Mengapa perlu?</strong> Aturan keempat Bab 2: urutan baris di dalam tabel tidak berarti apa-apa. Tanpa ORDER BY, urutan hasil <strong>tidak dijamin</strong>. Kalau urutan penting, harus diminta secara khusus.</p>
<p><strong>Bentuk:</strong> <code>SELECT daftar_kolom FROM nama_tabel ORDER BY nama_kolom [ASC | DESC];</code></p>
<ul class="list-disc pl-5 space-y-1"><li><strong>ASC</strong>: menaik, kecil ke besar (A ke Z, tahun lama ke baru). Urutan <strong>bawaan</strong>; boleh tidak ditulis.</li><li><strong>DESC</strong>: menurun, besar ke kecil.</li><li><strong>Lebih dari satu kolom</strong>: dipisah koma. Kolom kedua baru dipakai bila nilai kolom pertama sama, misalnya <code>ORDER BY tahun DESC, judul</code>.</li></ul>
<p>Pengurutan berlaku juga untuk teks (menurut abjad) dan tanggal. ORDER BY hanya menyusun <strong>hasil</strong>; isi tabel tidak ikut disusun ulang.</p>`, "Bagian 1"),
  code("tab SQL phpMyAdmin", kueri("lima", "SELECT judul, stok FROM buku ORDER BY stok DESC;") + "\n\n" + kueri("lima", "SELECT judul, pengarang FROM buku\nORDER BY judul;"),
    "Kelima baris tetap keluar; hanya urutannya yang berubah. Kueri kedua tanpa ASC/DESC = menaik (abjad A ke Z).", "Mengurutkan Bilangan dan Teks"),
  ADG.bdWhere,
  A("LIMIT dan DISTINCT", `<p><strong>LIMIT</strong> membatasi jumlah baris yang ditampilkan: <code>LIMIT 3</code> = tiga baris pertama dari hasil. LIMIT <strong>hampir selalu dipasangkan dengan ORDER BY</strong>. Tanpa ORDER BY, yang keluar hanya tiga baris pertama menurut urutan penyimpanan, dan itu tidak berarti apa-apa. Dengan ORDER BY, LIMIT menjawab pertanyaan seperti buku terlaris, buku terbaru, atau anggota paling lama terdaftar.</p>
<p>LIMIT hanya menerima bilangan <strong>nol atau lebih</strong>. <code>LIMIT -3</code> ditolak (ERROR 1064).</p>
<p><strong>DISTINCT</strong> membuang nilai kembar pada hasil. Ditulis <strong>tepat sesudah SELECT</strong>: <code>SELECT DISTINCT prodi FROM anggota;</code>. Dipakai bila yang ditanyakan "apa saja yang ada", bukan "siapa saja". DISTINCT berlaku untuk <strong>gabungan seluruh kolom</strong> yang disebut sesudahnya: <code>SELECT DISTINCT nama, prodi</code> tetap tiga baris karena pasangan nama+prodi tidak ada yang kembar.</p>`, "Bagian 2"),
  code("tab SQL phpMyAdmin", kueri("lima", "SELECT judul, stok FROM buku\nORDER BY stok DESC LIMIT 3;") + "\n\n" + kueri("lima", "SELECT DISTINCT prodi FROM anggota;"),
    "Tiga baris teratas dari hasil yang sudah diurutkan. Tabel anggota berisi tiga baris, DISTINCT prodi hanya dua: Sistem Informasi dimiliki dua anggota dan ditampilkan sekali saja.", "Tiga Teratas dan Daftar Program Studi"),

  A("LIKE: Mencari Sebagian Kata", `<p>Tanda <code>=</code> menuntut kecocokan seluruh isi kolom. <strong>LIKE</strong> mencari <strong>pola</strong>, dengan dua lambang:</p>
<ul class="list-disc pl-5 space-y-1"><li><code>%</code> (persen): pengganti <strong>berapa pun</strong> jumlah huruf, termasuk nol huruf.</li><li><code>_</code> (garis bawah): pengganti <strong>tepat satu</strong> huruf.</li></ul>
<p>Yang paling sering dipakai: <code>'%kata%'</code>, mencari kata di bagian mana pun. Inilah cara kerja kotak pencarian di hampir semua aplikasi. Pola <strong>tanpa persen</strong> (<code>LIKE 'Sistem'</code>) menuntut isi kolom persis sama dengan kata itu, jadi biasanya tidak menemukan apa pun: kesalahan paling sering saat memakai LIKE.</p>`, "Bagian 3"),
  tbl("Lima Pola LIKE pada Judul Buku", ["Pola", "Artinya", "Cocok (dari 5 buku)"], [
    ["`'%Sistem%'`", "Memuat kata Sistem di bagian mana pun", judulLike("%Sistem%").join("; ")],
    ["`'Sistem%'`", "Diawali Sistem", judulLike("Sistem%").join("; ")],
    ["`'%Dasar'`", "Diakhiri Dasar", judulLike("%Dasar").join("; ")],
    ["`'Sistem'`", "Persis sama dengan kata Sistem", judulLike("Sistem").join("; ") || "(tidak ada: Empty set)"],
    ["`'BK00_'` pada id_buku", "BK00 diikuti tepat satu huruf", "Kelima buku (BK001–BK005). Pola ini cocok untuk BK001 sampai BK009, tidak untuk nomor yang lebih panjang"]
  ], [
    { label: "Kotak pencarian", target: "row", row: 0, title: "'%kata%'", text: "Persen di kedua ujung: kata boleh di awal, tengah, atau akhir. Dua judul memuat Sistem, satu di awal dan satu di tengah, keduanya keluar." },
    { label: "Jebakan tanpa %", target: "row", row: 3, title: "Empty set", text: "Pola tanpa tanda persen sama dengan tanda =. Tidak ada judul yang isinya hanya kata Sistem." },
    { label: "_ satu huruf", target: "row", row: 4, title: "Tepat satu", text: "Garis bawah selalu mewakili tepat satu huruf. Untuk dua huruf tulis dua garis bawah: <code>'BK0__'</code>." }
  ]),
  { type: "exercise", label: "Latihan Interaktif", title: "Cocok atau Tidak?", headers: ["Nilai kolom", "Pola", "Hasil"], rows: [
    ["Analisis Sistem Informasi", "'%Sistem%'", "Cocok", "✓ Sistem di tengah; % boleh mewakili apa saja di kedua sisi."],
    ["Analisis Sistem Informasi", "'Sistem%'", "Tidak cocok", "✓ Tidak diawali Sistem."],
    ["Sistem Basis Data", "'%Data'", "Cocok", "✓ Diakhiri Data."],
    ["Sistem Basis Data", "'Sistem'", "Tidak cocok", "✓ Tanpa persen = harus persis sama."],
    ["BK010", "'BK00_'", "Tidak cocok", "✓ Pola menuntut BK00 di depan. Huruf keempat BK010 adalah 1, jadi tidak cocok."],
    ["S", "'S%'", "Cocok", "✓ % boleh mewakili nol huruf."],
    ["Statistika untuk Informatika", "'S_a%'", "Cocok", "✓ S, satu huruf apa saja (t), a, lalu sisanya bebas."]
  ].map(([v, p, a, ok]) => ({ cells: [v, `<code>${p}</code>`], fields: [{ options: ["Cocok", "Tidak cocok"], answer: a }], ok })) },

  A("BETWEEN, IN, dan AS", `<p><strong>BETWEEN</strong> menyaring <strong>rentang</strong> dan <strong>mencakup kedua batasnya</strong>: <code>tahun BETWEEN 2019 AND 2021</code> = <code>tahun &gt;= 2019 AND tahun &lt;= 2021</code>, jadi 2019 dan 2021 ikut.</p>
<p><strong>IN</strong> menyaring <strong>daftar nilai</strong> yang diperbolehkan: <code>tahun IN (2018, 2022)</code> = <code>tahun = 2018 OR tahun = 2022</code>. Teks di dalam daftar tetap dikutip: <code>IN ('AG001','AG003')</code>.</p>
<p>Keduanya bisa digantikan AND dan OR, tetapi bentuknya jauh lebih pendek dan mudah dibaca, terutama bila daftar nilainya panjang.</p>
<p><strong>AS</strong> memberi <strong>nama lain pada kolom di tampilan hasil</strong>: <code>SELECT judul AS nama_buku</code>. Nama kolom di tabel <strong>tidak berubah</strong> (periksa dengan DESCRIBE). Berguna untuk laporan yang dibaca orang yang tidak mengenal nama kolom teknis, misalnya kepala perpustakaan.</p>`, "Bagian 4"),
  code("tab SQL phpMyAdmin", kueri("lima", "SELECT judul, tahun FROM buku\nWHERE tahun BETWEEN 2019 AND 2021;") + "\n\n" + kueri("lima", "SELECT judul, tahun FROM buku\nWHERE tahun IN (2018, 2022);") + "\n\n" + kueri("lima", "SELECT judul AS nama_buku, stok AS sisa\nFROM buku WHERE stok < 3;"),
    "BETWEEN: tiga buku, 2019 dan 2021 ikut. Hasilnya tidak urut, sebab ORDER BY tidak ditulis. AS: judul kolom hasil berubah menjadi nama_buku dan sisa; nama kolom di tabel tetap judul dan stok.", "Rentang, Daftar, dan Nama Lain"),
  tip("➕ Nama lain berspasi", "Judul kolom yang memakai spasi diapit kutip: <code>SELECT judul AS 'Nama Buku', tahun AS 'Tahun Terbit'</code>. Tanpa kutip, kata kedua dianggap perintah lain dan ditolak. Cek Pemahaman no. 5 modul memintanya."),

  A("Urutan Penulisan Klausa", `<p>Urutan baku, <strong>tidak boleh ditukar</strong>. Klausa boleh tidak ditulis, tetapi yang ditulis wajib mengikuti urutan:</p>
<p><code>SELECT</code> (apa yang diminta) → <code>FROM</code> (dari tabel mana) → <code>WHERE</code> (dengan syarat apa) → <code>ORDER BY</code> (disusun bagaimana) → <code>LIMIT</code> (berapa banyak).</p>
<p>Menulis ORDER BY sebelum WHERE menghasilkan <strong>ERROR 1064</strong>. Biasakan satu klausa per baris; memudahkan pemeriksaan. Penelusur di bawah memperlihatkan apa yang terjadi pada setiap klausa.</p>`, "Bagian 5"),
  (() => {
    const lolos = BUKU5.filter(r => r[3] >= 2019).map(r => r.map(String));
    const urut = [...lolos].sort((a, b) => b[3] - a[3]);
    const pilih = r => [r[1], r[3], r[4]];
    return { type: "penelusur", label: "Penelusur Langkah", title: "Gabungan Seluruh Klausa", desc: "Kueri: <code>SELECT judul, tahun, stok FROM buku WHERE tahun &gt;= 2019 ORDER BY tahun DESC LIMIT 3;</code>",
      nodes: [{ t: "Tabel buku", s: "5 baris" }, { t: "Hasil", s: "3 baris" }],
      steps: [
        { on: 0, label: "1 · FROM buku", msg: tabel(KOL_BUKU, BUKU5.map(r => r.map(String))), say: "Ambil seluruh isi tabel." },
        { on: 0, label: "2 · WHERE tahun >= 2019", msg: tabel(KOL_BUKU, lolos), say: `${lolos.length} baris lolos saringan. Jaringan Komputer Dasar (2018) disisihkan.` },
        { on: 0, label: "3 · SELECT judul, tahun, stok", msg: tabel(["judul", "tahun", "stok"], lolos.map(pilih)), say: "Kolom dipilih." },
        { on: 1, label: "4 · ORDER BY tahun DESC", msg: tabel(["judul", "tahun", "stok"], urut.map(pilih)), hl: hlRows([0, 1, 2]), say: "Diurutkan dari tahun terbesar. Tiga teratas ditebalkan." },
        { dot: "res", label: "5 · LIMIT 3", msg: tabel(["judul", "tahun", "stok"], urut.slice(0, 3).map(pilih)), say: "Dipotong jadi tiga: tiga buku terbaru dari terbitan 2019 ke atas." }
      ] };
  })(),
  tbl("Enam Kekeliruan Saat Mengurutkan dan Mencari", ["Keadaan", "Penyebab", "Perbaikan"], [
    ["ERROR 1054 Unknown column 'tahun_terbit' in 'ORDER BY'", "Nama kolom di ORDER BY salah ketik", "Periksa dengan <code>DESCRIBE buku;</code>"],
    ["ERROR 1064 saat ORDER BY sebelum WHERE", "Urutan klausa tidak sesuai aturan", "SELECT, FROM, WHERE, ORDER BY, LIMIT"],
    ["ERROR 1064 … near '-3' pada LIMIT -3", "LIMIT hanya menerima nol atau lebih", "Pakai bilangan positif: LIMIT 3"],
    ["LIKE tidak menemukan apa pun", "Pola tanpa persen: menuntut kecocokan penuh", "Apit dengan persen: '%Sistem%'"],
    ["Yang keluar hanya yang kebetulan tersimpan", "LIMIT tanpa ORDER BY lebih dulu", "Selalu pasangkan LIMIT dengan ORDER BY"],
    ["DISTINCT tidak mengurangi baris", "Berlaku untuk gabungan semua kolom yang disebut", "Sebut hanya kolom yang kembarannya ingin dibuang"]
  ], [{ label: "3 galat, 3 tanpa galat", target: "none", title: "Tiga yang terakhir lebih licik", text: "Tiga yang pertama menimbulkan pesan galat; tiga sisanya berjalan tanpa galat tetapi hasilnya bukan yang dimaksud." }], "Kesalahan Umum Modul"),
  ibarat([
    ["ORDER BY", "\"Susunkan kartunya dari stok terbanyak ke paling sedikit sebelum diserahkan.\"", "Kartu di laci tidak ikut disusun ulang; yang disusun hanya salinan yang keluar dari loket. Permintaan berikutnya boleh minta urutan lain."],
    ["LIMIT", "\"Cukup tiga kartu teratas saja, sisanya tidak perlu disalin.\"", ""],
    ["DISTINCT", "\"Kalau beberapa kartu program studinya sama, salin satu saja.\"", "Sebab yang ditanyakan bukan siapa anggotanya, melainkan program studi apa saja yang ada."],
    ["LIKE", "Pemohon lupa judul lengkapnya, hanya ingat ada kata \"Sistem\".", "Petugas membaca seluruh kartu, mencari kata itu di bagian mana pun, lalu menyalinkan yang cocok. Makin sedikit huruf yang diingat, makin banyak kartu yang keluar."],
    ["AS", "Petugas yang menulis judul kolom pada lembar salinan dengan bahasa yang dimengerti pemohon.", "Di kartu asli tertulis stok, di lembar yang diserahkan tertulis sisa eksemplar. Isinya sama, hanya labelnya disesuaikan."],
    ["Urutan penulisan klausa", "Isian formulir cetak: apa, dari laci mana, syarat apa, disusun bagaimana, berapa banyak.", "Petugas membaca dari atas ke bawah; formulir yang diisi loncat-loncat dikembalikan."]
  ])
];

// ───────────────────────────── P12 ─────────────────────────────
const B10 = BUKU10.map(r => r.map(String));
M.p12 = [
  kunci(12, [
    ["Fungsi agregat", "Meringkas banyak baris menjadi satu nilai."],
    ["COUNT", "Menghitung banyaknya baris."],
    ["SUM", "Menjumlahkan seluruh nilai pada sebuah kolom."],
    ["AVG", "Menghitung nilai rata-rata sebuah kolom."],
    ["MIN", "Mencari nilai terkecil."],
    ["MAX", "Mencari nilai terbesar."],
    ["GROUP BY", "Mengelompokkan baris sebelum diringkas."],
    ["HAVING", "Penyaring yang bekerja pada hasil kelompok."],
    ["Kelompok", "Kumpulan baris yang nilai kolom pengelompoknya sama."]
  ]),
  A("Dari Menampilkan Menjadi Meringkas", `<p>Sampai Bab 10, sepuluh baris masuk, paling banyak sepuluh baris keluar. <strong>Fungsi agregat</strong> membalik cara kerja itu: <strong>banyak baris masuk, satu nilai keluar</strong>. Pertanyaannya bukan lagi "buku apa saja", melainkan "ada berapa", "berapa jumlahnya", "berapa rata-ratanya".</p>
<p>Pertemuan ini = <strong>Bab 11</strong>. Supaya pengelompokan bermakna, data diperbanyak menjadi <strong>sepuluh buku</strong> lebih dulu: tanpa nilai berulang, setiap kelompok hanya berisi satu baris. Kini Andi Wibowo memiliki tiga buku, Rina Kartika dan Maya Sari masing-masing dua, dan tahun terbit pun berulang. Sepuluh buku ini dipakai terus sampai Bab 12.</p>`, "Bagian 1"),
  code("tab SQL phpMyAdmin", "INSERT INTO buku VALUES\n" + U.values(U.BUKU_TAMBAH) + ";\n\n" + kueri("sepuluh", "SELECT * FROM buku;"), "Lima baris terakhir (BK006–BK010) adalah buku baru.", "Memperbanyak Data Menjadi Sepuluh Buku"),
  tbl("Lima Fungsi Agregat", ["Fungsi", "Yang dihitung", "Contoh", "Hasil (10 buku)"], [
    ["COUNT", "Banyaknya baris", "`COUNT(*)`", jalan("sepuluh", "SELECT COUNT(*) FROM buku;").rows[0][0]],
    ["SUM", "Jumlah seluruh nilai", "`SUM(stok)`: menjumlahkan semua stok", jalan("sepuluh", "SELECT SUM(stok) FROM buku;").rows[0][0]],
    ["AVG", "Nilai rata-rata", "`AVG(stok)`: rata-rata stok", jalan("sepuluh", "SELECT AVG(stok) FROM buku;").rows[0][0]],
    ["MIN", "Nilai terkecil", "`MIN(tahun)`: terbitan tertua", jalan("sepuluh", "SELECT MIN(tahun) FROM buku;").rows[0][0]],
    ["MAX", "Nilai terbesar", "`MAX(stok)`: stok terbanyak", jalan("sepuluh", "SELECT MAX(stok) FROM buku;").rows[0][0]]
  ], [
    { label: "Kolom apa saja?", target: "col", col: 0, title: "SUM/AVG hanya bilangan", text: "SUM dan AVG hanya masuk akal untuk kolom bilangan. COUNT, MIN, dan MAX boleh dipakai pada kolom apa pun, termasuk teks (MIN judul = judul paling awal menurut abjad) dan tanggal." },
    { label: "AVG pecahan", target: "row", row: 2, title: "3.1000", text: "AVG menghasilkan pecahan dengan empat angka di belakang koma walaupun stok bertipe bilangan bulat. Periksa: 31 ÷ 10 = 3,1. Banyaknya angka di belakang koma bisa berbeda antara MariaDB dan MySQL; nilainya sama." },
    { label: "Tanda kurung", target: "col", col: 2, title: "Tanpa spasi", text: "Tulis <code>COUNT(*)</code>, bukan <code>COUNT (*)</code>. Di MySQL, spasi antara nama fungsi dan kurung bisa membuat perintah ditolak." }
  ], "Bagian 2"),
  code("tab SQL phpMyAdmin", kueri("sepuluh", "SELECT COUNT(*) AS jumlah_buku FROM buku;") + "\n\n" + kueri("sepuluh", "SELECT COUNT(*) AS jumlah FROM buku\nWHERE tahun >= 2021;") + "\n\n" + kueri("sepuluh", "SELECT COUNT(*) AS jumlah_buku,\n       SUM(stok) AS total_stok,\n       AVG(stok) AS rata_rata,\n       MIN(stok) AS paling_sedikit,\n       MAX(stok) AS paling_banyak\nFROM buku;"),
    "Sepuluh baris masuk, satu baris keluar. Dengan WHERE, penyaringan dikerjakan lebih dulu, penghitungan menyusul: enam dari sepuluh buku terbit 2021 atau sesudahnya. Satu kueri bisa menjawab lima pertanyaan sekaligus.", "Banyak Baris Masuk, Satu Baris Keluar"),
  A("COUNT(*) atau COUNT(kolom)?", `<p>Dua bentuk COUNT yang sering tertukar:</p>
<ul class="list-disc pl-5 space-y-1"><li><strong><code>COUNT(*)</code></strong>: menghitung <strong>seluruh baris</strong>, termasuk baris yang beberapa kolomnya kosong.</li><li><strong><code>COUNT(nama_kolom)</code></strong>: hanya baris yang kolom tersebut <strong>tidak kosong</strong>. Baris bernilai NULL tidak dihitung.</li></ul>
<p>Selama tidak ada kolom kosong, hasil keduanya sama. Perbedaannya baru terlihat pada kolom yang memuat NULL, dan justru di situlah kekeliruan sering terjadi. Untuk "jumlah baris", pakai <code>COUNT(*)</code>.</p>
<p><strong>➕ Contoh nyata</strong> (tabel peminjaman dari P13): kolom <code>tgl_kembali</code> masih NULL untuk buku yang belum dikembalikan.</p>`),
  code("tab SQL phpMyAdmin (data P13)", kueri("lengkap", "SELECT COUNT(*) AS semua_pinjam,\n       COUNT(tgl_kembali) AS sudah_kembali\nFROM peminjaman;"), "Enam peminjaman, tetapi hanya dua yang tgl_kembali-nya terisi. Empat baris NULL tidak dihitung COUNT(tgl_kembali).", "COUNT(*) vs COUNT(kolom)"),

  A("GROUP BY: Mengelompokkan, Lalu Meringkas", `<p>Satu angka untuk seluruh tabel sering terlalu kasar. <strong>GROUP BY</strong> mengelompokkan baris menurut nilai sebuah kolom, lalu menjalankan fungsi agregat pada <strong>setiap kelompok</strong>: satu baris hasil untuk setiap kelompok. <strong>Kelompok</strong> adalah kumpulan baris yang nilai kolom pengelompoknya sama.</p>
<p><strong>Jumlah baris hasil selalu sama dengan banyaknya kelompok</strong>, bukan banyaknya data. Sepuluh buku dengan enam pengarang berbeda → enam baris.</p>
<p><strong>Aturan:</strong> kolom pada SELECT hanya boleh <strong>kolom pengelompok</strong> atau <strong>fungsi agregat</strong>. Kolom lain (misalnya judul) bersama COUNT tanpa dikelompokkan menurut kolom itu menghasilkan angka yang menyesatkan.</p>
<p>Kelompok tidak harus teks: kolom bilangan seperti tahun juga bisa dipakai mengelompokkan.</p>`, "Bagian 3"),
  code("tab SQL phpMyAdmin", kueri("sepuluh", "SELECT pengarang, COUNT(*) AS jumlah_buku\nFROM buku\nGROUP BY pengarang;") + "\n\n" + kueri("sepuluh", "SELECT tahun, COUNT(*) AS jumlah_buku\nFROM buku\nGROUP BY tahun\nORDER BY tahun;"),
    "Sepuluh baris masuk, enam keluar, sebab ada enam pengarang berbeda. Per tahun: lima kelompok.", "Mengelompokkan Menurut Pengarang dan Tahun"),
  code("tab SQL phpMyAdmin", kueri("sepuluh", "SELECT pengarang, COUNT(*) AS jumlah_buku,\n       SUM(stok) AS total_stok\nFROM buku\nGROUP BY pengarang\nORDER BY jumlah_buku DESC, pengarang;"),
    "Maya Sari dan Rina Kartika sama-sama punya dua buku, tetapi total stoknya jauh berbeda: 3 dan 8. Kolom pengarang ikut disebut di ORDER BY sebagai pemutus seri: tanpa itu, baris yang angkanya sama boleh ditaruh DBMS dalam urutan mana saja.", "Beberapa Agregat per Kelompok, Lalu Diurutkan"),

  A("HAVING: Menyaring Kelompok", `<p><strong>WHERE</strong> menyaring <strong>baris sebelum</strong> pengelompokan dan <strong>tidak boleh</strong> memakai fungsi agregat. <strong>HAVING</strong> menyaring <strong>kelompok sesudah</strong> pengelompokan dan <strong>boleh</strong> memakai fungsi agregat.</p>
<p>Keduanya boleh dalam satu kueri. Urutan penulisan baku: <code>SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY …</code>. HAVING sebelum GROUP BY → ERROR 1064.</p>
<p><strong>Cara memilih:</strong> kalau syaratnya tentang satu buku (tahun, stok satu buku), pakai WHERE. Kalau syaratnya tentang hasil hitungan kelompok ("pengarang yang bukunya dua atau lebih", "total eksemplar lebih dari 5"), pakai HAVING.</p>`, "Bagian 4"),
  code("tab SQL phpMyAdmin", kueri("sepuluh", "SELECT pengarang, COUNT(*) AS jumlah_buku\nFROM buku\nGROUP BY pengarang\nHAVING COUNT(*) >= 2;") + "\n\n" + kueri("sepuluh", "SELECT tahun, COUNT(*) AS jumlah_buku\nFROM buku\nWHERE tahun >= 2019\nGROUP BY tahun\nHAVING COUNT(*) > 1\nORDER BY tahun;"),
    "Kueri pertama: enam kelompok, tiga lolos HAVING. Kueri kedua: WHERE membuang buku terbitan 2018 sebelum pengelompokan; HAVING lalu membuang kelompok berisi satu buku (2020). Tersisa tiga kelompok.", "HAVING, serta WHERE + HAVING"),
  tbl("WHERE atau HAVING?", ["", "WHERE", "HAVING"], [
    ["Menyaring", "Baris (sebelum pengelompokan)", "Kelompok (sesudah pengelompokan)"],
    ["Fungsi agregat", "Tidak boleh (ERROR 1111)", "Boleh"],
    ["Posisi tulis", "Sesudah FROM, sebelum GROUP BY", "Sesudah GROUP BY"],
    ["Contoh", "`WHERE tahun >= 2019`", "`HAVING COUNT(*) >= 2`"]
  ], [{ label: "Mengapa WHERE tidak boleh agregat?", target: "row", row: 1, title: "Belum ada yang bisa dihitung", text: "Ketika WHERE dikerjakan (langkah 2), pengelompokan belum terjadi, sehingga belum ada kelompok yang bisa dihitung." }]),

  A("Urutan Pengerjaan yang Lengkap", `<p>Urutan pengerjaan berbeda dari urutan penulisan: SELECT ditulis pertama, tetapi dikerjakan kelima.</p>
<ol class="list-decimal pl-5 space-y-1"><li><strong>FROM</strong>: mengambil seluruh isi tabel.</li><li><strong>WHERE</strong>: membuang baris yang tidak memenuhi syarat.</li><li><strong>GROUP BY</strong>: menumpuk baris yang tersisa menjadi kelompok.</li><li><strong>HAVING</strong>: membuang kelompok yang tidak memenuhi syarat.</li><li><strong>SELECT</strong>: menghitung fungsi agregat dan memilih kolom.</li><li><strong>ORDER BY</strong>: mengurutkan hasil akhir.</li></ol>
<p>Ikuti keenam langkah itu pada satu kueri di penelusur berikut.</p>`, "Bagian 5"),
  (() => {
    const lolos = B10.filter(r => +r[3] >= 2019);
    const tumpuk = [...lolos].sort((a, b) => a[2].localeCompare(b[2]) || a[0].localeCompare(b[0]));
    const kel = {}; tumpuk.forEach(r => { kel[r[2]] = (kel[r[2]] || 0) + 1; });
    const grup = Object.entries(kel).map(([p, c]) => [p, String(c)]);
    const lolosH = grup.filter(g => +g[1] >= 2);
    const akhir = [...lolosH].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return { type: "penelusur", label: "Penelusur Langkah", title: "Enam Langkah, Satu Kueri", desc: "Kueri: <code>SELECT pengarang, COUNT(*) AS jumlah_buku FROM buku WHERE tahun &gt;= 2019 GROUP BY pengarang HAVING COUNT(*) &gt;= 2 ORDER BY jumlah_buku DESC, pengarang;</code>",
      nodes: [{ t: "Tabel buku", s: "10 baris" }, { t: "Hasil", s: "per pengarang" }],
      steps: [
        { on: 0, label: "1 · FROM buku", msg: tabel(KOL_BUKU, B10), say: "Seluruh isi tabel: sepuluh baris." },
        { on: 0, label: "2 · WHERE tahun >= 2019", msg: tabel(KOL_BUKU, lolos), say: `Baris dibuang satu per satu. Jaringan Komputer Dasar (2018) tidak lolos; tersisa ${lolos.length} baris.` },
        { on: 0, label: "3 · GROUP BY pengarang", msg: tabel(["pengarang", "id_buku", "judul"], tumpuk.map(r => [r[2], r[0], r[1]])), say: `Baris yang tersisa ditumpuk menurut pengarang: ${grup.length} tumpukan. Andi Wibowo tiga kartu, Maya Sari dan Rina Kartika masing-masing dua.` },
        { on: 1, label: "4 · HAVING COUNT(*) >= 2", msg: tabel(["pengarang", "COUNT(*)"], grup), hl: hlRows(grup.map((g, i) => +g[1] >= 2 ? i : -1).filter(i => i >= 0)), say: "Tinggi setiap tumpukan dihitung, lalu tumpukan yang terlalu pendek dibuang. Tiga yang ditebalkan lolos." },
        { on: 1, label: "5 · SELECT pengarang, COUNT(*) AS jumlah_buku", msg: tabel(["pengarang", "jumlah_buku"], lolosH), say: "Kolom hasil dipilih dan diberi nama lain jumlah_buku." },
        { dot: "res", label: "6 · ORDER BY jumlah_buku DESC, pengarang", msg: tabel(["pengarang", "jumlah_buku"], akhir), say: "Diurutkan paling akhir. Pengarang menjadi pemutus seri untuk Maya Sari dan Rina Kartika." }
      ] };
  })(),

  A("Percobaan yang Sengaja Digagalkan", `<p><strong>Agregat di WHERE ditolak.</strong> <code>SELECT pengarang, COUNT(*) FROM buku WHERE COUNT(*) &gt; 1 GROUP BY pengarang;</code> → <code>ERROR 1111 (HY000): Invalid use of group function</code>. Sesuai urutan pengerjaan: saat WHERE dikerjakan belum ada tumpukan yang bisa dihitung. Perbaikan: pindahkan syarat ke HAVING.</p>
<p><strong>Berjalan, tetapi menyesatkan.</strong> <code>SELECT judul, COUNT(*) FROM buku;</code> di MariaDB menghasilkan satu baris, misalnya <em>Dasar Pemrograman Komputer | 10</em>. Angka 10 adalah jumlah seluruh buku; judulnya dipilih sembarangan oleh DBMS, karena kolom judul bukan pengelompok dan bukan agregat.</p>
<p>MySQL 8 dengan pengaturan bawaan menolak kueri itu karena aturan <code>only_full_group_by</code> (galat <strong>1140</strong>; galat <strong>1055</strong> yang mirip berlaku untuk kueri ber-GROUP BY). MariaDB bawaan membiarkan keduanya berjalan. Pada keduanya, hasilnya tidak bermakna.</p>`),
  tbl("Enam Kekeliruan Saat Meringkas dan Mengelompokkan", ["Keadaan", "Penyebab", "Perbaikan"], [
    ["ERROR 1111 Invalid use of group function", "Fungsi agregat dipasang pada WHERE", "Pindahkan syarat itu ke HAVING"],
    ["ERROR 1054 Unknown column 'jumlah' in 'SELECT'", "Alias dipakai seolah nama kolom yang sudah ada", "Tulis fungsi agregatnya, beri alias dengan AS"],
    ["ERROR 1064 saat HAVING sebelum GROUP BY", "Urutan klausa tidak sesuai aturan", "WHERE, GROUP BY, HAVING, ORDER BY"],
    ["Kolom biasa tampil bersama agregat", "Bukan kolom pengelompok, bukan fungsi agregat", "Masukkan ke GROUP BY atau keluarkan dari SELECT"],
    ["COUNT(kolom) lebih kecil dari COUNT(*)", "Kolom memuat NULL yang tidak ikut dihitung", "Pakai COUNT(*) untuk jumlah baris"],
    ["SUM pada kolom teks menghasilkan nol", "Kolom teks tidak dapat dijumlahkan", "Pakai SUM hanya pada kolom bilangan"]
  ], [
    { label: "3 galat, 3 tanpa galat", target: "none", title: "Tiga terakhir berjalan mulus", text: "Tiga yang pertama menimbulkan pesan galat; tiga sisanya tidak, tetapi hasilnya keliru." },
    { label: "Alias 'jumlah'", target: "row", row: 1, title: "SELECT pengarang, jumlah FROM buku GROUP BY pengarang;", text: "Kolom jumlah tidak ada di tabel. Yang benar: <code>SELECT pengarang, COUNT(*) AS jumlah FROM buku GROUP BY pengarang;</code>" }
  ], "Kesalahan Umum Modul"),
  salah([
    "<strong>COUNT di WHERE.</strong> Syarat hitungan kelompok selalu di HAVING.",
    "<strong>Lupa GROUP BY.</strong> <code>SELECT pengarang, COUNT(*) FROM buku;</code> bukan \"jumlah per pengarang\"; di MariaDB keluar satu baris dengan angka total.",
    "<strong>Mengira hasil GROUP BY sebanyak data.</strong> Jumlah baris hasil = banyaknya kelompok.",
    "<strong>Lupa pemutus seri.</strong> Bila urutan hasil penting, sebutkan kolom kedua di ORDER BY.",
    "<strong>Membulatkan AVG di kepala lalu menulisnya sebagai hasil kueri.</strong> Modul meminta rata-rata dibulatkan sendiri saat menulis laporan; hasil kueri tetap 3.1000."
  ]),
  ibarat([
    ["Fungsi agregat", "Petugas diminta melaporkan keadaan laci, bukan menyalin kartunya.", "Pertanyaannya: ada berapa kartu, berapa jumlah seluruh eksemplarnya, berapa rata-ratanya. Petugas membaca semua kartu, lalu menyerahkan selembar catatan berisi satu angka."],
    ["COUNT(*) dan COUNT(isbn)", "COUNT(*): berapa kartu yang ada di laci, lengkap atau tidak. COUNT(isbn): berapa kartu yang kotak ISBN-nya sudah terisi.", "Kartu yang kotaknya masih putih tidak ikut dihitung, walaupun kartunya jelas ada."],
    ["GROUP BY", "Petugas menumpuk kartu menurut nama pengarang lebih dulu, baru kemudian tinggi setiap tumpukan dihitung.", "Yang dilaporkan bukan lagi daftar kartu, melainkan daftar tumpukan beserta jumlahnya."],
    ["WHERE dan HAVING", "WHERE menyisihkan kartu sebelum ditumpuk; HAVING menyisihkan tumpukan yang terlalu pendek sesudah semuanya tertumpuk.", "Yang satu bekerja pada kartu, yang lain pada tumpukan."]
  ])
];

// ───────────────────────────── P13 ─────────────────────────────
const PREP13 = U.CREATE_PINJAM + "\nINSERT INTO peminjaman VALUES\n" + U.values(PINJAM) + ";";
const pesan = sql => galat("sepuluh", sql, PREP13).replace(/\.\s[^.]*(?:dulu|CASCADE|sejenis|UNIQUE\) di tabel \w+|merujuknya)\.$/, ".");
M.p13 = [
  kunci(13, [
    ["Relasi antar tabel", "Hubungan dua tabel yang dibangun lewat nilai yang sama."],
    ["Kunci tamu", "Kolom yang isinya harus sudah ada pada kunci primer tabel lain."],
    ["Tabel induk", "Tabel yang kunci primernya ditunjuk oleh kunci tamu."],
    ["Tabel anak", "Tabel yang memuat kunci tamu."],
    ["Integritas rujukan", "Jaminan bahwa setiap tunjukan kunci tamu selalu menemukan barisnya."],
    ["Tabel penghubung", "Lahir dari relasi banyak ke banyak, memuat dua kunci tamu."],
    ["FOREIGN KEY", "Kata kunci SQL untuk memasang kunci tamu."],
    ["REFERENCES", "Kata kunci SQL yang menyebut tabel dan kolom yang ditunjuk."]
  ]),
  A("Mengapa Tabel Perlu Dihubungkan", `<p>Sampai Bab 11, tabel buku dan anggota berdiri sendiri. Padahal kegiatan pokok perpustakaan justru pertemuan keduanya: <strong>seorang anggota meminjam sebuah buku pada tanggal tertentu</strong>. Di mana peristiwa itu dicatat?</p>
<ul class="list-disc pl-5 space-y-1"><li><strong>Di tabel buku?</strong> Tidak bisa: satu buku dapat dipinjam banyak anggota.</li><li><strong>Di tabel anggota?</strong> Tidak bisa: satu anggota dapat meminjam banyak buku.</li><li><strong>Tabel sendiri.</strong> Peminjaman butuh tabelnya sendiri yang menunjuk kembali ke buku dan anggota yang terlibat.</li></ul>
<p>Tabel peminjaman tidak menyalin judul buku dan nama peminjam, hanya <strong>nomor</strong> buku dan nomor anggota. <strong>Relasi antar tabel dibangun lewat nilai yang sama pada kolom tertentu</strong>, bukan lewat garis atau tanda panah. Garis di ERD hanya gambar rancangan; di dalam DBMS yang menghubungkan adalah nilai <code>BK002</code> yang sama di dua tabel.</p>
<p>Pertemuan ini = <strong>Bab 12 Bagian 1</strong>, menutup rangkaian praktik perpustakaan: rancangan tiga tabel hasil transformasi ERD di Bab 4 kini dijalankan seluruhnya. Data: sepuluh buku, tiga anggota.</p>`, "Bagian 1"),
  A("Kunci Tamu, Tabel Induk, Tabel Anak", `<p><strong>Kunci tamu</strong> (<em>foreign key</em>) adalah kolom yang isinya <strong>harus sudah ada lebih dulu</strong> pada kunci primer tabel lain. Ingat: kunci primer adalah kolom penanda tunggal, tidak boleh sama dan tidak boleh kosong (Bab 2 dan Bab 8).</p>
<p><strong>Tabel anak</strong> = tabel yang <strong>memuat</strong> kunci tamu (peminjaman). <strong>Tabel induk</strong> = tabel yang kunci primernya <strong>ditunjuk</strong> (buku dan anggota). Cara cepat mengingat: anak "menunjuk" induknya; yang memegang nomor rujukan adalah anak.</p>
<p>Peminjaman adalah <strong>tabel penghubung</strong>: lahir dari relasi <strong>banyak ke banyak</strong> (satu buku dipinjam banyak anggota, satu anggota meminjam banyak buku) dan memuat <strong>dua kunci tamu</strong> sekaligus. Tanggal pinjam dan kembali milik peristiwa peminjaman, bukan milik buku atau anggota.</p>`, "Bagian 2"),
  tbl("Skema Lengkap Perpustakaan", ["Tabel", "Peran", "Kunci primer", "Kunci tamu → menunjuk"], [
    ["buku", "Induk", "id_buku", "–"],
    ["anggota", "Induk", "id_anggota", "–"],
    ["peminjaman", "Anak (tabel penghubung)", "id_pinjam", "id_buku → buku(id_buku)<br>id_anggota → anggota(id_anggota)"]
  ], [
    { label: "tgl_kembali boleh kosong", target: "row", row: 2, title: "NULL = masih dipinjam", text: "Buku yang masih di tangan peminjam belum punya tanggal kembali. Keadaan itu diwakili NULL (Bab 8)." },
    { label: "Mengapa dua kunci tamu?", target: "col", col: 3, title: "Relasi banyak ke banyak", text: "Aturan transformasi keempat (Bab 4): relasi M:N menjadi tabel ketiga yang memuat kunci kedua entitas." }
  ]),
  tbl("Tiga Penjagaan yang Dilakukan DBMS", ["Penjagaan", "Yang ditolak", "Galat"], [
    ["Menambah baris anak", "Baris peminjaman yang menunjuk nomor buku atau nomor anggota yang tidak ada", "1452 (child row)"],
    ["Menghapus baris induk", "Baris buku atau anggota yang masih ditunjuk baris peminjaman", "1451 (parent row)"],
    ["Menghapus tabel induk", "Tabel buku atau anggota selama tabel peminjaman masih menunjuknya", "1451 di MariaDB"]
  ], [
    { label: "Integritas rujukan", target: "none", title: "Ketiganya bersama-sama", text: "Setelah kunci tamu terpasang, DBMS menjaga ketiga hal itu secara otomatis tanpa perlu diminta lagi. Tanpa itu, lambat laun ada catatan peminjaman untuk buku yang sudah tidak ada, dan laporan tidak dapat dipercaya." },
    { label: "Yang tetap boleh", target: "row", row: 1, title: "Induk yang tidak ditunjuk", text: "BK004 belum pernah dipinjam, jadi <code>DELETE FROM buku WHERE id_buku = 'BK004'</code> <strong>berhasil</strong>. Yang dijaga hanya baris yang masih ditunjuk." },
    { label: "➕ MySQL 8", target: "row", row: 2, title: "Nomor lain untuk DROP", text: "MariaDB (modul) menolak DROP TABLE buku dengan galat 1451. MySQL 8 memakai galat <strong>3730</strong>: <em>Cannot drop table 'buku' referenced by a foreign key constraint</em>." }
  ], "Bagian 3"),

  A("Bentuk Perintah FOREIGN KEY … REFERENCES", `<p>Kunci tamu ditulis <strong>di dalam CREATE TABLE</strong>, <strong>sesudah seluruh kolom didaftarkan</strong>:</p>
<p><code>FOREIGN KEY (nama_kolom_pada_tabel_ini) REFERENCES nama_tabel_induk(nama_kolom_kunci_primer)</code></p>
<p><strong>FOREIGN KEY</strong> menyebut kolom pada tabel yang sedang dibuat. <strong>REFERENCES</strong> menyebut tabel induk beserta kolom yang ditunjuk.</p>
<p><strong>Tiga syarat menurut modul</strong>, kalau tidak perintah ditolak:</p>
<ol class="list-decimal pl-5 space-y-1"><li>Tabel induk <strong>sudah ada lebih dulu</strong>. Karena itu tabel buku dibuat sebelum tabel peminjaman.</li><li>Kolom yang ditunjuk merupakan <strong>kunci primer</strong> pada tabel induk.</li><li>Tipe data dan panjang kedua kolom <strong>sama persis</strong>, misalnya sama-sama CHAR(5).</li></ol>`, "Bagian 4"),
  code("tab SQL phpMyAdmin", U.CREATE_PINJAM + "\n-- Query OK, 0 rows affected\n\nDESCRIBE peminjaman;\n" + hasil(["Field", "Type", "Null", "Key", "Default", "Extra"], [["id_pinjam", "char(6)", "NO", "PRI", "NULL", ""], ["id_buku", "char(5)", "NO", "MUL", "NULL", ""], ["id_anggota", "char(5)", "NO", "MUL", "NULL", ""], ["tgl_pinjam", "date", "NO", "", "NULL", ""], ["tgl_kembali", "date", "YES", "", "NULL", ""]]),
    "Delapan baris di dalam kurung terbagi tiga kelompok: lima baris pertama mendaftarkan kolom, baris keenam memasang kunci primer, dua baris terakhir memasang kunci tamu (satu menunjuk buku, satu menunjuk anggota). Tabel buku dan anggota harus sudah ada sebelum perintah ini dijalankan.", "Membuat dan Memeriksa Tabel Peminjaman"),
  tbl("Membaca DESCRIBE dan Tab Struktur", ["Tanda", "Artinya"], [
    ["PRI", "Kunci primer (id_pinjam)"],
    ["MUL", "Kolom yang nilainya boleh berulang. Kedua kunci tamu memang harus boleh berulang: satu buku dapat dipinjam berkali-kali"],
    ["YES di kolom Null", "tgl_kembali, satu-satunya kolom yang boleh kosong"],
    ["Kunci emas (tab Struktur)", "Kunci primer"],
    ["Kunci perak (tab Struktur)", "Kolom kunci tamu"]
  ], [{ label: "Mengapa MUL, bukan PRI?", target: "row", row: 1, title: "id_buku di peminjaman", text: "id_buku hanya kunci primer di tabel <em>buku</em>. Di tabel peminjaman ia kunci tamu yang nilainya berulang (BK002 dua kali), jadi tidak mungkin PRI. ➕ Secara teknis MUL berarti kolom itu punya indeks yang tidak unik; MariaDB membuat indeks itu otomatis saat kunci tamu dipasang." }]),
  code("tab SQL phpMyAdmin", "INSERT INTO peminjaman VALUES\n" + U.values(PINJAM) + ";\n\n" + kueri("sepuluh", "SELECT * FROM peminjaman;", PREP13),
    "Hanya nomor penunjuk: tidak ada judul buku atau nama anggota di tabel ini. Nilai berulang: BK002 dua kali (dipinjam dua anggota), AG001 tiga kali (tiga kali meminjam). Empat NULL: keempat buku itu masih dipinjam. Cara membaca isi tabel ini sebagai kalimat dibahas di P14 (INNER JOIN).", "Mengisi Tabel Peminjaman"),

  A("Empat Percobaan yang Sengaja Digagalkan", `<p>Modul menguji penjagaan DBMS dengan empat perintah yang sengaja salah. Telusuri satu per satu; pesan galatnya dihasilkan lab SQL Sinau dengan nomor yang sama seperti MariaDB di MAMP.</p>
<p>Cara membaca pesan 1452/1451 yang panjang: cari <strong>nomor galat</strong> (1452 atau 1451), kata <strong>child row</strong> (baris anak ditolak) atau <strong>parent row</strong> (baris induk), dan <strong>kolom penyebab</strong> di dalam <code>FOREIGN KEY (id_buku)</code>. <code>peminjaman_ibfk_1</code> adalah nama yang diberikan MariaDB sendiri untuk aturan kunci tamu pertama pada tabel itu.</p>`, "Bagian 5"),
  { type: "penelusur", label: "Penelusur Langkah", title: "Penjagaan Kunci Tamu Bekerja", desc: "Tekan <strong>Berikutnya</strong>. Kiri = tabel anak, kanan = tabel induk.",
    nodes: [{ t: "peminjaman", s: "anak" }, { t: "buku", s: "induk" }],
    steps: [
      { dot: "req", label: "Percobaan 1 · buku yang tidak dimiliki", msg: "INSERT INTO peminjaman VALUES\n('PJ0007','BK099','AG001','2026-10-11',NULL);\n\n" + pesan("INSERT INTO peminjaman VALUES ('PJ0007','BK099','AG001','2026-10-11',NULL);"), hl: [1, 3], say: "Baris PJ0007 <strong>tidak pernah masuk</strong> tabel, sebab BK099 tidak terdapat pada tabel buku. Galat <strong>1452</strong> menyebut <em>child row</em>: penolakan terjadi pada tabel anak." },
      { on: 1, label: "Percobaan 2 · hapus baris induk", msg: "DELETE FROM buku WHERE id_buku = 'BK002';\n\n" + pesan("DELETE FROM buku WHERE id_buku = 'BK002';"), hl: [0, 2], say: "BK002 masih ditunjuk dua baris peminjaman (PJ0001, PJ0003). Nomornya berbeda: <strong>1451</strong>, menyebut <em>parent row</em> (baris induk). Perbaikannya bukan mematikan aturan, melainkan menghapus dulu baris peminjaman yang menunjuknya, atau membiarkan bukunya tetap ada." },
      { on: 1, label: "Pembanding · hapus BK004", msg: "DELETE FROM buku WHERE id_buku = 'BK004';\nQuery OK, 1 row affected\n\n-- BK004 belum pernah dipinjam:\n-- tidak ada baris anak yang menunjuknya", hl: [1], say: "Berhasil. Yang dijaga hanya baris induk yang <strong>masih ditunjuk</strong>. (Langkah 9 praktik modul: buktikan, lalu masukkan BK004 kembali.)" },
      { on: 1, label: "Percobaan 3 · hapus tabel induk", msg: "DROP TABLE buku;\n\n" + pesan("DROP TABLE buku;"), hl: [0, 2], say: "Penolakan ini justru menguntungkan. Tanpa kunci tamu, satu perintah keliru dapat menghapus seluruh koleksi buku dan meninggalkan ratusan catatan peminjaman yang tidak menunjuk apa pun." },
      { dot: "req", label: "Percobaan 4 · tipe data berbeda", msg: "CREATE TABLE coba (\n  id INT NOT NULL PRIMARY KEY,\n  id_buku INT NOT NULL,\n  FOREIGN KEY (id_buku) REFERENCES buku(id_buku)\n);\n\n" + pesan("CREATE TABLE coba (id INT NOT NULL PRIMARY KEY, id_buku INT NOT NULL, FOREIGN KEY (id_buku) REFERENCES buku(id_buku));"), hl: [2, 6], say: "coba.id_buku bertipe INT, buku.id_buku CHAR(5): aturan tidak dapat dibentuk. Angka <strong>150</strong> selalu menandakan masalah pada kunci tamu, apa pun sebab persisnya. Kalimat pesan 1005 bisa berbeda antara MariaDB dan MySQL; angka 150 tetap sama." }
    ] },
  tbl("Enam Kekeliruan Saat Memasang Kunci Tamu", ["Keadaan", "Penyebab", "Perbaikan"], [
    ["ERROR 1452 child row", "Nilai kunci tamu belum ada pada tabel induk", "Isi dulu baris induknya, atau betulkan nomor penunjuk"],
    ["ERROR 1451 parent row", "Baris induk masih ditunjuk baris tabel anak", "Hapus dulu baris anaknya, atau biarkan induknya"],
    ["ERROR 1005 errno 150 saat CREATE TABLE", "Tipe data berbeda, atau yang ditunjuk bukan kunci primer", "Samakan tipe dan panjang; tunjuk kunci primer"],
    ["ERROR 1005 errno 150, tipe sudah sama", "Tabel induk pada REFERENCES belum dibuat", "Buat tabel induk lebih dulu"],
    ["FOREIGN KEY di tengah daftar kolom", "Ditulis sebelum seluruh kolom didaftarkan", "Kolom dulu, baru kunci primer dan kunci tamu"],
    ["Perintah berhasil, aturan tak terpasang", "Mesin penyimpanan selain InnoDB", "Pastikan InnoDB (bawaan MariaDB di MAMP)"]
  ], [
    { label: "1452 vs 1451", target: "col", col: 0, title: "Anak atau induk?", text: "1452 terjadi pada tabel <strong>anak</strong> (menambah/mengubah baris yang menunjuk). 1451 terjadi pada tabel <strong>induk</strong> (menghapus/mengubah baris yang ditunjuk)." },
    { label: "InnoDB", target: "row", row: 5, title: "Periksa mesinnya", text: "Mesin penyimpanan bawaan dapat berbeda antarversi MAMP. Periksa dengan <code>SHOW CREATE TABLE peminjaman;</code> dan pastikan tertulis <code>ENGINE=InnoDB</code>." },
    { label: "➕ MySQL 8", target: "row", row: 3, title: "Nomor lain", text: "MySQL 8 memberi nomor yang lebih spesifik: 1824 (tabel induk belum ada), 1822 (yang ditunjuk bukan kunci/indeks), 3780 (tipe tidak cocok). MariaDB menyatukannya sebagai 1005 errno 150." }
  ], "Kesalahan Umum Modul"),
  modul(`<ul class="list-disc pl-5 space-y-1"><li><strong>"Panjang sama persis" (syarat ketiga)</strong> lebih ketat dari aturan MySQL/MariaDB yang sebenarnya. Untuk teks, panjangnya boleh berbeda: <code>id_pinjam CHAR(5)</code> yang menunjuk <code>CHAR(6)</code> (Latihan Tingkat 2 no. 1) sebenarnya <em>diterima</em> saat CREATE TABLE. Masalahnya baru muncul saat mengisi: nomor <code>'PJ0001'</code> (6 huruf) tidak muat di CHAR(5) → <code>ERROR 1406 Data too long</code>. Untuk bilangan, tipe dan ukurannya memang harus sama. Untuk ujian, ikuti modul: samakan tipe dan panjangnya.</li>
<li><strong>"Harus kunci primer" (syarat kedua)</strong> juga penyederhanaan: yang dituntut DBMS adalah kolom berindeks, biasanya kunci primer atau UNIQUE. Pada mata kuliah ini, selalu tunjuk kunci primer.</li>
<li><strong>ON DELETE CASCADE</strong> dan aksi kunci tamu lain tidak dibahas modul; ringkasannya ada di P4 Bagian 5 (bukan dari modul).</li></ul>`),
  ibarat([
    ["Tabel ketiga (peminjaman)", "Lemari arsip punya laci Buku dan laci Anggota. Peminjaman dicatat pada kartu di laci ketiga.", "Kartu itu tidak menyalin judul buku dan nama peminjam, hanya nomor kartu buku dan nomor kartu anggota. Nomor itulah yang menghubungkan ketiga laci."],
    ["Kunci tamu", "Nomor rujukan pada kartu peminjaman.", "Petugas tidak menerima kartu yang menyebut nomor buku BK099, sebab kartu buku bernomor itu tidak ada di laci. Kartu peminjaman ditolak sebelum sempat masuk laci."],
    ["Tiga penjagaan DBMS", "Petugas menolak kartu peminjaman dengan nomor buku fiktif dan permintaan membuang kartu buku yang nomornya masih tercantum pada kartu peminjaman yang belum selesai.", "Aturan itu dijalankan petugas, bukan diingat sendiri oleh yang menaruh kartu."]
  ])
];

// ───────────────────────────── P14 ─────────────────────────────
const L = "lengkap";
const J2 = "SELECT peminjaman.id_pinjam, buku.judul\nFROM peminjaman\nINNER JOIN buku\n  ON peminjaman.id_buku = buku.id_buku;";
const J3 = "SELECT p.id_pinjam, a.nama, b.judul, p.tgl_pinjam\nFROM peminjaman AS p\nINNER JOIN anggota AS a\n  ON p.id_anggota = a.id_anggota\nINNER JOIN buku AS b\n  ON p.id_buku = b.id_buku\nORDER BY p.id_pinjam;";
const JNULL = "SELECT a.nama, b.judul, p.tgl_pinjam\nFROM peminjaman AS p\nINNER JOIN anggota AS a ON p.id_anggota = a.id_anggota\nINNER JOIN buku AS b ON p.id_buku = b.id_buku\nWHERE p.tgl_kembali IS NULL\nORDER BY p.tgl_pinjam;";
const JG1 = "SELECT a.nama, COUNT(*) AS jumlah_pinjam\nFROM peminjaman AS p\nINNER JOIN anggota AS a\n  ON p.id_anggota = a.id_anggota\nGROUP BY a.nama\nORDER BY jumlah_pinjam DESC;";
const JG2 = "SELECT b.judul, COUNT(*) AS kali_dipinjam\nFROM peminjaman AS p\nINNER JOIN buku AS b\n  ON p.id_buku = b.id_buku\nGROUP BY b.judul\nHAVING COUNT(*) > 1;";
const BKIDX = Object.fromEntries(BUKU10.map((b, i) => [b[0], i]));
M.p14 = [
  kunci(14, [
    ["JOIN", "Perintah untuk menggabungkan baris dari dua tabel atau lebih."],
    ["INNER JOIN", "Penggabungan yang hanya menampilkan baris yang menemukan pasangan."],
    ["ON", "Klausa yang menyebut syarat pasangan antara kedua tabel."],
    ["Syarat pasangan", "Kesamaan nilai antara kunci tamu dan kunci primer yang ditunjuknya."],
    ["Alias tabel", "Nama singkat sementara untuk sebuah tabel di dalam satu kueri."],
    ["Kolom bernama sama", "Kolom serupa pada dua tabel, harus disebut lengkap dengan nama tabelnya."],
    ["Perkalian silang", "Hasil penggabungan tanpa syarat pasangan: semua baris dipasangkan dengan semua baris."],
    ["IS NULL", "Penyaring khusus untuk kolom yang belum diisi, menggantikan tanda sama dengan."]
  ]),
  A("Masalah yang Ditinggalkan P13", `<p>Tabel <code>peminjaman</code> sudah berisi enam baris, tetapi isinya hanya <strong>nomor penunjuk</strong> seperti <code>BK002</code> dan <code>AG001</code>. Manusia tidak bisa membaca "AG001 meminjam BK002" tanpa membuka dua tabel lain.</p>
<p>Penyimpanan nomor itu memang disengaja (normalisasi, Bab 5): judul buku cukup ditulis sekali di tabel buku. Yang perlu diubah bukan cara <em>menyimpan</em>, melainkan cara <em>menampilkan</em>.</p>
<p><strong>JOIN</strong> menggabungkan baris dari dua tabel atau lebih menjadi satu tampilan, dengan mencocokkan nilai pada kolom tertentu. Data di tabel tidak berubah sedikit pun; JOIN hanya menyusun hasil tampilan.</p>
<p>Data yang dipakai sama seperti akhir P13: <strong>10 buku, 3 anggota, 6 peminjaman</strong>.</p>`, "Bagian 1"),
  A("Bentuk Perintah INNER JOIN", `<p><code>SELECT kolom FROM tabel_pertama INNER JOIN tabel_kedua ON tabel_pertama.kolom = tabel_kedua.kolom;</code></p>
<p><strong>ON</strong> menyebut <strong>syarat pasangan</strong>: kesamaan nilai yang menentukan baris mana berpasangan dengan baris mana. Pada perpustakaan selalu berupa kunci tamu = kunci primer yang ditunjuknya, misalnya <code>peminjaman.id_buku = buku.id_buku</code>.</p>
<p><strong>INNER</strong> berarti hanya baris yang <strong>menemukan pasangan</strong> yang ditampilkan. Baris yang tidak berpasangan tidak muncul sama sekali. Kata INNER boleh dihilangkan (<code>JOIN</code> saja = INNER JOIN), tetapi modul selalu menuliskannya.</p>
<p><strong>Kapan dipakai:</strong> setiap kali pertanyaan menyebut keterangan dari dua tabel sekaligus: "siapa meminjam buku apa", "judul yang sedang dipinjam", "berapa kali tiap anggota meminjam".</p>`, "Bagian 2"),
  { type: "penelusur", label: "Penelusur Langkah", title: "Cara Kerja INNER JOIN: Mencari Pasangan", desc: "Kueri: <code>SELECT peminjaman.id_pinjam, buku.judul FROM peminjaman INNER JOIN buku ON peminjaman.id_buku = buku.id_buku;</code> Tekan <strong>Berikutnya</strong>: setiap kartu peminjaman dibawa ke laci buku.",
    nodes: [{ t: "peminjaman", s: "6 baris" }, { t: "buku", s: "10 baris" }],
    steps: PINJAM.map((p, i) => {
      const b = BUKU10[BKIDX[p[1]]];
      return { dot: "req", label: `${p[0]} membawa ${p[1]}`, msg: `peminjaman: ${p[0]} | ${p[1]} | ${p[2]}\nbuku      : ${b[0]} | ${b[1]}\n\nON peminjaman.id_buku = buku.id_buku\n   '${p[1]}' = '${b[0]}' → cocok\n\nbaris hasil ${i + 1}: ${p[0]} | ${b[1]}`, hl: [0, 1, 4], say: i === 0 ? "Baris peminjaman pertama menunjuk BK002. DBMS mencari baris buku yang id_buku-nya sama, lalu menyatukan keduanya menjadi satu baris hasil." : i === 2 ? "BK002 dipakai lagi: satu baris buku boleh berpasangan dengan banyak baris peminjaman. Judulnya muncul dua kali di hasil, dan itu wajar." : `Pasangan ke-${i + 1}.` };
    }).concat([
      { on: 1, label: "Buku tanpa pasangan", msg: "BK003 Jaringan Komputer Dasar\nBK004 Analisis Sistem Informasi\nBK006 Pemrograman Basis Data\nBK007 Keamanan Informasi\nBK008 Manajemen Proyek TI\nBK010 Kecerdasan Buatan Dasar\n\n-- tidak disebut kartu peminjaman mana pun", say: "Enam judul belum pernah dipinjam. Tidak ada pasangan, jadi <strong>tidak ikut</strong> ke hasil. Itulah arti kata <strong>INNER</strong>." },
      { dot: "res", label: "Hasil: 6 masuk, 6 keluar", msg: kueri(L, J2), say: "Keenam peminjaman menemukan pasangan. Urutan baris tanpa ORDER BY <strong>tidak dijamin</strong>; di phpMyAdmin urutannya bisa berbeda dari ini (modul menampilkan PJ0002 di atas)." }
    ]) },
  tip("Kalau ingin buku yang belum pernah dipinjam ikut tampil", "INNER JOIN membuangnya. Untuk menampilkan semua buku (yang tanpa pasangan diisi NULL) dipakai <strong>LEFT JOIN</strong>. Ini tidak dibahas modul P14; penjelasan dan contohnya ada di <strong>P4 Bagian 4</strong> (bukan dari modul)."),

  A("Nama Lengkap Kolom dan Alias Tabel", `<p>Setelah dua tabel bergabung, ada kolom yang <strong>bernama sama</strong>: <code>id_buku</code> ada di peminjaman dan di buku. Kalau ditulis <code>id_buku</code> saja, DBMS tidak tahu yang mana, sehingga kueri ditolak (<strong>ERROR 1052 … ambiguous</strong>, artinya bermakna ganda).</p>
<p><strong>Cara 1, nama lengkap:</strong> <code>peminjaman.id_buku</code> atau <code>buku.id_buku</code> (nama_tabel.nama_kolom).</p>
<p><strong>Cara 2, alias tabel:</strong> <code>FROM peminjaman AS p INNER JOIN buku AS b ON p.id_buku = b.id_buku</code>. Alias adalah nama singkat sementara yang hanya berlaku di dalam satu kueri itu. Kata <code>AS</code> boleh dihilangkan (<code>peminjaman p</code>).</p>
<p><strong>Aturan penting:</strong> sesudah alias dipasang, <strong>seluruh</strong> kolom pada kueri itu harus memakai alias. Nama panjang tidak berlaku lagi → <code>peminjaman.id_pinjam</code> ditolak dengan ERROR 1054.</p>
<p>Kolom yang namanya hanya ada di satu tabel (misalnya <code>judul</code>) sebenarnya boleh ditulis tanpa nama tabel. Tetap biasakan menulis aliasnya supaya jelas asal kolom.</p>`, "Bagian 3"),
  tbl("Tiga Cara Menyebut Kolom", ["Penulisan", "Hasil", "Alasan"], [
    ["`SELECT id_buku, judul FROM peminjaman INNER JOIN buku ON …`", "ERROR 1052", "id_buku ada di dua tabel (ambiguous)"],
    ["`SELECT peminjaman.id_buku, judul FROM peminjaman INNER JOIN buku ON …`", "Berhasil", "Disebut lengkap dengan nama tabel"],
    ["`SELECT p.id_buku, b.judul FROM peminjaman AS p INNER JOIN buku AS b ON …`", "Berhasil", "Memakai alias; paling ringkas"],
    ["`SELECT peminjaman.id_pinjam FROM peminjaman AS p INNER JOIN buku AS b ON …`", "ERROR 1054", "Sesudah alias dipasang, nama panjang tidak berlaku"]
  ], [{ label: "Pesan lengkap", target: "col", col: 1, title: "Dari lab (MariaDB)", text: galat(L, "SELECT id_buku, judul FROM peminjaman INNER JOIN buku ON peminjaman.id_buku = buku.id_buku;").replace(/\. Kolom.*$/, ".") + "<br>" + galat(L, "SELECT peminjaman.id_pinjam FROM peminjaman AS p INNER JOIN buku AS b ON p.id_buku = b.id_buku;").replace(/\. Kolom.*$/, ".") }]),

  A("Tiga Tabel Sekaligus", `<p>Untuk kalimat lengkap "siapa meminjam buku apa, kapan", dibutuhkan tiga tabel. Tambahkan <code>INNER JOIN</code> kedua beserta <code>ON</code>-nya.</p>
<p><strong>Mengapa peminjaman ditulis lebih dulu:</strong> tabel peminjaman memuat kedua kunci tamu. Dari sana perjalanan bercabang ke anggota (lewat id_anggota) dan ke buku (lewat id_buku).</p>
<p><strong>Aturan hitung:</strong> banyaknya klausa ON selalu <strong>satu lebih sedikit</strong> daripada banyaknya tabel. Tiga tabel → dua ON; empat tabel → tiga ON.</p>`, "Bagian 4"),
  code("tab SQL phpMyAdmin", kueri(L, J3), "Baris pertama dibaca: <strong>Ahmad Fauzi meminjam Sistem Basis Data pada 1 Oktober 2026</strong>. Tidak ada nomor penunjuk yang tersisa di tampilan, padahal penyimpanannya tidak berubah.", "Tiga Tabel dengan Alias"),

  A("JOIN Bersama WHERE, IS NULL, GROUP BY, HAVING", `<p>JOIN bisa dipadukan dengan semua klausa yang sudah dipelajari. Urutan pengerjaan Bab 11 tetap berlaku; bedanya, <strong>FROM</strong> kini mengambil <strong>hasil penggabungan</strong>, bukan satu tabel. Jadi penggabungan dikerjakan lebih dulu, baru WHERE, GROUP BY, HAVING, SELECT, ORDER BY.</p>
<p><strong>IS NULL</strong> dipakai untuk mencari kolom yang belum diisi, misalnya buku yang belum dikembalikan (<code>tgl_kembali IS NULL</code>). <strong>Jangan</strong> menulis <code>= NULL</code>: NULL berarti belum ada nilai, jadi tidak bisa dibandingkan dengan tanda sama dengan. Perintahnya tidak galat, tetapi <strong>selalu nol baris</strong>. Kebalikannya: <code>IS NOT NULL</code> (sudah dikembalikan).</p>`, "Bagian 5"),
  code("tab SQL phpMyAdmin", kueri(L, JNULL), "Pertanyaan: buku apa saja yang sedang berada di tangan peminjam? Empat baris, sama dengan empat NULL di tabel peminjaman. Dengan <code>WHERE p.tgl_kembali = NULL</code> hasilnya <code>Empty set</code>.", "Menyaring dengan IS NULL"),
  code("tab SQL phpMyAdmin", kueri(L, JG1) + "\n\n" + kueri(L, JG2), "Kueri pertama: siapa yang paling sering meminjam. Kueri kedua: buku yang dipinjam lebih dari sekali (syarat atas hitungan kelompok → HAVING).", "JOIN dengan GROUP BY dan HAVING"),

  A("Empat Percobaan yang Salah", `<p>Dua percobaan <strong>ditolak</strong> DBMS (ada pesan galat), dua lagi <strong>berjalan tetapi salah</strong>. Yang kedua ini lebih berbahaya karena tidak ada peringatan.</p>
<p><strong>1. Kolom bernama sama tanpa nama tabel</strong> → ERROR 1052 ambiguous. Perbaikan: <code>peminjaman.id_buku</code> atau <code>buku.id_buku</code>.</p>
<p><strong>2. Nama panjang padahal alias sudah dipasang</strong> → ERROR 1054 Unknown column 'peminjaman.id_pinjam'. Perbaikan: <code>p.id_pinjam</code>.</p>
<p><strong>3. Lupa ON (perkalian silang)</strong>: <code>SELECT COUNT(*) FROM peminjaman, buku;</code> menghasilkan <strong>${jalan(L, "SELECT COUNT(*) FROM peminjaman, buku;").rows[0][0]}</strong> baris = 6 × 10. Setiap peminjaman dipasangkan dengan semua buku, padahal peminjaman yang benar-benar terjadi hanya enam. Cirinya: jumlah baris jauh lebih banyak daripada jumlah baris tabel mana pun.</p>
<p><strong>4. ON pada kolom yang keliru</strong>: <code>ON p.id_anggota = b.id_buku</code> → <code>Empty set</code>. Nomor berawalan AG tidak akan pernah sama dengan nomor berawalan BK. Hasil kosong yang tak terduga hampir selalu berarti ON menyebut kolom yang salah.</p>`, "Bagian 6"),
  tbl("Enam Kesalahan Umum", ["Keadaan", "Penyebab", "Perbaikan"], [
    ["ERROR 1052 ambiguous", "Kolom bernama sama disebut tanpa nama tabelnya", "Sebut lengkap dengan nama tabel atau aliasnya"],
    ["ERROR 1054 nama panjang", "Alias sudah dipasang, nama panjang masih dipakai", "Pakai alias di seluruh bagian kueri"],
    ["Jumlah baris membengkak", "ON terlupakan → perkalian silang", "Tambahkan ON dengan syarat pasangannya"],
    ["Hasil kosong padahal ada data", "ON menyebut pasangan kolom yang keliru", "Pasangkan kunci tamu dengan kunci primer yang ditunjuknya"],
    ["Baris tertentu hilang", "Baris itu tidak menemukan pasangan; INNER JOIN membuangnya", "Pastikan hilangnya memang dikehendaki sebelum laporan dipakai"],
    ["Angka COUNT terlalu besar", "Pengelompokan dikerjakan pada hasil gabungan yang barisnya sudah berlipat", "Periksa dulu hasil penggabungannya sebelum GROUP BY ditambahkan"]
  ], [
    { label: "Galat vs diam", target: "col", col: 0, title: "Dua bergalat, empat diam", text: "Dua keadaan pertama menimbulkan pesan galat. Empat sisanya berjalan mulus tetapi hasilnya bukan yang dimaksud: periksa jumlah baris hasil." },
    { label: "➕ Contoh COUNT berlipat", target: "row", row: 5, title: "Buku per pengarang lewat JOIN", text: "<code>SELECT b.pengarang, COUNT(*) FROM buku AS b INNER JOIN peminjaman AS p ON p.id_buku = b.id_buku GROUP BY b.pengarang;</code> memberi Rina Kartika <strong>" + jalan(L, "SELECT b.pengarang, COUNT(*) FROM buku AS b INNER JOIN peminjaman AS p ON p.id_buku = b.id_buku WHERE b.pengarang = 'Rina Kartika' GROUP BY b.pengarang;").rows[0][1] + "</strong>, padahal bukunya hanya dua. Yang terhitung adalah baris peminjaman (BK002 dan BK009 masing-masing dua kali), bukan judul." }
  ], "Kesalahan Umum Modul"),
  modul(`<ul class="list-disc pl-5 space-y-1"><li><strong>Urutan hasil contoh pertama.</strong> Modul menampilkan PJ0002 di baris teratas dan menyebut urutan tanpa ORDER BY tidak dijamin. Itu benar; urutan di komputer masing-masing bisa berbeda (di lab Sinau urut PJ0001–PJ0006). Untuk ujian, yang dinilai isinya, bukan urutannya.</li>
<li><strong>Pesan 1052.</strong> MariaDB versi baru menulis <code>Column 'id_buku' in SELECT is ambiguous</code> seperti modul; MariaDB lama dan MySQL menulis <code>in field list</code>. Nomornya tetap 1052.</li>
<li><strong>Perkalian silang.</strong> Modul menulisnya <code>FROM peminjaman, buku</code> (koma). <code>INNER JOIN</code> tanpa ON di MariaDB/MySQL juga menghasilkan perkalian silang yang sama (60 baris).</li></ul>`),
  ibarat([
    ["JOIN", "Petugas membawa kartu peminjaman ke laci Buku, mencari kartu buku yang nomornya sama, lalu menyalin judulnya ke lembar laporan.", "Mencocokkan nomor lalu menyatukan keterangannya itulah yang dikerjakan JOIN, hanya saja DBMS mengerjakannya dalam sekejap untuk seluruh kartu sekaligus."],
    ["INNER JOIN", "Petugas menyandingkan dua tumpukan kartu berdasarkan nomor yang sama.", "Kartu buku yang tidak pernah disebut kartu peminjaman mana pun tetap tertinggal di laci, tidak ikut naik ke lembar laporan. Itulah arti kata INNER."],
    ["Alias tabel", "Nama panggilan yang dipakai selama satu rapat saja.", "Selama rapat semua memanggil dengan nama panggilan itu; sesudah rapat bubar, nama panggilan tidak berlaku lagi. Alias hanya berlaku di dalam satu kueri."]
  ])
];

// Diagram bertahap / kode berpenjelas menggantikan blok kode statis yang isinya sama (halaman tidak memanjang)
{
  const BTU = require("./bertahap_bd_uas.js");
  const ganti = (p, title, blok) => { const i = M[p].findIndex(b => b.title === title); if (i < 0) throw new Error("materi_bd_uas: blok tidak ada: " + p + " " + title); M[p][i] = blok; };
  ganti("p9", "Mengubah dan Menghapus Data", BTU.bdP9Dml);
  ganti("p13", "Skema Lengkap Perpustakaan", BTU.bdP13Skema);
  ganti("p13", "Membuat dan Memeriksa Tabel Peminjaman", BTU.bdP13Create);
  ganti("p14", "Menyaring dengan IS NULL", BTU.bdP14Join);
}
module.exports = M;
