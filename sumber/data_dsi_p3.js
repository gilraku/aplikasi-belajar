// Dasar-dasar Sistem Informasi — Pertemuan 3: Konsep Sistem Informasi (sumber: modul BAB 3, O'Brien)
const KK = ["Foundation Concepts", "Information Technologies", "Business Applications", "Development Processes", "Management Challenges"];
const PF = ["Competitive advantage", "Decision making", "Process & operation"];
const IPO = ["Input", "Processing", "Output", "Storage", "Control"];
const Q = [
  ["Berikut ini definisi yang tepat untuk sistem informasi, KECUALI …", ["Kumpulan banyak komponen yang saling terkait yang tidak bertujuan untuk mewujudkan organisasi", "Komponen yang saling berkaitan untuk mengumpulkan, memproses, menyimpan, dan mendistribusikan informasi untuk mencapai tujuan tertentu", "Semua sumber daya yang diperlukan untuk menyampaikan informasi dan mewujudkan tujuan organisasi", "Semua sumber daya yang diperlukan untuk menyampaikan informasi", "Komponen yang saling berkaitan yang berfungsi mewujudkan tujuan organisasi"], 0, "SI selalu punya <strong>tujuan</strong>. <em>(Latihan 2 modul no. 1)</em>", ["Benar, “tidak bertujuan” keliru.", "Definisi modul.", "Definisi modul.", "Potongan definisi modul.", "Sesuai."]],
  ["Kerangka kerja SI yang membahas proses pengembangan dan pengimplementasian sistem informasi adalah …", ["Management Challenges", "Development Processes", "Business Applications", "Foundation Concepts", "Information Technologies"], 1, "<em>(Latihan 2 no. 2)</em>", ["Pengelolaan.", "Benar.", "Penggunaan SI.", "Dasar-dasar.", "Hardware, software, data."]],
  ["Di bawah ini adalah peran fundamental sistem informasi yang salah, KECUALI … (artinya: pilih yang BENAR)", ["Support business for competitive advantage", "Support strategies decision making", "Support strategies for process and operation", "Support business decision making", "Support business local"], 3, "“Salah, kecuali” = cari yang benar. Tiga peran: <em>strategies for competitive advantage</em>, <em>business decision making</em>, <em>business processes and operations</em>. <em>(Latihan 2 no. 3)</em>", ["Kata “business/strategies” tertukar.", "Tertukar.", "Tertukar.", "Benar, nama persis.", "Tidak ada."]],
  ["Yang dibahas dalam kerangka Foundation Concepts adalah benar, KECUALI konsep dasar terkait …", ["Perilaku (fundamental behavioural)", "Permasalahan teknis", "Permasalahan bisnis", "Permasalahan leadership", "Permasalahan manajemen"], 3, "Foundation: perilaku, teknis, bisnis, manajemen. <em>(Latihan 2 no. 4)</em>", ["Ada.", "Ada.", "Ada.", "Benar, tidak disebut.", "Ada."]],
  ["SI membantu perusahaan retail mencatat pembelian pelanggan, inventaris, dan gaji pegawai. Ini peran SI sebagai …", ["Support strategies for competitive advantage", "Support strategies for decision making", "Support business decision making", "Support business processes and operations", "Support marketing process and operation"], 3, "Contoh persis di modul. <em>(Latihan 2 no. 5)</em>", ["Contohnya e-commerce untuk bersaing.", "Nama keliru.", "Contohnya analisis pasokan.", "Benar.", "Tidak ada."]],
  ["Perusahaan pangan memakai SI untuk menghitung kebutuhan pasokan harian agar petinggi bisa memutuskan jumlah pembelian. Ini peran …", ["Support business processes and operations", "Support business decision making", "Support strategies for competitive advantage", "Development processes", "Foundation concepts"], 1, "Contoh modul untuk decision making.", ["Pencatatan rutin.", "Benar.", "Persaingan.", "Itu kerangka kerja.", "Itu kerangka kerja."]],
  ["UMKM membuka toko di marketplace supaya produknya tidak kalah dengan pesaing. Ini peran SI …", ["Support strategies for competitive advantage", "Support business decision making", "Support business processes and operations", "Management challenges", "Information technologies"], 0, "Contoh modul: e-commerce memengaruhi strategi pemasaran agar tidak kalah saing.", ["Benar.", "Bukan.", "Bukan.", "Kerangka kerja.", "Kerangka kerja."]],
  ["Kerangka kerja yang membahas hardware, software, manajemen data, dan teknologi berbasis internet adalah …", ["Information Technologies", "Business Applications", "Foundation Concepts", "Development Processes", "Management Challenges"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Kerangka kerja yang membahas penggunaan SI untuk operasional, manajemen, dan pengambilan keputusan adalah …", ["Business Applications", "Foundation Concepts", "Development Processes", "Information Technologies", "Management Challenges"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Fungsi-fungsi SI menurut definisi modul adalah …", ["Mengumpulkan, memproses, menyimpan, mendistribusikan informasi", "Merancang, menjual, mengirim, menagih", "Mengamati, mengawasi, mengoreksi", "Meringkas, menghitung, mengelompokkan", "Menginput, mencetak, memusnahkan"], 0, "", ["Benar.", "Proses bisnis.", "Mirip control (P1).", "Mirip 5K (P2).", "Bukan."]],
  ["Pada tahap processing SI, kegiatan yang terlibat menurut modul adalah …", ["Capturing data mentah", "Kalkulasi data, perbandingan data, dan pencarian alternatif lain", "Mencetak laporan", "Membagikan informasi ke pengguna", "Menentukan batas sistem"], 1, "Input = capturing data mentah; processing = transformasi data.", ["Itu input.", "Benar.", "Output.", "Output/distribusi.", "Boundary (P1)."]],
  ["➕ Perbedaan sistem informasi (SI) dan teknologi informasi (TI) yang paling tepat adalah …", ["SI dan TI adalah istilah yang sama", "TI adalah alat (hardware, software, jaringan); SI adalah keseluruhan sistem termasuk orang, prosedur, data, dan TI untuk mencapai tujuan", "SI hanya berupa komputer", "TI mencakup manusia dan prosedur, SI hanya perangkat", "SI tidak memerlukan data"], 1, "TI adalah salah satu bagian dari SI.", ["Keliru.", "Benar.", "SI bisa juga manual.", "Terbalik.", "Keliru."]]
];

module.exports = {
  id: "p3",
  nomor: 3,
  judul: "Konsep Sistem Informasi",
  ujian: "CPMK 1",
  hero: {
    badge: "Materi 3 • Dasar-dasar SI",
    title: "Sistem + Informasi = Sistem Informasi",
    text: "Gabungkan P1 dan P2: <strong>definisi SI</strong>, <strong>5 kerangka kerja konseptual</strong> O’Brien, alur <strong>Input → Processing → Output</strong>, dan <strong>3 peran fundamental</strong> SI."
  },
  cheatsheet: [
    {
      type: "callout",
      label: "Interaktif 1 • Definisi Sistem Informasi",
      tone: "info",
      heading: "Tiga rumusan di modul",
      html: "<ol><li>Kumpulan banyak <strong>komponen yang saling terkait</strong> dengan fungsi berbeda: input, processing, output (data/informasi).</li><li>Komponen saling berkaitan yang berfungsi <strong>mengumpulkan, memproses, menyimpan, dan mendistribusikan</strong> informasi untuk mencapai tujuan tertentu.</li><li><strong>Semua sumber daya</strong> yang diperlukan untuk menyampaikan informasi dan mewujudkan <strong>tujuan organisasi</strong>.</li></ol>Mengapa dipelajari? SI sudah terintegrasi di akuntansi, keuangan, manajemen operasi, pemasaran, SDM; SI & TI adalah <strong>komponen vital</strong> keberhasilan bisnis."
    },
    {
      type: "table",
      label: "Interaktif 2 • Kerangka Kerja Konseptual (O’Brien)",
      title: "5 Area yang Dibahas dalam SI (Gambar 3.1)",
      headers: ["Kerangka", "Membahas", "Kata kunci soal"],
      rows: [
        ["1. Foundation Concepts", "Dasar-dasar <strong>perilaku</strong>, permasalahan <strong>teknis</strong>, <strong>bisnis</strong>, dan konsep <strong>manajemen</strong>", "konsep dasar"],
        ["2. Information Technologies", "Konsep utama, pengembangan, isu manajemen teknologi: <strong>software, hardware, manajemen data</strong>, teknologi berbasis internet", "hardware/software/data"],
        ["3. Business Applications", "Penggunaan SI untuk <strong>operasional, manajemen</strong>, industri, dan <strong>pengambilan keputusan</strong>", "penggunaan SI"],
        ["4. Development Processes", "Proses <strong>pengembangan & pengimplementasian</strong> SI untuk memenuhi peluang bisnis", "membangun SI"],
        ["5. Management Challenges", "<strong>Pengelolaan</strong> SI dan tantangan manajemen oleh pelaku bisnis/praktisi TI", "mengelola, tantangan"]
      ],
      modes: [
        { label: "Jembatan keledai", target: "none", title: "F-I-B-D-M", text: "“<strong>F</strong>ondasi → <strong>I</strong>T → <strong>B</strong>isnis → <strong>D</strong>evelop → <strong>M</strong>anage”: dari dasar, alatnya, pemakaiannya, cara membuatnya, lalu cara mengelolanya." },
        { label: "Jebakan", target: "row", row: 0, title: "Leadership tidak disebut", text: "Foundation hanya menyebut perilaku, teknis, bisnis, manajemen. Opsi “leadership” adalah pengecoh." },
        { label: "➕ Isi Management Challenges", target: "row", row: 4, title: "Contoh tantangannya", text: "Dalam O’Brien, tantangan ini mencakup <strong>keamanan & etika</strong>, pengendalian (<em>control</em>), dan pengelolaan TI secara global." }
      ]
    },
    {
      type: "flow",
      label: "Interaktif 3 • Proses Kerja SI (Gambar 3.2)",
      title: "Input → Processing → Output",
      items: ["INPUT: mengumpulkan & capturing data mentah", "PROCESSING: transformasi (kalkulasi, perbandingan, mencari alternatif)", "OUTPUT: informasi sesuai tujuan SI"],
      note: "➕ Model lengkap O’Brien menambahkan <strong>storage</strong> (penyimpanan data) dan <strong>control/feedback</strong> (pengendalian kinerja sistem), sama dengan karakteristik sistem di P1."
    },
    {
      type: "choices",
      label: "Interaktif 4 • 3 Peran Fundamental SI (Gambar 3.3)",
      title: "Segitiga Peran Sistem Informasi",
      style: "pills",
      options: [
        { label: "Competitive advantage", tone: "violet", badge: "Puncak segitiga", title: "Support strategies for competitive advantage",
          text: "SI mendukung <strong>strategi</strong> agar tetap punya <strong>daya saing</strong> dengan kompetitor.",
          note: "Contoh modul: <strong>e-commerce</strong> mengubah strategi pemasaran sehingga produk laku dan tidak kalah saing." },
        { label: "Decision making", tone: "sky", badge: "Tengah", title: "Support business decision making",
          text: "SI membantu pelaku bisnis <strong>mengambil keputusan</strong>.",
          note: "Contoh modul: perusahaan pangan menghitung <strong>kebutuhan pasokan harian</strong> untuk menghindari human error." },
        { label: "Process & operation", tone: "emerald", badge: "Dasar segitiga", title: "Support business processes and operations",
          text: "SI mendukung semua <strong>proses dan operasi bisnis</strong> rutin.",
          note: "Contoh modul: retail mencatat <strong>pembelian pelanggan</strong>, persediaan bahan baku, <strong>pembayaran pegawai</strong>, tren penjualan." }
      ]
    },
    {
      type: "callout",
      label: "Jebakan Soal",
      tone: "warn",
      heading: "Nama perannya sering ditukar",
      html: "Pasangan yang benar: <strong>strategies</strong> → competitive advantage; <strong>business</strong> → decision making; <strong>business</strong> → processes and operations. Opsi seperti “support <em>business</em> for competitive advantage” atau “support <em>strategies</em> decision making” adalah pengecoh.<br><br>Soal “yang <strong>salah</strong>, <strong>kecuali</strong>” artinya kamu harus memilih yang <strong>benar</strong>."
    },
    {
      type: "cards",
      label: "➕ Tambahan • Komponen SI & Beda SI–TI",
      title: "Sering Ditanyakan Walau Tidak di Modul Ini",
      cols: 2,
      items: [
        { badge: "5 sumber daya SI (O’Brien)", tone: "indigo", title: "People, Hardware, Software, Data, Network", text: "Akan dibahas lagi sebagai <strong>elemen CBIS</strong> di P5." },
        { badge: "SI ≠ TI", tone: "amber", title: "TI adalah alatnya, SI adalah sistemnya", text: "TI = hardware, software, jaringan. SI = orang + prosedur + data + TI yang bekerja untuk tujuan organisasi. SI bisa saja manual (tanpa komputer)." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Peran Fundamental",
      title: "Contoh Ini Mendukung Peran yang Mana?",
      headers: ["Contoh", "Peran"],
      rows: [
        { cells: ["Kafe memakai aplikasi kasir untuk mencatat setiap pesanan"], fields: [{ options: PF, answer: "Process & operation" }], ok: "✓ Operasi rutin." },
        { cells: ["Dashboard menunjukkan cabang mana yang rugi sehingga direktur memutuskan menutupnya"], fields: [{ options: PF, answer: "Decision making" }], ok: "✓" },
        { cells: ["Ojek online membuat fitur langganan agar pelanggan tidak pindah ke kompetitor"], fields: [{ options: PF, answer: "Competitive advantage" }], ok: "✓" },
        { cells: ["Sistem penggajian menghitung gaji karyawan tiap bulan"], fields: [{ options: PF, answer: "Process & operation" }], ok: "✓" },
        { cells: ["Analisis data musiman untuk menentukan jumlah stok menjelang Lebaran"], fields: [{ options: PF, answer: "Decision making" }], ok: "✓" },
        { cells: ["Toko buku lokal membuka toko online agar tetap bersaing dengan toko besar"], fields: [{ options: PF, answer: "Competitive advantage" }], ok: "✓ Contoh e-commerce di modul." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Kerangka Kerja Konseptual",
      title: "Topik Ini Masuk Kerangka yang Mana?",
      headers: ["Topik", "Kerangka"],
      rows: [
        { cells: ["Membandingkan SSD vs HDD dan memilih DBMS"], fields: [{ options: KK, answer: "Information Technologies" }], ok: "✓" },
        { cells: ["Tahapan membangun dan menerapkan aplikasi baru di perusahaan"], fields: [{ options: KK, answer: "Development Processes" }], ok: "✓" },
        { cells: ["Konsep dasar perilaku manusia dan masalah bisnis"], fields: [{ options: KK, answer: "Foundation Concepts" }], ok: "✓" },
        { cells: ["Pemakaian SI untuk operasional dan pengambilan keputusan"], fields: [{ options: KK, answer: "Business Applications" }], ok: "✓" },
        { cells: ["Cara manajer mengelola keamanan dan etika penggunaan SI"], fields: [{ options: KK, answer: "Management Challenges" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Proses Kerja SI di Aplikasi Ojek Online",
      title: "Input, Processing, atau Output?",
      headers: ["Kegiatan", "Tahap"],
      rows: [
        { cells: ["Penumpang memasukkan titik jemput dan tujuan"], fields: [{ options: IPO, answer: "Input" }], ok: "✓" },
        { cells: ["Aplikasi menghitung tarif dan mencari pengemudi terdekat"], fields: [{ options: IPO, answer: "Processing" }], ok: "✓ Kalkulasi, perbandingan, alternatif." },
        { cells: ["Tampil estimasi harga dan nama pengemudi"], fields: [{ options: IPO, answer: "Output" }], ok: "✓" },
        { cells: ["Riwayat perjalanan disimpan di server"], fields: [{ options: IPO, answer: "Storage" }], ok: "✓ ➕ Model lengkap O’Brien." }
      ]
    }
  ],
  flashcards: [
    { tag: "Definisi", q: "Definisi SI (fungsi)?", a: "Komponen saling berkaitan yang mengumpulkan, memproses, menyimpan, dan mendistribusikan informasi untuk mencapai tujuan tertentu." },
    { tag: "Definisi", q: "Definisi SI (sumber daya)?", a: "Semua sumber daya yang diperlukan untuk menyampaikan informasi dan mewujudkan tujuan organisasi." },
    { tag: "Kerangka", q: "5 kerangka kerja konseptual SI (O’Brien)?", a: "Foundation Concepts, Information Technologies, Business Applications, Development Processes, Management Challenges." },
    { tag: "Kerangka", q: "Isi Foundation Concepts?", a: "Dasar perilaku (fundamental behavioural), permasalahan teknis, bisnis, dan konsep manajemen." },
    { tag: "Kerangka", q: "Isi Information Technologies?", a: "Software, hardware, manajemen data, teknologi berbasis internet, dan isu manajemen teknologi." },
    { tag: "Kerangka", q: "Isi Development Processes?", a: "Proses pengembangan dan pengimplementasian SI untuk memenuhi peluang bisnis." },
    { tag: "Proses", q: "Input vs processing pada SI?", a: "Input: mengumpulkan & capturing data mentah. Processing: transformasi data (kalkulasi, perbandingan, mencari alternatif)." },
    { tag: "Peran", q: "3 peran fundamental SI?", a: "Support strategies for competitive advantage; support business decision making; support business processes and operations." },
    { tag: "Peran", q: "Contoh competitive advantage di modul?", a: "Situs e-commerce yang mengubah strategi pemasaran agar produk tidak kalah saing." },
    { tag: "Peran", q: "Contoh processes & operations di modul?", a: "Retail mencatat pembelian pelanggan, persediaan bahan baku, pembayaran pegawai, evaluasi tren penjualan." },
    { tag: "➕ SI vs TI", q: "Beda SI dan TI?", a: "TI = alat (hardware, software, jaringan). SI = orang, prosedur, data, dan TI yang bekerja untuk tujuan organisasi." },
    { tag: "➕ Komponen", q: "5 sumber daya SI (O’Brien)?", a: "People, hardware, software, data, network." }
  ],
  quiz: Q.map(([q, opts, ans, exp, optExp]) => ({ q, opts, ans, exp, optExp })),
  ringkasan: `*RANGKUMAN KILAT CPMK 1 — DASAR-DASAR SI P3*
📚 *Konsep Sistem Informasi*

1️⃣ SI: komponen saling berkaitan yang mengumpulkan, memproses, menyimpan, mendistribusikan informasi untuk tujuan organisasi.
2️⃣ 5 kerangka (O’Brien): Foundation Concepts (perilaku, teknis, bisnis, manajemen) • Information Technologies (hw, sw, data, internet) • Business Applications (operasional, manajemen, keputusan) • Development Processes (bangun & implementasi) • Management Challenges (pengelolaan).
3️⃣ Proses: Input (capture data) → Processing (kalkulasi, banding, alternatif) → Output.
4️⃣ 3 peran: strategies for competitive advantage (e-commerce) • business decision making (pasokan) • business processes & operations (retail, gaji).
⚠️ “Salah, kecuali” = pilih yang benar. Leadership bukan isi Foundation.
➕ SI ≠ TI. 5 sumber daya: people, hardware, software, data, network.`
};
