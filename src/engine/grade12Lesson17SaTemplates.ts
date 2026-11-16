import { MathTemplate } from '../types/math';

const SPHERE_SA_HELPERS = String.raw`
  const fmtSqTerm = (v, c) => (c === 0 ? v + '^{2}' : '\\left(' + u.formatShift(v, -c) + '\\right)^{2}');
  const fmtSphereStd = (a, b, c, rSq) => fmtSqTerm('x', a) + ' + ' + fmtSqTerm('y', b) + ' + ' + fmtSqTerm('z', c) + ' = ' + rSq;
  const fmtSphereGen = (A, B, C, D) => {
    const terms = [
      'x^2 + y^2 + z^2',
      u.formatTerm(A, 'x', false),
      u.formatTerm(B, 'y', false),
      u.formatTerm(C, 'z', false),
      u.formatTerm(D, '', false),
    ].filter(Boolean);
    return terms.join('') + ' = 0';
  };
  const fmtSqrtInt = (n) => {
    if (n <= 0) return '0';
    let sq = 1;
    let rem = n;
    for (let k = 2; k * k <= rem; k++) {
      while (rem % (k * k) === 0) {
        sq *= k;
        rem /= k * k;
      }
    }
    if (rem === 1) return String(sq);
    return sq === 1 ? '\\sqrt{' + rem + '}' : sq + '\\sqrt{' + rem + '}';
  };
  const fmtSqrtFrac = (num, den) => {
    const f = u.simplifyFrac(num, den);
    if (f.num <= 0) return '0';
    const prod = f.num * f.den;
    let sq = 1;
    let rem = prod;
    for (let k = 2; k * k <= rem; k++) {
      while (rem % (k * k) === 0) {
        sq *= k;
        rem /= k * k;
      }
    }
    const kFrac = u.simplifyFrac(sq, f.den);
    if (rem === 1) return kFrac.latex;
    if (kFrac.den === 1) {
      return kFrac.num === 1 ? '\\sqrt{' + rem + '}' : kFrac.num + '\\sqrt{' + rem + '}';
    }
    return '\\dfrac{' + (kFrac.num === 1 ? '' : kFrac.num) + '\\sqrt{' + rem + '}}{' + kFrac.den + '}';
  };
  const fmtCanonLine = (x0, y0, z0, u1, u2, u3) =>
    '\\dfrac{' + u.formatShift('x', -x0) + '}{' + u1 + '} = ' +
    '\\dfrac{' + u.formatShift('y', -y0) + '}{' + u2 + '} = ' +
    '\\dfrac{' + u.formatShift('z', -z0) + '}{' + u3 + '}';
  const fmtParamLine = (x0, y0, z0, u1, u2, u3, sym = 't') => {
    const lineVar = (vName, p0, vel) => {
      if (p0 === 0 && vel === 0) return vName + ' = 0';
      if (p0 === 0) return vName + ' = ' + u.formatTerm(vel, sym, true);
      return vName + ' = ' + p0 + u.formatTerm(vel, sym, false);
    };
    return '\\left\\{ \\begin{array}{l}' +
      lineVar('x', x0, u1) + ' \\\\ ' +
      lineVar('y', y0, u2) + ' \\\\ ' +
      lineVar('z', z0, u3) +
      '\\end{array} \\right.';
  };
`;

export const G12_B17_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D16 (Q16): Mặt cầu tâm B(a;b;c) cắt trục Oz theo dây cung có độ dài L
  t12_b17_d16_sphere_cut_oz_sa: {
    id: 't12_b17_d16_sphere_cut_oz_sa',
    name: 'Tính bán kính mặt cầu biết tâm và độ dài dây cung trên trục Oz',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giao tuyến mặt cầu với trục tọa độ',
    description:
      'Trong không gian Oxyz, mặt cầu (S) có tâm B(a;b;c) và cắt trục Oz tại hai điểm D, F sao cho DF = L. Tính bán kính R làm tròn đến hàng phần mười.',
    conditionSummary: 'a^2 + b^2 > 0, L >= 2; tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm B_x', min: -6, max: 6 },
      { name: 'b', label: 'Tung độ tâm B_y', min: -6, max: 6 },
      { name: 'c', label: 'Cao độ tâm B_z', min: -5, max: 5 },
      { name: 'L', label: 'Độ dài dây cung DF', min: 2, max: 10 },
    ],
    validateCode: `
      const { a, b, L } = params;
      if (a === 0 && b === 0) return { valid: false, reason: 'Tâm B nằm trên trục Oz nên không thể có bán kính từ BH' };
      if (L < 2) return { valid: false, reason: 'Độ dài dây cung phải >= 2' };
      const r = Math.sqrt(a * a + b * b + (L * L) / 4);
      if (Math.abs(((r * 10) % 1) - 0.5) < 0.003) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, L } = params;
      ` + SPHERE_SA_HELPERS + String.raw`
      const bhSq = a * a + b * b;
      const rSqFrac = u.simplifyFrac(4 * bhSq + L * L, 4);
      const rVal = Math.sqrt(bhSq + (L * L) / 4);
      const rounded = Number(rVal.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const halfLFrac = u.simplifyFrac(L * L, 4);
      const rExactLatex = fmtSqrtFrac(4 * bhSq + L * L, 4);
      return {
        stem:
          'Trong hệ trục $Oxyz$, mặt cầu $(S)$ có tâm $B' +
          u.formatCoord3D(a, b, c) +
          '$ và cắt trục $Oz$ tại các điểm $D, F$ sao cho $DF = ' +
          L +
          '$. Bán kính của mặt cầu $(S)$ bằng bao nhiêu (kết quả làm tròn đến hàng phần mười)?',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Hình chiếu vuông góc của điểm $B' + u.formatCoord3D(a, b, c) + '$ lên trục $Oz$ là $H(0;\\, 0;\\, ' + c + ')$.',
          'Ta có $BH^2 = ' + bhSq + '$ và $\\dfrac{DF^2}{4} = ' + halfLFrac.latex + '$.',
          'Bán kính mặt cầu là $R = \\sqrt{BH^2 + \\dfrac{DF^2}{4}} = \\sqrt{' + bhSq + ' + ' + halfLFrac.latex + '} = \\sqrt{' + rSqFrac.latex + '} = ' + rExactLatex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tâm nằm trên trục Oz', params: { a: 0, b: 0, c: 2, L: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16', params: { a: 4, b: 2, c: -1, L: 5 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Bán kính đường tròn giao tuyến của mặt cầu (S) và mặt phẳng (P)
  t12_b17_d17_sphere_plane_radius_sa: {
    id: 't12_b17_d17_sphere_plane_radius_sa',
    name: 'Tính bán kính đường tròn giao tuyến của mặt cầu và mặt phẳng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giao tuyến mặt cầu và mặt phẳng',
    description:
      'Cho mặt cầu (S) dạng chính tắc và mặt phẳng (P) cắt (S) theo một đường tròn. Tính bán kính r của đường tròn giao tuyến.',
    conditionSummary: 'A, B, C ≠ 0; d(I, (P)) < R - 1 để cắt nhau theo đường tròn',
    paramSpecs: [
      { name: 'a', label: 'x_I', min: -5, max: 5 },
      { name: 'b', label: 'y_I', min: -5, max: 5 },
      { name: 'c', label: 'z_I', min: -5, max: 5 },
      { name: 'rSq', label: 'R^2', min: 20, max: 110 },
      { name: 'A', label: 'A', min: -4, max: 4, allowZero: false },
      { name: 'B', label: 'B', min: -4, max: 4, allowZero: false },
      { name: 'C', label: 'C', min: -4, max: 4, allowZero: false },
      { name: 'D', label: 'D', min: -8, max: 8 },
    ],
    validateCode: `
      const { a, b, c, rSq, A, B, C, D } = params;
      if (A === 0 || B === 0 || C === 0 || rSq < 16) return { valid: false, reason: 'Hệ số pháp tuyến khác 0 và R^2 >= 16' };
      const normSq = A * A + B * B + C * C;
      const val = A * a + B * b + C * c + D;
      if (val === 0) return { valid: false, reason: 'Mặt phẳng không đi qua tâm để tránh r = R tầm thường' };
      const dSq = (val * val) / normSq;
      if (dSq >= rSq - 2) return { valid: false, reason: 'Mặt phẳng phải cắt mặt cầu: d(I,(P)) < R' };
      const r = Math.sqrt(rSq - dSq);
      if (Math.abs(((r * 10) % 1) - 0.5) < 0.003) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, rSq, A, B, C, D } = params;
      ` + SPHERE_SA_HELPERS + String.raw`
      const normSq = A * A + B * B + C * C;
      const val = A * a + B * b + C * c + D;
      const dSqFrac = u.simplifyFrac(val * val, normSq);
      const rCircSqFrac = u.simplifyFrac(rSq * normSq - val * val, normSq);
      const rCirc = Math.sqrt(rSq - (val * val) / normSq);
      const rounded = Number(rCirc.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eqS = fmtSphereStd(a, b, c, rSq);
      const eqP = u.formatPlaneEq(A, B, C, D);
      const rExactLatex = fmtSqrtFrac(rSq * normSq - val * val, normSq);
      return {
        stem:
          'Trong hệ trục $Oxyz$, cho mặt cầu $(S): ' +
          eqS +
          '$ và mặt phẳng $(P): ' +
          eqP +
          '$. Mặt cầu $(S)$ cắt mặt phẳng $(P)$ theo một đường tròn có bán kính bằng bao nhiêu (kết quả làm tròn đến hàng phần mười)?',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(a, b, c) + '$ và bán kính $R = ' + fmtSqrtInt(rSq) + '$.',
          'Khoảng cách từ tâm $I$ đến mặt phẳng $(P)$ là $d(I,(P)) = \\dfrac{|' + val + '|}{\\sqrt{' + normSq + '}} = ' + fmtSqrtFrac(val * val, normSq) + ' < R$.',
          'Bán kính đường tròn giao tuyến là $r = \\sqrt{R^2 - d^2(I,(P))} = \\sqrt{' + rSq + ' - ' + dSqFrac.latex + '} = \\sqrt{' + rCircSqFrac.latex + '} = ' + rExactLatex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d(I,(P)) >= R', params: { a: 2, b: -1, c: -2, rSq: 16, A: 2, B: 3, C: 2, D: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17', params: { a: 2, b: -1, c: -2, rSq: 72, A: 2, B: 3, C: 2, D: 4 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Tâm H(a;b;c) đường tròn giao tuyến của (S) và (P), tính a + b + c
  t12_b17_d18_circle_center_sum_sa: {
    id: 't12_b17_d18_circle_center_sum_sa',
    name: 'Tìm tổng tọa độ tâm đường tròn giao tuyến của mặt cầu và mặt phẳng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tâm đường tròn giao tuyến',
    description:
      'Mặt cầu (S) dạng khai triển cắt mặt phẳng (P) theo một đường tròn có tâm H(a;b;c). Tính a + b + c làm tròn đến hàng phần mười.',
    conditionSummary: 'A, B, C ≠ 0; d(I, (P)) < R và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'x_I', min: -6, max: 6 },
      { name: 'b', label: 'y_I', min: -6, max: 6 },
      { name: 'c', label: 'z_I', min: -6, max: 6 },
      { name: 'rSq', label: 'R^2', min: 25, max: 140 },
      { name: 'A', label: 'A_(P)', min: -5, max: 5, allowZero: false },
      { name: 'B', label: 'B_(P)', min: -5, max: 5, allowZero: false },
      { name: 'C', label: 'C_(P)', min: -5, max: 5, allowZero: false },
      { name: 'D', label: 'D_(P)', min: -8, max: 8 },
    ],
    validateCode: `
      const { a, b, c, rSq, A, B, C, D } = params;
      if (A === 0 || B === 0 || C === 0 || rSq < 20) return { valid: false, reason: 'Hệ số pháp tuyến khác 0 và R^2 >= 20' };
      const normSq = A * A + B * B + C * C;
      const val = A * a + B * b + C * c + D;
      if (val === 0) return { valid: false, reason: 'Tránh H trùng I' };
      if (val * val >= (rSq - 1) * normSq) return { valid: false, reason: 'Mặt phẳng phải cắt mặt cầu' };
      const sum = a + b + c - ((A + B + C) * val) / normSq;
      if (Math.abs(((Math.abs(sum) * 10) % 1) - 0.5) < 0.003) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, rSq, A, B, C, D } = params;
      ` + SPHERE_SA_HELPERS + String.raw`
      const dS = a * a + b * b + c * c - rSq;
      const eqS = fmtSphereGen(-2 * a, -2 * b, -2 * c, dS);
      const eqP = u.formatPlaneEq(A, B, C, D);
      const normSq = A * A + B * B + C * C;
      const val = A * a + B * b + C * c + D;
      const tFrac = u.simplifyFrac(-val, normSq);
      const xHFrac = u.simplifyFrac(a * normSq - A * val, normSq);
      const yHFrac = u.simplifyFrac(b * normSq - B * val, normSq);
      const zHFrac = u.simplifyFrac(c * normSq - C * val, normSq);
      const sumVal = a + b + c - ((A + B + C) * val) / normSq;
      const rounded = Number(sumVal.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const paramIH = fmtParamLine(a, b, c, A, B, C, 't');
      const linX = u.formatLinear(A, a, 't');
      const linY = u.formatLinear(B, b, 't');
      const linZ = u.formatLinear(C, c, 't');
      return {
        stem:
          'Trong hệ trục $Oxyz$, cho mặt cầu $(S): ' +
          eqS +
          '$ và mặt phẳng $(P): ' +
          eqP +
          '$. Mặt cầu $(S)$ cắt mặt phẳng $(P)$ theo một đường tròn có tâm $H(a;b;c)$. Tính $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(a, b, c) + '$ và bán kính $R = ' + fmtSqrtInt(rSq) + '$.',
          'Đường thẳng $IH$ đi qua $I$ và nhận $\\overrightarrow{n_P} = ' + u.formatCoord3D(A, B, C) + '$ làm vectơ chỉ phương có phương trình $' + paramIH + '$.',
          'Gọi $H(' + linX + ';\\, ' + linY + ';\\, ' + linZ + ')$. Thay vào $(P)$ ta được: $' + A + '(' + linX + ')' + u.formatTerm(B, '(' + linY + ')', false) + u.formatTerm(C, '(' + linZ + ')', false) + u.formatTrailingConst(D) + ' = 0 \\Leftrightarrow t = ' + tFrac.latex + '$.',
          'Suy ra $H\\left(' + xHFrac.latex + ';\\, ' + yHFrac.latex + ';\\, ' + zHFrac.latex + '\\right)$, do đó $a + b + c \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mặt phẳng không cắt mặt cầu', params: { a: 0, b: 0, c: 0, rSq: 20, A: 2, B: 2, C: 1, D: 20 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18', params: { a: -4, b: -4, c: -5, rSq: 131, A: 5, B: -2, C: 4, D: 4 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Bán kính mặt cầu ngoại tiếp tứ diện vuông ODFA
  t12_b17_d19_tetra_ocircle_radius_sa: {
    id: 't12_b17_d19_tetra_ocircle_radius_sa',
    name: 'Tính bán kính mặt cầu ngoại tiếp tứ diện có các đỉnh trên ba trục tọa độ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Mặt cầu ngoại tiếp tứ diện vuông',
    description:
      'Cho ba điểm D(d;0;0), F(0;f;0), A(0;0;a) trên ba trục tọa độ. Tính bán kính mặt cầu ngoại tiếp tứ diện ODFA.',
    conditionSummary: 'd, f, a ≠ 0; tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'd', label: 'Hoành độ d của D', min: -8, max: 8, allowZero: false },
      { name: 'f', label: 'Tung độ f của F', min: -8, max: 8, allowZero: false },
      { name: 'a', label: 'Cao độ a của A', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { d, f, a } = params;
      if (d === 0 || f === 0 || a === 0) return { valid: false, reason: 'Ba điểm phải khác gốc O' };
      const r = 0.5 * Math.sqrt(d * d + f * f + a * a);
      if (Math.abs(((r * 10) % 1) - 0.5) < 0.003) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d, f, a } = params;
      ` + SPHERE_SA_HELPERS + String.raw`
      const sumSq = d * d + f * f + a * a;
      const rExactLatex = fmtSqrtFrac(sumSq, 4);
      const rVal = 0.5 * Math.sqrt(sumSq);
      const rounded = Number(rVal.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eq1 = d * d + u.formatTerm(d, 'A', false) + ' + D = 0';
      const eq2 = f * f + u.formatTerm(f, 'B', false) + ' + D = 0';
      const eq3 = a * a + u.formatTerm(a, 'C', false) + ' + D = 0';
      return {
        stem:
          'Trong hệ trục $Oxyz$, cho ba điểm $D' +
          u.formatCoord3D(d, 0, 0) +
          '$, $F' +
          u.formatCoord3D(0, f, 0) +
          '$, $A' +
          u.formatCoord3D(0, 0, a) +
          '$. Tính bán kính mặt cầu ngoại tiếp tứ diện $ODFA$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $(S): x^2 + y^2 + z^2 + Ax + By + Cz + D = 0$ là mặt cầu ngoại tiếp tứ diện $ODFA$.',
          'Vì $O, D, F, A \\in (S)$ nên ta có hệ: $\\left\\{ \\begin{array}{l} D = 0 \\\\ ' + eq1 + ' \\\\ ' + eq2 + ' \\\\ ' + eq3 + ' \\end{array} \\right. \\Rightarrow \\left\\{ \\begin{array}{l} A = ' + (-d) + ' \\\\ B = ' + (-f) + ' \\\\ C = ' + (-a) + ' \\\\ D = 0 \\end{array} \\right.$.',
          'Tâm mặt cầu là $I\\left(' + u.simplifyFrac(d, 2).latex + ';\\, ' + u.simplifyFrac(f, 2).latex + ';\\, ' + u.simplifyFrac(a, 2).latex + '\\right)$ và bán kính là $R = \\dfrac{1}{2}\\sqrt{' + (d * d) + ' + ' + (f * f) + ' + ' + (a * a) + '} = ' + rExactLatex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên điểm trùng gốc O', params: { d: 0, f: 1, a: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19', params: { d: -3, f: 1, a: 4 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Mặt cầu (C_m) phụ thuộc tham số m có bán kính nhỏ nhất bằng a, tính a^2
  t12_b17_d20_min_sphere_radius_param_sa: {
    id: 't12_b17_d20_min_sphere_radius_param_sa',
    name: 'Tìm giá trị nhỏ nhất của bình phương bán kính mặt cầu chứa tham số m',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bán kính nhỏ nhất của họ mặt cầu',
    description:
      'Cho họ mặt cầu (Cm) phụ thuộc tham số m. Tìm giá trị nhỏ nhất của a^2 = R^2_min làm tròn đến hàng phần mười.',
    conditionSummary: 'p, r, k ≠ 0 và biệt thức đảm bảo R^2_min > 0 với mọi m',
    paramSpecs: [
      { name: 'p', label: 'Hệ số m ở tâm x (-p)', min: -5, max: 5, allowZero: false },
      { name: 'q', label: 'Hệ số tự do tâm x (-q)', min: -3, max: 3 },
      { name: 'r', label: 'Hệ số m ở tâm y (-r)', min: -4, max: 4, allowZero: false },
      { name: 's', label: 'Hệ số tự do tâm y (-s)', min: -3, max: 3 },
      { name: 'k', label: 'Hệ số m ở tâm z (-k)', min: -3, max: 3, allowZero: false },
      { name: 'D0', label: 'Hệ số tự do D', min: -10, max: -1 },
    ],
    validateCode: `
      const { p, q, r, s, k, D0 } = params;
      if (p === 0 || r === 0 || k === 0) return { valid: false, reason: 'Các hệ số m khác 0' };
      const A = p * p + r * r + k * k;
      const B = 2 * (p * q + r * s);
      const C = q * q + s * s - D0;
      if (4 * A * C - B * B <= 0) return { valid: false, reason: 'Đảm bảo min R^2 > 0' };
      const minRSq = (4 * A * C - B * B) / (4 * A);
      if (Math.abs(((minRSq * 10) % 1) - 0.5) < 0.003) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, r, s, k, D0 } = params;
      const fmtMCoeffVar = (c1, c0, vName) => {
        if (c0 === 0) return u.formatTerm(c1, 'm' + vName, false);
        return ' + (' + u.formatLinear(c1, c0, 'm') + ')' + vName;
      };
      const A = p * p + r * r + k * k;
      const B = 2 * (p * q + r * s);
      const C = q * q + s * s - D0;
      const minFrac = u.simplifyFrac(4 * A * C - B * B, 4 * A);
      const mOptFrac = u.simplifyFrac(-B, 2 * A);
      const rounded = Number(minFrac.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);

      const eqCm =
        'x^{2} + y^{2} + z^{2}' +
        fmtMCoeffVar(2 * p, 2 * q, 'x') +
        fmtMCoeffVar(2 * r, 2 * s, 'y') +
        fmtMCoeffVar(2 * k, 0, 'z') +
        u.formatTrailingConst(D0) +
        ' = 0';
      const cX = '(' + u.formatLinear(-p, -q, 'm') + ')^{2}';
      const cY = '(' + u.formatLinear(-r, -s, 'm') + ')^{2}';
      const cZ = k === 1 ? 'm^{2}' : k === -1 ? '(-m)^{2}' : '(' + (-k) + 'm)^{2}';
      const quadM = u.formatQuadratic(A, B, C, 'm');
      return {
        stem:
          'Trong hệ trục $Oxyz$, cho mặt cầu $(C_{m}): ' +
          eqCm +
          '$ với $m$ là tham số. Mặt cầu có bán kính nhỏ nhất bằng $a$. Tính $a^{2}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Bình phương bán kính mặt cầu $(C_m)$ là $R^{2} = ' + cX + ' + ' + cY + ' + ' + cZ + u.formatTrailingConst(-D0) + ' = ' + quadM + '$.',
          'Tam thức bậc hai $' + quadM + '$ có $' + A + ' > 0$ nên $R^2$ đạt giá trị nhỏ nhất khi $m = ' + mOptFrac.latex + '$.',
          'Vậy $a^2 = \\min R^{2} = ' + minFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên min R^2 <= 0', params: { p: 1, q: 0, r: 1, s: 0, k: 1, D0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20', params: { p: 5, q: 2, r: -1, s: -1, k: 1, D0: -7 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Tàu vũ trụ rời bề mặt Trái Đất theo phương tiếp tuyến đường tròn vĩ tuyến
  t12_b17_d21_spaceship_equator_sa: {
    id: 't12_b17_d21_spaceship_equator_sa',
    name: 'Bài toán thực tế tàu vũ trụ rời Trái Đất theo tiếp tuyến vĩ tuyến',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế mặt cầu',
    description:
      'Bề mặt Trái Đất (R = 6400 km) được mô hình hóa thành mặt cầu x^2 + y^2 + z^2 = R0^2. Tàu vũ trụ bay theo tiếp tuyến vĩ tuyến tại A(x0; y0; z0) với vận tốc v trong T phút. Tính khoảng cách ngắn nhất tới đường tròn xích đạo.',
    conditionSummary: 'R0 ∈ {8, 10}; x0^2 + z0^2 < R0^2 - 1; tránh ranh giới làm tròn .5 km',
    paramSpecs: [
      { name: 'rChoice', label: 'Chọn bán kính mô hình (0:8, 1:10)', min: 0, max: 1 },
      { name: 'z0', label: 'Cao độ vĩ tuyến z_A', min: 1, max: 3 },
      { name: 'x0', label: 'Hoành độ x_A', min: 1, max: 4 },
      { name: 'v', label: 'Tốc độ (km/s)', min: 10, max: 18 },
      { name: 'mins', label: 'Thời gian bay (phút)', min: 10, max: 24 },
    ],
    validateCode: `
      const { rChoice, z0, x0, v, mins } = params;
      const R0 = rChoice === 0 ? 8 : 10;
      const y0Sq = R0 * R0 - z0 * z0 - x0 * x0;
      if (y0Sq <= 1) return { valid: false, reason: 'Điểm A phải nằm trên vĩ tuyến hợp lệ' };
      const scale = 6400 / R0;
      const m = (v * 60 * mins) / scale;
      const rhoSq = R0 * R0 - z0 * z0;
      const oh = Math.sqrt(rhoSq + m * m);
      const D = scale * Math.sqrt((oh - R0) * (oh - R0) + z0 * z0);
      if (Math.abs((D % 1) - 0.5) < 0.02) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị .5 km' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rChoice, z0, x0, v, mins } = params;
      ` + SPHERE_SA_HELPERS + String.raw`
      const R0 = rChoice === 0 ? 8 : 10;
      const R0Sq = R0 * R0;
      const rhoSq = R0Sq - z0 * z0;
      const y0Sq = rhoSq - x0 * x0;
      const y0Latex = fmtSqrtInt(y0Sq);
      const scale = 6400 / R0;
      const sKm = v * 60 * mins;
      const m = sKm / scale;
      const oh = Math.sqrt(rhoSq + m * m);
      const dCoord = Math.sqrt((oh - R0) * (oh - R0) + z0 * z0);
      const D = scale * dCoord;
      const rounded = Math.round(D);
      const shortAnswer = String(rounded);
      const mText = u.formatNumberVN(Number(m.toFixed(2)), 2);
      const dCoordText = u.formatNumberVN(Number(dCoord.toFixed(4)), 4);
      const DText = u.formatNumberVN(Number(D.toFixed(1)), 1);
      return {
        stem:
          'Bán kính Trái Đất lấy bằng $6400\\text{ km}$, khi gắn hệ trục tọa độ $Oxyz$ thì bề mặt Trái Đất là mặt cầu có phương trình $x^2 + y^2 + z^2 = ' +
          R0Sq +
          '$, đường xích đạo nằm trên mặt phẳng $(Oxy)$. Một tàu vũ trụ X rời khỏi bề mặt Trái Đất theo phương tiếp tuyến với đường tròn vĩ tuyến tại điểm $A(' +
          x0 +
          ';\\, ' +
          y0Latex +
          ';\\, ' +
          z0 +
          ')$, với giả thiết rằng sau khi rời khỏi bề mặt Trái Đất tàu vũ trụ X bay theo quỹ đạo thẳng với tốc độ không đổi bằng $' +
          v +
          '\\text{ km/s}$. Hỏi sau đúng $' +
          mins +
          '$ phút kể từ khi rời khỏi bề mặt Trái Đất thì khoảng cách từ tàu vũ trụ đến một điểm trên đường tròn xích đạo ngắn nhất bằng bao nhiêu kilômét (làm tròn kết quả đến hàng đơn vị)?',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l17_earth_tangent_orbit_3d',
          params: { R0, z0 },
        },
        solutionSteps: [
          'Bán kính mặt cầu mô hình là $' + R0 + '$, ứng với $6400\\text{ km}$, nên $1$ đơn vị tọa độ ứng với $' + scale + '\\text{ km}$.',
          'Điểm $A$ có cao độ $z = ' + z0 + '$ nên đường tròn vĩ tuyến đi qua $A$ (tâm $H(0;\\, 0;\\, ' + z0 + ')$) có bán kính $\\rho = \\sqrt{' + R0Sq + ' - ' + (z0 * z0) + '} = \\sqrt{' + rhoSq + '}$.',
          'Sau $' + mins + '$ phút, tàu bay được quãng đường $s = ' + v + ' \\cdot 60 \\cdot ' + mins + ' = ' + sKm + '\\text{ km}$, tương ứng độ dài $m = \\dfrac{' + sKm + '}{' + scale + '} = ' + mText + '$ (đơn vị tọa độ).',
          'Gọi $M$ là vị trí tàu và $N$ là hình chiếu của $M$ lên $(Oxy)$. Do quỹ đạo $AM \\perp HA$ trong mặt phẳng $z = ' + z0 + '$, ta có $HM = \\sqrt{\\rho^2 + m^2} = \\sqrt{' + rhoSq + ' + (' + mText + ')^2} \\Rightarrow ON = HM$.',
          'Điểm gần $M$ nhất trên đường tròn xích đạo cùng tia với $ON$, nên khoảng cách ngắn nhất là $d = \\sqrt{(ON - ' + R0 + ')^2 + ' + (z0 * z0) + '} \\approx ' + dCoordText + '$ (đơn vị tọa độ).',
          'Đổi ra kilômét: $D = ' + scale + ' \\cdot d \\approx ' + DText + '\\text{ km}$. Làm tròn đến hàng đơn vị được $' + rounded + '\\text{ km}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A vượt ngoài mặt cầu', params: { rChoice: 0, z0: 6, x0: 6, v: 12, mins: 15 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21', params: { rChoice: 0, z0: 1, x0: 2, v: 12, mins: 15 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Mặt phẳng tiếp tuyến chung cắt đoạn I1I2 của hai mặt cầu tiếp xúc ngoài
  t12_b17_d22_common_tangent_cut_sa: {
    id: 't12_b17_d22_common_tangent_cut_sa',
    name: 'Mặt phẳng tiếp xúc chung cắt đoạn nối tâm của hai mặt cầu tiếp xúc ngoài',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tiếp diện chung của hai mặt cầu',
    description:
      'Hai mặt cầu (S1), (S2) tiếp xúc ngoài tại điểm nằm trên đoạn I1I2. Mặt phẳng tiếp xúc chung (P): 2x + by + cz + d = 0. Tính T = b + c + d.',
    conditionSummary: 'Chọn bộ ba Pytago không gian (2, qy, qz, L) với R1 + R2 = L và R1, R2 >= 2',
    paramSpecs: [
      { name: 'quadIdx', label: 'Bộ Pytago (0..7)', min: 0, max: 7 },
      { name: 'syFlag', label: 'Dấu b (0:-, 1:+)', min: 0, max: 1 },
      { name: 'szFlag', label: 'Dấu c (0:-, 1:+)', min: 0, max: 1 },
      { name: 'x2', label: 'x_I2', min: -4, max: 4 },
      { name: 'y2', label: 'y_I2', min: -5, max: 5 },
      { name: 'z2', label: 'z_I2', min: -4, max: 4 },
      { name: 'r1', label: 'Bán kính R1', min: 2, max: 12 },
    ],
    validateCode: `
      const { quadIdx, r1 } = params;
      const lengths = [7, 11, 11, 15, 15, 7, 15, 15];
      if (quadIdx < 0 || quadIdx >= lengths.length) return { valid: false, reason: 'Chỉ số bộ số không hợp lệ' };
      const L = lengths[quadIdx];
      if (r1 < 2 || L - r1 < 2) return { valid: false, reason: 'Cần R1 >= 2 và R2 = L - R1 >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { quadIdx, syFlag, szFlag, x2, y2, z2, r1 } = params;
      const quads = [
        [2, 3, 6, 7],
        [2, 6, 9, 11],
        [2, 9, 6, 11],
        [2, 5, 14, 15],
        [2, 10, 11, 15],
        [2, 6, 3, 7],
        [2, 11, 10, 15],
        [2, 14, 5, 15],
      ];
      const q = quads[quadIdx];
      const L = q[3];
      const r2 = L - r1;
      const b = (syFlag === 0 ? -1 : 1) * q[1];
      const c = (szFlag === 0 ? -1 : 1) * q[2];
      const x1 = x2 + 2;
      const y1 = y2 + b;
      const z1 = z2 + c;
      // Tangent plane normal = (2, b, c) pointing from I2 to I1; I2 -> P distance = r2 => -(2*x2 + b*y2 + c*z2 + d) = r2*L
      const dotI1 = 2 * x1 + b * y1 + c * z1;
      const d = -(2 * x2 + b * y2 + c * z2 + r2 * L);
      const T = b + c + d;
      const shortAnswer = String(T);
      const eqP = '2x' + u.formatTerm(b, 'y', false) + u.formatTerm(c, 'z', false) + ' + d = 0';
      const evalI1 = '(' + dotI1 + ' + d)';
      const pSigned = (n) => (n < 0 ? '(' + n + ')' : String(n));
      return {
        stem:
          'Trong không gian $Oxyz$, cho mặt cầu $(S_1)$ có tâm $I_1' +
          u.formatCoord3D(x1, y1, z1) +
          '$ bán kính $R_1 = ' +
          r1 +
          '$, mặt cầu $(S_2)$ có tâm $I_2' +
          u.formatCoord3D(x2, y2, z2) +
          '$ bán kính $R_2 = ' +
          r2 +
          '$. Phương trình mặt phẳng $(P)$ đồng thời tiếp xúc với $(S_1), (S_2)$ và cắt đoạn $I_1I_2$ có dạng $2x + by + cz + d = 0$. Tính biểu thức $T = b + c + d$.',
        shortAnswer,
        numericValue: T,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{I_2I_1} = ' + u.formatCoord3D(2, b, c) + ' \\Rightarrow I_1I_2 = \\sqrt{4 + ' + (b * b) + ' + ' + (c * c) + '} = ' + L + ' = R_1 + R_2$, nên hai mặt cầu tiếp xúc ngoài với nhau.',
          'Vì $(P)$ tiếp xúc cả hai mặt cầu và cắt đoạn $I_1I_2$ nên $(P) \\perp I_1I_2$, suy ra $(P)$ nhận $\\overrightarrow{I_2I_1} = ' + u.formatCoord3D(2, b, c) + '$ làm vectơ pháp tuyến, nên $(P)$ có dạng $' + eqP + '$ (tức $b = ' + b + ',\\, c = ' + c + '$).',
          'Do $(P)$ tiếp xúc $(S_1)$ tại tiếp điểm thuộc đoạn $I_1I_2$ (cùng phía với $\\overrightarrow{I_2I_1}$), ta có $d(I_1,(P)) = R_1 \\Leftrightarrow \\dfrac{|2 \\cdot ' + pSigned(x1) + ' + ' + pSigned(b) + ' \\cdot ' + pSigned(y1) + ' + ' + pSigned(c) + ' \\cdot ' + pSigned(z1) + ' + d|}{' + L + '} = ' + r1 + ' \\Leftrightarrow ' + dotI1 + ' + d = ' + (r1 * L) + '$ (chọn dấu dương vì $I_1, I_2$ nằm khác phía đối với $(P)$, đồng thời $d(I_2,(P)) = R_2$).',
          'Suy ra $d = ' + d + '$. Vậy $T = b + c + d = ' + b + ' + ' + pSigned(c) + ' + ' + pSigned(d) + ' = ' + T + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R1 >= L (R2 <= 0)', params: { quadIdx: 0, syFlag: 1, szFlag: 1, x2: 0, y2: 0, z2: 0, r1: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22', params: { quadIdx: 2, syFlag: 0, szFlag: 0, x2: 2, y2: -3, z2: 2, r1: 8 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Khoảng cách lớn nhất từ O đến mặt phẳng tiếp xúc chung của hai mặt cầu cắt nhau
  t12_b17_d23_max_dist_common_tangent_sa: {
    id: 't12_b17_d23_max_dist_common_tangent_sa',
    name: 'Khoảng cách lớn nhất từ gốc O đến mặt phẳng tiếp xúc chung hai mặt cầu',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị khoảng cách và tiếp diện chung',
    description:
      'Cho hai mặt cầu (S1)(I(x0; y0; z1), R1) và (S2)(J(x0; y0; z2), R2) cắt nhau. Tìm khoảng cách lớn nhất từ O đến mặt phẳng (P) tiếp xúc với cả hai mặt cầu.',
    conditionSummary: '(x0, y0) ≠ (0, 0), R1 > R2, R1 - R2 < |z2 - z1| < R1 + R2 để chỉ có nón tiếp xúc ngoài',
    paramSpecs: [
      { name: 'x0', label: 'Hoành độ chung x0', min: -4, max: 4 },
      { name: 'y0', label: 'Tung độ chung y0', min: -4, max: 4 },
      { name: 'z1', label: 'z_I', min: -4, max: 1 },
      { name: 'z2', label: 'z_J', min: 0, max: 5 },
      { name: 'R1', label: 'R1', min: 4, max: 8 },
      { name: 'R2', label: 'R2', min: 1, max: 3 },
    ],
    validateCode: `
      const { x0, y0, z1, z2, R1, R2 } = params;
      if (x0 === 0 && y0 === 0) return { valid: false, reason: 'Tránh tâm nằm trên trục Oz' };
      if (R1 <= R2 || R2 < 1) return { valid: false, reason: 'Cần R1 > R2 >= 1' };
      const L = Math.abs(z2 - z1);
      if (L <= R1 - R2 || L >= R1 + R2) {
        return { valid: false, reason: 'Cần hai mặt cầu cắt nhau (R1 - R2 < IJ < R1 + R2) để chỉ có tâm vị tự ngoài' };
      }
      const cosT = (R1 - R2) / L;
      const sinT = Math.sqrt(1 - cosT * cosT);
      const zM = z1 + (R1 / (R1 - R2)) * (z2 - z1);
      const dMax = Math.sqrt(x0 * x0 + y0 * y0) * sinT + Math.abs(zM) * cosT;
      if (Math.abs(((dMax * 10) % 1) - 0.5) < 0.003) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z1, z2, R1, R2 } = params;
      ` + SPHERE_SA_HELPERS + String.raw`
      const L = Math.abs(z2 - z1);
      const dR = R1 - R2;
      const zMFrac = u.simplifyFrac(z1 * dR + R1 * (z2 - z1), dR);
      const cosFrac = u.simplifyFrac(dR, L);
      const rhoSq = x0 * x0 + y0 * y0;
      const cosVal = dR / L;
      const sinVal = Math.sqrt(1 - cosVal * cosVal);
      const dMax = Math.sqrt(rhoSq) * sinVal + Math.abs(zMFrac.value) * cosVal;
      const rounded = Number(dMax.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai mặt cầu $(S_1)$ có tâm $I' +
          u.formatCoord3D(x0, y0, z1) +
          '$ bán kính $R_1 = ' +
          R1 +
          '$ và $(S_2)$ có tâm $J' +
          u.formatCoord3D(x0, y0, z2) +
          '$ bán kính $R_2 = ' +
          R2 +
          '$. Gọi $(P)$ là mặt phẳng thay đổi tiếp xúc với cả hai mặt cầu $(S_1), (S_2)$. Tính khoảng cách lớn nhất từ gốc tọa độ $O$ đến mặt phẳng $(P)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $IJ = ' + L + '$. Vì $R_1 - R_2 = ' + dR + ' < IJ < ' + (R1 + R2) + ' = R_1 + R_2$ nên hai mặt cầu cắt nhau; mọi mặt phẳng tiếp xúc chung đều đi qua tâm vị tự ngoài $M$ thỏa $\\overrightarrow{MI} = \\dfrac{R_1}{R_2}\\overrightarrow{MJ}$.',
          'Suy ra $M\\left(' + x0 + ';\\, ' + y0 + ';\\, ' + zMFrac.latex + '\\right) \\in (P)$. Gọi $\\vec{n} = (a;\\, b;\\, c)$ là vectơ pháp tuyến của $(P)$.',
          'Vì $x_I = x_M = ' + x0 + '$, $y_I = y_M = ' + y0 + '$ và $d(I,(P)) = R_1$, ta có $\\dfrac{|c| \\cdot |z_I - z_M|}{\\sqrt{a^2 + b^2 + c^2}} = ' + R1 + ' \\Rightarrow \\dfrac{|c|}{\\sqrt{a^2 + b^2 + c^2}} = \\dfrac{R_1 - R_2}{IJ} = ' + cosFrac.latex + '$ và $\\dfrac{\\sqrt{a^2 + b^2}}{\\sqrt{a^2 + b^2 + c^2}} = \\sqrt{1 - \\left(' + cosFrac.latex + '\\right)^2}$.',
          'Áp dụng bất đẳng thức Cauchy–Schwarz cho $d(O,(P)) = \\dfrac{|a x_M + b y_M + c z_M|}{\\sqrt{a^2 + b^2 + c^2}} \\le \\sqrt{x_M^2 + y_M^2}\\sqrt{1 - \\left(' + cosFrac.latex + '\\right)^2} + |z_M|\\cdot ' + cosFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai mặt cầu không cắt nhau (ngoài nhau)', params: { x0: 2, y0: 1, z1: -2, z2: 6, R1: 4, R2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23', params: { x0: 2, y0: 1, z1: -2, z2: 3, R1: 5, R2: 1 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Mặt phẳng (P): ax + by + cz + 3 = 0 qua A, B cắt (S) theo đường tròn bán kính nhỏ nhất
  t12_b17_d24_plane_ab_min_circle_sa: {
    id: 't12_b17_d24_plane_ab_min_circle_sa',
    name: 'Mặt phẳng qua hai điểm A, B cắt mặt cầu theo đường tròn bán kính nhỏ nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị giao tuyến mặt phẳng - mặt cầu',
    description:
      'Mặt phẳng (P): ax + by + cz + 3 = 0 đi qua hai điểm A, B và cắt mặt cầu (S)(I, R) theo giao tuyến là đường tròn bán kính nhỏ nhất. Tính T = a + b + c.',
    conditionSummary: 'Đường thẳng AB cắt (S) tại 2 điểm phân biệt, I ∉ AB và (P) không đi qua gốc O',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -3, max: 4 },
      { name: 'yA', label: 'y_A', min: -3, max: 3 },
      { name: 'zA', label: 'z_A', min: -3, max: 3 },
      { name: 'xB', label: 'x_B', min: -4, max: 3 },
      { name: 'yB', label: 'y_B', min: -3, max: 3 },
      { name: 'zB', label: 'z_B', min: -3, max: 3 },
      { name: 'xI', label: 'x_I', min: -4, max: 4 },
      { name: 'yI', label: 'y_I', min: -4, max: 4 },
      { name: 'zI', label: 'z_I', min: -3, max: 3 },
      { name: 'R', label: 'Bán kính R', min: 6, max: 10 },
    ],
    validateCode: `
      const { xA, yA, zA, xB, yB, zB, xI, yI, zI, R } = params;
      const ux = xB - xA, uy = yB - yA, uz = zB - zA;
      const abSq = ux * ux + uy * uy + uz * uz;
      if (abSq === 0) return { valid: false, reason: 'A và B phải phân biệt' };
      const aix = xI - xA, aiy = yI - yA, aiz = zI - zA;
      const dot = aix * ux + aiy * uy + aiz * uz;
      const nx0 = dot * ux - abSq * aix;
      const ny0 = dot * uy - abSq * aiy;
      const nz0 = dot * uz - abSq * aiz;
      if (nx0 === 0 && ny0 === 0 && nz0 === 0) return { valid: false, reason: 'Tâm I không nằm trên đường thẳng AB' };
      const ihSq = aix * aix + aiy * aiy + aiz * aiz - (dot * dot) / abSq;
      if (ihSq <= 0.25 || ihSq >= R * R - 0.5) return { valid: false, reason: 'Đường thẳng AB phải cắt mặt cầu: d(I, AB) < R' };
      const g = u.gcd(nx0, u.gcd(ny0, nz0));
      const nx = nx0 / g, ny = ny0 / g, nz = nz0 / g;
      const dp = -(nx * xA + ny * yA + nz * zA);
      if (dp === 0) return { valid: false, reason: 'Mặt phẳng (P) không đi qua O để chuẩn hóa hệ số tự do +3' };
      const T = (3 * (nx + ny + nz)) / dp;
      if (Math.abs(((Math.abs(T) * 10) % 1) - 0.5) < 0.003) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, xB, yB, zB, xI, yI, zI, R } = params;
      const ux = xB - xA, uy = yB - yA, uz = zB - zA;
      const abSq = ux * ux + uy * uy + uz * uz;
      const aix = xI - xA, aiy = yI - yA, aiz = zI - zA;
      const dot = aix * ux + aiy * uy + aiz * uz;
      // AB^2 * vector IH = dot * u - abSq * vector AI
      const rawX = dot * ux - abSq * aix;
      const rawY = dot * uy - abSq * aiy;
      const rawZ = dot * uz - abSq * aiz;
      const g = u.gcd(rawX, u.gcd(rawY, rawZ));
      let nx = rawX / g, ny = rawY / g, nz = rawZ / g;
      let dp = -(nx * xA + ny * yA + nz * zA);
      if (dp < 0) {
        nx = -nx; ny = -ny; nz = -nz; dp = -dp;
      }
      const aFrac = u.simplifyFrac(3 * nx, dp);
      const bFrac = u.simplifyFrac(3 * ny, dp);
      const cFrac = u.simplifyFrac(3 * nz, dp);
      const tFrac = u.simplifyFrac(3 * (nx + ny + nz), dp);
      const rounded = Number(tFrac.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);

      const tProjFrac = u.simplifyFrac(dot, abSq);
      const xHFrac = u.simplifyFrac(abSq * xA + dot * ux, abSq);
      const yHFrac = u.simplifyFrac(abSq * yA + dot * uy, abSq);
      const zHFrac = u.simplifyFrac(abSq * zA + dot * uz, abSq);
      const ihxFrac = u.simplifyFrac(rawX, abSq);
      const ihyFrac = u.simplifyFrac(rawY, abSq);
      const ihzFrac = u.simplifyFrac(rawZ, abSq);
      const ihSqFrac = u.simplifyFrac(abSq * (aix * aix + aiy * aiy + aiz * aiz) - dot * dot, abSq);
      const tProjTerm = tProjFrac.num < 0 ? ' - ' + tProjFrac.latex.slice(1) : ' + ' + tProjFrac.latex;
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai điểm $A' +
          u.formatCoord3D(xA, yA, zA) +
          '$, $B' +
          u.formatCoord3D(xB, yB, zB) +
          '$ và mặt cầu $(S)$ có tâm $I' +
          u.formatCoord3D(xI, yI, zI) +
          '$, bán kính $R = ' +
          R +
          '$. Mặt phẳng $(P): ax + by + cz + 3 = 0$ đi qua $A, B$ và cắt mặt cầu $(S)$ theo giao tuyến là một đường tròn có bán kính nhỏ nhất. Tính $T = a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $H$ là hình chiếu vuông góc của $I$ lên đường thẳng $AB$ với $\\overrightarrow{AB} = ' + u.formatCoord3D(ux, uy, uz) + '$. Ta có $H = A + \\dfrac{\\overrightarrow{AI} \\cdot \\overrightarrow{AB}}{AB^2}\\overrightarrow{AB} = A' + tProjTerm + '\\overrightarrow{AB} = \\left(' + xHFrac.latex + ';\\, ' + yHFrac.latex + ';\\, ' + zHFrac.latex + '\\right)$.',
          'Kiểm tra $IH^2 = ' + ihSqFrac.latex + ' < ' + (R * R) + ' = R^2$ nên đường thẳng $AB$ cắt mặt cầu $(S)$.',
          'Bán kính đường tròn giao tuyến là $r = \\sqrt{R^2 - d^2(I,(P))}$ nhỏ nhất khi $d(I,(P)) = IK$ lớn nhất ($K$ là hình chiếu của $I$ lên $(P)$). Vì $K \\in (P)$ và $H \\in AB \\subset (P)$ nên $IK \\le IH$, dấu bằng xảy ra khi $K \\equiv H$, tức là $(P)$ đi qua $A, B$ và nhận $\\overrightarrow{IH} = \\left(' + ihxFrac.latex + ';\\, ' + ihyFrac.latex + ';\\, ' + ihzFrac.latex + '\\right)$ (cùng phương $\\vec{n} = ' + u.formatCoord3D(nx, ny, nz) + '$) làm vectơ pháp tuyến.',
          'Phương trình mặt phẳng $(P)$ là $' + u.formatPlaneEq(nx, ny, nz, dp) + '$. Chuẩn hóa hệ số tự do thành $+3$ bằng cách nhân hai vế với $\\dfrac{3}{' + dp + '}$, ta được $a = ' + aFrac.latex + ',\\, b = ' + bFrac.latex + ',\\, c = ' + cFrac.latex + '$.',
          'Vậy $T = a + b + c = ' + tFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A trùng B', params: { xA: 1, yA: 2, zA: 3, xB: 1, yB: 2, zB: 3, xI: 0, yI: 0, zI: 0, R: 8 }, expectedValid: false },
      { label: 'Biên mặt phẳng đi qua O', params: { xA: 0, yA: 0, zA: 0, xB: 1, yB: 1, zB: 0, xI: 0, yI: 0, zI: 2, R: 6 }, expectedValid: false },
      { label: 'Mẫu bộ số Q24 (đã hiệu đính chuẩn xác vectơ pháp tuyến IH)', params: { xA: 3, yA: 0, zA: 0, xB: -2, yB: 1, zB: -1, xI: -3, yI: -3, zI: 1, R: 8 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Mặt phẳng (P): ay + bz + 1 = 0 chứa đường thẳng d cắt (S) theo đường tròn bán kính nhỏ nhất
  t12_b17_d25_plane_line_min_circle_sa: {
    id: 't12_b17_d25_plane_line_min_circle_sa',
    name: 'Mặt phẳng chứa đường thẳng d cắt mặt cầu theo đường tròn bán kính nhỏ nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị mặt phẳng chứa đường thẳng cắt mặt cầu',
    description:
      'Mặt phẳng (P) chứa đường thẳng d và cắt mặt cầu (S) theo giao tuyến là đường tròn có bán kính nhỏ nhất có dạng ay + bz + 1 = 0. Tính 5a + 6b.',
    conditionSummary: 'gcd(|a|, |b|) = 1, a, b, u1 ≠ 0; đường thẳng d luôn cắt mặt cầu tại hai điểm phân biệt',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4, allowZero: false },
      { name: 'xB', label: 'Hoành độ x_B', min: -3, max: 3 },
      { name: 'u1', label: 'VTCP u_x', min: -3, max: 3, allowZero: false },
      { name: 'm', label: 'Hệ số độ dài IB', min: 1, max: 2 },
      { name: 'delta', label: 'Phần dư R^2 - IB^2', min: 3, max: 11 },
    ],
    validateCode: `
      const { a, b, u1 } = params;
      if (a === 0 || b === 0 || u1 === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      if (u.gcd(a, b) !== 1) return { valid: false, reason: 'Chọn (a, b) nguyên tố cùng nhau để biểu diễn điểm nguyên B gọn đẹp' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, xB, u1, m, delta } = params;
      ` + SPHERE_SA_HELPERS + String.raw`
      // Find zB in [0, |a|-1] such that (-1 - b*zB) is divisible by a, then shift closest to 0
      const absA = Math.abs(a);
      let zB = 0;
      for (let z = 0; z < absA; z++) {
        if ((-1 - b * z) % absA === 0) {
          zB = z;
          break;
        }
      }
      if (zB > absA / 2) zB -= absA;
      const yB = (-1 - b * zB) / a;

      // IB = m * (0, a, b) => I = B - IB
      const ibx = 0, iby = m * a, ibz = m * b;
      const xI = xB - ibx, yI = yB - iby, zI = zB - ibz;
      const ibSq = iby * iby + ibz * ibz;
      const rSq = ibSq + delta;
      const dS = xI * xI + yI * yI + zI * zI - rSq;
      const eqS = fmtSphereGen(-2 * xI, -2 * yI, -2 * zI, dS);
      const eqD = fmtCanonLine(xB, yB, zB, u1, -b, a);
      const eqP = u.formatPlaneEq(0, a, b, 1);
      const ans = 5 * a + 6 * b;
      const shortAnswer = String(ans);
      const rLatex = fmtSqrtInt(rSq);
      return {
        stem:
          'Trong không gian $Oxyz$, cho mặt cầu $(S): ' +
          eqS +
          '$ và đường thẳng $d: ' +
          eqD +
          '$. Mặt phẳng $(P)$ chứa $d$ và cắt mặt cầu $(S)$ theo giao tuyến là đường tròn $(C)$ có bán kính $r$ nhỏ nhất có dạng $ay + bz + 1 = 0$. Tính $5a + 6b$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(xI, yI, zI) + '$ và bán kính $R = ' + rLatex + '$.',
          'Đường thẳng $d$ có vectơ chỉ phương $\\vec{u} = ' + u.formatCoord3D(u1, -b, a) + '$ và đi qua điểm $B' + u.formatCoord3D(xB, yB, zB) + '$. Ta có $\\overrightarrow{IB} = ' + u.formatCoord3D(ibx, iby, ibz) + '$ thỏa $\\overrightarrow{IB} \\cdot \\vec{u} = 0$, nên $B$ chính là hình chiếu vuông góc của $I$ lên $d$ (và $IB^2 = ' + ibSq + ' < ' + rSq + ' = R^2$).',
          'Với mọi mặt phẳng $(P)$ chứa $d$, gọi $K$ là hình chiếu của $I$ lên $(P)$ thì $IK \\le IB$. Bán kính $r = \\sqrt{R^2 - IK^2}$ nhỏ nhất khi $IK$ lớn nhất, tức $K \\equiv B$.',
          'Do đó $(P)$ đi qua $B' + u.formatCoord3D(xB, yB, zB) + '$ và nhận $\\overrightarrow{IB} = ' + u.formatCoord3D(ibx, iby, ibz) + '$ (cùng phương $(' + 0 + ';\\, ' + a + ';\\, ' + b + ')$) làm vectơ pháp tuyến, nên có phương trình $' + eqP + '$.',
          'Suy ra $a = ' + a + ',\\, b = ' + b + '$. Vậy $5a + 6b = 5 \\cdot (' + a + ') + 6 \\cdot (' + b + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên gcd(a,b) > 1', params: { a: 2, b: 4, xB: 1, u1: 1, m: 1, delta: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25', params: { a: 1, b: 1, xB: 1, u1: 2, m: 1, delta: 7 }, expectedValid: true },
    ],
  },
};
