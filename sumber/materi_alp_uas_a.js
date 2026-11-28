// 📖 Materi Lengkap ALP P9–P12 (menuju UAS). Sumber: slide "Pertemuan 8 9 - Array", Tatap Maya 5 (Array),
// "Pertemuan 10 - Struct", Tatap Maya 6 (Struct), modul "Fungsi" + slide "Menguasai Fungsi C++" (P11), slide "Fungsi" Muhamad Rosidin (P12).
// Bagian bertanda ➕ bukan dari modul. Setiap istilah dijelaskan: artinya, kapan dipakai, contoh, kesalahan umum.
const { e, c, A, tip, ul, salah, modul, code, tbl, rv } = require("./alp_uas_util.js");
const M = {};

// ───────────────────────────── P9 ARRAY ─────────────────────────────
M.p9 = [
  A("Array: Banyak Data Sejenis dengan Satu Nama", `<p><strong>Array</strong> (larik) adalah kumpulan beberapa elemen data dengan <strong>tipe yang sama</strong> yang disimpan berurutan dan dipanggil dengan <strong>nama yang sama</strong>. Setiap elemen dibedakan oleh nomor urutnya, yang disebut <strong>indeks</strong>, dan indeks selalu dimulai dari <strong>0</strong>.</p>
<p>Tanpa array, menyimpan nilai ujian 40 mahasiswa butuh 40 variabel (${c("nilai1")}, ${c("nilai2")}, …). Dengan array cukup satu: ${c("float nilai[40];")}, lalu elemennya diproses dengan satu perulangan.</p>
<p><strong>Kapan dipakai:</strong> saat ada banyak data bertipe sama yang diolah dengan cara yang sama: daftar harga barang, daftar nama siswa, nilai ujian. Array juga menjadi dasar algoritma <strong>pengurutan</strong> (P13) dan <strong>pencarian</strong> (P14–P15).</p>`, "Bagian 1"),
  tbl("Lima Bagian Array", ["Bagian", "Artinya", "Pada int angka[5] = {10, 20, 30, 40, 50};"], [
    ["Tipe data", "Tipe setiap elemen. Semua elemen satu array bertipe sama", "`int`"],
    ["Nama array", "Pengenal untuk memanggil array", "`angka`"],
    ["Ukuran", "Jumlah elemen; ditentukan saat deklarasi dan <strong>tidak bisa diubah</strong>", "`5`"],
    ["Indeks", "Nomor posisi elemen, mulai 0 sampai ukuran − 1", "0, 1, 2, 3, 4"],
    ["Elemen", "Data yang disimpan di setiap posisi", "`angka[0]` = 10 … `angka[4]` = 50"]
  ], [
    { label: "Indeks terakhir", target: "row", row: 3, title: "Ukuran 5 → indeks terakhir 4", text: "Indeks terakhir selalu <strong>ukuran − 1</strong>. <code>angka[5]</code> sudah di luar array." },
    { label: "Ukuran tetap", target: "row", row: 2, title: "Tidak bisa ditambah", text: "Array biasa di C++ tidak bisa membesar. Kalau datanya bisa bertambah, siapkan ukuran yang cukup besar sejak awal. ➕ Untuk ukuran yang bisa berubah, C++ menyediakan <code>vector</code> (di luar materi ini)." }
  ]),

  A("Deklarasi dan Inisialisasi", `<p><strong>Deklarasi</strong> = memesan tempat: ${c("tipe nama[ukuran];")}. Contoh slide ${c("unsigned short int arrayku[5];")} memesan 5 elemen bertipe unsigned short int.</p>
<p><strong>Inisialisasi</strong> = memberi nilai permulaan <strong>saat deklarasi</strong>, dengan kurung kurawal: ${c("unsigned int myarray[4] = {2, 4, 6, 8};")}. Elemen ke-0 berisi 2, ke-1 berisi 4, ke-2 berisi 6, ke-3 berisi 8.</p>
<p>Kalau tidak diinisialisasi, elemen bisa diisi satu per satu sesudahnya: ${c("angka[0] = 10;")}, ${c("angka[1] = 20;")}, dan seterusnya. Isi array lokal yang belum diberi nilai <strong>tidak bisa ditebak</strong> (sisa isi memori), jadi jangan dibaca sebelum diisi.</p>`, "Bagian 2"),
  tbl("Bentuk-Bentuk Inisialisasi", ["Kode", "Isi array", "Keterangan"], [
    ["`int a[5] = {10, 20, 30, 40, 50};`", "{10, 20, 30, 40, 50}", "Bentuk di modul: jumlah nilai = ukuran"],
    ["`int a[5] = {10, 20};`", "{10, 20, 0, 0, 0}", "➕ Nilai yang kurang otomatis 0"],
    ["`int a[5] = {};`", "{0, 0, 0, 0, 0}", "➕ Cara cepat mengosongkan semua elemen"],
    ["`int a[] = {7, 8, 9};`", "{7, 8, 9}", "➕ Ukuran dihitung compiler: 3"],
    ["`int a[3] = {1, 2, 3, 4};`", "Error kompilasi", "➕ Nilai lebih banyak dari ukuran"],
    ["`string nama[3] = {\"Ani\", \"Budi\", \"Cici\"};`", "{\"Ani\", \"Budi\", \"Cici\"}", "Array string (butuh `#include <string>`)"]
  ]),
  code("array-string.cpp", `#include <iostream>
#include <string>
using namespace std;

int main() {
    string nama[3] = {"Ani", "Budi", "Cici"};
    for (int i = 0; i < 3; i++) {     // i = 0, 1, 2
        cout << nama[i] << " ";
    }
    return 0;
}
// Output: Ani Budi Cici`, "Contoh modul tanpa tanda $ di depan nama array (lihat catatan modul di bawah). Pola for (i = 0; i < ukuran; i++) adalah cara baku mengunjungi semua elemen."),

  A("Mengakses Elemen", `<p>Elemen diakses <strong>satu per satu</strong> dengan nama array dan indeks di kurung siku. Contoh slide:</p>
${ul([`${c("arrayku[1] = 100;")} mengisi elemen kedua dengan 100.`, `${c("X = arrayku[2];")} membaca elemen ketiga ke variabel X.`, `${c("Y = arrayku[X+1];")} indeksnya boleh berupa ekspresi; kalau X = 2, yang dibaca arrayku[3].`])}
<p>Indeks yang diakses <strong>tidak boleh melebihi</strong> batas saat deklarasi. Untuk ${c("int larik[10];")} indeks yang sah 0–9: ${c("larik[8] = 1;")} dan ${c("larik[9] = larik[2];")} benar, ${c("larik[10] = 2;")} salah.</p>
<p>Yang perlu diingat: C++ <strong>tidak menolak</strong> ${c("larik[10]")} saat kompilasi. Nilainya ditulis ke memori milik data lain, sehingga program bisa tampak normal, mengeluarkan angka aneh, atau berhenti mendadak. Batas indeks harus dijaga sendiri. Simulasinya ada di tab Simulator.</p>`, "Bagian 3"),

  A("Array di Memori", `<p>Elemen array disimpan <strong>berurutan</strong> (bersebelahan) di memori, mulai dari indeks 0. Byte ke-0 dari elemen ke-0 menempati alamat memori pertama, lalu elemen berikutnya tepat di belakangnya.</p>
<p>Rumus ukuran dari slide: <strong>byte total array = jumlah byte tipe data × jumlah elemen</strong>. Untuk ${c("unsigned short int arrayku[5];")}: 2 byte × 5 = <strong>10 byte</strong>. Untuk ${c("int angka[5];")}: 4 byte × 5 = 20 byte.</p>
<p>Karena berurutan, alamat elemen ke-i = alamat awal + i × ukuran tipe. Contoh modul (alamat awal 1000, int 4 byte): angka[0] di 1000, angka[1] di 1004, angka[2] di 1008, angka[3] di 1012, angka[4] di 1016. Angka 1000 hanya contoh; alamat sebenarnya berbeda setiap program dijalankan.</p>`, "Bagian 4"),
  { type: "diagram", label: "Diagram", title: "int angka[5] = {10, 20, 30, 40, 50}; di Memori", desc: "Setiap kotak int memakai 4 byte, jadi alamatnya selalu melompat 4.", minw: 520,
    svg: `<svg viewBox="0 0 620 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lima kotak berurutan berisi 10 sampai 50 dengan alamat 1000 sampai 1016">${[10, 20, 30, 40, 50].map((v, i) => `<g><rect x="${20 + i * 116}" y="40" width="112" height="56" rx="8" fill="${i === 0 ? "#fff3b0" : "#ffffff"}" stroke="#17202a" stroke-width="2"/><text x="${76 + i * 116}" y="76" text-anchor="middle" font-size="22" font-weight="700" fill="#17202a" font-family="monospace">${v}</text><text x="${76 + i * 116}" y="28" text-anchor="middle" font-size="14" fill="#475569" font-family="monospace">angka[${i}]</text><text x="${76 + i * 116}" y="122" text-anchor="middle" font-size="14" fill="#1f5c52" font-family="monospace">${1000 + i * 4}</text><text x="${76 + i * 116}" y="146" text-anchor="middle" font-size="12" fill="#64748b">4 byte</text></g>`).join("")}</svg>`,
    parts: [] },
  tbl("Ukuran Tipe Data (sizeof)", ["Tipe", "Ukuran di modul", "Array 5 elemen"], [
    ["`char`", "1 byte", "5 byte"],
    ["`short`", "2 byte", "10 byte"],
    ["`int`", "4 byte", "20 byte"],
    ["`float`", "4 byte", "20 byte"],
    ["`long`", "8 byte", "40 byte (➕ di Windows: 4 byte → 20 byte)"],
    ["`long long`", "8 byte", "40 byte"],
    ["`double`", "8 byte", "40 byte"]
  ], [
    { label: "sizeof", target: "row", row: 2, title: "sizeof(array) = seluruh array", text: "<code>sizeof(angka)</code> untuk <code>int angka[5]</code> menghasilkan 20, yaitu ukuran <strong>seluruh</strong> array, bukan satu elemen. ➕ Jumlah elemen bisa dihitung dengan <code>sizeof(angka) / sizeof(angka[0])</code> = 20 / 4 = 5." },
    { label: "long", target: "row", row: 4, title: "Bergantung sistem", text: "➕ Ukuran long tidak sama di semua komputer: 8 byte di Linux/macOS 64-bit, 4 byte di Windows (termasuk Dev-C++). Untuk soal ujian, pakai tabel modul." }
  ]),
  code("alamat.cpp", `#include <iostream>
using namespace std;

int main() {
    int angka[5] = {10, 20, 30, 40, 50};
    cout << &angka[0] << endl;   // alamat elemen pertama, mis. 0x7ffd5a10
    cout << angka << endl;       // sama dengan &angka[0]
    cout << angka + 1 << endl;   // alamat elemen kedua (maju 4 byte)
    cout << sizeof(angka) << endl;   // 20
    return 0;
}`, "Operator & (address of) memberi alamat sebuah elemen. Nama array tanpa indeks juga berarti alamat elemen pertama, dan angka + 1 menunjuk elemen berikutnya (bukan byte berikutnya)."),

  A("Array Tidak Bisa Diproses Sekaligus", `<p>Elemen array hanya bisa diakses secara <strong>individual</strong>; satu-satunya saat semua elemen diisi bersamaan adalah inisialisasi. Akibatnya ada dua masalah di slide:</p>
<p><strong>Masalah 1, assignment.</strong> ${c("a = b;")} untuk menyalin seluruh isi array b ke a adalah <strong>error</strong>. Elemen harus disalin satu per satu (${c("a[0] = b[0]; a[1] = b[1]; …")}), dan agar tidak panjang dipakai loop for: ${c("for (i = 0; i < 5; i++) a[i] = b[i];")}</p>
<p><strong>Masalah 2, operasi vektor.</strong> Vektor matematika a = [1, 3, 5, 7, 9] dan b = [2, 4, 6, 8, 10] tidak bisa dijumlahkan dengan ${c("c = b + a;")}. Penjumlahan, pengurangan, dan perkalian dikerjakan per elemen dengan indeks yang sama: ${c("for (j = 0; j < 5; j++) c[j] = b[j] + a[j];")} menghasilkan c = [3, 7, 11, 15, 19].</p>`, "Bagian 5"),
  tbl("Operasi Vektor dari Slide (a = [1, 3, 5, 7, 9], b = [2, 4, 6, 8, 10])", ["Operasi", "Isi loop", "Hasil"], [
    ["a + b", "`c[j] = a[j] + b[j];`", "[3, 7, 11, 15, 19]"],
    ["a − b", "`c[j] = a[j] - b[j];`", "[−1, −1, −1, −1, −1]"],
    ["a · b (dot product)", "`dot = dot + a[j] * b[j];` (dot mulai 0)", "1·2 + 3·4 + 5·6 + 7·8 + 9·10 = <strong>190</strong>"]
  ], [
    { label: "Dot product", target: "row", row: 2, title: "Hasilnya satu angka", text: "➕ Dot product bukan array: setiap pasangan dikalikan lalu semuanya dijumlahkan. Siapkan variabel penampung <code>int dot = 0;</code> sebelum loop." }
  ]),
  salah([
    `Memakai indeks 1 sampai n: ${c("for (i = 1; i <= 5; i++)")}. Elemen ke-0 terlewat dan ${c("a[5]")} berada di luar array. Pola yang benar ${c("i = 0; i < 5")}.`,
    `Menyalin dengan ${c("a = b;")} atau membandingkan dengan ${c("a == b")}. Keduanya tidak bekerja pada array biasa; proses per elemen dengan loop.`,
    `Mengira ukuran bisa berubah: ${c("int n; cin >> n; int a[n];")} bukan C++ standar (sebagian compiler menerimanya). Untuk tugas, pakai ukuran tetap yang cukup besar.`,
    `Menulis ${c("cout << angka;")} untuk mencetak isi array. Yang tercetak alamat memori, bukan isinya. Cetak dengan loop.`
  ]),
  modul([
    `Modul Tatap Maya 5 menulis nama array dengan awalan ${c("$")} (${c("$angka")}, ${c("$nama_array")}) dan menyebutnya "harus diawali tanda dollar". Itu kebiasaan PHP. Di C++ nama array ditulis biasa: ${c("int angka[5];")}. Kalau soal bertanya "menurut modul", jawabannya tanda $.`,
    `Modul yang sama menyebut array menyimpan data "dengan tipe data yang sama atau tidak sama". Di C++ semua elemen array <strong>harus</strong> bertipe sama (slide P8–9 juga menyebut "tipe yang sama"). Data berbeda tipe dikelompokkan dengan struct (P10).`,
    `Contoh ${c("sizeof")} modul memakai ${c("printf")} dari C dengan ${c('"%d"')}. ➕ Di C++ cukup ${c("cout << sizeof(angka);")}.`
  ]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "int data[8]; Indeks terakhirnya?", answer: "7", reason: "Ukuran 8 → indeks 0 sampai 7." },
    { prompt: "Byte total double nilai[10];", answer: "80 byte", reason: "8 byte × 10 elemen." },
    { prompt: "int a[4] = {5, 6}; Isi a[3]?", answer: "0", reason: "Nilai yang tidak disebut saat inisialisasi diisi 0." },
    { prompt: "Kalau arrayku = {4, 9, 2, 7, 1} dan X = arrayku[2], apa isi arrayku[X+1]?", answer: "7", reason: "X = 2, jadi yang dibaca arrayku[3] = 7." }
  ])
];

// ───────────────────────────── P10 STRUCT ─────────────────────────────
M.p10 = [
  A("Struct: Satu Record, Banyak Tipe", `<p><strong>struct</strong> (tipe data struktur) adalah kata kunci C/C++ untuk membuat <strong>tipe data baru</strong> yang mengelompokkan beberapa variabel dengan <strong>tipe berbeda</strong> menjadi satu unit. Setiap variabel di dalamnya disebut <strong>member</strong> atau <strong>field</strong>.</p>
<p>Contoh modul: data satu mahasiswa berisi nama (string), NIM (string), nilai (float), jurusan (string). Data satu produk berisi kode, nama, harga. Semuanya milik satu "benda", jadi dihimpun dalam satu <strong>record</strong>.</p>
<p><strong>Kapan dipakai:</strong> saat beberapa data selalu berjalan bersama dan menjelaskan satu hal. Bandingkan dengan array: array = banyak data <em>sejenis</em> (40 nilai), struct = beberapa data <em>berbeda jenis</em> milik satu hal (nama + NIM + nilai). Keduanya sering digabung: array of struct untuk satu kelas mahasiswa.</p>`, "Bagian 1"),
  tbl("Array atau Struct?", ["", "Array", "Struct"], [
    ["Isi", "Banyak elemen bertipe <strong>sama</strong>", "Beberapa member bertipe <strong>boleh berbeda</strong>"],
    ["Cara memanggil", "Indeks: `nilai[2]`", "Nama member: `mhs.nilai`"],
    ["Contoh", "`float nilai[40];`", "`struct Mahasiswa { string nama; float nilai; };`"],
    ["Cocok untuk", "Daftar data sejenis", "Satu record dengan beberapa keterangan"]
  ]),

  A("Deklarasi Struct", `<p>Bentuk umum dari slide:</p>
<pre>struct namaStruct {
    tipedata namafield1;
    tipedata namafield2;
} nama_object;</pre>
${ul([
    `${c("namaStruct")}: nama tipe baru (identitas struct). Konvensi umum huruf awal besar: ${c("Mahasiswa")}, ${c("ProductRec")}.`,
    `Isi kurung kurawal: deklarasi member, ditulis persis seperti variabel biasa.`,
    `${c("nama_object")} (opsional): object yang langsung dibuat. Bisa lebih dari satu, dipisah koma, dan selalu diletakkan <strong>setelah</strong> kurung tutup dan <strong>sebelum</strong> titik koma.`,
    `<strong>Titik koma setelah ${c("}")} wajib</strong>, baik ada object maupun tidak.`
  ])}
<p>Nama struct dan nama object masing-masing opsional, tetapi tidak boleh keduanya dihilangkan. Kalau nama struct tidak ditulis, object wajib dibuat di tempat itu juga, dan struct tersebut tidak bisa dipakai untuk membuat object lain di luar deklarasinya.</p>`, "Bagian 2"),
  code("struct-object.cpp", `#include <iostream>
#include <string>
using namespace std;

int main() {
    struct siswa {
        int no_induk;
        string nama;
        float nilai;
    } adi, bambang;      // object di dalam deklarasi struct

    siswa budi, tono;    // object di luar deklarasi struct
    return 0;
}`, "Contoh program slide: empat object (adi, bambang, budi, tono) dari satu rancangan siswa. Masing-masing punya no_induk, nama, dan nilai sendiri."),

  A("Object dan Operator Titik", `<p>Struct hanyalah <strong>rancangan</strong>: menulis ${c("struct siswa { … };")} belum menyiapkan memori untuk data siapa pun. Memori baru ada saat <strong>object</strong> dibuat, caranya sama seperti membuat variabel biasa dengan struct sebagai tipenya: ${c("siswa budi;")}</p>
<p>Member <strong>tidak bisa dipakai</strong> sebelum ada object. Untuk membaca atau mengisi member, pakai <strong>member access operator</strong> berupa titik di antara nama object dan nama member: ${c("budi.nama = \"Budi Januar\";")}, ${c("cout << budi.nilai;")}</p>`, "Bagian 3"),
  { type: "kode-jelas", label: "Kode Berpenjelas", title: "Contoh Program Struct, Dibaca Baris per Baris",
    desc: "Klik satu baris untuk melihat artinya dan isi object sesudah baris itu jalan.", file: "struct-siswa.cpp", lang: "cpp",
    kode: ["struct siswa {", "    int no_induk;\n    string nama;\n    float nilai;", "};", "siswa budi, tono;", "budi.no_induk = 1;", "budi.nama = \"Budi Januar\";\nbudi.nilai = 75.5;", "tono.no_induk = 2;\ntono.nama = \"Tono Laksono\";\ntono.nilai = 89.9;", "cout << budi.nama << \" mendapatkan nilai \" << budi.nilai << endl;"],
    inti: { judul: "Satu rancangan, dua object", html: "Rancangan siswa dipakai untuk membuat budi dan tono, lalu member keduanya diisi dengan operator titik. Output baris terakhir: <code>Budi Januar mendapatkan nilai 75.5</code>",
      efek: { vars: [["budi.no_induk", "1"], ["budi.nama", "\"Budi Januar\""], ["budi.nilai", "75.5"], ["tono.no_induk", "2"], ["tono.nama", "\"Tono Laksono\""], ["tono.nilai", "89.9"]] } },
    catatan: [
      { at: [0], judul: "Nama tipe baru", arti: "<code>siswa</code> menjadi tipe data seperti int atau float, tetapi isinya beberapa member.", efek: { html: "Belum ada memori untuk data siswa mana pun." } },
      { at: [1], judul: "Tiga member, tiga tipe", arti: "Ditulis seperti deklarasi variabel biasa. Tipenya boleh berbeda, inilah keunggulan struct dibanding array.", keliru: "Memberi nilai di sini dikira mengisi data budi. Nilai di rancangan adalah nilai bawaan untuk semua object (non-static member initialization)." },
      { at: [2], judul: "Titik koma penutup", arti: "Kurung kurawal struct selalu ditutup <code>};</code>.", keliru: "Lupa titik koma. Compiler menampilkan error di baris berikutnya (misalnya \"expected ';' after struct definition\"), sehingga sumbernya sering tidak terlihat." },
      { at: [3], judul: "Membuat object", arti: "Sekarang memori disiapkan: dua salinan tiga member.", efek: { vars: [["budi.no_induk", "?", "baru"], ["budi.nama", "\"\"", "baru"], ["budi.nilai", "?", "baru"], ["tono.no_induk", "?", "baru"], ["tono.nama", "\"\"", "baru"], ["tono.nilai", "?", "baru"]] } },
      { at: [4], judul: "Operator titik", arti: "<code>object.member</code>: member no_induk milik budi.", efek: { vars: [["budi.no_induk", "1", "baru"], ["budi.nama", "\"\""], ["budi.nilai", "?"]] }, keliru: "Menulis <code>siswa.no_induk = 1;</code>. siswa adalah nama tipe, bukan object." },
      { at: [5], judul: "Mengisi member lain", arti: "Setiap member diisi sesuai tipenya: string dengan teks berkutip, float dengan bilangan.", efek: { vars: [["budi.no_induk", "1"], ["budi.nama", "\"Budi Januar\"", "baru"], ["budi.nilai", "75.5", "baru"]] } },
      { at: [6], judul: "Object lain, member sendiri", arti: "Mengisi tono tidak mengubah budi sama sekali.", efek: { vars: [["budi.nilai", "75.5"], ["tono.no_induk", "2", "baru"], ["tono.nama", "\"Tono Laksono\"", "baru"], ["tono.nilai", "89.9", "baru"]] } },
      { at: [7], judul: "Membaca member", arti: "Cara membaca sama dengan cara mengisi: nama object, titik, nama member.", efek: { html: "<code>Budi Januar mendapatkan nilai 75.5</code>" }, keliru: "<code>cout &lt;&lt; budi;</code> error: cout tidak tahu cara mencetak struct. Cetak membernya satu per satu." }
    ] },

  A("Cara Memberi Nilai Awal (Inisialisasi)", `<p>Inisialisasi = memberi nilai awal. Kedua modul menyebut beberapa cara; bedanya ada di <strong>kapan</strong> nilai diberikan dan <strong>berlaku untuk siapa</strong>.</p>
<p>Aturan dari slide: pada initializer list dan uniform initialization, nilai boleh tidak diisi untuk member <strong>paling bawah/kanan</strong> saja (seperti argumen bawaan fungsi). ${c("siswa s = {1, \"Ani\"};")} sah dan ${c("s.nilai")} menjadi 0, tetapi tidak bisa melewati member tengah.</p>
<p>Di <strong>C++11</strong>, non-static member initialization tidak boleh digabung dengan initializer list/uniform initialization (compiler menolak). Sejak <strong>C++14</strong> keduanya boleh dipakai bersamaan.</p>`, "Bagian 4"),
  tbl("Lima Cara Inisialisasi Struct", ["Cara", "Contoh", "Berlaku untuk", "Catatan"], [
    ["Setelah deklarasi (isi per member)", "`Mahasiswa mhs1; mhs1.nama = \"John Doe\";`", "Object itu", "Paling dasar; satu baris per member"],
    ["Non-static member initialization", "`struct siswa { int no_induk = 0; string nama = \"kosong\"; };`", "<strong>Semua</strong> object", "Nilai bawaan ditulis di rancangan. Modul Tatap Maya 6 menyebutnya \"inisialisasi saat dideklarasikan\""],
    ["Initializer list", "`siswa budi = {1, \"Budi Januar\", 75.5};`", "Object itu", "Nilai urut sesuai urutan member"],
    ["Uniform initialization", "`siswa tono{2, \"Tono Laksono\", 89.9};`", "Object itu", "Sama dengan initializer list <strong>tanpa tanda =</strong>; mulai C++11"],
    ["Konstruktor", "`Mahasiswa(string nm, string nim, string jrsn) { nama = nm; … }`<br>`Mahasiswa mhs1(\"John Doe\", \"12345678\", \"Teknik Informatika\");`", "Object itu", "Fungsi khusus bernama sama dengan struct, dijalankan saat object dibuat"]
  ], [
    { label: "Urutan", target: "row", row: 2, title: "Urutan harus cocok", text: "<code>{1, \"Budi\", 75.5}</code> diisi ke no_induk, nama, nilai sesuai urutan member di rancangan. Menukar urutan (<code>{\"Budi\", 1, 75.5}</code>) membuat error tipe." },
    { label: "Tanpa =", target: "row", row: 3, title: "Satu-satunya beda", text: "<code>siswa tono = {…};</code> initializer list, <code>siswa tono{…};</code> uniform initialization." },
    { label: "Konstruktor", target: "row", row: 4, title: "Wajib diberi argumen", text: "➕ Begitu struct punya konstruktor berparameter, <code>Mahasiswa mhs2;</code> tanpa argumen menjadi error, kecuali ada konstruktor tanpa parameter juga." }
  ]),

  A("➕ Array of Struct", `<p>Satu object = satu record. Untuk data satu kelas, buat <strong>array yang elemennya struct</strong>: ${c("siswa kelas[3];")}. Elemen dipilih dengan indeks, lalu member dengan titik: ${c("kelas[0].nama")}.</p>
<p>Pola ini dipakai nanti di P13–P15: mengurutkan siswa berdasarkan nilai atau mencari siswa berdasarkan nomor induk.</p>`, "Bagian 5"),
  code("array-of-struct.cpp", `#include <iostream>
#include <string>
using namespace std;

struct siswa {
    int no_induk;
    string nama;
    float nilai;
};

int main() {
    siswa kelas[3] = {
        {1, "Budi Januar", 75.5},
        {2, "Tono Laksono", 89.9},
        {3, "Ani", 80}
    };
    for (int i = 0; i < 3; i++) {
        cout << kelas[i].nama << ": " << kelas[i].nilai << endl;
    }
    return 0;
}`, "Indeks dulu, baru titik: kelas[i].nama. Setiap baris di kurung kurawal adalah initializer list untuk satu elemen."),

  A("Alternatif Selain Struct", `<p>Modul Tatap Maya 6 menyebut beberapa cara lain untuk menyimpan data yang saling terkait. Cukup kenali perbedaannya dengan struct:</p>`, "Bagian 6"),
  tbl("Struct dan Alternatifnya", ["Alternatif", "Artinya", "Beda utama dengan struct"], [
    ["class", "Dasar pemrograman berorientasi objek: data + fungsi, mendukung inheritance dan polymorphism", "Akses bawaan class <strong>private</strong>, struct <strong>public</strong>. Bisa diubah dengan kata kunci public/private"],
    ["array", "Beberapa elemen bertipe <strong>sama</strong>", "Diakses dengan indeks, bukan nama member"],
    ["tuple", "Beberapa elemen bertipe berbeda tanpa nama (`#include <tuple>`)", "Diakses dengan `get<0>(t)`, bukan nama member"],
    ["map (dictionary)", "Pasangan key–value (`#include <map>`)", "Diakses dengan key: `nilai[\"Budi\"]`"],
    ["enum", "Sekumpulan nilai konstan bernama, mis. `enum Hari {SENIN, SELASA};`", "Hanya konstanta, bukan wadah data yang bisa diisi"]
  ]),
  salah([
    `Lupa ${c(";")} setelah ${c("}")} penutup struct.`,
    `Memakai nama tipe sebagai object: ${c("siswa.nama = \"Ani\";")}. Buat object dulu (${c("siswa ani;")}), lalu ${c("ani.nama")}.`,
    `Mencetak atau membandingkan object utuh: ${c("cout << budi;")} dan ${c("budi == tono")} error. Proses member satu per satu.`,
    `Urutan nilai di initializer list tidak sama dengan urutan member.`,
    `Mengira object kedua ikut berubah. Setiap object punya salinan member sendiri.`
  ]),
  modul([
    `Kotak "bentuk penulisan" di slide memakai ${c("struct siswa{ string nama; float nilai ; }")} tanpa titik koma penutup. Yang benar ${c("};")}.`,
    `Slide menyebut struct "pengembangan dari array". Lebih tepat: keduanya sama-sama mengelompokkan data, tetapi array untuk tipe sama dan struct untuk tipe berbeda.`,
    `Modul Tatap Maya 6 menyebut array "tidak memiliki nama variabel seperti struct": maksudnya elemen array tidak bernama sendiri, dibedakan dengan indeks.`
  ]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "Operator untuk mengakses member struct?", answer: "Titik ( . )", reason: "Disebut member access operator: object.member." },
    { prompt: "siswa s = {7, \"Ani\"}; Isi s.nilai (float)?", answer: "0", reason: "Member paling kanan yang tidak diisi bernilai 0." },
    { prompt: "Akses bawaan member struct vs class?", answer: "struct public, class private", reason: "Bisa diubah dengan kata kunci public/private." },
    { prompt: "Inisialisasi mana yang tidak memakai tanda = ?", answer: "Uniform initialization", reason: "siswa tono{2, \"Tono\", 89.9}; berasal dari C++11." }
  ]),
  tip("➕ Lanjutan: mengurutkan array of struct", `<p>Soal praktik sering meminta data struct diurutkan, misalnya mahasiswa dari nilai tertinggi. Caranya ada di <a href="#/c/struktur-data-algoritma/m/urut-struct">Mengurutkan Array of Struct</a> (section Struktur Data &amp; Algoritma): bubble sort langkah demi langkah yang membandingkan field nilai lalu menukar seluruh struct, supaya nama ikut pindah bersama nilainya.</p>`)
];

// ───────────────────────────── P11 FUNGSI & REKURSI ─────────────────────────────
M.p11 = [
  A("Fungsi: Kode Bernama yang Bisa Dipanggil Berulang", `<p><strong>Fungsi</strong> adalah bagian kode program yang diberi nama untuk melakukan <strong>satu tugas tertentu</strong> dan dapat dipanggil berulang kali. Slide menggambarkannya sebagai kotak hitam: <strong>input</strong> (parameter) masuk, <strong>proses</strong> (blok kode) berjalan, <strong>output</strong> (nilai kembali) keluar.</p>
<p>Dua manfaat yang disebut modul:</p>
${ul(["<strong>Efisiensi:</strong> mengurangi duplikasi. Kode menghitung luas ditulis sekali, dipanggil di mana saja.", "<strong>Keterbacaan:</strong> program terpecah menjadi blok bernama sehingga lebih mudah dibaca dan diubah."])}
<p><strong>Kapan membuat fungsi:</strong> saat potongan kode yang sama muncul lebih dari sekali, atau saat satu bagian program punya tugas yang jelas dan bisa diberi nama (hitungLuas, cetakNama, cariData).</p>`, "Bagian 1"),
  tbl("Anatomi Fungsi: float calculateArea(int radius)", ["Bagian", "Pada contoh", "Artinya"], [
    ["Tipe data pengembalian", "`float`", "Jenis nilai yang dikembalikan. `void` = tidak mengembalikan nilai"],
    ["Nama fungsi", "`calculateArea`", "Identitas untuk memanggil"],
    ["Parameter", "`(int radius)`", "Data masukan. Kurung kosong `()` = tanpa parameter"],
    ["Tubuh fungsi", "`{ float area = 3.14159 * radius * radius; … }`", "Logika yang dijalankan saat dipanggil"],
    ["Pengembalian nilai", "`return area;`", "Mengirim hasil ke pemanggil dan mengakhiri fungsi"]
  ], [
    { label: "void", target: "row", row: 0, title: "Tanpa nilai balik", text: "Fungsi void cukup melakukan sesuatu (mencetak, mengubah data). Ia tidak boleh dipakai di ekspresi seperti <code>int x = printHello();</code>." },
    { label: "return", target: "row", row: 4, title: "Tipe harus cocok", text: "Nilai return harus sesuai tipe pengembalian. Fungsi non-void yang tidak menjalankan return memberi nilai tak menentu." }
  ]),
  tbl("Empat Bentuk Deklarasi (dari Modul)", ["Bentuk", "Contoh modul", "Dipanggil dengan"], [
    ["Tanpa nilai balik, tanpa parameter", "`void printHello() { cout << \"Hello, World!\"; }`", "`printHello();`"],
    ["Mengembalikan nilai, tanpa parameter", "`int getAge() { int age = 25; return age; }`", "`int u = getAge();`"],
    ["Mengembalikan nilai, menerima parameter", "`float calculateArea(int radius) { … return area; }`", "`float L = calculateArea(7);`"],
    ["Tanpa nilai balik, menerima parameter", "`void printFullName(string firstName, string lastName) { cout << firstName << \" \" << lastName; }`", "`printFullName(\"Budi\", \"Januar\");`"]
  ]),

  A("Fungsi Buatan Pengguna: Definisi lalu Panggil", `<p>Ada dua tahap. <strong>Definisi</strong> menulis aturan mainnya sekali. <strong>Pemanggilan</strong> (call) menjalankannya, sebanyak yang dibutuhkan. Saat dipanggil, nilai yang dikirim disalin ke parameter, tubuh dijalankan, lalu nilai return menggantikan tempat pemanggilan.</p>
<p>Fungsi harus sudah dikenal sebelum dipanggil. Cara termudah: tulis definisinya <strong>di atas</strong> ${c("main()")}. (Cara lain, prototipe, dibahas di P12.)</p>`, "Bagian 2"),
  { type: "kode-jelas", label: "Kode Berpenjelas", title: "addNumbers: Definisi dan Pemanggilan", desc: "Contoh fungsi buatan pengguna dari modul. Klik baris untuk melihat isi variabel saat itu.", file: "addNumbers.cpp", lang: "cpp",
    kode: ["int addNumbers(int a, int b) {", "    int result = a + b;", "    return result;\n}", "int main() {\n    int x = 5, y = 7;", "    int sum = addNumbers(x, y);", "    cout << \"Hasil penjumlahan dari \" << x << \" dan \" << y << \" adalah \" << sum << endl;", "}"],
    urut: [3, 4, 5, 1, 2, 6, 7], urutan: ["main mulai", "Panggil addNumbers", "a, b menerima salinan", "Hitung", "Kembalikan 12", "Cetak", "Selesai"],
    inti: { judul: "Definisi di atas, panggilan di main", html: "Program mulai dari main, bukan dari baris pertama. Output: <code>Hasil penjumlahan dari 5 dan 7 adalah 12</code>" },
    catatan: [
      { at: [0], judul: "Kepala fungsi", arti: "<code>int</code> = tipe hasil, <code>addNumbers</code> = nama, <code>(int a, int b)</code> = dua parameter. Baris ini belum dijalankan saat program mulai.", keliru: "Menulis titik koma di sini: <code>int addNumbers(int a, int b); { … }</code>. Titik koma membuat baris ini menjadi prototipe dan blok di bawahnya error." },
      { at: [1], judul: "Tubuh: proses", arti: "a dan b berisi salinan nilai x dan y (5 dan 7).", efek: { vars: [["a", "5"], ["b", "7"], ["result", "12", "baru"]] } },
      { at: [2], judul: "return", arti: "Mengirim 12 kembali ke tempat pemanggilan, lalu fungsi selesai. Variabel a, b, result hilang.", efek: { vars: [["nilai kembali", "12", "baru"]] } },
      { at: [3], judul: "main = titik mulai", arti: "Eksekusi selalu dimulai dari main.", efek: { vars: [["x", "5", "baru"], ["y", "7", "baru"]] } },
      { at: [4], judul: "Pemanggilan", arti: "<code>addNumbers(x, y)</code> menjalankan fungsi dengan a = 5, b = 7. Setelah selesai, seluruh ekspresi itu bernilai 12 dan disimpan di sum.", efek: { vars: [["x", "5"], ["y", "7"], ["sum", "12", "baru"]] }, keliru: "Memanggil tanpa kurung: <code>addNumbers;</code> tidak menjalankan apa pun." },
      { at: [5], judul: "Memakai hasil", arti: "Hasil fungsi dipakai seperti variabel biasa.", efek: { html: "<code>Hasil penjumlahan dari 5 dan 7 adalah 12</code>" } }
    ] },

  A("Fungsi Built-in (Pustaka Standar)", `<p>Fungsi built-in sudah disediakan C++; tinggal dipanggil setelah header-nya di-include. Daftar modul di bawah, lengkap dengan header dan hasilnya.</p>`, "Bagian 3"),
  tbl("Fungsi Bawaan di Modul", ["Nama", "Kegunaan", "Header", "Contoh → hasil"], [
    ["`cout`", "Menampilkan output teks ke layar", "`<iostream>`", "`cout << \"Hai\";` → Hai"],
    ["`cin`", "Menerima input dari keyboard", "`<iostream>`", "`cin >> x;`"],
    ["`strcpy`", "Menyalin string", "`<cstring>`", "`strcpy(string2, string1);` → string2 berisi \"Hello\""],
    ["`strlen`", "Panjang string (jumlah karakter)", "`<cstring>`", "`strlen(\"Hello, World!\")` → 13"],
    ["`abs()`", "Nilai absolut", "`<cmath>` / `<cstdlib>`", "`abs(-15)` → 15"],
    ["`sqrt()`", "Akar kuadrat", "`<cmath>`", "`sqrt(16)` → 4"],
    ["`pow()`", "Pangkat", "`<cmath>`", "`pow(2, 3)` → 8"],
    ["`rand()`", "Bilangan acak", "`<cstdlib>`", "`rand() % 6 + 1` → 1 sampai 6"],
    ["`round()`", "Membulatkan ke bilangan bulat terdekat", "`<cmath>`", "`round(2.5)` → 3, `round(2.4)` → 2"],
    ["`max()`", "Nilai terbesar dari dua bilangan", "`<algorithm>`", "`max(4, 9)` → 9"]
  ], [
    { label: "cout & cin", target: "row", row: 0, title: "Sebenarnya objek", text: "Modul memasukkan cout dan cin ke daftar fungsi built-in. Tepatnya keduanya adalah <strong>objek</strong> aliran (stream) dari &lt;iostream&gt;, dipakai dengan operator &lt;&lt; dan &gt;&gt;, bukan dipanggil dengan kurung. Untuk soal \"menurut modul\", keduanya termasuk daftar built-in." },
    { label: "strlen", target: "row", row: 3, title: "Spasi dan tanda baca dihitung", text: "\"Hello, World!\" = 13 karakter: koma, spasi, dan tanda seru ikut dihitung. Karakter penutup <code>\\0</code> tidak dihitung." }
  ]),

  A("Rekursi: Fungsi yang Memanggil Dirinya Sendiri", `<p><strong>Fungsi rekursif</strong> adalah fungsi yang memanggil dirinya sendiri untuk menyelesaikan masalah. Masalah besar dipecah menjadi <strong>sub-masalah</strong> serupa yang lebih kecil, diselesaikan dengan cara yang sama, dan berhenti saat mencapai <strong>base case</strong>.</p>
<p>Tiga bagian yang disebut modul:</p>
${ul([
    "<strong>Base case</strong> (kondisi dasar): kondisi yang <strong>menghentikan</strong> rekursi dan langsung mengembalikan hasil. Slide menyebutnya \"rem darurat\".",
    "<strong>Recursive case</strong> (kondisi rekursif): kondisi saat fungsi memanggil dirinya dengan parameter berbeda. Slide menyebutnya \"gas\".",
    "<strong>Recursive call</strong>: baris pemanggilan dirinya sendiri itu, misalnya <code>factorial(n-1)</code>."
  ])}
<p>Syarat agar rekursi berhenti: parameternya harus <strong>bergerak mendekati</strong> base case di setiap panggilan (n-1 menuju 0).</p>`, "Bagian 4"),
  code("factorial.cpp", `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n == 0) return 1;            // base case
    return n * factorial(n - 1);     // recursive case + recursive call
}

int main() {
    int n = 3;
    cout << n << "! = " << factorial(n) << endl;   // 3! = 6
    return 0;
}`, "Factorial (stacking): factorial(3) menunggu factorial(2), yang menunggu factorial(1), yang menunggu factorial(0). factorial(0) mengembalikan 1, lalu hasil dikalikan saat kembali: 1 × 1 × 2 × 3 = 6. Telusuri langkahnya di tab Simulator."),
  { type: "flow", label: "Alur", title: "Mekanisme Kontrol Rekursi (Slide)", items: ["Fungsi dipanggil", "Base case terpenuhi?", "YA → stop, return nilai", "TIDAK → panggil diri sendiri dengan parameter berbeda", "Ulangi dari atas"], note: "Panggilan yang menunggu disimpan di <strong>stack</strong> (tumpukan memori). Setiap return membongkar satu tumpukan." },
  code("fibonacci.cpp", `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;                          // base case: fib(0) = 0, fib(1) = 1
    return fibonacci(n - 1) + fibonacci(n - 2);    // bercabang dua
}

int main() {
    int n = 10;
    for (int i = 0; i < n; i++) {
        cout << fibonacci(i) << " ";
    }
    return 0;
}
// Output: 0 1 1 2 3 5 8 13 21 34`, "Fibonacci (branching): setiap panggilan yang bukan base case memanggil dua kali. fibonacci(4) saja butuh 9 pemanggilan, dan fibonacci(2) dihitung berulang. Karena itu versi rekursif ini lambat untuk n besar."),
  tbl("Iterasi vs Rekursi", ["", "Iterasi (looping)", "Rekursi"], [
    ["Cara mengulang", "Perulangan for/while", "Fungsi memanggil dirinya sendiri"],
    ["Berhenti saat", "Kondisi loop false", "Base case tercapai"],
    ["Memori", "Lebih hemat", "Setiap panggilan memakai stack; terlalu dalam → <strong>stack overflow</strong>"],
    ["Cocok untuk (slide)", "Pengulangan sederhana", "Masalah bercabang: tree/graph, logika kompleks"]
  ]),
  tip("Stack overflow", `<p>Contoh modul ${c("void infiniteRecursion(int n) { infiniteRecursion(n+1); }")} tidak punya base case. Setiap panggilan menumpuk di memori stack tanpa pernah dibongkar, sampai stack penuh dan program <strong>crash</strong>. Penyebab paling umum: base case lupa ditulis, atau parameter tidak mendekati base case (misalnya ${c("factorial(n)")} alih-alih ${c("factorial(n-1)")}).</p>`, "warn"),
  tbl("Tipe Fungsi Lanjutan (Cukup Dikenali)", ["Tipe", "Artinya"], [
    ["inline", "Isi fungsi disalin compiler ke tempat pemanggilan saat kompilasi, untuk mempercepat eksekusi"],
    ["friend", "Fungsi di luar class yang boleh mengakses variabel private class itu"],
    ["virtual", "Fungsi yang dapat di-override (diganti) oleh class turunannya (polimorfisme)"],
    ["template", "Satu fungsi yang bisa dipakai untuk berbagai tipe data: `template <typename T> T add(T a, T b)`"],
    ["main", "Fungsi yang dijalankan pertama kali saat program dimulai"]
  ]),
  salah([
    `Base case tidak pernah tercapai: ${c("factorial(-1)")} pada fungsi yang hanya berhenti di ${c("n == 0")} → turun terus sampai stack overflow. ➕ Base case yang lebih aman: ${c("if (n <= 0) return 1;")}`,
    `Base case factorial mengembalikan 0: semua hasil perkalian ikut menjadi 0.`,
    `Lupa ${c("return")} pada recursive case: ${c("n * factorial(n-1);")} tanpa return → hasilnya tak menentu.`,
    `Memanggil fungsi sebelum didefinisikan (definisi di bawah main tanpa prototipe) → error "was not declared in this scope".`
  ]),
  modul([
    `Modul mencantumkan ${c("cout")} dan ${c("cin")} sebagai fungsi built-in; tepatnya keduanya objek stream (lihat tabel di atas).`,
    `Contoh "Iterasi vs Rekursi" diberi nama ${c("infiniteIteration")}, padahal ${c("for (int i=0; i<=n; i++)")} dengan n = 100 berhenti setelah mencetak 0 sampai 100 (101 baris). Yang benar-benar tak berhenti hanya versi rekursinya.`,
    `Komentar ${c("// 1 2 3 5 dst")} di contoh fibonacci kurang tepat untuk loop i = 0..9. Output sebenarnya ${c("0 1 1 2 3 5 8 13 21 34")}.`,
    `Di slide "Mekanisme Kontrol Rekursi" tertulis "Recursive Call: JetBrains Mono". "JetBrains Mono" adalah nama font yang ikut tercetak; maksudnya "Recursive Call: pemanggilan fungsi dengan parameter berbeda".`
  ]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "factorial(4) = ?", answer: "24", reason: "4 × 3 × 2 × 1 × 1." },
    { prompt: "fibonacci(6) = ?", answer: "8", reason: "Deret 0 1 1 2 3 5 8: indeks ke-6 adalah 8." },
    { prompt: "pow(3, 2) + sqrt(25) = ?", answer: "14", reason: "9 + 5." },
    { prompt: "Bagian rekursi yang menghentikan panggilan?", answer: "Base case", reason: "Tanpanya terjadi stack overflow." }
  ])
];

// ───────────────────────────── P12 FUNGSI PUSTAKA, PARAMETER, VARIABEL ─────────────────────────────
M.p12 = [
  A("Pengertian dan Klasifikasi Fungsi", `<p>Slide P12 mendefinisikan fungsi sebagai bagian program untuk mengerjakan <strong>tugas tertentu</strong> yang letaknya <strong>terpisah</strong> dari program yang memanggilnya. Setiap program C/C++ minimal punya satu fungsi: ${c("main()")}.</p>
<p>Keuntungan: struktur program jelas (<strong>readability</strong> tinggi) dan dapat digunakan kembali (<strong>reusability</strong>) sehingga bagian yang sama tidak ditulis berulang.</p>
<p>Fungsi dibagi dua: <strong>fungsi pustaka</strong> (sudah tersedia, tinggal include header) dan <strong>fungsi buatan programmer</strong>.</p>
<p>Contoh di slide P12 ditulis dalam bahasa <strong>C</strong> (${c("printf")}, ${c("scanf")}, ${c("<stdio.h>")}). Di C++ header yang sama bernama ${c("<cstring>")}, ${c("<cctype>")}, ${c("<cmath>")}, dan semua fungsinya tetap bisa dipakai.</p>`, "Bagian 1"),
  tbl("Fungsi Pustaka Operasi String (string.h / cstring)", ["Fungsi", "Kegunaan", "Bentuk umum", "Contoh → hasil"], [
    ["`strcpy()`", "Menyalin string asal ke variabel tujuan", "`strcpy(var_tujuan, string_asal);`", "`strcpy(nama, \"Universitas Dian Nuswantoro\");` → nama berisi teks itu"],
    ["`strlen()`", "Jumlah karakter suatu string", "`strlen(string);`", "`strlen(\"Universitas Dian Nuswantoro\")` → 27"],
    ["`strcat()`", "Menambahkan string sumber ke <strong>akhir</strong> string tujuan", "`strcat(tujuan, sumber);`", "satu = \"Fakultas Ilmu Komputer \", dua = \"Udinus\" → satu = \"Fakultas Ilmu Komputer Udinus\""],
    ["`strupr()`", "Mengubah semua huruf menjadi kapital", "`strupr(string);`", "→ \"FAKULTAS ILMU KOMPUTER UDINUS\""],
    ["`strlwr()`", "Mengubah semua huruf menjadi kecil", "`strlwr(string);`", "→ \"fakultas ilmu komputer udinus\""]
  ], [
    { label: "Ukuran tujuan", target: "row", row: 2, title: "Tujuan harus cukup besar", text: "strcat dan strcpy tidak memeriksa ukuran. Slide memakai <code>char satu[30]</code>: 23 + 6 karakter + penutup <code>\\0</code> = 30, pas. Kalau kurang, data lain tertimpa." },
    { label: "strupr", target: "row", row: 3, title: "Tidak standar", text: "strupr dan strlwr bukan bagian standar C/C++. Ada di Turbo C dan Dev-C++ (MinGW), tetapi tidak ada di GCC Linux/macOS. ➕ Cara standar: ubah per karakter dengan <code>toupper()</code> dalam loop." }
  ]),
  tbl("Fungsi Pustaka Operasi Karakter (ctype.h / cctype)", ["Fungsi", "Kegunaan", "Contoh → hasil"], [
    ["`islower(c)`", "Benar (bukan nol) jika huruf kecil", "`islower('a')` → bukan nol (benar)"],
    ["`isupper(c)`", "Benar jika huruf kapital", "`isupper('a')` → 0 (salah)"],
    ["`isdigit(c)`", "Benar jika karakter digit '0'–'9'", "`isdigit('7')` → benar; `isdigit('x')` → 0"],
    ["`tolower(c)`", "Mengubah huruf kapital menjadi kecil", "`tolower('A')` → 'a'"],
    ["`toupper(c)`", "Mengubah huruf kecil menjadi kapital", "`toupper('a')` → 'A'"]
  ], [
    { label: "Bukan nol", target: "row", row: 0, title: "Benar tidak selalu 1", text: "Fungsi is…() mengembalikan <strong>bukan nol</strong> untuk benar (bisa 1, 2, 512, dan seterusnya) dan 0 untuk salah. Jadi tulis <code>if (isdigit(c))</code>, bukan <code>if (isdigit(c) == 1)</code>." },
    { label: "Selain huruf", target: "row", row: 4, title: "Karakter lain dibiarkan", text: "<code>toupper('7')</code> tetap '7'. Hasilnya bertipe int, jadi cetak dengan <code>(char)toupper(c)</code> di cout." }
  ]),
  tbl("Fungsi Pustaka Matematik (math.h / cmath)", ["Fungsi", "Kegunaan", "Contoh slide → hasil"], [
    ["`sqrt(x)`", "Akar kuadrat", "`sqrt(16)` → 4.00"],
    ["`pow(x, y)`", "x pangkat y", "`pow(3, 5)` → 243.00"]
  ]),

  A("Membuat Fungsi Sendiri: Deklarasi, Definisi, Prototipe", `<p>Sebelum dipanggil, fungsi harus <strong>dideklarasikan</strong> dan <strong>didefinisikan</strong>.</p>
${ul([
    `<strong>Deklarasi = prototipe</strong>: kepala fungsi diakhiri titik koma, ${c("tipe_fungsi nama_fungsi(parameter_fungsi);")}. Prototipe memberi tahu compiler bagaimana fungsi menerima input dan nilai apa yang dikembalikan. Biasanya ditulis di atas ${c("main()")}.`,
    `<strong>Definisi</strong>: kepala fungsi diikuti tubuh ${c("{ statement … }")}. Boleh ditulis di bawah main asalkan prototipenya sudah ada di atas.`
  ])}
<p>Di prototipe, nama parameter boleh dihilangkan: ${c("float proses(float, float, float);")} sama sahnya dengan ${c("float proses(float x, float y, float z);")}. Yang wajib cocok adalah tipe, jumlah, dan urutan parameter serta tipe hasilnya.</p>`, "Bagian 2"),
  code("prototipe.cpp", `#include <iostream>
using namespace std;

int jumlah(int a, int b);        // prototipe (deklarasi): ada titik koma

int main() {
    int a, b, c;
    cout << "masukkan a: "; cin >> a;
    cout << "masukkan b: "; cin >> b;
    c = jumlah(a, b);              // a, b = parameter aktual
    cout << "Hasil Penjumlahan= " << c;
    return 0;
}

int jumlah(int x, int y) {       // definisi; x, y = parameter formal
    return (x + y);
}`, "Versi C++ dari contoh slide. Tanpa baris prototipe, compiler menolak jumlah(a, b) karena saat membaca main ia belum mengenal jumlah."),

  A("Parameter Formal dan Parameter Aktual", `<p><strong>Parameter formal</strong> = variabel di daftar parameter pada <strong>definisi</strong> fungsi: ${c("int jumlah(int x, int y)")} → x dan y.</p>
<p><strong>Parameter aktual</strong> = nilai/variabel yang dipakai saat <strong>pemanggilan</strong>: ${c("c = jumlah(a, b);")} → a dan b.</p>
<p>Saat dipanggil, nilai aktual <strong>disalin</strong> ke parameter formal sesuai <strong>urutan</strong> (a → x, b → y). Karena hanya salinan, namanya boleh berbeda, dan ➕ mengubah x di dalam fungsi tidak mengubah a di main. Parameter aktual boleh berupa konstanta atau ekspresi: ${c("jumlah(3, a * 2)")}.</p>`, "Bagian 3"),
  A("Variabel Lokal, Global, dan Static", `<p>Tempat sebuah variabel dideklarasikan menentukan <strong>siapa yang bisa memakainya</strong> dan <strong>berapa lama ia hidup</strong>.</p>`, "Bagian 4"),
  tbl("Tiga Jenis Variabel", ["Jenis", "Dideklarasikan di", "Bisa dipakai oleh", "Umur nilai"], [
    ["Global", "Di luar semua fungsi (biasanya di atas)", "Semua fungsi di bawahnya", "Selama program berjalan; otomatis 0 jika tidak diisi"],
    ["Lokal", "Di dalam fungsi atau blok", "Hanya fungsi/blok itu", "Dibuat saat fungsi dipanggil, hilang saat fungsi selesai"],
    ["Static (lokal)", "Di dalam fungsi dengan kata kunci `static`", "Hanya fungsi itu", "Nilainya <strong>dipertahankan</strong> walaupun proses sudah keluar dari blok; inisialisasi hanya sekali"]
  ], [
    { label: "Contoh slide", target: "row", row: 0, title: "Program volume balok", text: "<code>float p, l, t, volumebalok;</code> ditulis di luar main sehingga global, sedangkan <code>float v;</code> di dalam <code>proses()</code> lokal. ⚠️ Komentar <code>/*variabel global*/</code> di slide menempel di baris prototipe, bukan di baris variabelnya." },
    { label: "static", target: "row", row: 2, title: "Faktorial dengan static", text: "<code>static long int fakto = 1;</code> di dalam <code>faktorial(n)</code>. Dipanggil berturut-turut n = 1, 2, 3, 4: fakto menjadi 1, 2, 6, 24 karena nilai lama tidak hilang. Tanpa static, fakto mulai dari 1 lagi sehingga hasil terakhir hanya 4. Bandingkan langsung di tab Simulator." }
  ]),
  code("static.cpp", `#include <iostream>
using namespace std;

long int faktorial(int n) {
    static long int fakto = 1;   // dibuat sekali, nilainya bertahan
    fakto = fakto * n;
    return fakto;
}

int main() {
    int bil = 4;
    long int hasil = 0;
    for (int i = 1; i <= bil; i++) {
        hasil = faktorial(i);    // 1, 2, 6, 24
    }
    cout << "Faktorial " << bil << " = " << hasil;   // Faktorial 4 = 24
    return 0;
}`, "Versi C++ contoh slide. Fungsi ini hanya benar jika dipanggil berurutan mulai dari 1, karena bergantung pada nilai sisa panggilan sebelumnya."),
  A("Rekursi di Slide P12", `<p>Slide P12 mengulang rekursi dengan ${c("long int factorial(int N)")}: ${c("if (N==0) return(1); else return(N*factorial(N-1));")}. Jejak ${c("factorial(4)")}:</p>
<pre>factorial(4)
= 4 * factorial(3)
= 4 * 3 * factorial(2)
= 4 * 3 * 2 * factorial(1)
= 4 * 3 * 2 * 1 * factorial(0)     ← N == 0, return 1
= 4 * 3 * 2 * 1 * 1 = 24</pre>
<p>Penjelasan lengkap base case dan recursive case ada di P11.</p>`, "Bagian 5"),
  salah([
    `Prototipe dan definisi tidak cocok (${c("int jumlah(int, int);")} tetapi definisinya ${c("float jumlah(float x, float y)")}) → error atau fungsi dianggap berbeda.`,
    `Lupa titik koma di akhir prototipe, atau sebaliknya menaruh titik koma di kepala definisi.`,
    `Memakai variabel lokal fungsi lain: x di dalam ${c("jumlah()")} tidak dikenal di main.`,
    `Mengira mengubah parameter formal mengubah variabel pemanggil. Yang diubah hanya salinannya.`,
    `Memakai ${c("islower(c) == 1")}; nilai benar bisa angka bukan nol lain.`
  ]),
  modul([
    `Semua contoh slide P12 ditulis dalam C (${c("printf")}, ${c("scanf")}, ${c("getch()")} dari ${c("conio.h")}). ${c("conio.h")} hanya ada di compiler Windows lama (Turbo C, Dev-C++).`,
    `Slide menulis ${c("main()")} tanpa tipe. Di C++ wajib ${c("int main()")}; compiler modern menolak versi tanpa int.`,
    `Contoh prototipe di slide tertulis ${c("int jumlah(int a, int b)")} tanpa titik koma. Prototipe yang benar diakhiri ${c(";")}.`,
    `${c("strupr()")} dan ${c("strlwr()")} tidak standar; di GCC Linux muncul error "was not declared".`,
    `Contoh static mencetak ${c("long int")} dengan ${c('"%d"')}; yang tepat ${c('"%ld"')}.`
  ]),
  rv("Uji Pemahaman", "Jawab Dulu, Lalu Buka", [
    { prompt: "strlen(\"Algoritma\")?", answer: "9", reason: "A-l-g-o-r-i-t-m-a." },
    { prompt: "c = jumlah(a, b); a dan b disebut?", answer: "Parameter aktual", reason: "Yang dipakai saat memanggil. x dan y di definisi = parameter formal." },
    { prompt: "Variabel yang nilainya tetap bertahan setelah fungsi selesai?", answer: "Variabel static", reason: "Inisialisasinya hanya sekali." },
    { prompt: "toupper('b') menghasilkan?", answer: "'B'", reason: "Huruf kecil menjadi kapital." }
  ]),
  tip("➕ Lanjutan: parameter referensi dan pointer", `<p>Parameter di pertemuan ini dikirim sebagai salinan (pass by value), jadi fungsi tidak bisa mengubah variabel pemanggil. Dua cara lain, referensi (<code>int &amp;x</code>) dan pointer (<code>int *x</code>), ada di <a href="#/c/struktur-data-algoritma/m/pointer-referensi">Pointer dan Referensi</a> (section Struktur Data &amp; Algoritma), lengkap dengan fungsi tukar yang bisa dijalankan langkah demi langkah.</p>`)
];

module.exports = M;
