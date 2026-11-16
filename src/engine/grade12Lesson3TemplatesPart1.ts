import { MathTemplate } from '../types/math';

export const G12_B3_TEMPLATES_PART1: Record<string, MathTemplate> = {
  // Dạng 1 [MC - Biết]: Tiệm cận ngang của hàm phân thức bậc nhất trên bậc nhất
  t12_b3_d01_tcn_rat11_mc: {
    id: 't12_b3_d01_tcn_rat11_mc',
    name: 'Dạng 1: Tìm tiệm cận ngang của đồ thị hàm số y = (ax + b)/(cx + d)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận ngang',
    description:
      'Xác định đường tiệm cận ngang y = a/c của đồ thị hàm phân thức bậc nhất trên bậc nhất (cho phép đảo thứ tự b + ax).',
    conditionSummary: 'a != 0, c != 0, d != 0 và ad - bc != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a của x trên tử', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b trên tử', min: -8, max: 8 },
      { name: 'c', label: 'Hệ số c của x dưới mẫu', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hằng số d dưới mẫu', min: -9, max: 9, allowZero: false },
      { name: 'swap', label: 'Đảo thứ tự b + ax (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || c === 0 || d === 0) return { valid: false, reason: 'a, c, d phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm hàm suy biến thành hằng số' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, swap } = params;
      const fmtRev = (coefX, cnst) => {
        if (cnst === 0) return u.formatTerm(coefX, 'x', true);
        return '' + cnst + u.formatTerm(coefX, 'x', false);
      };
      const numStr = swap === 1 ? fmtRev(a, b) : u.formatLinear(a, b);
      const denStr = swap === 1 ? fmtRev(c, d) : u.formatLinear(c, d);
      const tcn = u.simplifyFrac(a, c);
      const negTcn = u.simplifyFrac(-a, c);
      const bOverD = u.simplifyFrac(b, d);
      const correct = '$y = ' + tcn.latex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$y = ' + negTcn.latex + '$',
          '$x = ' + tcn.latex + '$',
          '$y = ' + bOverD.latex + '$',
          '$y = ' + u.simplifyFrac(a + 1, c).latex + '$',
        ],
        rng,
        (k) => '$y = ' + u.simplifyFrac(tcn.num + k, tcn.den).latex + '$'
      );
      return {
        stem: 'Đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$ có đường tiệm cận ngang là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tính giới hạn khi $x \\to \\pm\\infty$: $\\lim_{x \\to \\pm\\infty} \\dfrac{' + numStr + '}{' + denStr + '} = ' + tcn.latex + '$.',
          'Vậy đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$ có đường tiệm cận ngang là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (2-2x)/(7-3x)', params: { a: -2, b: 2, c: -3, d: 7, swap: 1 }, expectedValid: true },
      { label: 'Biên lỗi c = 0', params: { a: 2, b: 1, c: 0, d: 3, swap: 0 }, expectedValid: false },
    ],
  },

  // Dạng 2 [MC - Biết]: Tiệm cận ngang của hàm phân thức bậc hai trên bậc hai
  t12_b3_d02_tcn_rat22_mc: {
    id: 't12_b3_d02_tcn_rat22_mc',
    name: 'Dạng 2: Tìm tiệm cận ngang của hàm phân thức bậc 2 trên bậc 2',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận ngang',
    description:
      'Tìm đường tiệm cận ngang y = a2/d2 của đồ thị hàm số y = (a2*x^2 + b2*x + c2)/(d2*x^2 + e2).',
    conditionSummary: 'a2 != 0, d2 != 0, e2 != 0 và tử không đồng tỉ lệ với mẫu',
    paramSpecs: [
      { name: 'a2', label: 'Hệ số x^2 trên tử', min: -4, max: 4, allowZero: false },
      { name: 'b2', label: 'Hệ số x trên tử', min: -6, max: 6, allowZero: false },
      { name: 'c2', label: 'Hằng số trên tử', min: -6, max: 6 },
      { name: 'd2', label: 'Hệ số x^2 dưới mẫu', min: -7, max: 7, allowZero: false },
      { name: 'e2', label: 'Hằng số dưới mẫu', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { a2, b2, d2, e2 } = params;
      if (a2 === 0 || b2 === 0 || d2 === 0 || e2 === 0) {
        return { valid: false, reason: 'Các hệ số chính phải khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a2, b2, c2, d2, e2 } = params;
      const numStr = u.formatQuadratic(a2, b2, c2);
      const denStr = u.formatQuadratic(d2, 0, e2);
      const tcn = u.simplifyFrac(a2, d2);
      const wrong1 = u.simplifyFrac(b2, d2);
      const correct = '$y = ' + tcn.latex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$y = 1$',
          '$y = ' + wrong1.latex + '$',
          '$x = ' + tcn.latex + '$',
          '$y = ' + u.simplifyFrac(-a2, d2).latex + '$',
        ],
        rng,
        (k) => '$y = ' + u.simplifyFrac(tcn.num + k, tcn.den).latex + '$'
      );
      return {
        stem: 'Đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$ có đường tiệm cận ngang là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia cả tử và mẫu cho $x^2$, ta có $\\lim_{x \\to \\pm\\infty} \\dfrac{' + numStr + '}{' + denStr + '} = ' + tcn.latex + '$.',
          'Vậy đồ thị hàm số có đường tiệm cận ngang là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (x^2+4x-3)/(-6x^2-3)', params: { a2: 1, b2: 4, c2: -3, d2: -6, e2: -3 }, expectedValid: true },
      { label: 'Biên lỗi d2 = 0', params: { a2: 1, b2: 2, c2: 3, d2: 0, e2: -3 }, expectedValid: false },
    ],
  },

  // Dạng 3 [MC - Hiểu]: Tiệm cận ngang của hàm chứa căn √(k^2*x^2 + bx + c)/(px + q)
  t12_b3_d03_tcn_sqrt_over_lin_mc: {
    id: 't12_b3_d03_tcn_sqrt_over_lin_mc',
    name: 'Dạng 3: Tìm tiệm cận ngang của hàm chứa căn √(k²x² + bx + c)/(px + q)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận ngang',
    description:
      'Hàm phân thức chứa căn bậc hai ở tử thức có hai tiệm cận ngang đối nhau khi x -> +∞ và x -> -∞.',
    conditionSummary: 'k >= 1, p >= 2, b^2 - 4*k^2*c < 0 để biểu thức trong căn luôn dương',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k (của k^2*x^2)', min: 1, max: 5 },
      { name: 'b', label: 'Hệ số bx trong căn', min: -6, max: 6 },
      { name: 'c', label: 'Hằng số c trong căn', min: 3, max: 10 },
      { name: 'p', label: 'Hệ số px dưới mẫu', min: 2, max: 9 },
      { name: 'q', label: 'Hằng số q dưới mẫu', min: -6, max: 6 },
      { name: 'askNeg', label: 'Hỏi nhánh âm (-1) hay dương (1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { k, b, c, p, askNeg } = params;
      if (k < 1 || p < 2) return { valid: false, reason: 'Cần k >= 1 và p >= 2' };
      if (b * b - 4 * k * k * c >= 0) return { valid: false, reason: 'Cần b^2 - 4*k^2*c < 0 để căn thức xác định trên R' };
      if (askNeg !== 1 && askNeg !== -1) return { valid: false, reason: 'askNeg chỉ nhận -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, b, c, p, q, askNeg } = params;
      const underSqrt = u.formatQuadratic(k * k, b, c);
      const denStr = u.formatLinear(p, q);
      const posLim = u.simplifyFrac(k, p);
      const negLim = u.simplifyFrac(-k, p);
      const target = askNeg === -1 ? negLim : posLim;
      const correct = '$y = ' + target.latex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$y = ' + u.simplifyFrac(b !== 0 ? b : k + 1, p).latex + '$',
          '$y = ' + k + '$',
          '$x = ' + target.latex + '$',
          '$y = ' + u.simplifyFrac(k * k, p).latex + '$',
        ],
        rng,
        (step) => '$y = ' + u.simplifyFrac(target.num + step * 2, p).latex + '$'
      );
      return {
        stem: 'Đồ thị hàm số $y = \\dfrac{\\sqrt{' + underSqrt + '}}{' + denStr + '}$ có một đường tiệm cận ngang là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\lim_{x \\to +\\infty} \\dfrac{\\sqrt{' + underSqrt + '}}{' + denStr + '} = ' + posLim.latex + '$ và $\\lim_{x \\to -\\infty} \\dfrac{\\sqrt{' + underSqrt + '}}{' + denStr + '} = ' + negLim.latex + '$.',
          'Do đó đồ thị hàm số có các đường tiệm cận ngang là $y = ' + posLim.latex + '$ và $y = ' + negLim.latex + '$. Vậy một đường tiệm cận ngang là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc √(4x^2-5x+6)/(7x+3)', params: { k: 2, b: -5, c: 6, p: 7, q: 3, askNeg: -1 }, expectedValid: true },
      { label: 'Biên lỗi biểu thức căn có nghiệm', params: { k: 1, b: 6, c: 2, p: 3, q: 1, askNeg: 1 }, expectedValid: false },
    ],
  },

  // Dạng 4 [MC - Biết]: Tiệm cận đứng của hàm y = (ax + b)/(x - x0)
  t12_b3_d04_tcd_lin_over_xminus_mc: {
    id: 't12_b3_d04_tcd_lin_over_xminus_mc',
    name: 'Dạng 4: Tìm tiệm cận đứng của hàm số y = (ax + b)/(x - x₀)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận đứng',
    description: 'Tìm đường tiệm cận đứng x = x0 của đồ thị hàm phân thức có mẫu x - x0.',
    conditionSummary: 'a != 0, x0 != 0, và a*x0 + b != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -7, max: 7 },
      { name: 'x0', label: 'Nghiệm mẫu x0', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, b, x0 } = params;
      if (a === 0 || x0 === 0) return { valid: false, reason: 'a và x0 phải khác 0' };
      if (a * x0 + b === 0) return { valid: false, reason: 'Tử số triệt tiêu tại x0, không có tiệm cận đứng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0 } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatShift('x', -x0);
      const correct = '$x = ' + x0 + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + (-x0) + '$', '$y = ' + (-x0) + '$', '$y = ' + x0 + '$'],
        rng,
        (k) => '$x = ' + (x0 + k + 1) + '$'
      );
      return {
        stem: 'Tìm đường tiệm cận đứng của đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Nghiệm của mẫu số là $x = ' + x0 + '$ và tử số tại $x = ' + x0 + '$ bằng $' + (a * x0 + b) + ' \\neq 0$.',
          'Đường tiệm cận đứng của đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (-x+5)/(x-4)', params: { a: -1, b: 5, x0: 4 }, expectedValid: true },
      { label: 'Biên lỗi tử triệt tiêu tại x0', params: { a: 2, b: -8, x0: 4 }, expectedValid: false },
    ],
  },

  // Dạng 5 [MC - Biết]: Tiệm cận đứng của hàm y = (ax + b)/(cx + d)
  t12_b3_d05_tcd_lin_over_cx_d_mc: {
    id: 't12_b3_d05_tcd_lin_over_cx_d_mc',
    name: 'Dạng 5: Tìm tiệm cận đứng của hàm số y = (ax + b)/(cx + d)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận đứng',
    description: 'Tìm đường tiệm cận đứng x = -d/c của đồ thị hàm phân thức bậc nhất trên bậc nhất.',
    conditionSummary: 'a != 0, c >= 2, d != 0, ad - bc != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -7, max: 7 },
      { name: 'c', label: 'Hệ số c', min: 2, max: 6 },
      { name: 'd', label: 'Hằng số d', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || c < 2 || d === 0) return { valid: false, reason: 'a != 0, c >= 2, d != 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm hàm suy biến thành hằng số' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const tcd = u.simplifyFrac(-d, c);
      const negTcd = u.simplifyFrac(d, c);
      const tcn = u.simplifyFrac(a, c);
      const negTcn = u.simplifyFrac(-a, c);
      const correct = '$x = ' + tcd.latex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + negTcd.latex + '$', '$y = ' + tcn.latex + '$', '$y = ' + negTcn.latex + '$'],
        rng,
        (k) => '$x = ' + u.simplifyFrac(-d + k * 2, c).latex + '$'
      );
      return {
        stem: 'Tìm đường tiệm cận đứng của đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mẫu số bằng $0 \\Leftrightarrow ' + denStr + ' = 0 \\Leftrightarrow x = ' + tcd.latex + '$. Vì $ad - bc = ' + (a * d - b * c) + ' \\neq 0$ nên đây là đường tiệm cận đứng.',
          'Vậy đường tiệm cận đứng của đồ thị hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (-4x-5)/(3x-1)', params: { a: -4, b: -5, c: 3, d: -1 }, expectedValid: true },
      { label: 'Biên lỗi ad - bc = 0', params: { a: 6, b: -2, c: 3, d: -1 }, expectedValid: false },
    ],
  },

  // Dạng 6 [MC - Hiểu]: Tiệm cận đứng của hàm bậc 2 / bậc 1
  t12_b3_d06_tcd_quad_over_lin_mc: {
    id: 't12_b3_d06_tcd_quad_over_lin_mc',
    name: 'Dạng 6: Tìm tiệm cận đứng của hàm phân thức bậc 2 trên bậc 1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận đứng',
    description:
      'Cho hàm phân thức bậc 2 trên bậc 1 y = ((ax + b)(x - x0) + r)/(x - x0) với phần dư r != 0. Tìm tiệm cận đứng.',
    conditionSummary: 'a != 0, x0 != 0, r != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc hai a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số tự do thương b', min: -7, max: 7 },
      { name: 'x0', label: 'Nghiệm mẫu x0', min: -6, max: 6, allowZero: false },
      { name: 'r', label: 'Phần dư r', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, x0, r } = params;
      if (a === 0 || x0 === 0 || r === 0) return { valid: false, reason: 'a, x0, r phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0, r } = params;
      const B = b - a * x0;
      const C = -b * x0 + r;
      const numStr = u.formatQuadratic(a, B, C);
      const denStr = u.formatShift('x', -x0);
      const quotStr = u.formatLinear(a, b);
      const correct = '$x = ' + x0 + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$x = ' + (-x0) + '$',
          '$x = 1$',
          '$x = ' + u.simplifyFrac(1, a !== 1 && a !== -1 ? Math.abs(a) : 2).latex + '$',
        ],
        rng,
        (k) => '$x = ' + (x0 + k + 2) + '$'
      );
      return {
        stem: 'Tìm đường tiệm cận đứng của đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $y = \\dfrac{' + numStr + '}{' + denStr + '} = ' + quotStr + (r > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(r) + '}{' + denStr + '}$.',
          'Vì $\\lim_{x \\to ' + x0 + '^+} |y| = +\\infty$ nên đường tiệm cận đứng của đồ thị hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (4x^2+9x-31)/(x+4)', params: { a: 4, b: -7, x0: -4, r: -3 }, expectedValid: true },
      { label: 'Biên lỗi phần dư r = 0 (rút gọn được)', params: { a: 4, b: -7, x0: -4, r: 0 }, expectedValid: false },
    ],
  },

  // Dạng 7 [MC - Hiểu]: Đếm số đường tiệm cận đứng của hàm y = √(x^2 + k) / (x^2 + px + q)
  t12_b3_d07_count_tcd_sqrt_over_quad_mc: {
    id: 't12_b3_d07_count_tcd_sqrt_over_quad_mc',
    name: 'Dạng 7: Đếm số tiệm cận đứng của hàm y = √(x² + k)/(x² + px + q)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận đứng',
    description:
      'Xác định số tiệm cận đứng của đồ thị hàm số có tử số luôn dương √(x^2 + k) và mẫu số bậc hai có 1 nghiệm kép hoặc 2 nghiệm phân biệt.',
    conditionSummary: 'k >= 1, nghiệm mẫu phân biệt r1 < r2 (khi mode=2) hoặc kép r1 (khi mode=1)',
    paramSpecs: [
      { name: 'k', label: 'Hằng số k > 0 trong căn', min: 1, max: 9 },
      { name: 'r1', label: 'Nghiệm mẫu thứ nhất r1', min: -4, max: 2 },
      { name: 'r2', label: 'Nghiệm mẫu thứ hai r2', min: 1, max: 6 },
      { name: 'mode', label: 'Số nghiệm mẫu (1: kép, 2: phân biệt)', min: 1, max: 2 },
    ],
    validateCode: `
      const { k, r1, r2, mode } = params;
      if (k < 1) return { valid: false, reason: 'Cần k >= 1 để tử luôn dương' };
      if (mode !== 1 && mode !== 2) return { valid: false, reason: 'mode ∈ {1, 2}' };
      if (mode === 2 && r1 >= r2) return { valid: false, reason: 'Cần r1 < r2 khi có 2 nghiệm phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, r1, r2, mode } = params;
      const b = mode === 1 ? -2 * r1 : -(r1 + r2);
      const c = mode === 1 ? r1 * r1 : r1 * r2;
      const denStr = u.formatQuadratic(1, b, c);
      const ans = mode;
      const correct = '$' + ans + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + (ans === 2 ? 1 : 2) + '$', '$3$', '$4$'],
        rng,
        (step) => '$' + (ans + step + 3) + '$'
      );
      return {
        stem: 'Số đường tiệm cận đứng của đồ thị hàm số $y = \\dfrac{\\sqrt{x^2 + ' + k + '}}{' + denStr + '}$ là:',
        options,
        correctIndex,
        answerSummary: '' + ans,
        solutionSteps: [
          'Tử thức $\\sqrt{x^2 + ' + k + '} > 0$ với mọi $x \\in \\mathbb{R}$.',
          mode === 2
            ? 'Mẫu thức $' + denStr + ' = 0$ có $2$ nghiệm phân biệt $x = ' + r1 + '$ và $x = ' + r2 + '$, nên $\\lim_{x \\to ' + r1 + '^+} |y| = +\\infty$ và $\\lim_{x \\to ' + r2 + '^+} |y| = +\\infty$.'
            : 'Mẫu thức $' + denStr + ' = (x ' + (r1 >= 0 ? '- ' + r1 : '+ ' + Math.abs(r1)) + ')^2 = 0$ có nghiệm duy nhất $x = ' + r1 + '$, nên $\\lim_{x \\to ' + r1 + '} y = +\\infty$.',
          'Vậy đồ thị hàm số có $' + ans + '$ đường tiệm cận đứng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc √(x^2+4)/(x^2-5x)', params: { k: 4, r1: 0, r2: 5, mode: 2 }, expectedValid: true },
      { label: 'Biên lỗi k = 0', params: { k: 0, r1: 0, r2: 5, mode: 2 }, expectedValid: false },
    ],
  },

  // Dạng 8 [MC - Biết]: Tiệm cận đứng của hàm y = (ax + b)/(x0 - x)
  t12_b3_d08_tcd_lin_over_d_minus_x_mc: {
    id: 't12_b3_d08_tcd_lin_over_d_minus_x_mc',
    name: 'Dạng 8: Tìm tiệm cận đứng của hàm số y = (ax + b)/(x₀ - x)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận đứng',
    description: 'Tìm đường tiệm cận đứng x = x0 của đồ thị hàm phân thức có mẫu dạng hằng số trừ x.',
    conditionSummary: 'a != 0, x0 != 0, và a*x0 + b != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -6, max: 6 },
      { name: 'x0', label: 'Nghiệm mẫu x0', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, b, x0 } = params;
      if (a === 0 || x0 === 0) return { valid: false, reason: 'a và x0 phải khác 0' };
      if (a * x0 + b === 0) return { valid: false, reason: 'Tử số bằng 0 tại x0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0 } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = x0 + ' - x';
      const correct = '$x = ' + x0 + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + (-x0) + '$', '$y = ' + (-a) + '$', '$y = ' + (x0 + 1) + '$'],
        rng,
        (k) => '$x = ' + (x0 + k + 2) + '$'
      );
      return {
        stem: 'Tìm đường tiệm cận đứng của đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Giải mẫu số $' + denStr + ' = 0 \\Leftrightarrow x = ' + x0 + '$. Tại $x = ' + x0 + '$ tử số bằng $' + (a * x0 + b) + ' \\neq 0$.',
          'Vậy đường tiệm cận đứng của đồ thị hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (4x-4)/(5-x)', params: { a: 4, b: -4, x0: 5 }, expectedValid: true },
      { label: 'Biên lỗi tử triệt tiêu tại x0', params: { a: 2, b: -10, x0: 5 }, expectedValid: false },
    ],
  },

  // Dạng 9 [MC - Hiểu]: Đếm tổng số đường tiệm cận của hàm y = (b + ax^2)/(cx^2 + d)
  t12_b3_d09_count_asym_quad_over_pos_mc: {
    id: 't12_b3_d09_count_asym_quad_over_pos_mc',
    name: 'Dạng 9: Đếm số đường tiệm cận của đồ thị hàm bậc 2/bậc 2 mẫu vô nghiệm',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Số đường tiệm cận',
    description:
      'Hàm phân thức bậc hai trên bậc hai có mẫu cx^2 + d > 0 với mọi x nên không có tiệm cận đứng và không có tiệm cận xiên, chỉ có 1 TCN.',
    conditionSummary: 'a != 0, c > 0, d > 0, và tử không tỉ lệ với mẫu',
    paramSpecs: [
      { name: 'a', label: 'Hệ số x^2 trên tử', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hằng số b trên tử', min: -6, max: 6 },
      { name: 'c', label: 'Hệ số x^2 dưới mẫu', min: 1, max: 5 },
      { name: 'd', label: 'Hằng số dương d dưới mẫu', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || c <= 0 || d <= 0) return { valid: false, reason: 'Cần a != 0, c > 0, d > 0' };
      if (a * d === b * c) return { valid: false, reason: 'Tử và mẫu tỉ lệ nhau (hàm hằng)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const numStr = b === 0 ? u.formatTerm(a, 'x^2', true) : '' + b + u.formatTerm(a, 'x^2', false);
      const denStr = u.formatQuadratic(c, 0, d);
      const tcn = u.simplifyFrac(a, c);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$1$',
        ['$0$', '$2$', '$3$'],
        rng,
        (k) => '$' + (k + 4) + '$'
      );
      return {
        stem: 'Số đường tiệm cận của đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$ là:',
        options,
        correctIndex,
        answerSummary: '1',
        solutionSteps: [
          'Ta có $\\lim_{x \\to \\pm\\infty} \\dfrac{' + numStr + '}{' + denStr + '} = ' + tcn.latex + '$ nên đồ thị có đúng $1$ tiệm cận ngang $y = ' + tcn.latex + '$.',
          'Vì mẫu số $' + denStr + ' > 0$ với mọi $x \\in \\mathbb{R}$ nên đồ thị không có tiệm cận đứng (và không có tiệm cận xiên). Vậy tổng số đường tiệm cận là $1$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (2-2x^2)/(x^2+4)', params: { a: -2, b: 2, c: 1, d: 4 }, expectedValid: true },
      { label: 'Biên lỗi hàm hằng', params: { a: 2, b: 8, c: 1, d: 4 }, expectedValid: false },
    ],
  },

  // Dạng 10 [MC - Biết]: Tiệm cận ngang từ hai giới hạn ở vô cực
  t12_b3_d10_tcn_from_limits_mc: {
    id: 't12_b3_d10_tcn_from_limits_mc',
    name: 'Dạng 10: Xác định tiệm cận ngang từ giới hạn khi x → ±∞',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận ngang',
    description:
      'Cho hàm số xác định trên R biết lim_{x→-∞} f(x) = L1 và lim_{x→+∞} f(x) = L2 (L1 != L2). Nhận diện hai đường tiệm cận ngang.',
    conditionSummary: 'L1 != L2 nguyên',
    paramSpecs: [
      { name: 'L1', label: 'Giới hạn khi x → -∞', min: -8, max: 8 },
      { name: 'L2', label: 'Giới hạn khi x → +∞', min: -8, max: 8 },
    ],
    validateCode: `
      if (params.L1 === params.L2) return { valid: false, reason: 'Cần L1 != L2 để có 2 TCN phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L1, L2 } = params;
      const correct = 'Đồ thị hàm số có hai tiệm cận ngang là $y = ' + L1 + '$ và $y = ' + L2 + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          'Đồ thị hàm số có $1$ tiệm cận đứng',
          'Đồ thị hàm số không có tiệm cận ngang',
          'Đồ thị hàm số có hai tiệm cận đứng là $x = ' + L1 + '$ và $x = ' + L2 + '$',
        ],
        rng,
        (k) => 'Đồ thị hàm số có một tiệm cận ngang là $y = ' + (L1 + k) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ có $\\lim_{x \\to -\\infty} f(x) = ' +
          L1 +
          '$ và $\\lim_{x \\to +\\infty} f(x) = ' +
          L2 +
          '$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: 'y = ' + L1 + ' và y = ' + L2,
        solutionSteps: [
          'Từ $\\lim_{x \\to -\\infty} f(x) = ' + L1 + '$ suy ra đồ thị hàm số có tiệm cận ngang là $y = ' + L1 + '$.',
          'Từ $\\lim_{x \\to +\\infty} f(x) = ' + L2 + '$ suy ra đồ thị hàm số có tiệm cận ngang là $y = ' + L2 + '$.',
          'Vậy đồ thị hàm số có hai đường tiệm cận ngang là $y = ' + L1 + '$ và $y = ' + L2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc L1=4, L2=6', params: { L1: 4, L2: 6 }, expectedValid: true },
      { label: 'Biên lỗi L1 = L2', params: { L1: 3, L2: 3 }, expectedValid: false },
    ],
  },

  // Dạng 11 [MC - Biết]: Đếm số tiệm cận đứng từ bảng biến thiên
  t12_b3_d11_count_tcd_from_bbt_mc: {
    id: 't12_b3_d11_count_tcd_from_bbt_mc',
    name: 'Dạng 11: Tìm số đường tiệm cận đứng từ bảng biến thiên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận đứng',
    description:
      'Cho bảng biến thiên của hàm số y = f(x) có điểm gián đoạn. Đọc giới hạn trái/phải để xác định số đường tiệm cận đứng.',
    conditionSummary: 'x1 < x2 < x3, asymMode ∈ {1, 2}',
    paramSpecs: [
      { name: 'x1', label: 'Điểm cực đại x1', min: -6, max: -2 },
      { name: 'x2', label: 'Điểm gián đoạn x2', min: -1, max: 2 },
      { name: 'x3', label: 'Điểm cực tiểu x3', min: 3, max: 7 },
      { name: 'yInfL', label: 'Giới hạn tại -∞', min: -12, max: -5 },
      { name: 'yMax', label: 'Giá trị cực đại', min: -4, max: 2 },
      { name: 'yRight', label: 'Giới hạn phải tại x2', min: 0, max: 4 },
      { name: 'yMin', label: 'Giá trị cực tiểu', min: -10, max: -4 },
      { name: 'asymMode', label: 'Số điểm gián đoạn là TCĐ (1 hoặc 2)', min: 1, max: 2 },
    ],
    validateCode: `
      const { x1, x2, x3, yInfL, yMax, yRight, yMin, asymMode } = params;
      if (!(x1 < x2 && x2 < x3)) return { valid: false, reason: 'Cần x1 < x2 < x3' };
      if (!(yInfL < yMax && yRight > yMin)) return { valid: false, reason: 'Cần yInfL < yMax và yRight > yMin' };
      if (asymMode !== 1 && asymMode !== 2) return { valid: false, reason: 'asymMode ∈ {1, 2}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, x3, yInfL, yMax, yRight, yMin, asymMode } = params;
      const rightNode =
        asymMode === 1
          ? { kind: 'asymptote', leftPos: 'bot', leftVal: '-\\infty', rightPos: 'top', rightVal: '' + yRight }
          : { kind: 'asymptote', leftPos: 'bot', leftVal: '-\\infty', rightPos: 'top', rightVal: '+\\infty' };
      // If asymMode === 2, make x3 also asymptote? No, keep x2 single vs double discontinuity:
      // Actually in Q11, x2 has 1 asymptote (-inf | yRight), or if asymMode === 2, let's put an asymptote at x2 (-inf | +inf) AND at x3? No, x2 alone gives 1 vertical asymptote x=x2 even if both sides are inf!
      // To vary the answer between 1 and 2, when asymMode === 2 make x2 asymptote (-inf | yRight) AND x3 asymptote (-inf | +inf) with decreasing->increasing!
      const isTwo = asymMode === 2;
      const yNodes = isTwo
        ? [
            { kind: 'single', pos: 'bot', value: '' + yInfL },
            { kind: 'single', pos: 'top', value: '' + yMax },
            { kind: 'asymptote', leftPos: 'bot', leftVal: '-\\infty', rightPos: 'top', rightVal: '' + yRight },
            { kind: 'asymptote', leftPos: 'bot', leftVal: '-\\infty', rightPos: 'top', rightVal: '+\\infty' },
            { kind: 'single', pos: 'bot', value: '' + yMin },
          ]
        : [
            { kind: 'single', pos: 'bot', value: '' + yInfL },
            { kind: 'single', pos: 'top', value: '' + yMax },
            rightNode,
            { kind: 'single', pos: 'bot', value: '' + yMin },
            { kind: 'single', pos: 'top', value: '+\\infty' },
          ];
      const derivTokens = isTwo
        ? [
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: '-' },
          ]
        : [
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ];

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + asymMode + '$',
        ['$' + (asymMode === 1 ? 2 : 1) + '$', '$3$', '$4$'],
        rng,
        (k) => '$' + (k + 4) + '$'
      );
      return {
        stem: 'Cho hàm số $y = f(x)$ có bảng biến thiên như hình vẽ sau. Tìm số đường tiệm cận đứng của đồ thị hàm số $y = f(x)$.',
        diagram: {
          kind: 'variation_table',
          derivLabel: "f'(x)",
          funcLabel: 'f(x)',
          xNodes: ['-\\infty', '' + x1, '' + x2, '' + x3, '+\\infty'],
          derivTokens,
          yNodes,
        },
        options,
        correctIndex,
        answerSummary: '' + asymMode,
        solutionSteps: [
          isTwo
            ? 'Quan sát bảng biến thiên, tại $x = ' + x2 + '$ có $\\lim_{x \\to ' + x2 + '^-} f(x) = -\\infty$ và tại $x = ' + x3 + '$ có $\\lim_{x \\to ' + x3 + '^-} f(x) = -\\infty$.'
            : 'Quan sát bảng biến thiên, chỉ tại $x = ' + x2 + '$ có $\\lim_{x \\to ' + x2 + '^-} f(x) = -\\infty$.',
          'Vậy số đường tiệm cận đứng của đồ thị hàm số $y = f(x)$ là $' + asymMode + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (1 TCĐ tại x=0)',
        params: { x1: -4, x2: 0, x3: 5, yInfL: -10, yMax: -2, yRight: 1, yMin: -8, asymMode: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi x1 >= x2',
        params: { x1: 0, x2: 0, x3: 5, yInfL: -10, yMax: -2, yRight: 1, yMin: -8, asymMode: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 12 [MC - Biết]: Đọc tiệm cận đứng từ đồ thị hàm số y = (ax + b)/(cx + d)
  t12_b3_d12_tcd_from_graph_mc: {
    id: 't12_b3_d12_tcd_from_graph_mc',
    name: 'Dạng 12: Đọc đường tiệm cận đứng từ đồ thị hàm số (ax + b)/(cx + d)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận đứng — Đồ thị',
    description:
      'Cho đồ thị hàm phân thức bậc nhất trên bậc nhất y = (ax + b)/(cx + d). Xác định phương trình đường tiệm cận đứng từ hình vẽ.',
    conditionSummary: 'c = -2 hoặc 2, x0 = -d/c != a/c (không trùng TCĐ và TCN), ad - bc != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -2, max: 2, step: 4, allowZero: false },
      { name: 'd', label: 'Hằng số d', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 suy biến thành hàm hằng' };
      const x0 = -d / c;
      const y0 = a / c;
      if (Math.abs(x0) > 4 || Math.abs(y0) > 4) return { valid: false, reason: 'Tiệm cận nằm ngoài khung đồ thị chuẩn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const tcd = u.simplifyFrac(-d, c);
      const negTcd = u.simplifyFrac(d, c);
      const tcn = u.simplifyFrac(a, c);
      const negTcn = u.simplifyFrac(-a, c);
      const correct = '$x = ' + tcd.latex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + negTcd.latex + '$', '$y = ' + tcn.latex + '$', '$y = ' + negTcn.latex + '$'],
        rng,
        (k) => '$x = ' + u.simplifyFrac(-d + k * 2, c).latex + '$'
      );
      return {
        stem:
          'Cho hàm số $y = \\dfrac{ax + b}{cx + d}\\; (a, b, c, d \\in \\mathbb{R})$ có đồ thị là đường cong như hình dưới đây. Đồ thị hàm số đã cho có đường tiệm cận đứng là:',
        diagram: {
          kind: 'function_plot',
          curveType: 'rational_2_1',
          coeffs: [0, a, b, c, d],
          xMin: -7,
          xMax: 7,
          yMin: -7,
          yMax: 7,
          xTicks: [-6, -4, -2, 2, 4, 6],
          yTicks: [-6, -4, -2, 2, 4, 6],
          strokeColor: '#0f172a',
          verticalAsymptote: tcd.value,
          obliqueAsymptote: { m: 0, q: tcn.value },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Quan sát đồ thị ta thấy đường thẳng đứng nét đứt mà đồ thị tiệm cận tới đi qua điểm $x = ' + tcd.latex + '$ trên trục hoành.',
          'Vậy đường tiệm cận đứng của đồ thị hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (3x-3)/(-2x-3)', params: { a: 3, b: -3, c: -2, d: -3 }, expectedValid: true },
      { label: 'Biên lỗi c = 0', params: { a: 3, b: -3, c: 0, d: -3 }, expectedValid: false },
    ],
  },

  // Dạng 13 [MC - Biết]: Tiệm cận xiên dạng y = ax + b + r/(px + q)
  t12_b3_d13_tcx_explicit_mc: {
    id: 't12_b3_d13_tcx_explicit_mc',
    name: 'Dạng 13: Tìm đường tiệm cận xiên của hàm số dạng y = ax + b + r/(px + q)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận xiên',
    description: 'Nhận diện ngay đường tiệm cận xiên y = ax + b từ biểu thức đã tách sẵn phần phân thức.',
    conditionSummary: 'a != 0, b != 0, r != 0, p != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Tung độ gốc b', min: -7, max: 7, allowZero: false },
      { name: 'r', label: 'Tử số r', min: -7, max: 7, allowZero: false },
      { name: 'p', label: 'Hệ số p của x ở mẫu', min: -3, max: 3, allowZero: false },
      { name: 'q', label: 'Hằng số q ở mẫu', min: 1, max: 6 },
    ],
    validateCode: `
      const { a, b, r, p } = params;
      if (a === 0 || b === 0 || r === 0 || p === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, r, p, q } = params;
      const lineStr = u.formatLinear(a, b);
      const denStr = p < 0 ? q + ' - ' + (Math.abs(p) === 1 ? '' : Math.abs(p)) + 'x' : u.formatLinear(p, q);
      const fracSign = r > 0 ? ' + ' : ' - ';
      const exprStr = lineStr + fracSign + '\\dfrac{' + Math.abs(r) + '}{' + denStr + '}';
      const correct = '$y = ' + lineStr + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$y = ' + u.formatLinear(-a, -b) + '$',
          '$y = ' + u.formatTerm(a, 'x', true) + '$',
          '$y = ' + q + '$',
        ],
        rng,
        (k) => '$y = ' + u.formatLinear(a, b + k) + '$'
      );
      return {
        stem: 'Đường tiệm cận xiên của đồ thị hàm số $y = ' + exprStr + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\lim_{x \\to \\pm\\infty} [y - (' + lineStr + ')] = \\lim_{x \\to \\pm\\infty} ' + (r > 0 ? '' : '-') + '\\dfrac{' + Math.abs(r) + '}{' + denStr + '} = 0$.',
          'Vậy đường tiệm cận xiên của đồ thị hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc y = -3x - 4 - 5/(1 - x)', params: { a: -3, b: -4, r: -5, p: -1, q: 1 }, expectedValid: true },
      { label: 'Biên lỗi a = 0 (không phải tiệm cận xiên)', params: { a: 0, b: -4, r: -5, p: -1, q: 1 }, expectedValid: false },
    ],
  },

  // Dạng 14 [MC - Hiểu]: Tiệm cận xiên của hàm bậc 2 / bậc 1
  t12_b3_d14_tcx_quad_over_lin_mc: {
    id: 't12_b3_d14_tcx_quad_over_lin_mc',
    name: 'Dạng 14: Tìm đường tiệm cận xiên của hàm phân thức bậc 2 trên bậc 1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận xiên',
    description:
      'Chia đa thức tử cho mẫu để tìm đường tiệm cận xiên y = ax + b của hàm số y = ((ax + b)(px + q) + r)/(px + q).',
    conditionSummary: 'a != 0, p != 0, r != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Tung độ gốc b', min: -5, max: 5 },
      { name: 'p', label: 'Hệ số p của x ở mẫu', min: -3, max: 3, allowZero: false },
      { name: 'q', label: 'Hằng số q ở mẫu', min: -5, max: 5, allowZero: false },
      { name: 'r', label: 'Phần dư r', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, p, q, r } = params;
      if (a === 0 || p === 0 || q === 0 || r === 0) return { valid: false, reason: 'Các hệ số chính phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, p, q, r } = params;
      const A = a * p;
      const B = a * q + b * p;
      const C = b * q + r;
      const numStr = u.formatQuadratic(A, B, C);
      const denStr = u.formatLinear(p, q);
      const tcxStr = u.formatLinear(a, b);
      const correct = '$y = ' + tcxStr + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$y = ' + u.formatLinear(a, b - 3) + '$',
          '$y = ' + u.formatLinear(-p, -q) + '$',
          '$y = ' + u.formatLinear(p, q) + '$',
        ],
        rng,
        (k) => '$y = ' + u.formatLinear(a, b + k) + '$'
      );
      return {
        stem: 'Tìm đường tiệm cận xiên của đồ thị hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia tử cho mẫu, ta được $y = \\dfrac{' + numStr + '}{' + denStr + '} = ' + tcxStr + (r > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(r) + '}{' + denStr + '}$.',
          'Ta có $\\lim_{x \\to +\\infty} [y - (' + tcxStr + ')] = 0$, nên đường tiệm cận xiên của đồ thị hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (4x^2+8x-2)/(-x-2)', params: { a: -4, b: 0, p: -1, q: -2, r: -2 }, expectedValid: true },
      { label: 'Biên lỗi r = 0', params: { a: -4, b: 1, p: -1, q: -2, r: 0 }, expectedValid: false },
    ],
  },

  // Dạng 15 [MC - Biết]: Điểm thuộc đường tiệm cận xiên
  t12_b3_d15_point_on_tcx_mc: {
    id: 't12_b3_d15_point_on_tcx_mc',
    name: 'Dạng 15: Tìm điểm thuộc đường tiệm cận xiên của đồ thị hàm số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận xiên',
    description: 'Xác định tiệm cận xiên y = ax + b rồi kiểm tra điểm (xP; a*xP + b) thuộc đường thẳng đó.',
    conditionSummary: 'a != 0, r != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Tung độ gốc b', min: -6, max: 6 },
      { name: 'r', label: 'Tử số phân thức dư r', min: 1, max: 7 },
      { name: 'd', label: 'Hằng số mẫu x + d', min: -5, max: 5, allowZero: false },
      { name: 'xP', label: 'Hoành độ điểm xP', min: -3, max: 5 },
    ],
    validateCode: `
      const { a, r, d } = params;
      if (a === 0 || r === 0 || d === 0) return { valid: false, reason: 'a, r, d phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, r, d, xP } = params;
      const tcxStr = u.formatLinear(a, b);
      const denStr = u.formatShift('x', d);
      const yP = a * xP + b;
      const correct = '$(' + xP + ';\\, ' + yP + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + (xP + 1) + ';\\, ' + yP + ')$',
          '$(' + (xP + 2) + ';\\, ' + yP + ')$',
          '$(' + xP + ';\\, ' + (yP + 1) + ')$',
        ],
        rng,
        (k) => '$(' + xP + ';\\, ' + (yP - k - 1) + ')$'
      );
      return {
        stem:
          'Điểm nào dưới đây thuộc đường tiệm cận xiên của đồ thị hàm số $y = ' +
          tcxStr +
          ' + \\dfrac{' +
          r +
          '}{' +
          denStr +
          '}$?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\lim_{x \\to \\pm\\infty} [y - (' + tcxStr + ')] = 0$ nên đường tiệm cận xiên là $y = ' + tcxStr + '$.',
          'Thay $x = ' + xP + '$ vào phương trình tiệm cận xiên, ta được $y = ' + yP + '$. Vậy điểm thuộc đường tiệm cận xiên là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc y=-x-3+3/(x+2), điểm (2;-5)', params: { a: -1, b: -3, r: 3, d: 2, xP: 2 }, expectedValid: true },
      { label: 'Biên lỗi a = 0', params: { a: 0, b: -3, r: 3, d: 2, xP: 2 }, expectedValid: false },
    ],
  },

  // Dạng 16 [MC - Biết]: Từ tiệm cận xiên y = ax + b suy ra khẳng định giới hạn
  t12_b3_d16_tcx_to_limit_mc: {
    id: 't12_b3_d16_tcx_to_limit_mc',
    name: 'Dạng 16: Khẳng định giới hạn tương đương của đường tiệm cận xiên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận xiên — Định nghĩa',
    description:
      'Cho hàm số y = f(x) có đường tiệm cận xiên y = ax + b. Nhận diện đúng biểu thức lim_{x→+∞} [f(x) - (ax + b)] = 0.',
    conditionSummary: 'a != 0, b != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Tung độ gốc b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lineStr = u.formatLinear(a, b);
      // f(x) - (ax + b) = f(x) - ax - b
      const negAx = u.formatTerm(-a, 'x', false);
      const negB = u.formatTrailingConst(-b);
      const posAx = u.formatTerm(a, 'x', false);
      const posB = u.formatTrailingConst(b);
      const diffTrue = 'f(x)' + negAx + negB;
      const diffWrong = 'f(x)' + posAx + posB;
      const correct = '$\\lim_{x \\to +\\infty} [' + diffTrue + '] = 0$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$\\lim_{x \\to ' + Math.abs(a) + '} [' + diffWrong + '] = +\\infty$',
          '$\\lim_{x \\to -\\infty} [' + diffTrue + '] = -\\infty$',
          '$\\lim_{x \\to +\\infty} [' + diffTrue + '] = ' + Math.abs(a) + '$',
        ],
        rng,
        (k) => '$\\lim_{x \\to +\\infty} [' + diffTrue + '] = ' + (k + 2) + '$'
      );
      return {
        stem: 'Cho hàm số $y = f(x)$ có đường tiệm cận xiên là $y = ' + lineStr + '$. Tìm khẳng định đúng:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo định nghĩa, đường thẳng $y = ' + lineStr + '$ là tiệm cận xiên của đồ thị hàm số $y = f(x)$ khi $\\lim_{x \\to +\\infty} [f(x) - (' + lineStr + ')] = 0$ hoặc $\\lim_{x \\to -\\infty} [f(x) - (' + lineStr + ')] = 0$.',
          'Khai triển ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc y = 2x - 9', params: { a: 2, b: -9 }, expectedValid: true },
      { label: 'Biên lỗi a = 0', params: { a: 0, b: -9 }, expectedValid: false },
    ],
  },

  // Dạng 17 [MC - Biết]: Từ giới hạn lim_{x→-∞} [f(x) - ax - b] = 0 tìm tiệm cận xiên
  t12_b3_d17_limit_to_tcx_mc: {
    id: 't12_b3_d17_limit_to_tcx_mc',
    name: 'Dạng 17: Tìm phương trình tiệm cận xiên từ điều kiện giới hạn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tiệm cận xiên — Định nghĩa',
    description:
      'Cho hàm số y = f(x) thỏa mãn lim_{x→-∞} [f(x) - ax - b] = 0. Suy ra phương trình tiệm cận xiên y = ax + b.',
    conditionSummary: 'a != 0, b != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Tung độ gốc b', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const lineStr = u.formatLinear(a, b);
      const negLine = 'f(x)' + u.formatTerm(-a, 'x', false) + u.formatTrailingConst(-b);
      const correct = 'Đường tiệm cận xiên của đồ thị hàm số $y = f(x)$ là $y = ' + lineStr + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          'Đường tiệm cận xiên của đồ thị hàm số $y = f(x)$ là $y = ' + u.formatLinear(a, -b) + '$',
          'Đường tiệm cận ngang của đồ thị hàm số $y = f(x)$ là $y = ' + b + '$',
          'Đường tiệm cận đứng của đồ thị hàm số $y = f(x)$ là $x = ' + a + '$',
        ],
        rng,
        (k) => 'Đường tiệm cận xiên của đồ thị hàm số $y = f(x)$ là $y = ' + u.formatLinear(a, b + k) + '$'
      );
      return {
        stem: 'Cho hàm số $y = f(x)$ có $\\lim_{x \\to -\\infty} [' + negLine + '] = 0$. Tìm khẳng định đúng:',
        options,
        correctIndex,
        answerSummary: 'y = ' + lineStr,
        solutionSteps: [
          'Ta có $\\lim_{x \\to -\\infty} [' + negLine + '] = \\lim_{x \\to -\\infty} [f(x) - (' + lineStr + ')] = 0$.',
          'Theo định nghĩa, đường tiệm cận xiên của đồ thị hàm số là $y = ' + lineStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc lim[f(x)-5x+8]=0', params: { a: 5, b: -8 }, expectedValid: true },
      { label: 'Biên lỗi a = 0', params: { a: 0, b: -8 }, expectedValid: false },
    ],
  },
};
