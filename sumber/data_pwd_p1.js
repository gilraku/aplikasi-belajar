// Pemrograman Web Dinamis — Pertemuan 1: Konsep Dasar Web & Pengenalan HTML
// Sumber: Konsep Dasar Web (PPTX), Pendahuluan HTML (PDF), Modul 1 (DOCX).
// Bagian bertanda "➕ Tambahan" bukan dari modul, ditambahkan karena penting.
const CS = [{ value: "client", label: "Client side" }, { value: "server", label: "Server side" }];
const DOM = [{ value: "cctld", label: "ccTLD (kode negara)" }, { value: "gtld", label: "gTLD (generik)" }, { value: "sld", label: "Second Level Domain" }, { value: "sub", label: "Third Level (subdomain)" }];
const HOST = ["Shared hosting", "VPS", "Dedicated server", "Colocation server"];
const WEBV = ["Web 1.0", "Web 2.0", "Web 3.0"];
const SD = [{ value: "statis", label: "Web statis" }, { value: "dinamis", label: "Web dinamis" }];

const STARTER_PRAKTIK = `<!DOCTYPE html>
<html lang="id">
<head>
    <title>Halaman Sederhana</title>
</head>
<body>
    <h1>Selamat Datang di Pemrograman Web</h1>
    <h2>Pertemuan 1</h2>
    <p>Ini adalah paragraf pertama saya dalam HTML.</p>
    <p>Ini paragraf kedua. <strong>Teks ini tebal</strong> dan <em>ini miring</em>.</p>
    <a href="https://www.google.com">Kunjungi Google</a>
</body>
</html>`;

const SOLUSI_PRAKTIK = `<!DOCTYPE html>
<html lang="id">
<head>
    <title>Halaman Sederhana</title>
</head>
<body>
    <h1>Selamat Datang di Pemrograman Web</h1>
    <h2>Pertemuan 1</h2>
    <p>Ini adalah paragraf pertama saya dalam HTML.</p>
    <p>Ini paragraf kedua. <strong>Teks ini tebal</strong> dan <em>ini miring</em>.</p>
    <a href="https://www.google.com">Kunjungi Google</a>

    <h3>Tentang Saya</h3>
    <p>Saya mahasiswa PJJ Sistem Informasi Universitas Siber Muhammadiyah.</p>
    <p>Saya ingin bisa membuat aplikasi web dinamis.</p>
    <p>Kunjungi <a href="https://sibermu.ac.id">situs kampus saya</a>.</p>
</body>
</html>`;

const STARTER_TUGAS = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Profil Pribadi</title>
</head>
<body>
    <!-- Tulis profilmu di sini -->

</body>
</html>`;

const SOLUSI_TUGAS = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil Pribadi</title>
</head>
<body>
    <h1>Nama Saya: Ahmad Fauzi</h1>
    <h2>Tentang Saya</h2>
    <p>Saya adalah mahasiswa Sistem Informasi. Saya lahir di Jakarta dan menyukai teknologi.</p>
    <p>Hobi saya adalah coding, bermain game, dan membaca buku tentang teknologi.</p>
    <p>Saya mengikuti mata kuliah ini untuk belajar membuat aplikasi web seperti sistem manajemen mahasiswa.</p>
    <h3>Keahlian Saya</h3>
    <ul>
        <li>Dasar HTML</li>
        <li>Microsoft Office</li>
        <li>Team player</li>
    </ul>
    <p>Hubungi saya di <a href="https://www.linkedin.com">LinkedIn</a>.</p>
</body>
</html>`;

// Isi <code>…</code> di-escape otomatis agar contoh tag HTML tampil sebagai teks, bukan dirender.
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

module.exports = fix({
  id: "p1",
  nomor: 1,
  judul: "Konsep Dasar Web & Pengenalan HTML",
  ujian: "UTS",
  hero: {
    badge: "Materi 1 • Pemrograman Web Dinamis",
    title: "Dari Ketik URL sampai Halaman Muncul, lalu Bikin Halaman HTML Pertamamu!",
    text: "Pahami <strong>internet, web, HTTP, URL/URI</strong>, <strong>web statis vs dinamis</strong>, <strong>client side vs server side</strong>, <strong>domain, DNS & hosting</strong>, lalu praktik <strong>HTML dasar</strong> langsung di editor live. Kotak bertanda <strong>➕ Tambahan</strong> adalah materi penting di luar modul."
  },
  cheatsheet: [
    {
      type: "cards",
      label: "Interaktif 1 • Istilah Dasar",
      title: "Internet ≠ Web! Kenali 5 Istilah Kuncinya",
      cols: 3,
      items: [
        { badge: "Internet", tone: "indigo", title: "Jaringan komputer global", text: "Seluruh jaringan komputer yang saling terhubung memakai standar <strong>TCP/IP</strong> untuk melayani miliaran pengguna. Aplikasinya bukan hanya web: <strong>email, FTP, instant messenger</strong>, dll." },
        { badge: "Web", tone: "sky", title: "Salah satu aplikasi di internet", text: "Berisi dokumen multimedia (teks, gambar, animasi, video), memakai protokol <strong>HTTP</strong>, dan diakses dengan <strong>browser</strong>." },
        { badge: "WWW", tone: "violet", title: "World Wide Web", text: "Halaman-halaman web yang saling terkoneksi lewat <strong>hyperlink</strong>; bagian internet yang paling cepat berkembang dan paling populer." },
        { badge: "Situs web", tone: "emerald", title: "Kumpulan halaman web", text: "Halaman web yang sudah <strong>dipublikasikan</strong> dan memiliki <strong>domain/URL</strong> sehingga bisa diakses semua pengguna internet." },
        { badge: "HTTP", tone: "amber", title: "HyperText Transfer Protocol", text: "Protokol untuk mentransfer dokumen di WWW (request ↔ response). <strong>HTTPS</strong> = versi aman dengan enkripsi." },
        { badge: "3 mekanisme WWW", tone: "rose", title: "Protokol + Alamat + HTML", text: "WWW bekerja dengan: <strong>protokol standar (HTTP)</strong>, <strong>alamat (URL)</strong>, dan <strong>HTML</strong> untuk membuat dokumennya." }
      ]
    },
    {
      type: "flow",
      label: "Interaktif 2 • Cara Kerja Web",
      title: "Apa yang Terjadi Saat Kamu Mengetik URL?",
      desc: "Alur dari slide (gambar cara kerja web) + modul. Tahap yang disorot adalah inti komunikasi client–server.",
      items: ["1. User ketik URL", "2. Web browser", "3. HTTP REQUEST (lewat TCP/IP)", "4. Web server cari web files", "5. HTTP RESPONSE", "Browser render → DISPLAY"],
      highlight: 2,
      note: "➕ <strong>Tambahan:</strong> sebelum langkah 3, browser bertanya dulu ke <strong>DNS</strong> untuk mengubah nama domain (mis. <code>sibermu.ac.id</code>) menjadi <strong>alamat IP</strong> server. Server populer: <strong>Apache</strong> dan <strong>Nginx</strong>."
    },
    {
      type: "terminal",
      label: "Interaktif 3 • ➕ Tambahan: Simulasi HTTP",
      title: "Request & Response: Kode Status yang Wajib Dikenal",
      desc: "Klik skenario untuk melihat percakapan browser ↔ server. Kode status sering muncul saat nanti membuat web dinamis (PHP).",
      shell: "browser →",
      header: "HTTP Request / Response",
      scenarios: [
        { label: "Halaman ditemukan", code: "200", ok: true, pill: "200 OK", cmd: "GET /index.html HTTP/1.1\nHost: sibermu.ac.id", res: "HTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\n\n<!DOCTYPE html> ...", exp: "<strong>2xx = sukses.</strong> Server menemukan file dan mengirim isinya; browser lalu me-render HTML menjadi tampilan." },
        { label: "Salah ketik alamat", code: "404", ok: false, pill: "404 Not Found", cmd: "GET /profil.htm HTTP/1.1\nHost: sibermu.ac.id", res: "HTTP/1.1 404 Not Found", exp: "<strong>4xx = kesalahan dari sisi client.</strong> File <code>profil.htm</code> tidak ada (mungkin maksudnya <code>profil.html</code>)." },
        { label: "Halaman dipindah", code: "301", ok: true, pill: "301 Moved", cmd: "GET / HTTP/1.1\nHost: sibermu.ac.id", res: "HTTP/1.1 301 Moved Permanently\nLocation: https://sibermu.ac.id/", exp: "<strong>3xx = pengalihan (redirect).</strong> Contoh umum: dari <code>http://</code> dialihkan ke <code>https://</code> yang aman." },
        { label: "Program server error", code: "500", ok: false, pill: "500 Server Error", cmd: "POST /simpan.php HTTP/1.1\nHost: sibermu.ac.id", res: "HTTP/1.1 500 Internal Server Error", exp: "<strong>5xx = kesalahan di sisi server</strong>, misalnya kode PHP error. Ini hanya terjadi pada web <strong>dinamis</strong> yang menjalankan program di server." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Bedah URL",
      title: "Anatomi Sebuah Alamat Web",
      desc: "Klik tombol untuk menyorot bagian URL <code>https://dosen.sibermu.ac.id/page/jadwal?kelas=SI#uts</code>",
      headers: ["Scheme", "Subdomain", "Nama domain (SLD)", "TLD", "Path", "Query", "Fragment"],
      rows: [["https://", "dosen.", "sibermu", ".ac.id", "/page/jadwal", "?kelas=SI", "#uts"]],
      mono: true,
      modes: [
        { label: "Scheme / protokol", target: "col", col: 0, title: "Scheme", text: "Menandakan protokol: <code>http</code>, <code>https</code>, <code>ftp</code>, <code>mailto</code>, <code>file</code>, <code>telnet</code>, <code>news</code>." },
        { label: "Domain bertingkat", target: "row", row: 0, title: "dosen . sibermu . ac.id", text: "<strong>Third level (subdomain)</strong> = <code>dosen</code>, <strong>Second Level Domain</strong> = <code>sibermu</code>, <strong>TLD</strong> = <code>.ac.id</code> (sesuai contoh di slide)." },
        { label: "Path", target: "col", col: 4, title: "Path", text: "Lokasi halaman/file di dalam server." },
        { label: "➕ Query", target: "col", col: 5, title: "Query string (tambahan)", text: "Data yang dikirim ke server setelah tanda <code>?</code>. Inilah yang nanti dibaca program <strong>PHP</strong> untuk menampilkan konten berbeda (ciri web dinamis)." },
        { label: "Fragment", target: "col", col: 6, title: "Fragment", text: "Bagian setelah <code>#</code>, menunjuk ke bagian tertentu di dalam halaman. Menurut slide, URI menyertakan <em>code fragment</em>, URL tidak." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 5 • URL vs URI",
      title: "Saklar: <strong>URL</strong> vs <strong>URI</strong>",
      style: "toggle",
      options: [
        { label: "URL", tone: "indigo", badge: "Uniform Resource Locator", title: "Menunjukkan ALAMAT (lokasi) sumber",
          text: "<ul><li>Rangkaian karakter berformat standar untuk menunjukkan alamat sumber (dokumen, gambar) di internet</li><li>Dipakai browser untuk mengidentifikasi sumber daya, ditulis dalam satu baris</li><li><strong>URL merupakan bagian dari URI</strong></li><li>Menggunakan “scheme” <strong>tanpa</strong> code fragment (menurut slide)</li></ul>",
          note: "Contoh slide: <code>http://www.amikompurwokerto.ac.id/page/id/menu/visi_misi</code>" },
        { label: "URI", tone: "violet", badge: "Uniform Resource Identifier", title: "Mengidentifikasi NAMA, LOKASI, atau keduanya",
          text: "<ul><li>Untaian karakter untuk mengidentifikasi nama, sumber, atau layanan di internet</li><li>Mengidentifikasi dokumen tunggal</li><li>Bisa berdasarkan lokasi, nama, atau keduanya</li><li>Termasuk lokasi <strong>code fragment</strong> (bila ada) dan “scheme”</li></ul>",
          note: "Contoh slide: <code>ftp://ftp.is.co.za/rfc/rfc1808.txt</code>" }
      ],
      footer: "🎯 Kunci ujian: <strong>semua URL adalah URI, tetapi tidak semua URI adalah URL</strong>. ➕ Catatan: dalam standar modern, URL juga boleh memuat <code>#fragment</code>; untuk UTS ikuti definisi slide di atas."
    },
    {
      type: "choices",
      label: "Interaktif 6 • Web Statis vs Dinamis",
      title: "Saklar: Web <strong>Statis</strong> vs Web <strong>Dinamis</strong>",
      style: "toggle",
      options: [
        { label: "Web Statis", tone: "sky", badge: "Konten tetap", title: "Pengguna tidak bisa mengubah konten lewat browser",
          text: "Interaksi client–server <strong>hanya seputar pemrosesan link</strong>. Server tinggal mengirim file HTML apa adanya; semua pengunjung melihat isi yang sama.",
          note: "➕ Contoh: halaman profil pribadi <code>profil.html</code> (tugas pertemuan ini), landing page sederhana." },
        { label: "Web Dinamis", tone: "rose", badge: "Konten berubah", title: "Interaksi client–server kompleks",
          text: "Client dapat <strong>mengubah konten</strong> halaman lewat browser. Request diproses server, lalu ditampilkan <strong>berbeda-beda sesuai alur programnya</strong>.",
          note: "➕ Contoh: login, keranjang belanja, aplikasi <strong>CRUD data mahasiswa</strong> (proyek akhir mata kuliah ini) dengan PHP + database." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 7 • Jenis Pemrograman Web",
      title: "Client Side Scripting vs Server Side Scripting",
      style: "toggle",
      options: [
        { label: "Client Side", tone: "emerald", badge: "Diolah di browser", title: "Proses pengolahan dilakukan web browser (client)",
          text: "Contoh menurut slide: <strong>HTML, XHTML, CSS, JavaScript, XML</strong>.<br><br>➕ Catatan: HTML, CSS, dan XML sebenarnya <strong>bahasa markup/gaya</strong>, bukan bahasa pemrograman. Yang benar-benar <em>scripting</em> di sisi client adalah <strong>JavaScript</strong>.",
          note: "Kodenya bisa dilihat siapa pun lewat <em>View Page Source</em>." },
        { label: "Server Side", tone: "rose", badge: "Diolah di web server", title: "Diolah oleh web server yang punya web engine",
          text: "Contoh: <strong>ASP</strong> (Active Server Pages), <strong>PHP</strong> (Hypertext Preprocessor), <strong>JSP</strong> (Java Server Pages).<br><br><strong>Karakteristik:</strong><ol><li>Ada client yang meminta request</li><li>Eksekusi program dilakukan di server</li><li>Hasil dikirim ke client</li></ol><strong>Keuntungan:</strong> cross platform (tidak tergantung browser), optimasi & pemeliharaan terpusat, dapat mengakses database, menambah kekuatan server, kode program aman (tidak terlihat client).<br><strong>Aplikasi:</strong> search engine, akses database, chat & bulletin board.",
          note: "⚠️ Slide menulis “optimasi dan pemeliharaan dilakukan di browser”; yang tepat <strong>di server</strong>, karena programnya berjalan di server." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "list",
          label: "Interaktif 8 • Komponen Penyusun Web",
          title: "4 Komponen Penyusun Web",
          groups: [{ tone: "indigo", ordered: true, items: [
            "<strong>Bahasa pemrograman</strong>: client side & server side scripting",
            "<strong>Web editor</strong>: editor teks (Notepad), WYSIWYG (Dreamweaver), berbasis template (Rapidweaver, iWeb). ➕ Kini paling populer: <strong>VS Code</strong>",
            "<strong>Web browser</strong>: menampilkan dokumen HTML (Chrome, Firefox, Edge, Opera, Safari)",
            "<strong>Image editor</strong>: mengolah gambar (Photoshop, CorelDraw, ➕ Canva, GIMP)"
          ] }]
        },
        {
          type: "cards",
          label: "Interaktif 9 • Perkembangan Web",
          title: "Web 1.0 → 2.0 → 3.0",
          cols: 1,
          items: [
            { badge: "Web 1.0", tone: "sky", title: "Generasi pertama (➕ read-only)", text: "Mengubah cara kerja industri & media. Contoh: <strong>cnn.com</strong>, <strong>Bhinneka.com</strong>." },
            { badge: "Web 2.0", tone: "emerald", title: "O’Reilly Media, 2004 (➕ read-write)", text: "Mengedepankan <strong>kolaborasi & berbagi informasi</strong>. Contoh: <strong>facebook.com</strong>." },
            { badge: "Web 3.0", tone: "violet", title: "Web cerdas / AI", text: "Engine kecerdasan buatan yang memudahkan interaksi. Contoh: <strong>web semantik</strong> (SIOC) dan <strong>cloud computing</strong>." }
          ]
        }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 10 • Kategori Website",
      title: "Kategori Website & Domain yang Biasa Dipakai",
      tabs: [
        { label: "Berdasarkan pemilik", blocks: [
          { type: "cards", cols: 2, items: [
            { badge: "Personal", title: "Biografi & pengalaman pribadi", text: "Contoh: blog pribadi." },
            { badge: "Komersial", title: "Company profile / online shop", text: "Produk, jasa, transaksi (shopping cart). Domain: <code>.com</code>, <code>.co.id</code>." },
            { badge: "Instansi/Pemerintah", title: "Hanya untuk pemerintahan resmi", text: "Domain Indonesia: <code>.go.id</code>." },
            { badge: "Non-profit", title: "Yayasan, sekolah, dll.", text: "Domain: <code>.org</code>, <code>.edu</code>, dll. ➕ Kampus Indonesia: <code>.ac.id</code>." }
          ] }
        ] },
        { label: "Berdasarkan fungsi", blocks: [
          { type: "table", headers: ["Kategori", "Contoh"], rows: [
            ["Search engine", "Google, Bing"], ["Social media", "Facebook, Twitter/X, Instagram"], ["Short URL", "Bit.ly, Adf.ly"], ["Social bookmark", "Feedburner"], ["Web directory", "Dmoz.org, AboutUs.org"], ["Portal berita", "Detik, Kompas, CNN"], ["Online store", "Amazon, Bhinneka"], ["Forum", "Kaskus, Ads-id"]
          ] }
        ] }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 11 • Domain & DNS",
      title: "Domain, DNS, dan Level Domain",
      tabs: [
        { label: "Domain & DNS", blocks: [
          { type: "cards", cols: 2, items: [
            { badge: "Domain", tone: "indigo", title: "Nama unik untuk mengidentifikasi server", text: "Misalnya web server atau email server. Contoh: <code>sibermu.ac.id</code>. Kadang disebut juga URL atau alamat website." },
            { badge: "DNS", tone: "emerald", title: "Domain Name System", text: "Sistem yang menyimpan informasi nama host/domain dalam bentuk <strong>basis data tersebar (distributed database)</strong>. ➕ Tugas utamanya: menerjemahkan nama domain → <strong>alamat IP</strong>, seperti buku telepon internet." }
          ] },
          { type: "callout", tone: "tip", html: "Aturan penamaan domain tingkat atas (TLD) diatur oleh <strong>IANA</strong> (Internet Assigned Numbers Authority). ➕ Domain <code>.id</code> di Indonesia dikelola <strong>PANDI</strong>." }
        ] },
        { label: "Level domain", blocks: [
          { type: "flow", items: ["dosen", ".", "sibermu", ".", "ac.id"], arrow: " ", highlight: 2, note: "<code>dosen</code> = <strong>Third Level Domain (subdomain)</strong> • <code>sibermu</code> = <strong>Second Level Domain (SLD)</strong> • <code>.ac.id</code> = <strong>Top Level Domain (TLD)</strong>" }
        ] },
        { label: "ccTLD vs gTLD", blocks: [
          { type: "list", groups: [
            { title: "ccTLD (kode negara)", tone: "sky", items: ["<code>.id</code> Indonesia", "<code>.my</code> Malaysia", "<code>.sg</code> Singapura", "<code>.uk</code> Inggris", "<code>.us</code> Amerika Serikat", "<code>.jp</code> Jepang"] },
            { title: "gTLD (generik/organisasi)", tone: "violet", items: ["<code>.com</code> komersial", "<code>.net</code> jaringan", "<code>.gov</code> pemerintah AS (eksklusif)", "<code>.mil</code> militer AS (eksklusif)", "<code>.info</code> informasi", "<code>.aero</code> industri penerbangan"] }
          ] }
        ] }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 12 • Hosting",
      title: "4 Jenis Hosting (➕ dengan analogi tempat tinggal)",
      desc: "<strong>Hosting</strong> = jasa yang menyewakan sumber daya server agar informasi (HTTP, FTP, email, DNS) bisa ditempatkan di internet.",
      cols: 4,
      items: [
        { badge: "Shared", tone: "emerald", title: "1 server untuk banyak domain", text: "Paling murah. ➕ Analogi: <strong>kos-kosan</strong>, berbagi fasilitas." },
        { badge: "VPS", tone: "sky", title: "Virtual Private Server", text: "Mesin virtual untuk klien; 1 server fisik menjalankan beberapa VPS. ➕ Analogi: <strong>apartemen</strong>." },
        { badge: "Dedicated", tone: "violet", title: "1 server utuh, tidak dibagi", text: "Bisa dibagi lagi menjadi beberapa VPS kecil. ➕ Analogi: <strong>rumah sendiri</strong>." },
        { badge: "Colocation", tone: "amber", title: "Sewa tempat untuk server milik sendiri", text: "Cocok untuk membuka usaha web hosting sendiri. ➕ Analogi: <strong>sewa lahan, rumahnya bawa sendiri</strong>." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 13 • Pengenalan HTML",
      title: "HTML = HyperText Markup Language",
      desc: "Bahasa standar untuk membuat <strong>struktur</strong> halaman web. HTML <strong>bukan bahasa pemrograman</strong>, melainkan <strong>bahasa markup</strong>.",
      cols: 4,
      items: [
        { badge: "Fungsi 1", title: "Mengontrol tampilan & konten halaman" },
        { badge: "Fungsi 2", title: "Mempublikasikan dokumen online" },
        { badge: "Fungsi 3", title: "Membuat form online", text: "Pendaftaran, transaksi." },
        { badge: "Fungsi 4", title: "Menyisipkan objek", text: "Gambar, audio, video (dulu juga Java applet)." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 14 • Tag, Elemen, Atribut",
      title: "Bedah Satu Baris HTML",
      desc: "Bentuk umum: <code><ELEMENT ATRIBUT=\"nilai\">konten</ELEMENT></code>. Klik tombol untuk menyorot:",
      headers: ["Tag pembuka", "Atribut", "Nilai", "Konten", "Tag penutup"],
      rows: [["`<a`", "`href`", "`=\"https://sibermu.ac.id\">`", "Kampusku", "`</a>`"]],
      modes: [
        { label: "Tag", target: "cell", row: 0, col: 0, title: "Tag", text: "Penanda yang mendefinisikan elemen, ditulis di antara <code><</code> dan <code>></code>. Biasanya berpasangan (pembuka & penutup <code>/</code>), kecuali tag tertentu seperti <code><br></code>." },
        { label: "Atribut + nilai", target: "row", row: 0, title: "Atribut", text: "Informasi tambahan di dalam tag pembuka: <code>nama=\"nilai\"</code>. Contoh atribut: <code>id</code>, <code>class</code>, <code>href</code>, <code>src</code>, <code>alt</code>, <code>lang</code>." },
        { label: "Elemen", target: "row", row: 0, title: "Elemen = tag pembuka + konten + tag penutup", text: "Seluruh baris <code><a href=\"...\">Kampusku</a></code> adalah satu <strong>elemen</strong> link." },
        { label: "Konten", target: "col", col: 3, title: "Konten", text: "Teks/isi yang tampil di browser, di sini teks link yang bisa diklik." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "code",
          label: "Interaktif 15 • Struktur Dasar",
          title: "Kerangka Wajib Dokumen HTML5",
          file: "index.html",
          code: "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Judul Halaman</title>\n</head>\n<body>\n    <h1>Heading Utama</h1>\n    <p>Ini adalah paragraf.</p>\n</body>\n</html>",
          note: "Dua baris <code>meta</code> adalah ➕ tambahan yang sebaiknya selalu ada: <code>charset</code> agar huruf khusus tampil benar, <code>viewport</code> agar rapi di HP."
        },
        {
          type: "list",
          title: "Fungsi Tiap Bagian",
          groups: [{ tone: "emerald", items: [
            "`<!DOCTYPE html>` menyatakan dokumen HTML5",
            "`<html>` elemen akar (root) dokumen",
            "`<head>` kepala: metadata & judul (`<title>`), tidak tampil di halaman",
            "`<body>` tubuh: semua konten yang tampil (teks, tabel, gambar, audio, video)",
            "Dokumen dibagi 3 bagian utama: <strong>html, head, body</strong>"
          ] }]
        }
      ]
    },
    {
      type: "table",
      label: "Interaktif 16 • Tag Umum",
      title: "Tag yang Dipakai di Pertemuan Ini",
      headers: ["Kelompok", "Tag", "Fungsi"],
      rows: [
        ["Heading", "`<h1>` … `<h6>`", "Judul berhierarki (h1 paling besar/penting)"],
        ["Paragraf", "`<p>`", "Teks paragraf"],
        ["Format teks", "`<strong>` `<em>` `<br>`", "Tebal, miring, ganti baris"],
        ["Daftar", "`<ul>` `<ol>` `<li>`", "Daftar berbutir, bernomor, item daftar"],
        ["Link", "`<a href=\"URL\">`", "Tautan ke halaman lain"],
        ["➕ Gambar", "`<img src=\"…\" alt=\"…\">`", "Menampilkan gambar; alt = teks pengganti"],
        ["➕ Komentar", "`<!-- … -->`", "Catatan di kode, tidak tampil di browser"]
      ],
      modes: [
        { label: "Tag tanpa penutup", target: "cell", row: 2, col: 1, title: "➕ Void element", text: "<code><br></code>, <code><img></code>, <code><meta></code>, <code><hr></code>, <code><input></code> tidak punya tag penutup. Jangan menulis <code></br></code>." },
        { label: "Siap ke pertemuan berikutnya", target: "none", title: "Persiapan (dari modul)", text: "Pelajari <code><form></code>, <code><input></code>, dan <code><table></code> untuk membuat form dan tabel data mahasiswa." }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Aturan Penulisan yang Sering Keliru",
      tone: "warn",
      heading: "5 Kebiasaan Baik Menulis HTML",
      html: "<ol><li><strong>Tidak case sensitive</strong> (<code><BODY></code> = <code><body></code>), tetapi standar modern memakai <strong>huruf kecil</strong>.</li><li><strong>Tutup tag sesuai urutan</strong> (bersarang): <code><strong><em>teks</em></strong></code>, bukan <code><strong><em>teks</strong></em></code>.</li><li><strong>Nilai atribut pakai tanda kutip</strong>: <code>href=\"https://...\"</code>.</li><li>Atribut tampilan lama seperti <code><BODY BGCOLOR=lavender></code> (contoh di PDF) sudah <strong>usang di HTML5</strong>; tampilan kini diatur dengan <strong>CSS</strong>, mis. <code><body style=\"background: lavender\"></code>.</li><li>Link ke situs luar wajib diawali <code>https://</code>; tanpa itu browser menganggapnya file lokal.</li></ol>"
    }
  ],
  simulator: [
    {
      type: "playground",
      label: "Praktik 1 • Aktivitas Modul",
      title: "Editor HTML Live: Modifikasi Halaman Sederhana",
      desc: "Kode dari modul sudah dimuat. Ketik di editor kiri, hasilnya langsung tampil di kanan. Selesaikan misi modifikasi dari modul, lalu klik <strong>Periksa Kode</strong>.",
      file: "index.html",
      starter: STARTER_PRAKTIK,
      solution: SOLUSI_PRAKTIK,
      tasks: [
        { label: "Tambahkan heading `<h3>` berisi “Tentang Saya”", sel: "h3", regex: "<h3[^>]*>\\s*Tentang Saya\\s*</h3>" },
        { label: "Tambahkan 2 paragraf tentang dirimu (total minimal 4 `<p>`)", sel: "p", min: 4, hasText: true },
        { label: "Tambahkan link ke situs lain (total minimal 2 `<a href>`)", sel: "a[href]", min: 2 },
        { label: "Tetap memakai `<!DOCTYPE html>` di baris pertama", regex: "^\\s*<!DOCTYPE html>" }
      ]
    },
    {
      type: "playground",
      label: "Praktik 2 • Tugas Individu",
      title: "Latihan Tugas: profil.html",
      desc: "Kerjakan spesifikasi tugas dari modul. Kalau semua misi ✅, salin kodenya ke file <code>profil.html</code> di laptopmu lalu kumpulkan.<br><strong>Penilaian dosen:</strong> struktur lengkap 20% • heading, paragraf, daftar, link 50% • kerapian 20% • tepat waktu 10%.",
      file: "profil.html",
      starter: STARTER_TUGAS,
      solution: SOLUSI_TUGAS,
      tasks: [
        { label: "Struktur lengkap: DOCTYPE, `<html>`, `<head>`, `<body>`", regex: "^\\s*<!DOCTYPE html>[\\s\\S]*<html[\\s\\S]*<head[\\s\\S]*</head>[\\s\\S]*<body[\\s\\S]*</body>[\\s\\S]*</html>" },
        { label: "`<title>` di dalam head", sel: "head > title", hasText: true },
        { label: "`<h1>` untuk namamu", sel: "h1", hasText: true },
        { label: "`<h2>` untuk subjudul (mis. Tentang Saya)", sel: "h2", hasText: true },
        { label: "Minimal 3 paragraf `<p>` (diri, hobi, tujuan)", sel: "p", min: 3, hasText: true },
        { label: "Daftar `<ul>`/`<ol>` dengan minimal 3 `<li>`", sel: "ul > li, ol > li", min: 3, hasText: true },
        { label: "Link ke situs eksternal `<a href=\"https://…\">`", sel: "a[href^='http']" }
      ]
    },
    {
      type: "detective",
      label: "Permainan 1 • Detektif Bug HTML",
      title: "Temukan & Perbaiki 7 Kesalahan Kode!",
      desc: "Setiap baris punya satu bagian yang salah (merah). Klik untuk memperbaikinya.",
      rules: ["Nama tag harus benar", "Tag berpasangan wajib ditutup", "Tutup sesuai urutan (nesting)", "Void element tanpa penutup", "Atribut & link yang benar"],
      headers: ["Baris", "Kode yang salah", "Bagian bermasalah"],
      rows: [
        ["1", "Judul tab", "`<titel>Profil</titel>`"],
        ["2", "Paragraf", "`<p>Saya mahasiswa SI`"],
        ["3", "Teks tebal-miring", "`<strong><em>Penting</strong></em>`"],
        ["4", "Ganti baris", "`Baris satu</br>`"],
        ["5", "Link ke Google", "`<a href=\"www.google.com\">Google</a>`"],
        ["6", "Item daftar", "`<li>HTML</li>` tanpa `<ul>`"],
        ["7", "Gambar profil", "`<img src=\"foto.jpg\">`"]
      ],
      bugs: [
        { row: 0, col: 2, fixed: "`<title>Profil</title>`", explain: "✅ Nama tag yang benar adalah <code>title</code>. Browser mengabaikan tag yang tidak dikenal, jadi judul tab tidak muncul." },
        { row: 1, col: 2, fixed: "`<p>Saya mahasiswa SI</p>`", explain: "✅ Tag berpasangan harus ditutup dengan <code></p></code> agar struktur jelas." },
        { row: 2, col: 2, fixed: "`<strong><em>Penting</em></strong>`", explain: "✅ <strong>Nesting:</strong> tag yang dibuka terakhir ditutup pertama." },
        { row: 3, col: 2, fixed: "`Baris satu<br>`", explain: "✅ <code><br></code> adalah <em>void element</em>, tidak punya tag penutup." },
        { row: 4, col: 2, fixed: "`<a href=\"https://www.google.com\">Google</a>`", explain: "✅ Link eksternal wajib memakai scheme <code>https://</code>; tanpa itu browser mencari file lokal bernama <code>www.google.com</code>." },
        { row: 5, col: 2, fixed: "`<ul><li>HTML</li></ul>`", explain: "✅ <code><li></code> harus berada di dalam <code><ul></code> atau <code><ol></code>." },
        { row: 6, col: 2, fixed: "`<img src=\"foto.jpg\" alt=\"Foto profil\">`", explain: "✅ ➕ Atribut <code>alt</code> wajib sebagai teks pengganti bila gambar gagal dimuat dan untuk pembaca layar." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Client atau Server?",
      title: "Di Mana Bahasa Ini Diproses?",
      headers: ["Bahasa / teknologi", "Diproses di"],
      rows: [
        { cells: ["HTML"], fields: [{ options: CS, answer: "client" }], ok: "✓ Client side (markup yang dibaca browser)." },
        { cells: ["PHP (Hypertext Preprocessor)"], fields: [{ options: CS, answer: "server" }], ok: "✓ Server side." },
        { cells: ["CSS"], fields: [{ options: CS, answer: "client" }], ok: "✓ Client side." },
        { cells: ["JSP (Java Server Pages)"], fields: [{ options: CS, answer: "server" }], ok: "✓ Server side." },
        { cells: ["JavaScript (di browser)"], fields: [{ options: CS, answer: "client" }], ok: "✓ Client side." },
        { cells: ["ASP (Active Server Pages)"], fields: [{ options: CS, answer: "server" }], ok: "✓ Server side." },
        { cells: ["XML"], fields: [{ options: CS, answer: "client" }], ok: "✓ Slide memasukkan XML ke client side." },
        { cells: ["Program yang mengakses database nilai mahasiswa"], fields: [{ options: CS, answer: "server" }], ok: "✓ Akses database adalah keunggulan server side." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Statis atau Dinamis?",
      title: "Tebak Jenis Websitenya",
      headers: ["Kasus", "Jenis"],
      rows: [
        { cells: ["Halaman profil.html berisi biodata yang sama untuk semua pengunjung"], fields: [{ options: SD, answer: "statis" }], ok: "✓ Isi tetap, interaksi hanya klik link." },
        { cells: ["Portal akademik: login lalu melihat KHS milik sendiri"], fields: [{ options: SD, answer: "dinamis" }], ok: "✓ Konten berbeda per pengguna, diproses server." },
        { cells: ["Aplikasi CRUD data mahasiswa (tambah, ubah, hapus data)"], fields: [{ options: SD, answer: "dinamis" }], ok: "✓ Pengguna mengubah konten lewat browser." },
        { cells: ["Halaman “Tentang Kami” yang hanya berisi teks & gambar"], fields: [{ options: SD, answer: "statis" }], ok: "✓ Konten tetap." },
        { cells: ["Toko online dengan keranjang belanja"], fields: [{ options: SD, answer: "dinamis" }], ok: "✓ Data keranjang diproses server." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 4 • Detektor Domain",
      title: "Bagian Domain yang Dicetak Tebal Termasuk …",
      headers: ["Alamat", "Jenis"],
      rows: [
        { cells: ["sibermu.ac**.id**"], fields: [{ options: DOM, answer: "cctld" }], ok: "✓ .id = kode negara Indonesia." },
        { cells: ["google**.com**"], fields: [{ options: DOM, answer: "gtld" }], ok: "✓ .com = komersial (generik)." },
        { cells: ["**sibermu**.ac.id"], fields: [{ options: DOM, answer: "sld" }], ok: "✓ Nama yang didaftarkan sebelum TLD." },
        { cells: ["**dosen**.sibermu.ac.id"], fields: [{ options: DOM, answer: "sub" }], ok: "✓ Third level domain = subdomain." },
        { cells: ["wikipedia**.org**"], fields: [{ options: DOM, answer: "gtld" }], ok: "✓ .org = organisasi (generik)." },
        { cells: ["bbc.co**.uk**"], fields: [{ options: DOM, answer: "cctld" }], ok: "✓ .uk = Inggris." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 5 • Konsultan Hosting & Era Web",
      title: "Pilih Jawaban yang Paling Tepat",
      headers: ["Kasus", "Jawaban"],
      rows: [
        { cells: ["Mahasiswa ingin hosting blog pribadi semurah mungkin"], fields: [{ options: HOST, answer: "Shared hosting" }], ok: "✓ Satu server dipakai banyak domain, harga murah." },
        { cells: ["Startup butuh server virtual sendiri tapi belum mampu sewa server fisik utuh"], fields: [{ options: HOST, answer: "VPS" }], ok: "✓ Mesin virtual khusus untuk klien." },
        { cells: ["Bank butuh satu server fisik utuh yang tidak dibagi"], fields: [{ options: HOST, answer: "Dedicated server" }], ok: "✓ Server utuh untuk satu klien." },
        { cells: ["Perusahaan punya server sendiri, ingin menitipkannya di data center untuk usaha hosting"], fields: [{ options: HOST, answer: "Colocation server" }], ok: "✓ Sewa tempat untuk server milik sendiri." },
        { cells: ["Facebook: pengguna saling berbagi & berkolaborasi"], fields: [{ options: WEBV, answer: "Web 2.0" }], ok: "✓ Diperkenalkan O’Reilly Media 2004." },
        { cells: ["Situs berita cnn.com generasi awal"], fields: [{ options: WEBV, answer: "Web 1.0" }], ok: "✓ Contoh dari slide." },
        { cells: ["Web semantik & cloud computing"], fields: [{ options: WEBV, answer: "Web 3.0" }], ok: "✓ Web cerdas." }
      ]
    }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa beda internet dan web?", a: "<strong>Internet</strong> = jaringan komputer global berbasis TCP/IP. <strong>Web</strong> = salah satu aplikasi di internet (dokumen multimedia, protokol HTTP, diakses lewat browser). Aplikasi internet lain: email, FTP, IM." },
    { tag: "Konsep", q: "Tiga mekanisme kerja WWW?", a: "1. <strong>Protokol</strong> standar: HTTP<br>2. <strong>Alamat</strong>: URL<br>3. <strong>HTML</strong> untuk membuat dokumen" },
    { tag: "Cara kerja", q: "Urutkan cara kerja web!", a: "User ketik URL → browser → <strong>HTTP request</strong> (via TCP/IP) → web server mencari web files → <strong>HTTP response</strong> → browser render → tampil (display)." },
    { tag: "URL/URI", q: "Hubungan URL dan URI?", a: "<strong>URL bagian dari URI.</strong> URL menunjukkan lokasi (scheme, tanpa code fragment menurut slide); URI mengidentifikasi nama, lokasi, atau keduanya, termasuk fragment." },
    { tag: "Web", q: "Beda web statis dan dinamis?", a: "<strong>Statis</strong>: pengguna tidak bisa mengubah konten; interaksi hanya pemrosesan link.<br><strong>Dinamis</strong>: client bisa mengubah konten; request diproses server dan hasilnya berbeda sesuai alur program." },
    { tag: "Scripting", q: "Contoh client side vs server side scripting?", a: "<strong>Client</strong>: HTML, XHTML, CSS, JavaScript, XML.<br><strong>Server</strong>: ASP, PHP, JSP." },
    { tag: "Server side", q: "3 karakteristik server side programming?", a: "1. Ada client yang meminta request<br>2. Eksekusi program di server<br>3. Hasil dikirim ke client" },
    { tag: "Komponen", q: "4 komponen penyusun web?", a: "Bahasa pemrograman, web editor (teks, WYSIWYG, template), web browser, image editor." },
    { tag: "Sejarah", q: "Web 1.0, 2.0, 3.0?", a: "<strong>1.0</strong>: generasi pertama (cnn.com, Bhinneka).<br><strong>2.0</strong>: O’Reilly 2004, kolaborasi & sharing (Facebook).<br><strong>3.0</strong>: web cerdas/AI (web semantik, cloud computing)." },
    { tag: "Domain", q: "Domain vs DNS?", a: "<strong>Domain</strong>: nama unik untuk mengidentifikasi server (sibermu.ac.id).<br><strong>DNS</strong>: sistem basis data tersebar yang menyimpan informasi nama host/domain (➕ menerjemahkan ke alamat IP)." },
    { tag: "Domain", q: "Pada dosen.sibermu.ac.id, mana TLD, SLD, subdomain?", a: "TLD = <code>.ac.id</code> • SLD = <code>sibermu</code> • Third level/subdomain = <code>dosen</code>." },
    { tag: "Hosting", q: "4 jenis hosting?", a: "<strong>Shared</strong> (1 server banyak domain, murah) • <strong>VPS</strong> (mesin virtual) • <strong>Dedicated</strong> (1 server utuh) • <strong>Colocation</strong> (sewa tempat untuk server sendiri)." },
    { tag: "HTML", q: "Tag vs elemen vs atribut?", a: "<strong>Tag</strong>: penanda, mis. `<p>`.<br><strong>Elemen</strong>: tag pembuka + konten + tag penutup, mis. `<p>Halo</p>`.<br><strong>Atribut</strong>: info tambahan di tag pembuka, mis. `href=\"...\"`." },
    { tag: "HTML", q: "Struktur dasar dokumen HTML?", a: "`<!DOCTYPE html>` → `<html>` → `<head>` (metadata, `<title>`) + `<body>` (konten tampil). Tiga bagian utama: html, head, body." },
    { tag: "HTML", q: "Apakah HTML case sensitive? Apakah HTML bahasa pemrograman?", a: "<strong>Tidak case sensitive</strong> (`<BODY>` = `<body>`, tapi biasakan huruf kecil). HTML adalah <strong>bahasa markup</strong>, bukan bahasa pemrograman." }
  ],
  quiz: [
    { q: "Protokol yang digunakan untuk mentransfer dokumen di WWW adalah …",
      opts: ["TCP/IP", "FTP", "HTTP", "DNS"], ans: 2,
      exp: "HTTP (HyperText Transfer Protocol) adalah protokol WWW. TCP/IP adalah protokol dasar internet secara keseluruhan.",
      optExp: ["Jebakan: TCP/IP menghubungkan jaringan internet, bukan protokol khusus dokumen web.", "FTP untuk transfer file.", "Benar.", "DNS untuk penamaan domain."] },
    { q: "Pernyataan yang BENAR tentang URL dan URI adalah …",
      opts: ["URI merupakan bagian dari URL", "URL merupakan bagian dari URI", "URL dan URI sama persis", "URI hanya dipakai untuk FTP"], ans: 1,
      exp: "Semua URL adalah URI, tetapi tidak semua URI adalah URL.",
      optExp: ["Terbalik.", "Benar.", "Keduanya berbeda cakupan.", "Contoh slide memang FTP, tetapi URI bukan hanya untuk FTP."] },
    { q: "Website yang memungkinkan client mengubah konten melalui browser dan hasilnya berbeda sesuai alur program disebut …",
      opts: ["Web statis", "Web 1.0", "Web dinamis", "Web directory"], ans: 2,
      exp: "Ciri web dinamis: interaksi client–server kompleks, request diproses server.",
      optExp: ["Web statis tidak bisa diubah pengguna lewat browser.", "Web 1.0 adalah generasi, bukan jenis teknologi statis/dinamis.", "Benar.", "Web directory adalah kategori situs."] },
    { q: "Kelompok bahasa yang seluruhnya termasuk server side scripting adalah …",
      opts: ["HTML, CSS, JavaScript", "PHP, ASP, JSP", "XML, XHTML, PHP", "JavaScript, PHP, CSS"], ans: 1,
      exp: "Server side: ASP, PHP, JSP.",
      optExp: ["Semuanya client side.", "Benar.", "XML dan XHTML client side.", "JavaScript dan CSS client side."] },
    { q: "Berikut keuntungan server side programming, KECUALI …",
      opts: ["Cross platform, tidak tergantung browser", "Dapat mengakses database", "Kode program aman", "Kode program bisa dilihat pengunjung lewat View Source"], ans: 3,
      exp: "Kode server side dieksekusi di server; client hanya menerima hasilnya, jadi kodenya aman/tidak terlihat.",
      optExp: ["Termasuk keuntungan.", "Termasuk keuntungan.", "Termasuk keuntungan.", "Benar, ini bukan keuntungan server side (justru ciri client side)."] },
    { q: "Teknologi web generasi kedua yang mengedepankan kolaborasi dan sharing, diperkenalkan O’Reilly Media tahun 2004, adalah …",
      opts: ["Web 1.0", "Web 2.0", "Web 3.0", "Web semantik"], ans: 1,
      exp: "Web 2.0, contohnya Facebook.",
      optExp: ["Generasi pertama.", "Benar.", "Web cerdas/AI.", "Web semantik bagian dari Web 3.0."] },
    { q: "Pada alamat `dosen.sibermu.ac.id`, bagian `dosen` disebut …",
      opts: ["Top Level Domain", "Second Level Domain", "Third Level Domain (subdomain)", "Country code TLD"], ans: 2,
      exp: "Nama sebelum SLD + TLD adalah third level domain, dikenal sebagai subdomain.",
      optExp: ["TLD adalah .ac.id.", "SLD adalah sibermu.", "Benar.", "ccTLD adalah .id."] },
    { q: "Jenis hosting yang menggunakan satu server untuk lebih dari satu nama domain dengan harga paling murah adalah …",
      opts: ["Dedicated server", "Colocation server", "VPS", "Shared hosting"], ans: 3,
      exp: "Shared hosting: satu server dipakai bersama banyak domain.",
      optExp: ["Server utuh untuk satu klien, mahal.", "Sewa tempat untuk server milik sendiri.", "Mesin virtual khusus klien.", "Benar."] },
    { q: "Pada kode `<a href=\"https://sibermu.ac.id\">Kampus</a>`, `href` adalah …",
      opts: ["Elemen", "Atribut", "Nilai", "Tag penutup"], ans: 1,
      exp: "Bentuk umum: `<ELEMENT ATRIBUT=nilai>`. href = atribut, \"https://sibermu.ac.id\" = nilai, seluruh baris = elemen.",
      optExp: ["Elemen adalah seluruh baris.", "Benar.", "Nilai adalah https://sibermu.ac.id.", "Tag penutupnya `</a>`."] },
    { q: "Pernyataan yang SALAH tentang HTML adalah …",
      opts: ["HTML tidak bersifat case sensitive", "`<head>` berisi metadata seperti `<title>`", "HTML adalah bahasa pemrograman yang dieksekusi server", "`<br>` tidak memerlukan tag penutup"], ans: 2,
      exp: "HTML adalah bahasa markup (bukan bahasa pemrograman) dan diproses browser di sisi client.",
      optExp: ["Benar adanya (`<BODY>` = `<body>`).", "Benar adanya.", "Ini yang salah, jadi ini jawabannya.", "Benar adanya, `<br>` adalah void element."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 1*
📚 *Konsep Dasar Web & Pengenalan HTML*

1️⃣ *Istilah:* Internet = jaringan global TCP/IP • Web = aplikasi internet berbasis HTTP + browser • WWW = halaman terhubung hyperlink • Situs web = kumpulan halaman berdomain • HTTP = protokol transfer dokumen WWW.
• WWW bekerja dengan: protokol (HTTP), alamat (URL), HTML.

2️⃣ *Cara kerja:* user ketik URL → browser → HTTP request (TCP/IP) → web server → HTTP response → display. (+DNS ubah domain jadi IP.)

3️⃣ *URL vs URI:* URL bagian dari URI. URL = lokasi (scheme, tanpa fragment); URI = nama/lokasi/keduanya, termasuk fragment.

4️⃣ *Statis vs dinamis:* statis = konten tetap, hanya proses link • dinamis = client ubah konten, diproses server.
• Client side: HTML, XHTML, CSS, JavaScript, XML • Server side: ASP, PHP, JSP (request → eksekusi di server → hasil ke client).

5️⃣ *Komponen web:* bahasa pemrograman, web editor, browser, image editor.
• Web 1.0 (cnn.com) • Web 2.0 (O'Reilly 2004, Facebook) • Web 3.0 (semantik, cloud).

6️⃣ *Domain & hosting:* DNS = database tersebar nama domain • IANA atur TLD • ccTLD (.id .my .sg) vs gTLD (.com .net .gov .mil .info .aero) • dosen(subdomain).sibermu(SLD).ac.id(TLD).
• Hosting: shared, VPS, dedicated, colocation.

7️⃣ *HTML:* bahasa markup, tidak case sensitive. Tag, elemen (pembuka+konten+penutup), atribut (<ELEMENT ATRIBUT=nilai>).
• Struktur: <!DOCTYPE html>, <html>, <head>(<title>), <body>.
• Tag umum: h1–h6, p, strong, em, br, ul/ol/li, a href.`
});
