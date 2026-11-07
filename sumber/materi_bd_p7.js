// Materi Lengkap Basis Data P7: DDL, Membuat Basis Data dan Tabel
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });
const mono = (x, y, t, col, part) => `<text${part ? ` data-part="${part}"` : ""} x="${x}" y="${y}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="15" font-weight="700" fill="${col}" dominant-baseline="middle">${t}</text>`;

const anatomi = diagram({
  label: "Diagram Interaktif", title: "Anatomi CREATE TABLE buku", desc: "Klik setiap warna: nama tabel, nama kolom, tipe data, aturan, kunci primer.", minw: 640,
  svg: svg(800, 300,
    mono(30, 30, "CREATE TABLE", "#334155") + `<g data-part="tabel">${mono(150, 30, "buku", "#2563eb")}</g>` + mono(196, 30, "(", "#334155") +
    [["id_buku", "CHAR(5)"], ["judul", "VARCHAR(80)"], ["pengarang", "VARCHAR(50)"], ["tahun", "YEAR"], ["stok", "INT"]].map(([k, t], i) => { const y = 64 + i * 32;
      return `<g data-part="kolom">${mono(60, y, k, "#047857")}</g><g data-part="tipe">${mono(200, y, t, "#7c3aed")}</g><g data-part="aturan">${mono(340, y, "NOT NULL", "#b45309")}</g>` + mono(420, y, ",", "#be123c"); }).join("") +
    `<g data-part="pk">${mono(60, 224, "PRIMARY KEY (id_buku)", "#be123c")}</g>` + mono(30, 256, ");", "#334155") +
    `<g data-part="koma">` + box(500, 200, 280, 64, "Tanpa koma sebelum ) |koma terlewat → ERROR 1064", "rose", null, { size: 12 }) + "</g>" +
    `<g data-part="tabel">` + box(500, 20, 280, 44, "Skema P4: buku(id_buku, …)", "sky", null, { size: 12 }) + "</g>"
  ),
  parts: [
    { id: "tabel", label: "Nama tabel", title: "buku", text: "Huruf kecil, tanpa spasi, unik dalam satu basis data (kembar → ERROR 1050). Diambil dari skema relasi P4." },
    { id: "kolom", label: "Nama kolom", title: "Nama kolom", text: "Huruf kecil + garis bawah. Spasi (id anggota) → ERROR 1064." },
    { id: "tipe", label: "Tipe data", title: "CHAR, VARCHAR, INT, YEAR, DATE", text: "Salah eja (VARCAHR) → ERROR 4161 di MariaDB / 1064 di MySQL." },
    { id: "aturan", label: "NOT NULL", title: "Aturan (constraint)", text: "Kolom wajib diisi. Tanpa NOT NULL, kolom boleh kosong (NULL). ➕ Aturan lain yang akan sering kamu temui: DEFAULT nilai, UNIQUE, AUTO_INCREMENT." },
    { id: "pk", label: "PRIMARY KEY", title: "Kunci primer", text: "Ditulis di baris tersendiri. Hanya satu per tabel (dua → ERROR 1068). ➕ Kunci gabungan ditulis dalam satu PRIMARY KEY: <code>PRIMARY KEY (id_pinjam, id_buku)</code>." },
    { id: "koma", label: "Koma", title: "Pemisah antar baris", text: "Setiap baris kolom diakhiri koma kecuali baris terakhir sebelum kurung tutup." }
  ]
});

const alur = diagram({
  label: "Diagram Interaktif", title: "Alur Kerja DDL di phpMyAdmin", desc: "Urutan yang aman. Klik setiap langkah.", minw: 640,
  svg: svg(820, 170,
    [["use", "USE / klik|perpustakaan", "slate"], ["create", "CREATE TABLE", "emerald"], ["show", "SHOW TABLES;", "sky"], ["desc", "DESCRIBE buku;", "sky"], ["drop", "DROP (hati-hati)", "rose"]]
      .map(([p, t, tone], i) => box(10 + i * 165, 50, 140, 64, t, tone, p, { size: 13 }) + (i < 4 ? arrow(152 + i * 165, 82, 172 + i * 165, 82) : "")).join("") +
    text(410, 145, "Tiap langkah dicek sebelum lanjut ke langkah berikutnya", { size: 12, color: "#475569" })
  ),
  parts: [
    { id: "use", label: "USE", title: "Pilih lemari", text: "Lihat judul di atas kotak SQL. Tanpa memilih → ERROR 1046." },
    { id: "create", label: "CREATE", title: "Buat rangka", text: "Hasil “nol baris” itu wajar: CREATE tidak menghasilkan data." },
    { id: "show", label: "SHOW TABLES", title: "Pastikan tabel ada", text: "Kolom hasilnya bernama Tables_in_perpustakaan." },
    { id: "desc", label: "DESCRIBE", title: "Cocokkan dengan skema", text: "Bandingkan dengan skema P4 dan dengan tab Struktur (ikon kunci di id_buku)." },
    { id: "drop", label: "DROP", title: "Hapus seketika", text: "MySQL tidak bertanya ulang dan tidak menyimpan cadangan. ➕ phpMyAdmin bawaannya memunculkan kotak konfirmasi untuk perintah DROP; jangan mengandalkannya." }
  ]
});

// ---------- Cara klik di phpMyAdmin (tangkapan layar asli, web/public/materi/basis-data/p7/) ----------
const IMG7 = "materi/basis-data/p7/";
const klik = {
  type: "steps", label: "Cara Klik di phpMyAdmin", title: "Membuat Tabel buku Tanpa Mengetik SQL",
  desc: "Hasilnya sama persis dengan CREATE TABLE buku di atas. Klik tiap langkah.",
  note: "phpMyAdmin di laptop dosen berbahasa Inggris. Padanannya: Nama tabel = Table name, Jumlah kolom = Number of columns, Buat = Create, Jenis = Type, Panjang/Nilai = Length/Values, Tak Ternilai = Null, Indeks = Index, Simpan = Save, Pratinjau SQL = Preview SQL.",
  items: [
    { title: "Pilih (atau buat) basis data perpustakaan", how: "Klik <code>perpustakaan</code> di daftar kiri. Kalau belum ada, buat dulu lewat menu <strong>Basis data</strong> seperti di P6.", ok: "judul di atas bertuliskan <strong>Database: perpustakaan</strong>." },
    { title: "Isi nama tabel dan jumlah kolom", how: "Di kotak <strong>Create new table</strong>, isi Nama tabel <code>buku</code> dan jumlah kolom <code>5</code>, lalu klik <strong>Buat</strong>.", img: { src: IMG7 + "nama-tabel.webp", alt: "Kotak Create new table: nama tabel buku, jumlah kolom 5" } },
    { title: "Isi nama, jenis, dan panjang tiap kolom", how: "Satu baris formulir = satu kolom tabel. Isi sesuai skema: <code>id_buku</code> CHAR 5, <code>judul</code> VARCHAR 80, <code>pengarang</code> VARCHAR 50, <code>tahun</code> YEAR, <code>stok</code> INT. Kotak <strong>Tak Ternilai</strong> (Null) dibiarkan kosong supaya kolom menjadi NOT NULL.", img: { src: IMG7 + "formulir.webp", alt: "Formulir struktur tabel buku berisi lima kolom" } },
    { title: "Jadikan id_buku kunci primer", how: "Pada baris <code>id_buku</code>, kolom <strong>Indeks</strong>, pilih <strong>PRIMARY</strong>. Akan muncul kotak <em>Tambahkan indeks</em>; cukup klik <strong>Kirim</strong>.", ok: "di bawah pilihan Indeks muncul tulisan PRIMARY.", img: { src: IMG7 + "indeks.webp", alt: "Kotak dialog Tambahkan indeks dengan pilihan PRIMARY untuk id_buku" } },
    { title: "Klik Pratinjau SQL untuk melihat perintahnya", how: "Tombol <strong>Pratinjau SQL</strong> menunjukkan perintah yang akan dijalankan phpMyAdmin. Isinya sama dengan CREATE TABLE buku yang ditulis manual.", img: { src: IMG7 + "pratinjau-sql.webp", alt: "Pratinjau SQL: CREATE TABLE perpustakaan.buku dengan PRIMARY KEY id_buku" } },
    { title: "Klik Simpan, lalu cek tab Struktur", how: "Tutup pratinjau, lalu klik <strong>Simpan</strong>.", ok: "<code>buku</code> muncul di bawah perpustakaan di daftar kiri, dan di tab <strong>Struktur</strong> ada ikon kunci di <code>id_buku</code>. Sama seperti hasil DESCRIBE buku.", img: { src: IMG7 + "hasil-struktur.webp", alt: "Tab Struktur tabel buku dengan ikon kunci pada id_buku" } }
  ]
};
const formulir = {
  type: "shot", label: "Kenali Formulirnya", title: "Kolom Formulir = Potongan CREATE TABLE",
  desc: "Klik nomor kuning untuk melihat bagian SQL yang dibuat oleh tiap kolom formulir.",
  src: IMG7 + "formulir.webp", w: 2250, h: 840, url: "localhost:8888/phpMyAdmin",
  alt: "Formulir struktur tabel buku di phpMyAdmin",
  caption: "Tangkapan layar phpMyAdmin 5.2 asli. Nama dalam kurung adalah label versi bahasa Inggris.",
  parts: [
    { id: "nama", n: 1, x: 24.5, y: 20.7, box: [16.5, 23, 9.7, 54], label: "Nama", title: "Nama (Name) → nama kolom", text: "<code>id_buku</code>, <code>judul</code>, … Aturannya sama dengan SQL: huruf kecil dan garis bawah, tanpa spasi." },
    { id: "jenis", n: 2, x: 34.5, y: 20.7, box: [26.5, 23, 9.7, 54], label: "Jenis", title: "Jenis (Type) → tipe data", text: "CHAR, VARCHAR, YEAR, INT. Sama dengan tipe yang ditulis di CREATE TABLE." },
    { id: "panjang", n: 3, x: 44.8, y: 20.7, box: [36.6, 23, 9.9, 54], label: "Panjang/Nilai", title: "Panjang/Nilai (Length/Values) → angka dalam kurung", text: "<code>5</code> menjadi <code>CHAR(5)</code>, <code>80</code> menjadi <code>VARCHAR(80)</code>. Untuk YEAR dan INT boleh dikosongkan." },
    { id: "bawaan", n: 4, x: 54.6, y: 20.7, box: [46.7, 23, 9.6, 54], label: "Bawaan", title: "Bawaan (Default) → DEFAULT", text: "Nilai otomatis bila kolom tidak diisi. Biarkan <em>Tidak ada</em> (None) untuk tabel buku." },
    { id: "null", n: 5, x: 75.6, y: 20.7, box: [76.6, 23, 3.7, 54], label: "Tak Ternilai", title: "Tak Ternilai (Null) → NOT NULL atau boleh kosong", text: "Kotak <strong>tidak dicentang</strong> = <code>NOT NULL</code> (wajib diisi). Dicentang = kolom boleh kosong (NULL)." },
    { id: "indeks", n: 6, x: 84, y: 20.7, box: [80.4, 23, 9.6, 54], label: "Indeks", title: "Indeks (Index) → PRIMARY KEY", text: "Pilih <strong>PRIMARY</strong> pada <code>id_buku</code>. phpMyAdmin menuliskannya sebagai <code>PRIMARY KEY (id_buku)</code>." },
    { id: "ai", n: 7, x: 92.4, y: 31, box: [90.2, 23, 2.6, 54], label: "A_I", title: "A_I → AUTO_INCREMENT", text: "Nomor naik otomatis (1, 2, 3, …) untuk kolom INT. Tidak dipakai di tabel buku karena id_buku berupa kode CHAR seperti B0001." }
  ]
};

module.exports = [
  A("DDL: Perintah untuk Membuat Rangka", `<p>Perintah SQL dikelompokkan menurut tugasnya (lihat P4: DDL, DML, DCL, TCL). <strong>DDL</strong> mengurus rangka basis data: <strong>CREATE</strong> membuat, <strong>ALTER</strong> mengubah (Bab 8), <strong>DROP</strong> menghapus. DDL tidak menyentuh isi data.</p>
<p>Ibarat tukang lemari: memotong papan, menentukan jumlah laci, dan besar kotak isian kartu. Setelah lemari jadi, tukang selesai; mengisi kartu adalah tugas petugas (DML).</p>`, "Bagian 1"),
  A("Memilih Basis Data dengan USE", `<p>Satu server menampung banyak basis data, jadi DBMS harus tahu lemari mana yang dituju: <code>USE perpustakaan;</code>. Di phpMyAdmin cukup mengklik nama basis data di sisi kiri; judul di atas kotak SQL ikut berubah.</p>
<p>USE tetap perlu dikenali karena sering muncul di berkas .sql yang dibagikan orang lain. ➕ Alternatifnya, sebut nama basis data di depan tabel: <code>SELECT * FROM perpustakaan.buku;</code></p>`, "Bagian 2"),
  anatomi,
  { type: "table", label: "Tabel Interaktif", title: "➕ Memilih Tipe Data: Pertanyaan Penuntun", headers: ["Pertanyaan", "Jika ya", "Contoh"],
    rows: [["Apakah akan dihitung (dijumlah, dibandingkan besar-kecil)?", "INT (atau DECIMAL untuk pecahan)", "stok, lantai, daya_tampung"], ["Apakah panjangnya selalu sama?", "CHAR(n)", "id_buku, kode_prodi, id_rak"], ["Teks yang panjangnya beragam?", "VARCHAR(n)", "judul, nama, nama_penerbit"], ["Hanya tahun?", "YEAR", "tahun terbit"], ["Tanggal lengkap?", "DATE", "tgl_daftar, tgl_pinjam"], ["Angka tapi tidak dihitung (diawali 0, ada +)?", "VARCHAR", "nomor_hp (P2)"]],
    modes: [{ label: "➕ DECIMAL", target: "row", row: 0, title: "Untuk pecahan pasti", text: "IPK atau uang lebih tepat DECIMAL(3,2) / DECIMAL(12,2), bukan INT. Modul cukup memakai lima tipe; ini tambahan." }] },
  ex("Latihan Interaktif", "Tipe Data yang Tepat", ["Kolom", "Tipe"], ["CHAR(3)", "VARCHAR(30)", "INT", "YEAR", "DATE"], [
    ["id_rak (R01)", "CHAR(3)"], ["nama_rak (maks 30 huruf)", "VARCHAR(30)"], ["daya_tampung", "INT"], ["tahun_terbit", "YEAR"], ["tgl_pinjam", "DATE"]
  ]),
  alur,
  klik,
  formulir,
  { type: "code", label: "Contoh Kode", title: "Hasil DESCRIBE buku", file: "describe.txt", code: `+-----------+-------------+------+-----+---------+-------+
| Field     | Type        | Null | Key | Default | Extra |
+-----------+-------------+------+-----+---------+-------+
| id_buku   | char(5)     | NO   | PRI | NULL    |       |
| judul     | varchar(80) | NO   |     | NULL    |       |
| pengarang | varchar(50) | NO   |     | NULL    |       |
| tahun     | year(4)     | NO   |     | NULL    |       |
| stok      | int(11)     | NO   |     | NULL    |       |
+-----------+-------------+------+-----+---------+-------+`, note: "Null = NO karena NOT NULL. Key = PRI hanya di id_buku. Default NULL di sini berarti “tidak ada nilai bawaan”, bukan berarti boleh kosong." },
  { type: "code", label: "Contoh Kode", title: "➕ Pratinjau: Tabel dengan Kunci Tamu (Bab 8–12)", file: "peminjaman.sql", code: `CREATE TABLE peminjaman (
  id_pinjam   CHAR(6) NOT NULL,
  id_buku     CHAR(5) NOT NULL,
  id_anggota  CHAR(5) NOT NULL,
  tgl_pinjam  DATE    NOT NULL,
  tgl_kembali DATE,                      -- boleh NULL
  PRIMARY KEY (id_pinjam),
  FOREIGN KEY (id_buku)    REFERENCES buku (id_buku),
  FOREIGN KEY (id_anggota) REFERENCES anggota (id_anggota)
);`, note: "Belum dipraktikkan di Bab 7. Inilah wujud SQL dari skema P4 yang menghasilkan MUL pada DESCRIBE dan ERROR 1452 bila rujukan tidak ada. Tabel buku dan anggota harus dibuat lebih dulu." },
  tip("Jangan hapus tabel buku!", "Tabel <code>buku</code> dipakai terus sampai Bab 12. Untuk mencoba DROP, buat tabel <code>coba</code> dulu.", "warn"),
  rv("Cek Pemahaman Modul", "Jawab Dulu, Baru Buka", [
    { prompt: "Apa itu DDL dan tiga perintahnya?", answer: "Perintah pengurus rangka basis data: CREATE, ALTER, DROP", reason: "" },
    { prompt: "Mengapa DROP perlu dibaca ulang?", answer: "Seketika, tanpa konfirmasi (dari MySQL), tanpa pembatalan", reason: "Satu-satunya jalan kembali: salinan cadangan." },
    { prompt: "Tingkat 3: tabel petugas jaga minimal 5 kolom. Contoh?", answer: "petugas(id_petugas CHAR(5), nama VARCHAR(50), no_hp VARCHAR(15), shift VARCHAR(10), tgl_mulai DATE)", reason: "Salah satu kemungkinan; PRIMARY KEY (id_petugas). Ini latihan mandiri, jadi rancanganmu boleh berbeda." }
  ])
];
