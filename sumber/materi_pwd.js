// Materi Lengkap — Pemrograman Web Dinamis P1–P8 (modul + pengayaan dari MDN Web Docs, W3C/WHATWG HTML Living Standard)
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });
const code = (file, src, note, title) => ({ type: "code", label: "Contoh Kode", title, file, code: src, note });
const e = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const c = s => "<code>" + e(s) + "</code>";
const lbl = (x, y, t, size, anchor) => text(x, y, t, { size: size || 12, color: "#475569", weight: 600, anchor });

// ================= DIAGRAM =================
const clientServer = diagram({
  label: "Diagram Interaktif", title: "Perjalanan Sebuah Request", desc: "Klik setiap komponen. Bagian kanan (PHP + database) hanya ada pada web dinamis.", minw: 640,
  svg: svg(800, 290,
    box(10, 110, 110, 70, "👤 User|ketik URL", "slate", "usr", { size: 13 }) + arrow(122, 145, 152, 145) +
    box(155, 110, 130, 70, "Browser|(client)", "sky", "brw", { size: 14 }) +
    box(300, 10, 150, 60, "DNS|nama → IP", "amber", "dns", { size: 13 }) +
    path("M240,108 L330,72", { dash: "5 4" }) +
    arrow(287, 132, 460, 132) + lbl(373, 120, "HTTP request") +
    arrow(460, 162, 290, 162) + lbl(373, 180, "HTTP response (HTML)") +
    box(462, 105, 140, 80, "Web server|Apache/Nginx", "indigo", "srv", { size: 13 }) +
    arrow(604, 130, 650, 85) + box(652, 40, 140, 70, "PHP|olah logika", "violet", "php", { size: 14 }) +
    arrow(722, 112, 722, 178) + box(652, 180, 140, 70, "Database|MySQL", "emerald", "db", { size: 14 }) +
    box(155, 220, 300, 55, "Browser me-render HTML+CSS+JS → tampil", "white", "rnd", { size: 12 }) + arrow(220, 182, 220, 217)
  ),
  parts: [
    { id: "usr", label: "User", title: "1. Pengguna mengetik URL", text: "Misalnya <em>https://sibermu.ac.id/prodi</em>, atau mengklik sebuah link." },
    { id: "brw", label: "Browser", title: "2. Browser (client)", text: "Chrome, Firefox, Edge. Tugasnya meminta dokumen ke server dan menampilkan (render) hasilnya." },
    { id: "dns", label: "DNS", title: "➕ DNS: buku telepon internet", text: "Komputer berkomunikasi memakai alamat IP. DNS (Domain Name System) mengubah nama domain menjadi IP server, lalu browser menghubungi IP itu." },
    { id: "srv", label: "Web server", title: "3. Web server", text: "Perangkat lunak (Apache, Nginx) yang menerima request lewat HTTP/HTTPS lalu mengirim response. Pada web <strong>statis</strong>, server langsung mengirim file HTML apa adanya." },
    { id: "php", label: "PHP", title: "4. Bahasa server-side (web dinamis)", text: "Pada web <strong>dinamis</strong>, server menjalankan dulu kode PHP: misalnya mengecek login atau mengambil data, lalu <strong>menghasilkan HTML</strong> yang berbeda untuk tiap pengguna." },
    { id: "db", label: "Database", title: "5. Database", text: "Tempat menyimpan data (mahasiswa, nilai, produk). PHP mengirim perintah SQL dan menerima hasilnya. Inilah dasar aplikasi CRUD." },
    { id: "rnd", label: "Render", title: "6. Render", text: "Browser hanya menerima HTML, CSS, dan JavaScript. Kode PHP <strong>tidak pernah</strong> sampai ke browser; coba klik kanan → View Page Source di situs PHP, kamu hanya melihat HTML hasilnya." }
  ]
});

const urlAnatomy = diagram({
  label: "Diagram Interaktif", title: "Anatomi URL", desc: "Klik setiap bagian alamat.", minw: 620,
  svg: svg(800, 150,
    [["https://", 95, "sky", "pr"], ["www.sibermu.ac.id", 190, "amber", "dm"], [":443", 60, "slate", "pt"], ["/prodi/si.php", 150, "emerald", "ph"], ["?id=5&tab=nilai", 160, "violet", "qs"], ["#jadwal", 95, "rose", "fr"]]
      .reduce((acc, [t, w, tone, id]) => { acc.s += box(acc.x, 30, w, 55, t, tone, id, { size: 13, r: 6 }); acc.x += w + 6; return acc; }, { s: "", x: 10 }).s +
    lbl(57, 112, "protokol") + lbl(200, 112, "domain/host") + lbl(330, 112, "port") + lbl(440, 112, "path") + lbl(600, 112, "query string") + lbl(750, 112, "fragmen")
  ),
  parts: [
    { id: "pr", label: "Protokol", title: "Skema/protokol", text: "Aturan komunikasi. <strong>https</strong> = HTTP + enkripsi TLS (ikon gembok). http biasa tidak terenkripsi." },
    { id: "dm", label: "Domain", title: "Nama domain", text: "Alamat yang mudah diingat. <em>.ac.id</em> = domain tingkat atas untuk perguruan tinggi Indonesia. <em>www</em> adalah subdomain." },
    { id: "pt", label: "Port", title: "➕ Port", text: "Biasanya tidak ditulis: HTTP memakai port 80, HTTPS port 443. Saat belajar lokal dengan XAMPP kamu akan bertemu <em>localhost:80</em> atau <em>localhost:8080</em>." },
    { id: "ph", label: "Path", title: "Path", text: "Lokasi file/halaman di server. Ekstensi <em>.php</em> menandakan halaman dinamis." },
    { id: "qs", label: "Query", title: "➕ Query string", text: "Diawali <strong>?</strong>, pasangan <em>nama=nilai</em> dipisah <strong>&amp;</strong>. Inilah cara form ber-<em>method GET</em> mengirim data; di PHP dibaca dengan <code>$_GET['id']</code>." },
    { id: "fr", label: "Fragmen", title: "➕ Fragmen", text: "Diawali <strong>#</strong>, melompat ke elemen ber-id itu di halaman. Tidak dikirim ke server." }
  ]
});

const htmlTree = diagram({
  label: "Diagram Interaktif", title: "Kerangka Dokumen HTML", desc: "Setiap halaman HTML punya struktur pohon yang sama. Klik setiap simpul.", minw: 560,
  svg: svg(760, 300,
    box(300, 10, 160, 50, "<!DOCTYPE html>", "slate", "dt", { size: 13 }) + arrow(380, 60, 380, 82) +
    box(310, 85, 140, 50, "<html lang=\"id\">", "indigo", "ht", { size: 13 }) +
    path("M340,135 L200,170") + path("M420,135 L560,170") +
    box(120, 172, 160, 50, "<head>", "amber", "hd", { size: 14 }) + box(480, 172, 160, 50, "<body>", "emerald", "bd", { size: 14 }) +
    box(20, 245, 110, 42, "<meta>", "white", "hd", { size: 12 }) + box(140, 245, 110, 42, "<title>", "white", "hd", { size: 12 }) + box(260, 245, 110, 42, "<link>", "white", "hd", { size: 12 }) +
    path("M150,222 L80,243", { noArrow: true }) + path("M200,222 L195,243", { noArrow: true }) + path("M250,222 L310,243", { noArrow: true }) +
    box(400, 245, 105, 42, "<h1>", "white", "bd", { size: 12 }) + box(512, 245, 105, 42, "<p>", "white", "bd", { size: 12 }) + box(624, 245, 120, 42, "<a> <img>…", "white", "bd", { size: 12 }) +
    path("M530,222 L452,243", { noArrow: true }) + path("M560,222 L564,243", { noArrow: true }) + path("M600,222 L684,243", { noArrow: true })
  ),
  parts: [
    { id: "dt", label: "DOCTYPE", title: "&lt;!DOCTYPE html&gt;", text: "Memberi tahu browser bahwa dokumen ini HTML5. Bukan tag, dan ditulis paling atas." },
    { id: "ht", label: "html", title: "&lt;html&gt;", text: "Elemen akar (root). Atribut <code>lang=\"id\"</code> ➕ membantu screen reader dan mesin pencari tahu bahasa halaman." },
    { id: "hd", label: "head", title: "&lt;head&gt;: informasi tentang halaman", text: "Tidak tampil di layar: <code>&lt;meta charset=\"UTF-8\"&gt;</code>, meta viewport (P5), <code>&lt;title&gt;</code> (judul di tab), dan <code>&lt;link&gt;</code> ke file CSS (P3)." },
    { id: "bd", label: "body", title: "&lt;body&gt;: isi yang tampil", text: "Semua yang dilihat pengguna: judul (h1–h6), paragraf, link, gambar, daftar, tabel, form." }
  ]
});

const semantik = diagram({
  label: "Diagram Interaktif", title: "Denah Halaman Semantik", desc: "Klik setiap area untuk melihat tag yang tepat.", minw: 520,
  svg: svg(760, 380,
    box(10, 10, 740, 60, "<header> logo + judul", "indigo", "hdr", { r: 6 }) +
    box(10, 78, 740, 42, "<nav> Beranda • Data Mahasiswa • Tentang", "sky", "nav", { r: 6, size: 13 }) +
    box(10, 128, 530, 182, "", "emerald", "main", { r: 6 }) + text(30, 146, "<main>", { size: 13, anchor: "start", color: C.emerald[2] }) +
    box(30, 160, 490, 60, "<section> Daftar mahasiswa (tabel)", "white", "sec", { r: 6, size: 13 }) +
    box(30, 230, 490, 65, "<article> Berita: Jadwal UTS", "white", "art", { r: 6, size: 13 }) +
    box(550, 128, 200, 182, "<aside>|pengumuman,|iklan, sidebar", "amber", "asd", { r: 6, size: 13 }) +
    box(10, 318, 740, 52, "<footer> © 2025 • kontak", "slate", "ftr", { r: 6 })
  ),
  parts: [
    { id: "hdr", label: "header", title: "&lt;header&gt;", text: "Bagian pembuka halaman atau section: logo, judul, kadang navigasi. Boleh lebih dari satu (misalnya header di dalam article)." },
    { id: "nav", label: "nav", title: "&lt;nav&gt;", text: "Kumpulan link navigasi utama. Jangan dipakai untuk sembarang link." },
    { id: "main", label: "main", title: "&lt;main&gt;", text: "Konten utama yang unik untuk halaman ini. <strong>Hanya satu</strong> per halaman, dan tidak diletakkan di dalam header/footer/aside." },
    { id: "sec", label: "section", title: "&lt;section&gt;", text: "Kelompok konten bertema, biasanya punya judul (h2). Contoh: bagian daftar mahasiswa, bagian form tambah data." },
    { id: "art", label: "article", title: "&lt;article&gt;", text: "Konten mandiri yang tetap bermakna jika dipindah ke tempat lain: berita, posting blog, komentar." },
    { id: "asd", label: "aside", title: "&lt;aside&gt;", text: "Konten tambahan yang terkait tidak langsung: sidebar, pengumuman, iklan." },
    { id: "ftr", label: "footer", title: "&lt;footer&gt;", text: "Penutup: hak cipta, kontak, link kebijakan. Gunakan entity <code>&amp;copy;</code> untuk ©." }
  ]
});

const formFlow = diagram({
  label: "Diagram Interaktif", title: "Ke Mana Data Form Pergi?", desc: "Pilih GET atau POST untuk melihat bedanya.", minw: 620,
  svg: svg(800, 260,
    box(10, 80, 200, 100, "<form action=\"simpan.php\"|method=\"…\">|<input name=\"nim\">", "white", "frm", { size: 12 }) +
    arrow(212, 110, 330, 50) + arrow(212, 150, 330, 200) +
    box(332, 15, 250, 70, "GET: data di URL|simpan.php?nim=123", "sky", "get", { size: 13 }) +
    box(332, 165, 250, 70, "POST: data di body request|(tidak tampil di URL)", "rose", "post", { size: 13 }) +
    arrow(584, 50, 640, 105) + arrow(584, 200, 640, 155) +
    box(642, 90, 150, 80, "PHP membaca|$_GET / $_POST", "violet", "php", { size: 13 })
  ),
  parts: [
    { id: "frm", label: "form", title: "Atribut form", text: "<code>action</code> = ke mana data dikirim, <code>method</code> = caranya. Setiap input <strong>wajib punya atribut name</strong>; input tanpa name tidak ikut terkirim. Input <code>disabled</code> juga tidak terkirim, sedangkan <code>readonly</code> tetap terkirim." },
    { id: "get", label: "GET", title: "method=\"get\"", text: "Data ditempel di URL sebagai query string. Cocok untuk pencarian/filter karena URL bisa di-bookmark dan dibagikan. Tidak untuk password. ➕ Panjang URL terbatas." },
    { id: "post", label: "POST", title: "method=\"post\"", text: "Data dikirim di badan (body) request. Dipakai untuk login, simpan, ubah, dan hapus data (CRUD). ➕ Tidak tampil di URL, tetapi tetap bukan enkripsi: keamanan sebenarnya dari HTTPS." },
    { id: "php", label: "PHP", title: "Di sisi server", text: "<code>$_GET['nim']</code> atau <code>$_POST['nim']</code>; kuncinya adalah nilai atribut name. Ini akan dipelajari setelah UTS." }
  ]
});

const anatomiCss = diagram({
  label: "Diagram Interaktif", title: "Anatomi Aturan CSS", desc: "Klik setiap bagian.", minw: 560,
  svg: svg(760, 200,
    box(10, 60, 140, 70, ".kartu h2", "violet", "sel", { size: 16, r: 6 }) + box(158, 60, 40, 70, "{", "slate", "brc", { size: 22, r: 6 }) +
    box(206, 60, 120, 70, "color", "sky", "prop", { size: 16, r: 6 }) + box(332, 60, 26, 70, ":", "slate", "brc", { size: 18, r: 6 }) +
    box(364, 60, 120, 70, "#1e40af", "emerald", "val", { size: 16, r: 6 }) + box(490, 60, 26, 70, ";", "slate", "brc", { size: 18, r: 6 }) +
    box(524, 60, 180, 70, "font-size: 1.5rem;", "white", "dek", { size: 14, r: 6 }) + box(712, 60, 40, 70, "}", "slate", "brc", { size: 22, r: 6 }) +
    lbl(80, 150, "selector") + lbl(266, 150, "property") + lbl(424, 150, "value") + lbl(614, 150, "deklarasi kedua") +
    path("M206,180 L752,180", { noArrow: true, color: "#94a3b8" }) + lbl(480, 192, "blok deklarasi")
  ),
  parts: [
    { id: "sel", label: "Selector", title: "Selector", text: "Siapa yang diberi gaya. <code>.kartu h2</code> = semua h2 yang berada di dalam elemen ber-class kartu (descendant selector ➕)." },
    { id: "prop", label: "Property", title: "Property", text: "Apa yang diubah. Dua kata disambung tanda hubung: <code>background-color</code>, <code>font-size</code>." },
    { id: "val", label: "Value", title: "Value", text: "Nilainya. Warna bisa nama (blue), hex (#1e40af), atau rgb(30, 64, 175)." },
    { id: "brc", label: "Tanda baca", title: "Tanda baca", text: "<code>{ }</code> membungkus deklarasi, <code>:</code> memisahkan property dan value, <code>;</code> mengakhiri setiap deklarasi. Lupa titik koma adalah penyebab error CSS paling umum." },
    { id: "dek", label: "Deklarasi", title: "Deklarasi", text: "Satu pasangan property: value; Satu aturan boleh berisi banyak deklarasi." }
  ]
});

const specificity = diagram({
  label: "Diagram Interaktif", title: "Siapa yang Menang? Tangga Prioritas CSS", desc: "Makin atas makin kuat. Klik setiap anak tangga.", minw: 520,
  svg: svg(760, 300,
    box(310, 10, 440, 50, "!important (hindari)", "rose", "imp", { size: 14 }) +
    box(230, 70, 520, 50, "Inline: style=\"…\" di tag", "amber", "inl", { size: 14 }) +
    box(150, 130, 600, 50, "#id", "violet", "id", { size: 15 }) +
    box(70, 190, 680, 50, ".class, [atribut], :hover", "sky", "cls", { size: 14 }) +
    box(10, 250, 740, 42, "tag (p, h1, div)", "emerald", "tag", { size: 14 }) +
    text(120, 30, "⬆ makin kuat", { size: 14, color: "#475569" })
  ),
  parts: [
    { id: "imp", label: "!important", title: "!important", text: "Mengalahkan semuanya. Pakai hanya darurat; terlalu banyak !important membuat CSS sulit dirawat." },
    { id: "inl", label: "Inline", title: "Inline style", text: "Atribut style langsung di tag. Paling kuat setelah !important." },
    { id: "id", label: "#id", title: "Selector id", text: "Satu id mengalahkan berapa pun banyaknya class." },
    { id: "cls", label: ".class", title: "Class, atribut, pseudo-class", text: "Paling sering dipakai. Dua class (<code>.a.b</code>) lebih kuat dari satu class." },
    { id: "tag", label: "tag", title: "Selector tag", text: "Paling lemah. ➕ Jika kekuatannya <strong>sama</strong>, aturan yang ditulis <strong>terakhir</strong> menang (itulah arti “cascading”)." }
  ]
});

const boxModel = diagram({
  label: "Diagram Interaktif", title: "Box Model: .box { width:200px; padding:10px; border:2px; margin:15px }", desc: "Klik setiap lapisan. Angka di bawah memakai content-box (default).", minw: 520,
  svg: svg(760, 330,
    box(20, 10, 720, 270, "", "amber", "mg", { dash: "6 4", r: 4 }) + text(380, 28, "MARGIN 15px (transparan, di luar)", { size: 13, color: C.amber[2] }) +
    box(80, 45, 600, 200, "", "slate", "bd", { sw: 6, r: 4 }) + text(380, 64, "BORDER 2px", { size: 13, color: C.slate[2] }) +
    box(115, 80, 530, 150, "", "emerald", "pd", { r: 4 }) + text(380, 98, "PADDING 10px", { size: 13, color: C.emerald[2] }) +
    box(190, 115, 380, 95, "CONTENT|width 200 × height 100", "sky", "ct", { r: 4, size: 15 }) +
    text(380, 305, "Lebar tampak = 200 + 2×10 + 2×2 = 224px  •  ruang total = 224 + 2×15 = 254px", { size: 13, color: "#0f172a" })
  ),
  parts: [
    { id: "ct", label: "Content", title: "Content", text: "Area isi (teks/gambar). Ukurannya diatur <code>width</code> dan <code>height</code>." },
    { id: "pd", label: "Padding", title: "Padding", text: "Jarak <strong>di dalam</strong> antara konten dan border. Ikut berwarna background elemen." },
    { id: "bd", label: "Border", title: "Border", text: "Garis tepi: <code>border: 2px solid #333;</code> (tebal, gaya, warna)." },
    { id: "mg", label: "Margin", title: "Margin", text: "Jarak <strong>di luar</strong> border, transparan. <code>margin: 0 auto;</code> menengahkan blok yang punya width. ➕ Margin vertikal dua blok yang bertemu bisa “melebur” (margin collapsing): yang dipakai nilai terbesar, bukan dijumlah." }
  ]
});

const flexAxes = diagram({
  label: "Diagram Interaktif", title: "Dua Sumbu Flexbox (flex-direction: row)", desc: "justify-content mengatur sumbu utama, align-items mengatur sumbu silang. Klik setiap bagian.", minw: 520,
  svg: svg(760, 290,
    box(60, 40, 640, 190, "", "slate", "ctr", { r: 8 }) + text(80, 58, "display: flex (container)", { size: 12, anchor: "start", color: "#475569" }) +
    box(100, 85, 140, 110, "item 1", "sky", "itm", { size: 15 }) + box(310, 85, 140, 110, "item 2", "sky", "itm", { size: 15 }) + box(520, 85, 140, 110, "item 3", "sky", "itm", { size: 15 }) +
    arrow(60, 260, 700, 260, { color: C.indigo[1], w: 3 }) + text(380, 278, "sumbu utama → justify-content", { size: 13, color: C.indigo[2] }) +
    arrow(30, 40, 30, 230, { color: C.rose[1], w: 3 }) +
    `<g data-part="jc"><rect x="60" y="248" width="640" height="40" fill="transparent"/></g><g data-part="ai"><rect x="10" y="40" width="40" height="190" fill="transparent"/></g>` +
    text(30, 20, "sumbu silang ↓ align-items", { size: 13, color: C.rose[2], anchor: "start" })
  ),
  parts: [
    { id: "ctr", label: "Container", title: "Flex container", text: "Elemen induk yang diberi <code>display: flex;</code>. Semua anak langsungnya otomatis menjadi flex item. ➕ Tambahkan <code>gap: 1rem;</code> untuk jarak antar-item dan <code>flex-wrap: wrap;</code> agar item turun baris di layar sempit." },
    { id: "itm", label: "Item", title: "Flex item", text: "<code>flex: 1;</code> pada setiap item = berbagi ruang sama rata. <code>order: -1;</code> memindah item ke depan tanpa mengubah HTML." },
    { id: "jc", label: "justify-content", title: "Sumbu utama", text: "flex-start | center | flex-end | space-between (ujung rapat, sisa dibagi di antara) | space-around. Pada <code>flex-direction: column</code>, sumbu utama berubah menjadi vertikal." },
    { id: "ai", label: "align-items", title: "Sumbu silang", text: "stretch (default, item setinggi container) | flex-start | center | flex-end. Trik menengahkan apa pun: <code>display:flex; justify-content:center; align-items:center;</code>" }
  ]
});

const gridDg = diagram({
  label: "Diagram Interaktif", title: "Grid: grid-template-columns: 1fr 2fr 1fr", desc: "Grid mengatur baris DAN kolom sekaligus. Klik bagian grid.", minw: 520,
  svg: svg(760, 270,
    box(20, 20, 720, 60, "header (grid-column: 1 / 4)", "indigo", "span", { r: 6, size: 13 }) +
    box(20, 92, 175, 110, "sidebar|1fr", "amber", "fr", { r: 6, size: 13 }) + box(207, 92, 346, 110, "konten|2fr", "emerald", "fr", { r: 6, size: 13 }) + box(565, 92, 175, 110, "iklan|1fr", "amber", "fr", { r: 6, size: 13 }) +
    box(20, 214, 720, 45, "footer (grid-column: 1 / -1)", "slate", "span", { r: 6, size: 13 }) +
    `<g data-part="gap"><rect x="195" y="92" width="12" height="110" fill="#fda4af"/><rect x="553" y="92" width="12" height="110" fill="#fda4af"/></g>`
  ),
  parts: [
    { id: "fr", label: "fr", title: "Satuan fr (fraction)", text: "Bagian dari sisa ruang. 1fr 2fr 1fr = total 4 bagian: kolom tengah mendapat 2/4 = setengah lebar. ➕ <code>repeat(3, 1fr)</code> = tiga kolom sama besar." },
    { id: "span", label: "Membentang", title: "grid-column", text: "<code>grid-column: 1 / 4;</code> = dari garis 1 sampai garis 4 (membentang 3 kolom). <code>1 / -1</code> = sampai garis terakhir." },
    { id: "gap", label: "gap", title: "gap", text: "Jarak antar sel (merah muda). <code>gap: 12px;</code> = jarak baris dan kolom sama, <code>gap: 10px 20px;</code> = jarak baris 10px, kolom 20px. ➕ <code>grid-gap</code> adalah nama lama properti ini dan masih berfungsi, tetapi nama standar sekarang <code>gap</code> (juga berlaku di Flexbox)." }
  ]
});

const breakpoints = diagram({
  label: "Diagram Interaktif", title: "Peta Breakpoint (Modul)", desc: "Klik setiap rentang untuk melihat media query-nya.", minw: 560,
  svg: svg(760, 180,
    box(10, 40, 250, 70, "📱 Mobile|0 – 600px", "emerald", "mb", { size: 14, r: 4 }) +
    box(265, 40, 260, 70, "📟 Tablet|601 – 1024px", "sky", "tb", { size: 14, r: 4 }) +
    box(530, 40, 220, 70, "🖥️ Desktop|≥ 1025px", "violet", "dk", { size: 14, r: 4 }) +
    lbl(262, 135, "600") + lbl(527, 135, "1024") + arrow(10, 155, 750, 155) + lbl(380, 172, "lebar viewport")
  ),
  parts: [
    { id: "mb", label: "Mobile", title: "Mobile", text: "<code>@media (max-width: 600px) { … }</code> → aktif jika lebar ≤ 600px." },
    { id: "tb", label: "Tablet", title: "Tablet", text: "<code>@media (min-width: 601px) and (max-width: 1024px) { … }</code>" },
    { id: "dk", label: "Desktop", title: "Desktop", text: "<code>@media (min-width: 1025px) { … }</code>. ➕ Pendekatan mobile-first: tulis gaya HP sebagai dasar, lalu tambahkan min-width untuk layar lebih besar." }
  ]
});

const remEm = diagram({
  label: "Diagram Interaktif", title: "rem vs em: Patokannya Beda", desc: "html font-size 16px, .kartu font-size 20px. Klik setiap kotak.", minw: 520,
  svg: svg(760, 250,
    box(10, 10, 740, 230, "", "slate", "root", { r: 8 }) + text(30, 30, "html { font-size: 16px }  ← patokan rem", { size: 13, anchor: "start", color: "#334155" }) +
    box(40, 50, 680, 170, "", "amber", "card", { r: 8 }) + text(60, 70, ".kartu { font-size: 20px }  ← patokan em untuk anaknya", { size: 13, anchor: "start", color: C.amber[2] }) +
    box(70, 100, 290, 100, "p { font-size: 1.5rem }|= 1.5 × 16 = 24px", "sky", "rem", { size: 14 }) +
    box(400, 100, 290, 100, "p { font-size: 1.5em }|= 1.5 × 20 = 30px", "violet", "em", { size: 14 })
  ),
  parts: [
    { id: "root", label: "html", title: "Root", text: "Default browser 16px. Jika pengguna memperbesar font di pengaturan browser, semua ukuran rem ikut membesar → lebih aksesibel." },
    { id: "card", label: "Induk", title: "Elemen induk", text: "em mengacu pada font-size induknya, sehingga bisa “berlipat” jika bersarang." },
    { id: "rem", label: "rem", title: "rem = root em", text: "Selalu mengacu ke html. Konsisten di mana pun diletakkan. Cocok untuk ukuran font dan jarak umum." },
    { id: "em", label: "em", title: "em", text: "Mengacu ke induk (untuk padding/margin: ke font-size elemen itu sendiri). Cocok untuk padding tombol agar ikut besar kecilnya teks tombol." }
  ]
});

const tigaLapis = diagram({
  label: "Diagram Interaktif", title: "Tiga Lapisan Halaman Web", desc: "Analogi rumah: kerangka, cat, dan listrik. Klik setiap lapisan.", minw: 520,
  svg: svg(760, 200,
    box(10, 30, 230, 140, "HTML|struktur|🧱 kerangka", "amber", "h", { size: 15 }) + text(250, 100, "+", { size: 28 }) +
    box(265, 30, 230, 140, "CSS|tampilan|🎨 cat & dekorasi", "sky", "c", { size: 15 }) + text(505, 100, "+", { size: 28 }) +
    box(520, 30, 230, 140, "JavaScript|perilaku|⚡ listrik & saklar", "violet", "j", { size: 15 })
  ),
  parts: [
    { id: "h", label: "HTML", title: "HTML: apa isinya", text: "Judul, paragraf, form, tombol. Tanpa CSS dan JS halaman tetap bisa dibaca." },
    { id: "c", label: "CSS", title: "CSS: bagaimana tampilnya", text: "Warna, font, layout, responsif." },
    { id: "j", label: "JS", title: "JavaScript: bagaimana bereaksi", text: "Menangani klik, memvalidasi input, mengubah isi halaman tanpa reload. Berjalan di <strong>browser</strong> (client-side), berbeda dengan PHP yang berjalan di server." }
  ]
});

const eventFlow = diagram({
  label: "Diagram Interaktif", title: "Alur Sebuah Event", desc: "Dari klik pengguna sampai halaman berubah. Klik setiap tahap.", minw: 620,
  svg: svg(800, 160,
    [["👆 User|klik tombol", "slate", "u"], ["Event|\"click\"", "amber", "ev"], ["Listener|addEventListener", "sky", "ls"], ["Fungsi|dijalankan", "violet", "fn"], ["DOM|berubah", "emerald", "dom"]]
      .map(([t, tone, id], i) => box(10 + i * 158, 40, 140, 80, t, tone, id, { size: 13 }) + (i < 4 ? arrow(152 + i * 158, 80, 166 + i * 158, 80) : "")).join("")
  ),
  parts: [
    { id: "u", label: "User", title: "Aksi pengguna", text: "Klik, mengetik, mengirim form, menggerakkan mouse." },
    { id: "ev", label: "Event", title: "Event", text: "Nama kejadiannya: <code>click</code>, <code>input</code>, <code>submit</code>, <code>change</code>, <code>keyup</code>, <code>mouseover</code>." },
    { id: "ls", label: "Listener", title: "Event listener", text: "<code>tombol.addEventListener(\"click\", fungsi);</code> Lebih disarankan daripada atribut <code>onclick</code> di HTML karena memisahkan JS dari HTML." },
    { id: "fn", label: "Fungsi", title: "Fungsi penanganan", text: "Berisi langkah yang dijalankan: baca <code>input.value</code>, cek kondisi, tampilkan hasil. ➕ Pada form, panggil <code>event.preventDefault()</code> agar halaman tidak reload." },
    { id: "dom", label: "DOM", title: "Halaman berubah", text: "Teks, warna, atau elemen baru muncul. Detailnya di P7 (manipulasi DOM)." }
  ]
});

const domTree = diagram({
  label: "Diagram Interaktif", title: "Pohon DOM dan Cara Memilihnya", desc: "Klik setiap node untuk melihat kode pemilihnya.", minw: 560,
  svg: svg(760, 330,
    box(300, 10, 160, 45, "document", "slate", "doc", { size: 14 }) + arrow(380, 55, 380, 72) +
    box(310, 75, 140, 45, "html", "indigo", "doc", { size: 14 }) + path("M350,120 L200,150") + path("M410,120 L560,150") +
    box(130, 152, 140, 45, "head", "amber", "head", { size: 14 }) + box(490, 152, 140, 45, "body", "emerald", "body", { size: 14 }) +
    path("M520,197 L380,240") + path("M560,197 L560,240") + path("M600,197 L700,240") +
    box(300, 242, 160, 70, "h1#judul", "sky", "h1", { size: 14 }) + box(480, 242, 160, 70, "ul > li.item ×3", "violet", "li", { size: 13 }) + box(655, 242, 95, 70, "button|.btn", "rose", "btn", { size: 13 })
  ),
  parts: [
    { id: "doc", label: "document", title: "document", text: "Pintu masuk ke seluruh halaman. Semua seleksi dimulai dari <code>document.</code>" },
    { id: "head", label: "head", title: "head", text: "Bisa diakses dengan <code>document.head</code>, misalnya untuk mengganti judul tab: <code>document.title = \"Baru\"</code>." },
    { id: "body", label: "body", title: "body", text: "<code>document.body</code>. Contoh: <code>document.body.classList.toggle(\"dark\")</code> untuk mode gelap." },
    { id: "h1", label: "#judul", title: "Elemen ber-id", text: "<code>document.getElementById(\"judul\")</code> atau <code>document.querySelector(\"#judul\")</code>." },
    { id: "li", label: ".item", title: "Banyak elemen", text: "<code>document.querySelectorAll(\".item\")</code> → NodeList, lalu <code>.forEach(li =&gt; …)</code>." },
    { id: "btn", label: ".btn", title: "Elemen pertama yang cocok", text: "<code>document.querySelector(\".btn\")</code> → hanya tombol pertama ber-class btn." }
  ]
});

const crudDom = diagram({
  label: "Diagram Interaktif", title: "CRUD di Sisi Browser dengan DOM", desc: "Empat operasi data dan method DOM yang dipakai. Klik setiap kotak.", minw: 560,
  svg: svg(760, 170,
    [["CREATE|createElement +|appendChild", "emerald", "cr"], ["READ|querySelector +|textContent", "sky", "rd"], ["UPDATE|textContent =|setAttribute", "amber", "up"], ["DELETE|remove() /|removeChild", "rose", "dl"]]
      .map(([t, tone, id], i) => box(10 + i * 188, 30, 175, 110, t, tone, id, { size: 13 })).join("")
  ),
  parts: [
    { id: "cr", label: "Create", title: "Membuat elemen baru", text: "1) <code>const li = document.createElement(\"li\");</code> 2) <code>li.textContent = nama;</code> 3) <code>daftar.appendChild(li);</code> Elemen belum tampil sebelum ditempel." },
    { id: "rd", label: "Read", title: "Membaca", text: "<code>input.value</code> untuk isi input, <code>el.textContent</code> untuk teks elemen, <code>el.getAttribute(\"href\")</code> untuk atribut." },
    { id: "up", label: "Update", title: "Mengubah", text: "<code>el.textContent = \"baru\"</code>, <code>el.style.color = \"red\"</code>, <code>el.classList.add(\"aktif\")</code>." },
    { id: "dl", label: "Delete", title: "Menghapus", text: "<code>el.remove();</code> (modern) atau <code>induk.removeChild(el);</code>. ➕ Pada aplikasi nyata, data juga harus dihapus di database lewat PHP; DOM hanya tampilan." }
  ]
});

const petaUts = diagram({
  label: "Diagram Interaktif", title: "Peta Materi UTS PWD (P1–P7)", desc: "Tiga lapisan web dari struktur ke perilaku. Klik setiap pertemuan.", minw: 620,
  svg: svg(800, 230,
    box(10, 20, 250, 190, "", "amber", "html", { r: 10 }) + text(135, 42, "HTML (struktur)", { size: 14, color: C.amber[2] }) +
    box(30, 60, 210, 60, "P1 Web & HTML dasar", "white", "p1", { size: 13 }) + box(30, 132, 210, 60, "P2 Semantik & Form", "white", "p2", { size: 13 }) +
    box(275, 20, 250, 190, "", "sky", "css", { r: 10 }) + text(400, 42, "CSS (tampilan)", { size: 14, color: C.sky[2] }) +
    box(290, 56, 220, 44, "P3 Selector & cara pasang", "white", "p3", { size: 12 }) + box(290, 106, 220, 44, "P4 Box, Flex, Grid", "white", "p4", { size: 12 }) + box(290, 156, 220, 44, "P5 Responsif", "white", "p5", { size: 12 }) +
    box(540, 20, 250, 190, "", "violet", "js", { r: 10 }) + text(665, 42, "JavaScript (perilaku)", { size: 14, color: C.violet[2] }) +
    box(560, 60, 210, 60, "P6 JS dasar & event", "white", "p6", { size: 13 }) + box(560, 132, 210, 60, "P7 Manipulasi DOM", "white", "p7", { size: 13 })
  ),
  parts: [
    { id: "p1", label: "P1", title: "P1", text: "Internet ≠ web • HTTP & kode status • URL • statis vs dinamis • domain & hosting • kerangka HTML, heading, paragraf, link, list, gambar." },
    { id: "p2", label: "P2", title: "P2", text: "Elemen semantik (main hanya satu) • form: action, method GET/POST, name • jenis input & validasi (required, min, max, pattern) • label for = id • tabel." },
    { id: "p3", label: "P3", title: "P3", text: "Inline/internal/external • selector tag, .class, #id • property & value • prioritas: inline > id > class > tag." },
    { id: "p4", label: "P4", title: "P4", text: "Box model & hitung lebar • box-sizing • flex: justify-content vs align-items • grid-template-columns & fr." },
    { id: "p5", label: "P5", title: "P5", text: "Meta viewport • @media max/min-width • breakpoint 600/1024 • %, vw, vh, rem, em • gambar max-width: 100%." },
    { id: "p6", label: "P6", title: "P6", text: "let/const/var • 5 tipe data • === vs == • + dengan string • alert/prompt/console.log • addEventListener • .value." },
    { id: "p7", label: "P7", title: "P7", text: "getElementById vs querySelector(All) • textContent vs innerHTML • style & classList • createElement + appendChild • remove." }
  ]
});

// ================= MATERI =================
const M = {
  p1: [
    A("Internet, Web, dan Situs Web", `<p><strong>Internet</strong> adalah jaringan komputer global yang saling terhubung dengan standar TCP/IP. Di atas internet berjalan banyak layanan: email, transfer file (FTP), chat, game online, dan <strong>World Wide Web</strong>. Jadi web hanyalah <em>salah satu</em> aplikasi internet.</p>
<p><strong>Web</strong> berisi dokumen multimedia yang saling terhubung lewat <strong>hyperlink</strong>, dikirim memakai protokol <strong>HTTP</strong>, dan dibuka dengan <strong>browser</strong>. Sekumpulan halaman web dengan satu nama domain disebut <strong>situs web</strong>.</p>
<p>➕ Sejarah singkat: WWW diciptakan Tim Berners-Lee di CERN pada 1989–1991 bersama tiga teknologi intinya: HTML (bahasa dokumen), URL (alamat), dan HTTP (protokol). Ketiganya persis tiga mekanisme WWW yang disebut modul.</p>`, "Bagian 1"),
    clientServer,
    A("HTTP: Percakapan Request–Response", `<p>Setiap kali halaman dibuka, browser mengirim <strong>request</strong> berisi method (GET/POST), path, dan header. Server membalas dengan <strong>response</strong> berisi <strong>kode status</strong>, header, dan isi (body). HTTP bersifat <em>stateless</em> ➕: server tidak otomatis “ingat” request sebelumnya, sehingga web dinamis memakai cookie/session untuk fitur seperti login.</p>`, "Bagian 2"),
    { type: "table", label: "Tabel Interaktif", title: "Lima Kelompok Kode Status HTTP", headers: ["Kode", "Kelompok", "Contoh"],
      rows: [["1xx", "Informasi", "100 Continue"], ["2xx", "Sukses", "200 OK, 201 Created"], ["3xx", "Pengalihan", "301 Moved Permanently, 302 Found"], ["4xx", "Kesalahan client", "400 Bad Request, 403 Forbidden, 404 Not Found"], ["5xx", "Kesalahan server", "500 Internal Server Error, 503 Service Unavailable"]],
      modes: [{ label: "Yang paling sering kamu temui", target: "row", row: 3, title: "404", text: "Nama file atau path salah (huruf besar-kecil juga berpengaruh di server Linux)." },
        { label: "Saat belajar PHP", target: "row", row: 4, title: "500", text: "Biasanya ada error pada kode PHP. Cek log error di XAMPP." }] },
    urlAnatomy,
    A("Web Statis vs Web Dinamis", `<p><strong>Web statis</strong> berisi file HTML yang sama untuk setiap pengunjung. Untuk mengubah isi, pengembang harus mengedit file. Contoh: halaman profil sederhana, portofolio.</p>
<p><strong>Web dinamis</strong> isinya dibentuk saat diminta, biasanya oleh bahasa server-side (PHP, Python, Node.js) yang mengambil data dari <strong>database</strong>. Isi bisa berbeda untuk tiap pengguna dan dapat dikelola lewat halaman admin. Contoh: SIAKAD, marketplace, media sosial. Mata kuliah ini menuju ke sana: membangun aplikasi <strong>CRUD</strong> (Create, Read, Update, Delete).</p>`, "Bagian 3"),
    { type: "table", label: "Tabel Interaktif", title: "Statis vs Dinamis", headers: ["Aspek", "Statis", "Dinamis"],
      rows: [["Isi halaman", "Sama untuk semua", "Bisa berbeda per pengguna/waktu"], ["Teknologi", "HTML, CSS, JS", "HTML, CSS, JS + PHP + database"], ["Mengubah isi", "Edit file kode", "Lewat form/admin, tersimpan di database"], ["Hosting", "Murah, bisa gratis (mis. GitHub Pages ➕)", "Butuh server yang menjalankan PHP & MySQL"], ["Contoh", "Portofolio, landing page", "SIAKAD, e-commerce, blog CMS"]],
      modes: [{ label: "Jebakan", target: "row", row: 1, title: "Ada JavaScript ≠ dinamis", text: "Halaman dengan animasi JS tetap disebut statis jika isinya tidak dibentuk server dari database." }] },
    A("Domain dan Hosting", `<p><strong>Domain</strong> adalah nama alamat situs (sibermu.ac.id); <strong>hosting</strong> adalah tempat menyimpan file situs di server yang menyala 24 jam. Analogi: domain = alamat rumah, hosting = tanahnya. ➕ Untuk latihan di laptop, kita memakai server lokal seperti <strong>XAMPP</strong> (Apache + MySQL + PHP) dan membuka <em>http://localhost</em>.</p>`, "Bagian 4"),
    A("Dasar HTML", `<p>HTML (HyperText Markup Language) adalah bahasa markah, <strong>bukan bahasa pemrograman</strong>: ia menandai bagian dokumen dengan <strong>tag</strong>. Sebagian besar tag berpasangan (${c("<p>…</p>")}); beberapa tidak punya penutup (${c("<br>")}, ${c("<img>")}, ${c("<input>")}). Tag bisa diberi <strong>atribut</strong> berbentuk nama="nilai", misalnya ${c('<a href="https://sibermu.ac.id">')}.</p>`, "Bagian 5"),
    htmlTree,
    code("index.html", `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profil Mahasiswa</title>
</head>
<body>
  <h1>Gilang</h1>
  <p>Mahasiswa <strong>Sistem Informasi</strong>.</p>
  <img src="foto.jpg" alt="Foto Gilang" width="150">
  <h2>Hobi</h2>
  <ul>
    <li>Membaca</li>
    <li>Ngoding</li>
  </ul>
  <a href="https://sibermu.ac.id" target="_blank">Kampus</a>
</body>
</html>`, "Atribut <strong>alt</strong> wajib pada gambar: tampil jika gambar gagal dimuat dan dibacakan screen reader. <strong>target=\"_blank\"</strong> membuka link di tab baru.", "Template Halaman Lengkap"),
    ex("Latihan Interaktif", "Tag Apa yang Tepat?", ["Kebutuhan", "Tag"], ["h1", "p", "a", "img", "ol", "ul"], [
      ["Judul utama halaman", "h1"],
      ["Langkah-langkah instalasi berurutan", "ol"],
      ["Daftar hobi tanpa urutan", "ul"],
      ["Tautan ke situs kampus", "a"],
      ["Menampilkan logo", "img"],
      ["Paragraf deskripsi", "p"]
    ])
  ],

  p2: [
    A("HTML5 dan Elemen Semantik", `<p>HTML5 memperkenalkan elemen yang <strong>bermakna</strong>. Dulu semua bagian halaman ditulis ${c("<div id=\"header\">")}, ${c("<div id=\"menu\">")}. Sekarang ada ${c("<header>")}, ${c("<nav>")}, ${c("<main>")}, dan seterusnya. Tampilannya tidak berubah, tetapi browser, screen reader, dan mesin pencari jadi <strong>paham fungsi</strong> tiap bagian.</p>
<p>Manfaatnya: aksesibilitas (pengguna tunanetra bisa langsung lompat ke menu atau konten utama), SEO, dan kode lebih mudah dibaca tim.</p>`, "Bagian 1"),
    semantik,
    rv("Cek Pemahaman", "section atau article?", [
      { prompt: "Satu kartu berita di halaman beranda kampus", answer: "`<article>`", reason: "Bisa berdiri sendiri; tetap bermakna jika dibagikan." },
      { prompt: "Bagian “Form Tambah Mahasiswa” di halaman admin", answer: "`<section>`", reason: "Bagian dari halaman, bukan konten mandiri." },
      { prompt: "Daftar link Beranda, Data, Tentang", answer: "`<nav>`", reason: "Navigasi utama." },
      { prompt: "Kotak pengumuman di samping konten", answer: "`<aside>`", reason: "Konten pendukung." }
    ]),
    A("Form: Pintu Masuk Data", `<p>Form adalah komponen terpenting web dinamis: semua data yang disimpan ke database berawal dari form. Elemen dasarnya: ${c("<form>")} (wadah, atribut action dan method), ${c("<label>")}, ${c("<input>")}, ${c("<select>")}+${c("<option>")}, ${c("<textarea>")}, dan ${c("<button>")}.</p>
<p>Tiga kebiasaan baik: setiap input punya ${c("<label for=\"…\">")} yang sama dengan id input; setiap input punya <strong>name</strong>; dan gunakan validasi bawaan HTML5 (${c("required")}, ${c("min")}, ${c("max")}, ${c("pattern")}). ➕ Ingat, validasi HTML5 bisa dilewati pengguna nakal, jadi nanti PHP tetap harus memvalidasi ulang di server.</p>`, "Bagian 2"),
    formFlow,
    code("form.html", `<form action="simpan.php" method="post">
  <fieldset>
    <legend>Data Mahasiswa</legend>

    <label for="nim">NIM</label>
    <input type="text" id="nim" name="nim" pattern="[0-9]{8,12}" required>

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>

    <label for="smt">Semester</label>
    <input type="number" id="smt" name="semester" min="1" max="14">

    <label for="prodi">Prodi</label>
    <select id="prodi" name="prodi">
      <option value="SI">Sistem Informasi</option>
      <option value="TI">Teknologi Informasi</option>
    </select>

    <p>Jenis kelamin:
      <label><input type="radio" name="jk" value="L"> L</label>
      <label><input type="radio" name="jk" value="P"> P</label>
    </p>

    <label for="cat">Catatan</label>
    <textarea id="cat" name="catatan" rows="3"></textarea>

    <button type="submit">Simpan</button>
  </fieldset>
</form>`, "Radio dalam satu kelompok memakai <strong>name yang sama</strong> agar hanya satu yang bisa dipilih. <strong>pattern</strong> berisi regex: [0-9]{8,12} = 8 sampai 12 digit angka.", "Form CRUD yang Rapi"),
    { type: "table", label: "Tabel Interaktif", title: "Jenis Input HTML5", headers: ["type", "Untuk", "Bonus dari browser"],
      rows: [["text", "Teks umum", "-"], ["email", "Alamat email", "Cek format @; keyboard @ di HP"], ["password", "Kata sandi", "Karakter disamarkan"], ["number", "Angka", "Tombol naik-turun; min, max, step"], ["date", "Tanggal", "Kalender pemilih"], ["tel", "Nomor telepon", "Keyboard angka di HP"], ["radio", "Pilih satu dari beberapa", "name sama = satu kelompok"], ["checkbox", "Pilih banyak", "Bisa dicentang lebih dari satu"], ["file", "Unggah berkas", "accept=\".pdf,.jpg\" ➕"], ["range", "Nilai dalam rentang", "Slider"], ["color", "Warna", "Pemilih warna"]],
      modes: [{ label: "Jebakan nomor HP", target: "row", row: 5, title: "Mengapa tel, bukan number?", text: "Nomor HP bisa diawali 0 dan memakai +62; number akan membuang nol di depan dan menampilkan tombol naik-turun yang tidak masuk akal." },
        { label: "Unggah file", target: "row", row: 8, title: "Syarat form upload", text: "➕ Form harus <code>method=\"post\"</code> dan <code>enctype=\"multipart/form-data\"</code>." }] },
    ex("Latihan Interaktif", "Pilih type Input yang Paling Tepat", ["Kebutuhan", "type"], ["text", "email", "password", "number", "date", "tel", "radio", "checkbox"], [
      ["Tanggal lahir", "date"],
      ["Pilih hobi (boleh lebih dari satu)", "checkbox"],
      ["Nomor WhatsApp", "tel"],
      ["Jumlah SKS (1–24)", "number"],
      ["Jenis kelamin", "radio"],
      ["Kata sandi akun", "password"],
      ["Alamat surel", "email"],
      ["Nama lengkap", "text"]
    ]),
    A("Tabel HTML", `<p>Tabel dipakai untuk <strong>data berbentuk baris-kolom</strong> (bukan untuk layout halaman). Strukturnya: ${c("<table>")} → ${c("<thead>")}/${c("<tbody>")} ➕ → ${c("<tr>")} (baris) → ${c("<th>")} (sel judul) atau ${c("<td>")} (sel data). Gabung sel dengan ${c("colspan")} (ke samping) dan ${c("rowspan")} (ke bawah). Dalam aplikasi CRUD, tabel inilah tempat menampilkan data dari database (Read).</p>`, "Bagian 3"),
    code("tabel.html", `<table border="1">
  <thead>
    <tr><th>NIM</th><th>Nama</th><th colspan="2">Aksi</th></tr>
  </thead>
  <tbody>
    <tr><td>2401</td><td>Gilang</td><td><a href="#">Edit</a></td><td><a href="#">Hapus</a></td></tr>
    <tr><td>2402</td><td>Sari</td><td><a href="#">Edit</a></td><td><a href="#">Hapus</a></td></tr>
  </tbody>
</table>`, "<strong>colspan=\"2\"</strong> membuat judul “Aksi” membentang di atas dua kolom Edit dan Hapus.", "Tabel Data CRUD")
  ],

  p3: [
    A("Mengapa CSS Dipisah dari HTML", `<p>Prinsipnya: <strong>HTML untuk isi, CSS untuk tampilan</strong>. Dulu warna ditulis langsung dengan tag ${c("<font>")} di setiap tempat; mengganti satu warna berarti mengedit puluhan halaman. Dengan CSS, gaya ditulis sekali lalu dipakai di mana saja.</p>
<p>Kata <strong>cascading</strong> berarti “mengalir bertingkat”: beberapa aturan bisa mengenai elemen yang sama, dan browser memilih berdasarkan prioritas, kekuatan selector, dan urutan penulisan.</p>`, "Bagian 1"),
    { type: "table", label: "Tabel Interaktif", title: "Tiga Cara Memasang CSS", headers: ["Cara", "Ditulis di", "Kelebihan", "Kekurangan"],
      rows: [["Inline", "Atribut style di tag", "Cepat untuk satu elemen", "Bercampur dengan HTML, sulit dirawat"], ["Internal", "`<style>` di dalam `<head>`", "Terpisah dari tag", "Hanya berlaku di satu halaman"], ["External", "File .css + `<link>` di `<head>`", "Satu file untuk banyak halaman; di-cache browser ➕", "Butuh file tambahan"]],
      modes: [{ label: "Paling disarankan", target: "row", row: 2, title: "External", text: "<code>&lt;link rel=\"stylesheet\" href=\"css/style.css\"&gt;</code>. Pastikan path di href sama persis dengan lokasi file." },
        { label: "Paling kuat", target: "row", row: 0, title: "Inline", text: "Mengalahkan aturan internal dan external (kecuali !important)." }] },
    code("tiga-cara.html", `<!-- 1. External: file terpisah, dihubungkan dengan <link> di <head> -->
<link rel="stylesheet" href="css/style.css">

<!-- 2. Internal (disebut juga embedded): tag <style> di dalam <head> -->
<style>
  p { color: blue; }
</style>

<!-- 3. Inline: atribut style langsung di tag -->
<p style="color: blue;">Teks</p>`, "Isi CSS-nya sama persis (<code>color: blue;</code>); yang berbeda hanya tempat menulisnya.", "Tiga Cara dalam Satu Contoh"),
    A("Membaca Tag &lt;link&gt;", `<p>Tag ${c('<link rel="stylesheet" href="css/style.css">')} punya dua atribut wajib:</p>
<ul class="list-disc pl-5 space-y-1">
<li>${c("href")} = <strong>alamat file</strong> CSS, relatif terhadap file HTML. Jika HTML ada di folder utama dan CSS di folder <em>css</em>, tulis ${c("css/style.css")}.</li>
<li>${c("rel")} = <em>relationship</em>, <strong>hubungan</strong> file itu dengan halaman. Nilai ${c("stylesheet")} memberi tahu browser bahwa file itu berisi gaya untuk halaman ini. Tanpa ${c('rel="stylesheet"')}, file tidak dipakai sama sekali.</li></ul>
<p>Tag ${c("<link>")} tidak punya tag penutup dan ditulis di dalam ${c("<head>")}.</p>`, "➕ Penjelasan"),
    tip("Kesalahan yang sering terjadi saat memasang CSS", `<ul class="list-disc pl-5 space-y-1">
<li>Memakai ${c("src")} di ${c("<link>")}. Yang benar ${c("href")}; ${c("src")} dipakai ${c("<img>")} dan ${c("<script>")}.</li>
<li>Menulis ${c('<style src="style.css">')} atau ${c("<css>")}. Tag ${c("<style>")} hanya untuk CSS internal, dan tag ${c("<css>")} tidak ada.</li>
<li>Menulis ${c("color = blue")} atau ${c("p: blue")}. Format yang benar selalu ${c("selektor { properti: nilai; }")}, dan di inline cukup ${c('style="properti: nilai;"')}.</li>
<li>Mencoba menulis media query di atribut ${c("style")}. Media query hanya bisa di CSS internal atau external.</li></ul>`, "warn"),
    anatomiCss,
    { type: "table", label: "Tabel Interaktif", title: "Simbol di Depan Selector Menentukan Apa yang Dipilih", headers: ["Ditulis", "Memilih", "Cocok dengan HTML"],
      rows: [
        ["`p`", "Semua elemen <strong>tag</strong> p (nama tag tanpa simbol)", "`<p>…</p>`"],
        ["`.menu`", "Semua elemen dengan <strong>class</strong> menu (titik)", "`<ul class=\"menu\">`, `<div class=\"menu\">`"],
        ["`#utama`", "Satu elemen dengan <strong>id</strong> utama (pagar)", "`<main id=\"utama\">`"],
        ["`[type]` / `[type=\"email\"]`", "Elemen yang punya <strong>atribut</strong> itu / atribut dengan nilai tertentu (kurung siku)", "`<input type=\"email\">`"],
        ["`*`", "<strong>Semua</strong> elemen (universal)", "Semua tag"],
        ["`h1, h2`", "Beberapa selector sekaligus (koma = \"dan juga\")", "`<h1>` dan `<h2>`"],
        ["`.kartu p`", "p yang berada <strong>di dalam</strong> .kartu (spasi = keturunan)", "`<div class=\"kartu\"><p>…</p></div>`"]
      ],
      modes: [{ label: "Jebakan", target: "none", title: "p, .p, #p, [p] itu berbeda", text: "<code>p</code> = tag p. <code>.p</code> = class bernama p. <code>#p</code> = id bernama p. <code>[p]</code> = elemen yang punya atribut bernama p. <code>*p</code> bukan selector yang sah." }] },
    A("Jenis-jenis Selector", `<p>Selector dasar dari modul: <strong>tag</strong> (${c("p")}), <strong>class</strong> (${c(".judul")}, boleh dipakai banyak elemen), dan <strong>id</strong> (${c("#para1")}, unik satu per halaman). Beberapa selector dipisah koma untuk gaya yang sama (${c("h1, h2")}).</p>
<p>➕ Selector tambahan yang sering dipakai: <strong>descendant</strong> ${c(".kartu p")} (p di dalam .kartu), <strong>child</strong> ${c("ul > li")} (anak langsung), <strong>atribut</strong> ${c('input[type="email"]')}, <strong>pseudo-class</strong> ${c("a:hover")}, ${c("li:first-child")}, ${c("input:focus")}, dan <strong>universal</strong> ${c("*")}.</p>`, "Bagian 2"),
    A("Cara Browser Memilih Pemenang (Cascading)", `<p>Jika dua aturan mengatur properti yang sama pada elemen yang sama, browser memeriksa urutan berikut dan berhenti di langkah pertama yang menentukan pemenang:</p>
<ol class="list-decimal pl-5 space-y-1">
<li>Ada ${c("!important")}? Aturan itu menang.</li>
<li>Ada CSS <strong>inline</strong> (atribut ${c("style")})? Inline menang atas internal dan external.</li>
<li>Bandingkan <strong>kespesifikan selector</strong>: id lebih kuat dari class, class lebih kuat dari tag. Selector yang lebih spesifik (lebih tepat menunjuk elemen) menang.</li>
<li>Masih sama kuat? Aturan yang <strong>ditulis atau dimuat paling akhir</strong> menang.</li></ol>
<p>Perhatikan langkah 4: internal dan external <strong>tidak punya urutan kekuatan tetap</strong>. Jika ${c("<link>")} ditulis sebelum ${c("<style>")}, aturan internal yang menang karena dibaca belakangan; jika urutannya dibalik, external yang menang. Karena itu jawaban yang benar untuk soal "prioritas tertinggi" adalah <strong>inline</strong>, bukan internal atau external.</p>`, "➕ Penjelasan"),
    specificity,
    ex("Latihan Interaktif", "Warna Apa yang Tampil?", ["Situasi (elemen &lt;p id=\"info\" class=\"teks\"&gt;)", "Warna"], ["merah", "biru", "hijau"], [
      ["p { color: merah } lalu .teks { color: biru }", "biru", "✓ class mengalahkan tag."],
      ["#info { color: hijau } lalu .teks { color: biru }", "hijau", "✓ id mengalahkan class, walau class ditulis belakangan."],
      [".teks { color: merah } lalu .teks { color: biru }", "biru", "✓ Kekuatan sama → yang terakhir menang."],
      ["style=\"color: merah\" di tag, dan #info { color: biru }", "merah", "✓ Inline paling kuat."],
      ["p.teks { color: hijau } lalu .teks { color: biru }", "hijau", "✓ tag+class lebih kuat dari class saja."]
    ]),
    { type: "table", label: "Tabel Interaktif", title: "Properti Teks dan Warna yang Sering Ditanyakan", headers: ["Properti", "Mengatur", "Contoh nilai", "Sering tertukar dengan"],
      rows: [
        ["`color`", "Warna <strong>teks</strong>", "`blue`, `#1e40af`, `rgb(30, 64, 175)`", "`text-color` dan `font-color` (tidak ada di CSS)"],
        ["`background-color`", "Warna <strong>latar</strong> elemen", "`#f1f5f9`", "`bgcolor` (atribut HTML lama, bukan CSS)"],
        ["`font-size`", "Ukuran huruf", "`1rem`, `18px`", "`font-height` (tidak ada)"],
        ["`font-weight`", "Tebal tipis huruf", "`normal`, `bold`, `700`", "`font-bold` (itu nama class Tailwind, bukan CSS)"],
        ["`line-height`", "Jarak antar<strong>baris</strong> teks", "`1.5` (1,5 × ukuran huruf)", "`line-spacing`, `text-spacing` (tidak ada)"],
        ["`letter-spacing`", "Jarak antar<strong>huruf</strong>", "`1px`", "`line-height`"],
        ["`text-align`", "Perataan <strong>mendatar</strong> teks di dalam kotaknya", "`left`, `right`, `center`, `justify`", "`top`, `middle`, `bottom` (itu nilai `vertical-align`)"],
        ["`text-decoration`", "Garis bawah/coret", "`none`, `underline`", "Dipakai untuk menghapus garis bawah link"]
      ],
      modes: [{ label: "Jebakan soal", target: "row", row: 6, title: "text-align hanya mendatar", text: "Nilai <code>text-align</code> yang sah: left, right, center, justify. Untuk menengahkan secara tegak, pakai Flexbox (<code>align-items: center</code>)." }] },
    A("Properti yang Paling Sering Dipakai", `<p>Teks: ${c("color")}, ${c("font-family")}, ${c("font-size")}, ${c("font-weight")}, ${c("text-align")}, ${c("line-height")}, ${c("text-decoration")}. Latar: ${c("background-color")}, ${c("background-image")}. Kotak: ${c("width")}, ${c("height")}, ${c("padding")}, ${c("margin")}, ${c("border")}, ${c("border-radius")} ➕. Warna bisa ditulis nama (${c("red")}), hex (${c("#ff0000")}), atau ${c("rgb(255, 0, 0)")}.</p>`, "Bagian 3"),
    code("style.css", `/* gaya dasar */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #1f2937;
}
h1, h2 { color: #1e40af; }

/* class bisa dipakai berulang */
.tombol {
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
}
.tombol:hover { background-color: #1d4ed8; }

/* id hanya satu per halaman */
#banner { text-align: center; }`, "<strong>:hover</strong> membuat tombol berubah warna saat disentuh kursor, tanpa JavaScript.", "File CSS External")
  ],

  p4: [
    A("Setiap Elemen adalah Kotak", `<p><strong>Box model</strong> adalah cara browser memandang setiap elemen: sebagai kotak yang terdiri dari empat lapisan. Urutannya <strong>dari dalam ke luar</strong>:</p>
<ol class="list-decimal pl-5 space-y-1">
<li><strong>Content</strong>: isi elemen (teks, gambar). Ukurannya diatur ${c("width")} dan ${c("height")}.</li>
<li><strong>Padding</strong>: jarak antara isi dan garis tepi. Ikut berwarna latar elemen.</li>
<li><strong>Border</strong>: garis tepi. Letaknya <em>di antara</em> padding (di dalam) dan margin (di luar).</li>
<li><strong>Margin</strong>: jarak kosong di luar garis tepi, memisahkan elemen ini dari elemen lain. Selalu transparan.</li></ol>
<p>Memahami urutan ini penting karena lebar yang terlihat di layar adalah gabungan beberapa lapisan, bukan hanya angka ${c("width")}. Cara menghitungnya ada di Bagian 2.</p>`, "Bagian 1"),
    boxModel,
    A("content-box vs border-box", `<p>Secara default (${c("box-sizing: content-box")}), ${c("width")} hanya untuk konten; padding dan border <strong>ditambahkan</strong> sehingga kotak menjadi lebih lebar dari yang ditulis. Dengan ${c("box-sizing: border-box")}, padding dan border <strong>sudah termasuk</strong> dalam width, jadi ukuran yang ditulis sama dengan yang tampil. Margin tidak pernah termasuk width di kedua mode.</p>
<p>➕ Karena box-sizing tidak diwariskan, cara memasang untuk semua elemen adalah ${c("*, *::before, *::after { box-sizing: border-box; }")}.</p>`, "Bagian 2"),
    ex("Latihan Interaktif", "Hitung Lebar Tampak", ["Aturan", "Lebar tampak"], ["200px", "220px", "224px", "240px", "250px"], [
      ["width:200px; padding:10px; border:2px; (content-box)", "224px", "✓ 200 + 20 + 4."],
      ["width:200px; padding:10px; border:2px; (border-box)", "200px", "✓ Sudah termasuk."],
      ["width:200px; padding:20px; border:0; (content-box)", "240px", "✓ 200 + 40."],
      ["width:200px; padding:10px; margin:25px; (content-box)", "220px", "✓ Margin tidak dihitung dalam lebar tampak."],
      ["width:250px; padding:5px; border:5px; (border-box)", "250px", "✓ border-box: tetap 250."]
    ]),
    A("Batas Ukuran: min-width, max-width, min-height", `<p>Selain ${c("width")} yang menetapkan satu ukuran, CSS punya properti <strong>batas</strong>. Elemen boleh berubah ukuran (misalnya karena ${c("%")}), tetapi tidak melewati batas itu.</p>
<ul class="list-disc pl-5 space-y-1">
<li>${c("max-width")} = <strong>tidak boleh lebih lebar dari</strong>. Contoh: ${c("width: 90%; max-width: 1100px;")} → di HP selebar 90% layar, di monitor besar berhenti di 1100px supaya baris teks tidak terlalu panjang. Juga dipakai untuk gambar: ${c("max-width: 100%")}.</li>
<li>${c("min-width")} = <strong>tidak boleh lebih sempit dari</strong>. Contoh: ${c("min-width: 120px")} pada tombol agar tombol berteks pendek tetap mudah ditekan.</li>
<li>${c("min-height")} / ${c("max-height")} = batas yang sama untuk tinggi. ${c("min-height: 100vh")} sering dipakai agar halaman berisi sedikit tetap setinggi layar.</li></ul>
<p>Jangan tertukar dengan media query ${c("(max-width: 600px)")}: di dalam ${c("@media")}, max-width adalah <em>syarat lebar layar</em>, bukan ukuran elemen.</p>`, "➕ Tambahan"),
    A("Display: block, inline, inline-block", `<p>➕ Sebelum masuk Flexbox, pahami dulu perilaku dasar: elemen <strong>block</strong> (div, p, h1, section) selalu mulai di baris baru dan selebar induknya; elemen <strong>inline</strong> (span, a, strong) mengalir di dalam teks dan mengabaikan width/height; <strong>inline-block</strong> mengalir seperti inline tetapi bisa diberi width/height. ${c("display: none")} menyembunyikan elemen sepenuhnya.</p>
<p>Properti ${c("display")} juga yang menyalakan sistem layout: ${c("display: flex")} menjadikan elemen flex container dan ${c("display: grid")} menjadikannya grid container. Jadi ${c("block")}, ${c("inline")}, ${c("inline-block")}, ${c("none")}, ${c("flex")}, dan ${c("grid")} semuanya nilai ${c("display")} yang sah.</p>`, "Bagian 3 • ➕ Tambahan"),
    flexAxes,
    code("flex.css", `.navbar {
  display: flex;
  justify-content: space-between; /* logo kiri, menu kanan */
  align-items: center;            /* rata tengah vertikal */
  gap: 1rem;
  padding: 0 1rem;
}
.kartu-wrap {
  display: flex;
  flex-wrap: wrap;   /* turun baris saat sempit */
  gap: 16px;
}
.kartu { flex: 1 1 200px; } /* tumbuh, menyusut, lebar dasar 200px */`, "flex: 1 1 200px = flex-grow 1, flex-shrink 1, flex-basis 200px. Pola ini membuat kartu otomatis responsif tanpa media query.", "Pola Flexbox Sehari-hari"),
    A("Ukuran Item Flex: flex-basis, flex-grow, flex-shrink", `<p>Saat item dimasukkan ke flex container, browser menentukan lebarnya dalam dua langkah. <strong>Langkah 1:</strong> setiap item diberi ukuran awal. <strong>Langkah 2:</strong> browser membandingkan total ukuran awal dengan lebar container. Jika masih ada ruang kosong, ruang itu dibagi ke item yang mau membesar. Jika ruangnya kurang, item yang boleh mengecil dikurangi ukurannya. Tiga properti berikut mengatur kedua langkah itu.</p>
<ul class="list-disc pl-5 space-y-1">
<li>${c("flex-basis")} = <strong>ukuran awal</strong> item (langkah 1), misalnya ${c("flex-basis: 200px")}. Bawaannya ${c("auto")}: pakai ${c("width")} item, atau selebar isinya jika width tidak diatur.</li>
<li>${c("flex-grow")} = <strong>porsi item saat ada ruang sisa</strong>. Bawaannya ${c("0")}: item tidak membesar. Angkanya adalah perbandingan, bukan ukuran: item ber-${c("flex-grow: 2")} mendapat bagian sisa dua kali lipat dari item ber-${c("flex-grow: 1")}.</li>
<li>${c("flex-shrink")} = <strong>kesediaan item mengecil saat ruang kurang</strong>. Bawaannya ${c("1")}: semua item ikut mengecil. ${c("flex-shrink: 0")} berarti item ini tidak boleh lebih kecil dari flex-basis-nya, cocok untuk logo atau foto profil yang tidak boleh gepeng.</li>
</ul>
<p>Ketiganya biasa ditulis sekaligus dengan singkatan ${c("flex: grow shrink basis")}. Contoh: ${c("flex: 1 1 200px")} = mulai dari 200px, boleh membesar, boleh mengecil. ${c("flex: 1")} (yang paling sering dipakai) = ${c("flex: 1 1 0%")}: semua item mulai dari nol lalu membagi ruang sama rata, sehingga lebarnya sama.</p>`, "Bagian 4 • ➕ Tambahan"),
    { type: "table", label: "Tabel Interaktif", title: "Contoh Hitung: Container 600px, Tiga Item flex-basis 100px", headers: ["Pengaturan", "Item A", "Item B", "Item C", "Cara menghitung"],
      rows: [
        ["Tanpa flex-grow (bawaan 0)", "100px", "100px", "100px", "Total 300px, sisa 300px dibiarkan kosong di kanan."],
        ["flex-grow: 1 pada ketiganya", "200px", "200px", "200px", "Sisa 300px dibagi 3 porsi sama: masing-masing +100px."],
        ["A flex-grow: 2, B dan C flex-grow: 1", "250px", "175px", "175px", "Sisa 300px dibagi 4 porsi (2+1+1) = 75px per porsi. A mendapat 2 porsi (+150px)."],
        ["Container dipersempit menjadi 240px (flex-shrink bawaan 1)", "80px", "80px", "80px", "Total 300px, kurang 60px. Kekurangan dibagi rata: masing-masing −20px."],
        ["Container 240px, A flex-shrink: 0", "100px", "70px", "70px", "A tidak mau mengecil, jadi kekurangan 60px ditanggung B dan C (−30px)."]
      ],
      modes: [
        { label: "grow = sisa, bukan ukuran", target: "row", row: 2, title: "flex-grow: 2 tidak berarti dua kali lebih lebar", text: "Yang dibagi dua kali lipat hanya <strong>ruang sisanya</strong>. A = 100 + 150 = 250px, bukan dua kali C (175px)." },
        { label: "Kapan pakai shrink 0?", target: "row", row: 4, title: "Mencegah item gepeng", text: "Logo, avatar, atau tombol ikon diberi <code>flex-shrink: 0</code> supaya ukurannya tetap ketika layar sempit; yang mengalah adalah teks di sebelahnya." }
      ] },
    { type: "table", label: "Tabel Interaktif", title: "Properti Flex yang Sering Tertukar", headers: ["Properti", "Dipasang di", "Mengatur", "Contoh nilai"],
      rows: [
        ["`justify-content`", "Container", "Posisi item di <strong>sumbu utama</strong> (mendatar jika row)", "`flex-start`, `center`, `space-between`"],
        ["`align-items`", "Container", "Posisi item di <strong>sumbu silang</strong> (tegak jika row), dalam satu baris", "`stretch` (bawaan), `center`, `flex-start`"],
        ["`align-content`", "Container", "Jarak antar<strong>baris</strong> item, hanya berpengaruh jika item turun baris (`flex-wrap: wrap`)", "`flex-start`, `space-between`"],
        ["`gap`", "Container", "Jarak antar-item, tanpa perlu margin", "`gap: 16px`"],
        ["`flex-basis` / `flex-grow` / `flex-shrink`", "Item", "Ukuran awal / porsi membesar / kesediaan mengecil", "`200px` / `1` / `0`"]
      ],
      modes: [
        { label: "Jebakan soal", target: "row", row: 1, title: "align-items vs align-content", text: "Soal \"perataan di sumbu silang\" jawabannya <code>align-items</code>. <code>align-content</code> baru terasa jika item terdiri dari beberapa baris." }
      ] },
    gridDg,
    code("grid.css", `.halaman {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 12px;
}
.halaman header,
.halaman footer { grid-column: 1 / -1; }`, "", "Layout Grid dari Diagram"),
    { type: "table", label: "Tabel Interaktif", title: "Flexbox atau Grid?", headers: ["Situasi", "Pilihan", "Alasan"],
      rows: [["Navbar: logo + menu satu baris", "Flexbox", "Satu dimensi (baris)"], ["Deretan tombol rata tengah", "Flexbox", "Satu dimensi"], ["Galeri foto 3 kolom", "Grid", "Baris dan kolom sekaligus"], ["Kerangka halaman: header, sidebar, konten, footer", "Grid", "Dua dimensi"], ["Isi kartu: ikon kiri, teks kanan", "Flexbox", "Satu dimensi"]],
      modes: [{ label: "Aturan praktis", target: "none", title: "1D vs 2D", text: "Flexbox untuk satu arah (baris ATAU kolom), Grid untuk dua arah (baris DAN kolom). Keduanya sering dipakai bersama." }] }
  ],

  p5: [
    A("Apa Itu Desain Responsif?", `<p>Lebih dari separuh akses web berasal dari ponsel. Desain responsif membuat <strong>satu halaman</strong> menyesuaikan diri dengan berbagai ukuran layar. Tiga prinsip modul: <strong>fluid layout</strong> (unit relatif), <strong>media queries</strong>, dan <strong>flexible images</strong> (${c("img { max-width: 100%; height: auto; }")}).</p>`, "Bagian 1"),
    tip("Wajib: meta viewport", `Taruh ${c('<meta name="viewport" content="width=device-width, initial-scale=1.0">')} di dalam head. Tanpanya, browser HP menganggap layarnya sekitar 980px lalu memperkecil halaman, dan media query untuk HP tidak pernah aktif.`, "warn"),
    A("Membaca Sebuah Media Query", `<p>Media query adalah aturan CSS bersyarat: <em>terapkan gaya ini hanya jika perangkatnya memenuhi syarat tertentu</em>. Syaratnya berupa karakteristik perangkat, misalnya lebar layar, tinggi layar, atau orientasi. Bentuk lengkapnya:</p>
<p>${c("@media screen and (max-width: 768px) { … }")}</p>
<ul class="list-disc pl-5 space-y-1">
<li>${c("@media")}: kata kunci pembuka. Bukan ${c("@query")} atau ${c("@screen")}.</li>
<li>${c("screen")}: jenis media (layar). Jenis lain ${c("print")} untuk saat dicetak. Boleh dihilangkan: ${c("@media (max-width: 768px)")} juga sah.</li>
<li>${c("and")}: menggabungkan syarat. Bisa lebih dari satu: ${c("(min-width: 601px) and (max-width: 1024px)")}.</li>
<li>${c("(max-width: 768px)")}: syaratnya, <strong>wajib di dalam kurung</strong>. ${c("max-width")} = lebar layar <strong>paling besar</strong> 768px (768px ke bawah). ${c("min-width")} = paling kecil (ke atas). ${c("(width: 768px)")} hanya cocok untuk lebar tepat 768px, jadi jarang dipakai.</li>
<li>${c("{ … }")}: aturan CSS biasa yang hanya berlaku saat syaratnya terpenuhi.</li></ul>`, "➕ Penjelasan"),
    { type: "table", label: "Tabel Interaktif", title: "Syarat Media Query yang Sering Dipakai", headers: ["Ditulis", "Artinya", "Contoh penggunaan"],
      rows: [
        ["`(max-width: 600px)`", "Lebar layar 600px ke bawah", "Gaya HP: kolom ditumpuk, menu disembunyikan"],
        ["`(min-width: 1025px)`", "Lebar layar 1025px ke atas", "Gaya desktop pada pendekatan mobile-first"],
        ["`(min-width: 601px) and (max-width: 1024px)`", "Di antara keduanya", "Gaya tablet"],
        ["`(orientation: landscape)`", "Layar lebih lebar daripada tingginya (HP dimiringkan)", "Video atau galeri memenuhi layar"],
        ["`(orientation: portrait)`", "Layar lebih tinggi daripada lebarnya (HP tegak)", "Tata letak satu kolom"],
        ["`print`", "Saat halaman dicetak", "Sembunyikan navigasi dan tombol"]
      ],
      modes: [{ label: "Jebakan soal", target: "row", row: 3, title: "Nama fiturnya orientation", text: "Bukan <code>mode</code>, <code>direction</code>, atau <code>(landscape)</code> saja. Tulis lengkap <code>(orientation: landscape)</code>." }] },
    tip("Media query bisa mengubah apa saja", `Media query tidak terbatas pada warna. Di dalamnya boleh ada properti apa pun: ${c("display")}, ${c("flex-direction")}, ${c("font-size")}, ${c("grid-template-columns")}, dan unit relatif seperti ${c("rem")}, ${c("vw")}, ${c("vh")}. Tempat menulisnya di CSS internal atau external; atribut ${c("style")} (inline) tidak bisa berisi media query.`),
    breakpoints,
    code("responsive.css", `/* 1. Aturan umum (desktop) */
.container { width: 80%; margin: 0 auto; }
.kolom { display: flex; gap: 1rem; }

/* 2. Tablet */
@media (min-width: 601px) and (max-width: 1024px) {
  .container { width: 90%; }
}

/* 3. Mobile: kolom ditumpuk */
@media (max-width: 600px) {
  .container { width: 100%; padding: 0 16px; }
  .kolom { flex-direction: column; }
  nav ul { display: none; } /* diganti tombol menu */
}`, "Media query ditulis di <strong>bawah</strong> aturan umum. Jika ditulis di atas, aturan umum yang datang belakangan akan menimpanya.", "Contoh Desktop-first"),
    ex("Latihan Interaktif", "Media Query Mana yang Aktif?", ["Lebar layar", "Aktif"], ["Mobile", "Tablet", "Desktop"], [
      ["360px (HP)", "Mobile"],
      ["600px", "Mobile", "✓ max-width 600 berarti ≤ 600."],
      ["601px", "Tablet"],
      ["768px (iPad)", "Tablet"],
      ["1024px", "Tablet", "✓ max-width 1024 berarti ≤ 1024."],
      ["1366px (laptop)", "Desktop"]
    ]),
    A("Unit Absolut vs Relatif", `<p>Setiap ukuran di CSS (lebar, tinggi, jarak, ukuran huruf) ditulis sebagai <strong>angka + unit</strong>, misalnya ${c("16px")} atau ${c("2rem")}. Unit dibagi dua kelompok berdasarkan satu pertanyaan: <em>apakah hasil akhirnya bergantung pada hal lain?</em></p>
<p><strong>Unit absolut</strong> berarti hasilnya tidak bergantung pada apa pun. ${c("width: 300px")} selalu 300px, baik di HP yang lebarnya 360px maupun di monitor 1920px. Akibatnya di HP kotak itu hampir memenuhi layar, sedangkan di monitor terlihat kecil. Di web, unit absolut yang dipakai adalah ${c("px")}. Unit absolut lain (${c("pt")}, ${c("cm")}, ${c("mm")}) ditujukan untuk hasil cetak dan hampir tidak pernah dipakai untuk layar.</p>
<p><strong>Unit relatif</strong> berarti nilainya adalah <em>perbandingan</em> terhadap suatu patokan, jadi hasil akhirnya ikut berubah saat patokannya berubah. ${c("width: 50%")} artinya setengah lebar elemen induk: jika induknya 360px hasilnya 180px, jika induknya 1200px hasilnya 600px. Sifat ikut menyesuaikan inilah yang membuat halaman responsif tanpa harus menulis ukuran untuk setiap layar.</p>`, "Bagian 2"),
    { type: "table", label: "Tabel Interaktif", title: "Patokan Setiap Unit dan Kapan Dipakai", headers: ["Unit", "Patokannya", "Contoh hitung (html 16px, layar 360 × 800)", "Paling cocok untuk"],
      rows: [
        ["`px`", "Tidak ada, ukurannya tetap", "`16px` = 16px di layar mana pun", "Garis tepi (`border: 1px`), sudut membulat, bayangan: hal kecil yang memang tidak perlu ikut membesar"],
        ["`%`", "Ukuran elemen <strong>induk</strong>", "`width: 50%` di induk 360px = 180px", "Lebar wadah dan kolom"],
        ["`vw`", "1% <strong>lebar</strong> layar browser (viewport)", "`10vw` = 36px", "Elemen yang harus selebar layar, judul besar"],
        ["`vh`", "1% <strong>tinggi</strong> layar browser", "`100vh` = 800px", "Bagian pembuka setinggi satu layar penuh"],
        ["`rem`", "font-size elemen <code>&lt;html&gt;</code> (bawaan browser 16px)", "`1.5rem` = 24px", "Ukuran huruf dan jarak umum (padding, margin)"],
        ["`em`", "font-size elemen induk (untuk font-size) atau elemen itu sendiri (untuk padding/margin)", "`1.5em` di dalam induk 20px = 30px", "Padding tombol supaya ikut besar kecilnya teks tombol"]
      ],
      modes: [
        { label: "Kenapa font pakai rem?", target: "row", row: 4, title: "rem menghormati pengaturan pengguna", text: "Orang yang penglihatannya kurang baik sering memperbesar ukuran huruf di pengaturan browser. Teks ber-<code>rem</code> ikut membesar karena patokannya (font html) berubah, sedangkan teks ber-<code>px</code> tetap kecil." },
        { label: "% vs vw", target: "row", row: 1, title: "% mengacu ke induk, bukan layar", text: "<code>width: 50%</code> di dalam kartu selebar 300px hasilnya 150px, walaupun layarnya 1920px. Jika yang diinginkan memang setengah layar, pakai <code>50vw</code>." },
        { label: "Kapan px tetap tepat?", target: "row", row: 0, title: "px tidak dilarang", text: "Garis tepi 1px yang berubah menjadi 1,2px saat font diperbesar justru terlihat kabur. Untuk hal kecil seperti ini px adalah pilihan yang benar." }
      ] },
    tip("Aturan praktis memilih unit", `<ul class="list-disc pl-5 space-y-1">
<li>Ukuran huruf → ${c("rem")}.</li>
<li>Lebar wadah atau kolom → ${c("%")}, ditambah ${c("max-width")} agar tidak terlalu melebar di monitor besar, misalnya ${c("width: 90%; max-width: 1100px;")}.</li>
<li>Setinggi atau selebar layar penuh → ${c("vh")} / ${c("vw")}.</li>
<li>Jarak di dalam tombol → ${c("em")}, supaya tombol berteks besar otomatis punya padding lebih besar.</li>
<li>Garis tepi, radius, bayangan → ${c("px")}.</li></ul>`),
    tip("Kesalahan yang sering terjadi", `<ul class="list-disc pl-5 space-y-1">
<li>Mengira ${c("%")} selalu terhadap layar. Patokan ${c("%")} adalah induknya; yang terhadap layar adalah ${c("vw")} dan ${c("vh")}.</li>
<li>${c("em")} yang bersarang ikut berlipat: daftar ${c("font-size: 1.2em")} di dalam daftar ${c("1.2em")} menjadi 1,2 × 1,2 = 1,44 kali. ${c("rem")} tidak punya masalah ini karena patokannya selalu html.</li>
<li>Menulis angka tanpa unit, misalnya ${c("width: 200;")}. Aturan itu diabaikan browser. Hanya ${c("0")} yang boleh tanpa unit.</li>
<li>${c("width: 100vw")} kadang membuat halaman bisa digeser ke samping karena ikut menghitung lebar scrollbar. Untuk selebar wadah, cukup ${c("width: 100%")}.</li></ul>`, "warn"),
    remEm,
    ex("Latihan Interaktif", "Berapa Pikselnya?", ["Soal (html = 16px)", "Hasil"], ["8px", "18px", "24px", "32px", "40px", "450px"], [
      ["2rem", "32px"],
      ["0.5rem", "8px"],
      ["5vw di layar 360px", "18px", "✓ 5% × 360."],
      ["50vh di layar tinggi 900px", "450px"],
      ["1.5em di dalam induk 16px", "24px"],
      ["2em di dalam induk 20px", "40px"]
    ]),
    A("Gambar dan Tipografi Fleksibel", `<p>Gambar: ${c("max-width: 100%")} agar tidak melebihi wadah, ${c("height: auto")} agar proporsi terjaga. ➕ ${c("object-fit: cover")} memotong rapi gambar yang dipaksa ke ukuran tertentu (foto profil bulat, thumbnail).</p>
<p>➕ Tipografi: ${c("font-size: clamp(1.5rem, 4vw, 2.5rem)")} membuat judul membesar mengikuti layar, tetapi tidak lebih kecil dari 1.5rem dan tidak lebih besar dari 2.5rem.</p>
<p>➕ Uji tampilan responsif dengan <strong>DevTools</strong> (F12 → ikon ponsel / Ctrl+Shift+M) untuk mencoba berbagai ukuran layar.</p>`, "Bagian 3")
  ],

  p6: [
    tigaLapis,
    A("Mengenal JavaScript", `<p>JavaScript adalah bahasa pemrograman yang berjalan di browser untuk membuat halaman <strong>interaktif</strong>. ➕ Diciptakan Brendan Eich (1995) dan distandarkan sebagai ECMAScript; versi modern (ES6/2015 ke atas) memperkenalkan ${c("let")}, ${c("const")}, dan arrow function. Meski namanya mirip, JavaScript tidak berhubungan dengan Java.</p>
<p>Cara memasang: di dalam ${c("<script>")}, atau file eksternal ${c('<script src="app.js"></script>')} yang diletakkan sebelum ${c("</body>")} (atau di head dengan atribut ${c("defer")} ➕) agar elemen HTML sudah ada saat skrip berjalan.</p>`, "Bagian 1"),
    A("Variabel dan Tipe Data", `<p>Gunakan ${c("const")} sebagai pilihan pertama, ${c("let")} jika nilainya akan berubah, dan hindari ${c("var")} (scope-nya bocor keluar blok dan bisa dideklarasi ulang). Lima tipe data modul: <strong>String</strong>, <strong>Number</strong>, <strong>Boolean</strong>, <strong>Array</strong>, <strong>Object</strong>. ➕ Ditambah ${c("undefined")} (belum diisi) dan ${c("null")} (sengaja kosong).</p>`, "Bagian 2"),
    code("tipe.js", `const nama = "Gilang";            // String
let semester = 1;                 // Number
const aktif = true;               // Boolean
const matkul = ["PWD", "AIK"];    // Array, indeks mulai 0
const mhs = { nim: "2401", ipk: 3.75 }; // Object

semester = semester + 1;          // let boleh diubah
console.log(matkul[0]);           // "PWD"
console.log(mhs.ipk);             // 3.75
console.log(typeof semester);     // "number"
console.log(\`Halo \${nama}, semester \${semester}\`); // template literal ➕`, "Template literal memakai backtick (`) dan ${…} untuk menyisipkan nilai, lebih rapi daripada menyambung dengan +.", "Contoh Variabel & Tipe Data"),
    { type: "table", label: "➕ Tambahan • Tabel Interaktif", title: "Semua Tipe Data dalam Satu Tabel", headers: ["Tipe", "Contoh nilai", "typeof", "Isi / kegunaan"],
      rows: [["String", "\"Gilang\", 'SI'", "\"string\"", "teks, selalu di dalam kutip"], ["Number", "20, 3.14, -5", "\"number\"", "bilangan bulat dan pecahan sama-sama number"], ["Boolean", "true, false", "\"boolean\"", "hasil perbandingan, penentu if"], ["Array", "[\"PWD\", \"AIK\"]", "\"object\"", "daftar berurutan, indeks mulai 0"], ["Object", "{ nim: \"2401\" }", "\"object\"", "pasangan nama: nilai"], ["undefined ➕", "let x;", "\"undefined\"", "variabel dibuat tetapi belum diisi"], ["null ➕", "let y = null;", "\"object\"", "sengaja dikosongkan"]],
      modes: [{ label: "typeof null", target: "row", row: 6, title: "Bug lama JavaScript", text: "<code>typeof null</code> bernilai <code>\"object\"</code>. Ini kekeliruan sejak awal bahasa ini dan tidak diperbaiki. Cek null dengan <code>nilai === null</code>." },
        { label: "typeof array", target: "row", row: 3, title: "Array juga \"object\"", text: "<code>typeof [1, 2]</code> bernilai <code>\"object\"</code>. Untuk memastikan sebuah array, pakai <code>Array.isArray(x)</code>." },
        { label: "NaN", target: "none", title: "NaN bertipe number", text: "<code>typeof NaN</code> bernilai <code>\"number\"</code> walaupun artinya \"bukan angka\". Cek dengan <code>isNaN(x)</code>." },
        { label: "Primitif vs object", target: "none", title: "Dua kelompok besar", text: "String, number, boolean, undefined, dan null adalah nilai tunggal (primitif). Array dan object menyimpan banyak nilai, dan isinya boleh diubah walaupun dideklarasi dengan <code>const</code>." }] },
    ex("Latihan Interaktif", "Tebak Hasilnya", ["Ekspresi", "Hasil"], ["true", "false", "\"23\"", "5", "1", "\"number\"", "\"object\""], [
      ["5 === \"5\"", "false"],
      ["5 == \"5\"", "true"],
      ["\"2\" + 3", "\"23\""],
      ["\"8\" - 3", "5"],
      ["10 % 3", "1"],
      ["typeof 3.14", "\"number\""],
      ["typeof [1, 2]", "\"object\"", "✓ Array termasuk object; pakai Array.isArray()."],
      ["true && false", "false"]
    ]),
    A("Input dan Output Sederhana", `<p>${c("alert()")} menampilkan pesan, ${c("prompt()")} meminta input (hasilnya <strong>selalu string</strong>, ubah dengan ${c("Number()")}), ${c("confirm()")} meminta OK/Batal (hasil boolean), dan ${c("console.log()")} mencetak ke Console (F12) untuk debugging. Untuk aplikasi nyata, input diambil dari form dengan ${c("elemen.value")}.</p>`, "Bagian 3"),
    A("Konversi Tipe, NaN, dan Nilai Falsy", `<p>➕ Nilai dari ${c("prompt()")} dan ${c("elemen.value")} <strong>selalu string</strong>, sedangkan hitungan butuh angka. Di sinilah kebanyakan bug pemula muncul. Tiga alat yang perlu dikenal:</p>
<ul><li>${c("Number(\"25\")")} mengubah string menjadi angka (${c("Number(\"\")")} = 0, ${c("Number(\"abc\")")} = NaN).</li>
<li>${c("parseInt(\"25 tahun\")")} membaca angka di awal teks lalu berhenti (hasil 25), dan ${c("parseFloat(\"3.75\")")} untuk pecahan.</li>
<li>${c("String(25)")} atau ${c("25 + \"\"")} mengubah angka menjadi teks.</li></ul>
<p>${c("NaN")} (<em>Not a Number</em>) adalah hasil konversi yang gagal. Ia bertipe number, dan ${c("NaN === NaN")} bernilai <strong>false</strong>, jadi cek dengan ${c("isNaN(x)")}, bukan dengan ${c("===")}.</p>
<p><strong>Nilai falsy</strong> adalah nilai yang dianggap false di dalam ${c("if")}: ${c("false")}, ${c("0")}, ${c("\"\"")} (string kosong), ${c("null")}, ${c("undefined")}, dan ${c("NaN")}. Semua nilai lain adalah <strong>truthy</strong>, termasuk ${c("\"0\"")}, ${c("\"false\"")}, dan ${c("[]")}. Karena itu ${c("if (!teks) return;")} dipakai untuk menolak input kosong.</p>`, "Bagian 3 • ➕ Tambahan"),
    code("konversi.js", `const a = prompt("Angka pertama:");   // misal ketik 20
const b = prompt("Angka kedua:");    // misal ketik 3

console.log(a + b);                  // "203"  (string disambung)
console.log(Number(a) + Number(b));  // 23     (angka dijumlah)

const umur = Number("dua puluh");
console.log(umur);                   // NaN
console.log(umur === NaN);           // false  (jebakan!)
console.log(isNaN(umur));            // true

if ("") console.log("tidak tampil"); // string kosong = falsy
if ("0") console.log("tampil");      // "0" = truthy`, "Urutan aman untuk input angka: ambil .value, ubah dengan Number(), cek isNaN(), baru dihitung.", "Konversi Tipe dan Falsy"),
    ex("Latihan Interaktif • ➕ Tambahan", "Konversi dan Falsy: Apa Hasilnya?", ["Ekspresi", "Hasil"], ["20", "\"20\"", "NaN", "true", "false", "7", "\"34\""], [
      ["Number(\"20\")", "20"],
      ["Number(\"abc\")", "NaN"],
      ["parseInt(\"20 tahun\")", "20"],
      ["\"3\" + \"4\"", "\"34\""],
      ["Number(\"3\") + Number(\"4\")", "7"],
      ["NaN === NaN", "false", "✓ NaN tidak sama dengan apa pun, termasuk dirinya sendiri. Pakai isNaN()."],
      ["isNaN(Number(\"abc\"))", "true"],
      ["Boolean(\"0\")", "true", "✓ Hanya string kosong yang falsy; \"0\" berisi karakter sehingga truthy."],
      ["Boolean(\"\")", "false"]
    ]),
    A("Percabangan dan Perulangan", `<p>➕ Validasi form hampir selalu butuh ${c("if")}. Perulangan dipakai untuk memproses array.</p>`, "Bagian 4 • ➕ Tambahan"),
    code("logika.js", `const nilai = 82;
if (nilai >= 85) {
  console.log("A");
} else if (nilai >= 70) {
  console.log("B");
} else {
  console.log("C");
}

const daftar = ["Ani", "Budi", "Citra"];
for (let i = 0; i < daftar.length; i++) {
  console.log(i + 1, daftar[i]);
}
daftar.forEach(n => console.log(n.toUpperCase()));`, "", "if-else dan for"),
    A("Fungsi dan Array Secukupnya", `<p>➕ Hampir semua kode di P6–P8 memakai fungsi dan array: setiap ${c("addEventListener")} menerima <strong>fungsi</strong>, dan data mahasiswa di P7–P8 disimpan dalam <strong>array</strong>.</p>
<p><strong>Fungsi</strong> adalah sekumpulan perintah yang diberi nama dan bisa dipanggil berulang kali. Nilai yang dikirim saat memanggil disebut <strong>argumen</strong>; nama penampungnya di dalam fungsi disebut <strong>parameter</strong>. ${c("return")} mengembalikan hasil ke pemanggil dan langsung menghentikan fungsi. Fungsi tanpa ${c("return")} menghasilkan ${c("undefined")}.</p>
<p>Ada tiga cara menulis fungsi yang akan sering kamu temui:</p>
<ul><li>${c("function sapa(nama) { … }")}: deklarasi biasa, bisa dipanggil dengan ${c('sapa("Ani")')}.</li>
<li>${c("const sapa = (nama) => { … }")}: <em>arrow function</em>, bentuk singkat yang sama fungsinya. Kalau isinya hanya satu ekspresi, kurung kurawal dan ${c("return")} boleh dihilangkan: ${c("(a, b) => a + b")}.</li>
<li>${c("tombol.addEventListener(\"click\", function () { … })")}: fungsi <em>tanpa nama</em> yang diberikan ke browser. Browser yang memanggilnya nanti, saat tombol diklik. Karena itu yang ditulis ${c("simpan")}, bukan ${c("simpan()")}: kalau pakai kurung, fungsinya langsung jalan saat halaman dimuat.</li></ul>
<p><strong>Array</strong> adalah daftar nilai berurutan dalam ${c("[ ]")}. Indeks dimulai dari 0, jadi elemen terakhir ada di ${c("arr[arr.length - 1]")}. Method yang dipakai di P7–P8: ${c("push()")} menambah di akhir, ${c("splice(i, 1)")} menghapus elemen ke-i, ${c("forEach()")} menjalankan fungsi untuk setiap elemen, ${c("map()")} membuat array baru dari hasil fungsi, dan ${c("join(\"\")")} menyambung isi array menjadi satu string. Data tabel biasanya berupa <strong>array berisi object</strong>: satu object = satu baris.</p>`, "Bagian 4 • ➕ Tambahan"),
    code("fungsi-array.js", `// 1. Fungsi dengan parameter dan return
function hitungRata(a, b, c) {
  return (a + b + c) / 3;
}
const rata = hitungRata(80, 90, 70);   // argumen: 80, 90, 70
console.log(rata);                     // 80

// 2. Arrow function: isi satu ekspresi, return otomatis
const lulus = nilai => nilai >= 60;
console.log(lulus(rata));              // true

// 3. Array berisi object (satu object = satu baris tabel)
const mahasiswa = [
  { nim: "2401", nama: "Ani" },
  { nim: "2402", nama: "Budi" }
];
mahasiswa.push({ nim: "2403", nama: "Citra" }); // tambah di akhir
mahasiswa.splice(0, 1);                         // hapus indeks 0 (Ani)
console.log(mahasiswa.length);                  // 2

// 4. forEach: jalankan sesuatu untuk setiap elemen
mahasiswa.forEach((m, i) => console.log(i + 1, m.nama));

// 5. map + join: ubah array menjadi baris-baris HTML
const barisHTML = mahasiswa
  .map(m => \`<tr><td>\${m.nim}</td><td>\${m.nama}</td></tr>\`)
  .join("");
// tbody.innerHTML = barisHTML;  (pola yang dipakai di P7–P8)`, "Pola nomor 5 adalah inti tabel CRUD di P7–P8: data disimpan di array, lalu tabel digambar ulang dari array setiap kali data berubah.", "Fungsi dan Array dalam Satu Contoh"),
    ex("Latihan Interaktif • ➕ Tambahan", "Fungsi dan Array: Apa Hasilnya?", ["Kode", "Hasil"], ["undefined", "3", "2", "\"Budi\"", "langsung jalan saat halaman dimuat", "jalan saat tombol diklik"], [
      ["const a = [\"Ani\", \"Budi\", \"Citra\"]; a[1]", "\"Budi\""],
      ["const a = [\"Ani\", \"Budi\", \"Citra\"]; a.length", "3"],
      ["const a = [5, 6, 7]; a.splice(0, 1); a.length", "2"],
      ["function f(x) { x * 2; } f(4)", "undefined", "✓ Tanpa return, hasil fungsi selalu undefined."],
      ["btn.addEventListener(\"click\", simpan)", "jalan saat tombol diklik"],
      ["btn.addEventListener(\"click\", simpan())", "langsung jalan saat halaman dimuat", "✓ simpan() memanggil fungsinya saat itu juga. Yang diberikan ke listener hanyalah hasilnya."]
    ]),
    A("Ternary, switch, dan while", `<p>➕ Tiga bentuk lain yang sering muncul di kode orang lain, jadi perlu dikenali.</p>
<ul><li><strong>Ternary</strong> ${c("kondisi ? nilaiJikaTrue : nilaiJikaFalse")}: if-else satu baris yang menghasilkan nilai. Cocok untuk memilih teks atau warna.</li>
<li><strong>switch</strong> mencocokkan satu nilai dengan beberapa ${c("case")}. Seperti di C++, tanpa ${c("break")} eksekusi <em>jatuh</em> ke case berikutnya. JavaScript memakai perbandingan ${c("===")}, jadi ${c('case "1"')} tidak cocok dengan angka ${c("1")}.</li>
<li><strong>while</strong> mengulang selama kondisi true: ${c("while (kondisi) { … }")}. Pastikan ada baris yang membuat kondisi akhirnya false, kalau tidak halaman akan macet.</li>
<li><strong>Operator singkat</strong>: ${c("x++")} sama dengan ${c("x = x + 1")}, ${c("x += 5")} sama dengan ${c("x = x + 5")}.</li></ul>`, "Bagian 4 • ➕ Tambahan"),
    code("ternary-switch-while.js", `const nilai = 72;
const status = nilai >= 60 ? "Lulus" : "Tidak lulus";   // ternary
console.log(status);                                      // "Lulus"

const hari = 3;
switch (hari) {
  case 1: console.log("Senin"); break;
  case 2: console.log("Selasa"); break;
  case 3: console.log("Rabu"); break;      // tercetak, lalu break
  default: console.log("Hari lain");
}

let n = 1;
while (n <= 3) {
  console.log(n);   // 1, 2, 3
  n++;              // tanpa baris ini loop tidak pernah berhenti
}`, "Ternary dipakai bila hasilnya sebuah nilai; untuk menjalankan beberapa perintah, tetap pakai if-else.", "Ternary, switch, dan while"),
    A("Method String dan Array yang Sering Dipakai", `<p>➕ Dua kelompok method ini hampir selalu dipakai saat memproses input form dan data tabel. String itu <em>tidak bisa diubah</em> di tempat: method seperti ${c("trim()")} mengembalikan string baru, jadi hasilnya harus ditampung.</p>`, "Bagian 5 • ➕ Tambahan"),
    { type: "table", label: "➕ Tambahan • Tabel Interaktif", title: "Method yang Perlu Dikenal", headers: ["Method", "Hasil", "Contoh"],
      rows: [["str.trim()", "membuang spasi di awal dan akhir", "\" Ani \".trim() → \"Ani\""], ["str.toUpperCase() / toLowerCase()", "mengubah huruf besar / kecil", "\"ani\".toUpperCase() → \"ANI\""], ["str.includes(x)", "true jika mengandung x", "\"Budi\".includes(\"ud\") → true"], ["str.split(pemisah)", "memecah menjadi array", "\"a,b\".split(\",\") → [\"a\", \"b\"]"], ["arr.includes(x)", "true jika ada x di array", "[1, 2].includes(2) → true"], ["arr.find(fn)", "elemen pertama yang cocok (atau undefined)", "[5, 8].find(n => n > 6) → 8"], ["arr.filter(fn)", "array baru berisi semua yang cocok", "[5, 8, 9].filter(n => n > 6) → [8, 9]"], ["arr.indexOf(x)", "indeks pertama x, atau -1", "[\"a\", \"b\"].indexOf(\"b\") → 1"]],
      modes: [{ label: "find vs filter", target: "row", row: 6, title: "Satu hasil atau banyak hasil", text: "<code>find</code> berhenti di elemen pertama yang cocok dan mengembalikan elemennya. <code>filter</code> mengembalikan <strong>array</strong> berisi semua yang cocok (kosong <code>[]</code> jika tidak ada)." },
        { label: "String tidak berubah", target: "none", title: "Tampung hasilnya", text: "<code>nama.trim();</code> saja tidak mengubah <code>nama</code>. Tulis <code>nama = nama.trim();</code> atau simpan ke variabel baru." },
        { label: "indexOf", target: "row", row: 7, title: "-1 artinya tidak ditemukan", text: "Indeks pertama adalah 0, jadi memeriksa dengan <code>if (arr.indexOf(x))</code> keliru. Pakai <code>arr.includes(x)</code> atau bandingkan dengan <code>!== -1</code>." }] },
    ex("Latihan Interaktif • ➕ Tambahan", "Tebak Hasilnya: Ternary, Method, dan Array", ["Ekspresi", "Hasil"], ["\"Lulus\"", "\"Tidak lulus\"", "\"Ani\"", "\"ANI\"", "true", "false", "[8, 9]", "8", "-1", "[\"a\", \"b\"]"], [
      ["const n = 50; n >= 60 ? \"Lulus\" : \"Tidak lulus\"", "\"Tidak lulus\""],
      ["\"  Ani  \".trim()", "\"Ani\""],
      ["\"ani\".toUpperCase()", "\"ANI\""],
      ["\"a,b\".split(\",\")", "[\"a\", \"b\"]"],
      ["[5, 8, 9].filter(n => n > 6)", "[8, 9]"],
      ["[5, 8, 9].find(n => n > 6)", "8", "✓ find mengembalikan elemen pertama saja, bukan array."],
      ["[\"a\", \"b\"].indexOf(\"z\")", "-1"],
      ["[1, 2, 3].includes(2)", "true"]
    ]),
    eventFlow,
    code("event.html", `<input id="nim" placeholder="NIM">
<button id="cek">Cek</button>
<p id="hasil"></p>

<script>
  const tombol = document.getElementById("cek");
  tombol.addEventListener("click", function () {
    const nim = document.getElementById("nim").value.trim();
    const hasil = document.getElementById("hasil");
    if (nim === "" || isNaN(nim)) {
      hasil.textContent = "NIM harus berupa angka!";
      hasil.style.color = "red";
    } else {
      hasil.textContent = "NIM " + nim + " valid.";
      hasil.style.color = "green";
    }
  });
</script>`, "Pola lengkap: pilih elemen → pasang listener → baca .value → cek dengan if → tampilkan hasil.", "Validasi NIM dengan Event"),
    A("Event Form: submit, input, dan change", `<p>➕ Contoh di atas memakai ${c('type="button"')}, jadi form tidak pernah benar-benar dikirim. Pada form sungguhan, tombol ${c('type="submit"')} (atau menekan Enter) memicu event ${c("submit")} pada <strong>form</strong>, dan browser langsung mengirim data lalu memuat ulang halaman. Untuk validasi, tahan dulu dengan ${c("e.preventDefault()")}.</p>
<ul><li>${c("submit")}: dipasang di ${c("<form>")}, bukan di tombolnya. Dipakai untuk validasi akhir sebelum data diproses.</li>
<li>${c("input")}: jalan setiap kali isi kolom berubah. Cocok untuk hitung karakter atau pencarian langsung.</li>
<li>${c("change")}: untuk ${c("select")}, checkbox, dan radio, jalan saat pilihan selesai diubah.</li>
<li>${c("e.target")}: elemen yang memicu event, ${c("e.key")}: tombol keyboard pada ${c("keydown")}.</li></ul>`, "Bagian 5 • ➕ Tambahan"),
    code("form-submit.html", `<form id="form-mhs">
  <input id="nama" placeholder="Nama">
  <small id="hitung">0 karakter</small>
  <select id="prodi">
    <option value="">Pilih prodi</option>
    <option value="SI">Sistem Informasi</option>
  </select>
  <button type="submit">Simpan</button>
  <p id="pesan"></p>
</form>

<script>
  const form = document.getElementById("form-mhs");
  const nama = document.getElementById("nama");

  nama.addEventListener("input", () => {
    document.getElementById("hitung").textContent = nama.value.length + " karakter";
  });

  document.getElementById("prodi").addEventListener("change", (e) => {
    console.log("Prodi dipilih:", e.target.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();                       // cegah kirim + muat ulang
    const pesan = document.getElementById("pesan");
    if (!nama.value.trim()) {
      pesan.textContent = "Nama wajib diisi!";
      return;
    }
    pesan.textContent = "Tersimpan: " + nama.value;
    form.reset();                             // kosongkan form
  });
</script>`, "Tekan Enter di kolom nama juga memicu submit. Itulah alasan listener dipasang di form, bukan di tombol.", "Validasi Form dengan submit"),
    ex("Latihan Interaktif • ➕ Tambahan", "Event Mana yang Dipakai?", ["Kebutuhan", "Event"], ["click", "submit", "input", "change", "keydown"], [
      ["Hitung jumlah karakter sambil mengetik", "input"],
      ["Validasi seluruh form sebelum disimpan (termasuk lewat tombol Enter)", "submit"],
      ["Membaca pilihan dropdown setelah diganti", "change"],
      ["Menambah data saat menekan tombol Enter di kolom teks", "keydown"],
      ["Tombol Hapus pada satu baris", "click"]
    ]),
    A("Membaca Error di Console", `<p>➕ Tekan <strong>F12</strong> lalu buka tab <strong>Console</strong>. Error JavaScript muncul berwarna merah lengkap dengan nama file dan nomor baris; klik nomor itu untuk melompat ke kodenya. Jika setelah klik tombol tidak terjadi apa pun, hal pertama yang dilakukan adalah membuka Console.</p>
<p>Gunakan ${c("console.log(variabel)")} untuk melihat isi variabel di titik tertentu, dan tab <strong>Elements</strong> untuk memeriksa DOM yang sedang berlaku (termasuk perubahan yang dibuat JavaScript).</p>`, "Bagian 6 • ➕ Tambahan"),
    rv("Cek Pemahaman • ➕ Tambahan", "Pesan Error: Artinya Apa?", [
      { prompt: "Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')", answer: "Elemen tidak ditemukan", reason: "id salah ketik, ada tanda #, atau script jalan sebelum elemen ada." },
      { prompt: "Uncaught ReferenceError: nama is not defined", answer: "Variabel belum dibuat atau salah tulis", reason: "Cek ejaan dan huruf besar-kecil, atau variabel dibuat di blok lain (scope)." },
      { prompt: "Uncaught SyntaxError: Unexpected token", answer: "Ada tanda kurung, kutip, atau koma yang kurang atau berlebih", reason: "Lihat baris yang ditunjuk dan baris sebelumnya." },
      { prompt: "Uncaught TypeError: Assignment to constant variable", answer: "const diisi ulang", reason: "Ganti dengan let jika nilainya memang harus berubah." },
      { prompt: "Halaman memuat ulang sendiri setelah klik Simpan, data hilang", answer: "Lupa e.preventDefault() pada event submit", reason: "Form terkirim dan halaman dimuat ulang." }
    ])
  ],

  p7: [
    A("DOM: Halaman sebagai Pohon Objek", `<p>Saat memuat HTML, browser membangun <strong>DOM (Document Object Model)</strong>: representasi halaman berbentuk pohon, tiap tag menjadi <strong>node</strong> berupa objek yang punya properti dan method. JavaScript tidak mengubah file HTML; ia mengubah DOM di memori, dan browser langsung menggambar ulang.</p>`, "Bagian 1"),
    domTree,
    { type: "table", label: "Tabel Interaktif", title: "Metode Seleksi", headers: ["Metode", "Argumen", "Hasil jika tidak ada"],
      rows: [["getElementById(\"nim\")", "id tanpa #", "null"], ["querySelector(\"#nim\")", "selector CSS", "null"], ["querySelectorAll(\".item\")", "selector CSS", "NodeList kosong (length 0)"], ["getElementsByClassName(\"item\") ➕", "nama class tanpa titik", "HTMLCollection kosong"]],
      modes: [{ label: "Error paling sering", target: "row", row: 0, title: "Cannot read properties of null", text: "Muncul jika id salah ketik, ada tanda #, atau skrip berjalan sebelum elemen ada (letakkan script di akhir body atau pakai defer)." },
        { label: "NodeList", target: "row", row: 2, title: "Tidak bisa langsung .style", text: "Ulangi dengan <code>forEach</code>; untuk map/filter ubah dulu dengan <code>Array.from()</code>." }] },
    A("Mengubah Konten, Style, Atribut, dan Class", `<p>${c("textContent")} mengisi teks apa adanya, sedangkan ${c("innerHTML")} membaca tag sebagai HTML. ➕ Jangan pernah memasukkan input pengguna ke innerHTML: jika pengguna mengetik ${c("<img src=x onerror=alert(1)>")}, kodenya akan berjalan. Serangan ini disebut <strong>XSS (Cross-Site Scripting)</strong>. Untuk teks dari pengguna, selalu gunakan textContent.</p>
<p>Style diubah lewat ${c("el.style.namaProperti")} dengan camelCase (${c("backgroundColor")}). Cara yang lebih rapi: simpan gaya di CSS lalu ganti class dengan ${c("classList.add/remove/toggle/contains")}. Atribut diatur dengan ${c("setAttribute")} dan dibaca dengan ${c("getAttribute")}.</p>`, "Bagian 2"),
    crudDom,
    code("todo.html", `<input id="tugas" placeholder="Tugas baru">
<button id="tambah">Tambah</button>
<ul id="daftar"></ul>

<script>
  const input = document.getElementById("tugas");
  const daftar = document.getElementById("daftar");

  document.getElementById("tambah").addEventListener("click", () => {
    const teks = input.value.trim();
    if (!teks) return;                       // jangan tambah yang kosong

    const li = document.createElement("li"); // CREATE
    li.textContent = teks;                   // aman dari XSS

    const hapus = document.createElement("button");
    hapus.textContent = "✕";
    hapus.addEventListener("click", () => li.remove()); // DELETE

    li.addEventListener("dblclick", () => li.classList.toggle("selesai")); // UPDATE
    li.appendChild(hapus);
    daftar.appendChild(li);
    input.value = "";
  });
</script>`, "Coba ketik kode ini di VS Code dan buka di browser. Ini mini-CRUD di sisi browser; setelah UTS, datanya akan disimpan ke database lewat PHP.", "Mini Aplikasi To-Do"),
    A("Menelusuri Pohon DOM", `<p>➕ Selain memilih dari ${c("document")}, kamu bisa berpindah dari satu elemen ke elemen di sekitarnya. Ini berguna ketika ada banyak baris yang mirip, misalnya tombol Hapus di setiap baris tabel: dari tombol yang diklik, kamu perlu menemukan baris miliknya.</p>`, "Bagian 3 • ➕ Tambahan"),
    { type: "table", label: "➕ Tambahan • Tabel Interaktif", title: "Berpindah Antar Elemen", headers: ["Properti / method", "Hasil", "Jika tidak ada"],
      rows: [["el.parentElement", "elemen induk (satu tingkat ke atas)", "null"], ["el.children", "semua anak langsung (HTMLCollection)", "koleksi kosong"], ["el.firstElementChild / lastElementChild", "anak pertama / terakhir", "null"], ["el.nextElementSibling / previousElementSibling", "saudara sesudah / sebelum", "null"], ["el.closest(\"tr\")", "induk terdekat (atau dirinya sendiri) yang cocok selector", "null"]],
      modes: [{ label: "closest", target: "row", row: 4, title: "Paling praktis untuk tabel", text: "Dari tombol Hapus, <code>tombol.closest(\"tr\")</code> langsung memberi baris yang memuatnya, berapa pun lapisan tag di antaranya." },
        { label: "Element vs node", target: "none", title: "Kenapa ada kata Element", text: "<code>parentNode</code> dan <code>childNodes</code> ikut menghitung node teks (spasi dan baris baru). Properti berakhiran <code>Element</code> hanya menghitung tag, jadi lebih mudah dipakai." }] },
    A("Menempel di Posisi Tertentu", `<p>${c("appendChild")} selalu menempel di <strong>akhir</strong> anak. Untuk posisi lain: ${c("parent.prepend(el)")} di awal, ${c("parent.insertBefore(el, pembanding)")} tepat sebelum elemen pembanding, dan ${c("el.insertAdjacentHTML(\"beforeend\", html)")} untuk menyisipkan string HTML tanpa menghapus isi lama (posisi: ${c("beforebegin")}, ${c("afterbegin")}, ${c("beforeend")}, ${c("afterend")}). ${c("el.innerHTML += ...")} sebaiknya dihindari karena membangun ulang semua isi dan menghapus listener yang sudah terpasang di dalamnya.</p>`, "Bagian 3 • ➕ Tambahan"),
    A("Dari Array ke Tabel: Pola CRUD", `<p>➕ Aplikasi CRUD di proyek akhir menyimpan data di array, lalu menggambar tabel dari array itu. Polanya selalu sama: <strong>ubah array → panggil fungsi gambar ulang</strong> (sel dibuat dengan textContent agar aman). Listener untuk tombol Hapus dipasang sekali di ${c("<tbody>")} memakai ${c("e.target")} dan ${c("closest")} (disebut <em>event delegation</em>), sehingga baris yang dibuat belakangan tetap berfungsi tanpa memasang listener baru.</p>`, "Bagian 4 • ➕ Tambahan"),
    code("crud-tabel.html", `<form id="form">
  <input id="nim" placeholder="NIM">
  <input id="nama" placeholder="Nama">
  <button type="submit">Tambah</button>
</form>
<table border="1">
  <thead><tr><th>NIM</th><th>Nama</th><th>Aksi</th></tr></thead>
  <tbody id="isi"></tbody>
</table>

<script>
  let data = [{ nim: "2401", nama: "Ani" }];   // sumber kebenaran
  const isi = document.getElementById("isi");

  function gambar() {                           // READ: gambar ulang dari array
    isi.textContent = "";                       // kosongkan dulu
    data.forEach((m, i) => {
      const tr = document.createElement("tr");
      [m.nim, m.nama].forEach(teks => {
        const td = document.createElement("td");
        td.textContent = teks;                  // aman dari XSS
        tr.appendChild(td);
      });
      const aksi = document.createElement("td");
      const hapus = document.createElement("button");
      hapus.textContent = "Hapus";
      hapus.dataset.i = i;
      aksi.appendChild(hapus);
      tr.appendChild(aksi);
      isi.appendChild(tr);
    });
  }

  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nim = document.getElementById("nim").value.trim();
    const nama = document.getElementById("nama").value.trim();
    if (!nim || !nama) return;
    data.push({ nim, nama });                   // CREATE: ubah array
    e.target.reset();
    gambar();
  });

  isi.addEventListener("click", (e) => {        // DELETE: satu listener di tbody
    const tombol = e.target.closest("button");
    if (!tombol) return;
    data.splice(Number(tombol.dataset.i), 1);
    gambar();
  });

  gambar();
</script>`, "Sel dibuat dengan createElement + textContent, jadi input pengguna tampil apa adanya dan tidak dijalankan sebagai HTML. Nilai data-i dibaca lewat tombol.dataset.i dan selalu berupa string, sehingga diubah dengan Number().", "Tabel CRUD dari Array"),
    ex("Latihan Interaktif • ➕ Tambahan", "Menelusuri dan Menyisipkan: Pilih yang Tepat", ["Tujuan", "Kode"], [], [
      ["Dari tombol Hapus, ambil baris tabelnya", "tombol.closest(\"tr\")", "✓ closest naik ke induk terdekat yang cocok.", ["tombol.children", "tombol.closest(\"tr\")"]],
      ["Menempel item baru di urutan paling atas daftar", "daftar.prepend(li)", "✓ appendChild menempel di akhir.", ["daftar.appendChild(li)", "daftar.prepend(li)"]],
      ["Menambah satu baris HTML tanpa menghapus isi lama", "isi.insertAdjacentHTML(\"beforeend\", html)", "✓ innerHTML = html akan menimpa semuanya.", ["isi.innerHTML = html", "isi.insertAdjacentHTML(\"beforeend\", html)"]],
      ["Satu listener untuk semua tombol Hapus, termasuk baris baru", "listener di tbody + e.target.closest(\"button\")", "✓ Event delegation: listener di induk.", ["listener di tiap tombol, dipasang sekali saat halaman dimuat", "listener di tbody + e.target.closest(\"button\")"]],
      ["Data baru harus muncul di tabel", "ubah array dulu, lalu gambar ulang", "✓ Array adalah sumber data; tabel hanya tampilannya.", ["ubah tabel saja", "ubah array dulu, lalu gambar ulang"]]
    ]),
    A("Timer: setTimeout dan setInterval", `<p>➕ ${c("setTimeout(fungsi, ms)")} menjalankan fungsi <strong>sekali</strong> setelah jeda (dalam milidetik; 1000 = 1 detik). ${c("setInterval(fungsi, ms)")} menjalankannya <strong>berulang</strong> setiap jeda itu. Keduanya mengembalikan nomor timer yang dipakai untuk membatalkan: ${c("clearTimeout(id)")} dan ${c("clearInterval(id)")}. Contoh pemakaian: pesan "Tersimpan" yang hilang sendiri setelah 2 detik, atau jam digital. Fungsi diberikan <em>tanpa kurung</em>, sama seperti pada ${c("addEventListener")}.</p>`, "Bagian 5 • ➕ Tambahan"),
    code("timer.html", `<p id="pesan"></p>
<p id="jam"></p>
<button id="stop">Hentikan jam</button>

<script>
  const pesan = document.getElementById("pesan");
  pesan.textContent = "Tersimpan!";
  setTimeout(() => { pesan.textContent = ""; }, 2000);   // hilang setelah 2 detik

  const jam = document.getElementById("jam");
  const id = setInterval(() => {                           // berulang tiap 1 detik
    jam.textContent = new Date().toLocaleTimeString("id-ID");
  }, 1000);

  document.getElementById("stop").addEventListener("click", () => clearInterval(id));
</script>`, "Nomor timer disimpan di variabel (id) supaya bisa dibatalkan dengan clearInterval.", "setTimeout dan setInterval"),
    A("localStorage: Menyimpan Data di Browser", `<p>➕ Data di array hilang begitu halaman di-refresh. ${c("localStorage")} menyimpan pasangan kunci dan nilai di browser dan tetap ada setelah ditutup. Nilainya hanya boleh <strong>string</strong>, jadi array atau object diubah dulu dengan ${c("JSON.stringify()")} saat menyimpan dan dikembalikan dengan ${c("JSON.parse()")} saat membaca.</p>
<ul><li>${c('localStorage.setItem("kunci", teks)')}: simpan.</li>
<li>${c('localStorage.getItem("kunci")')}: baca, hasilnya ${c("null")} jika belum ada.</li>
<li>${c('localStorage.removeItem("kunci")')}: hapus satu kunci.</li></ul>
<p>Batasnya sekitar 5 MB per situs dan isinya bisa dilihat siapa pun lewat F12 → Application, jadi jangan menyimpan kata sandi. Ini bukan pengganti database: data hanya ada di browser pengguna itu sendiri.</p>`, "Bagian 5 • ➕ Tambahan"),
    code("simpan-lokal.js", `// Memuat data; jika belum ada, pakai array kosong
let data = JSON.parse(localStorage.getItem("mahasiswa")) || [];

function simpan() {
  localStorage.setItem("mahasiswa", JSON.stringify(data));
}

// Setiap kali array berubah, simpan lalu gambar ulang tabel:
data.push({ nim: "2401", nama: "Ani" });
simpan();
// gambar();   // fungsi gambar dari contoh tabel CRUD`, "Tambahkan JSON.parse(...) || [] di awal dan simpan() setiap data berubah, maka tabel CRUD bertahan setelah refresh.", "Menyimpan Tabel CRUD ke localStorage"),
    ex("Latihan Interaktif • ➕ Tambahan", "Timer dan localStorage: Pilih yang Tepat", ["Tujuan", "Kode"], [], [
      ["Menghapus pesan setelah 2 detik, sekali saja", "setTimeout(fn, 2000)", "✓ setTimeout berjalan sekali; setInterval berulang.", ["setInterval(fn, 2000)", "setTimeout(fn, 2000)"]],
      ["Menjalankan jam setiap detik", "setInterval(fn, 1000)", "✓", ["setTimeout(fn, 1000)", "setInterval(fn, 1000)"]],
      ["Menyimpan array ke localStorage", "setItem(\"k\", JSON.stringify(arr))", "✓ localStorage hanya menyimpan string.", ["setItem(\"k\", arr)", "setItem(\"k\", JSON.stringify(arr))"]],
      ["Membaca kembali array yang disimpan", "JSON.parse(getItem(\"k\"))", "✓", ["getItem(\"k\") langsung dipakai sebagai array", "JSON.parse(getItem(\"k\"))"]],
      ["Menyimpan kata sandi pengguna", "jangan, isinya bisa dilihat lewat F12", "✓", ["boleh, karena tersimpan di browser", "jangan, isinya bisa dilihat lewat F12"]]
    ]),
    ex("Latihan Interaktif", "Kode Mana yang Benar?", ["Tujuan", "Kode"], [], [
      ["Memilih elemen id=\"nim\"", "getElementById(\"nim\")", "✓ Tanpa #.", ["getElementById(\"#nim\")", "getElementById(\"nim\")"]],
      ["Memilih semua li", "querySelectorAll(\"li\")", "✓", ["querySelector(\"li\")", "querySelectorAll(\"li\")"]],
      ["Menampilkan input pengguna dengan aman", "el.textContent = input", "✓ Hindari XSS.", ["el.innerHTML = input", "el.textContent = input"]],
      ["Mengubah warna latar", "el.style.backgroundColor", "✓ camelCase.", ["el.style.background-color", "el.style.backgroundColor"]],
      ["Menempel elemen baru ke daftar", "daftar.appendChild(li)", "✓", ["li.appendChild(daftar)", "daftar.appendChild(li)"]],
      ["Mode gelap bolak-balik", "body.classList.toggle(\"dark\")", "✓", ["body.classList.add(\"dark\")", "body.classList.toggle(\"dark\")"]]
    ])
  ],

  p8: [
    tip("Halaman ini untuk mengulang sebelum UTS", "UTS hanya bisa dikerjakan satu kali dan bisa berupa proyek. Gunakan peta dan tabel di bawah untuk mengecek materi yang belum kuat.", "info"),
    petaUts,
    { type: "table", label: "Tabel Interaktif", title: "Sintaks yang Harus Hafal di Luar Kepala", headers: ["Topik", "`Sintaks`"],
      rows: [["Kerangka HTML", "`<!DOCTYPE html> <html> <head> <body>`"], ["Link CSS", "`<link rel=\"stylesheet\" href=\"style.css\">`"], ["Form", "`<form action=\"…\" method=\"post\">`"], ["Label", "`<label for=\"x\"> + <input id=\"x\" name=\"x\">`"], ["Tengah horizontal", "`margin: 0 auto;`"], ["Flex tengah", "`display:flex; justify-content:center; align-items:center;`"], ["Grid 3 kolom", "`display:grid; grid-template-columns: repeat(3, 1fr);`"], ["Media query HP", "`@media (max-width: 600px) { … }`"], ["Event", "`el.addEventListener(\"click\", fn)`"], ["Elemen baru", "`document.createElement(\"li\") + appendChild`"]],
      modes: [{ label: "Paling sering salah", target: "row", row: 3, title: "for = id, name untuk server", text: "for di label harus sama dengan id input; name dipakai untuk mengirim data." }] },
    rv("Cek Debug Cepat", "Kenapa Tidak Jalan?", [
      { prompt: "CSS tidak berpengaruh sama sekali", answer: "Path href salah / file belum disimpan", reason: "Cek nama folder dan file persis sama; buka F12 → Network untuk melihat 404." },
      { prompt: "Media query tidak aktif di HP", answer: "Lupa meta viewport", reason: "Tambahkan meta viewport di head." },
      { prompt: "Error: Cannot read properties of null", answer: "Elemen tidak ditemukan", reason: "Id salah ketik, ada #, atau script dijalankan sebelum elemen ada." },
      { prompt: "Hasil penjumlahan dari prompt jadi \"23\"", answer: "prompt menghasilkan string", reason: "Ubah dengan Number() sebelum dijumlah." },
      { prompt: "Data form tidak sampai ke server", answer: "Input tanpa atribut name", reason: "Atau input berstatus disabled." }
    ])
  ]
};
module.exports = M;
