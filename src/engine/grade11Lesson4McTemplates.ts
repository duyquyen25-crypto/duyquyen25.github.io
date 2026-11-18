import { MathTemplate } from '../types/math';

const TRIG11_B4_MC_HELPERS = String.raw`
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
  const fmtKPiTerm = (num, den) => {
    const f = u.simplifyFrac(Math.abs(num), Math.abs(den));
    if (f.den === 1) {
      return f.num === 1 ? 'k\\pi' : 'k' + f.num + '\\pi';
    }
    return 'k\\frac{' + (f.num === 1 ? '' : f.num) + '\\pi}{' + f.den + '}';
  };
  const fmtRootExpr = (sNum, sDen, pNum, pDen) => {
    const f = u.simplifyFrac(sNum, sDen);
    if (f.num === 0) return 'x = ' + fmtKPiTerm(pNum, pDen);
    return 'x = ' + fmtPiFrac(f.num, f.den) + ' + ' + fmtKPiTerm(pNum, pDen);
  };
  const fmtLinearArg = (a, p, q) => {
    const aPart = a === 1 ? 'x' : a === -1 ? '-x' : a + 'x';
    const f = u.simplifyFrac(p, q);
    if (f.num === 0) return aPart;
    const absPi = fmtPiFrac(Math.abs(f.num), f.den);
    return f.num > 0 ? aPart + ' + ' + absPi : aPart + ' - ' + absPi;
  };
  const fmtWrapArg = (a, p, q) => {
    const inner = fmtLinearArg(a, p, q);
    return p === 0 ? inner : '\\left(' + inner + '\\right)';
  };
  const fmtSignedRoot = (num, den) => {
    const f = u.simplifyFrac(num, den);
    return f.latex;
  };
`;

export const G11_B4_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Phương trình lượng giác đặc biệt sin x = v (v ∈ {-1, 0, 1})
  t11_b4_d01_sin_special_mc: {
    id: 't11_b4_d01_sin_special_mc',
    name: 'Nghiệm phương trình đặc biệt sin x = 1, -1 hoặc 0',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Tìm họ nghiệm của phương trình lượng giác đặc biệt sin x = v với v ∈ {1, -1, 0}.',
    conditionSummary: 'valIdx ∈ {0, 1, 2} tương ứng sin x = 1, -1, 0',
    paramSpecs: [
      { name: 'valIdx', label: 'Giá trị VP (0: 1, 1: -1, 2: 0)', min: 0, max: 2 },
    ],
    validateCode: `
      const { valIdx } = params;
      if (valIdx !== 0 && valIdx !== 1 && valIdx !== 2) {
        return { valid: false, reason: 'valIdx phải thuộc {0, 1, 2}' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { valIdx } = params;
      const rhsArr = ['1', '-1', '0'];
      const rhs = rhsArr[valIdx];
      const correctCore = [
        'x = \\frac{\\pi}{2} + k2\\pi',
        'x = -\\frac{\\pi}{2} + k2\\pi',
        'x = k\\pi',
      ][valIdx];
      const correct = '$' + correctCore + ',\\; k \\in \\mathbb{Z}$';
      const allCores = [
        'x = \\frac{\\pi}{2} + k2\\pi',
        'x = -\\frac{\\pi}{2} + k2\\pi',
        'x = \\frac{\\pi}{2} + k\\pi',
        'x = k2\\pi',
        'x = k\\pi',
        'x = \\pi + k2\\pi',
      ];
      const distractors = allCores
        .filter((c) => c !== correctCore)
        .map((c) => '$' + c + ',\\; k \\in \\mathbb{Z}$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$x = \\frac{\\pi}{' + (k + 2) + '} + k2\\pi,\\; k \\in \\mathbb{Z}$'
      );
      return {
        stem: 'Nghiệm của phương trình $\\sin x = ' + rhs + '$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức nghiệm đặc biệt của phương trình $\\sin x = ' + rhs + '$.',
          'Ta có $\\sin x = ' + rhs + ' \\Leftrightarrow ' + correctCore + ',\\; k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên valIdx = 3 (ngoài miền)', params: { valIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (sin x = 1)', params: { valIdx: 0 }, expectedValid: true },
      { label: 'Mẫu sin x = -1', params: { valIdx: 1 }, expectedValid: true },
      { label: 'Mẫu sin x = 0', params: { valIdx: 2 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Phương trình lượng giác đặc biệt cos x = v (v ∈ {-1, 0, 1})
  t11_b4_d02_cos_special_mc: {
    id: 't11_b4_d02_cos_special_mc',
    name: 'Nghiệm phương trình đặc biệt cos x = -1, 0 hoặc 1',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Tìm họ nghiệm của phương trình lượng giác đặc biệt cos x = v với v ∈ {-1, 0, 1}.',
    conditionSummary: 'valIdx ∈ {0, 1, 2} tương ứng cos x = -1, 0, 1',
    paramSpecs: [
      { name: 'valIdx', label: 'Giá trị VP (0: -1, 1: 0, 2: 1)', min: 0, max: 2 },
    ],
    validateCode: `
      const { valIdx } = params;
      if (valIdx !== 0 && valIdx !== 1 && valIdx !== 2) {
        return { valid: false, reason: 'valIdx phải thuộc {0, 1, 2}' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { valIdx } = params;
      const rhsArr = ['-1', '0', '1'];
      const rhs = rhsArr[valIdx];
      const correctCore = [
        'x = \\pi + k2\\pi',
        'x = \\frac{\\pi}{2} + k\\pi',
        'x = k2\\pi',
      ][valIdx];
      const correct = '$' + correctCore + ',\\; k \\in \\mathbb{Z}$';
      const allCores = [
        'x = \\frac{\\pi}{2} + k\\pi',
        'x = \\pi + k2\\pi',
        'x = k2\\pi',
        'x = \\pi + k\\pi',
        'x = k\\pi',
        'x = -\\frac{\\pi}{2} + k2\\pi',
      ];
      const distractors = allCores
        .filter((c) => c !== correctCore)
        .map((c) => '$' + c + ',\\; k \\in \\mathbb{Z}$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$x = \\frac{\\pi}{' + (k + 2) + '} + k2\\pi,\\; k \\in \\mathbb{Z}$'
      );
      return {
        stem: 'Nghiệm của phương trình $\\cos x = ' + rhs + '$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức nghiệm đặc biệt của phương trình $\\cos x = ' + rhs + '$.',
          'Ta có $\\cos x = ' + rhs + ' \\Leftrightarrow ' + correctCore + ',\\; k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên valIdx = -1 (ngoài miền)', params: { valIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (cos x = -1)', params: { valIdx: 0 }, expectedValid: true },
      { label: 'Mẫu cos x = 0', params: { valIdx: 1 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Phương trình đặc biệt cos(mx) = v (m ≥ 2, v ∈ {1, -1, 0})
  t11_b4_d03_cos_mx_special_mc: {
    id: 't11_b4_d03_cos_mx_special_mc',
    name: 'Nghiệm phương trình đặc biệt cos(mx) = 1, -1 hoặc 0',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Tìm họ nghiệm của phương trình cos(mx) = v với m nguyên dương ≥ 2 và v ∈ {1, -1, 0}.',
    conditionSummary: 'm ∈ [2; 12], valIdx ∈ {0, 1, 2}',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 12 },
      { name: 'valIdx', label: 'Giá trị VP (0: 1, 1: -1, 2: 0)', min: 0, max: 2 },
    ],
    validateCode: `
      const { m, valIdx } = params;
      if (m < 2 || m > 12) return { valid: false, reason: 'm phải thuộc [2; 12]' };
      if (valIdx !== 0 && valIdx !== 1 && valIdx !== 2) return { valid: false, reason: 'valIdx phải thuộc {0, 1, 2}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, valIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const rhs = ['1', '-1', '0'][valIdx];
      const baseExpr = [
        'k2\\pi',
        '\\pi + k2\\pi',
        '\\frac{\\pi}{2} + k\\pi',
      ][valIdx];
      const correctCore = [
        fmtRootExpr(0, 1, 2, m),
        fmtRootExpr(1, m, 2, m),
        fmtRootExpr(1, 2 * m, 1, m),
      ][valIdx];
      const correct = '$' + correctCore + ',\\; k \\in \\mathbb{Z}$';
      const wrongCores = [
        'x = -\\frac{\\pi}{2} + k2\\pi',
        'x = \\frac{\\pi}{2} + k\\pi',
        'x = \\frac{\\pi}{2} + k2\\pi',
        fmtRootExpr(1, m, 1, m),
        fmtRootExpr(0, 1, 1, m),
        fmtRootExpr(1, 2 * m, 2, m),
        fmtRootExpr(0, 1, 2, 1),
      ].filter((c) => c !== correctCore);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongCores.map((c) => '$' + c + ',\\; k \\in \\mathbb{Z}$'),
        rng,
        (k) => '$x = \\frac{\\pi}{' + (m + k + 2) + '} + k\\pi,\\; k \\in \\mathbb{Z}$'
      );
      return {
        stem: 'Nghiệm của phương trình $\\cos ' + m + 'x = ' + rhs + '$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\cos ' + m + 'x = ' + rhs + ' \\Leftrightarrow ' + m + 'x = ' + baseExpr + '\\; (k \\in \\mathbb{Z})$.',
          'Chia hai vế cho $' + m + '$ ta được $' + correctCore + ',\\; k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1 (ngoài miền)', params: { m: 1, valIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (cos 6x = 1)', params: { m: 6, valIdx: 0 }, expectedValid: true },
      { label: 'Mẫu cos 4x = -1', params: { m: 4, valIdx: 1 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Phương trình đặc biệt sin(mx) = v (m ≥ 2, v ∈ {1, -1, 0})
  t11_b4_d04_sin_mx_special_mc: {
    id: 't11_b4_d04_sin_mx_special_mc',
    name: 'Nghiệm phương trình đặc biệt sin(mx) = 1, -1 hoặc 0',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Tìm họ nghiệm của phương trình sin(mx) = v với m nguyên dương ≥ 2 và v ∈ {1, -1, 0}.',
    conditionSummary: 'm ∈ [2; 12], valIdx ∈ {0, 1, 2}',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 12 },
      { name: 'valIdx', label: 'Giá trị VP (0: 1, 1: -1, 2: 0)', min: 0, max: 2 },
    ],
    validateCode: `
      const { m, valIdx } = params;
      if (m < 2 || m > 12) return { valid: false, reason: 'm phải thuộc [2; 12]' };
      if (valIdx !== 0 && valIdx !== 1 && valIdx !== 2) return { valid: false, reason: 'valIdx phải thuộc {0, 1, 2}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, valIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const rhs = ['1', '-1', '0'][valIdx];
      const baseExpr = [
        '\\frac{\\pi}{2} + k2\\pi',
        '-\\frac{\\pi}{2} + k2\\pi',
        'k\\pi',
      ][valIdx];
      const correctCore = [
        fmtRootExpr(1, 2 * m, 2, m),
        fmtRootExpr(-1, 2 * m, 2, m),
        fmtRootExpr(0, 1, 1, m),
      ][valIdx];
      const correct = '$' + correctCore + ',\\; k \\in \\mathbb{Z}$';
      const wrongCores = [
        'x = -\\frac{\\pi}{2} + k2\\pi',
        'x = \\frac{\\pi}{2} + k2\\pi',
        fmtRootExpr(0, 1, 1, m),
        fmtRootExpr(1, 2 * m, 1, m),
        fmtRootExpr(-1, 2 * m, 1, m),
        fmtRootExpr(0, 1, 2, m),
        fmtRootExpr(1, m, 2, m),
      ].filter((c) => c !== correctCore);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongCores.map((c) => '$' + c + ',\\; k \\in \\mathbb{Z}$'),
        rng,
        (k) => '$x = \\frac{\\pi}{' + (2 * m + k + 1) + '} + k2\\pi,\\; k \\in \\mathbb{Z}$'
      );
      return {
        stem: 'Nghiệm của phương trình $\\sin ' + m + 'x = ' + rhs + '$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\sin ' + m + 'x = ' + rhs + ' \\Leftrightarrow ' + m + 'x = ' + baseExpr + '\\; (k \\in \\mathbb{Z})$.',
          'Chia hai vế cho $' + m + '$ ta được $' + correctCore + ',\\; k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0 (chia cho 0)', params: { m: 0, valIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (sin 9x = 1)', params: { m: 9, valIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Phương trình cơ bản cos x = cos α
  t11_b4_d05_cos_x_alpha_mc: {
    id: 't11_b4_d05_cos_x_alpha_mc',
    name: 'Giải phương trình cơ bản cos x = m (giá trị lượng giác đặc biệt)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Tìm nghiệm của phương trình cos x = m với m ∈ {±1/2, ±√2/2, ±√3/2}.',
    conditionSummary: 'alphaIdx ∈ [0; 5] ứng với 6 giá trị đặc biệt',
    paramSpecs: [
      { name: 'alphaIdx', label: 'Chỉ số giá trị (0..5)', min: 0, max: 5 },
    ],
    validateCode: `
      const { alphaIdx } = params;
      if (alphaIdx < 0 || alphaIdx > 5) return { valid: false, reason: 'alphaIdx thuộc [0; 5]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { alphaIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const table = [
        { rhs: '\\frac{1}{2}', num: 1, den: 3, altNum: 1, altDen: 6 },
        { rhs: '-\\frac{1}{2}', num: 2, den: 3, altNum: 5, altDen: 6 },
        { rhs: '\\frac{\\sqrt{2}}{2}', num: 1, den: 4, altNum: 3, altDen: 4 },
        { rhs: '-\\frac{\\sqrt{2}}{2}', num: 3, den: 4, altNum: 1, altDen: 4 },
        { rhs: '\\frac{\\sqrt{3}}{2}', num: 1, den: 6, altNum: 1, altDen: 3 },
        { rhs: '-\\frac{\\sqrt{3}}{2}', num: 5, den: 6, altNum: 2, altDen: 3 },
      ];
      const item = table[alphaIdx];
      const aPos = fmtPiFrac(item.num, item.den);
      const aNeg = fmtPiFrac(-item.num, item.den);
      const altPos = fmtPiFrac(item.altNum, item.altDen);
      const altNeg = fmtPiFrac(-item.altNum, item.altDen);
      const correct = '$' + fmtRootExpr(item.num, item.den, 2, 1) + ',\\; ' + fmtRootExpr(-item.num, item.den, 2, 1) + '\\; (k \\in \\mathbb{Z})$';
      const wList = [
        '$' + fmtRootExpr(item.num, item.den, 1, 1) + ',\\; ' + fmtRootExpr(-item.num, item.den, 1, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(-item.altNum, item.altDen, 2, 1) + ',\\; ' + fmtRootExpr(item.altNum, item.altDen, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(item.num, item.den, 2, 1) + ',\\; ' + fmtRootExpr(-item.altNum, item.altDen, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(item.num, item.den, 2, 1) + ',\\; x = ' + fmtPiFrac(item.den - item.num, item.den) + ' + k2\\pi\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (k) => '$x = ' + aPos + ' + k2\\pi,\\; x = ' + altNeg + ' + k' + (k + 2) + '\\pi\\; (k \\in \\mathbb{Z})$'
      );
      return {
        stem: 'Giải phương trình $\\cos x = ' + item.rhs + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\cos x = ' + item.rhs + ' \\Leftrightarrow \\cos x = \\cos ' + aPos + '$.',
          'Suy ra $x = ' + aPos + ' + k2\\pi$ hoặc $x = ' + aNeg + ' + k2\\pi\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên alphaIdx = 6', params: { alphaIdx: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (cos x = √3/2)', params: { alphaIdx: 4 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Phương trình bậc nhất theo cos(mx): c*cos(mx) + d = 0
  t11_b4_d06_linear_cos_mx_mc: {
    id: 't11_b4_d06_linear_cos_mx_mc',
    name: 'Giải phương trình bậc nhất a·cos(mx) + b = 0 (góc đặc biệt)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Đưa phương trình k·(2cos(mx) + d) = 0 về dạng cos(mx) = cos α và tìm họ nghiệm.',
    conditionSummary: 'm ∈ [2; 8], k ∈ {1, 2}, alphaIdx ∈ [0; 5]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 8 },
      { name: 'k', label: 'Nhân tử k', min: 1, max: 2 },
      { name: 'alphaIdx', label: 'Chỉ số giá trị (0..5)', min: 0, max: 5 },
    ],
    validateCode: `
      const { m, k, alphaIdx } = params;
      if (m < 2 || m > 8) return { valid: false, reason: 'm thuộc [2; 8]' };
      if (k !== 1 && k !== 2) return { valid: false, reason: 'k thuộc {1, 2}' };
      if (alphaIdx < 0 || alphaIdx > 5) return { valid: false, reason: 'alphaIdx thuộc [0; 5]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, k, alphaIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      // 2*cos(mx) + constTerm = 0 -> cos(mx) = -constTerm / 2
      const table = [
        { signConst: '-', absTex: '1', rhs: '\\frac{1}{2}', num: 1, den: 3 },
        { signConst: '+', absTex: '1', rhs: '-\\frac{1}{2}', num: 2, den: 3 },
        { signConst: '-', absTex: '\\sqrt{2}', rhs: '\\frac{\\sqrt{2}}{2}', num: 1, den: 4 },
        { signConst: '+', absTex: '\\sqrt{2}', rhs: '-\\frac{\\sqrt{2}}{2}', num: 3, den: 4 },
        { signConst: '-', absTex: '\\sqrt{3}', rhs: '\\frac{\\sqrt{3}}{2}', num: 1, den: 6 },
        { signConst: '+', absTex: '\\sqrt{3}', rhs: '-\\frac{\\sqrt{3}}{2}', num: 5, den: 6 },
      ];
      const item = table[alphaIdx];
      const aCoef = 2 * k;
      const bTerm = k === 1 ? item.absTex : (item.absTex === '1' ? '2' : '2' + item.absTex);
      const eqStr = aCoef + '\\cos ' + m + 'x ' + item.signConst + ' ' + bTerm + ' = 0';
      const r1 = fmtRootExpr(item.num, item.den * m, 2, m);
      const r2 = fmtRootExpr(-item.num, item.den * m, 2, m);
      const correct = '$' + r1 + ',\\; ' + r2 + '\\; (k \\in \\mathbb{Z})$';
      const wList = [
        '$' + fmtRootExpr(item.num, item.den * m, 2, m) + ',\\; ' + fmtRootExpr(-1, item.den * m, 1, m) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(-1, item.den * m, 1, m) + ',\\; ' + fmtRootExpr(1, item.den * m, 1, m) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(item.num, item.den, 1, m) + ',\\; ' + fmtRootExpr(-item.num, item.den, 1, m) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(item.num, item.den * m, 2, 1) + ',\\; ' + fmtRootExpr(-item.num, item.den * m, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(item.num, (item.den + j) * m, 2, m) + ',\\; ' + fmtRootExpr(-item.num, (item.den + j) * m, 2, m) + '\\; (k \\in \\mathbb{Z})$'
      );
      return {
        stem: 'Giải phương trình $' + eqStr + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + eqStr + ' \\Leftrightarrow \\cos ' + m + 'x = ' + item.rhs + ' \\Leftrightarrow \\cos ' + m + 'x = \\cos ' + fmtPiFrac(item.num, item.den) + '$.',
          'Suy ra $' + m + 'x = \\pm ' + fmtPiFrac(item.num, item.den) + ' + k2\\pi \\Leftrightarrow ' + r1 + '$ hoặc $' + r2 + '\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { m: 4, k: 0, alphaIdx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (2cos 4x + √3 = 0)', params: { m: 4, k: 1, alphaIdx: 5 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Phương trình cơ bản sin x = sin α
  t11_b4_d07_sin_x_alpha_mc: {
    id: 't11_b4_d07_sin_x_alpha_mc',
    name: 'Giải phương trình cơ bản sin x = m (giá trị lượng giác đặc biệt)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Tìm nghiệm của phương trình sin x = m với m ∈ {±1/2, ±√2/2, ±√3/2}.',
    conditionSummary: 'alphaIdx ∈ [0; 5] ứng với 6 giá trị đặc biệt',
    paramSpecs: [
      { name: 'alphaIdx', label: 'Chỉ số giá trị (0..5)', min: 0, max: 5 },
    ],
    validateCode: `
      const { alphaIdx } = params;
      if (alphaIdx < 0 || alphaIdx > 5) return { valid: false, reason: 'alphaIdx thuộc [0; 5]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { alphaIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const table = [
        { rhs: '\\frac{1}{2}', num: 1, den: 6 },
        { rhs: '-\\frac{1}{2}', num: -1, den: 6 },
        { rhs: '\\frac{\\sqrt{2}}{2}', num: 1, den: 4 },
        { rhs: '-\\frac{\\sqrt{2}}{2}', num: -1, den: 4 },
        { rhs: '\\frac{\\sqrt{3}}{2}', num: 1, den: 3 },
        { rhs: '-\\frac{\\sqrt{3}}{2}', num: -1, den: 3 },
      ];
      const item = table[alphaIdx];
      const num2 = item.den - item.num;
      const r1 = fmtRootExpr(item.num, item.den, 2, 1);
      const r2 = fmtRootExpr(num2, item.den, 2, 1);
      const correct = '$' + r1 + ',\\; ' + r2 + '\\; (k \\in \\mathbb{Z})$';
      const wList = [
        '$' + fmtRootExpr(item.num, item.den, 1, 1) + ',\\; ' + fmtRootExpr(num2, item.den, 1, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(item.num, item.den, 2, 1) + ',\\; ' + fmtRootExpr(-item.num, item.den, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(num2, item.den, 1, 1) + ',\\; ' + fmtRootExpr(-item.num, item.den, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(-num2, item.den, 2, 1) + ',\\; ' + fmtRootExpr(-item.num, item.den, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (k) => '$' + fmtRootExpr(item.num, item.den + k, 2, 1) + ',\\; ' + fmtRootExpr(num2, item.den + k, 2, 1) + '\\; (k \\in \\mathbb{Z})$'
      );
      return {
        stem: 'Giải phương trình $\\sin x = ' + item.rhs + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\sin x = ' + item.rhs + ' \\Leftrightarrow \\sin x = \\sin \\left(' + fmtPiFrac(item.num, item.den) + '\\right)$.',
          'Suy ra $' + r1 + '$ hoặc $' + r2 + '\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên alphaIdx = -1', params: { alphaIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (sin x = -√2/2)', params: { alphaIdx: 3 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Phương trình cơ bản sin(mx) = sin α
  t11_b4_d08_sin_mx_alpha_mc: {
    id: 't11_b4_d08_sin_mx_alpha_mc',
    name: 'Giải phương trình cơ bản sin(mx) = b (m ≥ 2)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình sin(mx) = b với m ∈ [2; 9] và b là giá trị lượng giác đặc biệt.',
    conditionSummary: 'm ∈ [2; 9], alphaIdx ∈ [0; 5]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 9 },
      { name: 'alphaIdx', label: 'Chỉ số giá trị (0..5)', min: 0, max: 5 },
    ],
    validateCode: `
      const { m, alphaIdx } = params;
      if (m < 2 || m > 9) return { valid: false, reason: 'm thuộc [2; 9]' };
      if (alphaIdx < 0 || alphaIdx > 5) return { valid: false, reason: 'alphaIdx thuộc [0; 5]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, alphaIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const table = [
        { rhs: '\\frac{1}{2}', num: 1, den: 6 },
        { rhs: '-\\frac{1}{2}', num: -1, den: 6 },
        { rhs: '\\frac{\\sqrt{2}}{2}', num: 1, den: 4 },
        { rhs: '-\\frac{\\sqrt{2}}{2}', num: -1, den: 4 },
        { rhs: '\\frac{\\sqrt{3}}{2}', num: 1, den: 3 },
        { rhs: '-\\frac{\\sqrt{3}}{2}', num: -1, den: 3 },
      ];
      const item = table[alphaIdx];
      const num2 = item.den - item.num;
      const r1 = fmtRootExpr(item.num, item.den * m, 2, m);
      const r2 = fmtRootExpr(num2, item.den * m, 2, m);
      const correct = '$' + r1 + ',\\; ' + r2 + '\\; (k \\in \\mathbb{Z})$';
      const wList = [
        '$' + fmtRootExpr(item.num, item.den * m, 2, 1) + ',\\; ' + fmtRootExpr(num2, item.den * m, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(item.num, item.den, 1, 1) + ',\\; ' + fmtRootExpr(num2, item.den, 1, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(item.num, item.den * m, 2, m) + ',\\; ' + fmtRootExpr(-item.num, item.den * m, 2, m) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(num2, item.den, 1, m) + ',\\; ' + fmtRootExpr(item.num, item.den * m, 1, m) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(item.num, (item.den + j) * m, 2, m) + ',\\; ' + fmtRootExpr(num2, (item.den + j) * m, 2, m) + '\\; (k \\in \\mathbb{Z})$'
      );
      return {
        stem: 'Giải phương trình $\\sin ' + m + 'x = ' + item.rhs + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\sin ' + m + 'x = ' + item.rhs + ' \\Leftrightarrow \\sin ' + m + 'x = \\sin\\left(' + fmtPiFrac(item.num, item.den) + '\\right)$.',
          'Suy ra $' + m + 'x = ' + fmtPiFrac(item.num, item.den) + ' + k2\\pi$ hoặc $' + m + 'x = ' + fmtPiFrac(num2, item.den) + ' + k2\\pi$.',
          'Chia hai vế cho $' + m + '$ thu được $' + r1 + '$ hoặc $' + r2 + '\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { m: 1, alphaIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (sin 7x = √3/2)', params: { m: 7, alphaIdx: 4 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Phương trình cơ bản tan(mx) = b
  t11_b4_d09_tan_mx_alpha_mc: {
    id: 't11_b4_d09_tan_mx_alpha_mc',
    name: 'Giải phương trình cơ bản tan(mx) = b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình tan(mx) = b với m ∈ [2; 12] và b ∈ {0, ±1, ±√3, ±√3/3}.',
    conditionSummary: 'm ∈ [2; 12], alphaIdx ∈ [0; 6]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 12 },
      { name: 'alphaIdx', label: 'Chỉ số giá trị (0..6)', min: 0, max: 6 },
    ],
    validateCode: `
      const { m, alphaIdx } = params;
      if (m < 2 || m > 12) return { valid: false, reason: 'm thuộc [2; 12]' };
      if (alphaIdx < 0 || alphaIdx > 6) return { valid: false, reason: 'alphaIdx thuộc [0; 6]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, alphaIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const table = [
        { rhs: '0', num: 0, den: 1 },
        { rhs: '1', num: 1, den: 4 },
        { rhs: '-1', num: -1, den: 4 },
        { rhs: '\\sqrt{3}', num: 1, den: 3 },
        { rhs: '-\\sqrt{3}', num: -1, den: 3 },
        { rhs: '\\frac{\\sqrt{3}}{3}', num: 1, den: 6 },
        { rhs: '-\\frac{\\sqrt{3}}{3}', num: -1, den: 6 },
      ];
      const item = table[alphaIdx];
      const rCore = fmtRootExpr(item.num, item.den * m, 1, m);
      const correct = '$' + rCore + ',\\; k \\in \\mathbb{Z}$';
      const altNum = item.num === 0 ? 1 : -item.num;
      const altDen = item.num === 0 ? 4 : item.den;
      const wList = [
        '$' + fmtRootExpr(item.num, item.den * m, 1, 1) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(item.num, item.den * m, 2, m) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(item.num, item.den, 1, 1) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(altNum, altDen * m, 1, m) + ',\\; k \\in \\mathbb{Z}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(item.num === 0 ? j : item.num, (item.den + j) * m, 1, m) + ',\\; k \\in \\mathbb{Z}$'
      );
      return {
        stem: 'Giải phương trình $\\tan ' + m + 'x = ' + item.rhs + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\tan ' + m + 'x = ' + item.rhs + ' \\Leftrightarrow \\tan ' + m + 'x = \\tan\\left(' + fmtPiFrac(item.num, item.den) + '\\right)$.',
          'Suy ra $' + m + 'x = ' + fmtPiFrac(item.num, item.den) + ' + k\\pi \\Leftrightarrow ' + rCore + ',\\; k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { m: 0, alphaIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (tan 10x = 1)', params: { m: 10, alphaIdx: 1 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Phương trình cơ bản cot(mx) = b
  t11_b4_d10_cot_mx_alpha_mc: {
    id: 't11_b4_d10_cot_mx_alpha_mc',
    name: 'Giải phương trình cơ bản cot(mx) = b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình cot(mx) = b với m ∈ [2; 12] và b ∈ {0, ±1, ±√3, ±√3/3}.',
    conditionSummary: 'm ∈ [2; 12], alphaIdx ∈ [0; 6]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 12 },
      { name: 'alphaIdx', label: 'Chỉ số giá trị (0..6)', min: 0, max: 6 },
    ],
    validateCode: `
      const { m, alphaIdx } = params;
      if (m < 2 || m > 12) return { valid: false, reason: 'm thuộc [2; 12]' };
      if (alphaIdx < 0 || alphaIdx > 6) return { valid: false, reason: 'alphaIdx thuộc [0; 6]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, alphaIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const table = [
        { rhs: '0', num: 1, den: 2 },
        { rhs: '1', num: 1, den: 4 },
        { rhs: '-1', num: -1, den: 4 },
        { rhs: '\\sqrt{3}', num: 1, den: 6 },
        { rhs: '-\\sqrt{3}', num: -1, den: 6 },
        { rhs: '\\frac{\\sqrt{3}}{3}', num: 1, den: 3 },
        { rhs: '-\\frac{\\sqrt{3}}{3}', num: -1, den: 3 },
      ];
      const item = table[alphaIdx];
      const rCore = fmtRootExpr(item.num, item.den * m, 1, m);
      const correct = '$' + rCore + ',\\; k \\in \\mathbb{Z}$';
      const wList = [
        '$' + fmtRootExpr(item.num, item.den * m, 1, 1) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(item.num, item.den * m, 2, m) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(item.num, item.den, 1, 1) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(-item.num, item.den * m, 1, m) + ',\\; k \\in \\mathbb{Z}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(item.num, (item.den + j) * m, 1, m) + ',\\; k \\in \\mathbb{Z}$'
      );
      return {
        stem: 'Giải phương trình $\\cot ' + m + 'x = ' + item.rhs + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\cot ' + m + 'x = ' + item.rhs + ' \\Leftrightarrow \\cot ' + m + 'x = \\cot\\left(' + fmtPiFrac(item.num, item.den) + '\\right)$.',
          'Suy ra $' + m + 'x = ' + fmtPiFrac(item.num, item.den) + ' + k\\pi \\Leftrightarrow ' + rCore + ',\\; k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { m: 1, alphaIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (cot 2x = 1)', params: { m: 2, alphaIdx: 1 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Phương trình tan(ax + bπ) = c
  t11_b4_d11_tan_linear_mc: {
    id: 't11_b4_d11_tan_linear_mc',
    name: 'Giải phương trình tan(ax + φ) = b',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình tan(ax + pπ/q) = b với giá trị lượng giác đặc biệt.',
    conditionSummary: 'a ∈ [2; 6], p ∈ [-4; 4] \\ {0}, q ∈ {2, 3, 4, 5, 6}, gcd(|p|, q) = 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 6 },
      { name: 'p', label: 'Tử số pha p', min: -4, max: 4, allowZero: false },
      { name: 'q', label: 'Mẫu số pha q', min: 2, max: 6 },
      { name: 'alphaIdx', label: 'Chỉ số giá trị VP (0..6)', min: 0, max: 6 },
    ],
    validateCode: `
      const { a, p, q, alphaIdx } = params;
      if (a < 2 || a > 6 || p === 0 || q < 2 || q > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      if (alphaIdx < 0 || alphaIdx > 6) return { valid: false, reason: 'alphaIdx thuộc [0; 6]' };
      if (u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q phải tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p, q, alphaIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const table = [
        { rhs: '0', num: 0, den: 1 },
        { rhs: '1', num: 1, den: 4 },
        { rhs: '-1', num: -1, den: 4 },
        { rhs: '\\sqrt{3}', num: 1, den: 3 },
        { rhs: '-\\sqrt{3}', num: -1, den: 3 },
        { rhs: '\\frac{\\sqrt{3}}{3}', num: 1, den: 6 },
        { rhs: '-\\frac{\\sqrt{3}}{3}', num: -1, den: 6 },
      ];
      const item = table[alphaIdx];
      // ax + p/q*pi = item.num/item.den*pi + k*pi
      const diffNum = item.num * q - p * item.den;
      const diffDen = item.den * q;
      const solFrac = u.simplifyFrac(diffNum, diffDen * a);
      const rCore = fmtRootExpr(solFrac.num, solFrac.den, 1, a);
      const correct = '$' + rCore + ',\\; k \\in \\mathbb{Z}$';
      const wList = [
        '$' + fmtRootExpr(solFrac.num, solFrac.den, 2, 1) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(solFrac.num, solFrac.den, 1, 1) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(diffNum, diffDen, 1, a) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(-solFrac.num, solFrac.den, 1, a) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(solFrac.num, solFrac.den, 1, 2 * a) + ',\\; k \\in \\mathbb{Z}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(solFrac.num + j, solFrac.den * a, 1, a) + ',\\; k \\in \\mathbb{Z}$'
      );
      const argStr = fmtLinearArg(a, p, q);
      return {
        stem: 'Nghiệm của phương trình $\\tan \\left(' + argStr + '\\right) = ' + item.rhs + '$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\tan \\left(' + argStr + '\\right) = ' + item.rhs + ' \\Leftrightarrow ' + argStr + ' = ' + fmtPiFrac(item.num, item.den) + ' + k\\pi$.',
          'Chuyển vế và chia cho $' + a + '$ thu được $' + rCore + ',\\; k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { a: 2, p: 0, q: 5, alphaIdx: 0 }, expectedValid: false },
      { label: 'Biên p/q chưa tối giản', params: { a: 2, p: 2, q: 4, alphaIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (tan(2x - π/5) = 0)', params: { a: 2, p: -1, q: 5, alphaIdx: 0 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Phương trình cot(ax + bπ) = c
  t11_b4_d12_cot_linear_mc: {
    id: 't11_b4_d12_cot_linear_mc',
    name: 'Giải phương trình cot(ax + φ) = b',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình cot(ax + pπ/q) = b với giá trị lượng giác đặc biệt.',
    conditionSummary: 'a ∈ [2; 6], p ∈ [-4; 4] \\ {0}, q ∈ {1, 2, 3, 4, 6}, gcd(|p|, q) = 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 6 },
      { name: 'p', label: 'Tử số pha p', min: -4, max: 4, allowZero: false },
      { name: 'q', label: 'Mẫu số pha q', min: 1, max: 6 },
      { name: 'alphaIdx', label: 'Chỉ số giá trị VP (0..6)', min: 0, max: 6 },
    ],
    validateCode: `
      const { a, p, q, alphaIdx } = params;
      if (a < 2 || a > 6 || p === 0 || q < 1 || q > 6 || q === 5) return { valid: false, reason: 'Tham số ngoài miền' };
      if (alphaIdx < 0 || alphaIdx > 6) return { valid: false, reason: 'alphaIdx thuộc [0; 6]' };
      if (u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q phải tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p, q, alphaIdx } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const table = [
        { rhs: '0', num: 1, den: 2 },
        { rhs: '1', num: 1, den: 4 },
        { rhs: '-1', num: -1, den: 4 },
        { rhs: '\\sqrt{3}', num: 1, den: 6 },
        { rhs: '-\\sqrt{3}', num: -1, den: 6 },
        { rhs: '\\frac{\\sqrt{3}}{3}', num: 1, den: 3 },
        { rhs: '-\\frac{\\sqrt{3}}{3}', num: -1, den: 3 },
      ];
      const item = table[alphaIdx];
      const diffNum = item.num * q - p * item.den;
      const diffDen = item.den * q;
      const solFrac = u.simplifyFrac(diffNum, diffDen * a);
      const rCore = fmtRootExpr(solFrac.num, solFrac.den, 1, a);
      const correct = '$' + rCore + ',\\; k \\in \\mathbb{Z}$';
      const wList = [
        '$' + fmtRootExpr(diffNum, diffDen, 2, 1) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(solFrac.num, solFrac.den, 1, 2 * a) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(solFrac.num, solFrac.den, 1, 1) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(-solFrac.num, solFrac.den, 1, a) + ',\\; k \\in \\mathbb{Z}$',
        '$' + fmtRootExpr(solFrac.num, solFrac.den, 2, a) + ',\\; k \\in \\mathbb{Z}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(solFrac.num + j, solFrac.den * a, 1, a) + ',\\; k \\in \\mathbb{Z}$'
      );
      const argStr = fmtLinearArg(a, p, q);
      return {
        stem: 'Nghiệm của phương trình $\\cot \\left(' + argStr + '\\right) = ' + item.rhs + '$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\cot \\left(' + argStr + '\\right) = ' + item.rhs + ' \\Leftrightarrow ' + argStr + ' = ' + fmtPiFrac(item.num, item.den) + ' + k\\pi$.',
          'Suy ra $' + rCore + ',\\; k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, p: 1, q: 1, alphaIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (cot(2x + π) = 1)', params: { a: 2, p: 1, q: 1, alphaIdx: 1 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Phương trình cos(ax + φ1) = cos(cx + φ2)
  t11_b4_d13_cos_eq_cos_mc: {
    id: 't11_b4_d13_cos_eq_cos_mc',
    name: 'Giải phương trình dạng cos(ax + φ₁) = cos(cx + φ₂)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình đưa về cos u = cos v và rút gọn hai họ nghiệm.',
    conditionSummary: '1 ≤ c < a ≤ 7, q1, q2 ∈ {2, 3, 4, 6}, gcd(|p1|, q1) = gcd(|p2|, q2) = 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 7 },
      { name: 'c', label: 'Hệ số c (< a)', min: 1, max: 6 },
      { name: 'p1', label: 'Tử pha p1', min: -3, max: 3, allowZero: false },
      { name: 'q1', label: 'Mẫu pha q1', min: 2, max: 6 },
      { name: 'p2', label: 'Tử pha p2', min: -3, max: 3, allowZero: false },
      { name: 'q2', label: 'Mẫu pha q2', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, c, p1, q1, p2, q2 } = params;
      if (a < 2 || a > 7 || c < 1 || c >= a) return { valid: false, reason: 'Cần 1 <= c < a <= 7' };
      if (p1 === 0 || p2 === 0) return { valid: false, reason: 'p1, p2 khác 0' };
      if (![2, 3, 4, 6].includes(q1) || ![2, 3, 4, 6].includes(q2)) return { valid: false, reason: 'q1, q2 thuộc {2, 3, 4, 6}' };
      if (u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) return { valid: false, reason: 'Phân số pha phải tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, p1, q1, p2, q2 } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const dMinus = a - c;
      const dPlus = a + c;
      // Branch 1: (a - c)x = phi2 - phi1 + k2pi
      const b1Num = p2 * q1 - p1 * q2;
      const b1Den = q1 * q2;
      const x1 = u.simplifyFrac(b1Num, b1Den * dMinus);
      // Branch 2: (a + c)x = -phi2 - phi1 + k2pi
      const b2Num = -p2 * q1 - p1 * q2;
      const b2Den = q1 * q2;
      const x2 = u.simplifyFrac(b2Num, b2Den * dPlus);

      const r1 = fmtRootExpr(x1.num, x1.den, 2, dMinus);
      const r2 = fmtRootExpr(x2.num, x2.den, 2, dPlus);
      const correct = '$' + r1 + ',\\; ' + r2 + '\\; (k \\in \\mathbb{Z})$';

      const wList = [
        '$' + fmtRootExpr(x2.num, x2.den, 2, dMinus) + ',\\; ' + fmtRootExpr(x1.num, x1.den, 2, dPlus) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(x1.num, x1.den, 1, dPlus) + ',\\; ' + fmtRootExpr(x2.num, x2.den, 1, dMinus) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(x2.num, x2.den, 2, 1) + ',\\; ' + fmtRootExpr(x1.num, x1.den, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(-x1.num, x1.den, 2, dMinus) + ',\\; ' + fmtRootExpr(-x2.num, x2.den, 2, dPlus) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(x1.num + j, x1.den, 2, dMinus) + ',\\; ' + fmtRootExpr(x2.num, x2.den, 2, dPlus) + '\\; (k \\in \\mathbb{Z})$'
      );

      const arg1 = fmtLinearArg(a, p1, q1);
      const arg2 = fmtLinearArg(c, p2, q2);
      const negArg2 = fmtLinearArg(-c, -p2, q2);
      const rhs1 = fmtPiFrac(b1Num, b1Den);
      const rhs2 = fmtPiFrac(b2Num, b2Den);
      return {
        stem: 'Nghiệm của phương trình $\\cos\\left(' + arg1 + '\\right) = \\cos\\left(' + arg2 + '\\right)$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\cos\\left(' + arg1 + '\\right) = \\cos\\left(' + arg2 + '\\right) \\Leftrightarrow \\left[\\begin{array}{l} ' + arg1 + ' = ' + arg2 + ' + k2\\pi \\\\ ' + arg1 + ' = ' + negArg2 + ' + k2\\pi \\end{array}\\right.$',
          '$\\Leftrightarrow \\left[\\begin{array}{l} ' + (dMinus === 1 ? 'x' : dMinus + 'x') + ' = ' + rhs1 + ' + k2\\pi \\\\ ' + dPlus + 'x = ' + rhs2 + ' + k2\\pi \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} ' + r1 + ' \\\\ ' + r2 + ' \\end{array}\\right.\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = c', params: { a: 4, c: 4, p1: 1, q1: 4, p2: -3, q2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (cos(5x+π/4) = cos(2x-3π/4))', params: { a: 5, c: 2, p1: 1, q1: 4, p2: -3, q2: 4 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Phương trình cos(ax + φ1) = sin(cx + φ2)
  t11_b4_d14_cos_eq_sin_mc: {
    id: 't11_b4_d14_cos_eq_sin_mc',
    name: 'Giải phương trình dạng cos(ax + φ₁) = sin(cx + φ₂)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Sử dụng công thức góc phụ nhau sin α = cos(π/2 - α) để đưa về phương trình cos u = cos v.',
    conditionSummary: 'a ∈ [2; 7], c ∈ [-6; 6] \\ {0}, a + c ≠ 0, a - c ≠ 0, q1, q2 ∈ {2, 3, 4, 6}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 7 },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'p1', label: 'Tử pha p1', min: -3, max: 3, allowZero: false },
      { name: 'q1', label: 'Mẫu pha q1', min: 2, max: 6 },
      { name: 'p2', label: 'Tử pha p2', min: -3, max: 3, allowZero: false },
      { name: 'q2', label: 'Mẫu pha q2', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, c, p1, q1, p2, q2 } = params;
      if (a < 2 || a > 7 || c === 0 || c < -6 || c > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      if (a + c === 0 || a - c === 0) return { valid: false, reason: 'Hệ số sau rút gọn bằng 0' };
      if (p1 === 0 || p2 === 0) return { valid: false, reason: 'p1, p2 khác 0' };
      if (![2, 3, 4, 6].includes(q1) || ![2, 3, 4, 6].includes(q2)) return { valid: false, reason: 'q1, q2 thuộc {2, 3, 4, 6}' };
      if (u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) return { valid: false, reason: 'Phân số pha phải tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, p1, q1, p2, q2 } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      // sin(cx + phi2) = cos(pi/2 - cx - phi2) = cos(-cx + (1/2 - phi2))
      // Let d2 = -c, phi2' = 1/2 - p2/q2 = (q2 - 2*p2) / (2*q2)
      const cPrime = -c;
      const phi2Num = q2 - 2 * p2;
      const phi2Den = 2 * q2;
      const phi2Sim = u.simplifyFrac(phi2Num, phi2Den);

      // Branch 1: (a - cPrime)x = phi2' - phi1 + k2pi => (a + c)x = phi2' - phi1 + k2pi
      const d1 = a + c;
      const rhs1Frac = u.simplifyFrac(phi2Sim.num * q1 - p1 * phi2Sim.den, phi2Sim.den * q1);
      const x1 = u.simplifyFrac(rhs1Frac.num, rhs1Frac.den * d1);

      // Branch 2: (a + cPrime)x = -phi2' - phi1 + k2pi => (a - c)x = -phi2' - phi1 + k2pi
      const d2 = a - c;
      const rhs2Frac = u.simplifyFrac(-phi2Sim.num * q1 - p1 * phi2Sim.den, phi2Sim.den * q1);
      const x2 = u.simplifyFrac(rhs2Frac.num, rhs2Frac.den * d2);

      const p1Period = Math.abs(d1);
      const p2Period = Math.abs(d2);
      const r1 = fmtRootExpr(x1.num, x1.den, 2, p1Period);
      const r2 = fmtRootExpr(x2.num, x2.den, 2, p2Period);
      const correct = '$' + r1 + ',\\; ' + r2 + '\\; (k \\in \\mathbb{Z})$';

      const wList = [
        '$' + fmtRootExpr(x1.num, x1.den * 2, 2, 1) + ',\\; ' + fmtRootExpr(x2.num, x2.den, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(-x1.num, x1.den, 1, 1) + ',\\; ' + fmtRootExpr(-x2.num, x2.den, 1, p2Period) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(x1.num, x1.den, 1, p2Period) + ',\\; ' + fmtRootExpr(x2.num, x2.den, 1, p1Period) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(x2.num, x2.den, 2, p1Period) + ',\\; ' + fmtRootExpr(x1.num, x1.den, 2, p2Period) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(x1.num + j, x1.den, 2, p1Period) + ',\\; ' + fmtRootExpr(x2.num, x2.den, 2, p2Period) + '\\; (k \\in \\mathbb{Z})$'
      );

      const arg1 = fmtLinearArg(a, p1, q1);
      const arg2 = fmtLinearArg(c, p2, q2);
      const convertedArg = fmtLinearArg(cPrime, phi2Sim.num, phi2Sim.den);
      const negConvertedArg = fmtLinearArg(-cPrime, -phi2Sim.num, phi2Sim.den);
      return {
        stem: 'Nghiệm của phương trình $\\cos\\left(' + arg1 + '\\right) = \\sin\\left(' + arg2 + '\\right)$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đưa về cùng hàm $\\cos$: $\\sin\\left(' + arg2 + '\\right) = \\cos\\left(\\frac{\\pi}{2} - \\left(' + arg2 + '\\right)\\right) = \\cos\\left(' + convertedArg + '\\right)$.',
          'Phương trình trở thành $\\left[\\begin{array}{l} ' + arg1 + ' = ' + convertedArg + ' + k2\\pi \\\\ ' + arg1 + ' = ' + negConvertedArg + ' + k2\\pi \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} ' + r1 + ' \\\\ ' + r2 + ' \\end{array}\\right.\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a + c = 0', params: { a: 3, c: -3, p1: 1, q1: 3, p2: 3, q2: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (cos(5x+π/3) = sin(-3x+3π/2))', params: { a: 5, c: -3, p1: 1, q1: 3, p2: 3, q2: 2 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Phương trình sin(ax + φ1) = sin(cx + φ2)
  t11_b4_d15_sin_eq_sin_mc: {
    id: 't11_b4_d15_sin_eq_sin_mc',
    name: 'Giải phương trình dạng sin(ax + φ₁) = sin(cx + φ₂)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình đưa về sin u = sin v và rút gọn hai họ nghiệm.',
    conditionSummary: '1 ≤ c < a ≤ 7, q1, q2 ∈ {1, 2, 3, 4, 6}, gcd(|p1|, q1) = gcd(|p2|, q2) = 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 7 },
      { name: 'c', label: 'Hệ số c (< a)', min: 1, max: 6 },
      { name: 'p1', label: 'Tử pha p1', min: -3, max: 3, allowZero: false },
      { name: 'q1', label: 'Mẫu pha q1', min: 1, max: 6 },
      { name: 'p2', label: 'Tử pha p2', min: -3, max: 3, allowZero: false },
      { name: 'q2', label: 'Mẫu pha q2', min: 1, max: 6 },
    ],
    validateCode: `
      const { a, c, p1, q1, p2, q2 } = params;
      if (a < 2 || a > 7 || c < 1 || c >= a) return { valid: false, reason: 'Cần 1 <= c < a <= 7' };
      if (p1 === 0 || p2 === 0) return { valid: false, reason: 'p1, p2 khác 0' };
      if (![1, 2, 3, 4, 6].includes(q1) || ![1, 2, 3, 4, 6].includes(q2)) return { valid: false, reason: 'q1, q2 thuộc {1, 2, 3, 4, 6}' };
      if (u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) return { valid: false, reason: 'Phân số pha phải tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, p1, q1, p2, q2 } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const dMinus = a - c;
      const dPlus = a + c;
      // Branch 1: (a - c)x = phi2 - phi1 + k2pi
      const b1Frac = u.simplifyFrac(p2 * q1 - p1 * q2, q1 * q2);
      const x1 = u.simplifyFrac(b1Frac.num, b1Frac.den * dMinus);
      // Branch 2: (a + c)x = pi - phi2 - phi1 + k2pi
      const b2Frac = u.simplifyFrac(q1 * q2 - p2 * q1 - p1 * q2, q1 * q2);
      const x2 = u.simplifyFrac(b2Frac.num, b2Frac.den * dPlus);

      const r1 = fmtRootExpr(x1.num, x1.den, 2, dMinus);
      const r2 = fmtRootExpr(x2.num, x2.den, 2, dPlus);
      const correct = '$' + r1 + ',\\; ' + r2 + '\\; (k \\in \\mathbb{Z})$';

      const wList = [
        '$' + fmtRootExpr(x1.num, x1.den, 2, dMinus) + ',\\; ' + fmtRootExpr(x1.num, x1.den, 2, dPlus) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(x1.num, x1.den, 1, dPlus) + ',\\; ' + fmtRootExpr(x2.num, x2.den, 1, dMinus) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(x2.num, x2.den, 2, dMinus) + ',\\; ' + fmtRootExpr(x1.num, x1.den, 2, dPlus) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(x1.num, x1.den, 2, 1) + ',\\; ' + fmtRootExpr(x2.num, x2.den, 2, 1) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(x1.num + j, x1.den, 2, dMinus) + ',\\; ' + fmtRootExpr(x2.num, x2.den, 2, dPlus) + '\\; (k \\in \\mathbb{Z})$'
      );

      const arg1 = fmtLinearArg(a, p1, q1);
      const arg2 = fmtLinearArg(c, p2, q2);
      return {
        stem: 'Nghiệm của phương trình $\\sin\\left(' + arg1 + '\\right) = \\sin\\left(' + arg2 + '\\right)$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\sin\\left(' + arg1 + '\\right) = \\sin\\left(' + arg2 + '\\right) \\Leftrightarrow \\left[\\begin{array}{l} ' + arg1 + ' = ' + arg2 + ' + k2\\pi \\\\ ' + arg1 + ' = \\pi - \\left(' + arg2 + '\\right) + k2\\pi \\end{array}\\right.$',
          '$\\Leftrightarrow \\left[\\begin{array}{l} ' + (dMinus === 1 ? 'x' : dMinus + 'x') + ' = ' + fmtPiFrac(b1Frac.num, b1Frac.den) + ' + k2\\pi \\\\ ' + dPlus + 'x = ' + fmtPiFrac(b2Frac.num, b2Frac.den) + ' + k2\\pi \\end{array}\\right. \\Leftrightarrow \\left[\\begin{array}{l} ' + r1 + ' \\\\ ' + r2 + ' \\end{array}\\right.\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a <= c', params: { a: 3, c: 4, p1: 1, q1: 1, p2: 3, q2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (sin(4x+π) = sin(3x+3π/4))', params: { a: 4, c: 3, p1: 1, q1: 1, p2: 3, q2: 4 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Phương trình tan(ax + φ1) = tan(cx + φ2)
  t11_b4_d16_tan_eq_tan_mc: {
    id: 't11_b4_d16_tan_eq_tan_mc',
    name: 'Giải phương trình dạng tan(ax + φ₁) = tan(cx + φ₂)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình tan u = tan v (kiểm tra điều kiện xác định cos u ≠ 0).',
    conditionSummary: '1 ≤ c < a ≤ 8, q1, q2 ∈ {1, 2, 3, 4, 6}, nghiệm thỏa ĐKXĐ',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 8 },
      { name: 'c', label: 'Hệ số c (< a)', min: 1, max: 7 },
      { name: 'p1', label: 'Tử pha p1', min: -3, max: 3, allowZero: false },
      { name: 'q1', label: 'Mẫu pha q1', min: 1, max: 6 },
      { name: 'p2', label: 'Tử pha p2', min: -3, max: 3, allowZero: false },
      { name: 'q2', label: 'Mẫu pha q2', min: 1, max: 6 },
    ],
    validateCode: `
      const { a, c, p1, q1, p2, q2 } = params;
      if (a < 2 || a > 8 || c < 1 || c >= a) return { valid: false, reason: 'Cần 1 <= c < a <= 8' };
      if (p1 === 0 || p2 === 0) return { valid: false, reason: 'p1, p2 khác 0' };
      if (![1, 2, 3, 4, 6].includes(q1) || ![1, 2, 3, 4, 6].includes(q2)) return { valid: false, reason: 'q1, q2 thuộc {1, 2, 3, 4, 6}' };
      if (u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) return { valid: false, reason: 'Phân số pha phải tối giản' };
      // Check x0 doesn't make ax + p1/q1*pi == pi/2 mod pi
      const x0 = ((p2 / q2) - (p1 / q1)) / (a - c);
      const u0 = a * x0 + (p1 / q1);
      if (Math.abs((u0 - 0.5) - Math.round(u0 - 0.5)) < 1e-6) {
        return { valid: false, reason: 'Họ nghiệm rơi vào điểm không xác định của tan' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, p1, q1, p2, q2 } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const d = a - c;
      const diff = u.simplifyFrac(p2 * q1 - p1 * q2, q1 * q2);
      const sol = u.simplifyFrac(diff.num, diff.den * d);
      const rCore = fmtRootExpr(sol.num, sol.den, 1, d);
      const correct = '$' + rCore + '\\; (k \\in \\mathbb{Z})$';
      const wList = [
        '$' + fmtRootExpr(sol.num, sol.den, 1, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(sol.num, sol.den * 2, 1, d) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(sol.num, sol.den * 2, 1, 1) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(-sol.num, sol.den, 1, d) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(sol.num, sol.den, 2, d) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(sol.num + j, sol.den, 1, d) + '\\; (k \\in \\mathbb{Z})$'
      );
      const arg1 = fmtLinearArg(a, p1, q1);
      const arg2 = fmtLinearArg(c, p2, q2);
      return {
        stem: 'Nghiệm của phương trình $\\tan\\left(' + arg1 + '\\right) = \\tan\\left(' + arg2 + '\\right)$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $\\cos\\left(' + arg1 + '\\right) \\ne 0$ và $\\cos\\left(' + arg2 + '\\right) \\ne 0$.',
          'Phương trình $\\Leftrightarrow ' + arg1 + ' = ' + arg2 + ' + k\\pi \\Leftrightarrow ' + (d === 1 ? 'x' : d + 'x') + ' = ' + fmtPiFrac(diff.num, diff.den) + ' + k\\pi \\Leftrightarrow ' + rCore + '\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nghiệm vi phạm ĐKXĐ (cos = 0)', params: { a: 2, c: 1, p1: 1, q1: 2, p2: 1, q2: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (tan(5x+π/2) = tan(3x-π))', params: { a: 5, c: 3, p1: 1, q1: 2, p2: -1, q2: 1 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Phương trình cot(ax + φ1) = cot(cx + φ2)
  t11_b4_d17_cot_eq_cot_mc: {
    id: 't11_b4_d17_cot_eq_cot_mc',
    name: 'Giải phương trình dạng cot(ax + φ₁) = cot(cx + φ₂)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Giải phương trình cot u = cot v (kiểm tra điều kiện xác định sin u ≠ 0).',
    conditionSummary: '1 ≤ c < a ≤ 8, q1, q2 ∈ {1, 2, 3, 4, 6}, nghiệm thỏa ĐKXĐ',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 8 },
      { name: 'c', label: 'Hệ số c (< a)', min: 1, max: 7 },
      { name: 'p1', label: 'Tử pha p1', min: -3, max: 3, allowZero: false },
      { name: 'q1', label: 'Mẫu pha q1', min: 1, max: 6 },
      { name: 'p2', label: 'Tử pha p2', min: -3, max: 3, allowZero: false },
      { name: 'q2', label: 'Mẫu pha q2', min: 1, max: 6 },
    ],
    validateCode: `
      const { a, c, p1, q1, p2, q2 } = params;
      if (a < 2 || a > 8 || c < 1 || c >= a) return { valid: false, reason: 'Cần 1 <= c < a <= 8' };
      if (p1 === 0 || p2 === 0) return { valid: false, reason: 'p1, p2 khác 0' };
      if (![1, 2, 3, 4, 6].includes(q1) || ![1, 2, 3, 4, 6].includes(q2)) return { valid: false, reason: 'q1, q2 thuộc {1, 2, 3, 4, 6}' };
      if (u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) return { valid: false, reason: 'Phân số pha phải tối giản' };
      const x0 = ((p2 / q2) - (p1 / q1)) / (a - c);
      const u0 = a * x0 + (p1 / q1);
      if (Math.abs(u0 - Math.round(u0)) < 1e-6) {
        return { valid: false, reason: 'Họ nghiệm rơi vào điểm không xác định của cot' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, p1, q1, p2, q2 } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      const d = a - c;
      const diff = u.simplifyFrac(p2 * q1 - p1 * q2, q1 * q2);
      const sol = u.simplifyFrac(diff.num, diff.den * d);
      const rCore = fmtRootExpr(sol.num, sol.den, 1, d);
      const correct = '$' + rCore + '\\; (k \\in \\mathbb{Z})$';
      const wList = [
        '$' + fmtRootExpr(-sol.num, sol.den, 1, d) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(sol.num, sol.den, 2, d) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(-sol.num, sol.den, 2, d) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(sol.num, sol.den, 1, 2 * d) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(sol.num + j, sol.den, 1, d) + '\\; (k \\in \\mathbb{Z})$'
      );
      const arg1 = fmtLinearArg(a, p1, q1);
      const arg2 = fmtLinearArg(c, p2, q2);
      return {
        stem: 'Nghiệm của phương trình $\\cot\\left(' + arg1 + '\\right) = \\cot\\left(' + arg2 + '\\right)$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $\\sin\\left(' + arg1 + '\\right) \\ne 0$ và $\\sin\\left(' + arg2 + '\\right) \\ne 0$.',
          'Phương trình $\\Leftrightarrow ' + arg1 + ' = ' + arg2 + ' + k\\pi \\Leftrightarrow ' + (d === 1 ? 'x' : d + 'x') + ' = ' + fmtPiFrac(diff.num, diff.den) + ' + k\\pi \\Leftrightarrow ' + rCore + '\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nghiệm làm sin = 0', params: { a: 2, c: 1, p1: 1, q1: 1, p2: 1, q2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (cot(4x-π/2) = cot(3x+2π/3))', params: { a: 4, c: 3, p1: -1, q1: 2, p2: 2, q2: 3 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Phương trình tan(ax + φ1) = cot(cx + φ2)
  t11_b4_d18_tan_eq_cot_mc: {
    id: 't11_b4_d18_tan_eq_cot_mc',
    name: 'Giải phương trình dạng tan(ax + φ₁) = cot(cx + φ₂)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Đưa cot v = tan(π/2 - v) để giải phương trình tan(ax + φ₁) = cot(cx + φ₂).',
    conditionSummary: 'a ∈ [2; 6], c ∈ [-5; 5] \\ {0}, a + c ≥ 1, q1, q2 ∈ {2, 3, 4, 6}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 6 },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5, allowZero: false },
      { name: 'p1', label: 'Tử pha p1', min: -3, max: 5, allowZero: false },
      { name: 'q1', label: 'Mẫu pha q1', min: 2, max: 6 },
      { name: 'p2', label: 'Tử pha p2', min: -3, max: 5, allowZero: false },
      { name: 'q2', label: 'Mẫu pha q2', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, c, p1, q1, p2, q2 } = params;
      if (a < 2 || a > 6 || c === 0 || c < -5 || c > 5) return { valid: false, reason: 'Tham số ngoài miền' };
      if (a + c < 1) return { valid: false, reason: 'Cần a + c >= 1' };
      if (p1 === 0 || p2 === 0) return { valid: false, reason: 'p1, p2 khác 0' };
      if (![2, 3, 4, 6].includes(q1) || ![2, 3, 4, 6].includes(q2)) return { valid: false, reason: 'q1, q2 thuộc {2, 3, 4, 6}' };
      if (u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) return { valid: false, reason: 'Phân số pha phải tối giản' };
      const x0 = (0.5 - p2 / q2 - p1 / q1) / (a + c);
      const u0 = a * x0 + p1 / q1;
      if (Math.abs((u0 - 0.5) - Math.round(u0 - 0.5)) < 1e-6) {
        return { valid: false, reason: 'Họ nghiệm rơi vào điểm không xác định của tan' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, p1, q1, p2, q2 } = params;
      ` + TRIG11_B4_MC_HELPERS + String.raw`
      // cot(cx + phi2) = tan(pi/2 - cx - phi2)
      const d = a + c;
      const newPhi2 = u.simplifyFrac(q2 - 2 * p2, 2 * q2);
      const rhs = u.simplifyFrac(newPhi2.num * q1 - p1 * newPhi2.den, newPhi2.den * q1);
      const sol = u.simplifyFrac(rhs.num, rhs.den * d);
      const rCore = fmtRootExpr(sol.num, sol.den, 1, d);
      const correct = '$' + rCore + '\\; (k \\in \\mathbb{Z})$';
      const wList = [
        '$' + fmtRootExpr(sol.num, sol.den, 2, d) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(sol.num, sol.den * 3, 2, d) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(sol.num, sol.den * 3, 1, d) + '\\; (k \\in \\mathbb{Z})$',
        '$' + fmtRootExpr(-sol.num, sol.den, 1, d) + '\\; (k \\in \\mathbb{Z})$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + fmtRootExpr(sol.num + j, sol.den, 1, d) + '\\; (k \\in \\mathbb{Z})$'
      );
      const arg1 = fmtLinearArg(a, p1, q1);
      const arg2 = fmtLinearArg(c, p2, q2);
      const convArg2 = fmtLinearArg(-c, newPhi2.num, newPhi2.den);
      return {
        stem: 'Nghiệm của phương trình $\\tan\\left(' + arg1 + '\\right) = \\cot\\left(' + arg2 + '\\right)$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\cot\\left(' + arg2 + '\\right) = \\tan\\left(\\frac{\\pi}{2} - \\left(' + arg2 + '\\right)\\right) = \\tan\\left(' + convArg2 + '\\right)$.',
          'Phương trình $\\Leftrightarrow ' + arg1 + ' = ' + convArg2 + ' + k\\pi \\Leftrightarrow ' + (d === 1 ? 'x' : d + 'x') + ' = ' + fmtPiFrac(rhs.num, rhs.den) + ' + k\\pi \\Leftrightarrow ' + rCore + '\\; (k \\in \\mathbb{Z})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a + c = 0', params: { a: 2, c: -2, p1: -1, q1: 4, p2: 5, q2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (tan(2x-π/4) = cot(-x+5π/4))', params: { a: 2, c: -1, p1: -1, q1: 4, p2: 5, q2: 4 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Tìm điều kiện tham số m để phương trình p·cos(wx) + A·m + B = 0 (hoặc sin) có nghiệm
  t11_b4_d19_param_m_exists_root_mc: {
    id: 't11_b4_d19_param_m_exists_root_mc',
    name: 'Tìm tham số m để phương trình a·cos(wx) + b·m + c = 0 có nghiệm',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Điều kiện có nghiệm của phương trình lượng giác',
    description: 'Tìm tập giá trị của tham số m để phương trình p·cos(wx) + Am + B = 0 (hoặc sin) có nghiệm.',
    conditionSummary: 'w ∈ [2; 9], p ∈ {1, 2}, A ∈ [-6; 6] \\ {0}, B ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'w', label: 'Hệ số góc w', min: 2, max: 9 },
      { name: 'p', label: 'Hệ số p của cos/sin', min: 1, max: 2 },
      { name: 'A', label: 'Hệ số A của m', min: -6, max: 6, allowZero: false },
      { name: 'B', label: 'Hằng số B', min: -9, max: 9, allowZero: false },
      { name: 'fnIdx', label: 'Hàm (0: cos, 1: sin)', min: 0, max: 1 },
    ],
    validateCode: `
      const { w, p, A, B, fnIdx } = params;
      if (w < 2 || w > 9 || (p !== 1 && p !== 2)) return { valid: false, reason: 'w thuộc [2; 9], p thuộc {1, 2}' };
      if (A === 0 || B === 0 || A < -6 || A > 6 || B < -9 || B > 9) return { valid: false, reason: 'A, B khác 0 và trong miền' };
      if (fnIdx !== 0 && fnIdx !== 1) return { valid: false, reason: 'fnIdx không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { w, p, A, B, fnIdx } = params;
      const fnName = fnIdx === 0 ? '\\cos' : '\\sin';
      const trigTerm = (p === 1 ? '' : p) + fnName + ' ' + w + 'x';
      const mTerm = u.formatTerm(A, 'm', false);
      const cTerm = u.formatTrailingConst(B);
      const eqStr = trigTerm + mTerm + cTerm + ' = 0';

      // p * fn(wx) = -A*m - B -> fn(wx) = (-A*m - B) / p in [-1, 1]
      const end1 = u.simplifyFrac(-B - p, A);
      const end2 = u.simplifyFrac(-B + p, A);
      const low = end1.value <= end2.value ? end1 : end2;
      const high = end1.value <= end2.value ? end2 : end1;

      const correct = '$' + low.latex + ' \\le m \\le ' + high.latex + '$';
      const wList = [
        '$' + (-B - p) + ' \\le m \\le ' + (-B + p) + '$',
        '$' + low.latex + ' < m < ' + high.latex + '$',
        '$' + u.simplifyFrac(B - p, A).latex + ' \\le m \\le ' + u.simplifyFrac(B + p, A).latex + '$',
        '$' + low.latex + ' \\le m < ' + high.latex + '$',
        '$m \\le ' + low.latex + '\\text{ hoặc } m \\ge ' + high.latex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + u.simplifyFrac(low.num - j, low.den).latex + ' \\le m \\le ' + u.simplifyFrac(high.num + j, high.den).latex + '$'
      );
      const rhsNum = u.formatLinear(-A, -B, 'm');
      const rhsExpr = p === 1 ? rhsNum : '\\frac{' + rhsNum + '}{' + p + '}';
      return {
        stem: 'Tìm tất cả các giá trị của tham số $m$ để phương trình $' + eqStr + '$ có nghiệm.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + eqStr + ' \\Leftrightarrow ' + fnName + ' ' + w + 'x = ' + rhsExpr + '$.',
          'Phương trình có nghiệm khi và chỉ khi $-1 \\le ' + rhsExpr + ' \\le 1 \\Leftrightarrow ' + (-p) + ' \\le ' + rhsNum + ' \\le ' + p + '$.',
          'Giải bất phương trình kép thu được $' + low.latex + ' \\le m \\le ' + high.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 0', params: { w: 7, p: 1, A: 0, B: -3, fnIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (cos 7x - 3m - 3 = 0)', params: { w: 7, p: 1, A: -3, B: -3, fnIdx: 0 }, expectedValid: true },
    ],
  },
};
