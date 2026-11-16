import { MathTemplate } from '../types/math';

const TRIG11_B2_MC_HELPERS = String.raw`
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
  const fmtMulVar = (k, v) => (k === 1 ? v : String(k) + v);
`;

export const G11_B2_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Cung đối (-k*alpha)
  t11_b2_d01_opposite_angles_mc: {
    id: 't11_b2_d01_opposite_angles_mc',
    name: 'Công thức giá trị lượng giác của hai góc đối nhau',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức lượng giác cơ bản',
    description: 'Nhận diện đẳng thức đúng về giá trị lượng giác của hai góc đối nhau (kα và -kα).',
    conditionSummary: 'm ∈ {1, 2, 3, 4}, nhận diện công thức cos(-u) = cos u, sin(-u) = -sin u, tan(-u) = -tan u, cot(-u) = -cot u',
    paramSpecs: [
      { name: 'm', label: 'Hệ số m của góc mα', min: 1, max: 4 },
      { name: 'varIdx', label: 'Tên biến góc (0:α, 1:β, 2:a, 3:x)', min: 0, max: 3 },
      { name: 'fnIdx', label: 'Khẳng định đúng (0:sin, 1:cos, 2:tan, 3:cot)', min: 0, max: 3 },
    ],
    validateCode: `
      const { m, varIdx, fnIdx } = params;
      if (m < 1 || m > 6) return { valid: false, reason: 'Hệ số m phải dương' };
      if (varIdx < 0 || varIdx > 3 || fnIdx < 0 || fnIdx > 3) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, varIdx, fnIdx } = params;
      ` + TRIG11_B2_MC_HELPERS + String.raw`
      const vars = ['\\alpha', '\\beta', 'a', 'x'];
      const v = vars[varIdx];
      const ang = fmtMulVar(m, v);
      const trueList = [
        '$\\sin (-' + ang + ') = -\\sin ' + ang + '$',
        '$\\cos (-' + ang + ') = \\cos ' + ang + '$',
        '$\\tan (-' + ang + ') = -\\tan ' + ang + '$',
        '$\\cot (-' + ang + ') = -\\cot ' + ang + '$',
      ];
      const wrongPool = [
        '$\\sin (-' + ang + ') = \\sin ' + ang + '$',
        '$\\sin (-' + ang + ') = \\cos ' + ang + '$',
        '$\\cos (-' + ang + ') = -\\cos ' + ang + '$',
        '$\\cos (-' + ang + ') = \\sin ' + ang + '$',
        '$\\tan (-' + ang + ') = \\tan ' + ang + '$',
        '$\\tan (-' + ang + ') = \\cot ' + ang + '$',
        '$\\cot (-' + ang + ') = \\cot ' + ang + '$',
        '$\\cot (-' + ang + ') = \\tan ' + ang + '$',
      ];
      const correct = trueList[fnIdx];
      const orderedWrong = [
        wrongPool[(fnIdx * 2 + 4) % wrongPool.length],
        wrongPool[(fnIdx * 2 + 3) % wrongPool.length],
        wrongPool[(fnIdx * 2 + 1) % wrongPool.length],
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        orderedWrong,
        rng,
        (k) => wrongPool[k % wrongPool.length]
      );
      return {
        stem: 'Cho $' + ang + '$ là góc lượng giác (giả sử các giá trị lượng giác đều xác định). Tìm khẳng định đúng trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức hai góc đối nhau ($-' + ang + '$ và $' + ang + '$): $\\cos(-u) = \\cos u$, $\\sin(-u) = -\\sin u$, $\\tan(-u) = -\\tan u$, $\\cot(-u) = -\\cot u$.',
          'Do đó khẳng định đúng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { m: 0, varIdx: 1, fnIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (2β, cot)', params: { m: 2, varIdx: 1, fnIdx: 3 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Cung bù (π - α)
  t11_b2_d02_supplementary_angles_mc: {
    id: 't11_b2_d02_supplementary_angles_mc',
    name: 'Công thức giá trị lượng giác của hai góc bù nhau',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức lượng giác cơ bản',
    description: 'Nhận diện đẳng thức đúng của hai góc bù nhau α và π - α.',
    conditionSummary: 'Lựa chọn tên góc và hàm lượng giác trong công thức π - α',
    paramSpecs: [
      { name: 'varIdx', label: 'Tên biến góc (0:α, 1:β, 2:a, 3:x)', min: 0, max: 3 },
      { name: 'fnIdx', label: 'Khẳng định đúng (0:sin, 1:cos, 2:tan, 3:cot)', min: 0, max: 3 },
    ],
    validateCode: `
      const { varIdx, fnIdx } = params;
      if (varIdx < 0 || varIdx > 3 || fnIdx < 0 || fnIdx > 3) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { varIdx, fnIdx } = params;
      const vars = ['\\alpha', '\\beta', 'a', 'x'];
      const v = vars[varIdx];
      const trueList = [
        '$\\sin (\\pi - ' + v + ') = \\sin ' + v + '$',
        '$\\cos (\\pi - ' + v + ') = -\\cos ' + v + '$',
        '$\\tan (\\pi - ' + v + ') = -\\tan ' + v + '$',
        '$\\cot (\\pi - ' + v + ') = -\\cot ' + v + '$',
      ];
      const wrongPool = [
        '$\\sin (\\pi - ' + v + ') = -\\sin ' + v + '$',
        '$\\sin (\\pi - ' + v + ') = \\cos ' + v + '$',
        '$\\cos (\\pi - ' + v + ') = \\cos ' + v + '$',
        '$\\cos (\\pi - ' + v + ') = \\sin ' + v + '$',
        '$\\tan (\\pi - ' + v + ') = \\tan ' + v + '$',
        '$\\tan (\\pi - ' + v + ') = \\cot ' + v + '$',
        '$\\cot (\\pi - ' + v + ') = \\cot ' + v + '$',
        '$\\cot (\\pi - ' + v + ') = \\tan ' + v + '$',
      ];
      const correct = trueList[fnIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          wrongPool[(fnIdx * 2) % wrongPool.length],
          wrongPool[(fnIdx * 2 + 1) % wrongPool.length],
          wrongPool[(fnIdx * 2 + 5) % wrongPool.length],
        ],
        rng,
        (k) => wrongPool[k % wrongPool.length]
      );
      return {
        stem: 'Cho $' + v + '$ là góc lượng giác (giả sử các giá trị lượng giác đều xác định). Tìm khẳng định đúng trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Với hai góc bù nhau $' + v + '$ và $\\pi - ' + v + '$ ("sin bù"): $\\sin(\\pi - ' + v + ') = \\sin ' + v + '$, còn $\\cos, \\tan, \\cot$ đều đổi dấu.',
          'Do đó khẳng định đúng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chỉ số fnIdx = 5', params: { varIdx: 0, fnIdx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (α, cos)', params: { varIdx: 0, fnIdx: 1 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Cung phụ (π/2 - a)
  t11_b2_d03_complementary_angles_mc: {
    id: 't11_b2_d03_complementary_angles_mc',
    name: 'Công thức giá trị lượng giác của hai góc phụ nhau',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức lượng giác cơ bản',
    description: 'Nhận diện đẳng thức đúng của hai góc phụ nhau a và π/2 - a.',
    conditionSummary: 'Lựa chọn tên góc và hàm lượng giác trong công thức π/2 - a',
    paramSpecs: [
      { name: 'varIdx', label: 'Tên biến góc (0:a, 1:b, 2:α, 3:x)', min: 0, max: 3 },
      { name: 'fnIdx', label: 'Khẳng định đúng (0:sin, 1:cos, 2:tan, 3:cot)', min: 0, max: 3 },
    ],
    validateCode: `
      const { varIdx, fnIdx } = params;
      if (varIdx < 0 || varIdx > 3 || fnIdx < 0 || fnIdx > 3) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { varIdx, fnIdx } = params;
      const vars = ['a', 'b', '\\alpha', 'x'];
      const v = vars[varIdx];
      const trueList = [
        '$\\sin \\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\cos ' + v + '$',
        '$\\cos \\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\sin ' + v + '$',
        '$\\tan \\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\cot ' + v + '$',
        '$\\cot \\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\tan ' + v + '$',
      ];
      const wrongPool = [
        '$\\sin \\left(\\frac{\\pi}{2} - ' + v + '\\right) = -\\sin ' + v + '$',
        '$\\sin \\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\sin ' + v + '$',
        '$\\cos \\left(\\frac{\\pi}{2} - ' + v + '\\right) = -\\sin ' + v + '$',
        '$\\cos \\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\cos ' + v + '$',
        '$\\tan \\left(\\frac{\\pi}{2} - ' + v + '\\right) = -\\cot ' + v + '$',
        '$\\tan \\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\tan ' + v + '$',
        '$\\cot \\left(\\frac{\\pi}{2} - ' + v + '\\right) = -\\cot ' + v + '$',
        '$\\cot \\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\cot ' + v + '$',
      ];
      const correct = trueList[fnIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          wrongPool[(fnIdx * 2) % wrongPool.length],
          wrongPool[(fnIdx * 2 + 1) % wrongPool.length],
          wrongPool[(fnIdx * 2 + 6) % wrongPool.length],
        ],
        rng,
        (k) => wrongPool[k % wrongPool.length]
      );
      return {
        stem: 'Cho $' + v + '$ là góc lượng giác (giả sử các giá trị lượng giác đều xác định). Tìm khẳng định đúng trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng quy tắc "phụ chéo" với $\\frac{\\pi}{2} - ' + v + '$: $\\sin$ đổi thành $\\cos$, $\\cos$ đổi thành $\\sin$, $\\tan$ đổi thành $\\cot$, $\\cot$ đổi thành $\\tan$ và giữ nguyên dấu.',
          'Vậy ' + correct + ' là khẳng định đúng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chỉ số varIdx âm', params: { varIdx: -1, fnIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (a, tan)', params: { varIdx: 0, fnIdx: 2 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Cung hơn kém π (π + β)
  t11_b2_d04_pi_shift_angles_mc: {
    id: 't11_b2_d04_pi_shift_angles_mc',
    name: 'Công thức giá trị lượng giác của hai góc hơn kém nhau π',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức lượng giác cơ bản',
    description: 'Nhận diện đẳng thức đúng của hai góc hơn kém nhau π (β và π + β).',
    conditionSummary: 'Lựa chọn tên góc và hàm lượng giác trong công thức π + β',
    paramSpecs: [
      { name: 'varIdx', label: 'Tên biến góc (0:β, 1:α, 2:a, 3:x)', min: 0, max: 3 },
      { name: 'fnIdx', label: 'Khẳng định đúng (0:sin, 1:cos, 2:tan, 3:cot)', min: 0, max: 3 },
    ],
    validateCode: `
      const { varIdx, fnIdx } = params;
      if (varIdx < 0 || varIdx > 3 || fnIdx < 0 || fnIdx > 3) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { varIdx, fnIdx } = params;
      const vars = ['\\beta', '\\alpha', 'a', 'x'];
      const v = vars[varIdx];
      const trueList = [
        '$\\sin (\\pi + ' + v + ') = -\\sin ' + v + '$',
        '$\\cos (\\pi + ' + v + ') = -\\cos ' + v + '$',
        '$\\tan (\\pi + ' + v + ') = \\tan ' + v + '$',
        '$\\cot (\\pi + ' + v + ') = \\cot ' + v + '$',
      ];
      const wrongPool = [
        '$\\sin (\\pi + ' + v + ') = \\sin ' + v + '$',
        '$\\sin (\\pi + ' + v + ') = \\cos ' + v + '$',
        '$\\cos (\\pi + ' + v + ') = \\cos ' + v + '$',
        '$\\cos (\\pi + ' + v + ') = \\sin ' + v + '$',
        '$\\tan (\\pi + ' + v + ') = -\\tan ' + v + '$',
        '$\\tan (\\pi + ' + v + ') = \\cot ' + v + '$',
        '$\\cot (\\pi + ' + v + ') = -\\cot ' + v + '$',
        '$\\cot (\\pi + ' + v + ') = \\tan ' + v + '$',
      ];
      const correct = trueList[fnIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          wrongPool[(fnIdx * 2) % wrongPool.length],
          wrongPool[(fnIdx * 2 + 2) % wrongPool.length],
          wrongPool[(fnIdx * 2 + 5) % wrongPool.length],
        ],
        rng,
        (k) => wrongPool[k % wrongPool.length]
      );
      return {
        stem: 'Cho $' + v + '$ là góc lượng giác (giả sử các giá trị lượng giác đều xác định). Tìm khẳng định đúng trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Với hai góc hơn kém nhau $\\pi$ ("khác $\\pi$ tan, cot"): $\\tan(\\pi + ' + v + ') = \\tan ' + v + '$, $\\cot(\\pi + ' + v + ') = \\cot ' + v + '$, còn $\\sin(\\pi + ' + v + ') = -\\sin ' + v + '$ và $\\cos(\\pi + ' + v + ') = -\\cos ' + v + '$.',
          'Do đó khẳng định đúng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chỉ số fnIdx âm', params: { varIdx: 0, fnIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (β, cot)', params: { varIdx: 0, fnIdx: 3 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Nhận dạng giá trị lượng giác các cung liên quan (bao gồm π/2 + x, π + x, ...)
  t11_b2_d05_related_angles_mixed_mc: {
    id: 't11_b2_d05_related_angles_mixed_mc',
    name: 'Nhận dạng công thức các góc lượng giác liên quan (hơn kém π, π/2)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức lượng giác cơ bản',
    description: 'Kiểm tra nhận diện đẳng thức đúng trong nhóm các góc liên quan π + x, π - x, π/2 + x, π/2 - x.',
    conditionSummary: 'caseIdx ∈ [0; 7], chọn 1 công thức đúng và 3 đẳng thức sai về dấu hoặc tên hàm',
    paramSpecs: [
      { name: 'varIdx', label: 'Tên biến góc (0:x, 1:a, 2:α, 3:β)', min: 0, max: 3 },
      { name: 'caseIdx', label: 'Dạng công thức đúng (0..7)', min: 0, max: 7 },
    ],
    validateCode: `
      const { varIdx, caseIdx } = params;
      if (varIdx < 0 || varIdx > 3 || caseIdx < 0 || caseIdx > 7) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { varIdx, caseIdx } = params;
      const vars = ['x', 'a', '\\alpha', '\\beta'];
      const v = vars[varIdx];
      const entries = [
        {
          ok: '$\\sin(\\pi + ' + v + ') = -\\sin ' + v + '$',
          bad: [
            '$\\cos(\\pi + ' + v + ') = \\cos ' + v + '$',
            '$\\sin\\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\sin ' + v + '$',
            '$\\cos\\left(\\frac{\\pi}{2} + ' + v + '\\right) = \\sin ' + v + '$',
          ],
        },
        {
          ok: '$\\cos(\\pi + ' + v + ') = -\\cos ' + v + '$',
          bad: [
            '$\\sin(\\pi + ' + v + ') = \\sin ' + v + '$',
            '$\\cos(\\pi - ' + v + ') = \\cos ' + v + '$',
            '$\\tan\\left(\\frac{\\pi}{2} + ' + v + '\\right) = \\cot ' + v + '$',
          ],
        },
        {
          ok: '$\\sin\\left(\\frac{\\pi}{2} + ' + v + '\\right) = \\cos ' + v + '$',
          bad: [
            '$\\cos\\left(\\frac{\\pi}{2} + ' + v + '\\right) = \\sin ' + v + '$',
            '$\\sin(\\pi + ' + v + ') = \\sin ' + v + '$',
            '$\\tan(\\pi - ' + v + ') = \\tan ' + v + '$',
          ],
        },
        {
          ok: '$\\cos\\left(\\frac{\\pi}{2} + ' + v + '\\right) = -\\sin ' + v + '$',
          bad: [
            '$\\sin\\left(\\frac{\\pi}{2} + ' + v + '\\right) = -\\cos ' + v + '$',
            '$\\cos(\\pi + ' + v + ') = \\cos ' + v + '$',
            '$\\cot(\\pi - ' + v + ') = \\cot ' + v + '$',
          ],
        },
        {
          ok: '$\\tan\\left(\\frac{\\pi}{2} + ' + v + '\\right) = -\\cot ' + v + '$',
          bad: [
            '$\\cot\\left(\\frac{\\pi}{2} + ' + v + '\\right) = \\tan ' + v + '$',
            '$\\tan(\\pi - ' + v + ') = \\tan ' + v + '$',
            '$\\sin(\\pi + ' + v + ') = \\sin ' + v + '$',
          ],
        },
        {
          ok: '$\\cot\\left(\\frac{\\pi}{2} + ' + v + '\\right) = -\\tan ' + v + '$',
          bad: [
            '$\\tan\\left(\\frac{\\pi}{2} + ' + v + '\\right) = \\cot ' + v + '$',
            '$\\cos(\\pi - ' + v + ') = \\cos ' + v + '$',
            '$\\sin\\left(\\frac{\\pi}{2} - ' + v + '\\right) = -\\cos ' + v + '$',
          ],
        },
        {
          ok: '$\\sin(\\pi - ' + v + ') = \\sin ' + v + '$',
          bad: [
            '$\\cos(\\pi - ' + v + ') = \\cos ' + v + '$',
            '$\\sin(\\pi + ' + v + ') = \\sin ' + v + '$',
            '$\\tan(\\pi - ' + v + ') = \\tan ' + v + '$',
          ],
        },
        {
          ok: '$\\cos\\left(\\frac{\\pi}{2} - ' + v + '\\right) = \\sin ' + v + '$',
          bad: [
            '$\\sin\\left(\\frac{\\pi}{2} - ' + v + '\\right) = -\\cos ' + v + '$',
            '$\\cos(\\pi + ' + v + ') = \\cos ' + v + '$',
            '$\\cot(\\pi + ' + v + ') = -\\cot ' + v + '$',
          ],
        },
      ];
      const item = entries[caseIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        item.ok,
        item.bad,
        rng,
        (k) => entries[(caseIdx + k) % entries.length].bad[k % 3]
      );
      return {
        stem: 'Với góc $' + v + '$ bất kì (các biểu thức đều có nghĩa), đẳng thức nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: item.ok,
        solutionSteps: [
          'Áp dụng công thức các góc liên quan (hơn kém $\\pi$, bù nhau, phụ nhau, hơn kém $\\frac{\\pi}{2}$).',
          'Kiểm tra từng đẳng thức, thấy đẳng thức đúng là ' + item.ok + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx vượt quá 7', params: { varIdx: 0, caseIdx: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (x, sin(π + x))', params: { varIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Công thức nhân đôi
  t11_b2_d06_double_angle_identity_mc: {
    id: 't11_b2_d06_double_angle_identity_mc',
    name: 'Nhận dạng công thức lượng giác nhân đôi',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức nhân đôi',
    description: 'Nhận biết công thức đúng của sin 2x, cos 2x và tan 2x.',
    conditionSummary: 'caseIdx ∈ [0; 4], tránh các công thức sai hệ số hoặc sai dấu',
    paramSpecs: [
      { name: 'varIdx', label: 'Tên biến góc (0:β, 1:α, 2:a, 3:x)', min: 0, max: 3 },
      { name: 'caseIdx', label: 'Công thức đúng (0..4)', min: 0, max: 4 },
    ],
    validateCode: `
      const { varIdx, caseIdx } = params;
      if (varIdx < 0 || varIdx > 3 || caseIdx < 0 || caseIdx > 4) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { varIdx, caseIdx } = params;
      const vars = ['\\beta', '\\alpha', 'a', 'x'];
      const v = vars[varIdx];
      const entries = [
        {
          ok: '$\\cos 2' + v + ' = 1 - 2\\sin^2 ' + v + '$',
          bad: [
            '$\\cos 2' + v + ' = 2\\sin ' + v + '\\cos ' + v + '$',
            '$\\cos 2' + v + ' = \\sin^2 ' + v + ' - \\cos^2 ' + v + '$',
            '$\\cos 2' + v + ' = 2\\sin^2 ' + v + ' - 1$',
          ],
          note: 'Công thức nhân đôi của $\\cos$: $\\cos 2' + v + ' = \\cos^2 ' + v + ' - \\sin^2 ' + v + ' = 2\\cos^2 ' + v + ' - 1 = 1 - 2\\sin^2 ' + v + '$.',
        },
        {
          ok: '$\\cos 2' + v + ' = 2\\cos^2 ' + v + ' - 1$',
          bad: [
            '$\\cos 2' + v + ' = 1 - 2\\cos^2 ' + v + '$',
            '$\\cos 2' + v + ' = 2\\sin ' + v + '\\cos ' + v + '$',
            '$\\sin 2' + v + ' = 2\\cos^2 ' + v + ' - 1$',
          ],
          note: 'Áp dụng công thức nhân đôi: $\\cos 2' + v + ' = 2\\cos^2 ' + v + ' - 1$.',
        },
        {
          ok: '$\\cos 2' + v + ' = \\cos^2 ' + v + ' - \\sin^2 ' + v + '$',
          bad: [
            '$\\cos 2' + v + ' = \\sin^2 ' + v + ' - \\cos^2 ' + v + '$',
            '$\\cos 2' + v + ' = \\cos^2 ' + v + ' + \\sin^2 ' + v + '$',
            '$\\sin 2' + v + ' = \\sin ' + v + '\\cos ' + v + '$',
          ],
          note: 'Áp dụng công thức nhân đôi: $\\cos 2' + v + ' = \\cos^2 ' + v + ' - \\sin^2 ' + v + '$.',
        },
        {
          ok: '$\\sin 2' + v + ' = 2\\sin ' + v + '\\cos ' + v + '$',
          bad: [
            '$\\sin 2' + v + ' = \\sin ' + v + '\\cos ' + v + '$',
            '$\\sin 2' + v + ' = 2\\cos^2 ' + v + ' - 1$',
            '$\\sin 2' + v + ' = \\cos^2 ' + v + ' - \\sin^2 ' + v + '$',
          ],
          note: 'Áp dụng công thức nhân đôi: $\\sin 2' + v + ' = 2\\sin ' + v + '\\cos ' + v + '$.',
        },
        {
          ok: '$\\tan 2' + v + ' = \\frac{2\\tan ' + v + '}{1 - \\tan^2 ' + v + '}$',
          bad: [
            '$\\tan 2' + v + ' = \\frac{2\\tan ' + v + '}{1 + \\tan^2 ' + v + '}$',
            '$\\tan 2' + v + ' = \\frac{\\tan ' + v + '}{1 - \\tan^2 ' + v + '}$',
            '$\\tan 2' + v + ' = \\frac{1 - \\tan^2 ' + v + '}{2\\tan ' + v + '}$',
          ],
          note: 'Áp dụng công thức nhân đôi của tang: $\\tan 2' + v + ' = \\dfrac{2\\tan ' + v + '}{1 - \\tan^2 ' + v + '}$.',
        },
      ];
      const item = entries[caseIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        item.ok,
        item.bad,
        rng,
        (k) => entries[(caseIdx + k) % entries.length].bad[k % 3]
      );
      return {
        stem: 'Với mọi góc lượng giác $' + v + '$ (giả sử các biểu thức đều có nghĩa), khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: item.ok,
        solutionSteps: [item.note, 'Vậy khẳng định đúng là ' + item.ok + '.'],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx = 5', params: { varIdx: 0, caseIdx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (β, cos 2β = 1 - 2sin^2 β)', params: { varIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Công thức cộng
  t11_b2_d07_addition_formula_mc: {
    id: 't11_b2_d07_addition_formula_mc',
    name: 'Nhận dạng công thức cộng lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng',
    description: 'Nhận diện công thức đúng của sin(a ± b) hoặc cos(a ± b).',
    conditionSummary: 'caseIdx ∈ [0; 3] tương ứng với cos(a+b), cos(a-b), sin(a+b), sin(a-b)',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp góc (0:(α,β), 1:(a,b), 2:(x,y))', min: 0, max: 2 },
      { name: 'caseIdx', label: 'Công thức (0:cos+, 1:cos-, 2:sin+, 3:sin-)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pairIdx, caseIdx } = params;
      if (pairIdx < 0 || pairIdx > 2 || caseIdx < 0 || caseIdx > 3) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, caseIdx } = params;
      const pairs = [['\\alpha', '\\beta'], ['a', 'b'], ['x', 'y']];
      const A = pairs[pairIdx][0];
      const B = pairs[pairIdx][1];
      const entries = [
        {
          stemExpr: '\\cos(' + A + ' + ' + B + ')',
          ok: '$\\cos ' + A + '\\cos ' + B + ' - \\sin ' + A + '\\sin ' + B + '$',
          bad: [
            '$\\cos ' + A + '\\cos ' + B + ' + \\sin ' + A + '\\sin ' + B + '$',
            '$\\sin ' + A + '\\cos ' + B + ' + \\cos ' + A + '\\sin ' + B + '$',
            '$\\sin ' + A + '\\cos ' + B + ' - \\cos ' + A + '\\sin ' + B + '$',
          ],
        },
        {
          stemExpr: '\\cos(' + A + ' - ' + B + ')',
          ok: '$\\cos ' + A + '\\cos ' + B + ' + \\sin ' + A + '\\sin ' + B + '$',
          bad: [
            '$\\cos ' + A + '\\cos ' + B + ' - \\sin ' + A + '\\sin ' + B + '$',
            '$\\sin ' + A + '\\cos ' + B + ' + \\cos ' + A + '\\sin ' + B + '$',
            '$\\sin ' + A + '\\cos ' + B + ' - \\cos ' + A + '\\sin ' + B + '$',
          ],
        },
        {
          stemExpr: '\\sin(' + A + ' + ' + B + ')',
          ok: '$\\sin ' + A + '\\cos ' + B + ' + \\cos ' + A + '\\sin ' + B + '$',
          bad: [
            '$\\sin ' + A + '\\cos ' + B + ' - \\cos ' + A + '\\sin ' + B + '$',
            '$\\cos ' + A + '\\cos ' + B + ' - \\sin ' + A + '\\sin ' + B + '$',
            '$\\cos ' + A + '\\cos ' + B + ' + \\sin ' + A + '\\sin ' + B + '$',
          ],
        },
        {
          stemExpr: '\\sin(' + A + ' - ' + B + ')',
          ok: '$\\sin ' + A + '\\cos ' + B + ' - \\cos ' + A + '\\sin ' + B + '$',
          bad: [
            '$\\sin ' + A + '\\cos ' + B + ' + \\cos ' + A + '\\sin ' + B + '$',
            '$\\cos ' + A + '\\cos ' + B + ' - \\sin ' + A + '\\sin ' + B + '$',
            '$\\cos ' + A + '\\cos ' + B + ' + \\sin ' + A + '\\sin ' + B + '$',
          ],
        },
      ];
      const item = entries[caseIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        item.ok,
        item.bad,
        rng,
        (k) => entries[(caseIdx + k) % 4].bad[k % 3]
      );
      return {
        stem: 'Với hai góc $' + A + ', ' + B + '$ tùy ý, khẳng định nào dưới đây đúng? $' + item.stemExpr + ' =$',
        options,
        correctIndex,
        answerSummary: item.ok,
        solutionSteps: [
          'Áp dụng công thức cộng: $\\cos(' + A + ' \\pm ' + B + ') = \\cos ' + A + '\\cos ' + B + ' \\mp \\sin ' + A + '\\sin ' + B + '$ và $\\sin(' + A + ' \\pm ' + B + ') = \\sin ' + A + '\\cos ' + B + ' \\pm \\cos ' + A + '\\sin ' + B + '$.',
          'Do đó $' + item.stemExpr + ' = $ ' + item.ok + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pairIdx = 3', params: { pairIdx: 3, caseIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 ((α,β), cos(α+β))', params: { pairIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Công thức biến đổi tổng thành tích tổng quát
  t11_b2_d08_sum_to_product_general_mc: {
    id: 't11_b2_d08_sum_to_product_general_mc',
    name: 'Công thức biến đổi tổng thành tích (dạng tổng quát)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức biến đổi tổng thành tích',
    description: 'Nhận dạng công thức biến đổi sin x ± sin y và cos x ± cos y thành tích.',
    conditionSummary: 'caseIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp biến (0:(x,y), 1:(a,b), 2:(α,β))', min: 0, max: 2 },
      { name: 'caseIdx', label: 'Dạng (0:sin+sin, 1:sin-sin, 2:cos+cos, 3:cos-cos)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pairIdx, caseIdx } = params;
      if (pairIdx < 0 || pairIdx > 2 || caseIdx < 0 || caseIdx > 3) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, caseIdx } = params;
      const pairs = [['x', 'y'], ['a', 'b'], ['\\alpha', '\\beta']];
      const A = pairs[pairIdx][0];
      const B = pairs[pairIdx][1];
      const hp = '\\frac{' + A + ' + ' + B + '}{2}';
      const hm = '\\frac{' + A + ' - ' + B + '}{2}';
      const entries = [
        {
          expr: '\\sin ' + A + ' + \\sin ' + B,
          ok: '$2\\sin ' + hp + '\\cos ' + hm + '$',
          bad: [
            '$2\\cos ' + hp + '\\sin ' + hm + '$',
            '$2\\cos ' + hp + '\\cos ' + hm + '$',
            '$-2\\sin ' + hp + '\\sin ' + hm + '$',
          ],
        },
        {
          expr: '\\sin ' + A + ' - \\sin ' + B,
          ok: '$2\\cos ' + hp + '\\sin ' + hm + '$',
          bad: [
            '$2\\sin ' + hp + '\\cos ' + hm + '$',
            '$-2\\cos ' + hp + '\\sin ' + hm + '$',
            '$-2\\sin ' + hp + '\\sin ' + hm + '$',
          ],
        },
        {
          expr: '\\cos ' + A + ' + \\cos ' + B,
          ok: '$2\\cos ' + hp + '\\cos ' + hm + '$',
          bad: [
            '$2\\sin ' + hp + '\\sin ' + hm + '$',
            '$-2\\cos ' + hp + '\\cos ' + hm + '$',
            '$2\\sin ' + hp + '\\cos ' + hm + '$',
          ],
        },
        {
          expr: '\\cos ' + A + ' - \\cos ' + B,
          ok: '$-2\\sin ' + hp + '\\sin ' + hm + '$',
          bad: [
            '$2\\sin ' + hp + '\\sin ' + hm + '$',
            '$2\\cos ' + hp + '\\cos ' + hm + '$',
            '$-2\\cos ' + hp + '\\sin ' + hm + '$',
          ],
        },
      ];
      const item = entries[caseIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        item.ok,
        item.bad,
        rng,
        (k) => entries[(caseIdx + k) % 4].bad[k % 3]
      );
      return {
        stem: 'Với mọi số thực $' + A + ', ' + B + '$, biểu thức $' + item.expr + '$ bằng',
        options,
        correctIndex,
        answerSummary: item.ok,
        solutionSteps: [
          'Áp dụng công thức biến đổi tổng thành tích: $' + item.expr + ' = $ ' + item.ok + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx = 4', params: { pairIdx: 0, caseIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (x,y; sin x + sin y)', params: { pairIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Công thức biến đổi tích thành tổng tổng quát
  t11_b2_d09_product_to_sum_general_mc: {
    id: 't11_b2_d09_product_to_sum_general_mc',
    name: 'Công thức biến đổi tích thành tổng (dạng tổng quát)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức biến đổi tích thành tổng',
    description: 'Nhận diện công thức biến đổi sin x cos y, cos x cos y, sin x sin y thành tổng.',
    conditionSummary: 'caseIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp biến (0:(x,y), 1:(a,b), 2:(α,β))', min: 0, max: 2 },
      { name: 'caseIdx', label: 'Dạng (0:sin*cos, 1:cos*cos, 2:sin*sin)', min: 0, max: 2 },
    ],
    validateCode: `
      const { pairIdx, caseIdx } = params;
      if (pairIdx < 0 || pairIdx > 2 || caseIdx < 0 || caseIdx > 2) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, caseIdx } = params;
      const pairs = [['x', 'y'], ['a', 'b'], ['\\alpha', '\\beta']];
      const A = pairs[pairIdx][0];
      const B = pairs[pairIdx][1];
      const sum = A + ' + ' + B;
      const diff = A + ' - ' + B;
      const entries = [
        {
          expr: '\\sin ' + A + '\\cos ' + B,
          ok: '$\\frac{1}{2}\\left[\\sin(' + sum + ') + \\sin(' + diff + ')\\right]$',
          bad: [
            '$\\frac{1}{2}\\left[\\sin(' + sum + ') - \\sin(' + diff + ')\\right]$',
            '$\\frac{1}{2}\\left[\\cos(' + sum + ') + \\cos(' + diff + ')\\right]$',
            '$\\frac{1}{2}\\left[\\cos(' + diff + ') - \\cos(' + sum + ')\\right]$',
          ],
        },
        {
          expr: '\\cos ' + A + '\\cos ' + B,
          ok: '$\\frac{1}{2}\\left[\\cos(' + sum + ') + \\cos(' + diff + ')\\right]$',
          bad: [
            '$\\frac{1}{2}\\left[\\cos(' + sum + ') - \\cos(' + diff + ')\\right]$',
            '$\\frac{1}{2}\\left[\\sin(' + sum + ') + \\sin(' + diff + ')\\right]$',
            '$\\frac{1}{2}\\left[\\cos(' + diff + ') - \\cos(' + sum + ')\\right]$',
          ],
        },
        {
          expr: '\\sin ' + A + '\\sin ' + B,
          ok: '$\\frac{1}{2}\\left[\\cos(' + diff + ') - \\cos(' + sum + ')\\right]$',
          bad: [
            '$\\frac{1}{2}\\left[\\cos(' + sum + ') + \\cos(' + diff + ')\\right]$',
            '$\\frac{1}{2}\\left[\\cos(' + sum + ') - \\cos(' + diff + ')\\right]$',
            '$\\frac{1}{2}\\left[\\sin(' + sum + ') - \\sin(' + diff + ')\\right]$',
          ],
        },
      ];
      const item = entries[caseIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        item.ok,
        item.bad,
        rng,
        (k) => entries[(caseIdx + k) % 3].bad[k % 3]
      );
      return {
        stem: 'Với mọi số thực $' + A + ', ' + B + '$, biểu thức $' + item.expr + '$ bằng',
        options,
        correctIndex,
        answerSummary: item.ok,
        solutionSteps: [
          'Áp dụng công thức biến đổi tích thành tổng: $' + item.expr + ' = $ ' + item.ok + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx = 3', params: { pairIdx: 0, caseIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (x,y; sin x cos y)', params: { pairIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Biến đổi tổng thành tích với góc bội mx ± nx
  t11_b2_d10_sum_to_product_multiples_mc: {
    id: 't11_b2_d10_sum_to_product_multiples_mc',
    name: 'Biến đổi tổng thành tích biểu thức góc bội mx ± nx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức biến đổi tổng thành tích',
    description: 'Biến đổi biểu thức sin(mx) ± sin(nx) hoặc cos(mx) ± cos(nx) thành tích với m + n chẵn.',
    conditionSummary: 'm > n ≥ 1, m + n chẵn để nửa tổng (m+n)/2 và nửa hiệu (m-n)/2 là số nguyên dương',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc lớn m', min: 3, max: 9 },
      { name: 'n', label: 'Hệ số góc nhỏ n', min: 1, max: 6 },
      { name: 'caseIdx', label: 'Dạng (0:sin+, 1:sin-, 2:cos+, 3:cos-)', min: 0, max: 3 },
    ],
    validateCode: `
      const { m, n, caseIdx } = params;
      if (n < 1 || m <= n) return { valid: false, reason: 'Cần m > n >= 1' };
      if ((m + n) % 2 !== 0) return { valid: false, reason: 'Cần m + n chẵn để nửa góc là số nguyên' };
      if (caseIdx < 0 || caseIdx > 3) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, n, caseIdx } = params;
      ` + TRIG11_B2_MC_HELPERS + String.raw`
      const p = (m + n) / 2;
      const q = (m - n) / 2;
      const am = fmtMulVar(m, 'x');
      const an = fmtMulVar(n, 'x');
      const ap = fmtMulVar(p, 'x');
      const aq = fmtMulVar(q, 'x');
      let expr = '';
      let correct = '';
      let bad = [];
      if (caseIdx === 0) {
        expr = '\\sin ' + am + ' + \\sin ' + an;
        correct = '$2\\sin ' + ap + '\\cos ' + aq + '$';
        bad = [
          '$2\\cos ' + ap + '\\sin ' + aq + '$',
          '$\\sin ' + ap + '\\cos ' + aq + '$',
          '$-2\\sin ' + ap + '\\cos ' + aq + '$',
          '$2\\cos ' + ap + '\\cos ' + aq + '$',
        ];
      } else if (caseIdx === 1) {
        expr = '\\sin ' + am + ' - \\sin ' + an;
        correct = '$2\\cos ' + ap + '\\sin ' + aq + '$';
        bad = [
          '$2\\sin ' + ap + '\\cos ' + aq + '$',
          '$\\cos ' + ap + '\\sin ' + aq + '$',
          '$-2\\cos ' + ap + '\\sin ' + aq + '$',
          '$-2\\sin ' + ap + '\\sin ' + aq + '$',
        ];
      } else if (caseIdx === 2) {
        expr = '\\cos ' + am + ' + \\cos ' + an;
        correct = '$2\\cos ' + ap + '\\cos ' + aq + '$';
        bad = [
          '$2\\sin ' + ap + '\\sin ' + aq + '$',
          '$-2\\cos ' + ap + '\\cos ' + aq + '$',
          '$\\cos ' + ap + '\\cos ' + aq + '$',
          '$2\\sin ' + ap + '\\cos ' + aq + '$',
        ];
      } else {
        expr = '\\cos ' + am + ' - \\cos ' + an;
        correct = '$-2\\sin ' + ap + '\\sin ' + aq + '$';
        bad = [
          '$2\\sin ' + ap + '\\sin ' + aq + '$',
          '$2\\cos ' + ap + '\\cos ' + aq + '$',
          '$-2\\cos ' + ap + '\\sin ' + aq + '$',
          '$-\\sin ' + ap + '\\sin ' + aq + '$',
        ];
      }
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        bad,
        rng,
        (k) => '$2\\sin ' + fmtMulVar(p + k, 'x') + '\\sin ' + fmtMulVar(q + 1, 'x') + '$'
      );
      return {
        stem: 'Biến đổi biểu thức $' + expr + '$ thành tích ta được',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức biến đổi tổng thành tích với nửa tổng $\\frac{' + m + 'x + ' + n + 'x}{2} = ' + ap + '$ và nửa hiệu $\\frac{' + m + 'x - ' + n + 'x}{2} = ' + aq + '$.',
          'Ta được $' + expr + ' = $ ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m + n lẻ', params: { m: 4, n: 1, caseIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (sin 5x + sin x)', params: { m: 5, n: 1, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Biến đổi tích thành tổng với góc bội mx, nx
  t11_b2_d11_product_to_sum_multiples_mc: {
    id: 't11_b2_d11_product_to_sum_multiples_mc',
    name: 'Biến đổi tích thành tổng biểu thức góc bội mx, nx',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức biến đổi tích thành tổng',
    description: 'Biến đổi sin(mx)sin(nx), cos(mx)cos(nx) hoặc sin(mx)cos(nx) thành tổng.',
    conditionSummary: 'm > n ≥ 1 để hiệu m - n > 0 và tổng m + n > 0',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc lớn m', min: 2, max: 8 },
      { name: 'n', label: 'Hệ số góc nhỏ n', min: 1, max: 5 },
      { name: 'caseIdx', label: 'Dạng (0:sin*sin, 1:cos*cos, 2:sin*cos)', min: 0, max: 2 },
    ],
    validateCode: `
      const { m, n, caseIdx } = params;
      if (n < 1 || m <= n) return { valid: false, reason: 'Cần m > n >= 1' };
      if (caseIdx < 0 || caseIdx > 2) return { valid: false, reason: 'Chỉ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, n, caseIdx } = params;
      ` + TRIG11_B2_MC_HELPERS + String.raw`
      const s = m + n;
      const d = m - n;
      const am = fmtMulVar(m, 'x');
      const an = fmtMulVar(n, 'x');
      const as = fmtMulVar(s, 'x');
      const ad = fmtMulVar(d, 'x');
      let expr = '';
      let correct = '';
      let bad = [];
      if (caseIdx === 0) {
        expr = '\\sin ' + am + '\\sin ' + an;
        correct = '$\\frac{1}{2}\\left(\\cos ' + ad + ' - \\cos ' + as + '\\right)$';
        bad = [
          '$\\frac{1}{2}\\left(\\cos ' + ad + ' + \\cos ' + as + '\\right)$',
          '$\\frac{1}{2}\\left(\\sin ' + ad + ' + \\sin ' + as + '\\right)$',
          '$-\\frac{1}{2}\\left(\\cos ' + ad + ' - \\cos ' + as + '\\right)$',
          '$\\cos ' + ad + ' - \\cos ' + as + '$',
        ];
      } else if (caseIdx === 1) {
        expr = '\\cos ' + am + '\\cos ' + an;
        correct = '$\\frac{1}{2}\\left(\\cos ' + as + ' + \\cos ' + ad + '\\right)$';
        bad = [
          '$\\frac{1}{2}\\left(\\cos ' + ad + ' - \\cos ' + as + '\\right)$',
          '$\\frac{1}{2}\\left(\\sin ' + as + ' + \\sin ' + ad + '\\right)$',
          '$-\\frac{1}{2}\\left(\\cos ' + as + ' + \\cos ' + ad + '\\right)$',
          '$\\cos ' + as + ' + \\cos ' + ad + '$',
        ];
      } else {
        expr = '\\sin ' + am + '\\cos ' + an;
        correct = '$\\frac{1}{2}\\left(\\sin ' + as + ' + \\sin ' + ad + '\\right)$';
        bad = [
          '$\\frac{1}{2}\\left(\\sin ' + as + ' - \\sin ' + ad + '\\right)$',
          '$\\frac{1}{2}\\left(\\cos ' + as + ' + \\cos ' + ad + '\\right)$',
          '$-\\frac{1}{2}\\left(\\sin ' + as + ' + \\sin ' + ad + '\\right)$',
          '$\\sin ' + as + ' + \\sin ' + ad + '$',
        ];
      }
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        bad,
        rng,
        (k) => '$\\frac{1}{2}\\left(\\sin ' + fmtMulVar(s + k, 'x') + ' + \\cos ' + ad + '\\right)$'
      );
      return {
        stem: 'Biến đổi biểu thức $' + expr + '$ thành tổng ta được',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức biến đổi tích thành tổng với $' + am + ' + ' + an + ' = ' + as + '$ và $' + am + ' - ' + an + ' = ' + ad + '$.',
          'Ta được $' + expr + ' = $ ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = n', params: { m: 3, n: 3, caseIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (sin 6x sin 3x)', params: { m: 6, n: 3, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Cho sin x ± cos x = p/q -> Tính sin 2x
  t11_b2_d12_sum_sin_cos_double_mc: {
    id: 't11_b2_d12_sum_sin_cos_double_mc',
    name: 'Tính sin(2x) khi biết tổng hoặc hiệu sin x ± cos x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức nhân đôi',
    description: 'Cho sin x + cos x = p/q (hoặc sin x - cos x = p/q) với |p/q| < √2. Tính giá trị sin 2x.',
    conditionSummary: 'q ≥ 3, p ≠ 0, gcd(|p|, q) = 1, p² < 2q² và |p| ≠ q để sin 2x ∈ (-1; 1) \\ {0}',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: -8, max: 8, allowZero: false },
      { name: 'q', label: 'Mẫu số q', min: 3, max: 11 },
      { name: 'signMode', label: 'Dạng (0: sin+cos, 1: sin-cos)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p, q, signMode } = params;
      if (p === 0 || q < 3) return { valid: false, reason: 'p != 0 và q >= 3' };
      if (signMode !== 0 && signMode !== 1) return { valid: false, reason: 'signMode không hợp lệ' };
      let a = Math.abs(p), b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      if (p * p >= 2 * q * q || Math.abs(p) === q) {
        return { valid: false, reason: 'Cần |p/q| < √2 và |p| != q để |sin 2x| < 1 và khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, signMode } = params;
      const givenFrac = u.simplifyFrac(p, q);
      const sqFrac = u.simplifyFrac(p * p, q * q);
      const ansNum = signMode === 0 ? p * p - q * q : q * q - p * p;
      const ans = u.simplifyFrac(ansNum, q * q);
      const fakeOpp = u.simplifyFrac(-ansNum, q * q);
      const fakeShift = u.simplifyFrac(ansNum + 2, q * q);
      const fakeLinear = u.simplifyFrac(p * p, q * q);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + fakeOpp.latex + '$', '$' + fakeShift.latex + '$', '$' + fakeLinear.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(ansNum - k * 2, q * q).latex + '$'
      );
      const op = signMode === 0 ? '+' : '-';
      const sqFormula = signMode === 0 ? '1 + \\sin 2x' : '1 - \\sin 2x';
      return {
        stem: 'Cho $\\sin x ' + op + ' \\cos x = ' + givenFrac.latex + '$. Khi đó giá trị của $\\sin 2x$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Bình phương hai vế của đẳng thức đã cho: $\\left(\\sin x ' + op + ' \\cos x\\right)^2 = \\left(' + givenFrac.latex + '\\right)^2$.',
          'Khai triển thu được $' + sqFormula + ' = ' + sqFrac.latex + '$.',
          'Suy ra $\\sin 2x = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên |p/q| >= √2 (vô nghiệm)', params: { p: 5, q: 3, signMode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (sin x + cos x = 6/7)', params: { p: 6, q: 7, signMode: 0 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Cho hai góc nhọn cos a, cos b -> Tính cos(a+b)cos(a-b)
  t11_b2_d13_cos_sum_diff_product_mc: {
    id: 't11_b2_d13_cos_sum_diff_product_mc',
    name: 'Tính cos(a + b)cos(a - b) khi biết cos a và cos b',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng và biến đổi tích thành tổng',
    description: 'Cho hai góc nhọn a, b biết cos a = p1/q1 và cos b = p2/q2. Tính giá trị cos(a+b)cos(a-b) = cos²a + cos²b - 1.',
    conditionSummary: '0 < p1 < q1, 0 < p2 < q2, tối giản, hai phân số khác nhau và đáp án khác 0',
    paramSpecs: [
      { name: 'p1', label: 'Tử số cos a', min: 1, max: 4 },
      { name: 'q1', label: 'Mẫu số cos a', min: 2, max: 7 },
      { name: 'p2', label: 'Tử số cos b', min: 1, max: 4 },
      { name: 'q2', label: 'Mẫu số cos b', min: 3, max: 7 },
    ],
    validateCode: `
      const { p1, q1, p2, q2 } = params;
      if (p1 <= 0 || p1 >= q1 || p2 <= 0 || p2 >= q2) return { valid: false, reason: 'Cần 0 < cos < 1' };
      const gcd = (x, y) => { let a = x, b = y; while (b !== 0) { const t = b; b = a % b; a = t; } return a; };
      if (gcd(p1, q1) !== 1 || gcd(p2, q2) !== 1) return { valid: false, reason: 'Phân số chưa tối giản' };
      if (p1 === p2 && q1 === q2) return { valid: false, reason: 'Hai góc nên có cos khác nhau' };
      const num = p1 * p1 * q2 * q2 + p2 * p2 * q1 * q1 - q1 * q1 * q2 * q2;
      if (num === 0) return { valid: false, reason: 'Tránh kết quả bằng 0 quá đặc biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, q1, p2, q2 } = params;
      const cosA = u.simplifyFrac(p1, q1);
      const cosB = u.simplifyFrac(p2, q2);
      const cos2A = u.simplifyFrac(p1 * p1, q1 * q1);
      const cos2B = u.simplifyFrac(p2 * p2, q2 * q2);
      const den = q1 * q1 * q2 * q2;
      const ansNum = p1 * p1 * q2 * q2 + p2 * p2 * q1 * q1 - den;
      const ans = u.simplifyFrac(ansNum, den);
      const fakeOpp = u.simplifyFrac(-ansNum, den);
      const fakeSum = u.simplifyFrac(p1 * p1 * q2 * q2 + p2 * p2 * q1 * q1, den);
      const fakeWrongSign = u.simplifyFrac(p1 * p1 * q2 * q2 - p2 * p2 * q1 * q1 - den, den);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + fakeOpp.latex + '$', '$' + fakeSum.latex + '$', '$' + fakeWrongSign.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(ansNum + k * 2, den).latex + '$'
      );
      return {
        stem: 'Cho hai góc nhọn $a$ và $b$ có $\\cos a = ' + cosA.latex + '$ và $\\cos b = ' + cosB.latex + '$. Giá trị biểu thức $\\cos(a + b)\\cos(a - b)$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Áp dụng công thức biến đổi tích thành tổng: $\\cos(a + b)\\cos(a - b) = \\frac{1}{2}(\\cos 2a + \\cos 2b)$.',
          'Thay $\\cos 2a = 2\\cos^2 a - 1$ và $\\cos 2b = 2\\cos^2 b - 1$ ta được $\\cos(a+b)\\cos(a-b) = \\cos^2 a + \\cos^2 b - 1$.',
          'Thay số: $\\left(' + cosA.latex + '\\right)^2 + \\left(' + cosB.latex + '\\right)^2 - 1 = ' + cos2A.latex + ' + ' + cos2B.latex + ' - 1 = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1 >= q1', params: { p1: 3, q1: 3, p2: 2, q2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (1/2 và 2/5)', params: { p1: 1, q1: 2, p2: 2, q2: 5 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Cho sin a = ±p/q và cos a = ±√(q²-p²)/q -> Tính sin 2a
  t11_b2_d14_sin2a_from_sin_cos_mc: {
    id: 't11_b2_d14_sin2a_from_sin_cos_mc',
    name: 'Tính sin(2a) khi biết giá trị sin a và cos a',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức nhân đôi',
    description: 'Cho sin a và cos a có dạng phân số chứa căn thức. Tính giá trị của sin 2a = 2 sin a cos a.',
    conditionSummary: '2 ≤ p < q, gcd(p, q) = 1 và q² - p² không phải số chính phương',
    paramSpecs: [
      { name: 'p', label: 'Tử số |sin a|', min: 2, max: 11 },
      { name: 'q', label: 'Mẫu số q', min: 5, max: 15 },
      { name: 'sSin', label: 'Dấu sin a (0: âm, 1: dương)', min: 0, max: 1 },
      { name: 'sCos', label: 'Dấu cos a (0: âm, 1: dương)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p, q, sSin, sCos } = params;
      if (p < 2 || p >= q) return { valid: false, reason: 'Cần 2 <= p < q' };
      if ((sSin !== 0 && sSin !== 1) || (sCos !== 0 && sCos !== 1)) return { valid: false, reason: 'Dấu không hợp lệ' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      const r = q * q - p * p;
      const sr = Math.round(Math.sqrt(r));
      if (sr * sr === r) return { valid: false, reason: 'Chọn cặp để √(q²-p²) giữ dạng căn thức' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, sSin, sCos } = params;
      ` + TRIG11_B2_MC_HELPERS + String.raw`
      const signSin = sSin === 1 ? 1 : -1;
      const signCos = sCos === 1 ? 1 : -1;
      const r = q * q - p * p;
      const sinLatex = fmtRadFrac(signSin * p, 1, q);
      const cosLatex = fmtRadFrac(signCos, r, q);
      const ansSign = signSin * signCos;
      const ansLatex = fmtRadFrac(2 * ansSign * p, r, q * q);
      const fakeOpp = fmtRadFrac(-2 * ansSign * p, r, q * q);
      const fakeHalf = fmtRadFrac(ansSign * p, r, q * q);
      const fakeDenQ = fmtRadFrac(2 * ansSign * p, r, q);
      const fakeHalfOpp = fmtRadFrac(-ansSign * p, r, q * q);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ansLatex + '$',
        ['$' + fakeOpp + '$', '$' + fakeHalf + '$', '$' + fakeDenQ + '$', '$' + fakeHalfOpp + '$'],
        rng,
        (k) => '$' + fmtRadFrac((2 + k) * ansSign * p, r, q * q) + '$'
      );
      return {
        stem: 'Cho $\\sin a = ' + sinLatex + '$ và $\\cos a = ' + cosLatex + '$. Khi đó $\\sin 2a$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ansLatex + '$',
        solutionSteps: [
          'Áp dụng công thức nhân đôi: $\\sin 2a = 2\\sin a\\cos a$.',
          'Thay số: $\\sin 2a = 2\\cdot\\left(' + sinLatex + '\\right)\\cdot\\left(' + cosLatex + '\\right) = ' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên bộ ba Pytago (3, 4, 5)', params: { p: 3, q: 5, sSin: 1, sCos: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (sin a = -10/13, cos a = √69/13)', params: { p: 10, q: 13, sSin: 0, sCos: 1 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Cho sin a (hoặc cos a) = ±p/q -> Tính cos 2a
  t11_b2_d15_cos2a_from_sin_or_cos_mc: {
    id: 't11_b2_d15_cos2a_from_sin_or_cos_mc',
    name: 'Tính cos(2a) khi biết giá trị sin a hoặc cos a',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức nhân đôi',
    description: 'Cho sin a = ±p/q (hoặc cos a = ±p/q). Tính giá trị của cos 2a.',
    conditionSummary: '1 ≤ p < q, gcd(p, q) = 1',
    paramSpecs: [
      { name: 'p', label: 'Tử số |p|', min: 1, max: 6 },
      { name: 'q', label: 'Mẫu số q', min: 3, max: 11 },
      { name: 'signMode', label: 'Dấu (0: dương, 1: âm)', min: 0, max: 1 },
      { name: 'givenFn', label: 'Hàm cho trước (0: sin a, 1: cos a)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p, q, signMode, givenFn } = params;
      if (p < 1 || p >= q) return { valid: false, reason: 'Cần 1 <= p < q' };
      if ((signMode !== 0 && signMode !== 1) || (givenFn !== 0 && givenFn !== 1)) return { valid: false, reason: 'Chỉ số ngoài miền' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, signMode, givenFn } = params;
      const signedP = signMode === 0 ? p : -p;
      const givenFrac = u.simplifyFrac(signedP, q);
      const ansNum = givenFn === 0 ? q * q - 2 * p * p : 2 * p * p - q * q;
      const ans = u.simplifyFrac(ansNum, q * q);
      const fakeOpp = u.simplifyFrac(-ansNum, q * q);
      const fakeNoSq = u.simplifyFrac(givenFn === 0 ? q - 2 * Math.abs(p) : 2 * Math.abs(p) - q, q);
      const fakeMiss2 = u.simplifyFrac(givenFn === 0 ? q * q - p * p : p * p - q * q, q * q);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + fakeOpp.latex + '$', '$' + fakeNoSq.latex + '$', '$' + fakeMiss2.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(ansNum + k * 2, q * q).latex + '$'
      );
      const fnName = givenFn === 0 ? '\\sin a' : '\\cos a';
      const formula = givenFn === 0 ? '1 - 2\\sin^2 a' : '2\\cos^2 a - 1';
      return {
        stem: 'Cho $' + fnName + ' = ' + givenFrac.latex + '$. Khi đó $\\cos 2a$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Áp dụng công thức nhân đôi: $\\cos 2a = ' + formula + '$.',
          'Thay số: $\\cos 2a = ' + (givenFn === 0 ? '1 - 2\\left(' + givenFrac.latex + '\\right)^2' : '2\\left(' + givenFrac.latex + '\\right)^2 - 1') + ' = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 5, q: 5, signMode: 0, givenFn: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (sin a = 3/7)', params: { p: 3, q: 7, signMode: 0, givenFn: 0 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Cho sin β = p/q với 0 < β < π/2 -> Tính sin(β + kπ/4)
  t11_b2_d16_sin_beta_plus_quarter_pi_mc: {
    id: 't11_b2_d16_sin_beta_plus_quarter_pi_mc',
    name: 'Tính sin(β + kπ/4) khi biết sin β và góc β ∈ (0; π/2)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng',
    description: 'Cho sin β = p/q với 0 < β < π/2. Tính sin(β + kπ/4) với k ∈ {1, 3, 5, 7}.',
    conditionSummary: '1 ≤ p < q, gcd(p, q) = 1, q² - p² không chính phương, 2p² ≠ q²',
    paramSpecs: [
      { name: 'p', label: 'Tử số sin β', min: 1, max: 5 },
      { name: 'q', label: 'Mẫu số sin β', min: 3, max: 7 },
      { name: 'kIdx', label: 'Góc cộng kπ/4 (0:π/4, 1:3π/4, 2:5π/4, 3:7π/4)', min: 0, max: 3 },
    ],
    validateCode: `
      const { p, q, kIdx } = params;
      if (p < 1 || p >= q) return { valid: false, reason: 'Cần 1 <= p < q' };
      if (kIdx < 0 || kIdx > 3) return { valid: false, reason: 'Chỉ số góc ngoài miền' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      const r = q * q - p * p;
      const sr = Math.round(Math.sqrt(r));
      if (sr * sr === r) return { valid: false, reason: 'Chọn p, q để √(q²-p²) còn căn thức' };
      if (2 * p * p === q * q) return { valid: false, reason: 'Tránh sin(β + kπ/4) = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, kIdx } = params;
      ` + TRIG11_B2_MC_HELPERS + String.raw`
      const kList = [1, 3, 5, 7];
      const sCList = [1, -1, -1, 1];
      const sSList = [1, 1, -1, -1];
      const k = kList[kIdx];
      const sC = sCList[kIdx];
      const sS = sSList[kIdx];
      const r = q * q - p * p;
      const sinBeta = u.simplifyFrac(p, q);
      const cosBeta = fmtRadFrac(1, r, q);
      const angleAdd = k === 1 ? '\\frac{\\pi}{4}' : '\\frac{' + k + '\\pi}{4}';
      const cosAdd = fmtRadFrac(sC, 2, 2);
      const sinAdd = fmtRadFrac(sS, 2, 2);

      // Exact value: (sC*p + sS*sqrt(r)) / (q*sqrt(2))
      const val = (sC * p + sS * Math.sqrt(r)) / (q * Math.sqrt(2));
      const outerSign = val >= 0 ? '' : '-';
      const oppOuterSign = val >= 0 ? '-' : '';
      const sProd = sC * sS;
      const innerSign = sProd >= 0 ? '+' : '-';
      const oppInnerSign = sProd >= 0 ? '-' : '+';
      const innerFrac = fmtRadFrac(p, r, q * q);

      const correct = '$' + outerSign + '\\sqrt{\\frac{1}{2} ' + innerSign + ' ' + innerFrac + '}$';
      const wOpp = '$' + oppOuterSign + '\\sqrt{\\frac{1}{2} ' + innerSign + ' ' + innerFrac + '}$';
      const wInner = '$' + outerSign + '\\sqrt{\\frac{1}{2} ' + oppInnerSign + ' ' + innerFrac + '}$';
      const radOnly = fmtRadFrac(1, r, 1);
      const wNoSqrt2 = '$\\frac{' + (sS === 1 ? radOnly + (sC === 1 ? ' + ' : ' - ') + p : '-' + radOnly + (sC === 1 ? ' + ' : ' - ') + p) + '}{' + q + '}$';
      const wWrongSum = '$-\\frac{' + radOnly + ' + ' + p + '}{' + q + '}$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [wOpp, wNoSqrt2, wWrongSum, wInner],
        rng,
        (step) => '$' + outerSign + '\\sqrt{\\frac{1}{' + (step + 2) + '} ' + innerSign + ' ' + innerFrac + '}$'
      );
      return {
        stem: 'Cho $\\sin \\beta = ' + sinBeta.latex + '$ với $0 < \\beta < \\frac{\\pi}{2}$. Giá trị của $\\sin\\left(\\beta + ' + angleAdd + '\\right)$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Do $0 < \\beta < \\frac{\\pi}{2}$ nên $\\cos \\beta > 0$, suy ra $\\cos \\beta = \\sqrt{1 - \\sin^2 \\beta} = \\sqrt{1 - \\left(' + sinBeta.latex + '\\right)^2} = ' + cosBeta + '$.',
          'Áp dụng công thức cộng: $\\sin\\left(\\beta + ' + angleAdd + '\\right) = \\sin\\beta\\cos ' + angleAdd + ' + \\cos\\beta\\sin ' + angleAdd + '$.',
          'Thay $\\sin ' + angleAdd + ' = ' + sinAdd + '$, $\\cos ' + angleAdd + ' = ' + cosAdd + '$ rồi biến đổi đưa về dạng căn thức thu gọn ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 3-4-5 chính phương', params: { p: 3, q: 5, kIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (sin β = 2/3, cộng 3π/4)', params: { p: 2, q: 3, kIdx: 1 }, expectedValid: true },
    ],
  },
};
