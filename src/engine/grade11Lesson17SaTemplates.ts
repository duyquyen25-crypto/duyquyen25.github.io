import { MathTemplate } from '../types/math';

export const G11_B17_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D21 (Q21): Tìm tham số m để hàm phân thức 0/0 rẽ nhánh liên tục tại x0 (Trả lời ngắn)
  t11_b17_d21_sa_find_m_00_rational: {
    id: 't11_b17_d21_sa_find_m_00_rational',
    name: 'Tìm tham số m để hàm số chứa phân thức 0/0 liên tục tại điểm x0 (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Tìm m để f(x) = a(x-x0)(x-r)/(k(x-x0)) (x ≠ x0) và cmx + d (x = x0) liên tục tại x0, làm tròn hàng phần mười.',
    conditionSummary: 'x0 ∈ [-4; 4]\\{0}, r ∈ [-4; 4]\\{x0}, a ∈ [1; 3], k ∈ [-4; -2], c ∈ [2; 5], d ∈ [-5; -1], tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm xét liên tục x0', min: -4, max: 4, allowZero: false },
      { name: 'r', label: 'Nghiệm thứ hai của tử', min: -4, max: 4 },
      { name: 'a', label: 'Hệ số x^2 ở tử', min: 1, max: 3 },
      { name: 'k', label: 'Hệ số x ở mẫu', min: -4, max: -2 },
      { name: 'c', label: 'Hệ số của mx tại x = x0', min: 2, max: 5 },
      { name: 'd', label: 'Hằng số tại x = x0', min: -5, max: -1 },
    ],
    validateCode: `
      const { x0, r, a, k, c, d } = params;
      if (x0 === 0 || r === x0 || a < 1 || k >= 0 || c < 2 || d >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const numM = a * (x0 - r) - d * k;
      const denM = k * c * x0;
      if (numM === 0) return { valid: false, reason: 'Tránh m = 0' };
      const absN = Math.abs(numM), absD = Math.abs(denM);
      if ((20 * absN) % (2 * absD) === absD) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r, a, k, c, d } = params;
      const numPoly = u.formatQuadratic(a, -a * (x0 + r), a * x0 * r);
      const denPoly = u.formatLinear(k, -k * x0);
      const branch2 = c + 'mx ' + u.formatTrailingConst(d);

      const limF = u.simplifyFrac(a * (x0 - r), k);
      const fx0 = u.formatLinear(c * x0, d, 'm');
      const mF = u.simplifyFrac(a * (x0 - r) - d * k, k * c * x0);
      const val = mF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tìm giá trị của tham số $m$ để hàm số $f(x) = \\begin{cases} \\dfrac{' + numPoly + '}{' + denPoly + '} & \\text{khi } x \\ne ' + x0 + ' \\\\ ' + branch2 + ' & \\text{khi } x = ' + x0 + ' \\end{cases}$ liên tục tại $x = ' + x0 + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $\\lim \\limits_{x \\to ' + x0 + '} f(x) = \\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + u.formatLinear(a, -a * r) + '}{' + k + '} = ' + limF.latex + '$ và $f(' + x0 + ') = ' + fx0 + '$.',
          'Hàm số liên tục tại $x = ' + x0 + ' \\Leftrightarrow ' + fx0 + ' = ' + limF.latex + ' \\Leftrightarrow m = ' + mF.latex + (mF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = x0', params: { x0: -3, r: -3, a: 2, k: -3, c: 4, d: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (x0=-3 -> -17/36 ≈ -0,5)', params: { x0: -3, r: 1, a: 2, k: -3, c: 4, d: -3 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Tìm m để hàm bậc 3 (x ≥ x0) & bậc 2 chứa m (x < x0) liên tục tại x0 (Trả lời ngắn)
  t11_b17_d22_sa_find_m_cubic_at_x0: {
    id: 't11_b17_d22_sa_find_m_cubic_at_x0',
    name: 'Tìm tham số m để hàm bậc ba và hàm bậc hai liên tục tại điểm x0 (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Tìm m để hàm số 2 nhánh (ax^3 + bx + c khi x ≥ x0; (p - km)x^2 + d khi x < x0) liên tục tại x0.',
    conditionSummary: 'x0 ∈ [2; 5], a ∈ [-4; -1], b ∈ [1; 5], c ∈ [1; 5], p ∈ [1; 5], k ∈ [1; 3], d ∈ [-6; -1], tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm xét liên tục x0', min: 2, max: 5 },
      { name: 'a', label: 'Hệ số x^3 nhánh trên', min: -4, max: -1 },
      { name: 'b', label: 'Hệ số x nhánh trên', min: 1, max: 5 },
      { name: 'c', label: 'Hằng số nhánh trên', min: 1, max: 5 },
      { name: 'p', label: 'Hằng số p trong (p-km)', min: 1, max: 5 },
      { name: 'k', label: 'Hệ số trừ km', min: 1, max: 3 },
      { name: 'd', label: 'Hằng số nhánh dưới', min: -6, max: -1 },
    ],
    validateCode: `
      const { x0, a, b, c, p, k, d } = params;
      if (x0 < 2 || a >= 0 || b < 1 || c < 1 || p < 1 || k < 1 || d >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const fx0 = a * x0 * x0 * x0 + b * x0 + c;
      const numM = p * x0 * x0 + d - fx0;
      const denM = k * x0 * x0;
      if (numM === 0) return { valid: false, reason: 'Tránh m = 0' };
      const absN = Math.abs(numM), absD = Math.abs(denM);
      if ((20 * absN) % (2 * absD) === absD) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, b, c, p, k, d } = params;
      const polyTop = u.formatPoly([a, 0, b, c]);
      const coeffM = p + ' - ' + (k === 1 ? 'm' : k + 'm');
      const polyBot = '(' + coeffM + ')x^{2} ' + u.formatTrailingConst(d);

      const fx0 = a * x0 * x0 * x0 + b * x0 + c;
      const limLeft = u.formatLinear(-k * x0 * x0, p * x0 * x0 + d, 'm');
      const mF = u.simplifyFrac(p * x0 * x0 + d - fx0, k * x0 * x0);
      const val = mF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + polyTop + ' & \\text{khi } x \\ge ' + x0 + ' \\\\ ' + polyBot + ' & \\text{khi } x < ' + x0 + ' \\end{cases}$. Tìm giá trị của tham số $m$ để hàm số liên tục tại $x = ' + x0 + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $f(' + x0 + ') = \\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + fx0 + '$ và $\\lim \\limits_{x \\to ' + x0 + '^-} f(x) = ' + limLeft + '$.',
          'Hàm số liên tục tại $x = ' + x0 + ' \\Leftrightarrow ' + limLeft + ' = ' + fx0 + ' \\Leftrightarrow m = ' + mF.latex + (mF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 1', params: { x0: 1, a: -3, b: 4, c: 2, p: 3, k: 1, d: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (x0=4 -> 217/16 ≈ 13,6)', params: { x0: 4, a: -3, b: 4, c: 2, p: 3, k: 1, d: -5 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Tìm m để hàm bậc 3 (x ≥ x0) & bậc 2 chứa m (x < x0) liên tục tại mọi x ∈ R (Trả lời ngắn)
  t11_b17_d23_sa_find_m_cubic_everywhere: {
    id: 't11_b17_d23_sa_find_m_cubic_everywhere',
    name: 'Tìm tham số m để hàm số cho bởi hai công thức liên tục với mọi x ∈ R (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Tìm m để hàm số 2 nhánh (ax^3 + bx + c khi x ≥ x0; (km + p)x^2 + d khi x < x0) liên tục trên R.',
    conditionSummary: 'x0 ∈ [2; 6], a ∈ [1; 4], b ∈ [1; 5], c ∈ [-5; -1], k ∈ [-5; -2], p ∈ [-5; -1], d ∈ [1; 5], tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm rẽ nhánh x0', min: 2, max: 6 },
      { name: 'a', label: 'Hệ số x^3 nhánh trên', min: 1, max: 4 },
      { name: 'b', label: 'Hệ số x nhánh trên', min: 1, max: 5 },
      { name: 'c', label: 'Hằng số nhánh trên', min: -5, max: -1 },
      { name: 'k', label: 'Hệ số m trong (km+p)x^2', min: -5, max: -2 },
      { name: 'p', label: 'Hằng số p trong (km+p)', min: -5, max: -1 },
      { name: 'd', label: 'Hằng số nhánh dưới', min: 1, max: 5 },
    ],
    validateCode: `
      const { x0, a, b, c, k, p, d } = params;
      if (x0 < 2 || a < 1 || b < 1 || c >= 0 || k >= 0 || p >= 0 || d < 1) return { valid: false, reason: 'Tham số ngoài miền' };
      const fx0 = a * x0 * x0 * x0 + b * x0 + c;
      const numM = fx0 - d - p * x0 * x0;
      const denM = k * x0 * x0;
      if (numM === 0) return { valid: false, reason: 'Tránh m = 0' };
      const absN = Math.abs(numM), absD = Math.abs(denM);
      if ((20 * absN) % (2 * absD) === absD) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, b, c, k, p, d } = params;
      const polyTop = u.formatPoly([a, 0, b, c]);
      const coeffM = u.formatLinear(k, p, 'm');
      const polyBot = '(' + coeffM + ')x^{2} + ' + d;

      const fx0 = a * x0 * x0 * x0 + b * x0 + c;
      const limLeft = u.formatLinear(k * x0 * x0, p * x0 * x0 + d, 'm');
      const mF = u.simplifyFrac(fx0 - d - p * x0 * x0, k * x0 * x0);
      const val = mF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + polyTop + ' & \\text{khi } x \\ge ' + x0 + ' \\\\ ' + polyBot + ' & \\text{khi } x < ' + x0 + ' \\end{cases}$. Tìm giá trị của tham số $m$ để hàm số liên tục tại mọi $x \\in \\mathbb{R}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Hàm số liên tục trên các khoảng $(-\\infty; ' + x0 + ')$ và $(' + x0 + '; +\\infty)$, nên liên tục với mọi $x \\in \\mathbb{R}$ khi và chỉ khi liên tục tại $x = ' + x0 + '$.',
          'Ta có $f(' + x0 + ') = \\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + fx0 + '$ và $\\lim \\limits_{x \\to ' + x0 + '^-} f(x) = ' + limLeft + '$.',
          'Giải phương trình $' + limLeft + ' = ' + fx0 + ' \\Rightarrow m = ' + mF.latex + (mF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { x0: 6, a: 0, b: 1, c: -1, k: -4, p: -3, d: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (x0=6 -> -181/48 ≈ -3,8)', params: { x0: 6, a: 2, b: 1, c: -1, k: -4, p: -3, d: 2 }, expectedValid: true },
    ],
  },
};
