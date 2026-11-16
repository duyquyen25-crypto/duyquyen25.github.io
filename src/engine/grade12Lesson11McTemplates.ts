import { MathTemplate } from '../types/math';

export const G12_B11_MC_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 11. NGUYÊN HÀM — PHẦN I: 36 DẠNG TRẮC NGHIỆM NHIỀU LỰA CHỌN (D01..D36)
  // =====================================================================

  // Dạng 1 (Q1): Nhận biết tính chất nguyên hàm
  t12_b11_d01_antideriv_property_mc: {
    id: 't12_b11_d01_antideriv_property_mc',
    name: 'Nhận biết tính chất cơ bản của nguyên hàm',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất nguyên hàm',
    description: 'Chọn khẳng định đúng về tính chất tuyến tính và định nghĩa họ nguyên hàm của hàm số liên tục.',
    conditionSummary: 'Chỉ số biến thể thuộc {0, 1, 2, 3} và hệ số k khác 0, 1',
    paramSpecs: [
      { name: 'variant', label: 'Biến thể khẳng định đúng (0..3)', min: 0, max: 3 },
      { name: 'k', label: 'Hệ số hằng k', min: 2, max: 9 },
    ],
    validateCode: `
      const { variant, k } = params;
      if (variant < 0 || variant > 3) return { valid: false, reason: 'Biến thể phải từ 0 đến 3' };
      if (k === 0 || k === 1) return { valid: false, reason: 'Hệ số k phải khác 0 và 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { variant, k } = params;
      const trues = [
        '$\\int [g(x)-f(x)]\\mathrm{\\,d}x = \\int g(x)\\mathrm{\\,d}x - \\int f(x)\\mathrm{\\,d}x$',
        '$\\int [f(x)+g(x)]\\mathrm{\\,d}x = \\int f(x)\\mathrm{\\,d}x + \\int g(x)\\mathrm{\\,d}x$',
        '$\\int ' + k + 'f(x)\\mathrm{\\,d}x = ' + k + '\\int f(x)\\mathrm{\\,d}x$',
        '$\\int f\'(x)\\mathrm{\\,d}x = f(x) + C$',
      ];
      const correct = trues[variant];
      const falses = [
        '$\\int f(x)\\mathrm{\\,d}x = f\'(x) + C$',
        '$\\int x^{\\alpha}\\mathrm{\\,d}x = \\dfrac{x^{\\alpha+1}}{\\alpha+1}$',
        'Nếu $F(x)$ và $G(x)$ đều là nguyên hàm của $f(x)$ thì $F(x) = G(x)$',
        '$\\int [f(x) \\cdot g(x)]\\mathrm{\\,d}x = \\int f(x)\\mathrm{\\,d}x \\cdot \\int g(x)\\mathrm{\\,d}x$',
      ];
      const distractors = variant === 0 ? falses.slice(0, 3) : variant === 1 ? [falses[0], falses[2], falses[3]] : [falses[1], falses[2], falses[3]];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (step) => '$\\int ' + (k + step) + 'f(x)\\mathrm{\\,d}x = f(' + (k + step) + 'x) + C$'
      );
      return {
        stem: 'Khẳng định nào sau đây là khẳng định đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng định nghĩa và tính chất cơ bản của nguyên hàm với mọi hàm số $f(x), g(x)$ liên tục trên $K$.',
          'Khẳng định đúng là: ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên biến thể ngoài miền (variant = 4)', params: { variant: 4, k: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 hiệu hai nguyên hàm', params: { variant: 0, k: 2 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2): Nguyên hàm hằng số ∫ k dx
  t12_b11_d02_const_mc: {
    id: 't12_b11_d02_const_mc',
    name: 'Tìm nguyên hàm của hàm hằng ∫ k dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm đa thức cơ bản',
    description: 'Tính nguyên hàm bất định ∫ k dx = kx + C với hằng số k khác 0.',
    conditionSummary: 'k ≠ 0 để kết quả khác hằng số C tầm thường',
    paramSpecs: [{ name: 'k', label: 'Hằng số k', min: -12, max: 12, allowZero: false }],
    validateCode: `
      if (params.k === 0) return { valid: false, reason: 'Hằng số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$' + u.formatTerm(k, 'x', true) + ' + C$';
      const f1 = k % 2 === 0 ? '$' + u.formatTerm(k / 2, 'x', true) + ' + C$' : '$' + u.formatTerm(k, 'x^2', true) + ' + C$';
      const f2 = '$C$';
      const f3 = '$' + u.formatTerm(2 * k, 'x', true) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [f1, f2, f3],
        rng,
        (step) => '$' + u.formatTerm(k + step + 1, 'x', true) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int ' + (k < 0 ? '(' + k + ')' : k) + '\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $\\int k\\mathrm{\\,d}x = kx + C$, ta được: ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 ∫ 4 dx', params: { k: 4 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3): Nguyên hàm nhị thức bậc nhất ∫ (ax + b) dx
  t12_b11_d03_linear_mc: {
    id: 't12_b11_d03_linear_mc',
    name: 'Tìm nguyên hàm của hàm số bậc nhất ∫ (ax + b) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm đa thức cơ bản',
    description: 'Tính ∫ (ax + b) dx = (a/2)x^2 + bx + C với a ≠ 0.',
    conditionSummary: 'Hệ số a ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9 },
    ],
    validateCode: `
      if (params.a === 0) return { valid: false, reason: 'Hệ số a phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const buildExpr = (terms) => {
        let s = '';
        for (const t of terms) {
          const chunk = fmtFS(t[0], t[1], t[2], s === '');
          if (chunk) s += chunk;
        }
        return s || '0';
      };
      const integrand = u.formatLinear(a, b);
      const ansBody = buildExpr([[a, 2, 'x^2'], [b, 1, 'x']]);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + u.formatTerm(2 * a, 'x', true) + ' + C$';
      const d2 = '$' + (b !== 0 ? a : a + 1) + ' + C$';
      const d3 = '$' + buildExpr([[a, 1, 'x^2'], [b, 1, '']]) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + buildExpr([[a + step, 2, 'x^2'], [b + 1, 1, 'x']]) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int (' + integrand + ')\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int (' + integrand + ')\\mathrm{\\,d}x = ' + ansBody + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 ∫ (2x - 2) dx', params: { a: 2, b: -2 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4): Nguyên hàm tam thức bậc hai ∫ (ax^2 + bx + c) dx
  t12_b11_d04_quadratic_mc: {
    id: 't12_b11_d04_quadratic_mc',
    name: 'Tìm nguyên hàm của tam thức bậc hai ∫ (ax² + bx + c) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm đa thức cơ bản',
    description: 'Tính ∫ (ax^2 + bx + c) dx = (a/3)x^3 + (b/2)x^2 + cx + C.',
    conditionSummary: 'Hệ số bậc hai a ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0 || params.c === 0) return { valid: false, reason: 'Các hệ số a, b, c phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const buildExpr = (terms) => {
        let s = '';
        for (const t of terms) {
          const chunk = fmtFS(t[0], t[1], t[2], s === '');
          if (chunk) s += chunk;
        }
        return s || '0';
      };
      const integrand = u.formatQuadratic(a, b, c);
      const ansBody = buildExpr([[a, 3, 'x^3'], [b, 2, 'x^2'], [c, 1, 'x']]);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + buildExpr([[a, 1, 'x^3'], [b, 1, 'x^2'], [c, 1, '']]) + ' + C$';
      const d2 = '$' + buildExpr([[a, 3, 'x^3'], [b, 1, 'x^2'], [c, 1, 'x']]) + ' + C$';
      const d3 = '$' + buildExpr([[a, 1, 'x^3'], [b, 1, 'x^2'], [c, 1, 'x']]) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + buildExpr([[a, 3, 'x^3'], [b, 2, 'x^2'], [c + step, 1, 'x']]) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int (' + integrand + ')\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $\\int x^n\\mathrm{\\,d}x = \\frac{x^{n+1}}{n+1} + C$, ta được: $\\int (' + integrand + ')\\mathrm{\\,d}x = ' + ansBody + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -6, c: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 ∫ (4x² - 6x - 1) dx', params: { a: 4, b: -6, c: -1 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5): Nguyên hàm đa thức bậc ba ∫ (ax^3 + bx^2 + cx + d) dx
  t12_b11_d05_cubic_mc: {
    id: 't12_b11_d05_cubic_mc',
    name: 'Tìm nguyên hàm của hàm đa thức bậc ba ∫ (ax³ + bx² + cx + d) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm đa thức cơ bản',
    description: 'Tính nguyên hàm bất định của đa thức bậc ba đầy đủ.',
    conditionSummary: 'Hệ số bậc cao nhất a ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (bậc 3)', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b (bậc 2)', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c (bậc 1)', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hệ số tự do d', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const buildExpr = (terms) => {
        let s = '';
        for (const t of terms) {
          const chunk = fmtFS(t[0], t[1], t[2], s === '');
          if (chunk) s += chunk;
        }
        return s || '0';
      };
      const integrand = u.formatPoly([a, b, c, d]);
      const ansBody = buildExpr([[a, 4, 'x^4'], [b, 3, 'x^3'], [c, 2, 'x^2'], [d, 1, 'x']]);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + buildExpr([[a, 4, 'x^4'], [b, 3, 'x^3'], [c, 2, 'x^2'], [d + 9, 1, 'x']]) + ' + C$';
      const d2 = '$' + u.formatPoly([3 * a, 2 * b, c]) + ' + C$';
      const d3 = '$' + buildExpr([[a, 4, 'x^4'], [b, 3, 'x^3'], [c * 3, 1, 'x^2'], [d, 1, 'x']]) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + buildExpr([[a, 4, 'x^4'], [b, 3, 'x^3'], [c, 2, 'x^2'], [d + step + 2, 1, 'x']]) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int (' + integrand + ')\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int (' + integrand + ')\\mathrm{\\,d}x = ' + ansBody + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 3, c: 4, d: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 ∫ (-4x³ + 3x² + 4x + 4) dx', params: { a: -4, b: 3, c: 4, d: 4 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6): Nguyên hàm bình phương nhị thức ∫ (b - ax)^2 dx
  t12_b11_d06_square_linear_mc: {
    id: 't12_b11_d06_square_linear_mc',
    name: 'Tìm nguyên hàm bằng cách khai triển bình phương ∫ (b - ax)² dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm đa thức cơ bản',
    description: 'Khai triển hằng đẳng thức (b - ax)^2 rồi tìm nguyên hàm.',
    conditionSummary: 'Hệ số a, b khác 0',
    paramSpecs: [
      { name: 'b', label: 'Số hạng b', min: 1, max: 6 },
      { name: 'a', label: 'Hệ số a', min: 1, max: 5 },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'Tham số a, b phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, a } = params;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const buildExpr = (terms) => {
        let s = '';
        for (const t of terms) {
          const chunk = fmtFS(t[0], t[1], t[2], s === '');
          if (chunk) s += chunk;
        }
        return s || '0';
      };
      const c2 = a * a, c1 = -2 * a * b, c0 = b * b;
      const expanded = u.formatQuadratic(c2, c1, c0);
      const ansBody = buildExpr([[c2, 3, 'x^3'], [c1, 2, 'x^2'], [c0, 1, 'x']]);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + buildExpr([[c1 / 4, 1, 'x^2'], [c1, 1, 'x'], [c0, 1, '']]) + ' + C$';
      const d2 = '$' + buildExpr([[c2, 1, 'x^3'], [-a, 2, 'x^2'], [c0, 1, 'x']]) + ' + C$';
      const d3 = '$' + buildExpr([[-c2, 3, 'x^3'], [c1, 2, 'x^2'], [c0, 1, '']]) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + buildExpr([[c2, 3, 'x^3'], [c1, 2, 'x^2'], [c0 + step, 1, 'x']]) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int (' + b + ' - ' + u.formatTerm(a, 'x', true) + ')^2\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Khai triển: $(' + b + ' - ' + u.formatTerm(a, 'x', true) + ')^2 = ' + expanded + '$.',
          'Suy ra $\\int (' + expanded + ')\\mathrm{\\,d}x = ' + ansBody + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { b: 2, a: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 ∫ (2 - 3x)² dx', params: { b: 2, a: 3 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7): Nguyên hàm ∫ (a + b/x^2) dx
  t12_b11_d07_const_invx2_mc: {
    id: 't12_b11_d07_const_invx2_mc',
    name: 'Tìm nguyên hàm hàm chứa 1/x² dạng ∫ (a + b/x²) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Tính nguyên hàm ∫ (a + b/x^2) dx = ax - b/x + C.',
    conditionSummary: 'a ≠ 0 và b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hằng số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Tử số b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'Tham số a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fmtFracX = (coeff, deg, isFirst) => {
        if (coeff === 0) return '';
        const sign = coeff < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const abs = Math.abs(coeff);
        if (deg === 1) return sign + '\\frac{' + abs + '}{x}';
        return sign + '\\frac{' + abs + '}{x^2}';
      };
      const integrand = u.formatTerm(a, '', true) + fmtFracX(b, 2, false);
      const ansBody = u.formatTerm(a, 'x', true) + fmtFracX(-b, 1, false);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + u.formatTerm(a, 'x', true) + fmtFracX(b, 1, false) + ' + C$';
      const d2 = '$' + u.formatTerm(a, 'x^2', true) + fmtFracX(-b, 1, false) + ' + C$';
      const d3 = '$' + (a % 2 === 0 ? u.formatTerm(a / 2, 'x^2', true) : '\\frac{' + a + 'x^2}{2}') + u.formatTerm(b, '', false) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(a + step, 'x', true) + fmtFracX(-b, 1, false) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\left(' + integrand + '\\right)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng $\\int \\frac{1}{x^2}\\mathrm{\\,d}x = -\\frac{1}{x} + C$, ta được: ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: -5, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 ∫ (-5 - 5/x²) dx', params: { a: -5, b: -5 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8): Nguyên hàm ∫ (ax + b + c/x^2) dx
  t12_b11_d08_lin_invx2_mc: {
    id: 't12_b11_d08_lin_invx2_mc',
    name: 'Tìm nguyên hàm tổng hợp bậc nhất và 1/x²: ∫ (ax + b + c/x²) dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Tính ∫ (ax + b + c/x^2) dx = (a/2)x^2 + bx - c/x + C.',
    conditionSummary: 'Các hệ số a, b, c đều khác 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Tử số c', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const fmtInv = (coeff, deg) => {
        const sign = coeff < 0 ? ' - ' : ' + ';
        return sign + '\\frac{' + Math.abs(coeff) + '}{' + (deg === 1 ? 'x' : 'x^2') + '}';
      };
      const integrand = u.formatLinear(a, b) + fmtInv(c, 2);
      const lead = fmtFS(a, 2, 'x^2', true);
      const mid = u.formatTerm(b, 'x', false);
      const tail = fmtInv(-c, 1);
      const correct = '$' + lead + mid + tail + ' + C$';
      const d1 = '$' + a + fmtInv(-c, 1) + ' + C$';
      const d2 = '$' + lead + u.formatTerm(b, '', false) + fmtInv(-c, 1) + ' + C$';
      const d3 = '$' + lead + u.formatTerm(b, '', false) + fmtInv(c, 1) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + lead + u.formatTerm(b + step, 'x', false) + tail + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\left(' + integrand + '\\right)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int \\left(' + integrand + '\\right)\\mathrm{\\,d}x = ' + lead + mid + tail + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { a: 3, b: 1, c: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 ∫ (3x + 1 - 4/x²) dx', params: { a: 3, b: 1, c: -4 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9): Nguyên hàm ∫ (a + b/x) dx
  t12_b11_d09_const_invx_mc: {
    id: 't12_b11_d09_const_invx_mc',
    name: 'Tìm nguyên hàm hàm chứa 1/x dạng ∫ (a + b/x) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Tính ∫ (a + b/x) dx = ax + b ln|x| + C với a, b khác 0.',
    conditionSummary: 'Hệ số a, b khác 0',
    paramSpecs: [
      { name: 'a', label: 'Hằng số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Tử số b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'Tham số a, b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fmtInv = (coeff) => (coeff < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(coeff) + '}{x}';
      const fmtInv2 = (coeff) => (coeff < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(coeff) + '}{x^2}';
      const integrand = u.formatTerm(a, '', true) + fmtInv(b);
      const ansBody = u.formatTerm(a, 'x', true) + u.formatTerm(b, '\\ln|x|', false);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + (b < 0 ? '-' : '') + '\\frac{' + Math.abs(b) + '}{x^2} + C$';
      const d2 = '$' + u.formatTerm(a, 'x', true) + ' + e^x + C$';
      const d3 = '$' + u.formatTerm(a, 'x', true) + fmtInv2(-b) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(a + step, 'x', true) + u.formatTerm(b, '\\ln|x|', false) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\left(' + integrand + '\\right)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Sử dụng $\\int \\frac{1}{x}\\mathrm{\\,d}x = \\ln|x| + C$, ta có ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 4, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 ∫ (4 - 3/x) dx', params: { a: 4, b: -3 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10): Tìm F(x) của f(x) = a/x biết F(e^k) = m
  t12_b11_d10_invx_cond_e_mc: {
    id: 't12_b11_d10_invx_cond_e_mc',
    name: 'Tìm nguyên hàm F(x) của f(x) = a/x thỏa điều kiện F(e^k) = m',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm thỏa mãn điều kiện ban đầu',
    description: 'Tìm F(x) = a ln|x| + C biết F(e^k) = m.',
    conditionSummary: 'a ≠ 0 và k ≥ 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 5 },
      { name: 'k', label: 'Số mũ k của e^k', min: 1, max: 5 },
      { name: 'm', label: 'Giá trị F(e^k) = m', min: -6, max: 6 },
    ],
    validateCode: `
      if (params.a <= 0 || params.k <= 0) return { valid: false, reason: 'Tham số a, k phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k, m } = params;
      const C = m - a * k;
      const fStr = a === 1 ? '\\frac{1}{x}' : '\\frac{' + a + '}{x}';
      const base = u.formatTerm(a, '\\ln|x|', true);
      const correct = '$' + base + u.formatTrailingConst(C) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + base + u.formatTrailingConst(C + 1) + '$',
          '$' + base + u.formatTrailingConst(C + 2) + '$',
          '$' + base + u.formatTrailingConst(C - 2) + '$',
        ],
        rng,
        (step) => '$' + base + u.formatTrailingConst(C + step + 3) + '$'
      );
      const ePow = k === 1 ? '\\mathrm{e}' : '\\mathrm{e}^{' + k + '}';
      return {
        stem: 'Cho $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fStr + '$ và thỏa mãn $F(' + ePow + ') = ' + m + '$. Khi đó $F(x)$ bằng:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $F(x) = ' + base + ' + C$.',
          'Do $F(' + ePow + ') = ' + m + '$ nên $' + (a === 1 ? '' : a + '\\cdot ') + k + ' + C = ' + m + ' \\Rightarrow C = ' + C + '$.',
          'Vậy $F(x) = ' + base + u.formatTrailingConst(C) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, k: 2, m: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 f(x)=1/x, F(e²)=-1', params: { a: 1, k: 2, m: -1 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11): Tìm F(x) của f(x) = e^(kx) thỏa F(ln p) = m
  t12_b11_d11_exp_kx_cond_ln_mc: {
    id: 't12_b11_d11_exp_kx_cond_ln_mc',
    name: 'Tìm nguyên hàm F(x) của f(x) = e^(kx) thỏa điều kiện F(ln p) = m',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tìm F(x) = (1/k)e^(kx) + C biết F(ln p) = m.',
    conditionSummary: 'k ≥ 2 và p ≥ 2 để p^k nguyên dương',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k trong e^(kx)', min: 2, max: 5 },
      { name: 'p', label: 'Số p trong ln p', min: 2, max: 4 },
      { name: 'm', label: 'Giá trị F(ln p) = m', min: 1, max: 12 },
    ],
    validateCode: `
      if (params.k < 2 || params.p < 2) return { valid: false, reason: 'Cần k >= 2 và p >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, p, m } = params;
      const pk = Math.pow(p, k);
      const cFrac = u.simplifyFrac(m * k - pk, k);
      const fmtSignFrac = (f) => {
        if (f.num === 0) return '';
        if (f.den === 1) return f.num > 0 ? ' + ' + f.num : ' - ' + Math.abs(f.num);
        return f.num > 0 ? ' + \\frac{' + f.num + '}{' + f.den + '}' : ' - \\frac{' + Math.abs(f.num) + '}{' + f.den + '}';
      };
      const leadTrue = '\\frac{1}{' + k + '}\\mathrm{e}^{' + k + 'x}';
      const leadWrong = k + '\\mathrm{e}^{' + k + 'x}';
      const cAlt1 = u.simplifyFrac(1, k);
      const cAlt2 = u.simplifyFrac(m * k + pk, k);
      const correct = '$' + leadTrue + fmtSignFrac(cFrac) + '$';
      const d1 = '$' + leadWrong + fmtSignFrac(cAlt1) + '$';
      const d2 = '$' + leadWrong + fmtSignFrac(cFrac) + '$';
      const d3 = '$' + leadTrue + fmtSignFrac(cAlt2) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + leadTrue + fmtSignFrac(u.simplifyFrac(cFrac.num + step * k, k)) + '$'
      );
      return {
        stem: 'Cho $F(x)$ là một nguyên hàm của hàm số $f(x) = \\mathrm{e}^{' + k + 'x}$ và thỏa mãn $F(\\ln ' + p + ') = ' + m + '$. Khi đó $F(x)$ bằng:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $F(x) = ' + leadTrue + ' + C$.',
          'Do $F(\\ln ' + p + ') = ' + m + '$ nên $\\frac{1}{' + k + '}\\mathrm{e}^{' + k + '\\ln ' + p + '} + C = ' + m + ' \\Leftrightarrow \\frac{' + pk + '}{' + k + '} + C = ' + m + ' \\Rightarrow C = ' + cFrac.latex + '$.',
          'Vậy $F(x) = ' + leadTrue + fmtSignFrac(cFrac) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1, p: 2, m: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 f(x)=e^(3x), F(ln 2)=5', params: { k: 3, p: 2, m: 5 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12): Tìm nguyên hàm đa thức bậc 4 biết F(-1) hoặc F(1)
  t12_b11_d12_quartic_cond_mc: {
    id: 't12_b11_d12_quartic_cond_mc',
    name: 'Tìm nguyên hàm đa thức bậc bốn F(x) thỏa mãn điều kiện F(x₀) = y₀',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm thỏa mãn điều kiện ban đầu',
    description: 'Tìm một nguyên hàm F(x) của đa thức bậc bốn f(x) = ax^4 + bx^3 + cx^2 + dx + p thỏa điều kiện tại x0 = ±1.',
    conditionSummary: 'Hệ số bậc cao nhất a ≠ 0 và hằng số C ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số x⁴', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số x³', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hệ số x²', min: -5, max: 5, allowZero: false },
      { name: 'd', label: 'Hệ số x', min: -5, max: 5, allowZero: false },
      { name: 'p', label: 'Hệ số tự do', min: -4, max: 4, allowZero: false },
      { name: 'cConst', label: 'Hằng số C', min: -6, max: 8, allowZero: false },
      { name: 'x0', label: 'Điểm điều kiện (-1 hoặc 1)', min: -1, max: 1, step: 2 },
    ],
    validateCode: `
      const { a, b, c, d, p, cConst, x0 } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0 || p === 0 || cConst === 0) {
        return { valid: false, reason: 'Các hệ số phải khác 0' };
      }
      if (x0 !== -1 && x0 !== 1) return { valid: false, reason: 'x0 phải bằng -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, p, cConst, x0 } = params;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const buildExpr = (terms) => {
        let s = '';
        for (const t of terms) {
          const chunk = fmtFS(t[0], t[1], t[2], s === '');
          if (chunk) s += chunk;
        }
        return s || '0';
      };
      // F(x0) = (a/5)x0^5 + (b/4)x0^4 + (c/3)x0^3 + (d/2)x0^2 + p*x0 + cConst; common den 60
      const num60 =
        12 * a * Math.pow(x0, 5) +
        15 * b * Math.pow(x0, 4) +
        20 * c * Math.pow(x0, 3) +
        30 * d * Math.pow(x0, 2) +
        60 * p * x0 +
        60 * cConst;
      const y0Frac = u.simplifyFrac(num60, 60);
      const integrand = u.formatPoly([a, b, c, d, p]);
      const base = buildExpr([[a, 5, 'x^5'], [b, 4, 'x^4'], [c, 3, 'x^3'], [d, 2, 'x^2'], [p, 1, 'x']]);
      const correct = '$F(x) = ' + base + u.formatTrailingConst(cConst) + '$';
      const d1 = '$F(x) = ' + buildExpr([[a, 5, 'x^5'], [b, 4, 'x^4'], [c, 3, 'x^3'], [d, 2, 'x^2'], [p + 7, 1, 'x'], [cConst + 15, 1, '']]) + '$';
      const d2 = '$F(x) = ' + buildExpr([[a, 5, 'x^5'], [b, 4, 'x^4'], [c, 3, 'x^3'], [-d, 2, 'x^2'], [p, 1, 'x'], [cConst, 1, '']]) + '$';
      const d3 = '$F(x) = ' + base + u.formatTrailingConst(cConst - 15) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$F(x) = ' + base + u.formatTrailingConst(cConst + step * 3) + '$'
      );
      return {
        stem: 'Tìm một nguyên hàm $F(x)$ của hàm số $f(x) = ' + integrand + '$ biết $F(' + x0 + ') = ' + y0Frac.latex + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $F(x) = ' + base + ' + C$.',
          'Thay $x = ' + x0 + '$: $F(' + x0 + ') = ' + y0Frac.latex + ' \\Rightarrow C = ' + cConst + '$.',
          'Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số bậc 4 bằng 0', params: { a: 0, b: -2, c: 5, d: -4, p: 2, cConst: 5, x0: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 F(-1) = -23/30', params: { a: -2, b: -2, c: 5, d: -4, p: 2, cConst: 5, x0: -1 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13): Nguyên hàm ∫ k/(ax + b) dx
  t12_b11_d13_rational_const_lin_mc: {
    id: 't12_b11_d13_rational_const_lin_mc',
    name: 'Tìm nguyên hàm hàm phân thức bậc nhất ∫ k/(ax + b) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Tính ∫ k/(ax + b) dx = (k/a) ln|ax + b| + C.',
    conditionSummary: 'k ≠ 0, a > 0, b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a của mẫu', min: 1, max: 5 },
      { name: 'q', label: 'Hệ số q (tử k = a*q)', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số tự do b của mẫu', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, q, b } = params;
      if (a <= 0 || q === 0 || b === 0) return { valid: false, reason: 'Tham số phải hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, q, b } = params;
      const k = a * q;
      const lin = u.formatLinear(a, b);
      const correct = '$' + u.formatTerm(q, '\\ln|' + lin + '|', true) + ' + C$';
      const d1 = '$' + u.formatTerm(b, 'x', true) + u.formatTerm(k, '\\ln|' + lin + '|', false) + ' + C$';
      const d2 = '$\\ln|' + lin + '| + C$';
      const d3 = '$' + (-k < 0 ? '-' : '') + '\\frac{' + Math.abs(k) + '}{(' + lin + ')^2} + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(q + step, '\\ln|' + lin + '|', true) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\frac{' + k + '}{' + lin + '}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $\\int \\frac{1}{ax+b}\\mathrm{\\,d}x = \\frac{1}{a}\\ln|ax+b| + C$, ta được: ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tử số bằng 0', params: { a: 1, q: 0, b: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 ∫ 8/(x + 2) dx', params: { a: 1, q: 8, b: 2 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14): Nguyên hàm phân thức bậc 1 / bậc 1 ∫ (Ax + B)/(cx + d) dx
  t12_b11_d14_rational_1_over_1_mc: {
    id: 't12_b11_d14_rational_1_over_1_mc',
    name: 'Tìm nguyên hàm phân thức bậc 1 trên bậc 1 bằng phép chia đa thức',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Chia tử cho mẫu được dạng q + r/(cx + d), suy ra nguyên hàm qx + (r/c) ln|cx + d| + C.',
    conditionSummary: 'c > 0, q ≠ 0, m ≠ 0, d ≠ 0',
    paramSpecs: [
      { name: 'c', label: 'Hệ số c ở mẫu', min: 2, max: 6 },
      { name: 'd', label: 'Số hạng d ở mẫu', min: -9, max: 9, allowZero: false },
      { name: 'q', label: 'Thương nguyên q', min: 1, max: 6 },
      { name: 'm', label: 'Hệ số dư m (r = c*m)', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { c, d, q, m } = params;
      if (c <= 0 || d === 0 || q === 0 || m === 0) return { valid: false, reason: 'Tham số phải hợp lệ và dư khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, d, q, m } = params;
      const A = q * c;
      const r = c * m;
      const B = q * d + r;
      const numStr = u.formatLinear(A, B);
      const denStr = u.formatLinear(c, d);
      const ansBody = u.formatTerm(q, 'x', true) + u.formatTerm(m, '\\ln|' + denStr + '|', false);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + u.formatTerm(q * 3, 'x', true) + u.formatTerm(m, '\\ln|' + denStr + '|', false) + ' + C$';
      const d2 = '$' + u.formatTerm(q * 2, 'x', true) + u.formatTerm(m, '\\ln|' + denStr + '|', false) + ' + C$';
      const d3 = '$' + u.formatTerm(q + 1, 'x', true) + u.formatTerm(m, '\\ln|' + denStr + '|', false) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(q + step + 2, 'x', true) + u.formatTerm(m, '\\ln|' + denStr + '|', false) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\frac{' + numStr + '}{' + denStr + '}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia tử cho mẫu: $\\frac{' + numStr + '}{' + denStr + '} = ' + q + (r < 0 ? ' - \\frac{' + Math.abs(r) + '}{' + denStr + '}' : ' + \\frac{' + r + '}{' + denStr + '}') + '$.',
          'Do đó nguyên hàm là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên phần dư bằng 0 (r = 0)', params: { c: 5, d: 9, q: 3, m: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 ∫ (15x - 3)/(5x + 9) dx', params: { c: 5, d: 9, q: 3, m: -6 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15): Nguyên hàm phân thức bậc 2 trên bậc 1 ∫ (2px^2 + bx + c)/(x + m) dx
  t12_b11_d15_rational_2_over_1_mc: {
    id: 't12_b11_d15_rational_2_over_1_mc',
    name: 'Tìm nguyên hàm phân thức bậc 2 trên bậc 1 ∫ (ax² + bx + c)/(x + m) dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Thực hiện phép chia đa thức bậc 2 cho x + m được thương kx + q và số dư R, suy ra nguyên hàm.',
    conditionSummary: 'Hệ số p ≠ 0, m ≠ 0, và số dư R ≠ 0',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p (hệ số x² = 2p)', min: 1, max: 3 },
      { name: 'q', label: 'Hệ số tự do q của thương', min: -8, max: 8, allowZero: false },
      { name: 'm', label: 'Số hạng m của mẫu (x + m)', min: -5, max: 5, allowZero: false },
      { name: 'R', label: 'Số dư R', min: 2, max: 40 },
    ],
    validateCode: `
      const { p, q, m, R } = params;
      if (p === 0 || q === 0 || m === 0 || R === 0) return { valid: false, reason: 'Các tham số và số dư phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, m, R } = params;
      // (2p*x + q)(x + m) + R = 2p*x^2 + (2pm + q)x + (qm + R)
      const A = 2 * p;
      const B = 2 * p * m + q;
      const C0 = q * m + R;
      const numStr = u.formatQuadratic(A, B, C0);
      const denStr = u.formatLinear(1, m);
      const ansBody = u.formatTerm(p, 'x^2', true) + u.formatTerm(q, 'x', false) + u.formatTerm(R, '\\ln|' + denStr + '|', false);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + u.formatTerm(p, 'x^2', true) + u.formatTerm(B, 'x', false) + u.formatTerm(C0 || 1, '\\ln|x|', false) + ' + C$';
      const d2 = '$' + u.formatTerm(p, 'x^2', true) + u.formatTerm(q + 1, 'x', false) + u.formatTerm(R, '\\ln|' + denStr + '|', false) + ' + C$';
      const d3 = '$' + u.formatTerm(p, 'x^2', true) + u.formatTerm(q - m, 'x', false) + u.formatTerm(Math.round(R / 2) || 1, '\\ln|' + denStr + '|', false) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(p, 'x^2', true) + u.formatTerm(q + step + 2, 'x', false) + u.formatTerm(R, '\\ln|' + denStr + '|', false) + ' + C$'
      );
      const quot = u.formatLinear(A, q);
      return {
        stem: 'Tìm nguyên hàm $\\int \\frac{' + numStr + '}{' + denStr + '}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia đa thức ta được $\\frac{' + numStr + '}{' + denStr + '} = ' + quot + ' + \\frac{' + R + '}{' + denStr + '}$.',
          'Suy ra nguyên hàm là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên số dư R = 0', params: { p: 1, q: -11, m: 3, R: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 ∫ (2x² - 5x + 3)/(x + 3) dx', params: { p: 1, q: -11, m: 3, R: 36 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16): Nguyên hàm ∫ k sin x dx
  t12_b11_d16_sin_k_mc: {
    id: 't12_b11_d16_sin_k_mc',
    name: 'Tìm nguyên hàm hàm lượng giác cơ bản ∫ k sin x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tính ∫ k sin x dx = -k cos x + C với k khác 0.',
    conditionSummary: 'Hệ số k ≠ 0',
    paramSpecs: [{ name: 'k', label: 'Hệ số k', min: -9, max: 9, allowZero: false }],
    validateCode: `
      if (params.k === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$' + u.formatTerm(-k, '\\cos x', true) + ' + C$';
      const d1 = '$' + u.formatTerm(k, '\\sin x', true) + ' + C$';
      const d2 = '$' + u.formatTerm(k, '\\cos x', true) + ' + C$';
      const d3 = '$' + u.formatTerm(k < 0 ? 1 : -1, '\\cos x', true) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(-k + step, '\\cos x', true) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int ' + u.formatTerm(k, '\\sin x', true) + '\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng $\\int \\sin x\\mathrm{\\,d}x = -\\cos x + C$, ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 ∫ 3 sin x dx', params: { k: 3 }, expectedValid: true },
    ],
  },

  // Dạng 17 (Q17): Nguyên hàm ∫ k cos x dx
  t12_b11_d17_cos_k_mc: {
    id: 't12_b11_d17_cos_k_mc',
    name: 'Tìm nguyên hàm hàm lượng giác cơ bản ∫ k cos x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tính ∫ k cos x dx = k sin x + C với k khác 0.',
    conditionSummary: 'Hệ số k ≠ 0',
    paramSpecs: [{ name: 'k', label: 'Hệ số k', min: -9, max: 9, allowZero: false }],
    validateCode: `
      if (params.k === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$' + u.formatTerm(k, '\\sin x', true) + ' + C$';
      const d1 = '$' + u.formatTerm(k > 0 ? 1 : -1, '\\sin x', true) + ' + C$';
      const d2 = '$' + u.formatTerm(-k, '\\sin x', true) + ' + C$';
      const d3 = '$' + u.formatTerm(-k, '\\cos x', true) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(k + step, '\\sin x', true) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int ' + u.formatTerm(k, '\\cos x', true) + '\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng $\\int \\cos x\\mathrm{\\,d}x = \\sin x + C$, ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 ∫ 7 cos x dx', params: { k: 7 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18): Nguyên hàm ∫ (a sin x + b cos x) dx
  t12_b11_d18_lin_trig_mc: {
    id: 't12_b11_d18_lin_trig_mc',
    name: 'Tìm nguyên hàm tổ hợp tuyến tính ∫ (a sin x + b cos x) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tính ∫ (a sin x + b cos x) dx = b sin x - a cos x + C.',
    conditionSummary: 'Hệ số a ≠ 0 và b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số của sin x', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số của cos x', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'Các hệ số a, b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const integrand = u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false);
      const ansBody = u.formatTerm(b, '\\sin x', true) + u.formatTerm(-a, '\\cos x', false);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + u.formatTerm(2 * b, '\\sin x', true) + u.formatTerm(-2 * a, '\\cos x', false) + ' + C$';
      const d2 = '$x' + u.formatTerm(b, '\\sin x', false) + u.formatTerm(-a, '\\cos x', false) + ' + C$';
      const d3 = '$' + u.formatTerm(-b, '\\sin x', true) + u.formatTerm(a, '\\cos x', false) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(b + step, '\\sin x', true) + u.formatTerm(-a, '\\cos x', false) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int (' + integrand + ')\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int (' + integrand + ')\\mathrm{\\,d}x = ' + ansBody + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 ∫ (-4sin x + 3cos x) dx', params: { a: -4, b: 3 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19): Nguyên hàm hàm lượng giác góc hơn kém π
  t12_b11_d19_sin_shift_pi_mc: {
    id: 't12_b11_d19_sin_shift_pi_mc',
    name: 'Tìm nguyên hàm hàm lượng giác dạng sin(π ± x), cos(π ± x)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Rút gọn biểu thức lượng giác cung liên quan π rồi tìm nguyên hàm.',
    conditionSummary: 'Biến thể thuộc {0..3} và hệ số k > 0',
    paramSpecs: [
      { name: 'variant', label: 'Dạng hàm (0..3)', min: 0, max: 3 },
      { name: 'k', label: 'Hệ số k', min: 1, max: 6 },
    ],
    validateCode: `
      const { variant, k } = params;
      if (variant < 0 || variant > 3 || k <= 0) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { variant, k } = params;
      // 0: sin(pi+x) = -sin x -> cos x
      // 1: sin(pi-x) = sin x -> -cos x
      // 2: cos(pi+x) = -cos x -> -sin x
      // 3: cos(pi-x) = -cos x -> -sin x
      const items = [
        { expr: '\\sin(\\pi + x)', simp: '-\\sin x', ansSym: '\\cos x', ansCoeff: 1 },
        { expr: '\\sin(\\pi - x)', simp: '\\sin x', ansSym: '\\cos x', ansCoeff: -1 },
        { expr: '\\cos(\\pi + x)', simp: '-\\cos x', ansSym: '\\sin x', ansCoeff: -1 },
        { expr: '\\cos(\\pi - x)', simp: '-\\cos x', ansSym: '\\sin x', ansCoeff: -1 },
      ];
      const it = items[variant];
      const cAns = k * it.ansCoeff;
      const prefix = k === 1 ? '' : String(k);
      const correct = '$' + u.formatTerm(cAns, it.ansSym, true) + ' + C$';
      const allCand = [
        '$' + u.formatTerm(k, '\\sin x', true) + ' + C$',
        '$' + u.formatTerm(-k, '\\sin x', true) + ' + C$',
        '$' + u.formatTerm(k, '\\cos x', true) + ' + C$',
        '$' + u.formatTerm(-k, '\\cos x', true) + ' + C$',
      ].filter((x) => x !== correct);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        allCand,
        rng,
        (step) => '$' + u.formatTerm(cAns + step, it.ansSym, true) + ' + C$'
      );
      return {
        stem: 'Nguyên hàm của hàm số $y = ' + prefix + it.expr + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + prefix + it.expr + ' = ' + (k === 1 ? it.simp : (it.simp.startsWith('-') ? '-' + k + it.simp.slice(1) : k + it.simp)) + '$.',
          'Suy ra nguyên hàm của hàm số đã cho là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số k = 0', params: { variant: 0, k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 y = sin(π + x)', params: { variant: 0, k: 1 }, expectedValid: true },
    ],
  },

  // Dạng 20 (Q20): Nguyên hàm hàm lượng giác góc phụ π/2
  t12_b11_d20_trig_comp_half_pi_mc: {
    id: 't12_b11_d20_trig_comp_half_pi_mc',
    name: 'Tìm nguyên hàm hàm lượng giác dạng cos(π/2 ± x), sin(π/2 ± x)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Áp dụng công thức cung phụ π/2 ± x rồi tìm nguyên hàm.',
    conditionSummary: 'Biến thể thuộc {0..3} và hệ số k > 0',
    paramSpecs: [
      { name: 'variant', label: 'Dạng hàm (0..3)', min: 0, max: 3 },
      { name: 'k', label: 'Hệ số k', min: 1, max: 6 },
    ],
    validateCode: `
      const { variant, k } = params;
      if (variant < 0 || variant > 3 || k <= 0) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { variant, k } = params;
      const items = [
        { expr: '\\cos\\left(\\dfrac{\\pi}{2} - x\\right)', simp: '\\sin x', ansSym: '\\cos x', ansCoeff: -1 },
        { expr: '\\cos\\left(\\dfrac{\\pi}{2} + x\\right)', simp: '-\\sin x', ansSym: '\\cos x', ansCoeff: 1 },
        { expr: '\\sin\\left(\\dfrac{\\pi}{2} - x\\right)', simp: '\\cos x', ansSym: '\\sin x', ansCoeff: 1 },
        { expr: '\\sin\\left(\\dfrac{\\pi}{2} + x\\right)', simp: '\\cos x', ansSym: '\\sin x', ansCoeff: 1 },
      ];
      const it = items[variant];
      const cAns = k * it.ansCoeff;
      const prefix = k === 1 ? '' : String(k);
      const correct = '$' + u.formatTerm(cAns, it.ansSym, true) + ' + C$';
      const allCand = [
        '$' + u.formatTerm(k, '\\cos x', true) + ' + C$',
        '$' + u.formatTerm(-k, '\\cos x', true) + ' + C$',
        '$' + u.formatTerm(-k, '\\sin x', true) + ' + C$',
        '$' + u.formatTerm(k, '\\sin x', true) + ' + C$',
      ].filter((x) => x !== correct);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        allCand,
        rng,
        (step) => '$' + u.formatTerm(cAns + step, it.ansSym, true) + ' + C$'
      );
      return {
        stem: 'Nguyên hàm của hàm số $y = ' + prefix + it.expr + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + it.expr + ' = ' + it.simp + '$.',
          'Suy ra $\\int ' + prefix + it.expr + '\\mathrm{\\,d}x = ' + correct.slice(1, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số k = 0', params: { variant: 0, k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 y = cos(π/2 - x)', params: { variant: 0, k: 1 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21): Nguyên hàm y = sin(kx)
  t12_b11_d21_sin_kx_mc: {
    id: 't12_b11_d21_sin_kx_mc',
    name: 'Tìm nguyên hàm hàm số y = sin(kx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tính ∫ sin(kx) dx = -(1/k)cos(kx) + C với k ≥ 2.',
    conditionSummary: 'k ≥ 2',
    paramSpecs: [{ name: 'k', label: 'Hệ số góc k', min: 2, max: 12 }],
    validateCode: `
      if (params.k < 2) return { valid: false, reason: 'Cần k >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$-\\frac{1}{' + k + '}\\cos ' + k + 'x + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$-\\cos ' + k + 'x + C$',
          '$\\cos ' + k + 'x + C$',
          '$\\frac{1}{' + k + '}\\cos ' + k + 'x + C$',
        ],
        rng,
        (step) => '$-\\frac{1}{' + (k + step) + '}\\cos ' + k + 'x + C$'
      );
      return {
        stem: 'Nguyên hàm của hàm số $y = \\sin ' + k + 'x$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int \\sin ' + k + 'x\\mathrm{\\,d}x = -\\frac{1}{' + k + '}\\cos ' + k + 'x + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 y = sin 4x', params: { k: 4 }, expectedValid: true },
    ],
  },

  // Dạng 22 (Q22): Nguyên hàm y = cos(kx)
  t12_b11_d22_cos_kx_mc: {
    id: 't12_b11_d22_cos_kx_mc',
    name: 'Tìm nguyên hàm hàm số y = cos(kx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tính ∫ cos(kx) dx = (1/k)sin(kx) + C với k ≥ 2.',
    conditionSummary: 'k ≥ 2',
    paramSpecs: [{ name: 'k', label: 'Hệ số góc k', min: 2, max: 12 }],
    validateCode: `
      if (params.k < 2) return { valid: false, reason: 'Cần k >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$\\frac{1}{' + k + '}\\sin ' + k + 'x + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$-\\sin ' + k + 'x + C$',
          '$\\sin ' + k + 'x + C$',
          '$-\\frac{1}{' + k + '}\\sin ' + k + 'x + C$',
        ],
        rng,
        (step) => '$\\frac{1}{' + (k + step) + '}\\sin ' + k + 'x + C$'
      );
      return {
        stem: 'Nguyên hàm của hàm số $y = \\cos ' + k + 'x$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int \\cos ' + k + 'x\\mathrm{\\,d}x = \\frac{1}{' + k + '}\\sin ' + k + 'x + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 y = cos 6x', params: { k: 6 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23): Nguyên hàm ∫ k/cos^2 x dx
  t12_b11_d23_inv_cos2_mc: {
    id: 't12_b11_d23_inv_cos2_mc',
    name: 'Tìm nguyên hàm ∫ k/cos²x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tính ∫ k/cos^2(x) dx = k tan x + C.',
    conditionSummary: 'Hệ số k ≠ 0',
    paramSpecs: [{ name: 'k', label: 'Tử số k', min: -10, max: 10, allowZero: false }],
    validateCode: `
      if (params.k === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$' + u.formatTerm(k, '\\tan x', true) + ' + C$';
      const d1 = '$' + u.formatTerm(k, '\\tan^2 x', true) + ' + C$';
      const d2 = '$' + u.formatTerm(k, '\\sin^2 x', true) + ' + C$';
      const d3 = '$' + u.formatTerm(k, '\\cot x', true) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(k + step, '\\tan x', true) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\dfrac{' + k + '}{\\cos^2 x}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng $\\int \\dfrac{1}{\\cos^2 x}\\mathrm{\\,d}x = \\tan x + C$, ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 ∫ 8/cos²x dx', params: { k: 8 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24): Nguyên hàm ∫ k/sin^2 x dx
  t12_b11_d24_inv_sin2_mc: {
    id: 't12_b11_d24_inv_sin2_mc',
    name: 'Tìm nguyên hàm ∫ k/sin²x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tính ∫ k/sin^2(x) dx = -k cot x + C.',
    conditionSummary: 'Hệ số k ≠ 0',
    paramSpecs: [{ name: 'k', label: 'Tử số k', min: -10, max: 10, allowZero: false }],
    validateCode: `
      if (params.k === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$' + u.formatTerm(-k, '\\cot x', true) + ' + C$';
      const d1 = '$\\dfrac{' + k + '}{\\cot^2 x} + C$';
      const d2 = '$' + u.formatTerm(k, '\\cot^2 x', true) + ' + C$';
      const d3 = '$' + u.formatTerm(k, '\\cot x', true) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(-k + step, '\\cot x', true) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\dfrac{' + k + '}{\\sin^2 x}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng $\\int \\dfrac{1}{\\sin^2 x}\\mathrm{\\,d}x = -\\cot x + C$, ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 ∫ 7/sin²x dx', params: { k: 7 }, expectedValid: true },
    ],
  },

  // Dạng 25 (Q25): Nguyên hàm ∫ k(1 + tan^2 x) dx
  t12_b11_d25_one_plus_tan2_mc: {
    id: 't12_b11_d25_one_plus_tan2_mc',
    name: 'Tìm nguyên hàm ∫ k(1 + tan²x) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Sử dụng đồng nhất thức 1 + tan^2(x) = 1/cos^2(x) để tính nguyên hàm.',
    conditionSummary: 'Hệ số k ≠ 0',
    paramSpecs: [{ name: 'k', label: 'Hệ số k', min: -10, max: 10, allowZero: false }],
    validateCode: `
      if (params.k === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$' + u.formatTerm(k, '\\tan x', true) + ' + C$';
      const d1 = '$' + u.formatTerm(k, '\\tan^2 x', true) + ' + C$';
      const d2 = '$' + u.formatTerm(k, '\\cot x', true) + ' + C$';
      const d3 = '$' + u.formatTerm(k, '\\sin^2 x', true) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(k + step, '\\tan x', true) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int ' + k + '(1 + \\tan^2 x)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$ nên $\\int ' + k + '(1 + \\tan^2 x)\\mathrm{\\,d}x = ' + correct.slice(1, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 ∫ 7(1 + tan²x) dx', params: { k: 7 }, expectedValid: true },
    ],
  },

  // Dạng 26 (Q26): Nguyên hàm ∫ k(1 + cot^2 x) dx
  t12_b11_d26_one_plus_cot2_mc: {
    id: 't12_b11_d26_one_plus_cot2_mc',
    name: 'Tìm nguyên hàm ∫ k(1 + cot²x) dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Sử dụng đồng nhất thức 1 + cot^2(x) = 1/sin^2(x) để tính nguyên hàm.',
    conditionSummary: 'Hệ số k ≠ 0',
    paramSpecs: [{ name: 'k', label: 'Hệ số k', min: -10, max: 10, allowZero: false }],
    validateCode: `
      if (params.k === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$' + u.formatTerm(-k, '\\cot x', true) + ' + C$';
      const d1 = '$' + u.formatTerm(k, '\\tan^2 x', true) + ' + C$';
      const d2 = '$' + u.formatTerm(k, '\\cot x', true) + ' + C$';
      const d3 = '$' + u.formatTerm(k, '\\cot^2 x', true) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(-k + step, '\\cot x', true) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int ' + k + '(1 + \\cot^2 x)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $1 + \\cot^2 x = \\frac{1}{\\sin^2 x}$ nên $\\int ' + k + '(1 + \\cot^2 x)\\mathrm{\\,d}x = ' + correct.slice(1, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 ∫ -4(1 + cot²x) dx', params: { k: -4 }, expectedValid: true },
    ],
  },

  // Dạng 27 (Q27): Nguyên hàm ∫ (a/cos^2 x + b/sin^2 x) dx
  t12_b11_d27_combo_inv_cos2_sin2_mc: {
    id: 't12_b11_d27_combo_inv_cos2_sin2_mc',
    name: 'Tìm nguyên hàm kết hợp ∫ (a/cos²x + b/sin²x) dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tính nguyên hàm tổng hai phân thức lượng giác cơ bản: a tan x - b cot x + C.',
    conditionSummary: 'Hệ số a, b khác 0',
    paramSpecs: [
      { name: 'a', label: 'Tử số trên cos²x', min: 1, max: 9 },
      { name: 'b', label: 'Tử số trên sin²x', min: 1, max: 9 },
    ],
    validateCode: `
      if (params.a <= 0 || params.b <= 0) return { valid: false, reason: 'Tham số a, b phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const ansBody = u.formatTerm(a, '\\tan x', true) + u.formatTerm(-b, '\\cot x', false);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + u.formatTerm(a, '\\tan^2 x', true) + ' + C$';
      const d2 = '$' + u.formatTerm(a, '\\cos x', true) + u.formatTerm(b, '\\sin x', false) + ' + C$';
      const d3 = '$' + u.formatTerm(a, '\\tan x', true) + u.formatTerm(b, '\\cot x', false) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(a + step, '\\tan x', true) + u.formatTerm(-b, '\\cot x', false) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\left(\\dfrac{' + a + '}{\\cos^2 x} + \\dfrac{' + b + '}{\\sin^2 x}\\right)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int \\left(\\dfrac{' + a + '}{\\cos^2 x} + \\dfrac{' + b + '}{\\sin^2 x}\\right)\\mathrm{\\,d}x = ' + ansBody + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 ∫ (2/cos²x + 5/sin²x) dx', params: { a: 2, b: 5 }, expectedValid: true },
    ],
  },

  // Dạng 28 (Q28): Nguyên hàm hàm mũ cơ số b ∫ b^x dx
  t12_b11_d28_a_pow_x_mc: {
    id: 't12_b11_d28_a_pow_x_mc',
    name: 'Tìm nguyên hàm của hàm số mũ cơ số tổng quát ∫ b^x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tính ∫ b^x dx = b^x / ln(b) + C với cơ số dương b ≠ 1 (gồm π, 2, 3, 5, 7...).',
    conditionSummary: 'Chỉ số cơ số thuộc {0..4}',
    paramSpecs: [{ name: 'baseIdx', label: 'Chỉ số cơ số (0:π, 1:2, 2:3, 3:5, 4:7)', min: 0, max: 4 }],
    validateCode: `
      if (params.baseIdx < 0 || params.baseIdx > 4) return { valid: false, reason: 'Chỉ số cơ số phải từ 0 đến 4' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const bases = ['\\pi', '2', '3', '5', '7'];
      const b = bases[params.baseIdx];
      const correct = '$\\dfrac{' + b + '^x}{\\ln ' + b + '} + C$';
      const d1 = '$' + b + '^x\\ln ' + b + ' + C$';
      const d2 = '$\\dfrac{x^{' + b + '}}{\\ln ' + b + '} + C$';
      const d3 = '$\\dfrac{' + b + '^x}{' + b + '} + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\dfrac{' + b + '^x}{' + (step + 2) + '\\ln ' + b + '} + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int ' + b + '^x\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $\\int a^x\\mathrm{\\,d}x = \\dfrac{a^x}{\\ln a} + C$, ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên baseIdx ngoài miền', params: { baseIdx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 ∫ π^x dx', params: { baseIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 29 (Q29): Nguyên hàm ∫ k e^x dx
  t12_b11_d29_k_exp_x_mc: {
    id: 't12_b11_d29_k_exp_x_mc',
    name: 'Tìm nguyên hàm ∫ k·e^x dx',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tính ∫ k e^x dx = k e^x + C.',
    conditionSummary: 'Hệ số k ≠ 0, k ≠ 1',
    paramSpecs: [{ name: 'k', label: 'Hệ số k', min: 2, max: 12 }],
    validateCode: `
      if (params.k <= 1) return { valid: false, reason: 'Cần k >= 2 để tránh trùng e^x' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const correct = '$' + k + '\\mathrm{e}^x + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + k + '\\ln x + C$',
          '$\\mathrm{e}^x + C$',
          '$\\mathrm{e}^{' + k + 'x} + C$',
        ],
        rng,
        (step) => '$' + (k + step) + '\\mathrm{e}^x + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int ' + k + '\\mathrm{e}^x\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int ' + k + '\\mathrm{e}^x\\mathrm{\\,d}x = ' + k + '\\mathrm{e}^x + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 ∫ 6e^x dx', params: { k: 6 }, expectedValid: true },
    ],
  },

  // Dạng 30 (Q30): Nguyên hàm ∫ e^(b + ax) dx
  t12_b11_d30_exp_ax_b_mc: {
    id: 't12_b11_d30_exp_ax_b_mc',
    name: 'Tìm nguyên hàm ∫ e^(b + ax) dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tính ∫ e^(b + ax) dx = (1/a)e^(b + ax) + C.',
    conditionSummary: '|a| ≥ 2 để phân biệt hệ số 1/a và a',
    paramSpecs: [
      { name: 'b', label: 'Hằng số b trên mũ', min: 1, max: 7 },
      { name: 'a', label: 'Hệ số a của x trên mũ', min: -6, max: 6 },
    ],
    validateCode: `
      if (Math.abs(params.a) < 2) return { valid: false, reason: 'Cần |a| >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, a } = params;
      const expStr = b + u.formatTerm(a, 'x', false);
      const frac = u.simplifyFrac(1, a);
      const correct = '$' + frac.latex + '\\mathrm{e}^{' + expStr + '} + C$';
      const d1 = '$\\mathrm{e}^{' + expStr + '} + C$';
      const d2 = '$' + a + '\\mathrm{e}^{' + expStr + '} + C$';
      const d3 = '$(' + expStr + ')\\mathrm{e}^x + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.simplifyFrac(1, a + step).latex + '\\mathrm{e}^{' + expStr + '} + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int \\mathrm{e}^{' + expStr + '}\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng $\\int \\mathrm{e}^{ax+b}\\mathrm{\\,d}x = \\frac{1}{a}\\mathrm{e}^{ax+b} + C$, ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { b: 4, a: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 ∫ e^(4 - 4x) dx', params: { b: 4, a: -4 }, expectedValid: true },
    ],
  },

  // Dạng 31 (Q31): Nguyên hàm ∫ (a e^x + b e^-x) dx
  t12_b11_d31_exp_pos_neg_mc: {
    id: 't12_b11_d31_exp_pos_neg_mc',
    name: 'Tìm nguyên hàm của hàm số f(x) = a e^x + b e^(-x)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tính ∫ (a e^x + b e^-x) dx = a e^x - b e^-x + C.',
    conditionSummary: 'a ≠ 0 và b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số của e^x', min: 1, max: 7 },
      { name: 'b', label: 'Hệ số của e^(-x)', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      if (params.a <= 0 || params.b === 0) return { valid: false, reason: 'Tham số a > 0 và b ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const fx = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(b, '\\mathrm{e}^{-x}', false);
      const ansBody = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + u.formatTerm(a + 1, '\\mathrm{e}^x', true) + u.formatTerm(b, '\\mathrm{e}^{-x}', false) + ' + C$';
      const d2 = '$' + u.formatTerm(a, '\\mathrm{e}^x', true) + ' + 2' + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + ' + C$';
      const d3 = '$' + fx + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(a + step, '\\mathrm{e}^x', true) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm của hàm số $f(x) = ' + fx + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int (' + fx + ')\\mathrm{\\,d}x = ' + ansBody + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 2, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 f(x) = 2e^x - e^(-x)', params: { a: 2, b: -1 }, expectedValid: true },
    ],
  },

  // Dạng 32 (Q32): Nguyên hàm ∫ (1/e^(kx) + m) dx
  t12_b11_d32_inv_exp_kx_plus_m_mc: {
    id: 't12_b11_d32_inv_exp_kx_plus_m_mc',
    name: 'Tìm nguyên hàm ∫ (1/e^(kx) + m) dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Biến đổi 1/e^(kx) = e^(-kx) để tìm nguyên hàm -(1/k)e^(-kx) + mx + C.',
    conditionSummary: 'k ≥ 2 và m ≠ 0',
    paramSpecs: [
      { name: 'k', label: 'Hệ số mũ k', min: 2, max: 6 },
      { name: 'm', label: 'Hằng số m', min: 1, max: 6 },
    ],
    validateCode: `
      if (params.k < 2 || params.m === 0) return { valid: false, reason: 'Cần k >= 2 và m ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, m } = params;
      const mx = u.formatTerm(m, 'x', false);
      const correct = '$-\\frac{1}{' + k + '}\\mathrm{e}^{-' + k + 'x}' + mx + ' + C$';
      const d1 = '$-\\frac{1}{' + k + '}\\mathrm{e}^{' + k + 'x}' + mx + ' + C$';
      const d2 = '$-' + k + '\\mathrm{e}^{-' + k + 'x}' + mx + ' + C$';
      const d3 = '$\\frac{1}{' + k + '}\\mathrm{e}^{-' + k + 'x}' + mx + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$-\\frac{1}{' + (k + step) + '}\\mathrm{e}^{-' + k + 'x}' + mx + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\displaystyle \\int \\left(\\dfrac{1}{\\mathrm{e}^{' + k + 'x}} + ' + m + '\\right)\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Viết lại $\\frac{1}{\\mathrm{e}^{' + k + 'x}} + ' + m + ' = \\mathrm{e}^{-' + k + 'x} + ' + m + '$.',
          'Suy ra nguyên hàm bằng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1, m: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 ∫ (1/e^(2x) + 1) dx', params: { k: 2, m: 1 }, expectedValid: true },
    ],
  },

  // Dạng 33 (Q33): Nguyên hàm ∫ (e^(kx) + ax + b) dx
  t12_b11_d33_exp_kx_poly_mc: {
    id: 't12_b11_d33_exp_kx_poly_mc',
    name: 'Tìm nguyên hàm kết hợp hàm mũ và đa thức ∫ (e^(kx) + ax + b) dx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tính ∫ (e^(kx) + ax + b) dx = (1/k)e^(kx) + (a/2)x^2 + bx + C.',
    conditionSummary: 'k ≥ 2 và a ≠ 0',
    paramSpecs: [
      { name: 'k', label: 'Hệ số mũ k', min: 2, max: 7 },
      { name: 'a', label: 'Hệ số a của x', min: 2, max: 6 },
      { name: 'b', label: 'Hệ số tự do b', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      if (params.k < 2 || params.a === 0 || params.b === 0) return { valid: false, reason: 'Tham số phải hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, a, b } = params;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const integrand = '\\mathrm{e}^{' + k + 'x}' + u.formatTerm(a, 'x', false) + u.formatTerm(b, '', false);
      const x2Term = fmtFS(a, 2, 'x^2', false);
      const bxTerm = u.formatTerm(b, 'x', false);
      const lead = '\\frac{1}{' + k + '}\\mathrm{e}^{' + k + 'x}';
      const correct = '$' + lead + x2Term + bxTerm + ' + C$';
      const d1 = '$\\mathrm{e}^{' + k + 'x}' + x2Term + bxTerm + ' + C$';
      const d2 = '$' + k + '\\mathrm{e}^{' + k + 'x}' + u.formatTerm(a, '', false) + ' + C$';
      const d3 = '$' + lead + u.formatTerm(a, 'x^2', false) + bxTerm + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + lead + x2Term + u.formatTerm(b + step, 'x', false) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm $\\int (' + integrand + ')\\mathrm{\\,d}x$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int (' + integrand + ')\\mathrm{\\,d}x = ' + lead + x2Term + bxTerm + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1, a: 2, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 ∫ (e^(5x) + 2x + 1) dx', params: { k: 5, a: 2, b: 1 }, expectedValid: true },
    ],
  },

  // Dạng 34 (Q34): Nguyên hàm f(x) = a e^x + c + b e^-x
  t12_b11_d34_exp_pos_const_neg_mc: {
    id: 't12_b11_d34_exp_pos_const_neg_mc',
    name: 'Tìm nguyên hàm f(x) = a e^x + c + b e^(-x)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tính ∫ (a e^x + c + b e^-x) dx = a e^x + cx - b e^-x + C.',
    conditionSummary: 'a, c, b khác 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số e^x', min: 1, max: 6 },
      { name: 'c', label: 'Hằng số c', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số e^(-x)', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      if (params.a <= 0 || params.c === 0 || params.b === 0) return { valid: false, reason: 'Các tham số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, b } = params;
      const fx = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(c, '', false) + u.formatTerm(b, '\\mathrm{e}^{-x}', false);
      const ansBody = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(c, 'x', false) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false);
      const correct = '$' + ansBody + ' + C$';
      const d1 = '$' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(c, 'x', false) + ' + C$';
      const d2 = '$' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(c, '', false) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + ' + C$';
      const d3 = '$' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(c, 'x', false) + u.formatTerm(b, '\\mathrm{e}^{-x}', false) + ' + C$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + u.formatTerm(a + step, '\\mathrm{e}^x', true) + u.formatTerm(c, 'x', false) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + ' + C$'
      );
      return {
        stem: 'Tìm nguyên hàm của hàm số $f(x) = ' + fx + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\int (' + fx + ')\\mathrm{\\,d}x = ' + ansBody + ' + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { a: 3, c: 0, b: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 f(x) = 3e^x - 2 + 2e^(-x)', params: { a: 3, c: -2, b: 2 }, expectedValid: true },
    ],
  },

  // Dạng 35 (Q35): Tìm F(x) của f(x) = a e^x + b thỏa F(0) = m
  t12_b11_d35_exp_cond_0_mc: {
    id: 't12_b11_d35_exp_cond_0_mc',
    name: 'Tìm nguyên hàm F(x) của f(x) = a e^x + b thỏa F(0) = m',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm thỏa mãn điều kiện ban đầu',
    description: 'Tìm F(x) = a e^x + bx + C thỏa F(0) = m.',
    conditionSummary: 'a, b khác 0 và C = m - a khác 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số của e^x', min: 1, max: 6 },
      { name: 'b', label: 'Hằng số b', min: -5, max: 5, allowZero: false },
      { name: 'm', label: 'Giá trị F(0) = m', min: -5, max: 5 },
    ],
    validateCode: `
      const { a, b, m } = params;
      if (a <= 0 || b === 0) return { valid: false, reason: 'Tham số a > 0 và b ≠ 0' };
      if (m - a === 0) return { valid: false, reason: 'Tránh C = 0 đơn giản quá mức' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, m } = params;
      const C = m - a;
      const fx = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(b, '', false);
      const correct = '$F(x) = ' + u.formatTerm(b, 'x', true) + u.formatTerm(a, '\\mathrm{e}^x', false) + u.formatTrailingConst(C) + '$';
      const d1 = '$F(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(-b, 'x', false) + u.formatTrailingConst(C) + '$';
      const d2 = '$F(x) = ' + u.formatTerm(b, 'x', true) + u.formatTrailingConst(C) + u.formatTerm(a, '\\mathrm{e}^{-x}', false) + '$';
      const d3 = '$F(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(b, 'x^2', false) + u.formatTrailingConst(C) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$F(x) = ' + u.formatTerm(b, 'x', true) + u.formatTerm(a, '\\mathrm{e}^x', false) + u.formatTrailingConst(C + step) + '$'
      );
      return {
        stem: 'Tìm một nguyên hàm $F(x)$ của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(0) = ' + m + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(b, 'x', true) + u.formatTerm(a, '\\mathrm{e}^x', false) + ' + C$.',
          '$F(0) = ' + m + ' \\Leftrightarrow ' + a + ' + C = ' + m + ' \\Rightarrow C = ' + C + '$.',
          'Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 2, b: 0, m: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 f(x) = 2e^x + 1, F(0) = -2', params: { a: 2, b: 1, m: -2 }, expectedValid: true },
    ],
  },

  // Dạng 36 (Q36): Tìm F(x) của f(x) = a e^x + b e^-x thỏa F(-1) = m
  t12_b11_d36_exp_cond_neg1_mc: {
    id: 't12_b11_d36_exp_cond_neg1_mc',
    name: 'Tìm nguyên hàm F(x) của f(x) = a e^x + b e^(-x) thỏa F(-1) = m',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm thỏa mãn điều kiện ban đầu',
    description: 'Tìm F(x) = a e^x - b e^-x + C với C biểu diễn chính xác theo e khi biết F(-1) = m.',
    conditionSummary: 'a > 0, b ≠ 0, m ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số của e^x', min: 2, max: 6 },
      { name: 'b', label: 'Hệ số của e^(-x)', min: -5, max: 5, allowZero: false },
      { name: 'm', label: 'Giá trị F(-1) = m', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      if (params.a < 2 || params.b === 0 || params.m === 0) return { valid: false, reason: 'Tham số phải khác 0 và a >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, m } = params;
      // F(x) = a e^x - b e^{-x} + C; F(-1) = a/e - b*e + C = m => C = m + b*e - a/e
      const fx = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(b, '\\mathrm{e}^{-x}', false);
      const fmtEFrac = (coeff, isFirst) => {
        const sign = coeff < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const ac = Math.abs(coeff);
        return sign + '\\frac{' + ac + '}{\\mathrm{e}}';
      };
      const cExpr = u.formatTerm(b, '\\mathrm{e}', true) + fmtEFrac(-a, false) + u.formatTrailingConst(m);
      const correct = '$F(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + u.formatTerm(b, '\\mathrm{e}', false) + fmtEFrac(-a, false) + u.formatTrailingConst(m) + '$';
      const d1 = '$F(x) = \\frac{1}{' + a + '}\\mathrm{e}^x' + u.formatTerm(b, '\\mathrm{e}', false) + fmtEFrac(-a, false) + u.formatTrailingConst(m) + ' - 0{,}5\\mathrm{e}^{-x}$';
      const d2 = '$F(x) = ' + u.formatTerm(Math.abs(b), 'x', true) + u.formatTerm(b, '\\mathrm{e}', false) + fmtEFrac(-a, false) + u.formatTrailingConst(m) + u.formatTerm(a, '\\mathrm{e}^{-x}', false) + '$';
      const d3 = '$F(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(b, '\\mathrm{e}', false) + fmtEFrac(-a, false) + u.formatTrailingConst(m + 3) + u.formatTerm(b, '\\mathrm{e}^{-x}', false) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$F(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + u.formatTrailingConst(m + step + 5) + '$'
      );
      return {
        stem: 'Tìm một nguyên hàm $F(x)$ của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(-1) = ' + m + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $F(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + ' + C$.',
          '$F(-1) = ' + m + ' \\Leftrightarrow ' + fmtEFrac(a, true) + u.formatTerm(-b, '\\mathrm{e}', false) + ' + C = ' + m + ' \\Rightarrow C = ' + cExpr + '$.',
          'Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 5, b: 0, m: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 f(x) = 5e^x - 2e^(-x), F(-1) = -1', params: { a: 5, b: -2, m: -1 }, expectedValid: true },
    ],
  },
};
