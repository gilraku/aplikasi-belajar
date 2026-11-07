const fs=require('fs');
// Sebar posisi jawaban benar (A-D) supaya tidak menumpuk di satu huruf
const spread=(m,seed)=>{const pat=[2,0,3,1,1,3,0,2,3,0];m.quiz.forEach((q,i)=>{const t=q.opts.length===5?[2,4,0,3,1,4,1,0,3,2][(i+seed)%10]:pat[(i+seed)%pat.length]%q.opts.length;const a=q.ans;if(t===a)return;[q.opts[a],q.opts[t]]=[q.opts[t],q.opts[a]];if(q.optExp)[q.optExp[a],q.optExp[t]]=[q.optExp[t],q.optExp[a]];q.ans=t;});return m;};
const BD=require('./data_bd_p2.js');BD.meetings.unshift(spread(require('./data_bd_p1.js'),2));{const E=require('./data_bd_p2_erd.js'),m2=BD.meetings.find(m=>m.id==='p2');m2.flashcards.push(...E.flashcards);m2.quiz.push(...E.quiz);spread(m2,6);}BD.meetings.push(spread(require('./data_bd_p3.js'),4));BD.meetings.push(spread(require('./data_bd_p4.js'),7));[['p5',1],['p6',5],['p7',8],['p8',3]].forEach(([p,s])=>BD.meetings.push(spread(require('./data_bd_'+p+'.js'),s)));
require('./data_bindo_tutor.js');
const lib=[BD, {
  id: 'bahasa-indonesia', nama: 'Bahasa Indonesia', prodi: 'PJJ Sistem Informasi', kampus: 'Universitas Siber Muhammadiyah', dosen: 'Tri Wahyono, M.Pd.',
  meetings: [spread(require('./data_bindo_p1.js'),0), spread(require('./data_bindo_p2.js'),3), spread(require('./data_bindo_p3.js'),6), spread(require('./data_bindo_p4.js'),9), spread(require('./data_bindo_p5.js'),2), spread(require('./data_bindo_p6.js'),5), spread(require('./data_bindo_p7.js'),8), spread(require('./data_bindo_p8.js'),1)]
}, {
  id: 'aik', nama: 'AIK (Al-Islam & Kemuhammadiyahan)', prodi: 'PJJ Sistem Informasi', kampus: 'Universitas Siber Muhammadiyah',
  meetings: [spread(require('./data_aik_p1.js'),1), spread(require('./data_aik_p2.js'),4), spread(require('./data_aik_p3.js'),7), spread(require('./data_aik_p4.js'),0), spread(require('./data_aik_p5.js'),5), spread(require('./data_aik_p6.js'),8), spread(require('./data_aik_p7.js'),2), spread(require('./data_aik_p8.js'),3)]
}, {
  id: 'pemrograman-web-dinamis', nama: 'Pemrograman Web Dinamis', prodi: 'PJJ Sistem Informasi', kampus: 'Universitas Siber Muhammadiyah', dosen: 'Wicaksono Yuli Sulistyo, S.Kom., M.Kom., CSA.',
  meetings: [spread(require('./data_pwd_p1.js'),5), spread(require('./data_pwd_p2.js'),8), spread(require('./data_pwd_p3.js'),1), spread(require('./data_pwd_p4.js'),4), spread(require('./data_pwd_p5.js'),7), spread(require('./data_pwd_p6.js'),0), spread(require('./data_pwd_p7.js'),3), spread(require('./data_pwd_p8.js'),6)]
}, {
  id: 'dasar-sistem-informasi', nama: 'Dasar-dasar Sistem Informasi', prodi: 'PJJ Sistem Informasi', kampus: 'Universitas Siber Muhammadiyah', dosen: 'Khairina Eka Setyaputri',
  meetings: [spread(require('./data_dsi_p1.js'),2), spread(require('./data_dsi_p2.js'),5), spread(require('./data_dsi_p3.js'),8), spread(require('./data_dsi_p4.js'),1), spread(require('./data_dsi_p5.js'),4), spread(require('./data_dsi_p6.js'),7), spread(require('./data_dsi_p7.js'),0), spread(require('./data_dsi_p8.js'),3)]
}, {
  id: 'algoritma-pemrograman', nama: 'Algoritma dan Pemrograman', prodi: 'PJJ Sistem Informasi', kampus: 'Universitas Siber Muhammadiyah', dosen: 'Muhamad Rosidin, M.Kom.',
  meetings: [[1,4],[2,7],[3,0],[4,3],[5,6],[6,9],[7,2],[8,5]].map(([n,sd])=>spread(require('./data_alp_p'+n+'.js'),sd))
}, {
  id: 'bahasa-inggris', nama: 'Bahasa Inggris', prodi: 'PJJ Sistem Informasi', kampus: 'Universitas Siber Muhammadiyah', dosen: 'Septia Ayu Pratiwi, M.Pd',
  meetings: [[1,3],[2,6],[3,9],[4,2],[5,5],[6,8],[7,1],[8,4]].map(([n,sd])=>spread(require('./data_bing_p'+n+'.js'),sd))
}];
// 📖 Materi lengkap per pertemuan
const MAT={'dasar-sistem-informasi':require('./materi_dsi.js'),'bahasa-indonesia':require('./materi_bindo.js'),'aik':require('./materi_aik.js'),'pemrograman-web-dinamis':require('./materi_pwd.js'),'sif002-basis-data':require('./materi_bd.js'),'algoritma-pemrograman':require('./materi_alp.js'),'bahasa-inggris':require('./materi_bing.js')};
Object.entries(MAT).forEach(([cid,mm])=>{const c=lib.find(x=>x.id===cid);Object.entries(mm).forEach(([mid,blocks])=>{const m=c.meetings.find(x=>x.id===mid);if(!m)throw new Error('materi '+cid+'/'+mid);m.materi=blocks;});});
// ➕ Materi tambahan di luar modul
const T=require('./tambahan.js');
Object.entries(T).forEach(([key,add])=>{const [cid,mid]=key.split('/');const c=lib.find(x=>x.id===cid);const m=c&&c.meetings.find(x=>x.id===mid);if(!m)throw new Error('tambahan: '+key+' tidak ditemukan');
  m.cheatsheet.push(...(add.cheatsheet||[]));m.flashcards.push(...(add.flashcards||[]));});
const path=require('path'),P=f=>path.join(__dirname,f);
const prompt=fs.readFileSync(P('prompt.txt'),'utf8');
const enc=o=>JSON.stringify(o).replace(/</g,'\\u003c');
// Template HTML mandiri dengan data penuh dan mesin browser yang sama dengan Astro.
const render = ({ library = lib, css, code } = {}) => {
  const web = path.join(__dirname, '../web/src/scripts');
  const script = code ?? ['sql-lab.js', 'playground-assessment.js', 'engine.js'].map(name => fs.readFileSync(path.join(web, name), 'utf8')).join('\n');
  return fs.readFileSync(P('engine.html'), 'utf8')
    .replace(/(\n<script data-app>\n)[\s\S]*(\n<\/script>\n<\/body>)/, (_, before, after) => before + "'use strict';\n" + script.replace(/<\/script/gi, '<\\/script') + after)
    .replace('__TWCSS__', () => css ?? fs.readFileSync(P('tw.css'), 'utf8'))
    .replace('__LIBRARY__', () => enc(library))
    .replace('__PROMPT__', () => enc(prompt))
    .replace('__CONFIG__', () => enc({ semester: 'Semester 1', standalone: true }));
};
module.exports={lib,prompt,render};
if(require.main===module){
const h=render();
fs.writeFileSync('out/aplikasi_belajar_semester_1.html',h);
fs.writeFileSync('out/materi_basis_data_pertemuan_2.json',JSON.stringify(lib[0],null,2));
console.log(h.length);
}
