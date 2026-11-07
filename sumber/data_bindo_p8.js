// Bahasa Indonesia — Pertemuan 8: UTS (materi P1–P7; P4 disusun mandiri karena LMS tidak punya modulnya).
// Bank soal = gabungan kuis tiap pertemuan, diberi label. Latihan, bukan soal ujian asli.
const bank = [1, 2, 3, 4, 5, 6, 7].flatMap(n => JSON.parse(JSON.stringify(require(`./data_bindo_p${n}.js`).quiz)).map(q => Object.assign(q, { q: `[P${n}] ${q.q}` })));
module.exports = {
  id: "p8", nomor: 8, judul: "UTS: Ulasan Materi P1–P7", ujian: "UTS",
  hero: {
    badge: "Materi 8 • Bahasa Indonesia",
    title: "Satu Halaman untuk Semua Materi UTS",
    text: "Ulasan <strong>sejarah & ragam bahasa</strong>, <strong>ejaan</strong>, <strong>pembentukan kata, kata baku & diksi</strong>, <strong>kalimat efektif</strong>, dan <strong>teks argumentasi</strong>. Tab Kuis berisi <strong>" + bank.length + " soal latihan</strong> gabungan (bukan soal ujian asli)."
  },
  cheatsheet: [
    { type: "callout", tone: "warn", heading: "Strategi UTS", html: "Kerjakan Kuis sampai skor penuh, lalu baca pembahasan tiap soal. Soal Bahasa Indonesia sering berbentuk “manakah yang <strong>benar/baku/efektif</strong>”: periksa satu per satu pilihan dengan daftar jebakan di bawah, jangan langsung memilih yang terdengar enak." },
    { type: "table", label: "Interaktif 1 • Peta Materi", title: "Apa yang Wajib Dikuasai", headers: ["P", "Topik", "Inti"],
      rows: [["1", "Sejarah, kedudukan, fungsi, ragam", "Prasasti Melayu kuno, 1928 & 1945, bahasa nasional vs negara, ragam bahasa"], ["2", "Ejaan (EYD V)", "Huruf kapital, miring/tebal, tanda baca, singkatan, angka"], ["3", "Pembentukan kata & diksi", "Serapan (adopsi, adaptasi, penerjemahan, kreasi), afiks, peluluhan KTSP, syarat diksi"], ["4", "Pendalaman kata & diksi (disusun mandiri)", "Kata ulang, gabungan kata pisah/serangkai, pemendekan, ragam baku, homofon & pasangan kata"], ["5", "Kalimat efektif", "Pola S-P-O-Pel-K, objek vs pelengkap, jenis kalimat, 7 syarat"], ["6", "Kalimat efektif lanjutan", "Transitif/intransitif, tunggal/majemuk, KMB perluasan S/O/K, koma anak kalimat"], ["7", "Tugas 1 argumentasi", "Tesis, argumen, penegasan ulang"]] },
    { type: "table", label: "Interaktif 2 • Jebakan Baku", title: "Bentuk yang Sering Diujikan", headers: ["Tidak baku", "Baku", "P"],
      rows: [["analisa, praktek, resiko", "analisis, praktik, risiko", "3"], ["merubah, mengkonsumsi, mensurvei", "mengubah, mengonsumsi, menyurvei", "3"], ["meminimalisir", "meminimalkan", "3"], ["silahkan, antri, apotik", "silakan, antre, apotek", "3"], ["agar supaya, para tamu-tamu", "agar / supaya, para tamu", "3, 5"], ["membahas tentang", "membahas", "5"], ["Dalam rapat itu membahas…", "Rapat itu membahas…", "5"], ["acuh (maksud: tak peduli)", "tak acuh", "5"], ["Walaupun sakit Arman datang.", "Walaupun sakit, Arman datang.", "2, 6"]] },
    { type: "table", label: "Interaktif 3 • Membedakan Istilah Kembar", title: "Pasangan yang Sering Tertukar", headers: ["Pasangan", "Pembeda"],
      rows: [["Bahasa nasional vs bahasa negara", "Nasional: Sumpah Pemuda 1928 (identitas, pemersatu). Negara: UUD 1945 Pasal 36 (resmi, pendidikan)."], ["Adaptasi vs penerjemahan", "Adaptasi: kata asingnya tetap, ejaan disesuaikan. Penerjemahan: dicari padanan Indonesia."], ["Objek vs pelengkap", "Objek bisa jadi subjek pasif & diganti -nya."], ["Transitif vs intransitif", "Butuh objek atau tidak."], ["KMS vs KMB", "Sederajat vs induk + anak kalimat."], ["Dr. vs dr.", "Doktor vs dokter."], ["memperingati vs memperingatkan", "Merayakan vs menegur/mengingatkan."]] }
  ],
  simulator: [
    { type: "exercise", label: "Permainan Interaktif 1 • Materi Pertemuan Berapa?", title: "Cocokkan", headers: ["Konsep", "Pertemuan"],
      rows: [["Prasasti Talang Tuo (684)", "P1"], ["Koma sebelum “tetapi”", "P2"], ["mengonsumsi (K luluh)", "P3"], ["Ia belajar matematika (pelengkap)", "P5"], ["Hakim memutuskan bahwa… (perluasan objek)", "P6"], ["Tesis–argumen–penegasan ulang", "P7"], ["Dialek, sosiolek, kronolek", "P1"], ["Adopsi, adaptasi, kreasi", "P3"], ["menandatangani (serangkai)", "P4"], ["sanksi vs sangsi", "P4"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["P1", "P2", "P3", "P4", "P5", "P6", "P7"], answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 2 • Benar atau Salah Tulis", title: "Periksa Ejaan & Bentuk Kata", headers: ["Tulisan", "Penilaian"],
      rows: [["Kami akan menganalisis data penjualan.", "Benar"], ["Ia merubah jadwal kuliah.", "Salah"], ["Bupati Magelang meresmikan pasar.", "Benar"], ["Mereka mendaki Gunung yang tinggi.", "Salah"], ["Silakan duduk.", "Benar"], ["Para hadirin sekalian dimohon berdiri.", "Salah"], ["Karena hujan, acara ditunda.", "Benar"], ["Paman membahas tentang harga cabai.", "Salah"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["Benar", "Salah"], answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Latihan Lisan", title: "Jelaskan dengan Kata-katamu, Lalu Buka", items: [
      { prompt: "Mengapa bahasa Melayu dipilih menjadi dasar bahasa Indonesia?", answer: "Sudah menjadi lingua franca, tidak bertingkat, mudah diterima semua suku", reason: "P1." },
      { prompt: "Kapan anak kalimat diberi koma?", answer: "Saat anak kalimat mendahului induk kalimat", reason: "P2 & P6." },
      { prompt: "Mengapa “mengkritik” tidak luluh, sedangkan “mengonsumsi” luluh?", answer: "kritik diawali dua konsonan (kr); konsumsi diawali k + vokal", reason: "P3." },
      { prompt: "Sebutkan 7 syarat kalimat efektif.", answer: "Kesepadanan, kecermatan, kehematan, kelogisan, kepaduan, keparalelan, ketegasan", reason: "P5." },
      { prompt: "Analisis: “Agar permasalahan itu dapat diselesaikan, seluruh karyawan harus mengikuti diskusi.”", answer: "Transitif, KMB perluasan keterangan, anak kalimat di depan", reason: "P6 (analisis dosen)." }
    ] }
  ],
  flashcards: [
    { tag: "P1", q: "Bahasa nasional vs bahasa negara?", a: "Nasional: Sumpah Pemuda 1928. Negara: UUD 1945 Bab XV Pasal 36." },
    { tag: "P1", q: "Tiga prasasti Melayu kuno?", a: "Talang Tuo (684), Kota Kapur (686), Karang Berahi (±680)." },
    { tag: "P2", q: "Ejaan yang berlaku sekarang?", a: "EYD Edisi V (2022)." },
    { tag: "P2", q: "Kapan kata jabatan ditulis kapital?", a: "Saat diikuti nama orang/instansi/tempat: Bupati Magelang. Tidak kapital: dilantik menjadi bupati." },
    { tag: "P3", q: "4 cara penyerapan?", a: "Adopsi, adaptasi, penerjemahan, kreasi." },
    { tag: "P3", q: "Aturan peluluhan?", a: "K, T, S, P + vokal luluh (mengonsumsi); diikuti konsonan tidak luluh (mengkritik)." },
    { tag: "P4", q: "Kapan gabungan kata ditulis serangkai?", a: "Saat mendapat awalan dan akhiran sekaligus (pertanggungjawaban) atau sudah padu (olahraga)." },
    { tag: "P4", q: "bukan … ? • baik … ? • antara … ?", a: "bukan … melainkan • baik … maupun • antara … dan." },
    { tag: "P5", q: "7 syarat kalimat efektif?", a: "Kesepadanan, kecermatan, kehematan, kelogisan, kepaduan, keparalelan, ketegasan." },
    { tag: "P5", q: "Objek vs pelengkap?", a: "Objek bisa jadi subjek pasif & diganti -nya; pelengkap tidak." },
    { tag: "P6", q: "KMB perluasan S/O/K?", a: "S: yang… • O: bahwa… • K: karena/walaupun/agar…" },
    { tag: "P7", q: "Struktur teks argumentasi?", a: "Tesis → argumen → penegasan ulang." }
  ],
  quiz: bank,
  ringkasan: `*RANGKUMAN UTS BAHASA INDONESIA*
📚 P1 Sejarah & ragam • P2 Ejaan • P3–P4 Kata & diksi • P5–P6 Kalimat efektif • P7 Argumentasi

P1 Melayu = lingua franca; 1928 bahasa nasional, UUD 1945 Ps. 36 bahasa negara; ragam: dialek, sosiolek, kronolek, beku–akrab.
P2 EYD V: Bupati Magelang vs menjadi bupati; koma sebelum tetapi & setelah anak kalimat di depan; Dr. vs dr.
P3 Serapan adopsi/adaptasi/penerjemahan/kreasi; KTSP luluh (mengonsumsi, menyurvei); diksi tepat, lazim, hemat, baku.
P4 Kata ulang (surat-surat kabar); gabungan kata: bertanggung jawab tapi pertanggungjawaban; olahraga serangkai; sanksi ≠ sangsi; pukul vs jam; bukan … melainkan.
P5 S-P-O-Pel-K; objek vs pelengkap; 7 syarat efektif; jebakan: merubah, agar supaya, membahas tentang.
P6 Transitif/intransitif; KMS vs KMB; perluasan S (yang), O (bahwa), K (karena…).
P7 Tesis → argumen (alasan + bukti) → penegasan ulang.`
};

// Lengkapi pembahasan singkat pada soal yang disalin dari pertemuan sebelumnya.
const pembahasan = {
  "Kalimat pasif dengan predikat konfiks ke-an": "Kehujanan memakai konfiks ke-an dan menyatakan keadaan yang dialami subjek Adik.",
  "Adiknya rajin, tetapi ia sendiri malas": "Tetapi menghubungkan dua klausa sederajat yang maknanya berlawanan.",
  "Inti kalimat yang terdiri atas S + P": "Klausa memiliki predikat. Subjek bisa disebutkan atau tersirat, dan objek hadir jika dibutuhkan predikat.",
  "Kalimat aktif yang predikatnya membutuhkan objek": "Verba transitif memerlukan objek. Objeknya dapat menjadi subjek ketika kalimat dipasifkan.",
  "Kalimat aktif intransitif ditunjukkan": "Predikat sedang berlibur sudah lengkap tanpa objek.",
  "Kalimat yang hanya terdiri atas satu klausa": "Kalimat tunggal terdiri atas satu klausa, meskipun klausa itu boleh memiliki keterangan.",
  "Anton tidak datang karena sakit hati": "Anton tidak datang dapat berdiri sendiri. Bagian karena sakit hati menjelaskan sebabnya.",
  "Bagian yang memuat alasan dan bukti": "Bagian argumen mendukung tesis dengan alasan, data, atau contoh yang relevan.",
  "Berikut yang paling kuat sebagai bukti": "Nama lembaga, tahun, dan sumber membuat data bisa ditelusuri dan diperiksa.",
  "Perbedaan argumentasi dan persuasi": "Argumentasi membangun penerimaan terhadap pendapat lewat penalaran. Persuasi menekankan ajakan kepada pembaca.",
  "Kata “berpendapat, meyakini, menilai”": "Kata-kata itu menggambarkan proses berpikir, sikap, atau penilaian.",
  "Generalisasi dari satu contoh": "Satu contoh tidak cukup untuk menyimpulkan keadaan seluruh kelompok."
};
for (const soal of module.exports.quiz) {
  if (soal.exp) continue;
  const topik = Object.keys(pembahasan).find(potongan => soal.q.includes(potongan));
  if (topik) soal.exp = pembahasan[topik];
}
