// Materi Lengkap Algoritma & Pemrograman P1
const { C, box, arrow, path, poly, svg, text, diagram } = require("./svg.js");
const A = (title, html, label) => ({ type: "article", label, title, html });
const tip = (heading, html, tone) => ({ type: "callout", tone: tone || "tip", heading, html });
const rv = (label, title, items) => ({ type: "reveal", label, title, items });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
const code = (file, src, note, title) => ({ type: "code", lang: "cpp", label: "Contoh Kode", title, file, code: src, note });
const lbl = (x, y, t) => text(x, y, t, { size: 13, color: "#475569", weight: 700 });

const flow = diagram({
  label: "Diagram Interaktif", title: "Flowchart Menentukan Kelulusan", desc: "Klik setiap simbol untuk melihat namanya dan alasan dipakai.", minw: 420,
  svg: svg(600, 540,
    box(200, 10, 160, 44, "Mulai", "slate", "term", { r: 22 }) + arrow(280, 54, 280, 80) +
    poly("215,82 375,82 345,132 185,132", "sky", "in", "Baca uts, uas", 280, 107) + arrow(280, 132, 280, 160) +
    box(170, 162, 220, 50, "rata ← (uts + uas) / 2", "amber", "proses", { size: 14 }) + arrow(280, 212, 280, 240) +
    poly("280,242 390,292 280,342 170,292", "violet", "dec", "rata ≥ 60?", 280, 292) +
    arrow(280, 342, 280, 380) + lbl(298, 360, "Ya") +
    path("M390,292 H480 V380") + lbl(435, 280, "Tidak") +
    poly("200,382 380,382 360,432 180,432", "emerald", "out", "Tampilkan “LULUS”", 280, 407, { size: 13 }) +
    poly("410,382 570,382 550,432 390,432", "rose", "out", "Tampilkan|“TIDAK LULUS”", 480, 407, { size: 13 }) +
    arrow(280, 432, 280, 478) + path("M480,432 V502 H364") +
    box(200, 480, 160, 44, "Selesai", "slate", "term", { r: 22 })
  ),
  parts: [
    { id: "term", label: "Oval", title: "Terminator: Mulai & Selesai", text: "Setiap flowchart dibuka satu Mulai dan ditutup Selesai. Dua cabang boleh bertemu lagi sebelum Selesai." },
    { id: "in", label: "Jajar genjang", title: "Input: Baca uts, uas", text: "Data masuk dari pengguna. Di C++ nanti menjadi <code>cin &gt;&gt; uts &gt;&gt; uas;</code> (P2)." },
    { id: "proses", label: "Persegi panjang", title: "Proses: hitung rata-rata", text: "Tanda ← dibaca “diisi dengan”. Di C++ menjadi <code>rata = (uts + uas) / 2.0;</code> ➕ Pakai 2.0, bukan 2, agar hasilnya tidak dibulatkan (P3)." },
    { id: "dec", label: "Belah ketupat", title: "Keputusan: rata ≥ 60?", text: "Satu pertanyaan ya/tidak, dua jalan keluar. Di C++ menjadi <code>if (rata &gt;= 60) … else …</code> (P3)." },
    { id: "out", label: "Jajar genjang", title: "Output: tampilkan hasil", text: "Simbolnya sama dengan input. Di C++ menjadi <code>cout &lt;&lt; \"LULUS\";</code>." }
  ]
});

const W = 120, G = 24, X = i => 10 + i * (W + G);
const pipeSteps = [["halo.cpp|kode sumber", "slate", "src"], ["Preprocessor|#include", "sky", "pre"], ["Compiler|→ assembly", "violet", "comp"], ["Assembler|→ halo.o", "amber", "asm"], ["Linker|+ pustaka", "rose", "link"], ["halo.exe|siap jalan", "emerald", "exe"]];
const pipe = diagram({
  label: "Diagram Interaktif ➕", title: "Perjalanan Kode C++ Menjadi Program", desc: "Saat kamu menekan Compile, empat tahap ini berjalan otomatis dalam hitungan detik. Klik setiap kotak.", minw: 720,
  svg: svg(860, 190,
    pipeSteps.map(([t, tone, p], i) => box(X(i), 40, W, 80, t, tone, p, { size: 14 }) + (i < 5 ? arrow(X(i) + W + 2, 80, X(i + 1) - 4, 80) : "")).join("") +
    text(430, 160, "Dev-C++: F9 = Compile • F10 = Run • F11 = Compile & Run", { size: 14, color: "#475569", weight: 600 })
  ),
  parts: [
    { id: "src", label: "Kode sumber", title: "File .cpp yang kamu ketik", text: "Hanya teks biasa. Komputer belum bisa menjalankannya." },
    { id: "pre", label: "Preprocessor", title: "Mengerjakan baris berawalan #", text: "<code>#include &lt;iostream&gt;</code> diganti dengan isi file header iostream, sehingga <code>cout</code> dikenal." },
    { id: "comp", label: "Compiler", title: "Memeriksa tata tulis & menerjemahkan", text: "Di sinilah <strong>syntax error</strong> ditemukan (lupa ;, salah huruf besar). Kalau lolos, kode diterjemahkan ke bahasa assembly." },
    { id: "asm", label: "Assembler", title: "Assembly → kode mesin", text: "Menghasilkan file objek (.o / .obj) berisi kode mesin, tetapi belum lengkap." },
    { id: "link", label: "Linker", title: "Menyambung dengan pustaka", text: "Kode <code>cout</code> yang asli ada di pustaka standar. Linker menyambungkannya. Galat “undefined reference” muncul di tahap ini." },
    { id: "exe", label: "Program", title: "File eksekusi", text: "halo.exe (Windows) atau halo (Linux/macOS) bisa dijalankan berkali-kali tanpa kompilasi ulang, selama kodenya tidak diubah." }
  ]
});

module.exports = [
  A("Apa Itu Algoritma?", `<p><strong>Algoritma</strong> adalah urutan langkah yang logis, sistematis, dan pasti selesai untuk menyelesaikan suatu masalah. Kata ini berasal dari nama <strong>Muhammad ibn Musa al-Khwarizmi</strong> (±780–850), matematikawan Persia yang bekerja di Baitul Hikmah, Baghdad. Namanya dalam bahasa Latin ditulis <em>Algoritmi</em>, dan judul bukunya <em>al-Jabr</em> melahirkan kata <strong>aljabar</strong>.</p>
<p>Slide memakai analogi <strong>resep masakan</strong>: ada bahan (input), langkah memasak (proses), dan hidangan jadi (output). Bedanya, komputer tidak punya “perasaan”. Langkah seperti “tambahkan garam secukupnya” harus diganti dengan ukuran yang pasti.</p>
<p>➕ Algoritma tidak harus memakai komputer. Cara mencari kata di kamus, cara membagi bersusun, dan cara mengurutkan kartu remi juga algoritma. Pemrograman hanyalah <strong>menuliskan algoritma dalam bahasa yang dimengerti komputer</strong>.</p>`, "Bagian 1"),
  { type: "cards", label: "Bagian 2 ➕", title: "Tiga Struktur Dasar Algoritma", cols: 3, items: [
    { badge: "Runtunan", tone: "sky", title: "Langkah dikerjakan berurutan", text: "Baca → hitung → tampilkan. Urutan tidak boleh ditukar: tidak bisa menghitung sebelum datanya dibaca." },
    { badge: "Percabangan", tone: "violet", title: "Memilih jalan sesuai kondisi", text: "JIKA nilai ≥ 60 MAKA lulus, SELAIN ITU tidak lulus. C++: if, else, switch (P3)." },
    { badge: "Perulangan", tone: "emerald", title: "Mengulang selama syarat terpenuhi", text: "Ulangi cetak angka selama i ≤ 10. C++: while, do-while, for (P3)." }
  ] },
  tip("Kenapa tiga saja cukup?", "➕ Teorema <strong>Böhm–Jacopini</strong> (1966) membuktikan bahwa algoritma apa pun dapat disusun dari tiga struktur ini. Jadi kalau tiga struktur ini sudah kamu kuasai, sisanya tinggal latihan.", "info"),
  A("Tiga Cara Menuliskan Algoritma", `<p>Slide menyebut pseudocode dan flowchart. Ada satu cara lagi yang biasanya dipakai sebagai langkah pertama: <strong>bahasa sehari-hari (deskriptif)</strong>. Klik setiap tab untuk melihat <strong>algoritma yang sama</strong> ditulis dengan cara berbeda.</p>`, "Bagian 3"),
  { type: "choices", label: "Interaktif", title: "Satu Algoritma, Empat Wujud", desc: "Masalah: hitung luas persegi panjang.", style: "toggle",
    options: [
      { label: "Deskriptif", title: "Bahasa sehari-hari", code: "1. Mulai.\n2. Minta panjang dan lebar dari pengguna.\n3. Kalikan panjang dengan lebar, simpan sebagai luas.\n4. Tampilkan luas.\n5. Selesai.", text: "Paling mudah dibuat, tetapi bisa panjang dan bertele-tele untuk masalah rumit." },
      { label: "Pseudocode", title: "Mirip kode, bebas aturan", code: "PROGRAM LuasPersegiPanjang\nDEKLARASI\n  panjang, lebar, luas : real\nALGORITMA\n  BACA(panjang, lebar)\n  luas ← panjang * lebar\n  TULIS(luas)\nSELESAI", text: "Ringkas dan mudah diubah menjadi kode. Tanda ← berarti “diisi dengan”." },
      { label: "Flowchart", title: "Gambar dengan simbol baku", code: "(Mulai) → /Baca panjang, lebar/ → [luas ← panjang × lebar] → /Tampilkan luas/ → (Selesai)", text: "Paling mudah dilihat alurnya, terutama saat ada percabangan. Lihat diagram di bawah." },
      { label: "C++", title: "Program sungguhan", code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    float panjang, lebar, luas;\n    cin >> panjang >> lebar;\n    luas = panjang * lebar;\n    cout << luas;\n    return 0;\n}", text: "Inilah yang akan kamu tulis mulai P2. Perhatikan setiap langkah pseudocode punya pasangan satu baris kode." }
    ] },
  { type: "table", label: "Tabel Interaktif ➕", title: "Kosakata Pseudocode yang Umum Dipakai", headers: ["Pseudocode", "Arti", "Padanan C++"],
    rows: [["BACA(x)", "Ambil masukan pengguna", "<code>cin &gt;&gt; x;</code>"], ["TULIS(x)", "Tampilkan ke layar", "<code>cout &lt;&lt; x;</code>"], ["x ← 5", "Isi x dengan 5", "<code>x = 5;</code>"], ["JIKA … MAKA … SELAIN ITU", "Percabangan", "<code>if (…) {…} else {…}</code>"], ["SELAMA … LAKUKAN", "Perulangan dengan syarat di awal", "<code>while (…) {…}</code>"], ["UNTUK i ← 1 SAMPAI 10", "Perulangan dengan hitungan", "<code>for (int i = 1; i &lt;= 10; i++)</code>"]],
    modes: [{ label: "Jebakan", target: "row", row: 2, title: "← bukan =", text: "Pseudocode memakai ← untuk mengisi nilai agar tidak tertukar dengan = (sama dengan) di matematika. Di C++ pengisian nilai memakai <code>=</code>, sedangkan perbandingan memakai <code>==</code>." }] },
  flow,
  ex("Latihan", "Urutkan Langkah Algoritma Menukar Isi Dua Gelas", ["Langkah", "Urutan ke-"], ["1", "2", "3", "4"], [
    ["Tuang isi gelas B ke gelas A", "2"], ["Siapkan gelas kosong C, tuang isi gelas A ke C", "1"], ["Selesai", "4"], ["Tuang isi gelas C ke gelas B", "3"]]),
  tip("➕ Kenapa butuh gelas ketiga?", "Kalau isi A langsung dituang ke B, isi B tumpah dan hilang. Di pemrograman, menukar nilai dua variabel juga butuh variabel bantu: <code>temp = a; a = b; b = temp;</code>. Algoritma ini akan sering muncul lagi, misalnya saat mengurutkan data.", "info"),
  A("Mengenal C++", `<p><strong>C++</strong> dikembangkan oleh <strong>Bjarne Stroustrup</strong> di Bell Labs mulai 1979 dengan nama “C with Classes”, lalu berganti nama menjadi C++ pada 1983. Tanda <code>++</code> adalah operator “tambah satu” di C, jadi namanya berarti “C yang ditingkatkan”.</p>
<ul><li><strong>Bahasa tingkat tinggi</strong>: ditulis dengan kata yang dapat dibaca manusia (<code>if</code>, <code>while</code>, <code>return</code>).</li><li><strong>Dikompilasi</strong>: harus diterjemahkan menjadi kode mesin dulu (lihat diagram).</li><li><strong>Case sensitive</strong>: <code>Nilai</code>, <code>nilai</code>, dan <code>NILAI</code> adalah tiga nama berbeda.</li><li>➕ Dipakai untuk game engine (Unreal), browser (Chrome), sistem operasi, dan perangkat tertanam karena cepat.</li><li>➕ Standarnya terus diperbarui: C++98, C++11, C++14, C++17, C++20, C++23.</li></ul>`, "Bagian 4"),
  pipe,
  code("halo.cpp", `#include <iostream>      // pakai pustaka input-output
using namespace std;     // agar tidak perlu menulis std::

int main() {             // program mulai dijalankan dari sini
    cout << "Halo, Algoritma!" << endl;
    return 0;            // 0 = program selesai tanpa masalah
}`, "Program pertama. Setiap bagian dijelaskan rinci di P2.", "Program C++ Pertamamu"),
  { type: "table", label: "Tabel Interaktif ➕", title: "Tiga Jenis Kesalahan Program", headers: ["Jenis", "Kapan ketahuan", "Contoh", "Cara menemukan"],
    rows: [["Syntax error", "Saat kompilasi", "Lupa <code>;</code>, <code>Int</code> bukan <code>int</code>, kurung kurawal tidak berpasangan", "Baca pesan compiler, lihat nomor barisnya"], ["Runtime error", "Saat program berjalan", "Membagi bilangan bulat dengan 0, program berhenti mendadak", "Uji dengan berbagai masukan"], ["Logic error", "Tidak ketahuan otomatis", "Rata-rata 7 dan 8 keluar 7, rumus luas pakai +", "Hitung manual dan bandingkan (tabel jejak)"]],
    modes: [{ label: "Paling berbahaya", target: "row", row: 2, title: "Logic error tidak memunculkan pesan", text: "Compiler hanya memeriksa tata tulis. Kebenaran logika harus kamu periksa sendiri, misalnya dengan menghitung manual." },
      { label: "Paling sering di awal", target: "row", row: 0, title: "Baca pesan dari atas", text: "Satu kesalahan bisa memunculkan banyak pesan. Perbaiki pesan <strong>pertama</strong> dulu, lalu kompilasi ulang." }] },
  { type: "table", label: "Tabel Interaktif", title: "Editor vs IDE (Slide Ditambah Contoh)", headers: ["Jenis", "Isi", "Contoh"],
    rows: [["Text editor", "Hanya untuk mengetik kode; compiler dipasang terpisah", "Notepad++, Sublime Text, VS Code (+ ekstensi C/C++)"], ["IDE", "Editor + compiler + debugger dalam satu aplikasi", "Dev-C++, Code::Blocks, Visual Studio"], ["IDE online ➕", "Tanpa instalasi, jalan di browser", "OnlineGDB, Programiz, Replit"]],
    modes: [{ label: "Saran untuk pemula", target: "row", row: 1, title: "Mulai dengan Dev-C++ atau Code::Blocks", text: "Sekali pasang langsung bisa kompilasi. Kalau laptop tidak memungkinkan, OnlineGDB bisa dipakai dari HP." }] },
  tip("Catatan slide", "Slide “Editor vs IDE” muncul dua kali dengan isi sama; cukup dibaca sekali. Slide juga belum menyebut IDE online, padahal sangat membantu untuk mahasiswa PJJ yang belajar lewat HP.", "warn"),
  { type: "list", label: "Tips Belajar dari Slide + ➕", title: "Cara Belajar Pemrograman yang Efektif", groups: [
    { title: "Dari slide", tone: "indigo", items: ["Pahami logika dulu, baru sintaks", "Banyak latihan, jangan hanya membaca", "Biasakan membaca pesan error"] },
    { title: "➕ Tambahan", tone: "emerald", items: ["Ketik ulang contoh kode, jangan salin-tempel", "Ubah sedikit contoh kode lalu tebak hasilnya sebelum dijalankan", "Tulis pseudocode di kertas sebelum mengetik", "Simpan file dengan nama jelas: p1_halo.cpp"] }
  ] },
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "Mengapa “aduk sampai rata” sulit dijadikan langkah komputer?", answer: "Tidak definite: komputer tidak tahu kapan “rata”", reason: "Perlu ukuran pasti, misalnya aduk 30 kali." },
    { prompt: "Kode sudah berhasil dikompilasi kemarin, hari ini kamu ubah satu huruf. Perlu dikompilasi ulang?", answer: "Ya", reason: "File .exe lama masih berisi versi kemarin." },
    { prompt: "Simbol flowchart untuk “Tampilkan total”?", answer: "Jajar genjang (output)", reason: "Input dan output memakai simbol yang sama." }
  ])
];
