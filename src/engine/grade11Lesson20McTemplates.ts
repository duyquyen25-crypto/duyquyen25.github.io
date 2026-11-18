import { MathTemplate } from '../types/math';

export const G11_B20_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Phép chiếu song song — chọn khẳng định ĐÚNG
  t11_b20_d01_proj_prop_correct_mc: {
    id: 't11_b20_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Nhận biết các tính chất bảo toàn của phép chiếu song song trong không gian.',
    conditionSummary: 'mode ∈ [0; 4]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề (0..4)', min: 0, max: 4 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 4) return { valid: false, reason: 'mode ngoài miền [0; 4]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy (hoặc trùng nhau)',
          wrongs: [
            'Phép chiếu song song bảo toàn diện tích',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
            'Phép chiếu song song bảo toàn hình dạng của một hình',
          ],
          sol: 'Phép chiếu song song bảo toàn tính đồng quy (khi các đường thẳng không song song phương chiếu).',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự ba điểm đó',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn số đo góc',
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song biến hai đường thẳng cắt nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và bảo toàn thứ tự của chúng.',
        },
        {
          correct: 'Phép chiếu song song biến trung điểm của một đoạn thẳng thành trung điểm của đoạn thẳng ảnh (khi đoạn thẳng không song song phương chiếu)',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
            'Phép chiếu song song bảo toàn thể tích khối đa diện',
            'Phép chiếu song song biến đường tròn luôn thành đường tròn cùng bán kính',
          ],
          sol: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song hoặc cùng nằm trên một đường thẳng.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau (khi không song song phương chiếu)',
          wrongs: [
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng song song',
            'Phép chiếu song song bảo toàn chu vi tam giác',
            'Phép chiếu song song luôn biến tam giác vuông thành tam giác vuông',
          ],
          sol: 'Tính song song được bảo toàn qua phép chiếu song song (hoặc ảnh của hai đường thẳng song song trùng nhau nếu cùng thuộc mặt phẳng chứa phương chiếu).',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng (không song song phương chiếu)',
          wrongs: [
            'Phép chiếu song song bảo toàn diện tích tam giác',
            'Phép chiếu song song luôn biến hình vuông thành hình thoi',
            'Phép chiếu song song biến ba điểm không thẳng hàng luôn thành ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song bảo toàn tỉ số của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc trên hai đường thẳng song song.',
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
      { label: 'Biên mode = 5', params: { mode: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Phép chiếu song song — chọn khẳng định SAI
  t11_b20_d02_proj_prop_wrong_mc: {
    id: 't11_b20_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Nhận biết khẳng định sai về những đại lượng không được bảo toàn qua phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể câu sai (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song bảo toàn diện tích',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song không bảo toàn diện tích của hình, nên khẳng định này sai.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn số đo góc giữa hai đường thẳng',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song biến tia thành tia (khi đường thẳng chứa tia không song song phương chiếu)',
            'Phép chiếu song song có thể biến hình vuông thành hình bình hành',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn góc hay tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song không làm thay đổi độ dài mọi đoạn thẳng',
          wrongs: [
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng trên cùng một đường thẳng',
          ],
          sol: 'Độ dài đoạn thẳng có thể bị thay đổi (co giãn hoặc bằng 0) qua phép chiếu song song.',
        },
        {
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Hình chiếu song song của đoạn thẳng (không song song phương chiếu) là một đoạn thẳng',
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          ],
          sol: 'Hình chiếu song song cùng nằm trong mặt phẳng chiếu nên không thể cho ra hai đường thẳng chéo nhau.',
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
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (bảo toàn diện tích)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của đoạn thẳng / hình phẳng cơ bản
  t11_b20_d03_proj_segment_shape_mc: {
    id: 't11_b20_d03_proj_segment_shape_mc',
    name: 'Hình chiếu song song của đoạn thẳng và các hình phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Phân biệt kết quả hình chiếu song song của đoạn thẳng, hình chữ nhật, đường tròn, tam giác đều.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể câu đúng (0..2)', min: 0, max: 2 },
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
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
            'Hình chiếu song song của một đường tròn luôn là một đường elip hoặc một đường tròn',
            'Hình chiếu song song của một tam giác đều luôn là một tam giác cân',
          ],
          sol: 'Nếu đoạn thẳng không song song phương chiếu thì hình chiếu là đoạn thẳng; nếu song song phương chiếu thì hình chiếu suy biến thành một điểm.',
        },
        {
          correct: 'Hình chiếu song song của một đường tròn có thể là đường elip, đường tròn hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của một đường tròn có thể là một điểm',
            'Hình chiếu song song của hình vuông luôn là một hình thoi',
            'Hình chiếu song song của hai đoạn thẳng bằng nhau luôn có độ dài bằng nhau',
          ],
          sol: 'Khi mặt phẳng chứa đường tròn song song với phương chiếu, hình chiếu của đường tròn là một đoạn thẳng; các trường hợp khác là elip hoặc đường tròn.',
        },
        {
          correct: 'Hình chiếu song song của hình bình hành là hình bình hành hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của hình bình hành luôn là hình chữ nhật',
            'Hình chiếu song song của hình thoi luôn giữ nguyên hai đường chéo vuông góc',
            'Hình chiếu song song của hình thang cân luôn là hình thang cân',
          ],
          sol: 'Vì phép chiếu song song bảo toàn tính song song của các cạnh đối nên ảnh của hình bình hành là hình bình hành (hoặc đoạn thẳng khi mặt phẳng chứa hình song song phương chiếu).',
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
      { label: 'Mẫu chuẩn Q3', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Chiếu đỉnh trên lăng trụ lên mặt bên đối diện theo cạnh đáy đầu (A1 -> B1)
  t11_b20_d04_prism_proj_lat_1_mc: {
    id: 't11_b20_d04_prism_proj_lat_1_mc',
    name: 'Hình chiếu song song đỉnh lăng trụ lên mặt bên đối diện (phương cạnh đáy thứ nhất)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Tìm hình chiếu song song của đỉnh đáy trên lăng trụ lên mặt bên đối diện theo phương cạnh đáy thứ nhất.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh đáy trên được chiếu (0..2)', min: 0, max: 2 },
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
        { b: ['A', 'B', 'C'], t: ['D', 'E', 'F'] },
        { b: ['M', 'N', 'P'], t: ["M'", "N'", "P'"] },
      ];
      const s = SETS[setIdx];
      const j = (vIdx + 1) % 3;
      const k = (vIdx + 2) % 3;
      const src = s.t[vIdx];
      const img = s.t[j];
      const dir = s.b[vIdx] + s.b[j];
      const latPlane = s.b[j] + s.b[k] + s.t[k] + s.t[j];

      const w1 = s.b[vIdx];
      const w2 = s.b[j];
      const w3 = s.b[k];

      const correct = 'Điểm $' + img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + src + '$ lên mặt phẳng $(' + latPlane + ')$ theo phương $' + dir + '$ là điểm nào?',
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
          'Vì $' + src + img + ' \\parallel ' + dir + '$ và $' + img + ' \\in (' + latPlane + ')$ nên hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { setIdx: 0, vIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (A_1 lên (BCC_1B_1) theo AB -> B_1)', params: { setIdx: 0, vIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu đỉnh trên lăng trụ lên mặt bên đối diện theo cạnh đáy thứ hai (D -> F)
  t11_b20_d05_prism_proj_lat_2_mc: {
    id: 't11_b20_d05_prism_proj_lat_2_mc',
    name: 'Hình chiếu song song đỉnh lăng trụ lên mặt bên đối diện (phương cạnh đáy thứ hai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Tìm hình chiếu song song của đỉnh đáy trên lên mặt bên đối diện theo phương cạnh đáy còn lại.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh đáy trên được chiếu (0..2)', min: 0, max: 2 },
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
        { b: ['A', 'B', 'C'], t: ['A_1', 'B_1', 'C_1'] },
        { b: ['M', 'N', 'P'], t: ["M'", "N'", "P'"] },
      ];
      const s = SETS[setIdx];
      const j = (vIdx + 1) % 3;
      const k = (vIdx + 2) % 3;
      const src = s.t[vIdx];
      const img = s.t[k];
      const dir = s.b[vIdx] + s.b[k];
      const latPlane = s.b[j] + s.b[k] + s.t[k] + s.t[j];

      const w1 = s.b[j];
      const w2 = s.t[j];
      const w3 = s.b[k];

      const correct = 'Điểm $' + img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + src + '$ lên mặt phẳng $(' + latPlane + ')$ theo phương $' + dir + '$ là điểm nào?',
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
          'Vì $' + src + img + ' \\parallel ' + dir + '$ và $' + img + ' \\in (' + latPlane + ')$ nên hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, vIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (D lên (BCFE) theo AC -> F)', params: { setIdx: 0, vIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Nhận biết hàm số mũ
  t11_b20_d06_identify_exp_func_mc: {
    id: 't11_b20_d06_identify_exp_func_mc',
    name: 'Nhận biết hàm số mũ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Phân biệt hàm số mũ y = a^x (a > 0, a ≠ 1) với hàm số luỹ thừa và hàm số lôgarit.',
    conditionSummary: 'bIdx ∈ [0; 4], k ∈ [2; 6]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số hàm số mũ (0..4)', min: 0, max: 4 },
      { name: 'k', label: 'Hệ số mũ phân biệt ở phương án nhiễu', min: 2, max: 6 },
    ],
    validateCode: `
      const { bIdx, k } = params;
      if (bIdx < 0 || bIdx > 4 || k < 2 || k > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k } = params;
      const BASES = [
        { tex: 'e', logBase: String(k + 1), powExp: 'e' },
        { tex: '\\pi', logBase: String(k), powExp: '\\pi' },
        { tex: '\\sqrt{2}', logBase: String(k + 2), powExp: '\\sqrt{2}' },
        { tex: '3', logBase: String(k + 1), powExp: '3' },
        { tex: '\\left(\\dfrac{1}{2}\\right)', logBase: String(k), powExp: 'e' },
      ];
      const item = BASES[bIdx];
      const correct = '$y = ' + item.tex + '^x$';
      const wrongs = [
        '$y = \\log_{' + item.logBase + '} x$',
        '$y = x^{' + item.powExp + '}$',
        '$y = x^{' + k + item.powExp + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Trong các hàm số sau, hàm số nào là hàm số mũ?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số mũ có dạng $y = a^x$ với $a > 0, a \\ne 1$, nên ' + correct + ' là hàm số mũ.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên bIdx = 5', params: { bIdx: 5, k: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (y = e^x)', params: { bIdx: 0, k: 3 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Nhận biết hàm số lôgarit
  t11_b20_d07_identify_log_func_mc: {
    id: 't11_b20_d07_identify_log_func_mc',
    name: 'Nhận biết hàm số lôgarit',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Phân biệt hàm số lôgarit y = log_a x (a > 0, a ≠ 1) với hàm mũ, hàm căn thức và đa thức.',
    conditionSummary: 'bIdx ∈ [0; 4], m ∈ [2; 6]',
    paramSpecs: [
      { name: 'bIdx', label: 'Dạng hàm số lôgarit (0..4)', min: 0, max: 4 },
      { name: 'm', label: 'Tham số trang trí phương án nhiễu', min: 2, max: 6 },
    ],
    validateCode: `
      const { bIdx, m } = params;
      if (bIdx < 0 || bIdx > 4 || m < 2 || m > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, m } = params;
      const LOGS = [
        '$y = \\ln x$',
        '$y = \\log x$',
        '$y = \\log_{2} x$',
        '$y = \\log_{5} x$',
        '$y = \\log_{\\frac{1}{3}} x$',
      ];
      const correct = LOGS[bIdx];
      const wrongs = [
        '$y = e^{-' + m + 'x}$',
        '$y = \\sqrt[' + m + ']{x}$',
        '$y = ' + (m - 1) + 'x^2 - 1$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Trong các hàm số sau, hàm số nào là hàm số lôgarit?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số lôgarit có dạng $y = \\log_a x$ ($a > 0, a \\ne 1$), nên ' + correct + ' là hàm số lôgarit.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { bIdx: 0, m: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (y = ln x)', params: { bIdx: 0, m: 4 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Tập xác định của y = log_a(px - q)
  t11_b20_d08_log_linear_domain_mc: {
    id: 't11_b20_d08_log_linear_domain_mc',
    name: 'Tập xác định của hàm số y = log_a(px - q)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Giải bất phương trình px - q > 0 tìm tập xác định của hàm số lôgarit bậc nhất.',
    conditionSummary: 'bIdx ∈ [0; 4], p ∈ [2; 9], r ∈ [-6; 6], r ≠ 0',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số (0..4)', min: 0, max: 4 },
      { name: 'p', label: 'Hệ số p > 0 trước x', min: 2, max: 9 },
      { name: 'r', label: 'Nghiệm biên r (r ≠ 0)', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { bIdx, p, r } = params;
      if (bIdx < 0 || bIdx > 4 || p < 2 || p > 9 || r === 0 || r < -6 || r > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, p, r } = params;
      const base = [2, 3, 5, 8, 10][bIdx];
      const q = p * r;
      const expr = p + 'x' + (q > 0 ? ' - ' + q : ' + ' + (-q));

      const correct = '$D = (' + r + '; +\\infty)$';
      const wrongs = [
        '$D = (-\\infty; ' + r + ')$',
        '$D = \\mathbb{R} \\backslash \\{' + r + '\\}$',
        '$D = \\mathbb{R} \\backslash \\{' + (-r) + '\\}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tìm tập xác định của hàm số $y = \\log_{' + base + '}(' + expr + ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện xác định: $' + expr + ' > 0 \\Leftrightarrow x > ' + r + '$.',
          'Tập xác định: $D = (' + r + '; +\\infty)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 0', params: { bIdx: 3, p: 5, r: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (log_8(5x - 5) -> (1; +inf))', params: { bIdx: 3, p: 5, r: 1 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Tập xác định của y = log_a(-x^2 + Sx - P)
  t11_b20_d09_log_quad_domain_mc: {
    id: 't11_b20_d09_log_quad_domain_mc',
    name: 'Tập xác định của hàm số y = log_a(-x² + bx + c)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Giải bất phương trình bậc hai có hai nghiệm nguyên phân biệt r1 < r2 để tìm tập xác định.',
    conditionSummary: 'bIdx ∈ [0; 3], r1 ∈ [-4; 5], d ∈ [2; 9]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số (0..3)', min: 0, max: 3 },
      { name: 'r1', label: 'Nghiệm nhỏ r1', min: -4, max: 5 },
      { name: 'd', label: 'Hiệu hai nghiệm r2 - r1', min: 2, max: 9 },
    ],
    validateCode: `
      const { bIdx, r1, d } = params;
      if (bIdx < 0 || bIdx > 3 || r1 < -4 || r1 > 5 || d < 2 || d > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, r1, d } = params;
      const base = [2, 3, 5, 10][bIdx];
      const r2 = r1 + d;
      const bCoef = r1 + r2;
      const cCoef = -r1 * r2;
      const bStr = bCoef === 0 ? '' : bCoef === 1 ? ' + x' : bCoef === -1 ? ' - x' : bCoef > 0 ? ' + ' + bCoef + 'x' : ' - ' + (-bCoef) + 'x';
      const cStr = cCoef === 0 ? '' : cCoef > 0 ? ' + ' + cCoef : ' - ' + (-cCoef);
      const poly = '-x^2' + bStr + cStr;

      const correct = '$D = (' + r1 + '; ' + r2 + ')$';
      const wrongs = [
        '$D = (-\\infty; ' + r1 + ') \\cup (' + r2 + '; +\\infty)$',
        '$D = [' + r1 + '; ' + r2 + ']$',
        '$D = (-\\infty; ' + r1 + '] \\cup [' + r2 + '; +\\infty)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tìm tập xác định của hàm số $y = \\log_{' + base + '}(' + poly + ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện xác định: $' + poly + ' > 0 \\Leftrightarrow ' + r1 + ' < x < ' + r2 + '$.',
          'Tập xác định: $D = (' + r1 + '; ' + r2 + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 1', params: { bIdx: 0, r1: 3, d: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (-x^2 + 13x - 30 -> (3; 10))', params: { bIdx: 0, r1: 3, d: 7 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Tìm m để y = ln[a x^2 + (m - p)x + (-m - q)] xác định ∀x ∈ R
  t11_b20_d10_log_quad_always_pos_mc: {
    id: 't11_b20_d10_log_quad_always_pos_mc',
    name: 'Tham số m để hàm lôgarit tam thức bậc hai xác định trên R',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Xét điều kiện Δ < 0 để tam thức bậc hai chứa tham số m luôn dương với mọi x thuộc R.',
    conditionSummary: 'a ∈ [3; 8], p ∈ [3; 8], q ∈ [3; 8], p + q > a',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a của x²', min: 3, max: 8 },
      { name: 'p', label: 'Hằng số p trong (m - p)', min: 3, max: 8 },
      { name: 'q', label: 'Hằng số q trong (-m - q)', min: 3, max: 8 },
    ],
    validateCode: `
      const { a, p, q } = params;
      if (a < 3 || a > 8 || p < 3 || p > 8 || q < 3 || q > 8) return { valid: false, reason: 'Tham số ngoài miền' };
      if (p + q <= a) return { valid: false, reason: 'Cần p + q > a để Δ(m) > 0 với mọi m' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p, q } = params;
      const B = 4 * a - 2 * p;
      const C = p * p + 4 * a * q;
      const mMid = -Math.round(B / 2);
      const bStr = B === 0 ? '' : B > 0 ? ' + ' + B + 'm' : ' - ' + (-B) + 'm';
      const deltaPoly = 'm^2' + bStr + ' + ' + C;

      const correct = 'Không tồn tại $m$';
      const wrongs = [
        '$\\forall m \\in \\mathbb{R}$',
        '$m > ' + mMid + '$',
        '$m \\le ' + mMid + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tìm các giá trị của $m$ để hàm số $y = \\ln\\left[' + a + 'x^2 + (m - ' + p + ')x + (-m - ' + q + ')\\right]$ xác định với mọi $x \\in \\mathbb{R}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số xác định với mọi $x \\in \\mathbb{R} \\Leftrightarrow ' + a + 'x^2 + (m - ' + p + ')x + (-m - ' + q + ') > 0,\\; \\forall x \\in \\mathbb{R}$.',
          'Vì $' + a + ' > 0$, điều kiện tương đương $\\Delta = (m - ' + p + ')^2 - 4\\cdot ' + a + '(-m - ' + q + ') = ' + deltaPoly + ' < 0$.',
          'Do $\\Delta_m\' = ' + (a * (a - p - q)) + ' < 0$ nên $' + deltaPoly + ' > 0,\\; \\forall m \\in \\mathbb{R}$. Vậy không tồn tại $m$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p + q = a', params: { a: 8, p: 4, q: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (a=7, p=5, q=5 -> không tồn tại m)', params: { a: 7, p: 5, q: 5 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Tìm m để y = e^{K / sqrt(ax^2 + (m+b)x + (-am - c))} xác định ∀x ∈ R
  t11_b20_d11_exp_sqrt_always_pos_mc: {
    id: 't11_b20_d11_exp_sqrt_always_pos_mc',
    name: 'Tham số m để hàm mũ chứa căn thức ở mẫu xác định trên R',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Giải điều kiện Δ(m) < 0 có nghiệm vô tỉ dạng -B ± k√d.',
    conditionSummary: 'a ∈ {1, 2}, b ∈ [1; 5], c ∈ [1; 8], K ∈ [10; 25], a·b + a³ - c > 0 và D không chính phương',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a của x²', min: 1, max: 2 },
      { name: 'b', label: 'Hằng số b trong (m + b)', min: 1, max: 5 },
      { name: 'c', label: 'Hằng số c trong (-a·m - c)', min: 1, max: 8 },
      { name: 'K', label: 'Tử số K của số mũ', min: 10, max: 25 },
    ],
    validateCode: `
      const { a, b, c, K } = params;
      if ((a !== 1 && a !== 2) || b < 1 || b > 5 || c < 1 || c > 8 || K < 10 || K > 25) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const B = b + 2 * a * a;
      const C = b * b + 4 * a * c;
      const D = B * B - C;
      if (D <= 1) return { valid: false, reason: 'Cần D > 1' };
      const r = Math.round(Math.sqrt(D));
      if (r * r === D) return { valid: false, reason: 'Cần D không chính phương để ra dạng căn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, K } = params;
      const B = b + 2 * a * a;
      const C = b * b + 4 * a * c;
      const D = B * B - C;
      let k = 1;
      let d = D;
      for (let f = 2; f * f <= d; f++) {
        while (d % (f * f) === 0) {
          k *= f;
          d /= f * f;
        }
      }
      const rad = (k === 1 ? '' : k + '\\,') + '\\sqrt{' + d + '}';
      const rLow = (-B) + ' - ' + rad;
      const rHigh = (-B) + ' + ' + rad;
      const aCoef = a === 1 ? '' : String(a);

      const correct = '$' + rLow + ' < m < ' + rHigh + '$';
      const wrongs = [
        '$m \\le ' + rLow + '$ hoặc $m \\ge ' + rHigh + '$',
        '$m < ' + rLow + '$ hoặc $m > ' + rHigh + '$',
        '$' + rLow + ' \\le m \\le ' + rHigh + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tìm các giá trị của $m$ để hàm số $y = e^{\\frac{' + K + '}{\\sqrt{' + aCoef + 'x^2 + (m + ' + b + ')x + (-' + aCoef + 'm - ' + c + ')}}}$ xác định với mọi $x \\in \\mathbb{R}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số xác định với mọi $x \\in \\mathbb{R} \\Leftrightarrow ' + aCoef + 'x^2 + (m + ' + b + ')x + (-' + aCoef + 'm - ' + c + ') > 0,\\; \\forall x \\in \\mathbb{R}$.',
          'Điều kiện tương đương $\\Delta = (m + ' + b + ')^2 - 4\\cdot ' + a + '(-' + aCoef + 'm - ' + c + ') = m^2 + ' + (2 * B) + 'm + ' + C + ' < 0$.',
          'Giải bất phương trình ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên D chính phương (a=1, b=1, c=1 -> D=4)', params: { a: 1, b: 1, c: 1, K: 12 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (a=2, b=3, c=5, K=20 -> -11 ± 6√2)', params: { a: 2, b: 3, c: 5, K: 20 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Nhận diện đồ thị y = (1/b)^x (b ∈ {2, 3, 4})
  t11_b20_d12_graph_exp_dec_small_mc: {
    id: 't11_b20_d12_graph_exp_dec_small_mc',
    name: 'Nhận diện đồ thị hàm số mũ nghịch biến y = (1/b)^x (cơ số 1/2, 1/3, 1/4)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Đọc đồ thị hàm số mũ nghịch biến đi qua (1; 1/b).',
    conditionSummary: 'b ∈ [2; 4]',
    paramSpecs: [
      { name: 'b', label: 'Mẫu số của cơ số 1/b', min: 2, max: 4 },
    ],
    validateCode: `
      if (params.b < 2 || params.b > 4) return { valid: false, reason: 'b ngoài miền [2; 4]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b } = params;
      const correct = '$y = \\left(\\dfrac{1}{' + b + '}\\right)^x$';
      const wrongs = [
        '$y = ' + b + '^x$',
        '$y = \\left(\\sqrt{' + b + '}\\right)^x$',
        '$y = x^{' + b + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào trong các hàm số sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 1, base: b },
          labels: { xLabel: '1', yLabel: '1/' + b },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị có dạng đồ thị hàm số mũ nghịch biến, đi qua điểm $(0; 1)$ và $\\left(1; \\dfrac{1}{' + b + '}\\right)$ nên đây là đồ thị hàm số ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 5', params: { b: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (b = 3 -> (1/3)^x)', params: { b: 3 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Nhận diện đồ thị y = b^x (b > 1)
  t11_b20_d13_graph_exp_inc_mc: {
    id: 't11_b20_d13_graph_exp_inc_mc',
    name: 'Nhận diện đồ thị hàm số mũ đồng biến y = b^x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Đọc đồ thị hàm số mũ đồng biến đi qua (1; b).',
    conditionSummary: 'b ∈ [2; 6]',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b > 1', min: 2, max: 6 },
    ],
    validateCode: `
      if (params.b < 2 || params.b > 6) return { valid: false, reason: 'b ngoài miền [2; 6]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b } = params;
      const correct = '$y = ' + b + '^x$';
      const wrongs = [
        '$y = x^{' + b + '}$',
        '$y = \\left(\\dfrac{1}{' + b + '}\\right)^x$',
        '$y = \\left(\\sqrt{' + b + '}\\right)^x$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào trong các hàm số sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 0, base: b },
          labels: { xLabel: '1', yLabel: String(b) },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị có dạng đồ thị hàm số mũ đồng biến, đi qua điểm $(0; 1)$ và $(1; ' + b + ')$ nên đây là đồ thị hàm số ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (b = 2 -> 2^x)', params: { b: 2 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Nhận diện đồ thị y = (1/b)^x (b ∈ {5, 6, 7, 8})
  t11_b20_d14_graph_exp_dec_large_mc: {
    id: 't11_b20_d14_graph_exp_dec_large_mc',
    name: 'Nhận diện đồ thị hàm số mũ nghịch biến y = (1/b)^x (cơ số 1/5..1/8)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Đọc đồ thị hàm số mũ nghịch biến có độ dốc lớn đi qua (1; 1/b).',
    conditionSummary: 'b ∈ [5; 8]',
    paramSpecs: [
      { name: 'b', label: 'Mẫu số của cơ số 1/b', min: 5, max: 8 },
    ],
    validateCode: `
      if (params.b < 5 || params.b > 8) return { valid: false, reason: 'b ngoài miền [5; 8]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b } = params;
      const correct = '$y = \\left(\\dfrac{1}{' + b + '}\\right)^x$';
      const wrongs = [
        '$y = x^{' + b + '}$',
        '$y = \\left(\\sqrt{' + b + '}\\right)^x$',
        '$y = ' + b + '^x$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào trong các hàm số sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 1, base: b },
          labels: { xLabel: '1', yLabel: '1/' + b },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị hàm số mũ đi qua $(1; \\frac{1}{' + b + '})$ và nghịch biến trên $\\mathbb{R}$ nên hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 4', params: { b: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (b = 6 -> (1/6)^x)', params: { b: 6 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Nhận diện đồ thị y = log_{1/b} x (b ∈ [5; 8])
  t11_b20_d15_graph_log_dec_large_mc: {
    id: 't11_b20_d15_graph_log_dec_large_mc',
    name: 'Nhận diện đồ thị hàm số lôgarit nghịch biến y = log_{1/b} x (b ∈ [5; 8])',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Đọc đồ thị hàm số lôgarit nghịch biến đi qua (1/b; 1).',
    conditionSummary: 'b ∈ [5; 8]',
    paramSpecs: [
      { name: 'b', label: 'Mẫu số của cơ số 1/b', min: 5, max: 8 },
    ],
    validateCode: `
      if (params.b < 5 || params.b > 8) return { valid: false, reason: 'b ngoài miền [5; 8]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b } = params;
      const correct = '$y = \\log_{\\frac{1}{' + b + '}} x$';
      const wrongs = [
        '$y = \\left(\\sqrt{' + b + '}\\right)^x$',
        '$y = ' + b + '^x$',
        '$y = \\log_{' + b + '} x$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào trong các hàm số sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 4, base: b },
          labels: { xLabel: '1/' + b, yLabel: '1' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị có dạng đồ thị hàm số lôgarit nghịch biến, đi qua $(1; 0)$ và $\\left(\\dfrac{1}{' + b + '}; 1\\right)$ nên đây là đồ thị hàm số ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 4', params: { b: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (b = 6 -> log_{1/6} x)', params: { b: 6 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Nhận diện đồ thị y = log_b x (b > 1)
  t11_b20_d16_graph_log_inc_mc: {
    id: 't11_b20_d16_graph_log_inc_mc',
    name: 'Nhận diện đồ thị hàm số lôgarit đồng biến y = log_b x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Đọc đồ thị hàm số lôgarit đồng biến đi qua (b; 1).',
    conditionSummary: 'b ∈ [2; 6]',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b > 1', min: 2, max: 6 },
    ],
    validateCode: `
      if (params.b < 2 || params.b > 6) return { valid: false, reason: 'b ngoài miền [2; 6]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b } = params;
      const correct = '$y = \\log_{' + b + '} x$';
      const wrongs = [
        '$y = \\log_{\\frac{1}{' + b + '}} x$',
        '$y = \\left(\\sqrt{' + b + '}\\right)^x$',
        '$y = ' + b + '^x$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào trong các hàm số sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 3, base: b },
          labels: { xLabel: String(b), yLabel: '1' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị có dạng đồ thị hàm số lôgarit đồng biến, đi qua $(1; 0)$ và $(' + b + '; 1)$ nên đây là đồ thị hàm số ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (b = 3 -> log_3 x)', params: { b: 3 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Nhận diện đồ thị y = log_{1/b} x (b ∈ [2; 4])
  t11_b20_d17_graph_log_dec_small_mc: {
    id: 't11_b20_d17_graph_log_dec_small_mc',
    name: 'Nhận diện đồ thị hàm số lôgarit nghịch biến y = log_{1/b} x (b ∈ [2; 4])',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Đọc đồ thị hàm số lôgarit nghịch biến với cơ số 1/2, 1/3, 1/4 đi qua (1/b; 1).',
    conditionSummary: 'b ∈ [2; 4]',
    paramSpecs: [
      { name: 'b', label: 'Mẫu số của cơ số 1/b', min: 2, max: 4 },
    ],
    validateCode: `
      if (params.b < 2 || params.b > 4) return { valid: false, reason: 'b ngoài miền [2; 4]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b } = params;
      const correct = '$y = \\log_{\\frac{1}{' + b + '}} x$';
      const wrongs = [
        '$y = \\left(\\sqrt{' + b + '}\\right)^x$',
        '$y = ' + b + '^x$',
        '$y = \\log_{' + b + '} x$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào trong các hàm số sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 4, base: b },
          labels: { xLabel: '1/' + b, yLabel: '1' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị có dạng đồ thị hàm số lôgarit nghịch biến, đi qua $(1; 0)$ và $\\left(\\dfrac{1}{' + b + '}; 1\\right)$ nên đây là đồ thị hàm số ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 5', params: { b: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (b = 2 -> log_{1/2} x)', params: { b: 2 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Nhận diện đồ thị y = (√p)^x
  t11_b20_d18_graph_exp_sqrt_mc: {
    id: 't11_b20_d18_graph_exp_sqrt_mc',
    name: 'Nhận diện đồ thị hàm số mũ cơ số vô tỉ y = (√p)^x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Đọc đồ thị hàm số mũ đi qua (1; √p) với p không chính phương.',
    conditionSummary: 'pIdx ∈ [0; 6] (p ∈ {3, 5, 6, 7, 10, 11, 15})',
    paramSpecs: [
      { name: 'pIdx', label: 'Chỉ số chọn p không chính phương (0..6)', min: 0, max: 6 },
    ],
    validateCode: `
      if (params.pIdx < 0 || params.pIdx > 6) return { valid: false, reason: 'pIdx ngoài miền [0; 6]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pIdx } = params;
      const p = [3, 5, 6, 7, 10, 11, 15][pIdx];
      const correct = '$y = \\left(\\sqrt{' + p + '}\\right)^x$';
      const wrongs = [
        '$y = ' + p + '^x$',
        '$y = \\left(\\dfrac{1}{' + p + '}\\right)^x$',
        '$y = x^{' + p + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Đồ thị như hình vẽ dưới đây là của hàm số nào trong các hàm số sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b20_exp_log_plot',
          params: { fnType: 2, base: p },
          labels: { xLabel: '1', yLabel: '√' + p },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị có dạng đồ thị hàm số mũ đồng biến, đi qua điểm $(0; 1)$ và $(1; \\sqrt{' + p + '})$ nên đây là đồ thị hàm số ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pIdx = 7', params: { pIdx: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (p = 15 -> (√15)^x)', params: { pIdx: 6 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Tính đơn điệu của hàm số mũ y = a^x
  t11_b20_d19_exp_monotonic_mc: {
    id: 't11_b20_d19_exp_monotonic_mc',
    name: 'Tính đơn điệu của hàm số mũ y = a^x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Xác định tính đồng biến / nghịch biến trên R của hàm số mũ y = a^x dựa vào cơ số a.',
    conditionSummary: 'bIdx ∈ [0; 5], k ∈ [5; 15]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số a (0..5)', min: 0, max: 5 },
      { name: 'k', label: 'Đầu mút khoảng ở phương án nhiễu', min: 5, max: 15 },
    ],
    validateCode: `
      const { bIdx, k } = params;
      if (bIdx < 0 || bIdx > 5 || k < 5 || k > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k } = params;
      const ITEMS = [
        { tex: '\\pi', inc: true, cmp: '\\pi > 1' },
        { tex: 'e', inc: true, cmp: 'e > 1' },
        { tex: '\\sqrt{5}', inc: true, cmp: '\\sqrt{5} > 1' },
        { tex: '\\left(\\dfrac{1}{\\pi}\\right)', inc: false, cmp: '0 < \\dfrac{1}{\\pi} < 1' },
        { tex: '\\left(\\dfrac{2}{e}\\right)', inc: false, cmp: '0 < \\dfrac{2}{e} < 1' },
        { tex: '(\\sqrt{2} - 1)', inc: false, cmp: '0 < \\sqrt{2} - 1 < 1' },
      ];
      const item = ITEMS[bIdx];
      const trueDir = item.inc ? 'đồng biến' : 'nghịch biến';
      const falseDir = item.inc ? 'nghịch biến' : 'đồng biến';

      const correct = 'Hàm số ' + trueDir + ' trên $\\mathbb{R}$';
      const wrongs = [
        'Hàm số ' + falseDir + ' trên $\\mathbb{R}$',
        'Hàm số chỉ ' + trueDir + ' trên khoảng $(0; +\\infty)$',
        'Hàm số ' + falseDir + ' trên khoảng $(-\\infty; ' + k + ')$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hàm số $y = ' + item.tex + '^x$. Tìm khẳng định đúng trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số $y = ' + item.tex + '^x$ có cơ số $' + item.cmp + '$ nên hàm số ' + trueDir + ' trên $\\mathbb{R}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên bIdx = 6', params: { bIdx: 6, k: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (y = pi^x -> đồng biến trên R)', params: { bIdx: 0, k: 10 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Tính đơn điệu của hàm số lôgarit y = log_a x
  t11_b20_d20_log_monotonic_mc: {
    id: 't11_b20_d20_log_monotonic_mc',
    name: 'Tính đơn điệu của hàm số lôgarit y = log_a x',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Xác định tính đồng biến / nghịch biến trên (0; +∞) của hàm số y = log_a x.',
    conditionSummary: 'bIdx ∈ [0; 5], k ∈ [3; 12]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số (0..5)', min: 0, max: 5 },
      { name: 'k', label: 'Đầu mút âm ở phương án nhiễu', min: 3, max: 12 },
    ],
    validateCode: `
      const { bIdx, k } = params;
      if (bIdx < 0 || bIdx > 5 || k < 3 || k > 12) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k } = params;
      const ITEMS = [
        { tex: '41', inc: true, cmp: '41 > 1' },
        { tex: '17', inc: true, cmp: '17 > 1' },
        { tex: '\\pi', inc: true, cmp: '\\pi > 1' },
        { tex: '\\frac{1}{5}', inc: false, cmp: '0 < \\frac{1}{5} < 1' },
        { tex: '\\frac{3}{7}', inc: false, cmp: '0 < \\frac{3}{7} < 1' },
        { tex: 'e^{-1}', inc: false, cmp: '0 < e^{-1} < 1' },
      ];
      const item = ITEMS[bIdx];
      const trueDir = item.inc ? 'đồng biến' : 'nghịch biến';
      const falseDir = item.inc ? 'nghịch biến' : 'đồng biến';

      const correct = 'Hàm số ' + trueDir + ' trên $(0; +\\infty)$';
      const wrongs = [
        'Hàm số ' + falseDir + ' trên khoảng $(-' + k + '; +\\infty)$',
        'Hàm số ' + falseDir + ' trên $\\mathbb{R}$',
        'Hàm số ' + trueDir + ' trên khoảng $(-' + k + '; +\\infty)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hàm số $y = \\log_{' + item.tex + '} x$. Tìm khẳng định đúng trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số $y = \\log_{' + item.tex + '} x$ có tập xác định $(0; +\\infty)$ và cơ số $' + item.cmp + '$ nên hàm số ' + trueDir + ' trên $(0; +\\infty)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 2', params: { bIdx: 0, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (log_41 x -> đồng biến trên (0; +inf))', params: { bIdx: 0, k: 6 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Bài toán thực tế đường cong học tập f(t) = c(1 - e^{-kt})
  t11_b20_d21_real_learning_curve_mc: {
    id: 't11_b20_d21_real_learning_curve_mc',
    name: 'Ứng dụng hàm số mũ: mô hình tiếp thu kiến thức f(t) = c(1 - e^{-kt})',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Tính số đơn vị kiến thức học sinh nhớ được sau t ngày, làm tròn đến hàng đơn vị.',
    conditionSummary: 'c ∈ [12; 40], k10 ∈ [1; 3], t ∈ [4; 15], kết quả không sát ngưỡng .5',
    paramSpecs: [
      { name: 'c', label: 'Tổng số đơn vị kiến thức c', min: 12, max: 40 },
      { name: 'k10', label: 'Tốc độ 10·k (từ 0,1 đến 0,3)', min: 1, max: 3 },
      { name: 't', label: 'Thời gian học t (ngày)', min: 4, max: 15 },
    ],
    validateCode: `
      const { c, k10, t } = params;
      if (c < 12 || c > 40 || k10 < 1 || k10 > 3 || t < 4 || t > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      const val = c * (1 - Math.exp(-(k10 / 10) * t));
      const ans = Math.round(val);
      if (ans < 4 || Math.abs(Math.abs(val - Math.floor(val)) - 0.5) < 0.06) {
        return { valid: false, reason: 'Tránh giá trị làm tròn sát 0.5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, k10, t } = params;
      const k = k10 / 10;
      const kVi = '0,' + k10;
      const val = c * (1 - Math.exp(-k * t));
      const ans = Math.round(val);
      const val1 = (Math.round(val * 10) / 10).toFixed(1).replace('.', ',');

      const correct = '$' + ans + '$';
      const wCandidates = [ans + 2, Math.max(1, ans - 4), Math.max(1, ans - 5), ans + 4, ans + 6];
      const wrongs = [];
      for (const w of wCandidates) {
        if (w !== ans && wrongs.length < 3 && !wrongs.includes('$' + w + '$')) {
          wrongs.push('$' + w + '$');
        }
      }
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Các nhà tâm lí học sử dụng mô hình hàm số mũ để mô phỏng quá trình học tập của một học sinh là $f(t) = c(1 - e^{-kt})$, trong đó $c$ là tổng số đơn vị kiến thức học sinh phải học, $k$ (kiến thức/ngày) là tốc độ tiếp thu, $t$ (ngày) là thời gian học và $f(t)$ là số đơn vị kiến thức học sinh đã học được. Giả sử một học sinh phải tiếp thu $' + c + '$ đơn vị kiến thức mới với tốc độ tiếp thu $k = ' + kVi + '$. Hỏi học sinh đó sẽ nhớ được khoảng bao nhiêu đơn vị kiến thức mới sau $' + t + '$ ngày (làm tròn đến hàng đơn vị)?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thay $c = ' + c + '$, $k = ' + kVi + '$ và $t = ' + t + '$ vào công thức ta được:',
          '$f(' + t + ') = ' + c + '(1 - e^{-' + kVi + ' \\cdot ' + t + '}) \\approx ' + val1 + ' \\approx ' + ans + '$ (đơn vị).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 10', params: { c: 10, k10: 1, t: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (c=15, k=0.1, t=9 -> 9)', params: { c: 15, k10: 1, t: 9 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Bài toán thực tế khả năng ghi nhớ M(t) = A - B ln(t + c)
  t11_b20_d22_real_memory_log_mc: {
    id: 't11_b20_d22_real_memory_log_mc',
    name: 'Ứng dụng hàm số lôgarit: khả năng ghi nhớ M(t) = A - B ln(t + c)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Tính khả năng nhớ trung bình theo mô hình lôgarit, làm tròn đến hàng phần mười.',
    conditionSummary: 'A ∈ [75; 95], B ∈ [15; 30], c ∈ [2; 8], t ∈ [3; 12], M(t) ∈ [10; 80] và không sát .x5',
    paramSpecs: [
      { name: 'A', label: 'Hằng số ban đầu A (%)', min: 75, max: 95 },
      { name: 'B', label: 'Hệ số B trước ln(t + c)', min: 15, max: 30 },
      { name: 'c', label: 'Hằng số dịch chuyển c', min: 2, max: 8 },
      { name: 't', label: 'Số tháng t', min: 3, max: 12 },
    ],
    validateCode: `
      const { A, B, c, t } = params;
      if (A < 75 || A > 95 || B < 15 || B > 30 || c < 2 || c > 8 || t < 3 || t > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const val = A - B * Math.log(t + c);
      if (val < 10 || val > 80) return { valid: false, reason: 'Kết quả phần trăm ngoài [10; 80]' };
      const scaled = val * 10;
      if (Math.abs(Math.abs(scaled - Math.floor(scaled)) - 0.5) < 0.08) {
        return { valid: false, reason: 'Tránh giá trị làm tròn sát ngưỡng .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, B, c, t } = params;
      const val = A - B * Math.log(t + c);
      const ans10 = Math.round(val * 10);
      const ansStr = (ans10 / 10).toFixed(1).replace('.', ',');
      const w1Str = ((ans10 + 324) / 10).toFixed(1).replace('.', ',');
      const w2Str = ((Math.max(10, ans10 - 104)) / 10).toFixed(1).replace('.', ',');
      const w3Str = ((ans10 + 347) / 10).toFixed(1).replace('.', ',');

      const correct = '$' + ansStr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1Str + '$', '$' + w2Str + '$', '$' + w3Str + '$'],
        rng
      );
      return {
        stem: 'Trong một nghiên cứu, một nhóm học sinh được cho xem cùng một danh sách các đối tượng và được kiểm tra lại xem họ còn nhớ bao nhiêu phần trăm danh sách đó sau mỗi tháng. Giả sử sau $t$ tháng, khả năng nhớ trung bình của nhóm học sinh đó được tính theo công thức $M(t) = ' + A + ' - ' + B + '\\ln(t + ' + c + ')$ (đơn vị: $\\%$). Hãy tính khả năng nhớ trung bình của nhóm học sinh đó sau $' + t + '$ tháng (kết quả làm tròn đến hàng phần mười).',
        options,
        correctIndex,
        answerSummary: correct + '\\%',
        solutionSteps: [
          'Với $t = ' + t + '$, ta có $M(' + t + ') = ' + A + ' - ' + B + '\\ln(' + t + ' + ' + c + ') \\approx ' + ansStr + '\\%$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 70', params: { A: 70, B: 25, c: 5, t: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (A=84, B=25, c=5, t=7 -> 21,9)', params: { A: 84, B: 25, c: 5, t: 7 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Bài toán thực tế phóng xạ m(t) = m0 (1/2)^{t/T}
  t11_b20_d23_real_radioactive_decay_mc: {
    id: 't11_b20_d23_real_radioactive_decay_mc',
    name: 'Ứng dụng hàm số mũ: sự phân rã phóng xạ m(t) = m₀(1/2)^{t/T}',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Tính khối lượng chất phóng xạ còn lại sau t ngày, làm tròn đến hàng phần mười.',
    conditionSummary: 'm0 ∈ [40; 150], T ∈ [15; 60], t ∈ [45; 200], kết quả >= 1,5g và không sát .x5',
    paramSpecs: [
      { name: 'm0', label: 'Khối lượng ban đầu m0 (gam)', min: 40, max: 150 },
      { name: 'T', label: 'Chu kì bán rã T (ngày)', min: 15, max: 60 },
      { name: 't', label: 'Thời gian t (ngày)', min: 45, max: 200 },
    ],
    validateCode: `
      const { m0, T, t } = params;
      if (m0 < 40 || m0 > 150 || T < 15 || T > 60 || t < 45 || t > 200) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const val = m0 * Math.pow(0.5, t / T);
      if (val < 1.5 || val > 80) return { valid: false, reason: 'Khối lượng còn lại ngoài [1.5; 80]' };
      const scaled = val * 10;
      if (Math.abs(Math.abs(scaled - Math.floor(scaled)) - 0.5) < 0.08) {
        return { valid: false, reason: 'Tránh giá trị làm tròn sát ngưỡng .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m0, T, t } = params;
      const val = m0 * Math.pow(0.5, t / T);
      const ans10 = Math.round(val * 10);
      const ansStr = (ans10 / 10).toFixed(1).replace('.', ',');
      const w1Str = ((ans10 + 73) / 10).toFixed(1).replace('.', ',');
      const w2Str = ((ans10 + 314) / 10).toFixed(1).replace('.', ',');
      const w3Str = ((ans10 + 366) / 10).toFixed(1).replace('.', ',');

      const correct = '$' + ansStr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1Str + '$', '$' + w2Str + '$', '$' + w3Str + '$'],
        rng
      );
      return {
        stem: 'Trong Vật lí, sự phân rã của các chất phóng xạ được cho bởi công thức $m(t) = m_0\\left(\\dfrac{1}{2}\\right)^{\\frac{t}{T}}$, trong đó $m_0$ là khối lượng chất phóng xạ ban đầu (tại $t = 0$), $m(t)$ là khối lượng chất phóng xạ tại thời điểm $t$ và $T$ là chu kì bán rã. Một chất phóng xạ $X$ có chu kì bán rã là $' + T + '$ ngày. Giả sử lúc đầu có $' + m0 + '$ gam $X$. Tính khối lượng $X$ còn lại sau $' + t + '$ ngày theo đơn vị gam (làm tròn kết quả đến hàng phần mười).',
        options,
        correctIndex,
        answerSummary: correct + ' gam',
        solutionSteps: [
          'Với $m_0 = ' + m0 + '$ gam, $T = ' + T + '$ ngày và $t = ' + t + '$ ngày, ta được:',
          '$m(' + t + ') = ' + m0 + '\\left(\\dfrac{1}{2}\\right)^{\\frac{' + t + '}{' + T + '}} \\approx ' + ansStr + '$ (gam).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên T = 10', params: { m0: 93, T: 10, t: 138 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (m0=93, T=30, t=138 -> 3,8)', params: { m0: 93, T: 30, t: 138 }, expectedValid: true },
    ],
  },
};
