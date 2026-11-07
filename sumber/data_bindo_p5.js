// Bahasa Indonesia — Pertemuan 5: Penulisan Kalimat Efektif (Bab 5 modul)
const LAB3 = require("./lab_tahap3.js");
// Kunci latihan soal adalah analisis sendiri (modul tidak menyertakan kunci).
const POLA = ["S P", "S P O", "S P Pel", "S P K", "S P O Pel", "S P O K"];
const TEE = ["Efektif", "Tidak efektif"];
module.exports = {
  id: "p5", nomor: 5, judul: "Penulisan Kalimat Efektif: Struktur, Jenis, dan Syarat", ujian: "UTS",
  hero: {
    badge: "Materi 5 • Bahasa Indonesia",
    title: "Kalimat yang Sampai ke Pembaca Persis seperti di Kepala Penulis",
    text: "Kuasai <strong>pola dasar S-P-O-Pel-K</strong>, beda <strong>objek dan pelengkap</strong>, <strong>jenis-jenis kalimat</strong>, dan <strong>7 syarat kalimat efektif</strong>: kesepadanan, kecermatan, kehematan, kelogisan, kepaduan, keparalelan, ketegasan."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Definisi kalimat", html: "Satuan bahasa terkecil, lisan atau tulisan, yang mengungkapkan <strong>pikiran yang utuh</strong>. Ciri tulis: diawali huruf kapital, diakhiri tanda titik, tanya, atau seru. Unsur yang <strong>selalu wajib</strong>: <strong>subjek dan predikat</strong>." },
    { type: "table", label: "Interaktif 1 • Pola Dasar (Tabel 3 Modul)", title: "Enam Tipe Kalimat Dasar", headers: ["Tipe", "S", "P", "O", "Pel", "K"],
      rows: [["S-P", "Orang itu", "sedang tidur", "", "", ""], ["S-P-O", "Ayahnya", "membeli", "mobil baru", "", ""], ["S-P-Pel", "Bella", "berjualan", "", "suvenir", ""], ["S-P-K", "Kami", "tinggal", "", "", "di Jakarta"], ["S-P-O-Pel", "Dia", "mengirimi", "ibunya", "uang", ""], ["S-P-O-K", "Pak Raden", "memasukkan", "uang", "", "ke bank"]],
      modes: [{ label: "Objek", target: "col", col: 3, title: "Dituntut verba transitif (me-…-kan/-i)", text: "membeli, mengirimi, memasukkan → wajib ada O." }, { label: "Pelengkap", target: "col", col: 4, title: "Mirip objek, tetapi tidak bisa jadi subjek pasif", text: "berjualan suvenir → *Suvenir dijuali Bella (tidak bisa)." }, { label: "Keterangan", target: "col", col: 5, title: "Paling mudah berpindah", text: "Kami tinggal di Jakarta → Di Jakarta kami tinggal." }] },
    { type: "choices", label: "Interaktif 2 • Lima Unsur Kalimat", title: "S, P, O, Pel, K", style: "pills", desc: "Klik setiap unsur:",
      options: [
        { label: "Subjek", title: "Yang dibicarakan", code: "Rifka • Gadis kecil itu • Anak yang memakai kerudung itu • Melukis", text: "Berupa nomina, frasa nomina, klausa, atau verba (Melukis hobiku)." },
        { label: "Predikat", title: "Yang menjelaskan subjek", code: "makan • pengacara • tinggi • dua • ke Jakarta", text: "Biasanya verba/adjektiva. Pada pola S-P bisa nomina (Ayahku pengacara), numeral (Saudaraku dua), atau preposisional (Ibu ke Jakarta)." },
        { label: "Objek", title: "Dituntut verba transitif", code: "Adi mengunjungi … (?) → Adi mengunjungi Pak Rustam", text: "Tanpa O, kalimat terasa menggantung. Bandingkan: Adi berkunjung. (tanpa O)" },
        { label: "Pelengkap", title: "Melengkapi P, bukan sasaran", code: "Ia belajar matematika • Ia menjadi tentara", text: "Sering tertukar dengan objek. Lihat Interaktif 3." },
        { label: "Keterangan", title: "Paling beragam & mudah berpindah", code: "Di kamar, dia memotong rambutnya.", text: "Waktu, tempat, cara, tujuan, sebab, dsb. Unsur tak wajib." }
      ] },
    { type: "table", label: "Interaktif 3 • Objek vs Pelengkap (Tabel 4)", title: "Empat Uji Pembeda", headers: ["Uji", "Objek", "Pelengkap"],
      rows: [["Wujud", "Nomina/klausa: Ia mempelajari matematika", "Nomina, verba, adjektiva, frasa: Ia belajar matematika"], ["Letak", "Langsung di belakang P", "Di belakang P (jika tak ada O) atau di belakang O"], ["Dipasifkan", "Bisa jadi S: Roti dimakan ayah", "Tidak bisa: *Matematika diajar adik"], ["Diganti -nya", "Bisa: Ibu menjualnya", "Tidak bisa: *Ibu berjualannya"]],
      modes: [{ label: "Uji tercepat", target: "row", row: 2, title: "Coba pasifkan", text: "Kalau bisa menjadi subjek kalimat pasif → objek. Kalau tidak → pelengkap. (Tanda * = bentuk yang tidak berterima.)" },
        { label: "Petunjuk imbuhan", target: "none", title: "➕ Pola cepat", text: "Predikat ber- (berjualan, bermain, belajar) atau menjadi/merupakan biasanya diikuti <strong>pelengkap</strong>. Predikat me-…-kan/me-…-i biasanya diikuti <strong>objek</strong>." }] },
    { type: "cards", label: "Interaktif 4 • Jenis Kalimat", title: "Enam Sudut Pandang Modul", cols: 3, items: [
      { badge: "Bentuk sintaksis", tone: "sky", title: "Berita • Perintah • Tanya • Seru", text: "Deklaratif, imperatif, interogatif, eksklamatif." },
      { badge: "Jumlah klausa", tone: "emerald", title: "Tunggal • Majemuk", text: "Majemuk: setara (KMS), bertingkat (KMB), campuran (KMC)." },
      { badge: "Kelengkapan", tone: "amber", title: "Mayor • Minor", text: "Mayor minimal S + P (Ayah pergi.). Minor hanya S atau P (Pergi!)." },
      { badge: "Kata predikat", tone: "violet", title: "Verbal • Nominal • Adjektiva • Numeral • Preposisional", text: "Verbal: aktif (transitif/intransitif) & pasif (di-, ter-, ke-an)." },
      { badge: "Bentuk ujaran", tone: "rose", title: "Langsung • Tak langsung", text: "Ibu berkata, “Kemarin nenek ke Yogyakarta.”" },
      { badge: "Posisi S-P", tone: "slate", title: "Biasa • Inversi", text: "Inversi: predikat mendahului subjek." }
    ] },
    { type: "table", label: "Interaktif 5 • Majemuk Setara & Bertingkat", title: "Hubungan dan Konjungsinya", headers: ["Jenis", "Hubungan", "Contoh modul"],
      rows: [["KMS", "Penjumlahan (dan, serta)", "Tini belanja sayuran dan ibu memasaknya."], ["KMS", "Pertentangan (tetapi, melainkan)", "Adiknya rajin, tetapi ia sendiri malas."], ["KMS", "Pemilihan (atau)", "Engkau menunggu di sini atau pergi bersama kami."], ["KMS", "Penegas (bahkan)", "Soal-soal itu tidak ada yang sulit, bahkan tergolong mudah."], ["KMB", "Pengganti subjek", "Anak yang berbaju merah itu adikku."], ["KMB", "Pengganti objek", "Ia tidak mengetahui bahwa kami telah lulus ujian."], ["KMB", "Pengganti keterangan tujuan", "Ayah mengajak orang-orang itu agar mereka bersatu."], ["KMC", "Setara + bertingkat", "Saya menulis surat dan adik menonton televisi ketika ayah pulang dari kantor."]],
      defaultNote: "KMS: kedua klausa sederajat. KMB: ada induk kalimat dan anak kalimat. Detailnya di Pertemuan 6." },
    { type: "choices", label: "Interaktif 6 • 7 Syarat Kalimat Efektif", title: "Klik Setiap Syarat: TE → E", style: "pills",
      options: [
        { label: "1. Kesepadanan", title: "Struktur lengkap, subjek tidak dijamakkan", code: "TE: Iqbal membeli seragam…, kemudian Iqbal sekaligus membeli 10 bola.\nE: Iqbal membeli seragam…, sekaligus membeli 10 bola.", text: "➕ Juga: subjek jangan didahului kata depan. <em>Dalam rapat itu membahas…</em> (S hilang) → <em>Rapat itu membahas…</em>" },
        { label: "2. Kecermatan", title: "Tidak ambigu, kata tepat", code: "TE: Mahasiswa perguruan tinggi yang terkenal itu…\nE: Mahasiswa yang kuliah di perguruan tinggi yang terkenal itu…", text: "Siapa yang terkenal, mahasiswanya atau perguruan tingginya? Kalimat efektif hanya punya satu tafsiran." },
        { label: "3. Kehematan", title: "Tanpa kata berlebih", code: "TE: Karena dia tidak diajak, dia tidak ikut…\nE: Karena tidak diajak, dia tidak ikut…", text: "Hindari pengulangan subjek dan sinonim berdampingan (agar supaya, sejak dari, para tamu-tamu)." },
        { label: "4. Kelogisan", title: "Masuk akal", code: "TE: Untuk mempersingkat waktu, kami lanjutkan acara ini.\nE: Untuk menghemat waktu, kami lanjutkan acara ini.", text: "Waktu tidak bisa dipersingkat; yang bisa adalah menghematnya." },
        { label: "5. Kepaduan", title: "Tidak bertele-tele, tanpa sisipan antara P dan O", code: "TE: Jurnal ini membahas tentang teknologi robotika.\nE: Jurnal ini membahas teknologi robotika.", text: "Verba transitif langsung diikuti objek: membahas, mendiskusikan, menceritakan (tanpa tentang/daripada)." },
        { label: "6. Keparalelan", title: "Bentuk sejajar", code: "TE: …menolong anak itu dengan dipapahnya…\nE: …menolong anak itu dengan memapahnya…", text: "me- dengan me-, di- dengan di-, nomina dengan nomina." },
        { label: "7. Ketegasan", title: "Menonjolkan ide pokok", code: "Pada kesempatan lain, kami berharap…\nBukan seratus, seribu, atau sejuta, melainkan berjuta-juta…", text: "Caranya: taruh di awal, urutan bertahap, repetisi, pertentangan, partikel -lah/-pun/-kah." }
      ] },
    { type: "callout", tone: "warn", heading: "⚠️ Catatan koreksi modul", html: "<ol><li>Contoh kesepadanan <em>Ahmad (S) pulang (P) bekerja (O)</em>: <strong>pulang</strong> adalah verba intransitif sehingga tidak punya objek. Lebih tepat <em>Ahmad pulang ke daerah asalnya</em> (S-P-K).</li><li>Bagian kalimat pasif tertulis “Kalimat <em>aktif</em> ada tiga macam”; maksudnya kalimat <strong>pasif</strong>.</li><li>Ketegasan (c) repetisi: contoh modul diberi label “Tidak efektif/Efektif”, padahal repetisi justru salah satu cara menegaskan. Dalam konteks ketegasan, <em>Cerita itu begitu menarik, cerita itu sangat mengharukan</em> adalah contoh repetisi yang disengaja.</li><li>Ringkasan menyebut S-P-O sebagai komponen wajib, padahal objek hanya wajib bila predikatnya verba transitif. Yang selalu wajib: <strong>S dan P</strong>.</li><li>Contoh inversi <em>Kami kirimkan hadiah itu kemarin</em> sebenarnya kalimat pasif persona. Contoh inversi yang lebih jelas: <em>Datanglah ia ke rumahku.</em> (P mendahului S).</li></ol>" }
  ],
  simulator: [
    LAB3.BINDO_KALIMAT,
    { type: "exercise", label: "Permainan Interaktif 1 • Tentukan Pola", title: "Pola Kalimat Apa?", headers: ["Kalimat", "Pola"],
      rows: [["Andi bermain bola.", "S P Pel"], ["Nisa mengirimi ibunya uang.", "S P O Pel"], ["Nenek menceritakan hal itu.", "S P O"], ["Kecelakaan itu terjadi pekan lalu.", "S P K"], ["Pak Raden memasukkan uang ke bank.", "S P O K"], ["Adikku tinggi.", "S P"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: POLA, answer: a }], ok: "✓" })) },
    { type: "exercise", label: "Permainan Interaktif 2 • Objek atau Pelengkap?", title: "Uji dengan Pemasifan", headers: ["Kalimat (kata bergaris tebal)", "Fungsi"],
      rows: [["Mita belajar <strong>matematika</strong>.", "Pelengkap", "Matematika dipelajari… butuh mempelajari, bukan belajar."], ["Ayah membeli <strong>mobil baru</strong>.", "Objek", "Mobil baru dibeli ayah. ✓"], ["Anak Pak Hasan menjadi <strong>polisi</strong>.", "Pelengkap", "Tidak bisa dipasifkan."], ["Paman berjualan <strong>bayam</strong>.", "Pelengkap", "Predikat ber-."], ["Ibu menjual <strong>baju</strong>.", "Objek", "Ibu menjualnya. ✓"], ["Dia mengirimi ibunya <strong>uang</strong>.", "Pelengkap", "ibunya = O, uang = Pel."]]
        .map(([c, a, ok]) => ({ cells: [c], fields: [{ options: ["Objek", "Pelengkap"], answer: a }], ok: "✓ " + ok })) },
    { type: "exercise", label: "Permainan Interaktif 3 • Efektif atau Tidak?", title: "Hakimi Kalimatnya", headers: ["Kalimat", "Penilaian"],
      rows: [["Yang meminjam buku di perpustakaan harap dikembalikan.", "Tidak efektif", "Logikanya keliru: yang dikembalikan buku, bukan peminjam. → Buku yang dipinjam dari perpustakaan harap dikembalikan."], ["Pencuri berhasil ditangkap polisi.", "Efektif", ""], ["Kita harus bisa merubah kebiasaan yang buruk.", "Tidak efektif", "merubah → mengubah (kata dasar ubah)."], ["Para tamu-tamu negara disambut oleh Presiden.", "Tidak efektif", "para + bentuk ulang = jamak ganda."], ["Ibu-ibu dimohon berdiri.", "Efektif", ""], ["Dalam rapat itu membahas kenaikan harga BBM.", "Tidak efektif", "Tidak bersubjek: buang “Dalam”."], ["Sejak usia delapan tahun, ia sudah tinggal di Yogyakarta.", "Efektif", ""], ["Annisa mengupas mangga dengan menggunakan pisau.", "Tidak efektif", "dengan menggunakan → dengan."]]
        .map(([c, a, ok]) => ({ cells: [c], fields: [{ options: TEE, answer: a }], ok: "✓ " + ok })) },
    { type: "exercise", label: "Permainan Interaktif 4 • Syarat yang Dilanggar", title: "Diagnosis Kalimat Tidak Efektif", headers: ["Kalimat tidak efektif", "Syarat dilanggar"],
      rows: [["Ayahku rajin bekerja agar supaya dapat mencukupi kebutuhan.", "Kehematan"], ["Untuk mempersingkat waktu, kami lanjutkan acara ini.", "Kelogisan"], ["Seorang pun tidak ada yang bisa menghindar daripada pengawasannya.", "Kepaduan"], ["Kepada yang bersalah harus dijatuhi hukuman setimpal.", "Kesepadanan"], ["Pak Guru menolong anak itu dengan dipapahnya.", "Keparalelan"], ["Istri dokter yang cantik itu datang.", "Kecermatan"]]
        .map(([c, a]) => ({ cells: [c], fields: [{ options: ["Kesepadanan", "Kecermatan", "Kehematan", "Kelogisan", "Kepaduan", "Keparalelan"], answer: a }], ok: "✓" })) },
    { type: "reveal", label: "Perbaiki Sendiri", title: "Tulis Versi Efektifnya, Lalu Buka", items: [
      { prompt: "Kepada yang bersalah harus dijatuhi hukuman setimpal.", answer: "Yang bersalah harus dijatuhi hukuman setimpal.", reason: "Kata depan “kepada” menghilangkan subjek." },
      { prompt: "Dalam setahun ia berhasil menerbitkan 5 judul buku setahun.", answer: "Dalam setahun ia berhasil menerbitkan lima judul buku.", reason: "“setahun” dua kali. ➕ Bilangan satu atau dua kata ditulis dengan huruf." },
      { prompt: "Ia sedang marah sehingga acuh ketika melihatku.", answer: "Ia sedang marah sehingga tak acuh ketika melihatku.", reason: "acuh = peduli. Maksud kalimat: tidak peduli → tak acuh." },
      { prompt: "Mereka dimintai pertanggungan jawabnya.", answer: "Mereka dimintai pertanggungjawabannya.", reason: "Bentuk baku: pertanggungjawaban." },
      { prompt: "Rumahnya Pak Dirman sedang dicat.", answer: "Rumah Pak Dirman sedang dicat.", reason: "-nya berlebih (pengaruh ragam lisan)." }
    ] },
    { type: "reveal", label: "Soal Modul yang Perlu Dibahas", title: "Latihan No. 4, 9, 19, 22", items: [
      { prompt: "No. 4: Annisa mendapat hadiah. Polanya?", answer: "S P O (sesuai Tabel 3 modul: “Rani mendapat hadiah” = S-P-O)", reason: "⚠️ Sebagian tata bahasa (TBBI) menggolongkan kata setelah “mendapat” sebagai pelengkap. Untuk ujian dari dosen ini, ikuti modul: S P O." },
      { prompt: "No. 9: Berbuat baik kepada orang lain … tindakan terpuji.", answer: "merupakan (paling lazim); adalah juga berterima", reason: "“ialah/yaitu” cenderung untuk definisi/rincian. Predikat berupa penggolongan (tindakan terpuji) → merupakan." },
      { prompt: "No. 19: mana yang efektif? (agar supaya • Kepada yang bersalah… • Yang meminjam buku… • Para hadirin sekalian…)", answer: "Keempat pilihan tidak efektif", reason: "A kata mubazir, B tanpa subjek, C tidak logis, D jamak ganda. Kemungkinan soal ini bermaksud “tidak efektif”, atau ada salah ketik. Tanyakan ke dosen bila keluar." },
      { prompt: "No. 22: mana yang efektif? (Rumahnya Pak Dirman… • Operasi yang dijalankan Reagan… • Dokter itu mengatakan bahwa penyakit AIDS… • Bu Nori mengajar bahasa Indonesia.)", answer: "D paling aman", reason: "A jelas salah. B dan C sebenarnya juga berterima; D dipilih karena polanya paling sederhana dan sama dengan no. 6. Kunci ini analisis saya." }
    ] }
  ],
  flashcards: [
    { tag: "P5", q: "Apa itu kalimat?", a: "Satuan bahasa terkecil (lisan/tulisan) yang mengungkapkan pikiran utuh; tulis: huruf kapital di awal, tanda titik/tanya/seru di akhir." },
    { tag: "P5", q: "Unsur kalimat yang selalu wajib?", a: "Subjek dan predikat." },
    { tag: "P5", q: "Unsur wajib vs tak wajib?", a: "Wajib tidak bisa dihilangkan (mereka menghadiri pertemuan itu). Tak wajib bisa dihilangkan (barangkali, kemarin sore)." },
    { tag: "P5", q: "Pola umum kalimat dasar?", a: "S + P + O + Pel + K." },
    { tag: "P5", q: "Beda objek dan pelengkap?", a: "Objek bisa jadi subjek pasif dan diganti -nya; pelengkap tidak. Ia mempelajari matematika (O) vs Ia belajar matematika (Pel)." },
    { tag: "P5", q: "Kalimat mayor vs minor?", a: "Mayor: minimal S + P (Ayah pergi.). Minor: hanya S atau P (Pergi!)." },
    { tag: "P5", q: "Tiga bentuk predikat kalimat pasif?", a: "di- (dimakan), ter- (terjatuh), ke-an (kehujanan)." },
    { tag: "P5", q: "Kalimat nominal, adjektiva, numeral, preposisional?", a: "Ayahku pengacara • Adikku tinggi • Saudaraku dua • Ibu ke Jakarta." },
    { tag: "P5", q: "Apa itu kalimat efektif?", a: "Kalimat yang menimbulkan kembali gagasan di benak pembaca persis seperti di benak penulis: padat, singkat, jelas, lengkap, tepat." },
    { tag: "P5", q: "7 syarat kalimat efektif?", a: "Kesepadanan, kecermatan, kehematan, kelogisan, kepaduan, keparalelan, ketegasan." },
    { tag: "P5", q: "Contoh pelanggaran kehematan?", a: "agar supaya, para tamu-tamu, sejak dari, dengan menggunakan, pengulangan subjek." },
    { tag: "P5", q: "Lima cara ketegasan?", a: "Kata penting di awal, urutan bertahap, repetisi, pertentangan, partikel -lah/-pun/-kah." }
  ],
  quiz: [
    { q: "Unsur pokok kalimat terdiri atas…", opts: ["Subjek dan Keterangan", "Subjek dan Objek", "Subjek dan Predikat", "Subjek, Predikat, dan Objek"], ans: 2, exp: "Objek hanya wajib bila predikat transitif. (Latihan no. 1)" },
    { q: "Andi bermain bola. Struktur kalimat tersebut adalah…", opts: ["S P Pel", "S P O", "S P K", "S P"], ans: 0, exp: "bermain (ber-) + bola = pelengkap; *Bola dimainkan Andi butuh predikat lain. (No. 2)" },
    { q: "Nisa mengirimi ibunya uang. Struktur kalimat tersebut adalah…", opts: ["S P Pel", "S P O", "S P O K", "S P O Pel"], ans: 3, exp: "ibunya = O, uang = Pel (seperti “Dia mengirimi ibunya uang” di Tabel 3). (No. 3)" },
    { q: "Annisa mendapat hadiah. Pola kalimat tersebut menurut Tabel 3 modul adalah…", opts: ["S P K", "S P O", "S P Pel", "S P"], ans: 1, exp: "Modul: “Rani mendapat hadiah” = S-P-O. (No. 4; lihat catatan di Simulator)" },
    { q: "Kalimat yang berpola S P O adalah…", opts: ["Ketua RT ikut berperan dalam kebersihan lingkungan.", "Kakak belajar dengan tekun di perpustakaan.", "Kereta api berhenti di setiap stasiun.", "Bapak Kepala Sekolah menyerahkan buku tabungan."], ans: 3, exp: "menyerahkan (transitif) + buku tabungan (O). (No. 5)" },
    { q: "Berikut yang merupakan kalimat efektif adalah…", opts: ["Yang meminjam buku di perpustakaan harap dikembalikan.", "Kita harus bisa merubah kebiasaan yang buruk.", "Bu Nori mengajar mahasiswa.", "Saya menyukainya di mana sifat-sifatnya sangat baik."], ans: 2, exp: "A tidak logis, B merubah → mengubah, D “di mana” bukan penghubung. (No. 6)" },
    { q: "Ia … oleh kepala sekolah agar tidak mengulangi perbuatannya.", opts: ["diperingati", "diperingatkan", "memperingatkan", "memperingati"], ans: 1, exp: "memperingatkan = menasihati/menegur; memperingati = merayakan (HUT RI). Bentuk pasif → diperingatkan. (No. 7)" },
    { q: "Bukunya ada … saya.", opts: ["di", "pada", "kepada", "dari"], ans: 1, exp: "“pada” untuk orang; “di” untuk tempat. (No. 8)" },
    { q: "Berbuat baik kepada orang lain … tindakan terpuji. Pengisi paling lazim adalah…", opts: ["ialah", "yaitu", "merupakan", "di mana"], ans: 2, exp: "Predikat berupa penggolongan. (No. 9; “adalah” juga berterima)" },
    { q: "Di antara kalimat berikut, yang efektif adalah…", opts: ["Mereka sedang mempertinggikan tanggul.", "Hari Ulang Tahun ke-72 Republik Indonesia.", "Dalam rapat itu membahas kenaikan harga BBM.", "Pencuri berhasil ditangkap polisi."], ans: 3, exp: "A → meninggikan, B bukan kalimat (tanpa P), C tanpa subjek. (No. 10)" },
    { q: "Berikut yang merupakan kalimat efektif adalah…", opts: ["Berita yang saya dengar mengabarkan bahwa kurikulum akan diubah.", "Mereka dimintai pertanggungan jawabnya.", "Ia sedang marah sehingga acuh ketika melihatku.", "Ratri ketiduran di bus."], ans: 0, exp: "B → pertanggungjawabannya, C acuh = peduli, D ketiduran tidak baku (tertidur). (No. 11)" },
    { q: "Nenek menceritakan hal itu. Polanya…", opts: ["S P Pelengkap", "S P Pelengkap K", "S P O K", "S P O"], ans: 3, exp: "Hal itu diceritakan nenek. (No. 12)" },
    { q: "Paman berjualan bayam di pasar. Polanya…", opts: ["S P Pelengkap", "S P Pelengkap K", "S P O K", "S P O"], ans: 1, exp: "berjualan + bayam (Pel) + di pasar (K). (No. 13)" },
    { q: "Kecelakaan itu terjadi pekan lalu. Polanya…", opts: ["S P Pelengkap", "S P Pelengkap K", "S P O K", "S P K"], ans: 3, exp: "pekan lalu = keterangan waktu. (No. 14)" },
    { q: "Kalimat yang mengandung unsur pelengkap adalah…", opts: ["Paman berenang di sungai.", "Sejak kecil ia sudah ditinggal oleh ibunya.", "Annisa mendapat hadiah dari kakaknya.", "Mita belajar matematika."], ans: 3, exp: "Contoh pelengkap di Tabel 4 modul. (No. 15)" },
    { q: "Kalimat yang mengandung unsur objek adalah…", opts: ["Ayah membeli mobil baru.", "Kecelakaan itu terjadi di Jalan Wates.", "Anak Pak Hasan menjadi polisi.", "Ibu berjalan-jalan di taman."], ans: 0, exp: "Mobil baru dibeli ayah. (No. 16)" },
    { q: "Nenek … masa lalunya yang indah di kapal pesiar.", opts: ["bercerita", "menceritakan tentang", "bercerita tentang", "menceritakan mengenai"], ans: 2, exp: "Verba transitif “menceritakan” tidak boleh diikuti tentang/mengenai (kepaduan); intransitif “bercerita” perlu “tentang”. (No. 17)" },
    { q: "Berikut yang merupakan kalimat efektif adalah…", opts: ["Yang meminjam buku di perpustakaan harap dikembalikan.", "Kita harus bisa merubah kebiasaan yang buruk.", "Rumah sakit, tempat orang-orang mencari kesembuhan, harus selalu bersih.", "Saya menyukainya di mana sifat-sifatnya sangat baik."], ans: 2, exp: "(No. 18)" },
    { q: "Berikut yang merupakan kalimat efektif adalah…", opts: ["Sejak usia delapan tahun, ia sudah tinggal di Yogyakarta.", "Untuk mempersingkat waktu, kami lanjutkan acara ini.", "Karena dia tidak diajak, dia tidak ikut belajar bersama di rumahku.", "Jurnal ini membahas tentang teknologi robotika sederhana."], ans: 0, exp: "⚠️ Opsi B saya ubah ke versi TE (“mempersingkat waktu”). Di modul tertulis “menghemat waktu”, yang juga efektif, sehingga soal aslinya punya dua jawaban benar. (No. 20)" },
    { q: "Kalimat yang berpola S P O adalah…", opts: ["Kakak belajar dengan tekun di perpustakaan.", "Adik menangis di pelukan Ibu.", "Kereta api berhenti di setiap stasiun.", "Bapak kepala sekolah menyerahkan buku tabanas."], ans: 3, exp: "(No. 21)" },
    { q: "Berikut yang merupakan kalimat efektif adalah… (kunci analisis)", opts: ["Rumahnya Pak Dirman sedang dicat.", "Seorang pun tidak ada yang bisa menghindar daripada pengawasannya.", "Hal itu disebabkan perilakunya sendiri yang kurang menyenangkan.", "Kita harus bisa merubah kebiasaan yang buruk."], ans: 2, exp: "Opsi diambil dari no. 22–23. “daripada” salah pakai; “Rumahnya Pak Dirman” -nya berlebih." },
    { q: "Berikut yang merupakan kalimat efektif adalah…", opts: ["Mereka sedang mempertinggikan tanggul.", "Dalam setahun ia berhasil menerbitkan 5 judul buku setahun.", "Atas perhatian Anda, kami ucapkan terima kasih.", "Dalam rapat itu membahas kenaikan harga BBM."], ans: 2, exp: "(No. 24)" },
    { q: "Berikut yang merupakan kalimat efektif adalah…", opts: ["Ibu-ibu dimohon berdiri.", "Kita harus bersungguh-sungguh agar supaya kegiatan ini berhasil.", "Annisa mengupas mangga dengan menggunakan pisau.", "Para tamu-tamu negara disambut oleh Presiden Republik Indonesia."], ans: 0, exp: "(No. 25)" },
    { q: "Syarat kalimat efektif yang dilanggar oleh “Mahasiswa perguruan tinggi yang terkenal itu…” adalah…", opts: ["Kecermatan (ambigu)", "Keparalelan", "Kehematan", "Ketegasan"], ans: 0, exp: "Tafsiran ganda." },
    { q: "“Pak Guru menolong anak itu dengan dipapahnya” melanggar…", opts: ["Kelogisan", "Keparalelan", "Kepaduan", "Kesepadanan"], ans: 1, exp: "menolong (me-) harus sejajar dengan memapah (me-)." },
    { q: "Partikel yang dipakai untuk ketegasan menurut modul adalah…", opts: ["-lah, -pun, -kah", "di-, ke-, se-", "dan, atau, tetapi", "yang, bahwa, agar"], ans: 0, exp: "Dapatkah mereka mengerti…?" },
    { q: "Kalimat pasif dengan predikat konfiks ke-an adalah…", opts: ["Roti dimakan adik.", "Adik terjatuh dari tempat tidur.", "Adik kehujanan di jalan.", "Adik memakan roti."], ans: 2, exp: "" },
    { q: "“Ayah membakar ikan nila di dapur” termasuk kalimat…", opts: ["Majemuk setara", "Tunggal", "Majemuk bertingkat", "Minor"], ans: 1, exp: "Satu klausa." },
    { q: "“Adiknya rajin, tetapi ia sendiri malas” termasuk KMS hubungan…", opts: ["Penjumlahan", "Pertentangan", "Pemilihan", "Penegas"], ans: 1, exp: "" }
  ],
  ringkasan: `*RANGKUMAN BAHASA INDONESIA — PERTEMUAN 5*
✍️ *Kalimat Efektif*

1️⃣ Kalimat = satuan terkecil yang mengungkapkan pikiran utuh. Wajib: S + P.
2️⃣ Pola dasar S-P-O-Pel-K: S-P, S-P-O, S-P-Pel, S-P-K, S-P-O-Pel, S-P-O-K.
3️⃣ Objek bisa jadi subjek pasif & diganti -nya; pelengkap tidak (belajar matematika, menjadi tentara).
4️⃣ Jenis: berita/perintah/tanya/seru • tunggal/majemuk (KMS, KMB, KMC) • mayor/minor • verbal (aktif transitif/intransitif, pasif di-/ter-/ke-an), nominal, adjektiva, numeral, preposisional • langsung/tak langsung • biasa/inversi.
5️⃣ 7 syarat efektif: kesepadanan, kecermatan, kehematan, kelogisan, kepaduan, keparalelan, ketegasan.
6️⃣ Jebakan: merubah→mengubah • agar supaya • para … -ulang • membahas tentang • dalam rapat itu membahas • acuh = peduli.`
};
