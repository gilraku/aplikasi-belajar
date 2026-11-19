// Basis Data — Pertemuan 10: Query Dasar, SELECT dan WHERE (Bab 10 Bagian 1). Sumber: Modul Ajar Basis Data P10.
// Bagian bertanda ➕ bukan dari modul. Jumlah baris pada latihan dihitung oleh lab SQL (bd_uas_util.jalan).
const { SEED, lab, jalan } = require("./bd_uas_util.js");
const n = sql => String(jalan("lima", sql).rows.length);
const hitung = (sql, opts, ok) => ({ cells: [`<code>${sql.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`], fields: [{ options: opts, answer: n(sql) }], ok });

module.exports = {
  id: "p10",
  nomor: 10,
  judul: "Query Dasar: SELECT dan WHERE",
  ujian: "UAS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Tampilkan Data yang Diminta, Saring Baris yang Perlu",
    text: "Kuasai <strong>SELECT</strong> (semua kolom dengan <code>*</code> atau kolom tertentu), <strong>WHERE</strong> dengan <strong>enam operator perbandingan</strong>, penggabung <strong>AND, OR, NOT</strong>, dan <strong>urutan pengerjaan</strong> kueri: FROM → WHERE → SELECT. Bab 10 Bagian 1."
  },
  cheatsheet: [
    { type: "table", label: "Interaktif 1 • Bentuk Kueri", title: "SELECT … FROM … WHERE …", mono: true, headers: ["Kebutuhan", "Kueri"],
      rows: [
        ["Semua kolom, semua baris", "SELECT * FROM buku;"],
        ["Kolom tertentu", "SELECT judul, pengarang FROM buku;"],
        ["Satu baris lewat kunci primer", "SELECT * FROM buku WHERE id_buku = 'BK003';"],
        ["Syarat bilangan", "SELECT judul, stok FROM buku WHERE stok > 3;"],
        ["Syarat teks", "SELECT nama FROM anggota WHERE prodi = 'Sistem Informasi';"],
        ["Dua syarat sekaligus", "SELECT judul FROM buku WHERE tahun >= 2020 AND stok >= 3;"],
        ["Salah satu syarat", "SELECT judul FROM buku WHERE tahun = 2018 OR tahun = 2022;"],
        ["Membalik syarat", "SELECT judul FROM buku WHERE NOT stok > 2;"]
      ],
      modes: [
        { label: "* atau kolom?", target: "row", row: 1, title: "Sebut nama kolom lebih dianjurkan", text: "Hasil lebih ringkas dan tetap benar walau kelak ada kolom baru." },
        { label: "Kunci primer", target: "row", row: 2, title: "Paling banyak satu baris", text: "Syarat pada kunci primer selalu menghasilkan paling banyak satu baris." }
      ] },
    { type: "table", label: "Interaktif 2 • Operator", title: "Enam Operator Perbandingan", mono: true, headers: ["Operator", "Arti", "Contoh"],
      rows: [["=", "Sama dengan", "id_buku = 'BK003'"], ["<>", "Tidak sama dengan", "tahun <> 2019"], [">", "Lebih besar dari", "stok > 3"], ["<", "Lebih kecil dari", "stok < 3"], [">=", "Lebih besar atau sama dengan", "tahun >= 2020"], ["<=", "Lebih kecil atau sama dengan", "tahun <= 2020"]],
      modes: [{ label: "Dua yang sering keliru", target: "row", row: 0, title: "= dan kutip", text: "1. Tanda sama dengan hanya satu, bukan dua. 2. Nilai teks tetap diapit tanda kutip tunggal." }] },
    { type: "table", label: "Interaktif 3 • Penggabung", title: "AND, OR, NOT", headers: ["Kata", "Arti", "Efek pada jumlah baris"],
      rows: [["AND", "Kedua syarat harus terpenuhi sekaligus", "Mempersempit"], ["OR", "Salah satu syarat terpenuhi sudah cukup", "Memperluas"], ["NOT", "Membalik syarat yang mengikutinya", "Sisanya (yang tidak memenuhi)"]],
      modes: [{ label: "Urutan", target: "none", title: "AND lebih dulu daripada OR", text: "Bila syarat bercabang, beri tanda kurung: <code>WHERE (tahun = 2018 OR tahun = 2022) AND stok &gt; 5</code>." }] },
    { type: "callout", tone: "tip", heading: "Urutan pengerjaan: FROM → WHERE → SELECT", html: "SELECT ditulis paling depan tetapi dikerjakan paling akhir. Karena penyaringan selesai sebelum kolom dipilih, <strong>WHERE boleh memakai kolom yang tidak ikut ditampilkan</strong>." },
    { type: "table", label: "Interaktif 4 • Galat Kueri", title: "Enam Masalah Saat Menulis Kueri", mono: true, headers: ["Keadaan", "Penyebab"],
      rows: [["ERROR 1054 Unknown column 'judl' in 'SELECT'", "Nama kolom salah ketik → DESCRIBE buku;"], ["ERROR 1064 … near 'Basis Data'", "Teks tidak dikutip"], ["ERROR 1064 … near '= 2020'", "== (dua tanda sama dengan)"], ["ERROR 1146 Table 'perpustakaan.bukuu' doesn't exist", "Nama tabel salah ketik → SHOW TABLES;"], ["Hasil kosong padahal data ada", "Syarat terlalu sempit / ejaan tidak persis"], ["Semua baris keluar padahal disaring", "OR padahal maksudnya AND"]] }
  ],
  simulator: [
    lab({ profile: "bd-p10", label: "Lab phpMyAdmin • Praktik Terpandu Modul", title: "Menulis Kueri di Tab SQL",
      desc: "Basis data <code>perpustakaan</code> berisi <strong>lima buku</strong> dan <strong>tiga anggota</strong> hasil Bab 9. Muat contoh, jalankan, lalu catat jumlah baris hasilnya seperti diminta modul. Ubah nilainya untuk mencoba sendiri.",
      seed: SEED.lima,
      examples: [
        { label: "1 · Seluruh isi buku", sql: "SELECT * FROM buku;" },
        { label: "2 · Judul dan tahun", sql: "SELECT judul, tahun FROM buku;" },
        { label: "3 · Buku BK002 saja", sql: "SELECT * FROM buku WHERE id_buku = 'BK002';" },
        { label: "4 · Stok kurang dari 3", sql: "SELECT judul, stok FROM buku WHERE stok < 3;" },
        { label: "5 · Terbit sebelum 2020", sql: "SELECT judul, tahun FROM buku WHERE tahun < 2020;" },
        { label: "6 · 2020 ke atas, stok > 2", sql: "SELECT judul, tahun, stok FROM buku\nWHERE tahun >= 2020 AND stok > 2;" },
        { label: "7 · Andi atau Budi", sql: "SELECT judul, pengarang FROM buku\nWHERE pengarang = 'Andi Wibowo' OR pengarang = 'Budi Santoso';" },
        { label: "8 · Anggota prodi SI", sql: "SELECT nama FROM anggota WHERE prodi = 'Sistem Informasi';" },
        { label: "⚠ 9 · Coba ==", sql: "SELECT * FROM buku WHERE tahun == 2020;" },
        { label: "Huruf kecil tetap cocok", sql: "SELECT nama, prodi FROM anggota WHERE prodi = 'sistem informasi';" },
        { label: "Sebagian kata: kosong", sql: "SELECT nama FROM anggota WHERE prodi = 'Sistem Info';" },
        { label: "NOT", sql: "SELECT judul, stok FROM buku WHERE NOT stok > 2;" },
        { label: "Tanpa kurung vs kurung", sql: "SELECT judul FROM buku WHERE tahun = 2018 OR tahun = 2022 AND stok > 5;\nSELECT judul FROM buku WHERE (tahun = 2018 OR tahun = 2022) AND stok > 5;" },
        { label: "⚠ 1054 judl", sql: "SELECT judl, stok FROM buku;" },
        { label: "⚠ 1064 teks tanpa kutip", sql: "SELECT * FROM buku WHERE judul = Sistem Basis Data;" },
        { label: "⚠ 1146 bukuu", sql: "SELECT * FROM bukuu;" }
      ] }),
    { type: "exercise", label: "Permainan 1 • Hitung Barisnya", title: "Berapa Baris yang Keluar?", headers: ["Kueri (5 buku hasil Bab 9)", "Jumlah baris"],
      rows: [
        hitung("SELECT judul FROM buku WHERE stok = 1;", ["0", "1", "2", "3"], "✓ Hanya Statistika untuk Informatika."),
        hitung("SELECT judul FROM buku WHERE tahun >= 2021;", ["1", "2", "3", "4"], "✓ Sistem Basis Data (2021) dan Analisis Sistem Informasi (2022)."),
        hitung("SELECT judul FROM buku WHERE tahun <> 2018;", ["1", "3", "4", "5"], "✓ Semua kecuali Jaringan Komputer Dasar."),
        hitung("SELECT judul FROM buku WHERE tahun >= 2019 AND tahun <= 2021 AND stok > 2;", ["0", "1", "2", "3"], "✓ Dasar Pemrograman (2019, 4) dan Sistem Basis Data (2021, 3). Statistika (2020) stoknya 1."),
        hitung("SELECT judul FROM buku WHERE tahun >= 2020 OR stok >= 3;", ["2", "3", "4", "5"], "✓ OR memperluas: semua buku kecuali Jaringan Komputer Dasar (2018, stok 2). Inilah \"hasilnya jauh lebih banyak dari dugaan\" di Cek Pemahaman modul."),
        hitung("SELECT judul FROM buku WHERE NOT tahun = 2018;", ["1", "3", "4", "5"], "✓ Sama dengan tahun <> 2018."),
        hitung("SELECT nama FROM anggota WHERE status_aktif = 'Y';", ["1", "2", "3"], "✓ Ahmad Fauzi dan Nur Aisyah.")
      ] },
    { type: "exercise", label: "Permainan 2 • Latihan Tingkat 2 Modul", title: "Kueri Ini Salah di Mana?", headers: ["Kueri", "Kesalahannya"],
      rows: [
        { cells: ["<code>SELECT judl, stok FROM buku;</code>"], fields: [{ options: ["Nama kolom salah ketik (1054)", "Teks tanpa kutip (1064)", "== dua kali (1064)", "OR padahal AND"], answer: "Nama kolom salah ketik (1054)" }], ok: "✓ Betulkan: <code>SELECT judul, stok FROM buku;</code>" },
        { cells: ["<code>SELECT * FROM buku WHERE judul = Sistem Basis Data;</code>"], fields: [{ options: ["Nama kolom salah ketik (1054)", "Teks tanpa kutip (1064)", "== dua kali (1064)", "OR padahal AND"], answer: "Teks tanpa kutip (1064)" }], ok: "✓ <code>WHERE judul = 'Sistem Basis Data'</code>" },
        { cells: ["<code>SELECT * FROM buku WHERE tahun == 2020;</code>"], fields: [{ options: ["Nama kolom salah ketik (1054)", "Teks tanpa kutip (1064)", "== dua kali (1064)", "OR padahal AND"], answer: "== dua kali (1064)" }], ok: "✓ <code>WHERE tahun = 2020</code>" },
        { cells: ["<code>SELECT * FROM buku WHERE stok &gt; 3 dan tahun &gt; 2020;</code>"], fields: [{ options: ["Nama kolom salah ketik (1054)", "Penggabung harus AND, bukan dan (1064)", "== dua kali (1064)", "OR padahal AND"], answer: "Penggabung harus AND, bukan dan (1064)" }], ok: "✓ SQL tidak mengenal kata \"dan\". Tulis <code>WHERE stok &gt; 3 AND tahun &gt; 2020</code>." }
      ] },
    { type: "reveal", label: "Mini-Case Modul", title: "Enam Pertanyaan Petugas: Kunci Kuerinya", items: [
      { prompt: "1. Buku apa saja yang stoknya tinggal satu eksemplar?", answer: "SELECT judul FROM buku WHERE stok = 1;", reason: `${n("SELECT judul FROM buku WHERE stok = 1;")} baris: Statistika untuk Informatika.` },
      { prompt: "2. Buku apa saja yang terbit pada tahun 2021 atau sesudahnya?", answer: "SELECT judul, tahun FROM buku WHERE tahun >= 2021;", reason: `${n("SELECT judul FROM buku WHERE tahun >= 2021;")} baris. >= menyertakan 2021.` },
      { prompt: "3. Siapa pengarang buku bernomor BK005?", answer: "SELECT pengarang FROM buku WHERE id_buku = 'BK005';", reason: "1 baris (Dewi Anggraini). Syarat pada kunci primer: paling banyak satu baris." },
      { prompt: "4. Buku apa saja yang bukan terbitan tahun 2018?", answer: "SELECT judul FROM buku WHERE tahun <> 2018;", reason: `${n("SELECT judul FROM buku WHERE tahun <> 2018;")} baris. Bisa juga WHERE NOT tahun = 2018.` },
      { prompt: "5. Buku terbitan antara 2019 dan 2021 yang stoknya lebih dari dua (pakai AND, bukan BETWEEN)", answer: "SELECT judul FROM buku WHERE tahun >= 2019 AND tahun <= 2021 AND stok > 2;", reason: `${n("SELECT judul FROM buku WHERE tahun >= 2019 AND tahun <= 2021 AND stok > 2;")} baris. Statistika (2020) masuk rentang tetapi stoknya hanya 1.` },
      { prompt: "6. Anggota mana saja yang statusnya masih aktif?", answer: "SELECT nama FROM anggota WHERE status_aktif = 'Y';", reason: `${n("SELECT nama FROM anggota WHERE status_aktif = 'Y';")} baris. Nilai huruf tetap dikutip.` }
    ] }
  ],
  flashcards: [
    { tag: "P10", q: "Apa itu kueri?", a: "Permintaan data yang ditulis dalam bahasa SQL." },
    { tag: "P10", q: "Arti tanda bintang pada SELECT *?", a: "Semua kolom." },
    { tag: "P10", q: "SELECT * atau sebut nama kolom: mana yang dianjurkan modul?", a: "Menyebut nama kolom: hasil lebih ringkas dan tetap benar walau kelak ada kolom baru." },
    { tag: "P10", q: "Beda hasil SELECT * dan SELECT judul, stok pada tabel yang sama?", a: "Jumlah baris sama; yang berbeda jumlah kolomnya (semua vs dua)." },
    { tag: "P10", q: "Enam operator perbandingan?", a: "<code>=</code> <code>&lt;&gt;</code> <code>&gt;</code> <code>&lt;</code> <code>&gt;=</code> <code>&lt;=</code>" },
    { tag: "P10", q: "Dua hal yang sering keliru pada WHERE?", a: "1) Tanda sama dengan hanya satu (bukan ==). 2) Nilai teks tetap diapit kutip tunggal." },
    { tag: "P10", q: "Mengapa 'sistem informasi' (huruf kecil) tetap cocok dengan 'Sistem Informasi'?", a: "Penyortiran (collation) bawaan MySQL berakhiran _ci (case insensitive), jadi huruf besar dan kecil tidak dibedakan." },
    { tag: "P10", q: "AND, OR, NOT?", a: "AND: kedua syarat terpenuhi. OR: salah satu cukup. NOT: membalik syarat." },
    { tag: "P10", q: "Mana yang dikerjakan lebih dulu, AND atau OR?", a: "AND. Bila bercabang, beri tanda kurung." },
    { tag: "P10", q: "Urutan pengerjaan kueri?", a: "FROM → WHERE → SELECT. SELECT ditulis pertama tetapi dikerjakan terakhir." },
    { tag: "P10", q: "Mengapa WHERE boleh memakai kolom yang tidak ditampilkan?", a: "Penyaringan (WHERE) selesai sebelum kolom dipilih (SELECT)." },
    { tag: "P10", q: "WHERE tahun >= 2020 OR stok >= 3 hasilnya jauh lebih banyak dari dugaan. Kemungkinan penyebab?", a: "Memakai OR padahal yang dimaksud AND." }
  ],
  quiz: [
    { q: "Menurut modul, kueri adalah …", opts: ["Permintaan data yang ditulis dalam bahasa SQL", "Tabel sementara", "Kumpulan basis data", "Kunci primer tabel"], ans: 0, exp: "Definisi kata kunci modul.", optExp: ["Benar.", "Bukan.", "Bukan.", "Bukan."] },
    { q: "Tanda bintang pada SELECT * FROM buku berarti …", opts: ["Semua kolom", "Semua tabel", "Semua basis data", "Baris pertama saja"], ans: 0, exp: "* = semua kolom.", optExp: ["Benar.", "FROM hanya menyebut satu tabel.", "Bukan.", "Semua baris tetap keluar."] },
    { q: "Modul lebih menganjurkan menyebut nama kolom daripada tanda bintang karena …", opts: ["Hasil lebih ringkas dan tetap benar walau kelak ada kolom baru", "Tanda bintang menimbulkan galat", "Tanda bintang hanya menampilkan satu baris", "Nama kolom membuat data terurut"], ans: 0, exp: "Lihat 5.1.", optExp: ["Benar.", "Tidak menimbulkan galat.", "Semua baris keluar.", "Urutan diatur ORDER BY (P11)."] },
    { q: "SELECT judul, pengarang FROM buku; pada tabel lima buku menghasilkan …", opts: ["Lima baris, dua kolom", "Dua baris, lima kolom", "Satu baris", "Lima baris, lima kolom"], ans: 0, exp: "Tanpa WHERE semua baris keluar; kolomnya hanya dua.", optExp: ["Benar.", "Terbalik.", "Tidak ada penyaringan.", "Kolomnya hanya yang disebut."] },
    { q: "Mengapa SELECT * FROM buku WHERE id_buku = 'BK003'; selalu menghasilkan paling banyak satu baris?", opts: ["id_buku adalah kunci primer", "WHERE hanya mengambil satu baris", "Tabel hanya punya satu baris BK", "Tanda bintang membatasi baris"], ans: 0, exp: "Kunci primer bernilai unik.", optExp: ["Benar.", "WHERE bisa meloloskan banyak baris.", "Tabel berisi lima buku.", "* menyangkut kolom."] },
    { q: "Operator yang berarti \"tidak sama dengan\" pada contoh modul adalah …", opts: ["<>", "=<", "><", "=="], ans: 0, exp: "tahun <> 2019.", optExp: ["Benar.", "Bukan operator SQL.", "Bukan operator SQL.", "Bukan operator SQL; == menimbulkan 1064."] },
    { q: "SELECT judul, stok FROM buku WHERE stok > 3; pada data modul menghasilkan … baris.", opts: ["2", "3", "4", "5"], ans: 0, exp: "Dasar Pemrograman Komputer (4) dan Analisis Sistem Informasi (6).", optExp: ["Benar.", "Sistem Basis Data stoknya tepat 3, tidak > 3.", "Kurang tepat.", "Kurang tepat."] },
    { q: "Dua hal yang sering keliru saat menulis WHERE menurut modul adalah …", opts: ["Tanda sama dengan ditulis dua, dan nilai teks tidak dikutip", "Menulis FROM dan SELECT", "Memakai huruf kecil dan spasi", "Memakai AND dan OR"], ans: 0, exp: "1) Satu tanda sama dengan. 2) Teks dalam kutip tunggal.", optExp: ["Benar.", "Bukan.", "Bukan.", "Bukan."] },
    { q: "WHERE prodi = 'sistem informasi' (huruf kecil) tetap menemukan anggota prodi 'Sistem Informasi' karena …", opts: ["Penyortiran bawaan berakhiran _ci (case insensitive)", "MySQL mengubah data menjadi huruf kecil", "Tanda = mencari sebagian kata", "Kolom prodi bertipe bilangan"], ans: 0, exp: "Perilaku ini dapat berbeda bila penyortiran basis datanya diubah.", optExp: ["Benar.", "Data tidak diubah.", "= menuntut kecocokan penuh.", "prodi bertipe teks."] },
    { q: "WHERE prodi = 'Sistem Info' menghasilkan …", opts: ["Tidak ada baris (Empty set)", "Dua anggota prodi Sistem Informasi", "ERROR 1064", "Semua anggota"], ans: 0, exp: "Tanda = menuntut kecocokan seluruh isi kolom. Pencarian sebagian kata dibahas di Bagian 2 (LIKE).", optExp: ["Benar.", "Tidak persis sama.", "Sintaksnya benar.", "Bukan."] },
    { q: "Kata AND pada WHERE berarti …", opts: ["Kedua syarat harus terpenuhi", "Salah satu syarat cukup", "Membalik syarat", "Mengurutkan hasil"], ans: 0, exp: "AND mempersempit.", optExp: ["Benar.", "Itu OR.", "Itu NOT.", "Itu ORDER BY."] },
    { q: "WHERE tahun >= 2020 AND stok >= 3 pada lima buku menghasilkan 2 baris. Statistika untuk Informatika (2020) tidak ikut karena …", opts: ["Stoknya hanya satu", "Tahunnya bukan 2020", "Judulnya terlalu panjang", "Bukan kunci primer"], ans: 0, exp: "Hanya memenuhi syarat pertama; AND menuntut keduanya.", optExp: ["Benar.", "Tahunnya 2020, memenuhi syarat pertama.", "Tidak berhubungan.", "Tidak berhubungan."] },
    { q: "SELECT judul FROM buku WHERE NOT stok > 2; hasilnya sama dengan …", opts: ["WHERE stok <= 2", "WHERE stok < 2", "WHERE stok >= 2", "WHERE stok <> 2"], ans: 0, exp: "Kebalikan dari \"lebih dari 2\" adalah \"tidak lebih dari 2\" = <= 2.", optExp: ["Benar.", "Stok 2 tidak ikut.", "Salah arah.", "Bukan kebalikannya."] },
    { q: "Mana yang dikerjakan lebih dulu oleh DBMS?", opts: ["AND sebelum OR", "OR sebelum AND", "Keduanya bersamaan dari kanan", "Yang ditulis paling akhir"], ans: 0, exp: "Beri kurung bila syarat bercabang.", optExp: ["Benar.", "Terbalik.", "Bukan.", "Bukan."] },
    { q: "Urutan pengerjaan kueri SELECT … FROM … WHERE … menurut modul adalah …", opts: ["FROM, WHERE, SELECT", "SELECT, FROM, WHERE", "WHERE, FROM, SELECT", "SELECT, WHERE, FROM"], ans: 0, exp: "SELECT ditulis paling depan, dikerjakan paling akhir.", optExp: ["Benar.", "Itu urutan penulisan.", "FROM dulu.", "Bukan."] },
    { q: "Mengapa WHERE boleh memakai kolom yang tidak ikut ditampilkan pada SELECT?", opts: ["Karena penyaringan selesai sebelum kolom dipilih", "Karena WHERE dikerjakan setelah SELECT", "Karena semua kolom selalu ditampilkan", "Karena kolom itu kunci primer"], ans: 0, exp: "FROM → WHERE → SELECT.", optExp: ["Benar.", "Terbalik.", "Tidak.", "Tidak harus kunci primer."] },
    { q: "Pesan ERROR 1054 Unknown column 'judl' in 'SELECT' menandakan …", opts: ["Nama kolom salah ketik di SELECT", "Nama tabel salah ketik", "Teks tidak dikutip", "Tanda sama dengan dua kali"], ans: 0, exp: "Periksa ejaan dengan DESCRIBE buku;.", optExp: ["Benar.", "Itu 1146.", "Itu 1064 near 'Basis Data'.", "Itu 1064 near '= 2020'."] },
    { q: "WHERE judul = Sistem Basis Data; menghasilkan …", opts: ["ERROR 1064 near 'Basis Data'", "ERROR 1146", "Satu baris", "Empty set"], ans: 0, exp: "Nilai teks tidak diapit kutip tunggal.", optExp: ["Benar.", "Itu tabel tidak ada.", "Ditolak.", "Ditolak, bukan kosong."] },
    { q: "Pesan ERROR 1146 Table 'perpustakaan.bukuu' doesn't exist diperbaiki dengan …", opts: ["Memeriksa daftar tabel dengan SHOW TABLES;", "Memeriksa ejaan kolom dengan DESCRIBE", "Menambahkan kutip tunggal", "Mengganti OR dengan AND"], ans: 0, exp: "Nama tabel salah ketik.", optExp: ["Benar.", "Itu untuk 1054.", "Itu untuk 1064.", "Itu untuk hasil yang terlalu banyak."] },
    { q: "Kueri WHERE tahun >= 2020 OR stok >= 3 hasilnya jauh lebih banyak dari dugaan. Kemungkinan penyebabnya …", opts: ["Memakai OR padahal yang dimaksud AND", "Kolom tahun salah ketik", "Tabel kosong", "Kurang tanda bintang"], ans: 0, exp: "OR memperluas hasil.", optExp: ["Benar.", "Salah ketik menimbulkan 1054.", "Tabel kosong menghasilkan Empty set.", "Tidak berhubungan."] },
    { q: "Hasil kosong padahal datanya ada. Menurut modul, langkah perbaikannya …", opts: ["Longgarkan syarat; periksa isi kolom tanpa WHERE", "Hapus tabel lalu buat ulang", "Ganti = dengan ==", "Tambahkan ORDER BY"], ans: 0, exp: "Bisa karena syarat terlalu sempit atau ejaan nilai tidak persis.", optExp: ["Benar.", "Berbahaya dan tidak perlu.", "== justru galat.", "Tidak memengaruhi jumlah baris."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS BASIS DATA — PERTEMUAN 10*
🔎 *Query Dasar: SELECT dan WHERE (Bab 10 Bagian 1)*

1️⃣ *Kueri* = permintaan data dalam SQL. SELECT: kolom apa. FROM: dari tabel mana.

2️⃣ *SELECT ** = semua kolom. Sebut nama kolom lebih dianjurkan (ringkas, tahan kolom baru).

3️⃣ *WHERE* menyaring baris. 6 operator: = <> > < >= <=. Satu tanda =, bukan ==. Teks 'kutip tunggal'; bilangan tanpa kutip.

4️⃣ Teks: = menuntut kecocokan penuh. Huruf besar/kecil tidak dibedakan (collation _ci). 'Sistem Info' tidak cocok → LIKE di P11.

5️⃣ *AND* keduanya • *OR* salah satu • *NOT* membalik. AND dikerjakan sebelum OR → pakai kurung.

6️⃣ *Urutan pengerjaan:* FROM → WHERE → SELECT. WHERE boleh memakai kolom yang tidak ditampilkan.

7️⃣ *Galat:* 1054 kolom salah ketik ('judl' in 'SELECT') • 1064 teks tanpa kutip / == • 1146 tabel salah ketik. Tanpa galat: hasil kosong (syarat sempit) • terlalu banyak (OR padahal AND).`
};
