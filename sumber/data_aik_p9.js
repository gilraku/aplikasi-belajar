// AIK — Pertemuan 9: Konsep Akhlak dalam Islam (sumber: PDF "Konsep_Akhlak_09", 29 slide)
// Ayat dari ayat_aik_uas.js (teks diambil otomatis, tidak diketik ulang). Hadis ditulis dengan lafaz yang masyhur.
const ayat = require("./ayat_aik_uas.js");
const EMA = [{ value: "etika", label: "Etika" }, { value: "moral", label: "Moral" }, { value: "akhlak", label: "Akhlak" }];
const AKH = [{ value: "ya", label: "Sudah jadi akhlak ✅" }, { value: "belum", label: "Belum jadi akhlak ⏳" }];
const LINGKUP = [{ value: "allah", label: "Kepada Allah" }, { value: "manusia", label: "Kepada manusia" }, { value: "alam", label: "Kepada alam" }];

module.exports = {
  id: "p9",
  nomor: 9,
  judul: "Konsep Akhlak dalam Islam",
  ujian: "UAS",
  hero: {
    badge: "Materi 9 • AIK",
    title: "Akhlak = Etika + Moral + Tanggung Jawab kepada Allah",
    text: "Pahami <strong>beda etika, moral, dan akhlak</strong>, asal kata <em>khuluq</em>, definisi <strong>Imam al-Ghazali</strong> dan <strong>Ibrahim Anis</strong>, <strong>4 ciri</strong> perbuatan akhlak, hakikat dan kedudukan <em>akhlaqul karimah</em>, <strong>ruang lingkup</strong>, serta <strong>dua jenis akhlak</strong>."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • Bedanya Apa?",
      title: "Etika vs Moral vs Akhlak",
      headers: ["", "Etika", "Moral", "Akhlak"],
      rows: [
        ["Asal kata", "Yunani <em>ethos</em>: adat kebiasaan berdasar logika", "Latin <em>mores</em> (jamak dari <em>mos</em>): adat kebiasaan; dalam bahasa Indonesia: <strong>susila</strong>", "Arab <em>khuluq</em> (jamak: <em>akhlaq</em>): tingkah laku, tabiat, perangai, budi pekerti"],
        ["Isinya", "<strong>Penjelasan</strong> mengapa sesuatu dipandang baik atau buruk", "<strong>Perwujudan</strong> baik atau buruk dalam bentuk perbuatan", "Etika + moral <strong>dengan pertanggungjawaban kepada Allah</strong>"],
        ["Sumber ukuran", "Akal (kajian teoretis)", "Norma masyarakat", "Al-Qur’an & Sunnah"],
        ["Berlakunya", "Tergantung pemikiran", "<strong>Lokal / temporal</strong> (komunitas tertentu)", "<strong>Universal</strong>"]
      ],
      modes: [
        { label: "Contoh dari modul", target: "row", row: 1, title: "Jujur vs bohong", text: "Kita tahu <strong>mengapa</strong> bohong itu buruk dan jujur itu baik: itu <strong>etika</strong>. Kita benar-benar <strong>tidak berbohong</strong>: itu <strong>moral</strong>. Tidak berbohong karena sadar akan dimintai tanggung jawab oleh Allah: itu <strong>akhlak</strong>." },
        { label: "Objeknya sama", target: "row", row: 0, title: "Ketiganya membahas perbuatan manusia", text: "Diagram “Apa Bedanya?” di modul menaruh <strong>perbuatan manusia</strong> di tengah. Yang membedakan adalah <strong>sumber ukuran</strong> dan <strong>kepada siapa bertanggung jawab</strong>." },
        { label: "Plus-nya akhlak", target: "row", row: 3, title: "Di mana “plus”-nya?", text: "Akhlak adalah tanggung jawab manusia (<em>makhluq</em>) kepada Allah Sang Pencipta (<em>Khaliq</em>) yang diwujudkan dalam perilaku dan tindakan (<em>akhlaq</em>). Kebenarannya bersifat universal." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "callout",
          label: "Interaktif 2 • Etimologi",
          tone: "info",
          heading: "Satu akar: kh-l-q",
          html: "<em>Khuluq</em> (perangai) seakar dengan <em>Khaliq</em> (Pencipta), <em>makhluq</em> (yang diciptakan), dan <em>khalq</em> (penciptaan).<br>Maknanya: akhlak adalah <strong>keterpaduan kehendak Khaliq dengan perilaku makhluq</strong>. Perilaku bernilai akhlak yang hakiki bila sesuai dengan kehendak Allah."
        },
        {
          type: "callout",
          label: "Interaktif 3 • Terminologi",
          tone: "success",
          heading: "Dua definisi yang sering ditanyakan",
          html: "<strong>Imam al-Ghazali:</strong> sifat yang tertanam dalam jiwa yang mendorong lahirnya perbuatan dengan <strong>mudah dan ringan</strong>, tanpa pemikiran dan pertimbangan.<br><strong>Ibrahim Anis:</strong> sifat yang tertanam dalam jiwa, yang dengannya lahir macam-macam perbuatan, <strong>baik atau buruk</strong>, tanpa pemikiran dan pertimbangan."
        }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 4 • Kesimpulan Definisi",
      title: "4 Ciri Perbuatan Akhlak",
      cols: 2,
      items: [
        { badge: "1", tone: "emerald", title: "Tertanam dalam jiwa", text: "Sudah menjadi kepribadian, bukan sekali-dua kali." },
        { badge: "2", tone: "sky", title: "Muncul secara spontan", text: "Dilakukan dengan mudah, tanpa dipaksa-paksakan." },
        { badge: "3", tone: "amber", title: "Tanpa dorongan dari luar", text: "Bukan karena diawasi, dipuji, dibayar, atau takut dihukum." },
        { badge: "4", tone: "violet", title: "Tanpa pemikiran / pertimbangan", text: "Tidak perlu menimbang-nimbang dulu untuk berbuat." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 5 • Hakikat & Ciri",
      title: "Akhlaqul Karimah dalam Satu Tabel",
      headers: ["Aspek", "Isi menurut modul"],
      rows: [
        ["Hakikat", "Manifestasi <strong>iman, Islam, dan ihsan</strong>; buah/inti ajaran Islam; refleksi sifat dan jiwa; spontan dan terpola"],
        ["Objek & sudut pandang", "Objek: <strong>nilai baik dan buruk</strong>. Sudut pandang: <strong>nilai ajaran Islam</strong>"],
        ["Ciri umum 1", "<strong>Menyucikan jiwa</strong> dari sifat tercela: iri, dengki, pamrih, sombong, maksiat (QS. asy-Syams [91]: 7–10)"],
        ["Ciri umum 2", "<strong>Memelihara akal</strong>: memfungsikan potensinya untuk berpikir tentang hal baik dan bermanfaat bagi diri, keluarga, negara, agama (QS. Ali ‘Imran [3]: 7)"],
        ["Ciri umum 3", "<strong>Memelihara dan mengendalikan hawa nafsu</strong> karena takut kepada Allah (QS. an-Nazi‘at [79]: 40–41)"]
      ],
      modes: [
        { label: "Hadis inti", target: "row", row: 0, title: "Misi kerasulan", text: "“Sesungguhnya aku diutus hanyalah untuk menyempurnakan akhlak yang mulia.” Modul menyebut HR. Bukhari di satu slide dan HR. Baihaqi di slide lain. ➕ Hadis ini diriwayatkan al-Bukhari dalam kitab <em>al-Adab al-Mufrad</em> (bukan kitab Shahih-nya), Ahmad, dan al-Baihaqi." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 6 • Kedudukan Akhlaqul Karimah",
      title: "5 Kedudukan (Versi Modul)",
      cols: 2,
      items: [
        { badge: "1", tone: "emerald", title: "Misi utama Rasulullah saw.", text: "“Sesungguhnya aku diutus untuk menyempurnakan akhlak.” (HR. Baihaqi)" },
        { badge: "2", tone: "sky", title: "Akhlak baik adalah agama itu sendiri", text: "“Ya Rasulullah, apakah agama itu?” Beliau menjawab: “(Agama adalah) akhlak yang baik.”" },
        { badge: "3", tone: "amber", title: "Cerminan kualitas di hadapan Allah", text: "Yang paling banyak memasukkan ke surga: takwa kepada Allah dan akhlak yang baik." },
        { badge: "4", tone: "violet", title: "Dicintai & paling dekat dengan Rasul di akhirat", text: "“Yang paling baik akhlaknya di antara kalian.” (HR. Ahmad)" },
        { badge: "5", tone: "rose", title: "Menunjukkan kualitas iman", text: "“Mukmin yang paling sempurna imannya adalah yang paling baik akhlaknya.” (HR. Tirmidzi)" }
      ]
    },
    {
      type: "table",
      label: "Interaktif 7 • Ruang Lingkup & Jenis",
      title: "Akhlak kepada Siapa Saja?",
      headers: ["Kepada", "Rinciannya di modul"],
      rows: [
        ["Allah", "Tauhid, menjauhi syirik, baik sangka (husnuzan)"],
        ["Manusia", "Diri sendiri, orang tua, orang lain"],
        ["Alam", "Flora (tumbuhan) dan fauna (hewan)"]
      ],
      modes: [
        { label: "Jenis 1", target: "row", row: 0, title: "Akhlaq al-Karimah", text: "Perilaku yang mencerminkan <strong>penghambaan/pengabdian kepada Allah semata</strong>. ➕ Disebut juga <em>akhlaq mahmudah</em> (terpuji)." },
        { label: "Jenis 2", target: "row", row: 1, title: "Akhlaq al-Madzmumah", text: "Perilaku yang mencerminkan <strong>penghambaan/pengabdian kepada hawa nafsu semata</strong> (tercela)." }
      ]
    },
    {
      type: "ayat",
      label: "Ayat Inti",
      title: "Akhlak Nabi & Ciri Akhlaqul Karimah",
      items: [
        ayat("68:4", { title: "Akhlak Rasulullah saw.", tone: "emerald", note: "➕ Dalil paling terkenal tentang akhlak Nabi. Kata <em>khuluq</em> di ayat ini adalah bentuk tunggal dari <em>akhlaq</em>." }),
        ayat("91:7-10", { title: "Menyucikan jiwa (ciri 1)", tone: "sky" }),
        ayat("79:40-41", { title: "Mengendalikan hawa nafsu (ciri 3)", tone: "amber" })
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Etika, Moral, atau Akhlak?",
      title: "Tebak Istilahnya",
      headers: ["Pernyataan", "Istilah"],
      rows: [
        { cells: ["Ilmu yang menjelaskan mengapa mencontek dipandang buruk, berdasarkan pertimbangan akal"], fields: [{ options: EMA, answer: "etika" }], ok: "✓ Penjelasan baik-buruk dengan akal = etika." },
        { cells: ["Aturan tak tertulis di sebuah kampung: tamu harus melepas sandal sebelum masuk rumah"], fields: [{ options: EMA, answer: "moral" }], ok: "✓ Norma yang berlaku di komunitas tertentu (lokal)." },
        { cells: ["Tetap jujur mengisi presensi kuliah daring karena yakin Allah Maha Melihat dan semua akan dipertanggungjawabkan"], fields: [{ options: EMA, answer: "akhlak" }], ok: "✓ Ada pertanggungjawaban kepada Allah." },
        { cells: ["Perwujudan nilai-nilai etika dalam bentuk perbuatan nyata di masyarakat"], fields: [{ options: EMA, answer: "moral" }], ok: "✓ Definisi moral di modul." },
        { cells: ["Ukurannya al-Qur’an dan Sunnah, sehingga kebenarannya universal"], fields: [{ options: EMA, answer: "akhlak" }], ok: "✓" },
        { cells: ["Berasal dari kata Yunani <em>ethos</em>"], fields: [{ options: EMA, answer: "etika" }], ok: "✓" }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Uji 4 Ciri",
      title: "Sudah Menjadi Akhlak atau Belum?",
      headers: ["Perilaku", "Penilaian"],
      rows: [
        { cells: ["Rina selalu spontan mengembalikan uang kembalian yang berlebih, di mana pun, tanpa berpikir lama"], fields: [{ options: AKH, answer: "ya" }], ok: "✓ Tertanam, spontan, tanpa dorongan luar." },
        { cells: ["Budi hanya datang tepat waktu ketika dosennya galak dan presensi dihitung"], fields: [{ options: AKH, answer: "belum" }], ok: "✓ Masih butuh dorongan dari luar (ciri 3 belum terpenuhi)." },
        { cells: ["Sinta sekali menyumbang besar karena acara itu diliput media"], fields: [{ options: AKH, answer: "belum" }], ok: "✓ Sekali dan karena ingin dilihat: belum tertanam, ada dorongan luar." },
        { cells: ["Andi terbiasa mudah marah dan memaki setiap kali kalah main gim"], fields: [{ options: AKH, answer: "ya" }], ok: "✓ Sudah jadi akhlak, tetapi akhlak <strong>madzmumah</strong>. Definisi Ibrahim Anis: akhlak bisa baik atau buruk." },
        { cells: ["Dewi berpikir lama menimbang untung-rugi sebelum akhirnya memutuskan mau menolong teman"], fields: [{ options: AKH, answer: "belum" }], ok: "✓ Masih butuh pertimbangan; belum spontan." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Ruang Lingkup",
      title: "Akhlak kepada Siapa?",
      headers: ["Perbuatan", "Ruang lingkup"],
      rows: [
        { cells: ["Tidak mendatangi dukun dan tidak memakai jimat"], fields: [{ options: LINGKUP, answer: "allah" }], ok: "✓ Menjauhi syirik." },
        { cells: ["Menelepon ibu dan meminta doa sebelum ujian"], fields: [{ options: LINGKUP, answer: "manusia" }], ok: "✓ Kepada orang tua." },
        { cells: ["Tidak membuang sisa makanan ke selokan kampus"], fields: [{ options: LINGKUP, answer: "alam" }], ok: "✓" },
        { cells: ["Tetap berprasangka baik kepada Allah saat gagal seleksi beasiswa"], fields: [{ options: LINGKUP, answer: "allah" }], ok: "✓ Baik sangka (husnuzan) kepada Allah." },
        { cells: ["Menjaga pola tidur dan tidak begadang demi kesehatan"], fields: [{ options: LINGKUP, answer: "manusia" }], ok: "✓ Akhlak kepada <strong>diri sendiri</strong> termasuk lingkup manusia." },
        { cells: ["Memberi minum kucing liar yang kehausan"], fields: [{ options: LINGKUP, answer: "alam" }], ok: "✓ Fauna." }
      ]
    }
  ],
  flashcards: [
    { tag: "Etika", q: "Arti etika menurut bahasa?", a: "Yunani “ethos”: adat kebiasaan berdasarkan logika." },
    { tag: "Etika", q: "Etika adalah ilmu yang mempelajari …", a: "Arti baik dan buruk, apa yang seharusnya dilakukan, tujuan perbuatan, dan cara berbuat. Etika = nilai dasar bagi perbuatan." },
    { tag: "Moral", q: "Arti moral menurut bahasa?", a: "Latin “mores” (jamak dari “mos”): adat kebiasaan. Dalam bahasa Indonesia: susila." },
    { tag: "Moral", q: "Definisi moral di modul?", a: "Perwujudan nilai-nilai etika dalam komunitas tertentu; praktik dari etika. Sifatnya lokal/temporal." },
    { tag: "Akhlak", q: "Akhlak = …", a: "Etika + moral, ditambah pertanggungjawaban kepada Allah. Sumbernya al-Qur’an & Sunnah, kebenarannya universal." },
    { tag: "Etimologi", q: "Arti “khuluq”?", a: "Tingkah laku, tabiat, perangai, budi pekerti. Seakar dengan Khaliq, makhluq, khalq." },
    { tag: "Definisi", q: "Definisi akhlak menurut Imam al-Ghazali?", a: "Sifat yang tertanam dalam jiwa yang mendorong lahirnya perbuatan dengan mudah dan ringan tanpa pemikiran dan pertimbangan." },
    { tag: "Definisi", q: "Definisi akhlak menurut Ibrahim Anis?", a: "Sifat yang tertanam dalam jiwa yang dengannya lahir macam-macam perbuatan, baik atau buruk, tanpa pemikiran dan pertimbangan." },
    { tag: "Ciri", q: "4 ciri perbuatan akhlak?", a: "Tertanam dalam jiwa • muncul spontan • tanpa dorongan dari luar • tanpa pemikiran/pertimbangan." },
    { tag: "Hakikat", q: "Akhlaqul karimah adalah manifestasi dari …", a: "Iman, Islam, dan ihsan." },
    { tag: "Ciri umum", q: "3 ciri umum akhlaqul karimah?", a: "Menyucikan jiwa dari sifat tercela (asy-Syams 7–10) • memelihara akal (Ali ‘Imran 7) • mengendalikan hawa nafsu karena takut Allah (an-Nazi‘at 40–41)." },
    { tag: "Kedudukan", q: "5 kedudukan akhlaqul karimah?", a: "Misi utama Rasul • agama itu sendiri • cerminan kualitas di akhirat • dicintai & dekat Rasul di akhirat • menunjukkan kualitas iman." },
    { tag: "Lingkup", q: "Ruang lingkup akhlak?", a: "Kepada Allah (tauhid, jauhi syirik, baik sangka) • manusia (diri sendiri, orang tua, orang lain) • alam (flora, fauna)." },
    { tag: "Jenis", q: "Beda akhlaq al-karimah dan al-madzmumah?", a: "Karimah: mencerminkan penghambaan kepada Allah semata. Madzmumah: penghambaan kepada hawa nafsu semata." }
  ],
  quiz: [
    { q: "Kata etika berasal dari bahasa Yunani “ethos” yang berarti …", opts: ["Adat kebiasaan berdasarkan logika", "Perangai yang tertanam dalam jiwa", "Hukum yang ditetapkan negara", "Tingkah laku yang diridai Allah"], ans: 0, exp: "Definisi bahasa di modul.", optExp: ["Benar.", "Itu definisi akhlak.", "Bukan.", "Itu ciri akhlak."] },
    { q: "Moral berasal dari kata Latin “mores”. Dalam bahasa Indonesia, moral diterjemahkan dengan …", opts: ["Budi pekerti", "Susila", "Tabiat", "Etos"], ans: 1, exp: "Modul: dalam bahasa Indonesia diterjemahkan dengan arti susila.", optExp: ["Itu salah satu arti khuluq.", "Benar.", "Itu arti khuluq.", "Itu asal kata etika."] },
    { q: "Menurut modul, perbedaan utama akhlak dengan etika dan moral terletak pada …", opts: ["Objeknya yang berbeda", "Adanya pertanggungjawaban kepada Allah", "Akhlak hanya berlaku di Arab", "Akhlak bersumber dari akal semata"], ans: 1, exp: "Akhlak = etika + moral + pertanggungjawaban kepada Allah.", optExp: ["Objeknya sama: perbuatan manusia.", "Benar.", "Akhlak universal.", "Sumbernya al-Qur’an & Sunnah."] },
    { q: "“Sifat yang tertanam dalam jiwa yang mendorong lahirnya perbuatan dengan mudah dan ringan tanpa pemikiran dan pertimbangan.” Definisi ini dikemukakan oleh …", opts: ["Ibrahim Anis", "Imam al-Ghazali", "Ibnu Taimiyah", "Muhammad Abduh"], ans: 1, exp: "Kata kunci: “mudah dan ringan”.", optExp: ["Ibrahim Anis menekankan “baik atau buruk”.", "Benar.", "Definisi ibadah (P7).", "Definisi iman (P7)."] },
    { q: "Seorang mahasiswa selalu menyapa dan membantu petugas kebersihan, baik dilihat orang maupun tidak, tanpa berpikir panjang. Ciri akhlak yang paling tampak adalah …", opts: ["Muncul karena dorongan dari luar", "Tertanam dalam jiwa dan muncul secara spontan", "Dilakukan setelah pertimbangan untung-rugi", "Bersifat lokal dan temporal"], ans: 1, exp: "Dilihat atau tidak sama saja = tanpa dorongan luar, spontan.", optExp: ["Justru tidak.", "Benar.", "Justru tanpa pertimbangan.", "Itu ciri moral."] },
    { q: "Berikut termasuk ciri umum akhlaqul karimah menurut modul, KECUALI …", opts: ["Menyucikan jiwa dari sifat tercela", "Memelihara akal untuk berpikir hal yang bermanfaat", "Mengendalikan hawa nafsu karena takut kepada Allah", "Mengikuti kebiasaan mayoritas masyarakat"], ans: 3, exp: "Ukuran akhlak bukan mayoritas, tetapi ajaran Islam.", optExp: ["Ciri 1.", "Ciri 2.", "Ciri 3.", "Benar, bukan ciri."] },
    { q: "Hadis “Mukmin yang paling sempurna imannya adalah yang paling baik akhlaknya” menunjukkan kedudukan akhlak sebagai …", opts: ["Misi utama Rasulullah", "Penunjuk kualitas iman", "Agama itu sendiri", "Pengganti ibadah"], ans: 1, exp: "HR. Tirmidzi.", optExp: ["Hadis lain.", "Benar.", "Hadis lain.", "Akhlak tidak menggantikan ibadah."] },
    { q: "Menjaga kesehatan dengan tidak merokok termasuk ruang lingkup akhlak kepada …", opts: ["Allah", "Diri sendiri", "Alam/fauna", "Orang tua"], ans: 1, exp: "Diri sendiri termasuk lingkup akhlak kepada manusia.", optExp: ["Kurang tepat.", "Benar.", "Bukan.", "Bukan."] },
    { q: "Akhlaq al-madzmumah adalah perilaku yang mencerminkan …", opts: ["Penghambaan kepada Allah semata", "Penghambaan kepada hawa nafsu semata", "Pengabdian kepada negara", "Kebiasaan masyarakat setempat"], ans: 1, exp: "Lawan dari akhlaq al-karimah.", optExp: ["Itu al-karimah.", "Benar.", "Bukan definisi modul.", "Itu moral."] },
    { q: "Kata khuluq seakar dengan Khaliq dan makhluq. Makna yang ditarik modul dari hubungan ini adalah …", opts: ["Akhlak hanya urusan antarmanusia", "Akhlak adalah keterpaduan kehendak Khaliq dengan perilaku makhluq", "Akhlak bawaan lahir yang tidak bisa diubah", "Akhlak sama dengan adat istiadat"], ans: 1, exp: "Perilaku bernilai akhlak bila sesuai kehendak Allah.", optExp: ["Keliru.", "Benar.", "Bukan isi modul.", "Itu lebih dekat ke moral."] },
    { q: "Dalam diagram modul, hubungan akhlak dengan konsep dasar Islam lainnya adalah …", opts: ["Akhlak berdiri sendiri tanpa aqidah", "Aqidah, syariat (ibadah & mu’amalah), dan akhlak saling terkait", "Syariat cukup tanpa akhlak", "Akhlak lebih tinggi dari aqidah"], ans: 1, exp: "Ketiganya digambar sebagai satu siklus.", optExp: ["Keliru.", "Benar.", "Keliru.", "Bukan isi modul."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS AIK — PERTEMUAN 9*
📚 *Konsep Akhlak dalam Islam*

1️⃣ Masalah: merosotnya moral (pintar tak bermoral, seks bebas, tawuran, korupsi, kriminal, mudah putus asa) → solusi: pendidikan & penanaman akhlak.
2️⃣ Etika (Yunani ethos) = penjelasan MENGAPA baik/buruk, pakai akal. Moral (Latin mores, = susila) = PERWUJUDAN baik/buruk dalam perbuatan, lokal/temporal. Akhlak = etika + moral + tanggung jawab kepada Allah, universal (Qur’an & Sunnah).
3️⃣ Khuluq = tingkah laku, tabiat, perangai, budi pekerti; seakar Khaliq–makhluq.
4️⃣ Al-Ghazali: sifat tertanam dalam jiwa → perbuatan mudah & ringan tanpa pertimbangan. Ibrahim Anis: … perbuatan baik ATAU buruk tanpa pertimbangan.
5️⃣ 4 ciri: tertanam dalam jiwa • spontan • tanpa dorongan luar • tanpa pemikiran.
6️⃣ Hakikat: manifestasi iman, Islam, ihsan. Ciri umum: sucikan jiwa (asy-Syams 7–10) • pelihara akal (Ali ‘Imran 7) • kendalikan nafsu (an-Nazi‘at 40–41).
7️⃣ Kedudukan: misi Rasul • agama itu sendiri • kualitas di akhirat • dekat Rasul • tanda kualitas iman.
8️⃣ Lingkup: Allah • manusia (diri, orang tua, orang lain) • alam (flora, fauna). Jenis: karimah vs madzmumah.`
};
