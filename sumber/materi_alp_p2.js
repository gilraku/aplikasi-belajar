// Materi Lengkap Algoritma & Pemrograman P2
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const code = (file, src, note, title) => ({ type: "code", lang: "cpp", label: "Contoh Kode", title, file, code: src, note });

const lines = [["#include <iostream>", "pre", "sky", "Preprocessor directive"], ["using namespace std;", "ns", "slate", "Namespace"], ["int main() {", "main", "violet", "Fungsi utama + blok pembuka"], ["    // menyapa pengguna", "kom", "slate", "Komentar"], ["    cout << \"Selamat Datang\";", "stmt", "emerald", "Pernyataan (statement)"], ["    return 0;", "ret", "amber", "Nilai kembali"], ["}", "main", "violet", "Blok penutup"]];
const anat = diagram({
  label: "Diagram Interaktif", title: "Anatomi Program dari Slide", desc: "Klik setiap baris kode atau labelnya.", minw: 600,
  svg: svg(780, 7 * 46 + 20,
    lines.map(([c, p, tone, l], i) => { const y = 10 + i * 46;
      return `<g data-part="${p}">` + `<rect x="10" y="${y}" width="430" height="38" rx="8" fill="#0f172a" stroke="${C[tone][1]}" stroke-width="2"/>` + text(24, y + 19, c, { size: 15, color: "#e2e8f0", anchor: "start", weight: 600 }) + arrow(446, y + 19, 486, y + 19) + box(490, y, 280, 38, l, tone, null, { size: 14, r: 8 }) + "</g>"; }).join("")
  ),
  parts: [
    { id: "pre", label: "#include", title: "Preprocessor directive", text: "Diproses sebelum kompilasi: isi file header <code>iostream</code> disalin ke program agar <code>cout</code>/<code>cin</code> dikenal. Koreksi slide: ditulis <code>#include &lt;iostream&gt;</code>, bukan <code>&lt;include&gt;</code> dan bukan <code>&lt;iostream.h&gt;</code> (bentuk lama sebelum standar 1998)." },
    { id: "ns", label: "namespace", title: "using namespace std;", text: "➕ Semua isi pustaka standar berada di “ruang nama” <code>std</code>. Tanpa baris ini, kamu harus menulis <code>std::cout</code> seperti contoh di slide. Keduanya benar." },
    { id: "main", label: "main", title: "int main() { … }", text: "Fungsi yang otomatis dijalankan pertama kali. <code>int</code> = tipe nilai kembalian. <code>()</code> tempat parameter, dikosongkan. <code>{ }</code> menandai satu blok (ruang lingkup)." },
    { id: "kom", label: "Komentar", title: "Diabaikan compiler", text: "<code>//</code> untuk satu baris, <code>/* … */</code> untuk banyak baris. Gunakan untuk menjelaskan <em>mengapa</em>, bukan mengulang kodenya." },
    { id: "stmt", label: "Statement", title: "Perintah yang dikerjakan", text: "Setiap pernyataan diakhiri <code>;</code>. Teks di dalam petik dua ditampilkan apa adanya." },
    { id: "ret", label: "return 0", title: "Program selesai normal", text: "Angka 0 dikirim ke sistem operasi sebagai tanda tidak ada masalah. ➕ Di <code>main</code> baris ini boleh dihilangkan (otomatis 0), tetapi menulisnya adalah kebiasaan baik." }
  ]
});

const X = i => 40 + i * 58;
const groups = [[0, 4, "sky", "umur", "int umur = 19;"], [4, 4, "amber", "ipk", "float ipk = 3.75;"], [8, 1, "violet", "grade", "char grade = 'A';"], [9, 1, "emerald", "lulus", "bool lulus = true;"]];
const mem = diagram({
  label: "Diagram Interaktif ➕", title: "Variabel di Dalam Memori", desc: "Setiap kotak kecil = 1 byte dengan alamatnya sendiri. Klik variabel untuk melihat berapa byte yang dipesan.", minw: 640,
  svg: svg(780, 240,
    Array.from({ length: 12 }, (_, i) => text(X(i) + 27, 52, "0x" + (0x10 + i).toString(16).toUpperCase(), { size: 11, color: "#64748b", weight: 600 })).join("") +
    Array.from({ length: 12 }, (_, i) => { const g = groups.find(([s, n]) => i >= s && i < s + n); return box(X(i), 66, 54, 54, "", g ? g[2] : "slate", null, { r: 6 }); }).join("") +
    groups.map(([s, n, tone, id, decl]) => { const x1 = X(s), x2 = X(s + n - 1) + 54, cx = (x1 + x2) / 2;
      return `<g data-part="${id}"><rect x="${x1 - 3}" y="63" width="${x2 - x1 + 6}" height="60" rx="8" fill="transparent" stroke="${C[tone][1]}" stroke-width="3"/>` + text(cx, 93, id, { size: 14, color: C[tone][2] }) + path(`M${x1},140 V150 H${x2} V140`, { noArrow: true, color: C[tone][1] }) + text(cx, 172, n + " byte", { size: 13, color: C[tone][2] }) + text(id === "lulus" ? cx + 30 : id === "grade" ? cx - 20 : cx, id === "lulus" ? 224 : 200, decl, { size: 12, color: "#334155", weight: 600 }) + "</g>"; }).join("") +
    text(X(10) + 56, 172, "kosong", { size: 12, color: "#94a3b8" })
  ),
  parts: [
    { id: "umur", label: "int", title: "umur: 4 byte", text: "Saat <code>int umur = 19;</code> dijalankan, program meminta 4 byte berurutan. Nama <code>umur</code> hanyalah label untuk alamat awalnya (0x10). Rentang int: sekitar −2,1 miliar sampai 2,1 miliar." },
    { id: "ipk", label: "float", title: "ipk: 4 byte", text: "Sama besar dengan int, tetapi cara menyimpannya berbeda (format bilangan pecahan). Hanya ±7 digit yang akurat. Untuk uang atau hasil hitung panjang, pakai <code>double</code>." },
    { id: "grade", label: "char", title: "grade: 1 byte", text: "Satu karakter disimpan sebagai angka kode ASCII: 'A' = 65. Karena itu <code>char</code> juga bisa dihitung: 'A' + 1 = 'B'." },
    { id: "lulus", label: "bool", title: "lulus: 1 byte", text: "Hanya perlu menyimpan 1 atau 0, tetapi tetap memakai 1 byte karena byte adalah satuan alamat terkecil." }
  ]
});

module.exports = [
  A("Mengenal C++ Lebih Dekat", `<p>PDF “Pengenalan C” menekankan empat sifat C++:</p>
<ul><li><strong>Bahasa tingkat tinggi</strong> (high level language).</li><li><strong>Pengembangan dari bahasa C</strong>: hampir semua kode C bisa dikompilasi sebagai C++.</li><li><strong>Mendukung OOP</strong> (Object Oriented Programming): kelas dan objek. ➕ <code>cout</code> sendiri adalah sebuah objek.</li><li><strong>Case sensitive</strong>: <code>Umur</code> ≠ <code>umur</code>.</li></ul>
<p>File disimpan dengan ekstensi <code>.cpp</code> dan bisa dikerjakan di Dev-C++, Geany, Code::Blocks, atau IDE online.</p>`, "Bagian 1"),
  { type: "cards", label: "Bagian 2", title: "Empat Unsur Kode C++ (PDF Pengenalan C)", cols: 2, items: [
    { badge: "Komentar", tone: "slate", title: "Tidak dieksekusi", text: "Penjelas untuk manusia. <code>// …</code> atau <code>/* … */</code>." },
    { badge: "Identifier", tone: "sky", title: "Nama buatan programmer", text: "Nama variabel, konstanta, fungsi. Contoh: <code>umur</code>, <code>hitungLuas</code>." },
    { badge: "Keyword", tone: "rose", title: "Kata milik C++", text: "Punya arti khusus, tidak boleh jadi identifier: <code>int</code>, <code>if</code>, <code>return</code>, <code>class</code>, <code>new</code>, <code>this</code>, …" },
    { badge: "Library function", tone: "emerald", title: "Fitur siap pakai dari pustaka", text: "Disertakan lewat <code>#include</code>. ➕ <code>sqrt()</code> dari &lt;cmath&gt;, <code>getline()</code> dari &lt;string&gt;. (cout sebenarnya objek, bukan fungsi.)" }
  ] },
  anat,
  tip("Koreksi PDF Pengenalan C", "<ul><li>Gambar menulis <code>&lt;include&gt;</code> dan <code>Int main(){</code>. Yang benar <code>#include &lt;iostream&gt;</code> dan <code>int main() {</code>.</li><li>Contoh <code>cout&lt;&lt;“teks”</code> memakai petik melengkung (“ ”) dari PowerPoint. Compiler hanya menerima petik lurus <code>\"teks\"</code>. Jangan salin kode dari slide/Word langsung.</li><li>“Setiap alamat mewakili satu <strong>bit</strong>” seharusnya satu <strong>byte</strong> (8 bit).</li><li>Paragraf Tipe Data poin 1 tersisip kalimat tentang <code>cin</code> dan Extraction Operator; itu salah tempat, abaikan.</li></ul>", "warn"),
  A("Variabel: Deklarasi dan Inisialisasi", `<p><strong>Variabel</strong> adalah tempat menyimpan nilai yang bisa berubah selama program berjalan. Saat variabel dibuat, program meminta ruang di memori; nama variabel menjadi wakil dari alamat ruang tersebut.</p>
<ul><li><strong>Deklarasi</strong>: membuat variabel dengan tipe dan nama. <code>int umur;</code></li><li><strong>Inisialisasi</strong>: memberi nilai saat dibuat. <code>int umur = 19;</code></li><li><strong>Penugasan</strong> ➕: mengubah nilai setelah dibuat. <code>umur = 20;</code></li><li>Beberapa sekaligus: <code>int a = 1, b = 2, c;</code></li></ul>
<p>➕ <strong>Konstanta</strong> adalah “variabel” yang nilainya dikunci: <code>const float PI = 3.14;</code>. Mencoba mengubah PI akan ditolak compiler.</p>`, "Bagian 3"),
  mem,
  { type: "table", label: "Tabel Interaktif", title: "Kelompok Tipe Data (PDF) + Rinciannya", headers: ["Kelompok", "Tipe", "Catatan"],
    rows: [["Numerik bulat", "<code>short</code>, <code>int</code>, <code>long</code>, <code>long long</code>", "Tanpa koma. ➕ <code>unsigned</code> = hanya positif, rentang dua kali lipat"], ["Numerik desimal", "<code>float</code>, <code>double</code>", "Pemisah desimal titik"], ["Teks", "<code>char</code>, <code>string</code>", "char petik satu, string petik dua"], ["Boolean", "<code>bool</code>", "true/false. Slide menulis “Boolean”; di kode harus <code>bool</code>"]],
    modes: [{ label: "Koreksi slide", target: "row", row: 3, title: "bool, bukan Boolean", text: "<code>Boolean x = true;</code> ditolak karena tipe itu tidak ada di C++. (Java memakai <code>boolean</code>.)" }] },
  code("ukuran.cpp", `#include <iostream>
using namespace std;

int main() {
    cout << "Size of char      : " << sizeof(char) << endl;
    cout << "Size of int       : " << sizeof(int) << endl;
    cout << "Size of short int : " << sizeof(short int) << endl;
    cout << "Size of long int  : " << sizeof(long int) << endl;
    cout << "Size of float     : " << sizeof(float) << endl;
    cout << "Size of double    : " << sizeof(double) << endl;
    cout << "Size of wchar_t   : " << sizeof(wchar_t) << endl;
    return 0;
}`, "Program dari PDF. ➕ Hasil long int dan wchar_t <strong>bergantung compiler</strong>: di Dev-C++ (Windows) long = 4 dan wchar_t = 2; di Linux 64-bit long = 8 dan wchar_t = 4. Jadi jangan heran kalau hasilmu tidak sama dengan slide.", "Mengukur Tipe Data dengan sizeof"),
  A("Input dan Output", `<p><strong>Output</strong> = program memberi informasi ke pengguna, memakai objek <code>cout</code> dengan <strong>insertion operator</strong> <code>&lt;&lt;</code>. <strong>Input</strong> = pengguna memberi data ke program, memakai <code>cin</code> dengan <strong>extraction operator</strong> <code>&gt;&gt;</code>. Data masukan harus punya tempat, maka variabelnya dibuat dulu.</p>
<p>PDF juga menyebut cara bahasa C (pustaka <code>stdio</code>: <code>printf</code>, <code>scanf</code>, <code>puts</code>). Cara itu tetap bisa dipakai di C++ dengan <code>#include &lt;cstdio&gt;</code>, tetapi di kuliah ini kita pakai cout/cin.</p>
<p>Cara mengingat arah panah: data <strong>mengalir</strong> ke arah panah. <code>cout &lt;&lt; x</code>: x mengalir ke layar. <code>cin &gt;&gt; x</code>: keyboard mengalir ke x.</p>`, "Bagian 4"),
  code("biodata.cpp", `#include <iostream>
#include <string>
using namespace std;

int main() {
    string kota;
    int tahun;

    cout << "Kota asal  : ";
    cin >> kota;
    cout << "Tahun lahir: ";
    cin >> tahun;

    cout << "Halo dari " << kota << ", usia sekitar "
         << 2026 - tahun << " tahun." << endl;
    return 0;
}`, "Contoh latihan (bukan jawaban tugas): ada teks pemandu sebelum setiap cin, dan hasil hitung langsung ditampilkan.", "Input → Proses → Output"),
  { type: "table", label: "Tabel Interaktif ➕", title: "Karakter Khusus (Escape Sequence)", headers: ["Ditulis", "Hasil"],
    rows: [["<code>\\n</code>", "Baris baru"], ["<code>\\t</code>", "Tab (jarak menjorok)"], ["<code>\\\"</code>", "Tanda petik dua di dalam teks"], ["<code>\\\\</code>", "Garis miring terbalik"]],
    modes: [{ label: "Sering dipakai", target: "row", row: 0, title: "\\n vs endl", text: "<code>cout &lt;&lt; \"A\\n\";</code> sama dengan <code>cout &lt;&lt; \"A\" &lt;&lt; endl;</code>. endl juga langsung mengosongkan buffer keluaran." }] },
  ex("Latihan", "Tebak Keluarannya", ["Kode", "Keluaran"], ["Halo Dunia", "HaloDunia", "Halo\\nDunia (dua baris)", "Error"], [
    ["cout << \"Halo\" << \"Dunia\";", "HaloDunia"], ["cout << \"Halo \" << \"Dunia\";", "Halo Dunia"], ["cout << \"Halo\" << endl << \"Dunia\";", "Halo\\nDunia (dua baris)"], ["cout << \"Halo\" << Dunia;  (Dunia belum dideklarasikan)", "Error"]]),
  tip("Panduan Tugas P2 (tanpa jawaban)", "Tugas: <em>program mencetak Nama dan Umur dengan variabel yang tepat</em>. Pikirkan dulu: tipe apa yang cocok untuk nama? Untuk umur? Apakah nilainya ditulis langsung di kode atau diminta dari pengguna (keduanya sah, yang kedua lebih menarik)? Pastikan yang dicetak adalah <strong>isi variabel</strong>, bukan teks yang diketik ulang. Cek misimu di tab <strong>Simulasi</strong>.", "info"),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "Apa beda char huruf = 'A'; dengan string huruf = \"A\";?", answer: "char 1 byte satu karakter; string objek teks yang bisa panjang", reason: "Petik satu untuk char, petik dua untuk string." },
    { prompt: "int x = 3.9; cout << x; menampilkan?", answer: "3", reason: "➕ Bagian desimal dibuang (bukan dibulatkan) saat disimpan ke int." },
    { prompt: "Mengapa Total dan total bisa dipakai bersamaan?", answer: "C++ case sensitive", reason: "Tetapi membingungkan, sebaiknya dihindari." }
  ])
];
