import { MathTemplate } from '../types/math';

export const G11_B32_MC_PART1: Record<string, MathTemplate> = {
  // Q1: Đạo hàm hàm đa thức bậc hai y = ax^2 + bx + c
  t11_b32_d01_poly2_deriv_mc: {
    id: 't11_b32_d01_poly2_deriv_mc',
    name: 'Tính đạo hàm của hàm đa thức bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số bậc hai y = ax² + bx + c.',
    conditionSummary: 'a, b, c ∈ [-9; 9], a ≠ 0, b ≠ 0, c ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (!Number.isInteger(a) || a === 0 || Math.abs(a) > 9) return { valid: false, reason: 'a ≠ 0' };
      if (!Number.isInteger(b) || b === 0 || Math.abs(b) > 9) return { valid: false, reason: 'b ≠ 0' };
      if (!Number.isInteger(c) || c === 0 || Math.abs(c) > 9) return { valid: false, reason: 'c ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const fx = u.formatPoly([a, b, c]);
      const ansExpr = u.formatLinear(2 * a, b);
      const correct = "$y'=" + ansExpr + '$';

      const cands = [
        "$y'=" + u.formatPoly([3 * a, 2 * b, b > 0 ? -Math.abs(c) : c]) + '$',
        "$y'=" + u.formatLinear(-2 * a, b) + '$',
        "$y'=" + u.formatLinear(2 * a, -b) + '$',
        "$y'=" + u.formatLinear(a, b) + '$',
        "$y'=" + u.formatPoly([a, 2 * a, b]) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        cands,
        rng,
        (idx) => "$y'=" + u.formatLinear(2 * a + idx, b + idx) + '$'
      );

      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng quy tắc tính đạo hàm hàm đa thức: $(x^2)' = 2x$, $(x)' = 1$, $(c)' = 0$.",
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -2, c: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (y=-2x^2-2x+5)', params: { a: -2, b: -2, c: 5 }, expectedValid: true },
    ],
  },

  // Q2: Đạo hàm hàm đa thức bậc 3 kết hợp k/x
  t11_b32_d02_poly3_recip_deriv_mc: {
    id: 't11_b32_d02_poly3_recip_deriv_mc',
    name: 'Tính đạo hàm của hàm bậc ba kết hợp phân thức k/x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = ax³ + bx² + cx + d + k/x.',
    conditionSummary: 'a, b, c, d, k ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -8, max: 8, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -8, max: 8, allowZero: false },
      { name: 'k', label: 'Tử số k', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d, k } = params;
      if ([a, b, c, d, k].some((v) => !Number.isInteger(v) || v === 0 || Math.abs(v) > 9)) {
        return { valid: false, reason: 'Các hệ số phải nguyên khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, k } = params;
      const fmtFracTerm = (coeff, den) => (coeff > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(coeff) + '}{' + den + '}';
      const polyPart = u.formatPoly([a, b, c, d]);
      const fx = polyPart + fmtFracTerm(k, 'x');
      const derivPoly = u.formatPoly([3 * a, 2 * b, c]);
      const ansExpr = derivPoly + fmtFracTerm(-k, 'x^{2}');
      const correct = "$y'=" + ansExpr + '$';

      const cands = [
        "$y'=" + derivPoly + fmtFracTerm(k, 'x^{2}') + '$',
        "$y'=" + derivPoly + fmtFracTerm(k, 'x') + '$',
        "$y'=" + derivPoly + fmtFracTerm(-k, 'x') + '$',
        "$y'=" + u.formatPoly([3 * a, b, c]) + fmtFracTerm(-k, 'x^{2}') + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        cands,
        rng,
        (idx) => "$y'=" + u.formatPoly([3 * a + idx, 2 * b, c]) + fmtFracTerm(-k, 'x^{2}') + '$'
      );

      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Sử dụng công thức $(\\dfrac{1}{x})' = -\\dfrac{1}{x^2}$ và đạo hàm đa thức.",
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { a: -4, b: 4, c: -3, d: 5, k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2', params: { a: -4, b: 4, c: -3, d: 5, k: 8 }, expectedValid: true },
    ],
  },

  // Q3: Đạo hàm y = a*sqrt(x) + b*x + c
  t11_b32_d03_sqrt_lin_deriv_mc: {
    id: 't11_b32_d03_sqrt_lin_deriv_mc',
    name: 'Tính đạo hàm hàm chứa căn bậc hai và bậc nhất',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = a√x + bx + c.',
    conditionSummary: 'a, b, c ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số √x (a)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số x (b)', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b, c } = params;
      if ([a, b, c].some((v) => !Number.isInteger(v) || v === 0 || Math.abs(v) > 9)) {
        return { valid: false, reason: 'Các hệ số phải khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const sqrtTerm = u.formatTerm(a, '\\sqrt{x}', true);
      const fx = sqrtTerm + u.formatTerm(b, 'x', false) + u.formatTrailingConst(c);
      const fr = u.simplifyFrac(a, 2);
      const derivSqrt = (fr.num > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(fr.num) + '}{' + (fr.den === 1 ? '' : fr.den) + '\\sqrt{x}}';
      const ansExpr = b + derivSqrt;
      const correct = "$y'=" + ansExpr + '$';

      const w1 = b + (a > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(a) + '}{\\sqrt{x}}';
      const w2 = (a > 0 ? '' : '-') + '\\dfrac{' + Math.abs(fr.num) + '\\sqrt{x}}{' + (fr.den === 1 ? '1' : fr.den) + '}' + u.formatTrailingConst(b);
      const w3 = sqrtTerm + u.formatTrailingConst(b);
      const w4 = b + (fr.num > 0 ? ' - ' : ' + ') + '\\dfrac{' + Math.abs(fr.num) + '}{' + (fr.den === 1 ? '' : fr.den) + '\\sqrt{x}}';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ["$y'=" + w1 + '$', "$y'=" + w2 + '$', "$y'=" + w3 + '$', "$y'=" + w4 + '$'],
        rng,
        (idx) => "$y'=" + (b + idx) + derivSqrt + '$'
      );

      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng công thức $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ (với $x > 0$).",
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -2, c: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (y=-3√x-2x+4)', params: { a: -3, b: -2, c: 4 }, expectedValid: true },
    ],
  },

  // Q4: Đạo hàm kết hợp căn, đa thức bậc 3 và phân thức k/x
  t11_b32_d04_mixed_poly_sqrt_recip_deriv_mc: {
    id: 't11_b32_d04_mixed_poly_sqrt_recip_deriv_mc',
    name: 'Tính đạo hàm tổng hợp đa thức, √x và k/x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = m√x + ax³ + bx² + cx + d + k/x.',
    conditionSummary: 'm, a, b, c, d, k ∈ [-6; 6] \\ {0}',
    paramSpecs: [
      { name: 'm', label: 'Hệ số √x (m)', min: -6, max: 6, allowZero: false },
      { name: 'a', label: 'Hệ số x³ (a)', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số x² (b)', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số x (c)', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hằng số d', min: -6, max: 6, allowZero: false },
      { name: 'k', label: 'Hệ số 1/x (k)', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { m, a, b, c, d, k } = params;
      if ([m, a, b, c, d, k].some((v) => !Number.isInteger(v) || v === 0)) {
        return { valid: false, reason: 'Các hệ số phải khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, a, b, c, d, k } = params;
      const fmtFrac = (coeff, den) => (coeff > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(coeff) + '}{' + den + '}';
      const fx = u.formatTerm(m, '\\sqrt{x}', true)
        + u.formatTerm(a, 'x^{3}', false)
        + u.formatTerm(b, 'x^{2}', false)
        + u.formatTerm(c, 'x', false)
        + u.formatTrailingConst(d)
        + fmtFrac(k, 'x');

      const polyD = u.formatPoly([3 * a, 2 * b, c]);
      const fr = u.simplifyFrac(m, 2);
      const sqrtD = (fr.num > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(fr.num) + '}{' + (fr.den === 1 ? '' : fr.den) + '\\sqrt{x}}';
      const ansExpr = polyD + fmtFrac(-k, 'x^{2}') + sqrtD;
      const correct = "$y'=" + ansExpr + '$';

      const cands = [
        "$y'=" + u.formatTerm(fr.num, '\\sqrt{x}', true) + u.formatTerm(3 * a, 'x^{2}', false) + u.formatTerm(2 * b, 'x', false) + u.formatTrailingConst(c) + fmtFrac(-k, 'x^{2}') + '$',
        "$y'=" + u.formatTerm(m, '\\sqrt{x}', true) + u.formatTerm(3 * a, 'x^{2}', false) + u.formatTerm(2 * b, 'x', false) + u.formatTrailingConst(c) + fmtFrac(-k, 'x^{2}') + '$',
        "$y'=" + polyD + fmtFrac(k, 'x^{2}') + sqrtD + '$',
        "$y'=" + polyD + fmtFrac(-k, 'x^{2}') + (fr.num > 0 ? ' - ' : ' + ') + '\\dfrac{' + Math.abs(fr.num) + '}{' + (fr.den === 1 ? '' : fr.den) + '\\sqrt{x}}' + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        cands,
        rng,
        (idx) => "$y'=" + u.formatPoly([3 * a + idx, 2 * b, c]) + fmtFrac(-k, 'x^{2}') + sqrtD + '$'
      );

      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng quy tắc đạo hàm tổng, hiệu cùng $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ và $(\\dfrac{1}{x})' = -\\dfrac{1}{x^2}$.",
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { m: 0, a: 1, b: -4, c: -3, d: 3, k: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { m: -2, a: 1, b: -4, c: -3, d: 3, k: -5 }, expectedValid: true },
    ],
  },

  // Q5: Đạo hàm hàm bậc nhất tại điểm x = x0
  t11_b32_d05_lin_deriv_at_x0_mc: {
    id: 't11_b32_d05_lin_deriv_at_x0_mc',
    name: 'Tính đạo hàm của hàm bậc nhất tại điểm x₀',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Cho hàm số bậc nhất y = ax + b, tính đạo hàm tại điểm x = x₀.',
    conditionSummary: 'a ∈ [-15; 15] \\ {0}, b ∈ [-15; 15], x₀ ∈ [-5; 5]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -15, max: 15, allowZero: false },
      { name: 'b', label: 'Hệ số tự do b', min: -15, max: 15 },
      { name: 'x0', label: 'Điểm x₀', min: -5, max: 5 },
    ],
    validateCode: `
      const { a, b, x0 } = params;
      if (!Number.isInteger(a) || a === 0 || Math.abs(a) > 15) return { valid: false, reason: 'a ≠ 0' };
      if (!Number.isInteger(b) || !Number.isInteger(x0)) return { valid: false, reason: 'Tham số phải nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0 } = params;
      const fx = u.formatLinear(a, b);
      const ans = a;
      const correct = '$' + ans + '$';
      const cands = [
        '$' + (-a) + '$',
        '$' + (2 * a) + '$',
        '$' + (-2 * a) + '$',
        '$' + (a * x0 + b) + '$',
        '$' + (a + b) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        cands,
        rng,
        (idx) => '$' + (ans + idx * 3 + 1) + '$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ tại điểm $x=' + x0 + '$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          "Ta có $f'(x)=" + ans + " \\Rightarrow f'(" + x0 + ')=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -11, x0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (y=11x-11 tại x=0)', params: { a: 11, b: -11, x0: 0 }, expectedValid: true },
    ],
  },

  // Q6: Đạo hàm hàm phân thức bậc nhất trên bậc nhất tại điểm x0
  t11_b32_d06_homographic_deriv_at_x0_mc: {
    id: 't11_b32_d06_homographic_deriv_at_x0_mc',
    name: 'Tính đạo hàm hàm phân thức (ax+b)/(cx+d) tại điểm x₀',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = (ax + b)/(cx + d) tại điểm x = x₀.',
    conditionSummary: 'ad - bc ≠ 0, c ≠ 0, cx₀ + d ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -7, max: 7 },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -9, max: 9 },
      { name: 'x0', label: 'Điểm x₀', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, c, d, x0 } = params;
      if (c === 0 || a * d - b * c === 0) return { valid: false, reason: 'Hàm số suy biến thành hằng số' };
      if (c * x0 + d === 0) return { valid: false, reason: 'x₀ làm mẫu số bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, x0 } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const denomVal = c * x0 + d;
      const ansFr = u.simplifyFrac(det, denomVal * denomVal);
      const correct = '$' + ansFr.latex + '$';

      const w1 = u.simplifyFrac(-det, denomVal * denomVal).latex;
      const w2 = u.simplifyFrac(a * x0 + b, denomVal).latex;
      const w3 = u.simplifyFrac(det, denomVal).latex;
      const altDen = (Math.abs(denomVal) - 2) !== 0 ? (Math.abs(denomVal) - 2) : (Math.abs(denomVal) + 2);
      const w4 = u.simplifyFrac(det, altDen * altDen).latex;

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1 + '$', '$' + w2 + '$', '$' + w3 + '$', '$' + w4 + '$'],
        rng,
        (idx) => '$' + u.simplifyFrac(det + idx, denomVal * denomVal).latex + '$'
      );

      return {
        stem: 'Đạo hàm của hàm số $y=\\dfrac{' + numStr + '}{' + denStr + '}$ tại điểm $x=' + x0 + '$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ansFr.latex + '$',
        solutionSteps: [
          "Ta có $f'(x) = \\dfrac{" + det + '}{(' + denStr + ')^2}$.',
          "Thay $x=" + x0 + "$ vào ta được $f'(" + x0 + ') = ' + ansFr.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu bằng 0 tại x0', params: { a: -3, b: -2, c: -2, d: 4, x0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6', params: { a: -3, b: -2, c: -2, d: -7, x0: 2 }, expectedValid: true },
    ],
  },

  // Q7: Đạo hàm y = a√x + bx² + c tại điểm x0 > 0
  t11_b32_d07_sqrt_quad_deriv_at_x0_mc: {
    id: 't11_b32_d07_sqrt_quad_deriv_at_x0_mc',
    name: 'Tính đạo hàm của hàm chứa √x và bậc hai tại x₀',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = a√x + bx² + c tại điểm x = x₀ > 0.',
    conditionSummary: 'a, b ≠ 0, x₀ ∈ {2, 3, 5, 6, 7} (không chính phương)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số √x (a)', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số x² (b)', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -12, max: 12 },
      { name: 'xIdx', label: 'Chỉ số x₀ ∈ {2,3,5,6,7}', min: 0, max: 4 },
    ],
    validateCode: `
      const { a, b, xIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      if (!Number.isInteger(xIdx) || xIdx < 0 || xIdx > 4) return { valid: false, reason: 'xIdx ngoài [0; 4]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, xIdx } = params;
      const X_LIST = [2, 3, 5, 6, 7];
      const x0 = X_LIST[xIdx];
      const fx = u.formatTerm(a, '\\sqrt{x}', true) + u.formatTerm(b, 'x^{2}', false) + u.formatTrailingConst(c);

      const polyCoeff = 2 * b;
      const linVal = polyCoeff * x0;
      const frSqrt = u.simplifyFrac(a, 2 * x0); // coeff * sqrt(x0)
      const fmtRadTerm = (fr, rad) => {
        const sgn = fr.num > 0 ? ' + ' : ' - ';
        const absN = Math.abs(fr.num);
        const numPart = (absN === 1 ? '' : absN) + '\\sqrt{' + rad + '}';
        return fr.den === 1 ? (sgn + numPart) : (sgn + '\\frac{' + numPart + '}{' + fr.den + '}');
      };

      const ansExpr = linVal + fmtRadTerm(frSqrt, x0);
      const correct = '$' + ansExpr + '$';

      const frDeriv = u.simplifyFrac(a, 2);
      const derivExpr = (2 * b) + 'x' + (frDeriv.num > 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(frDeriv.num) + '}{' + (frDeriv.den === 1 ? '' : frDeriv.den) + '\\sqrt{x}}';

      const wrong1 = linVal + (a > 0 ? ' + ' : ' - ') + Math.abs(a) + '\\sqrt{' + (x0 + 1) + '}';
      const wrong2 = (-linVal) + fmtRadTerm(frSqrt, x0);
      const wrong3 = (2 * b) + fmtRadTerm(u.simplifyFrac(-a, 2 * x0), x0);
      const wrong4 = linVal + fmtRadTerm(u.simplifyFrac(-a, 2 * x0), x0);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + wrong1 + '$', '$' + wrong2 + '$', '$' + wrong3 + '$', '$' + wrong4 + '$'],
        rng,
        (idx) => '$' + (linVal + idx) + fmtRadTerm(frSqrt, x0) + '$'
      );

      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ tại điểm $x=' + x0 + '$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ansExpr + '$',
        solutionSteps: [
          "Ta có $f'(x) = " + derivExpr + '$.',
          "Thay $x=" + x0 + "$ vào ta được $f'(" + x0 + ') = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 2, c: -10, xIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (y=-6√x+2x²-10 tại x=2)', params: { a: -6, b: 2, c: -10, xIdx: 0 }, expectedValid: true },
    ],
  },

  // Q8: Đạo hàm y = a*sin(kx)
  t11_b32_d08_sin_kx_deriv_mc: {
    id: 't11_b32_d08_sin_kx_deriv_mc',
    name: 'Tính đạo hàm hàm lượng giác y = a sin(kx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính đạo hàm của hàm số y = a sin(kx).',
    conditionSummary: 'a ∈ [-12; 12] \\ {0}, k ∈ [2; 10]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -12, max: 12, allowZero: false },
      { name: 'k', label: 'Hệ số góc k', min: 2, max: 10 },
    ],
    validateCode: `
      const { a, k } = params;
      if (a === 0 || Math.abs(a) > 12 || k < 2 || k > 10) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k } = params;
      const fx = u.formatTerm(a, '\\sin ' + k + 'x', true);
      const ak = a * k;
      const ansExpr = ak + ' \\cos ' + k + 'x';
      const correct = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          "$y'=" + (-ak) + ' \\sin ' + k + 'x$',
          "$y'=" + ak + ' \\cos x$',
          "$y'=" + (-ak) + ' \\cos ' + k + 'x$',
          "$y'=" + fx + '$',
        ],
        rng,
        (idx) => "$y'=" + (ak + idx * 2) + ' \\cos ' + k + 'x$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng công thức $(\\sin u)' = u'\\cos u$ với $u = " + k + 'x$.',
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { a: 10, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (y=10sin8x)', params: { a: 10, k: 8 }, expectedValid: true },
    ],
  },

  // Q9: Đạo hàm y = a*cos(kx)
  t11_b32_d09_cos_kx_deriv_mc: {
    id: 't11_b32_d09_cos_kx_deriv_mc',
    name: 'Tính đạo hàm hàm lượng giác y = a cos(kx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính đạo hàm của hàm số y = a cos(kx).',
    conditionSummary: 'a ∈ [-10; 10] \\ {0}, k ∈ [2; 10]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -10, max: 10, allowZero: false },
      { name: 'k', label: 'Hệ số góc k', min: 2, max: 10 },
    ],
    validateCode: `
      const { a, k } = params;
      if (a === 0 || k < 2 || k > 10) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k } = params;
      const fx = u.formatTerm(a, '\\cos ' + k + 'x', true);
      const ak = -a * k;
      const ansExpr = ak + ' \\sin ' + k + 'x';
      const correct = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          "$y'=" + (-ak) + ' \\sin ' + k + 'x$',
          "$y'=" + ak + ' \\sin x$',
          "$y'=" + Math.abs(a * k) + ' \\cos ' + k + 'x$',
          "$y'=" + u.formatTerm(a, '\\sin ' + k + 'x', true) + '$',
        ],
        rng,
        (idx) => "$y'=" + (ak - idx) + ' \\sin ' + k + 'x$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng công thức $(\\cos u)' = -u'\\sin u$ với $u = " + k + 'x$.',
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (y=cos2x)', params: { a: 1, k: 2 }, expectedValid: true },
    ],
  },

  // Q10: Đạo hàm y = a*sin(x) + b*cos(x)
  t11_b32_d10_lin_sin_cos_deriv_mc: {
    id: 't11_b32_d10_lin_sin_cos_deriv_mc',
    name: 'Tính đạo hàm tổ hợp tuyến tính a sin x + b cos x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính đạo hàm của hàm số y = a sin x + b cos x.',
    conditionSummary: 'a, b ∈ [-10; 10] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số sin x (a)', min: -10, max: 10, allowZero: false },
      { name: 'b', label: 'Hệ số cos x (b)', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false);
      const fmtTrig = (sCoeff, cCoeff) => u.formatTerm(sCoeff, '\\sin x', true) + u.formatTerm(cCoeff, '\\cos x', false);
      const ansExpr = fmtTrig(-b, a);
      const correct = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          "$y'=" + fmtTrig(b, a) + '$',
          "$y'=" + fmtTrig(-b, -a) + '$',
          "$y'=" + fmtTrig(b, -a) + '$',
          "$y'=" + fmtTrig(a, b) + '$',
        ],
        rng,
        (idx) => "$y'=" + fmtTrig(-b + idx, a) + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng $(\\sin x)' = \\cos x$ và $(\\cos x)' = -\\sin x$.",
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 3, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (y=3sinx-8cosx)', params: { a: 3, b: -8 }, expectedValid: true },
    ],
  },

  // Q11: Đạo hàm y = a*tan(x) + b*cot(x)
  t11_b32_d11_lin_tan_cot_deriv_mc: {
    id: 't11_b32_d11_lin_tan_cot_deriv_mc',
    name: 'Tính đạo hàm tổ hợp a tan x + b cot x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính đạo hàm của hàm số y = a tan x + b cot x.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số tan x (a)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số cot x (b)', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = u.formatTerm(a, '\\tan x', true) + u.formatTerm(b, '\\cot x', false);
      const fmtExpr = (c1, d1, c2, d2) => {
        const s1 = c1 < 0 ? '-' : '';
        const s2 = c2 < 0 ? ' - ' : ' + ';
        return s1 + '\\dfrac{' + Math.abs(c1) + '}{' + d1 + '}' + s2 + '\\dfrac{' + Math.abs(c2) + '}{' + d2 + '}';
      };
      const ansExpr = fmtExpr(a, '\\cos^{2}x', -b, '\\sin^{2}x');
      const correct = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          "$y'=" + fmtExpr(a, '\\cos^{2}x', b, '\\sin^{2}x') + '$',
          "$y'=" + fmtExpr(a, '\\cos x', -b, '\\sin x') + '$',
          "$y'=" + u.formatTerm(b, '\\tan x', true) + u.formatTerm(a, '\\cot x', false) + '$',
          "$y'=" + fmtExpr(-a, '\\cos^{2}x', -b, '\\sin^{2}x') + '$',
        ],
        rng,
        (idx) => "$y'=" + fmtExpr(a + idx, '\\cos^{2}x', -b, '\\sin^{2}x') + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng $(\\tan x)' = \\dfrac{1}{\\cos^2 x}$ và $(\\cot x)' = -\\dfrac{1}{\\sin^2 x}$.",
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (y=-tanx-6cotx)', params: { a: -1, b: -6 }, expectedValid: true },
    ],
  },

  // Q12: Đạo hàm y = a*tan(kx)
  t11_b32_d12_tan_kx_deriv_mc: {
    id: 't11_b32_d12_tan_kx_deriv_mc',
    name: 'Tính đạo hàm hàm hợp y = a tan(kx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính đạo hàm của hàm số y = a tan(kx).',
    conditionSummary: 'a ∈ [-9; 9] \\ {0}, k ∈ [2; 9]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'k', label: 'Hệ số góc k', min: 2, max: 9 },
    ],
    validateCode: `
      const { a, k } = params;
      if (a === 0 || k < 2 || k > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k } = params;
      const fx = u.formatTerm(a, '\\tan ' + k + 'x', true);
      const ak = a * k;
      const fmtOne = (num, den) => (num < 0 ? '-' : '') + '\\dfrac{' + Math.abs(num) + '}{' + den + '}';
      const ansExpr = fmtOne(ak, '\\cos^{2}' + k + 'x');
      const correct = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          "$y'=" + fmtOne(-ak, '\\cos^{2}' + k + 'x') + '$',
          "$y'=" + fmtOne(a, '\\sin^{2}' + k + 'x') + '$',
          "$y'=" + (-ak) + ' \\cot ' + k + 'x$',
          "$y'=" + fmtOne(ak, '\\sin^{2}' + k + 'x') + '$',
        ],
        rng,
        (idx) => "$y'=" + fmtOne(ak + idx, '\\cos^{2}' + k + 'x') + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng $(\\tan u)' = \\dfrac{u'}{\\cos^2 u}$ với $u = " + k + 'x$.',
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { a: 4, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (y=4tan6x)', params: { a: 4, k: 6 }, expectedValid: true },
    ],
  },

  // Q13: Đạo hàm y = a*cot(kx)
  t11_b32_d13_cot_kx_deriv_mc: {
    id: 't11_b32_d13_cot_kx_deriv_mc',
    name: 'Tính đạo hàm hàm hợp y = a cot(kx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính đạo hàm của hàm số y = a cot(kx).',
    conditionSummary: 'a ∈ [-9; 9] \\ {0}, k ∈ [2; 9]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'k', label: 'Hệ số góc k', min: 2, max: 9 },
    ],
    validateCode: `
      const { a, k } = params;
      if (a === 0 || k < 2 || k > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k } = params;
      const fx = u.formatTerm(a, '\\cot ' + k + 'x', true);
      const num = -a * k;
      const fmtOne = (n, den) => (n < 0 ? '-' : '') + '\\dfrac{' + Math.abs(n) + '}{' + den + '}';
      const ansExpr = fmtOne(num, '\\sin^{2}' + k + 'x');
      const correct = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          "$y'=" + fmtOne(num, '\\cos^{2}' + k + 'x') + '$',
          "$y'=" + fmtOne(-num, '\\sin^{2}' + k + 'x') + '$',
          "$y'=" + num + ' \\tan ' + k + 'x$',
          "$y'=" + fmtOne(a, '\\cos^{2}' + k + 'x') + '$',
        ],
        rng,
        (idx) => "$y'=" + fmtOne(num + idx, '\\sin^{2}' + k + 'x') + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: "$y'=" + ansExpr + '$',
        solutionSteps: [
          "Áp dụng $(\\cot u)' = -\\dfrac{u'}{\\sin^2 u}$ với $u = " + k + 'x$.',
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, k: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (y=-6cot8x)', params: { a: -6, k: 8 }, expectedValid: true },
    ],
  },

  // Q14: Đạo hàm y = a sin(kx) tại góc đặc biệt
  t11_b32_d14_sin_kx_deriv_at_angle_mc: {
    id: 't11_b32_d14_sin_kx_deriv_at_angle_mc',
    name: 'Tính đạo hàm hàm y = a sin(kx) tại điểm x₀',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính giá trị đạo hàm của hàm số y = a sin(kx) tại góc đặc biệt x = pπ/q.',
    conditionSummary: 'a ∈ [-6; 6] \\ {0}, k ∈ [2; 7], cos(k·x₀) ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'k', label: 'Hệ số góc k', min: 2, max: 7 },
      { name: 'angIdx', label: 'Góc x₀ (0..6)', min: 0, max: 6 },
    ],
    validateCode: `
      const { a, k, angIdx } = params;
      if (a === 0 || k < 2 || k > 7 || angIdx < 0 || angIdx > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      const DEGS = [30, 45, 60, 120, 135, 150, 240];
      const deg = (k * DEGS[angIdx]) % 360;
      if (deg === 90 || deg === 270) return { valid: false, reason: 'cos(kx₀) = 0 quá đơn giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k, angIdx } = params;
      const ANGS = [
        { deg: 30, latex: '\\frac{\\pi}{6}' },
        { deg: 45, latex: '\\frac{\\pi}{4}' },
        { deg: 60, latex: '\\frac{\\pi}{3}' },
        { deg: 120, latex: '\\frac{2\\pi}{3}' },
        { deg: 135, latex: '\\frac{3\\pi}{4}' },
        { deg: 150, latex: '\\frac{5\\pi}{6}' },
        { deg: 240, latex: '\\frac{4\\pi}{3}' },
      ];
      const ang = ANGS[angIdx];
      const deg = ((k * ang.deg) % 360 + 360) % 360;
      // Exact cos(deg) = (num * sqrt(rad)) / den
      const COS_TABLE = {
        0: { num: 1, den: 1, rad: 1 },
        30: { num: 1, den: 2, rad: 3 },
        45: { num: 1, den: 2, rad: 2 },
        60: { num: 1, den: 2, rad: 1 },
        120: { num: -1, den: 2, rad: 1 },
        135: { num: -1, den: 2, rad: 2 },
        150: { num: -1, den: 2, rad: 3 },
        180: { num: -1, den: 1, rad: 1 },
        210: { num: -1, den: 2, rad: 3 },
        225: { num: -1, den: 2, rad: 2 },
        240: { num: -1, den: 2, rad: 1 },
        300: { num: 1, den: 2, rad: 1 },
        315: { num: 1, den: 2, rad: 2 },
        330: { num: 1, den: 2, rad: 3 },
      };
      const cVal = COS_TABLE[deg];
      const fmtRad = (coeff, den, rad) => {
        const fr = u.simplifyFrac(coeff, den);
        if (fr.num === 0) return '0';
        const sgn = fr.num < 0 ? '-' : '';
        const absN = Math.abs(fr.num);
        if (rad === 1) return fr.latex;
        const top = (absN === 1 ? '' : absN) + '\\sqrt{' + rad + '}';
        return fr.den === 1 ? (sgn + top) : (sgn + '\\frac{' + top + '}{' + fr.den + '}');
      };

      const ansLatex = fmtRad(a * k * cVal.num, cVal.den, cVal.rad);
      const fx = u.formatTerm(a, '\\sin(' + k + 'x)', true);
      const ak = a * k;
      const correct = '$' + ansLatex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + ak + '$',
          '$0$',
          '$' + fmtRad(-a * k * cVal.num, cVal.den, cVal.rad) + '$',
          '$' + fmtRad(a * k, 2, cVal.rad === 1 ? 2 : 1) + '$',
        ],
        rng,
        (idx) => '$' + (ak + idx) + '$'
      );

      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ tại điểm $x=' + ang.latex + '$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ansLatex + '$',
        solutionSteps: [
          "Ta có $f'(x) = " + ak + '\\cos(' + k + 'x)$.',
          "Thay $x=" + ang.latex + "$ vào ta được $f'(" + ang.latex + ') = ' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cos(kx₀) = 0', params: { a: 2, k: 2, angIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (y=2sin5x tại 3π/4)', params: { a: 2, k: 5, angIdx: 4 }, expectedValid: true },
    ],
  },

  // Q15: Đạo hàm y = a sin x + b cos x tại điểm x₀
  t11_b32_d15_lin_trig_deriv_at_angle_mc: {
    id: 't11_b32_d15_lin_trig_deriv_at_angle_mc',
    name: 'Tính đạo hàm hàm y = a sin x + b cos x tại điểm x₀',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính giá trị đạo hàm của hàm số y = a sin x + b cos x tại góc đặc biệt x₀.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0}, x₀ ∈ {0, π/6, π/3, π/2, 2π/3, 5π/6, π}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số sin x (a)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số cos x (b)', min: -9, max: 9, allowZero: false },
      { name: 'angIdx', label: 'Góc x₀ (0..6)', min: 0, max: 6 },
    ],
    validateCode: `
      const { a, b, angIdx } = params;
      if (a === 0 || b === 0 || angIdx < 0 || angIdx > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, angIdx } = params;
      // Only angles where sin and cos combine into single rational or single sqrt(3) + rational cleanly:
      // 0, pi/6, pi/3, pi/2, 2pi/3, 5pi/6, pi
      const ANGS = [
        { latex: '0', cNum: 1, cDen: 1, cRad: 1, sNum: 0, sDen: 1, sRad: 1 },
        { latex: '\\frac{\\pi}{6}', cNum: 1, cDen: 2, cRad: 3, sNum: 1, sDen: 2, sRad: 1 },
        { latex: '\\frac{\\pi}{3}', cNum: 1, cDen: 2, cRad: 1, sNum: 1, sDen: 2, sRad: 3 },
        { latex: '\\frac{\\pi}{2}', cNum: 0, cDen: 1, cRad: 1, sNum: 1, sDen: 1, sRad: 1 },
        { latex: '\\frac{2\\pi}{3}', cNum: -1, cDen: 2, cRad: 1, sNum: 1, sDen: 2, sRad: 3 },
        { latex: '\\frac{5\\pi}{6}', cNum: -1, cDen: 2, cRad: 3, sNum: 1, sDen: 2, sRad: 1 },
        { latex: '\\pi', cNum: -1, cDen: 1, cRad: 1, sNum: 0, sDen: 1, sRad: 1 },
      ];
      const ang = ANGS[angIdx];
      // f'(x) = a cos x - b sin x
      const fmtRadSum = (rNum, rDen, s3Num, s3Den) => {
        const frR = u.simplifyFrac(rNum, rDen);
        const frS = u.simplifyFrac(s3Num, s3Den);
        const parts = [];
        if (frR.num !== 0) parts.push(frR.latex);
        if (frS.num !== 0) {
          const absN = Math.abs(frS.num);
          const top = (absN === 1 ? '' : absN) + '\\sqrt{3}';
          const mag = frS.den === 1 ? top : '\\frac{' + top + '}{' + frS.den + '}';
          if (parts.length === 0) parts.push((frS.num < 0 ? '-' : '') + mag);
          else parts.push((frS.num < 0 ? ' - ' : ' + ') + mag);
        }
        return parts.length > 0 ? parts.join('') : '0';
      };

      const rNum = (ang.cRad === 1 ? a * ang.cNum : 0) + (ang.sRad === 1 ? -b * ang.sNum : 0);
      const rDen = ang.cRad === 1 ? ang.cDen : ang.sDen;
      const s3Num = (ang.cRad === 3 ? a * ang.cNum : 0) + (ang.sRad === 3 ? -b * ang.sNum : 0);
      const s3Den = ang.cRad === 3 ? ang.cDen : ang.sDen;

      const ansLatex = fmtRadSum(rNum, rDen, s3Num, s3Den);
      const fx = u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false);
      const fprime = u.formatTerm(-b, '\\sin x', true) + u.formatTerm(a, '\\cos x', false);
      const correct = '$' + ansLatex + '$';

      const w1 = fmtRadSum(rNum === 0 ? b : -rNum, rDen, -s3Num, s3Den);
      const w2 = '$' + b + '$';
      const w3 = '$' + fmtRadSum(1, 2, Math.abs(b), 2) + '$';
      const w4 = '$' + fmtRadSum(-b, 1, a, 2) + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1 + '$', w2, w3, w4],
        rng,
        (idx) => '$' + (a + b + idx) + '$'
      );

      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ tại điểm $x=' + ang.latex + '$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ansLatex + '$',
        solutionSteps: [
          "Ta có $f'(x) = " + fprime + '$.',
          "Thay $x=" + ang.latex + "$ vào ta được $f'(" + ang.latex + ') = ' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 7, angIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (y=-sinx+7cosx tại x=0)', params: { a: -1, b: 7, angIdx: 0 }, expectedValid: true },
    ],
  },

  // Q16: Đạo hàm y = c + a tan x tại x₀
  t11_b32_d16_const_tan_deriv_at_angle_mc: {
    id: 't11_b32_d16_const_tan_deriv_at_angle_mc',
    name: 'Tính đạo hàm hàm y = c + a tan x tại điểm x₀',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Tính giá trị đạo hàm của hàm số y = c + a tan x tại góc đặc biệt x₀.',
    conditionSummary: 'a ∈ [-9; 9] \\ {0}, c ∈ [-9; 9], x₀ ∈ {π/6, π/4, π/3, 2π/3, 3π/4, 5π/6}',
    paramSpecs: [
      { name: 'c', label: 'Hằng số c', min: -9, max: 9 },
      { name: 'a', label: 'Hệ số tan x (a)', min: -9, max: 9, allowZero: false },
      { name: 'angIdx', label: 'Góc x₀ (0..5)', min: 0, max: 5 },
    ],
    validateCode: `
      const { a, angIdx } = params;
      if (a === 0 || angIdx < 0 || angIdx > 5) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, a, angIdx } = params;
      const ANGS = [
        { latex: '\\frac{\\pi}{6}', cos2Num: 3, cos2Den: 4 },
        { latex: '\\frac{\\pi}{4}', cos2Num: 1, cos2Den: 2 },
        { latex: '\\frac{\\pi}{3}', cos2Num: 1, cos2Den: 4 },
        { latex: '\\frac{2\\pi}{3}', cos2Num: 1, cos2Den: 4 },
        { latex: '\\frac{3\\pi}{4}', cos2Num: 1, cos2Den: 2 },
        { latex: '\\frac{5\\pi}{6}', cos2Num: 3, cos2Den: 4 },
      ];
      const ang = ANGS[angIdx];
      const ansFr = u.simplifyFrac(a * ang.cos2Den, ang.cos2Num);
      const fx = (c === 0 ? u.formatTerm(a, '\\tan x', true) : c + u.formatTerm(a, '\\tan x', false));
      const fprime = (a < 0 ? '-' : '') + '\\frac{' + Math.abs(a) + '}{\\cos^{2}x}';
      const correct = '$' + ansFr.latex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + u.simplifyFrac(-a * ang.cos2Den, ang.cos2Num).latex + '$',
          '$' + (ansFr.num - 2) + '$',
          '$' + (c - a) + '$',
          '$\\sqrt{3} + ' + Math.abs(c) + '$',
        ],
        rng,
        (idx) => '$' + u.simplifyFrac(a * ang.cos2Den + idx * 3, ang.cos2Num).latex + '$'
      );

      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ tại điểm $x=' + ang.latex + '$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ansFr.latex + '$',
        solutionSteps: [
          "Ta có $f'(x) = " + fprime + '$.',
          "Thay $x=" + ang.latex + "$ vào ta được $f'(" + ang.latex + ') = ' + ansFr.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { c: 2, a: 0, angIdx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (y=2-3tanx tại 5π/6)', params: { c: 2, a: -3, angIdx: 5 }, expectedValid: true },
    ],
  },
};
