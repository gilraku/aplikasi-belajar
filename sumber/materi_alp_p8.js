// Materi Lengkap Algoritma & Pemrograman P8 (UTS)
const { C, box, arrow, path, svg, text, diagram } = require("./svg.js");
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const code = (file, src, note, title) => ({ type: "code", lang: "cpp", label: "Contoh Kode", title, file, code: src, note });

const st = [["P1", "Algoritma|& flowchart", "slate", "p1"], ["P2", "Variabel|& I/O", "sky", "p2"], ["P3", "Operator", "amber", "p3"], ["P4", "if", "violet", "p4"], ["P5", "switch", "violet", "p5"], ["P6", "for", "emerald", "p6"], ["P7", "while|do-while", "emerald", "p7"]];
const peta = diagram({
  label: "Diagram Interaktif", title: "Peta Materi UTS", desc: "Setiap pertemuan membangun di atas yang sebelumnya. Klik setiap kotak.", minw: 640,
  svg: svg(800, 250,
    st.map(([p, t, tone, id], i) => { const x = 10 + i * 112;
      return box(x, 60, 96, 80, p + "|" + t, tone, id, { size: 13 }) + (i < 6 ? arrow(x + 97, 100, x + 110, 100) : ""); }).join("") +
    path("M346,150 V180 H570 V150", { noArrow: true, color: C.violet[1] }) + text(458, 198, "percabangan", { size: 13, color: C.violet[2] }) +
    path("M682,150 V180 H794", { noArrow: true, color: C.emerald[1] }) + text(738, 198, "perulangan", { size: 13, color: C.emerald[2] }) +
    text(400, 30, "runtunan  →  percabangan  →  perulangan", { size: 15, color: "#334155" }) +
    text(400, 232, "Kode UTS hampir selalu menggabungkan: variabel + operator + if/switch + loop", { size: 13, color: "#475569", weight: 600 })
  ),
  parts: [
    { id: "p1", label: "P1", title: "Algoritma & flowchart", text: "Resep langkah, 5 ciri Knuth, simbol flowchart, C++ dikompilasi, tiga jenis error." },
    { id: "p2", label: "P2", title: "Variabel & I/O", text: "Struktur program, aturan nama, tipe data dan ukurannya, cin/cout, getline." },
    { id: "p3", label: "P3", title: "Operator", text: "Pembagian int, %, ++ prefix/postfix, perbandingan & logika, ternary, koma, prioritas." },
    { id: "p4", label: "P4", title: "if", text: "Tiga bentuk if, else-if berurutan, nested if, rentang dengan &&." },
    { id: "p5", label: "P5", title: "switch", text: "Nilai persis int/char, break, default, fall-through." },
    { id: "p6", label: "P6", title: "for", text: "Lima tahap for, hitung putaran, akumulator, nested for." },
    { id: "p7", label: "P7", title: "while & do-while", text: "Pre-test vs post-test, break, continue, validasi masukan, nested while." }
  ]
});

module.exports = [
  tip("Halaman ini untuk mengulang sebelum UTS", "Mulai dari peta, lalu kerjakan tab Simulasi dan Kuis. Untuk setiap soal keluaran, tulis tabel jejak di kertas.", "info"),
  peta,
  { type: "table", label: "Tabel Interaktif", title: "Cara Membuat Tabel Jejak", headers: ["Baris/Putaran", "i", "s", "Keterangan"],
    rows: [["awal", "—", "0", "int s = 0;"], ["1", "1", "1", "s += 1"], ["2", "2", "3", "s += 2"], ["3", "3", "6", "s += 3"], ["cek", "4", "6", "4 <= 3 false → keluar"]],
    modes: [{ label: "Kodenya", target: "none", title: "for (int i = 1; i <= 3; i++) s += i;", text: "Satu baris tabel = satu putaran. Kolom = setiap variabel yang berubah. Baris terakhir adalah pengecekan yang membuat loop berhenti." }] },
  code("latihan_uts.cpp", `#include <iostream>
using namespace std;

int main() {
    int n, besar = 0, total = 0;
    cout << "Berapa angka? ";
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        total += x;
        if (x > 5) besar++;
    }
    cout << "Total = " << total << endl;
    cout << "Rata-rata = " << (float)total / n << endl;
    cout << "Lebih dari 5 = " << besar;
    return 0;
}`, "Contoh latihan yang menggabungkan P2–P6 (bukan soal UTS asli). Coba jejaki untuk n = 3 dengan masukan 4, 7, 10: total 21, rata-rata 7, lebih dari 5 ada 2.", "Satu Program, Banyak Materi"),
  rv("Cek Debug Cepat", "Kenapa Programku Begini?", [
    { prompt: "error: 'cout' was not declared in this scope", answer: "Lupa #include <iostream> atau using namespace std;", reason: "P2." },
    { prompt: "error: expected ';' before …", answer: "Titik koma di baris sebelumnya hilang", reason: "Lihat baris yang disebut dan satu baris di atasnya." },
    { prompt: "Program tidak berhenti mencetak", answer: "Infinite loop: step lupa atau salah arah", reason: "P6–P7. Tekan Ctrl + C." },
    { prompt: "if selalu dijalankan walau kondisinya salah", answer: "Pakai = bukan ==, atau ada ; setelah if (…)", reason: "P3–P4." },
    { prompt: "switch mencetak lebih dari satu hasil", answer: "Lupa break", reason: "P5." },
    { prompt: "Rata-rata selalu bulat", answer: "Pembagian int; ubah salah satu jadi float/double", reason: "P3." }
  ])
];
