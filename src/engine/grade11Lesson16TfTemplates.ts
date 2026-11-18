import { MathTemplate } from '../types/math';

export const G11_B16_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D17 (Q17): Phép chiếu song song trong hình lăng trụ ABC.DEF với trung điểm và trọng tâm
  t11_b16_d17_prism_proj_tf: {
    id: 't11_b16_d17_prism_proj_tf',
    name: 'Phép chiếu song song điểm, đường thẳng và trọng tâm trong lăng trụ ABC.DEF (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của hàm số',
    description: 'Cho hình lăng trụ ABC.DEF với trung điểm G, M và trọng tâm Q. Xét 4 mệnh đề Đúng/Sai về hình chiếu song song.',
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
        { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', M: 'M', Q: 'Q', Qp: "Q'" },
        { A: 'A', B: 'B', C: 'C', D: "A'", E: "B'", F: "C'", G: 'I', M: 'K', Q: 'G', Qp: "G'" },
        { A: 'M', B: 'N', C: 'P', D: 'M_1', E: 'N_1', F: 'P_1', G: 'I', M: 'E', Q: 'G', Qp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const faceACFD = s.A + s.C + s.F + s.D;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.E + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.F + s.C + '$ là điểm $' + (aIs ? s.B : s.A) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đường thẳng $' + s.A + s.G + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.D + '$ là đường thẳng $' + (bIs ? s.A + s.C : s.G + s.C) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.M + '$ lên mặt phẳng $(' + faceACFD + ')$ theo phương $' + s.E + s.D + '$ là trung điểm của $' + (cIs ? s.A + s.C : s.D + s.F) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Qp + '$ là hình chiếu song song của $' + s.Q + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.C + s.F + '$. Khi đó: $\\overrightarrow{' + s.D + s.A + '} + 2\\overrightarrow{' + s.D + s.M + '} = ' + (dIs ? '3' : '5') + '\\overrightarrow{' + s.D + s.Qp + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + s.D + s.E + s.F + '$. Gọi $' + s.G + ', ' + s.M + '$ lần lượt là trung điểm của $' + s.D + s.F + ', ' + s.B + s.C + '$. Gọi $' + s.Q + '$ là trọng tâm của tam giác $' + s.D + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.D, tF: s.E, tR: s.F },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.E + s.B + ' \\parallel ' + s.F + s.C + '$ nên hình chiếu của $' + s.E + '$ lên $(' + base + ')$ theo phương $' + s.F + s.C + '$ là $' + s.B + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu theo phương $' + s.A + s.D + '$ đưa $' + s.G + '$ (trung điểm $' + s.D + s.F + '$) về trung điểm của $' + s.A + s.C + '$, nên hình chiếu của $' + s.A + s.G + '$ là đường thẳng $' + s.A + s.C + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.B + s.A + ' \\parallel ' + s.E + s.D + '$ và $' + s.M + '$ là trung điểm $' + s.B + s.C + '$ nên đường thẳng qua $' + s.M + '$ song song $' + s.B + s.A + '$ cắt $' + s.A + s.C + '$ tại trung điểm $' + s.A + s.C + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Khi chiếu $' + s.Q + '$ (trọng tâm $\\Delta ' + s.D + s.B + s.C + '$) lên $(' + base + ')$ theo phương cạnh bên $' + s.C + s.F + '$, ta được trọng tâm $' + s.Qp + '$ của $\\Delta ' + base + '$. Khi đó $\\overrightarrow{' + s.D + s.A + '} + 2\\overrightarrow{' + s.D + s.M + '} = \\overrightarrow{' + s.D + s.A + '} + \\overrightarrow{' + s.D + s.B + '} + \\overrightarrow{' + s.D + s.C + '} = 3\\overrightarrow{' + s.D + s.Qp + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (Đ S Đ S)', params: { setIdx: 0, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Giới hạn một bên và giới hạn hàm số rẽ nhánh (bậc 1 / bậc 2 - không liên tục)
  t11_b16_d18_piecewise_lin_quad_tf: {
    id: 't11_b16_d18_piecewise_lin_quad_tf',
    name: 'Giới hạn một bên của hàm số cho bởi hai công thức bậc nhất và bậc hai (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Xét giới hạn tại các điểm thuộc hai nhánh và giới hạn một bên / hai bên tại điểm rẽ nhánh.',
    conditionSummary: 'x0 ∈ [-2; 2], a ∈ [-9; -2], b ∈ [1; 8], c ∈ [1; 6], d ∈ [1; 9], L+ ≠ L-, flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm rẽ nhánh x0', min: -2, max: 2 },
      { name: 'a', label: 'Hệ số x nhánh trên', min: -9, max: -2 },
      { name: 'b', label: 'Hằng số nhánh trên', min: 1, max: 8 },
      { name: 'c', label: 'Hệ số x nhánh dưới (x^2 + cx + d)', min: 1, max: 6 },
      { name: 'd', label: 'Hằng số nhánh dưới', min: 1, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x0, a, b, c, d, aTrue, bTrue, cTrue, dTrue } = params;
      if (a >= 0 || b < 1 || c < 1 || d < 1) return { valid: false, reason: 'Tham số ngoài miền' };
      const lp = a * x0 + b;
      const lm = x0 * x0 + c * x0 + d;
      if (lp === lm) return { valid: false, reason: 'Cần hai giới hạn một bên khác nhau' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, b, c, d, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const branchTop = u.formatLinear(a, b);
      const branchBot = u.formatQuadratic(1, c, d);

      const p = x0 + 1;
      const q = x0 - 3;
      const valP = a * p + b;
      const valQ = q * q + c * q + d;
      const lp = a * x0 + b;
      const lm = x0 * x0 + c * x0 + d;

      const tfStatements = [
        {
          key: 'a',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + p + '} f(x) = ' + (aIs ? valP : valP + 3) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + q + '} f(x) = ' + (bIs ? valQ : valQ + 4) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + (cIs ? lp : lm + 2) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: dIs
            ? 'Hàm số không tồn tại giới hạn tại $x = ' + x0 + '$'
            : 'Giới hạn $\\lim \\limits_{x \\to ' + x0 + '} f(x) = ' + lp + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + branchTop + ' & \\text{khi } x \\ge ' + x0 + ' \\\\ ' + branchBot + ' & \\text{khi } x < ' + x0 + ' \\end{cases}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + p + ' > ' + x0 + '$ nên $\\lim \\limits_{x \\to ' + p + '} f(x) = ' + valP + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + q + ' < ' + x0 + '$ nên $\\lim \\limits_{x \\to ' + q + '} f(x) = ' + valQ + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Với $x \\to ' + x0 + '^+$ ta dùng biểu thức khi $x \\ge ' + x0 + '$: $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + lp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Ta có $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + lp + ' \\ne ' + lm + ' = \\lim \\limits_{x \\to ' + x0 + '^-} f(x)$, nên hàm số không tồn tại giới hạn tại $x = ' + x0 + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a dương (ngoài miền)', params: { x0: -1, a: 2, b: 5, c: 4, d: 8, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (x0=-1, 5-9x và x^2+4x+8)', params: { x0: -1, a: -9, b: 5, c: 4, d: 8, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Giới hạn hàm số hai công thức căn thức và bậc nhất (tồn tại giới hạn)
  t11_b16_d19_piecewise_sqrt_lin_tf: {
    id: 't11_b16_d19_piecewise_sqrt_lin_tf',
    name: 'Giới hạn hàm số cho bởi hai công thức chứa căn và bậc nhất (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Hàm số cho bởi căn thức √(x^2 + C) khi x < x0 và kx + b khi x ≥ x0 có giới hạn hai bên trùng nhau tại x0.',
    conditionSummary: 'x0 ∈ [2; 6], m ∈ [3; 7], k ∈ [1; 4], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm rẽ nhánh x0', min: 2, max: 6 },
      { name: 'm', label: 'Độ lệch L - x0', min: 3, max: 7 },
      { name: 'k', label: 'Hệ số góc nhánh x ≥ x0', min: 1, max: 4 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x0, m, k, aTrue, bTrue, cTrue, dTrue } = params;
      if (x0 < 2 || x0 > 6 || m < 3 || m > 7 || k < 1 || k > 4) return { valid: false, reason: 'Tham số ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, m, k, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const L = x0 + m;
      const C = L * L - x0 * x0;
      const bLin = L - k * x0;
      const p = 2 * x0;
      const q = x0 - 1;
      const valP = k * p + bLin;

      const radVal = q * q + C;
      let s = 1;
      for (let i = Math.floor(Math.sqrt(radVal)); i >= 2; i--) {
        if (radVal % (i * i) === 0) { s = i; break; }
      }
      const rem = radVal / (s * s);
      const valQTex = rem === 1 ? String(s) : (s === 1 ? '' : s) + '\\sqrt{' + rem + '}';
      const wrongQ = L - 2;

      const sqrtStr = '\\sqrt{x^{2} + ' + C + '}';
      const linStr = u.formatLinear(k, bLin);

      const tfStatements = [
        {
          key: 'a',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + p + '} f(x) = ' + (aIs ? valP : valP + 3) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + q + '} f(x) = ' + (bIs ? valQTex : wrongQ) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + (cIs ? L : L + 2) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Giới hạn $\\lim \\limits_{x \\to ' + x0 + '} f(x) = ' + (dIs ? L : L + 1) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + sqrtStr + ' & \\text{khi } x < ' + x0 + ' \\\\ ' + linStr + ' & \\text{khi } x \\ge ' + x0 + ' \\end{cases}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + p + ' > ' + x0 + '$ nên $\\lim \\limits_{x \\to ' + p + '} f(x) = ' + valP + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + q + ' < ' + x0 + '$ nên $\\lim \\limits_{x \\to ' + q + '} f(x) = \\sqrt{' + radVal + '} = ' + valQTex + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + linStr.replace(/x/g, '(' + x0 + ')') + ' = ' + L + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Do $\\lim \\limits_{x \\to ' + x0 + '^-} f(x) = \\sqrt{' + (x0 * x0) + ' + ' + C + '} = ' + L + ' = \\lim \\limits_{x \\to ' + x0 + '^+} f(x)$ nên $\\lim \\limits_{x \\to ' + x0 + '} f(x) = ' + L + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 1', params: { x0: 1, m: 6, k: 2, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (x0=5, L=11, k=2 -> Đ S Đ Đ)', params: { x0: 5, m: 6, k: 2, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Khảo sát 4 giới hạn và tham số của hàm phân thức bậc 2 / bậc 1
  t11_b16_d20_rational_00_tf: {
    id: 't11_b16_d20_rational_00_tf',
    name: 'Khảo sát giới hạn tại điểm, vô định 0/0, vô cực và tham số của phân thức (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của hàm số',
    description: 'Cho f(x) = a(x - x0)(x - r)/(b(x - x0)). Xét giới hạn xác định, vô định 0/0, giới hạn tại ±∞ và biểu thức chứa tham số.',
    conditionSummary: 'x0 ∈ [-7; 5], r, x1, x2 đôi một phân biệt và cùng tính chẵn lẻ với x0, s ∈ {-1, 1}, flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm gián đoạn x0', min: -7, max: -1 },
      { name: 'dx1', label: 'Bước chẵn tới x1 (2, 4, 6, 8)', min: 2, max: 8, step: 2 },
      { name: 'dx2', label: 'Bước chẵn tới x2 (2, 4)', min: 2, max: 4, step: 2 },
      { name: 'dr', label: 'Bước chẵn tới nghiệm r (6, 8, 12)', min: 6, max: 12, step: 2 },
      { name: 'kSign', label: 'Hệ số sau rút gọn s/2 (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
      { name: 'aTarget', label: 'Giá trị tham số a trong ý (d)', min: -5, max: 4, allowZero: false },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x0, dx1, dx2, dr, kSign, aTarget, aTrue, bTrue, cTrue, dTrue } = params;
      if (dx1 === dx2 || dx1 === dr || dx2 === dr) return { valid: false, reason: 'Các điểm x1, x2, r phải phân biệt' };
      if (kSign !== -1 && kSign !== 1) return { valid: false, reason: 'kSign phải là ±1' };
      if (aTarget === 0) return { valid: false, reason: 'aTarget phải khác 0' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, dx1, dx2, dr, kSign, aTarget, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const x1 = x0 + dx1;
      const x2 = x0 + dx2;
      const r = x0 + dr;

      // f(x) = (-2 kSign (x - x0)(x - r)) / (-4(x - x0)) => sau rút gọn là (kSign/2)*(x - r)
      const numLead = -2 * kSign;
      const denLead = -4;
      const fNum = u.formatQuadratic(numLead, -numLead * (x0 + r), numLead * x0 * r);
      const fDen = u.formatLinear(denLead, -denLead * x0);
      const fLatex = '\\dfrac{' + fNum + '}{' + fDen + '}';

      const limX1 = (kSign * (x1 - r)) / 2;
      const limX0 = (kSign * (x0 - r)) / 2;
      // lim_{x -> -infty} (kSign/2)(x - r) = -kSign * infty
      const limInfSign = -kSign;
      const limInfTrue = limInfSign > 0 ? '+\\infty' : '-\\infty';
      const limInfWrong = limInfSign > 0 ? '-\\infty' : '+\\infty';

      const fAtX2 = (kSign * (x2 - r)) / 2;
      const rhsD = fAtX2 - aTarget;
      const exprVal = 2 - 5 * aTarget;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\lim \\limits_{x \\to ' + x1 + '} ' + fLatex + ' = ' + (aIs ? limX1 : limX1 + 3) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim \\limits_{x \\to ' + x0 + '} ' + fLatex + ' = ' + (bIs ? limX0 : limX0 + 4) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim \\limits_{x \\to -\\infty} ' + fLatex + ' = ' + (cIs ? limInfTrue : limInfWrong) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Biết $\\lim \\limits_{x \\to ' + x2 + '} \\left[' + fLatex + ' - a\\right] = ' + rhsD + '$. Khi đó $2 - 5a = ' + (dIs ? exprVal : exprVal + 1) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = ' + fLatex + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Rút gọn với $x \\ne ' + x0 + '$: $f(x) = ' + (kSign === 1 ? '\\frac{1}{2}' : '-\\frac{1}{2}') + '(' + u.formatShift('x', -r) + ')$.',
          'a) Tại $x = ' + x1 + '$, thay trực tiếp được $' + limX1 + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\lim \\limits_{x \\to ' + x0 + '} f(x) = ' + limX0 + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Khi $x \\to -\\infty$, giới hạn bằng $' + limInfTrue + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Ta có $' + fAtX2 + ' - a = ' + rhsD + ' \\Rightarrow a = ' + aTarget + ' \\Rightarrow 2 - 5a = ' + exprVal + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dx1 = dx2', params: { x0: -7, dx1: 2, dx2: 2, dr: 12, kSign: 1, aTarget: -3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (Đ Đ S S)', params: { x0: -7, dx1: 8, dx2: 2, dr: 12, kSign: 1, aTarget: -3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
