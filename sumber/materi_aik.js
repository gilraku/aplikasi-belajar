// Materi Lengkap — AIK P1–P8 (slide + pengayaan dari rujukan yang mapan: al-Qur'an, hadis sahih yang masyhur, Manhaj Tarjih Muhammadiyah)
// Teks Arab TIDAK diketik ulang: ayat diambil langsung dari blok ayat di data_aik_pX.js yang sudah diverifikasi.
const { C, box, arrow, path, poly, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });

// ---------- ambil ayat dari data yang sudah ada ----------
const POOL = {};
function pool(p) {
  if (POOL[p]) return POOL[p];
  const f = []; const w = b => { if (Array.isArray(b)) return b.forEach(w); if (b && typeof b === "object") { if (b.type === "ayat") (b.items || []).forEach(x => f.push(x)); Object.values(b).forEach(w); } };
  w(require("./data_aik_p" + p + ".js")); return (POOL[p] = f);
}
function ay(label, title, refs) {
  const items = refs.map(([p, s, note]) => { const it = pool(p).find(x => (x.sumber || "").includes(s) || (x.title || "").includes(s)); if (!it) throw new Error("ayat tidak ada: P" + p + " " + s); const c = JSON.parse(JSON.stringify(it)); if (note) c.note = note; return c; });
  return { type: "ayat", label, title, items };
}
const T = (x, y, t, tone, size) => text(x, y, t, { size: size || 13, color: C[tone][2] });

// ================= DIAGRAM =================
const duaPeran = diagram({
  label: "Diagram Interaktif", title: "Dua Peran Manusia & Bekalnya", desc: "Klik setiap kotak untuk melihat penjelasan dan dalilnya.", minw: 560,
  svg: svg(760, 320,
    box(270, 15, 220, 70, "MANUSIA|jasmani + rohani", "violet", "mns", { size: 15 }) +
    box(20, 130, 220, 80, "‘Abdullah|hamba yang beribadah", "emerald", "abd") +
    box(270, 130, 220, 80, "Bekal:|akal • ilmu • wahyu", "amber", "bkl") +
    box(520, 130, 220, 80, "Khalifatullah|pengelola bumi", "sky", "khl") +
    arrow(320, 85, 150, 127) + arrow(380, 85, 380, 127) + arrow(440, 85, 610, 127) +
    box(20, 250, 720, 55, "Hasil: memakmurkan • mendamaikan • mensejahterakan bumi", "indigo", "tgs") +
    arrow(130, 210, 130, 247) + arrow(380, 210, 380, 247) + arrow(630, 210, 630, 247)
  ),
  parts: [
    { id: "mns", label: "Manusia", title: "Manusia: jasmani dan rohani", text: "Allah menciptakan manusia dari tanah lalu meniupkan ruh ke dalamnya (QS. Shad [38]: 71–72). Al-Ghazali menekankan bahwa <strong>hakikat manusia ada pada jiwanya</strong>, karena unsur rohani itulah yang membedakannya dari makhluk lain." },
    { id: "abd", label: "‘Abdullah", title: "Peran 1: hamba Allah", text: "QS. adz-Dzariyat [51]: 56 — jin dan manusia diciptakan untuk beribadah. Ibadah di sini luas: shalat, puasa, tetapi juga bekerja, belajar, dan berbuat baik yang diniatkan karena Allah." },
    { id: "bkl", label: "Bekal", title: "Bekal: akal, ilmu, wahyu", text: "Adam diajari nama-nama (QS. al-Baqarah [2]: 31) sehingga unggul atas malaikat. Akal dipakai untuk berpikir dan berzikir; wahyu memberi arah moralnya." },
    { id: "khl", label: "Khalifah", title: "Peran 2: khalifah di bumi", text: "QS. al-Baqarah [2]: 30. Khalifah berarti wakil/pengganti yang diberi amanah mengelola bumi, bukan pemilik bumi. Karena itu ia akan dimintai pertanggungjawaban." },
    { id: "tgs", label: "Hasil", title: "Konklusi tugas khalifah (versi slide)", text: "<strong>Memakmurkan, mendamaikan, mensejahterakan</strong> bumi. Hafalkan tiga kata ini; dosen sering memakainya di opsi jawaban." }
  ]
});

const triEpis = diagram({
  label: "Diagram Interaktif", title: "Bayani + Burhani + Irfani", desc: "Tiga pendekatan berpikir yang juga dipakai dalam Manhaj Tarjih Muhammadiyah.", minw: 560,
  svg: svg(760, 250,
    box(20, 15, 220, 90, "BAYANI|teks wahyu", "amber", "bay", { size: 15 }) +
    box(270, 15, 220, 90, "BURHANI|akal & sains", "sky", "bur", { size: 15 }) +
    box(520, 15, 220, 90, "IRFANI|hati & pengalaman batin", "violet", "irf", { size: 15 }) +
    arrow(130, 105, 320, 167) + arrow(380, 105, 380, 167) + arrow(630, 105, 440, 167) +
    box(230, 170, 300, 65, "= Wakil Allah di bumi", "emerald", "hsl", { size: 16 })
  ),
  parts: [
    { id: "bay", label: "Bayani", title: "Bayani: pendekatan teks", text: "Memahami al-Qur’an dan Sunnah melalui ilmu-ilmunya: ulum al-Qur’an, ulum al-Hadis, ushul fiqh, bahasa Arab." },
    { id: "bur", label: "Burhani", title: "Burhani: pendekatan rasional-empiris", text: "Memakai ilmu sosial dan kealaman (sains). Syaratnya: <strong>tidak bertentangan dengan wahyu</strong>. Inilah bedanya dengan liberalisme yang berpikir bebas tanpa wahyu." },
    { id: "irf", label: "Irfani", title: "Irfani: pendekatan hati", text: "Kepekaan nurani dan kebersihan hati untuk mendekatkan diri kepada Allah, sehingga ilmu melahirkan akhlak." },
    { id: "hsl", label: "Hasil", title: "Paduan ketiganya", text: "➕ Muhammadiyah merumuskan ketiga pendekatan ini dalam <strong>Manhaj Tarjih</strong> sebagai cara memahami agama: teks dipahami dengan akal yang jernih dan hati yang bersih. Orang yang memadukannya layak menjadi wakil Allah di bumi." }
  ]
});

const rumahIslam = diagram({
  label: "Diagram Interaktif", title: "Bangunan Ajaran Islam", desc: "Aqidah adalah fondasi, syari’ah adalah tiangnya, akhlak adalah atap yang terlihat orang.", minw: 520,
  svg: svg(760, 330,
    poly("380,12 710,110 50,110", "violet", "akh", "AKHLAK", 380, 80, { size: 17 }) +
    box(100, 122, 230, 128, "IBADAH|mahdhah &|ghairu mahdhah", "sky", "ibd") +
    box(430, 122, 230, 128, "MU’AMALAH|sosial, ekonomi,|politik, iptek", "amber", "mua") +
    text(380, 186, "Syari’ah", { size: 13, color: "#475569" }) +
    box(50, 262, 660, 58, "AQIDAH (fondasi) • Rukun Iman", "emerald", "aqd", { size: 15 })
  ),
  parts: [
    { id: "aqd", label: "Aqidah", title: "Fondasi: aqidah", text: "Keyakinan yang terikat kokoh di hati (6 rukun iman). Tanpa fondasi, bangunan runtuh: amal tanpa iman tidak bernilai di akhirat (QS. al-Kahfi [18]: 105, dibahas di P5)." },
    { id: "ibd", label: "Ibadah", title: "Tiang 1: ibadah", text: "Hubungan dengan Allah (hablun minallah). Ibadah mahdhah sudah diatur rinci (shalat, puasa, zakat, haji, thaharah); ghairu mahdhah aturannya umum." },
    { id: "mua", label: "Mu’amalah", title: "Tiang 2: mu’amalah", text: "Hubungan dengan sesama (hablun minannas): jual beli, bertetangga, berpolitik, mengembangkan iptek. ➕ Kaidah fikih: <em>hukum asal mu’amalah adalah boleh</em>, sampai ada dalil yang melarang." },
    { id: "akh", label: "Akhlak", title: "Atap: akhlak", text: "Yang paling tampak dari luar. Akhlak kepada Allah, Rasul, diri sendiri, orang tua, sesama, dan alam. ➕ Nabi saw. bersabda: “Sesungguhnya aku diutus untuk menyempurnakan akhlak yang mulia.” (HR. Ahmad dan al-Baihaqi)" }
  ]
});

const islamImanIhsan = diagram({
  label: "Diagram Interaktif • ➕ Tambahan", title: "Islam, Iman, Ihsan (Hadis Jibril)", desc: "Tiga tingkatan beragama yang diajarkan Malaikat Jibril kepada para sahabat (HR. Muslim).", minw: 560,
  svg: svg(760, 190,
    box(20, 40, 210, 110, "ISLAM|amal lahir|(5 rukun Islam)", "sky", "isl") + arrow(232, 95, 272, 95) +
    box(275, 40, 210, 110, "IMAN|keyakinan hati|(6 rukun iman)", "emerald", "imn") + arrow(487, 95, 527, 95) +
    box(530, 40, 210, 110, "IHSAN|merasa dilihat|Allah", "violet", "ihs")
  ),
  parts: [
    { id: "isl", label: "Islam", title: "Islam", text: "Bersyahadat, mendirikan shalat, menunaikan zakat, berpuasa Ramadhan, dan berhaji bila mampu. Inilah sisi lahiriah agama." },
    { id: "imn", label: "Iman", title: "Iman", text: "Beriman kepada Allah, malaikat, kitab, rasul, hari akhir, dan qadar yang baik maupun buruk. Inilah isi hati (aqidah, P3 & P7)." },
    { id: "ihs", label: "Ihsan", title: "Ihsan", text: "“Engkau menyembah Allah seakan-akan engkau melihat-Nya; jika engkau tidak melihat-Nya, sesungguhnya Dia melihatmu.” Inilah puncak kualitas beragama dan sumber akhlak." }
  ]
});

const lingkupAqidah = diagram({
  label: "Diagram Interaktif", title: "4 Lingkup Pembahasan Aqidah", desc: "Klik tiap lingkup. Perhatikan: keempatnya sejajar dengan rukun iman.", minw: 540,
  svg: svg(760, 300,
    path("M290,140 L250,95", { noArrow: true }) + path("M470,140 L510,95", { noArrow: true }) + path("M290,160 L250,205", { noArrow: true }) + path("M470,160 L510,205", { noArrow: true }) +
    box(290, 115, 180, 70, "AQIDAH", "emerald", "aq", { size: 17 }) +
    box(20, 15, 240, 85, "ILAHIYAT|tentang Allah", "amber", "ilh") +
    box(500, 15, 240, 85, "NUBUWAT|nabi, rasul, kitab", "sky", "nub") +
    box(20, 200, 240, 85, "RUHANIYAT|alam gaib", "violet", "ruh") +
    box(500, 200, 240, 85, "SAM’IYYAT|hanya lewat wahyu", "rose", "sam")
  ),
  parts: [
    { id: "aq", label: "Aqidah", title: "Sumber aqidah", text: "Al-Qur’an dan Sunnah. Akal, pengalaman, dan intuisi adalah <strong>sarana</strong> untuk memahami nash, bukan sumber utama." },
    { id: "ilh", label: "Ilahiyat", title: "Ilahiyat", text: "Segala yang berhubungan dengan Allah: wujud-Nya, nama-nama (asma’), sifat, dan perbuatan (af’al)-Nya. ≈ Iman kepada Allah dan qadar." },
    { id: "nub", label: "Nubuwat", title: "Nubuwat", text: "Nabi dan rasul, kitab-kitab Allah, mukjizat, karamah. ≈ Iman kepada rasul dan kitab." },
    { id: "ruh", label: "Ruhaniyat", title: "Ruhaniyat", text: "Makhluk gaib: malaikat, jin, iblis, setan, ruh. ≈ Iman kepada malaikat." },
    { id: "sam", label: "Sam’iyyat", title: "Sam’iyyat", text: "Hal yang hanya bisa diketahui lewat wahyu (sam’u = mendengar): alam barzakh, kiamat, surga, neraka, tanda-tanda kiamat. ≈ Iman kepada hari akhir." }
  ]
});

const jangkauan = diagram({
  label: "Diagram Interaktif", title: "Jangkauan Indera, Akal, dan Wahyu", desc: "Ringkasan dari 8 kaidah aqidah: setiap alat pengetahuan punya batas. Klik tiap lapisan.", minw: 520,
  svg: svg(760, 300,
    box(15, 10, 730, 280, "", "violet", "why") + T(380, 34, "WAHYU: menjangkau yang gaib (malaikat, akhirat, siapa Tuhan)", "violet", 14) +
    box(80, 55, 600, 220, "", "sky", "akl") + T(380, 80, "AKAL: menjangkau yang terikat ruang & waktu", "sky", 14) +
    box(165, 105, 430, 155, "", "amber", "ind") + T(380, 135, "INDERA: yang bisa dilihat, didengar, diraba", "amber", 13) +
    box(250, 165, 260, 70, "Kita meyakini sesuatu|yang terindera", "white", "fat", { size: 12 })
  ),
  parts: [
    { id: "ind", label: "Indera", title: "Indera (kaidah 1–3)", text: "Yang dijangkau indera diyakini adanya, kecuali akal menolaknya berdasar pengalaman (fatamorgana). Tetapi <strong>tidak terindera ≠ tidak ada</strong>, dan khayalan manusia hanya tersusun dari hal yang pernah diinderanya." },
    { id: "akl", label: "Akal", title: "Akal (kaidah 4)", text: "Akal hanya menjangkau hal yang terikat ruang dan waktu. Karena itu <strong>Dzat Allah tidak bisa dipikirkan</strong>; yang dipikirkan adalah ciptaan-Nya. ➕ Dalam hadis: “Pikirkanlah ciptaan Allah, dan jangan memikirkan Dzat Allah.” (diriwayatkan Abu Nu’aim dan lainnya; dinilai hasan oleh sebagian ahli hadis)" },
    { id: "why", label: "Wahyu", title: "Wahyu & berita jujur (kaidah 5)", text: "Keyakinan juga diperoleh dari berita orang yang terpercaya. Kita percaya malaikat dan akhirat karena dikabarkan Nabi saw. yang terkenal jujur (al-Amin)." },
    { id: "fat", label: "Contoh", title: "Contoh sehari-hari", text: "Kamu yakin Jakarta ada walau belum pernah ke sana, karena banyak orang jujur memberitakannya. Begitu juga keyakinan pada yang gaib berdasar berita Nabi." }
  ]
});

const tanggaTauhid = diagram({
  label: "Diagram Interaktif", title: "Tangga 4 Tauhid: at-Talazum & at-Tadhamun", desc: "Naik = kemestian (talazum). Turun = cakupan (tadhamun). Klik anak tangga dan panahnya.", minw: 560,
  svg: svg(760, 390,
    box(20, 245, 170, 70, "1. RUBUBIYAH|Pencipta-Pemelihara", "amber", "rub", { size: 12 }) +
    box(205, 175, 170, 70, "2. MULKIYAH|Pemilik-Raja", "sky", "mul", { size: 12 }) +
    box(390, 105, 170, 70, "3. ULUHIYAH|Satu-satunya disembah", "emerald", "ulu", { size: 12 }) +
    box(575, 35, 165, 70, "4. ASMA’ WA SIFAT|Nama & sifat", "violet", "asm", { size: 12 }) +
    path("M105,240 L105,215 L195,215", {}) + path("M290,170 L290,145 L380,145", {}) + path("M475,100 L475,75 L565,75", {}) +
    box(20, 335, 350, 45, "→ at-Talazum: kemestian (naik)", "indigo", "tlz", { size: 13 }) +
    box(390, 335, 350, 45, "← at-Tadhamun: cakupan (turun)", "rose", "tdh", { size: 13 })
  ),
  parts: [
    { id: "rub", label: "Rububiyah", title: "Tauhid Rububiyah", text: "Allah satu-satunya Pencipta, Pengasuh, Pemberi rezeki, dan Pemelihara. ➕ Musyrikin Makkah pun mengakui ini (QS. Luqman [31]: 25), tetapi tetap menyembah berhala. Jadi Rububiyah saja <strong>belum cukup</strong>." },
    { id: "mul", label: "Mulkiyah", title: "Tauhid Mulkiyah", text: "Allah satu-satunya Pemilik dan Raja yang berhak membuat aturan. Konsekuensinya: hukum dan aturan Allah di atas aturan buatan siapa pun." },
    { id: "ulu", label: "Uluhiyah", title: "Tauhid Uluhiyah/Ubudiyah", text: "Hanya Allah yang disembah, dimintai pertolongan, dan tempat berlindung. Inilah inti dakwah semua rasul dan isi <em>iyyāka na‘budu wa iyyāka nasta‘īn</em>." },
    { id: "asm", label: "Asma’ wa Sifat", title: "Tauhid Asma’ wa Sifat", text: "Menetapkan nama dan sifat Allah sebagaimana disebut al-Qur’an dan hadis, tanpa menyerupakan dengan makhluk. ➕ “Tidak ada sesuatu pun yang serupa dengan-Nya.” (QS. asy-Syura [42]: 11)" },
    { id: "tlz", label: "at-Talazum", title: "at-Talazum (kemestian)", text: "Siapa yang yakin Allah Pencipta <strong>semestinya</strong> yakin Allah Raja, lalu semestinya hanya menyembah-Nya, lalu mengakui nama dan sifat-Nya. Logika: dari yang diakui menuju yang dituntut." },
    { id: "tdh", label: "at-Tadhamun", title: "at-Tadhamun (cakupan)", text: "Siapa yang sudah bertauhid Uluhiyah <strong>pasti sudah mencakup</strong> Mulkiyah dan Rububiyah. Tingkat atas mengandung tingkat bawah." }
  ]
});

const anNas = diagram({
  label: "Diagram Interaktif", title: "Pemetaan QS. an-Nas 1–3", desc: "Tiga sebutan Allah dalam surah an-Nas sejajar dengan tiga tauhid pertama.", minw: 480,
  svg: svg(760, 245,
    [["Rabbin-nās|Tuhan manusia", "Tauhid Rububiyah", "amber", "r"], ["Malikin-nās|Raja manusia", "Tauhid Mulkiyah", "sky", "m"], ["Ilāhin-nās|Sembahan manusia", "Tauhid Uluhiyah", "emerald", "i"]]
      .map(([a, b, c, id], k) => { const y = 15 + k * 78; return box(20, y, 260, 62, a, c, id, { size: 14 }) + arrow(285, y + 31, 475, y + 31) + box(480, y, 260, 62, b, c, id, { size: 14 }); }).join("")
  ),
  parts: [
    { id: "r", label: "Rabb", title: "Ayat 1: Rabb", text: "Rabb = yang mencipta, mendidik, memelihara → Rububiyah." },
    { id: "m", label: "Malik", title: "Ayat 2: Malik", text: "Malik = raja, penguasa → Mulkiyah." },
    { id: "i", label: "Ilah", title: "Ayat 3: Ilah", text: "Ilah = yang disembah → Uluhiyah. Urutannya sama dengan arah at-Talazum." }
  ]
});

const nafyuItsbat = diagram({
  label: "Diagram Interaktif", title: "Nafyu lalu Itsbat", desc: "Seperti mencuci gelas sebelum diisi air bersih. Klik tiap tahap.", minw: 560,
  svg: svg(760, 210,
    box(20, 30, 210, 110, "Hati berisi|banyak “sesembahan”|(harta, jabatan, jimat…)", "slate", "awal", { size: 12 }) + arrow(232, 85, 268, 85) +
    box(272, 30, 210, 110, "LĀ ILĀHA|an-Nafyu|(kosongkan)", "rose", "nfy", { size: 14 }) + arrow(484, 85, 520, 85) +
    box(525, 30, 215, 110, "ILLALLĀH|al-Itsbat|(tetapkan)", "emerald", "itb", { size: 14 }) +
    text(380, 180, "≈ QS. al-Baqarah 256: ingkar kepada thagut, lalu beriman kepada Allah", { size: 13, color: "#475569", weight: 600 })
  ),
  parts: [
    { id: "awal", label: "Sebelum", title: "Sebelum bersyahadat dengan sadar", text: "“Sesembahan” tidak selalu berhala. Apa pun yang lebih dicintai, ditakuti, atau ditaati melebihi Allah bisa menjadi ilah: uang, jabatan, popularitas, hawa nafsu (➕ QS. al-Jatsiyah [45]: 23 menyebut orang yang menjadikan hawa nafsunya sebagai tuhan)." },
    { id: "nfy", label: "Nafyu", title: "an-Nafyu: peniadaan", text: "<em>Lā ilāha</em> = tidak ada sesembahan. Semua yang selain Allah dicopot dari kedudukan “yang disembah”." },
    { id: "itb", label: "Itsbat", title: "al-Itsbat: penetapan", text: "<em>Illallāh</em> = kecuali Allah. Setelah dikosongkan, hanya Allah yang ditetapkan sebagai satu-satunya yang berhak disembah." }
  ]
});

const ifrath = diagram({
  label: "Diagram Interaktif", title: "‘Abduhu wa Rasuluhu: Sikap Tengah kepada Nabi", desc: "Dua kata dalam syahadat kedua menolak dua sikap ekstrem.", minw: 560,
  svg: svg(760, 230,
    box(20, 40, 200, 110, "IFRATH|berlebihan:|mengkultuskan", "rose", "ifr", { size: 13 }) +
    box(270, 30, 220, 130, "SIKAP BENAR|Muhammad hamba|& utusan Allah", "emerald", "tgh", { size: 14 }) +
    box(540, 40, 200, 110, "TAFRITH|meremehkan:|mengabaikan ajaran", "amber", "tfr", { size: 13 }) +
    arrow(268, 95, 224, 95) + arrow(492, 95, 536, 95) +
    text(246, 190, "‘abduhu menolak ←", { size: 13, color: C.rose[2] }) + text(514, 190, "→ rasuluhu menolak", { size: 13, color: C.amber[2] })
  ),
  parts: [
    { id: "ifr", label: "Ifrath", title: "Ifrath (berlebihan)", text: "Menganggap Nabi punya sifat ketuhanan, berdoa kepada beliau, atau memuji melampaui batas. Ditolak oleh kata <strong>‘abduhu</strong>: beliau tetap hamba Allah." },
    { id: "tgh", label: "Tengah", title: "Wasath (tengah)", text: "Mencintai, menaati, dan meneladani Nabi sebagai <strong>uswah hasanah</strong> (QS. al-Ahzab [33]: 21), tanpa menuhankan beliau." },
    { id: "tfr", label: "Tafrith", title: "Tafrith (meremehkan)", text: "Menganggap Nabi orang biasa yang sunnahnya boleh diabaikan. Ditolak oleh kata <strong>rasuluhu</strong>: beliau utusan yang membawa wahyu." }
  ]
});

const perjalanan = diagram({
  label: "Diagram Interaktif", title: "Perjalanan Hidup Manusia", desc: "Klik setiap alam. Hanya di alam dunia manusia bisa beramal.", minw: 600,
  svg: svg(780, 170,
    [["Alam|Ruh", "violet", "ruh"], ["Alam|Dunia", "emerald", "dun"], ["Alam|Barzakh", "slate", "brz"], ["Alam|Akhirat", "amber", "akh"], ["Surga /|Neraka", "rose", "sn"]]
      .map(([t, c, id], i) => { const x = 10 + i * 155; return box(x, 35, 135, 90, t, c, id, { size: 15, sw: id === "dun" ? 4 : 2 }) + (i < 4 ? arrow(x + 137, 80, x + 153, 80) : ""); }).join("") +
    text(232, 150, "▲ kita sekarang di sini", { size: 12, color: C.emerald[2] })
  ),
  parts: [
    { id: "ruh", label: "Ruh", title: "Alam ruh", text: "Ruh manusia telah bersaksi bahwa Allah adalah Tuhannya (QS. al-A’raf [7]: 172). Inilah dasar fitrah bertuhan." },
    { id: "dun", label: "Dunia", title: "Alam dunia", text: "Tempat ujian dan beramal (QS. al-Mulk [67]: 2 ➕: Allah menciptakan mati dan hidup untuk menguji siapa yang paling baik amalnya). Iman pasti diuji (QS. al-‘Ankabut [29]: 2)." },
    { id: "brz", label: "Barzakh", title: "Alam kubur (barzakh)", text: "Barzakh berarti “dinding pemisah” antara dunia dan akhirat sampai hari kebangkitan (QS. al-Mu’minun [23]: 100). Amal sudah terputus, ➕ kecuali tiga: sedekah jariyah, ilmu yang bermanfaat, dan anak saleh yang mendoakan (HR. Muslim)." },
    { id: "akh", label: "Akhirat", title: "Alam akhirat", text: "Kiamat, kebangkitan, padang mahsyar, hisab, mizan (timbangan amal). Semua diketahui lewat wahyu (sam’iyyat)." },
    { id: "sn", label: "Surga/Neraka", title: "Tempat kembali yang kekal", text: "Balasan atas iman dan amal. Karena itu manusia tidak diciptakan main-main (QS. al-Mu’minun [23]: 115)." }
  ]
});

const pohonIbadah = diagram({
  label: "Diagram Interaktif", title: "Pohon Ibadah", desc: "Klik cabang untuk melihat kaidah dan contohnya.", minw: 540,
  svg: svg(760, 300,
    box(270, 10, 220, 60, "IBADAH", "indigo", "ib", { size: 17 }) +
    path("M330,70 L180,110") + path("M430,70 L580,110") +
    box(30, 112, 300, 80, "MAHDHAH (khusus)|semua dilarang kecuali|yang diperintahkan", "emerald", "mh", { size: 13 }) +
    box(430, 112, 300, 80, "GHAIRU MAHDHAH (umum)|boleh selama|tidak dilarang", "sky", "gm", { size: 13 }) +
    box(30, 215, 300, 70, "Thaharah • Shalat • Zakat|Puasa • Haji", "white", "mhc", { size: 13 }) +
    box(430, 215, 300, 70, "Belajar • Bekerja • Birrul walidain|Bertetangga • Berorganisasi", "white", "gmc", { size: 12 }) +
    arrow(180, 192, 180, 212) + arrow(580, 192, 580, 212)
  ),
  parts: [
    { id: "ib", label: "Ibadah", title: "Definisi Ibnu Taimiyah", text: "Nama untuk segala sesuatu yang dicintai dan diridai Allah, berupa ucapan dan perbuatan, yang lahir maupun batin." },
    { id: "mh", label: "Mahdhah", title: "Ibadah mahdhah", text: "Tata caranya sudah ditetapkan rinci. Menambah atau mengurangi = <strong>bid’ah</strong>. ➕ Nabi saw.: “Barang siapa mengada-adakan dalam urusan (agama) kami ini sesuatu yang bukan darinya, maka ia tertolak.” (HR. al-Bukhari dan Muslim)" },
    { id: "gm", label: "Ghairu mahdhah", title: "Ibadah ghairu mahdhah", text: "Aturannya umum. Caranya boleh berkembang (kuliah online, aplikasi sedekah, dakwah lewat media sosial) dan <strong>bukan bid’ah</strong>. Bernilai ibadah jika niatnya karena Allah dan caranya tidak melanggar syariat." },
    { id: "mhc", label: "Contoh mahdhah", title: "Contoh ibadah mahdhah", text: "Thaharah, shalat, zakat, puasa, haji. Contoh pelanggaran: menambah rakaat shalat Subuh menjadi 3." },
    { id: "gmc", label: "Contoh ghairu mahdhah", title: "Contoh ibadah ghairu mahdhah", text: "Menuntut ilmu, mencari nafkah halal, berbakti kepada orang tua, membantu tetangga, menjaga lingkungan, berorganisasi." }
  ]
});

const saringan = diagram({
  label: "Diagram Interaktif", title: "Dua Saringan Diterimanya Ibadah", desc: "Amal harus lolos keduanya. Klik setiap saringan.", minw: 560,
  svg: svg(760, 200,
    box(15, 55, 150, 80, "AMAL", "slate", "aml", { size: 16 }) + arrow(167, 95, 197, 95) +
    box(200, 30, 170, 130, "Saringan 1|IKHLAS|(niat karena Allah)", "violet", "ikh", { size: 13 }) + arrow(372, 95, 402, 95) +
    box(405, 30, 170, 130, "Saringan 2|ITTIBA’|(sesuai tuntunan Rasul)", "sky", "itt", { size: 13 }) + arrow(577, 95, 607, 95) +
    box(610, 55, 135, 80, "DITERIMA", "emerald", "ok", { size: 15 })
  ),
  parts: [
    { id: "aml", label: "Amal", title: "Amal", text: "Setiap ucapan dan perbuatan yang ingin bernilai ibadah." },
    { id: "ikh", label: "Ikhlas", title: "Syarat 1: ikhlas", text: "Bebas dari syirik besar dan kecil (riya’). ➕ “Sesungguhnya setiap amal bergantung pada niatnya.” (HR. al-Bukhari dan Muslim). Dalil slide: QS. az-Zumar [39]: 11." },
    { id: "itt", label: "Ittiba’", title: "Syarat 2: sesuai tuntunan Rasul", text: "Terutama untuk ibadah mahdhah. Bukti cinta kepada Allah adalah mengikuti Rasul (QS. Ali ‘Imran [3]: 31)." },
    { id: "ok", label: "Diterima", title: "Lolos keduanya", text: "Ikhlas tetapi caranya salah → tertolak. Caranya benar tetapi riya’ → tertolak. Keduanya harus ada." }
  ]
});

const petaUts = diagram({
  label: "Diagram Interaktif", title: "Peta Materi UTS AIK (P1–P7)", desc: "Alur besar: siapa manusia → agama apa yang dipilih → apa fondasinya → bagaimana mewujudkannya. Klik setiap pertemuan.", minw: 600,
  svg: svg(780, 280,
    box(10, 20, 170, 80, "P1|Hakikat Manusia", "violet", "p1") + arrow(182, 60, 208, 60) +
    box(210, 20, 170, 80, "P2|Islam Agama Pilihan", "sky", "p2") + arrow(382, 60, 408, 60) +
    box(410, 20, 170, 80, "P3|Aqidah", "emerald", "p3") + arrow(582, 60, 608, 60) +
    box(610, 20, 160, 80, "P4|Kuis P1–P3", "slate", "p4") +
    path("M690,100 L690,140 L95,140 L95,168") +
    box(10, 170, 240, 85, "P5|Tauhidullah", "amber", "p5") + arrow(252, 212, 278, 212) +
    box(280, 170, 230, 85, "P6|Konsekuensi Syahadat", "rose", "p6") + arrow(512, 212, 538, 212) +
    box(540, 170, 230, 85, "P7|Iman, Ibadah, Khalifah", "indigo", "p7")
  ),
  parts: [
    { id: "p1", label: "P1", title: "P1 Hakikat Manusia", text: "Iqbal (mulia, wakil Tuhan), Gibran (cinta), al-Ghazali (jiwa) • al-Baqarah 30–33 • akal: berpikir + berzikir • Bayani-Burhani-Irfani • memakmurkan, mendamaikan, mensejahterakan." },
    { id: "p2", label: "P2", title: "P2 Islam sebagai Agama Pilihan", text: "Makna Islam • ad-Din & asy-Syariah • Qur’an vs Sunnah (lafaz–makna) • 4 sistematika • 6 karakteristik + dalil • toleransi ≠ pluralisme agama." },
    { id: "p3", label: "P3", title: "P3 Aqidah", text: "Ikatan kokoh • Hasan al-Banna vs al-Jazairy • 5 istilah • 4 lingkup • 8 kaidah • dalil fitrah, aqli, naqli." },
    { id: "p4", label: "P4", title: "P4 Kuis", text: "Studi kasus dari P1–P3. Pola “kecuali”, pilih yang moderat dan paling lengkap." },
    { id: "p5", label: "P5", title: "P5 Tauhidullah", text: "Rububiyah, Mulkiyah, Uluhiyah, Asma’ wa Sifat • at-Talazum & at-Tadhamun • an-Nas 1–3 • al-Kahfi 105." },
    { id: "p6", label: "P6", title: "P6 Konsekuensi Syahadat", text: "Nafyu & itsbat • ‘abduhu (tolak ifrath) & rasuluhu (tolak tafrith) • uswah hasanah • 11 pembatal." },
    { id: "p7", label: "P7", title: "P7 Iman, Ibadah, Khalifah", text: "6 rukun iman • Abduh • perjalanan hidup • 2 syarat ibadah • mahdhah vs ghairu mahdhah • 6 prinsip ibadah • ma’rifatullah." }
  ]
});

// ================= MATERI =================
const M = {
  p1: [
    A("Mengapa Kita Perlu Mengenal Diri?", `<p>Pertanyaan “siapa manusia?” sudah diperdebatkan sejak zaman Yunani. Jawabannya menentukan cara kita hidup. Jika manusia dianggap sekadar materi (<strong>materialisme</strong>), hidup hanya mengejar benda. Jika manusia dianggap bebas tanpa batas (<strong>liberalisme</strong>, <strong>eksistensialisme</strong>), nilai baik-buruk ditentukan sendiri. <strong>Idealisme</strong> menekankan ide dan akal di atas materi.</p>
<p>Islam memberi jawaban yang utuh: manusia adalah makhluk ciptaan Allah yang terdiri dari <strong>jasmani dan rohani</strong>, dimuliakan, diberi akal, dan dibebani dua peran: <strong>hamba Allah</strong> dan <strong>khalifah di bumi</strong>.</p>
<p>Menurut slide, memahami hakikat manusia berguna agar kita: (1) punya pedoman dasar berbuat sebagai wakil Allah yang mengelola bumi demi kesejahteraan, kedamaian, dan keadilan; (2) berlaku manusiawi kepada sesama; (3) menjalani hidup yang lebih terarah dan bermakna.</p>`, "Bagian 1 • Pengantar"),
    A("Istilah Manusia dalam al-Qur’an", `<p>➕ <strong>Tambahan:</strong> al-Qur’an memakai beberapa kata untuk manusia. Setiap kata menyoroti sisi yang berbeda. Pembagian ini lazim dijelaskan dalam buku-buku Pendidikan Agama Islam di perguruan tinggi.</p>`, "Bagian 2 • ➕ Tambahan"),
    { type: "table", label: "Tabel Interaktif", title: "Empat Sebutan Manusia", headers: ["Istilah", "Sisi yang disorot", "Contoh penggunaan"],
      rows: [["al-Basyar", "Biologis: makan, minum, tumbuh, mati", "Nabi pun disebut basyar (QS. al-Kahfi [18]: 110)"], ["al-Insan", "Psikologis-spiritual: berakal, berilmu, bisa lalai", "Allah mengajarkan manusia apa yang tidak diketahuinya (QS. al-‘Alaq [96]: 5)"], ["an-Nas", "Sosial: manusia sebagai kelompok/masyarakat", "QS. an-Nas; QS. al-Hujurat [49]: 13"], ["Bani Adam", "Asal-usul: semua keturunan Adam, dimuliakan", "“Sungguh, Kami telah memuliakan anak cucu Adam” (QS. al-Isra’ [17]: 70)"]],
      modes: [{ label: "Kaitan dengan Gibran", target: "row", row: 2, title: "Individu sekaligus sosial", text: "Pandangan Gibran bahwa manusia makhluk individu sekaligus sosial cocok dengan kata <em>an-nas</em> dan <em>al-insan</em>." },
        { label: "Kaitan dengan al-Ghazali", target: "row", row: 1, title: "Sisi rohani", text: "Al-Ghazali menekankan jiwa: sisi yang disorot kata <em>al-insan</em>." }] },
    A("Tiga Tokoh, Tiga Penekanan", `<p><strong>Muhammad Iqbal (1873–1938)</strong>, penyair-filsuf dari anak benua India. Ia memandang manusia sebagai makhluk paling mulia dan wakil Tuhan di bumi. Kebebasan manusia adalah <strong>amanah</strong>, bukan kebebasan tanpa batas. Ia mengkritik pemikir yang melihat manusia dari satu sisi saja. ➕ Gagasannya tentang <em>khudi</em> (diri/ego) mengajak manusia mengembangkan potensi diri secara kreatif dalam bimbingan iman.</p>
<p><strong>Kahlil Gibran (1883–1931)</strong>, penyair-filsuf Lebanon. Ia menekankan martabat manusia dan <strong>cinta</strong>: dari cinta diri, ke cinta sesama, sampai puncaknya cinta kepada Pencipta. (Catatan: Gibran berlatar Kristen Maronit, jadi lebih tepat disebut tokoh pemikir daripada tokoh Muslim seperti tertulis di slide.)</p>
<p><strong>Imam al-Ghazali (1058–1111)</strong>, ulama besar penulis <em>Ihya’ ‘Ulumiddin</em>. Manusia tersusun dari jasmani dan rohani (QS. Shad [38]: 71–72), tetapi <strong>hakikat manusia adalah jiwanya</strong>. Jiwa (qalb/ruh) yang memimpin perilaku; jika jiwa bersih, perilaku lurus.</p>`, "Bagian 3"),
    ex("Latihan Interaktif", "Pernyataan Ini Pandangan Siapa?", ["Pernyataan", "Tokoh"], ["Iqbal", "Gibran", "al-Ghazali"], [
      ["Kebebasan manusia adalah amanah dari Tuhan.", "Iqbal", "✓ Iqbal: kebebasan = amanah."],
      ["Puncak cinta adalah cinta kepada Pencipta.", "Gibran", "✓ Gibran: nilai cinta."],
      ["Yang membedakan manusia dari hewan adalah jiwanya.", "al-Ghazali", "✓ Al-Ghazali: hakikat = jiwa."],
      ["Manusia adalah wakil Tuhan dan makhluk paling mulia.", "Iqbal", "✓ Iqbal."],
      ["Manusia makhluk individu sekaligus sosial.", "Gibran", "✓ Gibran."],
      ["Jiwa memimpin perilaku agar tidak menyimpang.", "al-Ghazali", "✓ Al-Ghazali."]
    ]),
    A("Kisah Adam: Mengapa Manusia Layak Jadi Khalifah", `<p>QS. al-Baqarah 30–33 menceritakan dialog Allah dengan malaikat. Allah mengumumkan akan menjadikan khalifah di bumi. Malaikat bertanya, khawatir makhluk itu akan merusak dan menumpahkan darah. Allah lalu mengajarkan <strong>nama-nama (benda)</strong> kepada Adam, yang tidak diketahui malaikat. Malaikat pun mengakui keterbatasan ilmunya.</p>
<p>Pelajarannya: kelayakan manusia sebagai khalifah terletak pada <strong>ilmu dan akal</strong>. Tetapi ilmu tanpa iman justru bisa mewujudkan kekhawatiran malaikat: merusak dan menumpahkan darah. Karena itu ilmu harus dibimbing wahyu.</p>`, "Bagian 4"),
    ay("Ayat Inti", "Dialog tentang Khalifah", [[1, "[2]: 30"], [1, "[2]: 31"], [1, "[2]: 32"], [1, "[2]: 33"]]),
    duaPeran,
    ay("Ayat Inti", "Peran sebagai Hamba", [[1, "[51]: 56", "Bersama al-Baqarah 30, ayat ini membentuk dua peran manusia yang tidak dipisah: mengelola bumi dengan niat yang benar juga bernilai ibadah."]]),
    A("Akal: Berpikir dan Berzikir", `<p>Akal adalah pembeda manusia dari makhluk lain. Akal dipakai untuk dua hal sekaligus: <strong>berpikir</strong> tentang ciptaan Allah, yang melahirkan kebudayaan dan peradaban; dan <strong>berzikir</strong> tentang kekuasaan Allah, yang melahirkan pengakuan bahwa yang mutlak hanya Allah. Gambaran ini ada pada <em>ulul albab</em> dalam QS. Ali ‘Imran [3]: 190–191.</p>
<p>Hubungan akal dan al-Qur’an bersifat <strong>dialektis-fungsional</strong>, bukan struktural (atas-bawah yang mematikan salah satunya). Akal adalah subjek pemecah masalah; al-Qur’an memberi wawasan moral dan arah. Keduanya saling menguatkan.</p>`, "Bagian 5"),
    triEpis,
    rv("Cek Pemahaman", "Studi Kasus Singkat", [
      { prompt: "Seorang mahasiswa berkata: “Agama cukup diyakini, tidak usah dipikir-pikir.” Tepatkah?", answer: "Tidak tepat", reason: "Akal adalah pembeda manusia dan dipakai untuk berpikir + berzikir. Al-Qur’an justru memuji ulul albab yang memikirkan ciptaan Allah." },
      { prompt: "Temannya membalas: “Kalau begitu, akal saja cukup, wahyu boleh diabaikan kalau tidak masuk akal.”", answer: "Juga tidak tepat", reason: "Itu sikap liberal. Pendekatan Burhani dipakai, tetapi tidak boleh bertentangan dengan wahyu. Hubungannya dialektis-fungsional." },
      { prompt: "Pengembang aplikasi membuat sistem informasi untuk zakat desa agar penyalurannya adil. Termasuk tugas khalifah?", answer: "Ya", reason: "Memakai ilmu (Burhani) untuk memakmurkan dan mensejahterakan, dengan niat yang benar → juga bernilai ibadah." }
    ])
  ],

  p2: [
    A("Makna Kata Islam", `<p>Secara bahasa, Islam berasal dari <em>aslama – yuslimu – islāman</em>, yang mengandung makna <strong>keselamatan, kedamaian, kesejahteraan, kepatuhan, dan penyerahan diri secara penuh kepada Allah</strong>. Akar katanya sama dengan <em>salām</em> (damai).</p>
<p>Secara istilah, Islam adalah agama yang menyelamatkan siapa saja yang memeluknya dengan sungguh-sungguh. Rumusan <strong>Muhammadiyah</strong>: “Agama Islam ialah agama Allah yang diturunkan kepada Nabi Muhammad, yang tersebut dalam al-Qur’an dan as-Sunnah al-Maqbulah, berupa perintah, larangan, dan petunjuk untuk kebaikan manusia di dunia dan akhirat.”</p>
<p>Karena maknanya damai dan selamat, tindakan anarkis, pengeboman, dan teror bertentangan dengan Islam.</p>`, "Bagian 1"),
    tip("➕ Mengapa “agama pilihan”?", "Karena Allah sendiri yang memilihnya: “Sesungguhnya agama di sisi Allah ialah Islam” (QS. Ali ‘Imran [3]: 19). Islam yang dibawa Nabi Muhammad adalah kelanjutan dan penyempurna ajaran tauhid seluruh nabi sejak Adam."),
    A("Islam sebagai ad-Din dan asy-Syari’ah", `<p><strong>1. Sebagai agama (ad-Din).</strong> Islam diwahyukan sejak Nabi Adam hingga Nabi Muhammad. Semua nabi diutus oleh Tuhan yang sama dan menyerukan hal yang sama: menyembah Allah saja. Dari sini lahir konsep <strong>rahmatan lil ‘alamin</strong>: pemikiran, rumusan, dan amal agar dunia damai bagi semua keluarga, suku, ras, wilayah, negara, dan bangsa.</p>
<p><strong>2. Sebagai ajaran (asy-Syari’ah).</strong> Islam adalah tuntunan, arahan, bimbingan, dan petunjuk yang bisa diamalkan untuk keselamatan hidup di dunia dan akhirat. Sumbernya al-Qur’an dan as-Sunnah al-Maqbulah (sunnah yang dapat diterima sebagai hujah).</p>`, "Bagian 2"),
    { type: "table", label: "Tabel Interaktif", title: "Al-Qur’an vs As-Sunnah al-Maqbulah", headers: ["Aspek", "Al-Qur’an", "As-Sunnah al-Maqbulah"],
      rows: [["Pengertian", "Wahyu Allah kepada Muhammad melalui Jibril", "Perkataan, perbuatan, persetujuan (taqrir), dan keadaan Nabi saw."], ["Lafaz", "Dari Allah", "Dari Nabi Muhammad saw."], ["Makna", "Dari Allah", "Dari Allah (wahyu)"], ["Membacanya", "Ibadah (➕ bernilai pahala per huruf)", "Bukan ibadah tilawah"], ["Periwayatan", "Mutawatir seluruhnya ➕", "Ada yang mutawatir, ada yang ahad; diseleksi kesahihannya ➕"], ["Fungsi", "Sumber pertama", "Sumber kedua; menjelaskan, merinci, menguatkan al-Qur’an ➕"]],
      modes: [{ label: "Kolom yang paling sering diuji", target: "row", row: 1, title: "Lafaz", text: "Al-Qur’an: lafaz dan makna dari Allah. Sunnah: makna dari Allah, lafaz dari Nabi." },
        { label: "Arti “al-Maqbulah”", target: "none", title: "Maqbulah = dapat diterima", text: "➕ Muhammadiyah memakai istilah <em>as-Sunnah al-Maqbulah</em> untuk menegaskan bahwa yang dijadikan hujah adalah hadis yang dapat diterima (sahih atau hasan), bukan hadis lemah atau palsu." }] },
    islamImanIhsan,
    A("Empat Sistematika Ajaran", `<p>Ajaran Islam tersusun dari <strong>aqidah, ibadah, akhlak, dan mu’amalah</strong>. Keempatnya saling terikat, tidak bisa diambil sebagian. Rajin shalat tetapi tetap bermaksiat, atau baik bergaul tetapi tidak shalat, puasa, dan zakat, sama-sama belum utuh. Dalilnya: “Masuklah ke dalam Islam secara keseluruhan” (QS. al-Baqarah [2]: 208).</p>`, "Bagian 3"),
    rumahIslam,
    A("Enam Karakteristik Islam", `<p>Slide menyebut enam karakteristik. Klik baris tabel di bawah untuk melihat penjelasannya.</p>`, "Bagian 4"),
    { type: "table", label: "Tabel Interaktif", title: "Karakteristik & Dalilnya", headers: ["Karakteristik", "Dalil", "Contoh nyata"],
      rows: [["1. Toleransi (tasamuh)", "QS. al-An’am [6]: 108", "Tidak mencela sesembahan agama lain; tetap bertetangga baik"], ["2. Moderat (wasathiyah)", "QS. al-Baqarah [2]: 143", "Tidak ekstrem keras, tidak ekstrem longgar"], ["3. Integratif & komprehensif", "QS. al-Anbiya’ [21]: 107–108", "Dunia-akhirat, ilmu-iman tidak dipisah"], ["4. Rasional", "QS. al-Ghasyiyah [88]: 17–22", "Diajak memperhatikan unta, langit, gunung, bumi"], ["5. Plural (menerima kemajemukan)", "QS. al-Hujurat [49]: 13", "Menerima keragaman suku, bangsa, agama sebagai kenyataan"], ["6. Menggembirakan, memudahkan", "QS. al-Baqarah [2]: 286; an-Nisa’ [4]: 165", "Rukhsah: shalat duduk bagi yang sakit, jamak-qashar bagi musafir"]],
      modes: [{ label: "Batas toleransi", target: "row", row: 0, title: "Menghormati, bukan mencampur", text: "Batasnya <em>lakum dinukum wa liya din</em> (QS. al-Kafirun [109]: 6): tidak ikut ritual agama lain dan tidak meyakini semua agama sama benar." },
        { label: "Pluralitas ≠ pluralisme", target: "row", row: 4, title: "Beda kata yang menjebak", text: "Pluralitas = menerima kenyataan keragaman (ajaran Islam). Pluralisme agama = paham “semua agama sama benar” (bertentangan dengan QS. Ali ‘Imran 19 & 85)." },
        { label: "Koreksi slide", target: "row", row: 3, title: "Ayat 17–22, bukan 12–22", text: "Ajakan berpikir ada di ayat 17–20; ayat 12–16 masih menggambarkan surga." }] },
    ay("Ayat Inti", "Dalil Karakteristik Islam", [[2, "[21]: 107"], [2, "[6]: 108"], [2, "[2]: 143"], [2, "[2]: 208"], [2, "[33]: 40"], [2, "[3]: 19"]]),
    ex("Latihan Interaktif", "Sikap Ini Mencerminkan Karakteristik Apa?", ["Sikap", "Karakteristik"], ["Toleransi", "Moderat", "Rasional", "Plural", "Memudahkan"], [
      ["Panitia kampus membantu menjaga keamanan saat tetangga merayakan hari besar agamanya, tanpa ikut ritualnya.", "Toleransi"],
      ["Musafir mengqashar shalat Zuhur menjadi 2 rakaat.", "Memudahkan"],
      ["Tidak mudah mengkafirkan, tetapi juga tidak menganggap semua boleh.", "Moderat"],
      ["Merenungi keteraturan alam untuk menguatkan iman.", "Rasional"],
      ["Bekerja sama dengan teman dari suku dan daerah berbeda dalam satu tim.", "Plural"]
    ])
  ],

  p3: [
    A("Arti Aqidah", `<p>Kata <em>aqidah</em> berasal dari <em>‘aqada – ya‘qidu – ‘aqdan – ‘aqīdatan</em>, semakna dengan <em>rabatha</em> (mengikat): ikatan, simpul, perjanjian, sesuatu yang kokoh. Jadi aqidah adalah keyakinan yang <strong>terikat kuat di hati</strong>.</p>
<p><strong>Hasan al-Banna</strong>: perkara-perkara yang wajib diyakini kebenarannya oleh hati, mendatangkan <strong>ketenteraman jiwa</strong>, dan menjadi keyakinan yang <strong>tidak bercampur keraguan</strong>.</p>
<p><strong>Abu Bakar Jabir al-Jazairy</strong>: sejumlah kebenaran yang diterima manusia berdasarkan <strong>akal, wahyu (sam’u), dan fitrah</strong>, terpatri dalam hati, diyakini, dan <strong>menolak segala yang bertentangan</strong> dengannya.</p>`, "Bagian 1"),
    ex("Latihan Interaktif", "Kata Kunci Ini Milik Definisi Siapa?", ["Kata kunci", "Tokoh"], ["Hasan al-Banna", "al-Jazairy"], [
      ["Mendatangkan ketenteraman jiwa", "Hasan al-Banna"],
      ["Berdasarkan akal, wahyu, dan fitrah", "al-Jazairy"],
      ["Tidak bercampur keraguan sedikit pun", "Hasan al-Banna"],
      ["Menolak segala yang bertentangan dengannya", "al-Jazairy"]
    ]),
    A("Lima Nama, Satu Pokok", `<p>Ilmu tentang aqidah dikenal dengan beberapa nama: <strong>Iman</strong> (membenarkan dalam hati, mengikrarkan dengan lisan, mengamalkan dengan anggota badan), <strong>Tauhid</strong> (mengesakan Allah), <strong>Ushuluddin</strong> (pokok-pokok agama), <strong>Ilmu Kalam</strong> (pembahasan aqidah secara rasional beserta aliran-alirannya), dan <strong>Fikih Akbar</strong> (pemahaman besar; ➕ nama ini dipopulerkan oleh kitab yang dinisbatkan kepada Imam Abu Hanifah).</p>`, "Bagian 2"),
    rumahIslam,
    lingkupAqidah,
    A("Akal dan Hati", `<p>Akal bukan sekadar otak. Akal adalah daya berpikir dalam jiwa untuk memperoleh pengetahuan tentang Allah melalui dua jenis ayat: <strong>ayat qauliyah</strong> (firman dalam al-Qur’an) dan <strong>ayat kauniyah</strong> (tanda-tanda di alam), lalu membandingkan keduanya.</p>
<p><strong>Hati (qalb)</strong> disebut berulang kali dalam al-Qur’an dan berfungsi sebagai pengendali atas keinginan dan nafsu, agar tidak terjerumus ke syirik dan dosa. ➕ Nabi saw. bersabda: “Ketahuilah, di dalam tubuh ada segumpal daging; jika ia baik, baiklah seluruh tubuh, dan jika ia rusak, rusaklah seluruh tubuh. Ketahuilah, ia adalah hati.” (HR. al-Bukhari dan Muslim)</p>`, "Bagian 3"),
    jangkauan,
    { type: "table", label: "Tabel Interaktif", title: "8 Kaidah Aqidah", headers: ["No", "Kaidah", "Contoh"],
      rows: [["1", "Yang dijangkau indera diyakini adanya, kecuali akal menolaknya berdasar pengalaman", "Fatamorgana di jalan aspal"], ["2", "Tidak boleh memungkiri sesuatu hanya karena tidak terindera", "Gelombang Wi-Fi tidak terlihat, tetapi ada"], ["3", "Manusia hanya bisa mengkhayalkan yang pernah diinderanya", "Membayangkan makhluk asing pun dari bentuk yang pernah dilihat"], ["4", "Akal hanya menjangkau yang terikat ruang dan waktu", "Dzat Allah tidak bisa dipikirkan"], ["5", "Keyakinan bisa diperoleh dari berita orang yang jujur", "Percaya malaikat karena kabar Nabi"], ["6", "Iman adalah fitrah setiap manusia", "Orang yang terdesak spontan berdoa"], ["7", "Kepuasan materi di dunia sangat terbatas", "Gawai baru cepat terasa biasa"], ["8", "Yakin hari akhir adalah konsekuensi logis yakin adanya Allah", "Allah Maha Adil → pasti ada pembalasan"]],
      modes: [{ label: "Paling sering keluar", target: "row", row: 3, title: "Kaidah 4", text: "Jebakan: “cara meyakini Allah adalah memikirkan Dzat-Nya” → salah. Yang benar: memikirkan ciptaan-Nya." },
        { label: "Kaidah 6 & hadis fitrah", target: "row", row: 5, title: "➕ Setiap anak lahir dalam fitrah", text: "“Setiap anak dilahirkan dalam keadaan fitrah; kedua orang tuanyalah yang menjadikannya Yahudi, Nasrani, atau Majusi.” (HR. al-Bukhari dan Muslim)" }] },
    A("Tiga Dalil Wujud Allah", `<p><strong>1. Dalil fitrah.</strong> Tidak ada manusia yang benar-benar tidak bertuhan; yang ada adalah mempertuhankan sesuatu yang tidak layak. Ruh manusia telah bersaksi “Bukankah Aku Tuhanmu? Betul” (QS. al-A’raf [7]: 172).</p>
<p><strong>2. Dalil akal (aqli).</strong> Alam yang teratur, indah, dan rumit mustahil ada tanpa pencipta. ➕ Analogi sederhana: tidak ada orang yang percaya sebuah ponsel terbentuk sendiri dari ledakan di pabrik; alam jauh lebih rumit.</p>
<p><strong>3. Dalil naqli (wahyu).</strong> Fitrah dan akal bisa sampai pada “Tuhan itu ada”, tetapi tidak bisa menjelaskan <strong>siapa</strong> Tuhan, apa nama dan sifat-Nya, dan bagaimana menyembah-Nya. Untuk itu manusia tetap butuh wahyu.</p>`, "Bagian 4"),
    ay("Ayat Inti", "Fitrah dan Akal Menuju Allah", [[3, "[30]: 30"], [3, "[3]: 190"]]),
    ex("Latihan Interaktif", "Termasuk Dalil yang Mana?", ["Contoh", "Dalil"], ["Fitrah", "Aqli", "Naqli"], [
      ["Penumpang pesawat yang diguncang turbulensi spontan berdoa.", "Fitrah"],
      ["Mahasiswa biologi takjub pada rumitnya DNA lalu yakin ada Pencipta.", "Aqli"],
      ["Mengetahui bahwa Allah Maha Esa dan tidak beranak dari QS. al-Ikhlas.", "Naqli"],
      ["Mengenal nama-nama Allah seperti ar-Rahman dan al-Bashir.", "Naqli"],
      ["Pergantian siang dan malam yang teratur sebagai tanda kekuasaan Allah.", "Aqli"]
    ])
  ],

  p4: [
    tip("Halaman ini untuk persiapan kuis", "Kuis P4 mengambil soal studi kasus dari P1–P3. Di bawah ini rangkuman terpadu dan latihan baru (bukan soal kuis) supaya konsepnya benar-benar paham.", "info"),
    A("Benang Merah P1–P3", `<p><strong>P1</strong> menjawab <em>siapa saya</em>: makhluk mulia berjasad dan berjiwa, hamba sekaligus khalifah, berbekal akal yang berpikir dan berzikir.</p>
<p><strong>P2</strong> menjawab <em>jalan apa yang saya pilih</em>: Islam, agama yang damai, menyeluruh (4 sistematika), dan memiliki 6 karakteristik.</p>
<p><strong>P3</strong> menjawab <em>apa fondasinya</em>: aqidah yang kokoh, bersumber al-Qur’an dan Sunnah, dipahami dengan akal dan dijaga hati, dengan 8 kaidah dan 3 dalil wujud Allah.</p>`, "Rangkuman"),
    rumahIslam,
    { type: "table", label: "Tabel Interaktif", title: "Glosarium Kilat P1–P3", headers: ["Istilah", "Arti singkat", "Pertemuan"],
      rows: [["Khalifah", "Wakil/pengelola bumi yang diberi amanah", "P1"], ["Ulul albab", "Orang berakal yang berpikir dan berzikir", "P1"], ["Bayani/Burhani/Irfani", "Pendekatan teks / akal-sains / hati", "P1–P2"], ["Rahmatan lil ‘alamin", "Rahmat bagi seluruh alam", "P2"], ["Wasathiyah", "Moderat, tengah", "P2"], ["Tasamuh", "Toleransi", "P2"], ["As-Sunnah al-Maqbulah", "Sunnah yang dapat diterima sebagai hujah", "P2"], ["‘Aqada / rabatha", "Mengikat", "P3"], ["Sam’iyyat", "Perkara yang hanya diketahui lewat wahyu", "P3"], ["Ayat kauniyah / qauliyah", "Tanda di alam / firman dalam al-Qur’an", "P3"]],
      modes: [{ label: "Istilah P2", target: "row", row: 4, title: "Wasathiyah", text: "Sikap tengah: tidak berlebihan (ghuluw) dan tidak meremehkan. Dalil QS. al-Baqarah 143." }] },
    rv("Latihan Studi Kasus", "Pilih Sikap yang Paling Tepat", [
      { prompt: "Seorang teman mengajak memasang jimat di laptop agar “tidak mudah rusak”. Ia rajin shalat. Bagaimana menurut aqidah?", answer: "Bertentangan dengan aqidah", reason: "Kata kunci al-Jazairy: aqidah <em>menolak yang bertentangan</em>. Rajin ibadah tidak membenarkan jimat." },
      { prompt: "Ada budaya asing yang populer di media sosial. Sikap terbaik?", answer: "Selektif dan moderat", reason: "Ambil yang baik dan tidak bertentangan dengan Islam, tolak yang bertentangan. Bukan menelan semua, bukan menolak semua." },
      { prompt: "Seseorang berkata: “Saya tidak percaya malaikat karena tidak pernah melihatnya.”", answer: "Melanggar kaidah 2 dan 5", reason: "Tidak terindera ≠ tidak ada; keyakinan bisa diperoleh dari berita orang yang jujur (Nabi saw.)." },
      { prompt: "Mahasiswa aktif organisasi, santun, disiplin, dan rajin belajar. Ini mencerminkan?", answer: "Pribadi Muslim yang utuh", reason: "Pada soal yang semua opsinya baik, pilih yang paling lengkap: akhlak + ilmu + sosial." }
    ])
  ],

  p5: [
    A("Tauhid: Inti Seluruh Ajaran", `<p>Tauhid berarti <strong>mengesakan Allah</strong> dalam rububiyah, mulkiyah, uluhiyah, serta asma’ dan sifat-Nya. Tauhid adalah tema sentral aqidah sehingga aqidah sering disebut ilmu tauhid. Semua nabi membawa ajaran tauhid yang sama. ➕ “Dan sungguh, Kami telah mengutus seorang rasul untuk setiap umat (untuk menyerukan), ‘Sembahlah Allah dan jauhilah thagut’.” (QS. an-Nahl [16]: 36)</p>`, "Bagian 1"),
    tanggaTauhid,
    tip("Kenapa ada yang membagi tauhid menjadi 3?", "Banyak ulama membagi tauhid menjadi Rububiyah, Uluhiyah, dan Asma’ wa Sifat, dengan Mulkiyah termasuk dalam Rububiyah. Slide AIK memisahkannya menjadi 4. Keduanya tidak bertentangan; untuk ujian AIK gunakan versi 4.", "info"),
    anNas,
    ay("Ayat Inti", "Dalil Tauhid", [[5, "[114]: 1–3"], [5, "[1]: 5"], [5, "[112]: 1"]]),
    A("Dua Arah Dalil: at-Talazum dan at-Tadhamun", `<p><strong>At-Talazum</strong> (kemestian) bergerak naik: siapa yang yakin Allah Pencipta semestinya yakin Allah Raja, lalu semestinya hanya menyembah-Nya, lalu mengakui nama dan sifat-Nya. Al-Qur’an sering memakai pola ini: menyebut ciptaan Allah lalu menuntut ibadah kepada-Nya (➕ misalnya QS. al-Baqarah [2]: 21–22).</p>
<p><strong>At-Tadhamun</strong> (cakupan) bergerak turun: siapa yang sudah bertauhid uluhiyah pasti sudah mencakup tauhid mulkiyah dan rububiyah.</p>
<p>Pelajaran pentingnya: <strong>pengakuan bahwa Allah pencipta belum cukup</strong>. Musyrikin Makkah mengakuinya (QS. Luqman [31]: 25), tetapi tetap menyembah berhala.</p>`, "Bagian 2"),
    A("Lawan Tauhid: Syirik", `<p>Syirik adalah menyekutukan Allah. Ini dosa yang tidak diampuni jika dibawa mati tanpa tobat (QS. an-Nisa’ [4]: 48). Tanpa tauhid, amal terhapus (QS. al-Kahfi [18]: 105).</p>`, "Bagian 3"),
    ay("Ayat Inti", "Tanpa Tauhid, Amal Terhapus", [[5, "[18]: 105"]]),
    { type: "table", label: "Tabel Interaktif • ➕ Tambahan", title: "Syirik Besar dan Syirik Kecil", headers: ["Aspek", "Syirik besar (akbar)", "Syirik kecil (asghar)"],
      rows: [["Bentuk", "Menyembah, berdoa, atau bergantung kepada selain Allah", "Riya’ (beramal ingin dipuji), sumpah atas nama selain Allah"], ["Akibat", "Mengeluarkan dari Islam, menghapus seluruh amal", "Tidak mengeluarkan dari Islam, tetapi menghapus pahala amal yang tercampur"], ["Contoh", "Meminta kesembuhan kepada “penunggu” pohon", "Memperbagus shalat karena dilihat calon mertua"], ["Obat", "Tobat dan memurnikan tauhid", "Meluruskan niat, menyembunyikan amal sunnah"]],
      modes: [{ label: "Hadis tentang riya’", target: "row", row: 0, title: "Syirik kecil = riya’", text: "➕ Nabi saw. menyebut riya’ sebagai <em>syirik ashghar</em> yang paling beliau khawatirkan menimpa umatnya (HR. Ahmad)." }] },
    ex("Latihan Interaktif", "Sikap Ini Buah Tauhid yang Mana?", ["Sikap", "Tauhid"], ["Rububiyah", "Mulkiyah", "Uluhiyah", "Asma’ wa Sifat"], [
      ["Tidak curang saat ujian online karena yakin Allah Maha Melihat.", "Asma’ wa Sifat"],
      ["Tidak sombong dengan IPK tinggi karena semua titipan Sang Pemilik.", "Mulkiyah"],
      ["Tidak minta tolong ke dukun saat usaha sepi.", "Uluhiyah"],
      ["Merawat tanaman kampus karena meneladani sifat Allah sebagai Pemelihara.", "Rububiyah"],
      ["Mendahulukan aturan Allah di atas aturan kelompok yang bertentangan.", "Mulkiyah"]
    ])
  ],

  p6: [
    A("Dua Kalimat, Satu Janji", `<p>Syahadat adalah pintu masuk Islam dan rukun Islam yang pertama. <em>Asyhadu</em> berarti “aku bersaksi”: kesaksian yang lahir dari ilmu dan keyakinan, lalu dibuktikan dengan amal. Syahadat <strong>pertama</strong> berisi tauhid: tidak ada sesembahan yang berhak disembah selain Allah. Syahadat <strong>kedua</strong> berisi pengakuan kerasulan: Muhammad hamba dan utusan Allah.</p>`, "Bagian 1"),
    ay("Lafaz", "Dua Kalimat Syahadat", [[6, "Syahadat pertama"], [6, "Syahadat kedua"]]),
    nafyuItsbat,
    ay("Ayat Inti", "Teladan Nabi & Tali yang Kokoh", [[6, "[33]: 21"], [6, "[2]: 256"]]),
    ifrath,
    tip("Koreksi kecil slide", "Slide menulis ‘abduhu “bermakna al-ifrath” dan rasuluhu “bermakna at-tafrith”. Maksudnya: ‘abduhu <strong>menolak</strong> ifrath dan rasuluhu <strong>menolak</strong> tafrith.", "warn"),
    A("Syarat Syahadat Diterima", `<p>➕ <strong>Tambahan:</strong> para ulama (misalnya Syaikh Hafizh al-Hakami) merumuskan <strong>tujuh syarat</strong> kalimat <em>lā ilāha illallāh</em> agar bermanfaat bagi yang mengucapkannya. Ini membantu memahami “konsekuensi” syahadat: bukan sekadar diucapkan.</p>`, "Bagian 2 • ➕ Tambahan"),
    { type: "table", label: "Tabel Interaktif • ➕ Tambahan", title: "7 Syarat Lā Ilāha Illallāh", headers: ["Syarat", "Arti", "Lawannya"],
      rows: [["‘Ilmu", "Mengetahui maknanya (nafyu & itsbat)", "Jahl (tidak tahu)"], ["Yaqin", "Yakin tanpa ragu", "Syak (ragu)"], ["Qabul", "Menerima seluruh konsekuensinya", "Menolak"], ["Inqiyad", "Tunduk dan patuh mengamalkan", "Meninggalkan"], ["Shidq", "Jujur, sesuai hati dan lisan", "Dusta (nifak)"], ["Ikhlas", "Murni karena Allah", "Syirik"], ["Mahabbah", "Mencintai kalimat ini dan ahlinya", "Benci"]],
      modes: [{ label: "Kaitan dengan definisi aqidah", target: "row", row: 1, title: "Yaqin", text: "Sama dengan kata kunci Hasan al-Banna di P3: keyakinan yang tidak bercampur keraguan." }] },
    A("Konsekuensi Syahadat dalam Hidup", `<p>Syahadat pertama berarti <strong>beribadah hanya kepada Allah</strong>. Syahadat kedua berarti menjadikan Rasulullah saw. <strong>pusat keteladanan</strong> (uswah hasanah), baik dalam hablun minallah maupun hablun minannas. Jika dipahami dengan benar, syahadat melahirkan sikap selalu berusaha taat kepada Allah dan meneladani Rasul.</p>
<p>Slide menyebut <strong>11 hal yang membatalkan syahadat</strong>, yang dapat dikelompokkan menjadi dua: yang terkait tauhid (hati dan amal), dan yang terkait hukum serta ketaatan.</p>`, "Bagian 3"),
    ex("Latihan Interaktif", "Kelompokkan 11 Pembatal Syahadat", ["Pembatal", "Kelompok"], ["Tauhid (hati & amal)", "Hukum & ketaatan"], [
      ["Bertawakal bukan kepada Allah", "Tauhid (hati & amal)"],
      ["Taat secara mutlak kepada selain Allah dan Rasul-Nya", "Hukum & ketaatan"],
      ["Beramal dengan tujuan selain Allah", "Tauhid (hati & amal)"],
      ["Menghalalkan yang haram dan mengharamkan yang halal", "Hukum & ketaatan"],
      ["Menjadikan kehidupan dunia segala-galanya", "Tauhid (hati & amal)"],
      ["Memperolok-olok hukum dalam al-Qur’an dan Sunnah", "Hukum & ketaatan"],
      ["Memungkiri salah satu asma, sifat, dan af’al Allah", "Tauhid (hati & amal)"],
      ["Membenci Islam, seluruh atau sebagiannya", "Hukum & ketaatan"]
    ]),
    tip("Untuk introspeksi, bukan memvonis", "Daftar pembatal adalah cermin untuk diri sendiri. Menilai orang lain keluar dari Islam adalah perkara berat yang memerlukan ilmu dan pertimbangan ulama.", "warn")
  ],

  p7: [
    A("Hakikat Iman", `<p>Iman adalah membenarkan dengan hati, mengikrarkan dengan lisan, dan mengamalkan dengan anggota badan. Rukun iman ada enam: iman kepada Allah, malaikat, kitab-kitab, rasul-rasul, hari akhir, serta qadha dan qadar. ➕ Lima yang pertama disebut dalam QS. an-Nisa’ [4]: 136; keenamnya disebut lengkap dalam hadis Jibril (HR. Muslim).</p>
<p><strong>Muhammad Abduh</strong>: orang beriman adalah orang yang kepercayaannya sampai mampu <strong>menguasai kehendak dan keinginannya</strong>. Iman yang benar tampak pada pengendalian diri.</p>
<p>Iman pasti diuji (QS. al-‘Ankabut [29]: 1–4). Slide merangkumnya: “Tidak cukup yakin, keyakinan butuh bukti.”</p>`, "Bagian 1"),
    ay("Ayat Inti", "Iman Diuji, Hidup Bertujuan", [[7, "[29]: 2"], [7, "[23]: 115"]]),
    perjalanan,
    tip("Prof. Hamka", "“Kalau hidup sekadar hidup, kera di hutan juga hidup; kalau bekerja sekadar bekerja, babi di hutan juga bekerja.” (versi slide; ➕ versi yang lebih sering dikutip menukar urutan babi dan kera). Pesannya sama: yang membuat hidup bermakna adalah tujuannya, yaitu ibadah kepada Allah."),
    A("Ibadah: Lebih Luas dari Ritual", `<p>Ibadah berasal dari <em>‘abada – ya‘budu – ‘ibādatan</em>: menghamba, tunduk. Definisi masyhur <strong>Ibnu Taimiyah</strong>: nama yang mencakup segala sesuatu yang dicintai dan diridai Allah, berupa ucapan dan perbuatan, yang lahir maupun yang batin.</p>
<p>Jadi kuliah dengan niat menuntut ilmu, bekerja halal untuk keluarga, dan tersenyum kepada teman juga bisa bernilai ibadah.</p>`, "Bagian 2"),
    saringan,
    pohonIbadah,
    ex("Latihan Interaktif", "Mahdhah atau Ghairu Mahdhah?", ["Kegiatan", "Jenis"], ["Mahdhah", "Ghairu mahdhah"], [
      ["Shalat Subuh 2 rakaat", "Mahdhah"],
      ["Mengikuti kuliah PJJ lewat Zoom", "Ghairu mahdhah"],
      ["Puasa Ramadhan", "Mahdhah"],
      ["Membuat aplikasi pencatat infak masjid", "Ghairu mahdhah"],
      ["Wudhu sebelum shalat", "Mahdhah"],
      ["Merawat orang tua yang sakit", "Ghairu mahdhah"]
    ]),
    A("Enam Prinsip Ibadah", `<p>(1) Yang berhak disembah hanya Allah; (2) ibadah tanpa perantara, karena Allah dekat; (3) ikhlas; (4) sesuai tuntunan Rasul; (5) seimbang ruhani-jasmani, dunia-akhirat; (6) mudah dan tidak membebani di luar kemampuan.</p>`, "Bagian 3"),
    ay("Ayat Inti", "Dalil Prinsip Ibadah", [[7, "[4]: 36"], [7, "[2]: 186"], [7, "[39]: 11"], [7, "[3]: 31"], [7, "[28]: 77"], [7, "[2]: 286"]]),
    A("Tugas Khalifah dan Ma’rifatullah", `<p>Manusia sebagai khalifah (QS. al-Baqarah [2]: 30) punya tugas pertama: <strong>ma’rifatullah</strong>, mengenal Allah (QS. ath-Thalaq [65]: 12). Jalan mengenal-Nya: melalui ciptaan dan kekuasaan-Nya sebagai Rabb dan Raja (Pencipta, Pemberi rezeki, Pengatur, Penguasa), serta melalui nama-nama-Nya yang indah (asma’ul husna). Mengenal Allah melahirkan cinta, takut, dan harap kepada-Nya, yang lalu mendorong ibadah dan amal saleh.</p>`, "Bagian 4"),
    ay("Ayat Inti", "Khalifah & Ma’rifatullah", [[7, "[65]: 12"], [7, "[7]: 180"]])
  ],

  p8: [
    tip("Halaman ini untuk persiapan UTS", "Isinya peta materi dan tabel dalil untuk mengulang P1–P7. Soal latihan ada di tab Kuis.", "info"),
    petaUts,
    { type: "table", label: "Tabel Interaktif", title: "Dalil Kunci yang Wajib Diingat", headers: ["Topik", "Dalil", "Pertemuan"],
      rows: [["Manusia sebagai khalifah", "QS. al-Baqarah 30–33", "P1, P7"], ["Tujuan penciptaan: ibadah", "QS. adz-Dzariyat 56", "P1"], ["Ulul albab berpikir + berzikir", "QS. Ali ‘Imran 190–191", "P1, P3"], ["Rahmatan lil ‘alamin", "QS. al-Anbiya’ 107", "P2"], ["Toleransi", "QS. al-An’am 108", "P2"], ["Moderat", "QS. al-Baqarah 143", "P2"], ["Islam secara kaffah", "QS. al-Baqarah 208", "P2"], ["Fitrah bertuhan", "QS. ar-Rum 30; al-A’raf 172", "P3"], ["Rabb, Malik, Ilah", "QS. an-Nas 1–3", "P5"], ["Amal terhapus tanpa iman", "QS. al-Kahfi 105", "P5"], ["Nafyu–itsbat", "QS. al-Baqarah 256", "P6"], ["Uswah hasanah", "QS. al-Ahzab 21", "P6"], ["Iman diuji", "QS. al-‘Ankabut 2", "P7"], ["Tidak diciptakan main-main", "QS. al-Mu’minun 115", "P7"], ["Ikhlas", "QS. az-Zumar 11", "P7"], ["Ikuti Rasul", "QS. Ali ‘Imran 31", "P7"]],
      modes: [{ label: "Ayat yang muncul di 2 pertemuan", target: "row", row: 0, title: "al-Baqarah 30", text: "Dipakai di P1 (hakikat manusia) dan P7 (tugas khalifah). Hampir pasti keluar." },
        { label: "Jebakan dalil", target: "row", row: 9, title: "al-Kahfi 105", text: "Dalil bahwa tauhid adalah landasan: tanpa iman, amal tidak ditimbang." }] },
    rv("Cek Istilah Cepat", "Tebak Istilahnya", [
      { prompt: "Kemestian: yakin Rububiyah menuntut yakin Uluhiyah", answer: "at-Talazum", reason: "Arah naik." },
      { prompt: "Mengkultuskan Nabi sampai dianggap punya sifat ketuhanan", answer: "Ifrath", reason: "Ditolak oleh kata ‘abduhu." },
      { prompt: "Perkara yang hanya diketahui lewat wahyu", answer: "Sam’iyyat", reason: "Salah satu dari 4 lingkup aqidah." },
      { prompt: "Ibadah yang tata caranya sudah ditetapkan rinci", answer: "Mahdhah", reason: "Menambah atau mengurangi = bid’ah." },
      { prompt: "Pendekatan ilmu sosial dan kealaman", answer: "Burhani", reason: "Tidak boleh bertentangan dengan wahyu." },
      { prompt: "Pengosongan sesembahan pada lā ilāha", answer: "an-Nafyu", reason: "Lalu itsbat pada illallāh." }
    ])
  ]
};
module.exports = M;
