// Simulator "Bedah Kalimat" (Bahasa Indonesia P5), mengikuti 4 langkah slide tutor "Struktur Kalimat: S, P, O, Pel, K".
// Setiap kalimat dipecah per fungsi: t = teks, f = S/P/O/Pel/K, k = jenis keterangan,
// pasif / nya = hasil uji (diawali * berarti tidak berterima), why = penjelasan setelah benar.
const O = (t, pasif, nya, why) => ({ t, f: "O", pasif, nya, why });
const Pel = (t, pasif, nya, why) => ({ t, f: "Pel", pasif, nya, why });
const K = (t, k, why) => ({ t, f: "K", k, why });
const S = (t, why) => ({ t, f: "S", why });
const P = (t, why) => ({ t, f: "P", why });

module.exports = {
  type: "lab-bedah", label: "🎓 Tutorial • Lab Bahasa • Bedah Kalimat", title: "Bedah Kalimat S-P-O-Pel-K",
  desc: "Ikuti tangga dari slide tutor: cari predikat dulu, lalu subjek, lalu uji bagian sesudah predikat (pasif, -nya, hapus/pindah) untuk memutuskan objek, pelengkap, atau keterangan.",
  items: [
    { src: "Demo bedah kalimat 1 (slide tutor)", note: "Predikat <em>membelikan</em> termasuk verba memberi: unsur pertama tanpa preposisi (<em>adik</em>) = objek, unsur berikutnya (<em>sepeda baru</em>) = pelengkap.",
      chunks: [K("Kemarin sore,", "waktu", "Menjawab “kapan?”."), S("Ayah"), P("membelikan", "Verba me-kan, jenis verba memberi."),
        O("adik", "Adik dibelikan sepeda baru oleh Ayah.", "Ayah membelikannya sepeda baru.", "Unsur pertama sesudah verba memberi."),
        Pel("sepeda baru", "*Sepeda baru dibelikan adik oleh Ayah. (Susunannya rusak: adik seolah jadi pelaku.)", "*Ayah membelikan adik -nya. (Tidak bisa menggantikan sepeda baru.)", "Unsur kedua sesudah verba memberi."),
        K("di toko dekat rumah.", "tempat", "Penanda di = tempat.")] },
    { src: "Demo bedah kalimat 2 (slide tutor)", note: "Predikat ber- tidak bisa dipasifkan, jadi <em>kue</em> pelengkap. Keterangan sebab boleh berbentuk klausa (<em>karena ingin menabung</em>).",
      chunks: [S("Kakak"), P("sedang berjualan", "Verba ber-. Kata sedang ikut menjadi bagian predikat."),
        Pel("kue", "*Kue dijuali kakak.", "*Kakak berjualannya.", "Predikat ber- membawa pelengkap."),
        K("di pasar", "tempat"), K("karena ingin menabung.", "sebab", "Penanda karena = sebab.")] },
    { src: "Latihan analisis kalimat no. 1 (tutor)",
      chunks: [K("Sebulan yang lalu", "waktu"), S("Alex Ferguson"), P("membelikan", "Verba memberi."),
        O("adiknya", "Adiknya dibelikan kudapan oleh Alex Ferguson.", "(-nya sudah menempel: adik + -nya.) Uji pasif sudah cukup.", "Unsur pertama sesudah verba memberi."),
        Pel("kudapan", "*Kudapan dibelikan adiknya oleh Alex Ferguson.", "*Alex Ferguson membelikan adiknya -nya.", "Unsur kedua sesudah verba memberi."),
        K("di Pasar Ngasem.", "tempat")] },
    { src: "Latihan analisis kalimat no. 2 (tutor)",
      chunks: [S("Benzema"), P("menanam", "Verba me-, transitif."), O("pepaya", "Pepaya ditanam Benzema di kebun.", "Benzema menanamnya di kebun."), K("di kebun.", "tempat")] },
    { src: "Latihan analisis kalimat no. 5 (tutor)", note: "Predikat tidak harus berawalan me-. <em>Minum</em> tetap transitif karena unsur sesudahnya bisa dipasifkan.",
      chunks: [S("Ronaldo"), P("minum", "Verba dasar, tetapi transitif."), O("es teh", "Es teh diminum Ronaldo.", "Ronaldo meminumnya."), K("di RM. Lembayung.", "tempat")] },
    { src: "Latihan analisis kalimat no. 4 (tutor)", note: "Tidak ada objek atau pelengkap: <em>bersepeda</em> intransitif. Pola dasarnya S-P, sisanya keterangan.",
      chunks: [K("Kemarin,", "waktu"), S("Neymar"), P("bersepeda", "Verba ber-, intransitif."), K("kencang", "cara", "Menjawab “bagaimana?”."), K("di Jalan Merdeka.", "tempat")] },
    { src: "Latihan analisis kalimat no. 7 (tutor)", note: "Subjeknya panjang karena diperluas klausa <em>yang sedang menggiring bola melewati musuhnya</em>. ➕ Koma sebelum <em>mendengar</em> sebenarnya tidak perlu, karena koma tidak memisahkan subjek dan predikat (materi ejaan P2).",
      chunks: [S("Messi yang sedang menggiring bola melewati musuhnya,", "Subjek yang diperluas dengan klausa yang …"), P("mendengar"),
        O("teriakan pelatihnya", "Teriakan pelatihnya didengar Messi.", "Messi mendengarnya."), K("dari pinggir lapangan.", "tempat", "Penanda dari = tempat (asal).")] },
    { src: "Latihan analisis kalimat no. 12 (tutor)",
      chunks: [S("Pak Tri"), P("sedang membelikan", "Verba memberi."),
        O("kucingnya yang lucu", "Kucingnya yang lucu dibelikan dua kantong Whiskas oleh Pak Tri.", "Pak Tri membelikannya dua kantong Whiskas."),
        Pel("dua kantong Whiskas.", "*Dua kantong Whiskas dibelikan kucingnya oleh Pak Tri.", "*Pak Tri membelikan kucingnya -nya.")] },
    { src: "Latihan 8 no. 9 (tutor)", note: "Kalimat inversi: predikat di depan subjek. Karena itu tutor menyarankan mencari predikat dulu, bukan menebak dari urutan kata.",
      chunks: [P("Telah hadir", "Predikat di depan: kalimat inversi."), S("seluruh peserta pelatihan.", "Siapa yang telah hadir? Seluruh peserta pelatihan.")] },
    { src: "Demo bedah kalimat 3 (slide tutor)", note: "Predikatnya adjektiva, jadi tidak ada objek maupun pelengkap. Pola dasarnya cukup S-P.",
      chunks: [S("Pelayanan rumah sakit itu"), P("sangat baik.", "Predikat adjektiva (kata sifat).")] },
    { src: "Latihan 4 no. 2 (tutor)",
      chunks: [S("Paman"), P("menjadi", "Verba kopulatif."), Pel("dokter.", "*Dokter dijadi paman.", "*Paman menjadinya.", "Tanpa pelengkap kalimat menggantung: “Paman menjadi.”")] },
    { src: "Latihan 4 no. 6 (tutor)",
      chunks: [S("Anak itu"), P("bernama", "Verba ber-."), Pel("Rizki.", "*Rizki dinamai anak itu. (Maknanya berubah.)", "*Anak itu bernamanya.")] },
    { src: "Latihan 6 dan 9 (tutor)",
      chunks: [S("Tim IT"), P("memperbaiki"), O("jaringan internet", "Jaringan internet diperbaiki tim IT.", "Tim IT memperbaikinya dengan cepat."), K("dengan cepat.", "cara", "dengan + sifat = cara.")] },
    { src: "Latihan 6 no. 7 (tutor)", note: "Penanda <em>dengan</em> bisa berarti cara atau alat. Jika diikuti benda yang dipakai (komputer), itu keterangan alat.",
      chunks: [S("Staf"), P("menyusun"), O("laporan", "Laporan disusun staf dengan komputer.", "Staf menyusunnya dengan komputer."), K("dengan komputer.", "alat", "dengan + benda yang dipakai = alat.")] },
    { src: "Latihan 6 no. 8 (tutor)",
      chunks: [S("Manajer"), P("berangkat"), K("bersama tim audit.", "penyerta", "Penanda bersama = penyerta.")] },
    { src: "Latihan 6 no. 5 (tutor)",
      chunks: [S("Dokter"), P("menggunakan"), O("stetoskop", "Stetoskop digunakan dokter untuk memeriksa pasien.", "Dokter menggunakannya untuk memeriksa pasien."), K("untuk memeriksa pasien.", "tujuan", "Penanda untuk = tujuan.")] }
  ]
};
