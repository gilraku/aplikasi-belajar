// Bahasa Indonesia — Pertemuan 1: Sejarah Perkembangan, Kedudukan, Fungsi, dan Ragam Bahasa Indonesia
module.exports = {
  id: "p1",
  nomor: 1,
  judul: "Sejarah, Kedudukan, Fungsi & Ragam Bahasa Indonesia",
  ujian: "UTS",
  hero: {
    badge: "Materi 1 • Bahasa Indonesia",
    title: "Dari Bahasa Melayu Kuno sampai 300 Juta Penutur!",
    text: "Pahami <strong>asal-usul bahasa Indonesia</strong>, bedanya <strong>bahasa nasional vs bahasa negara</strong>, <strong>fungsi bahasa</strong>, dan <strong>jenis-jenis ragam bahasa</strong> lewat tombol-tombol interaktif di bawah."
  },
  cheatsheet: [
    {
      type: "tabs",
      label: "Interaktif 1 • Sejarah & Perkembangan",
      title: "Mengapa Bahasa Melayu Menjadi Cikal Bakal Bahasa Indonesia?",
      tabs: [
        { label: "🧭 1. Alasan Bahasa Melayu Dipilih", blocks: [
          { type: "cards", cols: 3, items: [
            { badge: "Alasan 1", title: "Lingua franca nusantara", text: "Bahasa Melayu sudah menjadi <strong>bahasa pengantar komunikasi</strong> di nusantara jauh sebelum kemerdekaan." },
            { badge: "Alasan 2", title: "Tidak bertingkat", text: "Bahasa Melayu <strong>tidak memiliki sistem tingkatan bahasa</strong> (seperti undak-usuk bahasa daerah lain) sehingga mudah diterima suku lain." },
            { badge: "Alasan 3", title: "Diterima semua suku", text: "Berbagai suku bersedia memakainya sebagai bahasa antarsuku, hingga diikrarkan dalam <strong>Sumpah Pemuda 1928</strong>." }
          ] },
          { type: "callout", tone: "tip", html: "Bunyi ikrar ke-3 Sumpah Pemuda: <em>“Kami putra dan putri Indonesia menjunjung bahasa persatuan, bahasa Indonesia.”</em><br>Selain Melayu, bahasa Indonesia juga menyerap unsur bahasa <strong>Arab, Portugis, Belanda, Inggris, Sanskerta</strong>, dan bahasa-bahasa daerah." }
        ] },
        { label: "🪨 2. Bukti Prasasti & Dokumen", blocks: [
          { type: "table",
            desc: "Klik tombol untuk menyorot. <strong>Jebakan UTS:</strong> jangan tertukar antara tahun <em>ditulis</em> dan tahun <em>ditemukan</em>!",
            headers: ["Prasasti (Sriwijaya, abad VII)", "Ditulis", "Ditemukan di", "Tahun ditemukan"],
            rows: [
              ["Talang Tuo", "684 M", "Palembang", "1920"],
              ["Kota Kapur", "686 M", "Bangka", "1892"],
              ["Karang Berahi", "± 680 M", "Jambi", "1904"]
            ],
            modes: [
              { label: "Sorot tahun ditulis", target: "col", col: 1, title: "Tahun Ditulis (Masa Sriwijaya)", text: "Ketiganya ditulis sekitar abad VII dalam <strong>bahasa Melayu kuno</strong>: Karang Berahi (± 680), Talang Tuo (684), Kota Kapur (686)." },
              { label: "Sorot tempat ditemukan", target: "col", col: 2, title: "Lokasi Penemuan", text: "Talang Tuo → <strong>Palembang</strong>, Kota Kapur → <strong>Bangka</strong>, Karang Berahi → <strong>Jambi</strong>." },
              { label: "Sorot tahun ditemukan", target: "col", col: 3, title: "Tahun Ditemukan (Masa Modern)", text: "Kota Kapur paling dulu ditemukan (1892), lalu Karang Berahi (1904), dan Talang Tuo (1920)." }
            ],
            notes: [
              { title: "📜 Antonio Pigafetta (1522)", text: "Menyusun daftar kata Melayu dari Kepulauan Maluku dalam buku <em>Relazione del Primo Viaggio Intorno al Mondo</em>." },
              { title: "🏫 K.B. 1871 No. 104", text: "Surat keputusan Pemerintah Kolonial Belanda: pengajaran di sekolah bumiputra memakai bahasa daerah atau bahasa Melayu." }
            ]
          }
        ] },
        { label: "📅 3. Garis Waktu Penting", blocks: [
          { type: "list", groups: [
            { title: "Tonggak Sejarah", items: [
              "<strong>1901</strong> — Ejaan resmi bahasa Melayu oleh <strong>Ch. A. van Ophuijsen</strong> (Kitab Logat Melayu)",
              "<strong>1908</strong> — <em>Commissie voor de Volkslectuur</em> berdiri (kelak <strong>Balai Pustaka</strong>)",
              "<strong>28 Oktober 1928</strong> — <strong>Sumpah Pemuda</strong>",
              "<strong>1933</strong> — Lahir angkatan <strong>Pujangga Baru</strong>",
              "<strong>18 Agustus 1945</strong> — UUD 1945 ditandatangani; <strong>Pasal 36</strong>: bahasa Indonesia bahasa negara",
              "<strong>19 Maret 1947</strong> — <strong>Ejaan Republik (Soewandi)</strong> menggantikan Ejaan van Ophuijsen",
              "<strong>16 Agustus 1972</strong> — Presiden Soeharto meresmikan <strong>EYD</strong>",
              "<strong>31 Agustus 1972</strong> — Mendikbud menetapkan Pedoman Umum EYD & Pedoman Umum Pembentukan Istilah" ] },
            { title: "Kongres Bahasa Indonesia I–X", tone: "emerald", items: [
              "<strong>I</strong> — 25–28 Juni <strong>1938</strong>, <strong>Solo</strong>",
              "<strong>II</strong> — 28 Okt–2 Nov <strong>1954</strong>, <strong>Medan</strong>",
              "<strong>III</strong> — 1978, Jakarta",
              "<strong>IV</strong> — 1983, Jakarta",
              "<strong>V</strong> — 1988, Jakarta",
              "<strong>VI</strong> — 1993, Jakarta",
              "<strong>VII</strong> — 1998, Jakarta",
              "<strong>VIII</strong> — 2003, Jakarta",
              "<strong>IX</strong> — 2008, Jakarta",
              "<strong>X</strong> — 28–31 Oktober <strong>2013</strong>, Jakarta" ] }
          ] },
          { type: "callout", tone: "warn", html: "<strong>Jebakan UTS:</strong> hanya Kongres I (Solo) dan Kongres II (Medan) yang <strong>tidak</strong> diadakan di Jakarta." }
        ] }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 2 • Kedudukan Bahasa Indonesia (Lingkup Nasional)",
      title: "Saklar: Bahasa <strong>Nasional</strong> vs Bahasa <strong>Negara</strong>",
      desc: "Dirumuskan dalam <strong>Seminar Politik Bahasa Nasional, Jakarta, 25–28 Februari 1975</strong>. Klik saklar untuk membandingkan:",
      style: "toggle",
      options: [
        { label: "Bahasa Nasional (Persatuan)", tone: "indigo", badge: "Sumpah Pemuda 1928", title: "Dasar: ikrar ke-3 Sumpah Pemuda",
          text: "<strong>4 fungsi bahasa nasional:</strong><ol><li>Lambang <strong>kebanggaan</strong> nasional</li><li>Lambang <strong>identitas</strong> nasional</li><li>Alat <strong>pemersatu</strong> masyarakat yang berbeda latar sosial, budaya, dan bahasanya</li><li>Alat <strong>penghubung antarbudaya dan antardaerah</strong></li></ol>",
          note: "Kata kunci: <strong>lambang</strong>, <strong>pemersatu</strong>, <strong>antardaerah</strong>." },
        { label: "Bahasa Negara (Resmi)", tone: "rose", badge: "UUD 1945 Bab XV Pasal 36", title: "Dasar: “Bahasa negara ialah bahasa Indonesia”",
          text: "<strong>4 fungsi bahasa negara:</strong><ol><li>Bahasa <strong>resmi kenegaraan</strong></li><li>Bahasa <strong>pengantar dalam pendidikan</strong></li><li>Alat perhubungan tingkat nasional untuk <strong>perencanaan & pelaksanaan pembangunan serta pemerintahan</strong></li><li>Alat pengembangan <strong>kebudayaan, ilmu pengetahuan, dan teknologi</strong></li></ol>",
          note: "Kata kunci: <strong>resmi</strong>, <strong>pendidikan</strong>, <strong>pemerintahan/pembangunan</strong>, <strong>iptek</strong>." }
      ],
      footer: "💡 Bahasa Indonesia <strong>lebih tua</strong> daripada kemerdekaan Indonesia: lahir sebagai bahasa persatuan tahun 1928, sehingga pada 2025 sudah berusia <strong>97 tahun</strong>."
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        {
          type: "cards",
          label: "Interaktif 3 • Lingkup Internasional",
          title: "Angka-Angka Penting yang Sering Ditanyakan",
          cols: 2,
          items: [
            { badge: "± 300 juta", title: "Penutur di dunia (2025)" },
            { badge: "4.463.950", title: "Penutur asli di luar negeri (Kemlu, 2012)", text: "Terbanyak ke-5 di luar negara asal bahasanya." },
            { badge: "772 lembaga", title: "Lembaga BIPA di 57 negara (Juni 2025)", text: "BIPA = Bahasa Indonesia bagi Penutur Asing." },
            { badge: "Des 2007", title: "Ho Chi Minh City, Vietnam", text: "Menjadikan bahasa Indonesia bahasa asing kedua." }
          ]
        },
        {
          type: "choices",
          label: "Interaktif 4 • Fungsi Bahasa secara Umum (Alwi dkk., 2003)",
          title: "4 Fungsi Bahasa",
          style: "pills",
          options: [
            { label: "Pemersatu", title: "Fungsi Pemersatu", text: "Bahasa menyatukan dialek dari berbagai bahasa dan berbagai suku yang berbeda-beda di Indonesia." },
            { label: "Pemberi Kekhasan", title: "Fungsi Pemberi Kekhasan", text: "Setiap bahasa punya sistem sendiri sehingga dapat dibedakan dari bahasa lain." },
            { label: "Pembawa Kewibawaan", title: "Fungsi Pembawa Kewibawaan", text: "Pilihan kata yang sesuai kebutuhan, waktu, dan tempat menunjukkan wibawa penutur." },
            { label: "Kerangka Acuan", title: "Fungsi Kerangka Acuan", text: "Bahasa menjadi acuan untuk menjelaskan aturan/norma yang berlaku di masyarakat dan memperjelas pengetahuan berbagai bidang." },
            { label: "5 fungsi dasar komunikasi", tone: "amber", title: "Fungsi utama: alat komunikasi", text: "Mencakup 5 fungsi dasar: <strong>expression, information, exploration, persuasion, entertainment</strong>.<br>Komponen komunikasi: (1) partisipan (pengirim & penerima), (2) informasi, (3) alat." }
          ]
        }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 5 • Fungsi Bahasa secara Khusus",
      title: "6 Bidang Fungsi Khusus Bahasa",
      desc: "Klik setiap bidang. Perhatikan istilah <strong>metalingual</strong> dan ciri <strong>bahasa militer</strong> yang sering keluar di soal.",
      style: "pills",
      options: [
        { label: "Sosial", title: "Fungsi Sosial", text: "Alat komunikasi antarmanusia di lingkungan tempat tinggal maupun lingkungan kerja." },
        { label: "Pendidikan", title: "Fungsi Pendidikan", text: "Alat menyampaikan ilmu pengetahuan. Bahasa yang dipakai untuk menjelaskan <strong>ilmu bahasa itu sendiri</strong> disebut fungsi <strong>metalingual</strong>." },
        { label: "Hukum", title: "Fungsi Hukum", text: "Menjelaskan ketentuan dan kaidah hukum. Tanda baca, konjungsi, dan diksi <strong>denotatif</strong> harus tepat agar tidak menimbulkan tafsir ganda." },
        { label: "Agama", title: "Fungsi Agama", text: "Memahamkan ilmu dan aturan agama yang berasal dari bahasa lain (misalnya bahasa Arab/Alquran)." },
        { label: "Pemerintahan", title: "Fungsi Pemerintahan", text: "Menjelaskan aturan ketatanegaraan secara tertulis: undang-undang, keputusan presiden, peraturan pemerintah, dll." },
        { label: "Militer", title: "Fungsi Militer", text: "Ciri bahasa militer: <strong>ringkas dan tegas</strong>, penuh <strong>singkatan dan akronim</strong>; sebagian istilahnya bersifat rahasia." },
        { label: "4 potensi alat perubahan sosial", tone: "amber", title: "Bahasa Indonesia sebagai Alat Perubahan Sosial (Kurniawan, 2008)", text: "1) Terbukti <strong>mempersatukan</strong> bangsa yang majemuk, 2) bersifat <strong>demokratis</strong> (tidak mengenal tingkat tutur), 3) bersifat <strong>terbuka</strong> (mudah menyerap unsur asing), 4) sudah mulai <strong>mengglobal</strong>." }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 6 • Ragam Bahasa",
      title: "5 Faktor Penyebab & Jenis-Jenis Ragam Bahasa",
      desc: "Ragam bahasa = <strong>variasi penggunaan bahasa</strong> oleh para penuturnya. Pilih sudut pandangnya:",
      tabs: [
        { label: "⚙️ Faktor Penyebab", blocks: [
          { type: "cards", cols: 3, items: [
            { badge: "a", title: "Letak geografis/daerah", text: "Pegunungan, pesisir, perkotaan memunculkan ragam berbeda." },
            { badge: "b", title: "Media/sarana", text: "Media tulis → ragam tulis; media lisan → ragam lisan." },
            { badge: "c", title: "Situasi/kondisi", text: "Santai menuntut ragam santai; resmi menuntut ragam resmi." },
            { badge: "d", title: "Tingkat pendidikan", text: "Tercermin dalam kemampuan memproduksi bahasa." },
            { badge: "e", title: "Jenis pekerjaan", text: "Setiap profesi punya istilah dan kebiasaan bertutur sendiri (misal polisi vs guru)." }
          ] }
        ] },
        { label: "🧑 Berdasarkan Penutur", blocks: [
          { type: "cards", cols: 4, items: [
            { badge: "Idiolek", title: "Perorangan", text: "“Warna” suara, pilihan kata, gaya, dan susunan kalimat khas tiap orang." },
            { badge: "Dialek", title: "Wilayah (dialek regional/areal)", text: "Kelompok penutur di suatu tempat, misal bahasa Jawa dialek Banyumas, Surabaya." },
            { badge: "Kronolek", title: "Masa tertentu (dialek temporal)", text: "Misal ragam bahasa tahun 30-an, 50-an, dan masa kini." },
            { badge: "Sosiolek", title: "Status & kelas sosial", text: "Berkaitan dengan usia, pendidikan, pekerjaan, kebangsawanan, ekonomi." }
          ] }
        ] },
        { label: "🏷️ Pemakaian & Media", blocks: [
          { type: "cards", cols: 3, items: [
            { badge: "Fungsiolek", title: "Berdasarkan pemakaian/bidang", text: "Ilmiah, sastra, jurnalistik, militer, dll. Paling tampak pada <strong>kosakata</strong>. Jurnalistik: <strong>sederhana, komunikatif, ringkas</strong>." },
            { badge: "Ragam tulis", title: "Kaidah tata tulis", text: "Kekhasannya pada penerapan <strong>kaidah ejaan</strong>: huruf kapital, tanda baca, imbuhan." },
            { badge: "Ragam lisan", title: "Pelafalan/fonem", text: "Ditentukan bunyi, tekanan, dan intonasi; bisa memunculkan <strong>homofon</strong> (contoh: kata <em>apel</em>)." }
          ] }
        ] },
        { label: "🎚️ Tingkat Keformalan", blocks: [
          { type: "list", groups: [
            { title: "5 Ragam Keformalan (dari paling resmi)", ordered: true, items: [
              "<strong>Beku (frozen)</strong> — sangat khidmat: khotbah, upacara kenegaraan, upacara adat. Pola & kaidahnya <strong>tidak boleh diubah</strong>.",
              "<strong>Baku (resmi/formal)</strong> — akademik/pendidikan, rapat resmi.",
              "<strong>Usaha (konsultatif)</strong> — bisnis/negosiasi, berorientasi hasil; <strong>paling operasional</strong>, di antara formal dan santai.",
              "<strong>Santai (kasual)</strong> — kantin, pasar, tempat wisata; banyak <strong>bentuk alegro</strong> (kata yang dipendekkan).",
              "<strong>Akrab (intim)</strong> — hubungan sangat dekat; bahasa tidak lengkap, pendek-pendek, artikulasi sering tidak jelas." ] }
          ] }
        ] },
        { label: "👶 Tahap Pemerolehan & Gaya", blocks: [
          { type: "cards", cols: 2, items: [
            { badge: "Bahasa ibu = B1", title: "Bahasa pertama", text: "Dipelajari pertama kali secara alamiah dari keluarga yang mengasuh (bukan harus bahasa sang ibu). Umumnya bahasa daerah." },
            { badge: "B2, B3 …", title: "Bahasa kedua, ketiga", text: "Bagi kebanyakan anak Indonesia, bahasa Indonesia adalah <strong>B2</strong> karena dipelajari saat sekolah." },
            { badge: "Bahasa asing", title: "Bersifat politis", text: "Bahasa milik bangsa lain (Malaysia, Arab, Inggris, Cina) adalah bahasa asing bagi bangsa Indonesia." },
            { badge: "Gaya bahasa (style)", title: "Resmi • Tak resmi • Percakapan", text: "Resmi: pidato kenegaraan, tajuk rencana. Tak resmi: buku pegangan, perkuliahan, editorial. Percakapan: kosakata populer, tidak baku, pemendekan." }
          ] },
          { type: "callout", tone: "info", html: "<strong>3 etika berkomunikasi (Haryatmoko, 2007):</strong> 1) melindungi pihak yang lemah, 2) menjaga keseimbangan kebebasan berekspresi dan tanggung jawab, 3) menghindari dampak negatif (konflik)." }
        ] }
      ]
    },
    {
      type: "reveal",
      label: "Uji Cepat",
      title: "Tebak Ragam Bahasanya!",
      desc: "Klik situasi untuk melihat jawabannya:",
      items: [
        { prompt: "Khotbah Jumat & upacara kenegaraan", answer: "Ragam beku (frozen)", reason: "Kondisi sangat khidmat, polanya tidak boleh diubah." },
        { prompt: "Negosiasi harga dengan klien", answer: "Ragam usaha (konsultatif)", reason: "Berorientasi hasil/produksi, paling operasional." },
        { prompt: "Bahasa khas Pak Budi yang mudah dikenali", answer: "Idiolek", reason: "Variasi bahasa perorangan." },
        { prompt: "Ragam bahasa remaja tahun 80-an", answer: "Kronolek", reason: "Variasi pada masa tertentu (dialek temporal)." },
        { prompt: "Bahasa laporan berita di koran", answer: "Fungsiolek (jurnalistik)", reason: "Ragam berdasarkan bidang pemakaian; sederhana, komunikatif, ringkas." },
        { prompt: "Bahasa Jawa dialek Banyumas", answer: "Dialek (regional)", reason: "Variasi berdasarkan wilayah penutur." }
      ]
    }
  ],
  simulator: [
    {
      type: "exercise",
      label: "Studi Kasus 1 • Kedudukan Bahasa",
      title: "Bahasa Nasional atau Bahasa Negara?",
      desc: "Tentukan setiap fungsi berikut termasuk kedudukan bahasa Indonesia sebagai bahasa nasional atau bahasa negara.",
      headers: ["Pernyataan Fungsi", "Kedudukan"],
      rows: [
        { cells: ["Menjadi bahasa pengantar di sekolah dan universitas"], fields: [{ options: ["Bahasa Nasional", "Bahasa Negara"], answer: "Bahasa Negara" }], ok: "✓ Tepat! Bahasa pengantar pendidikan = fungsi bahasa negara." },
        { cells: ["Menjadi lambang identitas bangsa Indonesia"], fields: [{ options: ["Bahasa Nasional", "Bahasa Negara"], answer: "Bahasa Nasional" }], ok: "✓ Tepat! Lambang identitas = fungsi bahasa nasional." },
        { cells: ["Dipakai dalam upacara dan dokumen resmi kenegaraan"], fields: [{ options: ["Bahasa Nasional", "Bahasa Negara"], answer: "Bahasa Negara" }], ok: "✓ Tepat! Bahasa resmi kenegaraan." },
        { cells: ["Menyatukan suku-suku dengan latar budaya dan bahasa berbeda"], fields: [{ options: ["Bahasa Nasional", "Bahasa Negara"], answer: "Bahasa Nasional" }], ok: "✓ Tepat! Alat pemersatu = fungsi bahasa nasional." },
        { cells: ["Alat pengembangan kebudayaan, ilmu pengetahuan, dan teknologi"], fields: [{ options: ["Bahasa Nasional", "Bahasa Negara"], answer: "Bahasa Negara" }], ok: "✓ Tepat! Pengembangan iptek = fungsi bahasa negara." },
        { cells: ["Penghubung antarbudaya dan antardaerah"], fields: [{ options: ["Bahasa Nasional", "Bahasa Negara"], answer: "Bahasa Nasional" }], ok: "✓ Tepat! Penghubung antardaerah = fungsi bahasa nasional.",
          hints: [{ field: 0, value: "Bahasa Negara", msg: "✗ Hati-hati! “Antardaerah/antarbudaya” = bahasa nasional. Bahasa negara memakai kata “tingkat nasional untuk pembangunan & pemerintahan”." }] },
        { cells: ["Alat perhubungan tingkat nasional untuk perencanaan pembangunan dan pemerintahan"], fields: [{ options: ["Bahasa Nasional", "Bahasa Negara"], answer: "Bahasa Negara" }], ok: "✓ Tepat! Kata kuncinya pembangunan & pemerintahan." },
        { cells: ["Lambang kebanggaan nasional"], fields: [{ options: ["Bahasa Nasional", "Bahasa Negara"], answer: "Bahasa Nasional" }], ok: "✓ Tepat!" }
      ]
    },
    {
      type: "exercise",
      label: "Studi Kasus 2 • Ragam Bahasa",
      title: "Analisis Situasi: Ragam Keformalan & Ragam Penutur",
      desc: "Pilih ragam keformalan yang paling tepat untuk setiap situasi.",
      headers: ["Situasi Komunikasi", "Ragam Keformalan"],
      rows: [
        { cells: ["Pembacaan teks proklamasi pada upacara 17 Agustus"], fields: [{ options: ["Beku", "Baku", "Usaha", "Santai", "Akrab"], answer: "Beku" }], ok: "✓ Tepat! Upacara kenegaraan yang khidmat = ragam beku." },
        { cells: ["Mahasiswa mempresentasikan makalah di kelas"], fields: [{ options: ["Beku", "Baku", "Usaha", "Santai", "Akrab"], answer: "Baku" }], ok: "✓ Tepat! Kebutuhan akademik = ragam baku." },
        { cells: ["Penjual dan pembeli grosir bernegosiasi kontrak pengiriman"], fields: [{ options: ["Beku", "Baku", "Usaha", "Santai", "Akrab"], answer: "Usaha" }], ok: "✓ Tepat! Bisnis/negosiasi = ragam usaha (konsultatif)." },
        { cells: ["Ngobrol dengan teman di kantin kampus: “Udah makan, belom?”"], fields: [{ options: ["Beku", "Baku", "Usaha", "Santai", "Akrab"], answer: "Santai" }], ok: "✓ Tepat! Ada bentuk alegro (dipendekkan) = ragam santai." },
        { cells: ["Suami istri saling paham hanya dengan kata “Itu, ya…” dan isyarat"], fields: [{ options: ["Beku", "Baku", "Usaha", "Santai", "Akrab"], answer: "Akrab" }], ok: "✓ Tepat! Pendek, tidak lengkap, sudah saling mengerti = ragam akrab." },
        { cells: ["Khotbah di masjid"], fields: [{ options: ["Beku", "Baku", "Usaha", "Santai", "Akrab"], answer: "Beku" }], ok: "✓ Tepat! Khotbah termasuk ragam beku.",
          hints: [{ field: 0, value: "Baku", msg: "✗ Jebakan! Khotbah termasuk contoh ragam BEKU (sangat khidmat), bukan sekadar baku." }] }
      ]
    },
    {
      type: "exercise",
      label: "Studi Kasus 3 • Garis Waktu",
      title: "Isi Tahun Peristiwa Penting",
      desc: "Ketik tahunnya (4 digit), lalu periksa.",
      headers: ["Peristiwa", "Tahun"],
      rows: [
        { cells: ["Ejaan van Ophuijsen disusun (Kitab Logat Melayu)"], fields: [{ answer: 1901, placeholder: "tahun" }], ok: "✓ 1901" },
        { cells: ["Commissie voor de Volkslectuur (cikal bakal Balai Pustaka) didirikan"], fields: [{ answer: 1908, placeholder: "tahun" }], ok: "✓ 1908" },
        { cells: ["Sumpah Pemuda"], fields: [{ answer: 1928, placeholder: "tahun" }], ok: "✓ 28 Oktober 1928" },
        { cells: ["Lahirnya angkatan Pujangga Baru"], fields: [{ answer: 1933, placeholder: "tahun" }], ok: "✓ 1933" },
        { cells: ["Kongres Bahasa Indonesia I di Solo"], fields: [{ answer: 1938, placeholder: "tahun" }], ok: "✓ 25–28 Juni 1938" },
        { cells: ["Ejaan Republik (Soewandi) mulai digunakan"], fields: [{ answer: 1947, placeholder: "tahun" }], ok: "✓ 19 Maret 1947" },
        { cells: ["Kongres Bahasa Indonesia II di Medan"], fields: [{ answer: 1954, placeholder: "tahun" }], ok: "✓ 1954" },
        { cells: ["EYD diresmikan Presiden Soeharto"], fields: [{ answer: 1972, placeholder: "tahun" }], ok: "✓ 16 Agustus 1972" },
        { cells: ["Seminar Politik Bahasa Nasional merumuskan kedudukan & fungsi bahasa"], fields: [{ answer: 1975, placeholder: "tahun" }], ok: "✓ 25–28 Februari 1975" }
      ]
    }
  ],
  flashcards: [
    { tag: "Sejarah", q: "Sebutkan 3 alasan bahasa Melayu dipilih menjadi cikal bakal bahasa Indonesia!", a: "1) Sudah menjadi bahasa pengantar (lingua franca) di nusantara.<br>2) Tidak memiliki sistem tingkatan bahasa.<br>3) Diterima oleh berbagai suku sebagai bahasa antarsuku." },
    { tag: "Prasasti", q: "Sebutkan 3 prasasti berbahasa Melayu kuno beserta tempat ditemukannya!", a: "• <strong>Talang Tuo</strong> (684 M) — Palembang, 1920<br>• <strong>Kota Kapur</strong> (686 M) — Bangka, 1892<br>• <strong>Karang Berahi</strong> (± 680 M) — Jambi, 1904" },
    { tag: "Dasar Hukum", q: "Apa dasar kedudukan bahasa Indonesia sebagai bahasa nasional dan sebagai bahasa negara?", a: "<strong>Bahasa nasional:</strong> Sumpah Pemuda, 28 Oktober 1928.<br><strong>Bahasa negara:</strong> UUD 1945 Bab XV Pasal 36 — “Bahasa negara ialah bahasa Indonesia”." },
    { tag: "Bahasa Nasional", q: "Sebutkan 4 fungsi bahasa Indonesia sebagai bahasa nasional!", a: "1) Lambang kebanggaan nasional<br>2) Lambang identitas nasional<br>3) Alat pemersatu masyarakat berbeda latar sosial, budaya, bahasa<br>4) Penghubung antarbudaya antardaerah" },
    { tag: "Bahasa Negara", q: "Sebutkan 4 fungsi bahasa Indonesia sebagai bahasa negara!", a: "1) Bahasa resmi kenegaraan<br>2) Bahasa pengantar pendidikan<br>3) Alat perhubungan tingkat nasional untuk pembangunan & pemerintahan<br>4) Alat pengembangan kebudayaan, iptek" },
    { tag: "Kongres", q: "Di mana dan kapan Kongres Bahasa Indonesia I dan II diselenggarakan?", a: "<strong>Kongres I:</strong> Solo, 25–28 Juni 1938.<br><strong>Kongres II:</strong> Medan, 28 Okt–2 Nov 1954.<br>Kongres III–X semuanya di Jakarta (terakhir X tahun 2013)." },
    { tag: "Fungsi Umum", q: "Sebutkan 4 fungsi bahasa menurut Alwi dkk. (2003)!", a: "1) Fungsi pemersatu<br>2) Fungsi pemberi kekhasan<br>3) Fungsi pembawa kewibawaan<br>4) Fungsi kerangka acuan" },
    { tag: "Istilah", q: "Apa yang dimaksud fungsi metalingual?", a: "Fungsi bahasa (dalam bidang pendidikan) yang digunakan untuk <strong>menjelaskan ilmu bahasa itu sendiri</strong>." },
    { tag: "Ragam Penutur", q: "Bedakan idiolek, dialek, kronolek, dan sosiolek!", a: "• <strong>Idiolek:</strong> ragam perorangan<br>• <strong>Dialek:</strong> ragam kelompok di wilayah tertentu<br>• <strong>Kronolek:</strong> ragam pada masa tertentu<br>• <strong>Sosiolek:</strong> ragam berdasarkan status/kelas sosial" },
    { tag: "Keformalan", q: "Sebutkan 5 ragam bahasa berdasarkan tingkat keformalan!", a: "1) Beku (frozen)<br>2) Baku (resmi/formal)<br>3) Usaha (konsultatif)<br>4) Santai (kasual)<br>5) Akrab (intim)" },
    { tag: "Jebakan UTS", q: "Apakah “bahasa ibu” berarti bahasa yang dipakai oleh ibu seorang anak?", a: "<strong>Bukan.</strong> Bahasa ibu (B1) adalah bahasa yang <strong>pertama kali dipelajari anak secara alamiah</strong> dari keluarga yang mengasuhnya." },
    { tag: "Perubahan Sosial", q: "Mengapa bahasa Indonesia berpotensi sebagai alat perubahan sosial?", a: "Karena 1) terbukti mempersatukan bangsa majemuk, 2) bersifat demokratis (tanpa tingkat tutur), 3) bersifat terbuka terhadap unsur asing, 4) sudah mulai mengglobal." }
  ],
  quiz: [
    { q: "Salah satu alasan bahasa Melayu mudah diterima suku-suku lain di Indonesia sehingga menjadi cikal bakal bahasa Indonesia adalah …",
      opts: ["Bahasa Melayu memiliki tingkatan bahasa yang lengkap", "Bahasa Melayu tidak memiliki sistem tingkatan bahasa", "Bahasa Melayu merupakan bahasa resmi pemerintah kolonial Belanda", "Bahasa Melayu paling banyak penuturnya di Pulau Jawa"], ans: 1,
      exp: "Bahasa Melayu tidak mengenal tingkatan bahasa (seperti undak-usuk), sehingga mudah diterima suku lain, selain karena sudah menjadi lingua franca nusantara.",
      optExp: ["Justru sebaliknya: Melayu tidak bertingkat.", "Benar, inilah salah satu alasan utama.", "Tidak disebut dalam materi; Belanda hanya mengizinkan Melayu sebagai bahasa pengajaran.", "Tidak tepat; alasan pemilihan bukan jumlah penutur di Jawa."] },
    { q: "Prasasti Kota Kapur ditulis pada tahun … dan ditemukan di …",
      opts: ["684 M, Palembang", "680 M, Jambi", "686 M, Bangka", "686 M, Palembang"], ans: 2,
      exp: "Kota Kapur ditulis 686 M dan ditemukan di Bangka (1892).",
      optExp: ["Itu prasasti Talang Tuo.", "Itu prasasti Karang Berahi.", "Benar.", "Tahunnya benar, tetapi tempatnya tertukar dengan Talang Tuo."] },
    { q: "Kedudukan bahasa Indonesia sebagai bahasa negara tercantum dalam …",
      opts: ["Ikrar Sumpah Pemuda 28 Oktober 1928", "UUD 1945 Bab XV Pasal 36", "Kongres Bahasa Indonesia I tahun 1938", "Keputusan Presiden Nomor 57 Tahun 1972"], ans: 1,
      exp: "UUD 1945 Bab XV Pasal 36 berbunyi “Bahasa negara ialah bahasa Indonesia”.",
      optExp: ["Sumpah Pemuda adalah dasar kedudukan sebagai bahasa nasional/persatuan.", "Benar.", "Kongres I tidak menetapkan bahasa negara.", "Keppres 57/1972 adalah dasar peresmian EYD."] },
    { q: "Perhatikan fungsi berikut: (1) lambang identitas nasional, (2) bahasa pengantar dalam pendidikan, (3) penghubung antarbudaya antardaerah, (4) bahasa resmi kenegaraan. Fungsi bahasa Indonesia sebagai bahasa NASIONAL ditunjukkan oleh nomor …",
      opts: ["(1) dan (2)", "(1) dan (3)", "(2) dan (4)", "(3) dan (4)"], ans: 1,
      exp: "Lambang identitas dan penghubung antardaerah adalah fungsi bahasa nasional; pengantar pendidikan dan bahasa resmi kenegaraan adalah fungsi bahasa negara.",
      optExp: ["(2) adalah fungsi bahasa negara.", "Benar.", "Keduanya fungsi bahasa negara.", "(4) adalah fungsi bahasa negara."] },
    { q: "Rumusan kedudukan dan fungsi bahasa Indonesia sebagai bahasa nasional dan bahasa negara dihasilkan dalam …",
      opts: ["Kongres Bahasa Indonesia II di Medan, 1954", "Seminar Politik Bahasa Nasional di Jakarta, 25–28 Februari 1975", "Sidang perutusan Indonesia–Melayu, 1959", "Kongres Pemuda II, 1928"], ans: 1,
      exp: "Seminar Politik Bahasa Nasional (Jakarta, 25–28 Februari 1975) merumuskan kedudukan dan fungsi tersebut.",
      optExp: ["Kongres II tidak disebut merumuskan hal ini.", "Benar.", "Sidang 1959 menghasilkan Ejaan Melindo (batal).", "Kongres Pemuda II menghasilkan Sumpah Pemuda, bukan rumusan fungsi."] },
    { q: "Dosen bahasa menjelaskan pengertian fonem, morfem, dan kalimat menggunakan bahasa Indonesia. Fungsi bahasa yang menjelaskan ilmu bahasa itu sendiri disebut fungsi …",
      opts: ["Kerangka acuan", "Metalingual", "Pemberi kekhasan", "Pemerintahan"], ans: 1,
      exp: "Bahasa yang digunakan untuk menjelaskan ilmu bahasa disebut fungsi metalingual (bagian dari fungsi pendidikan).",
      optExp: ["Kerangka acuan menjelaskan aturan/norma masyarakat.", "Benar.", "Pemberi kekhasan membedakan satu bahasa dari bahasa lain.", "Fungsi pemerintahan menjelaskan aturan ketatanegaraan."] },
    { q: "Ragam bahasa yang ciri khasnya ringkas, tegas, serta penuh singkatan dan akronim adalah ragam bahasa bidang …",
      opts: ["Hukum", "Agama", "Militer", "Sastra"], ans: 2,
      exp: "Bahasa militer dikenal ringkas dan tegas, sesuai kehidupan yang penuh disiplin dan instruksi, serta banyak singkatan dan akronim.",
      optExp: ["Bahasa hukum menekankan ketepatan tanda baca, konjungsi, dan diksi denotatif.", "Bahasa agama menekankan ketepatan pemahaman ajaran.", "Benar.", "Bahasa sastra menekankan kata yang estetis."] },
    { q: "Rina selalu memakai kata “sumpah, deh” dalam setiap pembicaraannya sehingga teman-temannya langsung mengenali gaya bicaranya. Variasi bahasa ini disebut …",
      opts: ["Dialek", "Sosiolek", "Kronolek", "Idiolek"], ans: 3,
      exp: "Variasi bahasa yang bersifat perorangan (pilihan kata, warna suara, gaya) disebut idiolek.",
      optExp: ["Dialek dimiliki sekelompok penutur di wilayah tertentu.", "Sosiolek berkaitan dengan status/kelas sosial.", "Kronolek berkaitan dengan masa tertentu.", "Benar."] },
    { q: "Ragam bahasa yang digunakan dalam bisnis/negosiasi, berorientasi pada hasil, dan disebut paling operasional karena berada di antara ragam formal dan santai adalah …",
      opts: ["Ragam beku", "Ragam usaha (konsultatif)", "Ragam baku", "Ragam akrab"], ans: 1,
      exp: "Ragam usaha (konsultatif) dipakai dalam pembicaraan yang berorientasi hasil; letaknya di antara ragam formal dan informal.",
      optExp: ["Ragam beku untuk situasi sangat khidmat.", "Benar.", "Ragam baku untuk situasi resmi akademik/rapat.", "Ragam akrab untuk hubungan sangat dekat."] },
    { q: "Ahmad lahir di Bandung dan sejak bayi diasuh dengan bahasa Sunda. Ia belajar bahasa Indonesia saat masuk SD, lalu belajar bahasa Inggris di SMP. Pernyataan yang tepat adalah …",
      opts: ["Bahasa Indonesia adalah bahasa ibu Ahmad", "Bahasa Sunda adalah B1, bahasa Indonesia adalah B2", "Bahasa Inggris adalah B2 karena merupakan bahasa asing", "Bahasa Sunda adalah bahasa asing bagi Ahmad"], ans: 1,
      exp: "Bahasa yang pertama dipelajari secara alamiah dari keluarga (Sunda) adalah B1/bahasa ibu; bahasa Indonesia yang dipelajari di sekolah adalah B2, dan bahasa Inggris B3.",
      optExp: ["Bahasa ibu Ahmad adalah bahasa Sunda.", "Benar.", "Urutannya: Sunda (B1), Indonesia (B2), Inggris (B3).", "Bahasa Sunda adalah bahasa daerah, bukan bahasa asing."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS BAHASA INDONESIA — PERTEMUAN 1*
📚 *Sejarah, Kedudukan, Fungsi & Ragam Bahasa Indonesia*

1️⃣ *Asal-usul:*
• Cikal bakal: *bahasa Melayu* (lingua franca, tidak bertingkat, diterima semua suku).
• Prasasti Melayu kuno: *Talang Tuo* (684, Palembang), *Kota Kapur* (686, Bangka), *Karang Berahi* (±680, Jambi).
• 1901 Ejaan van Ophuijsen • 1928 Sumpah Pemuda • 1938 Kongres I (Solo) • 1947 Ejaan Republik • 1954 Kongres II (Medan) • 1972 EYD.

2️⃣ *Kedudukan (Seminar Politik Bahasa 1975):*
• *Bahasa nasional* (Sumpah Pemuda 1928): lambang kebanggaan, lambang identitas, alat pemersatu, penghubung antardaerah/antarbudaya.
• *Bahasa negara* (UUD 1945 Bab XV Pasal 36): bahasa resmi kenegaraan, pengantar pendidikan, perhubungan nasional untuk pembangunan & pemerintahan, pengembangan budaya & iptek.
• Internasional: ±300 juta penutur (2025), 772 lembaga BIPA di 57 negara.

3️⃣ *Fungsi bahasa:*
• Umum (Alwi dkk.): pemersatu, pemberi kekhasan, pembawa kewibawaan, kerangka acuan.
• Khusus: sosial, pendidikan (*metalingual*), hukum, agama, pemerintahan, militer (ringkas, tegas, banyak akronim).

4️⃣ *Ragam bahasa:*
• Penyebab: geografis, media, situasi, pendidikan, pekerjaan.
• Penutur: idiolek, dialek, kronolek, sosiolek • Pemakaian: fungsiolek.
• Keformalan: beku, baku, usaha, santai, akrab • Media: tulis & lisan.
• Pemerolehan: bahasa ibu (B1), B2, bahasa asing.`
};
