// Pemrograman Web Dinamis — Pertemuan 4: Layout dengan CSS (Box Model, Flexbox, Grid)
// Sumber: Modul CSS 4 + Assignment "Melanjutkan Proyek HTML dengan Desain CSS" (Ujian CPMK 01).
// Assignment adalah ujian, jadi editor latihannya TIDAK diberi contoh jawaban lengkap — hanya misi & petunjuk.
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

const JC = ["flex-start", "center", "flex-end", "space-between", "space-around"];
const LAY = [{ value: "flex", label: "Flexbox (1 dimensi)" }, { value: "grid", label: "Grid (2 dimensi)" }];

const MODUL_CSS = `        body {
            font-family: Arial, sans-serif;
            margin: 2rem;
            background-color: #f4f4f4;
            box-sizing: border-box;
        }
        header {
            background-color: #005566;
            color: white;
            padding: 1rem;
            text-align: center;
        }
        nav ul {
            list-style-type: none;
            padding: 0;
            display: flex;
            justify-content: center;
        }
        nav ul li { margin: 0 1rem; }
        nav ul li a { text-decoration: none; color: #333; }
        .container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 1rem;
            max-width: 1000px;
            margin: 2rem auto;
        }
        .form-section, .table-section {
            flex: 1;
            background-color: white;
            padding: 1.5rem;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        form { display: flex; flex-direction: column; gap: 1rem; }
        input, select {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 0.8rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover { background-color: #45a049; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 0.8rem; text-align: left; }
        th { background-color: #f0f0f0; }
        footer { text-align: center; margin-top: 2rem; color: #666; }`;

const MODUL_BODY = `    <header>
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
        <div class="form-section">
            <h2>Form Pendaftaran</h2>
            <form action="#" method="POST">
                <label for="nim">NIM:</label>
                <input type="text" id="nim" name="nim" maxlength="10" pattern="[0-9]+" placeholder="Masukkan NIM" required>
                <label for="nama">Nama:</label>
                <input type="text" id="nama" name="nama" placeholder="Masukkan Nama" required>
                <label for="jurusan">Jurusan:</label>
                <select id="jurusan" name="jurusan" required>
                    <option value="">Pilih Jurusan</option>
                    <option value="sistem_informasi">Sistem Informasi</option>
                    <option value="teknik_informatika">Teknik Informatika</option>
                </select>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="contoh@domain.com" required>
                <button type="submit">Simpan Data</button>
            </form>
        </div>
        <div class="table-section">
            <h2>Data Mahasiswa</h2>
            <table>
                <thead>
                    <tr><th>NIM</th><th>Nama</th><th>Jurusan</th></tr>
                </thead>
                <tbody>
                    <tr><td>12345</td><td>Ahmad Fauzi</td><td>Sistem Informasi</td></tr>
                    <tr><td>67890</td><td>Budi Santoso</td><td>Teknik Informatika</td></tr>
                </tbody>
            </table>
        </div>
    </div>
    <footer>
        <p>&copy; 2025 Universitas Contoh</p>
    </footer>`;

const STARTER_MODUL = `<!DOCTYPE html>
<html lang="id">
<head>
    <title>Layout Flexbox</title>
    <!-- Di laptop: isi <style> ini = file flexbox.css -->
    <style>
${MODUL_CSS}
    </style>
</head>
<body>
${MODUL_BODY}
</body>
</html>`;

const SOLUSI_MODUL = STARTER_MODUL
  .replace("            gap: 1rem;\n            max-width: 1000px;", "            flex-wrap: wrap;\n            gap: 1rem;\n            max-width: 1000px;")
  .replace("            padding: 1.5rem;\n            border-radius: 5px;", "            padding: 1rem;\n            min-width: 300px;\n            border-radius: 5px;");

const STARTER_FLEX = `<!DOCTYPE html>
<html lang="id">
<head>
    <style>
        .container {
            display: flex;
            flex-direction: row;          /* coba: column */
            justify-content: flex-start;  /* coba: center, flex-end, space-between, space-around */
            align-items: stretch;         /* coba: flex-start, center, flex-end */
            gap: 10px;
            height: 160px;
            background: #e0f2fe;
            padding: 10px;
        }
        .item {
            background: #0369a1;
            color: white;
            padding: 12px;
            border-radius: 6px;
        }
        /* coba: .item { flex: 1; }  atau  .item:first-child { order: 3; } */
    </style>
</head>
<body>
    <div class="container">
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
    </div>
</body>
</html>`;

const SOLUSI_FLEX = STARTER_FLEX
  .replace("justify-content: flex-start;", "justify-content: space-between;")
  .replace("align-items: stretch;", "align-items: center;")
  .replace("/* coba: .item { flex: 1; }  atau  .item:first-child { order: 3; } */", ".item { flex: 1; }\n        .item:first-child { order: 3; }");

const STARTER_GRID = `<!DOCTYPE html>
<html lang="id">
<head>
    <style>
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;   /* coba: 1fr 1fr 1fr  atau  200px 1fr */
            gap: 10px;
        }
        .grid-item {
            background: #ede9fe;
            border: 2px solid #7c3aed;
            padding: 16px;
            text-align: center;
        }
        /* coba: .lebar { grid-column: span 2; } */
    </style>
</head>
<body>
    <div class="grid-container">
        <div class="grid-item lebar">Header (lebar)</div>
        <div class="grid-item">Form</div>
        <div class="grid-item">Tabel</div>
        <div class="grid-item">Navigasi</div>
        <div class="grid-item">Info</div>
    </div>
</body>
</html>`;

const SOLUSI_GRID = STARTER_GRID
  .replace("grid-template-columns: 1fr 1fr;", "grid-template-columns: 1fr 1fr 1fr;")
  .replace("/* coba: .lebar { grid-column: span 2; } */", ".lebar { grid-column: span 3; }");

const STARTER_UJIAN = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Mahasiswa</title>
    <!-- Tulis CSS di sini (internal), di file .css (external), atau pakai style="" (inline) -->
    <style>

    </style>
</head>
<body>
    <h1>Selamat datang di halaman data mahasiswa!</h1>
    <p>Halaman ini digunakan untuk mengelola data mahasiswa.</p>

    <h3>Data Mahasiswa</h3>
    <table>
        <tr><th>Nama</th><th>NIM</th><th>Jurusan</th></tr>
        <tr><td>Andi</td><td>123456</td><td>Sistem Informasi</td></tr>
        <tr><td>Budi</td><td>123457</td><td>Teknik Informatika</td></tr>
        <tr><td>Cici</td><td>123458</td><td>Desain Komunikasi Visual</td></tr>
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
        <button type="submit">Kirim Data</button>
    </form>
</body>
</html>`;

module.exports = fix({
  id: "p4",
  nomor: 4,
  judul: "Layout CSS: Box Model, Flexbox & Grid",
  ujian: "UTS",
  hero: {
    badge: "Materi 4 • Pemrograman Web Dinamis",
    title: "Mengatur Posisi: Kotak, Baris, dan Petak",
    text: "Pahami <strong>Box Model</strong> (content, padding, border, margin) dan <strong>box-sizing</strong>, <strong>Flexbox</strong> untuk layout 1 dimensi, dan <strong>CSS Grid</strong> untuk 2 dimensi, lalu buat <strong>layout dua kolom</strong> form + tabel. Ada juga latihan untuk <strong>Assignment Ujian CPMK 01</strong>."
  },
  cheatsheet: [
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "flow",
          label: "Interaktif 1 • Box Model",
          title: "4 Lapisan Setiap Elemen (dari luar ke dalam)",
          items: ["Margin", "Border", "Padding", "Content"],
          arrow: "›",
          highlight: 3,
          note: "<strong>Content</strong> = isi (diatur <code>width</code>/<code>height</code>) • <strong>Padding</strong> = jarak konten ke border • <strong>Border</strong> = garis di sekeliling padding • <strong>Margin</strong> = jarak luar di sekitar border."
        },
        {
          type: "table",
          title: "Singkatan Nilai Padding/Margin",
          headers: ["Penulisan", "Artinya"],
          rows: [
            ["`padding: 10px;`", "Semua sisi 10px"],
            ["`padding: 10px 20px;`", "Atas-bawah 10px, kiri-kanan 20px"],
            ["`padding: 5px 10px 15px;`", "Atas 5, kiri-kanan 10, bawah 15"],
            ["`padding: 1px 2px 3px 4px;`", "Atas, kanan, bawah, kiri (searah jarum jam)"],
            ["`margin: 0 auto;`", "Atas-bawah 0, kiri-kanan otomatis → kotak di tengah"]
          ],
          modes: [
            { label: "⚠️ Koreksi modul", target: "row", row: 1, title: "Teks modul terpotong", text: "Modul menulis “System: bawah 10px, kiri-kanan 20px”. Yang benar: <code>padding: 10px 20px;</code> = <strong>atas-bawah 10px</strong>, kiri-kanan 20px." }
          ]
        }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 2 • box-sizing",
      title: "Saklar: <strong>content-box</strong> vs <strong>border-box</strong>",
      desc: "Contoh modul: <code>.box { width: 200px; height: 100px; padding: 10px; border: 2px solid #333; margin: 15px; }</code>",
      style: "toggle",
      options: [
        { label: "content-box (bawaan)", tone: "rose", badge: "➕ Default browser", title: "width hanya untuk konten",
          code: "lebar tampak = 200 + 10 + 10 + 2 + 2 = 224px",
          text: "Padding dan border <strong>ditambahkan di luar</strong> width, jadi kotak jadi lebih besar dari yang ditulis. Ini sering membuat input <code>width: 100%</code> “kebablasan” keluar dari wadahnya.",
          note: "Tinggi tampak: 100 + 20 + 4 = 124px." },
        { label: "border-box (disarankan)", tone: "emerald", badge: "Praktik terbaik modul", title: "width sudah termasuk padding & border",
          code: "lebar tampak = 200px (konten menyusut jadi 176px)",
          text: "Ukuran yang ditulis = ukuran yang tampil, sehingga perhitungan layout jauh lebih mudah.",
          note: "Margin <strong>tidak pernah</strong> termasuk width di kedua mode: ruang total ke samping tetap +15px tiap sisi." }
      ],
      footer: "➕ <strong>Koreksi penting:</strong> modul menulis <code>body { box-sizing: border-box; }</code>, padahal itu hanya berlaku untuk <code><body></code> (properti ini <strong>tidak diwariskan</strong>). Agar berlaku untuk <strong>semua elemen</strong> seperti diminta tugas, tulis: <code>*, *::before, *::after { box-sizing: border-box; }</code>"
    },
    {
      type: "cards",
      label: "Interaktif 3 • Flexbox",
      title: "Flexible Box Layout: Mengatur Elemen dalam Satu Baris atau Kolom",
      desc: "Aktifkan dengan <code>display: flex;</code> pada <strong>container</strong> (induk); anak-anaknya otomatis menjadi <strong>item</strong>.",
      cols: 3,
      items: [
        { badge: "flex-direction", tone: "indigo", title: "Arah sumbu utama", text: "<code>row</code> (kiri→kanan, default) atau <code>column</code> (atas→bawah)." },
        { badge: "justify-content", tone: "sky", title: "Sebaran di sumbu utama", text: "<code>flex-start</code>, <code>center</code>, <code>flex-end</code>, <code>space-between</code>, <code>space-around</code>." },
        { badge: "align-items", tone: "emerald", title: "Perataan di sumbu silang", text: "<code>stretch</code> (default), <code>flex-start</code>, <code>center</code>, <code>flex-end</code>." },
        { badge: "➕ flex-wrap", tone: "amber", title: "Boleh turun baris?", text: "<code>wrap</code> = item pindah ke baris baru saat sempit (responsif dasar)." },
        { badge: "➕ gap", tone: "violet", title: "Jarak antar-item", text: "Mis. <code>gap: 1rem;</code>, lebih rapi daripada memberi margin satu per satu." },
        { badge: "flex & order (item)", tone: "rose", title: "Ukuran & urutan item", text: "<code>flex: 1</code> = semua item berbagi ruang sama rata. <code>order</code> = mengubah urutan tampil tanpa mengubah HTML." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "code",
          label: "Interaktif 4 • CSS Grid",
          title: "Layout 2 Dimensi (Baris & Kolom)",
          file: "grid.css",
          code: ".grid-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr; /* 2 kolom sama lebar */\n    grid-template-rows: auto;\n    gap: 10px;\n}\n.grid-item {\n    grid-column: span 1;\n}",
          note: "<code>fr</code> = <em>fraction</em>, bagian dari sisa ruang. <code>1fr 2fr</code> → kolom kedua dua kali lebih lebar. <code>grid-column: span 2</code> → item melebar 2 kolom."
        },
        {
          type: "choices",
          title: "Kapan Flexbox, Kapan Grid?",
          style: "toggle",
          options: [
            { label: "Flexbox", tone: "sky", badge: "1 dimensi", title: "Baris ATAU kolom", text: "Cocok untuk <strong>navigasi, form, deretan tombol</strong>, dan layout dua kolom sederhana. Lebih mudah daripada <code>float</code>/positioning.", note: "Modul: Flexbox untuk form & navigasi." },
            { label: "Grid", tone: "violet", badge: "2 dimensi", title: "Baris DAN kolom sekaligus", text: "Cocok untuk <strong>layout kompleks</strong>: dashboard, kerangka seluruh halaman CRUD.", note: "Modul: Grid untuk tata letak keseluruhan halaman." }
          ]
        }
      ]
    },
    {
      type: "table",
      label: "Interaktif 5 • Resep Layout Dua Kolom (Modul)",
      title: "Bedah CSS Layout Form + Tabel Berdampingan",
      headers: ["Selector", "Properti kunci", "Fungsinya"],
      rows: [
        ["`.container`", "`display: flex; flex-direction: row;`", "Form dan tabel berjajar ke samping"],
        ["`.container`", "`gap: 1rem; justify-content: space-between;`", "Jarak antar-kolom"],
        ["`.container`", "`max-width: 1000px; margin: 2rem auto;`", "Lebar maksimum & posisi di tengah"],
        ["`.container`", "`flex-wrap: wrap;`", "Kolom turun ke bawah jika layar sempit"],
        ["`.form-section, .table-section`", "`flex: 1; min-width: 300px;`", "Dua kolom sama lebar, tidak lebih kecil dari 300px"],
        ["`form`", "`display: flex; flex-direction: column; gap: 1rem;`", "Label & input tersusun rapi ke bawah"],
        ["`table`", "`width: 100%; border-collapse: collapse;`", "Tabel penuh & garis sel menyatu"]
      ],
      modes: [
        { label: "Kolom sejajar", target: "row", row: 0, title: "Kunci utama: display flex", text: "Tanpa <code>display: flex</code> pada <code>.container</code>, form dan tabel akan bertumpuk ke bawah." },
        { label: "Responsif dasar", target: "row", row: 3, title: "flex-wrap + min-width", text: "Bila lebar tidak cukup untuk 2 × 300px, kolom kanan turun ke bawah sehingga tetap terbaca di HP." },
        { label: "Box model", target: "row", row: 4, title: "padding, border-radius, box-shadow", text: "Setiap kolom diberi latar putih, <code>padding</code>, sudut membulat, dan bayangan agar tampak seperti kartu." }
      ]
    },
    {
      type: "callout",
      label: "Assignment • Ujian CPMK 01",
      tone: "warn",
      heading: "Desain CSS untuk file namamahasiswa_NIM.html",
      html: "Assignment ini adalah <strong>ujian</strong>, jadi di aplikasi ini kamu hanya mendapat <strong>misi & pengecek otomatis</strong> (Simulator → Praktik 4), tanpa contoh jawaban lengkap. Poin yang dinilai:<ol><li><code>background-color</code> (warna pastel) pada <strong>tabel</strong> atau elemen lain</li><li><code>font-size</code> (mis. 16px) dan <code>font-family</code> (mis. Arial) untuk <strong>seluruh teks</strong> → petunjuk: selector yang mengenai seluruh halaman</li><li>Style input form: <code>border-radius: 5px</code> dan <code>padding: 5px</code></li><li>Bonus: border & padding tabel, mis. <code>border: 2px solid</code> dan <code>padding: 8px</code> → petunjuk: border tabel perlu diberi juga ke selnya</li><li>Struktur HTML tetap utuh; simpan sebagai <code>css_namamahasiswa_nim.html</code> (+ <code>nama_style.css</code> jika external)</li></ol>"
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Kalkulator 1 • Box Model",
      title: "Hitung Ukuran Tampak Kotak",
      desc: "Diketahui <code>width: 200px; padding: 10px; border: 2px solid; margin: 15px;</code>. Isi angka (px) tanpa satuan.",
      headers: ["Pertanyaan", "Jawaban (px)"],
      rows: [
        { cells: ["Lebar tampak (sampai border) dengan <strong>content-box</strong>"], fields: [{ answer: "224", placeholder: "angka" }], ok: "✓ 200 + 2×10 + 2×2 = 224." },
        { cells: ["Lebar tampak dengan <strong>border-box</strong>"], fields: [{ answer: "200", placeholder: "angka" }], ok: "✓ Width sudah termasuk padding & border." },
        { cells: ["Lebar area konten dengan <strong>border-box</strong>"], fields: [{ answer: "176", placeholder: "angka" }], ok: "✓ 200 − 20 − 4 = 176." },
        { cells: ["Ruang horizontal total yang dipakai (termasuk margin), <strong>border-box</strong>"], fields: [{ answer: "230", placeholder: "angka" }], ok: "✓ 200 + 2×15 = 230." },
        { cells: ["Tinggi tampak dengan content-box jika <code>height: 100px</code>"], fields: [{ answer: "124", placeholder: "angka" }], ok: "✓ 100 + 20 + 4 = 124." }
      ]
    },
    {
      type: "playground",
      label: "Praktik 1 • Lab Flexbox",
      title: "Coba Properti Flexbox Langsung",
      desc: "Ganti nilai properti dan lihat item bergerak. Selesaikan misinya.",
      file: "flex-lab.html",
      starter: STARTER_FLEX,
      solution: SOLUSI_FLEX,
      tasks: [
        { label: "`justify-content: space-between`", regex: "justify-content\\s*:\\s*space-between" },
        { label: "`align-items: center`", regex: "align-items\\s*:\\s*center" },
        { label: "Item berbagi ruang sama: `.item { flex: 1; }`", regex: "\\.item\\s*\\{[^}]*flex\\s*:\\s*1" },
        { label: "Pindahkan Item 1 ke paling kanan dengan `order`", regex: "order\\s*:\\s*[2-9]" }
      ]
    },
    {
      type: "playground",
      label: "Praktik 2 • Lab Grid",
      title: "Coba CSS Grid",
      file: "grid-lab.html",
      starter: STARTER_GRID,
      solution: SOLUSI_GRID,
      tasks: [
        { label: "Ubah menjadi 3 kolom (`1fr 1fr 1fr` atau `repeat(3, 1fr)`)", regex: "grid-template-columns\\s*:\\s*(1fr\\s+1fr\\s+1fr|repeat\\(\\s*3\\s*,\\s*1fr\\s*\\))" },
        { label: "Buat “Header” melebar penuh dengan `grid-column: span …`", regex: "\\.lebar\\s*\\{[^}]*grid-column\\s*:\\s*span\\s*[23]" }
      ]
    },
    {
      type: "playground",
      label: "Praktik 3 • Aktivitas Modul 4",
      title: "Editor Live: Layout Dua Kolom Form + Tabel",
      desc: "Kode modul sudah dimuat. Kerjakan modifikasinya. <strong>Tips:</strong> sempitkan jendela browser (atau buka di HP) untuk melihat efek <code>flex-wrap</code>.",
      file: "flexbox-layout.html",
      starter: STARTER_MODUL,
      solution: SOLUSI_MODUL,
      tasks: [
        { label: "Tambahkan `flex-wrap: wrap;` pada `.container`", regex: "\\.container\\s*\\{[^}]*flex-wrap\\s*:\\s*wrap" },
        { label: "Ubah padding kedua section menjadi `1rem`", regex: "\\.form-section\\s*,\\s*\\.table-section\\s*\\{[^}]*padding\\s*:\\s*1rem" },
        { label: "Tambahkan `min-width: 300px;` pada kedua section", regex: "\\.form-section\\s*,\\s*\\.table-section\\s*\\{[^}]*min-width\\s*:\\s*300px" }
      ]
    },
    {
      type: "playground",
      label: "Praktik 4 • Assignment Ujian CPMK 01",
      title: "Latihan Mandiri: Beri Desain CSS pada Halaman Data Mahasiswa",
      desc: "Halaman polos (mirip tugas pertemuan 2) sudah dimuat. Tambahkan CSS sendiri lalu klik <strong>Periksa Kode</strong>. Karena ini ujian, <strong>tidak ada contoh jawaban</strong>; gunakan petunjuk di Cheat Sheet. Setelah lolos, terapkan langkah yang sama pada file milikmu sendiri.",
      file: "css_namamahasiswa_nim.html",
      starter: STARTER_UJIAN,
      tasks: [
        { label: "Warna latar (`background-color`) pada tabel/elemen lain", regex: "background(-color)?\\s*:\\s*[#a-z]" },
        { label: "`font-size` untuk teks keseluruhan", regex: "(body|html|\\*)\\s*\\{[^}]*font-size\\s*:|<body[^>]*style=\"[^\"]*font-size" },
        { label: "`font-family` untuk teks keseluruhan", regex: "(body|html|\\*)\\s*\\{[^}]*font-family\\s*:|<body[^>]*style=\"[^\"]*font-family" },
        { label: "Input form: `border-radius: 5px`", regex: "input[^{]*\\{[^}]*border-radius\\s*:\\s*5px|<input[^>]*style=\"[^\"]*border-radius\\s*:\\s*5px" },
        { label: "Input form: `padding: 5px`", regex: "input[^{]*\\{[^}]*padding\\s*:\\s*5px|<input[^>]*style=\"[^\"]*padding\\s*:\\s*5px" },
        { label: "Bonus: border tabel/sel, mis. `2px solid`", regex: "(table|th|td)[^{]*\\{[^}]*border\\s*:\\s*\\d+px\\s+solid|<t[hd]?[^>]*style=\"[^\"]*border\\s*:\\s*\\d+px\\s+solid" },
        { label: "Bonus: padding sel tabel, mis. `8px`", regex: "(th|td)[^{]*\\{[^}]*padding\\s*:|<t[hd][^>]*style=\"[^\"]*padding" },
        { label: "Struktur tetap utuh: tabel 4 baris + form", sel: "table tr", min: 4, regex: "<form[\\s\\S]*type=[\"']number[\"'][\\s\\S]*</form>" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 1 • Tebak justify-content",
      title: "Nilai Mana yang Menghasilkan Susunan Ini?",
      headers: ["Susunan 3 item dalam baris", "justify-content"],
      rows: [
        { cells: ["`[■■■_______]` menumpuk di kiri"], fields: [{ options: JC, answer: "flex-start" }], ok: "✓ Default." },
        { cells: ["`[___■■■___]` di tengah"], fields: [{ options: JC, answer: "center" }], ok: "✓ center." },
        { cells: ["`[_______■■■]` di kanan"], fields: [{ options: JC, answer: "flex-end" }], ok: "✓ flex-end." },
        { cells: ["`[■____■____■]` ujung menempel tepi, sisa ruang di antara"], fields: [{ options: JC, answer: "space-between" }], ok: "✓ space-between." },
        { cells: ["`[__■____■____■__]` ada ruang juga di tepi"], fields: [{ options: JC, answer: "space-around" }], ok: "✓ space-around." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Flexbox atau Grid?",
      title: "Pilih Alat Layout yang Paling Cocok",
      headers: ["Kebutuhan", "Alat"],
      rows: [
        { cells: ["Menu navigasi horizontal"], fields: [{ options: LAY, answer: "flex" }], ok: "✓ Satu baris." },
        { cells: ["Dashboard dengan header, sidebar, konten, dan footer"], fields: [{ options: LAY, answer: "grid" }], ok: "✓ Baris & kolom sekaligus." },
        { cells: ["Label & input form tersusun ke bawah"], fields: [{ options: LAY, answer: "flex" }], ok: "✓ flex-direction: column." },
        { cells: ["Galeri foto 3 × 3"], fields: [{ options: LAY, answer: "grid" }], ok: "✓ 2 dimensi." },
        { cells: ["Deretan tombol Simpan – Reset – Batal"], fields: [{ options: LAY, answer: "flex" }], ok: "✓ 1 dimensi." }
      ]
    }
  ],
  flashcards: [
    { tag: "Box Model", q: "4 komponen Box Model dari dalam ke luar?", a: "Content → Padding → Border → Margin." },
    { tag: "Box Model", q: "Arti `padding: 10px 20px;`?", a: "Atas-bawah 10px, kiri-kanan 20px." },
    { tag: "Box Model", q: "Beda `content-box` dan `border-box`?", a: "<strong>content-box</strong> (default): width hanya konten, padding & border ditambahkan. <strong>border-box</strong>: width sudah termasuk padding & border. Margin tidak pernah termasuk." },
    { tag: "➕ Box Model", q: "Bagaimana menerapkan border-box untuk semua elemen?", a: "`*, *::before, *::after { box-sizing: border-box; }`. Menulisnya di `body` saja tidak cukup karena box-sizing tidak diwariskan." },
    { tag: "Flexbox", q: "Apa itu Flexbox dan cara mengaktifkannya?", a: "Sistem layout satu dimensi (baris atau kolom). Aktifkan dengan `display: flex;` pada container." },
    { tag: "Flexbox", q: "Beda justify-content dan align-items?", a: "<strong>justify-content</strong>: sebaran di sumbu utama (arah flex-direction). <strong>align-items</strong>: perataan di sumbu silang." },
    { tag: "Flexbox", q: "Fungsi `flex: 1` dan `order`?", a: "`flex: 1`: item berbagi ruang sama rata (singkatan flex-grow, flex-shrink, flex-basis). `order`: mengatur urutan tampil item." },
    { tag: "Flexbox", q: "Fungsi `flex-wrap: wrap` dan `min-width: 300px` di layout dua kolom?", a: "Kolom boleh turun ke baris baru saat layar sempit, dan tiap kolom tidak menyusut di bawah 300px (responsif dasar)." },
    { tag: "Grid", q: "Apa itu CSS Grid dan properti utamanya?", a: "Layout dua dimensi. Container: `display: grid`, `grid-template-columns`, `grid-template-rows`, `gap`. Item: `grid-column`, `grid-row`." },
    { tag: "Grid", q: "Arti `grid-template-columns: 1fr 1fr` dan `grid-column: span 2`?", a: "Dua kolom sama lebar (fr = bagian sisa ruang). `span 2`: item melebar menempati 2 kolom." },
    { tag: "Layout", q: "Kapan memilih Flexbox vs Grid?", a: "Flexbox: 1 dimensi (navigasi, form, deretan tombol). Grid: 2 dimensi (dashboard, kerangka seluruh halaman)." },
    { tag: "Layout", q: "Cara memusatkan container selebar maksimum 1000px?", a: "`max-width: 1000px; margin: 0 auto;`" }
  ],
  quiz: [
    { q: "Urutan komponen Box Model dari yang paling dalam adalah …",
      opts: ["Margin – Border – Padding – Content", "Content – Padding – Border – Margin", "Content – Border – Padding – Margin", "Padding – Content – Border – Margin"], ans: 1,
      exp: "Content di dalam, dikelilingi padding, lalu border, lalu margin.",
      optExp: ["Itu urutan dari luar.", "Benar.", "Padding berada di dalam border.", "Content paling dalam."] },
    { q: "Properti yang mengatur jarak antara konten dan border adalah …",
      opts: ["margin", "padding", "gap", "outline"], ans: 1,
      exp: "Padding = jarak dalam; margin = jarak luar.",
      optExp: ["Margin di luar border.", "Benar.", "Gap adalah jarak antar-item flex/grid.", "Outline adalah garis di luar border."] },
    { q: "Sebuah elemen `width:200px; padding:10px; border:2px solid;` dengan box-sizing default (content-box). Lebar tampaknya adalah …",
      opts: ["200px", "212px", "224px", "230px"], ans: 2,
      exp: "200 + 10 + 10 + 2 + 2 = 224px.",
      optExp: ["Itu hasil jika border-box.", "Padding & border dihitung dua sisi.", "Benar.", "Margin tidak termasuk lebar tampak."] },
    { q: "Fungsi `box-sizing: border-box;` adalah …",
      opts: ["Menambahkan border otomatis", "Membuat width/height sudah termasuk padding dan border", "Membuat margin ikut dihitung dalam width", "Menghapus padding"], ans: 1,
      exp: "Lebar/tinggi termasuk padding dan border, sehingga perhitungan lebih mudah.",
      optExp: ["Tidak menambah border.", "Benar.", "Jebakan: margin tidak pernah termasuk.", "Padding tetap ada."] },
    { q: "Flexbox paling tepat digambarkan sebagai sistem layout …",
      opts: ["Dua dimensi (baris dan kolom sekaligus)", "Satu dimensi (baris atau kolom)", "Berbasis tabel", "Berbasis float"], ans: 1,
      exp: "Flexbox = 1 dimensi; Grid = 2 dimensi.",
      optExp: ["Itu Grid.", "Benar.", "Bukan.", "Flexbox justru pengganti float."] },
    { q: "Properti Flexbox untuk mengatur distribusi elemen di sumbu utama adalah …",
      opts: ["align-items", "flex-direction", "justify-content", "flex-wrap"], ans: 2,
      exp: "justify-content (flex-start, center, space-between, ...).",
      optExp: ["Untuk sumbu silang.", "Menentukan arah sumbu.", "Benar.", "Mengatur boleh/tidaknya turun baris."] },
    { q: "Agar tiga item flex mengambil ruang yang sama besar, setiap item diberi …",
      opts: ["`order: 1`", "`flex: 1`", "`gap: 1`", "`flex-direction: row`"], ans: 1,
      exp: "flex: 1 membuat item tumbuh sama rata.",
      optExp: ["Order mengatur urutan.", "Benar.", "Gap di container, dan butuh satuan.", "Itu arah, properti container."] },
    { q: "Kode `grid-template-columns: 1fr 1fr;` menghasilkan …",
      opts: ["Satu kolom penuh", "Dua kolom dengan lebar sama", "Dua baris dengan tinggi sama", "Dua kolom selebar 1px"], ans: 1,
      exp: "fr = bagian dari sisa ruang; 1fr 1fr = dua kolom sama lebar.",
      optExp: ["Ada dua nilai, jadi dua kolom.", "Benar.", "Itu grid-template-rows.", "fr bukan pixel."] },
    { q: "Pada layout dua kolom modul, properti yang membuat kolom turun ke bawah saat layar sempit adalah …",
      opts: ["`flex-wrap: wrap`", "`justify-content: center`", "`border-collapse: collapse`", "`box-shadow`"], ans: 0,
      exp: "flex-wrap: wrap (dibantu min-width: 300px).",
      optExp: ["Benar.", "Hanya meratakan ke tengah.", "Untuk garis tabel.", "Hanya bayangan."] },
    { q: "Untuk memusatkan `.container` yang memiliki `max-width: 1000px`, digunakan …",
      opts: ["`text-align: center`", "`margin: 0 auto`", "`padding: auto`", "`align-items: center`"], ans: 1,
      exp: "Margin kiri-kanan auto membagi sisa ruang sama rata.",
      optExp: ["Hanya memusatkan teks/inline di dalamnya.", "Benar.", "Padding tidak menerima auto.", "Itu properti flex container untuk anak-anaknya."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 4*
📚 *Layout CSS: Box Model, Flexbox & Grid*

1️⃣ *Box Model* (dalam → luar): content (width/height) → padding → border → margin.
• padding: 10px 20px = atas-bawah 10, kiri-kanan 20 • margin: 0 auto = ke tengah.
• content-box (default): width + padding + border (200+20+4 = 224px).
• border-box: width sudah termasuk padding & border. Untuk semua elemen: *, *::before, *::after { box-sizing: border-box; }

2️⃣ *Flexbox* (1 dimensi): container display:flex • flex-direction (row/column) • justify-content (sumbu utama: flex-start, center, space-between…) • align-items (sumbu silang) • flex-wrap • gap. Item: flex:1, order.

3️⃣ *Grid* (2 dimensi): display:grid • grid-template-columns (1fr 1fr) • grid-template-rows • gap. Item: grid-column (span 2), grid-row.

4️⃣ *Kapan:* Flexbox → navigasi, form, tombol • Grid → dashboard/kerangka halaman.

5️⃣ *Layout 2 kolom:* .container {display:flex; gap:1rem; flex-wrap:wrap; max-width:1000px; margin:0 auto} • kolom {flex:1; min-width:300px}.`
});
