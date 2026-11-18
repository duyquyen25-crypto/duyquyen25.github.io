import { MathTemplate } from '../types/math';

const TRIG11_C1_END_HELPERS = String.raw`
  const round1 = (val) => (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
  const fmtDec1 = (val) => {
    const r = round1(val);
    if (Object.is(r, -0) || r === 0) return '0';
    if (Number.isInteger(r)) return String(r);
    return String(r).replace('.', ',');
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
  const fmtSignedPiFrac = (num, den) => {
    const f = u.simplifyFrac(num, den);
    if (f.num === 0) return '';
    const absTex = fmtPiFrac(Math.abs(f.num), f.den);
    return f.num > 0 ? ' + ' + absTex : ' - ' + absTex;
  };
`;

export const G11_C1_END_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Bài toán thực tế vòng quay trò chơi h(t) = R sin(2π/T * t - π/2) + c (Đúng/Sai)
  t11_c1_end_d01_ferris_wheel_tf: {
    id: 't11_c1_end_d01_ferris_wheel_tf',
    name: 'Bài toán thực tế vòng quay trò chơi h(t) = R·sin(2πt/T - π/2) + c (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tiễn hàm số lượng giác',
    description: 'Cho công thức chiều cao cabin vòng quay h(t). Xét tính đúng/sai về chu kì, vị trí lúc t = 0, thời điểm cao nhất và thời điểm đạt độ cao cho trước lần đầu.',
    conditionSummary: 'R ∈ [25; 85], hMin ∈ [1; 8], T ∈ [6; 24] (T chia hết cho 6)',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (m)', min: 25, max: 85 },
      { name: 'hMin', label: 'Độ cao thấp nhất hMin (m)', min: 1, max: 8 },
      { name: 'T', label: 'Chu kì quay T (phút)', min: 6, max: 24, step: 6 },
      { name: 'targetMode', label: 'Mức chiều cao (0: sin=1/2, 1: sin=-1/2)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { R, hMin, T, targetMode, aTrue, bTrue, cTrue, dTrue } = params;
      if (R < 25 || R > 85 || hMin < 1 || hMin > 8) return { valid: false, reason: 'R hoặc hMin ngoài miền' };
      if (T < 6 || T > 24 || T % 6 !== 0) return { valid: false, reason: 'T phải là bội của 6 trong [6; 24]' };
      if (targetMode !== 0 && targetMode !== 1) return { valid: false, reason: 'targetMode không hợp lệ' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, hMin, T, targetMode, aTrue, bTrue, cTrue, dTrue } = params;
      ` + TRIG11_C1_END_HELPERS + String.raw`
      const c = R + hMin;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const shownT = aIs ? T : T + 2;
      const shownH0 = bIs ? hMin : hMin + 2;
      const tMax = T / 2;
      const shownTMax = cIs ? tMax : tMax + 1;

      // targetMode 0 -> sin = 1/2 -> h = c + R/2, first t = T/3
      // targetMode 1 -> sin = -1/2 -> h = c - R/2, first t = T/6
      const hTarget = targetMode === 0 ? c + R / 2 : c - R / 2;
      const tFirst = targetMode === 0 ? T / 3 : T / 6;
      const shownTFirst = dIs ? tFirst : tFirst + 1;
      const hTargetStr = fmtDec1(hTarget);
      const rhsFrac = targetMode === 0 ? '\\frac{1}{2}' : '-\\frac{1}{2}';
      const targetAngle = targetMode === 0 ? '\\frac{\\pi}{6}' : '-\\frac{\\pi}{6}';
      const sumAngle = targetMode === 0 ? '\\frac{2\\pi}{3}' : '\\frac{\\pi}{3}';

      const tfStatements = [
        { key: 'a', text: 'Hàm số $h(t)$ có chu kì là $' + shownT + '$ phút.', isTrue: aIs },
        { key: 'b', text: 'Khi $t = 0$, khoảng cách từ cabin đến mặt đất là $' + shownH0 + '\\,\\mathrm{m}$.', isTrue: bIs },
        { key: 'c', text: 'Trong vòng quay đầu tiên kể từ $t = 0$, cabin ở vị trí cao nhất tại thời điểm $t = ' + shownTMax + '$ phút.', isTrue: cIs },
        { key: 'd', text: 'Cabin đạt chiều cao $' + hTargetStr + '\\,\\mathrm{m}$ lần đầu tiên tại $t = ' + shownTFirst + '$ phút.', isTrue: dIs },
      ];

      return {
        stem:
          'Một vòng quay trò chơi có bán kính $' + R + '\\,\\mathrm{m}$, trục quay cách mặt đất $' + c + '\\,\\mathrm{m}$, quay đều mỗi vòng hết $' + T + '$ phút. Khi vòng quay quay đều, khoảng cách $h\\,\\mathrm{m}$ từ một cabin gắn tại điểm $A$ của vòng quay đến mặt đất được tính bởi công thức: $h(t) = ' + R + '\\sin\\left(\\frac{2\\pi}{' + T + '}t - \\frac{\\pi}{2}\\right) + ' + c + '$ với $t$ là thời gian quay tính bằng phút ($t \\ge 0$). Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Chu kì của hàm số $h(t)$ là $T = \\frac{2\\pi}{\\frac{2\\pi}{' + T + '}} = ' + T + '$ phút (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Khi $t = 0$: $h(0) = ' + R + '\\sin\\left(-\\frac{\\pi}{2}\\right) + ' + c + ' = ' + hMin + '\\,\\mathrm{m}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Cabin ở vị trí cao nhất khi $\\sin\\left(\\frac{2\\pi}{' + T + '}t - \\frac{\\pi}{2}\\right) = 1 \\Rightarrow \\frac{2\\pi}{' + T + '}t - \\frac{\\pi}{2} = \\frac{\\pi}{2} \\Rightarrow t = ' + tMax + '$ phút (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $h(t) = ' + hTargetStr + ' \\Leftrightarrow \\sin\\left(\\frac{2\\pi}{' + T + '}t - \\frac{\\pi}{2}\\right) = ' + rhsFrac + '$. Với $t \\ge 0$ thì $\\frac{2\\pi}{' + T + '}t - \\frac{\\pi}{2} \\ge -\\frac{\\pi}{2}$, thời điểm đầu tiên ứng với $\\frac{2\\pi}{' + T + '}t - \\frac{\\pi}{2} = ' + targetAngle + ' \\Leftrightarrow \\frac{2\\pi}{' + T + '}t = ' + sumAngle + ' \\Rightarrow t = ' + tFirst + '$ phút (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên T = 10 (không chia hết cho 6)', params: { R: 73, hMin: 1, T: 10, targetMode: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (R=73, c=74, T=12; Đ Đ S Đ)', params: { R: 73, hMin: 1, T: 12, targetMode: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },
};

export const G11_C1_END_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D02 (Q2): Số giờ ánh sáng mặt trời đạt lớn nhất vào ngày thứ mấy trong năm
  t11_c1_end_d02_sunlight_max_sa: {
    id: 't11_c1_end_d02_sunlight_max_sa',
    name: 'Tìm ngày đầu tiên trong năm có số giờ ánh sáng mặt trời lớn nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tiễn hàm số lượng giác',
    description: 'Tìm x ∈ [1; 365] đầu tiên để hàm y = (a/10)·sin[π(x + p)/180] + b/5 đạt giá trị lớn nhất.',
    conditionSummary: 'a ∈ [15; 55], b ∈ [55; 75], p ∈ [-240; 88] (ngày cực đại thuộc [6; 359])',
    paramSpecs: [
      { name: 'a', label: 'Tử biên độ a (a/10)', min: 15, max: 55 },
      { name: 'b', label: 'Tử trung bình b (b/5)', min: 55, max: 75 },
      { name: 'p', label: 'Độ lệch pha p', min: -240, max: 88, allowZero: false },
    ],
    validateCode: `
      const { a, b, p } = params;
      if (a < 15 || a > 55 || b < 55 || b > 75 || p === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (b / 5 - a / 10 <= 0) return { valid: false, reason: 'Số giờ sáng nhỏ nhất phải dương' };
      const xAns = 90 - p;
      if (xAns < 6 || xAns > 359) return { valid: false, reason: 'Cần ngày cực đại duy nhất trong [6; 359]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, p } = params;
      const amp = u.simplifyFrac(a, 10);
      const mid = u.simplifyFrac(b, 5);
      const shift = u.formatShift('x', p);
      const xAns = 90 - p;
      return {
        stem:
          'Số giờ có ánh sáng mặt trời tại một địa phương ở ngày thứ $x$ được cho bởi hàm số $y = ' +
          amp.latex +
          '\\sin\\left[\\frac{\\pi}{180}(' +
          shift +
          ')\\right] + ' +
          mid.latex +
          '$, với $1 \\le x \\le 365$. Hỏi ngày đầu tiên trong năm mà số giờ ánh sáng của địa phương đó đạt lớn nhất là ngày thứ bao nhiêu?',
        shortAnswer: String(xAns),
        numericValue: xAns,
        answerSummary: String(xAns),
        solutionSteps: [
          'Số giờ ánh sáng đạt lớn nhất khi $\\sin\\left[\\frac{\\pi}{180}(' + shift + ')\\right] = 1$.',
          '$\\Leftrightarrow \\frac{\\pi}{180}(' + shift + ') = \\frac{\\pi}{2} + k2\\pi \\Leftrightarrow \\frac{' + shift + '}{180} = \\frac{1}{2} + 2k \\Leftrightarrow x = ' + xAns + ' + 360k\\; (k \\in \\mathbb{Z})$.',
          'Với $1 \\le x \\le 365$, chọn $k = 0$ ta được $x = ' + xAns + '$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { a: 33, b: 61, p: 0 }, expectedValid: false },
      { label: 'Biên xAns = 2 (< 6, có thể lặp ngày 362)', params: { a: 33, b: 61, p: 88 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (p=51 -> ngày 39)', params: { a: 33, b: 61, p: 51 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Nhiệt độ trung bình hàng ngày lớn nhất vào ngày thứ mấy trong năm
  t11_c1_end_d03_temp_max_sa: {
    id: 't11_c1_end_d03_temp_max_sa',
    name: 'Tìm ngày trong năm có nhiệt độ trung bình lớn nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tiễn hàm số lượng giác',
    description: 'Tìm ngày x ∈ [1; 365] để hàm nhiệt độ y = (a/5)·cos[π(x - p)/180] + b/2 đạt giá trị lớn nhất.',
    conditionSummary: 'a ∈ [15; 55], b ∈ [35; 65], p ∈ [10; 350]',
    paramSpecs: [
      { name: 'a', label: 'Tử biên độ a (a/5)', min: 15, max: 55 },
      { name: 'b', label: 'Tử nhiệt độ TB b (b/2)', min: 35, max: 65 },
      { name: 'p', label: 'Ngày cực đại p', min: 10, max: 350 },
    ],
    validateCode: `
      const { a, b, p } = params;
      if (a < 15 || a > 55 || b < 35 || b > 65) return { valid: false, reason: 'Tham số ngoài miền' };
      if (p < 10 || p > 350) return { valid: false, reason: 'p thuộc [10; 350] để ngày cực đại duy nhất trong năm' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, p } = params;
      const amp = u.simplifyFrac(a, 5);
      const mid = u.simplifyFrac(b, 2);
      const xAns = p;
      return {
        stem:
          'Nhiệt độ trung bình hàng ngày ở một địa phương trong năm được xấp xỉ bởi hàm số $y = ' +
          amp.latex +
          '\\cos\\left[\\frac{\\pi}{180}(x - ' +
          p +
          ')\\right] + ' +
          mid.latex +
          '$, với $1 \\le x \\le 365$. Hỏi ngày nào trong năm nhiệt độ trung bình của địa phương đó là lớn nhất?',
        shortAnswer: String(xAns),
        numericValue: xAns,
        answerSummary: String(xAns),
        solutionSteps: [
          'Nhiệt độ trung bình lớn nhất khi $\\cos\\left[\\frac{\\pi}{180}(x - ' + p + ')\\right] = 1$.',
          '$\\Leftrightarrow \\frac{\\pi}{180}(x - ' + p + ') = k2\\pi \\Leftrightarrow x = ' + p + ' + 360k\\; (k \\in \\mathbb{Z})$.',
          'Với $1 \\le x \\le 365$, chọn $k = 0$ ta được $x = ' + xAns + '$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 3 (< 10)', params: { a: 44, b: 49, p: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (p=217 -> ngày 217)', params: { a: 44, b: 49, p: 217 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Độ dài ban đêm ngắn nhất vào ngày thứ mấy trong năm
  t11_c1_end_d04_night_min_sa: {
    id: 't11_c1_end_d04_night_min_sa',
    name: 'Tìm ngày trong năm có độ dài ban đêm ngắn nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tiễn hàm số lượng giác',
    description: 'Tìm ngày x ∈ [1; 365] để hàm độ dài ban đêm y = (a/5)·cos[π(x + p)/180] + b/5 đạt giá trị nhỏ nhất.',
    conditionSummary: 'a ∈ [5; 25], b ∈ [50; 75], p ∈ [-160; 170]',
    paramSpecs: [
      { name: 'a', label: 'Tử biên độ a (a/5)', min: 5, max: 25 },
      { name: 'b', label: 'Tử trung bình b (b/5)', min: 50, max: 75 },
      { name: 'p', label: 'Độ lệch pha p', min: -160, max: 170, allowZero: false },
    ],
    validateCode: `
      const { a, b, p } = params;
      if (a < 5 || a > 25 || b < 50 || b > 75 || p === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (b <= a) return { valid: false, reason: 'Độ dài ban đêm nhỏ nhất phải dương' };
      const xAns = 180 - p;
      if (xAns < 10 || xAns > 350) return { valid: false, reason: 'Ngày cực tiểu phải thuộc [10; 350]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, p } = params;
      const amp = u.simplifyFrac(a, 5);
      const mid = u.simplifyFrac(b, 5);
      const shift = u.formatShift('x', p);
      const xAns = 180 - p;
      return {
        stem:
          'Độ dài ban đêm (tính bằng giờ) tại một địa phương trong năm được xấp xỉ bởi hàm số $y = ' +
          amp.latex +
          '\\cos\\left[\\frac{\\pi}{180}(' +
          shift +
          ')\\right] + ' +
          mid.latex +
          '$, với $1 \\le x \\le 365$. Hỏi ngày nào trong năm độ dài ban đêm của địa phương đó là ngắn nhất?',
        shortAnswer: String(xAns),
        numericValue: xAns,
        answerSummary: String(xAns),
        solutionSteps: [
          'Độ dài ban đêm ngắn nhất khi $\\cos\\left[\\frac{\\pi}{180}(' + shift + ')\\right] = -1$.',
          '$\\Leftrightarrow \\frac{\\pi}{180}(' + shift + ') = \\pi + k2\\pi \\Leftrightarrow \\frac{' + shift + '}{180} = 1 + 2k \\Leftrightarrow x = ' + xAns + ' + 360k\\; (k \\in \\mathbb{Z})$.',
          'Với $1 \\le x \\le 365$, chọn $k = 0$ ta được $x = ' + xAns + '$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { a: 9, b: 58, p: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (p=64 -> ngày 116)', params: { a: 9, b: 58, p: 64 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Số lượng thỏ lớn nhất (hoặc nhỏ nhất) trong năm
  t11_c1_end_d05_rabbit_pop_max_sa: {
    id: 't11_c1_end_d05_rabbit_pop_max_sa',
    name: 'Tìm số lượng cá thể lớn nhất/nhỏ nhất theo mô hình sin chu kì năm (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng thực tiễn hàm số lượng giác',
    description: 'Cho mô hình số lượng thỏ R = C + A·sin[π(d - p)/365]. Tìm số lượng thỏ lớn nhất hoặc nhỏ nhất đạt được trong năm.',
    conditionSummary: 'C ∈ [300; 600], A ∈ [50; 220], C > A, d_opt ∈ (1; 365)',
    paramSpecs: [
      { name: 'C', label: 'Mức trung bình C', min: 300, max: 600 },
      { name: 'A', label: 'Biên độ dao động A', min: 50, max: 220 },
      { name: 'p', label: 'Độ lệch ngày p', min: 5, max: 355 },
      { name: 'targetIdx', label: 'Yêu cầu (0: lớn nhất, 1: nhỏ nhất)', min: 0, max: 1 },
    ],
    validateCode: `
      const { C, A, p, targetIdx } = params;
      if (C < 300 || C > 600 || A < 50 || A > 220 || C <= A) return { valid: false, reason: 'Cần C > A và trong miền' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'targetIdx thuộc {0, 1}' };
      if (targetIdx === 0 && (p < 5 || p > 180)) return { valid: false, reason: 'p thuộc [5; 180] để đạt cực đại trong năm' };
      if (targetIdx === 1 && (p < 185 || p > 355)) return { valid: false, reason: 'p thuộc [185; 355] để đạt cực tiểu trong năm' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { C, A, p, targetIdx } = params;
      const isMax = targetIdx === 0;
      const ans = isMax ? C + A : C - A;
      const label = isMax ? 'lớn nhất' : 'nhỏ nhất';
      const sinTarget = isMax ? '1' : '-1';
      const angleTarget = isMax ? '\\frac{\\pi}{2}' : '-\\frac{\\pi}{2}';
      const dNum = isMax ? 2 * p + 365 : 2 * p - 365;
      const dFrac = u.simplifyFrac(dNum, 2);
      return {
        stem:
          'Trong một khu vực đất rừng nhất định, số lượng thỏ $R$ tăng và giảm theo chu kỳ trong suốt cả năm. Biết số lượng thỏ có thể được mô hình hóa bởi hàm số $R = ' +
          C +
          ' + ' +
          A +
          '\\sin\\left[\\frac{\\pi}{365}(d - ' +
          p +
          ')\\right]$, trong đó $d$ là ngày thứ $d$ trong năm ($1 \\le d \\le 365$). Tìm số lượng thỏ ' +
          label +
          ' trong năm.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Số lượng thỏ ' + label + ' ứng với $\\sin\\left[\\frac{\\pi}{365}(d - ' + p + ')\\right] = ' + sinTarget + '$.',
          'Suy ra $\\frac{\\pi}{365}(d - ' + p + ') = ' + angleTarget + ' \\Rightarrow d = ' + dFrac.latex + ' \\in [1;\\, 365]$.',
          'Vậy số lượng thỏ ' + label + ' là $' + C + (isMax ? ' + ' : ' - ') + A + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p ngoài vùng đạt cực đại', params: { C: 413, A: 144, p: 250, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (413 + 144sin[π(d-19)/365], max -> 557)', params: { C: 413, A: 144, p: 19, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Biên độ dao động tổng hợp của hai dao động điều hòa dạng cos
  t11_c1_end_d06_harmonic_cos_amp_sa: {
    id: 't11_c1_end_d06_harmonic_cos_amp_sa',
    name: 'Tìm biên độ dao động điều hòa tổng hợp dạng cos (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng công thức lượng giác trong Vật lí',
    description: 'Cho hai dao động điều hòa cùng tần số dạng cos. Tính biên độ dao động tổng hợp (làm tròn đến hàng phần mười).',
    conditionSummary: 'A1, A2 ∈ [2; 12], ω ∈ [1; 6], q ∈ {6, 9, 10, 12, 15, 18}, |φ1 - φ2| ∈ (0; π), tránh ranh giới .x5',
    paramSpecs: [
      { name: 'A1', label: 'Biên độ A1 (cm)', min: 2, max: 12 },
      { name: 'A2', label: 'Biên độ A2 (cm)', min: 2, max: 12 },
      { name: 'w', label: 'Hệ số ω (ωπt)', min: 1, max: 6 },
      { name: 'p1', label: 'Tử pha φ1', min: 1, max: 6 },
      { name: 'p2', label: 'Tử pha φ2 (âm)', min: -6, max: -1 },
      { name: 'q', label: 'Mẫu pha q', min: 6, max: 18 },
    ],
    validateCode: `
      const { A1, A2, w, p1, p2, q } = params;
      if (A1 < 2 || A1 > 12 || A2 < 2 || A2 > 12 || w < 1 || w > 6) return { valid: false, reason: 'Biên độ hoặc tần số ngoài miền' };
      if (p1 < 1 || p1 > 6 || p2 > -1 || p2 < -6) return { valid: false, reason: 'p1 dương, p2 âm trong miền' };
      if (![6, 9, 10, 12, 15, 18].includes(q)) return { valid: false, reason: 'q thuộc {6, 9, 10, 12, 15, 18}' };
      const deltaPi = (p1 - p2) / q;
      if (deltaPi <= 0 || deltaPi >= 1) return { valid: false, reason: 'Độ lệch pha thuộc (0; π)' };
      const amp = Math.sqrt(A1 * A1 + A2 * A2 + 2 * A1 * A2 * Math.cos(deltaPi * Math.PI));
      if (Math.abs(((amp * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A1, A2, w, p1, p2, q } = params;
      ` + TRIG11_C1_END_HELPERS + String.raw`
      const f1 = u.simplifyFrac(p1, q);
      const f2 = u.simplifyFrac(p2, q);
      const dPhi = u.simplifyFrac(p1 - p2, q);
      const amp = Math.sqrt(A1 * A1 + A2 * A2 + 2 * A1 * A2 * Math.cos(dPhi.value * Math.PI));
      const ansR = round1(amp);
      const shortAnswer = fmtDec1(ansR);
      const wStr = w === 1 ? '\\pi t' : w + '\\pi t';
      const x1Str = A1 + '\\cos\\left(' + wStr + fmtSignedPiFrac(f1.num, f1.den) + '\\right)';
      const x2Str = A2 + '\\cos\\left(' + wStr + fmtSignedPiFrac(f2.num, f2.den) + '\\right)';
      return {
        stem:
          'Trong Vật lí, phương trình tổng quát của một vật dao động điều hoà cho bởi công thức $x(t) = A\\cos(\\omega t + \\varphi)$, trong đó $t$ là thời điểm (tính bằng giây), $x(t)$ là li độ của vật tại thời điểm $t$, $A$ là biên độ dao động ($A > 0$) và $\\varphi \\in [-\\pi;\\, \\pi]$ là pha ban đầu của dao động. Xét hai dao động điều hoà có phương trình: $x_1(t) = ' +
          x1Str +
          '\\,(\\mathrm{cm})$, $x_2(t) = ' +
          x2Str +
          '\\,(\\mathrm{cm})$. Tìm biên độ của dao động tổng hợp $x(t) = x_1(t) + x_2(t)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Hai dao động có cùng tần số góc nên biên độ dao động tổng hợp là $A\' = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos\\Delta\\varphi}$.',
          'Ta có $A_1 = ' + A1 + '$, $A_2 = ' + A2 + '$ và $\\Delta\\varphi = ' + fmtPiFrac(f1.num, f1.den) + ' - \\left(' + fmtPiFrac(f2.num, f2.den) + '\\right) = ' + fmtPiFrac(dPhi.num, dPhi.den) + '$.',
          'Suy ra $A\' = \\sqrt{' + A1 + '^2 + ' + A2 + '^2 + 2\\cdot ' + A1 + '\\cdot ' + A2 + '\\cos\\left(' + fmtPiFrac(dPhi.num, dPhi.den) + '\\right)} \\approx ' + shortAnswer + '\\,(\\mathrm{cm})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 7 (ngoài miền mẫu số chuẩn)', params: { A1: 6, A2: 6, w: 1, p1: 2, p2: -1, q: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (A1=A2=6, φ1=2π/15, φ2=-π/15 -> 11,4)', params: { A1: 6, A2: 6, w: 1, p1: 2, p2: -1, q: 15 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Biên độ dao động tổng hợp của hai dao động điều hòa dạng sin
  t11_c1_end_d07_harmonic_sin_amp_sa: {
    id: 't11_c1_end_d07_harmonic_sin_amp_sa',
    name: 'Tìm biên độ dao động điều hòa tổng hợp dạng sin (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng công thức lượng giác trong Vật lí',
    description: 'Cho hai dao động điều hòa cùng tần số dạng sin. Tính biên độ dao động tổng hợp (làm tròn đến hàng phần mười).',
    conditionSummary: 'A1, A2 ∈ [2; 12], ω ∈ [1; 6], q ∈ {6, 9, 10, 12, 15, 18}, |φ1 - φ2| ∈ (0; π), tránh ranh giới .x5',
    paramSpecs: [
      { name: 'A1', label: 'Biên độ A1 (cm)', min: 2, max: 12 },
      { name: 'A2', label: 'Biên độ A2 (cm)', min: 2, max: 12 },
      { name: 'w', label: 'Hệ số ω (ωπt)', min: 1, max: 6 },
      { name: 'p1', label: 'Tử pha φ1', min: 1, max: 6 },
      { name: 'p2', label: 'Tử pha φ2 (âm)', min: -6, max: -1 },
      { name: 'q', label: 'Mẫu pha q', min: 6, max: 18 },
    ],
    validateCode: `
      const { A1, A2, w, p1, p2, q } = params;
      if (A1 < 2 || A1 > 12 || A2 < 2 || A2 > 12 || w < 1 || w > 6) return { valid: false, reason: 'Biên độ hoặc tần số ngoài miền' };
      if (p1 < 1 || p1 > 6 || p2 > -1 || p2 < -6) return { valid: false, reason: 'p1 dương, p2 âm trong miền' };
      if (![6, 9, 10, 12, 15, 18].includes(q)) return { valid: false, reason: 'q thuộc {6, 9, 10, 12, 15, 18}' };
      const deltaPi = (p1 - p2) / q;
      if (deltaPi <= 0 || deltaPi >= 1) return { valid: false, reason: 'Độ lệch pha thuộc (0; π)' };
      const amp = Math.sqrt(A1 * A1 + A2 * A2 + 2 * A1 * A2 * Math.cos(deltaPi * Math.PI));
      if (Math.abs(((amp * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A1, A2, w, p1, p2, q } = params;
      ` + TRIG11_C1_END_HELPERS + String.raw`
      const f1 = u.simplifyFrac(p1, q);
      const f2 = u.simplifyFrac(p2, q);
      const dPhi = u.simplifyFrac(p1 - p2, q);
      const amp = Math.sqrt(A1 * A1 + A2 * A2 + 2 * A1 * A2 * Math.cos(dPhi.value * Math.PI));
      const ansR = round1(amp);
      const shortAnswer = fmtDec1(ansR);
      const wStr = w === 1 ? '\\pi t' : w + '\\pi t';
      const x1Str = A1 + '\\sin\\left(' + wStr + fmtSignedPiFrac(f1.num, f1.den) + '\\right)';
      const x2Str = A2 + '\\sin\\left(' + wStr + fmtSignedPiFrac(f2.num, f2.den) + '\\right)';
      return {
        stem:
          'Trong Vật lí, phương trình tổng quát của một vật dao động điều hoà cho bởi công thức $x(t) = A\\sin(\\omega t + \\varphi)$, trong đó $t$ là thời điểm (tính bằng giây), $x(t)$ là li độ của vật tại thời điểm $t$, $A$ là biên độ dao động ($A > 0$) và $\\varphi \\in [-\\pi;\\, \\pi]$ là pha ban đầu của dao động. Xét hai dao động điều hoà có phương trình: $x_1(t) = ' +
          x1Str +
          '\\,(\\mathrm{cm})$, $x_2(t) = ' +
          x2Str +
          '\\,(\\mathrm{cm})$. Tìm biên độ của dao động tổng hợp $x(t) = x_1(t) + x_2(t)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Hai dao động có cùng tần số góc nên biên độ dao động tổng hợp là $A\' = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos\\Delta\\varphi}$.',
          'Ta có $A_1 = ' + A1 + '$, $A_2 = ' + A2 + '$ và $\\Delta\\varphi = ' + fmtPiFrac(f1.num, f1.den) + ' - \\left(' + fmtPiFrac(f2.num, f2.den) + '\\right) = ' + fmtPiFrac(dPhi.num, dPhi.den) + '$.',
          'Do đó $A\' = \\sqrt{' + A1 + '^2 + ' + A2 + '^2 + 2\\cdot ' + A1 + '\\cdot ' + A2 + '\\cos\\left(' + fmtPiFrac(dPhi.num, dPhi.den) + '\\right)} \\approx ' + shortAnswer + '\\,(\\mathrm{cm})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A1 = 0', params: { A1: 0, A2: 2, w: 4, p1: 2, p2: -1, q: 18 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (A1=A2=2, φ1=π/9, φ2=-π/18 -> 3,9)', params: { A1: 2, A2: 2, w: 4, p1: 2, p2: -1, q: 18 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Pha ban đầu của dao động tổng hợp hai dao động cùng biên độ
  t11_c1_end_d08_harmonic_phase_sa: {
    id: 't11_c1_end_d08_harmonic_phase_sa',
    name: 'Tìm pha ban đầu của dao động tổng hợp hai dao động cùng biên độ (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng công thức lượng giác trong Vật lí',
    description: 'Dùng công thức biến đổi tổng thành tích xác định pha ban đầu của x(t) = A cos(ωt + φ₁) + A cos(ωt + φ₂).',
    conditionSummary: 'A ∈ [2; 12], ω ∈ [1; 6], q ∈ {8, 12, 16, 20, 24}, |φ1 - φ2| < π, φ1 + φ2 ≠ 0, tránh ranh giới .x5',
    paramSpecs: [
      { name: 'A', label: 'Biên độ chung A (cm)', min: 2, max: 12 },
      { name: 'w', label: 'Hệ số ω (ωπt)', min: 1, max: 6 },
      { name: 'p1', label: 'Tử pha φ1', min: -5, max: 5, allowZero: false },
      { name: 'p2', label: 'Tử pha φ2', min: -6, max: 6, allowZero: false },
      { name: 'q', label: 'Mẫu chung q', min: 8, max: 24 },
    ],
    validateCode: `
      const { A, w, p1, p2, q } = params;
      if (A < 2 || A > 12 || w < 1 || w > 6 || p1 === 0 || p2 === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (![8, 12, 16, 20, 24].includes(q)) return { valid: false, reason: 'q thuộc {8, 12, 16, 20, 24}' };
      if (p1 === p2 || p1 + p2 === 0) return { valid: false, reason: 'Cần φ1 ≠ φ2 và φ1 + φ2 ≠ 0' };
      const diffPi = Math.abs(p1 - p2) / q;
      if (diffPi >= 0.9) return { valid: false, reason: 'Cần |φ1 - φ2| < 0,9π để hệ số cos((φ1 - φ2)/2) dương' };
      const phi = ((p1 + p2) / (2 * q)) * Math.PI;
      if (Math.abs(phi) > Math.PI || Math.abs(phi) < 0.08) return { valid: false, reason: 'φ ngoài miền hợp lệ' };
      const absTen = Math.abs(phi) * 10;
      if (Math.abs((absTen % 1) - 0.5) < 0.035) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, w, p1, p2, q } = params;
      ` + TRIG11_C1_END_HELPERS + String.raw`
      const f1 = u.simplifyFrac(p1, q);
      const f2 = u.simplifyFrac(p2, q);
      const phiFrac = u.simplifyFrac(p1 + p2, 2 * q);
      const halfDiffFrac = u.simplifyFrac(p1 - p2, 2 * q);
      const phiVal = phiFrac.value * Math.PI;
      const ansR = round1(phiVal);
      const shortAnswer = fmtDec1(ansR);
      const wStr = w === 1 ? '\\pi t' : w + '\\pi t';
      const x1Str = A + '\\cos\\left(' + wStr + fmtSignedPiFrac(f1.num, f1.den) + '\\right)';
      const x2Str = A + '\\cos\\left(' + wStr + fmtSignedPiFrac(f2.num, f2.den) + '\\right)';
      return {
        stem:
          'Trong Vật lí, phương trình tổng quát của một vật dao động điều hoà cho bởi công thức $x(t) = A\\cos(\\omega t + \\varphi)$, trong đó $t$ là thời điểm (tính bằng giây), $x(t)$ là li độ của vật tại thời điểm $t$, $A$ là biên độ dao động ($A > 0$) và $\\varphi \\in [-\\pi;\\, \\pi]$ là pha ban đầu của dao động. Xét hai dao động điều hoà có phương trình: $x_1(t) = ' +
          x1Str +
          '\\,(\\mathrm{cm})$, $x_2(t) = ' +
          x2Str +
          '\\,(\\mathrm{cm})$. Tìm pha ban đầu của dao động tổng hợp $x(t) = x_1(t) + x_2(t)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Áp dụng công thức biến đổi tổng thành tích: $x(t) = ' + (2 * A) + '\\cos\\left(' + fmtPiFrac(halfDiffFrac.num, halfDiffFrac.den) + '\\right)\\cos\\left(' + wStr + fmtSignedPiFrac(phiFrac.num, phiFrac.den) + '\\right)$.',
          'Vì $\\cos\\left(' + fmtPiFrac(halfDiffFrac.num, halfDiffFrac.den) + '\\right) > 0$ và $' + fmtPiFrac(phiFrac.num, phiFrac.den) + ' \\in [-\\pi;\\, \\pi]$, pha ban đầu của dao động tổng hợp là $\\varphi = ' + fmtPiFrac(phiFrac.num, phiFrac.den) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên φ1 + φ2 = 0 (pha tổng hợp bằng 0)', params: { A: 5, w: 3, p1: 2, p2: -2, q: 24 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (A=5, ω=3, φ1=π/24, φ2=-π/6 -> -0,2)', params: { A: 5, w: 3, p1: 1, p2: -4, q: 24 }, expectedValid: true },
    ],
  },
};

export const G11_C1_END_TF_LIST: MathTemplate[] = Object.values(G11_C1_END_TF_TEMPLATES);
export const G11_C1_END_SA_LIST: MathTemplate[] = Object.values(G11_C1_END_SA_TEMPLATES);

export const G11_C1_END_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_C1_END_TF_TEMPLATES,
  ...G11_C1_END_SA_TEMPLATES,
};
