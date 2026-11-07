// 📚 Referensi & bacaan lanjut per pertemuan.
// Kunci: "<id-matkul>/<id-pertemuan>". Setiap item: R(judul, url, sumber, bahasa, keterangan, bagian)
//   - url boleh null untuk buku cetak (ditampilkan sebagai kutipan)
//   - bahasa: 'ID' | 'EN' | 'AR'
//   - bagian (opsional): potongan judul bagian di tab Materi Lengkap; link juga muncul sebagai
//     "📚 Baca juga" tepat di bawah bagian itu. Divalidasi saat build (harus cocok dengan judul yang ada).
// Link dicek otomatis oleh workflow "Cek link referensi" (.github/workflows/cek-link.yml).
const R = (judul, url, sumber, bahasa, ket, bagian) => ({ judul, url, sumber, bahasa, ket, ...(bagian ? { bagian } : {}) });

const W3 = 'W3Schools', MDN = 'MDN Web Docs', LCPP = 'LearnCpp.com', CPPREF = 'cppreference.com', WIKI_ID = 'Wikipedia (Indonesia)', WIKI_EN = 'Wikipedia', MYSQL = 'Dokumentasi MySQL';
const QURAN = 'Quran.com (terjemahan bisa diganti ke Bahasa Indonesia)', BC = 'British Council LearnEnglish', CAM = 'Cambridge Dictionary';

module.exports = {
  // ===================== BASIS DATA =====================
  'sif002-basis-data/p1': [
    R('Basis data', 'https://id.wikipedia.org/wiki/Basis_data', WIKI_ID, 'ID', 'Pengertian dan sejarah singkat basis data.', 'Apa Itu Basis Data'),
    R('Sistem manajemen basis data (DBMS)', 'https://id.wikipedia.org/wiki/Sistem_manajemen_basis_data', WIKI_ID, 'ID', 'Fungsi DBMS dan contoh produknya.', 'DBMS: Petugas'),
    R('SQL Introduction', 'https://www.w3schools.com/sql/sql_intro.asp', W3, 'EN', 'Apa itu SQL dan apa saja yang bisa dilakukan. Ada editor untuk langsung mencoba.', 'SQL: Bahasa'),
    R('SQL SELECT Statement', 'https://www.w3schools.com/sql/sql_select.asp', W3, 'EN', 'Perintah SQL pertama yang paling sering dipakai.', 'Membedah Perintah SQL'),
  ],
  'sif002-basis-data/p2': [
    R('Model relasional', 'https://en.wikipedia.org/wiki/Relational_model', WIKI_EN, 'EN', 'Relasi, tupel, atribut: istilah formal di balik tabel.', 'Model Data Relasional'),
    R('SQL PRIMARY KEY', 'https://www.w3schools.com/sql/sql_primarykey.asp', W3, 'EN', 'Cara mendefinisikan kunci primer.', 'Kunci Primer'),
    R('SQL NULL Values', 'https://www.w3schools.com/sql/sql_null_values.asp', W3, 'EN', 'Arti NULL dan cara mengujinya dengan IS NULL.', 'NULL Bukan Nol'),
    R('Data Types (MySQL Reference Manual)', 'https://dev.mysql.com/doc/refman/8.0/en/data-types.html', MYSQL, 'EN', 'Daftar resmi tipe data MySQL.', 'Tipe Data MySQL'),
  ],
  'sif002-basis-data/p3': [
    R('Entity–relationship model', 'https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model', WIKI_EN, 'EN', 'Entitas, atribut, relasi, dan notasi Chen.', 'Tiga Bahan Utama ERD'),
    R('Cardinality (data modeling)', 'https://en.wikipedia.org/wiki/Cardinality_(data_modeling)', WIKI_EN, 'EN', 'One-to-one, one-to-many, many-to-many.', 'Kardinalitas'),
    R('Weak entity', 'https://en.wikipedia.org/wiki/Weak_entity', WIKI_EN, 'EN', 'Kapan sebuah entitas disebut lemah.', 'Entitas Kuat dan Entitas Lemah'),
    R('What is an Entity Relationship Diagram?', 'https://www.lucidchart.com/pages/er-diagrams', 'Lucidchart', 'EN', 'Tutorial ERD bergambar beserta simbol-simbolnya.', 'Lima Langkah Menggambar ERD'),
  ],
  'sif002-basis-data/p4': [
    R('SQL FOREIGN KEY', 'https://www.w3schools.com/sql/sql_foreignkey.asp', W3, 'EN', 'Kunci tamu dan integritas rujukan.', 'Kunci Tamu'),
    R('SQL INSERT INTO', 'https://www.w3schools.com/sql/sql_insert.asp', W3, 'EN', 'Bentuk-bentuk INSERT, bisa dicoba langsung.', 'INSERT'),
    R('SQL WHERE Clause', 'https://www.w3schools.com/sql/sql_where.asp', W3, 'EN', 'Operator di WHERE: =, <>, BETWEEN, LIKE, IN.', 'Operator WHERE'),
    R('SQL UPDATE', 'https://www.w3schools.com/sql/sql_update.asp', W3, 'EN', 'Peringatan penting: UPDATE tanpa WHERE mengubah semua baris.', 'UPDATE dan DELETE'),
    R('SQL DELETE', 'https://www.w3schools.com/sql/sql_delete.asp', W3, 'EN', 'Menghapus baris dengan aman.'),
  ],
  'sif002-basis-data/p5': [
    R('Database normalization', 'https://en.wikipedia.org/wiki/Database_normalization', WIKI_EN, 'EN', 'Contoh bertahap dari tabel belum normal sampai 3NF.', 'Tahapan Normalisasi'),
    R('Functional dependency', 'https://en.wikipedia.org/wiki/Functional_dependency', WIKI_EN, 'EN', 'Dasar teori ketergantungan fungsional.', 'Ketergantungan Fungsional'),
  ],
  'sif002-basis-data/p6': [
    R('MAMP', 'https://www.mamp.info/', 'MAMP', 'EN', 'Situs resmi untuk mengunduh MAMP (Windows & macOS).', 'Mengapa Perlu Server'),
    R('XAMPP', 'https://www.apachefriends.org/', 'Apache Friends', 'EN', 'Alternatif MAMP yang populer di Windows/Linux.'),
    R('Dokumentasi phpMyAdmin', 'https://docs.phpmyadmin.net/en/latest/', 'phpMyAdmin', 'EN', 'Panduan resmi antarmuka phpMyAdmin.', 'phpMyAdmin'),
  ],
  'sif002-basis-data/p7': [
    R('SQL CREATE DATABASE', 'https://www.w3schools.com/sql/sql_create_db.asp', W3, 'EN', 'Membuat basis data baru.', 'DDL: Perintah'),
    R('SQL CREATE TABLE', 'https://www.w3schools.com/sql/sql_create_table.asp', W3, 'EN', 'Sintaks CREATE TABLE dengan contoh.', 'Anatomi CREATE TABLE'),
    R('CREATE TABLE Statement (MySQL)', 'https://dev.mysql.com/doc/refman/8.0/en/create-table.html', MYSQL, 'EN', 'Referensi lengkap untuk yang ingin mendalami.'),
    R('SQL Constraints', 'https://www.w3schools.com/sql/sql_constraints.asp', W3, 'EN', 'NOT NULL, UNIQUE, PRIMARY KEY, DEFAULT, dan lainnya.', 'Tipe Data yang Tepat'),
  ],
  'sif002-basis-data/p8': [
    R('SQL Tutorial (ringkas semua perintah)', 'https://www.w3schools.com/sql/', W3, 'EN', 'Untuk mengulang sintaks SQL dengan cepat sebelum ujian.'),
    R('SQL Quiz', 'https://www.w3schools.com/sql/sql_quiz.asp', W3, 'EN', 'Latihan soal tambahan.'),
    R('Database normalization', 'https://en.wikipedia.org/wiki/Database_normalization', WIKI_EN, 'EN', 'Ulasan cepat normalisasi 1NF–3NF.'),
  ],

  // ===================== BAHASA INDONESIA =====================
  'bahasa-indonesia/p1': [
    R('Bahasa Indonesia', 'https://id.wikipedia.org/wiki/Bahasa_Indonesia', WIKI_ID, 'ID', 'Sejarah, kedudukan, dan perkembangan bahasa Indonesia.', 'Tonggak Sejarah'),
    R('Sumpah Pemuda', 'https://id.wikipedia.org/wiki/Sumpah_Pemuda', WIKI_ID, 'ID', 'Teks dan latar Kongres Pemuda II 1928.', 'Bahasa yang Lahir Sebelum Negaranya'),
    R('Badan Pengembangan dan Pembinaan Bahasa', 'https://badanbahasa.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Lembaga resmi pembina bahasa Indonesia.', 'Kedudukan Bahasa Indonesia'),
  ],
  'bahasa-indonesia/p2': [
    R('Ejaan Bahasa Indonesia yang Disempurnakan (EYD) Edisi V', 'https://ejaan.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Pedoman ejaan resmi terbaru: huruf kapital, tanda baca, singkatan, angka.', 'Apa Itu Ejaan'),
    R('KBBI Daring', 'https://kbbi.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Cek ejaan baku sebuah kata.', 'Singkatan dan Akronim'),
  ],
  'bahasa-indonesia/p3': [
    R('KBBI Daring', 'https://kbbi.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Cek kata baku dan arti kata.', 'Kata Baku'),
    R('Kata serapan dalam bahasa Indonesia', 'https://id.wikipedia.org/wiki/Kata_serapan_dalam_bahasa_Indonesia', WIKI_ID, 'ID', 'Asal-usul dan contoh kata serapan.', 'Kata Serapan'),
    R('EYD Edisi V', 'https://ejaan.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Bagian penulisan kata dan unsur serapan.', 'Imbuhan'),
  ],
  'bahasa-indonesia/p5': [
    R('Kalimat efektif', 'https://id.wikipedia.org/wiki/Kalimat_efektif', WIKI_ID, 'ID', 'Ciri-ciri kalimat efektif.', 'Kalimat Efektif'),
    R('KBBI Daring', 'https://kbbi.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Untuk mengecek kata mubazir dan bentuk baku.', 'Kata Mubazir'),
  ],
  'bahasa-indonesia/p6': [
    R('Klausa', 'https://id.wikipedia.org/wiki/Klausa', WIKI_ID, 'ID', 'Pengertian klausa dan jenis-jenisnya.', 'Klausa: Inti'),
    R('Kalimat majemuk', 'https://id.wikipedia.org/wiki/Kalimat_majemuk', WIKI_ID, 'ID', 'Jenis kalimat majemuk setara dan bertingkat.', 'KMB'),
  ],
  'bahasa-indonesia/p7': [
    R('EYD Edisi V', 'https://ejaan.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Cek ejaan dan tanda baca sebelum mengirim tugas.', 'Orisinalitas'),
    R('KBBI Daring', 'https://kbbi.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Pastikan setiap kata baku.'),
  ],
  'bahasa-indonesia/p8': [
    R('EYD Edisi V', 'https://ejaan.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Ulasan cepat aturan ejaan.'),
    R('KBBI Daring', 'https://kbbi.kemdikbud.go.id/', 'Badan Bahasa', 'ID', 'Cek kata baku.'),
  ],

  // ===================== AIK =====================
  'aik/p1': [
    R('QS. Al-Baqarah 2:30 (manusia sebagai khalifah)', 'https://quran.com/2/30', QURAN, 'AR', 'Ayat dialog malaikat tentang penciptaan khalifah.', 'Kisah Adam'),
    R('QS. Adz-Dzariyat 51:56 (tujuan penciptaan)', 'https://quran.com/51/56', QURAN, 'AR', 'Manusia diciptakan untuk beribadah.', 'Peran sebagai Hamba'),
    R('QS. At-Tin 95:4 (sebaik-baik bentuk)', 'https://quran.com/95/4', QURAN, 'AR', 'Kemuliaan penciptaan manusia.', 'Istilah Manusia'),
  ],
  'aik/p2': [
    R('QS. Ali Imran 3:19 (Islam di sisi Allah)', 'https://quran.com/3/19', QURAN, 'AR', 'Dalil Islam sebagai agama yang diridai.', 'Makna Kata Islam'),
    R('Hadis Jibril: Islam, Iman, Ihsan (HR. Muslim no. 8)', 'https://sunnah.com/muslim:8', 'Sunnah.com', 'AR', 'Teks lengkap hadis Jibril beserta terjemahan Inggris.', 'Hadis Jibril'),
    R('QS. Al-Anbiya 21:107 (rahmatan lil-\'alamin)', 'https://quran.com/21/107', QURAN, 'AR', 'Salah satu dalil karakteristik Islam.', 'Karakteristik'),
    R('Muhammadiyah', 'https://muhammadiyah.or.id/', 'PP Muhammadiyah', 'ID', 'Situs resmi Persyarikatan Muhammadiyah.'),
  ],
  'aik/p3': [
    R('QS. Al-A\'raf 7:172 (persaksian ruh)', 'https://quran.com/7/172', QURAN, 'AR', 'Dalil fitrah bertuhan.', 'Fitrah'),
    R('QS. Ar-Rum 30:30 (fitrah)', 'https://quran.com/30/30', QURAN, 'AR', 'Fitrah manusia condong kepada agama yang lurus.', 'Fitrah'),
    R('Tarjih Muhammadiyah', 'https://tarjih.or.id/', 'Majelis Tarjih dan Tajdid', 'ID', 'Kajian akidah dan fatwa resmi Muhammadiyah.', 'Arti Aqidah'),
  ],
  'aik/p4': [
    R('Hadis Jibril (HR. Muslim no. 8)', 'https://sunnah.com/muslim:8', 'Sunnah.com', 'AR', 'Ulang pokok Islam, Iman, Ihsan.'),
    R('QS. Al-Baqarah 2:30', 'https://quran.com/2/30', QURAN, 'AR', 'Ulang dalil khalifah.'),
  ],
  'aik/p5': [
    R('QS. Al-Ikhlas 112', 'https://quran.com/112', QURAN, 'AR', 'Surah ringkas tentang keesaan Allah.', 'Tauhid: Inti'),
    R('QS. An-Nas 114:1–3', 'https://quran.com/114', QURAN, 'AR', 'Rabb, Malik, Ilah dalam satu surah.', 'an-Nas 1'),
    R('QS. An-Nisa 4:48 (dosa syirik)', 'https://quran.com/4/48', QURAN, 'AR', 'Dalil beratnya dosa syirik.', 'Lawan Tauhid'),
    R('QS. Az-Zumar 39:65 (amal terhapus)', 'https://quran.com/39/65', QURAN, 'AR', 'Syirik menghapus amal.', 'Amal Terhapus'),
  ],
  'aik/p6': [
    R('QS. Muhammad 47:19 (fa\'lam annahu la ilaha illallah)', 'https://quran.com/47/19', QURAN, 'AR', 'Perintah berilmu tentang kalimat tauhid.', 'Dua Kalimat Syahadat'),
    R('QS. Al-Baqarah 2:256 (al-\'urwatul wutsqa)', 'https://quran.com/2/256', QURAN, 'AR', 'Tali yang kokoh bagi yang ingkar kepada thaghut dan beriman kepada Allah.', 'Tali yang Kokoh'),
    R('Syahadat', 'https://id.wikipedia.org/wiki/Syahadat', WIKI_ID, 'ID', 'Lafal dan makna dua kalimat syahadat.'),
  ],
  'aik/p7': [
    R('QS. Al-Kahf 18:110 (syarat amal diterima)', 'https://quran.com/18/110', QURAN, 'AR', 'Amal saleh dan tidak menyekutukan Allah.', 'Dua Saringan'),
    R('Hadis niat (HR. Bukhari no. 1)', 'https://sunnah.com/bukhari:1', 'Sunnah.com', 'AR', '"Innamal a\'malu binniyat", dasar keikhlasan ibadah.', 'Dua Saringan'),
    R('QS. Al-\'Ankabut 29:2 (iman diuji)', 'https://quran.com/29/2', QURAN, 'AR', 'Iman pasti diuji.', 'Iman Diuji'),
    R('Hamka', 'https://id.wikipedia.org/wiki/Hamka', WIKI_ID, 'ID', 'Biografi Prof. Hamka.'),
  ],
  'aik/p8': [
    R('Quran.com', 'https://quran.com/', QURAN, 'AR', 'Cari ayat dari dalil kunci dengan cepat.', 'Dalil Kunci'),
    R('Sunnah.com', 'https://sunnah.com/', 'Sunnah.com', 'AR', 'Cari teks hadis dari dalil kunci.'),
  ],

  // ===================== PEMROGRAMAN WEB DINAMIS =====================
  'pemrograman-web-dinamis/p1': [
    R('An overview of HTTP', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', MDN, 'EN', 'Request–response, header, dan cara browser berbicara dengan server.', 'HTTP: Percakapan'),
    R('HTTP response status codes', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', MDN, 'EN', 'Daftar lengkap kode 1xx–5xx.', 'Kode Status HTTP'),
    R('HTML Tutorial', 'https://www.w3schools.com/html/', W3, 'EN', 'Tutorial HTML dasar dengan editor "Try it Yourself".', 'Dasar HTML'),
    R('HTML elements reference', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element', MDN, 'EN', 'Daftar semua tag HTML beserta fungsinya.', 'Tag Apa yang Tepat'),
  ],
  'pemrograman-web-dinamis/p2': [
    R('HTML Semantic Elements', 'https://www.w3schools.com/html/html5_semantic_elements.asp', W3, 'EN', 'header, nav, section, article, aside, footer.', 'Elemen Semantik'),
    R('HTML Forms', 'https://www.w3schools.com/html/html_forms.asp', W3, 'EN', 'Dasar form, action, method.', 'Form: Pintu Masuk'),
    R('<input>: The Input element', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input', MDN, 'EN', 'Semua type input dan atributnya.', 'Jenis Input HTML5'),
    R('HTML Tables', 'https://www.w3schools.com/html/html_tables.asp', W3, 'EN', 'table, tr, th, td, colspan, rowspan.', 'Tabel HTML'),
  ],
  'pemrograman-web-dinamis/p3': [
    R('How To Add CSS', 'https://www.w3schools.com/css/css_howto.asp', W3, 'EN', 'Inline, internal, external.', 'Tiga Cara Memasang CSS'),
    R('CSS Selectors', 'https://www.w3schools.com/css/css_selectors.asp', W3, 'EN', 'Selector elemen, class, id, grup.', 'Jenis-jenis Selector'),
    R('Specificity', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity', MDN, 'EN', 'Cara browser menentukan aturan mana yang menang.', 'Tangga Prioritas CSS'),
  ],
  'pemrograman-web-dinamis/p4': [
    R('CSS Box Model', 'https://www.w3schools.com/css/css_boxmodel.asp', W3, 'EN', 'content, padding, border, margin.', 'Box Model'),
    R('box-sizing', 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing', MDN, 'EN', 'Beda content-box dan border-box.', 'content-box vs border-box'),
    R('A Complete Guide to Flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', 'CSS-Tricks', 'EN', 'Panduan visual flexbox paling populer.', 'Dua Sumbu Flexbox'),
    R('A Complete Guide to CSS Grid', 'https://css-tricks.com/snippets/css/complete-guide-grid/', 'CSS-Tricks', 'EN', 'Panduan visual CSS Grid.', 'Grid'),
    R('Flexbox Froggy (game)', 'https://flexboxfroggy.com/#id', 'Flexbox Froggy', 'ID', 'Belajar flexbox lewat permainan, tersedia bahasa Indonesia.', 'Pola Flexbox'),
    R('Grid Garden (game)', 'https://cssgridgarden.com/#id', 'Grid Garden', 'ID', 'Belajar CSS Grid lewat permainan.', 'Layout Grid'),
  ],
  'pemrograman-web-dinamis/p5': [
    R('Responsive Web Design – Introduction', 'https://www.w3schools.com/css/css_rwd_intro.asp', W3, 'EN', 'Konsep desain responsif.', 'Apa Itu Desain Responsif'),
    R('Responsive Web Design – The Viewport', 'https://www.w3schools.com/css/css_rwd_viewport.asp', W3, 'EN', 'Kenapa meta viewport wajib.', 'Peta Breakpoint'),
    R('Using media queries', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries', MDN, 'EN', 'Sintaks media query dan contoh breakpoint.', 'Media Query'),
    R('CSS Units', 'https://www.w3schools.com/cssref/css_units.php', W3, 'EN', 'px, %, em, rem, vw, vh.', 'Unit Absolut vs Relatif'),
  ],
  'pemrograman-web-dinamis/p6': [
    R('JavaScript Variables', 'https://www.w3schools.com/js/js_variables.asp', W3, 'EN', 'var, let, const.', 'Variabel dan Tipe Data'),
    R('Grammar and types', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types', MDN, 'EN', 'Tipe data dan deklarasi variabel menurut panduan resmi MDN.', 'Contoh Variabel'),
    R('Loops and iteration', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration', MDN, 'EN', 'for, while, do...while di JavaScript.', 'Percabangan dan Perulangan'),
    R('JavaScript Events', 'https://www.w3schools.com/js/js_events.asp', W3, 'EN', 'onclick, onchange, dan event lain.', 'Alur Sebuah Event'),
  ],
  'pemrograman-web-dinamis/p7': [
    R('Introduction to the DOM', 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction', MDN, 'EN', 'DOM sebagai pohon objek.', 'DOM: Halaman sebagai Pohon'),
    R('Document.querySelector()', 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector', MDN, 'EN', 'Memilih elemen dengan selector CSS.', 'Metode Seleksi'),
    R('JavaScript HTML DOM', 'https://www.w3schools.com/js/js_htmldom.asp', W3, 'EN', 'Mengubah konten, atribut, dan style dengan contoh.', 'Mengubah Konten'),
    R('EventTarget.addEventListener()', 'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener', MDN, 'EN', 'Cara modern memasang event.', 'Mini Aplikasi To-Do'),
  ],
  'pemrograman-web-dinamis/p8': [
    R('HTML Tutorial', 'https://www.w3schools.com/html/', W3, 'EN', 'Ulang HTML.'),
    R('CSS Tutorial', 'https://www.w3schools.com/css/', W3, 'EN', 'Ulang CSS.'),
    R('JavaScript Tutorial', 'https://www.w3schools.com/js/', W3, 'EN', 'Ulang JavaScript dan DOM.'),
  ],

  // ===================== DASAR-DASAR SISTEM INFORMASI =====================
  'dasar-sistem-informasi/p1': [
    R('Sistem', 'https://id.wikipedia.org/wiki/Sistem', WIKI_ID, 'ID', 'Pengertian sistem secara umum.', 'Definisi Sistem'),
    R('Systems theory', 'https://en.wikipedia.org/wiki/Systems_theory', WIKI_EN, 'EN', 'Latar teori sistem.', 'Enam Karakteristik'),
    R('Feedback', 'https://en.wikipedia.org/wiki/Feedback', WIKI_EN, 'EN', 'Umpan balik negatif dan positif.', 'Umpan Balik'),
    R('Jogiyanto H.M., Analisis & Desain Sistem Informasi (Andi Offset)', null, 'Buku', 'ID', 'Rujukan karakteristik dan klasifikasi sistem.', 'Karakteristik Versi Jogiyanto'),
  ],
  'dasar-sistem-informasi/p2': [
    R('Informasi', 'https://id.wikipedia.org/wiki/Informasi', WIKI_ID, 'ID', 'Pengertian informasi.', 'Informasi'),
    R('DIKW pyramid', 'https://en.wikipedia.org/wiki/DIKW_pyramid', WIKI_EN, 'EN', 'Data → Information → Knowledge → Wisdom.', 'Piramida DIKW'),
  ],
  'dasar-sistem-informasi/p3': [
    R('Sistem informasi', 'https://id.wikipedia.org/wiki/Sistem_informasi', WIKI_ID, 'ID', 'Pengertian dan komponen sistem informasi.', 'Definisi Sistem Informasi'),
    R('O\'Brien, J. A. & Marakas, G. M., Management Information Systems (McGraw-Hill)', null, 'Buku', 'EN', 'Sumber kerangka kerja konseptual SI dan tiga peran fundamental SI.', 'Kerangka Kerja Konseptual'),
  ],
  'dasar-sistem-informasi/p4': [
    R('Transaction processing system', 'https://en.wikipedia.org/wiki/Transaction_processing_system', WIKI_EN, 'EN', 'TPS sebagai bagian OSS.', 'Operation Support'),
    R('Management information system', 'https://en.wikipedia.org/wiki/Management_information_system', WIKI_EN, 'EN', 'MIS dalam MSS.', 'Management Support'),
    R('Decision support system', 'https://en.wikipedia.org/wiki/Decision_support_system', WIKI_EN, 'EN', 'Ciri DSS.', 'MIS, DSS, dan EIS'),
    R('Expert system', 'https://en.wikipedia.org/wiki/Expert_system', WIKI_EN, 'EN', 'Sistem pakar.', 'Perbandingan Tujuh'),
  ],
  'dasar-sistem-informasi/p5': [
    R('Information system', 'https://en.wikipedia.org/wiki/Information_system', WIKI_EN, 'EN', 'Komponen dan jenis sistem informasi berbasis komputer.', 'Pengertian CBIS'),
    R('McLeod, R. & Schell, G., Management Information Systems (Pearson)', null, 'Buku', 'EN', 'Sumber model CBIS.', 'Model CBIS'),
  ],
  'dasar-sistem-informasi/p6': [
    R('Teknologi informasi', 'https://id.wikipedia.org/wiki/Teknologi_informasi', WIKI_ID, 'ID', 'Pengertian TI.', 'Apa Itu Teknologi Informasi'),
    R('Mesin Turing', 'https://id.wikipedia.org/wiki/Mesin_Turing', WIKI_ID, 'ID', 'Model komputasi yang menjadi akar komputer modern.', 'Mesin Turing'),
    R('History of computing hardware', 'https://en.wikipedia.org/wiki/History_of_computing_hardware', WIKI_EN, 'EN', 'Generasi komputer dari tabung hampa sampai mikroprosesor.', 'Generasi Komputer'),
    R('Perangkat lunak', 'https://id.wikipedia.org/wiki/Perangkat_lunak', WIKI_ID, 'ID', 'Jenis perangkat lunak.', 'Perangkat Lunak'),
  ],
  'dasar-sistem-informasi/p7': [
    R('Basis data', 'https://id.wikipedia.org/wiki/Basis_data', WIKI_ID, 'ID', 'Pendekatan database untuk mengatasi masalah file tradisional.', 'Pendekatan Database'),
    R('Laudon, K. C. & Laudon, J. P., Management Information Systems (Pearson)', null, 'Buku', 'EN', 'Bab pengelolaan data: hierarki data dan masalah file tradisional.', 'Masalah Pemrosesan File'),
  ],
  'dasar-sistem-informasi/p8': [
    R('Sistem informasi', 'https://id.wikipedia.org/wiki/Sistem_informasi', WIKI_ID, 'ID', 'Ulasan cepat.'),
    R('DIKW pyramid', 'https://en.wikipedia.org/wiki/DIKW_pyramid', WIKI_EN, 'EN', 'Ulang data–informasi–pengetahuan.'),
  ],

  // ===================== ALGORITMA DAN PEMROGRAMAN (C++) =====================
  'algoritma-pemrograman/p1': [
    R('Algoritma', 'https://id.wikipedia.org/wiki/Algoritma', WIKI_ID, 'ID', 'Pengertian dan sejarah algoritma.', 'Apa Itu Algoritma'),
    R('Diagram alir (flowchart)', 'https://id.wikipedia.org/wiki/Diagram_alir', WIKI_ID, 'ID', 'Simbol-simbol flowchart.', 'Flowchart'),
    R('Structured program theorem', 'https://en.wikipedia.org/wiki/Structured_program_theorem', WIKI_EN, 'EN', 'Bukti bahwa urutan, percabangan, dan perulangan sudah cukup.', 'Tiga Struktur Dasar'),
    R('Introduction to the compiler, linker, and libraries', 'https://www.learncpp.com/cpp-tutorial/introduction-to-the-compiler-linker-and-libraries/', LCPP, 'EN', 'Perjalanan kode C++ menjadi program.', 'Perjalanan Kode C++'),
    R('OnlineGDB C++ compiler', 'https://www.onlinegdb.com/online_c++_compiler', 'OnlineGDB', 'EN', 'Coba kode C++ langsung di browser tanpa instalasi.', 'Program C++ Pertamamu'),
  ],
  'algoritma-pemrograman/p2': [
    R('Statements and the structure of a program', 'https://www.learncpp.com/cpp-tutorial/statements-and-the-structure-of-a-program/', LCPP, 'EN', 'Struktur program C++ dan fungsi main.', 'Anatomi Program'),
    R('C++ Variables', 'https://www.w3schools.com/cpp/cpp_variables.asp', W3, 'EN', 'Deklarasi dan inisialisasi variabel.', 'Variabel: Deklarasi'),
    R('Object sizes and the sizeof operator', 'https://www.learncpp.com/cpp-tutorial/object-sizes-and-the-sizeof-operator/', LCPP, 'EN', 'Mengukur ukuran tipe data dengan sizeof.', 'sizeof'),
    R('C++ User Input', 'https://www.w3schools.com/cpp/cpp_user_input.asp', W3, 'EN', 'cin dan cout.', 'Input dan Output'),
    R('Escape sequences', 'https://en.cppreference.com/w/cpp/language/escape', CPPREF, 'EN', 'Daftar lengkap \\n, \\t, \\\\, dan lainnya.', 'Escape Sequence'),
  ],
  'algoritma-pemrograman/p3': [
    R('C++ Operators', 'https://www.w3schools.com/cpp/cpp_operators.asp', W3, 'EN', 'Aritmetika, penugasan, perbandingan, logika.', 'Operator dan Operand'),
    R('Operator precedence and associativity', 'https://www.learncpp.com/cpp-tutorial/operator-precedence-and-associativity/', LCPP, 'EN', 'Tabel prioritas operator dengan penjelasan.', 'Tangga Prioritas'),
    R('Bitwise operators', 'https://www.learncpp.com/cpp-tutorial/bitwise-operators/', LCPP, 'EN', 'AND, OR, XOR, NOT, dan geser bit.', 'Bitwise'),
    R('Increment/decrement operators, and side effects', 'https://www.learncpp.com/cpp-tutorial/increment-decrement-operators-and-side-effects/', LCPP, 'EN', 'Beda prefix dan postfix.', 'Prefix atau Postfix'),
  ],
  'algoritma-pemrograman/p4': [
    R('C++ If ... Else', 'https://www.w3schools.com/cpp/cpp_conditions.asp', W3, 'EN', 'if, else, else if dengan contoh yang bisa dicoba.', 'Bentuk 1: if'),
    R('C++ Else If', 'https://www.w3schools.com/cpp/cpp_conditions_elseif.asp', W3, 'EN', 'Rantai else if.', 'Bentuk 3'),
    R('if statement', 'https://en.cppreference.com/w/cpp/language/if', CPPREF, 'EN', 'Referensi resmi sintaks if.', 'Nested if'),
  ],
  'algoritma-pemrograman/p5': [
    R('C++ Switch', 'https://www.w3schools.com/cpp/cpp_switch.asp', W3, 'EN', 'switch, case, break, default.', 'Apa Itu switch'),
    R('Switch statement basics', 'https://www.learncpp.com/cpp-tutorial/switch-statement-basics/', LCPP, 'EN', 'Dasar switch dengan penjelasan mendalam.', 'break dan default'),
    R('Switch fallthrough and scoping', 'https://www.learncpp.com/cpp-tutorial/switch-fallthrough-and-scoping/', LCPP, 'EN', 'Apa yang terjadi kalau break lupa ditulis.', 'Tebak Keluarannya'),
  ],
  'algoritma-pemrograman/p6': [
    R('C++ For Loop', 'https://www.w3schools.com/cpp/cpp_for_loop.asp', W3, 'EN', 'Sintaks for dengan contoh yang bisa dicoba.', 'Flowchart for'),
    R('For statements', 'https://www.learncpp.com/cpp-tutorial/for-statements/', LCPP, 'EN', 'Penjelasan for yang lebih mendalam, termasuk kesalahan umum.', 'Variasi Penulisan for'),
    R('C++ Nested Loops', 'https://www.w3schools.com/cpp/cpp_for_loop_nested.asp', W3, 'EN', 'Loop di dalam loop.', 'Loop Bersarang'),
  ],
  'algoritma-pemrograman/p7': [
    R('C++ While Loop', 'https://www.w3schools.com/cpp/cpp_while_loop.asp', W3, 'EN', 'Sintaks while.', 'while: Hitung Mundur'),
    R('Introduction to loops and while statements', 'https://www.learncpp.com/cpp-tutorial/introduction-to-loops-and-while-statements/', LCPP, 'EN', 'while dengan penjelasan mendalam.', 'Lima Tahap while'),
    R('Do while statements', 'https://www.learncpp.com/cpp-tutorial/do-while-statements/', LCPP, 'EN', 'Kapan memakai do-while.', 'do-while'),
    R('C++ Break and Continue', 'https://www.w3schools.com/cpp/cpp_break.asp', W3, 'EN', 'Menghentikan atau melompati iterasi.', 'break dan continue'),
  ],
  'algoritma-pemrograman/p8': [
    R('C++ Tutorial', 'https://www.w3schools.com/cpp/', W3, 'EN', 'Ulang semua materi dasar C++.'),
    R('OnlineGDB C++ compiler', 'https://www.onlinegdb.com/online_c++_compiler', 'OnlineGDB', 'EN', 'Uji tabel jejak dengan menjalankan kodenya.', 'Tabel Jejak'),
  ],

  // ===================== BAHASA INGGRIS =====================
  'bahasa-inggris/p1': [
    R('Part of speech', 'https://en.wikipedia.org/wiki/Part_of_speech', WIKI_EN, 'EN', 'Ringkasan delapan kelas kata.', 'Mengapa Belajar Parts of Speech'),
    R('Prepositions of time: at, in, on', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/prepositions-of-time-at-in-on', BC, 'EN', 'Penjelasan dan latihan in–on–at.', 'in – on – at'),
    R('Cambridge Dictionary', 'https://dictionary.cambridge.org/', CAM, 'EN', 'Cek kelas kata dan dengarkan pelafalan.', 'Dengarkan Istilah Kunci'),
  ],
  'bahasa-inggris/p2': [
    R('Present simple: to be', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-be', BC, 'EN', 'am/is/are dengan latihan.', 'to be'),
    R('Cambridge Dictionary', 'https://dictionary.cambridge.org/', CAM, 'EN', 'Pelafalan nama negara dan kebangsaan.', 'Negara & Kebangsaan'),
  ],
  'bahasa-inggris/p3': [
    R('Present simple', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple', BC, 'EN', 'Penjelasan dan latihan present simple.', 'Present Simple: Bentuk'),
  ],
  'bahasa-inggris/p4': [
    R('Present simple', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple', BC, 'EN', 'Ulang present simple.'),
    R('A1–A2 grammar', 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar', BC, 'EN', 'Latihan tambahan.'),
  ],
  'bahasa-inggris/p5': [
    R('Present simple', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple', BC, 'EN', 'Bagian he/she/it dan does.', '-s yang Berpindah'),
    R('English plurals (pengucapan -s)', 'https://en.wikipedia.org/wiki/English_plurals', WIKI_EN, 'EN', 'Aturan bunyi /s/, /z/, /ɪz/.', 'Akhiran -s'),
  ],
  'bahasa-inggris/p6': [
    R('Articles: a, an, the', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/articles-a-an-the', BC, 'EN', 'Kapan memakai a, an, the.', 'Articles'),
  ],
  'bahasa-inggris/p7': [
    R('Nouns: countable and uncountable', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/nouns-countable-uncountable', BC, 'EN', 'Countable dan uncountable dengan latihan.', 'Satu Pertanyaan'),
    R('Quantifiers: some and any', 'https://dictionary.cambridge.org/grammar/british-grammar/some-and-any', CAM, 'EN', 'Aturan some dan any.', 'some/any'),
  ],
  'bahasa-inggris/p8': [
    R('A1–A2 grammar', 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar', BC, 'EN', 'Ulang semua grammar dasar.'),
    R('Cambridge Dictionary', 'https://dictionary.cambridge.org/', CAM, 'EN', 'Cek arti dan pelafalan kata.'),
  ],
};
