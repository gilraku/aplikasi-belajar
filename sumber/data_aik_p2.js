// AIK — Pertemuan 2: Islam sebagai Agama Pilihan (sumber: PDF "Islam sebagai Agama Pilihan 1")
// Teks Arab ditulis ulang dari mushaf standar, terjemahan mengikuti Terjemah Kemenag.
const SIS = [{ value: "akidah", label: "Akidah" }, { value: "ibadah", label: "Ibadah" }, { value: "akhlak", label: "Akhlak" }, { value: "muamalah", label: "Mu’amalah" }];
const KAR = ["Toleransi", "Moderat", "Integratif & komprehensif", "Rasional", "Plural", "Menggembirakan & memudahkan"];

module.exports = {
  id: "p2",
  nomor: 2,
  judul: "Islam sebagai Agama Pilihan",
  ujian: "UTS",
  hero: {
    badge: "Materi 2 • AIK",
    title: "Islam: Agama yang Menyelamatkan, Menyeluruh, dan Rahmatan lil ‘Alamin",
    text: "Pahami <strong>pengertian Islam</strong> (bahasa, istilah, rumusan Muhammadiyah), Islam sebagai <strong>ad-Din</strong> dan <strong>asy-Syariah</strong>, <strong>sumber ajaran</strong> (al-Qur’an & as-Sunnah al-Maqbulah), <strong>pendekatan</strong> Bayani-Burhani-Irfani, <strong>4 sistematika</strong> ajaran, dan <strong>6 karakteristik</strong> Islam beserta ayatnya."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • Pengertian Islam",
      title: "Islam dari 3 Sudut Pandang",
      headers: ["Sudut pandang", "Pengertian"],
      rows: [
        ["Etimologi (bahasa)", "<em>aslama – yuslimu – islaman</em> = keselamatan, kedamaian, kesejahteraan, kepatuhan, <strong>penyerahan diri secara penuh kepada Allah</strong>"],
        ["Terminologi (istilah)", "Agama yang <strong>menyelamatkan</strong> siapa saja yang memeluknya, yakni Islam yang se-Islam-nya"],
        ["Muhammadiyah", "Agama Islam yang dibawa Nabi Muhammad, diturunkan Allah dalam <strong>al-Qur’an dan as-Sunnah al-Maqbulah</strong>, berupa perintah, larangan, dan petunjuk untuk kebaikan manusia di <strong>dunia dan akhirat</strong>"]
      ],
      modes: [
        { label: "Konsekuensi makna", target: "row", row: 0, title: "Islam = damai & selamat", text: "Karena maknanya kedamaian dan keselamatan, tindakan anarkis, pengeboman, dan teror <strong>bertentangan</strong> dengan Islam. Islam justru menjadi pelopor perdamaian." },
        { label: "➕ Istilah", target: "row", row: 2, title: "Ditulis “Makbulah” atau “Maqbulah”", text: "Slide menulis <em>as-Sunnah al-Makbulah</em>; ejaan baku transliterasinya <strong>al-Maqbulah</strong> (مقبولة) = sunnah yang <strong>dapat diterima</strong> sebagai hujah (sahih/hasan)." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 2 • Ciri Islam (Rumusan Slide)",
      title: "Islam adalah Agama yang …",
      cols: 2,
      items: [
        { badge: "Wahyu untuk semua rasul", tone: "emerald", title: "Hidayah & rahmat sepanjang masa", text: "Diwahyukan kepada para rasul, menjamin kesejahteraan <strong>materiil-spirituil, duniawi-ukhrawi</strong> (QS. al-Baqarah 136 & asy-Syura 13)." },
        { badge: "Mudah", tone: "sky", title: "Menggembirakan & tidak memberatkan", text: "QS. al-Baqarah 286 & an-Nisa’ 165." },
        { badge: "Penutup", tone: "amber", title: "Menyempurnakan ajaran nabi sebelumnya", text: "Dibawa Nabi Muhammad sebagai <strong>Nabi akhir zaman</strong> (QS. al-Ahzab 40)." },
        { badge: "Menyeluruh", tone: "indigo", title: "Tidak dapat dipisah-pisahkan", text: "Meliputi akidah, ibadah, akhlak, mu’amalah (QS. al-Baqarah 208 & al-Qashash 77)." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "callout",
          label: "Interaktif 3 • Islam sebagai ad-Din",
          tone: "success",
          heading: "1. Islam sebagai Agama (ad-Din)",
          html: "Diwahyukan sejak <strong>Nabi Adam hingga Nabi Muhammad</strong> → konsep <strong>Rahmatan lil ‘Alamin</strong>: pemikiran, rumusan, dan amal agar dunia <strong>damai</strong> dan menjadi milik semua keluarga, suku, ras, wilayah, negara, dan bangsa.<br><br>Maknanya: <strong>seluruh nabi dan rasul diutus oleh Tuhan yang sama</strong> dan sama-sama menyeru menyembah Allah saja."
        },
        {
          type: "callout",
          label: "Islam sebagai asy-Syariah",
          tone: "tip",
          heading: "2. Islam sebagai Ajaran (asy-Syariah)",
          html: "Islam adalah <strong>tuntunan, arahan, bimbingan, dan petunjuk</strong> yang dapat diamalkan untuk kesejahteraan dan keselamatan hidup di <strong>dunia dan akhirat</strong>."
        }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Sumber Ajaran Islam",
      title: "Al-Qur’an vs As-Sunnah al-Maqbulah",
      headers: ["Sumber", "Pengertian", "Lafaz", "Makna"],
      rows: [
        ["Al-Qur’an", "Wahyu Allah kepada Muhammad melalui Jibril, berisi perintah & larangan sebagai pedoman hidup", "dari Allah", "dari Allah"],
        ["As-Sunnah al-Maqbulah", "Wahyu berupa <strong>perkataan, perbuatan, persetujuan (taqrir), keadaan, dan kehendak</strong> Muhammad saw.", "dari Muhammad saw.", "dari Allah"]
      ],
      modes: [
        { label: "Kunci beda", target: "none", title: "Hafalkan kolom lafaz", text: "Al-Qur’an: <strong>lafaz & makna dari Allah</strong>. Sunnah: <strong>makna dari Allah, lafaz dari Nabi</strong>." }
      ]
    },
    {
      type: "flow",
      label: "Interaktif 5 • Pendekatan Memahami Islam",
      title: "Bayani → Burhani → Irfani",
      items: ["Bayani: ulum al-Qur’an, ulum al-Hadis, ushul fiqh", "Burhani: ilmu sosial & kealaman", "Irfani: hati & akal untuk mendekat kepada Allah"],
      note: "Karena wahyu sudah selesai tetapi zaman terus berkembang, penafsiran tetap diperlukan. Pendekatan <strong>Burhani</strong> (iptek) dipakai, tetapi <strong>tidak boleh bertentangan dengan kaidah wahyu</strong>. Ini berbeda dengan liberalisme (berpikir bebas tanpa wahyu) dan pluralisme agama."
    },
    {
      type: "table",
      label: "Interaktif 6 • Sistematika & Karakteristik",
      title: "4 Sistematika Ajaran + 6 Karakteristik Islam",
      headers: ["Karakteristik", "Dalil"],
      rows: [
        ["1. Toleransi (tasamuh)", "QS. al-An’am [6]: 108"],
        ["2. Moderat (wasathiyah)", "QS. al-Baqarah [2]: 143"],
        ["3. Integratif & komprehensif", "QS. al-Anbiya’ [21]: 107–108"],
        ["4. Rasional", "QS. al-Ghasyiyah [88]: 17–22 (slide: 12–22)"],
        ["5. Plural (menerima kemajemukan)", "QS. al-Hujurat [49]: 13"],
        ["6. Menggembirakan, mendamaikan, memudahkan", "QS. al-Baqarah [2]: 286 & an-Nisa’ [4]: 165"]
      ],
      modes: [
        { label: "4 Sistematika", target: "none", title: "Akidah • Akhlak • Ibadah • Mu’amalah", text: "Keempatnya <strong>saling terikat</strong>: akidah kuat → ibadah tertib → akhlak mulia → mu’amalah baik. Rajin shalat tetapi tetap bermaksiat, atau baik bergaul tanpa shalat/puasa/zakat, sama-sama belum utuh." },
        { label: "Toleransi itu apa?", target: "row", row: 0, title: "Menghormati, bukan mencampur", text: "Contoh: <strong>menghormati pemeluk agama lain saat beribadah</strong>, tidak mencela sesembahan mereka (al-An’am 108), bertetangga dengan baik. Batasnya: <em>lakum dinukum wa liya din</em> (QS. al-Kafirun 6), yaitu tidak ikut ritual atau meyakini semua agama benar." },
        { label: "Plural ≠ pluralisme", target: "row", row: 4, title: "Beda kata yang sering menjebak", text: "<strong>Pluralitas</strong> = menerima kenyataan manusia beragam suku, bangsa, agama (al-Hujurat 13). <strong>Pluralisme agama</strong> = paham “semua agama sama benar”. Yang pertama ajaran Islam, yang kedua bertentangan dengan akidah (QS. Ali ‘Imran 19 & 85)." },
        { label: "➕ Koreksi ayat", target: "row", row: 3, title: "al-Ghasyiyah 17–20", text: "Ajakan berpikir “Apakah mereka tidak memperhatikan unta… langit… gunung… bumi…” ada di <strong>ayat 17–20</strong>. Ayat 12–16 masih menggambarkan surga, jadi rujukan yang lebih tepat 17–22." }
      ]
    },
    {
      type: "ayat",
      label: "Ayat Kunci",
      title: "Dalil Karakteristik & Kebenaran Islam",
      items: [
        { title: "Rahmatan lil ‘alamin", sumber: "QS. al-Anbiya’ [21]: 107", tone: "emerald",
          arab: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ",
          arti: "Dan Kami tidak mengutus engkau (Muhammad) melainkan untuk (menjadi) rahmat bagi seluruh alam." },
        { title: "Toleransi: jangan memaki sesembahan lain", sumber: "QS. al-An’am [6]: 108 (awal ayat)", tone: "sky",
          arab: "وَلَا تَسُبُّوا الَّذِينَ يَدْعُونَ مِنْ دُونِ اللَّهِ فَيَسُبُّوا اللَّهَ عَدْوًا بِغَيْرِ عِلْمٍ",
          arti: "Dan janganlah kamu memaki sesembahan yang mereka sembah selain Allah, karena mereka nanti akan memaki Allah dengan melampaui batas tanpa dasar pengetahuan." },
        { title: "Moderat", sumber: "QS. al-Baqarah [2]: 143 (awal ayat)", tone: "amber",
          arab: "وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا",
          arti: "Dan demikian pula Kami telah menjadikan kamu (umat Islam) umat pertengahan." },
        { title: "Masuk Islam secara menyeluruh", sumber: "QS. al-Baqarah [2]: 208", tone: "indigo",
          arab: "يَا أَيُّهَا الَّذِينَ آمَنُوا ادْخُلُوا فِي السِّلْمِ كَافَّةً وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ ۚ إِنَّهُ لَكُمْ عَدُوٌّ مُبِينٌ",
          arti: "Wahai orang-orang yang beriman! Masuklah ke dalam Islam secara keseluruhan, dan janganlah kamu ikuti langkah-langkah setan. Sungguh, ia musuh yang nyata bagimu." },
        { title: "Nabi terakhir", sumber: "QS. al-Ahzab [33]: 40 (sebagian)", tone: "rose",
          arab: "مَا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِنْ رِجَالِكُمْ وَلَٰكِنْ رَسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ",
          arti: "Muhammad itu bukanlah bapak dari seseorang di antara kamu, tetapi dia adalah utusan Allah dan penutup para nabi.",
          note: "Dasar keyakinan tidak ada nabi/rasul sesudah Nabi Muhammad saw. Mengaku atau mengakui nabi baru (misalnya keyakinan Ahmadiyah terhadap Mirza Ghulam Ahmad) bertentangan dengan ayat ini." },
        { title: "➕ Agama yang diridai", sumber: "QS. Ali ‘Imran [3]: 19 (awal ayat)", tone: "slate",
          arab: "إِنَّ الدِّينَ عِنْدَ اللَّهِ الْإِسْلَامُ",
          arti: "Sesungguhnya agama di sisi Allah ialah Islam.",
          note: "Dipertegas QS. Ali ‘Imran [3]: 85: siapa mencari agama selain Islam, tidak akan diterima. Karena itu Islam menolak pluralisme agama, tetapi tetap bertoleransi (QS. al-Baqarah 256: tidak ada paksaan dalam agama; QS. al-Kafirun 6: untukmu agamamu, untukku agamaku)." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • 4 Sistematika Ajaran",
      title: "Masuk Bagian Mana?",
      headers: ["Contoh", "Sistematika"],
      rows: [
        { cells: ["Meyakini Allah satu-satunya yang berhak disembah"], fields: [{ options: SIS, answer: "akidah" }], ok: "✓" },
        { cells: ["Shalat lima waktu dan puasa Ramadan"], fields: [{ options: SIS, answer: "ibadah" }], ok: "✓" },
        { cells: ["Jujur, santun, dan menepati janji"], fields: [{ options: SIS, answer: "akhlak" }], ok: "✓" },
        { cells: ["Jual beli, sewa kos, utang piutang yang adil"], fields: [{ options: SIS, answer: "muamalah" }], ok: "✓" },
        { cells: ["Beriman kepada hari akhir"], fields: [{ options: SIS, answer: "akidah" }], ok: "✓" },
        { cells: ["Bekerja sama dengan tetangga beda agama dalam kerja bakti kampung"], fields: [{ options: SIS, answer: "muamalah" }], ok: "✓ Urusan sosial." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Karakteristik Islam",
      title: "Sikap Ini Mencerminkan Karakteristik Apa?",
      headers: ["Sikap", "Karakteristik"],
      rows: [
        { cells: ["Diam dan menghormati tetangga yang sedang beribadah di rumah ibadahnya"], fields: [{ options: KAR, answer: "Toleransi" }], ok: "✓ al-An’am 108." },
        { cells: ["Tidak berlebihan dalam beragama dan tidak meremehkan"], fields: [{ options: KAR, answer: "Moderat" }], ok: "✓ Ummatan wasathan." },
        { cells: ["Merenungi penciptaan unta, langit, gunung, dan bumi"], fields: [{ options: KAR, answer: "Rasional" }], ok: "✓ al-Ghasyiyah." },
        { cells: ["Menerima teman dari suku dan bangsa berbeda"], fields: [{ options: KAR, answer: "Plural" }], ok: "✓ al-Hujurat 13." },
        { cells: ["Musafir boleh menjamak/mengqasar shalat"], fields: [{ options: KAR, answer: "Menggembirakan & memudahkan" }], ok: "✓ al-Baqarah 286." },
        { cells: ["Ajaran Islam mencakup urusan dunia dan akhirat sekaligus"], fields: [{ options: KAR, answer: "Integratif & komprehensif" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • Sesuai Islam atau Tidak?",
      title: "Uji Pemahaman Konsep",
      items: [
        { prompt: "“Semua agama sama benarnya, karena semua mengajarkan kebaikan.”", answer: "Tidak sesuai", reason: "Itu pluralisme agama; bertentangan dengan QS. Ali ‘Imran 19 & 85. Islam mengajarkan toleransi, bukan menyamakan kebenaran." },
        { prompt: "“Para nabi sejak Adam membawa ajaran tauhid yang sama.”", answer: "Sesuai", reason: "Islam sebagai ad-Din sejak Adam hingga Muhammad." },
        { prompt: "Mengebom tempat ibadah agama lain “demi membela agama”", answer: "Tidak sesuai", reason: "Islam bermakna damai dan selamat." },
        { prompt: "Mengikuti budaya “Barat” secara selektif dalam urusan mu’amalah duniawi (sains, teknologi, tata kelola)", answer: "Sesuai, dengan batas", reason: "Mu’amalah terbuka selama tidak bertentangan dengan syariat. Gaya hidup hedonis, free sex, dan sejenisnya tetap ditolak." },
        { prompt: "Mengakui ada nabi setelah Nabi Muhammad saw.", answer: "Tidak sesuai", reason: "QS. al-Ahzab 40: khataman nabiyyin." }
      ]
    }
  ],
  flashcards: [
    { tag: "Pengertian", q: "Makna Islam secara bahasa?", a: "Dari aslama–yuslimu–islaman: keselamatan, kedamaian, kesejahteraan, kepatuhan, penyerahan diri penuh kepada Allah." },
    { tag: "Pengertian", q: "Pengertian Islam menurut Muhammadiyah?", a: "Agama yang dibawa Nabi Muhammad, diturunkan dalam al-Qur’an dan as-Sunnah al-Maqbulah, berupa perintah, larangan, dan petunjuk untuk kebaikan dunia-akhirat." },
    { tag: "ad-Din", q: "Islam sebagai ad-Din bermakna?", a: "Agama yang diwahyukan sejak Adam hingga Muhammad, konsep Rahmatan lil ‘Alamin: membuat dunia damai bagi semua." },
    { tag: "Syariah", q: "Islam sebagai asy-Syariah bermakna?", a: "Tuntunan, arahan, bimbingan, dan petunjuk untuk keselamatan dunia dan akhirat." },
    { tag: "Sumber", q: "Beda al-Qur’an dan as-Sunnah dari sisi lafaz dan makna?", a: "Al-Qur’an: lafaz & makna dari Allah. Sunnah: makna dari Allah, lafaz dari Nabi." },
    { tag: "Sumber", q: "Bentuk-bentuk sunnah?", a: "Perkataan, perbuatan, persetujuan (taqrir), keadaan, dan kehendak Nabi." },
    { tag: "Pendekatan", q: "Bayani, Burhani, Irfani?", a: "Bayani: ilmu teks (ulum Qur’an, hadis, ushul fiqh). Burhani: ilmu sosial & alam. Irfani: hati & akal untuk mendekat kepada Allah." },
    { tag: "Sistematika", q: "4 sistematika ajaran Islam?", a: "Akidah, akhlak, ibadah, mu’amalah; tidak dapat dipisahkan." },
    { tag: "Karakteristik", q: "6 karakteristik Islam?", a: "Toleransi (al-An’am 108), moderat (al-Baqarah 143), integratif-komprehensif (al-Anbiya’ 107–108), rasional (al-Ghasyiyah), plural (al-Hujurat 13), menggembirakan-memudahkan (al-Baqarah 286, an-Nisa’ 165)." },
    { tag: "Dalil", q: "Dalil Nabi Muhammad nabi terakhir?", a: "QS. al-Ahzab [33]: 40, khatamun nabiyyin." },
    { tag: "➕ Pluralisme", q: "Beda pluralitas dan pluralisme agama?", a: "Pluralitas: menerima keberagaman (ajaran Islam). Pluralisme agama: meyakini semua agama sama benar (bertentangan dengan akidah, QS. Ali ‘Imran 19 & 85)." },
    { tag: "➕ Toleransi", q: "Batas toleransi dalam Islam?", a: "Menghormati dan bermuamalah baik, tanpa ikut ritual atau mengakui kebenaran akidah lain: lakum dinukum wa liya din (al-Kafirun 6)." }
  ],
  quiz: [
    { q: "Secara bahasa, kata Islam berasal dari aslama–yuslimu–islaman yang berarti …", opts: ["Kekuasaan dan kemenangan", "Keselamatan, kedamaian, dan penyerahan diri kepada Allah", "Perjanjian dan ikatan", "Pengetahuan dan ilmu"], ans: 1, exp: "Definisi etimologi di slide.", optExp: ["Bukan.", "Benar.", "Itu makna ‘aqidah (P3).", "Bukan."] },
    { q: "Menurut Muhammadiyah, sumber ajaran Islam adalah …", opts: ["Al-Qur’an dan tradisi masyarakat", "Al-Qur’an dan as-Sunnah al-Maqbulah", "Akal dan pengalaman", "Pendapat ulama saja"], ans: 1, exp: "Sunnah maqbulah = sunnah yang dapat diterima sebagai hujah.", optExp: ["Tradisi bukan sumber utama.", "Benar.", "Akal sarana memahami, bukan sumber utama.", "Bukan."] },
    { q: "Perbedaan al-Qur’an dan as-Sunnah adalah …", opts: ["Al-Qur’an lafaz dari Nabi, makna dari Allah", "Sunnah lafaz dan makna dari Allah", "Al-Qur’an lafaz dan makna dari Allah; Sunnah makna dari Allah, lafaz dari Nabi", "Keduanya lafaz dari Jibril"], ans: 2, exp: "Kunci perbedaan di slide.", optExp: ["Terbalik.", "Itu al-Qur’an.", "Benar.", "Bukan."] },
    { q: "Islam sebagai ad-Din yang diwahyukan sejak Nabi Adam hingga Nabi Muhammad mengandung makna …", opts: ["Setiap nabi membawa sesembahan berbeda", "Agama Yahudi dan Nasrani sekarang juga benar di sisi Allah", "Seluruh nabi diutus Tuhan yang sama dan menyeru menyembah Allah saja", "Semua agama di dunia adalah peninggalan para nabi"], ans: 2, exp: "Inti risalah semua nabi adalah tauhid.", optExp: ["Bukan.", "Bertentangan dengan Ali ‘Imran 85.", "Benar.", "Pluralisme, keliru."] },
    { q: "Pendekatan memahami Islam melalui ilmu sosial dan kealaman disebut …", opts: ["Bayani", "Burhani", "Irfani", "Tekstual"], ans: 1, exp: "Burhani = iptek, tetap tidak boleh bertentangan dengan wahyu.", optExp: ["Ilmu teks.", "Benar.", "Hati.", "Bukan istilah slide."] },
    { q: "Empat sistematika ajaran Islam adalah …", opts: ["Iman, Islam, ihsan, jihad", "Akidah, akhlak, ibadah, mu’amalah", "Shalat, zakat, puasa, haji", "Bayani, burhani, irfani, naqli"], ans: 1, exp: "Keempatnya saling terikat.", optExp: ["Bukan pembagian slide.", "Benar.", "Itu sebagian rukun Islam.", "Itu pendekatan."] },
    { q: "Karakteristik Islam “toleransi” didasarkan pada …", opts: ["QS. al-An’am [6]: 108", "QS. al-Ahzab [33]: 40", "QS. al-Kahfi [18]: 105", "QS. al-Baqarah [2]: 30"], ans: 0, exp: "Larangan memaki sesembahan agama lain.", optExp: ["Benar.", "Nabi terakhir.", "Amal orang kafir.", "Khalifah."] },
    { q: "Contoh sikap toleransi yang tepat adalah …", opts: ["Mengikuti ritual ibadah agama lain", "Menghormati pemeluk agama lain ketika sedang beribadah", "Meyakini semua agama sama benarnya", "Menolak bertetangga dengan nonmuslim"], ans: 1, exp: "Toleransi = menghormati, bukan mencampur akidah.", optExp: ["Melewati batas.", "Benar.", "Pluralisme agama.", "Tidak toleran."] },
    { q: "Ayat yang menjelaskan umat Islam sebagai umat pertengahan (moderat) adalah …", opts: ["QS. al-Baqarah [2]: 143", "QS. al-Hujurat [49]: 13", "QS. al-Anbiya’ [21]: 107", "QS. an-Nisa’ [4]: 165"], ans: 0, exp: "Ummatan wasathan.", optExp: ["Benar.", "Plural.", "Rahmatan lil ‘alamin.", "Memudahkan."] },
    { q: "Pernyataan yang sesuai dengan makna Islam sebagai agama damai adalah …", opts: ["Islam membenarkan aksi anarkis demi agama", "Islam membenarkan pengeboman tempat ibadah", "Islam memiliki toleransi tinggi sehingga menjadi pelopor perdamaian", "Islam memaksa orang lain masuk Islam"], ans: 2, exp: "➕ QS. al-Baqarah 256: tidak ada paksaan dalam agama.", optExp: ["Bertentangan.", "Bertentangan.", "Benar.", "Bertentangan dengan al-Baqarah 256."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS AIK — PERTEMUAN 2*
📚 *Islam sebagai Agama Pilihan*

1️⃣ Bahasa: aslama–yuslimu–islaman = selamat, damai, sejahtera, patuh, berserah diri. Istilah: agama yang menyelamatkan. Muhammadiyah: dibawa Nabi Muhammad, dalam al-Qur’an & as-Sunnah al-Maqbulah, untuk kebaikan dunia-akhirat.
2️⃣ ad-Din: sejak Adam s.d. Muhammad, Rahmatan lil ‘Alamin. asy-Syariah: tuntunan untuk keselamatan dunia-akhirat.
3️⃣ Sumber: Qur’an (lafaz & makna dari Allah) • Sunnah (makna dari Allah, lafaz dari Nabi; perkataan, perbuatan, taqrir, keadaan, kehendak).
4️⃣ Pendekatan: Bayani (teks) • Burhani (ilmu sosial & alam) • Irfani (hati).
5️⃣ Sistematika: akidah, akhlak, ibadah, mu’amalah (tak terpisah).
6️⃣ Karakteristik: toleransi (al-An’am 108) • moderat (al-Baqarah 143) • integratif-komprehensif (al-Anbiya’ 107–108) • rasional (al-Ghasyiyah) • plural (al-Hujurat 13) • memudahkan (al-Baqarah 286, an-Nisa’ 165).
➕ Toleransi ≠ pluralisme agama (Ali ‘Imran 19 & 85; al-Kafirun 6). Nabi terakhir: al-Ahzab 40.`
};
