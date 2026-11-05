// Dasar-dasar Sistem Informasi — Pertemuan 2: Konsep Informasi (sumber: modul BAB 2)
const DIK = ["Data", "Informasi", "Pengetahuan"];
const C5 = ["Kondensasi", "Kontekstualisasi", "Kalkulasi", "Kategorisasi", "Koreksi"];
const KI = ["Accessible", "Accurate", "Complete", "Economical", "Flexible", "Relevant", "Reliable", "Secure", "Simple", "Timely", "Verifiable"];
const Q = [
  ["Data baru bisa memiliki arti atau menjadi informasi setelah ditafsirkan melalui cara-cara berikut, KECUALI …", ["Kalkulasi", "Konsolidasi", "Kontekstualisasi", "Kategorisasi", "Koreksi"], 1, "5K: kondensasi, kontekstualisasi, kalkulasi, kategorisasi, koreksi. <em>(Latihan 2 no. 1)</em>", ["Termasuk.", "Benar, tidak termasuk 5K.", "Termasuk.", "Termasuk.", "Termasuk."]],
  ["Kumpulan keterangan atau fakta, simbol, yang masih mentah disebut …", ["Input", "Data", "Data processing", "Informasi", "Knowledge"], 1, "<em>(Latihan 2 no. 2)</em>", ["Input = istilah sistem (P1).", "Benar.", "Proses, bukan isinya.", "Sudah diolah.", "Hasil pengolahan informasi."]],
  ["Bagian menghilangkan kesalahan-kesalahan yang mungkin terjadi selama proses analisa data disebut …", ["Koreksi", "Kondensasi", "Kalkulasi", "Kontekstualisasi", "Kategorisasi"], 0, "<em>(Latihan 2 no. 3)</em>", ["Benar.", "Meringkas.", "Menganalisa.", "Memahami alasan pengumpulan.", "Mengelompokkan."]],
  ["Hasil pemrosesan data yang telah terkumpul sehingga memiliki arti dalam suatu konteks tertentu adalah …", ["Informasi", "Knowledge", "Informasi terukur", "Data", "Data kontekstual"], 0, "<em>(Latihan 2 no. 4)</em>", ["Benar.", "Hasil pengolahan informasi + pengalaman.", "Bukan istilah modul.", "Masih mentah.", "Bukan istilah modul."]],
  ["Berikut ini karakteristik informasi, KECUALI …", ["Accurate", "Accessible", "Secure", "Simple", "Innovation"], 4, "11 karakteristik di Tabel 2 tidak memuat <em>innovation</em>. <em>(Latihan 2 no. 5)</em>", ["Ada.", "Ada.", "Ada.", "Ada.", "Benar, tidak ada."]],
  ["Proses meringkas data dan menghilangkan kedalaman yang tidak dibutuhkan disebut …", ["Kategorisasi", "Kondensasi", "Koreksi", "Kalkulasi", "Kontekstualisasi"], 1, "Kondensasi = condense = memadatkan.", ["Mengelompokkan.", "Benar.", "Menghapus kesalahan.", "Menganalisa.", "Alasan pengumpulan."]],
  ["Memahami MENGAPA sebuah data dikumpulkan termasuk proses …", ["Kontekstualisasi", "Kondensasi", "Kalkulasi", "Kategorisasi", "Koreksi"], 0, "Kata kunci “alasan pengumpulan data”.", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Laporan investasi yang tidak mencantumkan semua data biaya penting melanggar karakteristik informasi …", ["Accurate", "Complete", "Timely", "Simple", "Secure"], 1, "Contoh yang persis dipakai modul untuk <em>complete</em>.", ["Akurat = bebas error; ini soal kelengkapan.", "Benar.", "Bukan soal waktu.", "Bukan.", "Bukan."]],
  ["Istilah “Garbage In, Garbage Out” berkaitan dengan karakteristik informasi …", ["Accurate", "Economical", "Flexible", "Verifiable", "Relevant"], 0, "Informasi tidak akurat sering berasal dari data input yang tidak akurat.", ["Benar.", "Bukan.", "Bukan.", "Dekat, tapi modul mengaitkan GIGO dengan accurate.", "Bukan."]],
  ["Informasi stok barang yang baru dikirim ke manajer seminggu setelah barang habis melanggar karakteristik …", ["Timely", "Secure", "Simple", "Flexible", "Complete"], 0, "Informasi sudah “basi”.", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bisa saja lengkap, tapi terlambat."]],
  ["Biaya menyediakan data harus sebanding dengan manfaat yang dihasilkan. Ini karakteristik …", ["Economical", "Reliable", "Accessible", "Relevant", "Simple"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Menurut Tabel 1 modul, contoh <strong>data audio</strong> adalah …", ["Gambar grafis", "Gambar bergerak", "Suara, noise, tones", "Angka dan huruf", "Laporan penjualan"], 2, "", ["Data gambar.", "Data video.", "Benar.", "Tabel modul: data “numerik”.", "Itu informasi."]],
  ["Pernyataan yang PALING tepat tentang knowledge (pengetahuan) adalah …", ["Fakta mentah yang dapat diamati", "Hasil pengolahan informasi sehingga bermanfaat, didasarkan pengalaman, persepsi, dan pendapat individu", "Kumpulan simbol tanpa makna", "Data yang telah dikoreksi", "Data dalam bentuk video"], 1, "", ["Itu data.", "Benar.", "Itu data.", "Masih tahap pengolahan data.", "Jenis data."]],
  ["Manakah yang merupakan contoh INFORMASI?", ["Angka 3,45", "“Budi, 20 tahun”", "Rata-rata IPK lulusan Sistem Informasi tahun 2025 adalah 3,45", "Warna mobil merah", "Ukuran sepatu 42"], 2, "Sudah diolah (rata-rata) dan punya konteks (lulusan SI 2025).", ["Data tanpa konteks.", "Data.", "Benar.", "Data.", "Data."]]
];

module.exports = {
  id: "p2",
  nomor: 2,
  judul: "Konsep Informasi",
  ujian: "CPMK 1",
  hero: {
    badge: "Materi 2 • Dasar-dasar SI",
    title: "Data → Informasi → Pengetahuan",
    text: "Bedakan <strong>data</strong>, <strong>informasi</strong>, dan <strong>knowledge</strong>, hafalkan <strong>5K</strong> (cara data menjadi informasi), jenis data, dan <strong>11 karakteristik informasi</strong>."
  },
  cheatsheet: [
    {
      type: "flow",
      label: "Interaktif 1 • Tangga Pengolahan",
      title: "Dari Fakta Mentah Menjadi Bermanfaat",
      items: ["DATA: fakta mentah, belum bermakna", "diolah (5K)", "INFORMASI: terorganisir, bermakna dalam konteks", "diolah + pengalaman", "PENGETAHUAN: bermanfaat"],
      highlight: 2,
      note: "Contoh: <strong>data</strong> “nilai UTS: 80, 65, 90” → <strong>informasi</strong> “rata-rata kelas 78, 1 mahasiswa di bawah KKM” → <strong>pengetahuan</strong> “materi P3 perlu diulang karena banyak yang salah di bagian itu”."
    },
    {
      type: "table",
      label: "Interaktif 2 • Definisi",
      title: "Data vs Informasi vs Knowledge",
      headers: ["Konsep", "Definisi (modul)", "Contoh"],
      rows: [
        ["Data", "Kumpulan keterangan/fakta, simbol, <strong>fakta yang masih mentah</strong>; dapat langsung diamati atau diverifikasi; <strong>tidak memiliki makna melekat</strong>", "Usia, nilai ujian, warna mobil, ukuran sepatu, jenis rambut"],
        ["Informasi", "Kumpulan fakta yang <strong>terorganisir</strong>; hasil pemrosesan data sehingga <strong>memiliki arti dalam konteks tertentu</strong>", "Data lulusan universitas periode tertentu; cara pembayaran pajak kendaraan"],
        ["Knowledge", "Hasil <strong>pengolahan informasi</strong> sehingga menjadi sesuatu yang <strong>bermanfaat</strong>; didasarkan atas <strong>pengalaman, persepsi, pendapat individual</strong>", "Dokter tahu gejala X biasanya penyakit Y dari pengalamannya"]
      ],
      modes: [
        { label: "Kata kunci soal", target: "none", title: "Cara cepat menebak", text: "“mentah / fakta / simbol / belum bermakna” → <strong>data</strong>. “terorganisir / diolah / konteks / arti” → <strong>informasi</strong>. “bermanfaat / pengalaman / persepsi” → <strong>knowledge</strong>." },
        { label: "➕ Relatif", target: "row", row: 1, title: "Informasi bagi satu orang bisa jadi data bagi orang lain", text: "Rekap nilai per kelas adalah <strong>informasi</strong> bagi dosen, tetapi menjadi <strong>data</strong> bagi kaprodi yang mengolahnya lagi menjadi rekap seluruh prodi." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 3 • 5K: Data Menjadi Informasi",
      title: "Lima Cara Menafsirkan Data",
      cols: 3,
      items: [
        { badge: "1. Kondensasi", tone: "indigo", title: "Meringkas", text: "Meringkas data, <strong>menghilangkan kedalaman</strong> yang tidak dibutuhkan." },
        { badge: "2. Kontekstualisasi", tone: "sky", title: "Mengapa dikumpulkan?", text: "Memahami <strong>alasan pengumpulan</strong> data." },
        { badge: "3. Kalkulasi", tone: "emerald", title: "Menganalisa", text: "Data yang terkumpul <strong>dianalisa</strong> sesuai kebutuhan." },
        { badge: "4. Kategorisasi", tone: "amber", title: "Mengelompokkan", text: "Mengelompokkan hasil analisa menjadi satu kesatuan yang <strong>bermakna</strong>." },
        { badge: "5. Koreksi", tone: "rose", title: "Membersihkan", text: "<strong>Menghilangkan kesalahan</strong> selama proses analisa data." },
        { badge: "Jebakan", tone: "violet", title: "Bukan 5K", text: "Konsolidasi, kompilasi, konversi, komunikasi → <strong>tidak ada</strong> di daftar modul." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Jenis Data (Tabel 1)",
      title: "Contoh Data Sesuai Jenisnya",
      headers: ["Jenis", "Contoh (modul)"],
      rows: [
        ["Data numerik", "Angka, huruf, dan karakter lainnya"],
        ["Data gambar", "Gambar grafis, gambar"],
        ["Data audio", "Suara, noise, tones"],
        ["Data video", "Gambar bergerak"]
      ],
      modes: [
        { label: "➕ Koreksi istilah", target: "row", row: 0, title: "Numerik vs alfanumerik", text: "Secara istilah, <strong>numerik</strong> hanya angka. Data yang berisi angka + huruf + karakter lain lebih tepat disebut <strong>alfanumerik / teks</strong>. Untuk menjawab soal modul, tetap ikuti tabel: data numerik = angka, huruf, karakter." },
        { label: "➕ Kuantitatif vs kualitatif", target: "none", title: "Pembagian lain yang umum", text: "<strong>Kuantitatif</strong>: berupa angka yang bisa dihitung (usia, nilai). <strong>Kualitatif</strong>: berupa kategori/deskripsi (warna mobil, jenis rambut)." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 5 • 11 Karakteristik Informasi (Tabel 2)",
      title: "Informasi yang Baik Itu …",
      headers: ["Karakteristik", "Arti singkat"],
      rows: [
        ["Accessible", "Mudah diakses <strong>pengguna berwenang</strong>, format & waktu tepat"],
        ["Accurate", "Bebas kesalahan (<em>error free</em>); ingat <strong>Garbage In, Garbage Out</strong>"],
        ["Complete", "Memuat fakta penting (laporan investasi tanpa semua biaya = tidak lengkap)"],
        ["Economical", "Biaya penyediaan data <strong>sebanding</strong> dengan hasilnya"],
        ["Flexible", "Bisa dipakai untuk <strong>banyak kepentingan</strong>"],
        ["Relevant", "Terkait dengan masalahnya, penting untuk pengambilan keputusan"],
        ["Reliable", "Dapat <strong>diandalkan</strong>"],
        ["Secure", "Aman dari pengguna yang <strong>tidak punya akses</strong>"],
        ["Simple", "Sederhana, tidak terlalu rinci/kompleks"],
        ["Timely", "Tepat waktu saat dibutuhkan, tidak ‘basi’"],
        ["Verifiable", "Bisa <strong>diuji & dibuktikan</strong> keakuratannya"]
      ],
      modes: [
        { label: "Jembatan keledai", target: "none", title: "Hafalkan 11 huruf awal", text: "<strong>A-A-C-E-F-R-R-S-S-T-V</strong>: “<em>Ayo Ambil Cokelat, Enak Farah! Rasanya Renyah, Super Sedap, Tidak Visa-visa</em>.” Dua A, dua R, dua S." },
        { label: "Jebakan", target: "row", row: 1, title: "Accurate vs Verifiable vs Reliable", text: "<strong>Accurate</strong> = isinya benar/bebas error. <strong>Verifiable</strong> = bisa dicek kebenarannya. <strong>Reliable</strong> = bisa diandalkan. Baca kata kerja di soal." },
        { label: "➕ Versi ringkas", target: "none", title: "Kualitas informasi (Jogiyanto)", text: "Banyak buku meringkas kualitas informasi menjadi <strong>akurat, tepat waktu, relevan</strong>. Ketiganya ada di daftar modul." }
      ]
    },
    {
      type: "callout",
      label: "➕ Tambahan • Hierarki DIKW",
      tone: "tip",
      heading: "Data → Information → Knowledge → Wisdom",
      html: "Modul berhenti di knowledge. Di banyak buku SI, tangga ini diteruskan menjadi <strong>Wisdom</strong> (kebijaksanaan): kemampuan memakai pengetahuan untuk mengambil keputusan yang tepat. Contoh: tahu “banyak mahasiswa lemah di P3” (knowledge) → memutuskan membuat sesi tutor tambahan sebelum CPMK (wisdom)."
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Data, Informasi, atau Pengetahuan?",
      title: "Klasifikasikan",
      headers: ["Pernyataan", "Jenis"],
      rows: [
        { cells: ["“175 cm”"], fields: [{ options: DIK, answer: "Data" }], ok: "✓ Fakta mentah tanpa konteks." },
        { cells: ["“Tinggi rata-rata mahasiswa baru SI 2026 adalah 165 cm”"], fields: [{ options: DIK, answer: "Informasi" }], ok: "✓ Diolah + konteks." },
        { cells: ["Pemilik warung tahu dari pengalaman bahwa saat hujan, mi instan paling laku"], fields: [{ options: DIK, answer: "Pengetahuan" }], ok: "✓ Berbasis pengalaman." },
        { cells: ["“Merah”, “Biru”, “Hitam”"], fields: [{ options: DIK, answer: "Data" }], ok: "✓" },
        { cells: ["Grafik penjualan bulanan toko yang menunjukkan puncak di bulan Desember"], fields: [{ options: DIK, answer: "Informasi" }], ok: "✓" },
        { cells: ["Dosen tahu bagian mana yang sering membuat mahasiswa keliru setelah mengajar bertahun-tahun"], fields: [{ options: DIK, answer: "Pengetahuan" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • 5K",
      title: "Ini Proses yang Mana?",
      headers: ["Kegiatan", "Proses"],
      rows: [
        { cells: ["Membuang kolom yang tidak dipakai, menyisakan nama dan nilai akhir"], fields: [{ options: C5, answer: "Kondensasi" }], ok: "✓ Meringkas." },
        { cells: ["Mencatat bahwa data nilai ini dikumpulkan untuk evaluasi akreditasi"], fields: [{ options: C5, answer: "Kontekstualisasi" }], ok: "✓ Alasan pengumpulan." },
        { cells: ["Menghitung rata-rata dan simpangan nilai"], fields: [{ options: C5, answer: "Kalkulasi" }], ok: "✓" },
        { cells: ["Mengelompokkan mahasiswa menjadi “lulus” dan “remedial”"], fields: [{ options: C5, answer: "Kategorisasi" }], ok: "✓" },
        { cells: ["Menghapus nilai ganda yang terinput dua kali"], fields: [{ options: C5, answer: "Koreksi" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Karakteristik Informasi",
      title: "Informasi Ini Melanggar / Memenuhi Karakteristik Apa?",
      headers: ["Kasus", "Karakteristik"],
      rows: [
        { cells: ["Data gaji karyawan bisa dibuka siapa saja tanpa login"], fields: [{ options: KI, answer: "Secure" }], ok: "✓ Melanggar secure." },
        { cells: ["Laporan 300 halaman untuk direktur yang hanya perlu satu angka"], fields: [{ options: KI, answer: "Simple" }], ok: "✓ Melanggar simple." },
        { cells: ["Salah ketik harga Rp15.000 menjadi Rp150.000 di laporan"], fields: [{ options: KI, answer: "Accurate" }], ok: "✓" },
        { cells: ["Jadwal kuliah diumumkan setelah perkuliahan dimulai"], fields: [{ options: KI, answer: "Timely" }], ok: "✓" },
        { cells: ["Data penjualan bisa dipakai bagian gudang, keuangan, dan pemasaran sekaligus"], fields: [{ options: KI, answer: "Flexible" }], ok: "✓ Banyak kepentingan." },
        { cells: ["Laporan disertai sumber dan bukti transaksi sehingga auditor bisa mengeceknya"], fields: [{ options: KI, answer: "Verifiable" }], ok: "✓" },
        { cells: ["Mahasiswa yang berwenang bisa membuka KHS kapan saja dalam format PDF"], fields: [{ options: KI, answer: "Accessible" }], ok: "✓" },
        { cells: ["Biaya survei Rp100 juta untuk keputusan senilai Rp5 juta"], fields: [{ options: KI, answer: "Economical" }], ok: "✓ Melanggar economical." }
      ]
    }
  ],
  flashcards: [
    { tag: "Data", q: "Definisi data?", a: "Kumpulan keterangan/fakta, simbol, fakta yang masih mentah; dapat diamati/diverifikasi; tidak memiliki makna melekat." },
    { tag: "Data", q: "Contoh data menurut modul?", a: "Usia, nilai ujian, warna mobil, ukuran sepatu, jenis rambut." },
    { tag: "Jenis", q: "4 jenis data di Tabel 1?", a: "Numerik (angka, huruf, karakter), gambar (grafis), audio (suara, noise, tones), video (gambar bergerak)." },
    { tag: "5K", q: "5 cara data menjadi informasi?", a: "Kondensasi, kontekstualisasi, kalkulasi, kategorisasi, koreksi." },
    { tag: "5K", q: "Kondensasi vs kategorisasi?", a: "Kondensasi = meringkas. Kategorisasi = mengelompokkan hasil analisa menjadi kesatuan bermakna." },
    { tag: "Informasi", q: "Definisi informasi?", a: "Kumpulan fakta terorganisir; hasil pemrosesan data sehingga memiliki arti dalam konteks tertentu." },
    { tag: "Karakteristik", q: "11 karakteristik informasi?", a: "Accessible, accurate, complete, economical, flexible, relevant, reliable, secure, simple, timely, verifiable." },
    { tag: "Karakteristik", q: "Garbage In, Garbage Out berkaitan dengan?", a: "Accurate: data input tidak akurat menghasilkan informasi tidak akurat." },
    { tag: "Knowledge", q: "Definisi knowledge?", a: "Hasil pengolahan informasi sehingga bermanfaat; didasarkan pengalaman, persepsi, pendapat individual." },
    { tag: "Karakteristik", q: "Timely artinya?", a: "Tepat waktu saat dibutuhkan, tidak ‘basi’." },
    { tag: "➕ DIKW", q: "Tingkat di atas knowledge?", a: "Wisdom: kebijaksanaan memakai pengetahuan untuk keputusan yang tepat." },
    { tag: "➕ Relatif", q: "Bisakah informasi menjadi data?", a: "Bisa. Informasi bagi satu pihak menjadi data bagi pihak lain yang mengolahnya lagi." }
  ],
  quiz: Q.map(([q, opts, ans, exp, optExp]) => ({ q, opts, ans, exp, optExp })),
  ringkasan: `*RANGKUMAN KILAT CPMK 1 — DASAR-DASAR SI P2*
📚 *Konsep Informasi*

1️⃣ Data: fakta/simbol mentah, belum bermakna (usia, nilai, warna mobil).
2️⃣ 5K data → informasi: Kondensasi (ringkas) • Kontekstualisasi (alasan dikumpulkan) • Kalkulasi (analisa) • Kategorisasi (kelompokkan) • Koreksi (hapus kesalahan).
3️⃣ Jenis data: numerik, gambar, audio, video.
4️⃣ Informasi: fakta terorganisir, hasil olah data, bermakna dalam konteks.
5️⃣ 11 karakteristik: Accessible, Accurate (GIGO), Complete, Economical, Flexible, Relevant, Reliable, Secure, Simple, Timely, Verifiable.
6️⃣ Knowledge: hasil olah informasi, bermanfaat, dari pengalaman/persepsi/pendapat.
➕ DIKW: + Wisdom.`
};
