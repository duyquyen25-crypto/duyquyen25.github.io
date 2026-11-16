import { MathTemplate } from '../types/math';

export const G12_B8_PART3_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (DẠNG 47 -> DẠNG 71)
  // =====================================================================

  // Dạng 47 (Q47): Hình hộp chữ nhật ABCD.A_1B_1C_1D_1 - Trọng tâm B_1C_1D_1
  t12_b8_d47_cuboid_centroid_sa: {
    id: 't12_b8_d47_cuboid_centroid_sa',
    name: 'Tọa độ trọng tâm mặt đáy trên hình hộp chữ nhật ABCD.A1B1C1D1',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hệ trục tọa độ Oxyz trong hình học không gian',
    description: 'Cho hình hộp chữ nhật ABCD.A1B1C1D1 gắn hệ trục tại A. Gọi M(a; b; c) là trọng tâm tam giác B1C1D1. Tính P = p*a + q*b + r*c.',
    conditionSummary: 'Kích thước L, W, H > 0, các hệ số p, q, r khác 0 và không làm tròn tại ranh giới 0,05',
    paramSpecs: [
      { name: 'L', label: 'Độ dài AB', min: 2, max: 8 },
      { name: 'W', label: 'Độ dài AD', min: 2, max: 9 },
      { name: 'H', label: 'Chiều cao AA_1', min: 1, max: 6 },
      { name: 'p', label: 'Hệ số p', min: -4, max: 5, allowZero: false },
      { name: 'q', label: 'Hệ số q', min: -4, max: 5, allowZero: false },
      { name: 'r', label: 'Hệ số r', min: -4, max: 5, allowZero: false },
    ],
    validateCode: `
      const { L, W, H, p, q, r } = params;
      if (L <= 0 || W <= 0 || H <= 0) return { valid: false, reason: 'Kích thước cạnh phải dương' };
      if (p === 0 || q === 0 || r === 0) return { valid: false, reason: 'Các hệ số p, q, r phải khác 0' };
      const val = (2 * p * L + 2 * q * W) / 3 + r * H;
      const frac10 = Math.abs(val * 10 - Math.floor(val * 10) - 0.5);
      if (frac10 < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L, W, H, p, q, r } = params;
      const ax = u.simplifyFrac(2 * L, 3);
      const ay = u.simplifyFrac(2 * W, 3);
      const val = (2 * p * L + 2 * q * W) / 3 + r * H;
      const rounded = Math.round(val * 10) / 10;
      const cleanVal = Object.is(rounded, -0) ? 0 : rounded;
      const shortAnswer = u.formatNumberVN(cleanVal, 1);
      const expr = u.formatLinear(p, 0, 'a') + u.formatTerm(q, 'b', false) + u.formatTerm(r, 'c', false);
      return {
        stem:
          'Cho hình hộp chữ nhật $ABCD.A_1B_1C_1D_1$ có $AB = ' + L + ',\\; AD = ' + W + ',\\; AA_1 = ' + H +
          '$. Xét hệ trục tọa độ $Oxyz$ có gốc $O$ trùng với điểm $A$, các điểm $B, D, A_1$ lần lượt nằm trên các tia $Ox, Oy, Oz$. Gọi $M(a; b; c)$ là trọng tâm của tam giác $B_1C_1D_1$. Tính $P = ' +
          expr + '$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { a: L, b: W, c: H, variant: 1 },
        },
        shortAnswer,
        numericValue: cleanVal,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Trong hệ trục tọa độ đã chọn, ta có $A(0; 0; 0)$, $B(' + L + '; 0; 0)$, $D(0; ' + W + '; 0)$, $C(' + L + '; ' + W + '; 0)$, $A_1(0; 0; ' + H + ')$.',
          'Suy ra $B_1(' + L + '; 0; ' + H + ')$, $C_1(' + L + '; ' + W + '; ' + H + ')$, $D_1(0; ' + W + '; ' + H + ')$.',
          'Trọng tâm $M$ của tam giác $B_1C_1D_1$ có tọa độ $M\\left(' + ax.latex + ';\\, ' + ay.latex + ';\\, ' + H + '\\right)$.',
          'Vậy $P = ' + expr + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số p = 0', params: { L: 4, W: 5, H: 1, p: 0, q: -2, r: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47 AB=4, AD=5, AA1=1, P=3a-2b+2c', params: { L: 4, W: 5, H: 1, p: 3, q: -2, r: 2 }, expectedValid: true },
    ],
  },

  // Dạng 48 (Q48): Phương trình vectơ k*c - k*x = k*a
  t12_b8_d48_vec_linear_eq_sa: {
    id: 't12_b8_d48_vec_linear_eq_sa',
    name: 'Tìm tổng tọa độ vectơ x từ phương trình k*c - k*x = k*a',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Phép toán vectơ theo tọa độ',
    description: 'Cho hai vectơ c và a, tìm vectơ x = (a; b; c) thỏa mãn kc - kx = ka và tính a + b + c.',
    conditionSummary: 'Hệ số k >= 2 và hai vectơ không đồng thời bằng nhau',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 2, max: 6 },
      { name: 'xc', label: 'c_x', min: -10, max: 10 },
      { name: 'yc', label: 'c_y', min: -10, max: 10 },
      { name: 'zc', label: 'c_z', min: -10, max: 10 },
      { name: 'xa', label: 'a_x', min: -8, max: 8 },
      { name: 'ya', label: 'a_y', min: -8, max: 8 },
      { name: 'za', label: 'a_z', min: -8, max: 8 },
    ],
    validateCode: `
      const { k, xc, yc, zc, xa, ya, za } = params;
      if (k < 2) return { valid: false, reason: 'Hệ số k phải >= 2' };
      if (xc === xa && yc === ya && zc === za) return { valid: false, reason: 'Vectơ x bị triệt tiêu thành vectơ-không' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, xc, yc, zc, xa, ya, za } = params;
      const x1 = xc - xa;
      const x2 = yc - ya;
      const x3 = zc - za;
      const sum = x1 + x2 + x3;
      const shortAnswer = String(sum);
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai vectơ $\\overrightarrow{c} = ' +
          u.formatCoord3D(xc, yc, zc) +
          '$, $\\overrightarrow{a} = ' +
          u.formatCoord3D(xa, ya, za) +
          '$. Biết vectơ $\\overrightarrow{x} = (a; b; c)$ thỏa mãn $' +
          k + '\\overrightarrow{c} - ' + k + '\\overrightarrow{x} = ' + k + '\\overrightarrow{a}$. Tính $a + b + c$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $' + k + '\\overrightarrow{c} - ' + k + '\\overrightarrow{x} = ' + k + '\\overrightarrow{a} \\Rightarrow \\overrightarrow{x} = \\overrightarrow{c} - \\overrightarrow{a}$.',
          'Suy ra $\\overrightarrow{x} = ' + u.formatCoord3D(x1, x2, x3) + '$.',
          'Do đó $a + b + c = ' + x1 + u.formatTrailingConst(x2) + u.formatTrailingConst(x3) + ' = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = a', params: { k: 2, xc: 1, yc: 2, zc: 3, xa: 1, ya: 2, za: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48 k=2, c(-7;6;3), a(2;0;-1)', params: { k: 2, xc: -7, yc: 6, zc: 3, xa: 2, ya: 0, za: -1 }, expectedValid: true },
    ],
  },

  // Dạng 49 (Q49): Điểm đối xứng qua điểm cho trước
  t12_b8_d49_symmetry_point_sa: {
    id: 't12_b8_d49_symmetry_point_sa',
    name: 'Tìm điểm P đối xứng với E qua F và tính tổng tọa độ',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Trung điểm và đối xứng tâm',
    description: 'Cho điểm E và tâm đối xứng F. Tìm tọa độ điểm P(a; b; c) đối xứng với E qua F và tính a + b + c.',
    conditionSummary: 'E và F là hai điểm phân biệt trong không gian',
    paramSpecs: [
      { name: 'xE', label: 'x_E', min: -12, max: 12 },
      { name: 'yE', label: 'y_E', min: -12, max: 12 },
      { name: 'zE', label: 'z_E', min: -12, max: 12 },
      { name: 'xF', label: 'x_F', min: -12, max: 12 },
      { name: 'yF', label: 'y_F', min: -12, max: 12 },
      { name: 'zF', label: 'z_F', min: -12, max: 12 },
    ],
    validateCode: `
      const { xE, yE, zE, xF, yF, zF } = params;
      if (xE === xF && yE === yF && zE === zF) {
        return { valid: false, reason: 'Hai điểm E và F phải phân biệt' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xE, yE, zE, xF, yF, zF } = params;
      const xP = 2 * xF - xE;
      const yP = 2 * yF - yE;
      const zP = 2 * zF - zE;
      const sum = xP + yP + zP;
      const shortAnswer = String(sum);
      const wNum = (n) => (n < 0 ? '(' + n + ')' : String(n));
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai điểm $E' + u.formatCoord3D(xE, yE, zE) + '$ và $F' + u.formatCoord3D(xF, yF, zF) +
          '$. Biết điểm $P(a; b; c)$ thỏa mãn $E$ và $P$ đối xứng nhau qua $F$. Tính $a + b + c$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vì $E$ và $P$ đối xứng nhau qua $F$ nên $F$ là trung điểm của đoạn thẳng $EP$.',
          'Ta có $x_P = 2x_F - x_E = 2 \\cdot ' + wNum(xF) + ' - ' + wNum(xE) + ' = ' + xP + '$, $y_P = 2 \\cdot ' + wNum(yF) + ' - ' + wNum(yE) + ' = ' + yP + '$, $z_P = 2 \\cdot ' + wNum(zF) + ' - ' + wNum(zE) + ' = ' + zP + '$.',
          'Vậy $P' + u.formatCoord3D(xP, yP, zP) + '$ và $a + b + c = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên E trùng F', params: { xE: 1, yE: -3, zE: 8, xF: 1, yF: -3, zF: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49 E(1;-3;8), F(-10;-1;8)', params: { xE: 1, yE: -3, zE: 8, xF: -10, yF: -1, zF: 8 }, expectedValid: true },
    ],
  },

  // Dạng 50 (Q50): Đỉnh thứ tư hình bình hành BDNP
  t12_b8_d50_parallelogram_vertex_sa: {
    id: 't12_b8_d50_parallelogram_vertex_sa',
    name: 'Tìm đỉnh P của hình bình hành BDNP và tính tổng tọa độ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hình bình hành trong không gian Oxyz',
    description: 'Cho ba điểm không thẳng hàng B, D, N. Tìm P(a; b; c) sao cho tứ giác BDNP là hình bình hành và tính a + b + c.',
    conditionSummary: 'Ba điểm B, D, N không thẳng hàng',
    paramSpecs: [
      { name: 'xB', label: 'x_B', min: -10, max: 10 },
      { name: 'yB', label: 'y_B', min: -10, max: 10 },
      { name: 'zB', label: 'z_B', min: -10, max: 10 },
      { name: 'xD', label: 'x_D', min: -10, max: 10 },
      { name: 'yD', label: 'y_D', min: -10, max: 10 },
      { name: 'zD', label: 'z_D', min: -10, max: 10 },
      { name: 'xN', label: 'x_N', min: -12, max: 14 },
      { name: 'yN', label: 'y_N', min: -10, max: 10 },
      { name: 'zN', label: 'z_N', min: -10, max: 10 },
    ],
    validateCode: `
      const { xB, yB, zB, xD, yD, zD, xN, yN, zN } = params;
      const u1 = xD - xB, u2 = yD - yB, u3 = zD - zB;
      const v1 = xN - xB, v2 = yN - yB, v3 = zN - zB;
      const cx = u2 * v3 - u3 * v2, cy = u3 * v1 - u1 * v3, cz = u1 * v2 - u2 * v1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'B, D, N thẳng hàng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xB, yB, zB, xD, yD, zD, xN, yN, zN } = params;
      const dnX = xN - xD, dnY = yN - yD, dnZ = zN - zD;
      const xP = xB + dnX, yP = yB + dnY, zP = zB + dnZ;
      const sum = xP + yP + zP;
      const shortAnswer = String(sum);
      return {
        stem:
          'Trong không gian $Oxyz$, cho các điểm $B' + u.formatCoord3D(xB, yB, zB) + '$, $D' + u.formatCoord3D(xD, yD, zD) +
          '$, $N' + u.formatCoord3D(xN, yN, zN) + '$. Điểm $P(a; b; c)$ được xác định sao cho tứ giác $BDNP$ là hình bình hành. Tính tổng $a + b + c$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{DN} = ' + u.formatCoord3D(dnX, dnY, dnZ) + '$.',
          'Vì $BDNP$ là hình bình hành nên $\\overrightarrow{BP} = \\overrightarrow{DN}$.',
          'Do đó $P = B + \\overrightarrow{DN} = ' + u.formatCoord3D(xP, yP, zP) + '$, suy ra $a + b + c = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B, D, N thẳng hàng', params: { xB: 0, yB: 0, zB: 0, xD: 1, yD: 1, zD: 1, xN: 2, yN: 2, zN: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50 B(-6;4;-4), D(-3;3;-1), N(12;-1;5)', params: { xB: -6, yB: 4, zB: -4, xD: -3, yD: 3, zD: -1, xN: 12, yN: -1, zN: 5 }, expectedValid: true },
    ],
  },

  // Dạng 51 (Q51): Giao điểm đường thẳng NC với (Oxy)
  t12_b8_d51_collinear_oxy_sa: {
    id: 't12_b8_d51_collinear_oxy_sa',
    name: 'Tìm điểm P thuộc (Oxy) thẳng hàng với hai điểm N, C cho trước',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ba điểm thẳng hàng trong không gian Oxyz',
    description: 'Cho hai điểm N, C với zN khác zC. Tìm điểm P(a; b; c) thuộc mặt phẳng (Oxy) sao cho N, C, P thẳng hàng và tính a + b + c.',
    conditionSummary: 'Đường thẳng NC cắt (Oxy) tại một điểm duy nhất (zN != zC) và tránh làm tròn nửa',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -10, max: 10 },
      { name: 'yN', label: 'y_N', min: -10, max: 10 },
      { name: 'zN', label: 'z_N', min: -8, max: 8, allowZero: false },
      { name: 'xC', label: 'x_C', min: -10, max: 10 },
      { name: 'yC', label: 'y_C', min: -10, max: 10 },
      { name: 'zC', label: 'z_C', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { zN, zC, xN, yN, xC, yC } = params;
      if (zN === 0 || zC === 0 || zN === zC) {
        return { valid: false, reason: 'Cần z_N != 0, z_C != 0 và z_N != z_C để NC cắt (Oxy) duy nhất' };
      }
      const k = -zN / (zC - zN);
      const sum = xN + k * (xC - xN) + yN + k * (yC - yN);
      if (Math.abs(sum * 10 - Math.floor(sum * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN, xC, yC, zC } = params;
      const dx = xC - xN, dy = yC - yN, dz = zC - zN;
      const kf = u.simplifyFrac(-zN, dz);
      const ax = u.simplifyFrac(xN * dz - zN * dx, dz);
      const by = u.simplifyFrac(yN * dz - zN * dy, dz);
      const val = ax.value + by.value;
      const rounded = Math.round(val * 10) / 10;
      const cleanVal = Object.is(rounded, -0) ? 0 : rounded;
      const shortAnswer = u.formatNumberVN(cleanVal, 1);
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai điểm $N' + u.formatCoord3D(xN, yN, zN) + '$ và $C' + u.formatCoord3D(xC, yC, zC) +
          '$. Tìm điểm $P(a; b; c)$ thuộc mặt phẳng $(Oxy)$ sao cho $N, C, P$ thẳng hàng. Tính tổng $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: cleanVal,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vì $P \\in (Oxy)$ nên $P(a; b; 0)$. Ta có $\\overrightarrow{NP} = (' + u.formatShift('a', -xN) + ';\\, ' + u.formatShift('b', -yN) + ';\\, ' + (-zN) + ')$ và $\\overrightarrow{NC} = ' + u.formatCoord3D(dx, dy, dz) + '$.',
          'Ba điểm $N, C, P$ thẳng hàng khi $\\overrightarrow{NP} = k\\overrightarrow{NC}$, suy ra $k = \\frac{' + (-zN) + '}{' + dz + '} = ' + kf.latex + '$.',
          'Từ đó $P\\left(' + ax.latex + ';\\, ' + by.latex + ';\\, 0\\right) \\Rightarrow a + b + c \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên NC song song (Oxy) zN = zC', params: { xN: 1, yN: 2, zN: 3, xC: 4, yC: -1, zC: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q51 N(-8;5;-5), C(-7;2;1)', params: { xN: -8, yN: 5, zN: -5, xC: -7, yC: 2, zC: 1 }, expectedValid: true },
    ],
  },

  // Dạng 52 (Q52): Tìm m để hai vectơ chứa tham số vuông góc
  t12_b8_d52_perp_param_m_sa: {
    id: 't12_b8_d52_perp_param_m_sa',
    name: 'Tìm tham số m để hai vectơ u và c vuông góc (làm tròn phần mười)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tích vô hướng và điều kiện vuông góc',
    description: 'Cho hai vectơ u = (-m - a; y1; z1) và c = (x2; p*m + q; z2). Tìm m để u vuông góc với c.',
    conditionSummary: 'Hệ số của m trong phương trình tích vô hướng khác 0 và không rơi vào ranh giới làm tròn',
    paramSpecs: [
      { name: 'a', label: 'Hệ số dịch a', min: -6, max: 6 },
      { name: 'y1', label: 'u_y', min: -6, max: 6, allowZero: false },
      { name: 'z1', label: 'u_z', min: -6, max: 6, allowZero: false },
      { name: 'x2', label: 'c_x', min: -8, max: 9, allowZero: false },
      { name: 'p', label: 'Hệ số p của m', min: 1, max: 4 },
      { name: 'q', label: 'Hệ số tự do q', min: -6, max: 6 },
      { name: 'z2', label: 'c_z', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, y1, z1, x2, p, q, z2 } = params;
      if (y1 === 0 || z1 === 0 || x2 === 0 || p === 0 || z2 === 0) {
        return { valid: false, reason: 'Các hệ số khác 0' };
      }
      const den = p * y1 - x2;
      if (den === 0) return { valid: false, reason: 'Hệ số của m bằng 0' };
      const num = a * x2 - q * y1 - z1 * z2;
      const m = num / den;
      if (Math.abs(m * 10 - Math.floor(m * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, y1, z1, x2, p, q, z2 } = params;
      const den = p * y1 - x2;
      const num = a * x2 - q * y1 - z1 * z2;
      const mf = u.simplifyFrac(num, den);
      const rounded = Math.round(mf.value * 10) / 10;
      const cleanVal = Object.is(rounded, -0) ? 0 : rounded;
      const shortAnswer = u.formatNumberVN(cleanVal, 1);
      const u1Expr = u.formatLinear(-1, -a, 'm');
      const c2Expr = u.formatLinear(p, q, 'm');
      const wNum = (n) => (n < 0 ? '(' + n + ')' : String(n));
      return {
        stem:
          'Trong hệ trục tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{u} = (' + u1Expr + ';\\, ' + y1 + ';\\, ' + z1 +
          ')$ và $\\overrightarrow{c} = (' + x2 + ';\\, ' + c2Expr + ';\\, ' + z2 +
          ')$. Tìm giá trị của $m$ để vectơ $\\overrightarrow{u}$ và vectơ $\\overrightarrow{c}$ vuông góc (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: cleanVal,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$\\overrightarrow{u} \\perp \\overrightarrow{c} \\Leftrightarrow \\overrightarrow{u} \\cdot \\overrightarrow{c} = 0$.',
          'Ta có $(' + u1Expr + ') \\cdot ' + wNum(x2) + ' + ' + wNum(y1) + '(' + c2Expr + ') + ' + wNum(z1) + ' \\cdot ' + wNum(z2) + ' = 0$.',
          'Giải ra $m = ' + mf.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số m triệt tiêu (p*y1 = x2)', params: { a: 1, y1: 2, z1: 2, x2: 4, p: 2, q: 3, z2: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q52 a=1, y1=-2, z1=2, x2=7, p=2, q=3, z2=6', params: { a: 1, y1: -2, z1: 2, x2: 7, p: 2, q: 3, z2: 6 }, expectedValid: true },
    ],
  },

  // Dạng 53 (Q53): Bài toán thực tế chuyển động thẳng đều viên đạn theo vectơ vận tốc
  t12_b8_d53_bullet_motion_sa: {
    id: 't12_b8_d53_bullet_motion_sa',
    name: 'Xác định tọa độ mục tiêu khi biết vị trí đầu, thời gian và vectơ vận tốc',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng thực tế tọa độ vectơ',
    description: 'Viên đạn xuất phát từ A chuyển động thẳng đều với vận tốc v trong t giây tới D(a; b; c). Tính a + b + c.',
    conditionSummary: 'Thời gian t > 0 và vectơ vận tốc khác vectơ-không',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -10, max: 12 },
      { name: 'yA', label: 'y_A', min: -10, max: 12 },
      { name: 'zA', label: 'z_A', min: 1, max: 12 },
      { name: 't', label: 'Thời gian t (giây)', min: 2, max: 8 },
      { name: 'vx', label: 'v_x', min: -6, max: 6 },
      { name: 'vy', label: 'v_y', min: -6, max: 6 },
      { name: 'vz', label: 'v_z', min: -5, max: 7 },
    ],
    validateCode: `
      const { t, vx, vy, vz } = params;
      if (t <= 0) return { valid: false, reason: 'Thời gian t phải dương' };
      if (vx === 0 && vy === 0 && vz === 0) return { valid: false, reason: 'Vectơ vận tốc khác vectơ-không' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, t, vx, vy, vz } = params;
      const xD = xA + t * vx;
      const yD = yA + t * vy;
      const zD = zA + t * vz;
      const sum = xD + yD + zD;
      const shortAnswer = String(sum);
      return {
        stem:
          'Trong không gian $Oxyz$, một viên đạn được bắn ra từ điểm $A' + u.formatCoord3D(xA, yA, zA) +
          '$ và trong $' + t + '$ giây, đầu đạn đi với vận tốc không đổi, vectơ vận tốc (trên giây) là $\\overrightarrow{v} = ' +
          u.formatCoord3D(vx, vy, vz) + '$. Biết viên đạn trúng mục tiêu tại điểm $D(a; b; c)$. Tính $a + b + c$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Sau $' + t + '$ giây, vị trí mục tiêu là $D = A + ' + t + '\\overrightarrow{v}$.',
          'Ta có $D = ' + u.formatCoord3D(xA, yA, zA) + ' + ' + t + u.formatCoord3D(vx, vy, vz) + ' = ' + u.formatCoord3D(xD, yD, zD) + '$.',
          'Vậy $a + b + c = ' + xD + u.formatTrailingConst(yD) + u.formatTrailingConst(zD) + ' = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vận tốc bằng 0', params: { xA: 10, yA: 7, zA: 8, t: 3, vx: 0, vy: 0, vz: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q53 A(10;7;8), t=3, v(-2;-2;5)', params: { xA: 10, yA: 7, zA: 8, t: 3, vx: -2, vy: -2, vz: 5 }, expectedValid: true },
    ],
  },

  // Dạng 54 (Q54): Trọng tâm tam giác có tham số ở cả đỉnh và trọng tâm
  t12_b8_d54_triangle_centroid_sa: {
    id: 't12_b8_d54_triangle_centroid_sa',
    name: 'Tìm tham số a, b, c từ công thức trọng tâm tam giác NDB',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Trọng tâm tam giác trong không gian Oxyz',
    description: 'Cho hai đỉnh N, D, đỉnh B(a; yB; b) và trọng tâm G(xG; c; zG). Tìm a, b, c và tính a + b + c.',
    conditionSummary: 'Ba đỉnh N, D, B không thẳng hàng',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -8, max: 8 },
      { name: 'yN', label: 'y_N', min: -8, max: 8 },
      { name: 'zN', label: 'z_N', min: -10, max: 8 },
      { name: 'xD', label: 'x_D', min: -8, max: 8 },
      { name: 'yD', label: 'y_D', min: -8, max: 8 },
      { name: 'zD', label: 'z_D', min: -12, max: 6 },
      { name: 'a', label: 'a = x_B', min: -8, max: 8 },
      { name: 'b', label: 'b = z_B', min: -8, max: 8 },
      { name: 'c', label: 'c = y_G', min: -6, max: 8 },
    ],
    validateCode: `
      const { xN, yN, zN, xD, yD, zD, a, b, c } = params;
      const yB = 3 * c - yN - yD;
      const u1 = xD - xN, u2 = yD - yN, u3 = zD - zN;
      const v1 = a - xN, v2 = yB - yN, v3 = b - zN;
      const cx = u2 * v3 - u3 * v2, cy = u3 * v1 - u1 * v3, cz = u1 * v2 - u2 * v1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'N, D, B thẳng hàng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN, xD, yD, zD, a, b, c } = params;
      const yB = 3 * c - yN - yD;
      const gx = u.simplifyFrac(xN + xD + a, 3);
      const gz = u.simplifyFrac(zN + zD + b, 3);
      const sum = a + b + c;
      const shortAnswer = String(sum);
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $NDB$ với $N' + u.formatCoord3D(xN, yN, zN) +
          '$, $D' + u.formatCoord3D(xD, yD, zD) + '$, $B(a;\\, ' + yB + ';\\, b)$. Tam giác $NDB$ có trọng tâm $G\\left(' +
          gx.latex + ';\\, c;\\, ' + gz.latex + '\\right)$. Tính $a + b + c$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Do $G$ là trọng tâm của tam giác $NDB$ nên:',
          '$' + xN + u.formatTrailingConst(xD) + ' + a = 3 \\cdot \\left(' + gx.latex + '\\right) \\Rightarrow a = ' + a + '$.',
          '$' + yN + u.formatTrailingConst(yD) + u.formatTrailingConst(yB) + ' = 3c \\Rightarrow c = ' + c + '$.',
          '$' + zN + u.formatTrailingConst(zD) + ' + b = 3 \\cdot \\left(' + gz.latex + '\\right) \\Rightarrow b = ' + b + '$.',
          'Vậy $a + b + c = ' + a + u.formatTrailingConst(b) + u.formatTrailingConst(c) + ' = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên N, D, B thẳng hàng', params: { xN: 0, yN: 0, zN: 0, xD: 1, yD: 1, zD: 1, a: 2, b: 2, c: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q54 N(-3;4;-8), D(-4;6;-11), a=-4, b=1, c=4', params: { xN: -3, yN: 4, zN: -8, xD: -4, yD: 6, zD: -11, a: -4, b: 1, c: 4 }, expectedValid: true },
    ],
  },

  // Dạng 55 (Q55): Tam giác vuông tại N có đỉnh chứa tham số m
  t12_b8_d55_right_triangle_param_sa: {
    id: 't12_b8_d55_right_triangle_param_sa',
    name: 'Tìm tham số m để tam giác NPD vuông tại N',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tam giác vuông trong không gian Oxyz',
    description: 'Cho N, P và điểm D(-p*m + q; yD; zD). Tìm giá trị nguyên của m để tam giác NPD vuông tại N.',
    conditionSummary: 'Các điểm phân biệt và nghiệm m là số nguyên',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -6, max: 6 },
      { name: 'yN', label: 'y_N', min: -6, max: 6 },
      { name: 'zN', label: 'z_N', min: -6, max: 6 },
      { name: 'xP', label: 'x_P', min: -8, max: 8 },
      { name: 'yP', label: 'y_P', min: -8, max: 8 },
      { name: 'zP', label: 'z_P', min: -8, max: 8 },
      { name: 'yD', label: 'y_D', min: -8, max: 8 },
      { name: 'zD', label: 'z_D', min: -8, max: 8 },
      { name: 'p', label: 'Hệ số p của m', min: -3, max: 3, allowZero: false },
      { name: 'q', label: 'Hằng số q', min: -9, max: 9 },
    ],
    validateCode: `
      const { xN, yN, zN, xP, yP, zP, yD, zD, p, q } = params;
      if (p === 0) return { valid: false, reason: 'Hệ số p phải khác 0' };
      const npX = xP - xN, npY = yP - yN, npZ = zP - zN;
      if (npX === 0) return { valid: false, reason: 'Hoành độ P phải khác N để xuất hiện ẩn m' };
      if (yD === yN && zD === zN) return { valid: false, reason: 'Tránh D trùng N' };
      const dotYZ = npY * (yD - yN) + npZ * (zD - zN);
      if (dotYZ % npX !== 0) return { valid: false, reason: 'Cần chia hết cho x_P - x_N' };
      const ndX = -dotYZ / npX;
      const xD = xN + ndX;
      if ((xD - q) % p !== 0) return { valid: false, reason: 'Nghiệm m phải là số nguyên' };
      if (ndX === 0 && yD === yN && zD === zN) return { valid: false, reason: 'D trùng N' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN, xP, yP, zP, yD, zD, p, q } = params;
      const npX = xP - xN, npY = yP - yN, npZ = zP - zN;
      const dotYZ = npY * (yD - yN) + npZ * (zD - zN);
      const ndX = -dotYZ / npX;
      const xD = xN + ndX;
      const mAns = (xD - q) / p;
      const shortAnswer = String(mAns);
      const xDExpr = u.formatLinear(p, q, 'm');
      const ndXExpr = u.formatLinear(p, q - xN, 'm');
      const wNum = (n) => (n < 0 ? '(' + n + ')' : String(n));
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $NPD$ với $N' + u.formatCoord3D(xN, yN, zN) +
          '$, $P' + u.formatCoord3D(xP, yP, zP) + '$, $D(' + xDExpr + ';\\, ' + yD + ';\\, ' + zD +
          ')$. Tìm giá trị của $m$ để tam giác $NPD$ vuông tại $N$.',
        shortAnswer,
        numericValue: mAns,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{NP} = ' + u.formatCoord3D(npX, npY, npZ) + '$ và $\\overrightarrow{ND} = (' + ndXExpr + ';\\, ' + (yD - yN) + ';\\, ' + (zD - zN) + ')$.',
          'Tam giác $NPD$ vuông tại $N$ khi $\\overrightarrow{NP} \\cdot \\overrightarrow{ND} = 0$.',
          'Suy ra $' + wNum(npX) + '(' + ndXExpr + ') + ' + wNum(npY) + ' \\cdot ' + wNum(yD - yN) + ' + ' + wNum(npZ) + ' \\cdot ' + wNum(zD - zN) + ' = 0 \\Rightarrow m = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hoành độ P trùng N', params: { xN: -2, yN: 1, zN: 2, xP: -2, yP: 5, zP: 0, yD: 0, zD: -6, p: -2, q: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q55 N(-2;1;2), P(-6;5;0), D(-2m-5;0;-6)', params: { xN: -2, yN: 1, zN: 2, xP: -6, yP: 5, zP: 0, yD: 0, zD: -6, p: -2, q: -5 }, expectedValid: true },
    ],
  },

  // Dạng 56 (Q56): Tâm đường tròn ngoại tiếp tam giác vuông tại C
  t12_b8_d56_circumcenter_right_tri_sa: {
    id: 't12_b8_d56_circumcenter_right_tri_sa',
    name: 'Tính khoảng cách OI với I là tâm đường tròn ngoại tiếp tam giác vuông CDE',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tam giác vuông và đường tròn ngoại tiếp',
    description: 'Cho tam giác CDE vuông tại C. Gọi I là tâm đường tròn ngoại tiếp tam giác CDE. Tính độ dài OI (làm tròn đến hàng phần mười).',
    conditionSummary: 'Tam giác CDE vuông tại C thực sự và OI không nằm sát ranh giới làm tròn',
    paramSpecs: [
      { name: 'xC', label: 'x_C', min: -4, max: 6 },
      { name: 'yC', label: 'y_C', min: -4, max: 6 },
      { name: 'zC', label: 'z_C', min: -4, max: 6 },
      { name: 'ux', label: 'CD_x', min: -4, max: 4, allowZero: false },
      { name: 'uy', label: 'CD_y', min: -4, max: 4, allowZero: false },
      { name: 'uz', label: 'CD_z', min: -4, max: 4, allowZero: false },
      { name: 'vy', label: 'CE_y', min: -6, max: 6, allowZero: false },
      { name: 'vz', label: 'CE_z', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { xC, yC, zC, ux, uy, uz, vy, vz } = params;
      if (ux === 0 || uy === 0 || uz === 0 || vy === 0 || vz === 0) {
        return { valid: false, reason: 'Các thành phần tọa độ khác 0' };
      }
      const rem = (uy * vy + uz * vz) % ux;
      if (rem !== 0) return { valid: false, reason: 'Cần chia hết để tọa độ E nguyên' };
      const vx = -(uy * vy + uz * vz) / ux;
      if (vx === 0) return { valid: false, reason: 'CE_x khác 0' };
      const xD = xC + ux, yD = yC + uy, zD = zC + uz;
      const xE = xC + vx, yE = yC + vy, zE = zC + vz;
      const xI = (xD + xE) / 2, yI = (yD + yE) / 2, zI = (zD + zE) / 2;
      const oi = Math.sqrt(xI * xI + yI * yI + zI * zI);
      if (oi < 0.5) return { valid: false, reason: 'I quá gần gốc tọa độ' };
      if (Math.abs(oi * 10 - Math.floor(oi * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xC, yC, zC, ux, uy, uz, vy, vz } = params;
      const vx = -(uy * vy + uz * vz) / ux;
      const xD = xC + ux, yD = yC + uy, zD = zC + uz;
      const xE = xC + vx, yE = yC + vy, zE = zC + vz;
      const ix = u.simplifyFrac(xD + xE, 2);
      const iy = u.simplifyFrac(yD + yE, 2);
      const iz = u.simplifyFrac(zD + zE, 2);
      const oiSq = u.simplifyFrac(
        (xD + xE) * (xD + xE) + (yD + yE) * (yD + yE) + (zD + zE) * (zD + zE),
        4
      );
      const oi = Math.sqrt(oiSq.value);
      const rounded = Math.round(oi * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $CDE$ có $C' + u.formatCoord3D(xC, yC, zC) +
          '$, $D' + u.formatCoord3D(xD, yD, zD) + '$, $E' + u.formatCoord3D(xE, yE, zE) +
          '$. Gọi $I$ là tâm đường tròn ngoại tiếp tam giác $CDE$. Tính giá trị $OI$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{CD} = ' + u.formatCoord3D(ux, uy, uz) + '$ và $\\overrightarrow{CE} = ' + u.formatCoord3D(vx, vy, vz) + '$.',
          'Kiểm tra $\\overrightarrow{CD} \\cdot \\overrightarrow{CE} = 0 \\Rightarrow \\triangle CDE$ vuông tại $C$.',
          'Tâm đường tròn ngoại tiếp $I$ là trung điểm của cạnh huyền $DE$, nên $I\\left(' + ix.latex + ';\\, ' + iy.latex + ';\\, ' + iz.latex + '\\right)$.',
          'Khi đó $OI = \\sqrt{' + oiSq.latex + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên CD không vuông góc nguyên với CE', params: { xC: 3, yC: 1, zC: 2, ux: 3, uy: -2, uz: -2, vy: 4, vz: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q56 C(3;1;2), D(5;-1;0), E(1;5;-4)', params: { xC: 3, yC: 1, zC: 2, ux: 2, uy: -2, uz: -2, vy: 4, vz: -6 }, expectedValid: true },
    ],
  },

  // Dạng 57 (Q57): Trung điểm của đoạn nối điểm trên Ox và điểm trên (Oyz)
  t12_b8_d57_midpoint_axis_plane_sa: {
    id: 't12_b8_d57_midpoint_axis_plane_sa',
    name: 'Tìm trung điểm G(m; n; p) của DN khi N là trung điểm ED (E thuộc Ox, D thuộc Oyz)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Trung điểm và điểm trên trục/mặt phẳng tọa độ',
    description: 'Cho N là trung điểm ED với E thuộc Ox, D thuộc (Oyz). Gọi G(m; n; p) là trung điểm DN. Tính m + n + p.',
    conditionSummary: 'E và D không trùng gốc O và x_N + 3y_N + 3z_N chẵn để m + n + p nguyên',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -9, max: 9, allowZero: false },
      { name: 'yN', label: 'y_N', min: -9, max: 9, allowZero: false },
      { name: 'zN', label: 'z_N', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { xN, yN, zN } = params;
      if (xN === 0 || yN === 0 || zN === 0) return { valid: false, reason: 'Các tọa độ của N khác 0' };
      if ((xN + 3 * yN + 3 * zN) % 2 !== 0) return { valid: false, reason: 'Cần x_N + 3y_N + 3z_N chẵn để kết quả nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN } = params;
      const aE = 2 * xN, bD = 2 * yN, cD = 2 * zN;
      const gx = u.simplifyFrac(xN, 2);
      const gy = u.simplifyFrac(3 * yN, 2);
      const gz = u.simplifyFrac(3 * zN, 2);
      const sum = (xN + 3 * yN + 3 * zN) / 2;
      const shortAnswer = String(sum);
      return {
        stem:
          'Trong không gian $Oxyz$, cho điểm $N' + u.formatCoord3D(xN, yN, zN) +
          '$. Biết điểm $E$ thuộc trục $Ox$ và điểm $D$ thuộc mặt phẳng $(Oyz)$ sao cho $N$ là trung điểm của đoạn thẳng $ED$. Gọi $G(m; n; p)$ là trung điểm của $DN$. Tính $m + n + p$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $E(a; 0; 0) \\in Ox$ và $D(0; b; c) \\in (Oyz)$.',
          'Vì $N$ là trung điểm của $ED$ nên $\\frac{a}{2} = ' + xN + '$, $\\frac{b}{2} = ' + yN + '$, $\\frac{c}{2} = ' + zN + ' \\Rightarrow D(0;\\, ' + bD + ';\\, ' + cD + ')$.',
          'Điểm $G$ là trung điểm của $DN$ nên $G\\left(' + gx.latex + ';\\, ' + gy.latex + ';\\, ' + gz.latex + '\\right)$.',
          'Vậy $m + n + p = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xN + 3yN + 3zN lẻ', params: { xN: 2, yN: -5, zN: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q57 N(3;-5;2)', params: { xN: 3, yN: -5, zN: 2 }, expectedValid: true },
    ],
  },

  // Dạng 58 (Q58): Chân đường cao H hạ từ đỉnh P của tam giác PCM
  t12_b8_d58_altitude_foot_sa: {
    id: 't12_b8_d58_altitude_foot_sa',
    name: 'Tìm chân đường cao H(a; b; c) hạ từ đỉnh P trong tam giác PCM',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hình chiếu vuông góc lên đường thẳng',
    description: 'Cho tam giác PCM không suy biến. Tìm tọa độ chân đường cao H(a; b; c) hạ từ P xuống CM và tính a + b + c.',
    conditionSummary: 'Ba điểm P, C, M không thẳng hàng và không rơi vào ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'xP', label: 'x_P', min: -8, max: 8 },
      { name: 'yP', label: 'y_P', min: -10, max: 10 },
      { name: 'zP', label: 'z_P', min: -8, max: 8 },
      { name: 'xC', label: 'x_C', min: -8, max: 8 },
      { name: 'yC', label: 'y_C', min: -12, max: 8 },
      { name: 'zC', label: 'z_C', min: -8, max: 8 },
      { name: 'xM', label: 'x_M', min: -8, max: 8 },
      { name: 'yM', label: 'y_M', min: -8, max: 12 },
      { name: 'zM', label: 'z_M', min: -8, max: 8 },
    ],
    validateCode: `
      const { xP, yP, zP, xC, yC, zC, xM, yM, zM } = params;
      const cmX = xM - xC, cmY = yM - yC, cmZ = zM - zC;
      const cpX = xP - xC, cpY = yP - yC, cpZ = zP - zC;
      const cx = cmY * cpZ - cmZ * cpY, cy = cmZ * cpX - cmX * cpZ, cz = cmX * cpY - cmY * cpX;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'P, C, M thẳng hàng' };
      const dot = cpX * cmX + cpY * cmY + cpZ * cmZ;
      const norm2 = cmX * cmX + cmY * cmY + cmZ * cmZ;
      if (dot === 0) return { valid: false, reason: 'H trùng C' };
      const t = dot / norm2;
      const sum = xC + t * cmX + yC + t * cmY + zC + t * cmZ;
      if (Math.abs(sum * 10 - Math.floor(sum * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xP, yP, zP, xC, yC, zC, xM, yM, zM } = params;
      const cmX = xM - xC, cmY = yM - yC, cmZ = zM - zC;
      const cpX = xP - xC, cpY = yP - yC, cpZ = zP - zC;
      const dot = cpX * cmX + cpY * cmY + cpZ * cmZ;
      const norm2 = cmX * cmX + cmY * cmY + cmZ * cmZ;
      const tf = u.simplifyFrac(dot, norm2);
      const ax = u.simplifyFrac(xC * norm2 + dot * cmX, norm2);
      const by = u.simplifyFrac(yC * norm2 + dot * cmY, norm2);
      const cz = u.simplifyFrac(zC * norm2 + dot * cmZ, norm2);
      const sum = ax.value + by.value + cz.value;
      const rounded = Math.round(sum * 10) / 10;
      const cleanVal = Object.is(rounded, -0) ? 0 : rounded;
      const shortAnswer = u.formatNumberVN(cleanVal, 1);
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $PCM$ với $P' + u.formatCoord3D(xP, yP, zP) +
          '$, $C' + u.formatCoord3D(xC, yC, zC) + '$, $M' + u.formatCoord3D(xM, yM, zM) +
          '$. Giả sử $H(a; b; c)$ là chân đường cao hạ từ đỉnh $P$ của tam giác $PCM$. Tính tổng $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: cleanVal,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{CM} = ' + u.formatCoord3D(cmX, cmY, cmZ) + '$ và $\\overrightarrow{CP} = ' + u.formatCoord3D(cpX, cpY, cpZ) + '$.',
          'Vì $C, H, M$ thẳng hàng nên $\\overrightarrow{CH} = t\\overrightarrow{CM}$, suy ra $\\overrightarrow{PH} = \\overrightarrow{CH} - \\overrightarrow{CP} = t\\overrightarrow{CM} - \\overrightarrow{CP}$.',
          'Từ $\\overrightarrow{PH} \\cdot \\overrightarrow{CM} = 0 \\Rightarrow t = \\frac{\\overrightarrow{CP} \\cdot \\overrightarrow{CM}}{|\\overrightarrow{CM}|^2} = ' + tf.latex + '$.',
          'Do đó $H\\left(' + ax.latex + ';\\, ' + by.latex + ';\\, ' + cz.latex + '\\right)$, suy ra $a + b + c \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P, C, M thẳng hàng', params: { xP: 0, yP: 0, zP: 0, xC: 1, yC: 1, zC: 1, xM: 2, yM: 2, zM: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q58 P(2;-8;3), C(3;-11;4), M(-2;10;-4)', params: { xP: 2, yP: -8, zP: 3, xC: 3, yC: -11, zC: 4, xM: -2, yM: 10, zM: -4 }, expectedValid: true },
    ],
  },

  // Dạng 59 (Q59): Máy bay chiến đấu bay thẳng đều tiếp theo (có hình vẽ)
  t12_b8_d59_plane_flight_extrapolation_sa: {
    id: 't12_b8_d59_plane_flight_extrapolation_sa',
    name: 'Xác định tọa độ máy bay chuyển động thẳng đều theo tỷ lệ thời gian',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế phương trình chuyển động thẳng',
    description: 'Máy bay bay từ F đến E trong T1 phút, tiếp tục bay thẳng đều thêm T2 phút đến M(a; b; c). Tính (a + b + c)/K.',
    conditionSummary: 'F khác E, T1 = k*T2 với k >= 2, K > 0 và kết quả >= 0,1 tránh ranh giới làm tròn',
    paramSpecs: [
      { name: 'xF', label: 'x_F', min: 120, max: 250 },
      { name: 'yF', label: 'y_F', min: 150, max: 260 },
      { name: 'zF', label: 'z_F', min: 4, max: 12 },
      { name: 'dx', label: 'Độ dịch FE_x', min: 15, max: 60 },
      { name: 'dy', label: 'Độ dịch FE_y', min: 20, max: 90 },
      { name: 'dz', label: 'Độ dịch FE_z', min: -4, max: 4 },
      { name: 'k', label: 'Tỉ số thời gian k = T1/T2', min: 2, max: 4 },
      { name: 'T2', label: 'Thời gian T2 (phút)', min: 4, max: 12 },
      { name: 'K', label: 'Số chia K', min: 1000, max: 2500 },
    ],
    validateCode: `
      const { xF, yF, zF, dx, dy, dz, k, T2, K } = params;
      if (dx === 0 && dy === 0 && dz === 0) return { valid: false, reason: 'F và E phải phân biệt' };
      if (k < 2 || T2 <= 0 || K <= 0) return { valid: false, reason: 'Thông số thời gian và K phải hợp lệ' };
      const a = xF + dx + dx / k;
      const b = yF + dy + dy / k;
      const c = zF + dz + dz / k;
      const val = (a + b + c) / K;
      if (val < 0.1) return { valid: false, reason: 'Kết quả quá nhỏ' };
      if (Math.abs(val * 10 - Math.floor(val * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xF, yF, zF, dx, dy, dz, k, T2, K } = params;
      const xE = xF + dx, yE = yF + dy, zE = zF + dz;
      const T1 = k * T2;
      const aFrac = u.simplifyFrac(xE * k + dx, k);
      const bFrac = u.simplifyFrac(yE * k + dy, k);
      const cFrac = u.simplifyFrac(zE * k + dz, k);
      const val = (aFrac.value + bFrac.value + cFrac.value) / K;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Trong không gian chọn hệ trục tọa độ cho trước, đơn vị đo là kilômét, một máy bay di chuyển với vận tốc và hướng không đổi từ điểm $F' +
          u.formatCoord3D(xF, yF, zF) + '$ đến điểm $E' + u.formatCoord3D(xE, yE, zE) +
          '$ trong $' + T1 + '$ phút. Nếu máy bay tiếp tục giữ nguyên vận tốc và hướng bay sau $' + T2 +
          '$ phút tiếp theo thì tọa độ của máy bay lúc này là $M(a; b; c)$. Kết quả của phép tính $\\frac{a + b + c}{' + K + '}$ (làm tròn đến hàng phần mười) bằng bao nhiêu?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'plane_flight_path_3d',
          params: {},
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{FE} = ' + u.formatCoord3D(dx, dy, dz) + '$ và $\\overrightarrow{EM} = (a - ' + xE + ';\\, b - ' + yE + ';\\, c - ' + zE + ')$.',
          'Vì máy bay giữ nguyên vận tốc và hướng bay, đồng thời thời gian bay từ $F$ đến $E$ gấp $' + k + '$ lần thời gian bay từ $E$ đến $M$ nên $\\overrightarrow{FE} = ' + k + '\\overrightarrow{EM}$.',
          'Suy ra $M\\left(' + aFrac.latex + ';\\, ' + bFrac.latex + ';\\, ' + cFrac.latex + '\\right)$.',
          'Vậy $\\frac{a + b + c}{' + K + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên F trùng E', params: { xF: 202, yF: 204, zF: 7, dx: 0, dy: 0, dz: 0, k: 3, T2: 6, K: 2042 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q59 F(202;204;7), E(228;283;5), T1=18, T2=6', params: { xF: 202, yF: 204, zF: 7, dx: 26, dy: 79, dz: -2, k: 3, T2: 6, K: 2042 }, expectedValid: true },
    ],
  },

  // Dạng 60 (Q60): Hai khinh khí cầu - cực tiểu tổng khoảng cách đến điểm trên mặt đất (Oxy)
  t12_b8_d60_two_balloons_relay_sa: {
    id: 't12_b8_d60_two_balloons_relay_sa',
    name: 'Tìm trạm liên lạc trên mặt đất tối ưu tổng khoảng cách tới hai khinh khí cầu',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài toán đối xứng tìm cực tiểu tổng khoảng cách',
    description: 'Hai khinh khí cầu ở các vị trí khác phía đối xứng Nam-Đông và Bắc-Tây ở hai độ cao khác nhau. Tìm I(a; b; 0) sao cho IA + IB nhỏ nhất.',
    conditionSummary: 'Các khoảng cách và độ cao đều dương, tránh ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 's1', label: 'Nam 1 (x10 km)', min: 12, max: 45 },
      { name: 'e1', label: 'Đông 1 (x10 km)', min: 12, max: 45 },
      { name: 'h1', label: 'Cao 1 (x10 km)', min: 3, max: 15 },
      { name: 'n2', label: 'Bắc 2 (x10 km)', min: 12, max: 45 },
      { name: 'w2', label: 'Tây 2 (x10 km)', min: 12, max: 45 },
      { name: 'h2', label: 'Cao 2 (x10 km)', min: 2, max: 15 },
    ],
    validateCode: `
      const { s1, e1, h1, n2, w2, h2 } = params;
      if (s1 <= 0 || e1 <= 0 || h1 <= 0 || n2 <= 0 || w2 <= 0 || h2 <= 0) {
        return { valid: false, reason: 'Các khoảng cách và độ cao phải dương' };
      }
      const sum = (-n2 + h2 * (s1 + n2) / (h1 + h2) - w2 + h2 * (e1 + w2) / (h1 + h2)) / 10;
      if (Math.abs(sum * 10 - Math.floor(sum * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s1, e1, h1, n2, w2, h2 } = params;
      const ax = u.simplifyFrac(s1, 10), ay = u.simplifyFrac(e1, 10), az = u.simplifyFrac(h1, 10);
      const bx = u.simplifyFrac(-n2, 10), by = u.simplifyFrac(-w2, 10), bz = u.simplifyFrac(h2, 10);
      const aFrac = u.simplifyFrac(-n2 * h1 + s1 * h2, 10 * (h1 + h2));
      const bFrac = u.simplifyFrac(-w2 * h1 + e1 * h2, 10 * (h1 + h2));
      const sum = aFrac.value + bFrac.value;
      const rounded = Math.round(sum * 10) / 10;
      const cleanVal = Object.is(rounded, -0) ? 0 : rounded;
      const shortAnswer = u.formatNumberVN(cleanVal, 1);
      return {
        stem:
          'Hai chiếc khinh khí cầu bay lên từ cùng một địa điểm. Chiếc thứ nhất nằm cách điểm xuất phát $' + u.formatNumberVN(s1 / 10, 1) +
          '$ km về phía nam và $' + u.formatNumberVN(e1 / 10, 1) + '$ km về phía đông, đồng thời cách mặt đất $' + u.formatNumberVN(h1 / 10, 1) +
          '$ km. Chiếc thứ hai nằm cách điểm xuất phát $' + u.formatNumberVN(n2 / 10, 1) + '$ km về phía bắc và $' + u.formatNumberVN(w2 / 10, 1) +
          '$ km về phía tây, đồng thời cách mặt đất $' + u.formatNumberVN(h2 / 10, 1) +
          '$ km. Người ta cần đặt một trạm liên lạc trên mặt đất sao cho tổng khoảng cách từ vị trí đó tới hai khinh khí cầu nhỏ nhất. Giả sử tọa độ trạm là $I(a; b; 0)$. Tính $a + b$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: cleanVal,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chọn hệ trục $Oxyz$ với gốc $O$ tại điểm xuất phát, $(Oxy)$ là mặt đất, tia $Ox$ hướng nam, tia $Oy$ hướng đông, tia $Oz$ hướng lên trên.',
          'Hai khinh khí cầu ở vị trí $A\\left(' + ax.latex + ';\\, ' + ay.latex + ';\\, ' + az.latex + '\\right)$ và $B\\left(' + bx.latex + ';\\, ' + by.latex + ';\\, ' + bz.latex + '\\right)$.',
          'Gọi $C\\left(' + ax.latex + ';\\, ' + ay.latex + ';\\, -' + az.latex + '\\right)$ là điểm đối xứng với $A$ qua $(Oxy)$. Khi đó $IA + IB = IC + IB \\ge BC$, dấu bằng xảy ra tại $I = BC \\cap (Oxy)$.',
          'Giải phương trình thẳng hàng $B, I, C$ thu được $a = ' + aFrac.latex + '$, $b = ' + bFrac.latex + ' \\Rightarrow a + b \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên độ cao bằng 0', params: { s1: 28, e1: 24, h1: 0, n2: 26, w2: 15, h2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q60 (2,8;2,4;0,9) và (2,6;1,5;0,4)', params: { s1: 28, e1: 24, h1: 9, n2: 26, w2: 15, h2: 4 }, expectedValid: true },
    ],
  },

  // Dạng 61 (Q61): Hộp tôn thể tích V ít vật liệu nhất - trọng tâm A'BD
  t12_b8_d61_min_surface_box_centroid_sa: {
    id: 't12_b8_d61_min_surface_box_centroid_sa',
    name: 'Tối ưu vật liệu làm hộp chữ nhật có nắp và tìm trọng tâm tam giác A\'BD',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Kết hợp cực trị diện tích toàn phần và tọa độ Oxyz',
    description: 'Chiếc hộp hình hộp chữ nhật ABCD.A\'B\'C\'D\' có nắp, thể tích V và chiều cao h dùng ít vật liệu nhất. Tìm trọng tâm G(a; b; c) của tam giác A\'BD và tính a + b + c.',
    conditionSummary: 'V > 0, h > 0 và kết quả không nằm sát ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'V', label: 'Thể tích V (cm^3)', min: 120, max: 480, step: 20 },
      { name: 'h', label: 'Chiều cao h (cm)', min: 3, max: 8 },
    ],
    validateCode: `
      const { V, h } = params;
      if (V <= 0 || h <= 0) return { valid: false, reason: 'Thể tích và chiều cao phải dương' };
      const sum = (2 * Math.sqrt(V / h) + h) / 3;
      if (Math.abs(sum * 10 - Math.floor(sum * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { V, h } = params;
      const area = u.simplifyFrac(V, h);
      const side = Math.sqrt(area.value);
      const sum = (2 * side + h) / 3;
      const rounded = Math.round(sum * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const hFrac = u.simplifyFrac(h, 3);
      let sideTex = '';
      if (area.isInteger) {
        const n = area.num;
        let out = 1, inn = n;
        for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) {
          if (inn % (k * k) === 0) {
            out = k;
            inn = n / (k * k);
            break;
          }
        }
        sideTex = inn === 1 ? String(out) : (out === 1 ? '\\sqrt{' + inn + '}' : out + '\\sqrt{' + inn + '}');
      } else {
        sideTex = '\\sqrt{' + area.latex + '}';
      }
      return {
        stem:
          'Người ta muốn chế tạo một chiếc hộp hình hộp chữ nhật $ABCD.A\'B\'C\'D\'$ bằng tôn có nắp, có thể tích $' + V +
          '$ cm$^3$ với yêu cầu dùng ít vật liệu nhất. Biết chiều cao của hình hộp chữ nhật là $' + h +
          '$ cm. Chọn hệ trục tọa độ $Oxyz$ sao cho điểm $A$ trùng với gốc tọa độ $O$, vectơ $\\overrightarrow{AB}$, $\\overrightarrow{AD}$, $\\overrightarrow{AA\'}$ lần lượt cùng hướng với $\\overrightarrow{i}$, $\\overrightarrow{j}$, $\\overrightarrow{k}$. Gọi $G(a; b; c)$ là trọng tâm của tam giác $A\'BD$. Tính $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $x, y > 0$ là chiều dài và chiều rộng của đáy $ABCD$. Ta có $V = xy \\cdot ' + h + ' = ' + V + ' \\Rightarrow xy = ' + area.latex + '$.',
          'Diện tích toàn phần là $S = 2 \\cdot ' + h + '(x + y) + 2xy = ' + (2 * h) + '(x + y) + 2 \\cdot ' + area.latex + '$.',
          'Áp dụng bất đẳng thức AM-GM, $S$ nhỏ nhất khi $x = y = ' + sideTex + '$.',
          'Khi đó $A\'(0; 0; ' + h + ')$, $B(' + sideTex + '; 0; 0)$, $D(0; ' + sideTex + '; 0) \\Rightarrow G\\left(\\frac{' + sideTex + '}{3};\\, \\frac{' + sideTex + '}{3};\\, ' + hFrac.latex + '\\right)$.',
          'Vậy $a + b + c \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { V: 240, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q61 V=240, h=4', params: { V: 240, h: 4 }, expectedValid: true },
    ],
  },

  // Dạng 62 (Q62): Tháp viễn thông tối ưu tổng khoảng cách tới ba đỉnh tam giác đều
  t12_b8_d62_equilateral_fermat_sa: {
    id: 't12_b8_d62_equilateral_fermat_sa',
    name: 'Tính tổng khoảng cách nhỏ nhất từ tháp viễn thông đến ba tòa nhà tam giác đều',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Điểm Torricelli của tam giác đều trong mặt phẳng Oxy',
    description: 'Cho ba tòa nhà tạo thành tam giác đều cạnh a trong mặt phẳng (Oxy). Tính tổng khoảng cách nhỏ nhất từ một điểm đến ba tòa nhà.',
    conditionSummary: 'Cạnh tam giác đều a >= 2 và a*sqrt(3) không sát ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'a', label: 'Độ dài cạnh a', min: 2, max: 24 },
    ],
    validateCode: `
      const { a } = params;
      if (a < 2) return { valid: false, reason: 'Cạnh tam giác đều phải >= 2' };
      const val = a * Math.sqrt(3);
      if (Math.abs(val * 10 - Math.floor(val * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a } = params;
      const halfA = u.simplifyFrac(a, 2);
      const cY = halfA.isInteger ? (halfA.num === 1 ? '\\sqrt{3}' : halfA.num + '\\sqrt{3}') : '\\frac{' + a + '\\sqrt{3}}{2}';
      const val = a * Math.sqrt(3);
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Một công ty viễn thông lập kế hoạch xây dựng một tháp thu phát sóng phục vụ ba tòa nhà quan trọng được đặt tại các tọa độ: $A(0; 0; 0)$, $B(' +
          a + '; 0; 0)$, $C\\left(' + halfA.latex + ';\\, ' + cY + ';\\, 0\\right)$. Tháp viễn thông phải đặt tại vị trí sao cho tổng khoảng cách từ tháp đến ba tòa nhà là nhỏ nhất. Tính tổng khoảng cách nhỏ nhất đó (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta tính được $AB = BC = CA = ' + a + '$, nên tam giác $ABC$ đều cạnh $' + a + '$.',
          'Vị trí tối ưu để tổng khoảng cách đến ba đỉnh tam giác đều nhỏ nhất chính là trọng tâm $G$ của tam giác $ABC$ (điểm Fermat - Torricelli).',
          'Tổng khoảng cách là $GA + GB + GC = 3GA = 3 \\cdot \\frac{2}{3} \\cdot \\frac{' + a + '\\sqrt{3}}{2} = ' + a + '\\sqrt{3} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a < 2', params: { a: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q62 a = 6', params: { a: 6 }, expectedValid: true },
    ],
  },

  // Dạng 63 (Q63): Chim bói cá lao xuống bắt cá (có hình vẽ)
  t12_b8_d63_kingfisher_dive_sa: {
    id: 't12_b8_d63_kingfisher_dive_sa',
    name: 'Tìm điểm tiếp xúc mặt nước của chim bói cá lao thẳng đến con cá',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài toán thực tế đường thẳng cắt mặt phẳng (Oxy)',
    description: 'Chim bói cá ở C trên mặt nước lao thẳng đến cá A dưới mặt nước, cắt mặt nước (Oxy) tại B(a; b; c). Tính a + b + c.',
    conditionSummary: 'Độ cao chim và độ sâu cá đều dương, hoành-tung độ dương, tránh ranh giới làm tròn',
    paramSpecs: [
      { name: 'xC', label: 'x_C (x10 m)', min: 10, max: 35 },
      { name: 'yC', label: 'y_C (x10 m)', min: 10, max: 35 },
      { name: 'hC', label: 'Cao C (x10 m)', min: 4, max: 15 },
      { name: 'xA', label: 'x_A (x10 m)', min: 12, max: 40 },
      { name: 'yA', label: 'y_A (x10 m)', min: 8, max: 35 },
      { name: 'hA', label: 'Sâu A (x10 m)', min: 3, max: 12 },
    ],
    validateCode: `
      const { xC, yC, hC, xA, yA, hA } = params;
      if (xC <= 0 || yC <= 0 || hC <= 0 || xA <= 0 || yA <= 0 || hA <= 0) {
        return { valid: false, reason: 'Các khoảng cách phải dương' };
      }
      if (xC === xA && yC === yA) return { valid: false, reason: 'Đường bay thẳng đứng tầm thường' };
      const sum = (xC + yC + (hC * (xA - xC + yA - yC)) / (hC + hA)) / 10;
      if (Math.abs(sum * 10 - Math.floor(sum * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xC, yC, hC, xA, yA, hA } = params;
      const aFrac = u.simplifyFrac(xC * hA + xA * hC, 10 * (hC + hA));
      const bFrac = u.simplifyFrac(yC * hA + yA * hC, 10 * (hC + hA));
      const sum = aFrac.value + bFrac.value;
      const rounded = Math.round(sum * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const xcStr = u.formatNumberVN(xC / 10, 1);
      const ycStr = u.formatNumberVN(yC / 10, 1);
      const hcStr = u.formatNumberVN(hC / 10, 1);
      const xaStr = u.formatNumberVN(xA / 10, 1);
      const yaStr = u.formatNumberVN(yA / 10, 1);
      const haStr = u.formatNumberVN(hA / 10, 1);
      return {
        stem:
          'Với hệ trục tọa độ $Oxyz$ sao cho $O$ nằm trên mặt nước, mặt phẳng $(Oxy)$ là mặt nước, trục $Oz$ hướng lên trên (đơn vị đo: mét), một con chim bói cá đang ở vị trí $C$ cách mặt nước $' +
          hcStr + '$ m, cách mặt phẳng $(Oxz)$, $(Oyz)$ lần lượt là $' + ycStr + '$ m và $' + xcStr +
          '$ m phóng thẳng xuống vị trí con cá ở $A$ cách mặt nước $' + haStr + '$ m, cách mặt phẳng $(Oxz)$, $(Oyz)$ lần lượt là $' +
          yaStr + '$ m và $' + xaStr + '$ m. Điểm $B(a; b; c)$ là điểm chim bói cá tiếp xúc với mặt nước. Tính $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'kingfisher_fish_3d',
          params: { variant: 1 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Trong góc phần tư dương, ta có $C(' + xcStr + ';\\, ' + ycStr + ';\\, ' + hcStr + ')$ và $A(' + xaStr + ';\\, ' + yaStr + ';\\, -' + haStr + ')$.',
          'Điểm tiếp xúc mặt nước là $B(a; b; 0)$ thẳng hàng với $C, A$, nên $\\overrightarrow{CB} = k\\overrightarrow{CA}$ với $k = \\frac{' + hcStr + '}{' + u.formatNumberVN((hC + hA) / 10, 1) + '}$.',
          'Giải được $a = ' + aFrac.latex + '$, $b = ' + bFrac.latex + '$, $c = 0 \\Rightarrow a + b + c \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên khoảng cách bằng 0', params: { xC: 18, yC: 22, hC: 0, xA: 29, yA: 10, hA: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q63 C(1,8;2,2;0,8), A(2,9;1,0;-0,5)', params: { xC: 18, yC: 22, hC: 8, xA: 29, yA: 10, hA: 5 }, expectedValid: true },
    ],
  },

  // Dạng 64 (Q64): Cabin cáp treo chuyển động thẳng đều theo hướng vectơ u
  t12_b8_d64_cable_car_dist_sa: {
    id: 't12_b8_d64_cable_car_dist_sa',
    name: 'Tính khoảng cách từ người quan sát đến cabin cáp treo sau t giây',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài toán chuyển động theo hướng vectơ chỉ phương',
    description: 'Cabin xuất phát từ P, chuyển động thẳng đều theo hướng vectơ u với vận tốc v trong t giây. Tính khoảng cách từ người quan sát M đến cabin.',
    conditionSummary: 'Độ dài vectơ hướng nguyên đẹp (bộ bốn Pitago), t > 0, làm tròn hàng đơn vị không sát 0,5',
    paramSpecs: [
      { name: 'quadIdx', label: 'Chỉ số bộ Pitago (0..7)', min: 0, max: 7 },
      { name: 'xM', label: 'x_M', min: -6, max: 6 },
      { name: 'yM', label: 'y_M', min: -6, max: 6 },
      { name: 'zM', label: 'z_M', min: 1, max: 8 },
      { name: 'xP', label: 'x_P', min: -5, max: 8 },
      { name: 'yP', label: 'y_P', min: -5, max: 8 },
      { name: 'zP', label: 'z_P', min: 1, max: 8 },
      { name: 'kv', label: 'Hệ số vận tốc (1..2)', min: 1, max: 2 },
      { name: 't', label: 'Thời gian t (giây)', min: 3, max: 10 },
    ],
    validateCode: `
      const { quadIdx, xM, yM, zM, xP, yP, zP, kv, t } = params;
      if (quadIdx < 0 || quadIdx > 7 || kv < 1 || t <= 0) return { valid: false, reason: 'Tham số không hợp lệ' };
      const quads = [
        [2, 3, 6, 7],
        [1, 2, 2, 3],
        [1, 4, 8, 9],
        [2, 6, 9, 11],
        [4, 4, 7, 9],
        [3, 4, 12, 13],
        [6, 6, 7, 11],
        [2, 5, 14, 15],
      ];
      const [ux, uy, uz] = quads[quadIdx];
      const scale = kv * t;
      const xC = xP + scale * ux, yC = yP + scale * uy, zC = zP + scale * uz;
      const dist = Math.hypot(xC - xM, yC - yM, zC - zM);
      if (Math.abs(dist - Math.floor(dist) - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { quadIdx, xM, yM, zM, xP, yP, zP, kv, t } = params;
      const quads = [
        [2, 3, 6, 7],
        [1, 2, 2, 3],
        [1, 4, 8, 9],
        [2, 6, 9, 11],
        [4, 4, 7, 9],
        [3, 4, 12, 13],
        [6, 6, 7, 11],
        [2, 5, 14, 15],
      ];
      const [ux, uy, uz, uNorm] = quads[quadIdx];
      const v = kv * uNorm;
      const distPath = v * t;
      const scale = kv * t;
      const xC = xP + scale * ux, yC = yP + scale * uy, zC = zP + scale * uz;
      const distSq = (xC - xM) * (xC - xM) + (yC - yM) * (yC - yM) + (zC - zM) * (zC - zM);
      const dist = Math.round(Math.sqrt(distSq));
      const shortAnswer = String(dist);
      return {
        stem:
          'Tại một ngọn núi, người ta gắn hệ trục tọa độ $Oxyz$ với đơn vị trên mỗi trục bằng $1$ mét. Một người đứng cố định tại vị trí $M' +
          u.formatCoord3D(xM, yM, zM) + '$, quan sát một cabin cáp treo xuất phát từ điểm $P' + u.formatCoord3D(xP, yP, zP) +
          '$, chuyển động thẳng đều theo hướng vectơ $\\overrightarrow{u} = ' + u.formatCoord3D(ux, uy, uz) +
          '$ với vận tốc $' + v + '$ m/s. Hỏi sau $' + t +
          '$ giây kể từ lúc xuất phát, khoảng cách giữa cabin và người quan sát bằng bao nhiêu mét (làm tròn kết quả đến hàng đơn vị)?',
        shortAnswer,
        numericValue: dist,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Sau $' + t + '$ giây, quãng đường cabin đi được là $PC = ' + v + ' \\cdot ' + t + ' = ' + distPath + '$ m.',
          'Ta có $|\\overrightarrow{u}| = ' + uNorm + ' \\Rightarrow \\overrightarrow{PC} = \\frac{' + distPath + '}{' + uNorm + '}\\overrightarrow{u} = ' + scale + '\\overrightarrow{u}$.',
          'Suy ra vị trí cabin là $C = P + ' + scale + '\\overrightarrow{u} = ' + u.formatCoord3D(xC, yC, zC) + '$.',
          'Khoảng cách $MC = \\sqrt{' + distSq + '} \\approx ' + shortAnswer + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chỉ số bộ Pitago âm', params: { quadIdx: -1, xM: -2, yM: -1, zM: 4, xP: 4, yP: -1, zP: 3, kv: 1, t: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q64 M(-2;-1;4), P(4;-1;3), u(2;3;6), v=7, t=7', params: { quadIdx: 0, xM: -2, yM: -1, zM: 4, xP: 4, yP: -1, zP: 3, kv: 1, t: 7 }, expectedValid: true },
    ],
  },

  // Dạng 65 (Q65): Khoảng cách ngắn nhất giữa hai khinh khí cầu bay thẳng đều giữ nguyên độ cao
  t12_b8_d65_two_balloons_min_dist_sa: {
    id: 't12_b8_d65_two_balloons_min_dist_sa',
    name: 'Tìm khoảng cách ngắn nhất giữa hai khinh khí cầu chuyển động trực giao',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị khoảng cách hai vật chuyển động trong không gian',
    description: 'Chiếc thứ nhất bay về Bắc (-Ox) với tốc độ v1, chiếc thứ hai bay về Đông (+Oy) với tốc độ v2, giữ nguyên độ cao. Tính khoảng cách ngắn nhất giữa chúng (làm tròn phần trăm).',
    conditionSummary: 'Thời điểm đạt cực tiểu t0 > 0 và khoảng cách tối thiểu không sát ranh giới 0,005',
    paramSpecs: [
      { name: 'xA', label: 'x_A (km)', min: 2, max: 8 },
      { name: 'yA', label: 'y_A (km)', min: -2, max: 3 },
      { name: 'h1', label: 'Cao A (x10 km)', min: 4, max: 14 },
      { name: 'v1', label: 'Vận tốc v1 (km/h)', min: 30, max: 80, step: 10 },
      { name: 'xB', label: 'x_B (km)', min: -5, max: 1 },
      { name: 'yB', label: 'y_B (km)', min: -7, max: -1 },
      { name: 'h2', label: 'Cao B (x10 km)', min: 4, max: 14 },
      { name: 'v2', label: 'Vận tốc v2 (km/h)', min: 20, max: 70, step: 10 },
    ],
    validateCode: `
      const { xA, yA, h1, v1, xB, yB, h2, v2 } = params;
      if (v1 <= 0 || v2 <= 0) return { valid: false, reason: 'Vận tốc phải dương' };
      const dx = xB - xA, dy = yB - yA, dz = (h2 - h1) / 10;
      const A = v1 * v1 + v2 * v2;
      const B = 2 * (v1 * dx + v2 * dy);
      const C = dx * dx + dy * dy + dz * dz;
      if (B >= 0) return { valid: false, reason: 'Thời điểm đạt cực tiểu phải dương (t_0 > 0)' };
      const minSq = C - (B * B) / (4 * A);
      if (minSq <= 0.04) return { valid: false, reason: 'Khoảng cách quá gần 0' };
      const dmin = Math.sqrt(minSq);
      if (Math.abs(dmin * 100 - Math.floor(dmin * 100) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, h1, v1, xB, yB, h2, v2 } = params;
      const dx = xB - xA, dy = yB - yA, dz = (h2 - h1) / 10;
      const A = v1 * v1 + v2 * v2;
      const B = 2 * (v1 * dx + v2 * dy);
      const C = Number((dx * dx + dy * dy + dz * dz).toFixed(4));
      const t0 = -B / (2 * A);
      const minSq = C - (B * B) / (4 * A);
      const dmin = Math.sqrt(minSq);
      const rounded = Math.round(dmin * 100) / 100;
      const shortAnswer = u.formatNumberVN(rounded, 2);
      const h1Str = u.formatNumberVN(h1 / 10, 1);
      const h2Str = u.formatNumberVN(h2 / 10, 1);
      return {
        stem:
          'Trong không gian gắn hệ trục tọa độ $Oxyz$ (đơn vị: km) với mặt phẳng $(Oxy)$ là mặt đất, trục $Ox$ hướng nam, trục $Oy$ hướng đông, trục $Oz$ hướng lên trời. Tại thời điểm ban đầu, khinh khí cầu thứ nhất ở $A(' +
          xA + ';\\, ' + yA + ';\\, ' + h1Str + ')$ bay thẳng về phía Bắc với tốc độ $' + v1 +
          '$ km/h; chiếc thứ hai ở $B(' + xB + ';\\, ' + yB + ';\\, ' + h2Str + ')$ bay thẳng về phía Đông với tốc độ $' + v2 +
          '$ km/h. Trong suốt quá trình bay, hai khinh khí cầu giữ nguyên độ cao. Khoảng cách ngắn nhất giữa hai chiếc khinh khí cầu bằng bao nhiêu km (làm tròn đến hàng phần trăm)?',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tại thời điểm $t \\ge 0$ (giờ), vị trí hai khinh khí cầu là $A(t)(' + u.formatLinear(-v1, xA, 't') + ';\\, ' + yA + ';\\, ' + h1Str + ')$ và $B(t)(' + xB + ';\\, ' + u.formatLinear(v2, yB, 't') + ';\\, ' + h2Str + ')$.',
          'Bình phương khoảng cách là $d^2(t) = (' + u.formatLinear(v1, dx, 't') + ')^2 + (' + u.formatLinear(v2, dy, 't') + ')^2 + (' + u.formatNumberVN(dz, 1) + ')^2 = ' + A + 't^2 - ' + Math.abs(B) + 't + ' + u.formatNumberVN(C, 2) + '$.',
          'Hàm bậc hai đạt cực tiểu tại $t_0 = \\frac{' + Math.abs(B) + '}{' + (2 * A) + '} \\approx ' + u.formatNumberVN(t0, 3) + '$ giờ.',
          'Thay vào công thức ta được $d_{\\min} = \\sqrt{' + u.formatNumberVN(minSq, 4) + '} \\approx ' + shortAnswer + '$ km.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai khinh khí cầu bay xa nhau ngay từ t=0 (B >= 0)', params: { xA: -4, yA: 0, h1: 8, v1: 60, xB: 2, yB: 3, h2: 9, v2: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q65 A(4;0;0,8), v1=60, B(-1;-4;0,9), v2=30', params: { xA: 4, yA: 0, h1: 8, v1: 60, xB: -1, yB: -4, h2: 9, v2: 30 }, expectedValid: true },
    ],
  },

  // Dạng 66 (Q66): Cực tiểu độ dài tổ hợp tuyến tính |MA - MB - k*CM| với M thuộc (Oxz)
  t12_b8_d66_min_norm_oxz_sa: {
    id: 't12_b8_d66_min_norm_oxz_sa',
    name: 'Tìm điểm M(a; b; c) thuộc (Oxz) tối ưu độ dài tổ hợp vectơ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị độ dài tổ hợp tuyến tính vectơ',
    description: 'Cho ba điểm A, B, C. Tìm M(a; b; c) thuộc (Oxz) để |MA - MB - k*CM| nhỏ nhất và tính a + p*c.',
    conditionSummary: 'Tâm tỷ cự I có tung độ khác 0 và tọa độ nguyên',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 2, max: 4 },
      { name: 'xB', label: 'x_B', min: -6, max: 6 },
      { name: 'yB', label: 'y_B', min: -5, max: 5 },
      { name: 'zB', label: 'z_B', min: -6, max: 6 },
      { name: 'dX', label: '(x_A - x_B)/k', min: -3, max: 3, allowZero: false },
      { name: 'dY', label: '(y_A - y_B)/k', min: -3, max: 3 },
      { name: 'dZ', label: '(z_A - z_B)/k', min: -3, max: 3 },
      { name: 'xC', label: 'x_C', min: -6, max: 6 },
      { name: 'yC', label: 'y_C', min: -5, max: 5 },
      { name: 'zC', label: 'z_C', min: -6, max: 6 },
      { name: 'p', label: 'Hệ số p của c', min: 1, max: 3 },
    ],
    validateCode: `
      const { k, dX, dY, dZ, yC } = params;
      if (k < 2) return { valid: false, reason: 'k >= 2' };
      if (dX === 0 && dY === 0 && dZ === 0) return { valid: false, reason: 'A và B phải phân biệt' };
      if (dY + yC === 0) return { valid: false, reason: 'y_I phải khác 0 để bài toán hình chiếu có ý nghĩa' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, xB, yB, zB, dX, dY, dZ, xC, yC, zC, p } = params;
      const xA = xB + k * dX, yA = yB + k * dY, zA = zB + k * dZ;
      const xI = dX + xC, yI = dY + yC, zI = dZ + zC;
      const ans = xI + p * zI;
      const shortAnswer = String(ans);
      const pcExpr = p === 1 ? 'a + c' : 'a + ' + p + 'c';
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho $A' + u.formatCoord3D(xA, yA, zA) + '$, $B' + u.formatCoord3D(xB, yB, zB) +
          '$, $C' + u.formatCoord3D(xC, yC, zC) + '$. Điểm $M(a; b; c)$ thuộc mặt phẳng $(Oxz)$ sao cho $\\left|\\overrightarrow{MA} - \\overrightarrow{MB} - ' +
          k + '\\overrightarrow{CM}\\right|$ đạt giá trị nhỏ nhất. Tính giá trị biểu thức $' + pcExpr + '$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $-' + k + '\\overrightarrow{CM} = ' + k + '\\overrightarrow{MC}$. Gọi $I$ thỏa mãn $\\overrightarrow{IA} - \\overrightarrow{IB} + ' + k + '\\overrightarrow{IC} = \\overrightarrow{0}$.',
          'Suy ra $I = \\frac{A - B + ' + k + 'C}{' + k + '} = ' + u.formatCoord3D(xI, yI, zI) + '$.',
          'Khi đó $\\left|\\overrightarrow{MA} - \\overrightarrow{MB} + ' + k + '\\overrightarrow{MC}\\right| = ' + k + 'MI$ nhỏ nhất khi $M$ là hình chiếu vuông góc của $I$ lên $(Oxz): y = 0$.',
          'Suy ra $M(' + xI + ';\\, 0;\\, ' + zI + ') \\Rightarrow ' + pcExpr + ' = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y_I = 0', params: { k: 2, xB: 2, yB: 0, zB: -3, dX: 1, dY: -1, dZ: -1, xC: -2, yC: 1, zC: 3, p: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q66 A(4;0;-5), B(2;0;-3), C(-2;1;3), a+2c', params: { k: 2, xB: 2, yB: 0, zB: -3, dX: 1, dY: 0, dZ: -1, xC: -2, yC: 1, zC: 3, p: 2 }, expectedValid: true },
    ],
  },

  // Dạng 67 (Q67): Cực tiểu biểu thức T = p*MA^2 + q*MB^2 - MC^2 với M thuộc (Oxz)
  t12_b8_d67_min_sq_sum_oxz_sa: {
    id: 't12_b8_d67_min_sq_sum_oxz_sa',
    name: 'Tìm giá trị nhỏ nhất của T = pMA^2 + qMB^2 - MC^2 trên (Oxz)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tâm tỷ cự tối ưu tổng bình phương độ dài',
    description: 'Cho ba điểm A, B, C và M thuộc (Oxz). Tìm giá trị nhỏ nhất của p*MA^2 + q*MB^2 - MC^2.',
    conditionSummary: 'Tổng hệ số S = p + q - 1 > 0 và tâm tỷ cự I không thuộc (Oxz)',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p', min: 2, max: 4 },
      { name: 'q', label: 'Hệ số q', min: 2, max: 4 },
      { name: 'xA', label: 'x_A', min: -6, max: 6 },
      { name: 'yA', label: 'y_A', min: -6, max: 6 },
      { name: 'zA', label: 'z_A', min: -5, max: 5 },
      { name: 'xB', label: 'x_B', min: -6, max: 6 },
      { name: 'yB', label: 'y_B', min: -6, max: 6 },
      { name: 'zB', label: 'z_B', min: -5, max: 5 },
      { name: 'xI', label: 'x_I', min: -4, max: 4 },
      { name: 'yI', label: 'y_I', min: -4, max: 4, allowZero: false },
      { name: 'zI', label: 'z_I', min: -4, max: 4 },
    ],
    validateCode: `
      const { p, q, xA, yA, zA, xB, yB, zB, yI } = params;
      if (p + q - 1 <= 0) return { valid: false, reason: 'Tổng hệ số p + q - 1 phải dương' };
      if (yI === 0) return { valid: false, reason: 'y_I khác 0' };
      if (xA === xB && yA === yB && zA === zB) return { valid: false, reason: 'A và B phải phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, xA, yA, zA, xB, yB, zB, xI, yI, zI } = params;
      const S = p + q - 1;
      const xC = p * xA + q * xB - S * xI;
      const yC = p * yA + q * yB - S * yI;
      const zC = p * zA + q * zB - S * zI;
      const ia2 = (xA - xI) * (xA - xI) + (yA - yI) * (yA - yI) + (zA - zI) * (zA - zI);
      const ib2 = (xB - xI) * (xB - xI) + (yB - yI) * (yB - yI) + (zB - zI) * (zB - zI);
      const ic2 = (xC - xI) * (xC - xI) + (yC - yI) * (yC - yI) + (zC - zI) * (zC - zI);
      const constVal = p * ia2 + q * ib2 - ic2;
      const tMin = S * yI * yI + constVal;
      const shortAnswer = String(tMin);
      return {
        stem:
          'Trong không gian $Oxyz$, cho $A' + u.formatCoord3D(xA, yA, zA) + '$, $B' + u.formatCoord3D(xB, yB, zB) +
          '$, $C' + u.formatCoord3D(xC, yC, zC) + '$ và điểm $M \\in (Oxz)$. Tìm giá trị nhỏ nhất của biểu thức $T = ' +
          p + 'MA^2 + ' + q + 'MB^2 - MC^2$.',
        shortAnswer,
        numericValue: tMin,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $I$ là điểm thỏa mãn $' + p + '\\overrightarrow{IA} + ' + q + '\\overrightarrow{IB} - \\overrightarrow{IC} = \\overrightarrow{0}$. Giải được $I' + u.formatCoord3D(xI, yI, zI) + '$.',
          'Ta phân tích $T = ' + S + 'MI^2 + ' + p + 'IA^2 + ' + q + 'IB^2 - IC^2 = ' + S + 'MI^2' + u.formatTrailingConst(constVal) + '$.',
          'Vì $M \\in (Oxz)$ nên $MI \\ge d(I, (Oxz)) = |y_I| = ' + Math.abs(yI) + '$.',
          'Suy ra $T_{\\min} = ' + S + ' \\cdot ' + (yI * yI) + u.formatTrailingConst(constVal) + ' = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên I nằm trên (Oxz) yI = 0', params: { p: 2, q: 3, xA: 3, yA: -5, zA: 0, xB: -1, yB: 4, zB: 2, xI: 3, yI: 0, zI: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q67 A(3;-5;0), B(-1;4;2), I(3;-1;3) -> C(-9;6;-6)', params: { p: 2, q: 3, xA: 3, yA: -5, zA: 0, xB: -1, yB: 4, zB: 2, xI: 3, yI: -1, zI: 3 }, expectedValid: true },
    ],
  },

  // Dạng 68 (Q68): Hai máy bay xuất phát lệch thời gian theo hướng đối xứng hợp các góc bằng nhau với trục
  t12_b8_d68_two_planes_airport_sa: {
    id: 't12_b8_d68_two_planes_airport_sa',
    name: 'Khoảng cách giữa hai máy bay cất cánh từ cùng trạm không lưu theo hai hướng góc đều với trục tọa độ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Vectơ đơn vị chỉ phương và bài toán không lưu',
    description: 'Máy bay A bay theo hướng hợp các góc bằng nhau với tia Ox, Oy, Oz; sau t0 phút máy bay B bay theo hướng hợp các góc bằng nhau với Ox\', Oy\', Oz. Tính khoảng cách AB sau T phút.',
    conditionSummary: 'T > t0 > 0, vận tốc dương và kết quả làm tròn hàng đơn vị không sát 0,5',
    paramSpecs: [
      { name: 'vA', label: 'Vận tốc máy bay A (km/h)', min: 700, max: 1100, step: 50 },
      { name: 'vB', label: 'Vận tốc máy bay B (km/h)', min: 600, max: 1000, step: 50 },
      { name: 't0', label: 'Thời gian trễ t0 (phút)', min: 10, max: 20, step: 5 },
      { name: 'T', label: 'Thời gian T kể từ 6h (phút)', min: 30, max: 60, step: 15 },
    ],
    validateCode: `
      const { vA, vB, t0, T } = params;
      if (vA <= 0 || vB <= 0 || t0 <= 0 || T <= t0) return { valid: false, reason: 'Cần T > t0 > 0 và vận tốc dương' };
      const oa = (vA * T) / 60;
      const ob = (vB * (T - t0)) / 60;
      const ab = Math.sqrt((2 * (oa + ob) * (oa + ob) + (oa - ob) * (oa - ob)) / 3);
      if (Math.abs(ab - Math.floor(ab) - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vA, vB, t0, T } = params;
      const oaFrac = u.simplifyFrac(vA * T, 60);
      const obFrac = u.simplifyFrac(vB * (T - t0), 60);
      const oa = oaFrac.value, ob = obFrac.value;
      const ab = Math.sqrt((2 * (oa + ob) * (oa + ob) + (oa - ob) * (oa - ob)) / 3);
      const ans = Math.round(ab);
      const shortAnswer = String(ans);
      const hh = 6 + Math.floor(T / 60);
      const mm = T % 60;
      const timeStr = hh + 'h' + (mm === 0 ? '00' : (mm < 10 ? '0' + mm : String(mm)));
      return {
        stem:
          'Trạm không lưu một sân bay xây dựng hệ tọa độ $Oxyz$ (gốc $O$ đặt tại sân bay) để theo dõi vị trí các chuyến bay. Lúc 6h00, máy bay $A$ xuất phát theo tia $\\overrightarrow{OA}$ lần lượt hợp với ba tia $\\overrightarrow{Ox}, \\overrightarrow{Oy}, \\overrightarrow{Oz}$ các góc bằng nhau với vận tốc $' +
          vA + '$ km/h. Sau đó $' + t0 + '$ phút, máy bay $B$ xuất phát theo tia $\\overrightarrow{OB}$ hợp với ba tia $\\overrightarrow{Ox\'}, \\overrightarrow{Oy\'}, \\overrightarrow{Oz}$ (trong đó $Ox\', Oy\'$ lần lượt là tia đối của $Ox, Oy$) các góc bằng nhau với vận tốc $' +
          vB + '$ km/h. Tính khoảng cách giữa hai máy bay $A$ và $B$ lúc ' + timeStr + ' (đơn vị km, kết quả làm tròn đến hàng đơn vị).',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vectơ đơn vị chỉ phương của $\\overrightarrow{OA}$ là $\\left(\\frac{1}{\\sqrt{3}};\\, \\frac{1}{\\sqrt{3}};\\, \\frac{1}{\\sqrt{3}}\\right)$ và của $\\overrightarrow{OB}$ là $\\left(-\\frac{1}{\\sqrt{3}};\\, -\\frac{1}{\\sqrt{3}};\\, \\frac{1}{\\sqrt{3}}\\right)$.',
          'Lúc ' + timeStr + ', máy bay $A$ bay được $OA = ' + vA + ' \\cdot \\frac{' + T + '}{60} = ' + oaFrac.latex + '$ km; máy bay $B$ bay được $OB = ' + vB + ' \\cdot \\frac{' + (T - t0) + '}{60} = ' + obFrac.latex + '$ km.',
          'Khoảng cách $AB = \\sqrt{\\frac{2(OA + OB)^2 + (OA - OB)^2}{3}} \\approx ' + shortAnswer + '$ km.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên T <= t0', params: { vA: 1000, vB: 700, t0: 30, T: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q68 vA=1000, vB=700, t0=10, T=30', params: { vA: 1000, vB: 700, t0: 10, T: 30 }, expectedValid: true },
    ],
  },

  // Dạng 69 (Q69): Điểm M thỏa mãn c0*OM + c1*MA + c2*MB = 0
  t12_b8_d69_barycentric_om_ma_mb_sa: {
    id: 't12_b8_d69_barycentric_om_ma_mb_sa',
    name: 'Tìm tọa độ điểm M thỏa mãn c0*OM + c1*MA + c2*MB = 0 và tính a - b + c',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đẳng thức vectơ xác định điểm trong Oxyz',
    description: 'Cho hai điểm A, B và điểm M(a; b; c) thỏa mãn c0*OM + c1*MA + c2*MB = 0. Tính a - b + c.',
    conditionSummary: 'c1 + c2 - c0 > 0 và (m2x - m2y + m2z) chẵn để a - b + c là số nguyên',
    paramSpecs: [
      { name: 'c0', label: 'Hệ số c0 của OM', min: 1, max: 4 },
      { name: 'c1', label: 'Hệ số c1 của MA', min: 2, max: 5 },
      { name: 'c2', label: 'Hệ số c2 của MB', min: 2, max: 5 },
      { name: 'xA', label: 'x_A', min: -5, max: 5 },
      { name: 'yA', label: 'y_A', min: -5, max: 5 },
      { name: 'zA', label: 'z_A', min: -5, max: 5 },
      { name: 'm2x', label: '2*x_M', min: -7, max: 7 },
      { name: 'm2y', label: '2*y_M', min: -7, max: 7 },
      { name: 'm2z', label: '2*z_M', min: -6, max: 6 },
    ],
    validateCode: `
      const { c0, c1, c2, xA, yA, zA, m2x, m2y, m2z } = params;
      const D = c1 + c2 - c0;
      if (D <= 0) return { valid: false, reason: 'Cần c1 + c2 - c0 > 0' };
      if ((m2x - m2y + m2z) % 2 !== 0) return { valid: false, reason: 'Cần a - b + c là số nguyên' };
      if (xA === 0 && yA === 0 && zA === 0) return { valid: false, reason: 'A khác gốc O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, c1, c2, xA, yA, zA, m2x, m2y, m2z } = params;
      const D = c1 + c2 - c0;
      const bx = u.simplifyFrac(D * m2x - 2 * c1 * xA, 2 * c2);
      const by = u.simplifyFrac(D * m2y - 2 * c1 * yA, 2 * c2);
      const bz = u.simplifyFrac(D * m2z - 2 * c1 * zA, 2 * c2);
      const mx = u.simplifyFrac(m2x, 2);
      const my = u.simplifyFrac(m2y, 2);
      const mz = u.simplifyFrac(m2z, 2);
      const ans = (m2x - m2y + m2z) / 2;
      const shortAnswer = String(ans);
      return {
        stem:
          'Trong không gian tọa độ $Oxyz$, cho hai điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ và $B\\left(' +
          bx.latex + ';\\, ' + by.latex + ';\\, ' + bz.latex + '\\right)$. Điểm $M(a; b; c)$ thỏa mãn $' +
          c0 + '\\overrightarrow{OM} + ' + c1 + '\\overrightarrow{MA} + ' + c2 + '\\overrightarrow{MB} = \\overrightarrow{0}$. Tính $a - b + c$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Biến đổi $' + c0 + '\\overrightarrow{OM} = -' + c0 + '\\overrightarrow{MO}$, ta có $-' + c0 + '\\overrightarrow{MO} + ' + c1 + '\\overrightarrow{MA} + ' + c2 + '\\overrightarrow{MB} = \\overrightarrow{0}$.',
          'Do đó $M = \\frac{' + c1 + 'A + ' + c2 + 'B}{-' + c0 + ' + ' + c1 + ' + ' + c2 + '} = \\left(' + mx.latex + ';\\, ' + my.latex + ';\\, ' + mz.latex + '\\right)$.',
          'Vậy $a - b + c = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1 + c2 - c0 <= 0', params: { c0: 5, c1: 2, c2: 3, xA: 3, yA: 1, zA: -3, m2x: -3, m2y: -5, m2z: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q69 c0=3, c1=2, c2=4, A(3;1;-3), M(-3/2;-5/2;2)', params: { c0: 3, c1: 2, c2: 4, xA: 3, yA: 1, zA: -3, m2x: -3, m2y: -5, m2z: 4 }, expectedValid: true },
    ],
  },

  // Dạng 70 (Q70): Xác định tâm chấn động đất dưới lòng đất từ 3 trạm quan trắc
  t12_b8_d70_earthquake_epicenter_sa: {
    id: 't12_b8_d70_earthquake_epicenter_sa',
    name: 'Xác định tọa độ tâm chấn động đất từ khoảng cách tới ba trạm quan trắc',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hệ phương trình khoảng cách trong không gian Oxyz',
    description: 'Ba trạm A(0;0;0), B(xB;0;0), C(0;yC;0) đo được khoảng cách tới tâm chấn E(a; b; c) với c < 0. Tính 2a + b + c.',
    conditionSummary: 'xB > 0, yC > 0, tâm chấn E có cao độ âm c < 0',
    paramSpecs: [
      { name: 'xB', label: 'Tọa độ x_B', min: 2, max: 7 },
      { name: 'yC', label: 'Tọa độ y_C', min: 2, max: 7 },
      { name: 'a', label: 'Hoành độ tâm chấn a', min: -6, max: 8 },
      { name: 'b', label: 'Tung độ tâm chấn b', min: -6, max: 8 },
      { name: 'c', label: 'Cao độ tâm chấn c (< 0)', min: -9, max: -2 },
    ],
    validateCode: `
      const { xB, yC, c } = params;
      if (xB <= 0 || yC <= 0 || c >= 0) return { valid: false, reason: 'Cần x_B > 0, y_C > 0 và c < 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xB, yC, a, b, c } = params;
      const radLatex = (n) => {
        let out = 1, inn = n;
        for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) {
          if (inn % (k * k) === 0) {
            out = k;
            inn = n / (k * k);
            break;
          }
        }
        if (inn === 1) return String(out);
        return out === 1 ? '\\sqrt{' + inn + '}' : out + '\\sqrt{' + inn + '}';
      };
      const dA2 = a * a + b * b + c * c;
      const dB2 = (a - xB) * (a - xB) + b * b + c * c;
      const dC2 = a * a + (b - yC) * (b - yC) + c * c;
      const ans = 2 * a + b + c;
      const shortAnswer = String(ans);
      const diffB = dA2 - dB2;
      const diffC = dA2 - dC2;
      return {
        stem:
          'Để giám sát dư chấn, đài quan sát thiết lập hệ trục tọa độ không gian $Oxyz$ (đơn vị: km), với mặt phẳng $(Oxy)$ biểu diễn mặt đất. Có ba trạm quan trắc đặt trên mặt đất tại $A(0; 0; 0)$, $B(' +
          xB + '; 0; 0)$ và $C(0; ' + yC + '; 0)$. Một trận động đất có tâm chấn $E(a; b; c)$ nằm sâu dưới lòng đất ($c < 0$), khoảng cách từ $E$ đến các trạm $A, B, C$ lần lượt là $' +
          radLatex(dA2) + '$ km, $' + radLatex(dB2) + '$ km và $' + radLatex(dC2) + '$ km. Tính $2a + b + c$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Từ giả thiết ta có hệ: $a^2 + b^2 + c^2 = ' + dA2 + '$, $(a - ' + xB + ')^2 + b^2 + c^2 = ' + dB2 + '$, $a^2 + (b - ' + yC + ')^2 + c^2 = ' + dC2 + '$.',
          'Trừ phương trình thứ nhất cho hai phương trình còn lại: $' + (2 * xB) + 'a - ' + (xB * xB) + ' = ' + diffB + '$ và $' + (2 * yC) + 'b - ' + (yC * yC) + ' = ' + diffC + ' \\Rightarrow a = ' + a + ',\\; b = ' + b + '$.',
          'Thay lại được $c^2 = ' + (c * c) + '$, kết hợp $c < 0 \\Rightarrow c = ' + c + '$.',
          'Vậy $E' + u.formatCoord3D(a, b, c) + '$ và $2a + b + c = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tâm chấn không âm c >= 0', params: { xB: 3, yC: 4, a: 5, b: 4, c: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q70 B(3;0;0), C(0;4;0), E(5;4;-6)', params: { xB: 3, yC: 4, a: 5, b: 4, c: -6 }, expectedValid: true },
    ],
  },

  // Dạng 71 (Q71): Điểm N thuộc (Oxy) tối ưu NP^2 + NM^2 + NC^2
  t12_b8_d71_min_sq_sum_centroid_oxy_sa: {
    id: 't12_b8_d71_min_sq_sum_centroid_oxy_sa',
    name: 'Tìm điểm N(a; b; c) thuộc (Oxy) tối ưu NP^2 + NM^2 + NC^2',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị tổng bình phương độ dài qua trọng tâm tam giác',
    description: 'Cho ba điểm P, M, C không thẳng hàng. Tìm N(a; b; c) thuộc (Oxy) để T = NP^2 + NM^2 + NC^2 nhỏ nhất và tính a + b + c.',
    conditionSummary: 'P, M, C không thẳng hàng, zG != 0 và tránh ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'xP', label: 'x_P', min: -8, max: 8 },
      { name: 'yP', label: 'y_P', min: -8, max: 8 },
      { name: 'zP', label: 'z_P', min: -6, max: 6 },
      { name: 'xM', label: 'x_M', min: -6, max: 10 },
      { name: 'yM', label: 'y_M', min: -10, max: 6 },
      { name: 'zM', label: 'z_M', min: -6, max: 8 },
      { name: 'xC', label: 'x_C', min: -8, max: 8 },
      { name: 'yC', label: 'y_C', min: -8, max: 8 },
      { name: 'zC', label: 'z_C', min: -10, max: 6 },
    ],
    validateCode: `
      const { xP, yP, zP, xM, yM, zM, xC, yC, zC } = params;
      const u1 = xM - xP, u2 = yM - yP, u3 = zM - zP;
      const v1 = xC - xP, v2 = yC - yP, v3 = zC - zP;
      const cx = u2 * v3 - u3 * v2, cy = u3 * v1 - u1 * v3, cz = u1 * v2 - u2 * v1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'P, M, C thẳng hàng' };
      if (zP + zM + zC === 0) return { valid: false, reason: 'Trọng tâm G nên nằm ngoài (Oxy)' };
      const sum = (xP + xM + xC + yP + yM + yC) / 3;
      if (Math.abs(sum * 10 - Math.floor(sum * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xP, yP, zP, xM, yM, zM, xC, yC, zC } = params;
      const gx = u.simplifyFrac(xP + xM + xC, 3);
      const gy = u.simplifyFrac(yP + yM + yC, 3);
      const gz = u.simplifyFrac(zP + zM + zC, 3);
      const sum = gx.value + gy.value;
      const rounded = Math.round(sum * 10) / 10;
      const cleanVal = Object.is(rounded, -0) ? 0 : rounded;
      const shortAnswer = u.formatNumberVN(cleanVal, 1);
      return {
        stem:
          'Trong không gian $Oxyz$, cho ba điểm $P' + u.formatCoord3D(xP, yP, zP) + '$, $M' + u.formatCoord3D(xM, yM, zM) +
          '$, $C' + u.formatCoord3D(xC, yC, zC) + '$. Điểm $N \\in (Oxy)$ sao cho biểu thức $T = NP^2 + NM^2 + NC^2$ đạt giá trị nhỏ nhất. Biết $N(a; b; c)$, tính $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: cleanVal,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $G$ là trọng tâm tam giác $PMC$, ta có $G\\left(' + gx.latex + ';\\, ' + gy.latex + ';\\, ' + gz.latex + '\\right)$.',
          'Ta biến đổi $T = NP^2 + NM^2 + NC^2 = 3NG^2 + GP^2 + GM^2 + GC^2$.',
          'Do $N \\in (Oxy)$ nên $T_{\\min} \\Leftrightarrow N$ là hình chiếu vuông góc của $G$ lên $(Oxy)$.',
          'Suy ra $N\\left(' + gx.latex + ';\\, ' + gy.latex + ';\\, 0\\right)$, vậy $a + b + c \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P, M, C thẳng hàng', params: { xP: 0, yP: 0, zP: 1, xM: 1, yM: 1, zM: 2, xC: 2, yC: 2, zC: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q71 P(3;-4;0), M(9;-8;4), C(-3;2;-8)', params: { xP: 3, yP: -4, zP: 0, xM: 9, yM: -8, zM: 4, xC: -3, yC: 2, zC: -8 }, expectedValid: true },
    ],
  },
};
