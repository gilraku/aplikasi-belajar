// Bahasa Indonesia — Pertemuan 7: Tugas 1 Teks Argumentasi (tanpa materi dari dosen).
// Tugas dinilai & melarang AI menulis teks → halaman ini hanya panduan + cek mandiri, TANPA contoh jawaban.
module.exports = {
  id: "p7", nomor: 7, judul: "Tugas 1: Menulis Teks Argumentasi", ujian: "Tugas 1",
  hero: {
    badge: "Materi 7 • Bahasa Indonesia",
    title: "Tugas 1: Teks Opini/Argumentasi",
    text: "Pertemuan ini hanya berisi tugas. Halaman ini membantu kamu <strong>merencanakan dan memeriksa</strong> tulisanmu sendiri: struktur, jenis bukti, ciri kebahasaan, dan daftar cek sebelum dikirim. <strong>Tidak ada contoh jawaban</strong>, karena tugas melarang teks buatan AI."
  },
  cheatsheet: [
    { type: "callout", tone: "warn", heading: "Instruksi dosen (ringkas)", html: "<ol><li>Tulis teks opini/argumentasi tentang bidang yang kamu kuasai atau bidang jurusan (Sistem Informasi).</li><li>Tulis tangan di kertas bergaris atau diketik, <strong>minimal 1 halaman</strong>. Dilarang menyalin teks lain dan <strong>dilarang memakai AI</strong> untuk membuat teks.</li><li>Kirim ke LMS sebagai <strong>PDF</strong> (bukan Word) di Pertemuan 7, folder <strong>TUGAS 1</strong>.</li><li>Lengkapi dengan <strong>pernyataan orisinalitas</strong>: tulisan asli hasil pemikiran sendiri dan tidak dibuat dengan AI.</li></ol>" },
    { type: "callout", tone: "tip", heading: "➕ Apa itu teks argumentasi?", html: "Teks yang berisi <strong>pendapat penulis</strong> tentang suatu persoalan dan berusaha <strong>meyakinkan pembaca</strong> bahwa pendapat itu benar dengan <strong>alasan dan bukti</strong> (fakta, data, contoh, pendapat ahli). Bedanya dengan persuasi: argumentasi meyakinkan lewat penalaran; persuasi mengajak pembaca berbuat sesuatu." },
    { type: "flow", label: "Interaktif 1 • Struktur", title: "Tiga Bagian Teks Argumentasi", items: ["Tesis / pernyataan pendapat", "Argumen 1: alasan + bukti", "Argumen 2: alasan + bukti", "Argumen 3 (opsional) / bantahan", "Penegasan ulang + saran"], highlight: 0, note: "➕ Tesis cukup 1–2 kalimat yang tegas dan bisa diperdebatkan. Setiap argumen idealnya satu paragraf. Penegasan ulang tidak sekadar mengulang tesis, tetapi menyimpulkan dari argumen." },
    { type: "table", label: "Interaktif 2 • Jenis Bukti", title: "Penguat Argumen", headers: ["Jenis bukti", "Bentuknya", "Hati-hati"],
      rows: [["Fakta", "Peristiwa/keadaan yang bisa dicek", "Sebutkan kapan/di mana"], ["Data/statistik", "Angka dari lembaga atau penelitian", "Tulis sumbernya; jangan mengarang angka"], ["Contoh/kasus", "Pengalaman nyata, studi kasus", "Pengalaman pribadi sah, tapi jangan satu-satunya bukti"], ["Pendapat ahli", "Kutipan pakar/buku", "Kutipan langsung pakai tanda petik + sumber"], ["Analogi", "Perbandingan dengan hal yang mirip", "Pastikan kedua hal benar-benar sebanding"]],
      modes: [{ label: "Bukan bukti", target: "none", title: "Kesalahan nalar yang sering muncul", text: "“Semua orang tahu bahwa…” (tanpa bukti) • menyerang orang, bukan pendapatnya • generalisasi dari satu contoh • sebab-akibat yang dipaksakan." }] },
    { type: "table", label: "Interaktif 3 • Ciri Kebahasaan", title: "Kata yang Biasa Muncul", headers: ["Ciri", "Contoh kata"],
      rows: [["Kata kerja mental (pendapat)", "berpendapat, meyakini, menilai, memandang"], ["Konjungsi sebab-akibat", "karena, sebab, oleh karena itu, akibatnya, sehingga"], ["Konjungsi penegas/urutan", "pertama, selain itu, bahkan, di samping itu"], ["Konjungsi pertentangan", "namun, akan tetapi, meskipun demikian"], ["Konjungsi simpulan", "dengan demikian, jadi, oleh sebab itu"], ["Istilah teknis bidang", "sesuai bidangmu; jelaskan istilah yang tidak umum"]],
      defaultNote: "Ingat P5: “namun, oleh karena itu, dengan demikian” sebagai konjungsi antarkalimat ditulis di awal kalimat dan diikuti koma." },
    { type: "list", label: "Interaktif 4 • Cek Kebahasaan dari P3–P6", title: "Periksa Tulisanmu", items: ["Tidak ada kata mubazir: agar supaya, para …-…, sejak dari, membahas tentang", "Kata baku: mengubah (bukan merubah), analisis (bukan analisa), meminimalkan", "Setiap kalimat punya subjek (hindari “Dalam … membahas …”)", "Kalimat majemuk bertingkat: anak kalimat di depan → koma", "Bentuk sejajar dalam rincian (pe-an, pe-an, pe-an)", "Ejaan: huruf kapital, di- sebagai awalan vs di sebagai kata depan, istilah asing dimiringkan"] }
  ],
  simulator: [
    { type: "exercise", label: "Permainan Interaktif 1 • Bagian Teks", title: "Ini Bagian Apa?", desc: "Kalimat di bawah adalah contoh potongan umum (bukan untuk ditiru), hanya untuk mengenali fungsi bagian teks.", headers: ["Potongan", "Bagian"],
      rows: [["“Menurut saya, … seharusnya …”", "Tesis"], ["“Hal ini dapat dilihat dari data …”", "Argumen"], ["“Dengan demikian, dapat disimpulkan bahwa …”", "Penegasan ulang"], ["“Memang ada yang berpendapat …, tetapi …”", "Argumen"], ["“Oleh karena itu, sebaiknya …”", "Penegasan ulang"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["Tesis", "Argumen", "Penegasan ulang"], answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 2 • Bukti atau Bukan?", title: "Mana yang Menguatkan Argumen?", headers: ["Pernyataan", "Penilaian"],
      rows: [["Menyebut angka beserta lembaga dan tahun sumbernya", "Bukti kuat"], ["“Semua orang juga tahu kalau…”", "Bukan bukti"], ["Pengalaman sendiri saat magang/bekerja, diceritakan spesifik", "Bukti pendukung"], ["“Yang tidak setuju pasti tidak paham teknologi.”", "Bukan bukti"], ["Kutipan pakar dengan nama dan sumber", "Bukti kuat"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["Bukti kuat", "Bukti pendukung", "Bukan bukti"], answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Perencana Tulisan (isi sendiri di kertas)", title: "Jawab Pertanyaan Ini Sebelum Menulis", items: [
      { prompt: "1. Topik apa dari bidangmu yang punya dua sisi dan kamu punya pendapat jelas?", answer: "Tips memilih", reason: "Pilih yang kamu alami atau pelajari langsung, cukup sempit untuk 1–2 halaman, dan bisa diperdebatkan (ada yang mungkin tidak setuju)." },
      { prompt: "2. Tulis tesismu dalam satu kalimat.", answer: "Cek tesis", reason: "Tegas (bukan pertanyaan), memuat sikap (setuju/tidak, perlu/tidak), dan bisa dibuktikan." },
      { prompt: "3. Tuliskan 2–3 alasan, masing-masing dengan satu bukti.", answer: "Cek argumen", reason: "Setiap alasan menjawab “mengapa tesisku benar?”. Bukti harus bisa dicek; catat sumbernya." },
      { prompt: "4. Apa pendapat yang berlawanan, dan bagaimana kamu menanggapinya?", answer: "Bantahan (opsional, menambah nilai)", reason: "Mengakui pandangan lain lalu menunjukkan kelemahannya membuat tulisan lebih meyakinkan." },
      { prompt: "5. Apa simpulan dan saranmu?", answer: "Cek penegasan ulang", reason: "Rangkum argumen, tegaskan kembali tesis dengan kalimat berbeda, tutup dengan saran/harapan." }
    ] },
    { type: "list", label: "Daftar Cek Sebelum Kirim", title: "Misi Tugas 1", items: ["☐ Ditulis sendiri, tanpa AI dan tanpa menyalin (kutipan diberi sumber)", "☐ Minimal 1 halaman", "☐ Ada judul, tesis, minimal 2 argumen berbukti, dan penegasan ulang", "☐ Ada pernyataan orisinalitas (tulisan asli & tidak dibuat dengan AI) + nama, NIM, tanggal, tanda tangan", "☐ Dibaca ulang memakai cek kebahasaan P3–P6", "☐ Disimpan sebagai PDF (bukan .docx); jika tulisan tangan, dipindai/difoto jelas lalu digabung ke PDF", "☐ Diunggah ke LMS Pertemuan 7, folder TUGAS 1, sebelum batas waktu"] },
    { type: "callout", tone: "tip", heading: "➕ Cara membuat PDF", html: "<strong>Diketik:</strong> Word/Google Docs → File → Unduh/Simpan sebagai PDF. <strong>Tulisan tangan:</strong> pindai dengan aplikasi pemindai di HP (misalnya fitur pindai dokumen di Google Drive atau aplikasi kamera), pastikan terang dan tidak miring, simpan sebagai satu berkas PDF. Beri nama berkas yang jelas, misalnya <code>Tugas1_BahasaIndonesia_Nama_NIM.pdf</code>." }
  ],
  flashcards: [
    { tag: "P7", q: "Apa tujuan teks argumentasi?", a: "Meyakinkan pembaca bahwa pendapat penulis benar dengan alasan dan bukti." },
    { tag: "P7", q: "Struktur teks argumentasi?", a: "Tesis (pernyataan pendapat) → argumen (alasan + bukti) → penegasan ulang (simpulan/saran)." },
    { tag: "P7", q: "Argumentasi vs persuasi?", a: "Argumentasi meyakinkan lewat penalaran & bukti; persuasi mengajak pembaca melakukan sesuatu." },
    { tag: "P7", q: "Jenis bukti?", a: "Fakta, data/statistik, contoh/kasus, pendapat ahli, analogi." },
    { tag: "P7", q: "Ciri kebahasaan argumentasi?", a: "Kata kerja mental (berpendapat), konjungsi kausal (karena, oleh karena itu), konjungsi simpulan (dengan demikian), istilah teknis." },
    { tag: "P7", q: "Syarat format Tugas 1?", a: "Minimal 1 halaman, PDF, pernyataan orisinalitas, tanpa AI dan tanpa menyalin." }
  ],
  quiz: [
    { q: "Tujuan utama teks argumentasi adalah…", opts: ["Menghibur pembaca", "Meyakinkan pembaca dengan alasan dan bukti", "Menceritakan pengalaman secara runtut", "Menggambarkan objek secara rinci"], ans: 1, exp: "Narasi bercerita, deskripsi menggambarkan." },
    { q: "Bagian teks argumentasi yang berisi pendapat utama penulis disebut…", opts: ["Tesis", "Argumen", "Penegasan ulang", "Orientasi"], ans: 0, exp: "Orientasi adalah bagian teks cerita." },
    { q: "Bagian yang memuat alasan dan bukti disebut…", opts: ["Tesis", "Argumen", "Koda", "Abstrak"], ans: 1, exp: "" },
    { q: "Berikut yang paling kuat sebagai bukti adalah…", opts: ["“Semua orang tahu bahwa…”", "Data dari lembaga resmi beserta tahun dan sumbernya", "“Menurut saya pribadi saja…”", "Ejekan terhadap pihak yang tidak setuju"], ans: 1, exp: "" },
    { q: "Konjungsi yang biasa dipakai pada bagian penegasan ulang adalah…", opts: ["dengan demikian", "kemudian", "sementara itu", "lalu"], ans: 0, exp: "Konjungsi simpulan." },
    { q: "Perbedaan argumentasi dan persuasi yang tepat adalah…", opts: ["Argumentasi selalu tanpa data", "Persuasi mengajak pembaca berbuat sesuatu, argumentasi meyakinkan lewat penalaran", "Keduanya sama persis", "Persuasi tidak boleh memakai pendapat"], ans: 1, exp: "" },
    { q: "Kata “berpendapat, meyakini, menilai” dalam teks argumentasi termasuk…", opts: ["Kata kerja mental", "Kata kerja material", "Kata sifat", "Kata seru"], ans: 0, exp: "" },
    { q: "Generalisasi dari satu contoh saja (“teman saya gagal, berarti semua gagal”) termasuk…", opts: ["Bukti kuat", "Kesalahan nalar", "Tesis", "Data statistik"], ans: 1, exp: "" }
  ],
  ringkasan: `*BAHASA INDONESIA — PERTEMUAN 7: TUGAS 1*
📝 *Teks Opini/Argumentasi*

1️⃣ Topik: bidang yang dikuasai / jurusan.
2️⃣ Struktur: tesis → argumen (alasan + bukti) → penegasan ulang.
3️⃣ Minimal 1 halaman, tulis sendiri (tanpa AI, tanpa salin).
4️⃣ Tambahkan pernyataan orisinalitas.
5️⃣ Kirim PDF ke LMS Pertemuan 7, folder TUGAS 1.`
};
