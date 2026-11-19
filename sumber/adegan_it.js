// Adegan bergerak (blok "adegan") dan penelusur langkah (blok "penelusur") untuk materi IT.
// Gambar adegannya ada di web/src/scripts/adegan.js (id scene di bawah harus sama dengan SC['<id>'] di sana).
// "sorot" menghubungkan langkah/potongan kode dengan bagian adegan yang sedang berjalan.

const pwdRequest = {
  type: "adegan", label: "Adegan", title: "Browser Meminta Halaman ke Server",
  desc: "Yang terjadi sejak alamat diketik sampai halaman muncul. Adegan berjalan sekali saat terlihat, langkah di bawahnya ikut menyala.",
  scene: "pwd-request",
  alt: "Alamat kampus.id/profil.html diketik di browser. Browser mengirim request GET ke server, server mengambil file profil.html, lalu mengirim response 200 OK berisi HTML, dan browser menampilkan halamannya.",
  steps: [
    { sorot: "1", html: "Alamat <code>kampus.id/profil.html</code> diketik di address bar, lalu Enter." },
    { sorot: "2", html: "Browser (client) mengirim <strong>request</strong> <code>GET /profil.html</code> ke server." },
    { sorot: "3", html: "Server mencari file yang diminta, yaitu <code>profil.html</code>." },
    { sorot: "4", html: "Server mengirim <strong>response</strong>: kode status <code>200 OK</code> beserta isi HTML-nya." },
    { sorot: "5", html: "Browser membaca HTML itu lalu menampilkan (render) halamannya." }
  ]
};

const pwdPesanHttp = {
  type: "penelusur", label: "Penelusur Langkah", title: "Isi Pesan Request dan Response",
  desc: "Tekan <strong>Berikutnya</strong> untuk melihat pesan HTTP yang sebenarnya dikirim pada setiap langkah.",
  nodes: [{ t: "Browser", s: "client" }, { t: "Server", s: "kampus.id" }],
  steps: [
    { on: 0, label: "Address bar", msg: "https://kampus.id/profil.html", hl: [0],
      say: "Alamat <strong>kampus.id/profil.html</strong> diketik. Bagian <code>kampus.id</code> adalah nama server, bagian <code>/profil.html</code> adalah file yang diminta." },
    { on: 0, label: "Request (dikirim browser)", msg: "GET /profil.html HTTP/1.1\nHost: kampus.id\nUser-Agent: Chrome\nAccept: text/html", hl: [0],
      say: "Browser menyusun pesan <strong>request</strong>. Baris pertama berisi method <code>GET</code>, path, dan versi HTTP. Baris berikutnya adalah header." },
    { dot: "req", label: "Request (dikirim browser)", msg: "GET /profil.html HTTP/1.1\nHost: kampus.id\nUser-Agent: Chrome\nAccept: text/html",
      say: "Request dikirim lewat internet ke server." },
    { on: 1, dot: "req", label: "Di server", msg: "index.html\nprofil.html   ← ditemukan\nstyle.css", hl: [1],
      say: "Server mencari file <strong>profil.html</strong>. Kalau ada, statusnya <code>200 OK</code>. Kalau tidak ada, <code>404 Not Found</code>." },
    { dot: "res", label: "Response (dikirim server)", msg: "HTTP/1.1 200 OK\nContent-Type: text/html\n\n<h1>Profil Kampus</h1>\n<p>Kampus berdiri sejak …</p>\n<img src=\"gedung.jpg\">", hl: [0],
      say: "Server mengirim <strong>response</strong>: baris status, header, satu baris kosong, lalu isi HTML." },
    { on: 0, label: "Hasil di browser", msg: "Profil Kampus\nKampus berdiri sejak …\n[gambar gedung.jpg]", hl: [0],
      say: "Browser membaca HTML dan menampilkan halamannya. Untuk gambar <code>gedung.jpg</code>, browser mengirim request baru lagi." }
  ]
};

const bdJoin = {
  type: "adegan", label: "Adegan", title: "INNER JOIN Memasangkan Baris yang Cocok",
  desc: "Contoh kecil dua tabel sebelum masuk ke contoh perpustakaan di bawah.",
  scene: "bd-join",
  alt: "Kolom prodi di tabel mahasiswa dicocokkan dengan kolom kode di tabel prodi. Ani dan Budi punya pasangan, Dodi (MI) dan prodi TE tidak. Hasil INNER JOIN hanya berisi dua baris yang cocok.",
  code: "SELECT m.nama, p.nama\nFROM mahasiswa m\nINNER JOIN prodi p ON m.prodi = p.kode;",
  marks: [{ sorot: "1", t: "ON m.prodi = p.kode" }],
  steps: [
    { sorot: "1", html: "JOIN dijalankan dengan syarat <code>m.prodi = p.kode</code>." },
    { sorot: "2", html: "Setiap baris mahasiswa dicari pasangannya: TI ketemu TI, SI ketemu SI." },
    { sorot: "3", html: "Baris tanpa pasangan dibuang: Dodi (MI tidak ada di tabel prodi) dan prodi TE (tidak punya mahasiswa)." },
    { sorot: "4", html: "Hasilnya hanya baris yang cocok, dengan kolom dari kedua tabel. Kalau Dodi tetap ingin tampil, pakai <code>LEFT JOIN</code>." }
  ]
};

const alpLoop = {
  type: "adegan", label: "Adegan", title: "for Berjalan Satu Putaran demi Satu Putaran",
  desc: "Bagian kode yang sedang dijalankan ikut diberi stabilo.",
  scene: "alp-loop",
  alt: "Perulangan for (int i = 1; i <= 3; i++): i mulai dari 1, kondisi i <= 3 dicek, nilai i dicetak, lalu i ditambah satu. Saat i bernilai 4 kondisi false dan perulangan berhenti. Layar berisi 1 2 3.",
  code: "for (int i = 1; i <= 3; i++) {\n    cout << i << \" \";\n}",
  marks: [{ sorot: "init", t: "int i = 1" }, { sorot: "cek", t: "i <= 3" }, { sorot: "tambah", t: "i++" }, { sorot: "badan", t: "cout << i << \" \";" }],
  steps: [
    { sorot: "init", html: "Inisialisasi <code>int i = 1</code>, dijalankan sekali saja di awal." },
    { sorot: "cek", html: "Kondisi <code>i &lt;= 3</code> dicek sebelum setiap putaran. Kalau <code>true</code>, badan loop dijalankan." },
    { sorot: "badan", html: "Badan loop <code>cout &lt;&lt; i</code> mencetak nilai i saat ini." },
    { sorot: "tambah", html: "Update <code>i++</code> menambah i satu, lalu kembali ke pengecekan." },
    { sorot: "selesai", html: "Saat i bernilai 4, kondisi <code>false</code> dan loop berhenti. Badan dijalankan 3 kali, layar berisi <code>1 2 3</code>." }
  ]
};

const alpDoWhile = {
  type: "adegan", label: "Adegan", title: "while vs do-while Saat Kondisi Langsung false",
  desc: "Kode yang sama dengan n = 0. Kiri jalur while, kanan jalur do-while.",
  scene: "alp-dowhile",
  alt: "Dengan n = 0, while mengecek kondisi dulu dan hasilnya false, jadi badan loop tidak pernah dijalankan. do-while menjalankan badan dulu sehingga 0 tercetak dan n menjadi -1, baru kemudian kondisi dicek dan hasilnya false. Badan while 0 kali, badan do-while 1 kali.",
  code: "int n = 0;\n\nwhile (n > 0) {      // dicek dulu\n    cout << n;\n    n--;\n}\n\ndo {                 // dijalankan dulu\n    cout << n;\n    n--;\n} while (n > 0);   // dicek belakangan",
  marks: [{ sorot: "1", t: "int n = 0;" }, { sorot: "2", t: "while (n > 0) {" }, { sorot: "3", t: "do {" }, { sorot: "4", t: "} while (n > 0);" }],
  steps: [
    { sorot: "1", html: "Kedua kode mulai dengan <code>n = 0</code>." },
    { sorot: "2", html: "<code>while</code> mengecek kondisi <strong>dulu</strong>: <code>0 &gt; 0</code> false, jadi badan dilewati. Tidak ada yang dicetak." },
    { sorot: "3", html: "<code>do-while</code> menjalankan badan <strong>dulu</strong> tanpa mengecek apa pun: <code>0</code> dicetak, lalu n menjadi -1." },
    { sorot: "4", html: "Baru setelah itu kondisinya dicek: <code>-1 &gt; 0</code> false, perulangan berhenti." },
    { sorot: "5", html: "Badan <code>while</code> dijalankan 0 kali, badan <code>do-while</code> minimal 1 kali. Perhatikan titik koma setelah <code>} while (n &gt; 0);</code>." }
  ]
};

const bdNormal = {
  type: "adegan", label: "Adegan", title: "Normalisasi Memindah Keterangan ke Tabelnya Sendiri",
  desc: "Versi kecil dari tabel peminjaman: hanya kolom judul yang dipindah.",
  scene: "bd-normal",
  alt: "Pada tabel peminjaman judul Basis Data ditulis dua kali. Kolom judul dipindah ke tabel buku bersama id_buku, salinan ganda BK2 digabung menjadi satu baris, dan tabel peminjaman cukup menyimpan id_buku sebagai kunci tamu yang menunjuk ke tabel buku.",
  steps: [
    { sorot: "1", html: "<strong>Redundansi</strong>: judul <em>Basis Data</em> ditulis dua kali karena BK2 dipinjam dua kali." },
    { sorot: "2", html: "Keterangan buku (judul) dipindah ke tabel sendiri, <code>buku</code>, bersama penentunya <code>id_buku</code>." },
    { sorot: "3", html: "Salinan ganda dibuang: di tabel buku, BK2 cukup <strong>satu baris</strong>." },
    { sorot: "4", html: "Tabel peminjaman tinggal menyimpan <code>id_buku</code> sebagai <strong>kunci tamu</strong> (*) yang menunjuk ke tabel buku. Kalau judul perlu diperbaiki, cukup di satu tempat." }
  ]
};

const pwdDom = {
  type: "adegan", label: "Adegan", title: "Klik Tombol, Teks di Halaman Berubah",
  desc: "Urutan kerja JavaScript saat tombol diklik, tanpa memuat ulang halaman.",
  scene: "pwd-dom",
  alt: "Tombol Ubah diklik. Event click menjalankan fungsi di script.js. document.getElementById(\"judul\") menemukan elemen h1, lalu innerText-nya diganti sehingga tulisan Halo berubah menjadi Selamat datang.",
  code: '<h1 id="judul">Halo</h1>\n<button id="ubah">Ubah</button>\n\n<script>\nconst btn = document.getElementById("ubah");\nbtn.addEventListener("click", () => {\n  const h = document.getElementById("judul");\n  h.innerText = "Selamat datang";\n});\n</script>',
  marks: [{ sorot: "1", t: '<button id="ubah">Ubah</button>' }, { sorot: "2", t: 'btn.addEventListener("click", () => {' }, { sorot: "3", t: 'document.getElementById("judul")' }, { sorot: "4", t: 'h.innerText = "Selamat datang";' }],
  steps: [
    { sorot: "1", html: "Tombol <strong>Ubah</strong> diklik. Browser membuat event <code>click</code> pada tombol itu." },
    { sorot: "2", html: "<code>addEventListener(\"click\", …)</code> sudah memasang fungsi pada tombol, jadi fungsi itu dijalankan." },
    { sorot: "3", html: "<code>document.getElementById(\"judul\")</code> mencari elemen yang <code>id</code>-nya <code>judul</code>, yaitu <code>&lt;h1&gt;</code>." },
    { sorot: "4", html: "<code>innerText</code> elemen itu diganti. Tulisan di layar langsung berubah tanpa memuat ulang halaman." }
  ]
};

module.exports = { pwdRequest, pwdPesanHttp, bdJoin, alpLoop, alpDoWhile, bdNormal, pwdDom };
