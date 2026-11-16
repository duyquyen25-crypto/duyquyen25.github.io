import { MathTemplate } from '../types/math';

const TRIG11_B1_TF_HELPERS = String.raw`
  const gcd = (x, y) => {
    let a = Math.abs(Math.round(x));
    let b = Math.abs(Math.round(y));
    while (b !== 0) { const t = b; b = a % b; a = t; }
    return a || 1;
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
    let s = simplifyRad(rad);
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
  const fmtIntervalHalfPi = (m) => {
    const left = m === 0 ? '0' : fmtPiFrac(m, 2);
    const right = (m + 1) === 0 ? '0' : fmtPiFrac(m + 1, 2);
    return '\\left( ' + left + '; ' + right + ' \\right)';
  };
  const roman = (q) => (q === 1 ? 'I' : q === 2 ? 'II' : q === 3 ? 'III' : 'IV');
`;

export const G11_B1_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D23 (Q23): Cho góc radian pπ/q -> Đổi độ, góc cùng điểm biểu diễn, góc phần tư, số điểm biểu diễn
  t11_b1_d23_rad_angle_properties_tf: {
    id: 't11_b1_d23_rad_angle_properties_tf',
    name: 'Phân tích góc lượng giác dạng radian (đổi độ, phần tư, số điểm biểu diễn)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường tròn lượng giác & Số đo góc',
    description: 'Cho góc lượng giác pπ/q. Đánh giá 4 mệnh đề về quy đổi ra độ, góc cùng điểm biểu diễn, cung phần tư và số điểm biểu diễn của họ góc.',
    conditionSummary: 'q ∈ {4, 6}, p ∈ [3; 11], gcd(p, q) = 1, p không là bội của q',
    paramSpecs: [
      { name: 'p', label: 'Tử số p của góc pπ/q', min: 3, max: 11 },
      { name: 'qIdx', label: 'Mẫu số (0:4, 1:6)', min: 0, max: 1 },
      { name: 'mPts', label: 'Số điểm biểu diễn thực m', min: 5, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cFakeQ', label: 'Phần tư ghi ở ý (c) (1..4)', min: 1, max: 4 },
    ],
    validateCode: `
      const { p, qIdx, mPts } = params;
      const q = qIdx === 0 ? 4 : 6;
      if (mPts < 3 || p <= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, qIdx, mPts, aTrue, cFakeQ } = params;
      ` + TRIG11_B1_TF_HELPERS + String.raw`
      const q = qIdx === 0 ? 4 : 6;
      const radLatex = fmtPiFrac(p, q);
      const degTrue = (p * 180) / q;
      const degShown = aTrue === 1 ? degTrue : degTrue + 30;
      const rem2q = ((p % (2 * q)) + 2 * q) % (2 * q);
      const trueQuad = rem2q < q / 2 ? 1 : rem2q < q ? 2 : rem2q < (3 * q) / 2 ? 3 : 4;
      const baseNum = rem2q > q ? rem2q - 2 * q : rem2q;
      const oppBaseNum = -baseNum;
      const wrongSameLatex = fmtPiFrac(oppBaseNum, q);
      const baseSameLatex = fmtPiFrac(baseNum, q);
      const kTurn = Math.floor((p - baseNum) / (2 * q));
      const fakePts = mPts + 3;
      const stepPi = fmtPiFrac(2, mPts);
      const isASame = aTrue === 1;
      const isCSame = cFakeQ === trueQuad;
      const tfStatements = [
        { key: 'a', text: '$' + radLatex + ' = ' + degShown + '^\\circ$.', isTrue: isASame },
        { key: 'b', text: 'Góc lượng giác đã cho có cùng điểm biểu diễn trên đường tròn lượng giác với góc $' + wrongSameLatex + '$.', isTrue: false },
        { key: 'c', text: 'Điểm biểu diễn trên đường tròn lượng giác của góc đã cho thuộc phần tư thứ ' + roman(cFakeQ) + '.', isTrue: isCSame },
        { key: 'd', text: 'Số điểm biểu diễn trên đường tròn lượng giác của góc $' + radLatex + ' + k' + stepPi + ',\\, k \\in \\mathbb{Z}$ là $' + fakePts + '$.', isTrue: false },
      ];
      return {
        stem: 'Cho góc lượng giác $' + radLatex + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Ta có $' + radLatex + ' = \\left(\\dfrac{' + p + '\\cdot 180}{' + q + '}\\right)^\\circ = ' + degTrue + '^\\circ$ (ý a ' + (isASame ? 'đúng' : 'sai') + ').',
          'b) Ta có $' + radLatex + ' = ' + baseSameLatex + ' + ' + kTurn + '\\cdot 2\\pi$, khác điểm biểu diễn với $' + wrongSameLatex + '$ (ý b sai).',
          'c) Do $' + baseSameLatex + '$ nằm ở phần tư thứ ' + roman(trueQuad) + ' (ý c ' + (isCSame ? 'đúng' : 'sai') + ').',
          'd) $' + radLatex + ' + k' + stepPi + ' = ' + radLatex + ' + \\dfrac{k\\cdot 2\\pi}{' + mPts + '}$ có $' + mPts + '$ điểm biểu diễn trên đường tròn lượng giác (ý d sai).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p/q chưa tối giản', params: { p: 6, qIdx: 0, mPts: 7, aTrue: 1, cFakeQ: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (5π/4)', params: { p: 5, qIdx: 0, mPts: 7, aTrue: 1, cFakeQ: 1 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Cho góc độ âm -D° -> Đổi radian, góc cùng điểm biểu diễn, phần tư, số điểm biểu diễn
  t11_b1_d24_deg_angle_properties_tf: {
    id: 't11_b1_d24_deg_angle_properties_tf',
    name: 'Phân tích góc lượng giác dạng độ âm (đổi radian, phần tư, số điểm biểu diễn)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường tròn lượng giác & Số đo góc',
    description: 'Cho góc âm -D°. Đánh giá 4 mệnh đề về quy đổi radian, góc cùng điểm biểu diễn, góc phần tư và số điểm biểu diễn.',
    conditionSummary: 'D = 15k (k ∈ [17; 35], k không chia hết cho 6), bước góc là ước của 360°',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k (góc -15k°)', min: 17, max: 35 },
      { name: 'deltaIdx', label: 'Bước góc (0:30°, 1:45°, 2:60°, 3:90°)', min: 0, max: 3 },
      { name: 'bSame', label: 'Ý (b) cho góc đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { k, deltaIdx } = params;
      if (k < 13 || k % 6 === 0) return { valid: false, reason: 'Tránh góc nằm trên trục tọa độ' };
      if (deltaIdx < 0 || deltaIdx > 3) return { valid: false, reason: 'Chỉ số bước góc không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, deltaIdx, bSame } = params;
      ` + TRIG11_B1_TF_HELPERS + String.raw`
      const deg = -15 * k;
      const deltas = [30, 45, 60, 90];
      const delta = deltas[deltaIdx];
      const mPts = 360 / delta;
      const fakePts = mPts + 2;
      const radLatex = fmtPiFrac(deg, 180);
      let rem = ((deg % 360) + 360) % 360;
      const baseDeg = rem > 180 ? rem - 360 : rem;
      const trueQuad = rem < 90 ? 1 : rem < 180 ? 2 : rem < 270 ? 3 : 4;
      const shownDegB = bSame === 1 ? baseDeg : -baseDeg;
      const turnK = Math.round((deg - baseDeg) / 360);
      const tfStatements = [
        { key: 'a', text: '$' + deg + '^\\circ = ' + radLatex + '$.', isTrue: true },
        { key: 'b', text: 'Góc lượng giác đã cho có cùng điểm biểu diễn trên đường tròn lượng giác với góc $' + shownDegB + '^\\circ$.', isTrue: bSame === 1 },
        { key: 'c', text: 'Điểm biểu diễn trên đường tròn lượng giác của góc đã cho thuộc phần tư thứ ' + roman(trueQuad) + '.', isTrue: true },
        { key: 'd', text: 'Số điểm biểu diễn trên đường tròn lượng giác của góc $' + deg + '^\\circ + k' + delta + '^\\circ,\\, k \\in \\mathbb{Z}$ là $' + fakePts + '$.', isTrue: false },
      ];
      return {
        stem: 'Cho góc lượng giác $' + deg + '^\\circ$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Ta có $' + deg + '^\\circ = \\dfrac{' + deg + '\\cdot\\pi}{180} = ' + radLatex + '$ (ý a đúng).',
          'b) Vì $' + deg + '^\\circ = ' + baseDeg + '^\\circ + (' + turnK + ')\\cdot 360^\\circ$ nên có cùng điểm biểu diễn với $' + baseDeg + '^\\circ$ (ý b ' + (bSame === 1 ? 'đúng' : 'sai') + ').',
          'c) Góc $' + baseDeg + '^\\circ$ thuộc góc phần tư thứ ' + roman(trueQuad) + ' (ý c đúng).',
          'd) $' + deg + '^\\circ + k' + delta + '^\\circ = ' + deg + '^\\circ + \\dfrac{k\\cdot 360^\\circ}{' + mPts + '}$ có $' + mPts + '$ điểm biểu diễn (ý d sai).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên góc nằm trên trục tọa độ', params: { k: 24, deltaIdx: 2, bSame: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (-435°)', params: { k: 29, deltaIdx: 2, bSame: 0 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Xét dấu cả 4 giá trị lượng giác sin, cos, tan, cot khi α thuộc phần tư
  t11_b1_d25_quadrant_all_signs_tf: {
    id: 't11_b1_d25_quadrant_all_signs_tf',
    name: 'Xét tính đúng sai về dấu của bốn giá trị lượng giác theo góc phần tư',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Dấu của giá trị lượng giác',
    description: 'Cho góc lượng giác α ∈ (mπ/2; (m+1)π/2). Đánh giá tính đúng sai của 4 bất đẳng thức dấu sin α, cos α, tan α, cot α.',
    conditionSummary: 'm ∈ [-4; 4], các bất đẳng thức bao gồm cả dấu đúng và sai',
    paramSpecs: [
      { name: 'm', label: 'Chỉ số khoảng m trong (mπ/2; (m+1)π/2)', min: -4, max: 4 },
      { name: 'flipD', label: 'Đảo dấu ý d (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { m, flipD } = params;
      if (m < -6 || m > 6 || (flipD !== 0 && flipD !== 1)) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, flipD } = params;
      ` + TRIG11_B1_TF_HELPERS + String.raw`
      const q = (((m % 4) + 4) % 4) + 1;
      const trueSigns = {
        1: ['>', '>', '>', '>'],
        2: ['>', '<', '<', '<'],
        3: ['<', '<', '>', '>'],
        4: ['<', '>', '<', '<'],
      }[q];
      const shownSigns = [
        trueSigns[0],
        trueSigns[1],
        trueSigns[2],
        flipD === 0 ? (trueSigns[3] === '>' ? '<' : '>') : trueSigns[3],
      ];
      const fns = ['\\sin', '\\cos', '\\tan', '\\cot'];
      const keys = ['a', 'b', 'c', 'd'];
      const tfStatements = keys.map((key, i) => ({
        key,
        text: '$' + fns[i] + ' \\alpha ' + shownSigns[i] + ' 0$',
        isTrue: shownSigns[i] === trueSigns[i],
      }));
      const intervalStr = fmtIntervalHalfPi(m);
      return {
        stem: 'Cho góc lượng giác $\\alpha \\in ' + intervalStr + '$. Xét tính đúng-sai của các khẳng định sau.',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: keys.map((key, i) => {
          const isT = tfStatements[i].isTrue;
          return (
            key +
            ') Khẳng định đã cho là khẳng định ' +
            (isT ? 'đúng' : 'sai') +
            '. Vì $\\alpha \\in ' +
            intervalStr +
            '$ (góc phần tư thứ ' +
            roman(q) +
            ') nên $' +
            fns[i] +
            ' \\alpha ' +
            trueSigns[i] +
            ' 0$.'
          );
        }),
      };
    `,
    boundaryCases: [
      { label: 'Biên flipD không hợp lệ', params: { m: -1, flipD: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 ((-π/2; 0))', params: { m: -1, flipD: 0 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Cho tan x = t -> cot x, cos^2 x, sin^2 x và phân thức thuần nhất bậc 1
  t11_b1_d26_given_tan_compute_expr_tf: {
    id: 't11_b1_d26_given_tan_compute_expr_tf',
    name: 'Tính cot x, cos²x, sin²x và biểu thức bậc nhất khi biết tan x',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hệ thức lượng giác cơ bản',
    description: 'Cho góc lượng giác x thỏa mãn tan x = t. Đánh giá 4 mệnh đề về cot x, cos²x, sin²x và giá trị phân thức bậc nhất theo sin x, cos x.',
    conditionSummary: 't ∈ [-8; 8] \\ {-1, 0, 1}, mẫu c + d·t ≠ 0',
    paramSpecs: [
      { name: 't', label: 'Giá trị tan x', min: -8, max: 8 },
      { name: 'a', label: 'Hệ số a của cos x ở tử', min: -5, max: 5 },
      { name: 'b', label: 'Hệ số b của sin x ở tử', min: 1, max: 5 },
      { name: 'c', label: 'Hệ số c của cos x ở mẫu', min: 1, max: 6 },
      { name: 'd', label: 'Hệ số d của sin x ở mẫu', min: 1, max: 4 },
      { name: 'dTrue', label: 'Ý d đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { t, a, b, c, d } = params;
      if (t === 0 || Math.abs(t) === 1 || a === 0) return { valid: false, reason: 't phải khác 0, ±1 và a ≠ 0' };
      const den = c + d * t;
      if (den === 0) return { valid: false, reason: 'Mẫu số biểu thức P bằng 0' };
      const num = a + b * t;
      if (num === 0) return { valid: false, reason: 'Tử số biểu thức P bằng 0 quá tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { t, a, b, c, d, dTrue } = params;
      const cotF = u.simplifyFrac(1, t);
      const den2 = 1 + t * t;
      const cos2F = u.simplifyFrac(1, den2);
      const sin2F = u.simplifyFrac(t * t, den2);
      const numP = a + b * t;
      const denP = c + d * t;
      const pTrueF = u.simplifyFrac(numP, denP);
      const pShownF = dTrue === 1 ? pTrueF : u.simplifyFrac(numP + (denP < 0 ? -7 : 7), denP);
      const fmtLinTrig = (c1, c2) => {
        const s1 = c1 === 1 ? '\\cos x' : c1 === -1 ? '-\\cos x' : c1 + '\\cos x';
        const s2 = c2 > 0
          ? (c2 === 1 ? ' + \\sin x' : ' + ' + c2 + '\\sin x')
          : (c2 === -1 ? ' - \\sin x' : ' - ' + Math.abs(c2) + '\\sin x');
        return s1 + s2;
      };
      const exprTex = '\\frac{' + fmtLinTrig(a, b) + '}{' + fmtLinTrig(c, d) + '}';
      const isDSame = pShownF.latex === pTrueF.latex;
      const tfStatements = [
        { key: 'a', text: '$\\cot x = ' + cotF.latex + '$', isTrue: true },
        { key: 'b', text: '$\\cos^2 x = ' + cos2F.latex + '$', isTrue: true },
        { key: 'c', text: '$\\sin^2 x = ' + sin2F.latex + '$', isTrue: true },
        { key: 'd', text: '$P = ' + exprTex + ' = ' + pShownF.latex + '$', isTrue: isDSame },
      ];
      return {
        stem: 'Cho góc lượng giác $x$ thỏa mãn $\\tan x = ' + t + '$. Xét tính đúng-sai của các khẳng định sau.',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là đúng vì $\\cot x = \\dfrac{1}{\\tan x} = ' + cotF.latex + '$.',
          'b) Khẳng định đã cho là đúng vì $\\cos^2 x = \\dfrac{1}{1 + \\tan^2 x} = ' + cos2F.latex + '$.',
          'c) Khẳng định đã cho là đúng vì $\\sin^2 x = 1 - \\cos^2 x = ' + sin2F.latex + '$.',
          'd) Chia cả tử và mẫu cho $\\cos x \\neq 0$, ta có $P = ' + exprTex + ' = \\dfrac{' + b + '\\tan x ' + (a >= 0 ? '+ ' + a : '- ' + Math.abs(a)) + '}{' + d + '\\tan x + ' + c + '} = ' + pTrueF.latex + '$ (ý d ' + (isDSame ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu c + d*t = 0', params: { t: -2, a: -4, b: 3, c: 4, d: 2, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (tan x = -6)', params: { t: -6, a: -4, b: 3, c: 5, d: 2, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Cho sin x = sqrt(a)/b ở góc phần tư II -> dấu cos x, giá trị cos x, cos(x + (4k+1)π/2), biểu thức P
  t11_b1_d27_given_sin_rad_q2_tf: {
    id: 't11_b1_d27_given_sin_rad_q2_tf',
    name: 'Tính giá trị lượng giác và biểu thức chứa tan x khi biết sin x = √a/b (góc phần tư II)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hệ thức lượng giác và cung liên kết',
    description: 'Cho sin x = √a/b với x thuộc góc phần tư thứ II. Đánh giá 4 mệnh đề về dấu và giá trị cos x, công thức cung hơn kém π/2 và biểu thức P.',
    conditionSummary: 'a không chính phương, 3 <= a < b² - 4, b ∈ [6; 14], m ≡ 1 (mod 4), q·tan²x - r ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Số dưới căn a của sin x = √a/b', min: 3, max: 13 },
      { name: 'b', label: 'Mẫu số b', min: 6, max: 13 },
      { name: 'kTurn', label: 'Số vòng quay nguyên k', min: 0, max: 2 },
      { name: 'pNum', label: 'Số dưới căn ở tử P (√p)', min: 2, max: 11 },
      { name: 'qCoeff', label: 'Hệ số q của tan²x ở mẫu P', min: 2, max: 5 },
      { name: 'rConst', label: 'Hằng số r trừ đi ở mẫu P', min: 2, max: 6 },
      { name: 'dTrue', label: 'Ý d đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, pNum, qCoeff, rConst } = params;
      if (a <= 1 || a >= b * b - 3) return { valid: false, reason: 'Cần 1 < a < b² - 3' };
      const ra = Math.round(Math.sqrt(a));
      if (ra * ra === a) return { valid: false, reason: 'a không chính phương để giữ dạng √a/b' };
      const diff = b * b - a;
      const rd = Math.round(Math.sqrt(diff));
      if (rd * rd === diff) return { valid: false, reason: 'b² - a không chính phương' };
      const denP = qCoeff * a - rConst * diff;
      if (denP === 0) return { valid: false, reason: 'Mẫu biểu thức P bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, kTurn, pNum, qCoeff, rConst, dTrue } = params;
      ` + TRIG11_B1_TF_HELPERS + String.raw`
      const m = 4 * kTurn + 1;
      const diff = b * b - a;
      const sinLatex = fmtRadFrac(1, a, b);
      const cosLatex = fmtRadFrac(-1, diff, b);
      const tanLatex = fmtRadFrac(-1, a * diff, diff);
      // P = sqrt(pNum) * (-sqrt(a)/sqrt(diff)) / (qCoeff * (a/diff) - rConst) = -sqrt(pNum * a * diff) / (qCoeff*a - rConst*diff)
      const pTrueLatex = fmtRadFrac(-1, pNum * a * diff, qCoeff * a - rConst * diff);
      const pOppLatex = fmtRadFrac(1, pNum * a * diff, qCoeff * a - rConst * diff);
      const pShownLatex = dTrue === 1 ? pTrueLatex : pOppLatex;
      const shiftNum = 4 * kTurn + 1;
      const shiftLatex = fmtPiFrac(shiftNum, 2);
      const intervalStr = fmtIntervalHalfPi(m);
      const exprTex = '\\frac{\\sqrt{' + pNum + '} \\tan x}{' + qCoeff + ' \\tan^2 x - ' + rConst + '}';
      const tfStatements = [
        { key: 'a', text: '$\\cos x > 0$', isTrue: false },
        { key: 'b', text: '$\\cos x = ' + cosLatex + '$', isTrue: true },
        { key: 'c', text: '$\\cos\\left(x + ' + shiftLatex + '\\right) = -' + sinLatex + '$', isTrue: true },
        { key: 'd', text: '$P = ' + exprTex + ' = ' + pShownLatex + '$', isTrue: pShownLatex === pTrueLatex },
      ];
      return {
        stem: 'Cho $\\sin x = ' + sinLatex + ',\\, x \\in ' + intervalStr + '$. Xét tính đúng-sai của các khẳng định sau.',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $x \\in ' + intervalStr + '$ (góc phần tư thứ II) nên $\\cos x < 0$ (ý a sai).',
          'b) $\\cos x = -\\sqrt{1 - \\dfrac{' + a + '}{' + (b * b) + '}} = ' + cosLatex + '$ (ý b đúng).',
          'c) $\\cos\\left(x + ' + shiftLatex + '\\right) = \\cos\\left(x + \\frac{\\pi}{2}\\right) = -\\sin x = -' + sinLatex + '$ (ý c đúng).',
          'd) Ta có $\\tan x = \\dfrac{\\sin x}{\\cos x} = ' + tanLatex + '$, suy ra $P = ' + exprTex + ' = ' + pTrueLatex + '$ (ý d ' + (pShownLatex === pTrueLatex ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a chính phương', params: { a: 4, b: 11, kTurn: 1, pNum: 5, qCoeff: 3, rConst: 4, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (sin x = √7/11)', params: { a: 7, b: 11, kTurn: 1, pNum: 5, qCoeff: 3, rConst: 4, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Cho cos x âm ở góc phần tư III -> dấu sin x, giá trị sin x, sin(x + (4k+1)π/2), biểu thức P
  t11_b1_d28_given_cos_rad_q3_tf: {
    id: 't11_b1_d28_given_cos_rad_q3_tf',
    name: 'Tính giá trị lượng giác và biểu thức chứa tan x khi biết cos x (góc phần tư III)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hệ thức lượng giác và cung liên kết',
    description: 'Cho cos x = -c√u/v với x thuộc góc phần tư thứ III. Đánh giá 4 mệnh đề về sin x, công thức sin(x + π/2 + k2π) và giá trị biểu thức P.',
    conditionSummary: 'u không chính phương, 1 <= c²u < v², q·tan²x - r ≠ 0',
    paramSpecs: [
      { name: 'c', label: 'Hệ số c của cos x = -c√u/v', min: 1, max: 2 },
      { name: 'uRad', label: 'Số dưới căn u (2, 3, 5, 6)', min: 2, max: 6 },
      { name: 'v', label: 'Mẫu số v', min: 3, max: 9 },
      { name: 'kTurn', label: 'Số vòng k nguyên', min: 1, max: 4 },
      { name: 'pNum', label: 'Số dưới căn p ở tử P', min: 3, max: 17 },
      { name: 'qCoeff', label: 'Hệ số q của tan²x ở mẫu P', min: 2, max: 6 },
      { name: 'rConst', label: 'Hằng số r trừ đi ở mẫu P', min: 2, max: 5 },
      { name: 'dTrue', label: 'Ý d đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { c, uRad, v, qCoeff, rConst } = params;
      const ru = Math.round(Math.sqrt(uRad));
      if (ru * ru === uRad) return { valid: false, reason: 'uRad phải không chính phương' };
      const c2u = c * c * uRad;
      if (c2u >= v * v) return { valid: false, reason: 'Cần |cos x| < 1' };
      const diff = v * v - c2u;
      const denP = qCoeff * diff - rConst * c2u;
      if (denP === 0) return { valid: false, reason: 'Mẫu biểu thức P bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, uRad, v, kTurn, pNum, qCoeff, rConst, dTrue } = params;
      ` + TRIG11_B1_TF_HELPERS + String.raw`
      const m = 6; // (3π; 7π/2) -> Q3
      const c2u = c * c * uRad;
      const diff = v * v - c2u;
      const cosLatex = fmtRadFrac(-c, uRad, v);
      const sinLatex = fmtRadFrac(-1, diff, v);
      // tan x = (-sqrt(diff)/v) / (-c*sqrt(uRad)/v) = + sqrt(diff * uRad) / (c * uRad)
      const tanLatex = fmtRadFrac(1, diff * uRad, c * uRad);
      // P = sqrt(pNum) * (sqrt(diff) / (c*sqrt(uRad))) / (qCoeff*(diff/c2u) - rConst)
      //   = c * sqrt(pNum * diff * uRad) / (qCoeff*diff - rConst*c2u)
      const pTrueLatex = fmtRadFrac(c, pNum * diff * uRad, qCoeff * diff - rConst * c2u);
      const pOppLatex = fmtRadFrac(-c, pNum * diff * uRad, qCoeff * diff - rConst * c2u);
      const pShownLatex = dTrue === 1 ? pTrueLatex : pOppLatex;
      const shiftNum = 4 * kTurn + 1;
      const shiftLatex = fmtPiFrac(shiftNum, 2);
      const intervalStr = fmtIntervalHalfPi(m);
      const exprTex = '\\frac{\\sqrt{' + pNum + '} \\tan x}{' + qCoeff + ' \\tan^2 x - ' + rConst + '}';
      const tfStatements = [
        { key: 'a', text: '$\\sin x < 0$', isTrue: true },
        { key: 'b', text: '$\\sin x = ' + sinLatex + '$', isTrue: true },
        { key: 'c', text: '$\\sin\\left(x + ' + shiftLatex + '\\right) = ' + cosLatex + '$', isTrue: true },
        { key: 'd', text: '$P = ' + exprTex + ' = ' + pShownLatex + '$', isTrue: pShownLatex === pTrueLatex },
      ];
      return {
        stem: 'Cho $\\cos x = ' + cosLatex + ',\\, x \\in ' + intervalStr + '$. Xét tính đúng-sai của các khẳng định sau.',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $x \\in ' + intervalStr + '$ (góc phần tư thứ III) nên $\\sin x < 0$ (ý a đúng).',
          'b) $\\sin x = -\\sqrt{1 - \\dfrac{' + c2u + '}{' + (v * v) + '}} = ' + sinLatex + '$ (ý b đúng).',
          'c) $\\sin\\left(x + ' + shiftLatex + '\\right) = \\sin\\left(x + \\frac{\\pi}{2}\\right) = \\cos x = ' + cosLatex + '$ (ý c đúng).',
          'd) Ta có $\\tan x = \\dfrac{\\sin x}{\\cos x} = ' + tanLatex + '$, suy ra $P = ' + exprTex + ' = ' + pTrueLatex + '$ (ý d ' + (pShownLatex === pTrueLatex ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên uRad chính phương', params: { c: 1, uRad: 4, v: 3, kTurn: 4, pNum: 15, qCoeff: 5, rConst: 3, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (cos x = -2√2/3)', params: { c: 2, uRad: 2, v: 3, kTurn: 4, pNum: 15, qCoeff: 5, rConst: 3, dTrue: 1 }, expectedValid: true },
    ],
  },
};
