// AIK — Pertemuan 5: Tauhidullah (sumber: PDF "Tauhidullah")
// Teks Arab ditulis ulang dari mushaf standar (bukan salinan pdftotext), terjemahan mengikuti Terjemah Kemenag.
const T = [{ value: "rububiyah", label: "Rububiyah" }, { value: "mulkiyah", label: "Mulkiyah" }, { value: "uluhiyah", label: "Uluhiyah" }, { value: "asma", label: "Asma’ wa Sifat" }];

module.exports = {
  id: "p5",
  nomor: 5,
  judul: "Tauhidullah: Pembagian Tauhid & Urgensinya bagi Kehidupan",
  ujian: "UTS",
  hero: {
    badge: "Materi 5 • AIK",
    title: "Mengesakan Allah: dari Keyakinan sampai Perbuatan",
    text: "Pahami <strong>pengertian tauhid</strong> sebagai tema sentral aqidah, <strong>4 pembagian tauhid</strong> (Rububiyah, Mulkiyah, Uluhiyah, Asma’ wa Sifat), <strong>konsekuensi logisnya</strong> (dalil <em>at-Talazum</em> & <em>at-Tadhamun</em>), dan <strong>tauhid sebagai landasan hidup</strong> (QS. al-Kahfi 105). ➕ Termasuk QS. an-Nas 1–3 yang memuat tiga tauhid sekaligus."
  },
  cheatsheet: [
    {
      type: "callout",
      label: "Interaktif 1 • Pengertian Tauhid",
      tone: "success",
      heading: "Tauhid = mengesakan Allah dalam Rububiyah, Mulkiyah, Uluhiyah, dan Asma’ wa Sifat-Nya",
      html: "• Tauhid adalah <strong>tema sentral</strong> aqidah dan iman, sehingga aqidah dan iman sering disebut juga <strong>tauhid</strong>.<br>• <strong>Seluruh nabi dan rasul</strong> mengemban ajaran tauhid yang sama: menyeru menyembah Allah semata, tidak ada seruan menyembah selain-Nya."
    },
    {
      type: "cards",
      label: "Interaktif 2 • Pembagian Tauhid",
      title: "4 Tauhid (Versi Slide)",
      cols: 2,
      items: [
        { badge: "1. Rububiyah", tone: "emerald", title: "Allah Pencipta, Pengasuh, Pemelihara", text: "Meyakini Allah sebagai <strong>Pencipta</strong> sekaligus yang <strong>mengasuh dan memelihara</strong> semua ciptaan-Nya." },
        { badge: "2. Mulkiyah", tone: "sky", title: "Allah Pemilik & Raja", text: "Hanya Allah yang <strong>Maha Memiliki dan Maha Merajai</strong> alam semesta." },
        { badge: "3. Uluhiyah / Ubudiyah", tone: "amber", title: "Hanya Allah yang disembah", text: "Mengesakan Allah dalam segala bentuk <strong>peribadatan/persembahan</strong>; tidak ada yang patut disembah, <strong>dimintai perlindungan, dan pertolongan</strong> selain Allah." },
        { badge: "4. Asma’ wa Sifat", tone: "indigo", title: "Nama & sifat Allah", text: "Mengesakan Allah dalam <strong>nama-nama dan sifat-sifat-Nya</strong> sebagaimana disampaikan al-Qur’an dan hadis." }
      ]
    },
    {
      type: "ayat",
      label: "➕ Tambahan • Tiga Tauhid dalam Satu Surat",
      title: "QS. an-Nas 1–3: Rabb, Malik, Ilah",
      items: [
        { title: "Ayat 1–3", sumber: "QS. an-Nas [114]: 1–3", tone: "emerald",
          arab: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ",
          arti: "Katakanlah, “Aku berlindung kepada Tuhannya manusia, Raja manusia, sembahan manusia.”",
          note: "<strong>Rabb</strong> → Tauhid <strong>Rububiyah</strong> • <strong>Malik</strong> → Tauhid <strong>Mulkiyah</strong> • <strong>Ilah</strong> → Tauhid <strong>Uluhiyah</strong>. Urutannya sama dengan dalil at-Talazum di bawah. Mudah dihafal!" },
        { title: "Tauhid Uluhiyah dalam shalat", sumber: "QS. al-Fatihah [1]: 5", tone: "amber",
          arab: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          arti: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.",
          note: "Diucapkan minimal 17 kali sehari: ibadah dan permohonan pertolongan hanya kepada Allah." },
        { title: "Tauhid Asma’ wa Sifat", sumber: "QS. al-Ikhlas [112]: 1", tone: "indigo",
          arab: "قُلْ هُوَ اللَّهُ أَحَدٌ",
          arti: "Katakanlah (Muhammad), “Dialah Allah, Yang Maha Esa.”" }
      ]
    },
    {
      type: "callout",
      label: "➕ Catatan Istilah",
      tone: "info",
      heading: "Kenapa ada yang menyebut tauhid hanya 3?",
      html: "Banyak ulama membagi tauhid menjadi <strong>3</strong>: Rububiyah, Uluhiyah, Asma’ wa Sifat. <strong>Mulkiyah</strong> dimasukkan ke dalam Rububiyah (Allah Pencipta sekaligus Pemilik dan Pengatur). Slide AIK memisahkannya menjadi 4. Keduanya tidak bertentangan; <strong>untuk ujian AIK pakai versi 4</strong>."
    },
    {
      type: "table",
      label: "Interaktif 3 • Konsekuensi Logis Bertauhid",
      title: "Dua Dalil: Arah Naik & Arah Turun",
      headers: ["Dalil", "Arti", "Isi"],
      rows: [
        ["at-Talazum", "Kemestian", "Yakin Rububiyah → <strong>semestinya</strong> yakin Mulkiyah → semestinya yakin Uluhiyah → semestinya yakin Asma’ wa Sifat"],
        ["at-Tadhamun", "Cakupan", "Yang sudah sampai Uluhiyah <strong>pasti sudah melalui</strong> Mulkiyah dan Rububiyah"]
      ],
      modes: [
        { label: "Logika at-Tadhamun", target: "row", row: 1, title: "Kenapa beribadah hanya kepada Allah?", text: "Karena Allah <strong>Rajanya</strong> (Mulkiyah). Kenapa Allah Rajanya? Karena Allah <strong>Pengasuh dan Pemeliharanya</strong> (Rububiyah)." },
        { label: "➕ Contoh nyata", target: "row", row: 0, title: "Musyrikin Makkah", text: "Mereka mengakui Allah sebagai pencipta langit dan bumi (QS. Luqman 25), tetapi tetap menyembah berhala. Artinya <strong>Rububiyah saja belum cukup</strong>; tauhid harus sampai Uluhiyah. Inilah pentingnya dalil at-Talazum." }
      ]
    },
    {
      type: "ayat",
      label: "Interaktif 4 • Tauhid sebagai Landasan Hidup",
      title: "Tanpa Tauhid, Amal Terhapus",
      items: [
        { sumber: "QS. al-Kahfi [18]: 105", tone: "rose",
          arab: "أُولَٰئِكَ الَّذِينَ كَفَرُوا بِآيَاتِ رَبِّهِمْ وَلِقَائِهِ فَحَبِطَتْ أَعْمَالُهُمْ فَلَا نُقِيمُ لَهُمْ يَوْمَ الْقِيَامَةِ وَزْنًا",
          arti: "Mereka itu orang-orang yang kufur terhadap ayat-ayat Tuhan mereka dan (kufur terhadap) pertemuan dengan-Nya. Maka terhapuslah amalan-amalan mereka, dan Kami tidak memberikan penimbangan terhadap (amal) mereka pada hari Kiamat.",
          note: "Tauhid adalah <strong>landasan</strong>: sebaik apa pun amal, tanpa iman kepada Allah dan hari akhir, amal itu tidak bernilai di akhirat." }
      ]
    },
    {
      type: "cards",
      label: "➕ Tambahan • Urgensi Tauhid dalam Kehidupan Sehari-hari",
      title: "Buah Tauhid bagi Mahasiswa",
      cols: 3,
      items: [
        { badge: "Rububiyah", tone: "emerald", title: "Menjaga ciptaan Allah", text: "Meneladani sifat <strong>al-Khaliq</strong> (Pencipta & Pemelihara): merawat tanaman dan lingkungan kampus." },
        { badge: "Mulkiyah", tone: "sky", title: "Amanah", text: "Harta, jabatan, nilai IPK hanyalah titipan Pemilik sebenarnya, jadi tidak sombong dan tidak curang." },
        { badge: "Uluhiyah", tone: "amber", title: "Merdeka dari selain Allah", text: "Tidak minta tolong ke dukun/jimat, tidak menghamba pada popularitas atau uang." },
        { badge: "Asma’ wa Sifat", tone: "indigo", title: "Merasa diawasi", text: "Yakin Allah <strong>al-Bashir</strong> (Maha Melihat) → jujur saat ujian online sekalipun." },
        { badge: "Ketenangan", tone: "rose", title: "Tawakal", text: "Sudah berusaha maksimal, hasilnya diserahkan kepada Allah." },
        { badge: "Lawan tauhid", tone: "slate", title: "Syirik", text: "Dosa yang tidak diampuni jika dibawa mati tanpa tobat (QS. an-Nisa’ [4]: 48)." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Jenis Tauhid",
      title: "Pernyataan Ini Termasuk Tauhid Apa?",
      headers: ["Pernyataan", "Jenis tauhid"],
      rows: [
        { cells: ["Allah yang menciptakan dan memberi rezeki seluruh makhluk"], fields: [{ options: T, answer: "rububiyah" }], ok: "✓" },
        { cells: ["Hanya Allah Raja dan Pemilik sejati langit dan bumi"], fields: [{ options: T, answer: "mulkiyah" }], ok: "✓" },
        { cells: ["Shalat, kurban, dan doa hanya ditujukan kepada Allah"], fields: [{ options: T, answer: "uluhiyah" }], ok: "✓" },
        { cells: ["Meyakini Allah Maha Mendengar sebagaimana disebut dalam al-Qur’an"], fields: [{ options: T, answer: "asma" }], ok: "✓" },
        { cells: ["Tidak meminta perlindungan kepada jimat atau “penunggu”"], fields: [{ options: T, answer: "uluhiyah" }], ok: "✓ Perlindungan & pertolongan termasuk Uluhiyah." },
        { cells: ["Allah mengatur peredaran matahari dan bulan"], fields: [{ options: T, answer: "rububiyah" }], ok: "✓" },
        { cells: ["Hukum yang paling berhak ditaati adalah hukum Allah, Sang Raja"], fields: [{ options: T, answer: "mulkiyah" }], ok: "✓" },
        { cells: ["Menetapkan nama Allah “al-Khaliq” tanpa menyerupakan dengan makhluk"], fields: [{ options: T, answer: "asma" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • at-Talazum & at-Tadhamun",
      title: "Analisis Logika Tauhid",
      items: [
        { prompt: "Orang yakin Allah pencipta alam, tetapi tetap menyembah berhala", answer: "Tauhid belum utuh", reason: "Berhenti di Rububiyah; at-Talazum menuntut berlanjut sampai Uluhiyah." },
        { prompt: "Seorang muslim hanya beribadah kepada Allah. Apakah ia pasti mengakui Allah sebagai Raja dan Pencipta?", answer: "Ya, pasti", reason: "Dalil at-Tadhamun: Uluhiyah sudah mencakup Mulkiyah dan Rububiyah." },
        { prompt: "Rajin sedekah tetapi tidak beriman kepada Allah dan hari akhir", answer: "Amal tidak ditimbang di akhirat", reason: "QS. al-Kahfi 105." },
        { prompt: "Meneladani sifat al-Khaliq di kampus", answer: "Menjaga & melestarikan tumbuhan/lingkungan kampus", reason: "Al-Khaliq: Pencipta sekaligus Pemelihara." }
      ]
    }
  ],
  flashcards: [
    { tag: "Pengertian", q: "Apa arti tauhid menurut slide?", a: "Mengesakan Allah dalam Rububiyah, Mulkiyah, Uluhiyah, dan Asma’ wa Sifat-Nya." },
    { tag: "Pengertian", q: "Kenapa aqidah dan iman disebut juga tauhid?", a: "Karena tauhid adalah tema sentral aqidah dan iman." },
    { tag: "Pengertian", q: "Apa ajaran semua nabi dan rasul?", a: "Tauhid: menyeru menyembah Allah semata." },
    { tag: "Rububiyah", q: "Tauhid Rububiyah?", a: "Meyakini Allah Pencipta sekaligus Pengasuh dan Pemelihara semua ciptaan-Nya." },
    { tag: "Mulkiyah", q: "Tauhid Mulkiyah?", a: "Meyakini hanya Allah Yang Maha Memiliki dan Maha Merajai alam semesta." },
    { tag: "Uluhiyah", q: "Tauhid Uluhiyah/Ubudiyah?", a: "Mengesakan Allah dalam ibadah; tidak ada yang patut disembah, dimintai perlindungan, dan pertolongan selain Allah." },
    { tag: "Asma’ wa Sifat", q: "Tauhid Asma’ wa Sifat?", a: "Mengesakan Allah dalam nama dan sifat-Nya sesuai al-Qur’an dan hadis." },
    { tag: "Dalil", q: "Dalil at-Talazum?", a: "Kemestian: yakin Rububiyah → semestinya Mulkiyah → Uluhiyah → Asma’ wa Sifat." },
    { tag: "Dalil", q: "Dalil at-Tadhamun?", a: "Cakupan: yang sampai Uluhiyah pasti sudah melalui Mulkiyah dan Rububiyah." },
    { tag: "Landasan", q: "Ayat tauhid sebagai landasan hidup?", a: "QS. al-Kahfi [18]: 105, amal orang yang kufur terhapus dan tidak ditimbang." },
    { tag: "➕ an-Nas", q: "Tiga tauhid dalam QS. an-Nas 1–3?", a: "Rabbin nas (Rububiyah), Malikin nas (Mulkiyah), Ilahin nas (Uluhiyah)." }
  ],
  quiz: [
    { q: "Tauhid yang meyakini Allah sebagai Pencipta sekaligus Pengasuh dan Pemelihara alam disebut …", opts: ["Tauhid Uluhiyah", "Tauhid Rububiyah", "Tauhid Mulkiyah", "Tauhid Asma’ wa Sifat"], ans: 1, exp: "Rabb = Pencipta, Pengasuh, Pemelihara.", optExp: ["Ibadah.", "Benar.", "Pemilik & Raja.", "Nama & sifat."] },
    { q: "Tidak meminta perlindungan dan pertolongan kepada selain Allah merupakan wujud tauhid …", opts: ["Rububiyah", "Mulkiyah", "Uluhiyah", "Asma’ wa Sifat"], ans: 2, exp: "Uluhiyah mencakup ibadah, perlindungan, dan pertolongan.", optExp: ["Bukan.", "Bukan.", "Benar.", "Bukan."] },
    { q: "Tauhid Mulkiyah adalah meyakini bahwa …", opts: ["Allah Maha Memiliki dan Maha Merajai alam semesta", "Allah satu-satunya yang disembah", "Allah memiliki nama-nama yang baik", "Allah menciptakan manusia dari tanah"], ans: 0, exp: "Mulk = kerajaan/kepemilikan.", optExp: ["Benar.", "Uluhiyah.", "Asma’ wa Sifat.", "Rububiyah."] },
    { q: "“Setiap orang yang meyakini Tauhid Rububiyah semestinya meyakini Tauhid Mulkiyah, dan seterusnya.” Ini disebut dalil …", opts: ["at-Tadhamun", "at-Talazum", "an-Nafyu", "al-Itsbat"], ans: 1, exp: "Talazum = kemestian.", optExp: ["Cakupan.", "Benar.", "Rukun syahadat (P6).", "Rukun syahadat (P6)."] },
    { q: "Dalil at-Tadhamun menjelaskan bahwa orang yang sudah sampai Tauhid Uluhiyah …", opts: ["Belum tentu meyakini Rububiyah", "Pasti sudah melalui Mulkiyah dan Rububiyah", "Tidak perlu Asma’ wa Sifat", "Hanya meyakini Mulkiyah"], ans: 1, exp: "Tadhamun = cakupan.", optExp: ["Keliru.", "Benar.", "Keliru.", "Keliru."] },
    { q: "Ayat yang menjelaskan terhapusnya amal orang yang kufur terhadap ayat-ayat Allah dan pertemuan dengan-Nya adalah …", opts: ["QS. al-Kahfi [18]: 105", "QS. al-Ikhlas [112]: 1", "QS. al-Baqarah [2]: 30", "QS. al-Hujurat [49]: 13"], ans: 0, exp: "Tauhid sebagai landasan hidup.", optExp: ["Benar.", "Keesaan Allah.", "Khalifah.", "Keberagaman manusia."] },
    { q: "Dalam QS. an-Nas 1–3, kata “Malikin nas” berkaitan dengan tauhid …", opts: ["Rububiyah", "Mulkiyah", "Uluhiyah", "Asma’ wa Sifat"], ans: 1, exp: "➕ Rabb–Malik–Ilah = Rububiyah–Mulkiyah–Uluhiyah.", optExp: ["Itu Rabbin nas.", "Benar.", "Itu Ilahin nas.", "Bukan."] },
    { q: "Ajaran tauhid yang dibawa para nabi dan rasul sebelum Nabi Muhammad saw. adalah …", opts: ["Berbeda-beda sesuai zamannya", "Sama: menyeru menyembah Allah semata", "Menyembah malaikat", "Menyembah nabinya masing-masing"], ans: 1, exp: "Semua nabi membawa tauhid.", optExp: ["Syariat bisa berbeda, tauhidnya sama.", "Benar.", "Keliru.", "Keliru."] },
    { q: "Meneladani sifat Allah al-Khaliq (Pencipta & Pemelihara) di lingkungan kampus paling tepat dengan …", opts: ["Memaafkan teman", "Menjaga dan melestarikan tumbuhan di lingkungan kampus", "Menolong teman", "Memanfaatkan sampah plastik"], ans: 1, exp: "Bercabang: semua opsi baik, tetapi yang terkait Pencipta-Pemelihara alam adalah menjaga tumbuhan.", optExp: ["Baik, tapi meneladani al-‘Afuw.", "Benar.", "Baik, tapi bukan al-Khaliq.", "Baik, tapi kurang tepat sasaran."] },
    { q: "Seseorang mengakui Allah pencipta langit dan bumi, tetapi tetap menyembah berhala. Tauhidnya …", opts: ["Sudah sempurna", "Berhenti di Rububiyah dan belum sampai Uluhiyah", "Sudah sampai Uluhiyah", "Termasuk Asma’ wa Sifat"], ans: 1, exp: "➕ Seperti musyrikin Makkah (QS. Luqman 25).", optExp: ["Keliru.", "Benar.", "Keliru.", "Keliru."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS AIK — PERTEMUAN 5*
📚 *Tauhidullah*

1️⃣ Tauhid = mengesakan Allah dalam Rububiyah, Mulkiyah, Uluhiyah, Asma’ wa Sifat. Tema sentral aqidah; ajaran semua nabi.
2️⃣ Rububiyah: Pencipta, Pengasuh, Pemelihara • Mulkiyah: Pemilik & Raja • Uluhiyah/Ubudiyah: hanya Allah yang disembah, dimintai perlindungan & pertolongan • Asma’ wa Sifat: nama & sifat sesuai Qur’an-hadis.
3️⃣ at-Talazum (kemestian): Rububiyah → Mulkiyah → Uluhiyah → Asma’ wa Sifat. at-Tadhamun (cakupan): Uluhiyah pasti mencakup Mulkiyah & Rububiyah.
4️⃣ Landasan hidup: QS. al-Kahfi 105, amal orang kufur terhapus.
➕ QS. an-Nas 1–3: Rabb (Rububiyah), Malik (Mulkiyah), Ilah (Uluhiyah). Banyak ulama membagi tauhid jadi 3 (Mulkiyah masuk Rububiyah); ujian AIK pakai 4.`
};
