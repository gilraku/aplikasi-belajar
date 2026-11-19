// Adegan bergerak untuk Materi Lengkap (blok "adegan") + penelusur langkah (blok "penelusur").
// Adegan digambar di <canvas> oleh runtime stick.js (dimuat sebelum file ini). Setiap adegan mendaftar di
// window.SCENES lewat id-nya, lalu dipakai dari materi: { type: "adegan", scene: "<id>", steps: [...] }.
// Menambah adegan baru: tulis satu SC['<id>'] di bawah (susunan barang + urutan gerakan berdasarkan waktu T),
// panggil step(g, '<kunci>') untuk menyalakan langkah/kode bertanda sorot: '<kunci>' di materi.
(function () {
  const SC = (window.SCENES = window.SCENES || {});
  const R = window.RIG;
  const { C, E, P, mix, legs, walkSeg, fig, inkFill, rr, ln, text, seg, breathe, pulse, lp, sparks, tickBadge, words, typed, lerp, clamp, arcPt, circle } = R;

  // Warna Sinau
  const INK = '#17202a', GREEN = '#1f5c52', GREEN_FAR = '#9fc4ba', HL = '#ffe14d', HL_SOFT = '#fff6c2', MUTED = '#6c7480', LINE = '#dcdbd2', RED = '#b4442f', RED_SOFT = '#f6ddd6';
  const MONO = (s, w) => `${w || 700} ${s}px 'JetBrains Mono', ui-monospace, Menlo, monospace`;

  // Huruf digambar satu per satu supaya JetBrains Mono tidak menggabung <= jadi ≤ atau << jadi «.
  function mono(g, s, x, y, size, col, align) {
    s = String(s);
    g.font = MONO(size);
    g.fillStyle = col || INK;
    g.textAlign = 'left';
    g.textBaseline = 'alphabetic';
    const cw = g.measureText('0').width, w = cw * s.length;
    let x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    for (const ch of s) {
      if (ch !== ' ') g.fillText(ch, x0, y);
      x0 += cw;
    }
  }
  function monoW(g, s, size) {
    g.font = MONO(size);
    return g.measureText('0').width * String(s).length;
  }
  // Coretan stabilo: persegi sedikit miring yang memanjang dari kiri sesuai k.
  function stabilo(g, x, y, w, h, k, col) {
    if (k <= 0) return;
    g.save();
    g.translate(x, y + h / 2);
    g.rotate(-0.02);
    g.globalAlpha *= 0.9;
    rr(g, -1, -h / 2, (w + 2) * clamp(k, 0, 1), h, 2);
    g.fillStyle = col || HL;
    g.fill();
    g.restore();
  }
  // Langkah yang sedang berjalan, untuk menyorot daftar langkah di HTML.
  // Langkah yang sedang berjalan: menyalakan butir langkah dan potongan kode yang bertanda sorot sama.
  function step(g, v) {
    const el = g.canvas && g.canvas.parentElement;
    if (!el || el.dataset.step === v) return;
    el.dataset.step = v;
    const box = el.closest('.adg');
    if (box) box.querySelectorAll('[data-sorot]').forEach((x) => x.classList.toggle('is-on', !!v && x.dataset.sorot === v));
  }
  const reducedNow = () => !!(window.STICK && window.STICK.reduced && window.STICK.reduced.matches);
  const REST = () => P({ hF: [12, -60], hB: [-4, -52] });
  const CHIN = P({ hF: [10, -96], head: [7, -116], hB: [-4, -54] });
  const CHEER = P({ hF: [14, -132], hB: [-10, -130], head: [3, -118] });

  // ------------------------------------------------------------------ 1. PWD: browser minta halaman ke server
  {
    const B = { x: -152, y: -118, w: 122, h: 92 };
    const URL_TXT = 'kampus.id/profil.html';
    const CAB = { x: 100, y: -122, w: 58, h: 122 };
    const DR = (i) => ({ x: CAB.x + 5, y: CAB.y + 16 + i * 34, w: CAB.w - 10, h: 30 });
    const FILES = ['index.html', 'profil.html', 'style.css'];
    const USER = -180, SRV = 182;
    const RAIL_REQ = -104, RAIL_RES = -72;

    function browser(g, typedK, renderK, fade) {
      stand(g, B.x + 26, B.x + B.w - 26, B.y + B.h);
      rr(g, B.x, B.y, B.w, B.h, 5);
      inkFill(g, C.paper, 1.7);
      ln(g, B.x, B.y + 19, B.x + B.w, B.y + 19, 1.3);
      rr(g, B.x + 5, B.y + 4, B.w - 10, 12, 6);
      inkFill(g, '#f3f2ec', 1);
      const s = typed(URL_TXT, typedK);
      g.save();
      g.globalAlpha *= fade;
      mono(g, s, B.x + 11, B.y + 13, 7.2, INK);
      g.restore();
      if (typedK > 0 && typedK < 1) {
        const cx = B.x + 11 + monoW(g, s, 7.2) + 1;
        ln(g, cx, B.y + 6.5, cx, B.y + 13.5, 1, INK);
      }
      // isi halaman
      const px = B.x + 10, py = B.y + 28;
      if (renderK <= 0) {
        text(g, 'halaman kosong', B.x + B.w / 2, B.y + 60, 8, '#a8aeb5');
        return;
      }
      g.save();
      g.globalAlpha *= fade;
      const k1 = seg(renderK, 0, 0.35), k2 = seg(renderK, 0.25, 0.75), k3 = seg(renderK, 0.55, 1);
      stabilo(g, px - 2, py, 70, 11, E.out3(k1));
      if (k1 > 0.3) text(g, 'Profil Kampus', px + 1, py + 8.5, 8.5, INK, 'left');
      for (let i = 0; i < 3; i++) {
        const kk = seg(k2, i * 0.25, i * 0.25 + 0.5);
        if (kk > 0) words(g, px, py + 22 + i * 10, (B.w - 62) * kk, 3 + i * 4, '#c7ccd1', 2);
      }
      if (k3 > 0) {
        const z = E.back(k3);
        g.save();
        g.translate(B.x + B.w - 30, py + 34);
        g.scale(z, z);
        rr(g, -18, -15, 36, 30, 3);
        inkFill(g, '#eaf3f0', 1.2, GREEN);
        R.poly(g, [[-13, 10], [-4, -1], [3, 6], [8, 1], [14, 10]], false);
        g.strokeStyle = GREEN;
        g.lineWidth = 1.3;
        g.stroke();
        circle(g, 7, -7, 3);
        g.fillStyle = HL;
        g.fill();
        g.restore();
      }
      g.restore();
    }
    function stand(g, x0, x1, yb) {
      R.stand(g, x0, x1, yb);
    }
    function cabinet(g, openK, pickK) {
      text(g, 'server', CAB.x + CAB.w / 2, CAB.y - 6, 9, GREEN);
      rr(g, CAB.x, CAB.y, CAB.w, CAB.h, 4);
      inkFill(g, '#f3f2ec', 1.7);
      for (let i = 0; i < 3; i++) {
        const d = DR(i);
        const dx = i === 1 ? openK * 16 : 0;
        rr(g, d.x + dx, d.y, d.w, d.h, 3);
        inkFill(g, C.paper, 1.4);
        if (i === 1) stabilo(g, d.x + dx + 3, d.y + 4, d.w - 6, 10, pickK);
        mono(g, FILES[i], d.x + dx + d.w / 2, d.y + 12, 6.4, i === 1 && pickK > 0.5 ? INK : MUTED, 'center');
        ln(g, d.x + dx + d.w / 2 - 7, d.y + 21, d.x + dx + d.w / 2 + 7, d.y + 21, 2.2, INK);
      }
    }
    function rails(g) {
      const x0 = B.x + B.w + 6, x1 = CAB.x - 6;
      g.save();
      g.setLineDash([3, 4]);
      ln(g, x0, RAIL_REQ, x1, RAIL_REQ, 1.2, '#b9bec4');
      ln(g, x0, RAIL_RES, x1, RAIL_RES, 1.2, '#b9bec4');
      g.restore();
      R.arrowHead(g, [x1, RAIL_REQ], 0, 6, 1.3, '#9aa1a8');
      R.arrowHead(g, [x0, RAIL_RES], Math.PI, 6, 1.3, '#9aa1a8');
      text(g, 'request', (x0 + x1) / 2, RAIL_REQ - 13, 8, MUTED);
      text(g, 'response', (x0 + x1) / 2, RAIL_RES + 19, 8, MUTED);
    }
    function token(g, label, cx, cy, fill, ink, k) {
      if (k <= 0) return;
      g.save();
      g.globalAlpha *= k;
      const w = monoW(g, label, 7.4) + 12, h = 15;
      rr(g, cx - w / 2, cy - h / 2, w, h, 4);
      inkFill(g, fill, 1.3, ink);
      mono(g, label, cx, cy + 2.6, 7.4, ink, 'center');
      g.restore();
    }

    SC['pwd-request'] = {
      dur: 8,
      width: 420,
      label: 'Seseorang mengetik alamat halaman di browser. Browser mengirim request GET ke server, server mengambil file profil.html, lalu mengirim response 200 OK berisi HTML, dan browser menampilkan halamannya.',
      draw(g, S) {
        let T = S.on ? S.u * this.dur : -1;
        // Setelah diputar (dan saat gerak dikurangi) adegan diam di keadaan akhir, tidak kembali ke awal.
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pose = breathe(REST(), t);
        let sp = breathe(REST(), t + 2);
        let sx = SRV, sg = { ph: 0, amp: 0 };
        let typedK = 0, renderK = 0, openK = 0, pickK = 0, reqK = -1, resK = -1, fade = 1, st = '';
        if (T < 0) {
          pose = mix(pose, CHIN, pulse(t, 6, 2, 2.2));
        }
        sp = mix(sp, P({ hF: [10, -62], hB: [-4, -52], head: [9, -114] }), pulse(t, 7, 4, 1.6) * (T < 0 ? 1 : 1 - E.soft(seg(T, 0, 0.35))));
        if (T >= 0) {
          fade = 1;
          const urlPt = lp([B.x + 8, B.y + 14], USER, 0, 1);
          const bob = Math.sin(T * 26) * 1.6 * seg(T, 0.45, 0.55) * (1 - seg(T, 1.35, 1.45));
          const reach = E.soft(seg(T, 0.05, 0.45)) * (1 - E.soft(seg(T, 1.75, 2.1)));
          pose = mix(pose, P({ hF: [urlPt[0] + bob, urlPt[1] - bob], hB: [-4, -54], head: [9, -114], chest: [3, -90] }), reach);
          const tap = E.soft(seg(T, 1.45, 1.55)) * (1 - E.soft(seg(T, 1.6, 1.75)));
          pose = mix(pose, P({ hF: [urlPt[0] + 4, urlPt[1] + 3], hB: [-4, -54], head: [10, -113], chest: [4, -89] }), tap * reach);
          const wait = E.soft(seg(T, 2.1, 2.4)) * (1 - E.soft(seg(T, 4.9, 5.2)));
          pose = mix(pose, CHIN, wait);
          const cheer = E.back(seg(T, 5.9, 6.3)) * (1 - E.soft(seg(T, 6.9, 7.3)));
          pose = mix(pose, CHEER, cheer);
          typedK = seg(T, 0.45, 1.4);
          if (fade < 1) typedK = 1;
          // server mengambil file
          const drawer = DR(1);
          const sReach = E.soft(seg(T, 2.55, 2.85)) * (1 - E.soft(seg(T, 3.75, 4.05)));
          openK = E.soft(seg(T, 2.85, 3.2)) * (1 - E.soft(seg(T, 3.55, 3.85)));
          const ws = T < 3.4 ? walkSeg(T, 2.3, 2.75, SRV, SRV - 12) : walkSeg(T, 4.0, 4.5, SRV - 12, SRV);
          sx = ws.x;
          sg = ws.dir * -1 < 0 ? { ph: -ws.ph, amp: ws.amp, stride: ws.stride } : ws;
          const hpt = lp([drawer.x + drawer.w / 2 + openK * 16 + 2, drawer.y + 21], sx, 0, -1);
          sp = mix(sp, P({ hF: hpt, hB: [-4, -54], head: [9, -112], chest: [4, -89] }), sReach);
          pickK = seg(T, 3.1, 3.4) * (1 - seg(T, 4.3, 4.6));
          const sNod = E.soft(seg(T, 4.0, 4.25)) * (1 - E.soft(seg(T, 4.6, 4.9)));
          sp = mix(sp, P({ hF: [40, -100], hB: [-4, -54], head: [10, -116] }), sNod);
          reqK = seg(T, 1.6, 2.6);
          resK = seg(T, 3.9, 5.0);
          renderK = seg(T, 5.0, 6.0) * fade;
          if (T < 1.6) st = '1';
          else if (T < 2.6) st = '2';
          else if (T < 3.9) st = '3';
          else if (T < 5.0) st = '4';
          else if (fade > 0.6) st = '5';
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });
        sp = legs(sp, sg.ph, sg.amp, { arms: false, stride: sg.stride });

        rails(g);
        browser(g, typedK, renderK, fade);
        cabinet(g, openK, pickK);
        const x0 = B.x + B.w + 40, x1 = CAB.x - 42;
        if (reqK >= 0 && reqK < 1) {
          const k = E.soft(reqK);
          token(g, 'GET /profil.html', lerp(x0 - 6, x1 - 6, k), RAIL_REQ, C.paper, INK, Math.min(seg(reqK, 0, 0.12), 1 - seg(reqK, 0.88, 1)));
        }
        if (resK >= 0 && resK < 1) {
          const k = E.soft(resK);
          token(g, '200 OK + HTML', lerp(x1 + 4, x0 + 4, k), RAIL_RES, '#eaf3f0', GREEN, Math.min(seg(resK, 0, 0.12), 1 - seg(resK, 0.88, 1)));
        }
        fig(g, sp, sx, 0, { sx: -1, ink: GREEN, far: GREEN_FAR });
        fig(g, pose, USER, 0, { wave: S.wave, wt: S.wt });
        sparks(g, B.x + B.w - 30, B.y + 40, seg(T, 5.8, 6.4), 18, 6, GREEN);
      },
    };
  }

  // ------------------------------------------------------------------ 2. Basis Data: INNER JOIN dua tabel
  {
    const ROW = 14, TOP = 15, HEAD = 12;
    const A = { x: -206, y: -152, w: 84, title: 'mahasiswa', cols: ['nama', 'prodi'], rows: [['Ani', 'TI'], ['Budi', 'SI'], ['Dodi', 'MI']] };
    const Bt = { x: -88, y: -152, w: 86, title: 'prodi', cols: ['kode', 'nama'], rows: [['SI', 'Sistem Inf.'], ['TE', 'Elektro'], ['TI', 'Informatika']] };
    const H_TAB = TOP + HEAD + ROW * 3 + 3;
    const RES = { x: 22, y: -132, w: 120, title: 'hasil JOIN', cols: ['nama', 'nama prodi'], rows: [['Ani', 'Informatika'], ['Budi', 'Sistem Inf.']] };
    const H_RES = TOP + HEAD + ROW * 2 + 3;
    const ry = (tb, i) => tb.y + TOP + HEAD + i * ROW;
    const PIV = [159, -40], ARM_L = 34;
    const OP = 186;
    const LINKS = [[0, 2], [1, 0]]; // baris A -> baris B

    function table(g, tb, h, o) {
      R.stand(g, tb.x + 18, tb.x + tb.w - 18, tb.y + h);
      rr(g, tb.x, tb.y, tb.w, h, 4);
      inkFill(g, C.paper, 1.6);
      text(g, tb.title, tb.x + 6, tb.y + 11, 8.5, INK, 'left');
      ln(g, tb.x, tb.y + TOP, tb.x + tb.w, tb.y + TOP, 1.2);
      text(g, tb.cols[0], tb.x + 6, tb.y + TOP + 9, 7, MUTED, 'left');
      text(g, tb.cols[1], tb.x + tb.w - 6, tb.y + TOP + 9, 7, MUTED, 'right');
      ln(g, tb.x + 4, tb.y + TOP + HEAD, tb.x + tb.w - 4, tb.y + TOP + HEAD, 0.8, LINE);
      tb.rows.forEach((r, i) => {
        const y = ry(tb, i);
        const dim = (o.dim && o.dim[i]) || 0;
        const keyHl = (o.key && o.key[i]) || 0;
        const rowHl = (o.row && o.row[i]) || 0;
        stabilo(g, tb.x + 3, y + 1.5, tb.w - 6, ROW - 3, rowHl, HL_SOFT);
        const keyCol = o.keySide === 'right' ? 1 : 0;
        const kw = 22;
        const kx = keyCol === 1 ? tb.x + tb.w - 4 - kw : tb.x + 3;
        stabilo(g, kx, y + 1.5, kw, ROW - 3, keyHl);
        g.save();
        g.globalAlpha *= 1 - dim * 0.6;
        text(g, r[0], tb.x + 6, y + 10, 8.5, INK, 'left');
        text(g, r[1], tb.x + tb.w - 6, y + 10, 8.5, INK, 'right');
        g.restore();
        if (dim > 0) {
          g.save();
          g.globalAlpha *= dim;
          ln(g, tb.x + 5, y + 7, lerp(tb.x + 5, tb.x + tb.w - 5, dim), y + 7, 1.3, RED);
          g.restore();
        }
      });
    }
    function lever(g, a) {
      rr(g, PIV[0] - 11, PIV[1], 22, -PIV[1], 3);
      inkFill(g, '#f3f2ec', 1.5);
      text(g, 'JOIN', PIV[0], PIV[1] + 22, 7.5, INK);
      const kn = [PIV[0] + Math.sin(a) * ARM_L, PIV[1] - Math.cos(a) * ARM_L];
      ln(g, PIV[0], PIV[1], kn[0], kn[1], 3.4, INK);
      circle(g, kn[0], kn[1], 4.6);
      inkFill(g, HL, 1.4);
      circle(g, PIV[0], PIV[1], 2.4);
      inkFill(g, C.paper, 1.2);
      return kn;
    }
    const knobAt = (a) => [PIV[0] + Math.sin(a) * ARM_L, PIV[1] - Math.cos(a) * ARM_L];

    SC['bd-join'] = {
      dur: 7.6,
      width: 420,
      label: 'Tuas JOIN ditarik. Kolom prodi di tabel mahasiswa dicocokkan dengan kolom kode di tabel prodi. Ani dan Budi punya pasangan, Dodi (MI) dan prodi TE tidak. Hasil INNER JOIN hanya berisi dua baris yang cocok.',
      draw(g, S) {
        let T = S.on ? S.u * this.dur : -1;
        // Setelah diputar (dan saat gerak dikurangi) adegan diam di keadaan akhir, tidak kembali ke awal.
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pose = breathe(REST(), t + 1);
        let a = -0.42, fade = 1, st = '';
        const aKey = [0, 0, 0], bKey = [0, 0, 0], aDim = [0, 0, 0], bDim = [0, 0, 0], link = [0, 0], probe = { k: 0 };
        let riseK = 0, rowK = [0, 0];
        if (T < 0) {
          pose = mix(pose, CHIN, pulse(t, 6.5, 2.5, 2.2));
        } else {
          fade = 1;
          const pull = E.soft(seg(T, 0.45, 0.9)) * (1 - E.soft(seg(T, 1.35, 1.8)));
          a = lerp(-0.42, 0.45, pull);
          const reach = E.soft(seg(T, 0.05, 0.45)) * (1 - E.soft(seg(T, 1.35, 1.7)));
          pose = mix(pose, P({ hF: lp(knobAt(a), OP, 0, -1), hB: [-4, -54], head: [9, -113], chest: [4, -89] }), reach);
          const look = E.soft(seg(T, 1.7, 2.0)) * (1 - E.soft(seg(T, 3.8, 4.1)));
          pose = mix(pose, P({ hF: [12, -60], hB: [-4, -52], head: [9, -117] }), look);
          const cheer = E.back(seg(T, 4.6, 5.0)) * (1 - E.soft(seg(T, 5.6, 6.0)));
          pose = mix(pose, CHEER, cheer);
          // pencocokan
          link[0] = seg(T, 1.1, 1.6) * fade;
          link[1] = seg(T, 1.7, 2.2) * fade;
          aKey[0] = bKey[2] = seg(T, 1.45, 1.6) * fade;
          aKey[1] = bKey[0] = seg(T, 2.05, 2.2) * fade;
          probe.k = seg(T, 2.3, 2.9);
          aDim[2] = E.out3(seg(T, 2.8, 3.2)) * fade;
          bDim[1] = E.out3(seg(T, 3.0, 3.4)) * fade;
          riseK = E.out3(seg(T, 3.4, 4.0)) * fade;
          rowK = [seg(T, 3.9, 4.25) * fade, seg(T, 4.15, 4.5) * fade];
          if (T < 1.0) st = '1';
          else if (T < 2.3) st = '2';
          else if (T < 3.4) st = '3';
          else if (fade > 0.6) st = '4';
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });

        table(g, A, H_TAB, { key: aKey, dim: aDim, keySide: 'right' });
        table(g, Bt, H_TAB, { key: bKey, dim: bDim, keySide: 'left' });
        // garis pasangan
        LINKS.forEach(([ia, ib], n) => {
          const k = link[n];
          if (k <= 0) return;
          const p0 = [A.x + A.w, ry(A, ia) + ROW / 2], p1 = [Bt.x, ry(Bt, ib) + ROW / 2];
          const pts = [p0, [p0[0] + 10, p0[1]], [p1[0] - 10, p1[1]], p1];
          R.strokePath(g, R.partial(pts, k), 2, GREEN);
          if (k >= 1) {
            circle(g, p0[0], p0[1], 2.2);
            g.fillStyle = GREEN;
            g.fill();
            circle(g, p1[0], p1[1], 2.2);
            g.fill();
          }
        });
        // Dodi (MI) mencari pasangan dan tidak ketemu
        if (probe.k > 0) {
          const p0 = [A.x + A.w, ry(A, 2) + ROW / 2];
          const k = probe.k;
          const fadeP = 1;
          g.save();
          g.globalAlpha *= fadeP;
          g.setLineDash([2, 3]);
          const reachX = p0[0] + 26 * E.soft(seg(k, 0, 0.6));
          ln(g, p0[0], p0[1], reachX, p0[1], 1.6, RED);
          g.setLineDash([]);
          if (k > 0.6) {
            const z = E.back(seg(k, 0.6, 1));
            g.save();
            g.translate(reachX + 4, p0[1]);
            g.scale(z, z);
            ln(g, -3.5, -3.5, 3.5, 3.5, 1.8, RED);
            ln(g, -3.5, 3.5, 3.5, -3.5, 1.8, RED);
            g.restore();
          }
          g.restore();
        }
        // hasil naik dari bawah
        if (riseK > 0) {
          g.save();
          g.beginPath();
          g.rect(RES.x - 20, -200, RES.w + 40, 200);
          g.clip();
          g.translate(0, (1 - riseK) * (H_RES + 70));
          table(g, RES, H_RES, { row: rowK, keySide: 'left' });
          g.restore();
        }
        lever(g, a);
        fig(g, pose, OP, 0, { sx: -1, wave: S.wave, wt: S.wt });
        sparks(g, RES.x + RES.w / 2, RES.y - 6, seg(T, 4.4, 5.0), 16, 6, GREEN);
      },
    };
  }

  // ------------------------------------------------------------------ 3. Algoritma: for loop C++
  {
    const ME = -176;
    const CNT = { x: -160, y: -116, w: 48, h: 58 };
    const SIGN = { x: -88, y: -158, w: 104, h: 44 };
    const TERM = { x: 40, y: -142, w: 150, h: 84 };
    const LAMP = [SIGN.x + SIGN.w - 15, SIGN.y + 22];
    const IT0 = 1.1, IT = 2.1, END = IT0 + IT * 3;

    function counter(g, val, flipK, nextVal, popK) {
      R.stand(g, CNT.x + 12, CNT.x + CNT.w - 12, CNT.y + CNT.h);
      rr(g, CNT.x, CNT.y, CNT.w, CNT.h, 4);
      inkFill(g, C.paper, 1.6);
      mono(g, 'int i', CNT.x + 5, CNT.y + 11, 7, MUTED);
      ln(g, CNT.x, CNT.y + 15, CNT.x + CNT.w, CNT.y + 15, 1.1);
      g.save();
      g.beginPath();
      g.rect(CNT.x + 2, CNT.y + 16, CNT.w - 4, CNT.h - 18);
      g.clip();
      const cx = CNT.x + CNT.w / 2, cy = CNT.y + 47;
      if (val == null) {
        if (popK > 0) {
          const z = E.back(popK);
          g.save();
          g.translate(cx, cy - 9);
          g.scale(z, z);
          mono(g, String(nextVal), 0, 9, 26, INK, 'center');
          g.restore();
        } else {
          mono(g, '?', cx, cy, 22, '#c3c8cd', 'center');
        }
      } else if (flipK > 0) {
        const k = E.soft(flipK);
        g.save();
        g.globalAlpha *= 1 - k;
        mono(g, String(val), cx, cy - k * 30, 26, INK, 'center');
        g.restore();
        mono(g, String(nextVal), cx, cy + (1 - k) * 30, 26, INK, 'center');
      } else {
        mono(g, String(val), cx, cy, 26, INK, 'center');
      }
      g.restore();
    }
    function sign(g, val, lampK, ok) {
      R.stand(g, SIGN.x + 20, SIGN.x + SIGN.w - 20, SIGN.y + SIGN.h);
      rr(g, SIGN.x, SIGN.y, SIGN.w, SIGN.h, 4);
      inkFill(g, C.paper, 1.6);
      mono(g, 'i <= 3 ?', SIGN.x + 8, SIGN.y + 17, 10, INK);
      if (val != null && lampK > 0) {
        g.save();
        g.globalAlpha *= lampK;
        mono(g, `${val} <= 3`, SIGN.x + 8, SIGN.y + 34, 8.5, MUTED);
        mono(g, ok ? 'true' : 'false', SIGN.x + 52, SIGN.y + 34, 8.5, ok ? GREEN : RED);
        g.restore();
      }
      circle(g, LAMP[0], LAMP[1] - 6, 7);
      inkFill(g, '#f1f1ed', 1.4);
      if (lampK > 0) {
        g.save();
        g.globalAlpha *= lampK;
        circle(g, LAMP[0], LAMP[1] - 6, 7);
        inkFill(g, ok ? '#cfe6de' : RED_SOFT, 1.4, ok ? GREEN : RED);
        if (ok) R.tick(g, LAMP[0], LAMP[1] - 6, lampK, 0.75, GREEN);
        else {
          ln(g, LAMP[0] - 3, LAMP[1] - 9, LAMP[0] + 3, LAMP[1] - 3, 1.6, RED);
          ln(g, LAMP[0] - 3, LAMP[1] - 3, LAMP[0] + 3, LAMP[1] - 9, 1.6, RED);
        }
        g.restore();
      }
    }
    function terminal(g, out, newK, fade) {
      R.stand(g, TERM.x + 26, TERM.x + TERM.w - 26, TERM.y + TERM.h);
      R.term(g, TERM.x, TERM.y, TERM.w, TERM.h, 'output');
      mono(g, '$ ./loop', TERM.x + 9, TERM.y + 30, 7.5, '#9aa3ad');
      g.save();
      g.globalAlpha *= fade;
      for (let i = 0; i < out; i++) {
        const k = i === out - 1 ? newK : 1;
        g.save();
        g.globalAlpha *= seg(k, 0, 0.4);
        mono(g, String(i + 1), TERM.x + 14 + i * 22, TERM.y + 60, 17, HL);
        g.restore();
      }
      g.restore();
      const cx = TERM.x + 14 + out * 22;
      if (pulse(fade < 1 ? 0 : (out ? 0.3 : 0.3) + (Date.now() % 1000) / 1000, 1, 0, 0.5) > 0.5 || out === 0) {
        rr(g, cx, TERM.y + 48, 8, 14, 1);
        g.fillStyle = 'rgba(255,225,77,0.55)';
        g.fill();
      }
    }

    SC['alp-loop'] = {
      dur: 9.8,
      width: 420,
      label: 'Perulangan for (int i = 1; i <= 3; i++): papan i mulai dari 1, lampu memeriksa i <= 3, angka i dicetak ke layar, lalu i ditambah satu. Saat i bernilai 4 lampu merah dan perulangan berhenti. Layar berisi 1 2 3.',
      draw(g, S) {
        let T = S.on ? S.u * this.dur : -1;
        // Setelah diputar (dan saat gerak dikurangi) adegan diam di keadaan akhir, tidak kembali ke awal.
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pose = breathe(REST(), t);
        let val = null, flipK = 0, nextVal = 1, popK = 0, lampK = 0, ok = true, out = 0, newK = 1, tokK = -1, fade = 1, st = '';
        if (T < 0) {
          pose = mix(pose, CHIN, pulse(t, 6, 2.2, 2.2));
        } else {
          fade = 1;
          const tapPt = lp([CNT.x + 12, CNT.y + 34], ME, 0, 1);
          const TAP = P({ hF: tapPt, hB: [-4, -54], head: [9, -113], chest: [4, -89] });
          const LOOKUP = P({ hF: [12, -60], hB: [-4, -52], head: [10, -118] });
          // inisialisasi
          let tap = E.soft(seg(T, 0.2, 0.5)) * (1 - E.soft(seg(T, 0.8, 1.05)));
          popK = seg(T, 0.45, 0.8);
          if (T < IT0) st = 'init';
          let look = 0;
          for (let k = 0; k < 3; k++) {
            const s0 = IT0 + k * IT;
            tap = Math.max(tap, E.soft(seg(T, s0 + 1.3, 1.55 + s0)) * (1 - E.soft(seg(T, s0 + 1.75, s0 + 2.0))));
            look = Math.max(look, E.soft(seg(T, s0, s0 + 0.25)) * (1 - E.soft(seg(T, s0 + 1.0, s0 + 1.25))));
          }
          look = Math.max(look, E.soft(seg(T, END, END + 0.25)) * (1 - E.soft(seg(T, END + 0.7, END + 0.9))));
          pose = mix(pose, LOOKUP, look);
          pose = mix(pose, TAP, tap);
          const cheer = E.back(seg(T, END + 0.9, END + 1.3)) * (1 - E.soft(seg(T, END + 1.9, END + 2.3)));
          pose = mix(pose, CHEER, cheer);
          if (T >= 0.45) val = 1;
          if (T >= 0.45 && T < 0.8) val = null;
          for (let k = 0; k < 3; k++) {
            const s0 = IT0 + k * IT;
            if (T >= s0) {
              lampK = E.out3(seg(T, s0 + 0.1, s0 + 0.35)) * (1 - seg(T, s0 + 1.1, s0 + 1.3));
              ok = true;
              if (T < s0 + 0.6) st = 'cek';
              else if (T < s0 + 1.3) st = 'badan';
              else st = 'tambah';
              if (T >= s0 + 0.6) tokK = seg(T, s0 + 0.6, s0 + 1.2);
              out = k + (T >= s0 + 1.2 ? 1 : 0);
              // Hanya angka yang baru dicetak di putaran ini yang memudar masuk; angka putaran sebelumnya tetap tampil.
              newK = T >= s0 + 1.2 ? seg(T, s0 + 1.2, s0 + 1.4) : 1;
              if (T >= s0 + 1.45) {
                flipK = seg(T, s0 + 1.45, s0 + 1.75);
                val = k + 1;
                nextVal = k + 2;
                if (flipK >= 1) {
                  val = k + 2;
                  flipK = 0;
                }
              } else {
                val = k + 1;
              }
            }
          }
          if (T >= END) {
            lampK = E.out3(seg(T, END + 0.1, END + 0.35)) * fade;
            ok = false;
            out = 3;
            newK = 1;
            tokK = -1;
            st = T < END + 0.7 ? 'cek' : fade > 0.6 ? 'selesai' : '';
            val = 4;
            flipK = 0;
          }
          if (fade < 1) {
            val = 4;
          }
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });

        counter(g, val, flipK, nextVal, popK);
        sign(g, val, lampK, ok);
        terminal(g, out, newK, fade);
        if (fade < 1) {
          g.save();
          g.globalAlpha *= 1 - fade;
          g.restore();
        }
        fig(g, pose, ME, 0, { wave: S.wave, wt: S.wt });
        if (tokK > 0 && tokK < 1) {
          const p = arcPt([CNT.x + CNT.w / 2, CNT.y + 30], [TERM.x + 14 + out * 22 + 5, TERM.y + 54], 62, E.soft(tokK));
          rr(g, p[0] - 8, p[1] - 9, 16, 18, 3);
          inkFill(g, HL, 1.3);
          mono(g, String(val), p[0], p[1] + 5, 12, INK, 'center');
        }
        sparks(g, TERM.x + TERM.w / 2, TERM.y - 6, seg(T, END + 0.8, END + 1.4), 16, 6, GREEN);
      },
    };
  }

  // Langkah kaki sesuai arah hadap: maju bila searah, mundur bila berlawanan.
  const gaitOf = (ws, sx) => (ws.dir * sx < 0 ? { ph: -ws.ph, amp: ws.amp, stride: ws.stride } : ws);
  const STILL = { ph: 0, amp: 0 };

  // ------------------------------------------------------------------ 4. Algoritma P7: while vs do-while dengan n = 0
  {
    const W = { home: -186, stop: -168, gate: -128, body: -58 };
    const D = { home: 22, at: 30, stop: 120, gate: 160, body: 76 };
    function gate(g, cx, lampK, label, ev) {
      const sx0 = cx - 30, sy = -150;
      ln(g, cx + 22, sy + 30, cx + 22, 0, 2.4, INK);
      rr(g, sx0, sy, 60, 30, 4);
      inkFill(g, C.paper, 1.5);
      mono(g, 'n > 0 ?', sx0 + 6, sy + 12, 8, INK);
      if (lampK > 0) {
        g.save();
        g.globalAlpha *= lampK;
        mono(g, ev, sx0 + 4, sy + 25, 7, MUTED);
        mono(g, 'false', sx0 + 33, sy + 25, 7, RED);
        g.restore();
      }
      circle(g, sx0 + 51, sy + 9, 4.5);
      inkFill(g, lampK > 0.5 ? RED_SOFT : '#f1f1ed', 1.2, lampK > 0.5 ? RED : INK);
      // palang tertutup
      rr(g, cx - 26, -56, 50, 6, 3);
      inkFill(g, '#fff', 1.4);
      for (let i = 0; i < 3; i++) {
        rr(g, cx - 22 + i * 16, -56, 8, 6, 1);
        g.fillStyle = RED;
        g.fill();
      }
      circle(g, cx + 22, -53, 3.2);
      inkFill(g, C.paper, 1.3);
      if (label) text(g, label, cx - 8, -64, 7, MUTED);
    }
    function body(g, cx, out, k, dim) {
      g.save();
      if (dim) g.globalAlpha *= 0.45;
      R.stand(g, cx - 16, cx + 16, -70);
      R.term(g, cx - 28, -116, 56, 46, '');
      mono(g, 'cout<<n', cx - 23, -97, 6.6, '#9aa3ad');
      if (out && k > 0) {
        g.save();
        g.globalAlpha *= k;
        mono(g, out, cx - 22, -78, 13, HL);
        g.restore();
      }
      g.restore();
      if (dim) text(g, 'dilewati', cx, -124, 7.5, MUTED);
    }

    SC['alp-dowhile'] = {
      dur: 7.6,
      width: 420,
      label: 'Dua jalur dengan n = 0. Di jalur while kondisi dicek dulu, hasilnya false, jadi badan loop tidak pernah dijalankan. Di jalur do-while badan dijalankan dulu, mencetak 0 lalu n menjadi -1, baru kemudian kondisi dicek dan hasilnya false. Badan while dijalankan 0 kali, badan do-while 1 kali.',
      draw(g, S) {
        let T = S.on ? S.u * this.dur : -1;
        // Setelah diputar (dan saat gerak dikurangi) adegan diam di keadaan akhir, tidak kembali ke awal.
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pw = breathe(REST(), t), pd = breathe(REST(), t + 1.7);
        let xw = W.home, xd = D.home, gw = STILL, gd = STILL, sw = 1, sd = 1;
        let lampW = 0, lampD = 0, outK = 0, resK = 0, st = '';
        const idleK = T < 0 ? 1 : 1 - E.soft(seg(T, 0, 0.35));
        pw = mix(pw, CHIN, pulse(t, 6.2, 2, 2.2) * idleK);
        pd = mix(pd, CHIN, pulse(t, 7.1, 4.5, 2.2) * idleK);
        if (T >= 0) {
          const fade = 1;
          // jalur while
          let ws = T < 4 ? walkSeg(T, 0.8, 1.4, W.home, W.stop) : walkSeg(T, 6.0, 6.6, W.stop, W.home);
          xw = ws.x; gw = gaitOf(ws, sw);
          lampW = E.out3(seg(T, 1.5, 1.8)) * fade;
          const shrug = E.soft(seg(T, 1.9, 2.2)) * (1 - E.soft(seg(T, 2.8, 3.1)));
          const SHRUG = P({ hF: [24, -80], hB: [12, -82], head: [4, -116], hang: 0 });
          pw = mix(pw, SHRUG, shrug);
          // jalur do-while
          const back = T >= 5.6;
          ws = T < 3.5 ? walkSeg(T, 2.6, 2.9, D.home, D.at) : !back ? walkSeg(T, 3.7, 4.5, D.at, D.stop) : walkSeg(T, 5.7, 6.9, D.stop, D.home);
          xd = ws.x;
          sd = back && T < 6.9 ? -1 : 1;
          gd = gaitOf(ws, sd);
          const tap = E.soft(seg(T, 2.9, 3.2)) * (1 - E.soft(seg(T, 3.45, 3.7)));
          pd = mix(pd, P({ hF: lp([D.body - 20, -90], xd, 0, 1), hB: [-4, -54], head: [9, -113], chest: [4, -89] }), tap);
          const look = E.soft(seg(T, 4.6, 4.9)) * (1 - E.soft(seg(T, 5.4, 5.7)));
          pd = mix(pd, P({ hF: [12, -60], hB: [-4, -52], head: [9, -118] }), look);
          outK = seg(T, 3.2, 3.4) * fade;
          lampD = E.out3(seg(T, 4.6, 4.9)) * fade;
          resK = seg(T, 5.0, 5.3) * fade;
          if (T < 0.8) st = '1';
          else if (T < 2.6) st = '2';
          else if (T < 3.7) st = '3';
          else if (T < 5.0) st = '4';
          else if (fade > 0.6) st = '5';
        }
        step(g, st);
        pw = legs(pw, gw.ph, gw.amp, { arms: false, stride: gw.stride });
        pd = legs(pd, gd.ph, gd.amp, { arms: false, stride: gd.stride });

        g.save();
        g.setLineDash([3, 5]);
        ln(g, 0, -176, 0, -4, 1.2, '#c9cdd2');
        g.restore();
        mono(g, 'while', -105, -170, 10, INK, 'center');
        mono(g, 'do-while', 105, -170, 10, INK, 'center');
        gate(g, W.gate, lampW, 'cek dulu', '0 > 0');
        body(g, W.body, '', 0, true);
        body(g, D.body, '0', outK, false);
        gate(g, D.gate, lampD, 'cek belakangan', '-1>0');
        fig(g, pw, xw, 0, { sx: sw });
        fig(g, pd, xd, 0, { sx: sd, ink: GREEN, far: GREEN_FAR });
        if (resK > 0) {
          g.save();
          g.globalAlpha *= resK;
          text(g, 'badan dijalankan 0 kali', -105, 20, 8.5, RED);
          text(g, 'badan dijalankan 1 kali', 105, 20, 8.5, GREEN);
          g.restore();
        }
      },
    };
  }

  // ------------------------------------------------------------------ 5. Basis Data P5: normalisasi memindah keterangan buku ke tabelnya sendiri
  {
    const ROW = 14, TOP = 15, HEAD = 12;
    const A = { x: -206, y: -150 };
    const CW = [38, 34, 62]; // id_pinjam, id_buku, judul
    const ROWS = [['PJ1', 'BK2', 'Basis Data'], ['PJ2', 'BK1', 'Jaringan'], ['PJ3', 'BK2', 'Basis Data']];
    const B = { x: 34, y: -150, w1: 40, w2: 62 }; // tabel buku: id_buku + judul
    const FIG = 182;
    const JX = A.x + CW[0] + CW[1]; // tepi kiri kolom judul
    const rowY = (y, i) => y + TOP + HEAD + i * ROW;

    function frameA(g, w, fkK) {
      const h = TOP + HEAD + ROW * 3 + 3;
      R.stand(g, A.x + 18, A.x + w - 18, A.y + h);
      rr(g, A.x, A.y, w, h, 4);
      inkFill(g, C.paper, 1.6);
      text(g, 'peminjaman', A.x + 6, A.y + 11, 8.5, INK, 'left');
      ln(g, A.x, A.y + TOP, A.x + w, A.y + TOP, 1.2);
      text(g, 'id_pinjam', A.x + 5, A.y + TOP + 9, 6.6, MUTED, 'left');
      text(g, 'id_buku' + (fkK > 0.5 ? '*' : ''), A.x + CW[0] + 4, A.y + TOP + 9, 6.6, fkK > 0.5 ? GREEN : MUTED, 'left');
      ROWS.forEach((r, i) => {
        const y = rowY(A.y, i);
        text(g, r[0], A.x + 5, y + 10, 8.5, INK, 'left');
        text(g, r[1], A.x + CW[0] + 4, y + 10, 8.5, INK, 'left');
      });
    }
    // Kolom judul (kepala + 3 baris) di posisi (x, y). dup = sorot salinan ganda, merge = baris ke-3 menyatu ke baris 1.
    function judulCol(g, x, y, dup, merge, boxed) {
      if (boxed) {
        rr(g, x, y + TOP, CW[2], HEAD + ROW * 3 + 3, 3);
        inkFill(g, C.paper, 1.4);
      }
      text(g, 'judul', x + 4, y + TOP + 9, 6.6, MUTED, 'left');
      ROWS.forEach((r, i) => {
        let yy = rowY(y, i);
        let a = 1;
        if (i === 2) a = 1 - seg(merge, 0.45, 0.75);
        if (a <= 0) return;
        g.save();
        g.globalAlpha *= a;
        if (r[2] === 'Basis Data') stabilo(g, x + 2, yy + 2, CW[2] - 4, ROW - 4, dup);
        text(g, r[2], x + 4, yy + 10, 8.5, INK, 'left');
        if (i === 2 && merge > 0) ln(g, x + 3, yy + 7, x + 3 + (CW[2] - 6) * seg(merge, 0, 0.4), yy + 7, 1.3, RED);
        g.restore();
      });
    }
    function tableB(g, k, merge, linkK) {
      if (k <= 0) return;
      const rows = 3 - E.soft(seg(merge, 0.75, 1));
      const h = TOP + HEAD + ROW * rows + 3, w = B.w1 + B.w2;
      g.save();
      g.globalAlpha *= seg(k, 0, 0.3);
      R.stand(g, B.x + 16, B.x + w - 16, B.y + h);
      rr(g, B.x, B.y, w, h, 4);
      inkFill(g, C.paper, 1.6);
      text(g, 'buku', B.x + 6, B.y + 11, 8.5, GREEN, 'left');
      ln(g, B.x, B.y + TOP, B.x + w, B.y + TOP, 1.2);
      text(g, 'id_buku', B.x + 5, B.y + TOP + 9, 6.6, MUTED, 'left');
      ['BK2', 'BK1', 'BK2'].forEach((v, i) => {
        let yy = rowY(B.y, i), a = 1;
        if (i === 2) a = 1 - seg(merge, 0.45, 0.75);
        g.save();
        g.globalAlpha *= a * seg(k, 0.4, 1);
        text(g, v, B.x + 5, yy + 10, 8.5, INK, 'left');
        if (i === 2 && merge > 0) ln(g, B.x + 3, yy + 7, B.x + 3 + (B.w1 - 6) * seg(merge, 0, 0.4), yy + 7, 1.3, RED);
        g.restore();
      });
      g.restore();
      if (linkK > 0) {
        // garis kunci tamu: id_buku di peminjaman -> baris di buku
        [[0, 0], [1, 1], [2, 0]].forEach(([ia, ib], n) => {
          const kk = seg(linkK, n * 0.25, n * 0.25 + 0.5);
          if (kk <= 0) return;
          const p0 = [A.x + CW[0] + CW[1] + 2, rowY(A.y, ia) + ROW / 2], p1 = [B.x - 2, rowY(B.y, ib) + ROW / 2];
          const mid = (p0[0] + p1[0]) / 2;
          R.strokePath(g, R.partial([p0, [mid, p0[1]], [mid, p1[1]], p1], kk), 1.4, GREEN);
        });
      }
    }

    SC['bd-normal'] = {
      dur: 7.4,
      width: 420,
      label: 'Tabel peminjaman menyimpan judul buku berulang: Basis Data ditulis dua kali. Kolom judul dipindah ke tabel buku sendiri, salinan ganda digabung jadi satu baris, dan tabel peminjaman cukup menyimpan id_buku sebagai kunci tamu yang menunjuk ke tabel buku.',
      draw(g, S) {
        let T = S.on ? S.u * this.dur : -1;
        // Setelah diputar (dan saat gerak dikurangi) adegan diam di keadaan akhir, tidak kembali ke awal.
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pose = breathe(REST(), t);
        pose = mix(pose, CHIN, pulse(t, 6.4, 2.4, 2.2) * (T < 0 ? 1 : 1 - E.soft(seg(T, 0, 0.35))));
        let dup = 0, mv = 0, bK = 0, merge = 0, fkK = 0, linkK = 0, st = '', back = 0;
        if (T >= 0) {
          const fade = 1;
          const point = E.soft(seg(T, 0.3, 0.7)) * (1 - E.soft(seg(T, 1.3, 1.6)));
          pose = mix(pose, P({ hF: [40, -100], hB: [-4, -54], head: [10, -116] }), point);
          const pull = E.soft(seg(T, 1.6, 1.9)) * (1 - E.soft(seg(T, 2.7, 3.0)));
          pose = mix(pose, P({ hF: [30, -84], hB: [22, -80], head: [8, -115], chest: [-2, -90], hang: 0 }), pull);
          const cheer = E.back(seg(T, 4.9, 5.3)) * (1 - E.soft(seg(T, 5.9, 6.3)));
          pose = mix(pose, CHEER, cheer);
          dup = seg(T, 0.6, 1.2) * (1 - seg(T, 5.4, 5.9));
          mv = E.soft(seg(T, 1.8, 2.8));
          back = 0;
          bK = seg(T, 2.3, 2.8) * fade;
          merge = seg(T, 3.1, 3.8) * fade;
          fkK = seg(T, 3.8, 4.0) * fade;
          linkK = seg(T, 3.9, 4.7) * fade;
          if (T < 1.6) st = '1';
          else if (T < 3.1) st = '2';
          else if (T < 3.8) st = '3';
          else if (fade > 0.6) st = '4';
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });

        const k = mv * (1 - back);
        const wA = lerp(CW[0] + CW[1] + CW[2], CW[0] + CW[1], E.soft(seg(k, 0, 0.4)));
        frameA(g, wA, fkK);
        tableB(g, bK, merge, linkK);
        const dock = [B.x + B.w1, B.y];
        if (k <= 0) judulCol(g, JX, A.y, dup, 0, false);
        else {
          const p = arcPt([JX, A.y], dock, 26, k);
          judulCol(g, p[0], p[1], dup, merge, true);
        }
        fig(g, pose, FIG, 0, { sx: -1, wave: S.wave, wt: S.wt });
        if (dup > 0.6 && T < 1.8) text(g, 'ditulis 2x', JX + CW[2] / 2, A.y - 6, 8, RED);
        sparks(g, B.x + B.w1 + CW[2] / 2, B.y + TOP + HEAD + 4, seg(T, 3.6, 4.2), 14, 6, GREEN);
      },
    };
  }

  // ------------------------------------------------------------------ 6. PWD P7: klik tombol -> fungsi -> getElementById -> innerText berubah
  {
    const Wn = { x: -152, y: -122, w: 118, h: 90 };
    const H1 = { x: Wn.x + 10, y: Wn.y + 36 };
    const BTN = { x: Wn.x + 8, y: Wn.y + 58, w: 40, h: 17 };
    const CODE = { x: 44, y: -154, w: 162 };
    const LINES = ['btn.addEventListener(', '  "click", () => {', '  const h = document', '    .getElementById("judul");', '  h.innerText =', '    "Selamat datang";', '});'];
    const LH = 12;
    const ME = -174;

    function page(g, changeK, foundK, pressK) {
      R.stand(g, Wn.x + 24, Wn.x + Wn.w - 24, Wn.y + Wn.h);
      R.win(g, Wn.x, Wn.y, Wn.w, Wn.h, 'index.html');
      // h1
      if (foundK > 0) {
        g.save();
        g.globalAlpha *= foundK;
        g.setLineDash([3, 3]);
        rr(g, H1.x - 4, H1.y - 13, 100, 18, 3);
        g.strokeStyle = GREEN;
        g.lineWidth = 1.4;
        g.stroke();
        g.restore();
        mono(g, '#judul', H1.x + 96, H1.y - 16, 6.4, GREEN, 'right');
      }
      if (changeK > 0) stabilo(g, H1.x - 2, H1.y - 10, 88, 13, E.out3(changeK));
      g.save();
      g.globalAlpha *= 1 - seg(changeK, 0, 0.4);
      text(g, 'Halo', H1.x, H1.y, 11, INK, 'left');
      g.restore();
      g.save();
      g.globalAlpha *= seg(changeK, 0.3, 0.7);
      text(g, 'Selamat datang', H1.x, H1.y, 11, INK, 'left');
      g.restore();
      // tombol
      const dy = pressK * 1.5;
      rr(g, BTN.x, BTN.y + dy, BTN.w, BTN.h, 4);
      inkFill(g, pressK > 0.3 ? '#ffd60a' : HL, 1.4);
      text(g, 'Ubah', BTN.x + BTN.w / 2, BTN.y + 12 + dy, 8.5, INK);
    }
    function code(g, hl) {
      const h = 18 + LINES.length * LH + 6;
      R.stand(g, CODE.x + 26, CODE.x + CODE.w - 26, CODE.y + h);
      rr(g, CODE.x, CODE.y, CODE.w, h, 5);
      inkFill(g, '#1d2731', 1.6);
      mono(g, 'script.js', CODE.x + 8, CODE.y + 12, 6.8, '#9aa3ad');
      LINES.forEach((l, i) => {
        const y = CODE.y + 18 + i * LH;
        const k = hl[i] || 0;
        if (k > 0) {
          g.save();
          g.globalAlpha *= k;
          rr(g, CODE.x + 4, y + 1, CODE.w - 8, LH, 2);
          g.fillStyle = 'rgba(255,225,77,0.22)';
          g.fill();
          ln(g, CODE.x + 4, y + 2, CODE.x + 4, y + LH, 2.4, HL);
          g.restore();
        }
        mono(g, l, CODE.x + 8, y + 9.5, 7.6, k > 0.5 ? '#ffffff' : '#c9d1d9');
      });
    }

    SC['pwd-dom'] = {
      dur: 7.4,
      width: 420,
      label: 'Tombol Ubah diklik. Event click menjalankan fungsi di script.js. document.getElementById("judul") menemukan elemen h1 di halaman, lalu innerText-nya diganti sehingga tulisan Halo berubah menjadi Selamat datang tanpa memuat ulang halaman.',
      draw(g, S) {
        let T = S.on ? S.u * this.dur : -1;
        // Setelah diputar (dan saat gerak dikurangi) adegan diam di keadaan akhir, tidak kembali ke awal.
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pose = breathe(REST(), t);
        let pressK = 0, tokK = -1, foundK = 0, changeK = 0, st = '';
        const hl = [];
        if (T < 0) {
          pose = mix(pose, CHIN, pulse(t, 6, 2.2, 2.2));
        } else {
          const fade = 1;
          const btnPt = lp([BTN.x + 8, BTN.y + 8], ME, 0, 1);
          const reach = E.soft(seg(T, 0.2, 0.6)) * (1 - E.soft(seg(T, 1.2, 1.5)));
          pose = mix(pose, P({ hF: btnPt, hB: [-4, -54], head: [9, -113], chest: [4, -89] }), reach);
          pressK = E.soft(seg(T, 0.65, 0.75)) * (1 - E.soft(seg(T, 0.85, 1.0)));
          const look = E.soft(seg(T, 1.5, 1.8)) * (1 - E.soft(seg(T, 4.2, 4.5)));
          pose = mix(pose, P({ hF: [12, -60], hB: [-4, -52], head: [10, -116] }), look);
          const cheer = E.back(seg(T, 4.6, 5.0)) * (1 - E.soft(seg(T, 5.6, 6.0)));
          pose = mix(pose, CHEER, cheer);
          tokK = T >= 0.9 && T < 1.8 ? seg(T, 0.9, 1.7) : -1;
          const band = (a, b) => E.soft(seg(T, a, a + 0.2)) * (1 - E.soft(seg(T, b, b + 0.2)));
          hl[0] = hl[1] = band(1.7, 2.6);
          hl[2] = hl[3] = band(2.6, 3.6);
          hl[4] = hl[5] = band(3.6, 4.6);
          foundK = E.out3(seg(T, 2.9, 3.2)) * (1 - seg(T, 4.6, 5.0));
          changeK = seg(T, 3.9, 4.4) * fade;
          if (T < 1.7) st = '1';
          else if (T < 2.6) st = '2';
          else if (T < 3.6) st = '3';
          else if (fade > 0.6) st = '4';
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });

        page(g, changeK, foundK, pressK);
        code(g, hl);
        if (foundK > 0) {
          // garis dari baris getElementById ke elemen h1 yang ditemukan
          g.save();
          g.globalAlpha *= foundK;
          g.setLineDash([3, 4]);
          const y0 = CODE.y + 18 + 3 * LH + 5;
          ln(g, CODE.x - 4, y0, H1.x + 98, H1.y - 4, 1.4, GREEN);
          g.restore();
        }
        fig(g, pose, ME, 0, { wave: S.wave, wt: S.wt });
        if (tokK > 0 && tokK < 1) {
          const p = arcPt([BTN.x + BTN.w, BTN.y], [CODE.x + 30, CODE.y + 22], 40, E.soft(tokK));
          const w = monoW(g, 'click', 7) + 10;
          rr(g, p[0] - w / 2, p[1] - 7, w, 14, 7);
          inkFill(g, HL, 1.2);
          mono(g, 'click', p[0], p[1] + 2.5, 7, INK, 'center');
        }
        sparks(g, H1.x + 40, H1.y - 16, seg(T, 4.3, 4.9), 14, 6, GREEN);
      },
    };
  }

  // ------------------------------------------------------------------ Varian: tombol "coba nilai lain"
  // Blok adegan dengan "pilih" menaruh nilai pilihan di data-v pada <stick-scene>; adegan membacanya di sini.
  function vOf(g, sc, def, ok) {
    const el = g.canvas && g.canvas.parentElement;
    let v = el && el.dataset ? el.dataset.v : '';
    if (!v || (ok && !(v in ok))) v = def;
    sc._v = v;
    return v;
  }
  // Kartu nilai (kertas kuning) yang dibawa dari satu tempat ke tempat lain.
  function card(g, label, cx, cy, o) {
    o = o || {};
    const size = o.size || 8.5;
    const w = Math.max(o.minW || 0, monoW(g, label, size) + 12), h = o.h || 17;
    g.save();
    if (o.alpha != null) g.globalAlpha *= o.alpha;
    rr(g, cx - w / 2, cy - h / 2, w, h, 4);
    inkFill(g, o.fill || HL, 1.4, o.ink || INK);
    mono(g, label, cx, cy + size * 0.36, size, o.ink || INK, 'center');
    g.restore();
  }
  // Lampu bulat: hijau dengan centang (true) atau merah dengan silang (false).
  function lamp(g, x, y, k, ok, r) {
    r = r || 6.5;
    circle(g, x, y, r);
    inkFill(g, '#f1f1ed', 1.3);
    if (k <= 0) return;
    g.save();
    g.globalAlpha *= clamp(k, 0, 1);
    circle(g, x, y, r);
    inkFill(g, ok ? '#cfe6de' : RED_SOFT, 1.3, ok ? GREEN : RED);
    if (ok) R.tick(g, x, y, k, 0.7, GREEN);
    else {
      ln(g, x - 2.8, y - 2.8, x + 2.8, y + 2.8, 1.5, RED);
      ln(g, x - 2.8, y + 2.8, x + 2.8, y - 2.8, 1.5, RED);
    }
    g.restore();
  }

  // ------------------------------------------------------------------ 7. Algoritma P4: if / else if / else
  {
    const ME = -186;
    const CH = [
      { x: -100, cond: 'g >= 80', lim: 80, out: 'A' },
      { x: 10, cond: 'g >= 60', lim: 60, out: 'B' },
      { x: 120, cond: 'else', lim: -Infinity, out: 'C' },
    ];
    const SW = 94, SY = -176, SH = 40, RAIL = -118;
    const TRAY = { w: 46, h: 36, y: -50 };
    const VALS = { 85: 85, 70: 70, 45: 45 };
    const TR = 0.65, CK = 0.75;
    const HAND = [ME + 24, -74];
    const s0 = (k) => 0.75 + k * (TR + CK);
    const plan = (v) => {
      const val = VALS[v];
      const m = CH.findIndex((c) => val >= c.lim);
      const tM = s0(m) + TR + (m === 2 ? 0.25 : CK);
      return { val, m, tM, end: tM + 2.7 };
    };
    // Papan kondisi di atas, nampan keluaran di bawah, rel kartu di antaranya.
    function board(g, c, i, val, lampK, ok, dim, litK) {
      const x0 = c.x - SW / 2;
      g.save();
      if (dim > 0) g.globalAlpha *= 1 - 0.6 * dim;
      R.stand(g, x0 + 10, x0 + SW - 10, SY + SH);
      rr(g, x0, SY, SW, SH, 4);
      inkFill(g, C.paper, 1.6);
      mono(g, i === 2 ? 'else' : c.cond + ' ?', x0 + 8, SY + 15, 9, INK);
      if (i < 2) {
        lamp(g, x0 + SW - 12, SY + 11, lampK, ok);
        if (lampK > 0) {
          g.save();
          g.globalAlpha *= lampK;
          mono(g, `${val} >= ${c.lim}`, x0 + 8, SY + 31, 7.5, MUTED);
          mono(g, ok ? 'true' : 'false', x0 + 61, SY + 31, 7.5, ok ? GREEN : RED);
          g.restore();
        }
      } else mono(g, 'semua false', x0 + 8, SY + 31, 7.5, lampK > 0 ? GREEN : '#a8aeb5');
      // nampan cout
      const tx = c.x - TRAY.w / 2;
      R.stand(g, tx + 9, tx + TRAY.w - 9, TRAY.y + TRAY.h, 3);
      rr(g, tx, TRAY.y, TRAY.w, TRAY.h, 4);
      inkFill(g, litK > 0 ? HL_SOFT : C.paper, 1.4);
      mono(g, 'cout', c.x, TRAY.y + 10, 6.5, MUTED, 'center');
      if (litK > 0) {
        const z = E.back(clamp(litK, 0, 1));
        g.save();
        g.translate(c.x, TRAY.y + 26);
        g.scale(z, z);
        stabilo(g, -9, -10, 18, 13, 1);
        mono(g, c.out, 0, 2, 15, INK, 'center');
        g.restore();
      } else mono(g, c.out, c.x, TRAY.y + 28, 13, '#c3c8cd', 'center');
      g.restore();
      if (dim > 0) {
        g.save();
        g.globalAlpha *= dim;
        text(g, 'dilewati', c.x, RAIL + 4, 8, MUTED);
        g.restore();
      }
    }

    SC['alp-ifelse'] = {
      _v: '85',
      get dur() {
        return plan(this._v in VALS ? this._v : '85').end;
      },
      width: 420,
      label: 'Percabangan if, else if, else untuk nilai huruf. Kartu nilai g dibawa ke kondisi pertama g >= 80. Kalau false kartu pindah ke kondisi berikutnya, kalau true kartu masuk ke cabang itu dan mencetak hurufnya. Hanya satu cabang yang dijalankan, sisanya dilewati.',
      draw(g, S) {
        const v = vOf(g, this, '85', VALS);
        const p = plan(v);
        let T = S.on ? S.u * this.dur : -1;
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        const HOLD = P({ hF: lp(HAND, ME, 0, 1), hB: [-4, -54], head: [9, -114], chest: [3, -90] });
        // Putar ulang: kartu dan pose memegang kartu muncul pelan, tidak meloncat dari keadaan akhir.
        const inK = T < 0 || !S.n ? 1 : E.soft(seg(T, 0, 0.35));
        let pose = breathe(mix(REST(), HOLD, T < 0 ? 1 : inK * (1 - E.soft(seg(T, 0.55, 0.9)))), t);
        let st = '';
        let cardAt = T >= 0 && T < s0(0) ? HAND : null;
        const lampK = [0, 0, 0], litK = [0, 0, 0], dim = [0, 0, 0];
        if (T < 0) {
          cardAt = HAND;
        } else {
          // kartu berangkat dari tangan ke papan pertama, lalu pindah papan sampai ada yang true
          const look = E.soft(seg(T, 0.8, 1.1)) * (1 - E.soft(seg(T, p.tM + 0.4, p.tM + 0.7)));
          pose = mix(pose, P({ hF: [12, -60], hB: [-4, -52], head: [10, -117] }), look);
          const cheer = E.back(seg(T, p.tM + 0.9, p.tM + 1.3)) * (1 - E.soft(seg(T, p.tM + 1.9, p.tM + 2.3)));
          pose = mix(pose, CHEER, cheer);
          for (let k = 0; k <= p.m; k++) {
            const a = s0(k);
            if (T >= a) {
              const from = k === 0 ? HAND : [CH[k - 1].x, RAIL];
              const kk = E.soft(seg(T, a, a + TR));
              cardAt = k === 0 ? arcPt(from, [CH[0].x, RAIL], 30, kk) : [lerp(from[0], CH[k].x, kk), RAIL];
              st = ['c1', 'c2', 'else'][k];
            }
            if (k < 2) lampK[k] = E.out3(seg(T, a + TR + 0.1, a + TR + 0.35));
          }
          if (p.m === 2) lampK[2] = E.out3(seg(T, s0(2) + TR, s0(2) + TR + 0.25));
          if (T >= p.tM) {
            const d = E.in(seg(T, p.tM, p.tM + 0.4));
            cardAt = [CH[p.m].x, lerp(RAIL, TRAY.y + 22, d)];
            litK[p.m] = seg(T, p.tM + 0.35, p.tM + 0.7);
            for (let k = p.m + 1; k < 3; k++) dim[k] = E.soft(seg(T, p.tM + 0.5, p.tM + 0.9));
            st = T < p.tM + 0.35 ? st : 'out';
            if (T >= p.tM + 0.4) cardAt = null;
          }
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });
        CH.forEach((c, i) => board(g, c, i, p.val, lampK[i], p.val >= c.lim, dim[i], litK[i]));
        // rel kartu
        g.save();
        g.setLineDash([3, 4]);
        ln(g, CH[0].x - SW / 2 + 4, RAIL + 12, CH[2].x + SW / 2 - 4, RAIL + 12, 1.1, '#c3c8cd');
        g.restore();
        fig(g, pose, ME, 0, { wave: S.wave, wt: S.wt });
        if (cardAt) card(g, `g = ${p.val}`, cardAt[0], cardAt[1], { alpha: T >= 0 && T < s0(0) ? inK : 1 });
        sparks(g, CH[p.m].x, TRAY.y - 8, seg(T, p.tM + 0.5, p.tM + 1.1), 14, 6, GREEN);
      },
    };
  }

  // ------------------------------------------------------------------ 8. Algoritma P5: switch-case dan break
  {
    const ME = -190;
    const DIAL = { x: -152, y: -150, w: 50, h: 50 };
    const DOORS = [
      { x: -60, lab: 'case 1', val: 1, out: 'Senin' },
      { x: 2, lab: 'case 2', val: 2, out: 'Selasa' },
      { x: 64, lab: 'case 3', val: 3, out: 'Rabu' },
      { x: 128, lab: 'default', val: null, out: 'Tidak valid' },
    ];
    const DW = 56, DY = -178, DH = 36, RAIL = -124, EXIT = 196;
    const TERM = { x: -88, y: -82, w: 274, h: 50 };
    const HAND = [ME + 22, -74];
    const OK = { 2: 1, 9: 1, '2nb': 1 };
    function plan(v) {
      const h = v === '9' ? 9 : 2, nb = v === '2nb';
      const m = DOORS.findIndex((d) => d.val === h);
      const start = m < 0 ? 3 : m;
      // tanpa break eksekusi tembus ke case berikutnya, sampai bertemu break atau akhir switch
      const uniq = [start];
      while (uniq[uniq.length - 1] < 3 && nb && DOORS[uniq[uniq.length - 1]].val === 2) uniq.push(uniq[uniq.length - 1] + 1);
      // waktu: masuk dial, lompat ke pintu pertama, lalu tiap pintu yang dijalankan mencetak keluarannya
      const tJump = 1.25, tArr = 2.0;
      const at = [];
      let tt = tArr;
      uniq.forEach((k, i) => {
        if (i > 0) tt += 0.55; // jatuh ke pintu berikutnya tanpa cek
        at.push({ k, t: tt });
        tt += 0.95;
      });
      const tExit = tt;
      return { h, nb, start, runs: uniq, at, tJump, tArr, tExit, end: tExit + 0.7 + 2.0 };
    }
    function door(g, d, i, lampK, ok, runK, brkK, nb, dim) {
      const x0 = d.x - DW / 2;
      g.save();
      if (dim > 0) g.globalAlpha *= 1 - 0.55 * dim;
      ln(g, d.x, DY + DH, d.x, RAIL - 8, 2, INK);
      rr(g, x0, DY, DW, DH, 4);
      inkFill(g, runK > 0 ? HL_SOFT : C.paper, 1.5);
      mono(g, d.lab, d.x - 3, DY + 14, 8, INK, 'center');
      if (d.val != null) lamp(g, x0 + DW - 7, DY + 10, lampK, ok, 4.5);
      // label break: ada (hijau) atau dilepas (coret)
      const hasBrk = d.val != null && !(nb && d.val === 2);
      if (d.val != null) {
        const bx = d.x, by = DY + 28;
        if (hasBrk) {
          rr(g, bx - 16, by - 6, 32, 11, 3);
          inkFill(g, brkK > 0 ? '#cfe6de' : '#f3f2ec', 1, brkK > 0 ? GREEN : '#b9bec4');
          mono(g, 'break', bx, by + 2.5, 6.4, brkK > 0 ? GREEN : MUTED, 'center');
        } else {
          mono(g, 'break', bx, by + 2.5, 6.4, RED, 'center');
          ln(g, bx - 15, by, bx + 15, by, 1.3, RED);
        }
      }
      g.restore();
    }
    function dial(g, h, k) {
      const { x, y, w, h: hh } = DIAL;
      R.stand(g, x + 10, x + w - 10, y + hh);
      rr(g, x, y, w, hh, 5);
      inkFill(g, '#f3f2ec', 1.6);
      mono(g, 'switch', x + w / 2, y + 12, 7, MUTED, 'center');
      mono(g, '(h)', x + w / 2, y + 21, 7, MUTED, 'center');
      if (k > 0) {
        g.save();
        g.globalAlpha *= k;
        mono(g, String(h), x + w / 2, y + 42, 17, INK, 'center');
        g.restore();
      } else mono(g, '?', x + w / 2, y + 42, 15, '#c3c8cd', 'center');
    }
    function terminal(g, outs) {
      R.stand(g, TERM.x + 30, TERM.x + TERM.w - 30, TERM.y + TERM.h);
      R.term(g, TERM.x, TERM.y, TERM.w, TERM.h, 'output');
      let cx = TERM.x + 10;
      for (const o of outs) {
        if (o.k <= 0) continue;
        g.save();
        g.globalAlpha *= seg(o.k, 0, 0.5);
        mono(g, o.s, cx, TERM.y + 35, 10, HL);
        g.restore();
        cx += monoW(g, o.s, 10) + 6;
      }
    }

    SC['alp-switch'] = {
      _v: '2',
      get dur() {
        return plan(this._v in OK ? this._v : '2').end;
      },
      width: 420,
      label: 'switch (h): nilai h dihitung sekali lalu langsung dicocokkan ke case yang sama nilainya. Perintah case itu dijalankan, lalu break keluar dari switch. Kalau break dilepas, eksekusi tembus ke case berikutnya. Kalau tidak ada case yang cocok, default yang dijalankan.',
      draw(g, S) {
        const v = vOf(g, this, '2', OK);
        const p = plan(v);
        let T = S.on ? S.u * this.dur : -1;
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        const HOLDP = P({ hF: lp(HAND, ME, 0, 1), hB: [-4, -54], head: [9, -114], chest: [3, -90] });
        const inK = T < 0 || !S.n ? 1 : E.soft(seg(T, 0, 0.35));
        let pose = breathe(mix(REST(), HOLDP, T < 0 ? 1 : inK * (1 - E.soft(seg(T, 0.6, 0.95)))), t);
        let st = '', cardAt = null, dialK = 0, tok = null;
        const lampK = [0, 0, 0, 0], runK = [0, 0, 0, 0], brkK = [0, 0, 0, 0], dim = [0, 0, 0, 0];
        const outs = [];
        if (T < 0) cardAt = HAND;
        else {
          const look = E.soft(seg(T, 0.9, 1.2)) * (1 - E.soft(seg(T, p.tExit + 0.2, p.tExit + 0.5)));
          pose = mix(pose, P({ hF: [12, -60], hB: [-4, -52], head: [10, -117] }), look);
          const cheer = E.back(seg(T, p.tExit + 0.6, p.tExit + 1.0)) * (1 - E.soft(seg(T, p.tExit + 1.6, p.tExit + 2.0)));
          pose = mix(pose, CHEER, cheer);
          // kartu masuk dial: h dihitung sekali
          if (T < 0.95) cardAt = arcPt(HAND, [DIAL.x + DIAL.w / 2, DIAL.y + 30], 26, E.soft(seg(T, 0.3, 0.95)));
          dialK = seg(T, 0.95, 1.15);
          st = 'nilai';
          // lompat langsung ke pintu yang cocok (tanpa mengecek pintu satu per satu)
          const first = DOORS[p.start];
          if (T >= p.tJump) {
            const k = E.soft(seg(T, p.tJump, p.tArr));
            tok = arcPt([DIAL.x + DIAL.w, RAIL], [first.x, RAIL], 46, k);
            st = p.start === 3 ? 'default' : 'cocok';
          }
          if (p.start < 3) lampK[p.start] = E.out3(seg(T, p.tArr - 0.1, p.tArr + 0.2));
          p.at.forEach((a, i) => {
            if (T < a.t - (i > 0 ? 0.55 : 0)) return;
            const d = DOORS[a.k];
            if (i > 0) {
              // tembus: jalan lurus ke pintu berikutnya tanpa cek
              const prev = DOORS[p.at[i - 1].k];
              tok = [lerp(prev.x, d.x, E.soft(seg(T, a.t - 0.55, a.t))), RAIL];
              if (T < a.t) st = 'tembus';
            }
            if (T >= a.t) {
              tok = [d.x, RAIL];
              runK[a.k] = 1;
              st = i > 0 ? 'tembus' : p.start === 3 ? 'default' : 'jalan';
              outs.push({ s: d.out, k: seg(T, a.t + 0.25, a.t + 0.7) });
            }
          });
          if (T >= p.tExit) {
            const last = DOORS[p.at[p.at.length - 1].k];
            const hasBrk = last.val != null && !(p.nb && last.val === 2);
            if (hasBrk) brkK[p.at[p.at.length - 1].k] = 1;
            tok = arcPt([last.x, RAIL], [EXIT, RAIL], 22, E.soft(seg(T, p.tExit, p.tExit + 0.6)));
            if (T >= p.tExit + 0.6) tok = null;
            st = hasBrk ? 'break' : 'default';
            for (let k = 0; k < 4; k++) if (!p.runs.includes(k)) dim[k] = E.soft(seg(T, p.tExit, p.tExit + 0.4));
          }
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });

        dial(g, p.h, dialK);
        DOORS.forEach((d, i) => door(g, d, i, lampK[i], true, runK[i], brkK[i], p.nb, dim[i]));
        // rel dan tanda akhir switch
        g.save();
        g.setLineDash([3, 4]);
        ln(g, DIAL.x + DIAL.w + 4, RAIL + 10, EXIT - 6, RAIL + 10, 1.1, '#c3c8cd');
        g.restore();
        mono(g, '}', EXIT, RAIL + 4, 16, INK, 'center');
        text(g, 'akhir', EXIT, RAIL + 22, 7.5, MUTED);
        terminal(g, outs);
        fig(g, pose, ME, 0, { wave: S.wave, wt: S.wt });
        if (cardAt) card(g, `h = ${p.h}`, cardAt[0], cardAt[1], { alpha: T >= 0 && T < 0.35 ? inK : 1 });
        if (tok) card(g, String(p.h), tok[0], tok[1], { minW: 18 });
        sparks(g, EXIT, RAIL - 12, seg(T, p.tExit + 0.5, p.tExit + 1.1), 12, 6, GREEN);
      },
    };
  }

  // ------------------------------------------------------------------ 9. PWD P9: validasi form sebelum data masuk tabel
  {
    const ME = -194;
    const F = { x: -170, y: -184, w: 108, h: 132 };
    const NIMBOX = { x: F.x + 8, y: F.y + 30, w: F.w - 16, h: 16 };
    const NAMABOX = { x: F.x + 8, y: F.y + 74, w: F.w - 16, h: 16 };
    const BTN = { x: F.x + 8, y: F.y + 104, w: 46, h: 18 };
    const CK = { x: -40, y: -180, w: 86, h: 44 };
    const TB = { x: 66, y: -180, w: 136, rh: 16 };
    const OK = { salah: 1, benar: 1 };
    const NIM = { salah: '12345', benar: '2401010001' };
    const plan = (v) => ({ ok: v === 'benar', nim: NIM[v], end: v === 'benar' ? 6.4 : 5.6 });

    function form(g, nim, nimK, errK, clearK, pressK) {
      R.stand(g, F.x + 20, F.x + F.w - 20, F.y + F.h);
      rr(g, F.x, F.y, F.w, F.h, 5);
      inkFill(g, C.paper, 1.6);
      text(g, 'Form Daftar', F.x + 8, F.y + 13, 8.5, INK, 'left');
      ln(g, F.x, F.y + 18, F.x + F.w, F.y + 18, 1.1);
      text(g, 'NIM', F.x + 8, F.y + 27, 7, MUTED, 'left');
      rr(g, NIMBOX.x, NIMBOX.y, NIMBOX.w, NIMBOX.h, 3);
      inkFill(g, errK > 0 ? RED_SOFT : '#fff', errK > 0 ? 1.5 : 1.1, errK > 0 ? RED : INK);
      g.save();
      g.globalAlpha *= nimK * (1 - clearK);
      mono(g, nim, NIMBOX.x + 5, NIMBOX.y + 11, 7.4, INK);
      g.restore();
      if (errK > 0) {
        g.save();
        g.globalAlpha *= errK;
        text(g, 'NIM harus 10 digit', NIMBOX.x, NIMBOX.y + 26, 7.2, RED, 'left');
        g.restore();
      }
      text(g, 'Nama', F.x + 8, F.y + 71, 7, MUTED, 'left');
      rr(g, NAMABOX.x, NAMABOX.y, NAMABOX.w, NAMABOX.h, 3);
      inkFill(g, '#fff', 1.1);
      g.save();
      g.globalAlpha *= 1 - clearK;
      mono(g, 'Ani', NAMABOX.x + 5, NAMABOX.y + 11, 7.4, INK);
      g.restore();
      const dy = pressK * 1.5;
      rr(g, BTN.x, BTN.y + dy, BTN.w, BTN.h, 4);
      inkFill(g, pressK > 0.3 ? '#ffd60a' : HL, 1.4);
      text(g, 'Daftar', BTN.x + BTN.w / 2, BTN.y + 12.5 + dy, 8, INK);
    }
    function checker(g, lampK, ok, nimK, nim) {
      R.stand(g, CK.x + 16, CK.x + CK.w - 16, CK.y + CK.h);
      rr(g, CK.x, CK.y, CK.w, CK.h, 4);
      inkFill(g, C.paper, 1.6);
      mono(g, 'NIM 10 digit?', CK.x + 7, CK.y + 15, 7.6, INK);
      lamp(g, CK.x + CK.w - 10, CK.y + 30, lampK, ok);
      if (lampK > 0) {
        g.save();
        g.globalAlpha *= lampK;
        mono(g, ok ? 'true' : 'false', CK.x + 7, CK.y + 34, 7.6, ok ? GREEN : RED);
        g.restore();
      }
      text(g, 'submit → cek', CK.x + CK.w / 2, CK.y - 6, 7.5, MUTED);
    }
    function table(g, rowK) {
      const h = 18 + TB.rh * 2 + 4;
      R.stand(g, TB.x + 24, TB.x + TB.w - 24, TB.y + h);
      rr(g, TB.x, TB.y, TB.w, h, 4);
      inkFill(g, C.paper, 1.6);
      mono(g, 'nim', TB.x + 8, TB.y + 12, 7, MUTED);
      mono(g, 'nama', TB.x + 88, TB.y + 12, 7, MUTED);
      ln(g, TB.x, TB.y + 17, TB.x + TB.w, TB.y + 17, 1.1);
      mono(g, '2401010002', TB.x + 8, TB.y + 29, 7.4, INK);
      mono(g, 'Budi', TB.x + 88, TB.y + 29, 7.4, INK);
      if (rowK > 0) {
        g.save();
        g.globalAlpha *= clamp(rowK * 2, 0, 1);
        stabilo(g, TB.x + 4, TB.y + 35, TB.w - 8, 12, rowK);
        mono(g, '2401010001', TB.x + 8, TB.y + 45, 7.4, INK);
        mono(g, 'Ani', TB.x + 88, TB.y + 45, 7.4, INK);
        g.restore();
      } else text(g, '(baris baru)', TB.x + TB.w / 2, TB.y + 45, 7, '#b9bec4');
    }

    SC['pwd-validasi'] = {
      _v: 'salah',
      get dur() {
        return plan(this._v in OK ? this._v : 'salah').end;
      },
      width: 420,
      label: 'Tombol Daftar ditekan. Event submit ditangkap JavaScript dan preventDefault menahan pengiriman. NIM diperiksa: kalau bukan 10 digit, pesan error muncul di bawah kolom dan tabel tidak berubah. Kalau benar, baris baru ditambahkan ke tabel lalu form dikosongkan.',
      draw(g, S) {
        const v = vOf(g, this, 'salah', OK);
        const p = plan(v);
        let T = S.on ? S.u * this.dur : -1;
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pose = breathe(REST(), t);
        let pressK = 0, subK = -1, cardK = -1, lampK = 0, errK = 0, rowK = 0, clearK = 0, rowTok = -1, stopK = 0, st = '';
        if (T < 0) pose = mix(pose, CHIN, pulse(t, 6, 2.2, 2.2));
        else {
          const btnPt = lp([BTN.x + 10, BTN.y + 8], ME, 0, 1);
          const reach = E.soft(seg(T, 0.15, 0.55)) * (1 - E.soft(seg(T, 1.0, 1.35)));
          pose = mix(pose, P({ hF: btnPt, hB: [-4, -54], head: [9, -113], chest: [4, -89] }), reach);
          pressK = E.soft(seg(T, 0.6, 0.7)) * (1 - E.soft(seg(T, 0.8, 0.95)));
          const look = E.soft(seg(T, 1.3, 1.6)) * (1 - E.soft(seg(T, 3.6, 3.9)));
          pose = mix(pose, P({ hF: [12, -60], hB: [-4, -52], head: [10, -117] }), look);
          subK = T >= 0.8 && T < 1.5 ? seg(T, 0.8, 1.45) : -1;
          stopK = E.out3(seg(T, 1.45, 1.75));
          cardK = T >= 2.0 && T < 2.65 ? seg(T, 2.0, 2.6) : -1;
          lampK = E.out3(seg(T, 2.6, 2.85));
          if (T < 1.45) st = 'submit';
          else if (T < 2.0) st = 'cegah';
          else if (T < 2.95) st = 'cek';
          if (!p.ok) {
            errK = seg(T, 3.0, 3.35);
            if (T >= 2.95) st = 'error';
            const shrug = E.soft(seg(T, 3.5, 3.8)) * (1 - E.soft(seg(T, 4.5, 4.8)));
            pose = mix(pose, P({ hF: [24, -80], hB: [12, -82], head: [4, -116], hang: 0 }), shrug);
          } else {
            rowTok = T >= 3.0 && T < 3.7 ? seg(T, 3.0, 3.65) : -1;
            rowK = seg(T, 3.6, 4.0);
            clearK = seg(T, 4.0, 4.3);
            if (T >= 2.95) st = 'simpan';
            const cheer = E.back(seg(T, 4.4, 4.8)) * (1 - E.soft(seg(T, 5.4, 5.8)));
            pose = mix(pose, CHEER, cheer);
          }
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });

        form(g, p.nim, 1, errK, clearK, pressK);
        checker(g, lampK, p.ok, 0, p.nim);
        table(g, rowK);
        // preventDefault: lencana di atas form, halaman tidak dimuat ulang
        if (stopK > 0) {
          g.save();
          g.globalAlpha *= stopK;
          const w = monoW(g, 'e.preventDefault()', 6.8) + 10;
          rr(g, F.x + F.w / 2 - w / 2, F.y - 18, w, 13, 6.5);
          inkFill(g, '#eaf3f0', 1.1, GREEN);
          mono(g, 'e.preventDefault()', F.x + F.w / 2, F.y - 9, 6.8, GREEN, 'center');
          g.restore();
        }
        fig(g, pose, ME, 0, { wave: S.wave, wt: S.wt });
        if (subK > 0 && subK < 1) {
          const q = arcPt([BTN.x + BTN.w, BTN.y], [CK.x + 10, CK.y + 20], 40, E.soft(subK));
          card(g, 'submit', q[0], q[1], { size: 7, h: 14 });
        }
        if (cardK > 0 && cardK < 1) {
          const q = arcPt([NIMBOX.x + 40, NIMBOX.y + 8], [CK.x + 30, CK.y + 48], 34, E.soft(cardK));
          card(g, p.nim, q[0], q[1], { size: 7, h: 14 });
        }
        if (rowTok > 0 && rowTok < 1) {
          const q = arcPt([CK.x + CK.w / 2, CK.y + CK.h], [TB.x + 40, TB.y + 42], 30, E.soft(rowTok));
          card(g, '2401010001 Ani', q[0], q[1], { size: 6.8, h: 14 });
        }
        if (p.ok) sparks(g, TB.x + TB.w / 2, TB.y - 6, seg(T, 3.9, 4.5), 14, 6, GREEN);
      },
    };
  }

  // ------------------------------------------------------------------ 10. PWD P11: form dikirim dengan GET atau POST
  {
    const ME = -182;
    const B = { x: -168, y: -184, w: 128, h: 112 };
    const SV = { x: 78, y: -184, w: 122, h: 112 };
    const BTN = { x: B.x + 8, y: B.y + 82, w: 42, h: 16 };
    const RQ = -132, RS = -100;
    const OK = { GET: 1, POST: 1 };
    const plan = (v) => ({ get: v === 'GET', m: v, end: 6.6 });

    function browser(g, url, urlK, pageK, pressK, warnK, isGet) {
      R.stand(g, B.x + 26, B.x + B.w - 26, B.y + B.h);
      rr(g, B.x, B.y, B.w, B.h, 5);
      inkFill(g, C.paper, 1.6);
      ln(g, B.x, B.y + 19, B.x + B.w, B.y + 19, 1.2);
      rr(g, B.x + 5, B.y + 4, B.w - 10, 12, 6);
      inkFill(g, '#f3f2ec', 1);
      mono(g, typed(url, urlK), B.x + 10, B.y + 13, 6.6, INK);
      if (warnK > 0) {
        g.save();
        g.globalAlpha *= warnK;
        text(g, isGet ? 'data terlihat di URL' : 'URL tetap bersih', B.x + B.w / 2, B.y + 30, 7.2, isGet ? RED : GREEN);
        g.restore();
      }
      g.save();
      g.globalAlpha *= 1 - pageK;
      text(g, 'nama', B.x + 10, B.y + 68, 7, MUTED, 'left');
      rr(g, B.x + 34, B.y + 59, 56, 13, 3);
      inkFill(g, '#fff', 1.1);
      mono(g, 'Ani', B.x + 39, B.y + 68.5, 7.2, INK);
      const dy = pressK * 1.5;
      rr(g, BTN.x, BTN.y + dy, BTN.w, BTN.h, 4);
      inkFill(g, pressK > 0.3 ? '#ffd60a' : HL, 1.3);
      text(g, 'Kirim', BTN.x + BTN.w / 2, BTN.y + 11.5 + dy, 7.6, INK);
      g.restore();
      if (pageK > 0) {
        g.save();
        g.globalAlpha *= pageK;
        stabilo(g, B.x + 10, B.y + 46, 60, 13, pageK);
        text(g, 'Halo, Ani', B.x + 13, B.y + 56, 9.5, INK, 'left');
        words(g, B.x + 10, B.y + 76, 70, 5, '#c7ccd1', 2);
        g.restore();
      }
    }
    function server(g, isGet, hl) {
      R.stand(g, SV.x + 24, SV.x + SV.w - 24, SV.y + SV.h);
      rr(g, SV.x, SV.y, SV.w, SV.h, 5);
      inkFill(g, '#1d2731', 1.6);
      mono(g, 'proses.php', SV.x + 8, SV.y + 13, 7, '#9aa3ad');
      text(g, 'server', SV.x + SV.w / 2, SV.y - 6, 9, GREEN);
      const L = [isGet ? '$nama = $_GET' : '$nama = $_POST', '        ["nama"];', 'echo "Halo, $nama";'];
      L.forEach((l, i) => {
        const y = SV.y + 26 + i * 14;
        const k = i < 2 ? hl[0] : hl[1];
        if (k > 0) {
          g.save();
          g.globalAlpha *= k;
          rr(g, SV.x + 4, y - 9, SV.w - 8, 13, 2);
          g.fillStyle = 'rgba(255,225,77,0.22)';
          g.fill();
          ln(g, SV.x + 4, y - 8, SV.x + 4, y + 3, 2.2, HL);
          g.restore();
        }
        mono(g, l, SV.x + 9, y, 7, k > 0.5 ? '#ffffff' : '#c9d1d9');
      });
    }
    function rails(g) {
      const x0 = B.x + B.w + 6, x1 = SV.x - 6;
      g.save();
      g.setLineDash([3, 4]);
      ln(g, x0, RQ, x1, RQ, 1.2, '#b9bec4');
      ln(g, x0, RS, x1, RS, 1.2, '#b9bec4');
      g.restore();
      R.arrowHead(g, [x1, RQ], 0, 6, 1.3, '#9aa1a8');
      R.arrowHead(g, [x0, RS], Math.PI, 6, 1.3, '#9aa1a8');
      text(g, 'request', (x0 + x1) / 2, RQ - 30, 8, MUTED);
      text(g, 'response', (x0 + x1) / 2, RS + 20, 8, MUTED);
    }
    // Amplop: GET terbuka dengan data tertulis di luar, POST tertutup dengan data di dalam (body).
    function envelope(g, cx, cy, isGet, openK) {
      const w = 54, h = 26;
      rr(g, cx - w / 2, cy - h / 2, w, h, 3);
      inkFill(g, isGet ? '#fff' : '#f3f2ec', 1.4);
      if (isGet) {
        mono(g, 'GET', cx, cy - 3, 6.6, MUTED, 'center');
        mono(g, '?nama=Ani', cx, cy + 8, 7, RED, 'center');
      } else {
        const f = 1 - openK;
        R.poly(g, [[cx - w / 2, cy - h / 2], [cx, cy - h / 2 + 12 * f], [cx + w / 2, cy - h / 2]], false);
        g.strokeStyle = INK;
        g.lineWidth = 1.2;
        g.stroke();
        mono(g, 'POST', cx, cy + 9, 6.6, MUTED, 'center');
        if (openK > 0) {
          g.save();
          g.globalAlpha *= openK;
          card(g, 'nama=Ani', cx, cy - h / 2 - 9 * openK, { size: 6.8, h: 13, fill: '#fff' });
          g.restore();
        }
      }
    }

    SC['pwd-getpost'] = {
      _v: 'GET',
      get dur() {
        return plan(this._v in OK ? this._v : 'GET').end;
      },
      width: 420,
      label: 'Form berisi nama Ani dikirim ke proses.php. Dengan GET, data ditempel di URL sebagai ?nama=Ani sehingga terlihat. Dengan POST, data dibawa di badan request dan URL tetap bersih. Server membaca $_GET atau $_POST, lalu membalas Halo, Ani yang tampil di browser.',
      draw(g, S) {
        const v = vOf(g, this, 'GET', OK);
        const p = plan(v);
        let T = S.on ? S.u * this.dur : -1;
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pose = breathe(REST(), t);
        let pressK = 0, envK = -1, openK = 0, resK = -1, pageK = 0, warnK = 0, st = '';
        let url = 'form.php', urlK = 1;
        const hl = [0, 0];
        if (T < 0) pose = mix(pose, CHIN, pulse(t, 6, 2.2, 2.2));
        else {
          const btnPt = lp([BTN.x + 6, BTN.y + 9], ME, 0, 1);
          const reach = E.soft(seg(T, 0.15, 0.55)) * (1 - E.soft(seg(T, 1.0, 1.3)));
          pose = mix(pose, P({ hF: btnPt, hB: [-4, -54], head: [9, -113], chest: [4, -89] }), reach);
          pressK = E.soft(seg(T, 0.6, 0.7)) * (1 - E.soft(seg(T, 0.8, 0.95)));
          const wait = E.soft(seg(T, 1.4, 1.7)) * (1 - E.soft(seg(T, 4.1, 4.4)));
          pose = mix(pose, CHIN, wait);
          const cheer = E.back(seg(T, 4.6, 5.0)) * (1 - E.soft(seg(T, 5.6, 6.0)));
          pose = mix(pose, CHEER, cheer);
          if (T >= 0.85) {
            url = p.get ? 'proses.php?nama=Ani' : 'proses.php';
            urlK = seg(T, 0.85, 1.45);
          }
          warnK = E.out3(seg(T, 1.5, 1.8));
          envK = T >= 1.0 && T < 2.35 ? seg(T, 1.0, 2.3) : -1;
          openK = p.get ? 0 : seg(T, 2.3, 2.7);
          hl[0] = E.soft(seg(T, 2.4, 2.6)) * (1 - E.soft(seg(T, 3.0, 3.2)));
          hl[1] = E.soft(seg(T, 3.0, 3.2)) * (1 - E.soft(seg(T, 3.6, 3.8)));
          resK = T >= 3.4 && T < 4.35 ? seg(T, 3.4, 4.3) : -1;
          pageK = seg(T, 4.25, 4.65);
          if (T < 1.0) st = 'isi';
          else if (T < 2.35) st = 'kirim';
          else if (T < 3.0) st = 'baca';
          else if (T < 4.25) st = 'balas';
          else st = 'tampil';
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });

        rails(g);
        browser(g, url, urlK, pageK, pressK, warnK, p.get);
        server(g, p.get, hl);
        fig(g, pose, ME, 0, { wave: S.wave, wt: S.wt });
        const x0 = B.x + B.w + 30, x1 = SV.x - 30;
        if (envK > 0 && envK < 1) envelope(g, lerp(x0, x1, E.soft(envK)), RQ, p.get, 0);
        if (!p.get && T >= 2.3 && T < 3.0) {
          g.save();
          g.globalAlpha *= 1 - seg(T, 2.8, 3.0);
          envelope(g, x1, RQ, false, openK);
          g.restore();
        }
        if (resK > 0 && resK < 1) card(g, 'Halo, Ani', lerp(x1, x0, E.soft(resK)), RS, { size: 7.2, h: 15, fill: '#eaf3f0', ink: GREEN });
        sparks(g, B.x + 40, B.y + 40, seg(T, 4.4, 5.0), 14, 6, GREEN);
      },
    };
  }

  // ------------------------------------------------------------------ 11. PWD P13: query CRUD mengubah tabel MySQL
  {
    const ME = -184;
    const PN = { x: -168, y: -164, w: 150, h: 64 };
    const TB = { x: 34, y: -184, w: 166, rh: 15 };
    const ROWS = [['1', 'Ahmad', 'SI'], ['2', 'Budi', 'TI'], ['3', 'Citra', 'SI']];
    const OK = { INSERT: 1, UPDATE: 1, DELETE: 1, NOWHERE: 1 };
    const SQLS = {
      INSERT: ['INSERT INTO mahasiswa', '  (nama, jurusan)', "VALUES ('Dewi', 'MI')"],
      UPDATE: ['UPDATE mahasiswa', "SET jurusan = 'MI'", 'WHERE id = 3'],
      DELETE: ['DELETE FROM mahasiswa', 'WHERE id = 2'],
      NOWHERE: ['UPDATE mahasiswa', "SET jurusan = 'MI'", '-- WHERE lupa ditulis'],
    };
    const HIT = { INSERT: [], UPDATE: [2], DELETE: [1], NOWHERE: [0, 1, 2] };
    const plan = (v) => ({ v, sql: SQLS[v], hit: HIT[v], n: v === 'INSERT' ? 1 : HIT[v].length, bad: v === 'NOWHERE', end: 6.4 });

    function panel(g, lines, typK, badK) {
      R.stand(g, PN.x + 30, PN.x + PN.w - 30, PN.y + PN.h);
      rr(g, PN.x, PN.y, PN.w, PN.h, 5);
      inkFill(g, '#1d2731', 1.6);
      mono(g, 'crud.php  $sql =', PN.x + 8, PN.y + 12, 6.8, '#9aa3ad');
      lines.forEach((l, i) => {
        const k = seg(typK, i / lines.length, (i + 1) / lines.length);
        const red = l.startsWith('--');
        mono(g, typed(l, k), PN.x + 8, PN.y + 26 + i * 12, 7, red ? '#f2a39a' : '#e9edf1');
      });
    }
    function table(g, p, scan, hitK, chgK, gone, newK) {
      const rows = ROWS.map((r) => r.slice());
      const H = 30 + TB.rh * 4;
      R.stand(g, TB.x + 26, TB.x + TB.w - 26, TB.y + H);
      rr(g, TB.x, TB.y, TB.w, H, 5);
      inkFill(g, C.paper, 1.6);
      text(g, 'MySQL', TB.x + TB.w / 2, TB.y - 6, 9, GREEN);
      mono(g, 'mahasiswa', TB.x + 8, TB.y + 12, 7.4, INK);
      const cols = [TB.x + 10, TB.x + 36, TB.x + 108];
      ['id', 'nama', 'jurusan'].forEach((c, i) => mono(g, c, cols[i], TB.y + 26, 6.8, MUTED));
      ln(g, TB.x, TB.y + 30, TB.x + TB.w, TB.y + 30, 1.1);
      let y = TB.y + 30;
      rows.forEach((r, i) => {
        const hit = p.hit.includes(i);
        const del = p.v === 'DELETE' && hit;
        const hh = del ? TB.rh * (1 - gone) : TB.rh;
        if (hh <= 0.5) return;
        g.save();
        g.beginPath();
        g.rect(TB.x + 1, y, TB.w - 2, hh);
        g.clip();
        if (scan === i) {
          rr(g, TB.x + 3, y + 1, TB.w - 6, TB.rh - 2, 2);
          g.fillStyle = '#f3f2ec';
          g.fill();
        }
        if (hit && hitK > 0) {
          g.save();
          g.globalAlpha *= hitK;
          rr(g, TB.x + 3, y + 1, TB.w - 6, TB.rh - 2, 2);
          g.fillStyle = del || p.bad ? RED_SOFT : HL_SOFT;
          g.fill();
          g.restore();
        }
        const val = !del && hit && chgK > 0.5 ? 'MI' : r[2];
        mono(g, r[0], cols[0], y + 11, 7.2, INK);
        mono(g, r[1], cols[1], y + 11, 7.2, INK);
        if (!del && hit && chgK > 0) stabilo(g, cols[2] - 3, y + 2, 20, 11, chgK, p.bad ? RED_SOFT : HL);
        mono(g, val, cols[2], y + 11, 7.2, INK);
        if (del && hitK > 0.5) ln(g, TB.x + 6, y + 8, TB.x + TB.w - 6, y + 8, 1.4, RED);
        g.restore();
        y += hh;
      });
      if (p.v === 'INSERT' && newK > 0) {
        g.save();
        g.globalAlpha *= clamp(newK * 2, 0, 1);
        stabilo(g, TB.x + 4, y + 2, TB.w - 8, 11, newK);
        mono(g, '4', cols[0], y + 11, 7.2, INK);
        mono(g, 'Dewi', cols[1], y + 11, 7.2, INK);
        mono(g, 'MI', cols[2], y + 11, 7.2, INK);
        g.restore();
      }
    }

    SC['pwd-crud'] = {
      _v: 'INSERT',
      get dur() {
        return plan(this._v in OK ? this._v : 'INSERT').end;
      },
      width: 420,
      label: 'PHP menyusun query SQL lalu mengirimnya dengan mysqli_query. MySQL mencari baris yang cocok dengan WHERE lalu menambah, mengubah, atau menghapusnya. Hasilnya kembali ke PHP berupa jumlah baris yang berubah. UPDATE tanpa WHERE mengubah semua baris.',
      draw(g, S) {
        const v = vOf(g, this, 'INSERT', OK);
        const p = plan(v);
        let T = S.on ? S.u * this.dur : -1;
        if (!S.on && (S.n > 0 || reducedNow())) T = this.dur;
        const t = S.t;
        let pose = breathe(REST(), t);
        let typK = 0, qK = -1, scan = -1, hitK = 0, chgK = 0, gone = 0, newK = 0, resK = -1, badgeK = 0, st = '';
        if (T < 0) pose = mix(pose, CHIN, pulse(t, 6, 2.2, 2.2));
        else {
          const kb = lp([PN.x + 14, PN.y + PN.h + 2], ME, 0, 1);
          const type = E.soft(seg(T, 0.1, 0.4)) * (1 - E.soft(seg(T, 1.0, 1.3)));
          const bob = Math.sin(T * 24) * 1.4 * seg(T, 0.35, 0.45) * (1 - seg(T, 0.95, 1.05));
          pose = mix(pose, P({ hF: [kb[0] + bob, kb[1] - bob], hB: [-4, -54], head: [9, -115], chest: [4, -90] }), type);
          const look = E.soft(seg(T, 1.3, 1.6)) * (1 - E.soft(seg(T, 4.0, 4.3)));
          pose = mix(pose, P({ hF: [12, -60], hB: [-4, -52], head: [10, -117] }), look);
          if (p.bad) pose = mix(pose, CHIN, E.soft(seg(T, 4.3, 4.6)) * (1 - E.soft(seg(T, 5.6, 5.9))));
          else pose = mix(pose, CHEER, E.back(seg(T, 4.4, 4.8)) * (1 - E.soft(seg(T, 5.4, 5.8))));
          typK = seg(T, 0.3, 1.1);
          qK = T >= 1.2 && T < 2.0 ? seg(T, 1.2, 1.95) : -1;
          if (T >= 2.0 && T < 2.75 && p.v !== 'INSERT') scan = Math.min(2, Math.floor((T - 2.0) / 0.25));
          hitK = p.v === 'INSERT' ? 0 : E.out3(seg(T, 2.75, 3.0));
          chgK = p.v === 'UPDATE' || p.bad ? seg(T, 3.0, 3.4) : 0;
          gone = p.v === 'DELETE' ? E.soft(seg(T, 3.1, 3.6)) : 0;
          newK = p.v === 'INSERT' ? seg(T, 2.2, 2.8) : 0;
          resK = T >= 3.6 && T < 4.35 ? seg(T, 3.6, 4.3) : -1;
          badgeK = E.out3(seg(T, 4.25, 4.55));
          if (T < 1.2) st = 'susun';
          else if (T < 2.0) st = 'kirim';
          else if (T < 3.0) st = p.v === 'INSERT' ? 'ubah' : 'cari';
          else if (T < 3.6) st = 'ubah';
          else st = 'hasil';
        }
        step(g, st);
        pose = legs(pose, 0, 0, { arms: false });

        panel(g, p.sql, typK, 0);
        table(g, p, scan, hitK, chgK, gone, newK);
        const lab = `${p.n} baris berubah`;
        if (badgeK > 0) {
          g.save();
          g.globalAlpha *= badgeK;
          const w = monoW(g, lab, 7.2) + 14;
          rr(g, PN.x + PN.w / 2 - w / 2, PN.y + PN.h + 12, w, 15, 7.5);
          inkFill(g, p.bad ? RED_SOFT : '#eaf3f0', 1.2, p.bad ? RED : GREEN);
          mono(g, lab, PN.x + PN.w / 2, PN.y + PN.h + 22, 7.2, p.bad ? RED : GREEN, 'center');
          g.restore();
        }
        fig(g, pose, ME, 0, { wave: S.wave, wt: S.wt });
        if (qK > 0 && qK < 1) {
          const q = arcPt([PN.x + PN.w, PN.y + 30], [TB.x + 10, TB.y + 40], 40, E.soft(qK));
          card(g, 'mysqli_query', q[0], q[1], { size: 6.8, h: 14 });
        }
        if (resK > 0 && resK < 1) {
          const q = arcPt([TB.x, TB.y + 70], [PN.x + PN.w / 2, PN.y + PN.h + 19], -26, E.soft(resK));
          card(g, String(p.n), q[0], q[1], { size: 7.2, h: 14, minW: 18, fill: p.bad ? RED_SOFT : '#eaf3f0', ink: p.bad ? RED : GREEN });
        }
        if (!p.bad) sparks(g, TB.x + TB.w / 2, TB.y - 16, seg(T, 3.2, 3.8), 14, 6, GREEN);
      },
    };
  }

  // Tema Sinau untuk runtime
  if (window.STICK && window.STICK.theme) {
    window.STICK.theme({
      ink: INK, far: '#a7aeb6', muted: MUTED, floor: '#f6f5ef', paper: '#ffffff',
      butter: HL, butterHi: '#ffd60a', butterSoft: HL_SOFT, green: '#d3eae2', greenInk: GREEN,
      font: "'Atkinson Hyperlegible', system-ui, sans-serif", fontW: 700,
    });
  }
})();

// ---------- Blok "adegan": satu adegan + kode (opsional) + daftar langkah yang ikut menyala ----------
// { type: "adegan", label, title, desc, scene: "<id>", code: "...", marks: [{ sorot, t }], steps: [{ sorot, html }],
//   pilih: { label: "Coba g =", opsi: [{ v: "85", t: "85", code?, marks? }] } }
// "pilih" menampilkan tombol nilai; nilai terpilih dikirim ke adegan lewat data-v dan adegan diputar ulang.
function adgCode(code, marks) {
  if (!code) return '';
  let html = esc(code);
  (marks || []).forEach((m) => {
    const t = esc(m.t), i = html.indexOf(t);
    if (i >= 0) html = html.slice(0, i) + `<span class="adg-p" data-sorot="${esc(m.sorot)}">${t}</span>` + html.slice(i + t.length);
  });
  return html;
}
function adgOpt(d, s) {
  const o = (d.pilih && d.pilih.opsi) || [];
  return o[Math.min(s.v || 0, o.length - 1)] || null;
}
const ADEGAN_BLOCK = {
  init: () => ({ v: 0 }),
  render(d, s, n) {
    const o = adgOpt(d, s);
    const src = (o && o.code) || d.code, marks = (o && o.marks) || d.marks;
    const code = src ? `<pre class="adg-code">${adgCode(src, marks)}</pre>` : '';
    const steps = (d.steps || []).map((x) => `<li data-sorot="${esc(x.sorot)}"><span class="rich">${rich(x.html)}</span></li>`).join('');
    const label = esc(d.alt || d.title || 'Adegan');
    const pick = o ? `<div class="adg-pick" role="group" aria-label="${esc(d.pilih.label || 'Pilih nilai')}"><span>${esc(d.pilih.label || 'Coba:')}</span>${d.pilih.opsi
      .map((x, i) => `<button type="button" class="adg-chip" aria-pressed="${i === (s.v || 0)}" ${act(n, 'pick', i)}>${esc(x.t)}</button>`).join('')}</div>` : '';
    return `<div class="adg">${code}${pick}
      <div class="adg-stage"><stick-scene scene="${esc(d.scene)}" play="view" no-font no-floor${o ? ` data-v="${esc(o.v)}"` : ''} aria-label="${label}"></stick-scene></div>
      <div class="adg-replay"><button type="button" class="adg-btn" ${act(n, 'replay')}>▶ Putar lagi</button><span>atau ketuk gambarnya</span></div>
      ${steps ? `<ol class="adg-steps">${steps}</ol>` : ''}</div>`;
  },
  on: {
    replay(d, s, a, n) {
      const el = document.querySelector('#blk-' + n + ' stick-scene');
      if (el && el.v) { el.v.on = false; el.v.play(); }
      return false;
    },
    pick(d, s, a, n) {
      const i = Math.max(0, Math.min(+a || 0, ((d.pilih && d.pilih.opsi) || []).length - 1));
      s.v = i;
      const o = adgOpt(d, s), box = document.getElementById('blk-' + n);
      if (!o || !box) return;
      box.querySelectorAll('.adg-chip').forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
      const pre = box.querySelector('.adg-code');
      if (pre && (o.code || d.code)) pre.innerHTML = adgCode(o.code || d.code, o.marks || d.marks);
      const el = box.querySelector('stick-scene');
      if (el) {
        el.dataset.v = o.v;
        delete el.dataset.step;
        // adegan hanya bergerak saat terlihat: geser layar ke panggungnya bila perlu
        const r = el.getBoundingClientRect();
        if (r.top < 0 || r.bottom > (window.innerHeight || 0)) el.scrollIntoView({ block: 'nearest', behavior: window.STICK && window.STICK.reduced && window.STICK.reduced.matches ? 'auto' : 'smooth' });
        if (el.v) {
          el.v.on = false;
          el.v.dirty = true; // gerak dikurangi: gambar ulang keadaan akhir pilihan baru
          el.v.play();
          if (window.STICK && window.STICK.kick) window.STICK.kick();
        }
      }
      return false;
    }
  }
};

// ---------- Blok "penelusur": langkah demi langkah dengan tombol, dua simpul dan isi pesan ----------
// { type: "penelusur", label, title, desc, nodes: [{ t, s }, { t, s }],
//   steps: [{ say, on: 0|1, dot: "req"|"res", label, msg, hl: [nomor baris yang disorot, mulai 0] }] }
const PENELUSUR_BLOCK = {
  init: () => ({ i: 0 }),
  render(d, s, n) {
    const st = d.steps || [], k = Math.min(s.i, st.length - 1), x = st[k] || {};
    const node = (nd, i) => `<div class="pnl-node${x.on === i ? ' is-on' : ''}">${esc(nd.t)}${nd.s ? `<small>${esc(nd.s)}</small>` : ''}</div>`;
    const nodes = d.nodes || [];
    const msg = String(x.msg || '').split('\n').map((line, i) => (x.hl || []).includes(i) ? `<b>${esc(line)}</b>` : esc(line)).join('\n');
    const last = k === st.length - 1;
    return `<div class="pnl">
      <div class="pnl-lane">
        <div class="pnl-nodes" aria-hidden="true">${nodes[0] ? node(nodes[0], 0) : ''}<div class="pnl-wire"><span class="pnl-dot${x.dot ? ' is-' + esc(x.dot) : ''}"></span></div>${nodes[1] ? node(nodes[1], 1) : ''}</div>
        <p class="pnl-say rich" aria-live="polite">${rich(x.say || '')}</p>
        <div class="pnl-ctrl">
          <button type="button" class="adg-btn" ${act(n, 'prev')} ${k === 0 ? 'disabled' : ''}>← Sebelumnya</button>
          <button type="button" class="adg-btn is-main" ${act(n, 'next')}>${last ? 'Ulangi ↺' : 'Berikutnya →'}</button>
          <span class="pnl-count">${k + 1} / ${st.length}</span>
        </div>
        <div class="pnl-pips" aria-hidden="true">${st.map((_, i) => `<i${i <= k ? ' class="is-on"' : ''}></i>`).join('')}</div>
      </div>
      <div class="pnl-lane"><span class="pnl-label">${esc(x.label || '')}</span><pre class="pnl-msg">${msg}</pre></div>
    </div>`;
  },
  on: {
    prev(d, s) { if (s.i > 0) s.i--; },
    next(d, s) { s.i = s.i >= (d.steps || []).length - 1 ? 0 : s.i + 1; }
  }
};
