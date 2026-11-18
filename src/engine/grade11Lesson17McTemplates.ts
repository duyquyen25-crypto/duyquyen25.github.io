import { MathTemplate } from '../types/math';

export const G11_B17_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Khẳng định đúng về ảnh hai đường thẳng song song qua phép chiếu song song
  t11_b17_d01_proj_prop_correct_mc: {
    id: 't11_b17_d01_proj_prop_correct_mc',
    name: 'Nhận biết ảnh của hai đường thẳng song song qua phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Nhận biết khẳng định đúng về tính chất của phép chiếu song song.',
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
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song (không trùng phương chiếu) là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự của chúng',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn diện tích tam giác',
            'Phép chiếu song song biến hai đường thẳng vuông góc thành hai đường thẳng vuông góc',
            'Phép chiếu song song bảo toàn độ lớn mọi góc',
          ],
          sol: 'Phép chiếu song song bảo toàn sự thẳng hàng và thứ tự của ba điểm thẳng hàng.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn độ dài đoạn thẳng',
            'Phép chiếu song song biến hai đường thẳng chéo nhau luôn thành hai đường thẳng cắt nhau',
            'Phép chiếu song song biến mọi hình thoi thành hình thoi',
          ],
          sol: 'Phép chiếu song song không thay đổi tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc trên hai đường thẳng song song.',
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
      { label: 'Mẫu chuẩn Q1 (hai đường thẳng song song)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Khẳng định sai về bảo toàn độ dài qua phép chiếu song song
  t11_b17_d02_proj_prop_wrong_mc: {
    id: 't11_b17_d02_proj_prop_wrong_mc',
    name: 'Nhận biết khẳng định sai về bảo toàn độ dài qua phép chiếu song song',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Phân biệt tính chất không được bảo toàn qua phép chiếu song song (độ dài, góc, tính vuông góc).',
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
        'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
        'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
        'Phép chiếu song song có thể biến đường tròn thành đường elip',
      ];
      const FALSE_STMTS = [
        {
          stmt: 'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
          sol: 'Phép chiếu song song không bảo toàn độ dài đoạn thẳng (độ dài ảnh phụ thuộc phương chiếu và có thể bằng $0$ nếu đoạn thẳng song song phương chiếu).',
        },
        {
          stmt: 'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
          sol: 'Phép chiếu song song không bảo toàn góc nên hai đường thẳng vuông góc có thể có ảnh không vuông góc.',
        },
        {
          stmt: 'Phép chiếu song song biến tam giác cân luôn thành tam giác cân',
          sol: 'Vì độ dài và góc không được bảo toàn nên hình chiếu song song của tam giác cân nói chung là một tam giác bất kì (hoặc đoạn thẳng).',
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
      { label: 'Mẫu chuẩn Q2 (bảo toàn độ dài)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của hình vuông / hình bình hành
  t11_b17_d03_proj_square_parallelogram_mc: {
    id: 't11_b17_d03_proj_square_parallelogram_mc',
    name: 'Hình chiếu song song của hình vuông và tứ giác đặc biệt (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Nhận biết ảnh của hình vuông, hình chữ nhật, hình thoi qua phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể (0: hình vuông, 1: hình chữ nhật, 2: hình thoi)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hình vuông là một hình bình hành (khi mặt phẳng chứa hình vuông không song song phương chiếu)',
          wrongs: [
            'Hình chiếu song song của tam giác vuông luôn là một tam giác vuông',
            'Hình chiếu song song của hình thoi luôn cho một hình thoi',
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
          ],
          sol: 'Hình vuông có các cặp cạnh đối song song nên hình chiếu song song của nó lên mặt phẳng không song song phương chiếu là một hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình chữ nhật (trong mặt phẳng không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn là hình chữ nhật',
            'Hình chiếu song song của hình vuông luôn có hai đường chéo vuông góc',
            'Hình chiếu song song của hình thang cân luôn là hình chữ nhật',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song nhưng không bảo toàn góc vuông và độ dài, nên ảnh của hình chữ nhật nói chung là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình thoi (trong mặt phẳng không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình thoi luôn là hình vuông',
            'Hình chiếu song song của tam giác đều luôn là tam giác đều',
            'Hình chiếu song song của đường tròn luôn là đường tròn',
          ],
          sol: 'Do bảo toàn tính song song các cạnh đối, hình chiếu song song của hình thoi là một hình bình hành.',
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
      { label: 'Mẫu chuẩn Q3 (hình vuông -> hình bình hành)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Chiếu đỉnh lăng trụ ABC.A'B'C' lên đáy dưới theo phương cạnh bên
  t11_b17_d04_prism_proj_base_mc: {
    id: 't11_b17_d04_prism_proj_base_mc',
    name: 'Hình chiếu song song đỉnh lăng trụ ABC.A\'B\'C\' lên mặt đáy theo phương cạnh bên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Tìm hình chiếu song song của đỉnh đáy trên lăng trụ ABC.A\'B\'C\' lên (ABC) theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh được chiếu (0: A\', 1: B\', 2: C\')', min: 0, max: 2 },
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
        { b: ['M', 'N', 'P'], t: ["M'", "N'", "P'"] },
      ];
      const s = SETS[setIdx];
      const src = s.t[vIdx];
      const img = s.b[vIdx];
      const dirIdx = (vIdx + 1) % 3;
      const dir = s.b[dirIdx] + s.t[dirIdx];
      const base = s.b.join('');

      const w1 = s.b[(vIdx + 1) % 3];
      const w2 = s.t[(vIdx + 2) % 3];
      const w3 = s.t[(vIdx + 1) % 3];

      const correct = 'Điểm $' + img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + src + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + dir + '$ là điểm nào?',
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
          'Vì các cạnh bên song song với nhau nên $' + src + img + ' \\parallel ' + dir + '$ và $' + img + ' \\in (' + base + ')$. Vậy hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { setIdx: 0, vIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (A\' theo BB\' lên (ABC) -> A)', params: { setIdx: 0, vIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu đỉnh lăng trụ ABC.DEF lên đáy dưới theo phương cạnh bên
  t11_b17_d05_prism_proj_def_mc: {
    id: 't11_b17_d05_prism_proj_def_mc',
    name: 'Hình chiếu song song đỉnh lăng trụ ABC.DEF lên mặt đáy theo phương cạnh bên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Tìm hình chiếu song song của đỉnh đáy trên lăng trụ ABC.DEF lên đáy dưới theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh được chiếu (0: D, 1: E, 2: F)', min: 0, max: 2 },
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
        { b: ['M', 'N', 'P'], t: ['D', 'E', 'F'] },
        { b: ['P', 'Q', 'R'], t: ['X', 'Y', 'Z'] },
      ];
      const s = SETS[setIdx];
      const src = s.t[vIdx];
      const img = s.b[vIdx];
      const dirIdx = (vIdx + 1) % 3;
      const dir = s.t[dirIdx] + s.b[dirIdx];
      const base = s.b.join('');

      const w1 = s.t[(vIdx + 1) % 3];
      const w2 = s.b[(vIdx + 2) % 3];
      const w3 = s.b[(vIdx + 1) % 3];

      const correct = 'Điểm $' + img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + src + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + dir + '$ là điểm nào?',
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
          'Do $' + src + img + ' \\parallel ' + dir + '$ và $' + img + ' \\in (' + base + ')$ nên hình chiếu song song của điểm $' + src + '$ lên $(' + base + ')$ theo phương $' + dir + '$ là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, vIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (E theo FC lên (ABC) -> B)', params: { setIdx: 0, vIdx: 1 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Định nghĩa hàm số liên tục tại một điểm x = x0
  t11_b17_d06_continuity_def_at_point_mc: {
    id: 't11_b17_d06_continuity_def_at_point_mc',
    name: 'Nhận biết điều kiện hàm số liên tục tại một điểm theo định nghĩa',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Nhận biết công thức lim_{x -> x0} g(x) = g(x0) định nghĩa tính liên tục tại x0 ∈ D.',
    conditionSummary: 'x0 ∈ [-5; 5], fnIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'x0', label: 'Điểm x0 ∈ D', min: -5, max: 5 },
      { name: 'fnIdx', label: 'Tên hàm số (0: g, 1: f, 2: h)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.fnIdx < 0 || params.fnIdx > 2) return { valid: false, reason: 'fnIdx ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, fnIdx } = params;
      const fn = ['g', 'f', 'h'][fnIdx];
      const correct = '$\\lim \\limits_{x \\to ' + x0 + '} ' + fn + '(x) = ' + fn + '(' + x0 + ')$';
      const wrongs = [
        '$\\lim \\limits_{x \\to -\\infty} ' + fn + '(x) = ' + fn + '(' + x0 + ')$',
        '$\\lim \\limits_{x \\to ' + x0 + '} ' + fn + '(x) = +\\infty$',
        '$\\lim \\limits_{x \\to ' + x0 + '} ' + fn + '(' + x0 + ') = ' + fn + '(x)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hàm số $y = ' + fn + '(x)$ xác định trên $D$ và $' + x0 + ' \\in D$. Hàm số $y = ' + fn + '(x)$ liên tục tại $x = ' + x0 + '$ khi:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo định nghĩa, hàm số $y = ' + fn + '(x)$ xác định trên khoảng chứa $' + x0 + '$ liên tục tại $x = ' + x0 + '$ khi và chỉ khi $\\lim \\limits_{x \\to ' + x0 + '} ' + fn + '(x) = ' + fn + '(' + x0 + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên fnIdx = 3', params: { x0: 1, fnIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (x0=1, hàm g)', params: { x0: 1, fnIdx: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Tính liên tục của hàm căn thức y = √(ax + b)
  t11_b17_d07_continuity_sqrt_domain_mc: {
    id: 't11_b17_d07_continuity_sqrt_domain_mc',
    name: 'Xác định điểm liên tục của hàm số căn thức bậc hai y = √(ax + b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Nhận biết hàm số y = √(ax + b) liên tục trên khoảng xác định (x0; +∞).',
    conditionSummary: 'a ∈ [2; 5], x0 ∈ [-3; 4]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số x dưới căn (dương)', min: 2, max: 5 },
      { name: 'x0', label: 'Đầu mút tập xác định x0', min: -3, max: 4 },
    ],
    validateCode: `
      const { a, x0 } = params;
      if (a < 2 || a > 5 || x0 < -3 || x0 > 4) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x0 } = params;
      const b = -a * x0;
      const inner = u.formatLinear(a, b);
      const pGood = x0 + 3;
      const pBadLeft = x0 - 14;
      const pOther = x0 + 7;

      const correct = 'Hàm số liên tục tại điểm $x = ' + pGood + '$';
      const wrongs = [
        'Hàm số liên tục tại điểm $x = ' + x0 + '$',
        'Hàm số liên tục tại điểm $x = ' + pBadLeft + '$',
        'Hàm số gián đoạn tại điểm $x = ' + pOther + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hàm số $y = \\sqrt{' + inner + '}$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập xác định của hàm số là $D = [' + x0 + '; +\\infty)$. Hàm số liên tục trên khoảng $(' + x0 + '; +\\infty)$ (tại $x = ' + x0 + '$ hàm chỉ liên tục phải).',
          'Vì $' + pGood + ' \\in (' + x0 + '; +\\infty)$ nên hàm số liên tục tại điểm $x = ' + pGood + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, x0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (√(2x-2), x0=1 -> liên tục tại x=4)', params: { a: 2, x0: 1 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Điểm gián đoạn của phân thức có mẫu bậc nhất
  t11_b17_d08_discontinuity_linear_den_mc: {
    id: 't11_b17_d08_discontinuity_linear_den_mc',
    name: 'Tìm điểm gián đoạn của hàm phân thức có mẫu bậc nhất',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Tìm nghiệm của mẫu thức ax + b trên mẫu cx + d để xác định điểm gián đoạn.',
    conditionSummary: 'a ∈ [-7; 7]\\{0}, b ∈ [-9; 9]\\{0}, k ∈ [1; 3], x0 ∈ [-7; 7]\\{0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số x ở tử', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hằng số ở tử', min: -9, max: 9, allowZero: false },
      { name: 'k', label: 'Hệ số x ở mẫu', min: 1, max: 3 },
      { name: 'x0', label: 'Điểm gián đoạn x0', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      const { a, b, k, x0 } = params;
      if (a === 0 || b === 0 || k < 1 || x0 === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (a * x0 + b === 0) return { valid: false, reason: 'Tử triệt tiêu tại x0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k, x0 } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(k, -k * x0);
      const correct = '$x = ' + x0 + '$';
      const wrongs = [
        '$x = ' + (x0 + 10) + '$',
        '$x = ' + (x0 + 5) + '$',
        '$x = ' + (-x0) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (t) => '$x = ' + (x0 + t + 2) + '$'
      );
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Hàm số gián đoạn tại điểm nào sau đây?',
        options,
        correctIndex,
        answerSummary: '$x = ' + x0 + '$',
        solutionSteps: [
          'Hàm phân thức hữu tỉ gián đoạn tại điểm làm mẫu thức bằng $0$: $' + denStr + ' = 0 \\Leftrightarrow x = ' + x0 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tử bằng 0 tại x0', params: { a: 2, b: 6, k: 1, x0: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 ((6x+8)/(x+3) -> x=-3)', params: { a: 6, b: 8, k: 1, x0: -3 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Điểm gián đoạn của phân thức có mẫu bậc hai
  t11_b17_d09_discontinuity_quad_den_mc: {
    id: 't11_b17_d09_discontinuity_quad_den_mc',
    name: 'Tìm điểm gián đoạn của hàm phân thức có mẫu bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Tìm một điểm gián đoạn trong các nghiệm của tam thức bậc hai ở mẫu.',
    conditionSummary: 'c1 ∈ [-7; 7]\\{0}, c0 ∈ [-9; 9]\\{0}, a ∈ {1, 2, -2}, r1, r2 ∈ [-8; 8], r1 ≠ r2',
    paramSpecs: [
      { name: 'c1', label: 'Hệ số x ở tử', min: -6, max: 6, allowZero: false },
      { name: 'c0', label: 'Hằng số ở tử', min: -8, max: 8, allowZero: false },
      { name: 'a', label: 'Hệ số x^2 ở mẫu', min: 1, max: 2 },
      { name: 'r1', label: 'Nghiệm thứ nhất của mẫu', min: -8, max: -1 },
      { name: 'r2', label: 'Nghiệm thứ hai của mẫu', min: 1, max: 8 },
    ],
    validateCode: `
      const { c1, c0, a, r1, r2 } = params;
      if (c1 === 0 || c0 === 0 || a < 1 || r1 >= r2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c1, c0, a, r1, r2 } = params;
      const numStr = u.formatLinear(c1, c0);
      const denStr = u.formatQuadratic(a, -a * (r1 + r2), a * r1 * r2);

      const used = new Set([r1, r2]);
      const pickOther = (start) => {
        let v = start;
        while (used.has(v)) v++;
        used.add(v);
        return v;
      };
      const w1 = pickOther(r2 - 2);
      const w2 = pickOther(2);
      const w3 = pickOther(r2 + 3);

      const correct = '$x = ' + r2 + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + w1 + '$', '$x = ' + w2 + '$', '$x = ' + w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Hàm số gián đoạn tại điểm nào sau đây?',
        options,
        correctIndex,
        answerSummary: '$x = ' + r2 + '$',
        solutionSteps: [
          'Hàm số gián đoạn tại các giá trị làm mẫu thức bằng $0$: $' + denStr + ' = 0 \\Leftrightarrow x = ' + r1 + '$ hoặc $x = ' + r2 + '$.',
          'Trong các phương án đã cho, hàm số gián đoạn tại $x = ' + r2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r1 >= r2', params: { c1: -3, c0: -5, a: 2, r1: 3, r2: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (2x^2+2x-84 -> r1=-7, r2=6)', params: { c1: -3, c0: -5, a: 2, r1: -7, r2: 6 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Khẳng định đúng về tính liên tục/gián đoạn của phân thức bậc hai ở mẫu
  t11_b17_d10_discontinuity_quad_stmt_mc: {
    id: 't11_b17_d10_discontinuity_quad_stmt_mc',
    name: 'Nhận biết mệnh đề đúng về điểm gián đoạn của phân thức mẫu bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Phân biệt điểm làm mẫu thức bậc hai bằng 0 (gián đoạn) với điểm khác (liên tục).',
    conditionSummary: 'r1 ∈ [1; 5], r2 ∈ [r1 + 1; 9], a ∈ {-2, -1, 1, 2}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số x^2 ở mẫu', min: -2, max: 2, allowZero: false },
      { name: 'r1', label: 'Nghiệm nhỏ của mẫu', min: 1, max: 4 },
      { name: 'gap', label: 'Hiệu r2 - r1', min: 2, max: 5 },
      { name: 'c0', label: 'Hằng số ở tử', min: 1, max: 6 },
      { name: 'c1', label: 'Hệ số x ở tử', min: -6, max: -2 },
    ],
    validateCode: `
      const { a, r1, gap, c0, c1 } = params;
      if (a === 0 || r1 < 1 || gap < 2 || c1 >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, r1, gap, c0, c1 } = params;
      const r2 = r1 + gap;
      const numStr = c0 + ' - ' + Math.abs(c1) + 'x';
      const denStr = u.formatQuadratic(a, -a * (r1 + r2), a * r1 * r2);

      const correct = 'Hàm số gián đoạn tại $x = ' + r2 + '$';
      const wrongs = [
        'Hàm số liên tục tại $x = ' + r2 + '$',
        'Hàm số gián đoạn tại $x = ' + (-r2 - 2) + '$',
        'Hàm số gián đoạn tại $x = ' + (-r2 - 1) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mẫu thức bằng $0$ khi $' + denStr + ' = 0 \\Leftrightarrow x = ' + r1 + '$ hoặc $x = ' + r2 + '$.',
          'Do đó hàm số liên tục tại mọi $x \\in \\mathbb{R} \\setminus \\{' + r1 + '; ' + r2 + '\\}$ và gián đoạn tại $x = ' + r2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, r1: 4, gap: 3, c0: 3, c1: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (-2x^2+22x-56 -> x=7)', params: { a: -2, r1: 4, gap: 3, c0: 3, c1: -5 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Chọn hàm số gián đoạn tại x = x0 cho trước
  t11_b17_d11_find_fn_discontinuous_at_x0_mc: {
    id: 't11_b17_d11_find_fn_discontinuous_at_x0_mc',
    name: 'Nhận diện hàm số gián đoạn tại điểm x = x0 cho trước',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Chọn đúng hàm phân thức không xác định (gián đoạn) tại x = x0 trong 4 hàm số.',
    conditionSummary: 'x0 ∈ [-4; 4]\\{0}, k ∈ [2; 4], a, b ∈ [-6; -1]',
    paramSpecs: [
      { name: 'x0', label: 'Điểm gián đoạn x0', min: -4, max: 4, allowZero: false },
      { name: 'k', label: 'Hệ số của mẫu hàm đúng', min: 2, max: 4 },
      { name: 'a', label: 'Hệ số x trên tử', min: -6, max: -2 },
      { name: 'b', label: 'Hằng số trên tử', min: -6, max: -1 },
    ],
    validateCode: `
      const { x0, k, a, b } = params;
      if (x0 === 0 || k < 2 || a >= 0 || b >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, k, a, b } = params;
      const num1 = u.formatLinear(a, b);
      const denCorrect = u.formatLinear(-k, k * x0);
      const correct = '$y = \\dfrac{' + num1 + '}{' + denCorrect + '}$';

      const wDen1 = u.formatLinear(-1, -x0); // triệt tiêu tại -x0 != x0
      const wDen2 = 'x^{2} + ' + (x0 * x0 + 1); // luôn dương
      const wPoly = u.formatQuadratic(a + 1, -3, -1);

      const wrongs = [
        '$y = \\dfrac{' + u.formatLinear(a, b + 3) + '}{' + wDen1 + '}$',
        '$y = \\dfrac{' + u.formatLinear(a, b + 1) + '}{' + wDen2 + '}$',
        '$y = ' + wPoly + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Hàm số nào sau đây gián đoạn tại điểm $x = ' + x0 + '$?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm đa thức và các hàm phân thức có mẫu khác $0$ tại $x = ' + x0 + '$ đều liên tục tại $x = ' + x0 + '$.',
          'Hàm số $y = \\dfrac{' + num1 + '}{' + denCorrect + '}$ không xác định tại $x = ' + x0 + '$ (mẫu bằng $0$) nên gián đoạn tại $x = ' + x0 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 0', params: { x0: 0, k: 2, a: -5, b: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (gián đoạn tại x=2)', params: { x0: 2, k: 2, a: -5, b: -5 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Tìm khoảng liên tục của hàm phân thức bậc nhất
  t11_b17_d12_continuity_interval_mc: {
    id: 't11_b17_d12_continuity_interval_mc',
    name: 'Xác định khoảng liên tục của hàm số phân thức bậc nhất',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số liên tục',
    description: 'Tìm khoảng không chứa điểm gián đoạn x0 = p/k của hàm phân thức (ax+b)/(kx-p).',
    conditionSummary: 'k ∈ [2; 5], p ∈ [-4; 4]\\{0}, gcd(k, |p|) = 1, a ∈ [-5; -2], b ∈ [-6; -1]',
    paramSpecs: [
      { name: 'k', label: 'Hệ số x ở mẫu', min: 2, max: 5 },
      { name: 'p', label: 'Số trừ ở mẫu (kx - p)', min: -4, max: 4, allowZero: false },
      { name: 'a', label: 'Hệ số x ở tử', min: -5, max: -2 },
      { name: 'b', label: 'Hằng số ở tử', min: -6, max: -1 },
    ],
    validateCode: `
      const { k, p, a, b } = params;
      if (k < 2 || p === 0 || a >= 0 || b >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (u.gcd(k, Math.abs(p)) !== 1) return { valid: false, reason: 'Cần gcd(k, |p|) = 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, p, a, b } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(k, -p);
      const rootF = u.simplifyFrac(p, k);
      const leftBound = -4;
      const rightBound = 3;

      const correct = 'Hàm số liên tục trên khoảng $\\left(' + rootF.latex + '; +\\infty\\right)$';
      const wrongs = [
        'Hàm số liên tục trên khoảng $(' + leftBound + '; ' + rightBound + ')$',
        'Hàm số liên tục trên khoảng $(' + leftBound + '; +\\infty)$',
        'Hàm số liên tục trên khoảng $(-\\infty; ' + rightBound + ')$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm phân thức xác định trên $\\left(-\\infty; ' + rootF.latex + '\\right) \\cup \\left(' + rootF.latex + '; +\\infty\\right)$, do đó liên tục trên khoảng $\\left(' + rootF.latex + '; +\\infty\\right)$.',
          'Ba khoảng còn lại đều chứa điểm gián đoạn $x = ' + rootF.latex + '$ nên hàm số không liên tục trên các khoảng đó.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { k: 3, p: 0, a: -3, b: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 ((1/3; +∞))', params: { k: 3, p: 1, a: -3, b: -5 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Xét tính không liên tục tại điểm rẽ nhánh của hàm 2 công thức (bậc 2 / hằng số)
  t11_b17_d13_piecewise_discontinuous_mc: {
    id: 't11_b17_d13_piecewise_discontinuous_mc',
    name: 'Nhận biết điểm gián đoạn của hàm số cho bởi hai công thức',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hàm số liên tục',
    description: 'Kiểm tra giới hạn trái và giới hạn phải tại điểm rẽ nhánh x0 để kết luận hàm không liên tục tại x0.',
    conditionSummary: 'x0 ∈ [-3; 3], a ∈ [1; 3], b ∈ [-4; 4], c ∈ [-6; 2], K ∈ [-6; 4], L+ ≠ K',
    paramSpecs: [
      { name: 'x0', label: 'Điểm rẽ nhánh x0', min: -3, max: 3 },
      { name: 'a', label: 'Hệ số x^2 nhánh trên', min: 1, max: 3 },
      { name: 'b', label: 'Hệ số x nhánh trên', min: -4, max: 4 },
      { name: 'c', label: 'Hằng số nhánh trên', min: -6, max: 2 },
      { name: 'K', label: 'Hằng số nhánh dưới', min: -6, max: 4 },
    ],
    validateCode: `
      const { x0, a, b, c, K } = params;
      if (a < 1) return { valid: false, reason: 'a < 1' };
      const lp = a * x0 * x0 + b * x0 + c;
      if (lp === K) return { valid: false, reason: 'Cần giới hạn phải khác giới hạn trái' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, b, c, K } = params;
      const topPoly = u.formatQuadratic(a, b, c);
      const lp = a * x0 * x0 + b * x0 + c;
      const pOther = x0 + 7;

      const correct = 'Hàm số không liên tục tại $x = ' + x0 + '$';
      const wrongs = [
        'Hàm số liên tục tại $x = ' + x0 + '$',
        'Hàm số liên tục tại mọi $x \\in \\mathbb{R}$',
        'Hàm số không liên tục tại $x = ' + pOther + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + topPoly + ' & \\text{khi } x \\ge ' + x0 + ' \\\\ ' + K + ' & \\text{khi } x < ' + x0 + ' \\end{cases}$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) = ' + lp + '$ còn $\\lim \\limits_{x \\to ' + x0 + '^-} f(x) = ' + K + '$.',
          'Vì $\\lim \\limits_{x \\to ' + x0 + '^+} f(x) \\ne \\lim \\limits_{x \\to ' + x0 + '^-} f(x)$ nên hàm số không tồn tại giới hạn tại $x = ' + x0 + '$, suy ra không liên tục tại $x = ' + x0 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên L+ = K', params: { x0: -1, a: 2, b: 1, c: -4, K: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (x0=-1, 2x^2+x-4 và -4)', params: { x0: -1, a: 2, b: 1, c: -4, K: -4 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Hàm phân thức có giới hạn vô cực tại x0 -> không tồn tại m để liên tục
  t11_b17_d14_piecewise_00_no_finite_limit_mc: {
    id: 't11_b17_d14_piecewise_00_no_finite_limit_mc',
    name: 'Nhận biết trường hợp không tồn tại tham số m do giới hạn tại x0 bằng vô cực',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Xét hàm f(x) = (x(x - x0))/(-(x - x0)^2) khi x ≠ x0 và mx + c khi x = x0 để nhận biết không tồn tại m ∈ R.',
    conditionSummary: 'x0 ∈ [-4; 4]\\{0}, c ∈ [1; 6], sign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm xét liên tục x0', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hằng số tại x = x0', min: 1, max: 6 },
      { name: 'sign', label: 'Dấu mẫu số (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
    ],
    validateCode: `
      const { x0, c, sign } = params;
      if (x0 === 0 || c < 1 || (sign !== -1 && sign !== 1)) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, c, sign } = params;
      const numStr = u.formatQuadratic(1, -x0, 0);
      const denStr = u.formatQuadratic(sign, -2 * sign * x0, sign * x0 * x0);
      const branch2 = u.formatLinear(1, c, 'm') === 'm + ' + c ? 'mx + ' + c : 'mx + ' + c;
      const infRes = (sign * x0 < 0) ? '+\\infty' : '-\\infty';

      const correct = 'Không tồn tại giá trị nào của $m$';
      const wrongs = [
        '$m = 1$',
        '$m = -2$',
        '$m = ' + c + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (t) => '$m = ' + (c + t) + '$'
      );
      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} \\dfrac{' + numStr + '}{' + denStr + '} & \\text{khi } x \\ne ' + x0 + ' \\\\ ' + branch2 + ' & \\text{khi } x = ' + x0 + ' \\end{cases}$. Tìm tham số $m$ để hàm số đã cho liên tục tại điểm $x = ' + x0 + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Với $x \\ne ' + x0 + '$, rút gọn được $f(x) = \\dfrac{x}{' + (sign === -1 ? '-(' + u.formatShift('x', -x0) + ')' : '(' + u.formatShift('x', -x0) + ')') + '}$.',
          'Khi $x \\to ' + x0 + '$, giới hạn $\\lim \\limits_{x \\to ' + x0 + '} f(x)$ không hữu hạn (bằng $\\pm\\infty$, cụ thể tiến ra vô cực hai phía trái dấu). Vì $f(' + x0 + ') = ' + x0 + 'm + ' + c + '$ luôn hữu hạn nên không tồn tại giá trị thực nào của $m$ để hàm số liên tục tại $x = ' + x0 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 0', params: { x0: 0, c: 3, sign: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (x0=-2, mẫu -x^2-4x-4 -> vô nghiệm m)', params: { x0: -2, c: 3, sign: -1 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Tìm m để hàm số 2 công thức dạng 0/0 liên tục tại x0
  t11_b17_d15_piecewise_00_find_m_mc: {
    id: 't11_b17_d15_piecewise_00_find_m_mc',
    name: 'Tìm tham số m để hàm số chứa biểu thức dạng 0/0 liên tục tại điểm x0',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Hàm số liên tục',
    description: 'Tính L = lim_{x -> x0} ((x-x0)(ax^2+bx+c))/((x-r)(kx-kx0)) và giải m·x0 + d = L.',
    conditionSummary: 'x0 ∈ [-3; 4]\\{0}, r ∈ [-4; 5]\\{x0}, k ∈ [2; 6], d ∈ [-6; -1]',
    paramSpecs: [
      { name: 'x0', label: 'Điểm xét liên tục x0', min: -3, max: 4, allowZero: false },
      { name: 'r', label: 'Nghiệm thứ hai r của mẫu', min: -4, max: 5 },
      { name: 'k', label: 'Hệ số của (kx - kx0)', min: 2, max: 6 },
      { name: 'b', label: 'Hệ số x của nhân tử bậc hai ở tử', min: -4, max: -1 },
      { name: 'c', label: 'Hằng số của nhân tử bậc hai ở tử', min: -4, max: -1 },
      { name: 'd', label: 'Hằng số của nhánh mx + d', min: -6, max: -1 },
    ],
    validateCode: `
      const { x0, r, k, b, c, d } = params;
      if (x0 === 0 || r === x0 || k < 2 || d >= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      const qVal = -x0 * x0 + b * x0 + c;
      if (qVal === 0) return { valid: false, reason: 'Tử triệt tiêu 2 lần' };
      const numM = qVal - d * k * (x0 - r);
      if (numM === 0) return { valid: false, reason: 'Tránh m = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r, k, b, c, d } = params;
      const quadFactor = u.formatQuadratic(-1, b, c);
      const linFactor1 = u.formatShift('x', -x0);
      const linFactor2 = u.formatShift('x', -r);
      const linK = u.formatLinear(k, -k * x0);
      const branch2 = 'mx ' + u.formatTrailingConst(d);

      const qVal = -x0 * x0 + b * x0 + c;
      const limF = u.simplifyFrac(qVal, k * (x0 - r));
      // m * x0 + d = limF => m = (qVal - d * k * (x0 - r)) / (k * (x0 - r) * x0)
      const ansM = u.simplifyFrac(qVal - d * k * (x0 - r), k * (x0 - r) * x0);
      const w1 = u.simplifyFrac(qVal + d * k * (x0 - r), k * (x0 - r) * x0);
      const w2 = u.simplifyFrac(qVal - d * k * (x0 - r), k * (x0 - r) * (-x0));
      const w3 = limF;

      const correct = '$m = ' + ansM.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$m = ' + w1.latex + '$', '$m = ' + w2.latex + '$', '$m = ' + w3.latex + '$'],
        rng,
        (t) => '$m = ' + u.simplifyFrac(ansM.num + t, ansM.den).latex + '$'
      );
      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} \\dfrac{(' + linFactor1 + ')(' + quadFactor + ')}{(' + linFactor2 + ')(' + linK + ')} & \\text{khi } x \\ne ' + x0 + ' \\\\ ' + branch2 + ' & \\text{khi } x = ' + x0 + ' \\end{cases}$. Tìm $m$ để hàm số đã cho liên tục tại điểm $x = ' + x0 + '$.',
        options,
        correctIndex,
        answerSummary: '$m = ' + ansM.latex + '$',
        solutionSteps: [
          'Ta có $\\lim \\limits_{x \\to ' + x0 + '} f(x) = \\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + quadFactor + '}{' + k + '(' + linFactor2 + ')} = ' + limF.latex + '$.',
          'Hàm số liên tục tại $x = ' + x0 + ' \\Leftrightarrow f(' + x0 + ') = \\lim \\limits_{x \\to ' + x0 + '} f(x) \\Leftrightarrow ' + x0 + 'm ' + u.formatTrailingConst(d) + ' = ' + limF.latex + ' \\Leftrightarrow m = ' + ansM.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = x0', params: { x0: 2, r: 2, k: 5, b: -3, c: -3, d: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (x0=2, r=3, k=5 -> m=33/10)', params: { x0: 2, r: 3, k: 5, b: -3, c: -3, d: -4 }, expectedValid: true },
    ],
  },
};
