// Materi Lengkap Bahasa Inggris
module.exports = Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8].map(n => ['p' + n, require('./materi_bing_p' + n + '.js')]));
