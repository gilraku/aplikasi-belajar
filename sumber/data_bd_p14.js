// Basis Data — Pertemuan 14: Menggabungkan Tabel dengan INNER JOIN (Bab 12 Bagian 2). Sumber: Modul Ajar Basis Data P14.
// Bagian bertanda ➕ bukan dari modul. Angka dan pesan galat dihitung oleh lab SQL (bd_uas_util), dialek MariaDB.
const { SEED, lab, jalan, galat } = require("./bd_uas_util.js");
const L = "lengkap";
const n = sql => String(jalan(L, sql).rows.length);
const v = sql => jalan(L, sql).rows.map(r => r.join(" | ")).join("; ");
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const kode = sql => { try { return galat(L, sql).match(/^ERROR (\d+)/)[1]; } catch (e) { return "OK"; } };

const LAPORAN = "SELECT a.nama, COUNT(*) AS jumlah_pinjam\nFROM peminjaman AS p\nINNER JOIN anggota AS a ON p.id_anggota = a.id_anggota\nINNER JOIN buku AS b ON p.id_buku = b.id_buku\nWHERE b.tahun >= 2019\nGROUP BY a.nama\nHAVING COUNT(*) >= 2\nORDER BY jumlah_pinjam DESC;";

module.exports = {
  id: "p14",
  nomor: 14,
  judul: "Menggabungkan Tabel dengan INNER JOIN",
  ujian: "UAS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Dari Nomor Penunjuk Menjadi Laporan yang Bisa Dibaca",
    text: "Gabungkan dua dan tiga tabel dengan <strong>INNER JOIN … ON</strong>, pakai <strong>alias tabel</strong>, saring dengan <strong>IS NULL</strong>, padukan dengan GROUP BY/HAVING, dan kenali galat <strong>1052</strong>, <strong>1054</strong>, serta kesalahan diam (perkalian silang, ON keliru). Bab 12 Bagian 2, pertemuan terakhir."
  },
  cheatsheet: [
    { type: "code", label: "Interaktif 1 • Bentuk Umum", title: "INNER JOIN Dua dan Tiga Tabel", file: "SQL", code: "-- dua tabel\nSELECT kolom\nFROM tabel_pertama\nINNER JOIN tabel_kedua\n  ON tabel_pertama.kolom = tabel_kedua.kolom;\n\n-- tiga tabel, dengan alias\nSELECT p.id_pinjam, a.nama, b.judul\nFROM peminjaman AS p\nINNER JOIN anggota AS a ON p.id_anggota = a.id_anggota\nINNER JOIN buku    AS b ON p.id_buku    = b.id_buku;", note: "Banyaknya ON = banyaknya tabel − 1. Syarat pasangan: <strong>kunci tamu = kunci primer</strong> yang ditunjuknya." },
    { type: "table", label: "Interaktif 2 • Istilah", title: "Delapan Kata Kunci", headers: ["Istilah", "Arti"],
      rows: [["JOIN", "Menggabungkan baris dari dua tabel atau lebih"], ["INNER JOIN", "Hanya baris yang menemukan pasangan yang tampil"], ["ON", "Menyebut syarat pasangan"], ["Syarat pasangan", "Kunci tamu = kunci primer yang ditunjuk"], ["Alias tabel", "Nama singkat sementara, berlaku di satu kueri"], ["Kolom bernama sama", "Harus disebut dengan nama tabel/alias"], ["Perkalian silang", "Tanpa syarat pasangan: semua × semua"], ["IS NULL", "Penyaring kolom yang belum diisi (bukan = NULL)"]],
      modes: [{ label: "Arti INNER", target: "row", row: 1, title: "Yang tidak berpasangan dibuang", text: "Enam buku yang belum pernah dipinjam tidak muncul pada hasil JOIN peminjaman–buku. Untuk tetap menampilkannya dipakai LEFT JOIN (P4, bukan dari modul)." }] },
    { type: "table", label: "Interaktif 3 • Hasil pada Data Modul", title: "Kueri dan Angkanya", mono: true, headers: ["Kueri", "Baris hasil"],
      rows: [
        ["peminjaman JOIN buku", n("SELECT p.id_pinjam FROM peminjaman p INNER JOIN buku b ON p.id_buku = b.id_buku;") + " (semua peminjaman berpasangan)"],
        ["+ JOIN anggota (tiga tabel)", n("SELECT p.id_pinjam FROM peminjaman p INNER JOIN anggota a ON p.id_anggota = a.id_anggota INNER JOIN buku b ON p.id_buku = b.id_buku;")],
        ["+ WHERE p.tgl_kembali IS NULL", n("SELECT p.id_pinjam FROM peminjaman p INNER JOIN buku b ON p.id_buku = b.id_buku WHERE p.tgl_kembali IS NULL;") + " (sedang dipinjam)"],
        ["WHERE p.tgl_kembali = NULL", "0 (tidak galat, selalu kosong)"],
        ["Jumlah pinjam per anggota", v("SELECT a.nama, COUNT(*) AS j FROM peminjaman p INNER JOIN anggota a ON p.id_anggota = a.id_anggota GROUP BY a.nama ORDER BY j DESC;")],
        ["Judul dipinjam > 1 kali", v("SELECT b.judul, COUNT(*) FROM peminjaman p INNER JOIN buku b ON p.id_buku = b.id_buku GROUP BY b.judul HAVING COUNT(*) > 1 ORDER BY b.judul;")],
        ["FROM peminjaman, buku (tanpa ON)", v("SELECT COUNT(*) FROM peminjaman, buku;") + " = 6 × 10"]
      ] },
    { type: "table", label: "Interaktif 4 • Kesalahan", title: "Dua Bergalat, Empat Diam", mono: true, headers: ["Keadaan", "Penyebab → perbaikan"],
      rows: [["ERROR 1052 … is ambiguous", "Kolom bernama sama tanpa nama tabel → peminjaman.id_buku / b.id_buku"], ["ERROR 1054 Unknown column 'peminjaman.id_pinjam'", "Alias sudah dipasang → p.id_pinjam"], ["Baris membengkak (60)", "Lupa ON → tambahkan ON"], ["Empty set tak terduga", "ON pada kolom keliru (AG vs BK) → kunci tamu = kunci primer"], ["Baris tertentu hilang", "Tak berpasangan, dibuang INNER JOIN → pastikan memang dikehendaki"], ["COUNT terlalu besar", "Baris hasil gabungan sudah berlipat → periksa hasil JOIN sebelum GROUP BY"]] },
    { type: "callout", tone: "tip", label: "Urutan Pengerjaan", heading: "JOIN dikerjakan di langkah FROM", html: "FROM (+ JOIN … ON) → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. Penggabungan dulu, baru penyaringan dan pengelompokan." }
  ],
  simulator: [
    lab({ profile: "bd-p14", label: "Lab phpMyAdmin • Praktik Terpandu Modul", title: "Sepuluh Langkah INNER JOIN",
      desc: "Data dalam keadaan akhir P13: <strong>10 buku, 3 anggota, 6 peminjaman</strong>. Tombol bernomor mengikuti langkah 1–10 praktik modul; ⚠ = percobaan yang sengaja salah.",
      seed: SEED.lengkap,
      examples: [
        { label: "Lihat peminjaman", sql: "SELECT * FROM peminjaman;" },
        { label: "1 · Dua tabel tanpa alias", sql: "SELECT peminjaman.id_pinjam, buku.judul\nFROM peminjaman\nINNER JOIN buku\n  ON peminjaman.id_buku = buku.id_buku;" },
        { label: "2 · Dengan alias", sql: "SELECT p.id_pinjam, b.judul\nFROM peminjaman AS p\nINNER JOIN buku AS b ON p.id_buku = b.id_buku;" },
        { label: "3 · Gabung anggota", sql: "SELECT p.id_pinjam, a.nama\nFROM peminjaman AS p\nINNER JOIN anggota AS a ON p.id_anggota = a.id_anggota;" },
        { label: "4 · Tiga tabel", sql: "SELECT p.id_pinjam, a.nama, b.judul, p.tgl_pinjam\nFROM peminjaman AS p\nINNER JOIN anggota AS a ON p.id_anggota = a.id_anggota\nINNER JOIN buku AS b ON p.id_buku = b.id_buku\nORDER BY p.id_pinjam;" },
        { label: "5 · Belum dikembalikan", sql: "SELECT a.nama, b.judul, p.tgl_pinjam\nFROM peminjaman AS p\nINNER JOIN anggota AS a ON p.id_anggota = a.id_anggota\nINNER JOIN buku AS b ON p.id_buku = b.id_buku\nWHERE p.tgl_kembali IS NULL\nORDER BY p.tgl_pinjam;" },
        { label: "⚠ = NULL (selalu kosong)", sql: "SELECT a.nama, b.judul\nFROM peminjaman AS p\nINNER JOIN anggota AS a ON p.id_anggota = a.id_anggota\nINNER JOIN buku AS b ON p.id_buku = b.id_buku\nWHERE p.tgl_kembali = NULL;" },
        { label: "6 · Hitung per anggota", sql: "SELECT a.nama, COUNT(*) AS jumlah_pinjam\nFROM peminjaman AS p\nINNER JOIN anggota AS a ON p.id_anggota = a.id_anggota\nGROUP BY a.nama\nORDER BY jumlah_pinjam DESC;" },
        { label: "7 · Judul > 1 kali", sql: "SELECT b.judul, COUNT(*) AS kali_dipinjam\nFROM peminjaman AS p\nINNER JOIN buku AS b ON p.id_buku = b.id_buku\nGROUP BY b.judul\nHAVING COUNT(*) > 1;" },
        { label: "⚠ 8 · Ambiguous", sql: "SELECT id_buku, judul FROM peminjaman\nINNER JOIN buku\n  ON peminjaman.id_buku = buku.id_buku;" },
        { label: "⚠ Nama panjang + alias", sql: "SELECT peminjaman.id_pinjam\nFROM peminjaman AS p\nINNER JOIN buku AS b ON p.id_buku = b.id_buku;" },
        { label: "⚠ 9 · Tanpa ON", sql: "SELECT COUNT(*) AS jumlah_baris\nFROM peminjaman, buku;" },
        { label: "⚠ ON kolom keliru", sql: "SELECT * FROM peminjaman AS p\nINNER JOIN buku AS b\n  ON p.id_anggota = b.id_buku;" },
        { label: "10 · Laporan lengkap", sql: LAPORAN }
      ] }),
    { type: "exercise", label: "Permainan 1 • Berapa Baris?", title: "Tebak Jumlah Baris Hasil", headers: ["Kueri (10 buku, 3 anggota, 6 peminjaman)", "Baris"],
      rows: [
        ["SELECT p.id_pinjam, b.judul FROM peminjaman AS p INNER JOIN buku AS b ON p.id_buku = b.id_buku;", ["4", "6", "10"], "Setiap peminjaman menemukan satu buku. Hanya 4 judul berbeda, tetapi barisnya 6."],
        ["SELECT * FROM peminjaman, buku;", ["6", "16", "60"], "Tanpa ON: 6 × 10 (perkalian silang)."],
        ["SELECT a.nama FROM peminjaman AS p INNER JOIN anggota AS a ON p.id_anggota = a.id_anggota WHERE p.tgl_kembali IS NULL;", ["2", "4", "6"], "Empat NULL di tgl_kembali."],
        ["SELECT a.nama FROM peminjaman AS p INNER JOIN anggota AS a ON p.id_anggota = a.id_anggota WHERE p.tgl_kembali = NULL;", ["0", "4", "6"], "= NULL selalu kosong, tanpa galat."],
        ["SELECT a.nama, COUNT(*) FROM peminjaman AS p INNER JOIN anggota AS a ON p.id_anggota = a.id_anggota GROUP BY a.nama;", ["3", "6", "1"], "Tiga anggota = tiga kelompok."],
        ["SELECT * FROM peminjaman AS p INNER JOIN buku AS b ON p.id_anggota = b.id_buku;", ["0", "6", "60"], "AG… tidak pernah sama dengan BK…: tidak ada pasangan."]
      ].map(([sql, opts, ok]) => ({ cells: [`<code>${esc(sql)}</code>`], fields: [{ options: opts, answer: n(sql) }], ok: "✓ " + ok })) },
    { type: "exercise", label: "Permainan 2 • Diterima atau Ditolak?", title: "Galat Apa yang Muncul?", headers: ["Kueri", "Hasil"],
      rows: [
        ["SELECT id_buku, judul FROM peminjaman INNER JOIN buku ON peminjaman.id_buku = buku.id_buku;", "id_buku ada di dua tabel."],
        ["SELECT peminjaman.id_pinjam FROM peminjaman AS p INNER JOIN buku AS b ON p.id_buku = b.id_buku;", "Alias menggantikan nama panjang."],
        ["SELECT p.id_pinjam, judul FROM peminjaman AS p INNER JOIN buku AS b ON p.id_buku = b.id_buku;", "judul hanya ada di buku, jadi tidak ambiguous (tetap lebih jelas ditulis b.judul)."],
        ["SELECT p.id_pinjam, a.nama FROM peminjaman AS p INNER JOIN anggota AS a ON p.id_anggota = a.id_anggota;", "Penulisan benar."],
        ["SELECT a.nama, id_anggota FROM peminjaman AS p INNER JOIN anggota AS a ON p.id_anggota = a.id_anggota;", "id_anggota ada di dua tabel."]
      ].map(([sql, ok]) => ({ cells: [`<code>${esc(sql)}</code>`], fields: [{ options: ["OK", "1052", "1054"], answer: kode(sql) }], ok: "✓ " + ok })) },
    { type: "reveal", label: "Praktik Langkah 10", title: "Satu Kueri Laporan Lengkap", items: [
      { prompt: "Susun satu kueri dengan INNER JOIN, WHERE, GROUP BY, HAVING, ORDER BY. Contoh pertanyaan: anggota yang meminjam buku terbitan 2019 ke atas minimal dua kali.", answer: LAPORAN.replace(/\n/g, " "), reason: "Hasil: " + v(LAPORAN) + ". Tiga tabel (dua ON), WHERE menyaring baris gabungan (tahun buku), GROUP BY per anggota, HAVING menyaring kelompok, ORDER BY paling akhir. ➕ Pertanyaan ini contoh; modul membebaskan isi kuerinya." },
      { prompt: "Langkah 9: mengapa tanpa ON hasilnya " + v("SELECT COUNT(*) FROM peminjaman, buku;") + "?", answer: "6 baris peminjaman × 10 baris buku = 60 (perkalian silang).", reason: "Setiap peminjaman dipasangkan dengan semua buku. Tidak ada pesan galat, justru itu bahayanya." },
      { prompt: "Langkah 8: perbaiki SELECT id_buku, judul …", answer: "SELECT peminjaman.id_buku, buku.judul FROM peminjaman INNER JOIN buku ON peminjaman.id_buku = buku.id_buku;", reason: "Sebut nama tabel di depan kolom yang namanya sama." }
    ] }
  ],
  flashcards: [
    { tag: "P14", q: "Apa itu JOIN?", a: "Perintah untuk menggabungkan baris dari dua tabel atau lebih menjadi satu tampilan, dengan mencocokkan nilai kolom tertentu." },
    { tag: "P14", q: "Arti kata INNER pada INNER JOIN?", a: "Hanya baris yang menemukan pasangan yang ditampilkan; yang tidak berpasangan dibuang." },
    { tag: "P14", q: "Apa isi klausa ON?", a: "Syarat pasangan: biasanya kunci tamu = kunci primer yang ditunjuknya, misalnya p.id_buku = b.id_buku." },
    { tag: "P14", q: "Mengapa data perpustakaan perlu di-JOIN saat ditampilkan?", a: "Tabel peminjaman hanya menyimpan nomor penunjuk (normalisasi). JOIN menyatukan kembali judul dan nama tanpa mengubah penyimpanan." },
    { tag: "P14", q: "Apa itu alias tabel?", a: "Nama singkat sementara untuk tabel (FROM peminjaman AS p), hanya berlaku di dalam satu kueri." },
    { tag: "P14", q: "Sesudah alias dipasang, bolehkah memakai peminjaman.id_pinjam?", a: "Tidak. ERROR 1054 Unknown column. Pakai p.id_pinjam." },
    { tag: "P14", q: "ERROR 1052 ambiguous artinya?", a: "Kolom bernama sama ada di dua tabel dan disebut tanpa nama tabel; DBMS tidak tahu yang mana." },
    { tag: "P14", q: "Berapa klausa ON untuk tiga tabel?", a: "Dua. Selalu satu lebih sedikit daripada jumlah tabel." },
    { tag: "P14", q: "Mengapa peminjaman ditulis pertama saat menggabungkan tiga tabel?", a: "Peminjaman memuat kedua kunci tamu; dari sana bercabang ke anggota dan buku." },
    { tag: "P14", q: "Apa itu perkalian silang?", a: "Penggabungan tanpa syarat pasangan: semua baris × semua baris. 6 peminjaman × 10 buku = 60 baris, tanpa pesan galat." },
    { tag: "P14", q: "Mengapa WHERE tgl_kembali = NULL salah?", a: "NULL berarti belum ada nilai, tidak bisa dibandingkan dengan =. Tidak galat, tetapi selalu nol baris. Pakai IS NULL." },
    { tag: "P14", q: "Hasil kosong tak terduga pada JOIN biasanya berarti?", a: "ON menyebut pasangan kolom yang keliru, misalnya p.id_anggota = b.id_buku." },
    { tag: "P14", q: "Kapan JOIN dikerjakan dalam urutan pengerjaan?", a: "Di langkah FROM, sebelum WHERE, GROUP BY, HAVING, SELECT, ORDER BY." }
  ],
  quiz: [
    { q: "Menurut modul, JOIN adalah …", opts: ["Perintah untuk menggabungkan baris dari dua tabel atau lebih", "Perintah untuk menghapus tabel", "Perintah untuk mengurutkan hasil", "Perintah untuk membuat kunci tamu"], ans: 0, exp: "Penggabungan dengan mencocokkan nilai kolom tertentu.", optExp: ["Benar.", "Itu DROP.", "Itu ORDER BY.", "Itu FOREIGN KEY."] },
    { q: "Arti kata INNER pada INNER JOIN adalah …", opts: ["Hanya baris yang menemukan pasangan yang ditampilkan", "Semua baris tabel pertama ditampilkan", "Semua baris kedua tabel ditampilkan", "Baris diurutkan dari dalam"], ans: 0, exp: "Yang tidak berpasangan dibuang.", optExp: ["Benar.", "Itu LEFT JOIN.", "Itu perkalian silang/FULL JOIN.", "Bukan."] },
    { q: "Klausa ON berfungsi untuk …", opts: ["Menyebut syarat pasangan antara kedua tabel", "Menyaring baris hasil akhir", "Memberi nama singkat tabel", "Mengelompokkan baris"], ans: 0, exp: "Biasanya kunci tamu = kunci primer.", optExp: ["Benar.", "Itu WHERE.", "Itu alias (AS).", "Itu GROUP BY."] },
    { q: "Syarat pasangan yang benar untuk peminjaman dan buku adalah …", opts: ["ON peminjaman.id_buku = buku.id_buku", "ON peminjaman.id_anggota = buku.id_buku", "ON peminjaman.id_pinjam = buku.id_buku", "ON buku.judul = peminjaman.id_buku"], ans: 0, exp: "Kunci tamu dengan kunci primer yang ditunjuknya.", optExp: ["Benar.", "Kolom keliru → kosong.", "Kolom keliru.", "Tidak sejenis."] },
    { q: "Mengapa tabel peminjaman hanya menyimpan nomor seperti BK002 dan AG001?", opts: ["Disengaja agar judul dan nama cukup ditulis sekali (normalisasi)", "Karena lupa menambah kolom judul", "Karena MariaDB tidak bisa menyimpan teks", "Agar JOIN tidak diperlukan"], ans: 0, exp: "Yang diubah cara menampilkan, bukan menyimpan.", optExp: ["Benar.", "Bukan.", "Bukan.", "Justru JOIN diperlukan."] },
    { q: "Hasil peminjaman INNER JOIN buku pada data modul berjumlah … baris.", opts: ["6", "10", "4", "60"], ans: 0, exp: "Enam peminjaman, semuanya berpasangan.", optExp: ["Benar.", "Itu jumlah buku.", "Itu jumlah judul berbeda.", "Itu perkalian silang."] },
    { q: "Enam judul buku tidak muncul pada hasil peminjaman INNER JOIN buku karena …", opts: ["Belum pernah dipinjam sehingga tidak berpasangan", "Stoknya habis", "Datanya rusak", "Lupa ORDER BY"], ans: 0, exp: "Itulah arti INNER.", optExp: ["Benar.", "Bukan.", "Bukan.", "ORDER BY hanya mengurutkan."] },
    { q: "Tanpa ORDER BY, urutan baris hasil JOIN …", opts: ["Tidak dijamin", "Selalu menurut kunci primer", "Selalu menurut abjad", "Selalu terbalik"], ans: 0, exp: "Modul menampilkan PJ0002 di atas karena itu.", optExp: ["Benar.", "Tidak dijamin.", "Tidak dijamin.", "Bukan."] },
    { q: "Alias tabel adalah …", opts: ["Nama singkat sementara untuk sebuah tabel di dalam satu kueri", "Nama baru permanen untuk tabel", "Nama kolom hasil", "Kunci tamu"], ans: 0, exp: "Seperti nama panggilan selama satu rapat.", optExp: ["Benar.", "Itu RENAME TABLE.", "Itu alias kolom.", "Bukan."] },
    { q: "SELECT peminjaman.id_pinjam FROM peminjaman AS p INNER JOIN buku AS b ON p.id_buku = b.id_buku; menghasilkan …", opts: ["ERROR 1054 Unknown column 'peminjaman.id_pinjam'", "Enam baris", "ERROR 1052", "ERROR 1146"], ans: 0, exp: "Sesudah alias dipasang, nama panjang tidak berlaku.", optExp: ["Benar.", "Ditolak.", "Bukan ambiguous.", "Tabel ada."] },
    { q: "SELECT id_buku, judul FROM peminjaman INNER JOIN buku ON peminjaman.id_buku = buku.id_buku; menghasilkan …", opts: ["ERROR 1052 … ambiguous", "ERROR 1054", "Enam baris", "Empty set"], ans: 0, exp: "id_buku ada di kedua tabel.", optExp: ["Benar.", "Kolomnya ada, tetapi ganda.", "Ditolak.", "Ditolak."] },
    { q: "Kata ambiguous pada ERROR 1052 berarti …", opts: ["Bermakna ganda", "Tidak ditemukan", "Terlalu panjang", "Kosong"], ans: 0, exp: "DBMS tidak tahu kolom yang dimaksud yang mana.", optExp: ["Benar.", "Itu 1054.", "Itu 1406.", "Bukan."] },
    { q: "Menggabungkan tiga tabel memerlukan … klausa ON.", opts: ["Dua", "Tiga", "Satu", "Empat"], ans: 0, exp: "Satu lebih sedikit daripada jumlah tabel.", optExp: ["Benar.", "Terlalu banyak.", "Kurang satu.", "Bukan."] },
    { q: "Pada penggabungan tiga tabel modul, peminjaman diletakkan lebih dulu karena …", opts: ["Memuat kedua kunci tamu", "Isinya paling sedikit", "Urutan abjad", "Wajib menurut SQL"], ans: 0, exp: "Dari peminjaman bercabang ke anggota dan buku.", optExp: ["Benar.", "Bukan alasannya.", "Bukan.", "Tidak wajib."] },
    { q: "Untuk menampilkan buku yang belum dikembalikan, syarat yang benar adalah …", opts: ["WHERE p.tgl_kembali IS NULL", "WHERE p.tgl_kembali = NULL", "WHERE p.tgl_kembali = ''", "WHERE p.tgl_kembali = 0"], ans: 0, exp: "Hasilnya 4 baris.", optExp: ["Benar.", "Selalu nol baris.", "NULL bukan teks kosong.", "Bukan."] },
    { q: "WHERE tgl_kembali = NULL menghasilkan …", opts: ["Nol baris tanpa pesan galat", "ERROR 1064", "Semua baris", "Empat baris"], ans: 0, exp: "NULL tidak bisa dibandingkan dengan =.", optExp: ["Benar.", "Tidak galat.", "Bukan.", "Itu IS NULL."] },
    { q: "SELECT COUNT(*) FROM peminjaman, buku; pada data modul menghasilkan …", opts: ["60", "6", "10", "16"], ans: 0, exp: "Perkalian silang 6 × 10.", optExp: ["Benar.", "Itu jumlah peminjaman.", "Itu jumlah buku.", "Dijumlah, bukan dikali."] },
    { q: "Ciri perkalian silang (lupa ON) adalah …", opts: ["Jumlah baris hasil jauh lebih banyak daripada tabel mana pun, tanpa pesan galat", "Muncul ERROR 1052", "Hasil selalu kosong", "Muncul ERROR 1064"], ans: 0, exp: "Kesalahan yang paling sulit ditemukan.", optExp: ["Benar.", "Bukan.", "Itu ON keliru.", "Tidak galat."] },
    { q: "ON p.id_anggota = b.id_buku menghasilkan Empty set karena …", opts: ["Nomor AG… tidak pernah sama dengan nomor BK…", "Tabel buku kosong", "Kurang ORDER BY", "Kunci tamu rusak"], ans: 0, exp: "Hasil kosong tak terduga hampir selalu berarti ON keliru.", optExp: ["Benar.", "Berisi 10 buku.", "Bukan.", "Bukan."] },
    { q: "Pada kueri jumlah peminjaman per anggota, Ahmad Fauzi memperoleh angka …", opts: ["3", "2", "1", "6"], ans: 0, exp: "PJ0001, PJ0004, PJ0006.", optExp: ["Benar.", "Itu Nur Aisyah.", "Itu Rangga Pratama.", "Itu seluruh peminjaman."] },
    { q: "Judul yang dipinjam lebih dari sekali (HAVING COUNT(*) > 1) adalah …", opts: ["Sistem Basis Data dan Algoritma dan Struktur Data", "Dasar Pemrograman Komputer saja", "Semua judul yang dipinjam", "Tidak ada"], ans: 0, exp: "BK002 dan BK009 masing-masing dua kali.", optExp: ["Benar.", "Hanya sekali.", "Bukan.", "Ada dua."] },
    { q: "Dalam urutan pengerjaan, penggabungan (JOIN) dikerjakan …", opts: ["Pada langkah FROM, sebelum WHERE dan GROUP BY", "Sesudah GROUP BY", "Paling akhir", "Sesudah SELECT"], ans: 0, exp: "FROM kini mengambil hasil penggabungan.", optExp: ["Benar.", "Bukan.", "Itu ORDER BY.", "Bukan."] },
    { q: "Menurut modul, alias tabel diibaratkan …", opts: ["Nama panggilan yang dipakai selama satu rapat saja", "Nomor kartu buku", "Laci arsip", "Lembar laporan"], ans: 0, exp: "Sesudah rapat bubar, nama panggilan tidak berlaku lagi.", optExp: ["Benar.", "Itu kunci.", "Itu tabel.", "Itu hasil kueri."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS BASIS DATA — PERTEMUAN 14*
🔀 *Menggabungkan Tabel dengan INNER JOIN (Bab 12 Bagian 2)*

1️⃣ *JOIN* menggabungkan baris dua tabel atau lebih menjadi satu tampilan. Penyimpanan tidak berubah.

2️⃣ *Bentuk:* SELECT … FROM t1 INNER JOIN t2 ON t1.kolom = t2.kolom; *ON* = syarat pasangan (kunci tamu = kunci primer).

3️⃣ *INNER* = hanya yang berpasangan. Data modul: 6 peminjaman → 6 baris; 6 judul belum pernah dipinjam tidak muncul.

4️⃣ *Alias:* FROM peminjaman AS p → wajib p.kolom di seluruh kueri. Nama panjang → 1054. Kolom sama tanpa tabel → *1052 ambiguous*.

5️⃣ *Tiga tabel:* dua ON (jumlah tabel − 1); peminjaman ditulis dulu karena memuat dua kunci tamu.

6️⃣ *IS NULL* (bukan = NULL) → 4 buku sedang dipinjam. JOIN + GROUP BY: Ahmad 3, Nur 2, Rangga 1; HAVING > 1 → Sistem Basis Data, Algoritma dan Struktur Data.

7️⃣ *Kesalahan diam:* lupa ON → 60 baris (6 × 10) • ON keliru → kosong • baris hilang (tak berpasangan) • COUNT berlipat.`
};
