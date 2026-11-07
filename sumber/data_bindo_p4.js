// Bahasa Indonesia — Pertemuan 4: Pembentukan Kata, Kata Baku, dan Diksi (pendalaman)
// LMS tidak menyediakan modul P4. Materi ini disusun mandiri sebagai lanjutan P3, dari:
// KBBI VI Daring, EYD Edisi V (Badan Bahasa, 2022), Tata Bahasa Baku Bahasa Indonesia (Alwi dkk.),
// Keraf "Diksi dan Gaya Bahasa", Chaer "Morfologi Bahasa Indonesia", Kridalaksana "Pembentukan Kata dalam Bahasa Indonesia".
const ULANG = ["Dwilingga (utuh)", "Dwipurwa (suku awal)", "Salin suara", "Berimbuhan", "Bukan kata ulang"];
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a, ok, o]) => ({ cells: [c], fields: [{ options: o || opts, answer: a }], ok: ok || "✓" })) });

module.exports = {
  id: "p4", nomor: 4, judul: "Pembentukan Kata, Kata Baku, dan Diksi (Pendalaman)", ujian: "UTS",
  hero: {
    badge: "Materi 4 • Bahasa Indonesia • Disusun mandiri",
    title: "Kerja Sama atau Kerjasama? Sanksi atau Sangsi?",
    text: "Lanjutan P3: <strong>kata ulang</strong>, <strong>gabungan kata</strong> (pisah atau serangkai), <strong>pemendekan</strong>, <strong>ragam dan kata baku</strong>, serta <strong>diksi lanjutan</strong>: sinonim yang tidak sama persis, homonim, kata berpasangan, dan kata yang sering salah makna."
  },
  cheatsheet: [
    { type: "callout", tone: "warn", heading: "📌 Bukan dari modul LMS", html: "LMS tidak menyediakan modul untuk Pertemuan 4. Halaman ini disusun sendiri dari sumber resmi dan buku rujukan: <strong>KBBI VI Daring</strong>, <strong>EYD Edisi V</strong> (Badan Bahasa, 2022), <em>Tata Bahasa Baku Bahasa Indonesia</em> (Alwi dkk.), Gorys Keraf <em>Diksi dan Gaya Bahasa</em>, dan Abdul Chaer <em>Morfologi Bahasa Indonesia</em>. Isinya melanjutkan P3 dan tidak mengulang yang sudah ada di sana. Kalau dosen nanti mengunggah modul P4, ikuti modul itu." },
    {
      type: "choices", label: "Interaktif 1 • Reduplikasi", title: "Empat Bentuk Kata Ulang (+1 Jebakan)", style: "pills",
      desc: "Klik setiap bentuk. Semua kata ulang ditulis dengan <strong>tanda hubung</strong>, tidak dengan angka 2.",
      options: [
        { label: "Dwilingga", title: "Pengulangan utuh", code: "rumah → rumah-rumah • buku → buku-buku • pagi → pagi-pagi", text: "Seluruh bentuk dasar diulang tanpa perubahan." },
        { label: "Dwipurwa", title: "Pengulangan suku awal", code: "laki → lelaki • tamu → tetamu • luhur → leluhur • daun → dedaunan", text: "Suku pertama diulang dan vokalnya biasanya melemah menjadi <em>e</em>." },
        { label: "Salin suara", title: "Diulang dengan perubahan bunyi", code: "bolak-balik • warna-warni • gerak-gerik • sayur-mayur • lauk-pauk", text: "Bunyi vokal atau konsonan pada salah satu bagian berubah." },
        { label: "Berimbuhan", title: "Pengulangan disertai imbuhan", code: "berlari-lari • tembak-menembak • kemerah-merahan • rumah-rumahan", text: "Imbuhan bisa di depan, di tengah, atau mengapit bentuk ulang." },
        { label: "⚠️ Kata ulang semu", tone: "amber", title: "Terlihat diulang, padahal bukan hasil pengulangan", code: "kupu-kupu • laba-laba • ubur-ubur • paru-paru • kura-kura", text: "Tidak ada bentuk dasar <em>kupu</em> atau <em>laba</em> yang bermakna sama. Kata ini memang begitu sejak awal." }
      ]
    },
    {
      type: "table", label: "Interaktif 2 • Gabungan Kata (EYD V)", title: "Pisah atau Serangkai? Tergantung Imbuhannya",
      desc: "Klik tombol untuk melihat aturan tiap kolom.",
      headers: ["Gabungan kata", "+ awalan ATAU akhiran saja", "+ awalan DAN akhiran"],
      rows: [
        ["tanggung jawab", "bertanggung jawab", "pertanggungjawaban"],
        ["kerja sama", "bekerja sama", "dikerjasamakan"],
        ["garis bawah", "garis bawahi", "menggarisbawahi"],
        ["sebar luas", "sebar luaskan", "menyebarluaskan"],
        ["tanda tangan", "tanda tangani", "menandatangani"],
        ["beri tahu", "memberi tahu", "memberitahukan"],
        ["lipat ganda", "berlipat ganda", "melipatgandakan"]
      ],
      modes: [
        { label: "Bentuk dasar", target: "col", col: 0, title: "Gabungan kata ditulis TERPISAH", text: "Aturan umum EYD V: unsur gabungan kata ditulis terpisah. Salah: <em>tanggungjawab, kerjasama, tandatangan</em>." },
        { label: "Satu imbuhan", target: "col", col: 1, title: "Masih TERPISAH", text: "Imbuhan hanya menempel pada unsur yang terdekat: <strong>ber</strong>tanggung jawab, garis bawah<strong>i</strong>." },
        { label: "Imbuhan apit", target: "col", col: 2, title: "Ditulis SERANGKAI", text: "Jika mendapat awalan dan akhiran sekaligus, seluruh gabungan ditulis serangkai: <strong>pertanggungjawaban, menandatangani</strong>." }
      ]
    },
    {
      type: "row", cols: [1, 1],
      blocks: [
        { type: "list", label: "Interaktif 3 • Sudah Padu", title: "Selalu SERANGKAI", groups: [
          { title: "Dianggap satu kata (daftar EYD V)", tone: "emerald", items: ["olahraga • kacamata • matahari • saputangan", "segitiga • kilometer • beasiswa • belasungkawa", "dukacita • sukacita • sukarela • peribahasa", "barangkali • bagaimana • padahal • apalagi"] }
        ] },
        { type: "list", label: "Interaktif 4 • Sering Salah Rangkai", title: "Tetap TERPISAH", groups: [
          { title: "Yang sering ditulis serangkai padahal salah", tone: "rose", items: ["kerja sama • tanggung jawab • terima kasih", "ibu kota • wali kota • rumah sakit", "sepak bola • tanda tangan • orang tua", "duta besar • mata kuliah • beri tahu"] }
        ] }
      ]
    },
    {
      type: "cards", label: "Interaktif 5 • Pemendekan (Abreviasi)", title: "Lima Cara Memendekkan Kata", cols: 3,
      items: [
        { badge: "Singkatan", title: "Dibaca per huruf", text: "KTP, DPR, SMA, dll. Aturan tulisnya ada di P2." },
        { badge: "Akronim", title: "Dibaca seperti kata", text: "SIM, rudal (peluru kendali), tilang (bukti pelanggaran), pemilu." },
        { badge: "Penggalan", title: "Sebagian kata diambil", text: "lab (laboratorium), prof (profesor), dok (dokter)." },
        { badge: "Kontraksi", title: "Dirapatkan menjadi satu", text: "takkan (tidak akan), tak (tidak)." },
        { badge: "Lambang", title: "Huruf atau lambang baku", text: "cm, kg, Rp, km, Fe." }
      ]
    },
    {
      type: "tabs", label: "Interaktif 6 • Diksi Lanjutan", title: "Melengkapi Empat Syarat Diksi di P3",
      desc: "P3 sudah membahas syarat tepat, lazim, hemat, baku. Di sini alat bantunya: relasi makna dan kata yang sering terpeleset.",
      tabs: [
        { label: "🔗 Relasi makna", blocks: [
          { type: "cards", cols: 2, items: [
            { badge: "Sinonim", title: "Mirip makna, beda rasa", text: "meninggal, wafat, tewas, gugur, mati. Tidak ada sinonim yang bisa saling ganti di semua kalimat." },
            { badge: "Antonim", title: "Berlawanan makna", text: "naik–turun, membeli–menjual, lulus–gagal." },
            { badge: "Homonim", title: "Sama tulis, sama bunyi, beda makna", text: "<em>bisa</em> (dapat) vs <em>bisa</em> (racun ular)." },
            { badge: "Homofon", title: "Sama bunyi, beda tulis", text: "<em>bank</em> (tempat menyimpan uang) vs <em>bang</em> (abang). <em>sanksi</em> (hukuman) vs <em>sangsi</em> (ragu)." },
            { badge: "Homograf", title: "Sama tulis, beda bunyi", text: "<em>apel</em> (buah, e pepet) vs <em>apel</em> (upacara, e taling). <em>teras</em> rumah vs <em>teras</em> kayu." },
            { badge: "Hiponim", title: "Umum dan khusus", text: "<em>bunga</em> (hipernim) → mawar, melati, anggrek (hiponim). Kata khusus membuat tulisan lebih tepat." }
          ] }
        ] },
        { label: "🤝 Pasangan tetap", blocks: [
          { type: "table", headers: ["Kurang tepat", "Tepat"], rows: [
            ["bukan … tetapi …", "<strong>bukan … melainkan …</strong>"],
            ["baik … ataupun …", "<strong>baik … maupun …</strong>"],
            ["antara … dengan …", "<strong>antara … dan …</strong>"],
            ["sesuai …", "<strong>sesuai dengan …</strong>"],
            ["tergantung dari …", "<strong>bergantung pada …</strong>"]
          ], defaultNote: "Kata-kata ini selalu berpasangan dengan kata tertentu (ungkapan idiomatis). <em>Terdiri atas</em> dan <em>terdiri dari</em> sama-sama diterima KBBI." }
        ] },
        { label: "🎯 Sering salah makna", blocks: [
          { type: "table", headers: ["Kata", "Makna sebenarnya (KBBI)", "Salah kaprah"], rows: [
            ["bergeming", "diam saja, tidak bergerak", "dikira ‘bergerak’"],
            ["mengentaskan", "mengangkat (dari kemiskinan, dsb.)", "dikira ‘menuntaskan’"],
            ["pukul / jam", "pukul = waktu (pukul 08.00); jam = lama (dua jam)", "‘rapat jam 8’ dalam surat resmi"],
            ["masing-masing / setiap", "masing-masing tidak diikuti kata benda", "‘masing-masing mahasiswa’ → setiap mahasiswa"],
            ["mantan / bekas", "mantan untuk orang/jabatan, bekas untuk barang", "‘mobil mantan menteri’ benar, ‘mantan mobil’ salah"]
          ] }
        ] },
        { label: "🎓 Ilmiah vs populer", blocks: [
          { type: "table", headers: ["Kata ilmiah", "Kata populer"], rows: [
            ["prediksi", "ramalan"], ["asumsi", "anggapan"], ["evaluasi", "penilaian"], ["implementasi", "penerapan"], ["partisipasi", "keikutsertaan"], ["konsensus", "kesepakatan"], ["kompetensi", "kemampuan"]
          ], defaultNote: "Kata ilmiah cocok untuk laporan, makalah, dan pembaca terdidik di bidangnya. Untuk pengumuman umum, kata populer lebih mudah dipahami (Keraf)." }
        ] }
      ]
    },
    {
      type: "table", label: "Interaktif 7 • Kata Baku", title: "Daftar Tambahan (yang Belum Ada di P3)", headers: ["Tidak baku", "Baku", "Tidak baku", "Baku"],
      rows: [
        ["handal", "andal", "himbau", "imbau"], ["hembus", "embus", "atlit", "atlet"], ["cendikiawan", "cendekiawan", "efektifitas", "efektivitas"],
        ["frekwensi", "frekuensi", "ijasah", "ijazah"], ["jenasah", "jenazah", "katagori", "kategori"], ["komoditi", "komoditas", "kongkrit", "konkret"],
        ["lembab", "lembap", "menyolok", "mencolok"], ["milyar", "miliar", "faham", "paham"], ["prosen", "persen", "rejeki", "rezeki"],
        ["syaraf", "saraf", "standarisasi", "standardisasi"], ["subyek", "subjek", "terlantar", "telantar"], ["propinsi", "provinsi", "sekertaris", "sekretaris"],
        ["Pebruari", "Februari", "Nopember", "November"], ["kemaren", "kemarin", "trampil", "terampil"]
      ],
      modes: [
        { label: "Huruf h", target: "row", row: 0, title: "Huruf h di awal yang tidak perlu", text: "<strong>andal, imbau, embus</strong>. Tanpa h di depan." },
        { label: "Bulan", target: "row", row: 12, title: "Nama bulan memakai f dan v", text: "<strong>Februari, November</strong>, sesuai bentuk asalnya." },
        { label: "-isasi", target: "row", row: 9, title: "standard + -isasi", text: "Kata dasarnya <em>standar</em>, tetapi bentuk serapannya mengikuti <em>standardization</em>: <strong>standardisasi</strong>." }
      ]
    }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • Jenis Kata Ulang", "Termasuk Bentuk Apa?", ["Kata", "Bentuk"], ULANG, [
      ["sayur-mayur", "Salin suara"], ["lelaki", "Dwipurwa (suku awal)"], ["kupu-kupu", "Bukan kata ulang", "✓ Kata ulang semu."], ["buku-buku", "Dwilingga (utuh)"],
      ["tembak-menembak", "Berimbuhan"], ["bolak-balik", "Salin suara"], ["kemerah-merahan", "Berimbuhan"], ["leluhur", "Dwipurwa (suku awal)"]
    ]),
    ex("Permainan Interaktif 2 • Pisah atau Serangkai", "Tulisan Ini Benar atau Salah?", ["Tulisan", "Penilaian"], ["Benar", "Salah"], [
      ["Kami siap bekerja sama.", "Benar"], ["Ia harus bertanggungjawab.", "Salah", "✓ bertanggung jawab (hanya awalan)."],
      ["Laporan pertanggungjawaban sudah dikirim.", "Benar"], ["Ayah gemar olah raga.", "Salah", "✓ olahraga (sudah padu)."],
      ["Mohon tanda tangani surat ini.", "Benar"], ["Mahasiswa menanda tangani kontrak.", "Salah", "✓ menandatangani (awalan + akhiran)."],
      ["Terimakasih atas kehadirannya.", "Salah", "✓ terima kasih."], ["Kami membeli surat-surat kabar.", "Benar", "✓ Bentuk ulang gabungan kata: ulang unsur pertama."]
    ]),
    ex("Permainan Interaktif 3 • Kata Baku", "Pilih Bentuk yang Baku", ["Pilihan", "Baku"], [], [
      ["andal / handal", "andal", "", ["andal", "handal"]], ["himbauan / imbauan", "imbauan", "", ["himbauan", "imbauan"]],
      ["jenasah / jenazah", "jenazah", "", ["jenasah", "jenazah"]], ["lembap / lembab", "lembap", "", ["lembap", "lembab"]],
      ["standarisasi / standardisasi", "standardisasi", "", ["standarisasi", "standardisasi"]], ["Nopember / November", "November", "", ["Nopember", "November"]],
      ["terlantar / telantar", "telantar", "", ["terlantar", "telantar"]], ["komoditi / komoditas", "komoditas", "", ["komoditi", "komoditas"]]
    ]),
    ex("Permainan Interaktif 4 • Diksi yang Tepat", "Isi Bagian Kosong", ["Kalimat", "Kata"], [], [
      ["Pelanggar aturan akan dikenai …", "sanksi", "✓ sanksi = hukuman; sangsi = ragu.", ["sanksi", "sangsi"]],
      ["Ujian dimulai … 08.00 WIB.", "pukul", "✓ Waktu tertentu memakai pukul.", ["jam", "pukul"]],
      ["Ujian berlangsung selama dua …", "jam", "✓ Lama waktu memakai jam.", ["jam", "pukul"]],
      ["Yang hadir bukan ketua, … wakilnya.", "melainkan", "✓ bukan … melainkan.", ["tetapi", "melainkan"]],
      ["Baik dosen … mahasiswa wajib hadir.", "maupun", "✓ baik … maupun.", ["ataupun", "maupun"]],
      ["… peserta mendapat sertifikat.", "Setiap", "✓ masing-masing tidak diikuti kata benda.", ["Masing-masing", "Setiap"]],
      ["Prajurit itu … dalam tugas.", "gugur", "✓ gugur = meninggal dalam tugas/peperangan.", ["gugur", "tewas"]],
      ["Ia tetap … meski didesak.", "bergeming", "✓ bergeming = diam, tidak bergerak.", ["bergeming", "bergerak"]]
    ]),
    { type: "reveal", label: "Latihan Lisan", title: "Perbaiki Kalimatnya, Lalu Buka", items: [
      { prompt: "“Banyak mahasiswa-mahasiswa mengikuti seminar itu.”", answer: "Banyak mahasiswa mengikuti seminar itu.", reason: "<em>Banyak</em> sudah menyatakan jamak, jadi kata ulangnya mubazir (pleonasme, lihat P3)." },
      { prompt: "“Panitia menghimbau peserta untuk datang jam 7.”", answer: "Panitia mengimbau peserta untuk datang pukul 07.00.", reason: "Baku: <em>imbau</em>. Waktu tertentu: <em>pukul</em>." },
      { prompt: "“Kami akan bekerjasama dengan pihak kampus.”", answer: "Kami akan bekerja sama dengan pihak kampus.", reason: "Hanya mendapat awalan ber-, jadi tetap terpisah." },
      { prompt: "“Pemerintah berupaya menuntaskan warga dari kemiskinan.”", answer: "Pemerintah berupaya mengentaskan warga dari kemiskinan.", reason: "<em>Mengentaskan</em> = mengangkat dari keadaan buruk." },
      { prompt: "“Hasil rapat itu tergantung dari keputusan ketua.”", answer: "Hasil rapat itu bergantung pada keputusan ketua.", reason: "Pasangan tetap: <em>bergantung pada</em>." }
    ] }
  ],
  flashcards: [
    { tag: "Kata ulang", q: "Empat bentuk kata ulang?", a: "Dwilingga (rumah-rumah), dwipurwa (lelaki), salin suara (bolak-balik), berimbuhan (tembak-menembak)." },
    { tag: "Kata ulang", q: "Contoh kata ulang semu?", a: "kupu-kupu, laba-laba, ubur-ubur, paru-paru, kura-kura. Tidak berasal dari bentuk dasar yang diulang." },
    { tag: "Kata ulang", q: "Bentuk ulang dari “surat kabar”?", a: "<strong>surat-surat kabar</strong>. Yang diulang hanya unsur pertama." },
    { tag: "Kata ulang", q: "Makna “kemerah-merahan”?", a: "Agak merah (melemahkan)." },
    { tag: "Gabungan kata", q: "Kapan gabungan kata ditulis serangkai?", a: "1) Mendapat awalan DAN akhiran sekaligus (menandatangani). 2) Sudah padu (olahraga, kacamata, matahari)." },
    { tag: "Gabungan kata", q: "bertanggung jawab atau bertanggungjawab?", a: "<strong>bertanggung jawab</strong> (hanya awalan). Tetapi <strong>pertanggungjawaban</strong> serangkai." },
    { tag: "Pemendekan", q: "Lima jenis pemendekan?", a: "Singkatan (KTP), akronim (SIM, rudal), penggalan (lab), kontraksi (takkan), lambang huruf (kg, Rp)." },
    { tag: "Ragam baku", q: "Kapan ragam baku dipakai?", a: "Komunikasi resmi, tulisan ilmiah/teknis, berbicara di depan umum, dan berbicara dengan orang yang dihormati." },
    { tag: "Ragam baku", q: "Empat fungsi bahasa baku?", a: "Pemersatu, pemberi kekhasan, pembawa kewibawaan, kerangka acuan." },
    { tag: "Kata baku", q: "andal, imbau, embus: baku?", a: "Ya. Bentuk dengan h di depan (handal, himbau, hembus) tidak baku." },
    { tag: "Diksi", q: "Homonim, homofon, homograf?", a: "Homonim: tulis & bunyi sama (bisa). Homofon: bunyi sama (bank–bang). Homograf: tulisan sama, bunyi beda (apel buah–apel upacara)." },
    { tag: "Diksi", q: "sanksi atau sangsi?", a: "<strong>sanksi</strong> = hukuman. <strong>sangsi</strong> = ragu-ragu." },
    { tag: "Diksi", q: "pukul atau jam?", a: "Pukul untuk saat (pukul 08.00). Jam untuk lamanya (dua jam)." },
    { tag: "Diksi", q: "Pasangan yang benar untuk “bukan” dan “baik”?", a: "<strong>bukan … melainkan</strong>, <strong>baik … maupun</strong>, <strong>antara … dan</strong>." },
    { tag: "Diksi", q: "Arti “bergeming”?", a: "Diam saja, tidak bergerak sedikit pun." }
  ],
  quiz: [
    { q: "Kata ulang yang termasuk dwipurwa (pengulangan suku awal) adalah …",
      opts: ["lelaki", "sayur-mayur", "rumah-rumah", "berlari-lari"], ans: 0,
      exp: "Lelaki berasal dari laki dengan suku awal diulang (la → le).",
      optExp: ["Benar.", "Salin suara (perubahan bunyi).", "Dwilingga (utuh).", "Berimbuhan."] },
    { q: "Kata berikut yang BUKAN hasil proses pengulangan adalah …",
      opts: ["buku-buku", "kupu-kupu", "bolak-balik", "kemerah-merahan"], ans: 1,
      exp: "Kupu-kupu adalah kata ulang semu. Tidak ada bentuk dasar ‘kupu’ yang bermakna sama.",
      optExp: ["Dari buku, dwilingga.", "Benar.", "Salin suara dari balik.", "Berimbuhan dari merah."] },
    { q: "Kata ulang “kemerah-merahan” menyatakan makna …",
      opts: ["banyak", "agak (melemahkan)", "saling", "berulang-ulang"], ans: 1,
      exp: "Konfiks ke-an pada bentuk ulang kata sifat menyatakan ‘agak’: kemerah-merahan = agak merah.",
      optExp: ["Makna banyak contohnya buku-buku.", "Benar.", "Makna saling contohnya tembak-menembak.", "Bukan perbuatan yang diulang."] },
    { q: "Kata ulang “pukul-memukul” menyatakan makna …",
      opts: ["agak", "menyerupai", "saling (berbalasan)", "paling"], ans: 2,
      exp: "Pola kata-meN-kata menyatakan perbuatan yang berbalasan.",
      optExp: ["Contoh: kehijau-hijauan.", "Contoh: rumah-rumahan.", "Benar.", "Contoh: setinggi-tingginya."] },
    { q: "Bentuk ulang yang benar untuk gabungan kata “surat kabar” adalah …",
      opts: ["surat kabar-surat kabar", "surat-surat kabar", "surat kabar-kabar", "surat2 kabar"], ans: 1,
      exp: "EYD V: bentuk ulang gabungan kata cukup mengulang unsur pertama.",
      optExp: ["Terlalu panjang dan tidak sesuai EYD.", "Benar.", "Yang diulang justru unsur kedua.", "Angka 2 tidak dipakai dalam tulisan resmi."] },
    { q: "Kalimat yang penulisan gabungan katanya benar adalah …",
      opts: ["Kita perlu bekerjasama.", "Kita perlu bekerja sama.", "Kita perlu berkerja sama.", "Kita perlu bekerja-sama."], ans: 1,
      exp: "Kerja sama hanya mendapat awalan ber-, jadi tetap ditulis terpisah. Ber- + kerja menjadi bekerja.",
      optExp: ["Serangkai hanya jika mendapat awalan dan akhiran.", "Benar.", "Ber- + kerja menjadi bekerja, bukan berkerja.", "Tidak perlu tanda hubung."] },
    { q: "Gabungan kata berikut yang wajib ditulis serangkai adalah …",
      opts: ["menggarisbawahi", "bertanggungjawab", "tandatangani", "sebarluaskan"], ans: 0,
      exp: "Garis bawah mendapat awalan meN- dan akhiran -i sekaligus, jadi ditulis serangkai.",
      optExp: ["Benar.", "Hanya awalan: bertanggung jawab.", "Hanya akhiran: tanda tangani.", "Hanya akhiran: sebar luaskan."] },
    { q: "Deretan gabungan kata yang ditulis serangkai karena sudah padu adalah …",
      opts: ["olahraga, kacamata, matahari", "kerjasama, tanggungjawab, ibukota", "sepakbola, terimakasih, walikota", "rumahsakit, dutabesar, matakuliah"], ans: 0,
      exp: "Olahraga, kacamata, dan matahari termasuk gabungan kata yang sudah padu menurut EYD V.",
      optExp: ["Benar.", "Ketiganya ditulis terpisah.", "Ketiganya ditulis terpisah.", "Ketiganya ditulis terpisah."] },
    { q: "“Ia dijadikan kambing hitam atas kegagalan proyek itu.” Kata “kambing hitam” bermakna …",
      opts: ["hewan berbulu hitam", "orang yang dipersalahkan", "orang yang berjasa", "pemimpin proyek"], ans: 1,
      exp: "Kambing hitam adalah gabungan kata idiomatis: maknanya tidak bisa ditebak dari unsur-unsurnya.",
      optExp: ["Itu makna harfiah, tidak cocok dengan konteks.", "Benar.", "Kebalikannya.", "Tidak ada hubungannya."] },
    { q: "Kata “lab” dari “laboratorium” dibentuk melalui pemendekan jenis …",
      opts: ["singkatan", "akronim", "penggalan", "kontraksi"], ans: 2,
      exp: "Penggalan mengambil sebagian dari kata: lab, prof.",
      optExp: ["Singkatan dibaca per huruf (KTP).", "Akronim gabungan unsur beberapa kata (rudal).", "Benar.", "Kontraksi merapatkan (takkan)."] },
    { q: "Kata “takkan” (tidak akan) termasuk pemendekan jenis …",
      opts: ["singkatan", "kontraksi", "penggalan", "lambang huruf"], ans: 1,
      exp: "Kontraksi meringkas dan merapatkan beberapa kata menjadi satu bentuk.",
      optExp: ["Singkatan dibaca per huruf.", "Benar.", "Penggalan mengambil sebagian satu kata.", "Lambang contohnya kg, Rp."] },
    { q: "Ragam baku wajib dipakai dalam situasi berikut, KECUALI …",
      opts: ["rapat dinas", "menulis skripsi", "presentasi seminar", "mengobrol dengan teman sekamar"], ans: 3,
      exp: "Ragam baku dipakai dalam komunikasi resmi, tulisan ilmiah, dan berbicara di depan umum. Obrolan santai boleh tidak baku.",
      optExp: ["Komunikasi resmi.", "Tulisan ilmiah.", "Berbicara di depan umum.", "Benar."] },
    { q: "Deretan kata baku yang benar adalah …",
      opts: ["andal, imbau, embus", "handal, himbau, hembus", "andal, himbau, embus", "handal, imbau, hembus"], ans: 0,
      exp: "Menurut KBBI, bentuk bakunya andal, imbau, dan embus (tanpa h).",
      optExp: ["Benar.", "Ketiganya tidak baku.", "‘himbau’ tidak baku.", "‘handal’ dan ‘hembus’ tidak baku."] },
    { q: "Penulisan nama bulan yang baku adalah …",
      opts: ["Pebruari, Nopember", "Februari, November", "Februari, Nopember", "Pebruari, November"], ans: 1,
      exp: "Bentuk baku: Februari dan November.",
      optExp: ["Keduanya tidak baku.", "Benar.", "‘Nopember’ tidak baku.", "‘Pebruari’ tidak baku."] },
    { q: "Kalimat yang seluruh katanya baku adalah …",
      opts: ["Jenasah korban sudah diidentifikasi.", "Jenazah korban sudah diidentifikasi.", "Jenazah korban sudah diidentifikasi kemaren.", "Jenasah korban sudah diindentifikasi."], ans: 1,
      exp: "Baku: jenazah, identifikasi, kemarin.",
      optExp: ["‘jenasah’ tidak baku.", "Benar.", "‘kemaren’ tidak baku.", "‘jenasah’ dan ‘diindentifikasi’ salah."] },
    { q: "“Peserta yang terlambat akan dikenai ….” Kata yang tepat adalah …",
      opts: ["sanksi", "sangsi", "sangksi", "sanki"], ans: 0,
      exp: "Sanksi = hukuman. Sangsi = ragu-ragu. Keduanya homofon.",
      optExp: ["Benar.", "Sangsi berarti ragu.", "Tidak ada di KBBI.", "Tidak ada di KBBI."] },
    { q: "Pasangan kata berikut yang termasuk homofon adalah …",
      opts: ["bank – bang", "apel (buah) – apel (upacara)", "bisa (dapat) – bisa (racun)", "besar – kecil"], ans: 0,
      exp: "Homofon: bunyi sama, tulisan dan makna berbeda.",
      optExp: ["Benar.", "Homograf: tulisan sama, lafal berbeda.", "Homonim: tulisan dan bunyi sama.", "Antonim."] },
    { q: "“Mawar” terhadap “bunga” disebut …",
      opts: ["sinonim", "antonim", "hiponim", "homonim"], ans: 2,
      exp: "Mawar adalah bagian dari kelompok bunga, jadi mawar hiponim dari bunga (bunga = hipernim).",
      optExp: ["Maknanya tidak sama.", "Tidak berlawanan.", "Benar.", "Tidak ada kesamaan bentuk."] },
    { q: "Kalimat dengan pilihan kata yang tepat adalah …",
      opts: ["Rapat dimulai jam 09.00.", "Rapat dimulai pukul 09.00.", "Rapat berlangsung selama tiga pukul.", "Rapat dimulai pukul 09.00 pagi hari."], ans: 1,
      exp: "Pukul untuk menyatakan saat, jam untuk lamanya. ‘Pagi hari’ setelah 09.00 mubazir.",
      optExp: ["Dalam ragam resmi, saat memakai pukul.", "Benar.", "Lamanya memakai jam.", "‘pagi hari’ berlebihan."] },
    { q: "Kalimat yang memakai kata “masing-masing” dengan tepat adalah …",
      opts: ["Masing-masing mahasiswa wajib membawa KTM.", "Para mahasiswa membawa KTM masing-masing.", "Setiap mahasiswa masing-masing membawa KTM.", "Masing-masing peserta-peserta membawa KTM."], ans: 1,
      exp: "Masing-masing tidak diikuti kata benda. Gunakan ‘setiap mahasiswa’ atau letakkan masing-masing di belakang.",
      optExp: ["Seharusnya ‘setiap mahasiswa’.", "Benar.", "‘setiap’ dan ‘masing-masing’ bertumpuk.", "Salah dua kali."] },
    { q: "Kalimat dengan pasangan kata penghubung yang tepat adalah …",
      opts: ["Bukan saya yang mengambil, tetapi dia.", "Bukan saya yang mengambil, melainkan dia.", "Baik dosen ataupun mahasiswa hadir.", "Antara teori dengan praktik harus seimbang."], ans: 1,
      exp: "Pasangan tetap: bukan … melainkan, baik … maupun, antara … dan.",
      optExp: ["Bukan berpasangan dengan melainkan.", "Benar.", "Seharusnya baik … maupun.", "Seharusnya antara … dan."] },
    { q: "Kata “bergeming” dalam “Ia tidak bergeming meski dibujuk” kurang tepat karena …",
      opts: ["bergeming berarti diam, jadi ‘tidak bergeming’ berarti bergerak", "bergeming bukan kata baku", "seharusnya bergemingan", "bergeming berarti bergetar"], ans: 0,
      exp: "Bergeming = diam, tidak bergerak. Jadi untuk maksud ‘tetap diam’ cukup ‘Ia bergeming meski dibujuk’.",
      optExp: ["Benar.", "Bergeming ada di KBBI.", "Tidak ada bentuk itu.", "Maknanya bukan bergetar."] },
    { q: "Eufemisme (penghalusan) yang tepat untuk “dipecat” adalah …",
      opts: ["didepak", "diberhentikan dari pekerjaannya", "ditendang dari kantor", "dibuang"], ans: 1,
      exp: "Eufemisme mengganti kata yang terasa kasar dengan yang lebih halus.",
      optExp: ["Malah lebih kasar.", "Benar.", "Kasar.", "Kasar."] },
    { q: "Padanan populer untuk kata ilmiah “prediksi” adalah …",
      opts: ["anggapan", "ramalan", "penilaian", "penerapan"], ans: 1,
      exp: "Prediksi = ramalan. Asumsi = anggapan, evaluasi = penilaian, implementasi = penerapan.",
      optExp: ["Padanan asumsi.", "Benar.", "Padanan evaluasi.", "Padanan implementasi."] },
    { q: "Kata yang paling tepat untuk melengkapi “Prajurit itu … saat bertugas di perbatasan” adalah …",
      opts: ["mati", "tewas", "gugur", "mangkat"], ans: 2,
      exp: "Gugur dipakai untuk prajurit yang meninggal dalam tugas atau pertempuran.",
      optExp: ["Netral, kurang menghormati.", "Untuk kecelakaan atau bencana.", "Benar.", "Khusus untuk raja."] }
  ],
  ringkasan: `*RANGKUMAN KILAT BAHASA INDONESIA — PERTEMUAN 4*
📚 *Pembentukan Kata, Kata Baku, dan Diksi (pendalaman)*
_Disusun mandiri dari KBBI, EYD V, dan buku rujukan karena LMS tidak menyediakan modul P4._

1️⃣ *Kata ulang (pakai tanda hubung, bukan angka 2):*
• Dwilingga: buku-buku • Dwipurwa: lelaki, leluhur
• Salin suara: bolak-balik, sayur-mayur • Berimbuhan: tembak-menembak, kemerah-merahan
• Semu: kupu-kupu, laba-laba • Gabungan kata: *surat-surat kabar*

2️⃣ *Gabungan kata:*
• Dasar & satu imbuhan → pisah: kerja sama, bekerja sama, bertanggung jawab
• Awalan + akhiran → serangkai: pertanggungjawaban, menandatangani, menggarisbawahi
• Sudah padu → serangkai: olahraga, kacamata, matahari, segitiga, beasiswa

3️⃣ *Pemendekan:* singkatan (KTP), akronim (SIM), penggalan (lab), kontraksi (takkan), lambang (kg).

4️⃣ *Ragam baku:* dipakai di situasi resmi, tulisan ilmiah, depan umum, dengan orang yang dihormati.
Baku: andal, imbau, embus, jenazah, lembap, standardisasi, telantar, Februari, November.

5️⃣ *Diksi lanjutan:*
• Homofon: sanksi (hukuman) vs sangsi (ragu) • Homograf: apel buah vs apel upacara
• pukul (saat) vs jam (lamanya) • setiap mahasiswa, bukan masing-masing mahasiswa
• bukan … melainkan • baik … maupun • antara … dan • bergantung pada
• bergeming = diam • mengentaskan = mengangkat dari • gugur (prajurit), wafat (tokoh), mangkat (raja)`
};
