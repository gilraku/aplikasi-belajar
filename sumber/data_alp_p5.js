// Algoritma dan Pemrograman — Pertemuan 5: Percabangan switch-case
const LAB = require("./lab_alp.js");
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
module.exports = {
  id: "p5", nomor: 5, judul: "Percabangan switch-case", ujian: "UTS",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Satu Nilai, Banyak Pintu",
    text: "<strong>switch</strong> memilih satu dari banyak <strong>case</strong> berdasarkan <strong>nilai</strong> sebuah ekspresi. Pahami peran <strong>break</strong>, <strong>default</strong>, efek <strong>fall-through</strong>, dan kapan switch lebih cocok daripada if."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya dalam satu kalimat", html: "if menguji <strong>kebenaran kondisi</strong> (boleh rentang: nilai ≥ 80). switch mencocokkan <strong>nilai persis</strong> sebuah ekspresi bertipe <strong>bilangan bulat, char, atau enum</strong> dengan label case." },
    { type: "code", lang: "cpp", label: "Interaktif 1 • Bentuk Umum", title: "Kerangka switch", file: "switch.cpp", code: `switch (ekspresi) {
    case nilai1:
        pernyataan;     // blok 1
        break;          // keluar dari switch
    case nilai2:
        pernyataan;     // blok 2
        break;
    default:
        pernyataan;     // jika tidak ada case yang cocok
}`, note: "Setiap label case diakhiri titik dua <code>:</code>, bukan titik koma." },
    { type: "table", label: "Interaktif 2 • Tiga Kata Kunci", title: "case, break, default", headers: ["Kata kunci", "Fungsi", "Wajib?"],
      rows: [["<code>case</code>", "Label nilai konstanta yang dicocokkan", "Minimal satu"], ["<code>break</code>", "Keluar dari switch setelah blok selesai", "Opsional, tetapi hampir selalu dipakai"], ["<code>default</code>", "Dijalankan jika tidak ada case yang cocok", "Opsional; tanpa default, switch diabaikan"]],
      modes: [{ label: "Kalau lupa break", target: "row", row: 1, title: "Fall-through", text: "Tanpa break, eksekusi “jatuh” ke case berikutnya dan terus berjalan sampai bertemu break atau kurung kurawal penutup <code>}</code>." }] },
    { type: "table", label: "Interaktif 3 • if vs switch", title: "Kapan Memakai yang Mana?", headers: ["Aspek", "if", "switch"],
      rows: [["Yang diuji", "Kondisi boolean apa pun", "Kesamaan nilai satu ekspresi"], ["Rentang (nilai ≥ 80)", "✅ Bisa", "❌ Tidak bisa langsung"], ["Tipe data", "Semua", "Bilangan bulat, char, enum (bukan float, bukan string)"], ["Banyak pilihan nilai tetap (menu 1–5)", "Bisa, tetapi panjang", "✅ Lebih rapi"], ["Gabungan kondisi (&&, ||)", "✅ Bisa", "❌ Tidak bisa"]],
      modes: [{ label: "Ingat", target: "row", row: 2, title: "switch (nama) tidak bisa", text: "<code>switch</code> tidak menerima string atau float. Untuk teks gunakan if-else-if." }] }
  ],
  simulator: [
    { type: "trace-lab", label: "Lab Algoritma • Telusuri switch", title: "Efek break, Langkah demi Langkah", desc: "Kode yang sama dengan empat nilai x. case 1 dan case 3 sengaja tidak punya <code>break</code>. Tebak dulu, lalu ikuti ke mana eksekusi berjalan.", tip: "Ini penelusuran yang sudah disiapkan, bukan compiler C++ sungguhan.", cases: LAB.P5 },
    ex("Permainan Interaktif 1 • Boleh Jadi Label case?", "Sah atau Ditolak Compiler?", ["Label / ekspresi", "Penilaian"], ["Sah", "Ditolak"], [
      ["case 5:", "Sah"], ["case 'A':", "Sah"], ["case 2.5:", "Ditolak"], ["case \"Senin\":", "Ditolak"], ["case x:  (x variabel biasa)", "Ditolak"], ["case 1 + 2:", "Sah"], ["switch (nilai) dengan float nilai", "Ditolak"], ["Dua label case 3: dalam satu switch", "Ditolak"]]),
    ex("Permainan Interaktif 2 • Pilih Struktur", "if atau switch?", ["Kasus", "Paling tepat"], ["if", "switch"], [
      ["Menu kalkulator: 1 tambah, 2 kurang, 3 kali, 4 bagi", "switch"], ["Nilai ≥ 80 dapat A", "if"], ["Kode hari 1–7 menjadi nama hari", "switch"], ["Suhu di atas 37.5 dianggap demam", "if"], ["Huruf golongan darah A/B/O → keterangan", "switch"], ["Umur ≥ 17 dan punya KTP", "if"]])
  ],
  flashcards: [
    { tag: "Konsep", q: "Fungsi switch?", a: "Percabangan pada banyak kemungkinan nilai (multiple outcomes) dari satu ekspresi." },
    { tag: "Tipe", q: "Tipe ekspresi switch?", a: "Bilangan bulat (int, long, …), char, atau enum." },
    { tag: "case", q: "Syarat nilai case?", a: "Konstanta, unik, sejenis dengan ekspresi switch." },
    { tag: "break", q: "Fungsi break di switch?", a: "Keluar dari switch dan lanjut ke baris setelahnya." },
    { tag: "break", q: "Apa itu fall-through?", a: "Tanpa break, eksekusi berlanjut ke case berikutnya." },
    { tag: "default", q: "Jika tak ada case cocok dan tak ada default?", a: "switch diabaikan, tidak ada yang dijalankan." },
    { tag: "if vs switch", q: "Kenapa switch tidak bisa untuk nilai ≥ 80?", a: "switch hanya mencocokkan nilai persis, bukan rentang." },
    { tag: "➕ Trik", q: "Satu blok untuk 'a' dan 'A'?", a: "case 'a': case 'A': … break; (fall-through yang disengaja)." },
    { tag: "➕ Trik", q: "Rentang nilai dengan switch?", a: "switch (nilai / 10) { case 10: case 9: … } memanfaatkan pembagian bulat." }
  ],
  quiz: [
    Q("Pernyataan switch digunakan untuk…", ["Percabangan dengan banyak kemungkinan nilai", "Perulangan", "Deklarasi variabel", "Membaca masukan"], 0, "Multiple outcomes."),
    Q("Tipe ekspresi yang dapat dipakai switch adalah…", ["int, char, atau enum", "float dan double", "string", "bool saja"], 0, "Slide: integer atau karakter."),
    Q("Label case diakhiri dengan tanda…", ["Titik dua (:)", "Titik koma (;)", "Koma (,)", "Kurung kurawal"], 0, "case 1:"),
    Q("Fungsi break di dalam switch adalah…", ["Keluar dari switch", "Mengulang switch", "Menghentikan program", "Melompat ke default"], 0, "Lanjut ke baris setelah switch."),
    Q("Jika break tidak ditulis pada case yang cocok, maka…", ["Pernyataan case berikutnya ikut dijalankan", "Program error", "switch diulang", "default langsung dijalankan"], 0, "Fall-through sampai bertemu break atau }."),
    Q("Label default dijalankan jika…", ["Tidak ada case yang cocok", "Case pertama cocok", "Selalu", "Ada break"], 0, "Seperti else pada if."),
    Q("Jika tidak ada case yang cocok dan switch tidak punya default, maka…", ["switch diabaikan", "Program error", "case pertama dijalankan", "Program berhenti"], 0, "Tidak ada pernyataan yang dijalankan."),
    Q("Label case yang TIDAK sah adalah…", ["case 2.5:", "case 3:", "case 'B':", "case 4 + 1:"], 0, "Desimal tidak diizinkan."),
    Q("switch (hari) dengan string hari = \"Senin\" akan…", ["Ditolak compiler", "Berjalan normal", "Selalu masuk default", "Masuk case pertama"], 0, "switch tidak menerima string."),
    Q("int x = 1; switch (x) { case 1: cout << \"A\"; case 2: cout << \"B\"; break; default: cout << \"C\"; } Hasilnya…", ["AB", "A", "ABC", "C"], 0, "case 1 tanpa break jatuh ke case 2."),
    Q("Kasus yang PALING cocok diselesaikan dengan switch adalah…", ["Menu pilihan 1–5", "Menentukan nilai ≥ 80", "Mengecek suhu > 37.5", "Mengecek umur ≥ 17 dan punya KTP"], 0, "Nilai tetap yang diskrit."),
    Q("Perbedaan utama if dan switch adalah…", ["if menguji kondisi boolean, switch mencocokkan nilai", "switch bisa menguji rentang", "if hanya untuk char", "Tidak ada bedanya"], 0, "Slide: if mengevaluasi kebenaran ekspresi; switch berdasarkan nilai."),
    Q("Pada contoh slide switch (na) dengan case 100 dan case 70, masukan 85 menghasilkan…", ["Pesan default", "Bagus", "Lumayan", "Error"], 0, "85 tidak sama persis dengan 100 atau 70."),
    Q("Masalah pada contoh slide int na, nh; switch (na) … adalah…", ["na belum pernah diisi", "switch tidak boleh int", "case harus string", "default wajib di atas"], 0, "Tambahkan cin >> na; sebelum switch. nh juga tidak dipakai."),
    Q("Cara agar 'a' dan 'A' menjalankan blok yang sama adalah…", ["case 'a': case 'A': … break;", "case 'a' || 'A':", "case ('a', 'A'):", "case 'a' && 'A':"], 0, "Memanfaatkan fall-through yang disengaja."),
    Q("Nilai konstanta setiap label case dalam satu switch harus…", ["Unik (tidak boleh kembar)", "Berurutan", "Dari kecil ke besar", "Selalu dimulai dari 0"], 0, "Label kembar ditolak compiler."),
    Q("Posisi default dalam switch…", ["Boleh di mana saja, tetapi lazim di akhir", "Wajib di awal", "Wajib setelah break pertama", "Tidak boleh ada"], 0, "➕ Kalau ditaruh di tengah, beri break juga."),
    Q("Hasil switch (nilai / 10) untuk nilai = 87 akan mencocokkan case…", ["8", "87", "80", "9"], 0, "87 / 10 = 8 (pembagian bulat).")
  ],
  ringkasan: `*RANGKUMAN P5 ALGORITMA & PEMROGRAMAN*
🚪 switch (ekspresi) { case nilai: …; break; default: …; }
🔢 Ekspresi: int / char / enum. Label case: konstanta, unik, diakhiri titik dua
⛔ break → keluar switch. Tanpa break → fall-through ke case berikutnya
🧺 default → jika tak ada case cocok (tanpa default: diabaikan)
⚖️ if = kondisi & rentang; switch = nilai persis (menu, kode hari)
🛠️ Koreksi slide: na belum diisi (cin >> na), nh tidak dipakai, int main()
➕ case 'a': case 'A': (gabung), switch (nilai / 10) (rentang)`
};
