// Basis Data — Pertemuan 7: DDL, Membuat Basis Data dan Tabel
const CREATE_BUKU = `CREATE TABLE buku (
  id_buku   CHAR(5)     NOT NULL,
  judul     VARCHAR(80) NOT NULL,
  pengarang VARCHAR(50) NOT NULL,
  tahun     YEAR        NOT NULL,
  stok      INT         NOT NULL,
  PRIMARY KEY (id_buku)
);`;
module.exports = {
  id: "p7", nomor: 7, judul: "DDL: Membuat Basis Data dan Tabel", ujian: "UTS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Membuat Rangka Lemari dengan SQL",
    text: "Pahami <strong>DDL</strong> (CREATE, ALTER, DROP), pilih basis data dengan <strong>USE</strong>, tulis <strong>CREATE TABLE</strong> lengkap dengan tipe data, NOT NULL, dan PRIMARY KEY, periksa dengan <strong>SHOW TABLES</strong> dan <strong>DESCRIBE</strong>, lalu kenali enam pesan galatnya."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "DDL = pekerjaan tukang lemari", html: "<strong>DDL (Data Definition Language)</strong> mengurus <strong>rangka</strong>: membuat (CREATE), mengubah (ALTER, Bab 8), menghapus (DROP). DDL tidak mengurus isi data; mengisi kartu adalah pekerjaan petugas (DML, Bab 9)." },
    { type: "code", label: "Interaktif 1 • Pola CREATE TABLE", title: "Nama Kolom, Tipe Data, Aturan", file: "pola.sql", code: `USE perpustakaan;          -- pilih lemari dulu

CREATE TABLE nama_tabel (
  nama_kolom TIPE_DATA ATURAN,
  nama_kolom TIPE_DATA ATURAN,
  PRIMARY KEY (nama_kolom)  -- baris terakhir: tanpa koma
);`, note: "Koma memisahkan setiap baris kolom, <strong>kecuali</strong> baris terakhir sebelum kurung tutup. Penulisan bertingkat tidak wajib, tetapi memudahkan mencari kesalahan." },
    { type: "table", label: "Interaktif 2 • Lima Tipe Data", title: "Cukup sampai Akhir Mata Kuliah", mono: true, headers: ["Tipe", "Isi", "Contoh kolom"],
      rows: [["CHAR(n)", "Teks panjang tetap n huruf", "id_buku 'BK001'"], ["VARCHAR(n)", "Teks panjang berubah, maks n", "judul, nama"], ["INT", "Bilangan bulat (boleh minus)", "stok, lantai"], ["YEAR", "Tahun saja", "tahun terbit"], ["DATE", "'tahun-bulan-hari'", "tgl_daftar '2026-09-12'"]],
      modes: [{ label: "DATE ditulis", target: "row", row: 4, title: "Dalam kutip tunggal, urutan tahun-bulan-hari", text: "'2026-09-12', bukan 12/09/2026." }, { label: "CHAR vs VARCHAR", target: "row", row: 0, title: "Panjang tetap vs berubah", text: "Nomor berpola tetap (BK001, R01) → CHAR. Judul yang panjangnya beragam → VARCHAR." }] },
    { type: "table", label: "Interaktif 3 • Membaca CREATE TABLE buku", title: "Satu Baris = Satu Kalimat", mono: true, headers: ["Potongan", "Arti"],
      rows: [["id_buku CHAR(5) NOT NULL", "Teks 5 huruf, panjang tetap, wajib diisi"], ["judul VARCHAR(80) NOT NULL", "Teks sampai 80 huruf"], ["tahun YEAR NOT NULL", "Hanya tahun, wajib diisi"], ["stok INT NOT NULL", "Bilangan bulat, wajib diisi"], ["PRIMARY KEY (id_buku)", "id_buku ditetapkan sebagai kunci primer"]],
      defaultNote: "Diterjemahkan dari skema relasi P4: buku(<u>id_buku</u>, judul, pengarang, tahun, stok)." },
    { type: "table", label: "Interaktif 4 • Memeriksa & Menghapus", title: "Perintah Pendukung", mono: true, headers: ["Perintah", "Fungsi"],
      rows: [["SHOW TABLES;", "Daftar tabel di basis data yang dipakai"], ["DESCRIBE buku;", "Susunan kolom: tipe, Null, Key"], ["DROP TABLE nama;", "Hapus satu tabel + isinya"], ["DROP DATABASE nama;", "Hapus basis data + SEMUA tabelnya"]],
      modes: [{ label: "⚠️ DROP", target: "row", row: 3, title: "Seketika, tanpa pembatalan", text: "Satu-satunya jalan kembali adalah salinan cadangan. Baca ulang nama yang disebut sebelum menjalankan." }] },
    { type: "table", label: "Interaktif 5 • Enam Pesan Galat", title: "Galat Saat Membuat dan Menghapus Tabel", mono: true, headers: ["Galat", "Penyebab"],
      rows: [["1046 No database selected", "Belum memilih basis data (USE / klik di kiri)"], ["1050 Table 'buku' already exists", "Nama tabel sudah dipakai"], ["1051 Unknown table 'perpustakaan.anggota'", "Tabel yang dihapus tidak ada"], ["4161 Unknown data type: 'VARCAHR'", "Tipe data salah ketik (MariaDB; MySQL: 1064)"], ["1064 You have an error in your SQL syntax", "Koma terlewat / kurung tidak lengkap"], ["1068 Multiple primary key defined", "PRIMARY KEY ditulis dua kali"]] }
  ],
  simulator: [
    { type: "sql-lab", profile: "p7", label: "Lab Basis Data", title: "Membuat dan Memeriksa Tabel buku",
      desc: "Gunakan basis data perpustakaan dari P6. Pilih basis data di sebelah kiri, jalankan contoh CREATE TABLE, lalu cek struktur dan isinya.",
      examples: [
        { label: "Buat tabel buku", sql: CREATE_BUKU },
        { label: "Daftar tabel", sql: "SHOW TABLES;" },
        { label: "Lihat kolom buku", sql: "DESCRIBE buku;" },
        { label: "Lihat isi tabel baru", sql: "SELECT * FROM buku;" },
        { label: "Buat dan hapus tabel coba", sql: "CREATE TABLE coba (a INT, b VARCHAR(10));\nDROP TABLE coba;\nSHOW TABLES;" }
      ] },
    { type: "detective", label: "Permainan Interaktif 2 • Latihan Tingkat 2 Modul", title: "Detektif: CREATE TABLE anggota yang Ditolak", desc: "Klik baris perintah yang salah. Ada 5 kesalahan.",
      rules: ["Nama kolom tanpa spasi.", "Setiap baris kolom diakhiri koma, kecuali yang terakhir.", "Ejaan tipe data harus benar.", "Hanya satu PRIMARY KEY.", "Perintah diakhiri titik koma."],
      headers: ["Baris", "Perintah"],
      rows: [["1", "CREATE TABLE anggota ("], ["2", "id anggota CHAR(5) NOT NULL"], ["3", "nama VARCAHR(50) NOT NULL,"], ["4", "prodi VARCHAR(40),"], ["5", "PRIMARY KEY (id_anggota),"], ["6", "PRIMARY KEY (nama)"], ["7", ")"]],
      bugs: [
        { row: 1, col: 1, fixed: "id_anggota CHAR(5) NOT NULL,", explain: "✅ Dua kesalahan: nama kolom berspasi (id anggota → id_anggota) dan koma di akhir baris terlewat (ERROR 1064)." },
        { row: 2, col: 1, fixed: "nama VARCHAR(50) NOT NULL,", explain: "✅ VARCAHR salah ketik → ERROR 4161 (MariaDB) / 1064 (MySQL)." },
        { row: 4, col: 1, fixed: "PRIMARY KEY (id_anggota)", explain: "✅ Karena baris 6 dihapus, baris ini menjadi baris terakhir: koma di belakangnya juga harus dihapus." },
        { row: 5, col: 1, fixed: "(hapus baris ini)", explain: "✅ Dua PRIMARY KEY → ERROR 1068 Multiple primary key defined." },
        { row: 6, col: 1, fixed: ");", explain: "✅ Titik koma penutup terlewat. (Di tab SQL phpMyAdmin satu perintah tanpa ; masih jalan, tetapi biasakan menulisnya.)" }
      ] },
    { type: "exercise", label: "Permainan Interaktif 3 • Latihan Tingkat 1 Modul", title: "Tulis Potongan Kolomnya", headers: ["Keterangan", "Potongan perintah"],
      rows: [
        ["kode_prodi: teks 4 huruf panjang tetap, wajib diisi", "kode_prodi CHAR(4) NOT NULL", ["kode_prodi CHAR(4) NOT NULL", "kode_prodi VARCHAR(4)", "kode_prodi INT NOT NULL"]],
        ["nama_penerbit: teks sampai 60 huruf, wajib diisi", "nama_penerbit VARCHAR(60) NOT NULL", ["nama_penerbit CHAR(60)", "nama_penerbit VARCHAR(60) NOT NULL", "nama_penerbit TEXT(60) NULL"]],
        ["jumlah_halaman: bilangan bulat, boleh dikosongkan", "jumlah_halaman INT", ["jumlah_halaman INT NOT NULL", "jumlah_halaman INT", "jumlah_halaman VARCHAR(5)"]],
        ["tanggal_masuk: tanggal lengkap, wajib diisi", "tanggal_masuk DATE NOT NULL", ["tanggal_masuk YEAR NOT NULL", "tanggal_masuk DATE NOT NULL", "tanggal_masuk VARCHAR(10) NOT NULL"]]
      ].map(([c, a, o]) => ({ cells: [c], fields: [{ options: o, answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Mini-Case & Cek Pemahaman", title: "Coba Dulu, Lalu Buka", items: [
      { prompt: "Mini-case rak: nomor rak 3 huruf unik, nama maks 30, lantai bilangan, daya tampung bilangan. Tulis CREATE TABLE-nya.", answer: "CREATE TABLE rak ( id_rak CHAR(3) NOT NULL, nama_rak VARCHAR(30) NOT NULL, lantai INT NOT NULL, daya_tampung INT NOT NULL, PRIMARY KEY (id_rak) );", reason: "Skema: rak(id_rak, nama_rak, lantai, daya_tampung). Jika dijalankan dua kali → ERROR 1050." },
      { prompt: "Tulis CREATE TABLE anggota (id_anggota, nama, prodi).", answer: "CREATE TABLE anggota ( id_anggota CHAR(5) NOT NULL, nama VARCHAR(50) NOT NULL, prodi VARCHAR(40) NOT NULL, PRIMARY KEY (id_anggota) );", reason: "Kunci jawaban modul." },
      { prompt: "Mengapa SELECT pada tabel baru menghasilkan Empty set?", answer: "CREATE hanya membuat rangka; isi belum ada", reason: "Data dimasukkan dengan INSERT (Bab 9)." },
      { prompt: "Beda DROP TABLE dan DROP DATABASE?", answer: "DROP TABLE: satu tabel. DROP DATABASE: seluruh basis data + semua tabelnya.", reason: "" }
    ] }
  ],
  flashcards: [
    { tag: "P7", q: "Apa itu DDL?", a: "Data Definition Language: perintah yang mengurus rangka basis data. CREATE, ALTER, DROP." },
    { tag: "P7", q: "Fungsi USE perpustakaan;?", a: "Memilih basis data yang dituju. Tanpanya → ERROR 1046 No database selected." },
    { tag: "P7", q: "Pola satu baris kolom?", a: "nama_kolom TIPE_DATA ATURAN, misalnya <code>judul VARCHAR(80) NOT NULL</code>." },
    { tag: "P7", q: "CHAR(n) vs VARCHAR(n)?", a: "CHAR: panjang tetap (BK001). VARCHAR: panjang berubah sampai n (judul)." },
    { tag: "P7", q: "YEAR vs DATE?", a: "YEAR hanya tahun (2026). DATE tanggal lengkap '2026-09-12'." },
    { tag: "P7", q: "Arti NOT NULL?", a: "Kolom tidak boleh dikosongkan." },
    { tag: "P7", q: "SHOW TABLES vs DESCRIBE?", a: "SHOW TABLES: daftar tabel. DESCRIBE tabel: susunan kolomnya (tipe, Null, Key)." },
    { tag: "P7", q: "Kenapa DROP berbahaya?", a: "Berjalan seketika, tanpa konfirmasi dari MySQL dan tanpa pembatalan; hanya cadangan yang bisa menyelamatkan." },
    { tag: "P7", q: "ERROR 1050 / 1051?", a: "1050: tabel sudah ada. 1051: tabel yang dihapus tidak ada." },
    { tag: "P7", q: "ERROR 1068 / 4161?", a: "1068: lebih dari satu PRIMARY KEY. 4161 (MariaDB): tipe data tidak dikenal (salah ketik)." }
  ],
  quiz: [
    { q: "DDL adalah kelompok perintah SQL yang mengurus…", opts: ["Isi data", "Rangka basis data", "Hak akses", "Transaksi"], ans: 1, exp: "Isi data = DML." },
    { q: "Tiga perintah utama DDL adalah…", opts: ["INSERT, UPDATE, DELETE", "CREATE, ALTER, DROP", "GRANT, REVOKE, DENY", "COMMIT, ROLLBACK, SAVEPOINT"], ans: 1, exp: "" },
    { q: "Perintah untuk memilih basis data yang dituju adalah…", opts: ["SELECT perpustakaan;", "OPEN perpustakaan;", "USE perpustakaan;", "SHOW perpustakaan;"], ans: 2, exp: "" },
    { q: "ERROR 1046 No database selected muncul karena…", opts: ["Tabel sudah ada", "Belum memilih basis data", "Tipe data salah", "Koma terlewat"], ans: 1, exp: "" },
    { q: "Tipe data paling tepat untuk id_buku berpola tetap BK001 adalah…", opts: ["VARCHAR(80)", "CHAR(5)", "INT", "YEAR"], ans: 1, exp: "Panjang selalu sama." },
    { q: "Tipe data untuk tanggal daftar anggota adalah…", opts: ["YEAR", "DATE", "INT", "CHAR(4)"], ans: 1, exp: "Ditulis '2026-09-12'." },
    { q: "Aturan NOT NULL berarti…", opts: ["Kolom menjadi kunci primer", "Kolom tidak boleh dikosongkan", "Kolom boleh berulang", "Kolom bernilai nol"], ans: 1, exp: "" },
    { q: "Pada CREATE TABLE, tanda koma TIDAK ditulis pada…", opts: ["Baris kolom pertama", "Baris terakhir sebelum kurung tutup", "Setiap baris", "Baris PRIMARY KEY selalu"], ans: 1, exp: "Koma berlebih atau kurang → ERROR 1064." },
    { q: "Setelah CREATE TABLE buku berhasil, SELECT * FROM buku; menghasilkan…", opts: ["ERROR 1146", "Empty set", "Satu baris contoh", "Struktur tabel"], ans: 1, exp: "Rangka ada, isi belum." },
    { q: "Perintah untuk melihat susunan kolom tabel buku adalah…", opts: ["SHOW TABLES;", "DESCRIBE buku;", "SELECT buku;", "USE buku;"], ans: 1, exp: "" },
    { q: "Menjalankan CREATE TABLE buku untuk kedua kalinya menghasilkan…", opts: ["ERROR 1050 Table 'buku' already exists", "Tabel lama ditimpa", "ERROR 1051", "Tabel lama dikosongkan"], ans: 0, exp: "Tabel lama tidak berubah." },
    { q: "ERROR 1068 Multiple primary key defined berarti…", opts: ["Tipe data salah ketik", "PRIMARY KEY ditetapkan lebih dari sekali", "Tabel tidak ada", "Kolom berspasi"], ans: 1, exp: "Satu tabel satu kunci primer (boleh gabungan dalam satu PRIMARY KEY (a, b))." },
    { q: "Perbedaan DROP TABLE dan DROP DATABASE adalah…", opts: ["Sama saja", "DROP TABLE menghapus satu tabel; DROP DATABASE menghapus seluruh basis data beserta tabelnya", "DROP DATABASE bisa dibatalkan", "DROP TABLE hanya menghapus isi"], ans: 1, exp: "" },
    { q: "Pada DESCRIBE buku, kolom Key bernilai PRI hanya pada id_buku karena…", opts: ["id_buku bertipe CHAR", "PRIMARY KEY (id_buku)", "id_buku NOT NULL", "id_buku kolom pertama"], ans: 1, exp: "" },
    { q: "Ketik VARCAHR(50) di MariaDB menghasilkan ERROR…", opts: ["1046", "1050", "4161", "1068"], ans: 2, exp: "Di MySQL dilaporkan sebagai 1064." },
    { q: "Tipe data untuk kolom stok adalah…", opts: ["INT", "VARCHAR(5)", "DATE", "YEAR"], ans: 0, exp: "Bilangan bulat yang dihitung." }
  ],
  ringkasan: `*RANGKUMAN BASIS DATA — PERTEMUAN 7*
🏗️ *DDL: Membuat Basis Data & Tabel*

1️⃣ DDL = rangka: CREATE, ALTER (Bab 8), DROP. Isi data = DML (Bab 9).
2️⃣ USE perpustakaan; (atau klik di kiri). Lupa → ERROR 1046.
3️⃣ CREATE TABLE buku ( id_buku CHAR(5) NOT NULL, judul VARCHAR(80) NOT NULL, …, PRIMARY KEY (id_buku) );
4️⃣ Tipe: CHAR(n) tetap • VARCHAR(n) berubah • INT • YEAR • DATE 'yyyy-mm-dd'.
5️⃣ Cek: SHOW TABLES; • DESCRIBE buku; • tabel baru = Empty set.
6️⃣ DROP TABLE / DROP DATABASE: seketika, tanpa batal.
7️⃣ Galat: 1046 no database • 1050 sudah ada • 1051 tak ada • 4161 tipe salah ketik • 1064 sintaks/koma • 1068 PK ganda.`
};
