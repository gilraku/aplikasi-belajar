// AIK — Pertemuan 3: Aqidah Islam (sumber: PDF "Aqidah Islam")
// Teks Arab ditulis ulang dari mushaf/kitab standar (bukan salinan pdftotext), terjemahan mengikuti Terjemah Kemenag.
const DALIL = [{ value: "fitrah", label: "Dalil Fitrah" }, { value: "akal", label: "Dalil Akal (Aqli)" }, { value: "naqli", label: "Dalil Naqli (Nas)" }];
const ISTILAH = ["Iman", "Tauhid", "Ushuluddin", "Ilmu Kalam", "Fikih Akbar"];
const LINGKUP = [{ value: "ilahiyat", label: "Ilahiyat" }, { value: "nubuwat", label: "Nubuwat" }, { value: "ruhaniyat", label: "Ruhaniyat" }, { value: "samiyyat", label: "Sam’iyyat" }];
const SESUAI = [{ value: "sesuai", label: "Sesuai aqidah ✅" }, { value: "tidak", label: "Bertentangan ❌" }];

module.exports = {
  id: "p3",
  nomor: 3,
  judul: "Aqidah Islam: Konsep Keyakinan yang Rasional dan Humanis",
  ujian: "UTS",
  hero: {
    badge: "Materi 3 • AIK",
    title: "Aqidah: Ikatan Keyakinan yang Kokoh, Tanpa Ragu",
    text: "Pahami <strong>ta’rif aqidah</strong> (bahasa & istilah: Hasan al-Banna, Abu Bakar al-Jazairy), <strong>4 kata kunci</strong>, istilah lain (iman, tauhid, ushuluddin, ilmu kalam, fikih akbar), <strong>ruang lingkup</strong>, <strong>sumber & fungsi</strong>, kedudukan <strong>akal & hati</strong>, <strong>8 kaidah aqidah</strong>, dan <strong>3 dalil wujud Allah</strong>."
  },
  cheatsheet: [
    {
      type: "flow",
      label: "Interaktif 1 • Bangunan Islam",
      title: "Aqidah sebagai Fondasi",
      items: ["Aqidah (Rukun Iman)", "Syari’ah: Ibadah (Rukun Islam) & Mu’amalah", "Akhlak"],
      highlight: 0,
      note: "Aqidah adalah <strong>dasar/fondasi</strong> bangunan keislaman. Ibadah terbagi <strong>mahdhah & ghairu mahdhah</strong>; mu’amalah meliputi sosial, budaya, politik, ekonomi-keuangan, iptek; akhlak kepada Allah, Rasul, diri, orang tua, orang lain, dan alam. Aqidah yang kuat melahirkan ibadah tertib, akhlak mulia, dan mu’amalah yang baik."
    },
    {
      type: "table",
      label: "Interaktif 2 • Ta’rif (Definisi) Aqidah",
      title: "Bahasa & Istilah",
      headers: ["Sudut pandang", "Isi"],
      rows: [
        ["Bahasa", "<em>‘aqada – ya‘qidu – ‘aqdan – ‘aqidatan</em> ≈ <em>rabatha</em> (mengikat) = <strong>ikatan, simpul, perjanjian, kokoh</strong>"],
        ["Hasan al-Banna", "“Perkara-perkara yang <strong>wajib diyakini</strong> kebenarannya oleh hati, mendatangkan <strong>ketenteraman jiwa</strong>, dan menjadi keyakinan yang <strong>tidak bercampur sedikit pun dengan keraguan</strong>.”"],
        ["Abu Bakar Jabir al-Jazairy", "“Sejumlah kebenaran yang dapat diterima secara umum oleh manusia berdasarkan <strong>akal, wahyu, dan fitrah</strong>, terpatri dalam hati, diyakini kebenaran dan keberadaannya, dan <strong>menolak yang bertentangan</strong> dengannya.”"]
      ],
      modes: [
        { label: "Tebak tokohnya", target: "none", title: "Kata kunci pembeda", text: "Ada “<strong>ketenteraman jiwa & tanpa keraguan</strong>” → Hasan al-Banna. Ada “<strong>akal, wahyu (sam’u), fitrah</strong> & menolak yang bertentangan” → al-Jazairy." },
        { label: "➕ Teks Arab", target: "row", row: 2, title: "Kutipan al-Jazairy (Aqidatul Mukmin)", text: "الْعَقِيدَةُ هِيَ مَجْمُوعَةٌ مِنْ قَضَايَا الْحَقِّ الْبَدَهِيَّةِ الْمُسَلَّمَةِ بِالْعَقْلِ وَالسَّمْعِ وَالْفِطْرَةِ. Kata <em>as-sam’</em> (pendengaran) di sini maksudnya <strong>wahyu</strong>." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 3 • Kata Kunci Aqidah",
      title: "4 Kata Kunci",
      cols: 2,
      items: [
        { badge: "1", tone: "emerald", title: "Fitrah, akal-indera, wahyu", text: "<strong>Fitrah</strong> mengakui kebenaran • <strong>akal & indera</strong> mencari dan menguji kebenaran • <strong>wahyu</strong> menentukan mana yang baik dan buruk." },
        { badge: "2", tone: "sky", title: "Bulat tanpa keraguan", text: "Keyakinan harus bulat, tidak bercampur ragu." },
        { badge: "3", tone: "amber", title: "Menenteramkan jiwa", text: "Aqidah mendatangkan ketenteraman jiwa." },
        { badge: "4", tone: "rose", title: "Membuang yang bertentangan", text: "Contoh: sesajen untuk “penunggu”, minta tolong dukun, jimat → bertentangan, meski pelakunya rajin ibadah." }
      ]
    },
    {
      type: "row",
      cols: [3, 2],
      blocks: [
        {
          type: "table",
          label: "Interaktif 4 • Istilah Lain Aqidah",
          title: "5 Nama, Satu Pokok",
          headers: ["Istilah", "Arti bahasa", "Penjelasan"],
          rows: [
            ["Iman", "Meyakini", "Membenarkan dalam hati, mengikrarkan dengan lisan, mengamalkan dengan anggota badan"],
            ["Tauhid", "Mengesakan", "Kesadaran & keyakinan bahwa Allah itu Esa"],
            ["Ushuluddin", "Pokok agama", "Pokok-pokok ajaran agama"],
            ["Ilmu Kalam", "Firman, pembicaraan", "Ilmu yang membahas aqidah secara rasional beserta aliran-alirannya"],
            ["Fikih Akbar", "Pemahaman besar", "Dibedakan dari fikih yang mengkaji hukum syariat tertentu"]
          ]
        },
        {
          type: "list",
          label: "Ruang Lingkup",
          title: "4 Lingkup (≈ Rukun Iman)",
          groups: [{ ordered: true, tone: "indigo", items: [
            "<strong>Ilahiyat</strong>: tentang Allah (nama, sifat, af’al)",
            "<strong>Nubuwat</strong>: nabi, rasul, kitab, mukjizat",
            "<strong>Ruhaniyat</strong>: alam gaib (malaikat, jin, ruh)",
            "<strong>Sam’iyyat</strong>: yang hanya diketahui lewat wahyu (alam barzakh, akhirat, surga, neraka)"
          ] }]
        }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "callout",
          label: "Interaktif 5 • Sumber & Fungsi",
          tone: "success",
          heading: "Sumber: al-Qur’an + Sunnah",
          html: "<strong>Akal</strong> (beserta pengalaman dan intuisi) berfungsi sebagai <strong>sarana untuk memahami nash</strong>, bukan sumber utama.<br><strong>Fungsi aqidah:</strong> dasar/fondasi untuk mendirikan bangunan keislaman. ➕ Juga menjadi obat krisis spiritual manusia modern: hidup berakhlak dan dekat dengan Allah."
        },
        {
          type: "callout",
          label: "Akal & Hati dalam Bertauhid",
          tone: "tip",
          heading: "Akal ≠ otak; hati = pengendali",
          html: "<strong>Akal</strong> = daya berpikir dalam jiwa untuk memperoleh pengetahuan tentang Allah lewat ayat <strong>qauliyah</strong> (al-Qur’an) dan <strong>kauniyah</strong> (alam), lalu membandingkan keduanya.<br><strong>Hati (qalb)</strong> disebut <strong>144 kali</strong> dalam al-Qur’an; kedudukannya sebagai <strong>pengendali/kontrol</strong> atas keinginan dan nafsu agar tidak terjerumus ke syirik dan dosa."
        }
      ]
    },
    {
      type: "list",
      label: "Interaktif 6 • Kaidah-Kaidah Aqidah",
      title: "8 Kaidah (Wajib Paham, Sering Jadi Soal Studi Kasus)",
      groups: [{ ordered: true, tone: "emerald", items: [
        "Yang dijangkau indera diyakini adanya, kecuali akal mengatakan “tidak” berdasar pengalaman masa lalu (contoh: fatamorgana).",
        "<strong>Tidak ada hak memungkiri</strong> wujud sesuatu hanya karena tidak terjangkau indera.",
        "Seseorang hanya bisa mengkhayalkan sesuatu yang pernah dijangkau inderanya.",
        "Akal hanya bisa menjangkau hal-hal yang terikat <strong>ruang dan waktu</strong> (karena itu Dzat Allah tidak bisa dipikirkan).",
        "Keyakinan juga bisa diperoleh <strong>melalui berita</strong> dari pembawa berita yang diyakini <strong>kejujurannya</strong> (contoh: percaya malaikat karena kabar Nabi).",
        "Iman adalah <strong>fitrah</strong> setiap manusia.",
        "Kepuasan materiil di dunia <strong>sangat terbatas</strong>.",
        "Keyakinan tentang <strong>hari akhir</strong> adalah konsekuensi logis dari keyakinan adanya Allah."
      ] }]
    },
    {
      type: "table",
      label: "Interaktif 7 • Iman kepada Wujud Allah",
      title: "3 Dalil Wujud Allah",
      headers: ["Dalil", "Isi"],
      rows: [
        ["1. Fitrah", "Tidak ada manusia yang tidak bertuhan; yang ada hanyalah mempertuhankan sesuatu yang <strong>tidak layak</strong> dituhankan."],
        ["2. Akal (aqli)", "Merenungkan diri, alam semesta, dan fenomena alam → membuktikan adanya Tuhan (alam yang <strong>teratur, indah, rumit</strong> mustahil ada tanpa pencipta)."],
        ["3. Nas (naqli)", "Fitrah dan akal tidak mampu menjelaskan <strong>siapa</strong> Tuhan sebenarnya, maka tetap butuh <strong>bimbingan wahyu</strong>."]
      ],
      modes: [
        { label: "➕ Ayat fitrah", target: "row", row: 0, title: "QS. al-A’raf [7]: 172 & ar-Rum [30]: 30", text: "Sebelum lahir, ruh manusia telah bersaksi “<em>Alastu birabbikum? Qalu bala</em>” (Bukankah Aku Tuhanmu? Betul). Ar-Rum 30 menyebut agama tauhid sebagai <em>fitratallah</em>." },
        { label: "➕ Ayat akal", target: "row", row: 1, title: "QS. Ali ‘Imran [3]: 190", text: "“Sesungguhnya dalam penciptaan langit dan bumi, dan pergantian malam dan siang terdapat tanda-tanda (kebesaran Allah) bagi orang yang berakal.”" },
        { label: "➕ Pikirkan ciptaan, bukan Dzat", target: "none", title: "Jebakan soal", text: "Cara meyakini Allah yang tak terindera adalah <strong>memikirkan ciptaan-Nya</strong>, bukan memikirkan Dzat-Nya (akal hanya menjangkau yang terikat ruang-waktu). Juga keliru jika dikatakan “tidak perlu akal dalam beragama”." }
      ]
    },
    {
      type: "ayat",
      label: "➕ Tambahan • Ayat Pendukung",
      title: "Fitrah dan Akal Menuju Allah",
      items: [
        { title: "Agama tauhid sesuai fitrah", sumber: "QS. ar-Rum [30]: 30 (awal ayat)", tone: "emerald",
          arab: "فَأَقِمْ وَجْهَكَ لِلدِّينِ حَنِيفًا ۚ فِطْرَتَ اللَّهِ الَّتِي فَطَرَ النَّاسَ عَلَيْهَا",
          arti: "Maka hadapkanlah wajahmu dengan lurus kepada agama (Islam); (sesuai) fitrah Allah disebabkan Dia telah menciptakan manusia menurut (fitrah) itu." },
        { title: "Ulul albab memikirkan ciptaan", sumber: "QS. Ali ‘Imran [3]: 190", tone: "sky",
          arab: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ",
          arti: "Sesungguhnya dalam penciptaan langit dan bumi, dan pergantian malam dan siang terdapat tanda-tanda (kebesaran Allah) bagi orang yang berakal." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Dalil Wujud Allah",
      title: "Termasuk Dalil Apa?",
      headers: ["Argumen", "Jenis dalil"],
      rows: [
        { cells: ["Saat kapal hampir tenggelam, orang yang tak beragama pun spontan berdoa kepada “Tuhan”"], fields: [{ options: DALIL, answer: "fitrah" }], ok: "✓" },
        { cells: ["Smartphone saja ada pembuatnya, apalagi tubuh manusia yang jauh lebih rumit"], fields: [{ options: DALIL, answer: "akal" }], ok: "✓" },
        { cells: ["Mengenal nama dan sifat Allah dari QS. al-Ikhlas"], fields: [{ options: DALIL, answer: "naqli" }], ok: "✓" },
        { cells: ["Peredaran planet yang teratur menunjukkan ada Pengatur"], fields: [{ options: DALIL, answer: "akal" }], ok: "✓" },
        { cells: ["Setiap manusia pasti mempertuhankan sesuatu"], fields: [{ options: DALIL, answer: "fitrah" }], ok: "✓" },
        { cells: ["Tata cara menyembah Allah yang benar"], fields: [{ options: DALIL, answer: "naqli" }], ok: "✓ Hanya bisa diketahui dari wahyu." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Istilah & Ruang Lingkup",
      title: "Cocokkan",
      headers: ["Pernyataan", "Jawaban"],
      rows: [
        { cells: ["Istilah yang artinya “mengesakan”"], fields: [{ options: ISTILAH, answer: "Tauhid" }], ok: "✓" },
        { cells: ["Ilmu yang membahas aqidah secara rasional dan aliran-alirannya"], fields: [{ options: ISTILAH, answer: "Ilmu Kalam" }], ok: "✓" },
        { cells: ["Istilah yang artinya “pokok-pokok agama”"], fields: [{ options: ISTILAH, answer: "Ushuluddin" }], ok: "✓" },
        { cells: ["Membenarkan dalam hati, ikrar lisan, amal perbuatan"], fields: [{ options: ISTILAH, answer: "Iman" }], ok: "✓" },
        { cells: ["Pembahasan tentang surga dan neraka"], fields: [{ options: LINGKUP, answer: "samiyyat" }], ok: "✓" },
        { cells: ["Pembahasan tentang malaikat dan jin"], fields: [{ options: LINGKUP, answer: "ruhaniyat" }], ok: "✓" },
        { cells: ["Pembahasan tentang nabi dan kitab"], fields: [{ options: LINGKUP, answer: "nubuwat" }], ok: "✓" },
        { cells: ["Pembahasan tentang sifat-sifat Allah"], fields: [{ options: LINGKUP, answer: "ilahiyat" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Studi Kasus • Kaidah Aqidah dalam Kehidupan",
      title: "Sesuai Aqidah atau Bertentangan?",
      headers: ["Perilaku/pernyataan", "Penilaian"],
      rows: [
        { cells: ["Rajin shalat, tetapi tetap ikut memberi sesajen untuk “penunggu” desa"], fields: [{ options: SESUAI, answer: "tidak" }], ok: "✓ Kata kunci 4: buang yang bertentangan." },
        { cells: ["Meminta tolong dukun karena yakin hanya dukun yang bisa menyelesaikan masalah"], fields: [{ options: SESUAI, answer: "tidak" }], ok: "✓ Syirik." },
        { cells: ["Meyakini malaikat ada karena kabar Nabi, meski belum pernah melihatnya"], fields: [{ options: SESUAI, answer: "sesuai" }], ok: "✓ Kaidah berita orang jujur." },
        { cells: ["“Saya tidak percaya negara Jerman karena belum pernah ke sana”"], fields: [{ options: SESUAI, answer: "tidak" }], ok: "✓ Melanggar kaidah 2 & 5." },
        { cells: ["Hanya memohon perlindungan kepada Allah karena yakin hanya Dia pemberi manfaat dan mudarat"], fields: [{ options: SESUAI, answer: "sesuai" }], ok: "✓" },
        { cells: ["Ikut tradisi yang bertentangan dengan aqidah “demi bersosialisasi”"], fields: [{ options: SESUAI, answer: "tidak" }], ok: "✓ Mu’amalah tidak boleh menabrak aqidah." }
      ]
    }
  ],
  flashcards: [
    { tag: "Bahasa", q: "Arti aqidah secara bahasa?", a: "Dari ‘aqada (≈ rabatha): ikatan, simpul, perjanjian, kokoh." },
    { tag: "Definisi", q: "Definisi aqidah menurut Hasan al-Banna?", a: "Perkara yang wajib diyakini hati, mendatangkan ketenteraman jiwa, dan menjadi keyakinan tanpa keraguan sedikit pun." },
    { tag: "Definisi", q: "Definisi aqidah menurut Abu Bakar al-Jazairy?", a: "Sejumlah kebenaran yang diterima umum berdasarkan akal, wahyu, dan fitrah; terpatri di hati; menolak yang bertentangan." },
    { tag: "Kata kunci", q: "Peran fitrah, akal-indera, dan wahyu?", a: "Fitrah mengakui kebenaran; akal & indera mencari dan menguji; wahyu menentukan baik dan buruk." },
    { tag: "Istilah", q: "5 istilah lain untuk aqidah?", a: "Iman, Tauhid, Ushuluddin, Ilmu Kalam, Fikih Akbar." },
    { tag: "Lingkup", q: "4 ruang lingkup aqidah?", a: "Ilahiyat, Nubuwat, Ruhaniyat, Sam’iyyat." },
    { tag: "Sumber", q: "Sumber aqidah dan posisi akal?", a: "Al-Qur’an dan Sunnah; akal sebagai sarana memahami nash." },
    { tag: "Akal", q: "Apa itu akal dalam pengertian Islam?", a: "Bukan otak, melainkan daya berpikir dalam jiwa untuk memperoleh pengetahuan lewat ayat qauliyah dan kauniyah." },
    { tag: "Hati", q: "Kedudukan hati dalam bertauhid?", a: "Pengendali/kontrol atas keinginan dan nafsu agar tidak jatuh ke syirik dan dosa. Kata qalb disebut 144 kali dalam al-Qur’an." },
    { tag: "Kaidah", q: "Kaidah tentang berita?", a: "Keyakinan bisa diperoleh lewat berita dari orang yang diyakini kejujurannya." },
    { tag: "Kaidah", q: "Kenapa tidak boleh memikirkan Dzat Allah?", a: "Akal hanya menjangkau yang terikat ruang dan waktu. Pikirkan ciptaan-Nya." },
    { tag: "Dalil", q: "3 dalil wujud Allah?", a: "Fitrah, akal (aqli), nas (naqli)." },
    { tag: "Dalil", q: "Kenapa dalil naqli tetap perlu?", a: "Fitrah dan akal tidak mampu menjelaskan siapa Tuhan yang sebenarnya." }
  ],
  quiz: [
    { q: "Secara bahasa, aqidah berarti …", opts: ["Penyerahan diri", "Ikatan, simpul, perjanjian yang kokoh", "Mengesakan", "Pokok agama"], ans: 1, exp: "Dari ‘aqada ≈ rabatha.", optExp: ["Makna Islam.", "Benar.", "Makna tauhid.", "Makna ushuluddin."] },
    { q: "Definisi aqidah yang menekankan “ketenteraman jiwa dan tanpa keraguan” dikemukakan oleh …", opts: ["Abu Bakar Jabir al-Jazairy", "Hasan al-Banna", "Imam al-Ghazali", "Muhammad Iqbal"], ans: 1, exp: "Al-Jazairy menekankan akal, wahyu, fitrah.", optExp: ["Kata kunci beliau: akal, wahyu, fitrah.", "Benar.", "Tokoh P1.", "Tokoh P1."] },
    { q: "Menurut kata kunci aqidah, yang berfungsi menentukan mana yang baik dan buruk adalah …", opts: ["Fitrah", "Indera", "Wahyu", "Tradisi"], ans: 2, exp: "Fitrah mengakui, akal-indera menguji, wahyu menentukan.", optExp: ["Mengakui kebenaran.", "Mencari & menguji.", "Benar.", "Bukan."] },
    { q: "Ruang lingkup aqidah yang membahas surga, neraka, dan alam barzakh adalah …", opts: ["Ilahiyat", "Nubuwat", "Ruhaniyat", "Sam’iyyat"], ans: 3, exp: "Hanya bisa diketahui lewat wahyu (sam’).", optExp: ["Tentang Allah.", "Nabi & kitab.", "Malaikat, jin, ruh.", "Benar."] },
    { q: "Kedudukan akal dalam aqidah Islam adalah …", opts: ["Sumber utama di atas al-Qur’an", "Sarana untuk memahami nash al-Qur’an dan Sunnah", "Tidak diperlukan sama sekali", "Penentu baik dan buruk tanpa wahyu"], ans: 1, exp: "Sumber tetap al-Qur’an + Sunnah.", optExp: ["Keliru.", "Benar.", "Keliru, Islam agama rasional.", "Itu fungsi wahyu."] },
    { q: "Kedudukan hati dalam bertauhid adalah sebagai …", opts: ["Sumber hukum", "Pengendali keinginan dan nafsu agar tidak terjerumus syirik", "Pengganti akal", "Penentu wahyu"], ans: 1, exp: "Qalb disebut 144 kali dalam al-Qur’an.", optExp: ["Bukan.", "Benar.", "Bukan.", "Bukan."] },
    { q: "“Saya meyakini adanya malaikat karena Nabi Muhammad saw. mengabarkannya, walau saya belum pernah melihatnya.” Pernyataan ini sesuai kaidah …", opts: ["Yang terindera saja yang ada", "Keyakinan dapat diperoleh lewat berita orang yang diyakini jujur", "Akal menjangkau semua hal", "Kepuasan materi terbatas"], ans: 1, exp: "Kaidah ke-5.", optExp: ["Justru ditolak kaidah 2.", "Benar.", "Akal terbatas ruang-waktu.", "Kaidah lain."] },
    { q: "Cara yang benar meyakini wujud Allah yang tidak terjangkau panca indera adalah …", opts: ["Memikirkan Dzat Allah", "Memikirkan alam raya yang teratur dan rumit sebagai ciptaan-Nya", "Tidak perlu memakai akal", "Menunggu sampai bisa melihat-Nya"], ans: 1, exp: "Dalil aqli: pikirkan ciptaan, bukan Dzat.", optExp: ["Akal tidak menjangkau Dzat.", "Benar.", "Keliru.", "Keliru."] },
    { q: "Dalil yang menyatakan “tidak ada manusia yang tidak bertuhan” adalah dalil …", opts: ["Fitrah", "Aqli", "Naqli", "Ijma’"], ans: 0, exp: "Yang ada hanyalah mempertuhankan yang tidak layak.", optExp: ["Benar.", "Bukan.", "Bukan.", "Bukan."] },
    { q: "Perilaku berikut sesuai dengan aqidah Islam, yaitu …", opts: ["Rajin shalat tetapi tetap memberi sesajen", "Meminta pertolongan dukun saat terdesak", "Memohon perlindungan hanya kepada Allah karena hanya Dia pemberi manfaat dan mudarat", "Mengikuti tradisi yang bertentangan dengan aqidah demi bersosialisasi"], ans: 2, exp: "Opsi lain bertentangan dengan kata kunci ke-4.", optExp: ["Bertentangan.", "Syirik.", "Benar.", "Bertentangan."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS AIK — PERTEMUAN 3*
📚 *Aqidah Islam*

1️⃣ Bahasa: ‘aqada ≈ rabatha = ikatan, simpul, perjanjian, kokoh.
2️⃣ Hasan al-Banna: wajib diyakini hati, menenteramkan jiwa, tanpa ragu. Al-Jazairy: kebenaran berdasar akal, wahyu, fitrah; terpatri di hati; menolak yang bertentangan.
3️⃣ Kata kunci: fitrah mengakui • akal-indera menguji • wahyu menentukan baik-buruk; bulat tanpa ragu; menenteramkan; buang yang bertentangan.
4️⃣ Istilah lain: iman, tauhid, ushuluddin, ilmu kalam, fikih akbar. Lingkup: ilahiyat, nubuwat, ruhaniyat, sam’iyyat.
5️⃣ Sumber: Qur’an + Sunnah (akal = sarana). Fungsi: fondasi bangunan Islam. Akal = daya pikir (qauliyah & kauniyah). Hati = pengendali nafsu (qalb 144x).
6️⃣ 8 kaidah, terutama: jangan ingkari yang tak terindera • akal terbatas ruang-waktu • yakin lewat berita orang jujur • iman fitrah • hari akhir konsekuensi iman kepada Allah.
7️⃣ Dalil wujud Allah: fitrah • akal (alam teratur) • naqli (siapa Tuhan).`
};
