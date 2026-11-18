import { MathTemplate } from '../types/math';

export const G11_B19_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Khẳng định đúng về tính chất phép chiếu song song (đồng quy)
  t11_b19_d01_proj_prop_correct_mc: {
    id: 't11_b19_d01_proj_prop_correct_mc',
    name: 'Nhận biết tính chất đồng quy và bảo toàn qua phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Nhận biết khẳng định đúng về các tính chất cơ bản của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể khẳng định đúng (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
          wrongs: [
            'Phép chiếu song song bảo toàn hình dạng của một hình',
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
            'Phép chiếu song song bảo toàn tính vuông góc',
          ],
          sol: 'Phép chiếu song song biến ba đường thẳng đồng quy (nằm trong mặt phẳng không song song phương chiếu) thành ba đường thẳng đồng quy.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song biến đường tròn thành một điểm',
            'Phép chiếu song song luôn bảo toàn diện tích tam giác',
          ],
          sol: 'Hai đường thẳng song song có hình chiếu song song là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và giữ nguyên thứ tự của chúng',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn số đo góc giữa hai đường thẳng',
            'Phép chiếu song song biến hai đường thẳng chéo nhau luôn thành hai đường thẳng chéo nhau',
            'Phép chiếu song song bảo toàn tỉ số diện tích của mọi hình phẳng',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng và thứ tự của ba điểm thẳng hàng.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (ba đường thẳng đồng quy)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Khẳng định sai về phép chiếu song song (đường tròn thành một điểm)
  t11_b19_d02_proj_prop_wrong_mc: {
    id: 't11_b19_d02_proj_prop_wrong_mc',
    name: 'Nhận biết khẳng định sai về ảnh đường tròn qua phép chiếu song song',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Chọn mệnh đề sai trong các phát biểu về phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề sai (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const TRUE_STMTS = [
        'Phép chiếu song song có thể biến đường tròn thành đường elip',
        'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
        'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
      ];
      const FALSE_STMTS = [
        {
          stmt: 'Phép chiếu song song có thể biến đường tròn thành một điểm',
          sol: 'Hình chiếu song song của một đường tròn là một đường elip (hoặc đường tròn), hay suy biến thành một đoạn thẳng nếu mặt phẳng chứa đường tròn song song phương chiếu; không thể là một điểm.',
        },
        {
          stmt: 'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
          sol: 'Phép chiếu song song không bảo toàn độ dài đoạn thẳng.',
        },
        {
          stmt: 'Phép chiếu song song luôn bảo toàn tính vuông góc',
          sol: 'Phép chiếu song song không bảo toàn số đo góc và tính vuông góc.',
        },
      ];
      const f = FALSE_STMTS[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(f.stmt, TRUE_STMTS, rng);
      return {
        stem: 'Khẳng định nào sau đây **sai**?',
        options,
        correctIndex,
        answerSummary: f.stmt + ' (sai)',
        solutionSteps: [f.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = -1', params: { mode: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (đường tròn thành một điểm)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của hình chữ nhật / tứ giác đặc biệt
  t11_b19_d03_proj_rect_parallelogram_mc: {
    id: 't11_b19_d03_proj_rect_parallelogram_mc',
    name: 'Hình chiếu song song của hình chữ nhật thành hình bình hành (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Nhận biết hình chiếu song song của hình chữ nhật, hình vuông, hình thoi.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể (0: hình chữ nhật, 1: hình vuông, 2: hình thoi)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hình chữ nhật là một hình bình hành (khi mặt phẳng chứa hình chữ nhật không song song phương chiếu)',
          wrongs: [
            'Hình chiếu song song của một tam giác đều luôn là một tam giác cân',
            'Hình chiếu song song của hình vuông luôn là một hình vuông',
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
          ],
          sol: 'Vì phép chiếu song song bảo toàn tính song song của các cặp cạnh đối nên ảnh của hình chữ nhật là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình vuông là một hình bình hành (khi mặt phẳng chứa hình vuông không song song phương chiếu)',
          wrongs: [
            'Hình chiếu song song của một đoạn thẳng luôn là một đoạn thẳng',
            'Hình chiếu song song của hình thoi luôn là một hình thoi',
            'Hình chiếu song song của tam giác vuông luôn là tam giác vuông',
          ],
          sol: 'Hình vuông chiếu song song lên mặt phẳng không song song phương chiếu cho ảnh là một hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình thoi là một hình bình hành (khi mặt phẳng chứa hình thoi không song song phương chiếu)',
          wrongs: [
            'Hình chiếu song song của hình thoi luôn là hình thoi',
            'Hình chiếu song song của hình thang luôn là hình chữ nhật',
            'Hình chiếu song song của tam giác đều luôn có ba cạnh bằng nhau',
          ],
          sol: 'Do bảo toàn tính song song của hai cặp cạnh đối, hình chiếu song song của hình thoi là hình bình hành.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (hình chữ nhật -> hình bình hành)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Chiếu đỉnh đáy dưới lăng trụ ABC.DEF lên đáy trên (DEF) theo phương AD
  t11_b19_d04_prism_proj_def_top_mc: {
    id: 't11_b19_d04_prism_proj_def_top_mc',
    name: 'Hình chiếu song song đỉnh đáy dưới lăng trụ ABC.DEF lên đáy trên theo cạnh bên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Tìm hình chiếu song song của đỉnh đáy dưới lên mặt đáy trên (DEF) theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh đáy dưới (0: A, 1: B, 2: C)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, vIdx } = params;
      if (setIdx < 0 || setIdx > 2 || vIdx < 0 || vIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, vIdx } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ['D', 'E', 'F'] },
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"] },
        { b: ['M', 'N', 'P'], t: ['M_1', 'N_1', 'P_1'] },
      ];
      const s = SETS[setIdx];
      const src = s.b[vIdx];
      const img = s.t[vIdx];
      const dirIdx = (vIdx + 2) % 3;
      const dir = s.b[dirIdx] + s.t[dirIdx];
      const topPlane = s.t.join('');

      const w1 = s.b[(vIdx + 1) % 3];
      const w2 = s.t[(vIdx + 1) % 3];
      const w3 = s.t[(vIdx + 2) % 3];

      const correct = 'Điểm $' + img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + topPlane + '$. Hình chiếu song song của điểm $' + src + '$ lên mặt phẳng $(' + topPlane + ')$ theo phương $' + dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.b[0], vF: s.b[1], vR: s.b[2], tL: s.t[0], tF: s.t[1], tR: s.t[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + src + img + ' \\parallel ' + dir + '$ và $' + img + ' \\in (' + topPlane + ')$ nên hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { setIdx: 0, vIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (B lên (DEF) theo AD -> E)', params: { setIdx: 0, vIdx: 1 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu đỉnh đáy dưới lăng trụ ABC.A'B'C' lên đáy trên (A'B'C') theo phương BB'
  t11_b19_d05_prism_proj_abc_top_mc: {
    id: 't11_b19_d05_prism_proj_abc_top_mc',
    name: 'Hình chiếu song song đỉnh đáy dưới lăng trụ ABC.A\'B\'C\' lên đáy trên theo cạnh bên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Tìm hình chiếu song song của đỉnh đáy dưới lên mặt đáy trên (A\'B\'C\') theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh đáy dưới (0: A, 1: B, 2: C)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, vIdx } = params;
      if (setIdx < 0 || setIdx > 2 || vIdx < 0 || vIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, vIdx } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"] },
        { b: ['A', 'B', 'C'], t: ['A_1', 'B_1', 'C_1'] },
        { b: ['P', 'Q', 'R'], t: ["P'", "Q'", "R'"] },
      ];
      const s = SETS[setIdx];
      const src = s.b[vIdx];
      const img = s.t[vIdx];
      const dirIdx = (vIdx + 2) % 3;
      const dir = s.b[dirIdx] + s.t[dirIdx];
      const topPlane = s.t.join('');

      const w1 = s.t[(vIdx + 2) % 3];
      const w2 = s.t[(vIdx + 1) % 3];
      const w3 = s.b[vIdx];

      const correct = 'Điểm $' + img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + topPlane + '$. Hình chiếu song song của điểm $' + src + '$ lên mặt phẳng $(' + topPlane + ')$ theo phương $' + dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.b[0], vF: s.b[1], vR: s.b[2], tL: s.t[0], tF: s.t[1], tR: s.t[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Do $' + src + img + ' \\parallel ' + dir + '$ và $' + img + ' \\in (' + topPlane + ')$ nên hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, vIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (C lên (A\'B\'C\') theo BB\' -> C\')', params: { setIdx: 0, vIdx: 2 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Công thức tính chất lôgarit (đổi cơ số, tích, lũy thừa)
  t11_b19_d06_log_identity_mc: {
    id: 't11_b19_d06_log_identity_mc',
    name: 'Nhận biết công thức tính chất và đổi cơ số của lôgarit',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Nhận diện các quy tắc cơ bản của lôgarit: đổi cơ số, tích, thương, luỹ thừa.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể công thức (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          base: 'b',
          correct: '$\\log_{b} u = \\dfrac{\\ln u}{\\ln b}$',
          wrongs: [
            '$\\log_{b}(u - v) = \\log_{b} u - \\log_{b} v$',
            '$\\log_{b} u = \\log_{u} b$',
            '$\\log_{b}(u^{k}) = (\\log_{b} u)^{k}$',
          ],
          sol: 'Theo công thức đổi cơ số lôgarit sang cơ số tự nhiên $e$: $\\log_{b} u = \\dfrac{\\ln u}{\\ln b}$.',
        },
        {
          base: 'a',
          correct: '$\\log_{a}(uv) = \\log_{a} u + \\log_{a} v$',
          wrongs: [
            '$\\log_{a}(u + v) = \\log_{a} u + \\log_{a} v$',
            '$\\log_{a}(uv) = \\log_{a} u \\cdot \\log_{a} v$',
            '$\\log_{a}\\left(\\dfrac{u}{v}\\right) = \\dfrac{\\log_{a} u}{\\log_{a} v}$',
          ],
          sol: 'Lôgarit của một tích bằng tổng các lôgarit: $\\log_{a}(uv) = \\log_{a} u + \\log_{a} v$.',
        },
        {
          base: 'a',
          correct: '$\\log_{a}(u^{k}) = k\\log_{a} u$',
          wrongs: [
            '$\\log_{a}(u^{k}) = \\dfrac{1}{k}\\log_{a} u$',
            '$\\log_{a^{k}} u = k\\log_{a} u$',
            '$\\log_{a}(u + k) = k\\log_{a} u$',
          ],
          sol: 'Với $a > 0, a \\ne 1, u > 0$, ta có $\\log_{a}(u^{k}) = k\\log_{a} u$.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho $' + item.base + ' > 0,\\; ' + item.base + ' \\ne 1$, $u, v$ là các số thực dương, $k \\in \\mathbb{R}$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (log_b u = ln u / ln b)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Tính log_a (a^k) = k
  t11_b19_d07_log_a_ak_mc: {
    id: 't11_b19_d07_log_a_ak_mc',
    name: 'Tính giá trị log_a(a^k) với a > 0, a ≠ 1',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Nhận biết công thức log_a(a^k) = k.',
    conditionSummary: 'k ∈ [2; 18], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến cơ số (0: a, 1: b, 2: c)', min: 0, max: 2 },
      { name: 'k', label: 'Số mũ k', min: 2, max: 18 },
    ],
    validateCode: `
      const { vIdx, k } = params;
      if (vIdx < 0 || vIdx > 2 || k < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, k } = params;
      const v = ['a', 'b', 'c'][vIdx];
      const expr = '\\log_{' + v + '} ' + v + '^{' + k + '}';
      const correct = '$' + expr + ' = ' + k + '$';
      const wrongs = [
        '$' + expr + ' = -\\dfrac{1}{' + k + '}$',
        '$' + expr + ' = \\dfrac{1}{' + k + '}$',
        '$' + expr + ' = -' + k + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho $' + v + '$ là số thực dương khác $1$. Mệnh đề nào dưới đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo công thức cơ bản của lôgarit: $\\log_{' + v + '} ' + v + '^{' + k + '} = ' + k + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { vIdx: 0, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (log_a a^7 = 7)', params: { vIdx: 0, k: 7 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Tính log_a (1 / a^k) = -k
  t11_b19_d08_log_a_inv_ak_mc: {
    id: 't11_b19_d08_log_a_inv_ak_mc',
    name: 'Tính giá trị log_a(1 / a^k) với a > 0, a ≠ 1',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Tính log_a(1/a^k) = -k.',
    conditionSummary: 'k ∈ [2; 20], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến cơ số (0: a, 1: b, 2: c)', min: 0, max: 2 },
      { name: 'k', label: 'Số mũ k ở mẫu', min: 2, max: 20 },
    ],
    validateCode: `
      const { vIdx, k } = params;
      if (vIdx < 0 || vIdx > 2 || k < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, k } = params;
      const v = ['a', 'b', 'c'][vIdx];
      const expr = '\\log_{' + v + '} \\dfrac{1}{' + v + '^{' + k + '}}';
      const correct = '$' + expr + ' = -' + k + '$';
      const wrongs = [
        '$' + expr + ' = \\dfrac{1}{' + k + '}$',
        '$' + expr + ' = -\\dfrac{1}{' + k + '}$',
        '$' + expr + ' = ' + k + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho $' + v + '$ là số thực dương khác $1$. Mệnh đề nào dưới đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + expr + ' = \\log_{' + v + '} ' + v + '^{-' + k + '} = -' + k + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { vIdx: 0, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (log_a(1/a^16) = -16)', params: { vIdx: 0, k: 16 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Tính P = log_d(root[n](d^m))
  t11_b19_d09_log_root_pow_mc: {
    id: 't11_b19_d09_log_root_pow_mc',
    name: 'Tính giá trị biểu thức log_d(ⁿ√(d^m))',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Tính log_d(root[n](d^m)) = m/n với d > 0, d ≠ 1.',
    conditionSummary: 'n ∈ [2; 6], t ∈ [2; 5], m = n·t, vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến cơ số (0: d, 1: a, 2: c)', min: 0, max: 2 },
      { name: 'n', label: 'Bậc căn n', min: 2, max: 6 },
      { name: 't', label: 'Thương m/n nguyên', min: 2, max: 5 },
    ],
    validateCode: `
      const { vIdx, n, t } = params;
      if (vIdx < 0 || vIdx > 2 || n < 2 || t < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, n, t } = params;
      const v = ['d', 'a', 'c'][vIdx];
      const m = n * t;
      const rootExpr = n === 2 ? '\\sqrt{' + v + '^{' + m + '}}' : '\\sqrt[' + n + ']{' + v + '^{' + m + '}}';
      const correct = '$' + t + '$';
      const wrongs = [
        '$\\dfrac{1}{' + t + '}$',
        '$' + u.simplifyFrac(n + m, 2).latex + '$',
        '$' + u.simplifyFrac(m + 1, n + 2).latex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (k) => '$' + (t + k + 2) + '$'
      );
      return {
        stem: 'Cho $' + v + ' > 0,\\; ' + v + ' \\ne 1$. Tính giá trị biểu thức $P = \\log_{' + v + '} ' + rootExpr + '$.',
        options,
        correctIndex,
        answerSummary: '$P = ' + t + '$',
        solutionSteps: [
          '$P = \\log_{' + v + '} ' + v + '^{\\frac{' + m + '}{' + n + '}} = \\frac{' + m + '}{' + n + '} = ' + t + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 1', params: { vIdx: 0, n: 1, t: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (log_d ³√(d^9) = 3)', params: { vIdx: 0, n: 3, t: 3 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Tính P = log_{1/d^m} (d^k)
  t11_b19_d10_log_inv_pow_base_mc: {
    id: 't11_b19_d10_log_inv_pow_base_mc',
    name: 'Tính giá trị biểu thức log_{1/d^m}(d^k)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Tính log_{1/d^m}(d^k) = -k/m với d > 0, d ≠ 1.',
    conditionSummary: 'm ∈ [2; 7], t ∈ [1; 3], k = m·t',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến cơ số (0: d, 1: a, 2: b)', min: 0, max: 2 },
      { name: 'm', label: 'Số mũ m ở cơ số 1/d^m', min: 2, max: 7 },
      { name: 't', label: 'Tỉ số k/m', min: 1, max: 3 },
    ],
    validateCode: `
      const { vIdx, m, t } = params;
      if (vIdx < 0 || vIdx > 2 || m < 2 || t < 1) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, m, t } = params;
      const v = ['d', 'a', 'b'][vIdx];
      const k = m * t;
      const ans = -t;
      const correct = '$' + ans + '$';
      const wrongs = [
        '$' + u.simplifyFrac(17, 5).latex + '$',
        '$' + u.simplifyFrac(18, 5).latex + '$',
        '$' + t + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (j) => '$' + (ans - j) + '$'
      );
      return {
        stem: 'Cho $' + v + ' > 0,\\; ' + v + ' \\ne 1$. Tính giá trị biểu thức $P = \\log_{\\frac{1}{' + v + '^{' + m + '}}} ' + v + '^{' + k + '}$.',
        options,
        correctIndex,
        answerSummary: '$P = ' + ans + '$',
        solutionSteps: [
          '$P = \\log_{' + v + '^{-' + m + '}} ' + v + '^{' + k + '} = \\frac{' + k + '}{-' + m + '} = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { vIdx: 0, m: 1, t: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (log_{1/d^4} d^4 = -1)', params: { vIdx: 0, m: 4, t: 1 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Khai triển log_b (b·c) = 1 + log_b c
  t11_b19_d11_log_prod_const_mc: {
    id: 't11_b19_d11_log_prod_const_mc',
    name: 'Khai triển biểu thức log_b(b·c) = 1 + log_b(c)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Biến đổi P = log_b(bc) theo công thức tích lôgarit.',
    conditionSummary: 'b ∈ [2; 9], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến (0: c, 1: a, 2: x)', min: 0, max: 2 },
      { name: 'b', label: 'Cơ số b', min: 2, max: 9 },
    ],
    validateCode: `
      const { vIdx, b } = params;
      if (vIdx < 0 || vIdx > 2 || b < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, b } = params;
      const v = ['c', 'a', 'x'][vIdx];
      const correct = '$P = 1 + \\log_{' + b + '} ' + v + '$';
      const wrongs = [
        '$P = 1 - \\log_{' + b + '} ' + v + '$',
        '$P = ' + b + v + '$',
        '$P = ' + b + ' - \\log_{' + b + '} ' + v + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho $' + v + ' > 0,\\; ' + v + ' \\ne 1$. Cho biểu thức $P = \\log_{' + b + '} (' + b + v + ')$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$P = \\log_{' + b + '} ' + b + ' + \\log_{' + b + '} ' + v + ' = 1 + \\log_{' + b + '} ' + v + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { vIdx: 0, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (log_7(7c) = 1 + log_7 c)', params: { vIdx: 0, b: 7 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Khai triển log_b (b/d) = 1 - log_b d
  t11_b19_d12_log_quot_const_mc: {
    id: 't11_b19_d12_log_quot_const_mc',
    name: 'Khai triển biểu thức log_b(b/d) = 1 - log_b(d)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Biến đổi P = log_b(b/d) theo công thức thương lôgarit.',
    conditionSummary: 'b ∈ [2; 9], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến (0: d, 1: a, 2: x)', min: 0, max: 2 },
      { name: 'b', label: 'Cơ số b', min: 2, max: 9 },
    ],
    validateCode: `
      const { vIdx, b } = params;
      if (vIdx < 0 || vIdx > 2 || b < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, b } = params;
      const v = ['d', 'a', 'x'][vIdx];
      const correct = '$P = 1 - \\log_{' + b + '} ' + v + '$';
      const wrongs = [
        '$P = ' + b + ' - \\log_{' + b + '} ' + v + '$',
        '$P = ' + b + '\\log_{' + b + '} ' + v + '$',
        '$P = ' + b + ' + \\log_{' + b + '} ' + v + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho $' + v + ' > 0,\\; ' + v + ' \\ne 1$. Cho biểu thức $P = \\log_{' + b + '} \\dfrac{' + b + '}{' + v + '}$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$P = \\log_{' + b + '} ' + b + ' - \\log_{' + b + '} ' + v + ' = 1 - \\log_{' + b + '} ' + v + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { vIdx: 0, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (log_4(4/d) = 1 - log_4 d)', params: { vIdx: 0, b: 4 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Tính log_{root[n](a)} (1 / a^k) = -nk
  t11_b19_d13_log_root_base_inv_mc: {
    id: 't11_b19_d13_log_root_base_inv_mc',
    name: 'Tính giá trị log_{ⁿ√a}(1 / a^k)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Tính log_{root[n](a)}(1/a^k) = -n·k.',
    conditionSummary: 'n ∈ [2; 6], k ∈ [2; 12], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến cơ số (0: a, 1: b, 2: x)', min: 0, max: 2 },
      { name: 'n', label: 'Bậc căn n ở cơ số', min: 2, max: 6 },
      { name: 'k', label: 'Số mũ k ở mẫu', min: 2, max: 12 },
    ],
    validateCode: `
      const { vIdx, n, k } = params;
      if (vIdx < 0 || vIdx > 2 || n < 2 || k < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, n, k } = params;
      const v = ['a', 'b', 'x'][vIdx];
      const nk = n * k;
      const baseTex = n === 2 ? '\\sqrt{' + v + '}' : '\\sqrt[' + n + ']{' + v + '}';
      const expr = '\\log_{' + baseTex + '} \\left(\\dfrac{1}{' + v + '^{' + k + '}}\\right)';
      const correct = '$' + expr + ' = -' + nk + '$';
      const wrongs = [
        '$' + expr + ' = ' + nk + '$',
        '$' + expr + ' = \\dfrac{1}{' + nk + '}$',
        '$' + expr + ' = -\\dfrac{1}{' + nk + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho $' + v + '$ là số thực dương khác $1$. Mệnh đề nào dưới đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + expr + ' = \\log_{' + v + '^{\\frac{1}{' + n + '}}} ' + v + '^{-' + k + '} = (-' + k + ') \\cdot ' + n + ' = -' + nk + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 1', params: { vIdx: 0, n: 1, k: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (log_{³√a}(1/a^8) = -24)', params: { vIdx: 0, n: 3, k: 8 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Khai triển log_a (1 / (a^k b)) = -k - log_a b
  t11_b19_d14_log_inv_am_b_mc: {
    id: 't11_b19_d14_log_inv_am_b_mc',
    name: 'Khai triển biểu thức log_a(1 / (a^k · b))',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Rút gọn P = log_a(1/(a^k b)) = -k - log_a b.',
    conditionSummary: 'k ∈ [2; 12], pairIdx ∈ [0; 1]',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp biến (0: (a,b), 1: (x,y))', min: 0, max: 1 },
      { name: 'k', label: 'Số mũ k của a ở mẫu', min: 2, max: 12 },
    ],
    validateCode: `
      const { pairIdx, k } = params;
      if ((pairIdx !== 0 && pairIdx !== 1) || k < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, k } = params;
      const [a, b] = pairIdx === 0 ? ['a', 'b'] : ['x', 'y'];
      const correct = '$P = -' + k + ' - \\log_{' + a + '} ' + b + '$';
      const wrongs = [
        '$P = -' + k + '\\log_{' + a + '} ' + b + '$',
        '$P = -' + (k + 1) + '\\log_{' + a + '} ' + b + '$',
        '$P = ' + k + '\\log_{' + a + '} ' + b + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho $P = \\log_{' + a + '} \\dfrac{1}{' + a + '^{' + k + '} ' + b + '}$ với $' + a + ' > 0,\\; ' + a + ' \\ne 1,\\; ' + b + ' > 0$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$P = \\log_{' + a + '} ' + a + '^{-' + k + '} + \\log_{' + a + '} ' + b + '^{-1} = -' + k + ' - \\log_{' + a + '} ' + b + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { pairIdx: 0, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (-7 - log_a b)', params: { pairIdx: 0, k: 7 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Tính tổng log_a(a^p) + log_{root[n](a)}(a^q)
  t11_b19_d15_log_sum_two_terms_mc: {
    id: 't11_b19_d15_log_sum_two_terms_mc',
    name: 'Tính giá trị tổng log_a(a^p) + log_{ⁿ√a}(a^q)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Tính tổng P = log_a(a^p) + log_{root[n](a)}(a^q) = p + n·q.',
    conditionSummary: 'p ∈ [-6; -1], n ∈ [2; 5], q ∈ [2; 5], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến cơ số (0: a, 1: b, 2: x)', min: 0, max: 2 },
      { name: 'p', label: 'Số mũ p (âm)', min: -6, max: -1 },
      { name: 'n', label: 'Bậc căn n ở cơ số thứ hai', min: 2, max: 5 },
      { name: 'q', label: 'Số mũ q của số hạng thứ hai', min: 2, max: 5 },
    ],
    validateCode: `
      const { vIdx, p, n, q } = params;
      if (vIdx < 0 || vIdx > 2 || p >= 0 || n < 2 || q < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      if (p + n * q === 0) return { valid: false, reason: 'Tránh kết quả bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, p, n, q } = params;
      const v = ['a', 'b', 'x'][vIdx];
      const ans = p + n * q;
      const base2 = n === 2 ? '\\sqrt{' + v + '}' : '\\sqrt[' + n + ']{' + v + '}';
      const correct = '$' + ans + '$';
      const wrongs = ['$' + (ans + 4) + '$', '$' + (ans + 1) + '$', '$' + (ans - 1) + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho $' + v + ' > 0,\\; ' + v + ' \\ne 1$. Tính giá trị biểu thức $P = \\log_{' + v + '} ' + v + '^{' + p + '} + \\log_{' + base2 + '} ' + v + '^{' + q + '}$.',
        options,
        correctIndex,
        answerSummary: '$P = ' + ans + '$',
        solutionSteps: [
          '$P = ' + p + ' + ' + n + ' \\cdot ' + q + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ans = 0', params: { vIdx: 0, p: -4, n: 2, q: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (p=-3, n=4, q=2 -> 5)', params: { vIdx: 0, p: -3, n: 4, q: 2 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Rút gọn P = log_{a^m}(y^p) - log_a(y^q)
  t11_b19_d16_log_diff_squares_base_mc: {
    id: 't11_b19_d16_log_diff_squares_base_mc',
    name: 'Rút gọn biểu thức hiệu log_{a^m}(y^p) - log_a(y^q)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Rút gọn biểu thức lôgarit về dạng k·log_a y.',
    conditionSummary: 'm ∈ {2, 3}, t ∈ [1; 4], q ∈ [3; 9], q ≠ t',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp biến (0: (a,y), 1: (a,b), 2: (x,y))', min: 0, max: 2 },
      { name: 'm', label: 'Số mũ m ở cơ số đầu', min: 2, max: 3 },
      { name: 't', label: 'Tỉ số p/m', min: 1, max: 4 },
      { name: 'q', label: 'Số mũ q ở số hạng sau', min: 3, max: 9 },
    ],
    validateCode: `
      const { pairIdx, m, t, q } = params;
      if (pairIdx < 0 || pairIdx > 2 || m < 2 || t < 1 || q < 3 || q === t) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, m, t, q } = params;
      const [a, y] = [['a', 'y'], ['a', 'b'], ['x', 'y']][pairIdx];
      const p = m * t;
      const k = t - q;
      const fmtAns = (c) => '$P = ' + (c === 1 ? '' : c === -1 ? '-' : c) + '\\log_{' + a + '} ' + y + '$';

      const correct = fmtAns(k);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtAns(t + q), fmtAns(Math.abs(k) + 3), fmtAns(p - q === k ? k + 2 : p - q)],
        rng,
        (j) => fmtAns(k + j + 4)
      );
      return {
        stem: 'Cho $' + a + ', ' + y + '$ là các số thực dương khác $1$. Cho biểu thức $P = \\log_{' + a + '^{' + m + '}} ' + y + '^{' + p + '} - \\log_{' + a + '} ' + y + '^{' + q + '}$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$P = \\frac{' + p + '}{' + m + '}\\log_{' + a + '} ' + y + ' - ' + q + '\\log_{' + a + '} ' + y + ' = ' + k + '\\log_{' + a + '} ' + y + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = t', params: { pairIdx: 0, m: 2, t: 3, q: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (m=2, p=4, q=8 -> -6 log_a y)', params: { pairIdx: 0, m: 2, t: 2, q: 8 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Từ c^p d^q = b^r suy ra p log_b c + q log_b d = r
  t11_b19_d17_log_from_prod_eq_mc: {
    id: 't11_b19_d17_log_from_prod_eq_mc',
    name: 'Lôgarit hoá đẳng thức tích c^p · d^q = b^r',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Từ c^p · d^q = b^r (c, d > 0) suy ra p log_b c + q log_b d = r.',
    conditionSummary: 'b ∈ {2, 3, 5}, r ∈ [2; 4], p ∈ [2; 7], q ∈ [2; 5], p ≠ q',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'r', label: 'Số mũ r của vế phải b^r', min: 2, max: 4 },
      { name: 'p', label: 'Số mũ p của c', min: 2, max: 7 },
      { name: 'q', label: 'Số mũ q của d', min: 2, max: 5 },
    ],
    validateCode: `
      const { bIdx, r, p, q } = params;
      if (bIdx < 0 || bIdx > 2 || r < 2 || p < 2 || q < 2 || p === q) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, r, p, q } = params;
      const b = [2, 3, 5][bIdx];
      const rhs = Math.pow(b, r);
      const correct = '$' + p + '\\log_{' + b + '} c + ' + q + '\\log_{' + b + '} d = ' + r + '$';
      const wrongs = [
        '$' + p + '\\log_{' + b + '} c + ' + q + '\\log_{' + b + '} d = ' + rhs + '$',
        '$' + p + '\\log_{' + b + '} c - ' + q + '\\log_{' + b + '} d = ' + r + '$',
        '$' + q + '\\log_{' + b + '} c + ' + p + '\\log_{' + b + '} d = ' + r + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho các số thực dương $c, d$ thỏa mãn $c^{' + p + '} d^{' + q + '} = ' + rhs + '$. Mệnh đề nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Lấy lôgarit cơ số $' + b + '$ hai vế của $c^{' + p + '} d^{' + q + '} = ' + b + '^{' + r + '}$, ta được $' + p + '\\log_{' + b + '} c + ' + q + '\\log_{' + b + '} d = ' + r + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { bIdx: 0, r: 3, p: 4, q: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (c^6 d^2 = 8 -> 6log_2 c + 2log_2 d = 3)', params: { bIdx: 0, r: 3, p: 6, q: 2 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Từ a^p / b^q = b0^r suy ra p log_{b0} a - q log_{b0} b = r
  t11_b19_d18_log_from_quot_eq_mc: {
    id: 't11_b19_d18_log_from_quot_eq_mc',
    name: 'Lôgarit hoá đẳng thức thương a^p / b^q = b₀^r',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Từ a^p / b^q = b0^r (a, b > 0) suy ra p log_{b0} a - q log_{b0} b = r.',
    conditionSummary: 'b0 ∈ {2, 3, 5}, r ∈ [2; 4], p ∈ [2; 7], q ∈ [2; 5], p ≠ q',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b0 ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'r', label: 'Số mũ r của vế phải', min: 2, max: 4 },
      { name: 'p', label: 'Số mũ p của a', min: 2, max: 7 },
      { name: 'q', label: 'Số mũ q của b', min: 2, max: 5 },
    ],
    validateCode: `
      const { bIdx, r, p, q } = params;
      if (bIdx < 0 || bIdx > 2 || r < 2 || p < 2 || q < 2 || p === q) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, r, p, q } = params;
      const b0 = [2, 3, 5][bIdx];
      const rhs = Math.pow(b0, r);
      const correct = '$' + p + '\\log_{' + b0 + '} a - ' + q + '\\log_{' + b0 + '} b = ' + r + '$';
      const wrongs = [
        '$' + p + '\\log_{' + b0 + '} a - ' + q + '\\log_{' + b0 + '} b = ' + rhs + '$',
        '$' + p + '\\log_{' + b0 + '} a + ' + q + '\\log_{' + b0 + '} b = ' + r + '$',
        '$' + q + '\\log_{' + b0 + '} a + ' + p + '\\log_{' + b0 + '} b = ' + r + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho các số thực dương $a, b$ thỏa mãn $\\dfrac{a^{' + p + '}}{b^{' + q + '}} = ' + rhs + '$. Mệnh đề nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Lấy lôgarit cơ số $' + b0 + '$ hai vế của $\\dfrac{a^{' + p + '}}{b^{' + q + '}} = ' + b0 + '^{' + r + '}$, ta được $' + p + '\\log_{' + b0 + '} a - ' + q + '\\log_{' + b0 + '} b = ' + r + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { bIdx: 0, r: 3, p: 5, q: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (a^6/b^2 = 8 -> 6log_2 a - 2log_2 b = 3)', params: { bIdx: 0, r: 3, p: 6, q: 2 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Tính tổng log_b(b^{e1}/m) + log_b(m·b^{e2}) = e1 + e2
  t11_b19_d19_log_sum_to_power_mc: {
    id: 't11_b19_d19_log_sum_to_power_mc',
    name: 'Tính tổng hai lôgarit cùng cơ số đưa về luỹ thừa cơ số b',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Tính log_b(b^{e1}/m) + log_b(m·b^{e2}) = e1 + e2.',
    conditionSummary: 'b ∈ {2, 3, 5}, m ∈ {2, 3, 4, 6, 7}, gcd(b, m) = 1, e1 ∈ [2; 4], e2 ∈ [3; 6]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'm', label: 'Thừa số rút gọn m', min: 2, max: 7 },
      { name: 'e1', label: 'Số mũ e1 ở phân số đầu', min: 2, max: 4 },
      { name: 'e2', label: 'Số mũ e2 ở số hạng sau', min: 3, max: 6 },
    ],
    validateCode: `
      const { bIdx, m, e1, e2 } = params;
      if (bIdx < 0 || bIdx > 2 || m < 2 || e1 < 2 || e2 < 3) return { valid: false, reason: 'Tham số ngoài miền' };
      const b = [2, 3, 5][bIdx];
      if (u.gcd(b, m) !== 1) return { valid: false, reason: 'Cần gcd(b, m) = 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, m, e1, e2 } = params;
      const b = [2, 3, 5][bIdx];
      const p1 = Math.pow(b, e1);
      const p2 = m * Math.pow(b, e2);
      const ans = e1 + e2;

      const correct = '$' + ans + '$';
      const wrongs = ['$' + (2 * ans) + '$', '$' + (ans + 2) + '$', '$' + (ans - 2) + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tính giá trị biểu thức $P = \\log_{' + b + '} \\dfrac{' + p1 + '}{' + m + '} + \\log_{' + b + '} ' + p2 + '$.',
        options,
        correctIndex,
        answerSummary: '$P = ' + ans + '$',
        solutionSteps: [
          '$P = \\log_{' + b + '} \\left(\\dfrac{' + p1 + '}{' + m + '} \\cdot ' + p2 + '\\right) = \\log_{' + b + '} \\left(' + b + '^{' + e1 + '} \\cdot ' + b + '^{' + e2 + '}\\right) = \\log_{' + b + '} ' + b + '^{' + ans + '} = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên gcd(b, m) > 1', params: { bIdx: 2, m: 5, e1: 4, e2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (log_5(625/6) + log_5(18750) = 9)', params: { bIdx: 2, m: 6, e1: 4, e2: 5 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Biểu diễn log(p^k · 10^m) theo a = log p
  t11_b19_d20_log10_decimal_mc: {
    id: 't11_b19_d20_log10_decimal_mc',
    name: 'Biểu diễn lôgarit thập phân theo a = log 2 (hoặc log 5)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Biết log p = a (p ∈ {2, 5}), biểu diễn log(p^k · 10^m) = ka + m.',
    conditionSummary: 'p ∈ {2, 5}, k ∈ [2; 4], m ∈ [3; 6], k ≠ m',
    paramSpecs: [
      { name: 'pIdx', label: 'Cơ số trong log thập phân (0: 2, 1: 5)', min: 0, max: 1 },
      { name: 'k', label: 'Số mũ k của p', min: 2, max: 4 },
      { name: 'm', label: 'Số chữ số 0 (10^m)', min: 3, max: 6 },
    ],
    validateCode: `
      const { pIdx, k, m } = params;
      if ((pIdx !== 0 && pIdx !== 1) || k < 2 || m < 3 || k === m) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pIdx, k, m } = params;
      const p = pIdx === 0 ? 2 : 5;
      const N = Math.pow(p, k) * Math.pow(10, m);

      const correct = '$' + k + 'a + ' + m + '$';
      const wrongs = [
        '$' + (k * m) + 'a$',
        '$' + (m + 1) + ' - ' + (k * m) + 'a$',
        '$' + m + 'a - ' + k + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho $\\log ' + p + ' = a$. Biểu diễn $\\log ' + N + '$ theo $a$ ta được:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\log ' + N + ' = \\log(' + p + '^{' + k + '} \\cdot 10^{' + m + '}) = ' + k + '\\log ' + p + ' + ' + m + ' = ' + k + 'a + ' + m + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = m', params: { pIdx: 0, k: 3, m: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (log 800000 = 3a + 5)', params: { pIdx: 0, k: 3, m: 5 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Biểu diễn log_B M theo a = log_c p1, b = log_c p2
  t11_b19_d21_log_express_ab_mc: {
    id: 't11_b19_d21_log_express_ab_mc',
    name: 'Biểu diễn log_B(M) theo a = log_c(p1) và b = log_c(p2)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Phân tích B và M ra thừa số nguyên tố để biểu diễn log_B(M) theo a và b.',
    conditionSummary: 'u1 ∈ [1; 3], v1 ∈ [2; 4], u2 ∈ [1; 2], v2 ∈ [2; 6], chọn (c, p1, p2) hợp lí',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ số nguyên tố (c, p1, p2) (0..2)', min: 0, max: 2 },
      { name: 'u1', label: 'Số mũ p1 trong cơ số B', min: 1, max: 3 },
      { name: 'v1', label: 'Số mũ c trong cơ số B', min: 2, max: 4 },
      { name: 'u2', label: 'Số mũ p2 trong M', min: 1, max: 2 },
      { name: 'v2', label: 'Số mũ c trong M', min: 2, max: 6 },
    ],
    validateCode: `
      const { setIdx, u1, v1, u2, v2 } = params;
      if (setIdx < 0 || setIdx > 2 || u1 < 1 || v1 < 2 || u2 < 1 || v2 < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, u1, v1, u2, v2 } = params;
      const SETS = [
        [3, 2, 5],
        [2, 3, 5],
        [3, 2, 7],
      ];
      const [c, p1, p2] = SETS[setIdx];
      const B = Math.pow(p1, u1) * Math.pow(c, v1);
      const M = Math.pow(p2, u2) * Math.pow(c, v2);

      const numStr = (u2 === 1 ? 'b' : u2 + 'b') + ' + ' + v2;
      const denStr = (u1 === 1 ? 'a' : u1 + 'a') + ' + ' + v1;
      const correct = '$P = \\dfrac{' + numStr + '}{' + denStr + '}$';

      const w1 = '$P = \\dfrac{' + v2 + 'b + ' + v1 + '}{' + (u1 === 1 ? 'a' : u1 + 'a') + '}$';
      const w2 = '$P = \\dfrac{' + v2 + 'b}{' + (u1 === 1 ? 'a' : u1 + 'a') + ' + ' + (v1 + 1) + '}$';
      const w3 = '$P = \\dfrac{' + (u2 === 1 ? 'b' : u2 + 'b') + ' - ' + v2 + '}{' + (u1 === 1 ? 'a' : u1 + 'a') + ' - ' + (2 * v1) + '}$';

      const { options, correctIndex } = u.buildUniqueMcOptions(correct, [w1, w2, w3], rng);
      return {
        stem: 'Cho $a = \\log_{' + c + '} ' + p1 + ',\\; b = \\log_{' + c + '} ' + p2 + '$. Hãy biểu diễn $\\log_{' + B + '} ' + M + '$ theo $a$ và $b$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phân tích $' + B + ' = ' + p1 + '^{' + u1 + '} \\cdot ' + c + '^{' + v1 + '}$ và $' + M + ' = ' + p2 + '^{' + u2 + '} \\cdot ' + c + '^{' + v2 + '}$.',
          'Do đó $\\log_{' + B + '} ' + M + ' = \\dfrac{\\log_{' + c + '}(' + p2 + '^{' + u2 + '} \\cdot ' + c + '^{' + v2 + '})}{\\log_{' + c + '}(' + p1 + '^{' + u1 + '} \\cdot ' + c + '^{' + v1 + '})} = \\dfrac{' + numStr + '}{' + denStr + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, u1: 2, v1: 4, u2: 1, v2: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (log_324 3645 = (b+6)/(2a+4))', params: { setIdx: 0, u1: 2, v1: 4, u2: 1, v2: 6 }, expectedValid: true },
    ],
  },
};
