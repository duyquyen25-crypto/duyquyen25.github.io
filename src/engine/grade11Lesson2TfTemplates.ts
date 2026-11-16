import { MathTemplate } from '../types/math';

const TRIG11_B2_TF_HELPERS = String.raw`
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

export const G11_B2_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D17 (Q17): Cho tan b = t -> Xét 4 mệnh đề về cot b, cos 2b, sin 2b, tan 2b
  t11_b2_d17_tan_to_double_angle_tf: {
    id: 't11_b2_d17_tan_to_double_angle_tf',
    name: 'Tính cot b và các giá trị lượng giác góc nhân đôi khi biết tan b (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Công thức nhân đôi',
    description: 'Cho tan b = t (t nguyên khác 0 và ±1). Đánh giá tính đúng/sai của 4 giá trị cot b, cos 2b, sin 2b, tan 2b.',
    conditionSummary: 't ∈ [-9; 9] \\ {-1, 0, 1} để các mẫu số 1 - t² và 1 + t² khác 0',
    paramSpecs: [
      { name: 't', label: 'Giá trị tan b = t', min: -9, max: 9, allowZero: false },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { t } = params;
      if (t === 0 || Math.abs(t) === 1) return { valid: false, reason: 'Cần t khác 0 và ±1 để cot b và tan 2b xác định' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { t, aTrue, bTrue, cTrue, dTrue } = params;
      const den2 = 1 + t * t;
      const cotTrue = u.simplifyFrac(1, t);
      const cos2True = u.simplifyFrac(1 - t * t, den2);
      const sin2True = u.simplifyFrac(2 * t, den2);
      const tan2True = u.simplifyFrac(2 * t, 1 - t * t);

      const cotFake = u.simplifyFrac(-1, t);
      const cos2Fake = u.simplifyFrac(1 - 3 * t * t, den2);
      const sin2Fake = u.simplifyFrac(den2 - 2 * Math.abs(t), den2);
      const tan2Fake = u.simplifyFrac(den2 + 10, t * t - 1);

      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const cotShown = aIs ? cotTrue : (cotFake.latex === cotTrue.latex ? u.simplifyFrac(2, t) : cotFake);
      const cos2Shown = bIs ? cos2True : (cos2Fake.latex === cos2True.latex ? u.simplifyFrac(t * t - 1, den2) : cos2Fake);
      const sin2Shown = cIs ? sin2True : (sin2Fake.latex === sin2True.latex ? u.simplifyFrac(-2 * t, den2) : sin2Fake);
      const tan2Shown = dIs ? tan2True : (tan2Fake.latex === tan2True.latex ? u.simplifyFrac(-2 * t, 1 - t * t) : tan2Fake);

      const tfStatements = [
        { key: 'a', text: '$\\cot b = ' + cotShown.latex + '$.', isTrue: aIs },
        { key: 'b', text: '$\\cos 2b = ' + cos2Shown.latex + '$.', isTrue: bIs },
        { key: 'c', text: '$\\sin 2b = ' + sin2Shown.latex + '$.', isTrue: cIs },
        { key: 'd', text: '$\\tan 2b = ' + tan2Shown.latex + '$.', isTrue: dIs },
      ];

      return {
        stem: 'Cho $\\tan b = ' + t + '$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Ta có $\\cot b = \\dfrac{1}{\\tan b} = ' + cotTrue.latex + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Ta có $\\cos^2 b = \\dfrac{1}{1 + \\tan^2 b} = \\dfrac{1}{' + den2 + '}$, suy ra $\\cos 2b = 2\\cos^2 b - 1 = ' + cos2True.latex + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Áp dụng $\\sin 2b = \\dfrac{2\\tan b}{1 + \\tan^2 b} = ' + sin2True.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Áp dụng $\\tan 2b = \\dfrac{\\sin 2b}{\\cos 2b} = \\dfrac{2\\tan b}{1 - \\tan^2 b} = ' + tan2True.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t = 1 (tan 2b không xác định)', params: { t: 1, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (tan b = -6; Đ S S S)', params: { t: -6, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Cho sin β = √a/b với β thuộc góc phần tư I hoặc II -> Xét cos β, sin 2β, cos 2β, sin(β + π)
  t11_b2_d18_sin_beta_interval_tf: {
    id: 't11_b2_d18_sin_beta_interval_tf',
    name: 'Giá trị lượng giác góc β và 2β trên khoảng cho trước (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Công thức nhân đôi và cung liên quan',
    description: 'Cho sin β = √a/b và khoảng góc phần tư của β. Xét tính đúng/sai của cos β, sin 2β, cos 2β, sin(β + π).',
    conditionSummary: '2 ≤ a < b², a không chính phương, b² - a không chính phương, khoảng góc thuộc phần tư I hoặc II (sin β > 0)',
    paramSpecs: [
      { name: 'a', label: 'Số trong căn √a', min: 2, max: 7 },
      { name: 'b', label: 'Mẫu số b', min: 4, max: 8 },
      { name: 'mIdx', label: 'Khoảng góc (0:(-3π/2;-π), 1:(0;π/2), 2:(π/2;π), 3:(-2π;-3π/2))', min: 0, max: 3 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, mIdx } = params;
      if (a < 2 || b < 3 || a >= b * b) return { valid: false, reason: 'Cần 0 < √a/b < 1' };
      if (mIdx < 0 || mIdx > 3) return { valid: false, reason: 'Chỉ số khoảng ngoài miền' };
      const sa = Math.round(Math.sqrt(a));
      if (sa * sa === a) return { valid: false, reason: 'Chọn a không chính phương' };
      const r = b * b - a;
      const sr = Math.round(Math.sqrt(r));
      if (sr * sr === r) return { valid: false, reason: 'Chọn để b² - a không chính phương' };
      if (2 * a === b * b) return { valid: false, reason: 'Tránh cos 2β = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, mIdx, aTrue, bTrue, cTrue, dTrue } = params;
      ` + TRIG11_B2_TF_HELPERS + String.raw`
      const mList = [-3, 0, 1, -4];
      const m = mList[mIdx];
      // Q1 (m=0, -4) -> cos > 0; Q2 (m=-3, 1) -> cos < 0
      const cosSign = (m === 0 || m === -4) ? 1 : -1;
      const r = b * b - a;

      const sinLatex = fmtRadFrac(1, a, b);
      const cosTrue = fmtRadFrac(cosSign, r, b);
      const cosOpp = fmtRadFrac(-cosSign, r, b);

      const sin2True = fmtRadFrac(2 * cosSign, a * r, b * b);
      const sin2Opp = fmtRadFrac(-2 * cosSign, a * r, b * b);

      const cos2Num = b * b - 2 * a;
      const cos2True = u.simplifyFrac(cos2Num, b * b);
      const cos2Opp = u.simplifyFrac(-cos2Num, b * b);

      const sinShiftTrue = fmtRadFrac(-1, a, b);
      const sinShiftOpp = sinLatex;

      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const cosShown = aIs ? cosTrue : cosOpp;
      const sin2Shown = bIs ? sin2True : sin2Opp;
      const cos2Shown = cIs ? cos2True.latex : cos2Opp.latex;
      const sinShiftShown = dIs ? sinShiftTrue : sinShiftOpp;
      const intervalLatex = fmtIntervalHalfPi(m);

      const tfStatements = [
        { key: 'a', text: '$\\cos\\beta = ' + cosShown + '$.', isTrue: aIs },
        { key: 'b', text: '$\\sin 2\\beta = ' + sin2Shown + '$.', isTrue: bIs },
        { key: 'c', text: '$\\cos 2\\beta = ' + cos2Shown + '$.', isTrue: cIs },
        { key: 'd', text: '$\\sin(\\beta + \\pi) = ' + sinShiftShown + '$.', isTrue: dIs },
      ];

      return {
        stem: 'Cho $\\sin\\beta = ' + sinLatex + '$ với $\\beta \\in ' + intervalLatex + '$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $\\beta \\in ' + intervalLatex + '$ nên $\\cos\\beta ' + (cosSign > 0 ? '> 0' : '< 0') + '$. Do đó $\\cos\\beta = ' + cosTrue + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Ta có $\\sin 2\\beta = 2\\sin\\beta\\cos\\beta = 2\\cdot' + sinLatex + '\\cdot\\left(' + cosTrue + '\\right) = ' + sin2True + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Ta có $\\cos 2\\beta = 1 - 2\\sin^2\\beta = 1 - 2\\cdot\\frac{' + a + '}{' + (b * b) + '} = ' + cos2True.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Theo công thức hai góc hơn kém $\\pi$: $\\sin(\\beta + \\pi) = -\\sin\\beta = ' + sinShiftTrue + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 4 chính phương', params: { a: 4, b: 6, mIdx: 0, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (sin β = √3/6, (-3π/2;-π); S Đ S S)', params: { a: 3, b: 6, mIdx: 0, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
