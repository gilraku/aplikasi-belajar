// AIK — Pertemuan 7: Hakikat Keimanan, Ibadah & Tugas Khalifah
// Teks Arab ditulis ulang dari mushaf standar (bukan hasil salin PDF), terjemahan mengikuti Terjemah Kemenag / slide.
const MH = { value: "mahdhah", label: "Ibadah Mahdhah" };
const GM = { value: "ghairu", label: "Ibadah Ghairu Mahdhah" };
const BID = { value: "bidah", label: "BID'AH (terlarang)" };
const BUKAN = { value: "bukan", label: "Bukan bid'ah (boleh)" };
const DALIL = ["an-Nisa: 36", "al-Baqarah: 186", "az-Zumar: 11", "Ali Imran: 31", "al-Qasas: 77", "al-Baqarah: 286"];
const RUB = { value: "rububiyah", label: "Rububiyah & Mulkiyah" };
const ASMA = { value: "asma", label: "Asma' wa Shifat" };

module.exports = {
  id: "p7",
  nomor: 7,
  judul: "Hakikat Keimanan, Ibadah & Tugas Khalifah",
  ujian: "UTS",
  hero: {
    badge: "Materi 7 • AIK",
    title: "Iman Butuh Bukti, Ibadah Butuh Ikhlas & Tuntunan",
    text: "Pahami <strong>rukun iman</strong>, <strong>perjalanan hidup manusia</strong>, <strong>makna & syarat ibadah</strong>, beda <strong>ibadah mahdhah vs ghairu mahdhah</strong>, <strong>6 prinsip ibadah</strong> beserta ayatnya, dan <strong>tugas manusia sebagai khalifah</strong>."
  },
  cheatsheet: [
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "list",
          label: "Interaktif 1 • Hakikat Keimanan",
          title: "Rukun Iman (6)",
          groups: [{ title: "Urutan wajib hafal", ordered: true, tone: "emerald", items: [
            "Iman kepada <strong>Allah</strong>",
            "Iman kepada para <strong>Malaikat</strong>",
            "Iman kepada <strong>Kitab-kitab</strong> Allah",
            "Iman kepada para <strong>Rasul</strong> Allah",
            "Iman kepada <strong>Hari Akhir</strong>",
            "Iman kepada <strong>Qadha dan Qadar</strong> Allah"
          ] }]
        },
        {
          type: "callout",
          label: "Karakteristik Orang Beriman",
          tone: "tip",
          heading: "Muhammad Abduh:",
          html: "<em>“Orang yang beriman adalah orang dengan kepercayaan yang sampai dapat <strong>menguasai kehendak atau keinginannya</strong>.”</em><br><br>Dalil rujukan: <strong>QS. al-‘Ankabut [29]: 1–4</strong>, iman pasti <strong>diuji</strong>.<br><br>💡 Slide: <strong>“Who is Allah? Tidak cukup yakin, keyakinan butuh bukti.”</strong>"
        }
      ]
    },
    {
      type: "ayat",
      label: "Ayat Pendukung",
      title: "Iman Pasti Diuji",
      items: [
        { title: "Ayat 2 dari rujukan al-‘Ankabut 1–4", sumber: "QS. al-‘Ankabut [29]: 2", tone: "sky",
          arab: "أَحَسِبَ النَّاسُ أَنْ يُتْرَكُوا أَنْ يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ",
          arti: "Apakah manusia mengira bahwa mereka akan dibiarkan (hanya dengan) mengatakan, “Kami telah beriman,” dan mereka tidak diuji?" }
      ]
    },
    {
      type: "flow",
      label: "Interaktif 2 • Hidup adalah Perjalanan",
      title: "Perjalanan Hidup Manusia Menuju Keabadian",
      desc: "Hidup adalah <strong>perjalanan menuju kematian</strong>, dan kematian adalah <strong>pintu menuju keabadian</strong>. Kita sekarang ada di tahap yang disorot:",
      items: ["Alam Ruh", "Alam Dunia", "Alam Kubur (Barzakh)", "Alam Akhirat", "Surga / Neraka"],
      highlight: 1,
      note: "Dunia adalah satu-satunya tahap untuk <strong>beramal</strong>; tahap sesudahnya adalah tempat menerima balasan."
    },
    {
      type: "row",
      cols: [3, 2],
      blocks: [
        {
          type: "ayat",
          title: "Manusia Tidak Diciptakan Main-Main",
          items: [
            { sumber: "QS. al-Mu’minun [23]: 115",
              arab: "أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَاكُمْ عَبَثًا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ",
              arti: "Maka apakah kamu mengira bahwa Kami menciptakan kamu main-main (tanpa ada maksud) dan bahwa kamu tidak akan dikembalikan kepada Kami?" }
          ]
        },
        {
          type: "callout",
          title: "Hidup Harus Bermakna",
          tone: "warn",
          heading: "Prof. Hamka:",
          html: "<em>“Kalau hidup sekadar hidup, kera di hutan juga hidup; kalau bekerja sekadar bekerja, babi di hutan juga bekerja.”</em><br><br>Artinya: yang membedakan manusia adalah <strong>tujuan</strong> hidupnya, yaitu <strong>ibadah</strong> kepada Allah."
        }
      ]
    },
    {
      type: "ayat",
      label: "Interaktif 3 • Makna Ibadah",
      title: "Ibadah Secara Etimologi & Terminologi",
      items: [
        { title: "Etimologi (bahasa)", sumber: "Asal kata", tone: "amber",
          arab: "عَبَدَ – يَعْبُدُ – عَبْدًا – عِبَادَةً",
          latin: "‘abada – ya‘budu – ‘abdan – ‘ibādatan",
          arti: "التَّذَلُّلُ وَالْخُضُوعُ وَالْاِنْقِيَادُ = <strong>merendahkan diri, tunduk, dan patuh</strong>." },
        { title: "Terminologi (istilah)", sumber: "Definisi masyhur Ibnu Taimiyah", tone: "emerald",
          arab: "الْعِبَادَةُ اسْمٌ جَامِعٌ لِكُلِّ مَا يُحِبُّهُ اللهُ وَيَرْضَاهُ مِنَ الْأَقْوَالِ وَالْأَعْمَالِ الظَّاهِرَةِ وَالْبَاطِنَةِ",
          arti: "Ibadah adalah <strong>nama yang mencakup segala sesuatu yang dicintai dan diridai Allah</strong>, baik berupa <strong>ucapan</strong> maupun <strong>perbuatan</strong>, yang <strong>lahir (tampak)</strong> maupun yang <strong>batin (tersembunyi)</strong>.",
          note: "Jadi ibadah bukan hanya shalat & puasa: ucapan baik, kerja halal, dan niat ikhlas di hati juga termasuk." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 4 • Syarat Diterimanya Ibadah",
      title: "2 Syarat, 2 Kalimat Syahadat",
      desc: "Ibadah diterima jika <strong>dua syarat</strong> ini terpenuhi sekaligus. Kurang satu saja, ibadah tertolak.",
      cols: 2,
      items: [
        { badge: "Syarat 1", tone: "amber", title: "Ikhlas karena Allah semata, bebas dari syirik besar dan kecil",
          text: "Konsekuensi dari syahadat <strong>Laa ilaaha illallah</strong> (<span>لَا إِلٰهَ إِلَّا اللهُ</span>). Menyangkut <strong>niat</strong> (untuk siapa)." },
        { badge: "Syarat 2", tone: "emerald", title: "Sesuai dengan tuntunan Rasul",
          text: "Konsekuensi dari syahadat <strong>Muhammad Rasulullah</strong> (<span>مُحَمَّدٌ رَسُولُ اللهِ</span>). Menyangkut <strong>cara</strong> (bagaimana)." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 5 • Pembagian Ibadah",
      title: "Saklar: Ibadah <strong>Mahdhah</strong> vs <strong>Ghairu Mahdhah</strong>",
      desc: "Klik saklar untuk membandingkan ciri-cirinya:",
      style: "toggle",
      options: [
        { label: "Ibadah Mahdhah", tone: "rose", badge: "Ibadah khusus", title: "“Semua dilarang, kecuali yang diperintahkan”",
          text: "<ul><li><strong>Langsung kepada Allah</strong></li><li>Pelaksanaannya <strong>telah diatur</strong></li><li>Harus <strong>sesuai contoh Rasulullah</strong></li><li>Contoh prinsip: shalat yang tidak diperintahkan hukumnya <strong>terlarang</strong> dilaksanakan</li><li>Penambahan & pengurangan = <strong>BID’AH</strong></li></ul>",
          note: "Misal: <strong>Thaharah, Shalat, Zakat, Puasa, Haji</strong>." },
        { label: "Ibadah Ghairu Mahdhah", tone: "emerald", badge: "Ibadah umum", title: "Aturannya longgar, hanya garis besar",
          text: "<ul><li>Ibadah <strong>umum</strong> di luar ibadah mahdhah</li><li>Aturan bersifat <strong>longgar dan global</strong> saja</li><li>Rasul mencontohkan yang umum, <strong>detailnya diserahkan kepada umat</strong> Islam</li><li>Penambahan & pengurangan <strong>BUKAN bid’ah</strong></li></ul>",
          note: "Misal: <strong>Birrul walidain</strong> (berbakti pada orang tua), <strong>menuntut ilmu</strong>, <strong>pemerintahan</strong>, dll." }
      ],
      footer: "🎯 Jebakan UTS: “bid’ah” hanya berlaku pada <strong>ibadah mahdhah</strong>. Kuliah online/PJJ atau kajian lewat Zoom bukan bid’ah, karena menuntut ilmu termasuk ghairu mahdhah."
    },
    {
      type: "tabs",
      label: "Interaktif 6 • Prinsip Ibadah",
      title: "6 Prinsip Ibadah Beserta Dalilnya",
      tabs: [
        { label: "1. Hanya Allah", blocks: [
          { type: "callout", tone: "tip", html: "<strong>Yang berhak disembah hanya Allah</strong> (lihat juga al-Fatihah: 1–5, “<em>iyyāka na‘budu</em>”)." },
          { type: "ayat", items: [{ sumber: "QS. an-Nisa’ [4]: 36",
            arab: "وَاعْبُدُوا اللهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا",
            arti: "Dan sembahlah Allah dan janganlah kamu mempersekutukan-Nya dengan sesuatu apa pun." }] }
        ] },
        { label: "2. Tanpa perantara", blocks: [
          { type: "callout", tone: "tip", html: "<strong>Ibadah tanpa perantara</strong>: Allah itu dekat, kita boleh berdoa langsung kepada-Nya." },
          { type: "ayat", items: [{ sumber: "QS. al-Baqarah [2]: 186",
            arab: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
            arti: "Dan apabila hamba-hamba-Ku bertanya kepadamu (Muhammad) tentang Aku, maka sesungguhnya Aku dekat. Aku kabulkan permohonan orang yang berdoa apabila dia berdoa kepada-Ku. Hendaklah mereka itu memenuhi (perintah)-Ku dan beriman kepada-Ku, agar mereka memperoleh kebenaran." }] }
        ] },
        { label: "3. Ikhlas", blocks: [
          { type: "callout", tone: "tip", html: "<strong>Ikhlas adalah syarat ibadah diterima.</strong>" },
          { type: "ayat", items: [{ sumber: "QS. az-Zumar [39]: 11",
            arab: "قُلْ إِنِّي أُمِرْتُ أَنْ أَعْبُدَ اللهَ مُخْلِصًا لَهُ الدِّينَ",
            arti: "Katakanlah, “Sesungguhnya aku diperintahkan agar menyembah Allah dengan ikhlas menaati-Nya dalam (menjalankan) agama.”" }] }
        ] },
        { label: "4. Sesuai tuntunan", blocks: [
          { type: "callout", tone: "tip", html: "<strong>Ibadah harus sesuai tuntunan</strong> Rasulullah ﷺ. Bukti cinta kepada Allah adalah mengikuti Rasul." },
          { type: "ayat", items: [{ sumber: "QS. Ali ‘Imran [3]: 31",
            arab: "قُلْ إِنْ كُنْتُمْ تُحِبُّونَ اللهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللهُ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ وَاللهُ غَفُورٌ رَحِيمٌ",
            arti: "Katakanlah (Muhammad), “Jika kamu mencintai Allah, ikutilah aku, niscaya Allah mencintaimu dan mengampuni dosa-dosamu.” Allah Maha Pengampun, Maha Penyayang." }] }
        ] },
        { label: "5. Seimbang", blocks: [
          { type: "callout", tone: "tip", html: "<strong>Memelihara keseimbangan ruhani dan jasmani</strong> (dunia & akhirat)." },
          { type: "ayat", items: [{ sumber: "QS. al-Qasas [28]: 77",
            arab: "وَابْتَغِ فِيمَا آتَاكَ اللهُ الدَّارَ الْآخِرَةَ وَلَا تَنْسَ نَصِيبَكَ مِنَ الدُّنْيَا وَأَحْسِنْ كَمَا أَحْسَنَ اللهُ إِلَيْكَ وَلَا تَبْغِ الْفَسَادَ فِي الْأَرْضِ إِنَّ اللهَ لَا يُحِبُّ الْمُفْسِدِينَ",
            arti: "Dan carilah (pahala) negeri akhirat dengan apa yang telah dianugerahkan Allah kepadamu, tetapi janganlah kamu lupakan bagianmu di dunia, dan berbuatbaiklah (kepada orang lain) sebagaimana Allah telah berbuat baik kepadamu, dan janganlah kamu berbuat kerusakan di bumi. Sungguh, Allah tidak menyukai orang yang berbuat kerusakan." }] }
        ] },
        { label: "6. Mudah", blocks: [
          { type: "callout", tone: "tip", html: "<strong>Ibadah itu mudah dan meringankan</strong>, tidak membebani di luar kemampuan. Dalilnya <strong>tiga ayat</strong>:" },
          { type: "ayat", items: [
            { sumber: "QS. al-Baqarah [2]: 286",
              arab: "لَا يُكَلِّفُ اللهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ",
              arti: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. Dia mendapat (pahala) dari (kebajikan) yang dikerjakannya dan dia mendapat (siksa) dari (kejahatan) yang diperbuatnya." },
            { sumber: "QS. al-Baqarah [2]: 185",
              arab: "يُرِيدُ اللهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ",
              arti: "Allah menghendaki kemudahan bagimu, dan tidak menghendaki kesukaran bagimu." },
            { sumber: "QS. al-Hajj [22]: 78",
              arab: "وَمَا جَعَلَ عَلَيْكُمْ فِي الدِّينِ مِنْ حَرَجٍ",
              arti: "…dan Dia tidak menjadikan kesukaran untukmu dalam agama." }
          ] }
        ] }
      ]
    },
    {
      type: "ayat",
      label: "Interaktif 7 • Setiap dari Kamu adalah Pemimpin",
      title: "Manusia sebagai Khalifah di Bumi",
      items: [
        { sumber: "QS. al-Baqarah [2]: 30", tone: "sky",
          arab: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
          arti: "Dan (ingatlah, wahai Muhammad) ketika Tuhanmu berfirman kepada para malaikat: “Sesungguhnya Aku hendak menjadikan seorang khalifah di muka bumi.”" },
        { title: "Tugas Khalifah 1: Ma’rifatullah (mengenal Allah)", sumber: "QS. ath-Thalaq [65]: 12", tone: "emerald",
          arab: "اللهُ الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ وَمِنَ الْأَرْضِ مِثْلَهُنَّ يَتَنَزَّلُ الْأَمْرُ بَيْنَهُنَّ لِتَعْلَمُوا أَنَّ اللهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ وَأَنَّ اللهَ قَدْ أَحَاطَ بِكُلِّ شَيْءٍ عِلْمًا",
          arti: "Allah-lah yang menciptakan tujuh langit dan seperti itu pula bumi. Perintah Allah berlaku padanya, <strong>agar kamu mengetahui</strong> bahwasanya Allah Mahakuasa atas segala sesuatu, dan sesungguhnya Allah ilmu-Nya benar-benar meliputi segala sesuatu.",
          note: "Kata kunci <strong>لِتَعْلَمُوا</strong> (<em>litaʿlamū</em> = agar kamu mengetahui): alam diciptakan supaya manusia <strong>mengenal Allah</strong>." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 8 • Cara Mengenal Allah",
      title: "Dua Jalan Ma’rifatullah di Materi Ini",
      style: "pills",
      options: [
        { label: "Rububiyah & Mulkiyah", tone: "sky", badge: "Allah sebagai Rabb & Raja", title: "Meyakini bahwa hanya Allah sajalah yang:",
          text: "<ul><li><strong>Menciptakan segala sesuatu</strong> (QS. az-Zumar: 62)</li><li><strong>Pemberi rezeki</strong> bagi setiap manusia, binatang, dan segala makhluk di dunia (QS. Hud: 6)</li><li><strong>Penguasa dan Pengatur alam semesta</strong>, Yang Maha Memuliakan dan Menghinakan, Yang Menghidupkan dan Mematikan, Penguasa segala sesuatu (QS. Ali ‘Imran: 26–27)</li></ul>",
          note: "Kata kunci: <strong>mencipta, memberi rezeki, mengatur, menguasai</strong>." },
        { label: "Asma’ wa Shifat", tone: "violet", badge: "Nama & sifat Allah", title: "Meyakini bahwa Allah memiliki nama-nama dan sifat-sifat (Asmaul Husna)",
          text: "Dalil: QS. al-A‘raf: 180, QS. al-Isra’: 110, QS. al-Hasyr: 23–24, dan masih banyak ayat lain (<span>وَالْآيَاتُ الْأُخْرَى وَهِيَ كَثِيرَةٌ</span>). Lihat ayatnya di bawah.",
          note: "Kata kunci: <strong>al-asmā’ al-ḥusnā</strong> (nama-nama yang terbaik)." }
      ]
    },
    {
      type: "ayat",
      title: "Dalil Tauhid Asma’ wa Shifat",
      items: [
        { sumber: "QS. al-A‘raf [7]: 180", tone: "violet",
          arab: "وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا",
          arti: "Dan Allah memiliki Asma’ul Husna (nama-nama yang terbaik), maka bermohonlah kepada-Nya dengan menyebutnya." },
        { sumber: "QS. al-Isra’ [17]: 110", tone: "violet",
          arab: "قُلِ ادْعُوا اللهَ أَوِ ادْعُوا الرَّحْمَٰنَ أَيًّا مَا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَىٰ",
          arti: "Katakanlah (Muhammad), “Serulah Allah atau serulah Ar-Rahman. Dengan nama mana saja kamu dapat menyeru, karena Dia mempunyai nama-nama yang terbaik (Asma’ul Husna).”" },
        { sumber: "QS. al-Hasyr [59]: 23–24", tone: "violet",
          arab: "هُوَ اللهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ سُبْحَانَ اللهِ عَمَّا يُشْرِكُونَ ۝ هُوَ اللهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ يُسَبِّحُ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ وَهُوَ الْعَزِيزُ الْحَكِيمُ",
          arti: "Dialah Allah, tidak ada tuhan selain Dia. Maharaja, Yang Mahasuci, Yang Mahasejahtera, Yang Menjaga Keamanan, Pemelihara Keselamatan, Yang Mahaperkasa, Yang Mahakuasa, Yang Memiliki Segala Keagungan. Mahasuci Allah dari apa yang mereka persekutukan. Dialah Allah Yang Menciptakan, Yang Mengadakan, Yang Membentuk Rupa, Dia memiliki nama-nama yang indah. Apa yang di langit dan di bumi bertasbih kepada-Nya. Dan Dialah Yang Mahaperkasa, Mahabijaksana." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Sortir Ibadah",
      title: "Mahdhah atau Ghairu Mahdhah?",
      desc: "Pilih jenis ibadah untuk setiap amalan, lalu klik <strong>Periksa</strong>.",
      headers: ["Amalan", "Jenis ibadah"],
      rows: [
        { cells: ["Shalat Subuh 2 rakaat"], fields: [{ options: [MH, GM], answer: "mahdhah" }], ok: "✓ Shalat: tata caranya sudah diatur & harus sesuai contoh Rasul." },
        { cells: ["Berbakti kepada orang tua (birrul walidain)"], fields: [{ options: [MH, GM], answer: "ghairu" }], ok: "✓ Contoh ghairu mahdhah yang disebut langsung di slide." },
        { cells: ["Berwudhu sebelum shalat (thaharah)"], fields: [{ options: [MH, GM], answer: "mahdhah" }], ok: "✓ Thaharah termasuk ibadah mahdhah." },
        { cells: ["Kuliah PJJ / menuntut ilmu"], fields: [{ options: [MH, GM], answer: "ghairu" }], ok: "✓ Menuntut ilmu: aturannya global, caranya diserahkan kepada umat." },
        { cells: ["Membayar zakat fitrah"], fields: [{ options: [MH, GM], answer: "mahdhah" }], ok: "✓ Zakat: kadar & waktunya sudah ditentukan." },
        { cells: ["Menjadi pejabat pemerintahan yang amanah"], fields: [{ options: [MH, GM], answer: "ghairu" }], ok: "✓ Pemerintahan disebut di slide sebagai ghairu mahdhah." },
        { cells: ["Puasa Ramadhan"], fields: [{ options: [MH, GM], answer: "mahdhah" }], ok: "✓ Puasa: waktu & syaratnya diatur syariat." },
        { cells: ["Menunaikan ibadah haji"], fields: [{ options: [MH, GM], answer: "mahdhah" }], ok: "✓ Haji: rukun & manasiknya sudah ditentukan." },
        { cells: ["Bekerja mencari nafkah halal untuk keluarga"], fields: [{ options: [MH, GM], answer: "ghairu" }], ok: "✓ Amal umum yang dicintai Allah (masuk definisi ibadah yang luas)." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Detektor Bid’ah",
      title: "Penambahan/Perubahan Ini Bid’ah atau Bukan?",
      desc: "Ingat aturannya: menambah/mengurangi <strong>ibadah mahdhah</strong> = bid’ah; menambah/mengubah cara <strong>ghairu mahdhah</strong> = bukan bid’ah.",
      headers: ["Kasus", "Status"],
      rows: [
        { cells: ["Shalat Maghrib sengaja dibuat 4 rakaat agar pahalanya lebih banyak"], fields: [{ options: [BID, BUKAN], answer: "bidah" }], ok: "✓ Shalat = mahdhah. Menambah rakaat = bid’ah." },
        { cells: ["Kajian ilmu agama lewat Zoom dan YouTube"], fields: [{ options: [BID, BUKAN], answer: "bukan" }], ok: "✓ Menuntut ilmu = ghairu mahdhah; medianya bebas." },
        { cells: ["Membasuh muka saat wudhu 7 kali karena merasa lebih bersih"], fields: [{ options: [BID, BUKAN], answer: "bidah" }], ok: "✓ Wudhu (thaharah) = mahdhah; menambah dari tuntunan = bid’ah." },
        { cells: ["Berbakti pada orang tua dengan mentransfer uang & video call rutin"], fields: [{ options: [BID, BUKAN], answer: "bukan" }], ok: "✓ Birrul walidain = ghairu mahdhah; caranya diserahkan kepada umat." },
        { cells: ["Membuat sistem e-government agar pelayanan rakyat cepat"], fields: [{ options: [BID, BUKAN], answer: "bukan" }], ok: "✓ Pemerintahan = ghairu mahdhah." },
        { cells: ["Membuat shalat khusus malam tertentu yang tidak pernah diperintahkan"], fields: [{ options: [BID, BUKAN], answer: "bidah" }], ok: "✓ Prinsip mahdhah: semua dilarang kecuali yang diperintahkan." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Cocokkan Dalil",
      title: "Prinsip Ibadah ↔ Ayatnya",
      desc: "Pilih ayat yang menjadi dalil utama tiap prinsip.",
      headers: ["Prinsip ibadah", "Dalil"],
      rows: [
        { cells: ["1. Yang berhak disembah hanya Allah"], fields: [{ options: DALIL, answer: "an-Nisa: 36" }], ok: "✓ “Wa‘budullāha wa lā tusyrikū bihī syai’ā” (juga al-Fatihah: 1–5)." },
        { cells: ["2. Ibadah tanpa perantara"], fields: [{ options: DALIL, answer: "al-Baqarah: 186" }], ok: "✓ “Fa innī qarīb”, Aku dekat." },
        { cells: ["3. Ikhlas syarat ibadah diterima"], fields: [{ options: DALIL, answer: "az-Zumar: 11" }], ok: "✓ “Mukhliṣan lahud-dīn”." },
        { cells: ["4. Ibadah sesuai tuntunan"], fields: [{ options: DALIL, answer: "Ali Imran: 31" }], ok: "✓ “Fattabi‘ūnī”, ikutilah aku (Rasul)." },
        { cells: ["5. Seimbang ruhani & jasmani"], fields: [{ options: DALIL, answer: "al-Qasas: 77" }], ok: "✓ “Wa lā tansa naṣībaka minad-dunyā”." },
        { cells: ["6. Mudah & meringankan"], fields: [{ options: DALIL, answer: "al-Baqarah: 286" }], ok: "✓ Juga al-Baqarah: 185 dan al-Hajj: 78." }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • Syarat Diterimanya Ibadah",
      title: "Ibadah Ini Diterima atau Tidak? Syarat Mana yang Gagal?",
      desc: "Pikirkan jawabanmu dulu, lalu klik untuk membuka pembahasan.",
      items: [
        { prompt: "Andi shalat dengan tata cara sempurna, tetapi tujuannya agar dipuji calon mertua.", answer: "Gagal syarat 1 (ikhlas)", reason: "Niatnya bukan karena Allah (riya’ = syirik kecil). Bertentangan dengan konsekuensi <strong>Laa ilaaha illallah</strong>." },
        { prompt: "Budi sangat ikhlas, tetapi shalat Subuhnya ia buat 3 rakaat supaya lebih afdal.", answer: "Gagal syarat 2 (sesuai tuntunan)", reason: "Ikhlas saja tidak cukup; cara ibadah mahdhah harus sesuai contoh Rasul (<strong>Muhammad Rasulullah</strong>). Penambahan = bid’ah." },
        { prompt: "Citra puasa Ramadhan sesuai sunnah dan hanya mengharap ridha Allah.", answer: "Memenuhi kedua syarat", reason: "Ikhlas ✓ dan sesuai tuntunan ✓ → ibadah diterima, insyaAllah." },
        { prompt: "Dodi bersedekah besar-besaran agar diunggah media dan dikenal dermawan.", answer: "Gagal syarat 1 (ikhlas)", reason: "Amal yang caranya benar tetap tertolak bila niatnya untuk makhluk." },
        { prompt: "Mengapa syarat ibadah dikaitkan dengan dua kalimat syahadat?", answer: "Ikhlas ↔ Laa ilaaha illallah; Tuntunan ↔ Muhammad Rasulullah", reason: "Syahadat pertama menetapkan <strong>kepada siapa</strong> kita beribadah; syahadat kedua menetapkan <strong>bagaimana</strong> caranya." },
        { prompt: "Eka berdoa melalui “perantara” orang yang sudah wafat agar doanya cepat dikabulkan.", answer: "Bertentangan dengan prinsip 2 (tanpa perantara)", reason: "QS. al-Baqarah: 186: Allah dekat dan mengabulkan doa orang yang berdoa langsung kepada-Nya." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 4 • Mengenal Allah",
      title: "Rububiyah & Mulkiyah atau Asma’ wa Shifat?",
      headers: ["Keyakinan", "Jenis tauhid"],
      rows: [
        { cells: ["Hanya Allah yang menciptakan segala sesuatu (az-Zumar: 62)"], fields: [{ options: [RUB, ASMA], answer: "rububiyah" }], ok: "✓ Mencipta = rububiyah." },
        { cells: ["Allah memiliki nama-nama terbaik, maka berdoalah dengannya (al-A‘raf: 180)"], fields: [{ options: [RUB, ASMA], answer: "asma" }], ok: "✓ Al-asmā’ al-ḥusnā = asma’ wa shifat." },
        { cells: ["Allah memberi rezeki seluruh makhluk di bumi (Hud: 6)"], fields: [{ options: [RUB, ASMA], answer: "rububiyah" }], ok: "✓ Memberi rezeki = rububiyah." },
        { cells: ["Allah yang memuliakan & menghinakan, menghidupkan & mematikan (Ali ‘Imran: 26–27)"], fields: [{ options: [RUB, ASMA], answer: "rububiyah" }], ok: "✓ Menguasai & mengatur = rububiyah & mulkiyah." },
        { cells: ["Allah adalah al-Malik, al-Quddus, as-Salam, … (al-Hasyr: 23–24)"], fields: [{ options: [RUB, ASMA], answer: "asma" }], ok: "✓ Menyebut nama & sifat Allah = asma’ wa shifat." },
        { cells: ["Serulah Allah atau ar-Rahman, Dia punya nama-nama terbaik (al-Isra’: 110)"], fields: [{ options: [RUB, ASMA], answer: "asma" }], ok: "✓ Asma’ wa shifat." }
      ]
    }
  ],
  flashcards: [
    { tag: "Iman", q: "Sebutkan 6 rukun iman secara berurutan!", a: "Iman kepada (1) Allah, (2) Malaikat, (3) Kitab-kitab, (4) Rasul, (5) Hari Akhir, (6) Qadha & Qadar." },
    { tag: "Iman", q: "Bagaimana Muhammad Abduh mendefinisikan orang beriman?", a: "Orang dengan kepercayaan yang sampai dapat <strong>menguasai kehendak atau keinginannya</strong> (rujukan QS. al-‘Ankabut: 1–4)." },
    { tag: "Hidup", q: "Urutkan perjalanan hidup manusia!", a: "Alam Ruh → Alam Dunia → Alam Kubur (Barzakh) → Alam Akhirat → Surga / Neraka." },
    { tag: "Ayat", q: "Ayat yang menegaskan manusia tidak diciptakan main-main?", a: "QS. al-Mu’minun: 115<br>أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَاكُمْ عَبَثًا" },
    { tag: "Ibadah", q: "Arti ibadah secara etimologi?", a: "Dari عَبَدَ – يَعْبُدُ – عِبَادَةً: <strong>merendahkan diri, tunduk, dan patuh</strong> (at-tadzallul, al-khudhu‘, al-inqiyad)." },
    { tag: "Ibadah", q: "Arti ibadah secara terminologi?", a: "Nama yang mencakup <strong>segala yang dicintai & diridai Allah</strong>, berupa ucapan dan perbuatan, yang lahir maupun batin." },
    { tag: "Syarat", q: "Apa 2 syarat diterimanya ibadah?", a: "(1) <strong>Ikhlas</strong> karena Allah, bebas syirik besar & kecil ← syahadat <em>Laa ilaaha illallah</em>.<br>(2) <strong>Sesuai tuntunan Rasul</strong> ← syahadat <em>Muhammad Rasulullah</em>." },
    { tag: "Mahdhah", q: "Ciri & prinsip ibadah mahdhah?", a: "Langsung kepada Allah, sudah diatur, harus sesuai contoh Rasul. Prinsip: <strong>“semua dilarang kecuali yang diperintahkan”</strong>. Tambah/kurang = bid’ah. Contoh: thaharah, shalat, zakat, puasa, haji." },
    { tag: "Ghairu", q: "Ciri ibadah ghairu mahdhah?", a: "Ibadah umum; aturannya longgar/global; Rasul mencontohkan yang umum, detail diserahkan ke umat; tambah/kurang <strong>bukan bid’ah</strong>. Contoh: birrul walidain, menuntut ilmu, pemerintahan." },
    { tag: "Prinsip", q: "Sebutkan 6 prinsip ibadah!", a: "1. Hanya Allah yang disembah (an-Nisa: 36)<br>2. Tanpa perantara (al-Baqarah: 186)<br>3. Ikhlas (az-Zumar: 11)<br>4. Sesuai tuntunan (Ali Imran: 31)<br>5. Seimbang ruhani-jasmani (al-Qasas: 77)<br>6. Mudah & meringankan (al-Baqarah: 286, 185; al-Hajj: 78)" },
    { tag: "Khalifah", q: "Dalil manusia sebagai khalifah dan tugas pertamanya?", a: "QS. al-Baqarah: 30 (“Aku hendak menjadikan khalifah di bumi”). Tugas 1: <strong>Ma’rifatullah</strong> (mengenal Allah), dalil QS. ath-Thalaq: 12, “<em>litaʿlamū</em>” = agar kamu mengetahui." },
    { tag: "Tauhid", q: "Beda Rububiyah & Mulkiyah dengan Asma’ wa Shifat?", a: "<strong>Rububiyah & Mulkiyah</strong>: yakin hanya Allah yang mencipta (az-Zumar: 62), memberi rezeki (Hud: 6), menguasai & mengatur (Ali ‘Imran: 26–27).<br><strong>Asma’ wa Shifat</strong>: yakin Allah punya nama & sifat terbaik (al-A‘raf: 180, al-Isra’: 110, al-Hasyr: 23–24)." }
  ],
  quiz: [
    { q: "Urutan rukun iman yang benar adalah …",
      opts: ["Allah – Rasul – Malaikat – Kitab – Hari Akhir – Qadha & Qadar", "Allah – Malaikat – Kitab – Rasul – Hari Akhir – Qadha & Qadar", "Allah – Kitab – Malaikat – Rasul – Qadha & Qadar – Hari Akhir", "Allah – Malaikat – Rasul – Kitab – Hari Akhir – Qadha & Qadar"], ans: 1,
      exp: "Urutannya: Allah, Malaikat, Kitab-kitab, Rasul, Hari Akhir, Qadha & Qadar.",
      optExp: ["Rasul tidak berada di urutan ke-2.", "Benar.", "Kitab di urutan ke-3 setelah Malaikat, dan Hari Akhir sebelum Qadha & Qadar.", "Jebakan: Kitab (ke-3) mendahului Rasul (ke-4)."] },
    { q: "Menurut Muhammad Abduh, orang beriman adalah orang yang kepercayaannya …",
      opts: ["Hanya diucapkan dengan lisan", "Sampai dapat menguasai kehendak atau keinginannya", "Diwarisi dari orang tua", "Tidak pernah diuji"], ans: 1,
      exp: "Abduh: iman sejati menguasai kehendak/keinginan. QS. al-‘Ankabut 1–4 justru menegaskan orang beriman pasti diuji.",
      optExp: ["Iman tidak cukup di lisan.", "Benar.", "Tidak disebut dalam definisi.", "Jebakan: al-‘Ankabut 2 justru menyatakan orang beriman akan diuji."] },
    { q: "Tahap perjalanan hidup manusia setelah alam dunia adalah …",
      opts: ["Alam ruh", "Alam akhirat", "Alam kubur (barzakh)", "Surga atau neraka"], ans: 2,
      exp: "Alam Ruh → Dunia → Kubur (Barzakh) → Akhirat → Surga/Neraka.",
      optExp: ["Alam ruh ada sebelum dunia.", "Akhirat datang setelah barzakh.", "Benar.", "Surga/neraka adalah tujuan akhir."] },
    { q: "Secara etimologi, ibadah berasal dari kata عَبَدَ yang bermakna …",
      opts: ["Merendahkan diri, tunduk, dan patuh", "Segala yang dicintai dan diridai Allah", "Mengenal Allah", "Mengikuti tuntunan Rasul"], ans: 0,
      exp: "Etimologi: at-tadzallul wal-khudhu‘ wal-inqiyad = merendahkan diri, tunduk, patuh.",
      optExp: ["Benar.", "Jebakan: ini definisi terminologi, bukan etimologi.", "Itu makna ma’rifatullah.", "Itu salah satu syarat ibadah diterima."] },
    { q: "Syarat ibadah “sesuai dengan tuntunan Rasul” merupakan konsekuensi dari …",
      opts: ["Syahadat Laa ilaaha illallah", "Iman kepada malaikat", "Syahadat Muhammad Rasulullah", "Prinsip keseimbangan dunia-akhirat"], ans: 2,
      exp: "Ikhlas ← Laa ilaaha illallah; sesuai tuntunan ← Muhammad Rasulullah.",
      optExp: ["Itu dasar syarat ikhlas.", "Tidak terkait langsung.", "Benar.", "Itu prinsip ibadah ke-5, bukan syarat."] },
    { q: "Seseorang shalat sesuai tuntunan, tetapi berniat supaya dipuji atasannya. Ibadahnya …",
      opts: ["Diterima karena tata caranya benar", "Tidak memenuhi syarat ikhlas", "Tidak memenuhi syarat sesuai tuntunan", "Termasuk ibadah ghairu mahdhah"], ans: 1,
      exp: "Riya’ termasuk syirik kecil; syarat 1 (ikhlas, bebas syirik besar & kecil) gagal.",
      optExp: ["Cara benar saja tidak cukup; kedua syarat harus terpenuhi.", "Benar.", "Tata caranya justru sudah sesuai.", "Shalat adalah ibadah mahdhah."] },
    { q: "Pernyataan berikut yang BENAR tentang ibadah mahdhah adalah …",
      opts: ["Prinsipnya: semua boleh kecuali yang dilarang", "Detailnya diserahkan kepada umat Islam", "Penambahan dan pengurangannya bukan bid’ah", "Prinsipnya: semua dilarang kecuali yang diperintahkan"], ans: 3,
      exp: "Mahdhah: langsung kepada Allah, sudah diatur, sesuai contoh Rasul; semua dilarang kecuali yang diperintahkan.",
      optExp: ["Jebakan: kaidah itu kebalikannya.", "Itu ciri ghairu mahdhah.", "Itu ciri ghairu mahdhah; pada mahdhah justru bid’ah.", "Benar."] },
    { q: "Manakah yang termasuk ibadah ghairu mahdhah?",
      opts: ["Thaharah", "Zakat", "Birrul walidain", "Haji"], ans: 2,
      exp: "Contoh ghairu mahdhah di slide: birrul walidain, menuntut ilmu, pemerintahan.",
      optExp: ["Thaharah = mahdhah.", "Zakat = mahdhah.", "Benar.", "Haji = mahdhah."] },
    { q: "Prinsip “ibadah tanpa perantara” didasarkan pada …",
      opts: ["QS. al-Baqarah: 186", "QS. az-Zumar: 11", "QS. al-Qasas: 77", "QS. an-Nisa: 36"], ans: 0,
      exp: "Al-Baqarah 186: “Aku dekat, Aku kabulkan doa orang yang berdoa kepada-Ku.”",
      optExp: ["Benar.", "Dalil ikhlas.", "Dalil keseimbangan ruhani-jasmani.", "Dalil hanya Allah yang disembah."] },
    { q: "Meyakini bahwa hanya Allah yang menciptakan, memberi rezeki, dan mengatur alam semesta disebut …",
      opts: ["Tauhid Asma’ wa Shifat", "Tauhid Rububiyah & Mulkiyah", "Ibadah ghairu mahdhah", "Prinsip ibadah mudah"], ans: 1,
      exp: "Rububiyah & Mulkiyah (az-Zumar: 62, Hud: 6, Ali ‘Imran: 26–27).",
      optExp: ["Asma’ wa shifat menyangkut nama & sifat Allah.", "Benar.", "Bukan jenis tauhid.", "Bukan jenis tauhid."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS AIK — PERTEMUAN 7*
📚 *Hakikat Keimanan, Ibadah & Tugas Khalifah*

1️⃣ *Iman:*
• Rukun iman: Allah, Malaikat, Kitab, Rasul, Hari Akhir, Qadha & Qadar.
• Muhammad Abduh: orang beriman = kepercayaannya menguasai kehendak/keinginannya (al-‘Ankabut 1–4: iman pasti diuji).
• Keyakinan butuh bukti.

2️⃣ *Perjalanan hidup:* Alam Ruh → Dunia → Kubur (Barzakh) → Akhirat → Surga/Neraka.
• QS. al-Mu’minun 115: manusia tidak diciptakan main-main.
• Hamka: "Kalau hidup sekadar hidup, kera di hutan juga hidup…"

3️⃣ *Makna ibadah:*
• Etimologi: tunduk, patuh, merendahkan diri.
• Terminologi: segala yang dicintai & diridai Allah, ucapan & perbuatan, lahir & batin.

4️⃣ *Syarat diterima:* (1) Ikhlas, bebas syirik ← Laa ilaaha illallah; (2) Sesuai tuntunan Rasul ← Muhammad Rasulullah.

5️⃣ *Pembagian:*
• Mahdhah: langsung ke Allah, sudah diatur, semua dilarang kecuali yang diperintahkan, tambah/kurang = bid'ah (thaharah, shalat, zakat, puasa, haji).
• Ghairu mahdhah: umum, aturan global, tambah/kurang bukan bid'ah (birrul walidain, menuntut ilmu, pemerintahan).

6️⃣ *Prinsip ibadah:* hanya Allah (an-Nisa 36) • tanpa perantara (al-Baqarah 186) • ikhlas (az-Zumar 11) • sesuai tuntunan (Ali Imran 31) • seimbang (al-Qasas 77) • mudah (al-Baqarah 286 & 185, al-Hajj 78).

7️⃣ *Khalifah (al-Baqarah 30):* tugas 1 Ma'rifatullah (ath-Thalaq 12 "agar kamu mengetahui").
• Rububiyah & Mulkiyah: mencipta (az-Zumar 62), memberi rezeki (Hud 6), menguasai (Ali Imran 26–27).
• Asma' wa Shifat: al-A'raf 180, al-Isra' 110, al-Hasyr 23–24.`
};
