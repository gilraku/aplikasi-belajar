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
  }
};
