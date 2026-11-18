import { MathTemplate } from '../types/math';

export const G11_B15_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Khẳng định đúng về tính chất phép chiếu song song
  t11_b15_d01_proj_prop_correct_mc: {
    id: 't11_b15_d01_proj_prop_correct_mc',
    name: 'Nhận biết tính chất phép chiếu song song về đồng quy và tỉ số (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Phân biệt các tính chất của phép chiếu song song (biến 3 đường đồng quy thành 3 đường đồng quy, bảo toàn tỉ số đoạn thẳng song song, không bảo toàn độ dài/góc).',
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
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song',
            'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng bất kì',
            'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
          ],
          sol: 'Phép chiếu song song biến ba đường thẳng đồng quy (không song song phương chiếu) thành ba đường thẳng đồng quy; hai đường thẳng song song có thể chiếu thành song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn chu vi tam giác',
            'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
            'Phép chiếu song song luôn biến hai đường thẳng vuông góc thành hai đường thẳng vuông góc',
          ],
          sol: 'Phép chiếu song song chỉ bảo toàn tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc nằm trên hai đường thẳng song song.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song (không song song phương chiếu) là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng cắt nhau',
            'Phép chiếu song song bảo toàn số đo góc giữa hai đường thẳng',
            'Phép chiếu song song bảo toàn diện tích hình phẳng',
          ],
          sol: 'Qua phép chiếu song song, hai đường thẳng song song (không trùng phương chiếu) cho ảnh song song hoặc trùng nhau.',
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

  // D02 (Q2): Khẳng định sai về phép chiếu song song
  t11_b15_d02_proj_prop_wrong_mc: {
    id: 't11_b15_d02_proj_prop_wrong_mc',
    name: 'Nhận biết khẳng định sai về bảo toàn độ dài qua phép chiếu song song',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Chọn khẳng định sai trong các tính chất của phép chiếu song song.',
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
      const TRUE_OPTS = [
        'Phép chiếu song song biến ba đường thẳng đồng quy (trong mặt phẳng không song song phương chiếu) thành ba đường thẳng đồng quy',
        'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
        'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
      ];
      const FALSE_OPTS = [
        {
          stmt: 'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
          sol: 'Phép chiếu song song không bảo toàn độ dài đoạn thẳng (độ dài hình chiếu phụ thuộc phương chiếu và có thể bằng $0$).',
        },
        {
          stmt: 'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
          sol: 'Phép chiếu song song không bảo toàn góc hay tính vuông góc.',
        },
        {
          stmt: 'Phép chiếu song song luôn biến hình tròn thành hình tròn',
          sol: 'Hình chiếu song song của đường tròn nói chung là một hình elip (hoặc đoạn thẳng nếu mặt phẳng đường tròn song song phương chiếu).',
        },
      ];
      const f = FALSE_OPTS[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(f.stmt, TRUE_OPTS, rng);

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

  // D03 (Q3): Hình chiếu song song của đoạn thẳng là đoạn thẳng hoặc điểm
  t11_b15_d03_proj_segment_point_mc: {
    id: 't11_b15_d03_proj_segment_point_mc',
    name: 'Hình chiếu song song của đoạn thẳng (đoạn thẳng hoặc một điểm)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Nhận biết hình ảnh đầy đủ của đoạn thẳng, tia hoặc đường thẳng qua phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Đối tượng hình học (0: đoạn thẳng, 1: đường thẳng, 2: tam giác)', min: 0, max: 2 },
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
            'Hình chiếu song song của hình thoi luôn cho một hình thoi',
            'Hình chiếu song song của một đoạn thẳng luôn là một đoạn thẳng',
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
          ],
          sol: 'Nếu đoạn thẳng không song song phương chiếu thì hình chiếu là một đoạn thẳng; nếu song song phương chiếu thì hình chiếu suy biến thành một điểm.',
        },
        {
          correct: 'Hình chiếu song song của một đường thẳng là một đường thẳng hoặc một điểm',
          wrongs: [
            'Hình chiếu song song của một đường thẳng luôn là một đường thẳng',
            'Hình chiếu song song của hình vuông luôn có hai cạnh kề vuông góc',
            'Hình chiếu song song của hình bình hành có thể là một hình ngũ giác',
          ],
          sol: 'Đường thẳng song song với phương chiếu sẽ có hình chiếu là một điểm, ngược lại hình chiếu là một đường thẳng.',
        },
        {
          correct: 'Hình chiếu song song của một tam giác là một tam giác hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của tam giác cân luôn là tam giác cân',
            'Hình chiếu song song của một tam giác luôn là một tam giác',
            'Hình chiếu song song của tam giác đều luôn có ba góc bằng $60^\\circ$',
          ],
          sol: 'Nếu mặt phẳng tam giác song song phương chiếu thì hình chiếu suy biến thành một đoạn thẳng; ngược lại là một tam giác.',
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

  // D04 (Q4): Chiếu đỉnh lăng trụ lên mặt đáy theo phương cạnh bên
  t11_b15_d04_prism_proj_vertex_base_mc: {
    id: 't11_b15_d04_prism_proj_vertex_base_mc',
    name: 'Ảnh của đỉnh lăng trụ lên mặt phẳng đáy theo phương cạnh bên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Cho hình lăng trụ ABC.A1B1C1, xác định hình chiếu song song của một đỉnh đáy trên lên đáy dưới theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh được chiếu (0: A, 1: B, 2: C)', min: 0, max: 2 },
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
        { b: ['M', 'N', 'P'], t: ['M_1', 'N_1', 'P_1'] },
      ];
      const s = SETS[setIdx];
      const srcPt = s.t[vIdx];
      const imgPt = s.b[vIdx];
      const dirIdx = (vIdx + 2) % 3;
      const projDir = s.t[dirIdx] + s.b[dirIdx];
      const baseName = s.b.join('');

      const w1 = s.t[vIdx];
      const w2 = s.b[(vIdx + 2) % 3];
      const w3 = s.t[(vIdx + 1) % 3];

      const correct = 'Điểm $' + imgPt + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );

      return {
        stem: 'Cho hình lăng trụ $' + baseName + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + srcPt + '$ lên mặt phẳng $(' + baseName + ')$ theo phương $' + projDir + '$ là điểm nào?',
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
          'Vì $' + srcPt + imgPt + ' \\parallel ' + projDir + '$ và $' + imgPt + ' \\in (' + baseName + ')$ nên hình chiếu song song của $' + srcPt + '$ lên $(' + baseName + ')$ theo phương $' + projDir + '$ là điểm $' + imgPt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { setIdx: 0, vIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (C1 lên (ABC) theo B1B -> C)', params: { setIdx: 0, vIdx: 2 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu đỉnh đáy dưới lên đáy trên (DEF) theo phương cạnh bên FC
  t11_b15_d05_prism_proj_vertex_top_mc: {
    id: 't11_b15_d05_prism_proj_vertex_top_mc',
    name: 'Ảnh của đỉnh đáy dưới lên mặt đáy trên lăng trụ theo phương cạnh bên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Cho hình lăng trụ ABC.DEF. Tìm hình chiếu song song của điểm B lên mặt phẳng (DEF) theo phương FC.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh được chiếu (0: A, 1: B, 2: C)', min: 0, max: 2 },
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
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"] },
      ];
      const s = SETS[setIdx];
      const srcPt = s.b[vIdx];
      const imgPt = s.t[vIdx];
      const dirIdx = (vIdx + 1) % 3;
      const projDir = s.t[dirIdx] + s.b[dirIdx];
      const topName = s.t.join('');

      const w1 = s.t[(vIdx + 1) % 3];
      const w2 = s.t[(vIdx + 2) % 3];
      const w3 = s.b[vIdx];

      const correct = 'Điểm $' + imgPt + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );

      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + topName + '$. Hình chiếu song song của điểm $' + srcPt + '$ lên mặt phẳng $(' + topName + ')$ theo phương $' + projDir + '$ là điểm nào?',
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
          'Các cạnh bên của hình lăng trụ song song nhau nên $' + srcPt + imgPt + ' \\parallel ' + projDir + '$. Do $' + imgPt + ' \\in (' + topName + ')$ nên hình chiếu của $' + srcPt + '$ lên $(' + topName + ')$ theo phương $' + projDir + '$ là điểm $' + imgPt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, vIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (ABC.DEF, B lên (DEF) theo FC -> E)', params: { setIdx: 0, vIdx: 1 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Giới hạn tổng / hiệu hai dãy số
  t11_b15_d06_limit_sum_diff_mc: {
    id: 't11_b15_d06_limit_sum_diff_mc',
    name: 'Tính giới hạn tổng hoặc hiệu hai dãy số biết giới hạn thành phần',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Biết lim u_n = a và lim v_n = b. Tính lim(u_n - v_n) hoặc lim(u_n + v_n).',
    conditionSummary: 'a ∈ [-8; 8], b ∈ [-8; 8] \\ {0}, op ∈ {0, 1}',
    paramSpecs: [
      { name: 'a', label: 'Giới hạn lim u_n', min: -8, max: 8 },
      { name: 'b', label: 'Giới hạn lim v_n', min: -8, max: 8, allowZero: false },
      { name: 'op', label: 'Phép toán (0: u_n - v_n, 1: u_n + v_n)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, op } = params;
      if (a < -8 || a > 8 || b < -8 || b > 8 || b === 0 || (op !== 0 && op !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (a === b || a === -b) return { valid: false, reason: 'Tránh a = ±b làm trùng đáp án nhiễu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, op } = params;
      const ans = op === 0 ? a - b : a + b;
      const expr = op === 0 ? 'u_n - v_n' : 'u_n + v_n';
      const alt = op === 0 ? a + b : a - b;
      const flipped = -ans;
      const prod = a * b;

      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + alt + '$', '$' + flipped + '$', '$' + prod + '$', '$' + (ans + 2) + '$'],
        rng,
        (j) => '$' + (ans + j * 3) + '$'
      );

      return {
        stem: 'Cho hai dãy số $(u_n)$ và $(v_n)$ có $\\lim u_n = ' + a + '$ và $\\lim v_n = ' + b + '$. Tính giới hạn $\\lim (' + expr + ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng định lí giới hạn hữu hạn: $\\lim (' + expr + ') = \\lim u_n ' + (op === 0 ? '-' : '+') + ' \\lim v_n = ' + a + (op === 0 ? (b < 0 ? ' - (' + b + ')' : ' - ' + b) : (b < 0 ? ' + (' + b + ')' : ' + ' + b)) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 2, b: 0, op: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (a=1, b=3, u_n - v_n -> -2)', params: { a: 1, b: 3, op: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Giới hạn tổ hợp tuyến tính p*u_n + q*v_n + c
  t11_b15_d07_limit_linear_combo_mc: {
    id: 't11_b15_d07_limit_linear_combo_mc',
    name: 'Tính giới hạn biểu thức tuyến tính p·u_n + q·v_n + c',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Biết lim u_n = a và lim v_n = b. Tính lim(p·u_n + q·v_n + c).',
    conditionSummary: 'a, b ∈ [-6; 6], p, q ∈ [-3; 3] \\ {0}, c ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'lim u_n', min: -6, max: 6 },
      { name: 'b', label: 'lim v_n', min: -6, max: 6 },
      { name: 'p', label: 'Hệ số p', min: -3, max: 3, allowZero: false },
      { name: 'q', label: 'Hệ số q', min: -3, max: 3, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b, p, q, c } = params;
      if (a < -6 || a > 6 || b < -6 || b > 6 || p === 0 || Math.abs(p) > 3 || q === 0 || Math.abs(q) > 3 || c === 0 || Math.abs(c) > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, p, q, c } = params;
      const ans = p * a + q * b + c;
      const expr = u.formatTerm(p, 'u_n', true) + u.formatTerm(q, 'v_n', false) + u.formatTerm(c, '', false);

      const w1 = -p * a + q * b + c;
      const w2 = p * a - q * b + c;
      const w3 = p * a + q * b - c;

      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1 + '$', '$' + w2 + '$', '$' + w3 + '$', '$' + (ans + 2) + '$'],
        rng,
        (j) => '$' + (ans + j * 5) + '$'
      );

      const aStr = a < 0 ? '(' + a + ')' : String(a);
      const bStr = b < 0 ? '(' + b + ')' : String(b);

      return {
        stem: 'Cho hai dãy số $(u_n)$ và $(v_n)$ có $\\lim u_n = ' + a + '$ và $\\lim v_n = ' + b + '$. Tính giới hạn $\\lim (' + expr + ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\lim (' + expr + ') = ' + p + ' \\cdot ' + aStr + (q < 0 ? ' - ' + Math.abs(q) : ' + ' + q) + ' \\cdot ' + bStr + u.formatTrailingConst(c) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { a: 1, b: -3, p: 0, q: 2, c: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (a=1, b=-3, -u_n + 2v_n + 7 -> 0)', params: { a: 1, b: -3, p: -1, q: 2, c: 7 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Giới hạn phân thức chứa u_n và v_n
  t11_b15_d08_limit_rational_uv_mc: {
    id: 't11_b15_d08_limit_rational_uv_mc',
    name: 'Tính giới hạn biểu thức phân thức chứa hai dãy số u_n, v_n',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của dãy số',
    description: 'Biết lim u_n = a và lim v_n = b ≠ 0. Tính giới hạn phân thức dạng -(c - d·u_n)/(e·v_n).',
    conditionSummary: 'a ∈ [-6; 6], b ∈ [-5; 5] \\ {0}, c ∈ [1; 5], d ∈ [1; 4], e ∈ [1; 4], d·a ≠ c',
    paramSpecs: [
      { name: 'a', label: 'lim u_n', min: -6, max: 6 },
      { name: 'b', label: 'lim v_n', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: 1, max: 5 },
      { name: 'd', label: 'Hệ số d của u_n', min: 1, max: 4 },
      { name: 'e', label: 'Hệ số e của v_n', min: 1, max: 4 },
    ],
    validateCode: `
      const { a, b, c, d, e } = params;
      if (a < -6 || a > 6 || b === 0 || b < -5 || b > 5 || c < 1 || c > 5 || d < 1 || d > 4 || e < 1 || e > 4) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (d * a === c) return { valid: false, reason: 'Tránh tử số bằng 0 để phân số không tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, e } = params;
      // -(c - d*a) / (e*b) = (d*a - c) / (e*b)
      const num = d * a - c;
      const den = e * b;
      const ansF = u.simplifyFrac(num, den);
      const w1 = u.simplifyFrac(-num, den);
      const w2 = u.simplifyFrac(num, den + 2 === 0 ? den + 1 : den + 2);
      const w3 = u.simplifyFrac(c - d * b, e * a === 0 ? e : e * a);

      const dTerm = d === 1 ? 'u_n' : d + 'u_n';
      const eTerm = e === 1 ? 'v_n' : e + 'v_n';
      const expr = '-\\frac{' + c + ' - ' + dTerm + '}{' + eTerm + '}';

      const correct = '$' + ansF.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$'],
        rng,
        (j) => '$' + u.simplifyFrac(num + j, den).latex + '$'
      );

      return {
        stem: 'Cho hai dãy số $(u_n)$ và $(v_n)$ có $\\lim u_n = ' + a + '$ và $\\lim v_n = ' + b + '$. Tính giới hạn $\\lim \\left(' + expr + '\\right)$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thay $\\lim u_n = ' + a + '$ và $\\lim v_n = ' + b + '$ vào biểu thức: $\\lim \\left(' + expr + '\\right) = -\\frac{' + c + ' - ' + d + '\\cdot(' + a + ')}{' + e + '\\cdot(' + b + ')} = ' + ansF.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 4, b: 0, c: 1, d: 2, e: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (a=4, b=-3 -> -7/6)', params: { a: 4, b: -3, c: 1, d: 2, e: 2 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Giới hạn phân thức bậc 2 trên bậc 2
  t11_b15_d09_limit_poly_same_deg_mc: {
    id: 't11_b15_d09_limit_poly_same_deg_mc',
    name: 'Tính giới hạn phân thức hữu tỉ bậc hai trên bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính lim (a·n^2 + b·n + c)/(d·n^2 + e·n + f) khi n tiến ra vô cực.',
    conditionSummary: 'a, d ∈ [-9; 9] \\ {0}, b, c, e, f ∈ [-8; 8]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số n^2 ở tử', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số n ở tử', min: -8, max: 8 },
      { name: 'c', label: 'Hằng số ở tử', min: -8, max: 8 },
      { name: 'd', label: 'Hệ số n^2 ở mẫu', min: 1, max: 9 },
      { name: 'e', label: 'Hệ số n ở mẫu', min: -8, max: 8 },
      { name: 'f', label: 'Hằng số ở mẫu', min: -8, max: 8 },
    ],
    validateCode: `
      const { a, b, c, d, e, f } = params;
      if (a === 0 || Math.abs(a) > 9 || d < 1 || d > 9) return { valid: false, reason: 'Tham số bậc cao không hợp lệ' };
      if (Math.abs(b) > 8 || Math.abs(c) > 8 || Math.abs(e) > 8 || Math.abs(f) > 8) return { valid: false, reason: 'Hệ số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, e, f } = params;
      const ansF = u.simplifyFrac(a, d);
      const w1 = u.simplifyFrac(-a, d);
      const w2 = '$' + a + '$';
      const w3 = '$0$';
      const numPoly = u.formatPoly([a, b, c], 'n');
      const denPoly = u.formatPoly([d, e, f], 'n');

      const correct = '$' + ansF.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', w2, w3, '$' + u.simplifyFrac(a + 1, d).latex + '$'],
        rng,
        (j) => '$' + u.simplifyFrac(a + j * 2, d).latex + '$'
      );

      return {
        stem: 'Tính giới hạn $\\lim \\frac{' + numPoly + '}{' + denPoly + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia cả tử và mẫu cho $n^2$, ta được $\\lim \\frac{' + numPoly + '}{' + denPoly + '} = \\lim \\frac{' + a + ' + \\frac{' + b + '}{n} + \\frac{' + c + '}{n^2}}{' + d + ' + \\frac{' + e + '}{n} + \\frac{' + f + '}{n^2}} = ' + ansF.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -5, c: -4, d: 8, e: 5, f: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (-9/8)', params: { a: -9, b: -5, c: -4, d: 8, e: 5, f: 1 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Giới hạn phân thức bậc tử nhỏ hơn bậc mẫu -> 0
  t11_b15_d10_limit_poly_lower_deg_mc: {
    id: 't11_b15_d10_limit_poly_lower_deg_mc',
    name: 'Tính giới hạn phân thức hữu tỉ bậc tử nhỏ hơn bậc mẫu',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính lim (a·n + b)/(c·n^3 + d·n^2 + e·n + f).',
    conditionSummary: 'a, c ∈ [-7; 7] \\ {0}, b, d, e, f ∈ [-8; 8]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số n ở tử', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hằng số ở tử', min: -8, max: 8 },
      { name: 'c', label: 'Hệ số n^3 ở mẫu', min: -7, max: 7, allowZero: false },
      { name: 'd', label: 'Hệ số n^2 ở mẫu', min: -8, max: 8 },
      { name: 'e', label: 'Hệ số n ở mẫu', min: -8, max: 8 },
      { name: 'f', label: 'Hằng số ở mẫu', min: -8, max: 8 },
    ],
    validateCode: `
      const { a, c } = params;
      if (a === 0 || Math.abs(a) > 7 || c === 0 || Math.abs(c) > 7) return { valid: false, reason: 'Tham số bậc cao bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, e, f } = params;
      const numPoly = u.formatPoly([a, b], 'n');
      const denPoly = u.formatPoly([c, d, e, f], 'n');
      const ratio = u.simplifyFrac(a, c);
      const negRatio = u.simplifyFrac(-a, c);

      const correct = '$0$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + ratio.latex + '$', '$' + negRatio.latex + '$', '$' + c + '$', '$1$'],
        rng,
        (j) => '$' + j + '$'
      );

      return {
        stem: 'Tính giới hạn $\\lim \\frac{' + numPoly + '}{' + denPoly + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia cả tử và mẫu cho $n^3$, tử tiến về $0$ còn mẫu tiến về $' + c + ' \\ne 0$.',
          'Do đó $\\lim \\frac{' + numPoly + '}{' + denPoly + '} = 0$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { a: 2, b: 1, c: 0, d: -7, e: -7, f: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (= 0)', params: { a: 2, b: 1, c: -4, d: -7, e: -7, f: 8 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Giới hạn chứa căn bậc hai dạng sqrt(a n^2 + b n + c) / (d - e n)
  t11_b15_d11_limit_sqrt_over_linear_mc: {
    id: 't11_b15_d11_limit_sqrt_over_linear_mc',
    name: 'Tính giới hạn dãy số chứa căn thức bậc hai trên bậc nhất',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính lim √(a·n^2 + b·n + c)/(d - e·n) với a không chính phương.',
    conditionSummary: 'aIdx ∈ [0; 7], b ∈ [1; 6], c ∈ [1; 6], d ∈ [1; 6], e ∈ [2; 6]',
    paramSpecs: [
      { name: 'aIdx', label: 'Chỉ số hệ số n^2 trong căn (0..7)', min: 0, max: 7 },
      { name: 'b', label: 'Hệ số n trong căn', min: 1, max: 6 },
      { name: 'c', label: 'Hằng số trong căn', min: 1, max: 6 },
      { name: 'd', label: 'Hằng số d ở mẫu', min: 1, max: 6 },
      { name: 'e', label: 'Hệ số trừ e ở mẫu', min: 2, max: 6 },
    ],
    validateCode: `
      const { aIdx, b, c, d, e } = params;
      if (aIdx < 0 || aIdx > 7 || b < 1 || b > 6 || c < 1 || c > 6 || d < 1 || d > 6 || e < 2 || e > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aIdx, b, c, d, e } = params;
      const SQFREE = [2, 3, 5, 6, 7, 10, 11, 13];
      const a = SQFREE[aIdx];
      const insidePoly = u.formatPoly([a, b, c], 'n');

      const correct = '$-\\frac{\\sqrt{' + a + '}}{' + e + '}$';
      const w1 = '$\\frac{\\sqrt{' + a + '}}{' + e + '}$';
      const w2 = '$-\\frac{' + a + '}{' + e + '}$';
      const w3 = '$\\frac{\\sqrt{' + (a + 1) + '}}{' + (e > 2 ? e - 1 : e) + '}$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3, '$1$'],
        rng,
        (j) => '$-\\frac{\\sqrt{' + a + '}}{' + (e + j) + '}$'
      );

      return {
        stem: 'Tính giới hạn $\\lim \\frac{\\sqrt{' + insidePoly + '}}{' + d + ' - ' + e + 'n}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia cả tử và mẫu cho $n > 0$: $\\lim \\frac{\\sqrt{' + a + ' + \\frac{' + b + '}{n} + \\frac{' + c + '}{n^2}}}{\\frac{' + d + '}{n} - ' + e + '} = -\\frac{\\sqrt{' + a + '}}{' + e + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên e = 1', params: { aIdx: 2, b: 2, c: 2, d: 2, e: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (a=5, d=2, e=4 -> -sqrt(5)/4)', params: { aIdx: 2, b: 2, c: 2, d: 2, e: 4 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Giới hạn phân thức chứa lũy thừa a·p^n + b·q^n
  t11_b15_d12_limit_exp_ratio_mc: {
    id: 't11_b15_d12_limit_exp_ratio_mc',
    name: 'Tính giới hạn dãy số chứa lũy thừa mũ n',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính lim (a·p^n + b·q^n)/(c + d·q^n) với 2 ≤ p < q.',
    conditionSummary: '2 ≤ p < q ≤ 8, a, b, c, d ∈ [-8; 8] \\ {0}',
    paramSpecs: [
      { name: 'p', label: 'Cơ số nhỏ p', min: 2, max: 7 },
      { name: 'q', label: 'Cơ số lớn q', min: 3, max: 8 },
      { name: 'a', label: 'Hệ số p^n', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số q^n ở tử', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hằng số c ở mẫu', min: 1, max: 9 },
      { name: 'd', label: 'Hệ số q^n ở mẫu', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { p, q, a, b, c, d } = params;
      if (p < 2 || q <= p || q > 8 || a === 0 || b === 0 || d === 0 || c < 1 || c > 9) {
        return { valid: false, reason: 'Điều kiện cơ số 2 ≤ p < q hoặc hệ số không hợp lệ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, a, b, c, d } = params;
      const ansF = u.simplifyFrac(b, d);
      const w1 = u.simplifyFrac(-b, d);
      const w2 = u.simplifyFrac(a, d);
      const w3 = u.simplifyFrac(c, b);

      const numStr = u.formatTerm(a, '\\cdot ' + p + '^n', true).replace(/^(-?)\\cdot /, '$1') + u.formatTerm(b, '\\cdot ' + q + '^n', false);
      const cleanNum = (a === 1 ? p + '^n' : a === -1 ? '-' + p + '^n' : a + ' \\cdot ' + p + '^n')
        + (b < 0 ? ' - ' + (Math.abs(b) === 1 ? '' : Math.abs(b) + ' \\cdot ') + q + '^n' : ' + ' + (b === 1 ? '' : b + ' \\cdot ') + q + '^n');
      const cleanDen = c + (d < 0 ? ' - ' + (Math.abs(d) === 1 ? '' : Math.abs(d) + ' \\cdot ') + q + '^n' : ' + ' + (d === 1 ? '' : d + ' \\cdot ') + q + '^n');

      const correct = '$' + ansF.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$' + c + '$'],
        rng,
        (j) => '$' + u.simplifyFrac(b + j, d).latex + '$'
      );

      return {
        stem: 'Tính giới hạn $\\lim \\frac{' + cleanNum + '}{' + cleanDen + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Chia cả tử và mẫu cho $' + q + '^n$. Vì $0 < \\frac{' + p + '}{' + q + '} < 1$ nên $\\lim \\left(\\frac{' + p + '}{' + q + '}\\right)^n = 0$ và $\\lim \\frac{' + c + '}{' + q + '^n} = 0$.',
          'Suy ra giới hạn bằng $\\frac{' + b + '}{' + d + '} = ' + ansF.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 6, q: 6, a: -6, b: -5, c: 8, d: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (p=3, q=6 -> 5/3)', params: { p: 3, q: 6, a: -6, b: -5, c: 8, d: -3 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Tổng cấp số nhân lùi vô hạn đan dấu S = 1 - 1/k + 1/k^2 - ...
  t11_b15_d13_infinite_gp_alt_mc: {
    id: 't11_b15_d13_infinite_gp_alt_mc',
    name: 'Tổng cấp số nhân lùi vô hạn đan dấu S = 1 - 1/k + 1/k² - ...',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính tổng S = 1 - 1/k + 1/k^2 + ... + (-1/k)^n + ...',
    conditionSummary: 'k ∈ [2; 11]',
    paramSpecs: [
      { name: 'k', label: 'Mẫu số công bội k', min: 2, max: 11 },
    ],
    validateCode: `
      if (params.k < 2 || params.k > 11) return { valid: false, reason: 'k ngoài miền [2; 11]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const ansF = u.simplifyFrac(k, k + 1);
      const w1 = u.simplifyFrac(k, k - 1);
      const w2 = '$' + (k + 1) + '$';
      const w3 = '$' + (1 - k) + '$';

      const correct = '$' + ansF.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', w2, w3, '$1$'],
        rng,
        (j) => '$' + u.simplifyFrac(k + j, k + 1).latex + '$'
      );

      return {
        stem: 'Tính tổng của cấp số nhân lùi vô hạn $S = 1 - \\frac{1}{' + k + '} + \\frac{1}{' + (k * k) + '} - \\dots + \\left(-\\frac{1}{' + k + '}\\right)^n + \\dots$',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Cấp số nhân lùi vô hạn có số hạng đầu $u_1 = 1$ và công bội $q = -\\frac{1}{' + k + '}$ (thỏa mãn $|q| < 1$).',
          'Tổng $S = \\frac{u_1}{1 - q} = \\frac{1}{1 - \\left(-\\frac{1}{' + k + '}\\right)} = \\frac{1}{\\frac{' + (k + 1) + '}{' + k + '}} = ' + ansF.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (k=6 -> 6/7)', params: { k: 6 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Tổng cấp số nhân lùi vô hạn dạng u1 + u1*q + ... + u1*q^{n-1} + ...
  t11_b15_d14_infinite_gp_general_mc: {
    id: 't11_b15_d14_infinite_gp_general_mc',
    name: 'Tổng cấp số nhân lùi vô hạn dạng tổng quát u₁/(1 - q)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính tổng cấp số nhân lùi vô hạn cho bởi số hạng đầu u1 và công bội q = 1/k.',
    conditionSummary: 'u1 ∈ [-7; 7] \\ {0}, k ∈ [2; 8]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -7, max: 7, allowZero: false },
      { name: 'k', label: 'Mẫu số công bội q = 1/k', min: 2, max: 8 },
    ],
    validateCode: `
      const { u1, k } = params;
      if (u1 === 0 || Math.abs(u1) > 7 || k < 2 || k > 8) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, k } = params;
      const u2F = u.simplifyFrac(u1, k);
      const u2Term = u2F.num < 0 ? ' - ' + u.simplifyFrac(-u2F.num, u2F.den).latex : ' + ' + u2F.latex;
      const genTerm = u1 < 0 ? ' - ' + Math.abs(u1) + '\\left(\\frac{1}{' + k + '}\\right)^{n-1}' : ' + ' + u1 + '\\left(\\frac{1}{' + k + '}\\right)^{n-1}';

      const ansF = u.simplifyFrac(u1 * k, k - 1);
      const w1 = u.simplifyFrac(u1, k - 1);
      const w2 = '$' + (u1 * k) + '$';
      const w3 = u.simplifyFrac(1, k - 1);

      const correct = '$' + ansF.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', w2, '$' + w3.latex + '$', '$' + u.simplifyFrac(u1 * k, k + 1).latex + '$'],
        rng,
        (j) => '$' + u.simplifyFrac(u1 * k + j, k - 1).latex + '$'
      );

      return {
        stem: 'Tính tổng của cấp số nhân lùi vô hạn $S = ' + u1 + u2Term + ' + \\dots' + genTerm + ' + \\dots$',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Cấp số nhân lùi vô hạn có $u_1 = ' + u1 + '$ và công bội $q = \\frac{1}{' + k + '}$ thỏa mãn $|q| < 1$.',
          '$S = \\frac{u_1}{1 - q} = \\frac{' + u1 + '}{1 - \\frac{1}{' + k + '}} = ' + ansF.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0', params: { u1: 0, k: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (u1=-3, k=5 -> -15/4)', params: { u1: -3, k: 5 }, expectedValid: true },
    ],
  },
};
