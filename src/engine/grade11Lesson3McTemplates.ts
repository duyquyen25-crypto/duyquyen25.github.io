import { MathTemplate } from '../types/math';

const TRIG11_B3_MC_HELPERS = String.raw`
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
  const fmtMulVar = (k, v) => (k === 1 ? v : k === -1 ? '-' + v : String(k) + v);
  const fmtLinearTrig = (a, fnStr, b) => {
    const lead = a === 1 ? fnStr : a === -1 ? '-' + fnStr : String(a) + fnStr;
    return lead + u.formatTrailingConst(b);
  };
  const fmtConstShift = (c, radStr) => {
    if (c === 0) return radStr;
    return c > 0 ? radStr + ' + ' + c : radStr + ' - ' + Math.abs(c);
  };
`;

export const G11_B3_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tập xác định hàm phân thức mẫu sin x hoặc cos x
  t11_b3_d01_domain_basic_trig_frac_mc: {
    id: 't11_b3_d01_domain_basic_trig_frac_mc',
    name: 'Tập xác định của hàm phân thức (a cos x + b)/sin x hoặc (a sin x + b)/cos x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tập xác định hàm số lượng giác',
    description: 'Tìm tập xác định của hàm số y = (a cos x + b)/sin x hoặc y = (a sin x + b)/cos x.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -9, max: 9, allowZero: false },
      { name: 'mode', label: 'Mẫu thức (0: sin x, 1: cos x)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, mode } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, mode } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const numExpr = fmtLinearTrig(a, mode === 0 ? '\\cos x' : '\\sin x', b);
      const denExpr = mode === 0 ? '\\sin x' : '\\cos x';
      const correct = mode === 0
        ? '$D=\\mathbb{R}\\setminus\\{k\\pi,\\, k\\in\\mathbb{Z}\\}$'
        : '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{2}+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$';
      const wList = mode === 0
        ? [
            '$D=\\mathbb{R}\\setminus\\{k2\\pi,\\, k\\in\\mathbb{Z}\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{2}+k2\\pi,\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{2}+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{k\\frac{\\pi}{2},\\, k\\in\\mathbb{Z}\\right\\}$',
          ]
        : [
            '$D=\\mathbb{R}\\setminus\\{k\\pi,\\, k\\in\\mathbb{Z}\\}$',
            '$D=\\mathbb{R}\\setminus\\{k2\\pi,\\, k\\in\\mathbb{Z}\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{2}+k2\\pi,\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{4}+k\\frac{\\pi}{2},\\, k\\in\\mathbb{Z}\\right\\}$',
          ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (k) => '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{' + (k + 3) + '}+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$'
      );
      return {
        stem: 'Tìm tập xác định của hàm số $y = \\frac{' + numExpr + '}{' + denExpr + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số xác định khi $' + denExpr + ' \\ne 0$.',
          mode === 0
            ? 'Ta có $\\sin x \\ne 0 \\Leftrightarrow x \\ne k\\pi,\\, k \\in \\mathbb{Z}$.'
            : 'Ta có $\\cos x \\ne 0 \\Leftrightarrow x \\ne \\frac{\\pi}{2} + k\\pi,\\, k \\in \\mathbb{Z}$.',
          'Vậy tập xác định là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -5, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 ((9cos x - 5)/sin x)', params: { a: 9, b: -5, mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Tập xác định hàm phân thức mẫu cos(mx) hoặc sin(mx) với m >= 2
  t11_b3_d02_domain_multiple_angle_frac_mc: {
    id: 't11_b3_d02_domain_multiple_angle_frac_mc',
    name: 'Tập xác định của hàm phân thức có mẫu cos(mx) hoặc sin(mx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tập xác định hàm số lượng giác',
    description: 'Tìm tập xác định của hàm số y = (a sin x + b)/cos(mx) hoặc (a cos x + b)/sin(mx) với m ≥ 2.',
    conditionSummary: 'm ∈ {2, 3, 4}, a ≠ 0, b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 7 },
      { name: 'b', label: 'Hằng số b', min: -7, max: 7, allowZero: false },
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 4 },
      { name: 'mode', label: 'Mẫu thức (0: cos(mx), 1: sin(mx))', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, m, mode } = params;
      if (a === 0 || b === 0 || m < 2) return { valid: false, reason: 'Cần a, b khác 0 và m >= 2' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, m, mode } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const numExpr = fmtLinearTrig(a, mode === 0 ? '\\sin x' : '\\cos x', b);
      const denExpr = (mode === 0 ? '\\cos ' : '\\sin ') + String(m) + 'x';
      const stepPi = fmtPiFrac(1, m);
      const shiftPi = fmtPiFrac(1, 2 * m);
      const correct = mode === 0
        ? '$D=\\mathbb{R}\\setminus\\left\\{' + shiftPi + '+k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$'
        : '$D=\\mathbb{R}\\setminus\\left\\{k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$';
      const wList = mode === 0
        ? [
            '$D=\\mathbb{R}\\setminus\\{k\\pi,\\, k\\in\\mathbb{Z}\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{2}+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{' + shiftPi + '+k2\\pi,\\, k\\in\\mathbb{Z}\\right\\}$',
          ]
        : [
            '$D=\\mathbb{R}\\setminus\\{k\\pi,\\, k\\in\\mathbb{Z}\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{' + shiftPi + '+k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{2}+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{k' + fmtPiFrac(2, m) + ',\\, k\\in\\mathbb{Z}\\right\\}$',
          ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (k) => '$D=\\mathbb{R}\\setminus\\left\\{' + fmtPiFrac(1, 2 * m + k) + '+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$'
      );
      return {
        stem: 'Tìm tập xác định của hàm số $y = \\frac{' + numExpr + '}{' + denExpr + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện xác định: $' + denExpr + ' \\ne 0$.',
          mode === 0
            ? 'Ta có $\\cos ' + m + 'x \\ne 0 \\Leftrightarrow ' + m + 'x \\ne \\frac{\\pi}{2} + k\\pi \\Leftrightarrow x \\ne ' + shiftPi + ' + k' + stepPi + ',\\, k \\in \\mathbb{Z}$.'
            : 'Ta có $\\sin ' + m + 'x \\ne 0 \\Leftrightarrow ' + m + 'x \\ne k\\pi \\Leftrightarrow x \\ne k' + stepPi + ',\\, k \\in \\mathbb{Z}$.',
          'Vậy tập xác định là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { a: 3, b: 5, m: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 ((3sin x + 5)/cos 2x)', params: { a: 3, b: 5, m: 2, mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Tập xác định hàm c / sin(mx) hoặc c / cos(mx)
  t11_b3_d03_domain_const_over_trig_mc: {
    id: 't11_b3_d03_domain_const_over_trig_mc',
    name: 'Tập xác định của hàm hằng trên sin(mx) hoặc cos(mx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tập xác định hàm số lượng giác',
    description: 'Tìm tập xác định của hàm số y = c / sin(mx) hoặc y = c / cos(mx).',
    conditionSummary: 'c ∈ [-9; 9] \\ {0}, m ∈ {1, 2, 3}',
    paramSpecs: [
      { name: 'c', label: 'Tử số c', min: -9, max: 9, allowZero: false },
      { name: 'm', label: 'Hệ số góc m', min: 1, max: 3 },
      { name: 'mode', label: 'Mẫu thức (0: sin, 1: cos)', min: 0, max: 1 },
    ],
    validateCode: `
      const { c, m, mode } = params;
      if (c === 0 || m < 1) return { valid: false, reason: 'c != 0 và m >= 1' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, m, mode } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const ang = fmtMulVar(m, 'x');
      const denExpr = (mode === 0 ? '\\sin ' : '\\cos ') + ang;
      const stepPi = fmtPiFrac(1, m);
      const shiftPi = fmtPiFrac(1, 2 * m);
      const k2Step = fmtPiFrac(2, m);
      const correct = mode === 0
        ? '$D=\\mathbb{R}\\setminus\\left\\{k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$'
        : '$D=\\mathbb{R}\\setminus\\left\\{' + shiftPi + '+k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$';
      const wList = mode === 0
        ? [
            '$D=\\mathbb{R}\\setminus\\left\\{' + shiftPi + '+k' + k2Step + ',\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{k' + k2Step + ',\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{-\\frac{\\pi}{2}+k\\frac{\\pi}{2},\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{4}+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$',
          ]
        : [
            '$D=\\mathbb{R}\\setminus\\left\\{k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{k' + k2Step + ',\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{' + shiftPi + '+k' + k2Step + ',\\, k\\in\\mathbb{Z}\\right\\}$',
            '$D=\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{6}+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$',
          ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (k) => '$D=\\mathbb{R}\\setminus\\left\\{' + fmtPiFrac(1, m + k + 2) + '+k\\pi,\\, k\\in\\mathbb{Z}\\right\\}$'
      );
      return {
        stem: 'Tập xác định của hàm số $y = \\frac{' + c + '}{' + denExpr + '}$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện xác định: $' + denExpr + ' \\ne 0$.',
          mode === 0
            ? 'Suy ra $' + ang + ' \\ne k\\pi \\Leftrightarrow x \\ne k' + stepPi + ',\\, k \\in \\mathbb{Z}$.'
            : 'Suy ra $' + ang + ' \\ne \\frac{\\pi}{2} + k\\pi \\Leftrightarrow x \\ne ' + shiftPi + ' + k' + stepPi + ',\\, k \\in \\mathbb{Z}$.',
          'Vậy tập xác định là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { c: 0, m: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (y = 6/sin x)', params: { c: 6, m: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Tập xác định của y = tan(ax + bπ) hoặc cot(ax + bπ)
  t11_b3_d04_domain_tan_cot_shift_mc: {
    id: 't11_b3_d04_domain_tan_cot_shift_mc',
    name: 'Tập xác định của hàm số y = tan(ax + bπ) hoặc cot(ax + bπ)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tập xác định hàm số lượng giác',
    description: 'Tìm tập xác định của hàm số y = tan(ax + bπ) hoặc y = cot(ax + bπ).',
    conditionSummary: 'a ∈ [1; 4], b ∈ [-6; 6] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 4 },
      { name: 'b', label: 'Hệ số b (của bπ)', min: -6, max: 6, allowZero: false },
      { name: 'mode', label: 'Hàm (0: tan, 1: cot)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, mode } = params;
      if (a < 1 || b === 0) return { valid: false, reason: 'Cần a >= 1 và b != 0' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, mode } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const ax = fmtMulVar(a, 'x');
      const bPi = fmtPiFrac(b, 1);
      const argExpr = ax + (b > 0 ? ' + ' + bPi : ' - ' + fmtPiFrac(Math.abs(b), 1));
      const fnName = mode === 0 ? '\\tan' : '\\cot';
      const stepPi = fmtPiFrac(1, a);
      const x0Num = mode === 0 ? 1 - 2 * b : -2 * b;
      const x0Den = 2 * a;
      const x0Latex = fmtPiFrac(x0Num, x0Den);
      const correct = '$D=\\mathbb{R}\\setminus\\left\\{' + x0Latex + '+k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$';
      // Ensure offsets are not congruent mod 1/a by shifting denominator to 4a / 6a or adding non-multiple of 1/a
      const w1 = '$D=\\mathbb{R}\\setminus\\left\\{' + fmtPiFrac(x0Num * 2 + 1, x0Den * 2) + '+k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$';
      const w2 = '$D=\\mathbb{R}\\setminus\\left\\{' + fmtPiFrac(x0Num * 3 + 1, x0Den * 3) + '+k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$';
      const w3 = '$D=\\mathbb{R}\\setminus\\left\\{' + fmtPiFrac(x0Num * 2 - 1, x0Den * 2) + '+k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (k) => '$D=\\mathbb{R}\\setminus\\left\\{' + fmtPiFrac(x0Num * 4 + k, x0Den * 4) + '+k' + stepPi + ',\\, k\\in\\mathbb{Z}\\right\\}$'
      );
      return {
        stem: 'Tìm tập xác định của hàm số $y = ' + fnName + '(' + argExpr + ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          mode === 0
            ? 'Hàm số xác định khi $\\cos(' + argExpr + ') \\ne 0 \\Leftrightarrow ' + argExpr + ' \\ne \\frac{\\pi}{2} + k\\pi$.'
            : 'Hàm số xác định khi $\\sin(' + argExpr + ') \\ne 0 \\Leftrightarrow ' + argExpr + ' \\ne k\\pi$.',
          'Giải bất phương trình theo $x$ ta được $x \\ne ' + x0Latex + ' + k' + stepPi + ',\\, k \\in \\mathbb{Z}$.',
          'Vậy tập xác định là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 5, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (tan(x + 5π))', params: { a: 1, b: 5, mode: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): GTLN/GTNN hàm y = a sin(bx) + c hoặc a cos(bx) + c
  t11_b3_d05_extrema_linear_sin_cos_mc: {
    id: 't11_b3_d05_extrema_linear_sin_cos_mc',
    name: 'Giá trị lớn nhất, nhỏ nhất của hàm số y = a sin(bx) + c hoặc a cos(bx) + c',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Tìm GTLN hoặc GTNN của hàm số y = a sin(bx) + c hoặc y = a cos(bx) + c.',
    conditionSummary: 'a ∈ [-9; 9] \\ {0}, b ∈ [1; 5], c ∈ [-12; 12]',
    paramSpecs: [
      { name: 'a', label: 'Biên độ a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số góc b', min: 1, max: 5 },
      { name: 'c', label: 'Hằng số c', min: -12, max: 12 },
      { name: 'fnIdx', label: 'Hàm (0: sin, 1: cos)', min: 0, max: 1 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, fnIdx, targetIdx } = params;
      if (a === 0 || b < 1) return { valid: false, reason: 'a != 0 và b >= 1' };
      if ((fnIdx !== 0 && fnIdx !== 1) || (targetIdx !== 0 && targetIdx !== 1)) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, fnIdx, targetIdx } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const trigTerm = (fnIdx === 0 ? '\\sin ' : '\\cos ') + fmtMulVar(b, 'x');
      const expr = fmtLinearTrig(a, trigTerm, c);
      const maxV = c + Math.abs(a);
      const minV = c - Math.abs(a);
      const ans = targetIdx === 0 ? maxV : minV;
      const other = targetIdx === 0 ? minV : maxV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + other + '$', '$' + (ans - 3) + '$', '$' + (c + Math.abs(a) + 2) + '$', '$' + c + '$'],
        rng,
        (k) => '$' + (ans + k * 2 + 1) + '$'
      );
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Với mọi $x \\in \\mathbb{R}$, ta có $-1 \\le ' + trigTerm + ' \\le 1$.',
          'Nhân cả hai vế với $' + a + '$ rồi cộng thêm $' + c + '$ ta được $' + minV + ' \\le y \\le ' + maxV + '$.',
          'Vậy giá trị ' + label + ' của hàm số là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 2, c: -10, fnIdx: 0, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (y = -4sin 2x - 10, max)', params: { a: -4, b: 2, c: -10, fnIdx: 0, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): GTLN/GTNN hàm y = a cos^2(bx) + c hoặc a sin^2(bx) + c
  t11_b3_d06_extrema_sq_trig_mc: {
    id: 't11_b3_d06_extrema_sq_trig_mc',
    name: 'Giá trị lớn nhất, nhỏ nhất của hàm số y = a cos²(bx) + c hoặc a sin²(bx) + c',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Tìm GTLN hoặc GTNN của hàm số y = a cos²(bx) + c hoặc y = a sin²(bx) + c.',
    conditionSummary: 'a ∈ [-8; 8] \\ {0}, b ∈ [1; 6], c ∈ [-12; 12]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số góc b', min: 1, max: 6 },
      { name: 'c', label: 'Hằng số c', min: -12, max: 12 },
      { name: 'fnIdx', label: 'Hàm (0: cos², 1: sin²)', min: 0, max: 1 },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, fnIdx, targetIdx } = params;
      if (a === 0 || b < 1) return { valid: false, reason: 'a != 0 và b >= 1' };
      if ((fnIdx !== 0 && fnIdx !== 1) || (targetIdx !== 0 && targetIdx !== 1)) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, fnIdx, targetIdx } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const trigSq = (fnIdx === 0 ? '\\cos^2 ' : '\\sin^2 ') + fmtMulVar(b, 'x');
      const expr = fmtLinearTrig(a, trigSq, c);
      const maxV = c + Math.max(0, a);
      const minV = c + Math.min(0, a);
      const ans = targetIdx === 0 ? maxV : minV;
      const other = targetIdx === 0 ? minV : maxV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const correct = '$' + ans + '$';
      const w1 = '$' + u.simplifyFrac(2 * ans - 3, 2).latex + '$';
      const w2 = '$' + u.simplifyFrac(5 * ans - 13, 5).latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + other + '$', w1, w2, '$' + (ans - a) + '$'],
        rng,
        (k) => '$' + (ans + k * 2 + 1) + '$'
      );
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Với mọi $x \\in \\mathbb{R}$, ta có $0 \\le ' + trigSq + ' \\le 1$.',
          'Thay $' + trigSq + ' = 0$ và $' + trigSq + ' = 1$ vào hàm số ta được $\\min y = ' + minV + '$ và $\\max y = ' + maxV + '$.',
          'Vậy giá trị ' + label + ' của hàm số là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 5, c: -10, fnIdx: 0, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (y = -3cos² 5x - 10, max)', params: { a: -3, b: 5, c: -10, fnIdx: 0, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): GTLN/GTNN hàm y = a sin x + b cos x
  t11_b3_d07_extrema_asin_bcos_mc: {
    id: 't11_b3_d07_extrema_asin_bcos_mc',
    name: 'Giá trị lớn nhất, nhỏ nhất của hàm số y = a sin x + b cos x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Tìm GTLN hoặc GTNN của hàm số y = a sin x + b cos x bằng bất đẳng thức Bunhiacopxki.',
    conditionSummary: 'a, b ∈ [-7; 7] \\ {0}, a² + b² không chính phương',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (của sin x)', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hệ số b (của cos x)', min: -7, max: 7, allowZero: false },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      const r = a * a + b * b;
      const sr = Math.round(Math.sqrt(r));
      if (sr * sr === r) return { valid: false, reason: 'Chọn a, b để √(a² + b²) còn căn thức' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, targetIdx } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const r = a * a + b * b;
      const sinPart = a === 1 ? '\\sin x' : a === -1 ? '-\\sin x' : String(a) + '\\sin x';
      const cosPart = b === 1 ? ' + \\cos x' : b === -1 ? ' - \\cos x' : b > 0 ? ' + ' + b + '\\cos x' : ' - ' + Math.abs(b) + '\\cos x';
      const expr = sinPart + cosPart;
      const maxLatex = fmtRadFrac(1, r, 1);
      const minLatex = fmtRadFrac(-1, r, 1);
      const ansLatex = targetIdx === 0 ? maxLatex : minLatex;
      const oppLatex = targetIdx === 0 ? minLatex : maxLatex;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const correct = '$' + ansLatex + '$';
      const w1 = '$' + u.simplifyFrac(-(r + 2), 3).latex + '$';
      const w2 = '$' + u.simplifyFrac(r + 1, 2).latex + '$';
      const w3 = '$' + (Math.abs(a) + Math.abs(b)) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [oppLatex.startsWith('$') ? oppLatex : '$' + oppLatex + '$', w1, w2, w3],
        rng,
        (k) => '$' + fmtRadFrac(targetIdx === 0 ? 1 : -1, r + k + 1, 1) + '$'
      );
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng bất đẳng thức Bunhiacopxki: $y^2 = (' + expr + ')^2 \\le ((' + a + ')^2 + (' + b + ')^2)(\\sin^2 x + \\cos^2 x) = ' + r + '$.',
          'Suy ra $' + minLatex + ' \\le y \\le ' + maxLatex + '$, tức là $\\max y = ' + maxLatex + '$ và $\\min y = ' + minLatex + '$.',
          'Vậy giá trị ' + label + ' của hàm số là $' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Pytago (3, 4)', params: { a: 3, b: 4, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (2sin x - 3cos x, max)', params: { a: 2, b: -3, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): GTLN/GTNN hàm y = a sin x + b cos x + c (c != 0)
  t11_b3_d08_extrema_asin_bcos_c_mc: {
    id: 't11_b3_d08_extrema_asin_bcos_c_mc',
    name: 'Giá trị lớn nhất, nhỏ nhất của hàm số y = a sin x + b cos x + c',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Tìm GTLN hoặc GTNN của hàm số y = a sin x + b cos x + c với c ≠ 0.',
    conditionSummary: 'a, b, c ≠ 0 và a² + b² không phải số chính phương',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -8, max: 8, allowZero: false },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c, targetIdx } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'a, b, c phải khác 0' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      const r = a * a + b * b;
      const sr = Math.round(Math.sqrt(r));
      if (sr * sr === r) return { valid: false, reason: 'Chọn để √(a² + b²) giữ dạng căn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, targetIdx } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const r = a * a + b * b;
      const sinPart = a === 1 ? '\\sin x' : a === -1 ? '-\\sin x' : String(a) + '\\sin x';
      const cosPart = b === 1 ? ' + \\cos x' : b === -1 ? ' - \\cos x' : b > 0 ? ' + ' + b + '\\cos x' : ' - ' + Math.abs(b) + '\\cos x';
      const expr = sinPart + cosPart + u.formatTrailingConst(c);
      const radMax = fmtRadFrac(1, r, 1);
      const radMin = fmtRadFrac(-1, r, 1);
      const maxLatex = fmtConstShift(c, radMax);
      const minLatex = fmtConstShift(c, radMin);
      const ansLatex = targetIdx === 0 ? maxLatex : minLatex;
      const otherLatex = targetIdx === 0 ? minLatex : maxLatex;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const correct = '$' + ansLatex + '$';
      const wSign = '$' + fmtConstShift(-c, targetIdx === 0 ? radMax : radMin) + '$';
      const wFrac1 = '$' + u.simplifyFrac(c * 4 - r, 4).latex + '$';
      const wFrac2 = '$' + u.simplifyFrac(c * 4 + r, 4).latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + otherLatex + '$', wSign, wFrac1, wFrac2],
        rng,
        (k) => '$' + fmtConstShift(c + k, targetIdx === 0 ? radMax : radMin) + '$'
      );
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $-\\sqrt{' + r + '} \\le ' + sinPart + cosPart + ' \\le \\sqrt{' + r + '}$.',
          'Cộng thêm $' + c + '$ vào hai vế: $' + minLatex + ' \\le y \\le ' + maxLatex + '$.',
          'Vậy giá trị ' + label + ' của hàm số là $' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { a: -5, b: -3, c: 0, targetIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (-5sin x - 3cos x - 2, min)', params: { a: -5, b: -3, c: -2, targetIdx: 1 }, expectedValid: true },
    ],
  },

  // D09 (Q9): GTLN/GTNN hàm y = a sin^2 x cos^2 x + c
  t11_b3_d09_extrema_sin2_cos2_mc: {
    id: 't11_b3_d09_extrema_sin2_cos2_mc',
    name: 'Giá trị lớn nhất, nhỏ nhất của hàm số y = a sin²x cos²x + c',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Tìm GTLN hoặc GTNN của hàm số y = a sin²x cos²x + c bằng cách đưa về sin²(2x).',
    conditionSummary: 'a ∈ [-12; 12] \\ {0}, c ∈ [-10; 10]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -12, max: 12, allowZero: false },
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
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const expr = fmtLinearTrig(a, '\\sin^2 x\\cos^2 x', c);
      const end2 = u.simplifyFrac(4 * c + a, 4);
      const maxIsEnd2 = a > 0;
      const maxFrac = maxIsEnd2 ? end2 : u.simplifyFrac(c, 1);
      const minFrac = maxIsEnd2 ? u.simplifyFrac(c, 1) : end2;
      const ansFrac = targetIdx === 0 ? maxFrac : minFrac;
      const otherFrac = targetIdx === 0 ? minFrac : maxFrac;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const correct = '$' + ansFrac.latex + '$';
      const wFullA = '$' + u.simplifyFrac(c + a, 1).latex + '$';
      const wOpp = '$' + u.simplifyFrac(-c, 1).latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + otherFrac.latex + '$', wFullA, wOpp, '$' + (c - 2) + '$', '$' + (c + 3) + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(ansFrac.num + k, ansFrac.den).latex + '$'
      );
      const coeff2 = u.simplifyFrac(a, 4);
      const reducedExpr = String(c) + (coeff2.num > 0 ? ' + ' : ' - ') + (Math.abs(coeff2.num) === 1 && coeff2.den === 1 ? '' : u.simplifyFrac(Math.abs(coeff2.num), coeff2.den).latex) + '\\sin^2 2x';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\sin^2 x\\cos^2 x = \\frac{1}{4}\\sin^2 2x \\in \\left[0;\\, \\frac{1}{4}\\right]$.',
          'Suy ra $y = ' + reducedExpr + ' \\in \\left[' + minFrac.latex + ';\\, ' + maxFrac.latex + '\\right]$.',
          'Vậy giá trị ' + label + ' của hàm số là $' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, c: 5, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (-4sin²x cos²x + 5, max)', params: { a: -4, c: 5, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): GTLN/GTNN hàm y = a sin^2 x + b cos 2x
  t11_b3_d10_extrema_sin2_cos2x_mc: {
    id: 't11_b3_d10_extrema_sin2_cos2x_mc',
    name: 'Giá trị lớn nhất, nhỏ nhất của hàm số y = a sin²x + b cos 2x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Hạ bậc sin²x = (1 - cos 2x)/2 để tìm GTLN hoặc GTNN của y = a sin²x + b cos 2x.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0} và 2b - a ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (của sin²x)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b (của cos 2x)', min: -9, max: 9, allowZero: false },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (2 * b - a === 0) return { valid: false, reason: 'Tránh 2b - a = 0 làm hàm hằng' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, targetIdx } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const sin2Part = a === 1 ? '\\sin^2 x' : a === -1 ? '-\\sin^2 x' : String(a) + '\\sin^2 x';
      const cos2xPart = b === 1 ? ' + \\cos 2x' : b === -1 ? ' - \\cos 2x' : b > 0 ? ' + ' + b + '\\cos 2x' : ' - ' + Math.abs(b) + '\\cos 2x';
      const expr = sin2Part + cos2xPart;
      const mid = u.simplifyFrac(a, 2);
      const amp = u.simplifyFrac(2 * b - a, 2);
      const absAmpNum = Math.abs(2 * b - a);
      const minV = (a - absAmpNum) / 2;
      const maxV = (a + absAmpNum) / 2;
      const ans = targetIdx === 0 ? maxV : minV;
      const other = targetIdx === 0 ? minV : maxV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + other + '$',
          '$' + u.simplifyFrac(3 * Math.abs(b), 2).latex + '$',
          '$' + u.simplifyFrac(-3 * Math.abs(b), 2).latex + '$',
          '$' + (Math.abs(a) + Math.abs(b)) + '$',
        ],
        rng,
        (k) => '$' + (ans + k + 1) + '$'
      );
      const ampTerm = amp.num > 0 ? ' + ' + amp.latex + '\\cos 2x' : ' - ' + u.simplifyFrac(-amp.num, amp.den).latex + '\\cos 2x';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Sử dụng công thức hạ bậc $\\sin^2 x = \\frac{1 - \\cos 2x}{2}$ ta được $y = ' + mid.latex + ampTerm + '$.',
          'Vì $\\cos 2x \\in [-1; 1]$ nên $y \\in [' + minV + ';\\, ' + maxV + ']$.',
          'Vậy giá trị ' + label + ' của hàm số là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 2b - a = 0', params: { a: 4, b: 2, targetIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (5sin²x + 7cos 2x, min)', params: { a: 5, b: 7, targetIdx: 1 }, expectedValid: true },
    ],
  },

  // D11 (Q11): GTLN/GTNN hàm y = a cos^2 x + b cos 2x
  t11_b3_d11_extrema_cos2_cos2x_mc: {
    id: 't11_b3_d11_extrema_cos2_cos2x_mc',
    name: 'Giá trị lớn nhất, nhỏ nhất của hàm số y = a cos²x + b cos 2x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giá trị lớn nhất và nhỏ nhất',
    description: 'Hạ bậc cos²x = (1 + cos 2x)/2 để tìm GTLN hoặc GTNN của y = a cos²x + b cos 2x.',
    conditionSummary: 'a, b ∈ [-9; 9] \\ {0} và a + 2b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (của cos²x)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b (của cos 2x)', min: -9, max: 9, allowZero: false },
      { name: 'targetIdx', label: 'Yêu cầu (0: GTLN, 1: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, targetIdx } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b khác 0' };
      if (a + 2 * b === 0) return { valid: false, reason: 'Tránh a + 2b = 0 làm hàm hằng' };
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
      const other = targetIdx === 0 ? minV : maxV;
      const label = targetIdx === 0 ? 'lớn nhất' : 'nhỏ nhất';
      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + other + '$', '$\\frac{1}{2}$', '$' + (ans - 13) + '$', '$' + (ans + 2) + '$'],
        rng,
        (k) => '$' + (ans + k * 2 + 1) + '$'
      );
      const ampTerm = amp.num > 0 ? ' + ' + amp.latex + '\\cos 2x' : ' - ' + u.simplifyFrac(-amp.num, amp.den).latex + '\\cos 2x';
      return {
        stem: 'Tìm giá trị ' + label + ' của hàm số $y = ' + expr + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Sử dụng công thức hạ bậc $\\cos^2 x = \\frac{1 + \\cos 2x}{2}$ ta được $y = ' + mid.latex + ampTerm + '$.',
          'Vì $\\cos 2x \\in [-1; 1]$ nên $y \\in [' + minV + ';\\, ' + maxV + ']$.',
          'Vậy giá trị ' + label + ' của hàm số là $' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a + 2b = 0', params: { a: 4, b: -2, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (4cos²x + 3cos 2x, max)', params: { a: 4, b: 3, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Tập giá trị hàm y = d + a sin(bx + pπ/q)
  t11_b3_d12_range_shifted_trig_mc: {
    id: 't11_b3_d12_range_shifted_trig_mc',
    name: 'Tìm tập giá trị của hàm số y = d + a sin(bx + φ) hoặc d + a cos(bx + φ)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tập giá trị hàm số lượng giác',
    description: 'Xác định tập giá trị T = [m; M] của hàm số y = d + a sin(bx + pπ/q) hoặc cos.',
    conditionSummary: 'a ∈ [-8; 8] \\ {0}, b ∈ [2; 9], d ∈ [-6; 10]',
    paramSpecs: [
      { name: 'd', label: 'Hằng số dịch d', min: -6, max: 10 },
      { name: 'a', label: 'Biên độ a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Tần số góc b', min: 2, max: 9 },
      { name: 'q', label: 'Mẫu pha π/q', min: 3, max: 9 },
      { name: 'fnIdx', label: 'Hàm (0: sin, 1: cos)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, q, fnIdx } = params;
      if (a === 0 || b < 1 || q < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      if (fnIdx !== 0 && fnIdx !== 1) return { valid: false, reason: 'fnIdx không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d, a, b, q, fnIdx } = params;
      const fnName = fnIdx === 0 ? '\\sin' : '\\cos';
      const inner = String(b) + 'x + \\frac{\\pi}{' + q + '}';
      const trigExpr = fnName + '\\left(' + inner + '\\right)';
      const signedA = a === 1 ? ' + ' + trigExpr : a === -1 ? ' - ' + trigExpr : a > 0 ? ' + ' + a + trigExpr : ' - ' + Math.abs(a) + trigExpr;
      const expr = String(d) + signedA;
      const minV = d - Math.abs(a);
      const maxV = d + Math.abs(a);
      const correct = '$[' + minV + ';\\, ' + maxV + ']$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$[' + minV + ';\\, ' + (maxV + 1) + ']$',
          '$[-1;\\, ' + maxV + ']$',
          '$[' + (minV - 2) + ';\\, ' + (maxV + 1) + ']$',
          '$[' + (-Math.abs(a)) + ';\\, ' + Math.abs(a) + ']$',
        ],
        rng,
        (k) => '$[' + (minV + k) + ';\\, ' + (maxV + k) + ']$'
      );
      return {
        stem: 'Tập giá trị của hàm số $y = ' + expr + '$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $-1 \\le ' + trigExpr + ' \\le 1$ nên $-' + Math.abs(a) + ' \\le ' + (a > 0 ? '' : '-') + (Math.abs(a) === 1 ? '' : Math.abs(a)) + trigExpr + ' \\le ' + Math.abs(a) + '$.',
          'Cộng thêm $' + d + '$ suy ra $' + minV + ' \\le y \\le ' + maxV + '$. Vậy tập giá trị là $T = ' + correct.slice(1, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { d: 7, a: 0, b: 8, q: 9, fnIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (7 - 5sin(8x + π/9))', params: { d: 7, a: -5, b: 8, q: 9, fnIdx: 0 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Nhận biết hàm số chẵn
  t11_b3_d13_identify_even_function_mc: {
    id: 't11_b3_d13_identify_even_function_mc',
    name: 'Nhận biết hàm số lượng giác chẵn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính chẵn lẻ của hàm số lượng giác',
    description: 'Nhận biết hàm số chẵn trong 4 hàm số lượng giác cho trước.',
    conditionSummary: 'evenIdx ∈ [0; 3], k ∈ [1; 5], đảm bảo duy nhất 1 đáp án là hàm số chẵn',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 1, max: 5 },
      { name: 'evenIdx', label: 'Mẫu hàm chẵn (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { k, evenIdx } = params;
      if (k < 1 || evenIdx < 0 || evenIdx > 3) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, evenIdx } = params;
      const evenList = [
        '$y = \\sin^2 x + ' + (k + 1) + '\\cos x$',
        '$y = ' + (k + 1) + '\\cos^2 x - \\cos x$',
        '$y = \\tan^2 x + ' + (k + 1) + '\\cos x$',
        '$y = \\sin^4 x + \\cos^2 x + ' + k + '$',
      ];
      const nonEvenPool = [
        '$y = \\sin x + \\tan x$',
        '$y = \\sin^3 x$',
        '$y = \\tan x + \\cos x$',
        '$y = \\sin x + \\cos x$',
        '$y = ' + (k + 1) + '\\tan x - \\sin x$',
        '$y = \\sin^2 x + \\sin x$',
      ];
      const correct = evenList[evenIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [nonEvenPool[0], nonEvenPool[1], nonEvenPool[2]],
        rng,
        (step) => nonEvenPool[(step + 2) % nonEvenPool.length]
      );
      return {
        stem: 'Hàm số nào sau đây là hàm số chẵn?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số $y = f(x)$ có tập xác định $D$ đối xứng và $f(-x) = f(x)$ với mọi $x \\in D$ là hàm số chẵn.',
          'Ta có $\\sin(-x) = -\\sin x$ nên $\\sin^2(-x) = \\sin^2 x$, $\\tan^2(-x) = \\tan^2 x$, và $\\cos(-x) = \\cos x$.',
          'Kiểm tra các đáp án, hàm số chẵn là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên evenIdx = 4', params: { k: 1, evenIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (sin²x + 2cos x)', params: { k: 1, evenIdx: 0 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Nhận biết hàm số lẻ
  t11_b3_d14_identify_odd_function_mc: {
    id: 't11_b3_d14_identify_odd_function_mc',
    name: 'Nhận biết hàm số lượng giác lẻ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính chẵn lẻ của hàm số lượng giác',
    description: 'Nhận biết hàm số lẻ trong 4 hàm số lượng giác cho trước.',
    conditionSummary: 'oddIdx ∈ [0; 3], k ∈ [1; 5], đảm bảo duy nhất 1 đáp án là hàm số lẻ',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 1, max: 5 },
      { name: 'oddIdx', label: 'Mẫu hàm lẻ (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { k, oddIdx } = params;
      if (k < 1 || oddIdx < 0 || oddIdx > 3) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, oddIdx } = params;
      const oddList = [
        '$y = \\tan x$',
        '$y = ' + (k === 1 ? '' : k) + '\\sin x + \\tan x$',
        '$y = \\sin^3 ' + (k === 1 ? 'x' : k + 'x') + '$',
        '$y = ' + (k + 1) + '\\cot x - \\sin x$',
      ];
      const nonOddPool = [
        '$y = \\cos x$',
        '$y = \\sin^2 x + \\cos x$',
        '$y = \\cos^4 x$',
        '$y = \\tan x + \\cos x$',
        '$y = \\sin^2 x + ' + (k + 1) + '$',
      ];
      const correct = oddList[oddIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [nonOddPool[0], nonOddPool[1], nonOddPool[2]],
        rng,
        (step) => nonOddPool[(step + 2) % nonOddPool.length]
      );
      return {
        stem: 'Hàm số nào sau đây là hàm số lẻ?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số $y = f(x)$ có tập xác định $D$ đối xứng và $f(-x) = -f(x)$ với mọi $x \\in D$ là hàm số lẻ.',
          'Do $\\sin(-u) = -\\sin u$, $\\tan(-u) = -\\tan u$, $\\cot(-u) = -\\cot u$, nên hàm số lẻ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên oddIdx = -1', params: { k: 1, oddIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (y = tan x)', params: { k: 1, oddIdx: 0 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Chu kì tuần hoàn của y = a cot(bx), a tan(bx), a sin(bx), a cos(bx)
  t11_b3_d15_trig_period_mc: {
    id: 't11_b3_d15_trig_period_mc',
    name: 'Tìm chu kì tuần hoàn của hàm số y = a cot(bx), tan(bx), sin(bx), cos(bx)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính tuần hoàn của hàm số lượng giác',
    description: 'Tìm chu kì tuần hoàn T của hàm số lượng giác y = a f(bx).',
    conditionSummary: 'a ∈ [-7; 7] \\ {0}, b ∈ [2; 9]',
    paramSpecs: [
      { name: 'a', label: 'Biên độ a', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hệ số góc b', min: 2, max: 9 },
      { name: 'fnIdx', label: 'Hàm (0: cot, 1: tan, 2: sin, 3: cos)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, fnIdx } = params;
      if (a === 0 || b < 2) return { valid: false, reason: 'a != 0 và b >= 2' };
      if (fnIdx < 0 || fnIdx > 3) return { valid: false, reason: 'Chỉ số hàm ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, fnIdx } = params;
      ` + TRIG11_B3_MC_HELPERS + String.raw`
      const fnNames = ['\\cot', '\\tan', '\\sin', '\\cos'];
      const fnStr = fnNames[fnIdx];
      const basePi = fnIdx <= 1 ? 1 : 2;
      const expr = (a === 1 ? '' : a === -1 ? '-' : String(a)) + fnStr + '(' + b + 'x)';
      const trueT = fmtPiFrac(basePi, b);
      const correct = '$' + trueT + '$';
      const wMulB = '$' + fmtPiFrac(basePi * b, 1) + '$';
      const wHalf = '$' + fmtPiFrac(basePi * 2, b) + '$';
      const wDoubleMul = '$' + fmtPiFrac(basePi * b * 2, 1) + '$';
      const wOtherBase = '$' + fmtPiFrac(fnIdx <= 1 ? 1 : 1, 2 * b) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [wMulB, wHalf, wDoubleMul, wOtherBase],
        rng,
        (k) => '$' + fmtPiFrac(basePi, b + k + 1) + '$'
      );
      return {
        stem: 'Hàm số $y = ' + expr + '$ có chu kì tuần hoàn là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          fnIdx <= 1
            ? 'Hàm số $y = ' + fnStr + '(bx)$ có chu kì tuần hoàn cơ bản là $T = \\dfrac{\\pi}{|b|}$.'
            : 'Hàm số $y = ' + fnStr + '(bx)$ có chu kì tuần hoàn cơ bản là $T = \\dfrac{2\\pi}{|b|}$.',
          'Thay $b = ' + b + '$ ta được $T = ' + trueT + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { a: -4, b: 1, fnIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (-4cot(6x))', params: { a: -4, b: 6, fnIdx: 0 }, expectedValid: true },
    ],
  },
};
