// Pemrograman Web Dinamis — Pertemuan 7: Manipulasi DOM
// Sumber: Modul JS 7. Bagian "➕ Tambahan" bukan dari modul.
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

const MTD = ["getElementById", "querySelector", "querySelectorAll", "textContent", "innerHTML", "style", "setAttribute", "getAttribute", "createElement", "appendChild", "remove"];

const CSS = `        body { font-family: Arial, sans-serif; margin: 2rem; background-color: #f4f4f4; box-sizing: border-box; transition: background-color 0.3s; }
        header { background-color: #005566; color: white; padding: 1rem; text-align: center; }
        nav ul { list-style-type: none; padding: 0; display: flex; justify-content: center; }
        nav ul li { margin: 0 1rem; }
        nav ul li a { text-decoration: none; color: #333; }
        .container { max-width: 800px; margin: 2rem auto; }
        form { background-color: white; padding: 1.5rem; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        label { display: block; margin-bottom: 0.5rem; }
        input, select { width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        button { background-color: #4CAF50; color: white; padding: 0.8rem; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.5rem; }
        button:hover { background-color: #45a049; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: white; }
        th, td { border: 1px solid #ccc; padding: 0.8rem; text-align: left; }
        th { background-color: #f0f0f0; }
        footer { text-align: center; margin-top: 2rem; color: #666; }`;

const HEAD = t => `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t}</title>
    <!-- Di laptop: <style> ini = file .css terpisah -->
    <style>
${CSS}
    </style>
</head>
<body>
    <header>
        <h1>Sistem Manajemen Mahasiswa</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Beranda</a></li>
            <li><a href="#pendaftaran">Pendaftaran</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>`;

const FOOT = `    <footer>
        <p>&copy; 2025 Universitas Contoh</p>
    </footer>`;

const THEME_BODY = `    <div class="container">
        <main>
            <section>
                <h2>Form Pendaftaran</h2>
                <form id="form-mahasiswa">
                    <label for="nim">NIM:</label>
                    <input type="text" id="nim" name="nim" placeholder="Masukkan NIM" required>
                    <label for="nama">Nama:</label>
                    <input type="text" id="nama" name="nama" placeholder="Masukkan Nama" required>
                    <button type="button" id="theme-btn">Ganti Tema</button>
                </form>
            </section>
        </main>
    </div>`;

const THEME_JS = `        const themeBtn = document.getElementById("theme-btn");
        let isDarkTheme = false;

        themeBtn.addEventListener("click", function() {
            isDarkTheme = !isDarkTheme;
            const body = document.querySelector("body");
            const form = document.querySelector("form");
            const header = document.querySelector("header");
            if (isDarkTheme) {
                body.style.backgroundColor = "#333";
                form.style.backgroundColor = "#444";
                header.style.backgroundColor = "#222";
            } else {
                body.style.backgroundColor = "#f4f4f4";
                form.style.backgroundColor = "white";
                header.style.backgroundColor = "#005566";
            }
            console.log("Tema gelap aktif?", isDarkTheme);
        });`;

const THEME_JS_SOLUSI = `        const themeBtn = document.getElementById("theme-btn");
        let isDarkTheme = false;

        themeBtn.addEventListener("click", function() {
            isDarkTheme = !isDarkTheme;
            const body = document.querySelector("body");
            const form = document.querySelector("form");
            const header = document.querySelector("header");
            const navLinks = document.querySelectorAll("nav a");
            if (isDarkTheme) {
                body.style.backgroundColor = "#333";
                form.style.backgroundColor = "#444";
                header.style.backgroundColor = "#222";
                navLinks.forEach(link => link.style.color = "#f4f4f4");
                themeBtn.textContent = "Tema Terang";
            } else {
                body.style.backgroundColor = "#f4f4f4";
                form.style.backgroundColor = "white";
                header.style.backgroundColor = "#005566";
                navLinks.forEach(link => link.style.color = "#333");
                themeBtn.textContent = "Tema Gelap";
            }
            console.log("Tema gelap aktif?", isDarkTheme);
        });`;

const THEME = js => `${HEAD("Ganti Tema")}
${THEME_BODY}
${FOOT}
    <!-- Di laptop: <script src="theme-switch.js"></script> -->
    <script>
${js}
    </script>
</body>
</html>`;

const DOM_BODY = `    <div class="container">
        <main>
            <section>
                <h2>Form Pendaftaran</h2>
                <form id="form-mahasiswa">
                    <label for="nim">NIM:</label>
                    <input type="text" id="nim" name="nim" placeholder="Masukkan NIM" required>
                    <label for="nama">Nama:</label>
                    <input type="text" id="nama" name="nama" placeholder="Masukkan Nama" required>
                    <label for="jurusan">Jurusan:</label>
                    <select id="jurusan" name="jurusan" required>
                        <option value="">Pilih Jurusan</option>
                        <option value="Sistem Informasi">Sistem Informasi</option>
                        <option value="Teknik Informatika">Teknik Informatika</option>
                        <option value="Manajemen">Manajemen</option>
                    </select>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="contoh@domain.com" required>
                    <button type="button" id="add-btn">Tambah Data</button>
                    <button type="button" id="clear-btn">Hapus Semua</button>
                </form>
            </section>
            <section>
                <h2>Data Mahasiswa</h2>
                <table id="data-table">
                    <thead>
                        <tr>
                            <th>NIM</th>
                            <th>Nama</th>
                            <th>Jurusan</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody id="table-body"></tbody>
                </table>
            </section>
        </main>
    </div>`;

const DOM_STARTER = `${HEAD("Manipulasi DOM")}
${DOM_BODY}
${FOOT}
    <!-- Di laptop: <script src="dom-manipulation.js"></script> -->
    <script>
        // Tulis kodemu di sini:
        // 1) ambil tombol Tambah Data, tombol Hapus Semua, dan tbody (id="table-body")
        // 2) Tambah Data: jika semua field terisi, buat <tr> baru berisi 4 <td>,
        //    masukkan ke tbody, lalu kosongkan form
        // 3) Hapus Semua: kosongkan isi tbody lalu tampilkan alert

    </script>
</body>
</html>`;

const DOM_SOLUSI = `${HEAD("Manipulasi DOM")}
${DOM_BODY}
${FOOT}
    <!-- Di laptop: <script src="dom-manipulation.js"></script> -->
    <script>
        const addBtn = document.getElementById("add-btn");
        const clearBtn = document.getElementById("clear-btn");
        const tableBody = document.getElementById("table-body");

        addBtn.addEventListener("click", function() {
            const nim = document.getElementById("nim").value;
            const nama = document.getElementById("nama").value;
            const jurusan = document.getElementById("jurusan").value;
            const email = document.getElementById("email").value;
            if (nim && nama && jurusan && email) {
                const row = document.createElement("tr");
                // Lebih aman daripada innerHTML: isi tiap sel dengan textContent
                [nim, nama, jurusan, email].forEach(function(isi) {
                    const td = document.createElement("td");
                    td.textContent = isi;
                    row.appendChild(td);
                });
                tableBody.appendChild(row);
                document.getElementById("form-mahasiswa").reset();
                console.log("Baris ditambah. Total:", tableBody.children.length);
            } else {
                alert("Harap isi semua field!");
            }
        });

        clearBtn.addEventListener("click", function() {
            tableBody.innerHTML = "";
            alert("Semua data telah dihapus!");
        });
    </script>
</body>
</html>`;

const XSS = `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>innerHTML vs textContent</title>
<style>body{font-family:Arial,sans-serif;margin:1.5rem} .box{border:1px solid #ccc;padding:.6rem;margin:.4rem 0;border-radius:6px;min-height:1.5rem} input{width:100%;padding:.5rem;box-sizing:border-box}</style>
</head>
<body>
    <label>Ketik nama (coba juga: &lt;b&gt;Budi&lt;/b&gt; atau &lt;img src=x onerror="alert('diretas!')"&gt;)</label>
    <input id="input" value="<b>Budi</b>">
    <p>Pakai <b>innerHTML</b>:</p>
    <div class="box" id="hasil-html"></div>
    <p>Pakai <b>textContent</b>:</p>
    <div class="box" id="hasil-text"></div>
    <script>
        const input = document.getElementById("input");
        function tampil() {
            document.getElementById("hasil-html").innerHTML = input.value;   // tag dijalankan!
            document.getElementById("hasil-text").textContent = input.value; // tampil apa adanya
        }
        input.addEventListener("input", tampil);
        tampil();
    </script>
</body>
</html>`;

module.exports = fix({
  id: "p7",
  nomor: 7,
  judul: "Manipulasi DOM: Seleksi, Ubah, Tambah & Hapus Elemen",
  ujian: "UTS",
  hero: {
    badge: "Materi 7 • Pemrograman Web Dinamis",
    title: "JavaScript yang Mengubah Halaman Secara Langsung",
    text: "Pahami <strong>DOM</strong> sebagai pohon node, cara <strong>memilih elemen</strong> (<code>getElementById</code>, <code>querySelector</code>, <code>querySelectorAll</code>), <strong>mengubah konten, style, atribut</strong>, serta <strong>menambah/menghapus elemen</strong>: dasar fitur Create & Delete pada proyek CRUD. ➕ Termasuk koreksi keamanan: contoh tugas modul memasukkan input pengguna lewat <code>innerHTML</code>."
  },
  cheatsheet: [
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "code",
          label: "Interaktif 1 • Pengenalan DOM",
          title: "HTML …",
          file: "index.html",
          code: "<html>\n    <head>\n        <title>Contoh</title>\n    </head>\n    <body>\n        <h1>Judul</h1>\n        <p id=\"paragraf\">Teks</p>\n    </body>\n</html>"
        },
        {
          type: "code",
          title: "… menjadi pohon DOM",
          file: "struktur DOM",
          code: "Document\n└── html\n    ├── head\n    │   └── title\n    └── body\n        ├── h1\n        └── p (id=\"paragraf\")",
          note: "DOM (Document Object Model) = representasi terstruktur dokumen HTML. Setiap elemen adalah <strong>node</strong>. JavaScript memakai DOM untuk mengubah konten, mengubah style, dan menambah/menghapus elemen."
        }
      ]
    },
    {
      type: "table",
      label: "Interaktif 2 • Seleksi Elemen",
      title: "3 Cara Memilih Elemen",
      headers: ["Metode", "Memilih berdasarkan", "Contoh", "Hasil"],
      rows: [
        ["`getElementById`", "Atribut id (tanpa #)", "`document.getElementById(\"my-heading\")`", "1 elemen / null"],
        ["`querySelector`", "Selector CSS (#id, .class, tag, atribut)", "`document.querySelector(\".btn\")`", "Elemen <strong>pertama</strong> yang cocok / null"],
        ["`querySelectorAll`", "Selector CSS", "`document.querySelectorAll(\"li\")`", "<strong>NodeList</strong> semua yang cocok"]
      ],
      modes: [
        { label: "Contoh querySelector", target: "row", row: 1, title: "Selector CSS apa saja", text: "<code>querySelector(\"#my-paragraf\")</code> (ID) • <code>querySelector(\".btn\")</code> (class) • <code>querySelector(\"input[name='nama']\")</code> (atribut)." },
        { label: "Loop NodeList", target: "row", row: 2, title: "forEach", text: "<code>items.forEach(item => console.log(item.textContent));</code>" },
        { label: "➕ Jebakan #", target: "row", row: 0, title: "Jangan tulis # di getElementById", text: "<code>getElementById(\"#nim\")</code> → null. Yang benar <code>getElementById(\"nim\")</code>. Tanda <code>#</code> hanya untuk querySelector." },
        { label: "➕ NodeList ≠ array", target: "row", row: 2, title: "Tidak bisa langsung .style", text: "<code>querySelectorAll(\"li\").style.color = \"red\"</code> tidak berefek/error. Ubah satu per satu dengan <code>forEach</code>. NodeList punya forEach, tapi tidak punya <code>map</code>/<code>filter</code> (ubah dulu: <code>Array.from(list)</code>)." },
        { label: "Saran modul", target: "none", title: "Praktik terbaik", text: "getElementById untuk seleksi cepat berdasarkan ID unik; querySelector untuk fleksibilitas selector CSS." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Mengubah Elemen",
      title: "Konten, Style, Atribut",
      headers: ["Tujuan", "Kode"],
      rows: [
        ["Ubah teks", "`el.textContent = \"Judul Baru\";`"],
        ["Ubah isi HTML", "`el.innerHTML = \"<p>Teks Baru</p>\";`"],
        ["Ubah style", "`el.style.color = \"blue\";` • `el.style.backgroundColor = \"#f0f0f0\";`"],
        ["Atur atribut", "`el.setAttribute(\"placeholder\", \"Masukkan teks\");`"],
        ["Baca atribut", "`let ph = el.getAttribute(\"placeholder\");`"]
      ],
      modes: [
        { label: "textContent vs innerHTML", target: "row", row: 1, title: "Bedanya", text: "<code>textContent</code> menampilkan teks apa adanya (tag ikut tampil sebagai tulisan). <code>innerHTML</code> membaca tag sebagai HTML. Modul: “hati-hati dengan keamanan”. Lihat demo di bawah." },
        { label: "➕ camelCase", target: "row", row: 2, title: "Nama properti style", text: "CSS <code>background-color</code> → JS <code>style.backgroundColor</code>; <code>font-size</code> → <code>style.fontSize</code>. Nilai berupa string, termasuk satuan: <code>style.width = \"50%\"</code>." },
        { label: "➕ classList", target: "row", row: 2, title: "Lebih rapi: ganti class", text: "Simpan gaya di CSS (<code>.dark { ... }</code>) lalu <code>document.body.classList.toggle(\"dark\")</code>. Ada juga <code>classList.add</code>, <code>remove</code>, <code>contains</code>." }
      ]
    },
    {
      type: "flow",
      label: "Interaktif 4 • Menambah & Menghapus Elemen",
      title: "Pola Create → Isi → Tempel",
      items: ["createElement(\"li\")", "textContent = \"Item Baru\"", "appendChild ke induk"],
      note: "<code>const newItem = document.createElement(\"li\");</code><br><code>newItem.textContent = \"Item Baru\";</code><br><code>document.querySelector(\"ul\").appendChild(newItem);</code><br>Menghapus: <code>document.getElementById(\"old-item\").remove();</code> • Mengosongkan isi: <code>tbody.innerHTML = \"\";</code>"
    },
    {
      type: "playground",
      label: "➕ Tambahan • Keamanan (XSS)",
      title: "Demo: innerHTML vs textContent",
      desc: "Contoh tugas modul memasukkan input form ke tabel memakai <code>row.innerHTML</code> berisi <code><td>${nim}</td></code> dan seterusnya. Jika pengguna mengetik tag HTML, tag itu <strong>dijalankan</strong>. Inilah celah <strong>XSS</strong> (Cross-Site Scripting). Ubah isi kotak input dan bandingkan kedua hasilnya.",
      file: "xss-demo.html",
      js: true,
      starter: XSS,
      tasks: [
        { label: "Ganti `.innerHTML = input.value` menjadi `.textContent` agar kedua kotak sama-sama aman", regex: "^(?![\\s\\S]*innerHTML\\s*=\\s*input\\.value)[\\s\\S]*hasil-html\"\\)\\.textContent" }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Error Paling Sering",
      tone: "warning",
      heading: "“Cannot read properties of null (reading 'addEventListener')”",
      html: "Artinya elemen yang dicari <strong>tidak ditemukan</strong> (hasil <code>null</code>). Penyebab: (1) id salah ketik atau beda huruf besar/kecil, (2) memakai <code>#</code> di getElementById, (3) <code><script></code> dijalankan sebelum elemennya ada. Solusi (3): taruh script di akhir <code><body></code>, pakai <code>defer</code>, atau <code>document.addEventListener(\"DOMContentLoaded\", function() { ... });</code>. Cek di <strong>F12 → Console</strong>; nomor barisnya ditampilkan."
    }
  ],
  simulator: [
    {
      type: "playground",
      label: "Praktik 1 • Aktivitas Modul 7",
      title: "Ganti Tema Terang/Gelap",
      desc: "Klik <strong>Ganti Tema</strong> di pratinjau. Lalu kerjakan modifikasi modul: <strong>ubah warna teks nav</strong> saat tema diganti, dan <strong>ubah teks tombol</strong> menjadi “Tema Terang”/“Tema Gelap” sesuai tema aktif.",
      file: "theme-switch.html",
      js: true,
      assessment: "theme",
      starter: THEME(THEME_JS),
      solution: THEME(THEME_JS_SOLUSI),
      tasks: [
        { label: "Pilih elemen/link nav dengan `querySelector`/`querySelectorAll`", regex: "querySelector(All)?\\s*\\(\\s*[\"'`]nav" },
        { label: "Ubah `style.color` untuk nav", behavior: "nav", regex: "\\.style\\.color\\s*=" },
        { label: "Teks tombol jadi “Tema Terang” saat gelap", behavior: "lightLabel", regex: "textContent\\s*=\\s*[\"'`]Tema Terang" },
        { label: "Teks tombol jadi “Tema Gelap” saat terang", behavior: "darkLabel", regex: "textContent\\s*=\\s*[\"'`]Tema Gelap" }
      ]
    },
    {
      type: "playground",
      label: "Tugas Individu • Modul 7",
      title: "Tambah Data & Hapus Semua ke Tabel",
      desc: "Form & tabel kosong sudah disiapkan. Tulis JavaScript-nya: <strong>Tambah Data</strong> menambah baris tabel dari form dengan <code>createElement</code> + <code>appendChild</code>; <strong>Hapus Semua</strong> mengosongkan tabel. Contoh jawaban sudah memakai cara aman <code>textContent</code>. Di laptop, kumpulkan <code>dom-manipulation.html</code>, <code>.css</code>, <code>.js</code>.",
      file: "dom-manipulation.html",
      js: true,
      assessment: "dom-table",
      starter: DOM_STARTER,
      solution: DOM_SOLUSI,
      tasks: [
        { label: "Struktur semantik: header, nav, main, section, footer", elements: [["header"], ["nav"], ["main"], ["section"], ["footer"]] },
        { label: "Tabel punya thead 4 kolom & tbody id=\"table-body\"", elements: [["#data-table thead th", 4], ["#data-table tbody#table-body"]] },
        { label: "Seleksi elemen dengan `getElementById`/`querySelector`", regex: "(getElementById\\s*\\(\\s*[\"'`](add-btn|clear-btn|table-body)|querySelector\\s*\\(\\s*[\"'`]#(add-btn|clear-btn|table-body))" },
        { label: "Membuat baris dengan `createElement(\"tr\")`", behavior: "add", regex: "createElement\\s*\\(\\s*[\"'`]tr[\"'`]" },
        { label: "Menempel baris dengan `appendChild`", behavior: "text", regex: "\\.appendChild\\s*\\(" },
        { label: "Hapus Semua: `innerHTML = \"\"` atau `.remove()`", behavior: "remove", regex: "(innerHTML\\s*=\\s*([\"'`])\\2|\\.remove\\s*\\(\\s*\\))" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 1 • Pilih Method yang Tepat",
      title: "Kebutuhan → Method/Properti DOM",
      headers: ["Kebutuhan", "Method/properti"],
      rows: [
        { cells: ["Mengambil tombol yang punya `id=\"add-btn\"` (tanpa selector CSS)"], fields: [{ options: MTD, answer: "getElementById" }], ok: "✓" },
        { cells: ["Mengambil elemen pertama ber-class `.btn`"], fields: [{ options: MTD, answer: "querySelector" }], ok: "✓" },
        { cells: ["Mengambil semua `<li>` lalu di-loop"], fields: [{ options: MTD, answer: "querySelectorAll" }], ok: "✓" },
        { cells: ["Mengganti tulisan judul menjadi “Judul Baru” (aman)"], fields: [{ options: MTD, answer: "textContent" }], ok: "✓" },
        { cells: ["Mengubah warna latar body"], fields: [{ options: MTD, answer: "style" }], ok: "✓ body.style.backgroundColor" },
        { cells: ["Mengubah placeholder input"], fields: [{ options: MTD, answer: "setAttribute" }], ok: "✓" },
        { cells: ["Membuat elemen `<tr>` baru"], fields: [{ options: MTD, answer: "createElement" }], ok: "✓" },
        { cells: ["Memasukkan `<tr>` baru ke `<tbody>`"], fields: [{ options: MTD, answer: "appendChild" }], ok: "✓" },
        { cells: ["Menghapus satu elemen dari halaman"], fields: [{ options: MTD, answer: "remove" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Tebak Hasil • Seleksi",
      title: "Elemen Mana yang Terpilih?",
      desc: "HTML: <code><ul><li class=\"item\">A</li><li class=\"item aktif\">B</li><li>C</li></ul></code>",
      items: [
        { prompt: "`document.querySelector(\".item\").textContent`", answer: "\"A\"", reason: "querySelector mengambil yang pertama cocok." },
        { prompt: "`document.querySelectorAll(\".item\").length`", answer: "2", reason: "A dan B punya class item." },
        { prompt: "`document.querySelectorAll(\"li\").length`", answer: "3", reason: "Semua li." },
        { prompt: "`document.querySelector(\".aktif\").textContent`", answer: "\"B\"", reason: "Hanya B ber-class aktif." },
        { prompt: "`document.getElementById(\"item\")`", answer: "null", reason: "Tidak ada elemen dengan id=\"item\" (item adalah class)." },
        { prompt: "`document.querySelector(\"ul\").children.length` setelah `appendChild` satu li baru", answer: "4", reason: "Elemen baru ditambahkan di akhir ul." }
      ]
    }
  ],
  flashcards: [
    { tag: "DOM", q: "Apa itu DOM?", a: "Document Object Model: representasi terstruktur (pohon) dokumen HTML. Setiap elemen adalah node yang bisa diakses & diubah JavaScript." },
    { tag: "DOM", q: "3 manfaat DOM menurut modul?", a: "Mengubah konten, mengubah style, menambah/menghapus elemen." },
    { tag: "Seleksi", q: "Beda getElementById dan querySelector?", a: "getElementById memilih berdasarkan id (tanpa #). querySelector memakai selector CSS apa pun (`#id`, `.class`, tag, atribut) dan mengambil elemen pertama." },
    { tag: "Seleksi", q: "querySelectorAll mengembalikan apa?", a: "NodeList berisi semua elemen yang cocok; di-loop dengan `forEach`." },
    { tag: "Konten", q: "Beda textContent dan innerHTML?", a: "textContent = teks apa adanya. innerHTML = dibaca sebagai HTML (hati-hati keamanan: XSS)." },
    { tag: "Style", q: "Cara mengubah warna latar lewat JS?", a: "`el.style.backgroundColor = \"#f0f0f0\";` (camelCase)." },
    { tag: "Atribut", q: "setAttribute vs getAttribute?", a: "`setAttribute(\"placeholder\", \"...\")` mengatur nilai • `getAttribute(\"placeholder\")` membaca nilai." },
    { tag: "Tambah/Hapus", q: "Langkah menambah item ke list?", a: "`createElement(\"li\")` → isi `textContent` → `ul.appendChild(item)`." },
    { tag: "Tambah/Hapus", q: "Cara menghapus elemen / mengosongkan tabel?", a: "`el.remove()` untuk satu elemen • `tbody.innerHTML = \"\"` untuk mengosongkan semua baris." },
    { tag: "CRUD", q: "Hubungan materi ini dengan proyek akhir?", a: "Menambah baris tabel = fungsi Create; menghapus baris = fungsi Delete; ganti tema = peningkatan UX." },
    { tag: "➕ Keamanan", q: "Apa itu XSS dan cara mencegahnya di sini?", a: "Cross-Site Scripting: input pengguna berisi tag/script ikut dijalankan karena dimasukkan via innerHTML. Cegah dengan `textContent` untuk data dari pengguna." },
    { tag: "➕ Error", q: "Arti “Cannot read properties of null”?", a: "Elemen tidak ditemukan: id salah, memakai #, atau script jalan sebelum elemen ada." },
    { tag: "➕ classList", q: "Cara rapi membuat ganti tema?", a: "Tulis gaya `.dark` di CSS, lalu `document.body.classList.toggle(\"dark\")`." }
  ],
  quiz: [
    { q: "DOM merepresentasikan dokumen HTML dalam bentuk …",
      opts: ["Tabel database", "Struktur pohon node", "File CSS", "Daftar URL"], ans: 1,
      exp: "Document → html → head/body → elemen-elemen.",
      optExp: ["Bukan.", "Benar.", "Bukan.", "Bukan."] },
    { q: "Kode untuk memilih elemen dengan id `nim` adalah …",
      opts: ["`document.getElementById(\"#nim\")`", "`document.getElementById(\"nim\")`", "`document.querySelector(\"nim\")`", "`document.querySelectorAll(\".nim\")`"], ans: 1,
      exp: "getElementById tanpa tanda #. Alternatif: querySelector(\"#nim\").",
      optExp: ["Ada # → null.", "Benar.", "Tanpa # berarti mencari tag &lt;nim&gt;.", "Itu mencari class nim."] },
    { q: "`document.querySelector(\".btn\")` akan menghasilkan …",
      opts: ["Semua elemen ber-class btn", "Elemen pertama ber-class btn", "Elemen ber-id btn", "Jumlah elemen ber-class btn"], ans: 1,
      exp: "querySelector mengambil satu elemen pertama yang cocok.",
      optExp: ["Itu querySelectorAll.", "Benar.", "Id memakai #btn.", "Bukan."] },
    { q: "Method yang mengembalikan NodeList berisi semua elemen yang cocok adalah …",
      opts: ["getElementById", "querySelector", "querySelectorAll", "createElement"], ans: 2,
      exp: "items.forEach(item => ...).",
      optExp: ["Satu elemen.", "Satu elemen.", "Benar.", "Membuat elemen baru."] },
    { q: "Untuk menampilkan input pengguna dengan aman (tag HTML tidak dijalankan), sebaiknya memakai …",
      opts: ["innerHTML", "textContent", "outerHTML", "document.write"], ans: 1,
      exp: "➕ textContent mencegah XSS.",
      optExp: ["Tag dijalankan, berisiko.", "Benar.", "Juga membaca HTML.", "Usang dan berisiko."] },
    { q: "Penulisan yang benar untuk mengubah warna latar elemen `header` lewat JavaScript adalah …",
      opts: ["`header.style.background-color = \"#222\";`", "`header.style.backgroundColor = \"#222\";`", "`header.backgroundColor = \"#222\";`", "`header.css(\"background\", \"#222\");`"], ans: 1,
      exp: "Properti style memakai camelCase.",
      optExp: ["Tanda - tidak boleh di nama properti JS.", "Benar.", "Kurang .style.", "Itu gaya jQuery."] },
    { q: "Fungsi `setAttribute(\"placeholder\", \"Masukkan teks\")` digunakan untuk …",
      opts: ["Membaca nilai atribut", "Mengatur nilai atribut", "Menghapus elemen", "Membuat elemen baru"], ans: 1,
      exp: "getAttribute = membaca, setAttribute = mengatur.",
      optExp: ["Itu getAttribute.", "Benar.", "Itu remove().", "Itu createElement()."] },
    { q: "Urutan yang benar untuk menambah baris baru ke tabel adalah …",
      opts: ["appendChild → createElement → isi", "createElement → isi konten → appendChild", "remove → createElement", "getAttribute → appendChild"], ans: 1,
      exp: "Buat elemen, isi, lalu tempel ke induk (tbody).",
      optExp: ["Elemen harus dibuat dulu.", "Benar.", "remove untuk menghapus.", "Tidak membuat elemen."] },
    { q: "Kode `tableBody.innerHTML = \"\";` pada tugas modul berfungsi untuk …",
      opts: ["Menambah satu baris kosong", "Menghapus semua baris di tbody", "Menghapus tabel beserta judulnya", "Mereset form"], ans: 1,
      exp: "Isi tbody dikosongkan, thead tetap.",
      optExp: ["Tidak menambah.", "Benar.", "Hanya isi tbody.", "Itu form.reset()."] },
    { q: "Muncul error “Cannot read properties of null (reading 'addEventListener')”. Penyebab yang PALING mungkin adalah …",
      opts: ["Browser tidak mendukung JavaScript", "Elemen tidak ditemukan karena id salah atau script dijalankan sebelum elemen ada", "Terlalu banyak event listener", "CSS belum dihubungkan"], ans: 1,
      exp: "➕ Periksa ejaan id dan posisi &lt;script&gt; (akhir body / defer).",
      optExp: ["Semua browser modern mendukung.", "Benar.", "Tidak menyebabkan null.", "Tidak terkait."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 7*
📚 *Manipulasi DOM*

1️⃣ *DOM:* representasi pohon dokumen HTML; tiap elemen = node. Manfaat: ubah konten, ubah style, tambah/hapus elemen.

2️⃣ *Seleksi:*
• getElementById("id") → 1 elemen (tanpa #)
• querySelector("#id / .class / tag / [atribut]") → elemen pertama
• querySelectorAll("li") → NodeList, loop dengan forEach

3️⃣ *Ubah:* el.textContent = "..." • el.innerHTML = "<p>..</p>" (hati-hati) • el.style.backgroundColor = "..." (camelCase) • setAttribute / getAttribute

4️⃣ *Tambah/Hapus:* createElement("tr") → isi → parent.appendChild(el) • el.remove() • tbody.innerHTML = ""

5️⃣ *CRUD:* tambah baris = Create, hapus baris = Delete.

6️⃣ *Penting:* input pengguna → textContent (cegah XSS) • error "null" = id salah / script jalan sebelum elemen ada.`
});
