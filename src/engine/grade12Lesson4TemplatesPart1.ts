import { MathTemplate } from '../types/math';

export const G12_B4_TEMPLATES_PART1: Record<string, MathTemplate> = {
  // Dạng 1 (Q1)
  t12_b4_d01_cubic_graph_mc: {
    id: 't12_b4_d01_cubic_graph_mc',
    name: 'Nhận diện hàm số bậc ba từ đồ thị',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho đồ thị hàm số bậc ba có hai điểm cực trị nguyên và giao điểm trục tung rõ nét. Xác định công thức hàm số.',
    conditionSummary: 'a ∈ {-1, 1}, hai điểm cực trị x1 < x2 thỏa mãn (x1 + x2) chẵn, |x1|, |x2| ≤ 4, |d| ≤ 10',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'x1', label: 'Điểm cực trị x1', min: -3, max: 1 },
      { name: 'x2', label: 'Điểm cực trị x2', min: -1, max: 3 },
      { name: 'd', label: 'Hệ số tự do d', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, x1, x2, d } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1} để hệ số gọn chuẩn đồ thị' };
      if (x1 >= x2) return { valid: false, reason: 'Cần hai điểm cực trị phân biệt x1 < x2' };
      if ((x1 + x2) % 2 !== 0) return { valid: false, reason: 'Cần x1 + x2 chẵn để hệ số b nguyên' };
      if (Math.abs(x1) > 4 || Math.abs(x2) > 4 || x2 - x1 > 4) {
        return { valid: false, reason: 'Khoảng cực trị quá rộng để hiển thị đẹp trên lưới tọa độ' };
      }
      if (Math.abs(d) > 10) return { valid: false, reason: 'Hệ số tự do |d| <= 10 để đồ thị đi qua khung nhìn quanh O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2, d } = params;
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const f = (x) => a * x * x * x + b * x * x + c * x + d;
      const y1 = f(x1);
      const y2 = f(x2);
      const poly = u.formatPoly([a, b, c, d]);
      const fake1 = u.formatPoly([a, b, c, d === 0 ? 4 : -d]);
      const fake2 = u.formatPoly([-a, b, c, d]);
      const fake3 = u.formatPoly([a, -b, c === 0 ? 2 : -c, d + 2]);

      const xMin = Math.min(-4, x1 - 2);
      const xMax = Math.max(4, x2 + 2);
      const yLow = Math.min(y1, y2, d, -2);
      const yHigh = Math.max(y1, y2, d, 2);
      const yMin = Math.floor(yLow - 2);
      const yMax = Math.ceil(yHigh + 2);
      const xTicks = Array.from(new Set([-3, -2, -1, 1, 2, 3, x1, x2])).filter((t) => t !== 0 && t > xMin && t < xMax).sort((p, q) => p - q);
      const yTicks = Array.from(new Set([-2, -1, 1, 2, y1, y2, d])).filter((t) => t !== 0 && t > yMin && t < yMax).sort((p, q) => p - q);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$y = ' + poly + '$',
        ['$y = ' + fake1 + '$', '$y = ' + fake2 + '$', '$y = ' + fake3 + '$'],
        rng,
        (k) => '$y = ' + u.formatPoly([a, b, c, d + k + 5]) + '$'
      );
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào?',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [a, b, c, d],
          xMin,
          xMax,
          yMin,
          yMax,
          xTicks,
          yTicks,
          highlightPoints: [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
          ],
        },
        options,
        correctIndex,
        answerSummary: '$y = ' + poly + '$',
        solutionSteps: [
          'Dựa vào nhánh cuối đồ thị đi ' + (a > 0 ? 'lên ($\\lim_{x\\to+\\infty} y = +\\infty$)' : 'xuống ($\\lim_{x\\to+\\infty} y = -\\infty$)') + ' nên $a ' + (a > 0 ? '> 0$' : '< 0$') + '.',
          'Đồ thị cắt trục tung tại điểm $(0; ' + d + ')$ nên $d = ' + d + '$.',
          'Hàm số đạt cực trị tại $x = ' + x1 + '$ và $x = ' + x2 + '$, kiểm tra đạo hàm $y\' = ' + u.formatQuadratic(3 * a, 2 * b, c) + '$ chỉ có đúng công thức $y = ' + poly + '$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (suy biến bậc hai)', params: { a: 0, x1: 0, x2: 2, d: 0 }, expectedValid: false },
      { label: 'Biên x1 + x2 lẻ (hệ số b không nguyên)', params: { a: 1, x1: 0, x2: 1, d: 2 }, expectedValid: false },
      { label: 'Biên mẫu chuẩn x1 = 0, x2 = 2, d = 0', params: { a: -1, x1: 0, x2: 2, d: 0 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2)
  t12_b4_d02_rational_1_1_graph_mc: {
    id: 't12_b4_d02_rational_1_1_graph_mc',
    name: 'Nhận diện hàm phân thức bậc nhất/bậc nhất từ đồ thị',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho đồ thị hàm số phân thức y = (ax + b)/(cx + d) kèm hai đường tiệm cận. Xác định công thức hàm số tương ứng.',
    conditionSummary: 'c ≠ 0, ad - bc ≠ 0, hai đường tiệm cận nằm gọn trong khung [-5; 5]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -4, max: 4, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0 để tiệm cận và giao điểm rõ nét' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm hàm suy biến thành hàm hằng' };
      if (Math.abs(a) > 8 || Math.abs(b) > 8 || Math.abs(c) > 8 || Math.abs(d) > 8) {
        return { valid: false, reason: 'Giới hạn hệ số <= 8 để hai tiệm cận hiển thị cân đối' };
      }
      if (Math.abs(-d / c) > 4.5 || Math.abs(a / c) > 4.5) {
        return { valid: false, reason: 'Đường tiệm cận vượt quá khung đồ thị chuẩn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const num = u.formatLinear(a, b);
      const den = u.formatLinear(c, d);
      const vAsym = u.simplifyFrac(-d, c);
      const hAsym = u.simplifyFrac(a, c);
      const yInt = u.simplifyFrac(b, d);
      const correct = '$y = \\frac{' + num + '}{' + den + '}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$y = \\frac{' + den + '}{' + num + '}$',
          '$y = \\frac{' + u.formatLinear(a, -b) + '}{' + den + '}$',
          '$y = \\frac{' + num + '}{' + u.formatLinear(-c, d) + '}$',
        ],
        rng,
        (k) => '$y = \\frac{' + u.formatLinear(a, b + k + 2) + '}{' + den + '}$'
      );
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào?',
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
          verticalAsymptote: vAsym.value,
          obliqueAsymptote: { m: 0, q: hAsym.value },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị có đường tiệm cận đứng là $x = ' + vAsym.latex + '$ và tiệm cận ngang là $y = ' + hAsym.latex + '$.',
          'Đồ thị cắt trục tung tại $(0; ' + yInt.latex + ')$ và có chiều biến thiên ' + (a * d - b * c > 0 ? 'đồng biến' : 'nghịch biến') + ' trên từng khoảng xác định.',
          'Đối chiếu các phương án ta chọn được hàm số ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0 (mất mẫu bậc nhất)', params: { a: 3, b: 2, c: 0, d: -1 }, expectedValid: false },
      { label: 'Biên suy biến ad - bc = 0', params: { a: 2, b: 4, c: 1, d: 2 }, expectedValid: false },
      { label: 'Biên chuẩn a=3, b=2, c=-4, d=-1', params: { a: 3, b: 2, c: -4, d: -1 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3)
  t12_b4_d03_rational_1_1_bbt_mc: {
    id: 't12_b4_d03_rational_1_1_bbt_mc',
    name: 'Nhận diện hàm phân thức bậc nhất/bậc nhất từ bảng biến thiên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Từ bảng biến thiên cho trước với tiệm cận đứng, tiệm cận ngang và dấu đạo hàm, xác định đúng công thức hàm số (ax+b)/(cx+d).',
    conditionSummary: 'c ≠ 0, ad - bc ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -3, max: 3, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm hàm suy biến thành hàm hằng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const num = u.formatLinear(a, b);
      const den = u.formatLinear(c, d);
      const vAsym = u.simplifyFrac(-d, c);
      const hAsym = u.simplifyFrac(a, c);
      const det = a * d - b * c;
      const inc = det > 0;
      const sign = inc ? '+' : '-';

      const correct = '$y = \\frac{' + num + '}{' + den + '}$';
      const dShift = d === -1 ? 2 : d + 1;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$y = \\frac{' + u.formatLinear(-a, b) + '}{' + den + '}$',
          '$y = \\frac{' + num + '}{' + u.formatLinear(-c, d) + '}$',
          '$y = \\frac{' + num + '}{' + u.formatLinear(c, dShift) + '}$',
        ],
        rng,
        (k) => '$y = \\frac{' + u.formatLinear(a, b + k + 2) + '}{' + u.formatLinear(c, d + k + 3) + '}$'
      );

      return {
        stem: 'Bảng biến thiên như hình vẽ dưới đây là của hàm số nào?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', vAsym.latex, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: sign },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: sign },
          ],
          yNodes: [
            { kind: 'single', pos: inc ? 'bot' : 'top', value: hAsym.latex },
            {
              kind: 'asymptote',
              leftPos: inc ? 'top' : 'bot',
              leftVal: inc ? '+\\infty' : '-\\infty',
              rightPos: inc ? 'bot' : 'top',
              rightVal: inc ? '-\\infty' : '+\\infty',
            },
            { kind: 'single', pos: inc ? 'top' : 'bot', value: hAsym.latex },
          ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ bảng biến thiên ta thấy đồ thị có tiệm cận đứng $x = ' + vAsym.latex + '$ và tiệm cận ngang $y = ' + hAsym.latex + '$.',
          'Hàm số ' + (inc ? 'đồng biến ($y\' > 0$)' : 'nghịch biến ($y\' < 0$)') + ' trên từng khoảng xác định.',
          'Kiểm tra hàm ' + correct + ' cho $y\' = \\frac{' + det + '}{(' + den + ')^2} ' + (inc ? '> 0$' : '< 0$') + ' và đúng cả hai tiệm cận.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ad - bc = 0', params: { a: -2, b: 4, c: 1, d: -2 }, expectedValid: false },
      { label: 'Biên c = 0', params: { a: 3, b: 1, c: 0, d: 2 }, expectedValid: false },
      { label: 'Biên đồng biến chuẩn a=-3, b=-1, c=-2, d=-4', params: { a: -3, b: -1, c: -2, d: -4 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4)
  t12_b4_d04_cubic_bbt_mc: {
    id: 't12_b4_d04_cubic_bbt_mc',
    name: 'Nhận diện hàm số bậc ba từ bảng biến thiên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho bảng biến thiên của hàm bậc ba với hai cực trị nguyên. Tìm phương trình hàm số phù hợp.',
    conditionSummary: 'a ∈ {-1, 1}, hai cực trị nguyên x1 < x2 thỏa mãn (x1 + x2) chẵn',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'x1', label: 'Cực trị x1', min: -3, max: 1 },
      { name: 'x2', label: 'Cực trị x2', min: -1, max: 3 },
      { name: 'd', label: 'Hệ số d', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, x1, x2 } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1} để hệ số chuẩn' };
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2 để có hai cực trị phân biệt' };
      if ((x1 + x2) % 2 !== 0) return { valid: false, reason: 'Cần x1 + x2 chẵn để hệ số b nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2, d } = params;
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const f = (x) => a * x * x * x + b * x * x + c * x + d;
      const y1 = f(x1);
      const y2 = f(x2);
      const poly = u.formatPoly([a, b, c, d]);
      const upFirst = a > 0;

      const fakeCubic = u.formatPoly([a, b, c === 0 ? 3 : 2 * c, d - 1]);
      const fakeRational = '- \\frac{x}{' + u.formatShift('3 - x', 0).replace('3 - x', (x2 + 2) + ' - x') + '}';
      const fakeQuartic = u.formatPoly([-a, 0, 0, 0, 3]);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$y = ' + poly + '$',
        [
          '$y = ' + fakeCubic + '$',
          '$y = ' + fakeRational + '$',
          '$y = ' + fakeQuartic + '$',
        ],
        rng,
        (k) => '$y = ' + u.formatPoly([a, b, c, d + k + 2]) + '$'
      );

      return {
        stem: 'Hàm số nào dưới đây có bảng biến thiên như sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: upFirst ? '+' : '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: upFirst ? '-' : '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: upFirst ? '+' : '-' },
          ],
          yNodes: [
            { kind: 'single', pos: upFirst ? 'bot' : 'top', value: upFirst ? '-\\infty' : '+\\infty' },
            { kind: 'single', pos: upFirst ? 'top' : 'bot', value: '' + y1 },
            { kind: 'single', pos: upFirst ? 'bot' : 'top', value: '' + y2 },
            { kind: 'single', pos: upFirst ? 'top' : 'bot', value: upFirst ? '+\\infty' : '-\\infty' },
          ],
        },
        options,
        correctIndex,
        answerSummary: '$y = ' + poly + '$',
        solutionSteps: [
          'Bảng biến thiên có dạng của hàm bậc ba với $\\lim_{x\\to+\\infty} y = ' + (upFirst ? '+\\infty$' : '-\\infty$') + ' nên $a ' + (upFirst ? '> 0$' : '< 0$') + '.',
          'Hàm số đạt cực trị tại $x = ' + x1 + '$ ($y = ' + y1 + '$) và $x = ' + x2 + '$ ($y = ' + y2 + '$).',
          'Thay $x = ' + x1 + ', x = ' + x2 + '$ vào các phương án ta thấy chỉ có $y = ' + poly + '$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = x2', params: { a: -1, x1: 1, x2: 1, d: -1 }, expectedValid: false },
      { label: 'Biên a = 0', params: { a: 0, x1: -1, x2: 1, d: -1 }, expectedValid: false },
      { label: 'Biên đối xứng x1 = -1, x2 = 1', params: { a: -1, x1: -1, x2: 1, d: -1 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5)
  t12_b4_d05_rational_2_1_graph_mc: {
    id: 't12_b4_d05_rational_2_1_graph_mc',
    name: 'Nhận diện hàm phân thức bậc 2/bậc 1 từ đồ thị',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho đồ thị hàm phân thức bậc hai trên bậc nhất có đường tiệm cận đứng và tiệm cận xiên. Xác định công thức hàm số.',
    conditionSummary: 'a ∈ {-1, 1}, r ≠ 0 (không rút gọn được với mẫu), |q| ≤ 3, |x0| ≤ 3',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc TCX a', min: -1, max: 1, allowZero: false },
      { name: 'q', label: 'Tung độ gốc TCX q', min: -2, max: 2 },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -3, max: 3 },
      { name: 'r', label: 'Phần dư r', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { a, q, x0, r } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1} để tiệm cận xiên rõ nét' };
      if (r === 0) return { valid: false, reason: 'r = 0 làm tử chia hết cho mẫu, mất tiệm cận đứng' };
      if (Math.abs(q) > 3 || Math.abs(x0) > 3 || Math.abs(r) > 4) {
        return { valid: false, reason: 'Tham số ngoài miền khung đồ thị chuẩn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, q, x0, r } = params;
      // y = a x + q + r / (x - x0) = (a x^2 + (q - a x0) x + (r - q x0)) / (x - x0)
      const A = a;
      const B = q - a * x0;
      const C = r - q * x0;
      const numPoly = u.formatQuadratic(A, B, C);
      const denPoly = u.formatShift('x', -x0);
      const correct = '$y = \\frac{' + numPoly + '}{' + denPoly + '}$';

      const wrongDen = u.formatShift('x', x0 === 0 ? 1 : x0);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$y = \\frac{' + u.formatQuadratic(A, B, C - 4) + '}{' + denPoly + '}$',
          '$y = \\frac{' + u.formatQuadratic(3 * A, -B, C) + '}{' + wrongDen + '}$',
          '$y = \\frac{' + u.formatQuadratic(A, 0, r + 1) + '}{' + denPoly + '}$',
        ],
        rng,
        (k) => '$y = \\frac{' + u.formatQuadratic(A, B, C + k + 3) + '}{' + denPoly + '}$'
      );

      const xMin = x0 - 7;
      const xMax = x0 + 7;
      const yCenter = a * x0 + q;
      const yMin = yCenter - 8;
      const yMax = yCenter + 8;
      const xTicks = [-6, -4, -2, 2, 4, 6].map((v) => v + x0).filter((t) => t !== 0 && t > xMin && t < xMax);
      const yTicks = [-6, -4, -2, 2, 4, 6].map((v) => v + yCenter).filter((t) => t !== 0 && t > yMin && t < yMax);
      const asymObl = 'y = ' + u.formatLinear(a, q);

      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào?',
        diagram: {
          kind: 'function_plot',
          curveType: 'rational_2_1',
          coeffs: [A, B, C, 1, -x0],
          xMin,
          xMax,
          yMin,
          yMax,
          xTicks,
          yTicks,
          verticalAsymptote: x0,
          obliqueAsymptote: { m: a, q },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị có đường tiệm cận đứng là $x = ' + x0 + '$ nên loại các phương án có mẫu không triệt tiêu tại $x = ' + x0 + '$.',
          'Đồ thị có đường tiệm cận xiên là $' + asymObl + '$.',
          'Chia đa thức ta có $\\frac{' + numPoly + '}{' + denPoly + '} = ' + u.formatLinear(a, q) + (r > 0 ? ' + \\frac{' + r + '}{' + denPoly + '}' : ' - \\frac{' + Math.abs(r) + '}{' + denPoly + '}') + '$, hoàn toàn khớp với đồ thị.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 0 (tử chia hết cho mẫu)', params: { a: 1, q: 0, x0: -2, r: 0 }, expectedValid: false },
      { label: 'Biên a = 0 (mất bậc hai)', params: { a: 0, q: 1, x0: -2, r: 2 }, expectedValid: false },
      { label: 'Biên mẫu chuẩn x0 = -2, r = 2', params: { a: 1, q: 0, x0: -2, r: 2 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6)
  t12_b4_d06_cubic_ox_tangent_mc: {
    id: 't12_b4_d06_cubic_ox_tangent_mc',
    name: 'Đếm số giao điểm với trục hoành của đồ thị hàm bậc ba (có nghiệm kép)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tương giao đồ thị hàm số',
    description:
      'Cho hàm số bậc ba y = a(x - r1)^2(x - r2) ở dạng khai triển. Xác định số giao điểm với trục hoành.',
    conditionSummary: 'a ≠ 0 và r1 ≠ r2 để có đúng 1 nghiệm kép và 1 nghiệm đơn',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -2, max: 2, allowZero: false },
      { name: 'r1', label: 'Nghiệm kép r1', min: -4, max: 4 },
      { name: 'r2', label: 'Nghiệm đơn r2', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, r1, r2 } = params;
      if (a === 0) return { valid: false, reason: 'a = 0 suy biến thành hàm bậc hai' };
      if (r1 === r2) return { valid: false, reason: 'r1 = r2 tạo nghiệm bội ba, chỉ còn 1 giao điểm' };
      if (Math.abs(a) > 6 || Math.abs(r1) > 8 || Math.abs(r2) > 8) {
        return { valid: false, reason: 'Hệ số quá lớn gây tràn số khi khai triển' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, r1, r2 } = params;
      const A = a;
      const B = -a * (2 * r1 + r2);
      const C = a * (r1 * r1 + 2 * r1 * r2);
      const D = -a * r1 * r1 * r2;
      const poly = u.formatPoly([A, B, C, D]);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$2$',
        ['$0$', '$3$', '$1$'],
        rng,
        (k) => '$' + (k + 3) + '$'
      );
      return {
        stem: 'Cho hàm số $y = ' + poly + '$. Số giao điểm của đồ thị hàm số đã cho với trục hoành là:',
        options,
        correctIndex,
        answerSummary: '2',
        solutionSteps: [
          'Phương trình hoành độ giao điểm với trục $Ox$: $' + poly + ' = 0$.',
          'Phân tích thành nhân tử: $' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + u.formatShift('x', -r1) + ')^2(' + u.formatShift('x', -r2) + ') = 0 \\Leftrightarrow x = ' + r1 + '$ hoặc $x = ' + r2 + '$.',
          'Vì phương trình có đúng $2$ nghiệm phân biệt nên số giao điểm của đồ thị với trục hoành là $2$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r1 = r2 (nghiệm bội ba)', params: { a: 1, r1: -2, r2: -2 }, expectedValid: false },
      { label: 'Biên a = 0', params: { a: 0, r1: -3, r2: -1 }, expectedValid: false },
      { label: 'Biên chuẩn r1 = -3, r2 = -1', params: { a: 1, r1: -3, r2: -1 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7)
  t12_b4_d07_rational_line_inter_mc: {
    id: 't12_b4_d07_rational_line_inter_mc',
    name: 'Tìm số giao điểm của đồ thị phân thức (ax+b)/(cx+d) và đường thẳng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tương giao đồ thị hàm số',
    description:
      'Cho đồ thị hàm số y = (ax+b)/(cx+d) và đường thẳng y = mx + n. Xác định số giao điểm bằng cách xét phương trình hoành độ và điều kiện mẫu khác 0.',
    conditionSummary: 'c ≠ 0, m ≠ 0, nghiệm phương trình bậc hai không trùng với tiệm cận đứng x0',
    paramSpecs: [
      { name: 'c', label: 'Hệ số c của mẫu', min: -2, max: 2, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -3, max: 3 },
      { name: 'm', label: 'Hệ số góc m', min: -2, max: 2, allowZero: false },
      { name: 'r1', label: 'Nghiệm thứ nhất r1', min: -3, max: 2 },
      { name: 'r2', label: 'Nghiệm thứ hai r2', min: -2, max: 4 },
      { name: 'mode', label: 'Số nghiệm (0, 1 hoặc 2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { c, x0, m, r1, r2, mode } = params;
      if (c === 0 || m === 0) return { valid: false, reason: 'c và m phải khác 0' };
      if (mode !== 0 && mode !== 1 && mode !== 2) return { valid: false, reason: 'mode chỉ nhận 0, 1 hoặc 2' };
      if (Math.abs(x0) > 6 || Math.abs(r1) > 6 || Math.abs(r2) > 6 || Math.abs(c) > 4 || Math.abs(m) > 4) {
        return { valid: false, reason: 'Hệ số vượt quá phạm vi số đẹp' };
      }
      if (mode === 2 && (r1 >= r2 || r1 === x0 || r2 === x0)) {
        return { valid: false, reason: 'Cần r1 < r2 và khác tiệm cận đứng x0' };
      }
      if (mode === 1 && r1 === x0) {
        return { valid: false, reason: 'Nghiệm kép không được trùng tiệm cận đứng x0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, x0, m, r1, r2, mode } = params;
      const d = -c * x0;
      const n = -m * (r1 + 1);
      let p = 0;
      let q = 0;
      if (mode === 2) {
        p = -(r1 + r2);
        q = r1 * r2;
      } else if (mode === 1) {
        p = -2 * r1;
        q = r1 * r1;
      } else {
        p = -2 * r1;
        q = r1 * r1 + 1;
      }
      const a = m * d + n * c - m * c * p;
      const b = n * d - m * c * q;
      const numPoly = u.formatLinear(a, b);
      const denPoly = u.formatLinear(c, d);
      const linePoly = u.formatLinear(m, n);
      const quadPoly = u.formatQuadratic(1, p, q);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + mode + '$',
        ['$0$', '$1$', '$2$', '$3$', '$4$'].filter((v) => v !== '$' + mode + '$'),
        rng,
        (k) => '$' + (k + 4) + '$'
      );

      const rootDetail =
        mode === 2
          ? 'có hai nghiệm phân biệt $x = ' + r1 + '$ và $x = ' + r2 + '$ (đều khác $' + x0 + '$).'
          : mode === 1
          ? 'có nghiệm kép $x = ' + r1 + ' \\neq ' + x0 + '$.'
          : 'vô nghiệm vì $\\Delta < 0$.';

      return {
        stem: 'Tìm số giao điểm của đồ thị các hàm số $y = \\frac{' + numPoly + '}{' + denPoly + '}$ và $y = ' + linePoly + '$.',
        options,
        correctIndex,
        answerSummary: '' + mode,
        solutionSteps: [
          'Điều kiện xác định: $x \\neq ' + x0 + '$.',
          'Phương trình hoành độ giao điểm: $\\frac{' + numPoly + '}{' + denPoly + '} = ' + linePoly + ' \\Leftrightarrow ' + quadPoly + ' = 0$.',
          'Phương trình bậc hai ' + rootDetail + ' Vậy có đúng $' + mode + '$ giao điểm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { c: 0, x0: 1, m: -2, r1: -1, r2: 2, mode: 2 }, expectedValid: false },
      { label: 'Biên nghiệm trùng tiệm cận đứng', params: { c: 1, x0: 2, m: 1, r1: 2, r2: 3, mode: 2 }, expectedValid: false },
      { label: 'Biên có 2 giao điểm phân biệt', params: { c: -4, x0: 1, m: -2, r1: -1, r2: 2, mode: 2 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8)
  t12_b4_d08_rational_1_1_center_mc: {
    id: 't12_b4_d08_rational_1_1_center_mc',
    name: 'Tìm tâm đối xứng của đồ thị hàm phân thức bậc nhất/bậc nhất',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đồ thị hàm số phân thức',
    description:
      'Tìm tọa độ tâm đối xứng I(-d/c; a/c) của đồ thị hàm số y = (ax + b)/(cx + d).',
    conditionSummary: 'a ≠ 0, c ≠ 0, d ≠ 0 và ad - bc ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6 },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || c === 0 || d === 0) return { valid: false, reason: 'a, c, d phải khác 0 để tâm đối xứng không nằm trên trục tọa độ' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm hàm suy biến thành hàm hằng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const num = u.formatLinear(a, b);
      const den = u.formatLinear(c, d);
      const xI = u.simplifyFrac(-d, c);
      const yI = u.simplifyFrac(a, c);
      const negXI = u.simplifyFrac(d, c);
      const negYI = u.simplifyFrac(-a, c);
      const fmtPt = (xL, yL) => '$\\left(' + xL + ';\\, ' + yL + '\\right)$';
      const correct = fmtPt(xI.latex, yI.latex);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtPt(xI.latex, negYI.latex),
          fmtPt(negXI.latex, yI.latex),
          fmtPt(negXI.latex, negYI.latex),
        ],
        rng,
        (k) => fmtPt(u.simplifyFrac(-d + k, c).latex, yI.latex)
      );
      return {
        stem: 'Đồ thị hàm số $y = \\frac{' + num + '}{' + den + '}$ nhận điểm nào làm tâm đối xứng trong các điểm sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị hàm số có đường tiệm cận đứng là $x = ' + xI.latex + '$ và tiệm cận ngang là $y = ' + yI.latex + '$.',
          'Tâm đối xứng của đồ thị là giao điểm của hai đường tiệm cận: ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { a: 5, b: 2, c: 0, d: -2 }, expectedValid: false },
      { label: 'Biên ad - bc = 0', params: { a: 4, b: 2, c: 2, d: 1 }, expectedValid: false },
      { label: 'Biên chuẩn a=5, b=2, c=4, d=-2', params: { a: 5, b: 2, c: 4, d: -2 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9)
  t12_b4_d09_rational_2_1_center_mc: {
    id: 't12_b4_d09_rational_2_1_center_mc',
    name: 'Tìm tâm đối xứng của đồ thị hàm phân thức bậc 2/bậc 1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đồ thị hàm số phân thức',
    description:
      'Tìm tọa độ giao điểm hai tiệm cận (tâm đối xứng) của đồ thị hàm số y = (Ax^2 + Bx + C)/(px + q).',
    conditionSummary: 'm ≠ 0, p > 0, q ≠ 0, phần dư r ≠ 0',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc TCX m', min: -3, max: 3, allowZero: false },
      { name: 'k', label: 'Hằng số TCX k', min: -4, max: 4 },
      { name: 'p', label: 'Hệ số mẫu p', min: 1, max: 3 },
      { name: 'q', label: 'Hằng số mẫu q', min: -4, max: 4, allowZero: false },
      { name: 'r', label: 'Phần dư r', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { m, k, p, q, r } = params;
      if (m === 0 || p <= 0 || q === 0 || r === 0) {
        return { valid: false, reason: 'Cần m ≠ 0, p > 0, q ≠ 0 và phần dư r ≠ 0' };
      }
      if (Math.abs(m) > 20 || Math.abs(k) > 20 || p > 10 || Math.abs(q) > 20) {
        return { valid: false, reason: 'Giới hạn hệ số để phân số gọn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, k, p, q, r } = params;
      const A = m * p;
      const B = m * q + k * p;
      const C = k * q + r;
      const numPoly = u.formatQuadratic(A, B, C);
      const denPoly = u.formatLinear(p, q);
      const xI = u.simplifyFrac(-q, p);
      const yI = u.simplifyFrac(-m * q + k * p, p);
      const negXI = u.simplifyFrac(q, p);
      const fmtPt = (xL, yL) => '$\\left(' + xL + ';\\, ' + yL + '\\right)$';
      const correct = fmtPt(xI.latex, yI.latex);

      const remLatex = (r >= 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(r) + '}{' + denPoly + '}';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtPt(xI.latex, '' + (yI.isInteger ? yI.num + 2 : Math.round(yI.value) + 4)),
          fmtPt(negXI.latex, yI.latex),
          fmtPt(negXI.latex, u.simplifyFrac(-r, p * 2).latex),
        ],
        rng,
        (step) => fmtPt(xI.latex, u.simplifyFrac(-m * q + k * p + step, p).latex)
      );

      return {
        stem: 'Đồ thị hàm số $y = \\frac{' + numPoly + '}{' + denPoly + '}$ nhận điểm nào làm tâm đối xứng trong các điểm sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia tử cho mẫu: $y = \\frac{' + numPoly + '}{' + denPoly + '} = ' + u.formatLinear(m, k) + remLatex + '$.',
          'Đồ thị có tiệm cận đứng $x = ' + xI.latex + '$ và tiệm cận xiên $y = ' + u.formatLinear(m, k) + '$.',
          'Tâm đối xứng của đồ thị là giao điểm hai tiệm cận: ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 0 (tử chia hết cho mẫu)', params: { m: 2, k: 1, p: 3, q: 1, r: 0 }, expectedValid: false },
      { label: 'Biên m = 0 (không phải bậc 2/bậc 1)', params: { m: 0, k: 1, p: 3, q: 1, r: -5 }, expectedValid: false },
      { label: 'Biên chuẩn m=2, k=1, p=3, q=1, r=-5', params: { m: 2, k: 1, p: 3, q: 1, r: -5 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10)
  t12_b4_d10_cubic_center_mc: {
    id: 't12_b4_d10_cubic_center_mc',
    name: 'Tìm tâm đối xứng (điểm uốn) của đồ thị hàm số bậc ba',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khảo sát hàm số bậc ba',
    description:
      'Tìm tọa độ điểm uốn (tâm đối xứng) của đồ thị hàm số y = ax^3 + bx^2 + cx + d bằng điều kiện y\'\' = 0.',
    conditionSummary: 'a ≠ 0 và các hệ số nằm trong [-12; 12] để tính phân số chính xác tuyệt đối',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -5, max: 5 },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6 },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0) return { valid: false, reason: 'a = 0 suy biến thành hàm bậc hai, không có tâm đối xứng' };
      if (Math.abs(a) > 12 || Math.abs(b) > 12 || Math.abs(c) > 12 || Math.abs(d) > 12) {
        return { valid: false, reason: 'Hệ số vượt giới hạn tính phân số bậc ba chính xác' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const poly = u.formatPoly([a, b, c, d]);
      const xI = u.simplifyFrac(-b, 3 * a);
      const p = xI.num;
      const q = xI.den;
      const yNum = a * p * p * p + b * p * p * q + c * p * q * q + d * q * q * q;
      const yDen = q * q * q;
      const yI = u.simplifyFrac(yNum, yDen);

      const fakeX1 = u.simplifyFrac(-b, a === 0 ? 1 : a);
      const fakeY1 = u.simplifyFrac(a * fakeX1.num * fakeX1.num * fakeX1.num + b * fakeX1.num * fakeX1.num * fakeX1.den + c * fakeX1.num * fakeX1.den * fakeX1.den + d * Math.pow(fakeX1.den, 3), Math.pow(fakeX1.den, 3));
      const fakeX2 = u.simplifyFrac(-b, 2 * a);
      const fakeY2 = u.simplifyFrac(yI.num + 3, yI.den);
      const fmtPt = (xL, yL) => '$\\left(' + xL + ';\\, ' + yL + '\\right)$';
      const correct = fmtPt(xI.latex, yI.latex);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtPt(fakeX1.latex, fakeY1.latex),
          fmtPt('0', '' + d),
          fmtPt(fakeX2.latex, fakeY2.latex),
        ],
        rng,
        (k) => fmtPt(xI.latex, u.simplifyFrac(yI.num + k + 5, yI.den).latex)
      );

      return {
        stem: 'Đồ thị hàm số $y = ' + poly + '$ nhận điểm nào làm tâm đối xứng trong các điểm sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đạo hàm cấp một: $y\' = ' + u.formatQuadratic(3 * a, 2 * b, c) + '$.',
          'Đạo hàm cấp hai: $y\'\' = ' + u.formatLinear(6 * a, 2 * b) + '$.',
          'Giải $y\'\' = 0 \\Rightarrow x_I = ' + xI.latex + '$, suy ra $y_I = f\\left(' + xI.latex + '\\right) = ' + yI.latex + '$. Vậy tâm đối xứng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (parabol không có tâm đối xứng)', params: { a: 0, b: -1, c: -4, d: 6 }, expectedValid: false },
      { label: 'Biên b = 0 (tâm nằm trên Oy)', params: { a: 1, b: 0, c: -3, d: 2 }, expectedValid: true },
      { label: 'Biên chuẩn a=-3, b=-1, c=-4, d=6', params: { a: -3, b: -1, c: -4, d: 6 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11)
  t12_b4_d11_cubic_graph_roots_mc: {
    id: 't12_b4_d11_cubic_graph_roots_mc',
    name: 'Đếm số nghiệm phương trình f(x) = k từ đồ thị hàm bậc ba',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tương giao đồ thị hàm số',
    description:
      'Cho đồ thị hàm số bậc ba y = f(x) đạt cực trị tại x = ±1. Đếm số nghiệm của phương trình f(x) = k bằng tương giao.',
    conditionSummary: 'a ∈ {-1, 1}, |d| ≤ 2, |k| ≤ 5',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'd', label: 'Dịch đứng d', min: -2, max: 2 },
      { name: 'k', label: 'Hằng số k', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, d, k } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1} để cực trị rõ trên lưới tọa độ' };
      if (Math.abs(d) > 3 || Math.abs(k) > 5) return { valid: false, reason: 'Tham số ngoài khung đồ thị chuẩn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, d, k } = params;
      // y = a x^3 - 3 a x + d => extrema at x = -1 and x = 1 with values d - 2 and d + 2
      const yMinExt = d - 2;
      const yMaxExt = d + 2;
      let roots = 1;
      if (k > yMinExt && k < yMaxExt) roots = 3;
      else if (k === yMinExt || k === yMaxExt) roots = 2;
      else roots = 1;

      const yMinPlot = Math.min(-4, yMinExt - 2);
      const yMaxPlot = Math.max(4, yMaxExt + 2);
      const yTicks = Array.from(new Set([-2, -1, 1, 2, yMinExt, yMaxExt])).filter((t) => t !== 0 && t > yMinPlot && t < yMaxPlot).sort((p, q) => p - q);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + roots + '$',
        ['$1$', '$2$', '$3$', '$4$', '$0$'].filter((v) => v !== '$' + roots + '$'),
        rng,
        (step) => '$' + (step + 4) + '$'
      );

      return {
        stem: 'Cho hàm số $y = f(x)$ có đồ thị như hình vẽ dưới đây. Số nghiệm của phương trình $f(x) = ' + k + '$ là:',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [a, 0, -3 * a, d],
          xMin: -4,
          xMax: 4,
          yMin: yMinPlot,
          yMax: yMaxPlot,
          xTicks: [-3, -2, -1, 1, 2, 3],
          yTicks,
          highlightPoints: [
            { x: -1, y: a > 0 ? yMaxExt : yMinExt },
            { x: 1, y: a > 0 ? yMinExt : yMaxExt },
          ],
        },
        options,
        correctIndex,
        answerSummary: '' + roots,
        solutionSteps: [
          'Số nghiệm của phương trình $f(x) = ' + k + '$ chính là số giao điểm của đồ thị hàm số $y = f(x)$ và đường thẳng nằm ngang $y = ' + k + '$.',
          'Từ đồ thị ta thấy giá trị cực tiểu $y_{\\text{CT}} = ' + yMinExt + '$ và giá trị cực đại $y_{\\text{CĐ}} = ' + yMaxExt + '$.',
          'Vì $' + k + (roots === 3 ? ' \\in (' + yMinExt + ';\\, ' + yMaxExt + ')$ nên đường thẳng $y = ' + k + '$ cắt đồ thị tại $3$ điểm phân biệt.' : roots === 2 ? '$ trùng với giá trị cực trị nên cắt đồ thị tại $2$ điểm phân biệt.' : '$ nằm ngoài đoạn $[' + yMinExt + ';\\, ' + yMaxExt + ']$ nên chỉ cắt đồ thị tại $1$ điểm.'),
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, d: 0, k: 1 }, expectedValid: false },
      { label: 'Biên tiếp xúc cực trị (2 nghiệm)', params: { a: -1, d: 0, k: 2 }, expectedValid: true },
      { label: 'Biên 3 nghiệm phân biệt', params: { a: -1, d: 0, k: -1 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12)
  t12_b4_d12_cubic_ox_3roots_mc: {
    id: 't12_b4_d12_cubic_ox_3roots_mc',
    name: 'Đếm số giao điểm với trục hoành của đồ thị hàm bậc ba (3 nghiệm phân biệt)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tương giao đồ thị hàm số',
    description:
      'Cho hàm số bậc ba y = a(x - r1)(x - r2)(x - r3) ở dạng khai triển. Xác định số giao điểm với trục hoành.',
    conditionSummary: 'a ≠ 0 và ba nghiệm nguyên phân biệt r1 < r2 < r3',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 4 },
      { name: 'r1', label: 'Nghiệm r1', min: -3, max: 3 },
      { name: 'r2', label: 'Nghiệm r2', min: -1, max: 6 },
      { name: 'r3', label: 'Nghiệm r3', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, r1, r2, r3 } = params;
      if (a === 0) return { valid: false, reason: 'a = 0 suy biến thành hàm bậc hai' };
      if (!(r1 < r2 && r2 < r3)) return { valid: false, reason: 'Cần ba nghiệm phân biệt r1 < r2 < r3' };
      if (Math.abs(a) > 8 || Math.abs(r1) > 10 || Math.abs(r2) > 10 || Math.abs(r3) > 10) {
        return { valid: false, reason: 'Hệ số vượt giới hạn để khai triển gọn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, r1, r2, r3 } = params;
      const A = a;
      const B = -a * (r1 + r2 + r3);
      const C = a * (r1 * r2 + r2 * r3 + r3 * r1);
      const D = -a * r1 * r2 * r3;
      const poly = u.formatPoly([A, B, C, D]);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$3$',
        ['$0$', '$1$', '$2$'],
        rng,
        (k) => '$' + (k + 3) + '$'
      );
      return {
        stem: 'Cho hàm số $y = ' + poly + '$. Số giao điểm của đồ thị hàm số đã cho với trục hoành là:',
        options,
        correctIndex,
        answerSummary: '3',
        solutionSteps: [
          'Xét phương trình hoành độ giao điểm với trục $Ox$: $' + poly + ' = 0$.',
          'Phân tích thành nhân tử: $' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + u.formatShift('x', -r1) + ')(' + u.formatShift('x', -r2) + ')(' + u.formatShift('x', -r3) + ') = 0 \\Leftrightarrow x \\in \\{' + r1 + ';\\, ' + r2 + ';\\, ' + r3 + '\\}$.',
          'Vậy đồ thị hàm số cắt trục hoành tại $3$ điểm phân biệt.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên có hai nghiệm trùng r1 = r2', params: { a: 4, r1: 3, r2: 3, r3: 7 }, expectedValid: false },
      { label: 'Biên a = 0', params: { a: 0, r1: 1, r2: 2, r3: 3 }, expectedValid: false },
      { label: 'Biên chuẩn a=4, r1=3, r2=6, r3=7', params: { a: 4, r1: 3, r2: 6, r3: 7 }, expectedValid: true },
    ],
  },
};
