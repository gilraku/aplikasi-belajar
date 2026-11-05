// Materi Lengkap Algoritma & Pemrograman P5
const { C, box, arrow, path, poly, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const code = (file, src, note, title) => ({ type: "code", lang: "cpp", label: "Contoh Kode", title, file, code: src, note });
const lb = (x, y, t, c) => text(x, y, t, { size: 13, color: c || "#475569" });

const cs = [["case 1:", "Satu", true], ["case 2:", "Dua", true], ["case 3:", "Tiga", false]];
const flow = diagram({
  label: "Diagram Interaktif", title: "Jalannya switch (Flowchart Slide, Diperjelas)", desc: "Ekspresi dihitung sekali, lalu dicocokkan dari atas. Panah putus-putus = fall-through karena case 3 tidak punya break. Klik bagian-bagiannya.", minw: 560,
  svg: svg(760, 430,
    box(40, 10, 200, 44, "switch (x)", "violet", "ekspr", { size: 16 }) + arrow(140, 54, 140, 80) +
    cs.map(([c, isi, br], i) => { const y = 84 + i * 90;
      return poly(`140,${y} 230,${y + 30} 140,${y + 60} 50,${y + 30}`, "amber", "case", "x == " + (i + 1) + "?", 140, y + 30, { size: 14 }) +
        arrow(230, y + 30, 300, y + 30) + lb(262, y + 18, "ya") + box(304, y + 8, 150, 44, "cout \"" + isi + "\"", "sky", null, { size: 14 }) +
        (br ? arrow(454, y + 30, 520, y + 30) + box(524, y + 10, 90, 40, "break", "emerald", "break", { size: 14 }) + path(`M614,${y + 30} H700 V400`, { noArrow: true }) : path(`M379,${y + 52} V${y + 86}`, { dash: "6 5", color: C.rose[1] }) + lb(560, y + 60, "tanpa break → jatuh", C.rose[2])) +
        arrow(140, y + 60, 140, y + 88) + lb(160, y + 76, "tidak"); }).join("") +
    box(304, 352, 150, 40, "default: \"Lainnya\"", "rose", "def", { size: 13 }) + path("M140,354 V372 H302") +
    path("M454,372 H700 V404") + arrow(700, 404, 700, 420) +
    lb(610, 414, "keluar switch")
  ),
  parts: [
    { id: "ekspr", label: "Ekspresi", title: "Dihitung satu kali", text: "Nilainya harus bilangan bulat, char, atau enum. Lalu dicocokkan dengan label case dari atas." },
    { id: "case", label: "case", title: "Pencocokan nilai persis", text: "Bukan kondisi bebas: hanya “sama dengan konstanta ini?”. Karena itu switch tidak bisa menguji x &gt; 5." },
    { id: "break", label: "break", title: "Pintu keluar", text: "Setelah blok selesai, break melompat ke baris setelah <code>}</code> penutup switch." },
    { id: "def", label: "default", title: "Penampung sisa", text: "Dijalankan bila tidak ada case yang cocok, atau bila ada case tanpa break yang jatuh sampai ke sini (case 3 di diagram)." }
  ]
});

module.exports = [
  A("Apa Itu switch?", `<p><strong>switch</strong> adalah pernyataan percabangan kedua di C++. Fungsinya sama dengan if, yaitu memanipulasi aliran program berdasarkan kondisi, tetapi berbeda <strong>struktur penulisan dan jenis kondisinya</strong>.</p>
<ul><li><strong>if</strong> mengevaluasi kebenaran sebuah ekspresi (operasi logika, relasi, perbandingan) yang menghasilkan 1 atau 0.</li><li><strong>switch</strong> memeriksa <strong>nilai</strong> sebuah ekspresi bertipe integer, char, atau enum, lalu mencari label case yang nilainya sama.</li></ul>`, "Bagian 1"),
  flow,
  A("break dan default", `<p><strong>break</strong> bersifat opsional. Jika ada, setelah blok case selesai eksekusi keluar dari switch. Jika tidak ada, CPU <strong>terus menjalankan semua pernyataan berikutnya</strong>, termasuk milik case lain, sampai bertemu break atau kurung kurawal penutup. Perilaku ini disebut <strong>fall-through</strong>.</p>
<p><strong>default</strong> dijalankan jika tidak ada case yang cocok. Jika switch tidak memiliki default, seluruh switch diabaikan.</p>`, "Bagian 2"),
  code("nilai_slide.cpp", `#include <iostream>
using namespace std;

int main() {
    int na;
    cout << "Masukkan nilai: ";
    cin >> na;                    // slide lupa membaca na
    switch (na) {
        case 100:
            cout << "Bagus";
            break;
        case 70:
            cout << "Lumayan";
            break;
        default:
            cout << "Nilai yang anda masukkan salah";
    }
    return 0;
}`, "Contoh dari slide yang diperbaiki: <code>main()</code> → <code>int main()</code>, petik melengkung → petik lurus, variabel <code>nh</code> yang tidak dipakai dihapus. ➕ Perhatikan logikanya: hanya 100 dan 70 yang dikenali. Nilai 85 dianggap “salah”, karena switch tidak memeriksa rentang.", "Contoh Slide, Diperbaiki"),
  tip("➕ Fall-through yang disengaja", "Fall-through tidak selalu kesalahan. Untuk beberapa nilai yang hasilnya sama, tumpuk label case-nya:<br><code>case 'a': case 'A': cout &lt;&lt; \"Golongan A\"; break;</code><br>Huruf kecil dan besar sama-sama masuk ke blok yang sama.", "info"),
  code("kalkulator.cpp", `#include <iostream>
using namespace std;

int main() {
    double a, b;
    int menu;
    cout << "1. Tambah\\n2. Kurang\\n3. Kali\\n4. Bagi\\nPilih: ";
    cin >> menu;
    cout << "Dua bilangan: ";
    cin >> a >> b;

    switch (menu) {
        case 1: cout << a + b; break;
        case 2: cout << a - b; break;
        case 3: cout << a * b; break;
        case 4:
            if (b != 0) cout << a / b;      // if di dalam case
            else        cout << "Tidak bisa dibagi 0";
            break;
        default:
            cout << "Menu tidak tersedia";
    }
    return 0;
}`, "➕ Contoh khas switch: <strong>menu</strong>. Perhatikan if boleh berada di dalam case. Di P7 menu ini bisa dibuat berulang dengan do-while.", "Menu Kalkulator"),
  { type: "choices", label: "Interaktif", title: "Masalah yang Sama, Dua Cara", desc: "Kode hari 1–7 menjadi nama hari.", style: "toggle",
    options: [
      { label: "if-else-if", title: "Panjang dan berulang", code: "if (h == 1) cout << \"Senin\";\nelse if (h == 2) cout << \"Selasa\";\nelse if (h == 3) cout << \"Rabu\";\n// ... sampai 7\nelse cout << \"Kode salah\";", text: "Bisa, tetapi <code>h ==</code> ditulis berulang-ulang." },
      { label: "switch", title: "Rapi dan mudah dibaca", code: "switch (h) {\n    case 1: cout << \"Senin\"; break;\n    case 2: cout << \"Selasa\"; break;\n    case 3: cout << \"Rabu\"; break;\n    // ... sampai 7\n    default: cout << \"Kode salah\";\n}", text: "Untuk banyak nilai tetap, switch lebih ringkas." }
    ] },
  A("➕ Trik: Rentang dengan switch", `<p>switch tidak bisa menguji <code>nilai &gt;= 80</code>. Tetapi dengan <strong>pembagian bilangan bulat</strong> dari P3, rentang bisa “dipadatkan” menjadi satu angka:</p>`, "Bagian 3"),
  code("huruf.cpp", `int nilai = 87;
switch (nilai / 10) {          // 87 / 10 = 8
    case 10:
    case 9:
    case 8:  cout << "A"; break;   // 80–100
    case 7:
    case 6:  cout << "B"; break;   // 60–79
    default: cout << "C";          // di bawah 60
}`, "Masih ada celah: 105 / 10 = 10 ikut menjadi A, dan −5 menjadi C. Untuk memvalidasi rentang 0–100, tetap butuh if di depan.", "Konversi Nilai dengan switch"),
  ex("Latihan", "Tebak Keluarannya", ["Kode (x = 2)", "Keluaran"], ["B", "BC", "BCD", "D"], [
    ["switch(x){case 1:cout<<\"A\";break; case 2:cout<<\"B\";break; case 3:cout<<\"C\";}", "B"], ["switch(x){case 1:cout<<\"A\"; case 2:cout<<\"B\"; case 3:cout<<\"C\";break; default:cout<<\"D\";}", "BC"], ["switch(x){case 2:cout<<\"B\"; case 3:cout<<\"C\"; default:cout<<\"D\";}", "BCD"], ["switch(x){case 1:cout<<\"A\";break; default:cout<<\"D\";}", "D"]]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "Mengapa switch (ipk) dengan float ipk ditolak?", answer: "Ekspresi switch harus bilangan bulat, char, atau enum", reason: "Gunakan if-else-if untuk IPK." },
    { prompt: "Bagaimana jika dua case punya nilai yang sama?", answer: "Compiler menolak: duplicate case value", reason: "Setiap label case harus unik." },
    { prompt: "Apa padanan default pada if-else-if?", answer: "else terakhir", reason: "Sama-sama menangkap semua yang tidak cocok." }
  ])
];
