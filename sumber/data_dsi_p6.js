// Dasar-dasar Sistem Informasi — Pertemuan 6: Teknologi Informasi (sumber: modul BAB 6)
const GEN = ["Generasi 1", "Generasi 2", "Generasi 3", "Generasi 4"];
const HW = ["Input", "Proses", "Output", "Penyimpanan"];
const SW = ["Perangkat lunak sistem", "Perangkat lunak aplikasi"];
const KOM = ["Hardware", "Software", "Brainware"];
const Q = [
  ["Komponen yang biasa dikenal sebagai otak dari komputer adalah …", ["Data", "Hardware", "CPU", "Motherboard", "Keyboard"], 2, "<em>(Latihan 2 modul no. 1)</em>", ["Bukan.", "Terlalu umum.", "Benar.", "Papan penghubung komponen.", "Alat input."]],
  ["Alat-alat komputer yang dapat digunakan, dilihat secara nyata, disentuh, dan ada wujudnya disebut …", ["Software", "Hardware", "CPU", "Motherboard", "Keyboard"], 1, "<em>(Latihan 2 no. 2)</em>", ["Tidak berwujud.", "Benar.", "Salah satu hardware.", "Salah satu hardware.", "Salah satu hardware."]],
  ["Di bawah ini pembagian perangkat lunak yang salah, KECUALI … (pilih yang BENAR)", ["System Application and Software Application", "System Application and Application Software", "System Software Application and Software Application", "System Software and Application Software", "System Software and Marketing Application"], 3, "Dua kategori: <strong>system software</strong> dan <strong>application software</strong>. <em>(Latihan 2 no. 3; kunci versi modul tertulis “System Software and Application”)</em>", ["Tertukar.", "“System application” bukan kategori.", "Keliru.", "Benar.", "Tidak ada."]],
  ["Perangkat yang memasukkan data gambar ke komputer dan prinsipnya mirip mesin fotokopi adalah …", ["Scanner", "Monitor", "CPU", "RAM", "Speaker"], 0, "<em>(Latihan 2 no. 4)</em>", ["Benar.", "Output.", "Proses.", "Memori.", "Output."]],
  ["RAM adalah singkatan dari …", ["Resource Access Memory", "Random Access Memory", "Random Access Marketing", "Resource Access Marketing", "Resource Active Memory"], 1, "<em>(Latihan 2 no. 5)</em>", ["Bukan.", "Benar.", "Bukan.", "Bukan.", "Bukan."]],
  ["Teknologi informasi menurut Larry & Nancy Long adalah gabungan antara …", ["Teknologi komputer dan pengolahan informasi", "Hardware dan brainware", "Data dan pengetahuan", "Telekomunikasi dan pemasaran", "Mesin Turing dan transistor"], 0, "Computing technology + information processing.", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Komputer generasi pertama dibangun dengan teknologi …", ["Transistor", "Integrated circuit", "Tabung hampa (vacuum tubes)", "Mikroprosesor", "Kecerdasan buatan"], 2, "Contoh ENIAC (±18.000 tabung).", ["Generasi 2.", "Generasi 3.", "Benar.", "Generasi 4.", "➕ Sering disebut generasi 5."]],
  ["Komputer yang 1000 kali lebih cepat, lebih kecil, lebih andal, dan lebih murah dari generasi sebelumnya, dibangun dengan teknologi transistor, adalah generasi …", ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"], 1, "", ["Tabung.", "Benar.", "IC.", "Mikroprosesor.", "Bukan."]],
  ["Ratusan transistor yang disusun dalam satu rangkaian terintegrasi dan dikemas dalam silicon chip adalah ciri komputer generasi …", ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"], 2, "IC = Integrated Circuit.", ["Bukan.", "Bukan.", "Benar.", "Mikroprosesor.", "Bukan."]],
  ["Berdasarkan ukuran, kemampuan, dan jumlah pengguna, perangkat keras dibagi menjadi …", ["Mainframe, minicomputer, microcomputer", "Input, proses, output", "Hardware, software, brainware", "Desktop, laptop, tablet", "Server, client, router"], 0, "", ["Benar.", "Pembagian menurut fungsi.", "Komponen komputer.", "Bukan pembagian modul.", "Bukan."]],
  ["Sifat RAM yang tidak menyimpan data secara permanen disebut …", ["Non-volatile", "Volatile", "Read-only", "Persistent", "Static"], 1, "Data hilang saat listrik mati.", ["Kebalikannya (ROM, SSD).", "Benar.", "ROM.", "Bukan.", "Bukan."]],
  ["Komponen berbentuk papan dengan slot-slot yang menghubungkan seluruh komponen PC adalah …", ["Motherboard", "CPU", "RAM", "Scanner", "GPU"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Program komputer yang berfungsi sebagai pengendali dan koordinasi kegiatan sistem komputer adalah …", ["Perangkat lunak aplikasi", "Perangkat lunak sistem", "Brainware", "Firmware jaringan", "Database"], 1, "", ["Untuk tugas tertentu pengguna.", "Benar, mis. sistem operasi.", "Manusia.", "Bukan istilah modul.", "Bukan."]],
  ["Microsoft Word, aplikasi kasir, dan browser termasuk …", ["Perangkat lunak sistem", "Perangkat lunak aplikasi", "Hardware", "Brainware", "Sistem operasi"], 1, "", ["Bukan.", "Benar.", "Bukan.", "Bukan.", "Itu perangkat lunak sistem."]],
  ["Menurut modul, Mesin Turing adalah …", ["Komputer generasi pertama", "Model ideal untuk melakukan perhitungan matematis yang menjadi dasar pengembangan hardware", "Mikroprosesor pertama", "Perangkat input", "Sistem operasi"], 1, "", ["Bukan mesin fisik.", "Benar.", "Bukan.", "Bukan.", "Bukan."]],
  ["Mic termasuk perangkat …", ["Input", "Output", "Proses", "Penyimpanan", "Software"], 0, "Memasukkan data suara/audio.", ["Benar.", "Speaker yang output.", "Bukan.", "Bukan.", "Bukan."]]
];

module.exports = {
  id: "p6",
  nomor: 6,
  judul: "Teknologi Informasi",
  ujian: "UTS",
  hero: {
    badge: "Materi 6 • Dasar-dasar SI",
    title: "Hardware, Software, dan Sejarah Komputer",
    text: "Pahami <strong>definisi TI</strong>, komponen <strong>modern IT</strong>, <strong>4 generasi komputer</strong>, pembagian <strong>mainframe-mini-micro</strong>, contoh <strong>perangkat keras</strong>, dan <strong>2 kategori perangkat lunak</strong>."
  },
  cheatsheet: [
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "callout",
          label: "Interaktif 1 • Definisi TI",
          tone: "info",
          heading: "Dua definisi",
          html: "<ul><li><strong>Larry & Nancy Long:</strong> gabungan (integrasi) <strong>teknologi komputer</strong> (<em>computing technology</em>) dengan <strong>pengolahan informasi</strong> (<em>information processing</em>).</li><li><strong>Beynon-Davies:</strong> terdiri dari <strong>artefak</strong> (hasil buatan manusia) untuk <strong>pengumpulan, penyimpanan, penyebaran, dan manipulasi data</strong>.</li></ul>"
        },
        {
          type: "list",
          label: "Modern Information Technology",
          title: "Komponen IT System",
          groups: [{ tone: "indigo", items: [
            "<strong>Hardware</strong> → aspek fisik (<em>hard</em>) TI",
            "<strong>Software</strong> → aspek non-fisik (<em>soft</em>) TI",
            "<strong>Communication technology</strong> → berbagai interkoneksi antar komponen TI",
            "<strong>Data</strong>"
          ] }]
        }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 2 • Sejarah Perkembangan Komputer",
      title: "Dari Mesin Turing sampai Mikroprosesor",
      tabs: [
        { label: "Mesin Turing", blocks: [
          { type: "callout", tone: "info", html: "Hardware komputer dikembangkan dengan model komputasi <strong>Mesin Turing</strong>: model ideal untuk melakukan <strong>penghitungan matematis</strong>. Perkembangan hardware sangat bergantung pada <strong>rekayasa elektronika</strong>." },
          { type: "callout", tone: "warn", heading: "➕ Koreksi modul", html: "Modul menulis Mesin Turing dibuat Alan Turing <strong>tahun 1930</strong> “bersama Alonzo Church”. Lebih tepatnya: Alan Turing memperkenalkannya dalam makalah <strong>1936</strong>. Alonzo Church bekerja <strong>terpisah</strong> dengan <em>lambda calculus</em> yang terbukti setara; gabungan ide keduanya dikenal sebagai <strong>tesis Church–Turing</strong>. Jika soal mengikuti modul, pilih jawaban versi modul." }
        ] },
        { label: "Gen 1", blocks: [
          { type: "callout", tone: "rose", heading: "Tabung hampa (vacuum tubes)", html: "Ukuran <strong>sangat besar</strong>, lambat, sering gagal. Contoh <strong>ENIAC</strong>: ±18.000 tabung, gagal setiap ±7 menit. Modul: dekade 30-an–40-an. ➕ Banyak buku menulis ±1940–1956 (ENIAC selesai 1946)." }
        ] },
        { label: "Gen 2", blocks: [
          { type: "callout", tone: "amber", heading: "Transistor", html: "Dekade 50-an – pertengahan 60-an. <strong>Lebih kecil</strong>, <strong>1000× lebih cepat</strong>, lebih andal (<em>reliable</em>), lebih murah." }
        ] },
        { label: "Gen 3", blocks: [
          { type: "callout", tone: "sky", heading: "Integrated Circuit (IC)", html: "Akhir 60-an – 70-an. Ratusan transistor dalam satu rangkaian terintegrasi, dikemas dalam <strong>silicon chip</strong>. Ukuran & biaya turun drastis; reliability, speed, efficiency naik. Produksi chip massal → harga sangat murah." }
        ] },
        { label: "Gen 4", blocks: [
          { type: "callout", tone: "emerald", heading: "Mikroprosesor", html: "70-an – sekarang. Perubahan sangat radikal pada ukuran, kemampuan, kecepatan, harga. Dikelompokkan menjadi <strong>Mainframe</strong> (terbesar, multi-user, data skala besar), <strong>Minicomputer</strong> (midrange), <strong>Microcomputer</strong> (PC)." },
          { type: "callout", tone: "tip", heading: "➕ Generasi 5", html: "Banyak buku menambahkan generasi kelima: <strong>kecerdasan buatan (AI)</strong>, pemrosesan paralel, dan komputasi berbasis pengetahuan. Tidak ada di modul." }
        ] }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Perangkat Keras",
      title: "Contoh Hardware di Modul",
      headers: ["Perangkat", "Jenis", "Catatan"],
      rows: [
        ["Keyboard", "Input", "USB, wireless, PS2"],
        ["Mouse", "Input", "Banyak dipakai di sistem operasi grafis"],
        ["Scanner", "Input", "Memasukkan data <strong>gambar</strong>; prinsip mirip <strong>mesin fotokopi</strong>"],
        ["Mic", "Input", "Memasukkan data suara/audio (pengguna multimedia)"],
        ["CPU", "Proses", "<strong>Otak komputer</strong>: proses, kalkulasi, perintah; berkipas; CPU baru ada <strong>GPU terintegrasi</strong>"],
        ["Motherboard", "Penghubung", "Papan dengan slot yang <strong>menghubungkan seluruh komponen</strong> PC"],
        ["RAM", "Memori", "Tempat transit data sementara untuk operasi CPU; <strong>volatile</strong>"]
      ],
      modes: [
        { label: "3 bagian komputer", target: "none", title: "Hardware • Software • Brainware", text: "Modul: perangkat komputer terdiri dari <strong>hardware</strong>, <strong>software</strong>, dan <strong>brainware</strong> (manusia yang mengoperasikan: user, programmer, operator)." },
        { label: "➕ Output & storage", target: "none", title: "Yang belum disebut modul", text: "<strong>Output</strong>: monitor, printer, speaker, proyektor. <strong>Penyimpanan</strong>: HDD, SSD, flashdisk. <strong>ROM</strong> = memori <em>non-volatile</em> berisi instruksi awal (BIOS/firmware), kebalikan RAM." },
        { label: "➕ Data RAM terkini", target: "row", row: 6, title: "Kapasitas di modul sudah lama", text: "Modul menulis RAM PC 256 MB–16 GB. Saat ini PC/laptop umumnya <strong>8–32 GB</strong>, dan workstation bisa jauh lebih besar." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 4 • Perangkat Lunak",
      title: "Dua Kategori Software",
      style: "toggle",
      options: [
        { label: "System software", tone: "indigo", badge: "Pengendali", title: "Perangkat lunak sistem",
          text: "Program yang berfungsi sebagai <strong>pengendali dan koordinasi</strong> kegiatan sistem komputer.",
          note: "➕ Contoh: sistem operasi (Windows, Linux, Android), driver, utility (antivirus, disk cleanup)." },
        { label: "Application software", tone: "emerald", badge: "Tugas pengguna", title: "Perangkat lunak aplikasi",
          text: "Program yang dibuat dengan <strong>bahasa pemrograman</strong> tertentu untuk menyelesaikan <strong>perintah dalam bentuk aplikasi tertentu</strong>.",
          note: "➕ Contoh: Microsoft Word, browser, aplikasi kasir, game, aplikasi m-banking." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Urutkan Generasi",
      title: "Teknologi Ini Generasi Berapa?",
      headers: ["Ciri", "Generasi"],
      rows: [
        { cells: ["ENIAC dengan ribuan tabung hampa"], fields: [{ options: GEN, answer: "Generasi 1" }], ok: "✓" },
        { cells: ["Transistor, 1000× lebih cepat"], fields: [{ options: GEN, answer: "Generasi 2" }], ok: "✓" },
        { cells: ["Silicon chip berisi ratusan transistor (IC)"], fields: [{ options: GEN, answer: "Generasi 3" }], ok: "✓" },
        { cells: ["Mikroprosesor; muncul PC"], fields: [{ options: GEN, answer: "Generasi 4" }], ok: "✓" },
        { cells: ["Ukuran sangat besar dan sering gagal"], fields: [{ options: GEN, answer: "Generasi 1" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Jenis Perangkat Keras",
      title: "Input, Proses, Output, atau Penyimpanan?",
      headers: ["Perangkat", "Jenis"],
      rows: [
        { cells: ["Scanner"], fields: [{ options: HW, answer: "Input" }], ok: "✓" },
        { cells: ["CPU"], fields: [{ options: HW, answer: "Proses" }], ok: "✓" },
        { cells: ["Printer"], fields: [{ options: HW, answer: "Output" }], ok: "✓ ➕" },
        { cells: ["SSD"], fields: [{ options: HW, answer: "Penyimpanan" }], ok: "✓ ➕" },
        { cells: ["Mic"], fields: [{ options: HW, answer: "Input" }], ok: "✓" },
        { cells: ["Speaker"], fields: [{ options: HW, answer: "Output" }], ok: "✓ ➕" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Software & Brainware",
      title: "Kelompokkan",
      headers: ["Contoh", "Kategori"],
      rows: [
        { cells: ["Windows 11"], fields: [{ options: SW, answer: "Perangkat lunak sistem" }], ok: "✓ Sistem operasi." },
        { cells: ["Aplikasi kasir minimarket"], fields: [{ options: SW, answer: "Perangkat lunak aplikasi" }], ok: "✓" },
        { cells: ["Driver printer"], fields: [{ options: SW, answer: "Perangkat lunak sistem" }], ok: "✓" },
        { cells: ["Google Chrome"], fields: [{ options: SW, answer: "Perangkat lunak aplikasi" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 4 • 3 Bagian Komputer",
      title: "Hardware, Software, atau Brainware?",
      headers: ["Contoh", "Bagian"],
      rows: [
        { cells: ["Operator yang menjalankan server"], fields: [{ options: KOM, answer: "Brainware" }], ok: "✓" },
        { cells: ["RAM 16 GB"], fields: [{ options: KOM, answer: "Hardware" }], ok: "✓" },
        { cells: ["Antivirus"], fields: [{ options: KOM, answer: "Software" }], ok: "✓" },
        { cells: ["Programmer"], fields: [{ options: KOM, answer: "Brainware" }], ok: "✓" }
      ]
    }
  ],
  flashcards: [
    { tag: "Definisi", q: "TI menurut Larry & Nancy Long?", a: "Gabungan teknologi komputer (computing technology) dengan pengolahan informasi (information processing)." },
    { tag: "Definisi", q: "TI menurut Beynon-Davies?", a: "Artefak buatan manusia untuk pengumpulan, penyimpanan, penyebaran, dan manipulasi data." },
    { tag: "Modern IT", q: "Komponen modern IT?", a: "Hardware (aspek fisik), software (aspek non-fisik), communication technology (interkoneksi), data." },
    { tag: "Sejarah", q: "Apa itu Mesin Turing?", a: "Model ideal untuk penghitungan matematis yang menjadi dasar pengembangan hardware komputer." },
    { tag: "Generasi", q: "Teknologi generasi 1–4?", a: "1: tabung hampa • 2: transistor • 3: IC/silicon chip • 4: mikroprosesor." },
    { tag: "Generasi", q: "Contoh komputer generasi 1?", a: "ENIAC: ±18.000 tabung, gagal setiap ±7 menit." },
    { tag: "Ukuran", q: "3 jenis komputer berdasarkan ukuran & pengguna?", a: "Mainframe (terbesar, multi-user), minicomputer (midrange), microcomputer (PC)." },
    { tag: "Hardware", q: "3 bagian perangkat komputer?", a: "Hardware, software, brainware." },
    { tag: "Hardware", q: "Fungsi CPU dan motherboard?", a: "CPU: otak komputer (proses, kalkulasi, perintah). Motherboard: papan slot yang menghubungkan seluruh komponen." },
    { tag: "Hardware", q: "Sifat RAM?", a: "Tempat transit data sementara untuk CPU; volatile (tidak permanen)." },
    { tag: "Software", q: "2 kategori perangkat lunak?", a: "Perangkat lunak sistem (pengendali & koordinasi) dan perangkat lunak aplikasi (tugas tertentu)." },
    { tag: "➕ Koreksi", q: "Kapan Mesin Turing diperkenalkan?", a: "Makalah Alan Turing tahun 1936; Alonzo Church bekerja terpisah dengan lambda calculus (tesis Church–Turing)." },
    { tag: "➕ ROM", q: "RAM vs ROM?", a: "RAM: volatile, data sementara. ROM: non-volatile, berisi instruksi awal (BIOS/firmware)." }
  ],
  quiz: Q.map(([q, opts, ans, exp, optExp]) => ({ q, opts, ans, exp, optExp })),
  ringkasan: `*RANGKUMAN KILAT UTS — DASAR-DASAR SI P6*
📚 *Teknologi Informasi*

1️⃣ TI (Long): teknologi komputer + pengolahan informasi. (Beynon): artefak untuk kumpul, simpan, sebar, manipulasi data.
2️⃣ Modern IT: hardware, software, communication technology, data.
3️⃣ Mesin Turing: model ideal hitung matematis. ➕ Turing 1936; Church terpisah (lambda calculus).
4️⃣ Generasi: 1 tabung (ENIAC) • 2 transistor (1000× cepat) • 3 IC/silicon chip • 4 mikroprosesor. ➕ 5: AI.
5️⃣ Ukuran: mainframe, minicomputer, microcomputer (PC).
6️⃣ Komputer: hardware, software, brainware. Input: keyboard, mouse, scanner (mirip fotokopi), mic. CPU = otak. Motherboard = slot penghubung. RAM = Random Access Memory, volatile.
7️⃣ Software: sistem (pengendali) & aplikasi (tugas tertentu).`
};
