// AIK — Pertemuan 8: UTS. Halaman persiapan: peta materi P1–P7, strategi soal bercabang, bank soal latihan.
// Soal latihan dibuat sendiri dengan gaya soal LMS (studi kasus, "kecuali", beberapa opsi terdengar benar). Bukan soal ujian asli.
const P = ["P1 Hakikat manusia", "P2 Islam agama pilihan", "P3 Aqidah", "P5 Tauhidullah", "P6 Syahadat", "P7 Iman & ibadah"];
// [pertemuan, soal, opsi(4), jawaban, pembahasan, alasan tiap opsi]
const S = [
  // P1
  [1, "Muhammad Iqbal memandang keberadaan manusia di bumi sebagai buah dari kebebasan. Kebebasan itu menurutnya adalah …", ["Hak mutlak tanpa batas", "Amanah dari Tuhan", "Hasil evolusi", "Warisan budaya"], 1, "Iqbal: kebebasan = amanah, sehingga ada tanggung jawab.", ["Kebebasan tetap terikat amanah.", "Benar.", "Bukan pandangan Iqbal.", "Bukan."]],
  [1, "Seorang mahasiswa berkata, “Yang membuat manusia mulia adalah fisiknya yang sempurna.” Menurut al-Ghazali, pernyataan ini kurang tepat karena …", ["Manusia hanya terdiri dari rohani", "Hakikat manusia adalah jiwanya; unsur rohani yang membedakan manusia", "Fisik manusia lebih lemah dari hewan", "Al-Ghazali tidak membahas manusia"], 1, "Al-Ghazali mengakui jasmani & rohani, tetapi menekankan rohani.", ["Jasmani juga diakui.", "Benar.", "Bukan alasan al-Ghazali.", "Keliru."]],
  [1, "Malaikat bertanya, “Apakah Engkau hendak menjadikan orang yang merusak dan menumpahkan darah?” (al-Baqarah 30). Pelajaran yang PALING tepat dari jawaban Allah dan ayat sesudahnya adalah …", ["Malaikat tidak boleh bertanya", "Manusia diunggulkan dengan ilmu, sehingga mampu mengelola bumi bila memakai ilmunya dengan benar", "Manusia pasti merusak bumi", "Manusia lebih banyak beribadah daripada malaikat"], 1, "Ayat 31–33: Adam diajari nama-nama; keunggulan manusia ada pada ilmu.", ["Bukan inti pelajaran.", "Benar.", "Potensi, bukan kepastian.", "Malaikat selalu bertasbih."]],
  [1, "Hubungan akal dan al-Qur’an disebut dialektis. Contoh yang paling sesuai adalah …", ["Mengabaikan al-Qur’an saat meneliti sains", "Menolak semua hasil sains karena tidak tertulis di al-Qur’an", "Akal merancang solusi pengelolaan limbah, al-Qur’an memberi landasan moral agar tidak merusak bumi", "Menghafal al-Qur’an tanpa memahami"], 2, "Akal = pemecah masalah; al-Qur’an = wawasan moral.", ["Memutus hubungan.", "Subordinatif-reduktif.", "Benar.", "Belum dialektis."]],
  [1, "Rumus “Bayani + Burhani + Irfani = manusia sebagai wakil Allah” berarti seorang muslim ideal …", ["Cukup menguasai ilmu agama saja", "Cukup menguasai sains", "Memadukan pemahaman teks wahyu, ilmu pengetahuan, dan kedekatan hati kepada Allah", "Mengutamakan perasaan daripada ilmu"], 2, "Ketiganya dipadukan.", ["Hanya Bayani.", "Hanya Burhani.", "Benar.", "Hanya Irfani."]],
  [1, "Tujuan mempelajari hakikat manusia, KECUALI …", ["Menjadi pedoman berbuat sebagai wakil Allah di bumi", "Pedoman berlaku manusiawi kepada sesama", "Membuat hidup terarah dan bermakna", "Membuktikan manusia berasal dari spesies lain"], 3, "Tiga lainnya tujuan di slide.", ["Tujuan.", "Tujuan.", "Tujuan.", "Benar, bukan tujuan."]],
  // P2
  [2, "Muhammadiyah merumuskan Islam sebagai agama yang diturunkan dalam al-Qur’an dan as-Sunnah al-Maqbulah. Kata “al-Maqbulah” menunjukkan bahwa …", ["Semua riwayat yang beredar wajib diterima", "Sunnah yang dijadikan pegangan adalah yang dapat diterima sebagai hujah", "Sunnah tidak diperlukan", "Sunnah setara dengan tradisi lokal"], 1, "Maqbulah = dapat diterima (sahih/hasan).", ["Tidak semua riwayat sahih.", "Benar.", "Keliru.", "Keliru."]],
  [2, "Seorang teman berkata, “Islam itu sulit dan memberatkan.” Bantahan yang sesuai karakteristik Islam adalah …", ["Islam memang berat, maka dijalani seadanya", "Islam menggembirakan dan memudahkan; Allah tidak membebani di luar kemampuan (al-Baqarah 286)", "Islam hanya untuk orang Arab", "Ibadah boleh ditinggalkan bila sibuk"], 1, "Karakteristik keenam.", ["Keliru.", "Benar.", "Islam universal.", "Keliru; keringanan ada aturannya."]],
  [2, "Mahasiswa muslim berteman akrab dengan mahasiswa dari suku dan agama berbeda, bekerja sama dalam tugas kelompok, tetapi tetap teguh pada akidahnya. Sikap ini mencerminkan …", ["Pluralisme agama", "Sinkretisme", "Pluralitas dan toleransi", "Sekularisme"], 2, "Menerima keberagaman (al-Hujurat 13) tanpa menyamakan agama.", ["Pluralisme = semua agama benar.", "Mencampur ajaran.", "Benar.", "Memisahkan agama dari kehidupan."]],
  [2, "Pernyataan berikut sesuai dengan makna Islam sebagai asy-Syariah, yaitu …", ["Islam hanya urusan ibadah ritual", "Islam berisi tuntunan dan petunjuk untuk keselamatan dunia dan akhirat", "Islam tidak mengatur ekonomi", "Islam hanya untuk akhirat"], 1, "Definisi asy-Syariah di slide.", ["Terlalu sempit.", "Benar.", "Keliru.", "Keliru."]],
  [2, "Dalam memahami hadis tentang kebersihan, seorang dosen memadukan ilmu hadis dengan penelitian mikrobiologi. Pendekatan yang dipadukan adalah …", ["Bayani dan Burhani", "Irfani saja", "Bayani saja", "Burhani dan liberal"], 0, "Ilmu hadis = Bayani; mikrobiologi = Burhani.", ["Benar.", "Bukan.", "Kurang satu.", "Liberal bukan pendekatan slide."]],
  [2, "Ayat yang paling tepat untuk menolak klaim adanya nabi baru setelah Nabi Muhammad saw. adalah …", ["QS. al-Hujurat [49]: 13", "QS. al-Ahzab [33]: 40", "QS. al-An’am [6]: 108", "QS. al-Baqarah [2]: 286"], 1, "Khataman nabiyyin.", ["Keberagaman.", "Benar.", "Toleransi.", "Kemudahan."]],
  [2, "Seorang muslim rajin shalat tetapi curang dalam berdagang. Ditinjau dari sistematika ajaran Islam, ia …", ["Sudah sempurna karena shalatnya rajin", "Belum utuh karena ibadah, akhlak, dan mu’amalah tidak dapat dipisahkan", "Tidak berdosa karena dagang urusan dunia", "Cukup memperbanyak sedekah"], 1, "Sistematika ajaran saling terikat.", ["Keliru.", "Benar.", "Mu’amalah tetap diatur.", "Tidak menghapus kewajiban jujur."]],
  // P3
  [3, "Kata “aqidah” berasal dari kata yang bermakna ikatan dan simpul. Makna ini menunjukkan bahwa aqidah seharusnya …", ["Mudah dilepas sesuai situasi", "Kokoh dan mengikat hati tanpa keraguan", "Hanya dipelajari, tidak diyakini", "Boleh bercampur keraguan"], 1, "Ikatan yang kokoh.", ["Keliru.", "Benar.", "Keliru.", "Bertentangan dengan Hasan al-Banna."]],
  [3, "Rina percaya ada planet di luar tata surya meski belum pernah melihatnya, karena diberitakan lembaga antariksa yang kredibel. Sikap ini sejalan dengan kaidah aqidah …", ["Yang tak terindera tidak ada", "Keyakinan bisa diperoleh melalui berita dari pembawa berita yang jujur", "Akal menjangkau segala sesuatu", "Kepuasan materi terbatas"], 1, "Kaidah yang sama dipakai untuk meyakini malaikat lewat kabar Nabi.", ["Keliru.", "Benar.", "Keliru.", "Tidak terkait."]],
  [3, "Mengapa manusia tidak diperintahkan memikirkan Dzat Allah?", ["Karena Allah tidak ada", "Karena akal hanya menjangkau hal yang terikat ruang dan waktu", "Karena akal tidak berguna dalam agama", "Karena cukup percaya tanpa berpikir"], 1, "Kaidah aqidah ke-4.", ["Keliru.", "Benar.", "Keliru.", "Keliru; Islam memakai akal."]],
  [3, "Seseorang berkata, “Saya tidak beragama, tetapi saya sangat memuja uang dan popularitas.” Menurut dalil fitrah, kondisi ini menunjukkan …", ["Ia benar-benar tidak bertuhan", "Ia tetap mempertuhankan sesuatu, hanya saja yang tidak layak dituhankan", "Fitrah manusia tidak ada", "Uang boleh dituhankan"], 1, "Tidak ada manusia yang tidak bertuhan.", ["Keliru.", "Benar.", "Keliru.", "Keliru."]],
  [3, "Fitrah dan akal bisa mengakui dan membuktikan adanya Tuhan, tetapi manusia tetap memerlukan wahyu karena …", ["Akal selalu salah", "Fitrah dan akal tidak mampu menjelaskan siapa Tuhan yang sebenarnya dan bagaimana menyembah-Nya", "Wahyu menggantikan akal", "Fitrah bisa hilang total"], 1, "Dalil naqli.", ["Keliru.", "Benar.", "Wahyu membimbing, bukan menggantikan.", "Keliru."]],
  [3, "Kedudukan hati (qalb) dalam bertauhid menurut materi adalah …", ["Sumber hukum Islam", "Pengendali keinginan dan nafsu agar tidak terjerumus syirik dan dosa", "Pengganti wahyu", "Tempat menyimpan ilmu dunia"], 1, "Qalb disebut 144 kali dalam al-Qur’an.", ["Keliru.", "Benar.", "Keliru.", "Bukan."]],
  [3, "Pembahasan tentang hari kiamat, alam barzakh, surga, dan neraka termasuk ruang lingkup aqidah …", ["Ilahiyat", "Nubuwat", "Ruhaniyat", "Sam’iyyat"], 3, "Hanya diketahui lewat wahyu.", ["Tentang Allah.", "Nabi & kitab.", "Malaikat, jin, ruh.", "Benar."]],
  [3, "Definisi aqidah menurut Abu Bakar Jabir al-Jazairy menyebutkan tiga dasar penerimaan kebenaran, yaitu …", ["Akal, wahyu, dan fitrah", "Indera, tradisi, dan perasaan", "Ijma’, qiyas, dan istihsan", "Hati, lisan, dan perbuatan"], 0, "Bil-‘aql was-sam’ wal-fithrah.", ["Benar.", "Bukan.", "Itu sumber hukum fikih.", "Itu unsur iman."]],
  // P5
  [5, "Seorang petani berdoa kepada Allah agar panennya berhasil dan tidak lagi memberi sesajen ke sawah. Ia telah menerapkan tauhid …", ["Rububiyah saja", "Uluhiyah", "Asma’ wa Sifat saja", "Mulkiyah saja"], 1, "Ibadah dan permohonan pertolongan hanya kepada Allah.", ["Kurang tepat.", "Benar.", "Kurang tepat.", "Kurang tepat."]],
  [5, "Kaum musyrikin Makkah mengakui Allah pencipta langit dan bumi, tetapi tetap menyembah berhala. Berdasarkan dalil at-Talazum, mereka …", ["Sudah bertauhid sempurna", "Seharusnya melanjutkan keyakinan Rububiyah sampai Uluhiyah", "Sudah sampai Asma’ wa Sifat", "Tidak mengakui Rububiyah"], 1, "Talazum = kemestian berlanjut.", ["Keliru.", "Benar.", "Keliru.", "Mereka mengakui Rububiyah."]],
  [5, "“Saya beribadah hanya kepada Allah karena Dialah Raja saya, dan Dia Raja karena Dialah Pencipta dan Pemelihara saya.” Logika ini disebut dalil …", ["at-Talazum", "at-Tadhamun", "an-Nafyu", "al-Itsbat"], 1, "Tadhamun = cakupan (dari Uluhiyah ke bawah).", ["Arah sebaliknya.", "Benar.", "Rukun syahadat.", "Rukun syahadat."]],
  [5, "Mahasiswa yakin Allah Maha Melihat sehingga tetap jujur saat ujian online tanpa pengawas. Ini buah dari tauhid …", ["Rububiyah", "Mulkiyah", "Asma’ wa Sifat", "Tidak terkait tauhid"], 2, "Meyakini sifat al-Bashir.", ["Kurang tepat.", "Kurang tepat.", "Benar.", "Keliru."]],
  [5, "Pernyataan yang tepat tentang tauhid menurut materi, KECUALI …", ["Tauhid tema sentral aqidah dan iman", "Semua nabi mengemban ajaran tauhid", "Tauhid hanya cukup diyakini di hati tanpa memengaruhi perbuatan", "Tauhid landasan diterimanya amal"], 2, "Tauhid harus berdampak pada hidup (al-Kahfi 105).", ["Benar.", "Benar.", "Jawaban: keliru.", "Benar."]],
  [5, "Dalam QS. an-Nas 1–3, urutan Rabb–Malik–Ilah mewakili tauhid …", ["Uluhiyah–Rububiyah–Mulkiyah", "Rububiyah–Mulkiyah–Uluhiyah", "Mulkiyah–Uluhiyah–Rububiyah", "Asma’–Rububiyah–Uluhiyah"], 1, "Rabbin nas, Malikin nas, Ilahin nas.", ["Urutan salah.", "Benar.", "Urutan salah.", "Keliru."]],
  // P6
  [6, "Seseorang membuang semua jimatnya lalu hanya bergantung kepada Allah. Langkah membuang jimat sesuai dengan rukun syahadat …", ["al-Itsbat", "an-Nafyu", "at-Tafrith", "al-Ifrath"], 1, "Meniadakan sesembahan selain Allah.", ["Itu menetapkan Allah.", "Benar.", "Istilah syahadat kedua.", "Istilah syahadat kedua."]],
  [6, "Sekelompok orang memuji Nabi Muhammad saw. sampai meminta rezeki dan keselamatan langsung kepada beliau. Sikap ini …", ["Benar, wujud cinta Nabi", "Termasuk ifrath (berlebihan) yang ditolak oleh lafaz ‘abduhu", "Termasuk tafrith", "Sesuai syahadat kedua"], 1, "Nabi manusia tanpa sifat ketuhanan.", ["Keliru.", "Benar.", "Tafrith = meremehkan.", "Keliru."]],
  [6, "Seseorang berkata, “Saya cukup pakai al-Qur’an, hadis tidak perlu karena Nabi juga manusia biasa.” Sikap ini …", ["Benar karena al-Qur’an sudah lengkap", "Termasuk tafrith (meremehkan) yang ditolak oleh lafaz rasuluhu", "Termasuk ifrath", "Sesuai Muhammadiyah"], 1, "Muhammadiyah justru berpegang pada al-Qur’an dan as-Sunnah al-Maqbulah.", ["Keliru.", "Benar.", "Ifrath = berlebihan.", "Keliru."]],
  [6, "Konsekuensi syahadat kedua dalam kehidupan mahasiswa yang paling tepat adalah …", ["Hanya membaca shalawat", "Menjadikan Rasulullah teladan dalam ibadah dan dalam bergaul, berdagang, serta memimpin", "Mengkultuskan Nabi", "Menghafal nama keluarga Nabi"], 1, "Uswah hasanah dalam hablun minallah dan hablun minannas.", ["Baik tapi sempit.", "Benar.", "Ifrath.", "Bukan inti."]],
  [6, "Ali rajin bersedekah di depan umum agar terpilih menjadi ketua BEM. Menurut materi, perbuatan ini dapat merusak syahadat karena …", ["Sedekah dilarang", "Beramal dengan tujuan selain Allah", "Tidak menegakkan hukum Allah", "Membenci Islam"], 1, "Pembatal syahadat no. 3.", ["Keliru.", "Benar.", "Kurang tepat.", "Kurang tepat."]],
  [6, "Berikut yang BUKAN termasuk hal yang membatalkan dua kalimat syahadat menurut slide adalah …", ["Menghalalkan yang haram", "Menjadikan dunia segala-galanya", "Lupa membaca doa sebelum makan", "Memperolok hukum dalam al-Qur’an"], 2, "Lupa adalah kelalaian kecil, bukan pembatal syahadat.", ["Pembatal.", "Pembatal.", "Benar.", "Pembatal."]],
  // P7
  [7, "Menurut Muhammad Abduh, orang beriman adalah orang yang kepercayaannya …", ["Hanya diucapkan", "Dapat menguasai kehendak atau keinginannya", "Disembunyikan", "Bergantung suasana"], 1, "Iman menguasai keinginan; iman pasti diuji (al-‘Ankabut 1–4).", ["Kurang.", "Benar.", "Bukan.", "Bukan."]],
  [7, "Dua syarat diterimanya ibadah adalah …", ["Ikhlas dan sesuai tuntunan Rasul", "Ramai dan meriah", "Mahal dan rutin", "Dilihat orang dan sesuai adat"], 0, "Ikhlas ← la ilaha illallah; sesuai tuntunan ← Muhammad Rasulullah.", ["Benar.", "Keliru.", "Keliru.", "Keliru."]],
  [7, "Menambah jumlah rakaat shalat Subuh menjadi tiga karena ingin lebih banyak pahala termasuk …", ["Ibadah ghairu mahdhah yang boleh dikreasikan", "Bid’ah karena shalat termasuk ibadah mahdhah", "Mu’amalah", "Ijtihad yang dianjurkan"], 1, "Ibadah mahdhah: tambah/kurang = bid’ah.", ["Shalat itu mahdhah.", "Benar.", "Bukan.", "Bukan."]],
  [7, "Mahasiswa membuat aplikasi pengingat jadwal belajar Al-Qur’an dengan fitur baru yang tidak ada di zaman Nabi. Hal ini …", ["Bid’ah karena tidak ada di zaman Nabi", "Termasuk wilayah ghairu mahdhah/mu’amalah yang boleh dikembangkan", "Haram", "Mengurangi pahala"], 1, "Sarana dan teknologi bukan ibadah mahdhah.", ["Keliru.", "Benar.", "Keliru.", "Keliru."]],
  [7, "Perjalanan hidup manusia secara berurutan adalah …", ["Alam dunia → alam ruh → akhirat → barzakh", "Alam ruh → alam dunia → alam barzakh → alam akhirat", "Alam barzakh → dunia → ruh → akhirat", "Dunia → akhirat → barzakh → ruh"], 1, "Ruh → dunia → barzakh → akhirat → surga/neraka.", ["Urutan salah.", "Benar.", "Urutan salah.", "Urutan salah."]],
  [7, "Prinsip ibadah “tanpa perantara” didasarkan pada QS. al-Baqarah 186. Contoh penerapannya adalah …", ["Berdoa langsung kepada Allah tanpa melalui dukun atau benda keramat", "Berdoa hanya melalui kuburan orang saleh", "Meminta orang lain berdoa menggantikan shalat kita", "Tidak perlu berdoa"], 0, "Allah dekat dan mengabulkan doa.", ["Benar.", "Keliru.", "Keliru.", "Keliru."]]
];

module.exports = {
  id: "p8",
  nomor: 8,
  judul: "UTS AIK: Peta Materi & Bank Soal Bercabang",
  ujian: "UTS",
  hero: {
    badge: "Pertemuan 8 • UTS AIK",
    title: "Siap UTS AIK: Soalnya Bercabang, Kuncinya Ada di Kata Kunci",
    text: "Soal AIK sering <strong>bercabang</strong>: dua atau tiga opsi terdengar baik. Halaman ini berisi <strong>peta materi P1–P7</strong>, <strong>strategi memilih jawaban paling tepat</strong>, dan <strong>bank soal latihan " + S.length + " soal</strong> bergaya studi kasus dengan alasan untuk tiap opsi. Soal latihan ini buatan sendiri, bukan soal UTS asli."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Peta Materi • P1–P7",
      title: "Inti Tiap Pertemuan",
      headers: ["Pertemuan", "Inti yang sering ditanyakan"],
      rows: [
        ["P1 Hakikat manusia", "Iqbal (mulia, wakil Tuhan, kebebasan = amanah) • Gibran (cinta) • al-Ghazali (hakikat = jiwa) • al-Baqarah 30–33 • akal: berpikir + berzikir, hubungan dialektis • Bayani + Burhani + Irfani • tugas: memakmurkan, mendamaikan, mensejahterakan"],
        ["P2 Islam agama pilihan", "Makna Islam (selamat, damai, berserah) • ad-Din & asy-Syariah • Qur’an vs Sunnah (lafaz–makna) • 4 sistematika • 6 karakteristik + dalilnya • toleransi ≠ pluralisme"],
        ["P3 Aqidah", "Ikatan kokoh • Hasan al-Banna vs al-Jazairy • fitrah-akal-wahyu • 5 istilah & 4 lingkup • akal sarana, hati pengendali • 8 kaidah • dalil fitrah, aqli, naqli"],
        ["P4 Kuis", "20 soal studi kasus dari P1–P3 (lihat halaman P4)"],
        ["P5 Tauhidullah", "Rububiyah, Mulkiyah, Uluhiyah, Asma’ wa Sifat • at-Talazum (kemestian) & at-Tadhamun (cakupan) • al-Kahfi 105"],
        ["P6 Syahadat", "Nafyu (la ilaha) & itsbat (illallah) • ‘abduhu (tolak ifrath) & rasuluhu (tolak tafrith) • uswah hasanah • 11 pembatal"],
        ["P7 Iman & ibadah", "Rukun iman • Abduh: iman menguasai kehendak • perjalanan hidup • syarat ibadah: ikhlas + sesuai tuntunan • mahdhah vs ghairu mahdhah (bid’ah) • 6 prinsip ibadah • khalifah & ma’rifatullah"]
      ]
    },
    {
      type: "cards",
      label: "Strategi • Soal Bercabang",
      title: "5 Langkah Menjawab Soal AIK",
      cols: 3,
      items: [
        { badge: "1", tone: "indigo", title: "Garis bawahi kata kunci soal", text: "Contoh: “sifat al-Khaliq” → pencipta & pemelihara <strong>alam</strong>; “krisis spiritual” → dekat dengan Allah." },
        { badge: "2", tone: "rose", title: "Cek kata “KECUALI”", text: "Balik logikanya: cari satu opsi yang <strong>salah</strong>. Banyak yang terjebak karena terburu-buru." },
        { badge: "3", tone: "amber", title: "Coret yang ekstrem", text: "Coret opsi yang terlalu bebas (liberal, pluralisme, hedonis) <strong>dan</strong> yang terlalu keras (anarkis, menolak semua, mengkafirkan)." },
        { badge: "4", tone: "emerald", title: "Pilih yang paling lengkap", text: "Jika tersisa beberapa opsi baik, pilih yang <strong>mencakup</strong> opsi lain (akhlak + ilmu + sosial)." },
        { badge: "5", tone: "sky", title: "Cocokkan dengan istilah materi", text: "Jawaban dosen biasanya memakai bahasa slide: “Burhani yang tidak bertentangan dengan wahyu”, “memakmurkan, mendamaikan, mensejahterakan”." },
        { badge: "✓", tone: "slate", title: "Sebelum ujian", text: "Berdoa, baca soal sampai habis, dan jangan mengubah jawaban tanpa alasan kuat." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Permainan • Ini Materi Pertemuan Berapa?",
      title: "Cocokkan Konsep dengan Pertemuannya",
      headers: ["Konsep", "Pertemuan"],
      rows: [
        { cells: ["Bayani + Burhani + Irfani = wakil Allah di bumi"], fields: [{ options: P, answer: P[0] }], ok: "✓ (Bayani-Burhani-Irfani juga dibahas di P2.)" },
        { cells: ["Al-Qur’an: lafaz & makna dari Allah"], fields: [{ options: P, answer: P[1] }], ok: "✓" },
        { cells: ["Kaidah: keyakinan lewat berita orang jujur"], fields: [{ options: P, answer: P[2] }], ok: "✓" },
        { cells: ["Dalil at-Talazum dan at-Tadhamun"], fields: [{ options: P, answer: P[3] }], ok: "✓" },
        { cells: ["an-Nafyu dan al-Itsbat"], fields: [{ options: P, answer: P[4] }], ok: "✓" },
        { cells: ["Ibadah mahdhah dan ghairu mahdhah"], fields: [{ options: P, answer: P[5] }], ok: "✓" },
        { cells: ["Pandangan Kahlil Gibran tentang cinta"], fields: [{ options: P, answer: P[0] }], ok: "✓" },
        { cells: ["Karakteristik Islam: toleransi, moderat, plural"], fields: [{ options: P, answer: P[1] }], ok: "✓" },
        { cells: ["11 hal yang membatalkan syahadat"], fields: [{ options: P, answer: P[4] }], ok: "✓" },
        { cells: ["Dalil fitrah, aqli, naqli tentang wujud Allah"], fields: [{ options: P, answer: P[2] }], ok: "✓" }
      ]
    }
  ],
  flashcards: [
    { tag: "Strategi", q: "Opsi seperti apa yang hampir selalu salah di soal AIK?", a: "Yang ekstrem: pluralisme/liberal/hedonis, atau anarkis/menolak semua/mudah mengkafirkan." },
    { tag: "Strategi", q: "Kalau dua opsi sama-sama baik?", a: "Pilih yang paling cocok dengan kata kunci soal dan paling lengkap." },
    { tag: "P1", q: "Tugas khalifah?", a: "Memakmurkan, mendamaikan, mensejahterakan bumi." },
    { tag: "P2", q: "6 karakteristik Islam?", a: "Toleransi, moderat, integratif-komprehensif, rasional, plural, menggembirakan-memudahkan." },
    { tag: "P3", q: "3 dalil wujud Allah?", a: "Fitrah, aqli, naqli." },
    { tag: "P5", q: "4 tauhid versi AIK?", a: "Rububiyah, Mulkiyah, Uluhiyah, Asma’ wa Sifat." },
    { tag: "P6", q: "‘Abduhu dan rasuluhu menolak sikap apa?", a: "‘Abduhu menolak ifrath (berlebihan); rasuluhu menolak tafrith (meremehkan)." },
    { tag: "P7", q: "Dua syarat diterimanya ibadah?", a: "Ikhlas dan sesuai tuntunan Rasul." }
  ],
  quiz: S.map(([p, q, opts, ans, exp, optExp]) => ({ q, opts, ans, exp: "<strong>P" + p + "</strong> • " + exp, optExp })),
  ringkasan: `*RANGKUMAN KILAT UTS AIK — PERTEMUAN 1–7*
📝 *Strategi soal bercabang:* garis bawahi kata kunci • cek "KECUALI" • coret yang ekstrem (liberal/pluralis/hedonis maupun anarkis/menolak semua) • pilih yang paling lengkap • cocokkan dengan bahasa slide.

P1 • Iqbal, Gibran, al-Ghazali • al-Baqarah 30–33 • akal: berpikir + berzikir, dialektis • Bayani + Burhani + Irfani • memakmurkan, mendamaikan, mensejahterakan.
P2 • Islam = selamat/damai/berserah • ad-Din & asy-Syariah • Qur’an vs Sunnah • akidah-akhlak-ibadah-mu’amalah • 6 karakteristik • toleransi ≠ pluralisme • al-Ahzab 40.
P3 • aqidah = ikatan kokoh • al-Banna & al-Jazairy • fitrah-akal-wahyu • 5 istilah, 4 lingkup • 8 kaidah • dalil fitrah/aqli/naqli.
P5 • Rububiyah-Mulkiyah-Uluhiyah-Asma’ wa Sifat • Talazum & Tadhamun • al-Kahfi 105.
P6 • nafyu-itsbat • ‘abduhu (tolak ifrath) & rasuluhu (tolak tafrith) • uswah hasanah • 11 pembatal.
P7 • iman menguasai kehendak • ruh→dunia→barzakh→akhirat • ikhlas + sesuai tuntunan • mahdhah vs ghairu mahdhah • 6 prinsip ibadah.`
};
