// Materi Lengkap Bahasa Indonesia P7 (Tugas 1 argumentasi) dan P8 (UTS)
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });

const struktur = diagram({
  label: "Diagram Interaktif", title: "➕ Kerangka Teks Argumentasi", desc: "Kerangka umum (bukan contoh isi). Klik setiap bagian.", minw: 620,
  svg: svg(800, 330,
    box(250, 10, 300, 56, "Judul|singkat, menggambarkan sikap", "slate", "judul", { size: 12 }) + arrow(400, 66, 400, 84) +
    box(150, 88, 500, 56, "Tesis|1 paragraf: latar singkat + pendapat utama", "sky", "tesis", { size: 13 }) +
    path("M400,144 L400,160 L170,160 L170,176") + path("M400,160 L400,176") + path("M400,160 L630,160 L630,176") +
    [[90, "Argumen 1|alasan + bukti"], [320, "Argumen 2|alasan + bukti"], [550, "Argumen 3 / bantahan|(opsional)"]].map(([x, t], i) => box(x, 180, 160, 60, t, i === 2 ? "violet" : "amber", i === 2 ? "bantah" : "arg", { size: 12 })).join("") +
    path("M170,240 L170,256 L400,256 L400,268") + path("M630,240 L630,256 L400,256", { noArrow: true }) + path("M400,240 L400,268") +
    box(150, 272, 500, 50, "Penegasan ulang|simpulan + saran/harapan", "emerald", "tegas", { size: 13 })
  ),
  parts: [
    { id: "judul", label: "Judul", title: "Judul", text: "Pendek dan memberi gambaran posisi penulis. Ditulis kapital di awal setiap kata (kecuali kata tugas seperti di, ke, dan, yang)." },
    { id: "tesis", label: "Tesis", title: "Pernyataan pendapat", text: "Perkenalkan persoalan dalam 1–2 kalimat, lalu nyatakan sikapmu dengan tegas. Tesis yang baik bisa diperdebatkan dan bisa dibuktikan." },
    { id: "arg", label: "Argumen", title: "Satu alasan per paragraf", text: "Kalimat utama berisi alasan; kalimat penjelas berisi bukti (fakta, data bersumber, contoh, pendapat ahli) dan penjelasan bagaimana bukti itu mendukung tesis." },
    { id: "bantah", label: "Bantahan", title: "Menanggapi pandangan lain", text: "Akui pendapat yang berlawanan, lalu tunjukkan kelemahannya dengan bukti. Membuat tulisan lebih meyakinkan." },
    { id: "tegas", label: "Penegasan ulang", title: "Penutup", text: "Simpulkan dari argumen (dengan demikian, oleh karena itu), tegaskan kembali tesis dengan kalimat berbeda, dan beri saran yang realistis." }
  ]
});

const P7 = [
  A("Tentang Tugas Ini", `<p>Pertemuan 7 tidak memiliki materi; isinya Tugas 1 menulis teks opini/argumentasi minimal satu halaman tentang bidang yang kamu kuasai atau bidang jurusan. Tugas ini <strong>dinilai</strong> dan <strong>melarang teks buatan AI</strong>, jadi halaman ini sengaja tidak memuat contoh teks jadi. Yang ada di sini: pengertian, kerangka, dan alat periksa.</p>
<p>➕ <strong>Teks argumentasi</strong> adalah teks yang mengemukakan pendapat dan berusaha meyakinkan pembaca dengan alasan dan bukti. Sering juga disebut teks <em>opini</em> (dalam surat kabar disebut artikel opini) atau <em>teks eksposisi argumentatif</em> di buku pelajaran SMA.</p>`, "Bagian 1"),
  struktur,
  { type: "table", label: "Tabel Interaktif", title: "➕ Mengembangkan Satu Paragraf Argumen", headers: ["Unsur paragraf", "Fungsi", "Pertanyaan penuntun"],
    rows: [["Kalimat utama", "Menyatakan satu alasan", "Mengapa tesisku benar?"], ["Bukti", "Menguatkan alasan", "Apa fakta/data/contoh yang bisa dicek?"], ["Penjelasan", "Menghubungkan bukti dengan alasan", "Mengapa bukti ini penting?"], ["Kalimat penutup/transisi", "Mengantar ke paragraf berikut", "Apa hubungannya dengan alasan selanjutnya?"]],
    defaultNote: "Satu paragraf = satu gagasan utama. Ini juga yang membuat tulisan mudah dinilai." },
  A("Orisinalitas dan Kutipan", `<p>Tugas meminta tulisan <strong>asli</strong>: tidak menyalin teks lain dan tidak dibuat dengan AI. Memakai data atau pendapat orang lain tetap boleh, asalkan <strong>disebutkan sumbernya</strong>. Tanpa sumber, itu termasuk plagiarisme.</p>
<p>➕ Cara mengutip sederhana: kutipan langsung diapit tanda petik dan diikuti sumber, misalnya: Menurut … (tahun), “…”. Kutipan tidak langsung (parafrasa) ditulis dengan kalimatmu sendiri dan tetap menyebut sumber.</p>
<p>➕ <strong>Pernyataan orisinalitas</strong> yang diminta dosen sebaiknya memuat: nama lengkap, NIM, judul tulisan, pernyataan bahwa tulisan asli hasil pemikiran sendiri dan tidak dibuat dengan AI, tempat dan tanggal, serta tanda tangan. Tulis dengan kalimatmu sendiri.</p>`, "Bagian 2"),
  tip("➕ Sebelum mengirim", "Baca tulisanmu keras-keras. Kalimat yang membuatmu tersandung biasanya kalimat tidak efektif. Periksa juga ejaan dari P2 (kapital, koma) dan kata baku dari P3. Simpan sebagai <strong>PDF</strong>, lalu unggah ke folder <strong>TUGAS 1</strong> di Pertemuan 7.")
];

const STEP = [["p1", "P1|Sejarah & ragam", "sky"], ["p2", "P2|Ejaan", "amber"], ["p3", "P3|Kata & diksi", "emerald"], ["p5", "P5|Kalimat efektif", "violet"], ["p6", "P6|Majemuk & perluasan", "rose"], ["p7", "P7|Argumentasi", "slate"]];
const peta = diagram({
  label: "Diagram Interaktif", title: "Dari Huruf ke Teks: Urutan Materi UTS", desc: "Satuan bahasa makin besar dari kiri ke kanan. Klik setiap pertemuan.", minw: 660,
  svg: svg(820, 170,
    STEP.map(([p, t, tone], i) => box(10 + i * 135, 40, 118, 70, t, tone, p, { size: 12 }) + (i < 5 ? arrow(128 + i * 135, 75, 143 + i * 135, 75) : "")).join("") +
    text(410, 140, "bahasa → huruf & tanda baca → kata → kalimat → kalimat majemuk → teks", { size: 12, color: "#475569" })
  ),
  parts: [
    { id: "p1", label: "P1", title: "Bahasa sebagai identitas", text: "Asal-usul Melayu, Sumpah Pemuda, UUD 1945 Pasal 36, fungsi dan ragam bahasa." },
    { id: "p2", label: "P2", title: "Huruf & tanda baca", text: "EYD V: kapital, miring/tebal, tanda baca, singkatan, angka." },
    { id: "p3", label: "P3", title: "Kata", text: "Serapan, imbuhan, peluluhan, dan diksi." },
    { id: "p5", label: "P5", title: "Kalimat", text: "Fungsi S-P-O-Pel-K, jenis kalimat, 7 syarat kalimat efektif." },
    { id: "p6", label: "P6", title: "Kalimat majemuk", text: "Transitif/intransitif, KMS/KMB, perluasan subjek, objek, keterangan." },
    { id: "p7", label: "P7", title: "Teks", text: "Semua materi dipakai sekaligus saat menulis teks argumentasi." }
  ]
});

const P8 = [
  A("Cara Memakai Halaman Ini", `<p>UTS Bahasa Indonesia mencakup P1, P2, P3, P5, P6, dan P7 (P4 tidak ada materi). Urutan belajar yang disarankan: lihat peta di bawah, baca Cheat Sheet (jebakan baku dan pasangan istilah), kerjakan Simulator, lalu ulangi Kuis sampai skor penuh. Soal yang masih salah: buka lagi Materi Lengkap pertemuannya (label [P..] di setiap soal).</p>`, "Panduan"),
  peta,
  tip("Hari H", "Baca kata kunci soal: <strong>benar, baku, efektif, KECUALI, BUKAN</strong>. Untuk soal kalimat efektif, cek berurutan: ada subjek? kata mubazir? kata baku? logis? sejajar?", "warn")
];

module.exports = { p7: P7, p8: P8 };
