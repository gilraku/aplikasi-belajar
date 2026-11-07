// ➕ Materi tambahan di luar modul, digabung oleh build.js ke akhir cheat sheet & flashcard tiap pertemuan.
// Kunci: "<id mata kuliah>/<id pertemuan>".
const PS = [{ value: "pisah", label: "Ditulis terpisah" }, { value: "sambung", label: "Ditulis serangkai" }];

module.exports = {
  "sif002-basis-data/p2": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Istilah Formal Model Relasional",
        title: "Kamus Istilah: Bahasa Teori vs Bahasa Sehari-hari",
        desc: "Soal UTS sering memakai istilah formal. Klik tombol untuk melihat padanannya pada tabel <code>buku</code>.",
        headers: ["Istilah formal", "Istilah sehari-hari", "Contoh pada tabel buku"],
        rows: [
          ["Relasi", "Tabel", "tabel <code>buku</code>"],
          ["Atribut", "Kolom / field", "<code>judul</code>, <code>stok</code>"],
          ["Tupel", "Baris / record", "satu buku, mis. BK002"],
          ["Domain", "Himpunan nilai yang boleh diisi", "<code>stok</code>: bilangan bulat ≥ 0"],
          ["Derajat (degree)", "Jumlah kolom", "5 kolom → derajat 5"],
          ["Kardinalitas", "Jumlah baris data", "5 baris data → kardinalitas 5"]
        ],
        modes: [
          { label: "Struktur", target: "row", row: 1, title: "Atribut = kolom", text: "Relasi tersusun dari atribut (kolom) dan tupel (baris)." },
          { label: "Menghitung", target: "row", row: 4, title: "Derajat vs kardinalitas", text: "<strong>Derajat</strong> menghitung <strong>kolom</strong>; <strong>kardinalitas</strong> menghitung <strong>baris data</strong> (baris judul tidak dihitung)." },
          { label: "Domain", target: "row", row: 3, title: "Domain", text: "Batas nilai sah sebuah atribut. Tipe data (INT, VARCHAR, dll.) adalah cara DBMS menjaga domain." }
        ]
      },
      {
        type: "cards",
        label: "➕ Tambahan • Jenis-Jenis Kunci",
        title: "Dari Superkey sampai Foreign Key",
        cols: 3,
        items: [
          { badge: "Superkey", title: "Kumpulan kolom yang unik", text: "Mis. <code>{id_buku, judul}</code>: unik, tetapi ada kolom yang sebenarnya tidak perlu." },
          { badge: "Candidate key", title: "Superkey paling ringkas", text: "Kolom yang layak jadi kunci primer, mis. <code>id_buku</code> atau <code>ISBN</code>." },
          { badge: "Primary key", tone: "indigo", title: "Kandidat yang dipilih", text: "Unik dan tidak boleh NULL." },
          { badge: "Alternate key", title: "Kandidat yang tidak dipilih", text: "Mis. <code>ISBN</code> bila <code>id_buku</code> yang dipilih." },
          { badge: "Foreign key", tone: "emerald", title: "Kunci tamu penghubung tabel", text: "Kolom yang merujuk kunci primer tabel lain, mis. <code>peminjaman.id_buku</code> → <code>buku.id_buku</code>." },
          { badge: "Composite key", title: "Kunci dari 2+ kolom", text: "Mis. <code>{nim, kode_mk}</code> pada tabel KRS." }
        ]
      },
      {
        type: "code",
        label: "➕ Tambahan • Wujud SQL-nya",
        title: "Tabel buku dalam Perintah SQL (DDL)",
        file: "buku.sql",
        code: "CREATE TABLE buku (\n  id_buku   CHAR(5)      PRIMARY KEY,\n  judul     VARCHAR(80)  NOT NULL,\n  pengarang VARCHAR(50)  NOT NULL,\n  tahun     YEAR,\n  stok      INT          DEFAULT 0\n);\n\nCREATE TABLE peminjaman (\n  id_pinjam INT PRIMARY KEY,\n  id_buku   CHAR(5),\n  FOREIGN KEY (id_buku) REFERENCES buku(id_buku)\n);",
        note: "Selain DDL (struktur) dan DML (isi/CRUD), ada <strong>DCL</strong> (Data Control Language) untuk hak akses: <code>GRANT</code> dan <code>REVOKE</code>, yang mewujudkan tujuan <em>security</em>."
      }
    ],
    flashcards: [
      { tag: "➕ Istilah", q: "Apa itu relasi, atribut, tupel, derajat, kardinalitas?", a: "Relasi = tabel • Atribut = kolom • Tupel = baris • Derajat = jumlah kolom • Kardinalitas = jumlah baris data." },
      { tag: "➕ Kunci", q: "Apa itu foreign key?", a: "Kolom yang merujuk ke kunci primer tabel lain untuk menghubungkan dua tabel, mis. <code>peminjaman.id_buku</code> → <code>buku.id_buku</code>." }
    ]
  },

  "bahasa-indonesia/p1": {
    cheatsheet: [
      {
        type: "cards",
        label: "➕ Tambahan • Fakta Terbaru & Dasar Hukum",
        title: "Yang Sering Muncul di Berita dan Soal Wawasan",
        cols: 3,
        items: [
          { badge: "UU No. 24/2009", tone: "indigo", title: "Bendera, Bahasa, dan Lambang Negara, serta Lagu Kebangsaan", text: "Mengatur kewajiban memakai bahasa Indonesia, mis. dalam dokumen resmi negara, pendidikan nasional, dan nama bangunan." },
          { badge: "20 Nov 2023", tone: "emerald", title: "Bahasa resmi Konferensi Umum UNESCO", text: "Bahasa Indonesia ditetapkan sebagai bahasa resmi ke-10 Sidang Umum UNESCO." },
          { badge: "Oktober", tone: "amber", title: "Bulan Bahasa dan Sastra", text: "Diperingati tiap Oktober untuk mengenang Sumpah Pemuda (28 Oktober 1928)." },
          { badge: "KBBI", title: "Kamus Besar Bahasa Indonesia", text: "Rujukan kata baku; versi daring di <code>kbbi.kemdikbud.go.id</code>." },
          { badge: "UKBI", title: "Uji Kemahiran Berbahasa Indonesia", text: "Semacam “TOEFL”-nya bahasa Indonesia." },
          { badge: "Badan Bahasa", title: "Lembaga pembina bahasa", text: "Badan Pengembangan dan Pembinaan Bahasa, yang menerbitkan EYD dan KBBI." }
        ]
      }
    ],
    flashcards: [
      { tag: "➕ Wawasan", q: "Kapan bahasa Indonesia menjadi bahasa resmi Konferensi Umum UNESCO?", a: "<strong>20 November 2023</strong>, sebagai bahasa resmi ke-10. Dasar hukum penggunaan bahasa di dalam negeri: <strong>UU No. 24 Tahun 2009</strong>." }
    ]
  },

  "bahasa-indonesia/p2": {
    cheatsheet: [
      {
        type: "choices",
        label: "➕ Tambahan • Jebakan Klasik Ejaan",
        title: "Di- Kata Depan vs Di- Awalan, dan Partikel Pun",
        style: "pills",
        options: [
          { label: "di / ke / dari", tone: "indigo", badge: "Kata depan → dipisah", title: "Menunjukkan tempat atau arah", text: "<strong>di</strong> rumah, <strong>ke</strong> kampus, <strong>dari</strong> Jakarta, <strong>di</strong> mana, <strong>ke</strong> luar negeri.", note: "Tes cepat: bisa ditanya “di mana?” → dipisah." },
          { label: "di- (awalan)", tone: "rose", badge: "Imbuhan → disambung", title: "Membentuk kata kerja pasif", text: "<strong>di</strong>makan, <strong>di</strong>kirim, <strong>di</strong>tulis.", note: "Tes cepat: bisa diubah ke aktif (dimakan → memakan) → disambung." },
          { label: "Partikel pun", tone: "emerald", badge: "Umumnya dipisah", title: "siapa pun, apa pun, sekali pun (= satu kali pun)", text: "Ditulis <strong>serangkai</strong> pada 12 kata yang sudah padu: adapun, andaipun, ataupun, bagaimanapun, biarpun, kalaupun, kendatipun, maupun, meskipun, sekalipun (= walaupun), sungguhpun, walaupun.", note: "Partikel <strong>-lah, -kah, -tah</strong> selalu disambung: bacalah, apakah." },
          { label: "Gabungan kata", tone: "amber", badge: "Tergantung imbuhan", title: "kerja sama, tanggung jawab", text: "Tanpa imbuhan: <strong>tanggung jawab</strong> (pisah). Dapat awalan saja: <strong>bertanggung jawab</strong> (pisah). Dapat awalan + akhiran sekaligus: <strong>pertanggungjawaban</strong> (serangkai).", note: "Gabungan yang sudah padu selalu serangkai: <em>matahari, saputangan, kacamata, olahraga</em>." }
        ]
      },
      {
        type: "exercise",
        label: "➕ Tambahan • Uji Cepat",
        title: "Pisah atau Serangkai?",
        headers: ["Bentuk", "Penulisan"],
        rows: [
          { cells: ["di + kampus (tempat)"], fields: [{ options: PS, answer: "pisah" }], ok: "✓ di kampus (kata depan)." },
          { cells: ["di + tulis (pasif)"], fields: [{ options: PS, answer: "sambung" }], ok: "✓ ditulis (awalan)." },
          { cells: ["apa + pun"], fields: [{ options: PS, answer: "pisah" }], ok: "✓ apa pun." },
          { cells: ["meski + pun"], fields: [{ options: PS, answer: "sambung" }], ok: "✓ meskipun (sudah padu)." },
          { cells: ["per + tanggung jawab + an"], fields: [{ options: PS, answer: "sambung" }], ok: "✓ pertanggungjawaban." },
          { cells: ["ber + kerja sama"], fields: [{ options: PS, answer: "pisah" }], ok: "✓ bekerja sama (hanya awalan)." }
        ]
      }
    ],
    flashcards: [
      { tag: "➕ Ejaan", q: "Kapan “di” dipisah dan kapan disambung?", a: "<strong>Dipisah</strong> bila kata depan penunjuk tempat (di rumah). <strong>Disambung</strong> bila awalan pembentuk kata kerja pasif (dimakan)." },
      { tag: "➕ Ejaan", q: "Bagaimana menulis gabungan kata “tanggung jawab” dengan imbuhan?", a: "bertanggung jawab (hanya awalan → pisah); pertanggungjawaban (awalan + akhiran → serangkai)." }
    ]
  },

  "bahasa-indonesia/p3": {
    cheatsheet: [
      {
        type: "reveal",
        label: "➕ Tambahan • Pemborosan & Kerancuan Kata",
        title: "Pleonasme dan Kontaminasi: Kesalahan Diksi Favorit Soal",
        desc: "<strong>Pleonasme</strong> = memakai kata berlebihan yang maknanya sudah terkandung. <strong>Kontaminasi</strong> = mencampur dua bentuk yang benar menjadi satu bentuk rancu. Klik untuk melihat perbaikannya.",
        items: [
          { prompt: "naik ke atas", answer: "naik", reason: "Naik pasti ke atas (pleonasme)." },
          { prompt: "para hadirin", answer: "hadirin / para hadir", reason: "<em>Hadirin</em> sudah jamak (pleonasme)." },
          { prompt: "sangat indah sekali", answer: "sangat indah / indah sekali", reason: "Pilih salah satu penguat (pleonasme)." },
          { prompt: "demi untuk masa depan", answer: "demi masa depan / untuk masa depan", reason: "<em>Demi</em> dan <em>untuk</em> bermakna sama (pleonasme)." },
          { prompt: "diperlebarkan", answer: "diperlebar / dilebarkan", reason: "Rancu dari dua bentuk yang benar (kontaminasi)." },
          { prompt: "berulang-ulang kali", answer: "berulang-ulang / berulang kali", reason: "Kontaminasi." }
        ]
      }
    ],
    flashcards: [
      { tag: "➕ Diksi", q: "Apa beda pleonasme dan kontaminasi?", a: "<strong>Pleonasme</strong>: kata berlebihan (naik ke atas, para hadirin).<br><strong>Kontaminasi</strong>: campuran dua bentuk menjadi rancu (diperlebarkan, berulang-ulang kali)." }
    ]
  },

  "aik/p7": {
    cheatsheet: [
      {
        type: "ayat",
        label: "➕ Tambahan • Dalil Penguat",
        title: "Tujuan Penciptaan & Dua Syarat Ibadah dalam Hadits",
        desc: "Dalil populer yang melengkapi slide. Gunakan sebagai penguat; tetap utamakan penjelasan dosen.",
        items: [
          { title: "Tujuan diciptakannya manusia", sumber: "QS. adz-Dzariyat [51]: 56", tone: "emerald",
            arab: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنْسَ إِلَّا لِيَعْبُدُونِ",
            arti: "Aku tidak menciptakan jin dan manusia melainkan agar mereka beribadah kepada-Ku.",
            note: "Menjawab QS. al-Mu’minun 115: manusia tidak diciptakan main-main, tetapi untuk beribadah." },
          { title: "Dalil syarat 1: ikhlas (niat)", sumber: "HR. al-Bukhari & Muslim", tone: "amber",
            arab: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
            arti: "Sesungguhnya setiap amal tergantung pada niatnya, dan setiap orang hanya mendapatkan apa yang ia niatkan." },
          { title: "Dalil syarat 2: sesuai tuntunan", sumber: "HR. Muslim", tone: "sky",
            arab: "مَنْ عَمِلَ عَمَلًا لَيْسَ عَلَيْهِ أَمْرُنَا فَهُوَ رَدٌّ",
            arti: "Barang siapa melakukan suatu amalan yang tidak ada perintah kami padanya, maka amalan itu tertolak." }
        ]
      },
      {
        type: "callout",
        label: "➕ Tambahan • Kaidah & Peta Tauhid",
        tone: "info",
        heading: "Dua catatan yang membantu memahami materi",
        html: "<ol><li><strong>Kaidah ibadah vs muamalah:</strong> hukum asal ibadah mahdhah adalah <strong>terlarang sampai ada dalil yang memerintahkan</strong>; hukum asal urusan dunia/muamalah adalah <strong>boleh sampai ada dalil yang melarang</strong>. Ini sejalan dengan prinsip “semua dilarang kecuali yang diperintahkan” di slide.</li><li><strong>Peta tauhid:</strong> slide membahas <strong>Rububiyah & Mulkiyah</strong> dan <strong>Asma’ wa Shifat</strong>. Pembagian yang umum juga mencakup <strong>Tauhid Uluhiyah</strong> (hanya Allah yang berhak disembah), yang sejalan dengan prinsip ibadah ke-1. Kemungkinan dibahas lebih lanjut di pertemuan berikutnya.</li></ol>"
      }
    ],
    flashcards: [
      { tag: "➕ Dalil", q: "Hadits apa yang menjadi dalil dua syarat diterimanya ibadah?", a: "Ikhlas: <em>innamal a‘mālu bin-niyyāt</em> (HR. al-Bukhari & Muslim).<br>Sesuai tuntunan: <em>man ‘amila ‘amalan laisa ‘alaihi amrunā fahuwa radd</em> (HR. Muslim)." },
      { tag: "➕ Ayat", q: "Ayat tentang tujuan penciptaan jin dan manusia?", a: "QS. adz-Dzariyat: 56, “agar mereka beribadah kepada-Ku”." }
    ]
  },
  // ===== Audit 2026-11-07: tabel rujukan yang sebelumnya hanya ada di Materi atau belum ada =====
  "pemrograman-web-dinamis/p6": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Event yang Sering Dipakai",
        title: "Event Apa untuk Kebutuhan Apa?",
        desc: "Semua dipasang dengan pola yang sama: <code>el.addEventListener(\"nama-event\", fungsi)</code>. Klik tombol untuk catatan pentingnya.",
        headers: ["Event", "Terjadi saat", "Dipasang di", "Contoh kebutuhan"],
        rows: [
          ["<code>click</code>", "elemen diklik", "button, link, elemen apa pun", "tombol Simpan, Hapus, ganti tema"],
          ["<code>input</code>", "isi kolom berubah, setiap ketukan", "input, textarea", "hitung karakter, cari saat mengetik"],
          ["<code>change</code>", "pilihan selesai diubah", "select, checkbox, radio", "pilih program studi"],
          ["<code>submit</code>", "form dikirim (Enter atau tombol submit)", "form", "validasi sebelum data diproses"],
          ["<code>keydown</code>", "tombol keyboard ditekan", "input, document", "Enter untuk menambah data"],
          ["<code>DOMContentLoaded</code>", "HTML selesai dibaca browser", "document", "menjalankan skrip setelah elemen ada"]
        ],
        modes: [
          { label: "submit", target: "row", row: 3, title: "Hentikan dulu kiriman form", text: "Tanpa <code>e.preventDefault()</code>, browser mengirim form dan memuat ulang halaman, sehingga data di tabel hilang. Pasang listener di <code>&lt;form&gt;</code>, bukan di tombolnya." },
          { label: "input vs change", target: "row", row: 1, title: "Setiap ketukan atau sekali di akhir", text: "<code>input</code> berjalan setiap kali isi berubah. Pada kolom teks, <code>change</code> baru berjalan setelah kolom ditinggalkan (blur)." },
          { label: "Objek event", target: "none", title: "Parameter e", text: "Fungsi listener menerima objek event: <code>e.target</code> = elemen yang memicu, <code>e.key</code> = tombol keyboard yang ditekan, <code>e.preventDefault()</code> = batalkan perilaku bawaan." }
        ]
      }
    ]
  },
  "algoritma-pemrograman/p2": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Ukuran dan Rentang",
        title: "Tipe Data: Ukuran, Rentang, dan Kapan Dipakai",
        desc: "Ukuran umum pada compiler modern (Dev-C++, GCC). Klik tombol untuk jebakan yang sering muncul.",
        headers: ["Tipe", "Ukuran", "Rentang / ketelitian", "Contoh isi"],
        rows: [
          ["<code>bool</code>", "1 byte", "<code>true</code> (1) atau <code>false</code> (0)", "status lulus"],
          ["<code>char</code>", "1 byte", "satu karakter; umumnya −128 s.d. 127", "<code>'A'</code>, nilai huruf"],
          ["<code>short</code>", "2 byte", "−32.768 s.d. 32.767", "jumlah kecil"],
          ["<code>int</code>", "4 byte", "sekitar ±2,1 miliar", "umur, jumlah, NIM pendek"],
          ["<code>long long</code>", "8 byte", "sekitar ±9,2 × 10¹⁸", "angka sangat besar"],
          ["<code>float</code>", "4 byte", "sekitar 7 digit ketelitian", "IPK, suhu"],
          ["<code>double</code>", "8 byte", "sekitar 15 digit ketelitian", "hitungan yang butuh teliti"],
          ["<code>string</code>", "berubah-ubah", "teks; butuh <code>#include &lt;string&gt;</code>", "nama, alamat"]
        ],
        modes: [
          { label: "long", target: "none", title: "Ukuran long bergantung compiler", text: "<code>long</code> bernilai 4 byte di Windows (Dev-C++) dan 8 byte di Linux 64-bit. Karena itu tabel ini memakai <code>long long</code> untuk 8 byte." },
          { label: "char vs string", target: "row", row: 1, title: "Kutip satu vs kutip dua", text: "<code>char</code> memakai kutip satu dan isinya tepat satu karakter: <code>'A'</code>. Teks memakai kutip dua dan tipe <code>string</code>: <code>\"Ani\"</code>." },
          { label: "Melebihi rentang", target: "row", row: 3, title: "Overflow", text: "Nilai yang melewati rentang tidak memunculkan error, tetapi hasilnya salah (berputar ke sisi negatif). NIM 10 digit seperti 2401234567 sudah melewati batas int; simpan sebagai <code>string</code> atau <code>long long</code>." }
        ]
      },
      {
        type: "table",
        label: "➕ Tambahan • Input dan Output",
        title: "cout, cin, dan getline",
        headers: ["Perintah", "Gunanya", "Catatan"],
        rows: [
          ["<code>cout &lt;&lt; x;</code>", "menampilkan ke layar", "boleh disambung: <code>cout &lt;&lt; \"Umur: \" &lt;&lt; umur;</code>"],
          ["<code>endl</code> atau <code>\"\\n\"</code>", "pindah baris", "keduanya sama-sama memindahkan kursor ke baris baru"],
          ["<code>cin &gt;&gt; x;</code>", "membaca satu kata atau angka", "berhenti di spasi: \"Gilang Swandaru\" hanya terbaca \"Gilang\""],
          ["<code>getline(cin, s);</code>", "membaca satu baris penuh", "untuk nama lengkap atau alamat yang mengandung spasi"],
          ["<code>cin.ignore();</code>", "membuang sisa Enter", "pasang di antara <code>cin &gt;&gt;</code> dan <code>getline</code>, kalau tidak getline langsung terlewati"]
        ],
        modes: [
          { label: "Jebakan getline", target: "row", row: 4, title: "Kenapa getline terlewati?", text: "Setelah <code>cin &gt;&gt; umur;</code>, tombol Enter masih tertinggal. getline membaca sisa itu sebagai baris kosong. <code>cin.ignore();</code> membuangnya lebih dulu." }
        ]
      }
    ]
  },
  "algoritma-pemrograman/p3": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Prioritas Operator",
        title: "Siapa Dikerjakan Lebih Dulu?",
        desc: "Dari yang paling kuat (atas) ke yang paling lemah (bawah). Versi ringkas dari tangga di tab Materi.",
        headers: ["Urutan", "Operator", "Contoh", "Dibaca sebagai"],
        rows: [
          ["1", "<code>( )</code>", "<code>(2 + 3) * 4</code>", "20"],
          ["2", "<code>!</code> <code>++</code> <code>--</code> tanda negatif, casting", "<code>!a &amp;&amp; b</code>", "<code>(!a) &amp;&amp; b</code>"],
          ["3", "<code>*</code> <code>/</code> <code>%</code>", "<code>20 / 4 * 2</code>", "<code>(20 / 4) * 2</code> = 10"],
          ["4", "<code>+</code> <code>-</code>", "<code>10 + 3 * 2</code>", "<code>10 + 6</code> = 16"],
          ["5", "<code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code>", "<code>a + 1 &gt; b</code>", "<code>(a + 1) &gt; b</code>"],
          ["6", "<code>==</code> <code>!=</code>", "<code>a &gt; b == true</code>", "<code>(a &gt; b) == true</code>"],
          ["7", "<code>&amp;&amp;</code>", "<code>a || b &amp;&amp; c</code>", "<code>a || (b &amp;&amp; c)</code>"],
          ["8", "<code>||</code>", "<code>x &lt; 0 || x &gt; 100</code>", "di luar rentang 0–100"],
          ["9", "<code>=</code> <code>+=</code> <code>-=</code> …", "<code>x = a + b * c;</code>", "hitung semua dulu, baru simpan ke x"]
        ],
        modes: [
          { label: "Setingkat", target: "row", row: 2, title: "Setingkat = dari kiri ke kanan", text: "Operator yang setingkat dikerjakan dari kiri. Pengecualiannya penugasan: <code>a = b = 0;</code> dikerjakan dari kanan." },
          { label: "Kalau ragu", target: "row", row: 0, title: "Pakai kurung", text: "Kurung tidak memperlambat program dan membuat maksudmu jelas bagi pembaca dan dosen." }
        ]
      },
      {
        type: "table",
        label: "➕ Tambahan • Operator Logika",
        title: "Tabel Kebenaran &&, ||, dan !",
        desc: "1 = true, 0 = false. Dipakai di setiap kondisi if dan loop di pertemuan berikutnya.",
        headers: ["A", "B", "A && B", "A || B", "!A"],
        rows: [
          ["1", "1", "1", "1", "0"],
          ["1", "0", "0", "1", "0"],
          ["0", "1", "0", "1", "1"],
          ["0", "0", "0", "0", "1"]
        ],
        modes: [
          { label: "&& (DAN)", target: "row", row: 0, title: "Benar hanya kalau semuanya benar", text: "Cukup satu bernilai 0, hasilnya 0. Contoh: <code>umur &gt;= 17 &amp;&amp; punyaKTP</code>." },
          { label: "|| (ATAU)", target: "row", row: 3, title: "Salah hanya kalau semuanya salah", text: "Cukup satu bernilai 1, hasilnya 1." },
          { label: "Hubungan pendek", target: "none", title: "Short-circuit", text: "Pada <code>A &amp;&amp; B</code>, kalau A sudah 0, B tidak dihitung lagi. Pada <code>A || B</code>, kalau A sudah 1, B tidak dihitung." }
        ]
      }
    ]
  },
  "algoritma-pemrograman/p4": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Pola Siap Pakai",
        title: "Pola if yang Paling Sering Muncul",
        headers: ["Kebutuhan", "Pola", "Ingat"],
        rows: [
          ["Cek di dalam rentang", "<code>if (n &gt;= 0 &amp;&amp; n &lt;= 100)</code>", "dua batas digabung dengan <code>&amp;&amp;</code>"],
          ["Cek di luar rentang (input salah)", "<code>if (n &lt; 0 || n &gt; 100)</code>", "dua batas digabung dengan <code>||</code>"],
          ["Kategori bertingkat", "<code>if (n &gt;= 85) … else if (n &gt;= 70) … else …</code>", "mulai dari batas tertinggi; yang pertama benar langsung dipakai"],
          ["Dua syarat bertahap", "<code>if (user == \"admin\") { if (pin == 1234) … }</code>", "nested if: syarat kedua baru dicek kalau syarat pertama lolos"],
          ["Memilih yang lebih besar", "<code>if (a &gt; b) maks = a; else maks = b;</code>", "bentuk singkatnya: <code>maks = (a &gt; b) ? a : b;</code>"]
        ],
        modes: [
          { label: "Urutan else-if", target: "row", row: 2, title: "Kenapa harus dari atas?", text: "Kalau ditulis <code>n &gt;= 70</code> lebih dulu, nilai 90 ikut berhenti di sana dan tidak pernah mendapat A." },
          { label: "= vs ==", target: "none", title: "Satu tanda sama dengan", text: "<code>if (n = 5)</code> mengisi n dengan 5 dan selalu dianggap benar. Untuk membandingkan, pakai <code>==</code>." }
        ]
      }
    ]
  },
  "algoritma-pemrograman/p5": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Pola Siap Pakai",
        title: "Pola switch yang Paling Sering Muncul",
        headers: ["Kebutuhan", "Pola", "Ingat"],
        rows: [
          ["Menu angka", "<code>switch (pilih) { case 1: …; break; case 2: …; break; default: … }</code>", "<code>default</code> menangkap pilihan yang tidak ada di menu"],
          ["Huruf besar dan kecil sama", "<code>case 'a': case 'A': …; break;</code>", "label case boleh ditumpuk"],
          ["Nilai huruf ke keterangan", "<code>switch (huruf) { case 'A': cout &lt;&lt; \"Sangat baik\"; break; … }</code>", "char memakai kutip satu"],
          ["Rentang angka", "pakai if-else, bukan switch", "case hanya menerima satu nilai tetap, bukan <code>&gt;= 80</code>"]
        ],
        modes: [
          { label: "Lupa break", target: "row", row: 0, title: "Fall-through", text: "Tanpa <code>break</code>, eksekusi terus turun ke case di bawahnya sampai bertemu break atau akhir switch." },
          { label: "Tipe yang boleh", target: "row", row: 3, title: "Hanya bilangan bulat dan char", text: "Ekspresi switch harus int, char, atau sejenisnya. <code>float</code>, <code>double</code>, dan <code>string</code> ditolak compiler." }
        ]
      }
    ]
  },
  "algoritma-pemrograman/p6": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Pola Siap Pakai",
        title: "Pola for yang Paling Sering Muncul",
        headers: ["Kebutuhan", "Pola", "Ingat"],
        rows: [
          ["Ulangi tepat n kali", "<code>for (int i = 1; i &lt;= n; i++)</code>", "mulai 1 pakai <code>&lt;=</code>; mulai 0 pakai <code>&lt;</code>"],
          ["Hitung mundur", "<code>for (int i = n; i &gt;= 1; i--)</code>", "kondisi dibalik dan pakai <code>i--</code>"],
          ["Menjumlahkan (akumulator)", "<code>int total = 0; for (…) total += x;</code>", "total diisi 0 <strong>sebelum</strong> loop, bukan di dalamnya"],
          ["Menghitung banyaknya", "<code>int jumlah = 0; for (…) if (syarat) jumlah++;</code>", "counter naik hanya saat syarat terpenuhi"],
          ["Rata-rata", "<code>rata = (float) total / n;</code>", "tanpa casting, int / int membuang angka di belakang koma"]
        ],
        modes: [
          { label: "Kurang atau lebih satu", target: "row", row: 0, title: "Hitung putarannya", text: "<code>i = 0; i &lt;= 5</code> berputar 6 kali, bukan 5. Cek dengan nilai awal dan nilai terakhir i." },
          { label: "Titik koma", target: "none", title: "for (…);", text: "Titik koma tepat setelah kurung for membuat badan loop kosong. Blok di bawahnya hanya jalan sekali setelah loop selesai." }
        ]
      }
    ]
  },
  "algoritma-pemrograman/p7": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Pola Siap Pakai",
        title: "Pola while dan do-while yang Paling Sering Muncul",
        headers: ["Kebutuhan", "Pola", "Ingat"],
        rows: [
          ["Ulangi sampai pengguna berhenti", "<code>do { tampilkan menu; cin &gt;&gt; pilih; … } while (pilih != 0);</code>", "do-while: menu pasti tampil minimal sekali"],
          ["Paksa input yang benar", "<code>do { cin &gt;&gt; n; } while (n &lt; 0 || n &gt; 100);</code>", "kondisi berisi syarat input yang <strong>salah</strong>"],
          ["Baca terus sampai nilai penanda", "<code>cin &gt;&gt; x; while (x != 0) { …; cin &gt;&gt; x; }</code>", "baca sekali sebelum loop dan sekali di akhir badan loop"],
          ["Jumlah putaran belum diketahui", "<code>while (saldo &lt; target) { saldo += setoran; bulan++; }</code>", "pastikan ada yang berubah di dalam loop"],
          ["Keluar di tengah jalan", "<code>while (true) { …; if (selesai) break; }</code>", "<code>break</code> keluar loop, <code>continue</code> lompat ke putaran berikutnya"]
        ],
        modes: [
          { label: "Loop tanpa akhir", target: "row", row: 3, title: "Kenapa programnya tidak berhenti?", text: "Kalau variabel di kondisi tidak pernah berubah di dalam badan loop, kondisi selalu benar dan loop berjalan selamanya." },
          { label: "Titik koma do-while", target: "row", row: 0, title: "while (…);", text: "do-while wajib diakhiri titik koma setelah kurung kondisi. Pada while biasa, titik koma di tempat itu justru membuat loop kosong." }
        ]
      }
    ]
  },
  "dasar-sistem-informasi/p4": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Kata Kunci di Soal",
        title: "Kata di Soal → Tipe SI",
        desc: "Soal kasus biasanya menyimpan petunjuk pada kata kerjanya atau pada siapa penggunanya. Klik tombol untuk pasangan yang paling sering tertukar.",
        headers: ["Kalau soal menyebut…", "Kemungkinan tipe", "Contoh kasus"],
        rows: [
          ["mencatat transaksi harian, volume besar, update database", "TPS", "kasir minimarket, penggajian"],
          ["mengendalikan mesin, sensor, proses produksi", "PCS", "pengatur suhu tungku pabrik"],
          ["kerja sama tim, komunikasi, berbagi dokumen", "ECS", "email kantor, rapat video"],
          ["meniru keahlian pakar, memberi saran atau diagnosis", "Expert System", "diagnosis penyakit ternak"],
          ["laporan rutin dengan format tetap untuk manajer", "MIS", "laporan stok bulanan"],
          ["what-if, simulasi, rekomendasi, masalah semi-terstruktur", "DSS", "menentukan harga produk baru"],
          ["ringkasan, grafik, KPI, dasbor untuk pimpinan puncak", "EIS", "dasbor rektor atau direksi"]
        ],
        modes: [
          { label: "MIS vs DSS", target: "row", row: 4, title: "Laporan tetap vs bantuan memutuskan", text: "MIS menyajikan laporan yang formatnya sudah ditentukan. DSS dipakai saat keputusannya belum punya rumus pasti dan butuh analisis atau simulasi." },
          { label: "DSS vs EIS", target: "row", row: 6, title: "Analis vs pimpinan puncak", text: "EIS menyajikan ringkasan untuk eksekutif, sering memadukan data internal dan eksternal. DSS lebih dalam analisisnya dan dipakai manajer atau analis." },
          { label: "TPS dulu", target: "row", row: 0, title: "TPS sumber datanya", text: "Data dari TPS diolah MIS menjadi laporan, dianalisis DSS, lalu diringkas EIS." }
        ]
      }
    ]
  },
  "dasar-sistem-informasi/p8": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Kamus Singkatan",
        title: "Semua Singkatan P1–P7",
        desc: "Diurutkan menurut pertemuan. Kepanjangan sering dijadikan opsi pengecoh, jadi hafalkan bersama artinya.",
        headers: ["Singkatan", "Kepanjangan", "Arti singkat", "Pertemuan"],
        rows: [
          ["DIKW", "Data, Information, Knowledge, Wisdom", "tingkatan dari fakta mentah sampai kebijaksanaan", "P2"],
          ["SI / IS", "Sistem Informasi / Information System", "sistem yang mengolah data menjadi informasi", "P3"],
          ["OSS", "Operation Support Systems", "kelompok SI pendukung operasional", "P4"],
          ["TPS", "Transaction Processing System", "mencatat dan memproses transaksi", "P4"],
          ["PCS", "Process Control System", "mengendalikan proses fisik atau produksi", "P4"],
          ["ECS", "Enterprise Collaboration System", "mendukung komunikasi dan kerja tim", "P4"],
          ["ES", "Expert System", "sistem pakar, meniru keahlian ahli", "P4"],
          ["MSS", "Management Support Systems", "kelompok SI pendukung manajemen", "P4"],
          ["MIS", "Management Information System", "laporan rutin berformat tetap", "P4"],
          ["DSS", "Decision Support System", "membantu keputusan semi-terstruktur", "P4"],
          ["EIS", "Executive Information System", "ringkasan dan dasbor untuk eksekutif", "P4"],
          ["CBIS", "Computer Based Information System", "SI berbasis komputer, lima elemennya", "P5"],
          ["TI / IT", "Teknologi Informasi / Information Technology", "perangkat keras, lunak, dan jaringan untuk mengolah informasi", "P6"],
          ["ENIAC", "Electronic Numerical Integrator and Computer", "komputer generasi pertama (tabung hampa)", "P6"],
          ["IC", "Integrated Circuit", "ciri komputer generasi ketiga", "P6"],
          ["CPU", "Central Processing Unit", "pemroses utama komputer", "P6"],
          ["RAM / ROM", "Random Access Memory / Read Only Memory", "memori kerja sementara / memori baca permanen", "P6"],
          ["DBMS", "Database Management System", "perangkat lunak pengelola basis data", "P7"],
          ["DBA", "Database Administrator", "orang yang mengelola basis data", "P7"]
        ],
        modes: [
          { label: "Dua kelompok", target: "row", row: 2, title: "OSS dan MSS", text: "Tipe SI di P4 dibagi dua kelompok: OSS (TPS, PCS, ECS, dan menurut modul juga ES) dan MSS (MIS, DSS, EIS)." },
          { label: "RAM vs ROM", target: "row", row: 16, title: "Hilang saat mati atau tidak", text: "Isi RAM hilang ketika komputer dimatikan. Isi ROM tetap tersimpan." }
        ]
      }
    ]
  },
  "aik/p5": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Dalil per Konsep",
        title: "Satu Konsep, Satu Dalil",
        desc: "Dalil yang dipakai di Materi P5, diringkas per konsep.",
        headers: ["Konsep", "Dalil", "Inti yang diambil"],
        rows: [
          ["Rububiyah, mulkiyah, uluhiyah sekaligus", "QS. an-Nas [114]: 1–3", "Rabb manusia, Raja manusia, Ilah (sesembahan) manusia"],
          ["Uluhiyah", "QS. al-Fatihah [1]: 5", "hanya kepada-Mu kami menyembah dan memohon pertolongan"],
          ["Keesaan Allah", "QS. al-Ikhlas [112]: 1", "Allah itu Ahad (Maha Esa)"],
          ["At-Talazum (dari pencipta ke disembah)", "QS. al-Baqarah [2]: 21–22", "sembahlah Rabb yang menciptakan kalian"],
          ["Rububiyah saja belum cukup", "QS. Luqman [31]: 25", "musyrikin mengakui Allah pencipta, tetapi tetap menyembah selain-Nya"],
          ["Semua rasul membawa tauhid", "QS. an-Nahl [16]: 36", "sembahlah Allah dan jauhi thaghut"],
          ["Bahaya syirik", "QS. an-Nisa’ [4]: 48", "syirik tidak diampuni bila dibawa mati tanpa tobat"],
          ["Tanpa tauhid amal terhapus", "QS. al-Kahfi [18]: 105", "amal orang yang mengingkari menjadi sia-sia"]
        ],
        modes: [
          { label: "an-Nas", target: "row", row: 0, title: "Tiga tauhid dalam tiga ayat", text: "Ayat 1 = Rububiyah (Rabb), ayat 2 = Mulkiyah (Malik), ayat 3 = Uluhiyah (Ilah)." },
          { label: "Pengecoh", target: "row", row: 4, title: "Mengakui pencipta ≠ bertauhid", text: "Soal sering menyebut orang yang percaya Allah pencipta. Itu baru rububiyah; tauhid uluhiyah menuntut ibadah hanya kepada Allah." }
        ]
      }
    ]
  },
  "aik/p6": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Dalil dan Istilah",
        title: "Syahadat dalam Satu Tabel",
        headers: ["Istilah atau konsep", "Arti", "Dalil atau contoh"],
        rows: [
          ["Nafyu", "meniadakan: <em>lā ilāha</em> (tidak ada sesembahan yang berhak)", "bagian pertama syahadat tauhid"],
          ["Itsbat", "menetapkan: <em>illallāh</em> (kecuali Allah)", "bagian kedua syahadat tauhid"],
          ["‘Abduhu", "Nabi Muhammad hamba Allah, tidak boleh dikultuskan", "syahadat rasul, bagian pertama"],
          ["Rasuluhu", "Nabi Muhammad utusan Allah, wajib ditaati dan diteladani", "syahadat rasul, bagian kedua"],
          ["Uswah hasanah", "teladan yang baik", "QS. al-Ahzab [33]: 21"],
          ["Al-‘urwatul wutsqā", "tali yang kokoh: ingkar kepada thaghut dan beriman kepada Allah", "QS. al-Baqarah [2]: 256"],
          ["7 syarat lā ilāha illallāh", "‘ilmu, yaqin, qabul, inqiyad, shidq, ikhlas, mahabbah", "lihat tabel 7 syarat di Materi"]
        ],
        modes: [
          { label: "Sikap tengah", target: "row", row: 2, title: "‘Abduhu wa rasuluhu", text: "Dua kata ini menjaga sikap tengah kepada Nabi: tidak dikultuskan (karena hamba) dan tidak diremehkan (karena utusan)." },
          { label: "Urutan", target: "row", row: 0, title: "Nafyu dulu, baru itsbat", text: "Menolak semua sesembahan selain Allah lebih dulu, lalu menetapkan hanya Allah." }
        ]
      }
    ]
  },
  "aik/p8": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Glosarium P1–P7",
        title: "Istilah AIK dari P1 sampai P7",
        desc: "Gabungan Glosarium Kilat P4 ditambah istilah P5–P7.",
        headers: ["Istilah", "Arti singkat", "Pertemuan"],
        rows: [
          ["Khalifah", "wakil atau pengelola bumi yang diberi amanah", "P1, P7"],
          ["Ulul albab", "orang berakal yang berpikir dan berzikir", "P1"],
          ["Bayani / Burhani / Irfani", "pendekatan teks / akal-sains / hati", "P1–P2"],
          ["Rahmatan lil ‘alamin", "rahmat bagi seluruh alam", "P2"],
          ["Wasathiyah", "moderat, sikap tengah", "P2"],
          ["Tasamuh", "toleransi", "P2"],
          ["As-Sunnah al-Maqbulah", "sunnah yang dapat diterima sebagai hujah", "P2"],
          ["‘Aqada / rabatha", "mengikat (asal kata aqidah)", "P3"],
          ["Sam’iyyat", "perkara yang hanya diketahui lewat wahyu", "P3"],
          ["Ayat kauniyah / qauliyah", "tanda di alam / firman dalam al-Qur’an", "P3, P7"],
          ["Rububiyah", "Allah satu-satunya Pencipta, Pemelihara, Pengatur", "P5"],
          ["Mulkiyah", "Allah satu-satunya Pemilik dan Raja yang berhak membuat aturan", "P5"],
          ["Uluhiyah", "hanya Allah yang berhak disembah", "P5"],
          ["Asma’ wa sifat", "mengimani nama dan sifat Allah", "P5"],
          ["At-Talazum / at-Tadhamun", "dalil arah naik (kemestian) / arah turun (cakupan)", "P5"],
          ["Syirik", "menyekutukan Allah; ada syirik besar dan syirik kecil", "P5"],
          ["Nafyu / itsbat", "meniadakan sesembahan lain / menetapkan hanya Allah", "P6"],
          ["‘Abduhu wa rasuluhu", "Nabi hamba sekaligus utusan Allah", "P6"],
          ["Ibadah mahdhah", "ibadah yang tata caranya ditetapkan rinci (shalat, puasa, zakat, haji)", "P7"],
          ["Ibadah ghairu mahdhah", "ibadah yang aturannya umum (bekerja, belajar, menolong)", "P7"],
          ["Bid’ah", "mengada-adakan tata cara baru dalam ibadah mahdhah", "P7"],
          ["Ma’rifatullah", "mengenal Allah melalui ayat kauniyah dan qauliyah", "P7"]
        ],
        modes: [
          { label: "Mahdhah vs ghairu", target: "row", row: 18, title: "Pembeda utamanya", text: "Pada ibadah mahdhah, tata cara harus mengikuti tuntunan; menambah cara baru termasuk bid’ah. Pada ghairu mahdhah, caranya bebas selama tidak dilarang dan niatnya karena Allah." },
          { label: "Empat tauhid", target: "row", row: 10, title: "Versi slide AIK", text: "Slide AIK membagi tauhid menjadi empat: Rububiyah, Mulkiyah, Uluhiyah, dan Asma’ wa Sifat." }
        ]
      }
    ]
  },
  "sif002-basis-data/p8": {
    cheatsheet: [
      {
        type: "table",
        label: "➕ Tambahan • Kamus Perintah SQL",
        title: "Semua Perintah SQL P1–P7",
        desc: "Perintah yang muncul di P1, P4, P6, dan P7, dikelompokkan menurut jenisnya.",
        headers: ["Jenis", "Perintah", "Bentuk umum", "Pertemuan"],
        rows: [
          ["DDL", "CREATE DATABASE", "<code>CREATE DATABASE perpustakaan;</code>", "P6"],
          ["DDL", "USE", "<code>USE perpustakaan;</code>", "P6–P7"],
          ["DDL", "CREATE TABLE", "<code>CREATE TABLE buku (id_buku CHAR(5) PRIMARY KEY, judul VARCHAR(80) NOT NULL);</code>", "P7"],
          ["DDL", "DROP", "<code>DROP TABLE buku;</code> / <code>DROP DATABASE perpustakaan;</code>", "P4, P7"],
          ["DDL", "TRUNCATE", "<code>TRUNCATE TABLE buku;</code>", "P4"],
          ["DML", "SELECT", "<code>SELECT kolom FROM tabel WHERE syarat ORDER BY kolom LIMIT n;</code>", "P1, P4"],
          ["DML", "INSERT", "<code>INSERT INTO tabel (kolom1, kolom2) VALUES (nilai1, nilai2);</code>", "P4"],
          ["DML", "UPDATE", "<code>UPDATE tabel SET kolom = nilai WHERE syarat;</code>", "P4"],
          ["DML", "DELETE", "<code>DELETE FROM tabel WHERE syarat;</code>", "P4"],
          ["TCL", "COMMIT / ROLLBACK", "<code>COMMIT;</code> menyimpan, <code>ROLLBACK;</code> membatalkan", "P4"],
          ["Bantu", "SHOW / DESCRIBE", "<code>SHOW DATABASES;</code> <code>SHOW TABLES;</code> <code>DESCRIBE buku;</code>", "P2, P6–P7"]
        ],
        modes: [
          { label: "Tanpa WHERE", target: "row", row: 7, title: "UPDATE dan DELETE tanpa WHERE", text: "Tanpa WHERE, perintah berlaku untuk <strong>semua baris</strong>. Biasakan menulis WHERE lebih dulu." },
          { label: "DELETE vs TRUNCATE vs DROP", target: "row", row: 4, title: "Seberapa banyak yang hilang?", text: "DELETE menghapus baris yang dipilih, TRUNCATE mengosongkan semua baris tetapi tabelnya tetap ada, DROP menghapus tabel beserta strukturnya." },
          { label: "DDL vs DML", target: "none", title: "Struktur vs isi", text: "DDL mengatur <strong>struktur</strong> (database, tabel). DML mengatur <strong>isi</strong> (baris data)." }
        ]
      }
    ]
  }
};
