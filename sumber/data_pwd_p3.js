// Pemrograman Web Dinamis — Pertemuan 3: Pengenalan CSS (cara pasang, selector, property, value)
// Sumber: PERTEMUAN 3.pptx (Pengenalan CSS), CSS Selector.pdf, Modul 3 (CSS & Tag HTML Umum).
// Bagian bertanda "➕ Tambahan" bukan dari modul.
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

const CARA = [{ value: "inline", label: "Inline style" }, { value: "internal", label: "Internal style sheet" }, { value: "external", label: "External style sheet" }];
const SELJ = [{ value: "tag", label: "Selector tag/element" }, { value: "class", label: "Selector class" }, { value: "id", label: "Selector ID" }, { value: "atribut", label: "Selector atribut" }, { value: "universal", label: "Selector universal" }, { value: "grouping", label: "Grouping selector" }];

const FORM_HTML = `    <header>
        <h1>Sistem Pendaftaran Mahasiswa</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#beranda">Beranda</a></li>
            <li><a href="#daftar">Pendaftaran</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>
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
                    <option value="si">Sistem Informasi</option>
                    <option value="ti">Teknik Informatika</option>
                </select>
                <label for="catatan">Catatan:</label>
                <textarea id="catatan" name="catatan"></textarea>
                <button type="submit">Daftar</button>
            </form>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Universitas Contoh</p>
    </footer>`;

const CSS_MODUL = `        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: white;
            padding: 10px;
            text-align: center;
        }
        nav ul {
            list-style-type: none;
            padding: 0;
        }
        nav ul li {
            display: inline;
            margin-right: 10px;
        }
        nav ul li a {
            text-decoration: none;
            color: #333;
        }
        section {
            margin: 20px 0;
        }
        form {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 5px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input, select, textarea {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
        }`;

const STARTER_PRAKTIK = `<!DOCTYPE html>
<html lang="id">
<head>
    <title>Pendaftaran Mahasiswa</title>
    <!-- Di laptop: isi <style> ini ditaruh di file style.css
         lalu dipanggil dengan <link rel="stylesheet" href="style.css"> -->
    <style>
${CSS_MODUL}
    </style>
</head>
<body>
${FORM_HTML}
</body>
</html>`;

const SOLUSI_PRAKTIK = STARTER_PRAKTIK
  .replace("background-color: #333;\n            color: white;", "background-color: #005566;\n            color: white;")
  .replace("section {\n            margin: 20px 0;\n        }", "section {\n            margin: 20px 0;\n            border: 1px solid #ccc;\n        }")
  .replace("label {\n            display: block;\n            margin-bottom: 5px;\n        }", "label {\n            display: block;\n            margin-bottom: 5px;\n            font-size: 14px;\n        }");

const STARTER_TUGAS = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Profil Pribadi</title>
    <!-- Di laptop: pindahkan isi <style> ke profil.css,
         lalu ganti dengan <link rel="stylesheet" href="profil.css"> -->
    <style>
        /* Tulis CSS-mu di sini */

    </style>
</head>
<body>
    <header>
        <h1>Nama Saya: ...</h1>
    </header>

    <!-- Tambahkan nav, main (section, img, p, ul), dan footer -->

</body>
</html>`;

const SOLUSI_TUGAS = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Profil Pribadi</title>
    <!-- Di laptop: pindahkan isi <style> ke profil.css,
         lalu ganti dengan <link rel="stylesheet" href="profil.css"> -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 20px;
        }
        header {
            background-color: #005566;
            color: white;
            padding: 15px;
            text-align: center;
        }
        nav ul {
            list-style-type: none;
            padding: 0;
        }
        nav ul li {
            display: inline;
            margin-right: 15px;
        }
        nav ul li a {
            text-decoration: none;
            color: #333;
        }
        nav ul li a:hover {
            color: #005566;
        }
        section {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        img {
            border-radius: 50%;
            margin-bottom: 10px;
        }
        footer {
            text-align: center;
            color: #666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Nama Saya: Ahmad Fauzi</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Beranda</a></li>
            <li><a href="#about">Tentang</a></li>
            <li><a href="#contact">Kontak</a></li>
        </ul>
    </nav>
    <main>
        <section>
            <h2>Tentang Saya</h2>
            <img src="https://placehold.co/150" alt="Foto Profil" width="150">
            <p>Saya adalah mahasiswa <strong>Sistem Informasi</strong>.</p>
            <p>Hobi saya adalah <em>coding</em>, bermain game, dan membaca.</p>
            <h3>Keahlian Saya</h3>
            <ul>
                <li>Dasar HTML</li>
                <li>Dasar CSS</li>
                <li>Team player</li>
            </ul>
            <p>Hubungi saya di <a href="https://www.linkedin.com">LinkedIn</a>.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Universitas Siber Muhammadiyah</p>
    </footer>
</body>
</html>`;

const STARTER_SELECTOR = `<!DOCTYPE html>
<html lang="id">
<head>
    <style>
        /* Coba ubah/tambah aturan di bawah, lihat hasilnya di kanan */
        p { color: navy; }

    </style>
</head>
<body>
    <h1 id="judul_utama">Daftar Mahasiswa</h1>
    <p class="info">Paragraf ber-class info.</p>
    <p>Paragraf biasa.</p>
    <p class="info penting">Paragraf dengan dua class: info dan penting.</p>
    <input type="text" placeholder="input teks">
    <input type="email" placeholder="input email">
</body>
</html>`;

const SOLUSI_SELECTOR = STARTER_SELECTOR.replace("        p { color: navy; }\n", `        p { color: navy; }
        #judul_utama { color: white; background-color: #005566; padding: 10px; }
        .info { font-style: italic; }
        .penting { color: red; font-weight: bold; }
        input[type=text] { border: 2px solid cyan; padding: 6px; }
        h1, p { font-family: Arial, sans-serif; }
`);

module.exports = fix({
  id: "p3",
  nomor: 3,
  judul: "Pengenalan CSS: Cara Pasang, Selector, Property & Value",
  ujian: "UTS",
  hero: {
    badge: "Materi 3 • Pemrograman Web Dinamis",
    title: "HTML untuk Isi, CSS untuk Tampilan",
    text: "Pahami <strong>fungsi CSS</strong>, <strong>3 cara memasang CSS</strong> (inline, internal, external), anatomi <strong>selector–property–value</strong>, <strong>jenis-jenis selector</strong>, dan properti dasar. Lalu praktik mempercantik form & profil di editor live. ➕ Ada tambahan <strong>urutan prioritas (cascade)</strong>, <strong>box model</strong>, dan beberapa koreksi slide."
  },
  cheatsheet: [
    {
      type: "cards",
      label: "Interaktif 1 • Apa & Kenapa CSS",
      title: "“HTML for content, CSS for presentation”",
      desc: "<strong>CSS (Cascading Style Sheets)</strong> = kode untuk mendesain/mempercantik tampilan HTML: teks, warna, gambar, latar belakang, jarak, dan tata letak.",
      cols: 3,
      items: [
        { badge: "Masalah lama", tone: "rose", title: "Tag &lt;font&gt; di mana-mana", text: "Dulu warna ditulis langsung: <code><font color=\"red\"></code>. Jika ada 50 artikel dan warnanya mau diganti biru, harus diubah satu per satu." },
        { badge: "Solusi CSS", tone: "emerald", title: "Pisahkan tampilan dari konten", text: "Ganti dengan <code><span class=\"warna\"></code>, lalu cukup tulis sekali <code>.warna { color: red; }</code>. Ubah jadi <code>blue</code> → semua ikut berubah." },
        { badge: "➕ Cascading", tone: "sky", title: "Artinya “bertingkat/mengalir”", text: "Beberapa aturan bisa mengenai elemen yang sama; browser memilih berdasarkan urutan prioritas (lihat Interaktif 6)." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 2 • 3 Cara Memasang CSS",
      title: "Inline vs Internal vs External",
      style: "pills",
      options: [
        { label: "1. Inline style", tone: "rose", badge: "Atribut style di tag", title: "Langsung di dalam tag HTML",
          code: "<h2 style=\"color: red; font-size: 20px;\">Judul</h2>",
          text: "Praktis untuk satu elemen, tetapi <strong>tidak disarankan</strong> karena CSS bercampur dengan HTML sehingga tidak memenuhi tujuan CSS (memisahkan desain dari konten).",
          note: "Prioritasnya paling tinggi (mengalahkan internal/external)." },
        { label: "2. Internal (embedded)", tone: "amber", badge: "&lt;style&gt; di &lt;head&gt;", title: "Dikumpulkan dalam tag &lt;style&gt; di bagian head",
          code: "<head>\n  <style>\n    p { color: blue; }\n  </style>\n</head>",
          text: "Lebih baik dari inline karena CSS sudah terpisah dari tag. Kekurangannya: jika banyak halaman bergaya sama, CSS harus ditulis ulang di <strong>setiap halaman</strong>.",
          note: "Tag <code><style></code> harus berada di dalam <code><head></code>." },
        { label: "3. External", tone: "emerald", badge: "File .css terpisah", title: "Satu file CSS dipanggil banyak halaman",
          code: "<head>\n  <link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\">\n</head>",
          text: "<code>rel=\"stylesheet\"</code> = menyatakan file adalah style sheet • <code>href</code> = alamat file CSS • <code>type=\"text/css\"</code> = jenis file (➕ opsional di HTML5).",
          note: "<strong>Praktik terbaik</strong> untuk proyek besar. ⚠️ Slide menyimpan <code>belajar.css</code> tetapi memanggil <code>css/style.css</code>: nama & folder di <code>href</code> harus sama persis dengan file yang disimpan." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Anatomi Aturan CSS",
      title: "Selector, Property, Value: Elemen Inti CSS",
      desc: "Klik tombol untuk menyorot bagian aturan <code>h1, h2 { font-size: 23px; color: green; }</code>",
      headers: ["Selector", "{", "Property", ":", "Value", ";", "}"],
      rows: [["`h1, h2`", "`{`", "`font-size`", "`:`", "`23px`", "`;`", "`}`"]],
      mono: true,
      modes: [
        { label: "Selector", target: "col", col: 0, title: "Selector = siapa yang diberi gaya", text: "Pola untuk “mencari” tag HTML, mis. “cari semua <code><p></code>” atau “semua elemen ber-class <code>warning</code>”. Lebih dari satu selector dipisah <strong>koma</strong>." },
        { label: "Property", target: "col", col: 2, title: "Property = apa yang diubah", text: "Jenis gaya: ukuran teks, warna, font, dll. Property dua kata memakai <strong>tanda hubung</strong>: <code>background-color</code>, <code>border-left</code>." },
        { label: "Value", target: "col", col: 4, title: "Value = nilainya", text: "Nilai dari property, mis. <code>background-color</code> bernilai <code>red</code>, <code>blue</code>, <code>#f0f0f0</code>." },
        { label: "Tanda baca", target: "row", row: 0, title: "4 aturan tanda baca", text: "<code>{ }</code> membungkus deklarasi • <code>:</code> memisahkan property dan value • <code>;</code> memisahkan antar-property • <code>,</code> memisahkan beberapa selector. <code>;</code> terakhir boleh dihilangkan, tetapi <strong>sebaiknya tetap ditulis</strong>." }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 4 • Jenis-Jenis Selector",
      title: "5 Selector Dasar + Grouping",
      tabs: [
        { label: "Tag", blocks: [
          { type: "code", file: "tag.css", code: "p {\n    text-align: center;\n    color: blue;\n}", note: "Disebut juga <strong>element type selector</strong>. Mengenai semua <code><p></code>, termasuk tag di dalamnya (mis. <code><i></code> dalam <code><p></code>) sampai tag penutup <code></p></code>." }
        ] },
        { label: ".class", blocks: [
          { type: "code", file: "class.css", code: ".judul {\n    font-size: 20px;\n}\np.center {\n    text-align: left;\n    color: blue;\n}", note: "Diawali <strong>titik (.)</strong>. Satu class bisa dipakai <strong>banyak tag</strong>, dan satu tag bisa punya <strong>banyak class</strong>: <code>class=\"judul penting berwarna\"</code> (dipisah spasi). <code>p.center</code> = hanya <code><p></code> yang ber-class <code>center</code>." }
        ] },
        { label: "#id", blocks: [
          { type: "code", file: "id.css", code: "#para1 {\n    text-align: center;\n    color: lightgrey;\n}", note: "Diawali <strong>tanda pagar (#)</strong>. Id harus <strong>unik</strong>: hanya boleh dipakai <strong>satu kali</strong> per halaman, karena juga dipakai JavaScript." }
        ] },
        { label: "[atribut]", blocks: [
          { type: "code", file: "atribut.css", code: "input[type=text] {\n    background: none;\n    color: cyan;\n    padding: 10px;\n    border: 1px solid cyan;\n}", note: "Memilih elemen berdasarkan atribut/nilainya. Sangat berguna untuk menata form." }
        ] },
        { label: "* universal", blocks: [
          { type: "code", file: "universal.css", code: "* {\n    color: blue;\n    background-color: white;\n}", note: "Hanya ada satu: tanda bintang <code>*</code>, mengenai <strong>semua</strong> elemen. ⚠️ Contoh di slide punya kurung kurawal <code>}</code> berlebih; versi di atas sudah diperbaiki." }
        ] },
        { label: "Grouping", blocks: [
          { type: "code", file: "grouping.css", code: "h1, h2 {\n    text-decoration: underline;\n    color: green;\n}", note: "Beberapa selector berbagi gaya yang sama, dipisah <strong>koma</strong>. ⚠️ Di PDF, slide “Grouping Selector” justru berisi contoh <code>*</code> (universal); yang benar grouping adalah seperti di atas." }
        ] }
      ]
    },
    {
      type: "list",
      label: "Interaktif 5 • 5 Kategori Selector (PDF)",
      title: "Peta Besar Selector CSS",
      groups: [
        { title: "Kategori", tone: "indigo", ordered: true, items: [
          "<strong>Simple selector</strong>: berdasarkan nama, id, class",
          "<strong>Combinator selector</strong>: berdasarkan hubungan, mis. <code>nav ul li a</code> (a di dalam li di dalam ul di dalam nav)",
          "<strong>Pseudo-class</strong>: berdasarkan kondisi, mis. <code>a:hover</code> (saat kursor di atasnya)",
          "<strong>Pseudo-element</strong>: bagian dari elemen, mis. <code>p::first-line</code>",
          "<strong>Attribute selector</strong>: berdasarkan atribut, mis. <code>input[type=text]</code>"
        ] },
        { title: "Properti dasar (modul)", tone: "emerald", items: [
          "<code>color</code>: warna teks",
          "<code>font-size</code>, <code>font-family</code>: ukuran & jenis huruf",
          "<code>background-color</code>: warna latar",
          "<code>margin</code>: jarak <strong>luar</strong> elemen",
          "<code>padding</code>: jarak <strong>dalam</strong> elemen",
          "➕ <code>text-align</code>, <code>text-decoration</code>, <code>border</code>, <code>border-radius</code>, <code>display</code>"
        ] }
      ]
    },
    {
      type: "table",
      label: "Interaktif 6 • ➕ Cascade: Siapa yang Menang?",
      title: "Urutan Prioritas Aturan CSS (Specificity)",
      desc: "Jika beberapa aturan mengenai elemen yang sama, browser memakai yang paling kuat. Klik tombol untuk melihat contoh.",
      headers: ["Peringkat", "Sumber aturan", "Contoh"],
      rows: [
        ["1 (terkuat)", "Inline style", "`<p style=\"color:red\">`"],
        ["2", "Selector ID", "`#intro { color: green; }`"],
        ["3", "Selector class / atribut / pseudo-class", "`.info { color: blue; }`"],
        ["4", "Selector tag", "`p { color: navy; }`"],
        ["5 (terlemah)", "Universal", "`* { color: black; }`"]
      ],
      modes: [
        { label: "Kasus 1", target: "row", row: 1, title: "`<p id=\"intro\" class=\"info\">` → hijau", text: "Ada aturan <code>p</code> (navy), <code>.info</code> (blue), <code>#intro</code> (green). Yang menang <strong>#intro</strong> karena ID lebih kuat dari class dan tag." },
        { label: "Kasus 2", target: "row", row: 0, title: "Inline mengalahkan semuanya", text: "<code><p id=\"intro\" style=\"color:red\"></code> tampil <strong>merah</strong>, walaupun ada aturan ID." },
        { label: "Kasus 3: seri", target: "row", row: 2, title: "Kekuatan sama → yang terakhir ditulis menang", text: "<code>.info { color: blue; }</code> lalu di bawahnya <code>.info { color: orange; }</code> → hasilnya <strong>orange</strong>." },
        { label: "!important", target: "none", title: "Kartu as: !important", text: "<code>color: red !important;</code> mengalahkan urutan normal. Hindari kecuali terpaksa karena membuat CSS sulit dirawat." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "cards",
          label: "Interaktif 7 • ➕ Box Model (persiapan P4)",
          title: "Setiap Elemen adalah Kotak Berlapis",
          cols: 1,
          items: [
            { badge: "margin", tone: "amber", title: "Jarak luar", text: "Ruang kosong di luar border, memisahkan elemen dari tetangganya." },
            { badge: "border", tone: "rose", title: "Garis tepi", text: "Mis. <code>border: 1px solid #ccc;</code>" },
            { badge: "padding", tone: "emerald", title: "Jarak dalam", text: "Ruang antara border dan isi; ikut berwarna latar elemen." },
            { badge: "content", tone: "sky", title: "Isi", text: "Teks/gambar; ukurannya diatur <code>width</code> & <code>height</code>." }
          ]
        },
        {
          type: "cards",
          label: "➕ Nilai yang Sering Dipakai",
          title: "Warna, Satuan, Singkatan",
          cols: 1,
          items: [
            { badge: "Warna", title: "Nama, hex, rgb", text: "<code>red</code> • <code>#ff0000</code> • <code>#f00</code> • <code>rgb(255,0,0)</code>" },
            { badge: "Satuan", title: "px, em, rem, %", text: "<code>px</code> tetap • <code>em</code> relatif ukuran font induk • <code>%</code> relatif lebar induk." },
            { badge: "Singkatan margin", title: "1–4 nilai searah jarum jam", text: "<code>margin: 20px 0;</code> = atas-bawah 20px, kiri-kanan 0. <code>margin: 0 auto;</code> = memusatkan kotak (dipakai di modul)." },
            { badge: "Komentar", title: "/* ... */", text: "Komentar CSS, tidak dibaca browser." }
          ]
        }
      ]
    },
    {
      type: "table",
      label: "Interaktif 8 • Daftar Tag HTML Umum (Modul 3)",
      title: "Rekap Tag yang Dipakai untuk Proyek CRUD",
      headers: ["Kelompok", "Tag"],
      rows: [
        ["Struktur dasar", "`<!DOCTYPE html>` `<html>` `<head>` `<body>`"],
        ["Semantik", "`<header>` `<nav>` `<main>` `<section>` `<footer>`"],
        ["Teks", "`<h1>`–`<h6>` `<p>` `<strong>` `<em>`"],
        ["Daftar", "`<ul>` `<ol>` `<li>`"],
        ["Link & media", "`<a href>` `<img src alt>`"],
        ["Formulir", "`<form>` `<input>` `<select>` `<option>` `<textarea>` `<label>` `<button>`"],
        ["Tabel", "`<table>` `<tr>` `<th>` `<td>`"],
        ["Pembungkus", "`<div>` (blok) • `<span>` (inline)"]
      ],
      modes: [
        { label: "div vs span", target: "row", row: 7, title: "➕ Block vs inline", text: "<code><div></code> = wadah <strong>blok</strong> (mulai di baris baru, selebar induk). <code><span></code> = wadah <strong>inline</strong> (menyatu dengan teks). Keduanya tidak bermakna, dipakai sebagai “kait” untuk CSS lewat class/id." },
        { label: "Untuk CRUD", target: "row", row: 5, title: "Form & tabel = inti aplikasi CRUD", text: "Form untuk Create/Update data, tabel untuk menampilkan (Read) data mahasiswa." }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Catatan untuk Tugas",
      tone: "warn",
      heading: "3 hal sebelum mengumpulkan profil-styled.html + profil.css",
      html: "<ol><li><strong>Gambar placeholder di modul (<code>via.placeholder.com</code>) sudah tidak aktif</strong>, sehingga gambarnya tidak muncul. Pakai <code>https://placehold.co/150</code> atau foto sendiri di folder yang sama.</li><li><strong>File harus satu folder</strong> (atau sesuaikan path): <code><link rel=\"stylesheet\" href=\"profil.css\"></code>. Jika CSS tidak berefek, cek nama file dan huruf besar-kecilnya.</li><li>Penilaian meminta <strong>minimal 5 properti CSS</strong> di file eksternal dan efek <code>:hover</code> pada link.</li></ol>"
    }
  ],
  simulator: [
    {
      type: "playground",
      label: "Praktik 1 • Coba-Coba Selector",
      title: "Laboratorium Selector",
      desc: "Ketik aturan CSS di dalam <code><style></code>, hasilnya langsung tampil. Selesaikan misinya.",
      file: "selector.html",
      starter: STARTER_SELECTOR,
      solution: SOLUSI_SELECTOR,
      tasks: [
        { label: "Selector ID: beri latar pada `#judul_utama`", regex: "#judul_utama\\s*\\{[^}]*background(-color)?\\s*:" },
        { label: "Selector class: atur `.info`", regex: "\\.info\\s*\\{[^}]*:" },
        { label: "Class kedua: buat `.penting` berwarna merah", regex: "\\.penting\\s*\\{[^}]*color\\s*:\\s*(red|#f00\\b|#ff0000)" },
        { label: "Selector atribut: `input[type=text]` diberi border", regex: "input\\[type=[\"']?text[\"']?\\]\\s*\\{[^}]*border" },
        { label: "Grouping: satu aturan untuk dua selector (pakai koma)", regex: "[a-z#.][\\w-]*\\s*,\\s*[a-z#.][\\w-]*\\s*\\{" }
      ]
    },
    {
      type: "playground",
      label: "Praktik 2 • Aktivitas Modul 3",
      title: "Editor Live: Percantik Form Pendaftaran",
      desc: "CSS dari modul sudah dimuat (sebagai internal style agar bisa langsung dicoba). Kerjakan modifikasi dari modul, lalu klik <strong>Periksa Kode</strong>.",
      file: "styled-form.html",
      starter: STARTER_PRAKTIK,
      solution: SOLUSI_PRAKTIK,
      tasks: [
        { label: "Ubah latar `header` menjadi biru `#005566`", regex: "header\\s*\\{[^}]*background-color\\s*:\\s*#005566" },
        { label: "Tambahkan border pada `section` (mis. `1px solid #ccc`)", regex: "section\\s*\\{[^}]*border\\s*:" },
        { label: "Atur `font-size` label menjadi `14px`", regex: "label\\s*\\{[^}]*font-size\\s*:\\s*14px" }
      ]
    },
    {
      type: "playground",
      label: "Praktik 3 • Tugas Individu",
      title: "Latihan Tugas: profil-styled.html + profil.css",
      desc: "Kerjakan spesifikasi tugas. Di sini CSS ditulis di <code><style></code> agar bisa dicoba; saat mengumpulkan, pindahkan ke file <code>profil.css</code> dan hubungkan dengan <code><link></code>.<br><strong>Penilaian:</strong> struktur HTML 30% • CSS eksternal min. 5 properti 40% • estetika 20% • tepat waktu 10%.",
      file: "profil-styled.html",
      starter: STARTER_TUGAS,
      solution: SOLUSI_TUGAS,
      tasks: [
        { label: "Elemen semantik `<header>`, `<nav>`, `<main>`, `<footer>`", sel: "header ~ nav ~ main ~ footer" },
        { label: "Gambar profil `<img>` dengan `alt`", sel: "img[src][alt]" },
        { label: "Daftar keahlian `<ul>`/`<ol>` (min. 3 item)", sel: "main li", min: 3 },
        { label: "Link media sosial/kampus `<a href>`", sel: "main a[href]" },
        { label: "CSS: `font-family` untuk halaman", regex: "(body|html|\\*)\\s*\\{[^}]*font-family\\s*:" },
        { label: "CSS: warna latar `body` atau `main`", regex: "(body|main)\\s*\\{[^}]*background(-color)?\\s*:" },
        { label: "CSS: link nav horizontal (`display: inline`)", regex: "nav[^{]*\\{[^}]*display\\s*:\\s*inline" },
        { label: "CSS: `margin` dan `padding`", regex: "margin\\s*:[\\s\\S]*padding\\s*:|padding\\s*:[\\s\\S]*margin\\s*:" },
        { label: "CSS: efek `:hover` pada link", regex: "a:hover\\s*\\{" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 1 • Tebak Cara Pemasangan",
      title: "Kode Ini Memakai Metode Apa?",
      headers: ["Kode", "Metode"],
      rows: [
        { cells: ["`<p style=\"color:red\">Teks</p>`"], fields: [{ options: CARA, answer: "inline" }], ok: "✓ Atribut style langsung di tag." },
        { cells: ["`<head><style> p {color:blue;} </style></head>`"], fields: [{ options: CARA, answer: "internal" }], ok: "✓ Tag style di head (embedded)." },
        { cells: ["`<link rel=\"stylesheet\" href=\"style.css\">`"], fields: [{ options: CARA, answer: "external" }], ok: "✓ File .css terpisah." },
        { cells: ["Gaya 20 halaman ingin diubah sekaligus dari satu tempat"], fields: [{ options: CARA, answer: "external" }], ok: "✓ Cukup ubah satu file .css." },
        { cells: ["Metode yang dinilai tidak memenuhi tujuan CSS (desain bercampur konten)"], fields: [{ options: CARA, answer: "inline" }], ok: "✓ Inline." },
        { cells: ["Kekurangannya: CSS harus ditulis ulang di tiap halaman"], fields: [{ options: CARA, answer: "internal" }], ok: "✓ Internal." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Detektor Selector",
      title: "Selector Ini Termasuk Jenis Apa?",
      headers: ["Selector", "Jenis"],
      rows: [
        { cells: ["`h1`"], fields: [{ options: SELJ, answer: "tag" }], ok: "✓ Nama tag." },
        { cells: ["`.judul`"], fields: [{ options: SELJ, answer: "class" }], ok: "✓ Diawali titik." },
        { cells: ["`#header`"], fields: [{ options: SELJ, answer: "id" }], ok: "✓ Diawali #." },
        { cells: ["`input[type=email]`"], fields: [{ options: SELJ, answer: "atribut" }], ok: "✓ Kurung siku." },
        { cells: ["`*`"], fields: [{ options: SELJ, answer: "universal" }], ok: "✓ Semua elemen." },
        { cells: ["`h1, h2, p`"], fields: [{ options: SELJ, answer: "grouping" }], ok: "✓ Dipisah koma." },
        { cells: ["`p.center`"], fields: [{ options: SELJ, answer: "class" }], ok: "✓ Class center, khusus tag p." }
      ]
    },
    {
      type: "detective",
      label: "Permainan 3 • Detektif Bug CSS",
      title: "Kenapa Gayanya Tidak Muncul? Perbaiki 6 Kesalahan!",
      rules: ["`:` antara property & value", "`;` antar-property", "Property 2 kata pakai `-`", "Class pakai `.`, id pakai `#`", "Path file harus cocok"],
      headers: ["No.", "HTML terkait", "CSS bermasalah"],
      rows: [
        ["1", "`<p>`", "`p { color = blue; }`"],
        ["2", "`<p>`", "`p { color: blue font-size: 14px; }`"],
        ["3", "`<body>`", "`body { background color: #eee; }`"],
        ["4", "`<p class=\"info\">`", "`info { color: red; }`"],
        ["5", "`<h1 id=\"judul\">`", "`.judul { color: green; }`"],
        ["6", "`style.css` di folder yang sama", "`<link rel=\"stylesheet\" href=\"css/style.css\">`"]
      ],
      bugs: [
        { row: 0, col: 2, fixed: "`p { color: blue; }`", explain: "✅ Property dan value dipisah <strong>titik dua</strong>, bukan sama dengan." },
        { row: 1, col: 2, fixed: "`p { color: blue; font-size: 14px; }`", explain: "✅ Antar-property wajib dipisah <strong>titik koma</strong>." },
        { row: 2, col: 2, fixed: "`body { background-color: #eee; }`", explain: "✅ Property dua kata memakai <strong>tanda hubung</strong>." },
        { row: 3, col: 2, fixed: "`.info { color: red; }`", explain: "✅ Selector class diawali <strong>titik</strong>. Tanpa titik, browser mencari tag <code><info></code>." },
        { row: 4, col: 2, fixed: "`#judul { color: green; }`", explain: "✅ Atribut <code>id</code> dipilih dengan <strong>#</strong>, bukan titik." },
        { row: 5, col: 2, fixed: "`<link rel=\"stylesheet\" href=\"style.css\">`", explain: "✅ <code>href</code> harus menunjuk lokasi file yang benar. File ada di folder yang sama, jadi tanpa <code>css/</code>." }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • ➕ Cascade",
      title: "Teks Ini Akhirnya Berwarna Apa?",
      desc: "CSS: <code>p { color: navy; }</code> • <code>.info { color: blue; }</code> • <code>#intro { color: green; }</code>",
      items: [
        { prompt: "`<p>Halo</p>`", answer: "navy", reason: "Hanya kena selector tag." },
        { prompt: "`<p class=\"info\">Halo</p>`", answer: "blue", reason: "Class lebih kuat dari tag." },
        { prompt: "`<p id=\"intro\" class=\"info\">Halo</p>`", answer: "green", reason: "ID lebih kuat dari class." },
        { prompt: "`<p class=\"info\" style=\"color:red\">Halo</p>`", answer: "red", reason: "Inline style paling kuat." },
        { prompt: "`<p><i>Halo</i></p>`", answer: "navy", reason: "`<i>` di dalam `<p>` ikut mewarisi warna (efek tag selector berlaku sampai tag penutup)." },
        { prompt: "`<span class=\"info\">Halo</span>`", answer: "blue", reason: "Class bisa dipakai tag apa pun, tidak hanya p." }
      ]
    }
  ],
  flashcards: [
    { tag: "CSS", q: "Apa itu CSS dan slogannya?", a: "Cascading Style Sheets: kode untuk mengatur tampilan halaman HTML. “<strong>HTML for content (struktur), CSS for presentation (tampilan)</strong>”." },
    { tag: "CSS", q: "Mengapa CSS dibutuhkan (kasus tag font)?", a: "Dengan `<font color>` di setiap kata, mengganti warna di 50 artikel harus satu per satu. Dengan CSS (class), cukup ubah satu aturan dan semua ikut berubah." },
    { tag: "Pasang", q: "3 cara memasang CSS?", a: "<strong>Inline</strong> (atribut style), <strong>internal/embedded</strong> (`<style>` di head), <strong>external</strong> (file .css + `<link>`)." },
    { tag: "Pasang", q: "Kekurangan inline dan internal?", a: "<strong>Inline</strong>: CSS bercampur HTML, tidak memisahkan desain dari konten.<br><strong>Internal</strong>: harus ditulis ulang di setiap halaman yang gayanya sama." },
    { tag: "Pasang", q: "Fungsi atribut tag `<link>` untuk CSS?", a: "`rel=\"stylesheet\"` jenis hubungan • `href` alamat file CSS • `type=\"text/css\"` jenis file." },
    { tag: "Sintaks", q: "Apa itu selector, property, value?", a: "<strong>Selector</strong>: elemen yang dicari/diberi gaya. <strong>Property</strong>: jenis gaya yang diubah. <strong>Value</strong>: nilai property." },
    { tag: "Sintaks", q: "4 aturan tanda baca CSS?", a: "`{ }` pembungkus • `:` property–value • `;` antar-property • `,` antar-selector. Property 2 kata pakai `-`." },
    { tag: "Selector", q: "Simbol selector class, id, universal?", a: "Class: titik `.nama` • ID: pagar `#nama` • Universal: bintang `*`." },
    { tag: "Selector", q: "Beda class dan id?", a: "<strong>Class</strong>: boleh dipakai banyak tag, satu tag boleh banyak class. <strong>ID</strong>: unik, hanya sekali per halaman (juga dipakai JavaScript)." },
    { tag: "Selector", q: "5 kategori selector menurut PDF?", a: "Simple, combinator, pseudo-class, pseudo-element, attribute selector." },
    { tag: "Properti", q: "Beda margin dan padding?", a: "<strong>margin</strong>: jarak luar elemen. <strong>padding</strong>: jarak dalam (antara border dan isi)." },
    { tag: "Tag", q: "Beda `<div>` dan `<span>`?", a: "`<div>` wadah blok untuk mengelompokkan elemen; `<span>` wadah inline untuk teks kecil. Keduanya tidak bermakna, dipakai sebagai kait CSS." },
    { tag: "➕ Cascade", q: "Urutan prioritas aturan CSS?", a: "Inline > ID > class/atribut/pseudo-class > tag > universal. Jika setara, aturan yang ditulis terakhir menang. `!important` mengalahkan semuanya." },
    { tag: "➕ Selector", q: "Apa arti `nav ul li a` dan `a:hover`?", a: "`nav ul li a` (combinator/descendant): link di dalam li di dalam ul di dalam nav. `a:hover` (pseudo-class): link saat kursor berada di atasnya." }
  ],
  quiz: [
    { q: "Metode memasang CSS dengan menuliskan atribut `style` langsung pada tag HTML disebut …",
      opts: ["External style sheet", "Internal style sheet", "Inline style", "Embedded style"], ans: 2,
      exp: "Inline style = atribut style di dalam tag.",
      optExp: ["External memakai file .css terpisah.", "Internal memakai tag style di head.", "Benar.", "Embedded adalah nama lain internal."] },
    { q: "Tag `<style>` pada metode internal style sheet harus diletakkan di …",
      opts: ["`<body>`", "`<head>`", "`<footer>`", "Setelah `</html>`"], ans: 1,
      exp: "Internal/embedded style sheet ditulis dalam tag style di bagian head.",
      optExp: ["Bukan menurut materi.", "Benar.", "Footer adalah elemen konten.", "Di luar dokumen HTML."] },
    { q: "Kelebihan utama external style sheet dibanding internal adalah …",
      opts: ["Prioritasnya paling tinggi", "Satu file CSS bisa dipakai banyak halaman", "Tidak memerlukan tag apa pun", "Ditulis di dalam atribut style"], ans: 1,
      exp: "Setiap halaman tinggal memanggil file CSS yang sama dengan link.",
      optExp: ["Jebakan: yang paling tinggi prioritasnya adalah inline.", "Benar.", "Tetap butuh tag link.", "Itu inline."] },
    { q: "Pada aturan `p { color: red; }`, kata `color` disebut …",
      opts: ["Selector", "Property", "Value", "Declaration block"], ans: 1,
      exp: "p = selector, color = property, red = value.",
      optExp: ["Selector adalah p.", "Benar.", "Value adalah red.", "Declaration block adalah seluruh isi kurung kurawal."] },
    { q: "Tanda yang memisahkan property dengan value dalam CSS adalah …",
      opts: ["Titik koma (;)", "Koma (,)", "Titik dua (:)", "Sama dengan (=)"], ans: 2,
      exp: "`:` antara property dan value; `;` antar-property; `,` antar-selector.",
      optExp: ["Memisahkan antar-property.", "Memisahkan antar-selector.", "Benar.", "Jebakan: = dipakai di atribut HTML, bukan CSS."] },
    { q: "Selector CSS untuk memilih elemen `<h1 id=\"judul_utama\">` adalah …",
      opts: ["`.judul_utama`", "`#judul_utama`", "`*judul_utama`", "`h1[judul_utama]`"], ans: 1,
      exp: "ID dipilih dengan tanda pagar (#).",
      optExp: ["Titik untuk class.", "Benar.", "Bintang adalah universal selector.", "Penulisan selector atribut yang salah."] },
    { q: "Pernyataan yang BENAR tentang class dan id adalah …",
      opts: ["Satu id boleh dipakai banyak elemen dalam satu halaman", "Satu elemen hanya boleh punya satu class", "Satu class boleh dipakai banyak elemen, id harus unik", "Class dan id diawali simbol yang sama"], ans: 2,
      exp: "Class bisa dipakai banyak tag (dan satu tag bisa banyak class); id hanya sekali per halaman.",
      optExp: ["Id harus unik.", "Satu tag boleh banyak class: class=\"judul penting berwarna\".", "Benar.", "Class pakai titik, id pakai pagar."] },
    { q: "Kode `h1, h2 { color: green; }` merupakan contoh …",
      opts: ["Universal selector", "Grouping selector", "Attribute selector", "Pseudo-class"], ans: 1,
      exp: "Beberapa selector yang dipisah koma dan berbagi gaya disebut grouping.",
      optExp: ["Universal adalah *.", "Benar.", "Attribute memakai kurung siku.", "Pseudo-class memakai titik dua, mis. :hover."] },
    { q: "Properti CSS yang mengatur jarak di dalam elemen (antara border dan isi) adalah …",
      opts: ["margin", "padding", "border", "spacing"], ans: 1,
      exp: "padding = jarak dalam; margin = jarak luar.",
      optExp: ["Margin adalah jarak luar.", "Benar.", "Border adalah garis tepi.", "Bukan property CSS standar."] },
    { q: "Terdapat CSS `p {color:navy}` dan `.info {color:blue}`. Elemen `<p class=\"info\" style=\"color:red\">` akan berwarna …",
      opts: ["navy", "blue", "red", "hitam (default)"], ans: 2,
      exp: "Inline style memiliki prioritas tertinggi dibanding class dan tag.",
      optExp: ["Tag paling lemah di antara ketiganya.", "Class kalah oleh inline.", "Benar.", "Ada aturan yang berlaku, jadi bukan default."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 3*
📚 *Pengenalan CSS*

1️⃣ *CSS* = Cascading Style Sheets, mengatur tampilan HTML. "HTML for content, CSS for presentation". Menggantikan cara lama <font color> yang sulit dirawat.

2️⃣ *3 cara pasang:*
• Inline: <p style="color:red"> (praktis tapi tidak disarankan)
• Internal/embedded: <style> di <head> (harus ditulis ulang tiap halaman)
• External: file .css + <link rel="stylesheet" href="style.css" type="text/css"> (terbaik untuk proyek besar)

3️⃣ *Sintaks:* selector { property: value; }
• , antar-selector • : property–value • ; antar-property • property 2 kata pakai - (background-color).

4️⃣ *Selector:* tag (p) • class (.nama, boleh banyak) • id (#nama, unik) • atribut (input[type=text]) • universal (*) • grouping (h1, h2).
• Kategori PDF: simple, combinator, pseudo-class, pseudo-element, attribute.

5️⃣ *Properti dasar:* color, font-size, font-family, background-color, margin (luar), padding (dalam).

6️⃣ *Prioritas:* inline > id > class > tag > universal; seri → yang terakhir menang.

7️⃣ *Tag umum:* div (blok) & span (inline) sebagai kait CSS; form & table inti aplikasi CRUD.`
});
