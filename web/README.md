# Versi Astro (uji coba)

Versi baru aplikasi belajar yang dibangun dengan [Astro](https://astro.build). Materinya tetap diambil dari `../sumber/` lewat `build.js`, jadi cara menambah materi **tidak berubah**.

- Situs utama (`../index.html`) **tidak disentuh**. Versi Astro diterbitkan ke folder `../beta/` → https://gilraku.github.io/aplikasi-belajar/beta/
- Progres memakai kunci localStorage yang sama (`belajar:progress:v1`), jadi progres di situs utama ikut terbaca di versi beta, dan sebaliknya.

## Bedanya dengan versi satu file

| | Versi satu file (`index.html`) | Versi Astro (`beta/`) |
|---|---|---|
| Dibuka pertama kali | ±2,4 MB sekaligus | ±170 KB (halaman + mesin + CSS) |
| Buka satu pertemuan | sudah termuat | ±20–95 KB per pertemuan (`data/<matkul>/<pertemuan>.json`), pertemuan berikutnya disiapkan di belakang layar |
| Mesin aplikasi | tertanam di HTML | `app-<hash>.js` diperkecil, di-cache browser |
| Unduh .html mandiri | dari halaman itu sendiri | dari `offline.html` (hasil `build.js` yang sama) |

## Cara membangun

```bash
cd web
npm install        # sekali saja
npm run build      # menulis ulang ../beta/
```

Jalankan `npm run build` setiap kali materi di `sumber/` berubah, lalu commit folder `beta/`.

## Struktur

- `src/lib/library.mjs`: memanggil `sumber/build.js`, membuat indeks ringan + data per pertemuan.
- `src/scripts/engine.js`: mesin aplikasi, salinan `sumber/engine.html` dengan perubahan kecil (muat data per pertemuan, % kesiapan dari ringkasan, unduh lewat `offline.html`). **Selama masa uji, perubahan pada `sumber/engine.html` juga perlu disalin ke sini.**
- `src/pages/index.astro`: halaman utama. `src/pages/data/[course]/[meeting].json.js`: data per pertemuan. `src/pages/offline.html.js`: aplikasi satu file.
- `src/styles/global.css` + `tailwind.config.cjs`: Tailwind 3, dikompilasi otomatis oleh Astro.

## Pindah penuh ke Astro (nanti, setelah UTS)

1. Settings → Pages → Source: **GitHub Actions**.
2. Tab Actions → **Deploy Astro ke GitHub Pages (manual)** → Run workflow. Workflow membangun dengan `ASTRO_BASE=/aplikasi-belajar/`, jadi versi Astro menggantikan alamat utama.
3. Kalau ada masalah: kembalikan Source ke "Deploy from a branch" (main, root), situs satu file langsung aktif lagi.
