// Materi Lengkap Basis Data P5: Normalisasi Data
const ADG = require("./adegan_it.js");
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

const kataKunci = { type: "table", label: "Tabel Interaktif • Kata Kunci Modul", title: "Delapan Istilah yang Sering Muncul di Soal", headers: ["Istilah", "Artinya", "Contoh di perpustakaan"],
  rows: [
    ["Normalisasi", "Memecah satu tabel yang berantakan menjadi beberapa tabel yang rapi", "peminjaman_kacau dipecah jadi buku, anggota, peminjaman"],
    ["Redundansi", "Keterangan yang sama ditulis berulang di banyak baris", "Judul BK002 tertulis di dua baris"],
    ["Anomali", "Keanehan data yang muncul saat data ditambah, diubah, atau dihapus", "Satu buku punya dua judul berbeda"],
    ["Ketergantungan fungsional", "Nilai satu kolom sudah bisa ditentukan dari kolom lain", "Tahu id_buku → pasti tahu judulnya"],
    ["1NF", "Setiap sel hanya berisi satu nilai", "Sel “BK003, BK005” dipecah jadi dua baris"],
    ["2NF", "Setiap kolom bergantung pada seluruh kunci, bukan sebagiannya", "judul pindah ke tabel buku"],
    ["3NF", "Tidak ada kolom yang bergantung pada kolom bukan kunci", "nama_prodi pindah ke tabel prodi"],
    ["Kunci gabungan", "Kunci primer yang terdiri dari dua kolom atau lebih", "(nim, kode_matkul) pada tabel nilai"]
  ],
  modes: [
    { label: "Redundansi vs anomali", target: "row", row: 2, title: "Sebab dan akibat", text: "Redundansi adalah <strong>penyebab</strong> (data ditulis berulang). Anomali adalah <strong>akibatnya</strong> (data jadi tidak cocok, tidak bisa ditambah, atau ikut terhapus)." },
    { label: "Kunci tamu = FK", target: "none", title: "Istilah yang dipakai modul", text: "Modul menulis <strong>kunci tamu</strong> untuk foreign key (FK): kolom yang menyimpan kunci primer tabel lain supaya dua tabel bisa dihubungkan. Di soal, “Bab 4” sama dengan Pertemuan 4 di Sinau." }
  ] };

const sesudah = { type: "table", label: "Tabel Interaktif", title: "Sebelum dan Sesudah Dinormalkan", headers: ["Anomali", "Sebelum (satu tabel gabungan)", "Sesudah (tabel buku, anggota, peminjaman)"],
  rows: [
    ["Pengubahan", "Judul BK002 diperbaiki di satu baris saja, satu buku jadi punya dua judul", "Judul hanya tersimpan di satu tempat, jadi <strong>tidak mungkin berbeda-beda</strong>"],
    ["Penyisipan", "Buku baru tidak bisa dicatat sebelum ada yang meminjam (ERROR 1364)", "Buku baru langsung dicatat di tabel buku tanpa menunggu peminjaman"],
    ["Penghapusan", "Hapus peminjaman terakhir BK001, keterangan bukunya ikut hilang", "Menghapus peminjaman tidak menyentuh tabel buku sama sekali"]
  ],
  modes: [
    { label: "Manfaat utama", target: "row", row: 0, title: "Satu fakta, satu tempat", text: "Inilah inti normalisasi. Kalau nama anggota koperasi hanya disimpan di tabel anggota, nama itu tidak mungkin tertulis berbeda di tabel lain. Ubah sekali, semua ikut benar." },
    { label: "Soal: anomali apa yang teratasi?", target: "row", row: 2, title: "Hapus transaksi, data produk tetap ada", text: "Kalau soal bilang “menghapus transaksi tanpa menghilangkan keterangan produk”, yang teratasi adalah <strong>anomali penghapusan</strong>." }
  ] };

const kekeliruan = { type: "table", label: "Tabel Interaktif • Kesalahan yang Sering Terjadi", title: "Enam Kekeliruan Saat Menormalkan", headers: ["Kekeliruan", "Akibatnya", "Perbaikannya"],
  rows: [
    ["ERROR 1364 Field 'id_pinjam' doesn't have a default value", "Data baru dipaksa masuk ke tabel gabungan tanpa kunci primer", "Pisahkan keterangan buku ke tabelnya sendiri"],
    ["ERROR 1062 Duplicate entry", "Kunci primer tabel hasil pemecahan masih punya nilai yang berulang", "Pilih kolom yang benar-benar unik sebagai kunci primer"],
    ["Sel berisi banyak nilai dibiarkan", "Tabel belum 1NF, jadi data tidak bisa disaring dan dihitung", "Pecah menjadi baris tersendiri sebelum lanjut ke 2NF"],
    ["Menyimpan kolom hasil hitungan", "Kolom total jadi salah begitu tarif atau jumlah hari berubah", "Hitung saat dibutuhkan, jangan disimpan"],
    ["Memecah tabel tanpa meninggalkan kunci tamu", "Tabel hasil pemecahan tidak bisa dihubungkan kembali", "Sisakan kunci tamu (FK) di tabel yang merujuk"],
    ["Memecah terlalu jauh", "Setiap kolom jadi tabel sendiri, basis data justru sulit dipakai", "Berhenti di 3NF selama tidak ada anomali tersisa"]
  ],
  modes: [
    { label: "Ada pesan error", target: "row", row: 0, title: "Hanya dua baris pertama yang memunculkan pesan", text: "ERROR 1364 dan ERROR 1062 benar-benar muncul di layar. Empat kekeliruan lainnya <strong>diam-diam</strong>: tidak ada pesan apa pun, jadi harus dikenali sendiri." },
    { label: "Sel banyak nilai", target: "row", row: 2, title: "Kenapa tidak bisa disaring?", text: "Kalau sel berisi “nasi goreng, es teh, kerupuk”, perintah “tampilkan pesanan es teh” atau “hitung berapa es teh terjual” tidak bisa bekerja dengan benar, karena tiga menu bercampur dalam satu isian." },
    { label: "Lupa kunci tamu", target: "row", row: 4, title: "Contoh: hotel", text: "Tabel pemesanan hotel dipecah jadi tamu dan kamar, tetapi tabel pemesanan tidak menyimpan id_tamu. Akibatnya tidak ada yang tahu kamar itu dipesan siapa." },
    { label: "Terlalu jauh", target: "row", row: 5, title: "Pecah secukupnya", text: "Normalisasi bukan berarti makin banyak tabel makin baik. Kalau judul, pengarang, dan tahun dipisah ke tabel masing-masing, setiap kali ingin melihat satu buku harus menggabungkan banyak tabel." }
  ] };

module.exports = [
  kataKunci,
  A("Mengapa Tabel Harus Dipecah?", `<p>Pertemuan 4 menghasilkan tiga tabel: buku, anggota, dan peminjaman. Mungkin muncul pertanyaan: kenapa tidak satu tabel saja supaya praktis?</p>
<p>Coba bayangkan tabel <code>peminjaman_kacau</code> yang memuat data peminjaman, buku, dan anggota sekaligus. Setiap kali BK002 dipinjam, judul dan pengarangnya ditulis lagi. Keadaan ini disebut <strong>redundansi</strong>: keterangan yang sama ditulis berulang.</p>
<p>Modul memakai perumpamaan <strong>petugas yang menyalin ulang seluruh keterangan buku ke setiap slip peminjaman</strong>. Sepuluh peminjaman berarti sepuluh salinan. Kalau judulnya ternyata salah cetak, kesepuluh slip itu harus dicari dan dikoreksi satu per satu, dan mudah sekali ada yang terlewat.</p>
<p>Masalah utamanya bukan boros tempat, tetapi <strong>data jadi mudah salah</strong>.</p>`, "Bagian 1"),
  anomali,
  ex("Latihan Interaktif", "Anomali Apa Ini?", ["Keadaan", "Anomali"], ["Pengubahan", "Penyisipan", "Penghapusan"], [
    ["Klinik tidak bisa mendaftarkan dokter baru sebelum dokter itu menangani pasien", "Penyisipan"],
    ["Nomor HP mahasiswa berubah dan harus diperbarui di semua baris KRS-nya", "Pengubahan"],
    ["Menghapus kelas terakhir seorang dosen ikut menghapus data dosen itu", "Penghapusan"],
    ["Harga produk diperbarui di sebagian baris penjualan saja", "Pengubahan"],
    ["Prodi baru tidak bisa didaftarkan sebelum ada anggota dari prodi itu", "Penyisipan"]
  ]),
  tip("Kenapa anomali berbahaya?", "Ketiga anomali <strong>tidak memunculkan pesan error</strong>. Bagi komputer, perintahnya sah. Datanya sudah salah, tetapi tidak ada yang memperingatkan, sehingga kesalahan baru ketahuan lama kemudian.", "warn"),
  A("Ketergantungan Fungsional", `<p><strong>Ketergantungan fungsional</strong> artinya: <em>kalau nilai kolom A diketahui, nilai kolom B pasti bisa ditentukan</em>. Ditulis A → B, dan A disebut <strong>penentu</strong>.</p>
<p>Contoh pada tabel gabungan perpustakaan:</p>
<ul class="list-disc pl-5 space-y-1"><li>Kalau <code>id_buku</code> = BK002 diketahui, judul dan pengarang pasti bisa ditentukan. Jadi id_buku → judul, pengarang.</li>
<li>Kalau <code>id_anggota</code> = AG001 diketahui, nama dan prodi pasti bisa ditentukan. Jadi id_anggota → nama, prodi.</li>
<li>Kalau <code>id_pinjam</code> diketahui, tanggal pinjamnya pasti bisa ditentukan. Jadi id_pinjam → tgl_pinjam.</li></ul>
<p>Tiga kalimat itu menunjukkan bahwa tabel gabungan sebenarnya berisi <strong>tiga kelompok keterangan</strong>, dan tiap kelompok punya penentunya sendiri. Normalisasi tinggal memisahkan tiap kelompok ke tabelnya masing-masing.</p>
<p>Cara mengecek: tanyakan “kalau saya tahu kolom ini, apakah kolom itu pasti ketahuan?”. Nama anggota tidak menentukan id_anggota, karena dua orang bisa bernama sama.</p>`, "Bagian 2"),
  fd,
  ex("Latihan Interaktif", "Kolom Ini Ditentukan oleh Apa?", ["Kolom", "Penentunya"], null, [
    ["judul dan pengarang (tabel gabungan perpustakaan)", "id_buku", "✓ Keterangan buku ditentukan nomor bukunya.", ["id_pinjam", "id_buku", "id_anggota", "tgl_pinjam"]],
    ["tgl_pinjam (tabel gabungan perpustakaan)", "id_pinjam", "✓ Tanggal dicatat per peristiwa peminjaman.", ["id_pinjam", "id_buku", "id_anggota", "judul"]],
    ["nama_anggota dan prodi", "id_anggota", "✓", ["id_pinjam", "id_buku", "id_anggota", "nama_anggota"]],
    ["alamat_sekolah (tabel pendaftaran lomba)", "asal_sekolah", "✓ Alamat ikut sekolahnya, bukan pesertanya. Ini pelanggaran 3NF.", ["nama_peserta", "asal_sekolah", "tanggal_daftar", "nama_lomba"]],
    ["nama_divisi (tabel karyawan)", "kode_divisi", "✓ Pindahkan nama_divisi ke tabel divisi.", ["id_karyawan", "kode_divisi", "nama_karyawan", "gaji"]]
  ]),
  A("Tiga Tahap Normalisasi", `<p>Normalisasi dikerjakan bertahap. Setiap tahap punya satu syarat, dan tabel harus lolos tahap sebelumnya dulu. Modul menyebut <strong>tiga tahap ini sudah cukup</strong> untuk hampir semua basis data sehari-hari.</p>
<ul class="list-disc pl-5 space-y-1"><li><strong>1NF (bentuk normal pertama)</strong>: setiap sel berisi <strong>satu nilai</strong>, dan tidak ada kelompok kolom berulang (telepon1, telepon2, telepon3). Cara: pecah sel yang berisi banyak nilai menjadi baris tersendiri.</li>
<li><strong>2NF</strong>: sudah 1NF, dan setiap kolom bukan kunci bergantung pada <strong>seluruh</strong> kunci primer, bukan sebagiannya. Syarat ini baru terasa kalau kuncinya <strong>kunci gabungan</strong>. Contoh: tabel nilai dengan kunci (nim, kode_matkul) tetapi ada kolom nama_mahasiswa. Nama cukup ditentukan nim saja, tanpa kode_matkul, jadi tabel ini melanggar 2NF. Cara: pindahkan nama_mahasiswa ke tabel mahasiswa.</li>
<li><strong>3NF</strong>: sudah 2NF, dan tidak ada kolom bukan kunci yang bergantung pada kolom bukan kunci <strong>lain</strong>. Contoh: tabel karyawan berisi kode_divisi dan nama_divisi. nama_divisi ditentukan kode_divisi, bukan oleh id_karyawan. Cara: pindahkan nama_divisi ke tabel divisi.</li></ul>
<p>Tiga pertanyaan pemandu: (1) adakah sel berisi banyak nilai? (2) adakah kolom yang cukup ditentukan sebagian kunci? (3) adakah kolom yang ditentukan kolom biasa?</p>
<p>Nama teknisnya: kolom yang hanya bergantung pada sebagian kunci disebut <strong>ketergantungan parsial</strong> (dibuang di 2NF), dan kolom yang bergantung lewat kolom perantara disebut <strong>ketergantungan transitif</strong> (dibuang di 3NF). Di atas 3NF masih ada BCNF dan 4NF, tetapi tidak dibahas di modul.</p>`, "Bagian 3"),
  parsialTransitif,
  tahap,
  ADG.bdNormal,
  { type: "table", label: "Tabel Interaktif", title: "Praktik Terpandu Modul: Tabel yang Belum Normal", mono: true, headers: ["id_pinjam", "id_buku", "judul", "id_anggota", "nama_anggota", "tgl_pinjam"],
    rows: [["PJ0011", "BK003, BK005", "Jaringan Kom., Statistika", "AG002", "Nur Aisyah", "2026-11-02"], ["PJ0012", "BK003", "Jaringan Komputer Dasar", "AG004", "Dimas Prayoga", "2026-11-03"], ["PJ0013", "BK005", "Statistika untuk Inform.", "AG002", "Nur Aisyah", "2026-11-05"]],
    modes: [{ label: "1. Sel ganda", target: "cell", row: 0, col: 1, title: "Melanggar 1NF", text: "Pecah menjadi dua baris (BK003 dan BK005)." },
      { label: "2. Pengulangan", target: "col", col: 4, title: "Nur Aisyah ditulis dua kali", text: "Judul BK003 dan BK005 juga akan berulang setelah 1NF. Lihat juga judul yang disingkat (“Jaringan Kom.”) di baris 1: satu buku ditulis dengan dua cara, contoh nyata anomali pengubahan." },
      { label: "3. Pola kalimat", target: "none", title: "Tulis ketergantungannya", text: "Pola yang diminta modul: <em>kalau kolom ini diketahui, kolom itu pasti bisa ditentukan</em>. Contoh: kalau id_buku diketahui, judul pasti bisa ditentukan." },
      { label: "4. Hasil", target: "none", title: "Skema akhir", text: "buku(id_buku, judul) • anggota(id_anggota, nama_anggota) • peminjaman(id_pinjam, id_buku*, id_anggota*, tgl_pinjam). Tanda * = kunci tamu. Hasilnya sama dengan Pertemuan 4." }] },
  A("Setelah Dinormalkan", `<p>Modul menjalankan ulang ketiga percobaan pada tiga tabel hasil normalisasi, dan ketiga anomali hilang. Kuncinya satu: <strong>setiap fakta hanya disimpan di satu tempat</strong>.</p>`, "Bagian 4"),
  sesudah,
  A("Normalisasi dan ERD: Dua Jalan, Satu Hasil", `<p>Hasil normalisasi tabel perpustakaan adalah <strong>tiga tabel yang sama persis</strong> dengan hasil mengubah ERD menjadi tabel di Pertemuan 4. Ini bukan kebetulan. Keduanya berangkat dari pertanyaan yang sama: keterangan apa bergantung pada apa.</p>
<p>Bedanya ada di <strong>waktunya</strong>. Modul memakai perumpamaan lemari:</p>
<ul class="list-disc pl-5 space-y-1"><li><strong>ERD</strong> = menggambar denah <em>sebelum</em> lemarinya diisi. Dipakai saat merancang dari nol.</li>
<li><strong>Normalisasi</strong> = merapikan lemari yang <em>sudah telanjur berantakan</em>. Dipakai untuk membenahi tabel yang sudah ada.</li></ul>
<p>Keduanya menghasilkan susunan laci yang sama. Normalisasi tidak dikerjakan otomatis oleh DBMS, dan bisa dipakai untuk basis data kecil maupun besar.</p>`, "Bagian 5"),
  kekeliruan,
  tip("Kolom hasil hitungan", "Kolom seperti <code>total = hari_telat × tarif</code> atau <code>total = harga_satuan × jumlah</code> tidak perlu disimpan, karena bisa dihitung kapan saja. Kalau disimpan, total jadi salah begitu tarif atau jumlahnya berubah. Hitung saat ditampilkan: <code>SELECT hari_telat * tarif AS total FROM denda;</code> Modul menggolongkannya pelanggaran 3NF, karena total bergantung pada kolom yang bukan kunci."),
  rv("Cek Pemahaman Modul", "Jawab Dulu, Baru Buka", [
    { prompt: "Sebutkan tiga anomali beserta contohnya di perpustakaan.", answer: "Pengubahan: dua judul • Penyisipan: buku baru tak bisa dicatat • Penghapusan: keterangan buku ikut hilang", reason: "Ketiganya akibat redundansi." },
    { prompt: "Mengapa anomali pengubahan lebih berbahaya daripada pesan error biasa?", answer: "Karena tidak ada pesan apa pun", reason: "Data sudah salah tanpa ada yang memperingatkan." },
    { prompt: "Tulis satu ketergantungan fungsional pada tabel buku.", answer: "Kalau id_buku diketahui, judul, pengarang, tahun, dan stok pasti bisa ditentukan", reason: "" },
    { prompt: "harga_satuan, jumlah, total: melanggar apa, dan perbaikannya?", answer: "3NF; hapus total, hitung saat diperlukan", reason: "total bergantung pada kolom bukan kunci." },
    { prompt: "Mengapa hasil normalisasi sama dengan hasil ERD Pertemuan 4?", answer: "Keduanya berangkat dari kenyataan yang sama: keterangan apa bergantung pada apa", reason: "Kesamaan hasil menandakan rancangannya benar." }
  ])
];
