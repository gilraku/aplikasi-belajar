// 📖 Materi Lengkap PWD P9–P13 (menuju UAS). Sumber: Modul JS 9, Modul PHP 10–13.
// Bagian bertanda ➕ bukan dari modul. Setiap istilah dijelaskan: artinya, kapan dipakai, contoh, kesalahan umum.
const ADG = require("./adegan_it.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const e = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const c = s => "<code>" + e(s) + "</code>";
const code = (file, src, note, title) => ({ type: "code", label: "Contoh Kode", title, file, code: src, note });
const tbl = (title, headers, rows, modes, label) => ({ type: "table", label: label || "Tabel Interaktif", title, headers, rows, modes });
const ul = items => `<ul class="list-disc pl-5 space-y-1">${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
const salah = items => tip("Kesalahan yang sering terjadi", ul(items), "warn");
const M = {};

// ───────────────────────────── P9 ─────────────────────────────
M.p9 = [
  A("Event: Aksi Pengguna yang Bisa Ditangkap JavaScript", `<p><strong>Event</strong> adalah kejadian di halaman: tombol diklik, form dikirim, isi kolom berubah, halaman selesai dimuat. <strong>Event listener</strong> (pendengar event) adalah fungsi yang kita pasang pada sebuah elemen supaya dijalankan setiap kali event itu terjadi.</p>
<p>Polanya selalu tiga bagian: <strong>elemen mana</strong>, <strong>event apa</strong>, <strong>fungsi apa</strong> yang dijalankan. Contoh: tombol ${c("#my-btn")}, event klik, fungsi yang menampilkan alert.</p>
<p>Modul P9 memakai tiga cara memasang event listener: properti ${c("onclick")}, properti ${c("onsubmit")}, dan method ${c("addEventListener")}. Ketiganya sama-sama "memasang fungsi pada event", bedanya di cara menulis dan apa yang terjadi kalau dipasang lebih dari sekali.</p>`, "Bagian 1"),
  tbl("onclick, onsubmit, atau addEventListener?", ["Cara", "Artinya", "Kapan dipakai", "Contoh"], [
    ["`onclick`", "Properti elemen yang menyimpan <strong>satu</strong> fungsi untuk event klik", "Contoh cepat atau kode lama; satu tombol, satu aksi", "`btn.onclick = function() { alert(\"Tombol diklik!\"); };`"],
    ["`onsubmit`", "Properti <strong>form</strong> yang menyimpan satu fungsi untuk event kirim (submit)", "Validasi form sebelum dikirim", "`form.onsubmit = function(event) { event.preventDefault(); };`"],
    ["`addEventListener`", "Method untuk memasang fungsi pada event apa pun; bisa lebih dari satu fungsi", "Cara yang disarankan modul untuk semua kasus", "`btn.addEventListener(\"click\", function() { … });`"]
  ], [
    { label: "Menimpa", target: "row", row: 0, title: "Properti hanya muat satu fungsi", text: "Kalau ditulis <code>btn.onclick = fungsiA;</code> lalu <code>btn.onclick = fungsiB;</code>, saat diklik hanya fungsiB yang jalan. Dengan <code>addEventListener</code>, keduanya jalan berurutan. Inilah maksud modul \"menghindari penimpaan event\"." },
    { label: "Nama event", target: "row", row: 2, title: "Tanpa on", text: "Properti memakai awalan <code>on</code> (<code>onclick</code>, <code>onsubmit</code>). Di <code>addEventListener</code>, nama event ditulis <strong>tanpa on</strong>: <code>\"click\"</code>, <code>\"submit\"</code>, <code>\"input\"</code>, <code>\"change\"</code>." },
    { label: "Dipasang di mana?", target: "row", row: 1, title: "submit milik form", text: "Event submit terjadi pada <strong>form</strong>, jadi listener-nya dipasang pada <code>&lt;form&gt;</code>, bukan pada tombol. Tombol <code>type=\"submit\"</code> hanya pemicunya." }
  ]),
  code("event-listener.js", `const btn = document.getElementById("my-btn");

// Cara 1: properti onclick (hanya 1 fungsi)
btn.onclick = function() { console.log("A"); };
btn.onclick = function() { console.log("B"); };   // menimpa A
// diklik → hanya "B"

// Cara 2: addEventListener (bisa banyak)
btn.addEventListener("click", function() { console.log("C"); });
btn.addEventListener("click", function() { console.log("D"); });
// diklik → "B", "C", "D"

// Cara 3: onsubmit, dipasang pada FORM
const form = document.getElementById("my-form");
form.onsubmit = function(event) {
  event.preventDefault();   // jangan kirim dulu
  alert("Form dikirim!");
};`, "Properti onclick menyimpan satu fungsi; addEventListener menambah fungsi tanpa menghapus yang lama. Keduanya bisa dipakai bersamaan."),
  salah([
    `Menulis ${c('addEventListener("onclick", …)')}. Tidak ada error, tetapi fungsinya tidak pernah jalan karena event bernama ${c('"click"')}.`,
    `Menulis ${c('btn.addEventListener("click", cekForm())')} (pakai kurung). ${c("cekForm()")} langsung dijalankan sekali saat halaman dimuat, dan yang dipasang adalah hasilnya. Tulis ${c("cekForm")} tanpa kurung.`,
    `Memasang onsubmit pada tombol (${c("btn.onsubmit = …")}). Tombol tidak punya event submit; pasang pada form.`,
    `Menaruh ${c("<script>")} di ${c("<head>")} tanpa ${c("defer")}. Elemennya belum ada, ${c("getElementById")} menghasilkan null, lalu muncul error "Cannot read properties of null".`
  ]),

  A("preventDefault: Tahan Pengiriman Sampai Validasi Selesai", `<p>Setiap event punya <strong>aksi bawaan</strong> (default) dari browser. Aksi bawaan submit adalah <strong>mengirim form</strong> ke alamat di atribut ${c("action")} lalu memuat halaman baru (kalau ${c("action")} kosong, halaman yang sama dimuat ulang). Akibatnya pesan error yang baru ditulis JavaScript langsung hilang.</p>
<p>${c("event.preventDefault()")} membatalkan aksi bawaan itu. Fungsi listener menerima objek ${c("event")} sebagai parameter (namanya bebas: ${c("event")}, ${c("e")}, ${c("evt")}), dan method ini dipanggil dari objek tersebut.</p>
<p>Kapan dipakai: di handler submit, setiap kali JavaScript ingin <strong>memutuskan sendiri</strong> apa yang terjadi setelah tombol kirim ditekan, misalnya menampilkan error atau menambah baris tabel (seperti aktivitas dan tugas P9).</p>`, "Bagian 2"),
  { type: "flow", label: "Alur", title: "Yang Terjadi Saat Tombol Simpan Diklik", items: ["Klik Simpan / Enter", "Event submit pada form", "preventDefault()", "Cek setiap kolom", "Valid? proses data : tampilkan error"],
    note: "Modul memanggil <code>preventDefault()</code> di baris pertama karena data valid hanya ditampilkan (alert) atau ditambahkan ke tabel, tidak dikirim ke server." },
  code("kirim-ke-php.js", `// ➕ Nanti di P11, data valid justru HARUS terkirim ke PHP.
// Polanya: batalkan pengiriman hanya kalau ada yang salah.
form.addEventListener("submit", function(event) {
  let isValid = true;
  // ... cek kolom, isValid = false jika salah ...
  if (!isValid) {
    event.preventDefault();   // ada error → jangan kirim
  }
  // valid → biarkan browser mengirim form ke action="proses.php"
});`, "Perbedaan dengan modul P9: preventDefault dipanggil di dalam if (!isValid), bukan di baris pertama.", "➕ Kalau form memang mau dikirim ke server"),

  A("Validasi Form: Isi yang Masuk Harus Benar", `<p><strong>Validasi</strong> adalah memeriksa isian pengguna sebelum diproses: apakah sudah diisi, panjangnya cukup, formatnya benar. Tujuannya (modul): data yang masuk valid, lengkap, dan sesuai format, sehingga tidak ada data rusak yang masuk ke database aplikasi CRUD nanti.</p>
<p>Pola yang dipakai di aktivitas dan tugas modul:</p>
<ol class="list-decimal pl-5 space-y-1"><li>Panggil ${c("event.preventDefault()")}.</li><li>Buat penanda ${c("let isValid = true;")}.</li><li>Kosongkan semua pesan error lama (${c('nimError.textContent = "";')}). Tanpa langkah ini, pesan dari percobaan sebelumnya tetap tampil walau isian sudah diperbaiki.</li><li>Cek kolom satu per satu. Kalau salah, tulis pesannya di ${c('<span class="error">')} di bawah kolom itu dan ubah ${c("isValid = false")}. Semua kolom tetap dicek supaya semua kesalahan tampil sekaligus.</li><li>Setelah semua cek, kalau ${c("isValid")} masih true: proses datanya, lalu ${c("form.reset()")}.</li></ol>`, "Bagian 3"),
  ADG.pwdValidasi,
  tbl("Lima Jenis Cek di Modul", ["Jenis", "Kode", "Contoh ditolak", "Contoh lolos"], [
    ["Field wajib", "`if (!nama.value)`", "<code>\"\"</code>", "<code>\"Ahmad\"</code>"],
    ["Panjang minimal", "`if (nama.value.length < 3)`", "<code>\"Al\"</code>", "<code>\"Ali\"</code>"],
    ["Hanya angka + panjang tepat", "`if (isNaN(nim) || nim.length !== 10)`", "<code>\"12345\"</code>, <code>\"240101000A\"</code>", "<code>\"2401010001\"</code>"],
    ["Format email", "`if (!emailPattern.test(email))`", "<code>\"ahmad@kampus\"</code>", "<code>\"ahmad@kampus.ac.id\"</code>"],
    ["Pilihan select", "`if (!jurusan.value)`", "opsi \"Pilih Jurusan\" (<code>value=\"\"</code>)", "<code>\"Sistem Informasi\"</code>"]
  ], [
    { label: "Kenapa !value?", target: "row", row: 0, title: "String kosong = false", text: "Di JavaScript, <code>\"\"</code> termasuk nilai falsy. <code>!\"\"</code> bernilai true, jadi blok if dijalankan. Teks apa pun yang tidak kosong bernilai truthy." },
    { label: "|| (atau)", target: "row", row: 2, title: "Satu syarat gagal cukup untuk ditolak", text: "<code>isNaN(nim) || nim.length !== 10</code> bernilai true kalau <strong>salah satu</strong> benar: bukan angka, atau panjangnya bukan 10." },
    { label: "!== bukan !=", target: "row", row: 2, title: "Pembanding ketat", text: "<code>!==</code> membandingkan nilai dan tipe. <code>length</code> selalu angka, jadi <code>!== 10</code> aman dan jelas." }
  ]),
  A("3a. isNaN: Cek Angka Versi Modul dan Celahnya", `<p>${c("isNaN(x)")} artinya "is Not a Number?": hasilnya ${c("true")} kalau ${c("x")} <strong>tidak bisa</strong> dibaca sebagai angka. ${c('isNaN("12345abcde")')} → true (ditolak), ${c('isNaN("2401010001")')} → false (dianggap angka).</p>
<p>➕ Masalahnya, ${c("isNaN")} memakai aturan angka JavaScript yang longgar. Teks berikut dianggap angka padahal bukan NIM, dan panjangnya pas 10: ${c('"123456789."')} (ada titik), ${c('"-123456789"')} (minus), ${c('"1e12345678"')} (notasi ilmiah), ${c('" 123456789"')} (spasi di depan).</p>
<p>Cek yang lebih ketat memakai regex ${c("/^\\d{10}$/")}: dari awal sampai akhir harus <strong>tepat 10 digit</strong> 0–9. ${c("\\d")} berarti satu digit, ${c("{10}")} berarti tepat sepuluh kali.</p>`),
  code("cek-nim.js", `const nim = nimInput.value;

// Versi modul
if (!nim || nim.length !== 10 || isNaN(nim)) {
  nimError.textContent = "NIM harus 10 digit angka!";
}

// ➕ Versi ketat: hanya 10 digit 0-9
if (!/^\\d{10}$/.test(nim)) {
  nimError.textContent = "NIM harus 10 digit angka!";
}`, "Untuk soal ujian, ikuti versi modul (isNaN + length). Untuk aplikasi sungguhan, versi regex lebih aman."),
  A("3b. Regex Email: Membaca Polanya Potong demi Potong", `<p><strong>Regular expression</strong> (regex) adalah pola untuk mencocokkan teks. Di JavaScript ditulis di antara dua garis miring ${c("/ … /")}, lalu dicek dengan ${c("pola.test(teks)")} yang menghasilkan ${c("true")} atau ${c("false")}.</p>
<p>Pola email modul ${c("/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/")} sebenarnya hanya mengecek bentuk <strong>teks@teks.teks</strong> tanpa spasi. Pola ini tidak memastikan alamat email benar-benar ada; untuk itu biasanya dikirim email konfirmasi.</p>`),
  tbl("Arti Setiap Potongan", ["Potongan", "Artinya", "Pada ahmad@kampus.ac.id"], [
    ["`^`", "Mulai dari awal teks", "-"],
    ["`[^\\s@]+`", "Satu atau lebih karakter yang <strong>bukan</strong> spasi (<code>\\s</code>) dan bukan <code>@</code>", "<code>ahmad</code>"],
    ["`@`", "Satu tanda @", "<code>@</code>"],
    ["`[^\\s@]+`", "Nama domain", "<code>kampus.ac</code> ➕"],
    ["`\\.`", "Titik sungguhan. Tanpa garis miring terbalik, titik berarti \"karakter apa saja\"", "<code>.</code>"],
    ["`[^\\s@]+`", "Akhiran", "<code>id</code>"],
    ["`$`", "Teks harus selesai di sini (tidak boleh ada sisa, termasuk spasi)", "-"]
  ], [
    { label: "➕ Kenapa kampus.ac?", target: "row", row: 3, title: "Regex mencari titik terakhir yang masih cocok", text: "<code>[^\\s@]+</code> boleh berisi titik, jadi bagian domain mengambil <code>kampus.ac</code>, lalu <code>\\.</code> memakai titik terakhir, dan akhiran <code>id</code>. Hasil akhirnya tetap lolos." },
    { label: "^ ganda", target: "row", row: 1, title: "Dua arti ^", text: "<code>^</code> di awal pola = awal teks. <code>^</code> sebagai karakter pertama di dalam <code>[ ]</code> = \"selain\"." },
    { label: "+", target: "row", row: 1, title: "Satu atau lebih", text: "Tanpa <code>+</code>, hanya satu karakter yang boleh. Dengan <code>*</code>, nol karakter pun boleh, sehingga <code>@kampus.id</code> ikut lolos." }
  ]),
  { type: "reveal", label: "Tebak Hasil", title: "Lolos Pola Email Modul?", items: [
    { prompt: "`ahmad@kampus.ac.id`", answer: "true", reason: "Bentuk teks@teks.teks lengkap." },
    { prompt: "`ahmad@kampus`", answer: "false", reason: "Tidak ada titik dan akhiran setelah @." },
    { prompt: "`ahmad@@kampus.id`", answer: "false", reason: "Domain tidak boleh mengandung @." },
    { prompt: "`a@b.c`", answer: "true", reason: "Pendek, tetapi bentuknya cocok." },
    { prompt: "`ahmad@kampus.ac.id ` (ada spasi di akhir)", answer: "false", reason: "<code>$</code> mewajibkan teks selesai; spasi bukan bagian pola." }
  ] },
  A("3c. Field Wajib, Panjang, dan Select", `<p><strong>Field wajib</strong>: ${c("!input.value")} menangkap kolom kosong. ➕ Isian berisi spasi saja (${c('"   "')}) tidak kosong, jadi lolos. Bersihkan dulu dengan ${c("input.value.trim()")}, yang membuang spasi di awal dan akhir.</p>
<p><strong>Panjang</strong>: ${c(".length")} menghitung jumlah karakter, termasuk spasi. Tugas modul meminta nama minimal 3 karakter: ${c("nama.value.trim().length < 3")} → ditolak.</p>
<p><strong>Select</strong>: opsi pertama "Pilih Jurusan" sengaja diberi ${c('value=""')}. Selama opsi itu yang terpilih, ${c("jurusan.value")} kosong, sehingga cek field wajib yang sama bisa dipakai.</p>
<p><strong>Pesan error</strong>: modul menampilkan pesan di ${c('<span id="nim-error" class="error">')} di bawah kolom, diisi dengan ${c("textContent")}. Ini lebih ramah daripada alert karena semua kesalahan terlihat sekaligus dan pengguna tahu kolom mana yang harus diperbaiki. Saran modul: pesan harus jelas dan spesifik, misalnya "Email harus mengandung @ dan domain", bukan sekadar "Input salah".</p>`),
  salah([
    `Lupa mengosongkan pesan error di awal. Pesan lama tetap tampil walau kolomnya sudah benar.`,
    `Memakai ${c("return")} di cek pertama yang gagal. Hanya satu error yang tampil; pengguna harus mengirim berkali-kali untuk melihat kesalahan berikutnya.`,
    `Membaca ${c("nimInput")} (elemennya) padahal yang dicek isinya, ${c("nimInput.value")}.`,
    `Menulis regex sebagai string: ${c('"^[^\\s@]+@…$"')}. Itu teks biasa, tidak punya method ${c("test")}. Regex ditulis di antara ${c("/ /")}.`,
    `Lupa ${c("form.reset()")} setelah data valid diproses, sehingga data lama masih ada di kolom.`
  ]),

  A("➕ Validasi Bawaan HTML5", `<p>Sebelum JavaScript berjalan, browser sudah bisa mengecek beberapa atribut sendiri. Aktivitas modul sebenarnya memakai dua di antaranya: ${c("required")} dan ${c('type="email"')}.</p>
<p>Akibatnya, kalau kolom ${c("required")} dikosongkan, browser menolak submit dengan gelembung bawaannya ("Please fill out this field") dan event submit <strong>tidak pernah terjadi</strong>. Pesan merah dari JavaScript tidak muncul. Ini bukan error; begitulah urutannya.</p>
<p>Kapan dipakai: atribut HTML5 cukup untuk form sederhana. JavaScript dipakai kalau aturannya rumit atau pesan errornya ingin ditampilkan sendiri. Kalau semua ingin ditangani JavaScript, tambahkan ${c("novalidate")} pada ${c("<form>")}.</p>`, "Bagian 4"),
  tbl("Atribut Validasi HTML5", ["Atribut", "Artinya", "Contoh"], [
    ["`required`", "Wajib diisi", "`<input name=\"nama\" required>`"],
    ["`type=\"email\"`", "Harus berbentuk email", "`<input type=\"email\">`"],
    ["`minlength` / `maxlength`", "Panjang minimal/maksimal", "`<input minlength=\"3\">`"],
    ["`pattern`", "Harus cocok dengan regex (tanpa / /, otomatis dari awal sampai akhir)", "`<input pattern=\"\\d{10}\">`"],
    ["`novalidate`", "Dipasang di form: matikan semua cek bawaan browser", "`<form id=\"f\" novalidate>`"]
  ]),

  A("Validasi di Klien dan di Server", `<p><strong>Klien</strong> adalah browser pengguna; <strong>server</strong> adalah komputer yang menerima data (mulai P10: PHP). Validasi JavaScript berjalan di klien, jadi cepat: pesan muncul tanpa menunggu server.</p>
<p>Tetapi semua yang berjalan di klien bisa diubah pengguna: JavaScript dimatikan, kode diubah lewat DevTools, atau data dikirim langsung tanpa melewati form. Karena itu modul menegaskan: validasi di klien untuk UX, tetapi <strong>selalu validasi lagi di server</strong> untuk keamanan. Cara validasi di server dibahas di P11 (${c("empty()")}, ${c("filter_var()")}, ${c("htmlspecialchars()")}).</p>`, "Bagian 5"),
  tbl("Klien vs Server", ["", "Validasi klien (JavaScript, P9)", "Validasi server (PHP, P11)"], [
    ["Berjalan di", "Browser pengguna", "Server (Apache + PHP)"],
    ["Kelebihan", "Cepat, pesan langsung muncul", "Tidak bisa dilewati pengguna"],
    ["Kekurangan", "Bisa dimatikan atau dilewati", "Perlu kirim data dulu, lebih lambat"],
    ["Fungsinya", "Kenyamanan (UX)", "Keamanan dan keutuhan data"]
  ]),
  tip("Hubungan dengan proyek akhir", "Form pendaftaran mahasiswa (NIM, nama, jurusan, email) di proyek CRUD memakai validasi ini sebelum datanya dikirim ke PHP dan disimpan ke MySQL (P11–P13). Tugas P9 juga memakai lagi teknik P7: menambah baris tabel dengan <code>createElement</code> dan <code>appendChild</code>.", "info")
];

// ───────────────────────────── P10 ─────────────────────────────
M.p10 = [
  A("Klien dan Server: Di Mana PHP Berjalan", `<p>Sampai P9, semua kode (HTML, CSS, JavaScript) dikirim ke browser lalu dijalankan <strong>di browser</strong> (sisi klien). <strong>PHP</strong> berbeda: kodenya dijalankan <strong>di server</strong>, dan yang dikirim ke browser hanya hasilnya berupa HTML.</p>
<p>Karena dijalankan di server, PHP bisa melakukan hal yang tidak bisa dilakukan JavaScript di browser: membaca data form secara aman, menyimpan file di server, dan berbicara dengan database MySQL (P12–P13). Inilah dasar fungsi Create dan Read di aplikasi CRUD.</p>
<p>Istilah <strong>konten dinamis</strong>: isi halaman disusun saat diminta, sehingga bisa berbeda tiap kali dibuka (misalnya salam yang berubah sesuai jam, atau daftar mahasiswa dari database). Lawannya <strong>HTML statis</strong>: isinya sama persis seperti yang ditulis di file.</p>`, "Bagian 1"),
  tbl("JavaScript vs PHP", ["", "JavaScript (P6–P9)", "PHP (P10–P13)"], [
    ["Dijalankan di", "Browser (klien)", "Server (Apache + PHP)"],
    ["Kode terlihat di View Page Source?", "Ya", "Tidak, hanya hasilnya"],
    ["Bisa dibuka dengan klik dua kali file?", "Ya", "Tidak, harus lewat http://localhost"],
    ["Contoh tugas", "Validasi form, ubah DOM", "Olah data form, simpan ke file/database"]
  ]),

  A("XAMPP: Server di Laptop Sendiri", `<p>PHP butuh server. Untuk belajar, server dipasang di laptop sendiri dengan <strong>XAMPP</strong>, paket open-source berisi <strong>Apache</strong> (server web), <strong>MySQL/MariaDB</strong> (server database), <strong>PHP</strong>, dan <strong>Perl</strong>. Huruf X berarti cross-platform: ada versi Windows, macOS, dan Linux.</p>
<p>Langkah modul: unduh dari ${c("https://www.apachefriends.org")} → instal (pilih Apache dan PHP) → buka <strong>XAMPP Control Panel</strong> → klik <strong>Start</strong> pada Apache, dan MySQL kalau butuh database → simpan proyek di folder ${c("htdocs")} → buka ${c("http://localhost/nama_folder")}.</p>
<p><strong>localhost</strong> berarti "komputer ini sendiri". <strong>htdocs</strong> adalah folder akar yang dilayani Apache: isi htdocs = isi ${c("http://localhost/")}. Saran modul: buat subfolder per proyek, misalnya ${c("htdocs/crud-mahasiswa")}.</p>
<p>➕ Di mata kuliah Basis Data, server lokal yang dipakai adalah <strong>MAMP</strong>. Konsepnya sama: ada Apache, MySQL, PHP, dan folder dokumen (di MAMP namanya ${c("htdocs")} juga). Bedanya ada di porta dan kata sandi root (lihat P12).</p>`, "Bagian 2"),
  { type: "steps", label: "Praktik Terpandu", title: "Dari Instal sampai phpinfo()", desc: "Klik tiap langkah. Tandai yang sudah berhasil di laptopmu.", items: [
    { title: "Unduh dan instal XAMPP", how: "Dari <strong>apachefriends.org</strong>, sesuai sistem operasi. Pada pilihan komponen, pastikan Apache dan PHP tercentang (MySQL dan phpMyAdmin juga untuk P12).", ok: "folder <code>C:\\xampp</code> ada." },
    { title: "Start Apache", how: "Buka <strong>XAMPP Control Panel</strong>, klik <strong>Start</strong> di baris Apache.", ok: "label Apache berwarna hijau, kolom Port(s) menunjukkan 80 (dan 443).", fail: "kalau Apache langsung berhenti, porta 80 sedang dipakai aplikasi lain. Tutup aplikasinya, atau ubah porta lewat Config → httpd.conf (Listen 8080), lalu buka <code>http://localhost:8080/</code>." },
    { title: "Buat folder proyek", how: "Buat folder <code>crud-mahasiswa</code> di <code>C:\\xampp\\htdocs</code>.", ok: "<code>http://localhost/crud-mahasiswa/</code> menampilkan daftar isi folder (masih kosong)." },
    { title: "Buat test.php", how: "Di <code>htdocs</code>, buat file <code>test.php</code> berisi <code>&lt;?php phpinfo(); ?&gt;</code>. Pastikan akhirannya benar-benar <code>.php</code>, bukan <code>test.php.txt</code> (aktifkan File name extensions di File Explorer).", ok: "file tersimpan." },
    { title: "Buka lewat localhost", how: "Ketik <code>http://localhost/test.php</code> di browser.", ok: "muncul tabel ungu berisi versi PHP: instalasi berhasil.", fail: "kalau yang tampil kode mentah atau unduhan file, alamatnya bukan http://localhost atau Apache belum Start." }
  ] },
  salah([
    `Membuka file .php dengan klik dua kali. Alamatnya ${c("file:///C:/…")}, Apache tidak ikut, kode PHP tidak dijalankan.`,
    `Menulis ${c("htdocs")} di alamat: ${c("http://localhost/htdocs/…")} → 404 Not Found.`,
    `Menyimpan file di luar htdocs (Desktop, Documents). Apache tidak melayani folder itu.`,
    `Lupa Start Apache, atau Apache berhenti karena porta 80 bentrok. Browser menampilkan "This site can't be reached".`,
    `Nama file ${c("welcome.php.txt")} karena ekstensi tersembunyi di Windows.`
  ]),

  A("Sintaks Dasar PHP", `<p><strong>Tag PHP</strong>: kode ditulis di antara ${c("<?php")} dan ${c("?>")}, di dalam file berekstensi ${c(".php")}. Di luar tag itu, isi file dikirim apa adanya sebagai HTML. Kalau file hanya berisi PHP, ${c("?>")} di akhir boleh tidak ditulis.</p>
<p><strong>Titik koma</strong>: setiap pernyataan diakhiri ${c(";")}. Kalau lupa, PHP menunjuk galat di baris <em>berikutnya</em> ("unexpected token"), jadi periksa baris di atas yang ditunjuk.</p>
<p><strong>Komentar</strong> ➕: ${c("// satu baris")}, ${c("# satu baris")}, ${c("/* beberapa baris */")}. Tidak ikut dijalankan dan tidak terkirim ke browser.</p>`, "Bagian 3"),
  A("3a. Variabel", `<p><strong>Variabel</strong> adalah nama untuk menyimpan nilai. Di PHP selalu diawali ${c("$")}, lalu huruf atau garis bawah (bukan angka). Tipe data tidak ditulis; PHP menentukannya dari nilai yang diisikan.</p>
${ul([`${c('$nama = "Ahmad";')} → string (teks)`, `${c("$umur = 20;")} → integer (bilangan bulat)`, `${c("$ipk = 3.75;")} ➕ → float (desimal, pakai titik)`, `${c("$aktif = true;")} → boolean (true/false)`])}
<p>Nama variabel <strong>peka huruf besar/kecil</strong>: ${c("$nama")} dan ${c("$Nama")} berbeda. Memakai variabel yang belum diisi menghasilkan <em>Warning: Undefined variable</em>. Saran modul: pakai nama yang deskriptif (${c("$namaMahasiswa")}, bukan ${c("$x")}).</p>`),
  A("3b. echo dan String", `<p>${c("echo")} menampilkan teks atau HTML ke halaman. Apa pun yang di-echo menjadi bagian dari HTML yang dikirim ke browser, jadi tag ikut diproses: ${c('echo "<p>Halo</p>";')} menghasilkan paragraf.</p>
<p><strong>Kutip ganda</strong> ${c('"…"')} membaca variabel di dalamnya: ${c('"Selamat datang, $nama!"')} → <em>Selamat datang, Ahmad!</em>. <strong>Kutip tunggal</strong> ${c("'…'")} menampilkan apa adanya: <em>Selamat datang, $nama!</em>. Karena itu modul menyarankan kutip ganda untuk string yang mengandung variabel.</p>
<p>Untuk menyambung string, PHP memakai <strong>titik</strong> ${c(".")}: ${c('"Nama: " . $nama')}. Tanda ${c("+")} hanya untuk angka; di PHP 8, ${c('"Nama: " + $nama')} menghasilkan <em>TypeError</em>. Ini kebalikan dari JavaScript, yang memakai + untuk keduanya.</p>`),
  tbl("Hasil echo", ["Kode (dengan $nama = \"Ahmad\")", "Tampil di browser", "Catatan"], [
    ["`echo \"Halo, $nama!\";`", "Halo, Ahmad!", "Kutip ganda membaca variabel"],
    ["`echo 'Halo, $nama!';`", "Halo, $nama!", "Kutip tunggal apa adanya"],
    ["`echo \"Halo, \" . $nama;`", "Halo, Ahmad", "Titik menyambung"],
    ["`echo \"<p>$nama</p>\";`", "Ahmad (sebagai paragraf)", "Tag ikut diproses browser"],
    ["`echo true;` ➕", "1", "false tampil kosong; pakai var_dump() untuk melihat boolean"]
  ]),
  A("3c. Kondisi if, elseif, else dan Operator", `<p><strong>if-else</strong> menjalankan kode berdasarkan kondisi. Kondisi dicek dari atas; blok pertama yang bernilai true dijalankan, sisanya dilewati. PHP menulis kondisi lanjutan sebagai ${c("elseif")} (satu kata); ${c("else if")} (dua kata) juga diterima.</p>
<p><strong>Operator perbandingan</strong>: ${c("==")} (nilai sama), ${c("===")} (nilai dan tipe sama), ${c("!=")} (tidak sama), ${c(">")}, ${c("<")}, ${c(">=")}, ${c("<=")}. <strong>Operator logika</strong>: ${c("&&")} (dan), ${c("||")} (atau), ${c("!")} (bukan).</p>
<p>Kapan ${c("==")} dan kapan ${c("===")}: data dari form selalu string (${c('"20"')}), jadi ${c('"20" == 20')} true tetapi ${c('"20" === 20')} false. Pakai ${c("===")} kalau tipenya juga harus sama.</p>`),
  code("welcome.php", `<?php
date_default_timezone_set("Asia/Makassar"); // ➕ WITA; WIB = Asia/Jakarta
$nama = "Pengunjung";
$waktu = date("H:i");        // jam:menit, misalnya "09:15"

if ($waktu < "12:00") {
    $salam = "Selamat Pagi";
} elseif ($waktu < "18:00") {
    $salam = "Selamat Siang";
} else {
    $salam = "Selamat Malam";
}
echo "<p>$salam, $nama! Waktu sekarang: $waktu</p>";
?>`, "Aktivitas modul. Perbandingan \"09:15\" < \"12:00\" adalah perbandingan teks; aman karena format H selalu dua digit.", "Aktivitas modul (dengan zona waktu)"),
  tip("➕ Dua jebakan di aktivitas welcome.php", ul([
    `<strong>Zona waktu</strong>: ${c("date()")} memakai zona di php.ini, yang di banyak instalasi XAMPP diisi ${c("Europe/Berlin")} atau UTC. Salam bisa salah beberapa jam. Atur dengan ${c("date_default_timezone_set()")}.`,
    `<strong>Jam sebagai teks</strong>: ${c('"9:30" < "12:00"')} bernilai false karena dibandingkan huruf demi huruf ("9" > "1"). Format ${c("H")} selalu dua digit (${c("09")}), jadi aman. Format ${c("G")} tanpa nol di depan membuat perbandingan salah.`,
    `Modifikasi kedua modul memakai ${c('date("D")')}: hasilnya singkatan hari berbahasa Inggris (${c("Mon")}…${c("Sun")}), jadi bandingkan dengan teks itu, misalnya ${c('if (date("D") == "Fri")')}.`
  ]), "warn"),

  A("PHP di dalam HTML", `<p>File .php boleh berisi HTML biasa, lalu PHP disisipkan di bagian yang perlu dinamis: ${c('<h1><?php echo "Judul Dinamis"; ?></h1>')}. Apache mengirim bagian HTML apa adanya dan mengganti setiap blok PHP dengan hasilnya.</p>
<p>➕ Singkatan ${c('<?= $judul ?>')} sama dengan ${c("<?php echo $judul; ?>")}. Praktis untuk menyisipkan satu nilai.</p>`, "Bagian 4"),
  A("Membaca Isian Form dengan $_POST (Tugas P10)", `<p>Tugas modul meminta form nama dan email dengan ${c('method="POST"')}, lalu hasilnya ditampilkan di halaman yang sama (${c('action=""')}). Tiga hal baru yang dipakai:</p>
${ul([`${c('$_SERVER["REQUEST_METHOD"]')}: cara halaman ini diminta. Saat alamat dibuka biasa nilainya ${c('"GET"')}; setelah form dikirim, ${c('"POST"')}. Dipakai untuk membedakan "baru dibuka" dan "baru dikirim".`, `${c('$_POST["nama"]')}: isi kolom yang atribut ${c('name')}-nya ${c('"nama"')}. Kuncinya diambil dari atribut <strong>name</strong>, bukan id.`, `${c("empty($x)")}: true kalau ${c("$x")} kosong. ➕ Hati-hati, ${c('"0"')} juga dianggap kosong.`])}
<p>Pembahasan lengkap GET, POST, ${c("isset()")}, dan keamanan input ada di P11.</p>`),
  code("user-data.php (bagian PHP)", `<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = $_POST["nama"];
    $email = $_POST["email"];
    if (!empty($nama) && !empty($email)) {
        echo "<h3>Data Pengguna:</h3>";
        echo "<p>Nama: $nama</p>";
        echo "<p>Email: $email</p>";
    } else {
        echo "<p>Harap isi semua field!</p>";
    }
} else {
    echo "<p>Belum ada data yang dikirim.</p>";
}
?>`, "Contoh tugas modul. ➕ Isian langsung di-echo; kalau berisi tag HTML, tag itu ikut dijalankan (XSS). Perbaikannya, htmlspecialchars(), dibahas di P11."),
  salah([
    `Lupa ${c("$")}: ${c('nama = "Ahmad";')} → Parse error.`,
    `Menyambung dengan ${c("+")} seperti JavaScript → TypeError. Pakai titik.`,
    `Menulis variabel di kutip tunggal lalu heran isinya tidak muncul.`,
    `${c('$_POST["Nama"]')} padahal atributnya ${c('name="nama"')} → Warning: Undefined array key. Kunci peka huruf besar/kecil.`,
    `Mengambil ${c("$_POST")} dengan id kolom. Yang dikirim hanya kolom yang punya atribut ${c("name")}.`
  ]),
  tip("Hubungan dengan proyek akhir", "PHP adalah langkah awal fungsi <strong>Create</strong> dan <strong>Read</strong>: membaca data dari form (P10–P11), lalu menyimpan dan menampilkannya dari database MySQL (P12–P13). Form ini nanti juga memakai validasi JavaScript dari P9.", "info")
];

// ───────────────────────────── P11 ─────────────────────────────
M.p11 = [
  A("Dari Form ke Server", `<p>Form HTML punya dua atribut yang menentukan ke mana dan bagaimana data dikirim. ${c("action")} adalah alamat file PHP yang menerima data (kosong = halaman itu sendiri). ${c("method")} adalah cara mengirimnya: ${c("GET")} atau ${c("POST")}.</p>
<p>Yang dikirim hanya kolom yang punya atribut ${c("name")}. Nilai ${c("name")} menjadi <strong>kunci</strong> di PHP: ${c('<input name="email">')} dibaca dengan ${c('$_POST["email"]')}. Atribut ${c("id")} tidak ikut terkirim; ${c("id")} hanya untuk ${c("<label for>")}, CSS, dan JavaScript.</p>`, "Bagian 1"),
  A("1a. Metode GET", `<p><strong>GET</strong> menempelkan data ke URL sebagai <strong>query string</strong>: diawali ${c("?")}, berisi pasangan ${c("name=nilai")}, dipisah ${c("&")}. Contoh: ${c("proses.php?nama=Ahmad&email=ahmad@example.com")}. Di PHP, data dibaca dari ${c("$_GET")}.</p>
<p>Karena ada di URL, data GET terlihat di address bar, tersimpan di riwayat browser, dan bisa di-bookmark. Panjangnya juga terbatas. Kapan dipakai (modul): data yang <strong>tidak sensitif dan kecil</strong>, misalnya kata pencarian atau filter. ➕ Link biasa juga mengirim GET, jadi ${c('<a href="detail.php?id=5">')} bisa dibaca dengan ${c('$_GET["id"]')}; pola ini dipakai untuk tombol Edit/Hapus di P13.</p>`),
  A("1b. Metode POST", `<p><strong>POST</strong> mengirim data di <strong>body</strong> pesan HTTP, setelah header. URL tetap bersih. Di PHP, data dibaca dari ${c("$_POST")}. Kapan dipakai (modul): data <strong>sensitif atau besar</strong>, seperti form pendaftaran, email, password, atau pesan panjang.</p>
<p>➕ "Tidak terlihat di URL" tidak sama dengan rahasia. Isi POST tetap bisa dilihat di DevTools (Network) dan bisa dibaca orang di jaringan kalau situsnya tidak memakai HTTPS. Yang membuat data aman di perjalanan adalah HTTPS, bukan POST.</p>`),
  tbl("Bandingkan GET dan POST", ["", "GET", "POST"], [
    ["Data dikirim lewat", "URL (query string)", "Body HTTP"],
    ["Terlihat di address bar / riwayat", "Ya", "Tidak"],
    ["Bisa di-bookmark", "Ya", "Tidak"],
    ["Batas ukuran", "Kecil (panjang URL)", "Besar"],
    ["Dibaca di PHP", "`$_GET[\"…\"]`", "`$_POST[\"…\"]`"],
    ["Contoh", "Pencarian, filter, link detail", "Pendaftaran, login, form kontak"]
  ], [
    { label: "Refresh ➕", target: "row", row: 1, title: "Confirm Form Resubmission", text: "Me-refresh halaman hasil POST membuat browser bertanya apakah data mau dikirim ulang. Kalau di-iyakan, data bisa tersimpan dua kali. Halaman hasil GET aman di-refresh." }
  ]),
  { type: "reveal", label: "Tebak Hasil", title: "URL Apa yang Muncul?", desc: "Form berisi kolom <code>name=\"nama\"</code> dan <code>name=\"jurusan\"</code>, diisi <em>Ahmad</em> dan <em>SI</em>.", items: [
    { prompt: "`<form method=\"GET\" action=\"cari.php\">`", answer: "cari.php?nama=Ahmad&jurusan=SI", reason: "GET menempelkan data ke URL." },
    { prompt: "`<form method=\"POST\" action=\"cari.php\">`", answer: "cari.php", reason: "Data ada di body, URL bersih." },
    { prompt: "`<form action=\"cari.php\">` (tanpa method) ➕", answer: "cari.php?nama=Ahmad&jurusan=SI", reason: "Method bawaan form adalah GET." },
    { prompt: "Kolom `<input id=\"nim\">` tanpa atribut name ➕", answer: "Tidak ikut terkirim", reason: "Hanya kolom ber-name yang dikirim." }
  ] },

  ADG.pwdGetPost,
  A("Mengolah Input di Server: Ambil, Bersihkan, Validasi, Simpan", `<p>Modul 11 menyusun pengolahan form menjadi empat langkah. Urutannya penting: data dicek dulu sebelum disimpan atau ditampilkan.</p>`, "Bagian 2"),
  A("2a. Ambil dengan isset()", `<p>Membaca ${c('$_POST["nama"]')} padahal kolom itu tidak terkirim (misalnya halaman baru dibuka dengan GET) menghasilkan <em>Warning: Undefined array key "nama"</em>. ${c("isset()")} memeriksa apakah variabel atau kunci itu <strong>ada</strong> dan bukan null.</p>
<p>Pola di modul memakai <strong>operator ternary</strong> ${c("kondisi ? nilaiJikaTrue : nilaiJikaFalse")}:</p>
<p>${c('$nama = isset($_POST["nama"]) ? $_POST["nama"] : "";')}</p>
<p>Artinya: kalau kolom nama ada, ambil isinya; kalau tidak, pakai string kosong. ➕ PHP punya singkatan yang sama artinya: ${c('$nama = $_POST["nama"] ?? "";')}</p>
<p>Halaman yang menampilkan form dan memprosesnya sekaligus juga mengecek ${c('$_SERVER["REQUEST_METHOD"] == "POST"')} dulu, supaya validasi tidak berjalan saat halaman baru dibuka.</p>`),
  A("2b. Bersihkan dengan htmlspecialchars()", `<p>Apa pun yang diketik pengguna bisa berisi tag HTML atau JavaScript. Kalau isian itu di-echo begitu saja, browser menjalankannya. Penyerang bisa mengisi nama dengan ${c("<script>…</script>")}, dan script itu berjalan di browser setiap orang yang membuka halaman. Serangan ini disebut <strong>XSS (Cross-Site Scripting)</strong>, sama seperti bahaya ${c("innerHTML")} di P7.</p>
<p>${c("htmlspecialchars()")} mengubah karakter khusus HTML menjadi <strong>entitas</strong> (kode teks): ${c("<")} → ${c("&lt;")}, ${c(">")} → ${c("&gt;")}, ${c("&")} → ${c("&amp;")}, ${c('"')} → ${c("&quot;")}. Browser lalu menampilkannya sebagai tulisan, tidak menjalankannya.</p>
<p>Bentuk lengkap di modul: ${c('htmlspecialchars($_POST["nama"], ENT_QUOTES, "UTF-8")')}. ${c("ENT_QUOTES")} ikut mengubah kutip tunggal (${c("'")} → ${c("&#039;")}), ${c('"UTF-8"')} memastikan huruf non-Inggris tidak rusak.</p>
<p>Kapan dipakai: setiap kali data dari pengguna <strong>ditampilkan</strong> ke halaman HTML. ➕ Fungsi ini tidak melindungi query database; untuk itu ada <em>prepared statement</em> (P13).</p>`),
  tbl("Sebelum dan Sesudah htmlspecialchars", ["Isian pengguna", "Tanpa dibersihkan", "Dengan htmlspecialchars"], [
    ["`<b>Ahmad</b>`", "<strong>Ahmad</strong> (tebal)", "&lt;b&gt;Ahmad&lt;/b&gt; (tulisan biasa)"],
    ["`<script>alert(1)</script>`", "Kotak alert muncul: script dijalankan", "Tampil sebagai tulisan, tidak dijalankan"],
    ["`Jum'at \"x\" & y`", "Tampil normal, tetapi bisa merusak atribut HTML", "`Jum&#039;at &quot;x&quot; &amp; y` di kode sumber"]
  ]),
  A("2c. Validasi di Server: empty() dan filter_var()", `<p>${c("empty($x)")} bernilai true jika ${c("$x")} <strong>kosong</strong>: string kosong, ${c("null")}, ${c("0")}, ${c("false")}, dan juga string ${c('"0"')}. Dipakai untuk field wajib. Bedanya dengan ${c("isset")}: kolom yang dikirim kosong itu <em>ada</em> (isset true) tetapi <em>kosong</em> (empty true).</p>
<p>${c("filter_var($email, FILTER_VALIDATE_EMAIL)")} memeriksa format email. Hasilnya email itu sendiri kalau valid (dianggap true di ${c("if")}), atau ${c("false")} kalau tidak. Lebih teliti daripada regex sederhana P9.</p>
<p>Kenapa harus di server juga, padahal P9 sudah memvalidasi di browser? Karena semua yang ada di browser bisa diubah pengguna: JavaScript dimatikan, atribut ${c("required")} dihapus lewat DevTools, atau data dikirim langsung tanpa form. Modul menegaskan: <strong>selalu validasi di server</strong>.</p>`),
  code("validasi-server.php", `<?php
if (empty($nama)) {
    echo "Nama wajib diisi!";
} elseif (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    echo "Format email tidak valid!";
}

// Hasil filter_var:
// "ahmad@kampus.ac.id" → "ahmad@kampus.ac.id"
// "ahmad@kampus"       → false
// "ahmad kampus@x.id"  → false
?>`, "Contoh dari modul. Tanda ! membalik hasil: !false = true, sehingga pesan error tampil."),
  A("2d. Simpan ke File Teks dengan file_put_contents()", `<p>Sebelum memakai database, modul berlatih menyimpan data ke file teks. ${c('file_put_contents("data.txt", $data, FILE_APPEND)')} menulis isi ${c("$data")} ke ${c("data.txt")} (dibuat otomatis kalau belum ada, di folder yang sama dengan file PHP).</p>
<p>${c("FILE_APPEND")} artinya <strong>tambahkan di akhir</strong>. Tanpa itu, isi file lama <strong>ditimpa</strong> dan hanya data terakhir yang tersisa. Akhiri setiap data dengan ${c('"\\n"')} (baris baru) agar satu data = satu baris. Ini yang dimaksud modul dengan "format yang terstruktur".</p>
<p>Kapan cukup memakai file teks: latihan, log sederhana. Untuk data yang perlu dicari, diubah, dan dihapus (CRUD), file teks merepotkan; itulah alasan beralih ke MySQL di P12.</p>`),
  salah([
    `Membaca ${c('$_POST["nama"]')} tanpa ${c("isset")} saat halaman dibuka dengan GET → Warning: Undefined array key.`,
    `Memakai ${c("$_GET")} padahal form ${c('method="POST"')} (atau sebaliknya). Hasilnya selalu kosong.`,
    `Menampilkan input pengguna tanpa ${c("htmlspecialchars")} → celah XSS.`,
    `Lupa ${c("FILE_APPEND")} → file berisi satu data terakhir saja.`,
    `Lupa ${c('"\\n"')} di akhir data → semua data menempel di satu baris.`,
    `Mengira validasi server tidak berjalan, padahal browser sudah menolak lebih dulu karena ${c("required")}. Uji dengan ${c("novalidate")}.`
  ]),

  code("contact-form.php (bagian PHP)", `<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama  = isset($_POST["nama"])  ? htmlspecialchars($_POST["nama"])  : "";
    $email = isset($_POST["email"]) ? htmlspecialchars($_POST["email"]) : "";
    $pesan = isset($_POST["pesan"]) ? htmlspecialchars($_POST["pesan"]) : "";

    if (!empty($nama) && !empty($email) && !empty($pesan)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $data = "Nama: $nama, Email: $email, Pesan: $pesan\\n";
            file_put_contents("contacts.txt", $data, FILE_APPEND);
            echo "<p class='success'>Pesan berhasil disimpan!</p>";
        } else {
            echo "<p class='error'>Format email tidak valid!</p>";
        }
    } else {
        echo "<p class='error'>Harap isi semua field!</p>";
    }
}
?>`, "Contoh tugas modul: textarea pesan, validasi, simpan ke contacts.txt. ➕ Pesan yang berisi Enter memecah satu data menjadi dua baris; ganti dulu dengan str_replace([\"\\r\", \"\\n\"], \" \", $pesan).", "Tugas: form kontak ke file teks"),
  tip("Hubungan dengan proyek akhir", "Pengolahan form adalah fungsi <strong>Create</strong>. Polanya (ambil → bersihkan → validasi → simpan) tetap sama di P13; yang berubah hanya langkah simpan: dari <code>file_put_contents</code> menjadi query <code>INSERT</code> ke MySQL.", "info")
];

// ───────────────────────────── P12 ─────────────────────────────
M.p12 = [
  A("Database: Tempat Data Aplikasi Tinggal", `<p>Di P11, data form disimpan ke file teks: satu baris per data. Cara itu cukup untuk menambah data, tetapi merepotkan untuk mencari, mengubah, atau menghapus satu data tertentu. Aplikasi CRUD butuh penyimpanan yang lebih rapi: <strong>database</strong>.</p>
<p><strong>Database</strong> adalah kumpulan data yang terorganisir, biasanya dalam bentuk <strong>tabel</strong>. Satu tabel berisi data sejenis. Tabel tersusun dari <strong>kolom</strong> (field: jenis keterangan, misalnya ${c("nim")}, ${c("nama")}) dan <strong>baris</strong> (record: satu data lengkap, misalnya satu mahasiswa).</p>
<p><strong>MySQL</strong> adalah sistem manajemen database relasional (RDBMS) open-source yang populer untuk aplikasi web. "Relasional" berarti data disimpan dalam tabel-tabel yang bisa dihubungkan. Di XAMPP, MySQL (versi barunya MariaDB) berjalan di porta 3306 setelah di-Start.</p>
<p>➕ Istilah-istilah ini sama dengan yang dipelajari di mata kuliah Basis Data (P1–P7). Bedanya, di PWD database dipakai dari dalam program PHP.</p>`, "Bagian 1"),
  tbl("Satu Tabel, Banyak Istilah", ["Istilah", "Nama lain", "Pada tabel mahasiswa"], [
    ["Database", "Basis data", "<code>db_mahasiswa</code>"],
    ["Tabel", "Relasi", "<code>mahasiswa</code>"],
    ["Kolom", "Field, atribut", "<code>id</code>, <code>nim</code>, <code>nama</code>, <code>jurusan</code>, <code>email</code>"],
    ["Baris", "Record, tuple", "<code>1 | 2401010001 | Ahmad | Sistem Informasi | ahmad@example.com</code>"]
  ]),

  A("phpMyAdmin: Mengelola MySQL dari Browser", `<p><strong>phpMyAdmin</strong> adalah aplikasi web (ditulis dengan PHP) untuk mengelola MySQL tanpa harus mengetik perintah di terminal. Dibuka di ${c("http://localhost/phpmyadmin")} setelah Apache <strong>dan</strong> MySQL di XAMPP di-Start.</p>
<p>Fungsinya menurut modul: membuat database, membuat tabel, menambah data, dan menjalankan query SQL. Ada dua cara membuat tabel: <strong>klik</strong> (isi nama tabel, jumlah kolom, lalu jenis tiap kolom) atau <strong>ketik SQL</strong> di tab SQL. Hasilnya sama.</p>`, "Bagian 2"),
  { type: "steps", label: "Praktik Terpandu", title: "Membuat db_mahasiswa di phpMyAdmin", desc: "Langkah aktivitas modul. Klik tiap langkah.", items: [
    { title: "Start Apache dan MySQL", how: "Di XAMPP Control Panel, klik Start pada <strong>Apache</strong> dan <strong>MySQL</strong>.", ok: "keduanya berwarna hijau." },
    { title: "Buka phpMyAdmin", how: "Ketik <code>http://localhost/phpmyadmin</code>.", ok: "daftar database tampil di kiri.", fail: "kalau halaman tidak terbuka, Apache belum jalan. Kalau muncul <code>#2002</code> atau <em>Connection refused</em>, MySQL belum jalan." },
    { title: "Buat database", how: "Klik <strong>New</strong> (Baru) di kiri, isi <code>db_mahasiswa</code>, klik <strong>Create</strong>. Atau di tab SQL: <code>CREATE DATABASE db_mahasiswa;</code>", ok: "db_mahasiswa muncul di daftar kiri." },
    { title: "Buat tabel mahasiswa", how: "Pilih db_mahasiswa, buka tab <strong>SQL</strong>, tempel perintah CREATE TABLE dari modul, klik <strong>Go</strong>. Cara klik: isi nama <code>mahasiswa</code>, 5 kolom, lalu isi Name/Type/Length; pada id centang <strong>A_I</strong> (AUTO_INCREMENT) dan pilih Index <strong>PRIMARY</strong>.", ok: "tabel mahasiswa muncul di bawah db_mahasiswa." },
    { title: "Periksa struktur", how: "Klik tabel mahasiswa → tab <strong>Structure</strong>.", ok: "5 kolom; id bertanda kunci (primary) dan Extra = auto_increment." }
  ] },

  A("Merancang Tabel mahasiswa", `<p>Setiap kolom diberi <strong>nama</strong>, <strong>tipe data</strong>, dan aturan tambahan. Tabel dari modul:</p>`, "Bagian 3"),
  code("SQL", `CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(10) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);`, "Satu baris = satu kolom. Antarkolom dipisah koma; kolom terakhir tanpa koma."),
  tbl("Arti Setiap Kata Kunci", ["Kata kunci", "Artinya", "Kapan dipakai", "Kesalahan umum"], [
    ["`INT`", "Bilangan bulat", "Angka yang dihitung atau nomor urut (id, jumlah)", "Dipakai untuk NIM/nomor HP: nol di depan hilang"],
    ["`VARCHAR(n)`", "Teks dengan panjang maksimal n karakter", "Nama, email, jurusan, NIM", "n terlalu kecil: data panjang ditolak (Data too long)"],
    ["`NOT NULL`", "Wajib diisi, tidak boleh kosong (NULL)", "Kolom yang harus selalu ada isinya", "INSERT tanpa kolom itu ditolak"],
    ["`PRIMARY KEY`", "Pengenal unik setiap baris, tidak boleh kembar", "Satu kolom per tabel, biasanya id", "Memasukkan id yang sudah ada: Duplicate entry"],
    ["`AUTO_INCREMENT`", "Diisi otomatis dengan nomor berikutnya", "Kolom id (harus juga PRIMARY KEY)", "Mengisi id manual di INSERT; biarkan MySQL yang mengisi"]
  ], [
    { label: "Kenapa id, bukan nim?", target: "row", row: 3, title: "Kunci yang tidak pernah berubah", text: "NIM bisa saja salah ketik dan perlu diperbaiki. id buatan (AUTO_INCREMENT) tidak punya arti lain selain pengenal, jadi tidak perlu diubah. Di P13, id inilah yang dipakai untuk UPDATE dan DELETE (<code>WHERE id = …</code>)." },
    { label: "Nomor tidak dipakai ulang", target: "row", row: 4, title: "Setelah DELETE", text: "Kalau baris id 2 dihapus, baris baru berikutnya tetap mendapat id 3 (atau lebih), bukan 2. Celah nomor itu normal." }
  ]),
  tip("Praktik terbaik dari modul", ul(["Nama database dan tabel yang deskriptif (<code>db_mahasiswa</code>, <code>mahasiswa</code>).", "Kolom <code>id</code> sebagai PRIMARY KEY dengan AUTO_INCREMENT.", "Tipe data sesuai isi: VARCHAR untuk teks, INT untuk angka."]), "success"),

  A("Menghubungkan PHP ke MySQL", `<p>phpMyAdmin dipakai oleh <em>kita</em>. Agar <em>program</em> PHP bisa menyimpan dan membaca data, PHP harus membuka <strong>koneksi</strong> ke MySQL dengan ${c("mysqli_connect()")}. Huruf i pada <em>mysqli</em> berarti <em>improved</em>, pengganti fungsi lama ${c("mysql_…")} yang sudah dihapus dari PHP.</p>
<p>${c("mysqli_connect()")} menerima empat argumen <strong>berurutan</strong>: host (${c('"localhost"')}), username (${c('"root"')}), password (di XAMPP kosong: ${c('""')}), dan nama database (${c('"db_mahasiswa"')}). Hasilnya disimpan di variabel, biasanya ${c("$conn")}. Variabel inilah yang dipakai setiap kali menjalankan query.</p>
<p>Koneksi bisa gagal: MySQL belum di-Start, password salah, atau nama database salah. Modul memeriksanya dengan ${c("if (!$conn)")}, lalu ${c("die()")} menghentikan halaman sambil menampilkan pesan, dan ${c("mysqli_connect_error()")} memberi tahu penyebabnya. Setelah selesai, koneksi ditutup dengan ${c("mysqli_close($conn)")}.</p>`, "Bagian 4"),
  code("connect-db.php (bagian PHP)", `<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "db_mahasiswa";

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    echo "<p class='error'>Koneksi gagal: " . mysqli_connect_error() . "</p>";
} else {
    echo "<p class='success'>Koneksi ke database berhasil!</p>";
    mysqli_close($conn);
}
?>`, "Aktivitas modul. Modifikasinya: tampilkan nama database (\"Terhubung ke $database\"), lalu pindahkan koneksi ke config.php.", "Aktivitas modul"),
  tbl("Pesan Gagal Koneksi dan Artinya", ["Pesan (bagian akhir)", "Penyebab", "Perbaikan"], [
    ["No connection could be made … actively refused it / Connection refused", "MySQL belum berjalan", "Start MySQL di XAMPP"],
    ["Access denied for user 'root'@'localhost' (using password: YES)", "Password salah", "XAMPP: <code>\"\"</code>; MAMP: <code>\"root\"</code>"],
    ["Unknown database 'db_mahasiswa'", "Database belum dibuat atau salah eja", "Buat di phpMyAdmin, cocokkan ejaannya"],
    ["Call to undefined function mysqli_connect()", "Ekstensi mysqli tidak aktif", "Aktifkan <code>extension=mysqli</code> di php.ini (di XAMPP sudah aktif)"]
  ], [
    { label: "➕ Fatal error", target: "none", title: "PHP 8.1 ke atas", text: "Sejak PHP 8.1, koneksi yang gagal langsung menjadi <em>Fatal error: Uncaught mysqli_sql_exception</em>, jadi baris <code>if (!$conn)</code> tidak sempat dijalankan. Penyebabnya tetap terbaca di pesan itu. Kalau ingin pesan buatan sendiri seperti di modul, tulis <code>mysqli_report(MYSQLI_REPORT_OFF);</code> sebelum <code>mysqli_connect</code>." }
  ]),
  A("config.php dan include", `<p>Hampir setiap halaman aplikasi CRUD butuh koneksi yang sama. Daripada menulis empat variabel dan ${c("mysqli_connect")} berulang-ulang, modul menyarankan menyimpannya di <strong>satu file</strong>, ${c("config.php")}. Halaman lain cukup menulis ${c("include 'config.php';")}: isi config.php seolah-olah disalin ke tempat itu, sehingga ${c("$conn")} langsung bisa dipakai.</p>
<p>Keuntungannya: kalau password atau nama database berubah, cukup ubah di satu tempat. ➕ ${c("require")} mirip ${c("include")}, bedanya kalau file tidak ditemukan ${c("require")} menghentikan halaman (Fatal error), sedangkan ${c("include")} hanya memberi Warning lalu lanjut.</p>`),
  code("create-table.php (bagian PHP)", `<?php
include 'config.php';   // $conn sudah tersedia

$sql = "CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(10) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
)";

if (mysqli_query($conn, $sql)) {
    echo "<p class='success'>Tabel mahasiswa berhasil dibuat atau sudah ada!</p>";
} else {
    echo "<p class='error'>Gagal membuat tabel: " . mysqli_error($conn) . "</p>";
}
mysqli_close($conn);
?>`, "Tugas modul (versi dengan config.php). mysqli_query($conn, $sql) menjalankan SQL dan bernilai true jika berhasil; mysqli_error($conn) berisi pesan kalau gagal.", "Tugas: membuat tabel dari PHP"),
  salah([
    `Lupa Start MySQL (hanya Apache). phpMyAdmin dan PHP sama-sama gagal terhubung.`,
    `Urutan argumen ${c("mysqli_connect")} tertukar, misalnya nama database di posisi password.`,
    `Memakai password ${c('"root"')} di XAMPP (itu milik MAMP), atau sebaliknya.`,
    `Menulis ${c("CREATE TABLE")} tanpa ${c("IF NOT EXISTS")}, lalu halaman di-refresh → Table 'mahasiswa' already exists.`,
    `Koma setelah kolom terakhir: ${c("email VARCHAR(100) NOT NULL,")} lalu ${c(")")} → error sintaks SQL.`,
    `Memanggil ${c("mysqli_query($sql)")} tanpa ${c("$conn")}. Argumen pertama harus koneksinya.`
  ]),
  tip("Hubungan dengan proyek akhir", "Database <code>db_mahasiswa</code> dan tabel <code>mahasiswa</code> ini dipakai langsung di P13: <code>INSERT</code> untuk Create, <code>SELECT</code> untuk Read, <code>UPDATE</code>, dan <code>DELETE</code>. Semuanya dijalankan lewat <code>mysqli_query($conn, $sql)</code> dengan <code>$conn</code> dari config.php.", "info")
];

// ───────────────────────────── P13 ─────────────────────────────
const CRUD_RAPI = `<?php
include 'config.php';
$pesan = "";
$edit = null;

// Validasi bersama untuk Create dan Update
function cekInput($nim, $nama, $jurusan, $email) {
    if ($nim === "" || $nama === "" || $jurusan === "" || $email === "") return "Harap isi semua field!";
    if (strlen($nim) != 10 || !ctype_digit($nim)) return "NIM harus 10 digit angka!";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return "Format email tidak valid!";
    return "";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nim = trim($_POST["nim"] ?? "");
    $nama = trim($_POST["nama"] ?? "");
    $jurusan = trim($_POST["jurusan"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $salah = cekInput($nim, $nama, $jurusan, $email);

    if ($salah !== "") {
        $pesan = "<p class='error'>$salah</p>";
    } elseif (isset($_POST["create"])) {
        // CREATE dengan prepared statement: ? diisi terpisah dari SQL
        $stmt = mysqli_prepare($conn, "INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssss", $nim, $nama, $jurusan, $email);
        $pesan = mysqli_stmt_execute($stmt)
            ? "<p class='success'>Data berhasil ditambahkan!</p>"
            : "<p class='error'>Gagal menambahkan data: " . mysqli_error($conn) . "</p>";
    } elseif (isset($_POST["update"])) {
        // UPDATE berdasarkan id dari input hidden
        $id = (int) $_POST["id"];
        $stmt = mysqli_prepare($conn, "UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ?, email = ? WHERE id = ?");
        mysqli_stmt_bind_param($stmt, "ssssi", $nim, $nama, $jurusan, $email, $id);
        $pesan = mysqli_stmt_execute($stmt)
            ? "<p class='success'>Data berhasil diperbarui!</p>"
            : "<p class='error'>Gagal memperbarui data: " . mysqli_error($conn) . "</p>";
    }
}

// DELETE lewat link ?delete=id
if (isset($_GET["delete"])) {
    $id = (int) $_GET["delete"];
    $stmt = mysqli_prepare($conn, "DELETE FROM mahasiswa WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    $pesan = mysqli_stmt_execute($stmt)
        ? "<p class='success'>Data berhasil dihapus!</p>"
        : "<p class='error'>Gagal menghapus data: " . mysqli_error($conn) . "</p>";
}

// Ambil data yang mau diedit (link ?edit=id), SEBELUM form ditampilkan
if (isset($_GET["edit"])) {
    $id = (int) $_GET["edit"];
    $stmt = mysqli_prepare($conn, "SELECT * FROM mahasiswa WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $edit = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
}

// Isi kolom form: data yang diedit, atau kosong
function isi($edit, $kolom) {
    return htmlspecialchars($edit[$kolom] ?? "");
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Aplikasi CRUD Mahasiswa</title>
    <link rel="stylesheet" href="crud-mahasiswa.css">
</head>
<body>
    <header><h1>Sistem Manajemen Mahasiswa</h1></header>
    <main>
        <section>
            <h2><?= $edit ? "Edit Data Mahasiswa" : "Form Pendaftaran Mahasiswa" ?></h2>
            <?= $pesan ?>
            <form method="POST" action="crud-mahasiswa.php">
                <input type="hidden" name="id" value="<?= isi($edit, "id") ?>">
                <label for="nim">NIM:</label>
                <input type="text" id="nim" name="nim" value="<?= isi($edit, "nim") ?>" required>
                <label for="nama">Nama:</label>
                <input type="text" id="nama" name="nama" value="<?= isi($edit, "nama") ?>" required>
                <label for="jurusan">Jurusan:</label>
                <select id="jurusan" name="jurusan" required>
                    <option value="">Pilih Jurusan</option>
                    <?php foreach (["Sistem Informasi", "Teknik Informatika", "Manajemen"] as $j): ?>
                        <option value="<?= $j ?>" <?= isi($edit, "jurusan") === $j ? "selected" : "" ?>><?= $j ?></option>
                    <?php endforeach; ?>
                </select>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="<?= isi($edit, "email") ?>" required>
                <?php if ($edit): ?>
                    <button type="submit" name="update">Perbarui</button>
                    <a href="crud-mahasiswa.php">Batal</a>
                <?php else: ?>
                    <button type="submit" name="create">Tambah</button>
                <?php endif; ?>
            </form>
        </section>
        <section>
            <h2>Daftar Mahasiswa</h2>
            <table>
                <thead><tr><th>NIM</th><th>Nama</th><th>Jurusan</th><th>Email</th><th>Aksi</th></tr></thead>
                <tbody>
                <?php
                $result = mysqli_query($conn, "SELECT * FROM mahasiswa ORDER BY id");
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>";
                        echo "<td>" . htmlspecialchars($row["nim"]) . "</td>";
                        echo "<td>" . htmlspecialchars($row["nama"]) . "</td>";
                        echo "<td>" . htmlspecialchars($row["jurusan"]) . "</td>";
                        echo "<td>" . htmlspecialchars($row["email"]) . "</td>";
                        echo "<td><a href='?edit=" . $row["id"] . "' class='btn'>Edit</a> ";
                        echo "<a href='?delete=" . $row["id"] . "' class='btn btn-danger' onclick='return confirm(\\"Yakin ingin menghapus?\\")'>Hapus</a></td>";
                        echo "</tr>";
                    }
                } else {
                    echo "<tr><td colspan='5'>Belum ada data mahasiswa.</td></tr>";
                }
                mysqli_close($conn);
                ?>
                </tbody>
            </table>
        </section>
    </main>
    <footer><p>&copy; 2025 Universitas Contoh</p></footer>
</body>
</html>
`;
M.p13 = [
  A("CRUD: Empat Hal yang Dilakukan Aplikasi Data", `<p>Hampir semua aplikasi pengelola data (data mahasiswa, perpustakaan, toko daring) hanya melakukan empat operasi, disingkat <strong>CRUD</strong>:</p>
${ul(["<strong>Create</strong>: menambah data baru, misalnya mendaftarkan mahasiswa baru.", "<strong>Read</strong>: membaca atau menampilkan data, misalnya daftar mahasiswa.", "<strong>Update</strong>: memperbarui data yang sudah ada, misalnya mengubah email.", "<strong>Delete</strong>: menghapus data."])}
<p>Setiap operasi punya satu perintah SQL. Di P12 tabelnya sudah dibuat; di P13 PHP menjalankan keempat perintah itu dengan ${c("mysqli_query($conn, $sql)")}, memakai ${c("$conn")} dari ${c("config.php")}.</p>`, "Bagian 1"),
  tbl("Operasi, Query, dan Tombol di Aplikasi", ["CRUD", "Query SQL", "Dipicu oleh", "Hasil mysqli_query"], [
    ["Create", "`INSERT INTO … VALUES …`", "Form + tombol Tambah (POST)", "true / false"],
    ["Read", "`SELECT … FROM …`", "Setiap kali halaman dibuka", "result (dibaca dengan mysqli_fetch_assoc)"],
    ["Update", "`UPDATE … SET … WHERE id = …`", "Link Edit → form → tombol Perbarui (POST)", "true / false"],
    ["Delete", "`DELETE FROM … WHERE id = …`", "Link Hapus + confirm() (GET)", "true / false"]
  ]),

  ADG.pwdCrud,
  A("Query Dasar MySQL", `<p>Contoh di bawah memakai tabel ${c("mahasiswa")} dari P12. Teks ditulis di antara kutip tunggal (${c("'Ahmad'")}); angka seperti id tidak perlu kutip.</p>`, "Bagian 2"),
  A("2a. SELECT (Read)", `<p>${c("SELECT kolom FROM tabel WHERE syarat;")} mengambil data. ${c("*")} berarti semua kolom. ${c("WHERE")} menyaring baris; tanpa WHERE semua baris diambil.</p>
<p>Contoh modul: ${c("SELECT * FROM mahasiswa;")} (semua data) dan ${c("SELECT nim, nama FROM mahasiswa WHERE jurusan = 'Sistem Informasi';")} (hanya nim dan nama mahasiswa SI). ➕ Bisa ditambah ${c("ORDER BY nama")} untuk mengurutkan.</p>`),
  A("2b. INSERT (Create)", `<p>${c("INSERT INTO tabel (kolom1, kolom2, …) VALUES (nilai1, nilai2, …);")} menambah satu baris. Urutan nilai harus sama dengan urutan kolom yang disebut. Kolom ${c("id")} tidak ditulis karena diisi AUTO_INCREMENT.</p>
<p>Contoh modul: ${c("INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES ('1234567890', 'Ahmad', 'Sistem Informasi', 'ahmad@example.com');")}</p>`),
  A("2c. UPDATE (Update)", `<p>${c("UPDATE tabel SET kolom = nilai_baru WHERE syarat;")} mengubah data yang sudah ada. Beberapa kolom sekaligus dipisah koma: ${c("SET nim='…', nama='…', email='…'")}.</p>
<p>Contoh modul: ${c("UPDATE mahasiswa SET email = 'ahmad@new.com' WHERE id = 1;")}. <strong>WHERE wajib</strong>: tanpa WHERE, email <em>semua</em> mahasiswa berubah menjadi ahmad@new.com, dan tidak ada tombol undo.</p>`),
  A("2d. DELETE (Delete)", `<p>${c("DELETE FROM tabel WHERE syarat;")} menghapus baris. Contoh modul: ${c("DELETE FROM mahasiswa WHERE id = 1;")}. Tanpa WHERE, semua baris terhapus (strukturnya tetap ada; yang menghapus tabel adalah ${c("DROP TABLE")}).</p>
<p>Kenapa UPDATE dan DELETE memakai ${c("id")}, bukan nama? Nama bisa kembar; ${c("id")} adalah PRIMARY KEY, dijamin unik, sehingga yang terkena pasti satu baris.</p>`),
  salah([
    `UPDATE atau DELETE tanpa WHERE → semua baris berubah/terhapus. Biasakan menulis WHERE lebih dulu.`,
    `Lupa kutip pada teks: ${c("WHERE jurusan = Sistem Informasi")} → error sintaks. Yang benar ${c("'Sistem Informasi'")}.`,
    `Jumlah kolom dan nilai di INSERT berbeda → <em>Column count doesn't match value count</em>.`,
    `${c("UPDATE mahasiswa email = …")} tanpa SET → error sintaks.`,
    `Memakai kutip ganda untuk teks di dalam string PHP yang juga berkutip ganda, sehingga string PHP terputus. Di dalam ${c('"…"')} PHP, teks SQL ditulis dengan kutip tunggal.`
  ]),

  A("Menjalankan Query dari PHP", `<p>Langkahnya selalu sama: ${c("include 'config.php';")} untuk mendapat ${c("$conn")}, susun query di string ${c("$sql")}, lalu jalankan ${c("mysqli_query($conn, $sql)")}.</p>
<p>Untuk INSERT, UPDATE, dan DELETE, ${c("mysqli_query")} menghasilkan ${c("true")} kalau berhasil. Modul memakainya di ${c("if")} untuk menampilkan pesan sukses, dan menampilkan ${c("mysqli_error($conn)")} kalau gagal. Saran modul: selalu periksa keberhasilan query dan tampilkan pesan kepada pengguna.</p>
<p>Untuk SELECT, hasilnya berupa <strong>result</strong>: kumpulan baris yang dibaca satu per satu. ${c("mysqli_num_rows($result)")} memberi jumlah barisnya. ${c("mysqli_fetch_assoc($result)")} mengambil <strong>satu</strong> baris sebagai array asosiatif, dengan nama kolom sebagai kunci (${c('$row["nama"]')}). Setiap pemanggilan maju ke baris berikutnya; setelah baris terakhir hasilnya ${c("null")}. Karena itu dipakai di ${c("while")}: perulangan berjalan sampai baris habis.</p>`, "Bagian 3"),
  { type: "reveal", label: "Tebak Hasil", title: "Isi $row di Setiap Putaran", desc: "<code>SELECT nim, nama FROM mahasiswa WHERE jurusan = 'Sistem Informasi'</code> menghasilkan 2 baris (Ahmad, Citra).", items: [
    { prompt: "`mysqli_num_rows($result)`", answer: "2", reason: "Dua mahasiswa SI." },
    { prompt: "Pemanggilan pertama `mysqli_fetch_assoc($result)`", answer: "[\"nim\" => \"2401010001\", \"nama\" => \"Ahmad\"]", reason: "Baris pertama; hanya kolom yang di-SELECT." },
    { prompt: "Pemanggilan kedua", answer: "[\"nim\" => \"2401010003\", \"nama\" => \"Citra\"]", reason: "Maju ke baris berikutnya." },
    { prompt: "Pemanggilan ketiga", answer: "null", reason: "Baris habis; while berhenti." },
    { prompt: "`$row[\"email\"]` di dalam loop ini", answer: "Warning: Undefined array key \"email\"", reason: "Kolom email tidak ikut di-SELECT." }
  ] },

  A("Aktivitas: crud-simple.php (Create + Read)", `<p>Aktivitas modul menggabungkan form dan tabel dalam satu halaman. Bagian PHP pertama berjalan hanya kalau form dikirim dan tombolnya ${c('name="create"')}: ambil dan bersihkan input (${c("htmlspecialchars")}), validasi (semua terisi, email valid, NIM 10 digit angka dengan ${c("strlen")} dan ${c("is_numeric")}), lalu ${c("INSERT")}. Bagian PHP kedua selalu berjalan: ${c("SELECT * FROM mahasiswa")} lalu menyusun baris tabel.</p>
<p>Karena bagian Read berjalan setelah Create, data yang baru ditambah langsung tampil di tabel pada halaman yang sama. Modifikasi modul: validasi nama minimal 3 karakter (${c("strlen($nama) < 3")}) dan link ke phpMyAdmin untuk memeriksa datanya.</p>`, "Bagian 4"),
  A("Tugas: Update dan Delete lewat Link", `<p>Tugas modul menambah kolom <strong>Aksi</strong> di setiap baris tabel, berisi dua link yang membawa ${c("id")} baris itu di query string:</p>
${ul([`${c("<a href='?edit=3'>Edit</a>")}: membuka halaman yang sama dengan ${c("$_GET[\"edit\"]")} = 3. PHP menjalankan ${c("SELECT * FROM mahasiswa WHERE id = 3")} dan menyimpan hasilnya di ${c("$edit_data")} untuk mengisi form.`, `Form edit membawa id lewat ${c('<input type="hidden" name="id">')}: tidak terlihat, tetapi ikut terkirim. Tombol ${c('name="update"')} memicu ${c("UPDATE … WHERE id = $id")}.`, `${c("<a href='?delete=3' onclick='return confirm(\"Yakin ingin menghapus?\")'>Hapus</a>")}: ${c("confirm()")} menampilkan OK/Cancel; Cancel membatalkan link. OK membuka ${c("?delete=3")}, lalu PHP menjalankan ${c("DELETE … WHERE id = 3")}.`])}
<p>Validasi tugas: semua field wajib, NIM 10 digit angka, email valid, dan pesan sukses/error setelah setiap operasi.</p>`),
  tip("➕ Catatan saat mencoba contoh tugas modul", ul([
    `<strong>Form edit tidak terisi.</strong> Form ditulis <em>di atas</em> blok PHP yang membaca ${c("$_GET[\"edit\"]")}, dan input-nya tidak punya atribut ${c("value")}. Akibatnya ${c("$edit_id")} belum ada saat form ditampilkan, tombol Perbarui tetap tersembunyi, dan id hidden kosong. Perbaikannya: jalankan semua PHP pemroses di <strong>atas</strong> form, lalu isi ${c('value="<?= htmlspecialchars($edit_data["nim"] ?? "") ?>"')} di setiap kolom.`,
    `<strong>SQL Injection.</strong> ${c("$_GET[\"edit\"]")}, ${c("$_GET[\"delete\"]")}, dan ${c("$_POST[\"id\"]")} masuk mentah ke SQL. Alamat ${c("?delete=1 OR 1=1")} menghapus semua data.`,
    `<strong>Koreksi modul:</strong> ${c("htmlspecialchars()")} disebut untuk mencegah SQL Injection. Fungsi itu untuk XSS. Yang mencegah SQL Injection adalah <em>prepared statements</em>, yang juga disarankan modul.`
  ]), "warn"),

  A("➕ SQL Injection dan Prepared Statement", `<p><strong>SQL Injection</strong> terjadi kalau isian pengguna disambung langsung ke string SQL, sehingga isian itu bisa <em>mengubah perintahnya</em>. Contoh: kode ${c('"DELETE FROM mahasiswa WHERE id = $id"')} dengan ${c("$id")} dari alamat ${c("?delete=1 OR 1=1")} menjadi ${c("DELETE FROM mahasiswa WHERE id = 1 OR 1=1")}. Karena ${c("1=1")} selalu benar, semua baris terhapus. Pada kolom teks, isian ${c("' OR '1'='1")} bisa membuat syarat WHERE selalu benar.</p>
<p><strong>Prepared statement</strong> memisahkan perintah dan data. Query ditulis dengan tanda tanya sebagai tempat nilai: ${c("DELETE FROM mahasiswa WHERE id = ?")}. Nilainya dikirim terpisah dengan ${c("mysqli_stmt_bind_param")}. Apa pun isinya, MySQL memperlakukannya sebagai <em>nilai</em>, tidak pernah sebagai bagian perintah.</p>
<p>Huruf tipe di ${c("bind_param")}: ${c("s")} = string, ${c("i")} = integer, satu huruf per tanda tanya. Contoh: ${c('"ssss"')} untuk nim, nama, jurusan, email; ${c('"ssssi"')} kalau ditambah id.</p>`, "Bagian 5"),
  code("prepared.php", `<?php
// Tanpa prepared statement (rawan):
$sql = "DELETE FROM mahasiswa WHERE id = " . $_GET["delete"];

// Dengan prepared statement:
$id = (int) $_GET["delete"];                       // pastikan angka
$stmt = mysqli_prepare($conn, "DELETE FROM mahasiswa WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $id);           // i = integer
mysqli_stmt_execute($stmt);

// INSERT: empat tanda tanya, empat nilai string
$stmt = mysqli_prepare($conn, "INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES (?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, "ssss", $nim, $nama, $jurusan, $email);
mysqli_stmt_execute($stmt);
?>`, "Dengan prepared statement, nilai disimpan apa adanya (Jum'at tetap Jum'at). htmlspecialchars dipakai saat MENAMPILKAN data ke HTML, bukan saat menyimpan."),
  code("crud-mahasiswa.php", CRUD_RAPI, "Versi lengkap tugas: PHP pemroses di atas form, form edit terisi, semua query memakai prepared statement, data ditampilkan dengan htmlspecialchars. config.php sama dengan P12. Kode ini lolos pemeriksaan sintaks PHP 8.3.", "➕ Versi rapi tugas CRUD (Create, Read, Update, Delete)"),
  salah([
    `Menaruh ${c("include 'config.php'")} di bawah kode yang sudah memakai ${c("$conn")} → Undefined variable $conn.`,
    `Lupa ${c("name")} pada tombol, sehingga ${c('isset($_POST["create"])')} selalu false dan tidak ada yang tersimpan.`,
    `Memakai ${c("$_POST")} untuk id dari link Edit/Hapus. Link mengirim GET.`,
    `Menampilkan data dari database tanpa ${c("htmlspecialchars")} → XSS dari data yang pernah disimpan.`,
    `Me-refresh halaman setelah Tambah: browser mengirim POST ulang dan data tersimpan dua kali. ➕ Solusinya, setelah berhasil arahkan ulang dengan ${c('header("Location: crud-mahasiswa.php");')} lalu ${c("exit;")}.`
  ]),
  tip("Hubungan dengan proyek akhir", "Aplikasi CRUD data mahasiswa adalah inti proyek akhir: validasi JavaScript (P9) di browser, pengolahan form dan validasi server (P11), koneksi config.php (P12), dan empat query CRUD (P13). Pengembangan yang disarankan modul: perbaiki UI/UX, tambah pencarian atau pengurutan data, dan autentikasi pengguna.", "info")
];

module.exports = M;
