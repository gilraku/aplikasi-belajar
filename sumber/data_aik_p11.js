// AIK — Pertemuan 11: Karakter Pribadi Muslim berdasar PHIWK (sumber: PDF "Karakter_Pribadi_Muslim_11", 10 slide)
// Catatan: slide Mu'amalah Duniawiyah melompat dari poin 2 ke poin 5 (poin 3–4 tidak ada di slide).
const ayat = require("./ayat_aik_uas.js");
const ASPEK = [{ value: "aqidah", label: "Aqidah" }, { value: "akhlak", label: "Akhlak" }, { value: "ibadah", label: "Ibadah" }, { value: "muamalah", label: "Mu’amalah duniawiyah" }];

module.exports = {
  id: "p11",
  nomor: 11,
  judul: "Karakter Pribadi Muslim (PHIWK)",
  ujian: "UAS",
  hero: {
    badge: "Materi 11 • AIK",
    title: "Pribadi Muslim Dibentuk oleh 4 Aspek Ajaran",
    text: "Pelajari <strong>PHIWK</strong> (Pedoman Hidup Islami Warga Kampus) dan asalnya, <strong>PHIWM</strong> hasil Muktamar ke-44 (2000), lalu tuntunan kehidupan pribadi dalam <strong>aqidah, akhlak, ibadah, dan mu’amalah duniawiyah</strong>."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • Sejarah",
      title: "PHIWM → PHIWK",
      headers: ["", "PHIWM", "PHIWK"],
      rows: [
        ["Kepanjangan", "Pedoman Hidup Islami Warga <strong>Muhammadiyah</strong>", "Pedoman Hidup Islami Warga <strong>Kampus</strong>"],
        ["Asal", "Keputusan <strong>Muktamar Muhammadiyah ke-44</strong>, Jakarta, 6–9 Rabi’ul Akhir 1421 H / <strong>8–11 Juli 2000</strong>", "Materi PHIWM yang diberi <strong>tambahan dan penyesuaian</strong> dengan kehidupan kampus (Universitas Muhammadiyah Yogyakarta)"],
        ["Fungsi", "Pedoman/acuan perilaku warga Muhammadiyah dan umat Islam umumnya dalam kehidupan sehari-hari", "Pedoman perilaku warga kampus"],
        ["Dasar", "Nilai dan norma Islam dalam <strong>al-Qur’an dan as-Sunnah al-Maqbulah</strong>", "Sama"]
      ],
      modes: [
        { label: "Jebakan angka", target: "row", row: 1, title: "Muktamar ke-44, tahun 2000", text: "Yang sering tertukar: nomor muktamar (44), kota (Jakarta), dan tahun (2000 M / 1421 H). PHIWK bukan hasil muktamar, melainkan turunan PHIWM untuk kampus." }
      ]
    },
    {
      type: "cards",
      label: "Interaktif 2 • Ruang Lingkup Ajaran Islam",
      title: "4 Aspek Kehidupan Pribadi",
      cols: 2,
      items: [
        { badge: "1. Aqidah", tone: "emerald", title: "Tauhid jadi sumber seluruh kegiatan", text: "Ikhlas dan tunduk sehingga menjadi <em>‘Ibad ar-Rahman</em> (mukmin, muslim, muttaqin, muhsin). Menolak <strong>syirik, takhayul, bid’ah, khurafat</strong>." },
        { badge: "2. Akhlak", tone: "sky", title: "Meneladani akhlak Nabi", text: "Sifat <strong>shiddiq, amanah, tabligh, fathanah</strong>; niat ikhlas; jauhi riya, sombong, israf, fasad, fakhsya’; jauhi <strong>korupsi dan kolusi</strong>." },
        { badge: "3. Ibadah", tone: "amber", title: "Membersihkan jiwa", text: "Tekun beribadah menuju pribadi <strong>muttaqin</strong>; ibadah mahdhah sebaik-baiknya dan menghidupsuburkan <strong>amal nawafil</strong> (sunnah)." },
        { badge: "4. Mu’amalah duniawiyah", tone: "violet", title: "Aktif & positif di dunia", text: "Sadar sebagai <strong>abdi dan khalifah</strong>; berpikir <strong>burhani, bayani, irfani</strong>; <strong>etos kerja islami</strong>." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Rincian & Dalil",
      title: "Poin-Poin PHIWK dan Dalilnya",
      headers: ["Aspek", "Poin", "Dalil di slide"],
      rows: [
        ["Aqidah 1", "Prinsip hidup dan kesadaran imani berupa tauhid yang benar, ikhlas, penuh ketundukan → <em>‘Ibad ar-Rahman</em>", "al-Furqan [25]: 63–77"],
        ["Aqidah 2", "Iman dan tauhid sumber seluruh kegiatan; menjauhi syirik, takhayul, bid’ah, khurafat", "an-Nisa’ [4]: 48, 136; al-Baqarah [2]: 105, 221"],
        ["Akhlak 1", "Meneladani Nabi hingga menjadi <em>uswah hasanah</em>: shiddiq, amanah, tabligh, fathanah", "al-Qalam [68]: 4; al-Ahzab [33]: 21"],
        ["Akhlak 2", "Amal didasari niat ikhlas; jauhi riya, sombong, israf, fasad, fakhsya’, kemunkaran", "al-Bayyinah [98]: 5"],
        ["Akhlak 3", "Akhlak mulia agar disukai/diteladani; jauhi akhlak tercela yang membuat dibenci", "—"],
        ["Akhlak 4", "Di mana pun bekerja, jauhi korupsi, kolusi, dan praktik yang merugikan hak publik", "—"],
        ["Ibadah 1", "Membersihkan jiwa menuju pribadi muttaqin; jauhi nafsu buruk; hadirkan kedamaian dan manfaat", "asy-Syams [91]: 5–8; Ali ‘Imran [3]: 114"],
        ["Ibadah 2", "Ibadah mahdhah sebaik-baiknya + menghidupsuburkan amal nawafil; iman kokoh, ilmu luas, amal tulus", "—"],
        ["Mu’amalah 1", "Sadar sebagai abdi dan khalifah; menyikapi dunia secara aktif dan positif", "al-Baqarah [2]: 21, 30; adz-Dzariyat [51]: 56"],
        ["Mu’amalah 2", "Berpikir burhani, bayani, irfani; padukan hablum minallah dan hablum minannas", "Ali ‘Imran [3]: 112"],
        ["Mu’amalah 5", "Etos kerja islami: kerja keras, disiplin, tidak menyia-nyiakan waktu, berusaha maksimal", "Ali ‘Imran [3]: 142"]
      ],
      modes: [
        { label: "Catatan nomor", target: "row", row: 10, title: "Slide melompat dari 2 ke 5", text: "Di slide, poin mu’amalah duniawiyah tertulis 1, 2, lalu “Lanjutan… 5”. Poin 3 dan 4 tidak ditampilkan, jadi yang bisa ditanyakan hanya tiga poin di atas." },
        { label: "Kesimpulan modul", target: "col", col: 0, title: "Karakter terbentuk bila keempatnya sesuai", text: "Karakter pribadi muslim akan terbentuk jika keempat aspek (aqidah, akhlak, ibadah, mu’amalah) <strong>sesuai dengan al-Qur’an dan as-Sunnah al-Maqbulah</strong>." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 4 • Kamus Istilah",
      title: "Istilah yang Muncul di PHIWK",
      headers: ["Istilah", "Arti singkat"],
      rows: [
        ["<em>‘Ibad ar-Rahman</em>", "Hamba-hamba Allah Yang Maha Pengasih: rendah hati, menjawab orang jahil dengan kata yang baik (al-Furqan 63)"],
        ["Mukmin • muslim • muttaqin • muhsin", "Beriman • berserah diri • bertakwa • berbuat ihsan (beribadah seakan melihat Allah)"],
        ["Takhayul • khurafat", "Kepercayaan pada hal gaib tanpa dasar (mis. angka sial) • cerita/keyakinan mistis yang tak bersumber dari wahyu"],
        ["Shiddiq • amanah • tabligh • fathanah", "Jujur • dapat dipercaya • menyampaikan • cerdas"],
        ["Riya • israf • fasad • fakhsya’", "Pamer amal • boros/berlebihan • merusak • perbuatan keji"],
        ["Amal nawafil", "Ibadah sunnah tambahan, mis. shalat rawatib, puasa Senin–Kamis"],
        ["Burhani • bayani • irfani", "Pendekatan akal/sains • teks wahyu • hati (sama dengan P1)"]
      ]
    },
    {
      type: "ayat",
      label: "Ayat Inti",
      title: "Ciri Pribadi Muslim",
      items: [
        ayat("25:63", { title: "‘Ibad ar-Rahman (aqidah 1)", tone: "emerald" }),
        ayat("98:5", { title: "Niat ikhlas (akhlak 2)", tone: "sky" }),
        ayat("68:4", { title: "Teladan akhlak Nabi (akhlak 1)", tone: "amber" })
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Aspek Mana?",
      title: "Kelompokkan Perilaku Mahasiswa ke 4 Aspek PHIWK",
      headers: ["Perilaku", "Aspek"],
      rows: [
        { cells: ["Tidak percaya angka 13 membawa sial saat memilih nomor kursi ujian"], fields: [{ options: ASPEK, answer: "aqidah" }], ok: "✓ Menjauhi takhayul (aqidah 2)." },
        { cells: ["Menolak titip absen untuk teman meski diminta"], fields: [{ options: ASPEK, answer: "akhlak" }], ok: "✓ Shiddiq/amanah; menjauhi praktik curang." },
        { cells: ["Menambah shalat sunnah rawatib dan puasa Senin–Kamis"], fields: [{ options: ASPEK, answer: "ibadah" }], ok: "✓ Menghidupsuburkan amal nawafil (ibadah 2)." },
        { cells: ["Menyusun jadwal belajar dan menyelesaikan tugas sebelum tenggat"], fields: [{ options: ASPEK, answer: "muamalah" }], ok: "✓ Etos kerja islami: disiplin, tidak menyia-nyiakan waktu." },
        { cells: ["Menjadikan iman sebagai dasar memilih proyek magang yang halal"], fields: [{ options: ASPEK, answer: "aqidah" }], ok: "✓ Tauhid sumber seluruh kegiatan hidup." },
        { cells: ["Tidak mengunggah amal sedekah demi pujian"], fields: [{ options: ASPEK, answer: "akhlak" }], ok: "✓ Menjauhi riya (akhlak 2)." },
        { cells: ["Meneliti dampak limbah dengan data, lalu mengaitkannya dengan larangan berbuat fasad"], fields: [{ options: ASPEK, answer: "muamalah" }], ok: "✓ Berpikir burhani + bayani (mu’amalah 2)." }
      ]
    },
    {
      type: "reveal",
      label: "Studi Kasus • Melanggar Poin Mana?",
      title: "Temukan Poin PHIWK yang Dilanggar",
      items: [
        { prompt: "Pengurus organisasi kampus menaikkan harga sewa alat lalu mengambil selisihnya", answer: "Akhlak 4: jauhi korupsi", reason: "Merugikan hak publik (anggota organisasi)." },
        { prompt: "Mahasiswa membeli gadget mahal dengan berutang hanya demi gengsi", answer: "Akhlak 2: jauhi israf", reason: "Israf = boros/berlebihan." },
        { prompt: "“Dunia itu kotor, saya tidak mau ikut organisasi atau bekerja.”", answer: "Mu’amalah 1", reason: "Muslim menyikapi dunia secara aktif dan positif sebagai abdi dan khalifah." },
        { prompt: "Rajin shalat malam tetapi suka menyindir dan merendahkan teman", answer: "Ibadah 1", reason: "Ibadah seharusnya memancarkan kedamaian dan kemanfaatan bagi sesama." }
      ]
    }
  ],
  flashcards: [
    { tag: "Singkatan", q: "PHIWK dan PHIWM kepanjangannya?", a: "Pedoman Hidup Islami Warga Kampus; Pedoman Hidup Islami Warga Muhammadiyah." },
    { tag: "Sejarah", q: "PHIWM dirumuskan kapan dan di mana?", a: "Muktamar Muhammadiyah ke-44, Jakarta, 6–9 Rabi’ul Akhir 1421 H / 8–11 Juli 2000 M." },
    { tag: "Sejarah", q: "Hubungan PHIWK dengan PHIWM?", a: "PHIWK memuat materi PHIWM dengan tambahan dan penyesuaian untuk kehidupan kampus (UMY)." },
    { tag: "Lingkup", q: "4 ruang lingkup ajaran Islam di modul?", a: "Aqidah, akhlak, ibadah, mu’amalah duniawiyah." },
    { tag: "Aqidah", q: "Empat hal yang menodai tauhid menurut PHIWK?", a: "Syirik, takhayul, bid’ah, khurafat." },
    { tag: "Aqidah", q: "‘Ibad ar-Rahman menjadi mukmin, muslim, … ?", a: "Muttaqin dan muhsin yang paripurna (al-Furqan 63–77)." },
    { tag: "Akhlak", q: "Sifat Nabi yang diteladani?", a: "Shiddiq, amanah, tabligh, fathanah (al-Qalam 4; al-Ahzab 21)." },
    { tag: "Akhlak", q: "Perilaku yang harus dijauhi (akhlak 2)?", a: "Riya, sombong, israf, fasad, fakhsya’, dan kemunkaran (al-Bayyinah 5)." },
    { tag: "Akhlak", q: "Akhlak poin 4 di tempat kerja?", a: "Menjauhi korupsi, kolusi, dan praktik yang merugikan hak publik." },
    { tag: "Ibadah", q: "Dua poin kehidupan pribadi dalam ibadah?", a: "Membersihkan jiwa menuju pribadi muttaqin; melaksanakan ibadah mahdhah sebaik-baiknya dan menghidupsuburkan amal nawafil." },
    { tag: "Mu’amalah", q: "Cara berpikir islami menurut PHIWK?", a: "Burhani, bayani, dan irfani: memadukan hablum minallah dan hablum minannas." },
    { tag: "Mu’amalah", q: "Ciri etos kerja islami?", a: "Kerja keras, disiplin, tidak menyia-nyiakan waktu, berusaha maksimal/optimal (Ali ‘Imran 142)." },
    { tag: "Kesimpulan", q: "Kapan karakter pribadi muslim terbentuk?", a: "Jika keempat aspek (aqidah, akhlak, ibadah, mu’amalah) sesuai al-Qur’an & as-Sunnah al-Maqbulah." }
  ],
  quiz: [
    { q: "PHIWM dirumuskan pada …", opts: ["Muktamar Muhammadiyah ke-44 di Jakarta tahun 2000", "Muktamar ke-45 di Malang tahun 2005", "Muktamar ke-47 di Makassar tahun 2015", "Muktamar ke-41 di Surakarta tahun 1985"], ans: 0, exp: "6–9 Rabi’ul Akhir 1421 H / 8–11 Juli 2000 M.", optExp: ["Benar.", "Bukan.", "Bukan.", "Bukan."] },
    { q: "Hubungan PHIWK dengan PHIWM yang tepat adalah …", opts: ["PHIWK menggantikan PHIWM", "PHIWK memuat materi PHIWM dengan tambahan dan penyesuaian untuk kehidupan kampus", "PHIWK lebih dulu disusun daripada PHIWM", "Keduanya tidak berhubungan"], ans: 1, exp: "Isi slide sejarah perumusan.", optExp: ["Keliru.", "Benar.", "Keliru.", "Keliru."] },
    { q: "Menurut PHIWK, hal-hal yang menodai iman dan tauhid adalah …", opts: ["Riya, sombong, israf, fasad", "Syirik, takhayul, bid’ah, khurafat", "Korupsi dan kolusi", "Malas dan boros"], ans: 1, exp: "Poin aqidah 2.", optExp: ["Itu dijauhi di poin akhlak 2.", "Benar.", "Akhlak 4.", "Bukan rumusan slide."] },
    { q: "Sifat Nabi yang harus diteladani menurut kehidupan pribadi dalam akhlak adalah …", opts: ["Shiddiq, amanah, tabligh, fathanah", "Sabar, syukur, ridha, tawakal", "Ikhlas, ihsan, ittiba’, istiqamah", "Zuhud, wara’, qana’ah, tawadhu’"], ans: 0, exp: "Akhlak 1 (al-Qalam 4; al-Ahzab 21).", optExp: ["Benar.", "Bukan rumusan slide.", "Bukan.", "Bukan."] },
    { q: "Seorang pegawai menolak ikut “mark-up” anggaran meski semua rekannya melakukannya. Ia mengamalkan PHIWK poin …", opts: ["Aqidah 1", "Ibadah 2", "Akhlak 4", "Mu’amalah 2"], ans: 2, exp: "Menjauhi korupsi dan kolusi di mana pun bekerja.", optExp: ["Kurang tepat.", "Kurang tepat.", "Benar.", "Kurang tepat."] },
    { q: "Menghidupsuburkan amal nawafil berarti …", opts: ["Memperbanyak ibadah sunnah", "Mengurangi ibadah wajib", "Membuat ibadah baru", "Beribadah hanya saat Ramadhan"], ans: 0, exp: "Nawafil = ibadah sunnah.", optExp: ["Benar.", "Keliru.", "Itu bid’ah.", "Keliru."] },
    { q: "Cara berpikir islami yang disebut dalam PHIWK mu’amalah duniawiyah adalah …", opts: ["Burhani, bayani, irfani", "Tekstual saja", "Rasional bebas tanpa wahyu", "Mistis"], ans: 0, exp: "Sama dengan tiga pendekatan di P1.", optExp: ["Benar.", "Itu hanya bayani.", "Itu liberal.", "Bukan."] },
    { q: "Berikut ciri etos kerja islami menurut PHIWK, KECUALI …", opts: ["Kerja keras", "Disiplin", "Tidak menyia-nyiakan waktu", "Bekerja secukupnya agar tidak terlalu cinta dunia"], ans: 3, exp: "PHIWK menuntut usaha maksimal/optimal.", optExp: ["Ciri.", "Ciri.", "Ciri.", "Benar, bukan ciri."] },
    { q: "Karakter pribadi muslim akan terbentuk jika …", opts: ["Ibadah mahdhah dikerjakan saja", "Keempat aspek (aqidah, akhlak, ibadah, mu’amalah) sesuai al-Qur’an dan as-Sunnah al-Maqbulah", "Mengikuti tradisi masyarakat", "Memiliki ilmu yang luas"], ans: 1, exp: "Kesimpulan slide terakhir.", optExp: ["Hanya satu aspek.", "Benar.", "Bukan.", "Hanya sebagian."] },
    { q: "Sikap “menyikapi kehidupan dunia secara aktif dan positif serta tidak menjauhkan diri dari pergumulan kehidupan” didasari kesadaran sebagai …", opts: ["Abdi dan khalifah di bumi", "Pemilik bumi", "Penonton kehidupan", "Pertapa"], ans: 0, exp: "Mu’amalah 1 (al-Baqarah 21, 30; adz-Dzariyat 56).", optExp: ["Benar.", "Manusia bukan pemilik.", "Keliru.", "Justru ditolak."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS AIK — PERTEMUAN 11*
📚 *Karakter Pribadi Muslim (PHIWK)*

1️⃣ PHIWK = Pedoman Hidup Islami Warga Kampus: materi PHIWM + penyesuaian kampus. PHIWM = keputusan Muktamar ke-44, Jakarta, 8–11 Juli 2000 (6–9 Rabi’ul Akhir 1421 H).
2️⃣ Lingkup: aqidah • akhlak • ibadah • mu’amalah duniawiyah.
3️⃣ Aqidah: tauhid ikhlas → ‘Ibad ar-Rahman (al-Furqan 63–77); jauhi syirik, takhayul, bid’ah, khurafat.
4️⃣ Akhlak: teladani Nabi (shiddiq, amanah, tabligh, fathanah); niat ikhlas, jauhi riya, sombong, israf, fasad, fakhsya’ (al-Bayyinah 5); jauhi korupsi & kolusi.
5️⃣ Ibadah: bersihkan jiwa → muttaqin; ibadah mahdhah sebaik-baiknya + amal nawafil.
6️⃣ Mu’amalah: abdi & khalifah, aktif-positif; berpikir burhani-bayani-irfani; etos kerja islami (kerja keras, disiplin, hargai waktu, maksimal).
✅ Karakter terbentuk bila 4 aspek sesuai al-Qur’an & as-Sunnah al-Maqbulah.`
};
