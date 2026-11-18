import { MathTemplate } from '../types/math';

export const G11_B32_SA_PART2: Record<string, MathTemplate> = {
  // Q78: Tiếp tuyến hàm bậc 3 tại điểm x0 -> tính a + b
  t11_b32_d78_cubic_tangent_at_x0_sa: {
    id: 't11_b32_d78_cubic_tangent_at_x0_sa',
    name: 'Tính a + b phương trình tiếp tuyến hàm bậc ba tại hoành độ x₀',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho y = ax³ + bx + c, tiếp tuyến tại x₀ có dạng y = Ax + B. Tính A + B.',
    conditionSummary: 'a ∈ [-4; 4] \\ {0}, b, c ∈ [-6; 6] \\ {0}, x₀ ∈ [-3; 3]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ x₀', min: -3, max: 3 },
    ],
    validateCode: `
      const { a, b, c, x0 } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số khác 0' };
      if (3 * a * x0 * x0 + b === 0) return { valid: false, reason: 'Hệ số góc k = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0 } = params;
      const fx = u.formatPoly([a, 0, b, c]);
      const fprime = u.formatPoly([3 * a, 0, b]);
      const k = 3 * a * x0 * x0 + b;
      const y0 = a * x0 * x0 * x0 + b * x0 + c;
      const bLine = y0 - k * x0;
      const ans = k + bLine;

      return {
        stem: 'Cho hàm số $y=' + fx + '$ có đồ thị $(C)$. Tiếp tuyến của $(C)$ tại điểm có hoành độ $x_0=' + x0 + '$ có phương trình dạng $y=ax+b$. Tính $a+b$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          "Ta có $y'=" + fprime + " \\Rightarrow y'(" + x0 + ')=' + k + '$, và $y_0=f(' + x0 + ')=' + y0 + '$.',
          'Phương trình tiếp tuyến: $y=' + k + '(x' + (x0 >= 0 ? '-' + x0 : '+' + Math.abs(x0)) + ')' + u.formatTrailingConst(y0) + ' \\Leftrightarrow y=' + u.formatLinear(k, bLine) + '$.',
          'Suy ra $a+b=' + k + (bLine < 0 ? ' - ' + Math.abs(bLine) : ' + ' + bLine) + '=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 4, c: 3, x0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q78 (2x³+4x+3 tại x0=1 -> 9)', params: { a: 2, b: 4, c: 3, x0: 1 }, expectedValid: true },
    ],
  },

  // Q79: Hệ số góc lớn nhất của tiếp tuyến đồ thị hàm bậc 3 (a < 0)
  t11_b32_d79_cubic_max_tangent_slope_sa: {
    id: 't11_b32_d79_cubic_max_tangent_slope_sa',
    name: 'Tìm hệ số góc lớn nhất của tiếp tuyến đồ thị hàm bậc ba',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ý nghĩa hình học của đạo hàm',
    description: 'Cho y = ax³ + bx² + cx + d (a < 0). Tìm hệ số góc lớn nhất của tiếp tuyến (làm tròn hàng phần mười).',
    conditionSummary: 'a ∈ [-6; -1], b, c, d ∈ [-6; 6] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a < 0', min: -6, max: -1 },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a >= 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'a < 0 và b, c, d ≠ 0' };
      const num = 3 * a * c - b * b;
      const den = 3 * a; // negative
      // Avoid .x5 midpoint ambiguity
      if ((20 * Math.abs(num)) % (2 * Math.abs(den)) === Math.abs(den)) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn ,x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const fx = u.formatPoly([a, b, c, d]);
      const fprime = u.formatPoly([3 * a, 2 * b, c]);
      const xPeakFr = u.simplifyFrac(-b, 3 * a);
      const kMaxFr = u.simplifyFrac(3 * a * c - b * b, 3 * a);
      const roundHalfUp1 = (v) => (v >= 0 ? Math.round(v * 10 + 1e-9) / 10 : -Math.round(Math.abs(v) * 10 + 1e-9) / 10);
      const ans = roundHalfUp1(kMaxFr.value);
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem: 'Cho hàm số $y=' + fx + '$ có đồ thị là $(C)$. Tìm hệ số góc lớn nhất của tiếp tuyến tại một điểm $M$ trên đồ thị $(C)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          "Hệ số góc tiếp tuyến tại điểm có hoành độ $x$ là $k=y'=" + fprime + '$.',
          'Vì $' + (3 * a) + '<0$ nên $k$ đạt giá trị lớn nhất tại $x=' + xPeakFr.latex + '$.',
          'Khi đó $k_{\\max}=' + kMaxFr.latex + '\\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a > 0', params: { a: 2, b: 1, c: 1, d: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q79 (-4x³+x²+x-3 -> 1,1)', params: { a: -4, b: 1, c: 1, d: -3 }, expectedValid: true },
    ],
  },

  // Q80: Tiếp tuyến hàm nhất biến tại hoành độ x0 -> tính a + b
  t11_b32_d80_homographic_tangent_x0_sa: {
    id: 't11_b32_d80_homographic_tangent_x0_sa',
    name: 'Tính a + b tiếp tuyến hàm nhất biến tại hoành độ x₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho (C): y = (ax + b)/(cx + d). Tiếp tuyến tại x₀ có dạng y = Ax + B. Tính A + B (làm tròn hàng phần mười).',
    conditionSummary: 'ad - bc ≠ 0, cx₀ + d ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ x₀', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d, x0 } = params;
      if ([a, b, c, d, x0].some((v) => v === 0)) return { valid: false, reason: 'Các tham số khác 0' };
      const det = a * d - b * c;
      const den = c * x0 + d;
      if (det === 0 || den === 0) return { valid: false, reason: 'Hàm suy biến hoặc mẫu bằng 0 tại x₀' };
      const sumNum = det * (1 - x0) + (a * x0 + b) * den;
      const sumDen = den * den;
      if ((20 * Math.abs(sumNum)) % (2 * sumDen) === sumDen) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn ,x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, x0 } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const den = c * x0 + d;
      const y0Fr = u.simplifyFrac(a * x0 + b, den);
      const kFr = u.simplifyFrac(det, den * den);
      const bFr = u.simplifyFrac((a * x0 + b) * den - det * x0, den * den);
      const sumFr = u.simplifyFrac(det * (1 - x0) + (a * x0 + b) * den, den * den);
      const round1 = (v) => (v >= 0 ? Math.round(v * 10 + 1e-9) / 10 : -Math.round(Math.abs(v) * 10 + 1e-9) / 10);
      const ans = round1(sumFr.value);
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem: 'Cho đường cong $(C):y=\\dfrac{' + numStr + '}{' + denStr + '}$. Phương trình tiếp tuyến của $(C)$ tại điểm có hoành độ $x=' + x0 + '$ có dạng $y=ax+b$. Tính $a+b$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Với $x=' + x0 + '\\Rightarrow y_0=' + y0Fr.latex + '$.',
          "Đạo hàm $y'=\\dfrac{" + det + '}{(' + denStr + ")^2} \\Rightarrow y'(" + x0 + ')=' + kFr.latex + '$.',
          'Phương trình tiếp tuyến: $y=' + kFr.latex + 'x' + (bFr.num < 0 ? ' ' + bFr.latex : ' + ' + bFr.latex) + '$.',
          'Suy ra $a+b=' + sumFr.latex + '\\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu bằng 0 tại x0', params: { a: -4, b: 1, c: -4, d: 12, x0: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q80 ((1-4x)/(2-4x) tại x=3 -> 1,2)', params: { a: -4, b: 1, c: -4, d: 2, x0: 3 }, expectedValid: true },
    ],
  },

  // Q81: Tiếp tuyến hàm nhất biến tại điểm có tung độ y0 = 0 (nguyên) -> tính a + b
  t11_b32_d81_homographic_tangent_y0_sa: {
    id: 't11_b32_d81_homographic_tangent_y0_sa',
    name: 'Tính a + b tiếp tuyến hàm nhất biến tại điểm có tung độ bằng 0',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho (C): y = (ax + b)/(cx + d) có nghiệm nguyên x₀ của y = 0. Tính a + b của tiếp tuyến tại tung độ bằng 0.',
    conditionSummary: 'ad - bc ≠ 0, x₀ = -b/a nguyên, cx₀ + d = ±1 để tiếp tuyến nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
      { name: 'x0', label: 'Hoành độ x₀ tại y = 0', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -4, max: 4, allowZero: false },
      { name: 'sgnDen', label: 'Giá trị cx₀ + d ∈ {-1, 1}', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, x0, c, sgnDen } = params;
      if (a === 0 || x0 === 0 || c === 0) return { valid: false, reason: 'Tham số khác 0' };
      const b = -a * x0;
      const denVal = sgnDen === 0 ? -1 : 1;
      const d = denVal - c * x0;
      if (d === 0 || a * d - b * c === 0) return { valid: false, reason: 'd = 0 hoặc hàm suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x0, c, sgnDen } = params;
      const b = -a * x0;
      const denVal = sgnDen === 0 ? -1 : 1;
      const d = denVal - c * x0;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const k = det; // since denVal^2 = 1
      const bLine = -k * x0;
      const ans = k + bLine;

      return {
        stem: 'Cho đường cong $(C):y=\\dfrac{' + numStr + '}{' + denStr + '}$. Phương trình tiếp tuyến của $(C)$ tại điểm có tung độ bằng $0$ có dạng $y=ax+b$. Tính $a+b$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Với $y=0 \\Rightarrow \\dfrac{' + numStr + '}{' + denStr + '}=0 \\Rightarrow x_0=' + x0 + '$.',
          "Đạo hàm $y'=\\dfrac{" + det + '}{(' + denStr + ")^2} \\Rightarrow y'(" + x0 + ')=' + k + '$.',
          'Phương trình tiếp tuyến: $y=' + k + '(x' + (x0 >= 0 ? '-' + x0 : '+' + Math.abs(x0)) + ') \\Leftrightarrow y=' + u.formatLinear(k, bLine) + '$.',
          'Suy ra $a+b=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 0', params: { a: -1, x0: 0, c: -2, sgnDen: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q81 ((-x-2)/(-2x-3), y=0 -> -3)', params: { a: -1, x0: -2, c: -2, sgnDen: 1 }, expectedValid: true },
    ],
  },

  // Q82: Tiếp tuyến hàm nhất biến tại giao điểm với trục hoành -> a + b (làm tròn 0,1)
  t11_b32_d82_homographic_tangent_x_axis_sa: {
    id: 't11_b32_d82_homographic_tangent_x_axis_sa',
    name: 'Tính a + b tiếp tuyến hàm nhất biến tại giao điểm với trục hoành',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho (C): y = (ax + b)/(cx + d). Tiếp tuyến tại giao điểm với trục hoành có dạng y = Ax + B. Tính A + B (làm tròn hàng phần mười).',
    conditionSummary: 'x₀ = -b/a nguyên ≠ 0, cx₀ + d ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
      { name: 'x0', label: 'Hoành độ giao điểm x₀', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, x0, c, d } = params;
      if ([a, x0, c, d].some((v) => v === 0)) return { valid: false, reason: 'Tham số khác 0' };
      const b = -a * x0;
      const den = c * x0 + d;
      const det = a * d - b * c;
      if (den === 0 || det === 0) return { valid: false, reason: 'Mẫu bằng 0 hoặc hàm suy biến' };
      const sumNum = det * (1 - x0);
      const sumDen = den * den;
      if ((20 * Math.abs(sumNum)) % (2 * sumDen) === sumDen) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn ,x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x0, c, d } = params;
      const b = -a * x0;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const den = c * x0 + d;
      const kFr = u.simplifyFrac(det, den * den);
      const bFr = u.simplifyFrac(-det * x0, den * den);
      const sumFr = u.simplifyFrac(det * (1 - x0), den * den);
      const round1 = (v) => (v >= 0 ? Math.round(v * 10 + 1e-9) / 10 : -Math.round(Math.abs(v) * 10 + 1e-9) / 10);
      const ans = round1(sumFr.value);
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem: 'Cho đường cong $(C):y=\\dfrac{' + numStr + '}{' + denStr + '}$. Phương trình tiếp tuyến của $(C)$ tại giao điểm của $(C)$ với trục hoành có dạng $y=ax+b$. Tính $a+b$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Giao điểm với trục hoành: $y=0 \\Rightarrow ' + numStr + '=0 \\Rightarrow x_0=' + x0 + '$.',
          "Đạo hàm $y'=\\dfrac{" + det + '}{(' + denStr + ")^2} \\Rightarrow y'(" + x0 + ')=' + kFr.latex + '$.',
          'Tiếp tuyến: $y=' + kFr.latex + '(x' + (x0 >= 0 ? '-' + x0 : '+' + Math.abs(x0)) + ')=' + kFr.latex + 'x' + (bFr.num < 0 ? ' ' + bFr.latex : ' + ' + bFr.latex) + '$.',
          'Suy ra $a+b=' + sumFr.latex + '\\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu bằng 0', params: { a: 2, x0: 2, c: 5, d: -10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q82 ((2x-4)/(5x-1) -> -0,2)', params: { a: 2, x0: 2, c: 5, d: -1 }, expectedValid: true },
    ],
  },

  // Q83: Tiếp tuyến hàm nhất biến tại giao điểm với trục tung -> a + b
  t11_b32_d83_homographic_tangent_y_axis_sa: {
    id: 't11_b32_d83_homographic_tangent_y_axis_sa',
    name: 'Tính a + b tiếp tuyến hàm nhất biến tại giao điểm với trục tung',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho (C): y = (ax + b)/(cx + d). Tiếp tuyến tại giao điểm với trục tung có dạng y = Ax + B. Tính A + B.',
    conditionSummary: 'd ∈ {-1, 1}, ad - bc ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'dSign', label: 'd ∈ {-1, 1}', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c, dSign } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số khác 0' };
      const d = dSign === 0 ? -1 : 1;
      if (a * d - b * c === 0) return { valid: false, reason: 'Hàm suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, dSign } = params;
      const d = dSign === 0 ? -1 : 1;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const y0 = b / d;
      const k = det; // d^2 = 1
      const ans = k + y0;

      return {
        stem: 'Cho đường cong $(C):y=\\dfrac{' + numStr + '}{' + denStr + '}$. Phương trình tiếp tuyến của $(C)$ tại giao điểm của $(C)$ với trục tung có dạng $y=ax+b$. Tính $a+b$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Giao điểm với trục tung có hoành độ $x=0 \\Rightarrow y(0)=' + y0 + '$, ta có $A(0;' + y0 + ')$.',
          "Đạo hàm $y'=\\dfrac{" + det + '}{(' + denStr + ")^2} \\Rightarrow y'(0)=" + k + '$.',
          'Phương trình tiếp tuyến tại $A$: $y=' + u.formatLinear(k, y0) + '$.',
          'Suy ra $a+b=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 3, c: 2, dSign: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q83 ((5x+3)/(2x+1) -> 2)', params: { a: 5, b: 3, c: 2, dSign: 1 }, expectedValid: true },
    ],
  },

  // Q84: Hai tiếp tuyến hàm nhất biến có hệ số góc k -> tính |b1 + b2|
  t11_b32_d84_homographic_two_tangents_b_sum_sa: {
    id: 't11_b32_d84_homographic_two_tangents_b_sum_sa',
    name: 'Tính |b₁ + b₂| của hai tiếp tuyến hàm nhất biến có hệ số góc k',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho y = (ax + b)/(cx + d). Hai tiếp tuyến có hệ số góc k dạng y = a₁x + b₁ và y = a₂x + b₂. Tính |b₁ + b₂|.',
    conditionSummary: 'c ∈ {-1, 1}, s ∈ [1; 3], k ∈ [-6; 6] \\ {0}, ad - bc = k·s²',
    paramSpecs: [
      { name: 'cSign', label: 'c ∈ {-1, 1}', min: 0, max: 1 },
      { name: 'd', label: 'Hệ số d', min: -5, max: 5, allowZero: false },
      { name: 's', label: 'Bán kính nghiệm s = |cx+d|', min: 1, max: 3 },
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
      const x1 = (s - d) / c;
      const x2 = (-s - d) / c;
      const y1 = (a * x1 + b) / (c * x1 + d);
      const y2 = (a * x2 + b) / (c * x2 + d);
      const b1 = y1 - k * x1;
      const b2 = y2 - k * x2;
      if (b1 + b2 === 0) return { valid: false, reason: 'Tổng b₁ + b₂ = 0' };
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
      const ans = Math.abs(b1 + b2);

      return {
        stem: 'Cho hàm số $y=\\dfrac{' + numStr + '}{' + denStr + '}$. Biết các tiếp tuyến của đồ thị hàm số có hệ số góc $k=' + k + '$ có các phương trình lần lượt là $y=a_1x+b_1$ và $y=a_2x+b_2$. Tính $|b_1+b_2|$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          "Xét phương trình $y'=" + k + '\\Leftrightarrow \\dfrac{' + det + '}{(' + denStr + ')^2}=' + k + '\\Leftrightarrow (' + denStr + ')^2=' + (s * s) + '\\Rightarrow x_1=' + x1 + ',\\; x_2=' + x2 + '$.',
          'Tại $x_1=' + x1 + '$: $y_1=' + y1 + '\\Rightarrow y=' + u.formatLinear(k, b1) + '$.',
          'Tại $x_2=' + x2 + '$: $y_2=' + y2 + '\\Rightarrow y=' + u.formatLinear(k, b2) + '$.',
          'Do đó $|b_1+b_2|=|' + b1 + (b2 < 0 ? ' - ' + Math.abs(b2) : ' + ' + b2) + '|=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { cSign: 0, d: -3, s: 1, k: 0, a: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q84 ((2x+3)/(-x-3), k=-3 -> 22)', params: { cSign: 0, d: -3, s: 1, k: -3, a: 2 }, expectedValid: true },
    ],
  },

  // Q85: Tiếp tuyến hàm nhất biến song song với đường thẳng y = kx + m (loại đường trùng)
  t11_b32_d85_homographic_parallel_tangent_sa: {
    id: 't11_b32_d85_homographic_parallel_tangent_sa',
    name: 'Tìm a + b tiếp tuyến hàm nhất biến song song đường thẳng cho trước',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho (C): y = (ax + b)/(cx + d). Tiếp tuyến song song với đường thẳng d: y = kx + m có dạng y = Ax + B. Tính A + B.',
    conditionSummary: 'Một tiếp tuyến trùng đường thẳng d bị loại, còn lại tiếp tuyến duy nhất',
    paramSpecs: [
      { name: 'cSign', label: 'c ∈ {-1, 1}', min: 0, max: 1 },
      { name: 'd', label: 'Hệ số d', min: -5, max: 5, allowZero: false },
      { name: 's', label: 'Giá trị s = |cx+d|', min: 1, max: 2 },
      { name: 'k', label: 'Hệ số góc k', min: -5, max: 5, allowZero: false },
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { cSign, d, s, k, a } = params;
      if (d === 0 || s < 1 || s > 2 || k === 0 || a === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const c = cSign === 0 ? -1 : 1;
      const det = k * s * s;
      const b = (a * d - det) / c;
      if (b === 0) return { valid: false, reason: 'b ≠ 0' };
      const x1 = (s - d) / c;
      const x2 = (-s - d) / c;
      const y1 = (a * x1 + b) / (c * x1 + d);
      const y2 = (a * x2 + b) / (c * x2 + d);
      const b1 = y1 - k * x1;
      const b2 = y2 - k * x2;
      if (b1 === b2 || b2 === 0) return { valid: false, reason: 'Hai tiếp tuyến phải phân biệt' };
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
      const b2 = y2 - k * x2; // Chosen as the given parallel line intercept so it gets rejected!
      const ans = k + b1;

      return {
        stem: 'Cho hàm số $y=\\dfrac{' + numStr + '}{' + denStr + '}$ có đồ thị $(C)$. Biết tiếp tuyến của đồ thị $(C)$ song song với đường thẳng $y=' + u.formatLinear(k, b2) + '$ có phương trình dạng $y=ax+b$. Tính $a+b$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Tiếp tuyến song song với đường thẳng $y=' + u.formatLinear(k, b2) + '$ nên có hệ số góc $k=' + k + '$.',
          "Giải $y'=" + k + '\\Leftrightarrow \\dfrac{' + det + '}{(' + denStr + ')^2}=' + k + '\\Rightarrow x=' + x1 + ',\\; x=' + x2 + '$.',
          'Với $x=' + x1 + '\\Rightarrow y=' + u.formatLinear(k, b1) + '$ (thỏa mãn).',
          'Với $x=' + x2 + '\\Rightarrow y=' + u.formatLinear(k, b2) + '$ (trùng đường thẳng đã cho nên loại).',
          'Vậy $a+b=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { cSign: 1, d: 2, s: 1, k: -2, a: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q85 ((-2x-2)/(x+2) // y=-2x-10 -> -4)', params: { cSign: 1, d: 2, s: 1, k: -2, a: -2 }, expectedValid: true },
    ],
  },

  // Q86: Tiếp tuyến hàm bậc 3 song song đường thẳng y = kx + m (loại đường trùng)
  t11_b32_d86_cubic_parallel_tangent_sa: {
    id: 't11_b32_d86_cubic_parallel_tangent_sa',
    name: 'Tìm a + b tiếp tuyến hàm bậc ba song song đường thẳng cho trước',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho (C): y = x³/3 + (p/2)x² + qx + r. Tiếp tuyến song song với y = kx + m có dạng y = ax + b. Tính a + b.',
    conditionSummary: 'x₁ ≠ x₂ nguyên, một tiếp tuyến trùng đường thẳng đã cho',
    paramSpecs: [
      { name: 'x1', label: 'Hoành độ tiếp điểm nhận x₁', min: -3, max: 3 },
      { name: 'x2', label: 'Hoành độ tiếp điểm bị loại x₂', min: -3, max: 4 },
      { name: 'k', label: 'Hệ số góc k', min: -6, max: 6, allowZero: false },
      { name: 'r', label: 'Hằng số r', min: -4, max: 4 },
    ],
    validateCode: `
      const { x1, x2, k } = params;
      if (x1 === x2 || k === 0) return { valid: false, reason: 'Yêu cầu x₁ ≠ x₂ và k ≠ 0' };
      const p = -(x1 + x2);
      const q = k + x1 * x2;
      if (p === 0 || q === 0) return { valid: false, reason: 'Tránh triệt tiêu hệ số' };
      // Keep accepted b1 integer (i.e. 6 | (2x1^3 + 3p x1^2 + 6(q-k)x1 + 6r)) so a+b is exact integer
      const b1Num = 2 * Math.pow(x1, 3) + 3 * p * x1 * x1 + 6 * (q - k) * x1;
      if (b1Num % 6 !== 0) return { valid: false, reason: 'Chọn x₁ để tiếp tuyến nhận có hệ số tự do nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, k, r } = params;
      const p = -(x1 + x2);
      const q = k + x1 * x2;
      const pFr = u.simplifyFrac(p, 2);
      const term2 = pFr.den === 1 ? u.formatTerm(pFr.num, 'x^{2}', false) : (p < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(p) + ' x^{2}}{2}';
      const fx = '\\frac{x^{3}}{3}' + term2 + u.formatTerm(q, 'x', false) + u.formatTrailingConst(r);
      const eqPoly = u.formatPoly([1, p, x1 * x2]);

      const b1 = r + (2 * Math.pow(x1, 3) + 3 * p * x1 * x1 + 6 * x1 * x1 * x2) / 6;
      const b2Fr = u.simplifyFrac(6 * r + 2 * Math.pow(x2, 3) + 3 * p * x2 * x2 + 6 * x1 * x2 * x2, 6);
      const givenLine = u.formatTerm(k, 'x', true) + (b2Fr.num === 0 ? '' : (b2Fr.num < 0 ? ' - ' : ' + ') + (b2Fr.den === 1 ? Math.abs(b2Fr.num) : '\\frac{' + Math.abs(b2Fr.num) + '}{' + b2Fr.den + '}'));
      const ans = k + b1;

      return {
        stem: 'Cho hàm số $y=' + fx + '$ có đồ thị $(C)$. Biết tiếp tuyến của đồ thị $(C)$ song song với đường thẳng $y=' + givenLine + '$ có phương trình dạng $y=ax+b$. Tính $a+b$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          "Giải phương trình $y'=" + k + ' \\Leftrightarrow ' + eqPoly + '=0 \\Rightarrow x=' + x1 + ',\\; x=' + x2 + '$.',
          'Với $x=' + x1 + '$ ta được tiếp tuyến $y=' + u.formatLinear(k, b1) + '$ (thỏa mãn).',
          'Với $x=' + x2 + '$ ta được tiếp tuyến $y=' + givenLine + '$ (trùng đường thẳng đã cho nên loại).',
          'Vậy $a+b=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = x2', params: { x1: 0, x2: 0, k: -4, r: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q86 (x³/3 - x²/2 - 4x // y=-4x-1/6 -> -4)', params: { x1: 0, x2: 1, k: -4, r: 0 }, expectedValid: true },
    ],
  },

  // Q87: Diện tích tam giác tạo bởi tiếp tuyến và hai trục tọa độ
  t11_b32_d87_homographic_tangent_triangle_area_sa: {
    id: 't11_b32_d87_homographic_tangent_triangle_area_sa',
    name: 'Tính diện tích tam giác tạo bởi tiếp tuyến hàm nhất biến và hai trục tọa độ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho (C): y = (ax + b)/(cx + d). Tính diện tích tam giác tạo bởi tiếp tuyến tại x₀ và hai trục tọa độ (làm tròn hàng phần mười).',
    conditionSummary: 'ad - bc ≠ 0, cx₀ + d ≠ 0, tiếp tuyến cắt cả Ox và Oy',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -4, max: 4, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ x₀', min: -3, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d, x0 } = params;
      if ([a, b, c, d, x0].some((v) => v === 0)) return { valid: false, reason: 'Tham số khác 0' };
      const det = a * d - b * c;
      const den = c * x0 + d;
      if (det === 0 || den === 0) return { valid: false, reason: 'Hàm suy biến hoặc mẫu bằng 0' };
      const bNum = (a * x0 + b) * den - det * x0;
      if (bNum === 0) return { valid: false, reason: 'Tiếp tuyến đi qua gốc tọa độ O' };
      // S = b_line^2 / (2*|k|) = bNum^2 / (2 * |det| * den^2)
      const area = (bNum * bNum) / (2 * Math.abs(det) * den * den);
      if (area < 0.06 || area > 50) return { valid: false, reason: 'Diện tích ngoài miền [0,06; 50]' };
      // Avoid .x5 midpoint ambiguity
      const numS = bNum * bNum;
      const denS = 2 * Math.abs(det) * den * den;
      if ((20 * numS) % (2 * denS) === denS) return { valid: false, reason: 'Tránh ranh giới làm tròn ,x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, x0 } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const den = c * x0 + d;
      const y0Fr = u.simplifyFrac(a * x0 + b, den);
      const kFr = u.simplifyFrac(det, den * den);
      const bNum = (a * x0 + b) * den - det * x0;
      const bFr = u.simplifyFrac(bNum, den * den);
      const xIntFr = u.simplifyFrac(-bNum, det); // -b_line / k
      const sFr = u.simplifyFrac(bNum * bNum, 2 * Math.abs(det) * den * den);
      const ans = Math.round(sFr.value * 10 + 1e-9) / 10;
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem: 'Cho đường cong $(C):y=\\dfrac{' + numStr + '}{' + denStr + '}$. Tính diện tích tam giác tạo bởi tiếp tuyến của $(C)$ tại điểm có hoành độ $x_0=' + x0 + '$ và hai trục tọa độ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          "Ta có $y'=\\dfrac{" + det + '}{(' + denStr + ')^2}$, tại $x_0=' + x0 + '$: $y_0=' + y0Fr.latex + ',\\; k=' + kFr.latex + '$.',
          'Phương trình tiếp tuyến: $y=' + kFr.latex + 'x' + (bFr.num < 0 ? ' ' + bFr.latex : ' + ' + bFr.latex) + '$.',
          'Giao điểm với hai trục: $A\\left(' + xIntFr.latex + ';0\\right)$ và $B\\left(0;' + bFr.latex + '\\right)$.',
          'Diện tích tam giác: $S=\\frac{1}{2}OA\\cdot OB=\\frac{1}{2}\\left|' + xIntFr.latex + '\\right|\\cdot\\left|' + bFr.latex + '\\right|=' + sFr.latex + '\\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu bằng 0', params: { a: 5, b: -4, c: 1, d: -2, x0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q87 ((5x-4)/(x+4) tại x0=2 -> 0,1)', params: { a: 5, b: -4, c: 1, d: 4, x0: 2 }, expectedValid: true },
    ],
  },

  // Q88: Tìm m để tiếp tuyến có hệ số góc nhỏ nhất vuông góc đường thẳng y = p x + q
  t11_b32_d88_cubic_min_slope_perp_m_sa: {
    id: 't11_b32_d88_cubic_min_slope_perp_m_sa',
    name: 'Tìm m để tiếp tuyến có hệ số góc nhỏ nhất vuông góc với đường thẳng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ý nghĩa hình học của đạo hàm',
    description: 'Cho y = ax³ - 3ax₀x² + (m + c)x + d (a > 0). Tìm m để tiếp tuyến hệ số góc nhỏ nhất vuông góc đường thẳng y = px + q.',
    conditionSummary: 'a ∈ [1; 3], x₀ ∈ [-3; 3] \\ {0}, p ∈ {-1, 1}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a > 0', min: 1, max: 3 },
      { name: 'x0', label: 'Điểm uốn x₀', min: -3, max: 3, allowZero: false },
      { name: 'c', label: 'Hằng số c trong (m+c)', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hằng số d', min: 1, max: 9 },
      { name: 'pSign', label: 'Hệ số góc p ∈ {-1, 1}', min: 0, max: 1 },
      { name: 'q', label: 'Tung độ gốc q', min: 1, max: 9 },
    ],
    validateCode: `
      const { a, x0, c, d, q } = params;
      if (a <= 0 || x0 === 0 || c === 0 || d <= 0 || q <= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x0, c, d, pSign, q } = params;
      const b = -3 * a * x0;
      const p = pSign === 0 ? -1 : 1;
      const kTarget = -1 / p; // 1 or -1
      const mShift = u.formatShift('m', c);
      const fx = u.formatTerm(a, 'x^3', true) + u.formatTerm(b, 'x^{2}', false) + ' + (' + mShift + ')x + ' + d;
      const fprimeStart = u.formatTerm(3 * a, 'x^2', true) + u.formatTerm(2 * b, 'x', false);
      const valAtX0 = 3 * a * x0 * x0 + 2 * b * x0 + c; // = -3a x0^2 + c
      const mAns = kTarget - valAtX0;
      const lineStr = u.formatLinear(p, q);

      return {
        stem: 'Cho hàm số $y=' + fx + '$ có đồ thị là $(C_m)$ với $m$ là tham số. Tìm $m$ để tiếp tuyến của $(C_m)$ có hệ số góc nhỏ nhất vuông góc với đường thẳng $y=' + lineStr + '$.',
        shortAnswer: String(mAns),
        numericValue: mAns,
        answerSummary: String(mAns),
        solutionSteps: [
          "Ta có $y'=" + fprimeStart + (c < 0 ? '+m-' + Math.abs(c) : '+m+' + c) + '$.',
          'Do $' + (3 * a) + '>0$ nên tiếp tuyến có hệ số góc nhỏ nhất ứng với $x_0=' + x0 + '$, khi đó $k_{\\min}=y\'(' + x0 + ')=' + u.formatShift('m', valAtX0) + '$.',
          'Tiếp tuyến vuông góc với $y=' + lineStr + '$ nên có hệ số góc $k=-\\dfrac{1}{' + p + '}=' + kTarget + '$.',
          'Suy ra $' + u.formatShift('m', valAtX0) + '=' + kTarget + ' \\Rightarrow m=' + mAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 0', params: { a: 1, x0: 0, c: 5, d: 5, pSign: 0, q: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q88 (x³-6x²+(m+5)x+5 ⊥ y=3-x -> 8)', params: { a: 1, x0: 2, c: 5, d: 5, pSign: 0, q: 3 }, expectedValid: true },
    ],
  },

  // Q89: Tìm m để tiếp tuyến có hệ số góc lớn nhất vuông góc với y = px + q (làm tròn 0,1)
  t11_b32_d89_cubic_max_slope_perp_m_sa: {
    id: 't11_b32_d89_cubic_max_slope_perp_m_sa',
    name: 'Tìm m để tiếp tuyến có hệ số góc lớn nhất vuông góc với đường thẳng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ý nghĩa hình học của đạo hàm',
    description: 'Cho y = -ax³ + 3ax₀x² + (m + c)x + d (a > 0). Tìm m để tiếp tuyến hệ số góc lớn nhất vuông góc với y = px + q (làm tròn 0,1).',
    conditionSummary: 'a ∈ [1; 3], x₀ ∈ [-3; 3] \\ {0}, p ∈ {-5; 5} \\ {-1, 0, 1}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a > 0 (trong -ax³)', min: 1, max: 3 },
      { name: 'x0', label: 'Điểm uốn x₀', min: -3, max: 3, allowZero: false },
      { name: 'c', label: 'Hằng số c trong (m+c)', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hằng số d', min: 1, max: 9 },
      { name: 'p', label: 'Hệ số góc đường thẳng p', min: -5, max: 5, allowZero: false },
      { name: 'q', label: 'Tung độ gốc q', min: 1, max: 9 },
    ],
    validateCode: `
      const { a, x0, c, d, p, q } = params;
      if (a <= 0 || x0 === 0 || c === 0 || d <= 0 || p === 0 || Math.abs(p) === 1 || q <= 0) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const valAtX0 = 3 * a * x0 * x0 + c;
      const numM = -1 - p * valAtX0; // m = -1/p - valAtX0 = (-1 - p*valAtX0)/p
      // Avoid .x5 midpoint ambiguity when Math.abs(p) is even (e.g. |p|=2 gives exact .5, wait Q89 IS -0,5 -> -1/2!!)
      // Wait: for |p| = 2, -0.5 is exact to 1 decimal place! Only avoid true .x5 at the 2nd decimal place like /20:
      if ((20 * Math.abs(numM)) % (2 * Math.abs(p)) === Math.abs(p)) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn ,x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x0, c, d, p, q } = params;
      const b = 3 * a * x0;
      const mShift = u.formatShift('m', c);
      const fx = u.formatTerm(-a, 'x^3', true) + u.formatTerm(b, 'x^{2}', false) + ' + (' + mShift + ')x + ' + d;
      const fprimeStart = u.formatTerm(-3 * a, 'x^2', true) + u.formatTerm(2 * b, 'x', false);
      const valAtX0 = 3 * a * x0 * x0 + c;
      const kTargetFr = u.simplifyFrac(-1, p);
      const mFr = u.simplifyFrac(-1 - p * valAtX0, p);
      const round1 = (v) => (v >= 0 ? Math.round(v * 10 + 1e-9) / 10 : -Math.round(Math.abs(v) * 10 + 1e-9) / 10);
      const ans = round1(mFr.value);
      const ansStr = u.formatNumberVN(ans, 1);
      const lineStr = u.formatLinear(p, q);

      return {
        stem: 'Cho hàm số $y=' + fx + '$ có đồ thị là $(C_m)$ với $m$ là tham số. Tìm $m$ để tiếp tuyến của $(C_m)$ có hệ số góc lớn nhất vuông góc với đường thẳng $y=' + lineStr + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          "Ta có $y'=" + fprimeStart + (c < 0 ? '+m-' + Math.abs(c) : '+m+' + c) + '$.',
          'Do $-' + (3 * a) + '<0$ nên tiếp tuyến có hệ số góc lớn nhất ứng với $x_0=' + x0 + '$, khi đó $k_{\\max}=y\'(' + x0 + ')=' + u.formatShift('m', valAtX0) + '$.',
          'Tiếp tuyến vuông góc với $y=' + lineStr + '$ nên có hệ số góc bằng $-\\dfrac{1}{' + p + '}=' + kTargetFr.latex + '$.',
          'Suy ra $' + u.formatShift('m', valAtX0) + '=' + kTargetFr.latex + ' \\Rightarrow m=' + mFr.latex + '\\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên |p| = 1', params: { a: 1, x0: 1, c: -2, d: 1, p: 1, q: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q89 (-x³+3x²+(m-2)x+1 ⊥ y=1-2x -> -0,5)', params: { a: 1, x0: 1, c: -2, d: 1, p: -2, q: 1 }, expectedValid: true },
    ],
  },

  // Q90: Tìm m để tiếp tuyến tại x0 đi qua điểm A(xA; yA)
  t11_b32_d90_cubic_tangent_through_point_m_sa: {
    id: 't11_b32_d90_cubic_tangent_through_point_m_sa',
    name: 'Tìm m để tiếp tuyến đồ thị hàm bậc ba tại x₀ đi qua điểm A cho trước',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho y = ax³ + bmx² + (m + c)x + d. Tìm m để tiếp tuyến tại điểm có hoành độ x₀ đi qua điểm A(x_A; y_A).',
    conditionSummary: 'm nguyên, x_A ≠ x₀, hệ số của m khác 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 3 },
      { name: 'b', label: 'Hệ số b của mx²', min: 1, max: 4 },
      { name: 'c', label: 'Hằng số c', min: 1, max: 6 },
      { name: 'd', label: 'Hằng số d', min: 1, max: 6 },
      { name: 'x0', label: 'Hoành độ tiếp điểm x₀', min: -2, max: 2, allowZero: false },
      { name: 'xA', label: 'Hoành độ điểm A', min: -3, max: 3 },
      { name: 'mTrue', label: 'Giá trị m đúng', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d, x0, xA, mTrue } = params;
      if (a <= 0 || b <= 0 || c <= 0 || d <= 0 || x0 === 0 || mTrue === 0) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (xA === x0) return { valid: false, reason: 'x_A phải khác x₀' };
      const coeffM = (2 * b * x0 + 1) * (xA - x0) + (b * x0 * x0 + x0);
      if (coeffM === 0) return { valid: false, reason: 'Hệ số của m bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, x0, xA, mTrue } = params;
      // y = a x^3 + b m x^2 + (m + c)x + d
      // y'(x0) = (2 b x0 + 1) m + (3 a x0^2 + c)
      // y(x0)  = (b x0^2 + x0) m + (a x0^3 + c x0 + d)
      const kM = 2 * b * x0 + 1;
      const kC = 3 * a * x0 * x0 + c;
      const y0M = b * x0 * x0 + x0;
      const y0C = a * x0 * x0 * x0 + c * x0 + d;
      const dx = xA - x0;
      const yA = (kM * mTrue + kC) * dx + (y0M * mTrue + y0C);

      const bTerm = b === 1 ? ' + mx^2' : ' + ' + b + 'mx^2';
      const fx = u.formatTerm(a, 'x^3', true) + bTerm + ' + (m + ' + c + ')x + ' + d;
      const fprime = u.formatTerm(3 * a, 'x^2', true) + ' + ' + (2 * b) + 'mx + m + ' + c;

      const y0Expr = u.formatLinear(y0M, y0C, 'm');
      const y0Append = y0Expr.startsWith('-') ? ' ' + y0Expr : ' + ' + y0Expr;

      return {
        stem: 'Cho hàm số $y=' + fx + '$. Tìm $m$ để tiếp tuyến của đồ thị hàm số tại điểm có hoành độ $x_0=' + x0 + '$ đi qua điểm $A(' + xA + ';' + yA + ')$.',
        shortAnswer: String(mTrue),
        numericValue: mTrue,
        answerSummary: String(mTrue),
        solutionSteps: [
          "Ta có $y'=" + fprime + '$.',
          "Tại điểm có hoành độ $x_0=" + x0 + "$: $y'(" + x0 + ')=' + u.formatLinear(kM, kC, 'm') + '$ và $y(' + x0 + ')=' + y0Expr + '$.',
          'Phương trình tiếp tuyến tại $x_0=' + x0 + '$ là $y=(' + u.formatLinear(kM, kC, 'm') + ')(x' + (x0 >= 0 ? '-' + x0 : '+' + Math.abs(x0)) + ')' + y0Append + '$.',
          'Vì tiếp tuyến đi qua $A(' + xA + ';' + yA + ')$ nên $' + yA + '=(' + u.formatLinear(kM, kC, 'm') + ')(' + dx + ')' + y0Append + ' \\Rightarrow m=' + mTrue + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xA = x0', params: { a: 1, b: 3, c: 4, d: 2, x0: 1, xA: 1, mTrue: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q90 (x³+3mx²+(m+4)x+2, x0=1, A(-1;23) -> -3)', params: { a: 1, b: 3, c: 4, d: 2, x0: 1, xA: -1, mTrue: -3 }, expectedValid: true },
    ],
  },
};
