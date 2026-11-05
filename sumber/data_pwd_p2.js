// Pemrograman Web Dinamis — Pertemuan 2: HTML5 Semantik, Formulir & Jenis Input (+ Tabel untuk tugas)
// Sumber: Modul 2 (Struktur dan Semantik HTML), Modul Tambahan (Macam-Macam Tag Input), soal Assignment dari dosen.
// Bagian bertanda "➕ Tambahan" bukan dari modul.
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

const TYPES = ["text", "email", "number", "date", "radio", "checkbox", "password", "file", "hidden", "select", "textarea"];
const SEM = ["header", "nav", "main", "section", "article", "aside", "footer"];

const STARTER_PRAKTIK = `<!DOCTYPE html>
<html lang="id">
<head>
    <title>Form Pendaftaran Mahasiswa</title>
</head>
<body>
    <header>
        <h1>Sistem Pendaftaran Mahasiswa</h1>
    </header>
    <main>
        <section>
            <h2>Form Pendaftaran</h2>
            <form action="#" method="POST">
                <label for="nim">NIM:</label>
                <input type="text" id="nim" name="nim" required>
                <label for="nama">Nama:</label>
                <input type="text" id="nama" name="nama" required>
                <label for="jurusan">Jurusan:</label>
                <select id="jurusan" name="jurusan" required>
                    <option value="">Pilih Jurusan</option>
                    <option value="sistem_informasi">Sistem Informasi</option>
                    <option value="teknik_informatika">Teknik Informatika</option>
                    <option value="manajemen">Manajemen</option>
                </select>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <button type="submit">Daftar</button>
            </form>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Universitas Contoh</p>
    </footer>
</body>
</html>`;

const SOLUSI_PRAKTIK = `<!DOCTYPE html>
<html lang="id">
<head>
    <title>Form Pendaftaran Mahasiswa</title>
</head>
<body>
    <header>
        <h1>Sistem Pendaftaran Mahasiswa</h1>
    </header>
    <nav>
        <a href="#beranda">Beranda</a> |
        <a href="#kontak">Kontak</a>
    </nav>
    <main>
        <section>
            <h2>Form Pendaftaran</h2>
            <p>Isi form berikut untuk mendaftarkan data mahasiswa baru.</p>
            <form action="#" method="POST">
                <label for="nim">NIM:</label>
                <input type="text" id="nim" name="nim" required><br>
                <label for="nama">Nama:</label>
                <input type="text" id="nama" name="nama" required><br>
                <label for="jurusan">Jurusan:</label>
                <select id="jurusan" name="jurusan" required>
                    <option value="">Pilih Jurusan</option>
                    <option value="sistem_informasi">Sistem Informasi</option>
                    <option value="teknik_informatika">Teknik Informatika</option>
                    <option value="manajemen">Manajemen</option>
                </select><br>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br>
                <label for="catatan">Catatan:</label><br>
                <textarea id="catatan" name="catatan" rows="4" cols="40"></textarea><br>
                <button type="submit">Daftar</button>
            </form>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Universitas Contoh</p>
    </footer>
</body>
</html>`;

const STARTER_TUGAS = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Mahasiswa</title>
</head>
<body>
    <!-- 1. Kalimat perkenalan / sambutan -->

    <!-- 2. Tabel: min. 3 kolom & 4 baris (termasuk header) -->

    <!-- 3. Form: Nama, Umur (17-100), Email, Tanggal Lahir -->
    <!--    Bonus: Hobi (checkbox), Jenis Kelamin (radio), Jurusan (dropdown), tombol "Kirim Data" -->

</body>
</html>`;

const SOLUSI_TUGAS = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Mahasiswa</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f0f7ff; padding: 16px;">

    <h1 style="color: #1e3a8a;">Selamat datang di halaman data mahasiswa!</h1>
    <p>Halaman ini digunakan untuk melihat dan mengelola data mahasiswa. Di bawah ini ada tabel data mahasiswa dan form untuk menambahkan data baru.</p>

    <h3>Data Mahasiswa</h3>
    <table border="1" cellpadding="6" style="border-collapse: collapse; background-color: white;">
        <tr style="background-color: #1e3a8a; color: white;">
            <th>Nama</th>
            <th>NIM</th>
            <th>Jurusan</th>
        </tr>
        <tr>
            <td>Andi</td>
            <td>123456</td>
            <td>Sistem Informasi</td>
        </tr>
        <tr>
            <td>Budi</td>
            <td>123457</td>
            <td>Teknik Informatika</td>
        </tr>
        <tr>
            <td>Cici</td>
            <td>123458</td>
            <td>Desain Komunikasi Visual</td>
        </tr>
    </table>

    <h3>Input Data Mahasiswa</h3>
    <form action="#" method="POST">
        <label for="nama">Nama:</label><br>
        <input type="text" id="nama" name="nama" required><br><br>

        <label for="umur">Umur:</label><br>
        <input type="number" id="umur" name="umur" min="17" max="100" required><br><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>

        <label for="tgl_lahir">Tanggal Lahir:</label><br>
        <input type="date" id="tgl_lahir" name="tgl_lahir"><br><br>

        <label>Hobi:</label><br>
        <input type="checkbox" id="membaca" name="hobi[]" value="membaca">
        <label for="membaca">Membaca</label><br>
        <input type="checkbox" id="olahraga" name="hobi[]" value="olahraga">
        <label for="olahraga">Olahraga</label><br>
        <input type="checkbox" id="gaming" name="hobi[]" value="gaming">
        <label for="gaming">Gaming</label><br><br>

        <label>Jenis Kelamin:</label><br>
        <input type="radio" id="laki" name="jenis_kelamin" value="L" required>
        <label for="laki">Laki-laki</label><br>
        <input type="radio" id="perempuan" name="jenis_kelamin" value="P">
        <label for="perempuan">Perempuan</label><br><br>

        <label for="jurusan">Jurusan:</label><br>
        <select id="jurusan" name="jurusan" required>
            <option value="">-- Pilih Jurusan --</option>
            <option value="SI">Sistem Informasi</option>
            <option value="TI">Teknik Informatika</option>
            <option value="DKV">Desain Komunikasi Visual</option>
        </select><br><br>

        <button type="submit" style="background-color: #1e3a8a; color: white; padding: 6px 14px;">Kirim Data</button>
    </form>

</body>
</html>`;

module.exports = fix({
  id: "p2",
  nomor: 2,
  judul: "HTML5 Semantik, Formulir & Jenis Input",
  ujian: "UTS",
  hero: {
    badge: "Materi 2 • Pemrograman Web Dinamis",
    title: "Bikin Kerangka Halaman yang Rapi dan Form yang Siap Dikirim ke Server",
    text: "Pahami <strong>elemen semantik HTML5</strong>, <strong>formulir</strong> (<code><form></code>, <code><input></code>, <code><select></code>, <code><textarea></code>), <strong>10 jenis input</strong> beserta atributnya, lalu kerjakan <strong>tugas Data Mahasiswa</strong> di editor live. ➕ Ada juga materi <strong>tabel HTML</strong> yang dibutuhkan tugas tetapi tidak ada di modul."
  },
  cheatsheet: [
    {
      type: "cards",
      label: "Interaktif 1 • HTML5 & Elemen Semantik",
      title: "Kenapa Pakai Tag yang “Bermakna”?",
      desc: "<strong>HTML5</strong> = versi terbaru HTML dengan elemen, API, dan fitur baru untuk web modern. <strong>Elemen semantik</strong> = tag yang punya makna spesifik, sehingga kode lebih mudah dibaca manusia dan mesin.",
      cols: 3,
      items: [
        { badge: "Manfaat 1", tone: "emerald", title: "Aksesibilitas", text: "Screen reader paham mana menu, mana isi utama." },
        { badge: "Manfaat 2", tone: "sky", title: "SEO", text: "Mesin pencari lebih mudah mengindeks karena struktur jelas." },
        { badge: "Manfaat 3", tone: "violet", title: "Kolaborasi", text: "Kode lebih terorganisir sehingga mudah dikerjakan bersama." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "table",
          label: "Interaktif 2 • 7 Elemen Semantik Utama",
          title: "Peta Kerangka Halaman",
          headers: ["Elemen", "Isi / fungsi"],
          rows: [
            ["`<header>`", "Bagian atas halaman/section: logo, judul, navigasi"],
            ["`<nav>`", "Menu navigasi (link ke halaman lain)"],
            ["`<main>`", "Konten utama, <strong>hanya satu per halaman</strong>"],
            ["`<section>`", "Kelompok konten terkait (bagian artikel, form)"],
            ["`<article>`", "Konten mandiri: posting blog, berita"],
            ["`<aside>`", "Konten tambahan: sidebar, iklan"],
            ["`<footer>`", "Bagian bawah: copyright, kontak"]
          ],
          modes: [
            { label: "Jebakan: cuma satu", target: "row", row: 2, title: "`<main>` hanya satu", text: "<code><header></code>, <code><section></code>, <code><footer></code> boleh muncul berkali-kali, tetapi <code><main></code> hanya <strong>satu</strong> per halaman." },
            { label: "Section vs article", target: "row", row: 4, title: "Article = bisa berdiri sendiri", text: "Uji cepat: kalau konten itu dipindah ke situs lain tetap masuk akal (mis. satu berita), pakai <code><article></code>. Kalau hanya bagian dari halaman, pakai <code><section></code>." },
            { label: "Aturan pakai", target: "none", title: "Aturan penggunaan (modul)", text: "Gunakan sesuai konteks (<code><nav></code> hanya untuk navigasi), jangan berlebihan (jangan jadikan setiap <code><div></code> sebuah <code><section></code>), dan jaga hierarki tetap logis." }
          ]
        },
        {
          type: "code",
          title: "Contoh Struktur Semantik",
          file: "semantik.html",
          code: "<body>\n    <header>\n        <h1>Sistem Informasi Mahasiswa</h1>\n    </header>\n    <nav>\n        <ul>\n            <li><a href=\"#home\">Beranda</a></li>\n            <li><a href=\"#about\">Tentang</a></li>\n        </ul>\n    </nav>\n    <main>\n        <section>\n            <h2>Selamat Datang</h2>\n            <p>Ini adalah halaman utama aplikasi.</p>\n        </section>\n    </main>\n    <footer>\n        <p>&copy; 2025 Universitas Contoh</p>\n    </footer>\n</body>",
          note: "➕ <code>&copy;</code> adalah <em>entity</em> untuk simbol ©. Entity lain yang sering dipakai: <code>&lt;</code> (<), <code>&gt;</code> (>), <code>&amp;</code> (&), <code>&nbsp;</code> (spasi)."
        }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 3 • Elemen Formulir",
      title: "Isi “Kotak Perkakas” Form",
      desc: "Form adalah komponen kunci web dinamis: datanya nanti dikirim ke <strong>PHP</strong> untuk fungsi <strong>Create</strong> dan <strong>Update</strong> pada aplikasi CRUD.",
      cols: 4,
      items: [
        { badge: "&lt;form&gt;", tone: "indigo", title: "Wadah utama", text: "<code>action</code> = URL tujuan data • <code>method</code> = GET atau POST." },
        { badge: "&lt;input&gt;", tone: "sky", title: "Input serbaguna", text: "Jenisnya ditentukan atribut <code>type</code>." },
        { badge: "&lt;select&gt; + &lt;option&gt;", tone: "emerald", title: "Dropdown", text: "Daftar pilihan." },
        { badge: "&lt;textarea&gt;", tone: "amber", title: "Teks panjang", text: "Mis. catatan. Punya tag penutup, bisa diatur <code>rows</code> & <code>cols</code>." },
        { badge: "&lt;label&gt;", tone: "violet", title: "Label input", text: "Untuk aksesibilitas; <code>for</code> harus sama dengan <code>id</code> input." },
        { badge: "&lt;button&gt;", tone: "rose", title: "Tombol", text: "Alternatif <code><input type=\"submit\"></code>; teksnya ditulis di antara tag." },
        { badge: "➕ &lt;fieldset&gt;", title: "Kelompok input", text: "Membingkai beberapa input, judulnya dengan <code><legend></code>." },
        { badge: "Praktik terbaik", title: "3 kebiasaan modul", text: "Selalu pakai <code><label></code>, <code>required</code> untuk input penting, <code>method=\"POST\"</code> untuk data sensitif." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 4 • ➕ GET vs POST",
      title: "Saklar Method: <strong>GET</strong> vs <strong>POST</strong>",
      desc: "Modul menanyakannya di bagian refleksi, tetapi belum menjelaskan. Ini sering keluar di ujian.",
      style: "toggle",
      options: [
        { label: "method=\"GET\"", tone: "sky", badge: "Data di URL", title: "Data ditempel di alamat sebagai query string",
          code: "cari.php?nama=Andi&jurusan=SI",
          text: "<ul><li>Terlihat di address bar dan riwayat browser</li><li>Bisa di-bookmark/dibagikan</li><li>Panjang data terbatas</li><li>Cocok untuk <strong>pencarian/filter</strong></li></ul>",
          note: "Jika <code>method</code> tidak ditulis, defaultnya <strong>GET</strong>." },
        { label: "method=\"POST\"", tone: "rose", badge: "Data di body request", title: "Data dikirim di dalam isi (body) request HTTP",
          code: "POST /simpan.php\n\nnama=Andi&jurusan=SI",
          text: "<ul><li>Tidak tampil di URL</li><li>Tidak dibatasi panjang URL, bisa kirim file</li><li>Cocok untuk <strong>password, data pribadi, simpan/ubah data</strong> (Create & Update)</li></ul>",
          note: "Catatan: POST tidak otomatis terenkripsi; keamanan sebenarnya dari <strong>HTTPS</strong>." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 5 • 10 Jenis &lt;input&gt;",
      title: "Kamus Atribut type (Modul Tambahan)",
      desc: "Klik tombol untuk mengelompokkan jenis input.",
      headers: ["type", "Fungsi", "Atribut khas", "Contoh di data mahasiswa"],
      rows: [
        ["`text`", "Teks pendek", "`maxlength`, `placeholder`", "NIM, nama"],
        ["`email`", "Email + validasi format otomatis", "`pattern`, `placeholder`", "email"],
        ["`number`", "Angka + tombol naik/turun", "`min`, `max`, `step`", "tahun masuk, umur"],
        ["`date`", "Tanggal dengan kalender", "`min`, `max` (format YYYY-MM-DD)", "tanggal lahir"],
        ["`radio`", "Pilih <strong>satu</strong> dari beberapa", "`name` sama, `value`", "status aktif/tidak"],
        ["`checkbox`", "Pilih <strong>beberapa</strong>", "`name`, `value`, `checked`", "mata kuliah favorit"],
        ["`password`", "Teks tersembunyi", "`minlength`", "kata sandi"],
        ["`file`", "Unggah file", "`accept`", "foto profil"],
        ["`submit` / `reset`", "Kirim / kosongkan form", "`value` = teks tombol", "Simpan, Reset"],
        ["`hidden`", "Data tak terlihat tapi ikut terkirim", "`name`, `value`", "id mahasiswa saat update"]
      ],
      modes: [
        { label: "Validasi otomatis browser", target: "row", row: 1, title: "email, number, date", text: "Browser menolak format yang salah sebelum form dikirim: email tanpa <code>@</code>, angka di luar <code>min</code>/<code>max</code>, tanggal tidak valid." },
        { label: "Pilihan", target: "row", row: 4, title: "radio vs checkbox", text: "<strong>Radio</strong>: satu grup = <code>name</code> yang sama, hanya satu bisa dipilih. <strong>Checkbox</strong>: boleh lebih dari satu; untuk PHP pakai nama array <code>name=\"matkul[]\"</code>." },
        { label: "Tombol", target: "row", row: 8, title: "submit vs reset", text: "<code>submit</code> mengirim ke <code>action</code> form; <code>reset</code> mengosongkan semua input." },
        { label: "Tersembunyi", target: "row", row: 9, title: "hidden", text: "Tidak tampil, tetapi dikirim ke server. Nanti dipakai PHP untuk tahu data mana yang di-<em>update</em>." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "code",
          label: "Interaktif 6 • Struktur Dasar Input",
          title: "Label + Input yang Benar",
          file: "form.html",
          code: "<label for=\"nim\">NIM:</label>\n<input type=\"text\" id=\"nim\" name=\"nim\"\n       maxlength=\"10\" pattern=\"[0-9]+\"\n       placeholder=\"Masukkan NIM\" required>",
          note: "<code>for</code> pada label = <code>id</code> pada input → klik teks label otomatis memfokuskan input."
        },
        {
          type: "choices",
          title: "Jebakan: id vs name",
          style: "toggle",
          options: [
            { label: "id", tone: "violet", badge: "Untuk halaman", title: "Pengenal unik di dalam halaman", text: "Dipakai <code><label for></code>, CSS, dan JavaScript. Harus unik.", note: "Tidak menentukan nama data yang dikirim." },
            { label: "name", tone: "emerald", badge: "Untuk server", title: "Nama field saat data dikirim", text: "Inilah yang dibaca PHP, mis. <code>$_POST['nim']</code>. <strong>Input tanpa name tidak ikut terkirim!</strong>", note: "Radio satu grup wajib <code>name</code> yang sama." }
          ]
        }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 7 • Atribut Penting",
      title: "Atribut Pengatur Perilaku Input",
      cols: 3,
      items: [
        { badge: "required", tone: "rose", title: "Wajib diisi", text: "Form tidak bisa dikirim jika kosong." },
        { badge: "placeholder", title: "Teks petunjuk", text: "Hilang saat mulai mengetik; bukan pengganti label." },
        { badge: "pattern + title", title: "Validasi pola (regex)", text: "<code>pattern=\"[0-9]+\"</code> = hanya angka; <code>title</code> berisi pesan petunjuk." },
        { badge: "min / max / step", title: "Batas angka & tanggal", text: "Mis. umur <code>min=\"17\" max=\"100\"</code>." },
        { badge: "disabled", tone: "amber", title: "Nonaktif", text: "Tidak bisa diedit dan <strong>TIDAK ikut terkirim</strong>." },
        { badge: "readonly", tone: "emerald", title: "Hanya baca", text: "Tidak bisa diedit, tetapi <strong>tetap terkirim</strong>." }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 8 • ➕ Tabel HTML (dibutuhkan tugas)",
      title: "Membuat Tabel Data Mahasiswa",
      desc: "Modul belum membahas tabel, padahal tugas meminta tabel minimal 3 kolom × 4 baris. Ini ringkasannya.",
      tabs: [
        { label: "Tag tabel", blocks: [
          { type: "table", headers: ["Tag", "Arti"], rows: [
            ["`<table>`", "Wadah tabel"],
            ["`<caption>`", "Judul tabel (opsional, tepat setelah `<table>`)"],
            ["`<tr>`", "<strong>t</strong>able <strong>r</strong>ow = satu baris"],
            ["`<th>`", "<strong>t</strong>able <strong>h</strong>eader = sel judul (tebal & rata tengah)"],
            ["`<td>`", "<strong>t</strong>able <strong>d</strong>ata = sel isi"],
            ["`<thead>` `<tbody>`", "Mengelompokkan baris judul dan baris data (opsional, lebih rapi)"]
          ] },
          { type: "callout", tone: "tip", html: "Urutannya selalu: <code><table></code> → <code><tr></code> → <code><th></code>/<code><td></code>. Jumlah sel di tiap baris harus sama dengan jumlah kolom." }
        ] },
        { label: "Contoh kode", blocks: [
          { type: "code", file: "tabel.html", code: "<table border=\"1\" cellpadding=\"6\">\n    <tr>\n        <th>Nama</th>\n        <th>NIM</th>\n        <th>Jurusan</th>\n    </tr>\n    <tr>\n        <td>Andi</td>\n        <td>123456</td>\n        <td>Sistem Informasi</td>\n    </tr>\n</table>", note: "<code>border</code> dan <code>cellpadding</code> adalah atribut lama; tetap tampil di browser dan cukup untuk tugas ini. Cara modern memakai CSS (pertemuan 3)." }
        ] },
        { label: "Gabung sel", blocks: [
          { type: "cards", cols: 2, items: [
            { badge: "colspan=\"2\"", title: "Melebar ke samping", text: "Satu sel menempati 2 kolom, mis. judul “Biodata” di atas kolom Nama dan NIM." },
            { badge: "rowspan=\"2\"", title: "Memanjang ke bawah", text: "Satu sel menempati 2 baris." }
          ] }
        ] }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Tips Lolos Tugas",
      tone: "warn",
      heading: "5 Hal yang Sering Terlewat di Tugas Form",
      html: "<ol><li><strong>Checkbox “minimal satu harus dipilih” tidak bisa dipaksa HTML murni.</strong> Jika <code>required</code> dipasang di satu checkbox, justru checkbox itu yang wajib dicentang. Validasi “minimal satu” butuh JavaScript (pertemuan 9). Cukup tulis keterangannya di label.</li><li><strong>Radio wajib pilih satu:</strong> semua radio diberi <code>name</code> sama, lalu cukup pasang <code>required</code> pada salah satunya.</li><li><strong>Dropdown wajib:</strong> buat opsi pertama <code><option value=\"\">-- Pilih --</option></code> + <code>required</code> di <code><select></code>; opsi kosong itu tidak dianggap jawaban.</li><li><strong>Kreativitas inline:</strong> <code><body style=\"background-color:#f0f7ff\"></code>, <code><h1 style=\"color:navy\"></code>.</li><li><strong>Nama file:</strong> <code>namamahasiswa_nim.html</code>, huruf kecil tanpa spasi.</li></ol>"
    }
  ],
  simulator: [
    {
      type: "terminal",
      label: "Simulasi 1 • Uji Validasi Form",
      title: "Apa yang Terjadi Saat Tombol Kirim Ditekan?",
      desc: "Form: <code><input type=\"number\" name=\"umur\" min=\"17\" max=\"100\" required></code> dan <code><input type=\"email\" name=\"email\" required></code>.",
      shell: "browser>",
      header: "Klik tombol Kirim Data",
      scenarios: [
        { label: "Umur dikosongkan", code: "✗", ok: false, pill: "Ditolak browser", cmd: "umur = (kosong)", res: "⚠ Please fill out this field.", exp: "<code>required</code> mencegah form terkirim selama input kosong." },
        { label: "Umur diisi 15", code: "✗", ok: false, pill: "Ditolak browser", cmd: "umur = 15", res: "⚠ Value must be greater than or equal to 17.", exp: "<code>min=\"17\"</code> menolak angka di bawah batas." },
        { label: "Email tanpa @", code: "✗", ok: false, pill: "Ditolak browser", cmd: "email = andi.gmail.com", res: "⚠ Please include an '@' in the email address.", exp: "<code>type=\"email\"</code> memeriksa format otomatis; <code>type=\"text\"</code> tidak." },
        { label: "Semua valid, method GET", code: "GET", ok: true, pill: "Terkirim", cmd: "umur = 20, email = andi@gmail.com", res: "GET /simpan.php?umur=20&email=andi%40gmail.com", exp: "Dengan GET, data tampil di URL (simbol @ dikodekan menjadi <code>%40</code>)." },
        { label: "Semua valid, method POST", code: "POST", ok: true, pill: "Terkirim", cmd: "umur = 20, email = andi@gmail.com", res: "POST /simpan.php\n\numur=20&email=andi%40gmail.com", exp: "Dengan POST, data ada di body request, tidak terlihat di URL. Nanti dibaca PHP dengan <code>$_POST['umur']</code>." },
        { label: "Input tanpa atribut name", code: "?", ok: false, pill: "Data hilang", cmd: "<input type=\"text\" id=\"nama\">  ← tanpa name", res: "POST /simpan.php\n\numur=20&email=andi%40gmail.com   (nama tidak ada!)", exp: "Input tanpa <code>name</code> <strong>tidak ikut terkirim</strong>, walaupun sudah diisi." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 1 • Pilih Jenis Input",
      title: "Data Ini Cocoknya Pakai Input Apa?",
      headers: ["Data yang dikumpulkan", "Jenis input"],
      rows: [
        { cells: ["Alamat email mahasiswa"], fields: [{ options: TYPES, answer: "email" }], ok: "✓ Validasi format otomatis." },
        { cells: ["Umur (17–100)"], fields: [{ options: TYPES, answer: "number" }], ok: "✓ Dengan min & max." },
        { cells: ["Tanggal lahir"], fields: [{ options: TYPES, answer: "date" }], ok: "✓ Muncul kalender." },
        { cells: ["Jenis kelamin (pilih salah satu)"], fields: [{ options: TYPES, answer: "radio" }], ok: "✓ Satu pilihan per grup." },
        { cells: ["Hobi (boleh lebih dari satu)"], fields: [{ options: TYPES, answer: "checkbox" }], ok: "✓ Banyak pilihan." },
        { cells: ["Jurusan dari daftar panjang"], fields: [{ options: TYPES, answer: "select" }], ok: "✓ Dropdown hemat tempat." },
        { cells: ["Kata sandi akun"], fields: [{ options: TYPES, answer: "password" }], ok: "✓ Karakter disamarkan." },
        { cells: ["Foto profil"], fields: [{ options: TYPES, answer: "file" }], ok: "✓ Dengan accept=\"image/*\"." },
        { cells: ["ID mahasiswa yang sedang diedit (tak perlu terlihat)"], fields: [{ options: TYPES, answer: "hidden" }], ok: "✓ Terkirim tanpa ditampilkan." },
        { cells: ["Catatan/alamat panjang beberapa baris"], fields: [{ options: TYPES, answer: "textarea" }], ok: "✓ Teks panjang." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Arsitek Halaman",
      title: "Pilih Elemen Semantik yang Tepat",
      headers: ["Bagian halaman", "Elemen"],
      rows: [
        { cells: ["Logo dan judul aplikasi di paling atas"], fields: [{ options: SEM, answer: "header" }], ok: "✓ header." },
        { cells: ["Menu Beranda – Pendaftaran – Kontak"], fields: [{ options: SEM, answer: "nav" }], ok: "✓ nav." },
        { cells: ["Seluruh isi utama halaman (hanya satu)"], fields: [{ options: SEM, answer: "main" }], ok: "✓ main." },
        { cells: ["Bagian “Form Pendaftaran” di dalam isi utama"], fields: [{ options: SEM, answer: "section" }], ok: "✓ section." },
        { cells: ["Satu berita pengumuman yang bisa dibagikan sendiri"], fields: [{ options: SEM, answer: "article" }], ok: "✓ article." },
        { cells: ["Kotak iklan di samping"], fields: [{ options: SEM, answer: "aside" }], ok: "✓ aside." },
        { cells: ["© 2025 Universitas Siber Muhammadiyah"], fields: [{ options: SEM, answer: "footer" }], ok: "✓ footer." }
      ]
    },
    {
      type: "detective",
      label: "Permainan 3 • Detektif Bug Form",
      title: "Temukan & Perbaiki 6 Kesalahan Form!",
      rules: ["label for = id input", "Radio 1 grup = name sama", "Input wajib punya name", "disabled tidak terkirim", "Tag input tanpa penutup"],
      headers: ["No.", "Gejala", "Kode bermasalah"],
      rows: [
        ["1", "Klik label tidak memfokuskan input", "`<label for=\"nama\">` … `<input id=\"name\">`"],
        ["2", "Laki-laki & Perempuan bisa dipilih bersamaan", "`<input type=\"radio\" name=\"jk1\">` `<input type=\"radio\" name=\"jk2\">`"],
        ["3", "Email tidak sampai ke server", "`<input type=\"email\" id=\"email\">`"],
        ["4", "NIM terlihat tapi tidak terkirim saat update", "`<input name=\"nim\" value=\"123\" disabled>`"],
        ["5", "Umur 5 tetap diterima", "`<input type=\"number\" name=\"umur\">`"],
        ["6", "Tombol tampil aneh", "`<input type=\"submit\">Kirim</input>`"]
      ],
      bugs: [
        { row: 0, col: 2, fixed: "`<label for=\"nama\">` … `<input id=\"nama\">`", explain: "✅ Nilai <code>for</code> harus persis sama dengan <code>id</code> input." },
        { row: 1, col: 2, fixed: "`name=\"jk\"` pada kedua radio", explain: "✅ Radio dianggap satu grup hanya jika <code>name</code>-nya sama." },
        { row: 2, col: 2, fixed: "`<input type=\"email\" id=\"email\" name=\"email\">`", explain: "✅ Tanpa <code>name</code>, data tidak ikut terkirim." },
        { row: 3, col: 2, fixed: "`<input name=\"nim\" value=\"123\" readonly>`", explain: "✅ <code>disabled</code> tidak dikirim; pakai <code>readonly</code> agar tidak bisa diedit tetapi tetap terkirim." },
        { row: 4, col: 2, fixed: "`<input type=\"number\" name=\"umur\" min=\"17\" max=\"100\" required>`", explain: "✅ Tambahkan batas <code>min</code>/<code>max</code> (dan <code>required</code>) sesuai tugas." },
        { row: 5, col: 2, fixed: "`<input type=\"submit\" value=\"Kirim\">` atau `<button type=\"submit\">Kirim</button>`", explain: "✅ <code><input></code> adalah void element; teks tombol ditulis di <code>value</code>. Kalau ingin teks di antara tag, gunakan <code><button></code>." }
      ]
    },
    {
      type: "playground",
      label: "Praktik 1 • Aktivitas Modul 2",
      title: "Editor Live: Lengkapi Form Pendaftaran",
      desc: "Kode modul sudah dimuat. Selesaikan modifikasi dari modul. Form di pratinjau bisa dicoba (validasi <code>required</code> akan muncul).",
      file: "form-pendaftaran.html",
      starter: STARTER_PRAKTIK,
      solution: SOLUSI_PRAKTIK,
      tasks: [
        { label: "Tambahkan `<nav>` dengan minimal 2 link", sel: "nav a[href]", min: 2 },
        { label: "Tambahkan `<textarea>` untuk Catatan (dengan label)", sel: "form textarea[name]", regex: "<label[^>]*for=[\"']catatan" },
        { label: "Tambahkan paragraf pengantar `<p>` di atas form", sel: "section p", hasText: true },
        { label: "Tetap ada `<header>`, `<main>`, `<section>`, `<footer>`", sel: "body > header ~ main section form" , regex: "<footer" }
      ]
    },
    {
      type: "playground",
      label: "Praktik 2 • Tugas Projek dari Dosen",
      title: "Assignment: Tabel & Form Data Mahasiswa",
      desc: "Kerjakan sesuai instruksi dosen. Misi di bawah mengikuti poin-poin soal. Setelah semua ✅, ganti contoh data dengan datamu sendiri, salin kodenya, lalu simpan sebagai <code>namamahasiswa_nim.html</code>.",
      file: "namamahasiswa_nim.html",
      starter: STARTER_TUGAS,
      solution: SOLUSI_TUGAS,
      tasks: [
        { label: "1. Judul halaman `<title>Data Mahasiswa</title>`", regex: "<title>\\s*Data Mahasiswa\\s*</title>" },
        { label: "2. Kalimat perkenalan/sambutan (minimal 1 `<p>`)", sel: "body p", hasText: true },
        { label: "3. Tabel dengan baris header `<th>` minimal 3 kolom", sel: "table th", min: 3, hasText: true },
        { label: "3. Tabel minimal 4 baris `<tr>` (termasuk header)", sel: "table tr", min: 4 },
        { label: "4. Nama: `type=\"text\"` + `required`", sel: "form input[type=text][required]" },
        { label: "4. Umur: `type=\"number\"` + `required` + `min=\"17\"` + `max=\"100\"`", sel: "form input[type=number][required][min='17'][max='100']" },
        { label: "4. Email: `type=\"email\"` + `required`", sel: "form input[type=email][required]" },
        { label: "4. Tanggal Lahir: `type=\"date\"`", sel: "form input[type=date]" },
        { label: "Bonus: 3 checkbox Hobi (Membaca, Olahraga, Gaming)", sel: "form input[type=checkbox]", min: 3 },
        { label: "Bonus: radio Jenis Kelamin (2 opsi, name sama, ada required)", sel: "form input[type=radio][required]", regex: "type=[\"']radio[\"'][\\s\\S]*type=[\"']radio[\"']" },
        { label: "Bonus: dropdown Jurusan minimal 3 opsi", sel: "form select option:not([value=''])", min: 3 },
        { label: "Bonus: tombol submit berlabel “Kirim Data”", regex: "(value=[\"']Kirim Data[\"']|>\\s*Kirim Data\\s*</button>)" },
        { label: "5. Setiap input punya `<label>` (minimal 4)", sel: "form label", min: 4 },
        { label: "6. (Opsional) Kreativitas: ada atribut `style` inline", sel: "[style]" }
      ]
    }
  ],
  flashcards: [
    { tag: "HTML5", q: "Apa itu elemen semantik dan 3 manfaatnya?", a: "Tag yang memiliki makna spesifik. Manfaat: <strong>aksesibilitas</strong> (screen reader), <strong>SEO</strong>, <strong>kolaborasi</strong> antarpengembang." },
    { tag: "HTML5", q: "Sebutkan 7 elemen semantik utama!", a: "`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`." },
    { tag: "HTML5", q: "Elemen semantik mana yang hanya boleh satu per halaman?", a: "`<main>`." },
    { tag: "HTML5", q: "Beda `<section>` dan `<article>`?", a: "`<section>` = kelompok konten terkait dalam halaman. `<article>` = konten mandiri yang bisa berdiri sendiri (berita, posting blog)." },
    { tag: "Form", q: "Dua atribut penting `<form>`?", a: "<strong>action</strong> = URL tujuan data; <strong>method</strong> = GET atau POST." },
    { tag: "Form", q: "Beda GET dan POST?", a: "<strong>GET</strong>: data di URL, terlihat, bisa di-bookmark, terbatas (pencarian).<br><strong>POST</strong>: data di body request, tidak di URL (password, simpan data)." },
    { tag: "Form", q: "Apa fungsi `<label for>`?", a: "Memberi label untuk aksesibilitas. Nilai `for` harus sama dengan `id` input, sehingga klik label memfokuskan input." },
    { tag: "Form", q: "Beda `id` dan `name` pada input?", a: "`id`: pengenal unik untuk label/CSS/JS. `name`: nama field yang dikirim ke server (dibaca PHP). Tanpa `name`, data tidak terkirim." },
    { tag: "Input", q: "Beda radio dan checkbox?", a: "<strong>Radio</strong>: pilih satu, satu grup memakai `name` yang sama.<br><strong>Checkbox</strong>: boleh pilih banyak, untuk PHP pakai `name=\"x[]\"`." },
    { tag: "Input", q: "Beda disabled dan readonly?", a: "Keduanya tidak bisa diedit. <strong>disabled</strong> TIDAK ikut terkirim; <strong>readonly</strong> tetap terkirim." },
    { tag: "Input", q: "Atribut untuk membatasi angka dan pola isian?", a: "`min`, `max`, `step` untuk number/date; `pattern` (regex, mis. `[0-9]+`) + `title` untuk pesan; `maxlength`/`minlength` untuk panjang teks." },
    { tag: "Input", q: "Kegunaan `type=\"hidden\"`?", a: "Menyimpan data yang tidak ditampilkan tetapi ikut dikirim, mis. id mahasiswa saat update data dengan PHP." },
    { tag: "➕ Tabel", q: "Tag-tag dasar tabel HTML?", a: "`<table>` wadah • `<tr>` baris • `<th>` sel judul • `<td>` sel data • `<caption>` judul tabel • `colspan`/`rowspan` gabung sel." },
    { tag: "➕ Tugas", q: "Bisakah HTML memaksa “minimal satu checkbox dipilih”?", a: "Tidak. `required` pada checkbox membuat checkbox itu sendiri wajib dicentang. Validasi “minimal satu” butuh JavaScript." }
  ],
  quiz: [
    { q: "Elemen semantik HTML5 yang digunakan untuk menu navigasi adalah …",
      opts: ["`<header>`", "`<nav>`", "`<aside>`", "`<section>`"], ans: 1,
      exp: "`<nav>` khusus untuk kumpulan link navigasi.",
      optExp: ["Header berisi judul/logo (boleh memuat nav, tetapi bukan elemen navigasinya).", "Benar.", "Aside untuk konten tambahan seperti sidebar/iklan.", "Section untuk kelompok konten terkait."] },
    { q: "Pernyataan yang BENAR tentang `<main>` adalah …",
      opts: ["Boleh dipakai berkali-kali dalam satu halaman", "Berisi copyright dan kontak", "Berisi konten utama dan hanya satu per halaman", "Wajib berada di dalam `<header>`"], ans: 2,
      exp: "`<main>` = konten utama, hanya satu per halaman.",
      optExp: ["Jebakan: yang boleh berulang adalah section/article/header/footer.", "Itu fungsi footer.", "Benar.", "Main tidak berada di dalam header."] },
    { q: "Atribut `<form>` yang menentukan URL tujuan pengiriman data adalah …",
      opts: ["method", "name", "action", "target"], ans: 2,
      exp: "action = tujuan; method = cara (GET/POST).",
      optExp: ["Method menentukan cara pengiriman.", "Name adalah nama field input.", "Benar.", "Target menentukan jendela tujuan, bukan URL."] },
    { q: "Untuk mengirim data kata sandi agar tidak tampil di URL, method yang tepat adalah …",
      opts: ["GET", "POST", "PUT", "HEAD"], ans: 1,
      exp: "POST mengirim data di body request, tidak di URL. Modul: gunakan POST untuk data sensitif.",
      optExp: ["GET menampilkan data di URL.", "Benar.", "Form HTML hanya mendukung GET dan POST.", "Tidak dipakai untuk form."] },
    { q: "Agar dua radio button “Aktif” dan “Tidak Aktif” hanya bisa dipilih salah satu, keduanya harus memiliki …",
      opts: ["id yang sama", "value yang sama", "name yang sama", "label yang sama"], ans: 2,
      exp: "Radio dalam satu grup ditentukan oleh name yang sama; value tiap opsi berbeda.",
      optExp: ["Jebakan: id harus unik.", "Value justru berbeda agar server tahu pilihan mana.", "Benar.", "Label tidak menentukan grup."] },
    { q: "Input NIM yang tidak boleh diedit tetapi nilainya tetap harus terkirim ke server sebaiknya memakai atribut …",
      opts: ["disabled", "readonly", "hidden", "placeholder"], ans: 1,
      exp: "readonly tidak bisa diedit tetapi tetap terkirim; disabled tidak terkirim.",
      optExp: ["Jebakan: disabled tidak ikut terkirim.", "Benar.", "hidden adalah nilai type, dan membuat input tidak terlihat sama sekali.", "Placeholder hanya teks petunjuk."] },
    { q: "Kode yang tepat untuk input umur wajib dengan rentang 17–100 adalah …",
      opts: ["`<input type=\"text\" name=\"umur\" required>`", "`<input type=\"number\" name=\"umur\" min=\"17\" max=\"100\" required>`", "`<input type=\"number\" name=\"umur\" maxlength=\"100\">`", "`<input type=\"range\" name=\"umur\" required=\"17-100\">`"], ans: 1,
      exp: "type number + min + max + required, sesuai soal tugas.",
      optExp: ["Text tidak membatasi angka.", "Benar.", "maxlength membatasi jumlah karakter, bukan nilai angka.", "Format required salah; required tidak bernilai rentang."] },
    { q: "Input yang menyimpan data tidak terlihat oleh pengguna tetapi tetap dikirim ke server adalah …",
      opts: ["`type=\"password\"`", "`type=\"hidden\"`", "`type=\"reset\"`", "`disabled`"], ans: 1,
      exp: "hidden, mis. untuk id mahasiswa saat update.",
      optExp: ["Password terlihat sebagai titik-titik dan tetap diisi pengguna.", "Benar.", "Reset adalah tombol pengosong form.", "Disabled tidak dikirim."] },
    { q: "Pada tabel HTML, tag untuk sel judul kolom adalah …",
      opts: ["`<td>`", "`<tr>`", "`<th>`", "`<thead>`"], ans: 2,
      exp: "th = table header (tebal & rata tengah); td = data; tr = baris.",
      optExp: ["td untuk sel data.", "tr untuk baris.", "Benar.", "thead adalah kelompok baris judul, bukan selnya."] },
    { q: "Jika atribut `name` tidak ditulis pada sebuah input lalu form dikirim, maka …",
      opts: ["Browser menolak mengirim form", "Data input tersebut tidak ikut terkirim", "Nilai id dipakai sebagai gantinya", "Input otomatis menjadi readonly"], ans: 1,
      exp: "Server hanya menerima pasangan name=value. Tanpa name, data input itu hilang.",
      optExp: ["Form tetap terkirim.", "Benar.", "Jebakan: id tidak menggantikan name.", "Tidak ada hubungannya."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 2*
📚 *HTML5 Semantik, Formulir & Jenis Input*

1️⃣ *Elemen semantik* (manfaat: aksesibilitas, SEO, kolaborasi):
header (atas) • nav (menu) • main (isi utama, cuma 1) • section (kelompok konten) • article (konten mandiri) • aside (sidebar) • footer (copyright).

2️⃣ *Form:* <form action="tujuan" method="GET/POST">
• Elemen: input, select+option, textarea, label (for = id), button.
• GET = data di URL (pencarian) • POST = data di body (password, simpan data).

3️⃣ *Jenis input:* text, email, number (min/max/step), date, radio (1 pilihan, name sama), checkbox (banyak, name="x[]"), password, file (accept), submit/reset, hidden.

4️⃣ *Atribut:* required, placeholder, pattern (regex), min/max, maxlength, disabled (TIDAK terkirim) vs readonly (tetap terkirim).
• id = untuk label/CSS/JS • name = nama data ke server (tanpa name = tidak terkirim).

5️⃣ *Tabel:* table > tr > th/td, caption, colspan/rowspan.

6️⃣ *Tugas Data Mahasiswa:* title "Data Mahasiswa", kalimat sambutan, tabel 3 kolom × 4 baris, form Nama (text required), Umur (number 17–100 required), Email (email required), Tanggal Lahir (date), bonus checkbox/radio/select/"Kirim Data", label jelas, simpan namamahasiswa_nim.html.`
});
