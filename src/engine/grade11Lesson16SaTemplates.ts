import { MathTemplate } from '../types/math';

export const G11_B16_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D21 (Q21): Giới hạn 0/0 tử bậc 2, mẫu bậc 1 (làm tròn 1 chữ số thập phân)
  t11_b16_d21_sa_00_quad_lin: {
    id: 't11_b16_d21_sa_00_quad_lin',
    name: 'Khử dạng vô định 0/0 tử bậc hai trên mẫu bậc nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (a(x - x0)(x - r))/(k(x - x0)) làm tròn đến hàng phần mười.',
    conditionSummary: 'x0 ∈ [-4; 6]\\{0}, r ∈ [-5; 5], r ≠ x0, a ∈ {-2, -1, 1, 2}, k ∈ [2; 7], tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -4, max: 6, allowZero: false },
      { name: 'r', label: 'Nghiệm thứ hai r của tử', min: -5, max: 5 },
      { name: 'a', label: 'Hệ số x^2 ở tử', min: -2, max: 2, allowZero: false },
      { name: 'k', label: 'Hệ số x ở mẫu', min: 2, max: 7 },
    ],
    validateCode: `
      const { x0, r, a, k } = params;
      if (x0 === 0 || a === 0 || k < 2 || r === x0) return { valid: false, reason: 'Tham số suy biến' };
      const num = Math.abs(a * (x0 - r));
      if ((20 * num) % (2 * k) === k) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r, a, k } = params;
      const numPoly = u.formatQuadratic(a, -a * (x0 + r), a * x0 * r);
      const denPoly = u.formatLinear(k, -k * x0);

      const ansF = u.simplifyFrac(a * (x0 - r), k);
      const val = ansF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Phân tích tử thức và khử nhân tử chung $(' + u.formatShift('x', -x0) + ')$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '} = \\dfrac{' + (a * (x0 - r)) + '}{' + k + '} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên đuôi .x5 (a=-1, x0=5, r=4, k=4 -> -0,25)', params: { x0: 5, r: 4, a: -1, k: 4 }, expectedValid: false },
      { label: 'Mẫu ổn định (x0=5, r=4, a=-1, k=3 -> -0,3)', params: { x0: 5, r: 4, a: -1, k: 3 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Giới hạn 0/0 tử bậc 2 trên mẫu bậc 2 (làm tròn 1 chữ số thập phân)
  t11_b16_d22_sa_00_quad_quad: {
    id: 't11_b16_d22_sa_00_quad_quad',
    name: 'Khử dạng vô định 0/0 tử bậc hai trên mẫu bậc hai (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (a(x - x0)(x - r1))/(b(x - x0)(x - r2)) làm tròn đến hàng phần mười.',
    conditionSummary: 'x0 ∈ [1; 5], r1, r2 ∈ [-6; 4]\\{x0}, a ∈ [1; 3], b ∈ [1; 2], tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: 1, max: 5 },
      { name: 'r1', label: 'Nghiệm thứ hai của tử', min: -5, max: 3 },
      { name: 'r2', label: 'Nghiệm thứ hai của mẫu', min: -6, max: 4 },
      { name: 'a', label: 'Hệ số x^2 ở tử', min: 1, max: 3 },
      { name: 'b', label: 'Hệ số x^2 ở mẫu', min: 1, max: 2 },
    ],
    validateCode: `
      const { x0, r1, r2, a, b } = params;
      if (r1 === x0 || r2 === x0 || r1 === r2 || a < 1 || b < 1) return { valid: false, reason: 'Tham số suy biến' };
      const num = Math.abs(a * (x0 - r1));
      const den = Math.abs(b * (x0 - r2));
      if ((20 * num) % (2 * den) === den) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r1, r2, a, b } = params;
      const numPoly = u.formatQuadratic(a, -a * (x0 + r1), a * x0 * r1);
      const denPoly = u.formatQuadratic(b, -b * (x0 + r2), b * x0 * r2);

      const ansF = u.simplifyFrac(a * (x0 - r1), b * (x0 - r2));
      const val = ansF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Rút gọn nhân tử chung $(' + u.formatShift('x', -x0) + ')$ của cả tử và mẫu:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '} = \\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + u.formatLinear(a, -a * r1) + '}{' + u.formatLinear(b, -b * r2) + '} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r1 = r2', params: { x0: 3, r1: -3, r2: -3, a: 2, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (x0=3, r1=-3, r2=-6, a=2, b=1 -> 1,3)', params: { x0: 3, r1: -3, r2: -6, a: 2, b: 1 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Giới hạn 0/0 tử bậc 3 trên mẫu bậc 2 (làm tròn 1 chữ số thập phân)
  t11_b16_d23_sa_00_cubic_quad: {
    id: 't11_b16_d23_sa_00_cubic_quad',
    name: 'Khử dạng vô định 0/0 tử bậc ba trên mẫu bậc hai (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} ((x - x0)(x - r1)(x - r2))/(b(x - x0)(x - r3)) làm tròn đến hàng phần mười.',
    conditionSummary: 'x0 ∈ [2; 5], r1, r2, r3 ∈ [-5; 2]\\{x0}, b ∈ [1; 3], tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: 2, max: 5 },
      { name: 'r1', label: 'Nghiệm r1 của tử', min: -4, max: 2 },
      { name: 'r2', label: 'Nghiệm r2 của tử', min: -4, max: 1 },
      { name: 'r3', label: 'Nghiệm r3 của mẫu', min: -5, max: 1 },
      { name: 'b', label: 'Hệ số x^2 ở mẫu', min: 1, max: 3 },
    ],
    validateCode: `
      const { x0, r1, r2, r3, b } = params;
      if (r1 === x0 || r2 === x0 || r3 === x0 || r1 === r3 || r2 === r3 || b < 1) {
        return { valid: false, reason: 'Tham số suy biến' };
      }
      const num = Math.abs((x0 - r1) * (x0 - r2));
      const den = Math.abs(b * (x0 - r3));
      if ((20 * num) % (2 * den) === den) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r1, r2, r3, b } = params;
      const c2 = -(x0 + r1 + r2);
      const c1 = x0 * r1 + x0 * r2 + r1 * r2;
      const c0 = -x0 * r1 * r2;
      const numPoly = u.formatPoly([1, c2, c1, c0]);
      const denPoly = u.formatQuadratic(b, -b * (x0 + r3), b * x0 * r3);

      const ansF = u.simplifyFrac((x0 - r1) * (x0 - r2), b * (x0 - r3));
      const val = ansF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const redNum = u.formatQuadratic(1, -(r1 + r2), r1 * r2);
      const redDen = u.formatLinear(b, -b * r3);

      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Phân tích tử và mẫu theo nhân tử chung $(' + u.formatShift('x', -x0) + ')$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '} = \\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + redNum + '}{' + redDen + '} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r3 = x0', params: { x0: 4, r1: -1, r2: -2, r3: 4, b: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (x0=4 -> 15/8 = 1,9)', params: { x0: 4, r1: -1, r2: -2, r3: -4, b: 2 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Giới hạn 0/0 căn ở tử / bậc 1 ở mẫu (làm tròn 1 chữ số thập phân)
  t11_b16_d24_sa_00_sqrt_num_lin_den: {
    id: 't11_b16_d24_sa_00_sqrt_num_lin_den',
    name: 'Khử dạng vô định 0/0 căn thức trên bậc nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (√(ax + b) - m√p)/(k(x - x0)) làm tròn đến hàng phần mười.',
    conditionSummary: 'x0 ∈ [-4; 4], a ∈ [-8; -2] ∪ [2; 8], p ∈ {2, 3, 5}, m ∈ [1; 3], k ∈ [1; 3], tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -4, max: 4 },
      { name: 'a', label: 'Hệ số x dưới căn', min: -8, max: 8, allowZero: false },
      { name: 'pIdx', label: 'Chỉ số chọn p ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'm', label: 'Hệ số trước √p', min: 1, max: 3 },
      { name: 'k', label: 'Hệ số x ở mẫu', min: 1, max: 3 },
    ],
    validateCode: `
      const { x0, a, pIdx, m, k } = params;
      const PS = [2, 3, 5];
      if (pIdx < 0 || pIdx > 2 || Math.abs(a) < 2 || m < 1 || k < 1) return { valid: false, reason: 'Tham số ngoài miền' };
      const p = PS[pIdx];
      const val = a / (2 * k * m * Math.sqrt(p));
      const frac10 = Math.abs(val * 10) % 1;
      if (Math.abs(frac10 - 0.5) < 0.035) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, pIdx, m, k } = params;
      const PS = [2, 3, 5];
      const p = PS[pIdx];
      const c = m * m * p;
      const b = c - a * x0;
      const radInner = u.formatLinear(a, b);
      const mSqrtTex = (m === 1 ? '' : m) + '\\sqrt{' + p + '}';
      const denStr = u.formatLinear(k, -k * x0);

      const ansFrac = u.simplifyFrac(a, 2 * k * m * p);
      const val = a / (2 * k * m * Math.sqrt(p));
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const signF = ansFrac.num < 0 ? '-' : '';
      const absN = Math.abs(ansFrac.num);
      const exactTex = signF + '\\frac{' + (absN === 1 ? '' : absN) + '\\sqrt{' + p + '}}{' + ansFrac.den + '}';

      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{\\sqrt{' + radInner + '} - ' + mSqrtTex + '}{' + denStr + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Nhân liên hợp tử và mẫu rồi rút gọn nhân tử $(' + u.formatShift('x', -x0) + ')$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + a + '}{' + k + '\\left(\\sqrt{' + radInner + '} + ' + mSqrtTex + '\\right)} = ' + exactTex + ' \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { x0: -2, a: 1, pIdx: 1, m: 2, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (x0=-2, a=-7, p=3, m=2 -> -1)', params: { x0: -2, a: -7, pIdx: 1, m: 2, k: 1 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Giới hạn 0/0 s√(ax+b) - sm trên mẫu bậc 2 (làm tròn 1 chữ số thập phân)
  t11_b16_d25_sa_00_sqrt_num_quad_den: {
    id: 't11_b16_d25_sa_00_sqrt_num_quad_den',
    name: 'Khử dạng vô định 0/0 căn thức trên tam thức bậc hai (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (s√(ax + b) - sm)/(c(x - x0)(x - r)) làm tròn đến hàng phần mười.',
    conditionSummary: 'x0 ∈ [-3; 3], r ∈ [-4; 6]\\{x0}, c ∈ {-1, 1}, s ∈ [2; 6], a ∈ [2; 5], m ∈ [2; 4], tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -3, max: 3 },
      { name: 'r', label: 'Nghiệm thứ hai r của mẫu', min: -2, max: 6 },
      { name: 'c', label: 'Hệ số x^2 ở mẫu (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
      { name: 's', label: 'Hệ số nhân trước căn', min: 2, max: 6 },
      { name: 'a', label: 'Hệ số x dưới căn', min: 2, max: 5 },
      { name: 'm', label: 'Giá trị căn tại x0', min: 2, max: 4 },
    ],
    validateCode: `
      const { x0, r, c, s, a, m } = params;
      if (r === x0 || (c !== -1 && c !== 1) || s < 2 || a < 2 || m < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const num = Math.abs(s * a);
      const den = Math.abs(2 * m * c * (x0 - r));
      if ((20 * num) % (2 * den) === den) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r, c, s, a, m } = params;
      const b = m * m - a * x0;
      const radInner = u.formatLinear(a, b);
      const sm = s * m;
      const denPoly = u.formatQuadratic(c, -c * (x0 + r), c * x0 * r);

      const ansF = u.simplifyFrac(s * a, 2 * m * c * (x0 - r));
      const val = ansF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + s + '\\sqrt{' + radInner + '} - ' + sm + '}{' + denPoly + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Nhân liên hợp trên tử thức và phân tích mẫu thành $' + (c === -1 ? '-' : '') + '(' + u.formatShift('x', -x0) + ')(' + u.formatShift('x', -r) + ')$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + (s * a) + '}{' + (c === -1 ? '-' : '') + '(' + u.formatShift('x', -r) + ')\\left(\\sqrt{' + radInner + '} + ' + m + '\\right)} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên đuôi .x5 (Q25 gốc: 3/4 = 0,75)', params: { x0: -2, r: 4, c: -1, s: 6, a: 3, m: 2 }, expectedValid: false },
      { label: 'Mẫu ổn định (x0=-2, r=3, c=-1, s=6, a=3, m=2 -> 0,9)', params: { x0: -2, r: 3, c: -1, s: 6, a: 3, m: 2 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Giới hạn 0/0 bậc nhất ở tử / hiệu hai căn ở mẫu (làm tròn 1 chữ số thập phân)
  t11_b16_d26_sa_00_lin_num_sqrt_den: {
    id: 't11_b16_d26_sa_00_lin_num_sqrt_den',
    name: 'Khử dạng vô định 0/0 bậc nhất trên hiệu chứa căn ở mẫu (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (k(x - x0))/(√(ax + b) - √c) làm tròn đến hàng phần mười.',
    conditionSummary: 'x0 ∈ [-3; 5], k ∈ [1; 4], a ∈ [2; 6], b ∈ [-8; 10], c = ax0+b > 1 không chính phương, tránh .x5',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -3, max: 5 },
      { name: 'k', label: 'Hệ số x ở tử', min: 1, max: 4 },
      { name: 'a', label: 'Hệ số x dưới căn', min: 2, max: 6 },
      { name: 'b', label: 'Hằng số dưới căn', min: -8, max: 10 },
    ],
    validateCode: `
      const { x0, k, a, b } = params;
      if (k < 1 || a < 2) return { valid: false, reason: 'k hoặc a ngoài miền' };
      const c = a * x0 + b;
      if (c <= 1 || c > 35) return { valid: false, reason: 'c = ax0 + b ngoài (1; 35]' };
      const rt = Math.round(Math.sqrt(c));
      if (rt * rt === c) return { valid: false, reason: 'c không chính phương để giữ dạng căn' };
      const val = (2 * k * Math.sqrt(c)) / a;
      const frac10 = (val * 10) % 1;
      if (Math.abs(frac10 - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, k, a, b } = params;
      const c = a * x0 + b;
      let s = 1;
      for (let i = Math.floor(Math.sqrt(c)); i >= 2; i--) {
        if (c % (i * i) === 0) { s = i; break; }
      }
      const rem = c / (s * s);
      const radCTex = (s === 1 ? '' : s) + '\\sqrt{' + rem + '}';
      const numStr = u.formatLinear(k, -k * x0);
      const radInner = u.formatLinear(a, b);

      const coeff = u.simplifyFrac(2 * k * s, a);
      const exactTex = coeff.den === 1
        ? (coeff.num === 1 ? '' : coeff.num) + '\\sqrt{' + rem + '}'
        : '\\frac{' + (coeff.num === 1 ? '' : coeff.num) + '\\sqrt{' + rem + '}}{' + coeff.den + '}';

      const val = (2 * k * Math.sqrt(c)) / a;
      const rounded = Math.round(val * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numStr + '}{\\sqrt{' + radInner + '} - ' + radCTex + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Nhân cả tử và mẫu với lượng liên hợp $\\sqrt{' + radInner + '} + ' + radCTex + '$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + k + '\\left(\\sqrt{' + radInner + '} + ' + radCTex + '\\right)}{' + a + '} = ' + exactTex + ' \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c <= 1', params: { x0: 0, k: 1, a: 2, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (x0=3, k=1, a=2, b=-1 -> √5 ≈ 2,2)', params: { x0: 3, k: 1, a: 2, b: -1 }, expectedValid: true },
    ],
  },
};
