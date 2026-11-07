'use strict';
/* =====================================================================
   APLIKASI BELAJAR INTERAKTIF — mesin umum untuk semua mata kuliah & pertemuan.
   VERSI ASTRO (web/): disalin dari sumber/engine.html lalu diubah seperlunya.
   - <script id="library-data"> hanya berisi INDEKS RINGAN (judul pertemuan + ringkasan
     jumlah soal/flashcard untuk % kesiapan). Isi lengkap tiap pertemuan diambil dari
     data/<matkul>/<pertemuan>.json saat pertemuan itu dibuka.
   - Fitur "Unduh .html mandiri" memakai offline.html (aplikasi satu file versi lama).
   ===================================================================== */

// ---------- Ambil sumber halaman (untuk fitur unduh .html mandiri) ----------
const assetUrl = f => (APP.base || './') + f + (APP.v ? '?v=' + APP.v : '');
let PAGE_SOURCE = null;
async function fetchText(url) { const r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); }
async function pageSource() {
  if (!PAGE_SOURCE) PAGE_SOURCE = new DOMParser().parseFromString(await fetchText(assetUrl('offline.html')), 'text/html').documentElement;
  return PAGE_SOURCE;
}

// ---------- Util ----------
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slug = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'materi';
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

// HTML sederhana yang diizinkan di dalam materi (keamanan untuk materi impor)
const ALLOWED_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'CODE', 'BR', 'UL', 'OL', 'LI', 'P', 'SPAN', 'SUB', 'SUP', 'MARK', 'SMALL', 'PRE', 'KBD', 'S', 'DEL']);
const DROP_TAGS = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'TEMPLATE', 'NOSCRIPT', 'SVG', 'MATH', 'FORM', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'IMG', 'VIDEO', 'AUDIO']);
function cleanNode(node) {
  [...node.childNodes].forEach(ch => {
    if (ch.nodeType === 1) {
      if (DROP_TAGS.has(ch.tagName)) { ch.remove(); return; }
      cleanNode(ch);
      if (!ALLOWED_TAGS.has(ch.tagName)) { ch.replaceWith(...ch.childNodes); return; }
      [...ch.attributes].forEach(a => ch.removeAttribute(a.name));
    } else if (ch.nodeType !== 3) ch.remove();
  });
}
const AR_RUN = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿](?:[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿\s‌‍]*[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿])?/g;
function wrapArabic(doc, root) {
  const w = doc.createTreeWalker(root, 4); const nodes = [];
  while (w.nextNode()) if (/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(w.currentNode.nodeValue)) nodes.push(w.currentNode);

  nodes.forEach(t => {
    const s = t.nodeValue, frag = doc.createDocumentFragment(); let last = 0;
    s.replace(AR_RUN, (m, i) => { if (i > last) frag.append(s.slice(last, i)); const sp = doc.createElement('span'); sp.className = 'ar'; sp.setAttribute('dir', 'rtl'); sp.setAttribute('lang', 'ar'); sp.textContent = m; frag.append(sp); last = i + m.length; return m; });
    if (last < s.length) frag.append(s.slice(last));
    t.replaceWith(frag);
  });
}
function hlHtml(src) {
  return esc(src || '')
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-slate-500 italic">$1</span>')
    .replace(/(&lt;\/?)([a-zA-Z!][\w-]*)/g, '$1<span class="text-rose-300">$2</span>')
    .replace(/(\s)([a-zA-Z-:]+)=(&quot;.*?&quot;)/g, '$1<span class="text-sky-300">$2</span>=<span class="text-amber-200">$3</span>');
}
function hlCpp(src) {
  const KW = /^(int|float|double|char|bool|string|void|return|if|else|switch|case|break|default|while|do|for|const|using|namespace|true|false|long|short|unsigned|continue|auto|std|cout|cin|endl)$/;
  return esc(src || '').replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(&quot;[\s\S]*?&quot;|&#39;(?:\\.|[^&]|&(?!#39;)[^;]*;)*?&#39;)|(#\w+)|\b([A-Za-z_]\w*)\b/g, (m, cm, st, pp, w) =>
    cm ? '<span class="text-slate-500 italic">' + cm + '</span>' : st ? '<span class="text-amber-200">' + st + '</span>' : pp ? '<span class="text-rose-300">' + pp + '</span>' : KW.test(w) ? '<span class="text-sky-300">' + w + '</span>' : w);
}
function pgCheck(d, code) {
  const doc = new DOMParser().parseFromString(code || '', 'text/html');
  const clean = (code || '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/<!--[\s\S]*?-->/g, '');
  const cleanX = d.lang === 'cpp' ? clean.replace(/\/\/[^\n]*/g, '') : clean;
  return (d.tasks || []).map(t => {
    try {
      if (t.regex && !new RegExp(t.regex, t.cs ? '' : 'i').test(t.raw ? (code || '') : cleanX)) return false;
      if (t.sel) { const els = [...doc.querySelectorAll(t.sel)].filter(e => !t.hasText || e.textContent.trim()); if (els.length < (t.min || 1)) return false; }
      return true;
    } catch (e) { return false; }
  });
}
const PG_BRIDGE = n => `<script>(function(){var N=${n};function s(t,a){try{parent.postMessage({__pg:N,t:t,m:Array.prototype.map.call(a,function(x){if(x===undefined)return 'undefined';try{return typeof x==='object'&&x!==null?JSON.stringify(x):String(x)}catch(e){return String(x)}}).join(' ')},'*')}catch(e){}}['log','info','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){s(k,arguments);try{o.apply(console,arguments)}catch(e){}}});var A=window.alert,P=window.prompt,C=window.confirm;window.alert=function(m){s('alert',[m]);try{A.call(window,m)}catch(e){}};window.prompt=function(m,d){var r=null;try{r=P.call(window,m,d===undefined?'':d)}catch(e){}s('prompt',[m+'  →  '+(r===null?'null (dibatalkan/diblokir)':JSON.stringify(r))]);return r};window.confirm=function(m){var r=false;try{r=C.call(window,m)}catch(e){}s('confirm',[m+'  →  '+r]);return r};window.addEventListener('error',function(e){s('error',[e.message+(e.lineno?'  (baris '+e.lineno+')':'')])});})();<\/script>`;
function pgDoc(d, code, n) {
  if (!d.js) return code;
  const b = PG_BRIDGE(n);
  return /<head[^>]*>/i.test(code) ? code.replace(/<head[^>]*>/i, m => m + b) : b + code;
}
const PG_COLORS = { log: 'text-slate-200', info: 'text-sky-300', warn: 'text-amber-300', error: 'text-rose-400', alert: 'text-emerald-300', prompt: 'text-violet-300', confirm: 'text-violet-300' };
const PG_ICON = { alert: '🔔 alert: ', prompt: '⌨️ prompt: ', confirm: '❓ confirm: ', error: '❌ ', warn: '⚠️ ' };
window.addEventListener('message', e => {
  const m = e.data; if (!m || typeof m !== 'object' || m.__pg == null) return;
  const f = document.getElementById('pg-frame-' + m.__pg); if (!f || e.source !== f.contentWindow) return;
  const box = document.getElementById('pg-console-' + m.__pg); if (!box) return;
  if (box.dataset.fresh !== '1') { box.innerHTML = ''; box.dataset.fresh = '1'; }
  const line = document.createElement('div'); line.className = (PG_COLORS[m.t] || 'text-slate-200') + ' whitespace-pre-wrap break-words';
  line.textContent = (PG_ICON[m.t] || '› ') + String(m.m).slice(0, 2000); box.appendChild(line); box.scrollTop = box.scrollHeight;
});
let pgTimer;
document.addEventListener('input', e => {
  const el = e.target.closest('[data-pg]'); if (!el) return;
  const n = +el.dataset.pg; const b = BLOCKS[n];
  clearTimeout(pgTimer); pgTimer = setTimeout(() => {
    const f = document.getElementById('pg-frame-' + n); if (!f) return;
    const box = document.getElementById('pg-console-' + n); if (box) { box.innerHTML = '<div class="text-slate-500">// belum ada output</div>'; box.dataset.fresh = ''; }
    f.srcdoc = pgDoc(b ? b.def : {}, el.value, n);
  }, b && b.def.js ? 700 : 250);
});
document.addEventListener('keydown', e => {
  const el = e.target.closest && e.target.closest('[data-pg]'); if (!el || e.key !== 'Tab') return;
  e.preventDefault(); const a = el.selectionStart, b = el.selectionEnd; el.value = el.value.slice(0, a) + '  ' + el.value.slice(b); el.selectionStart = el.selectionEnd = a + 2; el.dispatchEvent(new Event('input', { bubbles: true }));
});
const richCache = new Map();
function rich(s) {
  if (s == null || s === '') return '';
  s = String(s);
  if (richCache.has(s)) return richCache.get(s);
  let t = s.replace(/`([^`\n]+)`/g, (m, c) => '<code>' + esc(c) + '</code>').replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  if (!/<(br|ul|ol|li|p|pre)\b/i.test(t)) t = t.replace(/\n/g, '<br>');
  const doc = new DOMParser().parseFromString('<div>' + t + '</div>', 'text/html');
  const root = doc.body.firstChild;
  cleanNode(root);
  wrapArabic(doc, root);
  const out = root.innerHTML;
  richCache.set(s, out);
  return out;
}

function showToast(message, type = 'info') {
  const bg = type === 'success' ? 'bg-emerald-600' : type === 'warning' ? 'bg-amber-600' : type === 'error' ? 'bg-rose-600' : 'bg-slate-900';
  const t = document.createElement('div');
  t.className = `${bg} text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold pointer-events-auto transition-all duration-300`;
  t.textContent = message;
  $('toastContainer').appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3400);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch (e2) {}
    ta.remove(); return ok;
  }
}
function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- Warna (tone) ----------
const TONES = {
  indigo: { soft: 'bg-indigo-50 border-indigo-200 text-indigo-950', solid: 'bg-indigo-600 text-white border-indigo-600', badge: 'bg-indigo-100 text-indigo-800', text: 'text-indigo-700' },
  rose: { soft: 'bg-rose-50 border-rose-200 text-rose-950', solid: 'bg-rose-600 text-white border-rose-600', badge: 'bg-rose-100 text-rose-800', text: 'text-rose-700' },
  emerald: { soft: 'bg-emerald-50 border-emerald-200 text-emerald-950', solid: 'bg-emerald-600 text-white border-emerald-600', badge: 'bg-emerald-100 text-emerald-800', text: 'text-emerald-700' },
  amber: { soft: 'bg-amber-50 border-amber-200 text-amber-950', solid: 'bg-amber-500 text-white border-amber-500', badge: 'bg-amber-100 text-amber-800', text: 'text-amber-700' },
  sky: { soft: 'bg-sky-50 border-sky-200 text-sky-950', solid: 'bg-sky-600 text-white border-sky-600', badge: 'bg-sky-100 text-sky-800', text: 'text-sky-700' },
  violet: { soft: 'bg-violet-50 border-violet-200 text-violet-950', solid: 'bg-violet-600 text-white border-violet-600', badge: 'bg-violet-100 text-violet-800', text: 'text-violet-700' },
  slate: { soft: 'bg-slate-50 border-slate-200 text-slate-800', solid: 'bg-slate-900 text-white border-slate-900', badge: 'bg-slate-200 text-slate-700', text: 'text-slate-700' }
};
const TONE_ALIAS = { info: 'sky', tip: 'indigo', warn: 'amber', warning: 'amber', danger: 'rose', error: 'rose', success: 'emerald', ok: 'emerald', red: 'rose', green: 'emerald', blue: 'sky', yellow: 'amber', purple: 'violet', gray: 'slate' };
const tone = (t, d = 'indigo') => TONES[TONE_ALIAS[t] || t] || TONES[TONE_ALIAS[d] || d];
const BTN_IDLE = 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50';

// ---------- Perpustakaan materi (bawaan + impor) ----------
let BUILTIN = [];
try { BUILTIN = JSON.parse($('library-data').textContent); } catch (e) { BUILTIN = []; }
if (!Array.isArray(BUILTIN)) BUILTIN = BUILTIN && BUILTIN.courses ? BUILTIN.courses : [];
let APP = {};
try { APP = JSON.parse($('app-config').textContent) || {}; } catch (e) {}
let PROMPT_TEMPLATE = '';
try { PROMPT_TEMPLATE = JSON.parse($('prompt-data').textContent); } catch (e) {}
const IMPORT_KEY = 'belajar:imported:v1';
let LIB = [];

function normalizeMeeting(m, i) {
  m = Object.assign({}, m);
  m.nomor = m.nomor != null ? m.nomor : (i + 1);
  m.id = slug(m.id || ('p' + m.nomor));
  m.judul = m.judul || ('Pertemuan ' + m.nomor);
  m.ujian = m.ujian || 'Ujian';
  ['materi', 'cheatsheet', 'simulator', 'flashcards', 'quiz'].forEach(k => { if (!Array.isArray(m[k])) m[k] = []; });
  m.quiz = m.quiz.filter(q => q && Array.isArray(q.opts) && q.opts.length >= 2).map(q => {
    let ans = Number(q.ans);
    if (!(ans >= 0 && ans < q.opts.length)) ans = 0;
    return Object.assign({}, q, { ans });
  });
  m.flashcards = m.flashcards.filter(f => f && (f.q || f.a));
  return m;
}
function normalizeCourse(c) {
  c = Object.assign({}, c);
  c.nama = c.nama || c.name || 'Mata Kuliah';
  c.id = slug(c.id || ((c.kode ? c.kode + '-' : '') + c.nama));
  c.meetings = (Array.isArray(c.meetings) ? c.meetings : []).map(normalizeMeeting);
  return c;
}
// Terima berbagai bentuk JSON: kursus, array kursus, {courses:[]}, atau satu pertemuan + {course}
function coursesFromJSON(obj) {
  if (Array.isArray(obj)) return obj.flatMap(coursesFromJSON);
  if (!obj || typeof obj !== 'object') throw new Error('Format tidak dikenali');
  if (Array.isArray(obj.courses)) return obj.courses.map(normalizeCourse);
  if (Array.isArray(obj.meetings)) return [normalizeCourse(obj)];
  if (obj.meeting && obj.course) return [normalizeCourse(Object.assign({}, obj.course, { meetings: [obj.meeting] }))];
  if (obj.cheatsheet || obj.quiz || obj.flashcards) {
    const c = obj.course || { nama: obj.mataKuliah || obj.mata_kuliah || 'Mata Kuliah Lain', kode: obj.kode };
    return [normalizeCourse(Object.assign({}, c, { meetings: [obj] }))];
  }
  throw new Error('JSON tidak memiliki "meetings", "quiz", atau "flashcards"');
}
function mergeCourses(base, extra, markImported) {
  const out = base.map(c => Object.assign({}, c, { meetings: c.meetings.slice() }));
  extra.forEach(ec => {
    let c = out.find(x => x.id === ec.id);
    if (!c) { c = Object.assign({}, ec, { meetings: [] }); out.push(c); }
    else ['kode', 'nama', 'kampus', 'prodi', 'dosen'].forEach(k => { if (ec[k]) c[k] = ec[k]; });
    ec.meetings.forEach(m => {
      const mm = markImported ? Object.assign({}, m, { _imported: true }) : m;
      const idx = c.meetings.findIndex(x => x.id === m.id);
      if (idx >= 0) c.meetings[idx] = mm; else c.meetings.push(mm);
    });
    c.meetings.sort((a, b) => (Number(a.nomor) || 0) - (Number(b.nomor) || 0));
  });
  return out;
}
function loadLibrary() {
  const base = BUILTIN.map(normalizeCourse);
  let imported = [];
  try { imported = (store.get(IMPORT_KEY, []) || []).map(normalizeCourse); } catch (e) { imported = []; }
  LIB = mergeCourses(base, imported, true);
}
function saveImported(newCourses) {
  const current = (store.get(IMPORT_KEY, []) || []).map(normalizeCourse);
  const merged = mergeCourses(current, newCourses, false).map(c => Object.assign({}, c, { meetings: c.meetings.map(m => { const x = Object.assign({}, m); delete x._imported; return x; }) }));
  const ok = store.set(IMPORT_KEY, merged);
  loadLibrary();
  return ok;
}
function deleteImported(courseId, meetingId) {
  const current = (store.get(IMPORT_KEY, []) || []).map(normalizeCourse);
  const c = current.find(x => x.id === courseId);
  if (c) c.meetings = c.meetings.filter(m => m.id !== meetingId);
  store.set(IMPORT_KEY, current.filter(x => x.meetings.length));
  loadLibrary();
}
const findCourse = id => LIB.find(c => c.id === id);
const findMeeting = (c, id) => c && c.meetings.find(m => m.id === id);
const stripMeta = m => { const x = JSON.parse(JSON.stringify(m)); delete x._imported; return x; };

// ---------- Progres belajar (per orang, per browser) ----------
/* Semua progres disimpan sebagai SATU dokumen berversi:
     { v: 1, meetings: { "<courseId>/<meetingId>": { visited, interacted, mastered, quiz, updatedAt } },
       last: { hash, at }, updatedAt }
   Penyimpanan dibungkus "adapter" (saat ini localStorage). Untuk sinkron cloud nanti (Supabase/Firebase)
   cukup buat adapter baru dengan load()/save()/clear() yang sama, lalu panggil PROGRESS.useAdapter(...). */
const PROGRESS_VERSION = 1;
const PROGRESS_KEY = 'belajar:progress:v' + PROGRESS_VERSION;
const LEGACY_PROGRESS_PREFIX = 'belajar:progress:';
const localProgressAdapter = {
  name: 'localStorage',
  load() { return store.get(PROGRESS_KEY, null); },
  save(doc) { return store.set(PROGRESS_KEY, doc); },
  clear() { store.del(PROGRESS_KEY); }
};
const PROGRESS = (() => {
  let adapter = localProgressAdapter, doc = null, warned = false;
  const empty = () => ({ v: PROGRESS_VERSION, meetings: {}, last: null, updatedAt: 0 });
  const arr = x => Array.isArray(x) ? x : [];
  const cleanRec = r => {
    r = r && typeof r === 'object' ? r : {};
    const quiz = {};
    if (r.quiz && typeof r.quiz === 'object') Object.entries(r.quiz).forEach(([k, v]) => { if (/^\d+$/.test(k) && Number.isInteger(v) && v >= 0) quiz[k] = v; });
    return { visited: arr(r.visited).filter(x => typeof x === 'string'), interacted: arr(r.interacted).filter(x => typeof x === 'string'),
      mastered: arr(r.mastered).filter(x => Number.isInteger(x) && x >= 0), quiz, updatedAt: Number(r.updatedAt) || 0 };
  };
  // Ubah data versi lama (atau hasil impor) ke bentuk versi sekarang.
  function migrate(d) {
    if (!d || typeof d !== 'object') return empty();
    const out = empty();
    const v = Number(d.v) || 0;
    if (v > PROGRESS_VERSION) throw new Error('Data progres berasal dari versi aplikasi yang lebih baru');
    // v1 (saat ini). Versi berikutnya: tambahkan langkah "if (v < 2) {...}" di sini.
    Object.entries(d.meetings && typeof d.meetings === 'object' ? d.meetings : {}).forEach(([k, r]) => { if (k.includes('/')) out.meetings[k] = cleanRec(r); });
    if (d.last && typeof d.last.hash === 'string' && d.last.hash.startsWith('#/')) out.last = { hash: d.last.hash, at: Number(d.last.at) || 0 };
    out.updatedAt = Number(d.updatedAt) || 0;
    return out;
  }
  // Progres format lama (satu key per pertemuan, tanpa versi) → dokumen v1, lalu key lama dihapus.
  function importLegacy(d) {
    const keys = [];
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(LEGACY_PROGRESS_PREFIX) && !/^belajar:progress:v\d+$/.test(k)) keys.push(k); } } catch (e) { return false; }
    keys.forEach(k => { const id = k.slice(LEGACY_PROGRESS_PREFIX.length); if (!d.meetings[id]) d.meetings[id] = cleanRec(store.get(k, {})); });
    if (keys.length && adapter.save(d)) keys.forEach(k => store.del(k));
    return keys.length > 0;
  }
  function load() {
    if (doc) return doc;
    try { doc = migrate(adapter.load()); } catch (e) { doc = empty(); }
    if (adapter === localProgressAdapter) importLegacy(doc);
    return doc;
  }
  function persist() {
    doc.updatedAt = Date.now();
    const ok = adapter.save(doc);
    if (!ok && !warned) { warned = true; showToast('Browser ini tidak mengizinkan penyimpanan. Progres hanya bertahan sampai halaman ditutup.', 'warning'); }
    return ok;
  }
  const uniq = (a, b) => [...new Set([...(a || []), ...(b || [])])];
  return {
    get adapterName() { return adapter.name; },
    useAdapter(a) { adapter = a; doc = null; },
    getMeeting(id) { return load().meetings[id] || null; },
    setMeeting(id, rec) { load().meetings[id] = Object.assign(cleanRec(rec), { updatedAt: Date.now() }); return persist(); },
    getLast() { return load().last; },
    setLast(hash) { const d = load(); if (d.last && d.last.hash === hash) return; d.last = { hash, at: Date.now() }; persist(); },
    stats() {
      const d = load(), ms = Object.values(d.meetings);
      return { meetings: ms.filter(r => r.visited.length || r.interacted.length || r.mastered.length || Object.keys(r.quiz).length).length,
        quiz: ms.reduce((s, r) => s + Object.keys(r.quiz).length, 0), mastered: ms.reduce((s, r) => s + r.mastered.length, 0), updatedAt: d.updatedAt };
    },
    exportDoc() { return { app: 'aplikasi-belajar-interaktif', kind: 'progress', semester: APP.semester || '', exportedAt: new Date().toISOString(), data: JSON.parse(JSON.stringify(load())) }; },
    // mode 'merge': gabungkan (jawaban kuis dari data yang lebih baru menang); 'replace': timpa semuanya.
    importDoc(obj, mode) {
      const src = migrate(obj && obj.kind === 'progress' && obj.data ? obj.data : obj);
      const n = Object.keys(src.meetings).length;
      if (!n && !src.last) throw new Error('Tidak ada data progres di dalam file');
      if (mode === 'replace') doc = src;
      else {
        const d = load();
        Object.entries(src.meetings).forEach(([id, r]) => {
          const cur = d.meetings[id]; if (!cur) { d.meetings[id] = r; return; }
          const newer = r.updatedAt >= cur.updatedAt;
          d.meetings[id] = { visited: uniq(cur.visited, r.visited), interacted: uniq(cur.interacted, r.interacted), mastered: uniq(cur.mastered, r.mastered),
            quiz: newer ? Object.assign({}, cur.quiz, r.quiz) : Object.assign({}, r.quiz, cur.quiz), updatedAt: Math.max(cur.updatedAt, r.updatedAt) };
        });
        if (src.last && (!d.last || src.last.at > d.last.at)) d.last = src.last;
      }
      persist();
      return n;
    },
    reset() { doc = empty(); persist(); }
  };
})();
const progId = (c, m) => `${c.id}/${m.id}`;
function loadProgress(c, m) {
  const p = PROGRESS.getMeeting(progId(c, m)) || {};
  return { visited: new Set(p.visited || []), interacted: new Set(p.interacted || []), mastered: new Set(p.mastered || []), quiz: Object.assign({}, p.quiz || {}) };
}
function saveProgress() {
  if (!S.course || !S.meeting) return;
  const p = S.prog;
  PROGRESS.setMeeting(progId(S.course, S.meeting), { visited: [...p.visited], interacted: [...p.interacted], mastered: [...p.mastered], quiz: p.quiz });
}
const fcCount = m => m._lazy ? m._sum.fc : m.flashcards.length;
const quizAns = m => m._lazy ? m._sum.ans : m.quiz.map(q => q.ans);
function readiness(m, p, interactiveTotal) {
  const tabs = availableTabs(m).length;
  let pts = 10;
  pts += 20 * Math.min(1, p.visited.size / Math.max(1, tabs));
  pts += interactiveTotal ? 20 * Math.min(1, p.interacted.size / interactiveTotal) : 20;
  const fcN = fcCount(m), ans = quizAns(m);
  pts += fcN ? 20 * Math.min(1, [...p.mastered].filter(i => i < fcN).length / fcN) : 20;
  const score = ans.reduce((s, a, i) => s + (p.quiz[i] === a ? 1 : 0), 0);
  pts += ans.length ? 30 * score / ans.length : 30;
  return Math.round(Math.min(100, pts));
}
function storedReadiness(c, m) {
  const p = loadProgress(c, m);
  const total = m._lazy ? m._sum.ni : countInteractive(m);
  if (!p.visited.size && !p.interacted.size && !p.mastered.size && !Object.keys(p.quiz).length) return 0;
  return readiness(m, p, total);
}

// ---------- State aplikasi ----------
const S = { course: null, meeting: null, tab: 'cheatsheet', prog: null, fcFilter: 'all', interactiveTotal: 0 };
const TAB_DEFS = [
  { id: 'materi', name: m => '📖 Materi Lengkap', short: m => '📖 Materi' },
  { id: 'cheatsheet', name: m => 'Visual Cheat Sheet', short: m => 'Cheat Sheet' },
  { id: 'simulator', name: m => 'Simulator & Studi Kasus', short: m => 'Simulator' },
  { id: 'flashcard', name: m => `Flashcard 3D (${fcCount(m)})`, short: m => `Flashcard (${fcCount(m)})` },
  { id: 'quiz', name: m => `Kuis Simulasi ${m.ujian}`, short: m => 'Kuis' }
];
function availableTabs(m) {
  const list = TAB_DEFS.filter(t => m._lazy ? m._sum.tabs.includes(t.id) : t.id === 'materi' ? (m.materi || []).length : t.id === 'cheatsheet' ? m.cheatsheet.length : t.id === 'simulator' ? m.simulator.length : t.id === 'flashcard' ? m.flashcards.length : m.quiz.length);
  return list.map((t, i) => ({ id: t.id, label: mm => (i + 1) + '. ' + t.name(mm), short: mm => t.short(mm) }));
}
const defaultTab = m => { const t = availableTabs(m); return t.length ? t[0].id : 'cheatsheet'; };

// =====================================================================
//  BLOK MATERI — setiap jenis blok punya fungsi render & aksi
// =====================================================================
const INTERACTIVE = new Set(['say', 'diagram', 'table', 'choices', 'reveal', 'tabs', 'detective', 'terminal', 'exercise', 'playground']);
function countInteractive(m) {
  let n = 0;
  const walk = list => (list || []).forEach(b => {
    if (!b || typeof b !== 'object') return;
    if (INTERACTIVE.has(b.type) && !(b.type === 'table' && !(b.modes || []).length && !(b.headers || []).some(h => h && h.note))) n++;
    if (b.type === 'row') walk(b.blocks);
    if (b.type === 'tabs') (b.tabs || []).forEach(t => walk(t.blocks));
  });
  walk(m.materi); walk(m.cheatsheet); walk(m.simulator);
  return n;
}

let BLOCKS = {}; let blockSeq = 0;
function createBlock(def, path, nested) {
  def = def && typeof def === 'object' ? def : { type: 'text', html: String(def) };
  const r = R[def.type] || R._unknown;
  const n = ++blockSeq;
  BLOCKS[n] = { def, path, nested, r, state: {} };
  BLOCKS[n].state = r.init ? r.init(def, path, n) : {};
  return n;
}
function blockHeader(def) {
  if (!def.label && !def.title && !def.desc && !def.tip) return '';
  return `<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
    <div class="space-y-1 min-w-0">
      ${def.label ? `<span class="inline-block text-[11px] font-bold uppercase tracking-wider text-indigo-600">${rich(def.label)}</span>` : ''}
      ${def.title ? `<h3 class="text-lg sm:text-xl font-extrabold text-slate-900 rich leading-snug">${rich(def.title)}</h3>` : ''}
      ${def.desc ? `<p class="text-sm text-slate-600 rich">${rich(def.desc)}</p>` : ''}
    </div>
    ${def.tip ? `<div class="shrink-0 md:max-w-xs px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 rich">${rich(def.tip)}</div>` : ''}
  </div>`;
}
function blockInner(n) { const b = BLOCKS[n]; return blockHeader(b.def) + b.r.render(b.def, b.state, n); }
function blockHTML(n) {
  const b = BLOCKS[n];
  const cls = b.r.bare ? '' : b.nested ? 'space-y-1' : 'bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6';
  return `<div id="blk-${n}" class="${cls} min-w-0">${blockInner(n)}</div>`;
}
function refreshBlock(n) { const el = $('blk-' + n); if (el) el.innerHTML = blockInner(n); }
function markInteract(n) {
  const b = BLOCKS[n]; if (!b || !S.prog || !INTERACTIVE.has(b.def.type)) return;
  if (!S.prog.interacted.has(b.path)) { S.prog.interacted.add(b.path); saveProgress(); updateReadiness(); }
}
const act = (n, name, arg = '') => `data-blk="${n}" data-act="${name}" data-arg="${esc(arg)}"`;

const R = {
  _unknown: { render: d => `<div class="p-3 rounded-xl bg-slate-100 text-xs text-slate-500">Blok jenis "<code>${esc(d.type)}</code>" belum dikenali aplikasi.</div>` },

  article: { render: d => `<div class="article text-[15px] sm:text-base leading-[1.75] text-slate-700 rich">${rich(d.html || d.text)}</div>` },
  text: { render: d => `<div class="text-sm sm:text-[15px] leading-relaxed text-slate-700 rich">${rich(d.html || d.text)}</div>` },

  ayat: {
    render: d => `<div class="space-y-3">${(d.items || []).map(it => { const t = tone(it.tone, 'emerald');
      return `<div class="p-4 sm:p-5 rounded-xl border ${t.soft}">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          ${it.title ? `<span class="text-xs font-bold rich">${rich(it.title)}</span>` : '<span></span>'}
          ${it.sumber ? `<span class="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold ${t.badge} rich">${rich(it.sumber)}</span>` : ''}
        </div>
        <p class="ayat-ar text-slate-900" dir="rtl" lang="ar">${esc(it.arab || '')}</p>
        ${it.latin ? `<p class="mt-1 text-xs italic text-slate-500 rich">${rich(it.latin)}</p>` : ''}
        ${it.arti ? `<p class="mt-2 text-sm leading-relaxed text-slate-700 rich">“${rich(it.arti)}”</p>` : ''}
        ${it.note ? `<p class="mt-2 text-xs text-slate-600 rich">${rich(it.note)}</p>` : ''}
      </div>`; }).join('')}</div>`
  },

  code: {
    render: d => `<div class="rounded-xl bg-slate-950 text-slate-100 overflow-hidden">
      ${d.file ? `<div class="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">📄 ${esc(d.file)}</div>` : ''}
      <pre class="p-4 text-xs sm:text-[13px] leading-relaxed font-mono overflow-x-auto">${(d.lang === 'cpp' ? hlCpp : hlHtml)(d.code)}</pre></div>
      ${d.note ? `<p class="mt-2 text-xs text-slate-500 rich">${rich(d.note)}</p>` : ''}`
  },

  playground: {
    init: d => ({ values: { code: d.starter || '' }, checked: false }),
    render: (d, s, n) => {
      const code = s.values.code; const res = pgCheck(d, code); const done = res.filter(Boolean).length;
      const cpp = d.lang === 'cpp';
      return `<div class="grid grid-cols-1 ${cpp ? '' : 'lg:grid-cols-2'} gap-3">
        <div class="rounded-xl bg-slate-950 overflow-hidden flex flex-col">
          <div class="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono flex justify-between gap-2"><span>✏️ ${esc(d.file || 'index.html')}</span><span>ketik di sini</span></div>
          <textarea data-field="${n}" data-key="code" data-pg="${n}" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off" class="w-full flex-1 min-h-[18rem] p-4 bg-transparent text-slate-100 font-mono text-xs sm:text-[13px] leading-relaxed outline-none resize-y">${esc(code)}</textarea>
        </div>
${cpp ? `<p class="text-xs text-slate-500">💡 C++ tidak bisa dijalankan di aplikasi ini. Ketik kodenya di sini untuk dicek misinya, lalu salin ke Dev C++ / Code::Blocks / OnlineGDB untuk dijalankan.</p>` : `
        <div class="rounded-xl border border-slate-200 overflow-hidden flex flex-col bg-white">
          <div class="px-3 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-500 flex items-center gap-2"><span class="flex gap-1"><i class="w-2.5 h-2.5 rounded-full bg-rose-400"></i><i class="w-2.5 h-2.5 rounded-full bg-amber-400"></i><i class="w-2.5 h-2.5 rounded-full bg-emerald-400"></i></span><span class="truncate flex-1">Tampilan di browser (live)</span>
            ${d.devices ? [['', '🖥️ Penuh'], ['768', '📟 768'], ['360', '📱 360']].map(([w, l]) => `<button ${act(n, 'width', w)} class="px-1.5 py-0.5 rounded-md text-[11px] font-bold ${String(s.w || '') === w ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}">${l}</button>`).join('') : ''}</div>
          <div class="flex-1 flex overflow-x-auto bg-slate-200"><iframe id="pg-frame-${n}" sandbox="${d.js ? 'allow-forms allow-scripts allow-modals' : 'allow-forms'}" title="Pratinjau" class="flex-1 min-h-[18rem] bg-white mx-auto" style="${s.w ? `width:${+s.w}px;min-width:${+s.w}px;flex:none` : 'width:100%'}" srcdoc="${esc(pgDoc(d, code, n))}"></iframe></div>
        </div>
`}
      </div>
      ${d.js ? `<div class="mt-3 rounded-xl bg-slate-950 overflow-hidden"><div class="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono flex justify-between gap-2"><span>🖥️ Console (hasil console.log, alert, prompt & error)</span><button ${act(n, 'run')} class="text-emerald-300 font-bold">▶ Jalankan ulang</button></div><div id="pg-console-${n}" class="p-3 font-mono text-xs space-y-1 max-h-48 overflow-y-auto min-h-[3rem]"><div class="text-slate-500">// belum ada output</div></div></div>` : ''}
      ${(d.tasks || []).length ? `<div class="mt-3 p-4 rounded-xl border ${s.checked && done === res.length ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}">
        <div class="text-xs font-bold text-slate-700 mb-2">Misi (${s.checked ? done + '/' + res.length + ' selesai' : 'klik Periksa Kode'})</div>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-sm">${d.tasks.map((t, i) => `<li class="flex gap-2 items-start ${s.checked ? (res[i] ? 'text-emerald-800' : 'text-rose-700') : 'text-slate-700'}"><span class="shrink-0">${s.checked ? (res[i] ? '✅' : '❌') : '⬜'}</span><span class="rich">${rich(t.label)}</span></li>`).join('')}</ul>
      </div>` : ''}
      <div class="mt-3 flex flex-wrap gap-2">
        <button ${act(n, 'check')} class="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white">Periksa Kode</button>
        ${d.solution ? `<button ${act(n, 'solve')} class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700">Lihat Contoh Jawaban</button>` : ''}
        <button ${act(n, 'reset')} class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700">Ulang dari Awal</button>
      </div>`;
    },
    on: {
      check(d, s) { s.checked = true; const r = pgCheck(d, s.values.code); const ok = r.filter(Boolean).length;
        showToast(ok === r.length ? 'Mantap! Semua misi selesai.' : `Selesai ${ok} dari ${r.length} misi. Cek tanda ❌.`, ok === r.length ? 'success' : 'warning'); },
      solve(d, s) { s.values.code = d.solution; s.checked = false; },
      reset(d, s) { s.values.code = d.starter || ''; s.checked = false; },
      width(d, s, arg) { s.w = arg; },
      run() {}
    }
  },

  callout: {
    render: d => { const t = tone(d.tone, 'info');
      return `<div class="p-4 rounded-xl border ${t.soft} text-sm leading-relaxed">
        ${d.heading ? `<div class="font-extrabold mb-1.5 rich">${rich(d.heading)}</div>` : ''}
        <div class="rich">${rich(d.html || d.text)}</div></div>`; }
  },

  cards: {
    render: d => { const cols = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[d.cols || 3] || 'sm:grid-cols-3';
      return `<div class="grid grid-cols-1 ${cols} gap-3">${(d.items || []).map(it => { const t = tone(it.tone, 'slate');
        return `<div class="p-4 rounded-xl border ${it.tone ? t.soft : 'bg-slate-50 border-slate-200'} space-y-1.5">
          ${it.badge ? `<span class="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold ${it.tone ? t.badge : 'bg-indigo-100 text-indigo-800'} rich">${rich(it.badge)}</span>` : ''}
          ${it.title ? `<div class="font-bold text-slate-900 text-sm rich">${rich(it.title)}</div>` : ''}
          ${it.text ? `<p class="text-xs sm:text-sm text-slate-600 leading-relaxed rich">${rich(it.text)}</p>` : ''}
        </div>`; }).join('')}</div>`; }
  },

  list: {
    render: d => `<div class="grid grid-cols-1 ${(d.groups || []).length > 1 ? 'md:grid-cols-2' : ''} gap-4">${(d.groups || []).map(g => { const t = tone(g.tone, 'indigo');
      return `<div class="p-4 rounded-xl border ${t.soft}">
        ${g.title ? `<span class="inline-block mb-2 px-2.5 py-1 rounded-lg text-xs font-bold ${t.badge} rich">${rich(g.title)}</span>` : ''}
        <${g.ordered ? 'ol' : 'ul'} class="space-y-1.5 text-sm">${(g.items || []).map(i => `<li class="p-2 rounded-lg bg-white/70 rich">${rich(i)}</li>`).join('')}</${g.ordered ? 'ol' : 'ul'}>
      </div>`; }).join('')}</div>`
  },

  flow: {
    render: d => `<div class="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-center gap-2 sm:gap-3 on-dark">${(d.items || []).map((it, i) =>
      `${i ? `<span class="text-slate-400 font-bold">${esc(d.arrow || '→')}</span>` : ''}<span class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold font-mono ${i === d.highlight ? 'bg-indigo-500 text-white' : 'bg-white/10'} rich">${rich(it)}</span>`).join('')}</div>
      ${d.note ? `<p class="mt-2 text-xs text-slate-500 rich">${rich(d.note)}</p>` : ''}`
  },

  row: {
    bare: true,
    init: (d, path) => ({ kids: (d.blocks || []).map((b, i) => createBlock(b, path + '.' + i, false)) }),
    render: (d, s) => {
      const cols = (Array.isArray(d.cols) && d.cols.length === s.kids.length ? d.cols : s.kids.map(() => 1)).map(x => `minmax(0,${Number(x) || 1}fr)`).join(' ');
      return `<div class="split" style="--cols:${cols}">${s.kids.map(blockHTML).join('')}</div>`;
    }
  },

  tabs: {
    init: (d, path) => ({ active: 0, kids: (d.tabs || []).map((t, ti) => (t.blocks || []).map((b, i) => createBlock(b, `${path}.${ti}.${i}`, true))) }),
    render: (d, s, n) => `<div class="flex flex-wrap gap-2 mb-4">${(d.tabs || []).map((t, i) =>
        `<button ${act(n, 'tab', i)} class="px-3.5 py-2 rounded-xl text-xs font-bold transition ${i === s.active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${rich(t.label)}</button>`).join('')}</div>
      ${s.kids.map((kids, i) => `<div data-panel="${i}" class="space-y-4 ${i === s.active ? '' : 'hidden'}">${kids.map(blockHTML).join('')}</div>`).join('')}`,
    on: { tab(d, s, arg) { s.active = +arg; } }
  },

  choices: {
    init: d => ({ sel: Math.min(d.default || 0, Math.max(0, (d.options || []).length - 1)) }),
    render: (d, s, n) => {
      const opts = d.options || []; const o = opts[s.sel] || {}; const t = tone(o.tone, d.style === 'toggle' ? 'indigo' : 'emerald');
      const toggle = d.style ? d.style === 'toggle' : opts.length <= 3;
      const btns = toggle
        ? `<div class="grid gap-1 p-1 bg-slate-100 rounded-xl mb-3" style="grid-template-columns:repeat(${opts.length},minmax(0,1fr))">${opts.map((x, i) =>
            `<button ${act(n, 'pick', i)} class="py-2 px-3 rounded-lg text-xs font-bold transition ${i === s.sel ? tone(x.tone, 'indigo').solid + ' shadow-sm' : 'text-slate-600 hover:text-slate-900'} rich">${rich(x.label)}</button>`).join('')}</div>`
        : `<div class="flex flex-wrap gap-2 mb-3">${opts.map((x, i) =>
            `<button ${act(n, 'pick', i)} class="px-3.5 py-2 rounded-xl text-xs font-bold border transition ${i === s.sel ? tone(x.tone, 'emerald').solid + ' shadow-sm' : (x.tone ? tone(x.tone).soft + ' hover:opacity-80' : BTN_IDLE)} rich">${rich(x.label)}</button>`).join('')}</div>`;
      return btns + `<div class="p-4 rounded-xl border-2 ${t.soft} space-y-2.5">
          ${(o.badge || o.title) ? `<div class="flex flex-wrap items-center gap-2">${o.badge ? `<span class="px-2.5 py-1 rounded-lg font-mono text-sm font-extrabold ${t.solid}">${rich(o.badge)}</span>` : ''}${o.title ? `<span class="font-extrabold text-sm sm:text-base rich">${rich(o.title)}</span>` : ''}</div>` : ''}
          ${o.code ? (/\n/.test(o.code) ? `<pre class="font-mono text-xs sm:text-[13px] leading-relaxed p-3 rounded-lg bg-slate-950 text-slate-100 overflow-x-auto">${(/[;{}]|#include|cout|cin/.test(o.code) ? hlCpp : esc)(o.code)}</pre>` : `<div class="font-mono text-xs sm:text-sm p-2.5 rounded-lg bg-white/80 border border-white break-words">${esc(o.code)}</div>`) : ''}
          ${o.text ? `<p class="text-sm leading-relaxed rich">${rich(o.text)}</p>` : ''}
          ${o.note ? `<div class="text-xs p-2.5 rounded-lg bg-white/70 rich">${rich(o.note)}</div>` : ''}
        </div>
        ${d.footer ? `<div class="mt-3 text-xs sm:text-sm p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 rich">${rich(d.footer)}</div>` : ''}`;
    },
    on: { pick(d, s, arg) { s.sel = +arg; } }
  },

  table: {
    init: d => ({ mode: (d.modes || []).length ? 0 : -1, note: null }),
    render: (d, s, n) => {
      const modes = d.modes || []; const m = modes[s.mode] || null; const tg = m ? m.target : null;
      const heads = (d.headers || []).map(h => typeof h === 'object' && h ? h : { label: h });
      const keyCol = d.keyCol != null ? d.keyCol : -1;
      const hl = (r, c) => {
        if (!m) return '';
        if (tg === 'col' && c === m.col) return 'bg-amber-200 text-amber-950 font-extrabold';
        if (tg === 'row' && r === m.row) return 'bg-emerald-100 font-semibold';
        if (tg === 'cell' && r === m.row && c === m.col) return 'bg-rose-200 text-rose-950 font-extrabold ring-4 ring-inset ring-rose-500';
        return '';
      };
      const btns = modes.length ? `<div class="flex flex-wrap gap-2 mb-3">${modes.map((x, i) =>
        `<button ${act(n, 'mode', i)} class="px-3.5 py-2 rounded-xl text-xs font-bold border transition ${i === s.mode ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : BTN_IDLE} rich">${rich(x.label)}</button>`).join('')}</div>` : '';
      const explain = s.note != null
        ? `<div class="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-sm text-indigo-950 rich">${rich(heads[s.note] && heads[s.note].note)}</div>`
        : m ? `<div class="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1"><div class="font-extrabold text-indigo-900 rich">${rich(m.title)}</div><div class="text-sm text-indigo-950/90 leading-relaxed rich">${rich(m.text)}</div></div>`
        : d.defaultNote ? `<div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 rich">${rich(d.defaultNote)}</div>` : '';
      const table = `<div class="overflow-x-auto rounded-xl border border-slate-200 ${modes.length ? 'mt-3' : ''}"><table class="w-full text-left text-sm ${d.mono ? 'font-mono text-xs sm:text-sm' : ''}">
        <thead><tr class="${tg === 'header' ? 'bg-indigo-600 ring-4 ring-inset ring-indigo-300' : 'bg-slate-800'} text-white transition-all">${heads.map((h, c) =>
          `<th ${h.note ? act(n, 'note', c) : ''} class="p-3 font-bold whitespace-nowrap ${h.note ? 'cursor-pointer hover:bg-white/10' : ''} ${tg === 'col' && c === m.col ? 'bg-amber-500 text-amber-950' : ''}"><span class="rich">${rich(h.label)}</span>${c === keyCol && !d.mono ? ' <span class="ml-1 px-1.5 py-0.5 text-[10px] rounded bg-amber-400 text-amber-950 font-sans">🔑 PK</span>' : ''}${h.note ? ' <span class="opacity-60">ⓘ</span>' : ''}</th>`).join('')}</tr></thead>
        <tbody class="divide-y divide-slate-200">${(d.rows || []).map((row, r) => `<tr class="hover:bg-slate-50/60">${(row || []).map((cell, c) =>
          `<td class="p-3 border-r border-slate-100 last:border-r-0 transition-all ${c === keyCol && !hl(r, c) ? 'font-mono font-bold text-indigo-700 bg-indigo-50/40' : ''} ${hl(r, c)} rich">${rich(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>`;
      const notes = (d.notes || []).length ? `<div class="grid grid-cols-1 md:grid-cols-${Math.min(3, d.notes.length)} gap-3 mt-4">${d.notes.map(x =>
        `<div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600"><span class="block font-bold text-slate-900 mb-1 rich">${rich(x.title)}</span><span class="rich">${rich(x.text)}</span></div>`).join('')}</div>` : '';
      return modes.length ? btns + explain + table + notes : table + (explain ? `<div class="mt-3">${explain}</div>` : '') + notes;
    },
    on: { mode(d, s, arg) { s.mode = +arg; s.note = null; }, note(d, s, arg) { s.note = +arg; } }
  },

  diagram: {
    init: () => ({ sel: null }),
    render: (d, s, n) => {
      const parts = d.parts || [];
      const svg = String(d.svg || '').replace(/data-part="([^"]+)"/g, (m, id) => `${act(n, 'pick', id)}${s.sel === id ? ' data-on="1"' : ''}`);
      const cur = parts.find(p => p.id === s.sel);
      return `${d.minw ? '<p class="sm:hidden mb-1 text-[11px] font-semibold text-slate-500">↔ Geser diagram ke samping untuk melihat seluruhnya.</p>' : ''}<div class="dg rounded-xl border border-slate-200 bg-slate-50 p-2 sm:p-4 overflow-x-auto"><div class="mx-auto" style="max-width:${d.maxw || 720}px;min-width:${d.minw || 0}px">${svg}</div></div>
        ${parts.length ? `<div class="mt-3 flex flex-wrap gap-1.5">${parts.map(p => `<button ${act(n, 'pick', p.id)} class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${s.sel === p.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-indigo-50'} rich">${rich(p.label || p.title)}</button>`).join('')}</div>
        <div class="mt-3 p-3 sm:p-4 rounded-xl border ${cur ? 'border-indigo-200 bg-indigo-50' : 'border-dashed border-slate-300 bg-white'} text-sm leading-relaxed">${cur ? `<div class="font-extrabold text-indigo-900 mb-1 rich">${rich(cur.title)}</div><div class="text-slate-700 rich">${rich(cur.text)}</div>` : `<span class="text-slate-500">${rich(d.hint || '👆 Klik bagian diagram (atau tombol di atas) untuk melihat penjelasannya.')}</span>`}</div>` : ''}`;
    },
    on: { pick(d, s, arg) { s.sel = arg; } }
  },

  reveal: {
    init: () => ({ open: {} }),
    render: (d, s, n) => `<div class="grid grid-cols-1 sm:grid-cols-2 ${d.cols === 3 ? 'lg:grid-cols-3' : ''} gap-2">${(d.items || []).map((it, i) => s.open[i]
      ? `<div class="p-3 rounded-xl border border-emerald-400 bg-emerald-50 flex flex-col gap-1"><div class="flex items-center justify-between gap-2"><span class="font-mono font-bold text-emerald-800 text-sm rich">${rich(it.answer)}</span><span class="text-[10px] font-bold text-emerald-600 shrink-0">✓ Terjawab</span></div>${it.reason ? `<span class="text-xs text-emerald-900 rich">${rich(it.reason)}</span>` : ''}<span class="text-[11px] text-emerald-700/70 rich">${rich(it.prompt)}</span></div>`
      : `<button ${act(n, 'open', i)} class="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50 text-left flex items-center justify-between gap-2 transition"><span class="min-w-0 break-words [overflow-wrap:anywhere] text-sm font-semibold text-slate-800 rich">${rich(it.prompt)}</span><span class="text-xs font-bold text-indigo-600 shrink-0">Lihat →</span></button>`).join('')}</div>`,
    on: { open(d, s, arg) { s.open[arg] = true; } }
  },

  // 🔊 Pelafalan: klik kata/kalimat → dibacakan suara bahasa Inggris browser (Web Speech API)
  say: {
    init: () => ({ last: null, slow: false }),
    render: (d, s, n) => {
      const items = d.items || [];
      return `<div class="flex flex-wrap items-center gap-2 mb-3">
          <button ${act(n, 'slow')} class="px-3 py-1.5 rounded-xl text-xs font-bold ${s.slow ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">🐢 Pelan ${s.slow ? 'ON' : 'OFF'}</button>
          <span class="text-xs text-slate-500">Klik untuk mendengar pelafalan (suara bahasa Inggris dari browser).</span>
        </div>
        <div class="grid ${d.cols === 4 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2' + (d.cols === 3 ? ' lg:grid-cols-3' : '')} gap-2">${items.map((it, i) =>
          `<button ${act(n, 'speak', i)} class="p-3 rounded-xl border ${s.last === i ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50'} text-left flex items-center gap-3 transition">
            <span class="shrink-0 text-lg">🔊</span>
            <span class="min-w-0 break-words [overflow-wrap:anywhere]"><span class="block text-sm font-semibold text-slate-800 rich">${rich(it.show || it.en)}</span>${it.ipa || it.id ? `<span class="block text-xs text-slate-500 rich">${it.ipa ? `<span class="font-mono">${esc(it.ipa)}</span>${it.id ? ' • ' : ''}` : ''}${rich(it.id || '')}</span>` : ''}${s.last === i && it.note ? `<span class="block mt-1 text-xs text-emerald-800 rich">💡 ${rich(it.note)}</span>` : ''}</span>
          </button>`).join('')}</div>
        `;
    },
    on: {
      slow(d, s) { s.slow = !s.slow; },
      speak(d, s, arg) {
        s.last = +arg; const it = (d.items || [])[s.last]; if (!it) return;
        const syn = window.speechSynthesis;
        if (!syn || typeof SpeechSynthesisUtterance === 'undefined') { showToast('Browser ini belum mendukung suara. Coba Chrome/Edge/Safari terbaru.', 'warning'); return; }
        try {
          syn.cancel();
          const u = new SpeechSynthesisUtterance(String(it.say || it.en).replace(/<[^>]+>/g, ''));
          u.lang = d.lang || 'en-US'; u.rate = s.slow ? 0.65 : 0.95;
          const v = syn.getVoices().find(v => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith((d.lang || 'en-US').toLowerCase())) || syn.getVoices().find(v => /^en/i.test(v.lang || ''));
          if (v) u.voice = v;
          syn.speak(u);
        } catch (e) { showToast('Suara gagal diputar di browser ini.', 'warning'); }
      }
    }
  },

  detective: {
    init: () => ({ fixed: {}, last: null }),
    render: (d, s, n) => {
      const bugs = d.bugs || []; const count = Object.keys(s.fixed).length; const done = count === bugs.length && bugs.length;
      const bugAt = (r, c) => bugs.findIndex(b => b.row === r && b.col === c);
      return `<div class="flex flex-wrap items-center gap-2 mb-4">
          <span class="px-3 py-1.5 rounded-xl font-bold text-xs ${done ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}">Ditemukan: ${count} / ${bugs.length} Kesalahan</span>
          <button ${act(n, 'reset')} class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700">Ulangi</button>
        </div>
        ${(d.rules || []).length ? `<div class="grid grid-cols-2 md:grid-cols-${Math.min(5, d.rules.length)} gap-2 mb-4">${d.rules.map((r, i) =>
          `<div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600"><span class="block font-bold text-indigo-700 mb-0.5">Aturan ${i + 1}</span><span class="rich">${rich(r)}</span></div>`).join('')}</div>` : ''}
        <div class="overflow-x-auto rounded-xl border border-slate-200"><table class="w-full text-left text-sm">
          <thead><tr class="bg-slate-800 text-white">${(d.headers || []).map(h => `<th class="p-3 font-bold whitespace-nowrap rich">${rich(h)}</th>`).join('')}</tr></thead>
          <tbody class="divide-y divide-slate-200">${(d.rows || []).map((row, r) => `<tr>${row.map((cell, c) => {
            const bi = bugAt(r, c);
            if (bi < 0) return `<td class="p-3 border-r border-slate-100 rich">${rich(cell)}</td>`;
            const fx = s.fixed[bi];
            return fx ? `<td class="p-3 border-r border-slate-100 bg-emerald-50 text-emerald-900 font-bold"><div class="flex items-center justify-between gap-2"><span class="rich">${rich(bugs[bi].fixed)}</span><span class="px-2 py-0.5 text-[10px] bg-emerald-600 text-white rounded-full shrink-0">✓ Diperbaiki</span></div></td>`
              : `<td ${act(n, 'fix', bi)} class="p-3 border-r border-slate-100 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold cursor-pointer highlight-pulse"><div class="flex items-center justify-between gap-2"><span class="rich">${rich(cell)}</span><span class="px-2 py-0.5 text-[10px] bg-rose-600 text-white rounded-full shrink-0">Klik Perbaiki!</span></div></td>`;
          }).join('')}</tr>`).join('')}</tbody></table></div>
        <div class="mt-4 p-3.5 rounded-xl text-sm ${s.last != null ? 'bg-emerald-50 border border-emerald-200 text-emerald-950' : 'bg-slate-50 border border-slate-200 text-slate-600'} rich">${s.last != null ? rich(bugs[s.last].explain) : '👆 <strong>Instruksi:</strong> Klik sel berwarna merah pada tabel untuk menganalisis aturan yang dilanggar dan memperbaikinya.'}</div>`;
    },
    on: {
      fix(d, s, arg) { s.fixed[arg] = true; s.last = +arg; if (Object.keys(s.fixed).length === (d.bugs || []).length) showToast('Luar biasa! Semua kesalahan berhasil diperbaiki!', 'success'); },
      reset(d, s) { s.fixed = {}; s.last = null; }
    }
  },

  terminal: {
    init: () => ({ sel: 0 }),
    render: (d, s, n) => {
      const sc = d.scenarios || []; const x = sc[s.sel] || {}; const ok = !!x.ok;
      return `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">${sc.map((it, i) =>
          `<button ${act(n, 'run', i)} class="p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold transition ${i === s.sel ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'} ${sc.length % 2 && i === sc.length - 1 ? 'sm:col-span-2' : ''}"><span class="rich">${rich(it.label)}</span>${it.code ? `<span class="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold shrink-0 ${it.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">${esc(it.code)}</span>` : ''}</button>`).join('')}</div>
        <div class="rounded-xl bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm overflow-hidden">
          <div class="flex items-center justify-between gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs">
            <span>${esc(d.shell || '$')} ${esc(d.header || 'Terminal Simulasi')}</span>
            ${x.pill || x.cmd ? `<span class="px-2 py-0.5 rounded font-sans font-bold ${ok ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}">${esc(x.pill || (ok ? 'OK' : 'ERROR'))}</span>` : ''}
          </div>
          <div class="p-4 space-y-2">
            <div class="break-words whitespace-pre-wrap"><span class="text-sky-400">${esc(d.shell || '$')}</span> ${esc(x.cmd)}</div>
            <div class="${ok ? 'text-emerald-400' : 'text-rose-400'} font-bold break-words whitespace-pre-wrap">${esc(x.res)}</div>
          </div>
        </div>
        ${x.exp ? `<div class="mt-3 p-3.5 rounded-xl text-sm ${ok ? 'bg-emerald-50 border border-emerald-200 text-emerald-950' : 'bg-rose-50 border border-rose-200 text-rose-950'} rich">${rich(x.exp)}</div>` : ''}`;
    },
    on: { run(d, s, arg) { s.sel = +arg; } }
  },

  exercise: {
    init: () => ({ values: {}, result: {} }),
    render: (d, s, n) => {
      const rows = d.rows || [];
      const field = (f, r, fi) => {
        const key = r + ':' + fi; const v = s.values[key] != null ? s.values[key] : '';
        if (Array.isArray(f.options)) {
          const opts = f.options.map(o => typeof o === 'object' && o ? o : { value: String(o), label: String(o) });
          const ph = f.noPlaceholder ? '' : `<option value="">${esc(f.placeholder || '-- Pilih --')}</option>`;
          const cur = v === '' && f.noPlaceholder ? String(opts[0] ? opts[0].value : '') : v;
          if (v === '' && f.noPlaceholder) s.values[key] = cur;
          return `<select data-field="${n}" data-key="${key}" class="w-full min-w-[9rem] p-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-indigo-400 outline-none">${ph}${opts.map(o => `<option value="${esc(o.value)}" ${String(o.value) === String(cur) ? 'selected' : ''}>${esc(o.label != null ? o.label : o.value)}</option>`).join('')}</select>`;
        }
        return `<input data-field="${n}" data-key="${key}" value="${esc(v)}" placeholder="${esc(f.placeholder || 'Jawabanmu')}" class="w-full min-w-[8rem] p-2 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-indigo-400 outline-none">`;
      };
      const nFields = Math.max(0, ...rows.map(r => (r.fields || []).length));
      const nCells = Math.max(0, ...rows.map(r => (r.cells || []).length));
      const heads = (d.headers || []).slice();
      while (heads.length < nCells + nFields) heads.push('');
      const correct = Object.values(s.result).filter(x => x.ok).length;
      return `<div class="flex flex-wrap gap-2 mb-4">
          <button ${act(n, 'fill')} class="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700">Isi Jawaban Ideal</button>
          <button ${act(n, 'check')} class="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">Periksa Jawaban Saya</button>
          ${Object.keys(s.result).length ? `<span class="px-3 py-2 rounded-xl text-xs font-bold ${correct === rows.length ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">Benar ${correct} / ${rows.length}</span>` : ''}
        </div>
        ${d.preview ? `<div class="mb-4 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed max-w-xl">${esc(d.preview)}</div>` : ''}
        <div class="overflow-x-auto rounded-xl border border-slate-200"><table class="w-full text-left text-sm">
          <thead><tr class="bg-slate-800 text-white text-xs sm:text-sm">${heads.map(h => `<th class="p-3 font-bold rich">${rich(h)}</th>`).join('')}<th class="p-3 font-bold">Status</th></tr></thead>
          <tbody class="divide-y divide-slate-200">${rows.map((row, r) => { const res = s.result[r];
            return `<tr>${(row.cells || []).map(c => `<td class="p-3 text-xs sm:text-sm rich">${rich(c)}</td>`).join('')}${Array.from({ length: nCells - (row.cells || []).length }, () => '<td></td>').join('')}
              ${(row.fields || []).map((f, fi) => `<td class="p-2">${field(f, r, fi)}</td>`).join('')}${Array.from({ length: nFields - (row.fields || []).length }, () => '<td></td>').join('')}
              <td class="p-3 text-xs font-bold min-w-[10rem] ${res ? (res.ok ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50') : 'text-slate-400'} rich">${res ? rich(res.msg) : 'Belum diperiksa'}</td></tr>`; }).join('')}</tbody>
        </table></div>
        ${d.footer ? `<div class="mt-3 text-xs sm:text-sm p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 rich">${rich(d.footer)}</div>` : ''}`;
    },
    on: {
      fill(d, s) { (d.rows || []).forEach((row, r) => (row.fields || []).forEach((f, fi) => { s.values[r + ':' + fi] = String(Array.isArray(f.answer) ? f.answer[0] : f.answer); })); R.exercise.on.check(d, s); },
      check(d, s) {
        const norm = x => String(x == null ? '' : x).trim().toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, ' ').replace(/\s*[.?!]+$/, '');
        const num = x => { const t = String(x).trim().replace(/\s/g, ''); const v = Number(/^-?[\d.]*,\d+$/.test(t) ? t.replace(/\./g, '').replace(',', '.') : t); return isNaN(v) ? null : v; };
        const match = (f, v) => (Array.isArray(f.answer) ? f.answer : [f.answer]).some(a => {
          if (!Array.isArray(f.options) && typeof a === 'number') { const nv = num(v); return nv != null && Math.abs(nv - a) <= (Number(f.tolerance) || 0) + 1e-9; }
          return norm(a) === norm(v);
        });
        let correct = 0;
        (d.rows || []).forEach((row, r) => {
          const fields = row.fields || [];
          const vals = fields.map((f, fi) => s.values[r + ':' + fi] != null ? s.values[r + ':' + fi] : '');
          const ok = fields.every((f, fi) => match(f, vals[fi]));
          let msg;
          if (ok) { correct++; msg = row.ok || '✓ Tepat!'; }
          else {
            const h = (row.hints || []).find(h => norm(vals[h.field]) === norm(h.value));
            msg = h ? h.msg : (row.wrong || `✗ Kurang tepat. Jawaban: ${fields.map(f => { const a = Array.isArray(f.answer) ? f.answer[0] : f.answer; const o = (f.options || []).find(o => typeof o === 'object' && o && String(o.value) === String(a)); return o ? o.label : a; }).join(' • ')}`);
          }
          s.result[r] = { ok, msg };
        });
        const total = (d.rows || []).length;
        showToast(correct === total ? 'Sempurna! Semua jawaban benar!' : `Benar ${correct} dari ${total}. Cek petunjuk berwarna merah!`, correct === total ? 'success' : 'warning');
      }
    }
  }
};

// Event global untuk semua blok
document.addEventListener('click', e => {
  const el = e.target.closest('[data-blk][data-act]');
  if (!el) return;
  const n = +el.dataset.blk; const b = BLOCKS[n];
  if (!b || !b.r.on || !b.r.on[el.dataset.act]) return;
  const res = b.r.on[el.dataset.act](b.def, b.state, el.dataset.arg, n, el);
  markInteract(n);
  if (res !== false) refreshBlock(n);
});
const onField = e => {
  const el = e.target.closest('[data-field]'); if (!el) return;
  const b = BLOCKS[+el.dataset.field]; if (b) b.state.values[el.dataset.key] = el.value;
};
document.addEventListener('input', onField);
document.addEventListener('change', onField);

// =====================================================================
//  TAMPILAN: header, beranda, pertemuan, flashcard, kuis
// =====================================================================
const ICON = {
  db: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>',
  book: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>',
  share: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>',
  plus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>',
  x: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
  chart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
  home: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>'
};
const svg = (k, cls = 'w-5 h-5') => `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${ICON[k]}</svg>`;

// Program studi & kampus yang sama untuk semua mata kuliah ditampilkan sekali di header
function programLine() {
  const lines = [...new Set(LIB.map(c => [c.prodi, c.kampus].filter(Boolean).join(' • ')).filter(Boolean))];
  return lines.length === 1 ? lines[0] : '';
}
function renderHeader() {
  const c = S.course, m = S.meeting;
  const courseOpts = LIB.map(x => `<option value="${esc(x.id)}" ${c && x.id === c.id ? 'selected' : ''}>${esc((x.kode ? x.kode + ' • ' : '') + x.nama)}</option>`).join('');
  const meetOpts = c ? c.meetings.map(x => `<option value="${esc(x.id)}" ${m && x.id === m.id ? 'selected' : ''}>Pertemuan ${esc(x.nomor)}: ${esc(x.judul)}</option>`).join('') : '';
  const tabs = m ? availableTabs(m) : [];
  $('appHeader').innerHTML = `<div class="max-w-6xl mx-auto px-4 py-2.5 space-y-2.5">
    <div class="flex items-center gap-2.5 min-w-0">
      ${m ? `<button onclick="go('#/')" title="Beranda Sinau" aria-label="Beranda" class="w-10 h-10 shrink-0 rounded-xl bg-[#ffe14d] text-ink font-display font-extrabold text-xl leading-none flex items-center justify-center hover:bg-[#ffd60a]">s</button>` : ''}
      <div class="min-w-0 flex-1">
        ${m ? `<div class="text-[11px] font-bold text-indigo-700 truncate">${esc((c.kode ? c.kode + ' • ' : '') + c.nama)} • Pertemuan ${esc(m.nomor)}</div>
          <h1 class="text-[15px] sm:text-lg font-extrabold text-slate-900 leading-snug line-clamp-2" title="${esc(m.judul)}">${esc(m.judul)}</h1>`
        : `<h1 class="leading-none"><button onclick="go('#/')" class="wordmark text-[28px] sm:text-[32px]" aria-label="Beranda Sinau">sinau</button></h1><p class="mt-1.5 text-xs text-slate-500 truncate">${esc(['rangkuman', APP.semester, programLine()].filter(Boolean).join(' • '))}</p>`}
      </div>
      ${m ? `<div class="md:hidden shrink-0 h-10 px-2 rounded-xl bg-indigo-50 text-indigo-700 flex flex-col items-center justify-center leading-none" title="Kesiapan ${esc(m.ujian)}"><span id="readinessPill" class="text-sm font-extrabold">0%</span><span class="text-[9px] font-bold uppercase tracking-wide">siap</span></div>` : ''}
      <button onclick="openProgressModal()" title="Progres belajarku (simpan / pindah perangkat)" aria-label="Progres belajarku" class="shrink-0 h-10 px-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1.5">${svg('chart', 'w-4 h-4')}<span class="hidden sm:inline">Progresku</span></button>
      <button onclick="openShareModal()" title="Bagikan / Unduh" aria-label="Bagikan / Unduh" class="shrink-0 h-10 px-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5">${svg('share', 'w-4 h-4')}<span class="hidden sm:inline">Bagikan / Unduh</span></button>
    </div>
    <div class="hdr-collapse flex flex-wrap md:flex-nowrap items-center gap-2">
      ${LIB.length ? `<select id="selCourse" aria-label="Pilih mata kuliah" class="flex-1 min-w-0 md:flex-none md:w-56 p-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"><option value="">Pilih mata kuliah</option>${courseOpts}</select>` : ''}
      ${c ? `<select id="selMeeting" aria-label="Pilih pertemuan" class="flex-1 min-w-0 md:flex-none md:w-80 p-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"><option value="">Pilih pertemuan</option>${meetOpts}</select>` : ''}
      ${m ? `<div class="hidden md:block md:w-48 md:ml-auto"><div class="flex justify-between text-[11px] font-bold text-slate-500 mb-1"><span>Kesiapan ${esc(m.ujian)}</span><span id="readinessLabel" class="text-indigo-700">0%</span></div><div class="h-1.5 rounded-full bg-slate-200 overflow-hidden"><div id="readinessBar" class="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500" style="width:0%"></div></div></div>` : ''}
    </div>
    ${tabs.length ? `<div class="relative -mx-4 sm:mx-0"><nav id="tabNav" class="flex gap-1.5 overflow-x-auto pb-0.5 px-4 sm:px-0 scroll-px-4" aria-label="Menu Utama">${tabs.map(t =>
      `<button onclick="go('${routeFor(c, m, t.id)}')" ${S.tab === t.id ? 'aria-current="page"' : ''} class="shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${S.tab === t.id ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"><span class="sm:hidden">${esc(t.short(m))}</span><span class="hidden sm:inline">${esc(t.label(m))}</span></button>`).join('')}</nav>
      <div class="sm:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white"></div></div>` : ''}
  </div>`;
  const nav = $('tabNav'), at = nav && nav.querySelector('[aria-current="page"]');
  if (at && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = at.offsetLeft - (nav.clientWidth - at.offsetWidth) / 2;
  const sc = $('selCourse'); if (sc) sc.onchange = () => { const nc = findCourse(sc.value); if (!nc) return go('#/'); go(nc.meetings.length === 1 ? routeFor(nc, nc.meetings[0]) : '#/c/' + encodeURIComponent(nc.id)); };
  const sm = $('selMeeting'); if (sm) sm.onchange = () => { const nm = findMeeting(c, sm.value); go(nm ? routeFor(c, nm) : '#/c/' + encodeURIComponent(c.id)); };
}
function renderNext() {
  const box = $('appNext'); if (!box) return;
  const c = S.course, m = S.meeting;
  if (!m) { box.innerHTML = ''; return; }
  const tabs = availableTabs(m), ti = tabs.findIndex(t => t.id === S.tab), nextTab = tabs[ti + 1];
  const mi = c.meetings.indexOf(m), prevM = c.meetings[mi - 1], nextM = c.meetings[mi + 1];
  const short = x => `P${esc(x.nomor)}: ${esc(x.judul)}`;
  const primary = nextTab
    ? `<button onclick="go('${routeFor(c, m, nextTab.id)}')" class="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">Lanjut ke ${esc(nextTab.label(m))} →</button>`
    : nextM ? `<button onclick="go('${routeFor(c, nextM)}')" class="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">Pertemuan berikutnya →</button>`
    : `<span class="text-sm font-bold text-emerald-700">🎉 Ini pertemuan terakhir ${esc(c.nama)}.</span>`;
  box.innerHTML = `<nav aria-label="Navigasi pertemuan" class="mb-6 p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center gap-3">
    <div class="flex-1 min-w-0 grid grid-cols-2 gap-2 text-xs">
      ${prevM ? `<button onclick="go('${routeFor(c, prevM)}')" class="text-left p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 min-w-0"><span class="block text-[11px] font-bold text-slate-500">← Sebelumnya</span><span class="block font-bold text-slate-800 truncate">${short(prevM)}</span></button>` : '<span></span>'}
      ${nextM ? `<button onclick="go('${routeFor(c, nextM)}')" class="text-right p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 min-w-0"><span class="block text-[11px] font-bold text-slate-500">Berikutnya →</span><span class="block font-bold text-slate-800 truncate">${short(nextM)}</span></button>` : '<span></span>'}
    </div>
    <div class="shrink-0 flex justify-center">${primary}</div>
  </nav>`;
}
function scrollToBlk(n) { const el = $('blk-' + n); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function renderFooter() {
  const c = S.course, m = S.meeting;
  $('appFooter').innerHTML = `<div class="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
    <div>${m ? `<strong class="text-slate-700">${esc(c.nama)}${c.kode ? ' (' + esc(c.kode) + ')' : ''}, Pertemuan ${esc(m.nomor)}: ${esc(m.judul)}</strong><br>${esc([c.prodi, c.kampus].filter(Boolean).join(' • '))}${c.dosen ? ' • Dosen: ' + esc(c.dosen) : ''}`
      : `<span class="wordmark text-base">sinau</span><br><span class="inline-block mt-1">Sinau (Jawa): belajar. Materi dimuat per pertemuan supaya halaman lebih ringan.</span>`}</div>
    <button onclick="openShareModal()" class="self-start sm:self-auto px-3 py-2 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700">Bagikan / Unduh HTML</button>
  </div>`;
}
function updateReadiness() {
  if (!S.meeting) return;
  const pct = readiness(S.meeting, S.prog, S.interactiveTotal);
  const l = $('readinessLabel'), b = $('readinessBar'), pl = $('readinessPill');
  if (l) l.textContent = pct + '%'; if (b) b.style.width = pct + '%'; if (pl) pl.textContent = pct + '%';
}

// ---------- Routing ----------
const routeFor = (c, m, tab) => '#/c/' + encodeURIComponent(c.id) + (m ? '/m/' + encodeURIComponent(m.id) + (tab && tab !== defaultTab(m) ? '/' + tab : '') : '');
// Versi ini dibuka langsung (bukan embed Google Sites), jadi tiap pindah halaman/tab dicatat di riwayat browser:
// tombol Back/Forward browser (dan gesture kembali di HP) bekerja seperti biasa.
const NAV = { cur: null };
function curHash() { return NAV.cur != null ? NAV.cur : (location.hash || '#/'); }
function go(hash, mode) {
  const prev = curHash();
  NAV.cur = hash;
  try { if (mode === 'nav' || hash === prev) history.replaceState(null, '', hash); else history.pushState(null, '', hash); } catch (e) {}
  route(hash);
}
function goBack() { history.back(); }
function goForward() { history.forward(); }
// ---------- Muat isi pertemuan (data/<matkul>/<pertemuan>.json) ----------
const MEETING_LOADS = {};
let routeSeq = 0;
function fetchMeeting(c, m) {
  const key = progId(c, m);
  if (!MEETING_LOADS[key]) MEETING_LOADS[key] = fetchText(assetUrl('data/' + encodeURIComponent(c.id) + '/' + encodeURIComponent(m.id) + '.json'))
    .then(t => {
      const i = c.meetings.findIndex(x => x.id === m.id);
      const full = normalizeMeeting(JSON.parse(t), i);
      if (i >= 0 && c.meetings[i]._lazy) c.meetings[i] = full;
      return full;
    })
    .catch(e => { delete MEETING_LOADS[key]; throw e; });
  return MEETING_LOADS[key];
}
function loadMeetingThen(c, m, forced) {
  const seq = routeSeq;
  if (!$('appHeader').innerHTML) renderHeader();
  $('appNext').innerHTML = '';
  $('appMain').innerHTML = `<div class="py-16 flex flex-col items-center gap-3 text-slate-500"><div class="w-9 h-9 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
    <p class="text-sm font-semibold">Memuat ${esc(c.nama)} • Pertemuan ${esc(m.nomor)}…</p></div>`;
  fetchMeeting(c, m).then(() => { if (seq === routeSeq) route(forced); }).catch(() => {
    if (seq !== routeSeq) return;
    $('appMain').innerHTML = `<div class="py-16 flex flex-col items-center gap-3 text-center"><p class="text-sm font-bold text-rose-700">Materi gagal dimuat. Periksa koneksi internet, lalu coba lagi.</p>
      <button onclick="route(curHash())" class="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white">Coba lagi</button></div>`;
  });
}
function route(forced) {
  routeSeq++;
  const parts = (typeof forced === 'string' ? forced : location.hash).replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  let c = null, m = null, tab = 'cheatsheet';
  if (parts[0] === 'c') { c = findCourse(parts[1]); if (c && parts[2] === 'm') { m = findMeeting(c, parts[3]); tab = parts[4] || (m ? defaultTab(m) : 'cheatsheet'); } }
  if (!c && LIB.length === 1 && LIB[0].meetings.length === 1 && !location.hash) { c = LIB[0]; m = c.meetings[0]; }
  if (m && m._lazy) { loadMeetingThen(c, m, forced); return; }
  const changedMeeting = !m || !S.meeting || S.meeting !== m || S.course !== c;
  S.course = c; S.meeting = m;
  if (m) {
    const tabs = availableTabs(m);
    if (!tabs.some(t => t.id === tab)) tab = tabs.length ? tabs[0].id : 'cheatsheet';
    S.tab = tab;
    if (changedMeeting) { S.prog = loadProgress(c, m); S.fcFilter = 'all'; S.quizFilter = 'all'; S.exam = null; S.interactiveTotal = countInteractive(m); }
    if (!S.prog.visited.has(tab)) { S.prog.visited.add(tab); saveProgress(); }
    PROGRESS.setLast(routeFor(c, m, tab));
    document.title = `${c.nama} P${m.nomor} · Sinau`;
  } else { S.prog = null; document.title = c ? `${c.nama} · Sinau` : 'Sinau' + (APP.semester ? ' · ' + APP.semester : ''); }
  renderHeader(); renderFooter(); renderNext();
  if (m) renderMeeting(changedMeeting); else renderHome(c);
  updateReadiness();
  // Siapkan pertemuan berikutnya di belakang layar supaya pindah halaman terasa instan
  const nx = m && c.meetings[c.meetings.indexOf(m) + 1];
  if (nx && nx._lazy) setTimeout(() => fetchMeeting(c, nx).catch(() => {}), 1500);
  window.scrollTo({ top: 0, behavior: changedMeeting ? 'auto' : 'smooth' });
}
(function () { let compact = false; window.addEventListener('scroll', () => { const h = $('appHeader'); if (!h) return;
  const want = innerWidth < 768 && (compact ? scrollY > 40 : scrollY > 160); if (want !== compact) { compact = want; h.classList.toggle('hdr-compact', compact); } }, { passive: true }); })();
const onHistory = () => { const h = location.hash || '#/'; if (h !== NAV.cur) { NAV.cur = h; route(h); } };
window.addEventListener('popstate', onHistory);
window.addEventListener('hashchange', onHistory);
// Di dalam embed (mis. Google Sites) link href="#/..." bisa diarahkan ke URL frame luar; tangani klik link internal sendiri.
document.addEventListener('click', e => { const a = e.target.closest && e.target.closest('a[href^="#/"]'); if (!a) return; e.preventDefault(); go(a.getAttribute('href')); }, true);

// ---------- Beranda ----------
// Warna stabilo per mata kuliah (urut sesuai daftar matkul); teks di atasnya selalu tinta gelap.
const HL = ['#ffe14d', '#8fe3a2', '#ff9ec7', '#ffb766', '#9cc7ff', '#c6b0ff', '#7fdcd2', '#f5a3a3'];
const courseHL = c => HL[Math.max(0, LIB.indexOf(c)) % HL.length];
const shortName = c => (c.kode || c.nama).replace(/\s*\(.*?\)\s*/g, '').trim();
// Satu semester = 16 pertemuan: P1–P8 menuju UTS, P9–P16 menuju UAS
const SEMESTER_LEN = 16;
const BABAK = [{ id: 'uts', label: 'Menuju UTS' }, { id: 'uas', label: 'Menuju UAS' }];
const babakOf = n => parseFloat(n) > SEMESTER_LEN / 2 ? 'uas' : 'uts';
// Penanda pertemuan ujian/tugas di peta, dibaca dari judulnya (mis. "UTS: Ulasan…", "… & CPMK 1", "Tugas 1: …")
const examMark = m => { const j = String(m.judul || '');
  const u = j.match(/\b(UTS|UAS)\b/); if (u) return u[1];
  if (/\bCPMK\b/.test(j)) return 'CPMK';
  if (/^Tugas\b/i.test(j)) return 'Tugas';
  if (/^(Evaluasi|Kuis)\b/i.test(j)) return 'Kuis';
  return ''; };
function renderHome(only) {
  const list = only ? [only] : LIB;
  const meetingRow = (c, m) => { const pct = storedReadiness(c, m);
    return `<li class="relative group">
      <button type="button" onclick="go('${routeFor(c, m)}')" class="w-full text-left px-3 sm:px-4 py-3 grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 hover:bg-[#f6f5ef] focus-visible:bg-[#f6f5ef] transition" aria-label="Buka pertemuan ${esc(m.nomor)}: ${esc(m.judul)}">
        <span class="font-display font-extrabold text-lg text-ink"><span class="stabilo" style="--hl:${courseHL(c)}">P${esc(m.nomor)}</span></span>
        <span class="min-w-0"><span class="block font-bold text-slate-900 leading-snug">${esc(m.judul)}</span>
          <span class="block text-xs text-slate-500 mt-0.5">${fcCount(m)} kartu • ${quizAns(m).length} soal • ${esc(m.ujian)}${m._imported ? ' • materi tambahan' : ''}</span></span>
        <span class="w-14 sm:w-24 text-right"><span class="block text-xs font-bold tabular-nums ${pct ? 'text-ink' : 'text-slate-400'}">${pct ? pct + '%' : 'belum'}</span>
          <span class="block mt-1 h-1.5 rounded-full bg-[#ecebe4] overflow-hidden"><span class="block h-full" style="width:${pct}%;background:${courseHL(c)}"></span></span></span>
      </button>
      ${m._imported ? `<button onclick="confirmDelete('${esc(c.id)}','${esc(m.id)}')" class="absolute right-2 top-1 px-2 py-0.5 rounded-md text-[11px] font-bold text-rose-600 hover:bg-rose-50" title="Hapus materi tambahan ini">Hapus</button>` : ''}
    </li>`; };
  // Baris "Lanjutkan belajar" dari halaman terakhir yang dibuka
  let cont = '';
  const last = !only && PROGRESS.getLast();
  if (last) {
    const pp = last.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    const lc = pp[0] === 'c' && findCourse(pp[1]), lm = lc && pp[2] === 'm' && findMeeting(lc, pp[3]);
    if (lm) {
      const pct = storedReadiness(lc, lm), tab = availableTabs(lm).find(t => t.id === (pp[4] || defaultTab(lm)));
      cont = `<button onclick="go('${esc(last.hash)}')" class="w-full text-left p-4 rounded-2xl border border-slate-200 bg-white hover:border-ink transition flex flex-col sm:flex-row sm:items-center gap-3">
        <div class="min-w-0 flex-1 space-y-1"><div class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Lanjutkan belajar • ${esc(lc.nama)} • P${esc(lm.nomor)}${tab ? ' • ' + esc(tab.short(lm)) : ''}</div>
          <div class="font-display font-extrabold text-lg leading-snug text-ink"><span class="stabilo" style="--hl:${courseHL(lc)}">${esc(lm.judul)}</span></div>
          <div class="text-xs text-slate-500">${pct}% siap</div></div>
        <span class="shrink-0 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-ink text-white text-sm font-bold">Lanjutkan →</span></button>`;
    }
  }
  // Peta: semua matkul × nomor pertemuan (P1–P16, dibagi babak UTS | UAS), warna makin pekat = makin siap
  const showPeta = !only && LIB.length > 1;
  let peta = '';
  if (showPeta) {
    const have = LIB.flatMap(c => c.meetings.map(m => String(m.nomor)));
    const nums = [...new Set([...have, ...Array.from({ length: SEMESTER_LEN }, (_, i) => String(i + 1))])].sort((a, b) => (parseFloat(a) - parseFloat(b)) || a.localeCompare(b));
    const utsN = nums.filter(n => babakOf(n) === 'uts'), uasN = nums.filter(n => babakOf(n) === 'uas');
    const cell = (c, n) => { const m = c.meetings.find(x => String(x.nomor) === n);
      if (!m) return c.meetings.some(x => parseFloat(x.nomor) > parseFloat(n))
        ? `<td><span class="peta-none" title="${esc(c.nama)} tidak punya Pertemuan ${esc(n)}">×</span></td>`
        : `<td><span class="peta-soon" title="Pertemuan ${esc(n)} belum ada materinya"></span></td>`;
      const pct = storedReadiness(c, m);
      return `<td><button type="button" onclick="go('${routeFor(c, m)}')" class="peta-cell" style="--hl:${courseHL(c)};--p:${pct}" ${pct ? `data-pct="${pct}"` : ''} ${examMark(m) ? 'data-exam' : ''} title="${esc(c.nama)} • P${esc(n)}: ${esc(m.judul)} • ${pct}% siap" aria-label="${esc(c.nama)} Pertemuan ${esc(n)}${examMark(m) ? ' (' + examMark(m) + ')' : ''}, ${pct}% siap">${examMark(m) ? `<span class="peta-mark">${examMark(m)}</span>${pct ? `<span class="peta-num">${pct}</span>` : ''}` : pct ? pct : ''}</button></td>`; };
    const cols = (c, f) => utsN.map(n => f(c, n)).join('') + (uasN.length ? '<td class="peta-sep" aria-hidden="true"></td>' + uasN.map(n => f(c, n)).join('') : '');
    peta = `<section class="space-y-2" aria-label="Peta belajar">
      <div class="flex flex-wrap items-end justify-between gap-2"><h2 class="text-xl font-extrabold text-ink">Peta belajar</h2>
        <p class="text-xs text-slate-500">Angka = % siap. Kotak bergaris tebal = pertemuan ujian, CPMK, atau tugas. Klik kotak untuk masuk, atau nama matkul untuk daftar pertemuannya.</p></div>
      <div class="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto"><table class="peta w-full ${uasN.length ? 'min-w-[880px]' : 'min-w-[600px]'}">
        <colgroup><col class="w-[7rem] sm:w-[9.5rem]">${utsN.map(() => '<col>').join('')}${uasN.length ? '<col style="width:8px">' + uasN.map(() => '<col>').join('') : ''}</colgroup>
        <thead>${uasN.length ? `<tr><th></th><th colspan="${utsN.length}" class="peta-babak">Menuju UTS</th><th></th><th colspan="${uasN.length}" class="peta-babak">Menuju UAS</th></tr>` : ''}
          <tr><th class="w-[7rem] sm:w-[9.5rem]"></th>${cols(null, (c, n) => `<th class="text-[11px] font-bold text-slate-500 font-display">P${esc(n)}</th>`).replace('<td class="peta-sep" aria-hidden="true"></td>', '<th></th>')}</tr></thead>
        <tbody>${LIB.map(c => `<tr><th scope="row" class="sticky left-0 z-10 bg-paper pr-2 text-left"><button onclick="go('#/c/${encodeURIComponent(c.id)}')" class="text-left text-xs sm:text-[13px] font-display font-bold text-ink leading-tight hover:underline">${esc(shortName(c))}</button></th>${cols(c, cell)}</tr>`).join('')}</tbody>
      </table></div></section>`;
  }
  const avgOf = (c, ms) => Math.round(ms.reduce((a, m) => a + storedReadiness(c, m), 0) / Math.max(1, ms.length));
  const courseSummary = c => {
    const started = c.meetings.filter(m => storedReadiness(c, m) > 0).length, avg = avgOf(c, c.meetings);
    return `<div class="w-full sm:w-56"><div class="flex justify-between text-[11px] font-semibold text-slate-500 mb-1"><span>${started}/${c.meetings.length} pertemuan dimulai</span><span class="font-bold text-ink">${avg}%</span></div>
      <div class="h-1.5 rounded-full bg-[#ecebe4] overflow-hidden"><div class="h-full" style="width:${avg}%;background:${courseHL(c)}"></div></div></div>`;
  };
  // Daftar pertemuan per babak: babak yang sedang berjalan terbuka, babak yang sudah lewat dilipat
  const babakList = c => {
    const groups = BABAK.map(b => ({ ...b, ms: c.meetings.filter(m => babakOf(m.nomor) === b.id) })).filter(g => g.ms.length);
    const cur = groups[groups.length - 1];
    return groups.map(g => {
      const range = `P${esc(g.ms[0].nomor)}–P${esc(g.ms[g.ms.length - 1].nomor)}`;
      const ol = `<ol class="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden">${g.ms.map(m => meetingRow(c, m)).join('')}</ol>`;
      if (g === cur) return `<div class="space-y-2">${groups.length > 1 || g.id === 'uas' ? `<h3 class="text-sm font-extrabold text-ink">${esc(g.label)} <span class="font-sans font-normal text-slate-500">• ${range}</span></h3>` : ''}${ol}</div>`;
      return `<details class="babak group rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <summary class="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3 hover:bg-[#f6f5ef]">
          <span class="min-w-0"><span class="font-display font-extrabold text-ink">${esc(g.label)}</span> <span class="text-xs text-slate-500">• ${range} • ${g.ms.length} pertemuan • rata-rata ${avgOf(c, g.ms)}% siap</span></span>
          <span class="shrink-0 text-xs font-bold text-slate-500"><span class="group-open:hidden">Buka ▸</span><span class="hidden group-open:inline">Tutup ▾</span></span></summary>
        <div class="border-t border-slate-200">${ol.replace('rounded-2xl border border-slate-200 ', '')}</div></details>`;
    }).join('');
  };
  const lists = showPeta ? '' : list.map(c => `<section class="space-y-3" id="mk-${esc(c.id)}">
      <div class="flex flex-wrap items-end justify-between gap-2"><div>
        <h2 class="text-2xl font-extrabold text-ink"><span class="stabilo" style="--hl:${courseHL(c)}">${esc(c.nama)}</span></h2>
        ${c.dosen ? `<p class="text-xs text-slate-500 mt-1">Dosen: ${esc(c.dosen)}</p>` : ''}</div>
        <div class="w-full sm:w-auto flex flex-col sm:items-end gap-2">${courseSummary(c)}${only && LIB.length > 1 ? `<button onclick="go('#/')" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200">← Semua mata kuliah</button>` : ''}</div></div>
      ${babakList(c)}</section>`).join('');
  $('appMain').innerHTML = `<div class="space-y-8">${cont}${peta}${lists}
    ${list.length ? '' : `<div class="p-8 rounded-2xl border-2 border-dashed border-slate-300 text-center text-slate-500">Belum ada materi.</div>`}
  </div>`;
}
function confirmDelete(cid, mid) {
  const c = findCourse(cid), m = findMeeting(c, mid);
  if (!m) return;
  openModal(`<h3 class="text-lg font-extrabold text-slate-900">Hapus materi ini?</h3>
    <p class="text-sm text-slate-600 mt-2">Pertemuan ${esc(m.nomor)}: <strong>${esc(m.judul)}</strong> (${esc(c.nama)}) akan dihapus dari browser ini. Materi bawaan dari file tidak ikut terhapus.</p>
    <div class="flex justify-end gap-2 mt-5"><button onclick="closeModal()" class="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200">Batal</button>
    <button onclick="deleteImported('${esc(cid)}','${esc(mid)}');closeModal();showToast('Materi dihapus.');route()" class="px-4 py-2 rounded-xl text-sm font-bold bg-rose-600 text-white hover:bg-rose-700">Hapus</button></div>`, 'max-w-md');
}

// ---------- Referensi & bacaan lanjut ----------
const REF_LANG = { ID: '🇮🇩 Indonesia', EN: '🇬🇧 Inggris', AR: '📖 Arab + terjemahan' };
// Hanya link https yang ditampilkan (materi impor bisa berisi apa saja)
const refList = m => (Array.isArray(m.referensi) ? m.referensi : []).filter(r => r && r.judul && (r.url == null || /^https:\/\//i.test(String(r.url))));
function defTitles(def) {
  const t = [];
  const walk = b => { if (!b || typeof b !== 'object') return; if (typeof b.title === 'string') t.push(b.title); if (b.type === 'row') (b.blocks || []).forEach(walk); if (b.type === 'tabs') (b.tabs || []).forEach(x => (x.blocks || []).forEach(walk)); };
  walk(def); return t;
}
function refsHTML(refs) {
  return `<div id="blk-ref" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 min-w-0">
    <span class="inline-block text-[11px] font-bold uppercase tracking-wider text-indigo-600">Bacaan lanjut</span>
    <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">📚 Referensi</h3>
    <p class="text-sm text-slate-600 mb-4">Kalau ada bagian yang belum jelas, sumber-sumber ini menjelaskannya dengan cara lain. Link terbuka di tab baru.</p>
    <ul class="grid sm:grid-cols-2 gap-2.5">${refs.map(r => `<li class="p-3 rounded-xl border border-slate-200 bg-slate-50 ${r.url ? 'hover:border-indigo-300 hover:bg-indigo-50/60' : ''} transition">
      ${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener" class="font-bold text-indigo-700 hover:underline break-words">${esc(r.judul)} ↗</a>` : `<span class="font-bold text-slate-800">📕 ${esc(r.judul)}</span>`}
      <div class="mt-0.5 text-[11px] font-semibold text-slate-500">${esc(r.sumber)}${REF_LANG[r.bahasa] ? ' • ' + REF_LANG[r.bahasa] : ''}</div>
      ${r.ket ? `<p class="mt-1 text-xs text-slate-600 leading-relaxed">${esc(r.ket)}</p>` : ''}
    </li>`).join('')}</ul>
  </div>`;
}

// ---------- Halaman pertemuan ----------
function renderMeeting(fresh) {
  const m = S.meeting;
  if (fresh) { BLOCKS = {}; blockSeq = 0; S.blockIds = { materi: (m.materi || []).map((b, i) => createBlock(b, 'l.' + i, false)), cheatsheet: m.cheatsheet.map((b, i) => createBlock(b, 'c.' + i, false)), simulator: m.simulator.map((b, i) => createBlock(b, 's.' + i, false)) }; }
  const main = $('appMain');
  if (S.tab === 'materi' || S.tab === 'cheatsheet' || S.tab === 'simulator') {
    // Render ulang hanya bila perlu, supaya status interaktif tetap terjaga
    const hero = (S.tab === 'materi' || S.tab === 'cheatsheet') && m.hero ? `<div class="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-900 text-white px-4 py-4 sm:px-6 sm:py-5 shadow-sm space-y-1.5 on-dark">
        ${m.hero.badge ? `<span class="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/15 text-[11px] font-bold rich">${rich(m.hero.badge)}</span>` : ''}
        ${m.hero.title ? `<h2 class="text-lg sm:text-xl font-extrabold leading-snug rich">${rich(m.hero.title)}</h2>` : ''}
        ${m.hero.text ? `<p class="text-[13px] sm:text-sm text-indigo-100 max-w-4xl leading-relaxed rich line-clamp-3 sm:line-clamp-none">${rich(m.hero.text)}</p>` : ''}
      </div>` : '';
    const ids = S.blockIds[S.tab];
    const tocItems = ids.map(n => { const d = BLOCKS[n].def; const t = d.title || d.label || d.heading; return t ? { n, t: String(t).replace(/<[^>]+>/g, '').replace(/`/g, '') } : null; }).filter(Boolean);
    // 📚 Referensi: di akhir tab Materi (atau Ringkasan bila tidak ada Materi) + "Baca juga" di bawah bagian yang cocok
    const refs = refList(m), refTab = (m.materi || []).length ? 'materi' : 'cheatsheet';
    const showRefs = refs.length && S.tab === refTab;
    // Setiap referensi hanya ditempel di bagian pertama yang cocok
    const at = new Map();
    if (showRefs && S.tab === 'materi') refs.forEach(r => { if (!r.bagian) return; const n = ids.find(n => defTitles(BLOCKS[n].def).some(t => t.includes(r.bagian))); if (n) at.set(n, (at.get(n) || []).concat(r)); });
    const inline = n => {
      const hit = at.get(n) || [];
      return hit.length ? `<div class="-mt-2 px-3 sm:px-4 text-xs text-slate-600 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span class="font-bold text-slate-500">📚 Baca juga:</span>${hit.map(r => r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener" class="font-semibold text-indigo-700 hover:underline">${esc(r.judul)} <span class="text-slate-400 font-normal">(${esc(r.sumber)})</span></a>` : `<span class="italic">${esc(r.judul)}</span>`).join('<span class="text-slate-300">•</span>')}</div>` : '';
    };
    if (showRefs && tocItems.length >= 4) tocItems.push({ n: 'ref', t: '📚 Referensi' });
    const toc = tocItems.length >= 4 ? `<div class="p-3 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Lompat ke bagian (${tocItems.length})</div>
        <div class="flex gap-1.5 overflow-x-auto pb-0.5">${tocItems.map((x, k) => `<button onclick="scrollToBlk('${x.n}')" class="shrink-0 max-w-[15rem] truncate px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700" title="${esc(x.t)}">${k + 1}. ${esc(x.t)}</button>`).join('')}</div>
      </div>` : '';
    main.innerHTML = `<section class="space-y-5">${hero}${toc}${ids.map(n => blockHTML(n) + inline(n)).join('')}${showRefs ? refsHTML(refs) : ''}</section>`;
  } else if (S.tab === 'flashcard') renderFlashcards();
  else renderQuiz();
}

function renderFlashcards() {
  const m = S.meeting, p = S.prog;
  const total = m.flashcards.length;
  const mastered = m.flashcards.filter((_, i) => p.mastered.has(i)).length;
  const list = m.flashcards.map((c, i) => ({ c, i })).filter(x => S.fcFilter === 'all' || !p.mastered.has(x.i));
  const fb = on => on ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200';
  $('appMain').innerHTML = `<section class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-5">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3"><div>
      <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Hafalan Aktif (Active Recall)</span>
      <h2 class="text-xl font-extrabold text-slate-900">${total} Kartu Bolak-Balik (3D Flashcard) Persiapan ${esc(m.ujian)}</h2>
      <p class="text-sm text-slate-600">Klik kartu untuk membalik dan melihat jawaban. Tandai <strong>“Sudah Paham”</strong> jika sudah menguasainya!</p></div>
      <div class="flex flex-wrap items-center gap-2">
        <button onclick="setFcFilter('all')" class="px-3 py-1.5 rounded-xl text-xs font-bold ${fb(S.fcFilter === 'all')}">Semua Kartu (${total})</button>
        <button onclick="setFcFilter('unmastered')" class="px-3 py-1.5 rounded-xl text-xs font-bold ${fb(S.fcFilter === 'unmastered')}">Belum Paham Saja</button>
        <span class="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800">Dikuasai: ${mastered} / ${total}</span>
      </div></div>
    ${list.length ? `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${list.map(({ c, i }) => { const ok = p.mastered.has(i);
      return `<div class="perspective-1000 h-64 cursor-pointer select-none" onclick="this.classList.toggle('flipped')">
        <div class="flip-inner">
          <div class="flip-face rounded-2xl border ${ok ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-gradient-to-br from-white to-slate-50'} shadow-sm p-4 flex flex-col">
            <div class="flex items-center justify-between gap-2 text-[11px] font-bold"><span class="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 truncate rich">${rich(c.tag || 'Kartu')}</span><span class="text-slate-400 shrink-0">#${i + 1} • Klik balik →</span></div>
            <p class="flex-1 flex items-center text-sm sm:text-[15px] font-bold text-slate-900 leading-snug py-3 overflow-auto rich">${rich(c.q)}</p>
            <div class="flex items-center justify-between gap-2"><span class="text-[11px] font-semibold ${ok ? 'text-emerald-700' : 'text-slate-400'}">${ok ? '✓ Sudah Dikuasai' : 'Belum ditandai paham'}</span>
              <button onclick="event.stopPropagation();toggleMaster(${i})" class="px-2.5 py-1 rounded-lg text-[11px] font-bold ${ok ? 'bg-white border border-emerald-300 text-emerald-700' : 'bg-indigo-600 text-white'}">${ok ? 'Batalkan Tanda' : 'Tandai Paham ✓'}</button></div>
          </div>
          <div class="flip-face flip-back rounded-2xl bg-slate-900 text-slate-100 shadow-sm p-4 flex flex-col on-dark">
            <div class="flex items-center justify-between text-[11px] font-bold"><span class="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">Kunci Jawaban</span><span class="text-slate-500">Klik untuk kembali</span></div>
            <div class="flex-1 text-xs sm:text-sm leading-relaxed py-3 overflow-auto rich">${rich(c.a)}</div>
            <div class="flex justify-end"><button onclick="event.stopPropagation();toggleMaster(${i})" class="px-2.5 py-1 rounded-lg text-[11px] font-bold ${ok ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-500 text-white'}">${ok ? '✓ Sudah Paham' : 'Saya Sudah Paham!'}</button></div>
          </div>
        </div></div>`; }).join('')}</div>`
    : `<div class="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"><p class="font-bold text-emerald-800">🎉 Luar biasa! Semua kartu hafalan sudah kamu kuasai!</p><button onclick="setFcFilter('all')" class="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 text-white">Tampilkan Semua Kartu</button></div>`}
  </section>`;
}
function setFcFilter(f) { S.fcFilter = f; renderFlashcards(); }
function toggleMaster(i) {
  if (S.prog.mastered.has(i)) S.prog.mastered.delete(i); else { S.prog.mastered.add(i); showToast(`Kartu #${i + 1} ditandai Sudah Paham!`, 'success'); }
  saveProgress(); renderFlashcards(); updateReadiness();
}

function quizStats(m, ans) {
  const out = { total: m.quiz.length, answered: 0, score: 0, wrong: [] };
  m.quiz.forEach((q, i) => { if (ans[i] === undefined) return; out.answered++; if (ans[i] === q.ans) out.score++; else out.wrong.push(i); });
  return out;
}
function renderQuiz() {
  const m = S.meeting, ex = S.exam, L = 'ABCDEFGH';
  const saved = S.prog.quiz, st = quizStats(m, saved), total = st.total, score = st.score;
  const ans = ex ? ex.ans : saved;
  const f = ex ? 'all' : (S.quizFilter || 'all');
  const idx = m.quiz.map((q, i) => i).filter(i => f === 'todo' ? saved[i] === undefined : f === 'wrong' ? st.wrong.includes(i) : true);
  const btn = 'px-3 py-1.5 rounded-xl text-xs font-bold';
  const chip = (id, label, n) => `<button onclick="setQuizFilter('${id}')" class="${btn} ${f === id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${label} (${n})</button>`;
  const exDone = ex ? Object.keys(ex.ans).length : 0;
  const controls = ex
    ? `<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 flex flex-wrap items-center gap-2">
        <span class="text-xs font-bold text-amber-900 flex-1 min-w-[10rem]">📝 Mode ujian • terjawab ${exDone}/${total}</span>
        <button onclick="cancelExam()" class="${btn} bg-white border border-slate-300 text-slate-700 hover:bg-slate-50">Batal</button>
        <button onclick="finishExam()" class="${btn} bg-indigo-600 hover:bg-indigo-700 text-white">Selesai & lihat nilai</button></div>`
    : `<div class="space-y-2">
        <div class="flex items-center gap-2 overflow-x-auto pb-0.5 [&>*]:shrink-0">
          <span class="${btn} bg-indigo-100 text-indigo-800">Skor: ${score} / ${total}</span>
          ${chip('all', 'Semua', total)}${chip('todo', 'Belum dijawab', total - st.answered)}${chip('wrong', 'Salah', st.wrong.length)}</div>
        <div class="flex flex-wrap items-center gap-2">
          ${st.wrong.length ? `<button onclick="retryWrong()" class="${btn} bg-rose-50 text-rose-700 hover:bg-rose-100">🔁 Ulangi yang salah (${st.wrong.length})</button>` : ''}
          <button onclick="startExam()" class="${btn} bg-amber-50 text-amber-800 hover:bg-amber-100">📝 Mode ujian</button>
          <button onclick="resetQuiz()" class="${btn} bg-slate-100 hover:bg-slate-200 text-slate-700">↺ Ulangi kuis</button></div></div>`;
  const card = qi => { const q = m.quiz[qi], ch = ans[qi], done = !ex && ch !== undefined;
    return `<div class="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
        <p class="font-bold text-slate-900 text-sm sm:text-[15px] leading-snug"><span class="text-indigo-600">${qi + 1}.</span> <span class="rich">${rich(q.q)}</span></p>
        <div class="grid gap-2">${q.opts.map((o, oi) => {
          const cls = ex ? (oi === ch ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold' : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-800')
            : !done ? 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-800' : oi === q.ans ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold' : oi === ch ? 'bg-rose-100 border-rose-400 text-rose-950 font-semibold' : 'bg-white/60 border-slate-200 text-slate-500';
          const badge = ex ? (oi === ch ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600') : done && oi === q.ans ? 'bg-emerald-600 text-white' : done && oi === ch ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600';
          const oe = done && Array.isArray(q.optExp) && q.optExp[oi] ? `<span class="block mt-1 text-xs font-normal ${oi === q.ans ? 'text-emerald-800' : 'text-slate-500'} rich">${rich(q.optExp[oi])}</span>` : '';
          return `<button ${done ? 'disabled' : ''} onclick="${ex ? 'examAnswer' : 'answerQuiz'}(${qi},${oi})" class="w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition flex items-start gap-2.5 ${cls}">
            <span class="w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold ${badge}">${L[oi]}</span>
            <span class="min-w-0"><span class="rich">${rich(o)}</span>${oe}</span></button>`; }).join('')}</div>
        ${done ? `<div class="p-3 rounded-xl text-xs sm:text-sm ${ch === q.ans ? 'bg-emerald-50 border border-emerald-200 text-emerald-950' : 'bg-rose-50 border border-rose-200 text-rose-950'}"><strong>${ch === q.ans ? '✅ Jawaban Benar!' : '❌ Kurang Tepat.'} Pembahasan:</strong> <span class="rich">${rich(q.exp || ('Jawaban yang benar adalah ' + L[q.ans] + '.'))}</span></div>` : ''}
      </div>`; };
  const empty = !idx.length ? `<div class="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center text-sm font-semibold text-slate-500">${f === 'wrong' ? '🎉 Tidak ada jawaban yang salah.' : f === 'todo' ? '✅ Semua soal sudah dijawab.' : 'Belum ada soal.'}</div>` : '';
  $('appMain').innerHTML = `<section class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-5">
    <div class="space-y-3"><div>
      <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Evaluasi Mandiri Terpadu</span>
      <h2 class="text-xl font-extrabold text-slate-900">Simulasi Kuis ${esc(m.ujian)} Pertemuan ${esc(m.nomor)} (${total} Soal)</h2>
      <p class="text-sm text-slate-600">${ex ? 'Seperti ujian sungguhan: jawaban bisa diganti, pembahasan dan nilai baru muncul setelah kamu menekan <strong>Selesai</strong>.' : 'Pilih jawaban yang paling tepat. Pembahasan langsung muncul setiap kali kamu menjawab!'}</p></div>
      ${controls}</div>
    <div class="space-y-4">${idx.map(card).join('')}${empty}</div>
    ${ex ? `<button onclick="finishExam()" class="w-full px-4 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white">Selesai & lihat nilai (${exDone}/${total} terjawab)</button>` : ''}
    ${!ex && f === 'all' && st.answered === total && total ? `<div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-900 text-white text-center space-y-3">
      <h3 class="text-lg sm:text-xl font-extrabold">${score / total >= 0.8 ? '🎉 Luar Biasa!' : '💪 Terus Semangat!'} Skor ${esc(m.ujian)} Kamu: ${Math.round(score / total * 100)} / 100 (${score}/${total} Benar)</h3>
      <p class="text-sm text-indigo-100">${score / total >= 0.8 ? `Kamu sudah sangat siap menghadapi soal-soal ${esc(m.ujian)} Pertemuan ${esc(m.nomor)}.` : 'Baca kembali pembahasan pada soal yang masih keliru, atau tekan "Ulangi yang salah" untuk mengerjakannya lagi.'}</p>
      <div class="flex flex-wrap justify-center gap-2">${st.wrong.length ? `<button onclick="retryWrong()" class="px-4 py-2 rounded-xl bg-white text-indigo-700 text-sm font-bold hover:bg-indigo-50">🔁 Ulangi yang salah (${st.wrong.length})</button>` : ''}<button onclick="resetQuiz()" class="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-sm font-bold">Coba Kerjakan Ulang</button>
      <button onclick="openShareModal()" class="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-sm font-bold">Bagikan / Unduh</button></div>
    </div>` : ''}
  </section>`;
}
function setQuizFilter(f) { S.quizFilter = f; renderQuiz(); window.scrollTo({ top: 0 }); }
function retryWrong() {
  const st = quizStats(S.meeting, S.prog.quiz); if (!st.wrong.length) return;
  st.wrong.forEach(i => delete S.prog.quiz[i]); saveProgress();
  S.quizFilter = 'todo'; renderQuiz(); updateReadiness(); window.scrollTo({ top: 0 });
  showToast(`${st.wrong.length} soal yang salah dibuka lagi. Coba kerjakan ulang!`);
}
function startExam() {
  openModal(`<h3 class="text-lg font-extrabold text-slate-900">📝 Mulai mode ujian?</h3>
    <ul class="text-sm text-slate-600 mt-2 list-disc pl-5 space-y-1"><li>Semua ${S.meeting.quiz.length} soal dikerjakan tanpa melihat pembahasan.</li><li>Jawaban bisa diganti sebelum kamu menekan <strong>Selesai</strong>.</li><li>Setelah selesai, nilai dan pembahasan muncul, dan jawaban kuis sebelumnya di pertemuan ini <strong>diganti</strong> hasil ujian ini.</li></ul>
    <div class="flex justify-end gap-2 mt-5"><button onclick="closeModal()" class="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200">Batal</button>
    <button onclick="beginExam()" class="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700">Mulai</button></div>`, 'max-w-md');
}
function beginExam() { closeModal(); S.exam = { ans: {}, start: Date.now() }; renderQuiz(); window.scrollTo({ top: 0 }); }
function examAnswer(qi, oi) { if (!S.exam) return; S.exam.ans[qi] = oi; const y = window.scrollY; renderQuiz(); window.scrollTo(0, y); }
function cancelExam() { S.exam = null; renderQuiz(); window.scrollTo({ top: 0 }); }
function finishExam(force) {
  const ex = S.exam, m = S.meeting; if (!ex) return;
  const left = m.quiz.length - Object.keys(ex.ans).length;
  if (left && !force) {
    openModal(`<h3 class="text-lg font-extrabold text-slate-900">Masih ada ${left} soal belum dijawab</h3>
      <p class="text-sm text-slate-600 mt-2">Soal yang kosong tidak mendapat nilai. Tetap selesai sekarang?</p>
      <div class="flex justify-end gap-2 mt-5"><button onclick="closeModal()" class="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200">Lanjut mengerjakan</button>
      <button onclick="finishExam(true)" class="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700">Selesai</button></div>`, 'max-w-md');
    return;
  }
  closeModal();
  S.prog.quiz = Object.assign({}, ex.ans); saveProgress();
  const min = Math.max(1, Math.round((Date.now() - ex.start) / 60000));
  S.exam = null; S.quizFilter = 'all'; renderQuiz(); updateReadiness(); window.scrollTo({ top: 0 });
  const st = quizStats(m, S.prog.quiz);
  showToast(`Nilai ujian: ${Math.round(st.score / Math.max(1, st.total) * 100)} (${st.score}/${st.total} benar, ±${min} menit).`, 'success');
}
function answerQuiz(qi, oi) { S.prog.quiz[qi] = oi; saveProgress(); const y = window.scrollY; renderQuiz(); window.scrollTo(0, y); updateReadiness(); }
function resetQuiz() { S.exam = null; S.quizFilter = 'all'; S.prog.quiz = {}; saveProgress(); renderQuiz(); updateReadiness(); showToast('Kuis direset. Silakan kerjakan kembali!'); }

// =====================================================================
//  MODAL: Bagikan / Unduh & Tambah Materi
// =====================================================================
function openModal(html, width = 'max-w-lg') {
  $('modalRoot').innerHTML = `<div class="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto" onclick="if(event.target===this)closeModal()">
    <div class="relative w-full ${width} bg-white rounded-2xl shadow-2xl p-5 sm:p-6 my-auto">
      <button onclick="closeModal()" class="absolute top-3 right-3 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100" aria-label="Tutup">${svg('x')}</button>${html}</div></div>`;
}
function closeModal() { $('modalRoot').innerHTML = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ---------- Pasang sebagai aplikasi (PWA) ----------
let INSTALL_PROMPT = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); INSTALL_PROMPT = e; });
window.addEventListener('appinstalled', () => { INSTALL_PROMPT = null; showToast('Aplikasi terpasang. Buka dari layar utama, bisa tanpa internet.', 'success'); });
const isStandalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
async function installApp() {
  if (!INSTALL_PROMPT) return;
  const p = INSTALL_PROMPT; INSTALL_PROMPT = null;
  p.prompt();
  try { await p.userChoice; } catch (e) { }
  closeModal();
}
function installBox(box, b) {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return '';
  const title = 'Pasang sebagai Aplikasi (bisa tanpa internet)';
  if (isStandalone()) return box(title, '✅ Sudah terpasang. Semua materi tersimpan di perangkat ini, jadi tetap bisa dibuka saat tidak ada sinyal.', '');
  if (INSTALL_PROMPT) return box(title, 'Muncul sebagai ikon <strong>Belajar</strong> di layar utama, terbuka tanpa bilah browser, dan semua materi bisa dibuka saat offline.', b('installApp()', 'Pasang Aplikasi'));
  if (isIOS()) return box(title, 'Di iPhone/iPad (Safari): ketuk tombol <strong>Bagikan</strong> <span aria-hidden="true">⬆️</span> di bawah, lalu pilih <strong>Tambah ke Layar Utama</strong>. Setelah itu materi bisa dibuka tanpa internet.', '');
  return box(title, 'Buka menu browser (<strong>⋮</strong>), lalu pilih <strong>Instal aplikasi</strong> atau <strong>Tambahkan ke layar utama</strong>. Setelah dibuka sekali, materi tetap bisa dibuka tanpa internet.', '');
}

function openShareModal() {
  const c = S.course, m = S.meeting;
  const box = (title, text, btn) => `<div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2"><p class="font-bold text-slate-900 text-sm">${title}</p><p class="text-xs text-slate-600">${text}</p>${btn}</div>`;
  const b = (onclick, label, cls = 'bg-indigo-600 hover:bg-indigo-700 text-white') => `<button onclick="${onclick}" class="w-full px-4 py-2.5 rounded-xl text-sm font-bold ${cls}">${label}</button>`;
  openModal(`<div class="flex items-center gap-3 mb-4 pr-8"><div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">${svg('share')}</div>
      <div><h3 class="text-lg font-extrabold text-slate-900">Bagikan ke Teman Kuliah</h3><p class="text-xs text-slate-500">Bisa dibuka di HP/Laptop tanpa instal aplikasi tambahan</p></div></div>
    <div class="space-y-3">
      ${installBox(box, b)}
      ${box('Cara 1: Unduh File Aplikasi Mandiri (.html)', 'Semua materi, flashcard, dan kuis tersimpan dalam <strong>1 file HTML</strong>, termasuk materi yang kamu tambahkan. Kirim lewat grup WhatsApp/Telegram, temanmu cukup membukanya di browser.',
        `<div class="grid ${m ? 'sm:grid-cols-2' : ''} gap-2">${b('downloadApp(\'all\')', 'Unduh (semua materi)')}${m ? b('downloadApp(\'meeting\')', 'Unduh (pertemuan ini saja)', 'bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-50') : ''}</div>`)}
      ${m ? box('Cara 2: Salin Ringkasan Cepat untuk WhatsApp', `Intisari Pertemuan ${esc(m.nomor)} yang sudah diformat rapi untuk langsung ditempel ke chat.`, b('copySummary()', 'Salin Ringkasan ke Clipboard', 'bg-emerald-600 hover:bg-emerald-700 text-white')) : ''}
    </div>`);
}
// ---------- Progres belajarku: ekspor / impor / reset ----------
function fmtTime(t) { if (!t) return 'belum pernah'; try { return new Date(t).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }); } catch (e) { return new Date(t).toISOString(); } }
function progressFileName() { const d = new Date(), z = n => String(n).padStart(2, '0'); return `progres_belajar_${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}.json`; }
function openProgressModal() {
  const st = PROGRESS.stats();
  const box = (title, text, inner) => `<div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2"><p class="font-bold text-slate-900 text-sm">${title}</p>${text ? `<p class="text-xs text-slate-600">${text}</p>` : ''}${inner}</div>`;
  const btn = (onclick, label, cls = 'bg-indigo-600 hover:bg-indigo-700 text-white') => `<button onclick="${onclick}" class="w-full px-4 py-2.5 rounded-xl text-sm font-bold ${cls}">${label}</button>`;
  const ghost = 'bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-50';
  openModal(`<div class="flex items-center gap-3 mb-4 pr-8"><div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">${svg('chart')}</div>
      <div><h3 class="text-lg font-extrabold text-slate-900">Progres Belajarku</h3><p class="text-xs text-slate-500">Tersimpan otomatis di browser ini, khusus untukmu</p></div></div>
    <div class="grid grid-cols-3 gap-2 mb-3 text-center">
      <div class="p-2.5 rounded-xl bg-indigo-50"><div class="text-lg font-extrabold text-indigo-700">${st.meetings}</div><div class="text-[11px] font-semibold text-slate-600">pertemuan dibuka</div></div>
      <div class="p-2.5 rounded-xl bg-emerald-50"><div class="text-lg font-extrabold text-emerald-700">${st.quiz}</div><div class="text-[11px] font-semibold text-slate-600">soal kuis dijawab</div></div>
      <div class="p-2.5 rounded-xl bg-amber-50"><div class="text-lg font-extrabold text-amber-700">${st.mastered}</div><div class="text-[11px] font-semibold text-slate-600">flashcard paham</div></div>
    </div>
    <p class="text-xs text-slate-500 mb-3">Terakhir disimpan: <strong class="text-slate-700">${esc(fmtTime(st.updatedAt))}</strong>. Progres tidak ikut pindah ke HP/laptop lain atau browser lain, dan bisa hilang kalau data browser dihapus. Simpan cadangannya di bawah ini.</p>
    <div class="space-y-3">
      ${box('1. Simpan cadangan / pindah perangkat', 'Unduh file <strong>.json</strong> (simpan di Drive/WA ke diri sendiri), atau salin kodenya lalu tempel di perangkat lain.',
        `<div class="grid sm:grid-cols-2 gap-2">${btn('exportProgressFile()', 'Unduh file progres')}${btn('copyProgressCode()', 'Salin kode progres', ghost)}</div>`)}
      ${box('2. Pulihkan dari cadangan', 'Pilih file .json progres, atau tempel kodenya. Progres yang sudah ada di sini akan <strong>digabung</strong> (tidak ada yang hilang).',
        `<input id="progFile" type="file" accept=".json,application/json,text/plain" onchange="importProgressFile(this)" class="block w-full text-xs text-slate-600">
        <textarea id="progText" rows="3" placeholder="…atau tempel kode progres di sini" class="w-full p-2 rounded-xl border border-slate-300 bg-white text-xs font-mono"></textarea>
        ${btn('importProgressText()', 'Pulihkan dari kode yang ditempel', ghost)}
        <p id="progMsg" class="text-xs"></p>`)}
      <details class="text-xs text-slate-500"><summary class="cursor-pointer font-semibold">Mulai dari nol</summary>
        <div class="mt-2 space-y-2"><p>Menghapus seluruh progres di browser ini (kuis, flashcard, kesiapan). Unduh cadangan dulu kalau masih ingin menyimpannya.</p>
        <button onclick="confirmResetProgress()" class="px-3 py-2 rounded-xl font-bold text-rose-600 bg-white border border-rose-300 hover:bg-rose-50">Hapus semua progres</button></div></details>
    </div>`);
}
function progressJSON() { return JSON.stringify(PROGRESS.exportDoc()); }
function exportProgressFile() { downloadFile(progressFileName(), progressJSON(), 'application/json;charset=utf-8'); showToast('File progres diunduh. Simpan baik-baik, ya!', 'success'); }
async function copyProgressCode() { showToast(await copyText(progressJSON()) ? 'Kode progres disalin. Tempel di perangkat lain lewat menu Progresku.' : 'Gagal menyalin. Coba "Unduh file progres".', 'success'); }
function applyProgressImport(text) {
  const msg = $('progMsg');
  try {
    const n = PROGRESS.importDoc(parseLooseJSON(text), 'merge');
    closeModal(); showToast(`Progres dipulihkan (${n} pertemuan).`, 'success');
    if (S.course && S.meeting) S.prog = loadProgress(S.course, S.meeting);
    route(curHash());
  } catch (e) {
    if (msg) { msg.className = 'text-xs text-rose-700 font-semibold'; msg.textContent = 'Gagal membaca progres: ' + e.message + '.'; }
  }
}
function importProgressText() { const t = $('progText').value.trim(); if (!t) { $('progMsg').className = 'text-xs text-amber-700 font-semibold'; $('progMsg').textContent = 'Tempel dulu kode progresnya.'; return; } applyProgressImport(t); }
function importProgressFile(input) { const f = input.files && input.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => applyProgressImport(String(r.result || '')); r.onerror = () => { $('progMsg').textContent = 'File tidak bisa dibaca.'; }; r.readAsText(f); }
function confirmResetProgress() {
  openModal(`<h3 class="text-lg font-extrabold text-slate-900">Hapus semua progres?</h3>
    <p class="text-sm text-slate-600 mt-2">Semua jawaban kuis, flashcard yang ditandai paham, dan persentase kesiapan di browser ini akan dihapus. Tidak bisa dibatalkan.</p>
    <div class="flex justify-end gap-2 mt-5"><button onclick="openProgressModal()" class="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200">Batal</button>
    <button onclick="PROGRESS.reset();closeModal();if(S.course&&S.meeting)S.prog=loadProgress(S.course,S.meeting);route(curHash());showToast('Progres dihapus. Mulai lagi dari awal!')" class="px-4 py-2 rounded-xl text-sm font-bold bg-rose-600 text-white hover:bg-rose-700">Hapus</button></div>`, 'max-w-md');
}
function buildStandalone(src, courses) {
  const doc = src.cloneNode(true);
  const json = JSON.stringify(courses.map(c => Object.assign({}, c, { meetings: c.meetings.map(stripMeta) }))).replace(/</g, '\\u003c');
  doc.querySelector('#library-data').textContent = json;
  return '<!DOCTYPE html>\n' + doc.outerHTML;
}
async function downloadApp(scope) {
  let courses = LIB, name = 'Aplikasi_Belajar_' + (APP.semester ? APP.semester.replace(/\s+/g, '_') : 'Interaktif') + '.html';
  if (scope === 'meeting' && S.meeting) {
    courses = [Object.assign({}, S.course, { meetings: [S.meeting] })];
    name = `Belajar_Interaktif_${S.meeting.ujian}_${S.course.nama}_Pertemuan_${S.meeting.nomor}.html`.replace(/[^\w.-]+/g, '_');
  }
  showToast('Menyiapkan file HTML…');
  try {
    let html;
    if (courses === LIB && !LIB.some(c => c.meetings.some(m => m._imported))) html = await fetchText(assetUrl('offline.html'));
    else {
      await Promise.all(courses.flatMap(c => c.meetings.filter(m => m._lazy).map(m => fetchMeeting(c, m))));
      html = buildStandalone(await pageSource(), courses);
    }
    downloadFile(name, html, 'text/html;charset=utf-8');
  } catch (e) { showToast('Gagal menyiapkan file. Periksa koneksi internet lalu coba lagi.', 'error'); return; }
  showToast('File HTML berhasil diunduh! Siap dikirim ke grup WA/Telegram.', 'success');
}
function autoSummary(c, m) {
  const lines = [`*RANGKUMAN KILAT ${m.ujian.toUpperCase()} ${c.nama.toUpperCase()} PERTEMUAN ${m.nomor}${c.kode ? ' (' + c.kode + ')' : ''}*`, `📚 *${m.judul}*`, ''];
  const plain = h => { const d = document.createElement('div'); d.innerHTML = rich(String(h).replace(/<br\s*\/?>/gi, '\n')); return d.textContent.trim(); };
  m.flashcards.forEach((f, i) => { lines.push(`${i + 1}. *${plain(f.q)}*`); lines.push(plain(f.a)); lines.push(''); });
  return lines.join('\n').trim();
}
async function copySummary() {
  const ok = await copyText(S.meeting.ringkasan || autoSummary(S.course, S.meeting));
  showToast(ok ? 'Ringkasan disalin! Tinggal tempel di WhatsApp/Telegram.' : 'Gagal menyalin. Coba lagi.', ok ? 'success' : 'error');
}
function downloadMeetingJSON() {
  const c = S.course, m = S.meeting;
  const data = Object.assign({}, c, { meetings: [stripMeta(m)] });
  downloadFile(`materi_${slug(c.kode || c.nama)}_pertemuan_${m.nomor}.json`, JSON.stringify(data, null, 2), 'application/json');
}

function openImportModal(courseId) {
  const c = courseId ? findCourse(courseId) : S.course;
  let prompt = PROMPT_TEMPLATE;
  if (c) {
    const next = c.meetings.length ? Math.max(...c.meetings.map(x => Number(x.nomor) || 0)) + 1 : 1;
    prompt = prompt.replace('[misal SIF002]', c.kode || '-').replace('[misal Basis Data]', c.nama).replace('[misal 3]', String(next))
      .replace('[misal Universitas Siber Muhammadiyah • PJJ Sistem Informasi]', [c.kampus, c.prodi].filter(Boolean).join(' • ') || '-')
      .replace('"id": "slug-mata-kuliah",            // contoh "sif002-basis-data" (huruf kecil, tanpa spasi)', `"id": "${c.id}",            // JANGAN diubah, supaya masuk ke mata kuliah yang sama`);
  }
  window.__prompt = prompt;
  openModal(`<div class="pr-8 mb-4"><h3 class="text-lg font-extrabold text-slate-900">Tambah Materi (Pertemuan / Mata Kuliah Baru)</h3>
      <p class="text-xs text-slate-500">${c ? `Prompt di bawah sudah diisi untuk <strong>${esc(c.nama)}</strong>. Ganti bagian identitas bila untuk mata kuliah lain.` : 'Cocok untuk mata kuliah apa saja.'}</p></div>
    <div class="space-y-4">
      <div class="p-4 rounded-xl border border-indigo-200 bg-indigo-50 space-y-2">
        <p class="font-bold text-sm text-indigo-950">Langkah 1: Minta AI membuatkan datanya</p>
        <p class="text-xs text-indigo-900">Salin prompt ini, tempel ke Gemini / Claude / ChatGPT, lampirkan file materi (PDF/PPT/modul), lalu kirim. Lengkapi bagian dalam [kurung siku] bila perlu.</p>
        <textarea readonly class="w-full h-28 p-2.5 rounded-lg border border-indigo-200 bg-white font-mono text-[11px] text-slate-700">${esc(prompt)}</textarea>
        <button onclick="copyText(window.__prompt).then(ok=>showToast(ok?'Prompt disalin!':'Gagal menyalin', ok?'success':'error'))" class="w-full px-4 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white">Salin Prompt untuk AI</button>
      </div>
      <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
        <p class="font-bold text-sm text-slate-900">Langkah 2: Tempel hasil JSON dari AI (atau pilih file .json)</p>
        <textarea id="importText" placeholder='Tempel di sini, contoh: { "id": "...", "nama": "...", "meetings": [ ... ] }' class="w-full h-36 p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-[11px]"></textarea>
        <div class="flex flex-col sm:flex-row gap-2">
          <label class="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-center cursor-pointer">Pilih File .json<input id="importFile" type="file" accept=".json,application/json,text/plain" class="hidden"></label>
          <button onclick="doImport()" class="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white">Simpan Materi</button>
        </div>
        <p id="importMsg" class="text-xs"></p>
      </div>
      <p class="text-[11px] text-slate-500">Materi tambahan disimpan di browser ini. Agar tidak hilang dan bisa dibagikan, unduh lewat <strong>Bagikan / Unduh → Unduh (semua materi)</strong>; file .html hasil unduhan sudah berisi materi barumu.</p>
    </div>`, 'max-w-2xl');
  $('importFile').onchange = e => { const f = e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => { $('importText').value = rd.result; doImport(); }; rd.readAsText(f); };
}
function parseLooseJSON(text) {
  let t = String(text || '').trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i); if (fence) t = fence[1].trim();
  const start = t.search(/[\[{]/); if (start > 0) t = t.slice(start);
  const end = Math.max(t.lastIndexOf('}'), t.lastIndexOf(']')); if (end >= 0) t = t.slice(0, end + 1);
  try { return JSON.parse(t); } catch (e) {
    // perbaikan ringan: hapus komentar // dan koma berlebih
    const t2 = t.replace(/^\s*\/\/.*$/gm, '').replace(/([^:"'\\])\/\/[^\n"]*$/gm, '$1').replace(/,\s*([}\]])/g, '$1');
    return JSON.parse(t2);
  }
}
function doImport() {
  const msg = $('importMsg');
  try {
    const obj = parseLooseJSON($('importText').value);
    const courses = coursesFromJSON(obj);
    const meetings = courses.reduce((s, c) => s + c.meetings.length, 0);
    if (!meetings) throw new Error('Tidak ada pertemuan di dalam data.');
    if (!saveImported(courses)) { msg.className = 'text-xs text-amber-700 font-semibold'; msg.textContent = 'Browser tidak mengizinkan penyimpanan; materi hanya tersedia sampai halaman ditutup. Segera unduh file .html-nya.'; LIB = mergeCourses(LIB, courses, true); }
    closeModal();
    const c = findCourse(courses[0].id), m = findMeeting(c, courses[0].meetings[0].id);
    showToast(`Berhasil menambahkan ${meetings} pertemuan!`, 'success');
    go(routeFor(c, m));
  } catch (e) {
    msg.className = 'text-xs text-rose-700 font-semibold';
    msg.textContent = 'Gagal membaca JSON: ' + e.message + '. Pastikan yang ditempel hanya blok JSON dari AI.';
  }
}

// ---------- Mulai ----------
loadLibrary();
(function start() {
  // Tanpa alamat khusus (mis. dibuka dari Google Sites) → lanjutkan dari halaman terakhir yang dibuka.
  const last = !location.hash && PROGRESS.getLast();
  if (last) {
    const parts = last.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    const c = parts[0] === 'c' && findCourse(parts[1]), m = c && parts[2] === 'm' && findMeeting(c, parts[3]);
    if (m) { go(last.hash, 'nav'); showToast(`Melanjutkan: ${c.nama} • Pertemuan ${m.nomor}`); return; }
  }
  route();
})();
