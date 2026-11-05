// Pemrograman Web Dinamis — Pertemuan 5: Desain Responsif (media queries & unit relatif)
// Sumber: Modul CSS 5. Bagian "➕ Tambahan" bukan dari modul.
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

const UNIT = ["%", "vw", "vh", "rem", "em", "px"];
const BP = [{ value: "mobile", label: "Mobile (≤ 600px)" }, { value: "tablet", label: "Tablet (601–1024px)" }, { value: "desktop", label: "Desktop (≥ 1025px)" }];

const CSS_DASAR = `        body { font-family: Arial, sans-serif; margin: 2rem; background-color: #f4f4f4; }
        header { background-color: #005566; color: white; padding: 1rem; text-align: center; }
        nav ul { list-style-type: none; padding: 0; }
        nav ul li { display: inline; margin-right: 1rem; }
        nav ul li a { text-decoration: none; color: #333; }
        .container { width: 80%; max-width: 800px; margin: 0 auto; }
        form { background-color: white; padding: 1.5rem; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        label { display: block; margin-bottom: 0.5rem; font-size: 1rem; }
        input, select { width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        button { background-color: #4CAF50; color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #45a049; }
        footer { text-align: center; margin-top: 2rem; color: #666; }

        /* Media query untuk mobile (max-width: 600px) */
        @media (max-width: 600px) {
            .container { width: 95%; }
            header { padding: 0.5rem; }
            nav ul li { display: block; margin-bottom: 0.5rem; }
            label { font-size: 0.9rem; }
            input, select { padding: 0.6rem; }
            button { width: 100%; }
        }`;

const BODY = `    <header>
        <h1>Sistem Manajemen Mahasiswa</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Beranda</a></li>
            <li><a href="#pendaftaran">Pendaftaran</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>
    <div class="container">
        <main>
            <section>
                <h2>Form Pendaftaran Mahasiswa</h2>
                <p>Isi form berikut untuk mendaftar sebagai mahasiswa baru.</p>
                <form action="#" method="POST">
                    <label for="nim">NIM:</label>
                    <input type="text" id="nim" name="nim" placeholder="Masukkan NIM" required>
                    <label for="nama">Nama:</label>
                    <input type="text" id="nama" name="nama" placeholder="Masukkan Nama Lengkap" required>
                    <label for="jurusan">Jurusan:</label>
                    <select id="jurusan" name="jurusan" required>
                        <option value="">Pilih Jurusan</option>
                        <option value="si">Sistem Informasi</option>
                        <option value="ti">Teknik Informatika</option>
                    </select>
                    <button type="submit">Simpan Data</button>
                </form>
            </section>
        </main>
    </div>
    <footer>
        <p>&copy; 2025 Universitas Contoh</p>
    </footer>`;

const STARTER = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Pendaftaran Responsif</title>
    <!-- Di laptop: isi <style> ini = file responsive.css -->
    <style>
${CSS_DASAR}
    </style>
</head>
<body>
${BODY}
</body>
</html>`;

const SOLUSI = STARTER.replace("        }\n    </style>", `        }

        /* Media query untuk tablet */
        @media (min-width: 601px) and (max-width: 1024px) {
            .container { width: 90%; }
            label { font-size: 0.95rem; }
        }

        img { max-width: 100%; height: auto; }
    </style>`);

module.exports = fix({
  id: "p5",
  nomor: 5,
  judul: "Desain Responsif: Media Queries & Unit Relatif",
  ujian: "UTS",
  hero: {
    badge: "Materi 5 • Pemrograman Web Dinamis",
    title: "Satu Halaman, Rapi di HP, Tablet, dan Laptop",
    text: "Pahami <strong>prinsip desain responsif</strong>, <strong>media queries</strong> & breakpoint, serta <strong>unit relatif</strong> (%, vw, vh, rem, em). Coba langsung dengan tombol ukuran layar 📱 di editor. ➕ Termasuk <strong>meta viewport</strong> yang tidak ada di modul, padahal tanpanya media query tidak bekerja di HP."
  },
  cheatsheet: [
    {
      type: "cards",
      label: "Interaktif 1 • Konsep Desain Responsif",
      title: "3 Prinsip & 3 Manfaat",
      desc: "Desain responsif = halaman menyesuaikan tata letak, ukuran font, dan elemen lain berdasarkan ukuran layar. Tujuannya: <strong>UX</strong> dan <strong>aksesibilitas</strong>.",
      cols: 3,
      items: [
        { badge: "Prinsip 1", tone: "indigo", title: "Fluid layouts", text: "Pakai unit relatif agar lebar ikut layar." },
        { badge: "Prinsip 2", tone: "indigo", title: "Media queries", text: "Aturan CSS khusus untuk rentang ukuran layar." },
        { badge: "Prinsip 3", tone: "indigo", title: "Flexible images", text: "Gambar menyesuaikan tanpa merusak layout: <code>max-width: 100%</code>." },
        { badge: "Manfaat 1", tone: "emerald", title: "Aksesibel di semua perangkat" },
        { badge: "Manfaat 2", tone: "emerald", title: "Tak perlu versi web terpisah", text: "Satu situs untuk desktop & mobile." },
        { badge: "Manfaat 3", tone: "emerald", title: "Disukai SEO", text: "Google mengutamakan situs ramah mobile." }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Wajib Ada!",
      tone: "danger",
      heading: "Tanpa meta viewport, media query “tidak jalan” di HP",
      html: "Contoh HTML di modul belum memakai baris ini. Tanpanya, browser HP berpura-pura layarnya ±980px lalu memperkecil halaman, sehingga <code>@media (max-width: 600px)</code> tidak pernah aktif. Taruh di dalam <code><head></code>:<br><code><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></code>"
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "code",
          label: "Interaktif 2 • Media Queries",
          title: "Sintaks Dasar",
          file: "responsive.css",
          code: "/* aturan umum (semua layar) */\nbody { font-size: 16px; }\n\n/* mobile: lebar layar <= 600px */\n@media (max-width: 600px) {\n    body { font-size: 14px; }\n    .container { width: 100%; }\n}\n\n/* tablet: 601px s.d. 1024px */\n@media (min-width: 601px) and (max-width: 1024px) {\n    .container { width: 90%; }\n}",
          note: "<code>max-width</code> = berlaku jika lebar layar <strong>≤</strong> nilai. <code>min-width</code> = berlaku jika <strong>≥</strong> nilai. <code>orientation: portrait/landscape</code> = berdasarkan posisi layar. Dua kondisi digabung dengan <code>and</code>."
        },
        {
          type: "table",
          title: "Breakpoint Populer (Modul)",
          headers: ["Perangkat", "Kondisi"],
          rows: [
            ["📱 Mobile", "`max-width: 600px`"],
            ["📟 Tablet", "`min-width: 601px` and `max-width: 1024px`"],
            ["🖥️ Desktop", "`min-width: 1025px`"]
          ],
          modes: [
            { label: "➕ Urutan penting", target: "none", title: "Taruh media query di BAWAH aturan umum", text: "Jika kekuatannya sama, aturan yang ditulis terakhir menang (cascade). Media query yang ditulis di atas aturan umum akan tertimpa." },
            { label: "➕ Mobile-first", target: "row", row: 2, title: "Pendekatan mobile-first", text: "Tulis gaya untuk HP sebagai aturan dasar, lalu tambah layar besar dengan <code>min-width</code>. Ini kebalikan dari modul (desktop dulu, lalu <code>max-width</code>); keduanya sah." }
          ]
        }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Unit Relatif",
      title: "5 Unit Relatif & Patokannya",
      desc: "Klik tombol untuk contoh perhitungan.",
      headers: ["Unit", "Relatif terhadap", "Contoh modul", "Cocok untuk"],
      rows: [
        ["`%`", "Elemen induk", "`.container { width: 80%; }`", "Lebar container"],
        ["`vw`", "1% lebar viewport (layar)", "`h1 { font-size: 5vw; }`", "Lebar/teks besar yang ikut layar"],
        ["`vh`", "1% tinggi viewport", "`.hero { height: 50vh; }`", "Tinggi bagian layar"],
        ["`rem`", "Ukuran font root (`html`)", "`p { font-size: 1.2rem; }`", "Font & jarak yang konsisten"],
        ["`em`", "Ukuran font elemen induk", "`.button { padding: 1em; }`", "Jarak yang ikut ukuran teksnya"]
      ],
      modes: [
        { label: "Hitung rem", target: "row", row: 3, title: "1.2rem = ?", text: "Font root default browser 16px → 1.2 × 16 = <strong>19.2px</strong>." },
        { label: "Hitung vw", target: "row", row: 1, title: "5vw di HP 360px = ?", text: "5% × 360 = <strong>18px</strong>. Di laptop 1280px → 64px." },
        { label: "➕ Jebakan em", target: "row", row: 4, title: "em bisa “berlipat”", text: "Induk 20px, anak <code>font-size: 1.5em</code> → 30px; cucu <code>1.5em</code> lagi → 45px. <code>rem</code> tidak berlipat karena selalu mengacu ke <code>html</code>." },
        { label: "Praktik terbaik", target: "none", title: "Saran modul", text: "% atau vw untuk lebar container • rem/em untuk font & jarak • hindari px untuk elemen yang perlu responsif." }
      ]
    },
    {
      type: "cards",
      label: "➕ Tambahan • Resep Responsif Siap Pakai",
      title: "Masalah yang Sering Muncul di HP",
      cols: 3,
      items: [
        { badge: "Gambar kebesaran", tone: "rose", title: "img melebar keluar layar", text: "<code>img { max-width: 100%; height: auto; }</code>" },
        { badge: "Tabel kepotong", tone: "amber", title: "Tabel 4 kolom terlalu lebar", text: "Bungkus dengan <code><div style=\"overflow-x:auto\"></code> agar bisa digeser, atau kecilkan font/padding di media query mobile." },
        { badge: "Uji di laptop", tone: "sky", title: "DevTools", text: "Tekan <strong>F12</strong> → ikon <strong>Toggle Device Toolbar</strong> (Ctrl+Shift+M) → pilih ukuran HP." }
      ]
    }
  ],
  simulator: [
    {
      type: "playground",
      label: "Praktik 1 • Aktivitas Modul 5",
      title: "Editor Live: Form Pendaftaran Responsif",
      desc: "Klik tombol <strong>📱 360</strong> dan <strong>📟 768</strong> di atas pratinjau untuk melihat tampilan HP & tablet. Lalu kerjakan modifikasi modul.",
      file: "responsive-form.html",
      devices: true,
      starter: STARTER,
      solution: SOLUSI,
      tasks: [
        { label: "Tambah media query tablet `(min-width: 601px) and (max-width: 1024px)`", regex: "@media\\s*\\(\\s*min-width\\s*:\\s*601px\\s*\\)\\s*and\\s*\\(\\s*max-width\\s*:\\s*1024px\\s*\\)" },
        { label: "Di tablet: `.container` lebar `90%`", regex: "601px[\\s\\S]*\\.container\\s*\\{[^}]*width\\s*:\\s*90%" },
        { label: "Di tablet: label `font-size: 0.95rem`", regex: "601px[\\s\\S]*label\\s*\\{[^}]*font-size\\s*:\\s*0?\\.95rem" },
        { label: "Gambar tidak overflow: `max-width: 100%`", regex: "img\\s*\\{[^}]*max-width\\s*:\\s*100%" }
      ]
    },
    {
      type: "exercise",
      label: "Kalkulator • Unit Relatif",
      title: "Hitung Ukuran Sebenarnya (px)",
      desc: "Anggap font root <code>html</code> = 16px, layar HP = 360 × 800px.",
      headers: ["Soal", "Hasil (px)"],
      rows: [
        { cells: ["`font-size: 1.5rem`"], fields: [{ answer: "24", placeholder: "angka" }], ok: "✓ 1.5 × 16." },
        { cells: ["`width: 50vw` di HP"], fields: [{ answer: "180", placeholder: "angka" }], ok: "✓ 50% × 360." },
        { cells: ["`height: 50vh` di HP"], fields: [{ answer: "400", placeholder: "angka" }], ok: "✓ 50% × 800." },
        { cells: ["`width: 80%` dari induk selebar 500px"], fields: [{ answer: "400", placeholder: "angka" }], ok: "✓ 80% × 500." },
        { cells: ["`padding: 2em` pada elemen ber-font 14px"], fields: [{ answer: "28", placeholder: "angka" }], ok: "✓ 2 × 14 (em mengacu font elemen itu/induknya)." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 1 • Pilih Unit",
      title: "Unit Mana yang Paling Tepat?",
      headers: ["Kebutuhan", "Unit"],
      rows: [
        { cells: ["Container selebar 80% dari induknya"], fields: [{ options: UNIT, answer: "%" }], ok: "✓ Persen relatif ke induk." },
        { cells: ["Banner setinggi setengah layar"], fields: [{ options: UNIT, answer: "vh" }], ok: "✓ Tinggi viewport." },
        { cells: ["Judul yang membesar mengikuti lebar layar"], fields: [{ options: UNIT, answer: "vw" }], ok: "✓ Lebar viewport." },
        { cells: ["Ukuran font konsisten di seluruh halaman"], fields: [{ options: UNIT, answer: "rem" }], ok: "✓ Mengacu root, tidak berlipat." },
        { cells: ["Padding tombol yang ikut ukuran teks tombol"], fields: [{ options: UNIT, answer: "em" }], ok: "✓ Relatif font elemen." },
        { cells: ["Garis border tipis 1 piksel"], fields: [{ options: UNIT, answer: "px" }], ok: "✓ Garis tipis memang wajar memakai px." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Breakpoint Mana yang Aktif?",
      title: "Lebar Layar → Media Query yang Berlaku",
      headers: ["Lebar layar", "Aturan aktif"],
      rows: [
        { cells: ["360px (HP)"], fields: [{ options: BP, answer: "mobile" }], ok: "✓ ≤ 600." },
        { cells: ["600px"], fields: [{ options: BP, answer: "mobile" }], ok: "✓ max-width 600 termasuk 600 (≤)." },
        { cells: ["601px"], fields: [{ options: BP, answer: "tablet" }], ok: "✓ Mulai tablet." },
        { cells: ["1024px (iPad landscape)"], fields: [{ options: BP, answer: "tablet" }], ok: "✓ ≤ 1024 masih tablet." },
        { cells: ["1366px (laptop)"], fields: [{ options: BP, answer: "desktop" }], ok: "✓ ≥ 1025." }
      ]
    }
  ],
  flashcards: [
    { tag: "Responsif", q: "Apa itu desain responsif dan 3 prinsipnya?", a: "Halaman menyesuaikan tata letak & ukuran dengan layar. Prinsip: <strong>fluid layouts</strong>, <strong>media queries</strong>, <strong>flexible images</strong>." },
    { tag: "Responsif", q: "3 manfaat desain responsif?", a: "Aksesibel di berbagai perangkat, tidak perlu versi web terpisah, mendukung SEO." },
    { tag: "Media query", q: "Beda max-width dan min-width?", a: "`max-width: 600px` berlaku jika layar ≤ 600px. `min-width: 601px` berlaku jika layar ≥ 601px." },
    { tag: "Media query", q: "Breakpoint populer menurut modul?", a: "Mobile ≤ 600px • Tablet 601–1024px • Desktop ≥ 1025px." },
    { tag: "Unit", q: "Patokan %, vw, vh, rem, em?", a: "% → induk • vw → 1% lebar layar • vh → 1% tinggi layar • rem → font root (html) • em → font elemen induk." },
    { tag: "Unit", q: "Praktik terbaik pemilihan unit?", a: "% atau vw untuk lebar container, rem/em untuk font & jarak, hindari px untuk elemen yang perlu responsif." },
    { tag: "➕ Viewport", q: "Kenapa meta viewport wajib?", a: "Tanpa `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`, browser HP berpura-pura lebar ±980px sehingga media query mobile tidak aktif." },
    { tag: "➕ Gambar", q: "Kode agar gambar tidak keluar layar?", a: "`img { max-width: 100%; height: auto; }`" }
  ],
  quiz: [
    { q: "Fitur CSS untuk menerapkan aturan berdasarkan lebar layar perangkat adalah …",
      opts: ["Flexbox", "Media queries", "Box model", "Selector atribut"], ans: 1,
      exp: "@media (kondisi) { ... }",
      optExp: ["Flexbox untuk layout.", "Benar.", "Box model tentang ukuran kotak.", "Untuk memilih elemen berdasarkan atribut."] },
    { q: "`@media (max-width: 600px) { ... }` akan berlaku ketika …",
      opts: ["Lebar layar ≥ 600px", "Lebar layar ≤ 600px", "Tinggi layar ≤ 600px", "Layar dalam posisi landscape"], ans: 1,
      exp: "max-width = lebar maksimum: berlaku jika lebar kurang dari atau sama dengan 600px.",
      optExp: ["Itu min-width.", "Benar.", "Yang dicek lebar, bukan tinggi.", "Itu orientation."] },
    { q: "Rentang breakpoint tablet menurut modul adalah …",
      opts: ["max-width: 600px", "min-width: 601px dan max-width: 1024px", "min-width: 1025px", "min-width: 320px dan max-width: 600px"], ans: 1,
      exp: "Mobile ≤600, tablet 601–1024, desktop ≥1025.",
      optExp: ["Itu mobile.", "Benar.", "Itu desktop.", "Bukan breakpoint modul."] },
    { q: "Unit yang relatif terhadap ukuran font elemen root (`html`) adalah …",
      opts: ["em", "rem", "vw", "%"], ans: 1,
      exp: "rem = root em.",
      optExp: ["Jebakan: em relatif ke font elemen induk.", "Benar.", "vw relatif ke lebar viewport.", "% relatif ke induk."] },
    { q: "Jika font root 16px, maka `1.5rem` setara dengan …",
      opts: ["16px", "20px", "24px", "32px"], ans: 2,
      exp: "1.5 × 16 = 24px.",
      optExp: ["Itu 1rem.", "Itu 1.25rem.", "Benar.", "Itu 2rem."] },
    { q: "Unit `50vh` berarti …",
      opts: ["50% lebar induk", "50% lebar viewport", "50% tinggi viewport", "50 kali ukuran font"], ans: 2,
      exp: "vh = viewport height.",
      optExp: ["Itu 50%.", "Itu 50vw.", "Benar.", "Bukan."] },
    { q: "Prinsip “flexible images” diwujudkan dengan kode …",
      opts: ["`img { width: 1000px; }`", "`img { max-width: 100%; }`", "`img { display: none; }`", "`img { position: absolute; }`"], ans: 1,
      exp: "max-width: 100% (➕ ditambah height: auto) membuat gambar tidak melebihi wadahnya.",
      optExp: ["Ukuran tetap akan meluber di HP.", "Benar.", "Menyembunyikan gambar.", "Tidak membuat gambar fleksibel."] },
    { q: "Berikut manfaat desain responsif, KECUALI …",
      opts: ["Meningkatkan aksesibilitas di berbagai perangkat", "Tidak perlu membuat versi web terpisah", "Mendukung SEO", "Membuat situs tidak bisa dibuka di desktop"], ans: 3,
      exp: "Responsif justru membuat satu situs rapi di semua perangkat.",
      optExp: ["Manfaat.", "Manfaat.", "Manfaat.", "Benar, ini bukan manfaat."] },
    { q: "Saran modul untuk ukuran font dan jarak agar konsisten adalah memakai unit …",
      opts: ["px", "rem atau em", "vh", "cm"], ans: 1,
      exp: "% / vw untuk lebar, rem/em untuk font & jarak.",
      optExp: ["Px absolut, dihindari untuk elemen responsif.", "Benar.", "vh untuk tinggi.", "Satuan cetak."] },
    { q: "Halaman sudah punya media query `max-width: 600px`, tetapi di HP tampilannya tetap seperti desktop yang diperkecil. Penyebab paling mungkin adalah …",
      opts: ["Belum memakai Flexbox", "Belum ada `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`", "Font belum memakai rem", "Tabel belum diberi border"], ans: 1,
      exp: "➕ Tanpa meta viewport, browser HP memakai lebar virtual ±980px, sehingga media query mobile tidak aktif.",
      optExp: ["Tidak terkait media query.", "Benar.", "Tidak membuat media query mati.", "Tidak terkait."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 5*
📚 *Desain Responsif*

1️⃣ *Prinsip:* fluid layouts (unit relatif) • media queries • flexible images (img {max-width:100%}).
*Manfaat:* aksesibel di semua perangkat, tak perlu versi terpisah, SEO.

2️⃣ *Media queries:* @media (kondisi) { ... }
• max-width = layar ≤ nilai • min-width = layar ≥ nilai • orientation.
• Breakpoint: mobile ≤600px • tablet 601–1024px • desktop ≥1025px.

3️⃣ *Unit relatif:* % (induk) • vw (1% lebar layar) • vh (1% tinggi layar) • rem (font root) • em (font induk).
• Saran: %/vw untuk lebar, rem/em untuk font & jarak, hindari px.

4️⃣ *Wajib:* <meta name="viewport" content="width=device-width, initial-scale=1.0"> di <head>, tanpa ini media query mobile tidak jalan di HP.`
});
