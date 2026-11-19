// Materi Lengkap Basis Data P4 • Bagian 4: SQL lanjutan yang ditanyakan kuis LMS tetapi tidak ada di modul P1–P7
// (ALTER TABLE, JOIN, fungsi agregat, GROUP BY, HAVING, alias AS). Disusun dari dokumentasi MySQL 8.
const ADG = require("./adegan_it.js");
const BT = require("./bertahap_it.js");
const { C, box, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });
// Tabel hasil bergaya layar MySQL
const hasil = (cols, rows) => { const w = cols.map((c, i) => Math.max(c.length, ...rows.map(r => String(r[i]).length))); const line = "+" + w.map(n => "-".repeat(n + 2)).join("+") + "+"; const fmt = r => "| " + r.map((c, i) => String(c).padEnd(w[i])).join(" | ") + " |"; return [line, fmt(cols), line, ...rows.map(fmt), line, rows.length + (rows.length === 1 ? " row" : " rows") + " in set"].join("\n"); };

// ===== Diagram: tiga tabel perpustakaan dan pasangan barisnya =====
const baris = (x, y, w, t, tone, part) => { const [f, s, c] = C[tone]; return `<g${part ? ` data-part="${part}"` : ""}><rect x="${x}" y="${y}" width="${w}" height="30" rx="5" fill="${f}" stroke="${s}" stroke-width="1.5"${tone === "rose" ? ' stroke-dasharray="5 3"' : ""}/>${text(x + 10, y + 15, t, { anchor: "start", size: 12, color: c, weight: 600 })}</g>`; };
const kepala = (x, w, t, tone) => box(x, 14, w, 32, t, tone, null, { size: 14, r: 6 });
const BK = [["BK001 · Dasar Pemrograman", 1], ["BK002 · Sistem Basis Data", 1], ["BK003 · Jaringan Komputer", 0], ["BK004 · Analisis SI", 0], ["BK005 · Statistika", 0]];
const PJ = [["PJ0001 · BK002 · AG001", 1, 0], ["PJ0002 · BK001 · AG002", 0, 1], ["PJ0003 · BK002 · AG003", 1, 2]];
const AG = [["AG001 · Ahmad Fauzi", 1], ["AG002 · Nur Aisyah", 1], ["AG003 · Rangga Pratama", 1], ["AG004 · Dimas Prayoga", 0]];
const yRow = i => 58 + i * 40;
const garis = (x1, i1, x2, i2) => `<line x1="${x1}" y1="${yRow(i1) + 15}" x2="${x2}" y2="${yRow(i2) + 15}" stroke="#10b981" stroke-width="2"/>`;
const peta = diagram({
  label: "Diagram Interaktif", title: "Baris Mana yang Punya Pasangan?", minw: 680,
  desc: "Garis hijau = pasangan yang cocok lewat kunci tamu. Kotak merah putus-putus = baris tanpa pasangan. Klik setiap bagian.",
  svg: svg(820, 270,
    kepala(20, 230, "buku", "sky") + kepala(300, 220, "peminjaman", "amber") + kepala(570, 230, "anggota", "sky") +
    `<g data-part="cocok">${PJ.map(([, b, a], i) => garis(250, b, 300, i) + garis(520, i, 570, a)).join("")}</g>` +
    BK.map(([t, ok], i) => baris(20, yRow(i), 230, t, ok ? "emerald" : "rose", ok ? "bk-ada" : "bk-sisa")).join("") +
    PJ.map(([t], i) => baris(300, yRow(i), 220, t, "amber", "pj")).join("") +
    AG.map(([t, ok], i) => baris(570, yRow(i), 230, t, ok ? "emerald" : "rose", ok ? "ag-ada" : "ag-sisa")).join("")
  ),
  parts: [
    { id: "cocok", label: "Garis hijau", title: "Pasangan yang cocok = hasil INNER JOIN", text: "Setiap baris peminjaman menunjuk satu buku (id_buku) dan satu anggota (id_anggota). Pasangan yang nilainya sama di kedua tabel inilah yang muncul pada <strong>INNER JOIN</strong>: 3 baris." },
    { id: "pj", label: "peminjaman", title: "Tabel peminjaman hanya berisi nomor", text: "Judul buku dan nama anggota tidak disimpan di sini. Untuk menampilkannya bersama, tabel peminjaman harus di-JOIN dengan buku dan anggota." },
    { id: "bk-ada", label: "BK001, BK002", title: "Buku yang pernah dipinjam", text: "BK002 punya dua pasangan (PJ0001 dan PJ0003), jadi pada hasil JOIN judulnya muncul dua kali. Itu wajar, bukan data ganda." },
    { id: "bk-sisa", label: "BK003–BK005", title: "Buku tanpa pasangan → hanya muncul di LEFT JOIN", text: "<code>buku LEFT JOIN peminjaman</code> menampilkan <strong>semua</strong> buku. Buku yang belum pernah dipinjam tetap muncul, dan kolom dari tabel peminjaman diisi <code>NULL</code>. Pada INNER JOIN, ketiga buku ini hilang." },
    { id: "ag-ada", label: "AG001–AG003", title: "Anggota yang pernah meminjam", text: "Masing-masing punya satu pasangan di tabel peminjaman." },
    { id: "ag-sisa", label: "AG004", title: "Anggota tanpa pasangan → hanya muncul di RIGHT JOIN", text: "<code>peminjaman RIGHT JOIN anggota</code> menampilkan <strong>semua</strong> anggota, termasuk Dimas yang belum pernah meminjam (kolom peminjaman = NULL)." }
  ]
});

const qTiga = "SELECT a.nama, b.judul, p.tgl_pinjam\nFROM peminjaman p\nJOIN anggota a ON p.id_anggota = a.id_anggota\nJOIN buku b    ON p.id_buku = b.id_buku;";

module.exports = [
  A("SQL di Luar Modul: ALTER, JOIN, GROUP BY", `<p>Modul P1–P7 baru membahas CREATE, DROP, INSERT, SELECT, UPDATE, dan DELETE. Kuis LMS ternyata juga menanyakan <strong>ALTER TABLE</strong>, <strong>JOIN</strong> (termasuk LEFT JOIN), fungsi seperti <strong>COUNT</strong> dan <strong>SUM</strong>, <strong>GROUP BY</strong>, dan alias <strong>AS</strong>. Bagian ini membahas semuanya dengan contoh tabel perpustakaan dari modul.</p>
<p>Semua contoh bisa dicoba di tab <strong>Simulator</strong> P4, pada lab kedua (<em>SQL Lanjutan</em>). Subquery, kunci tamu lengkap, fungsi bawaan, VIEW, INDEX, dan GRANT/REVOKE ada di Bagian 5.</p>`, "Bagian 4 • Bukan dari modul LMS"),
  tip("Bukan dari modul LMS", "Bagian 4 disusun dari dokumentasi MySQL 8, bukan dari modul dosen. Modul P7 menyebut bahwa ALTER baru dibahas di Bab 8 (setelah UTS), dan JOIN serta GROUP BY belum dibahas di modul mana pun.", "warn"),

  // ---------- ALTER TABLE ----------
  A("ALTER TABLE: Mengubah Struktur Tabel yang Sudah Ada", `<p><strong>Artinya:</strong> <code>ALTER TABLE</code> adalah perintah DDL untuk mengubah <strong>struktur</strong> tabel: menambah kolom, menghapus kolom, mengganti tipe data, mengganti nama kolom atau tabel, dan menambah kunci primer. Isi data (baris) tidak diubah kecuali ikut terdampak, misalnya saat kolomnya dihapus.</p>
<p><strong>Kapan dipakai:</strong> saat tabel sudah terlanjur dibuat dan sudah berisi data, lalu rancangannya perlu diubah. Tanpa ALTER, satu-satunya cara adalah DROP lalu CREATE ulang, dan semua data hilang.</p>
<p><strong>Bentuk umum:</strong> <code>ALTER TABLE nama_tabel aksi;</code>. Kata pertama sesudah nama tabel (ADD, DROP, MODIFY, CHANGE, RENAME) menentukan apa yang terjadi. Contoh di soal: <code>ALTER TABLE Produk ADD Stok INT;</code> artinya <strong>menambah kolom</strong> Stok bertipe INT ke tabel Produk. Baris lama otomatis mendapat nilai NULL di kolom baru itu.</p>`),
  { type: "table", label: "Tabel Interaktif", title: "Lima Aksi ALTER TABLE", mono: true, headers: ["Aksi", "Contoh", "Yang terjadi"],
    rows: [
      ["ADD", "ALTER TABLE buku ADD penerbit VARCHAR(50);", "Menambah kolom baru di akhir tabel. Baris lama berisi NULL"],
      ["DROP COLUMN", "ALTER TABLE buku DROP COLUMN penerbit;", "Menghapus kolom beserta seluruh isinya"],
      ["MODIFY", "ALTER TABLE buku MODIFY judul VARCHAR(150);", "Mengganti tipe data atau NOT NULL. Nama kolom tetap"],
      ["CHANGE", "ALTER TABLE buku CHANGE stok jumlah INT;", "Mengganti nama kolom sekaligus tipenya (tipe wajib ditulis lagi)"],
      ["RENAME", "ALTER TABLE buku RENAME TO koleksi;", "Mengganti nama tabel. Nama kolom saja: RENAME COLUMN stok TO jumlah"]
    ],
    modes: [
      { label: "ADD + posisi", target: "row", row: 0, title: "Letakkan kolom di tempat tertentu", text: "<code>ADD penerbit VARCHAR(50) AFTER judul</code> menaruh kolom tepat setelah judul; <code>FIRST</code> menaruhnya paling depan. Bisa juga beberapa aksi sekaligus: <code>ALTER TABLE buku ADD a INT, ADD b INT;</code>" },
      { label: "MODIFY vs CHANGE", target: "col", col: 0, title: "Bedanya di nama kolom", text: "MODIFY menulis nama kolom <strong>satu kali</strong> (namanya tidak berubah). CHANGE menulis nama <strong>dua kali</strong>: nama lama lalu nama baru, diikuti tipe." },
      { label: "Kunci primer", target: "none", title: "ADD PRIMARY KEY", text: "<code>ALTER TABLE buku ADD PRIMARY KEY (id_buku);</code> menjadikan kolom kunci primer. Ditolak bila isinya sudah ada yang kembar (ERROR 1062) atau tabel sudah punya PK (ERROR 1068)." }
    ] },
  ex("Latihan Interaktif", "Perintah Mana yang Tepat?", ["Kebutuhan", "Perintah"], ["ALTER TABLE … ADD", "ALTER TABLE … DROP COLUMN", "ALTER TABLE … MODIFY", "ALTER TABLE … CHANGE", "ALTER TABLE … RENAME TO", "INSERT INTO", "UPDATE"], [
    ["Tabel Produk perlu kolom baru Stok", "ALTER TABLE … ADD", "✓ Kolom baru = struktur berubah = ALTER … ADD."],
    ["Mengisi angka stok 10 untuk produk P001", "UPDATE", "✓ Kolomnya sudah ada; yang diubah isinya → UPDATE … SET stok = 10 WHERE …"],
    ["Menambah satu produk baru", "INSERT INTO", "✓ Menambah baris (data), bukan kolom."],
    ["Kolom judul VARCHAR(50) terlalu pendek, jadikan 150", "ALTER TABLE … MODIFY", "✓ Nama tetap, tipe berubah."],
    ["Ganti nama kolom tlp menjadi telepon", "ALTER TABLE … CHANGE", "✓ Atau RENAME COLUMN tlp TO telepon (MySQL 8)."],
    ["Kolom fax tidak dipakai lagi", "ALTER TABLE … DROP COLUMN", "✓ Isi kolom ikut hilang permanen."],
    ["Tabel barang diganti nama menjadi produk", "ALTER TABLE … RENAME TO", "✓ Atau RENAME TABLE barang TO produk;"]
  ]),
  tip("Kesalahan yang sering terjadi: ALTER", `<ul class="list-disc pl-5 space-y-1">
<li><strong>Mengira ADD menambah data.</strong> <code>ALTER TABLE Produk ADD Stok INT</code> menambah <em>kolom</em>. Menambah data memakai INSERT, mengubah isi memakai UPDATE.</li>
<li><strong>Tertukar ALTER dan UPDATE.</strong> ALTER = struktur (DDL). UPDATE = isi baris (DML).</li>
<li><strong>Lupa menulis tipe pada CHANGE.</strong> <code>CHANGE stok jumlah;</code> ditolak; harus <code>CHANGE stok jumlah INT;</code>.</li>
<li><strong>MODIFY menghapus NOT NULL tanpa disadari.</strong> MODIFY dan CHANGE menulis ulang <em>seluruh</em> definisi kolom. <code>MODIFY judul VARCHAR(150)</code> membuat judul boleh NULL lagi; tulis <code>MODIFY judul VARCHAR(150) NOT NULL</code> bila aturan itu ingin dipertahankan.</li>
<li><strong>MODIFY ke tipe yang lebih sempit.</strong> Bila ada judul 80 huruf, <code>MODIFY judul VARCHAR(50)</code> ditolak MySQL (ERROR 1265 Data truncated).</li>
<li><strong>Berharap bisa ROLLBACK.</strong> ALTER adalah DDL: di MySQL otomatis tersimpan (COMMIT), jadi DROP COLUMN tidak bisa dibatalkan.</li></ul>`, "warn"),

  // ---------- JOIN ----------
  A("JOIN: Menggabungkan Baris dari Beberapa Tabel", `<p><strong>Artinya:</strong> JOIN menampilkan kolom dari dua tabel atau lebih dalam satu hasil, dengan memasangkan baris yang nilainya cocok. Biasanya yang dipasangkan adalah <strong>kunci tamu</strong> dengan <strong>kunci primer</strong> yang dirujuknya, misalnya <code>peminjaman.id_buku</code> dengan <code>buku.id_buku</code>.</p>
<p><strong>Kapan dipakai:</strong> setelah normalisasi (P5), data sengaja dipecah ke beberapa tabel. Tabel peminjaman hanya berisi nomor buku dan nomor anggota. Pertanyaan seperti "siapa meminjam buku apa?" butuh JOIN untuk menyatukan kembali judul dan nama.</p>
<p><strong>Bentuk umum:</strong> <code>SELECT kolom FROM tabel_kiri [INNER | LEFT | RIGHT] JOIN tabel_kanan ON tabel_kiri.kolom = tabel_kanan.kolom;</code></p>
<p><code>ON</code> berisi syarat pasangan. Tabel yang ditulis setelah FROM disebut tabel <strong>kiri</strong>, tabel setelah JOIN disebut tabel <strong>kanan</strong>. Istilah kiri/kanan ini penting untuk LEFT dan RIGHT JOIN.</p>
<p><strong>Alias tabel.</strong> <code>FROM peminjaman p</code> memberi nama pendek <code>p</code>, sehingga <code>p.id_buku</code> cukup menggantikan <code>peminjaman.id_buku</code>. Alias boleh ditulis dengan atau tanpa AS: <code>peminjaman AS p</code> sama dengan <code>peminjaman p</code>.</p>`),
  ADG.bdJoin,
  // ---------- Sebelum: dua tabel asal ----------
  A("Sebelum JOIN: Dua Tabel yang Terpisah", `<p>Semua contoh JOIN di bawah memakai dua tabel yang sama dari database <code>perpustakaan</code>: <strong>buku</strong> (5 baris) dan <strong>peminjaman</strong> (3 baris).</p>
<p>Perhatikan tabel peminjaman. Isinya hanya <strong>kode</strong>: PJ0001 meminjam <code>BK002</code>. Judul BK002 tidak ada di tabel ini, tetapi tersimpan di tabel buku. Pertanyaan "buku apa saja yang dipinjam?" baru bisa dijawab kalau kedua tabel disatukan lewat kolom yang sama, yaitu <code>id_buku</code>. Itulah tugas JOIN.</p>`, "Langkah 1 • Sebelum"),
  { type: "row", cols: [1, 1], blocks: [
    { type: "table", label: "Tabel asal", title: "buku", mono: true, headers: ["id_buku", "judul"],
      rows: [["BK001", "Dasar Pemrograman Komputer"], ["BK002", "Sistem Basis Data"], ["BK003", "Jaringan Komputer Dasar"], ["BK004", "Analisis Sistem Informasi"], ["BK005", "Statistika untuk Informatika"]] },
    { type: "table", label: "Tabel asal", title: "peminjaman", mono: true, headers: ["id_pinjam", "id_buku", "id_anggota"],
      rows: [["PJ0001", "BK002", "AG001"], ["PJ0002", "BK001", "AG002"], ["PJ0003", "BK002", "AG003"]],
      defaultNote: "Kolom <code>id_buku</code> di sini menunjuk ke <code>id_buku</code> di tabel buku. BK003, BK004, dan BK005 tidak pernah muncul di tabel ini, artinya belum pernah dipinjam." }
  ] },
  peta,
  // ---------- Sesudah: tiga jenis JOIN, pasangan tabel sama ----------
  { type: "table", label: "Langkah 2 • Sesudah", title: "Tiga Jenis JOIN pada Dua Tabel yang Sama", mono: true, headers: ["id_buku", "judul", "id_pinjam"],
    rows: [["BK001", "Dasar Pemrograman Komputer", "PJ0002"], ["BK002", "Sistem Basis Data", "PJ0001"], ["BK002", "Sistem Basis Data", "PJ0003"]],
    modes: [
      { label: "INNER JOIN", target: "none", title: "INNER JOIN: hanya buku yang punya pasangan (3 baris)",
        code: "SELECT b.id_buku, b.judul, p.id_pinjam\nFROM buku b\nINNER JOIN peminjaman p ON p.id_buku = b.id_buku;",
        text: "Setiap buku dicarikan pasangannya di tabel peminjaman. BK002 punya dua pasangan, jadi muncul dua kali. BK003–BK005 tidak punya pasangan, jadi <strong>tidak muncul</strong>. Menulis <code>JOIN</code> saja sama dengan <code>INNER JOIN</code>." },
      { label: "LEFT JOIN", target: "none", marks: [3, 4, 5], title: "LEFT JOIN: semua buku tetap muncul (6 baris)",
        code: "SELECT b.id_buku, b.judul, p.id_pinjam\nFROM buku b\nLEFT JOIN peminjaman p ON p.id_buku = b.id_buku;",
        rows: [["BK001", "Dasar Pemrograman Komputer", "PJ0002"], ["BK002", "Sistem Basis Data", "PJ0001"], ["BK002", "Sistem Basis Data", "PJ0003"], ["BK003", "Jaringan Komputer Dasar", "NULL"], ["BK004", "Analisis Sistem Informasi", "NULL"], ["BK005", "Statistika untuk Informatika", "NULL"]],
        text: "Perintahnya sama persis dengan INNER JOIN, hanya kata <code>INNER</code> diganti <code>LEFT</code>. Tabel <strong>kiri</strong> = <code>buku</code> (ditulis setelah FROM), dan <strong>semua</strong> barisnya ditampilkan. Tiga baris yang disorot kuning adalah tambahannya: buku tanpa pasangan, dengan <code>id_pinjam</code> diisi <code>NULL</code>." },
      { label: "RIGHT JOIN", target: "none", marks: [3, 4, 5], title: "RIGHT JOIN: urutan tabel dibalik, hasilnya sama dengan LEFT",
        code: "SELECT b.id_buku, b.judul, p.id_pinjam\nFROM peminjaman p\nRIGHT JOIN buku b ON p.id_buku = b.id_buku;",
        rows: [["BK001", "Dasar Pemrograman Komputer", "PJ0002"], ["BK002", "Sistem Basis Data", "PJ0001"], ["BK002", "Sistem Basis Data", "PJ0003"], ["BK003", "Jaringan Komputer Dasar", "NULL"], ["BK004", "Analisis Sistem Informasi", "NULL"], ["BK005", "Statistika untuk Informatika", "NULL"]],
        text: "Sekarang <code>buku</code> ditulis setelah JOIN, jadi buku menjadi tabel <strong>kanan</strong>. RIGHT JOIN menampilkan semua baris tabel kanan, sehingga hasilnya sama dengan LEFT JOIN tadi. Jadi <code>A RIGHT JOIN B</code> = <code>B LEFT JOIN A</code>. Dalam praktik, LEFT JOIN lebih sering dipakai." }
    ] },
  { type: "code", label: "Contoh Lain", title: "RIGHT JOIN dengan Tabel anggota", file: "right-join.sql", code: `-- Tabel kanan = anggota: semua anggota tampil, termasuk yang belum pernah meminjam
SELECT p.id_pinjam, a.nama
FROM peminjaman p
RIGHT JOIN anggota a ON p.id_anggota = a.id_anggota;

${hasil(["id_pinjam", "nama"], [["PJ0001", "Ahmad Fauzi"], ["PJ0002", "Nur Aisyah"], ["PJ0003", "Rangga Pratama"], ["NULL", "Dimas Prayoga"]])}` },
  { type: "table", label: "Tabel Interaktif", title: "Memilih Jenis JOIN", headers: ["Jenis", "Baris yang muncul", "Pakai saat", "Contoh pertanyaan"],
    rows: [
      ["<strong>INNER JOIN</strong> (atau JOIN)", "Hanya yang cocok di kedua tabel", "Hanya butuh data yang punya pasangan", "Daftar peminjaman lengkap dengan judul bukunya"],
      ["<strong>LEFT JOIN</strong>", "Semua baris tabel kiri + pasangannya (NULL bila tidak ada)", "Semua data utama harus tampil, termasuk yang belum punya pasangan", "Semua buku beserta peminjamannya, termasuk yang belum pernah dipinjam"],
      ["<strong>RIGHT JOIN</strong>", "Semua baris tabel kanan + pasangannya", "Sama seperti LEFT, tetapi tabel utamanya di kanan", "Semua anggota, termasuk yang belum pernah meminjam"],
      ["<strong>CROSS JOIN</strong>", "Semua kombinasi (kiri × kanan)", "Jarang; biasanya terjadi karena lupa ON", "5 buku × 3 peminjaman = 15 baris"]
    ],
    modes: [
      { label: "FULL OUTER JOIN?", target: "none", title: "Tidak ada di MySQL", text: "FULL OUTER JOIN (semua baris dari kedua tabel) ada di PostgreSQL dan SQL Server, tetapi tidak di MySQL. Di MySQL caranya menggabungkan hasil LEFT JOIN dan RIGHT JOIN dengan <code>UNION</code>." },
      { label: "Cari yang tidak punya pasangan", target: "row", row: 1, title: "LEFT JOIN + IS NULL", text: "<code>SELECT b.judul FROM buku b LEFT JOIN peminjaman p ON p.id_buku = b.id_buku WHERE p.id_pinjam IS NULL;</code> → buku yang belum pernah dipinjam." }
    ] },
  BT.bdJoinJelas,
  { type: "code", label: "Contoh Kode", title: "JOIN Tiga Tabel dan Mencari yang Belum Punya Pasangan", file: "join.sql", code: `-- siapa meminjam buku apa (tiga tabel sekaligus)
${qTiga}

-- buku yang belum pernah dipinjam
SELECT b.id_buku, b.judul
FROM buku b
LEFT JOIN peminjaman p ON p.id_buku = b.id_buku
WHERE p.id_pinjam IS NULL;

-- gaya lama tanpa kata JOIN: daftar tabel dipisah koma, syaratnya di WHERE
SELECT buku.judul, peminjaman.tgl_pinjam
FROM buku, peminjaman
WHERE buku.id_buku = peminjaman.id_buku;`, note: "Setiap JOIN tambahan butuh ON sendiri. Gaya koma hasilnya sama dengan INNER JOIN, tetapi kalau syarat WHERE lupa ditulis, hasilnya menjadi semua kombinasi (CROSS JOIN)." },
  ex("Latihan Interaktif", "JOIN yang Mana?", ["Kebutuhan", "Jenis"], ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"], [
    ["Daftar peminjaman beserta nama peminjamnya", "INNER JOIN", "✓ Setiap peminjaman pasti punya anggota."],
    ["Semua mahasiswa (FROM mahasiswa) beserta nilai, termasuk yang belum punya nilai", "LEFT JOIN", "✓ Tabel utama di kiri, semua barisnya harus tampil."],
    ["FROM nilai … JOIN mahasiswa: semua mahasiswa harus tampil walau belum punya nilai", "RIGHT JOIN", "✓ Tabel utama (mahasiswa) ada di kanan."],
    ["Semua pasangan ukuran × warna untuk katalog kaos", "CROSS JOIN", "✓ Setiap ukuran dipasangkan dengan setiap warna."]
  ]),
  tip("Kesalahan yang sering terjadi: JOIN", `<ul class="list-disc pl-5 space-y-1">
<li><strong>Lupa ON.</strong> <code>FROM buku JOIN peminjaman</code> tanpa ON memasangkan semua baris (5 × 3 = 15 baris).</li>
<li><strong>Kolom ambigu.</strong> <code>SELECT id_buku …</code> ditolak (ERROR 1052) karena id_buku ada di kedua tabel. Tulis <code>b.id_buku</code> atau <code>p.id_buku</code>.</li>
<li><strong>Tertukar kiri dan kanan.</strong> LEFT JOIN mempertahankan tabel yang ditulis <em>setelah FROM</em>. <code>peminjaman LEFT JOIN buku</code> tidak akan menampilkan buku yang belum pernah dipinjam.</li>
<li><strong>Memakai alias yang belum dibuat.</strong> Kalau sudah menulis <code>buku b</code>, pakai <code>b.judul</code> di seluruh perintah.</li>
<li><strong>Menyangka JOIN menggabungkan tabel secara permanen.</strong> JOIN hanya membentuk hasil tampilan; tabel aslinya tidak berubah.</li></ul>`, "warn"),

  // ---------- Agregat, GROUP BY, HAVING, AS ----------
  A("Fungsi Agregat: Menghitung dari Banyak Baris", `<p><strong>Artinya:</strong> fungsi agregat mengolah banyak baris menjadi <strong>satu nilai</strong>: berapa jumlahnya, berapa totalnya, berapa rata-ratanya, mana yang terkecil atau terbesar.</p>
<p><strong>Kapan dipakai:</strong> saat yang dibutuhkan adalah ringkasan, bukan daftar baris. Contoh: "berapa mahasiswa angkatan 2023?", "berapa rata-rata IPK?".</p>
<p>Contoh di bawah memakai tabel <code>mahasiswa</code> dari slide (4 baris, IPK 3.45, 3.10, 3.78, 3.25).</p>`),
  { type: "table", label: "Tabel Interaktif", title: "Lima Fungsi Agregat", mono: true, headers: ["Fungsi", "Arti", "Contoh", "Hasil"],
    rows: [
      ["COUNT(*)", "Banyaknya baris", "SELECT COUNT(*) FROM mahasiswa;", "4"],
      ["COUNT(kolom)", "Banyaknya baris yang kolomnya tidak NULL", "SELECT COUNT(tgl_kembali) FROM peminjaman;", "1"],
      ["SUM(kolom)", "Jumlah total", "SELECT SUM(stok) FROM buku;", "15"],
      ["AVG(kolom)", "Rata-rata", "SELECT AVG(ipk) FROM mahasiswa;", "3.395000"],
      ["MIN / MAX", "Nilai terkecil / terbesar", "SELECT MIN(ipk), MAX(ipk) FROM mahasiswa;", "3.10 | 3.78"]
    ],
    modes: [
      { label: "COUNT(*) vs COUNT(kolom)", target: "row", row: 1, title: "NULL tidak dihitung", text: "Tabel peminjaman berisi 3 baris, tetapi hanya PJ0001 yang tgl_kembali-nya terisi. <code>COUNT(*)</code> = 3, <code>COUNT(tgl_kembali)</code> = 1. <code>COUNT(DISTINCT id_buku)</code> = 2 (BK001 dan BK002)." },
      { label: "AVG di MySQL", target: "row", row: 3, title: "Empat angka tambahan di belakang koma", text: "Kolom DECIMAL(3,2) dirata-rata menjadi 3.395000. Bisa dirapikan dengan <code>ROUND(AVG(ipk), 2)</code>." },
      { label: "SUM vs COUNT", target: "col", col: 0, title: "Menjumlah isi vs menghitung baris", text: "SUM(stok) menjumlahkan angka stok (4+3+2+5+1 = 15). COUNT(stok) menghitung ada berapa baris yang stoknya terisi (5)." }
    ] },
  A("GROUP BY, HAVING, dan AS", `<p><strong>GROUP BY</strong> mengelompokkan baris yang nilainya sama, lalu fungsi agregat dihitung <em>per kelompok</em>. Contoh: <code>GROUP BY jurusan</code> menghasilkan satu baris untuk tiap jurusan. Dipakai untuk pertanyaan "per ..." seperti jumlah mahasiswa <em>per</em> jurusan atau berapa kali <em>tiap</em> buku dipinjam.</p>
<p><strong>HAVING</strong> menyaring <em>kelompok</em> berdasarkan hasil agregat, misalnya hanya jurusan yang mahasiswanya lebih dari 2. Bedanya dengan WHERE: WHERE menyaring <em>baris</em> sebelum dikelompokkan, HAVING menyaring <em>kelompok</em> sesudahnya. Fungsi agregat tidak boleh ditulis di WHERE.</p>
<p><strong>AS</strong> memberi nama sementara (alias) pada kolom hasil, misalnya <code>COUNT(*) AS jumlah</code>, sehingga judul kolom hasilnya <code>jumlah</code>, bukan <code>COUNT(*)</code>. Alias hanya berlaku pada hasil tampilan dan tidak mengubah nama kolom di tabel. AS boleh dihilangkan: <code>COUNT(*) jumlah</code> artinya sama.</p>`),
  { type: "code", label: "Contoh Kode", title: "GROUP BY, HAVING, AS", file: "kelompok.sql", code: `-- jumlah dan rata-rata IPK per jurusan
SELECT jurusan, COUNT(*) AS jumlah, AVG(ipk) AS rata_ipk
FROM mahasiswa
GROUP BY jurusan;
-- Sistem Informasi | 3 | 3.266667
-- Teknik Informatika | 1 | 3.780000

-- hanya jurusan yang mahasiswanya lebih dari 1
SELECT jurusan, COUNT(*) AS jumlah
FROM mahasiswa
GROUP BY jurusan
HAVING COUNT(*) > 1;

-- berapa kali tiap buku dipinjam (JOIN + GROUP BY), terbanyak dulu
SELECT b.judul, COUNT(p.id_pinjam) AS kali_dipinjam
FROM buku b
LEFT JOIN peminjaman p ON p.id_buku = b.id_buku
GROUP BY b.judul
ORDER BY kali_dipinjam DESC;`, note: "Urutan klausa lengkap: SELECT … FROM … JOIN … ON … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …" },
  { type: "table", label: "Tabel Interaktif", title: "WHERE vs HAVING", headers: ["", "WHERE", "HAVING"],
    rows: [["Menyaring", "Baris", "Kelompok hasil GROUP BY"], ["Dijalankan", "Sebelum pengelompokan", "Sesudah pengelompokan"], ["Boleh memakai COUNT/SUM/AVG?", "Tidak (ERROR 1111)", "Boleh"], ["Contoh", "WHERE angkatan = 2023", "HAVING COUNT(*) > 1"]],
    modes: [{ label: "Dipakai bersama", target: "none", title: "WHERE lalu HAVING", text: "<code>SELECT jurusan, COUNT(*) FROM mahasiswa WHERE angkatan = 2023 GROUP BY jurusan HAVING COUNT(*) > 1;</code> → buang dulu baris selain angkatan 2023, kelompokkan, lalu buang kelompok yang isinya hanya 1." }] },
  tip("Kesalahan yang sering terjadi: GROUP BY", `<ul class="list-disc pl-5 space-y-1">
<li><strong>Kolom biasa tidak ikut di GROUP BY.</strong> <code>SELECT jurusan, nama, COUNT(*) … GROUP BY jurusan</code> ditolak MySQL 8 (ERROR 1055), karena satu jurusan punya banyak nama. Setiap kolom yang bukan fungsi agregat harus ditulis juga di GROUP BY.</li>
<li><strong>Agregat di WHERE.</strong> <code>WHERE COUNT(*) > 1</code> salah (ERROR 1111). Pakai HAVING.</li>
<li><strong>Urutan klausa tertukar.</strong> HAVING sebelum GROUP BY, atau ORDER BY sebelum GROUP BY, menghasilkan ERROR 1064.</li>
<li><strong>Mengira AS mengganti nama kolom tabel.</strong> AS hanya mengganti judul kolom pada hasil. Untuk mengganti nama kolom di tabel: <code>ALTER TABLE … RENAME COLUMN</code>.</li></ul>`, "warn"),

  { type: "table", label: "Kamus Singkat", title: "Kata Kunci SQL Lain yang Mungkin Muncul di Soal", mono: true, headers: ["Kata kunci", "Arti", "Contoh"],
    rows: [
      ["NOT LIKE", "Kebalikan LIKE", "WHERE nama NOT LIKE 'A%'"],
      ["IS NOT NULL", "Kolomnya terisi", "WHERE tgl_kembali IS NOT NULL"],
      ["COUNT(DISTINCT kolom)", "Banyaknya nilai berbeda", "SELECT COUNT(DISTINCT jurusan) FROM mahasiswa;  -- 2"],
      ["AUTO_INCREMENT", "Nomor otomatis naik (1, 2, 3, …) untuk kunci primer angka", "id INT NOT NULL AUTO_INCREMENT"],
      ["DEFAULT", "Nilai bawaan bila kolom tidak diisi saat INSERT", "stok INT DEFAULT 0"],
      ["UNIQUE", "Nilai tidak boleh kembar, tetapi bukan kunci primer", "email VARCHAR(50) UNIQUE"],
      ["FOREIGN KEY … REFERENCES", "Membuat kunci tamu", "FOREIGN KEY (id_buku) REFERENCES buku(id_buku)"],
      ["RENAME TABLE", "Mengganti nama tabel (sama dengan ALTER … RENAME TO)", "RENAME TABLE barang TO produk;"],
      ["UNION", "Menumpuk hasil dua SELECT (kolomnya harus sejumlah)", "SELECT nama FROM dosen UNION SELECT nama FROM mahasiswa;"]
    ] },
  rv("Cek Pemahaman", "SQL Lanjutan: Jawab Dulu, Baru Buka", [
    { prompt: "Perintah ALTER TABLE Produk ADD Stok INT digunakan untuk…", answer: "Menambah kolom Stok (bertipe INT) ke tabel Produk", reason: "Bukan menambah data (INSERT), bukan mengubah tipe (MODIFY), bukan menghapus (DROP COLUMN), dan bukan menggabungkan tabel (JOIN)." },
    { prompt: "Apa beda INNER JOIN dan LEFT JOIN?", answer: "INNER: hanya baris yang cocok di kedua tabel. LEFT: semua baris tabel kiri, pasangan kanan diisi NULL bila tidak ada", reason: "buku LEFT JOIN peminjaman menampilkan BK003–BK005 dengan id_pinjam NULL; INNER JOIN tidak menampilkannya." },
    { prompt: "Tulis perintah untuk mengganti tipe kolom judul menjadi VARCHAR(150).", answer: "ALTER TABLE buku MODIFY judul VARCHAR(150);", reason: "Nama kolom tidak berubah, jadi pakai MODIFY." },
    { prompt: "Mengapa WHERE COUNT(*) > 1 salah?", answer: "WHERE menyaring baris sebelum dikelompokkan; agregat harus di HAVING", reason: "Benar: … GROUP BY jurusan HAVING COUNT(*) > 1." },
    { prompt: "Apa arti COUNT(*) AS jumlah?", answer: "Menghitung banyak baris, dan judul kolom hasilnya diberi nama jumlah", reason: "AS hanya alias pada hasil tampilan." }
  ])
];
