import { MathTemplate } from '../types/math';

const TRIG11_B4_TF_HELPERS = String.raw`
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
`;

export const G11_B4_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D20 (Q20): Xét đúng/sai các mệnh đề về phương trình sin(mx) = ±1
  t11_b4_d20_sin_mx_eq_1_tf: {
    id: 't11_b4_d20_sin_mx_eq_1_tf',
    name: 'Phân tích nghiệm phương trình sin(mx) = ±1 trên khoảng (0; π) (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Cho sin(mx) = 1 hoặc -1. Xét tính đúng/sai về dạng tương đương, họ nghiệm, số nghiệm trên (0; π) và nghiệm âm lớn nhất.',
    conditionSummary: 'm ∈ [2; 6], rhsSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 6 },
      { name: 'rhsSign', label: 'Vế phải (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { m, rhsSign, aTrue, bTrue, cTrue, dTrue } = params;
      if (m < 2 || m > 6) return { valid: false, reason: 'm thuộc [2; 6]' };
      if (rhsSign !== 1 && rhsSign !== -1) return { valid: false, reason: 'rhsSign chỉ nhận -1 hoặc 1' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, rhsSign, aTrue, bTrue, cTrue, dTrue } = params;
      ` + TRIG11_B4_TF_HELPERS + String.raw`
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const rhsStr = rhsSign === 1 ? '1' : '-1';
      const rightAlpha = rhsSign === 1 ? '\\frac{\\pi}{2}' : '-\\frac{\\pi}{2}';
      const wrongAlpha = rhsSign === 1 ? '\\frac{3\\pi}{2}' : '\\frac{\\pi}{2}';
      const shownAlpha = aIs ? rightAlpha : wrongAlpha;

      const rightRoot = fmtRootExpr(rhsSign, 2 * m, 2, m);
      const wrongRoot = fmtRootExpr(rhsSign, 4 * m, 2, m);
      const shownRoot = bIs ? rightRoot : wrongRoot;

      // Roots in (0; pi): 0 < (rhsSign + 4k)/(2m) < 1  => -rhsSign/4 < k < m/2 - rhsSign/4
      const lowBound = -rhsSign / 4;
      const highBound = m / 2 - rhsSign / 4;
      const kMin = Math.floor(lowBound) + 1;
      const kMax = Math.ceil(highBound) - 1;
      const rootCount = Math.max(0, kMax - kMin + 1);
      const shownCount = cIs ? rootCount : rootCount + 2;

      // Largest negative root: rhsSign + 4k < 0 => k < -rhsSign/4
      const kNeg = rhsSign === 1 ? -1 : 0;
      const negNum = rhsSign + 4 * kNeg;
      const negDen = 2 * m;
      const rightNeg = fmtPiFrac(negNum, negDen);
      const wrongNeg = fmtPiFrac(negNum - 4, negDen);
      const shownNeg = dIs ? rightNeg : wrongNeg;

      const tfStatements = [
        { key: 'a', text: 'Phương trình (1) $\\Leftrightarrow \\sin ' + m + 'x = \\sin ' + shownAlpha + '$.', isTrue: aIs },
        { key: 'b', text: 'Phương trình (1) có nghiệm là $' + shownRoot + ',\\; k \\in \\mathbb{Z}$.', isTrue: bIs },
        { key: 'c', text: 'Số nghiệm thuộc khoảng $(0;\\, \\pi)$ là $' + shownCount + '$.', isTrue: cIs },
        { key: 'd', text: 'Nghiệm âm lớn nhất của phương trình là $x = ' + shownNeg + '$.', isTrue: dIs },
      ];

      return {
        stem: 'Cho phương trình $\\sin ' + m + 'x = ' + rhsStr + '\\; (1)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Phương trình $(1) \\Leftrightarrow \\sin ' + m + 'x = \\sin\\left(' + rightAlpha + '\\right)$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $(1) \\Leftrightarrow ' + m + 'x = ' + rightAlpha + ' + k2\\pi \\Leftrightarrow ' + rightRoot + ',\\; k \\in \\mathbb{Z}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Giải $0 < ' + fmtPiFrac(rhsSign, 2 * m) + ' + ' + fmtKPiTerm(2, m) + ' < \\pi \\Rightarrow k \\in \\{' + (kMin <= kMax ? kMin + ';\\ldots;' + kMax : '\\emptyset') + '\\}$ có $' + rootCount + '$ nghiệm (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Nghiệm âm lớn nhất ứng với $k = ' + kNeg + '$, suy ra $x = ' + rightNeg + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rhsSign = 0', params: { m: 3, rhsSign: 0, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (sin 3x = 1; S S Đ Đ)', params: { m: 3, rhsSign: 1, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Xét đúng/sai các mệnh đề về phương trình cos(mx) = 0
  t11_b4_d21_cos_mx_eq_0_tf: {
    id: 't11_b4_d21_cos_mx_eq_0_tf',
    name: 'Phân tích nghiệm phương trình cos(mx) = 0 trên khoảng (0; uπ) (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Cho cos(mx) = 0. Xét tính đúng/sai về dạng tương đương, họ nghiệm, số nghiệm trên (0; uπ) và nghiệm dương nhỏ nhất.',
    conditionSummary: 'm ∈ [2; 8], u ∈ {1, 2}',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 8 },
      { name: 'uLim', label: 'Giới hạn khoảng (0; uπ)', min: 1, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { m, uLim, aTrue, bTrue, cTrue, dTrue } = params;
      if (m < 2 || m > 8) return { valid: false, reason: 'm thuộc [2; 8]' };
      if (uLim !== 1 && uLim !== 2) return { valid: false, reason: 'uLim thuộc {1, 2}' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, uLim, aTrue, bTrue, cTrue, dTrue } = params;
      ` + TRIG11_B4_TF_HELPERS + String.raw`
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const shownAlpha = aIs ? '\\frac{\\pi}{2}' : '\\pi';
      const rightRoot = fmtRootExpr(1, 2 * m, 1, m);
      const wrongRoot = fmtRootExpr(1, 2 * m, 2, m);
      const shownRoot = bIs ? rightRoot : wrongRoot;

      const rootCount = m * uLim;
      const shownCount = cIs ? rootCount : rootCount + 2;
      const upperStr = uLim === 1 ? '\\pi' : uLim + '\\pi';

      const rightPos = fmtPiFrac(1, 2 * m);
      const wrongPos = fmtPiFrac(3, 2 * m);
      const shownPos = dIs ? rightPos : wrongPos;

      const tfStatements = [
        { key: 'a', text: 'Phương trình (1) $\\Leftrightarrow \\cos ' + m + 'x = \\cos ' + shownAlpha + '$.', isTrue: aIs },
        { key: 'b', text: 'Phương trình (1) có nghiệm là $' + shownRoot + ',\\; k \\in \\mathbb{Z}$.', isTrue: bIs },
        { key: 'c', text: 'Số nghiệm thuộc khoảng $(0;\\, ' + upperStr + ')$ là $' + shownCount + '$.', isTrue: cIs },
        { key: 'd', text: 'Nghiệm dương nhỏ nhất của phương trình là $x = ' + shownPos + '$.', isTrue: dIs },
      ];

      return {
        stem: 'Cho phương trình $\\cos ' + m + 'x = 0\\; (1)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Phương trình $(1) \\Leftrightarrow \\cos ' + m + 'x = \\cos \\frac{\\pi}{2}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $(1) \\Leftrightarrow ' + m + 'x = \\frac{\\pi}{2} + k\\pi \\Leftrightarrow ' + rightRoot + ',\\; k \\in \\mathbb{Z}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Giải $0 < ' + rightPos + ' + ' + fmtKPiTerm(1, m) + ' < ' + upperStr + ' \\Rightarrow -\\frac{1}{2} < k < ' + (m * uLim) + ' - \\frac{1}{2}$ có $' + rootCount + '$ số nguyên $k$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Nghiệm dương nhỏ nhất ứng với $k = 0$, khi đó $x = ' + rightPos + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { m: 1, uLim: 1, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (cos 4x = 0; Đ S S Đ)', params: { m: 4, uLim: 1, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Xét đúng/sai các mệnh đề về phương trình tan(mx) = b
  t11_b4_d22_tan_mx_alpha_tf: {
    id: 't11_b4_d22_tan_mx_alpha_tf',
    name: 'Phân tích nghiệm phương trình tan(mx) = b trên khoảng (0; π) (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Cho tan(mx) = b. Xét tính đúng/sai về dạng tương đương, họ nghiệm, số nghiệm trên (0; π) và nghiệm dương nhỏ nhất.',
    conditionSummary: 'm ∈ [2; 8], valIdx ∈ [0; 5]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 8 },
      { name: 'valIdx', label: 'Giá trị VP (0..5)', min: 0, max: 5 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { m, valIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (m < 2 || m > 8) return { valid: false, reason: 'm thuộc [2; 8]' };
      if (valIdx < 0 || valIdx > 5) return { valid: false, reason: 'valIdx thuộc [0; 5]' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, valIdx, aTrue, bTrue, cTrue, dTrue } = params;
      ` + TRIG11_B4_TF_HELPERS + String.raw`
      const table = [
        { rhs: '1', num: 1, den: 4, wNum: -1, wDen: 4 },
        { rhs: '-1', num: -1, den: 4, wNum: 1, wDen: 4 },
        { rhs: '\\sqrt{3}', num: 1, den: 3, wNum: 1, wDen: 6 },
        { rhs: '-\\sqrt{3}', num: -1, den: 3, wNum: 1, wDen: 6 },
        { rhs: '\\frac{\\sqrt{3}}{3}', num: 1, den: 6, wNum: 1, wDen: 3 },
        { rhs: '-\\frac{\\sqrt{3}}{3}', num: -1, den: 6, wNum: -1, wDen: 3 },
      ];
      const item = table[valIdx];
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const rightAlpha = fmtPiFrac(item.num, item.den);
      const wrongAlpha = fmtPiFrac(item.wNum, item.wDen);
      const shownAlpha = aIs ? rightAlpha : wrongAlpha;

      const rightRoot = fmtRootExpr(item.num, item.den * m, 1, m);
      const wrongRoot = fmtRootExpr(item.num, item.den * m, 2, m);
      const shownRoot = bIs ? rightRoot : wrongRoot;

      const rootCount = m;
      const shownCount = cIs ? rootCount : rootCount + 2;

      // Smallest positive root: if item.num > 0 -> k = 0; if item.num < 0 -> k = 1
      const kPos = item.num > 0 ? 0 : 1;
      const posNum = item.num + kPos * item.den;
      const posDen = item.den * m;
      const rightPos = fmtPiFrac(posNum, posDen);
      const wrongPos = fmtPiFrac(posNum + item.den, posDen);
      const shownPos = dIs ? rightPos : wrongPos;

      const tfStatements = [
        { key: 'a', text: 'Phương trình (1) $\\Leftrightarrow \\tan ' + m + 'x = \\tan\\left(' + shownAlpha + '\\right)$.', isTrue: aIs },
        { key: 'b', text: 'Phương trình (1) có nghiệm là $' + shownRoot + ',\\; k \\in \\mathbb{Z}$.', isTrue: bIs },
        { key: 'c', text: 'Số nghiệm thuộc khoảng $(0;\\, \\pi)$ là $' + shownCount + '$.', isTrue: cIs },
        { key: 'd', text: 'Nghiệm dương nhỏ nhất của phương trình là $x = ' + shownPos + '$.', isTrue: dIs },
      ];

      return {
        stem: 'Cho phương trình $\\tan ' + m + 'x = ' + item.rhs + '\\; (1)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Phương trình $(1) \\Leftrightarrow \\tan ' + m + 'x = \\tan\\left(' + rightAlpha + '\\right)$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $(1) \\Leftrightarrow ' + m + 'x = ' + rightAlpha + ' + k\\pi \\Leftrightarrow ' + rightRoot + ',\\; k \\in \\mathbb{Z}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Giải $0 < ' + fmtPiFrac(item.num, item.den * m) + ' + ' + fmtKPiTerm(1, m) + ' < \\pi$, có đúng $' + rootCount + '$ số nguyên $k$ thỏa mãn (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Nghiệm dương nhỏ nhất ứng với $k = ' + kPos + '$, khi đó $x = ' + rightPos + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 9 (ngoài miền)', params: { m: 9, valIdx: 3, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (tan 6x = -√3; S S Đ S)', params: { m: 6, valIdx: 3, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },
};
