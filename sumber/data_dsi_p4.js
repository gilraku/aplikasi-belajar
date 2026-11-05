// Dasar-dasar Sistem Informasi — Pertemuan 4: Tipe Sistem Informasi + persiapan CPMK 1 (materi P1–P4)
// Bank soal dibuat sendiri dengan gaya Latihan 2 modul (5 opsi, banyak "kecuali"). Bukan soal ujian asli.
const T7 = ["TPS", "PCS", "ECS", "Expert System", "MIS", "DSS", "EIS"];
const OM = ["Operation Support", "Management Support"];
// [pertemuan, soal, opsi(5), jawaban, pembahasan]
const S = [
  // P4 — Tipe SI
  [4, "Berikut termasuk sistem informasi Operation Support System, KECUALI …", ["Transaction processing system", "Enterprise collaboration system", "Process control system", "Decision support system", "Expert system"], 3, "DSS termasuk Management Support System. <em>(Latihan 2 modul no. 1)</em>"],
  [4, "Yang BUKAN termasuk Operation Support System adalah …", ["Transaction processing system", "Enterprise collaboration system", "Decision support system", "Process control system", "Expert system"], 2, "<em>(Latihan 2 no. 2; opsi di modul ada yang dobel, inti jawabannya tetap DSS.)</em>"],
  [4, "Sistem komputer yang dimanfaatkan untuk membantu proses pengambilan keputusan disebut …", ["Transaction processing system", "Enterprise collaboration system", "Decision support system", "Process control system", "Expert system"], 2, "<em>(Latihan 2 no. 3)</em>"],
  [4, "Berikut ini pengertian Enterprise Collaboration System, KECUALI …", ["Sistem untuk mendukung proses kerja sama di perusahaan", "Sistem yang mendukung komunikasi antar tim kerja", "Sistem yang berfungsi membantu pengambilan keputusan perusahaan", "Sistem untuk berkolaborasi antar unit", "Sistem untuk bekerja sama, berkolaborasi, dan berkomunikasi antar unit"], 2, "Pengambilan keputusan = DSS. <em>(Latihan 2 no. 4)</em>"],
  [4, "Sistem komputer yang digunakan untuk memenuhi kebutuhan para C-level (eksekutif) perusahaan disebut …", ["Executive information system", "Transaction processing system", "Enterprise collaboration system", "Decision support system", "Management information system"], 0, "<em>(Latihan 2 no. 5)</em>"],
  [4, "Dua tipe utama sistem informasi menurut modul adalah …", ["Operation Support System dan Management Support System", "TPS dan MIS", "Sistem manual dan sistem komputer", "Hardware dan software", "Internal dan eksternal"], 0, ""],
  [4, "Sistem informasi yang dibuat untuk memproses data dalam jumlah besar serta mengolah, mengedit, dan meng-update database operasional adalah …", ["Transaction processing system", "Executive information system", "Decision support system", "Expert system", "Management information system"], 0, "Contoh: data gaji pegawai, inventaris."],
  [4, "Pabrik semen memakai sistem yang memantau suhu tungku dan mengatur produksi secara otomatis. Ini contoh …", ["Process control system", "Enterprise collaboration system", "Executive information system", "Management information system", "Transaction processing system"], 0, "Pengawasan & pengendalian proses operasional/produksi."],
  [4, "Penggunaan email dan konferensi video untuk rapat antar tim termasuk …", ["Enterprise collaboration system", "Process control system", "Decision support system", "Expert system", "Transaction processing system"], 0, "Contoh persis di modul."],
  [4, "“Sistem pakar pengobatan pada hewan ternak domba” adalah contoh …", ["Expert system", "Decision support system", "Management information system", "Process control system", "Executive information system"], 0, "Memuat kepakaran/pengetahuan ahli dan memberi saran."],
  [4, "Sistem yang menyajikan informasi dalam format laporan yang sudah ditentukan perusahaan, misalnya laporan barang keluar-masuk, adalah …", ["Management information system", "Decision support system", "Expert system", "Enterprise collaboration system", "Process control system"], 0, ""],
  [4, "Sistem untuk menentukan prediksi penjualan produk baru dan memberi rekomendasi keputusan terbaik adalah …", ["Decision support system", "Transaction processing system", "Management information system", "Enterprise collaboration system", "Process control system"], 0, "Contoh DSS di modul."],
  [4, "EIS biasanya menyajikan informasi dalam bentuk …", ["Grafik dan analisis utama yang fokus pada area kerja utama perusahaan", "Struk transaksi", "Data mentah per transaksi", "Pesan email antar staf", "Kode program"], 0, ""],
  [4, "Jumlah jenis Management Support System menurut modul adalah …", ["Dua", "Tiga: MIS, DSS, EIS", "Empat", "Lima", "Enam"], 1, ""],
  [4, "Pasangan yang TEPAT antara tipe SI dan kelompoknya adalah …", ["DSS — Operation Support", "TPS — Management Support", "EIS — Management Support", "ECS — Management Support", "MIS — Operation Support"], 2, ""],
  // P1
  [1, "Termostat AC yang menyalakan kompresor ketika suhu ruangan naik melewati 24°C adalah contoh …", ["Umpan balik negatif", "Umpan balik positif", "Boundary", "Input", "Output"], 0, "Mengurangi penyimpangan dari standar."],
  [1, "Karakteristik sistem yang menentukan ruang lingkup dan kemampuan sistem adalah …", ["Boundary", "Feedback", "Output", "Control", "Processing"], 0, ""],
  [1, "Laporan tercetak dan saran bagi manajer pada sistem informasi termasuk …", ["Outputs", "Inputs", "Controls", "Boundary", "Processing"], 0, ""],
  [1, "Cara mempelajari sistem dengan mempelajari semua elemen menekankan bahwa …", ["Tidak boleh ada elemen yang dibuang demi penyederhanaan", "Cukup elemen yang penting saja", "Batas sistem diabaikan", "Hanya input dan output yang dipelajari", "Elemen yang jarang berinteraksi dibuang"], 0, ""],
  [1, "Sistem menurut McLeod (2003) adalah …", ["Satu set elemen yang saling berinteraksi untuk mencapai tujuan tertentu", "Kumpulan data mentah", "Hasil pengolahan informasi", "Seperangkat komputer", "Kumpulan laporan"], 0, ""],
  [1, "Supervisor kasir memeriksa selisih uang di setiap pergantian shift. Ini karakteristik …", ["Controls", "Inputs", "Feedback positif", "Boundary", "Outputs"], 0, "Mengawasi pelaksanaan mekanisme."],
  // P2
  [2, "Usia, nilai ujian, warna mobil, dan ukuran sepatu adalah contoh …", ["Data", "Informasi", "Knowledge", "Sistem", "Wisdom"], 0, ""],
  [2, "Mengelompokkan hasil analisa menjadi satu kesatuan yang memiliki makna disebut …", ["Kategorisasi", "Kondensasi", "Koreksi", "Kontekstualisasi", "Kalkulasi"], 0, ""],
  [2, "Informasi harus aman dari pengguna yang tidak memiliki akses. Ini karakteristik …", ["Secure", "Accessible", "Reliable", "Simple", "Flexible"], 0, ""],
  [2, "Informasi yang bisa digunakan untuk banyak kepentingan memenuhi karakteristik …", ["Flexible", "Relevant", "Economical", "Complete", "Timely"], 0, ""],
  [2, "Gambar bergerak termasuk jenis data …", ["Video", "Gambar", "Audio", "Numerik", "Teks"], 0, ""],
  [2, "Pengetahuan (knowledge) didasarkan atas …", ["Pengalaman, persepsi, dan pendapat individual", "Fakta mentah", "Simbol tanpa makna", "Data numerik", "Format laporan"], 0, ""],
  [2, "Informasi harus bisa diuji dan dibuktikan keakuratannya. Ini karakteristik …", ["Verifiable", "Accurate", "Reliable", "Secure", "Accessible"], 0, "Jangan tertukar dengan accurate (bebas error)."],
  [2, "Garbage In, Garbage Out menjelaskan bahwa …", ["Data input yang tidak akurat menghasilkan informasi yang tidak akurat", "Sampah harus dibuang dari sistem", "Informasi lama harus dihapus", "Output selalu benar", "Semua data adalah sampah"], 0, ""],
  // P3
  [3, "Kerangka kerja SI yang membahas pengelolaan oleh pelaku bisnis atau praktisi TI menghadapi tantangan adalah …", ["Management Challenges", "Development Processes", "Foundation Concepts", "Business Applications", "Information Technologies"], 0, ""],
  [3, "Jumlah kerangka kerja konseptual SI menurut O’Brien adalah …", ["3", "4", "5", "6", "7"], 2, ""],
  [3, "Supermarket mencatat pembelian pelanggan dan persediaan bahan baku dengan SI. Peran SI ini adalah …", ["Support business processes and operations", "Support business decision making", "Support strategies for competitive advantage", "Business applications", "Foundation concepts"], 0, ""],
  [3, "Tahap pada SI yang berupa mengumpulkan dan capturing data mentah adalah …", ["Input", "Processing", "Output", "Feedback", "Control"], 0, ""],
  [3, "Di bawah ini adalah peran fundamental SI, KECUALI …", ["Support strategies for competitive advantage", "Support business decision making", "Support business processes and operations", "Support business local"], 3, "Tidak ada peran “business local”."],
  [3, "Peran SI yang berada di puncak segitiga Gambar 3.3 adalah …", ["Support strategies for competitive advantage", "Support business decision making", "Support business processes and operations", "Development processes", "Management challenges"], 0, "Dari dasar ke puncak: proses & operasi → keputusan → keunggulan kompetitif."],
  [3, "Pernyataan yang TIDAK sesuai dengan definisi sistem informasi adalah …", ["SI tidak memerlukan tujuan", "SI mengumpulkan dan memproses informasi", "SI menyimpan dan mendistribusikan informasi", "SI terdiri dari komponen yang saling berkaitan", "SI mendukung tujuan organisasi"], 0, ""],
  [3, "Kerangka kerja yang membahas penggunaan SI untuk operasional, manajemen, dan pengambilan keputusan adalah …", ["Business Applications", "Information Technologies", "Development Processes", "Foundation Concepts", "Management Challenges"], 0, ""]
];

module.exports = {
  id: "p4",
  nomor: 4,
  judul: "Tipe Sistem Informasi & CPMK 1",
  ujian: "CPMK 1",
  hero: {
    badge: "Materi 4 • CPMK 1",
    title: "Operation Support vs Management Support",
    text: "Kenali <strong>7 tipe SI</strong> dalam dua kelompok besar. Pertemuan ini juga ada <strong>CPMK 1</strong> dengan soal dari <strong>materi P1–P4</strong>, jadi tab Kuis berisi <strong>bank soal campuran P1–P4</strong>. Bank soal ini latihan buatan sendiri, <strong>bukan soal ujian asli</strong>."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • Peta Tipe SI",
      title: "2 Kelompok, 7 Tipe (Versi Modul)",
      headers: ["Kelompok", "Tipe", "Fungsi inti", "Contoh modul"],
      rows: [
        ["Operation Support", "Transaction Processing System (TPS)", "Memproses data <strong>jumlah besar</strong>; mengolah, mengedit, meng-update database operasional", "Data gaji pegawai, inventaris"],
        ["Operation Support", "Process Control System (PCS)", "<strong>Mengawasi & mengendalikan</strong> proses operasional/produksi", "Pengendalian produksi"],
        ["Operation Support", "Enterprise Collaboration System (ECS)", "Mendukung <strong>kerja sama, komunikasi</strong>, tim kerja", "Email, konferensi video"],
        ["Operation Support (menurut modul)", "Expert System (sistem pakar)", "Memuat <strong>kepakaran</strong> ahli, memberi saran/arahan", "Pakar pengobatan ternak domba"],
        ["Management Support", "Management Information System (MIS)", "Informasi dalam <strong>format laporan yang sudah ditentukan</strong>", "Laporan barang keluar-masuk"],
        ["Management Support", "Decision Support System (DSS)", "Membantu <strong>pengambilan keputusan</strong>, memberi rekomendasi", "Prediksi penjualan produk baru"],
        ["Management Support", "Executive Information System (EIS)", "Kebutuhan <strong>C-level/eksekutif</strong>: grafik, analisis area utama", "Dashboard direksi"]
      ],
      modes: [
        { label: "Operation Support", target: "none", title: "Definisi kelompok 1", text: "Sistem komputer untuk membantu <strong>proses inventaris dan manajemen</strong>, penyelesaian masalah teknis, perencanaan, dan perbaikan. Modul menyebutnya juga “sistem pendukung transaksi”." },
        { label: "Management Support", target: "none", title: "Definisi kelompok 2", text: "Sistem komputer untuk membantu <strong>pengelolaan informasi</strong> guna <strong>pembuatan laporan</strong> dan <strong>pengambilan keputusan</strong>. Isinya tiga: MIS, DSS, EIS." },
        { label: "➕ Koreksi modul", target: "row", row: 3, title: "Posisi Expert System", text: "Di buku O’Brien (sumber Gambar 3.3), Operation Support hanya berisi <strong>TPS, PCS, ECS</strong>. Expert system masuk kategori terpisah “<em>other categories</em>” bersama knowledge management, strategic IS, dan functional business systems. Untuk CPMK, ikuti modul (ES di bawah Operation Support), tetapi jangan kaget jika soal lain menyebut OSS hanya tiga." },
        { label: "➕ Catatan definisi", target: "row", row: 0, title: "Kalimat “jaringan penyedia layanan”", text: "Definisi OSS di modul menyebut “fungsi perbaikan bagi jaringan penyedia layanan”. Itu makna OSS di <strong>industri telekomunikasi</strong> (sistem operasional jaringan operator). Dalam konteks SI organisasi, inti OSS adalah <strong>mendukung operasi harian</strong>." }
      ]
    },
    {
      type: "callout",
      label: "Jebakan Soal",
      tone: "warn",
      heading: "MIS vs DSS vs EIS",
      html: "<ul><li><strong>MIS</strong>: laporan <strong>rutin</strong> dengan <strong>format yang sudah ditentukan</strong> → “laporan”.</li><li><strong>DSS</strong>: <strong>rekomendasi</strong> untuk keputusan, sering “what-if”/prediksi → “keputusan, prediksi”.</li><li><strong>EIS</strong>: untuk <strong>eksekutif/C-level</strong>, ringkas, grafik → “eksekutif, direksi”.</li></ul>Dan <strong>PCS</strong> (mengendalikan proses produksi) jangan tertukar dengan <strong>control</strong> pada karakteristik sistem (P1)."
    },
    {
      type: "callout",
      label: "➕ Tambahan • Piramida Tingkat Manajemen",
      tone: "tip",
      heading: "Siapa memakai sistem apa?",
      html: "<ul><li><strong>Manajemen puncak (strategis)</strong> → EIS, DSS</li><li><strong>Manajemen menengah (taktis)</strong> → MIS, DSS</li><li><strong>Operasional/supervisor</strong> → TPS, PCS</li></ul>Pola ini sama dengan <strong>level CBIS</strong> di P5, jadi sekalian bekal untuk UTS. ➕ Istilah lain: <strong>KMS</strong> (Knowledge Management System) untuk berbagi pengetahuan organisasi."
    },
    {
      type: "table",
      label: "Persiapan CPMK 1 • Peta Materi P1–P4",
      title: "Yang Paling Sering Ditanya",
      headers: ["Pertemuan", "Wajib hafal"],
      rows: [
        ["P1 Konsep Sistem", "Definisi McLeod; 6 karakteristik (boundary, input, processing, output, control, feedback); feedback negatif vs positif; 2 cara mempelajari sistem"],
        ["P2 Konsep Informasi", "Data vs informasi vs knowledge; 5K (kondensasi, kontekstualisasi, kalkulasi, kategorisasi, koreksi); 4 jenis data; 11 karakteristik informasi"],
        ["P3 Konsep SI", "3 definisi SI; 5 kerangka O’Brien (Foundation, IT, Business Apps, Development, Management Challenges); I-P-O; 3 peran fundamental"],
        ["P4 Tipe SI", "OSS (TPS, PCS, ECS, Expert) vs MSS (MIS, DSS, EIS) beserta contohnya"]
      ],
      modes: [
        { label: "Strategi “kecuali”", target: "none", title: "Cara aman menjawab", text: "Soal modul banyak memakai <strong>KECUALI</strong>. Coret opsi yang ada di daftar hafalan; yang tersisa adalah jawabannya. Untuk “salah, kecuali” → cari satu yang <strong>benar</strong>." },
        { label: "Pengecoh favorit", target: "none", title: "Kata yang mirip", text: "Konsolidasi (bukan 5K) • Innovation (bukan karakteristik informasi) • Leadership (bukan Foundation) • “business local” (bukan peran) • Elemen (bukan 6 karakteristik) • DSS (bukan OSS)." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Tebak Tipe SI",
      title: "Sistem Ini Tipe Apa?",
      headers: ["Kasus", "Tipe"],
      rows: [
        { cells: ["Mesin kasir supermarket mencatat ribuan transaksi per hari"], fields: [{ options: T7, answer: "TPS" }], ok: "✓" },
        { cells: ["Sensor di pabrik minuman mengatur kecepatan mesin pengisian botol"], fields: [{ options: T7, answer: "PCS" }], ok: "✓" },
        { cells: ["Tim kampus rapat lewat Zoom dan berbagi dokumen di Google Drive"], fields: [{ options: T7, answer: "ECS" }], ok: "✓" },
        { cells: ["Aplikasi tanya-jawab gejala tanaman padi yang memberi saran penanganan seperti ahli"], fields: [{ options: T7, answer: "Expert System" }], ok: "✓" },
        { cells: ["Laporan penjualan bulanan per cabang dengan format baku"], fields: [{ options: T7, answer: "MIS" }], ok: "✓" },
        { cells: ["Simulasi “jika harga dinaikkan 10%, berapa laba?” untuk memilih strategi harga"], fields: [{ options: T7, answer: "DSS" }], ok: "✓ What-if." },
        { cells: ["Dashboard ringkas KPI perusahaan untuk direktur utama"], fields: [{ options: T7, answer: "EIS" }], ok: "✓" },
        { cells: ["Sistem penggajian yang meng-update data gaji pegawai"], fields: [{ options: T7, answer: "TPS" }], ok: "✓ Contoh modul." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Kelompoknya Apa?",
      title: "Operation Support atau Management Support?",
      headers: ["Tipe", "Kelompok"],
      rows: [
        { cells: ["Decision Support System"], fields: [{ options: OM, answer: "Management Support" }], ok: "✓" },
        { cells: ["Enterprise Collaboration System"], fields: [{ options: OM, answer: "Operation Support" }], ok: "✓" },
        { cells: ["Executive Information System"], fields: [{ options: OM, answer: "Management Support" }], ok: "✓" },
        { cells: ["Process Control System"], fields: [{ options: OM, answer: "Operation Support" }], ok: "✓" },
        { cells: ["Management Information System"], fields: [{ options: OM, answer: "Management Support" }], ok: "✓" },
        { cells: ["Expert System (menurut modul)"], fields: [{ options: OM, answer: "Operation Support" }], ok: "✓ Versi modul." }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • Satu Perusahaan, Banyak Sistem",
      title: "Rumah Sakit “Sehat Sentosa”",
      items: [
        { prompt: "Pendaftaran pasien dan pembayaran di kasir", answer: "TPS", reason: "Transaksi harian dalam jumlah besar." },
        { prompt: "Aplikasi yang menyarankan diagnosis awal berdasarkan gejala", answer: "Expert System", reason: "Meniru kepakaran dokter." },
        { prompt: "Laporan jumlah pasien rawat inap per bulan untuk kepala bagian", answer: "MIS", reason: "Laporan berformat tetap." },
        { prompt: "Analisis apakah perlu membuka poli baru berdasarkan tren pasien", answer: "DSS", reason: "Mendukung keputusan." },
        { prompt: "Grafik ringkas kinerja rumah sakit untuk direktur", answer: "EIS", reason: "Untuk eksekutif." },
        { prompt: "Grup chat dan rapat daring antar dokter", answer: "ECS", reason: "Kolaborasi." }
      ]
    }
  ],
  flashcards: [
    { tag: "Tipe", q: "2 tipe utama SI menurut modul?", a: "Operation Support System dan Management Support System." },
    { tag: "OSS", q: "4 jenis Operation Support System (modul)?", a: "Transaction Processing System, Process Control System, Enterprise Collaboration System, Expert System." },
    { tag: "MSS", q: "3 jenis Management Support System?", a: "Management Information System, Decision Support System, Executive Information System." },
    { tag: "TPS", q: "Fungsi TPS?", a: "Memproses data dalam jumlah besar; mengolah, mengedit, meng-update database operasional (gaji, inventaris)." },
    { tag: "PCS", q: "Fungsi PCS?", a: "Mengawasi dan mengendalikan proses kegiatan operasional, misalnya produksi." },
    { tag: "ECS", q: "Fungsi ECS dan contohnya?", a: "Mendukung kerja sama & komunikasi tim. Contoh: email, konferensi video." },
    { tag: "ES", q: "Apa itu expert system?", a: "Sistem pakar: memuat kepakaran ahli, memberi saran/arahan. Contoh: pakar pengobatan ternak domba." },
    { tag: "MIS", q: "Ciri MIS?", a: "Memberi informasi dalam format laporan yang sudah ditentukan perusahaan." },
    { tag: "DSS", q: "Ciri DSS?", a: "Membantu pengambilan keputusan dan memberi rekomendasi; contoh prediksi penjualan produk baru." },
    { tag: "EIS", q: "Ciri EIS?", a: "Untuk C-level/eksekutif: informasi ringkas, grafik, analisis area utama, kontrol efisien." },
    { tag: "➕ Koreksi", q: "OSS menurut O’Brien?", a: "TPS, PCS, ECS. Expert system di O’Brien masuk kategori lain, tetapi modul menaruhnya di OSS." },
    { tag: "➕ Level", q: "Tingkat manajemen dan tipe SI?", a: "Puncak: EIS/DSS • Menengah: MIS/DSS • Operasional: TPS/PCS." }
  ],
  quiz: S.map(([p, q, opts, ans, exp]) => ({ q, opts, ans, exp: "<strong>P" + p + "</strong>" + (exp ? " • " + exp : "") })),
  ringkasan: `*RANGKUMAN KILAT CPMK 1 — DASAR-DASAR SI P4*
📚 *Tipe Sistem Informasi*

1️⃣ Operation Support System: TPS (transaksi besar, update DB: gaji, inventaris) • PCS (kendali produksi) • ECS (email, video conference) • Expert System (sistem pakar; ➕ di O’Brien kategori lain).
2️⃣ Management Support System: MIS (laporan format tetap) • DSS (rekomendasi keputusan, prediksi) • EIS (C-level, grafik).
➕ Puncak: EIS/DSS • Menengah: MIS • Operasional: TPS/PCS.

🎯 *CPMK 1 = materi P1–P4*
P1: McLeod, 6 karakteristik, feedback −/+, 2 cara.
P2: data/informasi/knowledge, 5K, 4 jenis data, 11 karakteristik.
P3: 3 definisi SI, 5 kerangka O’Brien, I-P-O, 3 peran.
⚠️ Pengecoh: konsolidasi, innovation, leadership, business local, elemen, DSS∉OSS.`
};
