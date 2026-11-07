// Pengayaan dari slide tutorial SIBERMU26: "Ejaan & Diksi" (Tutor 01) → P2, P3, P8;
// "Struktur Kalimat: S, P, O, Pel, K" dan "Syarat Kalimat Efektif" (dua versi) → P5 dan bank UTS P8.
const P2 = require("./data_bindo_p2.js"), P3 = require("./data_bindo_p3.js"), P5 = require("./data_bindo_p5.js"), P8 = require("./data_bindo_p8.js");
const LAB3 = require("./lab_tahap3.js");
const tag = "🎓 Tutorial";

P2.cheatsheet.push(
  { type: "callout", tone: "tip", heading: `${tag}: dari slide tutor “Ejaan & Diksi”`, html: "Bagian di bawah ini berasal dari sesi tutorial (Kuis 1 tutorial membahas ejaan dan diksi). Fokusnya bentuk yang sering muncul di dokumen kerja: kapan koma dan titik dua <strong>tidak</strong> dipakai, hubung vs pisah, spasi, dan angka." },
  { type: "table", label: `${tag} • Kapan TIDAK Memakai Tanda`, title: "Salah Kaprah Tanda Baca", headers: ["Salah", "Benar", "Alasan"],
    rows: [["Mahasiswa, mengumpulkan tugas melalui LMS.", "Mahasiswa mengumpulkan tugas melalui LMS.", "Koma tidak memisahkan S dan P"], ["Saya akan datang, kalau undangan sudah diterima.", "Saya akan datang kalau undangan sudah diterima.", "Anak kalimat di belakang → tanpa koma"], ["Kita memerlukan: kursi, meja, dan lemari.", "Kita memerlukan kursi, meja, dan lemari.", "Titik dua hanya setelah pernyataan lengkap"], ["Peserta rapat adalah: manajer dan staf.", "Peserta rapat adalah manajer dan staf.", "idem"], ["Anak—anak itu bermain.", "Anak-anak itu bermain.", "Kata ulang pakai hubung (-)"], ["Kontrak berlaku 2024-2026.", "Kontrak berlaku 2024—2026.", "Rentang “sampai dengan” pakai pisah (—)"], ["Saya datang , lalu pulang .", "Saya datang, lalu pulang.", "Tanda baca menempel pada kata sebelumnya"], ["( UMY )", "(UMY)", "Tanpa spasi di dalam kurung"]] },
  { type: "table", label: `${tag} • 15 Tanda Baca`, title: "Yang Belum Dibahas di Modul", mono: false, headers: ["Tanda", "Fungsi", "Contoh"],
    rows: [["Titik koma ;", "Pengganti konjungsi pada kalimat setara; rincian berkoma; butir rincian ke bawah", "Hari sudah malam; kami masih bekerja."], ["Tanda pisah —", "Mengapit keterangan sisipan; rentang; ditulis tanpa spasi", "Keputusan itu—setelah rapat panjang—disetujui."], ["Petik tunggal ' '", "Petikan dalam petikan; terjemahan", "rate of inflation 'laju inflasi'"], ["Kurung siku [ ]", "Koreksi/tambahan dalam kutipan", "men[d]engar"], ["Garis miring /", "Nomor surat; “atau”; “per”", "015/UMY/X/2026 • km/jam"], ["Apostrof '", "Penghilangan bagian kata/angka", "Angkatan '22"], ["Elipsis …", "Kalimat terputus; bagian kutipan dilewati", "Kalau begitu … boleh juga."]] },
  { type: "table", label: `${tag} • Angka di Dokumen Kerja`, title: "Enam Aturan Angka", headers: ["Aturan", "Contoh"],
    rows: [["Satu/dua kata → huruf; perincian → angka", "tiga kali, seribu buku • 50 bus, 100 minibus"], ["Awal kalimat → huruf, atau ubah susunan", "Lima puluh siswa … • Panitia mengundang 250 orang."], ["Bilangan besar boleh angka + huruf", "250 juta rupiah, Rp10 triliun"], ["Ukuran, satuan, uang → angka; Rp serangkai tanpa spasi/titik", "5 kg, 4 hektare, Rp150.000,00"], ["Alamat & penomoran → angka", "Jalan Diponegoro No. 12, Bab II, Pasal 5"], ["Waktu memakai titik", "pukul 09.00, pukul 13.45.20"]] }
);
P2.simulator.push(
  { type: "exercise", label: `${tag} • Latihan 1 & 2 Tutor`, title: "Tambahkan Tanda Baca yang Tepat", headers: ["Kalimat tanpa tanda baca", "Bentuk benar"],
    rows: [
      ["Setelah rapat selesai saya kembali ke kantor", "Setelah rapat selesai, saya kembali ke kantor.", ["Setelah rapat selesai, saya kembali ke kantor.", "Setelah rapat, selesai saya kembali ke kantor.", "Setelah rapat selesai saya, kembali ke kantor."]],
      ["Rapat dimulai pukul 0900 dan berakhir pukul 1130", "Rapat dimulai pukul 09.00 dan berakhir pukul 11.30.", ["Rapat dimulai pukul 09:00 dan berakhir pukul 11:30.", "Rapat dimulai pukul 09.00 dan berakhir pukul 11.30.", "Rapat dimulai pukul 09,00 dan berakhir pukul 11,30."]],
      ["Pak Budi manajer kami akan hadir besok", "Pak Budi, manajer kami, akan hadir besok.", ["Pak Budi manajer kami, akan hadir besok.", "Pak Budi, manajer kami, akan hadir besok.", "Pak Budi, manajer kami akan hadir, besok."]],
      ["Kami memesan kertas tinta dan map", "Kami memesan kertas, tinta, dan map.", ["Kami memesan: kertas, tinta, dan map.", "Kami memesan kertas, tinta, dan map.", "Kami memesan kertas tinta, dan map."]],
      ["Agenda rapat pembukaan evaluasi dan penutup", "Agenda rapat: pembukaan, evaluasi, dan penutup.", ["Agenda rapat: pembukaan, evaluasi, dan penutup.", "Agenda rapat pembukaan: evaluasi, dan penutup.", "Agenda: rapat pembukaan evaluasi dan penutup."]],
      ["Hari sudah malam kami masih bekerja", "Hari sudah malam; kami masih bekerja.", ["Hari sudah malam: kami masih bekerja.", "Hari sudah malam; kami masih bekerja.", "Hari sudah malam—kami masih bekerja—"]],
      ["Lomba itu diikuti sekolah se Jawa Tengah", "Lomba itu diikuti sekolah se-Jawa Tengah.", ["Lomba itu diikuti sekolah se Jawa Tengah.", "Lomba itu diikuti sekolah seJawa Tengah.", "Lomba itu diikuti sekolah se-Jawa Tengah."]],
      ["Keputusan itu setelah rapat panjang disetujui", "Keputusan itu—setelah rapat panjang—disetujui.", ["Keputusan itu—setelah rapat panjang—disetujui.", "Keputusan itu-setelah rapat panjang-disetujui.", "Keputusan itu: setelah rapat panjang disetujui."]]
    ].map(([c, a, o]) => ({ cells: [c], fields: [{ options: o, answer: a }], ok: "✓" })) },
  { type: "exercise", label: `${tag} • di/ke & Kapital`, title: "Pilih Bentuk yang Benar", headers: ["Konteks", "Pilihan"],
    rows: [
      ["Imbuhan di-", "Mohon diperhatikan ketentuan berikut.", ["Mohon di perhatikan ketentuan berikut.", "Mohon diperhatikan ketentuan berikut."]],
      ["Kata depan di + tempat", "Dokumen itu disimpan di kantor pusat.", ["Dokumen itu disimpan di kantor pusat.", "Dokumen itu di simpan dikantor pusat."]],
      ["Kata depan ke", "Dia datang ke sini menemui pimpinan.", ["Dia datang kesini menemui pimpinan.", "Dia datang ke sini menemui pimpinan."]],
      ["Nama lembaga", "Saya bekerja di Universitas Muhammadiyah Yogyakarta.", ["Saya bekerja di universitas Muhammadiyah Yogyakarta.", "Saya bekerja di Universitas Muhammadiyah Yogyakarta.", "Saya Bekerja di Universitas Muhammadiyah Yogyakarta."]],
      ["Nama geografi", "Selat Sunda", ["selat sunda", "Selat Sunda"]],
      ["Jabatan + wilayah", "Gubernur Sulteng", ["Gubernur Sulteng", "gubernur sulteng"]],
      ["Penanda asal/khas daerah", "ukiran Jepara", ["ukiran Jepara", "ukiran jepara"]],
      ["Nama jenis (sudah menjadi nama tumbuhan)", "petai cina", ["petai Cina", "petai cina"]]
    ].map(([c, a, o]) => ({ cells: [c], fields: [{ options: o, answer: a }], ok: "✓" })) }
);
P2.quiz.push(
  { q: "Penulisan waktu yang benar adalah…", opts: ["pukul 09:00", "pukul 09.00", "jam 9.00 pagi WIB.", "pukul 09,00"], ans: 1, exp: "Jam dan menit dipisah titik. (Tutorial)" },
  { q: "Penggunaan titik dua yang benar adalah…", opts: ["Kita memerlukan: kursi, meja, dan lemari.", "Peserta rapat adalah: manajer dan staf.", "Kita memerlukan perabot: kursi, meja, dan lemari.", "Mereka: datang terlambat."], ans: 2, exp: "Titik dua setelah pernyataan lengkap. (Tutorial)" },
  { q: "Tanda pisah (—) dipakai pada…", opts: ["anak—anak", "Kontrak berlaku 2024—2026.", "se—Jawa", "ke—2"], ans: 1, exp: "Rentang “sampai dengan”. Kata ulang dan se-/ke- memakai tanda hubung. (Tutorial)" },
  { q: "Penulisan uang yang benar adalah…", opts: ["Rp. 150.000,00", "Rp 150.000,00", "Rp150.000,00", "150.000 Rp"], ans: 2, exp: "Rp serangkai tanpa spasi dan tanpa titik. (Tutorial)" },
  { q: "Kalimat yang memakai koma secara TIDAK tepat adalah…", opts: ["Kalau hujan reda, kami berangkat.", "Mahasiswa, mengumpulkan tugas melalui LMS.", "Pak Budi, manajer kami, akan hadir besok.", "Laporan sudah selesai, tetapi belum diperiksa."], ans: 1, exp: "Koma tidak memisahkan subjek dan predikat. (Tutorial)" },
  { q: "Fungsi kurung siku [ ] adalah…", opts: ["Mengapit nomor surat", "Mengapit koreksi atau tambahan dalam kutipan", "Mengapit singkatan", "Menyatakan rentang"], ans: 1, exp: "men[d]engar. (Tutorial)" }
);

P3.cheatsheet.push(
  { type: "callout", tone: "tip", heading: `${tag}: diksi di dunia kerja`, html: "Slide tutor menekankan diksi untuk surat, surel, dan laporan: kata baku, padanan istilah asing, kata yang mirip, kata depan, dan menghindari ragam percakapan." },
  { type: "table", label: `${tag} • Kata Baku`, title: "Daftar Tambahan dari Tutor", headers: ["Tidak baku", "Baku"],
    rows: [["aktifitas, kreatifitas, produktifitas", "aktivitas, kreativitas, produktivitas"], ["analisa, hipotesa", "analisis, hipotesis"], ["resiko", "risiko"], ["ijin, ijasah, jaman, azas", "izin, ijazah, zaman, asas"], ["hakekat, handal", "hakikat, andal"], ["kwitansi, nomer, praktek, antri", "kuitansi, nomor, praktik, antre"], ["silahkan, Jum'at", "silakan, Jumat"], ["pengaruh → mempengaruhi", "memengaruhi"]],
      modes: [{ label: "Pola -itas", target: "row", row: 0, title: "-ivity → -ivitas", text: "activity → aktivitas, creativity → kreativitas. Huruf v dipertahankan." }] },
  { type: "row", cols: [1, 1], blocks: [
    { type: "table", label: `${tag} • Padanan Istilah Asing`, title: "Pakai di Tulisan Resmi", headers: ["Asing", "Padanan"], rows: [["download", "unduh"], ["upload", "unggah"], ["email", "surel"], ["online / offline", "daring / luring"], ["deadline", "tenggat"]] },
    { type: "table", label: `${tag} • Ragam Percakapan → Formal`, title: "Ganti Sebelum Kirim", headers: ["Percakapan", "Formal"], rows: [["gak / nggak", "tidak"], ["udah", "sudah"], ["banget", "sekali"], ["kayak", "seperti"], ["cuma", "hanya"], ["bikin", "membuat"]] }
  ] },
  { type: "table", label: `${tag} • Kata yang Sering Tertukar`, title: "Mirip Bunyi, Beda Makna", headers: ["Kata", "Makna"],
    rows: [["efektif", "berhasil guna; mencapai sasaran"], ["efisien", "hemat waktu, tenaga, biaya"], ["adaptasi", "penyesuaian diri"], ["adopsi", "pengambilan dan penerapan"], ["intensif", "sungguh-sungguh dan terus-menerus"], ["insentif", "tambahan imbalan untuk memotivasi"], ["kepada", "untuk orang yang dituju: ditujukan kepada Bapak Direktur"], ["pada", "waktu & orang (bukan tujuan): pada hari Senin"], ["daripada", "membandingkan: lebih baik daripada tahun lalu"]] },
  { type: "callout", tone: "warn", heading: "⚠️ Catatan kecil untuk slide tutor", html: "Di slide singkatan vs akronim, <strong>KTP</strong> ditaruh di kelompok akronim, padahal KTP dibaca per huruf (ka-te-pe) sehingga termasuk <strong>singkatan</strong>; akronim yang benar contohnya SIM, Bappenas. Tulisan resmi akronim Lembaga Ketahanan Nasional adalah <strong>Lemhannas</strong> (dua n)." }
);
P3.simulator.push(
  { type: "exercise", label: `${tag} • Latihan Kata Baku & Diksi`, title: "Pilih yang Tepat", headers: ["Soal", "Jawaban"],
    rows: [
      ["kwitansi atau kuitansi?", "kuitansi", ["kwitansi", "kuitansi"]],
      ["praktek atau praktik?", "praktik", ["praktek", "praktik"]],
      ["nomer atau nomor?", "nomor", ["nomer", "nomor"]],
      ["hakekat atau hakikat?", "hakikat", ["hakekat", "hakikat"]],
      ["antri atau antre?", "antre", ["antri", "antre"]],
      ["Kalimat yang seluruh katanya baku", "Silakan isi kuitansi sebelum Jumat.", ["Silahkan isi kwitansi sebelum Jum'at.", "Silakan isi kuitansi sebelum Jumat.", "Silakan isi kwitansi sebelum Jumat."]],
      ["Rapat daring lebih … karena tidak memerlukan biaya perjalanan.", "efisien", ["efektif", "intensif", "efisien", "insentif"]],
      ["Surat ini ditujukan … Bapak Direktur.", "kepada", ["pada", "kepada", "daripada"]],
      ["Hasil tahun ini lebih baik … tahun lalu.", "daripada", ["dari", "daripada", "kepada"]],
      ["Peserta diminta naik … panggung.", "ke", ["ke atas", "ke"]]
    ].map(([c, a, o]) => ({ cells: [c], fields: [{ options: o, answer: a }], ok: "✓" })) },
  { type: "reveal", label: `${tag} • Jadi Editor`, title: "Temukan Minimal 10 Kesalahan", items: [
    { prompt: "pada hari senin manajer bilang kalo rapat ditunda dikarenakan banyak karyawan yang gak bisa hadir. makanya kami diminta ngirim data analisa resiko lewat email sebelum jum'at.", answer: "Pada hari Senin, manajer mengatakan bahwa rapat ditunda karena banyak karyawan yang tidak dapat hadir. Oleh karena itu, kami diminta mengirim data analisis risiko melalui surel sebelum Jumat.", reason: "Kesalahan: pada→Pada • senin→Senin • koma setelah keterangan di depan • bilang→mengatakan • kalo→bahwa • dikarenakan→karena • gak bisa→tidak dapat • makanya→Oleh karena itu, • ngirim→mengirim • analisa→analisis • resiko→risiko • lewat email→melalui surel • jum'at→Jumat." },
    { prompt: "Pak, aku mau nanya soal data yg kemaren dong. Bisa kirim ke aku gak?", answer: "Yth. Bapak, saya ingin menanyakan data yang kemarin. Apakah Bapak dapat mengirimkannya kepada saya? Terima kasih.", reason: "Pesan singkat → surel resmi: sapaan hormat, kata ganti saya, kata baku, kalimat tanya lengkap, ucapan terima kasih." },
    { prompt: "Pak, saya nggak bisa ikut rapat besok soalnya ada kerjaan.", answer: "Mohon maaf, Bapak. Saya tidak dapat mengikuti rapat besok karena ada tugas lapangan.", reason: "Pilih kata baku dan santun." }
  ] }
);
P3.quiz.push(
  { q: "Bentuk baku dari aktifitas, ijin, dan handal adalah…", opts: ["aktivitas, izin, andal", "aktifitas, izin, handal", "aktivitas, ijin, andal", "aktiviti, izin, handal"], ans: 0, exp: "(Tutorial)" },
  { q: "Padanan resmi untuk deadline adalah…", opts: ["batas", "tenggat", "garis mati", "akhiran"], ans: 1, exp: "Juga: daring, luring, unduh, unggah, surel. (Tutorial)" },
  { q: "“Rapat daring lebih … karena tidak memerlukan biaya perjalanan.”", opts: ["efektif", "intensif", "efisien", "insentif"], ans: 2, exp: "Efisien = hemat biaya; efektif = mencapai sasaran. (Tutorial)" },
  { q: "Kalimat yang memakai kata depan dengan tepat adalah…", opts: ["Surat ini ditujukan pada Bapak Direktur.", "Rapat diadakan di hari Senin.", "Hasil tahun ini lebih baik daripada tahun lalu.", "Hasil tahun ini lebih baik dari pada tahun lalu."], ans: 2, exp: "kepada Bapak Direktur, pada hari Senin, daripada untuk perbandingan. (Tutorial)" },
  { q: "Contoh pleonasme (kata berlebih) adalah…", opts: ["Peserta diminta naik ke panggung.", "Rapat membahas anggaran.", "Peserta diminta naik ke atas panggung.", "Kami bekerja keras agar target tercapai."], ans: 2, exp: "naik pasti ke atas. (Tutorial)" },
  { q: "Kata pengaruh mendapat awalan meN- menjadi…", opts: ["mempengaruhi", "memengaruhi", "mepengaruhi", "mengpengaruhi"], ans: 1, exp: "p luluh. (Tutorial)" }
);

// ---------------------------------------------------------------------
//  P5: Struktur Kalimat S-P-O-Pel-K dan Syarat Kalimat Efektif (slide tutor)
// ---------------------------------------------------------------------
P5.cheatsheet.push(
  { type: "callout", tone: "tip", heading: `${tag}: dari slide tutor “Struktur Kalimat” dan “Syarat Kalimat Efektif”`, html: "Bagian di bawah ini berasal dari sesi tutorial. Fokus tutor: membedakan <strong>objek dan pelengkap dengan uji, bukan menebak</strong>, lalu memeriksa kalimat dengan <strong>lima syarat</strong>. Modul memakai tujuh syarat; padanannya ada di tabel terakhir." },
  { type: "table", label: `${tag} • Tangga Bedah Kalimat`, title: "Empat Langkah Mencari Unsur", headers: ["Langkah", "Tanyakan", "Catatan"],
    rows: [["1. Cari predikat (P) dulu", "Sedang apa? Bagaimana? Adalah apa?", "Kalau bingung, cari “sedang apa”-nya dulu."], ["2. Cari subjek (S)", "Siapa atau apa yang + predikat?", "Tidak didahului di, dalam, bagi, untuk, kepada. Tidak selalu di depan (inversi, pasif)."], ["3. Uji unsur setelah P", "Bisa dipasifkan? Bisa diganti -nya? Apa jenis predikatnya?", "Lolos uji = objek. Tidak lolos, tetapi wajib ada = pelengkap."], ["4. Cari keterangan (K)", "Kapan? Di mana? Bagaimana? Mengapa?", "Bisa dipindah dan bisa dihapus, kalimat tetap utuh."]] },
  { type: "table", label: `${tag} • Jenis Predikat`, title: "Predikat Tidak Selalu Kata Kerja", headers: ["Jenis predikat", "Contoh"],
    rows: [["Verba dasar", "Adik <strong>tidur</strong>."], ["Verba berimbuhan", "Dosen <strong>membaca</strong> laporan."], ["Verba kopulatif", "Beliau <strong>adalah</strong> dokter."], ["Adjektiva (sifat)", "Pelayanan itu <strong>sangat baik</strong>."], ["Nomina (benda)", "Ayahnya <strong>seorang dokter</strong>."], ["Numeralia (bilangan)", "Pesertanya <strong>tiga orang</strong>."], ["Frasa preposisional", "Mereka <strong>di ruang rapat</strong>."]] },
  { type: "table", label: `${tag} • Objek vs Pelengkap`, title: "Lima Pembeda", headers: ["Uji", "Objek", "Pelengkap"],
    rows: [["Fungsi", "Sasaran tindakan", "Melengkapi makna predikat"], ["Predikat", "Verba transitif (me-, me-kan, me-i)", "Kopulatif, ber-, ter-, verba memberi (unsur kedua)"], ["Uji pasif", "Bisa jadi subjek: <em>Dokumen diperiksa petugas.</em>", "Tidak bisa: <em>*Dokter dijadi paman.</em>"], ["Uji -nya", "Bisa: <em>Ibu membacanya.</em>", "Tidak bisa: <em>*Dia bernamanya.</em>"], ["Preposisi", "Tanpa preposisi", "Boleh didahului kepada, dll. (menurut tutor)"]],
    modes: [{ label: "Urutan cek", target: "none", title: "Catatan tutor tentang predikat", text: "1) Cari P dan lihat jenisnya. 2) Kopulatif (menjadi, adalah) atau ber-/ter- → unsur sesudahnya pelengkap. 3) me-/me-kan/me-i → pasifkan unsur di belakangnya; bisa = objek. 4) Verba memberi → unsur pertama tanpa preposisi = objek, berikutnya = pelengkap. 5) Unsur berpreposisi yang bisa dihapus = keterangan." }] },
  { type: "table", label: `${tag} • Predikat Pembawa Pelengkap`, title: "Kalau Predikatnya Ini, Cari Pelengkap", headers: ["Jenis predikat", "Contoh", "Pelengkap"],
    rows: [["Kopulatif: menjadi, merupakan, adalah, yaitu, ialah", "Mahasiswa itu menjadi ketua kelompok.", "ketua kelompok"], ["Verba ber-: bernama, berupa, bercita-cita", "Pesta itu berupa jamuan makan.", "jamuan makan"], ["Verba keadaan: bertubuh, berukuran", "Anak itu bertubuh tinggi.", "tinggi"], ["Verba memberi: memberikan, membelikan, mengirimkan", "Ayah membelikan adik sepeda.", "sepeda (adik = objek)"]] },
  { type: "table", label: `${tag} • Jenis Keterangan`, title: "Tujuh Keterangan dan Penandanya", headers: ["Jenis", "Penanda", "Contoh"],
    rows: [["Waktu", "pada, sejak, sampai", "pada hari Senin; kemarin sore"], ["Tempat", "di, ke, dari", "di ruang rapat"], ["Cara", "dengan, secara", "dengan teliti; secara daring"], ["Alat", "dengan, menggunakan, melalui", "dengan komputer; melalui portal kampus"], ["Tujuan", "untuk, guna, demi", "untuk penelitian"], ["Sebab", "karena, akibat", "karena gangguan sistem"], ["Penyerta", "bersama, dengan", "bersama tim audit"]],
    defaultNote: "Penanda <em>dengan</em> dipakai tiga jenis: dengan teliti (cara), dengan komputer (alat), dengan temannya (penyerta). Lihat kata sesudahnya." },
  { type: "table", label: `${tag} • Pola Kalimat Dasar`, title: "Delapan Pola dari Slide Tutor", headers: ["Pola", "Contoh 1", "Contoh 2"],
    rows: [["S-P", "Mahasiswa belajar.", "Mahasiswa belajar."], ["S-P-O", "Petugas memeriksa dokumen.", "Mahasiswa mempelajari bahasa Indonesia."], ["S-P-Pel", "Paman menjadi dokter.", "Mahasiswa menjadi peserta seminar."], ["S-P-O-Pel", "Ayah membelikan adik sepeda.", "Mahasiswa menjadikan bahasa Indonesia mata kuliah pilihan."], ["S-P-K", "Petugas bekerja di kantor.", "Mahasiswa belajar di perpustakaan."], ["S-P-O-K", "Ibu membeli sayuran di pasar.", "Mahasiswa mempelajari bahasa Indonesia di perpustakaan."], ["S-P-Pel-K", "Kakak berjualan kue di pasar.", "Mahasiswa menjadi peserta seminar di kampus."], ["S-P-O-Pel-K", "Kemarin Ayah membelikan adik sepeda di toko.", "Mahasiswa menjadikan bahasa Indonesia mata kuliah pilihan pada semester ini."]] },
  { type: "table", label: `${tag} • 5 Syarat Tutor vs 7 Syarat Modul`, title: "Padanan Syarat Kalimat Efektif", headers: ["Tutor (5)", "Modul (7)", "Pertanyaan cek dari tutor"],
    rows: [["Kesepadanan", "Kesepadanan", "Apakah subjek dan predikatnya jelas?"], ["Keparalelan", "Keparalelan", "Apakah bentuk unsur yang setara sudah sejajar?"], ["Kehematan", "Kehematan", "Apakah ada kata yang berlebihan?"], ["Ketepatan", "Kecermatan", "Apakah kalimat tidak menimbulkan makna ganda?"], ["Kelogisan", "Kelogisan", "Apakah isi kalimat masuk akal?"], ["–", "Kepaduan", "Tidak dibahas tutor (contoh: membahas tentang → membahas)."], ["–", "Ketegasan", "Tidak dibahas tutor (menonjolkan ide pokok)."]],
    defaultNote: "Untuk UTS mata kuliah, tetap hafalkan tujuh syarat versi modul. Lima syarat tutor sudah tercakup di dalamnya." },
  { type: "table", label: `${tag} • Contoh dari Tutor`, title: "Kurang Efektif → Efektif", headers: ["Syarat", "Kurang efektif", "Efektif"],
    rows: [["Kesepadanan", "Bagi mahasiswa wajib mengikuti ujian.", "Mahasiswa wajib mengikuti ujian."], ["Kesepadanan", "Berdasarkan hasil pemeriksaan menunjukkan bahwa kondisi pasien membaik.", "Hasil pemeriksaan menunjukkan bahwa kondisi pasien membaik."], ["Kesepadanan", "Pasien yang mengalami demam tinggi di ruang IGD.", "Pasien yang mengalami demam tinggi dirawat di ruang IGD. (tadinya tanpa predikat)"], ["Keparalelan", "Kegiatan tersebut meliputi perencanaan, pelaksanaan, dan mengevaluasi program.", "… perencanaan, pelaksanaan, dan evaluasi program."], ["Keparalelan", "Staf administrasi bertugas menerima berkas, melakukan pemeriksaan, dan pencatatan dokumen.", "… menerima berkas, memeriksa, dan mencatat dokumen."], ["Kehematan", "Tujuan daripada penelitian ini adalah untuk mengetahui pengaruh teknologi.", "Tujuan penelitian ini adalah mengetahui pengaruh teknologi."], ["Kehematan", "Untuk meningkatkan kualitas pelayanan, maka rumah sakit melakukan evaluasi.", "Untuk meningkatkan kualitas pelayanan, rumah sakit melakukan evaluasi."], ["Ketepatan", "Dokter memeriksa pasien dengan alat baru.", "Dokter menggunakan alat baru untuk memeriksa pasien. / Dokter memeriksa pasien yang menggunakan alat baru."], ["Ketepatan", "Kepala bagian menerima laporan dari pegawai baru yang telah diperiksa.", "Kepala bagian menerima laporan yang telah diperiksa oleh pegawai baru."], ["Kelogisan", "Waktu dan tempat kami persilakan.", "Bapak Rektor kami persilakan."], ["Kelogisan", "Keputusan rapat tersebut menghadiri seluruh peserta.", "Seluruh peserta menghadiri rapat tersebut."], ["Kelogisan", "Pendaftaran ditutup agar peserta dapat mendaftar lebih banyak.", "Pendaftaran ditutup karena kuota sudah terpenuhi."]] },
  { type: "table", label: `${tag} • Kehematan`, title: "Kurang Hemat → Lebih Hemat", headers: ["Kurang hemat", "Lebih hemat"],
    rows: [["semua para peserta", "semua peserta / para peserta"], ["para mahasiswa-mahasiswa", "para mahasiswa"], ["setiap masing-masing kelompok", "setiap kelompok"], ["banyak berbagai pilihan", "banyak pilihan"], ["saling membantu satu sama lain", "saling membantu"], ["mengadakan kegiatan acara", "mengadakan acara"], ["kembali lagi ke ruangan", "kembali ke ruangan"], ["agar supaya • demi untuk", "agar / supaya • demi / untuk"], ["adalah merupakan", "adalah / merupakan"], ["naik ke atas", "naik"]],
    defaultNote: "Kata tutor: hemat bukan berarti pendek. Yang dibuang hanya kata yang tidak menambah makna." },
  { type: "callout", tone: "warn", heading: "⚠️ Catatan kecil untuk slide tutor", html: "<ol><li><strong>Latihan 4 nomor 7 dan 8, kuncinya tertukar.</strong> Menurut aturan tutor sendiri (verba memberi: unsur pertama = objek, berikutnya = pelengkap) dan Demo 1, pada <em>Ayah membelikan adik sepeda</em>: <strong>adik = O</strong>, <strong>sepeda = Pel</strong>. Jadi no. 7 (sepeda) = Pel dan no. 8 (adik) = O.</li><li><strong>Latihan 2</strong> bilang ada satu kalimat tanpa subjek, padahal kedelapan kalimatnya punya subjek. Nomor 4 (<em>Telah hadir seluruh peserta pelatihan</em>) hanya inversi: subjeknya <em>seluruh peserta pelatihan</em>.</li><li>Di lembar 3 halaman, contoh “salah” pertama pada <strong>keparalelan</strong> (<em>Pasien yang mengalami demam tinggi dirawat di ruang IGD</em>) adalah salah tempel dari bagian kesepadanan. Contoh yang dimaksud: <em>Tugas mahasiswa meliputi membaca, menulis, dan analisis data</em> → <em>… dan menganalisis data</em>.</li><li>Latihan 7 no. 7 (<em>mengirim undangan <strong>kepada tamu</strong></em>) dikunci pelengkap oleh tutor. Banyak buku tata bahasa menggolongkan bagian berpreposisi seperti ini sebagai keterangan, jadi untuk kuis tutor ikuti kunci tutor, tetapi di ujian mata kuliah lihat juga cara modul.</li></ol>" }
);
P5.simulator.unshift(require("./lab_bindo_bedah.js"));
LAB3.BINDO_KALIMAT.items.push(
  { tokens: ["Bagi", "mahasiswa", "wajib", "mengikuti", "ujian."], syarat: "Kesepadanan", why: "Kata depan di awal kalimat membuat subjek hilang. (Contoh tutor)",
    accept: [{ text: "Mahasiswa wajib mengikuti ujian." }],
    hints: [{ has: "bagi mahasiswa", msg: "<em>bagi mahasiswa</em> hanya keterangan karena diawali kata depan. Siapa yang wajib mengikuti ujian?" }] },
  { tokens: ["Setiap", "masing-masing", "kelompok", "wajib", "mengumpulkan", "satu", "laporan."], syarat: "Kehematan", why: "<em>setiap</em> dan <em>masing-masing</em> bermakna sama, jadi cukup salah satu. (Contoh tutor)",
    accept: [{ text: "Setiap kelompok wajib mengumpulkan satu laporan." }, { text: "Masing-masing kelompok wajib mengumpulkan satu laporan." }],
    hints: [{ has: "setiap masing-masing", msg: "Dua kata di depan bermakna sama. Hapus salah satu." }] },
  { tokens: ["Staf", "administrasi", "bertugas", "menerima", "berkas,", "melakukan", "pemeriksaan,", "dan", "pencatatan", "dokumen."],
    alt: { 6: ["memeriksa,"], 8: ["mencatat"] }, syarat: "Keparalelan", why: "Tiga tugas yang dirinci harus sama-sama kata kerja: menerima, memeriksa, mencatat. (Contoh tutor)",
    accept: [{ text: "Staf administrasi bertugas menerima berkas, memeriksa, dan mencatat dokumen." }],
    hints: [{ has: "melakukan", msg: "<em>melakukan pemeriksaan</em> bisa diringkas jadi satu kata kerja. Hapus <em>melakukan</em>, lalu ganti <em>pemeriksaan</em>." }, { has: "pencatatan", msg: "<em>pencatatan</em> masih kata benda, padahal tugas lain kata kerja." }] },
  { tokens: ["Waktu", "dan", "tempat", "kami", "persilakan."], alt: { 0: ["Bapak Rektor"] }, syarat: "Kelogisan", why: "Yang bisa dipersilakan adalah orang, bukan waktu atau tempat. (Contoh tutor)",
    accept: [{ text: "Bapak Rektor kami persilakan." }],
    hints: [{ has: "dan tempat", msg: "Masih ada <em>dan tempat</em>. Siapa yang sebenarnya dipersilakan naik ke mimbar?" }, { has: "waktu", msg: "Bisakah waktu dipersilakan? Ganti dengan orang yang dipersilakan." }] }
);
P5.quiz.push(
  { q: "Menurut tutor, langkah pertama membedah kalimat adalah mencari…", opts: ["subjek", "predikat", "objek", "keterangan"], ans: 1, exp: "Cari predikat dulu (sedang apa?), baru subjek. Subjek tidak selalu di depan. (Tutorial)" },
  { q: "Pada kalimat “Ayah membelikan adik sepeda”, kata adik berfungsi sebagai…", opts: ["subjek", "objek", "pelengkap", "keterangan"], ans: 1, exp: "Verba memberi: unsur pertama tanpa preposisi = objek (Adik dibelikan sepeda oleh Ayah), sepeda = pelengkap. (Tutorial)" },
  { q: "Unsur yang TIDAK bisa diganti -nya dan tidak bisa menjadi subjek pasif, tetapi tanpanya kalimat menggantung, adalah…", opts: ["objek", "keterangan", "pelengkap", "subjek"], ans: 2, exp: "Paman menjadi … → pelengkap. Keterangan bebas dihapus. (Tutorial)" },
  { q: "Pada kalimat “Staf menyusun laporan dengan komputer”, dengan komputer adalah keterangan…", opts: ["cara", "alat", "penyerta", "tujuan"], ans: 1, exp: "dengan + benda yang dipakai = alat. dengan teliti = cara; bersama tim = penyerta. (Tutorial)" },
  { q: "Kalimat “Telah hadir seluruh peserta pelatihan” memiliki subjek…", opts: ["telah hadir", "seluruh peserta pelatihan", "pelatihan", "tidak ada subjek"], ans: 1, exp: "Kalimat inversi: P di depan S. (Tutorial)" },
  { q: "Kalimat “Mahasiswa bertugas mengumpulkan data, menganalisis hasil, dan pembuatan laporan” melanggar syarat…", opts: ["kehematan", "kelogisan", "keparalelan", "ketepatan"], ans: 2, exp: "pembuatan (nomina) harus sejajar → membuat. (Tutorial)" },
  { q: "Kalimat “Dosen membahas tugas mahasiswa baru” kurang efektif karena…", opts: ["tidak punya subjek", "bermakna ganda", "tidak logis", "ada kata berlebih"], ans: 1, exp: "Yang baru tugasnya atau mahasiswanya? Syarat ketepatan (di modul: kecermatan). (Tutorial)" },
  { q: "Kalimat yang paling logis adalah…", opts: ["Jadwal kegiatan tersebut mengikuti seluruh mahasiswa.", "Kegiatan tersebut menghadiri seluruh mahasiswa.", "Seluruh mahasiswa mengikuti kegiatan sesuai jadwal yang telah ditentukan.", "Seluruh jadwal mahasiswa mengikuti kegiatan."], ans: 2, exp: "Pelaku yang disebut harus memang bisa melakukan tindakannya. (Tutorial)" }
);
P5.flashcards.push(
  { tag: "P5 • Tutorial", q: "Empat langkah bedah kalimat (tutor)?", a: "1) Cari P (sedang apa?) 2) Cari S (siapa/apa yang + P?) 3) Uji unsur setelah P: pasif, -nya, jenis predikat 4) Cari K (bisa dipindah & dihapus)." },
  { tag: "P5 • Tutorial", q: "Verba memberi (membelikan, mengirimkan): mana O, mana Pel?", a: "Unsur pertama tanpa preposisi = objek, unsur berikutnya = pelengkap. Ayah membelikan adik (O) sepeda (Pel)." },
  { tag: "P5 • Tutorial", q: "Lima syarat kalimat efektif versi tutor?", a: "Kesepadanan, keparalelan, kehematan, ketepatan (= kecermatan di modul), kelogisan." }
);

P8.cheatsheet.splice(1, 0, { type: "table", label: `${tag} • Jadwal Tutorial Semester Ganjil 2026`, title: "Sebaran Pertemuan Tutorial", headers: ["Pertemuan", "Kegiatan", "Tanggal"],
  rows: [["1", "Sosialisasi rencana perkuliahan & teknik penilaian", "26 September 2026"], ["2", "Diskusi ejaan dan diksi", "3 Oktober 2026"], ["3", "KUIS 1 (ejaan dan diksi)", "10 Oktober 2026"], ["4–5", "Belajar mandiri & penugasan", "17 & 24 Oktober 2026"], ["6", "Diskusi penulisan kalimat efektif", "31 Oktober 2026"], ["7", "Diskusi persiapan UTS", "7 November 2026"], ["8", "UTS", "14 November 2026"], ["9", "Penulisan & pengembangan paragraf", "21 November 2026"], ["10–11", "Tugas 1 (kerjakan & kumpulkan) • evaluasi", "28 November & 5 Desember 2026"], ["12", "Penulisan referensi ilmiah", "12 Desember 2026"], ["13–15", "Tugas 2 (paragraf ilmiah) • evaluasi", "19 Desember 2026 – 2 Januari 2027"], ["16", "UAS", "9 Januari 2027"]],
  modes: [{ label: "UTS", target: "row", row: 6, title: "Sabtu, 14 November 2026", text: "Menurut slide tutor. Cocokkan lagi dengan pengumuman resmi di LMS." }],
  defaultNote: "Ini jadwal sesi tutorial dari slide tutor. Penomoran pertemuan tutorial tidak selalu sama dengan penomoran modul di LMS." });
P8.simulator.unshift(P3.simulator[P3.simulator.length - 1]);

// soal tutorial ikut masuk bank UTS
const n0 = P8.quiz.length;
[[2, P2], [3, P3], [5, P5]].forEach(([n, M]) => M.quiz.filter(q => q.exp.includes("(Tutorial)")).forEach(q => P8.quiz.push(Object.assign(JSON.parse(JSON.stringify(q)), { q: `[P${n}] ${q.q}` }))));
P8.hero.text = P8.hero.text.replace(n0 + " soal", P8.quiz.length + " soal");
module.exports = true;
