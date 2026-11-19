// Dijalankan di iframe terisolasi bersama kode latihan. Fungsi ini harus mandiri.
function playgroundBehavior(profile, request) {
  const results = {};
  let alerts = 0;
  window.alert = () => { alerts++; };
  window.confirm = () => true;
  addEventListener('load', () => {
    try {
      const find = sel => document.querySelector(sel);
      if (profile === 'theme') {
        const button = find('#theme-btn');
        const links = [...document.querySelectorAll('nav a')];
        if (button && links.length) {
          const colors = () => links.map(a => getComputedStyle(a).color);
          const start = colors();
          button.click();
          const dark = colors();
          results.lightLabel = button.textContent.trim() === 'Tema Terang';
          button.click();
          const light = colors();
          results.darkLabel = button.textContent.trim() === 'Tema Gelap';
          results.nav = links.every((_, i) => start[i] !== dark[i] && dark[i] !== light[i]);
        }
      } else if (profile === 'validasi') {
        // Form validasi P9: isi semua kolom dengan benar, lalu rusak satu kolom per percobaan.
        const form = find('form');
        const field = id => find('#' + id);
        const nim = field('nim'), nama = field('nama'), jurusan = field('jurusan'), email = field('email');
        const errText = id => (find('#' + id + '-error')?.textContent || '').trim();
        const rows = () => [...document.querySelectorAll('table tbody tr')];
        if (form && nim && nama && email) {
          const fill = (over = {}) => {
            const v = { nim: '2401010001', nama: 'Ahmad', email: 'ahmad@kampus.ac.id', jurusan: jurusan ? ([...jurusan.options].find(o => o.value)?.value || '') : '', ...over };
            nim.value = v.nim; nama.value = v.nama; email.value = v.email;
            if (jurusan) jurusan.value = v.jurusan;
          };
          const submit = () => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          const rejected = (id, over) => {
            fill(over);
            const before = alerts, count = rows().length;
            submit();
            return !!errText(id) || (alerts > before && rows().length === count && field(id).value === String(over[id]));
          };
          results.nim = ['12345', '12345abcde'].every(bad => rejected('nim', { nim: bad }));
          results.nama = rejected('nama', { nama: 'Al' });
          results.email = ['ahmad@kampus', 'ahmad kampus@x.id'].every(bad => rejected('email', { email: bad }));
          if (jurusan) results.jurusan = rejected('jurusan', { jurusan: '' });
          fill();
          const count = rows().length;
          submit();
          const clean = ['nim', 'nama', 'email', 'jurusan'].every(id => !errText(id));
          results.valid = clean && nim.value === '';
          const added = rows().find(row => row.cells[0]?.textContent.trim() === '2401010001');
          results.tabel = clean && rows().length === count + 1 && !!added && added.cells[1]?.textContent.trim() === 'Ahmad' && nim.value === '';
          fill({ nim: '2401010002', nama: '<b>Ani</b>' });
          submit();
          const tagged = rows().find(row => row.cells[0]?.textContent.trim() === '2401010002');
          results.aman = !!tagged && tagged.cells[1]?.textContent.trim() === '<b>Ani</b>' && !tagged.cells[1].querySelector('b');
          const clear = find('#clear-btn');
          if (clear && rows().length) { clear.click(); results.hapus = rows().length === 0; }
        }
      } else {
        const withEmail = profile === 'dom-table';
        const add = find(withEmail ? '#add-btn' : '#tambah-btn');
        const nim = find('#nim'), nama = find('#nama'), jurusan = find('#jurusan');
        const email = find('#email');
        const rows = () => [...document.querySelectorAll('table tbody tr')];
        const initial = rows().length;
        if (add && nim && nama && jurusan && (!withEmail || email)) {
          const set = (id, name) => {
            nim.value = id;
            nama.value = name;
            jurusan.value = [...jurusan.options].find(o => o.value)?.value || '';
            if (withEmail) email.value = 'contoh@example.test';
            for (const field of [nim, nama, jurusan, email].filter(Boolean)) {
              field.dispatchEvent(new Event('input', { bubbles: true }));
              field.dispatchEvent(new Event('change', { bubbles: true }));
            }
          };
          set('', 'Contoh');
          add.click();
          results.empty = alerts > 0 && rows().length === initial;
          if (!withEmail) {
            for (const invalid of ['1e3', '0x10', '12.5', '-123']) {
              set(invalid, 'Contoh');
              add.click();
              results.nim = (results.nim ?? true) && rows().length === initial;
            }
          }
          const name = '<b>Contoh</b>';
          set('00123', name);
          const major = jurusan.value;
          add.click();
          const first = rows().find(row => row.cells[0]?.textContent.trim() === '00123');
          results.add = rows().length === initial + 1 && first?.cells[1]?.textContent.trim() === name && first?.cells[2]?.textContent.trim() === major
            && (!withEmail || first?.cells[3]?.textContent.trim() === 'contoh@example.test');
          results.text = results.add && !first.cells[1].querySelector('b');
          if (withEmail) {
            find('#clear-btn')?.click();
            results.remove = !!results.add && rows().length === 0;
          } else {
            set('00456', 'Mahasiswa Kedua');
            add.click();
            const secondAdded = rows().some(row => row.cells[0]?.textContent.trim() === '00456');
            first?.querySelector('button')?.click();
            results.remove = !!results.add && secondAdded && rows().length === initial + 1
              && !rows().some(row => row.cells[0]?.textContent.trim() === '00123')
              && rows().some(row => row.cells[0]?.textContent.trim() === '00456');
          }
        }
      }
    } finally {
      parent.postMessage({ playgroundAssessment: request, results }, '*');
    }
  }, { once: true });
}

function assessPlayground(profile, code) {
  if (!['theme', 'dom-table', 'student-app', 'validasi'].includes(profile)) return Promise.resolve({});
  return new Promise(resolve => {
    const frame = document.createElement('iframe');
    frame.hidden = true;
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.title = 'Pengujian kode';
    const request = Math.random().toString(36).slice(2);
    const helper = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; form-action 'none'"><script>(${playgroundBehavior.toString()})(${JSON.stringify(profile)},${JSON.stringify(request)});</script>`;
    const done = result => {
      clearTimeout(timer);
      window.removeEventListener('message', receive);
      frame.remove();
      resolve(result);
    };
    const receive = e => {
      if (e.source !== frame.contentWindow || e.data?.playgroundAssessment !== request) return;
      done(e.data.results || {});
    };
    const timer = setTimeout(() => done({}), 1800);
    window.addEventListener('message', receive);
    frame.srcdoc = /<head\b[^>]*>/i.test(code) ? code.replace(/<head\b[^>]*>/i, head => head + helper) : '<head>' + helper + '</head>' + code.replace(/^\s*<!doctype html>/i, '');
    document.body.appendChild(frame);
  });
}
