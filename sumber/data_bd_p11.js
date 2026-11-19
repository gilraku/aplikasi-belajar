// Basis Data — Pertemuan 11: Query Dasar, Mengurutkan dan Mencari (Bab 10 Bagian 2). Sumber: Modul Ajar Basis Data P11.
// Bagian bertanda ➕ bukan dari modul. Jumlah baris pada latihan dihitung oleh lab SQL (bd_uas_util.jalan).
const { SEED, lab, jalan } = require("./bd_uas_util.js");
const n = sql => String(jalan("lima", sql).rows.length);
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

module.exports = {
  id: "p11",
  nomor: 11,
  judul: "Query Dasar: Mengurutkan dan Mencari",
  ujian: "UAS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Urutkan, Batasi, Buang Kembaran, Cari Sebagian Kata",
    text: "Kuasai <strong>ORDER BY</strong> (ASC bawaan, DESC), <strong>LIMIT</strong> yang selalu dipasangkan dengan ORDER BY, <strong>DISTINCT</strong>, pola <strong>LIKE</strong> dengan <code>%</code> dan <code>_</code>, <strong>BETWEEN</strong>, <strong>IN</strong>, nama lain <strong>AS</strong>, dan urutan penulisan klausa. Bab 10 Bagian 2."
  },
  cheatsheet: [
    { type: "table", label: "Interaktif 1 • Klausa Bab 10 Bagian 2", title: "Bentuk dan Contoh", mono: true, headers: ["Klausa", "Contoh", "Arti"],
      rows: [
        ["ORDER BY … DESC", "ORDER BY stok DESC", "Stok terbanyak dulu"],
        ["ORDER BY … (ASC)", "ORDER BY judul", "Menaik, abjad A ke Z (bawaan)"],
        ["ORDER BY dua kolom", "ORDER BY tahun DESC, judul", "Kolom kedua dipakai bila kolom pertama sama"],
        ["LIMIT", "ORDER BY stok DESC LIMIT 3", "Tiga baris teratas"],
        ["DISTINCT", "SELECT DISTINCT prodi FROM anggota", "Buang nilai kembar"],
        ["LIKE", "WHERE judul LIKE '%Sistem%'", "Memuat kata Sistem di mana pun"],
        ["BETWEEN", "WHERE tahun BETWEEN 2019 AND 2021", "2019 s.d. 2021, kedua batas ikut"],
        ["IN", "WHERE tahun IN (2018, 2022)", "= 2018 OR = 2022"],
        ["AS", "SELECT judul AS nama_buku", "Nama lain di hasil saja"]
      ],
      modes: [
        { label: "LIMIT + ORDER BY", target: "row", row: 3, title: "Hampir selalu berpasangan", text: "Tanpa ORDER BY, yang keluar hanya baris yang kebetulan tersimpan di depan, dan itu tidak berarti apa-apa." },
        { label: "DISTINCT", target: "row", row: 4, title: "Gabungan kolom", text: "Ditulis tepat sesudah SELECT, berlaku untuk gabungan semua kolom yang disebut. <code>SELECT DISTINCT nama, prodi</code> tetap 3 baris." },
        { label: "AS", target: "row", row: 8, title: "Nama kolom di tabel tetap", text: "Hanya label di hasil yang berubah. Periksa dengan DESCRIBE buku;" }
      ] },
    { type: "table", label: "Interaktif 2 • Pola LIKE", title: "% dan _", mono: true, headers: ["Pola", "Cocok dengan"],
      rows: [["'%Sistem%'", "Memuat Sistem di bagian mana pun (kotak pencarian)"], ["'Sistem%'", "Diawali Sistem"], ["'%Data'", "Diakhiri Data"], ["'S%'", "Diawali huruf S"], ["'BK00_'", "BK00 + tepat satu huruf (BK001–BK009)"], ["'Sistem'", "Persis \"Sistem\" saja (biasanya kosong)"]],
      modes: [{ label: "% vs _", target: "col", col: 0, title: "Berapa pun vs tepat satu", text: "<code>%</code> = berapa pun jumlah huruf (boleh nol). <code>_</code> = tepat satu huruf." }] },
    { type: "table", label: "Interaktif 3 • Bentuk Setara", title: "BETWEEN dan IN = AND dan OR", mono: true, headers: ["Bentuk pendek", "Bentuk panjang"],
      rows: [["tahun BETWEEN 2019 AND 2021", "tahun >= 2019 AND tahun <= 2021"], ["stok BETWEEN 2 AND 4", "stok >= 2 AND stok <= 4"], ["tahun IN (2018, 2022)", "tahun = 2018 OR tahun = 2022"]] },
    { type: "callout", tone: "warn", heading: "Urutan penulisan: SELECT → FROM → WHERE → ORDER BY → LIMIT", html: "Klausa boleh tidak ditulis, tetapi yang ditulis wajib mengikuti urutan. ORDER BY sebelum WHERE → <strong>ERROR 1064</strong>. LIMIT -3 → ERROR 1064 (LIMIT hanya menerima nol atau lebih)." },
    { type: "table", label: "Interaktif 4 • Kekeliruan", title: "Enam Kekeliruan Saat Mengurutkan dan Mencari", mono: true, headers: ["Keadaan", "Penyebab"],
      rows: [["ERROR 1054 Unknown column 'tahun_terbit' in 'ORDER BY'", "Kolom di ORDER BY salah ketik"], ["ERROR 1064 (ORDER BY sebelum WHERE)", "Urutan klausa salah"], ["ERROR 1064 near '-3'", "LIMIT negatif"], ["LIKE tidak menemukan apa pun", "Pola tanpa %"], ["Yang keluar hanya yang kebetulan tersimpan", "LIMIT tanpa ORDER BY"], ["DISTINCT tidak mengurangi baris", "Berlaku untuk gabungan semua kolom"]] }
  ],
  simulator: [
    lab({ profile: "bd-p11", label: "Lab phpMyAdmin • Praktik Terpandu Modul", title: "Mengurutkan, Membatasi, dan Mencari",
      desc: "Data masih <strong>lima buku</strong> dan <strong>tiga anggota</strong>. Contoh 1–10 mengikuti praktik terpandu modul; contoh 10 sengaja salah.",
      seed: SEED.lima,
      examples: [
        { label: "1 · Terbaru dulu", sql: "SELECT judul, tahun FROM buku\nORDER BY tahun DESC;" },
        { label: "2 · Abjad pengarang", sql: "SELECT judul, pengarang FROM buku\nORDER BY pengarang;" },
        { label: "3 · Dua stok tersedikit", sql: "SELECT judul, stok FROM buku\nORDER BY stok ASC\nLIMIT 2;" },
        { label: "4 · Daftar prodi", sql: "SELECT DISTINCT prodi FROM anggota;" },
        { label: "5 · Judul memuat Komputer", sql: "SELECT judul FROM buku\nWHERE judul LIKE '%Komputer%';" },
        { label: "6 · Diawali huruf S", sql: "SELECT judul FROM buku WHERE judul LIKE 'S%';\nSELECT judul FROM buku WHERE judul LIKE '%S%';" },
        { label: "7 · 2019–2021", sql: "SELECT judul, tahun FROM buku WHERE tahun BETWEEN 2019 AND 2021;\nSELECT judul, tahun FROM buku WHERE tahun >= 2019 AND tahun <= 2021;" },
        { label: "8 · 2018 atau 2022", sql: "SELECT judul, tahun FROM buku WHERE tahun IN (2018, 2022);\nSELECT judul, tahun FROM buku WHERE tahun = 2018 OR tahun = 2022;" },
        { label: "9 · WHERE + ORDER BY + LIMIT", sql: "SELECT judul, tahun, stok\nFROM buku\nWHERE tahun >= 2019\nORDER BY tahun DESC\nLIMIT 3;" },
        { label: "⚠ 10 · ORDER BY sebelum WHERE", sql: "SELECT judul, tahun FROM buku\nORDER BY tahun\nWHERE stok > 2;" },
        { label: "LIKE tanpa %", sql: "SELECT judul FROM buku WHERE judul LIKE 'Sistem';" },
        { label: "Garis bawah _", sql: "SELECT id_buku, judul FROM buku WHERE id_buku LIKE 'BK00_';" },
        { label: "AS", sql: "SELECT judul AS nama_buku, stok AS sisa\nFROM buku WHERE stok < 3;\nDESCRIBE buku;" },
        { label: "DISTINCT dua kolom", sql: "SELECT DISTINCT nama, prodi FROM anggota;" },
        { label: "⚠ LIMIT -3", sql: "SELECT judul FROM buku LIMIT -3;" },
        { label: "⚠ kolom tahun_terbit", sql: "SELECT judul FROM buku ORDER BY tahun_terbit;" }
      ] }),
    { type: "exercise", label: "Permainan 1 • Latihan Tingkat 2 Modul", title: "Berjalan, tetapi Hasilnya Bukan yang Dimaksud?", headers: ["Kueri", "Masalahnya"],
      rows: [
        { cells: ["<code>SELECT judul FROM buku ORDER BY tahun_terbit;</code>"], fields: [{ options: ["ERROR 1054: kolom salah ketik", "Pola LIKE tanpa %", "LIMIT tanpa ORDER BY", "DISTINCT pada dua kolom", "Urutan klausa salah"], answer: "ERROR 1054: kolom salah ketik" }], ok: "✓ Kolomnya bernama tahun: <code>ORDER BY tahun</code>." },
        { cells: ["<code>SELECT judul FROM buku WHERE judul LIKE 'Sistem';</code>"], fields: [{ options: ["ERROR 1054: kolom salah ketik", "Pola LIKE tanpa %", "LIMIT tanpa ORDER BY", "DISTINCT pada dua kolom", "Urutan klausa salah"], answer: "Pola LIKE tanpa %" }], ok: "✓ Empty set. Tulis <code>'%Sistem%'</code>." },
        { cells: ["<code>SELECT judul FROM buku ORDER BY stok DESC WHERE stok &gt; 2;</code>"], fields: [{ options: ["ERROR 1054: kolom salah ketik", "Pola LIKE tanpa %", "LIMIT tanpa ORDER BY", "DISTINCT pada dua kolom", "Urutan klausa salah"], answer: "Urutan klausa salah" }], ok: "✓ ERROR 1064. WHERE harus sebelum ORDER BY." },
        { cells: ["<code>SELECT judul FROM buku LIMIT 3;</code> (maksudnya tiga buku terbaru)"], fields: [{ options: ["ERROR 1054: kolom salah ketik", "Pola LIKE tanpa %", "LIMIT tanpa ORDER BY", "DISTINCT pada dua kolom", "Urutan klausa salah"], answer: "LIMIT tanpa ORDER BY" }], ok: "✓ Yang keluar hanya tiga yang kebetulan tersimpan di depan. Tambahkan <code>ORDER BY tahun DESC</code>." },
        { cells: ["<code>SELECT DISTINCT nama, prodi FROM anggota;</code> (maksudnya daftar prodi)"], fields: [{ options: ["ERROR 1054: kolom salah ketik", "Pola LIKE tanpa %", "LIMIT tanpa ORDER BY", "DISTINCT pada dua kolom", "Urutan klausa salah"], answer: "DISTINCT pada dua kolom" }], ok: "✓ Tetap tiga baris, sebab pasangan nama + prodi tidak ada yang kembar. Sebut prodi saja." }
      ] },
    { type: "exercise", label: "Permainan 2 • Hitung Barisnya", title: "Berapa Baris yang Keluar?", headers: ["Kueri (5 buku)", "Jumlah baris"],
      rows: [
        ["SELECT judul FROM buku WHERE judul LIKE '%Komputer%';", ["1", "2", "3"], "Dasar Pemrograman Komputer dan Jaringan Komputer Dasar."],
        ["SELECT judul FROM buku WHERE judul LIKE '%Informa%';", ["1", "2", "3"], "Analisis Sistem Informasi dan Statistika untuk Informatika: keduanya memuat Informa."],
        ["SELECT judul FROM buku WHERE stok BETWEEN 2 AND 4;", ["2", "3", "4"], "Stok 4, 3, 2: kedua batas ikut."],
        ["SELECT DISTINCT tahun FROM buku;", ["3", "4", "5"], "Lima tahun berbeda: 2018–2022. Tidak ada yang kembar."],
        ["SELECT judul FROM buku ORDER BY stok DESC LIMIT 1;", ["1", "3", "5"], "Satu buku dengan stok terbanyak: Analisis Sistem Informasi."],
        ["SELECT judul FROM buku WHERE tahun IN (2019, 2020, 2025);", ["1", "2", "3"], "2025 tidak ada; 2019 dan 2020 masing-masing satu."]
      ].map(([sql, opts, ok]) => ({ cells: [`<code>${esc(sql)}</code>`], fields: [{ options: opts, answer: n(sql) }], ok: "✓ " + ok })) },
    { type: "reveal", label: "Mini-Case Modul", title: "Laporan Akhir Semester: Kunci Kuerinya", items: [
      { prompt: "1. Seluruh buku, diurutkan dari stok terbanyak", answer: "SELECT * FROM buku ORDER BY stok DESC;", reason: "Lima baris; hanya urutannya yang berubah." },
      { prompt: "2. Tiga buku tertua", answer: "SELECT judul, tahun FROM buku ORDER BY tahun ASC LIMIT 3;", reason: "ASC = tahun terkecil (tertua) dulu, lalu dipotong tiga." },
      { prompt: "3. Buku yang judulnya memuat kata Informatika atau Informasi", answer: "SELECT judul FROM buku WHERE judul LIKE '%Informatika%' OR judul LIKE '%Informasi%';", reason: "Persen di kedua ujung karena kata itu bisa di tengah atau di akhir judul. Bisa juga satu pola '%Informa%'." },
      { prompt: "4. Program studi asal anggota, tanpa pengulangan", answer: "SELECT DISTINCT prodi FROM anggota;", reason: "Dua baris." },
      { prompt: "5. Buku terbitan lima tahun terakhir, dari yang terbaru, dengan judul kolom berbahasa Indonesia", answer: "SELECT judul AS 'Judul Buku', tahun AS 'Tahun Terbit' FROM buku WHERE tahun >= 2022 ORDER BY tahun DESC;", reason: "Lima tahun terakhir dari 2026 = 2022–2026. Nama lain berspasi diapit kutip." },
      { prompt: "6. Dua anggota yang paling awal mendaftar", answer: "SELECT nama, tgl_daftar FROM anggota ORDER BY tgl_daftar ASC LIMIT 2;", reason: "Ahmad Fauzi (12 September) dan Nur Aisyah (14 September). Tanggal juga bisa diurutkan." }
    ] }
  ],
  flashcards: [
    { tag: "P11", q: "Mengapa urutan hasil harus diminta dengan ORDER BY?", a: "Aturan keempat Bab 2: urutan baris di dalam tabel tidak berarti apa-apa. Tanpa ORDER BY, urutan tidak dijamin." },
    { tag: "P11", q: "ASC dan DESC?", a: "ASC menaik (kecil ke besar), urutan bawaan bila tidak ditulis. DESC menurun (besar ke kecil)." },
    { tag: "P11", q: "ORDER BY dua kolom: kapan kolom kedua dipakai?", a: "Hanya bila nilai kolom pertama sama." },
    { tag: "P11", q: "Mengapa LIMIT sebaiknya selalu dipakai bersama ORDER BY?", a: "Tanpa ORDER BY, yang keluar hanya baris pertama menurut urutan penyimpanan, dan itu tidak berarti apa-apa." },
    { tag: "P11", q: "Di mana DISTINCT ditulis dan berlaku untuk apa?", a: "Tepat sesudah SELECT; berlaku untuk gabungan seluruh kolom yang disebut sesudahnya." },
    { tag: "P11", q: "SELECT DISTINCT nama, prodi FROM anggota; tetap 3 baris. Mengapa?", a: "DISTINCT berlaku untuk gabungan nama+prodi, dan tidak ada pasangan yang kembar." },
    { tag: "P11", q: "Lambang % dan _ pada LIKE?", a: "<code>%</code> = berapa pun jumlah huruf. <code>_</code> = tepat satu huruf." },
    { tag: "P11", q: "Beda LIKE 'Sistem' dan LIKE '%Sistem%'?", a: "Tanpa persen menuntut isi kolom persis \"Sistem\" (biasanya Empty set). Dengan persen: memuat Sistem di bagian mana pun." },
    { tag: "P11", q: "Bentuk panjang WHERE stok BETWEEN 2 AND 4?", a: "<code>WHERE stok &gt;= 2 AND stok &lt;= 4</code>. BETWEEN mencakup kedua batas." },
    { tag: "P11", q: "IN (2018, 2022) setara dengan?", a: "<code>tahun = 2018 OR tahun = 2022</code>." },
    { tag: "P11", q: "Apa yang diubah AS?", a: "Hanya nama kolom di tampilan hasil. Nama kolom di tabel tidak berubah." },
    { tag: "P11", q: "Urutan penulisan klausa?", a: "SELECT, FROM, WHERE, ORDER BY, LIMIT. ORDER BY sebelum WHERE → ERROR 1064." }
  ],
  quiz: [
    { q: "Menurut modul, mengapa urutan tampilan harus diminta secara khusus dengan ORDER BY?", opts: ["Karena urutan baris di dalam tabel tidak berarti apa-apa (aturan keempat Bab 2)", "Karena tabel selalu terurut terbalik", "Karena SELECT menghapus urutan", "Karena kunci primer mengacak baris"], ans: 0, exp: "Tanpa ORDER BY, urutan tidak dijamin.", optExp: ["Benar.", "Tidak ada urutan tetap.", "SELECT tidak menghapus apa pun.", "Bukan."] },
    { q: "Urutan bawaan ORDER BY bila tidak ditulis ASC atau DESC adalah …", opts: ["ASC (menaik)", "DESC (menurun)", "Acak", "Urutan kunci primer"], ans: 0, exp: "ASC boleh dihilangkan.", optExp: ["Benar.", "DESC harus ditulis.", "Bukan.", "Bukan."] },
    { q: "SELECT judul, stok FROM buku ORDER BY stok DESC; menghasilkan …", opts: ["Kelima baris, dari stok terbanyak ke paling sedikit", "Hanya buku dengan stok terbanyak", "Kelima baris dari stok tersedikit", "Hanya tiga baris"], ans: 0, exp: "ORDER BY tidak mengurangi baris; hanya urutannya berubah.", optExp: ["Benar.", "Itu perlu LIMIT 1.", "Itu ASC.", "Tidak ada LIMIT."] },
    { q: "Pada ORDER BY tahun DESC, judul, kolom judul dipakai …", opts: ["Hanya bila nilai tahun sama", "Lebih dulu daripada tahun", "Untuk menyaring baris", "Tidak dipakai sama sekali"], ans: 0, exp: "Kolom kedua = pemutus seri.", optExp: ["Benar.", "Tahun lebih dulu.", "ORDER BY tidak menyaring.", "Dipakai saat seri."] },
    { q: "Mengapa LIMIT hampir selalu dipasangkan dengan ORDER BY?", opts: ["Tanpa ORDER BY, yang keluar hanya baris pertama menurut urutan penyimpanan yang tidak berarti apa-apa", "LIMIT tidak bisa berjalan tanpa ORDER BY", "ORDER BY mempercepat LIMIT", "Supaya tidak ada galat 1064"], ans: 0, exp: "Contoh: tiga buku dengan stok terbanyak = ORDER BY stok DESC LIMIT 3.", optExp: ["Benar.", "LIMIT tetap berjalan, tetapi hasilnya tidak bermakna.", "Bukan alasannya.", "Tanpa ORDER BY tidak galat."] },
    { q: "LIMIT -3 menghasilkan …", opts: ["ERROR 1064", "Tiga baris terakhir", "Tiga baris pertama", "Semua baris"], ans: 0, exp: "LIMIT hanya menerima nol atau lebih.", optExp: ["Benar.", "Tidak ada fitur itu.", "Itu LIMIT 3.", "Bukan."] },
    { q: "SELECT DISTINCT prodi FROM anggota; pada tiga anggota menghasilkan dua baris karena …", opts: ["Sistem Informasi dimiliki dua anggota dan ditampilkan sekali saja", "Satu anggota tidak aktif", "DISTINCT selalu membuang satu baris", "Prodi Teknik Informatika kosong"], ans: 0, exp: "DISTINCT membuang nilai kembar.", optExp: ["Benar.", "Status tidak berhubungan.", "Tidak.", "Tidak kosong."] },
    { q: "SELECT DISTINCT nama, prodi FROM anggota; tetap menghasilkan tiga baris. Mengapa?", opts: ["DISTINCT berlaku untuk gabungan semua kolom yang disebut, dan gabungan nama+prodi tidak ada yang kembar", "DISTINCT hanya berlaku untuk kolom terakhir", "DISTINCT tidak bekerja pada teks", "Karena tidak ada ORDER BY"], ans: 0, exp: "Sebut hanya kolom yang kembarannya ingin dibuang.", optExp: ["Benar.", "Berlaku untuk gabungan.", "Bekerja pada teks.", "Tidak berhubungan."] },
    { q: "Pada pola LIKE, tanda % berarti …", opts: ["Berapa pun jumlah huruf", "Tepat satu huruf", "Huruf besar", "Angka"], ans: 0, exp: "Termasuk nol huruf.", optExp: ["Benar.", "Itu _.", "Bukan.", "Bukan."] },
    { q: "Pada pola LIKE, tanda _ (garis bawah) berarti …", opts: ["Tepat satu huruf", "Berapa pun jumlah huruf", "Spasi", "Akhir kata"], ans: 0, exp: "BK00_ cocok untuk BK001–BK009.", optExp: ["Benar.", "Itu %.", "Bukan.", "Bukan."] },
    { q: "SELECT judul FROM buku WHERE judul LIKE 'Sistem'; menghasilkan Empty set karena …", opts: ["Pola tanpa persen menuntut isi kolom persis sama dengan kata Sistem", "Kata Sistem tidak ada di judul mana pun", "LIKE tidak bisa dipakai pada teks", "Harus memakai kutip ganda"], ans: 0, exp: "Kesalahan paling sering saat memakai LIKE.", optExp: ["Benar.", "Ada dua judul yang memuat Sistem.", "Justru untuk teks.", "Kutip tunggal sudah benar."] },
    { q: "Pola LIKE yang meniru kotak pencarian (kata di bagian mana pun) adalah …", opts: ["'%kata%'", "'kata%'", "'%kata'", "'kata'"], ans: 0, exp: "Persen di kedua ujung.", optExp: ["Benar.", "Hanya yang diawali.", "Hanya yang diakhiri.", "Persis sama."] },
    { q: "SELECT judul FROM buku WHERE judul LIKE '%Sistem%'; pada lima buku menghasilkan …", opts: ["Sistem Basis Data dan Analisis Sistem Informasi", "Sistem Basis Data saja", "Empty set", "Kelima buku"], ans: 0, exp: "Satu di awal, satu di tengah.", optExp: ["Benar.", "Analisis Sistem Informasi juga memuat Sistem.", "Ada yang cocok.", "Tidak semua memuat Sistem."] },
    { q: "WHERE tahun BETWEEN 2019 AND 2021 setara dengan …", opts: ["tahun >= 2019 AND tahun <= 2021", "tahun > 2019 AND tahun < 2021", "tahun = 2019 OR tahun = 2021", "tahun >= 2019 OR tahun <= 2021"], ans: 0, exp: "BETWEEN mencakup kedua batas.", optExp: ["Benar.", "Batasnya tidak ikut.", "Itu IN (2019, 2021).", "OR meloloskan semua."] },
    { q: "WHERE tahun IN (2018, 2022) setara dengan …", opts: ["tahun = 2018 OR tahun = 2022", "tahun >= 2018 AND tahun <= 2022", "tahun = 2018 AND tahun = 2022", "tahun BETWEEN 2018 AND 2022"], ans: 0, exp: "IN = daftar nilai yang diperbolehkan.", optExp: ["Benar.", "Itu rentang.", "Tidak ada baris yang memenuhi keduanya.", "Rentang, bukan daftar."] },
    { q: "Fungsi AS pada SELECT judul AS nama_buku adalah …", opts: ["Memberi nama lain pada kolom di tampilan hasil; nama kolom di tabel tidak berubah", "Mengganti nama kolom di tabel", "Membuat tabel baru", "Mengurutkan hasil"], ans: 0, exp: "Periksa dengan DESCRIBE buku;: kolomnya tetap judul.", optExp: ["Benar.", "Itu ALTER TABLE … CHANGE/RENAME.", "Bukan.", "Itu ORDER BY."] },
    { q: "Urutan penulisan klausa yang benar adalah …", opts: ["SELECT, FROM, WHERE, ORDER BY, LIMIT", "SELECT, FROM, ORDER BY, WHERE, LIMIT", "SELECT, WHERE, FROM, LIMIT, ORDER BY", "FROM, SELECT, WHERE, LIMIT, ORDER BY"], ans: 0, exp: "Urutan baku, tidak boleh ditukar.", optExp: ["Benar.", "ORDER BY sebelum WHERE → 1064.", "Salah.", "Salah."] },
    { q: "Menukar posisi ORDER BY dan WHERE menghasilkan …", opts: ["ERROR 1064", "ERROR 1054", "Hasil tidak terurut tanpa galat", "Hasil kosong"], ans: 0, exp: "Urutan klausa tidak sesuai aturan.", optExp: ["Benar.", "1054 = kolom tidak dikenal.", "Ditolak.", "Ditolak."] },
    { q: "Dari enam kekeliruan Bab 10 Bagian 2, yang berjalan TANPA pesan galat adalah …", opts: ["LIKE tanpa persen, LIMIT tanpa ORDER BY, DISTINCT yang tidak mengurangi baris", "Kolom salah ketik di ORDER BY, LIMIT -3, ORDER BY sebelum WHERE", "Semua menimbulkan galat", "Tidak ada yang berjalan"], ans: 0, exp: "Tiga yang pertama menimbulkan galat; tiga sisanya tidak.", optExp: ["Benar.", "Ketiganya menimbulkan galat.", "Tidak.", "Tidak."] },
    { q: "Kueri untuk menampilkan satu buku dengan stok terbanyak adalah …", opts: ["SELECT judul FROM buku ORDER BY stok DESC LIMIT 1;", "SELECT judul FROM buku ORDER BY stok LIMIT 1;", "SELECT judul FROM buku LIMIT 1;", "SELECT MAX judul FROM buku;"], ans: 0, exp: "Urutkan menurun, ambil satu.", optExp: ["Benar.", "ASC = stok tersedikit.", "Tanpa ORDER BY tidak bermakna.", "Sintaks salah."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS BASIS DATA — PERTEMUAN 11*
🗂️ *Mengurutkan dan Mencari (Bab 10 Bagian 2)*

1️⃣ *ORDER BY* kolom [ASC|DESC]. ASC menaik = bawaan. DESC menurun. Dua kolom: kolom kedua dipakai bila yang pertama sama. Urutan baris tabel tidak berarti apa-apa → minta dengan ORDER BY.

2️⃣ *LIMIT n* membatasi baris; hampir selalu dengan ORDER BY. LIMIT -3 → 1064.

3️⃣ *DISTINCT* tepat sesudah SELECT, membuang kembaran untuk GABUNGAN semua kolom yang disebut.

4️⃣ *LIKE:* % = berapa pun huruf, _ = tepat satu huruf. '%kata%' = kotak pencarian. LIKE 'Sistem' tanpa % = harus persis → Empty set.

5️⃣ *BETWEEN a AND b* = >= a AND <= b (kedua batas ikut). *IN (x, y)* = = x OR = y.

6️⃣ *AS* = nama lain di hasil; nama kolom di tabel tetap.

7️⃣ *Urutan tulis:* SELECT → FROM → WHERE → ORDER BY → LIMIT. Ditukar → 1064.`
};
