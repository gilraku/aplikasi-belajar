// Memastikan setiap file tes di tests/ ikut dijalankan oleh salah satu skrip test:* (dan dengan begitu oleh CI).
import fs from 'node:fs';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const dipakai = Object.entries(pkg.scripts).filter(([k]) => k.startsWith('test:')).map(([, v]) => v).join(' ');
const hilang = fs.readdirSync('tests').filter(f => f.endsWith('.mjs') && !dipakai.includes(`tests/${f}`));
if (hilang.length) { console.error(`Tes belum masuk skrip test:* di package.json: ${hilang.join(', ')}`); process.exit(1); }
console.log('semua-terdaftar: semua file tes dijalankan');
