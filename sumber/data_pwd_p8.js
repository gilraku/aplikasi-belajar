// Pemrograman Web Dinamis — Pertemuan 8: UTS (Ujian CPMK, materi pertemuan 1–8)
// Halaman persiapan: rangkuman, kuis campuran, dan latihan proyek. Bukan soal ujian asli.
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

const P = ["P1 Konsep web & HTML", "P2 Semantik, form, tabel", "P3 CSS dasar", "P4 Box model, Flexbox, Grid", "P5 Responsif", "P6 JavaScript dasar", "P7 DOM"];

const STARTER = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Latihan UTS</title>
    <style>
        /* Tulis CSS di sini */

    </style>
</head>
<body>
    <!-- Bangun halaman sesuai misi di bawah editor -->

    <script>
        // Tulis JavaScript di sini

    </script>
</body>
</html>`;

const SOLUSI = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Mahasiswa</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: Arial, sans-serif; margin: 0; background-color: #f4f4f4; color: #333; }
        header { background-color: #005566; color: white; padding: 1rem; text-align: center; }
        nav ul { list-style: none; padding: 0; margin: 0; display: flex; justify-content: center; gap: 1rem; background: #e0f2f1; }
        nav a { display: block; padding: 0.6rem; color: #005566; text-decoration: none; }
        .container { display: flex; gap: 1rem; flex-wrap: wrap; max-width: 1000px; margin: 1rem auto; padding: 0 1rem; }
        .container section { flex: 1; min-width: 280px; background: white; padding: 1rem; border-radius: 8px; }
        label { display: block; margin-top: 0.6rem; }
        input, select { width: 100%; padding: 5px; border-radius: 5px; border: 1px solid #ccc; }
        button { margin-top: 0.8rem; padding: 0.6rem 1rem; border: none; border-radius: 5px; background: #4CAF50; color: white; cursor: pointer; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #e0f7fa; }
        footer { text-align: center; color: #666; padding: 1rem; }
        @media (max-width: 600px) {
            nav ul { flex-direction: column; gap: 0; }
            button { width: 100%; }
        }
    </style>
</head>
<body>
    <header>
        <h1>Data Mahasiswa</h1>
        <p>Selamat datang di aplikasi data mahasiswa sederhana.</p>
    </header>
    <nav>
        <ul>
            <li><a href="#form">Input Data</a></li>
            <li><a href="#tabel">Daftar</a></li>
        </ul>
    </nav>
    <main class="container">
        <section id="form">
            <h2>Input Data</h2>
            <form id="form-mhs">
                <label for="nim">NIM</label>
                <input type="text" id="nim" name="nim" required>
                <label for="nama">Nama</label>
                <input type="text" id="nama" name="nama" required>
                <label for="jurusan">Jurusan</label>
                <select id="jurusan" name="jurusan" required>
                    <option value="">Pilih Jurusan</option>
                    <option>Sistem Informasi</option>
                    <option>Teknik Informatika</option>
                </select>
                <button type="button" id="tambah-btn">Tambah</button>
            </form>
        </section>
        <section id="tabel">
            <h2>Daftar Mahasiswa</h2>
            <table>
                <thead>
                    <tr><th>NIM</th><th>Nama</th><th>Jurusan</th><th>Aksi</th></tr>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
            <p id="jumlah">Jumlah: 0</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Universitas Contoh</p>
    </footer>
    <script>
        const tbody = document.getElementById("tbody");
        const jumlah = document.getElementById("jumlah");

        function hitung() {
            jumlah.textContent = "Jumlah: " + tbody.children.length;
        }

        document.getElementById("tambah-btn").addEventListener("click", function() {
            const nim = document.getElementById("nim").value.trim();
            const nama = document.getElementById("nama").value.trim();
            const jurusan = document.getElementById("jurusan").value;

            if (!nim || !nama || !jurusan) {
                alert("Harap isi semua field!");
                return;
            }
            if (!/^[0-9]+$/.test(nim)) {
                alert("NIM hanya boleh berisi digit 0–9.");
                return;
            }

            const tr = document.createElement("tr");
            [nim, nama, jurusan].forEach(function(isi) {
                const td = document.createElement("td");
                td.textContent = isi;
                tr.appendChild(td);
            });
            const aksi = document.createElement("td");
            const hapus = document.createElement("button");
            hapus.textContent = "Hapus";
            hapus.addEventListener("click", function() {
                tr.remove();
                hitung();
            });
            aksi.appendChild(hapus);
            tr.appendChild(aksi);

            tbody.appendChild(tr);
            document.getElementById("form-mhs").reset();
            hitung();
        });
    </script>
</body>
</html>`;

module.exports = fix({
  id: "p8",
  nomor: 8,
  judul: "UTS: Ujian CPMK (Materi Pertemuan 1–8)",
  ujian: "UTS",
  hero: {
    badge: "Pertemuan 8 • UTS Pemrograman Web Dinamis",
    title: "Siap Ujian CPMK: Ulang Semua Materi, Lalu Coba Proyek Latihan",
    text: "Ujian CPMK diambil dari materi pertemuan 1–8, hanya <strong>1 kali kesempatan</strong>, dan bisa berbentuk <strong>proyek</strong>. Halaman ini berisi peta materi P1–P7, bank soal UTS 68 soal pilihan ganda 5 opsi (seperti format Penugasan 1), dan <strong>latihan proyek gabungan</strong> HTML + CSS + JavaScript. Latihan ini <strong>bukan soal ujian asli</strong>, hanya pemanasan."
  },
  cheatsheet: [
    {
      type: "callout",
      label: "Sebelum Mulai",
      tone: "info",
      heading: "Hanya 1 kali mengerjakan, jadi persiapkan dulu",
      html: "Sesuai pesan dosen: <strong>berdoa dulu</strong> sebelum mengerjakan, dan pastikan materi pertemuan 1–8 sudah dipahami. Ujian bisa berupa proyek, jadi siapkan laptop, teks editor (VS Code) dan browser, serta pastikan koneksi stabil sebelum membuka soal."
    },
    {
      type: "table",
      label: "Peta Materi • P1–P7",
      title: "Apa yang Harus Dikuasai dari Tiap Pertemuan",
      desc: "Klik tombol untuk poin yang paling sering jadi jebakan. Materi lengkap ada di halaman tiap pertemuan.",
      headers: ["Pertemuan", "Inti materi", "Wajib bisa"],
      rows: [
        ["P1", "Internet, web, HTTP, URL/URI, statis vs dinamis, domain & hosting, dasar HTML", "Struktur `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`; tag h1–h6, p, a, ul/ol"],
        ["P2", "HTML5 semantik, form & jenis input, tabel", "header/nav/main/section/footer; label `for` = id; required, min/max; table > tr > th/td"],
        ["P3", "CSS: 3 cara pasang, selector, property & value", "Inline/internal/external; `.class` vs `#id`; prioritas inline > id > class > tag"],
        ["P4", "Box model, Flexbox, Grid", "content → padding → border → margin; `display:flex` + justify-content/align-items; `grid-template-columns`"],
        ["P5", "Desain responsif", "`@media (max-width: 600px)`; breakpoint 600/1024; unit %, vw, vh, rem, em; meta viewport"],
        ["P6", "JavaScript dasar", "let/const; 5 tipe data; `===`; alert/prompt/console.log; addEventListener; `.value`"],
        ["P7", "Manipulasi DOM", "getElementById/querySelector(All); textContent/innerHTML; style; createElement + appendChild; remove"]
      ],
      modes: [
        { label: "Jebakan P2", target: "row", row: 1, title: "GET vs POST, disabled vs readonly", text: "GET = data tampil di URL; POST = di body (untuk simpan data/password). <code>disabled</code> tidak ikut terkirim, <code>readonly</code> tetap terkirim. Input tanpa <code>name</code> tidak terkirim." },
        { label: "Jebakan P4", target: "row", row: 3, title: "Hitung lebar content-box", text: "width 200 + padding 10 kiri-kanan (20) + border 2 kiri-kanan (4) = <strong>224px</strong>. Dengan <code>box-sizing: border-box</code> tetap 200px." },
        { label: "Jebakan P6", target: "row", row: 5, title: "== vs === dan prompt", text: "<code>5 == \"5\"</code> true, <code>5 === \"5\"</code> false. Hasil prompt selalu string: \"2\" + \"3\" = \"23\"." },
        { label: "Jebakan P7", target: "row", row: 6, title: "# dan null", text: "<code>getElementById(\"nim\")</code> tanpa #, <code>querySelector(\"#nim\")</code> pakai #. Elemen tidak ditemukan → null → error “Cannot read properties of null”." }
      ]
    },
    {
      type: "cards",
      label: "Strategi Ujian Proyek",
      title: "Cara Mengerjakan Proyek agar Nilai Aman",
      cols: 3,
      items: [
        { badge: "1. Baca", tone: "indigo", title: "Ubah soal jadi checklist", text: "Tulis tiap syarat (judul, jumlah kolom tabel, jenis input, nama file) lalu centang satu per satu." },
        { badge: "2. Struktur dulu", tone: "sky", title: "HTML → CSS → JS", text: "Pastikan semua elemen yang diminta ada dulu. Tampilan & interaktivitas menyusul; nilai struktur tidak hilang walau waktu habis." },
        { badge: "3. Simpan sering", tone: "emerald", title: "Ctrl+S & refresh", text: "Cek di browser setiap beberapa langkah, bukan di akhir." },
        { badge: "4. F12", tone: "amber", title: "Lihat Console", text: "Kalau tombol tidak bereaksi, buka F12 → Console. Error merah menunjukkan baris yang salah." },
        { badge: "5. Nama file", tone: "rose", title: "Sesuai format dosen", text: "Contoh tugas sebelumnya: <code>namamahasiswa_nim.html</code>, <code>css_namamahasiswa_nim.html</code>. Cek ekstensi benar <code>.html</code>, bukan <code>.html.txt</code>." },
        { badge: "6. Uji ulang", tone: "slate", title: "Sebelum upload", text: "Buka file hasil akhir sekali lagi dari folder (bukan dari editor), pastikan CSS/JS terpasang dan tidak ada error." }
      ]
    }
  ],
  simulator: [
    {
      type: "playground",
      label: "Latihan Proyek • Gabungan P1–P7",
      title: "Mini Aplikasi Data Mahasiswa",
      desc: "Bangun dari halaman kosong. Pakai tombol 📱 untuk cek tampilan HP dan panel Console untuk cek JavaScript. Untuk uji otomatis, pakai ID nim, nama, jurusan, dan tambah-btn pada kontrol, lalu gunakan tbody untuk baris data. Coba sendiri sebelum membuka contoh jawaban.",
      file: "latihan_uts.html",
      js: true,
      assessment: "student-app",
      devices: true,
      starter: STARTER,
      solution: SOLUSI,
      tasks: [
        { label: "P5: ada `<meta name=\"viewport\">`", sel: "meta[name=viewport]" },
        { label: "P2: elemen semantik header, nav, main, section (≥2), footer", elements: [["body header"], ["body nav"], ["body main"], ["body section", 2], ["body footer"]] },
        { label: "P2: form dengan input NIM, Nama, dan select Jurusan yang memakai label", elements: [["form input#nim"], ["form input#nama"], ["form select#jurusan"], ["form label[for=nim]"], ["form label[for=nama]"], ["form label[for=jurusan]"]] },
        { label: "P2: tabel dengan thead (≥3 kolom) dan tbody ber-id", elements: [["table thead th", 3], ["table tbody[id]"]] },
        { label: "P3/P4: CSS memakai `display: flex` atau `display: grid`", regex: "<style[\\s\\S]*display\\s*:\\s*(flex|grid)[\\s\\S]*</style>" },
        { label: "P4: ada `padding` dan `border` di CSS", regex: "<style[\\s\\S]*(padding[\\s\\S]*border|border[\\s\\S]*padding)[\\s\\S]*</style>" },
        { label: "P5: ada media query untuk layar ≤ 600px", regex: "@media\\s*\\(\\s*max-width\\s*:\\s*600px" },
        { label: "P6: tombol memakai `addEventListener(\"click\", ...)`", regex: "addEventListener\\s*\\(\\s*[\"'`]click" },
        { label: "P6: validasi field kosong dengan `alert`", behavior: "empty", regex: "<script[\\s\\S]*(!\\s*\\w+\\s*\\|\\||&&)[\\s\\S]*alert\\s*\\(" },
        { label: "P6: NIM hanya digit, termasuk yang diawali nol", behavior: "nim" },
        { label: "P7: baris dibuat dengan `createElement(\"tr\")` + `appendChild`", behavior: "add", regex: "createElement\\s*\\(\\s*[\"'`]tr[\"'`]\\s*\\)[\\s\\S]*appendChild" },
        { label: "P7: data ditulis dengan `textContent` (aman dari XSS)", behavior: "text", regex: "textContent\\s*=" },
        { label: "Bonus: tiap baris bisa dihapus dengan `.remove()`", behavior: "remove", regex: "\\.remove\\s*\\(\\s*\\)" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan • Ini Materi Pertemuan Berapa?",
      title: "Cocokkan Konsep dengan Pertemuannya",
      headers: ["Konsep", "Pertemuan"],
      rows: [
        { cells: ["Perbedaan URL dan URI"], fields: [{ options: P, answer: P[0] }], ok: "✓" },
        { cells: ["`<input type=\"number\" min=\"17\" max=\"100\">`"], fields: [{ options: P, answer: P[1] }], ok: "✓" },
        { cells: ["`<link rel=\"stylesheet\" href=\"style.css\">`"], fields: [{ options: P, answer: P[2] }], ok: "✓" },
        { cells: ["`justify-content: space-between`"], fields: [{ options: P, answer: P[3] }], ok: "✓" },
        { cells: ["`h1 { font-size: 5vw; }`"], fields: [{ options: P, answer: P[4] }], ok: "✓" },
        { cells: ["`let nama = prompt(\"Nama?\");`"], fields: [{ options: P, answer: P[5] }], ok: "✓" },
        { cells: ["`document.createElement(\"li\")`"], fields: [{ options: P, answer: P[6] }], ok: "✓" },
        { cells: ["Domain `.ac.id` dan hosting VPS"], fields: [{ options: P, answer: P[0] }], ok: "✓" },
        { cells: ["Selector `#header` lebih kuat dari `.judul`"], fields: [{ options: P, answer: P[2] }], ok: "✓" }
      ]
    }
  ],
  flashcards: [
    { tag: "P1", q: "Beda web statis dan dinamis?", a: "Statis: konten tetap, hanya proses link. Dinamis: konten berubah dan diproses di server (PHP, ASP, JSP)." },
    { tag: "P1", q: "Struktur dasar dokumen HTML?", a: "`<!DOCTYPE html>` → `<html>` → `<head>` (title, meta) + `<body>` (isi)." },
    { tag: "P2", q: "Elemen semantik HTML5 & fungsinya?", a: "header (atas), nav (menu), main (isi utama), section (kelompok), article (mandiri), aside (samping), footer (bawah)." },
    { tag: "P2", q: "GET vs POST?", a: "GET: data di URL (pencarian). POST: data di body request (simpan data, password)." },
    { tag: "P3", q: "3 cara memasang CSS?", a: "Inline (`style=\"\"`), internal (`<style>` di head), external (`<link rel=\"stylesheet\">`, terbaik)." },
    { tag: "P3", q: "Urutan prioritas selector?", a: "Inline > id > class > tag > universal. Seri → yang ditulis terakhir menang." },
    { tag: "P4", q: "Urutan box model dari dalam ke luar?", a: "content → padding → border → margin." },
    { tag: "P4", q: "Flexbox vs Grid?", a: "Flexbox 1 dimensi (baris ATAU kolom: nav, form). Grid 2 dimensi (baris DAN kolom: dashboard)." },
    { tag: "P5", q: "Breakpoint modul?", a: "Mobile ≤600px, tablet 601–1024px, desktop ≥1025px." },
    { tag: "P5", q: "rem vs em?", a: "rem relatif ke font `html` (root); em relatif ke font induk." },
    { tag: "P6", q: "let vs const?", a: "let bisa diisi ulang; const tidak." },
    { tag: "P6", q: "Menjalankan kode saat tombol diklik?", a: "`btn.addEventListener(\"click\", function() { ... });`" },
    { tag: "P7", q: "Menambah baris ke tabel?", a: "`const tr = document.createElement(\"tr\");` → isi td → `tbody.appendChild(tr);`" },
    { tag: "P7", q: "textContent vs innerHTML?", a: "textContent = teks apa adanya (aman). innerHTML = dibaca sebagai HTML (risiko XSS untuk input pengguna)." }
  ],
  quiz: require("./data_pwd_p8_quiz.js"),
  ringkasan: `*RANGKUMAN KILAT UTS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 1–7*
📝 *Ujian CPMK: 1x kesempatan, bisa berbentuk proyek. Berdoa dulu!*

P1 • Web & HTML: HTTP, URL⊂URI, statis vs dinamis, client side (HTML/CSS/JS) vs server side (PHP), domain (ccTLD/gTLD), hosting, struktur <!DOCTYPE html><html><head><body>.
P2 • Semantik & form: header nav main section article aside footer • form action/method (GET di URL, POST di body) • input text/email/number/date/radio/checkbox • label for=id • required/min/max • table tr th td.
P3 • CSS: inline/internal/external • selector { property: value; } • tag, .class, #id • prioritas inline > id > class > tag.
P4 • Layout: content → padding → border → margin (content-box: 200+20+4=224) • border-box • flex (justify-content, align-items, gap, wrap) • grid (grid-template-columns 1fr 1fr).
P5 • Responsif: meta viewport • @media (max-width:600px) • tablet 601–1024 • %, vw, vh, rem, em • img {max-width:100%}.
P6 • JS: let/const • string number boolean array object • === • alert/prompt/console.log • addEventListener("click") • .value • prompt = string.
P7 • DOM: getElementById (tanpa #) / querySelector(All) • textContent vs innerHTML (XSS) • style.backgroundColor • setAttribute • createElement + appendChild • remove • tbody.innerHTML = "".`
});
