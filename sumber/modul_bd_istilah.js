// Basis Data — Kata Kunci dan perumpamaan ("Ibarat") dari modul ajar P1–P7, disalin dari modul.
// Soal kuis LMS dan UTS sering menanyakan istilah dan perumpamaan ini, jadi isinya dibuat persis seperti modul.
module.exports = {
  kataKunci: {
  "p1": [
    [
      "Data",
      "Catatan mentah tentang suatu hal: angka, huruf, tanggal."
    ],
    [
      "Informasi",
      "Data yang sudah diberi konteks sehingga berguna untuk mengambil keputusan."
    ],
    [
      "Basis data",
      "Kumpulan data yang saling berhubungan dan disimpan secara teratur."
    ],
    [
      "Tabel",
      "Bentuk penyimpanan data berupa baris dan kolom."
    ],
    [
      "Baris (record)",
      "Satu kesatuan data yang lengkap, misalnya data satu buku."
    ],
    [
      "Kolom (field)",
      "Satu jenis keterangan pada tabel, misalnya kolom judul."
    ],
    [
      "DBMS",
      "Perangkat lunak yang menyimpan dan melayani permintaan terhadap basis data."
    ],
    [
      "SQL",
      "Bahasa perintah untuk berbicara dengan DBMS."
    ],
    [
      "MAMP",
      "Paket perangkat lunak yang memasang server web dan MySQL sekaligus."
    ],
    [
      "phpMyAdmin",
      "Halaman web untuk mengelola basis data MySQL tanpa mengetik perintah."
    ]
  ],
  "p2": [
    [
      "Model relasional",
      "Cara menyimpan data dalam bentuk tabel-tabel yang saling berhubungan."
    ],
    [
      "Baris judul",
      "Baris paling atas sebuah tabel, berisi nama kolom, bukan data."
    ],
    [
      "Sel",
      "Pertemuan satu baris dengan satu kolom. Isinya satu nilai saja."
    ],
    [
      "Nilai tunggal",
      "Aturan bahwa satu sel hanya boleh berisi satu keterangan."
    ],
    [
      "Tipe data",
      "Jenis isian yang diperbolehkan pada sebuah kolom, misalnya teks atau bilangan."
    ],
    [
      "Kunci primer",
      "Kolom penanda unik. Nilainya tidak boleh sama antar baris dan tidak boleh kosong."
    ],
    [
      "Kunci kandidat",
      "Kolom lain yang sebenarnya juga layak menjadi kunci primer."
    ],
    [
      "NULL",
      "Tanda bahwa sebuah sel belum diisi. Berbeda dengan angka nol dan berbeda dengan spasi."
    ],
    [
      "Constraint",
      "Aturan yang dipasang pada kolom, misalnya larangan dikosongkan."
    ]
  ],
  "p3": [
    [
      "Perancangan",
      "Kegiatan menyusun rencana basis data sebelum tabelnya dibuat."
    ],
    [
      "ERD",
      "Gambar rancangan basis data yang memperlihatkan entitas dan hubungannya."
    ],
    [
      "Entitas",
      "Benda, orang, atau kejadian yang datanya perlu disimpan."
    ],
    [
      "Atribut",
      "Keterangan yang melekat pada sebuah entitas."
    ],
    [
      "Atribut kunci",
      "Atribut yang dipilih menjadi penanda unik, ditulis dengan garis bawah."
    ],
    [
      "Relasi",
      "Hubungan antara dua entitas, biasanya berupa kata kerja."
    ],
    [
      "Kardinalitas",
      "Banyaknya baris yang boleh terhubung pada sebuah relasi."
    ],
    [
      "Notasi Chen",
      "Aturan penggambaran ERD yang memakai persegi panjang, elips, dan belah ketupat."
    ]
  ],
  "p4": [
    [
      "Transformasi",
      "Kegiatan mengubah gambar ERD menjadi daftar tabel."
    ],
    [
      "Skema relasi",
      "Cara menuliskan sebuah tabel dalam satu baris teks, lengkap dengan nama kolomnya."
    ],
    [
      "Kunci tamu",
      "Kolom yang isinya menunjuk kunci primer tabel lain."
    ],
    [
      "Tabel penghubung",
      "Tabel baru yang lahir dari relasi banyak ke banyak."
    ],
    [
      "Integritas rujukan",
      "Aturan bahwa isi kunci tamu harus benar-benar ada di tabel yang dirujuk."
    ],
    [
      "MUL",
      "Tanda pada phpMyAdmin yang menyatakan sebuah kolom memiliki indeks dan dapat berulang."
    ]
  ],
  "p5": [
    [
      "Normalisasi",
      "Kegiatan memecah tabel yang berantakan menjadi beberapa tabel yang rapi."
    ],
    [
      "Anomali",
      "Kejanggalan yang muncul saat data ditambah, diubah, atau dihapus."
    ],
    [
      "Redundansi",
      "Keterangan yang sama ditulis berulang-ulang di banyak baris."
    ],
    [
      "Ketergantungan fungsional",
      "Keadaan ketika nilai sebuah kolom sudah ditentukan oleh kolom lain."
    ],
    [
      "1NF",
      "Bentuk normal pertama: setiap sel hanya berisi satu nilai."
    ],
    [
      "2NF",
      "Bentuk normal kedua: setiap kolom bergantung pada seluruh kunci, bukan sebagiannya."
    ],
    [
      "3NF",
      "Bentuk normal ketiga: tidak ada kolom yang bergantung pada kolom bukan kunci."
    ],
    [
      "Kunci gabungan",
      "Kunci primer yang tersusun dari dua kolom atau lebih."
    ]
  ],
  "p6": [
    [
      "MAMP",
      "Paket pemasangan yang berisi Apache, MySQL, PHP, dan phpMyAdmin sekaligus."
    ],
    [
      "Server lokal",
      "Server yang berjalan di komputer sendiri, bukan di internet."
    ],
    [
      "Apache",
      "Perangkat lunak server web yang melayani alamat localhost."
    ],
    [
      "localhost",
      "Nama alamat untuk komputer sendiri, setara dengan alamat 127.0.0.1."
    ],
    [
      "Porta",
      "Nomor pintu masuk layanan pada sebuah server, misalnya 3306 untuk MySQL."
    ],
    [
      "phpMyAdmin",
      "Halaman web untuk mengelola basis data MySQL tanpa mengetik perintah."
    ],
    [
      "Penyortiran",
      "Aturan pengurutan dan pembandingan huruf, misalnya utf8mb4_general_ci."
    ],
    [
      "Tab SQL",
      "Bagian phpMyAdmin tempat perintah SQL diketik dan dijalankan."
    ]
  ],
  "p7": [
    [
      "DDL",
      "Kelompok perintah SQL untuk membuat dan mengubah rangka basis data."
    ],
    [
      "CREATE",
      "Perintah untuk membuat basis data atau tabel baru."
    ],
    [
      "DROP",
      "Perintah untuk menghapus basis data atau tabel beserta seluruh isinya."
    ],
    [
      "USE",
      "Perintah untuk memilih basis data yang sedang dipakai."
    ],
    [
      "NOT NULL",
      "Aturan yang melarang sebuah kolom dikosongkan."
    ],
    [
      "PRIMARY KEY",
      "Penetapan kolom sebagai kunci primer."
    ],
    [
      "DESCRIBE",
      "Perintah untuk menampilkan susunan kolom sebuah tabel."
    ],
    [
      "Tabel kosong",
      "Tabel yang rangkanya sudah ada tetapi belum berisi satu baris pun."
    ]
  ]
},
  ibarat: {
  "p1": [
    [
      "Data itu",
      "Data itu ibarat beras, informasi ibarat nasi. Beras sudah berwujud dan sudah ada nilainya, tetapi belum bisa langsung dimakan. Setelah dimasak barulah berguna. Angka 2021 adalah berasnya; kalimat &quot;buku Sistem Basis Data terbit tahun 2021&quot; adalah nasinya."
    ],
    [
      "Basis data",
      "Basis data ibarat lemari arsip di perpustakaan. Lemarinya satu, tetapi lacinya beberapa, dan setiap laci hanya menyimpan satu jenis kartu. Semua kartu di dalam satu laci bentuknya sama dan urutannya jelas, sehingga kartu yang dicari dapat ditemukan dalam hitungan detik. Bandingkan dengan tumpukan kertas di atas meja: isinya mungkin sama lengkapnya, tetapi tanpa laci, tanpa urutan, dan ukuran kertasnya berbeda-beda, mencari satu catatan bisa memakan waktu setengah jam."
    ],
    [
      "Lembar kerja",
      "Lembar kerja ibarat daftar hadir yang difotokopi lalu dibagikan ke banyak orang. Setiap orang mencoret di lembarnya masing-masing. Ketika semua lembar dikumpulkan kembali, tidak ada lagi yang bisa memastikan coretan mana yang paling baru. Lemari arsip berpetugas tidak mengalami masalah itu, sebab kartu aslinya hanya satu dan hanya petugas yang berhak mengubahnya."
    ],
    [
      "DBMS",
      "DBMS ibarat petugas perpustakaan yang memegang satu-satunya kunci lemari arsip. Pengunjung tidak menyentuh laci sama sekali; cukup menyebutkan buku yang dicari, lalu petugas yang mengambilkan kartunya. Petugas itu pula yang menolak kartu yang diisi asal-asalan, yang mengatur giliran ketika dua orang meminta kartu yang sama, dan yang menyalin isi lemari sebagai cadangan setiap malam."
    ],
    [
      "Tingkatan ini",
      "Tingkatan ini ibarat susunan sebuah buku. Huruf menyusun kata, kata menyusun kalimat, kalimat menyusun halaman, dan kumpulan halaman menjadi satu buku. Tidak ada satu pun yang berubah jenisnya di sepanjang jalan; yang berubah hanya cakupannya, dari yang paling kecil ke yang paling besar."
    ],
    [
      "SQL",
      "SQL ibarat formulir permintaan buku di perpustakaan lama. Formulirnya sudah baku isiannya: buku apa yang diminta, dari laci mana, dan dengan syarat apa. Petugas tidak perlu diajak berdebat, cukup dibacakan formulirnya. Perintah SELECT * FROM buku; adalah formulir yang berbunyi: ambilkan semua kartu dari laci buku."
    ]
  ],
  "p2": [
    [
      "Model relasional",
      "Model relasional ibarat aturan bahwa semua kartu di dalam lemari arsip harus berukuran sama dan punya kotak isian yang sama. Kartu buku boleh berbeda isinya, tetapi bentuk kartunya tidak boleh berbeda. Karena bentuknya seragam, petugas bisa menyusun kartu berurutan, dan bisa mencari kartu tertentu hanya dengan melihat satu kotak isian saja."
    ],
    [
      "Baris judul",
      "Baris judul ibarat tulisan tercetak pada kartu katalog kosong: Judul, Pengarang, Tahun, Stok. Tulisan itu sudah ada sebelum kartunya diisi, dan tetap ada walaupun kartunya masih kosong. Yang ditulis tangan oleh petugas barulah datanya."
    ],
    [
      "Kelima aturan itu",
      "Kelima aturan itu ibarat tata tertib menulis kartu katalog. Satu kartu untuk satu buku, satu kotak isian untuk satu keterangan, dan tidak boleh ada dua kartu yang isinya persis sama. Sedangkan urutan kartu di dalam laci boleh diubah kapan saja, sebab isi kartunya tetap sama."
    ],
    [
      "Tipe data",
      "Tipe data ibarat kotak isian pada formulir pendaftaran. Kotak tanggal lahir dibuat berbentuk tiga petak kecil untuk tanggal, bulan, dan tahun, sehingga tidak mungkin diisi nama. Kotak nama dibuat panjang satu baris, sehingga tidak mungkin diisi satu paragraf. Bentuk kotaknya sendiri sudah menolak isian yang salah."
    ],
    [
      "Kunci primer",
      "Kunci primer ibarat nomor induk yang ditulis di sudut kanan atas setiap kartu katalog. Nomor itu tidak punya arti apa-apa selain membedakan satu kartu dari kartu lain. Justru karena tidak punya arti, nomor itu aman: judul buku boleh berubah, pengarangnya boleh dikoreksi, tetapi nomor induknya tetap."
    ],
    [
      "NULL",
      "NULL ibarat kotak isian pada kartu katalog yang masih putih bersih karena petugas belum sempat mengisinya. Berbeda dengan kotak yang sudah ditulisi angka nol: yang satu berarti belum diketahui, yang lain berarti sudah diketahui dan hasilnya memang nol."
    ]
  ],
  "p3": [
    [
      "ERD",
      "ERD ibarat denah ruang arsip yang digambar sebelum lemarinya dipesan. Di atas kertas, memindahkan letak lemari cukup dengan penghapus. Kalau lemarinya sudah terlanjur dibuat dan kartunya sudah penuh, memindahkannya berarti membongkar seluruh ruangan."
    ],
    [
      "Ketiga lambang itu",
      "Ketiga lambang itu ibarat tiga pertanyaan yang diajukan kepada petugas perpustakaan. Laci apa saja yang ada di lemari? Jawabannya entitas. Kotak isian apa saja yang tercetak pada kartunya? Jawabannya atribut. Kartu di laci ini berhubungan dengan kartu di laci mana? Jawabannya relasi."
    ],
    [
      "Kardinalitas",
      "Kardinalitas ibarat aturan peminjaman yang ditempel di dinding perpustakaan. Satu anggota boleh meminjam paling banyak tiga buku, dan satu eksemplar buku hanya boleh dipegang satu anggota pada satu waktu. Aturan seperti itulah yang diterjemahkan menjadi angka 1, N, atau M di atas garis penghubung."
    ],
    [
      "Kelima langkah itu",
      "Kelima langkah itu ibarat membaca surat perintah sebelum menata ruang arsip. Kata bendanya menentukan berapa laci yang perlu disediakan, keterangannya menentukan kotak isian pada kartu, dan kata kerjanya menentukan laci mana yang perlu diberi penghubung."
    ],
    [
      "Atribut milik relasi",
      "Atribut milik relasi ibarat tanggal yang dicap pada slip peminjaman, bukan pada kartu buku dan bukan pada kartu anggota. Kartu buku tetap berisi keterangan bukunya saja, kartu anggota tetap berisi keterangan orangnya saja, dan slip peminjaman yang mencatat kapan keduanya bertemu."
    ]
  ],
  "p4": [
    [
      "Skema relasi",
      "Skema relasi ibarat daftar isi yang ditempel di depan setiap laci lemari arsip. Daftar itu tidak memuat satu pun kartu, hanya menyebutkan laci ini bernama apa dan setiap kartunya punya kotak isian apa saja. Petugas cukup membaca tempelan itu untuk tahu isi laci, tanpa perlu membukanya."
    ],
    [
      "Kunci tamu",
      "Kunci tamu ibarat slip peminjaman yang hanya menuliskan nomor induk buku, bukan menyalin seluruh keterangannya. Kalau judul buku itu ternyata salah cetak dan perlu dikoreksi, petugas cukup memperbaiki satu kartu di laci buku. Semua slip peminjaman ikut benar dengan sendirinya, sebab slip itu hanya menunjuk, tidak menyalin."
    ],
    [
      "Tabel penghubung",
      "Tabel penghubung ibarat laci ketiga di lemari arsip yang khusus menyimpan slip peminjaman. Laci buku tetap berisi kartu buku saja, laci anggota tetap berisi kartu anggota saja, dan laci ketiga mencatat pertemuan keduanya: nomor buku, nomor anggota, dan tanggalnya. Tanpa laci ketiga itu, petugas terpaksa menulis nama peminjam di belakang kartu buku, dan kartunya penuh coretan dalam sebulan."
    ]
  ],
  "p5": [
    [
      "Tabel seperti itu",
      "Tabel seperti itu ibarat petugas yang menyalin ulang seluruh keterangan buku ke setiap slip peminjaman: judul, pengarang, tahun, semuanya ditulis tangan lagi. Sepuluh peminjaman berarti sepuluh salinan keterangan yang sama. Kalau judulnya ternyata salah cetak, kesepuluh slip itu harus dicari dan dikoreksi satu per satu."
    ],
    [
      "Anomali penghapusan",
      "Anomali penghapusan ibarat membuang slip peminjaman terakhir sebuah buku, lalu mendapati bahwa keterangan bukunya ikut hilang karena tidak pernah dicatat di tempat lain. Bukunya masih ada di rak, tetapi perpustakaan sudah tidak punya catatannya sama sekali."
    ],
    [
      "Ketergantungan fungsional",
      "Ketergantungan fungsional ibarat pertanyaan yang cukup dijawab dengan menyebut satu nomor. Sebut nomor induk bukunya, dan petugas langsung tahu judul serta pengarangnya tanpa bertanya apa-apa lagi. Kalau satu nomor sudah cukup untuk menentukan sebuah keterangan, keterangan itu memang milik laci nomor tersebut, bukan milik laci yang lain."
    ],
    [
      "Tiga tahap itu",
      "Tiga tahap itu ibarat membereskan satu laci yang isinya campur aduk. Tahap pertama memastikan satu kartu hanya untuk satu perkara. Tahap kedua memindahkan kartu yang ternyata milik laci sebelah. Tahap ketiga memeriksa kartu yang tersisa, apakah masih ada keterangan yang sebenarnya milik laci lain lagi. Setelah tiga kali pemeriksaan, setiap laci hanya berisi barang miliknya sendiri."
    ],
    [
      "Normalisasi",
      "Normalisasi ibarat merapikan lemari yang sudah terlanjur berantakan, sedangkan ERD ibarat menggambar denah sebelum lemarinya diisi. Keduanya menghasilkan susunan laci yang sama. Bedanya, yang satu dikerjakan sebelum ada isinya, yang satu lagi sesudah."
    ]
  ],
  "p6": [
    [
      "Server lokal",
      "Server lokal ibarat membuka ruang arsip mini di dalam rumah sendiri. Petugasnya ada, lemarinya ada, loketnya ada, tetapi semuanya hanya melayani penghuni rumah itu. Tidak ada orang luar yang bisa datang, dan tidak perlu ada yang datang, sebab tujuannya memang untuk berlatih."
    ],
    [
      "MySQL",
      "MySQL ibarat lemari arsip beserta petugasnya, sedangkan phpMyAdmin ibarat loket dengan formulir cetak yang memudahkan pengunjung menyampaikan permintaan. Loketnya boleh dibongkar dan diganti loket lain; kartu-kartu di dalam lemari tetap utuh. Tetapi kalau lewat loket itu diperintahkan membakar satu laci, lacinya benar-benar terbakar."
    ],
    [
      "Porta",
      "Porta ibarat nomor loket di kantor pelayanan. Gedungnya satu, tetapi ada loket 80 untuk urusan halaman web dan loket 3306 untuk urusan basis data. Menyebut nomor loket yang salah membuat permintaan tidak sampai ke petugas yang tepat."
    ],
    [
      "Keempat basis data sistem itu",
      "Keempat basis data sistem itu ibarat buku induk dan catatan inventaris milik perpustakaan sendiri. Isinya bukan buku untuk dipinjam, melainkan catatan tentang lemari, laci, dan petugasnya. Pengunjung tidak berkepentingan dengannya, dan mencoret-coretnya membuat seluruh perpustakaan kacau."
    ]
  ],
  "p7": [
    [
      "DDL",
      "DDL ibarat pekerjaan tukang yang membuat lemari arsipnya: memotong papan, menentukan berapa laci, dan seberapa besar kotak isian pada kartunya. Setelah lemari jadi, tukang itu selesai bekerja. Mengisi kartu adalah pekerjaan petugas, bukan tukang, dan perintahnya masuk kelompok lain yang dibahas pada Bab 9."
    ],
    [
      "USE",
      "USE ibarat menyebutkan lemari mana yang dituju sebelum menyerahkan permintaan kepada petugas. Ruang arsip berisi lima lemari; tanpa menyebut lemarinya, petugas tidak tahu laci baru itu harus dipasang di mana."
    ],
    [
      "Perintah CREATE TABLE",
      "Perintah CREATE TABLE ibarat surat pesanan kepada tukang lemari. Suratnya menyebutkan laci ini bernama buku, kartunya punya lima kotak isian, kotak pertama muat lima huruf dan wajib diisi, kotak kedua muat delapan puluh huruf, dan nomor pada kotak pertama dipakai sebagai penanda unik. Tukang tidak perlu tahu buku apa saja yang akan disimpan, cukup ukurannya."
    ],
    [
      "DROP",
      "DROP ibarat memerintahkan petugas membakar satu laci beserta seluruh kartunya. Petugas tidak bertanya dua kali dan tidak menyimpan abunya. Karena itu perintah ini selalu dibaca ulang sebelum dijalankan, terutama nama laci yang disebut."
    ]
  ]
}
};
