import { MathTemplate } from '../types/math';

const AP11_B6_SA_HELPERS = String.raw`
  const round1 = (val) => (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
  const round2 = (val) => (val < 0 ? -Math.round(-val * 100) : Math.round(val * 100)) / 100;
  const fmtDec1 = (val) => {
    const r = round1(val);
    if (Object.is(r, -0) || r === 0) return '0';
    return Number.isInteger(r) ? String(r) : String(r).replace('.', ',');
  };
  const fmtDec2 = (val) => {
    const r = round2(val);
    if (Object.is(r, -0) || r === 0) return '0';
    return Number.isInteger(r) ? String(r) : String(r).replace('.', ',');
  };
`;

export const G11_B6_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D16 (Q16): Biết u_p, u_q tính u_k
  t11_b6_d16_nth_from_two_sa: {
    id: 't11_b6_d16_nth_from_two_sa',
    name: 'Tính số hạng u_k của cấp số cộng khi biết u_p và u_q (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho hai số hạng u_p và u_q của cấp số cộng. Tính u_k.',
    conditionSummary: 'u1 ∈ [-15; 20], d ∈ [-9; 12] \\ {0}, 2 ≤ p < q ≤ 12, k ∈ [13; 28]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -15, max: 20 },
      { name: 'd', label: 'Công sai d', min: -9, max: 12, allowZero: false },
      { name: 'p', label: 'Chỉ số p', min: 2, max: 6 },
      { name: 'q', label: 'Chỉ số q (> p)', min: 7, max: 12 },
      { name: 'k', label: 'Chỉ số cần tính k', min: 13, max: 28 },
    ],
    validateCode: `
      const { u1, d, p, q, k } = params;
      if (d === 0 || d < -9 || d > 12 || u1 < -15 || u1 > 20 || p < 2 || q > 12 || p >= q || k < 13 || k > 28) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, p, q, k } = params;
      const up = u1 + (p - 1) * d;
      const uq = u1 + (q - 1) * d;
      const uk = u1 + (k - 1) * d;
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_{' + p + '} = ' + up + ',\\; u_{' + q + '} = ' + uq + '$. Tính $u_{' + k + '}$.',
        shortAnswer: String(uk),
        numericValue: uk,
        answerSummary: String(uk),
        solutionSteps: [
          'Giải hệ $\\left\\{\\begin{array}{l} u_1 + ' + (p - 1) + 'd = ' + up + ' \\\\ u_1 + ' + (q - 1) + 'd = ' + uq + ' \\end{array}\\right. \\Rightarrow \\left\\{\\begin{array}{l} u_1 = ' + u1 + ' \\\\ d = ' + d + ' \\end{array}\\right.$.',
          'Vậy $u_{' + k + '} = ' + u1 + ' + ' + (k - 1) + ' \\cdot (' + d + ') = ' + uk + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 10, d: 0, p: 4, q: 6, k: 15 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (u4=28, u6=40 -> u15=94)', params: { u1: 10, d: 6, p: 4, q: 6, k: 15 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Hệ phương trình tuyến tính theo u_n -> tính u_1 + d
  t11_b6_d17_linear_sys_u1_plus_d_sa: {
    id: 't11_b6_d17_linear_sys_u1_plus_d_sa',
    name: 'Giải hệ hai phương trình bậc nhất theo số hạng CSC tính u_1 + d (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho hệ gồm hai tổ hợp tuyến tính các số hạng cấp số cộng. Tìm u_1 + d.',
    conditionSummary: 'u1 ∈ [-15; 20], d ∈ [-12; 15] \\ {0}, hệ phương trình có định thức ≠ 0',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -15, max: 20 },
      { name: 'd', label: 'Công sai d', min: -12, max: 15, allowZero: false },
      { name: 'a1', label: 'Hệ số a1', min: 2, max: 9 },
      { name: 'b1', label: 'Hệ số b1 (âm)', min: -6, max: -1 },
      { name: 'a2', label: 'Hệ số a2', min: 1, max: 5 },
      { name: 'b2', label: 'Hệ số b2 (âm)', min: -8, max: -2 },
    ],
    validateCode: `
      const { u1, d, a1, b1, a2, b2 } = params;
      if (d === 0 || d < -12 || d > 15 || u1 < -15 || u1 > 20) return { valid: false, reason: 'u1 hoặc d ngoài miền' };
      if (a1 < 2 || a1 > 9 || b1 > -1 || b1 < -6 || a2 < 1 || a2 > 5 || b2 > -2 || b2 < -8) {
        return { valid: false, reason: 'Hệ số ngoài miền' };
      }
      const det = (a1 + b1) * (5 * a2 + 4 * b2) - (a2 + b2) * (a1 + 3 * b1);
      if (det === 0) return { valid: false, reason: 'Hệ phương trình suy biến (det = 0)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, a1, b1, a2, b2 } = params;
      // Eq1: a1*u2 + b1*u4 = rhs1; Eq2: a2*u6 + b2*u5 = rhs2
      const u2 = u1 + d, u4 = u1 + 3 * d, u5 = u1 + 4 * d, u6 = u1 + 5 * d;
      const rhs1 = a1 * u2 + b1 * u4;
      const rhs2 = a2 * u6 + b2 * u5;
      const eq1 = u.formatTerm(a1, 'u_2', true) + u.formatTerm(b1, 'u_4', false) + ' = ' + rhs1;
      const eq2 = u.formatTerm(a2, 'u_6', true) + u.formatTerm(b2, 'u_5', false) + ' = ' + rhs2;
      const ans = u1 + d;
      return {
        stem: 'Cho cấp số cộng $(u_n)$ thỏa mãn $' + eq1 + '$ và $' + eq2 + '$. Tính tổng $u_1 + d$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Biểu diễn theo $u_1, d$ ta được hệ $\\left\\{\\begin{array}{l} ' + u.formatTerm(a1 + b1, 'u_1', true) + u.formatTerm(a1 + 3 * b1, 'd', false) + ' = ' + rhs1 + ' \\\\ ' + u.formatTerm(a2 + b2, 'u_1', true) + u.formatTerm(5 * a2 + 4 * b2, 'd', false) + ' = ' + rhs2 + ' \\end{array}\\right.$.',
          'Giải hệ thu được $u_1 = ' + u1 + ',\\; d = ' + d + '$. Vậy $u_1 + d = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 13, d: 0, a1: 8, b1: -3, a2: 1, b2: -6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (8u2-3u4=57, u6-6u5=-217 -> 21)', params: { u1: 13, d: 8, a1: 8, b1: -3, a2: 1, b2: -6 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Hệ phương trình tuyến tính theo u_n -> tính tổng S_k
  t11_b6_d18_linear_sys_sum_sn_sa: {
    id: 't11_b6_d18_linear_sys_sum_sn_sa',
    name: 'Giải hệ phương trình CSC tính tổng S_k (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số cộng',
    description: 'Cho cấp số cộng thỏa mãn hệ hai phương trình tuyến tính theo các số hạng. Tính tổng S_k.',
    conditionSummary: 'u1 ∈ [-15; 20], d ∈ [-10; 15] \\ {0}, k ∈ [15; 35], định thức hệ ≠ 0',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -15, max: 20 },
      { name: 'd', label: 'Công sai d', min: -10, max: 15, allowZero: false },
      { name: 'a1', label: 'Hệ số a1 (âm)', min: -9, max: -2 },
      { name: 'b1', label: 'Hệ số b1 (âm)', min: -6, max: -1 },
      { name: 'a2', label: 'Hệ số a2', min: 2, max: 8 },
      { name: 'b2', label: 'Hệ số b2', min: 2, max: 8 },
      { name: 'k', label: 'Số số hạng tính tổng k', min: 15, max: 35 },
    ],
    validateCode: `
      const { u1, d, a1, b1, a2, b2, k } = params;
      if (d === 0 || d < -10 || d > 15 || u1 < -15 || u1 > 20 || k < 15 || k > 35) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (a1 < -9 || a1 > -2 || b1 < -6 || b1 > -1 || a2 < 2 || a2 > 8 || b2 < 2 || b2 > 8) {
        return { valid: false, reason: 'Hệ số ngoài miền' };
      }
      const det = (a1 + b1) * (2 * a2 + 3 * b2) - (a2 + b2) * (6 * a1 + 7 * b1);
      if (det === 0) return { valid: false, reason: 'Định thức hệ bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, a1, b1, a2, b2, k } = params;
      const u7 = u1 + 6 * d, u8 = u1 + 7 * d, u3 = u1 + 2 * d, u4 = u1 + 3 * d;
      const rhs1 = a1 * u7 + b1 * u8;
      const rhs2 = a2 * u3 + b2 * u4;
      const sk = (k * (2 * u1 + (k - 1) * d)) / 2;
      const eq1 = u.formatTerm(a1, 'u_7', true) + u.formatTerm(b1, 'u_8', false) + ' = ' + rhs1;
      const eq2 = u.formatTerm(a2, 'u_3', true) + u.formatTerm(b2, 'u_4', false) + ' = ' + rhs2;
      return {
        stem: 'Cho cấp số cộng $(u_n)$ thỏa mãn $' + eq1 + '$ và $' + eq2 + '$. Tính tổng $S_{' + k + '}$.',
        shortAnswer: String(sk),
        numericValue: sk,
        answerSummary: String(sk),
        solutionSteps: [
          'Đưa hệ về $u_1, d$: $\\left\\{\\begin{array}{l} ' + u.formatTerm(a1 + b1, 'u_1', true) + u.formatTerm(6 * a1 + 7 * b1, 'd', false) + ' = ' + rhs1 + ' \\\\ ' + u.formatTerm(a2 + b2, 'u_1', true) + u.formatTerm(2 * a2 + 3 * b2, 'd', false) + ' = ' + rhs2 + ' \\end{array}\\right. \\Rightarrow \\left\\{\\begin{array}{l} u_1 = ' + u1 + ' \\\\ d = ' + d + ' \\end{array}\\right.$.',
          'Tổng $S_{' + k + '} = \\frac{' + k + '}{2}\\left[2 \\cdot (' + u1 + ') + ' + (k - 1) + ' \\cdot (' + d + ')\\right] = ' + sk + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 14, d: 0, a1: -7, b1: -2, a2: 5, b2: 6, k: 26 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (-7u7-2u8=-798, 5u3+6u4=490 -> S26=4264)', params: { u1: 14, d: 12, a1: -7, b1: -2, a2: 5, b2: 6, k: 26 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Biết u_p, u_q tính tổng k số hạng đầu
  t11_b6_d19_sum_from_two_terms_sa: {
    id: 't11_b6_d19_sum_from_two_terms_sa',
    name: 'Tính tổng S_k của CSC khi biết hai số hạng u_p và u_q (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho hai số hạng u_p và u_q của cấp số cộng. Tính tổng k số hạng đầu tiên.',
    conditionSummary: 'u1 ∈ [-90; 30], d ∈ [-10; 12] \\ {0}, 3 ≤ p < q ≤ 18, k ∈ [15; 35]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -90, max: 30 },
      { name: 'd', label: 'Công sai d', min: -10, max: 12, allowZero: false },
      { name: 'p', label: 'Chỉ số p', min: 3, max: 8 },
      { name: 'q', label: 'Chỉ số q (> p)', min: 10, max: 18 },
      { name: 'k', label: 'Số số hạng k', min: 15, max: 35 },
    ],
    validateCode: `
      const { u1, d, p, q, k } = params;
      if (d === 0 || d < -10 || d > 12 || u1 < -90 || u1 > 30 || p < 3 || q > 18 || p >= q || k < 15 || k > 35) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, p, q, k } = params;
      const up = u1 + (p - 1) * d;
      const uq = u1 + (q - 1) * d;
      const sk = (k * (2 * u1 + (k - 1) * d)) / 2;
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_{' + p + '} = ' + up + ',\\; u_{' + q + '} = ' + uq + '$. Tính tổng của $' + k + '$ số hạng đầu tiên của cấp số cộng đã cho.',
        shortAnswer: String(sk),
        numericValue: sk,
        answerSummary: String(sk),
        solutionSteps: [
          'Giải hệ $\\left\\{\\begin{array}{l} u_1 + ' + (p - 1) + 'd = ' + up + ' \\\\ u_1 + ' + (q - 1) + 'd = ' + uq + ' \\end{array}\\right. \\Rightarrow \\left\\{\\begin{array}{l} u_1 = ' + u1 + ' \\\\ d = ' + d + ' \\end{array}\\right.$.',
          'Tổng $S_{' + k + '} = \\frac{' + k + '}{2}\\left[2 \\cdot (' + u1 + ') + ' + (k - 1) + ' \\cdot (' + d + ')\\right] = ' + sk + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: -81, d: 0, p: 6, q: 14, k: 25 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (u6=-41, u14=23 -> S25=375)', params: { u1: -81, d: 8, p: 6, q: 14, k: 25 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Biết S_n = A·n^2 + B·n tìm u_k
  t11_b6_d20_nth_from_quad_sn_sa: {
    id: 't11_b6_d20_nth_from_quad_sn_sa',
    name: 'Tìm số hạng u_k khi biết S_n = A·n² + B·n (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho tổng n số hạng đầu của cấp số cộng có dạng S_n = A·n² + B·n. Tìm số hạng u_k.',
    conditionSummary: 'A ∈ [-6; 8] \\ {0}, B ∈ [-25; 25], k ∈ [10; 30]',
    paramSpecs: [
      { name: 'A', label: 'Hệ số A của n²', min: -6, max: 8, allowZero: false },
      { name: 'B', label: 'Hệ số B của n', min: -25, max: 25 },
      { name: 'k', label: 'Chỉ số k', min: 10, max: 30 },
    ],
    validateCode: `
      const { A, B, k } = params;
      if (A === 0 || A < -6 || A > 8 || B < -25 || B > 25 || k < 10 || k > 30) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, B, k } = params;
      const u1 = A + B;
      const s2 = 4 * A + 2 * B;
      const u2 = s2 - u1;
      const d = 2 * A;
      const uk = u1 + (k - 1) * d;
      const snExpr = u.formatQuadratic(A, B, 0, 'n');
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có tổng $n$ số hạng đầu tiên là $S_n = ' + snExpr + '$. Tìm $u_{' + k + '}$.',
        shortAnswer: String(uk),
        numericValue: uk,
        answerSummary: String(uk),
        solutionSteps: [
          'Ta có $u_1 = S_1 = ' + u1 + '$ và $u_1 + u_2 = S_2 = ' + s2 + ' \\Rightarrow u_2 = ' + u2 + '$.',
          'Công sai $d = u_2 - u_1 = ' + d + '$, nên $u_{' + k + '} = ' + u1 + ' + ' + (k - 1) + ' \\cdot (' + d + ') = ' + uk + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 0', params: { A: 0, B: -19, k: 17 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (S_n = 5n^2 - 19n -> u17 = 146)', params: { A: 5, B: -19, k: 17 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Tính chất đối xứng u_{m-r} + u_{m+r} = 2u_m
  t11_b6_d21_symmetry_prop_sa: {
    id: 't11_b6_d21_symmetry_prop_sa',
    name: 'Vận dụng tính chất cách đều u_{m-r} + u_{m+r} = 2u_m (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Biết u_m + u_m = V. Tính giá trị biểu thức P = u_{m-r} + u_{m+r} + c.',
    conditionSummary: 'm ∈ [8; 20], r ∈ [2; 6], m - r ≥ 1, V ∈ [10; 50], c ∈ [-10; 15] \\ {0}',
    paramSpecs: [
      { name: 'm', label: 'Chỉ số giữa m', min: 8, max: 20 },
      { name: 'r', label: 'Độ lệch chỉ số r', min: 2, max: 6 },
      { name: 'V', label: 'Giá trị tổng u_m + u_m', min: 10, max: 50 },
      { name: 'c', label: 'Hằng số cộng thêm c', min: -10, max: 15, allowZero: false },
    ],
    validateCode: `
      const { m, r, V, c } = params;
      if (m < 8 || m > 20 || r < 2 || r > 6 || m - r < 1 || V < 10 || V > 50 || c === 0 || c < -10 || c > 15) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, r, V, c } = params;
      const ans = V + c;
      const exprP = 'u_{' + (m - r) + '} + u_{' + (m + r) + '}' + u.formatTrailingConst(c);
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_{' + m + '} + u_{' + m + '} = ' + V + '$. Tính giá trị biểu thức $P = ' + exprP + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $u_{' + (m - r) + '} + u_{' + (m + r) + '} = (u_{' + m + '} - ' + r + 'd) + (u_{' + m + '} + ' + r + 'd) = 2u_{' + m + '} = ' + V + '$.',
          'Suy ra $P = ' + V + u.formatTrailingConst(c) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { m: 11, r: 4, V: 19, c: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (u11+u11=19, P=u7+u15+2 -> 21)', params: { m: 11, r: 4, V: 19, c: 2 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Tính tổng đoạn liên tiếp u_p + ... + u_q = S_q - S_{p-1}
  t11_b6_d22_partial_sum_range_sa: {
    id: 't11_b6_d22_partial_sum_range_sa',
    name: 'Tính tổng các số hạng liên tiếp T = u_p + u_{p+1} + ... + u_q (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho u_1 và d. Tính tổng T = u_p + u_{p+1} + ... + u_q.',
    conditionSummary: 'u1 ∈ [-12; 15], d ∈ [-6; 9] \\ {0}, 5 ≤ p < q ≤ 35',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -12, max: 15 },
      { name: 'd', label: 'Công sai d', min: -6, max: 9, allowZero: false },
      { name: 'p', label: 'Chỉ số đầu p', min: 5, max: 12 },
      { name: 'q', label: 'Chỉ số cuối q', min: 18, max: 35 },
    ],
    validateCode: `
      const { u1, d, p, q } = params;
      if (d === 0 || d < -6 || d > 9 || u1 < -12 || u1 > 15 || p < 5 || p > 12 || q < 18 || q > 35) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, p, q } = params;
      const sq = (q * (2 * u1 + (q - 1) * d)) / 2;
      const spMinus1 = ((p - 1) * (2 * u1 + (p - 2) * d)) / 2;
      const ans = sq - spMinus1;
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$. Tính tổng $T = u_{' + p + '} + u_{' + (p + 1) + '} + \\ldots + u_{' + q + '}$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $S_{' + q + '} = ' + sq + '$ và $S_{' + (p - 1) + '} = ' + spMinus1 + '$.',
          'Do đó $T = S_{' + q + '} - S_{' + (p - 1) + '} = ' + sq + ' - (' + spMinus1 + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 7, d: 0, p: 8, q: 24 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (u1=7, d=1, u8+...+u24 -> 374)', params: { u1: 7, d: 1, p: 8, q: 24 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Tìm m để 3 biểu thức bậc nhất lập thành cấp số cộng
  t11_b6_d23_find_m_linear_3terms_sa: {
    id: 't11_b6_d23_find_m_linear_3terms_sa',
    name: 'Tìm tham số m để 3 biểu thức bậc nhất lập thành CSC (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tính chất cấp số cộng',
    description: 'Tìm m để a1·m + b1, a2·m + b2, a3·m + b3 theo thứ tự lập thành cấp số cộng (làm tròn hàng phần mười).',
    conditionSummary: 'a1, a2, a3 ∈ [-10; 10] \\ {0}, a1 + a3 - 2a2 ≠ 0, tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a1', label: 'Hệ số a1', min: -10, max: 10, allowZero: false },
      { name: 'b1', label: 'Hằng số b1', min: -12, max: 12 },
      { name: 'a2', label: 'Hệ số a2', min: -6, max: 6, allowZero: false },
      { name: 'b2', label: 'Hằng số b2', min: -10, max: 10 },
      { name: 'a3', label: 'Hệ số a3', min: -10, max: 10, allowZero: false },
      { name: 'b3', label: 'Hằng số b3', min: -12, max: 12 },
    ],
    validateCode: `
      const { a1, b1, a2, b2, a3, b3 } = params;
      if (a1 === 0 || a2 === 0 || a3 === 0) return { valid: false, reason: 'Hệ số của m phải khác 0' };
      const denom = a1 + a3 - 2 * a2;
      if (denom === 0) return { valid: false, reason: 'Mẫu số a1 + a3 - 2a2 bằng 0' };
      const num = 2 * b2 - b1 - b3;
      const mVal = num / denom;
      if (Math.abs((Math.abs(mVal) * 10) % 1 - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      // Avoid degenerate constant sequence where all 3 terms are identical
      const t1 = a1 * mVal + b1;
      const t2 = a2 * mVal + b2;
      if (Math.abs(t1 - t2) < 1e-6) return { valid: false, reason: 'Tránh 3 số hạng bằng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b1, a2, b2, a3, b3 } = params;
      ` + AP11_B6_SA_HELPERS + String.raw`
      const denom = a1 + a3 - 2 * a2;
      const num = 2 * b2 - b1 - b3;
      const mFrac = u.simplifyFrac(num, denom);
      const ansR = round1(mFrac.value);
      const shortAnswer = fmtDec1(ansR);
      const e1 = u.formatLinear(a1, b1, 'm');
      const e2 = u.formatLinear(a2, b2, 'm');
      const e3 = u.formatLinear(a3, b3, 'm');
      return {
        stem: 'Tìm giá trị của $m$ để dãy số $' + e1 + ',\\; ' + e2 + ',\\; ' + e3 + '$ theo thứ tự đó lập thành cấp số cộng (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ba số lập thành cấp số cộng khi và chỉ khi $(' + e1 + ') + (' + e3 + ') = 2(' + e2 + ')$.',
          '$\\Leftrightarrow ' + (a1 + a3 - 2 * a2) + 'm = ' + (2 * b2 - b1 - b3) + ' \\Leftrightarrow m = ' + mFrac.latex + (mFrac.isInteger ? '' : ' \\approx ' + shortAnswer) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a1 + a3 - 2a2 = 0', params: { a1: 2, b1: 1, a2: 3, b2: 4, a3: 4, b3: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (10-6m, 6-m, 10m-7 -> 1,5)', params: { a1: -6, b1: 10, a2: -1, b2: 6, a3: 10, b3: -7 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Tổng các giá trị m để a1·m^2, b2·m + c2, a3·m^2 lập thành cấp số cộng
  t11_b6_d24_sum_m_quad_3terms_sa: {
    id: 't11_b6_d24_sum_m_quad_3terms_sa',
    name: 'Tính tổng giá trị m để 3 biểu thức bậc hai/bậc nhất lập thành CSC (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tính chất cấp số cộng',
    description: 'Tìm tổng các giá trị thực của m để a1·m², b2·m + c2, a3·m² theo thứ tự lập thành cấp số cộng.',
    conditionSummary: 'a1, a3 < 0, b2, c2 < 0 (hoặc cùng dấu thỏa Δ > 0 có 2 nghiệm phân biệt), tránh .x5',
    paramSpecs: [
      { name: 'a1', label: 'Hệ số a1 của m²', min: -8, max: 8, allowZero: false },
      { name: 'b2', label: 'Hệ số b2 của m', min: -9, max: 9, allowZero: false },
      { name: 'c2', label: 'Hằng số c2', min: -9, max: 9, allowZero: false },
      { name: 'a3', label: 'Hệ số a3 của m²', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a1, b2, c2, a3 } = params;
      if (a1 === 0 || b2 === 0 || c2 === 0 || a3 === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      const A = a1 + a3;
      if (A === 0) return { valid: false, reason: 'Cần a1 + a3 ≠ 0 để thu được phương trình bậc hai' };
      const disc = b2 * b2 + 2 * A * c2;
      if (disc <= 0) return { valid: false, reason: 'Phương trình phải có 2 nghiệm thực phân biệt (Δ > 0)' };
      const sumM = (2 * b2) / A;
      if (Math.abs((Math.abs(sumM) * 10) % 1 - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b2, c2, a3 } = params;
      ` + AP11_B6_SA_HELPERS + String.raw`
      const A = a1 + a3;
      const B = -2 * b2;
      const C = -2 * c2;
      const sumFrac = u.simplifyFrac(2 * b2, A);
      const ansR = round1(sumFrac.value);
      const shortAnswer = fmtDec1(ansR);
      const e1 = u.formatTerm(a1, 'm^2', true);
      const e2 = u.formatLinear(b2, c2, 'm');
      const e3 = u.formatTerm(a3, 'm^2', true);
      return {
        stem: 'Tính tổng giá trị của $m$ để dãy số $' + e1 + ',\\; ' + e2 + ',\\; ' + e3 + '$ theo thứ tự đó lập thành cấp số cộng (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Điều kiện lập thành cấp số cộng: $' + e1 + (a3 >= 0 ? ' + ' + e3 : ' - ' + Math.abs(a3) + 'm^2') + ' = 2(' + e2 + ')$.',
          '$\\Leftrightarrow ' + u.formatQuadratic(A, B, C, 'm') + ' = 0$ (có $\\Delta\' = ' + (b2 * b2 + 2 * A * c2) + ' > 0$, nên có hai nghiệm thực phân biệt).',
          'Theo định lí Vi-ét, tổng các giá trị của $m$ là $m_1 + m_2 = ' + sumFrac.latex + (sumFrac.isInteger ? '' : ' \\approx ' + shortAnswer) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a1 + a3 = 0', params: { a1: -4, b2: -3, c2: -6, a3: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (-4m^2, -3m-6, -8m^2 -> 0,5)', params: { a1: -4, b2: -3, c2: -6, a3: -8 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Giá trị máy sau k năm sử dụng
  t11_b6_d25_depreciation_value_sa: {
    id: 't11_b6_d25_depreciation_value_sa',
    name: 'Tính giá trị còn lại của máy móc sau k năm khấu hao (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Giá máy ban đầu V0 giảm D triệu đồng mỗi năm. Tính giá trị còn lại sau k năm sử dụng.',
    conditionSummary: 'V0 ∈ [450; 950], D ∈ [20; 55], k ∈ [6; 15], V0 - k·D > 0',
    paramSpecs: [
      { name: 'V0', label: 'Giá trị ban đầu V0 (triệu)', min: 450, max: 950 },
      { name: 'D', label: 'Mức giảm mỗi năm D (triệu)', min: 20, max: 55 },
      { name: 'k', label: 'Số năm sử dụng k', min: 6, max: 15 },
    ],
    validateCode: `
      const { V0, D, k } = params;
      if (V0 < 450 || V0 > 950 || D < 20 || D > 55 || k < 6 || k > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      if (V0 - k * D <= 0) return { valid: false, reason: 'Giá trị còn lại phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { V0, D, k } = params;
      const ans = V0 - k * D;
      return {
        stem:
          'Giá của một cái máy phục vụ sản xuất lúc mới mua là $' +
          V0 +
          '$ triệu đồng. Cứ sau mỗi năm sử dụng, giá của chiếc máy đó giảm $' +
          D +
          '$ triệu đồng. Giá của chiếc máy sau $' +
          k +
          '$ năm sử dụng là bao nhiêu (kết quả sử dụng đơn vị triệu đồng và làm tròn đến số nguyên)?',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Giá trị máy qua các năm (kể từ lúc mới mua là $u_1 = ' + V0 + '$) lập thành cấp số cộng với công sai $d = -' + D + '$.',
          'Sau $' + k + '$ năm sử dụng, giá của chiếc máy là $u_{' + (k + 1) + '} = ' + V0 + ' + ' + k + ' \\cdot (-' + D + ') = ' + ans + '$ triệu đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên giá trị còn lại <= 0', params: { V0: 450, D: 50, k: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (V0=725, D=40, k=12 -> 245)', params: { V0: 725, D: 40, k: 12 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Trồng cây trong khuôn viên tam giác tìm số hàng
  t11_b6_d26_triangle_trees_rows_sa: {
    id: 't11_b6_d26_triangle_trees_rows_sa',
    name: 'Tìm số hàng cây trồng theo quy luật cấp số cộng (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Hàng thứ nhất có u_1 cây, mỗi hàng tiếp theo tăng thêm d cây, tổng cộng trồng S cây. Tìm số hàng cây.',
    conditionSummary: 'u1 ∈ [2; 10], d ∈ [1; 4], n ∈ [10; 35]',
    paramSpecs: [
      { name: 'u1', label: 'Số cây hàng đầu u1', min: 2, max: 10 },
      { name: 'd', label: 'Số cây tăng mỗi hàng d', min: 1, max: 4 },
      { name: 'n', label: 'Số hàng cây n', min: 10, max: 35 },
    ],
    validateCode: `
      const { u1, d, n } = params;
      if (u1 < 2 || u1 > 10 || d < 1 || d > 4 || n < 10 || n > 35) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, n } = params;
      const total = (n * (2 * u1 + (n - 1) * d)) / 2;
      return {
        stem:
          'Người ta trồng $' +
          total +
          '$ cái cây vào khuôn viên của một công viên hình tam giác với quy luật như sau: hàng thứ nhất có $' +
          u1 +
          '$ cây, hàng thứ hai có $' +
          (u1 + d) +
          '$ cây, hàng thứ ba có $' +
          (u1 + 2 * d) +
          '$ cây, ... Tính số hàng cây được trồng.',
        shortAnswer: String(n),
        numericValue: n,
        answerSummary: String(n),
        solutionSteps: [
          'Số cây ở mỗi hàng lập thành cấp số cộng với $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$.',
          'Tổng số cây là $S_n = \\frac{n}{2}\\left[2 \\cdot ' + u1 + ' + (n - 1) \\cdot ' + d + '\\right] = ' + total + ' \\Rightarrow n = ' + n + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 4, d: 0, n: 22 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (u1=4, d=1, n=22 -> S=319)', params: { u1: 4, d: 1, n: 22 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Xếp cột điện thành n lớp giảm dần -> tổng số cột
  t11_b6_d27_stacked_poles_sum_sa: {
    id: 't11_b6_d27_stacked_poles_sum_sa',
    name: 'Tính tổng số cột điện xếp chồng giảm đều qua n lớp (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Lớp dưới cùng có u_1 cột, mỗi lớp trên giảm d cột, tổng cộng có n lớp. Tính tổng số cột điện.',
    conditionSummary: 'n ∈ [6; 18], dAbs ∈ [1; 3], uTop ∈ [2; 12]',
    paramSpecs: [
      { name: 'n', label: 'Tổng số lớp n', min: 6, max: 18 },
      { name: 'dAbs', label: 'Số cột giảm mỗi lớp', min: 1, max: 3 },
      { name: 'uTop', label: 'Số cột lớp trên cùng', min: 2, max: 12 },
    ],
    validateCode: `
      const { n, dAbs, uTop } = params;
      if (n < 6 || n > 18 || dAbs < 1 || dAbs > 3 || uTop < 2 || uTop > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, dAbs, uTop } = params;
      const u1 = uTop + (n - 1) * dAbs;
      const total = (n * (u1 + uTop)) / 2;
      return {
        stem:
          'Người ta xếp các cột điện cao thế nằm chồng lên nhau trong sân theo quy luật như sau: lớp đầu tiên có $' +
          u1 +
          '$ cột, lớp thứ hai có $' +
          (u1 - dAbs) +
          '$ cột, lớp thứ ba có $' +
          (u1 - 2 * dAbs) +
          '$ cột, và cứ tiếp tục giảm dần. Nếu có tổng cộng $' +
          n +
          '$ lớp thì có tất cả bao nhiêu cột điện đã được xếp?',
        shortAnswer: String(total),
        numericValue: total,
        answerSummary: String(total),
        solutionSteps: [
          'Số cột điện ở mỗi lớp lập thành cấp số cộng với $u_1 = ' + u1 + '$ và công sai $d = -' + dAbs + '$.',
          'Tổng số cột điện là $S_{' + n + '} = \\frac{' + n + '}{2}\\left[2 \\cdot ' + u1 + ' + ' + (n - 1) + ' \\cdot (-' + dAbs + ')\\right] = ' + total + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên uTop = 0', params: { n: 10, dAbs: 2, uTop: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (u1=24, d=-2, n=10 -> 150)', params: { n: 10, dAbs: 2, uTop: 6 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Quyên góp tiền theo chu kì ngày tính bằng triệu đồng
  t11_b6_d28_charity_piggybank_sa: {
    id: 't11_b6_d28_charity_piggybank_sa',
    name: 'Tính tổng tiền quyên góp theo chu kì ngày (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Mỗi học sinh bỏ a ngàn lần đầu, cứ m ngày một lần bỏ nhiều hơn lần trước b ngàn. Tính tổng tiền cả lớp sau m·k ngày (triệu đồng, làm tròn hàng phần trăm).',
    conditionSummary: 'a ∈ [2; 8], b ∈ [1; 5], m ∈ [2; 5], k ∈ [6; 12], students ∈ [28; 45], tránh ranh giới .xx5',
    paramSpecs: [
      { name: 'a', label: 'Số ngàn đầu mỗi HS', min: 2, max: 8 },
      { name: 'b', label: 'Số ngàn tăng thêm mỗi lần', min: 1, max: 5 },
      { name: 'm', label: 'Chu kì ngày m', min: 2, max: 5 },
      { name: 'k', label: 'Số lần quyên góp k', min: 6, max: 12 },
      { name: 'students', label: 'Sĩ số lớp', min: 28, max: 45 },
    ],
    validateCode: `
      const { a, b, m, k, students } = params;
      if (a < 2 || a > 8 || b < 1 || b > 5 || m < 2 || m > 5 || k < 6 || k > 12 || students < 28 || students > 45) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const u1 = students * a;
      const d = students * b;
      const totalK = (k * (2 * u1 + (k - 1) * d)) / 2;
      if (totalK % 10 === 5) return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, m, k, students } = params;
      ` + AP11_B6_SA_HELPERS + String.raw`
      const u1 = students * a;
      const d = students * b;
      const totalK = (k * (2 * u1 + (k - 1) * d)) / 2;
      const totalMil = totalK / 1000;
      const ansR = round2(totalMil);
      const shortAnswer = fmtDec2(ansR);
      const totalDays = m * k;
      return {
        stem:
          'Hưởng ứng lời kêu gọi của Đoàn trường, lớp 10A1 dự kiến quyên góp tiền để đi làm từ thiện như sau: lần đầu mỗi bạn bỏ $' +
          a +
          '$ (ngàn đồng) vào lợn đất, các lần sau cứ $' +
          m +
          '$ ngày một lần mỗi bạn bỏ vào lợn hơn lần trước là $' +
          b +
          '$ (ngàn đồng). Hỏi sau $' +
          totalDays +
          '$ ngày thì lớp 10A1 quyên góp được bao nhiêu tiền (triệu đồng, làm tròn đến hàng phần trăm), biết lớp có $' +
          students +
          '$ học sinh?',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Lần đầu cả lớp góp $u_1 = ' + students + ' \\cdot ' + a + ' = ' + u1 + '$ (ngàn đồng), mỗi lần sau tăng $d = ' + students + ' \\cdot ' + b + ' = ' + d + '$ (ngàn đồng).',
          'Sau $' + totalDays + '$ ngày ứng với $' + k + '$ lần quyên góp, tổng số tiền là $S_{' + k + '} = \\frac{' + k + '}{2}\\left[2 \\cdot ' + u1 + ' + ' + (k - 1) + ' \\cdot ' + d + '\\right] = ' + totalK + '$ ngàn đồng $\\approx ' + shortAnswer + '$ triệu đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ranh giới .xx5 (3465 ngàn -> 3,465 triệu)', params: { a: 3, b: 2, m: 3, k: 9, students: 35 }, expectedValid: false },
      { label: 'Mẫu chuẩn gần Q28 (36 HS -> 3,56 triệu)', params: { a: 3, b: 2, m: 3, k: 9, students: 36 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Xếp hộp quà thành tháp -> tìm số tầng
  t11_b6_d29_gift_pyramid_layers_sa: {
    id: 't11_b6_d29_gift_pyramid_layers_sa',
    name: 'Tìm số tầng tháp hộp quà xếp giảm dần đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Xếp S hộp quà thành tháp, tầng dưới cùng có u_1 hộp, mỗi tầng trên giảm d hộp. Tính số tầng.',
    conditionSummary: 'n ∈ [8; 22], dAbs ∈ [1; 2], uTop ∈ [2; 18]',
    paramSpecs: [
      { name: 'n', label: 'Số tầng đáp án n', min: 8, max: 22 },
      { name: 'dAbs', label: 'Số hộp giảm mỗi tầng', min: 1, max: 2 },
      { name: 'uTop', label: 'Số hộp tầng trên cùng', min: 2, max: 18 },
    ],
    validateCode: `
      const { n, dAbs, uTop } = params;
      if (n < 8 || n > 22 || (dAbs !== 1 && dAbs !== 2) || uTop < 2 || uTop > 18) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, dAbs, uTop } = params;
      const u1 = uTop + (n - 1) * dAbs;
      const total = (n * (u1 + uTop)) / 2;
      return {
        stem:
          'Người ta xếp $' +
          total +
          '$ hộp quà thành dạng hình tháp theo quy luật như sau: tầng dưới cùng có $' +
          u1 +
          '$ hộp, tầng thứ hai có $' +
          (u1 - dAbs) +
          '$ hộp, tầng thứ ba có $' +
          (u1 - 2 * dAbs) +
          '$ hộp, và cứ tiếp tục giảm dần. Tính số tầng đã xếp.',
        shortAnswer: String(n),
        numericValue: n,
        answerSummary: String(n),
        solutionSteps: [
          'Số hộp ở mỗi tầng lập thành cấp số cộng với $u_1 = ' + u1 + '$ và công sai $d = -' + dAbs + '$.',
          'Giải phương trình $S_n = \\frac{n}{2}\\left[2 \\cdot ' + u1 + ' + (n - 1)(-' + dAbs + ')\\right] = ' + total + '$ (với $u_n \\ge 1$) thu được $n = ' + n + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dAbs = 0', params: { n: 14, dAbs: 0, uTop: 12 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (259 hộp, u1=25, d=-1 -> 14 tầng)', params: { n: 14, dAbs: 1, uTop: 12 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Thiết kế rạp hát tìm số hàng ghế
  t11_b6_d30_theater_seats_rows_sa: {
    id: 't11_b6_d30_theater_seats_rows_sa',
    name: 'Tìm số hàng ghế rạp hát biết tổng sức chứa (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Hàng ghế đầu có u_1 chỗ, mỗi hàng sau tăng d chỗ, tổng sức chứa S chỗ. Tìm số hàng ghế.',
    conditionSummary: 'u1 ∈ [8; 20], d ∈ [2; 8], n ∈ [12; 35]',
    paramSpecs: [
      { name: 'u1', label: 'Số chỗ hàng đầu u1', min: 8, max: 20 },
      { name: 'd', label: 'Số chỗ tăng mỗi hàng d', min: 2, max: 8 },
      { name: 'n', label: 'Số hàng ghế đáp án n', min: 12, max: 35 },
    ],
    validateCode: `
      const { u1, d, n } = params;
      if (u1 < 8 || u1 > 20 || d < 2 || d > 8 || n < 12 || n > 35) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, n } = params;
      const total = (n * (2 * u1 + (n - 1) * d)) / 2;
      return {
        stem:
          'Một kiến trúc sư thiết kế một rạp hát với $' +
          u1 +
          '$ chỗ ngồi trong hàng đầu tiên, $' +
          (u1 + d) +
          '$ chỗ ngồi trong hàng thứ hai, $' +
          (u1 + 2 * d) +
          '$ chỗ ngồi trong hàng thứ ba, và cứ thế tiếp tục. Nếu muốn rạp hát có sức chứa $' +
          total +
          '$ chỗ ngồi thì kiến trúc sư phải thiết kế bao nhiêu hàng ghế?',
        shortAnswer: String(n),
        numericValue: n,
        answerSummary: String(n),
        solutionSteps: [
          'Số chỗ ngồi mỗi hàng lập thành cấp số cộng với $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$.',
          'Giải $S_n = \\frac{n}{2}\\left[2 \\cdot ' + u1 + ' + (n - 1) \\cdot ' + d + '\\right] = ' + total + '$ thu được $n = ' + n + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 10, d: 0, n: 24 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (u1=10, d=5, n=24 -> 1620 chỗ)', params: { u1: 10, d: 5, n: 24 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Tam giác vuông có 3 cạnh lập thành cấp số cộng
  t11_b6_d31_right_triangle_ap_sa: {
    id: 't11_b6_d31_right_triangle_ap_sa',
    name: 'Tính cạnh huyền tam giác vuông có 3 cạnh lập thành CSC (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng cấp số cộng trong Hình học',
    description: 'Cho tam giác vuông có chu vi P = 12d và độ dài các cạnh lập thành cấp số cộng. Tính cạnh huyền.',
    conditionSummary: 'd ∈ [3; 25] (chu vi P = 12d, cạnh huyền = 5d)',
    paramSpecs: [
      { name: 'd', label: 'Công sai d của 3 cạnh', min: 3, max: 25 },
    ],
    validateCode: `
      const { d } = params;
      if (d < 3 || d > 25) return { valid: false, reason: 'd thuộc [3; 25]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d } = params;
      const perim = 12 * d;
      const a = 4 * d;
      const c1 = 3 * d;
      const hyp = 5 * d;
      return {
        stem: 'Một mảnh vườn hình tam giác vuông có chu vi bằng $' + perim + '$ và độ dài các cạnh lập thành cấp số cộng. Tính độ dài cạnh huyền của tam giác đó.',
        shortAnswer: String(hyp),
        numericValue: hyp,
        answerSummary: String(hyp),
        solutionSteps: [
          'Gọi ba cạnh của tam giác vuông theo thứ tự tăng dần là $a - d$, $a$, $a + d$ ($d > 0$).',
          'Chu vi bằng $' + perim + ' \\Rightarrow (a - d) + a + (a + d) = 3a = ' + perim + ' \\Rightarrow a = ' + a + '$.',
          'Theo định lí Pythagore: $(' + a + ' - d)^2 + ' + a + '^2 = (' + a + ' + d)^2 \\Rightarrow d = ' + d + '$.',
          'Ba cạnh có độ dài $' + c1 + ',\\; ' + a + ',\\; ' + hyp + '$, vậy cạnh huyền dài $' + hyp + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { d: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (P=108 -> cạnh huyền 45)', params: { d: 9 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Tổng chi phí hoạt động theo quý sau N năm
  t11_b6_d32_company_quarterly_cost_sa: {
    id: 't11_b6_d32_company_quarterly_cost_sa',
    name: 'Tính tổng chi phí theo quý tăng đều sau N năm (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Quý đầu chi u_1 triệu, mỗi quý sau tăng d triệu. Tính tổng chi phí sau N năm (làm tròn hàng đơn vị).',
    conditionSummary: 'u1 ∈ [12; 40], d10 ∈ [12; 45], years ∈ [3; 8], tránh ranh giới .5',
    paramSpecs: [
      { name: 'u1', label: 'Chi phí quý đầu u1 (triệu)', min: 12, max: 40 },
      { name: 'd10', label: 'Mức tăng 10·d (phần mười triệu)', min: 12, max: 45 },
      { name: 'years', label: 'Số năm hoạt động', min: 3, max: 8 },
    ],
    validateCode: `
      const { u1, d10, years } = params;
      if (u1 < 12 || u1 > 40 || d10 < 12 || d10 > 45 || years < 3 || years > 8) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const n = 4 * years;
      const total = 2 * years * (2 * u1) + (2 * years * (n - 1) * d10) / 10;
      if (Math.abs((total % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d10, years } = params;
      ` + AP11_B6_SA_HELPERS + String.raw`
      const n = 4 * years;
      const d = d10 / 10;
      const total = 2 * years * (2 * u1 + (n - 1) * d);
      const ans = Math.round(total);
      const dStr = fmtDec1(d);
      return {
        stem:
          'Một công ty dự kiến số tiền duy trì hoạt động như sau: Quý làm việc đầu tiên là $' +
          u1 +
          '$ triệu/quý. Từ quý thứ hai thì quý sau tăng thêm $' +
          dStr +
          '$ triệu so với quý trước. Tính tổng tiền (triệu đồng) phải chi trả sau $' +
          years +
          '$ năm hoạt động của công ty (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Số tiền chi trả các quý lập thành cấp số cộng với $u_1 = ' + u1 + '$ và $d = ' + dStr + '$.',
          '$' + years + '$ năm tương ứng với $' + n + '$ quý. Tổng chi phí là $S_{' + n + '} = ' + (n / 2) + '\\left(2 \\cdot ' + u1 + ' + ' + (n - 1) + ' \\cdot ' + dStr + '\\right) = ' + fmtDec1(total) + ' \\approx ' + ans + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên years = 0', params: { u1: 21, d10: 22, years: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (u1=21, d=2,2, 5 năm -> 838)', params: { u1: 21, d10: 22, years: 5 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Bài toán tổng thứ tự lượt nhảy dây S_n = n(n^2 + 1)/2
  t11_b6_d33_jump_rope_blocks_sa: {
    id: 't11_b6_d33_jump_rope_blocks_sa',
    name: 'Tính tỉ số tổng số thứ tự lượt nhảy dây ngày thứ n (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng cấp số cộng',
    description: 'Ngày thứ k tập k lượt nhảy đánh số liên tiếp từ 1. Tính S_n / div (làm tròn hàng đơn vị).',
    conditionSummary: 'n ∈ [20; 50], div ∈ [200; 900], tránh ranh giới làm tròn .5',
    paramSpecs: [
      { name: 'n', label: 'Ngày thứ n', min: 20, max: 50 },
      { name: 'div', label: 'Số chia div', min: 200, max: 900 },
    ],
    validateCode: `
      const { n, div } = params;
      if (n < 20 || n > 50 || div < 200 || div > 900) return { valid: false, reason: 'Tham số ngoài miền' };
      const sn = (n * (n * n + 1)) / 2;
      const ratio = sn / div;
      if (Math.abs((ratio % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, div } = params;
      ` + AP11_B6_SA_HELPERS + String.raw`
      const sn = (n * (n * n + 1)) / 2;
      const ratio = sn / div;
      const ans = Math.round(ratio);
      return {
        stem:
          'Một vận động viên nhảy dây đặt mục tiêu tập tăng dần theo ngày. Ngày thứ $1$, vận động viên tập $1$ lần nhảy. Ngày thứ $2$, vận động viên tập $2$ lần nhảy. Ngày thứ $3$, vận động viên tập $3$ lần nhảy, ... và cứ mỗi ngày, số lượt nhảy tăng thêm $1$ so với ngày trước đó. Mỗi lượt nhảy được đánh số thứ tự liên tiếp từ $1$ trở đi. Gọi $S_n$ là tổng các số thứ tự của các lượt nhảy trong ngày thứ $n$. Tính $\\frac{S_{' +
          n +
          '}}{' +
          div +
          '}$ (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Nhóm số thứ tự ngày thứ $n$ có $n$ số tự nhiên liên tiếp kết thúc tại $\\frac{n(n+1)}{2}$.',
          'Khi đó $S_n = \\frac{n}{2}\\left[2 \\cdot \\frac{n(n+1)}{2} - (n - 1)\\right] = \\frac{1}{2}n(n^2 + 1)$, suy ra $S_{' + n + '} = ' + sn + '$.',
          'Vậy $\\frac{S_{' + n + '}}{' + div + '} \\approx ' + fmtDec2(ratio) + ' \\approx ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên div = 0', params: { n: 40, div: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (n=40, div=713 -> 45)', params: { n: 40, div: 713 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Xếp chậu cây trên khu đất hình chữ nhật
  t11_b6_d34_rect_flower_pots_sa: {
    id: 't11_b6_d34_rect_flower_pots_sa',
    name: 'Tính tổng số chậu cây xếp thành hàng cách đều 1 m trên khu đất HCN (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Khu đất HCN diện tích S, chiều dài L, các hàng song song chiều dài cách nhau 1 m, hàng đầu u_1 chậu, mỗi hàng sau tăng d chậu.',
    conditionSummary: 'L ∈ [25; 70], W ∈ [18; 45], u1 ∈ [2; 8], d ∈ [2; 6]',
    paramSpecs: [
      { name: 'L', label: 'Chiều dài L (m)', min: 25, max: 70 },
      { name: 'W', label: 'Chiều rộng W (m)', min: 18, max: 45 },
      { name: 'u1', label: 'Số chậu hàng đầu u1', min: 2, max: 8 },
      { name: 'd', label: 'Số chậu tăng mỗi hàng d', min: 2, max: 6 },
    ],
    validateCode: `
      const { L, W, u1, d } = params;
      if (L < 25 || L > 70 || W < 18 || W > 45 || L <= W || u1 < 2 || u1 > 8 || d < 2 || d > 6) {
        return { valid: false, reason: 'Cần L > W và tham số trong miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L, W, u1, d } = params;
      const area = L * W;
      const n = W + 1;
      const total = (n * (2 * u1 + (n - 1) * d)) / 2;
      return {
        stem:
          'Ông An xếp các chậu cây trên một khu đất hình chữ nhật $ABCD$ có diện tích $' +
          area +
          '$ mét vuông theo quy tắc như sau: Ông An đánh dấu các đường thẳng song song với chiều dài của khu đất, sao cho các đường này có hai đầu mút nằm trên hai cạnh chiều rộng và cách nhau $1\\,\\mathrm{m}$. Bắt đầu từ cạnh $AB$ ông xếp hàng đầu tiên với $' +
          u1 +
          '$ chậu cây. Ở hàng thứ hai (cách hàng đầu tiên $1\\,\\mathrm{m}$) ông xếp nhiều hơn hàng trước $' +
          d +
          '$ chậu cây. Cứ như vậy, mỗi hàng tiếp theo được xếp nhiều hơn hàng liền trước $' +
          d +
          '$ chậu cây. Hàng cuối cùng được xếp nằm trên cạnh $CD$. Hỏi ông An đã xếp được tất cả bao nhiêu chậu cây trên khu đất đó biết rằng chiều dài của khu đất là $' +
          L +
          '\\,\\mathrm{m}$?',
        shortAnswer: String(total),
        numericValue: total,
        answerSummary: String(total),
        solutionSteps: [
          'Chiều rộng khu đất là $' + area + ' : ' + L + ' = ' + W + '\\,\\mathrm{m}$, suy ra số hàng xếp chậu cây là $n = ' + W + ' + 1 = ' + n + '$.',
          'Số chậu mỗi hàng lập thành cấp số cộng có $u_1 = ' + u1 + '$ và $d = ' + d + '$.',
          'Tổng số chậu cây là $S_{' + n + '} = \\frac{' + n + '}{2}\\left(2 \\cdot ' + u1 + ' + ' + (n - 1) + ' \\cdot ' + d + '\\right) = ' + total + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều dài <= chiều rộng', params: { L: 30, W: 36, u1: 2, d: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (S=1836, L=51, u1=2, d=4 -> 2738)', params: { L: 51, W: 36, u1: 2, d: 4 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Ốp gạch hình thang giảm 1 viên mỗi hàng
  t11_b6_d35_trapezoid_tiles_sa: {
    id: 't11_b6_d35_trapezoid_tiles_sa',
    name: 'Tính số viên gạch vuông ốp bức tường hình thang (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Bức tường hình thang đáy lớn b1 m, đáy bé b2 m, lát gạch vuông 10 cm x 10 cm giảm 1 viên mỗi hàng trên. Tính tổng số viên gạch.',
    conditionSummary: 'u1 ∈ [14; 30] (viên), uTop ∈ [5; 12] (viên), u1 - uTop ≥ 4',
    paramSpecs: [
      { name: 'u1', label: 'Số viên đáy lớn (×10 cm)', min: 14, max: 30 },
      { name: 'uTop', label: 'Số viên đáy bé (×10 cm)', min: 5, max: 12 },
    ],
    validateCode: `
      const { u1, uTop } = params;
      if (u1 < 14 || u1 > 30 || uTop < 5 || uTop > 12 || u1 - uTop < 4) {
        return { valid: false, reason: 'Tham số ngoài miền (u1 >= uTop + 4)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, uTop } = params;
      ` + AP11_B6_SA_HELPERS + String.raw`
      const n = u1 - uTop + 1;
      const total = (n * (u1 + uTop)) / 2;
      const lenBigM = (u1 / 10).toFixed(1).replace('.', ',');
      const lenSmallM = (uTop / 10).toFixed(1).replace('.', ',');
      return {
        stem:
          'Một bức tường trang trí có dạng hình thang, rộng $' +
          lenBigM +
          '\\,\\mathrm{m}$ ở đáy lớn và rộng $' +
          lenSmallM +
          '\\,\\mathrm{m}$ ở đáy bé. Các viên gạch hình vuông có kích thước $10\\,\\mathrm{cm} \\times 10\\,\\mathrm{cm}$ phải được đặt sao cho mỗi hàng ở phía trên chứa ít hơn $1$ viên so với hàng ở ngay phía dưới nó. Hỏi sẽ cần bao nhiêu viên gạch hình vuông như vậy để ốp hết bức tường đó?',
        shortAnswer: String(total),
        numericValue: total,
        answerSummary: String(total),
        solutionSteps: [
          'Đổi đơn vị: $' + lenBigM + '\\,\\mathrm{m} = ' + (u1 * 10) + '\\,\\mathrm{cm}$, $' + lenSmallM + '\\,\\mathrm{m} = ' + (uTop * 10) + '\\,\\mathrm{cm}$.',
          'Số viên gạch hàng dưới cùng là $u_1 = ' + u1 + '$, hàng trên cùng là $u_n = ' + uTop + '$, công sai $d = -1$.',
          'Số hàng gạch: $n = ' + u1 + ' - ' + uTop + ' + 1 = ' + n + '$. Tổng số viên gạch: $S_{' + n + '} = \\frac{' + n + '(' + u1 + ' + ' + uTop + ')}{2} = ' + total + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên đáy lớn gần đáy bé', params: { u1: 14, uTop: 12 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 (2,0 m & 0,7 m -> 189 viên)', params: { u1: 20, uTop: 7 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Giải hệ tìm CSC rồi tính tổng các chỉ số chẵn u_s + u_{s+2} + ... + u_e
  t11_b6_d36_sys_even_indices_sum_sa: {
    id: 't11_b6_d36_sys_even_indices_sum_sa',
    name: 'Giải hệ tìm CSC và tính tổng các số hạng chỉ số cách đều u_s + u_{s+2} + ... + u_e (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số cộng',
    description: 'Cho cấp số cộng thỏa mãn u_1 - u_3 + u_6 = A và u_4 + u_5 = B. Tính tổng các số hạng chỉ số chẵn từ u_s đến u_e.',
    conditionSummary: 'u1 ∈ [-6; 10], d ∈ [1; 6], startIdx ∈ {2, 4, 6}, count ∈ [25; 50]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -6, max: 10 },
      { name: 'd', label: 'Công sai d', min: 1, max: 6 },
      { name: 'startIdx', label: 'Chỉ số chẵn bắt đầu', min: 2, max: 6, step: 2 },
      { name: 'count', label: 'Số số hạng trong tổng', min: 25, max: 50 },
    ],
    validateCode: `
      const { u1, d, startIdx, count } = params;
      if (u1 < -6 || u1 > 10 || d < 1 || d > 6 || ![2, 4, 6].includes(startIdx) || count < 25 || count > 50) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, startIdx, count } = params;
      const rhs1 = u1 + 3 * d;
      const rhs2 = 2 * u1 + 7 * d;
      const endIdx = startIdx + 2 * (count - 1);
      const uStart = u1 + (startIdx - 1) * d;
      const uEnd = u1 + (endIdx - 1) * d;
      const ans = (count * (uStart + uEnd)) / 2;
      return {
        stem:
          'Cho cấp số cộng $(u_n)$ thỏa mãn $\\left\\{\\begin{array}{l} u_1 - u_3 + u_6 = ' +
          rhs1 +
          ' \\\\ u_4 + u_5 = ' +
          rhs2 +
          ' \\end{array}\\right.$. Tổng $S = u_{' +
          startIdx +
          '} + u_{' +
          (startIdx + 2) +
          '} + \\ldots + u_{' +
          (endIdx - 2) +
          '} + u_{' +
          endIdx +
          '}$ bằng',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Hệ phương trình tương đương $\\left\\{\\begin{array}{l} u_1 + 3d = ' + rhs1 + ' \\\\ 2u_1 + 7d = ' + rhs2 + ' \\end{array}\\right. \\Leftrightarrow \\left\\{\\begin{array}{l} u_1 = ' + u1 + ' \\\\ d = ' + d + ' \\end{array}\\right.$.',
          'Dãy $u_{' + startIdx + '}, u_{' + (startIdx + 2) + '}, \\ldots, u_{' + endIdx + '}$ là cấp số cộng có $' + count + '$ số hạng, số hạng đầu $u_{' + startIdx + '} = ' + uStart + '$, số hạng cuối $u_{' + endIdx + '} = ' + uEnd + '$.',
          'Vậy $S = \\frac{' + count + '}{2}(' + uStart + ' + ' + uEnd + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 3, d: 0, startIdx: 4, count: 41 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (u1=3, d=2, u4+...+u84 -> 3649)', params: { u1: 3, d: 2, startIdx: 4, count: 41 }, expectedValid: true },
    ],
  },
};
