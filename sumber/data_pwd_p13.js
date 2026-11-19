// Pemrograman Web Dinamis — Pertemuan 13: CRUD dengan PHP dan MySQL
// Sumber: Modul PHP 13. Bagian bertanda ➕ bukan dari modul.
const { fix } = require("./pwd_uas_util.js");

const SEED = `CREATE DATABASE db_mahasiswa; USE db_mahasiswa;
CREATE TABLE mahasiswa (id INT AUTO_INCREMENT PRIMARY KEY, nim VARCHAR(10) NOT NULL, nama VARCHAR(100) NOT NULL, jurusan VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL);
INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES
('2401010001', 'Ahmad', 'Sistem Informasi', 'ahmad@example.com'),
('2401010002', 'Budi', 'Teknik Informatika', 'budi@example.com'),
('2401010003', 'Citra', 'Sistem Informasi', 'citra@example.com'),
('2401010004', 'Dewi', 'Manajemen', 'dewi@example.com');`;

const CRUD = [{ value: "C", label: "Create" }, { value: "R", label: "Read" }, { value: "U", label: "Update" }, { value: "D", label: "Delete" }];
const SQL = ["SELECT", "INSERT INTO", "UPDATE … SET", "DELETE FROM"];
const FN = ["mysqli_query()", "mysqli_fetch_assoc()", "mysqli_num_rows()", "mysqli_error()", "include", "$_GET", "$_POST"];

module.exports = fix({
  id: "p13",
  nomor: 13,
  judul: "CRUD dengan PHP dan MySQL",
  ujian: "UAS",
  hero: {
    badge: "Materi 13 • Pemrograman Web Dinamis",
    title: "Create, Read, Update, Delete dari Halaman Web",
    text: "Empat operasi inti aplikasi data: <strong>INSERT</strong> (Create), <strong>SELECT</strong> (Read), <strong>UPDATE</strong>, dan <strong>DELETE</strong>. Jalankan dari PHP dengan <code>mysqli_query()</code>, tampilkan hasil dengan <code>mysqli_fetch_assoc()</code>, dan amankan input dari <strong>SQL Injection</strong>."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • CRUD = 4 Query",
      title: "Operasi CRUD dan Query MySQL-nya",
      headers: ["Operasi", "Artinya", "Query", "Di aplikasi"],
      rows: [
        ["<strong>C</strong>reate", "Menambah data baru", "`INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES ('1234567890', 'Ahmad', 'Sistem Informasi', 'ahmad@example.com');`", "Form pendaftaran → Tambah"],
        ["<strong>R</strong>ead", "Membaca/menampilkan data", "`SELECT * FROM mahasiswa;` • `SELECT nim, nama FROM mahasiswa WHERE jurusan = 'Sistem Informasi';`", "Tabel daftar mahasiswa"],
        ["<strong>U</strong>pdate", "Memperbarui data yang ada", "`UPDATE mahasiswa SET email = 'ahmad@new.com' WHERE id = 1;`", "Link Edit → form → Perbarui"],
        ["<strong>D</strong>elete", "Menghapus data", "`DELETE FROM mahasiswa WHERE id = 1;`", "Link Hapus + konfirmasi"]
      ],
      modes: [
        { label: "WHERE wajib", target: "row", row: 2, title: "Tanpa WHERE = semua baris", text: "Saran modul: gunakan WHERE untuk memastikan query hanya memengaruhi data tertentu. <code>UPDATE mahasiswa SET email = '…';</code> tanpa WHERE mengubah email <strong>semua</strong> mahasiswa; <code>DELETE FROM mahasiswa;</code> menghapus semuanya." },
        { label: "SELECT *", target: "row", row: 1, title: "* = semua kolom", text: "<code>SELECT *</code> mengambil semua kolom. Sebut nama kolom (<code>SELECT nim, nama</code>) kalau hanya butuh sebagian." },
        { label: "Kutip", target: "row", row: 0, title: "Teks pakai kutip, angka tidak", text: "Nilai teks ditulis di antara kutip tunggal (<code>'Ahmad'</code>). Angka seperti id tidak perlu kutip (<code>WHERE id = 1</code>)." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 2 • Fungsi PHP untuk Query",
      title: "Menjalankan dan Membaca Hasil Query",
      headers: ["Fungsi", "Gunanya", "Contoh"],
      rows: [
        ["`mysqli_query($conn, $sql)`", "Menjalankan SQL. INSERT/UPDATE/DELETE → true/false. SELECT → hasil (result)", "`if (mysqli_query($conn, $sql)) { echo \"Berhasil\"; }`"],
        ["`mysqli_fetch_assoc($result)`", "Mengambil <strong>satu baris</strong> hasil sebagai array dengan nama kolom; null kalau baris habis", "`while ($row = mysqli_fetch_assoc($result)) { echo $row[\"nama\"]; }`"],
        ["`mysqli_num_rows($result)`", "Jumlah baris hasil SELECT", "`if (mysqli_num_rows($result) > 0) { … }`"],
        ["`mysqli_error($conn)`", "Pesan error query terakhir", "`echo \"Gagal: \" . mysqli_error($conn);`"]
      ],
      modes: [
        { label: "Kenapa while?", target: "row", row: 1, title: "Satu panggilan = satu baris", text: "Setiap pemanggilan <code>mysqli_fetch_assoc</code> maju ke baris berikutnya. Saat baris habis hasilnya null, kondisi while false, dan perulangan berhenti. Jadi semua baris tercetak satu per satu." },
        { label: "Saran modul", target: "row", row: 0, title: "Selalu cek hasilnya", text: "Periksa keberhasilan query (<code>if (mysqli_query(…))</code>) dan tampilkan pesan sukses atau error kepada pengguna setelah setiap operasi." }
      ]
    },
    {
      type: "code",
      label: "Interaktif 3 • Pola Read",
      title: "Menampilkan Isi Tabel di HTML",
      file: "crud-simple.php (bagian tabel)",
      code: "<?php\n$sql = \"SELECT * FROM mahasiswa\";\n$result = mysqli_query($conn, $sql);\n\nif (mysqli_num_rows($result) > 0) {\n    while ($row = mysqli_fetch_assoc($result)) {\n        echo \"<tr>\";\n        echo \"<td>\" . $row[\"nim\"] . \"</td>\";\n        echo \"<td>\" . $row[\"nama\"] . \"</td>\";\n        echo \"<td>\" . $row[\"jurusan\"] . \"</td>\";\n        echo \"<td>\" . $row[\"email\"] . \"</td>\";\n        echo \"</tr>\";\n    }\n} else {\n    echo \"<tr><td colspan='4'>Belum ada data mahasiswa.</td></tr>\";\n}\nmysqli_close($conn);\n?>",
      note: "<code>$row[\"nim\"]</code>: kunci array = nama kolom di tabel. <code>colspan='4'</code> membuat satu sel selebar 4 kolom."
    },
    {
      type: "table",
      label: "Interaktif 4 • Edit dan Hapus lewat Link",
      title: "Cara Tugas Modul Mengirim id",
      headers: ["Aksi", "Link di tabel", "Dibaca PHP", "Query"],
      rows: [
        ["Edit (ambil data)", "`<a href='?edit=3'>Edit</a>`", "`$_GET[\"edit\"]` → 3", "`SELECT * FROM mahasiswa WHERE id = 3`"],
        ["Perbarui (simpan)", "Form POST dengan `<input type=\"hidden\" name=\"id\">`", "`$_POST[\"id\"]`", "`UPDATE mahasiswa SET … WHERE id = 3`"],
        ["Hapus", "`<a href='?delete=3' onclick='return confirm(\"Yakin ingin menghapus?\")'>`", "`$_GET[\"delete\"]` → 3", "`DELETE FROM mahasiswa WHERE id = 3`"]
      ],
      modes: [
        { label: "?edit=3", target: "row", row: 0, title: "Link = request GET", text: "Href yang diawali <code>?</code> menambahkan query string ke halaman yang sama. Mengklik link mengirim GET, jadi id dibaca dengan <code>$_GET</code>." },
        { label: "input hidden", target: "row", row: 1, title: "Kolom tak terlihat", text: "<code>type=\"hidden\"</code> tidak tampil di layar tetapi ikut terkirim saat form disubmit. Dipakai untuk membawa id data yang sedang diedit." },
        { label: "confirm()", target: "row", row: 2, title: "Batal kalau Cancel", text: "<code>confirm()</code> menampilkan kotak OK/Cancel. <code>return false</code> (Cancel) membatalkan link, jadi data tidak terhapus." }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Koreksi Modul",
      tone: "warning",
      heading: "htmlspecialchars() tidak mencegah SQL Injection",
      html: "Praktik terbaik di modul menyebut <code>htmlspecialchars()</code> untuk mencegah SQL Injection. Fungsi itu untuk <strong>XSS</strong> (tampilan HTML). Contoh tugas memasukkan <code>$_GET[\"delete\"]</code> langsung ke SQL, sehingga alamat <code>?delete=1 OR 1=1</code> menghapus <strong>semua</strong> data. Pencegah SQL Injection yang benar adalah yang juga disebut modul: <strong>prepared statements</strong>. Untuk id, cara cepatnya <code>$id = (int) $_GET[\"delete\"];</code>."
    }
  ],
  simulator: [
    {
      type: "sql-lab",
      profile: "pwd-p13",
      label: "Lab phpMyAdmin • Query CRUD",
      title: "Jalankan INSERT, SELECT, UPDATE, DELETE pada db_mahasiswa",
      desc: "Tabel <code>mahasiswa</code> sudah berisi 4 baris. Muat contoh, ubah nilainya, lalu jalankan. Contoh bertanda ⚠ menunjukkan apa yang terjadi kalau WHERE lupa ditulis, atau kalau isian pengguna masuk mentah ke SQL: <code>?delete=1 OR 1=1</code> di alamat, atau <code>' OR '1'='1</code> di kolom NIM. Tekan <strong>Kembalikan data awal</strong> setelahnya.",
      tip: "Simulasi di browser. Query yang sama persis bisa ditempel di tab SQL phpMyAdmin atau ditulis di $sql pada PHP.",
      seed: SEED,
      examples: [
        { label: "R: semua data", sql: "SELECT * FROM mahasiswa;" },
        { label: "R: dengan WHERE", sql: "SELECT nim, nama FROM mahasiswa WHERE jurusan = 'Sistem Informasi';" },
        { label: "C: tambah", sql: "INSERT INTO mahasiswa (nim, nama, jurusan, email)\nVALUES ('2401010005', 'Eka', 'Manajemen', 'eka@example.com');\nSELECT * FROM mahasiswa;" },
        { label: "U: ubah email id 1", sql: "UPDATE mahasiswa SET email = 'ahmad@new.com' WHERE id = 1;\nSELECT id, nama, email FROM mahasiswa;" },
        { label: "U: tugas (semua kolom)", sql: "UPDATE mahasiswa SET nim='2401010002', nama='Budi Santoso', jurusan='Sistem Informasi', email='budi@example.com' WHERE id=2;\nSELECT * FROM mahasiswa WHERE id = 2;" },
        { label: "D: hapus id 4", sql: "DELETE FROM mahasiswa WHERE id = 4;\nSELECT id, nama FROM mahasiswa;" },
        { label: "⚠ UPDATE tanpa WHERE", sql: "UPDATE mahasiswa SET email = 'ahmad@new.com';\nSELECT id, nama, email FROM mahasiswa;" },
        { label: "⚠ ?delete=1 OR 1=1", sql: "DELETE FROM mahasiswa WHERE id = 1 OR 1=1;\nSELECT COUNT(*) FROM mahasiswa;" },
        { label: "⚠ nim berisi ' OR '1'='1", sql: "SELECT * FROM mahasiswa WHERE nim = '' OR '1'='1';" }
      ]
    },
    {
      type: "penelusur",
      label: "Penelusur 1 • Create",
      title: "Klik Tambah sampai Baris Baru Tampil",
      desc: "Alur <code>crud-simple.php</code> dari aktivitas modul. Tekan <strong>Berikutnya</strong>.",
      nodes: [{ t: "Browser", s: "crud-simple.php" }, { t: "PHP + MySQL", s: "db_mahasiswa" }],
      steps: [
        { on: 0, label: "Form diisi", msg: "NIM: 2401010005\nNama: Eka\nJurusan: Manajemen\nEmail: eka@example.com\n[Tambah]  ← name=\"create\"", hl: [4], say: "Tombol Tambah punya <code>name=\"create\"</code>, sehingga PHP tahu tombol mana yang ditekan." },
        { dot: "req", label: "Request POST", msg: "POST /crud-mahasiswa/crud-simple.php\n\nnim=2401010005&nama=Eka&jurusan=Manajemen&email=eka%40example.com&create=", hl: [2], say: "Data dikirim di body (P11)." },
        { on: 1, label: "PHP memeriksa", msg: "isset($_POST[\"create\"])            ✔\n!empty(...) semua kolom             ✔\nfilter_var($email, ...)             ✔\nstrlen($nim) == 10 && is_numeric    ✔", hl: [0, 1, 2, 3], say: "Validasi server: semua terisi, email valid, NIM 10 digit angka." },
        { on: 1, label: "PHP menyusun SQL", msg: "INSERT INTO mahasiswa (nim, nama, jurusan, email)\nVALUES ('2401010005', 'Eka', 'Manajemen', 'eka@example.com')", hl: [0, 1], say: "Nilai dari form disisipkan ke string SQL, lalu dijalankan dengan <code>mysqli_query($conn, $sql)</code>. id tidak ditulis karena AUTO_INCREMENT." },
        { on: 1, label: "Bagian Read", msg: "SELECT * FROM mahasiswa\n→ 5 baris, diulang dengan while + mysqli_fetch_assoc", hl: [0], say: "Halaman yang sama lalu menjalankan SELECT untuk menyusun tabel. Baris baru sudah ikut." },
        { dot: "res", label: "Response", msg: "Data berhasil ditambahkan!\n\nNIM        | Nama  | Jurusan    | Email\n2401010005 | Eka   | Manajemen  | eka@example.com", hl: [0, 3], say: "Browser menerima HTML berisi pesan sukses dan tabel terbaru." }
      ]
    },
    {
      type: "penelusur",
      label: "Penelusur 2 • Delete",
      title: "Klik Hapus pada Baris id 3",
      desc: "Alur Delete di contoh tugas modul.",
      nodes: [{ t: "Browser", s: "crud-mahasiswa.php" }, { t: "PHP + MySQL", s: "db_mahasiswa" }],
      steps: [
        { on: 0, label: "Link Hapus", msg: "<a href='?delete=3' onclick='return confirm(\"Yakin ingin menghapus?\")'>Hapus</a>", hl: [0], say: "Setiap baris punya link Hapus berisi id-nya sendiri." },
        { on: 0, label: "Kotak konfirmasi", msg: "Yakin ingin menghapus?\n[OK]  [Cancel]", hl: [0], say: "<code>confirm()</code> dijalankan di browser. Cancel membatalkan link." },
        { dot: "req", label: "Request GET", msg: "GET /crud-mahasiswa/crud-mahasiswa.php?delete=3", hl: [0], say: "OK: browser membuka alamat dengan query string <code>?delete=3</code>." },
        { on: 1, label: "PHP menyusun SQL", msg: "$id = $_GET[\"delete\"];        // \"3\"\n$sql = \"DELETE FROM mahasiswa WHERE id = $id\";\n→ DELETE FROM mahasiswa WHERE id = 3", hl: [2], say: "WHERE memastikan hanya baris id 3 yang terhapus." },
        { dot: "res", label: "Response", msg: "Data berhasil dihapus!\n(tabel tanpa baris id 3)", hl: [0], say: "Pesan sukses dan tabel terbaru." },
        { on: 1, label: "➕ Kalau alamatnya diubah", msg: "?delete=3 OR 1=1\n→ DELETE FROM mahasiswa WHERE id = 3 OR 1=1\n→ SEMUA baris terhapus", hl: [1, 2], say: "Karena <code>$_GET</code> dimasukkan mentah ke SQL, siapa pun bisa mengubah perintahnya: <strong>SQL Injection</strong>. Cegah dengan <code>(int) $_GET[\"delete\"]</code> atau prepared statement." }
      ]
    },
    {
      type: "terminal",
      label: "Permainan 1 • SQL yang Disusun PHP",
      title: "Input Pengguna → String SQL",
      desc: "Kode modul: <code>$sql = \"DELETE FROM mahasiswa WHERE id = $id\";</code> dan <code>VALUES ('$nim', '$nama', …)</code> dengan <code>htmlspecialchars</code>. Keluaran dicek dengan PHP 8.3.",
      shell: "$sql =",
      header: "Isi $sql yang dikirim ke MySQL",
      scenarios: [
        { label: "1. ?delete=3", pill: "Aman", ok: true, cmd: "$id = $_GET[\"delete\"];   // \"3\"", res: "DELETE FROM mahasiswa WHERE id = 3", exp: "Sesuai harapan: satu baris." },
        { label: "2. ?delete=3 OR 1=1", pill: "Injection", ok: false, cmd: "$id = $_GET[\"delete\"];   // \"3 OR 1=1\"", res: "DELETE FROM mahasiswa WHERE id = 3 OR 1=1", exp: "<code>1=1</code> selalu benar, jadi semua baris cocok dan terhapus. Coba di lab: contoh ⚠ ?delete=1 OR 1=1." },
        { label: "3. Dengan (int)", pill: "Aman", ok: true, cmd: "$id = (int) $_GET[\"delete\"];   // \"3 OR 1=1\" → 3", res: "DELETE FROM mahasiswa WHERE id = 3", exp: "➕ <code>(int)</code> mengubah teks menjadi bilangan bulat; sisa teks setelah angka dibuang." },
        { label: "4. Nama dengan kutip", pill: "Tersimpan aneh", ok: false, cmd: "$nama = htmlspecialchars(\"Jum'at\");", res: "INSERT INTO mahasiswa (…) VALUES ('2401010009', 'Jum&#039;at', 'Manajemen', 'a@b.c')", exp: "➕ Sejak PHP 8.1, <code>htmlspecialchars</code> juga mengubah kutip tunggal, jadi query tidak rusak. Tetapi yang tersimpan di database adalah <code>Jum&amp;#039;at</code>, bukan Jum'at. Prepared statement menyimpan teks aslinya." },
        { label: "5. Prepared statement", pill: "Aman", ok: true, cmd: "$stmt = mysqli_prepare($conn, \"DELETE FROM mahasiswa WHERE id = ?\");\nmysqli_stmt_bind_param($stmt, \"i\", $id);\nmysqli_stmt_execute($stmt);", res: "DELETE FROM mahasiswa WHERE id = ?   (nilai ? dikirim terpisah)", exp: "➕ SQL dan data dikirim terpisah. Apa pun isi <code>$id</code>, MySQL hanya menganggapnya sebagai nilai, tidak pernah sebagai bagian perintah." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Huruf CRUD",
      title: "Aksi di Aplikasi → Operasi CRUD",
      headers: ["Aksi pengguna", "Operasi"],
      rows: [
        { cells: ["Mendaftarkan mahasiswa baru lewat form"], fields: [{ options: CRUD, answer: "C" }], ok: "✓ INSERT" },
        { cells: ["Membuka halaman daftar mahasiswa"], fields: [{ options: CRUD, answer: "R" }], ok: "✓ SELECT" },
        { cells: ["Mengubah email mahasiswa yang salah ketik"], fields: [{ options: CRUD, answer: "U" }], ok: "✓ UPDATE" },
        { cells: ["Menekan link Hapus lalu OK"], fields: [{ options: CRUD, answer: "D" }], ok: "✓ DELETE" },
        { cells: ["Mencari mahasiswa jurusan Manajemen"], fields: [{ options: CRUD, answer: "R" }], ok: "✓ SELECT … WHERE" },
        { cells: ["Klik Edit untuk memuat data ke form"], fields: [{ options: CRUD, answer: "R" }], ok: "✓ memuat = SELECT; menyimpan perubahan = UPDATE" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Awal Query",
      title: "Pilih Kata Kunci SQL",
      headers: ["Kebutuhan", "Query diawali"],
      rows: [
        { cells: ["Menambah baris baru"], fields: [{ options: SQL, answer: "INSERT INTO" }], ok: "✓" },
        { cells: ["Menampilkan nim dan nama"], fields: [{ options: SQL, answer: "SELECT" }], ok: "✓" },
        { cells: ["Mengganti jurusan mahasiswa id 2"], fields: [{ options: SQL, answer: "UPDATE … SET" }], ok: "✓ … WHERE id = 2" },
        { cells: ["Menghapus mahasiswa id 2"], fields: [{ options: SQL, answer: "DELETE FROM" }], ok: "✓ … WHERE id = 2" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 4 • Fungsi PHP yang Tepat",
      title: "Kebutuhan → Fungsi",
      headers: ["Kebutuhan", "Fungsi"],
      rows: [
        { cells: ["Menjalankan query INSERT"], fields: [{ options: FN, answer: "mysqli_query()" }], ok: "✓" },
        { cells: ["Mengambil hasil SELECT baris demi baris"], fields: [{ options: FN, answer: "mysqli_fetch_assoc()" }], ok: "✓ di dalam while" },
        { cells: ["Mengecek apakah tabel ada isinya"], fields: [{ options: FN, answer: "mysqli_num_rows()" }], ok: "✓ &gt; 0" },
        { cells: ["Menampilkan penyebab query gagal"], fields: [{ options: FN, answer: "mysqli_error()" }], ok: "✓" },
        { cells: ["Memakai koneksi dari config.php"], fields: [{ options: FN, answer: "include" }], ok: "✓" },
        { cells: ["Membaca id dari link <code>?delete=3</code>"], fields: [{ options: FN, answer: "$_GET" }], ok: "✓" },
        { cells: ["Membaca id dari input hidden saat form Perbarui dikirim"], fields: [{ options: FN, answer: "$_POST" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Tebak Hasil • Tabel 4 Baris",
      title: "Berapa Baris Tersisa / Berubah?",
      desc: "Mulai dari tabel di lab: id 1 Ahmad (SI), 2 Budi (TI), 3 Citra (SI), 4 Dewi (Manajemen).",
      items: [
        { prompt: "`DELETE FROM mahasiswa WHERE id = 2;`", answer: "Tersisa 3 baris", reason: "Hanya Budi." },
        { prompt: "`DELETE FROM mahasiswa WHERE jurusan = 'Sistem Informasi';`", answer: "Tersisa 2 baris", reason: "Ahmad dan Citra terhapus." },
        { prompt: "`UPDATE mahasiswa SET jurusan = 'Manajemen';`", answer: "4 baris berubah", reason: "Tanpa WHERE, semua baris." },
        { prompt: "`SELECT nama FROM mahasiswa WHERE id = 9;`", answer: "0 baris (Empty set)", reason: "Tidak ada id 9; mysqli_num_rows = 0, jadi tampil \"Belum ada data\"." },
        { prompt: "INSERT satu baris baru, lalu `SELECT MAX(id) FROM mahasiswa;`", answer: "5", reason: "AUTO_INCREMENT memberi id berikutnya." },
        { prompt: "`DELETE FROM mahasiswa WHERE id = 1 OR 1=1;`", answer: "0 baris tersisa", reason: "SQL Injection: 1=1 selalu benar." }
      ]
    }
  ],
  flashcards: [
    { tag: "CRUD", q: "Kepanjangan CRUD dan artinya?", a: "Create (tambah data), Read (baca/tampilkan), Update (perbarui), Delete (hapus)." },
    { tag: "CRUD", q: "Query MySQL untuk tiap operasi CRUD?", a: "Create = INSERT INTO • Read = SELECT • Update = UPDATE … SET • Delete = DELETE FROM." },
    { tag: "SQL", q: "Contoh INSERT dari modul?", a: "`INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES ('1234567890', 'Ahmad', 'Sistem Informasi', 'ahmad@example.com');`" },
    { tag: "SQL", q: "Contoh UPDATE dan DELETE dari modul?", a: "`UPDATE mahasiswa SET email = 'ahmad@new.com' WHERE id = 1;` • `DELETE FROM mahasiswa WHERE id = 1;`" },
    { tag: "SQL", q: "Kenapa UPDATE/DELETE harus memakai WHERE?", a: "Agar hanya data tertentu yang terpengaruh. Tanpa WHERE, semua baris diubah/dihapus." },
    { tag: "PHP", q: "Fungsi `mysqli_query($conn, $sql)`?", a: "Menjalankan query. Untuk INSERT/UPDATE/DELETE hasilnya true/false; untuk SELECT hasilnya result yang dibaca dengan mysqli_fetch_assoc." },
    { tag: "PHP", q: "Fungsi `mysqli_fetch_assoc($result)`?", a: "Mengambil satu baris hasil SELECT sebagai array asosiatif (`$row[\"nama\"]`). Dipakai di `while` sampai baris habis." },
    { tag: "PHP", q: "Fungsi `mysqli_num_rows($result)`?", a: "Jumlah baris hasil SELECT; dipakai untuk menampilkan \"Belum ada data\" jika 0." },
    { tag: "Tugas", q: "Bagaimana link Edit/Hapus mengirim id?", a: "Lewat query string: `?edit=3`, `?delete=3`, dibaca dengan `$_GET[\"edit\"]`/`$_GET[\"delete\"]`." },
    { tag: "Tugas", q: "Fungsi `<input type=\"hidden\" name=\"id\">` di form edit?", a: "Membawa id data yang diedit saat form Perbarui dikirim (POST), tanpa tampil di layar." },
    { tag: "Keamanan", q: "Apa itu SQL Injection?", a: "Input pengguna yang masuk mentah ke query mengubah perintah SQL, misalnya `?delete=1 OR 1=1` menghapus semua baris." },
    { tag: "Keamanan", q: "Cara mencegah SQL Injection?", a: "Prepared statements (`mysqli_prepare` + `?` + `mysqli_stmt_bind_param`). Untuk id: `(int) $_GET[\"id\"]`. ➕ htmlspecialchars bukan untuk ini, tetapi untuk XSS." },
    { tag: "Praktik", q: "Saran modul setelah setiap operasi CRUD?", a: "Periksa keberhasilan `mysqli_query()` dan tampilkan pesan sukses atau error kepada pengguna." }
  ],
  quiz: [
    { q: "Operasi CRUD yang digunakan untuk menampilkan daftar mahasiswa adalah …",
      opts: ["Create", "Read", "Update", "Delete"], ans: 1,
      exp: "Read = SELECT.",
      optExp: ["Menambah.", "Benar.", "Memperbarui.", "Menghapus."] },
    { q: "Query untuk menambahkan data baru ke tabel adalah …",
      opts: ["SELECT", "INSERT INTO", "UPDATE", "ADD ROW"], ans: 1,
      exp: "INSERT INTO mahasiswa (…) VALUES (…);",
      optExp: ["Membaca.", "Benar.", "Mengubah data yang ada.", "Bukan perintah SQL."] },
    { q: "Query `SELECT nim, nama FROM mahasiswa WHERE jurusan = 'Sistem Informasi';` akan …",
      opts: ["Menghapus mahasiswa SI", "Menampilkan nim dan nama mahasiswa jurusan SI", "Mengubah jurusan menjadi SI", "Menampilkan semua kolom semua mahasiswa"], ans: 1,
      exp: "Kolom tertentu dengan syarat WHERE.",
      optExp: ["Itu DELETE.", "Benar.", "Itu UPDATE.", "Itu SELECT * tanpa WHERE."] },
    { q: "Penulisan UPDATE yang benar untuk mengubah email mahasiswa ber-id 1 adalah …",
      opts: ["`UPDATE mahasiswa email = 'ahmad@new.com' WHERE id = 1;`", "`UPDATE mahasiswa SET email = 'ahmad@new.com' WHERE id = 1;`", "`UPDATE SET email = 'ahmad@new.com' FROM mahasiswa;`", "`CHANGE mahasiswa SET email = 'ahmad@new.com';`"], ans: 1,
      exp: "UPDATE tabel SET kolom = nilai WHERE syarat;",
      optExp: ["Kurang SET.", "Benar.", "Susunan salah dan tanpa WHERE.", "CHANGE bukan perintah ini."] },
    { q: "Apa yang terjadi jika `DELETE FROM mahasiswa;` dijalankan tanpa WHERE?",
      opts: ["Error karena WHERE wajib", "Semua baris di tabel mahasiswa terhapus", "Hanya baris pertama terhapus", "Tabelnya ikut terhapus"], ans: 1,
      exp: "Saran modul: gunakan WHERE agar hanya data tertentu yang terpengaruh.",
      optExp: ["Tidak error.", "Benar.", "Semua baris.", "Struktur tabel tetap ada (menghapus tabel = DROP TABLE)."] },
    { q: "Fungsi PHP untuk menjalankan query ke database adalah …",
      opts: ["`mysqli_run()`", "`mysqli_query($conn, $sql)`", "`mysql_execute()`", "`sql_query()`"], ans: 1,
      exp: "Argumen pertama koneksi, kedua string SQL.",
      optExp: ["Tidak ada.", "Benar.", "Tidak ada.", "Tidak ada."] },
    { q: "Fungsi `mysqli_fetch_assoc($result)` mengembalikan …",
      opts: ["Jumlah baris", "Satu baris hasil sebagai array dengan nama kolom sebagai kunci", "Pesan error", "Seluruh tabel sebagai teks"], ans: 1,
      exp: "$row[\"nama\"], diulang dengan while.",
      optExp: ["Itu mysqli_num_rows.", "Benar.", "Itu mysqli_error.", "Bukan."] },
    { q: "Pada `while ($row = mysqli_fetch_assoc($result))`, perulangan berhenti saat …",
      opts: ["Baris hasil sudah habis (fungsi mengembalikan null)", "Ditemukan baris kosong", "Setelah 10 baris", "Koneksi ditutup"], ans: 0,
      exp: "null dianggap false.",
      optExp: ["Benar.", "Bukan syaratnya.", "Tidak ada batas itu.", "Koneksi ditutup setelahnya."] },
    { q: "Fungsi `mysqli_num_rows($result) > 0` pada aktivitas modul dipakai untuk …",
      opts: ["Menghapus baris kosong", "Mengecek ada tidaknya data sebelum menampilkan tabel", "Menambah nomor urut", "Menghitung kolom"], ans: 1,
      exp: "Jika 0 tampil \"Belum ada data mahasiswa.\"",
      optExp: ["Tidak menghapus.", "Benar.", "Bukan.", "Menghitung baris, bukan kolom."] },
    { q: "Pada tugas modul, link `<a href='?delete=3'>Hapus</a>` mengirim id ke PHP melalui …",
      opts: ["`$_POST[\"delete\"]`", "`$_GET[\"delete\"]`", "`$_SESSION[\"delete\"]`", "`$_FILES[\"delete\"]`"], ans: 1,
      exp: "Link mengirim request GET dengan query string.",
      optExp: ["Link tidak mengirim POST.", "Benar.", "Bukan.", "Untuk unggah file."] },
    { q: "Untuk mencegah SQL Injection dengan lebih baik, modul menyarankan …",
      opts: ["Menggunakan prepared statements", "Menghapus kolom id", "Memakai metode GET", "Menutup koneksi lebih cepat"], ans: 0,
      exp: "➕ htmlspecialchars untuk XSS, bukan SQL Injection.",
      optExp: ["Benar.", "Tidak terkait.", "Justru lebih mudah dimanipulasi.", "Tidak terkait."] },
    { q: "Alamat `crud-mahasiswa.php?delete=1 OR 1=1` pada kode `\"DELETE FROM mahasiswa WHERE id = $id\"` (id dari `$_GET` tanpa diolah) menyebabkan …",
      opts: ["Hanya id 1 terhapus", "Semua baris terhapus", "Error sintaks", "Tidak terjadi apa-apa"], ans: 1,
      exp: "SQL menjadi WHERE id = 1 OR 1=1; 1=1 selalu benar.",
      optExp: ["Syarat OR membuat semua cocok.", "Benar.", "Sintaksnya sah.", "Query tetap dijalankan."] },
    { q: "Dalam aplikasi CRUD modul, data yang akan diedit dikirim kembali saat form disubmit menggunakan …",
      opts: ["`<input type=\"hidden\" name=\"id\">`", "`<input type=\"password\">`", "Cookie", "Alert"], ans: 0,
      exp: "Kolom tersembunyi membawa id.",
      optExp: ["Benar.", "Untuk kata sandi.", "Tidak dipakai di modul.", "Hanya pesan."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS PEMROGRAMAN WEB DINAMIS — PERTEMUAN 13*
📚 *CRUD dengan PHP dan MySQL*

1️⃣ *CRUD:* Create (INSERT INTO), Read (SELECT), Update (UPDATE … SET … WHERE), Delete (DELETE FROM … WHERE).

2️⃣ *Contoh:* INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES ('1234567890', 'Ahmad', 'Sistem Informasi', 'ahmad@example.com');
UPDATE mahasiswa SET email = 'ahmad@new.com' WHERE id = 1;
DELETE FROM mahasiswa WHERE id = 1;

3️⃣ *PHP:* include 'config.php' → mysqli_query($conn, $sql) → cek true/false → pesan sukses/error (mysqli_error($conn)).

4️⃣ *Read:* $result = mysqli_query(...); if (mysqli_num_rows($result) > 0) while ($row = mysqli_fetch_assoc($result)) echo $row["nama"];

5️⃣ *Edit/Hapus:* link ?edit=id / ?delete=id ($_GET) + confirm(); form edit membawa id lewat input hidden ($_POST).

6️⃣ *Keamanan:* selalu pakai WHERE; SQL Injection (?delete=1 OR 1=1) dicegah dengan prepared statements / (int). htmlspecialchars = XSS, bukan SQL Injection.`
});
