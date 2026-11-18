import { MathTemplate } from '../types/math';

export const G11_B32_MC_PART3: Record<string, MathTemplate> = {
  // Q33: Đạo hàm y = (ax + b) sin x
  t11_b32_d33_lin_sin_prod_deriv_mc: {
    id: 't11_b32_d33_lin_sin_prod_deriv_mc',
    name: 'Tính đạo hàm hàm tích y = (ax + b) sin x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = (ax + b) sin x.',
    conditionSummary: 'a, b ∈ [-10; 10] \\ {0}, |a| ≠ |b|',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -10, max: 10, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lin = u.formatLinear(a, b);
      const ansExpr = '\\left(' + lin + '\\right)\\cos x' + u.formatTerm(a, '\\sin x', false);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\left(" + lin + '\\right)\\cos x' + u.formatTerm(-a, '\\sin x', false) + '$',
          "$y'=" + u.formatTerm(a, '\\cos x', true) + '$',
          "$y'=" + u.formatTerm(b, '\\sin x', true) + u.formatTerm(a, '\\cos x', false) + '$',
          "$y'=" + u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false) + '$',
        ],
        rng,
        (idx) => "$y'=\\left(" + lin + '\\right)\\cos x' + u.formatTerm(a + idx, '\\sin x', false) + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\left(' + lin + '\\right) \\sin x$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng quy tắc đạo hàm tích $(uv)' = u'v + uv'$:",
          "$y'=(" + lin + ")'\\sin x + (" + lin + ")(\\sin x)' = " + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 5, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 ((5x+10)sin x)', params: { a: 5, b: 10 }, expectedValid: true },
    ],
  },

  // Q34: Đạo hàm y = (ax + b) cos x
  t11_b32_d34_lin_cos_prod_deriv_mc: {
    id: 't11_b32_d34_lin_cos_prod_deriv_mc',
    name: 'Tính đạo hàm hàm tích y = (ax + b) cos x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = (ax + b) cos x.',
    conditionSummary: 'a, b ∈ [-10; 10] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -10, max: 10, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lin = u.formatLinear(a, b);
      const negLin = u.formatLinear(-a, -b);
      const ansExpr = '\\left(' + negLin + '\\right)\\sin x' + u.formatTerm(a, '\\cos x', false);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\left(" + lin + '\\right)\\sin x' + u.formatTerm(a, '\\cos x', false) + '$',
          "$y'=" + u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false) + '$',
          "$y'=" + u.formatTerm(b, '\\sin x', true) + u.formatTerm(a, '\\cos x', false) + '$',
          "$y'=\\left(" + negLin + '\\right)\\sin x' + u.formatTerm(-a, '\\cos x', false) + '$',
        ],
        rng,
        (idx) => "$y'=\\left(" + negLin + '\\right)\\sin x' + u.formatTerm(a + idx, '\\cos x', false) + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\left(' + lin + '\\right) \\cos x$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng quy tắc đạo hàm tích $(uv)' = u'v + uv'$ với $(\\cos x)' = -\\sin x$:",
          "$y'=(" + lin + ")'\\cos x + (" + lin + ")(-\\sin x) = " + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 ((3x-2)cos x)', params: { a: 3, b: -2 }, expectedValid: true },
    ],
  },

  // Q35: Đạo hàm y = (ax + b) B^x
  t11_b32_d35_lin_expB_prod_deriv_mc: {
    id: 't11_b32_d35_lin_expB_prod_deriv_mc',
    name: 'Tính đạo hàm hàm tích y = (ax + b)Bˣ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = (ax + b)Bˣ.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0}, B ∈ [2; 9]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9, allowZero: false },
      { name: 'B', label: 'Cơ số B', min: 2, max: 9 },
    ],
    validateCode: `
      const { a, b, B } = params;
      if (a === 0 || b === 0 || B < 2 || B > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, B } = params;
      const lin = u.formatLinear(a, b);
      const ansExpr = '\\left[' + a + '+\\left(' + lin + '\\right)\\ln ' + B + '\\right]\\cdot ' + B + '^x';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + a + '\\cdot ' + B + '^x\\ln ' + B + '$',
          "$y'=\\left(" + u.formatLinear(a, a + b) + '\\right)\\cdot ' + B + '^x$',
          "$y'=" + a + '\\cdot ' + B + '^x$',
          "$y'=\\left[" + (-a) + '+\\left(' + lin + '\\right)\\ln ' + B + '\\right]\\cdot ' + B + '^x$',
        ],
        rng,
        (idx) => "$y'=\\left[" + (a + idx) + '+\\left(' + lin + '\\right)\\ln ' + B + '\\right]\\cdot ' + B + '^x$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=(' + lin + ')' + B + '^x$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng quy tắc đạo hàm tích: $y'=(" + lin + ")'" + B + '^x + (' + lin + ')(' + B + "^x)'$.",
          "$y'=" + a + '\\cdot ' + B + '^x + (' + lin + ')\\cdot ' + B + '^x\\ln ' + B + ' = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B = 1', params: { a: -5, b: 3, B: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 ((3-5x)3^x)', params: { a: -5, b: 3, B: 3 }, expectedValid: true },
    ],
  },

  // Q36: Đạo hàm y = k / (ax + b)
  t11_b32_d36_const_over_lin_deriv_mc: {
    id: 't11_b32_d36_const_over_lin_deriv_mc',
    name: 'Tính đạo hàm hàm phân thức k/(ax + b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = k/(ax + b).',
    conditionSummary: 'k ∈ [-25; 25] \\ {0}, a ∈ [-9; 9] \\ {0, 1}, b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'k', label: 'Tử số k', min: -25, max: 25, allowZero: false },
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { k, a, b } = params;
      if (k === 0 || a === 0 || a === 1 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, a, b } = params;
      const den = u.formatLinear(a, b);
      const fmtFrac = (n, d) => (n < 0 ? '-' : '') + '\\dfrac{' + Math.abs(n) + '}{' + d + '}';
      const num = -k * a;
      const ansExpr = fmtFrac(num, '\\left(' + den + '\\right)^{2}');
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + fmtFrac(-num, '\\left(' + den + '\\right)^{2}') + '$',
          "$y'=" + fmtFrac(k, '\\left(' + den + '\\right)^{2}') + '$',
          "$y'=" + fmtFrac(-k, den) + '$',
          "$y'=" + k + '\\left(' + den + '\\right)^{2}$',
        ],
        rng,
        (idx) => "$y'=" + fmtFrac(num + idx, '\\left(' + den + '\\right)^{2}') + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fmtFrac(k, den) + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $\\left(\\dfrac{k}{u}\\right)' = -\\dfrac{k u'}{u^2}$ với $u = " + den + '$.',
          "$y'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { k: 21, a: 1, b: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (21/(7x-4))', params: { k: 21, a: 7, b: -4 }, expectedValid: true },
    ],
  },

  // Q37: Đạo hàm y = (ax + b)/(cx + d)
  t11_b32_d37_homographic_deriv_mc: {
    id: 't11_b32_d37_homographic_deriv_mc',
    name: 'Tính đạo hàm hàm nhất biến y = (ax + b)/(cx + d)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = (ax + b)/(cx + d).',
    conditionSummary: 'a, c ≠ 0, ad - bc ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -8, max: 8, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const wrongDet = a * d + b * c !== det ? a * d + b * c : -det;
      const fmtAns = (top, pow) => {
        const denPart = pow === 1 ? '(' + denStr + ')' : '\\left(' + denStr + '\\right)^{' + pow + '}';
        return (top < 0 ? '-' : '') + '\\dfrac{' + Math.abs(top) + '}{' + denPart + '}';
      };
      const ansExpr = fmtAns(det, 2);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + fmtAns(det, 4) + '$',
          "$y'=" + fmtAns(det, 3) + '$',
          "$y'=" + fmtAns(wrongDet, 2) + '$',
          "$y'=" + fmtAns(-det, 2) + '$',
        ],
        rng,
        (idx) => "$y'=" + fmtAns(det + idx, 2) + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\dfrac{' + numStr + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng công thức $\\left(\\dfrac{ax+b}{cx+d}\\right)' = \\dfrac{ad - bc}{(cx+d)^2}$.",
          "$y'=\\dfrac{" + a + '\\cdot(' + d + ') - (' + b + ')\\cdot(' + c + ')}{\\left(' + denStr + '\\right)^{2}} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ad - bc = 0', params: { a: 2, b: 4, c: 1, d: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37 ((7x+5)/(1-4x))', params: { a: 7, b: 5, c: -4, d: 1 }, expectedValid: true },
    ],
  },

  // Q38: Đạo hàm y = (ax^2 + bx + c)/(px + q)
  t11_b32_d38_quad_over_lin_deriv_mc: {
    id: 't11_b32_d38_quad_over_lin_deriv_mc',
    name: 'Tính đạo hàm hàm phân thức bậc hai trên bậc nhất',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = (ax² + bx + c)/(px + q).',
    conditionSummary: 'a, p ≠ 0, tử không chia hết cho mẫu',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'p', label: 'Hệ số p', min: -5, max: 5, allowZero: false },
      { name: 'q', label: 'Hệ số q', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, p, q } = params;
      if ([a, b, c, p, q].some((v) => v === 0)) return { valid: false, reason: 'Các hệ số phải khác 0' };
      const rVal = a * q * q - b * p * q + c * p * p;
      if (rVal === 0) return { valid: false, reason: 'Tử chia hết cho mẫu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, p, q } = params;
      const numPoly = u.formatPoly([a, b, c]);
      const denLin = u.formatLinear(p, q);
      // (a x^2 + b x + c)'(px + q) - (a x^2 + b x + c) p
      // = (2ax + b)(px + q) - (ap x^2 + bp x + cp)
      // = ap x^2 + 2aq x + (bq - cp)
      const A = a * p;
      const B = 2 * a * q;
      const C = b * q - c * p;
      const derivNum = u.formatPoly([A, B, C]);
      const ansExpr = '\\dfrac{' + derivNum + '}{\\left(' + denLin + '\\right)^{2}}';
      const ans = "$y'=" + ansExpr + '$';

      const wNum1 = u.formatPoly([3 * A, B - C, -Math.abs(C) - 10]);
      const w1 = "$y'=\\dfrac{" + wNum1 + '}{\\left(' + denLin + '\\right)^{2}}$';
      const w2 = "$y'=\\dfrac{" + wNum1 + '}{' + denLin + '}$';
      const w3 = "$y'=\\dfrac{" + derivNum + '}{' + denLin + '}$';
      const w4 = "$y'=\\dfrac{" + u.formatPoly([A, -B, C]) + '}{\\left(' + denLin + '\\right)^{2}}$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [w1, w2, w3, w4],
        rng,
        (idx) => "$y'=\\dfrac{" + u.formatPoly([A, B + idx, C]) + '}{\\left(' + denLin + '\\right)^{2}}$'
      );

      return {
        stem: 'Tính đạo hàm của hàm số $y=\\dfrac{' + numPoly + '}{' + denLin + '}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng quy tắc đạo hàm của thương $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$:",
          "$y'=\\dfrac{(" + u.formatLinear(2 * a, b) + ')(' + denLin + ') - (' + numPoly + ')\\cdot(' + p + ')}{(' + denLin + ')^2} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tử chia hết mẫu', params: { a: 1, b: 0, c: -1, p: 1, q: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38', params: { a: -5, b: 4, c: 4, p: -2, q: -3 }, expectedValid: true },
    ],
  },

  // Q39: Đạo hàm y = (ax + b)/√x
  t11_b32_d39_lin_over_sqrt_deriv_mc: {
    id: 't11_b32_d39_lin_over_sqrt_deriv_mc',
    name: 'Tính đạo hàm hàm thương y = (ax + b)/√x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = (ax + b)/√x dưới dạng rút gọn.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lin = u.formatLinear(a, b);
      // ((ax+b)/sqrt(x))' = (a*sqrt(x) - (ax+b)/(2sqrt(x))) / x = (ax - b) / (2x sqrt(x))
      const top = u.formatLinear(a, -b);
      const ansExpr = '\\dfrac{' + top + '}{2x\\sqrt{x}}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + a + (b > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(b) + '}{2\\sqrt{x}}$',
          "$y'=\\dfrac{" + u.formatLinear(2 * a, b) + '}{\\sqrt{x}}$',
          "$y'=\\dfrac{" + a + '}{2\\sqrt{x}}$',
          "$y'=\\dfrac{" + u.formatLinear(a, b) + '}{2x\\sqrt{x}}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + u.formatLinear(a + idx, -b) + '}{2x\\sqrt{x}}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\dfrac{' + lin + '}{\\sqrt{x}}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng quy tắc đạo hàm của thương: $y'=\\dfrac{(" + lin + ")'\\sqrt{x} - (" + lin + ")(\\sqrt{x})'}{x}$.",
          "$y'=\\dfrac{" + a + '\\sqrt{x} - \\frac{' + lin + '}{2\\sqrt{x}}}{x} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39 ((-5x-5)/√x)', params: { a: -5, b: -5 }, expectedValid: true },
    ],
  },

  // Q40: Đạo hàm y = (ax + b)/cos x
  t11_b32_d40_lin_over_cos_deriv_mc: {
    id: 't11_b32_d40_lin_over_cos_deriv_mc',
    name: 'Tính đạo hàm hàm thương y = (ax + b)/cos x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = (ax + b)/cos x.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lin = u.formatLinear(a, b);
      const negLin = u.formatLinear(-a, -b);
      const ansNum = '\\left(' + lin + '\\right)\\sin x' + u.formatTerm(a, '\\cos x', false);
      const ansExpr = '\\dfrac{' + ansNum + '}{\\cos^2 x}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{\\left(" + negLin + '\\right)\\sin x' + u.formatTerm(a, '\\cos x', false) + '}{\\cos^2 x}$',
          "$y'=\\dfrac{\\left(" + negLin + '\\right)\\sin x' + u.formatTerm(a, '\\cos x', false) + '}{\\cos 2x}$',
          "$y'=\\dfrac{\\left(" + lin + '\\right)\\sin x' + u.formatTerm(-a, '\\cos x', false) + '}{\\cos^2 x}$',
          "$y'=\\dfrac{" + a + '}{\\sin x}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{\\left(" + lin + '\\right)\\sin x' + u.formatTerm(a + idx, '\\cos x', false) + '}{\\cos^2 x}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\dfrac{' + lin + '}{\\cos x}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng quy tắc đạo hàm của thương: $y'=\\dfrac{(" + lin + ")'\\cos x - (" + lin + ")(\\cos x)'}{\\cos^2 x}$.",
          "$y'=\\dfrac{" + ansNum + '}{\\cos^2 x}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: -9, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40 ((-9x-2)/cos x)', params: { a: -9, b: -2 }, expectedValid: true },
    ],
  },

  // Q41: Đạo hàm hàm hợp lũy thừa y = (ax^2 + bx + c)^n
  t11_b32_d41_quad_pow_n_deriv_mc: {
    id: 't11_b32_d41_quad_pow_n_deriv_mc',
    name: 'Tính đạo hàm hàm hợp lũy thừa y = (ax² + bx + c)ⁿ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm hợp',
    description: 'Tính đạo hàm của hàm số y = (ax² + bx + c)ⁿ.',
    conditionSummary: 'a, b, c ∈ [-6; 6] \\ {0}, n ∈ [3; 12]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'n', label: 'Số mũ n', min: 3, max: 12 },
    ],
    validateCode: `
      const { a, b, c, n } = params;
      if (a === 0 || b === 0 || c === 0 || n < 3 || n > 12) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, n } = params;
      const base = u.formatPoly([a, b, c]);
      const powPart = '\\left(' + base + '\\right)^{' + (n - 1) + '}';
      const outerLin = u.formatLinear(2 * n * a, n * b);
      const innerLin = u.formatLinear(2 * a, b);
      const ansExpr = '\\left(' + outerLin + '\\right) ' + powPart;
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + n + powPart + '$',
          "$y'=\\left(" + innerLin + '\\right)' + powPart + '$',
          "$y'=" + powPart + '$',
          "$y'=\\left(" + u.formatLinear(-2 * n * a, n * b) + '\\right)' + powPart + '$',
        ],
        rng,
        (idx) => "$y'=\\left(" + u.formatLinear(2 * n * a + idx, n * b) + '\\right)' + powPart + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\left(' + base + '\\right)^{' + n + '}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(u^{" + n + "})' = " + n + 'u^{' + (n - 1) + "}u'$ với $u = " + base + '$.',
          "$y'=" + n + '\\left(' + innerLin + '\\right)' + powPart + ' = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 2', params: { a: -3, b: 2, c: -4, n: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41 ((-3x^2+2x-4)^9)', params: { a: -3, b: 2, c: -4, n: 9 }, expectedValid: true },
    ],
  },

  // Q42: Đạo hàm y = √(ax + b)
  t11_b32_d42_sqrt_lin_comp_deriv_mc: {
    id: 't11_b32_d42_sqrt_lin_comp_deriv_mc',
    name: 'Tính đạo hàm hàm hợp căn thức y = √(ax + b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm hợp',
    description: 'Tính đạo hàm của hàm số y = √(ax + b).',
    conditionSummary: 'a ∈ [2; 11], b ∈ [-12; 12] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 11 },
      { name: 'b', label: 'Hệ số b', min: -12, max: 12, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || a > 11 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lin = u.formatLinear(a, b);
      const fr = u.simplifyFrac(a, 2);
      const ansExpr = '\\frac{' + fr.num + '}{' + (fr.den === 1 ? '' : fr.den + ' ') + '\\sqrt{' + lin + '}}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + a + '\\sqrt{' + lin + '}$',
          "$y'=\\frac{" + a + '}{\\sqrt{' + lin + '}}$',
          "$y'=\\left(" + lin + '\\right)^{\\frac{3}{2}}$',
          "$y'=-\\frac{" + fr.num + '}{' + (fr.den === 1 ? '' : fr.den + ' ') + '\\sqrt{' + lin + '}}$',
        ],
        rng,
        (idx) => "$y'=\\frac{" + (fr.num + idx) + '}{' + (fr.den === 1 ? '' : fr.den + ' ') + '\\sqrt{' + lin + '}}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\sqrt{' + lin + '}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ với $u = " + lin + ' > 0$.',
          "$y'=\\dfrac{(" + lin + ")'}{2\\sqrt{" + lin + '}} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, b: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42 (√(5x+7))', params: { a: 5, b: 7 }, expectedValid: true },
    ],
  },

  // Q43: Đạo hàm y = √(sin(ax + b))
  t11_b32_d43_sqrt_sin_lin_deriv_mc: {
    id: 't11_b32_d43_sqrt_sin_lin_deriv_mc',
    name: 'Tính đạo hàm hàm hợp y = √(sin(ax + b))',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Đạo hàm hàm hợp',
    description: 'Tính đạo hàm của hàm số y = √(sin(ax + b)).',
    conditionSummary: 'a ∈ [2; 9], b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 9 },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || a > 9 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lin = u.formatLinear(a, b);
      const fr = u.simplifyFrac(a, 2);
      const fmtAns = (numSign) => {
        const s = numSign < 0 ? '-' : '';
        const top = (Math.abs(fr.num) === 1 ? '' : Math.abs(fr.num)) + '\\cos(' + lin + ')';
        const bot = (fr.den === 1 ? '' : fr.den) + '\\sqrt{\\sin(' + lin + ')}';
        return '\\dfrac{' + s + top + '}{' + bot + '}';
      };
      const ansExpr = fmtAns(1);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{" + (-fr.num) + '}{\\sqrt{\\sin(' + lin + ')}}$',
          "$y'=" + fmtAns(-1) + '$',
          "$y'=\\dfrac{1}{2\\sqrt{\\sin(" + lin + ')}}$',
          "$y'=\\dfrac{\\cos(" + lin + ')}{\\sqrt{\\sin(' + lin + ')}}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (fr.num + idx) + '\\cos(' + lin + ')}{\\sqrt{\\sin(' + lin + ')}}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\sqrt{\\sin(' + lin + ')}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ với $u = \\sin(" + lin + ')$.',
          "$y'=\\dfrac{\\left[\\sin(" + lin + ")\\right]'}{2\\sqrt{\\sin(" + lin + ')}} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, b: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43 (√(sin(4x-3)))', params: { a: 4, b: -3 }, expectedValid: true },
    ],
  },

  // Q44: Đạo hàm y = √(cos(ax + b))
  t11_b32_d44_sqrt_cos_lin_deriv_mc: {
    id: 't11_b32_d44_sqrt_cos_lin_deriv_mc',
    name: 'Tính đạo hàm hàm hợp y = √(cos(ax + b))',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Đạo hàm hàm hợp',
    description: 'Tính đạo hàm của hàm số y = √(cos(ax + b)).',
    conditionSummary: 'a ∈ [2; 9], b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 9 },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || a > 9 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lin = u.formatLinear(a, b);
      const fr = u.simplifyFrac(a, 2);
      const fmtAns = (numSign) => {
        const s = numSign < 0 ? '-' : '';
        const top = (Math.abs(fr.num) === 1 ? '' : Math.abs(fr.num)) + '\\sin(' + lin + ')';
        const bot = (fr.den === 1 ? '' : fr.den) + '\\sqrt{\\cos(' + lin + ')}';
        return '\\dfrac{' + s + top + '}{' + bot + '}';
      };
      const ansExpr = fmtAns(-1);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{" + fr.num + '}{\\sqrt{\\cos(' + lin + ')}}$',
          "$y'=" + fmtAns(1) + '$',
          "$y'=\\dfrac{1}{2\\sqrt{\\cos(" + lin + ')}}$',
          "$y'=\\dfrac{-\\sin(" + lin + ')}{\\sqrt{\\cos(' + lin + ')}}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{-" + (fr.num + idx) + '\\sin(' + lin + ')}{\\sqrt{\\cos(' + lin + ')}}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\sqrt{\\cos(' + lin + ')}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ với $u = \\cos(" + lin + ')$.',
          "$y'=\\dfrac{\\left[\\cos(" + lin + ")\\right]'}{2\\sqrt{\\cos(" + lin + ')}} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 4, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44 (√(cos(4x-7)))', params: { a: 4, b: -7 }, expectedValid: true },
    ],
  },

  // Q45: Đạo hàm y = k / (ax^2 + bx + c) với tam thức vô nghiệm
  t11_b32_d45_const_over_quad_deriv_mc: {
    id: 't11_b32_d45_const_over_quad_deriv_mc',
    name: 'Tính đạo hàm phân thức k/(ax² + bx + c)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm hợp',
    description: 'Tính đạo hàm của hàm số y = k/(ax² + bx + c) với tam thức mẫu luôn khác 0.',
    conditionSummary: 'k ∈ [-9; 9] \\ {0}, a ∈ [1; 6], b ∈ [-6; 6] \\ {0}, c ∈ [1; 6], b² - 4ac < 0',
    paramSpecs: [
      { name: 'k', label: 'Tử số k', min: -9, max: 9, allowZero: false },
      { name: 'a', label: 'Hệ số a', min: 1, max: 6 },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: 1, max: 6 },
    ],
    validateCode: `
      const { k, a, b, c } = params;
      if (k === 0 || a <= 0 || b === 0 || c <= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (b * b - 4 * a * c >= 0) return { valid: false, reason: 'Tam thức ở mẫu phải vô nghiệm (Δ < 0)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, a, b, c } = params;
      const quad = u.formatPoly([a, b, c]);
      const fx = (k < 0 ? '-\\dfrac{' + Math.abs(k) + '}' : '\\dfrac{' + k + '}') + '{' + quad + '}';
      const derivNum = u.formatLinear(-2 * k * a, -k * b);
      const ansExpr = '\\dfrac{' + derivNum + '}{\\left(' + quad + '\\right)^{2}}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{" + k + '}{(' + quad + ')^2}$',
          "$y'=\\dfrac{" + (-k) + '}{(' + quad + ')^2}$',
          "$y'=\\ln (" + quad + ')$',
          "$y'=\\dfrac{" + u.formatLinear(2 * k * a, k * b) + '}{\\left(' + quad + '\\right)^{2}}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + u.formatLinear(-2 * k * a + idx, -k * b) + '}{\\left(' + quad + '\\right)^{2}}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $\\left(\\dfrac{k}{u}\\right)' = -\\dfrac{k u'}{u^2}$ với $u = " + quad + '$.',
          "$y'=-\\dfrac{" + (k < 0 ? '(' + k + ')' : k) + '\\left(' + u.formatLinear(2 * a, b) + '\\right)}{(' + quad + ')^2} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu có nghiệm', params: { k: -5, a: 1, b: -5, c: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45 (-5/(4x²-2x+1))', params: { k: -5, a: 4, b: -2, c: 1 }, expectedValid: true },
    ],
  },

  // Q46: Đạo hàm y = m / sin(kx)
  t11_b32_d46_const_over_sin_kx_deriv_mc: {
    id: 't11_b32_d46_const_over_sin_kx_deriv_mc',
    name: 'Tính đạo hàm phân thức lượng giác y = m/sin(kx)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm hợp',
    description: 'Tính đạo hàm của hàm số y = m/sin(kx).',
    conditionSummary: 'm ∈ [-9; 9] \\ {0}, k ∈ [2; 9]',
    paramSpecs: [
      { name: 'm', label: 'Tử số m', min: -9, max: 9, allowZero: false },
      { name: 'k', label: 'Hệ số góc k', min: 2, max: 9 },
    ],
    validateCode: `
      const { m, k } = params;
      if (m === 0 || k < 2 || k > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, k } = params;
      const numCoeff = -m * k;
      const ansExpr = '\\dfrac{' + numCoeff + '\\cos ' + k + 'x}{\\sin^2 ' + k + 'x}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{" + numCoeff + '}{\\sin^2 ' + k + 'x}$',
          "$y'=\\dfrac{" + (-m) + '\\cos ' + k + 'x}{\\sin^2 ' + k + 'x}$',
          "$y'=\\dfrac{" + m + '\\cos ' + k + 'x}{\\sin ' + k + 'x}$',
          "$y'=\\dfrac{" + (-numCoeff) + '\\cos ' + k + 'x}{\\sin^2 ' + k + 'x}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (numCoeff + idx) + '\\cos ' + k + 'x}{\\sin^2 ' + k + 'x}$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=\\dfrac{' + m + '}{\\sin ' + k + 'x}$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $\\left(\\dfrac{m}{u}\\right)' = -\\dfrac{m u'}{u^2}$ với $u = \\sin " + k + 'x$.',
          "$y'=\\dfrac{" + (-m) + '\\cdot ' + k + '\\cos ' + k + 'x}{\\sin^2 ' + k + 'x} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { m: 0, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46 (-2/sin4x)', params: { m: -2, k: 4 }, expectedValid: true },
    ],
  },

  // Q47: Đạo hàm y = m / cos(kx)
  t11_b32_d47_const_over_cos_kx_deriv_mc: {
    id: 't11_b32_d47_const_over_cos_kx_deriv_mc',
    name: 'Tính đạo hàm phân thức lượng giác y = m/cos(kx)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm hợp',
    description: 'Tính đạo hàm của hàm số y = m/cos(kx).',
    conditionSummary: 'm ∈ [-9; 9] \\ {0}, k ∈ [2; 9]',
    paramSpecs: [
      { name: 'm', label: 'Tử số m', min: -9, max: 9, allowZero: false },
      { name: 'k', label: 'Hệ số góc k', min: 2, max: 9 },
    ],
    validateCode: `
      const { m, k } = params;
      if (m === 0 || k < 2 || k > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, k } = params;
      const numCoeff = m * k;
      const ansExpr = '\\dfrac{' + numCoeff + '\\sin ' + k + 'x}{\\cos^2 ' + k + 'x}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{" + m + '\\sin ' + k + 'x}{\\cos^2 ' + k + 'x}$',
          "$y'=\\dfrac{" + (-numCoeff) + '\\sin ' + k + 'x}{\\cos^2 ' + k + 'x}$',
          "$y'=\\dfrac{" + m + '\\sin ' + k + 'x}{\\cos ' + k + 'x}$',
          "$y'=\\dfrac{" + numCoeff + '}{\\cos^2 ' + k + 'x}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (numCoeff + idx) + '\\sin ' + k + 'x}{\\cos^2 ' + k + 'x}$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=\\dfrac{' + m + '}{\\cos ' + k + 'x}$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $\\left(\\dfrac{m}{u}\\right)' = -\\dfrac{m u'}{u^2}$ với $u = \\cos " + k + 'x$.',
          "$y'=\\dfrac{" + (-m) + '\\cdot(-' + k + '\\sin ' + k + 'x)}{\\cos^2 ' + k + 'x} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { m: -3, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47 (-3/cos9x)', params: { m: -3, k: 9 }, expectedValid: true },
    ],
  },
};
