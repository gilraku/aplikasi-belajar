// Dasar-dasar Sistem Informasi — Pertemuan 5: Computer Based Information System (sumber: modul BAB 5)
const EL = ["Data", "People", "Hardware", "Software", "Telecommunication"];
const FN = ["Human Resource IS", "Finance IS", "Manufacturing IS", "Marketing IS"];
const LV = ["Strategic planning", "Management control", "Operational control"];
const Q = [
  ["Berikut ini termasuk lima elemen CBIS, KECUALI …", ["Data", "Hardware", "Software", "Telecommunication", "Teleconference"], 4, "5 elemen: data, people, hardware, software, telecommunication. <em>(Latihan 2 modul no. 1)</em>", ["Elemen.", "Elemen.", "Elemen.", "Elemen.", "Benar, bukan elemen."]],
  ["Contoh sistem pada level CBIS <strong>strategic planning</strong> adalah …", ["Decision Support System", "Information System", "Management Support System", "Virtual Office", "Transaction System"], 0, "Strategic planning: EIS/DSS. <em>(Latihan 2 no. 2)</em>", ["Benar.", "Terlalu umum.", "Nama kelompok (P4), bukan level.", "Bagian model CBIS.", "Operational control (TPS)."]],
  ["Berikut ini termasuk fungsi CBIS, KECUALI …", ["Human Resource Information System", "Finance Information System", "Manufacturing Information System", "Marketing Information System", "Restore Information System"], 4, "<em>(Latihan 2 no. 3)</em>", ["Fungsi.", "Fungsi.", "Fungsi.", "Fungsi.", "Benar, tidak ada."]],
  ["Aplikasi yang memberi informasi mengenai arus uang bagi para pemakai di seluruh perusahaan adalah fungsi CBIS sebagai …", ["Human Resource IS", "Finance IS", "Manufacturing IS", "Marketing IS", "Restore IS"], 1, "<em>(Latihan 2 no. 4)</em>", ["SDM.", "Benar.", "Produksi.", "Pemasaran.", "Tidak ada."]],
  ["Sistem yang menganalisis dan menilai informasi pemasaran yang dikumpulkan terus-menerus dari dalam dan luar organisasi adalah …", ["Human Resource IS", "Finance IS", "Manufacturing IS", "Marketing IS", "Restore IS"], 3, "<em>(Latihan 2 no. 5)</em>", ["Bukan.", "Bukan.", "Bukan.", "Benar.", "Tidak ada."]],
  ["CBIS menurut Leonard Jessup adalah kombinasi antara …", ["Hardware, software, dan jaringan telekomunikasi untuk collect, create, distribute data", "Data, informasi, dan pengetahuan", "Input, proses, dan output", "Manusia dan prosedur saja", "TPS, MIS, dan DSS"], 0, "", ["Benar.", "P2.", "P1/P3.", "Kurang.", "Tipe SI."]],
  ["Programmer, system analyst, operator, data entry, dan manajer termasuk elemen CBIS …", ["People", "Hardware", "Software", "Data", "Telecommunication"], 0, "Mereka bertanggung jawab atas perawatan sistem.", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Elemen CBIS yang menghubungkan pengguna dengan sistem komputer ke dalam jaringan kerja yang efektif dan efisien adalah …", ["Telecommunication", "Software", "People", "Database", "Hardware"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan."]],
  ["Level CBIS yang ditangani oleh Management Information System (MIS) adalah …", ["Management control", "Strategic planning", "Operational control", "Virtual office", "Problem solution"], 0, "", ["Benar.", "EIS/DSS.", "TPS.", "Bukan level.", "Bukan level."]],
  ["Level CBIS paling bawah yang ditangani TPS adalah …", ["Operational control", "Management control", "Strategic planning", "Executive control", "Decision control"], 0, "", ["Benar.", "MIS.", "EIS/DSS.", "Tidak ada.", "Tidak ada."]],
  ["Aplikasi yang membantu tata kelola manajemen SDM, misalnya rekrutmen dan absensi, adalah fungsi CBIS sebagai …", ["Human Resource IS", "Finance IS", "Manufacturing IS", "Marketing IS", "Executive IS"], 0, "", ["Benar.", "Bukan.", "Bukan.", "Bukan.", "Bukan fungsi CBIS di modul."]],
  ["Dalam Model CBIS, yang BUKAN termasuk subsistem di dalam kotak CBIS adalah …", ["Transaction Processing System", "Management Information System", "Decision Support System", "Virtual Office", "Problem Solution"], 4, "Problem solution adalah <strong>hasil akhir</strong> model, bukan subsistem.", ["Subsistem.", "Subsistem.", "Subsistem.", "Subsistem.", "Benar."]]
];

module.exports = {
  id: "p5",
  nomor: 5,
  judul: "Computer Based Information System (CBIS)",
  ujian: "UTS",
  hero: {
    badge: "Materi 5 • Dasar-dasar SI",
    title: "SI yang Bertumpu pada Komputer",
    text: "Pahami <strong>pengertian CBIS</strong>, <strong>5 elemen</strong>, <strong>4 fungsi</strong>, <strong>3 level</strong>, dan <strong>model CBIS</strong> (McLeod). Level CBIS mengulang pola tipe SI di P4."
  },
  cheatsheet: [
    {
      type: "callout",
      label: "Interaktif 1 • Pengertian CBIS",
      tone: "info",
      heading: "Dua rumusan di modul",
      html: "<ol><li><strong>Leonard Jessup:</strong> kombinasi <strong>hardware, software, dan jaringan telekomunikasi</strong> yang dibangun untuk <strong>mengumpulkan (collect), membuat (create), dan mendistribusikan (distribute)</strong> data yang berguna dalam organisasi.</li><li>Sistem yang <strong>mengolah data menjadi informasi berkualitas</strong> untuk alat bantu <strong>keputusan, koordinasi, kendali</strong>, visualisasi, sampai analisis.</li></ol><strong>Alur berpikir (Gambar 5.1):</strong> konsep manajemen & organisasi → konsep sistem + konsep informasi → <strong>konsep SI</strong> + <strong>konsep TI</strong> → <strong>CBIS</strong>."
    },
    {
      type: "table",
      label: "Interaktif 2 • 5 Elemen CBIS",
      title: "Data • People • Hardware • Software • Telecommunication",
      headers: ["Elemen", "Penjelasan modul"],
      rows: [
        ["Data / Database", "Kumpulan file/data & informasi yang disimpan di <strong>media penyimpanan</strong> (harddisk, magnetic tape) agar mudah diakses"],
        ["People (manusia)", "<strong>Programmer, system analyst, operator, data entry, manajer</strong>; bertanggung jawab atas <strong>perawatan sistem</strong>"],
        ["Telecommunication", "Menghubungkan <strong>pengguna dengan sistem komputer</strong> ke jaringan kerja yang efektif & efisien"],
        ["Hardware", "Komponen untuk kegiatan <strong>masukan, pemrosesan, keluaran</strong> data"],
        ["Software", "Program/instruksi; modul membaginya menjadi <strong>sistem perangkat lunak umum, sistem manajemen data, sistem pengoperasian</strong>"]
      ],
      modes: [
        { label: "Jebakan", target: "none", title: "Teleconference ≠ Telecommunication", text: "Opsi pengecoh favorit: <strong>teleconference</strong>, <strong>procedure</strong>, <strong>internet</strong>. Lima elemen modul: data, people, hardware, software, telecommunication." },
        { label: "➕ Versi lain", target: "none", title: "Kadang ada elemen ke-6: Procedures", text: "Beberapa buku (mis. Stair & Reynolds) menyebut 6 komponen CBIS: hardware, software, database, telecommunications/network, <strong>people</strong>, dan <strong>procedures</strong> (aturan/SOP). Untuk ujian, ikuti modul: 5 elemen." },
        { label: "➕ Software umum", target: "row", row: 4, title: "Pembagian yang lebih lazim", text: "Pembagian software yang paling umum adalah <strong>system software</strong> (OS, utility, driver) dan <strong>application software</strong>. Ini dibahas di P6." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 3 • 4 Fungsi CBIS",
      title: "CBIS per Area Fungsional",
      cols: 2,
      items: [
        { badge: "HRIS", tone: "indigo", title: "Human Resource Information System", text: "Mengorganisir <strong>tata kelola & tata laksana SDM</strong>, mendukung keputusan lewat informasi kepegawaian." },
        { badge: "FIS", tone: "emerald", title: "Finance Information System", text: "Informasi <strong>keuangan</strong> bagi orang di dalam & luar perusahaan; <strong>arus uang</strong> bagi pemakai di seluruh perusahaan." },
        { badge: "MfgIS", tone: "amber", title: "Manufacturing Information System", text: "Terhubung dengan SI lain untuk <strong>memecahkan masalah produksi</strong> manufaktur." },
        { badge: "MkIS", tone: "rose", title: "Marketing Information System", text: "Menganalisis & menilai informasi <strong>pemasaran</strong> dari sumber <strong>dalam dan luar</strong> organisasi secara terus-menerus; alat bantu operasional, manajerial, strategis." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Level CBIS",
      title: "Tiga Tingkatan dan Sistemnya",
      headers: ["Level", "Sistem"],
      rows: [
        ["Strategic planning (puncak)", "Executive Information System (EIS) / Decision Support System (DSS)"],
        ["Management control (tengah)", "Management Information System (MIS)"],
        ["Operational control (bawah)", "Transaction Processing System (TPS)"]
      ],
      modes: [
        { label: "Hubungan P4", target: "none", title: "Pola yang sama", text: "Tipe SI di P4 tinggal ditaruh di piramida: TPS di bawah, MIS di tengah, DSS/EIS di puncak." },
        { label: "➕ Ciri informasi tiap level", target: "none", title: "Semakin ke atas, semakin ringkas", text: "<strong>Operasional</strong>: rinci, harian, internal. <strong>Manajemen</strong>: ringkasan periodik. <strong>Strategis</strong>: sangat ringkas, jangka panjang, banyak data eksternal." }
      ]
    },
    {
      type: "flow",
      label: "Interaktif 5 • Model CBIS (McLeod)",
      title: "Dari Masalah Menjadi Solusi",
      items: ["Problems", "CBIS: TPS (data) • MIS, DSS, Virtual Office, Knowledge-based System", "Information", "Decision", "Problem Solution"],
      highlight: 1,
      note: "Masalah masuk ke CBIS. <strong>TPS</strong> menyediakan data; <strong>MIS, DSS, Virtual Office, Knowledge-based System</strong> mengolahnya menjadi informasi; informasi dipakai untuk <strong>keputusan</strong> sampai didapat <strong>solusi masalah</strong>. ➕ <em>Virtual office</em> = otomasi kantor (email, konferensi, dokumen bersama); <em>knowledge-based system</em> = sistem berbasis pengetahuan, termasuk sistem pakar."
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Elemen CBIS di Minimarket",
      title: "Ini Elemen yang Mana?",
      headers: ["Benda / orang", "Elemen"],
      rows: [
        { cells: ["Kasir dan admin gudang"], fields: [{ options: EL, answer: "People" }], ok: "✓" },
        { cells: ["Scanner barcode dan printer struk"], fields: [{ options: EL, answer: "Hardware" }], ok: "✓" },
        { cells: ["Aplikasi POS (point of sale)"], fields: [{ options: EL, answer: "Software" }], ok: "✓" },
        { cells: ["Tabel barang, harga, dan transaksi di server"], fields: [{ options: EL, answer: "Data" }], ok: "✓" },
        { cells: ["Jaringan yang menghubungkan kasir cabang dengan server pusat"], fields: [{ options: EL, answer: "Telecommunication" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Fungsi CBIS",
      title: "Aplikasi Ini Fungsi yang Mana?",
      headers: ["Aplikasi", "Fungsi"],
      rows: [
        { cells: ["Aplikasi absensi, cuti, dan penilaian kinerja karyawan"], fields: [{ options: FN, answer: "Human Resource IS" }], ok: "✓" },
        { cells: ["Laporan arus kas dan anggaran"], fields: [{ options: FN, answer: "Finance IS" }], ok: "✓" },
        { cells: ["Penjadwalan mesin dan kebutuhan bahan baku pabrik"], fields: [{ options: FN, answer: "Manufacturing IS" }], ok: "✓" },
        { cells: ["Analisis tren pembeli dan data pesaing untuk kampanye iklan"], fields: [{ options: FN, answer: "Marketing IS" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Level CBIS",
      title: "Keputusan Ini di Level Mana?",
      headers: ["Keputusan / kegiatan", "Level"],
      rows: [
        { cells: ["Direksi memutuskan membuka pabrik di luar negeri 5 tahun lagi"], fields: [{ options: LV, answer: "Strategic planning" }], ok: "✓ EIS/DSS." },
        { cells: ["Manajer cabang meninjau laporan penjualan bulanan"], fields: [{ options: LV, answer: "Management control" }], ok: "✓ MIS." },
        { cells: ["Kasir mencatat transaksi penjualan hari ini"], fields: [{ options: LV, answer: "Operational control" }], ok: "✓ TPS." },
        { cells: ["Kepala gudang menyetujui pemesanan ulang barang yang hampir habis"], fields: [{ options: LV, answer: "Operational control" }], ok: "✓ Keputusan harian." }
      ]
    }
  ],
  flashcards: [
    { tag: "Definisi", q: "CBIS menurut Leonard Jessup?", a: "Kombinasi hardware, software, dan jaringan telekomunikasi untuk mengumpulkan (collect), membuat (create), dan mendistribusikan (distribute) data yang berguna dalam organisasi." },
    { tag: "Elemen", q: "5 elemen CBIS?", a: "Data, people, hardware, software, telecommunication." },
    { tag: "Elemen", q: "Siapa saja people dalam CBIS?", a: "Programmer, system analyst, operator, data entry, manajer." },
    { tag: "Elemen", q: "Telecommunication dalam CBIS?", a: "Menghubungkan pengguna dengan sistem komputer ke jaringan kerja yang efektif dan efisien." },
    { tag: "Fungsi", q: "4 fungsi CBIS?", a: "Human Resource IS, Finance IS, Manufacturing IS, Marketing IS." },
    { tag: "Fungsi", q: "Finance IS memberi informasi tentang?", a: "Masalah keuangan dan arus uang bagi pemakai di seluruh perusahaan (dan pihak luar)." },
    { tag: "Fungsi", q: "Marketing IS?", a: "Menganalisis & menilai informasi pemasaran dari sumber dalam dan luar organisasi secara terus-menerus." },
    { tag: "Level", q: "3 level CBIS dan sistemnya?", a: "Strategic planning: EIS/DSS • Management control: MIS • Operational control: TPS." },
    { tag: "Model", q: "Subsistem dalam model CBIS?", a: "TPS, MIS, DSS, Virtual Office, Knowledge-based System." },
    { tag: "Model", q: "Alur model CBIS?", a: "Problems → CBIS → information → decision → problem solution." },
    { tag: "➕ Procedures", q: "Elemen ke-6 CBIS di buku lain?", a: "Procedures (aturan/SOP penggunaan sistem)." },
    { tag: "➕ Virtual office", q: "Apa itu virtual office?", a: "Otomasi perkantoran: email, konferensi, dokumen bersama, sehingga kerja tidak terikat tempat." }
  ],
  quiz: Q.map(([q, opts, ans, exp, optExp]) => ({ q, opts, ans, exp, optExp })),
  ringkasan: `*RANGKUMAN KILAT UTS — DASAR-DASAR SI P5*
📚 *CBIS*

1️⃣ CBIS (Jessup): hardware + software + jaringan telekomunikasi untuk collect, create, distribute data.
2️⃣ 5 elemen: Data • People (programmer, analis, operator, data entry, manajer) • Hardware • Software • Telecommunication. (Teleconference ✗)
3️⃣ 4 fungsi: HRIS • Finance IS (arus uang) • Manufacturing IS (produksi) • Marketing IS (info pasar dalam & luar). (Restore IS ✗)
4️⃣ Level: Strategic planning (EIS/DSS) • Management control (MIS) • Operational control (TPS).
5️⃣ Model: Problems → CBIS (TPS, MIS, DSS, Virtual Office, Knowledge-based) → information → decision → solution.
➕ Buku lain menambah elemen Procedures.`
};
