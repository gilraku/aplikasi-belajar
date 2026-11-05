// Bahasa Indonesia — Pertemuan 6: Penulisan Kalimat Efektif (lanjutan, catatan dosen):
// transitif/intransitif, kalimat tunggal/majemuk, KMB perluasan subjek/objek/keterangan.
const TI = ["Transitif", "Intransitif"];
const JK = ["Tunggal", "Majemuk setara", "Majemuk bertingkat"];
const PER = ["Perluasan subjek", "Perluasan objek", "Perluasan keterangan"];
module.exports = {
  id: "p6", nomor: 6, judul: "Kalimat Efektif Lanjutan: Transitif, Majemuk, dan Perluasan", ujian: "UTS",
  hero: {
    badge: "Materi 6 • Bahasa Indonesia",
    title: "Membedah Kalimat Panjang: Mana Induk, Mana Anak?",
    text: "Bedakan <strong>kalimat aktif transitif dan intransitif</strong>, <strong>kalimat tunggal dan majemuk</strong>, lalu kenali <strong>kalimat majemuk bertingkat perluasan subjek, objek, dan keterangan</strong>, termasuk aturan koma saat anak kalimat di depan."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Kalimat dan klausa", html: "Kalimat = gabungan kata yang bermakna. Intinya <strong>klausa</strong>: <strong>S + P</strong> atau <strong>S + P + O</strong>. Satu klausa → kalimat <strong>tunggal</strong>; lebih dari satu klausa → kalimat <strong>majemuk</strong>." },
    { type: "table", label: "Interaktif 1 • Berdasarkan Predikat", title: "Aktif Transitif vs Aktif Intransitif", headers: ["Jenis", "Ciri", "Contoh dari kelas"],
      rows: [["Transitif", "Predikat <strong>membutuhkan objek</strong>", "Mereka(S) menjual(P) sepeda(O) • Kami memainkan bola • Para karyawan sedang membahas kualitas produk"], ["Intransitif", "Predikat <strong>tidak membutuhkan objek</strong> (boleh diikuti pelengkap/keterangan)", "Kami sedang berlibur • Mereka tertidur • Banyak orang akan berjualan takjil(Pel) selama Ramadan"]],
      modes: [{ label: "Uji cepat", target: "none", title: "Hapus kata sesudah predikat", text: "“Mereka menjual …” terasa menggantung → transitif. “Kami sedang berlibur.” sudah utuh → intransitif." },
        { label: "Pasangan kata", target: "none", title: "Satu kata dasar, dua jenis", text: "diskusi: berdiskusi tentang THR (intransitif + Pel) vs mendiskusikan THR (transitif + O). tangis: menangis (intransitif) vs menangisi kepergiannya (transitif)." }] },
    { type: "callout", tone: "warn", heading: "Jebakan dari catatan kelas", html: "<em>Seluruh karyawan sedang diskusi tentang THR</em> → yang baku <strong>berdiskusi tentang THR</strong> (intransitif) atau <strong>mendiskusikan THR</strong> (transitif, tanpa “tentang”). Jangan <em>mendiskusikan tentang</em>: itu melanggar kepaduan (P5)." },
    { type: "cards", label: "Interaktif 2 • Berdasarkan Klausa", title: "Tunggal, Majemuk Setara, Majemuk Bertingkat", cols: 3, items: [
      { badge: "Tunggal", tone: "sky", title: "1 klausa", text: "Seluruh mahasiswa(S) akan praktikum(P) di laboratorium(K)." },
      { badge: "Majemuk setara", tone: "emerald", title: "2+ klausa sederajat", text: "Kami tidak hadir dan tidak presentasi. = (kami tidak hadir) dan (kami tidak presentasi)." },
      { badge: "Majemuk bertingkat", tone: "violet", title: "Induk + anak kalimat", text: "Anton tidak datang (induk) karena sakit hati (anak)." }
    ] },
    { type: "choices", label: "Interaktif 3 • KMB: Bagian Mana yang Diperluas?", title: "Anak Kalimat Menggantikan Satu Fungsi", style: "pills", desc: "Klik setiap jenis perluasan:",
      options: [
        { label: "Perluasan subjek", title: "Anak kalimat menempel pada S (biasanya dengan “yang”)", code: "[Para karyawan yang sedang berkumpul untuk membahas kenaikan tunjangan bersama direksi](S) akan menyampaikan(P) usulan(O) di ruang rapat(K).", text: "Di dalam S ada s2 (para karyawan) + p2 (sedang berkumpul). Contoh lain: <em>Mobil yang akan diperbaiki(S) harus diambil(P) sekarang(K).</em>" },
        { label: "Perluasan objek", title: "Anak kalimat menjadi O (biasanya dengan “bahwa”)", code: "Hakim(S) memutuskan(P) [bahwa ia(s2) harus membayar(p2) denda(o2)](O).", text: "Yang diputuskan hakim adalah sebuah klausa utuh." },
        { label: "Perluasan keterangan", title: "Anak kalimat menjadi K (karena, walaupun, agar, ketika, jika…)", code: "Anton(S) tidak datang(P) [karena sakit hati](K).", text: "Induk: Anton tidak datang. Anak: (Anton) sakit hati. Pola: S + P + K(s2 + p2)." }
      ] },
    { type: "table", label: "Interaktif 4 • Anak Kalimat di Depan", title: "Posisi Anak Kalimat dan Tanda Koma", headers: ["Susunan", "Contoh", "Koma?"],
      rows: [["Anak kalimat → induk", "Walaupun sedang sakit, Arman tetap datang.", "Ya, sesudah anak kalimat"], ["Induk → anak kalimat", "Arman tetap datang walaupun sedang sakit.", "Tidak"], ["Anak kalimat → induk", "Agar permasalahan itu dapat diselesaikan, seluruh karyawan harus mengikuti diskusi.", "Ya"]],
      modes: [{ label: "➕ Aturan EYD", target: "none", title: "Koma memisahkan anak kalimat yang mendahului induk", text: "Bila anak kalimat (diawali walaupun, karena, agar, jika, ketika, …) berada di <strong>depan</strong>, beri koma sebelum induk kalimat. Bila di <strong>belakang</strong>, koma tidak dipakai." },
        { label: "Analisis dosen", target: "row", row: 2, title: "Transitif + KMB perluasan keterangan", text: "Induk: seluruh karyawan(S) harus mengikuti(P) diskusi(O) → transitif. Kalimat no. 1 (Arman) → intransitif." }] },
    { type: "table", label: "Interaktif 5 • KMS vs KMB", title: "Konjungsi Penanda", headers: ["Jenis", "Konjungsi", "Hubungan klausa"],
      rows: [["Majemuk setara", "dan, serta, tetapi, melainkan, atau, bahkan, lalu, kemudian", "Sederajat; masing-masing bisa berdiri sendiri"], ["Majemuk bertingkat", "yang, bahwa, karena, sebab, walaupun, meskipun, agar, supaya, ketika, jika, sehingga", "Anak kalimat bergantung pada induk"]],
      defaultNote: "➕ Konjungsi bertingkat bisa di depan kalimat (Karena…, …). Konjungsi setara seperti <em>dan, tetapi</em> tidak dipakai di awal kalimat dalam ragam resmi." }
  ],
  simulator: [
    { type: "exercise", label: "Permainan Interaktif 1 • Transitif atau Intransitif?", title: "Lihat Predikatnya", headers: ["Kalimat", "Jenis"],
      rows: [["Mereka menjual sepeda.", "Transitif"], ["Kami sedang berlibur.", "Intransitif"], ["Para karyawan sedang membahas kualitas produk.", "Transitif"], ["Ia menangis.", "Intransitif"], ["Ia menangisi kepergian sahabatnya.", "Transitif"], ["Banyak orang akan berjualan takjil selama Ramadan.", "Intransitif"], ["Mereka sedang mendiskusikan hasil penelitian.", "Transitif"], ["Seluruh mahasiswa akan praktikum di laboratorium.", "Intransitif"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: TI, answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 2 • Jumlah Klausa", title: "Tunggal atau Majemuk?", headers: ["Kalimat", "Jenis"],
      rows: [["Para karyawan sedang mendiskusikan hasil produksi di gudang.", "Tunggal"], ["Kami tidak hadir dan tidak presentasi.", "Majemuk setara"], ["Hakim memutuskan bahwa ia harus membayar denda.", "Majemuk bertingkat"], ["Adiknya rajin, tetapi ia sendiri malas.", "Majemuk setara"], ["Mobil yang akan diperbaiki harus diambil sekarang.", "Majemuk bertingkat"], ["Rumah akan dibangun.", "Tunggal"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: JK, answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 3 • Jenis Perluasan", title: "KMB Perluasan Apa?", headers: ["Kalimat majemuk bertingkat", "Perluasan"],
      rows: [["Hakim memutuskan bahwa ia harus membayar denda.", "Perluasan objek"], ["Anton tidak datang karena sakit hati.", "Perluasan keterangan"], ["Mobil yang akan diperbaiki harus diambil sekarang.", "Perluasan subjek"], ["Walaupun sedang sakit, Arman tetap datang.", "Perluasan keterangan"], ["Mahasiswa yang akan praktikum di laboratorium kimia harus memakai jas lab.", "Perluasan subjek"], ["Dosen mengumumkan bahwa ujian diundur.", "Perluasan objek"], ["Agar permasalahan itu dapat diselesaikan, seluruh karyawan harus mengikuti diskusi.", "Perluasan keterangan"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: PER, answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 4 • Tanda Koma", title: "Penulisan Mana yang Benar?", headers: ["Konteks", "Pilih"],
      rows: [
        ["Anak kalimat di depan", "Walaupun sedang sakit, Arman tetap datang.", ["Walaupun sedang sakit Arman tetap datang.", "Walaupun sedang sakit, Arman tetap datang."]],
        ["Anak kalimat di belakang", "Arman tetap datang walaupun sedang sakit.", ["Arman tetap datang, walaupun sedang sakit.", "Arman tetap datang walaupun sedang sakit."]],
        ["Anak kalimat tujuan di depan", "Agar lulus, ia belajar setiap malam.", ["Agar lulus, ia belajar setiap malam.", "Agar lulus ia, belajar setiap malam."]],
        ["Huruf kapital nama", "Arman tetap datang.", ["arman tetap datang.", "Arman tetap datang."]]
      ].map(([c, a, o]) => ({ cells: [c], fields: [{ options: o, answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Bedah Kalimat dari Kelas", title: "Analisis Dulu, Lalu Buka", items: [
      { prompt: "Para karyawan yang sedang berkumpul untuk membahas kenaikan tunjangan bersama direksi perusahaan akan menyampaikan usulan di ruang rapat.", answer: "S: Para karyawan … direksi perusahaan • P: akan menyampaikan • O: usulan • K: di ruang rapat", reason: "KMB perluasan subjek; transitif (menyampaikan butuh O)." },
      { prompt: "Hakim memutuskan bahwa ia harus membayar denda.", answer: "S: Hakim • P: memutuskan • O: bahwa ia harus membayar denda (s2 ia, p2 harus membayar, o2 denda)", reason: "KMB perluasan objek." },
      { prompt: "Anton tidak datang karena sakit hati. Induk dan anak kalimatnya?", answer: "Induk: Anton tidak datang • Anak: (Anton) sakit hati", reason: "Subjek anak kalimat dilesapkan karena sama dengan subjek induk (sesuai prinsip kehematan P5)." },
      { prompt: "Gabungkan jadi KMB perluasan subjek: “Mahasiswa akan praktikum di laboratorium kimia.” + “Mahasiswa harus datang pukul 07.00.”", answer: "Mahasiswa yang akan praktikum di laboratorium kimia harus datang pukul 07.00.", reason: "Klausa pertama menjadi anak kalimat dengan “yang” yang menempel pada subjek." },
      { prompt: "Ubah menjadi anak kalimat di depan: “Seluruh karyawan harus mengikuti diskusi agar permasalahan itu dapat diselesaikan.”", answer: "Agar permasalahan itu dapat diselesaikan, seluruh karyawan harus mengikuti diskusi.", reason: "Pindahkan anak kalimat ke depan dan tambahkan koma." }
    ] }
  ],
  flashcards: [
    { tag: "P6", q: "Apa itu klausa?", a: "Inti kalimat: S + P atau S + P + O." },
    { tag: "P6", q: "Kalimat aktif transitif?", a: "Predikatnya membutuhkan objek. Mereka menjual sepeda." },
    { tag: "P6", q: "Kalimat aktif intransitif?", a: "Predikatnya tidak membutuhkan objek. Kami sedang berlibur. (Boleh ada pelengkap: berjualan takjil.)" },
    { tag: "P6", q: "Tunggal vs majemuk?", a: "Tunggal: 1 klausa. Majemuk: lebih dari 1 klausa (setara atau bertingkat)." },
    { tag: "P6", q: "Majemuk setara?", a: "Klausa-klausanya sederajat: Kami tidak hadir dan (kami) tidak presentasi." },
    { tag: "P6", q: "Majemuk bertingkat?", a: "Ada induk kalimat (klausa utama) dan anak kalimat (klausa tambahan)." },
    { tag: "P6", q: "KMB perluasan subjek?", a: "Anak kalimat menempel pada S, biasanya dengan “yang”: Mobil yang akan diperbaiki harus diambil sekarang." },
    { tag: "P6", q: "KMB perluasan objek?", a: "Anak kalimat menjadi O, biasanya dengan “bahwa”: Hakim memutuskan bahwa ia harus membayar denda." },
    { tag: "P6", q: "KMB perluasan keterangan?", a: "Anak kalimat menjadi K (karena, walaupun, agar…): Anton tidak datang karena sakit hati." },
    { tag: "P6", q: "Koma pada anak kalimat?", a: "Anak kalimat di depan → koma sebelum induk. Di belakang → tanpa koma." }
  ],
  quiz: [
    { q: "Inti kalimat yang terdiri atas S + P atau S + P + O disebut…", opts: ["Frasa", "Klausa", "Paragraf", "Pelengkap"], ans: 1, exp: "" },
    { q: "Kalimat aktif yang predikatnya membutuhkan objek disebut…", opts: ["Aktif transitif", "Aktif intransitif", "Pasif", "Nominal"], ans: 0, exp: "" },
    { q: "Kalimat aktif intransitif ditunjukkan oleh…", opts: ["Mereka menjual sepeda.", "Kami memainkan bola.", "Kami sedang berlibur.", "Para karyawan membahas kualitas produk."], ans: 2, exp: "" },
    { q: "“Banyak orang akan berjualan takjil selama Ramadan.” Fungsi kata takjil adalah…", opts: ["Objek", "Pelengkap", "Keterangan", "Subjek"], ans: 1, exp: "berjualan (ber-) → pelengkap; kalimatnya intransitif." },
    { q: "Bentuk baku untuk “Seluruh karyawan sedang diskusi tentang THR” adalah…", opts: ["sedang mendiskusikan tentang THR", "sedang berdiskusi tentang THR", "sedang diskusikan THR", "sedang didiskusi tentang THR"], ans: 1, exp: "Atau “sedang mendiskusikan THR” tanpa “tentang”." },
    { q: "Kalimat yang hanya terdiri atas satu klausa disebut kalimat…", opts: ["Majemuk setara", "Majemuk bertingkat", "Tunggal", "Campuran"], ans: 2, exp: "" },
    { q: "“Kami tidak hadir dan tidak presentasi” termasuk kalimat…", opts: ["Tunggal", "Majemuk setara", "Majemuk bertingkat perluasan objek", "Minor"], ans: 1, exp: "(kami tidak hadir) dan (kami tidak presentasi)." },
    { q: "“Hakim memutuskan bahwa ia harus membayar denda” adalah KMB perluasan…", opts: ["Subjek", "Predikat", "Objek", "Keterangan"], ans: 2, exp: "Klausa “bahwa …” menjadi objek." },
    { q: "“Mobil yang akan diperbaiki harus diambil sekarang.” Subjek kalimat tersebut adalah…", opts: ["Mobil", "Mobil yang akan diperbaiki", "harus diambil", "sekarang"], ans: 1, exp: "KMB perluasan subjek." },
    { q: "Pada “Anton tidak datang karena sakit hati”, induk kalimatnya adalah…", opts: ["karena sakit hati", "Anton sakit hati", "Anton tidak datang", "sakit hati"], ans: 2, exp: "" },
    { q: "“Walaupun sedang sakit, Arman tetap datang” termasuk…", opts: ["Transitif, KMB perluasan objek", "Intransitif, KMB perluasan keterangan", "Transitif, KMS", "Intransitif, kalimat tunggal"], ans: 1, exp: "Analisis dosen; anak kalimat mendahului induk." },
    { q: "“Agar permasalahan itu dapat diselesaikan, seluruh karyawan harus mengikuti diskusi” termasuk…", opts: ["Transitif, KMB perluasan keterangan", "Intransitif, KMB perluasan subjek", "Transitif, KMS", "Intransitif, KMB perluasan objek"], ans: 0, exp: "mengikuti diskusi (O)." },
    { q: "Penulisan yang benar adalah…", opts: ["Walaupun sedang sakit Arman tetap datang.", "Walaupun sedang sakit, Arman tetap datang.", "Arman tetap datang, walaupun sedang sakit.", "Walaupun, sedang sakit Arman tetap datang."], ans: 1, exp: "Anak kalimat di depan → koma." },
    { q: "Konjungsi yang menandai kalimat majemuk bertingkat adalah…", opts: ["dan", "tetapi", "atau", "karena"], ans: 3, exp: "dan, tetapi, atau → setara." },
    { q: "Anak kalimat perluasan subjek biasanya ditandai kata…", opts: ["bahwa", "yang", "dan", "atau"], ans: 1, exp: "bahwa → perluasan objek." }
  ],
  ringkasan: `*RANGKUMAN BAHASA INDONESIA — PERTEMUAN 6*
🧩 *Kalimat Efektif Lanjutan*

1️⃣ Klausa = S + P (atau S + P + O).
2️⃣ Transitif: P butuh O (menjual sepeda). Intransitif: tanpa O (berlibur, berjualan takjil = Pel).
3️⃣ Tunggal = 1 klausa. Majemuk setara = klausa sederajat (dan, tetapi, atau). Majemuk bertingkat = induk + anak kalimat.
4️⃣ KMB perluasan subjek (yang…), objek (bahwa…), keterangan (karena/walaupun/agar…).
5️⃣ Anak kalimat di depan → koma: Walaupun sedang sakit, Arman tetap datang.
6️⃣ berdiskusi tentang / mendiskusikan (tanpa tentang).`
};
