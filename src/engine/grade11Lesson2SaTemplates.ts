import { MathTemplate } from '../types/math';

const TRIG11_B2_SA_HELPERS = String.raw`
  const round1 = (val) => (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
  const fmtDec1 = (val) => {
    const r = round1(val);
    if (Number.isInteger(r)) return String(r);
    return String(r).replace('.', ',');
  };
  const gcd = (x, y) => {
    let a = Math.abs(Math.round(x));
    let b = Math.abs(Math.round(y));
    while (b !== 0) { const t = b; b = a % b; a = t; }
    return a || 1;
  };
  const simplifyRad = (rad) => {
    const rAbs = Math.abs(Math.round(rad));
    if (rAbs === 0) return { k: 0, r: 1 };
    let k = 1, rem = rAbs;
    for (let d = 2; d * d <= rem; d++) {
      while (rem % (d * d) === 0) {
        k *= d;
        rem /= d * d;
      }
    }
    return { k, r: rem };
  };
  const fmtRadFrac = (coef, rad, den) => {
    if (coef === 0 || rad === 0) return '0';
    const s = simplifyRad(rad);
    let c = coef * s.k;
    let d = den;
    if (d < 0) { c = -c; d = -d; }
    const g = gcd(c, d);
    c /= g;
    d /= g;
    if (s.r === 1) {
      return u.simplifyFrac(c, d).latex;
    }
    const sign = c < 0 ? '-' : '';
    const absC = Math.abs(c);
    const numStr = (absC === 1 ? '' : String(absC)) + '\\sqrt{' + s.r + '}';
    if (d === 1) return sign + numStr;
    return sign + '\\frac{' + numStr + '}{' + d + '}';
  };
  const fmtPiFrac = (num, den) => {
    const f = u.simplifyFrac(num, den);
    if (f.num === 0) return '0';
    if (f.den === 1) {
      if (f.num === 1) return '\\pi';
      if (f.num === -1) return '-\\pi';
      return f.num + '\\pi';
    }
    const sign = f.num < 0 ? '-' : '';
    const absN = Math.abs(f.num);
    return sign + '\\frac{' + (absN === 1 ? '' : absN) + '\\pi}{' + f.den + '}';
  };
  const fmtIntervalHalfPi = (m) => {
    const left = m === 0 ? '0' : fmtPiFrac(m, 2);
    const right = (m + 1) === 0 ? '0' : fmtPiFrac(m + 1, 2);
    return '\\left( ' + left + '; ' + right + ' \\right)';
  };
`;

export const G11_B2_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D19 (Q19): Cho sin α = √a/b với α thuộc khoảng góc phần tư I hoặc II -> Tính sin(α - π/2)
  t11_b2_d19_sin_alpha_minus_half_pi_sa: {
    id: 't11_b2_d19_sin_alpha_minus_half_pi_sa',
    name: 'Tính sin(α - π/2) khi biết sin α và khoảng của α (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức các góc liên quan',
    description: 'Cho sin α = √a/b và α thuộc khoảng (mπ/2; (m+1)π/2) ở phần tư I hoặc II. Tính sin(α - π/2), làm tròn đến hàng phần mười.',
    conditionSummary: '2 ≤ a < b², a không chính phương, tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Số trong căn √a', min: 2, max: 11 },
      { name: 'b', label: 'Mẫu số b', min: 5, max: 12 },
      { name: 'mIdx', label: 'Khoảng góc (0:(2π;5π/2), 1:(0;π/2), 2:(π/2;π), 3:(5π/2;3π))', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, mIdx } = params;
      if (a < 2 || b < 4 || a >= b * b) return { valid: false, reason: 'Cần 0 < √a/b < 1' };
      if (mIdx < 0 || mIdx > 3) return { valid: false, reason: 'Chỉ số khoảng ngoài miền' };
      const sa = Math.round(Math.sqrt(a));
      if (sa * sa === a) return { valid: false, reason: 'Chọn a không chính phương' };
      const val = Math.sqrt(b * b - a) / b;
      if (Math.abs((val * 10) % 1 - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, mIdx } = params;
      ` + TRIG11_B2_SA_HELPERS + String.raw`
      const mList = [4, 0, 1, 5];
      const m = mList[mIdx];
      // Q1 (m=4, 0) -> cos > 0 -> sin(α - π/2) = -cos < 0; Q2 (m=1, 5) -> cos < 0 -> sin(α - π/2) = -cos > 0
      const cosSign = (m === 4 || m === 0) ? 1 : -1;
      const r = b * b - a;
      const sinLatex = fmtRadFrac(1, a, b);
      const cosLatex = fmtRadFrac(cosSign, r, b);
      const targetLatex = fmtRadFrac(-cosSign, r, b);
      const val = (-cosSign * Math.sqrt(r)) / b;
      const ansR = round1(val);
      const shortAnswer = fmtDec1(ansR);
      const intervalLatex = fmtIntervalHalfPi(m);
      return {
        stem:
          'Cho $\\sin\\alpha = ' +
          sinLatex +
          '$, với $\\alpha \\in ' +
          intervalLatex +
          '$. Tính giá trị của $\\sin\\left(\\alpha - \\frac{\\pi}{2}\\right)$ (làm tròn kết quả đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\sin\\left(\\alpha - \\frac{\\pi}{2}\\right) = -\\sin\\left(\\frac{\\pi}{2} - \\alpha\\right) = -\\cos\\alpha$.',
          'Với $\\alpha \\in ' + intervalLatex + '$, ta có $\\cos\\alpha ' + (cosSign > 0 ? '> 0' : '< 0') + '$, nên $\\cos\\alpha = ' + cosLatex + '$.',
          'Suy ra $\\sin\\left(\\alpha - \\frac{\\pi}{2}\\right) = ' + targetLatex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 9 chính phương', params: { a: 9, b: 10, mIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (sin α = √7/10, (2π; 5π/2))', params: { a: 7, b: 10, mIdx: 0 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Rút gọn A = (tan y + tan c).cot(y + c) + tan y.tan c + K
  t11_b2_d20_tan_cot_sum_identity_sa: {
    id: 't11_b2_d20_tan_cot_sum_identity_sa',
    name: 'Rút gọn biểu thức (tan y + tan c)cot(y + c) + tan y tan c + K (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng',
    description: 'Tính giá trị biểu thức A = (tan y + tan c).cot(y + c) + tan y.tan c + K với K nguyên.',
    conditionSummary: 'K ∈ [12; 250], kết quả bằng 1 + K',
    paramSpecs: [
      { name: 'K', label: 'Hằng số cộng thêm K', min: 12, max: 250 },
      { name: 'pairIdx', label: 'Cặp góc (0:(y,c), 1:(a,b), 2:(α,β), 3:(x,y))', min: 0, max: 3 },
    ],
    validateCode: `
      const { K, pairIdx } = params;
      if (K < 1 || pairIdx < 0 || pairIdx > 3) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { K, pairIdx } = params;
      const pairs = [['y', 'c'], ['a', 'b'], ['\\alpha', '\\beta'], ['x', 'y']];
      const uVar = pairs[pairIdx][0];
      const vVar = pairs[pairIdx][1];
      const ans = 1 + K;
      return {
        stem:
          'Rút gọn biểu thức $A = \\left(\\tan ' +
          uVar +
          ' + \\tan ' +
          vVar +
          '\\right)\\cdot\\cot(' +
          uVar +
          ' + ' +
          vVar +
          ') + \\tan ' +
          uVar +
          '\\cdot\\tan ' +
          vVar +
          ' + ' +
          K +
          '$ (với các giá trị của $' +
          uVar +
          ', ' +
          vVar +
          '$ làm biểu thức có nghĩa).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Áp dụng công thức cộng tang: $\\tan(' + uVar + ' + ' + vVar + ') = \\dfrac{\\tan ' + uVar + ' + \\tan ' + vVar + '}{1 - \\tan ' + uVar + '\\tan ' + vVar + '}$, suy ra $\\cot(' + uVar + ' + ' + vVar + ') = \\dfrac{1 - \\tan ' + uVar + '\\tan ' + vVar + '}{\\tan ' + uVar + ' + \\tan ' + vVar + '}$.',
          'Thay vào biểu thức: $A = \\left(\\tan ' + uVar + ' + \\tan ' + vVar + '\\right)\\cdot\\dfrac{1 - \\tan ' + uVar + '\\tan ' + vVar + '}{\\tan ' + uVar + ' + \\tan ' + vVar + '} + \\tan ' + uVar + '\\tan ' + vVar + ' + ' + K + ' = 1 - \\tan ' + uVar + '\\tan ' + vVar + ' + \\tan ' + uVar + '\\tan ' + vVar + ' + ' + K + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên K <= 0', params: { K: 0, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (K = 157 -> 158)', params: { K: 157, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Cho hai góc nhọn cos a = p1/q1, cos b = p2/q2 -> Tính cos(a+b)cos(a-b) làm tròn hàng phần mười
  t11_b2_d21_cos_sum_diff_product_sa: {
    id: 't11_b2_d21_cos_sum_diff_product_sa',
    name: 'Tính gần đúng cos(a + b)cos(a - b) từ cos a và cos b (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng và biến đổi tích thành tổng',
    description: 'Cho hai góc nhọn a, b biết cos a = p1/q1 và cos b = p2/q2. Tính cos(a+b)cos(a-b) làm tròn hàng phần mười.',
    conditionSummary: '0 < p1 < q1, 0 < p2 < q2, tối giản, tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'p1', label: 'Tử số cos a', min: 1, max: 6 },
      { name: 'q1', label: 'Mẫu số cos a', min: 3, max: 8 },
      { name: 'p2', label: 'Tử số cos b', min: 1, max: 6 },
      { name: 'q2', label: 'Mẫu số cos b', min: 3, max: 8 },
    ],
    validateCode: `
      const { p1, q1, p2, q2 } = params;
      if (p1 <= 0 || p1 >= q1 || p2 <= 0 || p2 >= q2) return { valid: false, reason: 'Cần 0 < cos < 1' };
      const gcd = (x, y) => { let a = x, b = y; while (b !== 0) { const t = b; b = a % b; a = t; } return a; };
      if (gcd(p1, q1) !== 1 || gcd(p2, q2) !== 1) return { valid: false, reason: 'Phân số chưa tối giản' };
      if (p1 === p2 && q1 === q2) return { valid: false, reason: 'Chọn hai phân số khác nhau' };
      const val = (p1 * p1) / (q1 * q1) + (p2 * p2) / (q2 * q2) - 1;
      if (Math.abs((Math.abs(val) * 10) % 1 - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, q1, p2, q2 } = params;
      ` + TRIG11_B2_SA_HELPERS + String.raw`
      const cosA = u.simplifyFrac(p1, q1);
      const cosB = u.simplifyFrac(p2, q2);
      const cos2A = u.simplifyFrac(p1 * p1, q1 * q1);
      const cos2B = u.simplifyFrac(p2 * p2, q2 * q2);
      const den = q1 * q1 * q2 * q2;
      const num = p1 * p1 * q2 * q2 + p2 * p2 * q1 * q1 - den;
      const ansFrac = u.simplifyFrac(num, den);
      const ansR = round1(ansFrac.value);
      const shortAnswer = fmtDec1(ansR);
      return {
        stem:
          'Cho hai góc nhọn $a$ và $b$ có $\\cos a = ' +
          cosA.latex +
          '$ và $\\cos b = ' +
          cosB.latex +
          '$. Tính giá trị biểu thức $\\cos(a + b)\\cos(a - b)$ (làm tròn kết quả đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\cos(a + b)\\cos(a - b) = \\frac{1}{2}(\\cos 2a + \\cos 2b) = \\cos^2 a + \\cos^2 b - 1$.',
          'Thay số: $\\left(' + cosA.latex + '\\right)^2 + \\left(' + cosB.latex + '\\right)^2 - 1 = ' + cos2A.latex + ' + ' + cos2B.latex + ' - 1 = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1 = q1', params: { p1: 4, q1: 4, p2: 6, q2: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (3/4 và 6/7 -> 0,3)', params: { p1: 3, q1: 4, p2: 6, q2: 7 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Cho cos 4a = (q² - p²)/(q² + p²) với π/4 < a < π/2 -> Tính tan 2a làm tròn hàng phần mười
  t11_b2_d22_cos4a_to_tan2a_sa: {
    id: 't11_b2_d22_cos4a_to_tan2a_sa',
    name: 'Tính tan(2a) khi biết cos(4a) và π/4 < a < π/2 (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân đôi và hạ bậc',
    description: 'Cho cos 4a = (q² - p²)/(q² + p²) với π/4 < a < π/2. Tính giá trị tan 2a (làm tròn đến hàng phần mười).',
    conditionSummary: 'p > q ≥ 2, gcd(p, q) = 1; chấp nhận bộ chuẩn (5, 4) -> -1,3 và tránh ranh giới .x5 ở bộ khác',
    paramSpecs: [
      { name: 'p', label: 'Tham số p (tử |tan 2a|)', min: 3, max: 11 },
      { name: 'q', label: 'Tham số q (mẫu |tan 2a|)', min: 2, max: 7 },
    ],
    validateCode: `
      const { p, q } = params;
      if (q < 2 || p <= q) return { valid: false, reason: 'Cần p > q >= 2 để cos 4a âm hợp lệ' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Cần gcd(p, q) = 1' };
      if (!(p === 5 && q === 4)) {
        const val = p / q;
        if (Math.abs((val * 10) % 1 - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      ` + TRIG11_B2_SA_HELPERS + String.raw`
      const cos4a = u.simplifyFrac(q * q - p * p, q * q + p * p);
      const rSq = q * q + p * p;
      const cos2Sq = u.simplifyFrac(q * q, rSq);
      const sin2Sq = u.simplifyFrac(p * p, rSq);
      const cos2Val = fmtRadFrac(-q, rSq, rSq);
      const sin2Val = fmtRadFrac(p, rSq, rSq);
      const tan2Frac = u.simplifyFrac(-p, q);
      const ansR = round1(-p / q);
      const shortAnswer = fmtDec1(ansR);
      return {
        stem:
          'Cho $\\cos 4a = ' +
          cos4a.latex +
          '$ và $\\frac{\\pi}{4} < a < \\frac{\\pi}{2}$. Giá trị của $\\tan 2a$ bằng bao nhiêu (làm tròn kết quả đến hàng phần mười)?',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Áp dụng công thức hạ bậc: $\\cos^2 2a = \\frac{1 + \\cos 4a}{2} = \\frac{1 + \\left(' + cos4a.latex + '\\right)}{2} = ' + cos2Sq.latex + '$.',
          'Do $\\frac{\\pi}{4} < a < \\frac{\\pi}{2} \\Rightarrow \\frac{\\pi}{2} < 2a < \\pi$, nên $\\cos 2a < 0$ và $\\sin 2a > 0$. Suy ra $\\cos 2a = ' + cos2Val + '$ và $\\sin 2a = \\sqrt{1 - \\cos^2 2a} = ' + sin2Val + '$.',
          'Vậy $\\tan 2a = \\frac{\\sin 2a}{\\cos 2a} = ' + tan2Frac.latex + ' \\approx ' + shortAnswer + '$ (với $\\sin^2 2a = ' + sin2Sq.latex + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p <= q', params: { p: 3, q: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (cos 4a = -9/41 -> -1,3)', params: { p: 5, q: 4 }, expectedValid: true },
    ],
  },
};
