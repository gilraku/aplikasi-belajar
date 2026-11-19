// Basis Data — Pertemuan 9: DML, Mengisi, Mengubah, dan Menghapus Data (Bab 9). Sumber: Modul Ajar Basis Data P9.
// Bagian bertanda ➕ bukan dari modul.
const { SEED, lab } = require("./bd_uas_util.js");

module.exports = {
  id: "p9",
  nomor: 9,
  judul: "DML: Mengisi, Mengubah, dan Menghapus Data",
  ujian: "UAS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Isi Tabel dengan INSERT, Ubah dengan UPDATE, Hapus dengan DELETE",
    text: "Kuasai <strong>dua bentuk INSERT</strong>, cara menulis nilai (teks dan tanggal dalam kutip tunggal), <strong>UPDATE</strong> dan <strong>DELETE</strong> dengan klausa <strong>WHERE</strong>, serta cara membaca <strong>rows affected</strong>. Bagian paling berbahaya: UPDATE atau DELETE tanpa WHERE mengenai seluruh baris tanpa pesan galat."
  },
  cheatsheet: [
    { type: "table", label: "Interaktif 1 • Bentuk Perintah", title: "Empat Pola DML Bab 9", mono: true, headers: ["Keperluan", "Bentuk perintah"],
      rows: [
        ["INSERT bentuk pertama (semua kolom, berurutan)", "INSERT INTO buku VALUES ('BK001','Dasar Pemrograman Komputer','Andi Wibowo',2019,4);"],
        ["INSERT bentuk kedua (sebut kolom, lebih aman)", "INSERT INTO buku (id_buku, judul, pengarang, tahun, stok) VALUES ('BK002','Sistem Basis Data','Rina Kartika',2021,3);"],
        ["Beberapa baris sekaligus", "INSERT INTO buku VALUES (…), (…), (…);"],
        ["Mengubah isi", "UPDATE buku SET stok = 6 WHERE id_buku = 'BK004';"],
        ["Menghapus baris", "DELETE FROM buku WHERE id_buku = 'BK006';"]
      ],
      modes: [
        { label: "Bentuk pertama", target: "row", row: 0, title: "Lebih pendek, mudah tergeser", text: "Semua kolom wajib diisi dan urutannya persis seperti urutan kolom di tabel. Kalau kelak tabel mendapat kolom baru, perintah lama ini ditolak (ERROR 1136)." },
        { label: "Bentuk kedua", target: "row", row: 1, title: "Lebih aman", text: "Urutan kolom bebas, kolom bernilai bawaan (DEFAULT) boleh dilewati, dan tetap benar walaupun kelak ada kolom baru." },
        { label: "Banyak baris", target: "row", row: 2, title: "Pisahkan dengan koma", text: "Setiap baris di dalam kurung sendiri, antarbaris dipisah koma, titik koma hanya di paling akhir. Pesannya: <code>Query OK, 3 rows affected</code>." },
        { label: "WHERE", target: "row", row: 3, title: "Tulis WHERE lebih dulu", text: "WHERE menentukan baris mana yang dikenai. Tanpa WHERE, UPDATE dan DELETE mengenai <strong>seluruh</strong> baris, dan yang muncul justru pesan berhasil." }
      ] },
    { type: "table", label: "Interaktif 2 • Menulis Nilai", title: "Kutip atau Tidak?", mono: true, headers: ["Jenis", "Contoh", "Aturan"],
      rows: [
        ["Teks", "'Sistem Basis Data'", "Diapit tanda kutip tunggal"],
        ["Tanggal", "'2026-09-12'", "Diapit kutip tunggal, urutan tahun-bulan-tanggal"],
        ["Bilangan", "2021", "Ditulis apa adanya, tanpa kutip"],
        ["Kosong", "NULL", "Ditulis NULL, tanpa kutip"]
      ],
      modes: [
        { label: "Lupa kutip", target: "row", row: 0, title: "Dikira nama kolom", text: "<code>VALUES ('BK010','Buku Baru',Penulis,…)</code> → <code>ERROR 1054 Unknown column 'Penulis' in 'VALUES'</code>. Teks tanpa kutip dianggap nama kolom." },
        { label: "'NULL'", target: "row", row: 3, title: "Pakai kutip = teks", text: "<code>'NULL'</code> berarti teks empat huruf N-U-L-L, bukan kosong. Kosong ditulis <code>NULL</code> tanpa kutip." }
      ] },
    { type: "table", label: "Interaktif 3 • Galat DML", title: "Enam Masalah Saat Mengisi dan Mengubah Data", mono: true, headers: ["Pesan", "Penyebab", "Perbaikan"],
      rows: [
        ["ERROR 1062 Duplicate entry 'BK001' for key 'PRIMARY'", "Nomor buku sudah ada di tabel", "Pakai nomor yang belum pernah dipakai"],
        ["ERROR 1364 Field 'pengarang' doesn't have a default value", "Kolom wajib dilewati, tanpa nilai bawaan", "Isi kolomnya, atau beri nilai bawaan dengan ALTER"],
        ["ERROR 1054 Unknown column 'stokk' in 'SET'", "Nama kolom salah ketik di bagian SET", "Periksa ejaan dengan DESCRIBE"],
        ["ERROR 1054 Unknown column 'Penulis' in 'VALUES'", "Teks tanpa kutip tunggal, dikira nama kolom", "Apit dengan kutip tunggal: 'Penulis'"],
        ["ERROR 1136 Column count doesn't match value count", "Jumlah nilai ≠ jumlah kolom", "Hitung ulang, atau sebut nama kolom"],
        ["(tanpa pesan galat) semua baris berubah", "WHERE lupa ditulis", "Tulis WHERE lebih dulu; baca rows affected"]
      ],
      modes: [
        { label: "Paling berbahaya", target: "row", row: 5, title: "Tidak ada galat", text: "Perintah tanpa WHERE tetap sah. Yang muncul pesan berhasil disertai jumlah baris yang terkena. Petugas tidak keliru; yang keliru perintahnya." },
        { label: "➕ MySQL", target: "col", col: 0, title: "Teks pesan bisa sedikit berbeda", text: "Modul memakai MariaDB (MAMP). Di MySQL 8, ERROR 1054 menyebut <code>in 'field list'</code>, bukan <code>in 'SET'</code> atau <code>in 'VALUES'</code>. Nomornya sama." }
      ] },
    { type: "callout", tone: "warn", heading: "DELETE bukan DROP TABLE", html: "<code>DELETE FROM buku;</code> menghapus <strong>semua baris</strong>; tabel dan rangkanya masih ada (<code>SELECT</code> → Empty set). <code>DROP TABLE buku;</code> menghapus <strong>tabelnya</strong> sekaligus (Bab 7); nama tabel pun hilang." },
    { type: "table", label: "Interaktif 4 • rows affected", title: "Membaca Pesan Hasil", mono: true, headers: ["Pesan", "Artinya"],
      rows: [
        ["Query OK, 1 row affected", "Satu baris terkena: sesuai bila yang dimaksud satu buku"],
        ["Query OK, 5 rows affected", "Lima baris terkena. Dimaksud satu, terkena lima? WHERE salah atau tidak ada"],
        ["Rows matched: 5  Changed: 5  Warnings: 0", "Khusus UPDATE: 5 baris cocok dengan WHERE, 5 benar-benar berubah"],
        ["Empty set", "SELECT tidak menemukan baris (tabel kosong atau syarat tidak terpenuhi)"]
      ],
      modes: [{ label: "➕ Matched ≠ Changed", target: "row", row: 2, title: "Nilai yang sama tidak dihitung berubah", text: "Bila stok BK004 sudah 6 lalu dijalankan lagi <code>UPDATE buku SET stok = 6 WHERE id_buku = 'BK004'</code>, hasilnya <code>Rows matched: 1 Changed: 0</code>: barisnya ketemu, tetapi isinya tidak berubah." }] }
  ],
  simulator: [
    lab({ profile: "bd-p9", label: "Lab phpMyAdmin • Praktik Terpandu Modul", title: "Isi, Ubah, dan Hapus Data Perpustakaan",
      desc: "Basis data <code>perpustakaan</code> sudah punya tabel <code>buku</code> dan <code>anggota</code> yang masih <strong>kosong</strong>, seperti di awal Bab 9. Jalankan contoh berurutan dari nomor 1. Contoh bertanda ⚠ sengaja salah; amati pesan dan angka rows affected-nya. Tekan <strong>Kembalikan data awal</strong> untuk mengulang.",
      seed: SEED.kosong,
      examples: [
        { label: "1 · BK001 bentuk pertama", sql: "INSERT INTO buku VALUES\n('BK001','Dasar Pemrograman Komputer','Andi Wibowo',2019,4);" },
        { label: "2 · BK002 bentuk kedua", sql: "INSERT INTO buku (id_buku, judul, pengarang, tahun, stok)\nVALUES ('BK002','Sistem Basis Data','Rina Kartika',2021,3);" },
        { label: "3 · BK003–BK005 sekaligus", sql: "INSERT INTO buku VALUES\n('BK003','Jaringan Komputer Dasar','Budi Santoso',2018,2),\n('BK004','Analisis Sistem Informasi','Siti Nurhaliza',2022,5),\n('BK005','Statistika untuk Informatika','Dewi Anggraini',2020,1);\nSELECT * FROM buku;" },
        { label: "4 · Tiga anggota", sql: "INSERT INTO anggota (id_anggota, nama, prodi, tgl_daftar) VALUES\n('AG001','Ahmad Fauzi','Sistem Informasi','2026-09-12'),\n('AG002','Nur Aisyah','Sistem Informasi','2026-09-14');\nINSERT INTO anggota VALUES\n('AG003','Rangga Pratama','Teknik Informatika','2026-09-15','T');" },
        { label: "5 · Bukti nilai bawaan Y", sql: "SELECT * FROM anggota;" },
        { label: "6 · UPDATE stok BK004", sql: "UPDATE buku SET stok = 6\nWHERE id_buku = 'BK004';\nSELECT id_buku, judul, stok FROM buku\nWHERE id_buku = 'BK004';" },
        { label: "7 · BK006 lalu DELETE", sql: "INSERT INTO buku VALUES\n('BK006','Buku Uji Coba','Penulis Uji',2024,1);\nDELETE FROM buku WHERE id_buku = 'BK006';\nSELECT COUNT(*) FROM buku;" },
        { label: "8 · Salin ke buku_coba", sql: "CREATE TABLE buku_coba AS SELECT * FROM buku;\nSELECT id_buku, judul, stok FROM buku_coba;" },
        { label: "⚠ UPDATE tanpa WHERE", sql: "UPDATE buku_coba SET stok = 0;\nSELECT id_buku, judul, stok FROM buku_coba;" },
        { label: "⚠ DELETE tanpa WHERE", sql: "DELETE FROM buku_coba;\nSELECT * FROM buku_coba;" },
        { label: "Hapus buku_coba", sql: "DROP TABLE buku_coba;\nSHOW TABLES;" },
        { label: "⚠ 1062 nomor kembar", sql: "INSERT INTO buku VALUES\n('BK001','Buku Lain','Penulis Lain',2025,1);" },
        { label: "⚠ 1364 kolom wajib dilewati", sql: "INSERT INTO buku (id_buku, judul, tahun, stok)\nVALUES ('BK020','Buku Tanpa Pengarang',2025,1);" },
        { label: "⚠ 1054 salah ketik SET", sql: "UPDATE buku SET stokk = 7 WHERE id_buku = 'BK001';" },
        { label: "⚠ 1054 teks tanpa kutip", sql: "INSERT INTO buku VALUES\n('BK010','Buku Baru',Penulis,2025,1);" },
        { label: "⚠ 1136 jumlah nilai kurang", sql: "INSERT INTO buku VALUES\n('BK010','Buku Baru','Penulis Baru');" }
      ] }),
    { type: "exercise", label: "Permainan 1 • Tebak rows affected", title: "Berapa Baris yang Terkena?", headers: ["Perintah (tabel buku berisi 5 baris, stok BK004 = 6)", "rows affected"],
      rows: [
        { cells: ["<code>UPDATE buku SET stok = 7 WHERE id_buku = 'BK001';</code>"], fields: [{ options: ["0", "1", "2", "5"], answer: "1" }], ok: "✓ id_buku kunci primer, jadi paling banyak satu baris." },
        { cells: ["<code>UPDATE buku SET stok = 0;</code>"], fields: [{ options: ["0", "1", "2", "5"], answer: "5" }], ok: "✓ Tanpa WHERE: seluruh baris. Tidak ada pesan galat." },
        { cells: ["<code>DELETE FROM buku WHERE id_buku = 'BK099';</code>"], fields: [{ options: ["0", "1", "5", "ERROR"], answer: "0" }], ok: "✓ Tidak ada buku BK099. Perintahnya sah, hanya tidak mengenai apa pun: <code>0 rows affected</code>." },
        { cells: ["<code>UPDATE buku SET stok = stok + 1 WHERE tahun >= 2020;</code>"], fields: [{ options: ["1", "2", "3", "5"], answer: "3" }], ok: "✓ Terbitan 2020 ke atas: BK002 (2021), BK004 (2022), BK005 (2020)." },
        { cells: ["<code>UPDATE buku SET stok = 6 WHERE id_buku = 'BK004';</code> (stok sudah 6)"], fields: [{ options: ["Matched 1, Changed 1", "Matched 1, Changed 0", "Matched 0, Changed 0"], answer: "Matched 1, Changed 0" }], ok: "✓ Barisnya cocok, tetapi isinya sudah 6 sehingga tidak ada yang berubah." },
        { cells: ["<code>INSERT INTO buku VALUES (…), (…), (…);</code> tiga kurung"], fields: [{ options: ["1", "3", "5"], answer: "3" }], ok: "✓ Satu INSERT dapat memasukkan beberapa baris sekaligus." }
      ] },
    { type: "exercise", label: "Permainan 2 • Latihan Tingkat 2 Modul", title: "Apa yang Terjadi pada Perintah Ini?", headers: ["Perintah", "Akibat"],
      rows: [
        { cells: ["<code>INSERT INTO buku VALUES ('BK010','Buku Baru','Penulis Baru');</code>"], fields: [{ options: ["ERROR 1136", "ERROR 1054", "ERROR 1062", "Berhasil, semua baris berubah"], answer: "ERROR 1136" }], ok: "✓ Tabel buku punya 5 kolom, nilainya hanya 3. Perbaikan: lengkapi tahun dan stok, atau sebut nama kolomnya." },
        { cells: ["<code>INSERT INTO buku VALUES (BK011,'Buku Baru','Penulis Baru',2025,1);</code>"], fields: [{ options: ["ERROR 1136", "ERROR 1054", "ERROR 1062", "Berhasil, semua baris berubah"], answer: "ERROR 1054" }], ok: "✓ BK011 tanpa kutip dikira nama kolom. Tulis <code>'BK011'</code>." },
        { cells: ["<code>UPDATE buku SET stok = 10;</code>"], fields: [{ options: ["ERROR 1136", "ERROR 1054", "ERROR 1062", "Berhasil, semua baris berubah"], answer: "Berhasil, semua baris berubah" }], ok: "✓ Tidak ada WHERE: stok kelima buku menjadi 10. Tambahkan <code>WHERE id_buku = '…'</code>." },
        { cells: ["<code>DELETE FROM anggota WHERE nama = Ahmad Fauzi;</code>"], fields: [{ options: ["ERROR 1064 (sintaks)", "ERROR 1062", "Berhasil, satu baris terhapus"], answer: "ERROR 1064 (sintaks)" }], ok: "✓ Teks berspasi tanpa kutip membuat perintah tidak bisa dibaca. Tulis <code>WHERE nama = 'Ahmad Fauzi'</code>; lebih aman lagi pakai <code>WHERE id_anggota = 'AG001'</code>." }
      ] },
    { type: "reveal", label: "Mini-Case Modul", title: "Catatan dari Petugas: Kunci Perintahnya", items: [
      { prompt: "1. Tiga buku baru (BK006 Pemrograman Basis Data, BK007 Keamanan Informasi, BK008 Manajemen Proyek TI) dalam satu INSERT", answer: "INSERT INTO buku VALUES ('BK006','Pemrograman Basis Data','Hendra Gunawan',2023,3), ('BK007','Keamanan Informasi','Maya Sari',2024,2), ('BK008','Manajemen Proyek TI','Andi Wibowo',2021,4);", reason: "Satu perintah, tiga kurung dipisah koma: Query OK, 3 rows affected." },
      { prompt: "2. Dua anggota baru tanpa keterangan status", answer: "INSERT INTO anggota (id_anggota, nama, prodi, tgl_daftar) VALUES ('AG004','…','…','2026-…'), ('AG005','…','…','2026-…');", reason: "Bentuk kedua; status_aktif tidak disebut sehingga terisi nilai bawaan Y." },
      { prompt: "3. Pengarang BK007 salah ketik: Maya Sari Dewi", answer: "UPDATE buku SET pengarang = 'Maya Sari Dewi' WHERE id_buku = 'BK007';", reason: "Pastikan rows affected = 1." },
      { prompt: "4. Salah satu anggota baru membatalkan pendaftaran", answer: "UPDATE anggota SET status_aktif = 'T' WHERE id_anggota = 'AG004';", reason: "Rows matched dan Changed harus 1. Jangan pakai AG003 (sudah T)." },
      { prompt: "6. Bersihkan: kembalikan buku ke 5 baris dan anggota ke 3 baris", answer: "DELETE FROM buku WHERE id_buku IN ('BK006','BK007','BK008'); DELETE FROM anggota WHERE id_anggota IN ('AG004','AG005');", reason: "Atau tiga DELETE dengan WHERE id_buku = … satu per satu. IN dibahas di Bab 10 Bagian 2." }
    ] }
  ],
  flashcards: [
    { tag: "P9", q: "Apa itu DML?", a: "Data Manipulation Language: kelompok perintah SQL yang mengurus <strong>isi</strong> data (INSERT, UPDATE, DELETE, SELECT), bukan rangkanya." },
    { tag: "P9", q: "Beda DDL dan DML?", a: "DDL mengurus rangka tabel (CREATE, ALTER, DROP; Bab 7–8). DML mengurus isi data (INSERT, UPDATE, DELETE; SELECT di Bab 10)." },
    { tag: "P9", q: "Dua bentuk INSERT?", a: "1) <code>INSERT INTO t VALUES (…)</code>: semua kolom, urut. 2) <code>INSERT INTO t (kol1, kol2) VALUES (…)</code>: sebut kolom, lebih aman." },
    { tag: "P9", q: "Keuntungan INSERT yang menyebut nama kolom?", a: "Urutan bebas, kolom bernilai bawaan boleh dilewati, dan tetap benar walau kelak ada kolom baru." },
    { tag: "P9", q: "Cara menulis teks, tanggal, bilangan, kosong?", a: "Teks dan tanggal dalam kutip tunggal (<code>'2026-09-12'</code>, tahun-bulan-tanggal). Bilangan tanpa kutip. Kosong = <code>NULL</code> tanpa kutip." },
    { tag: "P9", q: "Fungsi klausa WHERE pada UPDATE/DELETE?", a: "Menentukan baris mana yang dikenai perintah. Tanpa WHERE, seluruh baris terkena." },
    { tag: "P9", q: "Apa yang muncul bila UPDATE ditulis tanpa WHERE?", a: "Tidak ada pesan galat. Justru pesan berhasil, misalnya <code>Query OK, 5 rows affected</code>." },
    { tag: "P9", q: "Apa itu rows affected?", a: "Keterangan jumlah baris yang terkena sebuah perintah. Alat pemeriksa tercepat: bandingkan dengan jumlah baris yang dimaksud." },
    { tag: "P9", q: "Dimaksud satu baris, laporan 8 rows affected. Artinya?", a: "WHERE salah atau tidak ada. Hentikan dan perbaiki sebelum perintah berikutnya." },
    { tag: "P9", q: "Beda DELETE FROM buku; dan DROP TABLE buku;?", a: "DELETE menghapus semua baris, tabel dan rangkanya masih ada. DROP TABLE menghapus tabelnya sekaligus." },
    { tag: "P9", q: "ERROR 1364?", a: "Field '…' doesn't have a default value: kolom wajib dilewati tanpa nilai bawaan." },
    { tag: "P9", q: "ERROR 1136?", a: "Column count doesn't match value count: jumlah nilai tidak sama dengan jumlah kolom." },
    { tag: "P9", q: "Kebiasaan yang menyelamatkan saat menulis UPDATE/DELETE?", a: "Tulis klausa WHERE lebih dulu, baru bagian depannya; lalu baca rows affected." }
  ],
  quiz: [
    { q: "Menurut modul, DML adalah kelompok perintah SQL yang …", opts: ["Mengurus isi data, bukan rangkanya", "Mengurus rangka tabel", "Mengatur hak akses pengguna", "Mengurus koneksi ke server"], ans: 0, exp: "DML mengurus isi data: memasukkan, mengubah, menghapus, dan menampilkannya.", optExp: ["Benar.", "Itu DDL (CREATE, ALTER, DROP).", "Itu DCL (GRANT/REVOKE), tidak dibahas Bab 9.", "Bukan tugas SQL DML."] },
    { q: "Perintah berikut yang termasuk DML adalah …", opts: ["UPDATE", "CREATE", "ALTER", "DROP"], ans: 0, exp: "INSERT, UPDATE, DELETE (dan SELECT) adalah DML.", optExp: ["Benar.", "DDL.", "DDL.", "DDL."] },
    { q: "Keuntungan INSERT bentuk kedua (menyebut nama kolom) dibanding bentuk pertama adalah …", opts: ["Urutan bebas, kolom bernilai bawaan boleh dilewati, tetap benar walau ada kolom baru", "Perintahnya lebih pendek", "Tidak perlu tanda kutip untuk teks", "Bisa memasukkan data ke dua tabel sekaligus"], ans: 0, exp: "Bentuk kedua lebih aman; bentuk pertama lebih pendek.", optExp: ["Benar.", "Itu keunggulan bentuk pertama.", "Teks tetap wajib dikutip.", "Satu INSERT hanya untuk satu tabel."] },
    { q: "Pada INSERT bentuk pertama (tanpa nama kolom), aturannya adalah …", opts: ["Semua kolom wajib diisi dengan urutan persis seperti tabel", "Kolom boleh diisi sebagian", "Urutan nilai bebas", "Kolom bernilai bawaan boleh dilewati"], ans: 0, exp: "Bentuk pertama: semua kolom, berurutan.", optExp: ["Benar.", "Hanya bentuk kedua.", "Harus urut.", "Hanya bentuk kedua; di bentuk pertama status_aktif harus disebut, misalnya 'T'."] },
    { q: "Penulisan nilai tanggal yang benar pada perintah SQL adalah …", opts: ["'2026-09-12'", "2026-09-12", "'12-09-2026'", "\"12/09/2026\""], ans: 0, exp: "Tanggal diapit kutip tunggal dengan urutan tahun-bulan-tanggal.", optExp: ["Benar.", "Tanpa kutip dibaca sebagai pengurangan angka.", "Urutannya terbalik.", "Bukan format tanggal SQL."] },
    { q: "Nilai yang ditulis tanpa tanda kutip adalah …", opts: ["Bilangan dan NULL", "Teks dan tanggal", "Semua nilai", "Hanya teks"], ans: 0, exp: "Teks dan tanggal dikutip; bilangan dan NULL tidak.", optExp: ["Benar.", "Justru keduanya wajib dikutip.", "Teks dan tanggal wajib dikutip.", "Teks wajib dikutip."] },
    { q: "Dua baris anggota dimasukkan tanpa menyebut kolom status_aktif, tetapi hasilnya terisi Y. Penyebabnya …", opts: ["Kolom itu punya nilai bawaan (DEFAULT) Y dari Bab 8", "MySQL selalu mengisi Y", "Status_aktif adalah kunci primer", "Terjadi galat 1364"], ans: 0, exp: "Nilai bawaan bekerja sendiri saat kolom dilewati.", optExp: ["Benar.", "Hanya karena DEFAULT yang dipasang.", "Kunci primer = id_anggota.", "1364 muncul justru bila tidak ada nilai bawaan."] },
    { q: "Fungsi klausa WHERE pada UPDATE dan DELETE adalah …", opts: ["Menentukan baris mana yang dikenai perintah", "Menentukan kolom yang ditampilkan", "Mengurutkan hasil", "Membatalkan perintah bila salah"], ans: 0, exp: "WHERE = klausa penyaring.", optExp: ["Benar.", "Itu daftar kolom SELECT.", "Itu ORDER BY (Bab 10 Bagian 2).", "WHERE tidak membatalkan apa pun."] },
    { q: "Apa yang terjadi bila UPDATE buku SET stok = 0; dijalankan pada tabel berisi 5 buku?", opts: ["Stok kelima buku menjadi 0, muncul pesan berhasil 5 rows affected", "Muncul pesan galat karena WHERE tidak ada", "Hanya buku pertama yang berubah", "Tidak ada yang berubah"], ans: 0, exp: "Tanpa WHERE, perintah dikenakan pada seluruh baris dan tidak ada pesan galat.", optExp: ["Benar.", "Perintah tetap sah.", "Seluruh baris terkena.", "Semuanya berubah."] },
    { q: "Menurut modul, mengapa UPDATE tanpa WHERE lebih berbahaya daripada perintah yang salah ketik?", opts: ["Karena tidak menimbulkan pesan galat, sehingga kerusakan tidak disadari", "Karena memerlukan waktu lebih lama", "Karena menghapus tabel", "Karena memutus koneksi ke server"], ans: 0, exp: "Salah ketik ditolak DBMS; tanpa WHERE justru dikerjakan dengan patuh.", optExp: ["Benar.", "Bukan soal waktu.", "UPDATE tidak menghapus tabel.", "Tidak berhubungan."] },
    { q: "Kebiasaan yang dianjurkan modul saat menulis UPDATE atau DELETE adalah …", opts: ["Menulis klausa WHERE lebih dulu, baru bagian depannya", "Menulis SET paling akhir", "Selalu memakai DROP sebelum DELETE", "Menjalankan perintah dua kali"], ans: 0, exp: "Kebiasaan yang menyelamatkan.", optExp: ["Benar.", "Tidak ada aturan itu.", "DROP menghapus tabel.", "Justru berbahaya."] },
    { q: "Arti 'rows affected' pada pesan hasil adalah …", opts: ["Jumlah baris yang terkena sebuah perintah", "Jumlah kolom tabel", "Jumlah galat", "Jumlah tabel di basis data"], ans: 0, exp: "Alat pemeriksa tercepat.", optExp: ["Benar.", "Bukan kolom.", "Bukan galat.", "Bukan tabel."] },
    { q: "UPDATE dimaksudkan untuk satu buku, tetapi melaporkan 8 rows affected. Apa yang terjadi?", opts: ["WHERE salah atau tidak ada", "Tabel rusak", "Server MAMP mati", "Kunci primer hilang"], ans: 0, exp: "Bandingkan angka itu dengan jumlah baris yang dimaksud; lalu perbaiki sebelum melanjutkan.", optExp: ["Benar.", "Tabel baik-baik saja; perintahnya keliru.", "Kalau server mati, perintah tidak jalan sama sekali.", "Tidak berhubungan."] },
    { q: "Perbedaan DELETE FROM buku; dan DROP TABLE buku; adalah …", opts: ["DELETE menghapus semua baris tetapi tabelnya tetap ada; DROP TABLE menghapus tabelnya sekaligus", "Keduanya sama", "DELETE menghapus tabel; DROP menghapus baris", "DROP TABLE bisa dibatalkan, DELETE tidak"], ans: 0, exp: "Sesudah DELETE tanpa WHERE: SELECT → Empty set. Sesudah DROP: tabel pun hilang.", optExp: ["Benar.", "Akibatnya berbeda.", "Terbalik.", "Keduanya tidak bisa dibatalkan tanpa cadangan."] },
    { q: "Pesan ERROR 1062 Duplicate entry 'BK001' for key 'PRIMARY' muncul karena …", opts: ["Nomor buku sudah ada di tabel", "Kolom wajib dilewati", "Nama kolom salah ketik", "Jumlah nilai tidak sama dengan jumlah kolom"], ans: 0, exp: "Kunci primer tidak boleh kembar.", optExp: ["Benar.", "Itu 1364.", "Itu 1054.", "Itu 1136."] },
    { q: "Pesan ERROR 1364 Field 'pengarang' doesn't have a default value artinya …", opts: ["Kolom wajib dilewati, tanpa nilai bawaan", "Nomor buku kembar", "Teks tanpa kutip", "Nama tabel salah"], ans: 0, exp: "Perbaikan: isi kolomnya, atau beri nilai bawaan dengan ALTER.", optExp: ["Benar.", "Itu 1062.", "Itu 1054.", "Itu 1146."] },
    { q: "INSERT INTO buku VALUES ('BK010','Buku Baru',Penulis,2025,1); menghasilkan …", opts: ["ERROR 1054 Unknown column 'Penulis'", "ERROR 1136", "ERROR 1062", "Berhasil"], ans: 0, exp: "Teks tanpa kutip tunggal dikira nama kolom.", optExp: ["Benar.", "Jumlah nilainya sudah lima.", "BK010 belum ada.", "Ditolak."] },
    { q: "ERROR 1136 Column count doesn't match value count terjadi bila …", opts: ["Jumlah nilai tidak sama dengan jumlah kolom", "Kolom salah ketik", "Nilai kunci kembar", "Tabel belum dipilih"], ans: 0, exp: "Hitung ulang, atau sebut nama kolom.", optExp: ["Benar.", "Itu 1054.", "Itu 1062.", "Itu 1046 (Bab 7)."] },
    { q: "Hasil yang sama dengan mengisi tabel lewat perintah INSERT juga bisa didapat melalui tab … di phpMyAdmin, dan hasilnya dilihat di tab …", opts: ["Tambahkan; Jelajahi", "SQL; Struktur", "Operasi; Ekspor", "Struktur; Tambahkan"], ans: 0, exp: "Tab Tambahkan: satu kotak isian untuk setiap kolom. Tab Jelajahi menampilkan isinya. Nyaman untuk 1–2 baris; untuk data banyak, SQL lebih cepat.", optExp: ["Benar.", "Tab SQL untuk mengetik perintah; Struktur untuk rangka.", "Tidak untuk mengisi data.", "Struktur untuk rangka."] },
    { q: "Untuk mencoba UPDATE dan DELETE tanpa WHERE dengan aman, modul …", opts: ["Membuat tabel salinan buku_coba dengan CREATE TABLE buku_coba AS SELECT * FROM buku;", "Menjalankannya langsung pada tabel buku", "Mematikan MAMP lebih dulu", "Memakai DROP DATABASE"], ans: 0, exp: "Percobaan dijalankan pada salinan, lalu salinannya dihapus dengan DROP TABLE buku_coba;.", optExp: ["Benar.", "Jangan sekali-kali pada tabel berisi data penting.", "Perintah tidak bisa dijalankan.", "Menghapus seluruh basis data."] },
    { q: "Pesan UPDATE berikut: Rows matched: 1 Changed: 0. Artinya …", opts: ["Satu baris cocok dengan WHERE, tetapi isinya sudah sama sehingga tidak ada yang berubah", "Perintah gagal", "Tidak ada baris yang cocok", "Satu baris terhapus"], ans: 0, exp: "➕ Changed hanya menghitung baris yang nilainya benar-benar berbeda.", optExp: ["Benar.", "Tidak ada galat.", "Matched = 1, berarti ada yang cocok.", "UPDATE tidak menghapus."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS BASIS DATA — PERTEMUAN 9*
✍️ *DML: Mengisi, Mengubah, Menghapus Data*

1️⃣ *DML* mengurus isi data (INSERT, UPDATE, DELETE; SELECT di Bab 10). *DDL* mengurus rangka (CREATE, ALTER, DROP).

2️⃣ *INSERT bentuk 1:* INSERT INTO buku VALUES (…); semua kolom, urut, lebih pendek.
*INSERT bentuk 2:* INSERT INTO buku (kol, …) VALUES (…); lebih aman, kolom DEFAULT boleh dilewati.
Banyak baris: (…), (…), (…);

3️⃣ *Nilai:* teks & tanggal 'kutip tunggal' ('2026-09-12' = tahun-bulan-tanggal), bilangan tanpa kutip, kosong = NULL.

4️⃣ *UPDATE* buku SET stok = 6 WHERE id_buku = 'BK004';
*DELETE* FROM buku WHERE id_buku = 'BK006';
Tanpa WHERE → SELURUH baris, TANPA pesan galat. Tulis WHERE lebih dulu.

5️⃣ *rows affected* = jumlah baris terkena. Dimaksud 1, terkena 5 → WHERE salah/tidak ada.

6️⃣ *DELETE FROM buku;* hapus semua baris, tabel tetap. *DROP TABLE buku;* hapus tabelnya.

7️⃣ *Galat:* 1062 nomor kembar • 1364 kolom wajib dilewati tanpa DEFAULT • 1054 kolom salah ketik / teks tanpa kutip • 1136 jumlah nilai ≠ kolom.`
};
