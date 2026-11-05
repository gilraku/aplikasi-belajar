// Pemrograman Web Dinamis — Pertemuan 6: Pengenalan JavaScript
// Sumber: Modul JS 6. Bagian "➕ Tambahan" bukan dari modul.
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

const TYPES = ["string", "number", "boolean", "object", "undefined"];

const CSS = `        body { font-family: Arial, sans-serif; margin: 2rem; background-color: #f4f4f4; box-sizing: border-box; }
        header { background-color: #005566; color: white; padding: 1rem; text-align: center; }
        nav ul { list-style-type: none; padding: 0; display: flex; justify-content: center; }
        nav ul li { margin: 0 1rem; }
        nav ul li a { text-decoration: none; color: #333; }
        .container { max-width: 600px; margin: 2rem auto; }
        form { background-color: white; padding: 1.5rem; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        label { display: block; margin-bottom: 0.5rem; }
        input, select { width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        button { background-color: #4CAF50; color: white; padding: 0.8rem; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.5rem; }
        button:hover { background-color: #45a049; }
        footer { text-align: center; margin-top: 2rem; color: #666; }`;

const HEAD = (t) => `<!DOCTYPE html>
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

const AKT_JS_STARTER = `        // Ambil elemen tombol
        const submitBtn = document.getElementById("submit-btn");
        const greetBtn = document.getElementById("greet-btn");

        // Event listener untuk tombol Simpan
        submitBtn.addEventListener("click", function() {
            const nim = document.getElementById("nim").value;
            const nama = document.getElementById("nama").value;
            if (nim && nama) {
                alert("Data mahasiswa " + nama + " dengan NIM " + nim + " telah disimpan!");
            } else {
                alert("Harap isi semua field!");
            }
        });

        // Event listener untuk tombol Sapa Pengguna
        greetBtn.addEventListener("click", function() {
            const nama = prompt("Masukkan nama Anda:");
            if (nama) {
                alert("Halo, " + nama + "! Selamat datang!");
            } else {
                alert("Nama tidak dimasukkan!");
            }
        });
        console.log("Script siap!");`;

const AKT_JS_SOLUSI = `        // Ambil elemen tombol
        const submitBtn = document.getElementById("submit-btn");
        const greetBtn = document.getElementById("greet-btn");

        // Event listener untuk tombol Simpan
        submitBtn.addEventListener("click", function() {
            const nim = document.getElementById("nim").value.trim();
            const nama = document.getElementById("nama").value.trim();
            if (!nim || !nama) {
                alert("Harap isi semua field!");
            } else if (isNaN(nim)) {
                alert("NIM harus berupa angka!");
            } else {
                alert("Data mahasiswa " + nama + " dengan NIM " + nim + " telah disimpan!");
            }
        });

        // Event listener untuk tombol Sapa Pengguna
        greetBtn.addEventListener("click", function() {
            const nama = prompt("Masukkan nama Anda:");
            if (nama) {
                alert(\`Assalamu'alaikum, \${nama}! Semoga semangat kuliah hari ini 😊\`);
            } else {
                alert("Nama tidak dimasukkan!");
            }
        });
        console.log("Script siap!");`;

const AKT = js => `${HEAD("Interaktivitas JavaScript")}
    <div class="container">
        <main>
            <section>
                <h2>Form Pendaftaran</h2>
                <form id="form-mahasiswa" action="#" method="POST">
                    <label for="nim">NIM:</label>
                    <input type="text" id="nim" name="nim" maxlength="10" placeholder="Masukkan NIM" required>
                    <label for="nama">Nama:</label>
                    <input type="text" id="nama" name="nama" placeholder="Masukkan Nama" required>
                    <button type="button" id="submit-btn">Simpan</button>
                    <button type="button" id="greet-btn">Sapa Pengguna</button>
                </form>
            </section>
        </main>
    </div>
${FOOT}
    <!-- Di laptop: <script src="interactive.js"></script> -->
    <script>
${js}
    </script>
</body>
</html>`;

const TUGAS_FORM = `    <div class="container">
        <main>
            <section>
                <h2>Form Pendaftaran Mahasiswa</h2>
                <form id="form-mahasiswa" action="#" method="POST">
                    <label for="nim">NIM:</label>
                    <input type="text" id="nim" name="nim" maxlength="10" placeholder="Masukkan NIM" required>
                    <label for="nama">Nama:</label>
                    <input type="text" id="nama" name="nama" placeholder="Masukkan Nama" required>
                    <label for="jurusan">Jurusan:</label>
                    <select id="jurusan" name="jurusan" required>
                        <option value="">Pilih Jurusan</option>
                        <option value="sistem_informasi">Sistem Informasi</option>
                        <option value="teknik_informatika">Teknik Informatika</option>
                        <option value="manajemen">Manajemen</option>
                    </select>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="contoh@domain.com" required>
                    <button type="button" id="submit-btn">Simpan</button>
                    <button type="button" id="reset-btn">Reset</button>
                </form>
            </section>
        </main>
    </div>`;

const TUGAS_STARTER = `${HEAD("Halaman Interaktif")}
${TUGAS_FORM}
${FOOT}
    <!-- Di laptop: <script src="interactive-page.js"></script> -->
    <script>
        // Tulis kodemu di sini:
        // 1) ambil tombol Simpan, tombol Reset, dan form dengan getElementById
        // 2) klik Simpan: jika semua field terisi, tampilkan alert ringkasan data
        // 3) klik Reset: kosongkan form lalu tampilkan alert konfirmasi

    </script>
</body>
</html>`;

const TUGAS_SOLUSI = `${HEAD("Halaman Interaktif")}
${TUGAS_FORM}
${FOOT}
    <!-- Di laptop: <script src="interactive-page.js"></script> -->
    <script>
        const submitBtn = document.getElementById("submit-btn");
        const resetBtn = document.getElementById("reset-btn");
        const form = document.getElementById("form-mahasiswa");

        submitBtn.addEventListener("click", function() {
            const nim = document.getElementById("nim").value;
            const nama = document.getElementById("nama").value;
            const jurusan = document.getElementById("jurusan").value;
            const email = document.getElementById("email").value;
            if (nim && nama && jurusan && email) {
                alert(\`Data mahasiswa: NIM \${nim}, Nama \${nama}, Jurusan \${jurusan}, Email \${email}\`);
            } else {
                alert("Harap isi semua field!");
            }
        });

        resetBtn.addEventListener("click", function() {
            form.reset();
            alert("Form telah direset!");
        });
    </script>
</body>
</html>`;

const LAB = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Lab Console</title>
</head>
<body>
    <h3>Lihat hasilnya di panel Console di bawah ⬇️</h3>
    <script>
        let nama = "Ahmad";          // bisa diubah
        const nim = "12345";         // tidak bisa diubah
        let tahunMasuk = 2023;
        let aktif = true;
        let mahasiswa = ["Ahmad", "Budi"];
        let data = { nama: "Ahmad", nim: "12345" };

        console.log(typeof nama, typeof tahunMasuk, typeof aktif);
        console.log(typeof mahasiswa, typeof data);
        console.log(10 % 3);           // sisa bagi
        console.log(5 == "5", 5 === "5");
        console.log("2" + 3, "5" - 2);
        console.log(\`Halo \${nama}, angkatan \${tahunMasuk}\`);
        console.log(mahasiswa[0], data.nim);

        // Coba ubah nilai di atas, atau tambah console.log() milikmu sendiri!
    </script>
</body>
</html>`;

module.exports = fix({
  id: "p6",
  nomor: 6,
  judul: "Pengenalan JavaScript: Variabel, Tipe Data, Operator & Event",
  ujian: "UTS",
  hero: {
    badge: "Materi 6 • Pemrograman Web Dinamis",
    title: "HTML = Struktur, CSS = Tampilan, JavaScript = Perilaku",
    text: "Kenali <strong>variabel</strong> (let/const/var), <strong>5 tipe data</strong>, <strong>operator</strong>, cara <strong>menyisipkan JavaScript</strong>, serta <code>alert</code>, <code>prompt</code>, <code>console.log</code> dan <code>addEventListener</code>. Editor di sini sekarang bisa menjalankan JavaScript dan punya panel <strong>Console</strong>. ➕ Termasuk jebakan <code>prompt</code> yang selalu menghasilkan teks."
  },
  cheatsheet: [
    {
      type: "flow",
      label: "Interaktif 1 • Peran JavaScript",
      title: "Tiga Lapisan Halaman Web",
      items: ["HTML: struktur", "CSS: tampilan", "JavaScript: interaktivitas"],
      highlight: 2,
      note: "Contoh peran JS di proyek CRUD: menangani klik tombol, <strong>memvalidasi input</strong> (misal NIM harus angka), menampilkan konfirmasi saat data disimpan/dihapus, dan memanipulasi elemen HTML (pertemuan 7)."
    },
    {
      type: "table",
      label: "Interaktif 2 • Variabel",
      title: "let vs const vs var",
      desc: "Variabel = tempat menyimpan data yang dapat diubah selama program berjalan.",
      headers: ["Kata kunci", "Bisa diisi ulang?", "Contoh", "Kapan dipakai"],
      rows: [
        ["`let`", "✅ Ya", "`let nama = \"Ahmad\";`", "Nilai yang akan berubah"],
        ["`const`", "❌ Tidak", "`const nim = \"12345\";`", "Nilai tetap (default pilihan pertama)"],
        ["`var`", "✅ Ya", "`var x = 1;`", "Gaya lama, sebaiknya dihindari"]
      ],
      modes: [
        { label: "Uji const", target: "row", row: 1, title: "Kalau const diisi ulang?", text: "<code>const nim = \"1\"; nim = \"2\";</code> → error <strong>TypeError: Assignment to constant variable</strong>." },
        { label: "➕ Kenapa var dihindari", target: "row", row: 2, title: "Scope var bocor keluar blok", text: "<code>if (true) { var a = 1; let b = 2; }</code> → <code>a</code> masih bisa dipakai di luar <code>if</code>, sedangkan <code>b</code> tidak (<em>block scope</em>). var juga boleh dideklarasi ulang tanpa error, sehingga mudah menimpa variabel tak sengaja." },
        { label: "➕ const pada array", target: "row", row: 1, title: "const ≠ isinya beku", text: "<code>const daftar = [\"Ahmad\"]; daftar.push(\"Budi\");</code> tetap boleh. Yang dilarang hanya mengganti variabelnya dengan nilai baru (<code>daftar = []</code>)." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 3 • Tipe Data",
      title: "5 Tipe Data di Modul",
      cols: 3,
      items: [
        { badge: "String", tone: "sky", title: "Teks", text: "<code>\"Sistem Informasi\"</code>, <code>'ahmad@example.com'</code>" },
        { badge: "Number", tone: "indigo", title: "Angka", text: "<code>20</code>, <code>3.14</code> (bulat & desimal sama-sama number)" },
        { badge: "Boolean", tone: "emerald", title: "Benar/salah", text: "<code>true</code> / <code>false</code>" },
        { badge: "Array", tone: "amber", title: "Daftar data", text: "<code>[\"Ahmad\", \"Budi\"]</code>, diakses dengan indeks mulai 0: <code>mahasiswa[0]</code>" },
        { badge: "Object", tone: "rose", title: "Kumpulan properti", text: "<code>{ nama: \"Ahmad\", nim: \"12345\" }</code>, diakses <code>data.nama</code>" },
        { badge: "➕ typeof", tone: "slate", title: "Cek tipe", text: "<code>typeof 20</code> → \"number\". Catatan: <code>typeof []</code> → \"object\" (array termasuk object); cek array dengan <code>Array.isArray()</code>. Ada juga <code>undefined</code> (belum diisi) & <code>null</code> (sengaja kosong)." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Operator",
      title: "Aritmatika, Perbandingan, Logika",
      headers: ["Jenis", "Operator", "Contoh → hasil"],
      rows: [
        ["Aritmatika", "`+ - * / %`", "`10 + 5` → 15 • `10 % 3` → 1 (sisa bagi)"],
        ["Perbandingan", "`== === != !== > < >= <=`", "`5 === \"5\"` → false • `5 == \"5\"` → true"],
        ["Logika", "`&& || !`", "`(tahunMasuk > 2020) && aktif` → true jika keduanya benar"]
      ],
      modes: [
        { label: "== vs ===", target: "row", row: 1, title: "Selalu pakai ===", text: "<code>==</code> mengubah tipe dulu baru membandingkan (<code>0 == \"\"</code> → true!). <code>===</code> memeriksa <strong>tipe dan nilai</strong>, jadi lebih aman." },
        { label: "➕ Jebakan +", target: "row", row: 0, title: "+ dengan string = menyambung", text: "<code>\"2\" + 3</code> → <strong>\"23\"</strong>, tetapi <code>\"5\" - 2</code> → 3. Ubah dulu teks ke angka dengan <code>Number(\"2\")</code>." },
        { label: "➕ Kegunaan %", target: "row", row: 0, title: "Cek genap/ganjil", text: "<code>n % 2 === 0</code> → genap." }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 5 • Menyisipkan JavaScript",
      title: "3 Cara Memasang JavaScript",
      tabs: [
        { label: "Internal", blocks: [{ type: "code", file: "index.html", code: "<script>\n    console.log(\"Halo dari JavaScript!\");\n</script>", note: "Di dalam tag <code><script></code> pada <code><head></code> atau <code><body></code>." }] },
        { label: "External ⭐", blocks: [{ type: "code", file: "index.html", code: "    ...\n    <script src=\"script.js\"></script>\n</body>", note: "Disarankan untuk kode panjang dan terorganisir. File <code>script.js</code> berisi JS murni, <strong>tanpa</strong> tag <code><script></code>." }] },
        { label: "Inline", blocks: [{ type: "code", file: "index.html", code: "<button onclick=\"alert('Klik!')\">Klik Saya</button>", note: "Tidak direkomendasikan: mencampur HTML & JS, sulit dirawat." }] },
        { label: "➕ Kenapa di akhir body?", blocks: [{ type: "callout", tone: "info", heading: "Script harus jalan setelah elemennya ada", html: "Browser membaca HTML dari atas ke bawah. Jika <code><script></code> di <code><head></code> memanggil <code>document.getElementById(\"submit-btn\")</code>, tombolnya belum dibuat → hasil <code>null</code> → error <em>Cannot read properties of null</em>. Solusi: taruh di akhir <code><body></code> (saran modul), atau tetap di <code><head></code> dengan atribut <code>defer</code>: <code><script src=\"script.js\" defer></script></code>." }] }
      ]
    },
    {
      type: "table",
      label: "Interaktif 6 • Fungsi Interaktif Dasar",
      title: "alert, prompt, console.log, addEventListener",
      headers: ["Fungsi", "Kegunaan", "Contoh"],
      rows: [
        ["`alert()`", "Pesan pop-up", "`alert(\"Data berhasil disimpan!\");`"],
        ["`prompt()`", "Meminta input pengguna", "`let nama = prompt(\"Masukkan nama Anda:\");`"],
        ["`console.log()`", "Pesan di konsol (debugging, F12 → Console)", "`console.log(nama);`"],
        ["`addEventListener()`", "Menjalankan fungsi saat event (klik dll.)", "`btn.addEventListener(\"click\", function() { ... });`"],
        ["`.value`", "Mengambil isi input", "`document.getElementById(\"nim\").value`"]
      ],
      modes: [
        { label: "➕ Jebakan prompt", target: "row", row: 1, title: "prompt selalu mengembalikan string", text: "Input 20 dari prompt tersimpan sebagai <code>\"20\"</code>. Jika pengguna menekan <strong>Cancel</strong>, hasilnya <code>null</code>. Untuk menghitung: <code>let umur = Number(prompt(\"Umur?\"));</code>" },
        { label: "➕ Validasi angka", target: "row", row: 4, title: "isNaN() dan jebakannya", text: "<code>isNaN(\"12a\")</code> → true (bukan angka) • <code>isNaN(\"123\")</code> → false. Hati-hati: <code>isNaN(\"\")</code> dan <code>isNaN(\" \")</code> → <strong>false</strong>, jadi cek kosong dulu. Lebih ketat: <code>/^[0-9]+$/.test(nim)</code>." },
        { label: "➕ Template literal", target: "none", title: "Menyusun teks lebih rapi", text: "Pakai backtick: <strong>&#96;Halo, ${nama}!&#96;</strong> sama dengan <code>\"Halo, \" + nama + \"!\"</code>. Dipakai di contoh tugas modul." }
      ]
    }
  ],
  simulator: [
    {
      type: "playground",
      label: "Lab • Console JavaScript",
      title: "Coba Variabel, typeof & Operator",
      desc: "Hasil <code>console.log</code> tampil di panel Console. Ubah kode lalu lihat hasilnya berubah.",
      file: "lab.html",
      js: true,
      starter: LAB,
      tasks: [
        { label: "Buat variabel baru dengan `let` atau `const` (misal `jurusan`)", regex: "(let|const)\\s+(?!nama\\b|nim\\b|tahunMasuk\\b|aktif\\b|mahasiswa\\b|data\\b)[A-Za-z_$][\\w$]*\\s*=" },
        { label: "Tampilkan variabel barumu dengan `console.log`", regex: "(?:let|const)\\s+(?!nama\\b|nim\\b|tahunMasuk\\b|aktif\\b|mahasiswa\\b|data\\b)([A-Za-z_$][\\w$]*)\\s*=[\\s\\S]*console\\.log\\([^)]*\\b\\1\\b" }
      ]
    },
    {
      type: "playground",
      label: "Praktik 1 • Aktivitas Modul 6",
      title: "Tombol Interaktif: Simpan & Sapa Pengguna",
      desc: "Isi form lalu klik tombolnya. Pesan <code>alert</code>/<code>prompt</code> juga dicatat di Console. Lalu kerjakan modifikasi modul: <strong>validasi NIM angka</strong> dengan <code>isNaN</code> dan <strong>sapaan lebih personal</strong>.",
      file: "interactive.html",
      js: true,
      starter: AKT(AKT_JS_STARTER),
      solution: AKT(AKT_JS_SOLUSI),
      tasks: [
        { label: "Tombol `Simpan` & `Sapa Pengguna` tetap ada", sel: "#submit-btn, #greet-btn", min: 2 },
        { label: "Validasi NIM memakai `isNaN(...)`", regex: "isNaN\\s*\\(" },
        { label: "Ada pesan alert khusus jika NIM bukan angka", regex: "isNaN[\\s\\S]*alert\\s*\\(\\s*[\"'`][^\"'`]*(angka|numerik|number)" },
        { label: "Ubah pesan sapaan (tidak lagi “Selamat datang!”) dan tetap memuat nama", regex: "^(?![\\s\\S]*Selamat datang!)[\\s\\S]*prompt\\s*\\([\\s\\S]*alert\\s*\\([^;]*(\\$\\{\\s*nama|\\+\\s*nama)" }
      ]
    },
    {
      type: "playground",
      label: "Tugas Individu • Modul 6",
      title: "Halaman Interaktif: Simpan & Reset",
      desc: "Form NIM, nama, jurusan, email sudah disiapkan. Tulis JavaScript-nya: tombol <strong>Simpan</strong> menampilkan ringkasan data jika semua field terisi, tombol <strong>Reset</strong> mengosongkan form + alert konfirmasi. Di laptop, kumpulkan 3 file: <code>interactive-page.html</code>, <code>.css</code>, <code>.js</code>.",
      file: "interactive-page.html",
      js: true,
      starter: TUGAS_STARTER,
      solution: TUGAS_SOLUSI,
      tasks: [
        { label: "Struktur semantik: header, nav, main, section, footer", sel: "header, nav, main, section, footer", min: 5 },
        { label: "Form berisi NIM, nama, jurusan (select), email", sel: "#nim, #nama, select#jurusan, input[type=email]#email", min: 4 },
        { label: "Seleksi tombol dengan `getElementById`", regex: "getElementById\\s*\\(\\s*[\"'`](submit-btn|reset-btn)" },
        { label: "Memakai `addEventListener(\"click\", ...)`", regex: "addEventListener\\s*\\(\\s*[\"'`]click" },
        { label: "Simpan: cek semua field terisi (pakai `&&`) lalu `alert`", regex: "&&[\\s\\S]*alert\\s*\\(" },
        { label: "Reset: memanggil `.reset()` lalu alert konfirmasi", regex: "\\.reset\\s*\\(\\s*\\)[\\s\\S]*alert\\s*\\(" }
      ]
    },
    {
      type: "reveal",
      label: "Tebak Output • ➕ Jebakan Umum",
      title: "Apa yang Muncul di Console?",
      desc: "Pikirkan dulu jawabanmu, lalu buka.",
      items: [
        { prompt: "`console.log(\"2\" + 3)`", answer: "\"23\"", reason: "+ dengan string = penyambungan teks." },
        { prompt: "`console.log(\"5\" - 2)`", answer: "3", reason: "- hanya untuk angka, jadi \"5\" diubah ke number." },
        { prompt: "`console.log(5 === \"5\")`", answer: "false", reason: "Tipe beda (number vs string)." },
        { prompt: "`console.log(10 % 4)`", answer: "2", reason: "10 dibagi 4 sisa 2." },
        { prompt: "`console.log(typeof [\"Ahmad\"])`", answer: "\"object\"", reason: "Array termasuk object di JavaScript." },
        { prompt: "`let x; console.log(x)`", answer: "undefined", reason: "Variabel dideklarasi tapi belum diberi nilai." },
        { prompt: "`console.log(true && false || true)`", answer: "true", reason: "&& dikerjakan dulu: false, lalu false || true = true." },
        { prompt: "Pengguna menekan Cancel pada `prompt()`", answer: "null", reason: "Karena itu modul mengecek <code>if (nama)</code> sebelum menyapa." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 1 • typeof",
      title: "Tentukan Hasil `typeof`",
      headers: ["Nilai", "typeof"],
      rows: [
        { cells: ["`\"Sistem Informasi\"`"], fields: [{ options: TYPES, answer: "string" }], ok: "✓" },
        { cells: ["`2023`"], fields: [{ options: TYPES, answer: "number" }], ok: "✓" },
        { cells: ["`3.14`"], fields: [{ options: TYPES, answer: "number" }], ok: "✓ Desimal juga number." },
        { cells: ["`\"12345\"` (NIM dalam tanda kutip)"], fields: [{ options: TYPES, answer: "string" }], ok: "✓ Ada tanda kutip = string." },
        { cells: ["`false`"], fields: [{ options: TYPES, answer: "boolean" }], ok: "✓" },
        { cells: ["`{ nama: \"Ahmad\" }`"], fields: [{ options: TYPES, answer: "object" }], ok: "✓" },
        { cells: ["`[\"Ahmad\", \"Budi\"]`"], fields: [{ options: TYPES, answer: "object" }], ok: "✓ Array termasuk object." },
        { cells: ["Hasil `prompt()` saat diisi 20"], fields: [{ options: TYPES, answer: "string" }], ok: "✓ prompt selalu string." }
      ]
    }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa fungsi JavaScript pada halaman web?", a: "Menambah interaktivitas: menangani klik tombol, memvalidasi input, memanipulasi elemen HTML." },
    { tag: "Variabel", q: "Beda let, const, var?", a: "`let` bisa diubah • `const` tidak bisa diisi ulang • `var` gaya lama (scope fungsi), sebaiknya dihindari. Saran: const untuk nilai tetap, let untuk yang berubah." },
    { tag: "Tipe data", q: "5 tipe data di modul?", a: "String (teks), Number (angka), Boolean (true/false), Array (daftar), Object (kumpulan properti)." },
    { tag: "Operator", q: "Operator aritmatika, perbandingan, logika?", a: "Aritmatika `+ - * / %` • Perbandingan `== === != > < >= <=` • Logika `&& || !`." },
    { tag: "Operator", q: "Beda == dan ===?", a: "`==` membandingkan nilai setelah konversi tipe (`5 == \"5\"` true). `===` memeriksa tipe dan nilai (`5 === \"5\"` false). Gunakan ===." },
    { tag: "Operator", q: "Apa itu %?", a: "Modulus (sisa bagi): `10 % 3` = 1." },
    { tag: "Penyisipan", q: "3 cara menyisipkan JS?", a: "Internal (`<script>...</script>`), External (`<script src=\"script.js\">`), Inline (`onclick=\"...\"`, tidak direkomendasikan)." },
    { tag: "Penyisipan", q: "Kenapa `<script>` diletakkan di akhir `<body>`?", a: "Agar HTML dimuat dulu sehingga elemen sudah ada saat script mencarinya. ➕ Alternatif: atribut `defer`." },
    { tag: "Fungsi", q: "alert, prompt, console.log?", a: "`alert()` pop-up pesan • `prompt()` meminta input • `console.log()` pesan di konsol untuk debugging." },
    { tag: "Event", q: "Bagaimana menjalankan kode saat tombol diklik?", a: "`btn.addEventListener(\"click\", function() { ... });`" },
    { tag: "➕ prompt", q: "Hasil `prompt()` bertipe apa?", a: "Selalu string, atau `null` jika Cancel. Ubah ke angka dengan `Number()`." },
    { tag: "➕ Validasi", q: "Fungsi untuk cek NIM bukan angka?", a: "`isNaN(nim)` → true jika bukan angka. Cek kosong dulu karena `isNaN(\"\")` = false." },
    { tag: "➕ Template literal", q: "Tulis `\"Halo, \" + nama + \"!\"` dengan template literal.", a: "<strong>&#96;Halo, ${nama}!&#96;</strong> (pakai tanda backtick, bukan kutip)." }
  ],
  quiz: [
    { q: "Kata kunci untuk mendeklarasikan variabel yang nilainya TIDAK boleh diisi ulang adalah …",
      opts: ["let", "var", "const", "static"], ans: 2,
      exp: "const nim = \"12345\"; tidak bisa diisi ulang.",
      optExp: ["let bisa diubah.", "var bisa diubah.", "Benar.", "Bukan kata kunci variabel JS biasa."] },
    { q: "Hasil dari `5 === \"5\"` adalah …",
      opts: ["true", "false", "\"55\"", "error"], ans: 1,
      exp: "=== memeriksa tipe dan nilai; number ≠ string.",
      optExp: ["Itu hasil ==.", "Benar.", "Itu hasil 5 + \"5\".", "Tidak error."] },
    { q: "`[\"Ahmad\", \"Budi\"]` termasuk tipe data …",
      opts: ["String", "Object biasa dengan properti nama", "Array", "Boolean"], ans: 2,
      exp: "Kurung siku = array (daftar data).",
      optExp: ["Isinya string, wadahnya array.", "Object memakai kurung kurawal.", "Benar.", "Boolean hanya true/false."] },
    { q: "Operator `%` pada `10 % 3` menghasilkan …",
      opts: ["3.33", "1", "30", "0.3"], ans: 1,
      exp: "Modulus = sisa bagi. 10 = 3×3 + 1.",
      optExp: ["Itu hasil /.", "Benar.", "Itu hasil *.", "Bukan."] },
    { q: "Cara menyisipkan JavaScript yang TIDAK direkomendasikan menurut modul adalah …",
      opts: ["Internal dengan tag script", "External dengan file script.js", "Inline pada atribut onclick", "Script di akhir body"], ans: 2,
      exp: "Inline mencampur HTML dan JS sehingga sulit dirawat.",
      optExp: ["Boleh.", "Paling disarankan untuk kode panjang.", "Benar.", "Justru praktik terbaik."] },
    { q: "Fungsi untuk meminta input teks dari pengguna lewat kotak dialog adalah …",
      opts: ["alert()", "prompt()", "console.log()", "confirm()"], ans: 1,
      exp: "let nama = prompt(\"Masukkan nama Anda:\");",
      optExp: ["Hanya menampilkan pesan.", "Benar.", "Untuk debugging di konsol.", "Hanya OK/Cancel (true/false), bukan teks."] },
    { q: "Mengapa `<script>` sebaiknya diletakkan di akhir `<body>`?",
      opts: ["Agar JavaScript dijalankan lebih dulu dari HTML", "Agar elemen HTML sudah dimuat sebelum script mengaksesnya", "Karena script tidak boleh ada di head", "Agar CSS tidak terpakai"], ans: 1,
      exp: "Jika script jalan lebih dulu, getElementById menghasilkan null.",
      optExp: ["Kebalikannya.", "Benar.", "Boleh di head (misalnya dengan defer).", "Tidak terkait CSS."] },
    { q: "Kode yang benar untuk menjalankan fungsi ketika tombol `submitBtn` diklik adalah …",
      opts: ["`submitBtn.addEventListener(\"click\", function() { ... });`", "`submitBtn.click = alert();`", "`addEventListener(submitBtn, click);`", "`submitBtn.onEvent(\"klik\")`"], ans: 0,
      exp: "Format: elemen.addEventListener(\"event\", fungsi).",
      optExp: ["Benar.", "Salah sintaks.", "Urutan & bentuk salah.", "Tidak ada method onEvent."] },
    { q: "Ekspresi `(tahunMasuk > 2020) && aktif` bernilai true jika …",
      opts: ["Salah satu kondisi benar", "Kedua kondisi benar", "Kedua kondisi salah", "tahunMasuk berupa string"], ans: 1,
      exp: "&& (dan) butuh semua kondisi benar.",
      optExp: ["Itu ||.", "Benar.", "Hasilnya false.", "Tidak terkait."] },
    { q: "Pengguna mengisi angka 2 dan 3 lewat dua `prompt()`, lalu kode `alert(a + b)` menampilkan “23”. Penyebabnya adalah …",
      opts: ["Operator + salah tulis", "Hasil prompt bertipe string, sehingga + menyambung teks", "Harus memakai console.log", "alert tidak bisa menampilkan angka"], ans: 1,
      exp: "➕ Gunakan Number(a) + Number(b) agar hasilnya 5.",
      optExp: ["Operatornya benar.", "Benar.", "Tidak mengubah hasil.", "alert bisa menampilkan angka."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 6*
📚 *Pengenalan JavaScript*

1️⃣ *Variabel:* let (bisa diubah) • const (tetap) • var (lama, hindari). Saran: const dulu, let jika berubah.

2️⃣ *Tipe data:* String "teks" • Number 20 / 3.14 • Boolean true/false • Array ["Ahmad","Budi"] • Object {nama:"Ahmad", nim:"12345"}.

3️⃣ *Operator:* aritmatika + - * / % • perbandingan == === != > < >= <= • logika && || !
• Pakai === (cek tipe & nilai): 5 === "5" → false.

4️⃣ *Menyisipkan JS:* internal <script> • external <script src="script.js"> (disarankan) • inline onclick (hindari). Taruh <script> di akhir <body>.

5️⃣ *Fungsi:* alert() pesan • prompt() input • console.log() debugging • btn.addEventListener("click", function(){...}) • .value mengambil isi input • form.reset() mengosongkan form.

6️⃣ *Jebakan:* prompt selalu string ("2"+"3" = "23", pakai Number()) • Cancel → null • isNaN(nim) untuk cek angka.`
});
