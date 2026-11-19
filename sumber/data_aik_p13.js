// AIK — Pertemuan 13: Akhlak Pergaulan dalam Islam (sumber: PDF "Pergaulan_13", 26 slide UMY)
// Catatan: arti 5 tingkatan ukhuwah ditulis sesuai slide; arti yang lebih umum dipakai diberi tanda ➕.
const ayat = require("./ayat_aik_uas.js");
const KEL = [{ value: "sesama", label: "Sesama muslim" }, { value: "lawan", label: "Antar lawan jenis" }, { value: "terlarang", label: "Pergaulan terlarang" }];

module.exports = {
  id: "p13",
  nomor: 13,
  judul: "Akhlak Pergaulan dalam Islam",
  ujian: "UAS",
  hero: {
    badge: "Materi 13 • AIK",
    title: "Bergaul Luas, Tetap Menjaga Batas",
    text: "Pahami <strong>habluminannas</strong> dan <strong>5 tingkatan ukhuwah islamiyah</strong>, <strong>8 adab pergaulan sesama muslim</strong>, <strong>6 batas pergaulan antar lawan jenis</strong>, dan <strong>3 pergaulan terlarang</strong> (khamar, narkoba, tawuran)."
  },
  cheatsheet: [
    {
      type: "callout",
      label: "Interaktif 1 • Makna Pergaulan",
      tone: "info",
      heading: "Habluminannas",
      html: "Hubungan dengan sesama manusia, <strong>baik muslim maupun kafir</strong>, diatur dalam konsep <strong>habluminannas</strong>. Tujuannya: menciptakan <strong>keharmonisan dan tasamuh (toleransi)</strong> dalam pergaulan lingkup mu’amalah dan <strong>menghindari konflik</strong>."
    },
    {
      type: "table",
      label: "Interaktif 2 • Ukhuwah Islamiyah",
      title: "5 Tingkatan Ukhuwah (Urut dari Bawah)",
      headers: ["Tingkat", "Istilah", "Arti menurut slide", "➕ Arti yang umum dipakai"],
      rows: [
        ["1", "<strong>Ta’aruf</strong>", "Saling memahami", "Saling mengenal"],
        ["2", "<strong>Tafahum</strong>", "Saling menolong", "Saling memahami"],
        ["3", "<strong>Ta’awun</strong>", "Saling membantu", "Saling tolong-menolong"],
        ["4", "<strong>Takaful</strong>", "Empati", "Saling menanggung / senasib sepenanggungan"],
        ["5", "<strong>Itsar</strong>", "Mendahulukan muslim lain yang lebih membutuhkan", "Sama"]
      ],
      modes: [
        { label: "Cara mengingat", target: "col", col: 1, title: "Kenal → paham → tolong → tanggung → dahulukan", text: "Urutannya naik: kenal dulu, lalu paham, lalu saling menolong, lalu ikut merasakan dan menanggung beban, puncaknya <strong>itsar</strong>: mendahulukan saudara di atas diri sendiri." },
        { label: "Perhatikan arti slide", target: "col", col: 2, title: "Untuk ujian, pakai arti slide", text: "Slide mengartikan ta’aruf = saling memahami dan tafahum = saling menolong. Di banyak buku, ta’aruf = saling mengenal dan tafahum = saling memahami. Jika opsi soal mengikuti slide, pilih arti slide." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Tiga Kelompok Adab",
      title: "Pergaulan dalam Satu Tabel",
      headers: ["Sesama muslim (8)", "Antar lawan jenis (6)", "Terlarang (3)"],
      rows: [
        ["1. Mengucapkan salam (an-Nur 27)", "1. Menutup aurat (al-Ahzab 59)", "1. Mengonsumsi khamar (al-Baqarah 219)"],
        ["2. Berjabat tangan", "2. Menundukkan pandangan (an-Nur 30)", "2. Penggunaan narkoba"],
        ["3. Mencari teman yang baik (HR. Bukhari)", "3. Tidak menyentuh lawan jenis (HR. Thabrani)", "3. Perkelahian antarkelompok / tawuran"],
        ["4. Meminta izin", "4. Tidak berdua-duaan (HR. Bukhari & Muslim)", ""],
        ["5. Menghormati yang tua, menyayangi yang muda", "5. Tidak berpacaran (al-Isra’ 32)", ""],
        ["6. Berbicara yang sopan", "6. Tidak berzina", ""],
        ["7. Tidak saling menghina (al-Hujurat 11–12)", "", ""],
        ["8. Saling menasihati dalam kebaikan", "", ""]
      ],
      modes: [
        { label: "Teman baik", target: "row", row: 2, title: "Penjual minyak wangi vs pandai besi", text: "Teman baik seperti pembawa minyak wangi: kamu diberi, membeli, atau setidaknya mencium wanginya. Teman buruk seperti peniup api pandai besi: bajumu terbakar atau kamu mencium bau tak sedap (HR. Bukhari)." },
        { label: "Menghormati & menyayangi", target: "row", row: 4, title: "“Bukan golongan kami …”", text: "“Bukanlah termasuk golongan kami orang yang tidak menyayangi anak kecil di antara kami dan tidak menghormati orang yang lebih tua di antara kami.” (HR. Tirmidzi, dikutip di slide)" },
        { label: "Jabat tangan", target: "row", row: 1, title: "Maknanya menurut slide", text: "Berjabat tangan menunjukkan <strong>keakraban, kerukunan, persahabatan, atau permintaan maaf</strong>. Batasnya ada di kolom lawan jenis (poin 3)." },
        { label: "Larangan pacaran", target: "row", row: 4, title: "“Jangan mendekati zina”", text: "Al-Isra’ 32 tidak hanya melarang zina, tetapi juga <strong>mendekatinya</strong>. Slide pacaran menyebut: memandang wajahnya = zina mata, berbicara dengannya = zina lisan, merindukannya = zina hati, memegang tangannya = zina tangan, sampai zina kemaluan." }
      ]
    },
    {
      type: "ayat",
      label: "Ayat Inti",
      title: "Dalil Adab Pergaulan",
      items: [
        ayat("24:27", { title: "Meminta izin dan memberi salam", tone: "emerald" }),
        ayat("49:11", { title: "Tidak saling menghina", tone: "sky", note: "Slide mengutip al-Hujurat ayat 12 (prasangka, mencari kesalahan, ghibah). Ayat 11 (larangan mengolok-olok dan memanggil gelar buruk) adalah dalil yang paling langsung untuk “tidak saling menghina”." }),
        ayat("24:30", { title: "Menundukkan pandangan", tone: "amber" }),
        ayat("17:32", { title: "Jangan mendekati zina", tone: "rose" })
      ]
    }
  ],
  simulator: [
    {
      type: "detective",
      label: "Permainan 1 • Detektif Grup Kelas",
      title: "Detektif: Obrolan Grup WhatsApp Kelas",
      desc: "Beberapa pesan melanggar adab pergaulan. Klik <strong>pesan yang bermasalah</strong> untuk melihat perbaikannya. Ada 5 pelanggaran.",
      rules: ["Sesama muslim: salam, sopan, tidak menghina, saling menasihati", "Lawan jenis: jaga pandangan, tidak berdua-duaan, tidak pacaran", "Terlarang: khamar, narkoba, tawuran"],
      headers: ["Pengirim", "Pesan"],
      rows: [
        ["Ketua kelas", "Assalamu’alaikum, teman-teman. Tugas AIK dikumpulkan Jumat, ya."],
        ["Anggota A", "Halah, tugas dari dosen itu nggak penting. Si B aja otaknya lemot, pasti telat lagi 😂"],
        ["Anggota C", "Wa’alaikumsalam. Siap, terima kasih infonya."],
        ["Anggota D", "Malam ini nongkrong di kafe yuk, ada yang bawa minuman beralkohol, biar santai."],
        ["Anggota E", "Kak, kalau ada materi yang belum paham, kita belajar bareng di perpustakaan aja."],
        ["Anggota F", "B, kerja kelompoknya berdua aja di kosku malam ini ya, yang lain nggak usah tahu."],
        ["Anggota G", "Anak kelas sebelah ngatain kita. Besok kita serbu rame-rame!"],
        ["Anggota H", "Tolong yang paham bab ukhuwah, boleh bantu jelaskan? Saya masih bingung."],
        ["Anggota A", "Udah, nggak usah sok alim. Tugas kelompok cukup bikin story bareng pacar aja, biar viral."]
      ],
      bugs: [
        { row: 1, col: 1, fixed: "Tugasnya penting. B, kalau butuh bantuan, kabari ya.", explain: "✅ <strong>Tidak saling menghina</strong> (poin 7 sesama muslim; al-Hujurat 11). Menyebut teman “lemot” dan menertawakannya termasuk mengolok-olok." },
        { row: 3, col: 1, fixed: "Malam ini belajar bareng di kafe yuk, pesan minuman biasa saja.", explain: "✅ <strong>Khamar</strong> termasuk pergaulan terlarang (poin 1; al-Baqarah 219, al-Ma’idah 90)." },
        { row: 5, col: 1, fixed: "Kerja kelompoknya di perpustakaan besok siang, ajak anggota lain juga.", explain: "✅ <strong>Tidak berdua-duaan dengan lawan jenis</strong> (HR. Bukhari & Muslim). Belajar bersama di tempat terbuka dan berkelompok." },
        { row: 6, col: 1, fixed: "Kita laporkan ke ketua angkatan dan selesaikan baik-baik.", explain: "✅ <strong>Tawuran</strong> termasuk pergaulan terlarang (poin 3). Tujuan habluminannas justru menghindari konflik." },
        { row: 8, col: 1, fixed: "Ayo saling mengingatkan. Tugasnya kita kerjakan bersama di grup.", explain: "✅ <strong>Tidak berpacaran</strong> (al-Isra’ 32) dan <strong>tidak menghina</strong> (“sok alim”). Slide: yang “positif halal” adalah menikah; sebelum itu cukup ta’aruf." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Kelompok Adab",
      title: "Masuk Kelompok Mana?",
      headers: ["Adab / larangan", "Kelompok"],
      rows: [
        { cells: ["Menundukkan pandangan"], fields: [{ options: KEL, answer: "lawan" }], ok: "✓ an-Nur 30." },
        { cells: ["Meminta izin sebelum memakai barang teman"], fields: [{ options: KEL, answer: "sesama" }], ok: "✓ Poin 4." },
        { cells: ["Perkelahian antarkelompok"], fields: [{ options: KEL, answer: "terlarang" }], ok: "✓" },
        { cells: ["Saling menasihati dalam kebaikan"], fields: [{ options: KEL, answer: "sesama" }], ok: "✓ Poin 8." },
        { cells: ["Menutup aurat"], fields: [{ options: KEL, answer: "lawan" }], ok: "✓ al-Ahzab 59." },
        { cells: ["Penggunaan narkoba"], fields: [{ options: KEL, answer: "terlarang" }], ok: "✓" },
        { cells: ["Berbicara dengan sopan: permisi, maaf, tolong, terima kasih"], fields: [{ options: KEL, answer: "sesama" }], ok: "✓ Poin 6. Slide: “Kata-katamu adalah kualitas dirimu.”" },
        { cells: ["Tidak berpacaran"], fields: [{ options: KEL, answer: "lawan" }], ok: "✓ Poin 5 (al-Isra’ 32)." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Tangga Ukhuwah",
      title: "Tingkatan Ukhuwah Mana?", desc: "Ta’awun dan tafahum sengaja tidak diuji di sini karena arti versi slide (saling menolong vs saling membantu) hampir sama.",
      headers: ["Perilaku", "Tingkatan"],
      rows: [
        { cells: ["Memberikan kursi terakhir di bus kepada teman yang sedang sakit, padahal diri sendiri lelah"], fields: [{ options: ["Ta’aruf", "Tafahum", "Ta’awun", "Takaful", "Itsar"], answer: "Itsar" }], ok: "✓ Mendahulukan yang lebih membutuhkan." },
        { cells: ["Berkenalan dan saling memahami latar belakang teman baru di kelas"], fields: [{ options: ["Ta’aruf", "Tafahum", "Ta’awun", "Takaful", "Itsar"], answer: "Ta’aruf" }], ok: "✓ Tingkat pertama." },
        { cells: ["Ikut merasakan kesedihan teman yang orang tuanya wafat dan menemaninya"], fields: [{ options: ["Ta’aruf", "Tafahum", "Ta’awun", "Takaful", "Itsar"], answer: "Takaful" }], ok: "✓ Empati (versi slide)." },
      ]
    }
  ],
  flashcards: [
    { tag: "Makna", q: "Konsep yang mengatur hubungan dengan sesama manusia (muslim maupun kafir)?", a: "Habluminannas." },
    { tag: "Makna", q: "Tujuan habluminannas?", a: "Menciptakan keharmonisan dan tasamuh (toleransi) dalam mu’amalah serta menghindari konflik." },
    { tag: "Ukhuwah", q: "5 tingkatan ukhuwah islamiyah (urut)?", a: "Ta’aruf • Tafahum • Ta’awun • Takaful • Itsar." },
    { tag: "Ukhuwah", q: "Arti itsar?", a: "Mendahulukan muslim lain yang lebih membutuhkan." },
    { tag: "Ukhuwah", q: "Arti takaful menurut slide?", a: "Empati. (➕ umumnya: saling menanggung.)" },
    { tag: "Sesama", q: "8 adab pergaulan sesama muslim?", a: "Salam • jabat tangan • cari teman baik • meminta izin • hormati yang tua & sayangi yang muda • bicara sopan • tidak saling menghina • saling menasihati." },
    { tag: "Dalil", q: "Dalil meminta izin dan memberi salam sebelum masuk rumah?", a: "QS. an-Nur [24]: 27." },
    { tag: "Hadis", q: "Perumpamaan teman baik dan buruk?", a: "Pembawa minyak wangi dan peniup api pandai besi (HR. Bukhari)." },
    { tag: "Lawan jenis", q: "6 batas pergaulan antar lawan jenis?", a: "Menutup aurat • menundukkan pandangan • tidak menyentuh • tidak berdua-duaan • tidak berpacaran • tidak berzina." },
    { tag: "Dalil", q: "Dalil larangan mendekati zina?", a: "QS. al-Isra’ [17]: 32." },
    { tag: "Hadis", q: "Hadis tentang menyentuh lawan jenis yang tidak halal?", a: "“Ditusuk jarum besi masih lebih baik daripada menyentuh wanita yang tidak halal baginya.” (HR. Thabrani)" },
    { tag: "Terlarang", q: "3 pergaulan terlarang?", a: "Mengonsumsi khamar • penggunaan narkoba • perkelahian antarkelompok/tawuran." }
  ],
  quiz: [
    { q: "Dalam Islam, hubungan dengan sesama manusia, baik muslim maupun non-muslim, diatur dalam konsep …", opts: ["Hablumminallah", "Habluminannas", "Ukhuwah wathaniyah", "Ta’abbudi"], ans: 1, exp: "Slide “Makna pergaulan dalam Islam”.", optExp: ["Hubungan dengan Allah.", "Benar.", "Bukan istilah slide.", "Bukan."] },
    { q: "Tujuan habluminannas menurut slide adalah …", opts: ["Menyamakan semua agama", "Menciptakan keharmonisan dan tasamuh serta menghindari konflik", "Membatasi pergaulan hanya dengan sesama muslim", "Mencari keuntungan"], ans: 1, exp: "Keharmonisan + toleransi + hindari konflik.", optExp: ["Itu pluralisme (P10).", "Benar.", "Keliru.", "Bukan."] },
    { q: "Tingkatan tertinggi ukhuwah islamiyah, yaitu mendahulukan muslim lain yang lebih membutuhkan, disebut …", opts: ["Ta’awun", "Takaful", "Itsar", "Tafahum"], ans: 2, exp: "Tingkat ke-5.", optExp: ["Tingkat 3.", "Tingkat 4.", "Benar.", "Tingkat 2."] },
    { q: "Urutan tingkatan ukhuwah islamiyah yang benar adalah …", opts: ["Ta’aruf – Tafahum – Ta’awun – Takaful – Itsar", "Ta’awun – Ta’aruf – Itsar – Takaful – Tafahum", "Itsar – Takaful – Ta’awun – Tafahum – Ta’aruf", "Tafahum – Ta’aruf – Takaful – Ta’awun – Itsar"], ans: 0, exp: "Dari mengenal sampai mendahulukan.", optExp: ["Benar.", "Acak.", "Terbalik.", "Acak."] },
    { q: "Hadis tentang pembawa minyak wangi dan peniup api pandai besi mengajarkan adab …", opts: ["Meminta izin", "Mencari teman yang baik", "Berjabat tangan", "Menundukkan pandangan"], ans: 1, exp: "Adab sesama muslim poin 3 (HR. Bukhari).", optExp: ["Poin 4.", "Benar.", "Poin 2.", "Adab lawan jenis."] },
    { q: "QS. an-Nur [24]: 27 menjadi dalil adab …", opts: ["Menutup aurat", "Meminta izin dan memberi salam sebelum memasuki rumah orang", "Tidak berzina", "Tidak menghina"], ans: 1, exp: "“Janganlah memasuki rumah yang bukan rumahmu sebelum meminta izin dan memberi salam.”", optExp: ["al-Ahzab 59.", "Benar.", "al-Isra’ 32.", "al-Hujurat."] },
    { q: "Berikut termasuk batas pergaulan antar lawan jenis menurut slide, KECUALI …", opts: ["Menundukkan pandangan", "Tidak berdua-duaan", "Tidak berpacaran", "Tidak boleh belajar dalam satu kelas"], ans: 3, exp: "Slide tidak melarang belajar bersama di tempat terbuka.", optExp: ["Poin 2.", "Poin 4.", "Poin 5.", "Benar, bukan batas di slide."] },
    { q: "Dalil yang dipakai slide untuk larangan berpacaran adalah …", opts: ["QS. al-Isra’ [17]: 32", "QS. an-Nur [24]: 27", "QS. al-Baqarah [2]: 219", "QS. al-Hujurat [49]: 12"], ans: 0, exp: "“Janganlah kamu mendekati zina.”", optExp: ["Benar.", "Salam & izin.", "Khamar.", "Prasangka & ghibah."] },
    { q: "Yang BUKAN termasuk pergaulan terlarang menurut slide adalah …", opts: ["Mengonsumsi khamar", "Penggunaan narkoba", "Tawuran", "Bergabung dengan organisasi kampus lintas jurusan"], ans: 3, exp: "Tiga lainnya adalah pergaulan terlarang.", optExp: ["Terlarang.", "Terlarang.", "Terlarang.", "Benar, bukan terlarang."] },
    { q: "Mahasiswa yang membantu temannya mengangkat barang saat pindah kos sedang mengamalkan tingkat ukhuwah …", opts: ["Ta’aruf", "Ta’awun", "Itsar", "Takaful"], ans: 1, exp: "Ta’awun = saling membantu (al-Ma’idah 2).", optExp: ["Saling memahami/mengenal.", "Benar.", "Mendahulukan orang lain di atas diri sendiri.", "Empati/saling menanggung."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS AIK — PERTEMUAN 13*
📚 *Akhlak Pergaulan dalam Islam*

1️⃣ Habluminannas: hubungan dengan sesama (muslim & kafir) → harmonis, tasamuh, hindari konflik.
2️⃣ Ukhuwah: Ta’aruf (saling memahami*) → Tafahum (saling menolong*) → Ta’awun (saling membantu) → Takaful (empati) → Itsar (dahulukan yang lebih butuh). *arti versi slide.
3️⃣ Sesama muslim (8): salam (an-Nur 27) • jabat tangan • teman baik (minyak wangi vs pandai besi, HR. Bukhari) • minta izin • hormati tua, sayangi muda (HR. Tirmidzi) • bicara sopan • tidak menghina (al-Hujurat) • saling menasihati.
4️⃣ Lawan jenis (6): tutup aurat (al-Ahzab 59) • tundukkan pandangan (an-Nur 30) • tidak menyentuh (HR. Thabrani) • tidak berdua-duaan (HR. Bukhari-Muslim) • tidak pacaran (al-Isra’ 32) • tidak berzina.
5️⃣ Terlarang (3): khamar (al-Baqarah 219) • narkoba • tawuran.`
};
