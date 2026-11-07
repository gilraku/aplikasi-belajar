// Bahasa Indonesia — Pertemuan 3: Pembentukan Kata dan Pemilihan Kata (Diksi)
const LAB3 = require("./lab_tahap3.js");
const BAKU = ["Baku", "Tidak baku"];
module.exports = {
  id: "p3",
  nomor: 3,
  judul: "Pembentukan Kata & Pemilihan Kata (Diksi)",
  ujian: "UTS",
  hero: {
    badge: "Materi 3 • Bahasa Indonesia",
    title: "Mengonsumsi atau Mengkonsumsi? Analisa atau Analisis?",
    text: "Kuasai <strong>4 cara penyerapan kata asing</strong>, <strong>jenis imbuhan</strong>, <strong>aturan peluluhan K-T-S-P</strong>, dan <strong>4 syarat diksi</strong>: tepat, lazim, hemat, baku."
  },
  cheatsheet: [
    {
      type: "choices",
      label: "Interaktif 1 • Unsur Serapan",
      title: "4 Cara Peminjaman Kata Asing",
      desc: "Klik setiap cara. <strong>Jebakan UTS:</strong> jangan tertukar antara <em>penerjemahan</em> dan <em>kreasi</em>!",
      style: "pills",
      options: [
        { label: "1. Adopsi", title: "Adopsi — bentuk & makna diambil utuh", code: "supermarket → supermarket • plaza → plaza", text: "Pemakai bahasa mengambil <strong>bentuk dan makna</strong> kata asing secara keseluruhan, tanpa diubah." },
        { label: "2. Adaptasi", title: "Adaptasi — makna diambil, ejaan disesuaikan", code: "pluralization → pluralisasi • acceptability → akseptabilitas", text: "Hanya <strong>makna</strong> yang diambil; <strong>ejaan/penulisannya disesuaikan</strong> dengan ejaan bahasa Indonesia." },
        { label: "3. Penerjemahan", title: "Penerjemahan — konsep dicari padanannya", code: "overlap → tumpang tindih • try out → uji coba", text: "Mengambil <strong>konsep</strong> kata asing lalu mencari <strong>padanan</strong> dalam bahasa Indonesia (jumlah katanya cenderung sepadan)." },
        { label: "4. Kreasi", title: "Kreasi — mirip penerjemahan, bentuknya beda", code: "effective → berhasil guna • spare parts → suku cadang", text: "Hanya mengambil <strong>konsep dasar</strong>. Mirip penerjemahan, tetapi menurut materi bedanya ada pada <strong>jumlah kata</strong>: kata asli bisa 2–3 kata sedangkan bentuk Indonesianya hanya satu kata.", note: "Catatan: contoh dalam materi (effective → berhasil guna) justru 1 kata menjadi 2 kata. Untuk ujian, ingat contohnya: <strong>berhasil guna</strong> dan <strong>suku cadang</strong> = kreasi." },
        { label: "2 golongan unsur pinjaman", tone: "amber", title: "Berdasarkan proses pembentukannya", text: "a) <strong>Belum sepenuhnya terserap</strong>: dipakai dalam konteks Indonesia tetapi pengucapannya masih asing — <em>reshuffle, shuttle cock</em>.<br>b) <strong>Sudah disesuaikan</strong> pengucapan & penulisannya dengan kaidah Indonesia, ejaannya diubah seperlunya." }
      ]
    },
    {
      type: "table",
      label: "Interaktif 2 • Afiksasi (Pengimbuhan)",
      title: "4 Jenis Imbuhan Asli",
      desc: "Klik tombol untuk menyorot kolom jenis imbuhan dan contohnya:",
      headers: ["Prefiks (awalan)", "Infiks (sisipan)", "Sufiks (akhiran)", "Konfiks (apitan)"],
      rows: [
        ["me-, meN-", "-el-", "-kan, -an", "per- + -an"],
        ["ber-, di-, ke-", "-em-", "-i, -nya", "me- + per- + -kan"],
        ["peN-, pe-, per-", "-er-", "-wan, -wati", "di- + -kan"],
        ["se-, ter-, a-", "-in-", "-man, -is", "ke- + -an"],
        ["pra-, maha-, para-", "", "-isasi", ""]
      ],
      modes: [
        { label: "Prefiksasi", target: "col", col: 0, title: "Prefiksasi — imbuhan di AWAL bentuk dasar", text: "Contoh: <strong>ke-</strong> + kasih → <strong>kekasih</strong>. Awalan: ber-, me-, pe-, per-, ke-, ter-, se-, di-." },
        { label: "Infiksasi", target: "col", col: 1, title: "Infiksasi — imbuhan di TENGAH bentuk dasar", text: "Contoh: <strong>-el-</strong> + tunjuk → <strong>telunjuk</strong>. Sisipan: -el-, -em-, -er-, -in-." },
        { label: "Sufiksasi", target: "col", col: 2, title: "Sufiksasi — imbuhan di AKHIR bentuk dasar", text: "Contoh: genang + <strong>-an</strong> → <strong>genangan</strong>. Akhiran: -an, -i, -kan, -nya, -ku, -mu, -man, -wan, -wati, -is, -isasi." },
        { label: "Konfiksasi", target: "col", col: 3, title: "Konfiksasi — mengapit di AWAL dan AKHIR sekaligus", text: "Gabungan dua imbuhan atau lebih yang <strong>bersama-sama membentuk satu arti</strong>: per-an, me-per-kan, di-kan, ke-an." }
      ]
    },
    {
      type: "row",
      cols: [1, 1],
      blocks: [
        { type: "list", label: "Interaktif 3 • Imbuhan Asing", title: "Dari bahasa Inggris — ditulis SERANGKAI", groups: [
          { title: "multi- anti- semi- non- pra- infra- ultra- bi- ekstra- intra- -is -isasi", items: ["multifungsi • antivirus • semipermanen", "nonformal • pramusim • infrastruktur", "ultrasonik • ekstrakurikuler • intrasekolah", "humoris • nasionalisasi"] }
        ] },
        { type: "list", label: "Interaktif 4 • Imbuhan Daerah", title: "Umumnya dari Sanskerta — ditulis SERANGKAI", groups: [
          { title: "tuna- nara- pasca- swa- panca- dasa- sapta- catur- maha- antar-", tone: "emerald", items: ["tunawisma • narapidana • pascapanen", "swadaya • pancaindra • dasawarsa", "saptamarga • caturwarga • mahakuasa"] }
        ] }
      ]
    },
    {
      type: "choices",
      label: "Interaktif 5 • Proses Peluluhan meN- & peN-",
      title: "Saklar: <strong>Luluh</strong> vs <strong>Tidak Luluh</strong>",
      desc: "Kunci: huruf awal <strong>K, T, S, P</strong> luluh, <strong>kecuali</strong> diikuti konsonan lagi (gugus konsonan).",
      style: "toggle",
      options: [
        { label: "Luluh (K-T-S-P + vokal)", tone: "emerald", badge: "K T S P", title: "Huruf awal hilang/luluh",
          code: "konsumsi → mengonsumsi • telaah → menelaah • survei → menyurvei • pelihara → memelihara",
          text: "Berlaku juga untuk peN-: <strong>pengonsumsi, penelaah, penyurvei, pemelihara</strong>.",
          note: "❌ Salah: <em>mengkonsumsi, mentelaah, mensurvei, mempelihara</em>." },
        { label: "Tidak luluh (dua konsonan)", tone: "rose", badge: "KR TR SP PR", title: "Dua konsonan berurutan di awal → tidak luluh",
          code: "kritik → mengkritik • transfer → mentransfer • sponsor → mensponsori • protes → memprotes",
          text: "peN-: <strong>pengkritik, pentransfer, pensponsoran</strong>.",
          note: "⚠️ Pengecualian khusus dari materi: <strong>peN- + protes → pemrotes</strong> (huruf p tetap hilang karena sama dengan huruf awal imbuhan), sedangkan <strong>meN- + protes → memprotes</strong>." }
      ]
    },
    {
      type: "tabs",
      label: "Interaktif 6 • Pemilihan Kata (Diksi)",
      title: "Diksi: Tepat, Lazim, Hemat, Baku",
      desc: "Diksi = pemilihan kata agar gagasan terungkap tepat dari segi <strong>makna</strong> dan <strong>nilai rasa</strong>. Perhatikan situasi, tema, tujuan, dan lawan bicara.",
      tabs: [
        { label: "🧠 4 Jenis Makna", blocks: [
          { type: "cards", cols: 2, items: [
            { badge: "Leksikal", title: "Makna menurut kamus", text: "Makna dasar sebuah kata sebagaimana tercantum dalam kamus." },
            { badge: "Gramatikal", title: "Makna menurut konteks/bentuk gramatikal", text: "Makna yang muncul karena kedudukan kata dalam bentuk gramatikal tertentu." },
            { badge: "Denotasi", title: "Makna sesungguhnya", text: "Makna apa adanya, <strong>tanpa nilai rasa</strong>." },
            { badge: "Konotasi", title: "Makna dengan nilai rasa", text: "Mengandung nilai rasa <strong>positif atau negatif</strong>. Contoh: <em>kencing</em> (K−) → <em>ke belakang</em> (K+)." }
          ] }
        ] },
        { label: "🎯 Kata Tepat", blocks: [
          { type: "list", groups: [{ title: "5 cara memilih kata yang tepat", ordered: true, items: [
            "Mencermati kata <strong>bersinonim</strong> — benar = betul",
            "Mencermati makna <strong>konotasi & denotasi</strong> — kencing (K−) → ke belakang (K+)",
            "Mencermati kata/<strong>istilah asing</strong> — efektif → berhasil guna",
            "Mencermati kata <strong>umum & khusus</strong> — melihat → menengok, menjenguk, mengintip, melirik, menatap, mengamati",
            "Mencermati kata yang <strong>mirip</strong> — intensif ≠ insentif" ] }] }
        ] },
        { label: "👍 Kata Lazim", blocks: [
          { type: "table", headers: ["Kalimat tidak lazim", "Kalimat lazim"], rows: [
            ["<em>Dies natalis</em> Mitha dirayakan di panti asuhan.", "<strong>Ulang tahun</strong> Mitha dirayakan di panti asuhan."],
            ["Ratna <em>tumbang</em> dari tangga.", "Ratna <strong>jatuh</strong> dari tangga."],
            ["Kucing kesayangan Shinta <em>wafat</em>.", "Kucing kesayangan Shinta <strong>mati</strong>."]
          ], defaultNote: "Kata lazim = kata yang umum dipakai pada konteks tertentu sehingga <strong>tidak terasa janggal</strong>." }
        ] },
        { label: "✂️ Kata Hemat", blocks: [
          { type: "table", headers: ["Tidak hemat", "Hemat"], rows: [
            ["agar supaya", "<strong>agar</strong> (atau supaya)"],
            ["berbagai faktor-faktor", "<strong>berbagai faktor</strong>"],
            ["dan lain sebagainya", "<strong>dan lain-lain</strong> / <strong>dan sebagainya</strong>"],
            ["sejak dari", "<strong>sejak</strong>"]
          ], defaultNote: "Kata hemat = padat makna, tidak mengulang makna yang sama (pleonasme)." }
        ] }
      ]
    },
    {
      type: "table",
      label: "Interaktif 7 • Kata Baku",
      title: "Kamus Mini Kata Baku vs Tidak Baku",
      desc: "Ragam formal memakai kata baku; ragam tidak formal cenderung tidak baku. Klik tombol untuk menyorot kolom.",
      headers: ["Tidak baku", "Baku", "Tidak baku", "Baku", "Tidak baku", "Baku"],
      rows: [
        ["antri", "antre", "himbau", "imbau", "musium", "museum"],
        ["apotik", "apotek", "hutang", "utang", "nasehat", "nasihat"],
        ["analisa", "analisis", "ijasah", "ijazah", "obyek", "objek"],
        ["aktifitas", "aktivitas", "ijin", "izin", "praktek", "praktik"],
        ["atlit", "atlet", "jadual", "jadwal", "resiko", "risiko"],
        ["cidera", "cedera", "jaman", "zaman", "sekedar", "sekadar"],
        ["diagnosa", "diagnosis", "kreatifitas", "kreativitas", "silahkan", "silakan"],
        ["ekstrim", "ekstrem", "kwalitas", "kualitas", "sistim", "sistem"],
        ["frekwensi", "frekuensi", "karir", "karier", "tehnik", "teknik"],
        ["hakekat", "hakikat", "merk", "merek", "nampak", "tampak"],
        ["hipotesa", "hipotesis", "milyar", "miliar", "teoritis", "teoretis"],
        ["hirarki", "hierarki", "nafas", "napas", "meminimalisir", "meminimalkan"],
        ["pondasi", "fondasi", "komplit", "komplet", "rubah", "ubah"]
      ],
      modes: [
        { label: "Sorot kata BAKU", target: "none", title: "Kolom ke-2, ke-4, dan ke-6 adalah bentuk baku", text: "Pola yang sering muncul: <strong>-isa → -isis</strong> (analisis, diagnosis, hipotesis), <strong>-itas → -ivitas</strong> (aktivitas, kreativitas), <strong>kw → ku</strong> (kualitas, frekuensi), <strong>j/s → z</strong> (zaman, izin, ijazah)." },
        { label: "Jebakan paling sering", target: "none", title: "Hafalkan yang ini!", text: "<strong>praktik</strong> (bukan praktek), <strong>silakan</strong> (bukan silahkan), <strong>risiko</strong> (bukan resiko), <strong>sekadar</strong> (bukan sekedar), <strong>meminimalkan</strong> (bukan meminimalisir), <strong>ubah</strong> (bukan rubah), <strong>napas</strong> (bukan nafas), <strong>Ramadan</strong>, <strong>salat</strong>, <strong>Jumat</strong>, <strong>sepak bola</strong>, <strong>ibu kota</strong>, <strong>olahraga</strong>." }
      ]
    }
  ],
  simulator: [
    LAB3.BINDO_IMBUHAN,
    {
      type: "exercise",
      label: "Latihan 1 • Peluluhan",
      title: "Ketik Bentuk Kata yang Benar",
      desc: "Tulis hasil gabungan imbuhan dan kata dasar (huruf kecil), lalu periksa.",
      headers: ["Imbuhan + kata dasar", "Hasil"],
      rows: [
        { cells: ["meN- + konsumsi"], fields: [{ answer: "mengonsumsi", placeholder: "me…" }], ok: "✓ K + vokal → luluh.", hints: [{ field: 0, value: "mengkonsumsi", msg: "✗ Jebakan! k diikuti vokal harus luluh → mengonsumsi." }] },
        { cells: ["meN- + telaah"], fields: [{ answer: "menelaah", placeholder: "me…" }], ok: "✓ T luluh.", hints: [{ field: 0, value: "mentelaah", msg: "✗ t diikuti vokal harus luluh → menelaah." }] },
        { cells: ["meN- + survei"], fields: [{ answer: "menyurvei", placeholder: "me…" }], ok: "✓ S luluh menjadi ny.", hints: [{ field: 0, value: "mensurvei", msg: "✗ s diikuti vokal harus luluh → menyurvei." }] },
        { cells: ["meN- + pelihara"], fields: [{ answer: "memelihara", placeholder: "me…" }], ok: "✓ P luluh." },
        { cells: ["meN- + kritik"], fields: [{ answer: "mengkritik", placeholder: "me…" }], ok: "✓ kr = dua konsonan, tidak luluh.", hints: [{ field: 0, value: "mengritik", msg: "✗ kr adalah gugus konsonan, k tidak luluh → mengkritik." }] },
        { cells: ["meN- + transfer"], fields: [{ answer: "mentransfer", placeholder: "me…" }], ok: "✓ tr = dua konsonan, tidak luluh." },
        { cells: ["meN- + sponsor + -i"], fields: [{ answer: "mensponsori", placeholder: "me…" }], ok: "✓ sp = dua konsonan, tidak luluh." },
        { cells: ["peN- + telaah"], fields: [{ answer: "penelaah", placeholder: "pe…" }], ok: "✓ peN- mengikuti pola yang sama." },
        { cells: ["peN- + protes (bentuk khusus)"], fields: [{ answer: "pemrotes", placeholder: "pe…" }], ok: "✓ Bentuk khusus sesuai materi: pemrotes." }
      ]
    },
    {
      type: "detective",
      label: "Latihan 2 • Detektif Diksi",
      title: "Temukan 6 Kesalahan Pilihan Kata!",
      desc: "Klik bagian merah untuk memperbaikinya. Perhatikan syarat diksi: <strong>tepat, lazim, hemat, baku</strong>.",
      rules: ["Kata tepat", "Kata lazim", "Kata hemat", "Kata baku"],
      headers: ["No.", "Kalimat", "Bagian bermasalah", "Lanjutan"],
      rows: [
        ["1", "Kita harus belajar", "agar supaya", "lulus UTS."],
        ["2", "Ada", "berbagai faktor-faktor", "yang memengaruhi nilai."],
        ["3", "Kucing kesayangan Shinta", "wafat", "tadi pagi."],
        ["4", "Mahasiswa wajib mengikuti", "praktek", "di laboratorium."],
        ["5", "Kami melakukan", "analisa", "data penelitian."],
        ["6", "Ia sudah tinggal di kota itu", "sejak dari", "tahun 2010."]
      ],
      bugs: [
        { row: 0, col: 2, fixed: "agar", explain: "✅ <strong>Kata hemat:</strong> <em>agar</em> dan <em>supaya</em> bermakna sama; cukup pakai salah satu." },
        { row: 1, col: 2, fixed: "berbagai faktor", explain: "✅ <strong>Kata hemat:</strong> <em>berbagai</em> sudah menyatakan jamak, jadi tidak perlu kata ulang <em>faktor-faktor</em>." },
        { row: 2, col: 2, fixed: "mati", explain: "✅ <strong>Kata lazim:</strong> <em>wafat</em> tidak lazim untuk hewan; yang lazim adalah <em>mati</em>." },
        { row: 3, col: 2, fixed: "praktik", explain: "✅ <strong>Kata baku:</strong> bentuk bakunya <em>praktik</em>, bukan <em>praktek</em>." },
        { row: 4, col: 2, fixed: "analisis", explain: "✅ <strong>Kata baku:</strong> bentuk bakunya <em>analisis</em>, bukan <em>analisa</em>." },
        { row: 5, col: 2, fixed: "sejak", explain: "✅ <strong>Kata hemat:</strong> <em>sejak dari</em> berlebihan; cukup <em>sejak</em>." }
      ]
    },
    {
      type: "exercise",
      label: "Latihan 3 • Cara Penyerapan",
      title: "Tentukan Cara Peminjaman Katanya",
      headers: ["Kata asing → kata Indonesia", "Cara peminjaman"],
      rows: [
        { cells: ["supermarket → supermarket"], fields: [{ options: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], answer: "Adopsi" }], ok: "✓ Bentuk dan makna diambil utuh." },
        { cells: ["pluralization → pluralisasi"], fields: [{ options: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], answer: "Adaptasi" }], ok: "✓ Ejaannya disesuaikan." },
        { cells: ["overlap → tumpang tindih"], fields: [{ options: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], answer: "Penerjemahan" }], ok: "✓ Konsep dicari padanannya." },
        { cells: ["spare parts → suku cadang"], fields: [{ options: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], answer: "Kreasi" }], ok: "✓ Contoh kreasi menurut materi." },
        { cells: ["plaza → plaza"], fields: [{ options: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], answer: "Adopsi" }], ok: "✓ Diambil utuh." },
        { cells: ["acceptability → akseptabilitas"], fields: [{ options: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], answer: "Adaptasi" }], ok: "✓ Ejaan disesuaikan." },
        { cells: ["try out → uji coba"], fields: [{ options: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], answer: "Penerjemahan" }], ok: "✓ Dicari padanannya." },
        { cells: ["effective → berhasil guna"], fields: [{ options: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], answer: "Kreasi" }], ok: "✓ Satu kata asing menjadi dua kata Indonesia." }
      ]
    },
    {
      type: "exercise",
      label: "Latihan 4 • Baku atau Tidak?",
      title: "Uji Cepat Kata Baku",
      headers: ["Kata", "Status"],
      rows: [
        { cells: ["silahkan"], fields: [{ options: BAKU, answer: "Tidak baku" }], ok: "✓ Baku: silakan." },
        { cells: ["risiko"], fields: [{ options: BAKU, answer: "Baku" }], ok: "✓ Bukan ‘resiko’." },
        { cells: ["sekedar"], fields: [{ options: BAKU, answer: "Tidak baku" }], ok: "✓ Baku: sekadar." },
        { cells: ["kualitas"], fields: [{ options: BAKU, answer: "Baku" }], ok: "✓ Bukan ‘kwalitas’." },
        { cells: ["meminimalisir"], fields: [{ options: BAKU, answer: "Tidak baku" }], ok: "✓ Baku: meminimalkan." },
        { cells: ["apotek"], fields: [{ options: BAKU, answer: "Baku" }], ok: "✓ Bukan ‘apotik’." },
        { cells: ["kreatifitas"], fields: [{ options: BAKU, answer: "Tidak baku" }], ok: "✓ Baku: kreativitas." },
        { cells: ["izin"], fields: [{ options: BAKU, answer: "Baku" }], ok: "✓ Bukan ‘ijin’." },
        { cells: ["nasehat"], fields: [{ options: BAKU, answer: "Tidak baku" }], ok: "✓ Baku: nasihat." },
        { cells: ["teoretis"], fields: [{ options: BAKU, answer: "Baku" }], ok: "✓ Bukan ‘teoritis’." }
      ]
    }
  ],
  flashcards: [
    { tag: "Serapan", q: "Sebutkan 4 cara peminjaman kata asing beserta contohnya!", a: "1) <strong>Adopsi</strong>: supermarket<br>2) <strong>Adaptasi</strong>: pluralization → pluralisasi<br>3) <strong>Penerjemahan</strong>: overlap → tumpang tindih<br>4) <strong>Kreasi</strong>: spare parts → suku cadang" },
    { tag: "Jebakan UTS", q: "Apa beda adopsi dan adaptasi?", a: "<strong>Adopsi:</strong> bentuk dan makna diambil utuh (plaza).<br><strong>Adaptasi:</strong> makna diambil, ejaannya disesuaikan (acceptability → akseptabilitas)." },
    { tag: "Afiksasi", q: "Sebutkan 4 jenis proses afiksasi beserta contohnya!", a: "1) Prefiksasi: ke- + kasih → kekasih<br>2) Infiksasi: -el- + tunjuk → telunjuk<br>3) Sufiksasi: genang + -an → genangan<br>4) Konfiksasi: ke-an, per-an, di-kan" },
    { tag: "Infiks", q: "Sebutkan 4 macam infiks (sisipan)!", a: "<strong>-el-, -em-, -er-, -in-</strong>" },
    { tag: "Konfiks", q: "Apa yang dimaksud konfiks?", a: "Gabungan dua imbuhan atau lebih yang <strong>mengapit</strong> kata dasar dan <strong>bersama-sama membentuk satu arti</strong>, misalnya per-an, me-per-kan, di-kan, ke-an." },
    { tag: "Imbuhan Asing", q: "Sebutkan 5 imbuhan asing dan cara penulisannya!", a: "multi-, anti-, semi-, non-, pra-, infra-, ultra-, ekstra-, intra-, -is, -isasi. Ditulis <strong>serangkai</strong>: antivirus, nonformal, ekstrakurikuler." },
    { tag: "Imbuhan Daerah", q: "Sebutkan 5 imbuhan daerah (Sanskerta) beserta contohnya!", a: "tuna- (tunawisma), nara- (narapidana), pasca- (pascapanen), swa- (swadaya), panca- (pancaindra), dasa- (dasawarsa)." },
    { tag: "Peluluhan", q: "Kapan imbuhan meN- dan peN- mengalami peluluhan?", a: "Saat bertemu kata dasar berhuruf awal <strong>K, T, S, P</strong> yang diikuti vokal (mengonsumsi, menelaah, menyurvei, memelihara). <strong>Tidak luluh</strong> jika diawali dua konsonan (mengkritik, mentransfer)." },
    { tag: "Makna", q: "Bedakan makna leksikal, gramatikal, denotasi, dan konotasi!", a: "• <strong>Leksikal:</strong> makna kamus<br>• <strong>Gramatikal:</strong> makna menurut konteks gramatikal<br>• <strong>Denotasi:</strong> makna sebenarnya tanpa nilai rasa<br>• <strong>Konotasi:</strong> makna dengan nilai rasa (+/−)" },
    { tag: "Diksi", q: "Sebutkan 4 syarat pemilihan kata (diksi)!", a: "Kata yang <strong>tepat</strong>, <strong>lazim</strong>, <strong>hemat</strong>, dan <strong>baku</strong>." },
    { tag: "Kata Hemat", q: "Perbaiki: “agar supaya”, “berbagai faktor-faktor”, “sejak dari”!", a: "<strong>agar</strong> • <strong>berbagai faktor</strong> • <strong>sejak</strong>" },
    { tag: "Kata Baku", q: "Tuliskan bentuk baku: praktek, analisa, resiko, silahkan, jaman, nafas!", a: "<strong>praktik, analisis, risiko, silakan, zaman, napas</strong>" }
  ],
  quiz: [
    { q: "Kata “tumpang tindih” yang berasal dari kata asing “overlap” dibentuk melalui cara …",
      opts: ["Adopsi", "Adaptasi", "Penerjemahan", "Kreasi"], ans: 2,
      exp: "Penerjemahan terjadi saat konsep kata asing dicari padanannya dalam bahasa Indonesia (overlap → tumpang tindih).",
      optExp: ["Adopsi mengambil bentuk utuh (overlap tetap overlap).", "Adaptasi hanya menyesuaikan ejaan.", "Benar.", "Kreasi dicontohkan pada spare parts → suku cadang dan effective → berhasil guna."] },
    { q: "Kata “akseptabilitas” dari “acceptability” merupakan contoh penyerapan dengan cara …",
      opts: ["Adaptasi", "Adopsi", "Kreasi", "Penerjemahan"], ans: 0,
      exp: "Maknanya diambil, sedangkan ejaannya disesuaikan dengan ejaan bahasa Indonesia.",
      optExp: ["Benar.", "Adopsi tidak mengubah bentuk kata.", "Kreasi menghasilkan bentuk baru dari konsep dasar.", "Penerjemahan memakai padanan kata Indonesia asli."] },
    { q: "Kata “telunjuk” terbentuk melalui proses …",
      opts: ["Prefiksasi", "Infiksasi", "Sufiksasi", "Konfiksasi"], ans: 1,
      exp: "Sisipan -el- diletakkan di tengah kata dasar ‘tunjuk’ sehingga menjadi ‘telunjuk’.",
      optExp: ["Prefiksasi menambahkan awalan.", "Benar.", "Sufiksasi menambahkan akhiran.", "Konfiksasi mengapit di awal dan akhir."] },
    { q: "Penulisan bentuk berimbuhan yang benar adalah …",
      opts: ["mengkonsumsi, mensurvei", "mengonsumsi, menyurvei", "mengonsumsi, mensurvei", "mengkonsumsi, menyurvei"], ans: 1,
      exp: "Huruf k dan s yang diikuti vokal luluh saat mendapat imbuhan meN-.",
      optExp: ["Keduanya tidak luluh, salah.", "Benar.", "‘mensurvei’ salah, seharusnya luluh.", "‘mengkonsumsi’ salah, seharusnya luluh."] },
    { q: "Kata dasar berawalan K, T, S, P tidak mengalami peluluhan jika …",
      opts: ["Mendapat imbuhan peN-", "Kata dasarnya berasal dari bahasa asing", "Diawali dua huruf konsonan berurutan", "Kata dasarnya lebih dari dua suku kata"], ans: 2,
      exp: "Peluluhan tidak terjadi bila kata dasar diawali gugus konsonan (dua konsonan berurutan), seperti kritik dan transfer.",
      optExp: ["peN- juga mengalami peluluhan (pengonsumsi).", "Konsumsi dan survei berasal dari bahasa asing tetapi tetap luluh.", "Benar.", "Jumlah suku kata tidak berpengaruh."] },
    { q: "Penulisan imbuhan asing dan imbuhan daerah yang tepat terdapat pada …",
      opts: ["anti virus, pasca panen", "anti-virus, pasca-panen", "antivirus, pascapanen", "Anti Virus, Pasca Panen"], ans: 2,
      exp: "Imbuhan asing dan imbuhan daerah ditulis serangkai dengan kata dasar yang mengikutinya.",
      optExp: ["Dipisah spasi, salah.", "Tanda hubung tidak diperlukan.", "Benar.", "Kapital dan dipisah, salah."] },
    { q: "Kalimat “Kucing kesayangan Shinta wafat tadi pagi” tidak memenuhi syarat diksi …",
      opts: ["Kata yang hemat", "Kata yang lazim", "Kata yang baku", "Kata yang bersinonim"], ans: 1,
      exp: "‘Wafat’ tidak lazim untuk hewan; kata yang lazim adalah ‘mati’.",
      optExp: ["Tidak ada kata berlebihan dalam kalimat itu.", "Benar.", "‘wafat’ adalah kata baku.", "Sinonim bukan syarat diksi yang dilanggar di sini."] },
    { q: "Kalimat yang menggunakan kata hemat adalah …",
      opts: ["Kita harus belajar agar supaya lulus.", "Ada berbagai faktor-faktor penyebabnya.", "Ia tinggal di sini sejak tahun 2010.", "Ia membeli buku, pensil, dan lain sebagainya."], ans: 2,
      exp: "‘sejak’ sudah hemat; bentuk tidak hematnya ‘sejak dari’.",
      optExp: ["‘agar supaya’ berlebihan.", "‘berbagai faktor-faktor’ berlebihan.", "Benar.", "Seharusnya ‘dan lain-lain’ atau ‘dan sebagainya’."] },
    { q: "Kata ‘ke belakang’ sebagai pengganti ‘kencing’ dipilih karena memiliki …",
      opts: ["Makna leksikal yang sama", "Makna denotasi positif", "Nilai rasa (konotasi) positif", "Makna gramatikal"], ans: 2,
      exp: "‘Kencing’ berkonotasi negatif (K−), sedangkan ‘ke belakang’ berkonotasi positif (K+), sehingga lebih santun.",
      optExp: ["Makna leksikal keduanya justru berbeda.", "Denotasi tidak memiliki nilai rasa.", "Benar.", "Bukan soal kedudukan gramatikal."] },
    { q: "Deretan kata baku yang benar adalah …",
      opts: ["praktek, analisa, resiko", "praktik, analisis, risiko", "praktik, analisa, risiko", "praktek, analisis, resiko"], ans: 1,
      exp: "Bentuk baku: praktik, analisis, risiko.",
      optExp: ["Ketiganya tidak baku.", "Benar.", "‘analisa’ tidak baku.", "‘praktek’ dan ‘resiko’ tidak baku."] }
  ],
  ringkasan: `*RANGKUMAN KILAT UTS BAHASA INDONESIA — PERTEMUAN 3*
📚 *Pembentukan Kata & Pemilihan Kata (Diksi)*

1️⃣ *4 cara peminjaman kata asing:*
• *Adopsi* (utuh): supermarket, plaza
• *Adaptasi* (ejaan disesuaikan): pluralisasi, akseptabilitas
• *Penerjemahan* (padanan): overlap → tumpang tindih, try out → uji coba
• *Kreasi* (konsep dasar): effective → berhasil guna, spare parts → suku cadang

2️⃣ *Afiksasi:*
• Prefiks: ke+kasih → kekasih • Infiks (-el-, -em-, -er-, -in-): telunjuk
• Sufiks: genangan • Konfiks: per-an, me-per-kan, di-kan, ke-an
• Imbuhan asing & daerah ditulis *serangkai*: antivirus, nonformal, pascapanen, tunawisma.

3️⃣ *Peluluhan meN-/peN-:*
• K T S P + vokal → luluh: mengonsumsi, menelaah, menyurvei, memelihara
• Dua konsonan → tidak luluh: mengkritik, mentransfer, mensponsori, memprotes
• Bentuk khusus: *pemrotes*.

4️⃣ *Diksi = tepat, lazim, hemat, baku:*
• Makna: leksikal (kamus), gramatikal (konteks), denotasi (tanpa nilai rasa), konotasi (+/−)
• Lazim: ulang tahun (bukan dies natalis), kucing *mati* (bukan wafat)
• Hemat: agar (bukan agar supaya), berbagai faktor, sejak
• Baku: antre, apotek, analisis, praktik, risiko, silakan, sekadar, zaman, napas, meminimalkan, ubah.`
};
