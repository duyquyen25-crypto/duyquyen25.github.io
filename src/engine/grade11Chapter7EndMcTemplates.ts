import { MathTemplate } from '../types/math';

export const G11_C7_END_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Tìm khẳng định đúng)
  t11_c7_bt_d01_proj_prop_correct_mc: {
    id: 't11_c7_bt_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Nhận biết khẳng định đúng về tính chất của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề đúng (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (!Number.isInteger(params.mode) || params.mode < 0 || params.mode > 3) {
        return { valid: false, reason: 'mode phải là số nguyên trong [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
          wrongs: [
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song bảo toàn hình dạng của một hình',
          ],
          sol: 'Khi ba đường thẳng đồng quy không nằm trong mặt phẳng song song với phương chiếu, phép chiếu song song biến chúng thành ba đường thẳng đồng quy (tính chất thẳng hàng và giao điểm được bảo toàn).',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự của chúng',
          wrongs: [
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song bảo toàn diện tích của mọi đa giác',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng và thứ tự giữa ba điểm thẳng hàng.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn góc giữa hai đường thẳng',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
            'Phép chiếu song song biến mọi hình vuông thành hình vuông',
          ],
          sol: 'Với hai đường thẳng song song không song song với phương chiếu, ảnh của chúng qua phép chiếu song song là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn chu vi của mọi tam giác',
            'Phép chiếu song song biến mọi hình thoi thành hình chữ nhật',
            'Phép chiếu song song luôn giữ nguyên độ dài của đoạn thẳng',
          ],
          sol: 'Tỉ số độ dài của hai đoạn thẳng nằm trên cùng một đường thẳng hoặc trên hai đường thẳng song song được bảo toàn qua phép chiếu song song.',
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
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Tính chất phép chiếu song song (Tìm khẳng định sai)
  t11_c7_bt_d02_proj_prop_wrong_mc: {
    id: 't11_c7_bt_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Nhận biết khẳng định sai về tính chất của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề sai (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (!Number.isInteger(params.mode) || params.mode < 0 || params.mode > 3) {
        return { valid: false, reason: 'mode phải là số nguyên trong [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          ],
          sol: 'Khẳng định đã cho sai vì hình chiếu song song của hai đường thẳng song song nói chung là hai đường thẳng song song hoặc trùng nhau, không phải luôn trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Hình chiếu song song của trung điểm đoạn thẳng là trung điểm hình chiếu của đoạn thẳng đó',
            'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng cùng nằm trên một đường thẳng',
          ],
          sol: 'Khẳng định đã cho sai vì phép chiếu song song nói chung không bảo toàn số đo góc nên không bảo toàn tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song có thể biến đường tròn thành một điểm',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Phép chiếu song song có thể biến đường tròn thành một đường tròn',
          ],
          sol: 'Khẳng định đã cho sai vì hình chiếu song song của một đường tròn chỉ có thể là đường elip, đường tròn hoặc một đoạn thẳng, không thể suy biến thành một điểm.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn diện tích của một tam giác',
          wrongs: [
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Phép chiếu song song biến hình bình hành (mặt phẳng không chứa phương chiếu) thành hình bình hành',
            'Phép chiếu song song biến đường thẳng (không song song phương chiếu) thành đường thẳng',
          ],
          sol: 'Khẳng định đã cho sai vì phép chiếu song song nói chung làm thay đổi độ dài và góc nên không bảo toàn diện tích.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Khẳng định nào sau đây sai?',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = -1', params: { mode: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của các hình phẳng (đường tròn, tam giác, tứ giác)
  t11_c7_bt_d03_proj_shape_correct_mc: {
    id: 't11_c7_bt_d03_proj_shape_correct_mc',
    name: 'Hình chiếu song song của hình phẳng (đường tròn, tam giác, tứ giác)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Nhận biết khẳng định đúng về hình chiếu song song của đường tròn, tam giác và tứ giác đặc biệt.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể nhận diện hình chiếu (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (!Number.isInteger(params.mode) || params.mode < 0 || params.mode > 3) {
        return { valid: false, reason: 'mode phải là số nguyên trong [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của một đường tròn là một đường elip, một đường tròn hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của hình thang là một hình chữ nhật',
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
            'Hình chiếu song song của tam giác vuông luôn là một tam giác vuông',
          ],
          sol: 'Tùy theo vị trí tương đối giữa mặt phẳng chứa đường tròn với phương chiếu và mặt phẳng chiếu, hình chiếu song song của đường tròn có thể là đường elip, đường tròn hoặc một đoạn thẳng.',
        },
        {
          correct: 'Hình chiếu song song của một tam giác đều có thể là một tam giác bất kì hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của một tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của hình vuông luôn có bốn góc vuông',
            'Hình chiếu song song của hình thang cân luôn là một hình thang cân',
          ],
          sol: 'Phép chiếu song song không bảo toàn góc và độ dài nên hình chiếu của tam giác đều có thể là một tam giác thường (hoặc suy biến thành đoạn thẳng nếu mặt phẳng tam giác song song phương chiếu).',
        },
        {
          correct: 'Hình chiếu song song của một hình bình hành lên mặt phẳng không chứa phương chiếu là một hình bình hành hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của một hình bình hành luôn là một hình chữ nhật',
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ số hai cạnh kề',
            'Hình chiếu song song của tam giác cân luôn là một tam giác vuông',
          ],
          sol: 'Vì phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau nên các cặp cạnh đối song song của hình bình hành vẫn song song (hoặc trùng nhau thành đoạn thẳng).',
        },
        {
          correct: 'Hình chiếu song song của một hình thang lên mặt phẳng không song song với mặt phẳng hình thang (khi mặt phẳng hình thang không song song phương chiếu) là một hình thang',
          wrongs: [
            'Hình chiếu song song của một đường tròn có thể là một đường parabol',
            'Hình chiếu song song của hình thoi luôn là một hình thoi',
            'Hình chiếu song song của tam giác vuông luôn bảo toàn góc vuông',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song của hai cạnh đáy và tỉ số độ dài trên hai đường thẳng song song nên hình chiếu của hình thang trong trường hợp không suy biến vẫn là một hình thang.',
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
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Hình chiếu song song của đỉnh lên mặt bên lăng trụ ABC.A1B1C1 theo phương cạnh đáy
  t11_c7_bt_d04_prism_proj_point_side_mc: {
    id: 't11_c7_bt_d04_prism_proj_point_side_mc',
    name: 'Hình chiếu song song của một đỉnh lên mặt bên hình lăng trụ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Xác định hình chiếu song song của một đỉnh lăng trụ lên mặt bên theo phương song song một cạnh đáy.',
    conditionSummary: 'setIdx ∈ [0; 2], variant ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'variant', label: 'Biến thể đỉnh và mặt chiếu (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, variant } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 2) {
        return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      }
      if (!Number.isInteger(variant) || variant < 0 || variant > 3) {
        return { valid: false, reason: 'variant ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, variant } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1' },
        { A: 'M', B: 'N', C: 'P', A1: 'M_1', B1: 'N_1', C1: 'P_1' },
        { A: 'D', B: 'E', C: 'F', A1: 'D_1', B1: 'E_1', C1: 'F_1' },
      ];
      const s = SETS[setIdx];
      const prismName = s.A + s.B + s.C + '.' + s.A1 + s.B1 + s.C1;

      const CASES = [
        {
          pt: s.A1,
          plane: s.B + s.C + s.C1 + s.B1,
          dir: s.A + s.C,
          ans: s.C1,
          wrongs: [s.C, s.A, s.B],
          parallelEdge: s.A1 + s.C1,
        },
        {
          pt: s.A1,
          plane: s.B + s.C + s.C1 + s.B1,
          dir: s.A + s.B,
          ans: s.B1,
          wrongs: [s.B, s.A, s.C],
          parallelEdge: s.A1 + s.B1,
        },
        {
          pt: s.B,
          plane: s.A + s.C + s.C1 + s.A1,
          dir: s.B + s.C,
          ans: s.C,
          wrongs: [s.C1, s.B1, s.A],
          parallelEdge: s.B + s.C,
        },
        {
          pt: s.C1,
          plane: s.A + s.B + s.B1 + s.A1,
          dir: s.C + s.A,
          ans: s.A1,
          wrongs: [s.A, s.C, s.B1],
          parallelEdge: s.C1 + s.A1,
        },
      ];
      const c = CASES[variant];
      const correct = 'Điểm $' + c.ans + '$';
      const wrongs = c.wrongs.map((w) => 'Điểm $' + w + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $' + prismName + '$. Hình chiếu song song của điểm $' + c.pt + '$ lên mặt phẳng $(' + c.plane + ')$ theo phương $' + c.dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì hai đáy của lăng trụ là các tam giác bằng nhau có các cạnh tương ứng song song nên đường thẳng đi qua $' + c.pt + '$ song song với $' + c.dir + '$ chính là đường thẳng $' + c.parallelEdge + '$.',
          'Do $' + c.ans + ' \\in (' + c.plane + ')$ nên hình chiếu song song cần tìm là điểm $' + c.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên variant = 4', params: { setIdx: 0, variant: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { setIdx: 0, variant: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hình chiếu song song của đỉnh lên mặt đáy lăng trụ ABC.DEF theo phương cạnh bên
  t11_c7_bt_d05_prism_proj_point_base_mc: {
    id: 't11_c7_bt_d05_prism_proj_point_base_mc',
    name: 'Hình chiếu song song của một đỉnh lên mặt đáy hình lăng trụ theo phương cạnh bên',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Xác định hình chiếu song song của một đỉnh lăng trụ ABC.DEF lên mặt đáy theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], variant ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'variant', label: 'Biến thể đỉnh và phương chiếu (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, variant } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 2) {
        return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      }
      if (!Number.isInteger(variant) || variant < 0 || variant > 3) {
        return { valid: false, reason: 'variant ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, variant } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F' },
        { A: 'M', B: 'N', C: 'P', D: 'Q', E: 'R', F: 'S' },
        { A: 'P', B: 'Q', C: 'R', D: 'X', E: 'Y', F: 'Z' },
      ];
      const s = SETS[setIdx];
      const base = s.A + s.B + s.C;
      const top = s.D + s.E + s.F;
      const prismName = base + '.' + top;

      const CASES = [
        {
          pt: s.A,
          plane: top,
          dir: s.B + s.E,
          ans: s.D,
          wrongs: [s.F, s.A, s.B],
          edge: s.A + s.D,
        },
        {
          pt: s.B,
          plane: top,
          dir: s.C + s.F,
          ans: s.E,
          wrongs: [s.D, s.B, s.C],
          edge: s.B + s.E,
        },
        {
          pt: s.C,
          plane: top,
          dir: s.A + s.D,
          ans: s.F,
          wrongs: [s.E, s.C, s.A],
          edge: s.C + s.F,
        },
        {
          pt: s.E,
          plane: base,
          dir: s.A + s.D,
          ans: s.B,
          wrongs: [s.A, s.E, s.D],
          edge: s.E + s.B,
        },
      ];
      const c = CASES[variant];
      const correct = 'Điểm $' + c.ans + '$';
      const wrongs = c.wrongs.map((w) => 'Điểm $' + w + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $' + prismName + '$. Hình chiếu song song của điểm $' + c.pt + '$ lên mặt phẳng $(' + c.plane + ')$ theo phương $' + c.dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.D, tF: s.E, tR: s.F },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Các cạnh bên của hình lăng trụ song song và bằng nhau, nên đường thẳng đi qua $' + c.pt + '$ song song với $' + c.dir + '$ là $' + c.edge + '$.',
          'Giao điểm của đường thẳng $' + c.edge + '$ với mặt phẳng $(' + c.plane + ')$ là điểm $' + c.ans + '$, nên hình chiếu cần tìm là điểm $' + c.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, variant: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5', params: { setIdx: 0, variant: 0 }, expectedValid: true },
    ],
  },
};
