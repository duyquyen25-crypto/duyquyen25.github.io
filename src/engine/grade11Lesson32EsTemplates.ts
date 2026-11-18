import { MathTemplate } from '../types/math';

export const G11_B32_ES_TEMPLATES: Record<string, MathTemplate> = {
  // Q91: Viết phương trình tiếp tuyến parabol biết hệ số góc k (Tự luận)
  t11_b32_d91_quad_tangent_slope_k_es: {
    id: 't11_b32_d91_quad_tangent_slope_k_es',
    name: 'Viết phương trình tiếp tuyến parabol biết hệ số góc k (Tự luận)',
    category: 'ES',
    level: 'Biết',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho parabol y = ax² + bx + c. Viết phương trình tiếp tuyến biết hệ số góc k.',
    conditionSummary: 'a ∈ [-5; 5] \\ {0}, x₀ ∈ [-4; 4] \\ {0}, k = 2ax₀ + b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ tiếp điểm x₀', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, x0 } = params;
      if (a === 0 || b === 0 || c === 0 || x0 === 0) return { valid: false, reason: 'Các tham số khác 0' };
      if (2 * a * x0 + b === 0) return { valid: false, reason: 'Hệ số góc k = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0 } = params;
      const fx = u.formatPoly([a, b, c]);
      const fprime = u.formatLinear(2 * a, b);
      const k = 2 * a * x0 + b;
      const y0 = a * x0 * x0 + b * x0 + c;
      const bLine = y0 - k * x0;
      const tangentLine = 'y=' + u.formatLinear(k, bLine);

      return {
        stem: 'Cho hàm số $y=' + fx + '$. Viết phương trình tiếp tuyến của đồ thị hàm số đã cho biết tiếp tuyến có hệ số góc $k=' + k + '$.',
        rubric: [
          { description: "Tính đạo hàm y' = " + fprime + ' và giải y\' = ' + k + ' tìm được x₀ = ' + x0, points: 0.4 },
          { description: 'Tính tung độ tiếp điểm y₀ = f(' + x0 + ') = ' + y0, points: 0.2 },
          { description: 'Viết đúng phương trình tiếp tuyến ' + tangentLine, points: 0.4 },
        ],
        answerSummary: '$' + tangentLine + '$',
        solutionSteps: [
          "Xét phương trình $y'=" + k + '\\Leftrightarrow ' + fprime + '=' + k + ' \\Rightarrow x=' + x0 + '$.',
          'Với $x=' + x0 + ' \\Rightarrow y=f(' + x0 + ')=' + y0 + '$.',
          'Phương trình tiếp tuyến là: $y=' + k + '(x' + (x0 >= 0 ? '-' + x0 : '+' + Math.abs(x0)) + ')' + u.formatTrailingConst(y0) + ' \\Leftrightarrow ' + tangentLine + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 2, c: 1, x0: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q91 (-2x²+2x+1, k=6 -> y=6x+3)', params: { a: -2, b: 2, c: 1, x0: -1 }, expectedValid: true },
    ],
  },

  // Q92: Viết phương trình tiếp tuyến hàm bậc 3 biết hệ số góc k (Tự luận)
  t11_b32_d92_cubic_tangent_slope_k_es: {
    id: 't11_b32_d92_cubic_tangent_slope_k_es',
    name: 'Viết các phương trình tiếp tuyến hàm bậc ba biết hệ số góc k (Tự luận)',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho y = x³/3 + (b/2)x² + cx. Viết các phương trình tiếp tuyến biết hệ số góc k.',
    conditionSummary: 'x₁ < x₂ nguyên, k ≠ 0',
    paramSpecs: [
      { name: 'x1', label: 'Hoành độ tiếp điểm x₁', min: -3, max: 3 },
      { name: 'x2', label: 'Hoành độ tiếp điểm x₂', min: -1, max: 5 },
      { name: 'k', label: 'Hệ số góc k', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { x1, x2, k } = params;
      if (x1 >= x2 || k === 0) return { valid: false, reason: 'Yêu cầu x₁ < x₂ và k ≠ 0' };
      const bCoef = -(x1 + x2);
      const cCoef = k + x1 * x2;
      if (bCoef === 0 || cCoef === 0) return { valid: false, reason: 'Tránh triệt tiêu hệ số' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, k } = params;
      const bCoef = -(x1 + x2);
      const cCoef = k + x1 * x2;
      const b2Fr = u.simplifyFrac(bCoef, 2);
      const term2 = b2Fr.den === 1 ? u.formatTerm(b2Fr.num, 'x^{2}', false) : (bCoef < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(bCoef) + ' x^{2}}{2}';
      const fx = '\\frac{x^{3}}{3}' + term2 + u.formatTerm(cCoef, 'x', false);
      const eqPoly = u.formatPoly([1, bCoef, x1 * x2]);

      const y1Fr = u.simplifyFrac(2 * Math.pow(x1, 3) + 3 * bCoef * x1 * x1 + 6 * cCoef * x1, 6);
      const y2Fr = u.simplifyFrac(2 * Math.pow(x2, 3) + 3 * bCoef * x2 * x2 + 6 * cCoef * x2, 6);
      const b1Fr = u.simplifyFrac(2 * Math.pow(x1, 3) + 3 * bCoef * x1 * x1 + 6 * x1 * x1 * x2, 6);
      const b2Fr2 = u.simplifyFrac(2 * Math.pow(x2, 3) + 3 * bCoef * x2 * x2 + 6 * x1 * x2 * x2, 6);

      const fmtLine = (slope, bFr) => {
        const sPart = u.formatTerm(slope, 'x', true);
        if (bFr.num === 0) return 'y=' + sPart;
        return 'y=' + sPart + (bFr.num < 0 ? ' - ' : ' + ') + (bFr.den === 1 ? Math.abs(bFr.num) : '\\frac{' + Math.abs(bFr.num) + '}{' + bFr.den + '}');
      };
      const line1 = fmtLine(k, b1Fr);
      const line2 = fmtLine(k, b2Fr2);

      return {
        stem: 'Cho hàm số $y=' + fx + '$. Viết phương trình tiếp tuyến của đồ thị hàm số đã cho biết tiếp tuyến có hệ số góc $k=' + k + '$.',
        rubric: [
          { description: "Tính y' và giải phương trình y' = " + k + ' được x₁ = ' + x1 + ', x₂ = ' + x2, points: 0.3 },
          { description: 'Tìm tiếp điểm thứ nhất và viết đúng phương trình ' + line1, points: 0.35 },
          { description: 'Tìm tiếp điểm thứ hai và viết đúng phương trình ' + line2, points: 0.35 },
        ],
        answerSummary: '$' + line1 + '$ và $' + line2 + '$',
        solutionSteps: [
          "Xét phương trình $y'=" + k + '\\Leftrightarrow ' + eqPoly + '=0 \\Rightarrow x=' + x1 + ',\\; x=' + x2 + '$.',
          'Với $x=' + x1 + '\\Rightarrow y=f(' + x1 + ')=' + y1Fr.latex + '$. Phương trình tiếp tuyến là: $' + line1 + '$.',
          'Với $x=' + x2 + '\\Rightarrow y=f(' + x2 + ')=' + y2Fr.latex + '$. Phương trình tiếp tuyến là: $' + line2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 >= x2', params: { x1: 2, x2: 1, k: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q92 (x³/3 - 3/2 x² + 7x, k=5)', params: { x1: 1, x2: 2, k: 5 }, expectedValid: true },
    ],
  },

  // Q93: Viết phương trình tiếp tuyến hàm nhất biến biết hệ số góc k (Tự luận)
  t11_b32_d93_homographic_tangent_slope_k_es: {
    id: 't11_b32_d93_homographic_tangent_slope_k_es',
    name: 'Viết các phương trình tiếp tuyến hàm nhất biến biết hệ số góc k (Tự luận)',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho y = (ax + b)/(cx + d). Viết các phương trình tiếp tuyến biết hệ số góc k.',
    conditionSummary: 'c ∈ {-1, 1}, s ∈ [1; 3], k ∈ [-6; 6] \\ {0}, ad - bc = k·s²',
    paramSpecs: [
      { name: 'cSign', label: 'c ∈ {-1, 1}', min: 0, max: 1 },
      { name: 'd', label: 'Hệ số d', min: -5, max: 5, allowZero: false },
      { name: 's', label: 'Giá trị s = |cx + d|', min: 1, max: 3 },
      { name: 'k', label: 'Hệ số góc k', min: -6, max: 6, allowZero: false },
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { cSign, d, s, k, a } = params;
      if (d === 0 || s < 1 || s > 3 || k === 0 || a === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const c = cSign === 0 ? -1 : 1;
      const det = k * s * s;
      const b = (a * d - det) / c;
      if (b === 0) return { valid: false, reason: 'b ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { cSign, d, s, k, a } = params;
      const c = cSign === 0 ? -1 : 1;
      const det = k * s * s;
      const b = (a * d - det) / c;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const x1 = (s - d) / c;
      const x2 = (-s - d) / c;
      const y1 = (a * x1 + b) / (c * x1 + d);
      const y2 = (a * x2 + b) / (c * x2 + d);
      const b1 = y1 - k * x1;
      const b2 = y2 - k * x2;
      const line1 = 'y=' + u.formatLinear(k, b1);
      const line2 = 'y=' + u.formatLinear(k, b2);

      return {
        stem: 'Cho hàm số $y=\\dfrac{' + numStr + '}{' + denStr + '}$. Viết phương trình tiếp tuyến của đồ thị hàm số đã cho biết tiếp tuyến có hệ số góc $k=' + k + '$.',
        rubric: [
          { description: "Tính y' = " + det + '/(' + denStr + ')² và giải y\' = ' + k + ' được x = ' + x1 + ', x = ' + x2, points: 0.4 },
          { description: 'Lập đúng tiếp tuyến tại x = ' + x1 + ': ' + line1, points: 0.3 },
          { description: 'Lập đúng tiếp tuyến tại x = ' + x2 + ': ' + line2, points: 0.3 },
        ],
        answerSummary: '$' + line1 + '$ và $' + line2 + '$',
        solutionSteps: [
          "Xét phương trình $y'=" + k + '\\Leftrightarrow \\dfrac{' + det + '}{(' + denStr + ')^2}=' + k + '\\Leftrightarrow (' + denStr + ')^2=' + (s * s) + '\\Rightarrow x=' + x1 + ',\\; x=' + x2 + '$.',
          'Với $x=' + x1 + '\\Rightarrow y=f(' + x1 + ')=' + y1 + '$. Phương trình tiếp tuyến là: $' + line1 + '$.',
          'Với $x=' + x2 + '\\Rightarrow y=f(' + x2 + ')=' + y2 + '$. Phương trình tiếp tuyến là: $' + line2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { cSign: 1, d: -3, s: 1, k: 0, a: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q93 ((2x-1)/(x-3), k=-5 -> y=-5x+27 và y=-5x+7)', params: { cSign: 1, d: -3, s: 1, k: -5, a: 2 }, expectedValid: true },
    ],
  },
};
