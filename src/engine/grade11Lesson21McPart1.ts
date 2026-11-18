import { MathTemplate } from '../types/math';

export const G11_B21_MC_PART1: Record<string, MathTemplate> = {
  // D01 (Q1): Phép chiếu song song — khẳng định ĐÚNG
  t11_b21_d01_proj_prop_correct_mc: {
    id: 't11_b21_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Nhận biết khẳng định đúng về phép chiếu song song của hai đường thẳng song song, đồng quy, thẳng hàng.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
            'Phép chiếu song song bảo toàn diện tích',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và bảo toàn thứ tự của chúng',
          wrongs: [
            'Phép chiếu song song bảo toàn góc giữa hai đường thẳng',
            'Phép chiếu song song bảo toàn diện tích đa giác',
            'Phép chiếu song song biến mọi đường tròn thành đường tròn',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng và thứ tự của ba điểm thẳng hàng.',
        },
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy (hoặc trùng nhau)',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song bảo toàn chu vi hình phẳng',
            'Phép chiếu song song biến hai đường thẳng chéo nhau luôn thành hai đường thẳng song song',
          ],
          sol: 'Phép chiếu song song bảo toàn tính đồng quy của ba đường thẳng (khi không song song phương chiếu).',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song luôn giữ nguyên độ dài đoạn thẳng',
            'Phép chiếu song song bảo toàn diện tích tam giác',
            'Phép chiếu song song biến hình chữ nhật luôn thành hình chữ nhật',
          ],
          sol: 'Tỉ số độ dài của hai đoạn thẳng trên cùng một đường thẳng hoặc trên hai đường thẳng song song được bảo toàn.',
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

  // D02 (Q2): Phép chiếu song song — khẳng định SAI
  t11_b21_d02_proj_prop_wrong_mc: {
    id: 't11_b21_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Nhận biết khẳng định sai về phép chiếu song song (bảo toàn diện tích, độ dài, góc...).',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề sai (0..3)', min: 0, max: 3 },
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
            'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song không bảo toàn diện tích của hình, nên đây là khẳng định sai.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tính vuông góc',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Hình chiếu song song của hình bình hành (không song song phương chiếu) là hình bình hành',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song luôn bảo toàn độ dài của đoạn thẳng',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng trên cùng một đường thẳng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          ],
          sol: 'Độ dài đoạn thẳng có thể thay đổi qua phép chiếu song song.',
        },
        {
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
            'Phép chiếu song song có thể biến tam giác đều thành tam giác tù',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
          ],
          sol: 'Các hình chiếu cùng nằm trong một mặt phẳng nên không thể chéo nhau.',
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
      { label: 'Mẫu chuẩn Q2', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của hình vuông / chữ nhật / hình bình hành
  t11_b21_d03_proj_square_parallelogram_mc: {
    id: 't11_b21_d03_proj_square_parallelogram_mc',
    name: 'Hình chiếu song song của hình vuông, hình chữ nhật, hình thoi',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Nhận biết hình chiếu song song của các tứ giác đặc biệt (khi mặt phẳng chứa hình không song song phương chiếu).',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể hình phẳng (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hình vuông là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
            'Hình chiếu song song của hình vuông luôn là một hình vuông',
            'Hình chiếu song song của tam giác đều luôn là một tam giác đều',
          ],
          sol: 'Do bảo toàn tính song song của các cặp cạnh đối, hình chiếu song song của hình vuông (trường hợp không suy biến thành đoạn thẳng) là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình chữ nhật là một hình bình hành (khi không suy biến thành đoạn thẳng)',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn là hình chữ nhật',
            'Hình chiếu song song của hình vuông luôn có hai đường chéo vuông góc',
            'Hình chiếu song song của tam giác cân luôn là tam giác cân',
          ],
          sol: 'Hình chữ nhật có các cặp cạnh đối song song nên ảnh qua phép chiếu song song là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình thoi có thể là một hình bình hành có hai cạnh kề khác nhau',
          wrongs: [
            'Hình chiếu song song của hình thoi luôn là một hình thoi',
            'Hình chiếu song song của hình thang cân luôn là hình chữ nhật',
            'Hình chiếu song song của tam giác đều luôn có ba góc bằng 60°',
          ],
          sol: 'Phép chiếu song song không bảo toàn độ dài và góc nên hình thoi nói chung chiếu thành hình bình hành.',
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

  // D04 (Q4): Chiếu đỉnh đáy dưới lăng trụ ABC.DEF lên (DEF) theo CF -> D
  t11_b21_d04_prism_proj_top_1_mc: {
    id: 't11_b21_d04_prism_proj_top_1_mc',
    name: 'Hình chiếu song song đỉnh đáy dưới lăng trụ lên đáy trên (phương cạnh bên 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Tìm hình chiếu song song của đỉnh đáy dưới lên mặt đáy trên theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh đáy dưới (0..2)', min: 0, max: 2 },
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
      const k = (vIdx + 2) % 3;
      const dir = s.b[k] + s.t[k];
      const topPlane = s.t.join('');

      const w1 = s.t[(vIdx + 1) % 3];
      const w2 = s.t[(vIdx + 2) % 3];
      const w3 = s.b[(vIdx + 2) % 3];

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
      { label: 'Mẫu chuẩn Q4 (A lên (DEF) theo CF -> D)', params: { setIdx: 0, vIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu đỉnh đáy dưới lăng trụ ABC.A'B'C' lên (A'B'C') theo BB' -> A'
  t11_b21_d05_prism_proj_top_2_mc: {
    id: 't11_b21_d05_prism_proj_top_2_mc',
    name: 'Hình chiếu song song đỉnh đáy dưới lăng trụ lên đáy trên (phương cạnh bên 2)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Tìm hình chiếu song song của đỉnh đáy dưới lên mặt đáy trên theo phương cạnh bên còn lại.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh đáy dưới (0..2)', min: 0, max: 2 },
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
        { b: ['M', 'N', 'P'], t: ['M_1', 'N_1', 'P_1'] },
      ];
      const s = SETS[setIdx];
      const src = s.b[vIdx];
      const img = s.t[vIdx];
      const j = (vIdx + 1) % 3;
      const dir = s.b[j] + s.t[j];
      const topPlane = s.t.join('');

      const w1 = s.b[j];
      const w2 = s.t[j];
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
          'Vì $' + src + img + ' \\parallel ' + dir + '$ và $' + img + ' \\in (' + topPlane + ')$ nên hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, vIdx: 0 }, expectedValid: false },
      { label: "Mẫu chuẩn Q5 (A lên (A'B'C') theo BB' -> A')", params: { setIdx: 0, vIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Phương trình mũ cơ bản b^x = b^k
  t11_b21_d06_exp_eq_basic_mc: {
    id: 't11_b21_d06_exp_eq_basic_mc',
    name: 'Giải phương trình mũ cơ bản b^x = K',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải phương trình mũ cơ bản đưa về cùng cơ số b^x = b^k.',
    conditionSummary: 'b ∈ {2, 3, 5}, k ∈ [2; 6], b^k <= 2000',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'k', label: 'Nghiệm k = log_b(K)', min: 2, max: 6 },
    ],
    validateCode: `
      const { bIdx, k } = params;
      if (bIdx < 0 || bIdx > 2 || k < 2 || k > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      const b = [2, 3, 5][bIdx];
      if (Math.pow(b, k) > 2000) return { valid: false, reason: 'Giá trị K quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k } = params;
      const b = [2, 3, 5][bIdx];
      const K = Math.pow(b, k);
      const correct = '$x = ' + k + '$';
      const wrongs = [
        '$x = ' + (-(k + 1)) + '$',
        '$x = ' + (k + 2) + '$',
        '$x = ' + (K - 2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tìm nghiệm của phương trình $' + b + '^x = ' + K + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$' + b + '^x = ' + K + ' \\Leftrightarrow x = \\log_{' + b + '} ' + K + ' = ' + k + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 5^6 > 2000', params: { bIdx: 2, k: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (2^x = 16 -> x = 4)', params: { bIdx: 0, k: 4 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Phương trình mũ b^{x - c} = 1 / b^k
  t11_b21_d07_exp_eq_inv_pow_mc: {
    id: 't11_b21_d07_exp_eq_inv_pow_mc',
    name: 'Giải phương trình mũ b^{x - c} = 1/b^k',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đưa vế phải 1/b^k về b^{-k} để giải phương trình mũ bậc nhất.',
    conditionSummary: 'b ∈ {2, 3, 5}, c ∈ [2; 7], k ∈ [4; 9], b^k <= 25000',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số (0..2)', min: 0, max: 2 },
      { name: 'c', label: 'Hằng số dịch chuyển c', min: 2, max: 7 },
      { name: 'k', label: 'Số mũ k ở mẫu số', min: 4, max: 9 },
    ],
    validateCode: `
      const { bIdx, c, k } = params;
      if (bIdx < 0 || bIdx > 2 || c < 2 || c > 7 || k < 4 || k > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      const b = [2, 3, 5][bIdx];
      if (Math.pow(b, k) > 25000) return { valid: false, reason: 'Mẫu số quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, c, k } = params;
      const b = [2, 3, 5][bIdx];
      const den = Math.pow(b, k);
      const ans = c - k;
      const correct = '$x = ' + ans + '$';
      const w1 = c + k - 2 * c; // c - k vs -(c+k)
      const wrongs = [
        '$x = ' + (k - c - 2) + '$',
        '$x = ' + (ans - 8) + '$',
        '$x = ' + (ans + 2) + '$',
      ];
      if (k - c - 2 === ans || k - c - 2 === ans + 2) wrongs[0] = '$x = ' + (ans + 8) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tìm nghiệm của phương trình $' + b + '^{x - ' + c + '} = \\dfrac{1}{' + den + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$' + b + '^{x - ' + c + '} = \\dfrac{1}{' + den + '} \\Leftrightarrow x - ' + c + ' = \\log_{' + b + '} \\dfrac{1}{' + den + '} = -' + k + ' \\Leftrightarrow x = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 5^9 > 25000', params: { bIdx: 2, c: 4, k: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (3^{x-4} = 1/19683 -> x = -5)', params: { bIdx: 1, c: 4, k: 9 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Phương trình mũ b^{-a x + c} = b^k
  t11_b21_d08_exp_eq_neg_lin_mc: {
    id: 't11_b21_d08_exp_eq_neg_lin_mc',
    name: 'Giải phương trình mũ b^{-x + c} = b^k',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đưa vế phải về luỹ thừa cơ số b rồi giải phương trình bậc nhất theo x.',
    conditionSummary: 'b ∈ {2, 3, 4}, c ∈ [3; 8], k ∈ [3; 6], b^k <= 4096',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 4}', min: 0, max: 2 },
      { name: 'c', label: 'Hằng số c', min: 3, max: 8 },
      { name: 'k', label: 'Số mũ k vế phải', min: 3, max: 6 },
    ],
    validateCode: `
      const { bIdx, c, k } = params;
      if (bIdx < 0 || bIdx > 2 || c < 3 || c > 8 || k < 3 || k > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      const b = [2, 3, 4][bIdx];
      if (Math.pow(b, k) > 4096) return { valid: false, reason: 'Vế phải quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, c, k } = params;
      const b = [2, 3, 4][bIdx];
      const rhs = Math.pow(b, k);
      const ans = c - k;
      const correct = '$x = ' + ans + '$';
      const wrongs = [
        '$x = ' + (ans - 9) + '$',
        '$x = \\dfrac{1}{' + (c + k) + '}$',
        '$x = -\\dfrac{3}{' + (c + k) + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải phương trình $' + b + '^{-x + ' + c + '} = ' + rhs + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$' + b + '^{-x + ' + c + '} = ' + rhs + ' \\Leftrightarrow ' + b + '^{-x + ' + c + '} = ' + b + '^{' + k + '} \\Leftrightarrow -x + ' + c + ' = ' + k + ' \\Leftrightarrow x = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên bIdx = 3', params: { bIdx: 3, c: 6, k: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (4^{-x+6} = 4096 -> x = 0)', params: { bIdx: 2, c: 6, k: 6 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Phương trình mũ b^{c1 - a1 x} = (b^k)^{a2 x + c2}
  t11_b21_d09_exp_eq_same_base_pow_mc: {
    id: 't11_b21_d09_exp_eq_same_base_pow_mc',
    name: 'Giải phương trình mũ b^{c1 - a1 x} = (b^k)^{a2 x + c2}',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đưa hai vế về cùng cơ số b và giải phương trình bậc nhất thu được nghiệm phân số.',
    conditionSummary: 'b ∈ {2, 3, 5, 7}, k ∈ {2, 3}, a1 ∈ [2; 5], a2 ∈ [2; 7], c1 ∈ [2; 6], c2 ∈ [1; 3], b^k <= 343',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 5, 7}', min: 0, max: 3 },
      { name: 'k', label: 'Số mũ k của cơ số vế phải', min: 2, max: 3 },
      { name: 'a1', label: 'Hệ số a1', min: 2, max: 5 },
      { name: 'a2', label: 'Hệ số a2', min: 2, max: 7 },
      { name: 'c1', label: 'Hằng số c1', min: 2, max: 6 },
      { name: 'c2', label: 'Hằng số c2', min: 1, max: 3 },
    ],
    validateCode: `
      const { bIdx, k, a1, a2, c1, c2 } = params;
      if (bIdx < 0 || bIdx > 3 || (k !== 2 && k !== 3) || a1 < 2 || a1 > 5 || a2 < 2 || a2 > 7 || c1 < 2 || c1 > 6 || c2 < 1 || c2 > 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const b = [2, 3, 5, 7][bIdx];
      if (Math.pow(b, k) > 350) return { valid: false, reason: 'Cơ số vế phải quá lớn' };
      if (c1 - k * c2 === 0) return { valid: false, reason: 'Tránh nghiệm bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k, a1, a2, c1, c2 } = params;
      const b = [2, 3, 5, 7][bIdx];
      const B = Math.pow(b, k);
      const num = c1 - k * c2;
      const den = a1 + k * a2;
      const ansFrac = u.simplifyFrac(num, den);
      const w1 = u.simplifyFrac(c1 - c2, a1 + a2);
      const w2 = u.simplifyFrac(num + 2 * den, den);
      const w3 = u.simplifyFrac(num + 3 * den, den);

      const correct = '$x = ' + ansFrac.latex + '$';
      const wrongs = [
        '$x = ' + (w1.latex === ansFrac.latex ? u.simplifyFrac(num + 1, den).latex : w1.latex) + '$',
        '$x = ' + w2.latex + '$',
        '$x = ' + w3.latex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tìm nghiệm của phương trình $' + b + '^{' + c1 + ' - ' + a1 + 'x} = ' + B + '^{' + a2 + 'x + ' + c2 + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$' + b + '^{' + c1 + ' - ' + a1 + 'x} = ' + b + '^{' + (k * a2) + 'x + ' + (k * c2) + '} \\Leftrightarrow ' + c1 + ' - ' + a1 + 'x = ' + (k * a2) + 'x + ' + (k * c2) + ' \\Leftrightarrow x = ' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 7^3 = 343 nhưng k=4', params: { bIdx: 3, k: 4, a1: 3, a2: 7, c1: 4, c2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (7^{4-3x} = 343^{7x+1} -> 1/24)', params: { bIdx: 3, k: 3, a1: 3, a2: 7, c1: 4, c2: 1 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Tổng các nghiệm của b^2 · b^{2x} - S · b^x + P = 0
  t11_b21_d10_exp_sum_roots_vieta_mc: {
    id: 't11_b21_d10_exp_sum_roots_vieta_mc',
    name: 'Tổng các nghiệm của phương trình mũ đặt ẩn phụ bậc hai',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đặt t = b^x > 0 để tìm tích t1·t2 > 0 và tính tổng x1 + x2 = log_b(t1·t2).',
    conditionSummary: 'b ∈ {2, 3, 5}, p ∈ [5; 30], q ∈ [2; 9], b²·t² - S·t + P = 0 có 2 nghiệm dương phân biệt, P/b² ∉ {b^k}',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'S', label: 'Hệ số tổng S trước b^x', min: 15, max: 75 },
      { name: 'P', label: 'Hằng số tự do P', min: 8, max: 80 },
    ],
    validateCode: `
      const { bIdx, S, P } = params;
      if (bIdx < 0 || bIdx > 2 || S < 15 || S > 75 || P < 8 || P > 80) return { valid: false, reason: 'Tham số ngoài miền' };
      const b = [2, 3, 5][bIdx];
      const A = b * b;
      const delta = S * S - 4 * A * P;
      if (delta <= 0) return { valid: false, reason: 'Phương trình bậc hai không có 2 nghiệm dương phân biệt' };
      const fr = u.simplifyFrac(P, A);
      if (fr.den === 1) return { valid: false, reason: 'Chọn P/b² là phân số để dùng biểu diễn lôgarit' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, S, P } = params;
      const b = [2, 3, 5][bIdx];
      const A = b * b;
      const prod = u.simplifyFrac(P, A);
      const sumT = u.simplifyFrac(S, A);
      const w1 = u.simplifyFrac(2 * P, A);

      const correct = '$\\log_{' + b + '} ' + prod.latex + '$';
      const wrongs = [
        '$' + w1.latex + '$',
        '$' + sumT.latex + '$',
        '$\\log_{' + b + '} ' + prod.latex + ' + ' + (b + 4) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tính tổng các nghiệm của phương trình $' + A + ' \\cdot ' + b + '^{2x} - ' + S + ' \\cdot ' + b + '^x + ' + P + ' = 0$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đặt $t = ' + b + '^x > 0$, phương trình trở thành $' + A + 't^2 - ' + S + 't + ' + P + ' = 0$.',
          'Do $\\Delta = ' + (S * S - 4 * A * P) + ' > 0$, $t_1 + t_2 = ' + sumT.latex + ' > 0$ và $t_1 t_2 = ' + prod.latex + ' > 0$ nên phương trình có hai nghiệm phân biệt $x_1, x_2$ thỏa $' + b + '^{x_1 + x_2} = t_1 t_2 = ' + prod.latex + '$.',
          'Suy ra $x_1 + x_2 = \\log_{' + b + '} ' + prod.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên delta <= 0', params: { bIdx: 2, S: 15, P: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (9·3^{2x} - 57·3^x + 60 = 0 -> log_3(20/3))', params: { bIdx: 1, S: 57, P: 60 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Phương trình mũ đẳng cấp 2 cơ số -a1 A^x + b1 B^x = a2 A^x - b2 B^x
  t11_b21_d11_exp_eq_two_bases_lin_mc: {
    id: 't11_b21_d11_exp_eq_two_bases_lin_mc',
    name: 'Giải phương trình mũ hai cơ số A^x và B^x dạng tuyến tính',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Chuyển vế gom A^x, B^x rồi chia hai vế đưa về (B/A)^x = K.',
    conditionSummary: 'A ∈ [5; 16], B ∈ [3; 12], A ≠ B, a1, a2, b1, b2 ∈ [3; 18], tỉ số ≠ 1',
    paramSpecs: [
      { name: 'A', label: 'Cơ số A', min: 5, max: 16 },
      { name: 'B', label: 'Cơ số B', min: 3, max: 12 },
      { name: 'a1', label: 'Hệ số a1', min: 5, max: 18 },
      { name: 'a2', label: 'Hệ số a2', min: 2, max: 10 },
      { name: 'b1', label: 'Hệ số b1', min: 5, max: 18 },
      { name: 'b2', label: 'Hệ số b2', min: 2, max: 10 },
    ],
    validateCode: `
      const { A, B, a1, a2, b1, b2 } = params;
      if (A < 5 || A > 16 || B < 3 || B > 12 || A === B) return { valid: false, reason: 'Cơ số A, B ngoài miền hoặc bằng nhau' };
      if (a1 < 5 || a1 > 18 || a2 < 2 || a2 > 10 || b1 < 5 || b1 > 18 || b2 < 2 || b2 > 10) {
        return { valid: false, reason: 'Hệ số ngoài miền' };
      }
      const sumA = a1 + a2;
      const sumB = b1 + b2;
      if (sumA === sumB) return { valid: false, reason: 'Tránh nghiệm x = 0' };
      const baseF = u.simplifyFrac(B, A);
      const rhsF = u.simplifyFrac(sumA, sumB);
      if (baseF.den === 1 || rhsF.den === 1 || (baseF.num === rhsF.num && baseF.den === rhsF.den)) {
        return { valid: false, reason: 'Ưu tiên cơ số và vế phải là phân số phân biệt' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, B, a1, a2, b1, b2 } = params;
      const sumA = a1 + a2;
      const sumB = b1 + b2;
      const baseF = u.simplifyFrac(B, A);
      const invBaseF = u.simplifyFrac(A, B);
      const rhsF = u.simplifyFrac(sumA, sumB);
      const w1 = u.simplifyFrac(sumA + 2 * sumB, sumB);
      const w2 = u.simplifyFrac(sumA + 3 * sumB, sumB);
      const w1Swap = u.simplifyFrac(B, sumB);

      const correct = '$x = \\log_{' + baseF.latex + '} \\left(' + rhsF.latex + '\\right)$';
      const wrongs = [
        '$x = \\log_{' + baseF.latex + '} \\left(' + (w1.latex === rhsF.latex ? w1Swap.latex : w1.latex) + '\\right)$',
        '$x = \\log_{' + invBaseF.latex + '} \\left(' + rhsF.latex + '\\right)$',
        '$x = \\log_{' + baseF.latex + '} \\left(' + w2.latex + '\\right)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Nghiệm của phương trình $-' + a1 + ' \\cdot ' + A + '^x + ' + b1 + ' \\cdot ' + B + '^x = ' + a2 + ' \\cdot ' + A + '^x - ' + b2 + ' \\cdot ' + B + '^x$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phương trình tương đương $' + sumB + ' \\cdot ' + B + '^x = ' + sumA + ' \\cdot ' + A + '^x \\Leftrightarrow \\left(' + baseF.latex + '\\right)^x = ' + rhsF.latex + ' \\Leftrightarrow x = \\log_{' + baseF.latex + '} \\left(' + rhsF.latex + '\\right)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = B', params: { A: 8, B: 8, a1: 15, a2: 3, b1: 14, b2: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (A=14, B=8 -> log_{4/7}(6/7))', params: { A: 14, B: 8, a1: 15, a2: 3, b1: 14, b2: 7 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Phương trình mũ hai cơ số với số mũ dịch chuyển a^x + a^{x-u1} + a^{x-u2} = b^x + b^{x-v1} + b^{x+v2}
  t11_b21_d12_exp_eq_two_bases_shift_mc: {
    id: 't11_b21_d12_exp_eq_two_bases_shift_mc',
    name: 'Giải phương trình mũ hai cơ số có số mũ dịch chuyển',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đặt a^x, b^x làm nhân tử chung để đưa về (a/b)^x = R.',
    conditionSummary: 'a, b ∈ [3; 8], a ≠ b, gcd(a, b) = 1, u1 ∈ [2; 3], u2 ∈ [1; 2], v1 ∈ [1; 2], v2 ∈ [1; 2]',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 3, max: 8 },
      { name: 'b', label: 'Cơ số b', min: 3, max: 8 },
      { name: 'u1', label: 'Độ lệch u1 (a^{x - u1})', min: 2, max: 3 },
      { name: 'u2', label: 'Độ lệch u2 (a^{x - u2})', min: 1, max: 2 },
      { name: 'v1', label: 'Độ lệch v1 (b^{x - v1})', min: 1, max: 2 },
      { name: 'v2', label: 'Độ lệch v2 (b^{x + v2})', min: 1, max: 2 },
    ],
    validateCode: `
      const { a, b, u1, u2, v1, v2 } = params;
      if (a < 3 || a > 8 || b < 3 || b > 8 || a === b || u.gcd(a, b) !== 1) return { valid: false, reason: 'Cơ số a, b phải khác nhau và nguyên tố cùng nhau' };
      if (u1 < 2 || u1 > 3 || u2 < 1 || u2 > 2 || u1 === u2 || v1 < 1 || v1 > 2 || v2 < 1 || v2 > 2) {
        return { valid: false, reason: 'Số mũ dịch chuyển ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, u1, u2, v1, v2 } = params;
      const au1 = Math.pow(a, u1), au2 = Math.pow(a, u2);
      const bv1 = Math.pow(b, v1), bv2 = Math.pow(b, v2);
      const lDen = au1;
      const lNum = au1 + 1 + Math.pow(a, u1 - u2);
      const rDen = bv1;
      const rNum = bv1 + 1 + bv1 * bv2;

      const leftCoeff = u.simplifyFrac(lNum, lDen);
      const rightCoeff = u.simplifyFrac(rNum, rDen);
      const rhs = u.simplifyFrac(rNum * lDen, rDen * lNum);
      const baseF = u.simplifyFrac(a, b);
      const invBaseF = u.simplifyFrac(b, a);
      const w1 = u.simplifyFrac(rhs.num + 2 * rhs.den, rhs.den);
      const w2 = u.simplifyFrac(rNum * lDen + 1, rDen * lNum + 3);
      const w3 = u.simplifyFrac(2, 3);

      const correct = '$x = \\log_{' + baseF.latex + '} \\left(' + rhs.latex + '\\right)$';
      const wrongs = [
        '$x = \\log_{' + baseF.latex + '} \\left(' + w1.latex + '\\right)$',
        '$x = \\log_{' + invBaseF.latex + '} \\left(' + w2.latex + '\\right)$',
        '$x = \\log_{' + baseF.latex + '} \\left(' + (w3.latex === rhs.latex ? '\\frac{3}{2}' : w3.latex) + '\\right)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Nghiệm của phương trình $' + a + '^x + ' + a + '^{x - ' + u1 + '} + ' + a + '^{x - ' + u2 + '} = ' + b + '^x + ' + b + '^{x - ' + v1 + '} + ' + b + '^{x + ' + v2 + '}$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phương trình tương đương $' + leftCoeff.latex + ' \\cdot ' + a + '^x = ' + rightCoeff.latex + ' \\cdot ' + b + '^x \\Leftrightarrow \\left(' + baseF.latex + '\\right)^x = ' + rhs.latex + '$.',
          'Vậy $x = \\log_{' + baseF.latex + '} \\left(' + rhs.latex + '\\right)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = u2', params: { a: 5, b: 8, u1: 2, u2: 2, v1: 2, v2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (a=5, b=8, u1=3, u2=2, v1=2, v2=1 -> log_{5/8}(72125/8384))', params: { a: 5, b: 8, u1: 3, u2: 2, v1: 2, v2: 1 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Phương trình lôgarit cơ bản log_b x = k
  t11_b21_d13_log_eq_basic_mc: {
    id: 't11_b21_d13_log_eq_basic_mc',
    name: 'Giải phương trình lôgarit cơ bản log_b x = k',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Áp dụng định nghĩa lôgarit để tìm x = b^k.',
    conditionSummary: 'b ∈ {2, 3, 5}, k ∈ [3; 6], b^k <= 1000',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'k', label: 'Số mũ k', min: 3, max: 6 },
    ],
    validateCode: `
      const { bIdx, k } = params;
      if (bIdx < 0 || bIdx > 2 || k < 3 || k > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      const b = [2, 3, 5][bIdx];
      if (Math.pow(b, k) > 1000) return { valid: false, reason: 'Kết quả quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k } = params;
      const b = [2, 3, 5][bIdx];
      const ans = Math.pow(b, k);
      const w1 = b + k;
      const w2 = Math.pow(k, b);
      const w3 = b * k;

      const correct = '$x = ' + ans + '$';
      const wrongs = [
        '$x = ' + w1 + '$',
        '$x = ' + (w2 === ans ? ans + 5 : w2) + '$',
        '$x = ' + (w3 === ans ? ans + 10 : w3) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tìm nghiệm của phương trình $\\log_{' + b + '} x = ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Phương trình $\\log_{' + b + '} x = ' + k + ' \\Leftrightarrow x = ' + b + '^{' + k + '} = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 5^5 > 1000', params: { bIdx: 2, k: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (log_3 x = 5 -> 243)', params: { bIdx: 1, k: 5 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Phương trình log_b(-px - q) = k
  t11_b21_d14_log_eq_neg_lin_mc: {
    id: 't11_b21_d14_log_eq_neg_lin_mc',
    name: 'Giải phương trình lôgarit log_b(-px - q) = k',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải phương trình -px - q = b^k cho nghiệm phân số.',
    conditionSummary: 'b ∈ {2, 3, 5}, p ∈ [2; 9], q ∈ [2; 12], k ∈ [2; 4], b^k <= 125',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số (0..2)', min: 0, max: 2 },
      { name: 'p', label: 'Hệ số p > 0 (trong -px - q)', min: 2, max: 9 },
      { name: 'q', label: 'Hằng số q > 0', min: 2, max: 12 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
    ],
    validateCode: `
      const { bIdx, p, q, k } = params;
      if (bIdx < 0 || bIdx > 2 || p < 2 || p > 9 || q < 2 || q > 12 || k < 2 || k > 4) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const b = [2, 3, 5][bIdx];
      if (Math.pow(b, k) > 125) return { valid: false, reason: 'b^k quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, p, q, k } = params;
      const b = [2, 3, 5][bIdx];
      const bk = Math.pow(b, k);
      const ansF = u.simplifyFrac(-(bk + q), p);
      const w1 = String(bk + q);
      const w2 = u.simplifyFrac(-(bk - q), p).latex;
      const w3 = u.simplifyFrac(bk - q, p).latex;

      const correct = '$x = ' + ansF.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + w1 + '$', '$x = ' + (w2 === ansF.latex ? '0' : w2) + '$', '$x = ' + (w3 === ansF.latex ? '1' : w3) + '$'],
        rng
      );
      return {
        stem: 'Nghiệm của phương trình $\\log_{' + b + '}(-' + p + 'x - ' + q + ') = ' + k + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\log_{' + b + '}(-' + p + 'x - ' + q + ') = ' + k + ' \\Leftrightarrow -' + p + 'x - ' + q + ' = ' + b + '^{' + k + '} = ' + bk + ' \\Leftrightarrow x = ' + ansF.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 1', params: { bIdx: 0, p: 1, q: 9, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (log_2(-6x-9)=4 -> -25/6)', params: { bIdx: 0, p: 6, q: 9, k: 4 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Hiệu hai lôgarit log_b(c1 - a1 x) - log_b(a2 x + c2) = 1
  t11_b21_d15_log_eq_diff_mc: {
    id: 't11_b21_d15_log_eq_diff_mc',
    name: 'Giải phương trình log_b(c1 - a1 x) - log_b(a2 x + c2) = 1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đưa hiệu hai lôgarit về log_b thương và kiểm tra điều kiện xác định.',
    conditionSummary: 'b ∈ {2, 3, 5}, a1 ∈ [3; 9], a2 ∈ [2; 8], c1 ∈ [3; 9], c2 ∈ [1; 5], nghiệm thỏa điều kiện dương',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số (0..2)', min: 0, max: 2 },
      { name: 'a1', label: 'Hệ số a1', min: 3, max: 9 },
      { name: 'c1', label: 'Hằng số c1', min: 3, max: 9 },
      { name: 'a2', label: 'Hệ số a2', min: 2, max: 8 },
      { name: 'c2', label: 'Hằng số c2', min: 1, max: 5 },
    ],
    validateCode: `
      const { bIdx, a1, c1, a2, c2 } = params;
      if (bIdx < 0 || bIdx > 2 || a1 < 3 || a1 > 9 || c1 < 3 || c1 > 9 || a2 < 2 || a2 > 8 || c2 < 1 || c2 > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const b = [2, 3, 5][bIdx];
      const num = c1 - b * c2;
      const den = a1 + b * a2;
      if (num === 0) return { valid: false, reason: 'Tránh nghiệm bằng 0' };
      const x = num / den;
      if (c1 - a1 * x <= 0 || a2 * x + c2 <= 0) {
        return { valid: false, reason: 'Nghiệm không thỏa mãn điều kiện xác định' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, a1, c1, a2, c2 } = params;
      const b = [2, 3, 5][bIdx];
      const num = c1 - b * c2;
      const den = a1 + b * a2;
      const ansF = u.simplifyFrac(num, den);
      const w1 = u.simplifyFrac(num + den, den);
      const w2 = u.simplifyFrac(num + 2 * den, den);
      const w3 = u.simplifyFrac(num + 3 * den, den);

      const correct = '$x = ' + ansF.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + w1.latex + '$', '$x = ' + w2.latex + '$', '$x = ' + w3.latex + '$'],
        rng
      );
      return {
        stem: 'Nghiệm của phương trình $\\log_{' + b + '}(' + c1 + ' - ' + a1 + 'x) - \\log_{' + b + '}(' + a2 + 'x + ' + c2 + ') = 1$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $' + c1 + ' - ' + a1 + 'x > 0$ và $' + a2 + 'x + ' + c2 + ' > 0$.',
          'Phương trình $\\Leftrightarrow \\log_{' + b + '}\\dfrac{' + c1 + ' - ' + a1 + 'x}{' + a2 + 'x + ' + c2 + '} = 1 \\Leftrightarrow ' + c1 + ' - ' + a1 + 'x = ' + b + '(' + a2 + 'x + ' + c2 + ') \\Leftrightarrow x = ' + ansF.latex + '$ (thỏa điều kiện).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1 - b c2 = 0', params: { bIdx: 2, a1: 4, c1: 5, a2: 3, c2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (log_5(4-9x)-log_5(6x+1)=1 -> -1/39)', params: { bIdx: 2, a1: 9, c1: 4, a2: 6, c2: 1 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Phương trình tổng log_2(a1 x - c1) + log_2(-a2 x - c2) = 1 vô nghiệm do ĐKXĐ
  t11_b21_d16_log_eq_sum_no_sol_mc: {
    id: 't11_b21_d16_log_eq_sum_no_sol_mc',
    name: 'Giải phương trình log_2(a1 x - c1) + log_2(-a2 x - c2) = k (loại nghiệm theo ĐKXĐ)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải phương trình tích lôgarit và đối chiếu điều kiện xác định hai biểu thức mâu thuẫn nhau.',
    conditionSummary: 'a1 ∈ [2; 6], c1 ∈ [3; 9], a2 ∈ [2; 5], c2 ∈ [1; 5], phương trình bậc hai có 2 nghiệm thực nhưng vi phạm ĐKXĐ',
    paramSpecs: [
      { name: 'a1', label: 'Hệ số a1 > 0', min: 2, max: 6 },
      { name: 'c1', label: 'Hằng số c1 > 0', min: 3, max: 9 },
      { name: 'a2', label: 'Hệ số a2 > 0 (trong -a2 x - c2)', min: 2, max: 5 },
      { name: 'c2', label: 'Hằng số c2 > 0', min: 1, max: 5 },
    ],
    validateCode: `
      const { a1, c1, a2, c2 } = params;
      if (a1 < 2 || a1 > 6 || c1 < 3 || c1 > 9 || a2 < 2 || a2 > 5 || c2 < 1 || c2 > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const A = a1 * a2;
      const B = a1 * c2 - c1 * a2;
      const C = 2 - c1 * c2;
      const delta = B * B - 4 * A * C;
      if (delta <= 1) return { valid: false, reason: 'Cần delta > 1 để phương trình hệ quả có 2 nghiệm thực' };
      const r = Math.round(Math.sqrt(delta));
      if (r * r === delta) return { valid: false, reason: 'Tránh delta chính phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, c1, a2, c2 } = params;
      const A = a1 * a2;
      const B = a1 * c2 - c1 * a2;
      const C = 2 - c1 * c2;
      const delta = B * B - 4 * A * C;
      let k = 1, d = delta;
      for (let f = 2; f * f <= d; f++) {
        while (d % (f * f) === 0) {
          k *= f;
          d /= f * f;
        }
      }
      const twoA = 2 * A;
      const gAll = u.gcd(u.gcd(Math.abs(B), k), twoA);
      const midF = u.simplifyFrac(-B, twoA);
      const radDen = twoA / gAll;
      const radK = k / gAll;
      const radStr = '\\dfrac{' + (radK === 1 ? '' : radK) + '\\sqrt{' + d + '}}{' + radDen + '}';
      const rLow = (midF.num === 0 ? '-' + radStr : midF.latex + ' - ' + radStr);
      const rHigh = (midF.num === 0 ? radStr : midF.latex + ' + ' + radStr);

      const xBound1 = u.simplifyFrac(c1, a1);
      const xBound2 = u.simplifyFrac(-c2, a2);
      const bStr = B === 0 ? '' : B > 0 ? ' + ' + B + 'x' : ' - ' + (-B) + 'x';
      const cStr = C === 0 ? '' : C > 0 ? ' + ' + C : ' - ' + (-C);

      const correct = 'Phương trình vô nghiệm';
      const wrongs = [
        '$x = ' + xBound1.latex + ',\\; x = ' + xBound2.latex + '$',
        '$x = ' + rLow + '$',
        '$x = ' + rLow + ',\\; x = ' + rHigh + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Nghiệm của phương trình $\\log_2(' + a1 + 'x - ' + c1 + ') + \\log_2(-' + a2 + 'x - ' + c2 + ') = 1$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $' + a1 + 'x - ' + c1 + ' > 0 \\Leftrightarrow x > ' + xBound1.latex + '$ và $-' + a2 + 'x - ' + c2 + ' > 0 \\Leftrightarrow x < ' + xBound2.latex + '$.',
          'Hai điều kiện mâu thuẫn nhau ($' + xBound2.latex + ' < 0 < ' + xBound1.latex + '$) nên không có giá trị $x$ nào thỏa điều kiện xác định (dù phương trình hệ quả $' + A + 'x^2' + bStr + cStr + ' = 0$ có hai nghiệm $' + rLow + ',\\; ' + rHigh + '$). Vậy phương trình vô nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên delta chính phương (delta = 121)', params: { a1: 3, c1: 5, a2: 2, c2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (5x-7, -3x-1 -> vô nghiệm)', params: { a1: 5, c1: 7, a2: 3, c2: 1 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Bất phương trình mũ cơ bản b^x >= K (b > 1)
  t11_b21_d17_exp_ineq_ge_mc: {
    id: 't11_b21_d17_exp_ineq_ge_mc',
    name: 'Giải bất phương trình mũ cơ bản b^x ≥ K (b > 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Áp dụng tính đồng biến của hàm số mũ cơ số b > 1 để giải b^x >= K.',
    conditionSummary: 'b ∈ [2; 7], K ∈ [50; 350], K không phải luỹ thừa của b',
    paramSpecs: [
      { name: 'b', label: 'Cơ số nguyên b > 1', min: 2, max: 7 },
      { name: 'K', label: 'Hằng số K', min: 50, max: 350 },
    ],
    validateCode: `
      const { b, K } = params;
      if (b < 2 || b > 7 || K < 50 || K > 350) return { valid: false, reason: 'Tham số ngoài miền' };
      let p = b;
      while (p < K) p *= b;
      if (p === K) return { valid: false, reason: 'K là luỹ thừa đúng của b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, K } = params;
      const lg = '\\log_{' + b + '} ' + K;
      const correct = '$S = [' + lg + '; +\\infty)$';
      const wrongs = [
        '$S = (-\\infty; ' + lg + ']$',
        '$S = (' + lg + '; +\\infty)$',
        '$S = (-\\infty; ' + lg + ')$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $' + b + '^x \\ge ' + K + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì cơ số $' + b + ' > 1$ nên $' + b + '^x \\ge ' + K + ' \\Leftrightarrow x \\ge ' + lg + '$. Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên K = 5^3 = 125', params: { b: 5, K: 125 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (5^x >= 228)', params: { b: 5, K: 228 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Bất phương trình mũ cơ bản b^x <= K (b > 1)
  t11_b21_d18_exp_ineq_le_mc: {
    id: 't11_b21_d18_exp_ineq_le_mc',
    name: 'Giải bất phương trình mũ cơ bản b^x ≤ K (b > 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải b^x <= K với b > 1.',
    conditionSummary: 'b ∈ [2; 7], K ∈ [50; 350], K không phải luỹ thừa của b',
    paramSpecs: [
      { name: 'b', label: 'Cơ số nguyên b > 1', min: 2, max: 7 },
      { name: 'K', label: 'Hằng số K', min: 50, max: 350 },
    ],
    validateCode: `
      const { b, K } = params;
      if (b < 2 || b > 7 || K < 50 || K > 350) return { valid: false, reason: 'Tham số ngoài miền' };
      let p = b;
      while (p < K) p *= b;
      if (p === K) return { valid: false, reason: 'K là luỹ thừa đúng của b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, K } = params;
      const lg = '\\log_{' + b + '} ' + K;
      const correct = '$S = (-\\infty; ' + lg + ']$';
      const wrongs = [
        '$S = (-\\infty; ' + lg + ')$',
        '$S = (' + lg + '; +\\infty)$',
        '$S = [' + lg + '; +\\infty)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $' + b + '^x \\le ' + K + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì cơ số $' + b + ' > 1$ nên $' + b + '^x \\le ' + K + ' \\Leftrightarrow x \\le ' + lg + '$. Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên K = 4^4 = 256', params: { b: 4, K: 256 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (4^x <= 300)', params: { b: 4, K: 300 }, expectedValid: true },
    ],
  },
};
