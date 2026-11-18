import { MathTemplate } from '../types/math';

export const G11_B21_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D44 (Q44): b^{-ax^2 + px + q} = b^{rx + s}, tính c0*x1 + c0*x2
  t11_b21_d44_sa_exp_quad_vieta: {
    id: 't11_b21_d44_sa_exp_quad_vieta',
    name: 'Tổng tổ hợp nghiệm phương trình mũ bậc hai (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Cho b^{-ax² + px + q} = b^{rx + s} có hai nghiệm x1 < x2. Tính c0·x1 + c0·x2.',
    conditionSummary: 'b ∈ [2;5], a ∈ [2;5], p ∈ [3;7], r ∈ [1; p-1], q ∈ [1;3], s ∈ [-2;0], c0 ∈ [-5;-2] ∪ [2;5]',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b', min: 2, max: 5 },
      { name: 'a', label: 'Hệ số a của -ax²', min: 2, max: 5 },
      { name: 'p', label: 'Hệ số p của px', min: 3, max: 7 },
      { name: 'q', label: 'Hằng số q', min: 1, max: 3 },
      { name: 'r', label: 'Hệ số r của rx', min: 1, max: 6 },
      { name: 's', label: 'Hằng số s', min: -2, max: 0 },
      { name: 'c0', label: 'Hệ số c0 nhân vào (x1 + x2)', min: -5, max: 5 },
    ],
    validateCode: `
      const { b, a, p, q, r, s, c0 } = params;
      if (b < 2 || b > 5 || a < 2 || a > 5 || p < 3 || p > 7 || q < 1 || q > 3 || r < 1 || r >= p || s < -2 || s > 0) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (c0 === 0 || c0 === 1 || c0 === -1) return { valid: false, reason: 'Cần |c0| >= 2' };
      const delta = (p - r) * (p - r) + 4 * a * (q - s);
      if (delta <= 0) return { valid: false, reason: 'Phương trình không có 2 nghiệm phân biệt' };
      const val = (c0 * (p - r)) / a;
      const frac = Math.abs(val * 10 - Math.floor(val * 10) - 0.5);
      if (frac < 0.02) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, a, p, q, r, s, c0 } = params;
      const lhsExp = u.formatQuadratic(-a, p, q);
      const rhsExp = u.formatLinear(r, s);
      const diffQuad = u.formatQuadratic(-a, p - r, q - s);
      const sumFrac = u.simplifyFrac(p - r, a);
      const val = (c0 * (p - r)) / a;
      const rounded1 = Math.round(val * 10) / 10;
      const shortAnswer = Number.isInteger(rounded1)
        ? String(rounded1)
        : rounded1.toFixed(1).replace('.', ',');
      const exprTex = c0 + 'x_1 ' + (c0 > 0 ? '+ ' + c0 : '- ' + Math.abs(c0)) + 'x_2';

      return {
        stem: 'Gọi $x_1, x_2\\;(x_1 < x_2)$ là các nghiệm của phương trình $' + b + '^{' + lhsExp + '} = ' + b + '^{' + rhsExp + '}$. Tính $' + exprTex + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded1,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Phương trình đã cho tương đương với $' + lhsExp + ' = ' + rhsExp + ' \\Leftrightarrow ' + diffQuad + ' = 0$.',
          'Vì $\\Delta = ' + ((p - r) * (p - r) + 4 * a * (q - s)) + ' > 0$ nên phương trình có hai nghiệm $x_1 < x_2$ thỏa $x_1 + x_2 = ' + sumFrac.latex + '$.',
          'Suy ra $' + exprTex + ' = ' + c0 + '(x_1 + x_2) = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c0 = 0', params: { b: 4, a: 4, p: 5, q: 1, r: 1, s: -1, c0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44 (-3)', params: { b: 4, a: 4, p: 5, q: 1, r: 1, s: -1, c0: -3 }, expectedValid: true },
    ],
  },

  // D45 (Q45): \sqrt[n]{b^{px}} - b^K = 0, tính x_0 / D
  t11_b21_d45_sa_exp_radical_ratio: {
    id: 't11_b21_d45_sa_exp_radical_ratio',
    name: 'Phương trình mũ chứa căn bậc n và tỉ số x₀/D (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải ⁿ√(b^{px}) - b^K = 0 và tính giá trị x₀ / D làm tròn đến hàng phần mười.',
    conditionSummary: 'n ∈ [3;6], b ∈ [2;7], p ∈ [3;7], gcd(n,p)=1, K ∈ [1500; 3200], D ∈ [350; 650], tránh mốc .x5',
    paramSpecs: [
      { name: 'n', label: 'Bậc căn n', min: 3, max: 6 },
      { name: 'b', label: 'Cơ số b', min: 2, max: 7 },
      { name: 'p', label: 'Hệ số p của px', min: 3, max: 7 },
      { name: 'K', label: 'Số mũ lớn K', min: 1500, max: 3200 },
      { name: 'D', label: 'Mẫu số D', min: 350, max: 650 },
    ],
    validateCode: `
      const { n, b, p, K, D } = params;
      if (n < 3 || n > 6 || b < 2 || b > 7 || p < 3 || p > 7 || u.gcd(n, p) !== 1 || K < 1500 || K > 3200 || D < 350 || D > 650) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const x0 = (n * K) / p;
      const val = x0 / D;
      const t = val * 10 - Math.floor(val * 10);
      if (Math.abs(t - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, b, p, K, D } = params;
      const xFrac = u.simplifyFrac(n * K, p);
      const val = (n * K) / (p * D);
      const rounded1 = Math.round(val * 10) / 10;
      const shortAnswer = Number.isInteger(rounded1)
        ? String(rounded1)
        : rounded1.toFixed(1).replace('.', ',');

      return {
        stem: 'Biết $x = x_0$ là nghiệm của phương trình $\\sqrt[' + n + ']{' + b + '^{' + p + 'x}} - ' + b + '^{' + K + '} = 0$. Tính giá trị $\\dfrac{x_0}{' + D + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded1,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$\\sqrt[' + n + ']{' + b + '^{' + p + 'x}} = ' + b + '^{' + K + '} \\Leftrightarrow ' + b + '^{\\frac{' + p + 'x}{' + n + '}} = ' + b + '^{' + K + '} \\Leftrightarrow \\dfrac{' + p + 'x}{' + n + '} = ' + K + '$.',
          'Suy ra $x_0 = ' + xFrac.latex + '$, nên $\\dfrac{x_0}{' + D + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n=4, p=4 (gcd!=1)', params: { n: 4, b: 3, p: 4, K: 2511, D: 494 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45 (4,1)', params: { n: 4, b: 3, p: 5, K: 2511, D: 494 }, expectedValid: true },
    ],
  },

  // D46 (Q46): a1*A^x - b1*B^x = -a2*A^x + b2*B^x, tính u0*x0 + v0
  t11_b21_d46_sa_two_bases_exp: {
    id: 't11_b21_d46_sa_two_bases_exp',
    name: 'Phương trình đẳng cấp hai cơ số mũ A^x, B^x (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải a1·A^x - b1·B^x = -a2·A^x + b2·B^x, tính u0·x₀ + v0 làm tròn hàng phần mười.',
    conditionSummary: 'A < B ∈ {2,3,4,5,7,9}, a1,a2,b1,b2 ∈ [4;18], u0 ∈ [-5;-2] ∪ [2;5], v0 ∈ [-6;6]',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp cơ số (0:(4,9), 1:(2,3), 2:(3,5), 3:(2,5))', min: 0, max: 3 },
      { name: 'a1', label: 'Hệ số a1', min: 5, max: 16 },
      { name: 'b1', label: 'Hệ số b1', min: 6, max: 18 },
      { name: 'a2', label: 'Hệ số a2', min: 4, max: 14 },
      { name: 'b2', label: 'Hệ số b2', min: 6, max: 18 },
      { name: 'u0', label: 'Hệ số u0', min: -5, max: 5 },
      { name: 'v0', label: 'Hằng số v0', min: -6, max: 6 },
    ],
    validateCode: `
      const { pairIdx, a1, b1, a2, b2, u0, v0 } = params;
      if (pairIdx < 0 || pairIdx > 3 || a1 < 5 || a1 > 16 || b1 < 6 || b1 > 18 || a2 < 4 || a2 > 14 || b2 < 6 || b2 > 18 || v0 < -6 || v0 > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (Math.abs(u0) < 2) return { valid: false, reason: 'Cần |u0| >= 2' };
      const PAIRS = [[4, 9], [2, 3], [3, 5], [2, 5]];
      const [A, B] = PAIRS[pairIdx];
      const x0 = Math.log((b1 + b2) / (a1 + a2)) / Math.log(A / B);
      const val = u0 * x0 + v0;
      if (!Number.isFinite(val)) return { valid: false, reason: 'Giá trị không xác định' };
      const t = val * 10 - Math.floor(val * 10);
      if (Math.abs(t - 0.5) < 0.025) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, a1, b1, a2, b2, u0, v0 } = params;
      const PAIRS = [[4, 9], [2, 3], [3, 5], [2, 5]];
      const [A, B] = PAIRS[pairIdx];
      const sumA = a1 + a2;
      const sumB = b1 + b2;
      const ratioFrac = u.simplifyFrac(sumB, sumA);
      const baseFrac = u.simplifyFrac(A, B);
      const x0 = Math.log(sumB / sumA) / Math.log(A / B);
      const val = u0 * x0 + v0;
      const rounded1 = Math.round(val * 10) / 10;
      const shortAnswer = Number.isInteger(rounded1)
        ? String(rounded1)
        : rounded1.toFixed(1).replace('.', ',');
      const exprTex = u.formatLinear(u0, v0).replace(/x/g, 'x_0');

      return {
        stem: 'Biết $x_0$ là nghiệm của phương trình $' + a1 + ' \\cdot ' + A + '^x - ' + b1 + ' \\cdot ' + B + '^x = -' + a2 + ' \\cdot ' + A + '^x + ' + b2 + ' \\cdot ' + B + '^x$. Tính giá trị biểu thức $' + exprTex + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded1,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chuyển vế thu được $' + sumA + ' \\cdot ' + A + '^x = ' + sumB + ' \\cdot ' + B + '^x \\Leftrightarrow \\left(' + baseFrac.latex + '\\right)^x = ' + ratioFrac.latex + '$.',
          'Suy ra $x_0 = \\log_{' + baseFrac.latex + '}\\left(' + ratioFrac.latex + '\\right) \\approx ' + (Math.round(x0 * 1000) / 1000).toFixed(3).replace('.', ',') + '$.',
          'Do đó $' + exprTex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u0 = 0', params: { pairIdx: 0, a1: 10, b1: 15, a2: 6, b2: 15, u0: 0, v0: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46 (-0,9)', params: { pairIdx: 0, a1: 10, b1: 15, a2: 6, b2: 15, u0: -4, v0: -4 }, expectedValid: true },
    ],
  },

  // D47 (Q47): A^x + A^{x-u1} + A^{x+u2} = B^x + B^{x-v1} + B^{x-v2} (A = B^2)
  t11_b21_d47_sa_shifted_exp_bases: {
    id: 't11_b21_d47_sa_shifted_exp_bases',
    name: 'Phương trình mũ lệch chỉ số hai cơ số B và B² (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải (B²)^x + (B²)^{x-u1} + (B²)^{x+u2} = B^x + B^{x-v1} + B^{x-v2}, tính c·x₀ + d làm tròn hàng phần mười.',
    conditionSummary: 'B ∈ {2,3}, u1 ∈ [1;2], u2 ∈ [1;2], v1 ∈ [2;3], v2 ∈ [1;2] (v1 != v2), c ∈ [2;5], d ∈ [-6;4]',
    paramSpecs: [
      { name: 'B', label: 'Cơ số nhỏ B (2 hoặc 3)', min: 2, max: 3 },
      { name: 'u1', label: 'Độ lệch u1 (ở B²)', min: 1, max: 2 },
      { name: 'u2', label: 'Độ lệch u2 (ở B²)', min: 1, max: 2 },
      { name: 'v1', label: 'Độ lệch v1 (ở B)', min: 2, max: 3 },
      { name: 'v2', label: 'Độ lệch v2 < v1 (ở B)', min: 1, max: 2 },
      { name: 'c', label: 'Hệ số c', min: 2, max: 5 },
      { name: 'd', label: 'Hằng số d', min: -6, max: 4 },
    ],
    validateCode: `
      const { B, u1, u2, v1, v2, c, d } = params;
      if ((B !== 2 && B !== 3) || u1 < 1 || u1 > 2 || u2 < 1 || u2 > 2 || v1 < 2 || v1 > 3 || v2 < 1 || v2 >= v1 || c < 2 || c > 5 || d < -6 || d > 4) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const A = B * B;
      const lhsDen = Math.pow(A, u1);
      const lhsNum = lhsDen + 1 + lhsDen * Math.pow(A, u2);
      const rhsDen = Math.pow(B, v1);
      const rhsNum = rhsDen + 1 + Math.pow(B, v1 - v2);
      const ratio = (rhsNum * lhsDen) / (lhsNum * rhsDen);
      const x0 = Math.log(ratio) / Math.log(B);
      const val = c * x0 + d;
      const t = val * 10 - Math.floor(val * 10);
      if (Math.abs(t - 0.5) < 0.025) return { valid: false, reason: 'Tránh mốc làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { B, u1, u2, v1, v2, c, d } = params;
      const A = B * B;
      const lhsDen = Math.pow(A, u1);
      const lhsNum = lhsDen + 1 + lhsDen * Math.pow(A, u2);
      const rhsDen = Math.pow(B, v1);
      const rhsNum = rhsDen + 1 + Math.pow(B, v1 - v2);
      const lhsCoeff = u.simplifyFrac(lhsNum, lhsDen);
      const rhsCoeff = u.simplifyFrac(rhsNum, rhsDen);
      const solFrac = u.simplifyFrac(rhsNum * lhsDen, lhsNum * rhsDen);

      const x0 = Math.log(solFrac.value) / Math.log(B);
      const val = c * x0 + d;
      const rounded1 = Math.round(val * 10) / 10;
      const shortAnswer = Number.isInteger(rounded1)
        ? String(rounded1)
        : rounded1.toFixed(1).replace('.', ',');
      const exprTex = u.formatLinear(c, d).replace(/x/g, 'x_0');

      return {
        stem: 'Biết $x_0$ là nghiệm của phương trình $' + A + '^x + ' + A + '^{x - ' + u1 + '} + ' + A + '^{x + ' + u2 + '} = ' + B + '^x + ' + B + '^{x - ' + v1 + '} + ' + B + '^{x - ' + v2 + '}$. Tính giá trị biểu thức $' + exprTex + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded1,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Đặt nhân tử chung: $\\left(1 + \\dfrac{1}{' + Math.pow(A, u1) + '} + ' + Math.pow(A, u2) + '\\right)' + A + '^x = \\left(1 + \\dfrac{1}{' + Math.pow(B, v1) + '} + \\dfrac{1}{' + Math.pow(B, v2) + '}\\right)' + B + '^x$.',
          'Thu gọn: $' + lhsCoeff.latex + ' \\cdot ' + A + '^x = ' + rhsCoeff.latex + ' \\cdot ' + B + '^x \\Leftrightarrow ' + B + '^x = ' + solFrac.latex + ' \\Leftrightarrow x_0 = \\log_{' + B + '}\\left(' + solFrac.latex + '\\right)$.',
          'Tính được $' + exprTex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v2 = v1', params: { B: 2, u1: 1, u2: 2, v1: 2, v2: 2, c: 4, d: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47 (-17,6)', params: { B: 2, u1: 1, u2: 2, v1: 3, v2: 1, c: 4, d: -4 }, expectedValid: true },
    ],
  },

  // D48 (Q48): \log_b(p1*x - q1) - \log_b(q2 - p2*x) = k, tính v0 + u0*x0
  t11_b21_d48_sa_log_diff_eq: {
    id: 't11_b21_d48_sa_log_diff_eq',
    name: 'Phương trình hiệu hai lôgarit cùng cơ số (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải log_b(p1·x - q1) - log_b(q2 - p2·x) = k, tính v0 + u0·x₀ làm tròn đến hàng phần mười.',
    conditionSummary: 'b ∈ {2,3,5}, p1 ∈ [3;8], q1 ∈ [1;5], p2 ∈ [1;3], q2 ∈ [2;6], q1/p1 < q2/p2, k ∈ {1,2}',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5)', min: 0, max: 2 },
      { name: 'p1', label: 'Hệ số p1', min: 3, max: 8 },
      { name: 'q1', label: 'Hằng số q1', min: 1, max: 5 },
      { name: 'p2', label: 'Hệ số p2', min: 1, max: 3 },
      { name: 'q2', label: 'Hằng số q2', min: 2, max: 6 },
      { name: 'k', label: 'Vế phải k', min: 1, max: 2 },
      { name: 'u0', label: 'Hệ số u0', min: -5, max: -2 },
      { name: 'v0', label: 'Hằng số v0', min: 1, max: 6 },
    ],
    validateCode: `
      const { bIdx, p1, q1, p2, q2, k, u0, v0 } = params;
      if (bIdx < 0 || bIdx > 2 || p1 < 3 || p1 > 8 || q1 < 1 || q1 > 5 || p2 < 1 || p2 > 3 || q2 < 2 || q2 > 6 || (k !== 1 && k !== 2) || u0 < -5 || u0 > -2 || v0 < 1 || v0 > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (q1 * p2 >= q2 * p1) {
        return { valid: false, reason: 'Cần q1/p1 < q2/p2 để tập xác định khác rỗng' };
      }
      const b = [2, 3, 5][bIdx];
      const bk = Math.pow(b, k);
      const x0 = (q1 + bk * q2) / (p1 + bk * p2);
      const val = v0 + u0 * x0;
      const t = val * 10 - Math.floor(val * 10);
      if (Math.abs(t - 0.5) < 0.025) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, p1, q1, p2, q2, k, u0, v0 } = params;
      const b = [2, 3, 5][bIdx];
      const bk = Math.pow(b, k);
      const xFrac = u.simplifyFrac(q1 + bk * q2, p1 + bk * p2);
      const val = v0 + u0 * xFrac.value;
      const rounded1 = Math.round(val * 10) / 10;
      const shortAnswer = Number.isInteger(rounded1)
        ? String(rounded1)
        : rounded1.toFixed(1).replace('.', ',');
      const d1 = u.simplifyFrac(q1, p1);
      const d2 = u.simplifyFrac(q2, p2);
      const exprTex = v0 + ' - ' + Math.abs(u0) + 'x_0';

      return {
        stem: 'Biết $x_0$ là nghiệm của phương trình $\\log_{' + b + '}(' + p1 + 'x - ' + q1 + ') - \\log_{' + b + '}(' + q2 + ' - ' + (p2 === 1 ? '' : p2) + 'x) = ' + k + '$. Tính giá trị biểu thức $' + exprTex + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded1,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Điều kiện: $' + p1 + 'x - ' + q1 + ' > 0$ và $' + q2 + ' - ' + (p2 === 1 ? '' : p2) + 'x > 0 \\Leftrightarrow ' + d1.latex + ' < x < ' + d2.latex + '$.',
          'Phương trình $\\Leftrightarrow \\dfrac{' + p1 + 'x - ' + q1 + '}{' + q2 + ' - ' + (p2 === 1 ? '' : p2) + 'x} = ' + b + '^{' + k + '} = ' + bk + ' \\Leftrightarrow x_0 = ' + xFrac.latex + '$ (thỏa mãn điều kiện).',
          'Suy ra $' + exprTex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên miền xác định rỗng (q1/p1 >= q2/p2)', params: { bIdx: 2, p1: 2, q1: 5, p2: 2, q2: 3, k: 2, u0: -4, v0: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48 (-2,5)', params: { bIdx: 2, p1: 7, q1: 3, p2: 2, q2: 3, k: 2, u0: -4, v0: 3 }, expectedValid: true },
    ],
  },

  // D49 (Q49): Bài toán thực tế vi khuẩn N(x) = 2^{a x^2 - b x + c} đạt 2^k
  t11_b21_d49_sa_bacteria_growth_days: {
    id: 't11_b21_d49_sa_bacteria_growth_days',
    name: 'Mô hình nuôi cấy vi khuẩn N(x) = 2^{ax² - bx + c} (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Tìm số ngày nguyên ít nhất để số lượng vi khuẩn N(x) = 2^{ax² - bx + c} đạt mục tiêu 2^k triệu con.',
    conditionSummary: 'a ∈ [1;6], b ∈ [1;6], c ∈ [0;2], k ∈ [c+1; 6], nghiệm dương không nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 6 },
      { name: 'b', label: 'Hệ số b (của -bx)', min: 1, max: 6 },
      { name: 'c', label: 'Hằng số c', min: 0, max: 2 },
      { name: 'k', label: 'Số mũ mục tiêu k > c', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, b, c, k } = params;
      if (a < 1 || a > 6 || b < 1 || b > 6 || c < 0 || c > 2 || k <= c || k > 6) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc k <= c' };
      }
      const delta = b * b + 4 * a * (k - c);
      const xPlus = (b + Math.sqrt(delta)) / (2 * a);
      if (Math.abs(xPlus - Math.round(xPlus)) < 1e-6) {
        return { valid: false, reason: 'Chọn tham số sao cho nghiệm dương không trùng số nguyên' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, k } = params;
      const target = Math.pow(2, k);
      const expTex = u.formatQuadratic(a, -b, c);
      const eqTex = u.formatQuadratic(a, -b, c - k);
      const delta = b * b + 4 * a * (k - c);
      const xPlus = (b + Math.sqrt(delta)) / (2 * a);
      const ans = Math.ceil(xPlus);
      const xApprox = (Math.round(xPlus * 10) / 10).toFixed(1).replace('.', ',');

      return {
        stem: 'Một phòng thí nghiệm nuôi cấy vi khuẩn trong môi trường đặc biệt. Sau $x$ ngày số lượng vi khuẩn (tính theo triệu con) được mô hình hóa bởi công thức: $N(x) = 2^{' + expTex + '}$. Biết rằng khi số lượng vi khuẩn đạt $' + target + '$ triệu con thì cần tiến hành xử lý môi trường. Hỏi sau ít nhất bao nhiêu ngày kể từ khi bắt đầu nuôi cấy thì phải tiến hành xử lý môi trường?',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans) + ' ngày',
        solutionSteps: [
          'Ta cần $N(x) \\ge ' + target + ' \\Leftrightarrow 2^{' + expTex + '} \\ge 2^{' + k + '} \\Leftrightarrow ' + eqTex + ' \\ge 0$.',
          'Giải $' + eqTex + ' = 0$ được nghiệm dương $x = \\dfrac{' + b + ' + \\sqrt{' + delta + '}}{' + (2 * a) + '} \\approx ' + xApprox + '$.',
          'Vì số ngày $x$ là số nguyên dương nên sau ít nhất $' + ans + '$ ngày phải xử lý môi trường.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k <= c', params: { a: 5, b: 3, c: 2, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49 (1 ngày)', params: { a: 5, b: 3, c: 1, k: 2 }, expectedValid: true },
    ],
  },

  // D50 (Q50): Áp suất không khí theo độ cao h = 15500(5 - log p)
  t11_b21_d50_sa_altitude_pressure_log: {
    id: 't11_b21_d50_sa_altitude_pressure_log',
    name: 'Bài toán thực tế áp suất không khí h = 15500(5 - log p) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Tính áp suất không khí p (đơn vị kPa, làm tròn đến hàng đơn vị) ở độ cao h mét.',
    conditionSummary: 'h ∈ [6200; 18600], kết quả kPa không sát ngưỡng làm tròn .5',
    paramSpecs: [
      { name: 'h', label: 'Độ cao h (mét)', min: 6200, max: 18600 },
    ],
    validateCode: `
      const { h } = params;
      if (h < 6200 || h > 18600) return { valid: false, reason: 'Độ cao ngoài miền [6200; 18600]' };
      const logP = 5 - h / 15500;
      const pKpa = Math.pow(10, logP) / 1000;
      const frac = pKpa - Math.floor(pKpa);
      if (Math.abs(frac - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h } = params;
      const logP = 5 - h / 15500;
      const pPa = Math.pow(10, logP);
      const pKpa = pPa / 1000;
      const ans = Math.round(pKpa);
      const logPTex = (Math.round(logP * 1000) / 1000).toFixed(3).replace('.', ',');
      const pKpaTex = (Math.round(pKpa * 10) / 10).toFixed(1).replace('.', ',');

      return {
        stem: 'Biết rằng khi độ cao tăng lên, áp suất không khí sẽ giảm và công thức tính áp suất dựa trên độ cao là $a = 15500(5 - \\log p)$, trong đó $a$ là độ cao so với mực nước biển (tính bằng mét) và $p$ là áp suất không khí (tính bằng pascal). Tính áp suất không khí ở một đỉnh núi có độ cao $' + h + '\\,\\mathrm{m}$ so với mực nước biển (đơn vị kPa, làm tròn đến hàng đơn vị).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans) + ' kPa',
        solutionSteps: [
          'Thay $a = ' + h + '$ vào công thức: $5 - \\log p = \\dfrac{' + h + '}{15500} \\Rightarrow \\log p \\approx ' + logPTex + '$.',
          'Suy ra $p = 10^{' + logPTex + '} \\approx ' + Math.round(pPa) + '\\,\\mathrm{Pa} \\approx ' + pKpaTex + '\\,\\mathrm{kPa}$.',
          'Làm tròn đến hàng đơn vị, ta được $' + ans + '\\,\\mathrm{kPa}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 5000', params: { h: 5000 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50 (h=12399 -> 16 kPa)', params: { h: 12399 }, expectedValid: true },
    ],
  },

  // D51 (Q51): Đếm nghiệm nguyên thuộc [L; R] của (p/q)^{c1 - a1 x} > (p/q)^{-a2 x - c2}
  t11_b21_d51_sa_exp_frac_count_int: {
    id: 't11_b21_d51_sa_exp_frac_count_int',
    name: 'Đếm nghiệm nguyên bất phương trình mũ cơ số (p/q) ∈ (0; 1) (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đếm số nghiệm nguyên thuộc đoạn [L; R] của (p/q)^{c1 - a1 x} > (p/q)^{-a2 x - c2}.',
    conditionSummary: 'p < q coprime, a1 ∈ [1;4], a2 ∈ [a1+1; 7], c1 ∈ [3;9], c2 ∈ [2;8], L ∈ [-70;-30], R ∈ [40;95]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 2, max: 9 },
      { name: 'q', label: 'Mẫu số q > p', min: 5, max: 17 },
      { name: 'a1', label: 'Hệ số a1 (trong c1 - a1 x)', min: 1, max: 4 },
      { name: 'a2', label: 'Hệ số a2 > a1 (trong -a2 x - c2)', min: 2, max: 7 },
      { name: 'c1', label: 'Hằng số c1', min: 3, max: 9 },
      { name: 'c2', label: 'Hằng số c2', min: 2, max: 8 },
      { name: 'L', label: 'Cận trái đoạn [L; R]', min: -70, max: -30 },
      { name: 'R', label: 'Cận phải đoạn [L; R]', min: 40, max: 95 },
    ],
    validateCode: `
      const { p, q, a1, a2, c1, c2, L, R } = params;
      if (p < 2 || p >= q || q > 17 || u.gcd(p, q) !== 1 || a1 < 1 || a1 >= a2 || a2 > 7 || c1 < 3 || c1 > 9 || c2 < 2 || c2 > 8 || L < -70 || L > -30 || R < 40 || R > 95) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const bound = -(c1 + c2) / (a2 - a1);
      if (bound <= L || bound >= R) return { valid: false, reason: 'Ngưỡng nghiệm phải nằm trong (L; R)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, a1, a2, c1, c2, L, R } = params;
      const lhs = u.formatLinear(-a1, c1);
      const rhs = u.formatLinear(-a2, -c2);
      const crit = u.simplifyFrac(-(c1 + c2), a2 - a1);
      const maxInt = Number.isInteger(crit.value) ? crit.value - 1 : Math.floor(crit.value);
      const hi = Math.min(R, maxInt);
      const ans = Math.max(0, hi - L + 1);

      return {
        stem: 'Số các nghiệm nguyên thuộc đoạn $[' + L + '; ' + R + ']$ của bất phương trình $\\left(\\dfrac{' + p + '}{' + q + '}\\right)^{' + lhs + '} > \\left(\\dfrac{' + p + '}{' + q + '}\\right)^{' + rhs + '}$ là:',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Vì $0 < \\dfrac{' + p + '}{' + q + '} < 1$ nên bất phương trình tương đương với $' + lhs + ' < ' + rhs + ' \\Leftrightarrow ' + (a2 - a1) + 'x < -' + (c1 + c2) + ' \\Leftrightarrow x < ' + crit.latex + '$.',
          'Trong đoạn $[' + L + '; ' + R + ']$, các nghiệm nguyên là $x \\in \\{' + L + ', \\ldots, ' + hi + '\\}$, gồm $' + ans + '$ giá trị.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a2 = a1', params: { p: 9, q: 14, a1: 2, a2: 2, c1: 7, c2: 4, L: -56, R: 82 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q51 (51)', params: { p: 9, q: 14, a1: 2, a2: 4, c1: 7, c2: 4, L: -56, R: 82 }, expectedValid: true },
    ],
  },

  // D52 (Q52): Đếm số nguyên m để b^{x^2 - (km + c1)x - c2} >= b^{-c3 x - c4} đúng ∀x ∈ R
  t11_b21_d52_sa_exp_param_m_all_r: {
    id: 't11_b21_d52_sa_exp_param_m_all_r',
    name: 'Tìm số giá trị nguyên m để bất phương trình mũ nghiệm đúng ∀x ∈ ℝ (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đếm số giá trị nguyên m để bất phương trình mũ chứa tham số m nghiệm đúng với mọi x ∈ ℝ.',
    conditionSummary: 'b ∈ {2,3,5}, k ∈ [2;4], c1 ∈ [1;4], c3 ∈ [2;6], c2 ∈ [2;5], c4 = c2 + 1',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5)', min: 0, max: 2 },
      { name: 'k', label: 'Hệ số k của m', min: 2, max: 4 },
      { name: 'c1', label: 'Hằng số c1', min: 1, max: 4 },
      { name: 'c2', label: 'Hằng số c2', min: 2, max: 5 },
      { name: 'c3', label: 'Hệ số c3 của -c3 x', min: 2, max: 6 },
    ],
    validateCode: `
      const { bIdx, k, c1, c2, c3 } = params;
      if (bIdx < 0 || bIdx > 2 || k < 2 || k > 4 || c1 < 1 || c1 > 4 || c2 < 2 || c2 > 5 || c3 < 2 || c3 > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k, c1, c2, c3 } = params;
      const b = [2, 3, 5][bIdx];
      const c4 = c2 + 1;
      const shift = c3 - c1;
      const mMin = Math.ceil((shift - 2) / k);
      const mMax = Math.floor((shift + 2) / k);
      const ans = Math.max(0, mMax - mMin + 1);
      const leftFrac = u.simplifyFrac(shift - 2, k);
      const rightFrac = u.simplifyFrac(shift + 2, k);
      const linB = u.formatLinear(-k, shift);

      return {
        stem: 'Số các giá trị nguyên của $m$ để bất phương trình $' + b + '^{x^2 + (-' + k + 'm - ' + c1 + ')x - ' + c2 + '} \\ge ' + b + '^{-' + c3 + 'x - ' + c4 + '}$ có nghiệm đúng với mọi $x \\in \\mathbb{R}$ là:',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Vì $' + b + ' > 1$ nên bất phương trình $\\Leftrightarrow x^2 + (-' + k + 'm - ' + c1 + ')x - ' + c2 + ' \\ge -' + c3 + 'x - ' + c4 + ' \\Leftrightarrow x^2 + (' + (-k) + 'm ' + (shift >= 0 ? '+ ' + shift : '- ' + Math.abs(shift)) + ')x + 1 \\ge 0$.',
          'Yêu cầu bài toán $\\Leftrightarrow \\Delta \\le 0 \\Leftrightarrow (' + linB.replace(/x/g, 'm') + ')^2 - 4 \\le 0 \\Leftrightarrow ' + leftFrac.latex + ' \\le m \\le ' + rightFrac.latex + '$.',
          'Vậy có $' + ans + '$ giá trị nguyên của $m$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { bIdx: 0, k: 1, c1: 1, c2: 3, c3: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q52 (2)', params: { bIdx: 0, k: 3, c1: 1, c2: 3, c3: 3 }, expectedValid: true },
    ],
  },

  // D53 (Q53): Đếm nghiệm nguyên thuộc [L; R] của log_b(p x - q) <= k
  t11_b21_d53_sa_log_linear_le_count: {
    id: 't11_b21_d53_sa_log_linear_le_count',
    name: 'Đếm nghiệm nguyên bất phương trình log_b(px - q) ≤ k (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Tìm số nghiệm nguyên thuộc [L; R] của log_b(px - q) <= k với b > 1.',
    conditionSummary: 'b ∈ {2,3,4}, p ∈ [2;7], q ∈ [2;9], k ∈ [1;3], L ∈ [-60;-20], R ∈ [40;95]',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b', min: 2, max: 4 },
      { name: 'p', label: 'Hệ số p', min: 2, max: 7 },
      { name: 'q', label: 'Hằng số q', min: 2, max: 9 },
      { name: 'k', label: 'Vế phải k', min: 1, max: 3 },
      { name: 'L', label: 'Cận trái đoạn [L; R]', min: -60, max: -20 },
      { name: 'R', label: 'Cận phải đoạn [L; R]', min: 40, max: 95 },
    ],
    validateCode: `
      const { b, p, q, k, L, R } = params;
      if (b < 2 || b > 4 || p < 2 || p > 7 || q < 2 || q > 9 || k < 1 || k > 3 || L < -60 || L > -20 || R < 40 || R > 95) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const loReal = q / p;
      const hiReal = (q + Math.pow(b, k)) / p;
      if (loReal <= L || hiReal >= R) return { valid: false, reason: 'Miền nghiệm phải nằm gọn trong [L; R]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, p, q, k, L, R } = params;
      const bk = Math.pow(b, k);
      const loFrac = u.simplifyFrac(q, p);
      const hiFrac = u.simplifyFrac(q + bk, p);
      const intLo = Math.max(L, Math.floor(loFrac.value) + 1);
      const intHi = Math.min(R, Math.floor(hiFrac.value));
      const ans = Math.max(0, intHi - intLo + 1);

      return {
        stem: 'Tìm số nghiệm nguyên thuộc đoạn $[' + L + '; ' + R + ']$ của bất phương trình $\\log_{' + b + '}(' + p + 'x - ' + q + ') \\le ' + k + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Điều kiện: $' + p + 'x - ' + q + ' > 0 \\Leftrightarrow x > ' + loFrac.latex + '$.',
          'Bất phương trình $\\Leftrightarrow ' + p + 'x - ' + q + ' \\le ' + b + '^{' + k + '} = ' + bk + ' \\Leftrightarrow x \\le ' + hiFrac.latex + '$.',
          'Kết hợp điều kiện được $' + loFrac.latex + ' < x \\le ' + hiFrac.latex + '$, nên trong $[' + L + '; ' + R + ']$ có $' + ans + '$ nghiệm nguyên.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1, p: 5, q: 6, k: 2, L: -49, R: 82 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q53 (1)', params: { b: 2, p: 5, q: 6, k: 2, L: -49, R: 82 }, expectedValid: true },
    ],
  },

  // D54 (Q54): Đếm nghiệm nguyên thuộc [L; R] của ln(px + q) > k
  t11_b21_d54_sa_ln_linear_gt_count: {
    id: 't11_b21_d54_sa_ln_linear_gt_count',
    name: 'Đếm nghiệm nguyên bất phương trình ln(px + q) > k (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Tìm số nghiệm nguyên thuộc đoạn [L; R] của ln(px + q) > k.',
    conditionSummary: 'p ∈ [1;5], q ∈ [2;9], k ∈ [2;4], L ∈ [-55;-20], R ∈ [35;90]',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p', min: 1, max: 5 },
      { name: 'q', label: 'Hằng số q', min: 2, max: 9 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
      { name: 'L', label: 'Cận trái đoạn [L; R]', min: -55, max: -20 },
      { name: 'R', label: 'Cận phải đoạn [L; R]', min: 35, max: 90 },
    ],
    validateCode: `
      const { p, q, k, L, R } = params;
      if (p < 1 || p > 5 || q < 2 || q > 9 || k < 2 || k > 4 || L < -55 || L > -20 || R < 35 || R > 90) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const crit = (Math.exp(k) - q) / p;
      if (crit >= R - 1 || crit <= L) return { valid: false, reason: 'Ngưỡng phải nằm gọn trong [L; R]' };
      if (Math.abs(crit - Math.round(crit)) < 0.02) return { valid: false, reason: 'Tránh ngưỡng sát số nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, k, L, R } = params;
      const lin = u.formatLinear(p, q);
      const crit = (Math.exp(k) - q) / p;
      const intLo = Math.max(L, Math.floor(crit) + 1);
      const ans = Math.max(0, R - intLo + 1);
      const domFrac = u.simplifyFrac(-q, p);
      const critApprox = (Math.round(crit * 100) / 100).toFixed(2).replace('.', ',');

      return {
        stem: 'Tìm số nghiệm nguyên thuộc đoạn $[' + L + '; ' + R + ']$ của bất phương trình $\\ln(' + lin + ') > ' + k + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Điều kiện: $' + lin + ' > 0 \\Leftrightarrow x > ' + domFrac.latex + '$.',
          'Vì $e > 1$ nên $\\ln(' + lin + ') > ' + k + ' \\Leftrightarrow ' + lin + ' > e^{' + k + '} \\Leftrightarrow x > \\dfrac{e^{' + k + '} - ' + q + '}{' + p + '} \\approx ' + critApprox + '$.',
          'Trong đoạn $[' + L + '; ' + R + ']$, các nghiệm nguyên là $' + intLo + ', \\ldots, ' + R + '$, gồm $' + ans + '$ giá trị.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { p: 2, q: 6, k: 1, L: -42, R: 44 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q54 (37)', params: { p: 2, q: 6, k: 3, L: -42, R: 44 }, expectedValid: true },
    ],
  },

  // D55 (Q55): Đếm nghiệm nguyên thuộc [-M; M] của log_b(x - r1) + log_b(x - r2) > k
  t11_b21_d55_sa_log_sum_gt_count: {
    id: 't11_b21_d55_sa_log_sum_gt_count',
    name: 'Đếm nghiệm nguyên bất phương trình tổng hai lôgarit log_b(x - r1) + log_b(x - r2) > k (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đưa về tích (x - r1)(x - r2) > b^k với b^k = r1·r2, tìm số nghiệm nguyên trong [-M; M].',
    conditionSummary: 'b=2, k ∈ [2;4] (r1 = 2^k, r2 = 1) hoặc (b=3, k=2, r1=9, r2=1), M ∈ [30; 90]',
    paramSpecs: [
      { name: 'cfgIdx', label: 'Bộ tham số (0:(2,2,4,1), 1:(2,3,8,1), 2:(2,3,4,2), 3:(3,2,9,1))', min: 0, max: 3 },
      { name: 'M', label: 'Cận M của đoạn [-M; M]', min: 30, max: 90 },
    ],
    validateCode: `
      const { cfgIdx, M } = params;
      if (cfgIdx < 0 || cfgIdx > 3 || M < 30 || M > 90) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { cfgIdx, M } = params;
      const CFGS = [
        { b: 2, k: 2, r1: 4, r2: 1 },
        { b: 2, k: 3, r1: 8, r2: 1 },
        { b: 2, k: 3, r1: 4, r2: 2 },
        { b: 3, k: 2, r1: 9, r2: 1 },
      ];
      const { b, k, r1, r2 } = CFGS[cfgIdx];
      const bk = r1 * r2;
      const sumR = r1 + r2;
      const ans = Math.max(0, M - sumR);

      return {
        stem: 'Cho bất phương trình $\\log_{' + b + '}(x - ' + r1 + ') + \\log_{' + b + '}(x - ' + r2 + ') > ' + k + '$. Tìm số nghiệm nguyên thuộc đoạn $[-' + M + '; ' + M + ']$ của bất phương trình đã cho.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Điều kiện xác định: $x > ' + r1 + '$ và $x > ' + r2 + ' \\Rightarrow x > ' + r1 + '$.',
          'Bất phương trình $\\Leftrightarrow \\log_{' + b + '}[(x - ' + r1 + ')(x - ' + r2 + ')] > ' + k + ' \\Leftrightarrow x^2 - ' + sumR + 'x > 0 \\Leftrightarrow x < 0$ hoặc $x > ' + sumR + '$.',
          'Kết hợp điều kiện được $x > ' + sumR + '$. Trong đoạn $[-' + M + '; ' + M + ']$, có $' + ans + '$ nghiệm nguyên ($' + (sumR + 1) + ', \\ldots, ' + M + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M = 20', params: { cfgIdx: 0, M: 20 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q55 (51)', params: { cfgIdx: 0, M: 56 }, expectedValid: true },
    ],
  },

  // D56 (Q56): Đếm nghiệm nguyên thuộc [-M; M] của log_b(x + r1 - s) + log_b(x + r2 - s) > k
  t11_b21_d56_sa_log_sum_plus_gt_count: {
    id: 't11_b21_d56_sa_log_sum_plus_gt_count',
    name: 'Đếm nghiệm nguyên bất phương trình log_b(x + a) + log_b(x + c) > k (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đưa về bất phương trình bậc hai bằng tích lôgarit và đếm nghiệm nguyên trong [-M; M].',
    conditionSummary: 'cfgIdx ∈ [0;3], s ∈ [0;3], M ∈ [40;95]',
    paramSpecs: [
      { name: 'cfgIdx', label: 'Bộ tham số (0:(2,3,2,4), 1:(2,2,1,4), 2:(3,2,1,9), 3:(2,4,2,8))', min: 0, max: 3 },
      { name: 's', label: 'Dịch chuyển s', min: 0, max: 3 },
      { name: 'M', label: 'Cận M của đoạn [-M; M]', min: 40, max: 95 },
    ],
    validateCode: `
      const { cfgIdx, s, M } = params;
      if (cfgIdx < 0 || cfgIdx > 3 || s < 0 || s > 3 || M < 40 || M > 95) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { cfgIdx, s, M } = params;
      const CFGS = [
        { b: 2, k: 3, u1: 2, u2: 4 },
        { b: 2, k: 2, u1: 1, u2: 4 },
        { b: 3, k: 2, u1: 1, u2: 9 },
        { b: 2, k: 4, u1: 2, u2: 8 },
      ];
      const { b, k, u1, u2 } = CFGS[cfgIdx];
      const r1 = u1 - s;
      const r2 = u2 - s;
      const minR = Math.min(r1, r2);
      const ans = Math.max(0, M - s);
      const expr1 = r1 === 0 ? 'x' : r1 > 0 ? 'x + ' + r1 : 'x - ' + Math.abs(r1);
      const expr2 = r2 === 0 ? 'x' : r2 > 0 ? 'x + ' + r2 : 'x - ' + Math.abs(r2);
      const sumU = u1 + u2;
      const quadTex = u.formatQuadratic(1, sumU - 2 * s, r1 * r2 - Math.pow(b, k));

      return {
        stem: 'Cho bất phương trình $\\log_{' + b + '}(' + expr1 + ') + \\log_{' + b + '}(' + expr2 + ') > ' + k + '$. Tìm số nghiệm nguyên thuộc đoạn $[-' + M + '; ' + M + ']$ của bất phương trình đã cho.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Điều kiện xác định: $x > ' + (-minR) + '$.',
          'Bất phương trình $\\Leftrightarrow \\log_{' + b + '}[(' + expr1 + ')(' + expr2 + ')] > ' + k + ' \\Leftrightarrow ' + quadTex + ' > 0 \\Leftrightarrow x < ' + (s - sumU) + '$ hoặc $x > ' + s + '$.',
          'Kết hợp điều kiện được $x > ' + s + '$. Trong đoạn $[-' + M + '; ' + M + ']$, có $' + ans + '$ nghiệm nguyên.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên s = 4', params: { cfgIdx: 0, s: 4, M: 89 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q56 (89)', params: { cfgIdx: 0, s: 0, M: 89 }, expectedValid: true },
    ],
  },

  // D57 (Q57): Đếm nghiệm nguyên thuộc [-M; M] của log_b(a1 x - c1) - log_b(a2 x - c2) < k
  t11_b21_d57_sa_log_diff_lt_count: {
    id: 't11_b21_d57_sa_log_diff_lt_count',
    name: 'Đếm nghiệm nguyên bất phương trình hiệu lôgarit log_b(a1 x - c1) - log_b(a2 x - c2) < k (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đưa về thương (a1 x - c1)/(a2 x - c2) < b^k với điều kiện xác định và đếm nghiệm nguyên trong [-M; M].',
    conditionSummary: 'b ∈ {2,3,4}, k ∈ [2;3], a1 ∈ [2;5], c1 ∈ [3;9], a2 ∈ [1;4], c2 ∈ [1;3], c1/a1 > c2/a2 và cận BPT < c1/a1',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b', min: 2, max: 4 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 3 },
      { name: 'a1', label: 'Hệ số a1', min: 2, max: 5 },
      { name: 'c1', label: 'Hằng số c1', min: 3, max: 9 },
      { name: 'a2', label: 'Hệ số a2', min: 1, max: 4 },
      { name: 'c2', label: 'Hằng số c2', min: 1, max: 3 },
      { name: 'M', label: 'Cận M của đoạn [-M; M]', min: 40, max: 98 },
    ],
    validateCode: `
      const { b, k, a1, c1, a2, c2, M } = params;
      if (b < 2 || b > 4 || k < 2 || k > 3 || a1 < 2 || a1 > 5 || c1 < 3 || c1 > 9 || a2 < 1 || a2 > 4 || c2 < 1 || c2 > 3 || M < 40 || M > 98) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const bk = Math.pow(b, k);
      if (bk * a2 <= a1) return { valid: false, reason: 'Cần b^k * a2 > a1' };
      if (c1 * a2 <= c2 * a1) return { valid: false, reason: 'Cần c1/a1 > c2/a2' };
      const ineqCrit = (bk * c2 - c1) / (bk * a2 - a1);
      if (ineqCrit >= c1 / a1) return { valid: false, reason: 'Cần nghiệm bất phương trình nhỏ hơn ngưỡng xác định' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k, a1, c1, a2, c2, M } = params;
      const bk = Math.pow(b, k);
      const domFrac = u.simplifyFrac(c1, a1);
      const ineqFrac = u.simplifyFrac(bk * c2 - c1, bk * a2 - a1);
      const minInt = Math.floor(domFrac.value) + 1;
      const ans = Math.max(0, M - minInt + 1);
      const lin1 = u.formatLinear(a1, -c1);
      const lin2 = u.formatLinear(a2, -c2);

      return {
        stem: 'Cho bất phương trình $\\log_{' + b + '}(' + lin1 + ') - \\log_{' + b + '}(' + lin2 + ') < ' + k + '$. Tìm số nghiệm nguyên thuộc đoạn $[-' + M + '; ' + M + ']$ của bất phương trình đã cho.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Điều kiện: $' + lin1 + ' > 0$ và $' + lin2 + ' > 0 \\Leftrightarrow x > ' + domFrac.latex + '$.',
          'Do $' + b + ' > 1$ và $' + lin2 + ' > 0$ nên $' + lin1 + ' < ' + bk + '(' + lin2 + ') \\Leftrightarrow x > ' + ineqFrac.latex + '$.',
          'Kết hợp điều kiện được $x > ' + domFrac.latex + '$. Trong đoạn $[-' + M + '; ' + M + ']$, có $' + ans + '$ nghiệm nguyên ($' + minInt + ', \\ldots, ' + M + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1, k: 3, a1: 3, c1: 5, a2: 2, c2: 1, M: 96 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q57 (95)', params: { b: 4, k: 3, a1: 3, c1: 5, a2: 2, c2: 1, M: 96 }, expectedValid: true },
    ],
  },

  // D58 (Q58): Đếm nghiệm nguyên thuộc [-M; M] của log_b(a x^2 + p x + q) < k
  t11_b21_d58_sa_log_quad_lt_count: {
    id: 't11_b21_d58_sa_log_quad_lt_count',
    name: 'Đếm nghiệm nguyên bất phương trình log_b(ax² + bx + c) < k (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải 0 < ax² + px + q < b^k và đếm số nghiệm nguyên thuộc [-M; M].',
    conditionSummary: 'cfgIdx ∈ [0; 4] với hai tam thức có nghiệm đẹp, M ∈ [40; 90]',
    paramSpecs: [
      { name: 'cfgIdx', label: 'Cấu hình tam thức (0..4)', min: 0, max: 4 },
      { name: 'M', label: 'Cận M của đoạn [-M; M]', min: 40, max: 90 },
    ],
    validateCode: `
      const { cfgIdx, M } = params;
      if (cfgIdx < 0 || cfgIdx > 4 || M < 40 || M > 90) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { cfgIdx, M } = params;
      // Mỗi cấu hình bảo đảm a x^2 + px + q > 0 tách được 2 nghiệm và 0 < ... < b^k có nghiệm nguyên rõ ràng
      const CFGS = [
        { b: 3, k: 2, a: 2, p: -1, q: -1, r1: '-\\frac{1}{2}', r2: '1', l1: '-2', l2: '\\frac{5}{2}', lo1: -2, hi1: -0.5, lo2: 1, hi2: 2.5 },
        { b: 2, k: 3, a: 1, p: -1, q: -2, r1: '-1', r2: '2', l1: '-\\frac{1 - \\sqrt{41}}{2}', l2: '\\frac{1 + \\sqrt{41}}{2}', lo1: (1 - Math.sqrt(41)) / 2, hi1: -1, lo2: 2, hi2: (1 + Math.sqrt(41)) / 2 },
        { b: 3, k: 2, a: 1, p: -2, q: -3, r1: '-1', r2: '3', l1: '1 - \\sqrt{13}', l2: '1 + \\sqrt{13}', lo1: 1 - Math.sqrt(13), hi1: -1, lo2: 3, hi2: 1 + Math.sqrt(13) },
        { b: 2, k: 4, a: 1, p: -3, q: -4, r1: '-1', r2: '4', l1: '-\\frac{-3 + \\sqrt{89}}{2}', l2: '\\frac{3 + \\sqrt{89}}{2}', lo1: (3 - Math.sqrt(89)) / 2, hi1: -1, lo2: 4, hi2: (3 + Math.sqrt(89)) / 2 },
        { b: 5, k: 2, a: 1, p: 0, q: -9, r1: '-3', r2: '3', l1: '-\\sqrt{34}', l2: '\\sqrt{34}', lo1: -Math.sqrt(34), hi1: -3, lo2: 3, hi2: Math.sqrt(34) },
      ];
      const cfg = CFGS[cfgIdx];
      const poly = u.formatQuadratic(cfg.a, cfg.p, cfg.q);
      const bk = Math.pow(cfg.b, cfg.k);
      const polyShift = u.formatQuadratic(cfg.a, cfg.p, cfg.q - bk);
      let count = 0;
      for (let x = -M; x <= M; x++) {
        const v = cfg.a * x * x + cfg.p * x + cfg.q;
        if (v > 0 && v < bk) count++;
      }

      return {
        stem: 'Cho bất phương trình $\\log_{' + cfg.b + '}(' + poly + ') < ' + cfg.k + '$. Tìm số nghiệm nguyên thuộc đoạn $[-' + M + '; ' + M + ']$ của bất phương trình đã cho.',
        shortAnswer: String(count),
        numericValue: count,
        answerSummary: String(count),
        solutionSteps: [
          'Điều kiện: $' + poly + ' > 0 \\Leftrightarrow x < ' + cfg.r1 + '$ hoặc $x > ' + cfg.r2 + '$.',
          'Bất phương trình $\\Leftrightarrow ' + polyShift + ' < 0 \\Leftrightarrow ' + (cfg.lo1).toFixed(2).replace('.', ',') + ' < x < ' + (cfg.hi2).toFixed(2).replace('.', ',') + '$.',
          'Kết hợp điều kiện, đếm các giá trị nguyên thuộc $[-' + M + '; ' + M + ']$ thu được $' + count + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cfgIdx = 5', params: { cfgIdx: 5, M: 63 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q58 (2)', params: { cfgIdx: 0, M: 63 }, expectedValid: true },
    ],
  },

  // D59 (Q59): Đếm nghiệm nguyên thuộc (-M; M) của k + log_b(x + r1) > log_b((x+r1)(x-r2))
  t11_b21_d59_sa_log_factor_cancel_count: {
    id: 't11_b21_d59_sa_log_factor_cancel_count',
    name: 'Đếm nghiệm nguyên bất phương trình k + log_b(x + r1) > log_b((x + r1)(x - r2)) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đặt nhân tử chung (x + r1)(x - r2) trong lôgarit và đếm số nghiệm nguyên thuộc khoảng (-M; M).',
    conditionSummary: 'b ∈ {2,3}, k ∈ [1;2], r1 ∈ [4;9], r2 ∈ [2;5], M ∈ [40; 99]',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b', min: 2, max: 3 },
      { name: 'k', label: 'Hằng số k', min: 1, max: 2 },
      { name: 'r1', label: 'Hằng số r1', min: 4, max: 9 },
      { name: 'r2', label: 'Hằng số r2', min: 2, max: 5 },
      { name: 'M', label: 'Cận M của khoảng (-M; M)', min: 40, max: 99 },
    ],
    validateCode: `
      const { b, k, r1, r2, M } = params;
      if ((b !== 2 && b !== 3) || (k !== 1 && k !== 2) || r1 < 4 || r1 > 9 || r2 < 2 || r2 > 5 || M < 40 || M > 99) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (r2 + Math.pow(b, k) >= M) return { valid: false, reason: 'Khoảng nghiệm phải nằm trong (-M; M)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k, r1, r2, M } = params;
      const bk = Math.pow(b, k);
      const quadTex = u.formatQuadratic(1, r1 - r2, -r1 * r2);
      const hiBound = r2 + bk;
      const ans = bk - 1;

      return {
        stem: 'Cho bất phương trình $' + k + ' + \\log_{' + b + '}(x + ' + r1 + ') > \\log_{' + b + '}(' + quadTex + ')$. Số nghiệm nguyên thuộc khoảng $(- ' + M + '; ' + M + ')$ của bất phương trình là:',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Điều kiện: $x + ' + r1 + ' > 0$ và $(x + ' + r1 + ')(x - ' + r2 + ') > 0 \\Leftrightarrow x > ' + r2 + '$.',
          'Bất phương trình $\\Leftrightarrow \\log_{' + b + '}[' + bk + '(x + ' + r1 + ')] > \\log_{' + b + '}[(x + ' + r1 + ')(x - ' + r2 + ')]$.',
          'Vì $x + ' + r1 + ' > 0$ và $' + b + ' > 1$ nên $' + bk + ' > x - ' + r2 + ' \\Leftrightarrow x < ' + hiBound + '$.',
          'Kết hợp điều kiện được $' + r2 + ' < x < ' + hiBound + '$. Trong khoảng $(- ' + M + '; ' + M + ')$ có $' + ans + '$ nghiệm nguyên.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 4', params: { b: 4, k: 1, r1: 6, r2: 3, M: 98 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q59 (1)', params: { b: 2, k: 1, r1: 6, r2: 3, M: 98 }, expectedValid: true },
    ],
  },
};
