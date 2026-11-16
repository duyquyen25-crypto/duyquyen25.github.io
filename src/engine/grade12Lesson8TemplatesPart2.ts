import { MathTemplate } from '../types/math';

export const G12_B8_PART2_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG - SAI (DẠNG 30 -> DẠNG 46)
  // =====================================================================

  // Dạng 30 (Q30): Hình bình hành MNPQ (tâm I, biểu diễn MN, vectơ NP, đỉnh Q)
  t12_b8_d30_parallelogram_tf: {
    id: 't12_b8_d30_parallelogram_tf',
    name: 'Tổng hợp tọa độ tâm, vectơ cạnh và đỉnh thứ tư của hình bình hành MNPQ',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hình bình hành trong không gian Oxyz',
    description: 'Cho hình bình hành MNPQ biết M, N, P. Đánh giá 4 mệnh đề về tâm I, phân tích vectơ MN, vectơ NP và đỉnh Q.',
    conditionSummary: 'M, N, P không thẳng hàng và các thành phần MN không đồng thời bằng 0',
    paramSpecs: [
      { name: 'xM', label: 'x_M', min: -5, max: 5 },
      { name: 'yM', label: 'y_M', min: -6, max: 4 },
      { name: 'zM', label: 'z_M', min: -4, max: 6 },
      { name: 'xN', label: 'x_N', min: -5, max: 5 },
      { name: 'yN', label: 'y_N', min: -6, max: 4 },
      { name: 'zN', label: 'z_N', min: -4, max: 6 },
      { name: 'xP', label: 'x_P', min: -5, max: 6 },
      { name: 'yP', label: 'y_P', min: -4, max: 7 },
      { name: 'zP', label: 'z_P', min: -4, max: 6 },
      { name: 'mode', label: 'Chế độ Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { xM, yM, zM, xN, yN, zN, xP, yP, zP } = params;
      const u1 = xN - xM, u2 = yN - yM, u3 = zN - zM;
      const v1 = xP - xM, v2 = yP - yM, v3 = zP - zM;
      const cx = u2 * v3 - u3 * v2, cy = u3 * v1 - u1 * v3, cz = u1 * v2 - u2 * v1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'M, N, P thẳng hàng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xM, yM, zM, xN, yN, zN, xP, yP, zP, mode } = params;
      const ix = u.simplifyFrac(xM + xP, 2);
      const iy = u.simplifyFrac(yM + yP, 2);
      const iz = u.simplifyFrac(zM + zP, 2);
      const mnX = xN - xM, mnY = yN - yM, mnZ = zN - zM;
      const npX = xP - xN, npY = yP - yN, npZ = zP - zN;
      const xQ = xP - mnX, yQ = yP - mnY, zQ = zP - mnZ;
      const fmt3 = (a, b, c) => '(' + a + ';\\, ' + b + ';\\, ' + c + ')';
      const basisExpr = (a, b, c) => {
        const sb = b >= 0 ? ' + ' + b : ' - ' + Math.abs(b);
        const sc = c >= 0 ? ' + ' + c : ' - ' + Math.abs(c);
        return a + '\\overrightarrow{i}' + sb + '\\overrightarrow{j}' + sc + '\\overrightarrow{k}';
      };
      const aTrue = mode !== 2;
      const cTrue = mode !== 1;
      const dTrue = mode === 3;
      const shownIx = aTrue ? ix.latex : u.simplifyFrac(xM + xP + 2, 2).latex;
      const shownNp = cTrue ? u.formatCoord3D(npX, npY, npZ) : u.formatCoord3D(npX + 1, npY - 1, npZ);
      const shownQ = dTrue ? u.formatCoord3D(xQ, yQ, zQ) : u.formatCoord3D(xQ + 1, yQ + 1, zQ);
      const tfStatements = [
        {
          key: 'a',
          text: 'Tọa độ tâm $I$ của hình bình hành $MNPQ$ là $I' + fmt3(shownIx, iy.latex, iz.latex) + '$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: '$\\overrightarrow{MN} = ' + basisExpr(mnX, mnY, mnZ) + '$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Tọa độ vectơ $\\overrightarrow{NP} = ' + shownNp + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Tọa độ điểm $Q' + shownQ + '$.',
          isTrue: dTrue,
        },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$, cho hình bình hành $MNPQ$ với $M' +
          u.formatCoord3D(xM, yM, zM) +
          ',\\; N' +
          u.formatCoord3D(xN, yN, zN) +
          ',\\; P' +
          u.formatCoord3D(xP, yP, zP) +
          '$. Xét tính đúng-sai của các khẳng định sau.',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Tâm $I$ là trung điểm của $MP$ nên $I' + fmt3(ix.latex, iy.latex, iz.latex) + '$.',
          'b) Đúng. $\\overrightarrow{MN} = ' + u.formatCoord3D(mnX, mnY, mnZ) + ' = ' + basisExpr(mnX, mnY, mnZ) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\overrightarrow{NP} = ' + u.formatCoord3D(npX, npY, npZ) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Vì $MNPQ$ là hình bình hành nên $\\overrightarrow{MN} = \\overrightarrow{QP} \\Rightarrow Q' + u.formatCoord3D(xQ, yQ, zQ) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M, N, P thẳng hàng', params: { xM: 0, yM: 0, zM: 0, xN: 1, yN: 1, zN: 1, xP: 2, yP: 2, zP: 2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 M(2;-5;4), N(2;-3;4), P(0;6;1)', params: { xM: 2, yM: -5, zM: 4, xN: 2, yN: -3, zN: 4, xP: 0, yP: 6, zP: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 31 (Q31): Phép toán hiệu, tổ hợp, độ dài và cosin góc giữa u và m
  t12_b8_d31_two_vectors_ops_tf: {
    id: 't12_b8_d31_two_vectors_ops_tf',
    name: 'Tổng hợp phép toán tọa độ, độ dài và cosin góc giữa hai vectơ',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Các phép toán vectơ và tích vô hướng',
    description: 'Cho hai vectơ u, m. Kiểm tra vectơ hiệu, tổ hợp tuyến tính, độ dài |m| và cos(u; m).',
    conditionSummary: 'u, m ≠ 0 và không cùng phương',
    paramSpecs: [
      { name: 'u1', label: 'u₁', min: -5, max: 5 },
      { name: 'u2', label: 'u₂', min: -5, max: 5 },
      { name: 'u3', label: 'u₃', min: -6, max: 6 },
      { name: 'm1', label: 'm₁', min: -5, max: 5 },
      { name: 'm2', label: 'm₂', min: -5, max: 5 },
      { name: 'm3', label: 'm₃', min: -8, max: 8 },
      { name: 'c1', label: 'Hệ số c₁', min: -4, max: -2 },
      { name: 'c2', label: 'Hệ số c₂', min: -5, max: -2 },
      { name: 'mode', label: 'Chế độ Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { u1, u2, u3, m1, m2, m3 } = params;
      const su = u1 * u1 + u2 * u2 + u3 * u3;
      const sm = m1 * m1 + m2 * m2 + m3 * m3;
      if (su === 0 || sm === 0) return { valid: false, reason: 'Vectơ phải khác vectơ-không' };
      const dot = u1 * m1 + u2 * m2 + u3 * m3;
      if (dot === 0 || dot * dot === su * sm) return { valid: false, reason: 'Cần hai vectơ không vuông góc và không cùng phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, m1, m2, m3, c1, c2, mode } = params;
      const dx = u1 - m1, dy = u2 - m2, dz = u3 - m3;
      const lx = c1 * u1 + c2 * m1, ly = c1 * u2 + c2 * m2, lz = c1 * u3 + c2 * m3;
      const su = u1 * u1 + u2 * u2 + u3 * u3;
      const sm = m1 * m1 + m2 * m2 + m3 * m3;
      const dot = u1 * m1 + u2 * m2 + u3 * m3;
      const factorSq = (n) => {
        let k = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { k = i; r = n / (i * i); break; }
        }
        return { k, r, tex: r === 1 ? '' + k : (k === 1 ? '' : k) + '\\sqrt{' + r + '}' };
      };
      const cosLatex = (d, a, b, scaleDen) => {
        const { k, r } = factorSq(a * b);
        if (r === 1) return u.simplifyFrac(d, k * scaleDen).latex;
        const fr = u.simplifyFrac(d, k * r * scaleDen);
        const absN = Math.abs(fr.num);
        const top = (absN === 1 ? '' : absN) + '\\sqrt{' + r + '}';
        const sign = fr.num < 0 ? '-' : '';
        return fr.den === 1 ? sign + top : sign + '\\frac{' + top + '}{' + fr.den + '}';
      };
      const fm = factorSq(sm);
      const fu = factorSq(su);
      const exactCos = cosLatex(dot, su, sm, 1);
      const wrongCos = cosLatex(dot, su, sm, 3);
      const aTrue = mode === 1 || mode === 3;
      const bTrue = mode === 2;
      const cTrue = mode === 3;
      const dTrue = mode === 1;
      const exprLin = c1 + '\\overrightarrow{u} - ' + Math.abs(c2) + '\\overrightarrow{m}';
      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{u} - \\overrightarrow{m} = ' + (aTrue ? u.formatCoord3D(dx, dy, dz) : u.formatCoord3D(dx + 1, dy, dz)) + '$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: '$' + exprLin + ' = ' + (bTrue ? u.formatCoord3D(lx, ly, lz) : u.formatCoord3D(lx, ly + 2, lz)) + '$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: '$|\\overrightarrow{m}| = ' + (cTrue ? fm.tex : '\\sqrt{' + (sm + 1) + '}') + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: '$\\cos(\\overrightarrow{u};\\overrightarrow{m}) = ' + (dTrue ? exactCos : wrongCos) + '$.',
          isTrue: dTrue,
        },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai vectơ $\\overrightarrow{u} = ' +
          u.formatCoord3D(u1, u2, u3) +
          ',\\; \\overrightarrow{m} = ' +
          u.formatCoord3D(m1, m2, m3) +
          '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\overrightarrow{u} - \\overrightarrow{m} = ' + u.formatCoord3D(dx, dy, dz) + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $' + exprLin + ' = ' + u.formatCoord3D(lx, ly, lz) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $|\\overrightarrow{m}| = \\sqrt{' + sm + '} = ' + fm.tex + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\cos(\\overrightarrow{u};\\overrightarrow{m}) = \\dfrac{' + dot + '}{' + fu.tex + '\\cdot ' + fm.tex + '} = ' + exactCos + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai vectơ vuông góc', params: { u1: 1, u2: 1, u3: 0, m1: 1, m2: -1, m3: 1, c1: -3, c2: -4, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 u(1;3;-4), m(1;0;-7)', params: { u1: 1, u2: 3, u3: -4, m1: 1, m2: 0, m3: -7, c1: -3, c2: -4, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 32 (Q32): Tháp kiểm soát không lưu & ra đa (có hình atc_radar_tower_3d)
  t12_b8_d32_atc_radar_tf: {
    id: 't12_b8_d32_atc_radar_tf',
    name: 'Bài toán thực tế tháp điều khiển không lưu và phạm vi quét của ra đa',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng hệ trục Oxyz và khoảng cách',
    description: 'Tháp không lưu cao h mét, ra đa tầm R km. Máy bay ở C cách mặt đất zC, phía đông xE, phía bắc yN. Xét tọa độ và tầm phát hiện.',
    conditionSummary: 'xE, yN, zC, h > 0 và khoảng cách máy bay tới ra đa không nằm sát biên làm tròn hoặc bằng R',
    paramSpecs: [
      { name: 'h', label: 'Chiều cao tháp (m)', min: 35, max: 85 },
      { name: 'R', label: 'Phạm vi ra đa (km)', min: 180, max: 350 },
      { name: 'zC', label: 'Độ cao máy bay (km)', min: 10, max: 22 },
      { name: 'xE', label: 'Cách về phía Đông (km)', min: 70, max: 160 },
      { name: 'yN', label: 'Cách về phía Bắc (km)', min: 120, max: 240 },
      { name: 'mode', label: 'Chế độ Đ/S (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { h, R, zC, xE, yN } = params;
      if (h <= 0 || R <= 0 || zC <= 1 || xE <= 0 || yN <= 0) {
        return { valid: false, reason: 'Các kích thước phải dương' };
      }
      const d = Math.sqrt(xE * xE + yN * yN + Math.pow(zC - h / 1000, 2));
      if (Math.abs(d * 100 - Math.floor(d * 100) - 0.5) < 0.03) {
        return { valid: false, reason: 'Khoảng cách sát ranh giới làm tròn hàng phần trăm' };
      }
      if (Math.abs(d - R) < 3) {
        return { valid: false, reason: 'Khoảng cách quá sát bán kính ra đa R' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h, R, zC, xE, yN, mode } = params;
      const hKm = h / 1000;
      const hKmVN = hKm.toFixed(3).replace('.', ',');
      const d = Math.sqrt(xE * xE + yN * yN + Math.pow(zC - hKm, 2));
      const dRound = Number(d.toFixed(2));
      const dVN = dRound.toFixed(2).replace('.', ',');
      const inRange = dRound <= R;
      const aTrue = mode === 1;
      const tfStatements = [
        {
          key: 'a',
          text: 'Vị trí $C$ có tọa độ $' + (aTrue ? u.formatCoord3D(-xE, -yN, zC) : u.formatCoord3D(xE, yN, zC)) + '$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Vị trí của ra đa có tọa độ là $(0;\\, 0;\\, ' + hKmVN + ')$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Khoảng cách từ máy bay đến ra đa xấp xỉ bằng $' + dVN + '$ km (kết quả làm tròn đến hàng phần trăm).',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Ra đa của trung tâm kiểm soát không lưu phát hiện được máy bay tại vị trí $C$.',
          isTrue: inRange,
        },
      ];
      return {
        stem:
          'Một tháp trung tâm kiểm soát không lưu ở sân bay cao $' +
          h +
          '$ m sử dụng ra đa có phạm vi theo dõi $' +
          R +
          '$ km được đặt trên đỉnh tháp. Chọn hệ trục tọa độ $Oxyz$ có gốc $O$ trùng với vị trí chân tháp, mặt phẳng $(Oxy)$ trùng với mặt đất sao cho trục $Ox$ hướng về phía tây, trục $Oy$ hướng về phía nam, trục $Oz$ hướng thẳng đứng lên phía trên (hình bên, đơn vị trên mỗi trục tính theo kilômét). Một máy bay tại vị trí $C$ cách mặt đất $' +
          zC +
          '\\text{ km}$, cách $' +
          xE +
          '\\text{ km}$ về phía đông và $' +
          yN +
          '\\text{ km}$ về phía bắc so với tháp trung tâm kiểm soát không lưu. Xét tính đúng-sai của các khẳng định sau:',
        diagram: { kind: 'geometry_figure', figureType: 'atc_radar_tower_3d', params: { h, R } },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Vì $C$ nằm về phía đông ($x < 0$) và phía bắc ($y < 0$) nên $C' + u.formatCoord3D(-xE, -yN, zC) + '$.',
          'b) Đúng. Đổi $' + h + '\\text{ m} = ' + hKmVN + '\\text{ km}$, vị trí ra đa là $G(0;\\, 0;\\, ' + hKmVN + ')$.',
          'c) Đúng. Khoảng cách $CG = \\sqrt{(-' + xE + ')^2 + (-' + yN + ')^2 + (' + zC + ' - ' + hKmVN + ')^2} \\approx ' + dVN + '\\text{ km}$.',
          'd) ' + (inRange ? 'Đúng.' : 'Sai.') + ' Vì $' + dVN + (inRange ? ' < ' : ' > ') + R + '$ nên ra đa ' + (inRange ? 'phát hiện được' : 'không phát hiện được') + ' máy bay.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao <= 0', params: { h: 0, R: 271, zC: 17, xE: 105, yN: 208, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 h=54, R=271, C(-105;-208;17)', params: { h: 54, R: 271, zC: 17, xE: 105, yN: 208, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 33 (Q33): Hai khinh khí cầu bay lên từ một địa điểm
  t12_b8_d33_two_balloons_tf: {
    id: 't12_b8_d33_two_balloons_tf',
    name: 'Bài toán thực tế xác định tọa độ và khoảng cách hai khinh khí cầu',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Ứng dụng hệ trục Oxyz và khoảng cách',
    description: 'Hai khinh khí cầu bay lên từ điểm O theo các hướng Nam/Đông và Bắc/Tây. Xác định tọa độ và khoảng cách giữa chúng.',
    conditionSummary: 'Các khoảng cách dương và kết quả không gần ranh giới làm tròn hàng phần mười',
    paramSpecs: [
      { name: 'x1t', label: '10·x₁ (Nam, km)', min: 8, max: 30 },
      { name: 'y1t', label: '10·y₁ (Đông, km)', min: 8, max: 30 },
      { name: 'z1t', label: '10·z₁ (Cao, km)', min: 4, max: 20 },
      { name: 'x2t', label: '10·x₂ (Bắc, km)', min: 10, max: 30 },
      { name: 'y2t', label: '10·y₂ (Tây, km)', min: 8, max: 25 },
      { name: 'z2t', label: '10·z₂ (Cao, km)', min: 5, max: 25 },
    ],
    validateCode: `
      const { x1t, y1t, z1t, x2t, y2t, z2t } = params;
      if (x1t <= 0 || y1t <= 0 || z1t <= 0 || x2t <= 0 || y2t <= 0 || z2t <= 0) {
        return { valid: false, reason: 'Các khoảng cách phải dương' };
      }
      const ob = Math.sqrt(x2t * x2t + y2t * y2t + z2t * z2t) / 10;
      const ab = Math.sqrt(Math.pow(x1t + x2t, 2) + Math.pow(y1t + y2t, 2) + Math.pow(z1t - z2t, 2)) / 10;
      if (
        Math.abs(ob * 10 - Math.floor(ob * 10) - 0.5) < 0.03 ||
        Math.abs(ab * 10 - Math.floor(ab * 10) - 0.5) < 0.03
      ) {
        return { valid: false, reason: 'Khoảng cách gần ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1t, y1t, z1t, x2t, y2t, z2t } = params;
      const fmtDec = (t) => {
        const v = t / 10;
        return Number.isInteger(v) ? '' + v : v.toFixed(1).replace('.', ',');
      };
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');
      const ob = Math.sqrt(x2t * x2t + y2t * y2t + z2t * z2t) / 10;
      const ab = Math.sqrt(Math.pow(x1t + x2t, 2) + Math.pow(y1t + y2t, 2) + Math.pow(z1t - z2t, 2)) / 10;
      const obR = Number(ob.toFixed(1));
      const abR = Number(ab.toFixed(1));
      const abWrong = Number((abR + 0.2).toFixed(1));
      const tfStatements = [
        {
          key: 'a',
          text: 'Tọa độ khinh khí cầu thứ nhất là $(' + fmtDec(x1t) + ';\\, ' + fmtDec(y1t) + ';\\, ' + fmtDec(z1t) + ')$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Tọa độ khinh khí cầu thứ hai là $(' + fmtDec(x2t) + ';\\, -' + fmtDec(y2t) + ';\\, ' + fmtDec(z2t) + ')$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Khoảng cách từ điểm xuất phát đến khinh khí cầu thứ hai bằng $' + fmt1(obR) + '$ km.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Khoảng cách hai chiếc khinh khí cầu là $' + fmt1(abWrong) + '$ km.',
          isTrue: false,
        },
      ];
      return {
        stem:
          'Hai chiếc khinh khí cầu bay lên từ cùng một địa điểm. Chiếc thứ nhất cách điểm xuất phát $' +
          fmtDec(x1t) +
          '$ km về phía nam và $' +
          fmtDec(y1t) +
          '$ km về phía đông, đồng thời cách mặt đất $' +
          fmtDec(z1t) +
          '$ km. Chiếc thứ hai nằm cách điểm xuất phát $' +
          fmtDec(x2t) +
          '$ km về phía bắc và $' +
          fmtDec(y2t) +
          '$ km về phía tây, đồng thời cách mặt đất $' +
          fmtDec(z2t) +
          '$ km. Chọn hệ trục $Oxyz$ với gốc $O$ đặt tại điểm xuất phát, $(Oxy)$ trùng với mặt đất, trục $Ox$ hướng về phía nam, trục $Oy$ hướng về phía đông và trục $Oz$ hướng thẳng đứng lên trời, đơn vị đo lấy theo kilômét. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: 'a) Đúng, b) Sai, c) Đúng, d) Sai',
        solutionSteps: [
          'a) Đúng. Chiếc thứ nhất ở vị trí $A(' + fmtDec(x1t) + ';\\, ' + fmtDec(y1t) + ';\\, ' + fmtDec(z1t) + ')$.',
          'b) Sai. Chiếc thứ hai ở phía bắc ($x < 0$) và phía tây ($y < 0$) nên $B(-' + fmtDec(x2t) + ';\\, -' + fmtDec(y2t) + ';\\, ' + fmtDec(z2t) + ')$.',
          'c) Đúng. $OB = \\sqrt{(-' + fmtDec(x2t) + ')^2 + (-' + fmtDec(y2t) + ')^2 + ' + fmtDec(z2t) + '^2} \\approx ' + fmt1(obR) + '$ km.',
          'd) Sai. Khoảng cách giữa hai khinh khí cầu là $AB = \\sqrt{(' + fmtDec(x1t) + ' + ' + fmtDec(x2t) + ')^2 + (' + fmtDec(y1t) + ' + ' + fmtDec(y2t) + ')^2 + (' + fmtDec(z1t) + ' - ' + fmtDec(z2t) + ')^2} \\approx ' + fmt1(abR) + '$ km.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên khoảng cách = 0', params: { x1t: 0, y1t: 17, z1t: 6, x2t: 20, y2t: 12, z2t: 19 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 OB=3,0 và AB=4,5', params: { x1t: 12, y1t: 17, z1t: 6, x2t: 20, y2t: 12, z2t: 19 }, expectedValid: true },
    ],
  },

  // Dạng 34 (Q34): Bốn điểm trên lưới Oxyz và bán kính đáy hình nón (có hình grid_points_cone_3d)
  t12_b8_d34_grid_points_cone_tf: {
    id: 't12_b8_d34_grid_points_cone_tf',
    name: 'Đọc tọa độ điểm trên lưới Oxyz, tính góc và bán kính hình nón ngoại tiếp',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đọc tọa độ trên lưới và ứng dụng hình nón',
    description: 'Cho 4 điểm S, A, B, C trên lưới Oxyz với SA, SB, SC đôi một vuông góc và SB = SC = b > SA = a. Xét tọa độ, tích vô hướng, góc và bán kính hình nón.',
    conditionSummary: '1 <= x0, y0, z0 <= 3; 1 <= a < b; b ∈ {3, 6}',
    paramSpecs: [
      { name: 'x0', label: 'x_S', min: 1, max: 2 },
      { name: 'y0', label: 'y_S', min: 1, max: 3 },
      { name: 'z0', label: 'z_S', min: 2, max: 4 },
      { name: 'a', label: 'SA = a', min: 1, max: 3 },
      { name: 'b', label: 'SB = SC = b', min: 3, max: 6, step: 3 },
    ],
    validateCode: `
      const { x0, y0, z0, a, b } = params;
      if (x0 <= 0 || y0 <= 0 || z0 <= 0 || a <= 0 || b <= a) {
        return { valid: false, reason: 'Cần x0, y0, z0 > 0 và 0 < a < b' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, a, b } = params;
      const xA = x0 + a, yB = y0 + b, zC = z0 + b;
      const scDotBc = b * b;
      const wrongDot = b * b - b;
      const abSq = a * a + b * b;
      const cosBac = u.simplifyFrac(a * a, abSq);
      const mult3 = b % 3 === 0 ? b / 3 : 0;
      const rLatex = mult3 === 1 ? '\\sqrt{6}' : mult3 > 1 ? mult3 + '\\sqrt{6}' : u.simplifyFrac(b, 3).latex + '\\sqrt{6}';
      const tfStatements = [
        {
          key: 'a',
          text: 'Tọa độ điểm $A, B$ lần lượt là $' + u.formatCoord3D(xA, y0, z0) + '$ và $' + u.formatCoord3D(x0, yB, z0) + '$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: '$\\overrightarrow{SC}\\cdot\\overrightarrow{BC} = ' + wrongDot + '$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: '$\\cos\\widehat{BAC} = ' + cosBac.latex + '$.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Xét hình nón $(\\mathcal{N})$ có đỉnh $S$, điểm $A$ thuộc đường sinh và hai điểm $B, C$ thuộc đường tròn đáy của $(\\mathcal{N})$. Bán kính đáy hình nón bằng $' + rLatex + '$.',
          isTrue: true,
        },
      ];
      return {
        stem: 'Trong không gian $Oxyz$, cho bốn điểm $S, A, B, C$ như hình vẽ bên (mỗi ô lưới là $1$ đơn vị). Xét tính đúng-sai của các khẳng định sau.',
        diagram: { kind: 'geometry_figure', figureType: 'grid_points_cone_3d', params: { x0, y0, z0, a, b } },
        tfStatements,
        answerSummary: 'a) Đúng, b) Sai, c) Đúng, d) Đúng',
        solutionSteps: [
          'a) Đúng. Từ hình vẽ: $S' + u.formatCoord3D(x0, y0, z0) + ',\\; A' + u.formatCoord3D(xA, y0, z0) + ',\\; B' + u.formatCoord3D(x0, yB, z0) + ',\\; C' + u.formatCoord3D(x0, y0, zC) + '$.',
          'b) Sai. $\\overrightarrow{SC} = (0;\\, 0;\\, ' + b + ')$, $\\overrightarrow{BC} = (0;\\, -' + b + ';\\, ' + b + ') \\Rightarrow \\overrightarrow{SC}\\cdot\\overrightarrow{BC} = ' + scDotBc + '$.',
          'c) Đúng. $\\overrightarrow{AB} = (-' + a + ';\\, ' + b + ';\\, 0)$, $\\overrightarrow{AC} = (-' + a + ';\\, 0;\\, ' + b + ') \\Rightarrow \\cos\\widehat{BAC} = \\dfrac{' + a * a + '}{' + abSq + '} = ' + cosBac.latex + '$.',
          'd) Đúng. Kéo dài $SA$ đến $A_1$ sao cho $SA_1 = ' + b + '$. Khi đó $(\\mathcal{N})$ ngoại tiếp chóp tam giác đều $S.A_1BC$ có cạnh đáy $BC = ' + b + '\\sqrt{2}$, nên $r = \\dfrac{BC}{\\sqrt{3}} = ' + rLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { x0: 1, y0: 2, z0: 3, a: 4, b: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 S(1;2;3), a=2, b=3', params: { x0: 1, y0: 2, z0: 3, a: 2, b: 3 }, expectedValid: true },
    ],
  },

  // Dạng 35 (Q35): Hình hộp chữ nhật OABC.O'A'B'C' (có hình cuboid_OABC_3d)
  t12_b8_d35_cuboid_OABC_tf: {
    id: 't12_b8_d35_cuboid_OABC_tf',
    name: "Phân tích tọa độ đỉnh, đường chéo và góc hai vectơ trên hình hộp OABC.O'A'B'C'",
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Tọa độ điểm và góc trên hình hộp chữ nhật',
    description: "Cho hình hộp chữ nhật OABC.O'A'B'C' biết B'(a; b; c). Xét tọa độ B, độ dài OB', vectơ AC' và góc giữa A'C với C'B.",
    conditionSummary: 'a, b, c > 0 và góc không gần biên làm tròn độ',
    paramSpecs: [
      { name: 'a', label: 'Chiều dài OA = a', min: 2, max: 6 },
      { name: 'b', label: 'Chiều rộng OC = b', min: 1, max: 5 },
      { name: 'c', label: 'Chiều cao OO_1 = c', min: 3, max: 9 },
      { name: 'mode', label: 'Chế độ Đ/S (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a <= 0 || b <= 0 || c <= 0) return { valid: false, reason: 'Cạnh phải dương' };
      const dot = -a * a + c * c;
      const n1 = Math.sqrt(a * a + b * b + c * c);
      const n2 = Math.sqrt(a * a + c * c);
      const deg = (Math.acos(dot / (n1 * n2)) * 180) / Math.PI;
      if (Math.abs(deg - Math.floor(deg) - 0.5) < 0.04) {
        return { valid: false, reason: 'Góc quá gần ranh giới làm tròn hàng đơn vị' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, mode } = params;
      const sumSq = a * a + b * b + c * c;
      const s2 = a * a + c * c;
      const dot = c * c - a * a;
      const deg = Math.round((Math.acos(dot / Math.sqrt(sumSq * s2)) * 180) / Math.PI);
      const sqrtSimp = (n) => {
        let k = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { k = i; r = n / (i * i); break; }
        }
        return r === 1 ? '' + k : (k === 1 ? '' : k) + '\\sqrt{' + r + '}';
      };
      const ob1 = sqrtSimp(sumSq);
      const cTrue = mode !== 1;
      const dTrue = mode !== 2;
      const tfStatements = [
        { key: 'a', text: 'Tọa độ điểm $B$ là $' + u.formatCoord3D(a, b, 0) + '$.', isTrue: true },
        { key: 'b', text: "Độ dài đường chéo $OB'$ bằng $" + ob1 + '$.', isTrue: true },
        {
          key: 'c',
          text: "Tọa độ vectơ $\\overrightarrow{AC'}$ là $" + (cTrue ? u.formatCoord3D(-a, b, c) : u.formatCoord3D(a, -b, c)) + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: "Góc giữa hai vectơ $\\overrightarrow{A'C}$ và $\\overrightarrow{C'B}$ khi làm tròn đến đơn vị độ bằng $" + (dTrue ? deg : deg + 11) + '^\\circ$.',
          isTrue: dTrue,
        },
      ];
      return {
        stem:
          "Trong không gian $Oxyz$, cho hình hộp chữ nhật $OABC.O'A'B'C'$ như hình bên. Biết tọa độ điểm $B'" +
          u.formatCoord3D(a, b, c) +
          '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: { kind: 'geometry_figure', figureType: 'cuboid_OABC_3d', params: { a, b, c } },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) Đúng. Hình chiếu của $B\'' + u.formatCoord3D(a, b, c) + '$ lên $(Oxy)$ là $B' + u.formatCoord3D(a, b, 0) + '$.',
          'b) Đúng. $OB\' = \\sqrt{' + a + '^2 + ' + b + '^2 + ' + c + '^2} = ' + ob1 + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $A(' + a + ';0;0),\\; C\'(0;' + b + ';' + c + ') \\Rightarrow \\overrightarrow{AC\'} = ' + u.formatCoord3D(-a, b, c) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\overrightarrow{A\'C} = ' + u.formatCoord3D(-a, b, -c) + '$, $\\overrightarrow{C\'B} = ' + u.formatCoord3D(a, 0, -c) + ' \\Rightarrow \\cos(\\overrightarrow{A\'C};\\overrightarrow{C\'B}) = \\dfrac{' + dot + '}{\\sqrt{' + sumSq + '}\\cdot\\sqrt{' + s2 + '}}$, suy ra góc xấp xỉ $' + deg + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh a = 0', params: { a: 0, b: 1, c: 7, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 B\'(3;1;7)', params: { a: 3, b: 1, c: 7, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 36 (Q36): Trực thăng bay thẳng & khoảng cách nhỏ nhất tới hòn đảo
  t12_b8_d36_helicopter_min_dist_tf: {
    id: 't12_b8_d36_helicopter_min_dist_tf',
    name: 'Bài toán chuyển động thẳng của trực thăng và khoảng cách nhỏ nhất đến đảo',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Chuyển động thẳng trong không gian Oxyz',
    description: 'Trực thăng cất cánh từ G trên mặt đất, vị trí u(x0 + vx*t; y0 + vy*t; vz*t). Tìm vị trí M gần đảo D nhất và giá trị K(x0+y0+z0).',
    conditionSummary: 'vx, vy, vz > 0 và t_min > 0',
    paramSpecs: [
      { name: 'x0', label: 'x_G', min: -5, max: 3 },
      { name: 'y0', label: 'y_G', min: -5, max: 3 },
      { name: 'vx', label: 'v_x', min: 1, max: 4 },
      { name: 'vy', label: 'v_y', min: 1, max: 4 },
      { name: 'vz', label: 'v_z', min: 1, max: 4 },
      { name: 'xD', label: 'x_D', min: 40, max: 110 },
      { name: 'yD', label: 'y_D', min: 40, max: 110 },
    ],
    validateCode: `
      const { x0, y0, vx, vy, vz, xD, yD } = params;
      if (vx <= 0 || vy <= 0 || vz <= 0) return { valid: false, reason: 'Các thành phần vận tốc phải dương' };
      const num = vx * (xD - x0) + vy * (yD - y0);
      if (num <= 0) return { valid: false, reason: 'Thời điểm t_min phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, vx, vy, vz, xD, yD } = params;
      const dx = xD - x0, dy = yD - y0;
      const denT = vx * vx + vy * vy + vz * vz;
      const numT = vx * dx + vy * dy;
      const tFrac = u.simplifyFrac(numT, denT);
      const sumFrac = u.simplifyFrac((x0 + y0) * denT + (vx + vy + vz) * numT, denT);
      const K = 20;
      const ansTrue = u.simplifyFrac(K * sumFrac.num, sumFrac.den);
      const ansWrong = u.simplifyFrac(K * sumFrac.num + 2 * sumFrac.den, sumFrac.den);
      const lin = (c0, v) => c0 + (v >= 0 ? ' + ' + (v === 1 ? '' : v) + 't' : ' - ' + Math.abs(v) + 't');
      const linNeg = (c0, v) => c0 + ' - ' + (v === 1 ? '' : v) + 't';
      const uExpr = '(' + lin(x0, vx) + ';\\, ' + lin(y0, vy) + ';\\, ' + (vz === 1 ? '' : vz) + 't)';
      const mdExpr = '(' + linNeg(dx, vx) + ';\\, ' + linNeg(dy, vy) + ';\\, -' + (vz === 1 ? '' : vz) + 't)';
      const tfStatements = [
        {
          key: 'a',
          text: 'Tọa độ điểm $M$ tại thời điểm $t$ phút sau khi máy bay $H$ cất cánh là $M' + uExpr + '$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Tọa độ điểm $G$ là $' + u.formatCoord3D(x0, y0, vz) + '$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Tọa độ của vectơ $\\overrightarrow{MD}$ là $' + mdExpr + '$.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Khoảng cách từ máy bay đến $D$ nhỏ nhất khi máy bay ở vị trí $M(x_0;y_0;z_0)$. Khi đó $' + K + '(x_0 + y_0 + z_0) = ' + ansWrong.latex + '$.',
          isTrue: false,
        },
      ];
      return {
        stem:
          'Cho một chiếc trực thăng $H$ cất cánh từ sân bay. Xét hệ trục tọa độ $Oxyz$, trong đó $Ox$ là hướng Đông, $Oy$ là hướng Bắc và $Oz$ là trục thẳng đứng, đơn vị trên mỗi trục là kilômét. Trực thăng cất cánh từ điểm $G$ trên mặt đất. Vectơ $\\overrightarrow{u}$ chỉ vị trí của trực thăng tại thời điểm $t$ phút sau khi cất cánh ($t \\ge 0$) có tọa độ là $\\overrightarrow{u} = ' +
          uExpr +
          '$. Một hòn đảo ở vị trí $D(' +
          xD +
          ';\\, ' +
          yD +
          ';\\, 0)$. Gọi $M$ là vị trí của máy bay $H$ tại thời điểm $t$ phút sau khi cất cánh. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a) Đúng, b) Sai, c) Đúng, d) Sai',
        solutionSteps: [
          'a) Đúng. $\\overrightarrow{OM} = \\overrightarrow{u} \\Rightarrow M' + uExpr + '$.',
          'b) Sai. Lúc cất cánh $t = 0 \\Rightarrow G' + u.formatCoord3D(x0, y0, 0) + '$.',
          'c) Đúng. $\\overrightarrow{MD} = ' + mdExpr + '$.',
          'd) Sai. Đường thẳng bay có vectơ chỉ phương $\\overrightarrow{v} = ' + u.formatCoord3D(vx, vy, vz) + '$. Khoảng cách $MD$ nhỏ nhất khi $\\overrightarrow{v}\\cdot\\overrightarrow{MD} = 0 \\Leftrightarrow t = ' + tFrac.latex + '$. Khi đó $' + K + '(x_0 + y_0 + z_0) = ' + ansTrue.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vz = 0', params: { x0: -2, y0: -3, vx: 1, vy: 3, vz: 0, xD: 97, yD: 89 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 t=375/19, K=20 -> 50600/19', params: { x0: -2, y0: -3, vx: 1, vy: 3, vz: 3, xD: 97, yD: 89 }, expectedValid: true },
    ],
  },

  // Dạng 37 (Q37): Hai drone nông trường & tổng khoảng cách ngắn nhất tới trạm tiếp sóng (có hình two_drones_3d)
  t12_b8_d37_two_drones_tf: {
    id: 't12_b8_d37_two_drones_tf',
    name: 'Bài toán hai drone phun thuốc và vị trí đặt trạm tiếp sóng tối ưu trên mặt đất',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Cực trị khoảng cách và điểm đối xứng qua (Oxy)',
    description: 'Hai drone ở độ cao zA, zB phía Nam/Tây và Nam/Đông. Tìm điểm đối xứng A\', giao điểm M của A\'B với (Oxy) và tổng khoảng cách nhỏ nhất.',
    conditionSummary: 'xA, yAw, zA, xB, yB, zB > 0; độ dài A\'B không gần ranh giới làm tròn hàng phần mười',
    paramSpecs: [
      { name: 'xA', label: 'Nam drone 1 (x_A)', min: 4, max: 10 },
      { name: 'yAw', label: 'Tây drone 1 (|y_A|)', min: 4, max: 10 },
      { name: 's', label: 'Hệ số chiều cao s', min: 1, max: 3 },
      { name: 'kNum', label: 'Tỷ số chiều cao z_A/s', min: 2, max: 3 },
      { name: 'kDen', label: 'Tổng (z_A+z_B)/s', min: 4, max: 5 },
      { name: 'dxStep', label: 'Bước Δx/(kDen)', min: -2, max: 2, allowZero: false },
      { name: 'dyStep', label: 'Bước Δy/(kDen)', min: 2, max: 4 },
      { name: 'mode', label: 'Chế độ Đ/S (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { xA, yAw, s, kNum, kDen, dxStep, dyStep } = params;
      if (kNum >= kDen || dxStep === 0 || dyStep <= 0) {
        return { valid: false, reason: 'Cần kNum < kDen và bước dịch chuyển hợp lệ' };
      }
      const xB = xA + kDen * dxStep;
      const yB = -yAw + kDen * dyStep;
      if (xB <= 0 || yB <= 0) return { valid: false, reason: 'Drone 2 cần nằm ở phía Nam và Đông' };
      const zA = kNum * s;
      const zB = (kDen - kNum) * s;
      const d = Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB + yAw, 2) + Math.pow(zA + zB, 2));
      if (Math.abs(d * 10 - Math.floor(d * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Độ dài gần ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yAw, s, kNum, kDen, dxStep, dyStep, mode } = params;
      const yA = -yAw;
      const zA = kNum * s;
      const zB = (kDen - kNum) * s;
      const xB = xA + kDen * dxStep;
      const yB = yA + kDen * dyStep;
      const xM = xA + kNum * dxStep;
      const yM = yA + kNum * dyStep;
      const ab2 = Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2) + Math.pow(zA + zB, 2);
      const abMin = Number(Math.sqrt(ab2).toFixed(1));
      const abWrong = Number((abMin + 1.4).toFixed(1));
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');
      const kFrac = u.simplifyFrac(kNum, kDen);
      const cTrue = mode === 0;
      const dTrue = mode === 0;
      const tfStatements = [
        {
          key: 'a',
          text: 'Tọa độ của chiếc drone thứ nhất là $A' + u.formatCoord3D(xA, yA, zA) + '$ và chiếc drone thứ hai là $B' + u.formatCoord3D(xB, yB, zB) + '$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: "Điểm đối xứng của $A$ qua mặt phẳng tọa độ $(Oxy)$ là $A'" + u.formatCoord3D(xA, yA, -zA) + '$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: "Tọa độ điểm $M$ thuộc mặt phẳng $(Oxy)$ sao cho $M, A', B$ thẳng hàng là $M" + (cTrue ? u.formatCoord3D(xM, yM, 0) : u.formatCoord3D(xM + 2, yM - 1, 0)) + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Trên mặt đất, người ta đặt một trạm tiếp sóng sao cho tổng khoảng cách từ trạm đó đến hai chiếc drone là ngắn nhất. Tổng khoảng cách ngắn nhất đó bằng khoảng $' + fmt1(dTrue ? abMin : abWrong) + '$ m (làm tròn kết quả đến hàng phần mười).',
          isTrue: dTrue,
        },
      ];
      return {
        stem:
          'Tại một nông trường trồng bưởi, hai thiết bị bay không người lái (drone) cùng xuất phát từ một trạm điều khiển trên mặt đất để phun thuốc bảo vệ thực vật. Sau một thời gian, chiếc drone thứ nhất ở độ cao $' +
          zA +
          '$ m so với mặt đất, cách điểm xuất phát $' +
          xA +
          '$ m về phía Nam và $' +
          yAw +
          '$ m về phía Tây. Chiếc drone thứ hai ở độ cao $' +
          zB +
          '$ m so với mặt đất, cách điểm xuất phát $' +
          xB +
          '$ m về phía Nam và $' +
          yB +
          '$ m về phía Đông. Chọn hệ trục tọa độ $Oxyz$ với gốc $O$ đặt tại điểm xuất phát, mặt phẳng $(Oxy)$ trùng với mặt đất, trục $Ox$ hướng về phía Nam, trục $Oy$ hướng về phía Đông và trục $Oz$ hướng thẳng đứng lên trời, đơn vị đo lấy theo mét. Xét tính đúng-sai của các khẳng định sau:',
        diagram: { kind: 'geometry_figure', figureType: 'two_drones_3d', params: { xA, yA, xB, yB } },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) Đúng. $A' + u.formatCoord3D(xA, yA, zA) + '$ và $B' + u.formatCoord3D(xB, yB, zB) + '$.',
          'b) Đúng. Điểm đối xứng của $A$ qua $(Oxy)$ là $A\'' + u.formatCoord3D(xA, yA, -zA) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' Từ $\\overrightarrow{A\'M} = k\\overrightarrow{A\'B}$ với $z_M = 0 \\Rightarrow k = ' + kFrac.latex + ' \\Rightarrow M' + u.formatCoord3D(xM, yM, 0) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Tổng khoảng cách nhỏ nhất là $A\'B = \\sqrt{' + ab2 + '} \\approx ' + fmt1(abMin) + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tỷ số không hợp lệ kNum >= kDen', params: { xA: 7, yAw: 8, s: 2, kNum: 5, kDen: 5, dxStep: -1, dyStep: 3, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37 A(7;-8;6), B(2;7;4)', params: { xA: 7, yAw: 8, s: 2, kNum: 3, kDen: 5, dxStep: -1, dyStep: 3, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 38 (Q38): Tam giác vuông NEA và bán kính đường tròn ngoại tiếp
  t12_b8_d38_right_triangle_circumradius_tf: {
    id: 't12_b8_d38_right_triangle_circumradius_tf',
    name: 'Tổng hợp độ dài, tổ hợp vectơ và bán kính đường tròn ngoại tiếp tam giác NEA vuông tại N',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Tam giác vuông trong không gian Oxyz',
    description: 'Cho N, E, A tạo thành tam giác vuông tại N. Xét NE, 3NE + 2NA, phương trình vectơ u và bán kính đường tròn ngoại tiếp.',
    conditionSummary: 'NE và NA khác vectơ-không và vuông góc nhau',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -5, max: 5 },
      { name: 'yN', label: 'y_N', min: -4, max: 7 },
      { name: 'zN', label: 'z_N', min: -6, max: 4 },
      { name: 'a', label: 'NA_x', min: -3, max: 3, allowZero: false },
      { name: 'b', label: 'NA_y', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'NA_z', min: -4, max: 4, allowZero: false },
      { name: 'p', label: 'Tham số trực giao p', min: -4, max: 5, allowZero: false },
      { name: 'q', label: 'Tham số trực giao q', min: -5, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, p, q } = params;
      if (a === 0 || b === 0 || c === 0 || p === 0 || q === 0) return { valid: false, reason: 'Tham số khác 0' };
      const neX = -p * c - q * b, neY = q * a, neZ = p * a;
      if (neX === 0 && neY === 0 && neZ === 0) return { valid: false, reason: 'NE phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN, a, b, c, p, q } = params;
      const naX = a, naY = b, naZ = c;
      const neX = -p * c - q * b, neY = q * a, neZ = p * a;
      const xE = xN + neX, yE = yN + neY, zE = zN + neZ;
      const xA = xN + naX, yA = yN + naY, zA = zN + naZ;
      const eaX = xA - xE, eaY = yA - yE, eaZ = zA - zE;
      const neSq = neX * neX + neY * neY + neZ * neZ;
      const eaSq = eaX * eaX + eaY * eaY + eaZ * eaZ;
      const sqrtSimp = (n) => {
        let k = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { k = i; r = n / (i * i); break; }
        }
        return r === 1 ? '' + k : (k === 1 ? '' : k) + '\\sqrt{' + r + '}';
      };
      const halfSqrt = (n) => {
        let k = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { k = i; r = n / (i * i); break; }
        }
        if (r === 1) return u.simplifyFrac(k, 2).latex;
        const fr = u.simplifyFrac(k, 2);
        const top = (fr.num === 1 ? '' : fr.num) + '\\sqrt{' + r + '}';
        return fr.den === 1 ? top : '\\frac{' + top + '}{' + fr.den + '}';
      };
      const combX = 3 * neX + 2 * naX, combY = 3 * neY + 2 * naY, combZ = 3 * neZ + 2 * naZ;
      // -2 NE - NA - 2 u = -2 EA => u = -(2 NE + NA - 2 EA)/2
      const ux = u.simplifyFrac(-(2 * neX + naX - 2 * eaX), 2);
      const uy = u.simplifyFrac(-(2 * neY + naY - 2 * eaY), 2);
      const uz = u.simplifyFrac(-(2 * neZ + naZ - 2 * eaZ), 2);
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const rTex = halfSqrt(eaSq);
      const tfStatements = [
        { key: 'a', text: 'Độ dài đoạn thẳng $NE$ bằng $' + sqrtSimp(neSq + 2) + '$.', isTrue: false },
        {
          key: 'b',
          text: 'Tọa độ vectơ $\\overrightarrow{x} = 3\\overrightarrow{NE} + 2\\overrightarrow{NA}$ là $' + u.formatCoord3D(combX - 1, combY - 1, combZ + 1) + '$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Vectơ $\\overrightarrow{u}$ thỏa mãn $-2\\overrightarrow{NE} - \\overrightarrow{NA} - 2\\overrightarrow{u} = -2\\overrightarrow{EA}$ có tọa độ là $' + fmt3(u.simplifyFrac(ux.num + 4, 2).latex, u.simplifyFrac(uy.num + 2, 2).latex, '' + (uz.value + 1)) + '$.',
          isTrue: false,
        },
        { key: 'd', text: 'Bán kính đường tròn ngoại tiếp tam giác $NEA$ là $' + rTex + '$.', isTrue: true },
      ];
      return {
        stem:
          'Cho các điểm $N' +
          u.formatCoord3D(xN, yN, zN) +
          ',\\; E' +
          u.formatCoord3D(xE, yE, zE) +
          ',\\; A' +
          u.formatCoord3D(xA, yA, zA) +
          '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a) Sai, b) Sai, c) Sai, d) Đúng',
        solutionSteps: [
          'a) Sai. $\\overrightarrow{NE} = ' + u.formatCoord3D(neX, neY, neZ) + ' \\Rightarrow NE = ' + sqrtSimp(neSq) + '$.',
          'b) Sai. $\\overrightarrow{NA} = ' + u.formatCoord3D(naX, naY, naZ) + ' \\Rightarrow \\overrightarrow{x} = ' + u.formatCoord3D(combX, combY, combZ) + '$.',
          'c) Sai. $\\overrightarrow{u} = -\\dfrac{1}{2}(2\\overrightarrow{NE} + \\overrightarrow{NA} - 2\\overrightarrow{EA}) = ' + fmt3(ux.latex, uy.latex, uz.latex) + '$.',
          'd) Đúng. $\\overrightarrow{NE}\\cdot\\overrightarrow{NA} = 0$ nên $\\triangle NEA$ vuông tại $N$, bán kính ngoại tiếp $R = \\dfrac{EA}{2} = ' + rTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { xN: 3, yN: 6, zN: -4, a: 1, b: -3, c: -2, p: 0, q: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38 N(3;6;-4), E(-4;1;0), A(4;3;-6)', params: { xN: 3, yN: 6, zN: -4, a: 1, b: -3, c: -2, p: 4, q: -5 }, expectedValid: true },
    ],
  },

  // Dạng 39 (Q39): 3 điểm N, A, D - hiệu vectơ, góc bù hướng, chia đoạn tỷ số k
  t12_b8_d39_three_pts_ratio_angle_tf: {
    id: 't12_b8_d39_three_pts_ratio_angle_tf',
    name: 'Tọa độ vectơ hiệu, góc hai vectơ ngược hướng và điểm chia đoạn theo tỉ số PD = kPA',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Độ dài, góc và chia đoạn thẳng theo tỉ số',
    description: 'Cho ba điểm N, A, D. Xét DN, |AN - AD|, góc (DA, ND) và tọa độ điểm P thuộc đoạn DA thỏa PD = k*PA.',
    conditionSummary: 'N, A, D không thẳng hàng, góc và tổng tọa độ P không gần ranh giới làm tròn hàng phần mười',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -3, max: 8 },
      { name: 'yN', label: 'y_N', min: -5, max: 4 },
      { name: 'zN', label: 'z_N', min: -6, max: 2 },
      { name: 'xA', label: 'x_A', min: -3, max: 8 },
      { name: 'yA', label: 'y_A', min: -5, max: 4 },
      { name: 'zA', label: 'z_A', min: -7, max: 2 },
      { name: 'xD', label: 'x_D', min: -3, max: 6 },
      { name: 'yD', label: 'y_D', min: -4, max: 4 },
      { name: 'zD', label: 'z_D', min: -6, max: 2 },
      { name: 'k', label: 'Tỉ số PD = kPA', min: 2, max: 4 },
    ],
    validateCode: `
      const { xN, yN, zN, xA, yA, zA, xD, yD, zD, k } = params;
      const dn1 = xN - xD, dn2 = yN - yD, dn3 = zN - zD;
      const da1 = xA - xD, da2 = yA - yD, da3 = zA - zD;
      const cx = dn2 * da3 - dn3 * da2, cy = dn3 * da1 - dn1 * da3, cz = dn1 * da2 - dn2 * da1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'Ba điểm thẳng hàng' };
      const dot = -(da1 * dn1 + da2 * dn2 + da3 * dn3);
      const sDA = da1 * da1 + da2 * da2 + da3 * da3;
      const sDN = dn1 * dn1 + dn2 * dn2 + dn3 * dn3;
      const deg = (Math.acos(dot / Math.sqrt(sDA * sDN)) * 180) / Math.PI;
      const sumP = xD + yD + zD + (k / (k + 1)) * (da1 + da2 + da3);
      if (
        Math.abs(deg * 10 - Math.floor(deg * 10) - 0.5) < 0.03 ||
        Math.abs(sumP * 10 - Math.floor(sumP * 10) - 0.5) < 0.03
      ) {
        return { valid: false, reason: 'Giá trị gần ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN, xA, yA, zA, xD, yD, zD, k } = params;
      const dn1 = xN - xD, dn2 = yN - yD, dn3 = zN - zD;
      const da1 = xA - xD, da2 = yA - yD, da3 = zA - zD;
      const sDN = dn1 * dn1 + dn2 * dn2 + dn3 * dn3;
      const sDA = da1 * da1 + da2 * da2 + da3 * da3;
      const dotND = -(da1 * dn1 + da2 * dn2 + da3 * dn3);
      const deg = Number(((Math.acos(dotND / Math.sqrt(sDA * sDN)) * 180) / Math.PI).toFixed(1));
      const aF = u.simplifyFrac(xD * (k + 1) + k * da1, k + 1);
      const bF = u.simplifyFrac(yD * (k + 1) + k * da2, k + 1);
      const cF = u.simplifyFrac(zD * (k + 1) + k * da3, k + 1);
      const sumP = u.simplifyFrac(aF.num + bF.num + cF.num, k + 1);
      const sumR = Number(sumP.value.toFixed(1));
      const wrongSum = Number((sumR + 2).toFixed(1));
      const sqrtSimp = (n) => {
        let m = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { m = i; r = n / (i * i); break; }
        }
        return r === 1 ? '' + m : (m === 1 ? '' : m) + '\\sqrt{' + r + '}';
      };
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');
      const tfStatements = [
        { key: 'a', text: '$\\overrightarrow{DN} = ' + u.formatCoord3D(dn1, dn2, dn3) + '$.', isTrue: true },
        { key: 'b', text: '$|\\overrightarrow{AN} - \\overrightarrow{AD}| = ' + sqrtSimp(sDN) + '$.', isTrue: true },
        { key: 'c', text: 'Góc giữa hai vectơ $\\overrightarrow{DA}$ và $\\overrightarrow{ND}$ bằng $' + fmt1(deg) + '^\\circ$.', isTrue: true },
        {
          key: 'd',
          text: 'Điểm $P(a;b;c)$ thuộc đoạn $DA$ thỏa mãn $PD = ' + k + 'PA$. Khi đó $a + b + c = ' + fmt1(wrongSum) + '$.',
          isTrue: false,
        },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$, cho ba điểm $N' +
          u.formatCoord3D(xN, yN, zN) +
          ',\\; A' +
          u.formatCoord3D(xA, yA, zA) +
          ',\\; D' +
          u.formatCoord3D(xD, yD, zD) +
          '$. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: 'a) Đúng, b) Đúng, c) Đúng, d) Sai',
        solutionSteps: [
          'a) Đúng. $\\overrightarrow{DN} = ' + u.formatCoord3D(dn1, dn2, dn3) + '$.',
          'b) Đúng. $|\\overrightarrow{AN} - \\overrightarrow{AD}| = |\\overrightarrow{DN}| = ' + sqrtSimp(sDN) + '$.',
          'c) Đúng. $\\overrightarrow{DA} = ' + u.formatCoord3D(da1, da2, da3) + ',\\; \\overrightarrow{ND} = ' + u.formatCoord3D(-dn1, -dn2, -dn3) + ' \\Rightarrow \\cos(\\overrightarrow{DA},\\overrightarrow{ND}) = \\dfrac{' + dotND + '}{\\sqrt{' + sDA + '}\\cdot\\sqrt{' + sDN + '}} \\Rightarrow (\\overrightarrow{DA},\\overrightarrow{ND}) \\approx ' + fmt1(deg) + '^\\circ$.',
          'd) Sai. Vì $P$ thuộc đoạn $DA$ và $PD = ' + k + 'PA$ nên $\\overrightarrow{DP} = \\dfrac{' + k + '}{' + (k + 1) + '}\\overrightarrow{DA} \\Rightarrow P(' + aF.latex + ';\\, ' + bF.latex + ';\\, ' + cF.latex + ')$, suy ra $a + b + c = ' + sumP.latex + ' \\approx ' + fmt1(sumR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ba điểm thẳng hàng', params: { xN: 0, yN: 0, zN: 0, xA: 1, yA: 1, zA: 1, xD: 2, yD: 2, zD: 2, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39 N(6;-1;-4), A(4;-1;-5), D(3;0;-4)', params: { xN: 6, yN: -1, zN: -4, xA: 4, yA: -1, zA: -5, xD: 3, yD: 0, zD: -4, k: 2 }, expectedValid: true },
    ],
  },

  // Dạng 40 (Q40): 3 điểm A, P, B - cộng quy tắc 3 điểm, góc ngược hướng, tìm N ∈ Ox thỏa BN = R
  t12_b8_d40_three_pts_axis_dist_tf: {
    id: 't12_b8_d40_three_pts_axis_dist_tf',
    name: 'Quy tắc cộng vectơ, góc hai vectơ và điểm trên trục Ox cách đều B cho trước',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Góc vectơ và bài toán điểm thuộc trục tọa độ',
    description: 'Cho ba điểm A, P, B. Xét BP, |PA + BP|, góc (BP, AB) và tổng hoành độ các điểm N thuộc Ox thỏa BN = sqrt(r^2 + yB^2 + zB^2).',
    conditionSummary: 'A, P, B không thẳng hàng, r > 0 nguyên, góc không gần ranh giới làm tròn hàng phần mười',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -4, max: 6 },
      { name: 'yA', label: 'y_A', min: -5, max: 4 },
      { name: 'zA', label: 'z_A', min: -3, max: 5 },
      { name: 'xP', label: 'x_P', min: -3, max: 7 },
      { name: 'yP', label: 'y_P', min: -4, max: 4 },
      { name: 'zP', label: 'z_P', min: -3, max: 5 },
      { name: 'xB', label: 'x_B', min: 2, max: 10 },
      { name: 'yB', label: 'y_B', min: -5, max: 4 },
      { name: 'zB', label: 'z_B', min: -4, max: 4 },
      { name: 'r', label: 'Bán kính chiếu r', min: 2, max: 7 },
    ],
    validateCode: `
      const { xA, yA, zA, xP, yP, zP, xB, yB, zB, r } = params;
      if (r <= 0) return { valid: false, reason: 'Bán kính r phải dương' };
      const bp1 = xP - xB, bp2 = yP - yB, bp3 = zP - zB;
      const ba1 = xA - xB, ba2 = yA - yB, ba3 = zA - zB;
      const cx = bp2 * ba3 - bp3 * ba2, cy = bp3 * ba1 - bp1 * ba3, cz = bp1 * ba2 - bp2 * ba1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'A, P, B thẳng hàng' };
      const dotBA = bp1 * ba1 + bp2 * ba2 + bp3 * ba3;
      const sBP = bp1 * bp1 + bp2 * bp2 + bp3 * bp3;
      const sBA = ba1 * ba1 + ba2 * ba2 + ba3 * ba3;
      const degAcute = (Math.acos(dotBA / Math.sqrt(sBP * sBA)) * 180) / Math.PI;
      if (Math.abs(degAcute * 10 - Math.floor(degAcute * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Góc gần ranh giới làm tròn hàng phần mười' };
      }
      if (Math.abs(degAcute - 90) < 3) return { valid: false, reason: 'Tránh góc gần 90° khiến góc bù trùng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, xP, yP, zP, xB, yB, zB, r } = params;
      const bp1 = xP - xB, bp2 = yP - yB, bp3 = zP - zB;
      const ba1 = xA - xB, ba2 = yA - yB, ba3 = zA - zB;
      const sBP = bp1 * bp1 + bp2 * bp2 + bp3 * bp3;
      const sBA = ba1 * ba1 + ba2 * ba2 + ba3 * ba3;
      const dotBA = bp1 * ba1 + bp2 * ba2 + bp3 * ba3;
      const degBA = Number(((Math.acos(dotBA / Math.sqrt(sBP * sBA)) * 180) / Math.PI).toFixed(1));
      const degAB = Number((180 - degBA).toFixed(1));
      const bnSq = r * r + yB * yB + zB * zB;
      const sumX = 2 * xB;
      const sqrtSimp = (n) => {
        let m = 1, rad = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { m = i; rad = n / (i * i); break; }
        }
        return rad === 1 ? '' + m : (m === 1 ? '' : m) + '\\sqrt{' + rad + '}';
      };
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');
      const tfStatements = [
        { key: 'a', text: '$\\overrightarrow{BP} = ' + u.formatCoord3D(bp1, bp2, bp3) + '$.', isTrue: true },
        { key: 'b', text: '$|\\overrightarrow{PA} + \\overrightarrow{BP}| = ' + sqrtSimp(sBA) + '$.', isTrue: true },
        { key: 'c', text: 'Góc giữa hai vectơ $\\overrightarrow{BP}$ và $\\overrightarrow{AB}$ bằng $' + fmt1(degBA) + '^\\circ$.', isTrue: false },
        { key: 'd', text: 'Các điểm $N$ thuộc trục $Ox$ thỏa mãn $BN = ' + sqrtSimp(bnSq) + '$. Tổng hoành độ của các điểm $N$ bằng $' + (sumX + 1) + '$.', isTrue: false },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$, cho ba điểm $A' +
          u.formatCoord3D(xA, yA, zA) +
          ',\\; P' +
          u.formatCoord3D(xP, yP, zP) +
          ',\\; B' +
          u.formatCoord3D(xB, yB, zB) +
          '$. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: 'a) Đúng, b) Đúng, c) Sai, d) Sai',
        solutionSteps: [
          'a) Đúng. $\\overrightarrow{BP} = ' + u.formatCoord3D(bp1, bp2, bp3) + '$.',
          'b) Đúng. $|\\overrightarrow{PA} + \\overrightarrow{BP}| = |\\overrightarrow{BA}| = ' + sqrtSimp(sBA) + '$.',
          'c) Sai. $(\\overrightarrow{BP},\\overrightarrow{BA}) \\approx ' + fmt1(degBA) + '^\\circ \\Rightarrow (\\overrightarrow{BP},\\overrightarrow{AB}) = 180^\\circ - ' + fmt1(degBA) + '^\\circ \\approx ' + fmt1(degAB) + '^\\circ$.',
          'd) Sai. Với $N(a;0;0)$, $(a - ' + xB + ')^2 = ' + r * r + ' \\Rightarrow a = ' + (xB + r) + '$ hoặc $a = ' + (xB - r) + '$. Tổng hoành độ bằng $' + sumX + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 0', params: { xA: 2, yA: -2, zA: 2, xP: 5, yP: 0, zP: 0, xB: 8, yB: -2, zB: 1, r: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40 A(2;-2;2), P(5;0;0), B(8;-2;1)', params: { xA: 2, yA: -2, zA: 2, xP: 5, yP: 0, zP: 0, xB: 8, yB: -2, zB: 1, r: 5 }, expectedValid: true },
    ],
  },

  // Dạng 41 (Q41): 3 điểm M, B, A - quy tắc 3 điểm, góc ngược hướng, chia đoạn DM = kDB
  t12_b8_d41_three_pts_segment_div_tf: {
    id: 't12_b8_d41_three_pts_segment_div_tf',
    name: 'Tổng hợp vectơ BA, độ dài MA, góc (MB, AM) và điểm chia đoạn DM = kDB',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Độ dài, góc và điểm chia đoạn thẳng',
    description: 'Cho ba điểm M, B, A. Xét BA, |BA + MB|, góc (MB, AM) và điểm D thuộc MB thỏa DM = k*DB.',
    conditionSummary: 'M, B, A không thẳng hàng, góc và tổng tọa độ D không gần ranh giới làm tròn hàng phần mười',
    paramSpecs: [
      { name: 'xM', label: 'x_M', min: 1, max: 8 },
      { name: 'yM', label: 'y_M', min: 2, max: 9 },
      { name: 'zM', label: 'z_M', min: -3, max: 5 },
      { name: 'xB', label: 'x_B', min: 2, max: 10 },
      { name: 'yB', label: 'y_B', min: 4, max: 11 },
      { name: 'zB', label: 'z_B', min: -2, max: 6 },
      { name: 'xA', label: 'x_A', min: 1, max: 8 },
      { name: 'yA', label: 'y_A', min: -2, max: 7 },
      { name: 'zA', label: 'z_A', min: -6, max: 2 },
      { name: 'k', label: 'Tỉ số DM = kDB', min: 2, max: 5 },
    ],
    validateCode: `
      const { xM, yM, zM, xB, yB, zB, xA, yA, zA, k } = params;
      const mb1 = xB - xM, mb2 = yB - yM, mb3 = zB - zM;
      const ma1 = xA - xM, ma2 = yA - yM, ma3 = zA - zM;
      const cx = mb2 * ma3 - mb3 * ma2, cy = mb3 * ma1 - mb1 * ma3, cz = mb1 * ma2 - mb2 * ma1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'Ba điểm thẳng hàng' };
      const dotMA = mb1 * ma1 + mb2 * ma2 + mb3 * ma3;
      const sMB = mb1 * mb1 + mb2 * mb2 + mb3 * mb3;
      const sMA = ma1 * ma1 + ma2 * ma2 + ma3 * ma3;
      const degMA = (Math.acos(dotMA / Math.sqrt(sMB * sMA)) * 180) / Math.PI;
      if (Math.abs(degMA - 90) < 3) return { valid: false, reason: 'Tránh góc gần 90°' };
      const sumD = xM + yM + zM + (k / (k + 1)) * (mb1 + mb2 + mb3);
      if (
        Math.abs(degMA * 10 - Math.floor(degMA * 10) - 0.5) < 0.03 ||
        Math.abs(sumD * 10 - Math.floor(sumD * 10) - 0.5) < 0.03
      ) {
        return { valid: false, reason: 'Giá trị gần ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xM, yM, zM, xB, yB, zB, xA, yA, zA, k } = params;
      const ba1 = xA - xB, ba2 = yA - yB, ba3 = zA - zB;
      const mb1 = xB - xM, mb2 = yB - yM, mb3 = zB - zM;
      const ma1 = xA - xM, ma2 = yA - yM, ma3 = zA - zM;
      const sMB = mb1 * mb1 + mb2 * mb2 + mb3 * mb3;
      const sMA = ma1 * ma1 + ma2 * ma2 + ma3 * ma3;
      const dotMA = mb1 * ma1 + mb2 * ma2 + mb3 * ma3;
      const degMA = Number(((Math.acos(dotMA / Math.sqrt(sMB * sMA)) * 180) / Math.PI).toFixed(1));
      const degAM = Number((180 - degMA).toFixed(1));
      const aF = u.simplifyFrac(xM * (k + 1) + k * mb1, k + 1);
      const bF = u.simplifyFrac(yM * (k + 1) + k * mb2, k + 1);
      const cF = u.simplifyFrac(zM * (k + 1) + k * mb3, k + 1);
      const sumF = u.simplifyFrac(aF.num + bF.num + cF.num, k + 1);
      const sumR = Number(sumF.value.toFixed(1));
      const wrongSum = Number((sumR + 1).toFixed(1));
      const sqrtSimp = (n) => {
        let m = 1, rad = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { m = i; rad = n / (i * i); break; }
        }
        return rad === 1 ? '' + m : (m === 1 ? '' : m) + '\\sqrt{' + rad + '}';
      };
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');
      const tfStatements = [
        { key: 'a', text: '$\\overrightarrow{BA} = ' + u.formatCoord3D(ba1, ba2, ba3) + '$.', isTrue: true },
        { key: 'b', text: '$|\\overrightarrow{BA} + \\overrightarrow{MB}| = ' + sqrtSimp(sMA) + '$.', isTrue: true },
        { key: 'c', text: 'Góc giữa hai vectơ $\\overrightarrow{MB}$ và $\\overrightarrow{AM}$ bằng $' + fmt1(degMA) + '^\\circ$.', isTrue: false },
        {
          key: 'd',
          text: 'Điểm $D(a;b;c)$ thuộc đoạn $MB$ thỏa mãn $DM = ' + k + 'DB$. Khi đó $a + b + c = ' + fmt1(wrongSum) + '$.',
          isTrue: false,
        },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$, cho ba điểm $M' +
          u.formatCoord3D(xM, yM, zM) +
          ',\\; B' +
          u.formatCoord3D(xB, yB, zB) +
          ',\\; A' +
          u.formatCoord3D(xA, yA, zA) +
          '$. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: 'a) Đúng, b) Đúng, c) Sai, d) Sai',
        solutionSteps: [
          'a) Đúng. $\\overrightarrow{BA} = ' + u.formatCoord3D(ba1, ba2, ba3) + '$.',
          'b) Đúng. $|\\overrightarrow{BA} + \\overrightarrow{MB}| = |\\overrightarrow{MA}| = ' + sqrtSimp(sMA) + '$.',
          'c) Sai. $(\\overrightarrow{MB},\\overrightarrow{MA}) \\approx ' + fmt1(degMA) + '^\\circ \\Rightarrow (\\overrightarrow{MB},\\overrightarrow{AM}) \\approx ' + fmt1(degAM) + '^\\circ$.',
          'd) Sai. $\\overrightarrow{MD} = \\dfrac{' + k + '}{' + (k + 1) + '}\\overrightarrow{MB} \\Rightarrow D(' + aF.latex + ';\\, ' + bF.latex + ';\\, ' + cF.latex + ')$, suy ra $a + b + c = ' + sumF.latex + ' \\approx ' + fmt1(sumR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M, B, A thẳng hàng', params: { xM: 1, yM: 2, zM: 0, xB: 2, yB: 4, zB: 0, xA: 3, yA: 6, zA: 0, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41 M(6;7;2), B(8;10;4), A(6;4;-4)', params: { xM: 6, yM: 7, zM: 2, xB: 8, yB: 10, zB: 4, xA: 6, yA: 4, zA: -4, k: 4 }, expectedValid: true },
    ],
  },

  // Dạng 42 (Q42): 3 điểm D, A, P - độ dài, tổ hợp 3AD + PA, góc, đẳng thức 3PM + PA = PD
  t12_b8_d42_three_pts_vec_eq_tf: {
    id: 't12_b8_d42_three_pts_vec_eq_tf',
    name: 'Độ dài đoạn thẳng, tổ hợp 3AD + PA, góc và phương trình vectơ 3PM + PA = PD',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Tổ hợp tuyến tính và phương trình vectơ',
    description: 'Cho ba điểm D, A, P. Xét |PA|, 3AD + PA, góc (PA, DP) và điểm M thỏa 3PM + PA = PD.',
    conditionSummary: 'D, A, P không thẳng hàng, giá trị góc và tổng tọa độ M không gần ranh giới làm tròn',
    paramSpecs: [
      { name: 'xD', label: 'x_D', min: -6, max: 3 },
      { name: 'yD', label: 'y_D', min: -8, max: 2 },
      { name: 'zD', label: 'z_D', min: -12, max: 0 },
      { name: 'xA', label: 'x_A', min: -5, max: 4 },
      { name: 'yA', label: 'y_A', min: -4, max: 4 },
      { name: 'zA', label: 'z_A', min: -4, max: 4 },
      { name: 'xP', label: 'x_P', min: -7, max: 2 },
      { name: 'yP', label: 'y_P', min: -7, max: 2 },
      { name: 'zP', label: 'z_P', min: -8, max: 2 },
    ],
    validateCode: `
      const { xD, yD, zD, xA, yA, zA, xP, yP, zP } = params;
      const pa1 = xA - xP, pa2 = yA - yP, pa3 = zA - zP;
      const pd1 = xD - xP, pd2 = yD - yP, pd3 = zD - zP;
      const cx = pa2 * pd3 - pa3 * pd2, cy = pa3 * pd1 - pa1 * pd3, cz = pa1 * pd2 - pa2 * pd1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'D, A, P thẳng hàng' };
      const dotPD = pa1 * pd1 + pa2 * pd2 + pa3 * pd3;
      const sPA = pa1 * pa1 + pa2 * pa2 + pa3 * pa3;
      const sPD = pd1 * pd1 + pd2 * pd2 + pd3 * pd3;
      const degPD = (Math.acos(dotPD / Math.sqrt(sPA * sPD)) * 180) / Math.PI;
      if (Math.abs(degPD - 90) < 3) return { valid: false, reason: 'Tránh góc gần 90°' };
      const sumM = xP + yP + zP + (xD - xA + yD - yA + zD - zA) / 3;
      if (
        Math.abs(degPD * 10 - Math.floor(degPD * 10) - 0.5) < 0.03 ||
        Math.abs(sumM * 10 - Math.floor(sumM * 10) - 0.5) < 0.03
      ) {
        return { valid: false, reason: 'Giá trị gần ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xD, yD, zD, xA, yA, zA, xP, yP, zP } = params;
      const pa1 = xA - xP, pa2 = yA - yP, pa3 = zA - zP;
      const pd1 = xD - xP, pd2 = yD - yP, pd3 = zD - zP;
      const ad1 = xD - xA, ad2 = yD - yA, ad3 = zD - zA;
      const ux = 3 * ad1 + pa1, uy = 3 * ad2 + pa2, uz = 3 * ad3 + pa3;
      const sPA = pa1 * pa1 + pa2 * pa2 + pa3 * pa3;
      const sPD = pd1 * pd1 + pd2 * pd2 + pd3 * pd3;
      const dotPD = pa1 * pd1 + pa2 * pd2 + pa3 * pd3;
      const degPD = Number(((Math.acos(dotPD / Math.sqrt(sPA * sPD)) * 180) / Math.PI).toFixed(1));
      const degDP = Number((180 - degPD).toFixed(1));
      const aF = u.simplifyFrac(3 * xP + ad1, 3);
      const bF = u.simplifyFrac(3 * yP + ad2, 3);
      const cF = u.simplifyFrac(3 * zP + ad3, 3);
      const sumF = u.simplifyFrac(3 * (xP + yP + zP) + ad1 + ad2 + ad3, 3);
      const sumR = Number(sumF.value.toFixed(1));
      const wrongSum = Number((sumR + 2).toFixed(1));
      const sqrtSimp = (n) => {
        let m = 1, rad = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { m = i; rad = n / (i * i); break; }
        }
        return rad === 1 ? '' + m : (m === 1 ? '' : m) + '\\sqrt{' + rad + '}';
      };
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');
      const tfStatements = [
        { key: 'a', text: '$|\\overrightarrow{PA}| = ' + sqrtSimp(sPA) + '$.', isTrue: true },
        { key: 'b', text: 'Vectơ $\\overrightarrow{u} = 3\\overrightarrow{AD} + \\overrightarrow{PA}$ có tọa độ là $' + u.formatCoord3D(ux, uy + 1, uz) + '$.', isTrue: false },
        { key: 'c', text: 'Góc giữa hai vectơ $\\overrightarrow{PA}$ và $\\overrightarrow{DP}$ bằng $' + fmt1(degPD) + '^\\circ$.', isTrue: false },
        { key: 'd', text: 'Điểm $M(a;b;c)$ thỏa mãn $3\\overrightarrow{PM} + \\overrightarrow{PA} = \\overrightarrow{PD}$. Khi đó $a + b + c = ' + fmt1(wrongSum) + '$.', isTrue: false },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$, cho ba điểm $D' +
          u.formatCoord3D(xD, yD, zD) +
          ',\\; A' +
          u.formatCoord3D(xA, yA, zA) +
          ',\\; P' +
          u.formatCoord3D(xP, yP, zP) +
          '$. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: 'a) Đúng, b) Sai, c) Sai, d) Sai',
        solutionSteps: [
          'a) Đúng. $\\overrightarrow{PA} = ' + u.formatCoord3D(pa1, pa2, pa3) + ' \\Rightarrow |\\overrightarrow{PA}| = ' + sqrtSimp(sPA) + '$.',
          'b) Sai. $\\overrightarrow{AD} = ' + u.formatCoord3D(ad1, ad2, ad3) + ' \\Rightarrow 3\\overrightarrow{AD} + \\overrightarrow{PA} = ' + u.formatCoord3D(ux, uy, uz) + '$.',
          'c) Sai. $(\\overrightarrow{PA},\\overrightarrow{PD}) \\approx ' + fmt1(degPD) + '^\\circ \\Rightarrow (\\overrightarrow{PA},\\overrightarrow{DP}) \\approx ' + fmt1(degDP) + '^\\circ$.',
          'd) Sai. $3\\overrightarrow{PM} = \\overrightarrow{PD} - \\overrightarrow{PA} = \\overrightarrow{AD} \\Rightarrow M(' + aF.latex + ';\\, ' + bF.latex + ';\\, ' + cF.latex + ')$, suy ra $a + b + c = ' + sumF.latex + ' \\approx ' + fmt1(sumR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên D, A, P thẳng hàng', params: { xD: 0, yD: 0, zD: 0, xA: 1, yA: 1, zA: 1, xP: 2, yP: 2, zP: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42 D(-3;-6;-11), A(-2;0;1), P(-4;-4;-5)', params: { xD: -3, yD: -6, zD: -11, xA: -2, yA: 0, zA: 1, xP: -4, yP: -4, zP: -5 }, expectedValid: true },
    ],
  },

  // Dạng 43 (Q43): Tam giác B, K, D - trung điểm, góc nhọn/tù, đối xứng và min(PB + PK) trên (Oxy)
  t12_b8_d43_triangle_min_sum_oxy_tf: {
    id: 't12_b8_d43_triangle_min_sum_oxy_tf',
    name: 'Tổng hợp trung điểm, tính chất góc nhọn/tù, điểm đối xứng và cực trị PB + PK trên (Oxy)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Cực trị tổng khoảng cách đến hai điểm',
    description: 'Cho tam giác BKD với B, K cùng phía (Oxy). Xét trung điểm BK, góc KBD nhọn/tù, đối xứng K qua D và cực trị PB + PK với P ∈ (Oxy).',
    conditionSummary: 'B, K, D không thẳng hàng; zB và zK cùng dấu khác 0; góc KBD ≠ 90°',
    paramSpecs: [
      { name: 'xB', label: 'x_B', min: -5, max: 3 },
      { name: 'yB', label: 'y_B', min: -4, max: 4 },
      { name: 'zB', label: 'z_B', min: 1, max: 4 },
      { name: 'xK', label: 'x_K', min: -6, max: 3 },
      { name: 'yK', label: 'y_K', min: -4, max: 4 },
      { name: 'zK', label: 'z_K', min: 1, max: 5 },
      { name: 'xD', label: 'x_D', min: -6, max: 3 },
      { name: 'yD', label: 'y_D', min: -4, max: 4 },
      { name: 'zD', label: 'z_D', min: -5, max: -1 },
    ],
    validateCode: `
      const { xB, yB, zB, xK, yK, zK, xD, yD, zD } = params;
      if (zB * zK <= 0) return { valid: false, reason: 'B và K phải nằm cùng phía đối với (Oxy)' };
      const bk1 = xK - xB, bk2 = yK - yB, bk3 = zK - zB;
      const bd1 = xD - xB, bd2 = yD - yB, bd3 = zD - zB;
      const cx = bk2 * bd3 - bk3 * bd2, cy = bk3 * bd1 - bk1 * bd3, cz = bk1 * bd2 - bk2 * bd1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'B, K, D thẳng hàng' };
      const dot = bk1 * bd1 + bk2 * bd2 + bk3 * bd3;
      if (dot === 0) return { valid: false, reason: 'Góc KBD không được bằng 90°' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xB, yB, zB, xK, yK, zK, xD, yD, zD } = params;
      const ix = u.simplifyFrac(xB + xK, 2);
      const iy = u.simplifyFrac(yB + yK, 2);
      const iz = u.simplifyFrac(zB + zK, 2);
      const bk1 = xK - xB, bk2 = yK - yB, bk3 = zK - zB;
      const bd1 = xD - xB, bd2 = yD - yB, bd3 = zD - zB;
      const dot = bk1 * bd1 + bk2 * bd2 + bk3 * bd3;
      const isAcute = dot > 0;
      const xN = 2 * xD - xK, yN = 2 * yD - yK, zN = 2 * zD - zK;
      const den = zB + zK;
      const aF = u.simplifyFrac(xB * den + zB * (xK - xB), den);
      const bF = u.simplifyFrac(yB * den + zB * (yK - yB), den);
      const sumF = u.simplifyFrac((xB + yB) * den + zB * (xK - xB + yK - yB), den);
      const sumR = Number(sumF.value.toFixed(1));
      const wrongSum = Number((sumR + 2.5).toFixed(1));
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');
      const tfStatements = [
        { key: 'a', text: 'Trung điểm của đoạn thẳng $BK$ là điểm $I' + fmt3(ix.latex, iy.latex, iz.latex) + '$.', isTrue: true },
        { key: 'b', text: 'Góc $\\widehat{KBD}$ là góc nhọn.', isTrue: isAcute },
        { key: 'c', text: 'Tọa độ điểm $N$ đối xứng với $K$ qua $D$ là $' + u.formatCoord3D(xN, yN + 1, zN) + '$.', isTrue: false },
        { key: 'd', text: 'Điểm $P(a;b;c)$ thuộc mặt phẳng $(Oxy)$ sao cho $PB + PK$ nhỏ nhất. Khi đó $a + b + c = ' + fmt1(wrongSum) + '$.', isTrue: false },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $B' +
          u.formatCoord3D(xB, yB, zB) +
          ',\\; K' +
          u.formatCoord3D(xK, yK, zK) +
          ',\\; D' +
          u.formatCoord3D(xD, yD, zD) +
          '$. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) Đúng. Trung điểm $I$ của $BK$ là $I' + fmt3(ix.latex, iy.latex, iz.latex) + '$.',
          'b) ' + (isAcute ? 'Đúng.' : 'Sai.') + ' $\\overrightarrow{BK} = ' + u.formatCoord3D(bk1, bk2, bk3) + ',\\; \\overrightarrow{BD} = ' + u.formatCoord3D(bd1, bd2, bd3) + ' \\Rightarrow \\overrightarrow{BK}\\cdot\\overrightarrow{BD} = ' + dot + (isAcute ? ' > 0$' : ' < 0$') + ', suy ra góc $\\widehat{KBD}$ ' + (isAcute ? 'nhọn.' : 'tù.'),
          'c) Sai. $N = 2D - K = ' + u.formatCoord3D(xN, yN, zN) + '$.',
          'd) Sai. Lấy $B\'' + u.formatCoord3D(xB, yB, -zB) + '$ đối xứng $B$ qua $(Oxy)$. Khi đó $P = B\'K \\cap (Oxy) = ' + fmt3(aF.latex, bF.latex, '0') + '$, nên $a + b + c = ' + sumF.latex + ' \\approx ' + fmt1(sumR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B và K khác phía (Oxy)', params: { xB: -2, yB: 0, zB: -1, xK: -4, yK: -1, zK: 3, xD: -4, yD: 0, zD: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43 B(-2;0;1), K(-4;-1;3), D(-4;0;-3)', params: { xB: -2, yB: 0, zB: 1, xK: -4, yK: -1, zK: 3, xD: -4, yD: 0, zD: -3 }, expectedValid: true },
    ],
  },

  // Dạng 44 (Q44): Tam giác PAN - độ dài, trung điểm, hình bình hành, chân đường cao H
  t12_b8_d44_triangle_altitude_foot_tf: {
    id: 't12_b8_d44_triangle_altitude_foot_tf',
    name: 'Tổng hợp độ dài, trung điểm, hình bình hành và chân đường cao tam giác PAN',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Chân đường cao và tứ giác trong không gian Oxyz',
    description: 'Cho tam giác PAN. Xét PA, trung điểm AN, đỉnh D của hình bình hành PAND và chân đường cao H từ P xuống AN.',
    conditionSummary: 'P, A, N không thẳng hàng',
    paramSpecs: [
      { name: 'xP', label: 'x_P', min: -6, max: 3 },
      { name: 'yP', label: 'y_P', min: -4, max: 4 },
      { name: 'zP', label: 'z_P', min: 1, max: 8 },
      { name: 'xA', label: 'x_A', min: -5, max: 4 },
      { name: 'yA', label: 'y_A', min: -3, max: 4 },
      { name: 'zA', label: 'z_A', min: -3, max: 3 },
      { name: 'xN', label: 'x_N', min: -5, max: 4 },
      { name: 'yN', label: 'y_N', min: -4, max: 4 },
      { name: 'zN', label: 'z_N', min: 4, max: 10 },
    ],
    validateCode: `
      const { xP, yP, zP, xA, yA, zA, xN, yN, zN } = params;
      const an1 = xN - xA, an2 = yN - yA, an3 = zN - zA;
      const ap1 = xP - xA, ap2 = yP - yA, ap3 = zP - zA;
      const cx = an2 * ap3 - an3 * ap2, cy = an3 * ap1 - an1 * ap3, cz = an1 * ap2 - an2 * ap1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'P, A, N thẳng hàng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xP, yP, zP, xA, yA, zA, xN, yN, zN } = params;
      const paSq = Math.pow(xP - xA, 2) + Math.pow(yP - yA, 2) + Math.pow(zP - zA, 2);
      const sqrtSimp = (n) => {
        let m = 1, rad = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { m = i; rad = n / (i * i); break; }
        }
        return rad === 1 ? '' + m : (m === 1 ? '' : m) + '\\sqrt{' + rad + '}';
      };
      const mx = u.simplifyFrac(xA + xN, 2);
      const my = u.simplifyFrac(yA + yN, 2);
      const mz = u.simplifyFrac(zA + zN, 2);
      const an1 = xN - xA, an2 = yN - yA, an3 = zN - zA;
      const ap1 = xP - xA, ap2 = yP - yA, ap3 = zP - zA;
      const xD = xP + an1, yD = yP + an2, zD = zP + an3;
      const anSq = an1 * an1 + an2 * an2 + an3 * an3;
      const dot = ap1 * an1 + ap2 * an2 + ap3 * an3;
      const tF = u.simplifyFrac(dot, anSq);
      const hX = u.simplifyFrac(xA * anSq + dot * an1, anSq);
      const hY = u.simplifyFrac(yA * anSq + dot * an2, anSq);
      const hZ = u.simplifyFrac(zA * anSq + dot * an3, anSq);
      const sumF = u.simplifyFrac((xA + yA + zA) * anSq + dot * (an1 + an2 + an3), anSq);
      const wrongSum = u.simplifyFrac(sumF.num + 2 * sumF.den, sumF.den);
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const tfStatements = [
        { key: 'a', text: '$PA = ' + sqrtSimp(paSq) + '$.', isTrue: true },
        {
          key: 'b',
          text: 'Tọa độ trung điểm của cạnh $AN$ là $' + fmt3(u.simplifyFrac(xA + xN + 4, 2).latex, u.simplifyFrac(yA + yN + 2, 2).latex, mz.latex) + '$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Tứ giác $PAND$ là hình bình hành với $D' + u.formatCoord3D(xD + 8, yD + 2, zD + 2) + '$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Chân đường cao hạ từ đỉnh $P$ của tam giác $PAN$ là $H(a;b;c)$. Khi đó $a + b + c = ' + wrongSum.latex + '$.',
          isTrue: false,
        },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $PAN$ với $P' +
          u.formatCoord3D(xP, yP, zP) +
          ',\\; A' +
          u.formatCoord3D(xA, yA, zA) +
          ',\\; N' +
          u.formatCoord3D(xN, yN, zN) +
          '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a) Đúng, b) Sai, c) Sai, d) Sai',
        solutionSteps: [
          'a) Đúng. $PA = \\sqrt{' + paSq + '} = ' + sqrtSimp(paSq) + '$.',
          'b) Sai. Trung điểm $AN$ là $' + fmt3(mx.latex, my.latex, mz.latex) + '$.',
          'c) Sai. Vì $PAND$ là hình bình hành nên $\\overrightarrow{PD} = \\overrightarrow{AN} \\Rightarrow D' + u.formatCoord3D(xD, yD, zD) + '$.',
          'd) Sai. Đặt $\\overrightarrow{AH} = t\\overrightarrow{AN}$. Từ $\\overrightarrow{PH}\\cdot\\overrightarrow{AN} = 0 \\Rightarrow t = \\dfrac{\\overrightarrow{AP}\\cdot\\overrightarrow{AN}}{|\\overrightarrow{AN}|^2} = ' + tF.latex + '$, suy ra $H' + fmt3(hX.latex, hY.latex, hZ.latex) + '$ và $a + b + c = ' + sumF.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P, A, N thẳng hàng', params: { xP: 0, yP: 0, zP: 0, xA: 1, yA: 1, zA: 1, xN: 2, yN: 2, zN: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44 P(-4;-1;6), A(-2;1;0), N(-2;-1;9)', params: { xP: -4, yP: -1, zP: 6, xA: -2, yA: 1, zA: 0, xN: -2, yN: -1, zN: 9 }, expectedValid: true },
    ],
  },

  // Dạng 45 (Q45): Hai chim bói cá tấn công mục tiêu cá trên mặt hồ (có hình kingfisher_fish_3d variant 0)
  t12_b8_d45_two_kingfishers_tf: {
    id: 't12_b8_d45_two_kingfishers_tf',
    name: 'Bài toán chuyển động hai chim bói cá và chuyển hướng bay trong không gian Oxyz',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Chuyển động vectơ vận tốc và khoảng cách',
    description: 'Hai chim bói cá tại A, B nhắm vào cá tại C trên (Oxy). Chim A bay trước t0 giây, sau đó chuyển hướng theo vectơ u.',
    conditionSummary: 'AC và BC là số nguyên dương sạch từ bộ tứ Pytago, tTurn < tA',
    paramSpecs: [
      { name: 'xC', label: 'x_C', min: -5, max: 5 },
      { name: 'yC', label: 'y_C', min: -5, max: 6 },
      { name: 'kA', label: 'Hệ số AC/9', min: 3, max: 7 },
      { name: 'kB', label: 'Hệ số BC/9', min: 4, max: 8 },
      { name: 't0', label: 'A xuất phát trước (s)', min: 1, max: 3 },
      { name: 'ux', label: 'u_x', min: 1, max: 3 },
      { name: 'uy', label: 'u_y', min: 1, max: 4 },
      { name: 'uz', label: 'u_z', min: 1, max: 3 },
    ],
    validateCode: `
      const { kA, kB, t0 } = params;
      if (kA <= 0 || kB <= 0 || t0 <= 0) return { valid: false, reason: 'Tham số thời gian và hệ số phải dương' };
      if (kA >= kB) return { valid: false, reason: 'Cần kA < kB để AC < BC' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xC, yC, kA, kB, t0, ux, uy, uz } = params;
      // CA = kA * (1, -4, 8) => AC = (-kA, 4*kA, -8*kA), |AC| = 9*kA
      // CB = kB * (4, 4, 7)  => BC = (-4*kB, -4*kB, -7*kB), |BC| = 9*kB
      const xA = xC + kA, yA = yC - 4 * kA, zA = 8 * kA;
      const xB = xC + 4 * kB, yB = yC + 4 * kB, zB = 7 * kB;
      const AC = 9 * kA, BC = 9 * kB;
      const vA = 9, vB = 8;
      const tA = AC / vA; // = kA
      const tB = BC / vB;
      const aFirst = tB + t0 > tA;
      const tTurn = Math.max(1, Math.min(3, kA - 1));
      const dX = u.simplifyFrac(xA * kA + tTurn * (-kA), kA); // integer: xA - tTurn
      const dY = yA + 4 * tTurn;
      const dZ = zA - 8 * tTurn;
      const tFly2 = 4;
      const eX = dX.value + tFly2 * ux;
      const eY = dY + tFly2 * uy;
      const eZ = dZ + tFly2 * uz;
      const ae = Math.sqrt(Math.pow(eX - xA, 2) + Math.pow(eY - yA, 2) + Math.pow(eZ - zA, 2));
      const aeStr = ae.toFixed(2).replace('.', ',');
      const tfStatements = [
        { key: 'a', text: 'Khoảng cách từ chim bói cá ở $B$ đến mục tiêu ngắn hơn khoảng cách từ chim bói cá ở $A$ đến mục tiêu.', isTrue: false },
        { key: 'b', text: 'Chim bói cá ở vị trí $A$ sẽ đến mục tiêu trước con chim ở vị trí $B$.', isTrue: aFirst },
        {
          key: 'c',
          text: 'Sau khi bay được $' + tTurn + '$ giây, chim bói cá xuất phát từ $A$ chuyển hướng bay đi đậu trên một cành cây khác. Vị trí lúc chuyển hướng có tọa độ là $' + u.formatCoord3D(dX.value + 2, dY, dZ) + '$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Từ khi chuyển hướng, chim bói cá bay với vectơ vận tốc $\\overrightarrow{u} = ' + u.formatCoord3D(ux, uy, uz) + '$ (m/s) và sau $' + tFly2 + '$ giây tiếp theo, nó đậu trên một cành cây khác. Khoảng cách từ vị trí mới so với vị trí ban đầu bằng $' + aeStr + '$ m.',
          isTrue: true,
        },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$ cho trước với mặt nước phẳng lặng trùng với mặt phẳng $(Oxy)$, đơn vị trên mỗi trục là mét; có hai con chim bói cá ở các vị trí $A' +
          u.formatCoord3D(xA, yA, zA) +
          ',\\; B' +
          u.formatCoord3D(xB, yB, zB) +
          '$ trên các cành cây đang cùng ngắm mục tiêu là một chú cá đang bơi trên mặt hồ. Khi cá nằm im ở vị trí $C' +
          u.formatCoord3D(xC, yC, 0) +
          '$ thì hai con chim quyết định tấn công mục tiêu. Chim bói cá ở vị trí $A$ xuất phát trước con còn lại $' +
          t0 +
          '$ giây và bay về phía con cá với vận tốc $' +
          vA +
          '$ m/s, chim còn lại cũng tấn công mục tiêu với vận tốc $' +
          vB +
          '$ m/s. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần trăm):',
        diagram: { kind: 'geometry_figure', figureType: 'kingfisher_fish_3d', params: { variant: 0 } },
        tfStatements,
        answerSummary: 'a) Sai, b) ' + (aFirst ? 'Đúng' : 'Sai') + ', c) Sai, d) Đúng',
        solutionSteps: [
          'a) Sai. $AC = ' + AC + '$ m và $BC = ' + BC + '$ m nên $BC > AC$.',
          'b) ' + (aFirst ? 'Đúng.' : 'Sai.') + ' Thời gian bay của $A$ là $t_A = ' + tA + '$ s; thời gian để $B$ đến mục tiêu tính từ lúc $A$ bay là $' + tB.toFixed(2).replace('.', ',') + ' + ' + t0 + ' > ' + tA + '$ s.',
          'c) Sai. Tọa độ điểm chuyển hướng $D = A + \\dfrac{' + tTurn + '}{' + tA + '}\\overrightarrow{AC} = ' + u.formatCoord3D(dX.value, dY, dZ) + '$.',
          'd) Đúng. Sau $' + tFly2 + '$ giây chim ở $E' + u.formatCoord3D(eX, eY, eZ) + '$, khoảng cách $AE \\approx ' + aeStr + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kA >= kB', params: { xC: -3, yC: 4, kA: 6, kB: 6, t0: 2, ux: 1, uy: 3, uz: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45 A(2;-16;40), B(21;28;42), C(-3;4;0)', params: { xC: -3, yC: 4, kA: 5, kB: 6, t0: 2, ux: 1, uy: 3, uz: 2 }, expectedValid: true },
    ],
  },

  // Dạng 46 (Q46): Cabin cáp treo chuyển động thẳng đều và khoảng cách tới người quan sát
  t12_b8_d46_cable_car_tf: {
    id: 't12_b8_d46_cable_car_tf',
    name: 'Bài toán chuyển động thẳng đều của cabin cáp treo trong hệ trục Oxyz',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Chuyển động thẳng đều theo vectơ chỉ phương',
    description: 'Người đứng tại N quan sát cabin xuất phát từ P chuyển động theo hướng u với vận tốc v m/s. Xét quãng đường, |u|, vectơ PC và khoảng cách NC sau t giây.',
    conditionSummary: 'u có độ dài nguyên dương từ bộ Pytago và khoảng cách NC không sát biên làm tròn hàng đơn vị',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -6, max: 3 },
      { name: 'yN', label: 'y_N', min: -6, max: 3 },
      { name: 'zN', label: 'z_N', min: 1, max: 6 },
      { name: 'xP', label: 'x_P', min: -3, max: 5 },
      { name: 'yP', label: 'y_P', min: -5, max: 4 },
      { name: 'zP', label: 'z_P', min: 1, max: 6 },
      { name: 'uIdx', label: 'Bộ hướng Pytago (0..3)', min: 0, max: 3 },
      { name: 'kv', label: 'Hệ số vận tốc v/|u|', min: 1, max: 2 },
      { name: 't', label: 'Thời gian t (giây)', min: 3, max: 7 },
    ],
    validateCode: `
      const { xN, yN, zN, xP, yP, zP, uIdx, kv, t } = params;
      const dirs = [
        [0, -3, 4],
        [2, 3, 6],
        [1, 4, 8],
        [-3, 0, 4],
      ];
      const uVec = dirs[uIdx] || dirs[0];
      const scale = kv * t;
      const xC = xP + scale * uVec[0], yC = yP + scale * uVec[1], zC = zP + scale * uVec[2];
      const nc = Math.sqrt(Math.pow(xN - xC, 2) + Math.pow(yN - yC, 2) + Math.pow(zN - zC, 2));
      if (Math.abs(nc - Math.floor(nc) - 0.5) < 0.04) {
        return { valid: false, reason: 'Khoảng cách NC gần ranh giới làm tròn hàng đơn vị' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN, xP, yP, zP, uIdx, kv, t } = params;
      const dirs = [
        { vec: [0, -3, 4], len: 5 },
        { vec: [2, 3, 6], len: 7 },
        { vec: [1, 4, 8], len: 9 },
        { vec: [-3, 0, 4], len: 5 },
      ];
      const cfg = dirs[uIdx] || dirs[0];
      const uVec = cfg.vec;
      const uLen = cfg.len;
      const v = kv * uLen;
      const distPC = v * t;
      const kVec = kv * t;
      const xC = xP + kVec * uVec[0], yC = yP + kVec * uVec[1], zC = zP + kVec * uVec[2];
      const nc = Math.round(Math.sqrt(Math.pow(xN - xC, 2) + Math.pow(yN - yC, 2) + Math.pow(zN - zC, 2)));
      const tfStatements = [
        { key: 'a', text: 'Sau $' + t + '$ giây, cabin cách vị trí xuất phát $' + distPC + '$ m.', isTrue: true },
        { key: 'b', text: 'Độ dài vectơ $\\overrightarrow{u}$ bằng $' + uLen + '$.', isTrue: true },
        { key: 'c', text: 'Gọi $C$ là vị trí cabin sau $' + t + '$ giây. Khi đó $\\overrightarrow{PC} = ' + kVec + '\\overrightarrow{u}$.', isTrue: true },
        { key: 'd', text: 'Khoảng cách giữa cabin và người quan sát sau $' + t + '$ giây bằng $' + nc + '$ m.', isTrue: true },
      ];
      return {
        stem:
          'Tại một vị trí cụ thể ở một ngọn núi người ta đặt cố định một hệ trục tọa độ $Oxyz$, mỗi đơn vị trên mỗi trục có độ dài bằng $1$ mét. Một người đứng cố định tại vị trí $N' +
          u.formatCoord3D(xN, yN, zN) +
          '$, quan sát một chiếc cabin cáp treo và thấy cabin này xuất phát từ điểm $P' +
          u.formatCoord3D(xP, yP, zP) +
          '$, chuyển động thẳng đều theo hướng của vectơ $\\overrightarrow{u} = ' +
          u.formatCoord3D(uVec[0], uVec[1], uVec[2]) +
          '$ với vận tốc $' +
          v +
          '$ mét/giây. Xét tính đúng-sai của các khẳng định sau (làm tròn kết quả đến hàng đơn vị):',
        tfStatements,
        answerSummary: 'a) Đúng, b) Đúng, c) Đúng, d) Đúng',
        solutionSteps: [
          'a) Đúng. Quãng đường $PC = ' + v + '\\cdot ' + t + ' = ' + distPC + '$ m.',
          'b) Đúng. $|\\overrightarrow{u}| = \\sqrt{(' + uVec[0] + ')^2 + (' + uVec[1] + ')^2 + (' + uVec[2] + ')^2} = ' + uLen + '$.',
          'c) Đúng. $\\overrightarrow{PC} = \\dfrac{' + distPC + '}{' + uLen + '}\\overrightarrow{u} = ' + kVec + '\\overrightarrow{u}$.',
          'd) Đúng. $C = P + ' + kVec + '\\overrightarrow{u} = ' + u.formatCoord3D(xC, yC, zC) + ' \\Rightarrow NC \\approx ' + nc + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chỉ số uIdx hợp lệ', params: { xN: -3, yN: -4, zN: 3, xP: 2, yP: -3, zP: 4, uIdx: 0, kv: 1, t: 4 }, expectedValid: true },
      { label: 'Biên kv = 2', params: { xN: 0, yN: 0, zN: 2, xP: 1, yP: 1, zP: 1, uIdx: 1, kv: 2, t: 3 }, expectedValid: true },
    ],
  },
};
