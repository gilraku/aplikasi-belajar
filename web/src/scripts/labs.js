// Lab interaktif tahap 3: DSI (5K), Bahasa Indonesia (imbuhan, kalimat efektif), Bahasa Inggris (kalimat, jam, rute).
// Isi (data tabel, kalimat, rute) ada di sumber/; di sini hanya aturan dan tampilannya.
// Semua blok memakai pola yang sama dengan blok lain: init → render → on (aksi tombol lewat data-act).

const labBtn = (n, action, arg, label, on, extra = '') => `<button ${act(n, action, arg)} aria-pressed="${!!on}" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border-[1.5px] transition ${on ? 'border-ink bg-ink text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-ink'} ${extra}">${label}</button>`;
const labCap = t => `<div class="text-xs font-bold uppercase tracking-wider text-slate-500">${t}</div>`;
const labNum = x => (Math.round(x * 10) / 10).toFixed(1).replace('.', ',');

function labSpeak(text, lang = 'en-US', slow = false) {
  const syn = window.speechSynthesis;
  if (!syn || typeof SpeechSynthesisUtterance === 'undefined') { showToast('Browser ini belum mendukung suara. Coba Chrome/Edge/Safari terbaru.', 'warning'); return; }
  try {
    syn.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/<[^>]+>/g, ''));
    u.lang = lang; u.rate = slow ? 0.65 : 0.95;
    const v = syn.getVoices().find(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith(lang.toLowerCase())) || syn.getVoices().find(v => /^en/i.test(v.lang || ''));
    if (v) u.voice = v;
    syn.speak(u);
  } catch (e) { showToast('Suara gagal diputar di browser ini.', 'warning'); }
}

// Bagian blok yang diperbarui saat mengetik, tanpa menggambar ulang kotak isian (supaya kursor tidak hilang)
document.addEventListener('input', e => {
  const el = e.target.closest && e.target.closest('[data-live]'); if (!el) return;
  const n = +el.dataset.live, b = BLOCKS[n]; if (!b || !b.r.live) return;
  b.state.values[el.dataset.key] = el.value;
  const out = document.getElementById('lab-live-' + n); if (out) out.innerHTML = b.r.live(b.def, b.state, n);
  const out2 = document.getElementById('lab-live2-' + n); if (out2 && b.r.live2) out2.innerHTML = b.r.live2(b.def, b.state, n);
  markInteract(n);
});

// ---------------------------------------------------------------------
//  DSI P2: data mentah → informasi lewat 5K
// ---------------------------------------------------------------------
const LAB_5K_STEPS = [['kondensasi', 'Kondensasi'], ['koreksi', 'Koreksi'], ['kalkulasi', 'Kalkulasi'], ['kategorisasi', 'Kategorisasi'], ['konteks', 'Kontekstualisasi']];
function lab5kData(d, s) {
  const w = d.weights || {};
  const rows = (d.rows || []).map((r, i) => {
    const fix = (d.fixes || []).filter(f => f.row === i);
    const v = Object.assign({}, r);
    if (s.on.koreksi) fix.forEach(f => { v[f.col] = f.to; });
    v._fix = fix; v._i = i; v._dup = (d.dupes || []).includes(i);
    v._akhir = Object.entries(w).reduce((t, [k, p]) => t + Number(v[k]) * p, 0);
    return v;
  });
  const used = rows.filter(r => !(s.on.koreksi && r._dup));
  const avg = used.length ? used.reduce((t, r) => t + r._akhir, 0) / used.length : 0;
  return { rows, used, avg };
}
const LAB_5K = {
  init: () => ({ on: {}, ctx: '' }),
  render(d, s, n) {
    const { rows, used, avg } = lab5kData(d, s);
    const cols = (d.cols || []).filter(c => !(s.on.kondensasi && c.drop));
    const pass = d.pass || 60;
    const ctx = (d.contexts || []).find(c => c.id === s.ctx);
    const showAkhir = s.on.kalkulasi, showKat = s.on.kalkulasi && s.on.kategorisasi;
    let list = rows.slice();
    if (ctx && ctx.sort && showAkhir) list = list.slice().sort((a, b) => b._akhir - a._akhir);
    const cell = (r, c) => {
      const f = r._fix.find(x => x.col === c.key);
      if (f && s.on.koreksi) return `<span class="stabilo font-bold" title="semula ${esc(f.from)}">${esc(r[c.key])}</span><span class="ml-1 text-[11px] text-slate-400 line-through">${esc(f.from)}</span>`;
      if (f) return `<span class="text-rose-700 font-bold">${esc(r[c.key])}</span>`;
      return esc(r[c.key]);
    };
    const head = `<tr>${cols.map(c => `<th class="text-left px-3 py-2">${esc(c.label)}</th>`).join('')}${showAkhir ? '<th class="text-right px-3 py-2">Akhir</th>' : ''}${showKat ? '<th class="text-left px-3 py-2">Kategori</th>' : ''}</tr>`;
    const body = list.map(r => {
      const gone = s.on.koreksi && r._dup;
      const hit = ctx && ctx.min != null && showAkhir && !gone && r._akhir >= ctx.min;
      return `<tr class="border-t border-slate-100 ${gone ? 'bg-rose-50/60 text-slate-400' : hit ? 'bg-indigo-50' : ''}">${cols.map(c => `<td class="px-3 py-1.5 ${c.mono ? 'font-mono text-xs' : ''} ${gone ? 'line-through' : ''}">${cell(r, c)}</td>`).join('')}
        ${showAkhir ? `<td class="px-3 py-1.5 text-right font-bold tabular-nums ${gone ? 'line-through' : ''}">${gone ? labNum(r._akhir) : `<span class="${r._akhir > 100 ? 'text-rose-700' : 'stabilo'}">${labNum(r._akhir)}</span>`}</td>` : ''}
        ${showKat ? `<td class="px-3 py-1.5">${gone ? '<span class="text-[11px] font-bold text-rose-700">dobel, dihapus</span>' : `<span class="px-2 py-0.5 rounded-md text-xs font-bold ${r._akhir >= pass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}">${r._akhir >= pass ? 'Lulus' : 'Remedial'}</span>`}</td>` : ''}</tr>`;
    }).join('');

    // Laporan: ikut berubah sesuai langkah yang menyala
    const lulus = used.filter(r => r._akhir >= pass), rem = used.filter(r => r._akhir < pass);
    let big, small;
    if (!showAkhir) { big = 'Masih data mentah'; small = 'Belum ada nilai akhir, jadi belum ada yang bisa disimpulkan. Nyalakan <strong>Kalkulasi</strong>.'; }
    else if (ctx && ctx.min != null) {
      const top = used.filter(r => r._akhir >= ctx.min).sort((a, b) => b._akhir - a._akhir);
      big = `${top.length} kandidat ${esc(ctx.short || '')}`; small = top.length ? `${top.map(r => `${esc(r.nama.split(' ')[0])} (${labNum(r._akhir)})`).join(', ')}. Syaratnya nilai akhir ≥ ${ctx.min}.` : 'Tidak ada yang memenuhi syarat.';
    } else if (showKat) { big = `${lulus.length} dari ${used.length} lulus`; small = `Rata-rata kelas <strong>${labNum(avg)}</strong>.${rem.length ? ` ${rem.map(r => esc(r.nama.split(' ')[0])).join(' dan ')} perlu remedial.` : ''}`; }
    else { big = `Rata-rata ${labNum(avg)}`; small = 'Angkanya sudah ada, tapi belum dikelompokkan. Nyalakan <strong>Kategorisasi</strong>.'; }
    const warn = [];
    if (!s.on.koreksi) warn.push(d.warnKoreksi || 'Data masih mengandung kesalahan dan ikut terhitung.');
    if (!s.on.kondensasi) warn.push('Tabel masih memuat kolom yang tidak dibutuhkan.');
    if (!ctx) warn.push('Belum jelas laporan ini untuk apa. Pilih tujuannya di <strong>Kontekstualisasi</strong>.');

    const steps = LAB_5K_STEPS.map(([k, label]) => k === 'konteks'
      ? labBtn(n, 'konteks', '', (ctx ? '✓ ' : '') + label, !!ctx)
      : labBtn(n, 'tog', k, (s.on[k] ? '✓ ' : '') + label, !!s.on[k])).join('');
    const ctxPick = s.ctxOpen || ctx ? `<div class="flex flex-wrap items-center gap-2 mt-2 text-sm"><span class="text-slate-600">Data ini untuk:</span>${(d.contexts || []).map(c => labBtn(n, 'ctx', c.id, esc(c.label), s.ctx === c.id)).join('')}</div>` : '';
    const notes = LAB_5K_STEPS.filter(([k]) => k === 'konteks' ? ctx : s.on[k]).map(([k, label]) => `<p><strong>${label}:</strong> ${rich(k === 'konteks' ? ctx.note : (d.notes || {})[k] || '')}</p>`).join('');
    return `<div class="flex flex-wrap gap-2">${steps}</div>${ctxPick}
      <div class="mt-3 rounded-xl border border-slate-200 overflow-x-auto"><table class="w-full text-sm whitespace-nowrap"><thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">${head}</thead><tbody>${body}</tbody></table></div>
      <div class="mt-3 grid gap-3 md:grid-cols-2" aria-live="polite">
        <div class="space-y-3 min-w-0">
          <div class="rounded-xl border-[1.5px] border-ink bg-indigo-50 p-3 sm:p-4 space-y-2">${labCap('Laporan yang terbentuk')}<div class="font-display text-2xl font-extrabold text-ink">${big}</div><div class="text-sm text-slate-700">${small}</div></div>
          ${warn.length ? `<div class="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm font-semibold text-amber-900 space-y-1">${warn.map(x => `<p>⚠️ ${x}</p>`).join('')}</div>` : `<div class="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-900">✓ Kelima K sudah diterapkan: data mentah sudah menjadi informasi yang bisa dipakai.</div>`}
        </div>
        <div class="min-w-0">
          ${notes ? `<div class="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 space-y-1.5 text-sm text-slate-700">${labCap('Apa yang dilakukan tiap langkah')}${notes}</div>` : `<div class="rounded-xl border border-dashed border-slate-300 p-3 text-sm text-slate-500">Nyalakan satu langkah 5K di atas untuk melihat apa yang dikerjakannya.</div>`}
        </div>
      </div>
      <div class="mt-3 flex"><button ${act(n, 'reset')} class="px-3 py-2 rounded-lg text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-indigo-100">↺ Kembali ke data mentah</button></div>`;
  },
  on: {
    tog(d, s, k) { s.on[k] = !s.on[k]; if (k === 'kalkulasi' && !s.on[k]) s.on.kategorisasi = false; if (k === 'kategorisasi' && s.on[k] && !s.on.kalkulasi) { s.on.kategorisasi = false; showToast('Kategorisasi butuh nilai akhir. Nyalakan Kalkulasi dulu.', 'warning'); } },
    konteks(d, s) { if (s.ctx) { s.ctx = ''; s.ctxOpen = false; } else s.ctxOpen = !s.ctxOpen; },
    ctx(d, s, id) { s.ctx = s.ctx === id ? '' : id; },
    reset(d, s) { s.on = {}; s.ctx = ''; s.ctxOpen = false; }
  }
};

// ---------------------------------------------------------------------
//  Bahasa Indonesia P3: perakit imbuhan meN- / peN-
// ---------------------------------------------------------------------
const VOK = /[aiueo]/;
function sukuKata(w) { return (w.replace(/ai|au|oi|ei/g, 'A').match(/[aiueoA]+/g) || []).length; }
// Mengembalikan { base: 'me'|'pe', alo, sisa, luluh, gugus, satu, rule, salah }
function bentukMeN(w, base) {
  const c = w[0], c2 = w[1] || '';
  const r = (alo, sisa, rule, extra = {}) => Object.assign({ alo: base + alo, sisa, rule, luluh: false }, extra);
  if (sukuKata(w) === 1) return r('nge', w, 'satu', { satu: true });
  if (VOK.test(c)) return r('ng', w, 'vokal');
  if (/^(ny|ng)/.test(w) || 'lmnrwy'.includes(c)) return r('', w, 'lmnrwy');
  if (/^kh/.test(w) || 'gh'.includes(c)) return r('ng', w, 'gh');
  if (/^sy/.test(w)) return r('n', w, 'cdj');
  const gugus = !VOK.test(c2);
  if (c === 'k') return gugus ? r('ng', w, 'gugus', { gugus: true, salah: base + 'ng' + w.slice(1) }) : r('ng', w.slice(1), 'k', { luluh: true, salah: base + 'ng' + w });
  if (c === 't') return gugus ? r('n', w, 'gugus', { gugus: true, salah: base + 'n' + w.slice(1) }) : r('n', w.slice(1), 't', { luluh: true, salah: base + 'nt' + w.slice(1) });
  if (c === 's') return gugus ? r('n', w, 'gugus', { gugus: true, salah: base + 'ny' + w.slice(1) }) : r('ny', w.slice(1), 's', { luluh: true, salah: base + 'ns' + w.slice(1) });
  if (c === 'p') return gugus ? r('m', w, 'gugus', { gugus: true, salah: base + 'm' + w.slice(1) }) : r('m', w.slice(1), 'p', { luluh: true, salah: base + 'mp' + w.slice(1) });
  if ('bfv'.includes(c)) return r('m', w, 'bfv');
  if ('cdjz'.includes(c)) return r('n', w, 'cdj');
  return r('ng', w, 'lain');
}
const LAB_IMBUHAN = {
  init: d => ({ values: { word: d.start || 'sukses' }, af: d.startAffix || 0 }),
  live(d, s) {
    const af = (d.affixes || [])[s.af] || { pre: 'me', label: 'meN-' };
    const w = String(s.values.word || '').trim().toLowerCase();
    if (!w) return `<p class="text-sm text-slate-500">Ketik kata dasar dulu, misalnya <em>sapu</em> atau <em>kritik</em>.</p>`;
    if (!/^[a-z]{2,}$/.test(w)) return `<p class="text-sm text-rose-700 font-bold">Pakai satu kata dasar, huruf saja (tanpa spasi, angka, atau tanda hubung).</p>`;
    const k = (d.special || []).find(x => x.word === w && x.affix === af.label);
    const b = bentukMeN(w, af.pre);
    const suf = af.suf || '';
    const hasil = k ? k.res : b.alo + b.sisa + suf;
    const firstStruck = b.luluh ? `<s class="text-rose-600">${esc(w[0])}</s>${esc(w.slice(1))}` : esc(w);
    const why = k ? rich(k.note) : b.satu ? `<strong>${esc(w)}</strong> hanya satu suku kata, jadi ${esc(af.label.replace(/…|-kan|-i|-an/g, '').trim())} menjadi <strong>${esc(b.alo)}-</strong>.`
      : b.luluh ? `<strong>${esc(w[0])}</strong> diikuti vokal <strong>${esc(w[1])}</strong>, jadi ${esc(w[0])} luluh dan imbuhannya menjadi <strong>${esc(b.alo)}-</strong>.`
      : b.gugus ? `<strong>${esc(w.slice(0, 2))}</strong> adalah gugus konsonan, jadi <strong>${esc(w[0])}</strong> tidak luluh. Imbuhannya menjadi <strong>${esc(b.alo)}-</strong>.`
      : `Huruf awal <strong>${esc(w[0])}</strong> → imbuhannya menjadi <strong>${esc(b.alo)}-</strong>${b.luluh ? '' : ' dan huruf awal tetap'}.`;
    const salah = !k && b.salah ? b.salah + suf : '';
    return `<div class="flex items-center gap-2 flex-wrap font-mono text-base sm:text-lg">
        <span class="px-2 py-1 rounded-md bg-white border border-slate-300">${esc(af.label)}</span><span class="text-slate-400">+</span>
        <span class="px-2 py-1 rounded-md bg-white border border-slate-300">${k ? esc(w) : firstStruck}</span><span class="text-slate-400">→</span>
      </div>
      <div class="font-display text-2xl sm:text-3xl font-extrabold text-ink break-words">${k ? `<span class="stabilo">${esc(hasil)}</span>` : `<span class="stabilo">${esc(b.alo)}</span>${esc(b.sisa)}${suf ? `<span class="stabilo">${esc(suf)}</span>` : ''}`}</div>
      <div class="text-sm text-slate-800">${why}${suf && !k ? ` Akhiran <strong>-${esc(suf)}</strong> menempel di belakang.` : ''}</div>
      ${salah && salah !== hasil ? `<div class="text-xs font-bold text-rose-700">✗ Bukan: ${esc(salah)}</div>` : ''}
      ${d.cek ? `<div class="text-xs text-slate-500">Hasil ini mengikuti aturan bentuk. Apakah katanya benar-benar dipakai, cek di KBBI.</div>` : ''}
`;
  },
  live2(d, s) {
    const w = String(s.values.word || '').trim().toLowerCase();
    const cur = /^[a-z]{2,}$/.test(w) && !(d.special || []).some(x => x.word === w) ? bentukMeN(w, 'me').rule : '';
    return (d.rules || []).map(r => `<tr class="border-t border-slate-100 ${(r.match || [r.id]).includes(cur) ? 'bg-indigo-50 font-semibold' : ''}"><td class="px-3 py-1.5 rich">${rich(r.awal)}</td><td class="px-3 py-1.5 font-mono">${esc(r.jadi)}</td><td class="px-3 py-1.5 rich">${rich(r.contoh)}</td></tr>`).join('');
  },
  render(d, s, n) {
    return `<div class="grid gap-3 md:grid-cols-2">
        <div class="space-y-3">
          <div class="flex flex-wrap gap-2" role="group" aria-label="Pilih imbuhan">${(d.affixes || []).map((a, i) => labBtn(n, 'af', i, esc(a.label), i === s.af)).join('')}</div>
          <label class="block"><span class="text-xs font-bold uppercase tracking-wider text-slate-500">Kata dasar</span>
            <input data-live="${n}" data-key="word" value="${esc(s.values.word)}" autocomplete="off" autocapitalize="off" spellcheck="false" class="mt-1 block w-full h-11 px-3 rounded-xl border-[1.5px] border-ink bg-white font-mono text-base outline-none focus:ring-2 focus:ring-indigo-300"></label>
          <div class="flex flex-wrap gap-1.5 text-xs"><span class="text-slate-500 py-1">Coba:</span>${(d.try || []).map(t => `<button ${act(n, 'try', t)} class="px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-100 font-mono text-slate-700">${esc(t)}</button>`).join('')}</div>
        </div>
        <div id="lab-live-${n}" class="rounded-xl border-[1.5px] border-ink bg-indigo-50 p-3 sm:p-4 space-y-2.5 min-w-0" aria-live="polite">${LAB_IMBUHAN.live(d, s)}</div>
      </div>
      <div class="mt-3 rounded-xl border border-slate-200 overflow-x-auto"><table class="w-full text-sm">
        <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th class="text-left px-3 py-2">Huruf awal kata dasar</th><th class="text-left px-3 py-2"><span class="normal-case">meN- / peN-</span> menjadi</th><th class="text-left px-3 py-2">Contoh</th></tr></thead>
        <tbody id="lab-live2-${n}">${LAB_IMBUHAN.live2(d, s)}</tbody>
      </table></div>`;
  },
  on: {
    af(d, s, i) { s.af = +i; },
    try(d, s, w) { s.values.word = w; }
  }
};

// ---------------------------------------------------------------------
//  Bahasa Indonesia P5–P6: bengkel kalimat efektif (klik kata → hapus/ganti)
// ---------------------------------------------------------------------
const kalNorm = t => t.toLowerCase().replace(/\s+/g, ' ').trim();
function kalimatSekarang(it, ed) {
  const words = (it.tokens || []).map((t, i) => ed[i] === 'del' ? '' : ed[i] != null ? ed[i] : t).filter(Boolean);
  let out = words.join(' ');
  return out.charAt(0).toUpperCase() + out.slice(1);
}
const LAB_KALIMAT = {
  init: () => ({ c: 0, ed: {}, sel: null, show: false }),
  render(d, s, n) {
    const items = d.items || [], it = items[s.c]; if (!it) return '';
    const ed = s.ed[s.c] || {};
    const now = kalimatSekarang(it, ed), nn = kalNorm(now);
    const okIdx = (it.accept || []).findIndex(a => kalNorm(a.text) === nn);
    const touched = Object.keys(ed).length > 0;
    const hint = okIdx < 0 && touched ? (it.hints || []).find(h => nn.includes(kalNorm(h.has))) : null;
    const tabs = items.length > 1 ? `<div class="flex flex-wrap gap-2 mb-3" role="group" aria-label="Pilih kalimat">${items.map((x, i) => {
      const e2 = s.ed[i] || {}; const done = (x.accept || []).some(a => kalNorm(a.text) === kalNorm(kalimatSekarang(x, e2)));
      return labBtn(n, 'pick', i, `${done ? '✓ ' : ''}Kalimat ${i + 1}`, i === s.c);
    }).join('')}</div>` : '';
    const toks = (it.tokens || []).map((t, i) => {
      const v = ed[i]; const cls = i === s.sel ? 'bg-indigo-100 ring-2 ring-ink' : v === 'del' ? 'text-slate-400 line-through' : v != null ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'hover:bg-slate-100';
      return `<button ${act(n, 'sel', i)} class="px-1.5 py-0.5 rounded-md transition ${cls}">${esc(v != null && v !== 'del' ? v : t)}</button>`;
    }).join(' ');
    const opts = s.sel != null ? (() => {
      const i = s.sel, t = it.tokens[i], alt = (it.alt || {})[i] || [];
      const b = (arg, label, extra = '') => `<button ${act(n, 'set', arg)} class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border-[1.5px] border-slate-300 bg-white hover:border-ink ${extra}">${label}</button>`;
      return `<div class="mt-3 flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200"><span class="text-xs font-bold text-slate-500">“${esc(t)}”:</span>
        ${alt.map(a => b('=' + a, 'Ganti: ' + esc(a))).join('')}${b('del', 'Hapus kata ini')}${ed[i] != null ? b('keep', 'Kembalikan') : ''}<button ${act(n, 'sel', '')} class="ml-auto px-2 py-1 text-xs text-slate-500 hover:text-ink">Tutup ✕</button></div>`;
    })() : '';
    let verdict;
    if (okIdx >= 0) verdict = `<p class="text-sm font-bold text-emerald-800">✓ Sudah efektif. ${rich(it.accept[okIdx].why || '')}</p>`;
    else if (!touched) verdict = `<p class="text-sm text-slate-600">Klik kata yang menurutmu bermasalah.</p>`;
    else if (hint) verdict = `<p class="text-sm font-bold text-amber-800">Hampir. ${rich(hint.msg)}</p>`;
    else verdict = `<p class="text-sm font-bold text-rose-700">${rich(it.miss || 'Belum cocok dengan versi yang diterima. Mungkin ada kata penting yang ikut terhapus atau terganti.')}</p>`;
    const reveal = okIdx >= 0 || s.show;
    return `${tabs}
      <div class="rounded-xl border border-slate-200 p-3 sm:p-4 text-base sm:text-lg leading-9">${toks}</div>${opts}
      <div class="mt-3 grid gap-3 md:grid-cols-2" aria-live="polite">
        <div class="rounded-xl border-[1.5px] border-ink bg-white p-3 space-y-1.5">${labCap('Versi kamu sejauh ini')}<p class="text-sm">${esc(now)}</p>${verdict}</div>
        <div class="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 space-y-1.5 text-sm">${labCap('Versi yang diterima')}
          ${reveal ? (it.accept || []).map((a, i) => `<p class="${i === okIdx ? 'font-bold text-emerald-900' : ''}">✓ ${esc(a.text)}</p>`).join('') + `<p class="text-slate-600">Syarat yang dilatih: <strong>${esc(it.syarat || '')}</strong>. ${rich(it.why || '')}</p>`
            : `<p class="text-slate-600">Ada ${(it.accept || []).length} versi yang diterima. Coba perbaiki sendiri dulu.</p><button ${act(n, 'show')} class="mt-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-indigo-100">Lihat versi yang diterima</button>`}
        </div>
      </div>
      <div class="mt-3 flex"><button ${act(n, 'reset')} class="px-3 py-2 rounded-lg text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-indigo-100">↺ Ulang kalimat ini</button></div>`;
  },
  on: {
    pick(d, s, i) { s.c = +i; s.sel = null; s.show = false; },
    sel(d, s, i) { s.sel = i === '' || +i === s.sel ? null : +i; },
    set(d, s, v) {
      if (s.sel == null) return;
      const ed = s.ed[s.c] = s.ed[s.c] || {};
      if (v === 'keep') delete ed[s.sel]; else if (v === 'del') ed[s.sel] = 'del'; else ed[s.sel] = v.slice(1);
      s.sel = null;
    },
    show(d, s) { s.show = true; },
    reset(d, s) { s.ed[s.c] = {}; s.sel = null; s.show = false; }
  }
};

// ---------------------------------------------------------------------
//  Bahasa Inggris: perakit kalimat (to be & present simple)
// ---------------------------------------------------------------------
const EN_SUBJ = { I: { p: 1 }, You: { p: 2 }, He: { p: 3, sg: true }, She: { p: 3, sg: true }, It: { p: 3, sg: true }, We: { p: 4 }, They: { p: 6 } };
function enSubj(sub) { const k = EN_SUBJ[sub]; return k || { p: 3, sg: true, noun: true }; }
function enPron(sub) { const k = enSubj(sub); if (!k.noun) return sub; return /brother|father|\bman\b|boy/i.test(sub) ? 'He' : /sister|mother|woman|girl/i.test(sub) ? 'She' : 'It'; }
function enS(v) {
  if (v === 'have') return { w: 'has', why: '<em>have</em> tidak beraturan: menjadi <em>has</em>.' };
  if (v === 'be') return { w: 'is', why: '' };
  if (/(s|sh|ch|x|z|o)$/.test(v)) return { w: v + 'es', suf: 'es', why: `<em>${v}</em> berakhiran ${v.match(/(sh|ch|s|x|z|o)$/)[1]}, jadi tambah <em>-es</em>.` };
  if (/[^aiueo]y$/.test(v)) return { w: v.slice(0, -1) + 'ies', suf: 'ies', why: `<em>${v}</em> berakhiran konsonan + y, jadi y → <em>-ies</em>.` };
  return { w: v + 's', suf: 's', why: 'Tambah <em>-s</em>.' };
}
function enBuild(sub, vb, form) {
  const k = enSubj(sub), low = sub === 'I' ? 'I' : k.noun ? sub.charAt(0).toLowerCase() + sub.slice(1) : sub.toLowerCase();
  const hl = t => `<span class="stabilo">${t}</span>`;
  const pron = enPron(sub), pl = pron === 'I' ? 'I' : pron.toLowerCase();
  if (vb.be) {
    const be = k.p === 1 ? 'am' : k.sg ? 'is' : 'are';
    const comp = k.sg || k.p === 1 || (k.p === 2 && !vb.plYou) ? vb.sg : vb.pl;
    const why = [`Subjek <strong>${esc(sub)}</strong> memakai <strong>${be}</strong>.`];
    if (vb.sg !== vb.pl) why.push(k.sg || k.p <= 2 ? `Satu orang → pakai <em>${esc(vb.sg)}</em> (dengan a/an).` : `Lebih dari satu → bentuk jamak <em>${esc(vb.pl)}</em>, tanpa a/an.`);
    // Jawaban singkat: "Are you…?" dijawab "Yes, I am"
    const ansS = k.p === 1 ? 'you' : k.p === 2 ? 'I' : pl, ansBe = ansS === 'I' ? 'am' : ansS === 'you' || k.p >= 4 ? 'are' : 'is';
    const neg = ansBe === 'am' ? `I'm ${hl('not')}` : `${esc(ansS)} ${hl(ansBe + "n't")}`;
    if (form === 'pos') return { html: `${esc(sub)} ${hl(be)} ${esc(comp)}.`, say: `${sub} ${be} ${comp}.`, why, extra: `Disingkat: ${esc(k.p === 1 ? "I'm" : k.noun ? sub + "'s" : sub + (be === 'is' ? "'s" : "'re"))} ${esc(comp)}.` };
    if (form === 'neg') return { html: `${esc(sub)} ${hl(be + ' not')} ${esc(comp)}.`, say: `${sub} ${be} not ${comp}.`, why: why.concat(['Negatif cukup tambah <strong>not</strong> setelah to be.']), extra: `Disingkat: ${esc(k.p === 1 ? "I'm not" : sub + ' ' + be + "n't")} ${esc(comp)}.` };
    return { html: `${hl(be.charAt(0).toUpperCase() + be.slice(1))} ${esc(low)} ${esc(comp)}?`, say: `${be} ${low} ${comp}?`, why: why.concat(['Pertanyaan: to be pindah ke depan subjek.']), extra: `Jawaban singkat: <strong>Yes, ${esc(ansS)} ${hl(ansBe)}.</strong> / <strong>No, ${neg}.</strong>` };
  }
  const v = vb.v, rest = vb.rest || '';
  const s3 = k.sg ? enS(v) : null;
  const doW = k.sg ? 'does' : 'do';
  const why = [];
  const ansS = k.p === 1 ? 'you' : k.p === 2 ? 'I' : pl;
  if (form === 'pos') {
    if (s3) why.push(`Subjek <strong>${esc(sub)}</strong> orang ketiga tunggal → kata kerja diberi akhiran.`, s3.why);
    else why.push(`Subjek <strong>${esc(sub)}</strong> → kata kerja bentuk dasar (V1), tanpa -s.`);
    const verb = s3 ? (s3.suf ? esc(s3.w.slice(0, -s3.suf.length)) + hl(s3.suf) : hl(s3.w)) : esc(v);
    return { html: `${esc(sub)} ${verb} ${esc(rest)}.`, say: `${sub} ${s3 ? s3.w : v} ${rest}.`, why };
  }
  if (form === 'neg') {
    why.push(`Subjek <strong>${esc(sub)}</strong> memakai <strong>${doW} not (${doW}n't)</strong>.`);
    if (s3) why.push(`Akhiran -s sudah dibawa <em>doesn't</em>, jadi kata kerjanya kembali ke bentuk dasar: <em>${esc(v)}</em>, bukan <em>${esc(s3.w)}</em>.`);
    return { html: `${esc(sub)} ${hl(doW + "n't")} ${esc(v)} ${esc(rest)}.`, say: `${sub} ${doW}n't ${v} ${rest}.`, why };
  }
  why.push(`Subjek <strong>${esc(sub)}</strong> memakai <strong>${doW}</strong> di pertanyaan.`);
  if (s3) why.push(`Karena -s sudah dibawa <em>does</em>, kata kerjanya kembali ke bentuk dasar: <em>${esc(v)}</em>, bukan <em>${esc(s3.w)}</em>.`);
  const ansDo = ansS === 'I' || ansS === 'you' || k.p >= 4 ? 'do' : 'does';
  return { html: `${hl(doW.charAt(0).toUpperCase() + doW.slice(1))} ${esc(low)} ${esc(v)} ${esc(rest)}?`, say: `${doW} ${low} ${v} ${rest}?`, why, extra: `Jawaban singkat: <strong>Yes, ${esc(ansS)} ${hl(ansDo)}.</strong> / <strong>No, ${esc(ansS)} ${hl(ansDo + "n't")}.</strong>` };
}
const LAB_SENTENCE = {
  init: d => ({ sub: (d.start || {}).sub || 'She', vb: (d.start || {}).vb || 0, form: (d.start || {}).form || 'pos' }),
  render(d, s, n) {
    const subs = d.subjects || ['I', 'You', 'He', 'She', 'We', 'They'];
    const vbs = d.verbs || [];
    const vb = vbs[s.vb] || vbs[0]; if (!vb) return '';
    const r = enBuild(s.sub, vb, s.form);
    const row = (label, html) => `<div class="flex flex-wrap items-center gap-2"><span class="w-full sm:w-24 text-xs font-bold uppercase tracking-wider text-slate-500">${label}</span>${html}</div>`;
    return `<div class="space-y-2.5">
        ${row('Subjek', subs.map(x => labBtn(n, 'sub', x, esc(x), x === s.sub)).join(''))}
        ${row('Kata kerja', vbs.map((x, i) => labBtn(n, 'vb', i, esc(x.label), i === s.vb)).join(''))}
        ${row('Bentuk', [['pos', 'Positif'], ['neg', 'Negatif'], ['q', 'Pertanyaan']].map(([k, l]) => labBtn(n, 'form', k, l, k === s.form)).join(''))}
      </div>
      <div class="mt-4 grid gap-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" aria-live="polite">
        <div class="rounded-xl border-[1.5px] border-ink bg-indigo-50 p-3 sm:p-4 space-y-2">
          <div class="font-display text-2xl sm:text-3xl font-extrabold text-ink break-words">${r.html}</div>
          ${r.extra ? `<div class="text-sm text-slate-700">${r.extra}</div>` : ''}
          <div class="pt-1"><button ${act(n, 'say')} class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300 hover:border-ink text-slate-700">🔊 Dengarkan</button></div>
        </div>
        <div class="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 space-y-1.5 text-sm text-slate-700">${labCap('Kenapa begini?')}${r.why.filter(Boolean).map(x => `<p>${x}</p>`).join('')}</div>
      </div>`;
  },
  on: {
    sub(d, s, x) { s.sub = x; }, vb(d, s, i) { s.vb = +i; }, form(d, s, f) { s.form = f; },
    say(d, s) { const vb = (d.verbs || [])[s.vb]; if (vb) labSpeak(enBuild(s.sub, vb, s.form).say); return false; }
  }
};

// ---------------------------------------------------------------------
//  Bahasa Inggris P3: jam interaktif (past / to)
// ---------------------------------------------------------------------
const EN_NUM = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const enN = x => x <= 20 ? EN_NUM[x] : x < 30 ? 'twenty-' + EN_NUM[x - 20] : x === 30 ? 'thirty' : x < 40 ? 'thirty-' + EN_NUM[x - 30] : x === 40 ? 'forty' : x < 50 ? 'forty-' + EN_NUM[x - 40] : x === 50 ? 'fifty' : 'fifty-' + EN_NUM[x - 50];
function enTime(t) {
  const h = Math.floor(t / 60) % 12 || 12, m = t % 60, nx = h % 12 + 1;
  const min = x => x === 15 ? 'quarter' : x === 30 ? 'half' : enN(x) + (x % 5 ? (x === 1 ? ' minute' : ' minutes') : '');
  const phrase = m === 0 ? `${enN(h)} o'clock` : m <= 30 ? `${min(m)} past ${enN(h)}` : `${min(60 - m)} to ${enN(nx)}`;
  const digital = m === 0 ? `${enN(h)} o'clock` : `${enN(h)} ${m < 10 ? 'oh ' + enN(m) : enN(m)}`;
  const zone = m === 0 ? 'oclock' : m <= 30 ? 'past' : 'to';
  return { h, m, nx, phrase, digital, zone, text: String(h).padStart(2, '0') + '.' + String(m).padStart(2, '0') };
}
let clockDrag = null;
function clockSet(n, ev) {
  const b = BLOCKS[n], svg = document.getElementById('clk-' + n); if (!b || !svg) return;
  const r = svg.getBoundingClientRect();
  const a = Math.atan2(ev.clientX - (r.left + r.width / 2), -(ev.clientY - (r.top + r.height / 2)));
  const m = Math.round(((a * 180 / Math.PI + 360) % 360) / 6) % 60;
  const s = b.state, old = s.t % 60;
  let h = Math.floor(s.t / 60);
  if (old >= 45 && m < 15) h++; else if (old < 15 && m >= 45) h--;
  s.t = ((h * 60 + m) % 720 + 720) % 720;
  refreshBlock(n);
}
document.addEventListener('pointerdown', e => {
  const el = e.target.closest && e.target.closest('[data-clock]'); if (!el) return;
  clockDrag = +el.dataset.clock; e.preventDefault(); clockSet(clockDrag, e); markInteract(clockDrag);
});
document.addEventListener('pointermove', e => { if (clockDrag != null) { e.preventDefault(); clockSet(clockDrag, e); } }, { passive: false });
['pointerup', 'pointercancel'].forEach(t => document.addEventListener(t, () => { clockDrag = null; }));
const LAB_CLOCK = {
  init: d => ({ t: d.start != null ? d.start : 8 * 60 + 40 }),
  render(d, s, n) {
    const T = enTime(s.t), C = 110;
    const pt = (deg, len) => [C + len * Math.sin(deg * Math.PI / 180), C - len * Math.cos(deg * Math.PI / 180)];
    const [mx, my] = pt(T.m * 6, 76), [hx, hy] = pt((T.h % 12) * 30 + T.m * 0.5, 50);
    const nums = Array.from({ length: 12 }, (_, i) => { const [x, y] = pt(i * 30, 80); return `<text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700" fill="#17202a" font-family="Bricolage Grotesque, system-ui">${i || 12}</text>`; }).join('');
    const ticks = Array.from({ length: 60 }, (_, i) => { const [x1, y1] = pt(i * 6, 98), [x2, y2] = pt(i * 6, i % 5 ? 94 : 90); return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#17202a" stroke-opacity="${i % 5 ? .25 : .6}" stroke-width="${i % 5 ? 1 : 2}"/>`; }).join('');
    const why = T.zone === 'oclock' ? `Tepat jam ${T.h}: pakai <strong>o'clock</strong>.`
      : T.zone === 'past' ? `Menit ${T.m} ada di sisi <strong class="text-emerald-700">past</strong> (1–30): menit + past + jam yang <strong>sedang berjalan</strong> (${enN(T.h)}).`
      : `Menit ${T.m} ada di sisi <strong class="text-rose-700">to</strong> (31–59): sisa ${60 - T.m} menit + to + jam <strong>berikutnya</strong> (${enN(T.nx)}).`;
    const trap = T.m === 30 ? `<p class="text-sm font-bold text-amber-800">⚠️ ${T.text} dalam bahasa Indonesia “setengah ${T.nx === 1 ? 'satu' : ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas', 'dua belas'][T.nx]}”, tapi bahasa Inggrisnya <em>half past ${enN(T.h)}</em>.</p>` : '';
    const b = (arg, label) => `<button ${act(n, 'step', arg)} class="px-3 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-700 hover:bg-indigo-100">${label}</button>`;
    return `<div class="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] items-center">
        <svg id="clk-${n}" data-clock="${n}" viewBox="0 0 220 220" class="w-56 h-56 sm:w-60 sm:h-60 mx-auto touch-none select-none cursor-pointer" role="img" aria-label="Jam ${T.text}. Seret untuk memutar jarum menit.">
          <path d="M110 110 L110 12 A98 98 0 0 1 110 208 Z" fill="#dcfce7"/><path d="M110 110 L110 208 A98 98 0 0 1 110 12 Z" fill="#ffe4e6"/>
          <circle cx="110" cy="110" r="98" fill="none" stroke="#17202a" stroke-width="3"/>${ticks}${nums}
          <text x="152" y="72" font-size="10" font-weight="800" fill="#166534" text-anchor="middle">past</text><text x="68" y="72" font-size="10" font-weight="800" fill="#be123c" text-anchor="middle">to</text>
          <line x1="110" y1="110" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#17202a" stroke-width="6" stroke-linecap="round"/>
          <line x1="110" y1="110" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#1f5c52" stroke-width="4" stroke-linecap="round"/>
          <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="9" fill="#ffe14d" stroke="#17202a" stroke-width="2"/><circle cx="110" cy="110" r="5" fill="#17202a"/>
        </svg>
        <div class="space-y-3 min-w-0">
          <div class="flex flex-wrap items-center gap-2">${b(-5, '− 5')}${b(-1, '− 1')}<span class="font-mono text-2xl font-bold text-ink px-2 tabular-nums">${T.text}</span>${b(1, '+ 1')}${b(5, '+ 5')}</div>
          <div class="rounded-xl border-[1.5px] border-ink bg-indigo-50 p-3 sm:p-4 space-y-1.5" aria-live="polite">
            <div class="font-display text-2xl font-extrabold text-ink">It's <span class="stabilo">${T.phrase}</span>.</div>
            ${T.m ? `<div class="text-sm text-slate-600">Cara digital: It's ${T.digital}.</div>` : ''}
            <div class="pt-1"><button ${act(n, 'say')} class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300 hover:border-ink text-slate-700">🔊 Dengarkan</button></div>
          </div>
          <p class="text-sm text-slate-700">${why}</p>${trap}
          <div class="flex flex-wrap gap-1.5 text-xs"><span class="text-slate-500 py-1">Lompat ke:</span>${(d.presets || []).map(p => `<button ${act(n, 'go', p)} class="px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-100 font-mono text-slate-700">${esc(enTime(p).text)}</button>`).join('')}</div>
        </div>
      </div>`;
  },
  on: {
    step(d, s, x) { s.t = ((s.t + +x) % 720 + 720) % 720; },
    go(d, s, t) { s.t = +t; },
    say(d, s) { labSpeak(`It's ${enTime(s.t).phrase}.`); return false; }
  }
};

// ---------------------------------------------------------------------
//  Bahasa Inggris P6: pilih rute (uang & jam tiba)
// ---------------------------------------------------------------------
const hhmm = t => String(Math.floor(t / 60)).padStart(2, '0') + '.' + String(t % 60).padStart(2, '0');
const LAB_ROUTE = {
  init: () => ({ pick: null, tried: {} }),
  render(d, s, n) {
    const start = d.start, money = d.money, due = d.due;
    const r = s.pick != null ? d.routes[s.pick] : null;
    const cards = d.routes.map((x, i) => `<button ${act(n, 'pick', i)} aria-pressed="${i === s.pick}" class="w-full text-left rounded-xl border-[1.5px] p-3 transition ${i === s.pick ? 'border-ink bg-indigo-50' : 'border-slate-300 bg-white hover:border-ink'}">
        <div class="flex items-center justify-between gap-2"><span class="font-bold text-sm text-ink">${esc(x.label)}</span>${s.tried[i] ? `<span class="text-xs font-bold ${x.cost > money ? 'text-rose-700' : start + x.mins > due ? 'text-rose-700' : 'text-emerald-700'}">${x.cost > money ? 'uang kurang' : start + x.mins > due ? 'terlambat' : '✓ bisa'}</span>` : ''}</div>
        <div class="text-xs text-slate-600 rich">${rich(x.info)}</div></button>`).join('');
    let res = `<div class="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">Pilih salah satu rute di kiri.</div>`;
    if (r) {
      const broke = r.cost > money, arr = start + r.mins, late = arr - due;
      const ok = !broke && late <= 0;
      res = `<div class="grid grid-cols-2 gap-2">
          <div class="rounded-xl border border-slate-200 p-3">${labCap('Sisa uang')}<div class="font-mono text-xl sm:text-2xl font-bold ${broke ? 'text-rose-700' : 'text-ink'}">${broke ? `$${money} &lt; $${r.cost}` : `$${money} → <span class="stabilo">$${money - r.cost}</span>`}</div></div>
          <div class="rounded-xl border border-slate-200 p-3">${labCap('Tiba di ' + esc(d.place || 'tujuan'))}<div class="font-mono text-xl sm:text-2xl font-bold ${broke ? 'text-slate-400' : late > 0 ? 'text-rose-700' : 'text-emerald-700'}">${broke ? '–' : hhmm(arr)}</div></div>
        </div>
        ${r.steps ? `<ol class="text-sm text-slate-700 space-y-1">${r.steps.map(x => `<li class="flex gap-2"><span class="font-mono text-xs text-slate-500 pt-0.5 w-12 shrink-0">${esc(hhmm(start + x.at))}</span><span class="rich">${rich(x.text)}</span></li>`).join('')}</ol>` : ''}
        <div class="rounded-xl border-[1.5px] border-ink ${ok ? 'bg-emerald-50' : 'bg-rose-50'} p-3 sm:p-4 space-y-1.5">
          <div class="font-display text-lg font-extrabold ${ok ? 'text-emerald-800' : 'text-rose-800'}">${broke ? 'Uangnya tidak cukup' : late > 0 ? `Terlambat ${late} menit` : `Tepat waktu, ${-late} menit lebih awal`}</div>
          <p class="text-sm text-slate-800 rich">${rich(r.say)}</p>
        </div>`;
    }
    const all = d.routes.every((x, i) => s.tried[i]);
    return `<div class="flex flex-wrap gap-2 mb-3 text-sm">
        <span class="px-3 py-1.5 rounded-lg bg-slate-100 font-bold">🕒 Sekarang ${hhmm(start)}</span><span class="px-3 py-1.5 rounded-lg bg-slate-100 font-bold">💵 $${money}</span><span class="px-3 py-1.5 rounded-lg bg-slate-100 font-bold">🎯 Tiba sebelum ${hhmm(due)}</span>
      </div>
      <div class="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div class="space-y-2">${cards}</div>
        <div class="space-y-3 min-w-0" aria-live="polite">${res}${all && d.wrap ? `<div class="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 text-sm text-slate-700 space-y-1">${labCap('Rangkuman can / can\'t')}${rich(d.wrap)}</div>` : ''}</div>
      </div>`;
  },
  on: { pick(d, s, i) { s.pick = +i; s.tried[+i] = true; } }
};

const LABS = { 'lab-5k': LAB_5K, 'lab-imbuhan': LAB_IMBUHAN, 'lab-kalimat': LAB_KALIMAT, 'lab-kalimat-en': LAB_SENTENCE, 'lab-jam': LAB_CLOCK, 'lab-rute': LAB_ROUTE };
