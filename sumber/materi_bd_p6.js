// Materi Lengkap Basis Data P6: Instalasi MAMP dan Mengenal phpMyAdmin
const { box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });

const jalur = diagram({
  label: "Diagram Interaktif", title: "Jalur Permintaan: Peramban sampai Basis Data (Gambar 1 Modul)", desc: "Klik setiap bagian.", minw: 660,
  svg: svg(820, 230,
    `<rect x="160" y="20" width="645" height="190" rx="12" fill="none" stroke="#94a3b8" stroke-dasharray="6 4"/>` + text(480, 38, "Paket MAMP (di komputer sendiri = localhost)", { size: 12, color: "#475569" }) +
    box(10, 85, 130, 64, "Peramban|WebStart MAMP", "slate", "browser", { size: 11 }) + arrow(140, 117, 180, 117) +
    box(185, 85, 130, 64, "Apache|server web", "sky", "apache", { size: 13 }) + arrow(315, 117, 350, 117) +
    box(355, 85, 150, 64, "PHP + phpMyAdmin|menyusun halaman", "violet", "php", { size: 12 }) + arrow(505, 117, 545, 117) +
    box(550, 70, 240, 94, "MySQL (DBMS)|perpustakaan • mysql • sys …", "emerald", "mysql", { size: 13 }) +
    path("M670,164 L670,190 L80,190 L80,152", { dash: "5 4" }) + text(380, 202, "hasil dikirim balik sebagai halaman", { size: 11, color: "#475569" })
  ),
  parts: [
    { id: "browser", label: "Peramban", title: "Pengunjung loket", text: "Kamu mengetik alamat phpMyAdmin seperti membuka situs biasa." },
    { id: "apache", label: "Apache", title: "Server web", text: "Menerima permintaan di porta Apache yang aktif, misalnya 8888 pada konfigurasi bawaan MAMP." },
    { id: "php", label: "PHP + phpMyAdmin", title: "Halaman pengelola", text: "phpMyAdmin adalah aplikasi web yang ditulis dengan PHP. Ia menerjemahkan klik dan formulir menjadi perintah SQL untuk MySQL." },
    { id: "mysql", label: "MySQL", title: "Tempat data sebenarnya", text: "Menyimpan dan mengambilkan data. Porta MySQL bawaan MAMP adalah 8889. ➕ Banyak distribusi Linux/XAMPP memakai MariaDB, “saudara kembar” MySQL dengan perintah yang hampir sama; layar modul menunjukkan Jenis server: MariaDB." }
  ]
});

// Tangkapan layar asli phpMyAdmin 5.2 (bahasa Indonesia), berkas di web/public/materi/basis-data/p6/
const IMG = "materi/basis-data/p6/";
const layar = {
  type: "shot", label: "Kenali Layarnya", title: "Lima Bagian Halaman Depan phpMyAdmin (Gambar 2 Modul)",
  desc: "Tampilan asli phpMyAdmin. Klik nomor kuning untuk melihat fungsi tiap bagian.",
  src: IMG + "depan.webp", w: 1800, h: 900, url: "localhost:8888/phpMyAdmin",
  alt: "Halaman depan phpMyAdmin: daftar basis data di kiri, menu di atas, Pengaturan umum dan Server basis data di kanan",
  caption: "Tangkapan layar phpMyAdmin 5.2 asli pada server lokal dengan porta seperti MAMP. Angka versi di laptopmu bisa sedikit berbeda, letak bagiannya sama.",
  parts: [
    { id: "logo", n: 1, x: 18.8, y: 3, box: [2.5, 0, 15.5, 5.5], label: "Logo", title: "Logo phpMyAdmin", text: "Diklik untuk kembali ke halaman depan." },
    { id: "list", n: 2, x: 15, y: 21, box: [0, 19, 20, 23], label: "Daftar", title: "Daftar basis data", text: "Semua basis data di server. Empat milik sistem (information_schema, mysql, performance_schema, sys) jangan diubah/dihapus. Klik perpustakaan sebelum menjalankan perintah untuknya." },
    { id: "menu", n: 3, x: 96.8, y: 6.9, box: [20.3, 3.9, 79.4, 6.1], label: "Menu", title: "Baris menu", text: "Menu berubah sesuai tempatmu: di halaman depan berisi Basis data, SQL, Status…; setelah memilih basis data muncul Struktur, SQL, Operasi, dll." },
    { id: "umum", n: 4, x: 63.9, y: 17, box: [21.6, 14, 44, 21.6], label: "Pengaturan", title: "Pengaturan umum", text: "Penyortiran koneksi (Server connection collation) dan, di bawahnya, tema tampilan." },
    { id: "server", n: 5, x: 96.7, y: 17, box: [67.6, 14, 30.8, 42.2], label: "Server", title: "Keterangan server", text: "Jenis & versi DBMS, pengguna yang masuk (root@localhost), dan kumpulan karakter. Versi PHP ada di kotak Server web di bawahnya. Dipakai menjawab Latihan Tingkat 1 modul." }
  ]
};

const langkah = {
  type: "steps", label: "Praktik Terpandu", title: "Delapan Langkah Modul",
  desc: "Klik tiap langkah untuk melihat caranya. Tandai yang sudah selesai.",
  note: "Langkah 1–3 tidak diberi gambar karena tampilan MAMP berbeda per OS dan versi. Gambar langkah 5–7 adalah phpMyAdmin asli.",
  items: [
    { title: "Unduh MAMP sesuai OS", tag: "Windows / macOS", how: "Unduh dari situs resmi <strong>mamp.info</strong>, pilih versi untuk Windows atau macOS.", ok: "berkas pemasang (.exe di Windows, .pkg di macOS) sudah terunduh." },
    { title: "Pasang dengan pilihan bawaan", how: "Jalankan berkas pemasang dan ikuti petunjuknya tanpa mengubah pilihan bawaan.", ok: "MAMP muncul di daftar aplikasi." },
    { title: "Start Servers", tag: "tampilan beda tiap laptop", how: "Buka MAMP lalu klik <strong>Start</strong> (di beberapa versi tertulis <strong>Start Servers</strong>).", ok: "status <strong>Apache</strong> dan <strong>MySQL</strong> aktif (tanda hijau).", fail: "biasanya porta sedang dipakai aplikasi lain, misalnya XAMPP yang masih berjalan. Matikan aplikasi itu, atau ganti porta di Preferences/Settings." },
    { title: "Buka WebStart → phpMyAdmin, kenali 5 bagiannya", how: "Klik <strong>WebStart</strong>, lalu buka <strong>phpMyAdmin</strong> dari halaman tersebut. Cocokkan dengan gambar <em>Lima Bagian Halaman Depan phpMyAdmin</em> di atas.", ok: "halaman phpMyAdmin terbuka dan daftar basis data tampil di kiri.", fail: "kalau muncul <code>#1045 Access denied</code>, masuk dengan pengguna <code>root</code> dan sandi <code>root</code>." },
    { title: "Buat basis data perpustakaan lewat menu", how: "Klik menu <strong>Basis data</strong>, ketik <code>perpustakaan</code> di kolom <strong>Buat basis data</strong>, lalu klik <strong>Buat</strong>.", img: { src: IMG + "buat.webp", alt: "Tab Basis data phpMyAdmin dengan nama perpustakaan diketik di kolom Buat basis data" } },
    { title: "Pastikan muncul di kiri", how: "Setelah klik Buat, phpMyAdmin langsung membuka basis data baru itu.", ok: "<code>perpustakaan</code> ada di daftar kiri dan bagian atas bertuliskan <strong>Database: perpustakaan</strong>. Pesan “Tidak ada tabel” itu wajar karena tabelnya belum dibuat.", img: { src: IMG + "buat-hasil.webp", alt: "phpMyAdmin setelah membuat perpustakaan: nama muncul di daftar kiri" } },
    { title: "Jalankan SHOW DATABASES; di tab SQL", how: "Klik tab <strong>SQL</strong>, ketik perintah berikut, lalu klik <strong>Kirim</strong>.", code: "SHOW DATABASES;", ok: "muncul tabel hasil berisi <code>perpustakaan</code> bersama empat basis data sistem.", img: { src: IMG + "sql-hasil.webp", alt: "Hasil SHOW DATABASES di phpMyAdmin: information_schema, mysql, performance_schema, perpustakaan, sys" } },
    { title: "Catat alamat, porta, dan nama pengguna", how: "Catat alamat (<code>localhost</code>), porta Apache dan MySQL (bawaan MAMP <code>8888</code> dan <code>8889</code>, cek di Preferences/Settings), serta nama pengguna (<code>root</code>, terlihat di bagian ⑤). Catatan ini dipakai lagi di pertemuan berikutnya." }
  ]
};

module.exports = [
  A("Mengapa Perlu Server di Komputer Sendiri?", `<p>Lima pertemuan pertama dikerjakan di atas kertas. Mulai sekarang rancangan dipindahkan ke komputer, dan untuk itu diperlukan DBMS yang benar-benar berjalan.</p>
<p>DBMS tidak dibuka seperti dokumen. Ia adalah <strong>layanan</strong> yang menunggu permintaan lalu menjawabnya: <strong>server</strong>. Karena berjalan di komputer sendiri, namanya <strong>server lokal</strong>, ibarat ruang arsip mini di rumah sendiri yang hanya melayani penghuninya.</p>
<p>➕ <code>localhost</code> adalah nama khusus yang selalu berarti “komputer ini sendiri”, dengan alamat loopback seperti <code>127.0.0.1</code> atau <code>::1</code>.</p>`, "Bagian 1"),
  jalur,
  A("Alamat dan Porta", `<p>Nomor <strong>porta</strong> adalah nomor pintu masuk layanan. Satu komputer bisa menjalankan banyak layanan, masing-masing di porta berbeda, seperti satu gedung dengan banyak loket. Alamat HTTP tanpa porta memakai 80, sedangkan HTTPS memakai 443.</p>
<p>Pada MAMP Windows dan macOS, konfigurasi bawaan memakai Apache <code>8888</code> dan MySQL <code>8889</code>. <code>80</code> dan <code>3306</code> adalah preset lain. Jalankan server, klik <strong>WebStart</strong>, lalu buka <strong>phpMyAdmin</strong> dari halaman tersebut. Periksa porta aktif di Preferences/Settings.</p>
<p>➕ Alternatif MAMP yang banyak dipakai di Windows: <strong>XAMPP</strong> atau <strong>Laragon</strong>. Isinya serupa (Apache, MySQL/MariaDB, PHP, phpMyAdmin). Dua layanan bentrok jika dijalankan bersamaan pada porta yang sama.</p>`, "Bagian 2"),
  layar,
  langkah,
  { type: "code", label: "Contoh Kode", title: "Perintah Pertemuan Ini", file: "p6.sql", code: `CREATE DATABASE perpustakaan;
SHOW DATABASES;

-- mini-case
CREATE DATABASE perpustakaan_latihan;
DROP DATABASE perpustakaan_latihan;   -- hati-hati: tanpa pembatalan

-- ➕ tambahan yang berguna
CREATE DATABASE IF NOT EXISTS perpustakaan;   -- tidak galat bila sudah ada
CREATE DATABASE perpus2 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
SELECT VERSION();                              -- versi DBMS`, note: "Tingkat 3 modul: buat basis data bernama sesuai NIM, misalnya <code>db_2026001</code>. Awalan huruf (db_) membuat nama mudah dibaca dan tidak perlu diapit tanda petik terbalik." },
  tip("➕ Akses ditolak (Access denied)?", "Pengguna bawaan MAMP adalah <code>root</code> dengan kata sandi <code>root</code>. Pada XAMPP, root biasanya tanpa kata sandi. Galat yang muncul: <code>#1045 Access denied for user 'root'@'localhost'</code>."),
  rv("Cek Pemahaman", "Jawab Dulu, Baru Buka", [
    { prompt: "Apa beda phpMyAdmin dan MySQL?", answer: "MySQL menyimpan data; phpMyAdmin halaman pengelola", reason: "Loket boleh diganti, kartu di lemari tetap utuh." },
    { prompt: "Perintah membuat basis data perpustakaan?", answer: "CREATE DATABASE perpustakaan;", reason: "" },
    { prompt: "Di mana melihat jenis dan versi server?", answer: "Bagian ⑤ Server basis data", reason: "Atau jalankan SELECT VERSION();" }
  ])
];
