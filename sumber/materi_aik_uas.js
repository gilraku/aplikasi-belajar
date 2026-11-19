// Materi Lengkap — AIK P9–P14 (menuju UAS). P12 belum ada modulnya, jadi tidak diisi.
// Gaya: setiap istilah dijelaskan artinya, kapan dipakai, contohnya, dan kekeliruan yang sering terjadi. Tambahan di luar modul ditandai ➕.
const { C, box, arrow, svg, text, diagram } = require("./svg.js");
const ayat = require("./ayat_aik_uas.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ay = (label, title, items) => ({ type: "ayat", label, title, items });
const tbl = (title, headers, rows, modes, label) => ({ type: "table", label: label || "Tabel Interaktif", title, headers, rows, modes: modes || [] });

// ================= P9 =================
const segitigaAkhlak = diagram({
  label: "Diagram Interaktif", title: "Khaliq – Makhluq – Akhlaq", desc: "Klik setiap kotak. Diagram ini menyederhanakan slide “Allah–Manusia–Akhlaq”.", minw: 520,
  svg: svg(720, 300,
    box(250, 15, 220, 70, "ALLAH|al-Khaliq (Pencipta)", "emerald", "khl", { size: 15 }) +
    box(20, 200, 220, 75, "MANUSIA|makhluq", "sky", "mkh", { size: 15 }) +
    box(480, 200, 220, 75, "AKHLAQ|perilaku & tindakan", "amber", "akh", { size: 15 }) +
    arrow(240, 237, 476, 237) + arrow(590, 197, 430, 88) + arrow(300, 88, 150, 197, { dash: "6 5" }) +
    text(360, 260, "berbuat", { size: 12, color: "#475569" }) + text(628, 140, "dipertanggungjawabkan", { size: 12, color: "#475569" }) + text(170, 130, "kehendak/aturan", { size: 12, color: "#475569" })
  ),
  parts: [
    { id: "khl", label: "Khaliq", title: "Allah, al-Khaliq", text: "Pencipta yang menetapkan ukuran baik dan buruk melalui wahyu (al-Qur’an & Sunnah). Inilah yang membuat ukuran akhlak <strong>universal</strong>, tidak berubah karena tempat dan zaman." },
    { id: "mkh", label: "Makhluq", title: "Manusia, makhluq", text: "Yang diciptakan. Kata <em>makhluq</em> seakar dengan <em>khuluq</em>: perangai manusia seharusnya selaras dengan kehendak Penciptanya." },
    { id: "akh", label: "Akhlaq", title: "Akhlaq: perilaku yang dipertanggungjawabkan", text: "Perbuatan manusia menjadi <strong>akhlak</strong> karena ada pertanggungjawaban kepada Allah. Bedanya dengan etika dan moral ada di sini: etika berhenti pada akal, moral berhenti pada norma masyarakat." }
  ]
});

// ================= P10 =================
const petaLiberal = diagram({
  label: "Diagram Interaktif", title: "Dari Liberalisasi ke Kerancuan", desc: "Klik setiap kotak untuk arti istilahnya.", minw: 560,
  svg: svg(760, 330,
    box(20, 15, 165, 70, "Pluralisme|agama", "rose", "plu") + box(205, 15, 165, 70, "Relativisme|kebenaran", "amber", "rel") +
    box(390, 15, 165, 70, "Kritik otentisitas|al-Qur’an", "violet", "kri") + box(575, 15, 165, 70, "Dekonstruksi|syari’ah", "sky", "dek") +
    arrow(102, 85, 330, 147) + arrow(287, 85, 360, 147) + arrow(472, 85, 400, 147) + arrow(657, 85, 430, 147) +
    box(230, 150, 300, 60, "Kerancuan pemahaman Islam", "slate", "ker", { size: 15 }) +
    arrow(300, 210, 130, 252) + arrow(380, 210, 380, 252) + arrow(460, 210, 630, 252) +
    box(40, 255, 180, 55, "Aqidah", "emerald", "aq") + box(290, 255, 180, 55, "Syari’ah", "emerald", "sy") + box(540, 255, 180, 55, "Akhlak", "emerald", "ak")
  ),
  parts: [
    { id: "plu", label: "Pluralisme", title: "Pluralisme agama", text: "Paham bahwa semua agama sama benar dan setara. Contoh ucapan: “Semua agama hanya beda jalan menuju Tuhan yang sama.”" },
    { id: "rel", label: "Relativisme", title: "Relativisme kebenaran", text: "Anggapan bahwa tidak ada kebenaran mutlak; benar-salah tergantung sudut pandang orang. Dipakai untuk menolak siapa pun yang yakin agamanya benar (<em>no truth claim</em>)." },
    { id: "kri", label: "Kritik otentisitas", title: "Kritik otentisitas al-Qur’an", text: "Meragukan keaslian al-Qur’an, misalnya menganggapnya produk budaya Arab abad ke-7, bukan wahyu yang terjaga. ➕ Bandingkan QS. al-Hijr [15]: 9: Allah menjamin penjagaan al-Qur’an." },
    { id: "dek", label: "Dekonstruksi", title: "Dekonstruksi syari’ah", text: "“Membongkar” hukum Islam yang sudah tetap (mis. hukum waris, aurat, nikah) dengan alasan sudah tidak relevan. Beda dengan ijtihad: ijtihad bekerja pada wilayah yang memang terbuka, dengan kaidah yang jelas." },
    { id: "ker", label: "Kerancuan", title: "Hasilnya: pemahaman Islam rancu", text: "Slide menggambarkan keempat bentuk itu bermuara pada kerancuan pemahaman Islam yang mengenai kehidupan sehari-hari." },
    { id: "aq", label: "Aqidah", title: "Rancu di aqidah", text: "Tidak lagi yakin Islam benar; menganggap semua jalan keselamatan sama." },
    { id: "sy", label: "Syari’ah", title: "Rancu di syari’ah", text: "Hukum yang tetap dianggap bisa diubah sesuka hati, mis. nikah beda agama dianggap sah." },
    { id: "ak", label: "Akhlak", title: "Rancu di akhlak", text: "Ukuran baik-buruk menjadi relatif; sejalan dengan kutipan Zwemer: muslim yang tidak berakhlak." }
  ]
});

// ================= P11 =================
const empatAspek = diagram({
  label: "Diagram Interaktif", title: "4 Aspek → Karakter Pribadi Muslim", desc: "Diagram dari slide terakhir modul. Klik setiap aspek.", minw: 520,
  svg: svg(720, 290,
    box(20, 15, 155, 60, "Aqidah", "emerald", "aq", { size: 15 }) + box(195, 15, 155, 60, "Akhlak", "sky", "ak", { size: 15 }) +
    box(370, 15, 155, 60, "Ibadah", "amber", "ib", { size: 15 }) + box(545, 15, 155, 60, "Mu’amalah", "violet", "mu", { size: 15 }) +
    arrow(97, 75, 300, 137) + arrow(272, 75, 340, 137) + arrow(447, 75, 380, 137) + arrow(622, 75, 420, 137) +
    box(200, 140, 320, 55, "sesuai al-Qur’an & as-Sunnah al-Maqbulah", "slate", "uk", { size: 14 }) +
    arrow(360, 195, 360, 222) +
    box(200, 225, 320, 55, "Karakter pribadi muslim", "indigo", "kp", { size: 16 })
  ),
  parts: [
    { id: "aq", label: "Aqidah", title: "Aqidah: pondasi", text: "Tauhid yang benar, ikhlas, penuh ketundukan, dan menjadi sumber seluruh kegiatan. Yang merusak: syirik, takhayul, bid’ah, khurafat." },
    { id: "ak", label: "Akhlak", title: "Akhlak: wajah yang terlihat", text: "Meneladani shiddiq, amanah, tabligh, fathanah; ikhlas; menjauhi riya, israf, korupsi." },
    { id: "ib", label: "Ibadah", title: "Ibadah: pembersih jiwa", text: "Ibadah mahdhah sebaik-baiknya + amal nawafil, sehingga lahir pribadi muttaqin yang mendamaikan dan bermanfaat." },
    { id: "mu", label: "Mu’amalah", title: "Mu’amalah duniawiyah: aktif di dunia", text: "Sadar sebagai abdi dan khalifah, berpikir burhani-bayani-irfani, etos kerja islami." },
    { id: "uk", label: "Ukuran", title: "Ukurannya satu", text: "Keempat aspek harus sesuai dengan al-Qur’an dan as-Sunnah al-Maqbulah, bukan selera pribadi atau tren." },
    { id: "kp", label: "Hasil", title: "Karakter terbentuk", text: "Kalau satu aspek bolong (mis. ibadah rajin tetapi curang dalam tugas), karakter belum utuh." }
  ]
});

// ================= P13 =================
const tanggaUkhuwah = diagram({
  label: "Diagram Interaktif", title: "Tangga Ukhuwah Islamiyah", desc: "Naik dari bawah ke atas. Klik setiap anak tangga.", minw: 520,
  svg: svg(720, 320,
    box(20, 250, 220, 55, "1. Ta’aruf", "emerald", "t1", { size: 15 }) +
    box(140, 190, 220, 55, "2. Tafahum", "sky", "t2", { size: 15 }) +
    box(260, 130, 220, 55, "3. Ta’awun", "amber", "t3", { size: 15 }) +
    box(380, 70, 220, 55, "4. Takaful", "violet", "t4", { size: 15 }) +
    box(480, 10, 220, 55, "5. Itsar", "rose", "t5", { size: 15 })
  ),
  parts: [
    { id: "t1", label: "Ta’aruf", title: "Ta’aruf", text: "Slide: <strong>saling memahami</strong>. ➕ Umumnya diartikan saling mengenal (QS. al-Hujurat [49]: 13, <em>li ta’arafu</em>). Contoh: berkenalan dengan teman sekelas PJJ dan tahu latar belakangnya." },
    { id: "t2", label: "Tafahum", title: "Tafahum", text: "Slide: <strong>saling menolong</strong>. ➕ Umumnya: saling memahami karakter, kelebihan, dan kekurangan. Contoh: memahami teman yang lambat membalas karena bekerja." },
    { id: "t3", label: "Ta’awun", title: "Ta’awun", text: "<strong>Saling membantu</strong> dalam kebaikan dan takwa, bukan dalam dosa (QS. al-Ma’idah [5]: 2). Contoh: berbagi catatan kuliah. Bukan ta’awun: membantu teman mencontek." },
    { id: "t4", label: "Takaful", title: "Takaful", text: "Slide: <strong>empati</strong>. ➕ Umumnya: saling menanggung, ikut merasakan susah-senang saudara. Contoh: patungan membantu teman yang kena musibah." },
    { id: "t5", label: "Itsar", title: "Itsar (puncak)", text: "<strong>Mendahulukan</strong> saudara yang lebih membutuhkan, bahkan di atas kebutuhan sendiri. ➕ Dipuji dalam QS. al-Hasyr [59]: 9 tentang kaum Anshar." }
  ]
});

// ================= P14 =================
const keluargaKeMasyarakat = diagram({
  label: "Diagram Interaktif", title: "Keluarga → Qaryah Thayyibah → Masyarakat Utama", desc: "Alur pikir PHIWM: perbaikan masyarakat dimulai dari keluarga.", minw: 520,
  svg: svg(720, 200,
    box(15, 60, 200, 80, "Keluarga sakinah|(kedudukan & fungsi)", "emerald", "kel") +
    arrow(215, 100, 255, 100) +
    box(260, 60, 200, 80, "Qaryah thayyibah|(peduli tetangga)", "amber", "qt") +
    arrow(460, 100, 500, 100) +
    box(505, 60, 200, 80, "Masyarakat Islam|yang sebenar-benarnya", "indigo", "mu")
  ),
  parts: [
    { id: "kel", label: "Keluarga", title: "Titik awal: keluarga", text: "Keluarga = tiang utama umat dan bangsa, tempat nilai ditanamkan paling intensif. Di sinilah anak belajar shalat, jujur, musyawarah, dan adil." },
    { id: "qt", label: "Qaryah thayyibah", title: "Lingkungan yang baik", text: "Keluarga yang ihsan, ishlah, dan makruf kepada tetangga melahirkan kampung yang baik. Contoh: ikut kerja bakti, menjenguk tetangga sakit, menjaga keamanan bersama." },
    { id: "mu", label: "Masyarakat utama", title: "Tujuan: masyarakat utama", text: "➕ “Masyarakat Islam yang sebenar-benarnya” adalah rumusan tujuan Muhammadiyah. Judul modul menyebutnya “masyarakat utama”." }
  ]
});

module.exports = {
  p9: [
    A("Kenapa Akhlak Dibahas?", `<p>Modul dibuka dengan potret <strong>merosotnya moral</strong>: orang pintar yang tidak bermoral, seks bebas, tawuran, korupsi, kriminalitas, dan mudah putus asa. Pertanyaan modul: apa solusinya? Jawabannya <strong>pendidikan dan penanaman akhlak</strong>.</p>
<p>Akhlak tidak berdiri sendiri. Modul menggambarkannya sebagai satu siklus dengan <strong>aqidah</strong> (keyakinan) dan <strong>syari’at</strong> (ibadah dan mu’amalah): aqidah melahirkan ibadah, ibadah membentuk akhlak, dan akhlak menjadi bukti aqidah.</p>`, "Bagian 1"),
    A("Etika, Moral, Akhlak: Tiga Istilah yang Sering Tertukar", `<p>Ketiganya membahas hal yang sama, yaitu <strong>perbuatan manusia</strong>. Bedanya ada pada <strong>apa ukurannya</strong> dan <strong>kepada siapa bertanggung jawab</strong>.</p>
<ul>
<li><strong>Etika</strong> (Yunani <em>ethos</em>, adat kebiasaan berdasarkan logika) adalah <em>ilmu</em>: menjelaskan arti baik dan buruk, apa yang seharusnya dilakukan, tujuan perbuatan, dan cara berbuat. Etika menjadi <strong>nilai dasar</strong> bagi perbuatan. Ukurannya akal.</li>
<li><strong>Moral</strong> (Latin <em>mores</em>, jamak dari <em>mos</em>; dalam bahasa Indonesia “susila”) adalah <em>praktik</em>: perwujudan nilai etika dalam suatu komunitas. Karena terikat komunitas, moral bisa <strong>berbeda antartempat dan berubah antarzaman</strong> (lokal/temporal).</li>
<li><strong>Akhlak</strong> adalah etika + moral <strong>ditambah pertanggungjawaban kepada Allah</strong>. Ukurannya al-Qur’an dan Sunnah, sehingga <strong>universal</strong>.</li>
</ul>`, "Bagian 2"),
    tbl("Kapan Memakai Istilah yang Mana?", ["Istilah", "Pakai saat membicarakan…", "Contoh kalimat", "Kekeliruan yang sering terjadi"], [
      ["Etika", "Alasan/teori mengapa sesuatu baik atau buruk", "“Secara etika, plagiarisme salah karena mencuri hasil pikiran orang.”", "Menganggap etika = sopan santun. Sopan santun lebih dekat ke moral/adab."],
      ["Moral", "Perilaku nyata yang dinilai menurut norma masyarakat", "“Di kampung ini, tidak menyapa tetangga dianggap tidak bermoral.”", "Menganggap moral pasti sama di semua tempat. Modul: moral itu lokal/temporal."],
      ["Akhlak", "Perilaku yang berakar di jiwa dan dipertanggungjawabkan kepada Allah", "“Ia jujur walau tak diawasi karena takut kepada Allah.”", "Menganggap akhlak hanya urusan kepada manusia. Lingkupnya juga kepada Allah dan alam."]
    ], [{ label: "Satu contoh, tiga istilah", target: "col", col: 2, title: "Contoh dari slide Moral", text: "Kita tahu mengapa berbohong itu buruk dan jujur itu baik (etika), lalu kita tidak berbohong (moral). Akhlak menambahkan: kita tidak berbohong karena sadar akan dimintai pertanggungjawaban oleh Allah." }]),
    A("Asal Kata dan Definisi Akhlak", `<p><strong>Etimologi:</strong> akhlak adalah bentuk jamak dari <em>khuluq</em> (خُلُق) yang berarti tingkah laku, tabiat, perangai, budi pekerti. Akarnya sama dengan <em>Khaliq</em> (Pencipta), <em>makhluq</em> (yang diciptakan), dan <em>khalq</em> (penciptaan). Dari sini modul menyimpulkan: akhlak adalah <strong>keterpaduan antara kehendak Khaliq dan perilaku makhluq</strong>. Perilaku seseorang bernilai akhlak yang hakiki bila sesuai dengan kehendak Allah.</p>
<p><strong>Terminologi:</strong></p>
<ul>
<li><strong>Imam al-Ghazali:</strong> sifat yang tertanam dalam jiwa yang mendorong lahirnya perbuatan dengan <strong>mudah dan ringan</strong>, tanpa pemikiran dan pertimbangan.</li>
<li><strong>Ibrahim Anis:</strong> sifat yang tertanam dalam jiwa, yang dengannya lahir macam-macam perbuatan, <strong>baik atau buruk</strong>, tanpa pemikiran dan pertimbangan.</li>
</ul>
<p>Cara membedakan di soal: kata kunci <em>mudah dan ringan</em> → al-Ghazali; kata kunci <em>baik atau buruk</em> → Ibrahim Anis.</p>`, "Bagian 3"),
    segitigaAkhlak,
    tbl("4 Ciri Perbuatan Akhlak (Kesimpulan Definisi)", ["Ciri", "Artinya", "Contoh yang memenuhi", "Contoh yang belum memenuhi"], [
      ["Tertanam dalam jiwa", "Sudah menjadi kebiasaan dan kepribadian", "Selalu menepati janji, sejak dulu", "Sekali menepati janji karena kebetulan"],
      ["Muncul secara spontan", "Keluar dengan sendirinya, tidak dibuat-buat", "Refleks mengucap terima kasih", "Berterima kasih karena disuruh"],
      ["Tidak memerlukan dorongan dari luar", "Bukan karena diawasi, dipuji, dibayar, atau takut dihukum", "Jujur saat ujian online tanpa pengawas", "Jujur hanya saat kamera menyala"],
      ["Tanpa pemikiran/pertimbangan", "Tidak perlu menimbang untung-rugi dulu", "Langsung menolong orang yang jatuh", "Menolong setelah menghitung manfaat bagi diri"]
    ], [{ label: "Kekeliruan umum", target: "col", col: 0, title: "Akhlak tidak selalu baik", text: "Definisi Ibrahim Anis menyebut “baik atau buruk”. Orang yang <strong>terbiasa</strong> berbohong secara spontan juga sudah punya akhlak, hanya saja akhlak <strong>madzmumah</strong> (tercela)." }]),
    A("Hakikat, Ciri, dan Kedudukan Akhlaqul Karimah", `<p><strong>Hakikat:</strong> akhlaqul karimah adalah <strong>manifestasi iman, Islam, dan ihsan</strong>; buah atau inti ajaran Islam. Objeknya nilai baik dan buruk, sudut pandangnya nilai ajaran Islam. Ia adalah refleksi sifat dan jiwa, muncul spontan dan terpola. Dasarnya hadis: “Sesungguhnya aku diutus hanyalah untuk menyempurnakan akhlak yang mulia.”</p>
<p><strong>Ciri umum</strong> (tiga): (1) <strong>menyucikan jiwa</strong> dari sifat tercela seperti iri, dengki, pamrih, sombong, maksiat (QS. asy-Syams [91]: 7–10); (2) <strong>memelihara akal</strong> dengan memfungsikannya untuk berpikir tentang hal yang baik dan bermanfaat bagi diri, keluarga, negara, dan agama (QS. Ali ‘Imran [3]: 7); (3) <strong>memelihara dan mengendalikan hawa nafsu</strong> karena takut kepada Allah (QS. an-Nazi‘at [79]: 40–41).</p>
<p><strong>Kedudukan</strong> (lima): misi utama Rasulullah; akhlak yang baik adalah agama itu sendiri; cerminan kualitas di hadapan Allah di akhirat; dicintai dan paling dekat dengan Rasul pada hari kiamat; menunjukkan kualitas iman (“mukmin yang paling sempurna imannya adalah yang paling baik akhlaknya”, HR. Tirmidzi).</p>`, "Bagian 4"),
    ay("Ayat Inti", "Akhlak Nabi dan Ciri Akhlaqul Karimah", [
      ayat("68:4", { title: "Akhlak Rasulullah saw.", tone: "emerald" }),
      ayat("91:7-10", { title: "Ciri 1: menyucikan jiwa", tone: "sky", note: "Beruntung yang menyucikan jiwa, merugi yang mengotorinya." }),
      ayat("79:40-41", { title: "Ciri 3: menahan hawa nafsu", tone: "amber" })
    ]),
    tip("Catatan sumber hadis", "Slide menyebut hadis “menyempurnakan akhlak” sebagai HR. Bukhari di satu tempat dan HR. Baihaqi di tempat lain. ➕ Hadis ini diriwayatkan al-Bukhari dalam <em>al-Adab al-Mufrad</em> (bukan Shahih al-Bukhari), juga oleh Ahmad dan al-Baihaqi. Di soal, keduanya bisa muncul.", "info"),
    A("Ruang Lingkup dan Jenis Akhlak", `<p>Modul membagi ruang lingkup akhlak menjadi tiga arah:</p>
<ul>
<li><strong>Kepada Allah:</strong> bertauhid, menjauhi syirik, berbaik sangka kepada-Nya.</li>
<li><strong>Kepada manusia:</strong> kepada <strong>diri sendiri</strong> (menjaga kesehatan, kehormatan, tidak menzalimi diri), <strong>orang tua</strong>, dan <strong>orang lain</strong>.</li>
<li><strong>Kepada alam:</strong> flora dan fauna.</li>
</ul>
<p>Jenisnya dua: <strong>akhlaq al-karimah</strong> (mulia), yaitu perilaku yang mencerminkan penghambaan kepada Allah semata; dan <strong>akhlaq al-madzmumah</strong> (tercela), yaitu perilaku yang mencerminkan penghambaan kepada hawa nafsu semata.</p>`, "Bagian 5"),
    tip("Kekeliruan yang sering terjadi", "<ul><li>Mengira akhlak kepada diri sendiri tidak termasuk ruang lingkup. Di modul ia masuk cabang <strong>manusia</strong>.</li><li>Mengira akhlak madzmumah = tidak punya akhlak. Yang benar: punya akhlak, tetapi tercela.</li><li>Menyamakan akhlak dengan sopan santun. Akhlak lebih luas: mencakup hubungan dengan Allah dan alam.</li></ul>", "warn"),
    rv("Cek Pemahaman", "Tebak Istilahnya", [
      { prompt: "Penjelasan teoretis mengapa sesuatu baik/buruk", answer: "Etika", reason: "Ukurannya akal." },
      { prompt: "Norma yang berlaku di komunitas tertentu", answer: "Moral", reason: "Lokal/temporal." },
      { prompt: "Sifat tertanam dalam jiwa → perbuatan mudah dan ringan", answer: "Definisi al-Ghazali", reason: "Kata kunci “mudah dan ringan”." },
      { prompt: "Manifestasi iman, Islam, dan ihsan", answer: "Hakikat akhlaqul karimah", reason: "Buah ajaran Islam." }
    ])
  ],

  p10: [
    tip("Tentang judul pertemuan ini", "Berkas modul pertemuan 10 bernama “Konsep Baik Buruk”, tetapi seluruh isinya membahas <strong>liberalisasi pemikiran Islam dan pluralisme agama</strong>. Materi di sini mengikuti isi modul.", "info"),
    A("Problematika dan Tantangan Umat", `<p>Modul membagi masalah umat Islam menjadi dua sumber.</p>
<p><strong>Internal</strong> (dari dalam umat): <em>taqlid a’ma</em>, bid’ah dan khurafat, kejumudan berpikir, perpecahan, kebodohan, serta problem ilmu pengetahuan, pendidikan Islam (pesantren, madrasah, perguruan tinggi), persatuan, dan sistemik.</p>
<p><strong>Eksternal</strong> (dari luar): westernisasi/modernisasi, liberalisme, pluralisme, sekularisme, rasionalisme, feminisme, materialisme, dan lain-lain.</p>`, "Bagian 1"),
    tbl("Kamus Istilah Problematika Umat", ["Istilah", "Artinya", "Contoh", "Jangan tertukar dengan"], [
      ["Taqlid a’ma", "Mengikuti pendapat secara buta, tanpa tahu dalil dan alasannya", "“Pokoknya kata guru saya begitu,” tanpa mau melihat dalil", "Ittiba’: mengikuti pendapat sambil mengetahui dalilnya"],
      ["Bid’ah", "Menambah atau mengurangi ibadah mahdhah tanpa tuntunan Nabi", "Menambah rakaat shalat wajib", "Inovasi urusan dunia (kuliah daring) yang bukan bid’ah (lihat P7)"],
      ["Khurafat", "Kepercayaan atau cerita mistis tanpa dasar wahyu", "Percaya benda pusaka membawa keberuntungan", "Mukjizat/karamah yang berdasar dalil"],
      ["Jumud", "Beku, menolak berpikir dan pembaruan", "Menolak semua teknologi karena “tidak ada di zaman Nabi”", "Teguh memegang prinsip yang benar"],
      ["Sekularisme", "Memisahkan agama dari urusan publik (politik, ekonomi, pendidikan)", "“Agama urusan masjid, jangan dibawa ke kantor.”", "Profesionalisme"],
      ["Liberalisme (agama)", "Menafsirkan agama sebebas-bebasnya, lepas dari kaidah dan wahyu", "Menganggap hukum aurat tidak berlaku lagi", "Ijtihad yang memakai kaidah"],
      ["Rasionalisme", "Menjadikan akal hakim tertinggi, di atas wahyu", "Menolak hal gaib karena tidak masuk akal", "Burhani: memakai akal tanpa bertentangan dengan wahyu (P1)"],
      ["Materialisme", "Hanya materi yang nyata dan bernilai", "Mengukur sukses hanya dari harta", "Bekerja keras mencari rezeki halal"]
    ]),
    A("Liberalisasi Pemikiran Islam", `<p>Liberalisasi pemikiran Islam adalah upaya membebaskan pemahaman Islam dari pegangan yang sudah mapan. Modul menyebut <strong>empat bentuknya</strong>: <strong>pluralisme agama</strong>, <strong>relativisme kebenaran</strong>, <strong>kritik otentisitas al-Qur’an</strong>, dan <strong>dekonstruksi syari’ah</strong>. Keempatnya menimbulkan <strong>kerancuan pemahaman Islam</strong> pada aqidah, syari’ah, dan akhlak.</p>
<p>Modul juga mengutip dua tokoh misi abad ke-19 dan ke-20 untuk menunjukkan bahwa tantangan bagi umat juga berupa pemikiran: <strong>Samuel Zwemer</strong> (Konferensi Misionaris 1935) menyatakan misinya bukan menghancurkan umat Islam, melainkan <strong>memisahkan mereka dari Islam</strong> agar menjadi muslim yang tidak berakhlak; dan <strong>Henry Martyn</strong> (1781–1812) yang datang “bukan dengan senjata tetapi dengan kata-kata, akal sehat, dan cinta”.</p>`, "Bagian 2"),
    petaLiberal,
    A("Pluralisme Agama", `<p><strong>Definisi</strong> (Lorens Bagus, <em>Kamus Filsafat</em>; Simon Blackburn, <em>Oxford Dictionary of Philosophy</em>): paham bahwa <strong>semua kebenaran bersifat relatif</strong> dan semua mempunyai nilai yang sama; cara pandang terhadap pluralitas agama yang memandang <strong>semua agama sebanding atau setara</strong>.</p>
<p>Cara pandang ini punya tiga ciri: <strong>no truth claim</strong> (tak seorang pun boleh mengklaim agamanya paling benar), agama dianggap <strong>respon manusia</strong> terhadap Yang Ilahi, dan semuanya <strong>relatif</strong>. Ringkasnya: “agama = relatif; semua agama sama-sama jalan menuju keselamatan”.</p>
<p>Modul lalu bertanya: <em>mungkinkah menyamakan agama-agama, sementara terdapat perbedaan mendasar antara satu agama dan lainnya?</em> Untuk menjawabnya, modul membandingkan nama Tuhan, sumber ajaran, dan konsep ketuhanan lima agama: Islam (Allah; wahyu al-Qur’an; transenden sekaligus imanen), Yahudi, Kristen, Hindu, dan Buddha. Kesimpulan modul: konsep ketuhanan dan sumbernya berbeda secara mendasar, sehingga agama-agama tidak dapat disamakan.</p>`, "Bagian 3"),
    tbl("Tokoh Pluralisme Agama", ["Tokoh", "Gagasan", "Istilah kunci"], [
      ["John Hick (1922–2012)", "Semua agama adalah respon berbeda terhadap Realitas yang sama; buku <em>God Has Many Names</em>", "Global Teologi"],
      ["Frithjof Schuon (1907–1998)", "Kebenaran yang sama tersembunyi di semua bentuk agama (<em>the same truth hidden in all the forms</em>)", "Transcendent Unity of Religions; <strong>esoteris</strong> (batin, dianggap sama) vs <strong>eksoteris</strong> (lahir, berbeda)"]
    ], [{ label: "Istilah transenden & imanen", target: "row", row: 1, title: "Dua istilah di tabel perbandingan", text: "<strong>Transenden</strong>: Tuhan Mahatinggi, berbeda dan di luar ciptaan. <strong>Imanen</strong>: Tuhan dekat dan hadir mengatur ciptaan. Modul menyebut Allah dalam Islam berdimensi transenden sekaligus imanen." }]),
    A("Implikasi Pluralisme Agama", `<p>Modul menyebut lima dampak:</p>
<ol>
<li><strong>Relativisme dan inklusivisme teologis</strong> (anti-absolut): umat diajak tidak meyakini agamanya mutlak benar. <em>Inklusivisme teologis</em> = menganggap kebenaran dan keselamatan juga ada di agama lain; lawannya <em>eksklusivisme</em> = meyakini kebenaran agama sendiri.</li>
<li><strong>Klaim keselamatan agama lain dan diskursus ahlul kitab:</strong> keselamatan dianggap bukan hanya milik Islam.</li>
<li><strong>Nikah beda agama:</strong> dianggap sah karena “pasangan hidup tak mungkin dibatasi sekat agama” (kutipan Abdul Moqsith Ghazali yang dikritik modul). Akibatnya pasangan tidak punya titik temu dalam ibadah sehari-hari.</li>
<li><strong>Doa antaragama:</strong> doa bersama dianggap tak masalah karena Tuhan dianggap sama; umat bingung kepada Tuhan yang mana doa dipanjatkan.</li>
<li><strong>Dialog teologis antaragama</strong> yang menggiring pada kebingungan, kompromi, relativisme, dan inklusivisme, sampai pindah agama dianggap tidak masalah.</li>
</ol>
<p><strong>Kesimpulan modul:</strong> tujuan pluralisme agama adalah menggeser keyakinan menuju kekufuran; bila seorang muslim meyakini semua agama sama benar, akan muncul kekacauan (<em>chaos</em>) dalam kehidupan beragama, baik dalam <em>mu’amalah ma’an-nas</em> maupun <em>mu’amalah ma’allah</em>.</p>`, "Bagian 4"),
    tbl("Pluralitas vs Pluralisme: Bedanya Penting", ["", "Pluralitas", "Pluralisme agama"], [
      ["Artinya", "Fakta bahwa masyarakat terdiri dari banyak agama", "Paham bahwa semua agama sama benar"],
      ["Sikap Islam", "Diterima; hidup rukun, adil, saling membantu dalam urusan dunia", "Ditolak (➕ juga Fatwa MUI No. 7/MUNAS VII/MUI/11/2005)"],
      ["Contoh", "Kerja kelompok lintas agama, saling menjaga keamanan saat hari raya", "Ikut ritual agama lain karena “intinya sama”"],
      ["Dalil", "QS. al-Mumtahanah [60]: 8; al-Kafirun [109]: 6", "QS. Ali ‘Imran [3]: 19, 85"]
    ], [{ label: "Kekeliruan umum", target: "col", col: 2, title: "Menolak pluralisme ≠ intoleran", text: "Banyak yang mengira menolak pluralisme berarti memusuhi umat lain. Modul P13 justru menyebut tujuan habluminannas adalah <strong>tasamuh</strong> (toleransi) dan menghindari konflik. Toleransi = menghormati dan membiarkan orang beribadah menurut agamanya, bukan menyamakan ajaran." }]),
    ay("Ayat Inti", "Tegas dalam Akidah, Baik dalam Pergaulan", [
      ayat("3:85", { title: "Agama yang diterima", tone: "emerald" }),
      ayat("109:6", { title: "Lakum dinukum wa liya din", tone: "sky" }),
      ayat("60:8", { title: "Berbuat baik dan adil kepada non-muslim", tone: "amber" }),
      ayat("2:221", { title: "➕ Larangan menikahi orang musyrik", tone: "rose", note: "➕ Dipakai untuk menjawab implikasi “nikah beda agama”. MUI (Fatwa No. 4/MUNAS VII/MUI/8/2005) menyatakan perkawinan beda agama haram dan tidak sah." })
    ]),
    tip("Adab saat membahas agama lain", "Membandingkan konsep ketuhanan bertujuan memahami perbedaan, bukan merendahkan. Islam melarang memaki sesembahan agama lain (QS. al-An’am [6]: 108, lihat P2).", "warn")
  ],

  p11: [
    A("PHIWM dan PHIWK", `<p><strong>PHIWM</strong> (Pedoman Hidup Islami Warga Muhammadiyah) adalah keputusan <strong>Muktamar Muhammadiyah ke-44</strong> di Jakarta, 6–9 Rabi’ul Akhir 1421 H / <strong>8–11 Juli 2000 M</strong>. Isinya acuan perilaku warga Muhammadiyah, dan umat Islam pada umumnya, dalam kehidupan sehari-hari berdasarkan nilai dan norma Islam dari al-Qur’an dan as-Sunnah al-Maqbulah.</p>
<p><strong>PHIWK</strong> (Pedoman Hidup Islami Warga Kampus) memuat materi PHIWM yang diberi <strong>tambahan dan penyesuaian</strong> dengan kehidupan kampus (Universitas Muhammadiyah Yogyakarta). Jadi PHIWK adalah turunan PHIWM, bukan hasil muktamar tersendiri.</p>
<p>Modul memakai <strong>empat ruang lingkup ajaran Islam</strong> untuk menyusun kehidupan pribadi: <strong>aqidah, akhlak, ibadah, dan mu’amalah duniawiyah</strong>.</p>`, "Bagian 1"),
    empatAspek,
    A("Kehidupan Pribadi dalam Aqidah", `<p>(1) Setiap muslim memiliki prinsip hidup dan kesadaran imani berupa <strong>tauhid yang benar, ikhlas, dan penuh ketundukan</strong>, sehingga menjadi <em>‘Ibad ar-Rahman</em>: mukmin, muslim, muttaqin, dan muhsin yang paripurna (QS. al-Furqan [25]: 63–77).</p>
<p>(2) Iman dan tauhid menjadi <strong>sumber seluruh kegiatan hidup</strong>; menjauhi dan menolak <strong>syirik, takhayul, bid’ah, dan khurafat</strong> (QS. an-Nisa’ [4]: 48, 136; al-Baqarah [2]: 105, 221).</p>`, "Bagian 2"),
    tbl("Empat Perusak Tauhid", ["Istilah", "Artinya", "Contoh di kehidupan mahasiswa", "Kekeliruan yang sering terjadi"], [
      ["Syirik", "Menyekutukan Allah dalam ibadah atau keyakinan", "Meminta kelulusan kepada “orang pintar”", "Mengira syirik hanya menyembah patung"],
      ["Takhayul", "Percaya hal gaib tanpa dasar", "Takut memakai nomor kursi 13", "Menganggapnya sekadar budaya yang tidak berdampak"],
      ["Bid’ah", "Menambah/mengurangi ibadah mahdhah tanpa tuntunan", "Membuat “shalat kelulusan” dengan tata cara khusus", "Menyebut semua hal baru bid’ah, padahal urusan dunia tidak"],
      ["Khurafat", "Cerita/keyakinan mistis yang tak bersumber wahyu", "Percaya batu akik mendatangkan jodoh", "Menyamakannya dengan karamah yang ada dalilnya"]
    ]),
    A("Kehidupan Pribadi dalam Akhlak", `<p>(1) Meneladani perilaku Nabi hingga menjadi <em>uswah hasanah</em>, dengan sifat <strong>shiddiq</strong> (jujur), <strong>amanah</strong> (dapat dipercaya), <strong>tabligh</strong> (menyampaikan), dan <strong>fathanah</strong> (cerdas) (QS. al-Qalam [68]: 4; al-Ahzab [33]: 21).</p>
<p>(2) Amal dan kegiatan didasari <strong>niat ikhlas</strong>, menjauhi <strong>riya</strong> (pamer), <strong>sombong</strong>, <strong>israf</strong> (boros), <strong>fasad</strong> (merusak), <strong>fakhsya’</strong> (keji), dan kemunkaran (QS. al-Bayyinah [98]: 5).</p>
<p>(3) Menunjukkan akhlak mulia hingga disukai dan diteladani, menjauhi akhlak tercela yang membuat dibenci.</p>
<p>(4) Di mana pun bekerja, <strong>menjauhi korupsi dan kolusi</strong> serta praktik buruk yang merugikan hak publik.</p>`, "Bagian 3"),
    tbl("Sifat Nabi dalam Kehidupan Kampus", ["Sifat", "Artinya", "Wujud nyata", "Lawannya"], [
      ["Shiddiq", "Jujur", "Tidak titip absen, tidak plagiat", "Kadzib (dusta)"],
      ["Amanah", "Dapat dipercaya", "Mengelola uang kas kelas dengan transparan", "Khianat"],
      ["Tabligh", "Menyampaikan kebenaran", "Membagikan info tugas ke seluruh kelas, tidak disimpan sendiri", "Kitman (menyembunyikan)"],
      ["Fathanah", "Cerdas", "Belajar sungguh-sungguh dan memecahkan masalah dengan bijak", "Baladah (bodoh/lalai)"]
    ]),
    A("Kehidupan Pribadi dalam Ibadah", `<p>(1) Senantiasa <strong>membersihkan jiwa</strong> menuju pribadi <strong>muttaqin</strong> dengan ibadah yang tekun dan menjauhi nafsu buruk, sehingga terpancar kepribadian shalih yang menghadirkan <strong>kedamaian dan kemanfaatan</strong> bagi diri dan sesama (QS. asy-Syams [91]: 5–8; Ali ‘Imran [3]: 114).</p>
<p>(2) Melaksanakan <strong>ibadah mahdhah</strong> dengan sebaik-baiknya dan <strong>menghidupsuburkan amal nawafil</strong> (ibadah sunnah) sesuai tuntunan Rasul, dengan iman yang kokoh, ilmu yang luas, dan amal shalih yang tulus.</p>
<p><strong>Kapan disebut berhasil?</strong> Ibadahnya terlihat dari perilaku. Rajin shalat malam tetapi suka merendahkan teman berarti poin (1) belum tercapai.</p>`, "Bagian 4"),
    A("Kehidupan Pribadi dalam Mu’amalah Duniawiyah", `<p>(1) Menyadari diri sebagai <strong>abdi dan khalifah</strong> di bumi, sehingga menyikapi dunia secara <strong>aktif dan positif</strong>, tidak menjauhi pergumulan kehidupan, dengan landasan iman, Islam, dan ihsan (QS. al-Baqarah [2]: 21, 30; adz-Dzariyat [51]: 56).</p>
<p>(2) Berpikir <strong>burhani</strong> (akal dan sains), <strong>bayani</strong> (teks wahyu), dan <strong>irfani</strong> (hati), sehingga karya pemikiran dan amalnya memadukan <em>hablum minallah</em> dan <em>hablum minannas</em> serta membawa maslahat (QS. Ali ‘Imran [3]: 112).</p>
<p>(5) Memiliki <strong>etos kerja islami</strong>: kerja keras, disiplin, tidak menyia-nyiakan waktu, berusaha maksimal/optimal untuk mencapai tujuan (QS. Ali ‘Imran [3]: 142).</p>`, "Bagian 5"),
    tip("Poin 3 dan 4 tidak ada di slide", "Slide mu’amalah duniawiyah menampilkan poin 1, 2, lalu langsung “Lanjutan… 5”. Yang perlu dihafal hanya tiga poin di atas.", "info"),
    ay("Ayat Inti", "Dalil Karakter Pribadi Muslim", [
      ayat("25:63", { title: "‘Ibad ar-Rahman", tone: "emerald" }),
      ayat("98:5", { title: "Ikhlas", tone: "sky" }),
      ayat("4:48", { title: "Syirik dosa yang tidak diampuni", tone: "rose" }),
      ayat("94:7-8", { title: "➕ Etos kerja: selesai satu urusan, kerjakan yang lain", tone: "amber", note: "➕ Tambahan di luar slide untuk poin etos kerja islami." })
    ]),
    rv("Cek Pemahaman", "Aspek Mana yang Bolong?", [
      { prompt: "Rajin puasa sunnah, tapi malas mengerjakan tugas kelompok", answer: "Mu’amalah duniawiyah (etos kerja)", reason: "Ibadah baik, mu’amalah belum." },
      { prompt: "Jujur dan pekerja keras, tapi percaya jimat penglaris", answer: "Aqidah", reason: "Takhayul/syirik menodai tauhid." },
      { prompt: "Aktif organisasi, tapi sering pamer kebaikan di media sosial", answer: "Akhlak (riya)", reason: "Akhlak poin 2." }
    ])
  ],

  p13: [
    A("Makna Pergaulan dalam Islam", `<p>Hubungan dengan sesama manusia, <strong>muslim maupun non-muslim</strong>, diatur dalam konsep <strong>habluminannas</strong>. Tujuannya menciptakan <strong>keharmonisan</strong> dan <strong>tasamuh</strong> (toleransi) dalam pergaulan lingkup mu’amalah, serta <strong>menghindari konflik</strong>.</p>
<p>Khusus sesama muslim, hubungan itu disebut <strong>ukhuwah islamiyah</strong> (persaudaraan Islam), yang menurut modul punya <strong>lima tingkatan</strong>.</p>`, "Bagian 1"),
    tanggaUkhuwah,
    tip("Arti versi slide vs versi umum", "Slide mengartikan <strong>ta’aruf = saling memahami</strong>, <strong>tafahum = saling menolong</strong>, ta’awun = saling membantu, <strong>takaful = empati</strong>, itsar = mendahulukan yang lebih membutuhkan. ➕ Di banyak buku: ta’aruf = saling mengenal, tafahum = saling memahami, ta’awun = saling menolong, takaful = saling menanggung. Saat ujian, cocokkan dengan pilihan yang tersedia; urutannya tetap sama.", "warn"),
    A("Adab Pergaulan Sesama Muslim", `<p>Modul menyebut delapan adab. Penjelasan dan contohnya ada di tabel berikut.</p>`, "Bagian 2"),
    tbl("8 Adab Sesama Muslim", ["Adab", "Maksudnya", "Contoh", "Kekeliruan yang sering terjadi"], [
      ["1. Mengucapkan salam", "Mendoakan keselamatan saat bertemu atau masuk rumah (an-Nur 27)", "Memulai pesan grup dengan salam", "Masuk ruang/rumah orang tanpa izin dan salam"],
      ["2. Berjabat tangan", "Tanda keakraban, kerukunan, persahabatan, atau permintaan maaf", "Bersalaman setelah berdamai", "Berlaku juga dengan lawan jenis bukan mahram (lihat batas di Bagian 3)"],
      ["3. Mencari teman yang baik", "Teman memengaruhi diri, seperti pembawa minyak wangi vs pandai besi (HR. Bukhari)", "Bergabung dengan kelompok belajar yang rajin", "Memilih teman hanya karena populer"],
      ["4. Meminta izin", "Tidak memakai barang/ruang/waktu orang tanpa izin", "Bertanya dulu sebelum meminjam laptop", "Menganggap teman dekat boleh tanpa izin"],
      ["5. Menghormati yang tua, menyayangi yang muda", "“Bukan golongan kami yang tidak menyayangi yang kecil dan tidak menghormati yang tua” (HR. Tirmidzi)", "Menyapa dosen dan kakak tingkat dengan sopan; membimbing adik tingkat", "Merendahkan adik tingkat saat ospek"],
      ["6. Berbicara yang sopan", "Biasakan permisi, maaf, tolong, terima kasih. “Kata-katamu adalah kualitas dirimu.”", "Meminta tolong dengan kalimat santun di chat", "Berkata kasar karena “cuma bercanda”"],
      ["7. Tidak saling menghina", "Larangan mengolok-olok, memanggil gelar buruk, berprasangka, mencari-cari kesalahan, menggunjing (al-Hujurat 11–12)", "Tidak membuat meme ejekan tentang teman", "Mengira body shaming di grup itu bukan menghina"],
      ["8. Saling menasihati dalam kebaikan", "Mengingatkan dengan cara baik; ➕ QS. al-‘Ashr [103]: 3", "Mengingatkan teman yang lupa shalat dengan halus", "Menasihati di depan umum sampai mempermalukan"]
    ]),
    ay("Ayat Inti", "Dalil Sesama Muslim", [
      ayat("24:27", { title: "Izin dan salam", tone: "emerald" }),
      ayat("49:10", { title: "➕ Orang mukmin bersaudara", tone: "sky" }),
      ayat("49:11", { title: "Jangan mengolok-olok", tone: "amber" }),
      ayat("49:12", { title: "Jauhi prasangka & ghibah (dikutip slide)", tone: "violet" }),
      ayat("5:2b", { title: "Ta’awun dalam kebaikan", tone: "indigo" })
    ]),
    A("Pergaulan Antar Lawan Jenis", `<p>Modul menyebut enam batas. Tujuannya menjaga kehormatan dan menutup jalan menuju zina, bukan melarang kerja sama yang wajar seperti belajar di kelas atau diskusi kelompok di tempat terbuka.</p>`, "Bagian 3"),
    tbl("6 Batas Pergaulan Lawan Jenis", ["Batas", "Dalil di slide", "Penerapan", "Kekeliruan yang sering terjadi"], [
      ["1. Menutup aurat", "al-Ahzab [33]: 59", "Berpakaian sopan saat kuliah, termasuk saat kamera Zoom menyala", "Mengira aturan aurat hanya untuk perempuan"],
      ["2. Menundukkan pandangan", "an-Nur [24]: 30 (laki-laki), 31 (perempuan)", "Tidak menatap atau menyimpan foto lawan jenis dengan syahwat", "Merasa aman karena “cuma lihat di media sosial”"],
      ["3. Tidak menyentuh lawan jenis", "“Ditusuk jarum besi lebih baik daripada menyentuh wanita yang tidak halal baginya” (HR. Thabrani)", "Menangkupkan tangan di dada sebagai ganti salaman", "Menganggap jabat tangan bukan mahram selalu boleh"],
      ["4. Tidak berdua-duaan", "“Janganlah laki-laki berdua-duaan dengan wanita kecuali bersama mahramnya” (HR. Bukhari & Muslim)", "Kerja kelompok di perpustakaan atau ramai-ramai", "Mengira berdua di kos/mobil aman karena “cuma ngerjain tugas”"],
      ["5. Tidak berpacaran", "al-Isra’ [17]: 32: jangan <em>mendekati</em> zina", "Ta’aruf dengan cara yang syar’i sebelum menikah", "Mengira dilarang hanya zinanya; ayat melarang mendekatinya"],
      ["6. Tidak berzina", "al-Isra’ [17]: 32", "Menjaga diri dan menikah bila sudah mampu", "Menganggap pergaulan bebas urusan pribadi"]
    ], [{ label: "Slide “Pacaran Positif”", target: "row", row: 4, title: "Permainan kata di slide", text: "Slide memelesetkan “pacaran itu positif”: positif zina, positif haram, positif hamil. Yang “positif halal” adalah <strong>menikah</strong>. Slide lain: “Pacaran sebelum nikah ❌, ta’aruf sebelum nikah ✓”." }]),
    A("Pergaulan yang Terlarang", `<p>Tiga bentuk pergaulan yang dilarang menurut modul:</p>
<ol>
<li><strong>Mengonsumsi khamar</strong> (minuman yang memabukkan). Dalil di slide: QS. al-Baqarah [2]: 219, dosanya lebih besar daripada manfaatnya. ➕ Larangan tegasnya di QS. al-Ma’idah [5]: 90.</li>
<li><strong>Penggunaan narkoba.</strong> Akibatnya digambarkan slide: dikejar polisi, orang tua kecewa, setan senang. ➕ Para ulama menyamakannya dengan khamar karena sama-sama merusak akal.</li>
<li><strong>Perkelahian antarkelompok atau tawuran.</strong> Bertentangan dengan tujuan habluminannas: menghindari konflik.</li>
</ol>`, "Bagian 4"),
    ay("Ayat Inti", "Dalil Batas dan Larangan", [
      ayat("24:30", { title: "Menundukkan pandangan", tone: "emerald" }),
      ayat("33:59", { title: "Menutup aurat", tone: "sky" }),
      ayat("17:32", { title: "Jangan mendekati zina", tone: "rose" }),
      ayat("5:90", { title: "➕ Khamar perbuatan setan", tone: "amber" })
    ])
  ],

  p14: [
    A("Kajian PHIWM: Akhlak Bermasyarakat", `<p>Pertemuan ini mengkaji <strong>PHIWM</strong> (Pedoman Hidup Islami Warga Muhammadiyah, Muktamar ke-44, Jakarta, 8–11 Juli 2000) pada bagian <strong>kehidupan dalam keluarga</strong>. PHIWM mengatur <em>mu’amalah</em> atau hubungan horizontal (<em>hablum minannas</em>) berdasarkan al-Qur’an dan as-Sunnah al-Maqbulah.</p>
<p>Kenapa akhlak bermasyarakat dimulai dari keluarga? Karena keluarga adalah tempat nilai ditanamkan paling awal dan paling intensif. Masyarakat yang baik tersusun dari keluarga-keluarga yang baik.</p>`, "Bagian 1"),
    keluargaKeMasyarakat,
    A("Kedudukan Keluarga", `<p>(1) Keluarga adalah <strong>tiang utama kehidupan umat dan bangsa</strong>, tempat sosialisasi nilai yang <strong>paling intensif dan menentukan</strong>. Karena itu setiap anggota Muhammadiyah wajib mewujudkan keluarga <strong>sakinah</strong> (tenteram), <strong>mawaddah</strong> (penuh cinta), dan <strong>rahmah</strong> (penuh kasih sayang) (QS. ar-Rum [30]: 21).</p>
<p>(2) Keluarga sakinah dikaitkan dengan <strong>Gerakan Jamaah dan Dakwah Jamaah</strong>, yaitu dakwah yang berbasis komunitas tempat tinggal, menuju masyarakat Islam yang sebenar-benarnya (QS. Ali ‘Imran [3]: 104).</p>`, "Bagian 2"),
    tip("Koreksi kecil slide", "Slide menulis “ar-Rum [40]: 21”. Surah ar-Rum adalah surah ke-<strong>30</strong>.", "warn"),
    A("Fungsi Keluarga", `<p>(1) Selain menyosialisasikan nilai ajaran Islam, keluarga menjalankan <strong>fungsi kaderisasi</strong>: anak-anak tumbuh menjadi generasi muslim yang menjadi <strong>pelangsung dan penyempurna gerakan dakwah</strong> (QS. an-Nisa’ [4]: 9; al-Baqarah [2]: 132–133; Maryam [19]: 59).</p>
<p>(2) Keluarga dituntut <strong>keteladanan</strong> (<em>uswah hasanah</em>) dalam kehidupan islami. Wujudnya dirinci di tabel berikut.</p>`, "Bagian 3"),
    tbl("Wujud Keteladanan dalam Keluarga", ["Wujud", "Contoh sehari-hari", "Yang bertentangan"], [
      ["Ihsan dan bergaul dengan makruf", "Berbicara lembut kepada pasangan dan anak", "Membentak dan merendahkan"],
      ["Saling menyayangi, mengasihi, menghargai", "Menghargai pendapat adik walau berbeda", "Pilih kasih antaranak"],
      ["Menghormati hak hidup anak", "Memenuhi gizi, kesehatan, pendidikan anak", "Menelantarkan anak"],
      ["Pendidikan akhlak yang paripurna", "Membiasakan jujur, shalat, berterima kasih", "Menyerahkan pendidikan akhlak sepenuhnya ke sekolah"],
      ["Menjauhkan dari siksa neraka", "Mengajak keluarga taat (at-Tahrim 6)", "Membiarkan anggota keluarga bermaksiat"],
      ["Musyawarah", "Memutuskan rencana keluarga bersama", "Keputusan sepihak tanpa mendengar"],
      ["Adil, persamaan hak dan kewajiban", "Tugas rumah dibagi adil", "Membebankan semua pekerjaan pada satu orang"],
      ["Menyantuni anggota yang tidak mampu", "Membantu biaya sekolah keponakan", "Abai pada kerabat yang kesulitan"]
    ]),
    A("Aktivitas Keluarga", `<p>(1) Di tengah arus media elektronik dan cetak yang makin terbuka, keluarga dituntut <strong>sungguh-sungguh mendidik anak</strong> dan menciptakan suasana harmonis agar terhindar dari pengaruh negatif (QS. Luqman [31]: 12–19). ➕ Hari ini wujudnya: mendampingi anak bermedia sosial dan bermain gim.</p>
<p>(2) Menunjukkan penghormatan dan perlakuan <strong>ihsan terhadap anak dan perempuan</strong>, serta <strong>menjauhi kekerasan</strong> dan <strong>penelantaran</strong> anggota keluarga (QS. al-Ma’idah [5]: 8; an-Nahl [16]: 90).</p>
<p>(3) Memiliki <strong>kepedulian sosial</strong>: hubungan yang ihsan, <em>ishlah</em> (mendamaikan), dan makruf dengan tetangga dan masyarakat, sehingga tercipta <strong><em>qaryah thayyibah</em></strong> (komunitas yang baik).</p>
<p>(4) <strong>Shalat</strong> menjadi <strong>prioritas utama</strong> dalam keluarga; kepala keluarga, bila perlu, memberi <strong>sanksi yang bersifat mendidik</strong> (QS. Maryam [19]: 59; at-Tahrim [66]: 6).</p>`, "Bagian 4"),
    tip("Kekeliruan yang sering terjadi", "<ul><li>Mengira “sanksi yang mendidik” (aktivitas 4) membolehkan kekerasan. Aktivitas 2 justru melarang kekerasan terhadap anggota keluarga.</li><li>Menukar kedudukan dan fungsi: <strong>tiang utama & sakinah</strong> = kedudukan; <strong>kaderisasi & keteladanan</strong> = fungsi.</li><li>Mengira qaryah thayyibah adalah nama program pemerintah. Ini istilah PHIWM untuk lingkungan yang baik hasil kepedulian keluarga.</li></ul>", "warn"),
    ay("Ayat Inti", "Dalil Keluarga", [
      ayat("30:21", { title: "Sakinah, mawaddah, rahmah", tone: "emerald" }),
      ayat("4:9", { title: "Jangan tinggalkan generasi yang lemah (kaderisasi)", tone: "sky" }),
      ayat("17:23", { title: "Berbakti kepada orang tua (keteladanan)", tone: "amber" }),
      ayat("66:6", { title: "Peliharalah dirimu dan keluargamu", tone: "rose" }),
      ayat("20:132", { title: "➕ Perintahkan keluargamu shalat", tone: "violet", note: "➕ Ayat ini tidak ada di slide, tetapi paling langsung mendukung aktivitas 4." })
    ]),
    rv("Cek Pemahaman", "Kedudukan, Fungsi, atau Aktivitas?", [
      { prompt: "Tempat sosialisasi nilai paling intensif dan menentukan", answer: "Kedudukan", reason: "Poin 1." },
      { prompt: "Anak menjadi pelangsung gerakan dakwah", answer: "Fungsi (kaderisasi)", reason: "Poin 1." },
      { prompt: "Tercipta qaryah thayyibah", answer: "Aktivitas", reason: "Poin 3: kepedulian sosial." },
      { prompt: "Membiasakan musyawarah", answer: "Fungsi (keteladanan)", reason: "Poin 2." }
    ])
  ]
};
