import { MathTemplate } from '../types/math';

export const G11_B32_MC_PART2: Record<string, MathTemplate> = {
  // Q17: Đạo hàm y = a^x
  t11_b32_d17_ax_deriv_mc: {
    id: 't11_b32_d17_ax_deriv_mc',
    name: 'Tính đạo hàm hàm số mũ cơ bản y = aˣ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = aˣ (a > 1).',
    conditionSummary: 'a ∈ [2; 15]',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 15 },
    ],
    validateCode: `
      const { a } = params;
      if (!Number.isInteger(a) || a < 2 || a > 15) return { valid: false, reason: 'Cơ số a ∈ [2; 15]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a } = params;
      const ans = "$y'=" + a + '^x\\ln ' + a + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\frac{" + a + '^x}{\\ln ' + a + '}$',
          "$y'=" + a + '^x$',
          "$y'=" + a + '^x\\log ' + a + '$',
          "$y'=x\\cdot " + a + '^{x-1}$',
        ],
        rng,
        (idx) => "$y'=" + (a + idx) + '^x\\ln ' + a + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + a + '^{x}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng công thức $(a^x)' = a^x \\ln a$ với $a=" + a + '$.',
          ans + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (y=3^x)', params: { a: 3 }, expectedValid: true },
    ],
  },

  // Q18: Đạo hàm y = B^(ax^2 + bx + c)
  t11_b32_d18_a_quad_deriv_mc: {
    id: 't11_b32_d18_a_quad_deriv_mc',
    name: 'Tính đạo hàm hàm mũ hợp y = B^(ax² + bx + c)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = B^(ax² + bx + c).',
    conditionSummary: 'B ∈ [2; 9], a, b, c ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'B', label: 'Cơ số B', min: 2, max: 9 },
      { name: 'a', label: 'Hệ số x² (a)', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hệ số x (b)', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { B, a, b, c } = params;
      if (B < 2 || B > 9 || a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { B, a, b, c } = params;
      const quad = u.formatPoly([a, b, c]);
      const lin = u.formatLinear(2 * a, b);
      const baseExp = B + '^{' + quad + '}';
      const ans = "$y'=" + baseExp + ' \\left(' + lin + '\\right) \\ln ' + B + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + baseExp + ' \\log ' + B + '$',
          "$y'=" + baseExp + ' \\left(' + lin + '\\right)$',
          "$y'=" + baseExp + '$',
          "$y'=" + baseExp + ' \\left(' + u.formatLinear(2 * a, -b) + '\\right) \\ln ' + B + '$',
        ],
        rng,
        (idx) => "$y'=" + baseExp + ' \\left(' + u.formatLinear(2 * a + idx, b) + '\\right) \\ln ' + B + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + baseExp + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng công thức $(B^u)' = u' \\cdot B^u \\ln B$ với $u = " + quad + '$.',
          "$y'=(" + quad + ")'\\cdot " + baseExp + '\\ln ' + B + ' = ' + baseExp + '\\left(' + lin + '\\right)\\ln ' + B + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { B: 6, a: 0, b: 2, c: -8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18', params: { B: 6, a: -5, b: 2, c: -8 }, expectedValid: true },
    ],
  },

  // Q19: Đạo hàm y = ax + b e^x + c
  t11_b32_d19_lin_exp_deriv_mc: {
    id: 't11_b32_d19_lin_exp_deriv_mc',
    name: 'Tính đạo hàm tổng y = ax + beˣ + c',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = ax + beˣ + c.',
    conditionSummary: 'a, b, c ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số x (a)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số eˣ (b)', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const fx = u.formatTerm(a, 'x', true) + u.formatTerm(b, 'e^{x}', false) + u.formatTrailingConst(c);
      const ansExpr = u.formatTerm(b, 'e^{x}', true) + u.formatTrailingConst(a);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=e^{x}" + u.formatTrailingConst(a) + '$',
          "$y'=0$",
          "$y'=e^{" + Math.abs(b) + 'x}' + u.formatTrailingConst(a) + '$',
          "$y'=" + u.formatTerm(-b, 'e^{x}', true) + u.formatTrailingConst(a) + '$',
        ],
        rng,
        (idx) => "$y'=" + u.formatTerm(b + idx, 'e^{x}', true) + u.formatTrailingConst(a) + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(e^x)' = e^x$, $(ax)' = a$ và $(c)' = 0$.",
          "$y'=(" + fx + ")'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: -2, b: 0, c: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (y=-2x+2e^x+5)', params: { a: -2, b: 2, c: 5 }, expectedValid: true },
    ],
  },

  // Q20: Đạo hàm y = e^(ax + b)
  t11_b32_d20_exp_lin_deriv_mc: {
    id: 't11_b32_d20_exp_lin_deriv_mc',
    name: 'Tính đạo hàm hàm mũ hợp y = e^(ax+b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = e^(ax + b).',
    conditionSummary: 'a ∈ [-8; 8] \\ {0, 1}, b ∈ [-8; 8] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a === 0 || a === 1 || b === 0) return { valid: false, reason: 'a ∉ {0, 1}, b ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lin = u.formatLinear(a, b);
      const expTerm = 'e^{' + lin + '}';
      const ansExpr = u.formatTerm(a, expTerm, true);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\left(" + lin + '\\right) ' + expTerm + '$',
          "$y'=" + u.formatTerm(a, 'x', true) + ' + ' + expTerm + u.formatTrailingConst(b) + '$',
          "$y'=" + expTerm + '$',
          "$y'=" + u.formatTerm(-a, expTerm, true) + '$',
        ],
        rng,
        (idx) => "$y'=" + u.formatTerm(a + idx, expTerm, true) + '$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=' + expTerm + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(e^u)' = u' \\cdot e^u$ với $u = " + lin + '$.',
          "$y'=(" + lin + ")'\\cdot " + expTerm + ' = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, b: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (y=e^(-3x-3))', params: { a: -3, b: -3 }, expectedValid: true },
    ],
  },

  // Q21: Đạo hàm y = log_a x
  t11_b32_d21_log_a_x_deriv_mc: {
    id: 't11_b32_d21_log_a_x_deriv_mc',
    name: 'Tính đạo hàm hàm logarit cơ bản y = log_a(x)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = log_a(x).',
    conditionSummary: 'a ∈ [2; 99]',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 99 },
    ],
    validateCode: `
      const { a } = params;
      if (!Number.isInteger(a) || a < 2 || a > 99) return { valid: false, reason: 'a ∈ [2; 99]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a } = params;
      const ans = "$y'=\\dfrac{1}{x\\ln " + a + '}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{1}{x\\log " + a + '}$',
          "$y'=\\dfrac{" + a + '}{\\ln x}$',
          "$y'=\\dfrac{" + a + '}{\\log x}$',
          "$y'=\\dfrac{\\ln " + a + '}{x}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (idx + 1) + '}{x\\ln ' + a + '}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\log_{' + a + '} x$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng công thức $(\\log_a x)' = \\dfrac{1}{x\\ln a}$ (với $x > 0$).",
          "$y'=(\\log_{" + a + "} x)'=\\dfrac{1}{x\\ln " + a + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (y=log_99 x)', params: { a: 99 }, expectedValid: true },
    ],
  },

  // Q22: Đạo hàm y = log_a(x) + b^x
  t11_b32_d22_log_plus_exp_deriv_mc: {
    id: 't11_b32_d22_log_plus_exp_deriv_mc',
    name: 'Tính đạo hàm hàm tổng y = log_a(x) + bˣ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = log_a(x) + bˣ.',
    conditionSummary: 'a, b ∈ [2; 12]',
    paramSpecs: [
      { name: 'a', label: 'Cơ số logarit a', min: 2, max: 12 },
      { name: 'b', label: 'Cơ số mũ b', min: 2, max: 12 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || a > 12 || b < 2 || b > 12) return { valid: false, reason: 'Cơ số ∈ [2; 12]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const ans = "$y'=\\dfrac{1}{x\\ln " + a + '}+' + b + '^x\\ln ' + b + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{1}{x\\log " + a + '}+' + b + '^x\\ln ' + b + '$',
          "$y'=\\dfrac{1}{x}+" + b + '^x\\ln ' + b + '$',
          "$y'=\\dfrac{1}{x\\log " + a + '}+' + b + '^x$',
          "$y'=\\dfrac{1}{x\\ln " + a + '}+' + b + '^x$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (idx + 1) + '}{x\\ln ' + a + '}+' + b + '^x\\ln ' + b + '$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=\\log_{' + a + '} {x}+' + b + '^x$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(\\log_a x)'=\\dfrac{1}{x\\ln a}$ và $(b^x)'=b^x\\ln b$.",
          ans + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, b: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (log_2 x + 5^x)', params: { a: 2, b: 5 }, expectedValid: true },
    ],
  },

  // Q23: Đạo hàm y = log_a(x) + b sin x
  t11_b32_d23_log_plus_sin_deriv_mc: {
    id: 't11_b32_d23_log_plus_sin_deriv_mc',
    name: 'Tính đạo hàm hàm tổng y = log_a(x) + b sin x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = log_a(x) + b sin x.',
    conditionSummary: 'a ∈ [2; 12], b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 12 },
      { name: 'b', label: 'Hệ số sin x (b)', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || a > 12 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = '\\log_{' + a + '} x' + u.formatTerm(b, '\\sin x', false);
      const ansExpr = '\\dfrac{1}{x\\ln ' + a + '}' + u.formatTerm(b, '\\cos x', false);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{1}{x}" + u.formatTerm(b, '\\sin x', false) + '$',
          "$y'=\\dfrac{1}{x\\ln " + a + '}' + u.formatTerm(b, '\\sin x', false) + '$',
          "$y'=\\dfrac{1}{x\\log " + a + '}' + u.formatTerm(b, '\\cos x', false) + '$',
          "$y'=\\dfrac{1}{x\\ln " + a + '}' + u.formatTerm(-b, '\\cos x', false) + '$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (idx + 1) + '}{x\\ln ' + a + '}' + u.formatTerm(b, '\\cos x', false) + '$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Ta có $y' = \\dfrac{1}{x\\ln " + a + '}' + u.formatTerm(b, '\\cos x', false) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 4, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (log_4 x + 2 sin x)', params: { a: 4, b: 2 }, expectedValid: true },
    ],
  },

  // Q24: Đạo hàm y = log_a(x) + b cos x
  t11_b32_d24_log_plus_cos_deriv_mc: {
    id: 't11_b32_d24_log_plus_cos_deriv_mc',
    name: 'Tính đạo hàm hàm tổng y = log_a(x) + b cos x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = log_a(x) + b cos x.',
    conditionSummary: 'a ∈ [2; 12], b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 12 },
      { name: 'b', label: 'Hệ số cos x (b)', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || a > 12 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = '\\log_{' + a + '} x' + u.formatTerm(b, '\\cos x', false);
      const ansExpr = '\\dfrac{1}{x\\ln ' + a + '}' + u.formatTerm(-b, '\\sin x', false);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{1}{x\\ln " + a + '}' + u.formatTerm(-b, '\\cos x', false) + '$',
          "$y'=\\dfrac{1}{x\\ln " + a + '}' + u.formatTerm(b, '\\sin x', false) + '$',
          "$y'=\\dfrac{1}{x}" + u.formatTerm(-b, '\\sin x', false) + '$',
          "$y'=\\dfrac{1}{x\\log " + a + '}' + u.formatTerm(-b, '\\sin x', false) + '$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (idx + 1) + '}{x\\ln ' + a + '}' + u.formatTerm(-b, '\\sin x', false) + '$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Ta có $y' = \\dfrac{1}{x\\ln " + a + '}' + u.formatTerm(-b, '\\sin x', false) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, b: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (log_8 x + 2 cos x)', params: { a: 8, b: 2 }, expectedValid: true },
    ],
  },

  // Q25: Đạo hàm y = a ln x + b cos x
  t11_b32_d25_ln_minus_cos_deriv_mc: {
    id: 't11_b32_d25_ln_minus_cos_deriv_mc',
    name: 'Tính đạo hàm hàm tổng y = a ln x + b cos x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = a ln x + b cos x.',
    conditionSummary: 'a ∈ [1; 10], b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số ln x (a)', min: 1, max: 10 },
      { name: 'b', label: 'Hệ số cos x (b)', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 1 || a > 10 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = u.formatTerm(a, '\\ln x', true) + u.formatTerm(b, '\\cos x', false);
      const ansExpr = '\\dfrac{' + a + '}{x}' + u.formatTerm(-b, '\\sin x', false);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{" + a + '}{x}' + u.formatTerm(b, '\\sin x', false) + '$',
          "$y'=\\dfrac{" + a + '}{x}' + u.formatTerm(b, '\\cos x', false) + '$',
          "$y'=\\dfrac{" + a + '}{x\\ln x}' + u.formatTerm(-b, '\\sin x', false) + '$',
          "$y'=-\\dfrac{" + a + '}{x}' + u.formatTerm(-b, '\\sin x', false) + '$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (a + idx) + '}{x}' + u.formatTerm(-b, '\\sin x', false) + '$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(\\ln x)' = \\dfrac{1}{x}$ và $(\\cos x)' = -\\sin x$.",
          "$y'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 4, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (4ln x - 3cos x)', params: { a: 4, b: -3 }, expectedValid: true },
    ],
  },

  // Q26: Đạo hàm y = a ln x + b sin x
  t11_b32_d26_ln_plus_sin_deriv_mc: {
    id: 't11_b32_d26_ln_plus_sin_deriv_mc',
    name: 'Tính đạo hàm hàm tổng y = a ln x + b sin x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = a ln x + b sin x.',
    conditionSummary: 'a ∈ [1; 10], b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số ln x (a)', min: 1, max: 10 },
      { name: 'b', label: 'Hệ số sin x (b)', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 1 || a > 10 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = u.formatTerm(a, '\\ln x', true) + u.formatTerm(b, '\\sin x', false);
      const ansExpr = '\\dfrac{' + a + '}{x}' + u.formatTerm(b, '\\cos x', false);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=-\\dfrac{" + a + '}{x}' + u.formatTerm(-b, '\\sin x', false) + '$',
          "$y'=\\dfrac{" + a + '}{x}' + u.formatTerm(Math.sign(b) || 1, '\\cos x', false) + '$',
          "$y'=\\dfrac{" + a + '}{x}' + u.formatTerm(b, '\\sin x', false) + '$',
          "$y'=\\dfrac{" + a + '}{x}' + u.formatTerm(-b, '\\cos x', false) + '$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (a + idx) + '}{x}' + u.formatTerm(b, '\\cos x', false) + '$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(\\ln x)' = \\dfrac{1}{x}$ và $(\\sin x)' = \\cos x$.",
          "$y'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (4ln x + 5sin x)', params: { a: 4, b: 5 }, expectedValid: true },
    ],
  },

  // Q27: Đạo hàm y = a^x + b sin x
  t11_b32_d27_exp_plus_sin_deriv_mc: {
    id: 't11_b32_d27_exp_plus_sin_deriv_mc',
    name: 'Tính đạo hàm hàm tổng y = aˣ + b sin x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = aˣ + b sin x.',
    conditionSummary: 'a ∈ [2; 12], b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 12 },
      { name: 'b', label: 'Hệ số sin x (b)', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || a > 12 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = a + '^x' + u.formatTerm(b, '\\sin x', false);
      const ansExpr = a + '^x\\ln ' + a + u.formatTerm(b, '\\cos x', false);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + a + '^x\\ln ' + a + u.formatTerm(-b, '\\cos x', false) + '$',
          "$y'=" + a + '^x' + u.formatTerm(b, '\\cos x', false) + '$',
          "$y'=" + a + '^x\\log ' + a + u.formatTerm(b, '\\cos x', false) + '$',
          "$y'=\\frac{" + a + '^x}{\\ln ' + a + '}' + u.formatTerm(b, '\\cos x', false) + '$',
        ],
        rng,
        (idx) => "$y'=" + (a + idx) + '^x\\ln ' + a + u.formatTerm(b, '\\cos x', false) + '$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(a^x)' = a^x\\ln a$ và $(\\sin x)' = \\cos x$.",
          "$y'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 2, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (2^x + 3sin x)', params: { a: 2, b: 3 }, expectedValid: true },
    ],
  },

  // Q28: Đạo hàm y = a^x + b cos x
  t11_b32_d28_exp_plus_cos_deriv_mc: {
    id: 't11_b32_d28_exp_plus_cos_deriv_mc',
    name: 'Tính đạo hàm hàm tổng y = aˣ + b cos x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = aˣ + b cos x.',
    conditionSummary: 'a ∈ [2; 12], b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 12 },
      { name: 'b', label: 'Hệ số cos x (b)', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || a > 12 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = a + '^x' + u.formatTerm(b, '\\cos x', false);
      const ansExpr = a + '^x\\ln ' + a + u.formatTerm(-b, '\\sin x', false);
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + a + '^x\\log ' + a + u.formatTerm(-b, '\\sin x', false) + '$',
          "$y'=\\dfrac{" + a + '^x}{\\ln ' + a + '}' + u.formatTerm(-b, '\\sin x', false) + '$',
          "$y'=" + a + '^x\\log ' + a + u.formatTerm(b, '\\sin x', false) + '$',
          "$y'=" + a + '^x\\ln ' + a + u.formatTerm(b, '\\sin x', false) + '$',
        ],
        rng,
        (idx) => "$y'=" + (a + idx) + '^x\\ln ' + a + u.formatTerm(-b, '\\sin x', false) + '$'
      );
      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(a^x)' = a^x\\ln a$ và $(\\cos x)' = -\\sin x$.",
          "$y'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, b: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (6^x - 4cos x)', params: { a: 6, b: -4 }, expectedValid: true },
    ],
  },

  // Q29: Đạo hàm y = log_B(ax + b)
  t11_b32_d29_log_lin_deriv_mc: {
    id: 't11_b32_d29_log_lin_deriv_mc',
    name: 'Tính đạo hàm hàm logarit hợp y = log_B(ax + b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = log_B(ax + b).',
    conditionSummary: 'B ∈ [2; 12], a ∈ [2; 12], b ∈ [-12; 12] \\ {0}',
    paramSpecs: [
      { name: 'B', label: 'Cơ số B', min: 2, max: 12 },
      { name: 'a', label: 'Hệ số a', min: 2, max: 12 },
      { name: 'b', label: 'Hệ số b', min: -12, max: 12, allowZero: false },
    ],
    validateCode: `
      const { B, a, b } = params;
      if (B < 2 || B > 12 || a < 2 || a > 12 || b === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { B, a, b } = params;
      const lin = u.formatLinear(a, b);
      const ansExpr = '\\dfrac{' + a + '}{(' + lin + ')\\ln ' + B + '}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{" + B + '}{(' + lin + ')\\log ' + B + '}$',
          "$y'=\\dfrac{" + a + '}{' + lin + '}$',
          "$y'=\\dfrac{" + a + '}{(' + lin + ')\\log ' + B + '}$',
          "$y'=\\dfrac{1}{(" + lin + ')\\ln ' + B + '}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + (a + idx) + '}{(' + lin + ')\\ln ' + B + '}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\log_{' + B + '} (' + lin + ')$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(\\log_B u)' = \\dfrac{u'}{u\\ln B}$ với $u = " + lin + '$.',
          "$y'=\\dfrac{(" + lin + ")'}{(" + lin + ')\\ln ' + B + '}=' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { B: 6, a: 0, b: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (log_6(8x+7))', params: { B: 6, a: 8, b: 7 }, expectedValid: true },
    ],
  },

  // Q30: Đạo hàm y = ln(ax^2 + bx + c) với a > 0, Δ < 0
  t11_b32_d30_ln_quad_deriv_mc: {
    id: 't11_b32_d30_ln_quad_deriv_mc',
    name: 'Tính đạo hàm hàm logarit tự nhiên hợp y = ln(ax² + bx + c)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = ln(ax² + bx + c) với ax² + bx + c > 0 ∀x.',
    conditionSummary: 'a ∈ [1; 9], b ∈ [-15; 15] \\ {0}, c ∈ [1; 15], b² - 4ac < 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 9 },
      { name: 'b', label: 'Hệ số b', min: -15, max: 15, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: 1, max: 15 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a <= 0 || b === 0 || c <= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (b * b - 4 * a * c >= 0) return { valid: false, reason: 'Tam thức phải vô nghiệm (b² - 4ac < 0) để xác định trên ℝ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const quad = u.formatPoly([a, b, c]);
      const lin = u.formatLinear(2 * a, b);
      const ansExpr = '\\dfrac{' + lin + '}{' + quad + '}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=\\dfrac{1}{" + quad + '}$',
          "$y'=\\dfrac{1}{" + lin + '}$',
          "$y'=\\left(" + lin + '\\right)\\left(' + quad + '\\right)$',
          "$y'=\\dfrac{" + u.formatLinear(2 * a, -b) + '}{' + quad + '}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + u.formatLinear(2 * a + idx, b) + '}{' + quad + '}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\ln (' + quad + ')$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng $(\\ln u)' = \\dfrac{u'}{u}$ với $u = " + quad + ' > 0$.',
          "$y'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b²-4ac >= 0', params: { a: 1, b: 5, c: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (ln(8x^2+13x+9))', params: { a: 8, b: 13, c: 9 }, expectedValid: true },
    ],
  },

  // Q31: Đạo hàm y = B^x + c tại x = x0 < 0
  t11_b32_d31_exp_deriv_at_x0_mc: {
    id: 't11_b32_d31_exp_deriv_at_x0_mc',
    name: 'Tính đạo hàm của hàm số y = Bˣ + c tại x₀ nguyên âm',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Tính đạo hàm của hàm số y = Bˣ + c tại điểm x = x₀ < 0.',
    conditionSummary: 'B ∈ [2; 7], c ∈ [-9; 9] \\ {0}, x₀ ∈ [-3; -1]',
    paramSpecs: [
      { name: 'B', label: 'Cơ số B', min: 2, max: 7 },
      { name: 'c', label: 'Hằng số c', min: -9, max: 9, allowZero: false },
      { name: 'x0', label: 'Điểm x₀ < 0', min: -3, max: -1 },
    ],
    validateCode: `
      const { B, c, x0 } = params;
      if (B < 2 || B > 7 || c === 0 || x0 > -1 || x0 < -3) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { B, c, x0 } = params;
      const fx = B + '^{x}' + u.formatTrailingConst(c);
      const powDen = Math.pow(B, -x0);
      const powPos = Math.pow(B, -x0 + 3);
      const ansLatex = '\\frac{\\ln ' + B + '}{' + powDen + '}';
      const correct = '$' + ansLatex + '$';
      const valAtX0 = u.simplifyFrac(1 + c * powDen, powDen).latex;

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + (Math.pow(B, -x0) + c) + '$',
          '$' + powPos + '\\ln ' + B + '$',
          '$' + valAtX0 + '$',
          '$-\\frac{\\ln ' + B + '}{' + powDen + '}$',
        ],
        rng,
        (idx) => '$\\frac{\\ln ' + B + '}{' + (powDen + idx) + '}$'
      );

      return {
        stem: 'Đạo hàm của hàm số $y=' + fx + '$ tại điểm $x=' + x0 + '$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ansLatex + '$',
        solutionSteps: [
          "Ta có $f'(x)=" + B + '^{x}\\ln ' + B + '$.',
          "Thay $x=" + x0 + "$ vào ta được $f'(" + x0 + ')=' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 0', params: { B: 6, c: 5, x0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (6^x+5 tại x=-2)', params: { B: 6, c: 5, x0: -2 }, expectedValid: true },
    ],
  },

  // Q32: Đạo hàm tích y = √x (ax + b)
  t11_b32_d32_sqrt_lin_prod_deriv_mc: {
    id: 't11_b32_d32_sqrt_lin_prod_deriv_mc',
    name: 'Tính đạo hàm hàm tích y = √x(ax + b)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tính đạo hàm của hàm số y = √x(ax + b) dưới dạng phân thức rút gọn.',
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
      const numLin = u.formatLinear(3 * a, b);
      const ansExpr = '\\dfrac{' + numLin + '}{2\\sqrt{x}}';
      const ans = "$y'=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y'=" + a + (b < 0 ? ' - ' : ' + ') + '\\dfrac{' + Math.abs(b) + '}{2\\sqrt{x}}$',
          "$y'=\\dfrac{" + u.formatLinear(2 * a, b) + '}{\\sqrt{x}}$',
          "$y'=\\dfrac{" + u.formatLinear(3 * a, -b) + '}{2\\sqrt{x}}$',
          "$y'=\\dfrac{" + a + '}{\\sqrt{x}}$',
        ],
        rng,
        (idx) => "$y'=\\dfrac{" + u.formatLinear(3 * a + idx, b) + '}{2\\sqrt{x}}$'
      );
      return {
        stem: 'Tính đạo hàm của hàm số $y=\\sqrt{x}\\left(' + lin + '\\right)$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Áp dụng quy tắc đạo hàm của tích: $y' = (\\sqrt{x})'(" + lin + ") + \\sqrt{x}(" + lin + ")'$.",
          "$y'=\\dfrac{" + lin + '}{2\\sqrt{x}} + ' + (a < 0 ? '(' + a + ')' : a) + '\\sqrt{x} = ' + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (√x(-6x-1))', params: { a: -6, b: -1 }, expectedValid: true },
    ],
  },
};
