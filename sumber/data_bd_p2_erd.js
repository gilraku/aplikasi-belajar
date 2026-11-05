// Tambahan P2 Basis Data dari slide "P3 ERD" yang dibagikan di folder Pertemuan 2
module.exports = {
  flashcards: [
    { tag: "ERD", q: "Apa itu Model Entity Relationship (ERD)?", a: "Penyajian data dengan <strong>entity</strong> dan <strong>relationship</strong>; model konseptual berbasis grafis untuk menggambarkan struktur logis basis data." },
    { tag: "ERD", q: "Dua alasan memakai model E-R?", a: "1) Mudah dimengerti oleh pemakai. 2) Mudah disajikan oleh perancang database." },
    { tag: "ERD", q: "Simbol entity, relationship, dan atribut?", a: "Entity = <strong>persegi panjang</strong>, relationship = <strong>belah ketupat</strong>, atribut = <strong>oval</strong>." },
    { tag: "ERD", q: "Simbol atribut multi-value dan atribut turunan?", a: "Multi-value = oval <strong>bergaris ganda</strong> (NO_HP). Turunan = oval <strong>garis putus-putus</strong> (UMUR dari TGL_LAHIR)." },
    { tag: "ERD", q: "Contoh atribut komposit di slide?", a: "ALAMAT pada MAHASISWA, dapat dibagi menjadi NEGARA, KOTA, PROVINSI." }
  ],
  quiz: [
    { q: "Dalam ERD, simbol belah ketupat (diamond) menggambarkan…", opts: ["Entity", "Atribut", "Relationship", "Atribut key"], ans: 2, exp: "Entity = persegi panjang, atribut = oval, relationship = belah ketupat." },
    { q: "Atribut UMUR yang dihitung dari TGL_LAHIR termasuk atribut…", opts: ["Komposit", "Turunan", "Multi-valued", "Key"], ans: 1, exp: "Atribut turunan diperoleh dari pengolahan atribut lain; digambar oval garis putus-putus." },
    { q: "Atribut NO_HP pada MAHASISWA yang bisa berisi lebih dari satu nomor digambarkan dengan…", opts: ["Oval bergaris ganda", "Oval garis putus-putus", "Persegi panjang", "Oval dengan garis bawah"], ans: 0, exp: "Multi-valued attribute = oval bergaris ganda." },
    { q: "Atribut ALAMAT yang dapat dibagi menjadi KOTA, PROVINSI, dan NEGARA disebut atribut…", opts: ["Simple", "Single-valued", "Turunan", "Komposit"], ans: 3, exp: "Komposit = dapat dibagi lagi menjadi beberapa bagian." },
    { q: "Atribut yang digunakan untuk menentukan suatu entity secara unik disebut…", opts: ["Key", "Atribut simple", "Atribut turunan", "Relationship"], ans: 0, exp: "Atribut key, misalnya NIM; nanti menjadi kunci primer." },
    { q: "Berikut alasan memakai model E-R menurut slide, yaitu…", opts: ["Menggantikan DBMS", "Mudah dimengerti pemakai dan mudah disajikan perancang database", "Mempercepat koneksi internet", "Agar tidak perlu membuat tabel"], ans: 1, exp: "Dua alasan di slide: mudah dimengerti oleh pemakai, mudah disajikan oleh perancang database." }
  ]
};
