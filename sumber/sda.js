// Section "Struktur Data & Algoritma": pelajaran mandiri di luar jadwal pertemuan kuliah.
// Tiap pelajaran = penjelasan singkat + lab langkah demi langkah (blok algo-lab) + tabel kapan dipakai + kesalahan umum.
// Kodenya C++ seperti di mata kuliah Algoritma dan Pemrograman.
const A = (title, html, label) => ({ type: 'article', label, title, html });
const lab = (algo, data, target, desc) => ({ type: 'algo-lab', algo, data, target, label: 'Lab algoritma', title: 'Jalankan langkah demi langkah', desc });
const tbl = (title, headers, rows, label) => ({ type: 'table', label: label || 'Ringkasan', title, headers, rows });
const salah = html => ({ type: 'callout', tone: 'rose', heading: 'Kesalahan yang sering terjadi', html });
const DESC = 'Tekan Lanjut atau tombol panah. Baris kode yang sedang dijalankan menyala, dan isi variabel ikut berubah. Pilih "Tebak dulu" untuk menjawab sebelum langkahnya dibuka, atau isi angkamu sendiri di bawah.';
const L = (nomor, id, bab, judul, ket, materi, quiz) => ({ id, nomor, bab, judul, ket, ujian: 'Latihan', materi, cheatsheet: [], simulator: [], flashcards: [], quiz });

const OH = tbl('Cara membaca O(…)', ['Notasi', 'Artinya', '1.000 data', '1.000.000 data'], [
  ['O(log n)', 'Langkah bertambah 1 setiap data menjadi 2 kali lipat', '± 10 langkah', '± 20 langkah'],
  ['O(n)', 'Langkah sebanding dengan banyak data', '1.000 langkah', '1.000.000 langkah'],
  ['O(n log n)', 'Sedikit di atas n', '± 10.000 langkah', '± 20.000.000 langkah'],
  ['O(n²)', 'Data 2 kali lipat, langkah 4 kali lipat', '± 1.000.000 langkah', '± 1.000.000.000.000 langkah']
], 'Notasi Big-O');

module.exports = {
  id: 'struktur-data-algoritma', nama: 'Struktur Data & Algoritma', jalur: true,
  ket: 'Pelajaran mandiri di luar jadwal kuliah. Tiap algoritma bisa dijalankan langkah demi langkah: batang bergerak, baris kode C++ yang sedang jalan menyala, dan isi variabel terlihat.',
  meetings: [
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
    ])
  ]
};
