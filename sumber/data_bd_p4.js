// Basis Data — Pertemuan 4: Dari ERD ke Tabel + SQL DML (slide) + CPMK 1 (bank soal P1–P4)
const SEED = "CREATE DATABASE kampus; USE kampus; CREATE TABLE mahasiswa (nim CHAR(7) NOT NULL, nama VARCHAR(50) NOT NULL, jurusan VARCHAR(30), angkatan YEAR, ipk DECIMAL(3,2), PRIMARY KEY (nim)); INSERT INTO mahasiswa VALUES ('2301001','Andi Pratama','Sistem Informasi',2023,3.45), ('2301002','Budi Santoso','Sistem Informasi',2023,3.10), ('2301003','Citra Dewi','Teknik Informatika',2023,3.78), ('2201004','Dian Permata','Sistem Informasi',2022,3.25);";
module.exports = {
  id: "p4", nomor: 4, judul: "Dari ERD ke Tabel, SQL DML & CPMK 1", ujian: "CPMK 1",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Ubah Gambar Jadi Tabel, Lalu Isi Tabelnya dengan SQL",
    text: "Kuasai <strong>skema relasi</strong>, <strong>kunci tamu</strong>, <strong>4 aturan transformasi</strong> (termasuk tabel penghubung M:N), dan perintah <strong>INSERT, SELECT, UPDATE, DELETE, COMMIT, ROLLBACK</strong>. Tab Kuis berisi <strong>bank soal CPMK 1</strong> dari Pertemuan 1–4."
  },
  cheatsheet: [
    { type: "callout", tone: "warn", heading: "CPMK 1: soal dari Pertemuan 1–4", html: "Tab <strong>Kuis</strong> berisi bank soal latihan dari P1 (konsep & DBMS), P2 (model relasional), P3 (ERD), dan P4 (transformasi + SQL DML). Ini latihan, bukan bocoran soal. Ulangi sampai skor penuh, lalu baca penjelasan setiap jawaban." },
    { type: "table", label: "Interaktif 1 • Skema Relasi", title: "Menulis Tabel dalam Satu Baris", headers: ["Skema relasi", "Arti"],
      rows: [["buku(**id_buku**, judul, pengarang, tahun, stok)", "Tabel buku, 5 kolom, PK id_buku"], ["anggota(**id_anggota**, nama, prodi, tgl_daftar)", "Tabel anggota, PK id_anggota"], ["peminjaman(**id_pinjam**, id_buku*, id_anggota*, tgl_pinjam, tgl_kembali)", "Tabel penghubung, 2 kunci tamu"]],
      modes: [{ label: "Penanda", target: "none", title: "Garis bawah penuh vs titik-titik", text: "Kunci primer = garis bawah <strong>penuh</strong>. Kunci tamu = garis bawah <strong>titik-titik</strong>. (Di sini PK ditebalkan, FK diberi bintang *.)" },
        { label: "tgl_kembali", target: "row", row: 2, title: "Boleh kosong", text: "Buku yang masih dipinjam belum punya tanggal kembali, jadi kolom ini boleh NULL." }] },
    { type: "callout", tone: "tip", heading: "Kunci tamu = slip yang hanya menulis nomor", html: "Kunci tamu (foreign key) adalah kolom yang isinya <strong>menunjuk kunci primer tabel lain</strong>. Slip peminjaman cukup menulis BK002, tidak menyalin judul. Jika judul salah cetak, cukup diperbaiki sekali di tabel buku. Aturannya disebut <strong>integritas rujukan</strong>: nilai kunci tamu harus benar-benar ada di tabel yang dirujuk (kalau tidak → ERROR 1452)." },
    { type: "choices", label: "Interaktif 2 • 4 Aturan Transformasi", title: "Kardinalitas Menentukan Aturannya", desc: "Klik setiap aturan:", style: "pills",
      options: [
        { label: "Aturan 1", title: "Setiap entitas → satu tabel", code: "Buku → buku(id_buku, judul, …)", text: "Atribut menjadi kolom, atribut kunci menjadi kunci primer." },
        { label: "Aturan 2 (1:1)", title: "Relasi satu ke satu", code: "anggota(id_anggota, …) + kartu(id_kartu, …, id_anggota*)", text: "Kunci salah satu tabel dititipkan sebagai kunci tamu ke tabel yang lain." },
        { label: "Aturan 3 (1:N)", title: "Relasi satu ke banyak", code: "penerbit(id_penerbit, …) → buku(…, id_penerbit*)", text: "Kunci tabel di sisi <strong>satu</strong> dititipkan ke tabel di sisi <strong>banyak</strong>. Jangan terbalik: sisi satu tidak bisa menampung banyak nilai." },
        { label: "Aturan 4 (M:N)", title: "Relasi banyak ke banyak → tabel penghubung", code: "peminjaman(id_pinjam, id_buku*, id_anggota*, tgl_pinjam, tgl_kembali)", text: "Buat tabel ketiga berisi kedua kunci tamu + atribut milik relasi. Hasil ERD perpustakaan: 3 tabel." }
      ] },
    { type: "table", label: "Interaktif 3 • DESCRIBE peminjaman;", title: "Membaca Struktur Tabel Penghubung", mono: true,
      headers: [{ label: "Field" }, { label: "Type" }, { label: "Null", note: "<strong>Null YES</strong> hanya pada tgl_kembali: buku yang belum kembali boleh tanpa tanggal." }, { label: "Key", note: "<strong>PRI</strong> = kunci primer. <strong>MUL</strong> = kolom berindeks yang nilainya boleh berulang (kunci tamu): BK002 boleh muncul berkali-kali karena buku bisa dipinjam berkali-kali." }],
      rows: [["id_pinjam", "char(6)", "NO", "PRI"], ["id_buku", "char(5)", "NO", "MUL"], ["id_anggota", "char(5)", "NO", "MUL"], ["tgl_pinjam", "date", "NO", ""], ["tgl_kembali", "date", "YES", ""]],
      defaultNote: "Klik judul kolom <strong>Null</strong> atau <strong>Key</strong>. Di phpMyAdmin: kunci emas = PK, kunci perak = kolom berindeks (FK)." },
    { type: "cards", label: "Interaktif 4 • Slide SQL", title: "4 Kelompok Perintah SQL", cols: 4, items: [
      { badge: "DDL", tone: "violet", title: "Struktur", text: "CREATE, ALTER, DROP" },
      { badge: "DML", tone: "emerald", title: "Isi data", text: "INSERT, SELECT, UPDATE, DELETE" },
      { badge: "DCL", tone: "amber", title: "Hak akses", text: "GRANT, REVOKE" },
      { badge: "TCL", tone: "sky", title: "Transaksi", text: "COMMIT, ROLLBACK, SAVEPOINT" }
    ] },
    { type: "table", label: "Interaktif 5 • Ringkasan DML", title: "Bentuk Inti Setiap Perintah", mono: true, headers: ["Perintah", "Bentuk inti"],
      rows: [["INSERT", "INSERT INTO tabel (kolom) VALUES (nilai);"], ["SELECT", "SELECT kolom FROM tabel WHERE kondisi;"], ["UPDATE", "UPDATE tabel SET kolom = nilai WHERE kondisi;"], ["DELETE", "DELETE FROM tabel WHERE kondisi;"], ["COMMIT", "COMMIT;"], ["ROLLBACK", "ROLLBACK;"]],
      modes: [{ label: "⚠️ Tanpa WHERE", target: "row", row: 2, title: "Semua baris kena", text: "UPDATE atau DELETE tanpa WHERE mengenai <strong>seluruh</strong> baris. Kebiasaan aman: jalankan SELECT dengan WHERE yang sama dulu." },
        { label: "Kutip", target: "row", row: 0, title: "Teks & tanggal pakai kutip tunggal", text: "'Sistem Informasi', '2026-10-01'. Angka tanpa kutip: 2023, 3.60." },
        { label: "➕ ROLLBACK di MySQL", target: "row", row: 5, title: "Autocommit", text: "MySQL secara bawaan memakai <em>autocommit</em>: setiap perintah langsung tersimpan. Agar ROLLBACK berfungsi, mulai dulu dengan <code>START TRANSACTION;</code> (atau <code>SET autocommit = 0;</code>)." }] },
    { type: "row", cols: [1, 1], blocks: [
      { type: "table", label: "Operator WHERE", title: "Operator yang Sering Dipakai", headers: ["Operator", "Arti"], rows: [["= dan <>", "sama / tidak sama"], ["> < >= <=", "perbandingan"], ["BETWEEN 3 AND 3.5", "dalam rentang (termasuk batas)"], ["IN ('SI','TI')", "termasuk daftar"], ["LIKE 'A%'", "pola teks; % = sembarang karakter"], ["IS NULL", "bernilai kosong"], ["AND OR NOT", "gabungan kondisi"]] },
      { type: "cards", label: "Hapus-menghapus", title: "DELETE vs TRUNCATE vs DROP", cols: 1, items: [
        { badge: "DELETE (DML)", tone: "amber", title: "Hapus baris sesuai WHERE", text: "Struktur tetap; masih bisa ROLLBACK (dalam transaksi)." },
        { badge: "TRUNCATE", tone: "rose", title: "Kosongkan seluruh isi", text: "Tanpa kondisi, lebih cepat, tidak bisa ROLLBACK." },
        { badge: "DROP (DDL)", tone: "violet", title: "Hapus tabel + strukturnya", text: "Tabel harus dibuat ulang bila diperlukan." }
      ] }
    ] },
    { type: "table", label: "Interaktif 6 • Pengurutan & Batas", title: "ORDER BY, DISTINCT, LIMIT", mono: true, headers: ["Perintah", "Hasil"],
      rows: [["ORDER BY ipk DESC", "IPK tertinggi ke terendah (ASC = bawaan, kecil ke besar)"], ["SELECT DISTINCT jurusan", "Daftar jurusan tanpa pengulangan"], ["… ORDER BY ipk DESC LIMIT 3", "3 IPK tertinggi"], ["SQL Server: TOP • Oracle: FETCH FIRST n ROWS ONLY", "Padanan LIMIT di DBMS lain"]],
      defaultNote: "Urutan klausa yang benar: SELECT … FROM … WHERE … ORDER BY … LIMIT …;" }
  ],
  simulator: [
    { type: "sql-lab", profile: "p4", label: "Lab Basis Data • SQL DML", title: "Ketik Sendiri Perintah DML pada Tabel mahasiswa",
      desc: "Tabel <code>mahasiswa</code> dari slide sudah terisi 4 baris di basis data <code>kampus</code>. Muat contoh, ubah sedikit (misalnya nilai WHERE-nya), lalu jalankan. Kalau datanya berantakan, tekan <strong>Kembalikan data awal</strong>.",
      tip: "Ini simulasi di browser yang mendukung SELECT (WHERE, AND/OR, LIKE, ORDER BY, LIMIT, DISTINCT, COUNT(*)), INSERT, UPDATE, DELETE, TRUNCATE, serta START TRANSACTION, COMMIT, dan ROLLBACK. Kunci tamu belum didukung.",
      seed: SEED,
      examples: [
        { label: "Semua data", sql: "SELECT * FROM mahasiswa;" },
        { label: "Nama & IPK jurusan SI", sql: "SELECT nama, ipk FROM mahasiswa WHERE jurusan = 'Sistem Informasi';" },
        { label: "Tiga IPK tertinggi", sql: "SELECT nama, ipk FROM mahasiswa ORDER BY ipk DESC LIMIT 3;" },
        { label: "AND", sql: "SELECT nama, ipk FROM mahasiswa WHERE ipk >= 3.50 AND angkatan = 2023;" },
        { label: "LIKE 'A%'", sql: "SELECT * FROM mahasiswa WHERE nama LIKE 'A%';" },
        { label: "DISTINCT", sql: "SELECT DISTINCT jurusan FROM mahasiswa;" },
        { label: "INSERT", sql: "INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk)\nVALUES ('2301005', 'Eka Saputra', 'Sistem Informasi', 2023, 3.60);" },
        { label: "UPDATE dengan WHERE", sql: "UPDATE mahasiswa SET ipk = 3.35 WHERE nim = '2301002';" },
        { label: "UPDATE tanpa WHERE", sql: "UPDATE mahasiswa SET ipk = 3.70;\nSELECT nama, ipk FROM mahasiswa;" },
        { label: "DELETE lalu ROLLBACK", sql: "START TRANSACTION;\nDELETE FROM mahasiswa WHERE angkatan = 2022;\nSELECT COUNT(*) FROM mahasiswa;\nROLLBACK;\nSELECT COUNT(*) FROM mahasiswa;" },
        { label: "nim kembar", sql: "INSERT INTO mahasiswa VALUES ('2301001', 'Eko', 'Sistem Informasi', 2023, 3.00);" }
      ] },
    { type: "exercise", label: "Permainan Interaktif 1 • Latihan Tingkat 1 Modul", title: "Aturan Transformasi Nomor Berapa?", headers: ["Relasi", "Aturan"],
      rows: [["Satu penerbit menerbitkan banyak buku; satu buku diterbitkan satu penerbit", "Aturan 3 (1:N) → 2 tabel", "✓ id_penerbit dititipkan ke tabel buku."], ["Satu anggota memiliki satu kartu; satu kartu dimiliki satu anggota", "Aturan 2 (1:1) → 2 tabel", "✓ Titipkan salah satu kunci ke tabel lain."], ["Satu buku ditulis banyak pengarang; satu pengarang menulis banyak buku", "Aturan 4 (M:N) → 3 tabel", "✓ Perlu tabel penghubung, misalnya buku_pengarang."], ["Satu rak menampung banyak buku; satu buku di satu rak", "Aturan 3 (1:N) → 2 tabel", "✓ id_rak dititipkan ke tabel buku."]]
        .map(([c, a, ok]) => ({ cells: [c], fields: [{ options: ["Aturan 2 (1:1) → 2 tabel", "Aturan 3 (1:N) → 2 tabel", "Aturan 4 (M:N) → 3 tabel"], answer: a }], ok })) },
    { type: "detective", label: "Permainan Interaktif 2 • Latihan Tingkat 2 Modul", title: "Detektif: Rancangan M:N yang Dipaksa Jadi 2 Tabel", desc: "Seorang mahasiswa menitipkan id_anggota ke tabel buku dan id_buku ke tabel anggota. Klik sel yang bermasalah!",
      rules: ["Satu sel hanya berisi <strong>satu nilai</strong>.", "Relasi M:N memerlukan <strong>tabel penghubung</strong>.", "Atribut milik relasi masuk ke tabel penghubung."],
      headers: ["id_buku", "judul", "id_anggota (titipan)"],
      rows: [["BK001", "Dasar Pemrograman Komputer", "AG002"], ["BK002", "Sistem Basis Data", "AG001, AG003"], ["BK003", "Jaringan Komputer Dasar", "AG001, AG002, AG004"]],
      bugs: [
        { row: 1, col: 2, fixed: "→ pindah ke peminjaman", explain: "✅ BK002 dipinjam dua anggota, sel terpaksa berisi dua nilai (melanggar aturan 1 di P2). Pindahkan ke tabel penghubung <code>peminjaman(id_pinjam, id_buku*, id_anggota*, tgl_pinjam, tgl_kembali)</code>." },
        { row: 2, col: 2, fixed: "→ pindah ke peminjaman", explain: "✅ Makin sering dipinjam, makin penuh selnya. Itulah alasan relasi M:N <strong>tidak bisa</strong> diwujudkan dengan dua tabel saja." }
      ] },
    { type: "exercise", label: "Permainan Interaktif 3 • Pilih Perintah yang Benar", title: "SQL Mana yang Tepat?", headers: ["Tujuan", "Perintah"],
      rows: [
        ["Menambah mahasiswa baru", "INSERT INTO mahasiswa VALUES (…);", ["INSERT INTO mahasiswa VALUES (…);", "ADD mahasiswa VALUES (…);"]],
        ["Mengubah IPK satu mahasiswa", "UPDATE mahasiswa SET ipk = 3.5 WHERE nim = '2301001';", ["UPDATE mahasiswa SET ipk = 3.5;", "UPDATE mahasiswa SET ipk = 3.5 WHERE nim = '2301001';"]],
        ["Menghapus mahasiswa angkatan 2022", "DELETE FROM mahasiswa WHERE angkatan = 2022;", ["DROP mahasiswa WHERE angkatan = 2022;", "DELETE FROM mahasiswa WHERE angkatan = 2022;"]],
        ["Menulis teks dalam perintah", "'Sistem Informasi'", ["Sistem Informasi", "'Sistem Informasi'"]],
        ["Urut IPK dari terkecil", "ORDER BY ipk ASC", ["ORDER BY ipk ASC", "ORDER BY ipk DESC"]],
        ["Menyimpan perubahan permanen", "COMMIT;", ["ROLLBACK;", "COMMIT;"]]
      ].map(([c, a, o]) => ({ cells: [c], fields: [{ options: o, answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Mini-Case & Cek Pemahaman Modul", title: "Jawab Dulu, Baru Buka", items: [
      { prompt: "Mini-case ruang baca (M:N): tulis skemanya.", answer: "ruang(no_ruang, nama_ruang, daya_tampung) • anggota(id_anggota, …) • pemesanan(id_pesan, no_ruang*, id_anggota*, tanggal, jam)", reason: "Aturan 4. Kolom yang boleh kosong biasanya tidak ada pada pemesanan; semuanya wajib saat memesan." },
      { prompt: "Tingkat 3: penerbit 1:N buku. Perubahan tabel buku?", answer: "buku(id_buku, …, id_penerbit*) + penerbit(id_penerbit, nama_penerbit, …)", reason: "Jika nama penerbit disimpan sebagai teks di buku: berulang, rawan salah ketik, dan harus diubah di banyak baris." },
      { prompt: "Mengapa id_buku di peminjaman bertanda MUL, bukan PRI?", answer: "Karena nilainya boleh berulang", reason: "Satu buku bisa dipinjam berkali-kali." },
      { prompt: "Rancangan menyimpan nama anggota di tabel peminjaman. Kerugiannya?", answer: "Salah ketik harus diperbaiki di banyak baris", reason: "Kalau hanya id_anggota, perbaikan cukup sekali di tabel anggota." }
    ] }
  ],
  flashcards: [
    { tag: "P4", q: "Apa itu skema relasi?", a: "Cara menulis tabel dalam satu baris: <code>buku(id_buku, judul, …)</code>. PK garis bawah penuh, FK garis bawah titik-titik." },
    { tag: "P4", q: "Apa itu kunci tamu (foreign key)?", a: "Kolom yang isinya menunjuk kunci primer tabel lain; membuat dua tabel terhubung." },
    { tag: "P4", q: "Apa itu integritas rujukan?", a: "Isi kunci tamu harus benar-benar ada di tabel yang dirujuk. Pelanggaran → ERROR 1452." },
    { tag: "P4", q: "Relasi 1:N diubah menjadi tabel bagaimana?", a: "Kunci sisi <strong>satu</strong> dititipkan sebagai kunci tamu ke tabel sisi <strong>banyak</strong>." },
    { tag: "P4", q: "Relasi M:N diubah menjadi tabel bagaimana?", a: "Tabel penghubung berisi kedua kunci tamu + atribut milik relasi. ERD perpustakaan → buku, anggota, peminjaman." },
    { tag: "P4", q: "Arti PRI dan MUL?", a: "PRI = kunci primer. MUL = kolom berindeks yang nilainya boleh berulang (biasanya kunci tamu)." },
    { tag: "SQL", q: "4 kelompok SQL?", a: "DDL (CREATE, ALTER, DROP), DML (INSERT, SELECT, UPDATE, DELETE), DCL (GRANT, REVOKE), TCL (COMMIT, ROLLBACK, SAVEPOINT)." },
    { tag: "SQL", q: "Bahaya UPDATE/DELETE tanpa WHERE?", a: "Mengenai <strong>seluruh</strong> baris tabel." },
    { tag: "SQL", q: "DELETE vs TRUNCATE vs DROP?", a: "DELETE hapus baris sesuai WHERE (bisa ROLLBACK pada tabel transaksional sebelum COMMIT). TRUNCATE kosongkan semua (tidak bisa ROLLBACK). DROP hapus tabel + struktur." },
    { tag: "SQL", q: "COMMIT vs ROLLBACK?", a: "COMMIT menyimpan permanen; ROLLBACK mengembalikan ke COMMIT terakhir. ➕ Di MySQL mulai dengan START TRANSACTION." },
    { tag: "SQL", q: "Arti LIKE 'A%'?", a: "Teks yang diawali huruf A; % mewakili sembarang karakter." },
    { tag: "SQL", q: "Padanan LIMIT di SQL Server dan Oracle?", a: "SQL Server: TOP. Oracle: FETCH FIRST n ROWS ONLY." }
  ],
  quiz: [
    // ---- P1
    { q: "[P1] Angka 2018 yang tertulis tanpa keterangan apa pun termasuk…", opts: ["Data", "Informasi", "DBMS", "Skema relasi"], ans: 0, exp: "Belum punya konteks → data." },
    { q: "[P1] “Ada dua judul buku yang stoknya kurang dari tiga eksemplar.” Pernyataan ini termasuk…", opts: ["Data mentah", "Informasi", "Atribut", "Kunci tamu"], ans: 1, exp: "Hasil olahan yang menjawab pertanyaan → informasi." },
    { q: "[P1] Dalam padanan lemari arsip, satu laci sama dengan…", opts: ["Basis data", "Tabel", "Baris", "Kolom"], ans: 1, exp: "Lemari = basis data, laci = tabel, kartu = baris, kotak isian = kolom." },
    { q: "[P1] Perangkat lunak yang menjaga aturan dan melayani permintaan terhadap basis data adalah…", opts: ["Lembar kerja", "phpMyAdmin", "DBMS", "Peramban"], ans: 2, exp: "DBMS ibarat petugas pemegang kunci lemari." },
    { q: "[P1] Berikut ini bukan masalah menyimpan data hanya di lembar kerja…", opts: ["Data berulang", "Data tidak seragam", "Sulit dipakai bersama", "Data bisa dicari dengan SELECT"], ans: 3, exp: "Mencari dengan SELECT justru kelebihan DBMS." },
    { q: "[P1] Urutan hierarki data dari terkecil adalah…", opts: ["Karakter → kolom → baris → tabel → basis data", "Kolom → karakter → tabel → baris → basis data", "Basis data → tabel → baris → kolom → karakter", "Karakter → baris → kolom → tabel → basis data"], ans: 0, exp: "Seperti huruf → kata → kalimat → halaman → buku." },
    { q: "[P1] ERROR 1146 Table 'perpustakaan.bukku' doesn't exist disebabkan…", opts: ["Salah ketik kata SELECT", "Nama tabel salah", "Lupa titik koma", "Kolom tidak dikenal"], ans: 1, exp: "1064 = salah ketik perintah, 1146 = tabel tidak ada, 1054 = kolom tidak dikenal." },
    { q: "[P1] Contoh DBMS berikut benar, kecuali…", opts: ["MySQL", "PostgreSQL", "Microsoft Excel", "SQLite"], ans: 2, exp: "Excel adalah lembar kerja, bukan DBMS." },
    // ---- P2
    { q: "[P2] Kata “relasional” pada model data relasional berasal dari relation yang berarti…", opts: ["Hubungan antarorang", "Tabel", "Kunci tamu", "Jaringan"], ans: 1, exp: "Relation = tabel." },
    { q: "[P2] Tabel tampak 9 baris di layar termasuk baris judul. Jumlah data sebenarnya…", opts: ["9", "8", "10", "Tidak bisa ditentukan"], ans: 1, exp: "Baris judul tidak dihitung." },
    { q: "[P2] Sel pengarang berisi “Rina Kartika, Andi Wibowo” melanggar aturan…", opts: ["Satu sel satu nilai", "Urutan kolom bebas", "Urutan baris bebas", "Kolom sejenis"], ans: 0, exp: "Aturan 1: satu sel hanya satu nilai." },
    { q: "[P2] Kolom tahun berisi 2019, 2021, “tahun lalu” melanggar aturan…", opts: ["Satu sel satu nilai", "Satu kolom sejenis", "Baris unik", "Urutan baris bebas"], ans: 1, exp: "Aturan 2: nilai satu kolom harus sejenis." },
    { q: "[P2] Mengapa judul tidak dipilih sebagai kunci primer tabel buku?", opts: ["Karena judul bertipe angka", "Karena dua buku bisa berjudul sama dan judul panjang/rawan salah ketik", "Karena judul selalu NULL", "Karena judul tidak bisa diurutkan"], ans: 1, exp: "Kunci primer harus unik, ringkas, dan stabil." },
    { q: "[P2] stok = NULL berarti…", opts: ["Stok habis (0)", "Stok belum diketahui/belum diisi", "Stok berisi spasi", "Stok tak terbatas"], ans: 1, exp: "NULL ≠ 0 ≠ spasi." },
    { q: "[P2] Tipe data paling tepat untuk nomor_hp adalah…", opts: ["INT", "VARCHAR(15)", "YEAR", "DATE"], ans: 1, exp: "Tidak dihitung, diawali 0, bisa memuat +." },
    { q: "[P2] Tipe data untuk id_buku yang selalu 5 karakter (BK001) adalah…", opts: ["CHAR(5)", "INT", "TEXT", "YEAR"], ans: 0, exp: "Panjang tetap → CHAR." },
    { q: "[P2] Mengisi kolom tahun dengan 'dua ribu' menghasilkan…", opts: ["ERROR 1062", "ERROR 1366", "ERROR 1048", "Berhasil"], ans: 1, exp: "1366 = nilai tidak sesuai tipe. 1062 = PK kembar, 1048 = kolom NOT NULL diisi NULL." },
    { q: "[P2] Tujuan basis data “Sharability” berarti…", opts: ["Data bisa dipakai banyak pemakai bersamaan", "Data dienkripsi", "Data selalu lengkap", "Data cepat dicari"], ans: 0, exp: "Kebersamaan pemakaian (multi-user)." },
    { q: "[P2] Komponen inti sistem basis data yang menjadi perantara pemakai dan data adalah…", opts: ["Hardware", "Sistem operasi", "DBMS", "Aplikasi lain"], ans: 2, exp: "Aplikasi lain bersifat opsional; DBMS intinya." },
    // ---- P3
    { q: "[P3] Dalam notasi Chen, relasi digambarkan dengan…", opts: ["Persegi panjang", "Elips", "Belah ketupat", "Lingkaran ganda"], ans: 2, exp: "Entitas = persegi panjang, atribut = elips, relasi = belah ketupat." },
    { q: "[P3] Nama entitas yang benar adalah…", opts: ["Buku-buku", "Buku", "Meminjam", "Data buku semua"], ans: 1, exp: "Kata benda tunggal." },
    { q: "[P3] Satu prodi memiliki banyak mahasiswa, satu mahasiswa di satu prodi. Kardinalitasnya…", opts: ["1 : 1", "1 : N", "M : N", "N : N"], ans: 1, exp: "Dua pertanyaan dari dua arah." },
    { q: "[P3] Satu buku dipinjam banyak anggota, satu anggota meminjam banyak buku. Kardinalitasnya…", opts: ["1 : 1", "1 : N", "N : 1", "M : N"], ans: 3, exp: "Banyak ke banyak." },
    { q: "[P3] Atribut tgl_pinjam pada ERD perpustakaan milik…", opts: ["Entitas Buku", "Entitas Anggota", "Relasi dipinjam", "Atribut judul"], ans: 2, exp: "Keterangan peristiwa peminjaman." },
    { q: "[P3] Langkah ketiga dari lima langkah menggambar ERD adalah…", opts: ["Cari kata benda", "Cari keterangan", "Cari kata kerja → relasi", "Tentukan kardinalitas"], ans: 2, exp: "Kata benda → keterangan → kata kerja → kunci → kardinalitas." },
    { q: "[P3] Atribut umur yang dihitung dari tanggal lahir disebut atribut…", opts: ["Komposit", "Multi-valued", "Turunan (derived)", "Key"], ans: 2, exp: "Elips putus-putus menurut slide gabungan." },
    { q: "[P3] Atribut no_telepon yang bisa berisi lebih dari satu nomor digambar dengan…", opts: ["Elips ganda", "Elips putus-putus", "Persegi panjang ganda", "Belah ketupat ganda"], ans: 0, exp: "Multi-valued = elips ganda." },
    { q: "[P3] Kumpulan atribut minimal yang dapat membedakan setiap baris disebut…", opts: ["Super key", "Candidate key", "Foreign key", "Atribut komposit"], ans: 1, exp: "Primary key dipilih dari candidate key." },
    { q: "[P3] Relasi “pegawai melapor kepada pegawai lain” berderajat…", opts: ["Unary", "Binary", "Ternary", "Quaternary"], ans: 0, exp: "Satu himpunan entitas dengan dirinya sendiri." },
    { q: "[P3] Kesalahan gambar: relasi dipinjam dihubungkan ke atribut judul. Perbaikannya…", opts: ["Ganti relasi menjadi elips", "Hubungkan relasi ke entitas Buku", "Hapus atribut judul", "Tambah kardinalitas M:N di judul"], ans: 1, exp: "Relasi selalu menghubungkan entitas." },
    // ---- P4
    { q: "[P4] Pada skema relasi, kunci tamu ditandai dengan…", opts: ["Garis bawah penuh", "Garis bawah titik-titik", "Huruf kapital", "Tanda kurung ganda"], ans: 1, exp: "PK garis bawah penuh, FK titik-titik." },
    { q: "[P4] Kolom yang isinya menunjuk kunci primer tabel lain disebut…", opts: ["Kunci kandidat", "Kunci tamu", "Atribut turunan", "Kunci super"], ans: 1, exp: "Foreign key." },
    { q: "[P4] Relasi 1:N antara Penerbit dan Buku diubah dengan cara…", opts: ["Menitipkan id_buku ke tabel penerbit", "Menitipkan id_penerbit ke tabel buku", "Membuat tabel penghubung", "Menggabungkan kedua tabel"], ans: 1, exp: "Kunci sisi satu dititipkan ke sisi banyak." },
    { q: "[P4] ERD perpustakaan (Buku–dipinjam–Anggota, M:N) menghasilkan berapa tabel?", opts: ["1", "2", "3", "4"], ans: 2, exp: "buku, anggota, peminjaman." },
    { q: "[P4] Mengapa relasi M:N tidak bisa diwujudkan hanya dengan dua tabel?", opts: ["Karena DBMS tidak mendukung", "Karena satu sel terpaksa menampung banyak nilai", "Karena tabel menjadi terlalu kecil", "Karena kunci primer akan NULL"], ans: 1, exp: "Melanggar aturan satu sel satu nilai." },
    { q: "[P4] Pada DESCRIBE peminjaman, id_buku bertanda MUL karena…", opts: ["Kolom itu kunci primer", "Nilainya boleh berulang", "Kolom itu boleh NULL", "Kolom itu bertipe teks"], ans: 1, exp: "Satu buku bisa dipinjam berkali-kali." },
    { q: "[P4] ERROR 1452 a foreign key constraint fails muncul ketika…", opts: ["Nilai kunci tamu tidak ada di tabel yang dirujuk", "Nilai kunci primer kembar", "Nama tabel salah", "Lupa titik koma"], ans: 0, exp: "Melanggar integritas rujukan, misalnya BK999." },
    { q: "[P4] Perintah untuk mengubah data yang sudah ada adalah…", opts: ["INSERT", "UPDATE", "ALTER", "COMMIT"], ans: 1, exp: "ALTER mengubah struktur (DDL), UPDATE mengubah isi (DML)." },
    { q: "[P4] GRANT dan REVOKE termasuk kelompok…", opts: ["DDL", "DML", "DCL", "TCL"], ans: 2, exp: "Data Control Language: hak akses." },
    { q: "[P4] Perintah UPDATE mahasiswa SET ipk = 3.70; (tanpa WHERE) akan…", opts: ["Ditolak DBMS", "Mengubah IPK seluruh mahasiswa", "Mengubah baris pertama saja", "Menghapus tabel"], ans: 1, exp: "Tanpa WHERE, semua baris kena." },
    { q: "[P4] Perintah untuk menampilkan tiga IPK tertinggi adalah…", opts: ["SELECT nama, ipk FROM mahasiswa ORDER BY ipk ASC LIMIT 3;", "SELECT nama, ipk FROM mahasiswa ORDER BY ipk DESC LIMIT 3;", "SELECT TOP ipk FROM mahasiswa;", "SELECT nama FROM mahasiswa WHERE ipk = 3;"], ans: 1, exp: "DESC besar ke kecil, LIMIT 3." },
    { q: "[P4] Perbedaan DELETE dan TRUNCATE yang benar adalah…", opts: ["DELETE menghapus struktur tabel", "TRUNCATE bisa memakai WHERE", "DELETE pada tabel transaksional bisa dibatalkan sebelum COMMIT, TRUNCATE tidak", "Keduanya termasuk DCL"], ans: 2, exp: "TRUNCATE mengosongkan semua tanpa kondisi dan tidak bisa di-ROLLBACK." },
    { q: "[P4] Penulisan nilai yang benar dalam INSERT adalah…", opts: ["Teks tanpa kutip, angka dengan kutip", "Teks dan tanggal dalam kutip tunggal, angka tanpa kutip", "Semua nilai dalam kutip ganda wajib", "Semua tanpa kutip"], ans: 1, exp: "'Sistem Informasi', '2026-10-01', 2023, 3.60." },
    { q: "[P4] Operator untuk mencocokkan pola teks adalah…", opts: ["IN", "BETWEEN", "LIKE", "IS NULL"], ans: 2, exp: "LIKE dengan % sebagai sembarang karakter." },
    { q: "[P4] ROLLBACK berfungsi…", opts: ["Menyimpan perubahan permanen", "Mengembalikan isi tabel ke kondisi COMMIT terakhir", "Menghapus tabel", "Mengurutkan data"], ans: 1, exp: "COMMIT menyimpan, ROLLBACK membatalkan." }
  ],
  ringkasan: `*RANGKUMAN BASIS DATA — PERTEMUAN 4 + CPMK 1*
🧩 *Dari ERD ke Tabel & SQL DML*

1️⃣ Skema relasi: buku(id_buku, judul, …). PK garis bawah penuh, FK garis bawah titik-titik.
2️⃣ Kunci tamu menunjuk PK tabel lain. Integritas rujukan: nilainya harus ada (ERROR 1452).
3️⃣ 4 aturan: entitas → tabel • 1:1 titip salah satu kunci • 1:N kunci sisi satu → sisi banyak • M:N → tabel penghubung (2 FK + atribut relasi).
4️⃣ Perpustakaan → buku, anggota, peminjaman(id_pinjam, id_buku*, id_anggota*, tgl_pinjam, tgl_kembali NULL).
5️⃣ DESCRIBE: PRI = PK, MUL = boleh berulang (FK).
6️⃣ SQL: DDL (CREATE/ALTER/DROP) • DML (INSERT/SELECT/UPDATE/DELETE) • DCL (GRANT/REVOKE) • TCL (COMMIT/ROLLBACK/SAVEPOINT).
7️⃣ WHERE: = <> > < BETWEEN IN LIKE 'A%' IS NULL AND OR NOT • ORDER BY ASC/DESC • DISTINCT • LIMIT.
8️⃣ UPDATE/DELETE tanpa WHERE = semua baris! DELETE (bisa rollback pada tabel transaksional sebelum COMMIT) vs TRUNCATE (tidak) vs DROP (hapus tabel).
📝 CPMK 1 = materi P1–P4.`
};
