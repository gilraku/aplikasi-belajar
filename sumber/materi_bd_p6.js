// Materi Lengkap Basis Data P6: Instalasi MAMP dan Mengenal phpMyAdmin
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
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

const layar = diagram({
  label: "Diagram Interaktif", title: "Lima Bagian Halaman Depan phpMyAdmin (Gambar 2 Modul)", desc: "Tiruan sederhana. Klik setiap nomor/bagian.", minw: 660,
  svg: svg(820, 340,
    `<rect x="10" y="10" width="800" height="320" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>` +
    `<g data-part="logo">` + box(20, 20, 180, 44, "phpMyAdmin  ①", "violet", null, { size: 14 }) + "</g>" +
    `<g data-part="list">` + `<rect x="20" y="74" width="180" height="246" fill="#fff" stroke="#94a3b8"/>` + text(110, 92, "② Daftar basis data", { size: 12, color: "#334155" }) +
      ["Baru", "information_schema", "mysql", "perpustakaan", "performance_schema", "sys"].map((n, i) => text(36, 120 + i * 30, n, { anchor: "start", size: 12, color: n === "perpustakaan" ? "#047857" : n === "Baru" ? "#2563eb" : "#64748b" })).join("") + "</g>" +
    `<g data-part="menu">` + `<rect x="210" y="20" width="590" height="44" fill="#e2e8f0" stroke="#94a3b8"/>` + text(505, 42, "③ Basis data • SQL • Status • Akun pengguna • Ekspor • Impor • Pengaturan • Lainnya", { size: 12, color: "#334155" }) + "</g>" +
    `<g data-part="umum">` + box(220, 84, 300, 110, "④ Pengaturan umum|Server connection collation:|utf8mb4_unicode_ci • Tema", "sky", null, { size: 12, r: 4 }) + "</g>" +
    `<g data-part="server">` + box(535, 84, 265, 236, "⑤ Server basis data|Server: localhost|Jenis server: MariaDB|Versi server: 10.11…|Pengguna: root@localhost|Karakter: utf8mb4||Server web: PHP 8.4", "emerald", null, { size: 12, r: 4 }) + "</g>" +
    text(370, 250, "Judul di atas kotak SQL menunjukkan|basis data yang sedang terpilih", { size: 12, color: "#64748b" })
  ),
  parts: [
    { id: "logo", label: "① Logo", title: "Logo phpMyAdmin", text: "Diklik untuk kembali ke halaman depan." },
    { id: "list", label: "② Daftar", title: "Daftar basis data", text: "Semua basis data di server. Empat milik sistem (information_schema, mysql, performance_schema, sys) jangan diubah/dihapus. Klik perpustakaan sebelum menjalankan perintah untuknya." },
    { id: "menu", label: "③ Menu", title: "Baris menu", text: "Menu berubah sesuai tempatmu: di halaman depan berisi Basis data, SQL, Status…; setelah memilih basis data muncul Struktur, SQL, Operasi, dll." },
    { id: "umum", label: "④ Pengaturan", title: "Pengaturan umum", text: "Penyortiran koneksi dan bahasa/tema tampilan." },
    { id: "server", label: "⑤ Server", title: "Keterangan server", text: "Jenis & versi DBMS, pengguna yang masuk (root@localhost), kumpulan karakter, dan versi PHP. Dipakai menjawab Latihan Tingkat 1 modul." }
  ]
});

module.exports = [
  A("Mengapa Perlu Server di Komputer Sendiri?", `<p>Lima pertemuan pertama dikerjakan di atas kertas. Mulai sekarang rancangan dipindahkan ke komputer, dan untuk itu diperlukan DBMS yang benar-benar berjalan.</p>
<p>DBMS tidak dibuka seperti dokumen. Ia adalah <strong>layanan</strong> yang menunggu permintaan lalu menjawabnya: <strong>server</strong>. Karena berjalan di komputer sendiri, namanya <strong>server lokal</strong>, ibarat ruang arsip mini di rumah sendiri yang hanya melayani penghuninya.</p>
<p>➕ <code>localhost</code> adalah nama khusus yang selalu berarti “komputer ini sendiri”, dengan alamat loopback seperti <code>127.0.0.1</code> atau <code>::1</code>.</p>`, "Bagian 1"),
  jalur,
  A("Alamat dan Porta", `<p>Nomor <strong>porta</strong> adalah nomor pintu masuk layanan. Satu komputer bisa menjalankan banyak layanan, masing-masing di porta berbeda, seperti satu gedung dengan banyak loket. Alamat HTTP tanpa porta memakai 80, sedangkan HTTPS memakai 443.</p>
<p>Pada MAMP Windows dan macOS, konfigurasi bawaan memakai Apache <code>8888</code> dan MySQL <code>8889</code>. <code>80</code> dan <code>3306</code> adalah preset lain. Jalankan server, klik <strong>WebStart</strong>, lalu buka <strong>phpMyAdmin</strong> dari halaman tersebut. Periksa porta aktif di Preferences/Settings.</p>
<p>➕ Alternatif MAMP yang banyak dipakai di Windows: <strong>XAMPP</strong> atau <strong>Laragon</strong>. Isinya serupa (Apache, MySQL/MariaDB, PHP, phpMyAdmin). Dua layanan bentrok jika dijalankan bersamaan pada porta yang sama.</p>`, "Bagian 2"),
  layar,
  { type: "flow", label: "Praktik Terpandu", title: "Delapan Langkah Modul", items: ["Unduh MAMP sesuai OS", "Pasang (pilihan bawaan)", "Start Servers → cek status layanan", "Buka WebStart → phpMyAdmin dan kenali 5 bagian", "Buat perpustakaan lewat menu", "Pastikan muncul di kiri", "SHOW DATABASES; di tab SQL", "Catat alamat, porta, dan nama pengguna"], highlight: 2, note: "Langkah 1–3 di modul diisi tangkapan layar masing-masing karena tampilan MAMP berbeda per OS dan versi." },
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
