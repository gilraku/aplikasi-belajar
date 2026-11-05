// Diagram interaktif untuk Materi Lengkap Dasar-dasar SI
const { box, arrow, path, poly, svg, text, diagram } = require("./svg.js");

const modelSistem = diagram({
  label: "Diagram Interaktif • Gambar 1.1",
  title: "Model Sistem Secara Umum",
  svg: svg(760, 400,
    box(10, 10, 740, 380, "", "slate", "env", { fill: "#f8fafc", dash: "4 6", sw: 1.5 }) +
    text(110, 34, "LINGKUNGAN LUAR ➕", { size: 12, color: "#64748b" }) +
    box(140, 60, 480, 270, "", "indigo", "boundary", { fill: "#ffffff", dash: "10 6", sw: 2.5 }) +
    text(380, 80, "BOUNDARY (batas sistem)", { size: 12, color: "#4338ca" }) +
    box(290, 100, 180, 50, "CONTROLS", "amber", "control") +
    box(30, 190, 140, 60, "INPUTS", "sky", "input") +
    box(290, 185, 180, 70, "PROCESSING", "indigo", "processing") +
    box(590, 190, 140, 60, "OUTPUTS", "emerald", "output") +
    box(290, 280, 180, 40, "FEEDBACK", "rose", "feedback", { size: 13 }) +
    arrow(170, 220, 286, 220) + arrow(470, 220, 586, 220) + arrow(380, 150, 380, 181, { color: "#b45309" }) +
    path("M660 250 L660 300 L474 300", { color: "#e11d48" }) + path("M286 300 L100 300 L100 254", { color: "#e11d48" })
  ),
  parts: [
    { id: "input", label: "Input", title: "Inputs (masukan)", text: "Yang masuk untuk diolah. Pada SI: data transaksi, data non-transaksi, instruksi. Contoh: isian KRS." },
    { id: "processing", label: "Processing", title: "Processing (proses)", text: "Mengolah input menjadi output yang diharapkan. Contoh: menghitung IPK, mengecek bentrok jadwal." },
    { id: "output", label: "Output", title: "Outputs (keluaran)", text: "Hasil pemrosesan yang dipakai pengguna: informasi, saran, laporan tercetak. Contoh: KHS." },
    { id: "control", label: "Control", title: "Controls (kendali)", text: "Mengamati dan mengawasi jalannya mekanisme pengelolaan sistem (perencanaan informasi, koordinasi, transformasi). Contoh: batas maksimal 24 SKS." },
    { id: "feedback", label: "Feedback", title: "Feedback (umpan balik)", text: "Hasil/output dikembalikan sebagai bahan perbaikan. <strong>Negatif</strong> mengurangi penyimpangan; <strong>positif</strong> memperkuat gerak sistem. Contoh: IPK rendah → jatah SKS dikurangi." },
    { id: "boundary", label: "Boundary", title: "Boundary (batasan)", text: "Garis putus-putus biru: pemisah sistem dengan sistem lain/lingkungan; menentukan ruang lingkup dan kemampuan sistem." },
    { id: "env", label: "➕ Lingkungan", title: "➕ Lingkungan luar (environment)", text: "Di luar batas, tetapi memengaruhi sistem: regulasi pemerintah, internet, pesaing. Tidak termasuk 6 karakteristik modul; ada di versi Jogiyanto." }
  ]
});

const dikw = diagram({
  label: "Diagram Interaktif • Tangga DIKW",
  title: "Data → Informasi → Pengetahuan (→ Wisdom)",
  maxw: 620,
  svg: svg(620, 380,
    poly("310,20 380,90 240,90", "violet", "w", "Wisdom ➕", 310, 68, { size: 13 }) +
    poly("240,96 380,96 450,170 170,170", "emerald", "k", "Knowledge", 310, 136) +
    poly("170,176 450,176 520,250 100,250", "sky", "i", "Informasi", 310, 216) +
    poly("100,256 520,256 590,330 30,330", "amber", "d", "Data", 310, 296) +
    text(310, 358, "semakin ke atas: makin diolah, makin bernilai, makin sedikit volumenya", { size: 12, weight: 600, color: "#64748b" }) +
    path("M540 296 C 600 270, 600 240, 470 216", { color: "#0284c7" }) + text(585, 252, "5K", { size: 13, color: "#0369a1" })
  ),
  parts: [
    { id: "d", label: "Data", title: "Data", text: "Fakta/simbol mentah, belum bermakna. Contoh: 80, 65, 90." },
    { id: "i", label: "Informasi", title: "Informasi", text: "Data yang sudah diolah lewat <strong>5K</strong> (kondensasi, kontekstualisasi, kalkulasi, kategorisasi, koreksi) sehingga bermakna dalam konteks. Contoh: “rata-rata kelas 78, satu orang di bawah KKM”." },
    { id: "k", label: "Knowledge", title: "Knowledge (pengetahuan)", text: "Informasi yang diolah dengan pengalaman, persepsi, dan pendapat sehingga bermanfaat. Contoh: “materi P3 perlu diulang karena banyak yang salah di bagian itu”." },
    { id: "w", label: "➕ Wisdom", title: "➕ Wisdom (kebijaksanaan)", text: "Tidak ada di modul. Kemampuan memakai pengetahuan untuk keputusan yang tepat dan etis. Contoh: membuat kelas tutor sebaya sebelum CPMK." }
  ]
});

const kerangka = diagram({
  label: "Diagram Interaktif • Gambar 3.1",
  title: "Kerangka Kerja Konseptual SI (O’Brien)",
  svg: svg(760, 360,
    box(290, 140, 180, 80, "SISTEM|INFORMASI", "slate", null, { fill: "#0f172a", color: "#ffffff" }) +
    box(20, 20, 220, 70, "Foundation|Concepts", "indigo", "f") +
    box(520, 20, 220, 70, "Information|Technologies", "sky", "it") +
    box(20, 270, 220, 70, "Business|Applications", "emerald", "ba") +
    box(520, 270, 220, 70, "Development|Processes", "amber", "dp") +
    box(270, 270, 220, 70, "Management|Challenges", "rose", "mc") +
    arrow(240, 75, 290, 150) + arrow(520, 75, 470, 150) + arrow(240, 285, 290, 210) + arrow(520, 285, 470, 210) + arrow(380, 270, 380, 224)
  ),
  parts: [
    { id: "f", label: "Foundation", title: "1. Foundation Concepts", text: "Dasar perilaku (fundamental behavioural), permasalahan teknis, bisnis, dan konsep manajemen. (Bukan leadership!)" },
    { id: "it", label: "IT", title: "2. Information Technologies", text: "Hardware, software, manajemen data, teknologi berbasis internet, dan isu manajemen teknologi. → materi P6–P7." },
    { id: "ba", label: "Business Apps", title: "3. Business Applications", text: "Penggunaan SI untuk operasional, manajemen, industri, dan pengambilan keputusan. → materi P4–P5." },
    { id: "dp", label: "Development", title: "4. Development Processes", text: "Proses pengembangan dan pengimplementasian SI untuk memenuhi peluang bisnis." },
    { id: "mc", label: "Management", title: "5. Management Challenges", text: "Pengelolaan SI dan tantangannya: keamanan, etika, pengendalian, pengelolaan global." }
  ]
});

const segitiga = diagram({
  label: "Diagram Interaktif • Gambar 3.3",
  title: "Segitiga Peran Fundamental SI",
  maxw: 620,
  svg: svg(620, 330,
    poly("310,15 410,120 210,120", "violet", "ca", "Competitive|advantage", 310, 88, { size: 12 }) +
    poly("210,126 410,126 500,220 120,220", "sky", "dm", "Support business|decision making", 310, 175, { size: 14 }) +
    poly("120,226 500,226 590,320 30,320", "emerald", "po", "Support business processes|and operations", 310, 275, { size: 14 })
  ),
  parts: [
    { id: "ca", label: "Puncak", title: "Support strategies for competitive advantage", text: "SI sebagai senjata strategis agar unggul dari pesaing. Contoh modul: e-commerce." },
    { id: "dm", label: "Tengah", title: "Support business decision making", text: "SI membantu manajer mengambil keputusan. Contoh modul: menghitung kebutuhan pasokan harian." },
    { id: "po", label: "Dasar", title: "Support business processes and operations", text: "SI mendukung operasi harian. Contoh modul: retail mencatat pembelian, persediaan, gaji, tren penjualan. Fondasi bagi dua peran di atasnya." }
  ]
});

const ipo = diagram({
  label: "Diagram Interaktif • Gambar 3.2 (+ model lengkap O’Brien)",
  title: "Proses Kerja Sistem Informasi",
  svg: svg(760, 250,
    box(20, 70, 170, 70, "INPUT", "sky", "in") + box(295, 70, 170, 70, "PROCESSING", "indigo", "pr") + box(570, 70, 170, 70, "OUTPUT", "emerald", "out") +
    arrow(190, 105, 291, 105) + arrow(465, 105, 566, 105) +
    box(295, 180, 170, 50, "STORAGE ➕", "amber", "st", { size: 13 }) + arrow(380, 140, 380, 176) +
    box(295, 5, 170, 44, "CONTROL ➕", "rose", "ct", { size: 13 }) +
    path("M655 70 L655 27 L469 27", { color: "#e11d48", dash: "6 4" }) + path("M291 27 L105 27 L105 66", { color: "#e11d48", dash: "6 4" })
  ),
  parts: [
    { id: "in", label: "Input", title: "Input", text: "Mengumpulkan dan <em>capturing</em> data mentah. Contoh: scan barcode, isi formulir online." },
    { id: "pr", label: "Processing", title: "Processing", text: "Transformasi data: kalkulasi, perbandingan data, pencarian alternatif." },
    { id: "out", label: "Output", title: "Output", text: "Informasi yang sesuai tujuan SI: laporan, notifikasi, dashboard." },
    { id: "st", label: "➕ Storage", title: "➕ Storage", text: "Model lengkap O’Brien: data disimpan (database) agar bisa dipakai lagi." },
    { id: "ct", label: "➕ Control", title: "➕ Control of system performance", text: "Memantau kinerja sistem dan memberi umpan balik, sama seperti control & feedback di P1." }
  ]
});

const tipeSI = diagram({
  label: "Diagram Interaktif • Pembagian Tipe SI",
  title: "Pohon Tipe Sistem Informasi (Versi Modul)",
  minw: 560,
  svg: svg(760, 300,
    box(280, 10, 200, 50, "Sistem Informasi", "slate", null, { fill: "#0f172a", color: "#fff" }) +
    box(60, 100, 260, 56, "Operation Support|Systems", "sky", "oss", { size: 14 }) + box(440, 100, 260, 56, "Management Support|Systems", "violet", "mss", { size: 14 }) +
    path("M380 60 L380 80 L190 80 L190 96") + path("M380 80 L570 80 L570 96") +
    box(5, 200, 90, 50, "TPS", "sky", "tps") + box(100, 200, 90, 50, "PCS", "sky", "pcs") + box(195, 200, 90, 50, "ECS", "sky", "ecs") + box(290, 200, 100, 50, "Expert|System", "sky", "es", { size: 12, dash: "5 4" }) +
    box(440, 200, 80, 50, "MIS", "violet", "mis") + box(530, 200, 80, 50, "DSS", "violet", "dss") + box(620, 200, 80, 50, "EIS", "violet", "eis") +
    path("M190 156 L190 178 L50 178 L50 196") + path("M190 178 L145 178 L145 196", { noArrow: false }) + path("M190 178 L240 178 L240 196") + path("M190 178 L340 178 L340 196") +
    path("M570 156 L570 178 L480 178 L480 196") + path("M570 178 L570 196") + path("M570 178 L660 178 L660 196") +
    text(340, 275, "garis putus: posisi menurut modul", { size: 11, weight: 600, color: "#64748b" })
  ),
  parts: [
    { id: "oss", label: "OSS", title: "Operation Support Systems", text: "Mendukung operasi harian (modul: “sistem pendukung transaksi”)." },
    { id: "mss", label: "MSS", title: "Management Support Systems", text: "Membantu manajer membuat laporan dan mengambil keputusan." },
    { id: "tps", label: "TPS", title: "Transaction Processing System", text: "Memproses transaksi jumlah besar, update database operasional. Contoh: gaji, inventaris, kasir." },
    { id: "pcs", label: "PCS", title: "Process Control System", text: "Mengawasi & mengendalikan proses produksi. Contoh: sensor suhu pabrik." },
    { id: "ecs", label: "ECS", title: "Enterprise Collaboration System", text: "Kerja sama dan komunikasi tim. Contoh: email, video conference." },
    { id: "es", label: "Expert System", title: "Expert System (sistem pakar)", text: "Memuat kepakaran ahli, memberi saran. Contoh: pakar pengobatan domba. ➕ Di O’Brien masuk kategori lain, bukan OSS." },
    { id: "mis", label: "MIS", title: "Management Information System", text: "Laporan dengan format yang sudah ditentukan." },
    { id: "dss", label: "DSS", title: "Decision Support System", text: "Rekomendasi keputusan, prediksi, what-if." },
    { id: "eis", label: "EIS", title: "Executive Information System", text: "Untuk C-level: ringkas, grafik, area kerja utama." }
  ]
});

const elemenCBIS = diagram({
  label: "Diagram Interaktif • Gambar 5.2",
  title: "Lima Elemen CBIS",
  maxw: 620,
  svg: svg(620, 400,
    `<circle cx="310" cy="200" r="70" fill="#0f172a"/>` + text(310, 200, "CBIS", { size: 22, color: "#fff" }) +
    box(230, 10, 160, 60, "Data", "amber", "data") + box(20, 120, 160, 60, "People", "rose", "people") + box(440, 120, 160, 60, "Hardware", "sky", "hw") +
    box(70, 310, 180, 60, "Telecommunication", "emerald", "tel", { size: 14 }) + box(370, 310, 180, 60, "Software", "violet", "sw") +
    arrow(310, 70, 310, 126) + arrow(180, 160, 242, 180) + arrow(440, 160, 378, 180) + arrow(200, 310, 260, 250) + arrow(420, 310, 360, 250)
  ),
  parts: [
    { id: "data", label: "Data", title: "Data / Database", text: "Kumpulan file data & informasi di media penyimpanan (harddisk, magnetic tape) agar mudah diakses." },
    { id: "people", label: "People", title: "People", text: "Programmer, system analyst, operator, data entry, manajer; bertanggung jawab atas perawatan sistem. ➕ Juga end user." },
    { id: "hw", label: "Hardware", title: "Hardware", text: "Komponen untuk masukan, pemrosesan, dan keluaran data." },
    { id: "sw", label: "Software", title: "Software", text: "Program/instruksi; modul: sistem perangkat lunak umum, sistem manajemen data, sistem pengoperasian." },
    { id: "tel", label: "Telecommunication", title: "Telecommunication", text: "Menghubungkan pengguna dan sistem komputer dalam jaringan kerja yang efektif & efisien. (Bukan teleconference!)" }
  ]
});

const levelCBIS = diagram({
  label: "Diagram Interaktif • Level CBIS",
  title: "Piramida Level CBIS",
  maxw: 620,
  svg: svg(620, 320,
    poly("310,10 420,110 200,110", "violet", "sp", "Strategic|planning", 310, 78, { size: 13 }) +
    poly("200,116 420,116 510,210 110,210", "sky", "mc", "Management control", 310, 163) +
    poly("110,216 510,216 600,310 20,310", "emerald", "oc", "Operational control", 310, 263) +
    text(560, 70, "EIS / DSS", { size: 13, color: "#6d28d9" }) + text(560, 150, "MIS", { size: 13, color: "#0369a1" }) + text(70, 190, "TPS", { size: 13, color: "#047857" })
  ),
  parts: [
    { id: "sp", label: "Strategic", title: "Strategic planning → EIS / DSS", text: "Keputusan jangka panjang manajemen puncak. ➕ Informasi ringkas, banyak data eksternal." },
    { id: "mc", label: "Management", title: "Management control → MIS", text: "Manajer menengah memantau dan mengendalikan kinerja bagian lewat laporan periodik." },
    { id: "oc", label: "Operational", title: "Operational control → TPS", text: "Kegiatan harian: transaksi rinci, internal, sering." }
  ]
});

const modelCBIS = diagram({
  label: "Diagram Interaktif • Model CBIS",
  title: "Model CBIS: dari Masalah ke Solusi",
  minw: 560,
  svg: svg(780, 330,
    box(10, 135, 110, 60, "Problems", "rose", "prob") +
    box(160, 15, 300, 300, "", "slate", "cbis", { fill: "#ffffff", dash: "8 5" }) + text(310, 36, "CBIS", { size: 14, color: "#334155" }) +
    box(185, 55, 250, 40, "Transaction Processing System", "amber", "tps", { size: 12 }) +
    box(185, 115, 120, 40, "MIS", "sky", "mis", { size: 13 }) + box(315, 115, 120, 40, "DSS", "sky", "dss", { size: 13 }) +
    box(185, 175, 120, 50, "Virtual|Office", "emerald", "vo", { size: 12 }) + box(315, 175, 120, 50, "Knowledge-|based System", "violet", "kbs", { size: 11 }) +
    path("M310 95 L310 111") +
    box(500, 135, 110, 60, "Information", "indigo", "info", { size: 13 }) + box(640, 60, 130, 50, "Decision", "amber", "dec") + box(640, 220, 130, 60, "Problem|Solution", "emerald", "sol", { size: 13 }) +
    arrow(120, 165, 156, 165) + arrow(460, 165, 496, 165) + path("M610 150 L640 90") + path("M705 110 L705 216")
  ),
  parts: [
    { id: "prob", label: "Problems", title: "Problems", text: "Masalah yang dihadapi organisasi, misalnya stok sering habis." },
    { id: "cbis", label: "CBIS", title: "Kotak CBIS", text: "Berisi subsistem TPS, MIS, DSS, Virtual Office, dan Knowledge-based System." },
    { id: "tps", label: "TPS", title: "TPS (sumber data)", text: "Mencatat transaksi; datanya menjadi bahan bagi subsistem lain." },
    { id: "mis", label: "MIS", title: "MIS", text: "Laporan berformat tetap untuk manajer." },
    { id: "dss", label: "DSS", title: "DSS", text: "Membantu memilih alternatif keputusan." },
    { id: "vo", label: "Virtual Office", title: "Virtual Office", text: "Otomasi kantor: email, konferensi, dokumen bersama, kerja jarak jauh." },
    { id: "kbs", label: "Knowledge-based", title: "Knowledge-based System", text: "Sistem berbasis pengetahuan, termasuk sistem pakar dan ➕ AI." },
    { id: "info", label: "Information", title: "Information", text: "Hasil olahan subsistem CBIS." },
    { id: "dec", label: "Decision", title: "Decision", text: "Informasi dipakai manajer untuk memutuskan." },
    { id: "sol", label: "Solution", title: "Problem Solution", text: "Keputusan menghasilkan solusi masalah. Ini hasil akhir, bukan subsistem CBIS." }
  ]
});

const generasi = diagram({
  label: "Diagram Interaktif • Garis Waktu",
  title: "Generasi Komputer",
  minw: 560,
  svg: svg(780, 200,
    `<line x1="20" y1="100" x2="760" y2="100" stroke="#94a3b8" stroke-width="4"/>` +
    box(20, 40, 135, 120, "Gen 1|Tabung hampa|1940–1956*", "rose", "g1", { size: 13 }) +
    box(170, 40, 135, 120, "Gen 2|Transistor|1956–1964", "amber", "g2", { size: 13 }) +
    box(320, 40, 135, 120, "Gen 3|IC / silicon|chip • 1964–1971", "sky", "g3", { size: 12 }) +
    box(470, 40, 135, 120, "Gen 4|Mikroprosesor|1971–kini", "emerald", "g4", { size: 13 }) +
    box(620, 40, 140, 120, "Gen 5 ➕|AI, paralel", "violet", "g5", { size: 13, dash: "6 4" }) +
    text(390, 186, "*tahun versi buku umum; modul: gen 1 = 30-an–40-an, gen 2 = 50-an–pertengahan 60-an, gen 3 = akhir 60-an–70-an", { size: 10, weight: 500, color: "#64748b" })
  ),
  parts: [
    { id: "g1", label: "Gen 1", title: "Generasi 1: tabung hampa", text: "Sangat besar, lambat, sering gagal. ENIAC: ±18.000 tabung, gagal setiap ±7 menit." },
    { id: "g2", label: "Gen 2", title: "Generasi 2: transistor", text: "Lebih kecil, 1000× lebih cepat, lebih andal, lebih murah." },
    { id: "g3", label: "Gen 3", title: "Generasi 3: Integrated Circuit", text: "Ratusan transistor dalam satu silicon chip; ukuran & biaya turun drastis." },
    { id: "g4", label: "Gen 4", title: "Generasi 4: mikroprosesor", text: "Perubahan radikal ukuran, kemampuan, kecepatan, harga; lahir PC. Dibagi mainframe, minicomputer, microcomputer." },
    { id: "g5", label: "➕ Gen 5", title: "➕ Generasi 5", text: "Tidak ada di modul: kecerdasan buatan, pemrosesan paralel, bahasa alami." }
  ]
});

const softwareTree = diagram({
  label: "Diagram Interaktif • Gambar 6.5",
  title: "Pembagian Perangkat Lunak",
  maxw: 640,
  svg: svg(640, 260,
    box(220, 10, 200, 50, "Software", "slate", null, { fill: "#0f172a", color: "#fff" }) +
    box(40, 100, 240, 56, "System Software", "indigo", "sys") + box(360, 100, 240, 56, "Application Software", "emerald", "app", { size: 14 }) +
    path("M320 60 L320 80 L160 80 L160 96") + path("M320 80 L480 80 L480 96") +
    box(10, 190, 90, 50, "OS", "indigo", "os", { size: 13 }) + box(110, 190, 90, 50, "Driver", "indigo", "drv", { size: 13 }) + box(210, 190, 90, 50, "Utility", "indigo", "utl", { size: 13 }) +
    box(360, 190, 240, 50, "Word, browser, kasir, game", "emerald", "apps", { size: 12 }) +
    path("M160 156 L160 172 L55 172 L55 186") + path("M160 172 L155 172 L155 186") + path("M160 172 L255 172 L255 186") + path("M480 156 L480 186")
  ),
  parts: [
    { id: "sys", label: "Sistem", title: "Perangkat lunak sistem", text: "Pengendali dan koordinasi kegiatan sistem komputer." },
    { id: "app", label: "Aplikasi", title: "Perangkat lunak aplikasi", text: "Dibuat dengan bahasa pemrograman untuk tugas tertentu pengguna." },
    { id: "os", label: "➕ OS", title: "➕ Sistem operasi", text: "Windows, Linux, macOS, Android: mengatur hardware & menjalankan aplikasi." },
    { id: "drv", label: "➕ Driver", title: "➕ Driver", text: "Penghubung sistem operasi dengan hardware tertentu (printer, VGA)." },
    { id: "utl", label: "➕ Utility", title: "➕ Utility", text: "Program pemeliharaan: antivirus, disk cleanup, kompresi file." },
    { id: "apps", label: "Contoh aplikasi", title: "Contoh perangkat lunak aplikasi", text: "Microsoft Word, Chrome, aplikasi kasir, m-banking, game." }
  ]
});

const hierarki = diagram({
  label: "Diagram Interaktif • Hierarki Data",
  title: "Database ⊃ File ⊃ Record ⊃ Field",
  maxw: 680,
  svg: svg(680, 330,
    box(10, 10, 660, 310, "", "violet", "db", { fill: "#f5f3ff" }) + text(100, 32, "DATABASE", { size: 13, color: "#5b21b6" }) +
    box(30, 50, 400, 255, "", "sky", "file", { fill: "#f0f9ff" }) + text(120, 70, "FILE mahasiswa", { size: 12, color: "#0369a1" }) +
    box(450, 50, 200, 120, "FILE|mata kuliah", "sky", null, { size: 12 }) + box(450, 185, 200, 120, "FILE nilai", "sky", null, { size: 12 }) +
    box(45, 90, 370, 60, "", "emerald", "rec", { fill: "#ecfdf5" }) +
    box(55, 100, 110, 40, "2024310045", "amber", "fld", { size: 12 }) + box(175, 100, 110, 40, "Gilang", "amber", null, { size: 12 }) + box(295, 100, 110, 40, "SI", "amber", null, { size: 12 }) +
    box(45, 165, 370, 50, "record mahasiswa lain …", "emerald", null, { size: 12, fill: "#ecfdf5" }) + box(45, 230, 370, 50, "record mahasiswa lain …", "emerald", null, { size: 12, fill: "#ecfdf5" })
  ),
  parts: [
    { id: "fld", label: "Field", title: "Field", text: "Kumpulan karakter yang bermakna, mewakili satu attribute. Contoh: NIM “2024310045”." },
    { id: "rec", label: "Record", title: "Record", text: "Kumpulan field yang menggambarkan satu entity (satu mahasiswa)." },
    { id: "file", label: "File", title: "File", text: "Kumpulan record yang sejenis (group of records of same type): semua mahasiswa." },
    { id: "db", label: "Database", title: "Database", text: "Kumpulan file yang saling terkait (group of related files): mahasiswa + mata kuliah + nilai." }
  ]
});

const fileVsDb = diagram({
  label: "Diagram Interaktif • File Tradisional vs Database",
  title: "Kenapa File Terpisah Bermasalah?",
  minw: 560,
  svg: svg(780, 300,
    text(190, 20, "TRADISIONAL: file per departemen", { size: 13, color: "#be123c" }) +
    box(10, 40, 110, 50, "Akademik", "slate", null, { size: 12 }) + box(135, 40, 110, 50, "Keuangan", "slate", null, { size: 12 }) + box(260, 40, 110, 50, "Perpus", "slate", null, { size: 12 }) +
    box(10, 130, 110, 70, "File mhs|(alamat A)", "rose", "red", { size: 12 }) + box(135, 130, 110, 70, "File mhs|(alamat B)", "rose", "inc", { size: 12 }) + box(260, 130, 110, 70, "File mhs|(alamat A)", "rose", "red2", { size: 12 }) +
    arrow(65, 90, 65, 126) + arrow(190, 90, 190, 126) + arrow(315, 90, 315, 126) +
    text(190, 235, "data ganda • nilai berbeda • sulit dibagi", { size: 12, weight: 600, color: "#be123c" }) +
    `<line x1="395" y1="20" x2="395" y2="280" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>` +
    text(590, 20, "PENDEKATAN DATABASE ➕", { size: 13, color: "#047857" }) +
    box(420, 40, 110, 50, "Akademik", "slate", null, { size: 12 }) + box(540, 40, 110, 50, "Keuangan", "slate", null, { size: 12 }) + box(660, 40, 110, 50, "Perpus", "slate", null, { size: 12 }) +
    box(520, 120, 150, 50, "DBMS", "indigo", "dbms") + box(520, 200, 150, 60, "Database|terpusat", "emerald", "dbc", { size: 13 }) +
    arrow(475, 90, 560, 118) + arrow(595, 90, 595, 116) + arrow(715, 90, 630, 118) + arrow(595, 170, 595, 196)
  ),
  parts: [
    { id: "red", label: "Redundancy", title: "Data redundancy", text: "Data mahasiswa yang sama disimpan di tiga file departemen." },
    { id: "inc", label: "Inconsistency", title: "Data inconsistency", text: "Atribut alamat sama, tetapi nilainya berbeda (A vs B) karena hanya satu file yang diperbarui." },
    { id: "red2", label: "Sharing & security", title: "Lack of sharing, poor security, inflexible", text: "Tiap departemen memegang filenya sendiri: sulit dibagi, sulit diamankan, laporan gabungan butuh program baru, dan perubahan struktur memaksa program diubah (program-data dependence)." },
    { id: "dbms", label: "➕ DBMS", title: "➕ DBMS", text: "Perangkat lunak pengelola database (MySQL, PostgreSQL, Oracle) yang mengatur akses semua departemen." },
    { id: "dbc", label: "➕ Database terpusat", title: "➕ Database terpusat", text: "Data disimpan sekali, konsisten, aman, dan bisa dibagi." }
  ]
});

module.exports = { modelSistem, dikw, kerangka, segitiga, ipo, tipeSI, elemenCBIS, levelCBIS, modelCBIS, generasi, softwareTree, hierarki, fileVsDb };
