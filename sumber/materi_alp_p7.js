// Materi Lengkap Algoritma & Pemrograman P7
const { C, box, arrow, path, poly, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const code = (file, src, note, title) => ({ type: "code", lang: "cpp", label: "Contoh Kode", title, file, code: src, note });
const lb = (x, y, t, c) => text(x, y, t, { size: 13, color: c || "#475569" });

const dm = (cx, cy, t, tone, p) => poly(`${cx},${cy - 38} ${cx + 95},${cy} ${cx},${cy + 38} ${cx - 95},${cy}`, tone, p, t, cx, cy, { size: 14 });
const two = diagram({
  label: "Diagram Interaktif", title: "while vs do-while: Di Mana Kondisinya?", desc: "Perhatikan posisi belah ketupat. Klik setiap bagian.", minw: 640,
  svg: svg(800, 400,
    text(190, 20, "while", { size: 18, color: C.sky[2] }) + text(600, 20, "do-while", { size: 18, color: C.violet[2] }) +
    // while
    box(110, 40, 160, 40, "n dibaca", "slate", null, { size: 14 }) + arrow(190, 80, 190, 104) +
    dm(190, 144, "n > 0 ?", "amber", "wcond") + arrow(190, 182, 190, 214) + lb(210, 198, "ya") +
    box(100, 218, 180, 50, "cout << n;|n--;", "sky", "wbody", { size: 14 }) +
    path("M100,243 H50 V144 H93") +
    path("M285,144 H340 V320") + lb(312, 130, "tidak") + box(250, 324, 180, 40, "FIRE!", "rose", null, { size: 14 }) +
    // do-while
    box(520, 40, 160, 40, "n dibaca", "slate", null, { size: 14 }) + arrow(600, 80, 600, 108) +
    box(510, 112, 180, 50, "cout << n;|--n;", "violet", "dbody", { size: 14 }) + arrow(600, 162, 600, 196) +
    dm(600, 236, "n > 0 ?", "amber", "dcond") + path("M505,236 H460 V137 H506") + lb(480, 222, "ya") +
    arrow(600, 274, 600, 320) + lb(620, 298, "tidak") + box(520, 324, 160, 40, "FIRE!", "rose", null, { size: 14 })
  ),
  parts: [
    { id: "wcond", label: "Kondisi while", title: "Dicek di depan", text: "Kalau n yang dimasukkan 0 atau negatif, badan dilewati sama sekali dan langsung FIRE!" },
    { id: "wbody", label: "Badan while", title: "Cetak lalu kurangi", text: "<code>n--</code> adalah step. Tanpanya, n tidak pernah mencapai 0." },
    { id: "dbody", label: "Badan do-while", title: "Dijalankan dulu", text: "Badan dijalankan sebelum ada pengecekan apa pun, jadi minimal sekali." },
    { id: "dcond", label: "Kondisi do-while", title: "Dicek di belakang", text: "Ditulis <code>} while (n &gt; 0);</code> dengan titik koma." }
  ]
});

module.exports = [
  A("while", `<p>Pernyataan <strong>while</strong> mengulang badan <strong>selama</strong> kondisi bernilai true. Mirip if, tetapi setelah badan selesai kondisinya dicek lagi. Karakteristiknya (slide):</p>
<ol><li>Kondisi dicek <strong>terlebih dahulu</strong> sebelum perulangan dijalankan.</li><li>Blok statement tidak harus ada; loop kosong tetap berjalan selama kondisi true. ➕ Ini jarang berguna dan mudah menjadi infinite loop, misalnya <code>while (n &gt; 0);</code> karena salah ketik titik koma.</li></ol>`, "Bagian 1"),
  code("while_countdown.cpp", `#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter the starting number = ";
    cin >> n;
    while (n > 0) {
        cout << n << ", ";
        n--;
    }
    cout << "FIRE!!!";
    return 0;
}`, "Diperbaiki dari slide: <code>&lt;iostream.h&gt;</code>, petik melengkung, dan <code>printf</code> diganti cout. Penjelasan slide menyebut <code>cout&lt;&lt;n&lt;&lt;\",\"</code> padahal kodenya <code>cout&lt;&lt;n</code>; versi di sini memakai koma agar keluarannya <code>5, 4, 3, 2, 1, FIRE!!!</code> sesuai penjelasan.", "while: Hitung Mundur (Diperbaiki)"),
  { type: "table", label: "Tabel Jejak", title: "Lima Tahap while dari Slide (n = 3)", headers: ["Tahap", "n", "n > 0?", "Aksi"],
    rows: [["1", "3", "", "n dibaca dari pengguna"], ["2→3", "3", "true", "cetak 3, n menjadi 2"], ["2→3", "2", "true", "cetak 2, n menjadi 1"], ["2→3", "1", "true", "cetak 1, n menjadi 0"], ["2→5", "0", "false", "keluar, cetak FIRE"]],
    modes: [{ label: "Tahap 4", target: "col", col: 3, title: "Akhir blok kembali ke tahap 2", text: "Setiap kali badan selesai, eksekusi kembali ke pengecekan kondisi." }] },
  A("do-while", `<p><strong>do-while</strong> menjalankan badan <strong>dulu</strong>, lalu memeriksa kondisi di akhir. Selama kondisi true, perulangan diulang. Akibatnya badan <strong>pasti dikerjakan minimal satu kali</strong>, sedangkan pada while badan mungkin tidak pernah dijalankan.</p>`, "Bagian 2"),
  two,
  code("menu_ulang.cpp", `char lagi;
do {
    int a, b;
    cout << "Dua bilangan: ";
    cin >> a >> b;
    cout << "Jumlah = " << a + b << endl;
    cout << "Hitung lagi? (y/t): ";
    cin >> lagi;
} while (lagi == 'y' || lagi == 'Y');
cout << "Terima kasih!";`, "➕ Pemakaian do-while paling khas: program jalan sekali dulu, baru bertanya apakah diulang. Menu kalkulator switch dari P5 bisa dibungkus dengan pola ini.", "do-while untuk Mengulang Program"),
  code("validasi.cpp", `int batas;
do {
    cout << "Masukkan batas (minimal 5): ";
    cin >> batas;
} while (batas < 5);`, "➕ Validasi masukan: pertanyaan diulang terus sampai pengguna memasukkan nilai yang sah. Pola ini relevan untuk syarat “Batas Nilai ≥ 5” di Tugas Nested.", "do-while untuk Validasi"),
  A("break dan continue", `<ul><li><strong>break;</strong> keluar dari blok perulangan for, while, do-while, atau switch (P5).</li><li><strong>continue;</strong> melanjutkan ke putaran berikutnya dan meninggalkan sisa instruksi di badan perulangan.</li></ul>`, "Bagian 3"),
  { type: "choices", label: "Interaktif", title: "Contoh break dan continue dari Slide", style: "toggle",
    options: [
      { label: "break", title: "Hitung mundur dibatalkan di 3", code: "for (int n = 10; n > 0; n--) {\n    cout << n << \", \";\n    if (n == 3) {\n        cout << \"countdown aborted!\";\n        break;\n    }\n}\n\n// 10, 9, 8, 7, 6, 5, 4, 3, countdown aborted!", text: "Angka 3 tetap tercetak karena cout ada sebelum if. Setelah break, sisa putaran (2, 1) tidak pernah dijalankan." },
      { label: "continue", title: "Angka 5 dilewati", code: "for (int n = 10; n > 0; n--) {\n    if (n == 5) continue;\n    cout << n << \", \";\n}\ncout << \"FIRE!\";\n\n// 10, 9, 8, 7, 6, 4, 3, 2, 1, FIRE!", text: "Saat n == 5, cout dilewati, lalu step n-- tetap jalan dan loop berlanjut." }
    ] },
  tip("Catatan slide P6–7", "<ul><li>Contoh break/continue dan nested loop memakai <code>&lt;stdio.h&gt;</code> dan <code>printf(\"%i , \", n)</code> (gaya bahasa C). Hasilnya “10 , 9 , …” dengan spasi sebelum koma; di atas sudah ditulis ulang dengan cout.</li><li>Contoh do-while tertulis <code>#include &lt;iotream.h.h&gt;</code>: salah ketik ganda.</li><li>Judul slide masih “Minggu ke-10”, tetapi materinya untuk pertemuan 6–7.</li></ul>", "warn"),
  A("Nested while (Slide Tatap Maya 2)", `<p>Program di slide mencetak segitiga angka. Loop luar <code>outer</code> berjalan 10 kali; di setiap putaran, loop dalam <code>while (inner &lt;= outer)</code> mencetak 1 sampai outer.</p>`, "Bagian 4"),
  code("nested_while.cpp", `#include <iostream>
using namespace std;

int main() {
    int outer = 1;
    while (outer <= 10) {
        int inner = 1;               // direset setiap baris
        while (inner <= outer)
            cout << inner++ << " ";  // cetak dulu, baru naik (postfix)
        cout << endl;
        outer++;
    }
    return 0;
}`, "Kode slide. Perhatikan <code>inner++</code> di dalam cout: postfix dari P3, jadi nilai lama dicetak dulu. Keluarannya adalah <strong>pola pertama</strong> pada Tugas Nested, tetapi tugas meminta <strong>batas dari pengguna</strong> serta memakai while <strong>dan</strong> for.", "Contoh Slide: Segitiga Angka"),
  { type: "code", label: "Tugas Nested", title: "Tiga Pola yang Diminta (Contoh Batas 10)", file: "keluaran.txt", code: `Pola 1                 Pola 2 (Input tinggi segitiga: 10)     Pola 3
1                      1                                      1 2 3 4 5 6 7 8 9 10
1 2                    2 3                                    1 2 3 4 5 6 7 8 9
1 2 3                  4 5 6                                  1 2 3 4 5 6 7 8
1 2 3 4                7 8 9 10                               1 2 3 4 5 6 7
1 2 3 4 5              11 12 13 14 15                         1 2 3 4 5 6
...                    ...                                    ...
1 2 3 ... 10           46 47 48 49 50 51 52 53 54 55          1`, note: "Disalin dari gambar slide. Batas boleh 5, 6, 7, … (≥ 5)." },
  tip("Panduan Tugas Nested (tanpa jawaban)", "Analisis setiap pola dengan pertanyaan berikut sebelum menulis kode:<ol><li>Berapa jumlah baris? Apa hubungannya dengan batas?</li><li>Di baris ke-i, <strong>berapa angka</strong> yang dicetak?</li><li>Angka pertama di setiap baris <strong>selalu sama</strong> atau <strong>melanjutkan</strong> baris sebelumnya? (Bandingkan pola 1 dan 2.)</li><li>Kalau melanjutkan, variabel apa yang harus disimpan <strong>di luar</strong> loop dalam?</li><li>Bagaimana memastikan batas ≥ 5 (lihat contoh validasi di atas)?</li></ol>Buat tabel jejak kecil (batas 5) di kertas untuk mengecek. Lalu cek unsur wajibnya di tab <strong>Simulasi</strong>.", "info"),
  ex("Latihan", "Pilih Perulangan yang Paling Tepat", ["Kasus", "Perulangan"], ["for", "while", "do-while"], [
    ["Cetak 1 sampai 100", "for"], ["Baca angka terus sampai pengguna mengetik 0", "while"], ["Tampilkan menu, lalu tanya “ulang lagi?”", "do-while"], ["Minta PIN sampai benar (minimal ditanya sekali)", "do-while"], ["Tabel perkalian 10 × 10", "for"], ["Bagi angka dengan 2 selama masih genap", "while"]]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "Jika int inner = 1; dipindah ke luar loop outer, apa yang terjadi pada nested while slide?", answer: "Setiap baris hanya berisi satu angka: 1, 2, 3, …, 10", reason: "inner tidak direset. Di baris ke-k, inner sudah bernilai k, jadi hanya k yang dicetak sebelum inner melebihi outer. Coba jejaki untuk outer 1–3!" },
    { prompt: "int i = 0; while (i < 3) { if (i == 1) continue; cout << i; i++; } → ?", answer: "Mencetak 0 lalu infinite loop", reason: "Saat i == 1, continue melompati i++, sehingga i tetap 1 selamanya." },
    { prompt: "Apa beda break di switch dan break di loop?", answer: "Sama-sama keluar dari blok terdekat", reason: "Jika switch ada di dalam loop, break hanya keluar dari switch, bukan dari loop." }
  ])
];
