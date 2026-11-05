// Pengayaan dari slide tutorial "Ejaan & Diksi" (SIBERMU26, Tutor 01). Ditambahkan ke P2, P3, dan P8.
const P2 = require("./data_bindo_p2.js"), P3 = require("./data_bindo_p3.js"), P8 = require("./data_bindo_p8.js");
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

P8.cheatsheet.splice(1, 0, { type: "table", label: `${tag} • Jadwal Tutorial Semester Ganjil 2026`, title: "Sebaran Pertemuan Tutorial", headers: ["Pertemuan", "Kegiatan", "Tanggal"],
  rows: [["1", "Sosialisasi rencana perkuliahan & teknik penilaian", "26 September 2026"], ["2", "Diskusi ejaan dan diksi", "3 Oktober 2026"], ["3", "KUIS 1 (ejaan dan diksi)", "10 Oktober 2026"], ["4–5", "Belajar mandiri & penugasan", "17 & 24 Oktober 2026"], ["6", "Diskusi penulisan kalimat efektif", "31 Oktober 2026"], ["7", "Diskusi persiapan UTS", "7 November 2026"], ["8", "UTS", "14 November 2026"], ["9", "Penulisan & pengembangan paragraf", "21 November 2026"], ["10–11", "Tugas 1 (kerjakan & kumpulkan) • evaluasi", "28 November & 5 Desember 2026"], ["12", "Penulisan referensi ilmiah", "12 Desember 2026"], ["13–15", "Tugas 2 (paragraf ilmiah) • evaluasi", "19 Desember 2026 – 2 Januari 2027"], ["16", "UAS", "9 Januari 2027"]],
  modes: [{ label: "UTS", target: "row", row: 6, title: "Sabtu, 14 November 2026", text: "Menurut slide tutor. Cocokkan lagi dengan pengumuman resmi di LMS." }],
  defaultNote: "Ini jadwal sesi tutorial dari slide tutor. Penomoran pertemuan tutorial tidak selalu sama dengan penomoran modul di LMS." });
P8.simulator.unshift(P3.simulator[P3.simulator.length - 1]);

// soal tutorial ikut masuk bank UTS
const n0 = P8.quiz.length;
[[2, P2], [3, P3]].forEach(([n, M]) => M.quiz.filter(q => q.exp.includes("(Tutorial)")).forEach(q => P8.quiz.push(Object.assign(JSON.parse(JSON.stringify(q)), { q: `[P${n}] ${q.q}` }))));
P8.hero.text = P8.hero.text.replace(n0 + " soal", P8.quiz.length + " soal");
module.exports = true;
