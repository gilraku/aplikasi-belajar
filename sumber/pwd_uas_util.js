// Alat bersama untuk data PWD P9–P13 (menuju UAS).
// fix(): teks di dalam <code>…</code> di-escape otomatis, kecuali kunci kode mentah (RAW).
const RAW = new Set(["code", "starter", "solution", "cmd", "res", "regex", "sel", "ringkasan", "seed", "sql", "msg"]);
const escCode = s => s.replace(/<code>([\s\S]*?)<\/code>/g, (m, c) => "<code>" + c.replace(/&(?![a-z]+;|#\d+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</code>");
const fix = (o, k) => typeof o === "string" ? (RAW.has(k) ? o : escCode(o)) : Array.isArray(o) ? o.map(x => fix(x, k)) : o && typeof o === "object" ? Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, fix(v, kk)])) : o;

// CSS dan kerangka halaman dari modul (header, nav, footer "Sistem Manajemen Mahasiswa")
const CSS = `        body { font-family: Arial, sans-serif; margin: 2rem; background-color: #f4f4f4; box-sizing: border-box; }
        header { background-color: #005566; color: white; padding: 1rem; text-align: center; }
        nav ul { list-style-type: none; padding: 0; display: flex; justify-content: center; }
        nav ul li { margin: 0 1rem; }
        nav ul li a { text-decoration: none; color: #333; }
        .container { max-width: 800px; margin: 2rem auto; }
        form { background-color: white; padding: 1.5rem; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        label { display: block; margin-bottom: 0.5rem; }
        input, select { width: 100%; padding: 0.8rem; margin-bottom: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        .error { color: red; font-size: 0.9rem; display: block; margin-bottom: 1rem; }
        button { background-color: #4CAF50; color: white; padding: 0.8rem; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.5rem; }
        button:hover { background-color: #45a049; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { border: 1px solid #ccc; padding: 0.8rem; text-align: left; }
        th { background-color: #f0f0f0; }
        footer { text-align: center; margin-top: 2rem; color: #666; }`;

const HEAD = t => `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t}</title>
    <!-- Di laptop: <style> ini = file .css terpisah -->
    <style>
${CSS}
    </style>
</head>
<body>
    <header>
        <h1>Sistem Manajemen Mahasiswa</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Beranda</a></li>
            <li><a href="#pendaftaran">Pendaftaran</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>`;

const FOOT = `    <footer>
        <p>&copy; 2025 Universitas Contoh</p>
    </footer>`;

module.exports = { fix, CSS, HEAD, FOOT };
