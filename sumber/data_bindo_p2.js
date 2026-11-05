// Bahasa Indonesia — Pertemuan 2: Penerapan Ejaan Bahasa Indonesia
module.exports = {
  id: "p2",
  nomor: 2,
  judul: "Penerapan Ejaan Bahasa Indonesia",
  ujian: "UTS",
  hero: {
    badge: "Materi 2 • Bahasa Indonesia",
    title: "Kapital, Tanda Baca, Singkatan, Angka: Jangan Sampai Salah Tulis!",
    text: "Ejaan = aturan menuliskan bunyi bahasa menjadi <strong>huruf, kata, dan kalimat</strong> serta pemakaian <strong>tanda baca</strong>. Kaidah yang berlaku sekarang: <strong>EYD Edisi V</strong> (2022)."
  },
  cheatsheet: [
    {
      type: "table",
      label: "Interaktif 1 • Sejarah Ejaan",
      title: "Perjalanan Ejaan Bahasa Indonesia",
      desc: "Klik tombol untuk menyorot ejaan dan ciri khasnya:",
      tip: "⚠️ Jebakan: Ejaan Melindo (1959) <strong>batal diberlakukan</strong>.",
      headers: ["Ejaan", "Masa berlaku", "Dasar / Penyusun", "Ciri khas"],
      rows: [
        ["Van Ophuysen", "1901–1947", "Ch. A. van Ophuijsen (dibantu Engku Nawawi & Moehammad Taib)", "<code>j</code> untuk y (jang), <code>oe</code> untuk u (itoe), tanda diakritik/apostrof (‘akal, sa’at)"],
        ["Republik / Soewandi", "1947–1972", "Mulai 19 Maret 1947", "oe → u, hamzah → k (rakyat), kata ulang boleh angka 2 (anak2), <em>di</em> selalu dirangkai (dirumah)"],
        ["Melindo", "— (batal)", "Sidang Indonesia–Melayu akhir 1959", "Batal karena perkembangan politik"],
        ["EYD", "1972–2015", "Keppres No. 57 Tahun 1972 (16 Agustus 1972)", "Disempurnakan 1987 & Permendiknas 46/2009"],
        ["PUEBI", "2015–2022", "Permendikbud No. 50 Tahun 2015", "Pedoman Umum Ejaan Bahasa Indonesia"],
        ["EYD Edisi V", "2022–sekarang", "Kep. Kepala Badan Bahasa No. 0424/I/BS.00.01/2022", "Kaidah ejaan yang berlaku saat ini"]
      ],
      modes: [
        { label: "1. Van Ophuysen", target: "row", row: 0, title: "Ejaan van Ophuysen (1901–1947)", text: "Ejaan Melayu huruf Latin. Tiga ciri menonjol: (1) huruf <strong>j</strong> untuk bunyi y (<em>jang, sajang</em>), (2) <strong>oe</strong> untuk bunyi u (<em>ataoe, itoe, oentoeng</em>), (3) <strong>tanda diakritik</strong> seperti apostrof untuk bunyi ‘ain (<em>‘akal, sa’at</em>)." },
        { label: "2. Republik/Soewandi", target: "row", row: 1, title: "Ejaan Republik / Soewandi (19 Maret 1947)", text: "(1) oe → <strong>u</strong>, (2) hamzah & bunyi sentak → <strong>k</strong> (<em>maklum, rakyat</em>), (3) kata ulang boleh ditulis <strong>angka 2</strong> (<em>bapak2, anak2</em>), (4) <em>di</em> sebagai kata depan maupun imbuhan <strong>sama-sama dirangkai</strong> (<em>dirumah, ditulis</em>)." },
        { label: "3. Melindo", target: "row", row: 2, title: "Ejaan Melindo (Melayu-Indonesia)", text: "Hasil sidang perutusan Indonesia (Slamet Mulyana) dan Melayu (Syeh Nasir bin Ismail) akhir 1959, tetapi <strong>batal diberlakukan</strong> karena perkembangan politik." },
        { label: "4. EYD", target: "row", row: 3, title: "Ejaan yang Disempurnakan (16 Agustus 1972)", text: "Berdasarkan <strong>Keppres No. 57 Tahun 1972</strong>. Pedoman Umum EYD & Pedoman Umum Pembentukan Istilah diberlakukan lewat Kepmendikbud 27 Agustus 1975 No. 0196/U/1975; direvisi 1987 (0543a/U/1987) dan 2009 (Permendiknas 46/2009)." },
        { label: "5. PUEBI", target: "row", row: 4, title: "PUEBI (30 November 2015)", text: "<strong>Permendikbud No. 50 Tahun 2015</strong>, menggantikan Permendiknas 46/2009 yang hanya berumur ± 6 tahun." },
        { label: "6. EYD V", target: "row", row: 5, title: "EYD Edisi V (2022) — yang berlaku sekarang", text: "Keputusan Kepala Badan Pengembangan dan Pembinaan Bahasa <strong>No. 0424/I/BS.00.01/2022</strong> tentang Ejaan Bahasa Indonesia yang Disempurnakan." }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 2 • Huruf Kapital",
      title: "Saklar Kapital: Kapan <strong>Pakai</strong>, Kapan <strong>Tidak</strong>?",
      desc: "Setiap tombol berisi pasangan contoh yang sering menjebak di soal:",
      style: "pills",
      options: [
        { label: "Gelar & jabatan", title: "Diikuti nama orang → kapital", code: "Sultan Agung • Haji Ahmad Dahlan • Bupati Magelang • Profesor Abdul Mu’ti", text: "Kapital jika <strong>diikuti nama orang</strong> (atau nama instansi/tempat pengganti nama orang).", note: "Tidak kapital: “Pamannya baru saja dilantik menjadi <strong>bupati</strong>.” • “Sebagian besar <strong>kadus</strong> yang hadir…”" },
        { label: "Nama orang", title: "Unsur nama orang → kapital", code: "Muhammad Hatta • J. P. van Bronchost • Otto von Bismarck • Abdullah bin Rahmad", text: "Kapital untuk setiap unsur nama orang, <strong>kecuali</strong> <em>van, der, de, von, da</em> serta <em>bin/binti</em>.", note: "Nama orang sebagai satuan ukuran: singkatannya kapital (<strong>N</strong> = newton), tetapi kata lengkapnya tidak (<strong>10 ampere, mesin diesel</strong>)." },
        { label: "Bangsa, suku, bahasa", title: "Nama bangsa/suku/bahasa → kapital", code: "bangsa Maya • suku Sunda • bahasa Indonesia", text: "Yang kapital hanya <strong>namanya</strong>; kata <em>bangsa, suku, bahasa</em> tetap kecil.", note: "Tidak kapital jika jadi bentuk dasar kata turunan: <strong>pengindonesiaan</strong>, <strong>kejawa-jawaan</strong>." },
        { label: "Waktu & peristiwa", title: "Tahun, bulan, hari, hari raya, peristiwa sejarah → kapital", code: "tahun Masehi • bulan Oktober • hari Jumat • hari Natal • Perang Dunia I • Proklamasi Kemerdekaan Indonesia", text: "Kapital pada nama tahun/bulan/hari dan unsur <strong>nama</strong> peristiwa sejarah.", note: "Tidak kapital bila peristiwa tidak dipakai sebagai nama: “Soekarno dan Hatta memproklamasikan <strong>kemerdekaan</strong> bangsa Indonesia.”" },
        { label: "Geografi", title: "Nama diri geografi → kapital", code: "Gunung Merapi • Danau Toba • Jalan Pahlawan • ukiran Jepara • batik Pekalongan", text: "Kapital jika unsur geografi <strong>diikuti nama diri</strong>, dan nama tempat yang menunjukkan <strong>kekhasan budaya</strong>.", note: "Tidak kapital: <strong>mendaki gunung</strong> (tanpa nama diri) dan nama geografi sebagai penjelas <strong>nama jenis</strong>: <strong>apel malang, pisang ambon, petai cina, badak jawa</strong>." },
        { label: "Lembaga & judul", title: "Nama resmi lembaga, dokumen & judul → kapital", code: "Republik Indonesia • Rancangan Undang-Undang Kelautan • Uji Kemahiran Bahasa Indonesia", text: "Semua unsur kapital (termasuk kata ulang sempurna), <strong>kecuali kata tugas</strong> (di, ke, dari, dan, yang, untuk, oleh, atau) yang tidak di awal.", note: "Tidak kapital jika bukan nama resmi: “Sinergi antara pemerintah dan rakyat menjadi <strong>republik</strong>.”" },
        { label: "Sapaan & Anda", title: "Kekerabatan dalam sapaan/pengacuan & kata Anda → kapital", code: "“Surat Anda sudah saya terima.” • “Apakah Anda sudah mencicipi makanan itu?”", text: "Kata bapak, ibu, saudara, kakak, adik, paman <strong>kapital bila dipakai menyapa/mengacu</strong>. Kata <strong>Anda</strong> selalu kapital dalam penyapaan.", note: "Tidak kapital: “Dia tidak mempunyai <strong>saudara</strong> yang tinggal di Semarang.”" },
        { label: "Lain-lain", title: "Awal kalimat, petikan langsung, agama", code: "Pak Widodo berkata, “Hati-hati di perjalanan, Nak.” • Tuhan Yang Maha Esa • Alquran", text: "Kapital pada awal kalimat, awal petikan langsung, nama agama/kitab suci/Tuhan (termasuk kata gantinya), dan singkatan gelar (S.T., Sdr.)." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        { type: "cards", label: "Interaktif 3 • Huruf Miring & Tebal", title: "Kapan Dicetak Miring atau Tebal?", cols: 1, items: [
          { badge: "Miring 1", title: "Nama buku, majalah, surat kabar yang dikutip", text: "surat kabar <em>Suara Pembaharuan</em>" },
          { badge: "Miring 2", title: "Menegaskan huruf/bagian kata/kata", text: "Bab ini <em>tidak</em> membicarakan penulisan huruf miring." },
          { badge: "Miring 3", title: "Nama ilmiah & ungkapan asing (belum disesuaikan)", text: "Nama ilmiah jintan hitam ialah <em>Nigella sativa</em>. • Tulisan tangan/ketikan: <strong>beri garis bawah</strong>." },
          { badge: "Tebal", tone: "indigo", title: "Judul buku, bab, bagian bab, daftar isi, daftar pustaka, indeks, lampiran", text: "<strong>BAB I PENDAHULUAN</strong> • <strong>1.1 Latar Belakang Masalah</strong> • <strong>DAFTAR ISI</strong>" }
        ] },
        { type: "cards", label: "Interaktif 4 • Singkatan & Akronim", title: "Pakai Titik atau Tidak?", cols: 1, items: [
          { badge: "Pakai titik tiap unsur", title: "Nama orang, gelar, sapaan, pangkat", text: "A.H. Nasution • <strong>Dr.</strong> (doktor) • <strong>dr.</strong> (dokter)" },
          { badge: "Tanpa titik", title: "Inisial nama • huruf awal tiap kata (kapital)", text: "SDD (Sapardi Djoko Damono) • PT (perseroan terbatas)" },
          { badge: "Surat-menyurat", title: "> 2 huruf: satu titik • 2 huruf: titik tiap huruf", text: "dst. (dan seterusnya) • a.n. (atas nama) • Gd. Tabrani • Km. 57" },
          { badge: "Tanpa titik", tone: "rose", title: "Satuan ukuran, takaran, timbangan, lambang kimia, mata uang", text: "<strong>Rp</strong> • <strong>km</strong> — jangan tulis “Rp.” atau “km.”" },
          { badge: "Akronim", tone: "emerald", title: "Nama diri: huruf awal kapital • bukan nama diri: huruf kecil", text: "BIN, <strong>Bulog</strong> (Badan Urusan Logistik) • <strong>iptek</strong> (ilmu pengetahuan dan teknologi)" }
        ] }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 5 • Tanda Baca",
      title: "7 Tanda Baca yang Wajib Dikuasai",
      tabs: [
        { label: "Titik (.)", blocks: [{ type: "list", groups: [
          { title: "Dipakai", items: ["Akhir kalimat bukan tanya/seru — <em>Ayahku tinggal di Solo.</em>", "Belakang angka/huruf dalam bagan/daftar — <em>III. Departemen Dalam Negeri</em>", "Memisahkan jam, menit, detik — <em>pukul 1.35.20</em>; jangka waktu — <em>0.20.30 jam</em>", "Antara penulis, tahun, judul, tempat terbit dalam daftar pustaka", "Memisahkan ribuan yang <strong>menunjukkan jumlah</strong> — <em>23.500 jiwa</em>"] },
          { title: "Tidak dipakai", tone: "rose", items: ["Ribuan yang <strong>bukan jumlah</strong> — <em>halaman 47564</em>", "Akhir judul/kepala karangan, tabel, ilustrasi", "Belakang alamat pengirim, tanggal surat, nama & alamat penerima"] }
        ] }] },
        { label: "Koma (,)", blocks: [{ type: "list", groups: [
          { title: "Dipakai", items: ["Antara unsur perincian — <em>kertas, pena, dan tinta</em>", "Sebelum <strong>tetapi, melainkan, sedangkan</strong> — <em>Saya ingin datang, tetapi hari ini hujan.</em>", "Anak kalimat <strong>mendahului</strong> induk — <em>Jika hari ini hujan, saya tidak datang.</em>", "Setelah penghubung antarkalimat di awal kalimat — <em>Oleh karena itu, …</em>", "Memisahkan petikan langsung — <em>Kata nenek saya, “Kita harus selalu berbagi.”</em>", "Antara nama & alamat, tempat & tanggal", "Nama dibalik dalam daftar pustaka — <em>Keraf, Gorys.</em>", "Antara nama dan gelar akademik — <em>Embun Pagi, S.E.</em>", "Angka desimal / rupiah dan sen — <em>12,5 m</em>", "Mengapit keterangan tambahan/aposisi"] },
          { title: "Tidak dipakai", tone: "rose", items: ["Anak kalimat <strong>mengiringi</strong> induk kalimat — <em>Saya tidak akan datang jika hari ini hujan.</em>"] }
        ] }] },
        { label: "Titik koma (;)", blocks: [{ type: "list", groups: [
          { title: "Dipakai untuk memisahkan", items: ["Sumber-sumber kutipan — <em>(Fishman, 1974; Moeliono, 1985)</em>", "Bagian perincian yang sudah memakai koma — <em>buku, pensil, dan tinta; baju, celana, dan kaus; serta …</em>", "Kalimat setara dalam kalimat majemuk — <em>Ayah mengurus tanaman di kebunnya; ibu sibuk memasak di dapur.</em>", "Bagian kalimat sejenis & setara — <em>Malam makin larut; pekerjaan belum selesai.</em>"] }
        ] }] },
        { label: "Titik dua (:)", blocks: [{ type: "list", groups: [
          { title: "Dipakai", items: ["Pernyataan lengkap diikuti rincian — <em>perabot rumah tangga: kursi, meja, dan lemari</em>", "Setelah kata yang perlu pemerian — <em>tempat : Gedung Wijaya Kusuma</em>", "Teks drama setelah nama pelaku — <em>Ibu : “Bawa kopor ini, Mir!”</em>", "Jilid & halaman, bab & ayat kitab suci, judul & anak judul, kota & penerbit — <em>Surat Yasin: 11; Yogyakarta: Andi Offset</em>", "Jam, menit, detik — <em>pukul 01:35:20</em>", "Rasio/perbandingan — <em>2:3</em>"] },
          { title: "Tidak dipakai", tone: "rose", items: ["Jika rincian merupakan pelengkap yang mengakhiri pernyataan — <em>Kita memerlukan kursi, meja, dan lemari.</em>"] }
        ] }] },
        { label: "Hubung (-)", blocks: [{ type: "list", groups: [
          { title: "Dipakai", items: ["Unsur kata ulang — <em>anak-anak, kehitam-hitaman</em>", "Huruf dieja satu-satu & bagian tanggal — <em>17-8-2016</em>", "Memperjelas hubungan bagian kata — <em>ber-evolusi</em>", "<strong>se-</strong> + kapital, <strong>ke-</strong> + angka, angka + <strong>-an</strong>, singkatan kapital + imbuhan — <em>se-Indonesia, hadiah ke-2, era 2000-an, ber-KTP</em>", "Unsur Indonesia + unsur asing — <em>di-smash, men-support</em>", "Dua unsur satu kesatuan — <em>Konferensi Asia-Afrika</em>"] }
        ] }] },
        { label: "Pisah (—)", blocks: [{ type: "list", groups: [
          { title: "Dipakai", items: ["Membatasi sisipan penjelasan — <em>Keberhasilan itu—kita sependapat—dapat dicapai …</em>", "Menegaskan keterangan aposisi — <em>Soekarno-Hatta—Proklamator Kemerdekaan RI—…</em>", "Antara dua bilangan/tanggal/tempat berarti ‘sampai’ — <em>1990—2000, Jakarta—Bandung</em>"] }
        ] }, { type: "callout", tone: "tip", html: "Saat mengetik, tanda pisah = <strong>dua tanda hubung tanpa spasi</strong> (--)." }] },
        { label: "Garis miring (/)", blocks: [{ type: "list", groups: [
          { title: "Dipakai", items: ["Nomor surat, nomor alamat, masa satu tahun dalam dua tahun takwim — <em>Nomor: 125/PANSEL/OSIS/VIII/2016</em>", "Pengganti kata <strong>dan, atau, tiap</strong> — <em>mahasiswa/mahasiswi, Rp150.000/meter</em>"] }
        ] }] }
      ]
    },
    {
      type: "list",
      label: "Interaktif 6 • Angka & Bilangan",
      title: "Aturan Penulisan Angka dan Bilangan",
      groups: [
        { title: "Ditulis dengan HURUF", items: [
          "Bilangan yang dapat dinyatakan dengan <strong>satu kata</strong> — <em>sampai tiga kali</em> (kecuali dalam perincian berurutan: <em>52 setuju, 15 tidak, 5 abstain</em>)",
          "Bilangan di <strong>awal kalimat</strong> → ubah susunan atau beri kata <em>sebanyak/sejumlah</em>; contoh benar: <em>Panitia mengundang 2.500 orang peserta.</em>",
          "Bilangan besar boleh sebagian huruf — <em>7 triliun rupiah</em>",
          "Bilangan unsur nama geografi, serangkai — <em>Rajaampat, Simpanglima</em>",
          "Pecahan dalam akta/kuitansi — <em>tiga perempat (¾)</em>" ] },
        { title: "Ditulis dengan ANGKA", tone: "emerald", items: [
          "Ukuran (panjang, berat, luas, isi, waktu) & nilai (uang, persen) — <em>0,5 sentimeter, Rp50.000,00</em>",
          "Bagian alamat — <em>Gedung Samudra, Lantai II, Ruang 201</em>",
          "Penomoran bagian karangan/kitab suci — <em>Bab II, Pasal 3, halaman 13</em>",
          "Bilangan tingkat — <em>abad VII, abad ke-7, abad ketujuh</em>",
          "Angka + akhiran -an pakai tanda hubung — <em>uang 5000-an</em>",
          "Dokumen hukum: angka diikuti huruf — <em>1 (satu) tahun; Rp200.000.000,00 (dua ratus juta rupiah)</em>" ] }
      ]
    }
  ],
  simulator: [
    {
      type: "detective",
      label: "Permainan 1 • Detektif Ejaan",
      title: "Temukan & Perbaiki 8 Kesalahan Ejaan!",
      desc: "Setiap kalimat di bawah memiliki <strong>satu bagian yang salah</strong> (berwarna merah). Klik untuk memperbaikinya dan baca aturannya.",
      rules: ["Huruf kapital", "Tanda koma", "Singkatan & mata uang", "Tanda hubung", "Angka & bilangan"],
      headers: ["No.", "Awal kalimat", "Bagian bermasalah", "Akhir kalimat"],
      rows: [
        ["1", "Rumah kami terletak di", "jalan Pahlawan", "nomor 5."],
        ["2", "Ibu membeli", "apel Malang", "di pasar."],
        ["3", "Saya ingin datang", "tetapi", "hari ini hujan."],
        ["4", "Saya tidak akan datang", ", jika", "hari ini hujan."],
        ["5", "Harga buku itu", "Rp. 50.000", "per eksemplar."],
        ["6", "Ia meraih juara", "ke 2", "lomba debat se-Jawa."],
        ["7", "Desa itu berpenduduk", "23500", "jiwa."],
        ["8", "Terima kasih, apakah", "anda", "sudah membaca surat ini?"]
      ],
      bugs: [
        { row: 0, col: 2, fixed: "Jalan Pahlawan", explain: "✅ <strong>Huruf kapital:</strong> unsur geografi yang <strong>diikuti nama diri</strong> ditulis kapital → <em>Jalan Pahlawan</em>." },
        { row: 1, col: 2, fixed: "apel malang", explain: "✅ <strong>Huruf kapital:</strong> nama geografi yang menjadi <strong>penjelas nama jenis</strong> tidak kapital → <em>apel malang</em> (seperti pisang ambon)." },
        { row: 2, col: 2, fixed: ", tetapi", explain: "✅ <strong>Tanda koma:</strong> dipakai <strong>sebelum</strong> kata penghubung pertentangan <em>tetapi, melainkan, sedangkan</em>." },
        { row: 3, col: 2, fixed: "jika", explain: "✅ <strong>Tanda koma:</strong> <strong>tidak dipakai</strong> jika anak kalimat <strong>mengiringi</strong> induk kalimat." },
        { row: 4, col: 2, fixed: "Rp50.000", explain: "✅ <strong>Singkatan:</strong> lambang mata uang <strong>tidak diikuti titik</strong> dan ditulis rapat dengan angkanya → <em>Rp50.000</em>." },
        { row: 5, col: 2, fixed: "ke-2", explain: "✅ <strong>Tanda hubung:</strong> dipakai untuk merangkaikan <strong>ke-</strong> dengan angka → <em>ke-2</em> (atau <em>kedua</em>)." },
        { row: 6, col: 2, fixed: "23.500", explain: "✅ <strong>Tanda titik:</strong> memisahkan bilangan ribuan yang <strong>menunjukkan jumlah</strong> → <em>23.500</em>." },
        { row: 7, col: 2, fixed: "Anda", explain: "✅ <strong>Huruf kapital:</strong> kata <strong>Anda</strong> dalam penyapaan selalu diawali huruf kapital." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 2 • Pilih Tanda Baca",
      title: "Lengkapi Tanda Baca yang Tepat",
      desc: "Pilih tanda baca untuk mengisi bagian <strong>[ ? ]</strong>.",
      headers: ["Kalimat", "Tanda baca"],
      rows: [
        { cells: ["Kita sekarang memerlukan perabot rumah tangga[ ? ] kursi, meja, dan lemari."], fields: [{ options: [".", ",", ";", ":", "-", "—", "/"], answer: ":" }], ok: "✓ Titik dua: pernyataan lengkap diikuti rincian." },
        { cells: ["Ayah mengurus tanaman di kebunnya[ ? ] ibu sibuk memasak di dapur."], fields: [{ options: [".", ",", ";", ":", "-", "—", "/"], answer: ";" }], ok: "✓ Titik koma: memisahkan kalimat setara dalam kalimat majemuk." },
        { cells: ["Jika hari ini hujan[ ? ] saya tidak akan datang."], fields: [{ options: [".", ",", ";", ":", "-", "—", "/"], answer: "," }], ok: "✓ Koma: anak kalimat mendahului induk kalimat." },
        { cells: ["Keberhasilan itu[ ? ]kita sependapat[ ? ]dapat dicapai jika kita mau berusaha."], fields: [{ options: [".", ",", ";", ":", "-", "—", "/"], answer: "—" }], ok: "✓ Tanda pisah: membatasi sisipan penjelasan." },
        { cells: ["Para mahasiswa[ ? ]mahasiswi diharap hadir tepat waktu."], fields: [{ options: [".", ",", ";", ":", "-", "—", "/"], answer: "/" }], ok: "✓ Garis miring: pengganti kata ‘dan/atau’." },
        { cells: ["Pameran itu diikuti peserta se[ ? ]Indonesia."], fields: [{ options: [".", ",", ";", ":", "-", "—", "/"], answer: "-" }], ok: "✓ Tanda hubung: se- + kata berhuruf kapital." },
        { cells: ["Perencanaan bahasa di Indonesia dianggap berhasil (Fishman, 1974[ ? ] Moeliono, 1985)."], fields: [{ options: [".", ",", ";", ":", "-", "—", "/"], answer: ";" }], ok: "✓ Titik koma: memisahkan sumber-sumber kutipan." },
        { cells: ["Jumlah peserta laki-laki dan perempuan di kelas itu adalah 2[ ? ]3."], fields: [{ options: [".", ",", ";", ":", "-", "—", "/"], answer: ":" }], ok: "✓ Titik dua: menyatakan rasio/perbandingan." },
        { cells: ["Lihat halaman 47564 dan seterusnya. (Bilangan ini ditulis …)"], fields: [{ options: [{ value: "tanpa", label: "tanpa titik (47564)" }, { value: "titik", label: "dengan titik (47.564)" }], answer: "tanpa" }], ok: "✓ Nomor halaman bukan jumlah, jadi tanpa titik ribuan." }
      ]
    },
    {
      type: "exercise",
      label: "Permainan 3 • Singkatan & Akronim",
      title: "Pilih Penulisan yang Benar",
      headers: ["Kepanjangan", "Penulisan singkatan/akronim"],
      rows: [
        { cells: ["dokter"], fields: [{ options: ["Dr.", "dr.", "dr", "DR"], answer: "dr." }], ok: "✓ dr. = dokter (huruf kecil); Dr. = doktor." },
        { cells: ["doktor"], fields: [{ options: ["Dr.", "dr.", "Dr", "DR."], answer: "Dr." }], ok: "✓ Dr. = doktor." },
        { cells: ["perseroan terbatas"], fields: [{ options: ["P.T.", "PT", "Pt.", "pt"], answer: "PT" }], ok: "✓ Huruf awal tiap kata: kapital tanpa titik." },
        { cells: ["dan seterusnya"], fields: [{ options: ["dst", "d.s.t.", "dst.", "DST"], answer: "dst." }], ok: "✓ Lebih dari dua huruf (surat-menyurat): satu titik di akhir." },
        { cells: ["atas nama"], fields: [{ options: ["an.", "a.n.", "AN", "a/n"], answer: "a.n." }], ok: "✓ Dua huruf: titik pada setiap huruf." },
        { cells: ["kilometer (satuan)"], fields: [{ options: ["km", "km.", "Km.", "KM"], answer: "km" }], ok: "✓ Satuan ukuran tanpa titik.", hints: [{ field: 0, value: "Km.", msg: "✗ “Km. 57” hanya untuk penulisan alamat (Kilometer 57). Sebagai satuan ukuran ditulis km tanpa titik." }] },
        { cells: ["rupiah"], fields: [{ options: ["Rp.", "Rp", "RP", "rp."], answer: "Rp" }], ok: "✓ Mata uang tanpa titik." },
        { cells: ["Badan Urusan Logistik"], fields: [{ options: ["BULOG", "Bulog", "bulog", "B.U.L."], answer: "Bulog" }], ok: "✓ Akronim nama diri gabungan suku kata: huruf awal kapital." },
        { cells: ["ilmu pengetahuan dan teknologi"], fields: [{ options: ["IPTEK", "Iptek", "iptek", "i.p.t.e.k."], answer: "iptek" }], ok: "✓ Akronim bukan nama diri: huruf kecil semua." },
        { cells: ["Sapardi Djoko Damono (inisial)"], fields: [{ options: ["S.D.D.", "SDD", "S.D.D", "Sdd."], answer: "SDD" }], ok: "✓ Inisial nama orang ditulis tanpa titik." }
      ]
    }
  ],
  flashcards: [
    { tag: "Definisi", q: "Apa yang dimaksud dengan ejaan?", a: "Seperangkat aturan yang mengatur penulisan bunyi bahasa menjadi <strong>huruf, kata, dan kalimat</strong>, serta penggunaan <strong>tanda baca</strong>." },
    { tag: "Sejarah Ejaan", q: "Sebutkan urutan ejaan bahasa Indonesia beserta masa berlakunya!", a: "1) Van Ophuysen 1901–1947<br>2) Republik/Soewandi 1947–1972<br>3) EYD 1972–2015<br>4) PUEBI 2015 (Permendikbud 50/2015)<br>5) EYD Edisi V 2022–sekarang<br><em>(Melindo 1959 batal)</em>" },
    { tag: "Van Ophuysen", q: "Sebutkan 3 ciri Ejaan van Ophuysen!", a: "1) <strong>j</strong> untuk bunyi y (<em>jang</em>)<br>2) <strong>oe</strong> untuk bunyi u (<em>itoe</em>)<br>3) Tanda <strong>diakritik</strong>/apostrof (<em>‘akal, sa’at</em>)" },
    { tag: "Ejaan Republik", q: "Sebutkan ciri Ejaan Republik (Soewandi)!", a: "1) oe → u<br>2) hamzah/bunyi sentak → k (<em>rakyat</em>)<br>3) kata ulang boleh angka 2 (<em>anak2</em>)<br>4) <em>di</em> kata depan & imbuhan sama-sama dirangkai (<em>dirumah</em>)" },
    { tag: "Kapital", q: "Kapan nama jabatan ditulis kapital dan kapan tidak?", a: "<strong>Kapital</strong> jika diikuti nama orang/instansi/tempat (<em>Bupati Magelang</em>).<br><strong>Tidak</strong> jika tidak merujuk nama tertentu (<em>dilantik menjadi bupati</em>)." },
    { tag: "Kapital", q: "Mengapa “apel malang” tidak kapital, tetapi “batik Pekalongan” kapital?", a: "<em>malang</em> pada apel malang adalah <strong>penjelas nama jenis</strong> (tidak kapital). <em>Pekalongan</em> pada batik Pekalongan menunjukkan <strong>kekhasan budaya</strong> (kapital)." },
    { tag: "Koma", q: "Kapan koma dipakai dan tidak dipakai antara anak kalimat dan induk kalimat?", a: "<strong>Dipakai</strong> jika anak kalimat <strong>mendahului</strong> induk: <em>Jika hujan, saya tidak datang.</em><br><strong>Tidak dipakai</strong> jika anak kalimat <strong>mengiringi</strong>: <em>Saya tidak datang jika hujan.</em>" },
    { tag: "Titik", q: "Kapan bilangan ribuan diberi titik dan kapan tidak?", a: "<strong>Diberi titik</strong> jika menunjukkan <strong>jumlah</strong> (<em>23.500 jiwa</em>).<br><strong>Tanpa titik</strong> jika bukan jumlah (<em>halaman 47564</em>)." },
    { tag: "Tanda Hubung", q: "Sebutkan 4 contoh pemakaian tanda hubung dengan imbuhan/angka!", a: "<em>se-Indonesia</em> (se- + kapital), <em>hadiah ke-2</em> (ke- + angka), <em>era 2000-an</em> (angka + -an), <em>ber-KTP</em> (singkatan kapital + imbuhan)." },
    { tag: "Singkatan", q: "Apa beda penulisan Dr. dan dr.?", a: "<strong>Dr.</strong> = doktor (gelar akademik)<br><strong>dr.</strong> = dokter (profesi)" },
    { tag: "Akronim", q: "Bagaimana menulis akronim nama diri dan bukan nama diri?", a: "<strong>Nama diri</strong> (gabungan suku kata): huruf awal kapital → <em>Bulog</em>.<br><strong>Bukan nama diri</strong>: huruf kecil → <em>iptek</em>." },
    { tag: "Bilangan", q: "Bagaimana menulis bilangan di awal kalimat?", a: "Jika lebih dari satu kata, <strong>ubah susunan kalimat</strong> atau dahului dengan kata <em>sebanyak/sejumlah/sebesar</em>. Contoh: <em>Panitia mengundang 2.500 orang peserta.</em>" }
  ],
  quiz: [
    { q: "Ejaan yang berlaku saat ini di Indonesia berdasarkan Keputusan Kepala Badan Pengembangan dan Pembinaan Bahasa Nomor 0424/I/BS.00.01/2022 adalah …",
      opts: ["PUEBI", "EYD Edisi V", "Ejaan Soewandi", "Ejaan Melindo"], ans: 1,
      exp: "Keputusan tahun 2022 tersebut menetapkan Ejaan Bahasa Indonesia yang Disempurnakan yang dikenal sebagai EYD Edisi V.",
      optExp: ["PUEBI berdasarkan Permendikbud 50/2015 dan sudah diganti.", "Benar.", "Ejaan Soewandi berlaku 1947–1972.", "Ejaan Melindo batal diberlakukan."] },
    { q: "Penulisan kata “jang”, “itoe”, dan “sa’at” merupakan ciri ejaan …",
      opts: ["Ejaan Republik", "EYD", "Ejaan van Ophuysen", "PUEBI"], ans: 2,
      exp: "Ejaan van Ophuysen memakai j untuk y, oe untuk u, dan tanda diakritik/apostrof.",
      optExp: ["Ejaan Republik justru mengganti oe menjadi u.", "EYD sudah memakai y dan u.", "Benar.", "PUEBI sudah memakai ejaan modern."] },
    { q: "Penulisan huruf kapital yang tepat terdapat pada kalimat …",
      opts: ["Pamannya baru saja dilantik menjadi Bupati.", "Ibu membeli Pisang Ambon di pasar.", "Kami mendaki Gunung Merapi pada hari Minggu.", "Ia fasih berbahasa Sunda dan Bahasa Inggris."], ans: 2,
      exp: "Unsur geografi yang diikuti nama diri (Gunung Merapi) dan nama hari (Minggu) ditulis kapital.",
      optExp: ["‘bupati’ tidak diikuti nama orang, jadi tidak kapital.", "‘pisang ambon’ nama jenis, tidak kapital.", "Benar.", "Kata ‘bahasa’ tidak kapital; yang kapital hanya ‘Inggris’."] },
    { q: "Kalimat yang penggunaan tanda komanya TIDAK tepat adalah …",
      opts: ["Saya ingin datang, tetapi hari ini hujan.", "Jika hari ini hujan, saya tidak akan datang.", "Saya tidak akan datang, jika hari ini hujan.", "Oleh karena itu, kita harus berhati-hati."], ans: 2,
      exp: "Koma tidak dipakai jika anak kalimat mengiringi induk kalimat.",
      optExp: ["Tepat: koma sebelum ‘tetapi’.", "Tepat: anak kalimat mendahului induk kalimat.", "Benar (ini yang salah): seharusnya tanpa koma.", "Tepat: koma setelah penghubung antarkalimat."] },
    { q: "“Ibu membeli buku, pensil, dan tinta[ ? ] baju, celana, dan kaus[ ? ] serta pisang, apel, dan jeruk.” Tanda baca yang tepat untuk mengisi bagian [ ? ] adalah …",
      opts: ["Titik dua (:)", "Koma (,)", "Titik koma (;)", "Tanda pisah (—)"], ans: 2,
      exp: "Titik koma memisahkan bagian-bagian perincian dalam kalimat yang sudah menggunakan koma.",
      optExp: ["Titik dua dipakai sebelum rincian, bukan pemisah antarkelompok rincian.", "Koma sudah dipakai di dalam tiap kelompok, sehingga membingungkan.", "Benar.", "Tanda pisah untuk sisipan atau arti ‘sampai’."] },
    { q: "Penulisan tanda hubung yang tepat terdapat pada …",
      opts: ["se Indonesia, ke 2, 2000an", "se-Indonesia, ke-2, 2000-an", "se-indonesia, ke-dua, 2000-an", "seIndonesia, ke2, 2000 an"], ans: 1,
      exp: "Tanda hubung merangkaikan se- dengan kata berhuruf kapital, ke- dengan angka, dan angka dengan -an.",
      optExp: ["Tanpa tanda hubung, salah.", "Benar.", "‘Indonesia’ harus kapital; ‘kedua’ ditulis serangkai tanpa tanda hubung.", "Semua tidak sesuai kaidah."] },
    { q: "Penulisan singkatan yang benar adalah …",
      opts: ["Rp. 50.000; 10 Km.", "Rp50.000; 10 km", "RP 50.000; 10 KM", "Rp 50.000,-; 10 km."], ans: 1,
      exp: "Lambang mata uang dan satuan ukuran ditulis tanpa titik; Rp ditulis rapat dengan angkanya.",
      optExp: ["Rp dan km tidak diikuti titik.", "Benar.", "Penulisan kapital semua tidak sesuai kaidah.", "Satuan ukuran tidak diakhiri titik."] },
    { q: "Akronim yang penulisannya benar adalah …",
      opts: ["IPTEK dan BULOG", "Iptek dan bulog", "iptek dan Bulog", "Iptek dan BULOG"], ans: 2,
      exp: "Akronim bukan nama diri ditulis huruf kecil (iptek); akronim nama diri gabungan suku kata ditulis huruf awal kapital (Bulog).",
      optExp: ["Keduanya bukan gabungan huruf awal, jadi tidak semua kapital.", "Terbalik.", "Benar.", "BULOG seharusnya Bulog, dan iptek huruf kecil."] },
    { q: "Kalimat yang penulisan bilangannya sesuai EYD adalah …",
      opts: ["2.500 orang peserta diundang panitia.", "Mereka menonton drama itu sampai 3 kali.", "Panitia mengundang 2.500 orang peserta.", "Desa itu berpenduduk 23500 jiwa."], ans: 2,
      exp: "Bilangan di awal kalimat harus diubah susunannya; bilangan yang dapat ditulis dengan satu kata ditulis huruf; ribuan yang menunjukkan jumlah diberi titik.",
      optExp: ["Bilangan tidak boleh di awal kalimat dalam bentuk angka.", "Seharusnya ‘tiga kali’.", "Benar.", "Seharusnya 23.500 (jumlah)."] },
    { q: "Kata yang dicetak miring karena merupakan nama ilmiah terdapat pada kalimat …",
      opts: ["Nama ilmiah jintan hitam ialah Nigella sativa.", "Ia membaca surat kabar Kompas.", "BAB I PENDAHULUAN", "Bab ini tidak membicarakan huruf miring."], ans: 0,
      exp: "Nama ilmiah (Nigella sativa) dicetak miring. Nama surat kabar juga miring, tetapi alasannya karena nama terbitan, bukan nama ilmiah.",
      optExp: ["Benar.", "Miring karena nama surat kabar, bukan nama ilmiah.", "Judul bab dicetak tebal, bukan miring.", "Miring di sini untuk menegaskan kata."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS BAHASA INDONESIA — PERTEMUAN 2*
📚 *Penerapan Ejaan Bahasa Indonesia*

1️⃣ *Sejarah ejaan:*
• Van Ophuysen 1901–1947 (j=y, oe=u, diakritik)
• Republik/Soewandi 1947–1972 (oe→u, hamzah→k, anak2, "di" dirangkai)
• Melindo 1959 *batal* • EYD 1972 (Keppres 57/1972) • PUEBI 2015 (Permendikbud 50/2015)
• *EYD Edisi V* 2022 — yang berlaku sekarang.

2️⃣ *Huruf kapital (jebakan):*
• Bupati Magelang ✔️ vs dilantik menjadi bupati ✔️
• Gunung Merapi, batik Pekalongan ✔️ vs mendaki gunung, apel malang ✔️
• suku Sunda, bahasa Indonesia • pengindonesiaan • van/von/bin tidak kapital • *Anda* selalu kapital.

3️⃣ *Miring & tebal:* miring = judul terbitan dikutip, penegasan, nama ilmiah/asing • tebal = judul, bab, daftar isi, lampiran.

4️⃣ *Tanda baca:*
• Titik: ribuan jumlah (23.500) tapi halaman 47564 tanpa titik.
• Koma: sebelum tetapi/melainkan/sedangkan; anak kalimat di depan → pakai koma.
• Titik koma: pisah kutipan & perincian yang sudah berkoma.
• Titik dua: sebelum rincian, rasio 2:3.
• Hubung: se-Indonesia, ke-2, 2000-an, ber-KTP, di-smash.
• Pisah: sisipan, 1990—2000 • Garis miring: nomor surat, dan/atau/tiap.

5️⃣ *Singkatan:* Dr. (doktor) vs dr. (dokter) • PT • dst. • a.n. • Rp & km tanpa titik • Bulog • iptek.

6️⃣ *Angka:* awal kalimat jangan angka • satu kata → huruf (tiga kali) • ukuran & uang → angka • abad VII/ke-7/ketujuh • 1 (satu) tahun.`
};
