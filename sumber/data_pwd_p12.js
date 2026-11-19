// Pemrograman Web Dinamis — Pertemuan 12: Pengenalan Database dan MySQL
// Sumber: Modul PHP 12. Bagian bertanda ➕ bukan dari modul.
const { fix } = require("./pwd_uas_util.js");

const TIPE = ["INT", "VARCHAR(10)", "VARCHAR(100)", "AUTO_INCREMENT", "PRIMARY KEY", "NOT NULL"];
const ARG = ["\"localhost\"", "\"root\"", "\"\"", "\"db_mahasiswa\""];
const FN = ["mysqli_connect()", "mysqli_connect_error()", "mysqli_query()", "mysqli_error()", "mysqli_close()", "die()", "include"];

module.exports = fix({
  id: "p12",
  nomor: 12,
  judul: "Pengenalan Database dan MySQL",
  ujian: "UAS",
  hero: {
    badge: "Materi 12 • Pemrograman Web Dinamis",
    title: "Simpan Data di Database, Bukan di File Teks",
    text: "Pahami <strong>database</strong>, tabel, kolom (field), dan baris (record); kelola <strong>MySQL</strong> lewat <strong>phpMyAdmin</strong>; buat tabel <code>mahasiswa</code> dengan <code>AUTO_INCREMENT PRIMARY KEY</code>; lalu hubungkan PHP ke MySQL dengan <code>mysqli_connect()</code>, cek dengan <code>mysqli_connect_error()</code>, dan tutup dengan <code>mysqli_close()</code>."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • Istilah Database",
      title: "Database, Tabel, Kolom, Baris",
      headers: ["Istilah", "Artinya", "Contoh"],
      rows: [
        ["Database", "Kumpulan data yang terorganisir, biasanya dalam bentuk tabel", "<code>db_mahasiswa</code>"],
        ["Tabel", "Wadah data sejenis, tersusun dari kolom dan baris", "<code>mahasiswa</code>"],
        ["Kolom (field)", "Satu jenis keterangan", "<code>nim</code>, <code>nama</code>, <code>jurusan</code>, <code>email</code>"],
        ["Baris (record)", "Satu data lengkap", "1 | 2401010001 | Ahmad | Sistem Informasi | ahmad@example.com"],
        ["MySQL", "Sistem manajemen database relasional (RDBMS) open-source, populer untuk aplikasi web", "Berjalan di XAMPP, porta 3306"],
        ["phpMyAdmin", "Alat berbasis web untuk mengelola MySQL", "<code>http://localhost/phpmyadmin</code>"]
      ],
      modes: [
        { label: "Fungsi phpMyAdmin", target: "row", row: 5, title: "Menurut modul", text: "Membuat database, membuat tabel, menambah data, dan menjalankan query SQL. Buka setelah Apache dan MySQL di XAMPP sudah Start." },
        { label: "➕ Kenapa bukan file teks?", target: "row", row: 0, title: "Lebih mudah dicari dan diubah", text: "Di file teks (P11), mengubah atau menghapus satu data berarti menulis ulang file. Di database cukup satu perintah: <code>UPDATE … WHERE id = 1</code>." }
      ]
    },
    {
      type: "code",
      label: "Interaktif 2 • Tabel mahasiswa",
      title: "Struktur Tabel dari Modul",
      file: "SQL (phpMyAdmin → tab SQL)",
      code: "CREATE TABLE mahasiswa (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    nim VARCHAR(10) NOT NULL,\n    nama VARCHAR(100) NOT NULL,\n    jurusan VARCHAR(50) NOT NULL,\n    email VARCHAR(100) NOT NULL\n);",
      note: "<strong>INT</strong> bilangan bulat • <strong>VARCHAR(n)</strong> teks maksimal n karakter • <strong>NOT NULL</strong> wajib diisi • <strong>PRIMARY KEY</strong> pengenal unik tiap baris • <strong>AUTO_INCREMENT</strong> nomor otomatis 1, 2, 3, …"
    },
    {
      type: "table",
      label: "Interaktif 3 • Koneksi PHP ke MySQL",
      title: "mysqli_connect(host, user, password, database)",
      headers: ["Urutan", "Parameter", "Nilai di XAMPP", "Artinya"],
      rows: [
        ["1", "host", "`\"localhost\"`", "Komputer tempat MySQL berjalan"],
        ["2", "username", "`\"root\"`", "Pengguna bawaan MySQL"],
        ["3", "password", "`\"\"`", "Kosong di XAMPP (MAMP: <code>\"root\"</code>)"],
        ["4", "database", "`\"db_mahasiswa\"`", "Database yang langsung dipakai"]
      ],
      modes: [
        { label: "Cek koneksi", target: "none", title: "Pola modul", text: "<code>$conn = mysqli_connect($host, $user, $password, $database);</code><br><code>if (!$conn) { die(\"Koneksi gagal: \" . mysqli_connect_error()); }</code>" },
        { label: "Tutup", target: "none", title: "mysqli_close($conn)", text: "Menutup koneksi setelah selesai. Saran modul: selalu periksa koneksi berhasil sebelum menjalankan query, dan pakai die() atau exit() untuk menangani error koneksi." },
        { label: "➕ PHP 8", target: "none", title: "Error koneksi berupa Fatal error", text: "Sejak PHP 8.1 (dipakai XAMPP versi baru), koneksi gagal langsung menghasilkan <em>Fatal error: Uncaught mysqli_sql_exception: …</em> sebelum baris <code>if (!$conn)</code> dicapai. Penyebabnya tetap tertulis di pesan itu." }
      ]
    },
    {
      type: "code",
      label: "Interaktif 4 • config.php",
      title: "Simpan Koneksi di Satu File",
      file: "config.php",
      code: "<?php\n$host = \"localhost\";\n$user = \"root\";\n$password = \"\";\n$database = \"db_mahasiswa\";\n\n$conn = mysqli_connect($host, $user, $password, $database);\nif (!$conn) {\n    die(\"Koneksi gagal: \" . mysqli_connect_error());\n}\n?>",
      note: "Saran modul: simpan konfigurasi koneksi di file terpisah agar bisa dipakai ulang. Halaman lain cukup menulis <code>include 'config.php';</code> lalu langsung memakai <code>$conn</code>."
    },
    {
      type: "callout",
      label: "➕ Tambahan • MAMP (dipakai di Basis Data)",
      tone: "info",
      heading: "Kalau server lokalmu MAMP, bukan XAMPP",
      html: "Kata sandi root MAMP adalah <code>\"root\"</code>, bukan kosong. Di macOS, MySQL MAMP memakai porta 8889: <code>mysqli_connect(\"127.0.0.1\", \"root\", \"root\", \"db_mahasiswa\", 8889)</code> (porta = argumen ke-5). phpMyAdmin dibuka dari WebStart MAMP."
    }
  ],
  simulator: [
    {
      type: "sql-lab",
      profile: "pwd-p12",
      label: "Lab phpMyAdmin • Aktivitas Modul 12",
      title: "Buat db_mahasiswa dan Tabel mahasiswa",
      desc: "Ruang latihan kosong. Ikuti langkah modul: buat database <code>db_mahasiswa</code> (kotak <strong>Nama basis data</strong> atau contoh pertama), pilih, lalu buat tabel <code>mahasiswa</code>. Periksa hasilnya dengan <code>DESCRIBE</code>.",
      tip: "Simulasi di browser, mirip tab SQL di phpMyAdmin. Isi latihan tersimpan di browsermu dan dipakai lagi di lab P12 berikutnya. Tabel dengan isi contoh untuk CRUD ada di P13.",
      examples: [
        { label: "1. Buat database", sql: "CREATE DATABASE db_mahasiswa;" },
        { label: "2. Pilih database", sql: "USE db_mahasiswa;" },
        { label: "3. Buat tabel (modul)", sql: "CREATE TABLE mahasiswa (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    nim VARCHAR(10) NOT NULL,\n    nama VARCHAR(100) NOT NULL,\n    jurusan VARCHAR(50) NOT NULL,\n    email VARCHAR(100) NOT NULL\n);" },
        { label: "4. Lihat struktur", sql: "DESCRIBE mahasiswa;" },
        { label: "5. Jalankan lagi (error)", sql: "CREATE TABLE mahasiswa (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    nim VARCHAR(10) NOT NULL\n);" },
        { label: "6. IF NOT EXISTS (tugas)", sql: "CREATE TABLE IF NOT EXISTS mahasiswa (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    nim VARCHAR(10) NOT NULL,\n    nama VARCHAR(100) NOT NULL,\n    jurusan VARCHAR(50) NOT NULL,\n    email VARCHAR(100) NOT NULL\n);\nSHOW TABLES;" },
        { label: "7. Uji AUTO_INCREMENT", sql: "INSERT INTO mahasiswa (nim, nama, jurusan, email)\nVALUES ('2401010001', 'Ahmad', 'Sistem Informasi', 'ahmad@example.com');\nINSERT INTO mahasiswa (nim, nama, jurusan, email)\nVALUES ('2401010002', 'Budi', 'Teknik Informatika', 'budi@example.com');\nSELECT * FROM mahasiswa;" },
        { label: "8. Uji NOT NULL", sql: "INSERT INTO mahasiswa (nim, nama, jurusan)\nVALUES ('2401010003', 'Citra', 'Sistem Informasi');" }
      ]
    },
    {
      type: "penelusur",
      label: "Penelusur Langkah",
      title: "Dari mysqli_connect sampai mysqli_close",
      desc: "Kode <code>connect-db.php</code> dari aktivitas modul. Tekan <strong>Berikutnya</strong>.",
      nodes: [{ t: "PHP", s: "connect-db.php" }, { t: "MySQL", s: "localhost:3306" }],
      steps: [
        { on: 0, label: "Siapkan data koneksi", msg: "$host = \"localhost\";\n$user = \"root\";\n$password = \"\";\n$database = \"db_mahasiswa\";", hl: [0, 1, 2, 3], say: "Empat data yang dibutuhkan: <strong>di mana</strong> MySQL (host), <strong>siapa</strong> (user), <strong>kata sandi</strong>, dan <strong>database mana</strong>." },
        { dot: "req", label: "mysqli_connect()", msg: "$conn = mysqli_connect($host, $user, $password, $database);", hl: [0], say: "PHP menghubungi server MySQL di porta 3306 dan masuk sebagai <code>root</code>." },
        { on: 1, dot: "req", label: "MySQL memeriksa", msg: "user root, password kosong  ✔\ndatabase db_mahasiswa        ✔ ada", hl: [0, 1], say: "MySQL mengecek nama pengguna, kata sandi, dan apakah database-nya ada. Kalau salah satu gagal, koneksi ditolak." },
        { dot: "res", label: "Hasil", msg: "$conn = objek koneksi (dipakai untuk query)\nif (!$conn) → tidak dijalankan", hl: [0], say: "Berhasil: <code>$conn</code> berisi koneksi. Variabel ini yang nanti dikirim ke <code>mysqli_query($conn, $sql)</code> di P13." },
        { on: 0, label: "Tampil di halaman", msg: "<p class='success'>Koneksi ke database berhasil!</p>", hl: [0], say: "Halaman menampilkan pesan sukses dengan class <code>success</code>." },
        { on: 0, dot: "req", label: "mysqli_close()", msg: "mysqli_close($conn);", hl: [0], say: "Koneksi ditutup setelah selesai dipakai." }
      ]
    },
    {
      type: "terminal",
      label: "Permainan 1 • Kenapa Koneksi Gagal?",
      title: "Buka connect-db.php dalam Berbagai Keadaan",
      desc: "Kode aktivitas modul. Pesan di bawah adalah yang muncul di XAMPP dengan PHP 8.1 ke atas; pada PHP lama, pesan yang sama muncul lewat <code>mysqli_connect_error()</code> setelah tulisan \"Koneksi gagal:\".",
      shell: "→",
      header: "http://localhost/crud-mahasiswa/connect-db.php",
      scenarios: [
        { label: "1. Semua benar", pill: "Berhasil", ok: true, cmd: "Apache ✔  MySQL ✔  password \"\"  database db_mahasiswa (sudah dibuat)", res: "Koneksi ke database berhasil!", exp: "Database sudah dibuat di phpMyAdmin dan MySQL sedang berjalan." },
        { label: "2. MySQL belum Start", pill: "Gagal", ok: false, cmd: "Apache ✔  MySQL ✘ (belum diklik Start)", res: "Fatal error: Uncaught mysqli_sql_exception: No connection could be made because the target machine actively refused it", exp: "Tidak ada server MySQL yang mendengarkan di porta 3306. Klik <strong>Start</strong> pada MySQL di XAMPP Control Panel." },
        { label: "3. Database belum dibuat", pill: "Gagal", ok: false, cmd: "$database = \"db_mahasiswa\";   // belum dibuat di phpMyAdmin", res: "Fatal error: Uncaught mysqli_sql_exception: Unknown database 'db_mahasiswa'", exp: "Buat dulu database-nya di phpMyAdmin, atau periksa ejaan nama database." },
        { label: "4. Password salah", pill: "Gagal", ok: false, cmd: "$password = \"root\";   // di XAMPP root tanpa password", res: "Fatal error: Uncaught mysqli_sql_exception: Access denied for user 'root'@'localhost' (using password: YES)", exp: "XAMPP: password kosong <code>\"\"</code>. MAMP: <code>\"root\"</code>. <em>using password: YES</em> artinya ada password yang dikirim." },
        { label: "5. Salah nama variabel", pill: "Warning", ok: false, cmd: "$conn = mysqli_connect($host, $user, $pass, $database);   // $pass tidak ada", res: "Warning: Undefined variable $pass\nKoneksi ke database berhasil!", exp: "Variabel yang belum diisi bernilai null, sama dengan tanpa password. Di XAMPP kebetulan berhasil, tetapi Warning tetap tampil. Di MAMP (password root) hasilnya <em>Access denied … (using password: NO)</em>. Perbaiki nama variabelnya." },
        { label: "6. create-table.php dijalankan 2×", pill: "Berhasil", ok: true, cmd: "Buka create-table.php, lalu refresh", res: "Tabel mahasiswa berhasil dibuat atau sudah ada!\nTabel mahasiswa berhasil dibuat atau sudah ada!", exp: "<code>CREATE TABLE IF NOT EXISTS</code> tidak error kalau tabel sudah ada. Tanpa IF NOT EXISTS, percobaan kedua menghasilkan <em>Table 'mahasiswa' already exists</em>." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Bagian Struktur Tabel",
      title: "Lengkapi Definisi Kolom",
      headers: ["Kebutuhan", "Ditulis"],
      rows: [
        { cells: ["Kolom id berisi bilangan bulat"], fields: [{ options: TIPE, answer: "INT" }], ok: "✓" },
        { cells: ["id terisi otomatis 1, 2, 3, …"], fields: [{ options: TIPE, answer: "AUTO_INCREMENT" }], ok: "✓" },
        { cells: ["id menjadi pengenal unik setiap baris"], fields: [{ options: TIPE, answer: "PRIMARY KEY" }], ok: "✓" },
        { cells: ["nim berupa teks maksimal 10 karakter"], fields: [{ options: TIPE, answer: "VARCHAR(10)" }], ok: "✓ NIM bisa diawali 0, jadi disimpan sebagai teks" },
        { cells: ["nama berupa teks maksimal 100 karakter"], fields: [{ options: TIPE, answer: "VARCHAR(100)" }], ok: "✓" },
        { cells: ["Kolom wajib diisi"], fields: [{ options: TIPE, answer: "NOT NULL" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Argumen mysqli_connect",
      title: "Isi Sesuai Urutan Modul (XAMPP)",
      headers: ["Argumen ke-", "Nilai"],
      rows: [
        { cells: ["1 (host)"], fields: [{ options: ARG, answer: "\"localhost\"" }], ok: "✓" },
        { cells: ["2 (username)"], fields: [{ options: ARG, answer: "\"root\"" }], ok: "✓" },
        { cells: ["3 (password)"], fields: [{ options: ARG, answer: "\"\"" }], ok: "✓ kosong di XAMPP" },
        { cells: ["4 (database)"], fields: [{ options: ARG, answer: "\"db_mahasiswa\"" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 4 • Fungsi yang Tepat",
      title: "Kebutuhan → Fungsi PHP-MySQL",
      headers: ["Kebutuhan", "Fungsi"],
      rows: [
        { cells: ["Membuka koneksi ke MySQL"], fields: [{ options: FN, answer: "mysqli_connect()" }], ok: "✓" },
        { cells: ["Mengambil pesan penyebab koneksi gagal"], fields: [{ options: FN, answer: "mysqli_connect_error()" }], ok: "✓" },
        { cells: ["Menghentikan halaman sambil menampilkan pesan"], fields: [{ options: FN, answer: "die()" }], ok: "✓ atau exit()" },
        { cells: ["Menjalankan perintah SQL (misalnya CREATE TABLE)"], fields: [{ options: FN, answer: "mysqli_query()" }], ok: "✓" },
        { cells: ["Mengambil pesan error query yang gagal"], fields: [{ options: FN, answer: "mysqli_error()" }], ok: "✓ <code>mysqli_error($conn)</code>" },
        { cells: ["Menutup koneksi"], fields: [{ options: FN, answer: "mysqli_close()" }], ok: "✓" },
        { cells: ["Memakai config.php di halaman lain"], fields: [{ options: FN, answer: "include" }], ok: "✓ <code>include 'config.php';</code>" }
      ]
    },
    {
      type: "reveal",
      label: "Tebak Hasil • Tabel mahasiswa",
      title: "Apa yang Terjadi?",
      items: [
        { prompt: "INSERT dua baris tanpa menulis kolom id", answer: "id terisi 1 dan 2", reason: "AUTO_INCREMENT memberi nomor sendiri." },
        { prompt: "Baris id 2 dihapus, lalu INSERT baris baru", answer: "id baru = 3", reason: "Nomor AUTO_INCREMENT tidak dipakai ulang." },
        { prompt: "INSERT tanpa kolom email", answer: "Ditolak karena email wajib diisi", reason: "email didefinisikan NOT NULL. MySQL di XAMPP menulisnya <em>Field 'email' doesn't have a default value</em>; lab di atas menulis <em>Kolom 'email' tidak boleh NULL</em>." },
        { prompt: "INSERT dengan id = 1 padahal id 1 sudah ada", answer: "ERROR: Duplicate entry '1' for key 'PRIMARY'", reason: "PRIMARY KEY harus unik." },
        { prompt: "`CREATE TABLE mahasiswa (…)` dijalankan dua kali", answer: "ERROR: Table 'mahasiswa' already exists", reason: "Pakai CREATE TABLE IF NOT EXISTS seperti contoh tugas." },
        { prompt: "Kenapa nim VARCHAR, bukan INT?", answer: "NIM tidak dihitung dan bisa diawali 0", reason: "INT membuang nol di depan (0123 → 123). Nomor yang tidak dihitung (NIM, HP, kode pos) disimpan sebagai teks." }
      ]
    }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu database?", a: "Koleksi data yang terorganisir, biasanya dalam bentuk tabel." },
    { tag: "Konsep", q: "Tabel terdiri dari apa?", a: "Kolom (field) dan baris (record). Contoh tabel mahasiswa: kolom nim, nama, jurusan, email." },
    { tag: "MySQL", q: "Apa itu MySQL?", a: "Sistem manajemen database relasional open-source yang populer untuk aplikasi web." },
    { tag: "phpMyAdmin", q: "Apa itu phpMyAdmin dan alamatnya?", a: "Alat berbasis web untuk mengelola MySQL (buat database, tabel, tambah data, jalankan SQL). Alamat: `http://localhost/phpmyadmin`." },
    { tag: "Tabel", q: "Fungsi `id INT AUTO_INCREMENT PRIMARY KEY`?", a: "id bilangan bulat, terisi otomatis berurutan, dan menjadi pengenal unik tiap baris." },
    { tag: "Tabel", q: "Arti `VARCHAR(100)` dan `NOT NULL`?", a: "VARCHAR(100): teks maksimal 100 karakter. NOT NULL: kolom wajib diisi." },
    { tag: "Koneksi", q: "Fungsi untuk menghubungkan PHP ke MySQL?", a: "`mysqli_connect($host, $user, $password, $database)`." },
    { tag: "Koneksi", q: "Nilai bawaan koneksi di XAMPP?", a: "host `localhost`, user `root`, password kosong `\"\"`, database sesuai yang dibuat (misalnya `db_mahasiswa`)." },
    { tag: "Koneksi", q: "Cara memeriksa koneksi gagal (pola modul)?", a: "`if (!$conn) { die(\"Koneksi gagal: \" . mysqli_connect_error()); }`" },
    { tag: "Koneksi", q: "Fungsi `mysqli_close($conn)`?", a: "Menutup koneksi database setelah selesai dipakai." },
    { tag: "Praktik", q: "Kenapa koneksi disimpan di config.php?", a: "Agar bisa dipakai ulang di banyak halaman dengan `include 'config.php';` dan cukup diubah di satu tempat." },
    { tag: "Tugas", q: "Fungsi `CREATE TABLE IF NOT EXISTS`?", a: "Membuat tabel hanya jika belum ada, sehingga tidak error saat halaman dijalankan ulang." },
    { tag: "➕ Error", q: "Arti \"Access denied for user 'root'@'localhost' (using password: YES)\"?", a: "Password salah. XAMPP: kosong. MAMP: `root`." }
  ],
  quiz: [
    { q: "Database adalah …",
      opts: ["Koleksi data yang terorganisir, biasanya dalam bentuk tabel", "Bahasa pemrograman sisi server", "Browser untuk membuka file PHP", "Folder htdocs"], ans: 0,
      exp: "Definisi modul.",
      optExp: ["Benar.", "Itu PHP.", "Bukan.", "Folder dokumen Apache."] },
    { q: "Dalam tabel, satu data lengkap (misalnya satu mahasiswa) disebut …",
      opts: ["Kolom (field)", "Baris (record)", "Database", "Query"], ans: 1,
      exp: "Kolom = jenis keterangan, baris = satu data.",
      optExp: ["Kolom adalah jenis keterangan seperti nama.", "Benar.", "Wadah semua tabel.", "Perintah SQL."] },
    { q: "MySQL adalah …",
      opts: ["Editor kode", "Sistem manajemen database relasional open-source", "Framework CSS", "Ekstensi browser"], ans: 1,
      exp: "Populer untuk aplikasi web.",
      optExp: ["Bukan.", "Benar.", "Bukan.", "Bukan."] },
    { q: "phpMyAdmin pada XAMPP dibuka melalui alamat …",
      opts: ["`http://localhost/phpmyadmin`", "`http://phpmyadmin.com`", "`file:///C:/xampp/phpmyadmin`", "`http://localhost:3306`"], ans: 0,
      exp: "Setelah Apache dan MySQL di-Start.",
      optExp: ["Benar.", "Bukan situs publik.", "Harus lewat Apache.", "3306 adalah porta MySQL, bukan halaman web."] },
    { q: "Pada `id INT AUTO_INCREMENT PRIMARY KEY`, fungsi AUTO_INCREMENT adalah …",
      opts: ["Membuat id wajib diisi pengguna", "Mengisi id otomatis dengan nomor berurutan", "Mengubah id menjadi teks", "Menghapus id lama"], ans: 1,
      exp: "1, 2, 3, … tanpa diisi.",
      optExp: ["Justru tidak perlu diisi.", "Benar.", "Bukan.", "Bukan."] },
    { q: "Tipe data yang sesuai untuk kolom nama menurut modul adalah …",
      opts: ["INT", "VARCHAR(100)", "BOOLEAN", "DATE"], ans: 1,
      exp: "Saran modul: VARCHAR untuk teks, INT untuk angka.",
      optExp: ["Untuk bilangan bulat.", "Benar.", "Untuk true/false.", "Untuk tanggal."] },
    { q: "Fungsi PHP untuk menghubungkan ke database MySQL adalah …",
      opts: ["`mysql_open()`", "`mysqli_connect()`", "`db_connect()`", "`connect_mysql()`"], ans: 1,
      exp: "mysqli_connect(host, user, password, database).",
      optExp: ["Tidak ada.", "Benar.", "Tidak ada.", "Tidak ada."] },
    { q: "Urutan parameter `mysqli_connect()` yang benar adalah …",
      opts: ["database, host, user, password", "host, username, password, database", "username, password, host, database", "host, database, username, password"], ans: 1,
      exp: "mysqli_connect(\"localhost\", \"root\", \"\", \"db_mahasiswa\")",
      optExp: ["Salah urutan.", "Benar.", "Salah urutan.", "Salah urutan."] },
    { q: "Password bawaan user root MySQL di XAMPP adalah …",
      opts: ["root", "admin", "kosong (\"\")", "123456"], ans: 2,
      exp: "MAMP memakai \"root\".",
      optExp: ["Itu MAMP.", "Bukan.", "Benar.", "Bukan."] },
    { q: "Fungsi `mysqli_connect_error()` dipakai untuk …",
      opts: ["Menutup koneksi", "Menampilkan pesan penyebab koneksi gagal", "Menjalankan query", "Membuat database"], ans: 1,
      exp: "die(\"Koneksi gagal: \" . mysqli_connect_error());",
      optExp: ["Itu mysqli_close().", "Benar.", "Itu mysqli_query().", "Lewat phpMyAdmin atau CREATE DATABASE."] },
    { q: "Fungsi untuk menutup koneksi database adalah …",
      opts: ["`mysqli_end()`", "`mysqli_close($conn)`", "`close_db()`", "`die()`"], ans: 1,
      exp: "Dipanggil setelah selesai.",
      optExp: ["Tidak ada.", "Benar.", "Tidak ada.", "die menghentikan skrip, tidak menutup koneksi secara khusus."] },
    { q: "Menurut praktik terbaik modul, konfigurasi koneksi sebaiknya …",
      opts: ["Ditulis ulang di setiap halaman", "Disimpan di file terpisah (config.php) untuk dipakai ulang", "Disimpan di file HTML", "Ditulis di phpMyAdmin"], ans: 1,
      exp: "include 'config.php';",
      optExp: ["Sulit dirawat.", "Benar.", "HTML tidak menjalankan PHP.", "Bukan tempatnya."] },
    { q: "Pada tugas modul, `CREATE TABLE IF NOT EXISTS mahasiswa (…)` berarti …",
      opts: ["Menghapus tabel lalu membuat ulang", "Membuat tabel hanya jika belum ada", "Mengosongkan tabel", "Membuat database baru"], ans: 1,
      exp: "Tidak error saat dijalankan berkali-kali.",
      optExp: ["Itu DROP lalu CREATE.", "Benar.", "Itu TRUNCATE.", "Itu CREATE DATABASE."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 12*
📚 *Pengenalan Database dan MySQL*

1️⃣ *Database:* koleksi data terorganisir (tabel). Tabel = kolom (field) + baris (record). MySQL = RDBMS open-source.

2️⃣ *phpMyAdmin:* http://localhost/phpmyadmin → buat database (db_mahasiswa), tabel, tambah data, jalankan SQL.

3️⃣ *Tabel mahasiswa:* id INT AUTO_INCREMENT PRIMARY KEY, nim VARCHAR(10) NOT NULL, nama VARCHAR(100) NOT NULL, jurusan VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL.

4️⃣ *Koneksi:* $conn = mysqli_connect("localhost", "root", "", "db_mahasiswa");
if (!$conn) { die("Koneksi gagal: " . mysqli_connect_error()); }
mysqli_close($conn);

5️⃣ *Praktik terbaik:* nama deskriptif, id PK + AUTO_INCREMENT, tipe sesuai (VARCHAR teks, INT angka), koneksi di config.php (include), selalu cek koneksi.

6️⃣ *Tugas:* CREATE TABLE IF NOT EXISTS lewat mysqli_query($conn, $sql); gagal → mysqli_error($conn).`
});
