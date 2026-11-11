// Simulator "Bedah Kalimat" versi soal UTS (Bahasa Indonesia P5 dan P8): kalimat panjang ragam resmi.
// Format chunk sama dengan lab_bindo_bedah.js. K tanpa k = keterangan yang jenisnya tidak ada di tombol (mis. acuan),
// jadi cukup ditandai keterangan.
const O = (t, pasif, nya, why) => ({ t, f: "O", pasif, nya, why });
const Pel = (t, pasif, nya, why) => ({ t, f: "Pel", pasif, nya, why });
const K = (t, k, why) => (k ? { t, f: "K", k, why } : { t, f: "K", why });
const S = (t, why) => ({ t, f: "S", why });
const P = (t, why) => ({ t, f: "P", why });
const teman = (label) => `<br><strong>Label di lembar teman:</strong> ${label}`;

const soal = [
  { src: "Soal UTS no. 1", note: "Predikat kopulatif <em>adalah</em> membawa pelengkap. Unsur yang didahului kata depan (<em>di samping</em>) tidak pernah menjadi objek. Sebagian buku membaca <em>di samping hukum positif</em> sebagai bagian dari pelengkap; yang jelas, bagian itu bukan objek. Ejaan: <em>di samping</em> ditulis terpisah." + teman("hukum positif = O."),
    chunks: [S("Salah satu ciri khas sistem hukum Indonesia", "Apa yang adalah pengakuan …? Salah satu ciri khas sistem hukum Indonesia."),
      P("adalah", "Verba kopulatif."),
      Pel("pengakuan terhadap eksistensi hukum adat", "*Pengakuan terhadap eksistensi hukum adat diadalah …", "*Salah satu ciri khas sistem hukum Indonesia adalahnya.", "Sesudah adalah selalu pelengkap. Kata terhadap di dalamnya hanya bagian frasa nomina pengakuan terhadap …"),
      K("di samping hukum positif.", null, "Di samping di sini berarti “selain”. Diawali kata depan, jadi bukan objek.")] },
  { src: "Soal UTS no. 2", note: "Frasa yang diawali <em>berdasarkan</em> menyatakan dasar atau acuan tindakan, dan bisa dipindah ke depan: <em>Berdasarkan analisis …, perusahaan multinasional itu menyusun …</em>. Karena itu keterangan, bukan pelengkap." + teman("berdasarkan analisis … = Pel."),
    chunks: [S("Perusahaan multinasional itu"), P("menyusun", "Verba me-, transitif."),
      O("strategi investasi jangka panjang", "Strategi investasi jangka panjang disusun perusahaan multinasional itu.", "Perusahaan multinasional itu menyusunnya di Asia Tenggara."),
      K("di Asia Tenggara", "tempat"),
      K("berdasarkan analisis demografi dan daya beli masyarakat lokal.", null, "Keterangan dasar atau acuan: menjawab “atas dasar apa?”. Bisa dihapus dan dipindah.")] },
  { src: "Soal UTS no. 3", note: "Klausa <em>yang secara signifikan memengaruhi …</em> menempel pada <em>faktor eksternal</em>, jadi seluruhnya satu pelengkap. Di dalam klausa itu memang ada P (memengaruhi), O (biaya logistik dan produksi), dan K (di dalam negeri), tetapi itu fungsi di tingkat klausa, bukan di tingkat kalimat. Kalau soal meminta bedah sampai ke dalam klausa, label teman masuk akal, hanya <em>memengaruhi</em> = P, bukan Pel. Ejaan: <em>memengaruhi</em>, bukan <em>mempengaruhi</em>. <em>K</em> dan <em>Ket</em> sama-sama singkatan keterangan." + teman("memengaruhi = Pel, biaya logistik dan produksi = O, di dalam negeri = Ket."),
    chunks: [S("Kenaikan harga minyak dunia"), P("merupakan", "Verba kopulatif."),
      Pel("faktor eksternal yang secara signifikan memengaruhi biaya logistik dan produksi di dalam negeri.", "*Faktor eksternal … dirupakan kenaikan harga minyak dunia.", "*Kenaikan harga minyak dunia merupakannya.", "Sesudah merupakan selalu pelengkap, termasuk klausa yang … yang menempel padanya.")] },
  { src: "Soal UTS no. 4 (di lembar teman tertulis 3 lagi)", note: "<em>Akan</em> hanya penanda waktu dan menjadi bagian predikat. <em>Bertemu</em> verba ber- yang intransitif, jadi tidak ada objek. <em>Dalam konferensi …</em> diawali kata depan dan bisa dipindah, jadi keterangan. Padanan <em>startup</em> dalam tulisan resmi: <em>perusahaan rintisan</em>." + teman("akan = P, bertemu = O, dalam konferensi … = Pel, besok = K."),
    chunks: [S("Para investor dan startup lokal"), P("akan bertemu", "Akan + verba ber-. Kata akan ikut menjadi bagian predikat."),
      K("dalam konferensi teknologi tahunan", "tempat", "Penanda dalam = tempat (di dalam acara itu)."), K("besok.", "waktu")] },
  { src: "Soal UTS no. 5 (di lembar teman tertulis 4)", note: "Predikatnya pasif (<em>harus diterapkan</em>), jadi kalimat ini tidak punya objek. <em>Keamanan dan ketahanan struktur bangunan bertingkat</em> adalah objek dari <em>menjamin</em> di dalam keterangan tujuan, bukan objek kalimat." + teman("harus = P, diterapkan … ketahanan = Pel, struktur bangunan bertingkat = O."),
    chunks: [S("Prinsip-prinsip teknik sipil"), P("harus diterapkan", "Harus + verba di- (pasif). Harus ikut menjadi bagian predikat."),
      K("secara ketat", "cara", "Menjawab “bagaimana?”."),
      K("untuk menjamin keamanan dan ketahanan struktur bangunan bertingkat.", "tujuan", "Penanda untuk = tujuan. Seluruh frasa sampai bertingkat satu keterangan.")] },
  { src: "Soal UTS no. 6 (di lembar teman tertulis 5)", note: "<em>Berdasar</em> selalu menuntut <em>pada …</em>: <em>Laporan itu berdasar.</em> menggantung. Karena wajib hadir, frasa itu dianggap pelengkap (tutor juga mengunci <em>kepada tamu</em> sebagai pelengkap di Latihan 7). Buku yang ketat memakai uji preposisi akan menyebutnya keterangan, jadi nomor ini paling mungkin beda kunci. Yang pasti salah di lembar teman: <em>kajian mendalam</em> bukan bagian predikat. Ejaan: <em>risiko</em>, bukan <em>resiko</em>." + teman("berdasar pada kajian mendalam = P, terhadap risiko … = Pel."),
    chunks: [S("Laporan stabilitas keuangan Bank Indonesia"), P("berdasar", "Verba ber-."),
      Pel("pada kajian mendalam terhadap risiko kredit, pasar modal, dan sektor perbankan.", "*Kajian mendalam … diberdasar laporan itu.", "*Laporan stabilitas keuangan Bank Indonesia berdasarnya.", "Tanpa bagian ini kalimat menggantung, jadi tidak bebas dihapus.")] }
];

const tambahan = [
  { src: "Latihan tambahan 1", note: "Kalimat pasif tidak punya objek.",
    chunks: [S("Rancangan undang-undang perlindungan data pribadi"), P("telah disahkan", "Verba di- (pasif)."),
      K("dalam sidang paripurna DPR", "tempat"), K("pada akhir bulan lalu.", "waktu")] },
  { src: "Latihan tambahan 2", note: "Kalimat inversi: predikat di depan subjek.",
    chunks: [K("Sejak kemarin,", "waktu"), P("telah dibuka", "Predikat di depan subjek."), S("pendaftaran beasiswa prestasi.", "Apa yang telah dibuka? Pendaftaran beasiswa prestasi.")] },
  { src: "Latihan tambahan 3", note: "Subjek panjang karena diperluas klausa <em>yang …</em>. Cari predikat dulu, baru tanyakan siapa yang melakukannya.",
    chunks: [S("Mahasiswa yang belum melunasi biaya kuliah", "Subjek yang diperluas dengan klausa yang …"), P("tidak dapat mengikuti", "Tidak dapat ikut menjadi bagian predikat."),
      O("ujian tengah semester.", "Ujian tengah semester tidak dapat diikuti mahasiswa yang belum melunasi biaya kuliah.", "Mahasiswa yang belum melunasi biaya kuliah tidak dapat mengikutinya.")] },
  { src: "Latihan tambahan 4", note: "Verba memberi bentuk me-i: unsur pertama (<em>para wisudawan</em>) objek, unsur kedua (<em>undangan resmi</em>) pelengkap.",
    chunks: [S("Pihak kampus"), P("mengirimi", "Verba memberi (me-i)."),
      O("para wisudawan", "Para wisudawan dikirimi undangan resmi oleh pihak kampus.", "Pihak kampus mengiriminya undangan resmi."),
      Pel("undangan resmi", "*Undangan resmi dikirimi para wisudawan oleh pihak kampus.", "*Pihak kampus mengirimi para wisudawan -nya."),
      K("minggu lalu.", "waktu")] },
  { src: "Latihan tambahan 5", note: "Predikat <em>merupakan</em> membawa pelengkap. <em>Pada era …</em> diawali kata depan dan bisa dipindah ke depan.",
    chunks: [S("Transformasi digital"), P("merupakan"),
      Pel("tantangan utama perusahaan keluarga", "*Tantangan utama perusahaan keluarga dirupakan transformasi digital.", "*Transformasi digital merupakannya."),
      K("pada era globalisasi.", "waktu")] },
  { src: "Latihan tambahan 6", note: "Predikat ber- membawa pelengkap (<em>sapi perah</em>), bukan objek.",
    chunks: [S("Sebagian besar warga lereng Merapi"), P("beternak", "Verba ber-."),
      Pel("sapi perah", "*Sapi perah diternak warga lereng Merapi.", "*Warga lereng Merapi beternaknya."), K("sejak puluhan tahun lalu.", "waktu")] },
  { src: "Latihan tambahan 7", note: "Ada dua keterangan di belakang objek: waktu (<em>selama dua hari</em>) dan sebab (<em>karena …</em>).",
    chunks: [S("Pengelola gedung"), P("menutup"),
      O("akses lift barat", "Akses lift barat ditutup pengelola gedung selama dua hari.", "Pengelola gedung menutupnya selama dua hari."),
      K("selama dua hari", "waktu"), K("karena perbaikan sistem kelistrikan.", "sebab", "Penanda karena = sebab.")] },
  { src: "Latihan tambahan 8", note: "Keterangan boleh di depan dan diberi koma.",
    chunks: [K("Pada rapat tahunan kemarin,", "waktu"), S("dewan direksi"), P("menetapkan"),
      O("kebijakan efisiensi anggaran", "Kebijakan efisiensi anggaran ditetapkan dewan direksi secara bulat.", "Dewan direksi menetapkannya secara bulat."), K("secara bulat.", "cara")] }
];

module.exports = {
  type: "lab-bedah", label: "Lab Bahasa • Bedah Kalimat Soal UTS", title: "Bedah Kalimat Panjang ala Soal UTS",
  desc: "Enam kalimat pertama dari soal UTS yang beredar di kelas, sisanya latihan tambahan dengan gaya yang sama. Kalimat panjang tetap dibedah dengan tangga yang sama: predikat, subjek, lalu uji bagian sesudah predikat. Setelah selesai, catatan di bawah membandingkan dengan label di lembar jawaban teman.",
  items: soal.concat(tambahan)
};
