// Materi Lengkap Bahasa Indonesia P4: Pembentukan Kata, Kata Baku, dan Diksi (pendalaman)
// Tidak ada modul P4 di LMS. Disusun dari KBBI VI Daring, EYD Edisi V (2022), Alwi dkk. (Tata Bahasa Baku
// Bahasa Indonesia), Keraf (Diksi dan Gaya Bahasa), Chaer (Morfologi Bahasa Indonesia), Kridalaksana (Pembentukan Kata).
const { box, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });

const PROSES = [["serap", "Penyerapan|(P3)", "slate"], ["afiks", "Afiksasi|(P3)", "slate"], ["ulang", "Reduplikasi", "sky"], ["majemuk", "Pemajemukan", "emerald"], ["pendek", "Pemendekan", "amber"]];
const peta = diagram({
  label: "Diagram Interaktif", title: "Lima Jalan Membentuk Kata", desc: "Dua jalan pertama sudah dibahas di P3. Klik setiap kotak.", minw: 620,
  svg: svg(800, 200,
    box(300, 10, 200, 46, "Kata dasar", "violet", "dasar", { size: 15 }) +
    PROSES.map(([id, t, tone], i) => { const x = 15 + i * 157; return path(`M400,56 L400,76 L${x + 70},76 L${x + 70},100`) + box(x, 104, 140, 60, t, tone, id, { size: 13 }); }).join("") +
    text(400, 188, "hasil: kata turunan, kata ulang, gabungan kata, singkatan & akronim", { size: 12, color: "#475569", weight: 600 })
  ),
  parts: [
    { id: "dasar", label: "Kata dasar", title: "Bahan baku", text: "Bentuk yang belum mendapat imbuhan, belum diulang, dan belum digabung: <em>kerja, rumah, merah</em>." },
    { id: "serap", label: "Penyerapan", title: "Dari bahasa lain (P3)", text: "Adopsi, adaptasi, penerjemahan, kreasi." },
    { id: "afiks", label: "Afiksasi", title: "Diberi imbuhan (P3)", text: "Prefiks, infiks, sufiks, konfiks, dan aturan peluluhan meN-/peN-." },
    { id: "ulang", label: "Reduplikasi", title: "Diulang", text: "rumah-rumah, lelaki, bolak-balik, tembak-menembak. Bagian 1 di bawah." },
    { id: "majemuk", label: "Pemajemukan", title: "Digabung", text: "rumah sakit, kambing hitam, tanggung jawab. Bagian 2 di bawah." },
    { id: "pendek", label: "Pemendekan", title: "Dipendekkan", text: "KTP, SIM, lab, takkan, kg. Bagian 3 di bawah." }
  ]
});

module.exports = {
  p4: [
    tip("📌 Bukan dari modul LMS", "Pertemuan 4 di silabus membahas <strong>pembentukan kata, kata baku, dan diksi</strong>, tetapi LMS tidak menyediakan modulnya. Seluruh isi halaman ini disusun sendiri dari <strong>KBBI VI Daring</strong>, <strong>EYD Edisi V</strong> (Badan Bahasa, 2022), dan buku rujukan tata bahasa (daftarnya di bagian Referensi paling bawah). Karena topik dasarnya sudah ada di P3, halaman ini fokus pada bagian yang belum dibahas di sana. Jika dosen nanti memberi modul, modul itulah yang dipakai.", "warn"),
    peta,
    A("Reduplikasi: Kata Ulang", `<p><strong>Reduplikasi</strong> adalah proses membentuk kata dengan mengulang bentuk dasar, seluruhnya atau sebagian. Hasilnya disebut <strong>kata ulang</strong>. Bentuknya ada empat (Chaer, <em>Morfologi Bahasa Indonesia</em>):</p>
<ul><li><strong>Dwilingga</strong> (pengulangan utuh): rumah-rumah, buku-buku, pagi-pagi.</li><li><strong>Dwipurwa</strong> (pengulangan suku awal): laki → lelaki, tamu → tetamu, luhur → leluhur. Vokal suku yang diulang biasanya menjadi <em>e</em>.</li><li><strong>Dwilingga salin suara</strong> (diulang dengan perubahan bunyi): bolak-balik, warna-warni, gerak-gerik, sayur-mayur, lauk-pauk.</li><li><strong>Berimbuhan</strong>: berlari-lari, tembak-menembak, kemerah-merahan, rumah-rumahan, sebaik-baiknya.</li></ul>
<p>Hati-hati dengan <strong>kata ulang semu</strong>: <em>kupu-kupu, laba-laba, ubur-ubur, paru-paru, kura-kura</em>. Bentuknya seperti kata ulang, tetapi tidak berasal dari bentuk dasar yang diulang, karena <em>kupu</em> atau <em>laba</em> tidak bermakna hewan itu.</p>`, "Bagian 1"),
    { type: "table", label: "Tabel Interaktif", title: "Makna yang Dibawa Kata Ulang", headers: ["Makna", "Contoh"],
      rows: [["banyak / jamak", "buku-buku, rumah-rumah"], ["bermacam-macam", "sayur-mayur, buah-buahan"], ["menyerupai", "rumah-rumahan, kuda-kudaan"], ["saling / berbalasan", "tembak-menembak, pukul-memukul"], ["agak (melemahkan)", "kemerah-merahan, kehijau-hijauan"], ["dilakukan berulang atau santai", "berjalan-jalan, membaca-baca"], ["paling (superlatif)", "setinggi-tingginya, sebaik-baiknya"]],
      modes: [{ label: "Jebakan jamak", target: "row", row: 0, title: "Jangan dobel penanda jamak", text: "Jika sudah ada kata <em>para, banyak, berbagai, semua</em>, kata ulangnya tidak perlu: <strong>para mahasiswa</strong>, bukan <em>para mahasiswa-mahasiswa</em>. Ini pleonasme yang dibahas di P3." }] },
    tip("Aturan tulis (EYD V)", "Kata ulang ditulis dengan <strong>tanda hubung</strong>: anak-anak, mondar-mandir. Angka 2 (<em>anak2</em>) tidak dipakai dalam tulisan resmi. Bentuk ulang <strong>gabungan kata</strong> cukup mengulang unsur pertama: <strong>surat-surat kabar, rak-rak buku, kapal-kapal barang</strong>."),
    A("Pemajemukan: Gabungan Kata", `<p><strong>Pemajemukan</strong> (komposisi) menggabungkan dua kata atau lebih sehingga membentuk satu makna baru, misalnya <em>rumah sakit</em> (bukan rumah yang sedang sakit). Ciri utamanya: unsurnya tidak bisa disisipi kata lain tanpa mengubah makna.</p>
<p>Dari segi makna, ada gabungan kata yang maknanya masih bisa ditebak dari unsurnya (<em>kamar mandi, meja tulis</em>) dan ada yang <strong>idiomatis</strong>, maknanya tidak bisa ditebak (<em>kambing hitam</em> = orang yang dipersalahkan, <em>meja hijau</em> = pengadilan, <em>buah tangan</em> = oleh-oleh).</p>
<p>Yang paling sering diujikan adalah <strong>cara menulisnya</strong>. Aturan EYD V:</p>
<ol><li>Pada umumnya ditulis <strong>terpisah</strong>: duta besar, kambing hitam, rumah sakit, orang tua, kerja sama, tanggung jawab, ibu kota, wali kota, terima kasih, sepak bola.</li><li>Jika bisa menimbulkan salah paham, beri <strong>tanda hubung</strong>: <em>anak-istri pejabat, ibu-bapak kami</em>.</li><li>Jika hanya mendapat <strong>awalan saja atau akhiran saja</strong>, tetap terpisah: <em>bertanggung jawab, bekerja sama, garis bawahi, sebar luaskan</em>.</li><li>Jika mendapat <strong>awalan dan akhiran sekaligus</strong>, ditulis <strong>serangkai</strong>: <em>pertanggungjawaban, menggarisbawahi, menyebarluaskan, menandatangani, dilipatgandakan</em>.</li><li>Gabungan kata yang <strong>sudah padu</strong> ditulis serangkai: <em>olahraga, kacamata, matahari, saputangan, segitiga, kilometer, beasiswa, belasungkawa, dukacita, sukacita, sukarela, peribahasa, barangkali, bagaimana, padahal, apalagi</em>.</li></ol>`, "Bagian 2"),
    ex("Latihan Interaktif", "Pisah atau Serangkai?", ["Bentuk", "Tulisan yang benar"], [], [
      ["ber- + tanggung jawab", "bertanggung jawab", "✓ Hanya awalan.", ["bertanggungjawab", "bertanggung jawab"]],
      ["per- + tanggung jawab + -an", "pertanggungjawaban", "✓ Awalan + akhiran.", ["pertanggung jawaban", "pertanggungjawaban"]],
      ["meN- + tanda tangan + -i", "menandatangani", "✓ Awalan + akhiran.", ["menanda tangani", "menandatangani"]],
      ["olah + raga", "olahraga", "✓ Sudah padu.", ["olah raga", "olahraga"]],
      ["ibu + kota", "ibu kota", "✓ Terpisah.", ["ibukota", "ibu kota"]],
      ["meN- + beri tahu + -kan", "memberitahukan", "✓ Awalan + akhiran.", ["memberi tahukan", "memberitahukan"]],
      ["meN- + beri tahu", "memberi tahu", "✓ Hanya awalan.", ["memberitahu", "memberi tahu"]]
    ]),
    A("Pemendekan (Abreviasi)", `<p>Kata juga bisa terbentuk dengan <strong>memendekkan</strong> kata atau gabungan kata. Kridalaksana membaginya menjadi lima:</p>
<ul><li><strong>Singkatan</strong>, dibaca per huruf: KTP, DPR, SMA, dll., a.n.</li><li><strong>Akronim</strong>, dibaca seperti kata: SIM, pemilu (pemilihan umum), rudal (peluru kendali), tilang (bukti pelanggaran), humas (hubungan masyarakat).</li><li><strong>Penggalan</strong>, mengambil sebagian kata: lab (laboratorium), prof (profesor).</li><li><strong>Kontraksi</strong>, meringkas dan merapatkan: takkan (tidak akan), tak (tidak).</li><li><strong>Lambang huruf</strong>: cm, kg, km, Rp.</li></ul>
<p>Aturan penulisan singkatan dan akronim (kapan kapital, kapan pakai titik) sudah ada di P2. Satu hal yang sering terbalik: <strong>KTP</strong> dibaca ka-te-pe, jadi termasuk <strong>singkatan</strong>, bukan akronim.</p>`, "Bagian 3"),
    A("Ragam Baku dan Kata Baku", `<p>P3 sudah membahas pengertian kata baku dan daftar kata yang sering salah. Bagian ini melengkapinya dengan <strong>ragam baku</strong>, yaitu ragam bahasa yang dijadikan tolok ukur pemakaian yang benar.</p>
<p><strong>Kapan ragam baku dipakai?</strong> Menurut <em>Tata Bahasa Baku Bahasa Indonesia</em> (Alwi dkk.): dalam <strong>komunikasi resmi</strong> (surat dinas, peraturan, pengumuman resmi), <strong>wacana teknis dan ilmiah</strong> (laporan, skripsi, makalah), <strong>pembicaraan di depan umum</strong> (ceramah, seminar, presentasi), dan <strong>pembicaraan dengan orang yang dihormati</strong>.</p>
<p><strong>Fungsi bahasa baku</strong>: pemersatu, pemberi kekhasan, pembawa kewibawaan, dan kerangka acuan.</p>
<p><strong>Ciri ragam baku</strong>: kemantapan dinamis (kaidahnya tetap tetapi bisa berkembang), kecendekiaan (mampu mengungkapkan penalaran yang runtut), dan keseragaman kaidah.</p>
<p><strong>Sumber kata tidak baku</strong> yang sering masuk ke tulisan resmi:</p>
<ul><li>Pengaruh bahasa lisan dan daerah: <em>nggak, gimana, udah, aja, kalo</em> → tidak, bagaimana, sudah, saja, kalau.</li><li>Imbuhan tidak baku: <em>ngopi, nulisin, dikasih, bikin</em> → minum kopi, menuliskan, diberi, membuat.</li><li>Salah tulis bentuk serapan: <em>frekwensi, kongkrit, standarisasi</em> → frekuensi, konkret, standardisasi.</li><li>Huruf yang ditambah atau dikurangi: <em>himbau, handal, sekertaris</em> → imbau, andal, sekretaris.</li></ul>`, "Bagian 4"),
    tip("Cara cepat memeriksa", "Cari katanya di <strong>KBBI Daring</strong>. Jika muncul tulisan “bentuk tidak baku dari …”, pakai kata yang ditunjuk. Label <em>cak</em> (cakapan) berarti kata itu wajar dalam obrolan, tetapi sebaiknya dihindari di tulisan resmi."),
    ex("Latihan Interaktif", "Ganti dengan Bentuk Baku", ["Tidak baku", "Baku"], [], [
      ["handal", "andal", "", ["andal", "handalan"]], ["himbauan", "imbauan", "", ["imbauan", "himbau"]], ["frekwensi", "frekuensi", "", ["frekwensi", "frekuensi"]],
      ["kongkrit", "konkret", "", ["konkrit", "konkret"]], ["propinsi", "provinsi", "", ["provinsi", "profinsi"]], ["menyolok", "mencolok", "", ["mencolok", "menyolok"]],
      ["dikasih", "diberi", "✓ dikasih termasuk ragam cakapan.", ["diberi", "dikasihkan"]]
    ]),
    A("Diksi Lanjutan: Relasi Makna", `<p>Di P3 ada empat syarat diksi: tepat, lazim, hemat, baku. Untuk bisa memilih kata yang <strong>tepat</strong>, kita perlu memahami hubungan makna antarkata (Keraf, <em>Diksi dan Gaya Bahasa</em>):</p>
<ul><li><strong>Sinonim</strong>: makna mirip. Hampir tidak ada sinonim yang benar-benar sama, karena nilai rasa dan pemakaiannya berbeda. Contoh untuk ‘meninggal’: <em>meninggal dunia</em> (umum, sopan), <em>wafat</em> (untuk tokoh atau orang mulia), <em>gugur</em> (prajurit dalam tugas), <em>tewas</em> (karena kecelakaan, bencana, atau kekerasan), <em>mangkat</em> (raja), <em>mati</em> (umum, juga untuk hewan dan tumbuhan).</li><li><strong>Antonim</strong>: makna berlawanan (naik–turun, membeli–menjual).</li><li><strong>Homonim</strong>: tulisan dan bunyi sama, makna berbeda (<em>bisa</em> = dapat; <em>bisa</em> = racun).</li><li><strong>Homofon</strong>: bunyi sama, tulisan dan makna berbeda (<em>bank–bang</em>, <em>sanksi–sangsi</em>).</li><li><strong>Homograf</strong>: tulisan sama, bunyi dan makna berbeda (<em>apel</em> buah dengan e pepet, <em>apel</em> upacara dengan e taling; <em>teras</em> rumah dan <em>teras</em> kayu).</li><li><strong>Hiponim dan hipernim</strong>: hubungan khusus–umum. <em>Mawar, melati</em> adalah hiponim dari <em>bunga</em>. Ini dasar dari kata umum dan kata khusus di P3.</li><li><strong>Polisemi</strong>: satu kata dengan beberapa makna yang masih berhubungan (<em>kepala</em> badan, <em>kepala</em> sekolah, <em>kepala</em> surat).</li></ul>`, "Bagian 5"),
    A("Kata Ilmiah, Kata Populer, dan Eufemisme", `<p><strong>Kata ilmiah</strong> dipakai kalangan terdidik di bidangnya, terutama dalam tulisan ilmiah: <em>prediksi, asumsi, evaluasi, implementasi, konsensus</em>. <strong>Kata populer</strong> dipakai masyarakat luas: <em>ramalan, anggapan, penilaian, penerapan, kesepakatan</em>. Laporan praktikum boleh memakai kata ilmiah, tetapi pengumuman untuk warga sebaiknya memakai kata populer.</p>
<p><strong>Eufemisme</strong> adalah penghalusan, yaitu mengganti kata yang terasa kasar dengan yang lebih halus: <em>tunanetra</em> (buta), <em>diberhentikan</em> (dipecat), <em>lembaga pemasyarakatan</em> (penjara). Kebalikannya, <strong>disfemisme</strong>, sengaja memakai kata yang lebih kasar untuk efek tertentu, misalnya <em>mendepak</em> untuk mengeluarkan. Eufemisme membuat tulisan santun, tetapi jangan sampai mengaburkan fakta.</p>`, "Bagian 6"),
    A("Kata Berpasangan dan Kata yang Sering Salah Makna", `<p>Beberapa kata selalu berpasangan dengan kata tertentu (<strong>ungkapan idiomatis</strong>). Menggantinya membuat kalimat tidak baku:</p>
<ul><li><strong>bukan … melainkan …</strong> (bukan <em>bukan … tetapi</em>)</li><li><strong>baik … maupun …</strong> (bukan <em>baik … ataupun</em>)</li><li><strong>antara … dan …</strong> (bukan <em>antara … dengan</em>)</li><li><strong>sesuai dengan</strong>, <strong>bergantung pada</strong>, <strong>terdiri atas/dari</strong></li></ul>
<p>Kata yang sering dipakai dengan makna keliru:</p>
<ul><li><strong>bergeming</strong> = diam, tidak bergerak. Jadi “Ia tidak bergeming” justru berarti ia bergerak.</li><li><strong>mengentaskan</strong> = mengangkat dari keadaan buruk (mengentaskan kemiskinan), bukan ‘menuntaskan’.</li><li><strong>pukul</strong> untuk saat (pukul 08.00), <strong>jam</strong> untuk lamanya (dua jam).</li><li><strong>masing-masing</strong> tidak diikuti kata benda: <em>setiap mahasiswa</em> atau <em>mahasiswa itu masing-masing</em>.</li><li><strong>mantan</strong> untuk orang yang pernah memegang jabatan, <strong>bekas</strong> untuk barang atau tempat.</li></ul>`, "Bagian 7"),
    rv("Cek Pemahaman", "Kenapa Kata Ini Kurang Tepat?", [
      { prompt: "“Korban kecelakaan itu gugur di tempat.”", answer: "tewas / meninggal", reason: "<em>Gugur</em> khusus untuk yang meninggal dalam tugas atau pertempuran." },
      { prompt: "“Hasilnya tergantung dari usaha kita.”", answer: "bergantung pada", reason: "Pasangan tetap: <em>bergantung pada</em>." },
      { prompt: "“Masing-masing kelompok mempresentasikan hasilnya.”", answer: "Setiap kelompok …", reason: "<em>Masing-masing</em> tidak diikuti kata benda." },
      { prompt: "“Laporan ini bukan milik saya, tetapi milik Rina.”", answer: "… melainkan milik Rina.", reason: "<em>Bukan</em> berpasangan dengan <em>melainkan</em>." },
      { prompt: "“Kuliah dimulai jam 7 pagi.”", answer: "pukul 07.00", reason: "Saat tertentu memakai <em>pukul</em>." }
    ])
  ]
};
