import { MathTemplate } from '../types/math';

export const G11_B20_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D24 (Q24): Phép chiếu song song trên lăng trụ ABC.DEF (G trung điểm DF, H trung điểm BC, P trọng tâm DBC)
  t11_b20_d24_prism_proj_tf: {
    id: 't11_b20_d24_prism_proj_tf',
    name: 'Phép chiếu song song đỉnh, đoạn thẳng và trọng tâm trong lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Cho lăng trụ ABC.DEF với G, H là trung điểm DF, BC và P là trọng tâm ΔDBC. Xét 4 mệnh đề Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', H: 'H', P: 'P', Pp: "P'" },
        { A: 'A', B: 'B', C: 'C', D: "A'", E: "B'", F: "C'", G: 'I', H: 'K', P: 'M', Pp: "M'" },
        { A: 'M', B: 'N', C: 'P', D: 'M_1', E: 'N_1', F: 'P_1', G: 'E', H: 'F', P: 'Q', Pp: "Q'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.D + s.E + s.F;
      const latBC = s.B + s.C + s.F + s.E;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.E + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.D + '$ là điểm $' + (aIs ? s.B : s.C) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.G + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.D + '$ là ' + (bIs ? 'đường trung tuyến xuất phát từ đỉnh $' + s.B + '$ của tam giác $' + base + '$' : 'đoạn thẳng $' + s.B + s.H + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.G + '$ lên mặt phẳng $(' + latBC + ')$ theo phương $' + s.E + s.D + '$ là trung điểm của $' + (cIs ? s.E + s.F : s.B + s.C) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Pp + '$ là hình chiếu song song của $' + s.P + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.E + '$. Khi đó: $\\overrightarrow{' + s.A + s.Pp + '} = ' + (dIs ? '\\dfrac{2}{3}' : '\\dfrac{1}{3}') + '\\overrightarrow{' + s.A + s.H + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.G + ', ' + s.H + '$ lần lượt là trung điểm của $' + s.D + s.F + ', ' + s.B + s.C + '$. Gọi $' + s.P + '$ là trọng tâm của tam giác $' + s.D + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.D, tF: s.E, tR: s.F },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.E + s.B + ' \\parallel ' + s.A + s.D + '$ và $' + s.B + ' \\in (' + base + ')$ nên hình chiếu của $' + s.E + '$ là $' + s.B + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.G + '$ theo phương $' + s.A + s.D + '$ lên $(' + base + ')$ được trung điểm của $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.G + '$ là trung tuyến từ $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Trong mặt đáy trên, đường thẳng qua trung điểm $' + s.G + '$ của $' + s.D + s.F + '$ song song $' + s.E + s.D + '$ cắt $' + s.E + s.F + '$ tại trung điểm của $' + s.E + s.F + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Hình chiếu của trọng tâm $' + s.P + '$ là trọng tâm $' + s.Pp + '$ của tam giác $' + base + '$, do $' + s.H + '$ là trung điểm $' + s.B + s.C + '$ nên $\\overrightarrow{' + s.A + s.Pp + '} = \\dfrac{2}{3}\\overrightarrow{' + s.A + s.H + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (Đ S S Đ)', params: { setIdx: 0, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Tính chất hàm số mũ y = a^x (a > 1)
  t11_b20_d25_exp_inc_props_tf: {
    id: 't11_b20_d25_exp_inc_props_tf',
    name: 'Tính chất hàm số mũ cơ số lớn hơn 1 (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Kiểm tra tập xác định, sự biến thiên, vị trí đồ thị và tính liên tục của hàm số y = a^x (a > 1).',
    conditionSummary: 'a ∈ [2; 12], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số nguyên a > 1', min: 2, max: 12 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, aTrue, bTrue, cTrue, dTrue } = params;
      if (a < 2 || a > 12) return { valid: false, reason: 'a ngoài miền [2; 12]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số đã cho có tập xác định là $' + (aIs ? '\\mathbb{R}' : '(0; +\\infty)') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hàm số đã cho ' + (bIs ? 'đồng biến' : 'nghịch biến') + ' trên $\\mathbb{R}$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Đồ thị hàm số đã cho luôn nằm ' + (cIs ? 'phía trên trục hoành' : 'bên trái trục tung'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số ' + (dIs ? 'liên tục trên $\\mathbb{R}$' : 'không liên tục tại $x = 0$'),
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $y = ' + a + '^x$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Tập xác định của $y = ' + a + '^x$ là $\\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + a + ' > 1$ nên hàm số đồng biến trên $\\mathbb{R}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + a + '^x > 0,\\; \\forall x \\in \\mathbb{R}$ nên đồ thị luôn nằm phía trên trục hoành (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Hàm số mũ liên tục trên toàn tập $\\mathbb{R}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (y = 8^x: S S S Đ)', params: { a: 8, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Tính chất hàm số mũ y = (p/q)^x (0 < p/q < 1)
  t11_b20_d26_exp_dec_props_tf: {
    id: 't11_b20_d26_exp_dec_props_tf',
    name: 'Tính chất hàm số mũ cơ số thuộc (0; 1) (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Kiểm tra tính nghịch biến, liên tục, tập xác định và vị trí đồ thị của hàm số y = (p/q)^x (0 < p/q < 1).',
    conditionSummary: 'p ∈ [1; 7], q ∈ [2; 9], p < q, gcd(p, q) = 1, flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'p', label: 'Tử số p > 0', min: 1, max: 7 },
      { name: 'q', label: 'Mẫu số q > p', min: 2, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p, q, aTrue, bTrue, cTrue, dTrue } = params;
      if (p < 1 || p > 7 || q < 2 || q > 9 || p >= q || u.gcd(p, q) !== 1) {
        return { valid: false, reason: 'Cần 0 < p/q < 1 tối giản' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const baseTex = '\\dfrac{' + p + '}{' + q + '}';

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số đã cho ' + (aIs ? 'nghịch biến' : 'đồng biến') + ' trên $\\mathbb{R}$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hàm số đã cho ' + (bIs ? 'liên tục' : 'không liên tục') + ' trên $\\mathbb{R}$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Đồ thị hàm số đã cho luôn nằm phía ' + (cIs ? 'trên' : 'dưới') + ' trục hoành',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số đã cho có tập xác định là $' + (dIs ? '\\mathbb{R}' : '(0; +\\infty)') + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\left(' + baseTex + '\\right)^x$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $0 < ' + baseTex + ' < 1$ nên hàm số nghịch biến trên $\\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Hàm số mũ liên tục trên $\\mathbb{R}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $\\left(' + baseTex + '\\right)^x > 0,\\; \\forall x \\in \\mathbb{R}$ nên đồ thị luôn nằm phía trên trục hoành (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tập xác định của hàm số là $\\mathbb{R}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 5, q: 5, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 ((4/5)^x: S S Đ S)', params: { p: 4, q: 5, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Tính chất hàm số lôgarit y = log_a x (a > 1)
  t11_b20_d27_log_inc_props_tf: {
    id: 't11_b20_d27_log_inc_props_tf',
    name: 'Tính chất hàm số lôgarit cơ số lớn hơn 1 (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Kiểm tra tính đồng biến, điểm đi qua, liên tục và tập giá trị của y = log_a x (a > 1).',
    conditionSummary: 'a ∈ [2; 9], k ∈ [2; 3], x0 ∈ [3; 9], x1 ∈ [2; 8], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số nguyên a > 1', min: 2, max: 9 },
      { name: 'k', label: 'Số mũ k kiểm tra điểm', min: 2, max: 3 },
      { name: 'x0', label: 'Đầu mút khoảng đơn điệu', min: 3, max: 9 },
      { name: 'x1', label: 'Đầu mút khoảng liên tục', min: 2, max: 8 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, k, x0, x1, aTrue, bTrue, cTrue, dTrue } = params;
      if (a < 2 || a > 9 || (k !== 2 && k !== 3) || x0 < 3 || x0 > 9 || x1 < 2 || x1 > 8) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k, x0, x1, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const ak = Math.pow(a, k);

      const tfStatements = [
        {
          key: 'a',
          text: 'Trên khoảng $(' + x0 + '; +\\infty)$ thì hàm số đã cho ' + (aIs ? 'đồng biến' : 'nghịch biến'),
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Đồ thị hàm số đã cho đi qua điểm $(' + (bIs ? ak + '; ' + k : k + '; ' + ak) + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hàm số ' + (cIs ? 'liên tục trên khoảng $(' + x1 + '; +\\infty)$' : 'gián đoạn tại $x = ' + x1 + '$'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số đã cho có tập giá trị là $' + (dIs ? '\\mathbb{R}' : '(1; +\\infty)') + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\log_{' + a + '} x$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + a + ' > 1$ nên hàm số đồng biến trên $(0; +\\infty)$, do đó đồng biến trên $(' + x0 + '; +\\infty)$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Tại $x = ' + ak + '$, $y = \\log_{' + a + '} ' + ak + ' = ' + k + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Hàm số liên tục trên $(0; +\\infty)$ nên liên tục trên $(' + x1 + '; +\\infty)$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tập giá trị của hàm số lôgarit là $\\mathbb{R}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 4', params: { a: 6, k: 4, x0: 5, x1: 7, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (log_6 x: S S Đ S)', params: { a: 6, k: 3, x0: 5, x1: 7, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Tính chất hàm số lôgarit y = log_{p/q} x (0 < p/q < 1)
  t11_b20_d28_log_dec_props_tf: {
    id: 't11_b20_d28_log_dec_props_tf',
    name: 'Tính chất hàm số lôgarit cơ số thuộc (0; 1) (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Kiểm tra tập giá trị, điểm đặc biệt, tính nghịch biến và miền liên tục của y = log_{p/q} x.',
    conditionSummary: 'p ∈ [2; 7], q ∈ [5; 13], p < q, gcd(p, q) = 1, x0 ∈ [4; 12], x1 ∈ [3; 9], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'p', label: 'Tử số p > 1', min: 2, max: 7 },
      { name: 'q', label: 'Mẫu số q > p', min: 5, max: 13 },
      { name: 'x0', label: 'Đầu mút khoảng đơn điệu', min: 4, max: 12 },
      { name: 'x1', label: 'Đầu mút khoảng liên tục', min: 3, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p, q, x0, x1, aTrue, bTrue, cTrue, dTrue } = params;
      if (p < 2 || p > 7 || q < 5 || q > 13 || p >= q || u.gcd(p, q) !== 1 || x0 < 4 || x0 > 12 || x1 < 3 || x1 > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, x0, x1, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const baseTex = '\\frac{' + p + '}{' + q + '}';

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số đã cho có tập giá trị là $' + (aIs ? '\\mathbb{R}' : '(0; +\\infty)') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Đồ thị hàm số đã cho đi qua điểm $\\left(1; ' + (bIs ? '0' : baseTex) + '\\right)$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Trên khoảng $(' + x0 + '; +\\infty)$ thì hàm số đã cho ' + (cIs ? 'nghịch biến' : 'đồng biến'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số liên tục trên khoảng $(' + (dIs ? x1 + '; +\\infty' : '-\\infty; ' + x1) + ')$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\log_{' + baseTex + '} x$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Tập giá trị của hàm số lôgarit là $\\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $\\log_{' + baseTex + '} 1 = 0$ nên đồ thị đi qua $(1; 0)$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $0 < ' + baseTex + ' < 1$ nên hàm số nghịch biến trên $(0; +\\infty)$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Hàm số liên tục trên $(0; +\\infty)$ và không xác định với $x \\le 0$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên gcd(p, q) > 1', params: { p: 3, q: 6, x0: 10, x1: 7, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (log_{5/11} x: Đ S S S)', params: { p: 5, q: 11, x0: 10, x1: 7, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Đọc đồ thị y = a^x (a > 1) xét 4 khẳng định Đúng/Sai
  t11_b20_d29_graph_exp_inc_tf: {
    id: 't11_b20_d29_graph_exp_inc_tf',
    name: 'Đọc đồ thị hàm số mũ đồng biến y = a^x xét tính chất (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Từ đồ thị y = a^x đi qua (1; a), xác định tập xác định, liên tục, điểm thuộc đồ thị và tính đồng biến.',
    conditionSummary: 'a ∈ [2; 7], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số nguyên a > 1', min: 2, max: 7 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, aTrue, bTrue, cTrue, dTrue } = params;
      if (a < 2 || a > 7) return { valid: false, reason: 'a ngoài miền [2; 7]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const a2 = a * a;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số đã cho có tập xác định là $' + (aIs ? '\\mathbb{R}' : '(0; +\\infty)') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hàm số ' + (bIs ? 'liên tục' : 'không liên tục') + ' trên $\\mathbb{R}$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Đồ thị hàm số đã cho đi qua điểm $(' + (cIs ? '2; ' + a2 : a2 + '; 2') + ')$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số đã cho ' + (dIs ? 'đồng biến' : 'nghịch biến') + ' trên $\\mathbb{R}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho đồ thị hàm số $y = a^x$ với $a > 0$ có đồ thị như hình vẽ. Xét tính đúng sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 0, base: a },
          labels: { xLabel: '1', yLabel: String(a) },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Dựa vào đồ thị, đường cong đi qua $(1; ' + a + ')$ nên $a = ' + a + ' \\Rightarrow y = ' + a + '^x$.',
          'a) Tập xác định của hàm số là $\\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Hàm số liên tục trên $\\mathbb{R}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Tại $x = 2$, $y = ' + a2 + '$ nên đồ thị đi qua $(2; ' + a2 + ')$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $' + a + ' > 1$ nên hàm số đồng biến trên $\\mathbb{R}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 8', params: { a: 8, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (a=6: S Đ S S)', params: { a: 6, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Đọc đồ thị y = (1/b)^x xét 4 khẳng định Đúng/Sai
  t11_b20_d30_graph_exp_dec_tf: {
    id: 't11_b20_d30_graph_exp_dec_tf',
    name: 'Đọc đồ thị hàm số mũ nghịch biến y = (1/b)^x xét tính chất (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Từ đồ thị y = a^x đi qua (1; 1/b), kiểm tra tập xác định, điểm đi qua, liên tục và tính nghịch biến.',
    conditionSummary: 'b ∈ [2; 7], x0 ∈ [2; 8], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'b', label: 'Mẫu số của cơ số 1/b', min: 2, max: 7 },
      { name: 'x0', label: 'Đầu mút khoảng đơn điệu', min: 2, max: 8 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { b, x0, aTrue, bTrue, cTrue, dTrue } = params;
      if (b < 2 || b > 7 || x0 < 2 || x0 > 8) return { valid: false, reason: 'Tham số ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, x0, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số đã cho có tập xác định là $' + (aIs ? '\\mathbb{R}' : '(0; +\\infty)') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Đồ thị hàm số đã cho đi qua điểm $\\left(1; ' + (bIs ? '\\frac{1}{' + b + '}' : String(b)) + '\\right)$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hàm số ' + (cIs ? 'liên tục trên $\\mathbb{R}$' : 'chỉ liên tục trên khoảng $(-\\infty; ' + (x0 + 5) + ')$'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Trên khoảng $(' + x0 + '; +\\infty)$ thì hàm số đã cho ' + (dIs ? 'nghịch biến' : 'đồng biến'),
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho đồ thị hàm số $y = a^x$ với $a > 0$ có đồ thị như hình vẽ. Xét tính đúng sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 1, base: b },
          labels: { xLabel: '1', yLabel: '1/' + b },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Dựa vào đồ thị, đường cong đi qua $\\left(1; \\frac{1}{' + b + '}\\right)$ nên $a = \\frac{1}{' + b + '} \\Rightarrow y = \\left(\\frac{1}{' + b + '}\\right)^x$.',
          'a) Tập xác định của hàm số mũ là $\\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Tại $x = 1$, $y = \\frac{1}{' + b + '}$ nên đồ thị đi qua $\\left(1; \\frac{1}{' + b + '}\\right)$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Hàm số mũ liên tục trên toàn tập $\\mathbb{R}$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $0 < \\frac{1}{' + b + '} < 1$ nên hàm số nghịch biến trên $\\mathbb{R}$, do đó nghịch biến trên $(' + x0 + '; +\\infty)$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1, x0: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (b = 5)', params: { b: 5, x0: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Đọc đồ thị y = log_a x (a > 1) xét 4 khẳng định Đúng/Sai
  t11_b20_d31_graph_log_inc_tf: {
    id: 't11_b20_d31_graph_log_inc_tf',
    name: 'Đọc đồ thị hàm số lôgarit đồng biến y = log_a x xét tính chất (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Từ đồ thị y = log_a x đi qua (a; 1), kiểm tra tính liên tục, điểm đi qua, đồng biến và tập giá trị.',
    conditionSummary: 'a ∈ [2; 6], k ∈ [2; 3], x0 ∈ [2; 8], c0 ∈ [3; 9], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số nguyên a > 1', min: 2, max: 6 },
      { name: 'k', label: 'Số mũ k kiểm tra điểm', min: 2, max: 3 },
      { name: 'x0', label: 'Đầu mút khoảng đơn điệu', min: 2, max: 8 },
      { name: 'c0', label: 'Hằng số khoảng nhiễu', min: 3, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, k, x0, c0, aTrue, bTrue, cTrue, dTrue } = params;
      if (a < 2 || a > 6 || (k !== 2 && k !== 3) || x0 < 2 || x0 > 8 || c0 < 3 || c0 > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k, x0, c0, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const ak = Math.pow(a, k);

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số liên tục trên khoảng $(' + (aIs ? '0; +\\infty' : '-\\infty; ' + c0) + ')$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Đồ thị hàm số đã cho đi qua điểm $(' + (bIs ? ak + '; ' + k : k + '; ' + ak) + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Trên khoảng $(' + x0 + '; +\\infty)$ thì hàm số đã cho ' + (cIs ? 'đồng biến' : 'nghịch biến'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số đã cho có tập giá trị là $' + (dIs ? '\\mathbb{R}' : '(' + c0 + '; +\\infty)') + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho đồ thị hàm số $y = \\log_a x$ với $a > 0, a \\ne 1$ có đồ thị như hình vẽ. Xét tính đúng sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 3, base: a },
          labels: { xLabel: String(a), yLabel: '1' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Dựa vào đồ thị, đường cong đi qua $(' + a + '; 1)$ nên $a = ' + a + ' \\Rightarrow y = \\log_{' + a + '} x$.',
          'a) Hàm số liên tục trên $(0; +\\infty)$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $\\log_{' + a + '} ' + ak + ' = ' + k + '$ nên đồ thị đi qua $(' + ak + '; ' + k + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + a + ' > 1$ nên hàm số đồng biến trên $(0; +\\infty)$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tập giá trị của hàm số lôgarit là $\\mathbb{R}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 4', params: { a: 2, k: 4, x0: 3, c0: 7, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (a=2: S Đ Đ S)', params: { a: 2, k: 2, x0: 3, c0: 7, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Đọc đồ thị y = log_{1/b} x xét 4 khẳng định Đúng/Sai
  t11_b20_d32_graph_log_dec_tf: {
    id: 't11_b20_d32_graph_log_dec_tf',
    name: 'Đọc đồ thị hàm số lôgarit nghịch biến y = log_{1/b} x xét tính chất (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Từ đồ thị y = log_a x đi qua (1/b; 1), kiểm tra miền liên tục, điểm đi qua, tập xác định và tính nghịch biến.',
    conditionSummary: 'b ∈ [2; 6], x0 ∈ [3; 10], c0 ∈ [2; 6], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'b', label: 'Mẫu số của cơ số 1/b', min: 2, max: 6 },
      { name: 'x0', label: 'Đầu mút khoảng đơn điệu', min: 3, max: 10 },
      { name: 'c0', label: 'Hằng số khoảng nhiễu âm', min: 2, max: 6 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { b, x0, c0, aTrue, bTrue, cTrue, dTrue } = params;
      if (b < 2 || b > 6 || x0 < 3 || x0 > 10 || c0 < 2 || c0 > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, x0, c0, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số liên tục trên khoảng $(' + (aIs ? '0; +\\infty' : '-' + c0 + '; +\\infty') + ')$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Đồ thị hàm số đã cho đi qua điểm $(' + b + '; ' + (bIs ? '-1' : '1') + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hàm số đã cho có tập xác định là $' + (cIs ? '(0; +\\infty)' : '\\mathbb{R}') + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Trên khoảng $(' + x0 + '; +\\infty)$ thì hàm số đã cho ' + (dIs ? 'nghịch biến' : 'đồng biến'),
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho đồ thị hàm số $y = \\log_a x$ với $a > 0, a \\ne 1$ có đồ thị như hình vẽ. Xét tính đúng sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 4, base: b },
          labels: { xLabel: '1/' + b, yLabel: '1' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Dựa vào đồ thị, đường cong đi qua $\\left(\\frac{1}{' + b + '}; 1\\right)$ nên $a = \\frac{1}{' + b + '} \\Rightarrow y = \\log_{\\frac{1}{' + b + '}} x$.',
          'a) Hàm số liên tục trên $(0; +\\infty)$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $\\log_{\\frac{1}{' + b + '}} ' + b + ' = -1$ nên đồ thị đi qua $(' + b + '; -1)$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Tập xác định của hàm số là $(0; +\\infty)$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $0 < \\frac{1}{' + b + '} < 1$ nên hàm số nghịch biến trên $(0; +\\infty)$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 7', params: { b: 7, x0: 9, c0: 2, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (b = 2)', params: { b: 2, x0: 9, c0: 2, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Tổng hợp nhận diện, TXĐ và đơn điệu hàm mũ - lôgarit (4 ý Đúng/Sai)
  t11_b20_d33_mixed_exp_log_tf: {
    id: 't11_b20_d33_mixed_exp_log_tf',
    name: 'Tổng hợp nhận diện, tập xác định và đơn điệu hàm mũ - lôgarit (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Kiểm tra nhận diện hàm mũ, tập xác định hàm mũ, đơn điệu hàm log x và tập xác định y = log(k(x-r1)(x-r2)).',
    conditionSummary: 'bIdx ∈ [0; 3], pIdx ∈ [0; 4], k ∈ [2; 5], r1 ∈ [1; 4], d ∈ [4; 10], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số hàm mũ ý (a)', min: 0, max: 3 },
      { name: 'pIdx', label: 'Chỉ số chọn căn thức ý (b)', min: 0, max: 4 },
      { name: 'k', label: 'Hệ số k của tam thức bậc hai ý (d)', min: 2, max: 5 },
      { name: 'r1', label: 'Nghiệm nhỏ r1 ý (d)', min: 1, max: 4 },
      { name: 'd', label: 'Hiệu r2 - r1 ý (d)', min: 4, max: 10 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { bIdx, pIdx, k, r1, d, aTrue, bTrue, cTrue, dTrue } = params;
      if (bIdx < 0 || bIdx > 3 || pIdx < 0 || pIdx > 4 || k < 2 || k > 5 || r1 < 1 || r1 > 4 || d < 4 || d > 10) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, pIdx, k, r1, d, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const aTex = ['\\pi', 'e', '5', '\\sqrt{3}'][bIdx];
      const pRad = [2, 3, 5, 7, 11][pIdx];
      const r2 = r1 + d;
      const B = -k * (r1 + r2);
      const C = k * r1 * r2;
      const quadTex = k + 'x^2 - ' + (-B) + 'x + ' + C;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số $y = ' + (aIs ? aTex + '^x' : 'x^{' + aTex + '}') + '$ là hàm số mũ',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Tập xác định của hàm số $y = \\left(\\sqrt{' + pRad + '}\\right)^x$ là $D = ' + (bIs ? '\\mathbb{R}' : '(0; +\\infty)') + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hàm số $y = \\log x$ ' + (cIs ? 'đồng biến' : 'nghịch biến') + ' trên $(0; +\\infty)$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Hàm số $y = \\log(' + quadTex + ')$ có tập xác định là $D = ' + (dIs ? '(-\\infty; ' + r1 + ') \\cup (' + r2 + '; +\\infty)' : '(' + r1 + '; ' + r2 + ')') + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Hàm số $y = a^x$ ($a > 0, a \\ne 1$) là hàm số mũ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Hàm số $y = (\\sqrt{' + pRad + '})^x$ xác định với mọi $x \\in \\mathbb{R}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì cơ số $10 > 1$ nên $y = \\log x$ đồng biến trên $(0; +\\infty)$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Điều kiện $' + quadTex + ' > 0 \\Leftrightarrow x < ' + r1 + '$ hoặc $x > ' + r2 + '$, nên tập xác định là $(-\\infty; ' + r1 + ') \\cup (' + r2 + '; +\\infty)$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 3', params: { bIdx: 0, pIdx: 3, k: 3, r1: 1, d: 3, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (Đ S Đ Đ)', params: { bIdx: 0, pIdx: 3, k: 3, r1: 1, d: 10, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
