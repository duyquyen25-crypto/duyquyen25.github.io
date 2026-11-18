import { MathTemplate } from '../types/math';

export const G11_B18_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D14 (Q14): Phép chiếu song song trong hình lăng trụ ABC.A'B'C' với trung điểm H, P và trọng tâm G
  t11_b18_d14_prism_proj_tf: {
    id: 't11_b18_d14_prism_proj_tf',
    name: 'Phép chiếu song song điểm, đường thẳng và trọng tâm trong lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Cho hình lăng trụ ABC.A\'B\'C\', trung điểm H, P và trọng tâm G của ΔA\'BC. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'", H: 'H', P: 'P', G: 'G', Gp: "G'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'D', Bp: 'E', Cp: 'F', H: 'I', P: 'M', G: 'G', Gp: "G'" },
        { A: 'M', B: 'N', C: 'P', Ap: 'M_1', Bp: 'N_1', Cp: 'P_1', H: 'E', P: 'F', G: 'G', Gp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const latBC = s.B + s.C + s.Cp + s.Bp;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.Cp + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.Bp + '$ là điểm $' + (aIs ? s.C : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đường thẳng $' + s.A + s.H + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.Ap + '$ là đường thẳng $' + (bIs ? s.A + s.C : s.H + s.C) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.H + '$ lên mặt phẳng $(' + latBC + ')$ theo phương $' + s.Bp + s.Ap + '$ là trung điểm của $' + (cIs ? s.Bp + s.Cp : s.A + s.C) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Gp + '$ là hình chiếu song song của $' + s.G + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.Ap + '$. Khi đó: $\\overrightarrow{' + s.G + s.A + '} + \\overrightarrow{' + s.G + s.B + '} + \\overrightarrow{' + s.G + s.C + '} = ' + (dIs ? '3' : '2') + '\\overrightarrow{' + s.G + s.Gp + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + s.Ap + s.Bp + s.Cp + '$. Gọi $' + s.H + ', ' + s.P + '$ lần lượt là trung điểm của $' + s.Ap + s.Cp + ', ' + s.B + s.C + '$. Gọi $' + s.G + '$ là trọng tâm của tam giác $' + s.Ap + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.Cp + s.C + ' \\parallel ' + s.B + s.Bp + '$ nên hình chiếu của $' + s.Cp + '$ lên $(' + base + ')$ là $' + s.C + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.H + '$ theo phương $' + s.A + s.Ap + '$ lên $(' + base + ')$ cho trung điểm $' + s.A + s.C + '$, nên hình chiếu của $' + s.A + s.H + '$ là đường thẳng $' + s.A + s.C + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Đường thẳng qua $' + s.H + '$ (trung điểm $' + s.Ap + s.Cp + '$) song song với $' + s.Bp + s.Ap + '$ cắt $' + s.Bp + s.Cp + '$ tại trung điểm của $' + s.Bp + s.Cp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Gp + '$ là trọng tâm tam giác $' + base + '$ nên $\\overrightarrow{' + s.G + s.A + '} + \\overrightarrow{' + s.G + s.B + '} + \\overrightarrow{' + s.G + s.C + '} = 3\\overrightarrow{' + s.G + s.Gp + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (S S Đ S)', params: { setIdx: 0, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Tính chất lũy thừa và căn bậc n của một số thực dương a
  t11_b18_d15_exp_rules_single_var_tf: {
    id: 't11_b18_d15_exp_rules_single_var_tf',
    name: 'Xét tính đúng sai các phép biến đổi luỹ thừa và căn thức một biến dương (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Kiểm tra các quy tắc chia, nhân, luỹ thừa tầng và đổi căn sang số mũ hữu tỉ với cơ số a > 0.',
    conditionSummary: 'm1 ∈ [3; 9], n1 = m1 + 1, k1 ∈ [4; 8], k2 ∈ [2; k1-1], gcd(k1,k2)=1, flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến (0: a, 1: b, 2: x)', min: 0, max: 2 },
      { name: 'm1', label: 'Số mũ tử ý (a)', min: 3, max: 9 },
      { name: 'k1', label: 'Bậc căn ý (b)', min: 4, max: 9 },
      { name: 'k2', label: 'Số mũ trong căn ý (b)', min: 2, max: 7 },
      { name: 'p', label: 'Số mũ 1 ý (c)', min: 2, max: 7 },
      { name: 'q', label: 'Số mũ 2 ý (c)', min: 3, max: 9 },
      { name: 'r', label: 'Số mũ trong ngoặc ý (d)', min: 2, max: 6 },
      { name: 's', label: 'Số mũ ngoài ngoặc ý (d)', min: 5, max: 12 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { vIdx, m1, k1, k2, p, q, r, s, aTrue, bTrue, cTrue, dTrue } = params;
      if (vIdx < 0 || vIdx > 2 || m1 < 3 || k1 < 4 || k2 < 2 || k2 >= k1) return { valid: false, reason: 'Tham số ngoài miền' };
      if (p + q === p * q || r + s === r * s) return { valid: false, reason: 'Tránh tổng bằng tích' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, m1, k1, k2, p, q, r, s, aTrue, bTrue, cTrue, dTrue } = params;
      const v = ['a', 'b', 'x'][vIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const n1 = m1 + 1;

      const fracRight = u.simplifyFrac(k2, k1);
      const fracWrong = u.simplifyFrac(k1, k2);

      const tfStatements = [
        {
          key: 'a',
          text: '$\\dfrac{' + v + '^{' + m1 + '}}{' + v + '^{' + n1 + '}} = ' + v + '^{' + (aIs ? -1 : 1) + '}$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\sqrt[' + k1 + ']{' + v + '^{' + k2 + '}} = ' + v + '^{' + (bIs ? fracRight.latex : fracWrong.latex) + '}$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$' + v + '^{' + p + '} \\cdot ' + v + '^{' + q + '} = ' + v + '^{' + (cIs ? p + q : p * q) + '}$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$(' + v + '^{' + r + '})^{' + s + '} = ' + v + '^{' + (dIs ? r * s : r + s) + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho $' + v + '$ là số thực dương tùy ý. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $\\frac{' + v + '^{' + m1 + '}}{' + v + '^{' + n1 + '}} = ' + v + '^{' + m1 + ' - ' + n1 + '} = ' + v + '^{-1}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\sqrt[' + k1 + ']{' + v + '^{' + k2 + '}} = ' + v + '^{' + fracRight.latex + '}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + v + '^{' + p + '} \\cdot ' + v + '^{' + q + '} = ' + v + '^{' + (p + q) + '}$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $(' + v + '^{' + r + '})^{' + s + '} = ' + v + '^{' + (r * s) + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k2 >= k1', params: { vIdx: 0, m1: 6, k1: 4, k2: 4, p: 4, q: 7, r: 5, s: 11, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (Đ S Đ Đ)', params: { vIdx: 0, m1: 6, k1: 6, k2: 4, p: 4, q: 7, r: 5, s: 11, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Tính chất căn bậc n của hai số thực dương a, b
  t11_b18_d16_root_rules_two_vars_tf: {
    id: 't11_b18_d16_root_rules_two_vars_tf',
    name: 'Xét tính đúng sai các phép toán căn bậc n với hai số thực dương a, b (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Kiểm tra công thức tích căn bậc n, căn lồng căn, luỹ thừa trong căn và thương căn bậc n với a, b > 0.',
    conditionSummary: 'n1, r ∈ [3; 9], m, n ∈ [3; 8], q ∈ [4; 10], p ∈ [2; q-1], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'n1', label: 'Bậc căn tích ý (a)', min: 3, max: 9 },
      { name: 'm', label: 'Bậc căn ngoài ý (b)', min: 3, max: 8 },
      { name: 'n', label: 'Bậc căn trong ý (b)', min: 3, max: 8 },
      { name: 'q', label: 'Bậc căn ý (c)', min: 4, max: 10 },
      { name: 'p', label: 'Số mũ trong căn ý (c)', min: 2, max: 8 },
      { name: 'r', label: 'Bậc căn thương ý (d)', min: 3, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { n1, m, n, q, p, r, aTrue, bTrue, cTrue, dTrue } = params;
      if (n1 < 3 || m < 3 || n < 3 || q < 4 || p < 2 || p >= q || r < 3) return { valid: false, reason: 'Tham số ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, m, n, q, p, r, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\sqrt[' + n1 + ']{a} \\cdot \\sqrt[' + n1 + ']{b} = \\sqrt[' + n1 + ']{' + (aIs ? 'ab' : 'a + b') + '}$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\sqrt[' + m + ']{\\sqrt[' + n + ']{a}} = \\sqrt[' + (bIs ? m * n : m + n) + ']{a}$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\sqrt[' + q + ']{a^{' + p + '}} = a^{' + (cIs ? '\\frac{' + p + '}{' + q + '}' : '\\frac{' + q + '}{' + p + '}') + '}$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$\\dfrac{\\sqrt[' + r + ']{a}}{\\sqrt[' + r + ']{b}} = \\sqrt[' + r + ']{' + (dIs ? '\\frac{a}{b}' : 'a - b') + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho $a, b$ là các số thực dương tùy ý. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $\\sqrt[' + n1 + ']{a} \\cdot \\sqrt[' + n1 + ']{b} = \\sqrt[' + n1 + ']{ab}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\sqrt[' + m + ']{\\sqrt[' + n + ']{a}} = \\sqrt[' + (m * n) + ']{a}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\sqrt[' + q + ']{a^{' + p + '}} = a^{\\frac{' + p + '}{' + q + '}}$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $\\dfrac{\\sqrt[' + r + ']{a}}{\\sqrt[' + r + ']{b}} = \\sqrt[' + r + ']{\\dfrac{a}{b}}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p >= q', params: { n1: 7, m: 6, n: 7, q: 9, p: 9, r: 5, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (S Đ S Đ)', params: { n1: 7, m: 6, n: 7, q: 9, p: 3, r: 5, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },
};
