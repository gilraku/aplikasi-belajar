// Basis Data — Pertemuan 12: Agregasi dan Pengelompokan (Bab 11). Sumber: Modul Ajar Basis Data P12.
// Bagian bertanda ➕ bukan dari modul. Angka pada latihan dihitung oleh lab SQL (bd_uas_util.jalan).
const { SEED, lab, jalan, BUKU_TAMBAH, values } = require("./bd_uas_util.js");
const v = sql => jalan("sepuluh", sql).rows.map(r => r.join(" | ")).join("; ");
const n = sql => String(jalan("sepuluh", sql).rows.length);
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

module.exports = {
  id: "p12",
  nomor: 12,
  judul: "Agregasi dan Pengelompokan",
  ujian: "UAS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Banyak Baris Masuk, Satu Angka Keluar",
    text: "Kuasai lima <strong>fungsi agregat</strong> (COUNT, SUM, AVG, MIN, MAX), beda <strong>COUNT(*)</strong> dan <strong>COUNT(kolom)</strong>, <strong>GROUP BY</strong>, <strong>HAVING</strong> vs WHERE, dan urutan pengerjaan lengkap: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. Bab 11, data sepuluh buku."
  },
  cheatsheet: [
    { type: "table", label: "Interaktif 1 • Fungsi Agregat", title: "Lima Fungsi (10 buku)", mono: true, headers: ["Fungsi", "Menghitung", "Hasil"],
      rows: [
        ["COUNT(*)", "Banyaknya baris (termasuk yang ada NULL)", v("SELECT COUNT(*) FROM buku;")],
        ["COUNT(kolom)", "Baris yang kolom itu tidak NULL", "≤ COUNT(*)"],
        ["SUM(stok)", "Jumlah seluruh nilai", v("SELECT SUM(stok) FROM buku;")],
        ["AVG(stok)", "Rata-rata", v("SELECT AVG(stok) FROM buku;")],
        ["MIN(tahun)", "Nilai terkecil (terbitan tertua)", v("SELECT MIN(tahun) FROM buku;")],
        ["MAX(stok)", "Nilai terbesar", v("SELECT MAX(stok) FROM buku;")]
      ],
      modes: [
        { label: "Jenis kolom", target: "col", col: 0, title: "SUM/AVG hanya bilangan", text: "COUNT, MIN, MAX boleh pada kolom apa pun (teks, tanggal). SUM pada kolom teks menghasilkan 0 tanpa galat." },
        { label: "COUNT(*) vs kolom", target: "row", row: 1, title: "NULL tidak dihitung", text: "Selama tidak ada kolom kosong, hasil keduanya sama. Untuk jumlah baris, pakai COUNT(*)." }
      ] },
    { type: "code", label: "Interaktif 2 • Kerangka Lengkap", title: "Urutan Penulisan Baku", file: "SQL", code: "SELECT kolom, fungsi_agregat\nFROM nama_tabel\nWHERE syarat_baris\nGROUP BY kolom\nHAVING syarat_kelompok\nORDER BY kolom;", note: "Urutan pengerjaan: <strong>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</strong>. SELECT ditulis pertama, dikerjakan kelima." },
    { type: "table", label: "Interaktif 3 • WHERE vs HAVING", title: "Kartu atau Tumpukan?", headers: ["", "WHERE", "HAVING"],
      rows: [["Menyaring", "Baris, sebelum pengelompokan", "Kelompok, sesudah pengelompokan"], ["Fungsi agregat", "Tidak boleh → ERROR 1111", "Boleh"], ["Contoh", "<code>WHERE tahun &gt;= 2019</code>", "<code>HAVING COUNT(*) &gt;= 2</code>"]],
      modes: [{ label: "Aturan SELECT", target: "none", title: "Kolom pada SELECT", text: "Hanya kolom pengelompok atau fungsi agregat. Jumlah baris hasil = banyaknya kelompok." }] },
    { type: "table", label: "Interaktif 4 • Contoh Modul", title: "Hasil GROUP BY pada 10 Buku", mono: true, headers: ["Kueri", "Hasil"],
      rows: [
        ["GROUP BY pengarang (COUNT)", v("SELECT pengarang, COUNT(*) FROM buku GROUP BY pengarang ORDER BY pengarang;")],
        ["GROUP BY tahun (COUNT)", v("SELECT tahun, COUNT(*) FROM buku GROUP BY tahun ORDER BY tahun;")],
        ["HAVING COUNT(*) >= 2 per pengarang", v("SELECT pengarang, COUNT(*) FROM buku GROUP BY pengarang HAVING COUNT(*) >= 2 ORDER BY pengarang;")],
        ["Total stok per pengarang", v("SELECT pengarang, SUM(stok) FROM buku GROUP BY pengarang ORDER BY pengarang;")]
      ] },
    { type: "table", label: "Interaktif 5 • Kekeliruan", title: "Enam Kekeliruan Bab 11", mono: true, headers: ["Keadaan", "Penyebab → perbaikan"],
      rows: [["ERROR 1111 Invalid use of group function", "Agregat di WHERE → pindah ke HAVING"], ["ERROR 1054 Unknown column 'jumlah' in 'SELECT'", "Alias dipakai seolah kolom → tulis agregatnya + AS"], ["ERROR 1064 (HAVING sebelum GROUP BY)", "Urutan klausa → WHERE, GROUP BY, HAVING, ORDER BY"], ["Kolom biasa tampil bersama agregat", "Bukan pengelompok → masukkan ke GROUP BY atau keluarkan"], ["COUNT(kolom) < COUNT(*)", "Ada NULL → COUNT(*) untuk jumlah baris"], ["SUM teks = 0", "Kolom teks → SUM hanya untuk bilangan"]],
      modes: [{ label: "➕ MySQL 8", target: "row", row: 3, title: "1140 / 1055", text: "MariaDB (modul) membiarkan <code>SELECT judul, COUNT(*) FROM buku;</code> berjalan dengan judul sembarang. MySQL 8 menolaknya (only_full_group_by): galat 1140, atau 1055 untuk kueri ber-GROUP BY." }] }
  ],
  simulator: [
    lab({ profile: "bd-p12", label: "Lab phpMyAdmin • Praktik Terpandu Modul", title: "Meringkas dan Mengelompokkan",
      desc: "Data berisi <strong>lima buku</strong> hasil Bab 10. Langkah 1 menambah lima buku baru sehingga menjadi <strong>sepuluh</strong>, seperti modul. Jangan lewati langkah 1; contoh berikutnya memakai sepuluh buku.",
      seed: SEED.lima,
      examples: [
        { label: "1 · Tambah lima buku", sql: "INSERT INTO buku VALUES\n" + values(BUKU_TAMBAH) + ";\nSELECT COUNT(*) FROM buku;" },
        { label: "2 · COUNT seluruh buku", sql: "SELECT COUNT(*) AS jumlah_buku FROM buku;" },
        { label: "3 · Empat angka stok", sql: "SELECT SUM(stok) AS total_stok,\n       AVG(stok) AS rata_rata,\n       MIN(stok) AS paling_sedikit,\n       MAX(stok) AS paling_banyak\nFROM buku;" },
        { label: "4 · Terbit sebelum 2021", sql: "SELECT COUNT(*) AS jumlah FROM buku\nWHERE tahun < 2021;" },
        { label: "5 · Per pengarang", sql: "SELECT pengarang, COUNT(*) AS jumlah_buku\nFROM buku\nGROUP BY pengarang;" },
        { label: "6 · + total stok, urut", sql: "SELECT pengarang, COUNT(*) AS jumlah_buku,\n       SUM(stok) AS total_stok\nFROM buku\nGROUP BY pengarang\nORDER BY total_stok DESC, pengarang;" },
        { label: "7 · Per tahun terbit", sql: "SELECT tahun, COUNT(*) AS jumlah_buku\nFROM buku\nGROUP BY tahun\nORDER BY tahun;" },
        { label: "8 · HAVING > 1", sql: "SELECT pengarang, COUNT(*) AS jumlah_buku\nFROM buku\nGROUP BY pengarang\nHAVING COUNT(*) > 1;" },
        { label: "9 · Empat klausa", sql: "SELECT tahun, COUNT(*) AS jumlah_buku\nFROM buku\nWHERE tahun >= 2019\nGROUP BY tahun\nHAVING COUNT(*) > 1\nORDER BY tahun;" },
        { label: "⚠ 10 · COUNT di WHERE", sql: "SELECT pengarang, COUNT(*)\nFROM buku\nWHERE COUNT(*) > 1\nGROUP BY pengarang;" },
        { label: "⚠ judul + COUNT (MariaDB)", sql: "SELECT judul, COUNT(*) FROM buku;" },
        { label: "⚠ alias seolah kolom", sql: "SELECT pengarang, jumlah FROM buku GROUP BY pengarang;" },
        { label: "⚠ HAVING sebelum GROUP BY", sql: "SELECT pengarang, COUNT(*) FROM buku\nHAVING COUNT(*) > 1\nGROUP BY pengarang;" },
        { label: "⚠ SUM teks", sql: "SELECT pengarang, SUM(judul) FROM buku GROUP BY pengarang;" },
        { label: "Anggota per prodi", sql: "SELECT prodi, COUNT(*) AS jumlah_anggota\nFROM anggota\nGROUP BY prodi;" }
      ] }),
    { type: "exercise", label: "Permainan 1 • WHERE atau HAVING?", title: "Di Mana Syarat Ini Ditulis?", headers: ["Pertanyaan kepala perpustakaan", "Klausa"],
      rows: [
        ["Jumlah buku terbitan 2020 ke atas per pengarang", "WHERE", "✓ Syarat tentang satu buku (tahunnya) → WHERE, sebelum ditumpuk."],
        ["Pengarang yang bukunya dua atau lebih", "HAVING", "✓ Syarat tentang hasil hitungan tumpukan → HAVING COUNT(*) >= 2."],
        ["Pengarang yang total eksemplarnya lebih dari 5", "HAVING", "✓ HAVING SUM(stok) > 5."],
        ["Total stok per pengarang, hanya buku yang stoknya di atas 1", "WHERE", "✓ stok > 1 menyaring kartu, bukan tumpukan."],
        ["Tahun terbit yang memiliki lebih dari dua judul", "HAVING", "✓ HAVING COUNT(*) > 2 (Cek Pemahaman no. 4 modul)."]
      ].map(([q, a, ok]) => ({ cells: [q], fields: [{ options: ["WHERE", "HAVING"], answer: a }], ok })) },
    { type: "exercise", label: "Permainan 2 • Berapa Baris Hasilnya?", title: "Jumlah Baris = Banyaknya Kelompok", headers: ["Kueri (10 buku)", "Baris hasil"],
      rows: [
        ["SELECT COUNT(*) FROM buku;", ["1", "6", "10"], "Tanpa GROUP BY, agregat meringkas seluruh tabel menjadi satu baris."],
        ["SELECT pengarang, COUNT(*) FROM buku GROUP BY pengarang;", ["3", "6", "10"], "Enam pengarang berbeda."],
        ["SELECT tahun, COUNT(*) FROM buku GROUP BY tahun;", ["4", "5", "10"], "Tahun 2018–2022."],
        ["SELECT pengarang FROM buku GROUP BY pengarang HAVING COUNT(*) >= 2;", ["2", "3", "6"], "Andi Wibowo, Maya Sari, Rina Kartika."],
        ["SELECT tahun FROM buku GROUP BY tahun HAVING COUNT(*) > 2;", ["0", "2", "3"], "2021 dan 2022 masing-masing tiga judul."]
      ].map(([sql, opts, ok]) => ({ cells: [`<code>${esc(sql)}</code>`], fields: [{ options: opts, answer: n(sql) }], ok: "✓ " + ok })) },
    { type: "reveal", label: "Mini-Case Modul", title: "Enam Angka untuk Rapat Evaluasi: Kunci Kuerinya", items: [
      { prompt: "1. Berapa jumlah judul buku?", answer: "SELECT COUNT(*) AS jumlah_judul FROM buku;", reason: v("SELECT COUNT(*) FROM buku;") + " judul." },
      { prompt: "2. Berapa total eksemplar seluruh buku?", answer: "SELECT SUM(stok) AS total_eksemplar FROM buku;", reason: v("SELECT SUM(stok) FROM buku;") + " eksemplar." },
      { prompt: "3. Berapa rata-rata stok per judul?", answer: "SELECT AVG(stok) AS rata_rata FROM buku;", reason: v("SELECT AVG(stok) FROM buku;") + "; dibulatkan sendiri saat menulis laporan (≈ 3)." },
      { prompt: "4. Tahun berapa buku tertua dan terbaru?", answer: "SELECT MIN(tahun) AS tertua, MAX(tahun) AS terbaru FROM buku;", reason: v("SELECT MIN(tahun), MAX(tahun) FROM buku;").replace(" | ", " dan ") + "." },
      { prompt: "5. Jumlah judul setiap pengarang, dari yang paling produktif", answer: "SELECT pengarang, COUNT(*) AS jumlah_judul FROM buku GROUP BY pengarang ORDER BY jumlah_judul DESC, pengarang;", reason: "Andi Wibowo 3 di urutan pertama; pengarang sebagai pemutus seri." },
      { prompt: "6. Pengarang mana saja yang total eksemplarnya lebih dari 5?", answer: "SELECT pengarang, SUM(stok) AS total FROM buku GROUP BY pengarang HAVING SUM(stok) > 5;", reason: v("SELECT pengarang, SUM(stok) FROM buku GROUP BY pengarang HAVING SUM(stok) > 5 ORDER BY pengarang;") + ". Syaratnya di HAVING karena tentang hasil penjumlahan per kelompok, yang belum ada saat WHERE dikerjakan." },
      { prompt: "Tambahan: kelompokkan anggota menurut prodi", answer: "SELECT prodi, COUNT(*) AS jumlah FROM anggota GROUP BY prodi;", reason: "Sistem Informasi 2 anggota, Teknik Informatika 1 anggota." }
    ] }
  ],
  flashcards: [
    { tag: "P12", q: "Apa itu fungsi agregat?", a: "Fungsi yang meringkas banyak baris menjadi satu nilai: COUNT, SUM, AVG, MIN, MAX." },
    { tag: "P12", q: "Kolom apa yang boleh untuk SUM dan AVG?", a: "Hanya kolom bilangan. COUNT, MIN, MAX boleh pada kolom apa pun, termasuk teks dan tanggal." },
    { tag: "P12", q: "Beda COUNT(*) dan COUNT(nama_kolom)?", a: "COUNT(*) menghitung seluruh baris. COUNT(kolom) hanya baris yang kolom itu tidak NULL." },
    { tag: "P12", q: "AVG(stok) dari 10 buku = 3.1000. Mengapa pecahan padahal stok bilangan bulat?", a: "Hasil pembagian tidak selalu bulat (31 ÷ 10). Angka di belakang koma bisa berbeda antara MariaDB dan MySQL." },
    { tag: "P12", q: "Apa fungsi GROUP BY?", a: "Mengelompokkan baris menurut nilai sebuah kolom, lalu menjalankan fungsi agregat pada setiap kelompok." },
    { tag: "P12", q: "Tabel 20 baris, 5 pengarang berbeda. GROUP BY pengarang menghasilkan berapa baris?", a: "5 baris. Jumlah baris hasil = banyaknya kelompok." },
    { tag: "P12", q: "Kolom apa yang boleh ada di SELECT bersama GROUP BY?", a: "Hanya kolom pengelompok atau fungsi agregat." },
    { tag: "P12", q: "Beda WHERE dan HAVING?", a: "WHERE menyaring baris sebelum pengelompokan, tanpa agregat. HAVING menyaring kelompok sesudahnya, boleh agregat." },
    { tag: "P12", q: "Mengapa fungsi agregat tidak boleh di WHERE?", a: "Saat WHERE dikerjakan (langkah 2), pengelompokan belum terjadi, jadi belum ada yang bisa dihitung. ERROR 1111." },
    { tag: "P12", q: "Urutan pengerjaan lengkap?", a: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY." },
    { tag: "P12", q: "Apa yang salah dengan SELECT judul, COUNT(*) FROM buku;?", a: "Judul bukan pengelompok dan bukan agregat. MariaDB menjalankannya dengan judul sembarang dan angka total; MySQL 8 menolak (1140)." },
    { tag: "P12", q: "Mengapa pengarang ditulis lagi di ORDER BY jumlah_buku DESC, pengarang?", a: "Sebagai pemutus seri: tanpa itu, baris yang angkanya sama boleh ditaruh DBMS dalam urutan mana saja." },
    { tag: "P12", q: "Kueri tahun terbit yang memiliki lebih dari dua judul?", a: "<code>SELECT tahun, COUNT(*) FROM buku GROUP BY tahun HAVING COUNT(*) &gt; 2;</code>" }
  ],
  quiz: [
    { q: "Menurut modul, fungsi agregat adalah …", opts: ["Fungsi yang meringkas banyak baris menjadi satu nilai", "Fungsi untuk menggabungkan dua tabel", "Fungsi untuk mengurutkan hasil", "Fungsi untuk membuat tabel"], ans: 0, exp: "Banyak baris masuk, satu nilai keluar.", optExp: ["Benar.", "Itu JOIN (P14).", "Itu ORDER BY.", "Itu CREATE TABLE."] },
    { q: "Fungsi yang dipakai untuk mencari terbitan tertua adalah …", opts: ["MIN(tahun)", "MAX(tahun)", "COUNT(tahun)", "AVG(tahun)"], ans: 0, exp: "Tahun terkecil = tertua.", optExp: ["Benar.", "Itu terbaru.", "Itu banyaknya.", "Rata-rata tahun tidak bermakna."] },
    { q: "SUM dan AVG hanya masuk akal untuk kolom …", opts: ["Bilangan", "Teks", "Tanggal", "Apa pun"], ans: 0, exp: "COUNT, MIN, MAX boleh untuk kolom apa pun.", optExp: ["Benar.", "SUM teks menghasilkan 0.", "Tidak bermakna.", "Hanya COUNT, MIN, MAX."] },
    { q: "SELECT COUNT(*) AS jumlah_buku FROM buku; pada sepuluh buku menghasilkan …", opts: ["Satu baris berisi 10", "Sepuluh baris", "Enam baris", "Empty set"], ans: 0, exp: "Sepuluh baris masuk, satu baris keluar.", optExp: ["Benar.", "Agregat meringkas.", "Itu jika GROUP BY pengarang.", "Tabel berisi data."] },
    { q: "Hasil AVG(stok) dari sepuluh buku modul adalah 3.1000. Mengapa ada angka di belakang koma?", opts: ["Hasil pembagian memang tidak selalu bulat", "Kolom stok bertipe DECIMAL", "Ada galat pembulatan", "Karena COUNT(*) bernilai 10"], ans: 0, exp: "31 ÷ 10 = 3,1. Banyaknya angka di belakang koma bisa berbeda antara MariaDB dan MySQL.", optExp: ["Benar.", "Stok bertipe INT.", "Bukan galat.", "Bukan alasannya."] },
    { q: "Perbedaan COUNT(*) dan COUNT(isbn) adalah …", opts: ["COUNT(*) menghitung seluruh baris; COUNT(isbn) melewatkan baris yang isbn-nya NULL", "Keduanya selalu sama", "COUNT(isbn) menghitung seluruh baris", "COUNT(*) melewatkan baris NULL"], ans: 0, exp: "Perbedaannya baru terlihat pada kolom yang memuat NULL.", optExp: ["Benar.", "Sama hanya bila tidak ada NULL.", "Terbalik.", "Terbalik."] },
    { q: "Fungsi GROUP BY adalah …", opts: ["Mengelompokkan baris menurut nilai kolom, lalu agregat dijalankan per kelompok", "Mengurutkan hasil", "Menghapus baris kembar", "Menggabungkan dua tabel"], ans: 0, exp: "Satu baris hasil untuk setiap kelompok.", optExp: ["Benar.", "Itu ORDER BY.", "Itu DISTINCT.", "Itu JOIN."] },
    { q: "Tabel berisi 20 baris dan 5 pengarang berbeda. Kueri ber-GROUP BY pengarang menghasilkan …", opts: ["5 baris", "20 baris", "1 baris", "4 baris"], ans: 0, exp: "Jumlah baris hasil = banyaknya kelompok.", optExp: ["Benar.", "Bukan banyaknya data.", "Itu tanpa GROUP BY.", "Bukan."] },
    { q: "SELECT pengarang, COUNT(*) FROM buku GROUP BY pengarang; pada sepuluh buku modul menghasilkan … baris.", opts: ["6", "10", "3", "5"], ans: 0, exp: "Enam pengarang berbeda.", optExp: ["Benar.", "Itu jumlah buku.", "Itu yang lolos HAVING >= 2.", "Itu jumlah tahun berbeda."] },
    { q: "Menurut aturan modul, kolom pada SELECT bersama GROUP BY hanya boleh …", opts: ["Kolom pengelompok atau fungsi agregat", "Kolom kunci primer", "Semua kolom", "Kolom bertipe teks"], ans: 0, exp: "Kolom lain menghasilkan angka yang menyesatkan.", optExp: ["Benar.", "Bukan aturannya.", "Tidak.", "Tidak."] },
    { q: "Perbedaan WHERE dan HAVING adalah …", opts: ["WHERE menyaring baris sebelum pengelompokan; HAVING menyaring kelompok sesudahnya", "WHERE menyaring kelompok; HAVING menyaring baris", "Keduanya sama", "HAVING hanya untuk teks"], ans: 0, exp: "Yang satu bekerja pada kartu, yang lain pada tumpukan.", optExp: ["Benar.", "Terbalik.", "Berbeda.", "Bukan."] },
    { q: "Mengapa fungsi agregat tidak boleh dipakai pada klausa WHERE?", opts: ["Saat WHERE dikerjakan, pengelompokan belum terjadi sehingga belum ada yang bisa dihitung", "Karena WHERE hanya untuk teks", "Karena WHERE dikerjakan paling akhir", "Karena agregat hanya untuk ORDER BY"], ans: 0, exp: "WHERE = langkah 2; GROUP BY = langkah 3.", optExp: ["Benar.", "Bukan.", "WHERE dikerjakan kedua.", "Bukan."] },
    { q: "SELECT pengarang, COUNT(*) FROM buku WHERE COUNT(*) > 1 GROUP BY pengarang; menghasilkan …", opts: ["ERROR 1111 Invalid use of group function", "ERROR 1054", "Tiga pengarang", "ERROR 1064"], ans: 0, exp: "Perbaikan: pindahkan syarat ke HAVING.", optExp: ["Benar.", "Bukan kolom tak dikenal.", "Ditolak.", "Sintaks urutannya benar; yang salah agregat di WHERE."] },
    { q: "Urutan pengerjaan yang lengkap menurut modul adalah …", opts: ["FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY", "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY", "FROM, GROUP BY, WHERE, HAVING, SELECT, ORDER BY", "FROM, WHERE, SELECT, GROUP BY, HAVING, ORDER BY"], ans: 0, exp: "SELECT ditulis pertama, dikerjakan kelima.", optExp: ["Benar.", "Itu urutan penulisan.", "WHERE sebelum GROUP BY.", "SELECT sesudah HAVING."] },
    { q: "Urutan penulisan baku klausa ini adalah …", opts: ["WHERE, GROUP BY, HAVING, ORDER BY", "GROUP BY, WHERE, HAVING, ORDER BY", "WHERE, HAVING, GROUP BY, ORDER BY", "HAVING, GROUP BY, WHERE, ORDER BY"], ans: 0, exp: "HAVING sebelum GROUP BY → 1064.", optExp: ["Benar.", "WHERE dulu.", "HAVING sesudah GROUP BY.", "Terbalik."] },
    { q: "SELECT judul, COUNT(*) FROM buku; berjalan tanpa galat pada MariaDB. Apa yang salah?", opts: ["Angka 10 adalah jumlah seluruh buku, dan judulnya dipilih sembarangan oleh DBMS", "Tidak ada yang salah", "Hasilnya sepuluh baris", "COUNT(*) harus diganti COUNT(judul)"], ans: 0, exp: "Kolom judul bukan pengelompok dan bukan agregat. MySQL 8 menolaknya (1140).", optExp: ["Benar.", "Hasilnya tidak bermakna.", "Satu baris.", "Masalahnya kolom judul, bukan COUNT."] },
    { q: "Pada MySQL 8 dengan pengaturan bawaan, SELECT judul, COUNT(*) FROM buku; …", opts: ["Ditolak karena aturan only_full_group_by (galat 1140)", "Berjalan seperti MariaDB", "Menghasilkan 10 baris", "Menimbulkan galat 1111"], ans: 0, exp: "Galat 1055 yang mirip berlaku untuk kueri ber-GROUP BY.", optExp: ["Benar.", "MariaDB bawaan membiarkan.", "Bukan.", "1111 untuk agregat di WHERE."] },
    { q: "Pesan ERROR 1054 Unknown column 'jumlah' in 'SELECT' pada SELECT pengarang, jumlah FROM buku GROUP BY pengarang; disebabkan …", opts: ["Alias dipakai seolah nama kolom yang sudah ada", "Agregat di WHERE", "HAVING sebelum GROUP BY", "Kolom memuat NULL"], ans: 0, exp: "Tulis fungsi agregatnya, beri alias dengan AS: COUNT(*) AS jumlah.", optExp: ["Benar.", "Itu 1111.", "Itu 1064.", "Itu COUNT(kolom) < COUNT(*)."] },
    { q: "Pada contoh modul, Maya Sari dan Rina Kartika sama-sama punya dua buku. Mengapa kolom pengarang ikut disebut di ORDER BY jumlah_buku DESC, pengarang?", opts: ["Sebagai pemutus seri agar urutan hasil pasti", "Agar baris kembar dibuang", "Agar HAVING berjalan", "Karena wajib pada GROUP BY"], ans: 0, exp: "Tanpa itu, baris yang angkanya sama boleh ditaruh dalam urutan mana saja.", optExp: ["Benar.", "Itu DISTINCT.", "Tidak berhubungan.", "Tidak wajib."] },
    { q: "Kueri yang menampilkan pengarang dengan total eksemplar lebih dari 5 adalah …", opts: ["SELECT pengarang, SUM(stok) FROM buku GROUP BY pengarang HAVING SUM(stok) > 5;", "SELECT pengarang, SUM(stok) FROM buku WHERE SUM(stok) > 5 GROUP BY pengarang;", "SELECT pengarang FROM buku WHERE stok > 5;", "SELECT pengarang, COUNT(*) FROM buku HAVING COUNT(*) > 5;"], ans: 0, exp: "Syarat atas hasil penjumlahan per kelompok → HAVING.", optExp: ["Benar.", "Agregat di WHERE → 1111.", "Itu stok per buku, bukan total.", "Tanpa GROUP BY dan menghitung judul, bukan eksemplar."] },
    { q: "WHERE tahun >= 2019 ... GROUP BY tahun HAVING COUNT(*) > 1 pada data modul membuang kelompok 2020 karena …", opts: ["Kelompok 2020 hanya berisi satu buku", "Tahun 2020 kurang dari 2019", "Statistika stoknya 1", "WHERE membuangnya"], ans: 0, exp: "WHERE membuang 2018; HAVING membuang kelompok berisi satu buku (2020).", optExp: ["Benar.", "2020 > 2019.", "Stok tidak disyaratkan.", "WHERE hanya membuang 2018."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS BASIS DATA — PERTEMUAN 12*
📊 *Agregasi dan Pengelompokan (Bab 11)*

1️⃣ *Fungsi agregat:* banyak baris → satu nilai. COUNT, SUM, AVG, MIN, MAX. SUM/AVG hanya bilangan; COUNT/MIN/MAX kolom apa pun.

2️⃣ Data 10 buku: COUNT(*) = 10, SUM(stok) = 31, AVG = 3.1000, MIN = 1, MAX = 6.

3️⃣ *COUNT(*)* semua baris • *COUNT(kolom)* lewati NULL.

4️⃣ *GROUP BY* kolom → satu baris per kelompok. Baris hasil = banyaknya kelompok (6 pengarang → 6 baris). SELECT hanya kolom pengelompok + agregat.

5️⃣ *WHERE* saring baris sebelum dikelompokkan (tanpa agregat) • *HAVING* saring kelompok sesudahnya (boleh agregat).

6️⃣ *Tulis:* SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.
*Kerja:* FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.

7️⃣ *Galat:* 1111 agregat di WHERE • 1054 alias dipakai seolah kolom • 1064 HAVING sebelum GROUP BY. MariaDB izinkan "SELECT judul, COUNT(*)" (hasil menyesatkan); MySQL 8 tolak (1140/1055).`
};
