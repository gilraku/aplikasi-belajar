# Versi Astro (situs utama)

Aplikasi belajar yang dibangun dengan [Astro](https://astro.build). Materinya diambil dari `../sumber/` lewat `build.js`, jadi cara menambah materi **tidak berubah**.

- Diterbitkan otomatis oleh `.github/workflows/astro-pages.yml` setiap ada push ke `main` → https://gilraku.github.io/aplikasi-belajar/
- Alamat lama `/beta/` dialihkan ke alamat utama.
- Bisa juga diterbitkan di **Vercel** (alamat `https://<nama-proyek>.vercel.app/`). Pengaturannya ada di `vercel.json` di akar repo; saat build di Vercel, base otomatis jadi `/` dan alamat situs mengikuti domain Vercel. Lihat bagian [Deploy ke Vercel](#deploy-ke-vercel).
- Progres memakai kunci localStorage yang sama dengan versi lama (`belajar:progress:v1`), jadi progres yang sudah ada tetap terbaca.

## Bedanya dengan versi satu file

| | Versi satu file lama (`index.html`) | Versi Astro |
|---|---|---|
| Dibuka pertama kali | ±2,4 MB sekaligus | ±170 KB (halaman + mesin + CSS) |
| Buka satu pertemuan | sudah termuat | ±20–95 KB per pertemuan (`data/<matkul>/<pertemuan>.json`), pertemuan berikutnya disiapkan di belakang layar |
| Mesin aplikasi | tertanam di HTML | `app-<hash>.js` diperkecil, di-cache browser |
| Unduh .html mandiri | dari halaman itu sendiri | dari `offline.html` (hasil `build.js` yang sama) |

## Cara membangun (lokal)

```bash
cd web
npm install        # sekali saja
npm run build      # hasil di web/dist/ (untuk dicek, tidak perlu di-commit)
npm run dev        # server lokal di http://localhost:4321/aplikasi-belajar/
```

Untuk menerbitkan materi baru cukup push perubahan `sumber/` ke `main`.

Kalau versi Playwright tidak cocok dengan browser yang terpasang, jalankan tes dengan `PW_CHROMIUM=/path/ke/chrome npm test`.

## Referensi & bacaan lanjut

`sumber/referensi.js` berisi link bacaan per pertemuan (kunci `"<id-matkul>/<id-pertemuan>"`). Tampil sebagai bagian **📚 Referensi** di akhir tab Materi, dan sebagai **📚 Baca juga** di bawah bagian yang judulnya memuat teks `bagian`. Build gagal kalau url bukan `https://`, `bagian` tidak cocok dengan judul mana pun, atau kuncinya salah ketik. Workflow `.github/workflows/cek-link.yml` (lychee) mengecek semua link setiap Senin dan setiap kali file itu diubah.

## Pasang sebagai aplikasi (PWA)

- `src/pages/manifest.webmanifest.js` + ikon di `public/icons/` (`icon.svg` adalah sumbernya).
- `src/pages/sw.js.js` membuat service worker yang menyimpan halaman, mesin, CSS, dan **semua** data pertemuan (±2,3 MB, ±550 KB terkompresi), jadi aplikasi bisa dibuka tanpa internet. Halaman utama diambil dari jaringan dulu (materi terbaru), sisanya dari simpanan. Versi service worker ikut berubah setiap mesin/data/CSS berubah, dan cache lama dibuang otomatis.
- Tombol **Pasang Aplikasi** ada di menu Bagikan / Unduh (Android/Chrome/Edge); di iPhone ada petunjuk "Tambah ke Layar Utama".

## Pengaman sebelum terbit

Workflow `.github/workflows/astro-pages.yml` (di setiap PR dan push ke `main`):

1. `npm audit --audit-level=high`: gagal kalau ada paket dengan kerentanan tingkat tinggi.
2. `npm run build`: sekaligus **validasi data** (`src/lib/validate.mjs`, Zod). Contoh pesan: `AIK › P4 › quiz[4].ans: ans = 7, padahal opsinya hanya 4`. Dicek: referensi (`https://`, `bagian` cocok), kunci jawaban di dalam jumlah opsi, `optExp` sepanjang `opts`, opsi kembar, flashcard kosong, jenis blok dikenal, jawaban latihan ada di pilihannya, id pertemuan/matkul unik.
3. `npm test` (`tests/smoke.mjs`, Playwright): membuka semua tab semua pertemuan, menjawab kuis, mengecek Back browser, progres tersimpan, referensi tampil, aplikasi terbuka saat offline (service worker), dan pengalihan `/beta/`.

Kalau salah satu gagal, situs **tidak** diterbitkan (versi sebelumnya tetap tayang). Dependabot (`.github/dependabot.yml`) membuka PR otomatis untuk update paket.

## Struktur

- `src/lib/library.mjs`: memanggil `sumber/build.js`, membuat indeks ringan + data per pertemuan.
- `src/scripts/engine.js`: mesin aplikasi, salinan `sumber/engine.html` dengan perubahan kecil (muat data per pertemuan, % kesiapan dari ringkasan, unduh lewat `offline.html`). Ini mesin yang dipakai situs. `sumber/engine.html` hanya dipakai untuk `offline.html` (unduh .html mandiri) dan cadangan `index.html`.
- `src/pages/index.astro`: halaman utama. `src/pages/data/[course]/[meeting].json.js`: data per pertemuan. `src/pages/offline.html.js`: aplikasi satu file.
- `src/styles/global.css` + `tailwind.config.cjs`: Tailwind 3, dikompilasi otomatis oleh Astro.

## Kembali ke versi lama (darurat)

Settings → Pages → Source: **Deploy from a branch** (`main`, `/ (root)`). Situs langsung memakai `index.html` satu file lagi. Kembalikan ke **GitHub Actions** untuk memakai versi Astro.

## Deploy ke Vercel

Kode yang sama jalan di GitHub Pages (`/aplikasi-belajar/`) dan Vercel (`/`). `astro.config.mjs` membaca variabel `VERCEL` yang diisi Vercel saat build; `ASTRO_BASE` dan `ASTRO_SITE` bisa dipakai untuk memaksa nilai lain (misalnya domain sendiri).

1. Masuk ke https://vercel.com dengan akun GitHub → **Add New… → Project** → pilih repo `aplikasi-belajar` → **Import**.
2. Isi **Project Name** (misalnya `sinau`, jadi alamatnya `sinau.vercel.app`). **Root Directory biarkan `./`** dan jangan ubah Build Settings: semuanya diambil dari `vercel.json`.
3. Klik **Deploy**. Setiap push ke `main` diterbitkan ulang otomatis, dan setiap PR dapat link pratinjau.
4. Domain sendiri (opsional): **Project → Settings → Domains → Add**, lalu ikuti petunjuk DNS-nya.

Progres tersimpan per alamat situs (localStorage), jadi ekspor dulu lewat **Progresku** di alamat lama lalu impor di alamat baru.

Cek lokal versi Vercel: `ASTRO_BASE=/ ASTRO_OUT=dist-root npm run build && ASTRO_BASE=/ ASTRO_OUT=dist-root npm test`.

