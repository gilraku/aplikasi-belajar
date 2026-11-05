// Dasar-dasar Sistem Informasi — Pertemuan 1: Konsep Sistem (sumber: modul BAB 1)
const KAR = ["Boundary", "Input", "Processing", "Output", "Control", "Feedback"];
const KAR7 = ["Boundary", "Input", "Processing", "Output", "Control", "Feedback", "Lingkungan luar"];
// [soal, opsi(5), jawaban, pembahasan, alasan tiap opsi]
const Q = [
  ["Set elemen atau beberapa komponen yang saling berinteraksi untuk mencapai sebuah tujuan tertentu disebut …", ["Sistem", "Komponen", "Processing", "Elemen", "Feedback"], 0, "Definisi McLeod (2003) di modul. <em>(Latihan 2 modul no. 1)</em>", ["Benar.", "Komponen hanya bagian dari sistem.", "Processing salah satu karakteristik.", "Elemen = bagian, bukan keseluruhan.", "Feedback salah satu karakteristik."]],
  ["Berikut ini adalah karakteristik sistem, KECUALI …", ["Inputs", "Outputs", "Processing", "Elemen", "Feedbacks"], 3, "Enam karakteristik di modul: boundary, inputs, outputs, controls, feedback, processing. <em>(Latihan 2 no. 2)</em>", ["Karakteristik.", "Karakteristik.", "Karakteristik.", "Benar, “elemen” bukan salah satu dari 6 karakteristik di modul.", "Karakteristik."]],
  ["Berikut ini adalah cara mempelajari suatu sistem, KECUALI …", ["Menyepakati batas-batas (boundaries)", "Melihat elemen-elemen yang interaksinya sangat intens", "Mempelajari semua elemen sistem", "Melihat elemen yang interaksinya lebih tunduk pada aturan sistem", "Melihat sedikit saja elemen yang terlibat"], 4, "Cara ke-2 justru menuntut <strong>semua</strong> elemen dipelajari, tidak boleh ada yang dibuang. <em>(Latihan 2 no. 3)</em>", ["Cara 1.", "Bagian dari cara 1 (menentukan batas).", "Cara 2.", "Bagian dari cara 1.", "Benar, bertentangan dengan cara 2."]],
  ["Processing bisa didefinisikan sebagai karakteristik sistem yang bertugas …", ["Memasukkan data atau informasi", "Melakukan pengawasan untuk menghasilkan keluaran", "Melakukan pengolahan terhadap masukan untuk menghasilkan keluaran", "Melakukan umpan balik positif atau negatif", "Membatasi kegiatan yang berlangsung"], 2, "<em>(Latihan 2 no. 4)</em>", ["Itu input.", "Itu control.", "Benar.", "Itu feedback.", "Itu boundary."]],
  ["Pengertian umpan balik yang paling sesuai dengan modul adalah …", ["Umpan balik negatif bertujuan mengurangi penyimpangan dari jalur standar sistem yang dapat menghambat pencapaian tujuan", "Umpan balik positif bertujuan menambah gerak sistem dari jalur standar sistem", "Umpan balik positif bertujuan menguatkan tujuan standar yang ditetapkan", "Umpan balik negatif bertujuan mengurangi hambatan standar sistem", "Keduanya sama-sama bertujuan menyelesaikan tugas"], 0, "Kalimat opsi A identik dengan definisi modul. <em>(Latihan 2 no. 5)</em>", ["Benar.", "Kalimatnya tidak lengkap/keliru.", "Kurang tepat: positif = menambah kekuatan gerak sistem.", "Bukan rumusan modul.", "Terlalu umum, tidak membedakan."]],
  ["Batas yang memisahkan sistem dengan sistem lain atau dengan lingkungan luarnya disebut …", ["Interface", "Boundary", "Control", "Environment", "Input"], 1, "Boundary juga menentukan ruang lingkup dan kemampuan sistem.", ["➕ Interface = penghubung antar subsistem.", "Benar.", "Pengawasan.", "➕ Lingkungan luar ada di luar batas.", "Masukan."]],
  ["Dalam sistem informasi, contoh input menurut modul adalah …", ["Laporan tercetak", "Data transaksi, data non-transaksi, dan instruksi", "Saran untuk manajer", "Monitor dan printer", "Pengawasan fungsi perencanaan"], 1, "Output SI berupa informasi, saran, laporan tercetak.", ["Itu output.", "Benar.", "Output.", "Perangkat output, bukan input SI.", "Control."]],
  ["Manajer melihat penjualan bulan ini turun 20% dari target, lalu menambah promosi agar kembali ke target. Mekanisme ini adalah …", ["Umpan balik positif", "Umpan balik negatif", "Boundary", "Input", "Output"], 1, "Tujuannya <strong>mengurangi penyimpangan</strong> dari standar (target) → negatif.", ["Positif menambah kekuatan gerak, bukan mengoreksi penyimpangan.", "Benar.", "Bukan batas.", "Bukan.", "Bukan."]],
  ["Penjualan naik karena promo viral, lalu perusahaan memperbesar promo agar pertumbuhan makin cepat. Mekanisme ini adalah …", ["Umpan balik negatif", "Umpan balik positif", "Control", "Boundary", "Processing"], 1, "Menambah kekuatan gerak sistem untuk menguatkan pencapaian tujuan.", ["Negatif = mengoreksi penyimpangan.", "Benar.", "Kurang spesifik.", "Bukan.", "Bukan."]],
  ["Kegiatan mengamati dan mengawasi pelaksanaan mekanisme pengelolaan sistem informasi disebut …", ["Feedback", "Controls", "Processing", "Boundary", "Outputs"], 1, "Contoh: mengawasi fungsi perencanaan informasi, koordinasi, transformasi.", ["Bukan.", "Benar.", "Bukan.", "Bukan.", "Bukan."]],
  ["Pada sistem perpustakaan kampus, “buku dan anggota yang didaftarkan petugas” berperan sebagai …", ["Output", "Input", "Feedback", "Boundary", "Control"], 1, "Data yang masuk untuk diolah = input.", ["Output = laporan peminjaman, dll.", "Benar.", "Bukan.", "Bukan.", "Bukan."]],
  ["➕ Menurut definisi McLeod, tiga kata kunci sebuah sistem adalah …", ["Elemen, interaksi, tujuan", "Hardware, software, brainware", "Data, informasi, pengetahuan", "Input, output, laporan", "Boundary, control, feedback"], 0, "“Satu set elemen yang saling berinteraksi untuk mencapai tujuan.”", ["Benar.", "Komponen komputer (P6).", "P2.", "Kurang lengkap.", "Karakteristik, bukan definisi."]]
];

module.exports = {
  id: "p1",
  nomor: 1,
  judul: "Konsep Sistem",
  ujian: "CPMK 1",
  hero: {
    badge: "Materi 1 • Dasar-dasar SI",
    title: "Sistem = Elemen yang Saling Berinteraksi untuk Satu Tujuan",
    text: "Pahami <strong>definisi sistem</strong>, <strong>6 karakteristik</strong> (boundary, input, processing, output, control, feedback), <strong>2 jenis umpan balik</strong>, dan <strong>2 cara mempelajari sistem</strong>. Materi ini dipakai terus sampai P7."
  },
  cheatsheet: [
    {
      type: "callout",
      label: "Interaktif 1 • Definisi",
      tone: "info",
      heading: "Apa itu Sistem?",
      html: "<strong>McLeod (2003):</strong> sistem adalah <strong>satu set elemen</strong> atau komponen yang <strong>saling berinteraksi</strong> untuk mencapai <strong>tujuan tertentu</strong>.<br><br>Modul menambahkan: sistem adalah <em>konsep</em> untuk memudahkan pemahaman, sehingga perlu <strong>kesepakatan</strong> tentang komponen/elemen, hubungan antar elemen, dan batas-batasnya (boundaries). Sistem punya <strong>identitas pembeda</strong>.<br><br>💡 Kata kunci yang sering keluar di soal: <strong>elemen • interaksi • tujuan</strong>."
    },
    {
      type: "table",
      label: "Interaktif 2 • 6 Karakteristik Sistem",
      title: "Model Sistem Secara Umum (Gambar 1.1)",
      headers: ["Karakteristik", "Arti", "Contoh di SI akademik kampus"],
      rows: [
        ["Boundary (batasan)", "Pemisah sistem dengan sistem lain / lingkungan luar; menentukan ruang lingkup & kemampuan sistem", "SIAKAD hanya mengurus KRS & nilai, bukan keuangan"],
        ["Inputs (masukan)", "Yang dimasukkan ke sistem: <strong>data transaksi, data non-transaksi, instruksi</strong>", "Mahasiswa mengisi KRS, dosen menginput nilai"],
        ["Processing (proses)", "Mengolah masukan menjadi keluaran yang diharapkan", "Menghitung IPK, mengecek bentrok jadwal"],
        ["Outputs (keluaran)", "Hasil pemrosesan yang dipakai pengguna: <strong>informasi, saran, laporan tercetak</strong>", "KHS, transkrip, peringatan IPK rendah"],
        ["Controls (kendali)", "Mengamati/mengawasi mekanisme pengelolaan (perencanaan informasi, koordinasi, transformasi)", "Validasi: KRS tidak boleh melebihi 24 SKS"],
        ["Feedback (umpan balik)", "Informasi hasil yang dikembalikan untuk memperbaiki/menguatkan sistem: <strong>negatif</strong> & <strong>positif</strong>", "IPK turun → batas SKS semester depan dikurangi"]
      ],
      modes: [
        { label: "Alur", target: "none", title: "Urutan berpikirnya", text: "<strong>Input → Processing → Output</strong>, diawasi <strong>Control</strong>, hasilnya dikembalikan lewat <strong>Feedback</strong>, semuanya berada di dalam <strong>Boundary</strong>." },
        { label: "➕ Koreksi modul", target: "row", row: 1, title: "Definisi “input” di modul tercampur", text: "Modul menulis input sebagai “bagian sistem <em>mikroprosesor</em> untuk menghubungkan perangkat luar dengan komputer”. Itu definisi <strong>perangkat input/port I/O</strong> pada komputer, bukan input sistem secara umum. Untuk konsep sistem, pakai: <strong>input = segala sesuatu yang dimasukkan ke sistem untuk diolah</strong> (data transaksi, non-transaksi, instruksi)." },
        { label: "Jebakan", target: "row", row: 4, title: "Control ≠ Feedback", text: "<strong>Control</strong> = mengawasi saat sistem berjalan. <strong>Feedback</strong> = hasil/keluaran yang <em>dikembalikan</em> sebagai bahan perbaikan. Di soal, kata “mengamati/mengawasi” → control; “dikembalikan/umpan” → feedback." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 3 • Dua Jenis Umpan Balik",
      title: "Saklar: Umpan Balik <strong>Negatif</strong> vs <strong>Positif</strong>",
      desc: "Klik untuk membandingkan:",
      style: "toggle",
      options: [
        { label: "Umpan balik negatif", tone: "rose", badge: "Mengoreksi", title: "Mengurangi penyimpangan dari jalur standar",
          text: "Bertujuan <strong>mengurangi penyimpangan-penyimpangan</strong> dari jalur standar sistem yang dapat <strong>menghambat</strong> pencapaian tujuan.",
          note: "Contoh: termostat AC menyala saat suhu melewati 24°C; nilai UTS di bawah KKM → remedial." },
        { label: "Umpan balik positif", tone: "emerald", badge: "Menguatkan", title: "Menambah kekuatan gerak sistem",
          text: "Digunakan untuk <strong>menambah kekuatan gerak sistem</strong> agar <strong>menguatkan pencapaian tujuan</strong>.",
          note: "Contoh: produk laris → stok dan iklan ditambah; ulasan bagus → makin banyak pembeli." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "list",
          label: "Interaktif 4 • Cara Mempelajari Sistem",
          title: "2 Cara (Modul)",
          groups: [{ ordered: true, tone: "indigo", items: [
            "<strong>Menentukan/menyepakati batas (boundaries)</strong> lebih dulu: lihat elemen yang interaksinya <strong>sangat intens</strong>, atau elemen yang <strong>lebih tunduk pada aturan</strong> sistem.",
            "<strong>Mempelajari semua elemen</strong> beserta interaksinya. <strong>Tidak boleh ada elemen yang dibuang</strong> demi penyederhanaan (<em>simplification</em>)."
          ] }]
        },
        {
          type: "callout",
          label: "Jebakan Soal",
          tone: "warn",
          heading: "Opsi “kecuali” yang sering muncul",
          html: "“Melihat <strong>sedikit saja</strong> elemen yang terlibat” <strong>bukan</strong> cara mempelajari sistem, karena cara ke-2 menuntut <strong>semua</strong> elemen dipelajari."
        }
      ]
    },
    {
      type: "cards",
      label: "➕ Tambahan • Karakteristik Versi Lain",
      title: "Buku Lain (Jogiyanto) Memakai 8 Karakteristik",
      desc: "Tidak ada di modul, tetapi sering muncul di soal SI. Hafalkan versi modul (6) untuk ujian, kenali versi ini supaya tidak bingung.",
      cols: 2,
      items: [
        { badge: "Komponen", tone: "indigo", title: "Components", text: "Elemen/subsistem yang membentuk sistem." },
        { badge: "Batas", tone: "sky", title: "Boundary", text: "Sama dengan modul." },
        { badge: "Lingkungan", tone: "amber", title: "Environment", text: "Apa pun di luar batas yang memengaruhi sistem (bisa menguntungkan atau merugikan). Contoh: regulasi pemerintah, pesaing." },
        { badge: "Penghubung", tone: "violet", title: "Interface", text: "Media penghubung antar subsistem agar sumber daya bisa mengalir." },
        { badge: "I-P-O", tone: "emerald", title: "Input, Process, Output", text: "Sama dengan modul." },
        { badge: "Tujuan", tone: "rose", title: "Objective / Goal", text: "Sistem tanpa tujuan tidak ada gunanya. Ini sejalan dengan definisi McLeod." }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Sistem Terbuka vs Tertutup",
      tone: "tip",
      heading: "Klasifikasi singkat",
      html: "<ul><li><strong>Sistem terbuka</strong>: berinteraksi dengan lingkungan luar (menerima input & mengeluarkan output). Hampir semua sistem informasi organisasi adalah sistem terbuka.</li><li><strong>Sistem tertutup</strong>: tidak berinteraksi dengan lingkungan (secara teori).</li><li><strong>Subsistem</strong>: sistem kecil di dalam sistem yang lebih besar, misalnya subsistem keuangan di dalam sistem kampus.</li></ul>"
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Bedah Sistem Minimarket",
      title: "Ini Karakteristik yang Mana?",
      desc: "Sistem kasir minimarket. Pilih karakteristik yang paling tepat.",
      headers: ["Bagian", "Karakteristik"],
      rows: [
        { cells: ["Kasir memindai barcode barang belanjaan"], fields: [{ options: KAR, answer: "Input" }], ok: "✓ Data transaksi masuk." },
        { cells: ["Komputer menjumlahkan harga dan menghitung diskon"], fields: [{ options: KAR, answer: "Processing" }], ok: "✓" },
        { cells: ["Struk belanja dicetak"], fields: [{ options: KAR, answer: "Output" }], ok: "✓ Laporan tercetak." },
        { cells: ["Supervisor memeriksa selisih uang laci kasir setiap pergantian shift"], fields: [{ options: KAR, answer: "Control" }], ok: "✓ Mengawasi." },
        { cells: ["Laporan barang hampir habis dipakai untuk menambah pesanan stok"], fields: [{ options: KAR, answer: "Feedback" }], ok: "✓ Output dikembalikan untuk perbaikan." },
        { cells: ["Sistem kasir tidak mengurus penggajian karyawan"], fields: [{ options: KAR, answer: "Boundary" }], ok: "✓ Ruang lingkup." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Bedah Sistem Kuliah Online (PJJ)",
      title: "Sistem yang Kamu Pakai Sehari-hari",
      headers: ["Bagian", "Karakteristik"],
      rows: [
        { cells: ["Mahasiswa mengunggah tugas ke LMS"], fields: [{ options: KAR7, answer: "Input" }], ok: "✓" },
        { cells: ["LMS menghitung nilai kuis otomatis"], fields: [{ options: KAR7, answer: "Processing" }], ok: "✓" },
        { cells: ["Rekap nilai tampil di halaman mahasiswa"], fields: [{ options: KAR7, answer: "Output" }], ok: "✓" },
        { cells: ["Kuis hanya bisa dikerjakan satu kali dan dibatasi waktu"], fields: [{ options: KAR7, answer: "Control" }], ok: "✓ Aturan pengendali." },
        { cells: ["Banyak mahasiswa gagal di satu topik → dosen menambah video penjelasan"], fields: [{ options: KAR7, answer: "Feedback" }], ok: "✓ Negatif: mengurangi penyimpangan dari target belajar." },
        { cells: ["Koneksi internet rumah mahasiswa dan kebijakan kementerian"], fields: [{ options: KAR7, answer: "Lingkungan luar" }], ok: "✓ ➕ Di luar batas, tapi memengaruhi sistem." }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • Negatif atau Positif?",
      title: "Tebak Jenis Umpan Baliknya",
      items: [
        { prompt: "Suhu kulkas naik → kompresor menyala sampai suhu kembali 4°C", answer: "Negatif", reason: "Mengembalikan ke standar." },
        { prompt: "Video makin banyak ditonton → algoritma makin sering merekomendasikannya", answer: "Positif", reason: "Memperkuat gerak ke arah yang sama." },
        { prompt: "Absensi karyawan sering telat → HRD memberi teguran", answer: "Negatif", reason: "Mengurangi penyimpangan dari aturan." },
        { prompt: "Toko online dapat rating 5 → makin dipercaya → penjualan makin naik", answer: "Positif", reason: "Menguatkan pencapaian tujuan." }
      ]
    }
  ],
  flashcards: [
    { tag: "Definisi", q: "Definisi sistem menurut McLeod (2003)?", a: "Satu set elemen/komponen yang saling berinteraksi untuk mencapai tujuan tertentu." },
    { tag: "Definisi", q: "Apa yang perlu disepakati saat membuat konsep sistem?", a: "Komponen/elemen, hubungan antar elemen, dan batas-batas (boundaries)." },
    { tag: "Karakteristik", q: "6 karakteristik sistem (modul)?", a: "Boundary, inputs, outputs, controls, feedback, processing." },
    { tag: "Boundary", q: "Fungsi boundary?", a: "Memisahkan sistem dari sistem lain/lingkungan luar; menentukan kemampuan, konfigurasi, dan ruang lingkup sistem." },
    { tag: "Input", q: "Contoh input pada sistem informasi?", a: "Data transaksi, data non-transaksi, instruksi." },
    { tag: "Output", q: "Contoh output pada sistem informasi?", a: "Informasi, saran, laporan tercetak." },
    { tag: "Control", q: "Apa itu controls?", a: "Kegiatan mengamati/mengawasi pelaksanaan mekanisme pengelolaan SI (perencanaan informasi, koordinasi, transformasi)." },
    { tag: "Feedback", q: "Umpan balik negatif vs positif?", a: "Negatif: mengurangi penyimpangan dari jalur standar. Positif: menambah kekuatan gerak sistem untuk menguatkan pencapaian tujuan." },
    { tag: "Processing", q: "Apa itu processing?", a: "Pengolahan terhadap masukan untuk menghasilkan keluaran yang diharapkan." },
    { tag: "Cara", q: "2 cara mempelajari sistem?", a: "1) Menyepakati batas dulu (elemen yang interaksinya intens / tunduk aturan). 2) Mempelajari semua elemen & interaksinya, tanpa ada yang dibuang." },
    { tag: "➕ Lingkungan", q: "Apa itu lingkungan luar (environment) sistem?", a: "Segala sesuatu di luar batas sistem yang memengaruhi operasi sistem, bisa menguntungkan atau merugikan." },
    { tag: "➕ Interface", q: "Apa itu interface sistem?", a: "Media penghubung antar subsistem sehingga sumber daya bisa mengalir dari satu subsistem ke subsistem lain." }
  ],
  quiz: Q.map(([q, opts, ans, exp, optExp]) => ({ q, opts, ans, exp, optExp })),
  ringkasan: `*RANGKUMAN KILAT CPMK 1 — DASAR-DASAR SI P1*
📚 *Konsep Sistem*

1️⃣ Sistem (McLeod 2003): set elemen yang saling berinteraksi untuk mencapai tujuan. Perlu kesepakatan elemen, hubungan, dan batas.
2️⃣ 6 karakteristik: Boundary • Input (data transaksi, non-transaksi, instruksi) • Processing • Output (informasi, saran, laporan) • Control (mengawasi) • Feedback.
3️⃣ Feedback negatif: mengurangi penyimpangan dari standar. Positif: menambah kekuatan gerak sistem.
4️⃣ Cara mempelajari: (1) sepakati batas dulu, (2) pelajari SEMUA elemen, tanpa dibuang.
➕ Versi lain: + komponen, lingkungan luar, interface, tujuan. Sistem terbuka vs tertutup.`
};
