import { MathTemplate } from '../types/math';

export const G11_B17_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D16 (Q16): Phép chiếu song song trong hình lăng trụ ABC.A'B'C' với trung điểm và trọng tâm
  t11_b17_d16_prism_proj_tf: {
    id: 't11_b17_d16_prism_proj_tf',
    name: 'Phép chiếu song song đỉnh, đoạn thẳng và đẳng thức trọng tâm trong lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Cho hình lăng trụ ABC.A\'B\'C\', trung điểm Q, N và trọng tâm I của ΔA\'BC. Xét 4 khẳng định Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'", Q: 'Q', N: 'N', I: 'I', Ip: "I'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'D', Bp: 'E', Cp: 'F', Q: 'G', N: 'M', I: 'I', Ip: "I'" },
        { A: 'M', B: 'N', C: 'P', Ap: "M'", Bp: "N'", Cp: "P'", Q: 'E', N: 'F', I: 'G', Ip: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const latAC = s.A + s.C + s.Cp + s.Ap;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.Ap + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.Cp + s.C + '$ là điểm $' + (aIs ? s.A : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.Q + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.Ap + '$ là ' + (bIs ? 'một trung tuyến của tam giác $' + base + '$' : 'cạnh $' + s.B + s.C + '$ của tam giác $' + base + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.N + '$ lên mặt phẳng $(' + latAC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + (cIs ? s.A + s.C : s.Ap + s.Cp) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Ip + '$ là hình chiếu song song của $' + s.I + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.Bp + '$. Khi đó: $\\overrightarrow{' + s.I + s.A + '} + \\overrightarrow{' + s.I + s.B + '} + \\overrightarrow{' + s.I + s.C + '} = ' + (dIs ? '3' : '2') + '\\overrightarrow{' + s.I + s.Ip + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + s.Ap + s.Bp + s.Cp + '$. Gọi $' + s.Q + ', ' + s.N + '$ lần lượt là trung điểm của $' + s.Ap + s.Cp + ', ' + s.B + s.C + '$. Gọi $' + s.I + '$ là trọng tâm của tam giác $' + s.Ap + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.Ap + s.A + ' \\parallel ' + s.Cp + s.C + '$ nên hình chiếu của $' + s.Ap + '$ lên $(' + base + ')$ là $' + s.A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu theo phương $' + s.A + s.Ap + '$ lên $(' + base + ')$ đưa $' + s.Q + '$ về trung điểm của $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.Q + '$ là trung tuyến từ $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Đường thẳng qua $' + s.N + '$ (trung điểm $' + s.B + s.C + '$) song song với $' + s.B + s.A + '$ cắt $' + s.A + s.C + '$ tại trung điểm của $' + s.A + s.C + '$, không nằm trên $' + s.Ap + s.Cp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Phép chiếu song song theo phương $' + s.B + s.Bp + '$ đưa $' + s.I + '$ (trọng tâm $\\Delta ' + s.Ap + s.B + s.C + '$) thành trọng tâm $' + s.Ip + '$ của $\\Delta ' + base + '$, suy ra $\\overrightarrow{' + s.I + s.A + '} + \\overrightarrow{' + s.I + s.B + '} + \\overrightarrow{' + s.I + s.C + '} = 3\\overrightarrow{' + s.I + s.Ip + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (Đ Đ S Đ)', params: { setIdx: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Xét giới hạn và tính liên tục tại x0 của hàm 2 công thức (bậc 2 / bậc 1)
  t11_b17_d17_piecewise_discontinuous_tf: {
    id: 't11_b17_d17_piecewise_discontinuous_tf',
    name: 'Xét giới hạn một bên và tính liên tục tại điểm rẽ nhánh (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm số liên tục',
    description: 'Cho hàm f(x) gồm nhánh bậc 2 khi x < x0 và bậc nhất khi x ≥ x0. Xét giới hạn tại nhánh và tính liên tục tại x0.',
    conditionSummary: 'x0 ∈ [1; 5], a1 ∈ [1; 4], b1 ∈ [-12; -3], c1 ∈ [1; 15], a2 ∈ [-6; -2], b2 ∈ [-9; 5], L+ ≠ L-, flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm rẽ nhánh x0', min: 1, max: 5 },
      { name: 'a1', label: 'Hệ số x^2 nhánh x < x0', min: 1, max: 4 },
      { name: 'b1', label: 'Hệ số x nhánh x < x0', min: -12, max: -3 },
      { name: 'c1', label: 'Hằng số nhánh x < x0', min: 1, max: 15 },
      { name: 'a2', label: 'Hệ số x nhánh x ≥ x0', min: -6, max: -2 },
      { name: 'b2', label: 'Hằng số nhánh x ≥ x0', min: -9, max: 5 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x0, a1, a2, b1, c1, b2, aTrue, bTrue, cTrue, dTrue } = params;
      if (x0 < 1 || a1 < 1 || a2 >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const lm = a1 * x0 * x0 + b1 * x0 + c1;
      const lp = a2 * x0 + b2;
      if (lm === lp) return { valid: false, reason: 'Cần giới hạn hai bên khác nhau tại x0' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a1, b1, c1, a2, b2, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const polyBot = u.formatQuadratic(a1, b1, c1);
      const linTop = u.formatLinear(a2, b2);

      const p = x0 + 5;
      const q = x0 - 1;
      const valP = a2 * p + b2;
      const valQ = a1 * q * q + b1 * q + c1;
      const lp = a2 * x0 + b2;
      const lm = a1 * x0 * x0 + b1 * x0 + c1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + p + '} f(x) = ' + (aIs ? valP : valP + 4) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + q + '} f(x) = ' + (bIs ? valQ : lp + 5) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + (cIs ? lp : lm) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: dIs
            ? 'Hàm số không liên tục tại $x = ' + x0 + '$'
            : 'Hàm số liên tục tại $x = ' + x0 + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + polyBot + ' & \\text{khi } x < ' + x0 + ' \\\\ ' + linTop + ' & \\text{khi } x \\ge ' + x0 + ' \\end{cases}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + p + ' > ' + x0 + '$ nên $\\lim \\limits_{x \\to ' + p + '} f(x) = ' + valP + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + q + ' < ' + x0 + '$ nên $\\lim \\limits_{x \\to ' + q + '} f(x) = ' + valQ + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + lp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Do $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + lp + ' \\ne ' + lm + ' = \\lim \\limits_{x \\to ' + x0 + '^-} f(x)$ nên hàm số không liên tục tại $x = ' + x0 + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a2 dương', params: { x0: 3, a1: 4, b1: -12, c1: 13, a2: 2, b2: -8, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (x0=3 -> Đ S Đ S)', params: { x0: 3, a1: 4, b1: -12, c1: 13, a2: -5, b2: -8, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Hàm phân thức 0/0 rẽ nhánh tìm tham số m để liên tục trên R
  t11_b17_d18_piecewise_00_linear_at_x0_tf: {
    id: 't11_b17_d18_piecewise_00_linear_at_x0_tf',
    name: 'Tập xác định, giới hạn 0/0 và điều kiện liên tục trên R của hàm hai công thức (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Cho f(x) = a(x-x0)(x-r)/(b(x-x0)) khi x ≠ x0 và kmx + d khi x = x0. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'x0 ∈ [2; 6], r ∈ [-4; 1], t ∈ [1; 3], b ∈ [2; 4], k ∈ [-4; -2], d ∈ [-5; -1], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm rẽ nhánh x0', min: 2, max: 6 },
      { name: 'r', label: 'Nghiệm thứ hai của tử', min: -4, max: 1 },
      { name: 't', label: 'Thương số a/b', min: 1, max: 3 },
      { name: 'b', label: 'Hệ số x ở mẫu', min: 2, max: 4 },
      { name: 'k', label: 'Hệ số m·x ở nhánh x = x0', min: -4, max: -2 },
      { name: 'd', label: 'Hằng số nhánh x = x0', min: -5, max: -1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x0, r, t, b, k, d, aTrue, bTrue, cTrue, dTrue } = params;
      if (x0 < 2 || r >= x0 || t < 1 || b < 2 || k >= 0 || d >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const limVal = t * (x0 - r);
      if (limVal === d) return { valid: false, reason: 'Tránh m = 0' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r, t, b, k, d, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const a = t * b;
      const numPoly = u.formatQuadratic(a, -a * (x0 + r), a * x0 * r);
      const denPoly = u.formatLinear(b, -b * x0);
      const branch2 = k + 'mx ' + u.formatTrailingConst(d);

      const limL = t * (x0 - r);
      const fx0True = u.formatLinear(k * x0, d, 'm');
      const fx0Wrong = u.formatLinear(k * x0 + 2, -d, 'm');
      const mTrue = u.simplifyFrac(limL - d, k * x0);
      const mWrong = u.simplifyFrac(limL + 39, Math.abs(k * x0));

      const tfStatements = [
        {
          key: 'a',
          text: aIs
            ? 'Tập xác định của hàm số là $\\mathbb{R}$'
            : 'Tập xác định của hàm số là $\\mathbb{R} \\setminus \\{' + x0 + '\\}$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim \\limits_{x \\to ' + x0 + '} f(x) = ' + (bIs ? limL : limL + 3) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$f(' + x0 + ') = ' + (cIs ? fx0True : fx0Wrong) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số liên tục trên $\\mathbb{R}$ khi $m = ' + (dIs ? mTrue.latex : mWrong.latex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} \\dfrac{' + numPoly + '}{' + denPoly + '} & \\text{khi } x \\ne ' + x0 + ' \\\\ ' + branch2 + ' & \\text{khi } x = ' + x0 + ' \\end{cases}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Hàm số xác định với mọi $x \\in \\mathbb{R}$, nên tập xác định là $\\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\lim \\limits_{x \\to ' + x0 + '} f(x) = \\lim \\limits_{x \\to ' + x0 + '} ' + u.formatLinear(t, -t * r) + ' = ' + limL + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Tại $x = ' + x0 + '$, ta có $f(' + x0 + ') = ' + fx0True + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Hàm số liên tục trên $\\mathbb{R} \\Leftrightarrow ' + fx0True + ' = ' + limL + ' \\Leftrightarrow m = ' + mTrue.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a/b = 0', params: { x0: 4, r: -2, t: 0, b: 3, k: -3, d: -1, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (x0=4 -> S Đ Đ S)', params: { x0: 4, r: -2, t: 2, b: 3, k: -3, d: -1, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Hàm 2 công thức bậc 3 (x ≥ x0) và bậc 2 chứa m (x < x0) — kiểu 1 (lim x->p và lim x->x0-)
  t11_b17_d19_piecewise_cubic_param_tf_v1: {
    id: 't11_b17_d19_piecewise_cubic_param_tf_v1',
    name: 'Tính liên tục tại x0 của hàm bậc ba và hàm bậc hai chứa tham số m (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Cho f(x) = a x^3 + b x^2 + c x khi x ≥ x0 và (k m + p) x^2 + x khi x < x0. Xét f(x0), giới hạn nhánh phải, giới hạn trái và giá trị m liên tục tại x0.',
    conditionSummary: 'x0 ∈ [2; 6], a ∈ [2; 5], b ∈ [-4; -1], c ∈ [-6; -1], k ∈ [-5; -2], p ∈ [-4; 4]\\{0}, flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm rẽ nhánh x0', min: 2, max: 6 },
      { name: 'a', label: 'Hệ số x^3 nhánh trên', min: 2, max: 5 },
      { name: 'b', label: 'Hệ số x^2 nhánh trên', min: -4, max: -1 },
      { name: 'c', label: 'Hệ số x nhánh trên', min: -6, max: -1 },
      { name: 'k', label: 'Hệ số của m trong (km+p)x^2', min: -5, max: -2 },
      { name: 'p', label: 'Hằng số p trong (km+p)', min: -4, max: 4, allowZero: false },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x0, a, b, c, k, p, aTrue, bTrue, cTrue, dTrue } = params;
      if (x0 < 2 || a < 2 || b >= 0 || c >= 0 || k >= 0 || p === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const fx0 = a * x0 * x0 * x0 + b * x0 * x0 + c * x0;
      const cstLeft = p * x0 * x0 + x0;
      if (fx0 === cstLeft) return { valid: false, reason: 'Tránh m = 0' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, b, c, k, p, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const polyTop = u.formatPoly([a, b, c, 0]);
      const coeffM = u.formatLinear(k, p, 'm');
      const polyBot = '(' + coeffM + ')x^{2} + x';

      const fx0 = a * x0 * x0 * x0 + b * x0 * x0 + c * x0;
      const xRight = x0 + 3;
      const limRight = a * xRight * xRight * xRight + b * xRight * xRight + c * xRight;
      const mCoeffLeft = k * x0 * x0;
      const constLeft = p * x0 * x0 + x0;
      const leftExpr = u.formatLinear(mCoeffLeft, constLeft, 'm');
      const leftExprWrong = u.formatLinear(mCoeffLeft, constLeft + 8, 'm');

      const mTrue = u.simplifyFrac(fx0 - constLeft, mCoeffLeft);
      const mWrong = u.simplifyFrac(fx0 - constLeft + 4 * Math.abs(k), mCoeffLeft);

      const tfStatements = [
        {
          key: 'a',
          text: '$f(' + x0 + ') = ' + (aIs ? fx0 : fx0 + 2) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim \\limits_{x \\to ' + xRight + '} f(x) = ' + (bIs ? limRight : limRight + 2) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim \\limits_{x \\to ' + x0 + '^-} f(x) = ' + (cIs ? leftExpr : leftExprWrong) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số $f(x)$ liên tục tại $x = ' + x0 + '$ khi $m = ' + (dIs ? mTrue.latex : mWrong.latex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + polyTop + ' & \\text{khi } x \\ge ' + x0 + ' \\\\ ' + polyBot + ' & \\text{khi } x < ' + x0 + ' \\end{cases}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Thay $x = ' + x0 + '$ vào nhánh $x \\ge ' + x0 + '$ được $f(' + x0 + ') = ' + fx0 + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + xRight + ' > ' + x0 + '$ nên $\\lim \\limits_{x \\to ' + xRight + '} f(x) = ' + limRight + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\lim \\limits_{x \\to ' + x0 + '^-} f(x) = ' + leftExpr + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Hàm số liên tục tại $x = ' + x0 + ' \\Leftrightarrow ' + leftExpr + ' = ' + fx0 + ' \\Leftrightarrow m = ' + mTrue.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 1', params: { x0: 1, a: 4, b: -3, c: -5, k: -4, p: -3, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (x0=6 -> S S Đ S)', params: { x0: 6, a: 4, b: -3, c: -5, k: -4, p: -3, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Hàm 2 công thức bậc 3 (x ≥ x0) và bậc 2 chứa m (x < x0) — kiểu 2 (lim tại điểm nhánh trái và liên tục trên R)
  t11_b17_d20_piecewise_cubic_param_tf_v2: {
    id: 't11_b17_d20_piecewise_cubic_param_tf_v2',
    name: 'Tính liên tục trên R của hàm bậc ba và hàm bậc hai chứa tham số m (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Cho f(x) = ax^3 + bx^2 + d1 khi x ≥ x0 và (p + km)x^2 + d2 khi x < x0. Xét f(x0), giới hạn tại điểm < x0, giới hạn phải tại x0 và liên tục ∀x ∈ R.',
    conditionSummary: 'x0 ∈ [2; 5], a ∈ [2; 4], b ∈ [-6; -2], d1 ∈ [1; 6], k ∈ [-6; -2], p ∈ [1; 5], d2 ∈ [-5; -1], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm rẽ nhánh x0', min: 2, max: 5 },
      { name: 'a', label: 'Hệ số x^3 nhánh trên', min: 2, max: 4 },
      { name: 'b', label: 'Hệ số x^2 nhánh trên', min: -6, max: -2 },
      { name: 'd1', label: 'Hằng số nhánh trên', min: 1, max: 6 },
      { name: 'k', label: 'Hệ số m trong (p+km)x^2', min: -6, max: -2 },
      { name: 'p', label: 'Hằng số p trong (p+km)', min: 1, max: 5 },
      { name: 'd2', label: 'Hằng số nhánh dưới', min: -5, max: -1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x0, a, b, d1, k, p, d2, aTrue, bTrue, cTrue, dTrue } = params;
      if (x0 < 2 || a < 2 || b >= 0 || d1 < 1 || k >= 0 || p < 1 || d2 >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const fx0 = a * x0 * x0 * x0 + b * x0 * x0 + d1;
      const constLeft = p * x0 * x0 + d2;
      if (fx0 === constLeft) return { valid: false, reason: 'Tránh m = 0' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, b, d1, k, p, d2, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const polyTop = u.formatPoly([a, b, 0, d1]);
      const coeffM = p + ' - ' + Math.abs(k) + 'm';
      const polyBot = '(' + coeffM + ')x^{2} ' + u.formatTrailingConst(d2);

      const fx0 = a * x0 * x0 * x0 + b * x0 * x0 + d1;
      const xLeft = -2; // luôn nhỏ hơn x0 >= 2
      const valAtLeft = u.formatLinear(k * xLeft * xLeft, p * xLeft * xLeft + d2, 'm');
      const valAtLeftWrong = u.formatLinear(k * xLeft * xLeft, p * xLeft * xLeft + d2 + 3, 'm');

      const limLeftAtX0 = u.formatLinear(k * x0 * x0, p * x0 * x0 + d2, 'm');
      const mTrue = u.simplifyFrac(fx0 - (p * x0 * x0 + d2), k * x0 * x0);
      const mWrong = u.simplifyFrac(Math.abs(k), 3);

      const tfStatements = [
        {
          key: 'a',
          text: '$f(' + x0 + ') = ' + (aIs ? fx0 : fx0 + 5) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim \\limits_{x \\to ' + xLeft + '} f(x) = ' + (bIs ? valAtLeft : valAtLeftWrong) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + (cIs ? fx0 : limLeftAtX0) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số $f(x)$ liên tục với mọi $x \\in \\mathbb{R}$ khi $m = ' + (dIs ? mTrue.latex : mWrong.latex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + polyTop + ' & \\text{khi } x \\ge ' + x0 + ' \\\\ ' + polyBot + ' & \\text{khi } x < ' + x0 + ' \\end{cases}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Thay $x = ' + x0 + '$ vào nhánh $x \\ge ' + x0 + '$ được $f(' + x0 + ') = ' + fx0 + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + xLeft + ' < ' + x0 + '$ nên $\\lim \\limits_{x \\to ' + xLeft + '} f(x) = ' + valAtLeft + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + fx0 + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Hàm số liên tục với mọi $x \\in \\mathbb{R} \\Leftrightarrow \\lim \\limits_{x \\to ' + x0 + '^-} f(x) = f(' + x0 + ') \\Leftrightarrow ' + limLeftAtX0 + ' = ' + fx0 + ' \\Leftrightarrow m = ' + mTrue.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { x0: 3, a: 1, b: -5, d1: 4, k: -5, p: 3, d2: -2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (x0=3 -> Đ S S S)', params: { x0: 3, a: 3, b: -5, d1: 4, k: -5, p: 3, d2: -2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
