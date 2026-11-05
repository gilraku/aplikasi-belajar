// Algoritma dan Pemrograman — Pertemuan 2: Struktur Program, Variabel, Tipe Data, Input/Output
const Q = (q, opts, ans, exp) => ({ q, opts, ans, exp });
const ex = (label, title, headers, opts, rows) => ({ type: "exercise", label, title, headers, rows: rows.map(([c, a]) => ({ cells: [c], fields: [{ options: opts, answer: a }], ok: "✓" })) });
module.exports = {
  id: "p2", nomor: 2, judul: "Struktur Program C++, Variabel, Tipe Data & Input/Output", ujian: "CPMK 1",
  hero: {
    badge: "Dosen: Muhamad Rosidin, M.Kom.",
    title: "Kotak Bernama di Memori",
    text: "Bedah <strong>bagian-bagian program C++</strong>, simpan data di <strong>variabel</strong> dengan <strong>tipe data</strong> yang tepat, lalu ambil dan tampilkan data dengan <strong>cin</strong> dan <strong>cout</strong>. Di akhir ada misi untuk <strong>Tugas P2</strong>."
  },
  cheatsheet: [
    { type: "callout", tone: "tip", heading: "Ide besarnya dalam satu kalimat", html: "Variabel adalah <strong>kotak bernama</strong> di memori. <strong>Tipe data</strong> menentukan isi apa yang boleh masuk dan berapa besar kotaknya. <code>cin &gt;&gt;</code> mengisi kotak dari keyboard, <code>cout &lt;&lt;</code> menampilkan isinya ke layar." },
    { type: "table", label: "Interaktif 1 • Tipe Data Dasar", title: "Pilih Kotak yang Pas", mono: false, headers: ["Tipe", "Isi", "Contoh", "Ukuran umum"],
      rows: [["<code>int</code>", "Bilangan bulat", "<code>int umur = 19;</code>", "4 byte"], ["<code>float</code>", "Desimal presisi tunggal (±7 digit)", "<code>float ipk = 3.75;</code>", "4 byte"], ["<code>double</code>", "Desimal presisi ganda (±15 digit)", "<code>double pi = 3.14159265;</code>", "8 byte"], ["<code>char</code>", "Satu karakter, petik <strong>satu</strong>", "<code>char grade = 'A';</code>", "1 byte"], ["<code>string</code>", "Kumpulan karakter, petik <strong>dua</strong>", "<code>string nama = \"Gilang\";</code>", "bervariasi"], ["<code>bool</code>", "true (1) atau false (0)", "<code>bool lulus = true;</code>", "1 byte"]],
      modes: [{ label: "Desimal pakai titik", target: "row", row: 1, title: "3.75, bukan 3,75", text: "C++ memakai titik sebagai pemisah desimal. Koma punya arti lain (pemisah)." },
        { label: "Petik satu vs dua", target: "row", row: 3, title: "'A' ≠ \"A\"", text: "<code>'A'</code> adalah char (satu huruf). <code>\"A\"</code> adalah string. <code>char c = \"A\";</code> ditolak compiler." },
        { label: "Perlu header", target: "row", row: 4, title: "#include &lt;string&gt;", text: "➕ string bukan tipe dasar, melainkan kelas dari pustaka standar. Tambahkan <code>#include &lt;string&gt;</code> agar aman di semua compiler." }] },
    { type: "table", label: "Interaktif 2 • Aturan Nama Variabel", title: "Identifier yang Sah dan yang Ditolak", headers: ["Nama", "Sah?", "Alasan"],
      rows: [["<code>nama_mhs</code>", "✅", "Huruf dan garis bawah"], ["<code>_total</code>", "✅", "Boleh diawali garis bawah"], ["<code>nilai2</code>", "✅", "Angka boleh, asal tidak di depan"], ["<code>2nilai</code>", "❌", "Diawali angka"], ["<code>nama-mhs</code>", "❌", "Tanda minus dibaca sebagai pengurangan"], ["<code>nama mhs</code>", "❌", "Mengandung spasi"], ["<code>float</code>", "❌", "Keyword C++"], ["<code>FLOAT</code>", "✅ (tapi jangan)", "Sah karena case sensitive, tapi membingungkan"]],
      modes: [{ label: "Contoh dari slide", target: "row", row: 7, title: "FLOAT sah, float tidak", text: "Slide memberi contoh ini untuk menunjukkan C++ case sensitive. ➕ Dalam praktik, hindari nama yang mirip keyword." }] },
    { type: "table", label: "Interaktif 3 • Anatomi Program", title: "Fungsi Setiap Baris", headers: ["Baris", "Nama", "Fungsi"],
      rows: [["<code>#include &lt;iostream&gt;</code>", "Preprocessor directive", "Memakai pustaka input-output (cout, cin)"], ["<code>using namespace std;</code>", "Namespace", "Agar cukup menulis cout, bukan std::cout"], ["<code>int main() {</code>", "Fungsi utama", "Titik awal program dijalankan"], ["<code>// komentar</code>", "Komentar", "Catatan untuk manusia, diabaikan compiler"], ["<code>cout &lt;&lt; \"Hai\";</code>", "Pernyataan (statement)", "Perintah; diakhiri titik koma"], ["<code>return 0;</code>", "Nilai kembali", "Memberi tahu sistem operasi program selesai normal"], ["<code>}</code>", "Blok penutup", "Pasangan { pembuka"]] }
  ],
  simulator: [
    ex("Permainan Interaktif 1 • Pilih Tipe Data", "Data Ini Paling Tepat Disimpan dengan Tipe Apa?", ["Data", "Tipe"], ["int", "float", "char", "string", "bool"], [
      ["Jumlah SKS: 21", "int"], ["IPK: 3.62", "float"], ["Nilai huruf: B", "char"], ["Nama lengkap: Gilang Swandaru", "string"], ["Sudah bayar UKT? ya", "bool"], ["Tahun masuk: 2026", "int"], ["Kode golongan darah: O", "char"], ["Berat badan: 57.5 kg", "float"]]),
    ex("Permainan Interaktif 2 • Nama Variabel", "Sah atau Ditolak Compiler?", ["Nama", "Penilaian"], ["Sah", "Ditolak"], [
      ["jumlahSks", "Sah"], ["jumlah sks", "Ditolak"], ["3d_model", "Ditolak"], ["_id", "Sah"], ["int", "Ditolak"], ["harga-total", "Ditolak"], ["Int", "Sah"], ["nilaiAkhir2", "Sah"]]),
    { type: "terminal", label: "Permainan Interaktif 3 • Simulator Program", title: "Jalankan Potongan Kode", desc: "Klik skenario dan perhatikan keluarannya.", shell: "$", header: "Hasil program C++",
      scenarios: [
        { label: "1. cout berantai", pill: "OK", ok: true, cmd: "cout << \"Umur: \" << 19 << endl;", res: "Umur: 19", exp: "Operator <code>&lt;&lt;</code> boleh disambung. Teks dalam petik ditampilkan apa adanya, angka ditampilkan nilainya." },
        { label: "2. Lupa endl", pill: "OK", ok: true, cmd: "cout << \"A\"; cout << \"B\";", res: "AB", exp: "Tanpa <code>endl</code> atau <code>\\n</code>, keluaran menempel di baris yang sama." },
        { label: "3. cin dua nilai", pill: "OK", ok: true, cmd: "cin >> a >> b;   // ketik: 7 5\ncout << a + b;", res: "12", exp: "Dua nilai dipisah spasi atau Enter. <code>&gt;&gt;</code> juga bisa disambung." },
        { label: "4. cin untuk nama berspasi", pill: "Hasil terpotong", ok: false, cmd: "cin >> nama;   // ketik: Gilang Swandaru\ncout << nama;", res: "Gilang", exp: "➕ <code>cin &gt;&gt;</code> berhenti di spasi. Untuk nama lengkap pakai <code>getline(cin, nama);</code>." },
        { label: "5. Desimal pakai koma", pill: "Syntax error", ok: false, cmd: "float nilai = 80,1;", res: "error: expected unqualified-id before numeric constant", exp: "Koreksi slide: tulis <code>80.1</code>. Koma membuat compiler mengira ada deklarasi kedua bernama 1." },
        { label: "6. Variabel belum diisi", pill: "Nilai sampah", ok: false, cmd: "int total;\ncout << total;", res: "32767   (angka acak)", exp: "➕ Variabel lokal yang belum diinisialisasi berisi sisa data memori. Biasakan memberi nilai awal: <code>int total = 0;</code>." }
      ] },
    { type: "playground", lang: "cpp", label: "Tugas P2 • Cek Misi", title: "Program Mencetak Nama dan Umur", desc: "Tugas dari slide: <em>“Membuat program C++ sederhana untuk mencetak Nama dan Umur dengan menggunakan variable yang tepat.”</em> Ini tugas yang dinilai, jadi di sini tidak ada contoh jawaban. Tulis programmu sendiri, klik <strong>Periksa Kode</strong>, lalu jalankan di Dev-C++ atau OnlineGDB.", file: "tugas_p2.cpp",
      starter: "// Tugas P2: Nama dan Umur\n// Tulis programmu di bawah ini\n\n",
      tasks: [
        { label: "Memakai `#include <iostream>`", regex: "#include\\s*<iostream>", cs: true },
        { label: "Ada fungsi `int main()`", regex: "int\\s+main\\s*\\(\\s*\\)", cs: true },
        { label: "Nama disimpan di variabel bertipe `string`", regex: "\\bstring\\s+[A-Za-z_]\\w*", cs: true },
        { label: "Umur disimpan di variabel bertipe `int`", regex: "\\bint\\s+(?!main\\b)[A-Za-z_]\\w*\\s*[=;,]", cs: true },
        { label: "Isi variabel ditampilkan dengan `cout` (bukan hanya teks dalam petik)", regex: "cout[^;]*<<\\s*(?!endl\\b)[A-Za-z_]\\w*\\s*(<<|;)", cs: true },
        { label: "Ditutup `return 0;`", regex: "return\\s+0\\s*;", cs: true },
        { label: "Tidak ada petik melengkung “ ” (hasil salin dari Word/slide)", regex: "^[^“”‘’]*$" },
        { label: "Nilai tambah: ada komentar penjelas `//` atau `/* */`", regex: "//|/\\*", raw: true }
      ] }
  ],
  flashcards: [
    { tag: "Struktur", q: "Apa fungsi #include <iostream>?", a: "Menyertakan pustaka input-output agar cout dan cin bisa dipakai." },
    { tag: "Struktur", q: "Fungsi apa yang pertama kali dijalankan?", a: "int main(). Tipe kembaliannya wajib int." },
    { tag: "Struktur", q: "Dua cara menulis komentar?", a: "// satu baris, dan /* ... */ banyak baris." },
    { tag: "Variabel", q: "Deklarasi vs inisialisasi?", a: "Deklarasi: int umur; • Inisialisasi: int umur = 19; (diberi nilai saat dibuat)." },
    { tag: "Variabel", q: "4 aturan nama variabel?", a: "Diawali huruf/_, tanpa spasi, tanpa simbol seperti -, bukan keyword." },
    { tag: "Tipe", q: "float vs double?", a: "float 4 byte (±7 digit), double 8 byte (±15 digit)." },
    { tag: "Tipe", q: "char vs string?", a: "char satu karakter, petik satu 'A'; string banyak karakter, petik dua \"Ani\"." },
    { tag: "I/O", q: "Operator cout dan cin?", a: "cout << (insertion), cin >> (extraction)." },
    { tag: "I/O", q: "Membaca nama yang berspasi?", a: "getline(cin, nama);" },
    { tag: "Memori", q: "Satu alamat memori mewakili?", a: "Satu byte (koreksi slide yang menulis satu bit)." },
    { tag: "Memori", q: "Cara mengetahui ukuran tipe data?", a: "sizeof(tipe), misal sizeof(int) → 4." }
  ],
  quiz: [
    Q("Baris yang diawali tanda # seperti #include disebut…", ["Preprocessor directive", "Komentar", "Fungsi utama", "Keyword"], 0, "Baris # diproses sebelum kompilasi."),
    Q("Fungsi yang pertama kali dijalankan dalam program C++ adalah…", ["main()", "cout()", "include()", "start()"], 0, "Eksekusi selalu dimulai dari int main()."),
    Q("Penulisan fungsi utama yang benar adalah…", ["int main()", "Int main()", "main int()", "void Main()"], 0, "C++ case sensitive. Slide menulis “Int main()”, yang ditolak compiler."),
    Q("Komentar banyak baris ditulis di antara…", ["/* dan */", "// dan //", "<!-- dan -->", "# dan #"], 0, "// hanya berlaku sampai akhir baris."),
    Q("cout termasuk…", ["Objek dari pustaka iostream", "Keyword C++", "Tipe data", "Operator aritmetika"], 0, "cout adalah objek stream keluaran, bukan keyword."),
    Q("Operator yang dipakai bersama cin adalah…", [">> (extraction)", "<< (insertion)", "==", "::"], 0, "cin >> x mengambil data ke x."),
    Q("Setiap pernyataan C++ diakhiri dengan…", ["Titik koma (;)", "Titik (.)", "Titik dua (:)", "Koma (,)"], 0, "Lupa ; adalah syntax error paling umum."),
    Q("Nama variabel yang SAH adalah…", ["nilai_akhir", "nilai akhir", "2nilai", "nilai-akhir"], 0, "Spasi, angka di depan, dan tanda minus tidak diperbolehkan."),
    Q("Nama berikut tidak boleh dipakai sebagai variabel karena keyword…", ["return", "Return", "hasil", "_x"], 0, "Return (R besar) sah karena case sensitive, walau tidak dianjurkan."),
    Q("Pemberian nilai saat variabel dideklarasikan disebut…", ["Inisialisasi", "Deklarasi saja", "Kompilasi", "Eksekusi"], 0, "int umur = 19; adalah deklarasi sekaligus inisialisasi."),
    Q("Tipe data yang tepat untuk IPK 3.75 adalah…", ["float", "int", "char", "bool"], 0, "int akan memotong bagian desimal menjadi 3."),
    Q("Penulisan float yang benar adalah…", ["float nilai = 80.1;", "float nilai = 80,1;", "Float nilai = 80.1;", "float nilai = \"80.1\";"], 0, "Koreksi slide: desimal memakai titik."),
    Q("char grade = … yang benar adalah", ["'A'", "\"A\"", "A", "'AB'"], 0, "char memakai petik satu dan hanya satu karakter."),
    Q("Tipe bool hanya dapat menyimpan…", ["true atau false", "Semua bilangan bulat", "Satu karakter", "Teks"], 0, "true dicetak cout sebagai 1, false sebagai 0."),
    Q("Ukuran int dan double yang umum adalah…", ["4 byte dan 8 byte", "2 byte dan 4 byte", "1 byte dan 2 byte", "8 byte dan 16 byte"], 0, "Bisa berbeda antar compiler, cek dengan sizeof."),
    Q("Fungsi sizeof(char) menghasilkan…", ["1", "2", "4", "8"], 0, "char selalu 1 byte menurut standar C++."),
    Q("cin >> nama; lalu pengguna mengetik “Budi Santoso”. Isi nama menjadi…", ["Budi", "Budi Santoso", "Santoso", "Kosong"], 0, "cin >> berhenti di spasi. Gunakan getline."),
    Q("Output cout << \"Nilai\" << 90; adalah…", ["Nilai90", "Nilai 90", "\"Nilai\"90", "Error"], 0, "Tidak ada spasi otomatis; tulis \"Nilai \" jika ingin spasi."),
    Q("Fungsi endl pada cout adalah…", ["Pindah ke baris baru", "Mengakhiri program", "Menghapus layar", "Membaca masukan"], 0, "Setara dengan \"\\n\" (plus mengosongkan buffer)."),
    Q("Pernyataan yang benar tentang variabel adalah…", ["Variabel mewakili alamat memori yang menyimpan nilai", "Variabel tidak memakai memori", "Nama variabel boleh berspasi", "Nilai variabel tidak bisa diubah"], 0, "Nilai yang tidak bisa diubah adalah konstanta (const).")
  ],
  ringkasan: `*RANGKUMAN P2 ALGORITMA & PEMROGRAMAN*
🧩 Struktur: #include <iostream> • using namespace std; • int main() { … return 0; }
💬 Komentar: // satu baris, /* … */ banyak baris
📦 Variabel = kotak bernama di memori. Deklarasi: int umur; • Inisialisasi: int umur = 19;
🔤 Nama: diawali huruf/_, tanpa spasi/minus, bukan keyword, case sensitive
🔢 Tipe: int, float (80.1 pakai titik), double, char ('A'), string ("Ani"), bool (true/false)
📥 cin >> x;  📤 cout << "teks" << x << endl;  nama berspasi: getline(cin, nama);
📝 Tugas: program Nama & Umur, pakai string dan int.`
};
