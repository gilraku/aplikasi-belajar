// Materi Lengkap Basis Data P4 • Bagian 5: SQL lanjutan lain yang sering ada di kuis SQL dasar
// (kurung AND/OR + NOT, subquery, kunci tamu lengkap, fungsi bawaan, VIEW, INDEX, GRANT/REVOKE). Bukan dari modul LMS.
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });
const hasil = (cols, rows) => { const w = cols.map((c, i) => Math.max(c.length, ...rows.map(r => String(r[i]).length))); const line = "+" + w.map(n => "-".repeat(n + 2)).join("+") + "+"; const fmt = r => "| " + r.map((c, i) => String(c).padEnd(w[i])).join(" | ") + " |"; return [line, fmt(cols), line, ...rows.map(fmt), line, rows.length + (rows.length === 1 ? " row" : " rows") + " in set"].join("\n"); };
const salah = (judul, items) => tip("Kesalahan yang sering terjadi: " + judul, `<ul class="list-disc pl-5 space-y-1">${items.map(t => `<li>${t}</li>`).join("")}</ul>`, "warn");

module.exports = [
  A("SQL Lanjutan Lain yang Sering Muncul di Kuis", `<p>Bagian ini melengkapi Bagian 4 dengan enam topik yang sering ada di kuis SQL dasar: <strong>kurung pada AND/OR</strong>, <strong>subquery</strong>, <strong>kunci tamu lengkap</strong>, <strong>fungsi bawaan</strong>, <strong>VIEW dan INDEX</strong>, serta <strong>GRANT/REVOKE</strong>. Semua contoh memakai tabel <code>mahasiswa</code> (slide P4) dan tabel perpustakaan (modul), dan bisa dicoba di lab Simulator P4.</p>`, "Bagian 5 • Bukan dari modul LMS"),

  // ---------- Kurung, AND/OR, NOT ----------
  A("AND, OR, NOT, dan Tanda Kurung", `<p><strong>Artinya:</strong> AND berarti kedua syarat harus benar, OR berarti cukup salah satu, NOT membalik syarat (<code>NOT jurusan = 'Sistem Informasi'</code> sama dengan <code>jurusan &lt;&gt; 'Sistem Informasi'</code>).</p>
<p><strong>Urutan pengerjaan:</strong> seperti kali sebelum tambah di matematika, SQL mengerjakan <strong>NOT dulu, lalu AND, baru OR</strong>. Tanda kurung mengubah urutan itu: isi kurung dikerjakan lebih dulu.</p>
<p><strong>Kapan memakai kurung:</strong> setiap kali satu WHERE mencampur AND dan OR. Tanpa kurung, hasilnya sering tidak sesuai maksud dan tidak muncul pesan galat apa pun.</p>`),
  { type: "choices", label: "Interaktif", title: "Satu Kurung, Hasil Berbeda", style: "toggle", options: [
    { label: "Tanpa kurung", tone: "rose", badge: "3 baris", title: "AND dikerjakan lebih dulu",
      code: "SELECT nama, jurusan, angkatan, ipk FROM mahasiswa\nWHERE jurusan = 'Sistem Informasi' OR angkatan = 2022 AND ipk > 3.30;\n\n" + hasil(["nama", "jurusan", "angkatan", "ipk"], [["Andi Pratama", "Sistem Informasi", "2023", "3.45"], ["Budi Santoso", "Sistem Informasi", "2023", "3.10"], ["Dian Permata", "Sistem Informasi", "2022", "3.25"]]),
      text: "Dibaca: <code>jurusan = SI</code> OR <code>(angkatan = 2022 AND ipk &gt; 3.30)</code>. Semua mahasiswa SI lolos, walaupun IPK Budi dan Dian di bawah 3.30." },
    { label: "Dengan kurung", tone: "emerald", badge: "1 baris", title: "Isi kurung dikerjakan lebih dulu",
      code: "SELECT nama, jurusan, angkatan, ipk FROM mahasiswa\nWHERE (jurusan = 'Sistem Informasi' OR angkatan = 2022) AND ipk > 3.30;\n\n" + hasil(["nama", "jurusan", "angkatan", "ipk"], [["Andi Pratama", "Sistem Informasi", "2023", "3.45"]]),
      text: "Dibaca: (SI atau angkatan 2022), dan IPK di atas 3.30. Hanya Andi yang memenuhi keduanya." }
  ] },

  // ---------- Subquery ----------
  A("Subquery: SELECT di Dalam SELECT", `<p><strong>Artinya:</strong> subquery adalah perintah SELECT yang ditulis di dalam kurung, di dalam perintah lain. Hasil subquery dipakai sebagai nilai pembanding oleh query luarnya.</p>
<p><strong>Kapan dipakai:</strong> saat syaratnya bergantung pada data lain yang harus dicari dulu. Contoh: "buku yang stoknya di atas rata-rata" (rata-ratanya dicari dulu) atau "anggota yang belum pernah meminjam" (daftar peminjam dicari dulu).</p>
<p><strong>Dua bentuk yang paling sering:</strong></p>
<ul class="list-disc pl-5 space-y-1"><li><code>WHERE kolom IN (SELECT …)</code>: subquery menghasilkan <em>daftar</em> nilai. Kebalikannya <code>NOT IN</code>.</li>
<li><code>WHERE kolom &gt; (SELECT AVG(…) …)</code>: subquery menghasilkan <em>satu</em> nilai, lalu dibandingkan dengan =, &lt;, &gt;.</li></ul>
<p>Subquery dikerjakan lebih dulu, baru query luarnya. Banyak soal subquery bisa juga diselesaikan dengan JOIN; keduanya benar selama hasilnya sama.</p>`),
  { type: "table", label: "Tabel Interaktif", title: "Contoh Subquery pada Data Perpustakaan", mono: true, headers: ["Pertanyaan", "Perintah", "Hasil"],
    rows: [
      ["Buku yang pernah dipinjam", "SELECT judul FROM buku WHERE id_buku IN (SELECT id_buku FROM peminjaman);", "Dasar Pemrograman Komputer, Sistem Basis Data"],
      ["Anggota yang belum pernah meminjam", "SELECT nama FROM anggota WHERE id_anggota NOT IN (SELECT id_anggota FROM peminjaman);", "Dimas Prayoga"],
      ["Buku dengan stok di atas rata-rata", "SELECT judul, stok FROM buku WHERE stok > (SELECT AVG(stok) FROM buku);", "Dasar Pemrograman Komputer (4), Analisis Sistem Informasi (5)"],
      ["Buku dengan stok terbanyak", "SELECT judul FROM buku WHERE stok = (SELECT MAX(stok) FROM buku);", "Analisis Sistem Informasi"]
    ],
    modes: [
      { label: "Langkah 1: subquery", target: "row", row: 2, title: "Subquery dikerjakan dulu", text: "<code>SELECT AVG(stok) FROM buku</code> → (4+3+2+5+1)/5 = <strong>3.0000</strong>. Query luar menjadi <code>WHERE stok &gt; 3</code>." },
      { label: "IN vs =", target: "col", col: 1, title: "Banyak nilai atau satu nilai?", text: "Subquery yang bisa menghasilkan banyak baris harus memakai <code>IN</code>. Tanda <code>=</code> hanya untuk subquery yang pasti menghasilkan satu nilai, seperti MAX, MIN, AVG, COUNT." },
      { label: "Versi JOIN", target: "row", row: 1, title: "Bisa juga dengan LEFT JOIN", text: "<code>SELECT a.nama FROM anggota a LEFT JOIN peminjaman p ON p.id_anggota = a.id_anggota WHERE p.id_pinjam IS NULL;</code> menghasilkan Dimas juga." }
    ] },
  salah("Subquery", [
    "<strong>Memakai = untuk subquery yang hasilnya banyak.</strong> <code>WHERE id_buku = (SELECT id_buku FROM peminjaman)</code> ditolak: <em>ERROR 1242 Subquery returns more than 1 row</em>. Pakai <code>IN</code>.",
    "<strong>Subquery IN memilih dua kolom.</strong> <code>IN (SELECT id_buku, id_anggota …)</code> ditolak (ERROR 1241). Subquery di IN hanya boleh satu kolom.",
    "<strong>NOT IN dengan NULL di hasil subquery.</strong> Kalau subquery menghasilkan NULL, <code>NOT IN</code> tidak menampilkan baris apa pun. Tambahkan <code>WHERE kolom IS NOT NULL</code> di subquery.",
    "<strong>Lupa kurung.</strong> Subquery selalu ditulis di dalam ( )."
  ]),

  // ---------- Kunci tamu lengkap ----------
  A("FOREIGN KEY Lengkap: REFERENCES dan ON DELETE", `<p><strong>Artinya:</strong> <code>FOREIGN KEY (kolom) REFERENCES induk(kolom)</code> membuat aturan bahwa setiap nilai di kolom itu harus ada di kolom kunci tabel induk. DBMS lalu menjaga aturan itu secara otomatis (integritas rujukan, P4 Bagian 2).</p>
<p><strong>Kapan dipakai:</strong> pada tabel yang menyimpan nomor penunjuk ke tabel lain, misalnya <code>peminjaman.id_buku</code> → <code>buku.id_buku</code>. Kolom yang dirujuk harus kunci primer (atau UNIQUE) di tabel induk, dan tipe datanya harus sejenis.</p>
<p><strong>Urutan kerja:</strong> buat dan isi tabel <strong>induk</strong> dulu (buku, anggota), baru tabel <strong>anak</strong> (peminjaman). Saat menghapus, kebalikannya: anak dulu, baru induk.</p>`),
  { type: "code", label: "Contoh Kode", title: "Membuat Kunci Tamu", file: "kunci_tamu.sql", code: `CREATE TABLE peminjaman (
  id_pinjam   CHAR(6) NOT NULL,
  id_buku     CHAR(5) NOT NULL,
  id_anggota  CHAR(5),
  tgl_pinjam  DATE NOT NULL,
  PRIMARY KEY (id_pinjam),
  FOREIGN KEY (id_buku) REFERENCES buku(id_buku),
  CONSTRAINT fk_anggota FOREIGN KEY (id_anggota) REFERENCES anggota(id_anggota)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- menambah kunci tamu pada tabel yang sudah ada
ALTER TABLE peminjaman ADD FOREIGN KEY (id_buku) REFERENCES buku(id_buku);
-- menghapusnya (nama dilihat dengan SHOW INDEX FROM peminjaman)
ALTER TABLE peminjaman DROP FOREIGN KEY fk_anggota;`, note: "CONSTRAINT nama boleh dihilangkan; MySQL lalu memberi nama otomatis seperti peminjaman_ibfk_1." },
  { type: "table", label: "Tabel Interaktif", title: "Apa yang Terjadi Saat Induk Dihapus?", headers: ["Pilihan", "Saat baris induk dihapus", "Contoh"],
    rows: [
      ["<strong>RESTRICT</strong> / NO ACTION (bawaan)", "Ditolak selama masih ada baris anak yang merujuknya (ERROR 1451)", "Buku BK002 yang masih dipinjam tidak bisa dihapus"],
      ["<strong>ON DELETE CASCADE</strong>", "Baris anak ikut terhapus otomatis", "Hapus peminjaman → denda milik peminjaman itu ikut hilang"],
      ["<strong>ON DELETE SET NULL</strong>", "Kolom kunci tamu di baris anak diubah menjadi NULL (kolomnya tidak boleh NOT NULL)", "Anggota dihapus → id_anggota di peminjaman menjadi NULL"],
      ["<strong>ON UPDATE CASCADE</strong>", "Kalau nilai kunci induk diganti, nilai di anak ikut berganti", "AG001 diganti AG009 → peminjaman ikut AG009"]
    ],
    modes: [{ label: "Tanpa ON DELETE", target: "row", row: 0, title: "Bawaannya menolak", text: "Kalau ON DELETE tidak ditulis, MySQL memakai RESTRICT: induk yang masih dirujuk tidak bisa dihapus, juga tidak bisa di-DROP (ERROR 3730) atau di-TRUNCATE (ERROR 1701)." }] },
  { type: "table", label: "Kamus Galat", title: "Galat Kunci Tamu", mono: true, headers: ["Galat", "Penyebab", "Perbaikan"],
    rows: [
      ["1452", "INSERT/UPDATE anak dengan nilai yang tidak ada di induk (BK999)", "Isi tabel induk dulu, atau perbaiki nilainya"],
      ["1451", "DELETE/UPDATE induk yang masih dirujuk anak", "Hapus baris anak dulu, atau pakai ON DELETE CASCADE / SET NULL"],
      ["3730", "DROP TABLE induk yang masih dirujuk", "DROP tabel anak dulu"],
      ["1824", "REFERENCES ke tabel yang belum ada", "CREATE TABLE induk dulu"],
      ["1822", "Kolom yang dirujuk bukan kunci primer/UNIQUE di induk", "Rujuk kolom kunci primernya"]
    ] },
  ex("Latihan Interaktif", "Pilih Aturan ON DELETE", ["Kebutuhan", "Aturan"], ["RESTRICT", "CASCADE", "SET NULL"], [
    ["Buku yang masih tercatat dipinjam tidak boleh dihapus", "RESTRICT", "✓ Bawaan MySQL, tidak perlu ditulis."],
    ["Kalau satu pesanan dihapus, semua detail pesanannya ikut terhapus", "CASCADE", "✓ Detail tidak berarti tanpa pesanannya."],
    ["Kalau dosen wali keluar, mahasiswanya tetap ada tetapi kolom dosen wali dikosongkan", "SET NULL", "✓ Kolom kunci tamu harus boleh NULL."]
  ]),

  // ---------- Fungsi bawaan ----------
  A("Fungsi Bawaan: Mengolah Nilai per Baris", `<p><strong>Artinya:</strong> fungsi bawaan mengolah nilai di <em>setiap baris</em>: menggabung teks, mengubah huruf, membulatkan angka, mengambil tahun dari tanggal, mengganti NULL. Berbeda dengan fungsi agregat (COUNT, SUM, …) yang meringkas banyak baris menjadi satu nilai.</p>
<p><strong>Kapan dipakai:</strong> di daftar SELECT untuk merapikan tampilan, di WHERE untuk syarat (misalnya <code>WHERE YEAR(tgl_pinjam) = 2026</code>), atau di UPDATE (<code>SET stok = stok - 1</code>). Hitungan biasa (+, -, *, /) juga boleh ditulis langsung di SELECT, misalnya <code>SELECT stok * 2</code>.</p>`),
  { type: "table", label: "Tabel Interaktif", title: "Fungsi yang Paling Sering Ditanyakan", mono: true, headers: ["Fungsi", "Arti", "Contoh", "Hasil"],
    rows: [
      ["CONCAT(a, b, …)", "Menggabung teks", "CONCAT(nama, ' - ', jurusan)", "Andi Pratama - Sistem Informasi"],
      ["UPPER / LOWER", "Huruf besar / kecil semua", "UPPER(nama)", "ANDI PRATAMA"],
      ["LENGTH / CHAR_LENGTH", "Panjang teks", "LENGTH(nama)", "12"],
      ["SUBSTRING(t, mulai, n)", "Ambil sebagian teks (mulai dari 1)", "SUBSTRING(nim, 1, 2)", "23"],
      ["TRIM / REPLACE", "Buang spasi tepi / ganti teks", "REPLACE(jurusan, 'Sistem', 'Sis.')", "Sis. Informasi"],
      ["ROUND(x, d)", "Bulatkan ke d angka di belakang koma", "ROUND(3.45, 1)", "3.5"],
      ["+ − * /, DIV, %", "Hitungan; DIV = bagi bulat, % = sisa bagi", "ipk * 25 • 7 / 2 • 7 DIV 2 • 7 % 2", "86.25 • 3.5000 • 3 • 1"],
      ["NOW() / CURDATE()", "Tanggal-jam / tanggal hari ini", "CURDATE()", "2026-11-14 (hari ini)"],
      ["YEAR / MONTH / DAY", "Ambil bagian tanggal", "YEAR('2026-10-08')", "2026"],
      ["DATEDIFF(a, b)", "Selisih hari a − b", "DATEDIFF('2026-10-08', '2026-10-01')", "7"],
      ["IFNULL(x, ganti)", "Ganti NULL dengan nilai lain", "IFNULL(tgl_kembali, 'belum kembali')", "belum kembali"]
    ],
    modes: [
      { label: "CONCAT + NULL", target: "row", row: 0, title: "Satu NULL, hasilnya NULL", text: "<code>CONCAT('Buku ', NULL)</code> menghasilkan NULL. Bungkus kolom yang mungkin kosong dengan IFNULL: <code>CONCAT('Kembali: ', IFNULL(tgl_kembali, '-'))</code>." },
      { label: "Pembagian", target: "row", row: 6, title: "/ selalu menghasilkan desimal", text: "Di MySQL <code>7 / 2</code> = 3.5000, bukan 3. Untuk hasil bulat pakai <code>7 DIV 2</code> = 3. Membagi dengan 0 menghasilkan NULL." },
      { label: "Baris vs kelompok", target: "col", col: 0, title: "Fungsi baris ≠ fungsi agregat", text: "UPPER(nama) menghasilkan satu nilai <em>per baris</em> (4 baris → 4 hasil). COUNT(nama) menghasilkan satu nilai <em>untuk semua baris</em>." }
    ] },
  { type: "code", label: "Contoh Kode", title: "Fungsi di SELECT, WHERE, dan UPDATE", file: "fungsi.sql", code: `SELECT id_pinjam,
       IFNULL(tgl_kembali, 'belum kembali') AS kembali,
       DATEDIFF(IFNULL(tgl_kembali, CURDATE()), tgl_pinjam) AS lama_hari
FROM peminjaman;

SELECT nama FROM anggota WHERE UPPER(prodi) = 'SISTEM INFORMASI';
SELECT * FROM peminjaman WHERE YEAR(tgl_pinjam) = 2026 AND MONTH(tgl_pinjam) = 10;

UPDATE buku SET stok = stok - 1 WHERE id_buku = 'BK002';   -- satu eksemplar dipinjam`, note: "Fungsi tidak mengubah isi tabel saat dipakai di SELECT; hasilnya hanya tampilan. Yang mengubah isi hanya UPDATE." },

  // ---------- VIEW dan INDEX ----------
  A("VIEW: Query yang Disimpan dengan Nama", `<p><strong>Artinya:</strong> VIEW adalah perintah SELECT yang disimpan dengan nama, lalu bisa dipakai seperti tabel: <code>SELECT * FROM nama_view</code>. VIEW <strong>tidak menyimpan data sendiri</strong>; setiap kali dibuka, query-nya dijalankan ulang terhadap tabel aslinya, jadi hasilnya selalu terbaru.</p>
<p><strong>Kapan dipakai:</strong> untuk query panjang yang sering dipakai (misalnya JOIN tiga tabel peminjaman), atau untuk memperlihatkan sebagian kolom saja kepada pengguna tertentu.</p>
<p>View sederhana dari satu tabel bisa di-UPDATE di MySQL, tetapi view dengan JOIN, GROUP BY, atau DISTINCT tidak bisa. Di lab Sinau, view hanya bisa dibaca.</p>`),
  { type: "code", label: "Contoh Kode", title: "Membuat dan Memakai VIEW", file: "view.sql", code: `CREATE VIEW v_peminjaman AS
SELECT a.nama, b.judul, p.tgl_pinjam
FROM peminjaman p
JOIN anggota a ON p.id_anggota = a.id_anggota
JOIN buku b    ON p.id_buku = b.id_buku;

SELECT * FROM v_peminjaman WHERE nama LIKE 'N%';
DROP VIEW v_peminjaman;` },
  A("INDEX: Mempercepat Pencarian", `<p><strong>Artinya:</strong> INDEX adalah struktur tambahan yang dibuat DBMS untuk satu kolom supaya pencarian dan pengurutan berdasarkan kolom itu lebih cepat, tanpa membaca seluruh tabel baris per baris.</p>
<p><strong>Kapan dipakai:</strong> pada kolom yang sering muncul di WHERE, JOIN … ON, atau ORDER BY pada tabel besar. Kunci primer, kolom UNIQUE, dan kunci tamu otomatis sudah punya indeks.</p>
<p><strong>Kekurangannya:</strong> indeks memakan ruang dan memperlambat INSERT, UPDATE, DELETE, karena indeks ikut diperbarui. Jadi jangan membuat indeks untuk setiap kolom.</p>`),
  { type: "code", label: "Contoh Kode", title: "Membuat dan Menghapus INDEX", file: "index.sql", code: `CREATE INDEX idx_judul ON buku (judul);
CREATE UNIQUE INDEX idx_email ON anggota (email);   -- sekaligus melarang nilai kembar
SHOW INDEX FROM buku;
DROP INDEX idx_judul ON buku;` },
  salah("VIEW dan INDEX", [
    "<strong>Mengira VIEW menyalin data.</strong> VIEW hanya menyimpan perintah SELECT-nya. Data baru di tabel asli langsung terlihat di VIEW.",
    "<strong>Mengira INDEX mengurutkan isi tabel.</strong> Urutan hasil tetap ditentukan ORDER BY. INDEX hanya mempercepat pencarian.",
    "<strong>Menyebut INDEX sebagai kunci.</strong> INDEX biasa boleh berisi nilai kembar; hanya UNIQUE INDEX dan PRIMARY KEY yang melarangnya."
  ]),

  // ---------- GRANT / REVOKE ----------
  A("GRANT dan REVOKE: Mengatur Hak Akses", `<p><strong>Artinya:</strong> GRANT dan REVOKE adalah perintah <strong>DCL</strong> (Data Control Language). GRANT <em>memberi</em> hak kepada pengguna; REVOKE <em>mencabut</em> hak itu.</p>
<p><strong>Kapan dipakai:</strong> saat satu basis data dipakai beberapa orang dengan tugas berbeda. Misalnya petugas perpustakaan boleh melihat dan menambah data peminjaman, tetapi tidak boleh menghapus tabel. Prinsipnya: berikan hak sesedikit yang dibutuhkan.</p>`),
  { type: "code", label: "Contoh Kode", title: "Memberi dan Mencabut Hak", file: "hak_akses.sql", code: `CREATE USER 'petugas'@'localhost' IDENTIFIED BY 'rahasia';
GRANT SELECT, INSERT ON perpustakaan.* TO 'petugas'@'localhost';
GRANT ALL PRIVILEGES ON perpustakaan.* TO 'admin'@'localhost';
REVOKE INSERT ON perpustakaan.* FROM 'petugas'@'localhost';
SHOW GRANTS FOR 'petugas'@'localhost';` },
  { type: "table", label: "Tabel Interaktif", title: "Membaca Perintah GRANT", mono: true, headers: ["Bagian", "Arti", "Contoh"],
    rows: [
      ["Hak (privilege)", "Perintah apa yang boleh dijalankan", "SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, ALL PRIVILEGES"],
      ["ON", "Berlaku untuk apa", "*.* (semua) • perpustakaan.* (satu basis data) • perpustakaan.buku (satu tabel)"],
      ["TO / FROM", "Untuk pengguna siapa", "GRANT … TO 'petugas'@'localhost' • REVOKE … FROM 'petugas'@'localhost'"]
    ],
    modes: [{ label: "TO vs FROM", target: "row", row: 2, title: "Pasangan kata yang sering tertukar", text: "GRANT <strong>TO</strong> (memberi kepada), REVOKE <strong>FROM</strong> (mencabut dari). <code>REVOKE … TO …</code> adalah galat sintaks." }] },
  ex("Latihan Interaktif", "Perintah Hak Akses Mana?", ["Kebutuhan", "Perintah"], ["GRANT", "REVOKE", "CREATE USER", "SHOW GRANTS"], [
    ["Membuat akun baru untuk petugas", "CREATE USER", "✓ Di MySQL 8, akun harus dibuat dulu sebelum diberi hak."],
    ["Petugas boleh melihat tabel buku", "GRANT", "✓ GRANT SELECT ON perpustakaan.buku TO …"],
    ["Hak menghapus milik petugas dicabut", "REVOKE", "✓ REVOKE DELETE ON perpustakaan.* FROM …"],
    ["Melihat hak apa saja yang dimiliki petugas", "SHOW GRANTS", "✓ SHOW GRANTS FOR 'petugas'@'localhost';"]
  ]),
  salah("GRANT/REVOKE", [
    "<strong>Tertukar TO dan FROM.</strong> GRANT … TO, REVOKE … FROM.",
    "<strong>Menganggap GRANT sebagai DDL atau DML.</strong> GRANT dan REVOKE termasuk DCL, bukan DDL (struktur) atau DML (isi).",
    "<strong>Memberi hak ke akun yang belum ada.</strong> MySQL 8 menolak (ERROR 1410); jalankan CREATE USER dulu.",
    "<strong>Mengira REVOKE menghapus akun.</strong> REVOKE hanya mencabut hak; akunnya tetap ada. Menghapus akun memakai DROP USER."
  ]),

  rv("Cek Pemahaman", "Bagian 5: Jawab Dulu, Baru Buka", [
    { prompt: "WHERE a OR b AND c dikerjakan sebagai…", answer: "a OR (b AND c)", reason: "AND dikerjakan sebelum OR. Pakai kurung bila maksudnya (a OR b) AND c." },
    { prompt: "Tulis query untuk anggota yang belum pernah meminjam memakai subquery.", answer: "SELECT nama FROM anggota WHERE id_anggota NOT IN (SELECT id_anggota FROM peminjaman);", reason: "Hasil: Dimas Prayoga." },
    { prompt: "Apa akibat ON DELETE CASCADE pada kunci tamu peminjaman → buku?", answer: "Menghapus satu buku ikut menghapus semua baris peminjaman buku itu", reason: "Tanpa CASCADE (RESTRICT), penghapusan buku yang masih dipinjam ditolak dengan ERROR 1451." },
    { prompt: "Apa beda VIEW dan tabel?", answer: "VIEW hanya menyimpan perintah SELECT; datanya diambil dari tabel asli setiap kali dibuka", reason: "Karena itu isi VIEW selalu mengikuti perubahan tabel." },
    { prompt: "Perintah untuk mencabut hak INSERT petugas pada basis data perpustakaan?", answer: "REVOKE INSERT ON perpustakaan.* FROM 'petugas'@'localhost';", reason: "REVOKE berpasangan dengan FROM." },
    { prompt: "Hasil SELECT 7 / 2 di MySQL?", answer: "3.5000", reason: "/ selalu menghasilkan desimal. 7 DIV 2 = 3." }
  ])
];
