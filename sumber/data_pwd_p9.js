// Pemrograman Web Dinamis — Pertemuan 9: Validasi Form dengan JavaScript
// Sumber: Modul JS 9. Bagian bertanda ➕ bukan dari modul.
const { fix, HEAD, FOOT } = require("./pwd_uas_util.js");

const FORM_AKT = `    <div class="container">
        <main>
            <section>
                <h2>Form Pendaftaran</h2>
                <form id="form-mahasiswa">
                    <label for="nim">NIM:</label>
                    <input type="text" id="nim" name="nim" placeholder="Masukkan NIM (10 digit)" required>
                    <span id="nim-error" class="error"></span>
                    <label for="nama">Nama:</label>
                    <input type="text" id="nama" name="nama" placeholder="Masukkan Nama" required>
                    <span id="nama-error" class="error"></span>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="contoh@domain.com" required>
                    <span id="email-error" class="error"></span>
                    <button type="submit">Simpan</button>
                </form>
            </section>
        </main>
    </div>`;

const AKT_JS = `        const form = document.getElementById("form-mahasiswa");
        const nimInput = document.getElementById("nim");
        const namaInput = document.getElementById("nama");
        const emailInput = document.getElementById("email");
        const nimError = document.getElementById("nim-error");
        const namaError = document.getElementById("nama-error");
        const emailError = document.getElementById("email-error");

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Mencegah pengiriman form
            let isValid = true;

            // Reset pesan error
            nimError.textContent = "";
            namaError.textContent = "";
            emailError.textContent = "";

            // Validasi NIM (10 digit angka)
            if (!nimInput.value || nimInput.value.length !== 10 || isNaN(nimInput.value)) {
                nimError.textContent = "NIM harus 10 digit angka!";
                isValid = false;
            }

            // Validasi Nama (tidak kosong)
            if (!namaInput.value) {
                namaError.textContent = "Nama wajib diisi!";
                isValid = false;
            }

            // Validasi Email
            const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailInput.value || !emailPattern.test(emailInput.value)) {
                emailError.textContent = "Format email tidak valid!";
                isValid = false;
            }

            if (isValid) {
                alert("Form valid! Data: NIM " + nimInput.value + ", Nama " + namaInput.value + ", Email " + emailInput.value);
                form.reset();
            }
        });`;

const AKT_JS_SOLUSI = AKT_JS
  .replace(`            // Validasi Nama (tidak kosong)
            if (!namaInput.value) {
                namaError.textContent = "Nama wajib diisi!";
                isValid = false;
            }`, `            // Validasi Nama (tidak kosong, minimal 3 karakter)
            if (!namaInput.value.trim()) {
                namaError.textContent = "Nama wajib diisi!";
                isValid = false;
            } else if (namaInput.value.trim().length < 3) {
                namaError.textContent = "Nama minimal 3 karakter!";
                isValid = false;
            }`)
  .replace(`emailError.textContent = "Format email tidak valid!";`, `emailError.textContent = "Email harus mengandung @ dan domain, misalnya nama@kampus.ac.id";`);

const PAGE = (t, body, js) => `${HEAD(t)}
${body}
${FOOT}
    <!-- Di laptop: isi <script> ini = file .js terpisah -->
    <script>
${js}
    </script>
</body>
</html>`;

const FORM_TUGAS = `    <div class="container">
        <main>
            <section>
                <h2>Form Pendaftaran</h2>
                <form id="form-mahasiswa" novalidate>
                    <label for="nim">NIM:</label>
                    <input type="text" id="nim" name="nim" placeholder="Masukkan NIM (10 digit)">
                    <span id="nim-error" class="error"></span>
                    <label for="nama">Nama:</label>
                    <input type="text" id="nama" name="nama" placeholder="Masukkan Nama">
                    <span id="nama-error" class="error"></span>
                    <label for="jurusan">Jurusan:</label>
                    <select id="jurusan" name="jurusan">
                        <option value="">Pilih Jurusan</option>
                        <option value="Sistem Informasi">Sistem Informasi</option>
                        <option value="Teknik Informatika">Teknik Informatika</option>
                        <option value="Manajemen">Manajemen</option>
                    </select>
                    <span id="jurusan-error" class="error"></span>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="contoh@domain.com">
                    <span id="email-error" class="error"></span>
                    <button type="submit">Tambah Data</button>
                    <button type="button" id="clear-btn">Hapus Semua</button>
                </form>
            </section>
            <section>
                <h2>Data Mahasiswa</h2>
                <table id="data-table">
                    <thead>
                        <tr><th>NIM</th><th>Nama</th><th>Jurusan</th><th>Email</th></tr>
                    </thead>
                    <tbody id="table-body"></tbody>
                </table>
            </section>
        </main>
    </div>`;

const TUGAS_STARTER = `        // Tugas Modul 9: validasi form pendaftaran, lalu tambahkan data ke tabel.
        // 1. Ambil form, kolom input, span error, tbody, dan tombol Hapus Semua.
        // 2. Pasang event submit pada form. Panggil event.preventDefault().
        // 3. Kosongkan semua pesan error, siapkan let isValid = true.
        // 4. Cek NIM (10 digit angka), nama (minimal 3 karakter), jurusan (bukan opsi default), email (regex).
        //    Kalau salah: isi span error-nya dan isValid = false.
        // 5. Kalau valid: buat <tr> berisi 4 <td>, tempel ke tbody, lalu form.reset().
        // 6. Tombol Hapus Semua mengosongkan tbody.
`;

const TUGAS_SOLUSI = `        const form = document.getElementById("form-mahasiswa");
        const nimInput = document.getElementById("nim");
        const namaInput = document.getElementById("nama");
        const jurusanInput = document.getElementById("jurusan");
        const emailInput = document.getElementById("email");
        const nimError = document.getElementById("nim-error");
        const namaError = document.getElementById("nama-error");
        const jurusanError = document.getElementById("jurusan-error");
        const emailError = document.getElementById("email-error");
        const tableBody = document.getElementById("table-body");
        const clearBtn = document.getElementById("clear-btn");

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let isValid = true;

            // Reset pesan error
            nimError.textContent = "";
            namaError.textContent = "";
            jurusanError.textContent = "";
            emailError.textContent = "";

            // NIM: tepat 10 digit angka (regex lebih ketat daripada isNaN)
            if (!/^\\d{10}$/.test(nimInput.value)) {
                nimError.textContent = "NIM harus 10 digit angka!";
                isValid = false;
            }

            // Nama: minimal 3 karakter (spasi di awal/akhir tidak dihitung)
            if (namaInput.value.trim().length < 3) {
                namaError.textContent = "Nama minimal 3 karakter!";
                isValid = false;
            }

            // Jurusan: opsi default punya value ""
            if (!jurusanInput.value) {
                jurusanError.textContent = "Jurusan wajib dipilih!";
                isValid = false;
            }

            // Email
            const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = "Format email tidak valid!";
                isValid = false;
            }

            if (isValid) {
                const row = document.createElement("tr");
                // textContent: input pengguna tampil sebagai teks, tidak dijalankan sebagai HTML
                [nimInput.value, namaInput.value.trim(), jurusanInput.value, emailInput.value].forEach(function(isi) {
                    const td = document.createElement("td");
                    td.textContent = isi;
                    row.appendChild(td);
                });
                tableBody.appendChild(row);
                form.reset();
                alert("Data berhasil ditambahkan!");
            }
        });

        clearBtn.addEventListener("click", function() {
            tableBody.innerHTML = "";
            alert("Semua data telah dihapus!");
        });`;

const REGEX_LAB = `${HEAD("Uji Regex Email")}
    <div class="container">
        <main>
            <section>
                <h2>Uji Pola Email</h2>
                <form id="uji">
                    <label for="email">Ketik email lalu lihat hasilnya:</label>
                    <input type="text" id="email" placeholder="nama@kampus.ac.id" autocomplete="off">
                    <span id="hasil" class="error"></span>
                </form>
                <table>
                    <thead><tr><th>Contoh</th><th>Lolos?</th></tr></thead>
                    <tbody id="contoh"></tbody>
                </table>
            </section>
        </main>
    </div>
${FOOT}
    <script>
        // Pola dari modul. Coba ubah polanya, lalu lihat tabel berubah.
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

        const contoh = ["ahmad@kampus.ac.id", "ahmad@kampus", "ahmad kampus@x.id", "@kampus.ac.id", "ahmad@@kampus.id", "a@b.c", "ahmad@kampus.ac.id "];
        const tbody = document.getElementById("contoh");
        contoh.forEach(function(teks) {
            const tr = document.createElement("tr");
            const a = document.createElement("td");
            const b = document.createElement("td");
            a.textContent = JSON.stringify(teks);
            b.textContent = emailPattern.test(teks) ? "✔ lolos" : "✘ ditolak";
            tr.append(a, b);
            tbody.appendChild(tr);
        });

        const input = document.getElementById("email");
        const hasil = document.getElementById("hasil");
        input.addEventListener("input", function() {
            const ok = emailPattern.test(input.value);
            hasil.textContent = input.value ? (ok ? "✔ Format email valid" : "✘ Format email tidak valid") : "";
            hasil.style.color = ok ? "green" : "red";
        });
    </script>
</body>
</html>`;

const VAL = [{ value: "kosong", label: "Field wajib (tidak kosong)" }, { value: "panjang", label: "Panjang / jumlah karakter" }, { value: "angka", label: "Hanya angka" }, { value: "regex", label: "Pola (regex)" }, { value: "pilihan", label: "Pilihan bukan default" }];
const EVT = ["onclick", "onsubmit", "addEventListener", "preventDefault", "form.reset", "textContent", "test", "isNaN"];

module.exports = fix({
  id: "p9",
  nomor: 9,
  judul: "Validasi Form dengan JavaScript",
  ujian: "UAS",
  hero: {
    badge: "Materi 9 • Pemrograman Web Dinamis",
    title: "Cek Isian Form Sebelum Datanya Dikirim",
    text: "Pahami <strong>event listener</strong> (<code>onclick</code>, <code>onsubmit</code>, <code>addEventListener</code>), <strong>event.preventDefault()</strong>, lalu validasi <strong>field wajib</strong>, <strong>format email</strong> dengan regex, dan <strong>NIM 10 digit</strong>, lengkap dengan pesan error di bawah setiap kolom."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • Event Listener",
      title: "Tiga Cara Menangani Aksi Pengguna",
      headers: ["Cara", "Ditulis", "Kapan dipicu", "Catatan"],
      rows: [
        ["`onclick`", "`btn.onclick = function() { … };`", "Elemen diklik", "Hanya bisa 1 fungsi; yang ditulis belakangan menimpa yang lama"],
        ["`onsubmit`", "`form.onsubmit = function(event) { … };`", "Form dikirim (klik tombol submit atau Enter di kolom input)", "Dipasang pada <strong>form</strong>, bukan pada tombol"],
        ["`addEventListener`", "`btn.addEventListener(\"click\", function() { … });`", "Sesuai nama event: <code>\"click\"</code>, <code>\"submit\"</code>, <code>\"input\"</code>, <code>\"change\"</code>", "Cara modern: bisa memasang lebih dari 1 fungsi, tidak saling menimpa"]
      ],
      modes: [
        { label: "Nama event", target: "row", row: 2, title: "Tanpa awalan on", text: "Di <code>addEventListener</code> nama event ditulis <strong>tanpa on</strong>: <code>\"click\"</code>, <code>\"submit\"</code>. Menulis <code>addEventListener(\"onclick\", …)</code> tidak error, tetapi fungsinya tidak pernah jalan." },
        { label: "Saran modul", target: "row", row: 2, title: "Praktik terbaik", text: "Gunakan <code>addEventListener</code> untuk fleksibilitas dan menghindari penimpaan event. Gunakan <code>event.preventDefault()</code> di onsubmit untuk mencegah form terkirim sebelum validasi selesai." },
        { label: "onsubmit vs onclick", target: "row", row: 1, title: "Kenapa validasi di submit?", text: "Event submit menangkap <strong>semua cara</strong> form dikirim, termasuk menekan Enter di kolom input, dan bisa dibatalkan dengan <code>preventDefault()</code>. Validasi cukup ditulis di satu tempat." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "code",
          label: "Interaktif 2 • preventDefault",
          title: "Tahan dulu, cek dulu",
          file: "form-validation.js",
          code: "form.addEventListener(\"submit\", function(event) {\n    event.preventDefault();   // form tidak langsung terkirim\n    let isValid = true;\n    // ... cek setiap kolom ...\n    if (isValid) {\n        // simpan / tampilkan data\n        form.reset();\n    }\n});",
          note: "Tanpa <code>preventDefault()</code>, browser langsung mengirim form dan memuat ulang halaman, sehingga pesan error yang baru ditulis ikut hilang."
        },
        {
          type: "callout",
          tone: "info",
          heading: "Pola validasi dari modul",
          html: "1. <code>preventDefault()</code><br>2. <code>let isValid = true;</code><br>3. Kosongkan semua pesan error<br>4. Cek tiap kolom; kalau salah tulis pesan di <code>&lt;span class=\"error\"&gt;</code> dan <code>isValid = false</code><br>5. Kalau <code>isValid</code> masih true: proses data, <code>form.reset()</code>"
        }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Jenis Validasi",
      title: "Cek Apa, dengan Kode Apa",
      headers: ["Jenis", "Contoh kode", "Ditolak jika"],
      rows: [
        ["Field wajib", "`if (!nama.value) { … }`", "Kolom kosong (<code>\"\"</code> dianggap false)"],
        ["Panjang minimal", "`if (nama.value.length < 3) { … }`", "Kurang dari 3 karakter"],
        ["Hanya angka (modul)", "`if (isNaN(nim) || nim.length !== 10) { … }`", "Bukan angka atau tidak tepat 10 karakter"],
        ["Format email", "`if (!emailPattern.test(email)) { … }`", "Tidak cocok dengan pola <code>teks@teks.teks</code>"],
        ["Pilihan (select)", "`if (!jurusan.value) { … }`", "Masih di opsi default yang <code>value=\"\"</code>"]
      ],
      modes: [
        { label: "➕ Spasi saja", target: "row", row: 0, title: "\"   \" lolos cek kosong", text: "Tiga spasi bukan string kosong, jadi <code>!nama.value</code> bernilai false. Pakai <code>nama.value.trim()</code> untuk membuang spasi di awal dan akhir dulu." },
        { label: "➕ isNaN longgar", target: "row", row: 2, title: "Ada yang lolos padahal bukan NIM", text: "<code>isNaN(\"123456789.\")</code>, <code>isNaN(\"-123456789\")</code>, dan <code>isNaN(\"1e12345678\")</code> semuanya false (dianggap angka) dan panjangnya 10. Cek yang lebih ketat: <code>/^\\d{10}$/.test(nim)</code>." },
        { label: "Klien + server", target: "none", title: "Saran modul", text: "Validasi di sisi klien (JavaScript) untuk umpan balik cepat, tetapi <strong>selalu validasi lagi di sisi server (PHP)</strong> untuk keamanan. JavaScript bisa dimatikan atau dilewati." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Membaca Regex Email",
      title: "/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/",
      headers: ["Potongan", "Artinya", "Cocok dengan"],
      rows: [
        ["`/ … /`", "Pembuka dan penutup regex di JavaScript", "-"],
        ["`^`", "Harus mulai dari awal teks", "-"],
        ["`[^\\s@]+`", "Satu karakter atau lebih yang <strong>bukan</strong> spasi dan <strong>bukan</strong> @", "<code>ahmad</code>"],
        ["`@`", "Tepat satu tanda @", "<code>@</code>"],
        ["`[^\\s@]+`", "Nama domain, juga tanpa spasi dan @", "<code>kampus</code>"],
        ["`\\.`", "Titik sungguhan (tanpa \\ titik berarti karakter apa saja)", "<code>.</code>"],
        ["`[^\\s@]+$`", "Akhiran domain, lalu teks harus selesai", "<code>ac.id</code>"]
      ],
      modes: [
        { label: "test()", target: "none", title: "Cara memakai pola", text: "<code>emailPattern.test(\"ahmad@kampus.ac.id\")</code> menghasilkan <code>true</code>. <code>emailPattern.test(\"ahmad@kampus\")</code> menghasilkan <code>false</code> karena tidak ada titik setelah @." },
        { label: "Tanda ^ ganda", target: "row", row: 2, title: "^ di dalam [ ] artinya BUKAN", text: "<code>^</code> di awal pola berarti \"awal teks\". <code>^</code> di dalam kurung siku <code>[^…]</code> berarti \"selain karakter ini\"." }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Jebakan di Aktivitas Modul",
      tone: "warning",
      heading: "Pesan error kolom kosong tidak muncul?",
      html: "Input di aktivitas memakai atribut <code>required</code> dan <code>type=\"email\"</code>. Browser mengecek atribut itu <strong>sebelum</strong> event submit berjalan, jadi yang muncul gelembung bawaan browser (\"Please fill out this field\"), bukan teks merah dari JavaScript. Tambahkan <code>novalidate</code> pada tag <code>&lt;form&gt;</code> agar semua validasi ditangani JavaScript."
    }
  ],
  simulator: [
    {
      type: "playground",
      label: "Praktik 1 • Aktivitas Modul 9",
      title: "Form dengan Validasi Sederhana",
      desc: "Coba kirim form dengan isian salah: NIM bukan angka, NIM kurang dari 10 digit, email tanpa domain. Lalu kerjakan modifikasi modul: <strong>nama minimal 3 karakter</strong> dan <strong>pesan error email yang lebih spesifik</strong>.",
      file: "form-validation.html",
      js: true,
      assessment: "validasi",
      starter: PAGE("Validasi Form", FORM_AKT, AKT_JS),
      solution: PAGE("Validasi Form", FORM_AKT, AKT_JS_SOLUSI),
      tasks: [
        { label: "Event `submit` dipasang pada form dan memanggil `preventDefault()`", regex: "addEventListener\\s*\\(\\s*[\"'`]submit[\"'`][\\s\\S]*preventDefault\\s*\\(\\s*\\)|onsubmit\\s*=[\\s\\S]*preventDefault\\s*\\(\\s*\\)" },
        { label: "NIM salah memunculkan pesan di `#nim-error`", behavior: "nim" },
        { label: "Nama 2 huruf ditolak (minimal 3 karakter)", behavior: "nama", regex: "length\\s*<\\s*3|length\\s*>=\\s*3|length\\s*<=\\s*2" },
        { label: "Email salah memunculkan pesan yang lebih spesifik dari “Format email tidak valid!”", behavior: "email", regex: "emailError\\.textContent\\s*=\\s*[\"'`](?!Format email tidak valid!)[^\"'`]{8,}" },
        { label: "Isian benar lolos tanpa pesan error", behavior: "valid" }
      ]
    },
    {
      type: "playground",
      label: "Tugas Individu • Modul 9",
      title: "Validasi Form Pendaftaran + Tambah ke Tabel",
      desc: "Form (NIM, nama, jurusan, email) dan tabel sudah disiapkan, dengan <code>novalidate</code> agar semua cek dilakukan JavaScript. Tulis validasinya sesuai spesifikasi tugas, lalu tambahkan data yang valid ke tabel. Contoh jawaban memakai <code>textContent</code> untuk sel tabel supaya aman dari XSS (lihat P7).",
      file: "form-validated.html",
      js: true,
      assessment: "validasi",
      starter: PAGE("Form Validasi", FORM_TUGAS, TUGAS_STARTER),
      solution: PAGE("Form Validasi", FORM_TUGAS, TUGAS_SOLUSI),
      tasks: [
        { label: "Memakai event `submit` + `preventDefault()`", regex: "addEventListener\\s*\\(\\s*[\"'`]submit[\"'`][\\s\\S]*preventDefault\\s*\\(\\s*\\)|onsubmit\\s*=[\\s\\S]*preventDefault\\s*\\(\\s*\\)" },
        { label: "NIM yang bukan 10 digit angka ditolak", behavior: "nim" },
        { label: "Nama kurang dari 3 karakter ditolak", behavior: "nama" },
        { label: "Jurusan yang belum dipilih ditolak", behavior: "jurusan" },
        { label: "Email tanpa domain ditolak", behavior: "email" },
        { label: "Data valid masuk ke tabel dan form di-reset", behavior: "tabel" },
        { label: "Tombol Hapus Semua mengosongkan tabel", behavior: "hapus" },
        { label: "➕ Nama berisi tag HTML tampil sebagai teks (aman dari XSS)", behavior: "aman" }
      ]
    },
    {
      type: "playground",
      label: "Lab Regex • Tambahan",
      title: "Email Mana yang Lolos Pola Modul?",
      desc: "Tabel menunjukkan hasil <code>emailPattern.test()</code> untuk beberapa contoh. Ketik email sendiri di kotak, atau ubah polanya dan lihat apa yang berubah. Perhatikan contoh terakhir: ada spasi di ujung, jadi ditolak.",
      file: "uji-regex.html",
      js: true,
      starter: REGEX_LAB,
      tasks: [
        { label: "Pola masih memakai `^` di awal dan `$` di akhir", regex: "emailPattern\\s*=\\s*/\\^[\\s\\S]*\\$/" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 1 • Pilih Jenis Validasi",
      title: "Aturan Form → Jenis Validasi",
      headers: ["Aturan", "Jenis validasi"],
      rows: [
        { cells: ["Nama tidak boleh kosong"], fields: [{ options: VAL, answer: "kosong" }], ok: "✓ <code>if (!nama.value)</code>" },
        { cells: ["Nama minimal 3 karakter"], fields: [{ options: VAL, answer: "panjang" }], ok: "✓ <code>nama.value.length &lt; 3</code>" },
        { cells: ["NIM hanya boleh berisi angka"], fields: [{ options: VAL, answer: "angka" }], ok: "✓ <code>isNaN(nim)</code>" },
        { cells: ["Email harus punya @ dan domain"], fields: [{ options: VAL, answer: "regex" }], ok: "✓ <code>emailPattern.test(email)</code>" },
        { cells: ["Jurusan harus dipilih, bukan “Pilih Jurusan”"], fields: [{ options: VAL, answer: "pilihan" }], ok: "✓ <code>if (!jurusan.value)</code>" },
        { cells: ["NIM harus tepat 10 karakter"], fields: [{ options: VAL, answer: "panjang" }], ok: "✓ <code>nim.length !== 10</code>" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Lengkapi Kode",
      title: "Method/Properti yang Tepat",
      headers: ["Kebutuhan", "Kode"],
      rows: [
        { cells: ["Menjalankan fungsi saat form dikirim, tanpa menimpa fungsi lain"], fields: [{ options: EVT, answer: "addEventListener" }], ok: "✓" },
        { cells: ["Menahan form agar tidak langsung terkirim"], fields: [{ options: EVT, answer: "preventDefault" }], ok: "✓ <code>event.preventDefault()</code>" },
        { cells: ["Menulis pesan error ke <code>&lt;span&gt;</code>"], fields: [{ options: EVT, answer: "textContent" }], ok: "✓" },
        { cells: ["Mengecek teks dengan pola regex"], fields: [{ options: EVT, answer: "test" }], ok: "✓ <code>pola.test(teks)</code>" },
        { cells: ["Mengecek apakah nilai bukan angka"], fields: [{ options: EVT, answer: "isNaN" }], ok: "✓" },
        { cells: ["Mengosongkan semua kolom setelah data tersimpan"], fields: [{ options: EVT, answer: "form.reset" }], ok: "✓ <code>form.reset()</code>" },
        { cells: ["Properti lama yang hanya menyimpan 1 fungsi klik"], fields: [{ options: EVT, answer: "onclick" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Tebak Hasil • Validasi",
      title: "Lolos atau Ditolak?",
      desc: "Pola: <code>emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</code>. NIM dicek seperti modul: <code>!nim || nim.length !== 10 || isNaN(nim)</code>.",
      items: [
        { prompt: "`emailPattern.test(\"ahmad@kampus.ac.id\")`", answer: "true", reason: "Ada teks, @, teks, titik, teks." },
        { prompt: "`emailPattern.test(\"ahmad@kampus\")`", answer: "false", reason: "Tidak ada titik setelah @." },
        { prompt: "`emailPattern.test(\"ahmad kampus@x.id\")`", answer: "false", reason: "Bagian sebelum @ tidak boleh berisi spasi." },
        { prompt: "NIM `\"12345\"`", answer: "Ditolak", reason: "Panjangnya 5, bukan 10." },
        { prompt: "NIM `\"12345abcde\"`", answer: "Ditolak", reason: "Panjangnya 10, tetapi <code>isNaN(\"12345abcde\")</code> true." },
        { prompt: "NIM `\"123456789.\"` ➕", answer: "Lolos (padahal bukan NIM)", reason: "<code>isNaN(\"123456789.\")</code> false karena JavaScript membacanya sebagai angka 123456789. Pakai <code>/^\\d{10}$/</code> agar hanya 10 digit yang lolos." },
        { prompt: "Nama `\"   \"` (3 spasi) dengan cek `!nama.value` ➕", answer: "Lolos", reason: "String berisi spasi tidak kosong. Pakai <code>nama.value.trim()</code>." },
        { prompt: "Dua kali `btn.onclick = …` dengan fungsi berbeda, lalu tombol diklik", answer: "Hanya fungsi kedua yang jalan", reason: "Properti onclick hanya menyimpan satu fungsi; yang kedua menimpa yang pertama. Dengan addEventListener keduanya jalan." }
      ]
    }
  ],
  flashcards: [
    { tag: "Event", q: "Apa itu event listener?", a: "Fungsi JavaScript yang dijalankan saat pengguna melakukan aksi, misalnya klik tombol atau mengirim form." },
    { tag: "Event", q: "Beda onclick dan onsubmit?", a: "onclick dipicu saat elemen diklik. onsubmit dipicu saat form dikirim (klik tombol submit atau Enter di kolom input) dan dipasang pada form." },
    { tag: "Event", q: "Kelebihan addEventListener dibanding onclick?", a: "Bisa memasang lebih dari satu fungsi pada event yang sama tanpa saling menimpa. Nama event ditulis tanpa on: `\"click\"`, `\"submit\"`." },
    { tag: "Event", q: "Fungsi `event.preventDefault()` pada submit?", a: "Mencegah form langsung terkirim (dan halaman dimuat ulang) sehingga validasi bisa diselesaikan dulu." },
    { tag: "Validasi", q: "Tujuan validasi form?", a: "Memastikan data yang dimasukkan valid, lengkap, dan sesuai format sebelum diproses atau disimpan." },
    { tag: "Validasi", q: "Cara cek field wajib?", a: "`if (!input.value) { … }` karena string kosong dianggap false. ➕ Pakai `.trim()` agar isian spasi saja ikut ditolak." },
    { tag: "Validasi", q: "Cara cek NIM 10 digit angka (versi modul)?", a: "`if (isNaN(nim) || nim.length !== 10)` → tampilkan \"NIM harus 10 digit angka!\"." },
    { tag: "Regex", q: "Cara cek format email di modul?", a: "`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)`: teks tanpa spasi/@, lalu @, lalu domain, titik, dan akhiran." },
    { tag: "Validasi", q: "Di mana pesan error ditampilkan pada aktivitas modul?", a: "Di `<span id=\"…-error\" class=\"error\">` di bawah tiap kolom, diisi dengan `textContent`. Atau dengan alert." },
    { tag: "Validasi", q: "Kenapa tetap perlu validasi di server (PHP)?", a: "Validasi JavaScript bisa dilewati (JavaScript dimatikan, data dikirim langsung). Klien = umpan balik cepat, server = keamanan." },
    { tag: "Validasi", q: "Fungsi `let isValid = true` pada pola modul?", a: "Penanda. Setiap cek yang gagal mengubahnya menjadi false; data hanya diproses kalau di akhir masih true." },
    { tag: "➕ HTML5", q: "Kenapa pesan merah tidak muncul saat kolom `required` dikosongkan?", a: "Browser menolak submit lebih dulu dengan gelembung bawaannya. Tambahkan `novalidate` pada form agar JavaScript yang menangani." },
    { tag: "➕ Regex", q: "Cek NIM yang lebih ketat dari isNaN?", a: "`/^\\d{10}$/.test(nim)`: tepat 10 digit 0–9, tanpa titik, minus, atau huruf e." }
  ],
  quiz: [
    { q: "Event yang dipicu saat sebuah form dikirim adalah …",
      opts: ["onclick", "onsubmit", "onload", "onchange"], ans: 1,
      exp: "onsubmit dipasang pada form dan dipicu saat form dikirim.",
      optExp: ["Dipicu saat elemen diklik.", "Benar.", "Dipicu saat halaman selesai dimuat.", "Dipicu saat nilai kolom berubah lalu ditinggalkan."] },
    { q: "Fungsi `event.preventDefault()` di dalam handler submit adalah …",
      opts: ["Menghapus semua isi form", "Mencegah form langsung terkirim sebelum validasi selesai", "Menampilkan pesan error", "Mengirim form ke server"], ans: 1,
      exp: "Pengiriman ditahan, lalu JavaScript memutuskan sendiri setelah validasi.",
      optExp: ["Itu form.reset().", "Benar.", "Pesan ditulis lewat textContent atau alert.", "Justru kebalikannya."] },
    { q: "Menurut modul, kelebihan `addEventListener` dibanding properti `onclick` adalah …",
      opts: ["Lebih cepat dijalankan browser", "Lebih fleksibel dan tidak menimpa event lain", "Tidak perlu menulis nama event", "Hanya bisa dipakai pada form"], ans: 1,
      exp: "Beberapa fungsi bisa dipasang pada event yang sama.",
      optExp: ["Kecepatannya sama saja.", "Benar.", "Nama event tetap ditulis, misalnya \"click\".", "Bisa dipakai pada elemen apa pun."] },
    { q: "Penulisan yang benar untuk memasang fungsi klik dengan addEventListener adalah …",
      opts: ["`btn.addEventListener(\"onclick\", fn)`", "`btn.addEventListener(\"click\", fn)`", "`btn.addEventListener(click, fn)`", "`btn.onclick(\"click\", fn)`"], ans: 1,
      exp: "Nama event berupa string tanpa awalan on.",
      optExp: ["Event \"onclick\" tidak ada, fungsi tidak pernah jalan.", "Benar.", "click tanpa tanda kutip dianggap variabel.", "onclick bukan fungsi pemasang."] },
    { q: "Kode `if (!document.getElementById(\"nama\").value)` dipakai untuk memeriksa …",
      opts: ["Nama berisi angka", "Nama kosong (field wajib)", "Nama terlalu panjang", "Format email"], ans: 1,
      exp: "String kosong bernilai false, jadi !\"\" bernilai true.",
      optExp: ["Tidak mengecek angka.", "Benar.", "Tidak mengecek panjang.", "Tidak terkait email."] },
    { q: "Pada pola `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`, bagian `[^\\s@]+` berarti …",
      opts: ["Satu tanda @", "Satu karakter atau lebih yang bukan spasi dan bukan @", "Harus diawali spasi", "Hanya huruf kapital"], ans: 1,
      exp: "^ di dalam kurung siku berarti \"selain\", + berarti satu atau lebih.",
      optExp: ["@ ditulis terpisah setelahnya.", "Benar.", "Spasi justru dilarang.", "Tidak membatasi huruf kapital."] },
    { q: "Email berikut yang LOLOS pola regex modul adalah …",
      opts: ["`ahmad@kampus`", "`ahmad kampus@x.id`", "`ahmad@kampus.ac.id`", "`@kampus.ac.id`"], ans: 2,
      exp: "Lengkap: teks, @, domain, titik, akhiran.",
      optExp: ["Tidak ada titik setelah @.", "Ada spasi sebelum @.", "Benar.", "Tidak ada teks sebelum @."] },
    { q: "Method yang dipakai untuk mencocokkan teks dengan pola regex di JavaScript adalah …",
      opts: ["`pola.match()`", "`pola.test(teks)`", "`teks.regex(pola)`", "`isNaN(pola)`"], ans: 1,
      exp: "test() mengembalikan true atau false.",
      optExp: ["match() milik string (teks.match(pola)) dan mengembalikan hasil cocokan, bukan true/false.", "Benar.", "Method itu tidak ada.", "isNaN mengecek angka."] },
    { q: "Kondisi `isNaN(nim) || nim.length !== 10` bernilai true (ditolak) jika NIM …",
      opts: ["`\"2401010001\"`", "`\"240101000A\"`", "`\"1234567890\"`", "`\"0000000001\"`"], ans: 1,
      exp: "Ada huruf A sehingga isNaN true.",
      optExp: ["10 digit angka, lolos.", "Benar.", "10 digit angka, lolos.", "10 digit angka, lolos."] },
    { q: "Menurut praktik terbaik modul, validasi sebaiknya dilakukan di …",
      opts: ["Klien saja, karena lebih cepat", "Server saja, karena lebih aman", "Klien untuk UX cepat dan selalu juga di server untuk keamanan", "Tidak perlu jika input memakai required"], ans: 2,
      exp: "Validasi JavaScript bisa dilewati, jadi server tetap mengecek.",
      optExp: ["Bisa dilewati pengguna.", "Umpan balik jadi lambat.", "Benar.", "required juga hanya di klien."] },
    { q: "Pada tugas modul, kolom jurusan dianggap belum dipilih jika …",
      opts: ["`jurusan.value` bernilai \"\" (opsi default)", "`jurusan.length` = 0", "`jurusan.checked` false", "`jurusan.textContent` kosong"], ans: 0,
      exp: "Opsi default \"Pilih Jurusan\" punya value=\"\".",
      optExp: ["Benar.", "Itu jumlah opsi, bukan pilihan.", "checked untuk checkbox/radio.", "textContent select berisi semua teks opsi."] },
    { q: "Setelah data valid ditambahkan ke tabel, kode yang mengosongkan semua kolom form adalah …",
      opts: ["`form.clear()`", "`form.reset()`", "`form.innerHTML = \"\"`", "`form.preventDefault()`"], ans: 1,
      exp: "reset() mengembalikan semua kolom ke nilai awal.",
      optExp: ["Method itu tidak ada.", "Benar.", "Menghapus kolomnya sekalian.", "preventDefault milik event, bukan form."] },
    { q: "Kolom memakai atribut `required`. Saat dikosongkan lalu Simpan diklik, yang muncul justru gelembung bawaan browser, bukan teks merah dari JavaScript. Penyebabnya …",
      opts: ["JavaScript error", "Browser mengecek required sebelum event submit berjalan", "preventDefault tidak dipanggil", "span error salah id"], ans: 1,
      exp: "➕ Tambahkan novalidate pada form agar JavaScript yang menangani.",
      optExp: ["Tidak harus ada error.", "Benar.", "preventDefault tidak mempengaruhi cek required.", "Kalau id salah, pesan juga tidak muncul untuk kolom lain."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 9*
📚 *Validasi Form dengan JavaScript*

1️⃣ *Event listener:* onclick (diklik), onsubmit (form dikirim, dipasang di form), addEventListener("click"/"submit", fn) → cara modern, tidak saling menimpa.

2️⃣ *preventDefault():* menahan form agar tidak langsung terkirim sebelum validasi selesai.

3️⃣ *Pola modul:* preventDefault → isValid = true → kosongkan pesan error → cek tiap kolom (salah: isi span error, isValid = false) → kalau valid: proses + form.reset().

4️⃣ *Jenis validasi:* field wajib (!input.value), panjang (length < 3), angka (isNaN, length !== 10), email (regex .test), select (value "").

5️⃣ *Regex email:* /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ → teks@domain.akhiran, tanpa spasi.

6️⃣ *Penting:* validasi klien = UX cepat; server (PHP) = keamanan, wajib juga. ➕ required + type="email" dicek browser dulu (pakai novalidate kalau mau JS yang menangani).`
});
