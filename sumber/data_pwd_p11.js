// Pemrograman Web Dinamis — Pertemuan 11: Pengolahan Form dengan PHP
// Sumber: Modul PHP 11. Bagian bertanda ➕ bukan dari modul.
// Keluaran simulator diperiksa dengan PHP 8.3 sungguhan.
const { fix } = require("./pwd_uas_util.js");

const GP = [{ value: "GET", label: "GET" }, { value: "POST", label: "POST" }];
const FN = ["$_GET", "$_POST", "isset()", "empty()", "htmlspecialchars()", "filter_var()", "file_put_contents()", "FILE_APPEND"];

module.exports = fix({
  id: "p11",
  nomor: 11,
  judul: "Pengolahan Form dengan PHP",
  ujian: "UAS",
  hero: {
    badge: "Materi 11 • Pemrograman Web Dinamis",
    title: "Terima, Periksa, Simpan: Data Form di Server",
    text: "Pahami beda <strong>GET</strong> dan <strong>POST</strong>, cara mengambil data dengan <code>$_GET</code>/<code>$_POST</code> dan <code>isset()</code>, membersihkan input dengan <code>htmlspecialchars()</code>, validasi di server dengan <code>empty()</code> dan <code>filter_var()</code>, lalu menyimpan ke file teks dengan <code>file_put_contents()</code>."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • GET vs POST",
      title: "Dua Cara Form Mengirim Data",
      headers: ["", "GET", "POST"],
      rows: [
        ["Data dikirim lewat", "URL sebagai query string: <code>proses.php?nama=Ahmad&email=…</code>", "Body (isi) pesan HTTP, tidak terlihat di URL"],
        ["Ukuran", "Kecil (terbatas panjang URL)", "Besar"],
        ["Cocok untuk", "Data tidak sensitif: pencarian, filter", "Data sensitif atau banyak: pendaftaran, email, password"],
        ["Dibaca di PHP dengan", "`$_GET[\"nama\"]`", "`$_POST[\"nama\"]`"],
        ["Ditulis di form", "`<form method=\"GET\" action=\"proses.php\">`", "`<form method=\"POST\" action=\"proses.php\">`"]
      ],
      modes: [
        { label: "Saran modul", target: "row", row: 2, title: "Kapan pakai yang mana", text: "POST untuk form yang mengandung data sensitif (email, password). GET untuk pencarian atau filter data. Selalu periksa dulu dengan <code>isset()</code> agar tidak error." },
        { label: "➕ POST ≠ aman", target: "row", row: 0, title: "Tidak di URL, tapi bukan rahasia", text: "POST hanya tidak tampil di address bar, riwayat, dan bookmark. Isinya tetap bisa dilihat di DevTools (tab Network). Data rahasia dilindungi dengan HTTPS." },
        { label: "➕ Bookmark", target: "row", row: 2, title: "Kelebihan GET", text: "Karena data ada di URL, hasil pencarian GET bisa di-bookmark dan dibagikan, misalnya <code>cari.php?q=basis+data</code>." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 2 • Fungsi Pengolah Input",
      title: "Lima Fungsi di Modul 11",
      headers: ["Fungsi", "Gunanya", "Contoh → hasil"],
      rows: [
        ["`isset($x)`", "Apakah variabel/kolom <strong>ada</strong> (dan bukan null)", "`isset($_POST[\"nama\"])` → true jika kolom nama terkirim"],
        ["`empty($x)`", "Apakah isinya <strong>kosong</strong>", "`empty(\"\")` → true • `empty(\"0\")` → true ➕"],
        ["`htmlspecialchars($x)`", "Mengubah karakter HTML menjadi teks aman (cegah XSS)", "`<b>` → `&lt;b&gt;`"],
        ["`filter_var($x, FILTER_VALIDATE_EMAIL)`", "Cek format email; hasilnya email itu atau false", "`ahmad@kampus` → false"],
        ["`file_put_contents(file, data, FILE_APPEND)`", "Menulis ke file; FILE_APPEND = tambahkan di akhir", "Satu baris baru di data.txt"]
      ],
      modes: [
        { label: "isset vs empty", target: "row", row: 0, title: "Ada belum tentu terisi", text: "Kolom yang dikirim kosong: <code>isset</code> true (ada), <code>empty</code> true (kosong). Kolom yang tidak dikirim sama sekali: <code>isset</code> false, <code>empty</code> true. Modul memakai keduanya: <code>isset</code> saat mengambil, <code>empty</code> saat memvalidasi." },
        { label: "Tanpa FILE_APPEND", target: "row", row: 4, title: "Isi lama hilang", text: "<code>file_put_contents(\"data.txt\", $data)</code> tanpa FILE_APPEND menimpa seluruh isi file, jadi hanya data terakhir yang tersisa." },
        { label: "ENT_QUOTES", target: "row", row: 2, title: "Bentuk lengkap di modul", text: "<code>htmlspecialchars($_POST[\"nama\"], ENT_QUOTES, \"UTF-8\")</code>: ENT_QUOTES ikut mengubah tanda kutip tunggal dan ganda, UTF-8 menentukan pengodean huruf." }
      ]
    },
    {
      type: "code",
      label: "Interaktif 3 • Pola Lengkap",
      title: "Ambil → Bersihkan → Validasi → Simpan",
      file: "proses.php",
      code: "<?php\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\n    // 1. Ambil (aman jika kolom tidak ada) + 2. bersihkan\n    $nama  = isset($_POST[\"nama\"])  ? htmlspecialchars($_POST[\"nama\"])  : \"\";\n    $email = isset($_POST[\"email\"]) ? htmlspecialchars($_POST[\"email\"]) : \"\";\n\n    // 3. Validasi di server\n    if (empty($nama) || empty($email)) {\n        echo \"Harap isi semua field!\";\n    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n        echo \"Format email tidak valid!\";\n    } else {\n        // 4. Simpan (latihan: file teks; P13: database)\n        $data = \"Nama: $nama, Email: $email\\n\";\n        file_put_contents(\"data.txt\", $data, FILE_APPEND);\n        echo \"Data tersimpan!\";\n    }\n}\n?>",
      note: "<code>kondisi ? A : B</code> adalah operator ternary: jika kondisi true hasilnya A, jika false hasilnya B."
    },
    {
      type: "callout",
      label: "Interaktif 4 • Praktik Terbaik Modul",
      tone: "success",
      heading: "Tiga aturan pengolahan form",
      html: "1. <strong>Selalu validasi di server</strong> meskipun sudah ada validasi JavaScript (P9).<br>2. Gunakan <code>htmlspecialchars()</code> untuk menangani input pengguna dengan aman.<br>3. Simpan data dalam format yang terstruktur (satu baris per data, urutan kolom sama) agar mudah diolah."
    },
    {
      type: "callout",
      label: "➕ Tambahan • Uji Validasi Server",
      tone: "warning",
      heading: "Pesan \"Harap isi semua field!\" tidak pernah muncul?",
      html: "Kolom memakai <code>required</code> dan <code>type=\"email\"</code>, jadi browser sudah menolak sebelum data sampai ke PHP. Untuk menguji validasi server, tambahkan <code>novalidate</code> pada form (atau hapus <code>required</code> lewat DevTools). Ini juga bukti bahwa validasi browser bisa dilewati."
    }
  ],
  simulator: [
    {
      type: "penelusur",
      label: "Penelusur 1 • Metode GET",
      title: "Form GET: Data Menumpang di URL",
      desc: "Form <code>&lt;form method=\"GET\" action=\"proses.php\"&gt;</code> dengan kolom <code>name=\"nama\"</code>. Tekan <strong>Berikutnya</strong>.",
      nodes: [{ t: "Browser", s: "form" }, { t: "Server", s: "proses.php" }],
      steps: [
        { on: 0, label: "Form diisi", msg: "nama: Ahmad Fauzi\n[Kirim]", hl: [0], say: "Pengguna mengetik <strong>Ahmad Fauzi</strong> lalu menekan Kirim." },
        { on: 0, label: "Address bar setelah Kirim", msg: "http://localhost/crud-mahasiswa/proses.php?nama=Ahmad+Fauzi", hl: [0], say: "Browser menempelkan data ke URL sebagai <strong>query string</strong>: dimulai <code>?</code>, pasangan <code>name=nilai</code>, dipisah <code>&amp;</code>. Spasi menjadi <code>+</code>." },
        { dot: "req", label: "Request", msg: "GET /crud-mahasiswa/proses.php?nama=Ahmad+Fauzi HTTP/1.1\nHost: localhost", hl: [0], say: "Data ikut di baris pertama request. Tidak ada body." },
        { on: 1, label: "Di PHP", msg: "$_GET = [\"nama\" => \"Ahmad Fauzi\"]\n\nif (isset($_GET[\"nama\"])) {\n    echo \"Nama: \" . $_GET[\"nama\"];\n}", hl: [0], say: "PHP mengisi <code>$_GET</code> dari query string. Kuncinya sama dengan atribut <code>name</code> kolom." },
        { dot: "res", label: "Response", msg: "Nama: Ahmad Fauzi", say: "Halaman hasil bisa di-bookmark atau dibagikan, karena datanya ada di URL." }
      ]
    },
    {
      type: "penelusur",
      label: "Penelusur 2 • Metode POST",
      title: "Form POST: Data di Body Pesan",
      desc: "Form yang sama, tetapi <code>method=\"POST\"</code>.",
      nodes: [{ t: "Browser", s: "form" }, { t: "Server", s: "proses.php" }],
      steps: [
        { on: 0, label: "Address bar setelah Kirim", msg: "http://localhost/crud-mahasiswa/proses.php", hl: [0], say: "URL bersih: data <strong>tidak</strong> ditempel di alamat." },
        { dot: "req", label: "Request", msg: "POST /crud-mahasiswa/proses.php HTTP/1.1\nHost: localhost\nContent-Type: application/x-www-form-urlencoded\n\nnama=Ahmad+Fauzi&email=ahmad%40example.com", hl: [0, 4], say: "Data dikirim di <strong>body</strong>, setelah satu baris kosong. Formatnya sama dengan query string, tetapi tidak terlihat di URL." },
        { on: 1, label: "Di PHP", msg: "$_POST = [\"nama\" => \"Ahmad Fauzi\", \"email\" => \"ahmad@example.com\"]", hl: [0], say: "PHP mengisi <code>$_POST</code> dari body. <code>$_GET</code> kosong." },
        { dot: "res", label: "Response", msg: "<h3>Data Terkirim:</h3>\n<p>Nama: Ahmad Fauzi</p>\n<p>Email: ahmad@example.com</p>", say: "➕ Kalau halaman hasil POST di-refresh, browser bertanya \"Confirm Form Resubmission\" karena data akan dikirim ulang." }
      ]
    },
    {
      type: "terminal",
      label: "Permainan 1 • Coba process-form.php",
      title: "Isi Form Aktivitas, Lihat Hasil PHP",
      desc: "Kode aktivitas modul: ambil dengan <code>isset</code> + <code>htmlspecialchars</code>, cek <code>!empty</code>, lalu <code>filter_var</code>. Anggap form sudah diberi <code>novalidate</code> supaya semua isian sampai ke PHP.",
      shell: "→",
      header: "Bagian .output di process-form.php",
      scenarios: [
        { label: "1. Halaman baru dibuka", pill: "GET", ok: true, cmd: "Membuka http://localhost/crud-mahasiswa/process-form.php", res: "(kosong)", exp: "Tidak ada <code>else</code> untuk GET, jadi bagian output kosong." },
        { label: "2. Isian benar", pill: "POST", ok: true, cmd: "Nama: Ahmad | Email: ahmad@kampus.ac.id", res: "Data Terkirim:\nNama: Ahmad\nEmail: ahmad@kampus.ac.id", exp: "Lolos <code>!empty</code> dan <code>filter_var</code>." },
        { label: "3. Email tanpa domain", pill: "POST", ok: false, cmd: "Nama: Ahmad | Email: ahmad@kampus", res: "Format email tidak valid!", exp: "<code>filter_var(\"ahmad@kampus\", FILTER_VALIDATE_EMAIL)</code> → false." },
        { label: "4. Nama kosong", pill: "POST", ok: false, cmd: "Nama: (kosong) | Email: ahmad@kampus.ac.id", res: "Harap isi semua field!", exp: "<code>empty(\"\")</code> → true." },
        { label: "5. Nama berisi tag", pill: "Aman", ok: true, cmd: "Nama: <b>Ahmad</b> | Email: ahmad@kampus.ac.id", res: "Data Terkirim:\nNama: <b>Ahmad</b>   ← tampil sebagai tulisan, tidak tebal\nEmail: ahmad@kampus.ac.id", exp: "<code>htmlspecialchars</code> mengubahnya menjadi <code>&amp;lt;b&amp;gt;Ahmad&amp;lt;/b&amp;gt;</code>, sehingga browser menampilkan tag sebagai teks. Bandingkan dengan tugas P10 yang belum memakai fungsi ini." },
        { label: "6. Script jahat", pill: "Aman", ok: true, cmd: "Nama: <script>alert(1)</script> | Email: a@b.c", res: "Data Terkirim:\nNama: <script>alert(1)</script>   ← hanya tulisan\nEmail: a@b.c", exp: "Tanpa <code>htmlspecialchars</code>, script ini akan dijalankan browser setiap kali halaman menampilkannya. Inilah serangan XSS (Cross-Site Scripting)." }
      ]
    },
    {
      type: "terminal",
      label: "Permainan 2 • Tugas contact-form.php",
      title: "Isi contacts.txt Setelah Beberapa Kiriman",
      desc: "Kode contoh tugas modul. Kiriman dilakukan berurutan dari skenario 1 sampai 5. Lihat pesan di halaman dan isi file <code>contacts.txt</code> setelahnya.",
      shell: "→",
      header: "Halaman + contacts.txt",
      scenarios: [
        { label: "1. Pesan pertama", pill: "Tersimpan", ok: true, cmd: "Nama: Ahmad | Email: ahmad@kampus.ac.id | Pesan: Kapan UAS?", res: "Pesan berhasil disimpan!\n\ncontacts.txt:\nNama: Ahmad, Email: ahmad@kampus.ac.id, Pesan: Kapan UAS?", exp: "Format sesuai spesifikasi tugas: <code>Nama: [nama], Email: [email], Pesan: [pesan]\\n</code>." },
        { label: "2. Email salah", pill: "Ditolak", ok: false, cmd: "Nama: Budi | Email: budi@kampus | Pesan: Halo", res: "Format email tidak valid!\n\ncontacts.txt: (tidak berubah)", exp: "Data yang tidak valid tidak ditulis ke file." },
        { label: "3. Pesan kosong", pill: "Ditolak", ok: false, cmd: "Nama: Citra | Email: citra@kampus.ac.id | Pesan: (kosong)", res: "Harap isi semua field!\n\ncontacts.txt: (tidak berubah)", exp: "Ketiga kolom wajib diisi." },
        { label: "4. Nama dengan tag", pill: "Tersimpan", ok: true, cmd: "Nama: <b>Dodi</b> | Email: dodi@kampus.ac.id | Pesan: Izin", res: "Pesan berhasil disimpan!\n\ncontacts.txt (baris ke-2):\nNama: &lt;b&gt;Dodi&lt;/b&gt;, Email: dodi@kampus.ac.id, Pesan: Izin", exp: "Yang tersimpan adalah versi yang sudah dibersihkan (entitas HTML)." },
        { label: "5. Pesan dua baris ➕", pill: "Format rusak", ok: false, cmd: "Nama: Eka | Email: eka@kampus.ac.id | Pesan: Baris 1 (Enter) Baris 2", res: "Pesan berhasil disimpan!\n\ncontacts.txt (baris ke-3 dan ke-4):\nNama: Eka, Email: eka@kampus.ac.id, Pesan: Baris 1\nBaris 2", exp: "➕ Enter di textarea ikut tersimpan, sehingga satu data terpecah menjadi dua baris. Perbaikan: <code>$pesan = str_replace([\"\\r\", \"\\n\"], \" \", $pesan);</code>. Di database (P13) masalah ini tidak ada." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • GET atau POST?",
      title: "Pilih Metode yang Tepat",
      headers: ["Form", "Metode"],
      rows: [
        { cells: ["Kotak pencarian buku di perpustakaan"], fields: [{ options: GP, answer: "GET" }], ok: "✓ hasil bisa di-bookmark" },
        { cells: ["Form login (username dan password)"], fields: [{ options: GP, answer: "POST" }], ok: "✓ data sensitif" },
        { cells: ["Form pendaftaran mahasiswa (NIM, nama, email)"], fields: [{ options: GP, answer: "POST" }], ok: "✓" },
        { cells: ["Filter daftar mahasiswa per jurusan"], fields: [{ options: GP, answer: "GET" }], ok: "✓ <code>?jurusan=SI</code>" },
        { cells: ["Form kontak dengan pesan panjang"], fields: [{ options: GP, answer: "POST" }], ok: "✓ data besar" },
        { cells: ["URL-nya menjadi <code>proses.php?nama=Ahmad</code>"], fields: [{ options: GP, answer: "GET" }], ok: "✓ query string" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 4 • Fungsi yang Tepat",
      title: "Kebutuhan → Fungsi PHP",
      headers: ["Kebutuhan", "Fungsi"],
      rows: [
        { cells: ["Membaca kolom dari form <code>method=\"POST\"</code>"], fields: [{ options: FN, answer: "$_POST" }], ok: "✓" },
        { cells: ["Membaca <code>q</code> dari <code>cari.php?q=web</code>"], fields: [{ options: FN, answer: "$_GET" }], ok: "✓" },
        { cells: ["Memastikan kolom terkirim sebelum dibaca"], fields: [{ options: FN, answer: "isset()" }], ok: "✓" },
        { cells: ["Menolak kolom yang kosong"], fields: [{ options: FN, answer: "empty()" }], ok: "✓" },
        { cells: ["Mencegah tag dari pengguna dijalankan browser (XSS)"], fields: [{ options: FN, answer: "htmlspecialchars()" }], ok: "✓" },
        { cells: ["Mengecek format email di server"], fields: [{ options: FN, answer: "filter_var()" }], ok: "✓ FILTER_VALIDATE_EMAIL" },
        { cells: ["Menulis data ke file teks"], fields: [{ options: FN, answer: "file_put_contents()" }], ok: "✓" },
        { cells: ["Menambah di akhir file, bukan menimpa"], fields: [{ options: FN, answer: "FILE_APPEND" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Tebak Hasil • Fungsi Input",
      title: "true, false, atau apa?",
      items: [
        { prompt: "`isset($_POST[\"nama\"])` saat kolom nama dikirim kosong", answer: "true", reason: "Kolomnya ada (berisi string kosong)." },
        { prompt: "`empty($_POST[\"nama\"])` saat kolom nama dikirim kosong", answer: "true", reason: "Isinya kosong." },
        { prompt: "`isset($_POST[\"nama\"])` saat halaman baru dibuka (GET)", answer: "false", reason: "Belum ada data POST sama sekali." },
        { prompt: "`empty(\"0\")` ➕", answer: "true", reason: "PHP menganggap \"0\" kosong. Kalau 0 adalah isian sah, cek dengan <code>trim($x) !== \"\"</code>." },
        { prompt: "`htmlspecialchars(\"<b>Hi</b>\")`", answer: "&amp;lt;b&amp;gt;Hi&amp;lt;/b&amp;gt;", reason: "Browser menampilkannya sebagai tulisan &lt;b&gt;Hi&lt;/b&gt;." },
        { prompt: "`filter_var(\"ahmad@kampus.ac.id\", FILTER_VALIDATE_EMAIL)`", answer: "\"ahmad@kampus.ac.id\"", reason: "Kalau valid, hasilnya email itu sendiri (dianggap true di if)." },
        { prompt: "`filter_var(\"ahmad@kampus\", FILTER_VALIDATE_EMAIL)`", answer: "false", reason: "Domain tanpa titik ditolak." },
        { prompt: "`$_POST[\"email\"] ?? \"kosong\"` saat email tidak dikirim ➕", answer: "\"kosong\"", reason: "Operator <code>??</code> adalah singkatan <code>isset($x) ? $x : \"kosong\"</code>." }
      ]
    }
  ],
  flashcards: [
    { tag: "GET", q: "Ciri metode GET?", a: "Data dikirim lewat URL sebagai query string (`?nama=Ahmad&email=…`), ukuran terbatas, cocok untuk data tidak sensitif (pencarian, filter). Dibaca dengan `$_GET`." },
    { tag: "POST", q: "Ciri metode POST?", a: "Data dikirim lewat body HTTP, tidak terlihat di URL, cocok untuk data sensitif atau besar (pendaftaran). Dibaca dengan `$_POST`." },
    { tag: "GET/POST", q: "Kapan pakai GET dan kapan POST (saran modul)?", a: "POST untuk data sensitif (email, password). GET untuk pencarian atau filter data." },
    { tag: "isset", q: "Fungsi `isset()`?", a: "Memeriksa apakah variabel/kolom ada (dan bukan null), untuk menghindari error saat membaca `$_POST`/`$_GET`." },
    { tag: "Ternary", q: "Arti `$nama = isset($_POST[\"nama\"]) ? $_POST[\"nama\"] : \"\";`?", a: "Jika kolom nama ada, ambil isinya; jika tidak, isi string kosong." },
    { tag: "Keamanan", q: "Fungsi `htmlspecialchars()`?", a: "Mengubah karakter HTML (`<`, `>`, `&`, kutip) menjadi entitas teks agar input pengguna tidak dijalankan sebagai HTML/script. Mencegah XSS." },
    { tag: "Keamanan", q: "Apa itu XSS?", a: "Cross-Site Scripting: penyerang memasukkan kode HTML/JavaScript lewat input, lalu kode itu dijalankan di browser orang lain yang membuka halaman." },
    { tag: "Validasi", q: "Cara validasi email di server?", a: "`filter_var($email, FILTER_VALIDATE_EMAIL)`: hasilnya email itu jika valid, `false` jika tidak." },
    { tag: "Validasi", q: "Kenapa tetap validasi di server walau sudah ada JavaScript?", a: "Validasi di browser bisa dilewati (JavaScript dimatikan, atribut dihapus, data dikirim langsung). Server adalah pemeriksa terakhir." },
    { tag: "File", q: "Cara menyimpan data ke file teks?", a: "`file_put_contents(\"data.txt\", $data, FILE_APPEND);` FILE_APPEND menambah di akhir file; tanpa itu isi lama tertimpa." },
    { tag: "Form", q: "Dari mana kunci `$_POST[\"…\"]` diambil?", a: "Dari atribut `name` kolom form, bukan `id`." },
    { tag: "CRUD", q: "Hubungan P11 dengan proyek akhir?", a: "Pengolahan form = fungsi Create. File teks adalah latihan sebelum data disimpan ke MySQL (P12–P13)." }
  ],
  quiz: [
    { q: "Pada metode GET, data form dikirim melalui …",
      opts: ["Body HTTP", "URL sebagai query string", "Cookie", "File teks"], ans: 1,
      exp: "Contoh: proses.php?nama=Ahmad&email=ahmad@example.com",
      optExp: ["Itu POST.", "Benar.", "Bukan cara form mengirim.", "Bukan."] },
    { q: "Metode yang paling tepat untuk form pendaftaran yang berisi email dan password adalah …",
      opts: ["GET", "POST", "Keduanya sama saja", "Tidak perlu method"], ans: 1,
      exp: "Saran modul: POST untuk data sensitif.",
      optExp: ["Data tampil di URL dan riwayat.", "Benar.", "Berbeda tempat pengiriman datanya.", "Tanpa method, form memakai GET."] },
    { q: "Metode yang cocok untuk fitur pencarian data adalah …",
      opts: ["GET", "POST", "PUT", "DELETE"], ans: 0,
      exp: "Data tidak sensitif dan hasilnya bisa di-bookmark.",
      optExp: ["Benar.", "Bisa, tetapi hasil tidak bisa di-bookmark.", "Tidak dipakai form HTML.", "Tidak dipakai form HTML."] },
    { q: "Variabel PHP untuk membaca data dari form `method=\"POST\"` adalah …",
      opts: ["`$_GET`", "`$_POST`", "`$_FORM`", "`$POST`"], ans: 1,
      exp: "$_POST[\"nama\"]",
      optExp: ["Untuk GET.", "Benar.", "Tidak ada.", "Kurang garis bawah."] },
    { q: "Fungsi `isset($_POST[\"nama\"])` dipakai untuk …",
      opts: ["Mengisi kolom nama", "Memeriksa apakah data nama ada agar tidak error", "Menghapus kolom nama", "Mengubah nama menjadi huruf besar"], ans: 1,
      exp: "Saran modul: selalu periksa dengan isset().",
      optExp: ["Tidak mengisi.", "Benar.", "Tidak menghapus.", "Itu strtoupper()."] },
    { q: "Fungsi `htmlspecialchars()` digunakan untuk mencegah serangan …",
      opts: ["SQL Injection", "XSS (Cross-Site Scripting)", "DDoS", "Brute force"], ans: 1,
      exp: "Karakter HTML diubah menjadi entitas sehingga tidak dijalankan browser.",
      optExp: ["SQL Injection dicegah dengan prepared statement (P13).", "Benar.", "Serangan banjir request.", "Menebak password."] },
    { q: "Hasil `htmlspecialchars(\"<b>Ahmad</b>\")` adalah …",
      opts: ["`<b>Ahmad</b>`", "`Ahmad`", "`&lt;b&gt;Ahmad&lt;/b&gt;`", "`b Ahmad b`"], ans: 2,
      exp: "<code>&amp;lt;</code> dan <code>&amp;gt;</code> adalah entitas untuk tanda &lt; dan &gt;, sehingga browser menampilkannya sebagai tulisan.",
      optExp: ["Tidak berubah berarti tidak aman.", "Tag tidak dihapus, hanya diubah.", "Benar.", "Bukan."] },
    { q: "Fungsi untuk memeriksa format email di sisi server adalah …",
      opts: ["`filter_var($email, FILTER_VALIDATE_EMAIL)`", "`isset($email)`", "`htmlspecialchars($email)`", "`is_email($email)`"], ans: 0,
      exp: "Hasilnya email itu jika valid, false jika tidak.",
      optExp: ["Benar.", "Hanya cek ada/tidak.", "Hanya membersihkan karakter HTML.", "Fungsi itu tidak ada di PHP."] },
    { q: "Fungsi `empty($nama)` bernilai true jika …",
      opts: ["$nama berisi \"Ahmad\"", "$nama berisi string kosong", "$nama berisi \"admin\"", "$nama berisi spasi di tengah"], ans: 1,
      exp: "empty juga true untuk \"0\", 0, null, dan false.",
      optExp: ["Berisi.", "Benar.", "Berisi.", "Berisi."] },
    { q: "Kode `file_put_contents(\"data.txt\", $data, FILE_APPEND);` akan …",
      opts: ["Menimpa seluruh isi data.txt", "Menambahkan $data di akhir data.txt", "Membaca isi data.txt", "Menghapus data.txt"], ans: 1,
      exp: "FILE_APPEND = tambahkan; tanpa itu isi lama tertimpa.",
      optExp: ["Itu tanpa FILE_APPEND.", "Benar.", "Itu file_get_contents().", "Itu unlink()."] },
    { q: "Menurut praktik terbaik modul, validasi di sisi server …",
      opts: ["Tidak perlu jika sudah ada validasi JavaScript", "Tetap harus dilakukan meskipun sudah ada validasi JavaScript", "Hanya untuk metode GET", "Cukup memakai atribut required"], ans: 1,
      exp: "Validasi di browser bisa dilewati.",
      optExp: ["Bisa dilewati pengguna.", "Benar.", "Untuk semua metode.", "required juga di browser."] },
    { q: "Kunci pada `$_POST[\"email\"]` diambil dari atribut … pada kolom form",
      opts: ["id", "name", "class", "placeholder"], ans: 1,
      exp: "&lt;input type=\"email\" id=\"email\" name=\"email\"&gt;: yang dikirim adalah name.",
      optExp: ["id untuk CSS/JavaScript.", "Benar.", "Untuk CSS.", "Hanya petunjuk tampilan."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 11*
📚 *Pengolahan Form dengan PHP*

1️⃣ *GET:* data di URL (?nama=Ahmad&email=…), kecil, tidak sensitif (pencarian/filter) → $_GET.
*POST:* data di body HTTP, tidak di URL, sensitif/besar (pendaftaran) → $_POST.

2️⃣ *Ambil aman:* $nama = isset($_POST["nama"]) ? $_POST["nama"] : "";

3️⃣ *Bersihkan:* htmlspecialchars($x, ENT_QUOTES, "UTF-8") → cegah XSS (< > jadi &lt; &gt;).

4️⃣ *Validasi server:* empty($nama) → kosong; filter_var($email, FILTER_VALIDATE_EMAIL) → format email. Tetap wajib walau sudah ada validasi JS.

5️⃣ *Simpan ke file:* file_put_contents("data.txt", $data, FILE_APPEND); FILE_APPEND = tambah di akhir (tanpa itu tertimpa).

6️⃣ *Kunci $_POST* = atribut name kolom form.`
});
