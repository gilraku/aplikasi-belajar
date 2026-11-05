// Dasar-dasar Sistem Informasi — Pertemuan 8: UTS / CPMK 2 (materi P1–P7)
// Bank soal dibuat sendiri dengan gaya Latihan 2 modul (5 opsi, banyak "kecuali" & studi kasus). Bukan soal ujian asli.
const PM = ["P1 Konsep Sistem", "P2 Konsep Informasi", "P3 Konsep SI", "P4 Tipe SI", "P5 CBIS", "P6 Teknologi Informasi", "P7 Pengelolaan Data"];
// [pertemuan, soal, opsi, jawaban, pembahasan]
const S = [
  // P1
  [1, "Sebuah sistem minimal harus memiliki tiga hal berikut menurut definisi McLeod, yaitu …", ["Elemen, interaksi, tujuan", "Input, output, laporan", "Data, informasi, knowledge", "Hardware, software, brainware", "Boundary, feedback, control"], 0, "Set elemen yang saling berinteraksi untuk mencapai tujuan."],
  [1, "Berikut adalah karakteristik sistem menurut modul, KECUALI …", ["Boundary", "Controls", "Feedback", "Interface", "Processing"], 3, "Interface ada di buku lain (➕), bukan 6 karakteristik modul."],
  [1, "Hasil pemrosesan yang dapat digunakan pengguna, misalnya informasi, saran, atau laporan tercetak, adalah …", ["Outputs", "Inputs", "Boundary", "Controls", "Feedback"], 0, ""],
  [1, "Umpan balik yang menambah kekuatan gerak sistem untuk menguatkan pencapaian tujuan adalah …", ["Umpan balik positif", "Umpan balik negatif", "Control", "Boundary", "Processing"], 0, ""],
  [1, "Kampus menurunkan batas SKS bagi mahasiswa ber-IPK rendah agar nilainya kembali normal. Ini contoh …", ["Umpan balik negatif", "Umpan balik positif", "Boundary", "Input", "Output"], 0, "Mengurangi penyimpangan dari standar."],
  [1, "Menentukan batas sistem dapat dilakukan dengan melihat elemen yang …", ["Interaksinya sangat intens atau lebih tunduk pada aturan sistem", "Paling sedikit berinteraksi", "Berada di luar sistem", "Tidak memiliki tujuan", "Paling mahal"], 0, ""],
  [1, "Yang dimaksud controls pada sistem adalah …", ["Kegiatan mengamati/mengawasi pelaksanaan mekanisme pengelolaan SI", "Pengolahan masukan menjadi keluaran", "Pemisah antar sistem", "Hasil pengolahan", "Data transaksi"], 0, ""],
  [1, "Data transaksi, data non-transaksi, dan instruksi termasuk …", ["Inputs pada sistem informasi", "Outputs", "Feedback", "Controls", "Boundary"], 0, ""],
  // P2
  [2, "Pernyataan yang PALING tepat tentang data adalah …", ["Fakta mentah yang belum memiliki makna melekat", "Fakta terorganisir yang bermakna dalam konteks", "Hasil pengolahan informasi yang bermanfaat", "Laporan untuk eksekutif", "Kebijaksanaan mengambil keputusan"], 0, ""],
  [2, "Proses analisa terhadap data yang sudah dikumpulkan sesuai kebutuhan disebut …", ["Kalkulasi", "Kondensasi", "Koreksi", "Kategorisasi", "Kontekstualisasi"], 0, ""],
  [2, "Berikut adalah cara data menjadi informasi, KECUALI …", ["Kondensasi", "Kontekstualisasi", "Kompilasi", "Kategorisasi", "Koreksi"], 2, "Kompilasi bukan 5K."],
  [2, "Suara, noise, dan tones adalah contoh data …", ["Audio", "Video", "Gambar", "Numerik", "Teks"], 0, ""],
  [2, "Informasi harus terkait dengan masalahnya karena akan dipakai untuk mengambil keputusan. Ini karakteristik …", ["Relevant", "Reliable", "Flexible", "Simple", "Complete"], 0, ""],
  [2, "Informasi yang terlalu rinci dan sophisticated tidak diperlukan untuk pengambilan keputusan. Ini alasan karakteristik …", ["Simple", "Complete", "Accurate", "Flexible", "Economical"], 0, ""],
  [2, "Berikut karakteristik informasi, KECUALI …", ["Timely", "Verifiable", "Reliable", "Economical", "Popular"], 4, ""],
  [2, "“Rata-rata nilai UTS kelas A adalah 78” termasuk …", ["Informasi", "Data", "Knowledge", "Wisdom", "Simbol"], 0, "Sudah diolah dan punya konteks."],
  // P3
  [3, "Sistem informasi berfungsi untuk …", ["Mengumpulkan, memproses, menyimpan, dan mendistribusikan informasi", "Mengamati dan mengoreksi", "Meringkas dan mengelompokkan data", "Mencetak dan memusnahkan dokumen", "Merancang hardware"], 0, ""],
  [3, "Kerangka kerja konseptual SI yang membahas software, hardware, dan manajemen data adalah …", ["Information Technologies", "Foundation Concepts", "Business Applications", "Development Processes", "Management Challenges"], 0, ""],
  [3, "Berikut adalah kerangka kerja konseptual SI menurut O’Brien, KECUALI …", ["Foundation Concepts", "Business Applications", "Development Processes", "Marketing Strategies", "Management Challenges"], 3, ""],
  [3, "Penggunaan e-commerce oleh pelaku industri agar produknya tidak kalah dengan kompetitor menunjukkan peran SI …", ["Support strategies for competitive advantage", "Support business decision making", "Support business processes and operations", "Foundation concepts", "Development processes"], 0, ""],
  [3, "Pada tahap processing SI terjadi transformasi data, yang meliputi …", ["Kalkulasi, perbandingan data, dan pencarian alternatif", "Capturing data mentah", "Pencetakan laporan", "Penentuan batas sistem", "Pengiriman email"], 0, ""],
  [3, "Peran SI yang membantu menghindari human error dalam perhitungan pasokan sehingga petinggi bisa memutuskan dengan baik adalah …", ["Support business decision making", "Support business processes and operations", "Support strategies for competitive advantage", "Management challenges", "Information technologies"], 0, ""],
  [3, "Pernyataan yang BENAR tentang foundation concepts adalah membahas …", ["Dasar perilaku, permasalahan teknis, bisnis, dan manajemen", "Leadership dan politik", "Hanya hardware", "Proses pengembangan SI", "Pengelolaan tantangan manajemen"], 0, ""],
  [3, "Penggunaan SI untuk pencatatan pembayaran pegawai dan evaluasi tren penjualan di perusahaan retail termasuk peran …", ["Support business processes and operations", "Support strategies for competitive advantage", "Business applications", "Support business decision making", "Information technologies"], 0, "Contoh modul. Hati-hati: “business applications” adalah kerangka kerja, bukan peran."],
  // P4
  [4, "Sistem informasi yang termasuk Management Support System adalah …", ["Executive Information System", "Transaction Processing System", "Process Control System", "Enterprise Collaboration System", "Expert System"], 0, ""],
  [4, "Berikut termasuk Management Support System, KECUALI …", ["Management Information System", "Decision Support System", "Executive Information System", "Transaction Processing System"], 3, ""],
  [4, "Sistem yang memuat kepakaran dan pengetahuan dari ahli dalam bidang tertentu serta memberi saran adalah …", ["Expert system", "Decision support system", "Executive information system", "Management information system", "Transaction processing system"], 0, ""],
  [4, "Sistem yang berfokus pada proses operasional seperti pengendalian produksi adalah …", ["Process Control System", "Enterprise Collaboration System", "Management Information System", "Executive Information System", "Decision Support System"], 0, ""],
  [4, "Dashboard grafik penjualan nasional yang dipantau direktur utama termasuk …", ["Executive Information System", "Transaction Processing System", "Process Control System", "Expert System", "Enterprise Collaboration System"], 0, ""],
  [4, "Laporan analisis barang keluar-masuk yang formatnya sudah ditentukan perusahaan dihasilkan oleh …", ["Management Information System", "Decision Support System", "Expert System", "Process Control System", "Enterprise Collaboration System"], 0, ""],
  [4, "TPS biasanya digunakan untuk …", ["Memproses data jumlah besar dan meng-update database operasional", "Memberi rekomendasi keputusan strategis", "Memenuhi kebutuhan C-level", "Video conference", "Meniru kepakaran dokter"], 0, ""],
  [4, "Sistem pengambilan keputusan untuk memprediksi penjualan produk baru adalah contoh …", ["Decision Support System", "Management Information System", "Executive Information System", "Transaction Processing System", "Process Control System"], 0, ""],
  // P5
  [5, "Lima elemen CBIS adalah …", ["Data, people, hardware, software, telecommunication", "Input, proses, output, storage, control", "TPS, MIS, DSS, EIS, ES", "Hardware, software, brainware, firmware, data", "Data, informasi, knowledge, wisdom, people"], 0, ""],
  [5, "CBIS menurut Leonard Jessup dibangun untuk …", ["Collect, create, dan distribute data yang berguna", "Menghapus data lama", "Mengganti tenaga manusia sepenuhnya", "Mencetak laporan saja", "Membuat jaringan internet"], 0, ""],
  [5, "Fungsi CBIS yang memecahkan masalah produksi manufaktur perusahaan adalah …", ["Manufacturing Information System", "Finance Information System", "Marketing Information System", "Human Resource Information System", "Executive Information System"], 0, ""],
  [5, "Level CBIS management control ditangani oleh …", ["Management Information System", "Transaction Processing System", "Executive Information System", "Expert System", "Virtual Office"], 0, ""],
  [5, "Berikut termasuk subsistem dalam model CBIS, KECUALI …", ["Transaction Processing System", "Decision Support System", "Virtual Office", "Knowledge-based System", "Restore System"], 4, ""],
  [5, "Urutan model CBIS yang benar adalah …", ["Problems → CBIS → information → decision → problem solution", "Decision → problems → CBIS → solution", "Information → problems → decision", "Solution → CBIS → problems", "CBIS → problems → data → laporan"], 0, ""],
  [5, "Software dalam elemen CBIS menurut modul dibagi menjadi …", ["Sistem perangkat lunak umum, sistem manajemen data, sistem pengoperasian", "Hardware dan software", "Aplikasi dan game", "Open source dan berbayar", "Input dan output"], 0, ""],
  [5, "Level CBIS strategic planning menggunakan sistem …", ["EIS / DSS", "TPS", "MIS", "PCS", "ECS"], 0, ""],
  [5, "Yang termasuk elemen people pada CBIS, KECUALI …", ["Programmer", "System analyst", "Operator", "Data entry", "Database server"], 4, "Server adalah hardware."],
  // P6
  [6, "Modern information technology terdiri dari komponen berikut, KECUALI …", ["Perangkat keras", "Perangkat lunak", "Communication technology", "Data", "Brainstorming"], 4, ""],
  [6, "Hardware disebut sebagai aspek … dari TI.", ["Fisik (hard)", "Non-fisik (soft)", "Interkoneksi", "Manajerial", "Strategis"], 0, ""],
  [6, "ENIAC adalah contoh komputer generasi …", ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"], 0, ""],
  [6, "Komputer generasi keempat dibangun dengan teknologi …", ["Mikroprosesor", "Transistor", "Tabung hampa", "IC sederhana", "Relay mekanik"], 0, ""],
  [6, "Komputer terbesar, multi-user, dan dipakai untuk pengolahan data skala besar disebut …", ["Mainframe", "Minicomputer", "Microcomputer", "Personal computer", "Laptop"], 0, ""],
  [6, "Minicomputer juga disebut …", ["Midrange computer", "Personal computer", "Mainframe", "Supercomputer", "Workstation"], 0, ""],
  [6, "Pernyataan yang BENAR tentang RAM adalah …", ["Volatile, tempat transit data sementara untuk operasi CPU", "Menyimpan data secara permanen", "Alat input gambar", "Otak komputer", "Papan penghubung komponen"], 0, ""],
  [6, "Pada CPU terbaru, komponen yang terintegrasi untuk mengolah data grafis adalah …", ["GPU", "RAM", "Motherboard", "Scanner", "Kipas"], 0, ""],
  [6, "Perangkat lunak yang tidak berwujud fisik karena berupa kumpulan data elektronik berupa program disebut …", ["Software", "Hardware", "Brainware", "Motherboard", "CPU"], 0, ""],
  [6, "Perangkat keras yang termasuk alat input, KECUALI …", ["Keyboard", "Mouse", "Scanner", "Mic", "CPU"], 4, "CPU adalah alat proses."],
  // P7
  [7, "Group of records of same type disebut …", ["File", "Field", "Database", "Entity", "Attribute"], 0, ""],
  [7, "Kumpulan dari karakter disebut …", ["Field", "Record", "File", "Database", "Entity"], 0, ""],
  [7, "Yang menggambarkan sebuah entity adalah …", ["Record", "Field", "Karakter", "Network", "Operator"], 0, ""],
  [7, "Ditemukannya data dengan atribut yang sama tetapi nilainya berbeda disebut …", ["Data inconsistency", "Data redundancy", "Poor security", "Program-data dependence", "Lack of flexibility"], 0, ""],
  [7, "Data yang sama disimpan berulang di banyak file departemen disebut …", ["Data redundancy", "Data inconsistency", "Lack of data sharing", "Poor security", "Program-data dependence"], 0, ""],
  [7, "Berikut adalah information specialist menurut modul, KECUALI …", ["System analyst", "Database administrator", "Operator", "Network specialist", "Sales manager"], 4, ""],
  [7, "Selain menjalankan server/mainframe, operator juga bertanggung jawab …", ["Memonitor penggunaan perangkat keras", "Merancang strategi pemasaran", "Membuat kebijakan keuangan", "Mengajar pengguna", "Menulis modul kuliah"], 0, ""],
  [7, "Masalah traditional file processing muncul karena …", ["File dikelola secara terpisah oleh departemen berbeda", "Semua data disimpan terpusat", "Menggunakan DBMS", "Jaringan terlalu cepat", "Data terlalu sedikit"], 0, ""],
  [7, "Kombinasi peran yang bekerja sama untuk menyatukan sumber daya komputasi perusahaan adalah …", ["Network specialist dan system analyst", "Operator dan data entry", "DBA dan sales", "Programmer dan direktur", "Manajer dan pelanggan"], 0, ""],
  // Lintas materi
  [3, "Lintas P1 & P3: karakteristik sistem yang paling sejalan dengan tahap “processing” SI (kalkulasi, perbandingan, alternatif) adalah …", ["Processing (pengolahan masukan menjadi keluaran)", "Boundary", "Controls", "Feedback", "Environment"], 0, ""],
  [5, "Lintas P4 & P5: piramida level CBIS dari bawah ke atas adalah …", ["TPS → MIS → EIS/DSS", "EIS → MIS → TPS", "MIS → TPS → DSS", "DSS → TPS → MIS", "ECS → PCS → ES"], 0, ""],
  [7, "Lintas P2 & P7: data inconsistency paling langsung merusak karakteristik informasi …", ["Accurate / reliable", "Simple", "Economical", "Flexible", "Timely"], 0, "Informasi dari data yang tidak konsisten tidak bisa dipercaya kebenarannya."]
];

module.exports = {
  id: "p8",
  nomor: 8,
  judul: "UTS / CPMK 2 (Materi P1–P7)",
  ujian: "UTS",
  hero: {
    badge: "Pertemuan 8 • UTS",
    title: "Persiapan UTS / CPMK 2",
    text: "Soal UTS diambil dari <strong>materi P1–P7</strong>. Halaman ini berisi peta materi, daftar pengecoh favorit, latihan “pertemuan berapa?”, dan <strong>bank soal " + S.length + " soal</strong> pilihan ganda campuran. Bank soal ini latihan buatan sendiri dengan gaya Latihan 2 modul, <strong>bukan soal ujian asli</strong>."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Peta Materi • P1–P7",
      title: "Satu Baris per Pertemuan",
      headers: ["Pertemuan", "Inti yang wajib hafal"],
      rows: [
        ["P1 Konsep Sistem", "McLeod: elemen–interaksi–tujuan • 6 karakteristik: boundary, input, processing, output, control, feedback • feedback −/+ • 2 cara mempelajari sistem"],
        ["P2 Konsep Informasi", "Data (mentah) → informasi (konteks) → knowledge (pengalaman) • 5K • 4 jenis data • 11 karakteristik (AACEFRRSSTV)"],
        ["P3 Konsep SI", "Fungsi: kumpul, proses, simpan, distribusi • 5 kerangka O’Brien • I-P-O • 3 peran: competitive advantage, decision making, processes & operations"],
        ["P4 Tipe SI", "OSS: TPS, PCS, ECS, ES • MSS: MIS, DSS, EIS"],
        ["P5 CBIS", "Jessup: hw+sw+telekom untuk collect-create-distribute • 5 elemen • 4 fungsi (HR, Finance, Manufacturing, Marketing) • 3 level • model CBIS"],
        ["P6 Teknologi Informasi", "Long & Beynon • modern IT • 4 generasi (tabung, transistor, IC, mikroprosesor) • mainframe-mini-micro • hw/sw/brainware • CPU, motherboard, RAM • software sistem vs aplikasi"],
        ["P7 Pengelolaan Data", "Field → record → file → database • entity & attribute • 5 masalah file tradisional • system analyst, DBA, operator, network specialist"]
      ],
      modes: [
        { label: "Benang merah", target: "none", title: "Materi saling menyambung", text: "Sistem (P1) + informasi (P2) = SI (P3) → jenis-jenisnya (P4) → versi berbasis komputer (P5) → alatnya (P6) → cara mengelola datanya (P7). Level CBIS (P5) = piramida tipe SI (P4)." }
      ]
    },
    {
      type: "cards",
      label: "Strategi • Gaya Soal Modul",
      title: "Cara Menjawab Cepat dan Aman",
      cols: 2,
      items: [
        { badge: "KECUALI", tone: "rose", title: "Coret yang ada di daftar", text: "Sebagian besar soal modul berbentuk “kecuali”. Hafalkan <strong>daftar lengkap</strong>; opsi yang tidak ada di daftar adalah jawabannya." },
        { badge: "Salah, kecuali", tone: "amber", title: "Cari yang BENAR", text: "Contoh di P3 & P6: “pembagian yang salah, kecuali” → pilih satu-satunya yang benar." },
        { badge: "Kata kunci", tone: "indigo", title: "Cocokkan kata kerja", text: "mengawasi → control • mengolah → processing • laporan format tetap → MIS • rekomendasi → DSS • eksekutif → EIS • arus uang → Finance IS." },
        { badge: "Nama mirip", tone: "violet", title: "Waspadai nama yang ditukar", text: "“Support <em>business</em> for competitive advantage” ✗ • “Teleconference” ✗ • “Restore IS” ✗ • “Resource Access Memory” ✗." }
      ]
    },
    {
      type: "table",
      label: "Daftar Pengecoh",
      title: "Opsi yang Sering Dipakai untuk Menjebak",
      headers: ["Topik", "Pengecoh (BUKAN jawaban)", "Daftar yang benar"],
      rows: [
        ["Karakteristik sistem", "Elemen, interface", "Boundary, input, processing, output, control, feedback"],
        ["5K", "Konsolidasi, kompilasi", "Kondensasi, kontekstualisasi, kalkulasi, kategorisasi, koreksi"],
        ["Karakteristik informasi", "Innovation, popular", "AACEFRRSSTV"],
        ["Foundation concepts", "Leadership", "Perilaku, teknis, bisnis, manajemen"],
        ["Peran SI", "Support business local", "Competitive advantage, decision making, processes & operations"],
        ["Operation Support", "Decision support system", "TPS, PCS, ECS, ES"],
        ["Elemen CBIS", "Teleconference", "Data, people, hardware, software, telecommunication"],
        ["Fungsi CBIS", "Restore information system", "HR, finance, manufacturing, marketing"],
        ["Masalah file tradisional", "Lack of knowledge", "Redundancy & inconsistency, dependence, flexibility, security, sharing"],
        ["Information specialist", "Business analyst, programmer", "System analyst, DBA, operator, network specialist"]
      ]
    },
    {
      type: "callout",
      label: "➕ Koreksi Modul yang Perlu Diingat",
      tone: "warn",
      heading: "Jawab sesuai modul, pahami versi yang lebih tepat",
      html: "<ul><li><strong>P1</strong>: definisi input di modul tercampur dengan port I/O mikroprosesor.</li><li><strong>P2</strong>: “data numerik = angka, huruf, karakter” lebih tepat disebut alfanumerik.</li><li><strong>P4</strong>: di O’Brien, expert system bukan bagian Operation Support.</li><li><strong>P6</strong>: Mesin Turing diperkenalkan 1936; Church bekerja terpisah. Generasi 1 umumnya ±1940–1956.</li><li><strong>P7</strong>: redundancy = data sama disimpan di banyak tempat.</li></ul>Jika soal UTS memakai kalimat modul, pilih jawaban versi modul."
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Latihan 1 • Ini Materi Pertemuan Berapa?",
      title: "Cocokkan Konsep dengan Pertemuannya",
      headers: ["Konsep", "Pertemuan"],
      rows: [
        { cells: ["Kondensasi dan kontekstualisasi"], fields: [{ options: PM, answer: "P2 Konsep Informasi" }], ok: "✓" },
        { cells: ["Feedback negatif dan positif"], fields: [{ options: PM, answer: "P1 Konsep Sistem" }], ok: "✓" },
        { cells: ["Management Challenges dan Development Processes"], fields: [{ options: PM, answer: "P3 Konsep SI" }], ok: "✓" },
        { cells: ["Process Control System"], fields: [{ options: PM, answer: "P4 Tipe SI" }], ok: "✓" },
        { cells: ["Virtual office dan knowledge-based system"], fields: [{ options: PM, answer: "P5 CBIS" }], ok: "✓ Model CBIS." },
        { cells: ["ENIAC dan transistor"], fields: [{ options: PM, answer: "P6 Teknologi Informasi" }], ok: "✓" },
        { cells: ["Program-data dependence"], fields: [{ options: PM, answer: "P7 Pengelolaan Data" }], ok: "✓" },
        { cells: ["Strategic planning, management control, operational control"], fields: [{ options: PM, answer: "P5 CBIS" }], ok: "✓ Level CBIS." },
        { cells: ["Accessible, verifiable, timely"], fields: [{ options: PM, answer: "P2 Konsep Informasi" }], ok: "✓" },
        { cells: ["Entity dan attribute"], fields: [{ options: PM, answer: "P7 Pengelolaan Data" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Latihan 2 • Studi Kasus Gabungan",
      title: "Aplikasi Toko Online “Batik Lestari”",
      items: [
        { prompt: "Pembeli mengisi alamat dan memilih produk", answer: "Input (P1/P3)", reason: "Data transaksi masuk." },
        { prompt: "Sistem mencatat ribuan pesanan setiap hari", answer: "TPS (P4), level operational control (P5)", reason: "Transaksi besar, rutin." },
        { prompt: "Pemilik toko melihat grafik ringkas omzet bulanan", answer: "EIS (P4), strategic planning (P5)", reason: "Untuk pimpinan." },
        { prompt: "Toko membuka penjualan di marketplace agar tidak kalah dengan toko lain", answer: "Support strategies for competitive advantage (P3)", reason: "Contoh e-commerce di modul." },
        { prompt: "Admin gudang dan kurir yang memakai aplikasi", answer: "People (P5) / brainware (P6)", reason: "Elemen manusia." },
        { prompt: "Stok di file gudang 10, di file penjualan 12", answer: "Data inconsistency (P7)", reason: "Atribut sama, nilai beda → informasi tidak akurat (P2)." },
        { prompt: "Penjualan turun, lalu promo ditambah sampai target tercapai lagi", answer: "Umpan balik negatif (P1)", reason: "Mengoreksi penyimpangan dari target." }
      ]
    }
  ],
  flashcards: [
    { tag: "P1", q: "6 karakteristik sistem?", a: "Boundary, input, processing, output, control, feedback." },
    { tag: "P1", q: "Feedback negatif vs positif?", a: "Negatif: mengurangi penyimpangan dari standar. Positif: menambah kekuatan gerak untuk menguatkan tujuan." },
    { tag: "P2", q: "5K?", a: "Kondensasi, kontekstualisasi, kalkulasi, kategorisasi, koreksi." },
    { tag: "P2", q: "11 karakteristik informasi?", a: "Accessible, accurate, complete, economical, flexible, relevant, reliable, secure, simple, timely, verifiable." },
    { tag: "P3", q: "5 kerangka O’Brien?", a: "Foundation Concepts, Information Technologies, Business Applications, Development Processes, Management Challenges." },
    { tag: "P3", q: "3 peran fundamental SI?", a: "Strategies for competitive advantage; business decision making; business processes and operations." },
    { tag: "P4", q: "OSS vs MSS?", a: "OSS: TPS, PCS, ECS, ES. MSS: MIS, DSS, EIS." },
    { tag: "P5", q: "5 elemen & 4 fungsi CBIS?", a: "Elemen: data, people, hardware, software, telecommunication. Fungsi: HR, finance, manufacturing, marketing IS." },
    { tag: "P5", q: "Level CBIS?", a: "Strategic planning (EIS/DSS), management control (MIS), operational control (TPS)." },
    { tag: "P6", q: "4 generasi komputer?", a: "Tabung hampa, transistor, IC, mikroprosesor." },
    { tag: "P6", q: "Software sistem vs aplikasi?", a: "Sistem: pengendali & koordinasi komputer. Aplikasi: menyelesaikan tugas tertentu." },
    { tag: "P7", q: "Hierarki data?", a: "Field → record → file → database." },
    { tag: "P7", q: "5 masalah file tradisional?", a: "Redundancy & inconsistency, program-data dependence, lack of flexibility, poor security, lack of data sharing & availability." },
    { tag: "P7", q: "4 information specialist?", a: "System analyst, database administrator, operator, network specialist." }
  ],
  quiz: S.map(([p, q, opts, ans, exp]) => ({ q, opts, ans, exp: "<strong>P" + p + "</strong>" + (exp ? " • " + exp : "") })),
  ringkasan: `*RANGKUMAN KILAT UTS — DASAR-DASAR SISTEM INFORMASI (P1–P7)*

P1 Sistem: elemen–interaksi–tujuan; boundary, input, processing, output, control, feedback (−/+).
P2 Informasi: data mentah → informasi (5K) → knowledge; 11 karakteristik AACEFRRSSTV.
P3 SI: kumpul-proses-simpan-distribusi; 5 kerangka O’Brien; 3 peran (competitive advantage, decision making, processes & operations).
P4 Tipe: OSS (TPS, PCS, ECS, ES) • MSS (MIS, DSS, EIS).
P5 CBIS: hw+sw+telekom; 5 elemen; 4 fungsi; level TPS→MIS→EIS/DSS; model Problems→CBIS→information→decision→solution.
P6 TI: Long & Beynon; generasi tabung→transistor→IC→mikroprosesor; mainframe/mini/micro; CPU otak, RAM volatile; software sistem vs aplikasi.
P7 Data: field→record→file→database; entity/attribute; 5 masalah file tradisional; analis, DBA, operator, network specialist.
⚠️ Soal “kecuali”: hafalkan daftar lengkapnya.`
};
