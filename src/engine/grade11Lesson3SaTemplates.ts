import { MathTemplate } from '../types/math';

const TRIG11_B3_SA_HELPERS = String.raw`
  const round1 = (val) => (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
  const fmtDec1 = (val) => {
    const r = round1(val);
    if (Number.isInteger(r)) return String(r);
    return String(r).replace('.', ',');
  };
  const fmtLinearTrig = (a, fnStr, b) => {
    const lead = a === 1 ? fnStr : a === -1 ? '-' + fnStr : String(a) + fnStr;
    return lead + u.formatTrailingConst(b);
  };
`;

export const G11_B3_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D21 (Q21): GTLN/GTNN hàm y = a cos^2 x + b cos 2x (Trả lời ngắn)
  t11_b3_d21_extrema_cos2_cos2x_sa: {
    id: 't11_b3_d21_extrema_cos2_cos2x_sa',
    name: 'Tìm GTLN hoặc GTNN của y = a cos²x + b cos 2x (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Hạ bậc cos²x để tính giá trị lớn nhất hoặc nhỏ nhất của hàm số y = a cos²x + b cos 2x.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0}, a + 2b ≠ 0 (kết quả luôn là số nguyên)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (của cos²x)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b (của cos 2x)', min: -9, max: 9, allowZero: false },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (a + 2 * b === 0) return { valid: false, reason: 'Tránh a + 2b = 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, targetIdx } = params;
      const cos2Part = a === 1 ? '\\cos^2 x' : a === -1 ? '-\\cos^2 x' : String(a) + '\\cos^2 x';
      const cos2xPart = b === 1 ? ' + \\cos 2x' : b === -1 ? ' - \\cos 2x' : b > 0 ? ' + ' + b + '\\cos 2x' : ' - ' + Math.abs(b) + '\\cos 2x';
      const expr = cos2Part + cos2xPart;
      const mid = u.simplifyFrac(a, 2);
      const amp = u.simplifyFrac(a + 2 * b, 2);
      const absAmpNum = Math.abs(a + 2 * b);
      const minV = (a - absAmpNum) / 2;
      const maxV = (a + absAmpNum) / 2;
      const ans = targetIdx === 0 ? maxV : minV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const ampTerm = amp.num > 0 ? ' + ' + amp.latex + '\\cos 2x' : ' - ' + u.simplifyFrac(-amp.num, amp.den).latex + '\\cos 2x';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\cos^2 x = \\frac{1 + \\cos 2x}{2}$ nên $y = ' + mid.latex + ampTerm + '$.',
          'Vì $\\cos 2x \\in [-1; 1]$ nên $y \\in [' + minV + ';\\, ' + maxV + ']$. Vậy giá trị ' + label + ' là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a + 2b = 0', params: { a: -4, b: 2, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (-5cos²x + 8cos 2x, max -> 3)', params: { a: -5, b: 8, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D22 (Q22): GTLN/GTNN hàm y = a sin^2 x + b cos 2x (Trả lời ngắn)
  t11_b3_d22_extrema_sin2_cos2x_sa: {
    id: 't11_b3_d22_extrema_sin2_cos2x_sa',
    name: 'Tìm GTLN hoặc GTNN của y = a sin²x + b cos 2x (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Hạ bậc sin²x để tính giá trị lớn nhất hoặc nhỏ nhất của hàm số y = a sin²x + b cos 2x.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0}, 2b - a ≠ 0 (kết quả luôn là số nguyên)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (của sin²x)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b (của cos 2x)', min: -9, max: 9, allowZero: false },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (2 * b - a === 0) return { valid: false, reason: 'Tránh 2b - a = 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, targetIdx } = params;
      const sin2Part = a === 1 ? '\\sin^2 x' : a === -1 ? '-\\sin^2 x' : String(a) + '\\sin^2 x';
      const cos2xPart = b === 1 ? ' + \\cos 2x' : b === -1 ? ' - \\cos 2x' : b > 0 ? ' + ' + b + '\\cos 2x' : ' - ' + Math.abs(b) + '\\cos 2x';
      const expr = sin2Part + cos2xPart;
      const mid = u.simplifyFrac(a, 2);
      const amp = u.simplifyFrac(2 * b - a, 2);
      const absAmpNum = Math.abs(2 * b - a);
      const minV = (a - absAmpNum) / 2;
      const maxV = (a + absAmpNum) / 2;
      const ans = targetIdx === 0 ? maxV : minV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const ampTerm = amp.num > 0 ? ' + ' + amp.latex + '\\cos 2x' : ' - ' + u.simplifyFrac(-amp.num, amp.den).latex + '\\cos 2x';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\sin^2 x = \\frac{1 - \\cos 2x}{2}$ nên $y = ' + mid.latex + ampTerm + '$.',
          'Vì $-1 \\le \\cos 2x \\le 1$ nên $' + minV + ' \\le y \\le ' + maxV + '$. Vậy giá trị ' + label + ' của hàm số là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 2b - a = 0', params: { a: 6, b: 3, targetIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (8sin²x + 5cos 2x, min -> 3)', params: { a: 8, b: 5, targetIdx: 1 }, expectedValid: true },
    ],
  },

  // D23 (Q23): GTLN/GTNN hàm y = a sin^2 x cos^2 x + c (Trả lời ngắn, làm tròn phần mười)
  t11_b3_d23_extrema_sin2_cos2_sa: {
    id: 't11_b3_d23_extrema_sin2_cos2_sa',
    name: 'Tìm gần đúng GTLN hoặc GTNN của y = a sin²x cos²x + c (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Tìm GTLN hoặc GTNN của hàm số y = a sin²x cos²x + c (làm tròn đến hàng phần mười).',
    conditionSummary: 'a ∈ [-11; 11] \\ {0}, c ∈ [-10; 10]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -11, max: 11, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -10, max: 10 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, targetIdx } = params;
      if (a === 0) return { valid: false, reason: 'a phải khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, targetIdx } = params;
      ` + TRIG11_B3_SA_HELPERS + String.raw`
      const expr = fmtLinearTrig(a, '\\sin^2 x\\cos^2 x', c);
      const end2 = u.simplifyFrac(4 * c + a, 4);
      const maxFrac = a > 0 ? end2 : u.simplifyFrac(c, 1);
      const minFrac = a > 0 ? u.simplifyFrac(c, 1) : end2;
      const ansFrac = targetIdx === 0 ? maxFrac : minFrac;
      const ansR = round1(ansFrac.value);
      const shortAnswer = fmtDec1(ansR);
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const coeff2 = u.simplifyFrac(a, 4);
      const reducedExpr = String(c) + (coeff2.num > 0 ? ' + ' : ' - ') + (Math.abs(coeff2.num) === 1 && coeff2.den === 1 ? '' : u.simplifyFrac(Math.abs(coeff2.num), coeff2.den).latex) + '\\sin^2 2x';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\sin^2 x\\cos^2 x = \\frac{1}{4}\\sin^2 2x \\in \\left[0;\\, \\frac{1}{4}\\right]$.',
          'Suy ra $y = ' + reducedExpr + ' \\in \\left[' + minFrac.latex + ';\\, ' + maxFrac.latex + '\\right]$.',
          'Vậy giá trị ' + label + ' là $' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, c: -8, targetIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (-sin²x cos²x - 8, min -> -8,3)', params: { a: -1, c: -8, targetIdx: 1 }, expectedValid: true },
    ],
  },

  // D24 (Q24): GTLN/GTNN hàm y = a sin x + b cos x + c (Trả lời ngắn, làm tròn phần mười)
  t11_b3_d24_extrema_asin_bcos_c_sa: {
    id: 't11_b3_d24_extrema_asin_bcos_c_sa',
    name: 'Tìm gần đúng GTLN hoặc GTNN của y = a sin x + b cos x + c (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Tìm GTLN hoặc GTNN của hàm số y = a sin x + b cos x + c (làm tròn đến hàng phần mười).',
    conditionSummary: 'a, b ∈ [-6; 6] \\ {0}, a² + b² không chính phương, tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -8, max: 8 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      const r = a * a + b * b;
      const sr = Math.round(Math.sqrt(r));
      if (sr * sr === r) return { valid: false, reason: 'Chọn để √(a² + b²) còn căn thức' };
      const val = c + (targetIdx === 0 ? 1 : -1) * Math.sqrt(r);
      if (Math.abs((Math.abs(val) * 10) % 1 - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, targetIdx } = params;
      ` + TRIG11_B3_SA_HELPERS + String.raw`
      const r = a * a + b * b;
      const sinPart = a === 1 ? '\\sin x' : a === -1 ? '-\\sin x' : String(a) + '\\sin x';
      const cosPart = b === 1 ? ' + \\cos x' : b === -1 ? ' - \\cos x' : b > 0 ? ' + ' + b + '\\cos x' : ' - ' + Math.abs(b) + '\\cos x';
      const expr = sinPart + cosPart + u.formatTrailingConst(c);
      const val = c + (targetIdx === 0 ? 1 : -1) * Math.sqrt(r);
      const ansR = round1(val);
      const shortAnswer = fmtDec1(ansR);
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const minExact = (c === 0 ? '-\\sqrt{' + r + '}' : c + ' - \\sqrt{' + r + '}');
      const maxExact = (c === 0 ? '\\sqrt{' + r + '}' : c + ' + \\sqrt{' + r + '}');
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Áp dụng bất đẳng thức Bunhiacopxki: $-\\sqrt{' + r + '} \\le ' + sinPart + cosPart + ' \\le \\sqrt{' + r + '}$.',
          'Suy ra $\\min y = ' + minExact + '$ và $\\max y = ' + maxExact + '$. Giá trị cần tìm xấp xỉ $' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Pytago (3, 4)', params: { a: 3, b: 4, c: 2, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (sin x - 3cos x + 4, min -> 0,8)', params: { a: 1, b: -3, c: 4, targetIdx: 1 }, expectedValid: true },
    ],
  },

  // D25 (Q25): GTLN/GTNN hàm bậc hai theo sin x: y = a sin^2 x + b sin x + c
  t11_b3_d25_quadratic_in_sin_sa: {
    id: 't11_b3_d25_quadratic_in_sin_sa',
    name: 'Tìm GTLN hoặc GTNN của hàm bậc hai theo sin x (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Đặt ẩn phụ t = sin x ∈ [-1; 1] để tìm GTLN hoặc GTNN của y = a sin²x + b sin x + c.',
    conditionSummary: 'a ∈ [-4; 4] \\ {0}, b = 2ka với k ∈ {-1, 1} hoặc b chẵn để cực trị là số nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -6, max: 8 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      const t0 = -b / (2 * a);
      const cand = [-1, 1];
      if (t0 >= -1 && t0 <= 1) cand.push(t0);
      const vals = cand.map(t => a * t * t + b * t + params.c);
      const ans = targetIdx === 0 ? Math.max(...vals) : Math.min(...vals);
      if (!Number.isInteger(ans)) return { valid: false, reason: 'Chọn để đáp án là số nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, targetIdx } = params;
      const exprTrig = u.formatQuadratic(a, b, c).replace(/x/g, '\\sin x').replace(/\\sin\s*x\^2/g, '\\sin^2 x');
      const exprT = u.formatQuadratic(a, b, c).replace(/x/g, 't');
      const t0 = -b / (2 * a);
      const fM1 = a - b + c;
      const fP1 = a + b + c;
      const candVals = [fM1, fP1];
      let vertexStep = '';
      if (t0 > -1 && t0 < 1) {
        const t0Frac = u.simplifyFrac(-b, 2 * a);
        const fV = a * t0 * t0 + b * t0 + c;
        candVals.push(fV);
        vertexStep = ', $y(' + t0Frac.latex + ') = ' + fV + '$';
      }
      const maxV = Math.max(...candVals);
      const minV = Math.min(...candVals);
      const ans = targetIdx === 0 ? maxV : minV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + exprTrig + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Đặt $t = \\sin x \\in [-1; 1]$. Khi đó $y = ' + exprT + '$.',
          'Tính giá trị tại các đầu mút' + (vertexStep ? ' và đỉnh $t_0 \\in (-1; 1)$' : '') + ': $y(-1) = ' + fM1 + '$, $y(1) = ' + fP1 + '$' + vertexStep + '.',
          'Suy ra $\\min y = ' + minV + '$ và $\\max y = ' + maxV + '$. Vậy giá trị ' + label + ' là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 4, c: 3, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (-2sin²x + 4sin x + 3, max -> 5)', params: { a: -2, b: 4, c: 3, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D26 (Q26): GTLN/GTNN hàm bậc hai theo cos x: y = a cos^2 x + b cos x + c
  t11_b3_d26_quadratic_in_cos_sa: {
    id: 't11_b3_d26_quadratic_in_cos_sa',
    name: 'Tìm GTLN hoặc GTNN của hàm bậc hai theo cos x (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Đặt ẩn phụ t = cos x ∈ [-1; 1] để tìm GTLN hoặc GTNN của y = a cos²x + b cos x + c.',
    conditionSummary: 'a ∈ [-4; 4] \\ {0}, b ≠ 0, đáp án là số nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -6, max: 8 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      const t0 = -b / (2 * a);
      const cand = [-1, 1];
      if (t0 >= -1 && t0 <= 1) cand.push(t0);
      const vals = cand.map(t => a * t * t + b * t + params.c);
      const ans = targetIdx === 0 ? Math.max(...vals) : Math.min(...vals);
      if (!Number.isInteger(ans)) return { valid: false, reason: 'Chọn để đáp án là số nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, targetIdx } = params;
      const exprTrig = u.formatQuadratic(a, b, c).replace(/x/g, '\\cos x').replace(/\\cos\s*x\^2/g, '\\cos^2 x');
      const exprT = u.formatQuadratic(a, b, c).replace(/x/g, 't');
      const t0 = -b / (2 * a);
      const fM1 = a - b + c;
      const fP1 = a + b + c;
      const candVals = [fM1, fP1];
      let vertexStep = '';
      if (t0 > -1 && t0 < 1) {
        const t0Frac = u.simplifyFrac(-b, 2 * a);
        const fV = a * t0 * t0 + b * t0 + c;
        candVals.push(fV);
        vertexStep = ', $y(' + t0Frac.latex + ') = ' + fV + '$';
      }
      const maxV = Math.max(...candVals);
      const minV = Math.min(...candVals);
      const ans = targetIdx === 0 ? maxV : minV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + exprTrig + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Đặt $t = \\cos x \\in [-1; 1]$. Khi đó $y = ' + exprT + '$.',
          'Tính giá trị tại các đầu mút' + (vertexStep ? ' và đỉnh $t_0 \\in (-1; 1)$' : '') + ': $y(-1) = ' + fM1 + '$, $y(1) = ' + fP1 + '$' + vertexStep + '.',
          'Suy ra $\\min y = ' + minV + '$ và $\\max y = ' + maxV + '$. Vậy giá trị ' + label + ' là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: -2, b: 0, c: 2, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (-2cos²x + 4cos x + 2, max -> 4)', params: { a: -2, b: 4, c: 2, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D27 (Q27): GTLN/GTNN hàm y = a(sin^4 x + cos^4 x) + c (Trả lời ngắn)
  t11_b3_d27_power4_sum_sa: {
    id: 't11_b3_d27_power4_sum_sa',
    name: 'Tìm GTLN hoặc GTNN của y = a(sin⁴x + cos⁴x) + c (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Sử dụng hằng đẳng thức sin⁴x + cos⁴x = 1 - (1/2)sin²2x để tìm GTLN hoặc GTNN.',
    conditionSummary: 'a ∈ [-8; 8] \\ {0}, c ∈ [-8; 8], kết quả cần tìm là số nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -8, max: 8 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, c, targetIdx } = params;
      if (a === 0) return { valid: false, reason: 'a khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      const v1 = c + a;
      const v2 = c + a / 2;
      const ans = targetIdx === 0 ? Math.max(v1, v2) : Math.min(v1, v2);
      if (!Number.isInteger(ans)) return { valid: false, reason: 'Chọn để giá trị cần tìm là số nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, targetIdx } = params;
      const sin4Part = a === 1 ? '\\sin^4 x' : a === -1 ? '-\\sin^4 x' : String(a) + '\\sin^4 x';
      const cos4Part = a === 1 ? ' + \\cos^4 x' : a === -1 ? ' - \\cos^4 x' : a > 0 ? ' + ' + a + '\\cos^4 x' : ' - ' + Math.abs(a) + '\\cos^4 x';
      const expr = sin4Part + cos4Part + u.formatTrailingConst(c);
      const minFrac = a > 0 ? u.simplifyFrac(2 * c + a, 2) : u.simplifyFrac(c + a, 1);
      const maxFrac = a > 0 ? u.simplifyFrac(c + a, 1) : u.simplifyFrac(2 * c + a, 2);
      const ans = targetIdx === 0 ? maxFrac.value : minFrac.value;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\sin^4 x + \\cos^4 x = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x\\cos^2 x = 1 - \\frac{1}{2}\\sin^2 2x \\in \\left[\\frac{1}{2};\\, 1\\right]$.',
          'Suy ra $y \\in \\left[' + minFrac.latex + ';\\, ' + maxFrac.latex + '\\right]$. Vậy giá trị ' + label + ' là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, c: -2, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (sin⁴x + cos⁴x - 2, max -> -1)', params: { a: 1, c: -2, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D28 (Q28): GTLN/GTNN hàm y = a sin^4 x - a cos^4 x + c (Trả lời ngắn)
  t11_b3_d28_power4_diff_sa: {
    id: 't11_b3_d28_power4_diff_sa',
    name: 'Tìm GTLN hoặc GTNN của y = a(sin⁴x - cos⁴x) + c (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Sử dụng hằng đẳng thức sin⁴x - cos⁴x = -cos 2x để tìm GTLN hoặc GTNN.',
    conditionSummary: 'a ∈ [-8; 8] \\ {0}, c ∈ [-8; 8]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -8, max: 8 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, targetIdx } = params;
      if (a === 0) return { valid: false, reason: 'a khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, targetIdx } = params;
      const sin4Part = a === 1 ? '\\sin^4 x' : a === -1 ? '-\\sin^4 x' : String(a) + '\\sin^4 x';
      const cos4Part = a === 1 ? ' - \\cos^4 x' : a === -1 ? ' + \\cos^4 x' : a > 0 ? ' - ' + a + '\\cos^4 x' : ' + ' + Math.abs(a) + '\\cos^4 x';
      const expr = sin4Part + cos4Part + u.formatTrailingConst(c);
      const minV = c - Math.abs(a);
      const maxV = c + Math.abs(a);
      const ans = targetIdx === 0 ? maxV : minV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\sin^4 x - \\cos^4 x = (\\sin^2 x - \\cos^2 x)(\\sin^2 x + \\cos^2 x) = -\\cos 2x \\in [-1; 1]$.',
          'Suy ra $y \\in [' + minV + ';\\, ' + maxV + ']$. Vậy giá trị ' + label + ' của hàm số là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, c: 4, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (2sin⁴x - 2cos⁴x + 4, max -> 6)', params: { a: 2, c: 4, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D29 (Q29): GTLN/GTNN hàm y = a(sin^6 x + cos^6 x) + c (Trả lời ngắn, làm tròn phần mười)
  t11_b3_d29_power6_sum_sa: {
    id: 't11_b3_d29_power6_sum_sa',
    name: 'Tìm gần đúng GTLN hoặc GTNN của y = a(sin⁶x + cos⁶x) + c (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Sử dụng sin⁶x + cos⁶x = 1 - (3/4)sin²2x để tìm GTLN hoặc GTNN (làm tròn đến hàng phần mười).',
    conditionSummary: 'a ∈ [-9; 9] \\ {0}, c ∈ [-8; 8]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -8, max: 8 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, targetIdx } = params;
      if (a === 0) return { valid: false, reason: 'a khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, targetIdx } = params;
      ` + TRIG11_B3_SA_HELPERS + String.raw`
      const sin6Part = a === 1 ? '\\sin^6 x' : a === -1 ? '-\\sin^6 x' : String(a) + '\\sin^6 x';
      const cos6Part = a === 1 ? ' + \\cos^6 x' : a === -1 ? ' - \\cos^6 x' : a > 0 ? ' + ' + a + '\\cos^6 x' : ' - ' + Math.abs(a) + '\\cos^6 x';
      const expr = sin6Part + cos6Part + u.formatTrailingConst(c);
      const fQuarter = u.simplifyFrac(4 * c + a, 4);
      const fOne = u.simplifyFrac(c + a, 1);
      const minFrac = a > 0 ? fQuarter : fOne;
      const maxFrac = a > 0 ? fOne : fQuarter;
      const ansFrac = targetIdx === 0 ? maxFrac : minFrac;
      const ansR = round1(ansFrac.value);
      const shortAnswer = fmtDec1(ansR);
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\sin^6 x + \\cos^6 x = 1 - \\frac{3}{4}\\sin^2 2x \\in \\left[\\frac{1}{4};\\, 1\\right]$.',
          'Suy ra $y \\in \\left[' + minFrac.latex + ';\\, ' + maxFrac.latex + '\\right]$. Giá trị ' + label + ' là $' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, c: -5, targetIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (5sin⁶x + 5cos⁶x - 5, min -> -3,8)', params: { a: 5, c: -5, targetIdx: 1 }, expectedValid: true },
    ],
  },

  // D30 (Q30): GTLN/GTNN hàm y = a(sin^6 x + cos^6 x) + b(sin^4 x + cos^4 x) + c (làm tròn phần mười)
  t11_b3_d30_power6_power4_combo_sa: {
    id: 't11_b3_d30_power6_power4_combo_sa',
    name: 'Tìm GTLN hoặc GTNN của tổ hợp bậc 6 và bậc 4 của sin x, cos x (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Rút gọn y = a(sin⁶x + cos⁶x) + b(sin⁴x + cos⁴x) + c theo sin²2x để tìm GTLN hoặc GTNN (làm tròn hàng phần mười).',
    conditionSummary: 'a, b ∈ [-7; 7] \\ {0}, 3a + 2b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc 6 (a)', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hệ số bậc 4 (b)', min: -7, max: 7, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -8, max: 8 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (3 * a + 2 * b === 0) return { valid: false, reason: 'Tránh 3a + 2b = 0 làm hàm hằng' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, targetIdx } = params;
      ` + TRIG11_B3_SA_HELPERS + String.raw`
      const term = (coef, pwr, isFirst) => {
        const s = coef === 1 ? (isFirst ? '' : ' + ') : coef === -1 ? (isFirst ? '-' : ' - ') : coef > 0 ? (isFirst ? String(coef) : ' + ' + coef) : (isFirst ? String(coef) : ' - ' + Math.abs(coef));
        return s + pwr;
      };
      const expr = term(a, '\\sin^6 x', true) + term(b, '\\sin^4 x', false) + term(a, '\\cos^6 x', false) + term(b, '\\cos^4 x', false) + u.formatTrailingConst(c);
      // y = (a + b + c) - ((3a + 2b)/4) sin^2(2x)
      const v0 = a + b + c;
      const coeffNum = -(3 * a + 2 * b);
      const coeffFrac = u.simplifyFrac(coeffNum, 4);
      const v1Frac = u.simplifyFrac(4 * v0 + coeffNum, 4);
      const v0Frac = u.simplifyFrac(v0, 1);
      const minFrac = coeffNum > 0 ? v0Frac : v1Frac;
      const maxFrac = coeffNum > 0 ? v1Frac : v0Frac;
      const ansFrac = targetIdx === 0 ? maxFrac : minFrac;
      const ansR = round1(ansFrac.value);
      const shortAnswer = fmtDec1(ansR);
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const coeffSin2Str = coeffFrac.num > 0 ? coeffFrac.latex + '\\sin^2 2x' : '-' + u.simplifyFrac(-coeffFrac.num, coeffFrac.den).latex + '\\sin^2 2x';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Áp dụng $\\sin^6 x + \\cos^6 x = 1 - \\frac{3}{4}\\sin^2 2x$ và $\\sin^4 x + \\cos^4 x = 1 - \\frac{1}{2}\\sin^2 2x$.',
          'Suy ra $y = ' + coeffSin2Str + u.formatTrailingConst(v0) + '$. Vì $\\sin^2 2x \\in [0; 1]$ nên $y \\in \\left[' + minFrac.latex + ';\\, ' + maxFrac.latex + '\\right]$.',
          'Vậy giá trị ' + label + ' là $' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 3a + 2b = 0', params: { a: 2, b: -3, c: -5, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (-sin⁶x - 5sin⁴x - cos⁶x - 5cos⁴x - 5, max -> -7,8)', params: { a: -1, b: -5, c: -5, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Gọi M, m là GTLN, GTNN của y = a cos x + c (hoặc a sin x + c) trên đoạn [α; β] -> Tính M + m
  t11_b3_d31_extrema_on_closed_interval_sa: {
    id: 't11_b3_d31_extrema_on_closed_interval_sa',
    name: 'Tổng GTLN và GTNN của y = a cos x + c (hoặc a sin x + c) trên đoạn [α; β] (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Cho y = a cos x + c hoặc a sin x + c trên đoạn góc đặc biệt [α; β]. Tính tổng M + m (hoặc M - m).',
    conditionSummary: 'a = 2k (k ∈ [-5; 5] \\ {0}) để hai đầu mút nguyên trên các đoạn đặc biệt',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k (a = 2k)', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -8, max: 10 },
      { name: 'intIdx', label: 'Đoạn góc đặc biệt (0..5)', min: 0, max: 5 },
    ],
    validateCode: `
      const { k, intIdx } = params;
      if (k === 0) return { valid: false, reason: 'k khác 0' };
      if (intIdx < 0 || intIdx > 5) return { valid: false, reason: 'Chỉ số đoạn ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, c, intIdx } = params;
      const a = 2 * k;
      const intervals = [
        {
          fn: '\\cos',
          left: '- \\frac{2\\pi}{3}',
          right: '- \\frac{\\pi}{3}',
          minT: -0.5,
          maxT: 0.5,
          minLatex: '-\\frac{1}{2}',
          maxLatex: '\\frac{1}{2}',
        },
        {
          fn: '\\cos',
          left: '\\frac{\\pi}{3}',
          right: '\\frac{2\\pi}{3}',
          minT: -0.5,
          maxT: 0.5,
          minLatex: '-\\frac{1}{2}',
          maxLatex: '\\frac{1}{2}',
        },
        {
          fn: '\\cos',
          left: '0',
          right: '\\frac{\\pi}{3}',
          minT: 0.5,
          maxT: 1,
          minLatex: '\\frac{1}{2}',
          maxLatex: '1',
        },
        {
          fn: '\\cos',
          left: '\\frac{2\\pi}{3}',
          right: '\\frac{4\\pi}{3}',
          minT: -1,
          maxT: -0.5,
          minLatex: '-1',
          maxLatex: '-\\frac{1}{2}',
        },
        {
          fn: '\\sin',
          left: '-\\frac{\\pi}{6}',
          right: '\\frac{\\pi}{6}',
          minT: -0.5,
          maxT: 0.5,
          minLatex: '-\\frac{1}{2}',
          maxLatex: '\\frac{1}{2}',
        },
        {
          fn: '\\sin',
          left: '\\frac{\\pi}{6}',
          right: '\\frac{5\\pi}{6}',
          minT: 0.5,
          maxT: 1,
          minLatex: '\\frac{1}{2}',
          maxLatex: '1',
        },
      ];
      const iv = intervals[intIdx];
      const expr = String(a) + iv.fn + ' x' + u.formatTrailingConst(c);
      const v1 = Math.round(a * iv.minT + c);
      const v2 = Math.round(a * iv.maxT + c);
      const M = Math.max(v1, v2);
      const m = Math.min(v1, v2);
      const ans = M + m;
      return {
        stem:
          'Gọi $M, m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = ' +
          expr +
          '$ trên đoạn $\\left[' +
          iv.left +
          ';\\, ' +
          iv.right +
          '\\right]$. Giá trị $M + m$ bằng',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Trên đoạn $\\left[' + iv.left + ';\\, ' + iv.right + '\\right]$, ta có $' + iv.minLatex + ' \\le ' + iv.fn + ' x \\le ' + iv.maxLatex + '$.',
          'Nhân với $' + a + '$ rồi cộng thêm $' + c + '$ ta được $' + m + ' \\le y \\le ' + M + '$.',
          'Suy ra $M = ' + M + ',\\, m = ' + m + ' \\Rightarrow M + m = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, c: 7, intIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (-8cos x + 7 trên [-2π/3; -π/3] -> 14)', params: { k: -4, c: 7, intIdx: 0 }, expectedValid: true },
    ],
  },
};
