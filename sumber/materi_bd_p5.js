// Materi Lengkap Basis Data P5: Normalisasi Data
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });

const fd = diagram({
  label: "Diagram Interaktif", title: "Peta Ketergantungan Fungsional peminjaman_kacau", desc: "Setiap penentu (kiri) menentukan kelompok keterangannya sendiri. Klik setiap kelompok.", minw: 620,
  svg: svg(800, 300,
    [[20, "id_pinjam", "tgl_pinjam, id_buku, id_anggota", "amber", "pinjam", "→ tabel peminjaman"], [115, "id_buku", "judul, pengarang", "sky", "buku", "→ tabel buku"], [210, "id_anggota", "nama_anggota, prodi", "emerald", "agt", "→ tabel anggota"]]
      .map(([y, k, v, tone, p, hasil]) => `<g data-part="${p}">` + box(20, y, 170, 60, k, tone, null, { size: 15 }) + arrow(195, y + 30, 270, y + 30) + box(275, y, 300, 60, v, tone, null, { size: 14 }) + text(690, y + 30, hasil, { size: 14, color: C[tone][2] }) + "</g>").join("")
  ),
  parts: [
    { id: "pinjam", label: "id_pinjam →", title: "Kelompok peristiwa peminjaman", text: "Nomor peminjaman menentukan tanggal, buku mana, dan anggota siapa. Yang tersisa hanya nomor penunjuk (FK) dan tanggal." },
    { id: "buku", label: "id_buku →", title: "Kelompok keterangan buku", text: "Sebut BK002, petugas tahu judul dan pengarangnya. Keterangan ini milik laci buku." },
    { id: "agt", label: "id_anggota →", title: "Kelompok keterangan anggota", text: "AG001 → Ahmad Fauzi, Sistem Informasi. ➕ Kalau prodi juga punya keterangan sendiri (kaprodi, gedung), prodi bisa menjadi tabel tersendiri dengan id_prodi." }
  ]
});

const tahap = diagram({
  label: "Diagram Interaktif", title: "Tahapan Normalisasi (Gambar 2 Modul)", desc: "Klik setiap tahap. Kunci tamu diberi tanda *.", minw: 640,
  svg: svg(800, 400,
    `<g data-part="un">` + box(20, 15, 760, 70, "peminjaman_kacau(id_pinjam, id_buku, judul, pengarang,|id_anggota, nama_anggota, prodi, tgl_pinjam)  • sel id_buku berisi “BK003, BK005”", "rose", null, { size: 13 }) + "</g>" +
    arrow(400, 88, 400, 118) +
    `<g data-part="n1">` + box(20, 122, 760, 70, "peminjaman_1nf: sel ganda dipecah jadi baris|➕ kunci menjadi (id_pinjam, id_buku) • pengulangan belum hilang", "amber", null, { size: 13 }) + "</g>" +
    arrow(400, 195, 400, 225) +
    `<g data-part="n23">` + box(20, 229, 760, 110, "buku(id_buku, judul, pengarang, tahun, stok)|anggota(id_anggota, nama, prodi, tgl_daftar)|peminjaman(id_pinjam, id_buku*, id_anggota*, tgl_pinjam, tgl_kembali)", "emerald", null, { size: 14 }) + "</g>" +
    text(400, 370, "Hasil 2NF & 3NF = hasil transformasi ERD Pertemuan 4", { size: 13, color: "#047857" })
  ),
  parts: [
    { id: "un", label: "Belum normal", title: "Satu tabel untuk segalanya", text: "Ada sel bernilai banyak dan keterangan buku/anggota ditulis berulang." },
    { id: "n1", label: "1NF", title: "Satu sel satu nilai", text: "Sel ganda dipecah. Pengulangan masih ada. Modul memberi nomor peminjaman baru; ➕ buku teks umumnya memakai kunci gabungan (id_pinjam, id_buku) agar tidak terjadi ERROR 1062." },
    { id: "n23", label: "2NF & 3NF", title: "Setiap keterangan di lacinya sendiri", text: "2NF: judul, pengarang (bergantung hanya pada id_buku = sebagian kunci) pindah ke buku. 3NF: nama, prodi (bergantung pada id_anggota yang bukan kunci) pindah ke anggota." }
  ]
});

const parsialTransitif = diagram({
  label: "Diagram Interaktif", title: "➕ Parsial (2NF) vs Transitif (3NF)", desc: "Dua jenis ketergantungan yang dibuang normalisasi.", minw: 640,
  svg: svg(800, 260,
    `<g data-part="parsial">` + text(200, 18, "Ketergantungan parsial", { size: 14, color: "#b45309" }) +
      box(40, 40, 120, 46, "id_pinjam", "amber", null, { size: 13, r: 0 }) + box(160, 40, 120, 46, "id_buku", "amber", null, { size: 13, r: 0 }) + text(160, 100, "kunci gabungan", { size: 11, color: "#92400e" }) +
      path("M220,86 L220,170", {}) + box(150, 175, 140, 44, "judul", "slate", null, { size: 13 }) + text(220, 238, "hanya butuh SEBAGIAN kunci", { size: 11, color: "#92400e" }) + "</g>" +
    `<g data-part="transitif">` + text(600, 18, "Ketergantungan transitif", { size: 14, color: "#be123c" }) +
      box(430, 110, 110, 46, "id_denda", "rose", null, { size: 13, r: 0 }) + arrow(540, 133, 585, 133) + box(590, 110, 110, 46, "id_anggota", "violet", null, { size: 13 }) + path("M645,156 L645,180") + box(590, 185, 110, 40, "nama", "slate", null, { size: 13 }) +
      text(565, 70, "kunci → bukan kunci → bukan kunci", { size: 11, color: "#9f1239" }) + "</g>"
  ),
  parts: [
    { id: "parsial", label: "Parsial", title: "Dibuang di 2NF", text: "Kolom bukan kunci yang bergantung pada sebagian kunci gabungan. judul cukup ditentukan id_buku, tanpa id_pinjam → pindah ke tabel buku." },
    { id: "transitif", label: "Transitif", title: "Dibuang di 3NF", text: "id_denda → id_anggota → nama. nama bergantung pada kunci hanya lewat perantara id_anggota (bukan kunci) → pindah ke tabel anggota, id_anggota tinggal sebagai FK." }
  ]
});

const anomali = diagram({
  label: "Diagram Interaktif", title: "Tiga Anomali, Satu Penyebab", desc: "Klik setiap anomali.", minw: 620,
  svg: svg(800, 230,
    box(300, 10, 200, 50, "REDUNDANSI", "slate", "red", { size: 16 }) +
    [[20, "Pengubahan", "dua judul|untuk BK002", "amber", "ub"], [290, "Penyisipan", "buku baru|ERROR 1364", "sky", "sis"], [560, "Penghapusan", "BK001|ikut hilang", "rose", "hps"]]
      .map(([x, h, t, tone, p]) => path(`M400,60 L400,85 L${x + 110},85 L${x + 110},105`) + `<g data-part="${p}">` + box(x, 108, 220, 44, h, tone, null, { size: 15 }) + text(x + 110, 185, t, { size: 13, color: C[tone][2] }) + "</g>").join("")
  ),
  parts: [
    { id: "red", label: "Redundansi", title: "Akar masalah", text: "Keterangan yang sama ditulis berulang. Selama satu fakta disimpan di banyak tempat, ketiga anomali bisa muncul." },
    { id: "ub", label: "Pengubahan", title: "Update anomaly", text: "Perbaikan harus dilakukan di semua salinan; terlewat satu → data bertentangan. Tidak ada pesan galat." },
    { id: "sis", label: "Penyisipan", title: "Insert anomaly", text: "Fakta baru tidak bisa dicatat karena menumpang di baris yang mewajibkan data lain (id_pinjam)." },
    { id: "hps", label: "Penghapusan", title: "Delete anomaly", text: "Menghapus satu fakta (peminjaman) ikut menghapus fakta lain (keterangan buku)." }
  ]
});

module.exports = [
  A("Mengapa Tabel Harus Dipecah?", `<p>P4 menghasilkan tiga tabel. Wajar bertanya: bukankah lebih mudah semuanya di satu tabel? Bayangkan tabel <code>peminjaman_kacau</code> yang memuat data peminjaman, buku, dan anggota sekaligus. Judul dan pengarang BK002 ditulis dua kali, nama prodi juga berulang. Inilah <strong>redundansi</strong>.</p>
<p>Ibaratnya petugas yang menyalin ulang seluruh keterangan buku ke setiap slip peminjaman. Sepuluh peminjaman berarti sepuluh salinan; kalau judulnya salah cetak, kesepuluh slip harus dikoreksi satu per satu.</p>
<p>➕ <strong>Tambahan:</strong> redundansi juga memboroskan ruang penyimpanan, tetapi alasan utama normalisasi adalah <em>kebenaran data</em>, bukan hemat ruang.</p>`, "Bagian 1"),
  anomali,
  ex("Latihan Interaktif", "Anomali Apa Ini? (Contoh Lain)", ["Keadaan", "Anomali"], ["Pengubahan", "Penyisipan", "Penghapusan"], [
    ["Dosen baru tidak bisa dicatat di tabel jadwal karena belum mengajar kelas mana pun", "Penyisipan"],
    ["Nomor HP mahasiswa berubah dan harus diperbarui di semua baris KRS-nya", "Pengubahan"],
    ["Menghapus kelas terakhir seorang dosen menghilangkan data dosen itu", "Penghapusan"],
    ["Harga produk diperbarui di sebagian baris penjualan saja", "Pengubahan"]
  ]),
  A("Ketergantungan Fungsional", `<p><strong>Ketergantungan fungsional</strong> (functional dependency, ditulis A → B) berarti: kalau nilai kolom A diketahui, nilai kolom B pasti bisa ditentukan. A disebut <em>penentu</em> (determinan).</p>
<p>Pada tabel gabungan ada tiga penentu: id_pinjam, id_buku, dan id_anggota. Artinya tabel itu sebenarnya berisi tiga kelompok keterangan. Normalisasi hanyalah memisahkan kelompok-kelompok itu ke tabel masing-masing.</p>
<p>➕ Cara mengujinya: cari dua baris dengan nilai A yang sama. Jika nilai B-nya bisa berbeda, A tidak menentukan B. Contoh: dua anggota bernama “Ahmad Fauzi” bisa punya id berbeda, jadi nama ↛ id_anggota.</p>`, "Bagian 2"),
  fd,
  A("Tiga Tahap Normalisasi", `<p><strong>1NF</strong>: setiap sel satu nilai, tanpa kelompok kolom berulang (telepon1, telepon2, telepon3 juga melanggar). <strong>2NF</strong>: sudah 1NF dan setiap kolom bukan kunci bergantung pada <em>seluruh</em> kunci primer. <strong>3NF</strong>: sudah 2NF dan tidak ada kolom bukan kunci yang bergantung pada kolom bukan kunci lain.</p>
<p>Ibarat membereskan laci campur aduk: satu kartu satu perkara (1NF), pindahkan kartu milik laci sebelah (2NF), lalu periksa sisa keterangan milik laci lain (3NF).</p>
<p>➕ Di atas 3NF masih ada BCNF, 4NF, dan 5NF, tetapi untuk hampir semua basis data sehari-hari 3NF sudah cukup (sesuai modul).</p>`, "Bagian 3"),
  parsialTransitif,
  tahap,
  { type: "table", label: "Tabel Interaktif", title: "Praktik Terpandu Modul: Tabel yang Belum Normal", mono: true, headers: ["id_pinjam", "id_buku", "judul", "id_anggota", "nama_anggota", "tgl_pinjam"],
    rows: [["PJ0011", "BK003, BK005", "Jaringan Kom., Statistika", "AG002", "Nur Aisyah", "2026-11-02"], ["PJ0012", "BK003", "Jaringan Komputer Dasar", "AG004", "Dimas Prayoga", "2026-11-03"], ["PJ0013", "BK005", "Statistika untuk Inform.", "AG002", "Nur Aisyah", "2026-11-05"]],
    modes: [{ label: "1. Sel ganda", target: "cell", row: 0, col: 1, title: "Melanggar 1NF", text: "Pecah menjadi dua baris (BK003 dan BK005)." },
      { label: "3. Pengulangan", target: "col", col: 4, title: "Nur Aisyah dua kali", text: "Judul BK003 dan BK005 juga akan berulang setelah 1NF. ➕ Perhatikan pula judul yang disingkat (“Jaringan Kom.”) di baris 1: bukti nyata anomali pengubahan, satu buku ditulis dengan dua cara." },
      { label: "5. Hasil", target: "none", title: "Skema akhir", text: "buku(id_buku, judul) • anggota(id_anggota, nama_anggota) • peminjaman(id_pinjam, id_buku*, id_anggota*, tgl_pinjam) → sama dengan P4." }] },
  tip("➕ Kolom hitungan (derived)", "Kolom seperti <code>total = hari_telat × tarif</code> atau <code>umur</code> dari tanggal lahir tidak perlu disimpan. Hitung saat ditampilkan: <code>SELECT id_denda, hari_telat * tarif AS total FROM denda;</code> Modul menggolongkannya pelanggaran 3NF karena total bergantung pada kolom bukan kunci."),
  rv("Cek Pemahaman Modul", "Jawab Dulu, Baru Buka", [
    { prompt: "Sebutkan tiga anomali + contoh perpustakaan.", answer: "Pengubahan: dua judul • Penyisipan: buku baru tak bisa dicatat • Penghapusan: keterangan buku ikut hilang", reason: "Ketiganya akibat redundansi." },
    { prompt: "Tulis satu ketergantungan fungsional pada tabel buku.", answer: "id_buku → judul, pengarang, tahun, stok", reason: "" },
    { prompt: "harga_satuan, jumlah, total: melanggar apa, perbaikannya?", answer: "3NF; hapus total, hitung saat diperlukan", reason: "total bergantung pada kolom bukan kunci." },
    { prompt: "Mengapa hasil normalisasi = hasil ERD P4?", answer: "Keduanya berangkat dari kenyataan yang sama: keterangan apa bergantung pada apa", reason: "Kesamaan hasil menandakan rancangannya benar." }
  ])
];
