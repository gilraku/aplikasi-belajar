// Section "Struktur Data & Algoritma": pelajaran mandiri di luar jadwal pertemuan kuliah.
// Tiap pelajaran = penjelasan singkat + lab langkah demi langkah (blok algo-lab) + tabel kapan dipakai + kesalahan umum.
// Kodenya C++ seperti di mata kuliah Algoritma dan Pemrograman.
const A = (title, html, label) => ({ type: 'article', label, title, html });
const lab = (algo, data, target, desc) => ({ type: 'algo-lab', algo, data, target, label: 'Lab algoritma', title: 'Jalankan langkah demi langkah', desc });
const tbl = (title, headers, rows, label) => ({ type: 'table', label: label || 'Ringkasan', title, headers, rows });
const salah = html => ({ type: 'callout', tone: 'rose', heading: 'Kesalahan yang sering terjadi', html });
const DESC = 'Tekan Lanjut atau tombol panah. Baris kode yang sedang dijalankan menyala, dan isi variabel ikut berubah. Pilih "Tebak dulu" untuk menjawab sebelum langkahnya dibuka, atau isi angkamu sendiri di bawah.';
const DESC_OPS = 'Tekan Lanjut atau tombol panah. Baris kode yang sedang jalan menyala, dan isi variabel ikut berubah. Pilih "Tebak dulu" untuk menebak sebelum langkahnya dibuka, atau tulis urutan perintahmu sendiri di bawah.';
const L = (nomor, id, bab, judul, ket, materi, quiz) => ({ id, nomor, bab, judul, ket, ujian: 'Latihan', materi, cheatsheet: [], simulator: [], flashcards: [], quiz });

const OH = tbl('Cara membaca O(…)', ['Notasi', 'Artinya', '1.000 data', '1.000.000 data'], [
  ['O(log n)', 'Langkah bertambah 1 setiap data menjadi 2 kali lipat', '± 10 langkah', '± 20 langkah'],
  ['O(n)', 'Langkah sebanding dengan banyak data', '1.000 langkah', '1.000.000 langkah'],
  ['O(n log n)', 'Sedikit di atas n', '± 10.000 langkah', '± 20.000.000 langkah'],
  ['O(n²)', 'Data 2 kali lipat, langkah 4 kali lipat', '± 1.000.000 langkah', '± 1.000.000.000.000 langkah']
], 'Notasi Big-O');

const SDA = {
  id: 'struktur-data-algoritma', nama: 'Struktur Data & Algoritma', jalur: true,
  ket: 'Pelajaran mandiri di luar jadwal kuliah. Tiap algoritma bisa dijalankan langkah demi langkah: batang bergerak, baris kode C++ yang sedang jalan menyala, dan isi variabel terlihat.',
  meetings: [
    // ======================= DASAR =======================
    L(0, 'perulangan', 'Dasar', 'Perulangan (for, while, do-while)', 'Hitung putaran, dari satu loop sampai bersarang', [
      A('Tiga bentuk perulangan', `<p><b>Perulangan</b> (loop, disebut juga pengulangan) menjalankan sekelompok perintah berkali-kali selama sebuah <b>kondisi</b> bernilai true. Hampir semua algoritma di section ini dibangun dari perulangan, jadi yang paling penting adalah bisa menghitung <b>berapa kali</b> badannya dijalankan.</p>
<ul><li><b>for</b>: nilai awal, kondisi, dan step ditulis dalam satu baris: <code>for (int i = 0; i &lt; n; i++)</code>. Dipakai saat banyak putaran sudah diketahui, misalnya mengunjungi semua isi array.</li>
<li><b>while</b>: kondisi dicek <b>sebelum</b> badan. Dipakai saat berhentinya bergantung pada keadaan, misalnya membaca input sampai pengguna mengetik 0, atau pencarian biner yang mengulang selama <code>low &lt;= high</code>.</li>
<li><b>do-while</b>: kondisi dicek <b>sesudah</b> badan, jadi badan pasti dijalankan minimal sekali. Dipakai untuk menu atau validasi input: tampilkan dulu, baru tanya apakah perlu diulang.</li></ul>
<p><b>Menghitung putaran:</b> pada <code>for (int i = 1; i &lt;= n; i++)</code> badan dijalankan n kali, sedangkan kondisinya dicek n + 1 kali. Cek terakhir yang bernilai false itulah yang menghentikan perulangan. <code>for (int i = 0; i &lt; n; i++)</code> juga n kali. Yang menentukan adalah pasangan nilai awal dan tanda pembandingnya.</p>
<p>Sintaks dasar, break, continue, dan latihan menelusuri ada di <a href="#/c/algoritma-pemrograman/m/p6">Algoritma P6 (for)</a> dan <a href="#/c/algoritma-pemrograman/m/p7">Algoritma P7 (while dan do-while)</a>. Pelajaran ini melanjutkan ke cara menghitung putaran dan kaitannya dengan kecepatan algoritma.</p>`, 'Satu perulangan'),
      lab('perulangan', [4], undefined, 'Tekan Lanjut atau tombol panah. Ketiga perulangan menjumlah 1 sampai n. Bandingkan banyak putaran dan banyak cek kondisinya. Isi n = 0 di bawah untuk melihat kapan do-while memberi hasil yang berbeda.'),
      tbl('Berapa kali badan dijalankan?', ['Kode', 'Badan dijalankan', 'Kondisi dicek'], [
        ['<code>for (int i = 0; i &lt; n; i++)</code>', 'n', 'n + 1'],
        ['<code>for (int i = 1; i &lt;= n; i++)</code>', 'n', 'n + 1'],
        ['<code>for (int i = 0; i &lt;= n; i++)</code>', 'n + 1 (sering tidak disengaja)', 'n + 2'],
        ['<code>for (int i = n; i &gt; 0; i--)</code>', 'n', 'n + 1'],
        ['<code>for (int i = 1; i &lt; n; i *= 2)</code>', 'sekitar log₂ n', 'satu lebih banyak'],
        ['<code>do { … } while (i &lt;= n);</code> dengan n = 0', '1 (minimal sekali)', '1']
      ], 'Menghitung putaran'),
      A('Perulangan bersarang dan Big-O', `<p><b>Perulangan bersarang</b> adalah perulangan di dalam badan perulangan lain. Untuk <b>setiap</b> putaran luar, perulangan dalam berjalan dari awal sampai selesai. Karena itu banyak langkahnya <b>dikalikan</b>, bukan dijumlah.</p>
<ul><li>Luar n kali, dalam n kali: n × n = n² langkah, jadi <b>O(n²)</b>.</li>
<li>Dalam dimulai dari <code>j = i + 1</code>, seperti saat membandingkan setiap pasangan: (n - 1) + (n - 2) + … + 1 = n(n-1)/2 langkah. Tetap <b>O(n²)</b>, karena konstanta dan suku yang lebih kecil dibuang.</li>
<li>Dua perulangan <b>berurutan</b> (yang satu selesai, baru yang lain mulai): n + n = 2n, tetap <b>O(n)</b>. Berurutan dijumlah, bersarang dikali.</li>
<li>Luar n kali, dalam m kali, misalnya baris × kolom matriks: n × m langkah.</li></ul>
<p>Bubble sort, selection sort, dan insertion sort memakai dua perulangan bersarang, makanya ketiganya O(n²). Cara membaca notasinya ada di pelajaran <a href="#/c/struktur-data-algoritma/m/big-o">Big-O</a>, dan contoh baris × kolom ada di <a href="#/c/struktur-data-algoritma/m/array-2d">Array Dua Dimensi</a>.</p>`, 'Bersarang'),
      lab('kembar', [4, 7, 2, 7, 9, 4], undefined, 'Tekan Lanjut atau tombol panah. Grid pasangan terisi satu per satu: setiap baris grid adalah satu putaran luar. Isi angkamu sendiri di bawah, tulis angka yang sama lebih dari sekali supaya ada yang kembar.'),
      tbl('Dari bentuk perulangan ke Big-O', ['Bentuk perulangan', 'Banyak langkah', 'Big-O'], [
        ['Satu perulangan sampai n', 'n', 'O(n)'],
        ['Dua perulangan berurutan, masing-masing sampai n', 'n + n = 2n', 'O(n)'],
        ['Perulangan di dalam perulangan, keduanya sampai n', 'n × n = n²', 'O(n²)'],
        ['Dalam dimulai dari i + 1 (setiap pasangan)', 'n(n-1)/2', 'O(n²)'],
        ['Nilai i dikali atau dibagi 2 setiap putaran', 'sekitar log₂ n', 'O(log n)'],
        ['Tiga perulangan bersarang, semuanya sampai n', 'n³', 'O(n³)']
      ], 'Bandingkan'),
      salah(`<ul><li><b>Kelebihan atau kekurangan satu putaran (off-by-one).</b> Mulai dari 0 pasangannya <code>&lt; n</code>, mulai dari 1 pasangannya <code>&lt;= n</code>. <code>for (int i = 0; i &lt;= n; i++)</code> berjalan n + 1 kali, dan pada array a[n] sudah di luar batas.</li>
<li><b>Titik koma setelah kondisi.</b> <code>while (i &lt;= n);</code> membuat perulangan kosong: badan di bawahnya tidak ikut diulang, dan karena i tidak pernah berubah, programnya macet (infinite loop).</li>
<li><b>Lupa mengubah variabel kondisi di while.</b> Tanpa <code>i++</code>, kondisi selalu true dan perulangan tidak berhenti.</li>
<li><b>Memakai do-while untuk kasus yang bisa nol kali.</b> Badannya tetap jalan sekali, sehingga hasilnya salah. Coba lab pertama dengan n = 0.</li>
<li><b>Perulangan dalam mulai dari 0 saat membandingkan pasangan.</b> Setiap pasangan dihitung dua kali dan setiap angka dianggap kembar dengan dirinya sendiri. Mulai dari <code>j = i + 1</code>.</li></ul>`)
    ], [
      { q: 'Berapa kali badan for (int i = 0; i <= 5; i++) dijalankan?', opts: ['4', '5', '6', '7'], ans: 2, exp: 'i bernilai 0, 1, 2, 3, 4, 5: enam putaran. Untuk tepat 5 kali, tulis i < 5.' },
      { q: 'Perulangan yang badannya pasti dijalankan minimal sekali adalah…', opts: ['for', 'while', 'do-while', 'Semuanya'], ans: 2, exp: 'do-while mengecek kondisi setelah badan, jadi putaran pertama selalu berjalan.' },
      { q: 'for (i = 0; i < n; i++) { for (j = 0; j < n; j++) { … } } dengan n = 10. Badan perulangan dalam dijalankan berapa kali?', opts: ['10', '20', '55', '100'], ans: 3, exp: 'Untuk setiap i (10 kali), j berjalan 10 kali: 10 × 10 = 100.' },
      { q: 'Dua perulangan berurutan (bukan bersarang), masing-masing dari 0 sampai n-1. Big-O-nya adalah…', opts: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], ans: 1, exp: 'Berurutan dijumlah: n + n = 2n. Konstanta 2 dibuang, jadi O(n).' },
      { q: 'Membandingkan setiap pasangan dari 5 data dengan j mulai dari i + 1 membutuhkan berapa perbandingan?', opts: ['5', '10', '20', '25'], ans: 1, exp: '4 + 3 + 2 + 1 = 10, atau n(n-1)/2 = 5 × 4 / 2 = 10.' }
    ]),
    L(0, 'big-o', 'Dasar', 'Big-O: Mengukur Kecepatan Algoritma', 'Hitung langkah saat data bertambah', [
      A('Apa itu Big-O?', `<p><b>Big-O</b> adalah cara menyatakan <b>seberapa cepat banyak langkah bertambah</b> ketika banyak data (n) bertambah. Yang dibandingkan bukan detik, karena detik bergantung pada komputernya, melainkan pola pertumbuhannya.</p>
<ul><li><b>O(1)</b>: langkahnya tetap, berapa pun n. Contoh: mengambil <code>a[0]</code>.</li>
<li><b>O(log n)</b>: data dua kali lipat, langkah hanya bertambah satu. Contoh: pencarian biner.</li>
<li><b>O(n)</b>: langkah sebanding dengan n. Contoh: pencarian linear, menjumlah isi array.</li>
<li><b>O(n²)</b>: data dua kali lipat, langkah empat kali lipat. Biasanya muncul dari perulangan di dalam perulangan, seperti bubble sort.</li></ul>
<p><b>Cara membaca kode:</b> hitung perulangannya. Tidak ada perulangan berarti O(1). Satu perulangan sampai n berarti O(n). Dua perulangan bersarang yang masing-masing sampai n berarti O(n²). Perulangan yang nilainya dibagi dua setiap putaran berarti O(log n).</p>
<p><b>Kapan penting:</b> saat datanya besar. Untuk 10 data semua algoritma terasa cepat, tetapi untuk 1 juta data O(n²) bisa butuh berjam-jam sementara O(n log n) selesai dalam sekejap.</p>`),
      lab('bigo', [4, 8, 16, 32], undefined, 'Tekan Lanjut atau tombol panah. Tebak berapa langkah yang dijalankan tiap fungsi, lalu lihat grafiknya untuk beberapa nilai n. Isi nilai n sendiri di bawah.'),
      OH,
      salah(`<ul><li><b>Menganggap dua perulangan berurutan sebagai O(n²).</b> Perulangan yang berurutan (satu selesai, lalu yang lain) dijumlah: n + n = 2n, tetap O(n). O(n²) hanya kalau perulangannya <b>di dalam</b> perulangan lain.</li>
<li><b>Ikut menulis konstanta.</b> O(2n) dan O(n + 5) ditulis O(n), karena yang dilihat hanya bagian yang paling cepat tumbuh.</li>
<li><b>Mengira O(1) berarti satu baris kode.</b> O(1) berarti banyak langkahnya tidak bergantung pada n. Sepuluh baris tanpa perulangan tetap O(1).</li></ul>`)
    ], [
      { q: 'Kode berisi perulangan i dari 0 sampai n-1, dan di dalamnya perulangan j dari 0 sampai n-1. Big-O-nya adalah…', opts: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], ans: 2, exp: 'Untuk setiap i, j berjalan n kali, jadi total n × n langkah.' },
      { q: 'Algoritma O(n) butuh 1.000 langkah untuk 1.000 data. Untuk 4.000 data, kira-kira butuh…', opts: ['1.000 langkah', '2.000 langkah', '4.000 langkah', '16.000 langkah'], ans: 2, exp: 'O(n) sebanding dengan n. Data 4 kali lipat, langkah juga 4 kali lipat.' },
      { q: 'Contoh algoritma O(log n) adalah…', opts: ['Pencarian linear', 'Pencarian biner', 'Bubble sort', 'Menjumlah semua isi array'], ans: 1, exp: 'Pencarian biner membuang separuh data di setiap langkah.' }
    ]),
    L(0, 'array-1d', 'Dasar', 'Array Satu Dimensi', 'Deretan kotak dengan indeks', [
      A('Apa itu array?', `<p><b>Array</b> adalah kumpulan data <b>bertipe sama</b> yang disimpan berderet di memori dan dipanggil dengan satu nama. Setiap kotak punya <b>indeks</b> yang dimulai dari <b>0</b>.</p>
<ul><li><code>int a[5];</code> membuat 5 kotak: a[0], a[1], a[2], a[3], a[4]. Indeks terakhir selalu <b>n - 1</b>.</li>
<li><code>int a[] = {7, 3, 9};</code> membuat array sekaligus mengisinya. Ukurannya dihitung otomatis.</li>
<li>Banyak isi array bisa dihitung dengan <code>sizeof(a) / sizeof(a[0])</code>, yaitu ukuran seluruh array dibagi ukuran satu isi.</li>
<li>Saat dikirim ke fungsi, array ditulis <code>int a[]</code> dan banyak isinya dikirim terpisah sebagai <code>n</code>, karena fungsi tidak tahu ukurannya sendiri.</li></ul>
<p><b>Pola yang paling sering dipakai:</b> perulangan <code>for (int i = 0; i &lt; n; i++)</code> untuk mengunjungi setiap isi, misalnya menjumlah, mencari nilai terbesar, atau menghitung data yang memenuhi syarat.</p>
<p><b>Kapan dipakai:</b> saat banyak data sudah diketahui dan perlu diakses lewat nomor urut. Mengambil a[i] langsung, O(1), berapa pun ukurannya.</p>`),
      lab('array1d', [7, 3, 9, 2, 9, 5], undefined, DESC),
      tbl('Contoh isi array', ['Kode', 'Artinya'], [
        ['<code>int a[5] = {0};</code>', 'lima kotak, semuanya 0'],
        ['<code>a[2] = 10;</code>', 'mengisi kotak ketiga (indeks 2)'],
        ['<code>a[i] += 1;</code>', 'menambah 1 ke kotak ke-i'],
        ['<code>for (int i = 0; i &lt; n; i++)</code>', 'mengunjungi indeks 0 sampai n-1']
      ], 'Ringkasan'),
      salah(`<ul><li><b>Memakai indeks n.</b> Array 5 isi hanya punya indeks 0–4. <code>a[5]</code> sudah di luar array dan C++ tidak selalu memberi error, jadi hasilnya bisa ngawur.</li>
<li><b>Mengisi maks dengan 0.</b> Kalau semua isi negatif, jawabannya salah. Isi awal maks dengan a[0].</li>
<li><b>Lupa mengosongkan total.</b> <code>int total;</code> tanpa <code>= 0</code> berisi nilai sisa memori, sehingga hasil penjumlahan tidak bisa ditebak.</li></ul>`)
    ], [
      { q: 'int a[] = {4, 8, 15, 16, 23}; Berapa nilai a[3]?', opts: ['8', '15', '16', '23'], ans: 2, exp: 'Indeks dimulai dari 0: a[0]=4, a[1]=8, a[2]=15, a[3]=16.' },
      { q: 'Array berisi 10 data. Indeks terakhirnya adalah…', opts: ['10', '9', '11', '1'], ans: 1, exp: 'Indeks 0 sampai n-1, jadi 0 sampai 9.' },
      { q: 'Mengapa maks sebaiknya diisi a[0], bukan 0, sebelum mencari nilai terbesar?', opts: ['Supaya lebih cepat', 'Supaya tetap benar walaupun semua isi negatif', 'Karena 0 tidak boleh dipakai', 'Supaya array terurut'], ans: 1, exp: 'Kalau semua isi negatif, maks = 0 tidak pernah tergantikan dan jawabannya salah.' }
    ]),
    L(0, 'array-2d', 'Dasar', 'Array Dua Dimensi (Matriks)', 'Tabel baris dan kolom', [
      A('Apa itu array dua dimensi?', `<p><b>Array dua dimensi</b> menyimpan data dalam bentuk <b>tabel</b>: ada baris dan kolom. Satu isi ditulis <code>m[i][j]</code>, dengan <b>i</b> nomor baris dan <b>j</b> nomor kolom. Keduanya dimulai dari 0.</p>
<ul><li><code>int m[2][3];</code> membuat 2 baris × 3 kolom = 6 kotak.</li>
<li><code>int m[2][3] = {{3, 5, 1}, {2, 8, 4}};</code> mengisi per baris.</li>
<li>Untuk mengunjungi semua isi dipakai <b>perulangan bersarang</b>: perulangan luar memilih baris, perulangan dalam berjalan di kolom-kolomnya.</li>
<li>Saat dikirim ke fungsi, ukuran kolom wajib ditulis, misalnya <code>int m[][3]</code>, supaya C++ tahu di mana baris berikutnya dimulai.</li></ul>
<p><b>Kapan dipakai:</b> data yang memang berbentuk tabel, seperti nilai mahasiswa per mata kuliah, papan permainan, gambar (piksel), dan matriks di matematika.</p>`),
      lab('array2d', [[3, 5, 1], [2, 8, 4]], undefined, 'Tekan Lanjut atau tombol panah. Lihat kotak yang sedang dijumlah dan arah geraknya: per baris dulu, lalu per kolom. Isi matriksmu sendiri di bawah.'),
      tbl('Urutan perulangan', ['Tujuan', 'Perulangan luar', 'Perulangan dalam'], [
        ['Jumlah per baris', 'i (baris)', 'j (kolom)'],
        ['Jumlah per kolom', 'j (kolom)', 'i (baris)'],
        ['Tampilkan seperti tabel', 'i (baris), lalu <code>endl</code> setelah perulangan dalam', 'j (kolom)']
      ], 'Ringkasan'),
      salah(`<ul><li><b>Indeks tertukar.</b> <code>m[j][i]</code> padahal maksudnya <code>m[i][j]</code>. Pada matriks yang tidak persegi, ini membaca di luar array.</li>
<li><b>total tidak dikosongkan di tiap baris.</b> Kalau <code>total = 0</code> ditaruh di luar perulangan luar, jumlah baris kedua ikut menambah jumlah baris pertama.</li>
<li><b>Lupa ukuran kolom di parameter.</b> <code>void f(int m[][])</code> tidak bisa dikompilasi. Tulis <code>int m[][3]</code> atau pakai konstanta.</li></ul>`)
    ], [
      { q: 'int m[2][3] = {{3, 5, 1}, {2, 8, 4}}; Berapa nilai m[1][2]?', opts: ['5', '1', '8', '4'], ans: 3, exp: 'Baris 1 adalah {2, 8, 4}, dan kolom 2 berisi 4.' },
      { q: 'Matriks 3 baris × 4 kolom berisi berapa kotak?', opts: ['7', '12', '3', '4'], ans: 1, exp: '3 × 4 = 12.' },
      { q: 'Untuk menjumlah per kolom, perulangan luar memakai…', opts: ['i (baris)', 'j (kolom)', 'total', 'n'], ans: 1, exp: 'Satu kolom dipilih dulu (j), lalu semua baris di kolom itu dijumlah (i berjalan di dalam).' }
    ]),
    L(0, 'fungsi-rekursi', 'Dasar', 'Fungsi dan Rekursi', 'Fungsi yang memanggil dirinya sendiri', [
      A('Fungsi', `<p><b>Fungsi</b> adalah kumpulan perintah yang diberi nama sehingga bisa dipanggil berulang kali. Bagian-bagiannya:</p>
<ul><li><b>Tipe kembalian</b>: <code>int</code>, <code>double</code>, dan seterusnya, atau <code>void</code> kalau fungsi tidak mengembalikan nilai.</li>
<li><b>Parameter</b>: data yang dikirim ke fungsi, misalnya <code>int n</code>. Nilai yang dikirim saat memanggil disebut argumen.</li>
<li><b>return</b>: mengakhiri fungsi dan mengirim hasil ke pemanggil.</li></ul>
<p>Parameter biasa (<code>int n</code>) menerima <b>salinan</b>, jadi mengubah n di dalam fungsi tidak mengubah variabel pemanggil. Kalau perubahan harus terbawa keluar, pakai <b>referensi</b>: <code>int &amp;n</code>. Array selalu dikirim sebagai alamat, jadi perubahan isi array di dalam fungsi ikut terbawa.</p>`, 'Dasar'),
      A('Rekursi', `<p><b>Fungsi rekursif</b> adalah fungsi yang <b>memanggil dirinya sendiri</b> untuk menyelesaikan versi masalah yang lebih kecil. Setiap fungsi rekursif harus punya dua bagian:</p>
<ul><li><b>Kasus dasar</b>: kondisi yang jawabannya langsung diketahui, sehingga pemanggilan berhenti. Pada faktorial: <code>n &lt;= 1</code> mengembalikan 1.</li>
<li><b>Langkah rekursif</b>: memanggil dirinya dengan masalah yang lebih kecil dan semakin dekat ke kasus dasar. Pada faktorial: <code>n * faktorial(n - 1)</code>.</li></ul>
<p>Setiap pemanggilan disimpan di <b>call stack</b>. Pemanggilan yang belum selesai menunggu di bawah, dan hasilnya diselesaikan dari yang paling atas (kasus dasar) ke bawah. Inilah stack yang sama dengan pelajaran Stack.</p>
<p><b>Kapan dipakai:</b> masalah yang secara alami terdiri dari bagian yang mirip dirinya, seperti merge sort, quick sort, penelusuran pohon, dan DFS. Untuk perhitungan sederhana seperti faktorial, perulangan biasa juga bisa dan lebih hemat memori.</p>`, 'Rekursi'),
      lab('rekursi', [4], undefined, 'Tekan Lanjut atau tombol panah. Lihat kotak pemanggilan ditumpuk sampai kasus dasar, lalu dibongkar sambil membawa hasil. Isi n sendiri (1–7) di bawah.'),
      tbl('Perulangan dan rekursi', ['', 'Perulangan', 'Rekursi'], [
        ['Cara berhenti', 'kondisi perulangan bernilai salah', 'kasus dasar tercapai'],
        ['Memori', 'tetap', 'bertambah satu kotak per pemanggilan'],
        ['Cocok untuk', 'mengulang langkah yang sama', 'masalah yang bisa dipecah jadi bagian yang mirip']
      ], 'Bandingkan'),
      salah(`<ul><li><b>Tidak ada kasus dasar</b>, atau kasus dasarnya tidak pernah tercapai (misalnya memanggil <code>faktorial(n + 1)</code>). Fungsi memanggil dirinya terus sampai call stack penuh dan program berhenti (stack overflow).</li>
<li><b>Lupa <code>return</code></b> di depan pemanggilan rekursif. <code>n * faktorial(n - 1);</code> tanpa return membuat hasilnya dibuang.</li>
<li><b>Mengira parameter biasa ikut berubah.</b> Fungsi <code>void tambah(int x) { x++; }</code> tidak mengubah variabel pemanggil. Pakai <code>int &amp;x</code> kalau memang ingin mengubahnya.</li></ul>`)
    ], [
      { q: 'Apa yang terjadi jika fungsi rekursif tidak punya kasus dasar?', opts: ['Fungsi langsung mengembalikan 0', 'Fungsi memanggil dirinya terus sampai call stack penuh', 'Program otomatis memakai perulangan', 'Tidak terjadi apa-apa'], ans: 1, exp: 'Tanpa kasus dasar, pemanggilan tidak pernah berhenti dan memori call stack habis (stack overflow).' },
      { q: 'Berapa hasil faktorial(4)?', opts: ['4', '10', '16', '24'], ans: 3, exp: '4 × 3 × 2 × 1 = 24.' },
      { q: 'void ubah(int x) { x = 10; } dipanggil dengan ubah(a) saat a = 3. Nilai a setelahnya adalah…', opts: ['3', '10', '0', 'Error'], ans: 0, exp: 'x hanya salinan dari a. Untuk mengubah a, parameternya harus referensi: int &x.' }
    ]),

    // ======================= PENCARIAN =======================
    L(1, 'pencarian-linear', 'Pencarian', 'Pencarian Linear (Sequential Search)', 'Periksa satu per satu dari kiri', [
      A('Apa itu pencarian linear?', `<p><b>Pencarian linear</b> (disebut juga <i>sequential search</i>) mencari sebuah nilai dengan memeriksa data <b>satu per satu</b>, mulai dari indeks 0, sampai nilainya ketemu atau data habis.</p>
<ul><li><b>Masukan:</b> array <code>a</code>, banyak data <code>n</code>, dan nilai yang dicari <code>x</code>.</li>
<li><b>Keluaran:</b> indeks tempat <code>x</code> ditemukan, atau <code>-1</code> kalau tidak ada.</li></ul>
<p><b>Kapan dipakai:</b> data tidak urut, datanya sedikit, atau data hanya dicari sekali. Kelebihannya, data tidak perlu diurutkan dulu dan kodenya pendek.</p>`),
      lab('linear', [12, 7, 25, 3, 18, 9], 3, DESC),
      tbl('Berapa langkah yang dibutuhkan?', ['Kasus', 'Kapan terjadi', 'Perbandingan'], [
        ['Terbaik', 'x ada di indeks 0', '1'],
        ['Terburuk', 'x ada di indeks terakhir, atau tidak ada sama sekali', 'n'],
        ['Rata-rata', 'x ada di posisi acak', 'sekitar n/2']
      ]),
      OH,
      salah(`<ul><li><b>Menulis <code>return -1</code> di dalam perulangan</b> (misalnya di bagian <code>else</code>). Akibatnya fungsi berhenti setelah memeriksa a[0] saja. <code>return -1</code> harus di luar <code>for</code>, setelah semua data diperiksa.</li>
<li><b>Batas perulangan <code>i &lt;= n</code></b>. Indeks terakhir adalah n-1, jadi a[n] sudah di luar array.</li>
<li><b>Memakai <code>=</code> alih-alih <code>==</code></b> di <code>if (a[i] == x)</code>. Satu tanda sama dengan berarti mengisi nilai, bukan membandingkan.</li></ul>`)
    ], [
      { q: 'Data: 4, 9, 2, 7, 5. Berapa perbandingan yang dilakukan pencarian linear untuk mencari 7?', opts: ['1', '2', '4', '5'], ans: 2, exp: 'Diperiksa a[0]=4, a[1]=9, a[2]=2, a[3]=7. Ketemu pada perbandingan ke-4.' },
      { q: 'Apa nilai kembali fungsi linearSearch jika nilai yang dicari tidak ada?', opts: ['0', '-1', 'n', 'n - 1'], ans: 1, exp: '-1 dipakai karena indeks array tidak pernah negatif, jadi tidak tertukar dengan posisi yang sah.' },
      { q: 'Syarat data untuk pencarian linear adalah…', opts: ['Data harus urut naik', 'Data harus urut turun', 'Data tidak perlu urut', 'Data tidak boleh ada yang kembar'], ans: 2, exp: 'Pencarian linear memeriksa semua data satu per satu, jadi urutannya tidak berpengaruh pada kebenaran hasil.' }
    ]),
    L(2, 'pencarian-biner', 'Pencarian', 'Pencarian Biner (Binary Search)', 'Lihat tengah, buang separuh', [
      A('Apa itu pencarian biner?', `<p><b>Pencarian biner</b> (<i>binary search</i>) mencari nilai di data yang <b>sudah urut</b>. Caranya: lihat data di <b>tengah</b> rentang. Kalau belum cocok, buang separuh rentang yang pasti tidak berisi nilai itu, lalu ulangi pada separuh yang tersisa.</p>
<p>Tiga variabel penting:</p>
<ul><li><code>low</code>: indeks awal rentang yang masih mungkin.</li><li><code>high</code>: indeks akhir rentang yang masih mungkin.</li><li><code>mid = (low + high) / 2</code>: indeks tengah. Karena keduanya <code>int</code>, hasil bagi dibulatkan ke bawah.</li></ul>
<p><b>Kapan dipakai:</b> data sudah urut dan sering dicari, misalnya mencari NIM di daftar yang urut. Untuk 1 juta data, cukup sekitar 20 pemeriksaan.</p>`),
      lab('biner', [3, 8, 12, 17, 21, 26, 30, 35], 26, DESC),
      tbl('Pencarian linear vs biner', ['', 'Linear', 'Biner'], [
        ['Syarat data', 'Bebas', 'Harus urut'],
        ['Langkah terburuk untuk 1.000 data', '1.000', 'sekitar 10'],
        ['Notasi', 'O(n)', 'O(log n)'],
        ['Cocok untuk', 'Data sedikit atau sekali cari', 'Data besar yang sering dicari']
      ]),
      salah(`<ul><li><b>Memakai pencarian biner pada data yang belum urut.</b> Programnya tetap jalan tetapi hasilnya bisa salah, karena separuh yang dibuang mungkin berisi nilai yang dicari.</li>
<li><b>Menulis <code>low = mid</code> atau <code>high = mid</code></b> (tanpa +1 / -1). a[mid] sudah diperiksa, jadi rentang harus melewatinya. Tanpa itu perulangan bisa tidak pernah berhenti.</li>
<li><b>Kondisi <code>while (low &lt; high)</code></b>. Saat low = high masih ada satu data yang belum diperiksa; kondisinya harus <code>low &lt;= high</code>.</li></ul>`)
    ], [
      { q: 'Data urut: 2, 5, 8, 11, 14, 17, 20. Saat mencari 17, berapa nilai mid pada putaran pertama?', opts: ['2', '3', '4', '5'], ans: 1, exp: 'low = 0, high = 6, mid = (0 + 6) / 2 = 3. a[3] = 11.' },
      { q: 'Jika a[mid] lebih kecil dari x, langkah yang benar adalah…', opts: ['high = mid - 1', 'low = mid + 1', 'low = mid', 'return mid'], ans: 1, exp: 'x lebih besar dari a[mid], jadi x ada di kanan mid. Rentang digeser mulai mid + 1.' },
      { q: 'Kapan perulangan pencarian biner berhenti karena data tidak ditemukan?', opts: ['Saat mid = 0', 'Saat low > high', 'Saat low = high', 'Saat a[mid] = 0'], ans: 1, exp: 'Saat low melewati high, rentang yang tersisa kosong, sehingga kondisi low <= high false.' }
    ]),
    // ======================= PENGURUTAN =======================
    L(3, 'bubble-sort', 'Pengurutan', 'Bubble Sort', 'Tukar pasangan bersebelahan', [
      A('Apa itu bubble sort?', `<p><b>Bubble sort</b> mengurutkan data dengan membandingkan <b>dua data yang bersebelahan</b>. Kalau urutannya salah (yang kiri lebih besar), keduanya ditukar. Dalam satu <b>putaran</b>, angka terbesar terdorong sampai ke ujung kanan, seperti gelembung yang naik ke permukaan.</p>
<ul><li>Perulangan luar <code>i</code> = nomor putaran. Ada n-1 putaran.</li>
<li>Perulangan dalam <code>j</code> = posisi pasangan yang dibandingkan (a[j] dan a[j+1]). Batasnya <code>n - 1 - i</code> karena i angka paling kanan sudah di tempatnya.</li>
<li><code>tmp</code> = tempat titip sementara saat menukar, supaya nilai lama tidak hilang.</li></ul>
<p><b>Kapan dipakai:</b> untuk belajar dan untuk data yang sangat sedikit. Untuk data besar terlalu lambat.</p>`),
      lab('bubble', [5, 1, 4, 2, 8], undefined, DESC),
      tbl('Cara menukar dua variabel', ['Baris', 'Isi a[j]', 'Isi a[j+1]', 'Isi tmp'], [
        ['Awal', '7', '3', '–'],
        ['<code>int tmp = a[j];</code>', '7', '3', '7'],
        ['<code>a[j] = a[j + 1];</code>', '3', '3', '7'],
        ['<code>a[j + 1] = tmp;</code>', '3', '7', '7']
      ], 'Tukar nilai'),
      salah(`<ul><li><b>Menukar tanpa <code>tmp</code></b>: <code>a[j] = a[j+1]; a[j+1] = a[j];</code>. Setelah baris pertama, nilai lama a[j] sudah hilang, jadi kedua posisi berisi angka yang sama.</li>
<li><b>Batas dalam <code>j &lt; n</code></b>. Saat j = n-1, a[j+1] = a[n] di luar array. Batas yang benar <code>j &lt; n - 1 - i</code>.</li>
<li><b>Tanda <code>&lt;</code> dan <code>&gt;</code> tertukar.</b> <code>a[j] &gt; a[j+1]</code> menghasilkan urutan naik; <code>&lt;</code> menghasilkan urutan turun.</li></ul>`)
    ], [
      { q: 'Data: 3, 1, 2. Bagaimana isi array setelah putaran pertama bubble sort (urut naik)?', opts: ['1, 2, 3', '1, 3, 2', '3, 2, 1', '2, 1, 3'], ans: 0, exp: 'Bandingkan 3 dan 1 → tukar: 1, 3, 2. Bandingkan 3 dan 2 → tukar: 1, 2, 3.' },
      { q: 'Untuk 6 data, berapa perbandingan yang dilakukan bubble sort versi dasar?', opts: ['6', '12', '15', '36'], ans: 2, exp: 'n(n-1)/2 = 6 × 5 / 2 = 15.' },
      { q: 'Apa fungsi variabel tmp saat menukar a[j] dan a[j+1]?', opts: ['Menghitung jumlah putaran', 'Menyimpan nilai a[j] sementara agar tidak hilang', 'Menyimpan indeks terbesar', 'Menandai data yang sudah urut'], ans: 1, exp: 'Tanpa tmp, nilai a[j] tertimpa sebelum sempat dipindahkan ke a[j+1].' }
    ]),
    L(4, 'selection-sort', 'Pengurutan', 'Selection Sort', 'Pilih yang terkecil, taruh di depan', [
      A('Apa itu selection sort?', `<p><b>Selection sort</b> membagi data menjadi dua bagian: kiri yang <b>sudah urut</b> dan kanan yang <b>belum</b>. Setiap putaran, cari angka <b>terkecil</b> di bagian kanan, lalu tukar ke posisi paling depan bagian itu.</p>
<ul><li><code>i</code> = posisi yang sedang diisi.</li><li><code>min</code> = <b>indeks</b> angka terkecil yang ditemukan sejauh ini (bukan nilainya).</li><li><code>j</code> = posisi yang sedang dibandingkan dengan a[min].</li></ul>
<p><b>Kapan dipakai:</b> data sedikit, dan menulis ke memori mahal, karena pertukarannya paling banyak n-1 kali.</p>`),
      lab('selection', [29, 10, 14, 37, 13], undefined, DESC),
      tbl('Bubble sort vs selection sort', ['', 'Bubble', 'Selection'], [
        ['Cara kerja', 'Tukar pasangan bersebelahan', 'Cari minimum, tukar sekali per putaran'],
        ['Perbandingan', 'n(n-1)/2', 'n(n-1)/2'],
        ['Pertukaran terbanyak', 'n(n-1)/2', 'n-1'],
        ['Notasi', 'O(n²)', 'O(n²)']
      ]),
      salah(`<ul><li><b>Menyimpan nilai minimum, bukan indeksnya</b> (<code>min = a[j]</code>). Saat menukar, kita butuh tahu <b>posisi</b> angka terkecil.</li>
<li><b>Menukar di dalam perulangan j</b>, setiap kali menemukan angka lebih kecil. Hasilnya tetap urut, tetapi pertukarannya jadi banyak seperti bubble sort. Tukar cukup sekali, setelah perulangan j selesai.</li>
<li><b>Lupa mengembalikan <code>min = i</code></b> di awal setiap putaran.</li></ul>`)
    ], [
      { q: 'Data: 8, 3, 6, 1, 5. Setelah putaran pertama selection sort, isi array menjadi…', opts: ['1, 3, 6, 8, 5', '1, 3, 5, 6, 8', '3, 8, 6, 1, 5', '1, 8, 6, 3, 5'], ans: 0, exp: 'Angka terkecil adalah 1 di indeks 3. Hanya a[0] dan a[3] yang ditukar: 8 pindah ke indeks 3, sisanya tetap.' },
      { q: 'Yang disimpan di variabel min pada selection sort adalah…', opts: ['Nilai terkecil', 'Indeks nilai terkecil', 'Jumlah pertukaran', 'Nilai terbesar'], ans: 1, exp: 'min menyimpan indeks, supaya setelah pencarian selesai kita tahu posisi mana yang ditukar dengan a[i].' },
      { q: 'Untuk 5 data, paling banyak berapa pertukaran yang dilakukan selection sort?', opts: ['4', '5', '10', '25'], ans: 0, exp: 'Maksimal satu pertukaran per putaran, dan ada n-1 = 4 putaran.' }
    ]),
    L(5, 'insertion-sort', 'Pengurutan', 'Insertion Sort', 'Sisipkan seperti menyusun kartu', [
      A('Apa itu insertion sort?', `<p><b>Insertion sort</b> bekerja seperti menyusun kartu di tangan. Kartu di kiri sudah urut. Ambil kartu berikutnya (<code>key</code>), geser kartu-kartu yang lebih besar satu langkah ke kanan, lalu selipkan key di celah yang terbuka.</p>
<ul><li><code>key</code> = angka yang sedang disisipkan. Disimpan dulu karena posisinya akan ditimpa saat menggeser.</li><li><code>j</code> = posisi yang dibandingkan dengan key, berjalan ke kiri.</li><li><b>Menggeser</b> (<code>a[j + 1] = a[j]</code>) berbeda dengan menukar: hanya menyalin satu arah.</li></ul>
<p><b>Kapan dipakai:</b> data sedikit atau <b>hampir urut</b>. Pada data yang sudah urut, insertion sort hanya butuh sekitar n perbandingan.</p>`),
      lab('insertion', [12, 11, 13, 5, 6], undefined, DESC),
      tbl('Berapa langkah yang dibutuhkan?', ['Keadaan data', 'Perbandingan', 'Contoh'], [
        ['Sudah urut', 'n - 1 (O(n))', '1, 2, 3, 4, 5'],
        ['Acak', 'sekitar n²/4', '3, 5, 1, 4, 2'],
        ['Urut terbalik', 'n(n-1)/2 (O(n²))', '5, 4, 3, 2, 1']
      ]),
      salah(`<ul><li><b>Urutan kondisi <code>a[j] &gt; key &amp;&amp; j &gt;= 0</code></b>. Saat j = -1, a[-1] dibaca dulu sebelum j dicek. Tulis <code>j &gt;= 0</code> lebih dulu, karena <code>&amp;&amp;</code> berhenti begitu bagian kiri false.</li>
<li><b>Menyisipkan di <code>a[j]</code></b>. Setelah perulangan, j menunjuk angka yang <b>tidak</b> lebih besar dari key, jadi key masuk ke <code>a[j + 1]</code>.</li>
<li><b>Tidak menyimpan key</b> dan memakai a[i] langsung. Setelah digeser, a[i] sudah tertimpa.</li></ul>`)
    ], [
      { q: 'Data: 2, 4, 6, 3. Saat i = 3 (key = 3), berapa angka yang digeser ke kanan?', opts: ['0', '1', '2', '3'], ans: 2, exp: '6 > 3 digeser, 4 > 3 digeser, 2 > 3 tidak. Jadi 2 angka digeser dan 3 masuk ke a[1].' },
      { q: 'Pada data yang sudah urut, insertion sort termasuk…', opts: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'], ans: 1, exp: 'Setiap key hanya dibandingkan sekali dengan tetangga kirinya, tidak ada yang digeser.' },
      { q: 'Setelah perulangan while selesai, key disimpan di…', opts: ['a[j]', 'a[j + 1]', 'a[i]', 'a[i - 1]'], ans: 1, exp: 'j berhenti di angka yang tidak lebih besar dari key (atau -1), jadi celahnya ada di j + 1.' }
    ]),
    L(6, 'merge-sort', 'Pengurutan', 'Merge Sort', 'Bagi dua, urutkan, gabungkan', [
      A('Apa itu merge sort?', `<p><b>Merge sort</b> memakai strategi <b>bagi dan taklukkan</b> (<i>divide and conquer</i>):</p>
<ol><li><b>Bagi</b> data menjadi dua bagian sama besar.</li><li><b>Urutkan</b> tiap bagian dengan merge sort juga (fungsi memanggil dirinya sendiri, disebut <b>rekursi</b>). Pembagian berhenti saat bagian tinggal 1 data, karena 1 data pasti urut.</li><li><b>Gabungkan</b> dua bagian yang sudah urut: bandingkan data paling depan kedua bagian, ambil yang lebih kecil ke array bantu <code>tmp</code>, ulangi.</li></ol>
<p><b>Kapan dipakai:</b> data besar, dan saat urutan asli data yang nilainya sama harus tetap terjaga (merge sort bersifat <b>stabil</b>). Kekurangannya, butuh memori tambahan untuk <code>tmp</code>.</p>`),
      lab('merge', [38, 27, 43, 3, 9, 82], undefined, DESC),
      tbl('Pengurutan cepat vs lambat', ['Algoritma', 'Langkah', '10.000 data'], [
        ['Bubble, selection, insertion', 'O(n²)', 'sekitar 50.000.000'],
        ['Merge sort', 'O(n log n)', 'sekitar 130.000']
      ]),
      salah(`<ul><li><b>Lupa kondisi berhenti <code>if (l &gt;= r) return;</code></b>. Tanpa itu fungsi memanggil dirinya terus-menerus sampai program berhenti dengan error (stack overflow).</li>
<li><b>Lupa menyalin sisa</b> (dua <code>while</code> setelah perulangan utama). Saat satu bagian habis, sisa bagian lain belum masuk tmp.</li>
<li><b>Membagi menjadi <code>[l..m-1]</code> dan <code>[m..r]</code></b> padahal m dihitung dengan <code>(l + r) / 2</code>. Untuk dua data (l = 0, r = 1), m = 0 sehingga bagian kiri kosong. Pakai <code>[l..m]</code> dan <code>[m+1..r]</code>.</li></ul>`)
    ], [
      { q: 'Menggabungkan [3, 8] dan [5, 6]. Angka yang masuk tmp kedua adalah…', opts: ['3', '5', '6', '8'], ans: 1, exp: 'Bandingkan 3 dan 5 → ambil 3. Bandingkan 8 dan 5 → ambil 5.' },
      { q: 'Kapan merge sort berhenti membagi data?', opts: ['Saat data sudah urut', 'Saat bagian tinggal 1 data', 'Setelah n putaran', 'Saat menemukan nilai terkecil'], ans: 1, exp: 'Kondisi l >= r berarti bagian berisi 0 atau 1 data, dan itu pasti sudah urut.' },
      { q: 'Notasi waktu merge sort adalah…', opts: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'], ans: 2, exp: 'Ada sekitar log₂ n tingkat pembagian, dan tiap tingkat penggabungan memproses n data.' }
    ]),
    L(7, 'quick-sort', 'Pengurutan', 'Quick Sort', 'Pilih pivot, pisahkan kecil dan besar', [
      A('Apa itu quick sort?', `<p><b>Quick sort</b> juga memakai <b>bagi dan taklukkan</b>, tetapi membaginya dengan cara <b>partisi</b>:</p>
<ol><li>Pilih satu data sebagai <b>pivot</b>. Di sini pivot = data paling kanan (<code>a[high]</code>).</li><li>Pindahkan semua data yang lebih kecil dari pivot ke kiri. <code>i</code> menandai ujung kelompok "lebih kecil", <code>j</code> memeriksa data satu per satu.</li><li>Taruh pivot tepat setelah kelompok kiri. Pivot sekarang sudah di <b>posisi akhirnya</b>.</li><li>Ulangi pada bagian kiri dan kanan pivot (rekursi).</li></ol>
<p><code>swap(a, b)</code> adalah fungsi bawaan C++ untuk menukar dua nilai (dari <code>&lt;algorithm&gt;</code> atau <code>&lt;utility&gt;</code>).</p>
<p><b>Kapan dipakai:</b> pengurutan umum yang cepat dan tidak butuh array tambahan. Banyak fungsi sort di bahasa pemrograman berbasis quick sort.</p>`),
      lab('quick', [10, 80, 30, 90, 40, 50, 70], undefined, DESC),
      tbl('Merge sort vs quick sort', ['', 'Merge sort', 'Quick sort'], [
        ['Cara membagi', 'Selalu di tengah', 'Di posisi pivot'],
        ['Kerja berat di', 'Saat menggabungkan', 'Saat partisi'],
        ['Rata-rata', 'O(n log n)', 'O(n log n)'],
        ['Terburuk', 'O(n log n)', 'O(n²), misalnya data sudah urut dan pivot = data terakhir'],
        ['Memori tambahan', 'Butuh array tmp', 'Tidak perlu array tambahan']
      ]),
      salah(`<ul><li><b>Perulangan j sampai <code>j &lt;= high</code></b>. a[high] adalah pivot itu sendiri; perulangan harus berhenti di <code>j &lt; high</code>.</li>
<li><b>Rekursi memakai <code>p</code> lagi</b>: <code>quickSort(a, low, p)</code>. Pivot di p sudah di tempatnya, jadi bagian berikutnya <code>[low..p-1]</code> dan <code>[p+1..high]</code>. Kalau p ikut, rekursi bisa tidak berhenti.</li>
<li><b>Mengira quick sort selalu cepat.</b> Pada data yang sudah urut dengan pivot di ujung, setiap partisi hanya memisahkan satu data dan waktunya menjadi O(n²).</li></ul>`)
    ], [
      { q: 'Partisi data 7, 2, 9, 4 dengan pivot = data terakhir (4). Di indeks berapa pivot berakhir?', opts: ['0', '1', '2', '3'], ans: 1, exp: 'Hanya 2 yang lebih kecil dari 4, jadi kelompok kiri berisi 1 data dan pivot masuk ke indeks 1.' },
      { q: 'Setelah partisi selesai, yang pasti benar tentang pivot adalah…', opts: ['Pivot berada di indeks 0', 'Pivot sudah di posisi akhirnya', 'Pivot adalah nilai terkecil', 'Pivot berada di tengah array'], ans: 1, exp: 'Semua di kiri lebih kecil dan semua di kanan tidak lebih kecil, jadi pivot tidak akan berpindah lagi.' },
      { q: 'Kapan quick sort (pivot = data terakhir) berjalan paling lambat?', opts: ['Data acak', 'Data sudah urut', 'Data berisi 2 angka', 'Data semuanya berbeda'], ans: 1, exp: 'Pivot selalu yang terbesar, jadi setiap partisi hanya memisahkan satu data dan totalnya O(n²).' }
    ]),

    // ======================= STRUKTUR LINEAR =======================
    L(8, 'stack', 'Struktur linear', 'Stack (Tumpukan)', 'Masuk dan keluar lewat atas', [
      A('Apa itu stack?', `<p><b>Stack</b> (tumpukan) adalah kumpulan data yang hanya bisa ditambah dan diambil dari <b>satu ujung</b>, yaitu bagian atas. Data yang masuk paling akhir selalu keluar paling dulu. Sifat ini disebut <b>LIFO</b> (<i>Last In, First Out</i>), seperti tumpukan piring: piring yang terakhir ditaruh adalah yang pertama diambil.</p>
<ul><li><b>push(x)</b>: menaruh x di atas tumpukan.</li>
<li><b>pop()</b>: mengambil data paling atas dan mengembalikannya.</li>
<li><b>top</b>: indeks data paling atas. <code>top = -1</code> artinya stack kosong, <code>top = MAX - 1</code> artinya penuh.</li></ul>
<p>Di C++ yang paling sederhana, stack dibuat dari <b>array</b> ditambah satu variabel <code>top</code>. Sebelum push harus dicek penuh atau tidak (kalau penuh disebut <i>overflow</i>), dan sebelum pop harus dicek kosong atau tidak (<i>underflow</i>).</p>
<p><b>Kapan dipakai:</b> saat urutan yang dibutuhkan adalah kebalikan urutan masuk. Contohnya tombol Undo, tombol Back di browser, membalik kata, mengecek pasangan kurung <code>( )</code>, dan cara komputer menyimpan pemanggilan fungsi.</p>`),
      lab('stack', [5, 3, 'pop', 8, 1, 'pop', 'pop'], undefined, DESC_OPS),
      tbl('Operasi stack berbasis array', ['Operasi', 'Yang dilakukan', 'Cek dulu', 'Langkah'], [
        ['push(x)', 'top naik 1, lalu st[top] = x', 'top == MAX - 1 (penuh)', 'O(1)'],
        ['pop()', 'ambil st[top], lalu top turun 1', 'top == -1 (kosong)', 'O(1)'],
        ['lihat atas (peek)', 'baca st[top] tanpa mengubah top', 'top == -1 (kosong)', 'O(1)'],
        ['cek kosong', 'top == -1', '–', 'O(1)']
      ], 'Ringkasan'),
      salah(`<ul><li><b>Urutan <code>top++</code> dan <code>st[top] = x</code> terbalik.</b> Kalau ditulis <code>st[top] = x; top++;</code> dengan top awal -1, data pertama ditulis ke st[-1] yang di luar array. Untuk versi top = -1, naikkan top dulu baru isi.</li>
<li><b>Lupa mengecek penuh atau kosong.</b> push pada stack penuh menulis ke luar array, dan pop pada stack kosong membaca st[-1]. Keduanya tidak selalu langsung error, tapi hasilnya ngawur.</li>
<li><b>Mengira pop menghapus isi array.</b> pop cukup menurunkan top. Nilai lama masih tersimpan, tapi dianggap kosong dan akan ditimpa push berikutnya.</li></ul>`)
    ], [
      { q: 'Urutan operasi: push(4), push(7), push(2), pop(), push(9), pop(). Angka berapa yang keluar pada pop() kedua?', opts: ['4', '7', '2', '9'], ans: 3, exp: 'Setelah pop() pertama, 2 keluar dan isi stack 4, 7. push(9) menaruh 9 di atas, jadi pop() kedua mengeluarkan 9.' },
      { q: 'Stack dibuat dengan array berukuran MAX = 5 dan top awal -1. Kondisi stack penuh adalah…', opts: ['top == 5', 'top == 4', 'top == -1', 'top == 0'], ans: 1, exp: 'Indeks array 0 sampai 4. Stack penuh saat top sudah di indeks terakhir, yaitu MAX - 1 = 4.' },
      { q: 'Sifat stack yang benar adalah…', opts: ['FIFO: yang pertama masuk, pertama keluar', 'LIFO: yang terakhir masuk, pertama keluar', 'Data diambil dari tengah', 'Data selalu urut naik'], ans: 1, exp: 'Stack hanya punya satu ujung (atas) untuk masuk dan keluar, jadi yang terakhir masuk selalu keluar duluan.' }
    ]),
    L(9, 'queue', 'Struktur linear', 'Queue (Antrian)', 'Masuk di belakang, keluar di depan', [
      A('Apa itu queue?', `<p><b>Queue</b> (antrian) adalah kumpulan data yang ditambah di <b>belakang</b> dan diambil dari <b>depan</b>. Data yang masuk paling dulu keluar paling dulu. Sifat ini disebut <b>FIFO</b> (<i>First In, First Out</i>), seperti antrean di kasir.</p>
<ul><li><b>enqueue(x)</b>: menaruh x di belakang antrian.</li>
<li><b>dequeue()</b>: mengambil data paling depan.</li>
<li><b>front</b> = indeks data paling depan, <b>rear</b> = indeks data paling belakang, <b>jumlah</b> = banyak data di antrian.</li></ul>
<p>Kalau front dan rear hanya bisa maju, tempat di depan yang sudah ditinggalkan tidak terpakai lagi, sehingga antrian bisa "penuh" padahal masih ada tempat kosong. Karena itu dipakai <b>antrian melingkar</b> (<i>circular queue</i>): setelah indeks terakhir, front dan rear kembali ke 0 dengan rumus <code>(indeks + 1) % MAX</code>.</p>
<p><b>Kapan dipakai:</b> saat data harus dilayani sesuai urutan datang. Contohnya antrean cetak printer, antrean pesan di server, dan buffer data keyboard.</p>`),
      lab('queue', [4, 9, 2, 'deq', 7, 'deq', 6, 5, 8], undefined, DESC_OPS),
      tbl('Stack dan queue', ['', 'Stack', 'Queue'], [
        ['Sifat', 'LIFO (terakhir masuk, pertama keluar)', 'FIFO (pertama masuk, pertama keluar)'],
        ['Masuk lewat', 'atas (top)', 'belakang (rear)'],
        ['Keluar lewat', 'atas (top)', 'depan (front)'],
        ['Nama operasi', 'push, pop', 'enqueue, dequeue'],
        ['Contoh', 'Undo, Back di browser', 'Antrean printer, antrean pelanggan']
      ], 'Bandingkan'),
      salah(`<ul><li><b>Mengecek penuh dengan <code>rear == MAX - 1</code></b> pada antrian melingkar. rear bisa saja di indeks terakhir padahal depan masih kosong. Yang paling aman adalah mencatat <code>jumlah</code> lalu cek <code>jumlah == MAX</code>.</li>
<li><b>Lupa <code>% MAX</code></b> saat menaikkan front atau rear. Tanpa itu indeks terus bertambah sampai keluar dari array.</li>
<li><b>Mengambil dari belakang.</b> dequeue mengambil <code>q[front]</code>, bukan <code>q[rear]</code>. Kalau diambil dari belakang, yang terjadi adalah stack.</li></ul>`)
    ], [
      { q: 'Urutan operasi: enqueue(3), enqueue(8), enqueue(5), dequeue(), enqueue(1). Isi antrian dari depan sekarang adalah…', opts: ['3, 8, 5, 1', '8, 5, 1', '3, 8, 1', '1, 5, 8'], ans: 1, exp: 'dequeue() mengeluarkan 3 yang paling depan. Sisa 8, 5, lalu 1 masuk di belakang.' },
      { q: 'MAX = 5 dan rear = 4. Pada antrian melingkar, enqueue berikutnya menaruh data di indeks…', opts: ['5', '4', '0', '1'], ans: 2, exp: 'rear = (4 + 1) % 5 = 0. Indeks kembali ke awal array.' },
      { q: 'Contoh yang paling cocok memakai queue adalah…', opts: ['Tombol Undo', 'Antrean dokumen yang akan dicetak printer', 'Membalik urutan huruf', 'Riwayat tombol Back'], ans: 1, exp: 'Dokumen dicetak sesuai urutan dikirim (FIFO). Tiga pilihan lain membutuhkan urutan terbalik, jadi memakai stack.' }
    ]),
    L(10, 'linked-list', 'Struktur linear', 'Linked List', 'Node yang saling menunjuk', [
      A('Apa itu linked list?', `<p><b>Linked list</b> menyimpan data dalam <b>node</b> yang terpisah-pisah di memori. Tiap node berisi dua bagian:</p>
<ul><li><code>data</code>: nilai yang disimpan.</li>
<li><code>next</code>: <b>pointer</b> (alamat) ke node berikutnya. Node terakhir punya <code>next = NULL</code>, artinya tidak menunjuk ke mana pun.</li></ul>
<p>Variabel <code>head</code> menunjuk node pertama. Untuk sampai ke node ke-5, kita harus berjalan dari head mengikuti next satu per satu, karena linked list <b>tidak punya indeks</b> seperti array.</p>
<p>Di C++, node dibuat dengan <code>struct</code> dan <code>new</code>, lalu dibuang dengan <code>delete</code>. Tanda <code>-&gt;</code> dipakai untuk membaca isi node lewat pointer: <code>p-&gt;data</code> berarti "data milik node yang ditunjuk p".</p>
<p><b>Kapan dipakai:</b> saat data sering disisipkan atau dihapus, dan banyaknya data tidak bisa diperkirakan. Menghapus cukup mengubah satu next, tanpa menggeser data lain seperti di array.</p>`),
      lab('linked', [12, 7, 25, 3], 25, 'Tekan Lanjut atau tombol panah. Lihat penunjuk p berjalan dari head, dan next yang berubah saat node disambung atau dilepas. Isi angkamu sendiri dan angka yang mau dihapus di bawah.'),
      tbl('Array dan linked list', ['', 'Array', 'Linked list'], [
        ['Ambil data ke-i', 'langsung a[i], O(1)', 'jalan dari head, O(n)'],
        ['Sisip / hapus di depan', 'geser semua data, O(n)', 'ubah head, O(1)'],
        ['Tambah di belakang', 'O(1) jika masih ada tempat', 'O(n) jika harus mencari ekor, O(1) jika menyimpan pointer ekor'],
        ['Ukuran', 'tetap sejak dibuat', 'bisa bertambah selama memori ada'],
        ['Memori tambahan', 'tidak ada', 'satu pointer next per node']
      ], 'Bandingkan'),
      salah(`<ul><li><b>Memakai <code>p-&gt;next</code> saat p sudah NULL.</b> Program bisa berhenti mendadak (segmentation fault). Selalu cek <code>p != NULL</code> atau <code>p-&gt;next != NULL</code> sebelum membaca isi node.</li>
<li><b>Memindahkan head untuk menelusuri.</b> Kalau ditulis <code>head = head-&gt;next</code> di perulangan, node di depan hilang dari list. Pakai penunjuk bantu <code>p = head</code>.</li>
<li><b>Langsung <code>delete</code> sebelum menyambung.</b> Kalau node dibuang dulu, next-nya ikut hilang dan sisa list terputus. Sambungkan <code>p-&gt;next = h-&gt;next</code> dulu, baru <code>delete h</code>.</li></ul>`)
    ], [
      { q: 'Isi node terakhir pada linked list selalu punya next bernilai…', opts: ['0', 'head', 'NULL', 'alamat node pertama'], ans: 2, exp: 'NULL menandai tidak ada node berikutnya, sehingga perulangan penelusuran tahu kapan harus berhenti.' },
      { q: 'List: 4 → 9 → 6 → NULL, p menunjuk node 4. Untuk menghapus 9, perintah yang benar adalah…', opts: ['p->next = p->next->next', 'p = p->next', 'head = head->next', 'p->next = NULL'], ans: 0, exp: 'next milik 4 diarahkan melompati 9, langsung ke 6. Setelah itu node 9 bisa dibuang dengan delete.' },
      { q: 'Kelebihan linked list dibanding array adalah…', opts: ['Bisa mengambil data ke-i secara langsung', 'Menyisipkan dan menghapus tanpa menggeser data lain', 'Tidak butuh memori tambahan', 'Data otomatis urut'], ans: 1, exp: 'Cukup mengubah pointer next. Gantinya, mengambil data ke-i harus berjalan dari head.' }
    ]),

    // ======================= BERCABANG =======================
    L(0, 'binary-search-tree', 'Bercabang', 'Binary Search Tree', 'Kiri lebih kecil, kanan lebih besar', [
      A('Apa itu binary search tree?', `<p><b>Pohon</b> (tree) adalah struktur data bercabang: ada satu node paling atas bernama <b>akar</b> (root), dan setiap node bisa punya <b>anak</b>. Node tanpa anak disebut <b>daun</b> (leaf). Pada <b>binary tree</b>, setiap node punya paling banyak dua anak: kiri dan kanan.</p>
<p><b>Binary search tree (BST)</b> menambahkan satu aturan: semua isi di <b>subpohon kiri lebih kecil</b> dari node itu, dan semua isi di <b>subpohon kanan lebih besar atau sama</b>. Aturan ini membuat pencarian cepat: di setiap node cukup memilih kiri atau kanan, sehingga separuh pohon bisa diabaikan.</p>
<ul><li><b>Sisip:</b> mulai dari akar, bandingkan, turun ke kiri atau kanan sampai menemukan tempat kosong (NULL).</li>
<li><b>Cari:</b> jalur yang sama dengan sisip. Berhenti saat ketemu, atau saat sampai di NULL (tidak ada).</li>
<li><b>Inorder</b> (kiri, node, kanan) selalu menghasilkan data yang urut.</li></ul>
<p><b>Kapan dipakai:</b> data yang sering ditambah dan dicari sekaligus, misalnya kamus atau indeks. Kalau pohonnya seimbang, sisip dan cari O(log n).</p>`),
      lab('bst', [50, 30, 70, 20, 40, 60, 80], 60, 'Tekan Lanjut atau tombol panah. Tebak arah tiap angka di setiap node, lalu lihat pencarian yang hanya menyusuri satu jalur. Coba juga data yang sudah urut (misalnya 10, 20, 30, 40) untuk melihat pohon miring.'),
      tbl('Istilah pohon', ['Istilah', 'Artinya'], [
        ['Akar (root)', 'node paling atas, tidak punya induk'],
        ['Anak / induk', 'node di bawah / di atas sebuah node yang terhubung langsung'],
        ['Daun (leaf)', 'node tanpa anak'],
        ['Tinggi', 'banyak tingkat dari akar sampai daun terjauh'],
        ['Subpohon', 'sebuah node beserta seluruh keturunannya']
      ], 'Istilah'),
      salah(`<ul><li><b>Membandingkan hanya dengan induk langsung.</b> Aturan BST berlaku untuk seluruh subpohon: semua isi di kiri harus lebih kecil dari akar, bukan hanya dari induknya.</li>
<li><b>Lupa menyimpan hasil sisip rekursif.</b> Tulis <code>akar-&gt;kiri = sisip(akar-&gt;kiri, x)</code>. Kalau hanya <code>sisip(akar-&gt;kiri, x)</code>, node baru tidak pernah tersambung.</li>
<li><b>Mengira BST selalu O(log n).</b> Data yang disisipkan sudah urut membuat pohon miring seperti linked list, dan pencarian menjadi O(n).</li></ul>`)
    ], [
      { q: 'Angka 40, 20, 60, 10 disisipkan berurutan ke BST kosong. Di mana posisi 10?', opts: ['Anak kanan 40', 'Anak kiri 20', 'Anak kanan 20', 'Anak kiri 60'], ans: 1, exp: '10 < 40 ke kiri (20), 10 < 20 ke kiri. Anak kiri 20 masih kosong.' },
      { q: 'Penelusuran inorder pada BST menghasilkan data yang…', opts: ['Acak', 'Urut naik', 'Urut sesuai waktu disisipkan', 'Urut turun'], ans: 1, exp: 'Inorder mengunjungi kiri (lebih kecil), node, lalu kanan (lebih besar), jadi hasilnya urut naik.' },
      { q: 'Data 10, 20, 30, 40, 50 disisipkan berurutan. Bentuk pohonnya…', opts: ['Seimbang', 'Miring ke kanan seperti linked list', 'Miring ke kiri', 'Hanya akar'], ans: 1, exp: 'Setiap angka lebih besar dari sebelumnya, jadi selalu menjadi anak kanan. Pencarian menjadi O(n).' }
    ]),
    L(0, 'bfs', 'Bercabang', 'Graf dan BFS (Breadth-First Search)', 'Telusuri melebar memakai antrian', [
      A('Apa itu graf?', `<p><b>Graf</b> terdiri dari <b>simpul</b> (vertex/node) dan <b>sisi</b> (edge) yang menghubungkan dua simpul. Contohnya peta kota (kota dan jalan), jaringan pertemanan, atau jaringan komputer. Berbeda dengan pohon, graf boleh punya siklus dan tidak punya akar.</p>
<p>Cara paling sederhana menyimpan graf di C++ adalah <b>matriks ketetanggaan</b>: <code>adj[u][v] = true</code> jika simpul u dan v terhubung. Untuk graf tak berarah, isi juga <code>adj[v][u]</code>.</p>`, 'Graf'),
      A('BFS', `<p><b>BFS</b> (Breadth-First Search, penelusuran melebar) mengunjungi simpul <b>lapis demi lapis</b>: semua tetangga simpul awal dulu, lalu tetangga dari tetangga, dan seterusnya. Urutannya dijaga dengan <b>queue</b> (antrian): simpul yang ditemukan lebih dulu, dikunjungi lebih dulu.</p>
<ul><li>Masukkan simpul awal ke antrian dan tandai <b>dikunjungi</b>.</li>
<li>Selama antrian belum kosong: ambil simpul paling depan, lalu masukkan semua tetangganya yang belum ditandai.</li>
<li>Tanda dikunjungi wajib, supaya simpul pada siklus tidak masuk antrian berkali-kali.</li></ul>
<p><b>Kapan dipakai:</b> mencari <b>jalur terpendek</b> (jumlah sisi paling sedikit) pada graf tanpa bobot, misalnya rute dengan transit paling sedikit atau "teman dari teman".</p>`, 'BFS'),
      lab('bfs', ['A-B', 'A-C', 'B-D', 'C-D', 'C-E', 'D-F', 'E-F'], 'A', 'Tekan Lanjut atau tombol panah. Lihat antrian di bawah graf: simpul diambil dari depan, tetangga baru masuk di belakang. Tulis sisi grafmu sendiri (misalnya A-B, B-C) dan simpul awalnya.'),
      tbl('Istilah graf', ['Istilah', 'Artinya'], [
        ['Simpul (vertex)', 'titik pada graf, misalnya kota'],
        ['Sisi (edge)', 'garis yang menghubungkan dua simpul, misalnya jalan'],
        ['Tetangga', 'simpul yang terhubung langsung oleh satu sisi'],
        ['Siklus', 'jalur yang bisa kembali ke simpul awal'],
        ['Tak berarah', 'sisi A-B bisa dilewati dua arah']
      ], 'Istilah'),
      salah(`<ul><li><b>Menandai dikunjungi saat diambil, bukan saat dimasukkan.</b> Simpul yang sama bisa masuk antrian dua kali dari dua tetangga berbeda. Tandai tepat saat dimasukkan ke antrian.</li>
<li><b>Lupa mengisi dua arah</b> pada graf tak berarah. Kalau hanya <code>adj[a][b] = true</code>, penelusuran dari b tidak bisa kembali ke a.</li>
<li><b>Memakai stack untuk BFS.</b> Dengan stack, urutannya berubah menjadi mirip DFS dan jalur terpendek tidak terjamin.</li></ul>`)
    ], [
      { q: 'Struktur data yang dipakai BFS untuk menyimpan simpul yang menunggu dikunjungi adalah…', opts: ['Stack', 'Queue (antrian)', 'Array 2D', 'Hash table'], ans: 1, exp: 'Queue memastikan simpul yang ditemukan lebih dulu (lapis lebih dekat) dikunjungi lebih dulu.' },
      { q: 'Graf: A-B, A-C, B-D, C-E. BFS dari A (tetangga dicek urut abjad) mengunjungi…', opts: ['A B D C E', 'A B C D E', 'A C E B D', 'A D B E C'], ans: 1, exp: 'Lapis 1: B, C. Lapis 2: D (dari B), E (dari C).' },
      { q: 'Mengapa BFS perlu menandai simpul yang sudah dikunjungi?', opts: ['Supaya urut abjad', 'Supaya simpul pada siklus tidak diproses berulang-ulang', 'Supaya antrian lebih panjang', 'Agar bisa dipakai di pohon saja'], ans: 1, exp: 'Pada graf dengan siklus, tanpa tanda simpul akan terus masuk antrian dan penelusuran tidak pernah selesai.' }
    ]),
    L(0, 'dfs', 'Bercabang', 'DFS (Depth-First Search)', 'Telusuri sedalam mungkin, lalu mundur', [
      A('Apa itu DFS?', `<p><b>DFS</b> (Depth-First Search, penelusuran mendalam) dari sebuah simpul langsung masuk ke tetangga pertama yang belum dikunjungi, lalu ke tetangganya lagi, <b>sedalam mungkin</b>. Kalau sudah buntu (semua tetangga sudah dikunjungi), DFS <b>mundur</b> (backtrack) ke simpul sebelumnya dan mencoba tetangga berikutnya.</p>
<ul><li>Cara paling ringkas menulis DFS adalah <b>rekursif</b>: <code>dfs(u)</code> menandai u, lalu memanggil <code>dfs(v)</code> untuk setiap tetangga v yang belum dikunjungi.</li>
<li>Mundurnya terjadi otomatis: saat <code>dfs(v)</code> selesai, eksekusi kembali ke <code>dfs(u)</code> yang menunggu di call stack.</li>
<li>Versi tanpa rekursi memakai <b>stack</b> sendiri. Bandingkan dengan BFS yang memakai <b>queue</b>.</li></ul>
<p><b>Kapan dipakai:</b> mengecek apakah dua simpul terhubung, mencari jalan keluar labirin, mendeteksi siklus, dan mencoba semua kemungkinan (backtracking), misalnya sudoku.</p>`),
      lab('dfs', ['A-B', 'A-C', 'B-D', 'C-D', 'C-E', 'D-F', 'E-F'], 'A', 'Tekan Lanjut atau tombol panah. Lihat call stack di bawah graf: DFS masuk sedalam mungkin, lalu mundur. Graf contohnya sama dengan pelajaran BFS supaya urutannya bisa dibandingkan.'),
      tbl('BFS dan DFS', ['', 'BFS', 'DFS'], [
        ['Arah penelusuran', 'melebar, lapis demi lapis', 'mendalam dulu, lalu mundur'],
        ['Struktur bantu', 'queue (antrian)', 'stack / rekursi (call stack)'],
        ['Jalur terpendek (tanpa bobot)', 'ya', 'tidak dijamin'],
        ['Cocok untuk', 'jarak terdekat, lapisan pertemanan', 'keterhubungan, labirin, backtracking'],
        ['Kompleksitas (matriks ketetanggaan)', 'O(V²)', 'O(V²)']
      ], 'Bandingkan'),
      salah(`<ul><li><b>Tidak menandai dikunjungi di awal fungsi.</b> Kalau tanda dipasang setelah perulangan, dua simpul yang saling terhubung akan saling memanggil tanpa henti (stack overflow).</li>
<li><b>Mengira DFS menghasilkan jalur terpendek.</b> DFS bisa menemukan tujuan lewat jalur yang memutar. Untuk jarak terdekat pakai BFS.</li>
<li><b>Lupa mengosongkan tanda</b> sebelum menjalankan DFS kedua dari simpul lain. Simpul yang masih bertanda dari penelusuran sebelumnya akan dilewati.</li></ul>`)
    ], [
      { q: 'Graf: A-B, A-C, B-D, C-E. DFS dari A (tetangga dicek urut abjad) mengunjungi…', opts: ['A B C D E', 'A B D C E', 'A C E B D', 'A D B C E'], ans: 1, exp: 'A → B → D (buntu, mundur ke B, lalu ke A) → C → E.' },
      { q: 'Pada DFS rekursif, apa yang mengingat simpul tempat kembali saat buntu?', opts: ['Queue', 'Call stack', 'Array dikunjungi', 'Hash table'], ans: 1, exp: 'Setiap dfs(u) yang belum selesai menunggu di call stack, sehingga eksekusi otomatis kembali ke sana.' },
      { q: 'Untuk mencari rute dengan jumlah transit paling sedikit, algoritma yang tepat adalah…', opts: ['DFS', 'BFS', 'Bubble sort', 'Pencarian linear'], ans: 1, exp: 'BFS mengunjungi lapis demi lapis, jadi simpul tujuan pertama kali ditemukan lewat jumlah sisi paling sedikit.' }
    ]),
    L(0, 'hash-table', 'Bercabang', 'Hash Table', 'Tempat dihitung dari datanya', [
      A('Apa itu hash table?', `<p><b>Hash table</b> menyimpan data di array, tetapi posisinya <b>dihitung</b> dari datanya sendiri memakai <b>fungsi hash</b>. Contoh paling sederhana: <code>hash(k) = k % M</code>, sisa bagi k dengan ukuran tabel M. Untuk mencari, posisi dihitung lagi dengan rumus yang sama, sehingga tidak perlu memeriksa satu per satu.</p>
<ul><li><b>Tabrakan</b> (collision): dua data menghasilkan posisi yang sama, misalnya 25 dan 35 sama-sama 5 jika M = 10.</li>
<li><b>Linear probing</b>: kalau tempatnya terisi, coba tempat berikutnya <code>(i + 1) % M</code> sampai menemukan yang kosong.</li>
<li><b>Chaining</b>: cara lain, setiap tempat berisi linked list sehingga data yang bertabrakan disambung di tempat yang sama.</li></ul>
<p><b>Kapan dipakai:</b> saat data sering dicari berdasarkan kuncinya, misalnya NIM ke data mahasiswa, kata ke artinya, atau username ke akun. Rata-rata sisip dan cari O(1).</p>`),
      lab('hash', [25, 35, 41, 15, 9, 19], 15, 'Tekan Lanjut atau tombol panah. Tebak tempat awal tiap angka (angka satuannya), lalu lihat apa yang terjadi saat tempatnya sudah terisi. Isi angkamu sendiri dan angka yang dicari di bawah.'),
      tbl('Membandingkan cara mencari', ['Struktur', 'Cari rata-rata', 'Syarat'], [
        ['Array + pencarian linear', 'O(n)', 'tidak ada'],
        ['Array urut + pencarian biner', 'O(log n)', 'data harus urut'],
        ['BST seimbang', 'O(log n)', 'pohon tidak miring'],
        ['Hash table', 'O(1)', 'fungsi hash yang menyebar rata, tabel tidak terlalu penuh']
      ], 'Bandingkan'),
      salah(`<ul><li><b>Berhenti mencari di tempat awal.</b> Kalau tempat hash berisi angka lain, data yang dicari mungkin bergeser karena tabrakan. Teruskan sampai ketemu atau sampai bertemu tempat kosong.</li>
<li><b>Lupa <code>% M</code> saat maju.</b> Tanpa itu, indeks setelah M - 1 keluar dari array, padahal seharusnya kembali ke 0.</li>
<li><b>Tabel terlalu penuh.</b> Semakin penuh, semakin panjang deretan tabrakan dan pencarian mendekati O(n). Pilih M lebih besar dari banyak data.</li></ul>`)
    ], [
      { q: 'Dengan hash(k) = k % 10, angka 47 disimpan di indeks…', opts: ['4', '7', '47', '0'], ans: 1, exp: '47 % 10 = 7.' },
      { q: 'Tabel M = 10 berisi 25 di indeks 5. Dengan linear probing, angka 35 disimpan di…', opts: ['Indeks 5, menimpa 25', 'Indeks 6', 'Indeks 3', 'Tidak bisa disimpan'], ans: 1, exp: '35 % 10 = 5 sudah terisi (tabrakan), jadi coba (5 + 1) % 10 = 6.' },
      { q: 'Keunggulan utama hash table adalah…', opts: ['Data selalu urut', 'Pencarian rata-rata O(1)', 'Tidak pernah terjadi tabrakan', 'Tidak butuh array'], ans: 1, exp: 'Posisi data dihitung langsung dari kuncinya, jadi rata-rata cukup satu pemeriksaan.' }
    ])
  ]
};
// Nomor pelajaran mengikuti urutan di atas (Dasar dulu), supaya menyisipkan pelajaran baru tidak perlu menomori ulang.
SDA.meetings.forEach((m, i) => { m.nomor = i + 1; });
module.exports = SDA;
