// Basis Data — Pertemuan 6: Instalasi MAMP dan Mengenal phpMyAdmin
const T = (head, rows) => { const w = head.map((h, i) => Math.max(h.length, ...rows.map(r => String(r[i]).length))); const line = "+" + w.map(n => "-".repeat(n + 2)).join("+") + "+"; const fmt = r => "| " + r.map((c, i) => String(c).padEnd(w[i])).join(" | ") + " |"; return [line, fmt(head), line, ...rows.map(fmt), line, rows.length + " rows in set"].join("\n"); };
const DBS = n => T(["Database"], [["information_schema"], ["mysql"], ["performance_schema"], ...n.map(x => [x]), ["sys"]]);
module.exports = {
  id: "p6", nomor: 6, judul: "Instalasi MAMP dan Mengenal phpMyAdmin", ujian: "UTS",
  hero: {
    badge: "Penyusun Materi: Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.",
    title: "Dari Kertas ke Komputer",
    text: "Pasang <strong>MAMP</strong> (Apache, MySQL, PHP, phpMyAdmin), pahami <strong>localhost dan porta</strong>, kenali layar <strong>phpMyAdmin</strong>, lalu buat basis data <code>perpustakaan</code> dengan dua cara."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Server lokal = ruang arsip mini di rumah sendiri", html: "DBMS bukan berkas yang dibuka seperti dokumen, melainkan <strong>layanan yang menunggu permintaan</strong> (server). Karena berjalan di komputer sendiri, namanya <strong>server lokal</strong> dan alamatnya <code>localhost</code>." },
    { type: "cards", label: "Interaktif 1 • Isi Paket MAMP", title: "Macintosh, Apache, MySQL, PHP (+ phpMyAdmin)", cols: 4, items: [
      { badge: "Apache", tone: "sky", title: "Server web", text: "Menerima permintaan dari peramban di alamat localhost." },
      { badge: "PHP", tone: "violet", title: "Penyusun halaman", text: "Bahasa yang menyusun halaman phpMyAdmin." },
      { badge: "MySQL", tone: "emerald", title: "DBMS", text: "Tempat data <strong>benar-benar</strong> disimpan." },
      { badge: "phpMyAdmin", tone: "amber", title: "Halaman pengelola", text: "Loket berformulir untuk memberi perintah ke MySQL." }
    ] },
    { type: "callout", tone: "warn", heading: "phpMyAdmin ≠ MySQL", html: "Basis data perpustakaan berada <strong>di dalam MySQL</strong>, bukan di phpMyAdmin. Menghapus phpMyAdmin tidak menghapus data. Sebaliknya, perintah hapus yang dikirim <strong>lewat</strong> phpMyAdmin benar-benar menghapus data di MySQL." },
    { type: "table", label: "Interaktif 2 • Alamat dan Porta", title: "Alamat phpMyAdmin per Sistem Operasi", mono: true, headers: ["Sistem operasi", "Alamat phpMyAdmin", "Porta bawaan"],
      rows: [["Windows", "localhost/phpMyAdmin", "Apache 80, MySQL 3306"], ["macOS", "localhost:8888/phpMyAdmin", "Apache 8888, MySQL 8889"]],
      modes: [{ label: "Kenapa :8888?", target: "row", row: 1, title: "Porta bukan 80 harus ditulis", text: "Alamat tanpa nomor porta selalu menuju porta 80. MAMP macOS memakai 8888 untuk Apache, jadi nomornya wajib ditulis." },
        { label: "Porta = nomor loket", target: "none", title: "Satu gedung, banyak loket", text: "Loket 80 untuk halaman web, loket 3306 untuk basis data. Porta bisa diubah lewat Preferences MAMP; catat yang berlaku di komputermu." }] },
    { type: "table", label: "Interaktif 3 • Layar phpMyAdmin (Gambar 2 Modul)", title: "Lima Bagian Halaman Depan", headers: ["No", "Bagian", "Fungsi"],
      rows: [["1", "Logo phpMyAdmin", "Kembali ke halaman depan"], ["2", "Daftar basis data (kiri)", "Semua basis data di server, termasuk milik sistem"], ["3", "Baris menu", "Basis data, SQL, Status, Akun pengguna, Ekspor, Impor, …"], ["4", "Pengaturan umum", "Penyortiran (collation) dan bahasa tampilan"], ["5", "Keterangan server", "Jenis & versi DBMS, pengguna (root@localhost), kumpulan karakter"]],
      modes: [{ label: "Basis data sistem", target: "row", row: 1, title: "Jangan diubah/dihapus", text: "information_schema, mysql, performance_schema, sys = catatan MySQL tentang dirinya sendiri (termasuk daftar pengguna & hak akses di <code>mysql</code>)." }] },
    { type: "choices", label: "Interaktif 4 • Dua Cara Membuat Basis Data", title: "Hasilnya Sama Persis", style: "toggle",
      options: [
        { label: "Lewat tampilan", title: "Menu Basis data", code: "Nama: perpustakaan • Penyortiran: utf8mb4_general_ci • [Buat]", text: "Tanpa perintah. Penyortiran = aturan pengurutan & pembandingan huruf; bawaannya sudah mendukung huruf Indonesia." },
        { label: "Lewat SQL", title: "Tab SQL", code: "CREATE DATABASE perpustakaan;", text: "Perintah bisa disimpan, disalin, dan dijalankan ulang. Cek dengan <code>SHOW DATABASES;</code>" }
      ] },
    { type: "table", label: "Interaktif 5 • Membaca Perintah", title: "CREATE DATABASE perpustakaan;", mono: true, headers: ["Bagian", "Arti"],
      rows: [["CREATE", "Membuat sesuatu yang baru"], ["DATABASE", "Yang dibuat basis data, bukan tabel"], ["perpustakaan", "Nama: huruf kecil, tanpa spasi"], [";", "Perintah selesai"]] },
    { type: "table", label: "Interaktif 6 • Kesalahan Umum", title: "Masalah di Pertemuan Pemasangan", headers: ["Masalah", "Perbaikan"],
      rows: [["phpMyAdmin tidak dapat dijangkau", "Start Servers di MAMP; cocokkan alamat & porta"], ["Lampu MySQL tidak hijau", "Porta 3306 dipakai program lain: ubah porta di Preferences atau tutup program itu"], ["ERROR 1007 Can't create database … database exists", "Pakai nama lain atau hapus yang lama"], ["Nama memakai spasi/huruf besar", "Huruf kecil + garis bawah: perpustakaan_latihan"], ["Perintah jalan di basis data yang salah", "Lihat judul di atas kotak SQL; klik dulu basis data yang dituju"], ["Basis data sistem ikut terhapus", "Jangan mencentang information_schema, mysql, performance_schema, sys"]] }
  ],
  simulator: [
    { type: "terminal", label: "Permainan Interaktif 1 • Tab SQL", title: "Praktik Terpandu & Mini-Case", desc: "Jalankan berurutan seperti di phpMyAdmin.", shell: "SQL>", header: "Server: localhost:3306",
      scenarios: [
        { label: "1. Buat perpustakaan", pill: "OK", ok: true, cmd: "CREATE DATABASE perpustakaan;", res: "Query OK, 1 row affected", exp: "Basis data baru muncul di daftar kiri. Masih kosong, belum ada tabel." },
        { label: "2. Lihat daftar", pill: "5 rows", ok: true, cmd: "SHOW DATABASES;", res: DBS(["perpustakaan"]), exp: "Empat milik sistem + perpustakaan. Jumlah basis data sistem bisa sedikit berbeda antara MariaDB dan MySQL." },
        { label: "3. Buat lagi (kembar)", code: "1007", pill: "ERROR 1007", ok: false, cmd: "CREATE DATABASE perpustakaan;", res: "ERROR 1007 (HY000): Can't create database 'perpustakaan'; database exists", exp: "Nama sudah dipakai. ➕ <code>CREATE DATABASE IF NOT EXISTS perpustakaan;</code> tidak memunculkan galat (hanya peringatan)." },
        { label: "4. Mini-case: basis data latihan", pill: "OK", ok: true, cmd: "CREATE DATABASE perpustakaan_latihan;\nSHOW DATABASES;", res: "Query OK, 1 row affected\n" + DBS(["perpustakaan", "perpustakaan_latihan"]), exp: "Huruf kecil + garis bawah, tanpa spasi." },
        { label: "5. Hapus yang latihan", pill: "hati-hati", ok: true, cmd: "DROP DATABASE perpustakaan_latihan;", res: "Query OK, 0 rows affected", exp: "Modul memakai menu Operasi; hasilnya sama. Pastikan yang dihapus <strong>bukan</strong> perpustakaan: tidak ada tombol batal." },
        { label: "6. Spasi di nama", code: "1064", pill: "ERROR 1064", ok: false, cmd: "CREATE DATABASE perpustakaan latihan;", res: "ERROR 1064 (42000): You have an error in your SQL syntax; check the manual … near 'latihan' at line 1", exp: "Spasi memisahkan kata dalam perintah, jadi nama tidak boleh berspasi." }
      ] },
    { type: "exercise", label: "Permainan Interaktif 2 • Latihan Tingkat 2 Modul", title: "Penyebab dan Cara Mengatasi", headers: ["Keadaan", "Penyebab paling mungkin"],
      rows: [
        ["localhost/phpMyAdmin dibuka, peramban: halaman tidak dapat dijangkau", "Apache belum jalan atau alamat/porta keliru"],
        ["Lampu MySQL pada MAMP tidak mau hijau", "Porta 3306 dipakai program lain"],
        ["phpMyAdmin terbuka tetapi muncul akses ditolak", "Nama pengguna/kata sandi salah"],
        ["Basis data tertulis Perpustakaan (huruf besar)", "Kebiasaan menamai berkas"]
      ].map(([c, a]) => ({ cells: [c], fields: [{ options: ["Apache belum jalan atau alamat/porta keliru", "Porta 3306 dipakai program lain", "Nama pengguna/kata sandi salah", "Kebiasaan menamai berkas"], answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 3 • Siapa Bertugas Apa?", title: "Jalur Permintaan", headers: ["Tugas", "Bagian MAMP"],
      rows: [["Menerima alamat localhost dari peramban", "Apache"], ["Menyusun halaman phpMyAdmin", "PHP"], ["Menyimpan dan mengambilkan data perpustakaan", "MySQL"], ["Formulir untuk membuat basis data tanpa mengetik perintah", "phpMyAdmin"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["Apache", "PHP", "MySQL", "phpMyAdmin"], answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Cek Pemahaman Modul", title: "Jawab Dulu, Baru Buka", items: [
      { prompt: "Empat perangkat lunak MAMP dan tugasnya?", answer: "Apache (server web), MySQL (DBMS), PHP (penyusun halaman), phpMyAdmin (pengelola)", reason: "" },
      { prompt: "Mengapa alamat macOS perlu :8888?", answer: "Apache MAMP macOS memakai porta 8888, bukan 80", reason: "Tanpa nomor, peramban menuju porta 80." },
      { prompt: "Mengapa basis data mysql tidak boleh dihapus?", answer: "Milik sistem: berisi daftar pengguna & hak akses", reason: "Menghapusnya membuat DBMS tidak bisa berjalan." },
      { prompt: "Beda menghapus basis data vs menutup MAMP?", answer: "Menutup MAMP hanya menghentikan server; data tetap ada. Menghapus basis data menghilangkan datanya.", reason: "Tingkat 3 modul." }
    ] }
  ],
  flashcards: [
    { tag: "P6", q: "Apa itu server lokal?", a: "Layanan (server) yang berjalan di komputer sendiri dan hanya melayani komputer itu; alamatnya localhost." },
    { tag: "P6", q: "Kepanjangan MAMP?", a: "Macintosh, Apache, MySQL, PHP (tersedia juga untuk Windows), plus phpMyAdmin." },
    { tag: "P6", q: "Beda phpMyAdmin dan MySQL?", a: "MySQL = DBMS tempat data disimpan. phpMyAdmin = halaman pengelola untuk memberi perintah ke MySQL." },
    { tag: "P6", q: "Alamat phpMyAdmin Windows dan macOS?", a: "Windows: localhost/phpMyAdmin (Apache 80, MySQL 3306). macOS: localhost:8888/phpMyAdmin (Apache 8888, MySQL 8889)." },
    { tag: "P6", q: "Apa itu porta?", a: "Nomor pintu masuk layanan. Tanpa nomor, alamat web menuju porta 80." },
    { tag: "P6", q: "Empat basis data sistem?", a: "information_schema, mysql, performance_schema, sys. Jangan diubah/dihapus." },
    { tag: "P6", q: "Perintah membuat basis data?", a: "<code>CREATE DATABASE perpustakaan;</code> Cek dengan <code>SHOW DATABASES;</code>" },
    { tag: "P6", q: "Apa itu penyortiran (collation)?", a: "Aturan pengurutan dan pembandingan huruf. Bawaan: utf8mb4_general_ci." },
    { tag: "P6", q: "ERROR 1007?", a: "Can't create database …; database exists. Nama basis data sudah dipakai." }
  ],
  quiz: [
    { q: "Huruf M terakhir pada MAMP adalah singkatan dari…", opts: ["MySQL", "Macintosh", "MariaDB", "Microsoft"], ans: 0, exp: "Macintosh, Apache, MySQL, PHP." },
    { q: "Bagian MAMP yang menerima permintaan alamat localhost dari peramban adalah…", opts: ["Apache", "MySQL", "PHP", "phpMyAdmin"], ans: 0, exp: "Server web." },
    { q: "Data basis data perpustakaan sebenarnya tersimpan di…", opts: ["phpMyAdmin", "MySQL", "Peramban", "Apache"], ans: 1, exp: "phpMyAdmin hanya loket." },
    { q: "Pernyataan yang benar tentang phpMyAdmin adalah…", opts: ["Menghapus phpMyAdmin menghapus semua data", "phpMyAdmin adalah DBMS", "Perintah hapus lewat phpMyAdmin benar-benar menghapus data di MySQL", "phpMyAdmin hanya bisa dipakai di macOS"], ans: 2, exp: "" },
    { q: "Alamat phpMyAdmin bawaan MAMP di macOS adalah…", opts: ["localhost/phpMyAdmin", "localhost:8888/phpMyAdmin", "localhost:3306/phpMyAdmin", "127.0.0.1:80/mysql"], ans: 1, exp: "Apache macOS memakai 8888." },
    { q: "Porta bawaan MySQL pada MAMP Windows adalah…", opts: ["80", "8888", "3306", "8889"], ans: 2, exp: "macOS: 8889." },
    { q: "Alamat tanpa nomor porta berarti menuju porta…", opts: ["80", "3306", "8080", "443"], ans: 0, exp: "Bawaan halaman web (http)." },
    { q: "Berikut basis data milik sistem, KECUALI…", opts: ["information_schema", "performance_schema", "sys", "perpustakaan"], ans: 3, exp: "" },
    { q: "Basis data mysql tidak boleh dihapus karena…", opts: ["Berisi data perpustakaan", "Berisi catatan sistem termasuk daftar pengguna dan hak akses", "Isinya kosong", "Milik phpMyAdmin"], ans: 1, exp: "DBMS tak bisa berjalan tanpanya." },
    { q: "Perintah untuk menampilkan daftar basis data adalah…", opts: ["SHOW TABLES;", "SHOW DATABASES;", "DESCRIBE DATABASE;", "SELECT DATABASES;"], ans: 1, exp: "SHOW TABLES untuk tabel." },
    { q: "ERROR 1007 Can't create database 'perpustakaan'; database exists berarti…", opts: ["Server mati", "Nama basis data sudah dipakai", "Lupa titik koma", "Hak akses ditolak"], ans: 1, exp: "" },
    { q: "Lampu MySQL pada MAMP tidak mau hijau. Penyebab paling mungkin…", opts: ["Porta 3306 dipakai program lain", "Peramban belum dibuka", "Basis data belum dibuat", "Nama basis data huruf besar"], ans: 0, exp: "Ubah porta lewat Preferences." },
    { q: "Nama basis data yang dianjurkan adalah…", opts: ["Perpustakaan Latihan", "perpustakaan latihan", "perpustakaan_latihan", "PERPUSTAKAAN-LATIHAN!"], ans: 2, exp: "Huruf kecil + garis bawah." },
    { q: "Penyortiran utf8mb4_general_ci pada pembuatan basis data adalah…", opts: ["Jenis tabel", "Aturan pengurutan dan pembandingan huruf", "Kata sandi", "Nomor porta"], ans: 1, exp: "Collation." },
    { q: "Basis data yang baru dibuat dengan CREATE DATABASE berisi…", opts: ["Tabel buku otomatis", "Belum ada tabel", "Tiga tabel bawaan", "Data contoh"], ans: 1, exp: "Tabel dibuat di P7." }
  ],
  ringkasan: `*RANGKUMAN BASIS DATA — PERTEMUAN 6*
🖥️ *MAMP & phpMyAdmin*

1️⃣ Server lokal = DBMS yang berjalan di komputer sendiri (localhost).
2️⃣ MAMP: Apache (server web) • MySQL (DBMS, data disimpan di sini) • PHP (penyusun halaman) • phpMyAdmin (halaman pengelola).
3️⃣ phpMyAdmin ≠ MySQL: hapus phpMyAdmin tidak menghapus data; hapus lewat phpMyAdmin = data hilang.
4️⃣ Windows: localhost/phpMyAdmin (80, 3306) • macOS: localhost:8888/phpMyAdmin (8888, 8889).
5️⃣ Basis data sistem: information_schema, mysql, performance_schema, sys → jangan disentuh.
6️⃣ CREATE DATABASE perpustakaan; • SHOW DATABASES; • ERROR 1007 = nama sudah ada.
7️⃣ Nama: huruf kecil + garis bawah, tanpa spasi.`
};
