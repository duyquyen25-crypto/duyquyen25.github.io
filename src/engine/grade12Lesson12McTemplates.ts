import { MathTemplate } from '../types/math';

export const G12_B12_MC_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 12. TÍCH PHÂN — PHẦN I: 36 DẠNG TRẮC NGHIỆM (D01..D36)
  // =====================================================================

  // Dạng 01 (Q01): Định nghĩa tích phân theo công thức Newton - Leibniz
  t12_b12_d01_newton_leibniz_def_mc: {
    id: 't12_b12_d01_newton_leibniz_def_mc',
    name: 'Công thức Newton - Leibniz tính tích phân xác định',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Nhận diện công thức Newton - Leibniz ∫_a^b f(x)dx = F(b) - F(a) khi F(x) là một nguyên hàm của f(x).',
    conditionSummary: 'a < b là hai cận tích phân nguyên',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -8, max: 3 },
      { name: 'b', label: 'Cận trên b', min: -2, max: 9 },
    ],
    validateCode: `
      if (params.a >= params.b) return { valid: false, reason: 'Cần cận dưới a < b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const intPrefix = '\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ';
      const correct = '$' + intPrefix + 'F(' + b + ') - F(' + a + ')$';
      const d1 = '$' + intPrefix + 'F(' + a + ') - F(' + b + ')$';
      const d2 = '$' + intPrefix + 'F(' + a + ') + F(' + b + ')$';
      const d3 = '$' + intPrefix + '2\\left[F(' + b + ') - F(' + a + ')\\right]$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + intPrefix + 'F(' + a + ') - F(' + (b + step) + ')$'
      );
      return {
        stem: '$F(x)$ là một nguyên hàm của $f(x)$ trên tập xác định $\\mathbb{R}$. Mệnh đề nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo định nghĩa tích phân (công thức Newton - Leibniz), nếu $F(x)$ là một nguyên hàm của $f(x)$ thì $\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = F(' + b + ') - F(' + a + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 2, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q01 cận [-6; 1]', params: { a: -6, b: 1 }, expectedValid: true },
    ],
  },

  // Dạng 02 (Q02): Nhận diện tính chất tích phân (cận trùng nhau bằng 0)
  t12_b12_d02_integral_property_mc: {
    id: 't12_b12_d02_integral_property_mc',
    name: 'Nhận diện khẳng định đúng về tính chất của tích phân',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Kiểm tra tính chất tích phân có hai cận bằng nhau ∫_a^a f(x)dx = 0 và phân biệt các công thức sai về đảo cận, ghép cận.',
    conditionSummary: 'a < c < b là ba mốc phân biệt',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -3, max: 4 },
      { name: 'c', label: 'Cận trung gian c', min: 2, max: 7 },
      { name: 'b', label: 'Cận trên b', min: 5, max: 12 },
    ],
    validateCode: `
      const { a, c, b } = params;
      if (!(a < c && c < b)) return { valid: false, reason: 'Cần a < c < b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, b } = params;
      const correct = '$\\int \\limits_{' + a + '}^{' + a + '} f(x)\\mathrm{\\,d}x = 0$';
      const d1 = '$\\int \\limits_{' + a + '}^{' + b + '} g(x)\\mathrm{\\,d}x = \\int \\limits_{' + c + '}^{' + a + '} g(x)\\mathrm{\\,d}x + \\int \\limits_{' + a + '}^{' + b + '} g(x)\\mathrm{\\,d}x$';
      const d2 = '$\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = \\int \\limits_{' + c + '}^{' + a + '} f(x)\\mathrm{\\,d}x + \\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x$';
      const d3 = '$\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = \\int \\limits_{' + b + '}^{' + a + '} f(x)\\mathrm{\\,d}x$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\int \\limits_{' + a + '}^{' + (b + step) + '} f(x)\\mathrm{\\,d}x = 0$'
      );
      return {
        stem: 'Cho các hàm số $f(x), g(x)$ xác định và liên tục trên $\\mathbb{R}$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo tính chất tích phân có hai cận bằng nhau: $\\int \\limits_{' + a + '}^{' + a + '} f(x)\\mathrm{\\,d}x = F(' + a + ') - F(' + a + ') = 0$.',
          'Các khẳng định đổi cận thiếu dấu trừ hoặc ghép sai cận đều không đúng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên thứ tự cận sai', params: { a: 5, c: 3, b: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q02 a=1, c=4, b=8', params: { a: 1, c: 4, b: 8 }, expectedValid: true },
    ],
  },

  // Dạng 03 (Q03): Biết F(a), F(b) -> tính ∫_a^b f(x)dx
  t12_b12_d03_integral_from_F_vals_mc: {
    id: 't12_b12_d03_integral_from_F_vals_mc',
    name: 'Tính tích phân ∫_a^b f(x)dx khi biết F(a) và F(b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Áp dụng công thức ∫_a^b f(x)dx = F(b) - F(a) khi biết giá trị nguyên hàm tại hai cận.',
    conditionSummary: 'a < b và F(a) ≠ F(b)',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -5, max: 9 },
      { name: 'b', label: 'Cận trên b', min: 1, max: 14 },
      { name: 'fa', label: 'Giá trị F(a)', min: -8, max: 8, allowZero: false },
      { name: 'fb', label: 'Giá trị F(b)', min: -8, max: 10, allowZero: false },
    ],
    validateCode: `
      const { a, b, fa, fb } = params;
      if (a >= b || fa === fb || fa === -fb) return { valid: false, reason: 'Cần a < b và |F(a)| ≠ |F(b)| để các đáp án nhiễu phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, fa, fb } = params;
      const ans = fb - fa;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (-ans) + '$', '$' + (fb + fa) + '$', '$' + (ans - 1) + '$'],
        rng,
        (step) => '$' + (ans + step + 2) + '$'
      );
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của $f(x)$ thỏa mãn $F(' + a + ') = ' + fa + '$ và $F(' + b + ') = ' + fb + '$. Tính $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          '$\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = F(' + b + ') - F(' + a + ') = ' + fb + ' - (' + fa + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = b', params: { a: 8, b: 8, fa: -1, fb: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q03 F(8)=-1, F(10)=5 -> 6', params: { a: 8, b: 10, fa: -1, fb: 5 }, expectedValid: true },
    ],
  },

  // Dạng 04 (Q04): Biết ∫_a^b f(x)dx và F(b) -> tìm F(a)
  t12_b12_d04_find_Fa_from_integral_mc: {
    id: 't12_b12_d04_find_Fa_from_integral_mc',
    name: 'Tìm F(a) khi biết tích phân ∫_a^b f(x)dx và F(b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Từ ∫_a^b f(x)dx = F(b) - F(a) suy ra F(a) = F(b) - ∫_a^b f(x)dx.',
    conditionSummary: 'a < b và I ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: 1, max: 12 },
      { name: 'b', label: 'Cận trên b', min: 4, max: 18 },
      { name: 'val', label: 'Giá trị tích phân I', min: -8, max: 8, allowZero: false },
      { name: 'fb', label: 'Giá trị F(b)', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b, val, fb } = params;
      if (a >= b || val === 0 || fb === 0) return { valid: false, reason: 'Cần a < b và giá trị khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, val, fb } = params;
      const ans = fb - val;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (-ans) + '$', '$' + fb + '$', '$' + (fb + val) + '$'],
        rng,
        (step) => '$' + (ans + step + 2) + '$'
      );
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của $f(x)$ thỏa mãn $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + val + '$ và $F(' + b + ') = ' + fb + '$. Tính $F(' + a + ')$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Ta có $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = F(' + b + ') - F(' + a + ') = ' + fb + ' - F(' + a + ') = ' + val + '$.',
          'Suy ra $F(' + a + ') = ' + fb + ' - (' + val + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 16, b: 10, val: 1, fb: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q04 I=1, F(16)=-5 -> F(10)=-6', params: { a: 10, b: 16, val: 1, fb: -5 }, expectedValid: true },
    ],
  },

  // Dạng 05 (Q05): Biết ∫_a^b f(x)dx = I -> tính ∫_a^b [k f(x) + c]dx
  t12_b12_d05_linear_combo_const_mc: {
    id: 't12_b12_d05_linear_combo_const_mc',
    name: 'Tính tích phân ∫_a^b [k·f(x) + c]dx từ giá trị ∫_a^b f(x)dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Áp dụng tính chất tuyến tính: ∫_a^b [k f(x) + c]dx = k ∫_a^b f(x)dx + c(b - a).',
    conditionSummary: 'a < b, k ≠ 0, c ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -3, max: 8 },
      { name: 'b', label: 'Cận trên b', min: 1, max: 12 },
      { name: 'val', label: 'Giá trị ∫ f(x)dx', min: -10, max: 10, allowZero: false },
      { name: 'k', label: 'Hệ số k', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, b, val, k, c } = params;
      if (a >= b || val === 0 || k === 0 || c === 0) return { valid: false, reason: 'Cần a < b và các tham số khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, val, k, c } = params;
      const len = b - a;
      const ans = k * val + c * len;
      const expr = u.formatTerm(k, 'f(x)', true) + u.formatTerm(c, '', false);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (k * val - c * len) + '$', '$' + (k * val + c) + '$', '$' + (ans - 4) + '$'],
        rng,
        (step) => '$' + (ans + step * 3 + 1) + '$'
      );
      return {
        stem: 'Cho tích phân $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + val + '$. Tính tích phân $\\int\\limits_{' + a + '}^{' + b + '} \\left[' + expr + '\\right]\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          '$\\int\\limits_{' + a + '}^{' + b + '} \\left[' + expr + '\\right]\\mathrm{\\,d}x = ' + k + '\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c)) + ' \\cdot (' + b + (a >= 0 ? ' - ' + a : ' + ' + Math.abs(a)) + ')$.',
          'Thay số: $' + k + ' \\cdot (' + val + ') ' + (c >= 0 ? '+ ' + c : '- ' + Math.abs(c)) + ' \\cdot ' + len + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 9, b: 7, val: 7, k: -9, c: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q05 -9f(x)+4 trên [7;9] -> -55', params: { a: 7, b: 9, val: 7, k: -9, c: 4 }, expectedValid: true },
    ],
  },

  // Dạng 06 (Q06): Tính tổ hợp tuyến tính ∫_a^b [k f(x) + m g(x)]dx
  t12_b12_d06_two_func_linear_mc: {
    id: 't12_b12_d06_two_func_linear_mc',
    name: 'Tính tích phân tổ hợp tuyến tính ∫_a^b [k·f(x) + m·g(x)]dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Biết hai tích phân của f(x) và g(x) trên cùng đoạn [a; b], tính ∫_a^b [k f(x) + m g(x)]dx.',
    conditionSummary: 'a < b, k, m, I1, I2 khác 0',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -5, max: 4 },
      { name: 'b', label: 'Cận trên b', min: 2, max: 10 },
      { name: 'i1', label: '∫ f(x)dx', min: -10, max: 10, allowZero: false },
      { name: 'i2', label: '∫ g(x)dx', min: -10, max: 10, allowZero: false },
      { name: 'k', label: 'Hệ số k', min: -8, max: 8, allowZero: false },
      { name: 'm', label: 'Hệ số m', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, i1, i2, k, m } = params;
      if (a >= b || i1 === 0 || i2 === 0 || k === 0 || m === 0) return { valid: false, reason: 'Cần a < b và các tham số khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, i1, i2, k, m } = params;
      const ans = k * i1 + m * i2;
      const expr = u.formatTerm(k, 'f(x)', true) + u.formatTerm(m, 'g(x)', false);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (k * i1 - m * i2) + '$', '$' + (ans - 8) + '$', '$' + (i1 - i2) + '$'],
        rng,
        (step) => '$' + (ans + step * 5 + 2) + '$'
      );
      return {
        stem: 'Cho $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + i1 + '$ và $\\int\\limits_{' + a + '}^{' + b + '} g(x)\\mathrm{\\,d}x = ' + i2 + '$. Tính $\\int\\limits_{' + a + '}^{' + b + '} \\left[' + expr + '\\right]\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          '$\\int\\limits_{' + a + '}^{' + b + '} \\left[' + expr + '\\right]\\mathrm{\\,d}x = ' + k + ' \\cdot (' + i1 + ') ' + (m >= 0 ? '+ ' + m : '- ' + Math.abs(m)) + ' \\cdot (' + i2 + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 5, b: 5, i1: -9, i2: -8, k: -7, m: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q06 -7f+g trên [-1;9] -> 55', params: { a: -1, b: 9, i1: -9, i2: -8, k: -7, m: 1 }, expectedValid: true },
    ],
  },

  // Dạng 07 (Q07): Tính ∫_a^b f'(x)dx khi biết f(a), f(b)
  t12_b12_d07_integral_deriv_vals_mc: {
    id: 't12_b12_d07_integral_deriv_vals_mc',
    name: 'Tính ∫_a^b f\'(x)dx khi biết f(a) và f(b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Sử dụng ∫_a^b f\'(x)dx = f(b) - f(a) với hai giá trị đầu mút của hàm số có đạo hàm trên [a; b].',
    conditionSummary: 'a < b và f(a) ≠ f(b)',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -6, max: 4 },
      { name: 'b', label: 'Cận trên b', min: 0, max: 10 },
      { name: 'fa', label: 'Giá trị f(a)', min: -9, max: 9, allowZero: false },
      { name: 'fb', label: 'Giá trị f(b)', min: -9, max: 12, allowZero: false },
    ],
    validateCode: `
      const { a, b, fa, fb } = params;
      if (a >= b || fa === fb || fa === -fb) return { valid: false, reason: 'Cần a < b và |f(a)| ≠ |f(b)|' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, fa, fb } = params;
      const ans = fb - fa;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (-ans) + '$', '$' + (fb + fa) + '$', '$' + (fa * fb) + '$'],
        rng,
        (step) => '$' + (ans + step * 2 + 1) + '$'
      );
      return {
        stem: 'Cho hàm số $f(x)$ có đạo hàm trên đoạn $[' + a + '; ' + b + ']$, $f(' + a + ') = ' + fa + '$ và $f(' + b + ') = ' + fb + '$. Tính $\\int\\limits_{' + a + '}^{' + b + '} f\'(x)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Vì $f(x)$ là một nguyên hàm của $f\'(x)$ nên $\\int\\limits_{' + a + '}^{' + b + '} f\'(x)\\mathrm{\\,d}x = f(' + b + ') - f(' + a + ') = ' + fb + ' - (' + fa + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 4, b: 2, fa: 2, fb: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q07 [-1;4], f(-1)=2, f(4)=10 -> 8', params: { a: -1, b: 4, fa: 2, fb: 10 }, expectedValid: true },
    ],
  },

  // Dạng 08 (Q08): Biết ∫_a^b f'(x)dx và f(a) -> tính f(b)
  t12_b12_d08_find_fb_from_deriv_integral_mc: {
    id: 't12_b12_d08_find_fb_from_deriv_integral_mc',
    name: 'Tìm f(b) khi biết ∫_a^b f\'(x)dx và f(a)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Từ ∫_a^b f\'(x)dx = f(b) - f(a) suy ra f(b) = f(a) + ∫_a^b f\'(x)dx.',
    conditionSummary: 'a < b, val ≠ 0, fa ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -4, max: 6 },
      { name: 'b', label: 'Cận trên b', min: 1, max: 12 },
      { name: 'val', label: 'Giá trị ∫ f\'(x)dx', min: -10, max: 12, allowZero: false },
      { name: 'fa', label: 'Giá trị f(a)', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { a, b, val, fa } = params;
      if (a >= b || val === 0 || fa === 0) return { valid: false, reason: 'Cần a < b và các tham số khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, val, fa } = params;
      const ans = fa + val;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (fa - val) + '$', '$' + (val - fa) + '$', '$' + (val * fa) + '$'],
        rng,
        (step) => '$' + (ans + step * 2 + 3) + '$'
      );
      return {
        stem: 'Biết $\\int\\limits_{' + a + '}^{' + b + '} f\'(x)\\mathrm{\\,d}x = ' + val + '$ và $f(' + a + ') = ' + fa + '$. Tính $f(' + b + ')$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Ta có $\\int\\limits_{' + a + '}^{' + b + '} f\'(x)\\mathrm{\\,d}x = f(' + b + ') - f(' + a + ') \\Rightarrow f(' + b + ') = f(' + a + ') + \\int\\limits_{' + a + '}^{' + b + '} f\'(x)\\mathrm{\\,d}x = ' + fa + (val >= 0 ? ' + ' + val : ' - ' + Math.abs(val)) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 8, b: 4, val: 9, fa: -8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q08 ∫_4^8 f\' = 9, f(4) = -8 -> f(8) = 1', params: { a: 4, b: 8, val: 9, fa: -8 }, expectedValid: true },
    ],
  },

  // Dạng 09 (Q09): Cộng đoạn tích phân ∫_a^c + ∫_c^b = ∫_a^b
  t12_b12_d09_additivity_sum_mc: {
    id: 't12_b12_d09_additivity_sum_mc',
    name: 'Tính ∫_a^b f(x)dx từ ∫_a^c f(x)dx và ∫_c^b f(x)dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Áp dụng tính chất cộng đoạn ∫_a^b f(x)dx = ∫_a^c f(x)dx + ∫_c^b f(x)dx với a < c < b.',
    conditionSummary: 'a < c < b, I1, I2 khác 0 và |I1| ≠ |I2|',
    paramSpecs: [
      { name: 'a', label: 'Cận a', min: -4, max: 5 },
      { name: 'c', label: 'Cận giữa c', min: 0, max: 8 },
      { name: 'b', label: 'Cận b', min: 4, max: 14 },
      { name: 'i1', label: '∫_a^c f(x)dx', min: -12, max: 14, allowZero: false },
      { name: 'i2', label: '∫_c^b f(x)dx', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { a, c, b, i1, i2 } = params;
      if (!(a < c && c < b) || i1 === 0 || i2 === 0 || Math.abs(i1) === Math.abs(i2)) {
        return { valid: false, reason: 'Cần a < c < b và |I1| ≠ |I2| khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, b, i1, i2 } = params;
      const ans = i1 + i2;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (i1 - i2) + '$', '$' + (i2 - i1) + '$', '$' + (i1 * i2) + '$'],
        rng,
        (step) => '$' + (ans + step * 2 + 3) + '$'
      );
      return {
        stem: 'Cho $\\int\\limits_{' + a + '}^{' + c + '} f(x)\\mathrm{\\,d}x = ' + i1 + '$ và $\\int\\limits_{' + c + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + i2 + '$. Tính $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          '$\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = \\int\\limits_{' + a + '}^{' + c + '} f(x)\\mathrm{\\,d}x + \\int\\limits_{' + c + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + i1 + (i2 >= 0 ? ' + ' + i2 : ' - ' + Math.abs(i2)) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c ngoài (a;b)', params: { a: 5, c: 5, b: 10, i1: 11, i2: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q09 [5;6]=11, [6;10]=-1 -> 10', params: { a: 5, c: 6, b: 10, i1: 11, i2: -1 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10): Trừ đoạn tích phân ∫_a^b - ∫_a^c = ∫_c^b
  t12_b12_d10_additivity_diff_mc: {
    id: 't12_b12_d10_additivity_diff_mc',
    name: 'Tính ∫_c^b f(x)dx khi biết ∫_a^b f(x)dx và ∫_a^c f(x)dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Suy ra ∫_c^b f(x)dx = ∫_a^b f(x)dx - ∫_a^c f(x)dx với a < c < b.',
    conditionSummary: 'a < c < b, |I| ≠ |I1| khác 0',
    paramSpecs: [
      { name: 'a', label: 'Cận a', min: -8, max: 0 },
      { name: 'c', label: 'Cận c', min: -6, max: 3 },
      { name: 'b', label: 'Cận b', min: 1, max: 9 },
      { name: 'totalI', label: '∫_a^b f(x)dx', min: -10, max: 12, allowZero: false },
      { name: 'subI', label: '∫_a^c f(x)dx', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, c, b, totalI, subI } = params;
      if (!(a < c && c < b) || totalI === 0 || subI === 0 || Math.abs(totalI) === Math.abs(subI)) {
        return { valid: false, reason: 'Cần a < c < b và |totalI| ≠ |subI|' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, b, totalI, subI } = params;
      const ans = totalI - subI;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (totalI + subI) + '$', '$' + (-ans) + '$', '$' + (totalI * subI) + '$'],
        rng,
        (step) => '$' + (ans + step * 2 + 2) + '$'
      );
      return {
        stem: 'Cho $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + totalI + '$ và $\\int\\limits_{' + a + '}^{' + c + '} f(x)\\mathrm{\\,d}x = ' + subI + '$. Tính $\\int\\limits_{' + c + '}^{' + b + '} f(x)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          '$\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = \\int\\limits_{' + a + '}^{' + c + '} f(x)\\mathrm{\\,d}x + \\int\\limits_{' + c + '}^{' + b + '} f(x)\\mathrm{\\,d}x$.',
          'Suy ra $\\int\\limits_{' + c + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + totalI + ' - (' + subI + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên thứ tự cận sai', params: { a: -3, c: -5, b: 3, totalI: 6, subI: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 [-6;3]=6, [-6;-5]=-3 -> [-5;3]=9', params: { a: -6, c: -5, b: 3, totalI: 6, subI: -3 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11): Tổng hai tích phân rời ∫_a^b + ∫_c^d = ∫_a^d - ∫_b^c
  t12_b12_d11_split_outer_segments_mc: {
    id: 't12_b12_d11_split_outer_segments_mc',
    name: 'Tính tổng hai tích phân hai đầu đoạn ∫_a^b f(x)dx + ∫_c^d f(x)dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Với a < b < c < d, tính ∫_a^b f + ∫_c^d f = ∫_a^d f - ∫_b^c f.',
    conditionSummary: 'a < b < c < d, các giá trị tích phân khác 0',
    paramSpecs: [
      { name: 'a', label: 'Cận a', min: 0, max: 5 },
      { name: 'b', label: 'Cận b', min: 3, max: 9 },
      { name: 'c', label: 'Cận c', min: 8, max: 13 },
      { name: 'd', label: 'Cận d', min: 11, max: 17 },
      { name: 'iTotal', label: '∫_a^d f(x)dx', min: -20, max: 20, allowZero: false },
      { name: 'iMid', label: '∫_b^c f(x)dx', min: -15, max: 15, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d, iTotal, iMid } = params;
      if (!(a < b && b < c && c < d) || iTotal === 0 || iMid === 0 || Math.abs(iTotal) === Math.abs(iMid)) {
        return { valid: false, reason: 'Cần a < b < c < d và giá trị tích phân phân biệt khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, iTotal, iMid } = params;
      const ans = iTotal - iMid;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (-ans) + '$', '$' + (iTotal + iMid) + '$', '$' + (iTotal * iMid) + '$'],
        rng,
        (step) => '$' + (ans + step * 3 + 1) + '$'
      );
      return {
        stem: 'Cho $\\int\\limits_{' + a + '}^{' + d + '} f(x)\\mathrm{\\,d}x = ' + iTotal + '$ và $\\int\\limits_{' + b + '}^{' + c + '} f(x)\\mathrm{\\,d}x = ' + iMid + '$. Tính $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x + \\int\\limits_{' + c + '}^{' + d + '} f(x)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Ta có $\\int\\limits_{' + a + '}^{' + d + '} f(x)\\mathrm{\\,d}x = \\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x + \\int\\limits_{' + b + '}^{' + c + '} f(x)\\mathrm{\\,d}x + \\int\\limits_{' + c + '}^{' + d + '} f(x)\\mathrm{\\,d}x$.',
          'Suy ra $\\int\\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x + \\int\\limits_{' + c + '}^{' + d + '} f(x)\\mathrm{\\,d}x = ' + iTotal + ' - (' + iMid + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b >= c', params: { a: 4, b: 13, c: 9, d: 14, iTotal: -18, iMid: -10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 [4;14]=-18, [9;13]=-10 -> -8', params: { a: 4, b: 9, c: 13, d: 14, iTotal: -18, iMid: -10 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12): Tích phân đa thức bậc ba
  t12_b12_d12_cubic_poly_integral_mc: {
    id: 't12_b12_d12_cubic_poly_integral_mc',
    name: 'Tính tích phân hàm đa thức bậc ba ∫_a^b (Ax³ + Bx² + Cx + D)dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm đa thức cơ bản',
    description: 'Tính trực tiếp tích phân xác định của đa thức bậc ba trên [a; b] và rút gọn kết quả dưới dạng phân số tối giản.',
    conditionSummary: 'A ≠ 0 và cận a < b',
    paramSpecs: [
      { name: 'A', label: 'Hệ số x³', min: -4, max: 4, allowZero: false },
      { name: 'B', label: 'Hệ số x²', min: -4, max: 4, allowZero: false },
      { name: 'C', label: 'Hệ số x', min: -4, max: 4, allowZero: false },
      { name: 'D', label: 'Hệ số tự do', min: -5, max: 5, allowZero: false },
      { name: 'a', label: 'Cận dưới a', min: -5, max: 1 },
      { name: 'b', label: 'Cận trên b', min: 0, max: 4 },
    ],
    validateCode: `
      const { A, B, C, D, a, b } = params;
      if (A === 0 || B === 0 || C === 0 || D === 0 || a >= b) {
        return { valid: false, reason: 'Các hệ số phải khác 0 và a < b' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, B, C, D, a, b } = params;
      const poly = u.formatPoly([A, B, C, D]);
      // F(x) = (3A x^4 + 4B x^3 + 6C x^2 + 12D x) / 12
      const numAt = (x) => 3 * A * Math.pow(x, 4) + 4 * B * Math.pow(x, 3) + 6 * C * x * x + 12 * D * x;
      const res = u.simplifyFrac(numAt(b) - numAt(a), 12);
      const w1 = u.simplifyFrac(res.num - 120, res.den);
      const w2 = u.simplifyFrac(res.num - 150, res.den);
      const w3 = u.simplifyFrac(res.num + 60, res.den);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + res.latex + '$',
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$'],
        rng,
        (step) => '$' + u.simplifyFrac(res.num + step * 12 + 5, res.den).latex + '$'
      );
      const fmtFracTerm = (fr, deg, isFirst) => {
        const absF = u.simplifyFrac(Math.abs(fr.num), fr.den);
        const varStr = deg === 1 ? 'x' : 'x^' + deg;
        const coeff = absF.den === 1 && absF.num === 1 ? '' : absF.latex;
        if (isFirst) return (fr.num < 0 ? '-' : '') + coeff + varStr;
        return (fr.num < 0 ? ' - ' : ' + ') + coeff + varStr;
      };
      const antiPoly =
        fmtFracTerm(u.simplifyFrac(A, 4), 4, true) +
        fmtFracTerm(u.simplifyFrac(B, 3), 3, false) +
        fmtFracTerm(u.simplifyFrac(C, 2), 2, false) +
        u.formatTerm(D, 'x', false);
      return {
        stem: 'Tính tích phân $\\int \\limits_{' + a + '}^{' + b + '} \\left(' + poly + '\\right)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + res.latex + '$',
        solutionSteps: [
          'Tìm một nguyên hàm: $F(x) = ' + antiPoly + '$.',
          'Áp dụng công thức Newton - Leibniz: $I = F(' + b + ') - F(' + a + ') = ' + res.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 0', params: { A: 0, B: 1, C: -1, D: 3, a: -5, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 [-5;0] -> 6455/12', params: { A: -3, B: 1, C: -1, D: 3, a: -5, b: 0 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13): Biết ∫_a^b f(x)dx -> tính ∫_a^b [k f(x) + mx + n]dx
  t12_b12_d13_linear_plus_lin_fn_mc: {
    id: 't12_b12_d13_linear_plus_lin_fn_mc',
    name: 'Tính ∫_a^b [k·f(x) + mx + n]dx khi biết ∫_a^b f(x)dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm đa thức cơ bản',
    description: 'Tách tích phân thành k ∫ f(x)dx + ∫ (mx + n)dx để tính giá trị.',
    conditionSummary: 'a < b, m chẵn hoặc (b² - a²) chẵn để phần đa thức nguyên',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -3, max: 4 },
      { name: 'b', label: 'Cận trên b', min: 1, max: 7 },
      { name: 'val', label: 'Giá trị ∫ f(x)dx', min: -9, max: 10, allowZero: false },
      { name: 'k', label: 'Hệ số k của f(x)', min: -5, max: 5, allowZero: false },
      { name: 'm', label: 'Hệ số x', min: -4, max: 4, allowZero: false },
      { name: 'n', label: 'Hằng số n', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, b, val, k, m, n } = params;
      if (a >= b || val === 0 || k === 0 || m === 0 || n === 0) return { valid: false, reason: 'Tham số phải hợp lệ và a < b' };
      if ((m * (b * b - a * a)) % 2 !== 0) return { valid: false, reason: 'Chọn cận cùng tính chẵn lẻ hoặc m chẵn để tích phân nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, val, k, m, n } = params;
      const linInt = (m * (b * b - a * a)) / 2 + n * (b - a);
      const ans = k * val + linInt;
      const expr = u.formatTerm(k, 'f(x)', true) + u.formatTerm(m, 'x', false) + u.formatTerm(n, '', false);
      const linExpr = u.formatLinear(m, n);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (k * val - linInt) + '$', '$' + (ans + 35) + '$', '$' + (ans + 59) + '$'],
        rng,
        (step) => '$' + (ans + step * 4 + 3) + '$'
      );
      return {
        stem: 'Biết $\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + val + '$. Tính tích phân $\\int \\limits_{' + a + '}^{' + b + '} \\left[' + expr + '\\right]\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Tách tích phân: $\\int \\limits_{' + a + '}^{' + b + '} \\left[' + expr + '\\right]\\mathrm{\\,d}x = ' + k + '\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x + \\int \\limits_{' + a + '}^{' + b + '} (' + linExpr + ')\\mathrm{\\,d}x$.',
          'Tính $\\int \\limits_{' + a + '}^{' + b + '} (' + linExpr + ')\\mathrm{\\,d}x = ' + linInt + '$, suy ra kết quả là $' + k + ' \\cdot (' + val + ') ' + (linInt >= 0 ? '+ ' + linInt : '- ' + Math.abs(linInt)) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 5, b: 3, val: 9, k: -3, m: -1, n: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 [3;5], f=9, -3f+5-x -> -25', params: { a: 3, b: 5, val: 9, k: -3, m: -1, n: 5 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14): Cho ∫_a^b [k f(x) + mx + n]dx = M -> tìm ∫_a^b f(x)dx
  t12_b12_d14_reverse_linear_integral_mc: {
    id: 't12_b12_d14_reverse_linear_integral_mc',
    name: 'Tìm ∫_a^b f(x)dx khi biết ∫_a^b [k·f(x) + mx + n]dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm đa thức cơ bản',
    description: 'Biết tích phân của tổ hợp k f(x) + mx + n bằng M, rút ra ∫_a^b f(x)dx.',
    conditionSummary: 'k ≠ 0, ans nguyên, m(b² - a²) chẵn',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -5, max: 2 },
      { name: 'b', label: 'Cận trên b', min: -3, max: 4 },
      { name: 'k', label: 'Hệ số k', min: -4, max: 4, allowZero: false },
      { name: 'm', label: 'Hệ số x', min: -6, max: 6, allowZero: false },
      { name: 'n', label: 'Hằng số n', min: -6, max: 6, allowZero: false },
      { name: 'ans', label: 'Giá trị đúng ∫ f(x)dx', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { a, b, k, m, n, ans } = params;
      if (a >= b || k === 0 || m === 0 || n === 0 || ans === 0) return { valid: false, reason: 'Cần a < b và các tham số khác 0' };
      if ((m * (b * b - a * a)) % 2 !== 0) return { valid: false, reason: 'Chọn m(b² - a²) chẵn để phép tính nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k, m, n, ans } = params;
      const linInt = (m * (b * b - a * a)) / 2 + n * (b - a);
      const M = k * ans + linInt;
      const expr = u.formatTerm(k, 'f(x)', true) + u.formatTerm(m, 'x', false) + u.formatTerm(n, '', false);
      const linExpr = u.formatLinear(m, n);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (-ans) + '$', '$' + (ans - 2) + '$', '$' + (ans + 13) + '$'],
        rng,
        (step) => '$' + (ans + step * 3 + 1) + '$'
      );
      return {
        stem: 'Biết $\\int \\limits_{' + a + '}^{' + b + '} \\left[' + expr + '\\right]\\mathrm{\\,d}x = ' + M + '$. Tính tích phân $\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Ta có $' + k + '\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x + \\int \\limits_{' + a + '}^{' + b + '} (' + linExpr + ')\\mathrm{\\,d}x = ' + M + '$.',
          'Vì $\\int \\limits_{' + a + '}^{' + b + '} (' + linExpr + ')\\mathrm{\\,d}x = ' + linInt + '$ nên $' + k + '\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + (M - linInt) + ' \\Rightarrow \\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: -2, b: -3, k: -2, m: -6, n: -5, ans: -8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 [-3;-2], M=26 -> -8', params: { a: -3, b: -2, k: -2, m: -6, n: -5, ans: -8 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15): ∫_u^v k/x dx = a ln b -> tính p a + q b
  t12_b12_d15_inv_x_ln_ab_mc: {
    id: 't12_b12_d15_inv_x_ln_ab_mc',
    name: 'Tính biểu thức chứa a, b từ ∫_u^v (k/x)dx = a ln b',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Tính ∫_u^v (k/x)dx = k ln(v/u) để xác định a = k, b = v/u và tính p a + q b.',
    conditionSummary: '0 < u < v, k > 0, c1, c2 khác 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u (> 0)', min: 2, max: 8 },
      { name: 'v', label: 'Cận trên v (> u)', min: 4, max: 14 },
      { name: 'k', label: 'Tử số k (> 0)', min: 2, max: 7 },
      { name: 'c1', label: 'Hệ số của a', min: -3, max: 3, allowZero: false },
      { name: 'c2', label: 'Hệ số của b', min: 1, max: 4 },
    ],
    validateCode: `
      const { u0, v, k, c1, c2 } = params;
      if (u0 <= 0 || v <= u0 || k <= 0 || c1 === 0 || c2 <= 0) {
        return { valid: false, reason: 'Cần 0 < u < v và k, c2 > 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, k, c1, c2 } = params;
      const bFrac = u.simplifyFrac(v, u0);
      const expr = u.formatTerm(c1, 'a', true) + u.formatTerm(c2, 'b', false);
      const ansFrac = u.simplifyFrac(c1 * k * bFrac.den + c2 * bFrac.num, bFrac.den);
      const d1Frac = u.simplifyFrac(ansFrac.num - 6 * ansFrac.den, ansFrac.den);
      const d2Frac = u.simplifyFrac(-ansFrac.num, ansFrac.den);
      const d3Frac = u.simplifyFrac(ansFrac.num + 2 * ansFrac.den, ansFrac.den);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ansFrac.latex + '$',
        ['$' + d1Frac.latex + '$', '$' + d2Frac.latex + '$', '$' + d3Frac.latex + '$'],
        rng,
        (step) => '$' + u.simplifyFrac(ansFrac.num + step * 3, ansFrac.den).latex + '$'
      );
      return {
        stem: 'Biết tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} \\frac{' + k + '}{x}\\mathrm{\\,d}x = a\\ln b$ (với $a \\in \\mathbb{Z}, b \\in \\mathbb{Q}^+$). Tính $' + expr + '$.',
        options,
        correctIndex,
        answerSummary: '$' + ansFrac.latex + '$',
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} \\frac{' + k + '}{x}\\mathrm{\\,d}x = ' + k + '\\ln x\\Big|_{' + u0 + '}^{' + v + '} = ' + k + '(\\ln ' + v + ' - \\ln ' + u0 + ') = ' + k + '\\ln ' + bFrac.latex + '$.',
          'Suy ra $a = ' + k + ',\\, b = ' + bFrac.latex + '$, do đó $' + expr + ' = ' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 9, v: 6, k: 3, c1: -2, c2: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 [6;9] 3/x, -2a+2b = -3', params: { u0: 6, v: 9, k: 3, c1: -2, c2: 2 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16): Tính trực tiếp ∫_u^v k/x dx
  t12_b12_d16_inv_x_direct_mc: {
    id: 't12_b12_d16_inv_x_direct_mc',
    name: 'Tính tích phân cơ bản ∫_u^v (k/x)dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Tính trực tiếp ∫_u^v (k/x)dx = k ln(v/u) và phân biệt nhiễu đảo hệ số 1/k hoặc nghịch đảo phân số trong logarit.',
    conditionSummary: '0 < u < v, k ≥ 2',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u (> 0)', min: 2, max: 8 },
      { name: 'v', label: 'Cận trên v (> u)', min: 4, max: 14 },
      { name: 'k', label: 'Tử số k', min: 2, max: 8 },
    ],
    validateCode: `
      const { u0, v, k } = params;
      if (u0 <= 0 || v <= u0 || k < 2) return { valid: false, reason: 'Cần 0 < u < v và k >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, k } = params;
      const ratio = u.simplifyFrac(v, u0);
      const invRatio = u.simplifyFrac(u0, v);
      const invK = u.simplifyFrac(1, k);
      const correct = '$' + k + '\\ln ' + ratio.latex + '$';
      const d1 = '$' + invK.latex + '\\ln ' + ratio.latex + '$';
      const d2 = '$' + invK.latex + '\\ln ' + invRatio.latex + '$';
      const d3 = '$' + (2 * k) + '\\ln ' + (u0 + v) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (k + step) + '\\ln ' + ratio.latex + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} \\frac{' + k + '}{x}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} \\frac{' + k + '}{x}\\mathrm{\\,d}x = ' + k + '\\ln x\\Big|_{' + u0 + '}^{' + v + '} = ' + k + '(\\ln ' + v + ' - \\ln ' + u0 + ') = ' + k + '\\ln ' + ratio.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 8, v: 6, k: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 [6;8] 6/x -> 6 ln(4/3)', params: { u0: 6, v: 8, k: 6 }, expectedValid: true },
    ],
  },

  // Dạng 17 (Q17): Tính ∫_u^v k/(ax + b) dx
  t12_b12_d17_linear_denom_mc: {
    id: 't12_b12_d17_linear_denom_mc',
    name: 'Tính tích phân ∫_u^v k/(ax + b)dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Tính ∫_u^v k/(ax+b)dx = (k/a) ln((av+b)/(au+b)) với điều kiện mẫu không triệt tiêu trên [u; v].',
    conditionSummary: 'u < v, a ≥ 2, au+b > 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: 1, max: 5 },
      { name: 'v', label: 'Cận trên v (> u)', min: 2, max: 8 },
      { name: 'k', label: 'Tử số k', min: 2, max: 7 },
      { name: 'a', label: 'Hệ số a (> 1)', min: 2, max: 7 },
      { name: 'b', label: 'Hằng số b (> 0)', min: 1, max: 12 },
    ],
    validateCode: `
      const { u0, v, k, a, b } = params;
      if (u0 >= v || a < 2 || b <= 0 || k <= 0 || a * u0 + b <= 0) {
        return { valid: false, reason: 'Cần u < v, a >= 2 và mẫu dương trên [u; v]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, k, a, b } = params;
      const denomStr = u.formatLinear(a, b);
      const coeff = u.simplifyFrac(k, a);
      const cStr = coeff.num === 1 && coeff.den === 1 ? '' : coeff.latex;
      const low = a * u0 + b;
      const high = a * v + b;
      const ratio = u.simplifyFrac(high, low);
      const invRatio = u.simplifyFrac(low, high);
      const correct = '$' + cStr + '\\ln ' + ratio.latex + '$';
      const d1 = '$' + (k * a) + '\\ln ' + high + '$';
      const d2 = '$\\ln ' + invRatio.latex + '$';
      const d3 = '$' + k + '\\ln ' + ratio.latex + ' + 2$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.simplifyFrac(k + step, a).latex + '\\ln ' + ratio.latex + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} \\frac{' + k + '}{' + denomStr + '}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} \\frac{' + k + '}{' + denomStr + '}\\mathrm{\\,d}x = ' + coeff.latex + '\\ln |' + denomStr + '|\\Big|_{' + u0 + '}^{' + v + '} = ' + coeff.latex + '(\\ln ' + high + ' - \\ln ' + low + ') = ' + cStr + '\\ln ' + ratio.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 4, v: 2, k: 4, a: 5, b: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 [2;4] 4/(5x+9) -> (4/5)ln(29/19)', params: { u0: 2, v: 4, k: 4, a: 5, b: 9 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18): ∫_u^{2u} (ax + b)/(cx) dx = p + q ln 2 -> tính p + q
  t12_b12_d18_lin_over_x_mc: {
    id: 't12_b12_d18_lin_over_x_mc',
    name: 'Tính p + q từ tích phân ∫_u^(2u) (ax + b)/(cx)dx = p + q ln 2',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Chia tử cho mẫu (ax + b)/(cx) = a/c + b/(cx) để tính tích phân trên [u; 2u] và tìm p + q.',
    conditionSummary: 'u >= 1, c >= 2, a, b khác 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u (cận trên 2u)', min: 1, max: 4 },
      { name: 'a', label: 'Hệ số x trên tử', min: 1, max: 6 },
      { name: 'b', label: 'Hằng số b trên tử', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hệ số c dưới mẫu', min: 2, max: 5 },
    ],
    validateCode: `
      const { u0, a, b, c } = params;
      if (u0 <= 0 || a <= 0 || b === 0 || c < 2) return { valid: false, reason: 'Tham số phải hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, a, b, c } = params;
      const v = 2 * u0;
      const pFrac = u.simplifyFrac(a * u0, c);
      const qFrac = u.simplifyFrac(b, c);
      const sumFrac = u.simplifyFrac(a * u0 + b, c);
      const numStr = u.formatLinear(a, b);
      const denStr = c + 'x';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + sumFrac.latex + '$',
        [
          '$' + u.simplifyFrac(sumFrac.num - 1, sumFrac.den + 1).latex + '$',
          '$' + u.simplifyFrac(sumFrac.num + 1, sumFrac.den + 2).latex + '$',
          '$' + u.simplifyFrac(-1, sumFrac.den + 3).latex + '$',
        ],
        rng,
        (step) => '$' + u.simplifyFrac(sumFrac.num + step * 2 + 1, sumFrac.den).latex + '$'
      );
      return {
        stem: 'Biết $\\int \\limits_{' + u0 + '}^{' + v + '} \\dfrac{' + numStr + '}{' + denStr + '}\\mathrm{\\,d}x = p + q\\ln 2$ (với $p, q \\in \\mathbb{Q}$). Tính $p + q$.',
        options,
        correctIndex,
        answerSummary: '$' + sumFrac.latex + '$',
        solutionSteps: [
          'Ta có $\\dfrac{' + numStr + '}{' + denStr + '} = ' + u.simplifyFrac(a, c).latex + (b >= 0 ? ' + ' : ' - ') + u.simplifyFrac(Math.abs(b), c).latex + '\\cdot \\dfrac{1}{x}$.',
          'Suy ra tích phân bằng $' + pFrac.latex + (qFrac.num >= 0 ? ' + ' : ' - ') + u.simplifyFrac(Math.abs(qFrac.num), qFrac.den).latex + '\\ln 2$, nên $p = ' + pFrac.latex + ',\\, q = ' + qFrac.latex + '$ và $p + q = ' + sumFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { u0: 1, a: 4, b: 0, c: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 [1;2] (4x-2)/(3x) -> p+q = 2/3', params: { u0: 1, a: 4, b: -2, c: 3 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19): ∫_u^v (b + ax^2)/x dx = p + q ln(v/u) -> tính p + q
  t12_b12_d19_quad_plus_const_over_x_mc: {
    id: 't12_b12_d19_quad_plus_const_over_x_mc',
    name: 'Tính p + q từ tích phân ∫_u^v (ax² + b)/x dx = p + q ln(v/u)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Chia đa thức (ax^2 + b)/x = ax + b/x để tính tích phân và suy ra p + q.',
    conditionSummary: '0 < u < v, a chẵn khác 0, b ≠ 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: 1, max: 4 },
      { name: 'v', label: 'Cận trên v (> u)', min: 2, max: 6 },
      { name: 'a2', label: 'Nửa hệ số x² (a = 2*a2)', min: -3, max: 3, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { u0, v, a2, b } = params;
      if (u0 <= 0 || v <= u0 || a2 === 0 || b === 0) return { valid: false, reason: 'Cần 0 < u < v và a2, b khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, a2, b } = params;
      const a = 2 * a2;
      const p = a2 * (v * v - u0 * u0);
      const q = b;
      const ans = p + q;
      const ratio = u.simplifyFrac(v, u0);
      const numStr = u.formatTerm(b, '', true) + u.formatTerm(a, 'x^2', false);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        [
          '$' + u.simplifyFrac(ans * 5 - 3, 5).latex + '$',
          '$' + u.simplifyFrac(ans * 10 - 1, 10).latex + '$',
          '$' + u.simplifyFrac(ans * 5 + 1, 5).latex + '$',
        ],
        rng,
        (step) => '$' + (ans + step * 2 + 1) + '$'
      );
      return {
        stem: 'Biết $\\int \\limits_{' + u0 + '}^{' + v + '} \\left(\\dfrac{' + numStr + '}{x}\\right)\\mathrm{\\,d}x = p + q\\ln ' + ratio.latex + '$ (với $p, q \\in \\mathbb{Z}$). Tính $p + q$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} \\left(' + u.formatTerm(a, 'x', true) + (b >= 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(b) + '}{x}\\right)\\mathrm{\\,d}x = \\left(' + u.formatTerm(a2, 'x^2', true) + u.formatTerm(b, '\\ln x', false) + '\\right)\\Big|_{' + u0 + '}^{' + v + '} = ' + p + u.formatTerm(q, '\\ln ' + ratio.latex, false) + '$.',
          'Vậy $p = ' + p + ',\\, q = ' + q + '$ nên $p + q = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 4, v: 3, a2: -2, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 [3;4] (1-4x²)/x -> -13', params: { u0: 3, v: 4, a2: -2, b: 1 }, expectedValid: true },
    ],
  },

  // Dạng 20 (Q20): ∫_u^{2u} (ax^2 + bx + c)/x dx = p + q ln 2 -> tính p + q
  t12_b12_d20_full_quad_over_x_mc: {
    id: 't12_b12_d20_full_quad_over_x_mc',
    name: 'Tính p + q từ tích phân ∫_u^(2u) (ax² + bx + c)/x dx = p + q ln 2',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Chia tam thức bậc hai cho x để tính tích phân trên [u; 2u] và xác định p + q.',
    conditionSummary: 'u >= 1, a chẵn khác 0, b ≠ 0, c ≠ 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u (cận trên 2u)', min: 1, max: 5 },
      { name: 'a2', label: 'Nửa hệ số x² (a = 2*a2)', min: 1, max: 5 },
      { name: 'b', label: 'Hệ số x', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: 1, max: 9 },
    ],
    validateCode: `
      const { u0, a2, b, c } = params;
      if (u0 <= 0 || a2 <= 0 || b === 0 || c <= 0) return { valid: false, reason: 'Tham số phải hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, a2, b, c } = params;
      const a = 2 * a2;
      const v = 2 * u0;
      const p = a2 * (v * v - u0 * u0) + b * (v - u0);
      const q = c;
      const ans = p + q;
      const numStr = u.formatQuadratic(a, b, c);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (ans * 8 + 98) + '$', '$' + (ans * 8 + 104) + '$', '$' + (ans * 8 + 112) + '$'],
        rng,
        (step) => '$' + (ans + step * 5 + 3) + '$'
      );
      return {
        stem: 'Biết rằng $\\displaystyle \\int_{' + u0 + '}^{' + v + '} \\dfrac{' + numStr + '}{x}\\mathrm{\\,d}x = p + q\\ln 2$ (với $p, q \\in \\mathbb{Z}$). Tính $p + q$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Ta có $\\dfrac{' + numStr + '}{x} = ' + u.formatLinear(a, b) + ' + \\dfrac{' + c + '}{x}$.',
          'Suy ra $I = \\left(' + u.formatTerm(a2, 'x^2', true) + u.formatTerm(b, 'x', false) + '\\right)\\Big|_{' + u0 + '}^{' + v + '} + ' + c + '\\ln 2 = ' + p + ' + ' + q + '\\ln 2$.',
          'Do đó $p = ' + p + ',\\, q = ' + q + '$, suy ra $p + q = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { u0: 4, a2: 4, b: 0, c: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 [4;8] (8x²-3x+9)/x -> 189', params: { u0: 4, a2: 4, b: -3, c: 9 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21): ∫_u^v (ax + b)/x^2 dx = p + q ln(v/u) -> tính p + q
  t12_b12_d21_lin_over_x2_mc: {
    id: 't12_b12_d21_lin_over_x2_mc',
    name: 'Tính p + q từ tích phân ∫_u^v (ax + b)/x² dx = p + q ln(v/u)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Tách (ax + b)/x² = a/x + b/x² để tính tích phân và tìm p + q.',
    conditionSummary: '0 < u < v, a, b khác 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: 1, max: 4 },
      { name: 'v', label: 'Cận trên v (> u)', min: 2, max: 6 },
      { name: 'a', label: 'Hệ số x trên tử', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hằng số b trên tử', min: 1, max: 6 },
    ],
    validateCode: `
      const { u0, v, a, b } = params;
      if (u0 <= 0 || v <= u0 || a === 0 || b <= 0) return { valid: false, reason: 'Cần 0 < u < v và a ≠ 0, b > 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, a, b } = params;
      // int (a/x + b/x^2) = [a ln x - b/x]_u^v = b(1/u - 1/v) + a ln(v/u)
      const pFrac = u.simplifyFrac(b * (v - u0), u0 * v);
      const sumFrac = u.simplifyFrac(pFrac.num + a * pFrac.den, pFrac.den);
      const ratio = u.simplifyFrac(v, u0);
      const numStr = u.formatTerm(b, '', true) + u.formatTerm(a, 'x', false);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + sumFrac.latex + '$',
        [
          '$' + u.simplifyFrac(sumFrac.num - 5, sumFrac.den * 2).latex + '$',
          '$' + u.simplifyFrac(-3, 1).latex + '$',
          '$' + u.simplifyFrac(1, 5).latex + '$',
        ],
        rng,
        (step) => '$' + u.simplifyFrac(sumFrac.num + step * 2 + 1, sumFrac.den).latex + '$'
      );
      return {
        stem: 'Biết $\\int \\limits_{' + u0 + '}^{' + v + '} \\dfrac{' + numStr + '}{x^2}\\mathrm{\\,d}x = p + q\\ln ' + ratio.latex + '$ (với $p, q \\in \\mathbb{Q}$). Tính $p + q$.',
        options,
        correctIndex,
        answerSummary: '$' + sumFrac.latex + '$',
        solutionSteps: [
          'Ta có $\\dfrac{' + numStr + '}{x^2} = ' + (a < 0 ? '-' : '') + '\\dfrac{' + Math.abs(a) + '}{x} + \\dfrac{' + b + '}{x^2}$.',
          'Nguyên hàm là $' + u.formatTerm(a, '\\ln x', true) + ' - \\dfrac{' + b + '}{x}$, suy ra $p = ' + pFrac.latex + ',\\, q = ' + a + '$ và $p + q = ' + sumFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 5, v: 3, a: -2, b: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 [3;5] (5-2x)/x² -> -4/3', params: { u0: 3, v: 5, a: -2, b: 5 }, expectedValid: true },
    ],
  },

  // Dạng 22 (Q22): ∫_u^v (qx + B)/(x + m) dx = a + b ln((v+m)/(u+m)) -> tính P = a + cb
  t12_b12_d22_rational_lin_over_lin_mc: {
    id: 't12_b12_d22_rational_lin_over_lin_mc',
    name: 'Tính biểu thức a + c·b từ tích phân ∫_u^v (Ax + B)/(x + m)dx',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Chia đa thức bậc nhất (qx + B)/(x + m) = q + r/(x + m) để tính tích phân và giá trị P = a + c·b.',
    conditionSummary: 'u < v, u + m > 0, r = B - qm ≠ 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: -6, max: 0 },
      { name: 'v', label: 'Cận trên v (> u)', min: -2, max: 4 },
      { name: 'q', label: 'Hệ số x trên tử', min: 1, max: 4 },
      { name: 'B', label: 'Hằng số B trên tử', min: -6, max: 6, allowZero: false },
      { name: 'm', label: 'Hằng số m dưới mẫu', min: 7, max: 12 },
      { name: 'c', label: 'Hệ số c trong P = a + c·b', min: 2, max: 4 },
    ],
    validateCode: `
      const { u0, v, q, B, m, c } = params;
      if (u0 >= v || u0 + m <= 0 || v + m <= 0 || q <= 0 || B === 0 || B - q * m === 0 || c < 2) {
        return { valid: false, reason: 'Cần u < v, mẫu dương trên [u; v] và phần dư ≠ 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, q, B, m, c } = params;
      const r = B - q * m;
      const aVal = q * (v - u0);
      const bVal = r;
      const P = aVal + c * bVal;
      const ratio = u.simplifyFrac(v + m, u0 + m);
      const numStr = u.formatLinear(q, B);
      const denStr = u.formatLinear(1, m);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$P = ' + P + '$',
        ['$P = ' + (-P + 16) + '$', '$P = ' + (P - 2) + '$', '$P = ' + (P + 1) + '$'],
        rng,
        (step) => '$P = ' + (P + step * 3 + 2) + '$'
      );
      return {
        stem: 'Biết tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} \\frac{' + numStr + '}{' + denStr + '}\\mathrm{\\,d}x = a + b\\ln ' + ratio.latex + '$, với $a, b \\in \\mathbb{R}$. Tính $P = a + ' + c + 'b$.',
        options,
        correctIndex,
        answerSummary: '$P = ' + P + '$',
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} \\frac{' + numStr + '}{' + denStr + '}\\mathrm{\\,d}x = \\int \\limits_{' + u0 + '}^{' + v + '} \\left(' + q + (r >= 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(r) + '}{' + denStr + '}\\right)\\mathrm{\\,d}x = \\left(' + u.formatTerm(q, 'x', true) + u.formatTerm(r, '\\ln|' + denStr + '|', false) + '\\right)\\Big|_{' + u0 + '}^{' + v + '} = ' + aVal + u.formatTerm(bVal, '\\ln ' + ratio.latex, false) + '$.',
          'Do đó $a = ' + aVal + ',\\, b = ' + bVal + '$, suy ra $P = a + ' + c + 'b = ' + P + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu âm tại cận dưới', params: { u0: -11, v: -1, q: 2, B: -4, m: 10, c: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 [-5;-1] (2x-4)/(x+10), P=a+3b=-64', params: { u0: -5, v: -1, q: 2, B: -4, m: 10, c: 3 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23): Tích phân ∫_u^v b^x dx
  t12_b12_d23_exp_base_b_mc: {
    id: 't12_b12_d23_exp_base_b_mc',
    name: 'Tính tích phân hàm số mũ ∫_u^v b^x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Áp dụng ∫ b^x dx = b^x / ln b để tính tích phân xác định trên [u; v].',
    conditionSummary: 'b >= 2, 0 <= u < v <= 5 để giá trị b^v - b^u nguyên gọn',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b', min: 2, max: 7 },
      { name: 'u0', label: 'Cận dưới u', min: 0, max: 3 },
      { name: 'v', label: 'Cận trên v (> u)', min: 2, max: 5 },
    ],
    validateCode: `
      const { b, u0, v } = params;
      if (b < 2 || u0 < 0 || u0 >= v || v > 5) return { valid: false, reason: 'Cần b >= 2 và 0 <= u < v <= 5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, u0, v } = params;
      const bu = Math.pow(b, u0);
      const bv = Math.pow(b, v);
      const diff = bv - bu;
      const correct = '$\\dfrac{' + diff + '}{\\ln ' + b + '}$';
      const d1 = '$\\dfrac{' + (v - u0) + '}{\\ln ' + b + '}$';
      const d2 = '$' + diff + '\\ln ' + b + '$';
      const d3 = '$\\dfrac{' + bu + '}{\\ln ' + b + '}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\dfrac{' + (diff + step * 2) + '}{\\ln ' + b + '}$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} ' + b + '^x\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} ' + b + '^x\\mathrm{\\,d}x = \\dfrac{' + b + '^x}{\\ln ' + b + '}\\Big|_{' + u0 + '}^{' + v + '} = \\dfrac{' + bv + '}{\\ln ' + b + '} - \\dfrac{' + bu + '}{\\ln ' + b + '} = \\dfrac{' + diff + '}{\\ln ' + b + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { b: 6, u0: 4, v: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 [2;4] 6^x -> 1260/ln6', params: { b: 6, u0: 2, v: 4 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24): Tính ∫_{-u}^{v} k e^x dx
  t12_b12_d24_k_exp_neg_to_pos_mc: {
    id: 't12_b12_d24_k_exp_neg_to_pos_mc',
    name: 'Tính tích phân ∫_{-u}^v k e^x dx với cận trái âm, cận phải dương',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Tính ∫_{-u}^v k e^x dx = k e^v - k / e^u.',
    conditionSummary: 'u, v >= 1, k >= 2',
    paramSpecs: [
      { name: 'u0', label: 'Độ lớn cận âm u (cận -u)', min: 1, max: 6 },
      { name: 'v', label: 'Cận dương v', min: 1, max: 6 },
      { name: 'k', label: 'Hệ số k (> 1)', min: 2, max: 8 },
    ],
    validateCode: `
      const { u0, v, k } = params;
      if (u0 < 1 || v < 1 || k < 2) return { valid: false, reason: 'Cần u, v >= 1 và k >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, k } = params;
      const ePow = (p) => (p === 1 ? 'e' : 'e^{' + p + '}');
      const correct = '$-\\frac{' + k + '}{' + ePow(u0) + '} + ' + k + ePow(v) + '$';
      const d1 = '$\\frac{' + k + '}{' + ePow(u0) + '} + ' + k + ePow(v) + '$';
      const d2 = '$-' + k + ePow(v) + ' + \\frac{' + k + '}{' + ePow(u0) + '}$';
      const d3 = '$\\frac{1}{' + k + '} - \\frac{1}{' + ePow(u0) + '} + ' + ePow(v) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$-\\frac{' + (k + step) + '}{' + ePow(u0) + '} + ' + (k + step) + ePow(v) + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{' + (-u0) + '}^{' + v + '} ' + k + 'e^x\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{' + (-u0) + '}^{' + v + '} ' + k + 'e^x\\mathrm{\\,d}x = ' + k + 'e^x\\Big|_{' + (-u0) + '}^{' + v + '} = -\\frac{' + k + '}{' + ePow(u0) + '} + ' + k + ePow(v) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k < 2', params: { u0: 4, v: 5, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 [-4;5] 3e^x -> -3/e^4 + 3e^5', params: { u0: 4, v: 5, k: 3 }, expectedValid: true },
    ],
  },

  // Dạng 25 (Q25): Tính ∫_u^v (b^x / d + c) dx
  t12_b12_d25_exp_base_over_d_const_mc: {
    id: 't12_b12_d25_exp_base_over_d_const_mc',
    name: 'Tính tích phân ∫_u^v (b^x / d + c)dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Tính ∫_u^v (b^x / d + c)dx = (b^v - b^u)/(d ln b) + c(v - u) với kết quả rút gọn đẹp.',
    conditionSummary: 'b >= 2, 1 <= u < v <= 4, d > 1',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b', min: 2, max: 7 },
      { name: 'u0', label: 'Cận dưới u', min: 1, max: 3 },
      { name: 'v', label: 'Cận trên v (> u)', min: 2, max: 4 },
      { name: 'm', label: 'Hệ số chia d = 2*b hoặc b', min: 1, max: 2 },
      { name: 'c', label: 'Hằng số c', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { b, u0, v, m, c } = params;
      if (b < 2 || u0 < 1 || u0 >= v || v > 4 || c === 0) return { valid: false, reason: 'Tham số cận hoặc hệ số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, u0, v, m, c } = params;
      const d = m * b;
      const diff = Math.pow(b, v) - Math.pow(b, u0);
      const frac = u.simplifyFrac(diff, d);
      const constTerm = c * (v - u0);
      const coeffStr = frac.den === 1 ? String(frac.num) : frac.latex;
      const leadTrue = frac.den === 1 ? '\\dfrac{' + frac.num + '}{\\ln ' + b + '}' : '\\dfrac{' + frac.num + '}{' + frac.den + '\\ln ' + b + '}';
      const constStr = u.formatTrailingConst(constTerm);
      const correct = '$' + leadTrue + constStr + '$';
      const d1 = '$\\dfrac{' + diff + '}{\\ln ' + b + '}' + u.formatTrailingConst(c * b) + '$';
      const d2 = '$' + coeffStr + '\\ln ' + b + constStr + '$';
      const d3 = '$' + leadTrue + u.formatTrailingConst(c * b) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + leadTrue + u.formatTrailingConst(constTerm + step * 2 + 1) + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} \\left(\\frac{' + b + '^x}{' + d + '}' + u.formatTerm(c, '', false) + '\\right)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} \\left(\\frac{' + b + '^x}{' + d + '}' + u.formatTerm(c, '', false) + '\\right)\\mathrm{\\,d}x = \\left(\\dfrac{' + b + '^x}{' + d + '\\ln ' + b + '}' + u.formatTerm(c, 'x', false) + '\\right)\\Big|_{' + u0 + '}^{' + v + '}$.',
          'Thay cận ta thu được kết quả ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { b: 7, u0: 4, v: 3, m: 2, c: -6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 [3;4] (7^x/14 - 6) -> 147/ln7 - 6', params: { b: 7, u0: 3, v: 4, m: 2, c: -6 }, expectedValid: true },
    ],
  },

  // Dạng 26 (Q26): Tính ∫_u^v (a e^x + c) dx
  t12_b12_d26_exp_plus_const_mc: {
    id: 't12_b12_d26_exp_plus_const_mc',
    name: 'Tính tích phân ∫_u^v (a e^x + c)dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Tính trực tiếp ∫_u^v (a e^x + c)dx = a e^v - a e^u + c(v - u).',
    conditionSummary: '1 <= u < v <= 7, a ≠ 0, c ≠ 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: 1, max: 4 },
      { name: 'v', label: 'Cận trên v (> u)', min: 2, max: 7 },
      { name: 'a', label: 'Hệ số của e^x', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { u0, v, a, c } = params;
      if (u0 < 1 || u0 >= v || a === 0 || c === 0) return { valid: false, reason: 'Cần 1 <= u < v và a, c khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, a, c } = params;
      const constTerm = c * (v - u0);
      const eU = 'e^{' + u0 + '}';
      const eV = 'e^{' + v + '}';
      const fx = u.formatTerm(a, 'e^x', true) + u.formatTerm(c, '', false);
      const ansBody = u.formatTerm(a, eV, true) + u.formatTerm(-a, eU, false) + u.formatTrailingConst(constTerm);
      const correct = '$' + ansBody + '$';
      const d1 = '$' + u.formatTerm(a, eV, true) + u.formatTerm(-a, eU, false) + '$';
      const d2 = '$' + eV + ' - ' + eU + u.formatTrailingConst(constTerm) + '$';
      const d3 = '$' + u.formatTerm(a, eV, true) + u.formatTerm(a, eU, false) + u.formatTrailingConst(constTerm) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(a, eV, true) + u.formatTerm(-a, eU, false) + u.formatTrailingConst(constTerm + step * 2 + 1) + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} \\left(' + fx + '\\right)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} \\left(' + fx + '\\right)\\mathrm{\\,d}x = \\left(' + fx.replace('e^x', 'e^x') + 'x\\right)$ — cụ thể nguyên hàm là $(' + u.formatTerm(a, 'e^x', true) + u.formatTerm(c, 'x', false) + ')\\Big|_{' + u0 + '}^{' + v + '} = ' + ansBody + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 6, v: 3, a: -5, c: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 [3;6] (-5e^x-3) -> -5e^6 + 5e^3 - 9', params: { u0: 3, v: 6, a: -5, c: -3 }, expectedValid: true },
    ],
  },

  // Dạng 27 (Q27): Tính ∫_{-u}^{-v} k e^x dx (hai cận âm)
  t12_b12_d27_k_exp_both_neg_mc: {
    id: 't12_b12_d27_k_exp_both_neg_mc',
    name: 'Tính tích phân ∫_{-u}^{-v} k e^x dx với hai cận âm',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Tính ∫_{-u}^{-v} k e^x dx = k/e^v - k/e^u khi 0 < v < u.',
    conditionSummary: 'u > v >= 1, k ≠ 0',
    paramSpecs: [
      { name: 'u0', label: 'Độ lớn cận dưới u (> v)', min: 2, max: 7 },
      { name: 'v', label: 'Độ lớn cận trên v (>= 1)', min: 1, max: 5 },
      { name: 'k', label: 'Hệ số k', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { u0, v, k } = params;
      if (v < 1 || u0 <= v || k === 0) return { valid: false, reason: 'Cần u > v >= 1 và k ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, k } = params;
      const ePow = (p) => (p === 1 ? 'e' : 'e^{' + p + '}');
      const term1 = (k < 0 ? '-' : '') + '\\frac{' + Math.abs(k) + '}{' + ePow(v) + '}';
      const term2 = (k < 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(k) + '}{' + ePow(u0) + '}';
      const correct = '$' + term1 + term2 + '$';
      const d1 = '$' + term1 + (k < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(k) + '}{' + ePow(u0) + '}$';
      const d2 = '$-\\frac{1}{' + ePow(u0) + '} + e^{-' + v + '}$';
      const d3 = '$' + Math.abs(k) + '\\ln ' + u0 + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$-\\frac{' + (Math.abs(k) + step) + '}{' + ePow(v) + '} + \\frac{' + (Math.abs(k) + step) + '}{' + ePow(u0) + '}$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{' + (-u0) + '}^{' + (-v) + '} ' + u.formatTerm(k, 'e^x', true) + '\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{' + (-u0) + '}^{' + (-v) + '} ' + u.formatTerm(k, 'e^x', true) + '\\mathrm{\\,d}x = ' + u.formatTerm(k, 'e^x', true) + '\\Big|_{' + (-u0) + '}^{' + (-v) + '} = ' + term1 + term2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u <= v', params: { u0: 2, v: 4, k: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 [-5;-1] -5e^x -> -5/e + 5/e^5', params: { u0: 5, v: 1, k: -5 }, expectedValid: true },
    ],
  },

  // Dạng 28 (Q28): Tính ∫_{pi/3}^{3pi/4} k sin x dx
  t12_b12_d28_k_sin_x_mc: {
    id: 't12_b12_d28_k_sin_x_mc',
    name: 'Tính tích phân lượng giác ∫_{π/3}^{3π/4} k sin x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính ∫_{π/3}^{3π/4} k sin x dx = -k cos x |_{π/3}^{3π/4} = k(√2 + 1)/2.',
    conditionSummary: 'k chẵn khác 0 để hệ số nguyên đẹp',
    paramSpecs: [
      { name: 'k2', label: 'Nửa hệ số k (k = 2*k2)', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      if (params.k2 === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const k = 2 * params.k2;
      const c = params.k2;
      // -k * (-sqrt(2)/2 - 1/2) = k/2 * (sqrt(2) + 1) = c * sqrt(2) + c
      const fmtRes = (aSq2, bConst) => {
        if (bConst === 0) return u.formatTerm(aSq2, '\\sqrt{2}', true);
        return u.formatTerm(aSq2, '\\sqrt{2}', true) + u.formatTrailingConst(bConst);
      };
      const correct = '$' + fmtRes(c, c) + '$';
      const d1 = '$' + fmtRes(-c, -c) + '$';
      const d2 = '$' + fmtRes(c, -c) + '$';
      const d3 = '$\\frac{\\sqrt{2}}{2} + \\frac{1}{2}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + fmtRes(c + step, c) + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{\\frac{\\pi}{3}}^{\\frac{3\\pi}{4}} ' + u.formatTerm(k, '\\sin x', true) + '\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{\\frac{\\pi}{3}}^{\\frac{3\\pi}{4}} ' + u.formatTerm(k, '\\sin x', true) + '\\mathrm{\\,d}x = ' + u.formatTerm(-k, '\\cos x', true) + '\\Big|_{\\frac{\\pi}{3}}^{\\frac{3\\pi}{4}} = ' + (-k) + '\\left(-\\frac{\\sqrt{2}}{2} - \\frac{1}{2}\\right) = ' + fmtRes(c, c) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k2 = 0', params: { k2: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 k=-4 -> -2√2 - 2', params: { k2: -2 }, expectedValid: true },
    ],
  },

  // Dạng 29 (Q29): Tính ∫_{pi/3}^{5pi/6} k cos x dx
  t12_b12_d29_k_cos_x_mc: {
    id: 't12_b12_d29_k_cos_x_mc',
    name: 'Tính tích phân lượng giác ∫_{π/3}^{5π/6} k cos x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính ∫_{π/3}^{5π/6} k cos x dx = k sin x |_{π/3}^{5π/6} = k(1 - √3)/2.',
    conditionSummary: 'k chẵn khác 0',
    paramSpecs: [
      { name: 'k2', label: 'Nửa hệ số k (k = 2*k2)', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      if (params.k2 === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const k = 2 * params.k2;
      const c = params.k2;
      // k*(1/2 - sqrt(3)/2) = c - c*sqrt(3)
      const correct = '$' + c + u.formatTerm(-c, '\\sqrt{3}', false) + '$';
      const d1 = '$' + (-c) + u.formatTerm(c, '\\sqrt{3}', false) + '$';
      const d2 = '$-\\frac{\\sqrt{3}}{2}$';
      const d3 = '$\\frac{1}{2} - \\frac{\\sqrt{3}}{2}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (c + step) + u.formatTerm(-c, '\\sqrt{3}', false) + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{\\frac{\\pi}{3}}^{\\frac{5\\pi}{6}} ' + u.formatTerm(k, '\\cos x', true) + '\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{\\frac{\\pi}{3}}^{\\frac{5\\pi}{6}} ' + u.formatTerm(k, '\\cos x', true) + '\\mathrm{\\,d}x = ' + u.formatTerm(k, '\\sin x', true) + '\\Big|_{\\frac{\\pi}{3}}^{\\frac{5\\pi}{6}} = ' + k + '\\left(\\frac{1}{2} - \\frac{\\sqrt{3}}{2}\\right) = ' + c + u.formatTerm(-c, '\\sqrt{3}', false) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k2 = 0', params: { k2: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 k=-2 -> -1 + √3', params: { k2: -1 }, expectedValid: true },
    ],
  },

  // Dạng 30 (Q30): Tính ∫_{2pi/3}^{3pi/4} k / cos^2 x dx
  t12_b12_d30_inv_cos2_mc: {
    id: 't12_b12_d30_inv_cos2_mc',
    name: 'Tính tích phân ∫_{2π/3}^{3π/4} (k / cos²x)dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính ∫_{2π/3}^{3π/4} k/cos²x dx = k tan x |_{2π/3}^{3π/4} = k(√3 - 1).',
    conditionSummary: 'k khác 0',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 2, max: 9 },
    ],
    validateCode: `
      if (params.k <= 1) return { valid: false, reason: 'Cần k >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      // k*(tan(3pi/4) - tan(2pi/3)) = k*(-1 - (-sqrt(3))) = -k + k*sqrt(3)
      const correct = '$' + (-k) + u.formatTerm(k, '\\sqrt{3}', false) + '$';
      const d1 = '$' + k + u.formatTerm(-k, '\\sqrt{3}', false) + '$';
      const d2 = '$' + Math.round(k / 2) + '\\sqrt{2} + ' + Math.round(k / 2) + '\\sqrt{3}$';
      const d3 = '$-1 + \\sqrt{3}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (-k - step) + u.formatTerm(k, '\\sqrt{3}', false) + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{\\frac{2\\pi}{3}}^{\\frac{3\\pi}{4}} \\frac{' + k + '}{\\cos^2 x}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{\\frac{2\\pi}{3}}^{\\frac{3\\pi}{4}} \\frac{' + k + '}{\\cos^2 x}\\mathrm{\\,d}x = ' + k + '\\tan x\\Big|_{\\frac{2\\pi}{3}}^{\\frac{3\\pi}{4}} = ' + k + '(-1 - (-\\sqrt{3})) = ' + (-k) + u.formatTerm(k, '\\sqrt{3}', false) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k <= 1', params: { k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 k=6 -> -6 + 6√3', params: { k: 6 }, expectedValid: true },
    ],
  },

  // Dạng 31 (Q31): Tính ∫_{pi/3}^{5pi/6} k / sin^2 x dx
  t12_b12_d31_inv_sin2_mc: {
    id: 't12_b12_d31_inv_sin2_mc',
    name: 'Tính tích phân ∫_{π/3}^{5π/6} (k / sin²x)dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính ∫_{π/3}^{5π/6} k/sin²x dx = -k cot x |_{π/3}^{5π/6} = (4k/3)√3.',
    conditionSummary: 'k bội số của 3 để hệ số nguyên đẹp',
    paramSpecs: [
      { name: 'k3', label: 'Hệ số m (k = 3*m)', min: 1, max: 4 },
    ],
    validateCode: `
      if (params.k3 <= 0) return { valid: false, reason: 'Cần m >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const k = 3 * params.k3;
      const ansC = 4 * params.k3;
      // -k * (cot(5pi/6) - cot(pi/3)) = -k * (-sqrt(3) - sqrt(3)/3) = (4k/3)*sqrt(3)
      const correct = '$' + ansC + '\\sqrt{3}$';
      const d1 = '$-' + ansC + '\\sqrt{3}$';
      const d2 = '$-\\frac{' + (2 * params.k3) + '\\sqrt{3}}{3}$';
      const d3 = '$-' + params.k3 + '\\sqrt{3} - ' + params.k3 + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (ansC + step * 2) + '\\sqrt{3}$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{\\frac{\\pi}{3}}^{\\frac{5\\pi}{6}} \\frac{' + k + '}{\\sin^2 x}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{\\frac{\\pi}{3}}^{\\frac{5\\pi}{6}} \\frac{' + k + '}{\\sin^2 x}\\mathrm{\\,d}x = -' + k + '\\cot x\\Big|_{\\frac{\\pi}{3}}^{\\frac{5\\pi}{6}} = -' + k + '\\left(-\\sqrt{3} - \\frac{\\sqrt{3}}{3}\\right) = ' + ansC + '\\sqrt{3}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { k3: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 k=6 -> 8√3', params: { k3: 2 }, expectedValid: true },
    ],
  },

  // Dạng 32 (Q32): Tính ∫_{pi/6}^{pi} k sin(mx) dx
  t12_b12_d32_sin_mx_mc: {
    id: 't12_b12_d32_sin_mx_mc',
    name: 'Tính tích phân ∫_{π/6}^π k sin(mx)dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính ∫_{π/6}^π k sin(mx)dx = -(k/m) cos(mx) |_{π/6}^π với m chẵn (m = 4, 8, 10...).',
    conditionSummary: 'k ≠ 0, m ∈ {4, 8, 10}',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: -6, max: 6, allowZero: false },
      { name: 'mIdx', label: 'Chọn m (0: 4, 1: 8, 2: 10)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.k === 0 || params.mIdx < 0 || params.mIdx > 2) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, mIdx } = params;
      const m = [4, 8, 10][mIdx];
      // cos(m*pi) = 1 (since m even); cos(m*pi/6): m=4 -> cos(2pi/3) = -1/2; m=8 -> cos(4pi/3) = -1/2; m=10 -> cos(5pi/3) = 1/2
      const numFactor = m === 10 ? 1 : 3; // (1 - cos(m*pi/6)) = 3/2 or 1/2
      const ansFrac = u.simplifyFrac(-k * numFactor, 2 * m);
      const coeffFrac = u.simplifyFrac(-k, m);
      const cosAngle = u.simplifyFrac(m, 6);
      const cosAngleStr = cosAngle.den === 1 ? (cosAngle.num === 1 ? '\\pi' : cosAngle.num + '\\pi') : '\\frac{' + cosAngle.num + '\\pi}{' + cosAngle.den + '}';
      const correct = '$' + ansFrac.latex + '$';
      const d1 = '$' + ansFrac.latex + ' + \\frac{5\\pi}{6}$';
      const d2 = '$-\\frac{\\sqrt{3}}{2}' + u.formatTerm(-1, '\\frac{1}{4}', false) + '$';
      const d3 = '$' + u.simplifyFrac(ansFrac.num + 1, ansFrac.den + 2).latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + ansFrac.latex + ' + \\frac{5\\pi}{6}$', '$-\\frac{\\sqrt{3}}{2} - \\frac{1}{4}$', '$' + u.simplifyFrac(1, 2 * m).latex + '$'],
        rng,
        (step) => '$' + u.simplifyFrac(ansFrac.num + step * 2, ansFrac.den + 1).latex + '$'
      );
      return {
        stem: 'Tính tích phân $\\int \\limits_{\\frac{\\pi}{6}}^{\\pi} ' + u.formatTerm(k, '\\sin ' + m + 'x', true) + '\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\int \\limits_{\\frac{\\pi}{6}}^{\\pi} ' + u.formatTerm(k, '\\sin ' + m + 'x', true) + '\\mathrm{\\,d}x = ' + coeffFrac.latex + '\\cos ' + m + 'x\\Big|_{\\frac{\\pi}{6}}^{\\pi} = ' + coeffFrac.latex + '\\left(\\cos ' + m + '\\pi - \\cos ' + cosAngleStr + '\\right) = ' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, mIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 k=-4, m=8 -> 3/4', params: { k: -4, mIdx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 33 (Q33): Cho ∫_{pi/4}^{pi/2} f(x)dx = I -> tính ∫_{pi/4}^{pi/2} [f(x) + k sin x]dx
  t12_b12_d33_fx_plus_sin_mc: {
    id: 't12_b12_d33_fx_plus_sin_mc',
    name: 'Tính ∫_{π/4}^{π/2} [f(x) + k sin x]dx khi biết ∫ f(x)dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tách tích phân thành I + k ∫_{π/4}^{π/2} sin x dx = I + k√2 / 2.',
    conditionSummary: 'I và k khác 0',
    paramSpecs: [
      { name: 'Ival', label: 'Giá trị ∫ f(x)dx', min: -5, max: 6, allowZero: false },
      { name: 'k', label: 'Hệ số k của sin x', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      if (params.Ival === 0 || params.k === 0) return { valid: false, reason: 'Cần I và k khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { Ival, k } = params;
      const sqrtTerm = u.simplifyFrac(k, 2);
      const fmtSqrt = (f) => {
        const sgn = f.num < 0 ? ' - ' : ' + ';
        const an = Math.abs(f.num);
        if (f.den === 1) return sgn + (an === 1 ? '' : an) + '\\sqrt{2}';
        return sgn + '\\frac{' + (an === 1 ? '' : an) + '\\sqrt{2}}{' + f.den + '}';
      };
      const correct = '$' + Ival + fmtSqrt(sqrtTerm) + '$';
      const d1 = '$' + (Ival + 2) + fmtSqrt(sqrtTerm) + '$';
      const d2 = '$' + (Ival - 1) + fmtSqrt(u.simplifyFrac(-k, 2)) + '$';
      const d3 = '$\\frac{1}{2}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (Ival + step + 3) + fmtSqrt(sqrtTerm) + '$'
      );
      return {
        stem: 'Cho $\\int\\limits_{\\frac{\\pi}{4}}^{\\frac{\\pi}{2}} f(x)\\mathrm{\\,d}x = ' + Ival + '$. Tính $I = \\int\\limits_{\\frac{\\pi}{4}}^{\\frac{\\pi}{2}} \\left[f(x)' + u.formatTerm(k, '\\sin x', false) + '\\right]\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$I = \\int\\limits_{\\frac{\\pi}{4}}^{\\frac{\\pi}{2}} f(x)\\mathrm{\\,d}x' + u.formatTerm(k, '\\int\\limits_{\\frac{\\pi}{4}}^{\\frac{\\pi}{2}} \\sin x\\mathrm{\\,d}x', false) + ' = ' + Ival + u.formatTerm(k, '\\left[-\\cos x\\right]_{\\frac{\\pi}{4}}^{\\frac{\\pi}{2}}', false) + '$.',
          'Do $\\cos\\frac{\\pi}{4} - \\cos\\frac{\\pi}{2} = \\frac{\\sqrt{2}}{2}$, suy ra $I = ' + Ival + fmtSqrt(sqrtTerm) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { Ival: 2, k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 I=2, k=3 -> 2 + 3√2/2', params: { Ival: 2, k: 3 }, expectedValid: true },
    ],
  },

  // Dạng 34 (Q34): ∫_0^{pi/4} (a + b cos x)dx = mπ + n√2 -> tính m + n
  t12_b12_d34_const_plus_cos_pi4_mc: {
    id: 't12_b12_d34_const_plus_cos_pi4_mc',
    name: 'Tính m + n từ tích phân ∫_0^{π/4} (a + b cos x)dx = mπ + n√2',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính ∫_0^{π/4} (a + b cos x)dx = (a/4)π + (b/2)√2 để xác định m, n và tính m + n.',
    conditionSummary: 'a ≠ 0 và b chẵn khác 0',
    paramSpecs: [
      { name: 'a', label: 'Hằng số a', min: -9, max: 9, allowZero: false },
      { name: 'b2', label: 'Nửa hệ số cos x (b = 2*b2)', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      if (params.a === 0 || params.b2 === 0) return { valid: false, reason: 'Tham số a và b2 phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b2 } = params;
      const b = 2 * b2;
      const mFrac = u.simplifyFrac(a, 4);
      const sumFrac = u.simplifyFrac(a + 4 * b2, 4);
      const expr = a + u.formatTerm(b, '\\cos x', false);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + sumFrac.latex + '$',
        ['$' + (-sumFrac.num > 0 ? sumFrac.num : 5) + '$', '$\\frac{9}{10}$', '$-\\frac{12}{5}$'],
        rng,
        (step) => '$' + u.simplifyFrac(sumFrac.num + step * 2 + 1, sumFrac.den).latex + '$'
      );
      return {
        stem: 'Biết $\\int \\limits_{0}^{\\frac{\\pi}{4}} \\left(' + expr + '\\right)\\mathrm{\\,d}x = m\\pi + n\\sqrt{2}$ (với $m, n \\in \\mathbb{Q}$). Tính $m + n$.',
        options,
        correctIndex,
        answerSummary: '$' + sumFrac.latex + '$',
        solutionSteps: [
          '$\\int \\limits_{0}^{\\frac{\\pi}{4}} \\left(' + expr + '\\right)\\mathrm{\\,d}x = \\left[' + u.formatTerm(a, 'x', true) + u.formatTerm(b, '\\sin x', false) + '\\right]\\Big|_{0}^{\\frac{\\pi}{4}} = ' + mFrac.latex + '\\pi' + u.formatTerm(b2, '\\sqrt{2}', false) + '$.',
          'Suy ra $m = ' + mFrac.latex + ',\\, n = ' + b2 + '$, nên $m + n = ' + sumFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b2 = 0', params: { a: -7, b2: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (-7 - 4cos x) -> -15/4', params: { a: -7, b2: -2 }, expectedValid: true },
    ],
  },

  // Dạng 35 (Q35): Cho ∫_{pi/2}^{5pi/6} f(x)dx = I -> tính ∫_{pi/2}^{5pi/6} [f(x) + k cos x]dx
  t12_b12_d35_fx_plus_cos_mc: {
    id: 't12_b12_d35_fx_plus_cos_mc',
    name: 'Tính ∫_{π/2}^{5π/6} [f(x) + k cos x]dx khi biết ∫ f(x)dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tách tích phân thành I + k(sin(5π/6) - sin(π/2)) = I - k/2.',
    conditionSummary: 'k chẵn khác 0 để kết quả nguyên',
    paramSpecs: [
      { name: 'Ival', label: 'Giá trị ∫ f(x)dx', min: -4, max: 6 },
      { name: 'k2', label: 'Nửa hệ số cos x (k = 2*k2)', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      if (params.k2 === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { Ival, k2 } = params;
      const k = 2 * k2;
      // Ival + k*(1/2 - 1) = Ival - k2
      const ans = Ival - k2;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (Ival + k2) + '$', '$-\\frac{1}{5}$', '$' + (ans + 1) + '$'],
        rng,
        (step) => '$' + (ans + step * 2 + 2) + '$'
      );
      return {
        stem: 'Cho $\\int\\limits_{\\frac{\\pi}{2}}^{\\frac{5\\pi}{6}} f(x)\\mathrm{\\,d}x = ' + Ival + '$. Tính $I = \\int\\limits_{\\frac{\\pi}{2}}^{\\frac{5\\pi}{6}} \\left[f(x)' + u.formatTerm(k, '\\cos x', false) + '\\right]\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          '$I = \\int\\limits_{\\frac{\\pi}{2}}^{\\frac{5\\pi}{6}} f(x)\\mathrm{\\,d}x' + u.formatTerm(k, '\\int\\limits_{\\frac{\\pi}{2}}^{\\frac{5\\pi}{6}} \\cos x\\mathrm{\\,d}x', false) + ' = ' + Ival + u.formatTerm(k, '\\left(\\sin\\frac{5\\pi}{6} - \\sin\\frac{\\pi}{2}\\right)', false) + ' = ' + Ival + u.formatTerm(k, '\\left(\\frac{1}{2} - 1\\right)', false) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k2 = 0', params: { Ival: 0, k2: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 I=0, k=-6 -> 3', params: { Ival: 0, k2: -3 }, expectedValid: true },
    ],
  },

  // Dạng 36 (Q36): ∫_0^{pi/4} (a + b sin x)dx = mπ + n√2 + p -> tính m + n + p
  t12_b12_d36_const_plus_sin_pi4_mc: {
    id: 't12_b12_d36_const_plus_sin_pi4_mc',
    name: 'Tính m + n + p từ tích phân ∫_0^{π/4} (a + b sin x)dx = mπ + n√2 + p',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính ∫_0^{π/4} (a + b sin x)dx = (a/4)π - (b/2)√2 + b để xác định m, n, p chính xác dấu tại cận 0.',
    conditionSummary: 'a ≠ 0 và b chẵn khác 0',
    paramSpecs: [
      { name: 'a', label: 'Hằng số a', min: -8, max: 8, allowZero: false },
      { name: 'b2', label: 'Nửa hệ số sin x (b = 2*b2)', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      if (params.a === 0 || params.b2 === 0) return { valid: false, reason: 'Tham số a và b2 phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b2 } = params;
      const b = 2 * b2;
      // [-ax - b cos x]_0^{pi/4}: (a*pi/4 - b*sqrt(2)/2) - (-b) = (a/4)*pi - b2*sqrt(2) + b
      const mFrac = u.simplifyFrac(a, 4);
      const n = -b2;
      const p = b;
      const sumFrac = u.simplifyFrac(a + 4 * n + 4 * p, 4);
      const expr = a + u.formatTerm(b, '\\sin x', false);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + sumFrac.latex + '$',
        [
          '$' + u.simplifyFrac(a + 4 * n - 4 * p, 4).latex + '$',
          '$\\frac{31}{10}$',
          '$0$',
        ],
        rng,
        (step) => '$' + u.simplifyFrac(sumFrac.num + step * 2 + 1, sumFrac.den).latex + '$'
      );
      return {
        stem: 'Biết $\\int\\limits_{0}^{\\frac{\\pi}{4}} \\left(' + expr + '\\right)\\mathrm{\\,d}x = m\\pi + n\\sqrt{2} + p$ (với $m, n, p \\in \\mathbb{Q}$). Tính $m + n + p$.',
        options,
        correctIndex,
        answerSummary: '$' + sumFrac.latex + '$',
        solutionSteps: [
          '$\\int\\limits_{0}^{\\frac{\\pi}{4}} \\left(' + expr + '\\right)\\mathrm{\\,d}x = \\left[' + u.formatTerm(a, 'x', true) + u.formatTerm(-b, '\\cos x', false) + '\\right]\\Big|_{0}^{\\frac{\\pi}{4}} = ' + mFrac.latex + '\\pi' + u.formatTerm(n, '\\sqrt{2}', false) + u.formatTrailingConst(p) + '$.',
          'Suy ra $m = ' + mFrac.latex + ',\\, n = ' + n + ',\\, p = ' + p + '$, nên $m + n + p = ' + sumFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b2 = 0', params: { a: -5, b2: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (-5 + 2sin x) -> m=-5/4, n=-1, p=2, tổng -1/4', params: { a: -5, b2: 1 }, expectedValid: true },
    ],
  },
};
