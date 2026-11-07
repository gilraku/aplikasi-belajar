// Algoritma dan Pemrograman — Pertemuan 3: Operator, Struktur dan Kontrol Statement
const LAB = require("./lab_alp.js");
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
module.exports = {
  id: "p3", nomor: 3, judul: "Operator, Struktur dan Kontrol Statement", ujian: "CPMK 1",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Mengolah Data dengan Operator",
    text: "Kuasai <strong>operator aritmetika, penugasan, increment/decrement, perbandingan, logika, bitwise, ternary, dan koma</strong>, termasuk <strong>urutan pengerjaannya</strong>. Di akhir: gambaran tiga <strong>struktur kontrol</strong> yang dibahas P4–P7."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya dalam satu kalimat", html: "Dalam <code>A + B</code>, <strong>A dan B adalah operand</strong> (data yang diolah) dan <strong>+ adalah operator</strong>. Hasil operator perbandingan dan logika selalu <strong>true (1) atau false (0)</strong>, dan hasil inilah yang dipakai if dan perulangan untuk mengambil keputusan." },
    { type: "table", label: "Interaktif 1 • Sifat Operator", title: "Berapa Operand yang Dilibatkan?", headers: ["Sifat", "Jumlah operand", "Contoh"],
      rows: [["Unary", "1", "<code>++a</code>, <code>--a</code>, <code>-a</code>, <code>!a</code>"], ["Binary", "2", "<code>a + b</code>, <code>a &gt; b</code>, <code>a &amp;&amp; b</code>"], ["Ternary", "3", "<code>(nilai &gt;= 60) ? \"Lulus\" : \"Tidak\"</code>"]],
      modes: [{ label: "Koreksi slide", target: "row", row: 0, title: "Unary bukan hanya ++ dan --", text: "Slide menyebut dua operator unary utama (++ dan --), padahal contohnya sendiri <code>-a</code> juga unary. ➕ Tanda negatif <code>-</code>, NOT <code>!</code>, dan bitwise NOT <code>~</code> juga unary." },
        { label: "Satu-satunya", target: "row", row: 2, title: "?: adalah satu-satunya operator ternary di C++", text: "Bentuk: <code>kondisi ? nilaiJikaBenar : nilaiJikaSalah</code>." }] },
    { type: "table", label: "Interaktif 2 • Aritmetika", title: "Lima Operator Aritmetika (a = 17, b = 5)", headers: ["Operator", "Arti", "Contoh", "Hasil"],
      rows: [["<code>+</code>", "Tambah", "<code>a + b</code>", "22"], ["<code>-</code>", "Kurang", "<code>a - b</code>", "12"], ["<code>*</code>", "Kali", "<code>a * b</code>", "85"], ["<code>/</code>", "Bagi", "<code>a / b</code>", "3 (bukan 3.4!)"], ["<code>%</code>", "Sisa bagi (modulo)", "<code>a % b</code>", "2"]],
      modes: [{ label: "Jebakan nomor 1", target: "row", row: 3, title: "int / int = int", text: "➕ Jika kedua operand bilangan bulat, hasil bagi dipotong: 17 / 5 = 3. Agar 3.4, salah satu harus desimal: <code>17.0 / 5</code> atau <code>(float)a / b</code>." },
        { label: "Paling berguna", target: "row", row: 4, title: "% untuk cek kelipatan", text: "➕ <code>x % 3 == 0</code> berarti x habis dibagi 3 (kelipatan 3). % hanya untuk bilangan bulat; <code>7.5 % 2</code> ditolak compiler." }] },
    { type: "table", label: "Interaktif 3 • Perbandingan & Logika", title: "Hasilnya Selalu true (1) / false (0)", headers: ["Operator", "Arti", "Contoh (a = 5, b = 8)", "Hasil"],
      rows: [["<code>==</code>", "Sama dengan", "<code>a == b</code>", "0"], ["<code>!=</code>", "Tidak sama dengan", "<code>a != b</code>", "1"], ["<code>&lt;</code> / <code>&lt;=</code>", "Kurang dari (atau sama)", "<code>a &lt; b</code>", "1"], ["<code>&gt;</code> / <code>&gt;=</code>", "Lebih dari (atau sama)", "<code>a &gt;= 5</code>", "1"], ["<code>&amp;&amp;</code>", "DAN: benar jika keduanya benar", "<code>a &gt; 0 &amp;&amp; b &gt; 10</code>", "0"], ["<code>||</code>", "ATAU: benar jika salah satu benar", "<code>a &gt; 0 || b &gt; 10</code>", "1"], ["<code>!</code>", "TIDAK: membalik", "<code>!(a == 5)</code>", "0"]],
      modes: [{ label: "Bug paling klasik", target: "row", row: 0, title: "== bukan =", text: "<code>=</code> mengisi nilai, <code>==</code> membandingkan. <code>if (a = 5)</code> mengisi a dengan 5 lalu selalu dianggap benar." }] },
    { type: "table", label: "Interaktif 4 • Penugasan Majemuk", title: "Compound Assignment (Bentuk Singkat)", headers: ["Ditulis", "Sama dengan"],
      rows: [["<code>y += x;</code>", "<code>y = y + x;</code>"], ["<code>x -= 5;</code>", "<code>x = x - 5;</code>"], ["<code>x /= y;</code>", "<code>x = x / y;</code>"], ["<code>price *= units + 1;</code>", "<code>price = price * (units + 1);</code>"], ["<code>x %= 3;</code>", "<code>x = x % 3;</code>"]],
      modes: [{ label: "Perhatikan kurung", target: "row", row: 3, title: "Sisi kanan dihitung dulu", text: "Bukan <code>price * units + 1</code>. Seluruh sisi kanan dihitung dulu, baru dikalikan." }] }
  ],
  simulator: [
    { type: "trace-lab", label: "Lab Algoritma • Telusuri Operator", title: "Hitung Ekspresi Selangkah demi Selangkah", desc: "Tebak dulu, lalu tekan <strong>Langkah Berikutnya</strong>. Bagian ekspresi yang sedang dihitung diberi stabilo, dan panel Keadaan menunjukkan nilai variabel serta output.", tip: "Ini penelusuran yang sudah disiapkan, bukan compiler C++ sungguhan.", cases: LAB.P3 },
    { type: "terminal", label: "Permainan Interaktif 1 • Prefix vs Postfix", title: "Kapan Nilainya Naik?", desc: "Setiap skenario dimulai dengan <code>int x = 5;</code>", shell: "$", header: "Simulasi ++ dan --",
      scenarios: [
        { label: "1. y = x++;", pill: "postfix", ok: true, cmd: "int y = x++;\ncout << y << \" \" << x;", res: "5 6", exp: "<strong>Postfix</strong>: nilai lama (5) dipakai dulu untuk y, baru x naik menjadi 6." },
        { label: "2. y = ++x;", pill: "prefix", ok: true, cmd: "int y = ++x;\ncout << y << \" \" << x;", res: "6 6", exp: "<strong>Prefix</strong>: x naik dulu menjadi 6, lalu nilai baru dipakai untuk y." },
        { label: "3. cout << x++", pill: "postfix", ok: true, cmd: "cout << x++ << endl;\ncout << x;", res: "5\n6", exp: "Baris pertama mencetak nilai lama, baris kedua sudah naik." },
        { label: "4. y = x--;", pill: "postfix", ok: true, cmd: "int y = x--;\ncout << y << \" \" << x;", res: "5 4", exp: "Sama seperti ++, hanya turun." },
        { label: "5. x++ sendirian", pill: "sama saja", ok: true, cmd: "x++;   // atau ++x;\ncout << x;", res: "6", exp: "Kalau tidak dipakai di ekspresi lain, prefix dan postfix hasilnya sama." }
      ] },
    ex("Permainan Interaktif 2 • Hitung Ekspresi", "Berapa Hasilnya? (int a = 10, b = 3)", ["Ekspresi", "Hasil"], ["0", "1", "3", "4", "13", "16", "19"], [
      ["a / b", "3"], ["a % b", "1"], ["a + b * 2", "16"], ["(a + b) * 2 - 7", "19"], ["a > b && b > 5", "0"], ["a > b || b > 5", "1"], ["!(a == 10)", "0"], ["a - b * 2 - 3", "1"], ["(a > b) ? a + b : a - b", "13"], ["a % 2 + b % 2 + a / b", "4"]]),
    ex("Permainan Interaktif 3 • Tabel Kebenaran", "Lengkapi Hasil Operator Logika", ["Ekspresi", "Hasil"], ["true", "false"], [
      ["true && true", "true"], ["true && false", "false"], ["false || true", "true"], ["false || false", "false"], ["!true", "false"], ["!(false && true)", "true"]]),
    { type: "reveal", label: "Latihan Lisan", title: "Operator Koma dan Bitwise", items: [
      { prompt: "a = (b = 3, b + 2, c = 10); Berapa a, b, c?", answer: "a = 10, b = 3, c = 10", reason: "Ekspresi dikerjakan dari kiri; yang diambil hanya ekspresi paling kanan. b + 2 dihitung tetapi hasilnya dibuang." },
      { prompt: "12 & 10 = ?", answer: "8", reason: "1100 & 1010 = 1000. Bit hasil 1 hanya jika keduanya 1." },
      { prompt: "5 << 1 = ?", answer: "10", reason: "Geser kiri 1 bit = dikali 2." }
    ] }
  ],
  flashcards: [
    { tag: "Konsep", q: "Operand vs operator?", a: "Operand = data yang diolah (A, B); operator = simbol pengolahnya (+)." },
    { tag: "Sifat", q: "Unary, binary, ternary?", a: "Melibatkan 1, 2, dan 3 operand. Contoh: -a, a + b, k ? x : y." },
    { tag: "Aritmetika", q: "17 / 5 dan 17 % 5?", a: "3 dan 2 (pembagian bulat dan sisanya)." },
    { tag: "Aritmetika", q: "Agar 17 / 5 = 3.4?", a: "Jadikan salah satu desimal: 17.0 / 5 atau (float)17 / 5." },
    { tag: "Increment", q: "x++ vs ++x?", a: "Postfix: pakai dulu, baru naik. Prefix: naik dulu, baru dipakai." },
    { tag: "Relasi", q: "= vs ==?", a: "= mengisi nilai; == membandingkan." },
    { tag: "Logika", q: "&& vs ||?", a: "&& benar jika semua benar; || benar jika minimal satu benar." },
    { tag: "Ternary", q: "Bentuk operator ternary?", a: "kondisi ? nilaiBenar : nilaiSalah" },
    { tag: "Koma", q: "a = (b=3, b+2, c=10) → a?", a: "10 (ekspresi paling kanan)." },
    { tag: "Urutan", q: "Urutan prioritas singkat?", a: "() → unary (! ++ --) → * / % → + - → < > → == != → && → || → ?: → = +=" },
    { tag: "Kontrol", q: "Tiga struktur kontrol?", a: "Runtunan, percabangan (if, switch: P4–P5), perulangan (for, while, do-while: P6–P7)." }
  ],
  quiz: [
    Q("Pada ekspresi A + B, yang disebut operand adalah…", ["A dan B", "+", "A + B", "Hasilnya"], 0, "Operand = data yang diolah."),
    Q("Operator yang hanya melibatkan satu operand disebut…", ["Unary", "Binary", "Ternary", "Comma"], 0, "Contoh: ++a, -a, !a."),
    Q("Contoh operator ternary adalah…", ["kondisi ? x : y", "a + b", "++a", "a && b"], 0, "?: melibatkan tiga operand."),
    Q("Hasil 17 / 5 jika keduanya bertipe int adalah…", ["3", "3.4", "4", "2"], 0, "Pembagian bilangan bulat membuang desimal."),
    Q("Hasil 17 % 5 adalah…", ["2", "3", "3.4", "0"], 0, "17 = 3 × 5 + 2."),
    Q("Ekspresi untuk memeriksa x kelipatan 5 adalah…", ["x % 5 == 0", "x / 5 == 0", "x % 5 == 1", "x == 5"], 0, "Kelipatan 5 berarti sisa bagi 5 sama dengan 0."),
    Q("Pernyataan x -= 5; sama dengan…", ["x = x - 5;", "x = 5 - x;", "x = -5;", "x == x - 5;"], 0, "Bentuk singkat compound assignment."),
    Q("price *= units + 1; sama dengan…", ["price = price * (units + 1);", "price = price * units + 1;", "price = (price * units) + 1;", "price = units + 1;"], 0, "Sisi kanan dihitung dulu."),
    Q("int x = 5; int y = x++; Nilai y dan x adalah…", ["y = 5, x = 6", "y = 6, x = 6", "y = 5, x = 5", "y = 6, x = 5"], 0, "Postfix: pakai dulu, baru naik."),
    Q("int x = 5; int y = ++x; Nilai y adalah…", ["6", "5", "7", "4"], 0, "Prefix: naik dulu."),
    Q("Operator untuk membandingkan “sama dengan” adalah…", ["==", "=", "===", "!="], 0, "= adalah penugasan."),
    Q("Hasil operator perbandingan 5 > 3 adalah…", ["1 (true)", "0 (false)", "2", "5"], 0, "Hasil perbandingan selalu boolean."),
    Q("Ekspresi (a > 0 && b > 0) bernilai true jika…", ["a dan b keduanya positif", "Salah satu positif", "Keduanya negatif", "a sama dengan b"], 0, "&& memerlukan semua kondisi benar."),
    Q("Nilai !(5 == 5) adalah…", ["false", "true", "5", "Error"], 0, "5 == 5 true, lalu dibalik."),
    Q("Hasil 10 + 3 * 2 adalah…", ["16", "26", "15", "13"], 0, "* dikerjakan sebelum +."),
    Q("a = (b = 3, b + 2, c = 10); Nilai a adalah…", ["10", "3", "5", "15"], 0, "Operator koma mengambil ekspresi paling kanan."),
    Q("Hasil 12 & 10 (bitwise AND) adalah…", ["8", "14", "6", "22"], 0, "1100 & 1010 = 1000 = 8."),
    Q("Penulisan ternary yang benar untuk menyimpan teks adalah…", ["ket = (nilai > 60) ? \"lulus\" : \"tidak\";", "ket = (nilai > 60) ? lulus : tidak;", "ket = nilai > 60 : \"lulus\" ? \"tidak\";", "ket = if (nilai > 60) \"lulus\";"], 0, "Koreksi slide: teks harus diberi petik dua; tanpa petik, lulus dianggap nama variabel."),
    Q("Operator % tidak dapat dipakai pada…", ["Bilangan desimal (float/double)", "int", "long", "short"], 0, "Untuk desimal gunakan fungsi fmod dari <cmath>."),
    Q("Tiga struktur kontrol dalam pemrograman adalah…", ["Runtunan, percabangan, perulangan", "Input, proses, output", "if, switch, for", "Unary, binary, ternary"], 0, "if dan switch adalah percabangan; for, while, do-while adalah perulangan.")
  ],
  ringkasan: `*RANGKUMAN P3 ALGORITMA & PEMROGRAMAN*
🔣 Operand = data, operator = simbol. Sifat: unary (−a, ++a, !a), binary (a + b), ternary (k ? x : y)
➗ + − * / % → int/int dibulatkan ke bawah (17/5 = 3), % = sisa (17%5 = 2)
✍️ Majemuk: y += x → y = y + x
⬆️ x++ pakai dulu baru naik; ++x naik dulu baru dipakai
⚖️ == != < <= > >= → hasil 1/0. Ingat: = mengisi, == membandingkan
🔗 && (dan), || (atau), ! (tidak)
🔢 Bitwise & | ^ ~ << >> bekerja di bilangan biner
❓ ternary: (nilai >= 60) ? "Lulus" : "Tidak"
📏 Prioritas: () → unary → * / % → + − → < > → == != → && → || → ?: → =
🧭 Kontrol: runtunan, percabangan (P4–P5), perulangan (P6–P7)`
};
