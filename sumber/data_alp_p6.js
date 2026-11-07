// Algoritma dan Pemrograman — Pertemuan 6: Perulangan for
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const LAB = require("./lab_alp.js");
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
module.exports = {
  id: "p6", nomor: 6, judul: "Perulangan for", ujian: "UTS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Ulangi Tanpa Menulis Ulang",
    text: "Setiap perulangan punya <strong>titik awal</strong>, <strong>syarat</strong>, dan <strong>step</strong>. <strong>for</strong> menaruh ketiganya dalam satu baris. Pelajari cara kerjanya langkah demi langkah, variasinya, dan <strong>for bersarang</strong> untuk pola segitiga."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya dalam satu kalimat", html: "<code>for (inisialisasi; kondisi; step) { badan }</code>: inisialisasi dijalankan <strong>sekali</strong>, lalu ulangi “cek kondisi → jalankan badan → jalankan step” sampai kondisi <strong>false</strong>." },
    { type: "table", label: "Interaktif 1 • Tiga Ciri Perulangan", title: "Ada di Setiap Loop", headers: ["Ciri", "Di for", "Contoh"],
      rows: [["Kondisi awal (titik awal)", "Inisialisasi", "<code>int n = 5</code>"], ["Syarat perulangan", "Kondisi", "<code>n &gt; 0</code>"], ["Step / tahap", "Step perulangan", "<code>n--</code>"]],
      modes: [{ label: "Kalau step lupa", target: "row", row: 2, title: "Infinite loop", text: "Tanpa step yang mendekatkan ke false, syarat selalu true dan program tidak pernah berhenti. Hentikan dengan Ctrl + C atau tutup jendela konsol." }] },
    { type: "table", label: "Interaktif 2 • Cara Kerja for", title: "Lima Tahap (Slide)", headers: ["Tahap", "Yang terjadi", "Berapa kali"],
      rows: [["1", "Inisialisasi dieksekusi (nilai awal counter)", "Sekali saja"], ["2", "Kondisi dicek. Benar → tahap 3, salah → tahap 5", "Setiap putaran + 1"], ["3", "Badan perulangan dijalankan", "Setiap putaran"], ["4", "Step dijalankan, kembali ke tahap 2", "Setiap putaran"], ["5", "Keluar dari perulangan", "Sekali"]],
      modes: [{ label: "Sering keliru", target: "row", row: 3, title: "Step dijalankan setelah badan", text: "Pada <code>for (i = 1; i &lt;= 3; i++)</code>, putaran pertama mencetak i = 1, bukan 2." },
        { label: "Hitung cek kondisi", target: "row", row: 1, title: "Kondisi dicek n + 1 kali", text: "Untuk 3 putaran, kondisi dicek 4 kali: 3 kali true, sekali false (yang menghentikan)." }] },
    { type: "table", label: "Interaktif 3 • Pola for Umum", title: "Hafalkan Bentuk Ini", headers: ["Tujuan", "Kode", "Hasil"],
      rows: [["Naik 1 sampai 5", "<code>for (int i = 1; i &lt;= 5; i++)</code>", "1 2 3 4 5"], ["Turun 5 sampai 1", "<code>for (int i = 5; i &gt;= 1; i--)</code>", "5 4 3 2 1"], ["Loncat 2", "<code>for (int i = 0; i &lt;= 10; i += 2)</code>", "0 2 4 6 8 10"], ["Tepat n kali", "<code>for (int i = 0; i &lt; n; i++)</code>", "n putaran"], ["Dua counter (slide)", "<code>for (n = 0, i = 100; n != i; n++, i--)</code>", "50 putaran"]],
      modes: [{ label: "&lt; vs &lt;=", target: "row", row: 3, title: "Mulai 0 pakai &lt;, mulai 1 pakai &lt;=", text: "Keduanya sama-sama n putaran. Salah pasangan = kurang atau lebih satu putaran (off-by-one)." }] }
  ],
  simulator: [
    { type: "trace-lab", label: "Lab Algoritma • Telusuri Loop", title: "Jalankan for Selangkah demi Selangkah", desc: "Tebak dulu, lalu tekan <strong>Langkah Berikutnya</strong>. Bagian kode yang sedang dijalankan diberi stabilo, dan panel Keadaan menunjukkan nilai variabel, hasil kondisi, serta output.", tip: "Ini penelusuran yang sudah disiapkan, bukan compiler C++ sungguhan.", cases: LAB.P6 },
    ex("Permainan Interaktif 1 • Tebak Keluaran", "Apa yang Dicetak? (dipisah spasi)", ["Kode", "Keluaran"], ["1 2 3", "1 4 7 10", "5 4 3 2 1", "0 2 4", "(tidak ada)", "10 8 6"], [
      ["for (int i = 1; i <= 3; i++) cout << i << \" \";", "1 2 3"], ["for (int i = 1; i <= 10; i += 3) cout << i << \" \";", "1 4 7 10"], ["for (int n = 5; n > 0; n--) cout << n << \" \";", "5 4 3 2 1"], ["for (int i = 0; i < 5; i += 2) cout << i << \" \";", "0 2 4"], ["for (int i = 5; i < 3; i++) cout << i << \" \";", "(tidak ada)"], ["for (int i = 10; i > 5; i -= 2) cout << i << \" \";", "10 8 6"]]),
    ex("Permainan Interaktif 2 • Hitung Putaran", "Berapa Kali Badan Loop Dijalankan?", ["Kode", "Putaran"], ["0", "4", "5", "6", "10", "50"], [
      ["for (i = 0; i < 5; i++)", "5"], ["for (i = 1; i <= 5; i++)", "5"], ["for (i = 0; i <= 5; i++)", "6"], ["for (i = 10; i < 10; i++)", "0"], ["for (n = 0, i = 100; n != i; n++, i--)", "50"], ["for (i = 1; i <= 100; i *= 3)", "5"], ["for (i = 20; i > 0; i -= 5)", "4"], ["for (i = 1; i <= 10; i++)", "10"]]),
    { type: "terminal", label: "Permainan Interaktif 3 • Pola Bintang", title: "Ubah Satu Bagian, Pola Berubah", desc: "Kerangka: <code>for (int i = 1; i &lt;= 4; i++) { for (…) cout &lt;&lt; \"*\"; cout &lt;&lt; endl; }</code>. Pilih isi for bagian dalam.", shell: "for", header: "Pola nested for",
      scenarios: [
        { label: "1. j <= i (slide)", pill: "segitiga", ok: true, cmd: "(int j = 1; j <= i; j++)", res: "*\n**\n***\n****", exp: "Baris ke-i berisi i bintang. Ini contoh di PDF (dengan x = 5 menjadi 5 baris)." },
        { label: "2. j <= 4", pill: "persegi", ok: true, cmd: "(int j = 1; j <= 4; j++)", res: "****\n****\n****\n****", exp: "Batas dalam tidak bergantung i, jadi setiap baris sama panjang." },
        { label: "3. j <= 5 - i", pill: "terbalik", ok: true, cmd: "(int j = 1; j <= 5 - i; j++)", res: "****\n***\n**\n*", exp: "Baris pertama 4, terus berkurang." },
        { label: "4. j <= 2*i - 1", pill: "ganjil", ok: true, cmd: "(int j = 1; j <= 2 * i - 1; j++)", res: "*\n***\n*****\n*******", exp: "1, 3, 5, 7 bintang: rumus barisan ganjil." }
      ] }
  ],
  flashcards: [
    { tag: "Konsep", q: "Apa itu perulangan?", a: "Mengulang satu/beberapa statement sebanyak n kali atau selama syarat terpenuhi." },
    { tag: "Konsep", q: "Tiga ciri perulangan?", a: "Kondisi awal, syarat perulangan, step." },
    { tag: "Konsep", q: "Tiga perulangan di C++?", a: "for, while, do-while." },
    { tag: "for", q: "Bentuk for?", a: "for (inisialisasi; kondisi; step) { … }" },
    { tag: "for", q: "Berapa kali inisialisasi dijalankan?", a: "Sekali, di awal." },
    { tag: "for", q: "Urutan satu putaran?", a: "Cek kondisi → badan → step → cek kondisi lagi." },
    { tag: "for", q: "Bagian for yang boleh dikosongkan?", a: "Inisialisasi dan step (juga kondisi), tetapi kedua ; wajib tetap ada: for (; n < 10;)" },
    { tag: "for", q: "Dua counter dalam satu for?", a: "Pisahkan dengan koma: for (n = 0, i = 100; n != i; n++, i--)" },
    { tag: "Nested", q: "Apa itu nested loop?", a: "Loop di dalam loop. Loop dalam selesai penuh untuk setiap satu putaran loop luar." },
    { tag: "Nested", q: "Total putaran badan dalam pada for i 1..3, for j 1..4?", a: "3 × 4 = 12." }
  ],
  quiz: [
    Q("Perulangan digunakan untuk…", ["Mengulang statement sebanyak n kali atau selama syarat terpenuhi", "Memilih satu dari dua jalan", "Mendeklarasikan variabel", "Mengakhiri program"], 0, "Definisi slide."),
    Q("Tiga metode perulangan dalam C++ adalah…", ["for, while, do-while", "if, else, switch", "for, foreach, loop", "repeat, until, while"], 0, "Slide P6–P7."),
    Q("Bagian for yang hanya dieksekusi satu kali adalah…", ["Inisialisasi", "Kondisi", "Step", "Badan"], 0, "Tahap 1."),
    Q("Pada for, setelah badan dijalankan maka berikutnya…", ["Step dijalankan, lalu kondisi dicek", "Inisialisasi diulang", "Langsung keluar", "Kondisi dicek tanpa step"], 0, "Tahap 4 kembali ke tahap 2."),
    Q("for (int n = 5; n > 0; n--) cout << n; menghasilkan…", ["54321", "12345", "543210", "5"], 0, "Tanpa pemisah, angka menempel."),
    Q("Berapa kali for (int i = 0; i < 10; i++) berulang?", ["10", "9", "11", "0"], 0, "i = 0 sampai 9."),
    Q("Berapa kali for (int i = 1; i <= 10; i++) berulang?", ["10", "9", "11", "1"], 0, "i = 1 sampai 10."),
    Q("for (n = 0, i = 100; n != i; n++, i--) berulang sebanyak…", ["50 kali", "100 kali", "99 kali", "Tak terhingga"], 0, "n naik, i turun, bertemu di 50."),
    Q("Penulisan for tanpa inisialisasi dan step yang benar adalah…", ["for (; n < 10;)", "for (n < 10)", "for (;; n < 10)", "for n < 10"], 0, "Dua titik koma wajib tetap ada."),
    Q("for (int i = 5; i < 3; i++) akan…", ["Tidak menjalankan badan sama sekali", "Berjalan sekali", "Berjalan tak terhingga", "Error"], 0, "Kondisi langsung false."),
    Q("Perulangan yang tidak pernah berhenti disebut…", ["Infinite loop", "Nested loop", "Off-by-one", "Fall-through"], 0, "Biasanya karena step lupa atau salah arah."),
    Q("for (int i = 1; i <= 10; i--) akan…", ["Infinite loop (i makin kecil, selalu ≤ 10)", "Berulang 10 kali", "Tidak berulang", "Berulang sekali"], 0, "Step menjauh dari kondisi false."),
    Q("Pada nested for i = 1..3 dan j = 1..4, badan loop dalam dijalankan…", ["12 kali", "7 kali", "4 kali", "3 kali"], 0, "3 × 4."),
    Q("Kode for (i=1;i<=3;i++){ for(j=1;j<=i;j++) cout<<\"*\"; cout<<endl; } mencetak…", ["*, **, *** (tiga baris)", "*** tiga kali", "Satu baris ******", "***, **, *"], 0, "Baris ke-i berisi i bintang."),
    Q("for (int i = 0; i <= 10; i += 5) cout << i << \" \"; mencetak…", ["0 5 10", "0 5", "5 10", "0 1 2 … 10"], 0, "Step 5."),
    Q("Variabel yang dideklarasikan di bagian inisialisasi for (int i = …)…", ["Hanya dikenal di dalam for", "Dikenal di seluruh program", "Harus global", "Tidak boleh dipakai di badan"], 0, "➕ Ruang lingkupnya hanya loop itu."),
    Q("Header yang benar di program contoh slide adalah…", ["#include <iostream>", "#include <iostream.h>", "#include <iotream.h.h>", "#include iostream"], 0, "Slide memakai bentuk lama dan ada salah ketik."),
    Q("Rumus jumlah bintang baris ke-i pada pola 1, 3, 5, 7 adalah…", ["2*i - 1", "i + 1", "2*i", "i*i"], 0, "i=1→1, i=2→3, i=3→5.")
  ],
  ringkasan: `*RANGKUMAN P6 ALGORITMA & PEMROGRAMAN*
🔁 Perulangan = ulangi n kali / selama syarat terpenuhi. Ciri: titik awal, syarat, step
🧮 for (inisialisasi; kondisi; step) { … }
1 init (sekali) → 2 cek kondisi → 3 badan → 4 step → kembali ke 2 → 5 keluar
🔢 i=0; i<n → n kali • i=1; i<=n → n kali
🧩 Boleh kosong: for (; n < 10;) • Dua counter: for (n=0, i=100; n!=i; n++, i--) → 50 kali
⚠️ Infinite loop: step lupa / salah arah
🪆 Nested for: loop dalam selesai penuh tiap putaran luar → pola segitiga (j <= i)`
};
