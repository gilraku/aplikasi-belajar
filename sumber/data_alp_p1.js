// Algoritma dan Pemrograman — Pertemuan 1: Algoritma, Pseudocode, Flowchart, Pengenalan C++
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
module.exports = {
  id: "p1", nomor: 1, judul: "Algoritma, Pseudocode, Flowchart & Pengenalan C++", ujian: "CPMK 1",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Sebelum Mengetik Kode, Rancang Dulu Langkahnya",
    text: "Pahami apa itu <strong>algoritma</strong>, tiga cara menuliskannya (<strong>bahasa sehari-hari, pseudocode, flowchart</strong>), lalu kenali <strong>C++</strong>: bahasa yang harus <strong>dikompilasi</strong> sebelum bisa dijalankan."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya dalam satu kalimat", html: "Algoritma adalah <strong>resep</strong>: urutan langkah yang jelas dan pasti selesai. Program adalah resep itu yang ditulis dalam <strong>bahasa yang dimengerti komputer</strong> (di mata kuliah ini: C++)." },
    { type: "table", label: "Interaktif 1 • Istilah Kunci", title: "Lima Istilah yang Muncul Sepanjang Semester", headers: ["Istilah", "Arti singkat", "Analogi"],
      rows: [["Algoritma", "Urutan langkah logis untuk menyelesaikan masalah", "Resep masakan"], ["Pseudocode", "Algoritma ditulis mirip kode, tanpa aturan bahasa tertentu", "Catatan resep versi ringkas"], ["Flowchart", "Algoritma digambar dengan simbol baku dan panah", "Peta alur memasak"], ["Program", "Algoritma yang ditulis dalam bahasa pemrograman", "Resep yang sudah diterjemahkan untuk koki asing"], ["Compiler", "Penerjemah seluruh kode sumber menjadi file yang bisa dijalankan", "Penerjemah satu buku penuh sebelum dicetak"]],
      modes: [{ label: "Paling dasar", target: "row", row: 0, title: "Algoritma ≠ program", text: "Algoritma bisa ditulis di kertas tanpa komputer. Program adalah algoritma yang ditulis dalam bahasa pemrograman." },
        { label: "Yang membuat C++ jalan", target: "row", row: 4, title: "C++ bahasa terkompilasi", text: "Kode .cpp tidak langsung dijalankan. Compiler (mis. g++) mengubahnya menjadi file .exe dulu." }] },
    { type: "cards", label: "Interaktif 2 • Ciri Algoritma yang Baik", title: "Lima Syarat (Donald Knuth) ➕", cols: 3, items: [
      { badge: "Finite", tone: "sky", title: "Pasti berhenti", text: "Jumlah langkahnya terbatas. Langkah “ulangi terus” tanpa syarat berhenti bukan algoritma yang benar." },
      { badge: "Definite", tone: "emerald", title: "Jelas, tidak ambigu", text: "“Tambahkan garam secukupnya” ambigu bagi komputer. “Tambahkan 5 gram garam” jelas." },
      { badge: "Input", tone: "amber", title: "Nol atau lebih masukan", text: "Data yang diberikan sebelum/selama algoritma berjalan." },
      { badge: "Output", tone: "violet", title: "Minimal satu keluaran", text: "Algoritma harus menghasilkan sesuatu." },
      { badge: "Effective", tone: "rose", title: "Bisa dikerjakan", text: "Setiap langkah cukup sederhana untuk dilakukan dengan pensil dan kertas." }
    ] },
    { type: "table", label: "Interaktif 3 • Simbol Flowchart", title: "Simbol yang Wajib Hafal", headers: ["Simbol", "Bentuk", "Dipakai untuk"],
      rows: [["Terminator", "Oval / kapsul", "Mulai dan Selesai"], ["Proses", "Persegi panjang", "Perhitungan, pemberian nilai (luas = p × l)"], ["Input/Output", "Jajar genjang", "Baca masukan atau tampilkan hasil"], ["Keputusan", "Belah ketupat", "Pertanyaan ya/tidak (nilai ≥ 60?)"], ["Garis alir", "Panah", "Arah urutan langkah"], ["Konektor", "Lingkaran kecil", "Penghubung pada halaman yang sama"], ["Persiapan ➕", "Segi enam", "Inisialisasi, sering untuk perulangan (i = 1 sampai 10)"], ["Proses terdefinisi ➕", "Persegi bergaris tepi ganda", "Memanggil sub-proses/fungsi yang dijelaskan terpisah"]],
      modes: [{ label: "Paling sering tertukar", target: "row", row: 2, title: "Jajar genjang, bukan persegi", text: "Masukan dan keluaran memakai jajar genjang. Persegi panjang hanya untuk proses." },
        { label: "Satu-satunya yang bercabang", target: "row", row: 3, title: "Keputusan punya dua jalan keluar", text: "Belah ketupat selalu punya minimal dua panah keluar berlabel Ya/Tidak." }] },
    { type: "table", label: "Interaktif 4 • Penerjemah Kode", title: "Compiler vs Interpreter vs Assembler", headers: ["Penerjemah", "Cara kerja", "Contoh bahasa"],
      rows: [["Compiler", "Menerjemahkan seluruh kode sekaligus menjadi file mesin (.exe), baru dijalankan", "C, C++, Go, Rust"], ["Interpreter", "Menerjemahkan dan menjalankan baris demi baris", "Python, PHP, JavaScript (awalnya)"], ["Assembler", "Menerjemahkan bahasa rakitan (assembly) menjadi kode mesin", "Assembly x86, ARM"]],
      modes: [{ label: "C++ termasuk", target: "row", row: 0, title: "C++ = compiled", text: "Karena dikompilasi, program C++ cepat dijalankan. Kekurangannya: setiap perubahan kode harus dikompilasi ulang." }] }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • Simbol Flowchart", "Langkah Ini Memakai Simbol Apa?", ["Langkah", "Simbol"], ["Terminator", "Proses", "Input/Output", "Keputusan"], [
      ["Mulai", "Terminator"], ["Baca panjang dan lebar", "Input/Output"], ["luas ← panjang × lebar", "Proses"], ["Apakah luas > 100?", "Keputusan"], ["Tampilkan luas", "Input/Output"], ["Selesai", "Terminator"], ["total ← total + harga", "Proses"], ["nilai ≥ 60?", "Keputusan"]]),
    ex("Permainan Interaktif 2 • Algoritma atau Bukan?", "Apakah Langkah Ini Memenuhi Syarat Algoritma?", ["Kumpulan langkah", "Penilaian"], ["Algoritma", "Bukan algoritma"], [
      ["1. Ambil gelas 2. Isi 200 ml air 3. Minum 4. Selesai", "Algoritma"], ["1. Cetak “Halo” 2. Kembali ke langkah 1 (tanpa syarat berhenti)", "Bukan algoritma"], ["1. Masak nasi sampai matang secukupnya", "Bukan algoritma"], ["1. Baca a, b 2. c ← a + b 3. Tampilkan c 4. Selesai", "Algoritma"], ["1. Bagi angka dengan 0 lalu tampilkan hasilnya", "Bukan algoritma"]]),
    { type: "terminal", label: "Permainan Interaktif 3 • Dari Kode ke Program", title: "Apa yang Terjadi Saat Program Dikompilasi?", desc: "Klik setiap skenario. Inilah yang akan kamu lihat di Dev-C++ atau terminal.", shell: "$", header: "Kompilasi halo.cpp dengan g++",
      scenarios: [
        { label: "1. Kompilasi berhasil", pill: "OK", ok: true, cmd: "g++ halo.cpp -o halo", res: "(tidak ada pesan = berhasil, file halo.exe terbentuk)", exp: "Compiler diam artinya tidak ada kesalahan. Sekarang ada file program yang bisa dijalankan." },
        { label: "2. Jalankan program", pill: "OK", ok: true, cmd: "./halo", res: "Halo, Algoritma!", exp: "Program hasil kompilasi dijalankan. Di Dev-C++ cukup tekan F11 (Compile & Run)." },
        { label: "3. Lupa titik koma", pill: "Syntax error", ok: false, cmd: "g++ halo.cpp -o halo", res: "halo.cpp:5:31: error: expected ';' before 'return'", exp: "<strong>Syntax error</strong> ditemukan saat kompilasi. Baca angkanya: file halo.cpp, <strong>baris 5</strong>, kolom 31. Tambahkan <code>;</code> di akhir baris cout." },
        { label: "4. Salah huruf besar", pill: "Syntax error", ok: false, cmd: "g++ halo.cpp -o halo", res: "halo.cpp:4:1: error: 'Int' does not name a type; did you mean 'int'?", exp: "C++ <strong>case sensitive</strong>. <code>Int</code> ≠ <code>int</code>." },
        { label: "5. Program jalan, hasil salah", pill: "Logic error", ok: false, cmd: "./rata", res: "Rata-rata 7 dan 8 = 7", exp: "<strong>Logic error</strong>: compiler tidak protes, tetapi hasilnya salah. Penyebab: <code>(7 + 8) / 2</code> adalah pembagian bilangan bulat. Dibahas di P3." }
      ] },
    { type: "reveal", label: "Latihan Lisan", title: "Jawab Dulu, Lalu Buka", items: [
      { prompt: "Dari nama siapa kata “algoritma” berasal?", answer: "Al-Khwarizmi, matematikawan Persia abad ke-9", reason: "Namanya dilatinkan menjadi Algoritmi. Bukunya juga melahirkan kata “aljabar”." },
      { prompt: "Tiga struktur dasar yang cukup untuk menyusun algoritma apa pun?", answer: "Runtunan, percabangan, perulangan", reason: "➕ Teorema Böhm–Jacopini (1966). Percabangan dan perulangan dipelajari di P3." },
      { prompt: "Apa beda editor teks dengan IDE?", answer: "IDE = editor + compiler + debugger dalam satu aplikasi", reason: "Notepad hanya untuk mengetik. Dev-C++ / Code::Blocks bisa mengetik, mengompilasi, dan menjalankan." }
    ] }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu algoritma?", a: "Urutan langkah logis dan sistematis untuk menyelesaikan masalah, yang pasti berhenti." },
    { tag: "Sejarah", q: "Asal kata algoritma?", a: "Al-Khwarizmi (±780–850), matematikawan Persia di Baghdad." },
    { tag: "Konsep", q: "3 cara menuliskan algoritma?", a: "Bahasa sehari-hari (deskriptif), pseudocode, flowchart." },
    { tag: "Flowchart", q: "Simbol input/output?", a: "Jajar genjang." },
    { tag: "Flowchart", q: "Simbol keputusan?", a: "Belah ketupat, dengan dua jalan keluar Ya/Tidak." },
    { tag: "Konsep", q: "5 ciri algoritma (Knuth)?", a: "Finite, definite, input, output, effective." },
    { tag: "C++", q: "Siapa pencipta C++?", a: "Bjarne Stroustrup, Bell Labs, 1979 (“C with Classes”), berganti nama C++ tahun 1983." },
    { tag: "C++", q: "Compiler vs interpreter?", a: "Compiler menerjemahkan semua kode sekaligus menjadi .exe; interpreter menjalankan baris demi baris." },
    { tag: "Galat", q: "3 jenis kesalahan program?", a: "Syntax error (saat kompilasi), runtime error (saat jalan, mis. bagi 0), logic error (jalan tapi hasil salah)." },
    { tag: "Alat", q: "Contoh IDE C++?", a: "Dev-C++, Code::Blocks, Visual Studio. Online: OnlineGDB, Programiz." }
  ],
  quiz: [
    Q("Kata “algoritma” berasal dari nama…", ["Al-Khwarizmi", "Al-Biruni", "Ibnu Sina", "Euclid"], 0, "Muhammad ibn Musa al-Khwarizmi, namanya dilatinkan menjadi Algoritmi."),
    Q("Pengertian algoritma yang paling tepat adalah…", ["Urutan langkah logis untuk menyelesaikan masalah", "Bahasa pemrograman tingkat tinggi", "Perangkat keras pengolah data", "Kumpulan simbol gambar"], 0, "Algoritma = langkah-langkah; bahasa dan simbol hanyalah cara menuliskannya."),
    Q("Algoritma yang ditulis menyerupai kode program tetapi tidak terikat aturan bahasa tertentu disebut…", ["Pseudocode", "Flowchart", "Source code", "Bytecode"], 0, "Pseudo = semu. Pseudocode mirip kode, tetapi bebas aturan sintaks."),
    Q("Simbol flowchart untuk membaca masukan atau menampilkan keluaran adalah…", ["Jajar genjang", "Persegi panjang", "Belah ketupat", "Oval"], 0, "Persegi panjang = proses, belah ketupat = keputusan, oval = mulai/selesai."),
    Q("Simbol belah ketupat dalam flowchart dipakai untuk…", ["Keputusan / percabangan", "Proses perhitungan", "Mulai dan selesai", "Penghubung halaman"], 0, "Belah ketupat berisi pertanyaan ya/tidak dan memiliki dua jalan keluar."),
    Q("Simbol oval (terminator) menandai…", ["Awal dan akhir algoritma", "Proses perhitungan", "Masukan data", "Perulangan"], 0, "Setiap flowchart punya satu Mulai dan minimal satu Selesai."),
    Q("“luas ← panjang × lebar” digambar dengan simbol…", ["Persegi panjang (proses)", "Jajar genjang", "Belah ketupat", "Lingkaran"], 0, "Pemberian nilai dan perhitungan adalah proses."),
    Q("Langkah “Cetak Halo, lalu kembali ke langkah 1” tanpa syarat berhenti melanggar ciri algoritma…", ["Finite (pasti berhenti)", "Input", "Output", "Effective"], 0, "Algoritma harus berhenti setelah jumlah langkah terbatas."),
    Q("Langkah “tambahkan gula secukupnya” melanggar ciri…", ["Definite (jelas, tidak ambigu)", "Finite", "Output", "Input"], 0, "“Secukupnya” tidak bisa dikerjakan komputer karena tidak pasti."),
    Q("Tiga struktur dasar algoritma adalah…", ["Runtunan, percabangan, perulangan", "Input, proses, output", "Variabel, konstanta, operator", "Editor, compiler, linker"], 0, "Semua algoritma dapat disusun dari ketiganya (Böhm–Jacopini)."),
    Q("C++ dikembangkan oleh…", ["Bjarne Stroustrup", "Dennis Ritchie", "James Gosling", "Guido van Rossum"], 0, "Ritchie menciptakan C, Gosling Java, Van Rossum Python."),
    Q("C++ disebut bahasa tingkat tinggi karena…", ["Ditulis dengan kata-kata yang mudah dibaca manusia", "Hanya berisi angka 0 dan 1", "Hanya berjalan di superkomputer", "Tidak perlu diterjemahkan"], 0, "Bahasa tingkat tinggi dekat dengan bahasa manusia, tetap harus diterjemahkan ke kode mesin."),
    Q("C++ termasuk bahasa yang…", ["Dikompilasi (compiled)", "Diinterpretasi baris per baris", "Tidak perlu diterjemahkan", "Hanya untuk web"], 0, "Kode .cpp dikompilasi menjadi file eksekusi sebelum dijalankan."),
    Q("Perbedaan utama compiler dan interpreter adalah…", ["Compiler menerjemahkan seluruh kode sekaligus, interpreter baris demi baris", "Compiler hanya untuk Python", "Interpreter menghasilkan file .exe", "Tidak ada perbedaan"], 0, "Compiler menghasilkan file jadi; interpreter langsung menjalankan sambil menerjemahkan."),
    Q("Assembler berfungsi menerjemahkan…", ["Bahasa assembly menjadi kode mesin", "C++ menjadi Python", "Kode mesin menjadi C++", "Flowchart menjadi kode"], 0, "Assembly adalah bahasa tingkat rendah yang dekat dengan kode mesin."),
    Q("Ekstensi file kode sumber C++ adalah…", [".cpp", ".exe", ".py", ".obj"], 0, ".exe adalah hasil kompilasi, .obj file objek antara."),
    Q("Aplikasi yang menggabungkan editor, compiler, dan debugger disebut…", ["IDE", "Text editor", "Browser", "Sistem operasi"], 0, "Contoh IDE C++: Dev-C++, Code::Blocks."),
    Q("Program berhasil dikompilasi dan berjalan, tetapi hasil hitungnya salah. Ini termasuk…", ["Logic error", "Syntax error", "Compile error", "Linker error"], 0, "Compiler hanya memeriksa tata tulis, bukan kebenaran logika."),
    Q("Lupa menulis titik koma di akhir pernyataan C++ menyebabkan…", ["Syntax error saat kompilasi", "Logic error", "Program berjalan normal", "Runtime error"], 0, "Compiler menolak dan menunjukkan nomor baris kesalahan."),
    Q("Urutan yang benar dari kode sampai program jalan adalah…", ["Tulis kode → kompilasi → jalankan", "Jalankan → tulis kode → kompilasi", "Kompilasi → tulis kode → jalankan", "Tulis kode → jalankan → kompilasi"], 0, "File .cpp harus dikompilasi dulu menjadi program.")
  ],
  ringkasan: `*RANGKUMAN P1 ALGORITMA & PEMROGRAMAN*
🧠 Algoritma = urutan langkah logis yang pasti selesai (asal kata: Al-Khwarizmi).
✍️ Ditulis dengan: bahasa sehari-hari, pseudocode, flowchart.
🔷 Flowchart: oval = mulai/selesai, persegi = proses, jajar genjang = input/output, belah ketupat = keputusan.
✅ Ciri: finite, definite, input, output, effective.
🧱 3 struktur: runtunan, percabangan, perulangan.
💻 C++ (Bjarne Stroustrup) = bahasa tingkat tinggi, dikompilasi: .cpp → compiler → .exe.
🐞 Galat: syntax (kompilasi), runtime (saat jalan), logic (hasil salah).`
};
