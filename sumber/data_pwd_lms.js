// Pemrograman Web Dinamis — salinan soal kuis LMS per pertemuan (pilihan ganda 5 opsi).
// Bank LMS lebih besar dan setiap percobaan mengambil 30 soal acak; yang tercatat di sini adalah soal yang sudah muncul.
// Kunci = kunci yang dinilai benar oleh LMS. Dipakai di kuis pertemuannya dan di bank UTS P8 (UTS = kompilasi kuis P1–P7).
// Tuple: [soal, [5 opsi], indeks jawaban, pembahasan]
const P1 = [
  ["Atribut apa pada tag `<table>` yang digunakan untuk menentukan lebar tabel?", ["size", "border", "colspan", "length", "width"], 4,
    "`width` mengatur lebar (mis. `width=\"100%\"`). `border` = tebal garis, `colspan` = gabung kolom. Di HTML modern lebar sebaiknya diatur lewat CSS `width`."],
  ["Manakah struktur yang benar untuk elemen daftar dalam daftar tak berurutan?", ["`<ul>Item</ul>`", "`<ul><li>Item</li></ul>`", "`<li><li>Item</li></li>`", "`<li><ul>Item</ul></li>`", "`<ul><ul>Item</ul></ul>`"], 1,
    "Setiap butir daftar dibungkus `<li>`, dan semua `<li>` berada di dalam `<ul>` (tak berurutan) atau `<ol>` (berurutan)."],
  ["Tag HTML mana yang digunakan untuk menyisipkan gambar ke dalam halaman web?", ["`<src>`", "`<image>`", "`<picture>`", "`<img>`", "`<photo>`"], 3,
    "`<img src=\"...\" alt=\"...\">`. `src` itu atribut, bukan tag. `<picture>` memang ada, tetapi hanya pembungkus yang tetap berisi `<img>`."],
  ["Tag HTML mana yang digunakan untuk menandai bagian navigasi pada halaman web?", ["`<footer>`", "`<menu>`", "`<sidebar>`", "`<nav>`", "`<header>`"], 3,
    "`<nav>` membungkus kumpulan tautan navigasi. `<sidebar>` tidak ada di HTML; sisi samping memakai `<aside>`."],
  ["Manakah tipe input yang digunakan untuk memungkinkan pengguna memilih file dari perangkat mereka?", ["type=\"attachment\"", "type=\"upload\"", "type=\"file\"", "type=\"document\"", "type=\"data\""], 2,
    "`<input type=\"file\">` membuka jendela pilih file. Jenis file bisa dibatasi dengan `accept`, misalnya `accept=\".pdf\"`."],
  ["Manakah struktur yang benar untuk membuat tabel sederhana dengan satu baris dan dua kolom?", ["`<table><tr><td>Sel 1</td><td>Sel 2</td></tr></table>`", "`<table><td>Sel 1</td><td>Sel 2</td></table>`", "`<table><td><tr>Sel 1</tr><tr>Sel 2</tr></td></table>`", "`<tr><table><td>Sel 1</td><td>Sel 2</td></table></tr>`", "`<table><tr>Sel 1<tr>Sel 2</tr></tr></table>`"], 0,
    "Urutannya selalu `<table>` → `<tr>` (baris) → `<td>` (sel). Satu baris dua kolom = satu `<tr>` berisi dua `<td>`."],
  ["Atribut apa pada tag `<td>` atau `<th>` yang digunakan untuk menggabungkan beberapa kolom?", ["rowspan", "merge", "span", "combine", "colspan"], 4,
    "`colspan` menggabungkan sel ke samping (kolom). `rowspan` menggabungkan ke bawah (baris)."],
  ["Apa fungsi atribut id pada elemen HTML?", ["Menyisipkan gambar", "Membuat elemen menjadi semantik", "Mengatur warna teks", "Memberikan pengenal unik untuk elemen", "Menentukan alamat tautan"], 3,
    "Nilai `id` hanya boleh dipakai satu kali per halaman. Dipakai CSS (`#id`), `<label for>`, dan JavaScript (`getElementById`)."],
  ["Tag `<input>` dengan tipe apa yang digunakan untuk menyembunyikan data dari pengguna tetapi tetap dikirim saat form disubmit?", ["type=\"invisible\"", "type=\"hidden\"", "type=\"password\"", "type=\"private\"", "type=\"secret\""], 1,
    "`type=\"hidden\"` tidak tampil tetapi nilainya ikut terkirim (mis. id data yang sedang diedit). `password` tetap tampil sebagai kotak, hanya isinya disamarkan."],
  ["Dalam konsep client-server, apa yang dilakukan server saat menerima permintaan HTTP?", ["Mengelola input pengguna di browser", "Mengirim respons berupa data atau file ke client", "Mengatur tata letak halaman web", "Menyimpan kode JavaScript untuk validasi", "Menampilkan halaman web di browser"], 1,
    "Client (browser) mengirim request, server memproses lalu mengirim response. Menampilkan halaman dan mengelola input di browser adalah tugas client."],
  ["Manakah struktur yang benar untuk membuat form dengan input teks dan tombol kirim?", ["`<form><input type=\"form\"><button>`", "`<form><text><submit></form>`", "`<input type=\"text\"><input type=\"submit\"><form>`", "`<input type=\"text\"><form><submit>`", "`<form><input type=\"text\"><input type=\"submit\"></form>`"], 4,
    "Semua input harus berada di antara `<form>` dan `</form>`. `<text>` dan `<submit>` bukan tag HTML; keduanya adalah nilai atribut `type` pada `<input>`."],
  ["Tag HTML mana yang digunakan untuk membuat baris baru tanpa memulai paragraf baru?", ["`<p>`", "`<line>`", "`<hr>`", "`<break>`", "`<br>`"], 4,
    "`<br>` = line break, tanpa tag penutup. `<hr>` membuat garis horizontal, `<p>` memulai paragraf baru."],
  ["Manakah pernyataan yang benar tentang atribut disabled pada tag `<input>`?", ["Membatasi input hanya untuk angka", "Membuat input wajib diisi", "Menyembunyikan input dari halaman", "Menonaktifkan input sehingga tidak dapat diedit", "Mengatur nilai default input"], 3,
    "`disabled` membuat input abu-abu, tidak bisa diedit, dan nilainya tidak ikut terkirim. Wajib diisi = `required`, nilai default = `value`."],
  ["Manakah elemen HTML yang bersifat inline secara default?", ["`<div>`", "`<span>`", "`<section>`", "`<h1>`", "`<p>`"], 1,
    "`<span>` inline: hanya selebar isinya dan tidak memulai baris baru. `<div>`, `<section>`, `<h1>`, `<p>` adalah block."],
  ["Apa fungsi atribut readonly pada tag `<input>`?", ["Mengatur tipe input", "Menyembunyikan input dari pengguna", "Membuat input wajib diisi", "Menonaktifkan input sepenuhnya", "Membuat input tidak dapat diedit tetapi tetap dikirim"], 4,
    "Bedakan: `readonly` tidak bisa diedit tetapi nilainya tetap terkirim; `disabled` tidak bisa diedit dan tidak terkirim (itulah \"menonaktifkan sepenuhnya\")."],
  ["Manakah tipe input yang digunakan untuk memungkinkan pengguna memasukkan tanggal?", ["type=\"datetime\"", "type=\"date\"", "type=\"calendar\"", "type=\"day\"", "type=\"time\""], 1,
    "`date` = tanggal, `time` = jam. `datetime` sudah tidak dipakai; gabungan tanggal + jam memakai `datetime-local`."],
  ["Atribut HTML digunakan untuk apa?", ["Menentukan struktur utama dokumen", "Memberikan informasi tambahan atau pengaturan untuk tag", "Membuat interaktivitas di halaman web", "Menambahkan gaya visual pada elemen", "Menyimpan data ke database"], 1,
    "Atribut ditulis di tag pembuka, bentuknya `nama=\"nilai\"`, misalnya `href`, `src`, `alt`, `id`. Gaya visual tugas CSS, interaktivitas tugas JavaScript."],
  ["Manakah pernyataan yang benar tentang tag `<th>` dibandingkan dengan `<td>`?", ["Tag `<th>` tidak dapat memiliki atribut, sedangkan `<td>` bisa", "Tag `<th>` digunakan untuk header, sedangkan `<td>` untuk data biasa", "Tag `<th>` hanya digunakan di `<tbody>`, sedangkan `<td>` di `<thead>`", "Tag `<th>` bersifat inline, sedangkan `<td>` bersifat block", "Tag `<th>` dan `<td>` memiliki fungsi yang sama"], 1,
    "`<th>` = sel judul (default tebal dan rata tengah), `<td>` = sel data. Keduanya bisa memakai atribut seperti `colspan`."],
  ["Tag HTML mana yang digunakan untuk membuat paragraf teks?", ["`<p>`", "`<span>`", "`<para>`", "`<text>`", "`<div>`"], 0,
    "`<p>` = paragraph. `<span>` dan `<div>` adalah pembungkus umum tanpa makna paragraf, `<para>` dan `<text>` bukan tag HTML."],
  ["Tag `<input>` dengan tipe apa yang digunakan untuk memungkinkan pengguna memilih beberapa opsi sekaligus?", ["type=\"select\"", "type=\"multiple\"", "type=\"choice\"", "type=\"radio\"", "type=\"checkbox\""], 4,
    "`checkbox` boleh dicentang lebih dari satu. `radio` hanya satu pilihan dalam satu grup `name`. `select` adalah tag `<select>`, bukan tipe input."],
  ["Tag HTML mana yang digunakan bersama `<input>` untuk memberikan label deskriptif pada input?", ["`<span>`", "`<title>`", "`<legend>`", "`<label>`", "`<caption>`"], 3,
    "`<label for=\"id-input\">`. `<legend>` = judul `<fieldset>`, `<caption>` = judul tabel, `<title>` = judul tab browser."],
  ["Atribut apa pada tag `<p>` yang dapat digunakan untuk memberikan pengenal unik?", ["class", "title", "label", "name", "id"], 4,
    "`id` unik dalam satu halaman. `class` boleh dipakai banyak elemen sekaligus, jadi bukan pengenal unik."],
  ["Manakah contoh penggunaan atribut yang benar pada tag HTML?", ["`<p src=\"teks.html\">`", "`<a src=\"link.html\">`", "`<div href=\"halaman.html\">`", "`<h1 alt=\"Judul Utama\">`", "`<img src=\"gambar.jpg\" alt=\"Deskripsi Gambar\">`"], 4,
    "Setiap atribut punya tag pasangannya: `<img>` memakai `src` dan `alt`, `<a>` memakai `href` (bukan `src`)."],
  ["Manakah tipe input yang digunakan untuk memungkinkan pengguna memasukkan waktu?", ["type=\"hour\"", "type=\"time\"", "type=\"clock\"", "type=\"datetime\"", "type=\"schedule\""], 1,
    "`time` = jam dan menit. Pasangannya `date` untuk tanggal."],
  ["Tag HTML mana yang digunakan untuk membuat formulir yang berisi elemen input?", ["`<data>`", "`<input>`", "`<field>`", "`<form>`", "`<submit>`"], 3,
    "`<form>` adalah wadah formulir (dengan `action` dan `method`). `<input>` hanya satu kolom isian di dalamnya."],
  ["Apa fungsi atribut placeholder pada tag `<input>`?", ["Menentukan nilai default input", "Menentukan jenis input", "Menampilkan teks petunjuk sementara di dalam input", "Membuat input wajib diisi", "Menghubungkan input dengan label"], 2,
    "Teks `placeholder` hilang saat pengguna mengetik dan tidak ikut terkirim. Nilai default yang terkirim memakai `value`."],
  ["Manakah tag HTML yang digunakan untuk membuat tabel?", ["`<th>`", "`<td>`", "`<grid>`", "`<table>`", "`<tr>`"], 3,
    "`<table>` membungkus seluruh tabel. Di dalamnya `<tr>` (baris), `<th>` (sel judul), `<td>` (sel data)."],
  ["Tag HTML mana yang digunakan untuk membuat halaman web memiliki struktur semantik sebagai area header?", ["`<section>`", "`<div>`", "`<header>`", "`<h1>`", "`<head>`"], 2,
    "Jebakan: `<head>` berisi metadata (title, meta) dan tidak tampil. Area kepala halaman yang tampil (logo, judul, menu) memakai `<header>` di dalam `<body>`."],
  ["Tag HTML mana yang digunakan untuk mendefinisikan baris dalam tabel?", ["`<table>`", "`<th>`", "`<row>`", "`<td>`", "`<tr>`"], 4,
    "`<tr>` = table row. `<row>` bukan tag HTML."],
  ["Apa fungsi tag `<title>` dalam HTML?", ["Membuat heading utama di halaman", "Menampilkan judul di badan halaman", "Mengatur ukuran font teks", "Menyisipkan tautan ke halaman lain", "Menentukan judul dokumen yang muncul di tab browser"], 4,
    "`<title>` ada di `<head>` dan tampil di tab browser (serta hasil pencarian), bukan di isi halaman. Judul di halaman memakai `<h1>`."]
];

// Kuis LMS P5 (CSS: selector, prioritas, box model, Flexbox, Grid, media query, unit). Kuis ini 40 soal dan tidak bisa
// di-review di LMS, jadi yang tercatat hanya 30 soal dan kuncinya disusun sendiri (belum dikonfirmasi LMS).
// Nomor di komentar = nomor soal di LMS. Soal ambigu diberi catatan "Ambigu" di pembahasan.
const P5 = [
  // 1
  ["Manakah media query yang menargetkan perangkat dengan lebar layar maksimum 768px?", ["`@media screen and (max-height: 768px)`", "`@media screen and (max-width: 768px)`", "`@media screen and (min-width: 768px)`", "`@media screen and (width: 768px)`", "`@media screen and (min-height: 768px)`"], 1,
    "\"Maksimum 768px\" = 768px ke bawah = `max-width`. `min-width` kebalikannya (768px ke atas), `width: 768px` hanya cocok untuk lebar tepat 768px, dan `height` mengukur tinggi, bukan lebar."],
  // 2
  ["Properti CSS mana yang digunakan untuk mengatur ukuran dasar elemen flex?", ["flex-shrink", "flex-basis", "flex-size", "flex-grow", "flex-width"], 1,
    "`flex-basis` = ukuran awal item sebelum sisa ruang dibagi. `flex-grow` = ikut membesar saat ada sisa ruang, `flex-shrink` = boleh mengecil saat ruang kurang. `flex-size` dan `flex-width` tidak ada."],
  // 4
  ["Manakah properti CSS yang digunakan untuk mengatur jarak antar baris teks?", ["spacing", "text-spacing", "line-height", "font-height", "line-spacing"], 2,
    "`line-height`, misalnya `line-height: 1.5` (1,5 kali ukuran huruf). Jarak antarhuruf memakai `letter-spacing`, jarak antarkata `word-spacing`. Pilihan lain bukan properti CSS."],
  // 5
  ["Manakah selektor CSS yang menargetkan elemen `<p>` secara langsung?", ["*p", "#p", ".p", "[p]", "p"], 4,
    "Nama tag tanpa simbol = selektor elemen. `#p` mencari elemen ber-id \"p\", `.p` mencari class \"p\", `[p]` mencari elemen yang punya atribut bernama p."],
  // 8
  ["Manakah unit yang relatif terhadap ukuran font root (html)?", ["px", "vh", "vw", "em", "rem"], 4,
    "rem = root em, patokannya font-size elemen `<html>` (default 16px, jadi `2rem` = 32px). `em` patokannya font-size induk, `vw`/`vh` patokannya layar, `px` tidak punya patokan."],
  // 9
  ["Manakah pernyataan yang benar tentang prioritas CSS?", ["Internal CSS memiliki prioritas tertinggi", "Semua jenis CSS memiliki prioritas yang sama", "CSS di `<body>` memiliki prioritas tertinggi", "External CSS memiliki prioritas tertinggi", "Inline CSS memiliki prioritas tertinggi"], 4,
    "CSS di atribut `style` (inline) mengalahkan internal dan external. Internal vs external tidak punya pemenang tetap: yang ditulis/dimuat lebih akhir yang menang. Hanya `!important` yang bisa mengalahkan inline."],
  // 10
  ["Manakah unit relatif yang sering digunakan untuk font-size responsif?", ["pt", "rem", "px", "cm", "mm"], 1,
    "`rem` ikut berubah jika ukuran huruf dasar diubah (misalnya pengguna memperbesar font di pengaturan browser). `pt`, `px`, `cm`, `mm` adalah unit absolut yang ukurannya tetap."],
  // 11
  ["Properti CSS mana yang menentukan lebar total elemen dalam Box Model?", ["content-width", "element-width", "width", "box-width", "total-width"], 2,
    "Satu-satunya properti yang ada adalah `width`. Catatan: dengan box-sizing default (content-box) `width` hanya lebar konten, padding dan border ditambahkan di luarnya. Dengan `box-sizing: border-box`, `width` sudah termasuk padding dan border."],
  // 12
  ["Selektor CSS mana yang digunakan untuk menargetkan elemen berdasarkan atribut class?", ["class", "[class]", ".class", "#class", "*class"], 2,
    "Titik = class (`.kartu` memilih semua `class=\"kartu\"`). Pagar `#` = id. `[class]` memilih elemen yang punya atribut class apa pun isinya."],
  // 13
  ["Manakah contoh sintaks CSS internal yang benar?", ["`<style> p: color = blue; </style>`", "`<css> p: blue; </css>`", "`<css> p { color: blue; } </css>`", "`<style> p { style: blue; } </style>`", "`<style> p { color: blue; } </style>`"], 4,
    "Internal CSS ditulis di tag `<style>` dengan format `selektor { properti: nilai; }`. Tag `<css>` tidak ada, dan `style` bukan nama properti."],
  // 15
  ["Manakah contoh penyisipan CSS inline yang benar pada tag HTML?", ["`<p style:color=blue>Teks</p>`", "`<p css=\"color: blue;\">Teks</p>`", "`<p style=\"blue;\">Teks</p>`", "`<p style=\"color: blue;\">Teks</p>`", "`<p class=\"color: blue;\">Teks</p>`"], 3,
    "Inline = atribut `style=\"properti: nilai;\"` di tag pembuka. Atribut `css` tidak ada, nilai tanpa nama properti tidak berarti apa-apa, dan `class` berisi nama class, bukan CSS."],
  // 16
  ["Manakah sintaks yang benar untuk media query di CSS?", ["`@media max-width: 600px { ... }`", "`@media screen and (max-width: 600px) { ... }`", "`@media (width: 600px) { ... }`", "`@query screen (width: 600px) { ... }`", "`@screen (max-width: 600px) { ... }`"], 1,
    "Kondisi wajib di dalam kurung dan diawali `@media`. Opsi c sebenarnya sintaks yang sah, tetapi hanya berlaku untuk lebar tepat 600px, jadi bukan bentuk media query yang dimaksud soal. `@query` dan `@screen` tidak ada."],
  // 17
  ["Manakah pernyataan yang benar tentang Flexbox?", ["Flexbox dirancang untuk layout satu dimensi", "Flexbox tidak mendukung responsivitas", "Flexbox hanya digunakan untuk tabel", "Flexbox tidak dapat digunakan dengan Grid", "Flexbox digunakan untuk layout dua dimensi"], 0,
    "Flexbox menyusun item dalam satu arah: satu baris atau satu kolom. Baris dan kolom sekaligus (dua dimensi) adalah tugas Grid. Keduanya sering dipakai bersama."],
  // 18
  ["Manakah pernyataan yang benar tentang cascading dalam CSS?", ["Semua gaya memiliki prioritas yang sama", "Gaya di `<head>` selalu diabaikan", "Gaya inline memiliki prioritas terendah", "Gaya dengan selektor lebih spesifik memiliki prioritas lebih tinggi", "Gaya dengan selektor lebih umum memiliki prioritas lebih tinggi"], 3,
    "Kekuatan selektor dari lemah ke kuat: tag → class → id → inline. Jika kekuatannya sama, aturan yang ditulis paling akhir yang menang."],
  // 19
  ["Manakah properti CSS yang digunakan untuk membuat elemen flex menyusut saat ruang terbatas?", ["flex-size", "flex-grow", "flex-basis", "flex-shrink", "flex-stretch"], 3,
    "`flex-shrink` (default 1 = boleh menyusut; 0 = tidak boleh). `flex-grow` kebalikannya, `flex-basis` ukuran awal. `flex-size` dan `flex-stretch` tidak ada."],
  // 20
  ["Manakah pernyataan yang benar tentang media queries?", ["Media queries tidak mendukung unit relatif", "Media queries tidak dapat digabungkan", "Media queries hanya bekerja di CSS eksternal", "Media queries hanya digunakan untuk warna", "Media queries digunakan untuk mengatur gaya berdasarkan karakteristik perangkat"], 4,
    "Karakteristik perangkat = lebar/tinggi layar, orientasi, resolusi, dll. Media query bisa memakai `em`, digabung dengan `and`, ditulis di CSS internal atau external, dan mengubah properti apa pun."],
  // 21
  ["Manakah properti CSS yang digunakan untuk mengatur spasi antar baris dan kolom dalam CSS Grid?", ["grid-gap", "grid-margin", "grid-spacing", "gap", "grid-padding"], 3,
    "<strong>Ambigu.</strong> `gap` adalah nama standar sekarang (`gap: 10px 20px` = jarak baris lalu kolom). `grid-gap` adalah nama lama yang masih berfungsi sebagai alias, jadi opsi a juga bisa dianggap benar. Kunci ini memilih `gap` karena itu bentuk modern."],
  // 23
  ["Manakah cara penyisipan CSS yang menggunakan tag `<style>` di dalam `<head>`?", ["External CSS", "Linked CSS", "Embedded CSS", "Internal CSS", "Inline CSS"], 3,
    "<strong>Ambigu.</strong> Internal CSS dan Embedded CSS adalah dua nama untuk hal yang sama. Kunci ini memilih Internal karena istilah itu yang dipakai modul. External/Linked = file .css lewat `<link>`, inline = atribut `style`."],
  // 24
  ["Manakah cara yang benar untuk menghubungkan file CSS eksternal ke dokumen HTML?", ["`<style link=\"style.css\">`", "`<css href=\"style.css\">`", "`<style src=\"style.css\">`", "`<link href=\"style.css\" rel=\"stylesheet\">`", "`<link src=\"style.css\" type=\"css\">`"], 3,
    "File CSS dihubungkan dengan tag `<link>` di `<head>`: `href` berisi alamat file, `rel=\"stylesheet\"` menyatakan file itu stylesheet. `<link>` memakai `href`, bukan `src`."],
  // 25
  ["Manakah sintaks media query yang menargetkan perangkat dengan orientasi lanskap?", ["`@media screen and (orientation: portrait)`", "`@media screen and (mode: landscape)`", "`@media screen and (orientation: landscape)`", "`@media screen and (landscape)`", "`@media screen and (direction: landscape)`"], 2,
    "Fitur `orientation` punya dua nilai: `landscape` (lebar lebih besar dari tinggi) dan `portrait` (tinggi lebih besar). `mode` dan `direction` bukan fitur media query."],
  // 26
  ["Manakah nilai yang valid untuk properti display dalam konteks layout?", ["flex", "grid", "inline", "All of the above", "block"], 3,
    "`flex`, `grid`, `inline`, dan `block` semuanya nilai `display` yang sah, jadi jawabannya \"All of the above\"."],
  // 28
  ["Apa yang dimaksud dengan Box Model dalam CSS?", ["Sistem untuk membuat layout grid", "Konsep yang mendefinisikan margin, border, padding, dan konten elemen", "Aturan untuk menyisipkan CSS", "Model untuk mengatur warna teks", "Metode untuk mengatur font"], 1,
    "Setiap elemen digambar sebagai kotak berlapis, dari dalam ke luar: content → padding → border → margin."],
  // 29
  ["Manakah properti CSS yang digunakan untuk mengatur lebar minimum elemen?", ["min-width", "max-width", "width", "size", "min-height"], 0,
    "`min-width` = elemen tidak boleh lebih sempit dari nilai ini. `max-width` = tidak boleh lebih lebar. `min-height` untuk tinggi."],
  // 30
  ["Atribut apa pada tag `<link>` yang menentukan hubungan file CSS dengan dokumen HTML?", ["type", "src", "href", "rel", "link"], 3,
    "`rel` = relationship (hubungan). `rel=\"stylesheet\"` berarti \"file ini stylesheet untuk halaman ini\". `href` hanya berisi alamat file."],
  // 31
  ["Manakah pernyataan yang benar tentang unit vw dan vh?", ["vw relatif terhadap lebar viewport, vh relatif terhadap tinggi", "vw dan vh hanya digunakan untuk font-size", "vw relatif terhadap tinggi viewport, vh relatif terhadap lebar", "vw dan vh sama dengan px", "vw dan vh tidak mendukung desain responsif"], 0,
    "1vw = 1% lebar viewport (layar browser), 1vh = 1% tingginya. `height: 100vh` = setinggi layar. Keduanya bisa dipakai untuk properti ukuran apa pun."],
  // 32
  ["Manakah pernyataan yang benar tentang penggunaan media queries untuk desain responsif?", ["Media queries tidak dapat digunakan dengan Flexbox", "Media queries tidak mendukung unit seperti vw dan vh", "Media queries memungkinkan gaya berbeda untuk ukuran layar berbeda", "Media queries hanya digunakan untuk mengubah warna", "Media queries hanya bekerja di CSS inline"], 2,
    "Itulah inti desain responsif. Media query justru tidak bisa ditulis di atribut `style` (inline); tempatnya di CSS internal atau external."],
  // 34
  ["Properti CSS mana yang digunakan untuk mengubah warna teks?", ["text-color", "background-color", "color", "foreground-color", "font-color"], 2,
    "`color` untuk warna teks, `background-color` untuk warna latar. `text-color` dan `font-color` sering jadi jebakan karena terdengar masuk akal, padahal tidak ada."],
  // 36
  ["Manakah pernyataan yang benar tentang Box Model?", ["Margin berada di dalam border", "Padding berada di luar border", "Border berada antara margin dan padding", "Border tidak termasuk dalam Box Model", "Content berada di luar padding"], 2,
    "Urutan dari dalam ke luar: content → padding → border → margin. Jadi border diapit padding (di dalam) dan margin (di luar)."],
  // 37
  ["Manakah nilai yang valid untuk properti text-align?", ["middle", "top", "bottom", "center", "vertical"], 3,
    "`text-align` hanya mengatur perataan mendatar: `left`, `right`, `center`, `justify`. `top`, `bottom`, `middle` adalah nilai `vertical-align`, bukan `text-align`."],
  // 38
  ["Properti CSS mana yang digunakan untuk mengatur perataan elemen di sumbu silang Flexbox?", ["align-items", "flex-align", "flex-justify", "align-content", "justify-content"], 0,
    "`align-items` = sumbu silang (vertikal jika `flex-direction: row`). `justify-content` = sumbu utama. `align-content` mengatur jarak antarbaris item yang sudah turun baris (wrap), bukan item di satu baris."]
];

// Bentuk objek kuis. Label "[Kuis LMS Pn]" dipakai tombol 🎯 di tab Kuis untuk mengerjakannya berurutan.
const toQuiz = (n, list) => list.map(([q, opts, ans, exp]) => ({ q: `[Kuis LMS P${n}] ${q}`, opts, ans, exp }));

module.exports = { p1: toQuiz(1, P1), p5: toQuiz(5, P5) };
