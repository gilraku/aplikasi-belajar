// AIK — Pertemuan 14: Akhlak Bermasyarakat untuk Mewujudkan Masyarakat Utama (Kajian PHIWM, bagian keluarga)
// Sumber: PDF "Akhlak_Bermasyarakat_14" (10 slide). Slide menulis "ar-Rum [40]: 21"; nomor surah yang benar [30] dipakai di sini.
const ayat = require("./ayat_aik_uas.js");
const BAG = [{ value: "kedudukan", label: "Kedudukan keluarga" }, { value: "fungsi", label: "Fungsi keluarga" }, { value: "aktivitas", label: "Aktivitas keluarga" }];
const SIKAP = [{ value: "sesuai", label: "Sesuai PHIWM ✅" }, { value: "tidak", label: "Tidak sesuai ❌" }];

module.exports = {
  id: "p14",
  nomor: 14,
  judul: "Akhlak Bermasyarakat: Keluarga (PHIWM)",
  ujian: "UAS",
  hero: {
    badge: "Materi 14 • AIK",
    title: "Masyarakat Utama Dimulai dari Keluarga",
    text: "Kajian <strong>PHIWM</strong> tentang keluarga: <strong>kedudukan</strong> keluarga sebagai tiang utama umat dan bangsa, <strong>fungsi</strong> sosialisasi nilai dan kaderisasi, serta <strong>aktivitas</strong> keluarga: mendidik anak, anti-kekerasan, peduli tetangga (<em>qaryah thayyibah</em>), dan shalat sebagai prioritas."
  },
  cheatsheet: [
    {
      type: "callout",
      label: "Interaktif 1 • Sejarah PHIWM",
      tone: "info",
      heading: "Pedoman Hidup Islami Warga Muhammadiyah",
      html: "Dirumuskan pada <strong>Muktamar Muhammadiyah ke-44</strong>, Jakarta, 6–9 Rabi’ul Akhir 1421 H / <strong>8–11 Juli 2000 M</strong>. Menjadi pedoman perilaku warga Muhammadiyah dalam kehidupan sehari-hari, yaitu <strong>bermu’amalah / hubungan horizontal / hablum minannas</strong>, berdasarkan al-Qur’an dan as-Sunnah al-Maqbulah. (Sama dengan sejarah di P11.)"
    },
    {
      type: "table",
      label: "Interaktif 2 • Tiga Bagian Kajian Keluarga",
      title: "Kedudukan, Fungsi, Aktivitas",
      headers: ["Bagian", "Poin", "Isi pokok", "Dalil di slide"],
      rows: [
        ["<strong>Kedudukan</strong>", "1", "Keluarga = <strong>tiang utama kehidupan umat dan bangsa</strong>, tempat sosialisasi nilai yang paling intensif dan menentukan → wajib mewujudkan keluarga <strong>sakinah, mawaddah, dan rahmah</strong>", "ar-Rum [30]: 21"],
        ["", "2", "Mewujudkan keluarga sakinah yang terkait dengan <strong>Gerakan Jamaah dan Dakwah Jamaah</strong> menuju masyarakat Islam yang sebenar-benarnya", "Ali ‘Imran [3]: 104"],
        ["<strong>Fungsi</strong>", "1", "Selain menyosialisasikan nilai Islam, menjalankan <strong>fungsi kaderisasi</strong>: anak tumbuh menjadi pelangsung dan penyempurna gerakan dakwah", "an-Nisa’ [4]: 9; al-Baqarah [2]: 132–133; Maryam [19]: 59"],
        ["", "2", "<strong>Keteladanan (uswah hasanah)</strong>: ihsan, bergaul makruf, saling menyayangi, menghormati hak hidup anak, pendidikan akhlak, musyawarah, adil, persamaan hak-kewajiban, menyantuni anggota yang tidak mampu", "an-Nisa’ [4]: 19, 36, 128; al-Isra’ [17]: 23; Luqman [31]: 12–19"],
        ["<strong>Aktivitas</strong>", "1", "Di tengah arus media yang makin terbuka: sungguh-sungguh <strong>mendidik anak</strong> dan menciptakan suasana harmonis agar terhindar dari pengaruh negatif", "Luqman [31]: 12–19"],
        ["", "2", "Menghormati dan memperlakukan anak dan perempuan dengan ihsan; <strong>menjauhi kekerasan</strong> dan <strong>penelantaran</strong> anggota keluarga", "al-Ma’idah [5]: 8; an-Nahl [16]: 90"],
        ["", "3", "<strong>Kepedulian sosial</strong>: hubungan ihsan, ishlah, makruf dengan tetangga dan masyarakat → tercipta <strong><em>qaryah thayyibah</em></strong>", "an-Nisa’ [4]: 19, 36, 128; al-Isra’ [17]: 23; Luqman [31]: 14"],
        ["", "4", "<strong>Shalat</strong> dalam keluarga jadi <strong>prioritas utama</strong>; kepala keluarga bila perlu memberi <strong>sanksi yang mendidik</strong>", "Maryam [19]: 59; at-Tahrim [66]: 6"]
      ],
      modes: [
        { label: "Koreksi dalil", target: "row", row: 0, title: "ar-Rum itu surah ke-30", text: "Slide menulis “ar-Rum [40]: 21”. Surah ar-Rum adalah surah ke-<strong>30</strong>, jadi yang dimaksud QS. ar-Rum [30]: 21 (ayat tentang sakinah, mawaddah, rahmah)." },
        { label: "Kata kunci tiap bagian", target: "col", col: 0, title: "Cara cepat membedakan", text: "<strong>Kedudukan</strong> = tiang utama & sakinah. <strong>Fungsi</strong> = sosialisasi nilai, kaderisasi, keteladanan. <strong>Aktivitas</strong> = mendidik anak di era media, anti-kekerasan, peduli tetangga, shalat." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 3 • Kamus Istilah",
      title: "Istilah Penting",
      headers: ["Istilah", "Arti"],
      rows: [
        ["Sakinah • mawaddah • rahmah", "Tenteram • cinta kasih • kasih sayang (ar-Rum 21)"],
        ["Kaderisasi", "Menyiapkan generasi penerus yang melanjutkan dan menyempurnakan dakwah"],
        ["Uswah hasanah", "Teladan yang baik"],
        ["Ihsan • ishlah • makruf", "Berbuat baik sebaik-baiknya • mendamaikan/memperbaiki • kebaikan yang dikenal umum"],
        ["<em>Qaryah thayyibah</em>", "Kampung/komunitas yang baik dan diberkahi; hasil keluarga yang peduli tetangga"],
        ["Gerakan Jamaah & Dakwah Jamaah", "Program Muhammadiyah: dakwah berbasis komunitas/lingkungan tempat tinggal"],
        ["Sanksi yang mendidik", "Teguran atau konsekuensi yang bertujuan membina, bukan kekerasan (aktivitas 2 melarang kekerasan)"]
      ]
    },
    {
      type: "ayat",
      label: "Ayat Inti",
      title: "Dalil Keluarga",
      items: [
        ayat("30:21", { title: "Sakinah, mawaddah, rahmah (kedudukan 1)", tone: "emerald" }),
        ayat("3:104", { title: "Segolongan yang menyeru kebajikan (kedudukan 2)", tone: "sky" }),
        ayat("66:6", { title: "Peliharalah dirimu dan keluargamu (aktivitas 4)", tone: "amber" }),
        ayat("16:90", { title: "Adil dan ihsan (aktivitas 2)", tone: "violet" })
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan 1 • Bagian Mana?",
      title: "Kedudukan, Fungsi, atau Aktivitas Keluarga?",
      headers: ["Pernyataan", "Bagian"],
      rows: [
        { cells: ["Keluarga adalah tiang utama kehidupan umat dan bangsa"], fields: [{ options: BAG, answer: "kedudukan" }], ok: "✓ Kedudukan 1." },
        { cells: ["Menyiapkan anak menjadi pelangsung gerakan dakwah"], fields: [{ options: BAG, answer: "fungsi" }], ok: "✓ Fungsi kaderisasi." },
        { cells: ["Mendampingi anak memakai media sosial agar terhindar dari pengaruh negatif"], fields: [{ options: BAG, answer: "aktivitas" }], ok: "✓ Aktivitas 1." },
        { cells: ["Membiasakan musyawarah dan berbuat adil antaranggota keluarga"], fields: [{ options: BAG, answer: "fungsi" }], ok: "✓ Fungsi 2 (keteladanan)." },
        { cells: ["Menjenguk tetangga yang sakit dan ikut kerja bakti"], fields: [{ options: BAG, answer: "aktivitas" }], ok: "✓ Aktivitas 3 → qaryah thayyibah." },
        { cells: ["Keluarga sakinah terkait dengan Gerakan Jamaah dan Dakwah Jamaah"], fields: [{ options: BAG, answer: "kedudukan" }], ok: "✓ Kedudukan 2." },
        { cells: ["Menjadikan shalat berjamaah di rumah sebagai prioritas"], fields: [{ options: BAG, answer: "aktivitas" }], ok: "✓ Aktivitas 4." }
      ]
    },
    {
      type: "exercise",
      label: "Studi Kasus • Sesuai PHIWM?",
      title: "Nilai Sikap Keluarga Ini",
      headers: ["Situasi", "Penilaian"],
      rows: [
        { cells: ["Ayah memukul anak sampai memar karena nilai ujiannya jelek"], fields: [{ options: SIKAP, answer: "tidak" }], ok: "✓ PHIWM: jauhi kekerasan. Sanksi harus <strong>mendidik</strong>." },
        { cells: ["Orang tua menegur dan menahan uang jajan anak yang berkali-kali meninggalkan shalat, sambil menasihati"], fields: [{ options: SIKAP, answer: "sesuai" }], ok: "✓ Sanksi yang mendidik (aktivitas 4)." },
        { cells: ["Keluarga yang tidak mengenal tetangga sama sekali dan tak pernah ikut kegiatan RT"], fields: [{ options: SIKAP, answer: "tidak" }], ok: "✓ Kurang kepedulian sosial (aktivitas 3)." },
        { cells: ["Kakak bekerja dan ikut membiayai kuliah adiknya yang kurang mampu"], fields: [{ options: SIKAP, answer: "sesuai" }], ok: "✓ Menyantuni anggota keluarga yang tidak mampu (fungsi 2)." },
        { cells: ["Orang tua membiarkan anak bermain gim sampai larut tanpa pengawasan"], fields: [{ options: SIKAP, answer: "tidak" }], ok: "✓ Aktivitas 1 menuntut kesungguhan mendidik di tengah arus media." },
        { cells: ["Keputusan pindah rumah dimusyawarahkan bersama seluruh anggota keluarga"], fields: [{ options: SIKAP, answer: "sesuai" }], ok: "✓ Membiasakan musyawarah (fungsi 2)." }
      ]
    }
  ],
  flashcards: [
    { tag: "PHIWM", q: "PHIWM dirumuskan di mana dan kapan?", a: "Muktamar Muhammadiyah ke-44, Jakarta, 8–11 Juli 2000 M (6–9 Rabi’ul Akhir 1421 H)." },
    { tag: "PHIWM", q: "PHIWM mengatur hubungan apa?", a: "Bermu’amalah / hubungan horizontal / hablum minannas berdasarkan al-Qur’an dan as-Sunnah al-Maqbulah." },
    { tag: "Kedudukan", q: "Kedudukan keluarga menurut PHIWM?", a: "Tiang utama kehidupan umat dan bangsa; tempat sosialisasi nilai yang paling intensif dan menentukan." },
    { tag: "Kedudukan", q: "Keluarga yang wajib diwujudkan?", a: "Sakinah, mawaddah, dan rahmah (ar-Rum [30]: 21)." },
    { tag: "Kedudukan", q: "Keluarga sakinah terkait dengan gerakan apa?", a: "Gerakan Jamaah dan Dakwah Jamaah menuju masyarakat Islam yang sebenar-benarnya (Ali ‘Imran 104)." },
    { tag: "Fungsi", q: "Dua fungsi keluarga di slide?", a: "Sosialisasi nilai Islam + kaderisasi; dan keteladanan (uswah hasanah) dalam kehidupan islami." },
    { tag: "Fungsi", q: "Tujuan fungsi kaderisasi?", a: "Anak tumbuh menjadi generasi muslim pelangsung dan penyempurna gerakan dakwah." },
    { tag: "Aktivitas", q: "4 aktivitas keluarga di slide?", a: "Mendidik anak di tengah arus media • ihsan kepada anak & perempuan, jauhi kekerasan • peduli tetangga (qaryah thayyibah) • shalat prioritas utama." },
    { tag: "Istilah", q: "Apa itu qaryah thayyibah?", a: "Komunitas/kampung yang baik, tercipta dari hubungan ihsan, ishlah, makruf dengan tetangga." },
    { tag: "Aktivitas", q: "Sikap kepala keluarga bila shalat ditinggalkan?", a: "Jika perlu memberi sanksi yang bersifat mendidik (Maryam 59; at-Tahrim 6)." }
  ],
  quiz: [
    { q: "Menurut PHIWM, keluarga merupakan …", opts: ["Urusan pribadi yang terpisah dari masyarakat", "Tiang utama kehidupan umat dan bangsa", "Lembaga ekonomi semata", "Tanggung jawab negara"], ans: 1, exp: "Kedudukan keluarga poin 1.", optExp: ["Keliru.", "Benar.", "Keliru.", "Keliru."] },
    { q: "Keluarga yang wajib diwujudkan setiap anggota Muhammadiyah adalah keluarga …", opts: ["Sakinah, mawaddah, dan rahmah", "Kaya dan terpandang", "Kecil dan bahagia", "Modern dan mandiri"], ans: 0, exp: "Dalil: QS. ar-Rum [30]: 21.", optExp: ["Benar.", "Bukan.", "Bukan rumusan PHIWM.", "Bukan."] },
    { q: "Fungsi keluarga agar anak tumbuh menjadi pelangsung dan penyempurna gerakan dakwah disebut fungsi …", opts: ["Ekonomi", "Kaderisasi", "Rekreasi", "Proteksi"], ans: 1, exp: "Fungsi keluarga poin 1.", optExp: ["Bukan.", "Benar.", "Bukan.", "Bukan."] },
    { q: "Kepedulian sosial keluarga terhadap tetangga dalam PHIWM bertujuan menciptakan …", opts: ["Qaryah thayyibah", "Baldatun thayyibah saja", "Ukhuwah wathaniyah", "Daulah islamiyah"], ans: 0, exp: "Aktivitas keluarga poin 3.", optExp: ["Benar.", "Bukan istilah slide.", "Bukan.", "Bukan."] },
    { q: "Seorang ayah menghukum anaknya dengan kekerasan fisik hingga terluka. Menurut PHIWM, sikap ini …", opts: ["Dibenarkan sebagai sanksi", "Bertentangan dengan tuntunan menjauhkan diri dari kekerasan terhadap anggota keluarga", "Termasuk fungsi kaderisasi", "Sesuai at-Tahrim 6"], ans: 1, exp: "Aktivitas 2; sanksi harus mendidik.", optExp: ["Keliru.", "Benar.", "Bukan.", "Keliru tafsir."] },
    { q: "Menurut PHIWM, hal yang harus menjadi prioritas utama dalam kehidupan keluarga adalah …", opts: ["Pelaksanaan shalat", "Pendapatan keluarga", "Hiburan bersama", "Pendidikan formal saja"], ans: 0, exp: "Aktivitas 4 (Maryam 59; at-Tahrim 6).", optExp: ["Benar.", "Bukan.", "Bukan.", "Bukan."] },
    { q: "Berikut termasuk wujud keteladanan keluarga menurut PHIWM, KECUALI …", opts: ["Membiasakan musyawarah", "Menghormati hak hidup anak", "Menyantuni anggota keluarga yang tidak mampu", "Membedakan hak anak laki-laki dan perempuan secara tidak adil"], ans: 3, exp: "PHIWM menekankan adil dan persamaan hak-kewajiban.", optExp: ["Termasuk.", "Termasuk.", "Termasuk.", "Benar, bukan keteladanan."] },
    { q: "Di tengah arus media yang makin terbuka, keluarga dituntut …", opts: ["Melarang total semua media", "Bersungguh-sungguh mendidik anak dan menciptakan suasana harmonis agar terhindar dari pengaruh negatif", "Menyerahkan pendidikan anak kepada internet", "Membiarkan anak memilih sendiri"], ans: 1, exp: "Aktivitas 1 (Luqman 12–19).", optExp: ["Bukan isi slide.", "Benar.", "Keliru.", "Keliru."] },
    { q: "Dalil “Peliharalah dirimu dan keluargamu dari api neraka” terdapat dalam …", opts: ["QS. at-Tahrim [66]: 6", "QS. ar-Rum [30]: 21", "QS. Ali ‘Imran [3]: 104", "QS. an-Nisa’ [4]: 9"], ans: 0, exp: "Dipakai untuk aktivitas 4 (shalat).", optExp: ["Benar.", "Sakinah.", "Dakwah.", "Generasi yang lemah."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UAS AIK — PERTEMUAN 14*
📚 *Akhlak Bermasyarakat: Keluarga (Kajian PHIWM)*

1️⃣ PHIWM: Muktamar ke-44, Jakarta, 8–11 Juli 2000; pedoman hablum minannas.
2️⃣ Kedudukan: keluarga = tiang utama umat & bangsa, tempat sosialisasi nilai paling intensif → sakinah, mawaddah, rahmah (ar-Rum [30]: 21) • terkait Gerakan Jamaah & Dakwah Jamaah (Ali ‘Imran 104).
3️⃣ Fungsi: sosialisasi nilai + kaderisasi (an-Nisa’ 9) • keteladanan: ihsan, makruf, sayang, hormati hak anak, akhlak, musyawarah, adil, santuni yang tak mampu.
4️⃣ Aktivitas: didik anak di era media (Luqman 12–19) • ihsan kepada anak & perempuan, jauhi kekerasan & penelantaran (al-Ma’idah 8; an-Nahl 90) • peduli tetangga → qaryah thayyibah • shalat prioritas, sanksi mendidik (Maryam 59; at-Tahrim 6).`
};
