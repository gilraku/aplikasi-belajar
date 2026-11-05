// AIK — Pertemuan 1: Hakikat Manusia dalam Pandangan Islam (sumber: PPT "Manusia dan agama")
// Teks Arab ditulis ulang dari mushaf standar (dicocokkan dengan gambar ayat di slide), terjemahan mengikuti Terjemah Kemenag.
const TOKOH = ["Muhammad Iqbal", "Kahlil Gibran", "Imam al-Ghazali"];
const PEND = [{ value: "bayani", label: "Bayani" }, { value: "burhani", label: "Burhani" }, { value: "irfani", label: "Irfani" }];

module.exports = {
  id: "p1",
  nomor: 1,
  judul: "Hakikat Manusia dalam Pandangan Islam",
  ujian: "UTS",
  hero: {
    badge: "Materi 1 • AIK",
    title: "Siapa Manusia, dan Untuk Apa Ia Ada di Bumi?",
    text: "Pahami <strong>tujuan mengkaji hakikat manusia</strong>, pandangan <strong>3 tokoh</strong> (Iqbal, Gibran, al-Ghazali), kisah <strong>penciptaan Adam sebagai khalifah</strong> (QS. al-Baqarah 30–33), peran <strong>akal</strong> dan hubungannya dengan al-Qur’an, serta rumus <strong>Bayani + Burhani + Irfani</strong>."
  },
  cheatsheet: [
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "callout",
          label: "Interaktif 1 • Kajian Hakikat Manusia",
          tone: "info",
          heading: "Diskursus sejak zaman Yunani",
          html: "Kajian tentang hakikat manusia berlangsung dari pendekatan <strong>filosofis</strong> sampai <strong>multidisiplin-interkonektif</strong>. Teori yang berkembang antara lain <strong>liberalisme, materialisme, idealisme, dan eksistensialisme</strong>."
        },
        {
          type: "callout",
          label: "Tujuan Kajian",
          tone: "tip",
          heading: "Mengapa perlu memahami hakikat manusia?",
          html: "Agar menjadi <strong>pedoman dasar berbuat</strong>: manusia adalah <strong>wakil Allah di bumi</strong> untuk mengelola bumi demi <strong>kesejahteraan, kedamaian, dan keadilan</strong>; pedoman berlaku <strong>manusiawi</strong> kepada sesama; serta membuat hidup <strong>lebih terarah dan bermakna</strong>."
        }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 2 • Tokoh yang Mengkaji Hakikat Manusia",
      title: "3 Pandangan, 3 Penekanan",
      cols: 3,
      items: [
        { badge: "Muhammad Iqbal (1873–1938)", tone: "emerald", title: "Manusia = makhluk paling mulia & wakil Tuhan", text: "Mengkritik pemikir yang memandang manusia dari satu sisi saja. Keberadaan manusia di bumi adalah buah <strong>kebebasan</strong> yang diberikan sebagai <strong>amanah</strong>. Banyak terinspirasi al-Qur’an." },
        { badge: "Kahlil Gibran (1883–1931)", tone: "rose", title: "Manusia & nilai cinta", text: "Menekankan martabat dan keluhuran manusia. Manusia makhluk <strong>individu sekaligus sosial</strong>: cinta diri → cinta sesama → puncaknya <strong>cinta kepada Pencipta</strong>." },
        { badge: "Imam al-Ghazali", tone: "indigo", title: "Hakikat manusia adalah jiwanya", text: "Manusia tersusun dari <strong>jasmani dan rohani</strong> (QS. Shad [38]: 71–72), tetapi yang ditekankan unsur <strong>rohani</strong>: yang membedakan manusia dari makhluk lain dan “memimpin” perilaku agar tidak menyimpang." }
      ]
    },
    {
      type: "callout",
      label: "➕ Catatan Koreksi Slide",
      tone: "warn",
      heading: "Kahlil Gibran bukan tokoh Muslim",
      html: "Slide menaruh Kahlil Gibran di bawah judul <em>“Tokoh Muslim yang Mengkaji Hakikat Manusia”</em>. Faktanya, Gibran adalah penyair-filsuf Lebanon berlatar <strong>Kristen Maronit</strong>. Pandangannya tetap boleh dipelajari, tetapi lebih tepat disebut <strong>tokoh pemikir</strong>, bukan tokoh Muslim. Untuk ujian, ingat saja isi pandangannya (cinta)."
    },
    {
      type: "ayat",
      label: "Interaktif 3 • Penciptaan Manusia dalam al-Qur’an",
      title: "Adam: Khalifah yang Dibekali Ilmu (QS. al-Baqarah 30–33)",
      items: [
        { title: "Rencana Allah menjadikan khalifah", sumber: "QS. al-Baqarah [2]: 30", tone: "emerald",
          arab: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً ۖ قَالُوا أَتَجْعَلُ فِيهَا مَنْ يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ ۖ قَالَ إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ",
          arti: "Dan (ingatlah) ketika Tuhanmu berfirman kepada para malaikat, “Aku hendak menjadikan khalifah di bumi.” Mereka berkata, “Apakah Engkau hendak menjadikan orang yang merusak dan menumpahkan darah di sana, sedangkan kami bertasbih memuji-Mu dan menyucikan nama-Mu?” Dia berfirman, “Sungguh, Aku mengetahui apa yang tidak kamu ketahui.”" },
        { title: "Adam diajari nama-nama", sumber: "QS. al-Baqarah [2]: 31", tone: "sky",
          arab: "وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا ثُمَّ عَرَضَهُمْ عَلَى الْمَلَائِكَةِ فَقَالَ أَنْبِئُونِي بِأَسْمَاءِ هَٰؤُلَاءِ إِنْ كُنْتُمْ صَادِقِينَ",
          arti: "Dan Dia ajarkan kepada Adam nama-nama (benda) semuanya, kemudian Dia perlihatkan kepada para malaikat, seraya berfirman, “Sebutkan kepada-Ku nama semua (benda) ini, jika kamu yang benar!”" },
        { title: "Pengakuan malaikat", sumber: "QS. al-Baqarah [2]: 32", tone: "amber",
          arab: "قَالُوا سُبْحَانَكَ لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا ۖ إِنَّكَ أَنْتَ الْعَلِيمُ الْحَكِيمُ",
          arti: "Mereka menjawab, “Mahasuci Engkau, tidak ada yang kami ketahui selain apa yang telah Engkau ajarkan kepada kami. Sungguh, Engkaulah Yang Maha Mengetahui, Mahabijaksana.”" },
        { title: "Keunggulan Adam ditunjukkan", sumber: "QS. al-Baqarah [2]: 33", tone: "indigo",
          arab: "قَالَ يَا آدَمُ أَنْبِئْهُمْ بِأَسْمَائِهِمْ ۖ فَلَمَّا أَنْبَأَهُمْ بِأَسْمَائِهِمْ قَالَ أَلَمْ أَقُلْ لَكُمْ إِنِّي أَعْلَمُ غَيْبَ السَّمَاوَاتِ وَالْأَرْضِ وَأَعْلَمُ مَا تُبْدُونَ وَمَا كُنْتُمْ تَكْتُمُونَ",
          arti: "Dia (Allah) berfirman, “Wahai Adam! Beritahukanlah kepada mereka nama-nama itu!” Setelah dia (Adam) menyebutkan nama-namanya, Dia berfirman, “Bukankah telah Aku katakan kepadamu, bahwa Aku mengetahui rahasia langit dan bumi, dan Aku mengetahui apa yang kamu nyatakan dan apa yang kamu sembunyikan?”" }
      ]
    },
    {
      type: "flow",
      label: "Pelajaran dari Ayat 30–33",
      title: "Mengapa Manusia Layak Menjadi Khalifah?",
      items: ["Allah menetapkan khalifah", "Malaikat bertanya", "Adam diberi ilmu", "Ilmu = keunggulan manusia"],
      highlight: 3,
      note: "Kelayakan manusia sebagai khalifah ada pada <strong>ilmu dan akal</strong>. Karena itu, manusia wajib terus menggali ilmu agar bisa mengelola bumi dengan benar, bukan merusak dan menumpahkan darah seperti yang dikhawatirkan malaikat."
    },
    {
      type: "table",
      label: "Interaktif 4 • Akal dan Manusia",
      title: "Akal: Berpikir + Berzikir",
      headers: ["Konsep", "Penjelasan slide"],
      rows: [
        ["Akal", "Pembeda manusia dengan makhluk lainnya"],
        ["Menggunakan akal", "Berpikir tentang <strong>ciptaan</strong> Allah + berzikir tentang <strong>kekuasaan</strong> Allah"],
        ["Hasil berpikir", "Melahirkan <strong>kebudayaan dan kemajuan peradaban</strong>"],
        ["Hasil berzikir", "Pengakuan bahwa yang <strong>mutlak hanya Allah</strong>"],
        ["Akal & al-Qur’an", "Hubungannya <strong>dialektis</strong>, bukan struktural (atas-bawah yang subordinatif & reduktif)"],
        ["Formulasi dialektika", "Akal = <strong>subjek</strong> pemecah masalah; al-Qur’an = memberi <strong>wawasan moralitas</strong> → hubungan bersifat <strong>fungsional</strong>"]
      ],
      modes: [
        { label: "Arti “dialektis”", target: "row", row: 4, title: "Akal bekerja dengan semangat al-Qur’an", text: "Akal punya <strong>otonomi penuh</strong> untuk berpikir sistematis, sementara al-Qur’an menjadi <strong>landasan</strong> dan arah moralnya. Keduanya saling menguatkan, bukan saling meniadakan." },
        { label: "➕ Ulul Albab", target: "row", row: 1, title: "QS. Ali ‘Imran [3]: 190–191", text: "Orang yang berakal (<em>ulul albab</em>) digambarkan sebagai orang yang <strong>mengingat Allah</strong> (berdiri, duduk, berbaring) <strong>dan memikirkan</strong> penciptaan langit dan bumi. Inilah dalil “berpikir + berzikir”." }
      ]
    },
    {
      type: "flow",
      label: "Interaktif 5 • Konsep Manusia sebagai Wakil Allah",
      title: "Rumus Slide",
      items: ["Bayani", "+ Burhani", "+ Irfani", "= Wakil Allah di bumi"],
      highlight: 3,
      note: "<strong>Bayani</strong> = pendekatan teks (ulum al-Qur’an, ulum al-Hadis, ushul fiqh) • <strong>Burhani</strong> = ilmu sosial & kealaman (sains) • <strong>Irfani</strong> = hati & akal untuk mendekatkan diri kepada Allah.<br><strong>Konklusi tugas khalifah:</strong> <strong>memakmurkan, mendamaikan, mensejahterakan</strong> bumi."
    },
    {
      type: "ayat",
      label: "➕ Tambahan • Dua Tugas Manusia",
      title: "Hamba Allah (‘Abdullah) dan Khalifah",
      items: [
        { title: "Tugas ibadah", sumber: "QS. adz-Dzariyat [51]: 56", tone: "emerald",
          arab: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ إِلَّا لِيَعْبُدُونِ",
          arti: "Aku tidak menciptakan jin dan manusia melainkan agar mereka beribadah kepada-Ku.",
          note: "Bersama al-Baqarah 30 (khalifah), ayat ini membentuk dua peran manusia: <strong>‘abdullah</strong> (hamba yang beribadah) dan <strong>khalifatullah</strong> (pengelola bumi). Keduanya tidak dipisah: mengelola bumi dengan baik juga bernilai ibadah." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Siapa Tokohnya?",
      title: "Cocokkan Pandangan dengan Tokoh",
      headers: ["Pandangan", "Tokoh"],
      rows: [
        { cells: ["Hakikat manusia adalah jiwanya; unsur rohani yang membedakan manusia"], fields: [{ options: TOKOH, answer: "Imam al-Ghazali" }], ok: "✓" },
        { cells: ["Hidup manusia dijiwai prinsip dan nilai cinta"], fields: [{ options: TOKOH, answer: "Kahlil Gibran" }], ok: "✓" },
        { cells: ["Manusia makhluk paling mulia dan wakil Tuhan; keberadaannya buah kebebasan sebagai amanah"], fields: [{ options: TOKOH, answer: "Muhammad Iqbal" }], ok: "✓" },
        { cells: ["Merujuk QS. Shad [38]: 71–72 tentang unsur jasmani & rohani"], fields: [{ options: TOKOH, answer: "Imam al-Ghazali" }], ok: "✓" },
        { cells: ["Cinta diri → cinta sesama → cinta kepada Pencipta"], fields: [{ options: TOKOH, answer: "Kahlil Gibran" }], ok: "✓" },
        { cells: ["Mengkritik pemikir yang memandang manusia dari satu sisi saja"], fields: [{ options: TOKOH, answer: "Muhammad Iqbal" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Bayani, Burhani, Irfani",
      title: "Pendekatan Mana yang Dipakai?",
      headers: ["Kegiatan", "Pendekatan"],
      rows: [
        { cells: ["Mempelajari asbabun nuzul dan kaidah ushul fiqh untuk memahami ayat"], fields: [{ options: PEND, answer: "bayani" }], ok: "✓ Pendekatan teks." },
        { cells: ["Meneliti pengelolaan sampah kampus dengan data dan sains"], fields: [{ options: PEND, answer: "burhani" }], ok: "✓ Ilmu kealaman/sosial." },
        { cells: ["Merenungi ciptaan Allah sampai hati semakin dekat kepada-Nya"], fields: [{ options: PEND, answer: "irfani" }], ok: "✓ Hati & akal untuk taqarrub." },
        { cells: ["Memahami hadis dengan ilmu musthalah hadis"], fields: [{ options: PEND, answer: "bayani" }], ok: "✓" },
        { cells: ["Menggunakan ilmu ekonomi untuk menyejahterakan masyarakat"], fields: [{ options: PEND, answer: "burhani" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • Khalifah atau Perusak?",
      title: "Sikap Mana yang Sesuai Tugas Khalifah?",
      items: [
        { prompt: "Mahasiswa SI membuat aplikasi bank sampah untuk desanya", answer: "Sesuai ✅", reason: "Memakmurkan & mensejahterakan bumi dengan ilmu." },
        { prompt: "Perusahaan menebang hutan tanpa reboisasi demi untung besar", answer: "Menyalahi ❌", reason: "Merusak keseimbangan bumi, persis yang dikhawatirkan malaikat (al-Baqarah 30)." },
        { prompt: "“Hidup di dunia sementara, jadi tinggalkan saja urusan dunia”", answer: "Keliru ❌", reason: "Khalifah justru wajib mengelola dunia; akhirat diraih lewat amal di dunia." },
        { prompt: "Rajin belajar, santun, disiplin, dan aktif berorganisasi", answer: "Sesuai ✅", reason: "Bentuk nyata peran khalifah bagi mahasiswa." },
        { prompt: "Berebut harta, kedudukan, dan popularitas dengan cara apa pun", answer: "Menyalahi ❌", reason: "Keluar dari kodrat dan sisi kemanusiaan." }
      ]
    }
  ],
  flashcards: [
    { tag: "Tujuan", q: "Apa tujuan mengkaji hakikat manusia?", a: "Menjadi pedoman dasar berbuat sebagai wakil Allah di bumi (mengelola bumi demi kesejahteraan, kedamaian, keadilan), berlaku manusiawi, dan hidup terarah serta bermakna." },
    { tag: "Teori", q: "Sebutkan teori tentang hakikat manusia di slide.", a: "Liberalisme, materialisme, idealisme, eksistensialisme." },
    { tag: "Tokoh", q: "Pandangan Muhammad Iqbal?", a: "Manusia makhluk paling mulia dan wakil Tuhan di bumi; keberadaannya buah kebebasan sebagai amanah dari Tuhan." },
    { tag: "Tokoh", q: "Pandangan Kahlil Gibran?", a: "Manusia makhluk individu & sosial; hidupnya dijiwai nilai cinta: cinta diri → sesama → Pencipta." },
    { tag: "Tokoh", q: "Pandangan Imam al-Ghazali?", a: "Manusia terdiri dari jasmani & rohani (QS. Shad: 71–72); hakikat manusia adalah jiwanya (rohani)." },
    { tag: "Ayat", q: "Ayat tentang Adam sebagai khalifah?", a: "QS. al-Baqarah [2]: 30–33." },
    { tag: "Akal", q: "Apa arti menggunakan akal dalam Islam?", a: "Berpikir tentang ciptaan Allah (lahir kebudayaan & peradaban) dan berzikir tentang kekuasaan Allah (yang mutlak hanya Allah)." },
    { tag: "Akal", q: "Bagaimana hubungan akal dan al-Qur’an?", a: "Dialektis dan fungsional: akal sebagai subjek pemecah masalah, al-Qur’an memberi wawasan moral. Bukan hubungan struktural yang subordinatif." },
    { tag: "Rumus", q: "Rumus manusia sebagai wakil Allah?", a: "Bayani + Burhani + Irfani." },
    { tag: "Tugas", q: "Tugas manusia sebagai wakil Allah di bumi?", a: "Memakmurkan, mendamaikan, mensejahterakan bumi." },
    { tag: "➕ Ibadah", q: "Ayat tujuan penciptaan jin dan manusia?", a: "QS. adz-Dzariyat [51]: 56, untuk beribadah kepada Allah." }
  ],
  quiz: [
    { q: "Tugas manusia sebagai wakil Allah di bumi menurut slide adalah …", opts: ["Menguasai dan mengeksploitasi bumi", "Memakmurkan, mendamaikan, mensejahterakan bumi", "Meninggalkan urusan dunia", "Hanya beribadah di masjid"], ans: 1, exp: "Konklusi slide.", optExp: ["Bertentangan dengan amanah khalifah.", "Benar.", "Khalifah justru mengelola dunia.", "Terlalu sempit."] },
    { q: "Menurut Imam al-Ghazali, hakikat manusia adalah …", opts: ["Jasadnya", "Akalnya saja", "Jiwanya (unsur rohani)", "Hartanya"], ans: 2, exp: "Unsur rohani membedakan manusia dari makhluk lain.", optExp: ["Al-Ghazali menekankan rohani.", "Tidak disebut demikian.", "Benar.", "Bukan."] },
    { q: "Tokoh yang memandang hidup manusia dijiwai prinsip dan nilai-nilai cinta adalah …", opts: ["Muhammad Iqbal", "Kahlil Gibran", "Imam al-Ghazali", "Hasan al-Banna"], ans: 1, exp: "➕ Catatan: Gibran bukan Muslim, meski slide menaruhnya di daftar tokoh Muslim.", optExp: ["Iqbal: makhluk mulia & wakil Tuhan.", "Benar.", "Al-Ghazali: jiwa/rohani.", "Tidak dibahas di P1."] },
    { q: "Ayat yang menjadi dasar penciptaan Adam sebagai khalifah di bumi adalah …", opts: ["QS. al-Baqarah [2]: 30", "QS. al-Ikhlas [112]: 1", "QS. an-Nas [114]: 1", "QS. al-Kahfi [18]: 105"], ans: 0, exp: "“Inni ja‘ilun fil ardhi khalifah.”", optExp: ["Benar.", "Tentang keesaan Allah.", "Tentang berlindung kepada Allah.", "Tentang amal orang kafir."] },
    { q: "Keunggulan Adam atas malaikat dalam QS. al-Baqarah 31–33 ditunjukkan melalui …", opts: ["Kekuatan fisik", "Ilmu tentang nama-nama (al-asma’)", "Jumlah ibadahnya", "Usianya yang panjang"], ans: 1, exp: "Allah mengajarkan Adam nama-nama semuanya.", optExp: ["Tidak disebut.", "Benar.", "Malaikat justru selalu bertasbih.", "Tidak disebut."] },
    { q: "Menggunakan akal dalam Islam berarti …", opts: ["Berpikir bebas tanpa wahyu", "Berpikir dan berzikir", "Hanya menghafal teks", "Meragukan semua hal"], ans: 1, exp: "Berpikir tentang ciptaan, berzikir tentang kekuasaan Allah.", optExp: ["Itu liberalisme.", "Benar.", "Kurang lengkap.", "Bukan."] },
    { q: "Hubungan akal manusia dengan al-Qur’an menurut slide bersifat …", opts: ["Struktural dan subordinatif", "Dialektis dan fungsional", "Saling bertentangan", "Tidak berhubungan"], ans: 1, exp: "Akal memecahkan masalah, al-Qur’an memberi wawasan moral.", optExp: ["Ditolak slide karena reduktif.", "Benar.", "Bukan.", "Bukan."] },
    { q: "Pendekatan Burhani adalah pendekatan melalui …", opts: ["Ulum al-Qur’an dan ushul fiqh", "Ilmu sosial dan kealaman", "Hati untuk mendekat kepada Allah", "Tradisi nenek moyang"], ans: 1, exp: "Bayani = teks, Burhani = sains, Irfani = hati.", optExp: ["Itu Bayani.", "Benar.", "Itu Irfani.", "Bukan."] },
    { q: "Berikut teori tentang hakikat manusia yang disebut di slide, KECUALI …", opts: ["Liberalisme", "Materialisme", "Eksistensialisme", "Tauhid Rububiyah"], ans: 3, exp: "Rububiyah adalah pembagian tauhid (P5).", optExp: ["Disebut.", "Disebut.", "Disebut.", "Benar, bukan teori hakikat manusia."] },
    { q: "Sikap mahasiswa yang paling sesuai dengan peran khalifah adalah …", opts: ["Fokus menumpuk harta", "Santun, disiplin, rajin belajar, dan aktif berorganisasi", "Menjauhi semua kegiatan dunia", "Bebas berbuat tanpa batas"], ans: 1, exp: "Menggabungkan ilmu, akhlak, dan kontribusi sosial.", optExp: ["Menyalahi kodrat.", "Benar.", "Khalifah harus mengelola dunia.", "Bukan."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS AIK — PERTEMUAN 1*
📚 *Hakikat Manusia dalam Pandangan Islam*

1️⃣ Kajian sejak zaman Yunani (filosofis → multidisiplin). Teori: liberalisme, materialisme, idealisme, eksistensialisme.
2️⃣ Tujuan: pedoman berbuat sebagai wakil Allah (kesejahteraan, kedamaian, keadilan), manusiawi, hidup terarah & bermakna.
3️⃣ Tokoh: Iqbal (makhluk paling mulia, wakil Tuhan, kebebasan = amanah) • Kahlil Gibran (cinta; catatan: ia bukan Muslim) • al-Ghazali (jasmani + rohani, hakikat = jiwa; QS. Shad 71–72).
4️⃣ QS. al-Baqarah 30–33: Adam khalifah, diajari nama-nama → ilmu = keunggulan manusia.
5️⃣ Akal = pembeda manusia; berpikir + berzikir. Hubungan akal–Qur’an: dialektis & fungsional.
6️⃣ Bayani + Burhani + Irfani = wakil Allah. Tugas: memakmurkan, mendamaikan, mensejahterakan bumi.
➕ QS. adz-Dzariyat 56: manusia diciptakan untuk beribadah.`
};
