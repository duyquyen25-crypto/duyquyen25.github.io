import { MathTemplate } from '../types/math';

export const G11_B16_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Khẳng định đúng về tính chất phép chiếu song song
  t11_b16_d01_proj_prop_correct_mc: {
    id: 't11_b16_d01_proj_prop_correct_mc',
    name: 'Nhận biết tính chất bảo toàn thẳng hàng và thứ tự qua phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Phân biệt khẳng định đúng về tính chất bảo toàn của phép chiếu song song.',
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
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự của chúng.',
        },
        {
          correct: 'Phép chiếu song song không làm thay đổi thứ tự của ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song bảo toàn độ lớn góc giữa hai đường thẳng',
            'Phép chiếu song song biến hai đường thẳng vuông góc thành hai đường thẳng vuông góc',
            'Phép chiếu song song luôn bảo toàn diện tích tam giác',
          ],
          sol: 'Nếu điểm B nằm giữa A và C trên một đường thẳng thì hình chiếu B\' nằm giữa A\' và C\' trên hình chiếu của đường thẳng đó.',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng',
          wrongs: [
            'Phép chiếu song song giữ nguyên độ dài mọi đoạn thẳng',
            'Phép chiếu song song biến mọi đường tròn thành đường tròn bằng nó',
            'Phép chiếu song song biến hai đường thẳng cắt nhau luôn thành hai đường thẳng vuông góc',
          ],
          sol: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên cùng một đường thẳng hoặc trên hai đường thẳng song song.',
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
      { label: 'Mẫu chuẩn Q1 (ba điểm thẳng hàng)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Khẳng định sai về phép chiếu song song
  t11_b16_d02_proj_prop_wrong_mc: {
    id: 't11_b16_d02_proj_prop_wrong_mc',
    name: 'Nhận biết khẳng định sai về ảnh hai đường thẳng song song qua phép chiếu song song',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Chọn khẳng định sai trong các mệnh đề về phép chiếu song song.',
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
        'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
        'Phép chiếu song song có thể biến đường tròn thành đường elip',
        'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
      ];
      const FALSE_STMTS = [
        {
          stmt: 'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
          sol: 'Hình chiếu song song của hai đường thẳng song song (không trùng phương chiếu) là hai đường thẳng song song hoặc trùng nhau, không phải lúc nào cũng trùng nhau.',
        },
        {
          stmt: 'Phép chiếu song song luôn bảo toàn tỉ số độ dài của hai đoạn thẳng bất kì trong không gian',
          sol: 'Phép chiếu song song chỉ bảo toàn tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc nằm trên hai đường thẳng song song.',
        },
        {
          stmt: 'Phép chiếu song song luôn biến hai đường thẳng vuông góc thành hai đường thẳng vuông góc',
          sol: 'Phép chiếu song song không bảo toàn góc nên không bảo toàn tính vuông góc.',
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
      { label: 'Mẫu chuẩn Q2 (hai đường song song thành trùng nhau)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của hình phẳng / đoạn thẳng
  t11_b16_d03_proj_shape_correct_mc: {
    id: 't11_b16_d03_proj_shape_correct_mc',
    name: 'Hình chiếu song song của đoạn thẳng và hình phẳng (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Nhận biết dạng hình học có thể thu được của đoạn thẳng, hình bình hành, tam giác qua phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể (0: đoạn thẳng, 1: hình bình hành, 2: đường tròn)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của một đoạn thẳng là một đoạn thẳng hoặc một điểm',
          wrongs: [
            'Hình chiếu song song của hình thang là một hình chữ nhật',
            'Hình chiếu song song của hình thoi luôn cho một hình thoi',
            'Hình chiếu song song của tam giác vuông luôn là một tam giác vuông',
          ],
          sol: 'Đoạn thẳng không song song phương chiếu có hình chiếu là một đoạn thẳng; nếu song song phương chiếu thì hình chiếu là một điểm.',
        },
        {
          correct: 'Hình chiếu song song của một hình chữ nhật (trong mặt phẳng không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của một hình vuông luôn là một hình vuông',
            'Hình chiếu song song của một hình thang cân luôn là hình thang cân',
            'Hình chiếu song song của một đoạn thẳng luôn có độ dài bằng đoạn thẳng ban đầu',
          ],
          sol: 'Vì phép chiếu song song bảo toàn tính song song nên hình bình hành (nói riêng là hình chữ nhật, hình thoi, hình vuông) chiếu thành hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của một đường tròn (nằm trong mặt phẳng không song song phương chiếu) là một đường elip hoặc đường tròn',
          wrongs: [
            'Hình chiếu song song của một đường tròn luôn là một đường tròn',
            'Hình chiếu song song của một tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của hình bình hành luôn là một hình thoi',
          ],
          sol: 'Hình chiếu song song của đường tròn lên mặt phẳng không song song phương chiếu nói chung là một đường elip (hoặc đường tròn).',
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
      { label: 'Mẫu chuẩn Q3 (đoạn thẳng hoặc điểm)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Hình chiếu của đỉnh trên lăng trụ lên mặt bên đối diện theo cạnh đáy
  t11_b16_d04_prism_proj_lateral_mc: {
    id: 't11_b16_d04_prism_proj_lateral_mc',
    name: 'Hình chiếu song song của đỉnh lăng trụ lên mặt bên theo phương cạnh đáy (Kiểu A\'B\'C\')',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tìm hình chiếu song song của một đỉnh trên lăng trụ ABC.A\'B\'C\' lên mặt bên đối diện theo phương một cạnh đáy.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Cấu hình chiếu lên mặt bên (0..2)', min: 0, max: 2 },
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
        { b: ['A', 'B', 'C'], t: ['D', 'E', 'F'] },
        { b: ['M', 'N', 'P'], t: ["M'", "N'", "P'"] },
      ];
      const s = SETS[setIdx];
      // vIdx = 0 -> Q4 gốc: chiếu B' lên (ACC'A') theo phương BC -> C'
      // vIdx = 1 -> chiếu A' lên (BCC'B') theo phương AB -> B'
      // vIdx = 2 -> chiếu C' lên (ABB'A') theo phương CB -> B'
      const CASES = [
        { src: s.t[1], img: s.t[2], face: s.b[0] + s.b[2] + s.t[2] + s.t[0], dir: s.b[1] + s.b[2], w1: s.b[1], w2: s.b[2], w3: s.t[1] },
        { src: s.t[0], img: s.t[1], face: s.b[1] + s.b[2] + s.t[2] + s.t[1], dir: s.b[0] + s.b[1], w1: s.b[0], w2: s.b[1], w3: s.t[0] },
        { src: s.t[2], img: s.t[1], face: s.b[0] + s.b[1] + s.t[1] + s.t[0], dir: s.b[2] + s.b[1], w1: s.b[2], w2: s.b[1], w3: s.t[2] },
      ];
      const c = CASES[vIdx];
      const correct = 'Điểm $' + c.img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + c.w1 + '$', 'Điểm $' + c.w2 + '$', 'Điểm $' + c.w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + c.src + '$ lên mặt phẳng $(' + c.face + ')$ theo phương $' + c.dir + '$ là điểm nào?',
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
          'Vì hai đáy song song và các mặt bên là hình bình hành nên $' + c.src + c.img + ' \\parallel ' + c.dir + '$ và $' + c.img + ' \\in (' + c.face + ')$. Vậy hình chiếu là điểm $' + c.img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { setIdx: 0, vIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (B\' lên (ACC\'A\') theo BC -> C\')', params: { setIdx: 0, vIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hình chiếu của đỉnh trên lăng trụ lên mặt bên (ABB1A1) theo phương AC
  t11_b16_d05_prism_proj_lateral2_mc: {
    id: 't11_b16_d05_prism_proj_lateral2_mc',
    name: 'Hình chiếu song song của đỉnh lăng trụ lên mặt bên theo phương cạnh đáy (Kiểu A1B1C1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Cho lăng trụ ABC.A1B1C1, tìm hình chiếu song song của đỉnh C1 (hoặc A1, B1) lên mặt bên không chứa nó theo phương cạnh đáy.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Cấu hình chiếu lên mặt bên (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, vIdx } = params;
      if (setIdx < 0 || setIdx > 2 || vIdx < 0 || vIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, vIdx } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ['A_1', 'B_1', 'C_1'] },
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"] },
        { b: ['P', 'Q', 'R'], t: ['P_1', 'Q_1', 'R_1'] },
      ];
      const s = SETS[setIdx];
      // vIdx = 0 -> Q5 gốc: chiếu C1 lên (ABB1A1) theo phương AC -> A1
      // vIdx = 1 -> chiếu B1 lên (ACC1A1) theo phương AB -> A1
      // vIdx = 2 -> chiếu A1 lên (BCC1B1) theo phương AC -> C1
      const CASES = [
        { src: s.t[2], img: s.t[0], face: s.b[0] + s.b[1] + s.t[1] + s.t[0], dir: s.b[0] + s.b[2], w1: s.b[0], w2: s.b[2], w3: s.t[1] },
        { src: s.t[1], img: s.t[0], face: s.b[0] + s.b[2] + s.t[2] + s.t[0], dir: s.b[0] + s.b[1], w1: s.b[0], w2: s.b[1], w3: s.t[2] },
        { src: s.t[0], img: s.t[2], face: s.b[1] + s.b[2] + s.t[2] + s.t[1], dir: s.b[0] + s.b[2], w1: s.b[2], w2: s.b[0], w3: s.t[1] },
      ];
      const c = CASES[vIdx];
      const correct = 'Điểm $' + c.img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + c.w1 + '$', 'Điểm $' + c.w2 + '$', 'Điểm $' + c.w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + c.src + '$ lên mặt phẳng $(' + c.face + ')$ theo phương $' + c.dir + '$ là điểm nào?',
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
          'Do $' + c.src + c.img + ' \\parallel ' + c.dir + '$ và $' + c.img + ' \\in (' + c.face + ')$ nên hình chiếu song song của điểm $' + c.src + '$ lên $(' + c.face + ')$ theo phương $' + c.dir + '$ là điểm $' + c.img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, vIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (C1 lên (ABB1A1) theo AC -> A1)', params: { setIdx: 0, vIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Tính giới hạn tích [f(x)g(x)] từ hai giới hạn thành phần
  t11_b16_d06_limit_product_rule_mc: {
    id: 't11_b16_d06_limit_product_rule_mc',
    name: 'Tính giới hạn tích [f(x)g(x)] bằng định lí về giới hạn hữu hạn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Cho lim f(x) = L1 và lim g(x) = L2 khi x -> x0. Tính lim [f(x)g(x)].',
    conditionSummary: 'x0 ∈ [-6; 6]\\{0}, L1, L2 ∈ [-6; 6]\\{0}, các phương án phân biệt',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -6, max: 6, allowZero: false },
      { name: 'L1', label: 'Giới hạn L1 của f(x)', min: -6, max: 6, allowZero: false },
      { name: 'L2', label: 'Giới hạn L2 của g(x)', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { x0, L1, L2 } = params;
      if (x0 === 0 || L1 === 0 || L2 === 0) return { valid: false, reason: 'Tham số phải khác 0' };
      if (Math.abs(L1) === 1 || Math.abs(L2) === 1) return { valid: false, reason: 'Tránh |L|=1 dễ trùng giá trị' };
      if (L1 + L2 === L1 * L2) return { valid: false, reason: 'Trùng tích và tổng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, L1, L2 } = params;
      const prod = L1 * L2;
      const sum = L1 + L2;
      const quot = u.simplifyFrac(L1, L2);
      const diff = L1 - L2;
      const correct = '$' + prod + '$';
      const candidates = ['$' + sum + '$', '$' + quot.latex + '$', '$' + diff + '$', '$' + (-prod) + '$', '$' + (prod + 2) + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candidates,
        rng,
        (k) => '$' + (prod + k + 3) + '$'
      );
      return {
        stem: 'Biết $\\lim \\limits_{x \\to ' + x0 + '} f(x) = ' + L1 + '$ và $\\lim \\limits_{x \\to ' + x0 + '} g(x) = ' + L2 + '$. Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} [f(x)g(x)]$.',
        options,
        correctIndex,
        answerSummary: String(prod),
        solutionSteps: [
          'Áp dụng quy tắc giới hạn của tích: $\\lim \\limits_{x \\to ' + x0 + '} [f(x)g(x)] = \\left(\\lim \\limits_{x \\to ' + x0 + '} f(x)\\right) \\cdot \\left(\\lim \\limits_{x \\to ' + x0 + '} g(x)\\right) = (' + L1 + ') \\cdot (' + L2 + ') = ' + prod + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên L1 = 0', params: { x0: -4, L1: 0, L2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (x0=-4, L1=-2, L2=4 -> -8)', params: { x0: -4, L1: -2, L2: 4 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Giới hạn hàm phân thức bậc nhất xác định tại x0
  t11_b16_d07_limit_linear_direct_mc: {
    id: 't11_b16_d07_limit_linear_direct_mc',
    name: 'Tính giới hạn hàm phân thức bậc nhất tại điểm xác định',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (ax + b)/(cx + d) bằng cách thay trực tiếp khi mẫu khác 0.',
    conditionSummary: 'x0 ∈ [-8; 8]\\{0}, a, c ∈ [-6; 6]\\{0}, b, d ∈ [-8; 8], cx0 + d ≠ 0',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -8, max: 8, allowZero: false },
      { name: 'a', label: 'Hệ số x ở tử', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số ở tử', min: -8, max: 8 },
      { name: 'c', label: 'Hệ số x ở mẫu', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hằng số ở mẫu', min: -8, max: 8 },
    ],
    validateCode: `
      const { x0, a, b, c, d } = params;
      if (x0 === 0 || a === 0 || c === 0) return { valid: false, reason: 'x0, a, c phải khác 0' };
      const denVal = c * x0 + d;
      const numVal = a * x0 + b;
      if (denVal === 0 || numVal === 0) return { valid: false, reason: 'Tử và mẫu phải khác 0 tại x0' };
      if (a * d === b * c) return { valid: false, reason: 'Phân thức rút gọn thành hằng số' };
      if (c * (-x0) + d === 0) return { valid: false, reason: 'Tránh nhiễu chia 0 khi thay -x0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, b, c, d } = params;
      const numVal = a * x0 + b;
      const denVal = c * x0 + d;
      const ans = u.simplifyFrac(numVal, denVal);
      const w1 = u.simplifyFrac(a * (-x0) + b, denVal);
      const w2 = u.simplifyFrac(a * (-x0) + b, c * (-x0) + d);
      const w3 = u.simplifyFrac(a, c);
      const w4 = u.simplifyFrac(-numVal, denVal);

      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const correct = '$' + ans.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$' + w4.latex + '$', '$-\\infty$'],
        rng,
        (k) => '$' + u.simplifyFrac(numVal + k * denVal, denVal).latex + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numStr + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Vì mẫu thức $' + denStr + ' = ' + denVal + ' \\ne 0$ tại $x = ' + x0 + '$ nên:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numStr + '}{' + denStr + '} = \\dfrac{' + numVal + '}{' + denVal + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu bằng 0 (x0=1, c=5, d=-5)', params: { x0: 1, a: 2, b: 1, c: 5, d: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (x0=-7 -> 23/30)', params: { x0: -7, a: -4, b: -5, c: -5, d: -5 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Giới hạn vô định 0/0 bậc 2 / bậc 1
  t11_b16_d08_limit_00_quad_lin_mc: {
    id: 't11_b16_d08_limit_00_quad_lin_mc',
    name: 'Khử dạng vô định 0/0 với tử bậc hai, mẫu bậc nhất',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (a(x-x0)(x-r))/(k(x-x0)).',
    conditionSummary: 'x0 ∈ [-5; 5]\\{0}, r ∈ [-5; 5], r ≠ x0, a ∈ [-5; 5]\\{0}, k ∈ [-15; 15]\\{0}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -5, max: 5, allowZero: false },
      { name: 'r', label: 'Nghiệm thứ hai r của tử', min: -5, max: 5 },
      { name: 'a', label: 'Hệ số x^2 ở tử', min: -5, max: 5, allowZero: false },
      { name: 'k', label: 'Hệ số x ở mẫu', min: -15, max: 15, allowZero: false },
    ],
    validateCode: `
      const { x0, r, a, k } = params;
      if (x0 === 0 || a === 0 || k === 0 || r === x0) return { valid: false, reason: 'Tham số suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r, a, k } = params;
      const A = a;
      const B = -a * (x0 + r);
      const C = a * x0 * r;
      const numPoly = u.formatQuadratic(A, B, C);
      const denPoly = u.formatLinear(k, -k * x0);

      const ans = u.simplifyFrac(a * (x0 - r), k);
      const w1 = u.simplifyFrac(-a * (x0 - r), k);
      const w2 = u.simplifyFrac(a * (x0 + r), k);
      const w3 = u.simplifyFrac(a, k);
      const w4 = u.simplifyFrac(a * (x0 - r), 2 * k);

      const correct = '$' + ans.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$' + w4.latex + '$'],
        rng,
        (t) => '$' + u.simplifyFrac(ans.num + t, ans.den).latex + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '}$.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Phân tích tử thức thành nhân tử để khử nhân tử chung $(' + u.formatShift('x', -x0) + ')$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '} = \\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + u.formatShift('x', -x0) + ')(' + u.formatShift('x', -r) + ')}{' + (k === 1 ? '' : k === -1 ? '-' : k) + '(' + u.formatShift('x', -x0) + ')} = \\dfrac{' + (a * (x0 - r)) + '}{' + k + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = x0', params: { x0: -2, r: -2, a: 5, k: -14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (x0=-2, r=4, a=5, k=-14 -> 15/7)', params: { x0: -2, r: 4, a: 5, k: -14 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Giới hạn vô định 0/0 bậc 1 / bậc 2
  t11_b16_d09_limit_00_lin_quad_mc: {
    id: 't11_b16_d09_limit_00_lin_quad_mc',
    name: 'Khử dạng vô định 0/0 với tử bậc nhất, mẫu bậc hai',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (k(x-x0))/(a(x-x0)(x-r)).',
    conditionSummary: 'x0 ∈ [-6; 6]\\{0}, r ∈ [-5; 5], r ≠ x0, k ∈ [-6; 6]\\{0}, a ∈ [-4; 4]\\{0}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -6, max: 6, allowZero: false },
      { name: 'r', label: 'Nghiệm thứ hai r của mẫu', min: -5, max: 5 },
      { name: 'k', label: 'Hệ số x ở tử', min: -6, max: 6, allowZero: false },
      { name: 'a', label: 'Hệ số x^2 ở mẫu', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { x0, r, k, a } = params;
      if (x0 === 0 || k === 0 || a === 0 || r === x0) return { valid: false, reason: 'Tham số suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r, k, a } = params;
      const numPoly = u.formatLinear(k, -k * x0);
      const denPoly = u.formatQuadratic(a, -a * (x0 + r), a * x0 * r);

      const ans = u.simplifyFrac(k, a * (x0 - r));
      const w1 = u.simplifyFrac(-k, a * (x0 - r));
      const w2 = u.simplifyFrac(k * (x0 - r), a);
      const w3 = x0 + r !== 0 ? u.simplifyFrac(k, a * (x0 + r)) : u.simplifyFrac(k, 2 * a * (x0 - r));
      const w4 = u.simplifyFrac(-1, 1);

      const correct = '$' + ans.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$' + w4.latex + '$'],
        rng,
        (t) => '$' + u.simplifyFrac(ans.num + t, ans.den).latex + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '}$.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Phân tích mẫu thức thành nhân tử và rút gọn nhân tử chung $(' + u.formatShift('x', -x0) + ')$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '} = \\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + k + '}{' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + u.formatShift('x', -r) + ')} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { x0: -5, r: 3, k: -2, a: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (x0=-5, r=3, k=-2, a=2 -> 1/8)', params: { x0: -5, r: 3, k: -2, a: 2 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Giới hạn 0/0 hiệu hai bình phương trên tam thức bậc hai
  t11_b16_d10_limit_00_diff_squares_mc: {
    id: 't11_b16_d10_limit_00_diff_squares_mc',
    name: 'Khử dạng vô định 0/0 hiệu hai bình phương trên tam thức bậc hai',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (x0^2 - x^2)/(x^2 + px + q).',
    conditionSummary: 'x0 ∈ [-6; 6]\\{0}, r ∈ [-5; 5], r ≠ ±x0, sign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -6, max: 6, allowZero: false },
      { name: 'r', label: 'Nghiệm thứ hai r của mẫu', min: -5, max: 5 },
      { name: 'sign', label: 'Chiều hiệu bình phương (-1: x0^2 - x^2, 1: x^2 - x0^2)', min: -1, max: 1, allowZero: false },
    ],
    validateCode: `
      const { x0, r, sign } = params;
      if (x0 === 0 || (sign !== -1 && sign !== 1)) return { valid: false, reason: 'Tham số ngoài miền' };
      if (r === x0 || r === -x0) return { valid: false, reason: 'r trùng ±x0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, r, sign } = params;
      const x0Sq = x0 * x0;
      const numPoly = sign === -1 ? (x0Sq + ' - x^{2}') : ('x^{2} - ' + x0Sq);
      const denPoly = u.formatQuadratic(1, -(x0 + r), x0 * r);

      const ans = u.simplifyFrac(sign * 2 * x0, x0 - r);
      const w1 = u.simplifyFrac(-sign * 2 * x0, x0 - r);
      const w2 = u.simplifyFrac(sign * 2 * x0, x0 + r);
      const w3 = u.simplifyFrac(-1, 1);
      const w4 = u.simplifyFrac(1, 1);

      const correct = '$' + ans.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$' + w4.latex + '$'],
        rng,
        (t) => '$' + u.simplifyFrac(ans.num + t, ans.den).latex + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '}$.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Phân tích tử thức theo hằng đẳng thức hiệu hai bình phương và rút gọn nhân tử $(' + u.formatShift('x', -x0) + ')$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + numPoly + '}{' + denPoly + '} = \\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + (sign === -1 ? '-(' : '(') + u.formatShift('x', x0) + ')}{' + u.formatShift('x', -r) + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = -x0', params: { x0: -3, r: 3, sign: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (x0=-3, r=-2, 9-x^2 -> -6)', params: { x0: -3, r: -2, sign: -1 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Giới hạn vô định 0/0 chứa căn thức ở tử
  t11_b16_d11_limit_00_sqrt_lin_mc: {
    id: 't11_b16_d11_limit_00_sqrt_lin_mc',
    name: 'Khử dạng vô định 0/0 chứa căn thức bậc hai bằng nhân liên hợp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> x0} (√(ax + b) - √c)/(k(x0 - x)).',
    conditionSummary: 'x0 ∈ [-4; 6], a ∈ [2; 6], b ∈ [-8; 12], k ∈ [1; 5], c = ax0+b > 0 không chính phương',
    paramSpecs: [
      { name: 'x0', label: 'Điểm giới hạn x0', min: -4, max: 6 },
      { name: 'a', label: 'Hệ số x dưới căn', min: 2, max: 6 },
      { name: 'b', label: 'Hằng số dưới căn', min: -8, max: 12 },
      { name: 'k', label: 'Hệ số bậc nhất ở mẫu', min: 1, max: 5 },
    ],
    validateCode: `
      const { x0, a, b, k } = params;
      if (a < 2 || a > 6 || k < 1 || k > 5) return { valid: false, reason: 'a hoặc k ngoài miền' };
      const c = a * x0 + b;
      if (c <= 1 || c > 45) return { valid: false, reason: 'Giá trị dưới căn ngoài (1; 45]' };
      const rt = Math.round(Math.sqrt(c));
      if (rt * rt === c) return { valid: false, reason: 'c không nên chính phương để giữ dạng căn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, a, b, k } = params;
      const c = a * x0 + b;
      const splitRad = (n) => {
        let s = 1;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { s = i; break; }
        }
        const m = n / (s * s);
        return { s, m, latex: (s === 1 ? '' : s) + '\\sqrt{' + m + '}' };
      };
      const rad = splitRad(c);
      const fmtRadFrac = (frac, radObj) => {
        if (frac.num === 0) return '0';
        const sign = frac.num < 0 ? '-' : '';
        const absN = Math.abs(frac.num);
        const coeff = absN === 1 ? '' : String(absN);
        const top = coeff + radObj.latex;
        return frac.den === 1 ? (sign + top) : (sign + '\\frac{' + top + '}{' + frac.den + '}');
      };

      const ansFrac = u.simplifyFrac(-a, 2 * k * rad.s * rad.m);
      const w1Frac = u.simplifyFrac(-a, k * rad.s * rad.m);
      const w2Frac = u.simplifyFrac(a, 2 * k * rad.s * rad.m);
      const w3Frac = u.simplifyFrac(-a, k);
      const w4Frac = u.simplifyFrac(a, k);

      const ansTex = fmtRadFrac(ansFrac, rad);
      const w1Tex = fmtRadFrac(w1Frac, rad);
      const w2Tex = fmtRadFrac(w2Frac, rad);
      const w3Tex = w3Frac.latex;
      const w4Tex = w4Frac.latex;

      const radInner = u.formatLinear(a, b);
      const denStr = u.formatLinear(-k, k * x0);
      const correct = '$' + ansTex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1Tex + '$', '$' + w2Tex + '$', '$' + w3Tex + '$', '$' + w4Tex + '$'],
        rng,
        (t) => '$' + fmtRadFrac(u.simplifyFrac(-a - t * 2, 2 * k * rad.s * rad.m), rad) + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{\\sqrt{' + radInner + '} - ' + rad.latex + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: '$' + ansTex + '$',
        solutionSteps: [
          'Nhân cả tử và mẫu với biểu thức liên hợp $\\sqrt{' + radInner + '} + ' + rad.latex + '$:',
          '$\\lim \\limits_{x \\to ' + x0 + '} \\dfrac{' + a + '(x ' + (x0 >= 0 ? '- ' + x0 : '+ ' + Math.abs(x0)) + ')}{' + denStr + '\\left(\\sqrt{' + radInner + '} + ' + rad.latex + '\\right)} = \\lim \\limits_{x \\to ' + x0 + '} \\dfrac{-' + a + '}{' + k + '\\left(\\sqrt{' + radInner + '} + ' + rad.latex + '\\right)} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c chính phương (x0=4, a=4, b=0 -> c=16)', params: { x0: 4, a: 4, b: 0, k: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (x0=5, a=4, b=1, k=3 -> -2√21/63)', params: { x0: 5, a: 4, b: 1, k: 3 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Giới hạn tại vô cực phân thức bậc 3 trên bậc 3
  t11_b16_d12_limit_inf_poly_ratio_same_deg_mc: {
    id: 't11_b16_d12_limit_inf_poly_ratio_same_deg_mc',
    name: 'Tính giới hạn tại vô cực của phân thức bậc ba trên bậc ba',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> ±∞} (a3 x^3 + a2 x^2 + a1 x + a0)/(b3 x^3 + b2 x^2 + b1 x + b0).',
    conditionSummary: 'a3 ∈ [-9; 9]\\{0}, b3 ∈ [1; 5], a0, b0 ∈ [-9; 9]\\{0}, infSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'a3', label: 'Hệ số x^3 ở tử', min: -9, max: 9, allowZero: false },
      { name: 'a2', label: 'Hệ số x^2 ở tử', min: -5, max: 5 },
      { name: 'a0', label: 'Hằng số ở tử', min: -9, max: 9, allowZero: false },
      { name: 'b3', label: 'Hệ số x^3 ở mẫu', min: 1, max: 5 },
      { name: 'b2', label: 'Hệ số x^2 ở mẫu', min: -6, max: 8 },
      { name: 'b0', label: 'Hằng số ở mẫu', min: 1, max: 8 },
      { name: 'infSign', label: 'Chiều vô cực (-1: -∞, 1: +∞)', min: -1, max: 1, allowZero: false },
    ],
    validateCode: `
      const { a3, a0, b3, b0, infSign } = params;
      if (a3 === 0 || a0 === 0 || b3 < 1 || b0 < 1) return { valid: false, reason: 'Tham số ngoài miền' };
      if (infSign !== -1 && infSign !== 1) return { valid: false, reason: 'infSign phải là ±1' };
      if (Math.abs(a3) === 1 && b3 === 1) return { valid: false, reason: 'Tránh tỉ số ±1 trùng nhiều nhiễu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a3, a2, a0, b3, b2, b0, infSign } = params;
      const numPoly = u.formatPoly([a3, a2, 1, a0]);
      const denPoly = u.formatPoly([b3, b2, -6, b0]);
      const ans = u.simplifyFrac(a3, b3);
      const w1 = u.simplifyFrac(a0, b0);
      const w2 = u.simplifyFrac(-b3, a3);
      const w3 = u.simplifyFrac(a0, 1);
      const w4 = u.simplifyFrac(-a3, b3);
      const infTex = infSign === 1 ? '+\\infty' : '-\\infty';

      const correct = '$' + ans.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$' + w4.latex + '$', '$0$'],
        rng,
        (k) => '$' + u.simplifyFrac(ans.num + k * ans.den, ans.den).latex + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + infTex + '} \\dfrac{' + numPoly + '}{' + denPoly + '}$.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Chia cả tử và mẫu cho $x^3$, các số hạng chứa $\\frac{1}{x}, \\frac{1}{x^2}, \\frac{1}{x^3}$ dần về $0$ nên giới hạn bằng $\\dfrac{' + a3 + '}{' + b3 + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b3 = 0', params: { a3: -7, a2: 1, a0: -9, b3: 0, b2: 8, b0: 5, infSign: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (a3=-7, b3=1 -> -7)', params: { a3: -7, a2: 1, a0: -9, b3: 1, b2: 8, b0: 5, infSign: 1 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Giới hạn tại vô cực bậc tử nhỏ hơn bậc mẫu
  t11_b16_d13_limit_inf_deg_lt_mc: {
    id: 't11_b16_d13_limit_inf_deg_lt_mc',
    name: 'Tính giới hạn tại vô cực có bậc tử nhỏ hơn bậc mẫu',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> ±∞} (ax + b)/(cx^2 + dx + e) = 0.',
    conditionSummary: 'a, c ∈ [-6; 6]\\{0}, b, d, e ∈ [-8; 8]\\{0}, infSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số x ở tử', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số ở tử', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hệ số x^2 ở mẫu', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hệ số x ở mẫu', min: -6, max: 6, allowZero: false },
      { name: 'e', label: 'Hằng số ở mẫu', min: -8, max: 8, allowZero: false },
      { name: 'infSign', label: 'Chiều vô cực (-1: -∞, 1: +∞)', min: -1, max: 1, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d, e, infSign } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0 || e === 0) return { valid: false, reason: 'Hệ số phải khác 0' };
      if (infSign !== -1 && infSign !== 1) return { valid: false, reason: 'infSign phải là ±1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, e, infSign } = params;
      const numPoly = a === -2 && b === 6 ? '6 - 2x' : u.formatLinear(a, b);
      const denPoly = u.formatQuadratic(c, d, e);
      const infTex = infSign === 1 ? '+\\infty' : '-\\infty';

      const w1 = u.simplifyFrac(a, c);
      const w2 = u.simplifyFrac(a, d);
      const w3 = u.simplifyFrac(b, e);
      const correct = '$0$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$1$', '$2$', '$-\\infty$'],
        rng,
        (k) => '$' + k + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + infTex + '} \\dfrac{' + numPoly + '}{' + denPoly + '}$.',
        options,
        correctIndex,
        answerSummary: '$0$',
        solutionSteps: [
          'Chia cả tử và mẫu cho $x^2$, tử số dần về $0$ còn mẫu số dần về $' + c + ' \\ne 0$, suy ra giới hạn bằng $0$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { a: -2, b: 6, c: 0, d: 4, e: 6, infSign: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (0)', params: { a: -2, b: 6, c: -4, d: 4, e: 6, infSign: 1 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Giới hạn tại vô cực dạng √(ax^2+bx+c) / (d - ex)
  t11_b16_d14_limit_inf_sqrt_over_lin_mc: {
    id: 't11_b16_d14_limit_inf_sqrt_over_lin_mc',
    name: 'Tính giới hạn tại vô cực của phân thức chứa √(ax² + bx + c) trên tử',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> ±∞} √(ax^2 + bx + c)/(d - ex) với a không chính phương.',
    conditionSummary: 'a ∈ {2,3,5,6,7}, e ∈ [2; 7], d ∈ [1; 9], infSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'aIdx', label: 'Chỉ số chọn hệ số a dưới căn (0..4)', min: 0, max: 4 },
      { name: 'b', label: 'Hệ số x dưới căn', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hằng số dưới căn', min: 1, max: 9 },
      { name: 'd', label: 'Hằng số ở mẫu', min: 1, max: 9 },
      { name: 'e', label: 'Hệ số -ex ở mẫu', min: 2, max: 7 },
      { name: 'infSign', label: 'Chiều vô cực (-1: -∞, 1: +∞)', min: -1, max: 1, allowZero: false },
    ],
    validateCode: `
      const { aIdx, b, c, d, e, infSign } = params;
      if (aIdx < 0 || aIdx > 4 || b === 0 || c < 1 || d < 1 || e < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      if (infSign !== -1 && infSign !== 1) return { valid: false, reason: 'infSign phải là ±1' };
      if (d === e) return { valid: false, reason: 'Tránh d = e trùng nhiễu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aIdx, b, c, d, e, infSign } = params;
      const AS = [2, 3, 5, 6, 7];
      const a = AS[aIdx];
      const radInner = u.formatQuadratic(a, b, c);
      const denStr = d + ' - ' + e + 'x';
      const infTex = infSign === 1 ? '+\\infty' : '-\\infty';

      // sqrt(a x^2) = infSign * sqrt(a) * x; mẫu d - e x ~ -e x => tỉ số là (-infSign / e) * sqrt(a)
      const fmtCoeffSqrt = (num, den) => {
        const f = u.simplifyFrac(num, den);
        const sign = f.num < 0 ? '-' : '';
        const absN = Math.abs(f.num);
        const top = (absN === 1 ? '' : absN) + '\\sqrt{' + a + '}';
        return f.den === 1 ? (sign + top) : (sign + '\\frac{' + top + '}{' + f.den + '}');
      };

      const ansTex = fmtCoeffSqrt(-infSign, e);
      const wOpposite = fmtCoeffSqrt(infSign, e);
      const wWithD = fmtCoeffSqrt(1, d);
      const wInf = infSign === 1 ? '-\\infty' : '+\\infty';

      const correct = '$' + ansTex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + wOpposite + '$', '$' + wWithD + '$', '$' + wInf + '$', '$0$'],
        rng,
        (k) => '$' + fmtCoeffSqrt(k + 2, e + 1) + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + infTex + '} \\dfrac{\\sqrt{' + radInner + '}}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: '$' + ansTex + '$',
        solutionSteps: [
          'Vì $x \\to ' + infTex + '$ nên $\\sqrt{x^2} = |x| = ' + (infSign === 1 ? 'x' : '-x') + '$. Chia tử và mẫu cho $x$:',
          '$\\lim \\limits_{x \\to ' + infTex + '} \\dfrac{' + (infSign === 1 ? '' : '-') + '\\sqrt{' + a + ' + \\frac{' + b + '}{x} + \\frac{' + c + '}{x^2}}}{\\frac{' + d + '}{x} - ' + e + '} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên aIdx = 5', params: { aIdx: 5, b: 6, c: 9, d: 5, e: 4, infSign: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (a=3, d=5, e=4, +∞ -> -√3/4)', params: { aIdx: 1, b: 6, c: 9, d: 5, e: 4, infSign: 1 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Giới hạn tại vô cực dạng (d - ex) / √(a^2 x^2 + bx + c)
  t11_b16_d15_limit_inf_lin_over_sqrt_mc: {
    id: 't11_b16_d15_limit_inf_lin_over_sqrt_mc',
    name: 'Tính giới hạn tại vô cực của phân thức chứa √(a²x² + bx + c) ở mẫu',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> ±∞} (d - ex)/√(a^2 x^2 + bx + c).',
    conditionSummary: 'a ∈ [2; 5], e ∈ [2; 9], d ∈ [1; 9], b, c ∈ [-6; 6]\\{0}, infSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'a', label: 'Căn hệ số x^2 ở mẫu (hệ số là a^2)', min: 2, max: 5 },
      { name: 'e', label: 'Hệ số -ex ở tử', min: 2, max: 9 },
      { name: 'd', label: 'Hằng số ở tử', min: 1, max: 9 },
      { name: 'b', label: 'Hệ số x dưới căn', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hằng số dưới căn', min: -6, max: 6, allowZero: false },
      { name: 'infSign', label: 'Chiều vô cực (-1: -∞, 1: +∞)', min: -1, max: 1, allowZero: false },
    ],
    validateCode: `
      const { a, e, d, b, c, infSign } = params;
      if (a < 2 || e < 2 || d < 1 || b === 0 || c === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (infSign !== -1 && infSign !== 1) return { valid: false, reason: 'infSign phải là ±1' };
      if (e === a) return { valid: false, reason: 'Tránh e = a ra ±1 trùng nhiễu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, e, d, b, c, infSign } = params;
      const numStr = d + ' - ' + e + 'x';
      const radInner = u.formatQuadratic(a * a, b, c);
      const infTex = infSign === 1 ? '+\\infty' : '-\\infty';

      // Tử ~ -e x; Mẫu = |x| sqrt(a^2 + ...) ~ infSign * a * x => -infSign * e / a
      const ans = u.simplifyFrac(-infSign * e, a);
      const w1 = u.simplifyFrac(-infSign * e, a * a);
      const w2 = u.simplifyFrac(infSign * e, a);
      const w3 = u.simplifyFrac(-1, d);
      const wInf = infSign === 1 ? '+\\infty' : '-\\infty';

      const correct = '$' + ans.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$' + wInf + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(ans.num + k, ans.den).latex + '$'
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + infTex + '} \\dfrac{' + numStr + '}{\\sqrt{' + radInner + '}}$.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Vì $x \\to ' + infTex + '$ nên $\\sqrt{x^2} = |x| = ' + (infSign === 1 ? 'x' : '-x') + '$. Chia cả tử và mẫu cho $x$:',
          '$\\lim \\limits_{x \\to ' + infTex + '} \\dfrac{\\frac{' + d + '}{x} - ' + e + '}{' + (infSign === 1 ? '' : '-') + '\\sqrt{' + (a * a) + ' + \\frac{' + b + '}{x} + \\frac{' + c + '}{x^2}}} = \\dfrac{-' + e + '}{' + (infSign * a) + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, e: 9, d: 6, b: -3, c: -1, infSign: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (a=2 -> 4x^2, e=9 -> -9/2)', params: { a: 2, e: 9, d: 6, b: -3, c: -1, infSign: 1 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Giới hạn vô cực của đa thức bậc 3 hoặc bậc 4
  t11_b16_d16_limit_inf_poly_mc: {
    id: 't11_b16_d16_limit_inf_poly_mc',
    name: 'Tính giới hạn tại vô cực của hàm đa thức',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của hàm số',
    description: 'Tính lim_{x -> ±∞} (a_4 x^4 + a_3 x^3 + a_2 x^2 + a_1 x + a_0).',
    conditionSummary: 'a4 ∈ [-8; 8]\\{0}, a3, a2, a1, a0 ∈ [-8; 8]\\{0}, deg ∈ {3, 4}, infSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'deg', label: 'Bậc đa thức (3 hoặc 4)', min: 3, max: 4 },
      { name: 'lead', label: 'Hệ số bậc cao nhất', min: -8, max: 8, allowZero: false },
      { name: 'c2', label: 'Hệ số kế tiếp', min: -7, max: 7, allowZero: false },
      { name: 'c1', label: 'Hệ số x', min: -6, max: 6, allowZero: false },
      { name: 'c0', label: 'Hệ số tự do', min: -7, max: 7, allowZero: false },
      { name: 'infSign', label: 'Chiều vô cực (-1: -∞, 1: +∞)', min: -1, max: 1, allowZero: false },
    ],
    validateCode: `
      const { deg, lead, c2, c1, c0, infSign } = params;
      if ((deg !== 3 && deg !== 4) || lead === 0 || c2 === 0 || c1 === 0 || c0 === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (infSign !== -1 && infSign !== 1) return { valid: false, reason: 'infSign phải là ±1' };
      if (lead === c0) return { valid: false, reason: 'Tránh lead = c0 trùng nhiễu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { deg, lead, c2, c1, c0, infSign } = params;
      const coeffs = deg === 4 ? [lead, c2, 2, c1, c0] : [lead, c2, c1, c0];
      const polyStr = u.formatPoly(coeffs);
      const infTex = infSign === 1 ? '+\\infty' : '-\\infty';

      // x^deg sign when x -> infSign * infty
      const xPowSign = deg === 4 ? 1 : infSign;
      const ansSign = Math.sign(lead) * xPowSign;
      const ansTex = ansSign > 0 ? '+\\infty' : '-\\infty';
      const oppTex = ansSign > 0 ? '-\\infty' : '+\\infty';

      const correct = '$' + ansTex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + oppTex + '$', '$' + c0 + '$', '$' + lead + '$', '$0$'],
        rng
      );
      return {
        stem: 'Tính giới hạn $\\lim \\limits_{x \\to ' + infTex + '} (' + polyStr + ')$.',
        options,
        correctIndex,
        answerSummary: '$' + ansTex + '$',
        solutionSteps: [
          'Đặt $x^' + deg + '$ làm nhân tử chung: $\\lim \\limits_{x \\to ' + infTex + '} x^' + deg + ' = ' + (xPowSign > 0 ? '+\\infty' : '-\\infty') + '$ và giới hạn phần trong ngoặc bằng $' + lead + (lead > 0 ? ' > 0' : ' < 0') + '$, suy ra kết quả bằng $' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên deg = 2', params: { deg: 2, lead: -6, c2: -7, c1: -2, c0: -3, infSign: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (bậc 4, lead=-6, -∞ -> -∞)', params: { deg: 4, lead: -6, c2: -7, c1: -2, c0: -3, infSign: -1 }, expectedValid: true },
    ],
  },
};
