// Isi lab interaktif tahap 3 (mesinnya di web/src/scripts/labs.js).
// DSI P2 (5K), Bahasa Indonesia P3 (imbuhan) & P5–P6 (kalimat efektif), Bahasa Inggris P2/P3/P5/P7 (kalimat), P3 (jam), P6 (rute Karen).

const DSI_5K = {
  type: "lab-5k", label: "Lab DSI • Data Jadi Informasi", title: "Data Mentah Jadi Informasi dengan 5K",
  desc: "Ini rekap nilai satu kelas, masih mentah. Nyalakan langkah 5K satu per satu dan lihat tabelnya berubah menjadi laporan. Coba juga matikan satu langkah untuk melihat akibatnya.",
  tip: "Contoh data buatan. Bobot nilai akhir hanya untuk latihan.",
  cols: [
    { key: "nim", label: "NIM", mono: true }, { key: "nama", label: "Nama" },
    { key: "hp", label: "No. HP", drop: true, mono: true }, { key: "kota", label: "Kota", drop: true },
    { key: "tugas", label: "Tugas" }, { key: "uts", label: "UTS" }, { key: "uas", label: "UAS" }
  ],
  rows: [
    { nim: "2501001", nama: "Andi Pratama", hp: "0812-3301-4410", kota: "Surakarta", tugas: 80, uts: 75, uas: 78 },
    { nim: "2501002", nama: "Budi Santoso", hp: "0857-2290-1187", kota: "Klaten", tugas: 70, uts: 60, uas: 55 },
    { nim: "2501002", nama: "Budi Santoso", hp: "0857-2290-1187", kota: "Klaten", tugas: 70, uts: 60, uas: 55 },
    { nim: "2501003", nama: "Citra Lestari", hp: "0813-9045-2271", kota: "Sukoharjo", tugas: 90, uts: 88, uas: 92 },
    { nim: "2501004", nama: "Dimas Saputra", hp: "0896-1172-5530", kota: "Boyolali", tugas: 50, uts: 45, uas: 52 },
    { nim: "2501005", nama: "Eka Wulandari", hp: "0821-4467-9012", kota: "Karanganyar", tugas: 85, uts: 80, uas: 830 },
    { nim: "2501006", nama: "Fajar Nugroho", hp: "0838-2205-6674", kota: "Sragen", tugas: 65, uts: 58, uas: 50 },
    { nim: "2501007", nama: "Gita Ramadhani", hp: "0815-7781-3396", kota: "Wonogiri", tugas: 78, uts: 82, uas: 88 }
  ],
  dupes: [2],
  fixes: [{ row: 5, col: "uas", from: 830, to: 83 }],
  weights: { tugas: 0.3, uts: 0.3, uas: 0.4 },
  pass: 60,
  warnKoreksi: "Data masih mengandung kesalahan: Budi terinput dua kali dan UAS Eka salah ketik (830). Keduanya ikut terhitung.",
  notes: {
    kondensasi: "kolom No. HP dan Kota dibuang karena tidak dibutuhkan untuk menilai.",
    koreksi: "baris Budi yang terinput dua kali dihapus, dan UAS Eka yang salah ketik (830) dibetulkan menjadi 83.",
    kalkulasi: "nilai akhir = 30% tugas + 30% UTS + 40% UAS, lalu dihitung rata-rata kelas.",
    kategorisasi: "nilai akhir ≥ 60 dikelompokkan <em>Lulus</em>, di bawahnya <em>Remedial</em>."
  },
  contexts: [
    { id: "kelas", label: "Evaluasi kelas", note: "data dibaca untuk evaluasi kelas, jadi yang dilihat adalah rata-rata dan siapa yang perlu remedial." },
    { id: "beasiswa", label: "Seleksi beasiswa", short: "beasiswa", min: 80, sort: true, note: "data yang sama dibaca untuk seleksi beasiswa: diurutkan dari nilai tertinggi, dan yang dicari nilai akhir ≥ 80. Data yang sama bisa menghasilkan informasi berbeda, tergantung untuk apa data itu dikumpulkan." }
  ]
};

const BINDO_IMBUHAN = {
  type: "lab-imbuhan", label: "Lab Bahasa • Perakit Imbuhan", title: "Perakit Imbuhan meN- dan peN-",
  desc: "Ketik kata dasar sendiri, pilih imbuhannya, lalu lihat bentuk jadinya dan aturan peluluhan mana yang berlaku. Baris aturan yang dipakai ikut ditandai di tabel.",
  tip: "Mengikuti aturan umum. Kata yang punya bentuk khusus (misalnya pemrotes) diberi catatan sendiri.",
  start: "sukses", startAffix: 1, cek: true,
  affixes: [
    { label: "meN-", pre: "me" }, { label: "meN-…-kan", pre: "me", suf: "kan" }, { label: "meN-…-i", pre: "me", suf: "i" },
    { label: "peN-", pre: "pe" }, { label: "peN-…-an", pre: "pe", suf: "an" }
  ],
  try: ["konsumsi", "telaah", "sukses", "pelihara", "kritik", "transfer", "sponsor", "baca", "tulis", "ambil", "bom", "protes", "punya"],
  special: [
    { word: "protes", affix: "peN-", res: "pemrotes", note: "Bentuk khusus yang disebut materi: <em>pemrotes</em>. Huruf p hilang walau diikuti r, padahal dengan meN- tetap <em>memprotes</em>." },
    { word: "punya", pre: "me", res: "mempunyai", note: "<em>mempunyai</em> adalah pengecualian yang sudah baku (meN- + punya + -i): huruf p tidak luluh." }
  ],
  rules: [
    { id: "vokal", awal: "vokal (a, i, u, e, o)", jadi: "meng- / peng-", contoh: "mengambil, pengamat" },
    { id: "gh", awal: "g, h, kh", jadi: "meng- / peng-", contoh: "menggali, menghitung" },
    { id: "k", awal: "<strong>k</strong> + vokal → k luluh", jadi: "meng- / peng-", contoh: "mengonsumsi, pengirim" },
    { id: "lmnrwy", awal: "l, m, n, r, w, y, ny, ng", jadi: "me- / pe-", contoh: "melempar, merawat, pelempar" },
    { id: "bfv", awal: "b, f, v", jadi: "mem- / pem-", contoh: "membaca, pembaca" },
    { id: "p", awal: "<strong>p</strong> + vokal → p luluh", jadi: "mem- / pem-", contoh: "memelihara, pemakai" },
    { id: "cdj", awal: "c, d, j, z, sy", jadi: "men- / pen-", contoh: "mencari, pendengar" },
    { id: "t", awal: "<strong>t</strong> + vokal → t luluh", jadi: "men- / pen-", contoh: "menelaah, penulis" },
    { id: "s", awal: "<strong>s</strong> + vokal → s luluh", jadi: "meny- / peny-", contoh: "menyurvei, penyapu" },
    { id: "gugus", awal: "k/t/s/p + konsonan (kr, tr, sp, pr…)", jadi: "tidak luluh", contoh: "mengkritik, mentransfer, mensponsori" },
    { id: "satu", awal: "kata satu suku kata", jadi: "menge- / penge-", contoh: "mengebom, pengecat" }
  ]
};

const BINDO_KALIMAT = {
  type: "lab-kalimat", label: "Lab Bahasa • Bengkel Kalimat", title: "Bengkel Kalimat Efektif",
  desc: "Klik kata yang bermasalah, lalu hapus atau ganti. Beberapa kalimat punya lebih dari satu perbaikan yang benar, dan tiap versi dijelaskan.",
  items: [
    {
      tokens: ["Para", "tamu-tamu", "dipersilakan", "masuk", "agar", "supaya", "acara", "dapat", "segera", "dimulai."],
      alt: { 1: ["tamu"] }, syarat: "Kehematan", why: "Hindari kata bermakna sama yang berdampingan: <em>para</em> + bentuk ulang, <em>agar</em> + <em>supaya</em>.",
      accept: [
        { text: "Para tamu dipersilakan masuk agar acara dapat segera dimulai." },
        { text: "Para tamu dipersilakan masuk supaya acara dapat segera dimulai." },
        { text: "Tamu-tamu dipersilakan masuk agar acara dapat segera dimulai." },
        { text: "Tamu-tamu dipersilakan masuk supaya acara dapat segera dimulai." }
      ],
      hints: [
        { has: "para tamu-tamu", msg: "<em>para</em> sudah menyatakan jamak, jadi bentuk ulang <em>tamu-tamu</em> berlebih. Pilih salah satu." },
        { has: "agar supaya", msg: "<em>agar</em> dan <em>supaya</em> bersinonim. Cukup pakai salah satu." }
      ]
    },
    {
      tokens: ["Dalam", "rapat", "itu", "membahas", "anggaran", "kegiatan."],
      alt: { 3: ["dibahas"] }, syarat: "Kesepadanan", why: "Subjek tidak boleh didahului kata depan seperti <em>dalam</em>, <em>di</em>, <em>kepada</em>, <em>bagi</em>.",
      accept: [
        { text: "Rapat itu membahas anggaran kegiatan.", why: "Tanpa kata depan, <em>rapat itu</em> menjadi subjek yang membahas." },
        { text: "Dalam rapat itu dibahas anggaran kegiatan.", why: "Dengan predikat pasif, <em>anggaran kegiatan</em> menjadi subjek dan <em>dalam rapat itu</em> keterangan." }
      ],
      hints: [
        { has: "dalam rapat itu membahas", msg: "Kalimat ini belum punya subjek: <em>dalam rapat itu</em> adalah keterangan karena diawali kata depan. Siapa yang membahas?" },
        { has: "rapat itu dibahas", msg: "Kalau kata depannya dihapus, <em>rapat itu</em> menjadi pelaku, jadi predikatnya tetap aktif: <em>membahas</em>." }
      ]
    },
    {
      tokens: ["Untuk", "mempersingkat", "waktu,", "kami", "lanjutkan", "acara", "ini."],
      alt: { 1: ["menghemat", "mempercepat"] }, syarat: "Kelogisan", why: "Waktu bisa dihemat, tetapi tidak bisa dipersingkat atau dipercepat.",
      accept: [{ text: "Untuk menghemat waktu, kami lanjutkan acara ini." }],
      hints: [
        { has: "mempercepat waktu", msg: "Waktu juga tidak bisa dipercepat. Apa yang bisa kita lakukan terhadap waktu?" },
        { has: "mempersingkat waktu", msg: "Bisakah waktu dipersingkat? Pikirkan apa yang sebenarnya ingin dicapai pembawa acara." }
      ],
      miss: "Kalimatnya jadi kehilangan bagian penting. Cukup ganti satu kata yang tidak logis."
    },
    {
      tokens: ["Karena", "dia", "tidak", "diajak,", "dia", "tidak", "ikut", "rapat."],
      syarat: "Kehematan", why: "Subjek yang sama cukup disebut sekali, yaitu di induk kalimat.",
      accept: [{ text: "Karena tidak diajak, dia tidak ikut rapat." }],
      hints: [
        { has: "karena dia tidak diajak, dia", msg: "Subjek <em>dia</em> disebut dua kali. Subjek anak kalimat boleh dihilangkan karena sama dengan subjek induk kalimat." },
        { has: "karena dia tidak diajak, tidak", msg: "Yang terhapus justru subjek induk kalimat. Hapus <em>dia</em> yang di anak kalimat (setelah <em>karena</em>)." }
      ]
    },
    {
      tokens: ["Panitia", "bertugas", "mendata", "peserta,", "menyusun", "jadwal,", "dan", "pencetakan", "sertifikat."],
      alt: { 7: ["mencetak", "cetak"] }, syarat: "Keparalelan", why: "Unsur yang dirinci harus berbentuk sama.",
      accept: [{ text: "Panitia bertugas mendata peserta, menyusun jadwal, dan mencetak sertifikat.", why: "Ketiga tugas kini sama-sama kata kerja ber-meN-: mendata, menyusun, mencetak." }],
      hints: [
        { has: "pencetakan", msg: "<em>mendata</em> dan <em>menyusun</em> adalah kata kerja, sedangkan <em>pencetakan</em> kata benda. Bentuknya harus sejajar." },
        { has: "dan cetak", msg: "Sudah kata kerja, tetapi bentuknya harus sama dengan dua tugas lainnya (meN-)." }
      ]
    }
  ]
};

const BINDO_KALIMAT_P6 = {
  type: "lab-kalimat", label: "Lab Bahasa • Bengkel Kalimat Lanjutan", title: "Bengkel Transitif, Anak Kalimat, dan Tanda Koma",
  desc: "Klik bagian yang bermasalah untuk mengganti kata atau mengatur tanda koma sesuai kaidah kalimat aktif transitif/intransitif dan kalimat majemuk bertingkat.",
  items: [
    {
      tokens: ["Seluruh", "karyawan", "sedang", "mendiskusikan", "tentang", "kenaikan", "tunjangan."],
      alt: { 3: ["berdiskusi"] }, syarat: "Transitif vs Intransitif",
      why: "Predikat transitif (<em>mendiskusikan</em>) langsung diikuti objek tanpa kata depan <em>tentang</em>; predikat intransitif (<em>berdiskusi</em>) diikuti <em>tentang</em>.",
      accept: [
        { text: "Seluruh karyawan sedang mendiskusikan kenaikan tunjangan.", why: "Transitif: <em>mendiskusikan</em> (P) langsung diikuti objek <em>kenaikan tunjangan</em> (O) tanpa <em>tentang</em>." },
        { text: "Seluruh karyawan sedang berdiskusi tentang kenaikan tunjangan.", why: "Intransitif: <em>berdiskusi</em> (P) diikuti keterangan/pelengkap berpreposisi <em>tentang kenaikan tunjangan</em>." }
      ],
      hints: [
        { has: "mendiskusikan tentang", msg: "<em>mendiskusikan</em> sudah transitif, jadi tidak boleh diikuti <em>tentang</em>. Hapus <em>tentang</em> atau ganti predikatnya menjadi <em>berdiskusi</em>." },
        { has: "berdiskusi kenaikan", msg: "<em>berdiskusi</em> adalah kata kerja intransitif, sehingga membutuhkan kata depan <em>tentang</em>." }
      ]
    },
    {
      tokens: ["Walaupun", "sedang", "sakit", "Arman", "tetap", "datang", "ke", "kampus."],
      alt: { 2: ["sakit,"] }, syarat: "Anak Kalimat di Depan",
      why: "Anak kalimat yang mendahului induk kalimat dipisahkan dengan tanda koma.",
      accept: [
        { text: "Walaupun sedang sakit, Arman tetap datang ke kampus.", why: "Anak kalimat <em>Walaupun sedang sakit</em> mendahului induk kalimat, sehingga wajib diberi tanda koma." }
      ],
      hints: [
        { has: "walaupun sedang sakit arman", msg: "Anak kalimat berada di depan induk kalimat. Klik kata terakhir anak kalimat (<em>sakit</em>) untuk menambahkan tanda koma." }
      ]
    },
    {
      tokens: ["Arman", "tetap", "datang,", "walaupun", "sedang", "sakit."],
      alt: { 2: ["datang"] }, syarat: "Induk Kalimat di Depan",
      why: "Jika induk kalimat mendahului anak kalimat, tanda koma tidak dipakai sebelum konjungsi bertingkat.",
      accept: [
        { text: "Arman tetap datang walaupun sedang sakit.", why: "Induk kalimat berada di depan dan anak kalimat di belakang, jadi tidak dipisahkan tanda koma." }
      ],
      hints: [
        { has: "datang, walaupun", msg: "Anak kalimat berada di belakang induk kalimat. Klik <em>datang,</em> dan ganti menjadi tanpa koma." }
      ]
    },
    {
      tokens: ["Mobil", "akan", "diperbaiki", "itu", "harus", "diambil", "sekarang."],
      alt: { 1: ["yang akan"] }, syarat: "KMB Perluasan Subjek",
      why: "Klausa perluasan subjek dihubungkan dengan konjungsi <em>yang</em> agar tidak ada dua predikat bertabrakan.",
      accept: [
        { text: "Mobil yang akan diperbaiki itu harus diambil sekarang.", why: "<em>Mobil yang akan diperbaiki itu</em> menjadi subjek perluasan (S), dan <em>harus diambil</em> predikat utama (P)." },
        { text: "Mobil yang akan diperbaiki harus diambil sekarang.", why: "<em>Mobil yang akan diperbaiki</em> menjadi subjek perluasan (S), dan <em>harus diambil</em> predikat utama (P)." }
      ],
      hints: [
        { has: "mobil akan diperbaiki", msg: "Ada dua predikat bertabrakan tanpa penghubung. Klik <em>akan</em> dan ganti menjadi <em>yang akan</em> untuk memperluas subjek." }
      ]
    }
  ]
};

const EN_P2 = {
  type: "lab-kalimat-en", label: "Lab Bahasa Inggris • Perakit Kalimat", title: "Ganti Subjek, Lihat am/is/are Berubah",
  desc: "Pilih subjek, keterangan, dan bentuk kalimat. Bagian yang ikut berubah ditandai, termasuk a/an yang hilang saat subjeknya jamak.",
  subjects: ["I", "You", "He", "She", "We", "They", "My sister"],
  verbs: [
    { label: "be a student", be: true, sg: "a student", pl: "students" },
    { label: "be an engineer", be: true, sg: "an engineer", pl: "engineers" },
    { label: "be from Indonesia", be: true, sg: "from Indonesia", pl: "from Indonesia" },
    { label: "be at home", be: true, sg: "at home", pl: "at home" }
  ],
  start: { sub: "She", vb: 1, form: "pos" }
};
const EN_VERBS = [
  { label: "live in Solo", v: "live", rest: "in Solo" }, { label: "work for a bank", v: "work", rest: "for a bank" },
  { label: "get up early", v: "get", rest: "up early" }, { label: "have breakfast", v: "have", rest: "breakfast" },
  { label: "go home", v: "go", rest: "home" }, { label: "study English", v: "study", rest: "English" },
  { label: "watch TV", v: "watch", rest: "TV" }
];
const EN_P3 = {
  type: "lab-kalimat-en", label: "Lab Bahasa Inggris • Perakit Kalimat", title: "Present Simple: Positif, Negatif, Pertanyaan",
  desc: "Pilih subjek, kata kerja, dan bentuk kalimat. Perhatikan kapan muncul do/don't dan kapan kata kerjanya berubah. He/she dibahas lengkap di P5, tapi sudah bisa dicoba di sini.",
  subjects: ["I", "You", "We", "They", "He", "She", "My brother"],
  verbs: EN_VERBS,
  start: { sub: "They", vb: 0, form: "neg" }
};
const EN_P5 = {
  type: "lab-kalimat-en", label: "Lab Bahasa Inggris • Perakit Kalimat", title: "Ganti Subjek, Lihat -s/-es dan does Berubah",
  desc: "Pilih subjek, kata kerja, dan bentuk kalimat. Bagian yang ikut berubah (-s/-es/-ies, has, does/doesn't) ditandai.",
  subjects: ["I", "You", "He", "She", "We", "They", "My brother"],
  verbs: [{ label: "like cooking", v: "like", rest: "cooking" }, { label: "watch TV", v: "watch", rest: "TV" }, { label: "study English", v: "study", rest: "English" }, { label: "go to the gym", v: "go", rest: "to the gym" }, { label: "have lunch", v: "have", rest: "lunch" }, { label: "be a nurse", be: true, sg: "a nurse", pl: "nurses" }],
  start: { sub: "She", vb: 1, form: "q" }
};

const EN_P7 = {
  type: "lab-kalimat-en", label: "Lab Bahasa Inggris • Countable & Uncountable", title: "There is/are, some/any, dan How much/many",
  desc: "Pilih kata benda dan bentuk kalimatnya. Perhatikan bagaimana jenis benda (countable tunggal, countable jamak, atau uncountable) menentukan is/are, a/some/any, dan How much/How many.",
  nouns: [
    { label: "a banana (1 benda)", kind: "sg", sg: "a banana", pl: "bananas", bare: "banana" },
    { label: "eggs (jamak)", kind: "pl", pl: "eggs", pos: "eight eggs" },
    { label: "strawberries (jamak)", kind: "pl", pl: "strawberries", pos: "some strawberries" },
    { label: "milk (uncountable)", kind: "unc", w: "milk" },
    { label: "butter (uncountable)", kind: "unc", w: "butter" },
    { label: "bread (uncountable)", kind: "unc", w: "bread", note: "Jebakan: <em>bread</em> uncountable (bukan <em>a bread / breads</em>). Yang countable: <em>a bread roll</em>." },
    { label: "cups of coffee (wadah)", kind: "pl", pl: "cups of coffee", pos: "two cups of coffee", note: "<em>coffee</em> uncountable, tetapi wadahnya (<em>cups</em>) countable jamak." }
  ],
  start: { vb: 3, form: "pos" }
};

const EN_JAM = {
  type: "lab-jam", label: "Lab Bahasa Inggris • Jam Interaktif", title: "Jam Interaktif: past dan to",
  desc: "Seret jarum menit (titik kuning), atau pakai tombol ±1 dan ±5 menit. Lihat cara mengucapkan jamnya dan dengarkan pelafalannya.",
  start: 520, presets: [435, 570, 520, 405, 190, 5, 175, 600]
};

const EN_RUTE = {
  type: "lab-rute", label: "Simulasi 4 • Rute ke JFK Airport", title: "Bantu Karen ke JFK Airport",
  desc: "Karen ada di Metropolitan Museum of Art. Ia punya $25, sekarang <em>ten past three</em>, dan harus tiba di JFK <em>half past four</em>. Pilih rute dan lihat uang serta jam tibanya. Coba semua rute.",
  start: 910, money: 25, due: 990, place: "JFK",
  routes: [
    { label: "🚕 Taxi", info: "$35 + tip 15–20% · ±1 jam", cost: 35, mins: 60, say: "She <strong>can't</strong> take a taxi because she's only got $25." },
    { label: "🚇 Subway A + bus", info: "$2 · ±90 menit", cost: 2, mins: 90,
      steps: [{ at: 0, text: "Naik subway jalur A ($2)." }, { at: 90, text: "Tiba di JFK." }],
      say: "She <strong>can</strong> afford it, but she <strong>can't</strong> get there by half past four." },
    { label: "🚶 Walk + subway + AirTrain", info: "$2 + $5 · 20 + 60 + 12 menit", cost: 7, mins: 92,
      steps: [{ at: 0, text: "Jalan kaki ke stasiun (20 menit)." }, { at: 20, text: "Naik subway ($2, 60 menit)." }, { at: 80, text: "Naik AirTrain ($5, 12 menit)." }, { at: 92, text: "Tiba di JFK." }],
      say: "She <strong>can</strong> pay for it, but she <strong>can't</strong> get there on time. The journey takes an hour and a half." },
    { label: "🚌 Subway + Airport Express bus", info: "$2 + $13 · bus tiap 20 menit, ±1 jam", cost: 15, mins: 70,
      steps: [{ at: 0, text: "Naik subway ke Grand Central ($2, 5 menit)." }, { at: 5, text: "Menunggu bus. Bus berangkat tiap 20 menit: 15.00, 15.20, 15.40…" }, { at: 10, text: "Naik New York Airport Express bus ($13)." }, { at: 70, text: "Tiba di JFK." }],
      say: "She <strong>can</strong> take a bus at twenty past three, and she <strong>can</strong> get there before half past four." }
  ],
  wrap: "<p>She <strong>can't</strong> take a taxi because she's only got $25.</p><p>She <strong>can</strong> take the subway, but she <strong>can't</strong> get there by half past four.</p><p>She <strong>can</strong> take the Airport Express bus at twenty past three.</p><p><em>can</em> sama untuk semua subjek dan selalu diikuti kata kerja bentuk dasar: <em>can take</em>, bukan <em>can to take</em> atau <em>can takes</em>.</p>"
};

module.exports = { DSI_5K, BINDO_IMBUHAN, BINDO_KALIMAT, BINDO_KALIMAT_P6, EN_P2, EN_P3, EN_P5, EN_P7, EN_JAM, EN_RUTE };
