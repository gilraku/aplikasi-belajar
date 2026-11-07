// Lab Algoritma: penelusur loop C++ (blok "trace-lab"). Jejaknya sudah disiapkan di sumber/lab_alp.js;
// di sini hanya ditampilkan langkah demi langkah, dengan pertanyaan "Tebak dulu" di titik penting.
const TRACE_LAB = {
  init: () => ({ c: 0, k: -1, q: null, ans: {}, last: null }),
  render(d, s, n) {
    const cs = (d.cases || [])[s.c]; if (!cs) return '';
    const panes = cs.panes || [];
    const total = Math.max(...panes.map(p => p.steps.length));
    const at = p => p.steps[Math.min(s.k, p.steps.length - 1)];
    const done = s.k >= total - 1;
    const btn = (text, action, arg = '', cls = '', dis = false, label = '') => `<button ${act(n, action, arg)} ${dis ? 'disabled' : ''} ${label ? `aria-label="${label}"` : ''} class="px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed ${cls || 'bg-slate-100 text-slate-700 hover:bg-indigo-100'}">${text}</button>`;
    const tabs = (d.cases || []).length > 1 ? `<div class="flex flex-wrap gap-2 mb-3" role="group" aria-label="Pilih kasus">${d.cases.map((c, i) =>
      `<button ${act(n, 'pick', i)} aria-pressed="${i === s.c}" class="px-3 py-1.5 rounded-lg text-xs font-bold border-[1.5px] ${i === s.c ? 'border-ink bg-ink text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-ink'}">${esc(c.label)}</button>`).join('')}</div>` : '';

    const code = (p, st) => `<pre class="trc-code bg-slate-900 text-slate-100 rounded-xl py-2 text-[12px] sm:text-[13px] leading-6 font-mono overflow-x-auto" aria-label="Kode ${esc(p.title || '')}">${p.code.map((line, i) => {
      const cur = st && st.l === i;
      let html = hlCpp(line);
      if (cur && st.p) { const j = line.indexOf(st.p); if (j >= 0) html = hlCpp(line.slice(0, j)) + `<mark class="trc-hl">${hlCpp(st.p)}</mark>` + hlCpp(line.slice(j + st.p.length)); }
      return `<div class="trc-line${cur ? ' trc-cur' : ''}"><span class="trc-no">${i + 1}</span><span>${html || ' '}</span></div>`;
    }).join('')}</pre>`;

    // Kondisi terakhir yang dicek sampai langkah ini (yang baru saja dicek ditandai)
    const lastCond = (p, k) => { for (let i = Math.min(k, p.steps.length - 1); i >= 0; i--) if (p.steps[i].c) return { c: p.steps[i].c, now: i === k }; return null; };
    const vars = st => Object.keys(st.v).length ? Object.entries(st.v).map(([key, val]) =>
      `<div class="flex items-baseline justify-between gap-3 py-1"><span class="font-mono text-sm text-slate-600">${esc(key)}</span><span class="font-mono text-lg font-bold text-ink ${(st.ch || []).includes(key) ? 'stabilo trc-chg' : ''}">${esc(val)}</span></div>`).join('')
      : '<div class="py-1 text-sm text-slate-500">belum ada nilai</div>';
    const state = (p, compact) => {
      const st = s.k < 0 ? null : at(p);
      const lc = st ? lastCond(p, s.k) : null;
      const fin = st && s.k >= p.steps.length - 1;
      return `<div class="rounded-xl border-[1.5px] border-ink bg-white p-3 space-y-2 min-w-0">
        ${compact ? '' : `<div class="flex items-baseline justify-between gap-3 text-xs font-bold uppercase tracking-wider text-slate-500"><span>Keadaan</span><span>${s.k < 0 ? 'belum mulai' : `langkah ${s.k + 1} / ${total}`}</span></div>`}
        <div class="divide-y divide-slate-100">${st ? vars(st) : '<div class="py-1 text-sm text-slate-500">Tekan Langkah Berikutnya untuk mulai.</div>'}</div>
        <div class="flex flex-wrap items-center gap-2 text-sm"><span class="text-slate-600">Kondisi</span>${lc ? `<span class="font-mono trc-mono font-bold">${esc(lc.c.t)}</span><span class="px-2 py-0.5 rounded-md text-xs font-bold ${lc.c.r ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'} ${lc.now ? 'ring-2 ring-offset-1 ring-ink' : ''}">${lc.c.r}</span>` : '<span class="text-slate-400">belum dicek</span>'}</div>
        <div><span class="block text-xs font-semibold text-slate-600 mb-1">Output${fin ? ' akhir' : ''}</span><div class="rounded-lg bg-slate-900 text-emerald-200 font-mono text-sm px-3 py-2 min-h-[2.25rem] whitespace-pre-wrap break-words" role="status">${esc(st ? st.o : '')}${fin ? '' : '<span class="trc-caret">▍</span>'}</div></div>
      </div>`;
    };
    const note = (p, label) => { const st = s.k < 0 ? null : at(p); if (!st || s.k > p.steps.length - 1) return label ? `<p class="text-xs text-slate-500"><strong>${esc(label)}:</strong> sudah selesai.</p>` : ''; return st.x ? `<p class="text-sm text-slate-800 rich">${label ? `<strong>${esc(label)}:</strong> ` : ''}${rich(st.x)}</p>` : ''; };

    const body = panes.length > 1
      ? `<div class="grid gap-3 md:grid-cols-2">${panes.map(p => `<div class="space-y-2 min-w-0"><div class="font-display font-extrabold text-ink"><span class="stabilo">${esc(p.title)}</span></div>${code(p, s.k < 0 ? null : at(p))}${state(p, true)}</div>`).join('')}</div>`
      : `<div class="grid gap-3 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">${code(panes[0], s.k < 0 ? null : at(panes[0]))}${state(panes[0], false)}</div>`;

    // Kotak penjelasan / pertanyaan
    const a = s.q != null ? cs.asks[s.q] : null;
    const answered = s.last != null ? cs.asks[s.last] : null;
    let box;
    if (a) box = `<div class="rounded-xl border-[1.5px] border-ink bg-indigo-50 p-3 sm:p-4 space-y-2" role="group" aria-label="Tebak dulu">
        <p class="text-sm font-bold text-ink">🤔 Tebak dulu: <span class="font-normal rich">${rich(a.q)}</span></p>
        <div class="flex flex-wrap gap-2">${a.opts.map((o, i) => `<button ${act(n, 'answer', i)} class="px-3 py-2 rounded-lg text-sm font-mono trc-mono bg-white border-[1.5px] border-slate-300 hover:border-ink text-left">${esc(o)}</button>`).join('')}</div>
      </div>`;
    else {
      const verdict = (q, i) => `<p class="text-sm font-bold ${s.ans[i] === q.ans ? 'text-emerald-800' : 'text-rose-700'}">${s.ans[i] === q.ans ? '✓ Tebakanmu tepat.' : `✗ Belum tepat. Jawabannya: <span class="font-mono">${esc(q.opts[q.ans])}</span>`}</p>${q.why ? `<p class="text-sm text-slate-700 rich">${rich(q.why)}</p>` : ''}`;
      const later = Object.keys(cs.asks || {}).filter(i => cs.asks[i].later && s.ans[i] != null);
      const fb = answered && answered.later ? `<p class="text-sm font-bold text-ink">📝 Tebakanmu dicatat: <span class="font-mono">${esc(answered.opts[s.ans[s.last]])}</span>. Cocokkan di langkah terakhir.</p>` : answered ? verdict(answered, s.last) : '';
      const notes = s.k < 0 ? `<p class="text-sm text-slate-700 rich">${rich(cs.intro || 'Tekan Langkah Berikutnya untuk mulai.')}</p>` : panes.map(p => note(p, panes.length > 1 ? p.title : '')).join('');
      const sum = done ? `<div class="pt-2 mt-1 border-t border-slate-200 space-y-1">${panes.map(p => { const m = p.sum;
        return `<p class="text-sm text-slate-800">${panes.length > 1 ? `<strong>${esc(p.title)}:</strong> ` : '📋 '}kondisi loop dicek <strong>${m.checks} kali</strong> (${m.trues} true${m.checks - m.trues ? ', ' + (m.checks - m.trues) + ' false' : ''}), badan loop dijalankan <strong>${m.rounds} kali</strong>${m.broke ? ', lalu dihentikan oleh <code>break</code>' : ''}.</p>`; }).join('')}</div>` : '';
      const end = done ? later.map(i => verdict(cs.asks[i], i)).join('') : '';
      box = `<div class="rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 sm:p-4 space-y-1.5" aria-live="polite">${fb}${notes}${sum}${end}</div>`;
    }

    return `${tabs}${body}<div class="mt-3">${box}</div>
      <div class="mt-3 flex items-center gap-2">
        ${btn('↺<span class="hidden sm:inline"> Ulang</span>', 'reset', '', '', s.k < 0 && s.q == null, 'Ulang dari awal')}
        ${btn('←<span class="hidden sm:inline"> Mundur</span>', 'back', '', '', s.k < 0 || s.q != null, 'Mundur satu langkah')}
                ${btn(done ? 'Selesai ✓' : '<span class="sm:hidden">Lanjut</span><span class="hidden sm:inline">Langkah Berikutnya</span> →', 'next', '', 'ml-auto bg-indigo-600 text-white hover:bg-indigo-700 px-4', done || s.q != null)}
      </div>`;
  },
  on: {
    pick(d, s, i) { Object.assign(s, TRACE_LAB.init(), { c: +i }); },
    reset(d, s) { Object.assign(s, TRACE_LAB.init(), { c: s.c }); },
    back(d, s) { if (s.k >= 0) { s.k--; s.last = null; } },
    next(d, s) {
      const cs = d.cases[s.c], total = Math.max(...cs.panes.map(p => p.steps.length));
      if (s.q != null || s.k >= total - 1) return;
      const k = s.k + 1; s.last = null;
      if (cs.asks && cs.asks[k] && s.ans[k] == null) { s.q = k; return; }
      s.k = k;
    },
    answer(d, s, i) {
      if (s.q == null) return;
      s.ans[s.q] = +i; s.k = s.q; s.last = s.q; s.q = null;
    }
  }
};
