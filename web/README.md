# Versi Astro (situs utama)

Aplikasi belajar yang dibangun dengan [Astro](https://astro.build). Materinya diambil dari `../sumber/` lewat `build.js`, jadi cara menambah materi **tidak berubah**.

- Diterbitkan otomatis oleh `.github/workflows/astro-pages.yml` setiap ada push ke `main` → https://gilraku.github.io/aplikasi-belajar/
- Alamat lama `/beta/` dialihkan ke alamat utama.
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

## Struktur

- `src/lib/library.mjs`: memanggil `sumber/build.js`, membuat indeks ringan + data per pertemuan.
- `src/scripts/engine.js`: mesin aplikasi, salinan `sumber/engine.html` dengan perubahan kecil (muat data per pertemuan, % kesiapan dari ringkasan, unduh lewat `offline.html`). Ini mesin yang dipakai situs. `sumber/engine.html` hanya dipakai untuk `offline.html` (unduh .html mandiri) dan cadangan `index.html`.
- `src/pages/index.astro`: halaman utama. `src/pages/data/[course]/[meeting].json.js`: data per pertemuan. `src/pages/offline.html.js`: aplikasi satu file.
- `src/styles/global.css` + `tailwind.config.cjs`: Tailwind 3, dikompilasi otomatis oleh Astro.

## Kembali ke versi lama (darurat)

Settings → Pages → Source: **Deploy from a branch** (`main`, `/ (root)`). Situs langsung memakai `index.html` satu file lagi. Kembalikan ke **GitHub Actions** untuk memakai versi Astro.
