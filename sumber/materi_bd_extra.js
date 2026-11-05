// Tambahan materi Basis Data: P1 (Konsep Dasar & DBMS) dan bagian ERD untuk P2
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });
const oval = (cx, cy, rx, ry, t, tone, part, o = {}) => { const [f, s, c] = C[tone]; const e = (dx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx + dx}" ry="${ry + dx}" fill="${dx ? "none" : f}" stroke="${s}" stroke-width="2"${o.dash ? ' stroke-dasharray="6 4"' : ""}/>`;
  return `<g${part ? ` data-part="${part}"` : ""}>${o.double ? e(5) : ""}${e(0)}${text(cx, cy, t, { size: o.size || 13, color: c })}${o.under ? `<line x1="${cx - rx * 0.5}" y1="${cy + 9}" x2="${cx + rx * 0.5}" y2="${cy + 9}" stroke="${c}" stroke-width="1.5"/>` : ""}</g>`; };
const diamond = (cx, cy, w, h, t, tone, part) => { const [f, s, c] = C[tone]; return `<g data-part="${part}"><polygon points="${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}" fill="${f}" stroke="${s}" stroke-width="2"/>${text(cx, cy, t, { size: 13, color: c })}</g>`; };
const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#64748b" stroke-width="2"/>`;

// ---------- P1 ----------
const dataInfo = diagram({
  label: "Diagram Interaktif", title: "Dari Data Menjadi Informasi", desc: "Klik setiap tahap.", minw: 600,
  svg: svg(800, 180,
    box(10, 40, 200, 100, "DATA|2021", "amber", "dt", { size: 16 }) + arrow(212, 90, 290, 90) +
    box(292, 40, 220, 100, "+ KONTEKS|tahun terbit buku|Sistem Basis Data", "sky", "kt", { size: 13 }) + arrow(514, 90, 588, 90) +
    box(590, 40, 200, 100, "INFORMASI|→ keputusan", "emerald", "inf", { size: 16 })
  ),
  parts: [
    { id: "dt", label: "Data", title: "Data (beras)", text: "Catatan mentah: angka, huruf, tanggal. Belum menjawab pertanyaan apa pun." },
    { id: "kt", label: "Konteks", title: "Diberi konteks / diolah", text: "Diletakkan pada keterangan yang jelas (tahun terbit buku tertentu), atau diolah dengan query (menyaring buku yang stoknya &lt; 3)." },
    { id: "inf", label: "Informasi", title: "Informasi (nasi)", text: "Bisa dipakai mengambil keputusan: “buku ini masih cukup baru untuk rujukan”, “dua judul perlu dibeli lagi”. ➕ Ciri informasi yang baik: akurat, tepat waktu, relevan." }
  ]
});

const lemari = diagram({
  label: "Diagram Interaktif", title: "Lemari Arsip Perpustakaan dan Padanannya", desc: "Klik bagian lemari, kartu, petugas, atau loket.", minw: 620,
  svg: svg(800, 330,
    box(10, 10, 260, 310, "", "slate", "lmr", { r: 8 }) + text(140, 32, "LEMARI = basis data", { size: 13, color: C.slate[2] }) +
    box(30, 50, 220, 70, "laci: buku", "amber", "laci", { size: 13, r: 6 }) + box(30, 130, 220, 70, "laci: anggota", "amber", "laci", { size: 13, r: 6 }) + box(30, 210, 220, 70, "laci: peminjaman", "amber", "laci", { size: 13, r: 6 }) +
    path("M252,85 L320,85") +
    box(322, 20, 240, 190, "", "white", "kartu", { r: 6 }) + text(442, 40, "KARTU = baris", { size: 13, color: "#334155" }) +
    box(470, 30, 80, 26, "BK002", "rose", "pk", { size: 12, r: 4 }) +
    [["judul", "Sistem Basis Data"], ["pengarang", "Rina Kartika"], ["tahun", "2021"], ["stok", "3"]].map(([k, v], i) => box(335, 66 + i * 34, 215, 28, k + ": " + v, "sky", "kotak", { size: 12, r: 4 })).join("") +
    box(600, 20, 190, 80, "👮 Petugas|= DBMS (MySQL)", "violet", "ptg", { size: 13 }) +
    box(600, 125, 190, 80, "📝 Formulir|= perintah SQL", "emerald", "sql", { size: 13 }) +
    box(600, 230, 190, 80, "🪟 Loket|= phpMyAdmin", "indigo", "pma", { size: 13 }) +
    arrow(598, 150, 564, 120) + arrow(695, 228, 695, 207) + arrow(695, 123, 695, 102)
  ),
  parts: [
    { id: "lmr", label: "Lemari", title: "Lemari = basis data", text: "Satu basis data untuk satu keperluan: <code>perpustakaan</code>." },
    { id: "laci", label: "Laci", title: "Laci = tabel", text: "Setiap laci hanya menyimpan satu jenis kartu: tabel buku, anggota, peminjaman." },
    { id: "kartu", label: "Kartu", title: "Kartu = baris (record)", text: "Satu kartu berisi keterangan lengkap satu buku. Semua kartu dalam satu laci bentuknya sama." },
    { id: "kotak", label: "Kotak isian", title: "Kotak isian = kolom (field)", text: "judul, pengarang, tahun, stok. Nama kolom ditulis huruf kecil tanpa spasi." },
    { id: "pk", label: "Nomor sudut", title: "Nomor di sudut kartu = kunci primer", text: "id_buku, dibuat berbeda untuk setiap kartu (dibahas di P2)." },
    { id: "ptg", label: "Petugas", title: "Petugas = DBMS", text: "Pemegang satu-satunya kunci lemari. Pengunjung tidak menyentuh laci; petugas yang mengambilkan, menolak isian asal-asalan, mengatur giliran, dan membuat cadangan." },
    { id: "sql", label: "Formulir", title: "Formulir permintaan = SQL", text: "Isiannya baku: buku apa, dari laci mana, dengan syarat apa. <code>SELECT * FROM buku;</code> = “ambilkan semua kartu dari laci buku”." },
    { id: "pma", label: "Loket", title: "Loket = phpMyAdmin", text: "Tempat menyerahkan formulir lewat peramban. Di MAMP Windows umumnya <em>localhost/phpMyAdmin</em>, di macOS umumnya memakai port 8888." }
  ]
});

const sqlAnat = diagram({
  label: "Diagram Interaktif", title: "Membedah Perintah SQL Pertama", desc: "Klik setiap bagian perintah.", minw: 620,
  svg: svg(800, 130,
    box(10, 35, 200, 60, "SELECT judul, stok", "violet", "sel", { size: 15, r: 6 }) + box(218, 35, 150, 60, "FROM buku", "sky", "from", { size: 15, r: 6 }) +
    box(376, 35, 200, 60, "WHERE stok < 3", "amber", "where", { size: 15, r: 6 }) + box(584, 35, 50, 60, ";", "rose", "semi", { size: 22, r: 6 }) +
    text(720, 65, "→ 2 baris", { size: 15, color: C.emerald[2] })
  ),
  parts: [
    { id: "sel", label: "SELECT", title: "SELECT: kolom apa", text: "Selalu jadi pembuka perintah menampilkan. <code>*</code> berarti semua kolom." },
    { id: "from", label: "FROM", title: "FROM: dari tabel mana", text: "Nama tabel harus persis sama. Salah ketik → ERROR 1146." },
    { id: "where", label: "WHERE", title: "WHERE: syaratnya", text: "Menyaring baris. ➕ Operator lain: <code>=</code>, <code>&gt;</code>, <code>&gt;=</code>, <code>&lt;&gt;</code> (tidak sama dengan), <code>LIKE '%data%'</code> (mengandung kata)." },
    { id: "semi", label: ";", title: "Titik koma", text: "Tanda perintah selesai. ➕ Kata perintah SQL tidak membedakan huruf besar-kecil (select = SELECT), tetapi biasanya ditulis kapital agar mudah dibaca." }
  ]
});

const P1 = [
  A("Data dan Informasi Tidak Sama", `<p><strong>Data</strong> adalah catatan mentah tentang suatu hal: angka, huruf, tanggal, yang belum punya konteks. Angka <em>2021</em> di secarik kertas belum berarti apa-apa. <strong>Informasi</strong> adalah data yang sudah diberi konteks atau diolah sehingga berguna untuk mengambil keputusan: “buku <em>Sistem Basis Data</em> terbit tahun 2021 dan tersisa 3 eksemplar”.</p>
<p>Modul memakai ibarat <strong>beras dan nasi</strong>: beras sudah berwujud dan bernilai, tetapi baru bisa dimakan setelah dimasak.</p>`, "Bagian 1"),
  dataInfo,
  A("Apa Itu Basis Data", `<p>Basis data adalah <strong>kumpulan data yang saling berhubungan, disimpan secara teratur, sehingga mudah dicari dan dapat dipakai bersama-sama</strong>. Dua hal yang membuat sekumpulan data pantas disebut basis data: <strong>bentuknya seragam</strong> dan <strong>susunannya teratur</strong>. Tumpukan catatan yang ukurannya berbeda-beda dan letaknya sembarangan tetap berisi data, tetapi belum basis data.</p>
<p>➕ Slide versi lain (yang berjudul “P2 Definisi dan Konsep Basis Data”) memberi dua definisi formal: data yang saling berhubungan tanpa redundansi yang tidak perlu, dan kumpulan file yang saling berkaitan membentuk satu bangunan data. Keduanya dibahas di P2 dan isinya sejalan.</p>`, "Bagian 2"),
  lemari,
  A("Mengapa Lembar Kerja Saja Tidak Cukup", `<p>Excel atau Google Sheets cukup selama datanya sedikit dan dipakai satu orang. Saat data membesar, muncul empat masalah: <strong>data berulang-ulang</strong> (nama pengarang diketik ulang, rawan salah ketik), <strong>data tidak seragam</strong> (berkas versi lama dan baru), <strong>sulit dipakai bersama</strong> (perubahan saling menimpa), dan <strong>tidak ada penjaga aturan</strong> (kolom tahun bisa diisi “tahun lalu”).</p>
<p>➕ Dalam buku teks (Elmasri & Navathe, Connolly & Begg) masalah ini dikenal dengan nama <em>redundansi</em>, <em>inkonsistensi</em>, masalah <em>akses bersamaan (concurrency)</em>, dan masalah <em>integritas</em>.</p>`, "Bagian 3"),
  { type: "table", label: "Tabel Interaktif", title: "Masalah Lembar Kerja → Solusi DBMS", headers: ["Masalah", "Istilah buku teks ➕", "Bagaimana DBMS mengatasi"],
    rows: [["Data berulang", "Redundansi", "Data disimpan sekali di tabelnya sendiri, lalu dihubungkan"], ["Data tidak seragam", "Inkonsistensi", "Hanya ada satu sumber data"], ["Sulit dipakai bersama", "Concurrency", "DBMS mengatur giliran perubahan"], ["Tidak ada penjaga aturan", "Integritas", "Tipe data, NOT NULL, kunci primer menolak isian salah"]],
    modes: [{ label: "Kaitan dengan P2", target: "row", row: 3, title: "Penjaga aturan", text: "Aturan-aturan ini (tipe data, NULL, kunci primer) adalah isi utama Pertemuan 2." }] },
  A("DBMS: Petugas yang Menjaga Basis Data", `<p><strong>DBMS (Database Management System)</strong> adalah perangkat lunak yang menyimpan data, menjaga aturannya, dan melayani setiap permintaan terhadap basis data. Tugasnya: mencarikan data tanpa peminta perlu tahu letaknya, menolak data yang melanggar aturan, mengatur giliran ketika banyak orang mengubah data yang sama, mengatur hak akses, dan membuat cadangan.</p>
<p>Contoh DBMS: <strong>MySQL</strong> (dipakai di matkul ini lewat MAMP + phpMyAdmin), MariaDB, PostgreSQL, Oracle Database, Microsoft SQL Server, dan SQLite.</p>
<p><strong>Sistem basis data</strong> adalah gabungan basis data, DBMS, perangkat keras, dan orang-orang yang memakainya, yaitu seluruh ruang arsipnya.</p>`, "Bagian 4"),
  ex("Latihan Interaktif", "Tugas DBMS yang Mana?", ["Kejadian", "Tugas DBMS"], ["Mencarikan data", "Menolak data salah", "Mengatur giliran", "Mengatur hak akses", "Membuat cadangan"], [
    ["Kolom tahun diisi “dua ribu” lalu ditolak", "Menolak data salah"],
    ["Dua petugas meminjamkan buku terakhir pada detik yang sama, hanya satu yang berhasil", "Mengatur giliran"],
    ["Mahasiswa hanya bisa melihat, petugas bisa mengubah", "Mengatur hak akses"],
    ["Data tetap ada setelah server mati listrik", "Membuat cadangan"],
    ["Pengunjung mengetik judul dan langsung tahu letak raknya", "Mencarikan data"]
  ]),
  A("Hierarki Data", `<p>Data tersusun bertingkat: <strong>karakter → kolom → baris → tabel → basis data</strong>. Seperti buku: huruf menyusun kata, kata menyusun kalimat, kalimat menyusun halaman, halaman menjadi buku. ➕ Di bawah karakter masih ada <em>byte</em> dan <em>bit</em> (lihat diagram di P2).</p>`, "Bagian 5"),
  { type: "flow", label: "Alur", title: "Contoh pada Kasus Perpustakaan", items: ["S (karakter)", "judul: Sistem Basis Data", "baris BK002", "tabel buku", "basis data perpustakaan"], highlight: 2 },
  A("SQL: Bahasa untuk Berbicara dengan DBMS", `<p><strong>SQL (Structured Query Language)</strong>, dibaca “es-ki-el” atau “sikuel”, adalah bahasa perintah untuk meminta sesuatu kepada DBMS. Bentuknya baku dan mirip kalimat bahasa Inggris. SQL bukan bahasa serba guna seperti Python atau Java; ia hanya mengurus data. Pada pertemuan ini cukup dibaca, praktik dimulai di Bab 6 setelah MAMP terpasang.</p>`, "Bagian 6"),
  sqlAnat,
  { type: "table", label: "Tabel Interaktif", title: "Pesan Galat yang Akan Sering Ditemui", headers: ["Pesan", "Penyebab", "Perbaikan"],
    rows: [["ERROR 1064 … near 'SELCT * FROM buku'", "Kata perintah salah ketik", "Periksa ejaan perintah"], ["ERROR 1146 Table 'perpustakaan.bukku' doesn't exist", "Nama tabel salah", "Samakan persis dengan nama tabel"], ["ERROR 1054 Unknown column 'judl'", "Nama kolom salah", "Cek daftar kolom"], ["ERROR 1046 No database selected", "Belum memilih basis data", "USE perpustakaan; atau klik di phpMyAdmin"], ["Kursor menunggu (->)", "Lupa titik koma", "Ketik ; lalu Enter"]],
    modes: [{ label: "Cara cepat mengingat", target: "row", row: 0, title: "1064 = salah ketik", text: "Hampir semua 1064 adalah ejaan atau tanda baca yang salah." }],
    defaultNote: "Pesan di modul diambil dari MariaDB. MySQL di MAMP memakai kalimat yang sangat mirip dan nomor galat yang sama." },
  rv("Cek Pemahaman (dari Modul)", "Jawab Dulu, Baru Buka", [
    { prompt: "Jelaskan perbedaan data dan informasi beserta contohnya.", answer: "Data = mentah (BK002, 2021); informasi = data + konteks", reason: "“Buku Sistem Basis Data terbit 2021 dan tersisa tiga eksemplar.”" },
    { prompt: "Sebutkan tiga kelemahan lembar kerja.", answer: "Berulang, tidak seragam, sulit dipakai bersama, tanpa penjaga aturan", reason: "Tiga di antaranya sudah cukup." },
    { prompt: "Apa tugas DBMS (analogi petugas)?", answer: "Menyimpan, mencarikan, menolak isian salah, mengatur giliran & hak akses", reason: "Pengunjung tidak perlu tahu letak raknya." },
    { prompt: "Urutkan: tabel, karakter, basis data, baris, kolom.", answer: "Karakter, kolom, baris, tabel, basis data", reason: "" },
    { prompt: "Kolom penanda unik tabel buku? Mengapa bukan judul?", answer: "id_buku", reason: "Pasti unik; judul bisa kembar, panjang, dan mudah salah ketik." }
  ])
];

// ---------- ERD (slide “P3 ERD” yang dibagikan di P2) ----------
const erdSimbol = diagram({
  label: "Diagram Interaktif", title: "Simbol-simbol ERD (Notasi Chen)", desc: "Klik setiap simbol.", minw: 640,
  svg: svg(800, 230,
    box(15, 30, 150, 60, "Entity", "sky", "ent", { r: 0, size: 14 }) +
    diamond(285, 60, 170, 70, "Relationship", "amber", "rel") +
    oval(470, 60, 80, 32, "Atribut", "emerald", "atr") +
    oval(670, 60, 80, 32, "Key", "rose", "key", { under: true }) +
    oval(110, 170, 80, 30, "Multi-value", "violet", "mv", { double: true }) +
    oval(320, 170, 80, 30, "Turunan", "slate", "drv", { dash: true }) +
    `<g data-part="weak"><rect x="500" y="140" width="160" height="60" fill="${C.sky[0]}" stroke="${C.sky[1]}" stroke-width="2"/><rect x="506" y="146" width="148" height="48" fill="none" stroke="${C.sky[1]}" stroke-width="2"/>${text(580, 170, "Entity lemah ➕", { size: 13, color: C.sky[2] })}</g>`
  ),
  parts: [
    { id: "ent", label: "Entity", title: "Entity: persegi panjang", text: "Objek yang datanya ingin disimpan dan bisa dibedakan satu sama lain: MAHASISWA, BUKU, DOSEN. Nanti menjadi <strong>tabel</strong>." },
    { id: "rel", label: "Relationship", title: "Relationship: belah ketupat", text: "Hubungan antar-entity, biasanya kata kerja: MAHASISWA <em>meminjam</em> BUKU. ➕ Nanti bisa menjadi kunci tamu atau tabel penghubung." },
    { id: "atr", label: "Atribut", title: "Atribut: oval", text: "Sifat/keterangan entity: nama, alamat. Nanti menjadi <strong>kolom</strong>." },
    { id: "key", label: "Key", title: "Atribut key: oval dengan garis bawah", text: "Atribut yang menentukan entity secara unik: NIM. Nanti menjadi <strong>kunci primer</strong>." },
    { id: "mv", label: "Multi-value", title: "Atribut multi-value: oval bergaris ganda", text: "Bisa berisi lebih dari satu nilai yang jenisnya sama: NO_HP (satu mahasiswa bisa punya 2 nomor)." },
    { id: "drv", label: "Turunan", title: "Atribut turunan: oval garis putus-putus", text: "Diperoleh dari pengolahan atribut lain: UMUR dihitung dari TGL_LAHIR, sehingga tidak perlu disimpan." },
    { id: "weak", label: "Entity lemah", title: "➕ Entity lemah: persegi panjang ganda", text: "Entity yang tidak bisa berdiri sendiri tanpa entity lain, misalnya TANGGUNGAN milik seorang PEGAWAI. Tidak ada di slide, tetapi sering muncul di buku ERD." }
  ]
});

const erdMhs = diagram({
  label: "Diagram Interaktif", title: "Contoh: Atribut Entity MAHASISWA", desc: "Gabungan contoh dari slide. Klik setiap atribut untuk melihat jenisnya.", minw: 640,
  svg: svg(800, 330,
    ln(400, 175, 120, 95) + ln(400, 175, 280, 70) + ln(400, 175, 520, 70) + ln(400, 175, 680, 95) + ln(400, 175, 150, 250) + ln(400, 175, 650, 250) +
    ln(150, 250, 60, 310) + ln(150, 250, 150, 312) + ln(150, 250, 250, 310) +
    box(320, 150, 160, 50, "MAHASISWA", "sky", "ent", { r: 0, size: 15 }) +
    oval(120, 80, 60, 26, "NIM", "rose", "nim", { under: true }) +
    oval(280, 55, 60, 26, "NAMA", "emerald", "nama") +
    oval(520, 55, 70, 26, "NO_HP", "violet", "hp", { double: true }) +
    oval(680, 85, 75, 26, "TGL_LAHIR", "emerald", "tgl") +
    oval(650, 255, 60, 26, "UMUR", "slate", "umur", { dash: true }) +
    oval(150, 250, 65, 26, "ALAMAT", "amber", "alm") +
    oval(55, 305, 50, 20, "KOTA", "amber", "alm", { size: 11 }) + oval(150, 308, 55, 20, "PROVINSI", "amber", "alm", { size: 11 }) + oval(255, 305, 50, 20, "NEGARA", "amber", "alm", { size: 11 })
  ),
  parts: [
    { id: "ent", label: "Entity", title: "Entity MAHASISWA", text: "Nanti menjadi tabel <code>mahasiswa</code>." },
    { id: "nim", label: "NIM", title: "NIM: atribut key", text: "Unik untuk setiap mahasiswa → kunci primer." },
    { id: "nama", label: "NAMA", title: "NAMA: atribut simple & single-valued", text: "Simple: tidak dibagi lagi (dalam contoh ini). Single-valued: tiap mahasiswa paling banyak satu nama." },
    { id: "hp", label: "NO_HP", title: "NO_HP: multi-valued", text: "Satu mahasiswa bisa punya lebih dari satu nomor. ➕ Karena aturan “satu sel satu nilai” (P2), saat diubah ke tabel biasanya dipecah menjadi tabel tersendiri, misalnya <code>telepon_mhs(nim, no_hp)</code>." },
    { id: "tgl", label: "TGL_LAHIR", title: "TGL_LAHIR: atribut tersimpan", text: "Disimpan (tipe DATE). Dari sinilah UMUR dihitung." },
    { id: "umur", label: "UMUR", title: "UMUR: atribut turunan", text: "Dihitung dari TGL_LAHIR. ➕ Tidak disimpan karena nilainya berubah setiap tahun; cukup dihitung saat ditampilkan." },
    { id: "alm", label: "ALAMAT", title: "ALAMAT: atribut komposit", text: "Bisa dibagi lagi menjadi KOTA, PROVINSI, NEGARA (contoh slide). ➕ Di tabel, biasanya yang disimpan adalah bagian-bagiannya agar mudah dicari per kota." }
  ]
});

const ERD = [
  tip("Slide ERD ini dibagikan di Pertemuan 2", "File slidenya berjudul “P3 ERD”, tetapi diunggah dosen di folder Pertemuan 2. Isinya pengantar ERD; modul ERD yang lengkap kemungkinan menyusul di pertemuan berikutnya.", "info"),
  A("ERD: Gambar Rancangan Basis Data", `<p><strong>Model Entity Relationship</strong> menyajikan data dengan <strong>entity</strong> dan <strong>relationship</strong>. ERD adalah model konseptual berbasis grafis untuk menggambarkan struktur logis basis data <strong>sebelum</strong> tabel dibuat. Alasan memakai model E-R menurut slide: <strong>mudah dimengerti oleh pemakai</strong> dan <strong>mudah disajikan oleh perancang database</strong>.</p>
<p>➕ Notasi yang dipakai di slide adalah notasi <strong>Chen</strong> (Peter Chen, 1976). Ada juga notasi lain seperti <em>Crow’s Foot</em> yang sering dipakai di aplikasi perancangan.</p>`, "Bagian 7 • ERD"),
  erdSimbol,
  { type: "table", label: "Tabel Interaktif", title: "6 Jenis Atribut (Slide)", headers: ["Jenis", "Arti", "Contoh", "Simbol"],
    rows: [["Key", "Menentukan entity secara unik", "NIM", "Oval, nama digarisbawahi"], ["Simple", "Tidak dapat dibagi lagi", "NAMA, JENIS_KELAMIN", "Oval biasa"], ["Komposit", "Dapat dibagi menjadi beberapa bagian", "ALAMAT → KOTA, PROVINSI, NEGARA", "Oval bercabang ke oval lain"], ["Single-valued", "Paling banyak satu nilai per baris", "TGL_LAHIR", "Oval biasa"], ["Multi-valued", "Lebih dari satu nilai, jenisnya sama", "NO_HP", "Oval bergaris ganda"], ["Turunan (derived)", "Diperoleh dari pengolahan atribut lain", "UMUR dari TGL_LAHIR", "Oval garis putus-putus"]],
    modes: [{ label: "Pasangan yang berlawanan", target: "row", row: 1, title: "Simple ↔ Komposit", text: "Simple tidak bisa dibagi; komposit bisa dibagi. Pasangan lainnya: single-valued ↔ multi-valued." },
      { label: "Kaitan dengan aturan tabel P2", target: "row", row: 4, title: "Multi-valued vs “satu sel satu nilai”", text: "Di tabel relasional, satu sel hanya boleh satu nilai, jadi atribut multi-valued harus diolah (dipecah) saat ERD diubah menjadi tabel." }] },
  erdMhs,
  ex("Latihan Interaktif", "Tentukan Jenis Atributnya", ["Atribut", "Jenis"], ["Key", "Simple", "Komposit", "Multi-valued", "Turunan"], [
    ["id_buku pada entity BUKU", "Key"],
    ["nama_lengkap → nama_depan + nama_belakang", "Komposit"],
    ["hobi mahasiswa (bisa lebih dari satu)", "Multi-valued"],
    ["lama_pinjam dihitung dari tgl_kembali − tgl_pinjam", "Turunan"],
    ["jenis_kelamin (L/P)", "Simple"],
    ["total_bayar = harga × jumlah", "Turunan"],
    ["email anggota (boleh mendaftarkan beberapa)", "Multi-valued"]
  ]),
  rv("➕ Dari ERD ke Tabel", "Kalau ERD Diubah Menjadi Tabel…", [
    { prompt: "Entity menjadi apa?", answer: "Tabel", reason: "MAHASISWA → tabel mahasiswa." },
    { prompt: "Atribut menjadi apa?", answer: "Kolom", reason: "NAMA → kolom nama." },
    { prompt: "Atribut key menjadi apa?", answer: "Kunci primer", reason: "NIM → PRIMARY KEY." },
    { prompt: "Atribut turunan disimpan atau tidak?", answer: "Biasanya tidak", reason: "Cukup dihitung saat dibutuhkan agar tidak basi." }
  ])
];
module.exports = { P1, ERD };
