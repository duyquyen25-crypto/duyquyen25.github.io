import { MathTemplate } from '../types/math';

export const G12_B14_SA_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 26 (Q26): Khoảng cách từ điểm A đến mặt phẳng đi qua 3 điểm trên 3 trục tọa độ
  t12_b14_d26_dist_to_intercept_plane_sa: {
    id: 't12_b14_d26_dist_to_intercept_plane_sa',
    name: 'Khoảng cách từ điểm đến mặt phẳng đoạn chắn đi qua 3 điểm trên 3 trục',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách trong không gian',
    description: 'Cho H(a;0;0), E(0;b;0), B(0;0;c) và điểm A. Tính d(A, (HEB)) làm tròn hàng phần mười.',
    conditionSummary: 'a, b, c != 0; A không thuộc (HEB); kết quả không nằm sát ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ H(a;0;0)', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Tung độ E(0;b;0)', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Cao độ B(0;0;c)', min: -6, max: 6, allowZero: false },
      { name: 'xA', label: 'xA', min: -4, max: 4 },
      { name: 'yA', label: 'yA', min: -4, max: 4 },
      { name: 'zA', label: 'zA', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, c, xA, yA, zA } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'a, b, c phải khác 0' };
      const A0 = b * c, B0 = a * c, C0 = a * b, D0 = -a * b * c;
      const g = u.gcd(A0, u.gcd(B0, u.gcd(C0, D0)));
      const A = A0 / g, B = B0 / g, C = C0 / g, D = D0 / g;
      const num = Math.abs(A * xA + B * yA + C * zA + D);
      if (num === 0) return { valid: false, reason: 'A thuộc mặt phẳng (HEB)' };
      const val = num / Math.sqrt(A * A + B * B + C * C);
      const frac = Math.abs(((val * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, xA, yA, zA } = params;
      const A0 = b * c, B0 = a * c, C0 = a * b, D0 = -a * b * c;
      const g = u.gcd(A0, u.gcd(B0, u.gcd(C0, D0)));
      const A = A0 / g, B = B0 / g, C = C0 / g, D = D0 / g;
      const numAbs = Math.abs(A * xA + B * yA + C * zA + D);
      const sInt = A * A + B * B + C * C;
      const dist = numAbs / Math.sqrt(sInt);
      const rounded = Number(dist.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eq = u.formatPlaneEq(A, B, C, D);
      return {
        stem: 'Trong không gian $Oxyz$, cho các điểm $H' + u.formatCoord3D(a, 0, 0) + '$, $E' + u.formatCoord3D(0, b, 0) + '$, $B' + u.formatCoord3D(0, 0, c) + '$. Tính khoảng cách từ điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ đến mặt phẳng $(HEB)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Mặt phẳng $(HEB)$ có phương trình đoạn chắn $\\dfrac{x}{' + a + '} + \\dfrac{y}{' + b + '} + \\dfrac{z}{' + c + '} = 1 \\Leftrightarrow ' + eq + '$.',
          'Khoảng cách cần tìm: $d(A,(HEB)) = \\dfrac{' + numAbs + '}{\\sqrt{' + sInt + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -5, c: 3, xA: -2, yA: -1, zA: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26', params: { a: -3, b: -5, c: 3, xA: -2, yA: -1, zA: -3 }, expectedValid: true },
    ],
  },

  // Dạng 27 (Q27): Tìm a + b + c của mặt phẳng (P) qua M và song song (Q)
  t12_b14_d27_parallel_plane_sum_coeff_sa: {
    id: 't12_b14_d27_parallel_plane_sum_coeff_sa',
    name: 'Tìm tổng hệ số mặt phẳng qua M song song với mặt phẳng (Q)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Mặt phẳng (P) đi qua M và song song (Q): A0*x + B0*y + C0*z + D0 = 0 có dạng A0*x + a*y + b*z + c = 0. Tính a + b + c.',
    conditionSummary: 'A0 > 0, M không thuộc (Q)',
    paramSpecs: [
      { name: 'A0', label: 'Hệ số A0', min: 2, max: 16 },
      { name: 'B0', label: 'Hệ số B0', min: -25, max: 25, allowZero: false },
      { name: 'C0', label: 'Hệ số C0', min: -12, max: 12, allowZero: false },
      { name: 'D0', label: 'Hệ số tự do D0', min: -30, max: 70 },
      { name: 'xM', label: 'xM', min: -5, max: 6 },
      { name: 'yM', label: 'yM', min: -5, max: 6 },
      { name: 'zM', label: 'zM', min: -5, max: 6 },
    ],
    validateCode: `
      const { A0, B0, C0, D0, xM, yM, zM } = params;
      if (A0 <= 0 || B0 === 0 || C0 === 0) return { valid: false, reason: 'Hệ số không hợp lệ' };
      const c = -(A0 * xM + B0 * yM + C0 * zM);
      if (c === D0) return { valid: false, reason: 'M thuộc (Q)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A0, B0, C0, D0, xM, yM, zM } = params;
      const c = -(A0 * xM + B0 * yM + C0 * zM);
      const ans = B0 + C0 + c;
      const shortAnswer = String(ans);
      const eqQ = u.formatPlaneEq(A0, B0, C0, D0);
      const eqP = u.formatPlaneEq(A0, B0, C0, c);
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(Q)$ có phương trình $' + eqQ + '$. Mặt phẳng $(P)$ đi qua điểm $M' + u.formatCoord3D(xM, yM, zM) + '$ và song song với $(Q)$ có phương trình dạng $' + A0 + 'x+ay+bz+c=0$. Tính $a+b+c$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Mặt phẳng $(P) \\parallel (Q)$ nên nhận $\\overrightarrow{n_Q}=' + u.formatCoord3D(A0, B0, C0) + '$ làm vectơ pháp tuyến.',
          'Vì $(P)$ đi qua $M' + u.formatCoord3D(xM, yM, zM) + '$ nên $(P): ' + eqP + '$.',
          'Suy ra $a = ' + B0 + ',\\, b = ' + C0 + ',\\, c = ' + c + ' \\Rightarrow a + b + c = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M thuộc (Q)', params: { A0: 2, B0: 3, C0: 4, D0: -9, xM: 1, yM: 1, zM: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27', params: { A0: 14, B0: -21, C0: 9, D0: 62, xM: 4, yM: 3, zM: -3 }, expectedValid: true },
    ],
  },

  // Dạng 28 (Q28): Mặt phẳng qua 2 điểm G, D và vuông góc (P), tính a + b + c
  t12_b14_d28_plane_2pts_perp_sum_sa: {
    id: 't12_b14_d28_plane_2pts_perp_sum_sa',
    name: 'Tìm tổng hệ số a + b + c của mặt phẳng qua 2 điểm và vuông góc mặt phẳng (P)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Mặt phẳng (α) qua hai điểm G, D và vuông góc (P) có dạng ax + by + cz + D1 = 0. Tính a + b + c.',
    conditionSummary: 'n_P và GD không cùng phương, hằng số tự do D1 != 0',
    paramSpecs: [
      { name: 'aP', label: 'A_P', min: 1, max: 5 },
      { name: 'bP', label: 'B_P', min: 1, max: 7 },
      { name: 'cP', label: 'C_P', min: 1, max: 6 },
      { name: 'dx', label: 'xD - xG', min: -4, max: 4, allowZero: false },
      { name: 'dz', label: 'zD - zG', min: 1, max: 6 },
      { name: 'xG', label: 'xG', min: -4, max: 4 },
      { name: 'yG', label: 'yG', min: 1, max: 6 },
      { name: 'zG', label: 'zG', min: -4, max: 4 },
    ],
    validateCode: `
      const { aP, bP, cP, dx, dz, xG, yG, zG } = params;
      const dy = 0;
      const nx = bP * dz - cP * dy;
      const ny = cP * dx - aP * dz;
      const nz = aP * dy - bP * dx;
      if (nx === 0 && ny === 0 && nz === 0) return { valid: false, reason: 'Vectơ chỉ phương trùng VTPT' };
      const g = u.gcd(nx, u.gcd(ny, nz));
      const a = nx / g, b = ny / g, c = nz / g;
      const d1 = -(a * xG + b * yG + c * zG);
      if (d1 === 0) return { valid: false, reason: 'Tránh hằng số tự do bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aP, bP, cP, dx, dz, xG, yG, zG } = params;
      const dy = 0;
      const xD = xG + dx, yD = yG + dy, zD = zG + dz;
      const nx = bP * dz - cP * dy;
      const ny = cP * dx - aP * dz;
      const nz = aP * dy - bP * dx;
      const g = u.gcd(nx, u.gcd(ny, nz));
      // Keep canonical orientation when g=1 (or reduce cleanly by g)
      const a = nx / g, b = ny / g, c = nz / g;
      const d1 = -(a * xG + b * yG + c * zG);
      const dSign = d1 >= 0 ? '+ ' + d1 : '- ' + Math.abs(d1);
      const ans = a + b + c;
      const shortAnswer = String(ans);
      const eqP = u.formatPlaneEq(aP, bP, cP, -22);
      const eqAlpha = u.formatPlaneEq(a, b, c, d1);
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(P)$ có phương trình $' + eqP + '$. Mặt phẳng $(\\alpha)$ đi qua hai điểm $G' + u.formatCoord3D(xG, yG, zG) + '$, $D' + u.formatCoord3D(xD, yD, zD) + '$ và vuông góc với $(P)$ có phương trình dạng $ax+by+cz' + dSign + '=0$. Tính $a+b+c$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{n_P}=' + u.formatCoord3D(aP, bP, cP) + '$ và $\\overrightarrow{GD}=' + u.formatCoord3D(dx, dy, dz) + '$.',
          'Mặt phẳng $(\\alpha)$ có vectơ pháp tuyến $\\overrightarrow{n}=\\left[\\overrightarrow{n_P}, \\overrightarrow{GD}\\right]=' + u.formatCoord3D(nx, ny, nz) + '$ (cùng phương với $' + u.formatCoord3D(a, b, c) + '$).',
          'Phương trình $(\\alpha): ' + eqAlpha + '$, suy ra $a+b+c = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mặt phẳng qua O', params: { aP: 1, bP: 6, cP: 3, dx: -1, dz: 4, xG: 0, yG: 0, zG: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28', params: { aP: 1, bP: 6, cP: 3, dx: -1, dz: 4, xG: -1, yG: 5, zG: -2 }, expectedValid: true },
    ],
  },

  // Dạng 29 (Q29): Mặt phẳng qua G, D và song song đường thẳng IN, tính a + b + c
  t12_b14_d29_plane_2pts_parallel_line_sa: {
    id: 't12_b14_d29_plane_2pts_parallel_line_sa',
    name: 'Tìm tổng hệ số mặt phẳng qua 2 điểm và song song với đường thẳng IN',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Mặt phẳng (α) qua G, D và song song đường thẳng IN có phương trình dạng kx + ay + bz + c = 0. Tính a + b + c.',
    conditionSummary: 'GD và IN không cùng phương; thành phần x của VTPT rút gọn khác 0',
    paramSpecs: [
      { name: 'xG', label: 'xG', min: -2, max: 4 },
      { name: 'yG', label: 'yG', min: -2, max: 5 },
      { name: 'zG', label: 'zG', min: -2, max: 4 },
      { name: 'gdX', label: 'xD - xG', min: -6, max: -1 },
      { name: 'gdY', label: 'yD - yG', min: -3, max: 3, allowZero: false },
      { name: 'gdZ', label: 'zD - zG', min: 1, max: 4 },
      { name: 'inX', label: 'xN - xI', min: -5, max: -1 },
      { name: 'inY', label: 'yN - yI', min: 1, max: 4 },
    ],
    validateCode: `
      const { gdX, gdY, gdZ, inX, inY } = params;
      if (gdY === 0) return { valid: false, reason: 'gdY khác 0' };
      const inZ = 0;
      const nx0 = gdY * inZ - gdZ * inY;
      const ny0 = gdZ * inX - gdX * inZ;
      const nz0 = gdX * inY - gdY * inX;
      if (nx0 === 0) return { valid: false, reason: 'Cần thành phần x của VTPT khác 0' };
      if (nx0 === 0 && ny0 === 0 && nz0 === 0) return { valid: false, reason: 'GD và IN cùng phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xG, yG, zG, gdX, gdY, gdZ, inX, inY } = params;
      const inZ = 0;
      const xD = xG + gdX, yD = yG + gdY, zD = zG + gdZ;
      const xI = 4, yI = -1, zI = 1;
      const xN = xI + inX, yN = yI + inY, zN = zI + inZ;
      const nx0 = gdY * inZ - gdZ * inY;
      const ny0 = gdZ * inX - gdX * inZ;
      const nz0 = gdX * inY - gdY * inX;
      const g = u.gcd(nx0, u.gcd(ny0, nz0));
      let A = nx0 / g, B = ny0 / g, C = nz0 / g;
      if (A > 0 && nx0 < 0) { A = -A; B = -B; C = -C; }
      const D = -(A * xG + B * yG + C * zG);
      const ans = B + C + D;
      const shortAnswer = String(ans);
      const leadX = A === 1 ? 'x' : A === -1 ? '-x' : A + 'x';
      const eq = u.formatPlaneEq(A, B, C, D);
      return {
        stem: 'Trong không gian $Oxyz$, mặt phẳng $(\\alpha)$ qua hai điểm $G' + u.formatCoord3D(xG, yG, zG) + '$, $D' + u.formatCoord3D(xD, yD, zD) + '$ và song song với đường thẳng đi qua hai điểm $I' + u.formatCoord3D(xI, yI, zI) + '$, $N' + u.formatCoord3D(xN, yN, zN) + '$ có phương trình dạng $' + leadX + '+ay+bz+c=0$. Tính $a+b+c$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{GD}=' + u.formatCoord3D(gdX, gdY, gdZ) + '$ và $\\overrightarrow{IN}=' + u.formatCoord3D(inX, inY, inZ) + '$.',
          'Mặt phẳng $(\\alpha)$ nhận $\\overrightarrow{n} = \\left[\\overrightarrow{GD}, \\overrightarrow{IN}\\right] = ' + u.formatCoord3D(nx0, ny0, nz0) + '$ (cùng phương với $' + u.formatCoord3D(A, B, C) + '$) làm vectơ pháp tuyến.',
          'Phương trình $(\\alpha): ' + eq + '$, suy ra $a=' + B + ',\\, b=' + C + ',\\, c=' + D + ' \\Rightarrow a+b+c=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên gdY = 0', params: { xG: 2, yG: 3, zG: 1, gdX: -5, gdY: 0, gdZ: 2, inX: -4, inY: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29', params: { xG: 2, yG: 3, zG: 1, gdX: -5, gdY: -1, gdZ: 2, inX: -4, inY: 2 }, expectedValid: true },
    ],
  },

  // Dạng 30 (Q30): Mặt phẳng qua G chứa trục Oz, tính khoảng cách từ B đến mặt phẳng
  t12_b14_d30_dist_plane_contain_oz_sa: {
    id: 't12_b14_d30_dist_plane_contain_oz_sa',
    name: 'Khoảng cách từ điểm B đến mặt phẳng qua điểm G và chứa trục Oz',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách trong không gian',
    description: 'Mặt phẳng (α) qua G và chứa trục Oz. Tính khoảng cách từ B đến (α) làm tròn hàng phần mười.',
    conditionSummary: 'G không nằm trên Oz (xG^2 + yG^2 > 0), kết quả không rơi sát .x5',
    paramSpecs: [
      { name: 'xG', label: 'xG', min: 1, max: 7 },
      { name: 'yG', label: 'yG', min: -6, max: 6, allowZero: false },
      { name: 'zG', label: 'zG', min: -5, max: 6 },
      { name: 'xB', label: 'xB', min: 1, max: 8 },
      { name: 'yB', label: 'yB', min: -6, max: 6 },
      { name: 'zB', label: 'zB', min: -5, max: 5 },
    ],
    validateCode: `
      const { xG, yG, xB, yB } = params;
      if (yG === 0 || (xG === 0 && yG === 0)) return { valid: false, reason: 'G nằm trên Oz' };
      const num = Math.abs(yG * xB - xG * yB);
      if (num === 0) return { valid: false, reason: 'B thuộc (α)' };
      const val = num / Math.sqrt(xG * xG + yG * yG);
      const frac = Math.abs(((val * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xG, yG, zG, xB, yB, zB } = params;
      const g = u.gcd(yG, xG);
      const a = yG / g, b = -xG / g;
      const eq = u.formatPlaneEq(a, b, 0, 0);
      const numAbs = Math.abs(a * xB + b * yB);
      const sInt = a * a + b * b;
      const dist = numAbs / Math.sqrt(sInt);
      const rounded = Number(dist.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Trong không gian $Oxyz$, cho hai điểm $G' + u.formatCoord3D(xG, yG, zG) + '$, $B' + u.formatCoord3D(xB, yB, zB) + '$. Mặt phẳng $(\\alpha)$ qua $G$ và chứa trục $Oz$. Tính khoảng cách từ điểm $B$ đến mặt phẳng $(\\alpha)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{OG}=' + u.formatCoord3D(xG, yG, zG) + '$ và $\\overrightarrow{k}=(0;0;1)$.',
          'Mặt phẳng $(\\alpha)$ nhận $\\overrightarrow{n}=[\\overrightarrow{OG}, \\overrightarrow{k}]=' + u.formatCoord3D(yG, -xG, 0) + '$ (cùng phương với $' + u.formatCoord3D(a, b, 0) + '$) làm VTPT nên $(\\alpha): ' + eq + '$.',
          'Khoảng cách cần tìm: $d(B,(\\alpha)) = \\dfrac{' + numAbs + '}{\\sqrt{' + sInt + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B thuộc (α)', params: { xG: 4, yG: 4, zG: 5, xB: 2, yB: 2, zB: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30', params: { xG: 4, yG: 4, zG: 5, xB: 6, yB: -2, zB: 0 }, expectedValid: true },
    ],
  },

  // Dạng 31 (Q31): Mặt phẳng qua A, E song song Oy, tính khoảng cách từ H
  t12_b14_d31_dist_plane_parallel_oy_sa: {
    id: 't12_b14_d31_dist_plane_parallel_oy_sa',
    name: 'Khoảng cách từ điểm H đến mặt phẳng qua 2 điểm A, E và song song trục Oy',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách trong không gian',
    description: 'Mặt phẳng (R) qua A, E và song song trục Oy. Tính khoảng cách từ H đến (R) làm tròn hàng phần mười.',
    conditionSummary: 'AE không song song Oy (dx^2 + dz^2 > 0), H không thuộc (R)',
    paramSpecs: [
      { name: 'xA', label: 'xA', min: 1, max: 8 },
      { name: 'yA', label: 'yA', min: -5, max: 5 },
      { name: 'zA', label: 'zA', min: 1, max: 7 },
      { name: 'dx', label: 'xE - xA', min: -9, max: -2 },
      { name: 'dz', label: 'zE - zA', min: -7, max: -1 },
      { name: 'xH', label: 'xH', min: -4, max: 6 },
      { name: 'zH', label: 'zH', min: -4, max: 7 },
    ],
    validateCode: `
      const { xA, zA, dx, dz, xH, zH } = params;
      if (dx === 0 && dz === 0) return { valid: false, reason: 'AE song song Oy' };
      const g = u.gcd(dz, dx);
      const a = -dz / g, c = dx / g;
      const d = -(a * xA + c * zA);
      const num = Math.abs(a * xH + c * zH + d);
      if (num === 0) return { valid: false, reason: 'H thuộc (R)' };
      const val = num / Math.sqrt(a * a + c * c);
      const frac = Math.abs(((val * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, dx, dz, xH, zH } = params;
      const dy = -3, yH = 2;
      const xE = xA + dx, yE = yA + dy, zE = zA + dz;
      const nx0 = -dz, nz0 = dx;
      const g = u.gcd(nx0, nz0);
      let a = nx0 / g, c = nz0 / g;
      if (a < 0) { a = -a; c = -c; }
      const d = -(a * xA + c * zA);
      const eq = u.formatPlaneEq(a, 0, c, d);
      const numAbs = Math.abs(a * xH + c * zH + d);
      const sInt = a * a + c * c;
      const dist = numAbs / Math.sqrt(sInt);
      const rounded = Number(dist.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Trong không gian $Oxyz$, cho các điểm $A' + u.formatCoord3D(xA, yA, zA) + '$, $E' + u.formatCoord3D(xE, yE, zE) + '$, $H' + u.formatCoord3D(xH, yH, zH) + '$. Mặt phẳng $(R)$ qua $A, E$ và song song $Oy$. Tính khoảng cách từ điểm $H$ đến mặt phẳng $(R)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{AE}=' + u.formatCoord3D(dx, dy, dz) + '$ và $\\overrightarrow{j}=(0;1;0)$.',
          'Mặt phẳng $(R)$ nhận $\\overrightarrow{n}=[\\overrightarrow{AE}, \\overrightarrow{j}]=' + u.formatCoord3D(nx0, 0, nz0) + '$ (cùng phương với $' + u.formatCoord3D(a, 0, c) + '$) làm VTPT nên $(R): ' + eq + '$.',
          'Khoảng cách từ $H$ đến $(R)$ là $d(H,(R)) = \\dfrac{' + numAbs + '}{\\sqrt{' + sInt + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên H thuộc (R)', params: { xA: 6, yA: -2, zA: 5, dx: -9, dz: -6, xH: 6, zH: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31', params: { xA: 6, yA: -2, zA: 5, dx: -9, dz: -6, xH: 4, zH: 5 }, expectedValid: true },
    ],
  },

  // Dạng 32 (Q32): Mặt phẳng qua H và vuông góc hai mặt phẳng (R), (P), tính khoảng cách từ I
  t12_b14_d32_dist_plane_perp_2planes_sa: {
    id: 't12_b14_d32_dist_plane_perp_2planes_sa',
    name: 'Khoảng cách từ điểm I đến mặt phẳng qua H vuông góc hai mặt phẳng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách trong không gian',
    description: 'Mặt phẳng (Q) qua điểm H và vuông góc với hai mặt phẳng (R), (P). Tính d(I, (Q)) làm tròn hàng phần mười.',
    conditionSummary: 'n_R và n_P không cùng phương; I không thuộc (Q)',
    paramSpecs: [
      { name: 'a1', label: 'A_R', min: -5, max: 5, allowZero: false },
      { name: 'b1', label: 'B_R', min: 1, max: 6 },
      { name: 'a2', label: 'A_P', min: -4, max: 4, allowZero: false },
      { name: 'c2', label: 'C_P', min: -4, max: 4, allowZero: false },
      { name: 'xH', label: 'xH', min: -5, max: 5 },
      { name: 'yH', label: 'yH', min: -4, max: 5 },
      { name: 'zH', label: 'zH', min: -4, max: 5 },
      { name: 'xI', label: 'xI', min: -4, max: 6 },
    ],
    validateCode: `
      const { a1, b1, a2, c2, xH, yH, zH, xI } = params;
      if (a1 === 0 || a2 === 0 || c2 === 0) return { valid: false, reason: 'Tham số khác 0' };
      const c1 = 1, b2 = 1;
      const nx = b1 * c2 - c1 * b2;
      const ny = c1 * a2 - a1 * c2;
      const nz = a1 * b2 - b1 * a2;
      if (nx === 0 && ny === 0 && nz === 0) return { valid: false, reason: 'n_R và n_P cùng phương' };
      const dQ = -(nx * xH + ny * yH + nz * zH);
      const yI = -3, zI = 2;
      const num = Math.abs(nx * xI + ny * yI + nz * zI + dQ);
      if (num === 0) return { valid: false, reason: 'I thuộc (Q)' };
      const val = num / Math.sqrt(nx * nx + ny * ny + nz * nz);
      const frac = Math.abs(((val * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b1, a2, c2, xH, yH, zH, xI } = params;
      const c1 = 1, b2 = 1, yI = -3, zI = 2;
      const nx0 = b1 * c2 - c1 * b2;
      const ny0 = c1 * a2 - a1 * c2;
      const nz0 = a1 * b2 - b1 * a2;
      const g = u.gcd(nx0, u.gcd(ny0, nz0));
      const nx = nx0 / g, ny = ny0 / g, nz = nz0 / g;
      const dQ = -(nx * xH + ny * yH + nz * zH);
      const eqR = u.formatPlaneEq(a1, b1, c1, 4);
      const eqP = u.formatPlaneEq(a2, b2, c2, 7);
      const eqQ = u.formatPlaneEq(nx, ny, nz, dQ);
      const numAbs = Math.abs(nx * xI + ny * yI + nz * zI + dQ);
      const sInt = nx * nx + ny * ny + nz * nz;
      const dist = numAbs / Math.sqrt(sInt);
      const rounded = Number(dist.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Trong không gian $Oxyz$, mặt phẳng $(Q)$ qua điểm $H' + u.formatCoord3D(xH, yH, zH) + '$ và vuông góc với hai mặt phẳng $(R): ' + eqR + '$ và $(P): ' + eqP + '$. Tính khoảng cách từ điểm $I' + u.formatCoord3D(xI, yI, zI) + '$ đến mặt phẳng $(Q)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{n_R}=' + u.formatCoord3D(a1, b1, c1) + '$, $\\overrightarrow{n_P}=' + u.formatCoord3D(a2, b2, c2) + '$.',
          'Mặt phẳng $(Q)$ nhận $\\overrightarrow{n}=[\\overrightarrow{n_R}, \\overrightarrow{n_P}]=' + u.formatCoord3D(nx0, ny0, nz0) + '$ (cùng phương $' + u.formatCoord3D(nx, ny, nz) + '$) làm VTPT nên $(Q): ' + eqQ + '$.',
          'Khoảng cách từ $I$ đến $(Q)$: $d(I,(Q)) = \\dfrac{' + numAbs + '}{\\sqrt{' + sInt + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên I trùng H', params: { a1: -3, b1: 5, a2: -2, c2: -2, xH: 4, yH: -3, zH: 2, xI: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32', params: { a1: -3, b1: 5, a2: -2, c2: -2, xH: -3, yH: 4, zH: 3, xI: 4 }, expectedValid: true },
    ],
  },

  // Dạng 33 (Q33): Mặt phẳng qua ba điểm I, D, F, tính a + b + c
  t12_b14_d33_plane_3pts_sum_coeff_sa: {
    id: 't12_b14_d33_plane_3pts_sum_coeff_sa',
    name: 'Tìm tổng hệ số a + b + c của mặt phẳng đi qua ba điểm không thẳng hàng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Mặt phẳng (γ) qua ba điểm I, D, F có dạng ax + by + cz + D0 = 0 (tối giản). Tính a + b + c.',
    conditionSummary: 'I, D, F không thẳng hàng; mặt phẳng không đi qua gốc O (D0 != 0)',
    paramSpecs: [
      { name: 'xI', label: 'xI', min: -5, max: 3 },
      { name: 'yI', label: 'yI', min: -4, max: 4 },
      { name: 'zI', label: 'zI', min: -3, max: 6 },
      { name: 'u1', label: 'xD - xI', min: 2, max: 10 },
      { name: 'u2', label: 'yD - yI', min: 1, max: 5 },
      { name: 'v1', label: 'xF - xI', min: 1, max: 6 },
      { name: 'v2', label: 'yF - yI', min: 2, max: 8 },
    ],
    validateCode: `
      const { xI, yI, zI, u1, u2, v1, v2 } = params;
      const u3 = -4, v3 = -10;
      const nx = u2 * v3 - u3 * v2;
      const ny = u3 * v1 - u1 * v3;
      const nz = u1 * v2 - u2 * v1;
      if (nx === 0 && ny === 0 && nz === 0) return { valid: false, reason: 'Ba điểm thẳng hàng' };
      const g = u.gcd(nx, u.gcd(ny, nz));
      const a = nx / g, b = ny / g, c = nz / g;
      const d0 = -(a * xI + b * yI + c * zI);
      if (d0 === 0) return { valid: false, reason: 'Mặt phẳng qua O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xI, yI, zI, u1, u2, v1, v2 } = params;
      const u3 = -4, v3 = -10;
      const xD = xI + u1, yD = yI + u2, zD = zI + u3;
      const xF = xI + v1, yF = yI + v2, zF = zI + v3;
      const nx0 = u2 * v3 - u3 * v2;
      const ny0 = u3 * v1 - u1 * v3;
      const nz0 = u1 * v2 - u2 * v1;
      const g = u.gcd(nx0, u.gcd(ny0, nz0));
      const a = nx0 / g, b = ny0 / g, c = nz0 / g;
      const d0 = -(a * xI + b * yI + c * zI);
      const dSign = d0 >= 0 ? '+ ' + d0 : '- ' + Math.abs(d0);
      const ans = a + b + c;
      const shortAnswer = String(ans);
      const eq = u.formatPlaneEq(a, b, c, d0);
      return {
        stem: 'Trong không gian $Oxyz$, mặt phẳng $(\\gamma)$ đi qua ba điểm $I' + u.formatCoord3D(xI, yI, zI) + '$, $D' + u.formatCoord3D(xD, yD, zD) + '$ và $F' + u.formatCoord3D(xF, yF, zF) + '$ có phương trình dạng $ax+by+cz' + dSign + '=0$. Tính tổng $a+b+c$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{ID}=' + u.formatCoord3D(u1, u2, u3) + '$, $\\overrightarrow{IF}=' + u.formatCoord3D(v1, v2, v3) + '$.',
          'Vectơ pháp tuyến $\\overrightarrow{n}=[\\overrightarrow{ID}, \\overrightarrow{IF}]=' + u.formatCoord3D(nx0, ny0, nz0) + '$ (cùng phương $' + u.formatCoord3D(a, b, c) + '$).',
          'Phương trình $(\\gamma): ' + eq + ' \\Rightarrow a+b+c=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mặt phẳng qua O', params: { xI: 0, yI: 0, zI: 0, u1: 3, u2: 2, v1: 4, v2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33', params: { xI: -4, yI: -1, zI: 5, u1: 9, u2: 2, v1: 4, v2: 7 }, expectedValid: true },
    ],
  },

  // Dạng 34 (Q34): Chu vi tam giác giao điểm mặt phẳng với ba trục tọa độ
  t12_b14_d34_intercept_triangle_perimeter_sa: {
    id: 't12_b14_d34_intercept_triangle_perimeter_sa',
    name: 'Tính chu vi tam giác tạo bởi giao điểm mặt phẳng với ba trục tọa độ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Mặt phẳng (γ): Ax + By + Cz + D = 0 cắt các trục Ox, Oy, Oz tại G, B, D. Tính chu vi tam giác GBD làm tròn hàng phần mười.',
    conditionSummary: 'A, B, C, D khác 0; kết quả không sát ranh giới .x5',
    paramSpecs: [
      { name: 'a', label: 'A', min: 1, max: 6 },
      { name: 'b', label: 'B', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'C', min: 1, max: 6 },
      { name: 'd', label: 'D', min: 1, max: 12 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (b === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      const xg = -d / a, yb = -d / b, zd = -d / c;
      const perim = Math.sqrt(xg * xg + yb * yb) + Math.sqrt(xg * xg + zd * zd) + Math.sqrt(yb * yb + zd * zd);
      const frac = Math.abs(((perim * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const fx = u.simplifyFrac(-d, a);
      const fy = u.simplifyFrac(-d, b);
      const fz = u.simplifyFrac(-d, c);
      const xg = fx.value, yb = fy.value, zd = fz.value;
      const s1 = Math.sqrt(xg * xg + yb * yb);
      const s2 = Math.sqrt(xg * xg + zd * zd);
      const s3 = Math.sqrt(yb * yb + zd * zd);
      const perim = s1 + s2 + s3;
      const rounded = Number(perim.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eq = u.formatPlaneEq(a, b, c, d);
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\gamma): ' + eq + '$. Mặt phẳng $(\\gamma)$ cắt các trục $Ox, Oy, Oz$ tại các điểm $G, B, D$. Tính chu vi tam giác $GBD$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Giao điểm với các trục tọa độ: $G(' + fx.latex + ';0;0),\\, B(0;' + fy.latex + ';0),\\, D(0;0;' + fz.latex + ')$.',
          'Độ dài các cạnh: $GB = \\sqrt{x_G^2+y_B^2} \\approx ' + u.formatNumberVN(s1, 3) + '$, $GD \\approx ' + u.formatNumberVN(s2, 3) + '$, $BD \\approx ' + u.formatNumberVN(s3, 3) + '$.',
          'Chu vi tam giác $GBD$: $P = GB + GD + BD \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B = 0', params: { a: 2, b: 0, c: 5, d: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34', params: { a: 2, b: -2, c: 5, d: 6 }, expectedValid: true },
    ],
  },

  // Dạng 35 (Q35): Diện tích tam giác giao điểm mặt phẳng với ba trục tọa độ
  t12_b14_d35_intercept_triangle_area_sa: {
    id: 't12_b14_d35_intercept_triangle_area_sa',
    name: 'Tính diện tích tam giác tạo bởi giao điểm mặt phẳng với ba trục tọa độ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Mặt phẳng (R): Ax + By + Cz + D = 0 cắt các trục Ox, Oy, Oz tại I, M, H. Tính diện tích tam giác IMH làm tròn hàng phần mười.',
    conditionSummary: 'A, B, C, D khác 0; diện tích > 0.1 và không sát ranh giới .x5',
    paramSpecs: [
      { name: 'a', label: 'A', min: 1, max: 5 },
      { name: 'b', label: 'B', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'C', min: 1, max: 4 },
      { name: 'd', label: 'D', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (b === 0 || d === 0) return { valid: false, reason: 'B, D khác 0' };
      const xi = -d / a, ym = -d / b, zh = -d / c;
      const area = 0.5 * Math.sqrt(xi * xi * ym * ym + ym * ym * zh * zh + zh * zh * xi * xi);
      if (area < 0.1) return { valid: false, reason: 'Diện tích quá nhỏ' };
      const frac = Math.abs(((area * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const fx = u.simplifyFrac(-d, a);
      const fy = u.simplifyFrac(-d, b);
      const fz = u.simplifyFrac(-d, c);
      const xi = fx.value, ym = fy.value, zh = fz.value;
      const area = 0.5 * Math.sqrt(xi * xi * ym * ym + ym * ym * zh * zh + zh * zh * xi * xi);
      const rounded = Number(area.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eq = u.formatPlaneEq(a, b, c, d);
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(R): ' + eq + '$. Mặt phẳng $(R)$ cắt các trục $Ox, Oy, Oz$ tại các điểm $I, M, H$. Tính diện tích tam giác $IMH$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Các giao điểm là $I(' + fx.latex + ';0;0),\\, M(0;' + fy.latex + ';0),\\, H(0;0;' + fz.latex + ')$.',
          'Diện tích tam giác $IMH$: $S = \\dfrac{1}{2}\\left|\\left[\\overrightarrow{IM}, \\overrightarrow{IH}\\right]\\right| = \\dfrac{1}{2}\\sqrt{(x_I y_M)^2 + (y_M z_H)^2 + (z_H x_I)^2} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B = 0', params: { a: 4, b: 0, c: 1, d: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35', params: { a: 4, b: -2, c: 1, d: 1 }, expectedValid: true },
    ],
  },

  // Dạng 36 (Q36): Hình chiếu vuông góc của điểm E lên mặt phẳng (β)
  t12_b14_d36_ortho_projection_point_plane_sa: {
    id: 't12_b14_d36_ortho_projection_point_plane_sa',
    name: 'Tìm tổng tọa độ hình chiếu vuông góc của điểm lên mặt phẳng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách và hình chiếu trong không gian',
    description: 'Cho mặt phẳng (β) và điểm E. Tìm hình chiếu D(a; b; c) của E lên (β) và tính a + b + c (làm tròn phần mười).',
    conditionSummary: 'E không thuộc (β), không sát ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'A', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'B', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'C', min: -5, max: 5, allowZero: false },
      { name: 'd', label: 'D0', min: -12, max: 12 },
      { name: 'xE', label: 'xE', min: -4, max: 4 },
      { name: 'yE', label: 'yE', min: -4, max: 4 },
      { name: 'zE', label: 'zE', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, c, d, xE, yE, zE } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'A, B, C khác 0' };
      const valE = a * xE + b * yE + c * zE + d;
      if (valE === 0) return { valid: false, reason: 'E nằm trên (β)' };
      const den = a * a + b * b + c * c;
      const t = -valE / den;
      const sum = (xE + a * t) + (yE + b * t) + (zE + c * t);
      const frac = Math.abs((Math.abs(sum * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, xE, yE, zE } = params;
      const valE = a * xE + b * yE + c * zE + d;
      const den = a * a + b * b + c * c;
      const ft = u.simplifyFrac(-valE, den);
      const fa = u.simplifyFrac(xE * ft.den + a * ft.num, ft.den);
      const fb = u.simplifyFrac(yE * ft.den + b * ft.num, ft.den);
      const fc = u.simplifyFrac(zE * ft.den + c * ft.num, ft.den);
      const sum = fa.value + fb.value + fc.value;
      const rounded = Number(sum.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eq = u.formatPlaneEq(a, b, c, d);
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\beta): ' + eq + '$ và điểm $E' + u.formatCoord3D(xE, yE, zE) + '$. Biết $D(a;b;c)$ là hình chiếu vuông góc của điểm $E$ lên mặt phẳng $(\\beta)$. Tính $a+b+c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Đường thẳng qua $E$ vuông góc với $(\\beta)$ nhận $\\overrightarrow{n}=' + u.formatCoord3D(a, b, c) + '$ làm VTCP nên $D(' + u.formatLinear(a, xE, 't') + ';\\, ' + u.formatLinear(b, yE, 't') + ';\\, ' + u.formatLinear(c, zE, 't') + ')$ (với $t \\in \\mathbb{R}$).',
          'Thay tọa độ $D$ vào $(\\beta)$ được $' + u.formatLinear(den, valE, 't') + ' = 0 \\Rightarrow t = ' + ft.latex + '$.',
          'Suy ra $D(' + fa.latex + ';\\, ' + fb.latex + ';\\, ' + fc.latex + ')$ và $a+b+c \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên E thuộc (β)', params: { a: -4, b: -1, c: -3, d: 7, xE: 0, yE: -2, zE: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36', params: { a: -4, b: -1, c: -3, d: -10, xE: 0, yE: -2, zE: 3 }, expectedValid: true },
    ],
  },

  // Dạng 37 (Q37): Điểm đối xứng của điểm M qua mặt phẳng (P)
  t12_b14_d37_symmetric_point_plane_sa: {
    id: 't12_b14_d37_symmetric_point_plane_sa',
    name: 'Tìm |a + b + c| với D(a; b; c) là điểm đối xứng của M qua mặt phẳng (P)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách và hình chiếu trong không gian',
    description: 'Cho mặt phẳng (P) và điểm M. Tìm điểm đối xứng D(a; b; c) của M qua (P) và tính |a + b + c| (làm tròn phần mười).',
    conditionSummary: 'M không thuộc (P), kết quả không rơi sát .x5',
    paramSpecs: [
      { name: 'a', label: 'A', min: 1, max: 5 },
      { name: 'b', label: 'B', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'C', min: -4, max: 4, allowZero: false },
      { name: 'd', label: 'D0', min: -8, max: 8 },
      { name: 'xM', label: 'xM', min: -4, max: 5 },
      { name: 'yM', label: 'yM', min: -4, max: 5 },
      { name: 'zM', label: 'zM', min: -4, max: 5 },
    ],
    validateCode: `
      const { a, b, c, d, xM, yM, zM } = params;
      if (b === 0 || c === 0) return { valid: false, reason: 'B, C khác 0' };
      const valM = a * xM + b * yM + c * zM + d;
      if (valM === 0) return { valid: false, reason: 'M nằm trên (P)' };
      const den = a * a + b * b + c * c;
      const t = -valM / den;
      const absSum = Math.abs((xM + 2 * a * t) + (yM + 2 * b * t) + (zM + 2 * c * t));
      const frac = Math.abs(((absSum * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, xM, yM, zM } = params;
      const valM = a * xM + b * yM + c * zM + d;
      const den = a * a + b * b + c * c;
      const ft = u.simplifyFrac(-valM, den);
      const fxE = u.simplifyFrac(xM * ft.den + a * ft.num, ft.den);
      const fyE = u.simplifyFrac(yM * ft.den + b * ft.num, ft.den);
      const fzE = u.simplifyFrac(zM * ft.den + c * ft.num, ft.den);
      const fxD = u.simplifyFrac(xM * ft.den + 2 * a * ft.num, ft.den);
      const fyD = u.simplifyFrac(yM * ft.den + 2 * b * ft.num, ft.den);
      const fzD = u.simplifyFrac(zM * ft.den + 2 * c * ft.num, ft.den);
      const absSum = Math.abs(fxD.value + fyD.value + fzD.value);
      const rounded = Number(absSum.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eq = u.formatPlaneEq(a, b, c, d);
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(P): ' + eq + '$ và điểm $M' + u.formatCoord3D(xM, yM, zM) + '$. Biết $D(a;b;c)$ là điểm đối xứng với điểm $M$ qua mặt phẳng $(P)$. Tính $|a+b+c|$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Hình chiếu $E$ của $M$ lên $(P)$ ứng với tham số $t = ' + ft.latex + ' \\Rightarrow E(' + fxE.latex + ';\\, ' + fyE.latex + ';\\, ' + fzE.latex + ')$.',
          'Vì $E$ là trung điểm $MD$ nên $D = 2E - M = (' + fxD.latex + ';\\, ' + fyD.latex + ';\\, ' + fzD.latex + ')$.',
          'Suy ra $|a+b+c| \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M thuộc (P)', params: { a: 2, b: -4, c: 2, d: -10, xM: 4, yM: 1, zM: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37', params: { a: 2, b: -4, c: 2, d: 1, xM: 4, yM: 1, zM: 3 }, expectedValid: true },
    ],
  },

  // Dạng 38 (Q38): Sân vận động hình chóp cụt OAGD.BCFE (có hình 3D)
  t12_b14_d38_stadium_frustum_dist_sa: {
    id: 't12_b14_d38_stadium_frustum_dist_sa',
    name: 'Bài toán thực tế sân vận động hình chóp cụt gắn hệ trục Oxyz (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế phương trình mặt phẳng',
    description: 'Tính khoảng cách từ đỉnh G của mặt sân hình chữ nhật OAGD đến mặt phẳng khán đài (OBED) (làm tròn hàng phần chục).',
    conditionSummary: 'L = OA > 0, W = OD > 0, xB > 0, zB > 0; không sát .x5',
    paramSpecs: [
      { name: 'L', label: 'Chiều dài OA (m)', min: 90, max: 140, step: 5 },
      { name: 'W', label: 'Chiều rộng OD (m)', min: 40, max: 70, step: 5 },
      { name: 'xB', label: 'Hoành độ B (xB)', min: 10, max: 25 },
      { name: 'yB', label: 'Tung độ B (yB)', min: 5, max: 15 },
      { name: 'zB', label: 'Cao độ B (zB)', min: 6, max: 14 },
    ],
    validateCode: `
      const { L, W, xB, zB } = params;
      if (L <= 0 || W <= 0 || xB <= 0 || zB <= 0) return { valid: false, reason: 'Kích thước và tọa độ phải dương' };
      const dist = (L * zB) / Math.sqrt(xB * xB + zB * zB);
      const frac = Math.abs(((dist * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L, W, xB, yB, zB } = params;
      const nx = -W * zB, nz = W * xB;
      const dist = (L * zB) / Math.sqrt(xB * xB + zB * zB);
      const rounded = Number(dist.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Một sân vận động được xây dựng theo mô hình là hình chóp cụt $OAGD.BCFE$ có hai đáy song song với nhau. Mặt sân $OAGD$ là hình chữ nhật và được gắn hệ trục $Oxyz$ sao cho điểm $A$ thuộc tia $Ox$, $D$ thuộc tia $Oy$ (đơn vị trên mỗi trục tọa độ là mét). Mặt sân $OAGD$ có chiều dài $OA=' + L + '$ m, chiều rộng $OD=' + W + '$ m và tọa độ điểm $B' + u.formatCoord3D(xB, yB, zB) + '$. Tính khoảng cách từ điểm $G$ đến mặt phẳng $(OBED)$ (làm tròn kết quả đến hàng phần chục).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l14_stadium_frustum_3d',
          params: { L, W, xB, yB, zB },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $O(0;0;0)$, $A(' + L + ';0;0)$, $D(0;' + W + ';0) \\Rightarrow G(' + L + ';' + W + ';0)$.',
          'Mặt phẳng $(OBED)$ đi qua $O$ và nhận $\\overrightarrow{n} = \\left[\\overrightarrow{OB}, \\overrightarrow{OD}\\right] = ' + u.formatCoord3D(nx, 0, nz) + '$ (cùng phương với $' + u.formatCoord3D(-zB, 0, xB) + '$) làm VTPT.',
          'Khoảng cách từ $G$ đến $(OBED)$: $d = \\dfrac{|-' + zB + '\\cdot ' + L + ' + ' + xB + '\\cdot 0|}{\\sqrt{' + xB + '^2 + ' + zB + '^2}} = \\dfrac{' + (L * zB) + '}{\\sqrt{' + (xB * xB + zB * zB) + '}} \\approx ' + shortAnswer + '\\text{ m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên zB = 0', params: { L: 120, W: 50, xB: 15, yB: 8, zB: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38', params: { L: 120, W: 50, xB: 15, yB: 8, zB: 8 }, expectedValid: true },
    ],
  },

  // Dạng 39 (Q39): Góc giữa tấm kính (ABC) và nền nhà (Oxy)
  t12_b14_d39_glass_floor_angle_sa: {
    id: 't12_b14_d39_glass_floor_angle_sa',
    name: 'Tính góc giữa tấm kính đi qua 3 điểm A, B, C và nền nhà (Oxy)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Góc trong không gian',
    description: 'Tấm kính đi qua ba điểm A, B, C trong Oxyz. Tính góc giữa tấm kính và mặt phẳng nền nhà (Oxy) (đơn vị độ, làm tròn hàng đơn vị).',
    conditionSummary: 'A, B, C không thẳng hàng, mặt phẳng (ABC) không song song và không vuông góc với (Oxy)',
    paramSpecs: [
      { name: 'xA', label: 'xA', min: 1, max: 6 },
      { name: 'yA', label: 'yA', min: -5, max: 4 },
      { name: 'zA', label: 'zA', min: 1, max: 5 },
      { name: 'u1', label: 'xB - xA', min: -4, max: -1 },
      { name: 'u2', label: 'yB - yA', min: -4, max: -1 },
      { name: 'v1', label: 'xC - xA', min: -7, max: -2 },
      { name: 'v3', label: 'zC - zA', min: 2, max: 6 },
    ],
    validateCode: `
      const { u1, u2, v1, v3 } = params;
      const u3 = 0, v2 = 6;
      const nx = u2 * v3 - u3 * v2;
      const ny = u3 * v1 - u1 * v3;
      const nz = u1 * v2 - u2 * v1;
      if (nx === 0 && ny === 0 && nz === 0) return { valid: false, reason: 'A, B, C thẳng hàng' };
      if (nz === 0) return { valid: false, reason: '(ABC) vuông góc với (Oxy)' };
      const cosVal = Math.abs(nz) / Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (cosVal >= 0.995) return { valid: false, reason: 'Góc gần 0 độ' };
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      if (Math.abs((deg % 1) - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, u1, u2, v1, v3 } = params;
      const u3 = 0, v2 = 6;
      const xB = xA + u1, yB = yA + u2, zB = zA + u3;
      const xC = xA + v1, yC = yA + v2, zC = zA + v3;
      const nx = u2 * v3 - u3 * v2;
      const ny = u3 * v1 - u1 * v3;
      const nz = u1 * v2 - u2 * v1;
      const norm2 = nx * nx + ny * ny + nz * nz;
      const cosVal = Math.abs(nz) / Math.sqrt(norm2);
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      const rounded = Math.round(deg);
      const shortAnswer = String(rounded);
      return {
        stem: 'Một căn phòng được đặt trong không gian $Oxyz$ sao cho $(Oxy)$ là nền nhà. Một tấm kính đi qua ba điểm $A' + u.formatCoord3D(xA, yA, zA) + '$, $B' + u.formatCoord3D(xB, yB, zB) + '$, $C' + u.formatCoord3D(xC, yC, zC) + '$. Tính góc giữa tấm kính và nền nhà (đơn vị độ, làm tròn đến hàng đơn vị).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vectơ pháp tuyến của mặt phẳng $(ABC)$ là $\\vec{n} = \\left[\\overrightarrow{AB}, \\overrightarrow{AC}\\right] = ' + u.formatCoord3D(nx, ny, nz) + '$.',
          'Mặt phẳng $(Oxy)$ có vectơ pháp tuyến là $\\vec{k} = (0;0;1)$.',
          'Ta có $\\cos((ABC),(Oxy)) = \\dfrac{|\\vec{n}\\cdot\\vec{k}|}{|\\vec{n}||\\vec{k}|} = \\dfrac{' + Math.abs(nz) + '}{\\sqrt{' + norm2 + '}} \\approx ' + u.formatNumberVN(cosVal, 3) + ' \\Rightarrow \\varphi \\approx ' + rounded + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nz = 0 (vuông góc sàn)', params: { xA: 4, yA: -2, zA: 3, u1: -1, u2: 6, v1: -1, v3: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39', params: { xA: 4, yA: -2, zA: 3, u1: -1, u2: -2, v1: -5, v3: 3 }, expectedValid: true },
    ],
  },

  // Dạng 40 (Q40): Mặt phẳng lát gạch sân hình thang vuông (có hình 2D)
  t12_b14_d40_trapezoid_yard_drain_sa: {
    id: 't12_b14_d40_trapezoid_yard_drain_sa',
    name: 'Bài toán thực tế lát sân hình thang vuông đảm bảo độ dốc phẳng (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế phương trình mặt phẳng',
    description: 'Cho sân hình thang vuông ABCD tại A, B. Giữ nguyên cao độ A, hạ cao độ tại B và D; tìm độ hạ cao tại C để mặt sân phẳng.',
    conditionSummary: 'AB, AD, BC, hB, hD > 0; kết quả làm tròn phần chục không sát .x5',
    paramSpecs: [
      { name: 'ab', label: 'Cạnh AB (m)', min: 6, max: 12 },
      { name: 'ad', label: 'Cạnh AD (m)', min: 3, max: 6 },
      { name: 'bc', label: 'Cạnh BC (m)', min: 6, max: 11 },
      { name: 'hB', label: 'Độ hạ tại B (cm)', min: 4, max: 9 },
      { name: 'hDTenths', label: 'Độ hạ tại D (×0,1 cm)', min: 24, max: 54, step: 4 },
    ],
    validateCode: `
      const { ab, ad, bc, hB, hDTenths } = params;
      if (ab <= 0 || ad <= 0 || bc <= ad || hB <= 0 || hDTenths <= 0) return { valid: false, reason: 'Cần BC > AD > 0 và các độ dài dương' };
      const hD = hDTenths / 10;
      const hC = hB + hD * (bc / ad);
      const frac = Math.abs(((hC * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ab, ad, bc, hB, hDTenths } = params;
      const hD = hDTenths / 10;
      const hC = hB + hD * (bc / ad);
      const rounded = Number(hC.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const hDStr = u.formatNumberVN(hD, 1);
      return {
        stem: 'Một phần sân nhà bác Hà có dạng hình thang $ABCD$ vuông tại $A$ và $B$ với độ dài $AB=' + ab + '$ m, $AD=' + ad + '$ m và $BC=' + bc + '$ m. Theo thiết kế ban đầu thì mặt sân bằng phẳng và $A,B,C,D$ có độ cao như nhau. Sau đó bác Hà thay đổi thiết kế để nước có thể thoát về phía góc sân ở vị trí $C$ bằng cách giữ nguyên độ cao ở $A$, giảm độ cao của sân ở vị trí $B$ và $D$ xuống thấp hơn độ cao ở $A$ lần lượt là $' + hB + '$ cm và $' + hDStr + '$ cm. Để mặt sân sau khi lát gạch vẫn là bề mặt phẳng thì bác Hà cần phải giảm độ cao ở $C$ xuống bao nhiêu cm so với độ cao ở $A$? (kết quả làm tròn đến hàng phần chục).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l14_trapezoid_yard_2d',
          params: { ab, ad, bc },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chọn hệ trục tọa độ $Axyz$ sao cho tia $AB$ trùng tia $Ax$, tia $AD$ trùng tia $Ay$, tia $Az \\perp (ABCD)$ hướng lên trên.',
          'Đổi đơn vị độ cao về cm, ta có $A(0;0;0)$, $B(' + ab + ';0;-' + hB + ')$, $D(0;' + ad + ';-' + hDStr + ')$ và $C(' + ab + ';' + bc + ';z_C)$.',
          'Mặt phẳng $(ABD)$ qua gốc $A(0;0;0)$ có phương trình $z = -\\dfrac{' + hB + '}{' + ab + '}x - \\dfrac{' + hDStr + '}{' + ad + '}y$.',
          'Vì $C \\in (ABD)$ nên $z_C = -' + hB + ' - ' + hDStr + '\\cdot\\dfrac{' + bc + '}{' + ad + '} \\approx -' + shortAnswer + '$ cm. Vậy cần giảm độ cao tại $C$ xuống khoảng $' + shortAnswer + '$ cm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên BC <= AD', params: { ab: 8, ad: 8, bc: 4, hB: 6, hDTenths: 36 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40', params: { ab: 8, ad: 4, bc: 8, hB: 6, hDTenths: 36 }, expectedValid: true },
    ],
  },

  // Dạng 41 (Q41): Camera chiếu xuống mặt phẳng (P) — tính đường kính vùng quan sát (có hình 3D)
  t12_b14_d41_camera_fov_circle_sa: {
    id: 't12_b14_d41_camera_fov_circle_sa',
    name: 'Bài toán thực tế camera quan sát chiếu xuống mặt phẳng (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế khoảng cách và góc',
    description: 'Camera đặt tại A(xA; yA; zA) có góc quan sát ngang α chiếu thẳng vào (P). Tính đường kính hình tròn vùng quan sát (làm tròn phần mười).',
    conditionSummary: '80 <= α <= 130 chẵn, A không nằm trên (P), kết quả không sát .x5',
    paramSpecs: [
      { name: 'alpha', label: 'Góc quan sát α (độ)', min: 84, max: 120, step: 4 },
      { name: 'xA', label: 'xA', min: 1, max: 4 },
      { name: 'yA', label: 'yA', min: -2, max: 3 },
      { name: 'zA', label: 'zA', min: 2, max: 5 },
      { name: 'a', label: 'A_P', min: 1, max: 4 },
      { name: 'b', label: 'B_P', min: -3, max: 3, allowZero: false },
      { name: 'c', label: 'C_P', min: 1, max: 4 },
      { name: 'd', label: 'D_P', min: -10, max: -2 },
    ],
    validateCode: `
      const { alpha, xA, yA, zA, a, b, c, d } = params;
      if (b === 0 || alpha <= 60 || alpha >= 160) return { valid: false, reason: 'Tham số không hợp lệ' };
      const num = Math.abs(a * xA + b * yA + c * zA + d);
      if (num === 0) return { valid: false, reason: 'Camera nằm trên (P)' };
      const dist = num / Math.sqrt(a * a + b * b + c * c);
      const diam = 2 * dist * Math.tan(((alpha / 2) * Math.PI) / 180);
      const frac = Math.abs(((diam * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { alpha, xA, yA, zA, a, b, c, d } = params;
      const numAbs = Math.abs(a * xA + b * yA + c * zA + d);
      const sInt = a * a + b * b + c * c;
      const dist = numAbs / Math.sqrt(sInt);
      const halfAlpha = alpha / 2;
      const diam = 2 * dist * Math.tan((halfAlpha * Math.PI) / 180);
      const rounded = Number(diam.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eq = u.formatPlaneEq(a, b, c, d);
      return {
        stem: 'Biết góc quan sát ngang của một camera là $' + alpha + '^\\circ$. Trong không gian $Oxyz$, camera được đặt tại điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ và chiếu thẳng về phía mặt phẳng $(P): ' + eq + '$. Hỏi vùng quan sát được trên mặt phẳng $(P)$ của camera là hình tròn có đường kính bằng bao nhiêu (làm tròn kết quả đến chữ số hàng phần mười)?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l14_camera_cone_3d',
          params: { alpha },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Khoảng cách từ điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ đến mặt phẳng $(P): ' + eq + '$ là $d = \\dfrac{' + numAbs + '}{\\sqrt{' + sInt + '}}$.',
          'Bán kính vùng quan sát trên $(P)$ là $r = d\\tan\\left(\\dfrac{' + alpha + '^\\circ}{2}\\right) = d\\tan(' + halfAlpha + '^\\circ)$.',
          'Đường kính hình tròn vùng quan sát là $2r = 2d\\tan(' + halfAlpha + '^\\circ) \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A thuộc (P)', params: { alpha: 104, xA: 2, yA: 0, zA: 3, a: 3, b: -1, c: 3, d: -15 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41', params: { alpha: 104, xA: 2, yA: 0, zA: 3, a: 3, b: -1, c: 3, d: -7 }, expectedValid: true },
    ],
  },

  // Dạng 42 (Q42): Tính số đo góc nhị diện [A, Ox, B]
  t12_b14_d42_dihedral_angle_ox_sa: {
    id: 't12_b14_d42_dihedral_angle_ox_sa',
    name: 'Tính số đo góc nhị diện [A, Ox, B] trong không gian Oxyz',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Góc nhị diện và mặt phẳng',
    description: 'Cho hai điểm A, B không nằm trên trục Ox. Tính số đo góc nhị diện [A, Ox, B] (đơn vị độ, làm tròn hàng đơn vị).',
    conditionSummary: 'Hình chiếu của OA, OB lên (Oyz) khác vectơ 0; kết quả không sát .5 độ',
    paramSpecs: [
      { name: 'xA', label: 'xA', min: -3, max: 4 },
      { name: 'yA', label: 'yA', min: -4, max: 4, allowZero: false },
      { name: 'zA', label: 'zA', min: 1, max: 6 },
      { name: 'xB', label: 'xB', min: -3, max: 4 },
      { name: 'yB', label: 'yB', min: 1, max: 6 },
      { name: 'zB', label: 'zB', min: -6, max: -1 },
    ],
    validateCode: `
      const { yA, zA, yB, zB } = params;
      const n1 = yA * yA + zA * zA;
      const n2 = yB * yB + zB * zB;
      if (n1 === 0 || n2 === 0) return { valid: false, reason: 'Điểm nằm trên Ox' };
      const cosVal = Math.max(-1, Math.min(1, (yA * yB + zA * zB) / Math.sqrt(n1 * n2)));
      if (Math.abs(cosVal) >= 0.995) return { valid: false, reason: 'Hai nửa mặt phẳng gần trùng hoặc đối nhau' };
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      if (Math.abs((deg % 1) - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, xB, yB, zB } = params;
      const n1 = yA * yA + zA * zA;
      const n2 = yB * yB + zB * zB;
      const dot = yA * yB + zA * zB;
      const cosVal = dot / Math.sqrt(n1 * n2);
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      const rounded = Math.round(deg);
      const shortAnswer = String(rounded);
      return {
        stem: 'Trong không gian với hệ tọa độ $Oxyz$, cho hai điểm $A' + u.formatCoord3D(xA, yA, zA) + '$, $B' + u.formatCoord3D(xB, yB, zB) + '$. Tính số đo góc nhị diện $[A, Ox, B]$ (đơn vị độ, làm tròn đến hàng đơn vị).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Góc nhị diện $[A, Ox, B]$ bằng góc giữa hai hình chiếu của $\\overrightarrow{OA}$ và $\\overrightarrow{OB}$ lên mặt phẳng $(Oyz)$ vuông góc với cạnh $Ox$.',
          'Hai vectơ hình chiếu là $\\vec{u}=' + u.formatCoord3D(0, yA, zA) + '$ và $\\vec{v}=' + u.formatCoord3D(0, yB, zB) + '$.',
          'Ta có $\\cos(\\vec{u}, \\vec{v}) = \\dfrac{' + dot + '}{\\sqrt{' + n1 + '}\\cdot\\sqrt{' + n2 + '}} \\Rightarrow [A, Ox, B] \\approx ' + rounded + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A nằm trên Ox', params: { xA: 2, yA: 0, zA: 0, xB: -1, yB: 5, zB: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42', params: { xA: 2, yA: -1, zA: 4, xB: -1, yB: 5, zB: -5 }, expectedValid: true },
    ],
  },

  // Dạng 43 (Q43): Khung kính trưng bày OABC.DEFG (OA < OC, có hình 3D)
  t12_b14_d43_museum_pane_min_area_fig_sa: {
    id: 't12_b14_d43_museum_pane_min_area_fig_sa',
    name: 'Bài toán cực trị diện tích tấm kính OPFQ trong tủ kính hình hộp chữ nhật (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hình học Oxyz',
    description: 'Khung kính hình hộp chữ nhật OABC.DEFG đáy OA = a < OC = b, cao OD = c. Tấm kính hình bình hành OPFQ có diện tích nhỏ nhất bằng bao nhiêu (làm tròn phần trăm).',
    conditionSummary: '1 <= a < b <= 5, c >= 2; kết quả không sát ranh giới .xx5',
    paramSpecs: [
      { name: 'a', label: 'Chiều rộng OA = a (m)', min: 1, max: 3 },
      { name: 'b', label: 'Chiều dài OC = b (m)', min: 2, max: 5 },
      { name: 'c', label: 'Chiều cao OD = c (m)', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a <= 0 || b <= a || c <= 0) return { valid: false, reason: 'Cần 0 < a < b và c > 0' };
      const sMin = a * b * Math.sqrt((a * a + b * b + c * c) / (a * a + b * b));
      const frac = Math.abs(((sMin * 100) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const a2 = a * a, b2 = b * b, c2 = c * c;
      const denom = a2 + b2;
      const pOpt = u.simplifyFrac(a2 * c, denom);
      const qOpt = u.simplifyFrac(b2 * c, denom);
      const sMin = a * b * Math.sqrt((a2 + b2 + c2) / denom);
      const rounded = Number(sMin.toFixed(2));
      const shortAnswer = u.formatNumberVN(rounded, 2);
      return {
        stem: 'Một khung kính trưng bày trong bảo tàng có dạng hình hộp chữ nhật $OABC.DEFG$ có đáy $OABC$ biết $OA=' + a + '$ (m), $OC=' + b + '$ (m), và chiều cao $OD=' + c + '$ (m). Trên mặt trên, các điểm $D,E,F,G$ lần lượt nằm ngay phía trên $O,A,B,C$ (tham khảo hình vẽ). Bên trong tủ, người ta muốn treo một tấm kính trang trí mỏng nối từ góc đáy $O$ đến góc trên $F$. Để cố định tấm kính, hai thanh đỡ được gắn vào điểm $P$ trên cạnh thẳng đứng $AE$ và điểm $Q$ trên cạnh thẳng đứng $CG$ sao cho bốn điểm $O,P,F,Q$ cùng nằm trên một mặt phẳng. Tấm kính trang trí có dạng tứ giác $OPFQ$. Hỏi diện tích nhỏ nhất của tứ giác $OPFQ$ bằng bao nhiêu $\\mathrm{m^2}$? (làm tròn kết quả đến hàng phần trăm).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l14_museum_box_pane_3d',
          params: { a, b, c },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gắn hệ trục $Oxyz$ tại $O$ với $A(' + a + ';0;0)$, $C(0;' + b + ';0)$, $D(0;0;' + c + ')$, $F(' + a + ';' + b + ';' + c + ')$, đặt $P(' + a + ';0;p)$ và $Q(0;' + b + ';q)$ ($0\\le p,q\\le ' + c + '$).',
          'Từ điều kiện bốn điểm $O, P, F, Q$ đồng phẳng, suy ra $p + q = ' + c + '$ và $OPFQ$ là hình bình hành với $S^2 = ' + a2 * b2 + ' + ' + b2 + 'p^2 + ' + a2 + '(' + c + '-p)^2 = ' + denom + 'p^2 - ' + (2 * a2 * c) + 'p + ' + a2 * (b2 + c2) + '$.',
          'Hàm số bậc hai đạt GTNN tại $p = ' + pOpt.latex + ',\\, q = ' + qOpt.latex + ' \\Rightarrow S_{\\min} = ' + (a * b) + '\\sqrt{\\dfrac{' + (a2 + b2 + c2) + '}{' + denom + '}} \\approx ' + shortAnswer + '\\text{ m}^2$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 3, b: 2, c: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43 (1,2,3)', params: { a: 1, b: 2, c: 3 }, expectedValid: true },
    ],
  },

  // Dạng 44 (Q44): Khung kính trưng bày OABC.DEFG (OA > OC, biến thể tham số tổng quát)
  t12_b14_d44_museum_pane_min_area_var_sa: {
    id: 't12_b14_d44_museum_pane_min_area_var_sa',
    name: 'Bài toán cực trị diện tích tấm kính OPFQ trong tủ kính (dạng tổng quát OA > OC)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hình học Oxyz',
    description: 'Khung kính hình hộp chữ nhật OABC.DEFG có OA = a > OC = b, OD = c. Tính diện tích nhỏ nhất của tứ giác OPFQ (làm tròn hàng phần trăm).',
    conditionSummary: 'a > b >= 1, c >= 3; không sát .xx5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh OA = a (m)', min: 2, max: 5 },
      { name: 'b', label: 'Cạnh OC = b (m)', min: 1, max: 4 },
      { name: 'c', label: 'Chiều cao OD = c (m)', min: 3, max: 7 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (b <= 0 || a <= b || c <= 0) return { valid: false, reason: 'Cần a > b > 0 và c > 0' };
      const sMin = a * b * Math.sqrt((a * a + b * b + c * c) / (a * a + b * b));
      const frac = Math.abs(((sMin * 100) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const a2 = a * a, b2 = b * b, c2 = c * c;
      const denom = a2 + b2;
      const pOpt = u.simplifyFrac(a2 * c, denom);
      const qOpt = u.simplifyFrac(b2 * c, denom);
      const sMin = a * b * Math.sqrt((a2 + b2 + c2) / denom);
      const rounded = Number(sMin.toFixed(2));
      const shortAnswer = u.formatNumberVN(rounded, 2);
      return {
        stem: 'Một khung kính trưng bày trong bảo tàng có dạng hình hộp chữ nhật $OABC.DEFG$ có đáy $OABC$ biết $OA=' + a + '$ (m), $OC=' + b + '$ (m), và chiều cao $OD=' + c + '$ (m). Trên mặt trên, các điểm $D,E,F,G$ lần lượt nằm ngay phía trên $O,A,B,C$. Bên trong tủ, người ta muốn treo một tấm kính trang trí mỏng nối từ góc đáy $O$ đến góc trên $F$. Để cố định tấm kính, hai thanh đỡ được gắn vào điểm $P$ trên cạnh thẳng đứng $AE$ và điểm $Q$ trên cạnh thẳng đứng $CG$ sao cho bốn điểm $O,P,F,Q$ cùng nằm trên một mặt phẳng. Tấm kính trang trí có dạng tứ giác $OPFQ$. Hỏi diện tích nhỏ nhất của tứ giác $OPFQ$ bằng bao nhiêu $\\mathrm{m^2}$? (làm tròn kết quả đến hàng phần trăm).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chọn hệ trục tọa độ $Oxyz$ với $P(' + a + ';0;p)$ và $Q(0;' + b + ';q)$. Điều kiện đồng phẳng của $O, P, F, Q$ cho $p + q = ' + c + '$.',
          'Ta có $S_{OPFQ}^2 = (a^2 + p^2)(b^2 + q^2) - p^2 q^2 = ' + a2 * b2 + ' + ' + b2 + 'p^2 + ' + a2 + '(' + c + ' - p)^2$.',
          'Bình phương cực tiểu tại $p = ' + pOpt.latex + ',\\, q = ' + qOpt.latex + ' \\Rightarrow S_{\\min} = ' + (a * b) + '\\sqrt{\\dfrac{' + (a2 + b2 + c2) + '}{' + denom + '}} \\approx ' + shortAnswer + '\\text{ m}^2$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a <= b', params: { a: 2, b: 3, c: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44 (2,1,4)', params: { a: 2, b: 1, c: 4 }, expectedValid: true },
    ],
  },

  // Dạng 45 (Q45): Tìm M trên (P): z = z0 sao cho ΔMAB vuông cân tại M
  t12_b14_d45_right_iso_triangle_on_plane_sa: {
    id: 't12_b14_d45_right_iso_triangle_on_plane_sa',
    name: 'Tìm điểm M trên mặt phẳng (P): z = z0 để tam giác MAB vuông cân tại M',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giao tuyến và bài toán điểm thuộc mặt phẳng',
    description: 'Cho (P): z - z0 = 0 và hai điểm A, B trên (P). Tìm M(a;b;c) thuộc (P) sao cho ΔMAB vuông cân tại M và a < xB, tính m*a + n*b + p*c.',
    conditionSummary: 's = xB - xA = yB - yA >= 1 để 2 nghiệm phân biệt nguyên',
    paramSpecs: [
      { name: 'z0', label: 'z0', min: 1, max: 6 },
      { name: 'x0', label: 'xA', min: -5, max: 3 },
      { name: 'y0', label: 'yA', min: -3, max: 5 },
      { name: 's', label: 'Độ lệch s = xB - xA', min: 1, max: 3 },
      { name: 'm', label: 'Hệ số m', min: 1, max: 4 },
      { name: 'n', label: 'Hệ số n', min: 2, max: 5 },
      { name: 'p', label: 'Hệ số p', min: 1, max: 4 },
    ],
    validateCode: `
      const { s, m, n, p } = params;
      if (s <= 0 || m <= 0 || n <= 0 || p <= 0) return { valid: false, reason: 'Tham số phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { z0, x0, y0, s, m, n, p } = params;
      const xB = x0 + s, yB = y0 + s;
      // M1(x0, y0 + s, z0) has a = x0 < xB; M2(x0 + s, y0, z0) has a = xB
      const a = x0, b = y0 + s, c = z0;
      const ans = m * a + n * b + p * c;
      const shortAnswer = String(ans);
      const eqP = u.formatPlaneEq(0, 0, 1, -z0);
      const expr = (m === 1 ? 'a' : m + 'a') + ' + ' + (n === 1 ? 'b' : n + 'b') + ' + ' + (p === 1 ? 'c' : p + 'c');
      return {
        stem: 'Trong không gian với hệ tọa độ $Oxyz$, cho mặt phẳng $(P): ' + eqP + '$ và hai điểm $A' + u.formatCoord3D(x0, y0, z0) + '$, $B' + u.formatCoord3D(xB, yB, z0) + '$. Gọi $M(a;b;c) \\in (P)$ sao cho tam giác $MAB$ vuông cân tại $M$ và $a < ' + xB + '$. Tính $' + expr + '$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vì $MA = MB$ và $M \\in (P)$ nên $M$ nằm trên giao tuyến $\\Delta$ của $(P)$ với mặt phẳng trung trực $(Q)$ của $AB$.',
          'Tham số hóa $M(' + u.formatShift('t', x0) + ';\\, ' + u.formatShift('-t', y0 + s) + ';\\, ' + z0 + ')$ theo $\\Delta$ ($t \\in \\mathbb{R}$).',
          'Điều kiện $MA \\perp MB \\Leftrightarrow \\overrightarrow{MA}\\cdot\\overrightarrow{MB} = 2t(t - ' + s + ') = 0 \\Leftrightarrow t = 0$ hoặc $t = ' + s + '$.',
          'Với $a < ' + xB + '$ chọn $t = 0 \\Rightarrow M' + u.formatCoord3D(a, b, c) + ' \\Rightarrow ' + expr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên s = 0 (A trùng B)', params: { z0: 4, x0: -2, y0: 3, s: 0, m: 3, n: 4, p: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45', params: { z0: 4, x0: -2, y0: 3, s: 1, m: 3, n: 4, p: 2 }, expectedValid: true },
    ],
  },

  // Dạng 46 (Q46): Tìm M trên (P): x + y + z - dP = 0 sao cho MA = MB và góc AMB = 120 độ
  t12_b14_d46_angle_120_iso_on_plane_sa: {
    id: 't12_b14_d46_angle_120_iso_on_plane_sa',
    name: 'Tìm M thuộc (P) sao cho MA = MB và góc AMB = 120°',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giao tuyến và bài toán điểm thuộc mặt phẳng',
    description: 'Cho (P): x + y + z - dP = 0 và hai điểm A, B ∈ (P). Tìm M(a;b;c) ∈ (P) với c > zA sao cho MA = MB và góc AMB = 120°, tính a + b.',
    conditionSummary: 'A, B thuộc (P), zA = zB, s = xA - xB > 0; tránh ranh giới làm tròn',
    paramSpecs: [
      { name: 'x0', label: 'xA', min: 1, max: 6 },
      { name: 'y0', label: 'yA', min: -6, max: -1 },
      { name: 'z0', label: 'zA', min: 1, max: 5 },
      { name: 's', label: 'Độ lệch s = xA - xB', min: 1, max: 4 },
    ],
    validateCode: `
      const { x0, y0, s } = params;
      if (s <= 0) return { valid: false, reason: 's phải dương' };
      const sumAB = x0 + y0 - s / 3;
      const frac = Math.abs((Math.abs(sumAB * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, s } = params;
      const dP = x0 + y0 + z0;
      const xB = x0 - s, yB = y0 + s, zB = z0;
      const eqP = u.formatPlaneEq(1, 1, 1, -dP);
      const fa = u.simplifyFrac(3 * x0 - 2 * s, 3);
      const fb = u.simplifyFrac(3 * y0 + s, 3);
      const fc = u.simplifyFrac(3 * z0 + s, 3);
      const sumFrac = u.simplifyFrac(3 * (x0 + y0) - s, 3);
      const rounded = Number(sumFrac.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Trong không gian với hệ tọa độ $Oxyz$, cho mặt phẳng $(P): ' + eqP + '$ và hai điểm $A' + u.formatCoord3D(x0, y0, z0) + '$, $B' + u.formatCoord3D(xB, yB, zB) + '$. Gọi $M(a;b;c) \\in (P)$ sao cho $c > ' + z0 + '$, $MA = MB$ và góc $\\widehat{AMB} = 120^\\circ$. Tính $a+b$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vì $MA = MB$ nên $M$ thuộc mặt phẳng trung trực $(Q)$ của $AB$. Giao tuyến $\\Delta = (P)\\cap(Q)$ có VTCP $\\vec{u}=(1;1;-2)$ và đi qua trung điểm $I$ của $AB$.',
          'Đặt $\\overrightarrow{IM} = \\tau(1;1;-2)$, khi đó $IM^2 = 6\\tau^2$ và $IA^2 = \\dfrac{' + (s * s) + '}{2}$.',
          'Tam giác $MAB$ cân tại $M$ có $\\widehat{AMB}=120^\\circ \\Leftrightarrow IM = \\dfrac{IA}{\\sqrt{3}} \\Leftrightarrow 6\\tau^2 = \\dfrac{' + (s * s) + '}{6} \\Leftrightarrow \\tau = \\pm\\dfrac{' + s + '}{6}$.',
          'Do $c > ' + z0 + '$ nên chọn $\\tau = -\\dfrac{' + s + '}{6} \\Rightarrow M(' + fa.latex + ';\\, ' + fb.latex + ';\\, ' + fc.latex + ')$, suy ra $a+b = ' + sumFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên s = 0 (A trùng B)', params: { x0: 4, y0: -4, z0: 2, s: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46', params: { x0: 4, y0: -4, z0: 2, s: 1 }, expectedValid: true },
    ],
  },

  // Dạng 47 (Q47): Tìm M trên (P): x = xP sao cho MA = MB và góc AMB lớn nhất
  t12_b14_d47_max_angle_coord_plane_sa: {
    id: 't12_b14_d47_max_angle_coord_plane_sa',
    name: 'Tìm điểm M trên mặt phẳng x = xP để MA = MB và góc AMB đạt giá trị lớn nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hình học Oxyz',
    description: 'Cho (P): x - xP = 0 và hai điểm A, B. Tìm M(a;b;c) ∈ (P) sao cho MA = MB và góc AMB lớn nhất, tính k1*b + k2*c.',
    conditionSummary: 'h >= 1, A và B có cùng cao độ zA',
    paramSpecs: [
      { name: 'xP', label: 'Hằng số xP của (P)', min: -2, max: 3 },
      { name: 'xA', label: 'xA', min: -5, max: 1 },
      { name: 'yA', label: 'yA', min: -3, max: 3 },
      { name: 'zA', label: 'zA', min: 1, max: 6 },
      { name: 'h', label: 'Nửa hiệu h = (xB - xA)/2', min: 1, max: 3 },
      { name: 'k1', label: 'Hệ số k1', min: 1, max: 4 },
      { name: 'k2', label: 'Hệ số k2', min: 1, max: 4 },
    ],
    validateCode: `
      const { xP, xA, h, k1, k2 } = params;
      if (h <= 0 || k1 <= 0 || k2 <= 0) return { valid: false, reason: 'Tham số h, k1, k2 phải dương' };
      if (xP === xA + h) return { valid: false, reason: 'Tránh (P) chứa trung điểm I quá tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xP, xA, yA, zA, h, k1, k2 } = params;
      const xB = xA + 2 * h, yB = yA - 2 * h, zB = zA;
      const xI = xA + h, yI = yA - h;
      const eqP = u.formatPlaneEq(1, 0, 0, -xP);
      // (Q): x - y - (xI - yI) = 0
      const dQ = -(xI - yI);
      const eqQ = u.formatPlaneEq(1, -1, 0, dQ);
      // On Delta = (P) ∩ (Q): x = xP, y = xP + dQ, z = t
      const b = xP + dQ, c = zA;
      const ans = k1 * b + k2 * c;
      const shortAnswer = String(ans);
      const expr = (k1 === 1 ? 'b' : k1 + 'b') + ' + ' + (k2 === 1 ? 'c' : k2 + 'c');
      return {
        stem: 'Trong không gian với hệ tọa độ $Oxyz$, cho mặt phẳng $(P): ' + eqP + '$ và hai điểm $A' + u.formatCoord3D(xA, yA, zA) + '$, $B' + u.formatCoord3D(xB, yB, zB) + '$. Gọi $M(a;b;c) \\in (P)$ sao cho $MA = MB$ và góc $\\widehat{AMB}$ có số đo lớn nhất. Tính $' + expr + '$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Mặt phẳng trung trực $(Q)$ của $AB$ đi qua $I' + u.formatCoord3D(xI, yI, zA) + '$ và có phương trình $' + eqQ + '$.',
          'Giao tuyến $\\Delta = (P) \\cap (Q)$ gồm các điểm $M(' + xP + ';\\, ' + b + ';\\, t)$ ($t \\in \\mathbb{R}$).',
          'Ta có $\\cos\\widehat{AMB} = 1 - \\dfrac{AB^2}{2MA^2}$ nên $\\widehat{AMB}$ lớn nhất $\\Leftrightarrow MA^2$ nhỏ nhất $\\Leftrightarrow t = ' + zA + '$.',
          'Do đó $M' + u.formatCoord3D(xP, b, c) + ' \\Rightarrow ' + expr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 0', params: { xP: 0, xA: -3, yA: 0, zA: 4, h: 0, k1: 2, k2: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47', params: { xP: 0, xA: -3, yA: 0, zA: 4, h: 1, k1: 2, k2: 2 }, expectedValid: true },
    ],
  },

  // Dạng 48 (Q48): Tìm M trên (P) tổng quát sao cho MA = MB và góc AMB lớn nhất
  t12_b14_d48_max_angle_general_plane_sa: {
    id: 't12_b14_d48_max_angle_general_plane_sa',
    name: 'Tìm điểm M trên mặt phẳng (P) tổng quát để MA = MB và góc AMB lớn nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hình học Oxyz',
    description: 'Cho mặt phẳng (P): Ax + By + Cz + D = 0 và hai điểm A, B. Tìm M(a;b;c) ∈ (P) sao cho MA = MB và góc AMB lớn nhất, tính biểu thức k1*a + k2*b + k3*c.',
    conditionSummary: 'n_P và AB không cùng phương, M là hình chiếu vuông góc của trung điểm I lên giao tuyến Δ',
    paramSpecs: [
      { name: 'aM', label: 'Hoành độ M (a)', min: -5, max: 3 },
      { name: 'bM', label: 'Tung độ M (b)', min: -3, max: 4 },
      { name: 'cM', label: 'Cao độ M (c)', min: -4, max: 3 },
      { name: 'aP', label: 'A_P', min: 1, max: 4 },
      { name: 'bP', label: 'B_P', min: 1, max: 3 },
      { name: 'cP', label: 'C_P', min: -3, max: -1 },
      { name: 'kSign', label: 'Hệ số biểu thức (-1 hoặc 1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { aP, bP, cP } = params;
      const qx = 0, qy = 2, qz = -1;
      const ux = bP * qz - cP * qy;
      const uy = cP * qx - aP * qz;
      const uz = aP * qy - bP * qx;
      if (ux === 0 && uy === 0 && uz === 0) return { valid: false, reason: 'n_P và AB cùng phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aM, bM, cM, aP, bP, cP, kSign } = params;
      const dP = -(aP * aM + bP * bM + cP * cM);
      const qx = 0, qy = 2, qz = -1;
      const ux0 = bP * qz - cP * qy;
      const uy0 = cP * qx - aP * qz;
      const uz0 = aP * qy - bP * qx;
      const gu = u.gcd(ux0, u.gcd(uy0, uz0));
      const ux = ux0 / gu, uy = uy0 / gu, uz = uz0 / gu;
      // w = n_Q × u is perpendicular to both n_Q and u -> I = M - w ensures M ∈ Δ and IM ⊥ u
      const wx = qy * uz - qz * uy;
      const wy = qz * ux - qx * uz;
      const wz = qx * uy - qy * ux;
      const xI = aM - wx, yI = bM - wy, zI = cM - wz;
      const xA = xI - 2 * qx, yA = yI - 2 * qy, zA = zI - 2 * qz;
      const xB = xI + 2 * qx, yB = yI + 2 * qy, zB = zI + 2 * qz;
      const eqP = u.formatPlaneEq(aP, bP, cP, dP);
      const dQ = -(qx * xI + qy * yI + qz * zI);
      const eqQ = u.formatPlaneEq(qx, qy, qz, dQ);
      const c2 = kSign === 0 ? -1 : 2;
      const expr = c2 < 0 ? 'a - b + c' : 'a + 2b + c';
      const ans = aM + c2 * bM + cM;
      const shortAnswer = String(ans);
      return {
        stem: 'Trong không gian với hệ tọa độ $Oxyz$, cho mặt phẳng $(P): ' + eqP + '$ và hai điểm $A' + u.formatCoord3D(xA, yA, zA) + '$, $B' + u.formatCoord3D(xB, yB, zB) + '$. Gọi $M(a;b;c) \\in (P)$ sao cho $MA = MB$ và góc $\\widehat{AMB}$ có số đo lớn nhất. Tính $' + expr + '$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Mặt phẳng trung trực $(Q)$ của $AB$ qua trung điểm $I' + u.formatCoord3D(xI, yI, zI) + '$ và có phương trình $' + eqQ + '$.',
          'Giao tuyến $\\Delta = (P)\\cap(Q)$ qua $M' + u.formatCoord3D(aM, bM, cM) + '$ và có VTCP $\\vec{u}=' + u.formatCoord3D(ux, uy, uz) + '$.',
          'Đặt $M_t = M + t\\vec{u} \\in \\Delta$. Vì $\\widehat{AMB}$ lớn nhất $\\Leftrightarrow MA^2$ nhỏ nhất $\\Leftrightarrow IM_t^2$ nhỏ nhất, mà $\\overrightarrow{IM}\\cdot\\vec{u} = 0$ nên $t = 0$.',
          'Vậy $M' + u.formatCoord3D(aM, bM, cM) + ' \\Rightarrow ' + expr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n_P cùng phương AB', params: { aM: 1, bM: 1, cM: 1, aP: 0, bP: 2, cP: -1, kSign: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48', params: { aM: -3, bM: 1, cM: -2, aP: 3, bP: 1, cP: -2, kSign: 0 }, expectedValid: true },
    ],
  },

  // Dạng 49 (Q49): Thể tích tứ diện OABC với mặt phẳng (α) qua A(a0;0;0), vuông góc (P), cách O khoảng d
  t12_b14_d49_tetra_volume_perp_dist_sa: {
    id: 't12_b14_d49_tetra_volume_perp_dist_sa',
    name: 'Tính thể tích tứ diện OABC khi (α) qua A(a0;0;0), vuông góc (P) và cách O một khoảng d',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách và mặt phẳng theo đoạn chắn',
    description: 'Mặt phẳng (α) qua A(a0;0;0) vuông góc (P): -py + qz + D0 = 0, cắt tia Oy, Oz tại B, C và cách O khoảng d. Tính thể tích OABC (làm tròn phần mười).',
    conditionSummary: 'a0, p, q, c0 > 0; thể tích không sát ranh giới .x5',
    paramSpecs: [
      { name: 'a0', label: 'Hoành độ A(a0;0;0)', min: 2, max: 6 },
      { name: 'p', label: 'Hệ số p (âm của y)', min: 1, max: 4 },
      { name: 'q', label: 'Hệ số q (của z)', min: 1, max: 4 },
      { name: 'c0', label: 'Cao độ C(0;0;c0)', min: 1, max: 3 },
    ],
    validateCode: `
      const { a0, p, q, c0 } = params;
      if (a0 <= 0 || p <= 0 || q <= 0 || c0 <= 0) return { valid: false, reason: 'Các tham số phải dương' };
      const b0 = (p * c0) / q;
      const vol = (a0 * b0 * c0) / 6;
      const frac = Math.abs(((vol * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, p, q, c0 } = params;
      const eqP = u.formatPlaneEq(0, -p, q, 4);
      const radBase = p * p * c0 * c0 + a0 * a0 * (p * p + q * q);
      let rad = radBase, sq = 1;
      for (let f = 2; f * f <= rad; f++) {
        while (rad % (f * f) === 0) { rad /= f * f; sq *= f; }
      }
      const dNum = a0 * p * c0;
      const fr = u.simplifyFrac(dNum, sq * rad);
      const dTex = rad === 1
        ? fr.latex
        : fr.den === 1
          ? (fr.num === 1 ? '' : fr.num) + '\\sqrt{' + rad + '}'
          : '\\dfrac{' + (fr.num === 1 ? '' : fr.num) + '\\sqrt{' + rad + '}}{' + fr.den + '}';
      const fb = u.simplifyFrac(p * c0, q);
      const fV = u.simplifyFrac(a0 * p * c0 * c0, 6 * q);
      const rounded = Number(fV.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Trong không gian với hệ tọa độ $Oxyz$, cho mặt phẳng $(P): ' + eqP + '$ và điểm $A' + u.formatCoord3D(a0, 0, 0) + '$. Mặt phẳng $(\\alpha)$ đi qua $A$, vuông góc với $(P)$, cách gốc tọa độ $O$ một khoảng bằng $' + dTex + '$ và cắt các tia $Oy$, $Oz$ lần lượt tại các điểm $B$, $C$ không trùng $O$. Tính thể tích khối tứ diện $OABC$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $B(0;b;0)$, $C(0;0;c)$ với $b, c > 0$. Phương trình $(\\alpha): \\dfrac{x}{' + a0 + '} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1$.',
          'Từ $(\\alpha) \\perp (P) \\Leftrightarrow -\\dfrac{' + p + '}{b} + \\dfrac{' + q + '}{c} = 0 \\Leftrightarrow b = ' + (p === q ? '' : u.simplifyFrac(p, q).latex) + 'c$.',
          'Từ $d(O, (\\alpha)) = ' + dTex + '$, giải phương trình khoảng cách với $c > 0$ thu được $c = ' + c0 + '$ và $b = ' + fb.latex + '$.',
          'Thể tích khối tứ diện: $V_{OABC} = \\dfrac{1}{6}\\cdot OA\\cdot OB\\cdot OC = ' + fV.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a0 = 0', params: { a0: 0, p: 2, q: 3, c0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49', params: { a0: 3, p: 2, q: 3, c0: 1 }, expectedValid: true },
    ],
  },

  // Dạng 50 (Q50): Mặt phẳng qua M cắt 3 tia tạo cấp số nhân độ dài OA, OB, OC, tính d(O, (α))
  t12_b14_d50_gp_intercepts_dist_origin_sa: {
    id: 't12_b14_d50_gp_intercepts_dist_origin_sa',
    name: 'Khoảng cách từ O đến mặt phẳng qua M cắt ba tia tạo cấp số nhân OA, OB, OC',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách và mặt phẳng theo đoạn chắn',
    description: 'Mặt phẳng (α) qua M cắt tia Ox, Oy, Oz tại A, B, C sao cho OA, OB, OC lập thành cấp số nhân công bội q. Tính d(O, (α)) làm tròn phần mười.',
    conditionSummary: 'Tọa độ điểm M dương, công bội q ∈ {2, 3}, không sát .x5',
    paramSpecs: [
      { name: 'q', label: 'Công bội q', min: 2, max: 3 },
      { name: 'xM', label: 'xM', min: 1, max: 4 },
      { name: 'yM', label: 'yM', min: 1, max: 5 },
      { name: 'zM', label: 'zM', min: 1, max: 6 },
    ],
    validateCode: `
      const { q, xM, yM, zM } = params;
      if (q < 2 || xM <= 0 || yM <= 0 || zM <= 0) return { valid: false, reason: 'Tham số phải dương và q >= 2' };
      const k = q * q * xM + q * yM + zM;
      const dist = k / Math.sqrt(q * q * q * q + q * q + 1);
      const frac = Math.abs(((dist * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, xM, yM, zM } = params;
      const q2 = q * q;
      const k = q2 * xM + q * yM + zM;
      const fa = u.simplifyFrac(k, q2);
      const sInt = q2 * q2 + q2 + 1;
      const dist = k / Math.sqrt(sInt);
      const rounded = Number(dist.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eqAlpha = u.formatPlaneEq(q2, q, 1, -k);
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\alpha)$ đi qua điểm $M' + u.formatCoord3D(xM, yM, zM) + '$ và cắt các tia $Ox$, $Oy$, $Oz$ lần lượt tại $A$, $B$, $C$ sao cho độ dài $OA$, $OB$, $OC$ theo thứ tự lập thành một cấp số nhân có công bội bằng $' + q + '$. Tính khoảng cách từ gốc tọa độ $O$ đến mặt phẳng $(\\alpha)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Đặt $OA = a > 0 \\Rightarrow OB = ' + q + 'a,\\, OC = ' + q2 + 'a$. Phương trình mặt phẳng $(\\alpha)$ là $\\dfrac{x}{a} + \\dfrac{y}{' + q + 'a} + \\dfrac{z}{' + q2 + 'a} = 1 \\Leftrightarrow ' + q2 + 'x + ' + q + 'y + z - ' + q2 + 'a = 0$.',
          'Vì $M' + u.formatCoord3D(xM, yM, zM) + ' \\in (\\alpha)$ nên $' + q2 + '\\cdot' + xM + ' + ' + q + '\\cdot' + yM + ' + ' + zM + ' - ' + q2 + 'a = 0 \\Leftrightarrow a = ' + fa.latex + '$.',
          'Suy ra $(\\alpha): ' + eqAlpha + '$ và $d(O, (\\alpha)) = \\dfrac{' + k + '}{\\sqrt{' + sInt + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tọa độ âm', params: { q: 2, xM: -1, yM: 2, zM: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50', params: { q: 2, xM: 1, yM: 2, zM: 1 }, expectedValid: true },
    ],
  },
};
