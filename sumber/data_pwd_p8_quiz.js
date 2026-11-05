// Bank soal UTS Pemrograman Web Dinamis (P1–P7), format pilihan ganda 5 opsi seperti Penugasan 1.
// Tuple: [pertemuan, soal, [5 opsi], indeks jawaban, pembahasan]
const S = [
  // ===== P1: Konsep web & HTML dasar =====
  [1, "Protokol yang digunakan untuk mentransfer dokumen di WWW adalah …", ["FTP", "HTTP", "SMTP", "DNS", "SSH"], 1, "HTTP = HyperText Transfer Protocol. FTP untuk file, SMTP untuk email, DNS menerjemahkan domain ke IP, SSH untuk remote login."],
  [1, "Dalam konsep client-server, apa yang dilakukan server saat menerima permintaan HTTP?", ["Mengelola input pengguna di browser", "Mengirim respons berupa data atau file ke client", "Mengatur tata letak halaman web", "Menyimpan kode JavaScript untuk validasi", "Menampilkan halaman web di browser"], 1, "Client (browser) mengirim request, server mengirim response. Menampilkan halaman adalah tugas browser."],
  [1, "Yang termasuk bahasa pemrograman server side adalah …", ["HTML", "CSS", "PHP", "XML", "JavaScript di browser"], 2, "Server side: ASP, PHP, JSP. HTML, CSS, XML, dan JavaScript di browser termasuk client side."],
  [1, "Ciri web dinamis adalah …", ["Konten selalu sama untuk setiap pengunjung", "Hanya berisi file HTML", "Konten dapat berubah dan diproses di server", "Tidak memerlukan web server", "Hanya bisa dibuka offline"], 2, "Web dinamis: konten berubah sesuai data/permintaan dan diproses server (misal PHP + database)."],
  [1, "Sistem yang menerjemahkan nama domain menjadi alamat IP adalah …", ["HTTP", "URL", "DNS", "TCP", "Hosting"], 2, "DNS (Domain Name System) = database tersebar nama domain."],
  [1, "Pada alamat `dosen.sibermu.ac.id`, bagian `.ac.id` disebut …", ["Subdomain", "Second Level Domain", "Top Level Domain", "Protokol", "Path"], 2, "dosen = subdomain, sibermu = SLD, .ac.id = TLD (ccTLD Indonesia)."],
  [1, "Contoh ccTLD (country code Top Level Domain) adalah …", [".com", ".net", ".org", ".id", ".info"], 3, ".id (Indonesia), .my, .sg adalah ccTLD. Lainnya gTLD."],
  [1, "Jenis hosting di mana satu server dipakai bersama oleh banyak website adalah …", ["Dedicated server", "VPS", "Shared hosting", "Colocation", "Cloud storage"], 2, "Shared hosting = berbagi sumber daya satu server; paling murah."],
  [1, "Apa fungsi tag `<title>` dalam HTML?", ["Membuat heading utama di halaman", "Menampilkan judul di badan halaman", "Mengatur ukuran font teks", "Menyisipkan tautan ke halaman lain", "Menentukan judul dokumen yang muncul di tab browser"], 4, "`<title>` ada di `<head>` dan tampil di tab browser, bukan di isi halaman. Judul di halaman memakai `<h1>`."],
  [1, "Atribut HTML digunakan untuk …", ["Menentukan struktur utama dokumen", "Memberikan informasi tambahan atau pengaturan untuk tag", "Membuat interaktivitas di halaman web", "Menambahkan database", "Menyimpan data ke server"], 1, "Contoh: `<a href=\"...\">`, `<img src=\"...\" alt=\"...\">`."],
  [1, "Manakah contoh penggunaan atribut yang benar?", ["`<p src=\"teks.html\">`", "`<a src=\"link.html\">`", "`<div href=\"halaman.html\">`", "`<h1 alt=\"Judul\">`", "`<img src=\"gambar.jpg\" alt=\"Deskripsi Gambar\">`"], 4, "img memakai src & alt; a memakai href (bukan src)."],
  [1, "Tag yang digunakan untuk membuat baris baru tanpa memulai paragraf baru adalah …", ["`<p>`", "`<line>`", "`<hr>`", "`<break>`", "`<br>`"], 4, "`<br>` = line break. `<hr>` = garis horizontal."],
  [1, "Tag untuk menyisipkan gambar adalah …", ["`<src>`", "`<image>`", "`<picture>`", "`<img>`", "`<photo>`"], 3, "`<img src=\"...\" alt=\"...\">`. (`<picture>` ada, tetapi tetap berisi `<img>` di dalamnya.)"],
  [1, "Struktur yang benar untuk daftar tak berurutan adalah …", ["`<ul>Item</ul>`", "`<ul><li>Item</li></ul>`", "`<li><li>Item</li></li>`", "`<li><ul>Item</ul></li>`", "`<ol><ul>Item</ul></ol>`"], 1, "ul (unordered) / ol (ordered) membungkus li."],

  // ===== P2: Semantik, form, tabel =====
  [2, "Tag HTML5 untuk menandai bagian navigasi adalah …", ["`<footer>`", "`<menu>`", "`<sidebar>`", "`<nav>`", "`<header>`"], 3, "`<nav>` untuk menu navigasi."],
  [2, "Elemen semantik yang berisi konten utama dan hanya boleh ada satu per halaman adalah …", ["`<section>`", "`<article>`", "`<main>`", "`<aside>`", "`<div>`"], 2, "`<main>` cuma satu. section/article boleh banyak."],
  [2, "Elemen yang cocok untuk konten mandiri seperti satu berita atau postingan blog adalah …", ["`<article>`", "`<aside>`", "`<nav>`", "`<footer>`", "`<span>`"], 0, "article = konten yang tetap bermakna jika berdiri sendiri."],
  [2, "Manfaat elemen semantik HTML5, KECUALI …", ["Meningkatkan aksesibilitas", "Membantu SEO", "Memudahkan kolaborasi", "Membuat halaman otomatis responsif", "Membuat struktur kode lebih jelas"], 3, "Responsif diatur CSS (media queries), bukan oleh elemen semantik."],
  [2, "Tag yang digunakan bersama `<input>` untuk memberikan keterangan deskriptif adalah …", ["`<span>`", "`<title>`", "`<legend>`", "`<label>`", "`<caption>`"], 3, "`<label for=\"id-input\">`. legend untuk fieldset, caption untuk judul tabel."],
  [2, "Agar label terhubung ke `<input id=\"email\">`, label ditulis …", ["`<label name=\"email\">`", "`<label for=\"email\">`", "`<label id=\"email\">`", "`<label href=\"email\">`", "`<label to=\"email\">`"], 1, "Nilai for = id input."],
  [2, "Method form yang mengirim data di body request (tidak tampil di URL) adalah …", ["GET", "POST", "PUT di URL", "LINK", "SEND"], 1, "POST untuk simpan data/password; GET menampilkan data di URL."],
  [2, "Tipe input untuk memilih beberapa opsi sekaligus adalah …", ["type=\"select\"", "type=\"multiple\"", "type=\"choice\"", "type=\"radio\"", "type=\"checkbox\""], 4, "radio hanya satu pilihan (name sama); checkbox bisa banyak."],
  [2, "Tipe input untuk memilih file dari perangkat adalah …", ["type=\"attachment\"", "type=\"upload\"", "type=\"file\"", "type=\"document\"", "type=\"data\""], 2, "Bisa dibatasi dengan accept, misalnya accept=\"image/*\"."],
  [2, "Tipe input yang menyembunyikan data dari pengguna tetapi tetap dikirim saat submit adalah …", ["type=\"invisible\"", "type=\"hidden\"", "type=\"password\"", "type=\"private\"", "type=\"secret\""], 1, "password hanya menyamarkan tampilan ketikan; hidden tidak terlihat sama sekali."],
  [2, "Tipe input untuk memasukkan tanggal adalah …", ["type=\"datetime\"", "type=\"date\"", "type=\"calendar\"", "type=\"day\"", "type=\"time\""], 1, "date = tanggal; time = jam."],
  [2, "Pernyataan yang benar tentang atribut `disabled` dan `readonly` adalah …", ["Keduanya membuat input wajib diisi", "disabled tidak bisa diedit dan tidak terkirim; readonly tidak bisa diedit tetapi tetap terkirim", "readonly menyembunyikan input", "disabled hanya untuk angka", "Keduanya sama persis"], 1, "Jebakan favorit: disabled TIDAK ikut terkirim."],
  [2, "Fungsi atribut `placeholder` adalah …", ["Menentukan nilai default input", "Menentukan jenis input", "Menampilkan teks petunjuk sementara di dalam input", "Membuat input wajib diisi", "Menghubungkan input dengan label"], 2, "Placeholder hilang saat mengetik dan tidak dikirim sebagai nilai."],
  [2, "Atribut agar input Umur hanya menerima 17 sampai 100 adalah …", ["`size=\"17-100\"`", "`min=\"17\" max=\"100\"` pada type number", "`maxlength=\"100\"`", "`range=\"17,100\"`", "`pattern=\"17-100\"` pada type date"], 1, "min/max untuk number/date; maxlength membatasi jumlah karakter."],
  [2, "Struktur yang benar untuk tabel satu baris dua kolom adalah …", ["`<table><tr><td>A</td><td>B</td></tr></table>`", "`<table><td>A</td><td>B</td></table>`", "`<table><td><tr>A</tr></td></table>`", "`<tr><table><td>A</td></table></tr>`", "`<table><tr>A<tr>B</tr></tr></table>`"], 0, "table > tr (baris) > td (sel)."],
  [2, "Atribut pada `<td>`/`<th>` untuk menggabungkan beberapa kolom adalah …", ["rowspan", "merge", "span", "combine", "colspan"], 4, "colspan = gabung kolom (ke samping); rowspan = gabung baris (ke bawah)."],
  [2, "Perbedaan `<th>` dan `<td>` adalah …", ["th tidak bisa punya atribut", "th untuk sel judul/header, td untuk data biasa", "th hanya di tbody", "th inline, td block", "Fungsinya sama"], 1, "th default tebal dan rata tengah."],
  [2, "Fungsi atribut `name` pada input adalah …", ["Memberi gaya CSS", "Menjadi nama data yang dikirim ke server", "Menghubungkan label", "Membuat input unik untuk JavaScript saja", "Menampilkan teks petunjuk"], 1, "Input tanpa name tidak ikut terkirim. Label memakai id."],

  // ===== P3: CSS dasar =====
  [3, "Cara memasang CSS yang paling baik untuk website dengan banyak halaman adalah …", ["Inline", "Internal", "External", "Tag `<font>`", "Atribut bgcolor"], 2, "Satu file .css dipakai semua halaman lewat `<link rel=\"stylesheet\">`."],
  [3, "Penulisan CSS inline yang benar adalah …", ["`<p css=\"color:red\">`", "`<p style=\"color:red\">`", "`<p style=\"color=red\">`", "`<style p=\"color:red\">`", "`<p font=\"red\">`"], 1, "Atribut style, property: value."],
  [3, "Kode untuk menghubungkan file CSS eksternal adalah …", ["`<style src=\"style.css\">`", "`<link rel=\"stylesheet\" href=\"style.css\">`", "`<script href=\"style.css\">`", "`<css>style.css</css>`", "`<a href=\"style.css\">`"], 1, "Ditaruh di `<head>`."],
  [3, "Selector untuk elemen dengan `class=\"menu\"` adalah …", ["#menu", ".menu", "menu", "*menu", "@menu"], 1, "Titik untuk class, pagar untuk id."],
  [3, "Fungsi atribut `id` pada elemen HTML adalah …", ["Menyisipkan gambar", "Membuat elemen semantik", "Mengatur warna teks", "Memberikan pengenal unik untuk elemen", "Menentukan alamat tautan"], 3, "id unik dalam satu halaman; dipakai CSS (#id), label for, dan JavaScript."],
  [3, "Urutan prioritas CSS dari yang paling kuat adalah …", ["tag > class > id > inline", "class > id > inline > tag", "inline > id > class > tag", "id > inline > tag > class", "Semua sama kuat"], 2, "Jika sama kuat, aturan yang ditulis terakhir menang."],
  [3, "Elemen yang bersifat inline secara default adalah …", ["`<div>`", "`<span>`", "`<section>`", "`<h1>`", "`<p>`"], 1, "span inline; div, section, h1, p adalah block."],
  [3, "Property CSS untuk mengubah warna latar elemen adalah …", ["color", "bgcolor", "background-color", "font-color", "fill"], 2, "color = warna teks."],

  // ===== P4: Box model, Flexbox, Grid =====
  [4, "Urutan box model dari dalam ke luar adalah …", ["margin → border → padding → content", "content → padding → border → margin", "content → margin → border → padding", "padding → content → border → margin", "border → padding → content → margin"], 1, "Padding = ruang dalam; margin = ruang luar."],
  [4, "Elemen `width: 200px; padding: 10px; border: 2px solid;` (box-sizing default) memiliki lebar total …", ["200px", "212px", "220px", "224px", "240px"], 3, "200 + (10×2) + (2×2) = 224px. Dengan border-box tetap 200px."],
  [4, "Kode `margin: 0 auto;` pada elemen berlebar tetap berfungsi untuk …", ["Menghapus semua margin", "Menengahkan elemen secara horizontal", "Menengahkan teks", "Membuat elemen penuh layar", "Menyembunyikan elemen"], 1, "Margin kiri-kanan auto membagi sisa ruang sama rata."],
  [4, "Property Flexbox untuk mengatur posisi item pada sumbu utama adalah …", ["align-items", "justify-content", "flex-wrap", "grid-template-columns", "text-align"], 1, "align-items untuk sumbu silang."],
  [4, "`flex-direction: column;` membuat item …", ["Tersusun menyamping", "Tersusun ke bawah", "Tersembunyi", "Terbalik urutannya ke samping", "Menjadi grid"], 1, "row (default) menyamping, column ke bawah."],
  [4, "`grid-template-columns: 1fr 1fr 1fr;` menghasilkan …", ["3 baris sama tinggi", "3 kolom sama lebar", "1 kolom 3fr", "Kolom selebar 1px", "Grid tanpa kolom"], 1, "fr = bagian dari sisa ruang."],
  [4, "Layout yang paling tepat memakai Grid (2 dimensi) adalah …", ["Menu navigasi satu baris", "Deretan tombol", "Dashboard dengan baris dan kolom", "Satu paragraf teks", "Satu input form"], 2, "Flexbox 1 dimensi (nav, tombol, form); Grid 2 dimensi."],

  // ===== P5: Responsif =====
  [5, "`@media (max-width: 600px) { ... }` berlaku ketika …", ["Lebar layar ≥ 600px", "Lebar layar ≤ 600px", "Tinggi layar ≤ 600px", "Layar landscape", "Saat dicetak"], 1, "max-width = lebar maksimum."],
  [5, "Breakpoint tablet menurut modul adalah …", ["max-width 600px", "min-width 601px dan max-width 1024px", "min-width 1025px", "max-width 320px", "min-width 1440px"], 1, "Mobile ≤600, tablet 601–1024, desktop ≥1025."],
  [5, "Jika font root 16px, nilai `1.5rem` setara dengan …", ["16px", "20px", "24px", "32px", "15px"], 2, "1.5 × 16 = 24px."],
  [5, "Unit yang relatif terhadap tinggi layar (viewport) adalah …", ["%", "vw", "vh", "em", "px"], 2, "vh = viewport height; vw = viewport width."],
  [5, "Kode agar gambar tidak melebihi lebar wadahnya adalah …", ["`img { width: 1000px; }`", "`img { max-width: 100%; height: auto; }`", "`img { display: none; }`", "`img { position: absolute; }`", "`img { float: left; }`"], 1, "Prinsip flexible images."],
  [5, "Baris yang wajib ada di `<head>` agar media query mobile bekerja di HP adalah …", ["`<meta charset=\"UTF-8\">`", "`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`", "`<link rel=\"icon\">`", "`<title>Mobile</title>`", "`<meta name=\"mobile\" content=\"true\">`"], 1, "Tanpa meta viewport, HP memakai lebar virtual ±980px."],

  // ===== P6: JavaScript dasar =====
  [6, "Kata kunci untuk variabel yang nilainya tidak boleh diisi ulang adalah …", ["let", "var", "const", "static", "fixed"], 2, "Gunakan const untuk nilai tetap, let untuk yang berubah."],
  [6, "Hasil dari `5 === \"5\"` adalah …", ["true", "false", "\"55\"", "10", "error"], 1, "=== memeriksa tipe dan nilai."],
  [6, "Hasil dari `\"10\" + 5` adalah …", ["15", "\"105\"", "5", "error", "undefined"], 1, "+ dengan string menyambung teks."],
  [6, "Hasil dari `10 % 3` adalah …", ["3", "1", "3.33", "30", "0"], 1, "% = sisa bagi."],
  [6, "`[\"Ahmad\", \"Budi\"]` termasuk tipe data …", ["String", "Number", "Boolean", "Array", "Undefined"], 3, "Kurung siku = array."],
  [6, "Fungsi untuk menampilkan pesan di konsol browser (debugging) adalah …", ["alert()", "prompt()", "console.log()", "document.write()", "confirm()"], 2, "Lihat di F12 → Console."],
  [6, "Cara menyisipkan JavaScript yang TIDAK direkomendasikan adalah …", ["File eksternal script.js", "Tag script internal", "Inline pada atribut onclick", "Script di akhir body", "Script dengan atribut defer"], 2, "Inline mencampur HTML dan JS."],
  [6, "Kode yang benar untuk menjalankan fungsi saat tombol `btn` diklik adalah …", ["`btn.addEventListener(\"click\", function() { ... });`", "`btn.click = alert();`", "`addEventListener(btn, click);`", "`btn.onEvent(\"klik\")`", "`btn.listen(click)`"], 0, "elemen.addEventListener(\"event\", fungsi)."],

  // ===== P7: DOM =====
  [7, "DOM merepresentasikan dokumen HTML dalam bentuk …", ["Tabel database", "Struktur pohon node", "File CSS", "Daftar URL", "Gambar"], 1, "Document → html → head/body → elemen."],
  [7, "Kode untuk memilih elemen dengan id `nim` adalah …", ["`document.getElementById(\"#nim\")`", "`document.getElementById(\"nim\")`", "`document.querySelector(\"nim\")`", "`document.querySelectorAll(\".nim\")`", "`document.getId(\"nim\")`"], 1, "getElementById tanpa #; querySelector(\"#nim\") pakai #."],
  [7, "Method yang mengembalikan NodeList semua elemen yang cocok adalah …", ["getElementById", "querySelector", "querySelectorAll", "createElement", "appendChild"], 2, "Loop dengan forEach."],
  [7, "Properti yang aman untuk menampilkan input pengguna (tag tidak dijalankan) adalah …", ["innerHTML", "textContent", "outerHTML", "document.write", "insertAdjacentHTML"], 1, "textContent mencegah XSS."],
  [7, "Penulisan yang benar untuk mengubah warna latar lewat JavaScript adalah …", ["`el.style.background-color = \"red\"`", "`el.style.backgroundColor = \"red\"`", "`el.backgroundColor = \"red\"`", "`el.css(\"background\", \"red\")`", "`el.color.background = \"red\"`"], 1, "Properti style memakai camelCase."],
  [7, "Urutan menambah baris baru ke tabel adalah …", ["appendChild → createElement", "createElement → isi konten → appendChild", "remove → createElement", "getAttribute → appendChild", "innerHTML → remove"], 1, "Buat, isi, tempel ke tbody."],
  [7, "Method untuk menghapus satu elemen dari halaman adalah …", ["`el.delete()`", "`el.remove()`", "`el.hide()`", "`el.clear()`", "`el.textContent = null`"], 1, "Mengosongkan semua baris: `tbody.innerHTML = \"\"`."]
];

module.exports = S.map(([p, q, opts, ans, exp]) => ({ q: q, opts, ans, exp: "<strong>P" + p + "</strong> • " + exp }));
