import { MathTemplate } from '../types/math';

export const G12_B14_TF_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 22 (Q22): Khảo sát tổng hợp mặt phẳng (VTPT, điểm thuộc, khoảng cách, góc giữa hai mặt phẳng)
  t12_b14_d22_plane_props_dist_angle_tf: {
    id: 't12_b14_d22_plane_props_dist_angle_tf',
    name: 'Xét tính đúng sai tổng hợp: VTPT, điểm thuộc, khoảng cách và góc giữa hai mặt phẳng',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho mặt phẳng (β), xét 4 mệnh đề về VTPT, điểm không thuộc mặt phẳng, khoảng cách d(F,(β)) và góc giữa (β) và (R).',
    conditionSummary: 'n_β không cùng phương và không vuông góc với n_R; góc làm tròn 0,1 độ không rơi ranh giới .x5',
    paramSpecs: [
      { name: 'a', label: 'A', min: 3, max: 15 },
      { name: 'b', label: 'B', min: 2, max: 12 },
      { name: 'c', label: 'C', min: 1, max: 7 },
      { name: 'd', label: 'D', min: 5, max: 30 },
      { name: 'xF', label: 'xF', min: 1, max: 8 },
      { name: 'yF', label: 'yF', min: 1, max: 8 },
      { name: 'zF', label: 'zF', min: 1, max: 8 },
      { name: 'swap', label: 'Chế độ Đúng/Sai ý b,d (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, c } = params;
      const a2 = 3, b2 = -1, c2 = -1;
      const dot = Math.abs(a * a2 + b * b2 + c * c2);
      const n1 = Math.sqrt(a * a + b * b + c * c);
      const n2 = Math.sqrt(a2 * a2 + b2 * b2 + c2 * c2);
      const cosVal = dot / (n1 * n2);
      if (cosVal <= 0.05 || cosVal >= 0.99) return { valid: false, reason: 'Góc quá gần 0 hoặc 90 độ' };
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      const frac = Math.abs(((deg * 10) % 1) - 0.5);
      if (frac < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1 độ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, xF, yF, zF, swap } = params;
      const eqBeta = u.formatPlaneEq(a, b, c, d);
      const a2 = 3, b2 = -1, c2 = -1, d2 = -3;
      const eqR = u.formatPlaneEq(a2, b2, c2, d2);

      // Statement a: VTPT (always true or perturbed? Let's vary via swap bit 1)
      const aTrue = (swap & 1) === 0;
      const nATest = aTrue ? [a, b, c] : [a, b, -c];

      // Statement b: Point B not on plane
      const xB = -4, yB = 4, zB = -1;
      const valB = a * xB + b * yB + c * zB + d;
      const bNotOn = valB !== 0;

      // Statement c: Distance from F to (β)
      const numAbs = Math.abs(a * xF + b * yF + c * zF + d);
      const sInt = a * a + b * b + c * c;
      function fmtRad(topNum, sVal) {
        let rad = sVal, sq = 1;
        for (let f = 2; f * f <= rad; f++) {
          while (rad % (f * f) === 0) { rad /= f * f; sq *= f; }
        }
        const fr = u.simplifyFrac(topNum, sq * rad);
        if (rad === 1) return fr.latex;
        const top = (fr.num === 1 ? '' : '' + fr.num) + '\\sqrt{' + rad + '}';
        return fr.den === 1 ? top : '\\frac{' + top + '}{' + fr.den + '}';
      }
      const dTex = numAbs === 0 ? '0' : fmtRad(numAbs, sInt);

      // Statement d: Angle between (β) and (R)
      const dot = Math.abs(a * a2 + b * b2 + c * c2);
      const s2Int = a2 * a2 + b2 * b2 + c2 * c2;
      const degExact = (Math.acos(dot / Math.sqrt(sInt * s2Int)) * 180) / Math.PI;
      const degRounded = Number(degExact.toFixed(1));
      const dTrue = (swap & 2) === 0;
      const degDisplay = dTrue ? degRounded : Number((degRounded + 8.5).toFixed(1));
      const degStr = u.formatNumberVN(degDisplay, 1);
      const degExactStr = u.formatNumberVN(degRounded, 1);

      const mul = (k, v) => (k < 0 ? '(' + k + ')' : k) + '\\cdot ' + (v < 0 ? '(' + v + ')' : v);
      const numFExpr = mul(a, xF) + ' + ' + mul(b, yF) + ' + ' + mul(c, zF) + (d >= 0 ? ' + ' + d : ' - ' + Math.abs(d));

      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{n}=' + u.formatCoord3D(nATest[0], nATest[1], nATest[2]) + '$ là một vectơ pháp tuyến của $(\\beta)$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Điểm $B' + u.formatCoord3D(xB, yB, zB) + '$ không thuộc mặt phẳng $(\\beta)$.',
          isTrue: bNotOn,
        },
        {
          key: 'c',
          text: 'Khoảng cách từ điểm $F' + u.formatCoord3D(xF, yF, zF) + '$ đến mặt phẳng $(\\beta)$ bằng $' + dTex + '$.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Góc giữa mặt phẳng $(\\beta)$ và mặt phẳng $(R): ' + eqR + '$ bằng $' + degStr + '^\\circ$ (làm tròn đến hàng phần mười).',
          isTrue: dTrue,
        },
      ];

      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\beta)$ có phương trình $' + eqBeta + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Mặt phẳng $(\\beta)$ có vectơ pháp tuyến $\\overrightarrow{n_\\beta}=' + u.formatCoord3D(a, b, c) + '$.',
          'b) ' + (bNotOn ? 'Đúng' : 'Sai') + ': Thay $B' + u.formatCoord3D(xB, yB, zB) + '$ vào $(\\beta)$ được giá trị $' + valB + (bNotOn ? ' \\neq 0$ nên $B \\notin (\\beta)$.' : ' = 0$ nên $B \\in (\\beta)$.'),
          'c) Đúng: $d(F,(\\beta)) = \\dfrac{|' + numFExpr + '|}{\\sqrt{' + (a * a) + '+' + (b * b) + '+' + (c * c) + '}} = ' + dTex + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': $\\cos(\\beta, R) = \\dfrac{|' + dot + '|}{\\sqrt{' + sInt + '}\\cdot\\sqrt{' + s2Int + '}} \\Rightarrow (\\beta, R) \\approx ' + degExactStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cos quá lớn (hai VTPT gần trùng)', params: { a: 3, b: -1, c: -1, d: 5, xF: 1, yF: 1, zF: 1, swap: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22', params: { a: 15, b: 11, c: 5, d: 26, xF: 6, yF: 6, zF: 7, swap: 0 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23): VTPT, kiểm tra điểm thuộc, khoảng cách từ N, mặt phẳng song song qua H
  t12_b14_d23_plane_parallel_dist_tf: {
    id: 't12_b14_d23_plane_parallel_dist_tf',
    name: 'Xét tính đúng sai: VTPT, điểm thuộc, khoảng cách và mặt phẳng song song',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho mặt phẳng (α), kiểm tra VTPT, điểm thuộc (α), khoảng cách từ N và phương trình mặt phẳng song song với (α) đi qua H.',
    conditionSummary: 'I thuộc (α), N không thuộc (α), H không thuộc (α)',
    paramSpecs: [
      { name: 'a', label: 'A', min: -56, max: -4, step: 4 },
      { name: 'b', label: 'B', min: -15, max: -3 },
      { name: 'c', label: 'C', min: -12, max: -2 },
      { name: 'xI', label: 'xI', min: -3, max: 3 },
      { name: 'yI', label: 'yI', min: 1, max: 5 },
      { name: 'zI', label: 'zI', min: 1, max: 5 },
      { name: 'dxN', label: 'xN - xI', min: -5, max: -2 },
    ],
    validateCode: `
      const { a, b, c, xI, yI, zI, dxN } = params;
      if (a >= 0 || b >= 0 || c >= 0 || dxN === 0) return { valid: false, reason: 'Tham số không hợp lệ' };
      const d = -(a * xI + b * yI + c * zI);
      const xH = -1, yH = 4, zH = -2;
      const dR = -(a * xH + b * yH + c * zH);
      if (dR === d) return { valid: false, reason: 'H không được thuộc (α)' };
      const numAbs = Math.abs(a * (xI + dxN) + b * (yI - 3) + c * (zI - 7) + d);
      if (numAbs === 0) return { valid: false, reason: 'N không được thuộc (α)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, xI, yI, zI, dxN } = params;
      const d = -(a * xI + b * yI + c * zI);
      const eqAlpha = u.formatPlaneEq(a, b, c, d);
      const xN = xI + dxN, yN = yI - 3, zN = zI - 7;
      const numAbs = Math.abs(a * xN + b * yN + c * zN + d);
      const sInt = a * a + b * b + c * c;
      function fmtRad(topNum, sVal) {
        let rad = sVal, sq = 1;
        for (let f = 2; f * f <= rad; f++) {
          while (rad % (f * f) === 0) { rad /= f * f; sq *= f; }
        }
        const fr = u.simplifyFrac(topNum, sq * rad);
        if (rad === 1) return fr.latex;
        const top = (fr.num === 1 ? '' : '' + fr.num) + '\\sqrt{' + rad + '}';
        return fr.den === 1 ? top : '\\frac{' + top + '}{' + fr.den + '}';
      }
      const dTex = fmtRad(numAbs, sInt);
      const xH = -1, yH = 4, zH = -2;
      const dR = -(a * xH + b * yH + c * zH);
      const eqRTrue = u.formatPlaneEq(a, b, c, dR);
      const eqRFake = u.formatPlaneEq(a, b, c, dR + 3);
      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{n}=' + u.formatCoord3D(a, b, c) + '$ là một vectơ pháp tuyến của $(\\alpha)$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Điểm $I' + u.formatCoord3D(xI, yI, zI) + '$ không thuộc mặt phẳng $(\\alpha)$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Khoảng cách từ điểm $N' + u.formatCoord3D(xN, yN, zN) + '$ đến mặt phẳng $(\\alpha)$ bằng $' + dTex + '$.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Mặt phẳng $(R)$ qua điểm $H' + u.formatCoord3D(xH, yH, zH) + '$ và song song với $(\\alpha)$ có phương trình là $' + eqRFake + '$.',
          isTrue: false,
        },
      ];
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\alpha)$ có phương trình $' + eqAlpha + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a) Đúng; b) Sai; c) Đúng; d) Sai',
        solutionSteps: [
          'a) Đúng: $\\overrightarrow{n}=' + u.formatCoord3D(a, b, c) + '$ là một vectơ pháp tuyến của $(\\alpha)$.',
          'b) Sai: Thay tọa độ $I' + u.formatCoord3D(xI, yI, zI) + '$ vào $(\\alpha)$ được $0$ nên $I \\in (\\alpha)$.',
          'c) Đúng: $d(N,(\\alpha)) = \\dfrac{' + numAbs + '}{\\sqrt{' + sInt + '}} = ' + dTex + '$.',
          'd) Sai: Mặt phẳng $(R)$ qua $H' + u.formatCoord3D(xH, yH, zH) + '$ và song song $(\\alpha)$ phải có phương trình là $' + eqRTrue + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= 0', params: { a: 4, b: -11, c: -8, xI: -2, yI: 4, zI: 4, dxN: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23', params: { a: -56, b: -11, c: -8, xI: -2, yI: 4, zI: 4, dxN: -5 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24): VTPT sai, điểm thuộc, trùng nhau và mặt phẳng qua 2 điểm I, E vuông góc (α)
  t12_b14_d24_plane_coincident_perp_2pts_tf: {
    id: 't12_b14_d24_plane_coincident_perp_2pts_tf',
    name: 'Xét tính đúng sai: VTPT, điểm thuộc, hai mặt phẳng trùng nhau và mặt phẳng qua 2 điểm vuông góc (α)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho mặt phẳng (α), xét VTPT, điểm thuộc, mặt phẳng trùng nhau và lập phương trình mặt phẳng qua I, E vuông góc (α).',
    conditionSummary: 'n_α và IE không cùng phương, A thuộc (α), D != 0',
    paramSpecs: [
      { name: 'a', label: 'A', min: -8, max: -2 },
      { name: 'b', label: 'B', min: -9, max: -2 },
      { name: 'c', label: 'C', min: -9, max: -2 },
      { name: 'xA', label: 'xA', min: -5, max: 3 },
      { name: 'yA', label: 'yA', min: 1, max: 4 },
      { name: 'zA', label: 'zA', min: 1, max: 5 },
      { name: 'dx', label: 'xE - xI', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, b, c, xA, yA, zA, dx } = params;
      if (a >= 0 || b >= 0 || c >= 0) return { valid: false, reason: 'Cần A, B, C âm' };
      const dy = 3, dz = -8;
      const nx = b * dz - c * dy;
      const ny = c * dx - a * dz;
      const nz = a * dy - b * dx;
      if (nx === 0 && ny === 0 && nz === 0) return { valid: false, reason: 'n_α và IE cùng phương' };
      const d = -(a * xA + b * yA + c * zA);
      if (d === 0) return { valid: false, reason: 'Tránh D = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, xA, yA, zA, dx } = params;
      const d = -(a * xA + b * yA + c * zA);
      const eqAlpha = u.formatPlaneEq(a, b, c, d);
      const eqGammaCoin = u.formatPlaneEq(-a, -b, -c, -d);
      const xI = -3, yI = 1, zI = 5;
      const dy = 3, dz = -8;
      const xE = xI + dx, yE = yI + dy, zE = zI + dz;
      const nx0 = b * dz - c * dy;
      const ny0 = c * dx - a * dz;
      const nz0 = a * dy - b * dx;
      const g = u.gcd(nx0, u.gcd(ny0, nz0));
      const nx = nx0 / g, ny = ny0 / g, nz = nz0 / g;
      const dPerp = -(nx * xI + ny * yI + nz * zI);
      const eqPerp = u.formatPlaneEq(nx, ny, nz, dPerp);
      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{n}=' + u.formatCoord3D(a, b, c + 2) + '$ là một vectơ pháp tuyến của $(\\alpha)$.',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ thuộc mặt phẳng $(\\alpha)$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Mặt phẳng $(\\alpha)$ và mặt phẳng $(\\gamma): ' + eqGammaCoin + '$ trùng nhau.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Mặt phẳng $(\\gamma)$ đi qua hai điểm $I' + u.formatCoord3D(xI, yI, zI) + '$, $E' + u.formatCoord3D(xE, yE, zE) + '$ và vuông góc với $(\\alpha)$ có phương trình là $' + eqPerp + '$.',
          isTrue: true,
        },
      ];
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\alpha)$ có phương trình $' + eqAlpha + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a) Sai; b) Đúng; c) Đúng; d) Đúng',
        solutionSteps: [
          'a) Sai: Vectơ pháp tuyến đúng của $(\\alpha)$ là $' + u.formatCoord3D(a, b, c) + '$, không cùng phương với $' + u.formatCoord3D(a, b, c + 2) + '$.',
          'b) Đúng: Thay tọa độ $A' + u.formatCoord3D(xA, yA, zA) + '$ vào phương trình $(\\alpha)$ được $0$ nên $A \\in (\\alpha)$.',
          'c) Đúng: Nhân hai vế phương trình $(\\alpha)$ với $-1$ thu được phương trình $(\\gamma)$, nên hai mặt phẳng trùng nhau.',
          'd) Đúng: Ta có $\\overrightarrow{n_\\alpha}=' + u.formatCoord3D(a, b, c) + '$, $\\overrightarrow{IE}=' + u.formatCoord3D(dx, dy, dz) + '\\Rightarrow [\\overrightarrow{n_\\alpha}, \\overrightarrow{IE}]=' + u.formatCoord3D(nx0, ny0, nz0) + '$ cùng phương với $' + u.formatCoord3D(nx, ny, nz) + '$. Suy ra $(\\gamma): ' + eqPerp + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { a: -2, b: -2, c: -2, xA: 1, yA: 1, zA: -2, dx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24', params: { a: -6, b: -7, c: -7, xA: -5, yA: 1, zA: 5, dx: 5 }, expectedValid: true },
    ],
  },

  // Dạng 25 (Q25): Phủ định VTPT, điểm không thuộc, trùng nhau và tìm tổng a+b+c của mặt phẳng vuông góc qua 2 điểm
  t12_b14_d25_plane_perp_2pts_sum_tf: {
    id: 't12_b14_d25_plane_perp_2pts_sum_tf',
    name: 'Xét tính đúng sai: VTPT, điểm thuộc, trùng nhau và tổng hệ số a+b+c của mặt phẳng vuông góc qua 2 điểm',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho mặt phẳng (γ), xét các mệnh đề và tìm tổng hệ số a + b + c của mặt phẳng (β) đi qua G, N và vuông góc (γ).',
    conditionSummary: 'n_γ và GN không cùng phương, hằng số tự do D_perp != 0',
    paramSpecs: [
      { name: 'a', label: 'A', min: 1, max: 5 },
      { name: 'b', label: 'B', min: 2, max: 9 },
      { name: 'c', label: 'C', min: 3, max: 12 },
      { name: 'd', label: 'D', min: -30, max: -10 },
      { name: 'dx', label: 'xN - xG', min: -6, max: -2 },
      { name: 'dy', label: 'yN - yG', min: 1, max: 5 },
    ],
    validateCode: `
      const { a, b, c, d, dx, dy } = params;
      if (d === 0) return { valid: false, reason: 'D khác 0' };
      const dz = 0;
      const nx = b * dz - c * dy;
      const ny = c * dx - a * dz;
      const nz = a * dy - b * dx;
      if (nx === 0 && ny === 0 && nz === 0) return { valid: false, reason: 'VTCP trùng VTPT' };
      const xG = 4, yG = 1, zG = 1;
      const dPerp = -(nx * xG + ny * yG + nz * zG);
      if (dPerp === 0) return { valid: false, reason: 'Tránh D_perp = 0' };
      // Check point A(3,1,2) not on plane
      if (a * 3 + b * 1 + c * 2 + d === 0) return { valid: false, reason: 'Điểm A(3;1;2) không được thuộc (γ)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, dx, dy } = params;
      const eqGamma = u.formatPlaneEq(a, b, c, d);
      const eqBetaCoin = u.formatPlaneEq(-2 * a, -2 * b, -2 * c, -2 * d);
      const xG = 4, yG = 1, zG = 1, dz = 0;
      const xN = xG + dx, yN = yG + dy, zN = zG + dz;
      const nx = b * dz - c * dy;
      const ny = c * dx - a * dz;
      const nz = a * dy - b * dx;
      const dPerp = -(nx * xG + ny * yG + nz * zG);
      const eqPerp = u.formatPlaneEq(nx, ny, nz, dPerp);
      const sumABC = nx + ny + nz;
      const dPerpStr = dPerp >= 0 ? '+ ' + dPerp : '- ' + Math.abs(dPerp);
      const fakeN = u.formatCoord3D(-a, -b, -c + 2);
      const valA = a * 3 + b * 1 + c * 2 + d;
      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{n}=' + fakeN + '$ không là một vectơ pháp tuyến của $(\\gamma)$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Điểm $A(3;\\, 1;\\, 2)$ thuộc mặt phẳng $(\\gamma)$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Mặt phẳng $(\\gamma)$ và mặt phẳng $(\\beta): ' + eqBetaCoin + '$ trùng nhau.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Mặt phẳng $(\\beta)$ đi qua hai điểm $G' + u.formatCoord3D(xG, yG, zG) + '$, $N' + u.formatCoord3D(xN, yN, zN) + '$ và vuông góc với $(\\gamma)$ có phương trình dạng $ax+by+cz' + dPerpStr + '=0$. Khi đó $a+b+c=' + sumABC + '$.',
          isTrue: true,
        },
      ];
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\gamma)$ có phương trình $' + eqGamma + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a) Đúng; b) Sai; c) Đúng; d) Đúng',
        solutionSteps: [
          'a) Đúng: $\\overrightarrow{n_\\gamma}=' + u.formatCoord3D(a, b, c) + '$ không cùng phương với $' + fakeN + '$.',
          'b) Sai: Thay $A(3;1;2)$ vào phương trình $(\\gamma)$ được $' + valA + ' \\neq 0$ nên $A \\notin (\\gamma)$.',
          'c) Đúng: Nhân phương trình $(\\gamma)$ với $-2$ được đúng phương trình $(\\beta)$ nên hai mặt phẳng trùng nhau.',
          'd) Đúng: $[\\overrightarrow{n_\\gamma}, \\overrightarrow{GN}]=' + u.formatCoord3D(nx, ny, nz) + ' \\Rightarrow (\\beta): ' + eqPerp + '$, suy ra $a+b+c = ' + sumABC + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A(3;1;2) nằm trên (γ)', params: { a: 2, b: 8, c: 11, d: -36, dx: -5, dy: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25', params: { a: 2, b: 8, c: 11, d: -25, dx: -5, dy: 2 }, expectedValid: true },
    ],
  },
};
