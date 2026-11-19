// Pemrograman Web Dinamis — Pertemuan 10: Pengenalan PHP
// Sumber: Modul PHP 10. Bagian bertanda ➕ bukan dari modul.
// Semua keluaran di simulator diperiksa dengan PHP 8.3 sungguhan (pesan galat dipersingkat: nama file dan baris).
const { fix } = require("./pwd_uas_util.js");

const URLS = ["http://localhost/welcome.php", "http://localhost/crud-mahasiswa/welcome.php", "http://localhost/htdocs/crud-mahasiswa/welcome.php", "file:///C:/xampp/htdocs/crud-mahasiswa/welcome.php"];
const OPS = ["==", "===", "!=", ">=", "&&", "||", "!", "."];

module.exports = fix({
  id: "p10",
  nomor: 10,
  judul: "Pengenalan PHP",
  ujian: "UAS",
  hero: {
    badge: "Materi 10 • Pemrograman Web Dinamis",
    title: "PHP: Kode yang Dijalankan di Server",
    text: "Pasang <strong>XAMPP</strong> (Apache, MySQL, PHP), simpan file di <strong>htdocs</strong>, buka lewat <code>http://localhost/…</code>. Lalu sintaks dasar PHP: tag <code>&lt;?php ?&gt;</code>, <strong>variabel</strong> <code>$</code>, <strong>echo</strong>, <strong>if-else</strong>, operator, dan PHP di dalam HTML."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • XAMPP",
      title: "Isi Paket XAMPP",
      headers: ["Huruf", "Komponen", "Tugasnya"],
      rows: [
        ["X", "Cross-platform", "Tersedia untuk Windows, macOS, Linux"],
        ["A", "Apache", "Server web: menerima request dari browser dan mengirim halaman"],
        ["M", "MySQL (MariaDB)", "Server database, porta bawaan 3306"],
        ["P", "PHP", "Bahasa sisi server yang dijalankan Apache"],
        ["P", "Perl", "Bahasa pemrograman lain (jarang dipakai di mata kuliah ini)"]
      ],
      modes: [
        { label: "Langkah modul", target: "none", title: "Instal sampai jalan", text: "Unduh dari apachefriends.org → instal (pilih Apache dan PHP) → buka <strong>XAMPP Control Panel</strong> → Start <strong>Apache</strong> (dan <strong>MySQL</strong> untuk database) → simpan proyek di <code>htdocs</code> → buka <code>http://localhost/nama_folder</code>." },
        { label: "Porta", target: "row", row: 1, title: "Apache 80, MySQL 3306", text: "Pastikan porta tidak dipakai aplikasi lain. Kalau Apache gagal Start, biasanya porta 80 sedang dipakai aplikasi lain (misalnya IIS atau aplikasi rapat daring)." },
        { label: "Uji instalasi", target: "row", row: 3, title: "phpinfo()", text: "Buat <code>test.php</code> di htdocs berisi <code>&lt;?php phpinfo(); ?&gt;</code>, lalu buka <code>http://localhost/test.php</code>. Muncul halaman informasi PHP = instalasi berhasil." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 2 • Lokasi File dan Alamat",
      title: "Folder htdocs = Akar localhost",
      headers: ["File disimpan di", "Dibuka dengan alamat"],
      rows: [
        ["`C:\\xampp\\htdocs\\test.php`", "`http://localhost/test.php`"],
        ["`C:\\xampp\\htdocs\\crud-mahasiswa\\welcome.php`", "`http://localhost/crud-mahasiswa/welcome.php`"],
        ["`C:\\xampp\\htdocs\\crud-mahasiswa\\` (folder)", "`http://localhost/crud-mahasiswa/` (daftar file atau index.php)"]
      ],
      modes: [
        { label: "Jangan klik dua kali", target: "none", title: "file:/// tidak menjalankan PHP", text: "Kalau file .php dibuka langsung dari folder (alamatnya <code>file:///C:/…</code>), Apache tidak ikut. Browser hanya menampilkan isi file mentah, jadi kode PHP terlihat atau halamannya kosong. Selalu buka lewat <code>http://localhost/…</code>." },
        { label: "htdocs tidak ditulis", target: "row", row: 1, title: "Kata htdocs tidak masuk alamat", text: "<code>htdocs</code> sudah menjadi akar <code>localhost</code>. Alamat <code>localhost/htdocs/…</code> menghasilkan 404 Not Found." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Sintaks Dasar",
      title: "PHP dalam Satu Tabel",
      headers: ["Unsur", "Aturan", "Contoh"],
      rows: [
        ["Tag PHP", "Kode ditulis di antara <code>&lt;?php</code> dan <code>?&gt;</code>, file berekstensi <code>.php</code>", "`<?php echo \"Halo, dunia!\"; ?>`"],
        ["Variabel", "Diawali <code>$</code>, tanpa menulis tipe data, peka huruf besar/kecil", "`$nama = \"Ahmad\"; $umur = 20; $aktif = true;`"],
        ["echo", "Menampilkan teks atau HTML ke halaman", "`echo \"Selamat datang, $nama!\";`"],
        ["Titik koma", "Setiap pernyataan diakhiri <code>;</code>", "`$x = 5;`"],
        ["if-else", "Menjalankan kode sesuai kondisi; <code>elseif</code> untuk kondisi berikutnya", "`if ($umur >= 17) { echo \"Dewasa\"; } else { echo \"Anak-anak\"; }`"],
        ["PHP di HTML", "Sisipkan di mana saja di file .php", "`<h1><?php echo \"Judul Dinamis\"; ?></h1>`"]
      ],
      modes: [
        { label: "Kutip ganda vs tunggal", target: "row", row: 2, title: "Variabel hanya dibaca di kutip ganda", text: "<code>echo \"Halo, $nama\";</code> → <code>Halo, Ahmad</code>. <code>echo 'Halo, $nama';</code> → <code>Halo, $nama</code> (apa adanya). Saran modul: pakai kutip ganda untuk string yang mengandung variabel." },
        { label: "Sambung teks", target: "row", row: 2, title: "Titik, bukan plus", text: "PHP menyambung string dengan <code>.</code>: <code>\"Nama: \" . $nama</code>. Tanda <code>+</code> hanya untuk angka; <code>\"Nama: \" + $nama</code> menghasilkan TypeError." },
        { label: "Nama variabel", target: "row", row: 1, title: "Saran modul", text: "Beri nama yang deskriptif, misalnya <code>$namaMahasiswa</code>, bukan <code>$x</code>. <code>$nama</code> dan <code>$Nama</code> adalah dua variabel berbeda." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Operator",
      title: "Perbandingan dan Logika",
      headers: ["Operator", "Arti", "Contoh → hasil"],
      rows: [
        ["`==`", "Nilainya sama (tipe boleh beda)", "`\"20\" == 20` → true"],
        ["`===`", "Nilai <strong>dan</strong> tipe sama", "`\"20\" === 20` → false"],
        ["`!=`", "Tidak sama", "`5 != 3` → true"],
        ["`>` `<` `>=` `<=`", "Lebih besar/kecil (atau sama dengan)", "`20 >= 17` → true"],
        ["`&&`", "DAN: keduanya harus true", "`$umur >= 17 && $aktif`"],
        ["`||`", "ATAU: salah satu true", "`$nilai < 0 || $nilai > 100`"],
        ["`!`", "BUKAN: membalik true/false", "`!$aktif`"]
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Zona Waktu",
      tone: "warning",
      heading: "Salam di welcome.php tidak sesuai jam?",
      html: "<code>date(\"H:i\")</code> memakai zona waktu dari <code>php.ini</code>, yang di banyak instalasi XAMPP diisi <code>Europe/Berlin</code> atau UTC. Tambahkan di baris awal: <code>date_default_timezone_set(\"Asia/Jakarta\");</code> (WIB), <code>\"Asia/Makassar\"</code> (WITA), atau <code>\"Asia/Jayapura\"</code> (WIT)."
    }
  ],
  simulator: [
    {
      type: "penelusur",
      label: "Penelusur Langkah",
      title: "Apa yang Terjadi Saat welcome.php Dibuka",
      desc: "Tekan <strong>Berikutnya</strong>. Perhatikan bahwa kode PHP tidak pernah sampai ke browser; yang dikirim hanya hasilnya.",
      nodes: [{ t: "Browser", s: "client" }, { t: "Apache + PHP", s: "localhost (XAMPP)" }],
      steps: [
        { on: 0, label: "Address bar", msg: "http://localhost/crud-mahasiswa/welcome.php", hl: [0], say: "Alamat diketik. <strong>localhost</strong> = komputer sendiri, tempat XAMPP berjalan." },
        { dot: "req", label: "Request", msg: "GET /crud-mahasiswa/welcome.php HTTP/1.1\nHost: localhost", say: "Browser mengirim <strong>request</strong> ke Apache, sama seperti meminta halaman HTML biasa (P1)." },
        { on: 1, dot: "req", label: "Apache mencari file", msg: "C:\\xampp\\htdocs\\crud-mahasiswa\\welcome.php   ← ditemukan", hl: [0], say: "Apache mencari file di folder <code>htdocs</code>. Karena akhirannya <code>.php</code>, file diserahkan ke PHP dulu, tidak langsung dikirim." },
        { on: 1, label: "PHP menjalankan kode", msg: "$nama = \"Pengunjung\";\n$waktu = date(\"H:i\");      // \"09:15\"\nif ($waktu < \"12:00\") {\n    $salam = \"Selamat Pagi\";\n}\necho \"<p>$salam, $nama! Waktu sekarang: $waktu</p>\";", hl: [5], say: "PHP menjalankan kode dari atas ke bawah. Setiap <code>echo</code> menambah teks ke halaman yang sedang disusun." },
        { dot: "res", label: "Response (HTML saja)", msg: "HTTP/1.1 200 OK\nContent-Type: text/html\n\n<h2>Selamat Datang</h2>\n<p>Selamat Pagi, Pengunjung! Waktu sekarang: 09:15</p>", hl: [4], say: "Yang dikirim ke browser hanya <strong>hasil</strong> PHP berupa HTML. Kode <code>&lt;?php … ?&gt;</code> tidak ikut terkirim." },
        { on: 0, label: "View Page Source di browser", msg: "<h2>Selamat Datang</h2>\n<p>Selamat Pagi, Pengunjung! Waktu sekarang: 09:15</p>", hl: [1], say: "Klik kanan → View Page Source: tidak ada kode PHP. Buka lagi sore hari, salamnya berubah: itulah <strong>konten dinamis</strong>." }
      ]
    },
    {
      type: "terminal",
      label: "Permainan 1 • Jalankan Potongan PHP",
      title: "Apa yang Tampil di Browser?",
      desc: "Setiap skenario dimulai dengan <code>$nama = \"Ahmad\";</code> kecuali disebutkan lain. Keluaran diambil dari PHP 8.3.",
      shell: "php",
      header: "Keluaran PHP",
      scenarios: [
        { label: "1. Kutip ganda", pill: "OK", ok: true, cmd: "echo \"Selamat datang, $nama!\";", res: "Selamat datang, Ahmad!", exp: "Di dalam kutip ganda, <code>$nama</code> diganti dengan isinya." },
        { label: "2. Kutip tunggal", pill: "Apa adanya", ok: false, cmd: "echo 'Selamat datang, $nama!';", res: "Selamat datang, $nama!", exp: "Kutip tunggal tidak membaca variabel. Pakai kutip ganda atau sambung dengan titik." },
        { label: "3. Sambung dengan titik", pill: "OK", ok: true, cmd: "echo \"Nama: \" . $nama;", res: "Nama: Ahmad", exp: "Operator <code>.</code> menyambung dua string." },
        { label: "4. Sambung dengan +", pill: "Fatal error", ok: false, cmd: "echo \"Nama: \" + $nama;", res: "Fatal error: Uncaught TypeError: Unsupported operand types: string + string", exp: "➕ Beda dengan JavaScript: di PHP, <code>+</code> hanya untuk angka." },
        { label: "5. Lupa titik koma", pill: "Parse error", ok: false, cmd: "$nama = \"Ahmad\"\necho $nama;", res: "Parse error: syntax error, unexpected token \"echo\" on line 2", exp: "Galat ditunjuk di baris <strong>berikutnya</strong>, karena PHP baru sadar ada yang salah saat bertemu <code>echo</code>. Periksa baris di atasnya." },
        { label: "6. Huruf besar beda", pill: "Warning", ok: false, cmd: "echo $Nama;", res: "Warning: Undefined variable $Nama", exp: "Variabel peka huruf besar/kecil: <code>$Nama</code> ≠ <code>$nama</code>." },
        { label: "7. if-elseif-else", pill: "OK", ok: true, cmd: "$nilai = 75;\nif ($nilai >= 80) { echo \"A\"; }\nelseif ($nilai >= 70) { echo \"B\"; }\nelse { echo \"C\"; }", res: "B", exp: "Kondisi dicek dari atas. Yang pertama bernilai true dijalankan, sisanya dilewati." },
        { label: "8. == vs ===", pill: "OK", ok: true, cmd: "var_dump(\"20\" == 20);\nvar_dump(\"20\" === 20);", res: "bool(true)\nbool(false)", exp: "<code>==</code> hanya membandingkan nilai. <code>===</code> juga membandingkan tipe (string vs integer)." },
        { label: "9. echo boolean", pill: "Kejutan", ok: false, cmd: "echo true;\necho \"|\";\necho false;", res: "1|", exp: "➕ <code>true</code> dicetak sebagai <code>1</code>, <code>false</code> sebagai teks kosong. Pakai <code>var_dump()</code> untuk melihat nilai boolean." },
        { label: "10. Bandingkan jam sebagai teks", pill: "Kejutan", ok: false, cmd: "var_dump(\"09:30\" < \"12:00\");\nvar_dump(\"9:30\" < \"12:00\");", res: "bool(true)\nbool(false)", exp: "➕ Teks dibandingkan huruf demi huruf: <code>\"9\"</code> lebih besar dari <code>\"1\"</code>. Aktivitas modul aman karena <code>date(\"H:i\")</code> selalu dua digit (<code>09:30</code>). Dengan format <code>G</code> (tanpa nol) hasilnya salah." },
        { label: "11. PHP di dalam HTML", pill: "OK", ok: true, cmd: "<h1><?php echo \"Judul Dinamis\"; ?></h1>", res: "<h1>Judul Dinamis</h1>", exp: "Browser hanya menerima HTML hasilnya." }
      ]
    },
    {
      type: "terminal",
      label: "Permainan 2 • Coba Tugas user-data.php",
      title: "Isi Form, Lihat Hasilnya",
      desc: "Kode dari contoh tugas modul: <code>if ($_SERVER[\"REQUEST_METHOD\"] == \"POST\")</code> lalu <code>!empty($nama) && !empty($email)</code>. Pilih apa yang dilakukan pengguna.",
      shell: "→",
      header: "Bagian .output di user-data.php",
      scenarios: [
        { label: "1. Halaman baru dibuka", pill: "GET", ok: true, cmd: "Membuka http://localhost/crud-mahasiswa/user-data.php", res: "Belum ada data yang dikirim.", exp: "Membuka alamat = request <strong>GET</strong>, jadi cabang <code>else</code> paling luar yang jalan." },
        { label: "2. Isi lengkap", pill: "POST", ok: true, cmd: "Nama: Ahmad | Email: ahmad@kampus.ac.id → Kirim", res: "Data Pengguna:\nNama: Ahmad\nEmail: ahmad@kampus.ac.id", exp: "Form <code>method=\"POST\"</code> dan <code>action=\"\"</code> mengirim data ke halaman yang sama. Isinya dibaca dari <code>$_POST[\"nama\"]</code> dan <code>$_POST[\"email\"]</code>." },
        { label: "3. Nama dikosongkan", pill: "POST", ok: false, cmd: "Nama: (kosong) | Email: ahmad@kampus.ac.id → Kirim", res: "Harap isi semua field!", exp: "<code>empty(\"\")</code> bernilai true, jadi syarat <code>!empty($nama)</code> gagal." },
        { label: "4. Nama diisi 0", pill: "Kejutan", ok: false, cmd: "Nama: 0 | Email: ahmad@kampus.ac.id → Kirim", res: "Harap isi semua field!", exp: "➕ <code>empty(\"0\")</code> juga true. Kalau angka 0 memang boleh, cek dengan <code>trim($nama) !== \"\"</code>." },
        { label: "5. Nama berisi tag", pill: "Bahaya", ok: false, cmd: "Nama: <b>Ahmad</b> | Email: a@b.c → Kirim", res: "Data Pengguna:\nNama: Ahmad   ← tampil TEBAL\nEmail: a@b.c", exp: "➕ Tag dari pengguna ikut dijalankan browser (XSS, sama seperti innerHTML di P7). Di P11 diperbaiki dengan <code>htmlspecialchars()</code>." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Alamat yang Benar",
      title: "File di htdocs → Alamat di Browser",
      headers: ["Situasi", "Alamat"],
      rows: [
        { cells: ["File <code>welcome.php</code> ada di <code>C:\\xampp\\htdocs\\crud-mahasiswa\\</code>, Apache sudah Start"], fields: [{ options: URLS, answer: "http://localhost/crud-mahasiswa/welcome.php" }], ok: "✓ htdocs tidak ditulis di alamat" },
        { cells: ["File <code>welcome.php</code> langsung di <code>C:\\xampp\\htdocs\\</code>"], fields: [{ options: URLS, answer: "http://localhost/welcome.php" }], ok: "✓" },
        { cells: ["Alamat yang membuat kode PHP <strong>tidak</strong> dijalankan (tampil mentah/kosong)"], fields: [{ options: URLS, answer: "file:///C:/xampp/htdocs/crud-mahasiswa/welcome.php" }], ok: "✓ dibuka tanpa Apache" },
        { cells: ["Alamat yang menghasilkan 404 Not Found"], fields: [{ options: URLS, answer: "http://localhost/htdocs/crud-mahasiswa/welcome.php" }], ok: "✓ tidak ada folder htdocs di dalam htdocs" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 4 • Pilih Operator",
      title: "Lengkapi Kondisinya",
      headers: ["Kebutuhan", "Operator"],
      rows: [
        { cells: ["<code>\"20\" ? 20</code> harus true (nilai sama, tipe boleh beda)"], fields: [{ options: OPS, answer: "==" }], ok: "✓" },
        { cells: ["Nilai dan tipe harus sama persis"], fields: [{ options: OPS, answer: "===" }], ok: "✓" },
        { cells: ["Umur 17 ke atas dianggap dewasa: <code>$umur ? 17</code>"], fields: [{ options: OPS, answer: ">=" }], ok: "✓" },
        { cells: ["Nama DAN email harus terisi"], fields: [{ options: OPS, answer: "&&" }], ok: "✓" },
        { cells: ["Ditolak jika nilai < 0 ATAU nilai > 100"], fields: [{ options: OPS, answer: "||" }], ok: "✓" },
        { cells: ["Menyambung <code>\"Halo, \"</code> dengan <code>$nama</code>"], fields: [{ options: OPS, answer: "." }], ok: "✓" },
        { cells: ["Membalik hasil <code>empty($nama)</code>"], fields: [{ options: OPS, answer: "!" }], ok: "✓ <code>!empty($nama)</code>" }
      ]
    },
    {
      type: "reveal",
      label: "Tebak Hasil • welcome.php",
      title: "Salam Apa yang Muncul?",
      desc: "Kode modul: <code>if ($waktu &lt; \"12:00\") \"Selamat Pagi\" elseif ($waktu &lt; \"18:00\") \"Selamat Siang\" else \"Selamat Malam\"</code>, dengan <code>$waktu = date(\"H:i\")</code>.",
      items: [
        { prompt: "Jam `07:45`", answer: "Selamat Pagi", reason: "\"07:45\" &lt; \"12:00\"." },
        { prompt: "Jam `12:00` tepat", answer: "Selamat Siang", reason: "\"12:00\" &lt; \"12:00\" false, lalu \"12:00\" &lt; \"18:00\" true." },
        { prompt: "Jam `17:59`", answer: "Selamat Siang", reason: "Masih di bawah 18:00." },
        { prompt: "Jam `21:30`", answer: "Selamat Malam", reason: "Kedua kondisi false, masuk else." },
        { prompt: "Laptop jam 19:00 WITA, tetapi PHP memakai zona UTC ➕", answer: "Selamat Pagi (PHP mengira jam 11:00)", reason: "WITA = UTC+8, jadi 19:00 WITA = 11:00 UTC, dan \"11:00\" &lt; \"12:00\". Atur <code>date_default_timezone_set(\"Asia/Makassar\")</code>." },
        { prompt: "`echo \"Halo, $jurusan\";` setelah `$jurusan = \"Sistem Informasi\";`", answer: "Halo, Sistem Informasi", reason: "Ini modifikasi pertama di aktivitas modul." },
        { prompt: "`echo date(\"D\");` pada hari Kamis", answer: "Thu", reason: "Format D = singkatan hari tiga huruf dalam bahasa Inggris (Mon, Tue, Wed, Thu, Fri, Sat, Sun). Ini bahan modifikasi kedua di aktivitas." }
      ]
    }
  ],
  flashcards: [
    { tag: "XAMPP", q: "Apa itu XAMPP?", a: "Perangkat lunak open-source yang menyediakan server lokal: Apache, MySQL (MariaDB), PHP, dan Perl, untuk pengembangan web." },
    { tag: "XAMPP", q: "Modul apa yang di-Start di XAMPP Control Panel?", a: "Apache untuk server web; MySQL untuk database." },
    { tag: "XAMPP", q: "Di mana file proyek PHP disimpan?", a: "Di folder `htdocs` (Windows: `C:\\xampp\\htdocs`), sebaiknya di subfolder, misalnya `htdocs/crud-mahasiswa`." },
    { tag: "XAMPP", q: "Porta bawaan Apache dan MySQL?", a: "Apache 80, MySQL 3306. Pastikan tidak dipakai aplikasi lain." },
    { tag: "XAMPP", q: "Cara menguji instalasi PHP?", a: "Buat `test.php` berisi `<?php phpinfo(); ?>` di htdocs, buka `http://localhost/test.php`." },
    { tag: "Sintaks", q: "Bagaimana kode PHP ditulis?", a: "Di antara `<?php` dan `?>`, dalam file berekstensi `.php`, setiap pernyataan diakhiri `;`." },
    { tag: "Variabel", q: "Ciri variabel PHP?", a: "Diawali `$`, tanpa tipe data eksplisit, peka huruf besar/kecil. Contoh `$nama = \"Ahmad\";`" },
    { tag: "echo", q: "Fungsi echo?", a: "Menampilkan output (teks atau HTML) ke halaman web." },
    { tag: "String", q: "Beda kutip ganda dan tunggal di PHP?", a: "Kutip ganda membaca variabel di dalamnya (`\"Halo, $nama\"` → Halo, Ahmad). Kutip tunggal menampilkan apa adanya." },
    { tag: "String", q: "Operator penyambung string di PHP?", a: "Titik `.`: `\"Nama: \" . $nama`. Bukan `+`." },
    { tag: "Operator", q: "Beda == dan ===?", a: "`==` membandingkan nilai; `===` membandingkan nilai dan tipe. `\"20\" == 20` true, `\"20\" === 20` false." },
    { tag: "Kondisi", q: "Bentuk if bertingkat di PHP?", a: "`if (…) { } elseif (…) { } else { }`" },
    { tag: "Konsep", q: "Kenapa PHP disebut bahasa sisi server?", a: "Kodenya dijalankan di server (Apache + PHP); browser hanya menerima hasilnya berupa HTML." },
    { tag: "Form", q: "Cara membaca isian form POST di PHP?", a: "`$_POST[\"nama\"]`. Cek dulu apakah form dikirim: `$_SERVER[\"REQUEST_METHOD\"] == \"POST\"`." },
    { tag: "➕ Jebakan", q: "Kenapa kode PHP tampil mentah di browser?", a: "File dibuka langsung (`file:///…`) atau Apache belum Start. Buka lewat `http://localhost/…`." }
  ],
  quiz: [
    { q: "XAMPP adalah …",
      opts: ["Bahasa pemrograman sisi klien", "Perangkat lunak yang menyediakan server lokal (Apache, MySQL, PHP, Perl)", "Editor kode", "Browser khusus PHP"], ans: 1,
      exp: "XAMPP = paket server lokal untuk pengembangan web.",
      optExp: ["Bukan bahasa.", "Benar.", "Editornya misalnya VS Code.", "PHP tetap dibuka di browser biasa."] },
    { q: "Agar file PHP bisa diakses di `http://localhost/...`, file harus disimpan di folder …",
      opts: ["Documents", "htdocs", "xampp/php", "Desktop"], ans: 1,
      exp: "htdocs adalah akar localhost pada XAMPP.",
      optExp: ["Tidak dilayani Apache.", "Benar.", "Itu folder program PHP.", "Tidak dilayani Apache."] },
    { q: "File `welcome.php` disimpan di `C:\\xampp\\htdocs\\crud-mahasiswa`. Alamat yang benar adalah …",
      opts: ["`http://localhost/htdocs/crud-mahasiswa/welcome.php`", "`http://localhost/crud-mahasiswa/welcome.php`", "`file:///C:/xampp/htdocs/crud-mahasiswa/welcome.php`", "`http://crud-mahasiswa/welcome.php`"], ans: 1,
      exp: "Nama folder htdocs tidak ditulis.",
      optExp: ["404 karena htdocs ditulis.", "Benar.", "Dibuka tanpa Apache, PHP tidak jalan.", "Tidak ada server bernama itu."] },
    { q: "Porta bawaan Apache dan MySQL pada XAMPP adalah …",
      opts: ["80 dan 3306", "8080 dan 5432", "443 dan 1433", "3306 dan 80"], ans: 0,
      exp: "Apache 80, MySQL 3306.",
      optExp: ["Benar.", "5432 milik PostgreSQL.", "1433 milik SQL Server.", "Terbalik."] },
    { q: "Fungsi PHP untuk menampilkan informasi konfigurasi PHP (uji instalasi) adalah …",
      opts: ["`echo()`", "`phpinfo()`", "`print_r()`", "`var_dump()`"], ans: 1,
      exp: "Isi test.php: &lt;?php phpinfo(); ?&gt;",
      optExp: ["Menampilkan teks.", "Benar.", "Menampilkan isi array.", "Menampilkan tipe dan nilai."] },
    { q: "Penulisan variabel PHP yang benar adalah …",
      opts: ["`var nama = \"Ahmad\";`", "`$nama = \"Ahmad\";`", "`string nama = \"Ahmad\";`", "`nama := \"Ahmad\";`"], ans: 1,
      exp: "Diawali $, tanpa tipe data.",
      optExp: ["Gaya JavaScript.", "Benar.", "Gaya C++/Java.", "Bukan sintaks PHP."] },
    { q: "Jika `$nama = \"Ahmad\";`, keluaran `echo 'Halo, $nama';` adalah …",
      opts: ["Halo, Ahmad", "Halo, $nama", "Halo,", "Error"], ans: 1,
      exp: "Kutip tunggal tidak membaca variabel.",
      optExp: ["Itu dengan kutip ganda.", "Benar.", "Variabel tidak dikosongkan.", "Tidak error."] },
    { q: "Operator untuk menyambung string di PHP adalah …",
      opts: ["`+`", "`.`", "`&`", "`,`"], ans: 1,
      exp: "\"Nama: \" . $nama",
      optExp: ["+ untuk angka; pada string menghasilkan TypeError.", "Benar.", "Bukan penyambung string.", "Koma hanya memisah argumen echo."] },
    { q: "Hasil `\"20\" === 20` adalah …",
      opts: ["true", "false", "20", "Error"], ans: 1,
      exp: "=== juga membandingkan tipe: string vs integer.",
      optExp: ["Itu hasil ==.", "Benar.", "Hasil perbandingan selalu boolean.", "Tidak error."] },
    { q: "Pada `if ($nilai >= 80) {…} elseif ($nilai >= 70) {…} else {…}` dengan `$nilai = 80`, blok yang dijalankan adalah …",
      opts: ["Blok if", "Blok elseif", "Blok else", "Blok if dan elseif"], ans: 0,
      exp: "80 >= 80 true; sisanya dilewati.",
      optExp: ["Benar.", "Tidak dicek lagi.", "Tidak dicek lagi.", "Hanya satu blok yang dijalankan."] },
    { q: "Membuka file PHP lewat alamat `file:///C:/xampp/htdocs/test.php` menyebabkan …",
      opts: ["Halaman tampil normal", "Kode PHP tidak dijalankan karena tidak melewati Apache", "MySQL berhenti", "File terhapus"], ans: 1,
      exp: "PHP hanya jalan bila diminta lewat server (http://localhost).",
      optExp: ["PHP tidak diproses.", "Benar.", "Tidak terkait.", "Tidak terkait."] },
    { q: "Pada tugas modul, `$_SERVER[\"REQUEST_METHOD\"] == \"POST\"` dipakai untuk …",
      opts: ["Mengecek apakah form sudah dikirim", "Mengirim form ke server", "Menyimpan data ke database", "Mengecek format email"], ans: 0,
      exp: "Saat halaman pertama dibuka metodenya GET; setelah form dikirim, POST.",
      optExp: ["Benar.", "Yang mengirim adalah browser.", "Belum menyimpan apa pun.", "Tidak mengecek format."] },
    { q: "Keunggulan PHP dibanding HTML statis adalah …",
      opts: ["Halaman bisa berubah sesuai kondisi (konten dinamis)", "Tidak butuh server", "Bisa dibuka tanpa browser", "Lebih ringan daripada HTML"], ans: 0,
      exp: "Contoh welcome.php: salam berubah sesuai jam.",
      optExp: ["Benar.", "Justru butuh server.", "Tetap dibuka di browser.", "Tidak selalu."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 10*
📚 *Pengenalan PHP*

1️⃣ *XAMPP:* server lokal (Apache, MySQL, PHP, Perl). Start Apache (+ MySQL) di Control Panel. Porta Apache 80, MySQL 3306. Uji: test.php berisi phpinfo().

2️⃣ *Lokasi:* file di htdocs (C:\\xampp\\htdocs\\crud-mahasiswa\\welcome.php) → buka http://localhost/crud-mahasiswa/welcome.php. Jangan buka lewat file:///.

3️⃣ *Sintaks:* <?php ... ?>, file .php, pernyataan diakhiri ; , variabel $nama (tanpa tipe, peka huruf besar/kecil), echo untuk menampilkan.

4️⃣ *String:* kutip ganda membaca variabel ("Halo, $nama"); kutip tunggal apa adanya; sambung dengan titik (.).

5️⃣ *Kondisi:* if / elseif / else. Operator ==, ===, !=, >, <, >=, <=, &&, ||, !.

6️⃣ *Konsep:* PHP dijalankan di server; browser hanya menerima HTML hasilnya → konten dinamis.`
});
