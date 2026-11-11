# Aplikasi Belajar Interaktif

Aplikasi belajar Semester 1 (PJJ Sistem Informasi, Universitas Siber Muhammadiyah).

- Aplikasi: https://sinau-ten.vercel.app/ (versi Astro, folder `web/`, diterbitkan Vercel).
- Materi: `sumber/` (`data_*.js`, `materi_*.js`, digabung oleh `sumber/build.js`).
- **Deploy otomatis:** setiap push ke `main` → Vercel membangun dan menerbitkan `web/`. GitHub Actions (`.github/workflows/cek.yml`) membangun dan mengetes setiap PR dan push. Tidak perlu lagi menyalin hasil build ke `index.html`.
- Cek lokal: `cd web && npm install && npm run build` (hasil di `web/dist/`), atau `npm run dev`.
- Progres belajar tersimpan per orang di browser (localStorage `belajar:progress:v1`), bisa diekspor/impor lewat tombol **Progresku**.
- `index.html` di root = versi satu file lama, disimpan hanya sebagai cadangan (lihat "Kembali ke versi lama" di `web/README.md`). Tidak perlu diperbarui lagi.
