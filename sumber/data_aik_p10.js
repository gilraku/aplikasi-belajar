// AIK — Pertemuan 10: Liberalisasi Pemikiran Islam & Pluralisme Agama
// Sumber: PDF "Konsep_baik_Buruk_10" (24 slide). Nama berkasnya "Konsep Baik Buruk", tetapi seluruh isinya membahas
// liberalisasi pemikiran Islam dan pluralisme agama, jadi judul pertemuan mengikuti isi.
// Pandangan yang disajikan adalah pandangan modul; tambahan (➕) memakai fatwa MUI 2005 dan ayat yang masyhur.
const ayat = require("./ayat_aik_uas.js");
const PP = [{ value: "pluralitas", label: "Pluralitas (fakta keragaman) ✅" }, { value: "pluralisme", label: "Pluralisme agama (paham) ❌" }];
const IE = [{ value: "internal", label: "Internal" }, { value: "eksternal", label: "Eksternal" }];

module.exports = {
  id: "p10",
  nomor: 10,
  judul: "Liberalisasi Pemikiran Islam & Pluralisme Agama",
  ujian: "UAS",
  hero: {
    badge: "Materi 10 • AIK",
    title: "Toleran terhadap Keragaman, Tegas dalam Keyakinan",
    text: "Kenali <strong>problematika umat</strong> (internal & eksternal), <strong>4 bentuk liberalisasi pemikiran Islam</strong>, arti <strong>pluralisme agama</strong> dan tokohnya, serta <strong>implikasinya</strong>: relativisme, klaim keselamatan, nikah beda agama, doa bersama, dan dialog teologis. Bedakan <strong>pluralitas</strong> (fakta yang diterima) dari <strong>pluralisme</strong> (paham yang ditolak)."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • Problematika & Tantangan Umat",
      title: "Masalah dari Dalam vs dari Luar",
      headers: ["Internal (dari dalam umat)", "Eksternal (dari luar)"],
      rows: [
        ["Taqlid a’ma (ikut-ikutan buta)", "Westernisasi / modernisasi"],
        ["Bid’ah dan khurafat", "Liberalisme, pluralisme"],
        ["Kejumudan berpikir", "Sekularisme, rasionalisme"],
        ["Perpecahan, kebodohan", "Feminisme, materialisme"],
        ["Problem ilmu pengetahuan, pendidikan Islam (pesantren, madrasah, PT), persatuan, sistemik", "dll."]
      ],
      modes: [
        { label: "Arti istilah internal", target: "col", col: 0, title: "Istilah di kolom kiri", text: "<strong>Taqlid a’ma</strong>: mengikuti pendapat tanpa tahu dalilnya sama sekali (a’ma = buta). <strong>Bid’ah</strong>: menambah-nambah ibadah mahdhah tanpa tuntunan. <strong>Khurafat</strong>: kepercayaan takhayul tanpa dasar. <strong>Jumud</strong>: beku, menolak berpikir dan pembaruan." },
        { label: "Arti istilah eksternal", target: "col", col: 1, title: "Istilah di kolom kanan", text: "<strong>Sekularisme</strong>: memisahkan agama dari urusan publik. <strong>Liberalisme</strong> (dalam agama): menafsirkan agama sebebas-bebasnya, lepas dari kaidah. <strong>Rasionalisme</strong>: akal dijadikan hakim tertinggi di atas wahyu. <strong>Materialisme</strong>: menganggap hanya materi yang nyata dan bernilai." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 2 • Liberalisasi Pemikiran",
      title: "4 Bentuk → Kerancuan Pemahaman Islam",
      cols: 2,
      items: [
        { badge: "1", tone: "rose", title: "Pluralisme agama", text: "Semua agama dianggap sama benar. Menyerang <strong>aqidah</strong>." },
        { badge: "2", tone: "amber", title: "Relativisme kebenaran", text: "Tidak ada kebenaran mutlak; semua tergantung sudut pandang." },
        { badge: "3", tone: "violet", title: "Kritik otentisitas al-Qur’an", text: "Meragukan keaslian al-Qur’an sebagai wahyu yang terjaga." },
        { badge: "4", tone: "sky", title: "Dekonstruksi syari’ah", text: "Membongkar hukum Islam yang sudah tetap. Menyerang <strong>syari’ah</strong> dan <strong>akhlak</strong>." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Definisi",
      title: "Pluralisme Agama Menurut Modul",
      headers: ["Aspek", "Isi"],
      rows: [
        ["Definisi 1", "Semua kebenaran bersifat <strong>relatif</strong> dan semua mempunyai <strong>nilai yang sama</strong> (<em>no view is true, or all views are equally true</em>)"],
        ["Definisi 2", "Paham atau cara pandang terhadap pluralitas agama yang memandang <strong>semua agama sebanding atau setara</strong>"],
        ["Sumber definisi", "Lorens Bagus (<em>Kamus Filsafat</em>) & Simon Blackburn (<em>Oxford Dictionary of Philosophy</em>)"],
        ["Tiga ciri cara pandang", "<strong>No truth claim</strong> (tak boleh mengklaim paling benar) • agama = <strong>respon manusia</strong> • <strong>relatif</strong>"],
        ["Kesimpulannya", "“Agama = relatif”: tidak boleh mengklaim satu agama lebih baik; semua agama sama-sama jalan menuju keselamatan"]
      ],
      modes: [
        { label: "Pertanyaan kunci modul", target: "row", row: 4, title: "Mungkinkah menyamakan agama?", text: "Modul bertanya: mungkinkah menyamakan agama-agama, sementara ada <strong>perbedaan mendasar</strong> antara satu agama dan lainnya (konsep Tuhan, sumber ajaran, jalan keselamatan)?" }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Tokoh",
      title: "Siapa Mengatakan Apa?",
      headers: ["Tokoh", "Gagasan / kutipan yang dibahas modul"],
      rows: [
        ["<strong>John Hick</strong> (1922–2012)", "<em>God Has Many Names</em>: Tuhan punya banyak nama; gagasan <strong>Global Teologi</strong>"],
        ["<strong>Frithjof Schuon</strong> (1907–1998)", "<em>Transcendent Unity of Religions</em> (kesatuan transenden agama-agama): “the same truth hidden in all the forms”. Agama sama di dimensi <strong>esoteris</strong> (batin), berbeda di dimensi <strong>eksoteris</strong> (lahir)"],
        ["<strong>Samuel Zwemer</strong> (Konferensi Misionaris 1935)", "Misi utamanya bukan menghancurkan umat Islam, tetapi <strong>memisahkan mereka dari Islam</strong> agar menjadi muslim yang tidak berakhlak"],
        ["<strong>Henry Martyn</strong> (1781–1812)", "“Datang menemui umat Islam bukan dengan senjata tetapi dengan kata-kata, akal sehat, dan cinta”"]
      ],
      modes: [
        { label: "Esoteris vs eksoteris", target: "row", row: 1, title: "Dua istilah Schuon", text: "<strong>Eksoteris</strong> = aspek lahir: syariat, ritual, simbol (berbeda-beda). <strong>Esoteris</strong> = aspek batin/metafisis yang diklaim sama di semua agama. Inilah dasar klaim “semua agama sama di intinya”." },
        { label: "Pelajaran", target: "row", row: 2, title: "Kenapa kutipan ini dibahas?", text: "Modul memakainya untuk menunjukkan bahwa ancaman bagi umat bukan hanya fisik, tetapi pemikiran: menjauhkan muslim dari ajaran dan akhlaknya." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 5 • Implikasi",
      title: "Dampak Pluralisme Agama Menurut Modul",
      headers: ["Implikasi", "Isinya", "Akibatnya"],
      rows: [
        ["Relativisme & inklusivisme teologis", "Anti-absolut: umat diajak tidak meyakini kebenaran agamanya secara mutlak", "Islam tidak lagi diyakini mutlak benar"],
        ["Klaim keselamatan agama lain", "Keselamatan bukan hanya milik Islam; agama lain juga selamat", "Bingung, tak ada beda muslim dan non-muslim dalam kebenaran"],
        ["Nikah beda agama", "Dianggap sah karena pasangan “tak mungkin dibatasi sekat agama”", "Tidak ada titik temu dalam ibadah sehari-hari"],
        ["Doa antaragama", "Doa bersama dianggap tak masalah karena Tuhan dianggap sama", "Umat bingung kepada Tuhan yang mana doa dipanjatkan"],
        ["Dialog teologis", "Digiring ke kompromi, relativisme, inklusivisme", "Pindah agama dianggap tak masalah"]
      ],
      modes: [
        { label: "Kesimpulan modul", target: "col", col: 2, title: "Ujungnya: kekacauan", text: "Tujuannya menggeser keyakinan menuju kekufuran. Bila muslim meyakini semua agama sama benar, akan muncul kekacauan (<em>chaos</em>) dalam kehidupan beragama, baik dalam <strong>mu’amalah ma’an-nas</strong> (dengan manusia) maupun <strong>mu’amalah ma’allah</strong> (dengan Allah)." }
      ]
    },
    {
      type: "callout",
      label: "Interaktif 6 • Jebakan Soal",
      tone: "warn",
      heading: "Pluralitas ≠ pluralisme",
      html: "<strong>Pluralitas</strong> = fakta bahwa masyarakat beragam agama. Islam menerimanya dan mengajarkan toleransi: hidup rukun, adil, dan bekerja sama dalam urusan dunia (QS. al-Mumtahanah [60]: 8; “lakum dinukum wa liya din”, QS. al-Kafirun [109]: 6).<br><strong>Pluralisme agama</strong> = paham bahwa semua agama sama benar. Inilah yang ditolak modul. ➕ MUI juga mengharamkannya (Fatwa No. 7/MUNAS VII/MUI/11/2005)."
    },
    {
      type: "ayat",
      label: "Ayat Inti",
      title: "Tegas dalam Akidah, Baik dalam Pergaulan",
      items: [
        ayat("3:85", { title: "Hanya Islam yang diterima", tone: "emerald", note: "➕ Dalil yang menolak klaim “semua agama sama-sama jalan keselamatan”. Lihat juga QS. Ali ‘Imran [3]: 19 di P2." }),
        ayat("109:6", { title: "Batas toleransi", tone: "sky", note: "Toleransi = membiarkan pemeluk agama lain beribadah, <strong>bukan</strong> ikut beribadah atau menyamakan ajaran." }),
        ayat("60:8", { title: "Tetap adil dan berbuat baik", tone: "amber", note: "➕ Penyeimbang: menolak pluralisme tidak berarti memusuhi. Berbuat baik dan adil kepada non-muslim yang tidak memerangi justru diperintahkan." })
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Pluralitas atau Pluralisme?",
      title: "Toleransi yang Benar atau Sudah Menyamakan Agama?",
      headers: ["Sikap / pernyataan", "Termasuk"],
      rows: [
        { cells: ["Satu kelompok tugas beranggotakan mahasiswa muslim, Kristen, dan Hindu yang saling membantu dan menghormati"], fields: [{ options: PP, answer: "pluralitas" }], ok: "✓ Kerja sama urusan dunia di tengah keragaman." },
        { cells: ["“Semua agama sama saja, cuma beda jalan menuju Tuhan yang sama.”"], fields: [{ options: PP, answer: "pluralisme" }], ok: "✓ Inti pluralisme agama: semua agama setara dan sama benar." },
        { cells: ["Menjaga parkir agar tetangga non-muslim lancar beribadah di hari rayanya"], fields: [{ options: PP, answer: "pluralitas" }], ok: "✓ Menghormati tanpa ikut ritualnya." },
        { cells: ["“Kita tidak boleh meyakini agama kita paling benar, itu sikap intoleran.”"], fields: [{ options: PP, answer: "pluralisme" }], ok: "✓ <em>No truth claim</em> / relativisme." },
        { cells: ["“Pindah agama tidak masalah, toh intinya semua sama.”"], fields: [{ options: PP, answer: "pluralisme" }], ok: "✓ Implikasi dialog teologis di modul." },
        { cells: ["Menolak ikut ritual ibadah agama lain dengan sopan, tetapi tetap mengucapkan terima kasih atas undangan makan bersama"], fields: [{ options: PP, answer: "pluralitas" }], ok: "✓ Tegas dalam akidah, baik dalam pergaulan (al-Kafirun 6 + al-Mumtahanah 8)." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Internal atau Eksternal?",
      title: "Pilah Problematika Umat",
      headers: ["Masalah", "Asal"],
      rows: [
        { cells: ["Taqlid a’ma"], fields: [{ options: IE, answer: "internal" }], ok: "✓" },
        { cells: ["Sekularisme"], fields: [{ options: IE, answer: "eksternal" }], ok: "✓" },
        { cells: ["Bid’ah dan khurafat"], fields: [{ options: IE, answer: "internal" }], ok: "✓" },
        { cells: ["Materialisme"], fields: [{ options: IE, answer: "eksternal" }], ok: "✓" },
        { cells: ["Kejumudan berpikir"], fields: [{ options: IE, answer: "internal" }], ok: "✓" },
        { cells: ["Westernisasi"], fields: [{ options: IE, answer: "eksternal" }], ok: "✓" },
        { cells: ["Perpecahan umat"], fields: [{ options: IE, answer: "internal" }], ok: "✓" },
        { cells: ["Liberalisme"], fields: [{ options: IE, answer: "eksternal" }], ok: "✓" }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • Implikasi Mana?",
      title: "Cocokkan Kasus dengan Implikasi Pluralisme",
      items: [
        { prompt: "Sebuah forum mengajak semua pemeluk agama berdoa bersama dengan satu doa “untuk Tuhan yang sama”", answer: "Doa antaragama", reason: "Modul: umat dibingungkan kepada Tuhan yang mana doa dipanjatkan." },
        { prompt: "Artikel menyatakan “memilih pasangan hidup tak mungkin dibatasi sekat agama”", answer: "Nikah beda agama", reason: "➕ MUI (Fatwa No. 4/MUNAS VII/MUI/8/2005): perkawinan beda agama haram dan tidak sah." },
        { prompt: "“Orang baik dari agama apa pun pasti selamat, Islam tidak istimewa.”", answer: "Klaim keselamatan agama lain", reason: "Bertentangan dengan QS. Ali ‘Imran [3]: 85." },
        { prompt: "“Keyakinan itu relatif, jangan mutlakkan kebenaran Islam.”", answer: "Relativisme & inklusivisme teologis", reason: "Anti-absolut." }
      ]
    }
  ],
  flashcards: [
    { tag: "Problem", q: "Problematika internal umat menurut modul?", a: "Taqlid a’ma, bid’ah & khurafat, kejumudan berpikir, perpecahan, kebodohan; problem ilmu, pendidikan Islam, persatuan, sistemik." },
    { tag: "Problem", q: "Tantangan eksternal umat?", a: "Westernisasi/modernisasi, liberalisme, pluralisme, sekularisme, rasionalisme, feminisme, materialisme." },
    { tag: "Liberalisasi", q: "4 bentuk liberalisasi pemikiran Islam?", a: "Pluralisme agama • relativisme kebenaran • kritik otentisitas al-Qur’an • dekonstruksi syari’ah." },
    { tag: "Liberalisasi", q: "Akibat liberalisasi pemikiran?", a: "Kerancuan pemahaman Islam pada aqidah, syari’ah, dan akhlak, yang berpengaruh pada kehidupan." },
    { tag: "Definisi", q: "Pluralisme agama menurut modul?", a: "Paham bahwa semua kebenaran relatif dan semua agama sebanding/setara dengan agama lain." },
    { tag: "Definisi", q: "3 ciri cara pandang pluralisme?", a: "No truth claim, agama sebagai respon manusia, dan relatif." },
    { tag: "Tokoh", q: "John Hick?", a: "1922–2012; “God Has Many Names”; Global Teologi." },
    { tag: "Tokoh", q: "Frithjof Schuon?", a: "1907–1998; Transcendent Unity of Religions: kebenaran yang sama tersembunyi di semua bentuk (esoteris sama, eksoteris beda)." },
    { tag: "Tokoh", q: "Samuel Zwemer berkata apa (1935)?", a: "Misi utamanya memisahkan muslim dari Islam agar menjadi muslim yang tidak berakhlak, bukan menghancurkan." },
    { tag: "Implikasi", q: "5 implikasi pluralisme agama di modul?", a: "Relativisme & inklusivisme teologis • klaim keselamatan agama lain • nikah beda agama • doa antaragama • dialog teologis (pindah agama dianggap biasa)." },
    { tag: "Kesimpulan", q: "Ujung dari pluralisme agama menurut modul?", a: "Menggeser keyakinan menuju kekufuran dan menimbulkan chaos dalam mu’amalah ma’an-nas maupun ma’allah." },
    { tag: "Beda", q: "Pluralitas vs pluralisme?", a: "Pluralitas: fakta keragaman, diterima dengan toleransi. Pluralisme agama: paham semua agama sama benar, ditolak." }
  ],
  quiz: [
    { q: "Berikut yang termasuk problematika INTERNAL umat Islam menurut modul adalah …", opts: ["Sekularisme", "Taqlid a’ma", "Westernisasi", "Feminisme"], ans: 1, exp: "Taqlid a’ma = ikut-ikutan buta, masalah dari dalam.", optExp: ["Eksternal.", "Benar.", "Eksternal.", "Eksternal."] },
    { q: "Paham yang menganggap semua kebenaran relatif dan semua agama sebanding atau setara disebut …", opts: ["Pluralitas", "Pluralisme agama", "Sinkretisme", "Sekularisme"], ans: 1, exp: "Definisi modul (Lorens Bagus & Simon Blackburn).", optExp: ["Pluralitas = fakta keragaman.", "Benar.", "Mencampur ajaran.", "Memisahkan agama dari publik."] },
    { q: "Berikut termasuk bentuk liberalisasi pemikiran Islam menurut modul, KECUALI …", opts: ["Relativisme kebenaran", "Kritik otentisitas al-Qur’an", "Dekonstruksi syari’ah", "Tajdid sesuai al-Qur’an dan Sunnah"], ans: 3, exp: "Tajdid (pembaruan) yang berpijak pada al-Qur’an dan Sunnah bukan liberalisasi.", optExp: ["Bentuk 2.", "Bentuk 3.", "Bentuk 4.", "Benar, bukan bentuk liberalisasi."] },
    { q: "Tokoh yang dikenal dengan gagasan “God Has Many Names” dan Global Teologi adalah …", opts: ["Frithjof Schuon", "John Hick", "Henry Martyn", "Samuel Zwemer"], ans: 1, exp: "John Hick (1922–2012).", optExp: ["Transcendent Unity.", "Benar.", "Misionaris abad 19.", "Konferensi 1935."] },
    { q: "Menurut Frithjof Schuon, agama-agama berbeda pada aspek lahir tetapi sama pada aspek batin. Aspek batin itu disebut …", opts: ["Eksoteris", "Esoteris", "Imanen", "Relatif"], ans: 1, exp: "Esoteris = batin; eksoteris = lahir.", optExp: ["Itu aspek lahir.", "Benar.", "Bukan istilah Schuon di modul.", "Bukan."] },
    { q: "Seseorang berkata, “Tidak masalah berdoa bersama dengan satu doa untuk semua agama karena Tuhannya sama.” Menurut modul, implikasinya adalah …", opts: ["Umat semakin kuat akidahnya", "Umat dibingungkan kepada Tuhan yang mana doa dipanjatkan", "Toleransi menjadi sempurna", "Tidak ada implikasi"], ans: 1, exp: "Implikasi doa antaragama.", optExp: ["Keliru.", "Benar.", "Toleransi tidak menuntut menyamakan ibadah.", "Keliru."] },
    { q: "Menurut kutipan modul, Samuel Zwemer (1935) menyatakan bahwa misi utamanya adalah …", opts: ["Menghancurkan kaum muslimin dengan perang", "Memisahkan muslim dari Islam agar menjadi muslim yang tidak berakhlak", "Mempelajari budaya Islam", "Membangun sekolah Islam"], ans: 1, exp: "Bukan menghancurkan, tetapi menjauhkan dari Islam.", optExp: ["Justru dinyatakan bukan itu.", "Benar.", "Bukan.", "Bukan."] },
    { q: "Sikap yang sesuai ajaran Islam di tengah masyarakat yang beragam agama adalah …", opts: ["Menganggap semua agama sama benar agar rukun", "Memusuhi pemeluk agama lain", "Hidup rukun dan berbuat adil, tanpa menyamakan akidah dan ibadah", "Ikut merayakan semua ritual keagamaan"], ans: 2, exp: "Pluralitas diterima; pluralisme ditolak (al-Kafirun 6, al-Mumtahanah 8).", optExp: ["Itu pluralisme.", "Bertentangan dengan al-Mumtahanah 8.", "Benar.", "Melampaui batas toleransi."] },
    { q: "Kesimpulan modul: pluralisme agama akan menimbulkan kekacauan dalam kehidupan beragama, baik dalam …", opts: ["Mu’amalah ma’an-nas maupun mu’amalah ma’allah", "Ibadah mahdhah saja", "Urusan politik saja", "Pendidikan saja"], ans: 0, exp: "Hubungan dengan manusia dan dengan Allah.", optExp: ["Benar.", "Terlalu sempit.", "Terlalu sempit.", "Terlalu sempit."] },
    { q: "Ciri cara pandang pluralisme agama yang menolak siapa pun mengklaim agamanya paling benar disebut …", opts: ["Truth claim", "No truth claim", "Esoteris", "Tasamuh"], ans: 1, exp: "Salah satu dari tiga ciri: no truth claim, respon manusia, relatif.", optExp: ["Kebalikannya.", "Benar.", "Istilah Schuon.", "Tasamuh = toleransi."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS AIK — PERTEMUAN 10*
📚 *Liberalisasi Pemikiran Islam & Pluralisme Agama*

1️⃣ Problem internal: taqlid a’ma, bid’ah-khurafat, jumud, perpecahan, kebodohan. Eksternal: westernisasi, liberalisme, pluralisme, sekularisme, rasionalisme, feminisme, materialisme.
2️⃣ 4 bentuk liberalisasi: pluralisme agama • relativisme kebenaran • kritik otentisitas al-Qur’an • dekonstruksi syari’ah → kerancuan aqidah, syari’ah, akhlak.
3️⃣ Pluralisme agama: semua kebenaran relatif, semua agama setara (Lorens Bagus; Simon Blackburn). Ciri: no truth claim, respon manusia, relatif.
4️⃣ Tokoh: John Hick (God Has Many Names, Global Teologi) • Frithjof Schuon (Transcendent Unity; esoteris sama, eksoteris beda) • Samuel Zwemer 1935 (pisahkan muslim dari Islam) • Henry Martyn (kata-kata, akal, cinta).
5️⃣ Implikasi: relativisme & inklusivisme • klaim keselamatan agama lain • nikah beda agama • doa antaragama • dialog teologis (pindah agama dianggap biasa) → chaos ma’an-nas & ma’allah.
⚠️ Pluralitas (fakta keragaman, toleransi) ≠ pluralisme (paham semua agama benar).
➕ Ali ‘Imran 85 • al-Kafirun 6 • al-Mumtahanah 8 • Fatwa MUI 2005.`
};
