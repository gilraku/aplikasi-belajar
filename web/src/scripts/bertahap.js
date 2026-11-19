// Blok "bertahap" (diagram yang menyala bertahap) dan "kode-jelas" (kode dengan penjelas per baris).
// Keduanya sudah terbaca tanpa diklik: diagram tampil utuh, panel kode berisi ringkasan inti.
// Klik hanya menyorot satu bagian. DOM diubah langsung (tanpa render ulang) supaya transisi sorotan halus.

// ---------- Blok "bertahap" ----------
// { type: "bertahap", label, title, desc, svg, alt, auto?: true, maxw?: px, steps: [{ t, html }] }
// Bagian SVG ditandai class="bt-part" data-s="1 3" (langkah yang menyalakannya); stabilo = .bt-hl / .bt-hl-line.
const BT_TIMERS = {};
const btReduced = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
function btApply(n, k) {
  const box = document.querySelector('#blk-' + n + ' .bt');
  if (!box) return false;
  if (k) box.dataset.on = k; else delete box.dataset.on;
  box.querySelectorAll('.bt-step').forEach((b, i) => b.setAttribute('aria-pressed', String(i + 1 === k)));
  return true;
}
function btStop(n) { clearTimeout(BT_TIMERS[n]); delete BT_TIMERS[n]; }
function btPlay(n) {
  btStop(n);
  const b = BLOCKS[n]; if (!b) return;
  const total = (b.def.steps || []).length;
  if (btReduced()) { b.state.k = 1; btApply(n, 1); return; } // gerak dikurangi: sorot langkah 1, lanjut dengan klik
  let k = 1;
  const tick = () => {
    // blok tidak tampil lagi (pindah tab/halaman): hentikan dan kembalikan diagram utuh, jangan tertinggal memudar
    if (!BLOCKS[n] || !document.getElementById('blk-' + n)) { b.state.k = 0; return btStop(n); }
    if (k > total) { b.state.k = 0; btApply(n, 0); return btStop(n); }
    b.state.k = k; btApply(n, k++);
    BT_TIMERS[n] = setTimeout(tick, 1700);
  };
  tick();
}
const BERTAHAP_BLOCK = {
  init: () => ({ k: 0, played: false }),
  render(d, s, n) {
    const steps = (d.steps || []).map((x, i) => `<li><button type="button" class="bt-step" aria-pressed="${s.k === i + 1}" ${act(n, 'step', i + 1)}><span class="bt-n">${i + 1}</span><span class="rich"><b>${rich(x.t)}.</b> ${rich(x.html)}</span></button></li>`).join('');
    return `<div class="bt"${s.k ? ` data-on="${s.k}"` : ''}>
      <figure class="bt-fig" role="img" aria-label="${esc(d.alt || d.title || 'Diagram')}" style="max-width:${+d.maxw || 360}px">${d.svg || ''}</figure>
      <div class="bt-side">
        <ol class="bt-steps">${steps}</ol>
        <div class="bt-ctrl"><button type="button" class="adg-btn is-main" ${act(n, 'play')}>${d.auto ? 'Putar ulang' : 'Sorot satu per satu'}</button><button type="button" class="adg-btn" ${act(n, 'all')}>Tampilkan semua</button></div>
      </div>${d.auto ? `<sinau-bt-auto data-n="${n}" hidden></sinau-bt-auto>` : ''}
    </div>`;
  },
  on: {
    step(d, s, a, n) { btStop(n); const k = +a || 0; s.k = s.k === k ? 0 : k; btApply(n, s.k); return false; },
    play(d, s, a, n) { s.played = true; btPlay(n); return false; },
    all(d, s, a, n) { btStop(n); s.k = 0; btApply(n, 0); return false; }
  }
};
// Mode "digulir": menyala sendiri sekali saat diagram cukup terlihat, lalu kembali utuh.
if (window.customElements && !customElements.get('sinau-bt-auto')) {
  customElements.define('sinau-bt-auto', class extends HTMLElement {
    connectedCallback() {
      const n = +this.dataset.n, fig = this.parentElement && this.parentElement.querySelector('.bt-fig');
      if (!fig || !('IntersectionObserver' in window)) return;
      this._io = new IntersectionObserver(es => {
        if (!es.some(x => x.isIntersecting)) return;
        this._io.disconnect();
        const b = BLOCKS[n];
        if (!b || b.state.played || b.state.k || btReduced()) return;
        b.state.played = true; btPlay(n);
      }, { threshold: 0.6 });
      this._io.observe(fig);
    }
    disconnectedCallback() { if (this._io) this._io.disconnect(); }
  });
}

// ---------- Blok "kode-jelas" ----------
// { type: "kode-jelas", label, title, desc, file, lang: "sql"|"php"|"html"|"css", kode: [baris; "\n" = lanjutan baris yang sama],
//   urut?: [angka urutan kerja per baris], inti: { judul, html, efek? },
//   catatan: [{ at: [indeks baris, mulai 0], judul, arti, efek, keliru? }] }
// efek: { tabel: { kolom, baris, baru?: [nama kolom], hapus?: [indeks baris] }, note? } | { vars: [[nama, nilai, "baru"|"belum"?]], note? } | { html }
const KJ_KW = {
  sql: /\b(SELECT|FROM|JOIN|LEFT|RIGHT|INNER|ON|WHERE|AND|OR|IS|NOT|NULL|ORDER BY|GROUP BY|DESC|ASC|INSERT INTO|VALUES|UPDATE|SET|DELETE)\b/g,
  php: /\b(include|require|if|elseif|else|exit|echo|isset|empty|return|while|foreach)\b/g
};
function kjHi(src, lang) {
  // potong jadi token string/teks agar warna tidak saling menimpa
  const parts = String(src).split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/);
  return parts.map((p, i) => {
    if (i % 2) return `<span class="kj-s">${esc(p)}</span>`;
    let h = esc(p);
    if (lang === 'php') h = h.replace(/(&lt;\?php|\?&gt;)/g, '<span class="kj-c">$1</span>').replace(/(\$[A-Za-z_]\w*)/g, '<span class="kj-v">$1</span>');
    if (KJ_KW[lang]) h = h.replace(KJ_KW[lang], (m, w, off, all) => /<span[^>]*$/.test(all.slice(0, off)) ? m : `<span class="kj-k">${w}</span>`);
    if (lang === 'sql') h = h.replace(/(--.*)$/, '<span class="kj-c">$1</span>');
    else h = h.replace(/(\/\/.*)$/, '<span class="kj-c">$1</span>');
    return h;
  }).join('');
}
function kjTable(t) {
  const baru = t.baru || [], hapus = t.hapus || [], kol = t.kolom || [];
  return `<div class="kj-tw"><table class="kj-tbl"><thead><tr>${kol.map(c => `<th${baru.includes(c) ? ' class="is-new"' : ''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${
    (t.baris || []).map((r, i) => `<tr${hapus.includes(i) ? ' class="is-gone"' : ''}>${r.map((v, j) => `<td class="${baru.includes(kol[j]) ? 'is-new' : ''}${/\s/.test(String(v)) ? ' is-wrap' : ''}">${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function kjEfek(e) {
  if (!e) return '';
  let h = '';
  if (e.tabel) h += kjTable(e.tabel);
  if (e.vars) h += `<div class="kj-vars">${e.vars.map(([k, v, f]) => `<div class="kj-var${f === 'baru' ? ' is-new' : f === 'belum' ? ' is-wait' : ''}"><span class="kj-vk">${esc(k)}</span><span class="kj-vv">${esc(v)}</span></div>`).join('')}</div>`;
  if (e.html) h += `<div class="rich">${rich(e.html)}</div>`;
  if (e.note) h += `<p class="kj-note rich">${rich(e.note)}</p>`;
  return h;
}
function kjUrut(d, on) {
  if (!d.urut || !d.urutan) return '';
  return `<div class="kj-order" aria-label="Urutan kerja">${d.urutan.map((t, i) => `<span${i + 1 === on ? ' class="is-on"' : ''}>${esc(t)}</span>`).join('<em>→</em>')}</div>`;
}
function kjPane(d, i) {
  const x = (d.catatan || [])[i];
  if (!x) {
    const t = d.inti || {};
    return `<span class="kj-lbl">Inti</span>${t.judul ? `<h4 class="rich">${rich(t.judul)}</h4>` : ''}${kjUrut(d, 0)}${t.html ? `<div class="rich kj-body">${rich(t.html)}</div>` : ''}${kjEfek(t.efek)}<p class="kj-note">Klik baris kode untuk melihat arti dan efeknya.</p>`;
  }
  const at = x.at || [];
  const range = at.length > 1 ? `Baris ${at[0] + 1}–${at[at.length - 1] + 1}` : `Baris ${at[0] + 1}`;
  const ord = d.urut ? d.urut[at[0]] : 0;
  return `<span class="kj-lbl">${range}${ord ? ` · dikerjakan ke-${ord}` : ''}</span><h4 class="rich">${rich(x.judul)}</h4>
    <div class="rich kj-body">${rich(x.arti)}</div>${kjUrut(d, ord)}
    ${x.efek ? `<span class="kj-cap">Efek</span>${kjEfek(x.efek)}` : ''}
    ${x.keliru ? `<p class="kj-bad rich"><b>Sering keliru.</b> ${rich(x.keliru)}</p>` : ''}
    <button type="button" class="kj-back" data-kj-back>← Kembali ke inti</button>`;
}
function kjOwner(d) {
  const own = {};
  (d.catatan || []).forEach((x, i) => (x.at || []).forEach(l => { own[l] = i; }));
  return own;
}
function kjShow(n, i, focusBack) {
  const b = BLOCKS[n], box = document.querySelector('#blk-' + n + ' .kj');
  if (!b || !box) return;
  b.state.i = i;
  const x = (b.def.catatan || [])[i], at = x ? x.at || [] : [];
  box.querySelectorAll('.kj-ln').forEach(el => {
    const l = +el.dataset.l;
    el.classList.toggle('is-on', at[0] === l);
    el.classList.toggle('is-grp', at.length > 1 && at[0] !== l && at.includes(l));
  });
  box.querySelector('.kj-pane').innerHTML = kjPane(b.def, i);
  if (focusBack != null) { const el = box.querySelector(`.kj-ln[data-l="${focusBack}"]`); if (el) el.focus(); }
}
const KODE_JELAS_BLOCK = {
  init: () => ({ i: -1 }),
  render(d, s, n) {
    const own = kjOwner(d), lang = d.lang || '';
    const lines = (d.kode || []).map((src, l) => {
      const has = own[l] !== undefined, x = has ? d.catatan[own[l]] : null;
      const at = x ? x.at : [];
      const mk = d.urut && d.urut[l] ? `<i class="kj-ord">${d.urut[l]}</i>` : has && at[0] === l ? '<i class="kj-dot"></i>' : '';
      const cls = has && s.i === own[l] ? (at[0] === l ? ' is-on' : at.length > 1 ? ' is-grp' : '') : '';
      const inner = `<span class="kj-no">${l + 1}</span><span class="kj-mk">${mk}</span><span class="kj-src">${kjHi(src, lang)}</span>`;
      return has ? `<button type="button" class="kj-ln${cls}" data-l="${l}" ${act(n, 'line', own[l])}>${inner}</button>` : `<div class="kj-ln is-plain">${inner}</div>`;
    }).join('');
    return `<div class="kj"><div class="kj-code" role="group" aria-label="Kode ${esc(d.file || '')}"><div class="kj-top"><span>${esc(d.file || '')}</span><span>klik baris</span></div><div class="kj-lines">${lines}</div></div>
      <div class="kj-pane" aria-live="polite">${kjPane(d, s.i)}</div></div>`;
  },
  on: {
    line(d, s, a, n) { const i = +a; kjShow(n, s.i === i ? -1 : i); return false; }
  }
};
document.addEventListener('click', e => {
  const back = e.target.closest('[data-kj-back]'); if (!back) return;
  const blk = back.closest('[id^="blk-"]'); if (!blk) return;
  const n = +blk.id.slice(4), b = BLOCKS[n]; if (!b) return;
  const x = (b.def.catatan || [])[b.state.i];
  kjShow(n, -1, x && x.at ? x.at[0] : null);
});
document.addEventListener('keydown', e => {
  const el = e.target.closest && e.target.closest('button.kj-ln'); if (!el) return;
  const box = el.closest('.kj'), btns = [...box.querySelectorAll('button.kj-ln')], at = btns.indexOf(el);
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const nb = btns[Math.max(0, Math.min(btns.length - 1, at + (e.key === 'ArrowDown' ? 1 : -1)))];
    if (nb === el) return;
    nb.focus();
    const blk = nb.closest('[id^="blk-"]'), n = +blk.id.slice(4);
    if (BLOCKS[n]) kjShow(n, +nb.dataset.arg);
  } else if (e.key === 'Escape') {
    const blk = el.closest('[id^="blk-"]'), n = +blk.id.slice(4);
    if (BLOCKS[n] && BLOCKS[n].state.i >= 0) kjShow(n, -1);
  }
});
