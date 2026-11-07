// Mencetak semua URL di sumber/referensi.js (satu per baris) untuk dicek oleh lychee
const refs = require('../../sumber/referensi.js');
const urls = new Set(Object.values(refs).flat().map(r => r.url).filter(Boolean));
process.stdout.write([...urls].sort().join('\n') + '\n');
