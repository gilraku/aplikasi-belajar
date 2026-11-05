// AIK — Pertemuan 6: Konsekuensi Syahadat (sumber: PDF "Konsekuensi Syahadat")
// Teks Arab ditulis ulang dari mushaf/lafaz standar (bukan salinan pdftotext), terjemahan mengikuti Terjemah Kemenag.
const BATAL = [{ value: "batal", label: "Membatalkan syahadat ❌" }, { value: "tidak", label: "Tidak membatalkan ✅" }];
const RUKUN = [{ value: "nafyu", label: "an-Nafyu (peniadaan)" }, { value: "itsbat", label: "al-Itsbat (penetapan)" }];

module.exports = {
  id: "p6",
  nomor: 6,
  judul: "Konsekuensi Dua Kalimat Syahadat",
  ujian: "UTS",
  hero: {
    badge: "Materi 6 • AIK",
    title: "Syahadat Bukan Sekadar Ucapan, Ada Konsekuensinya",
    text: "Pahami <strong>makna dan rukun</strong> kalimat syahadat pertama (<em>an-nafyu</em> & <em>al-itsbat</em>) dan kedua (<em>‘abduhu</em> & <em>rasuluhu</em>), <strong>konsekuensi</strong>, <strong>dampak</strong> dalam kehidupan, dan <strong>11 hal yang membatalkan</strong> dua kalimat syahadat."
  },
  cheatsheet: [
    {
      type: "ayat",
      label: "Interaktif 1 • Lafaz Dua Kalimat Syahadat",
      title: "Asyhadu an la ilaha illallah, wa asyhadu anna Muhammadan ‘abduhu wa rasuluh",
      items: [
        { title: "Syahadat pertama (tauhid)", sumber: "Lafaz syahadat", tone: "emerald",
          arab: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ",
          latin: "Asyhadu an lā ilāha illallāh",
          arti: "Aku bersaksi bahwa tidak ada tuhan (sesembahan) yang berhak disembah selain Allah." },
        { title: "Syahadat kedua (rasul)", sumber: "Lafaz syahadat", tone: "sky",
          arab: "وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
          latin: "Wa asyhadu anna Muḥammadan ‘abduhū wa rasūluh",
          arti: "Dan aku bersaksi bahwa Muhammad adalah hamba-Nya dan utusan-Nya." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 2 • Makna & Rukun Syahadat",
      title: "Dua Rukun di Setiap Kalimat",
      headers: ["Kalimat", "Rukun 1", "Rukun 2", "Makna"],
      rows: [
        ["Syahadat pertama", "<strong>an-Nafyu</strong> (peniadaan/pengosongan sesembahan) pada <em>lā ilāha</em>", "<strong>al-Itsbat</strong> (penetapan) pada <em>illallāh</em>", "Tidak ada sesembahan yang <strong>paling berhak/patut disembah</strong> kecuali Allah semata"],
        ["Syahadat kedua", "<em>‘abduhu</em> (hamba-Nya) → menolak <strong>al-ifrath</strong> (berlebih-lebihan)", "<em>wa rasuluhu</em> (utusan-Nya) → menolak <strong>at-tafrith</strong> (meremehkan)", "Muhammad manusia biasa tanpa sifat ketuhanan, <strong>tetapi</strong> utusan Allah yang diberi wahyu"]
      ],
      modes: [
        { label: "Logika nafyu-itsbat", target: "row", row: 0, title: "Kosongkan dulu, baru isi", text: "Seperti membersihkan gelas sebelum diisi air: semua sesembahan selain Allah <strong>ditiadakan</strong> (lā ilāha), lalu <strong>ditetapkan</strong> hanya Allah (illallāh)." },
        { label: "➕ Koreksi bacaan slide", target: "row", row: 1, title: "‘abduhu & rasuluhu MENOLAK, bukan bermakna", text: "Slide menulis lafaz ‘abduhu “bermakna al-ifrath” dan rasuluhu “bermakna at-tafrith”. Maksud sebenarnya: <strong>‘abduhu menolak sikap ifrath</strong> (mengkultuskan Nabi sampai dianggap punya sifat ketuhanan), dan <strong>rasuluhu menolak sikap tafrith</strong> (meremehkan Nabi seolah orang biasa yang ajarannya boleh diabaikan). Penjelasan lanjutan di slide sendiri sudah sesuai dengan makna ini." },
        { label: "➕ Hadis pendukung", target: "row", row: 1, title: "“Katakanlah: hamba Allah dan Rasul-Nya”", text: "Nabi saw. bersabda: “Janganlah kalian berlebihan memujiku sebagaimana kaum Nasrani berlebihan memuji (Isa) putra Maryam. Aku hanyalah hamba-Nya, maka katakanlah: hamba Allah dan Rasul-Nya.” (HR. al-Bukhari)" }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "callout",
          label: "Interaktif 3 • Konsekuensi",
          tone: "success",
          heading: "Inti dua kalimat syahadat",
          html: "Syahadat pertama → <strong>beribadah hanya kepada Allah semata</strong>.<br>Syahadat kedua → menjadikan <strong>Rasulullah saw. titik pusat keteladanan (uswah hasanah)</strong>, baik dalam <em>hablun minallah</em> (hubungan dengan Allah) maupun <em>hablun minannas</em> (hubungan dengan manusia)."
        },
        {
          type: "callout",
          label: "Dampak dalam Kehidupan",
          tone: "tip",
          heading: "Jika dipahami dengan benar …",
          html: "Syahadat memberi dampak positif besar: muncul sikap <strong>selalu berusaha taat kepada Allah</strong> dan <strong>selalu berusaha meneladani Rasulullah saw.</strong>"
        }
      ]
    },
    {
      type: "ayat",
      label: "➕ Tambahan • Ayat Pendukung",
      title: "Teladan Nabi & Tali yang Kokoh",
      items: [
        { title: "Uswah hasanah", sumber: "QS. al-Ahzab [33]: 21 (awal ayat)", tone: "sky",
          arab: "لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
          arti: "Sungguh, telah ada pada (diri) Rasulullah itu suri teladan yang baik bagimu." },
        { title: "Nafyu-itsbat dalam al-Qur’an", sumber: "QS. al-Baqarah [2]: 256 (sebagian)", tone: "emerald",
          arab: "فَمَنْ يَكْفُرْ بِالطَّاغُوتِ وَيُؤْمِنْ بِاللَّهِ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ",
          arti: "Barang siapa ingkar kepada Thagut dan beriman kepada Allah, maka sungguh, dia telah berpegang (teguh) pada tali yang sangat kuat.",
          note: "<strong>Ingkar kepada thagut</strong> = an-nafyu; <strong>beriman kepada Allah</strong> = al-itsbat. Persis struktur lā ilāha illallāh." }
      ]
    },
    {
      type: "list",
      label: "Interaktif 4 • Hal-hal yang Membatalkan Syahadat",
      title: "11 Pembatal (Hafalkan Polanya)",
      groups: [
        { title: "Terkait tauhid (hati & amal)", tone: "rose", ordered: true, items: [
          "Bertawakal bukan kepada Allah",
          "Tidak mengakui semua nikmat adalah karunia Allah",
          "Beramal dengan tujuan selain Allah",
          "Menjadikan kehidupan dunia segala-galanya",
          "Memungkiri salah satu asma, sifat, dan af’al Allah"
        ] },
        { title: "Terkait hukum & ketaatan", tone: "amber", ordered: true, items: [
          "Memberikan hak menghalalkan-mengharamkan, memerintah-melarang, dan menentukan syariat kepada selain Allah",
          "Taat secara mutlak kepada selain Allah dan Rasul-Nya",
          "Tidak menegakkan hukum Allah",
          "Membenci Islam, seluruh atau sebagiannya",
          "Memperolok-olok hukum dalam al-Qur’an dan as-Sunnah",
          "Menghalalkan yang haram dan mengharamkan yang halal"
        ] }
      ]
    },
    {
      type: "callout",
      label: "➕ Catatan Penting",
      tone: "warn",
      heading: "Jangan mudah memvonis orang lain",
      html: "Daftar ini untuk <strong>introspeksi diri</strong>. Menilai seseorang keluar dari Islam adalah perkara berat yang memerlukan ilmu dan pertimbangan ulama (ada syarat dan penghalangnya, misalnya karena tidak tahu atau terpaksa). Bagi kita, tugasnya adalah <strong>menjaga syahadat sendiri</strong> dan memperbaharui niat."
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Nafyu atau Itsbat?",
      title: "Bagian Syahadat Mana?",
      headers: ["Lafaz/sikap", "Rukun"],
      rows: [
        { cells: ["Lafaz “lā ilāha”"], fields: [{ options: RUKUN, answer: "nafyu" }], ok: "✓" },
        { cells: ["Lafaz “illallāh”"], fields: [{ options: RUKUN, answer: "itsbat" }], ok: "✓" },
        { cells: ["Membuang jimat dan tidak lagi percaya “penunggu”"], fields: [{ options: RUKUN, answer: "nafyu" }], ok: "✓ Meniadakan sesembahan selain Allah." },
        { cells: ["Menjadikan Allah satu-satunya tujuan ibadah"], fields: [{ options: RUKUN, answer: "itsbat" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Studi Kasus • Membatalkan Syahadat?",
      title: "Termasuk Pembatal Syahadat menurut Slide?",
      headers: ["Perilaku", "Penilaian"],
      rows: [
        { cells: ["Rajin bersedekah agar dipuji dan dipilih jadi ketua"], fields: [{ options: BATAL, answer: "batal" }], ok: "✓ Beramal untuk selain Allah (poin 3)." },
        { cells: ["Menyerahkan nasib sepenuhnya kepada jimat"], fields: [{ options: BATAL, answer: "batal" }], ok: "✓ Tawakal bukan kepada Allah (poin 1)." },
        { cells: ["Menertawakan hukum jilbab/zakat dalam al-Qur’an"], fields: [{ options: BATAL, answer: "batal" }], ok: "✓ Poin 9." },
        { cells: ["Berusaha keras belajar lalu bertawakal kepada Allah"], fields: [{ options: BATAL, answer: "tidak" }], ok: "✓ Justru buah syahadat." },
        { cells: ["“Riba itu halal kok, sama saja dengan jual beli”"], fields: [{ options: BATAL, answer: "batal" }], ok: "✓ Menghalalkan yang haram (poin 10)." },
        { cells: ["Menganggap semua kesuksesan murni hasil kehebatan diri, bukan karunia Allah"], fields: [{ options: BATAL, answer: "batal" }], ok: "✓ Poin 2." },
        { cells: ["Meneladani akhlak Nabi dalam berdagang online: jujur dan tidak menipu"], fields: [{ options: BATAL, answer: "tidak" }], ok: "✓ Konsekuensi syahadat kedua." },
        { cells: ["Taat mutlak kepada pimpinan meski diperintah bermaksiat"], fields: [{ options: BATAL, answer: "batal" }], ok: "✓ Poin 5." }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • Ifrath atau Tafrith?",
      title: "Sikap terhadap Nabi Muhammad saw.",
      items: [
        { prompt: "Berdoa meminta rezeki langsung kepada Nabi, bukan kepada Allah", answer: "Ifrath (berlebihan)", reason: "Menganggap Nabi punya sifat ketuhanan; ditolak oleh lafaz ‘abduhu." },
        { prompt: "“Hadis itu cuma omongan manusia biasa, tidak wajib diikuti.”", answer: "Tafrith (meremehkan)", reason: "Mengabaikan kerasulan; ditolak oleh lafaz rasuluhu." },
        { prompt: "Mencintai Nabi, mengikuti sunnahnya, dan tetap menyembah hanya Allah", answer: "Sikap yang benar", reason: "Hamba Allah sekaligus Rasul-Nya." }
      ]
    }
  ],
  flashcards: [
    { tag: "Lafaz", q: "Lafaz dua kalimat syahadat?", a: "Asyhadu an la ilaha illallah, wa asyhadu anna Muhammadan ‘abduhu wa rasuluh." },
    { tag: "Rukun", q: "Dua rukun syahadat pertama?", a: "an-Nafyu (peniadaan) pada “la ilaha” dan al-Itsbat (penetapan) pada “illallah”." },
    { tag: "Makna", q: "Makna syahadat pertama?", a: "Tidak ada tuhan/sesembahan yang paling berhak disembah kecuali Allah semata." },
    { tag: "Rukun", q: "Fungsi lafaz ‘abduhu?", a: "Menolak ifrath (berlebih-lebihan): Muhammad manusia, tidak punya sifat ketuhanan." },
    { tag: "Rukun", q: "Fungsi lafaz rasuluhu?", a: "Menolak tafrith (meremehkan): Muhammad utusan Allah yang menerima wahyu." },
    { tag: "Konsekuensi", q: "Inti syahadat pertama dan kedua?", a: "Pertama: beribadah hanya kepada Allah. Kedua: Rasulullah sebagai pusat keteladanan (uswah hasanah) dalam hablun minallah dan hablun minannas." },
    { tag: "Dampak", q: "Dampak syahadat yang dipahami benar?", a: "Selalu berusaha taat kepada Allah dan meneladani Rasulullah." },
    { tag: "Pembatal", q: "Sebutkan 5 pembatal syahadat pertama di slide.", a: "Tawakal bukan kepada Allah; tidak mengakui nikmat dari Allah; beramal untuk selain Allah; memberi hak membuat syariat kepada selain Allah; taat mutlak kepada selain Allah dan Rasul." },
    { tag: "Pembatal", q: "Sebutkan pembatal no. 6–11.", a: "Tidak menegakkan hukum Allah; membenci Islam; dunia segala-galanya; mengolok hukum Qur’an-Sunnah; menghalalkan yang haram & sebaliknya; memungkiri asma, sifat, af’al Allah." },
    { tag: "➕ Ayat", q: "Ayat uswah hasanah?", a: "QS. al-Ahzab [33]: 21." }
  ],
  quiz: [
    { q: "Rukun an-Nafyu dalam kalimat syahadat pertama terdapat pada lafaz …", opts: ["illallah", "la ilaha", "Muhammadan", "rasuluhu"], ans: 1, exp: "Peniadaan sesembahan.", optExp: ["Itu al-Itsbat.", "Benar.", "Syahadat kedua.", "Syahadat kedua."] },
    { q: "Makna kalimat “la ilaha illallah” yang benar adalah …", opts: ["Allah ada di mana-mana", "Tidak ada sesembahan yang paling berhak disembah kecuali Allah", "Semua tuhan sama", "Allah pencipta saja"], ans: 1, exp: "Makna menurut slide.", optExp: ["Bukan.", "Benar.", "Bertentangan.", "Baru Rububiyah."] },
    { q: "Lafaz ‘abduhu (hamba-Nya) pada syahadat kedua menegaskan bahwa Nabi Muhammad saw. …", opts: ["Memiliki sifat ketuhanan", "Manusia biasa yang tidak memiliki sifat ketuhanan", "Boleh disembah", "Tidak perlu diteladani"], ans: 1, exp: "Menolak ifrath (berlebihan).", optExp: ["Justru ditolak.", "Benar.", "Syirik.", "Itu tafrith."] },
    { q: "Sikap meremehkan Nabi seolah ajarannya boleh diabaikan disebut …", opts: ["Ifrath", "Tafrith", "Itsbat", "Tadhamun"], ans: 1, exp: "Ditolak oleh lafaz rasuluhu.", optExp: ["Berlebihan.", "Benar.", "Penetapan.", "Istilah tauhid (P5)."] },
    { q: "Inti syahadat kedua adalah …", opts: ["Beribadah hanya kepada Allah", "Menjadikan Rasulullah titik pusat keteladanan dalam hablun minallah dan hablun minannas", "Menghafal sirah Nabi", "Mengkultuskan Nabi"], ans: 1, exp: "Uswah hasanah.", optExp: ["Itu inti syahadat pertama.", "Benar.", "Kurang tepat.", "Ifrath."] },
    { q: "Dampak syahadat yang dipahami dengan benar adalah …", opts: ["Merasa paling benar dan mudah mengkafirkan", "Selalu berusaha taat kepada Allah dan meneladani Rasulullah", "Cukup mengucap tanpa mengamalkan", "Menjauhi masyarakat"], ans: 1, exp: "Kesimpulan slide.", optExp: ["Bukan.", "Benar.", "Bukan.", "Bukan."] },
    { q: "Berikut termasuk hal yang membatalkan syahadat menurut slide, KECUALI …", opts: ["Bertawakal bukan kepada Allah", "Beramal dengan tujuan selain Allah", "Berusaha maksimal lalu bertawakal kepada Allah", "Menghalalkan yang haram"], ans: 2, exp: "Ikhtiar + tawakal justru buah syahadat.", optExp: ["Pembatal no. 1.", "Pembatal no. 3.", "Benar, bukan pembatal.", "Pembatal no. 10."] },
    { q: "Menganggap kesuksesan murni karena kehebatan diri tanpa mengakui karunia Allah termasuk pembatal …", opts: ["Tidak mengakui semua nikmat adalah karunia Allah", "Membenci Islam", "Memperolok hukum Allah", "Tidak menegakkan hukum Allah"], ans: 0, exp: "Pembatal no. 2.", optExp: ["Benar.", "Bukan.", "Bukan.", "Bukan."] },
    { q: "Struktur nafyu–itsbat juga terlihat pada QS. al-Baqarah 256, yaitu …", opts: ["Shalat lalu puasa", "Ingkar kepada thagut lalu beriman kepada Allah", "Iman lalu ilmu", "Hijrah lalu jihad"], ans: 1, exp: "➕ Fa man yakfur bit-thaghut wa yu’min billah.", optExp: ["Bukan.", "Benar.", "Bukan.", "Bukan."] },
    { q: "Taat kepada atasan yang memerintahkan korupsi karena takut kehilangan jabatan termasuk …", opts: ["Bentuk profesionalisme", "Taat secara mutlak kepada selain Allah dan Rasul-Nya", "Mu’amalah yang dibolehkan", "Tauhid Mulkiyah"], ans: 1, exp: "Pembatal no. 5; tidak ada ketaatan kepada makhluk dalam bermaksiat kepada Allah.", optExp: ["Bukan.", "Benar.", "Bukan.", "Justru bertentangan."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS AIK — PERTEMUAN 6*
📚 *Konsekuensi Dua Kalimat Syahadat*

1️⃣ Syahadat 1: an-Nafyu (la ilaha) + al-Itsbat (illallah) → tidak ada sesembahan yang paling berhak disembah kecuali Allah.
2️⃣ Syahadat 2: ‘abduhu (menolak ifrath/berlebihan: Nabi bukan Tuhan) + rasuluhu (menolak tafrith/meremehkan: Nabi utusan yang menerima wahyu).
3️⃣ Konsekuensi: syahadat 1 = ibadah hanya kepada Allah; syahadat 2 = Rasulullah pusat keteladanan (hablun minallah & minannas).
4️⃣ Dampak: selalu berusaha taat kepada Allah & meneladani Rasul.
5️⃣ 11 pembatal: tawakal bukan kepada Allah • tak akui nikmat dari Allah • beramal untuk selain Allah • beri hak buat syariat kepada selain Allah • taat mutlak kepada selain Allah-Rasul • tak tegakkan hukum Allah • benci Islam • dunia segalanya • olok hukum Qur’an-Sunnah • halalkan yang haram & sebaliknya • ingkari asma, sifat, af’al Allah.
➕ al-Ahzab 21 (uswah hasanah) • al-Baqarah 256 (ingkar thagut + iman kepada Allah).`
};
