import { MathTemplate } from '../types/math';

export const G11_C6_END_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Phép chiếu song song — khẳng định ĐÚNG
  t11_c6_bt_d01_proj_prop_correct_mc: {
    id: 't11_c6_bt_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Nhận biết khẳng định đúng về tính chất cơ bản của phép chiếu song song.',
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
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
            'Phép chiếu song song bảo toàn diện tích',
            'Phép chiếu song song không làm thay đổi độ dài của mọi đoạn thẳng',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau là khẳng định đúng.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và bảo toàn thứ tự của chúng',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song bảo toàn diện tích tam giác',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng và thứ tự của ba điểm thẳng hàng.',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn độ dài của đoạn thẳng bất kì',
            'Phép chiếu song song bảo toàn số đo góc',
            'Phép chiếu song song luôn biến hình chữ nhật thành hình chữ nhật',
          ],
          sol: 'Tỉ số độ dài của hai đoạn thẳng cùng phương được bảo toàn qua phép chiếu song song.',
        },
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy hoặc cùng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song luôn biến đường tròn thành đường tròn',
            'Phép chiếu song song bảo toàn chu vi đa giác',
            'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
          ],
          sol: 'Phép chiếu song song bảo toàn giao điểm nên giữ tính đồng quy (khi các đường không song song phương chiếu).',
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
  t11_c6_bt_d02_proj_prop_wrong_mc: {
    id: 't11_c6_bt_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Nhận biết khẳng định sai về các tính chất không được bảo toàn qua phép chiếu song song.',
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
          correct: 'Phép chiếu song song bảo toàn tính vuông góc',
          wrongs: [
            'Phép chiếu song song biến ba đường thẳng đồng quy (không song song phương chiếu) thành ba đường thẳng đồng quy',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song không bảo toàn góc nên không bảo toàn tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn diện tích của đa giác',
          wrongs: [
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Hình chiếu song song của một đoạn thẳng (không song song phương chiếu) là một đoạn thẳng',
          ],
          sol: 'Phép chiếu song song không bảo toàn độ dài và không bảo toàn diện tích.',
        },
        {
          correct: 'Phép chiếu song song luôn bảo toàn độ dài của đoạn thẳng',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành đoạn thẳng',
            'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng trên hai đường thẳng song song',
            'Phép chiếu song song biến trung điểm đoạn thẳng (không song song phương chiếu) thành trung điểm của hình chiếu',
          ],
          sol: 'Phép chiếu song song nói chung làm thay đổi độ dài đoạn thẳng (chỉ giữ nguyên tỉ số hai đoạn thẳng cùng phương).',
        },
        {
          correct: 'Phép chiếu song song có thể biến đường tròn thành một điểm',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành một đường elip',
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Phép chiếu song song biến hình bình hành (mặt phẳng không chứa phương chiếu) thành hình bình hành',
          ],
          sol: 'Hình chiếu song song của đường tròn chỉ có thể là đường tròn, elip hoặc đoạn thẳng, không thể là một điểm.',
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

  // D03 (Q3): Hình chiếu song song của hình vuông / chữ nhật / tam giác
  t11_c6_bt_d03_proj_polygon_mc: {
    id: 't11_c6_bt_d03_proj_polygon_mc',
    name: 'Hình chiếu song song của đa giác phẳng (hình vuông, chữ nhật, tam giác)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Nhận biết khẳng định đúng về hình chiếu song song của hình vuông, hình chữ nhật hoặc tam giác lên mặt phẳng không chứa phương chiếu.',
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
          correct: 'Hình chiếu song song của hình vuông (nằm trong mặt phẳng không song song với phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
            'Hình chiếu song song của tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của hình vuông luôn là một hình vuông',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song của các cặp cạnh đối nên hình chiếu của hình vuông (không song song phương chiếu) là một hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình chữ nhật (nằm trong mặt phẳng không song song với phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn là hình chữ nhật',
            'Hình chiếu song song của hình thoi luôn là hình thoi',
            'Hình chiếu song song của tam giác vuông luôn là tam giác vuông',
          ],
          sol: 'Phép chiếu song song giữ nguyên tính song song nhưng không giữ nguyên góc vuông và độ dài, nên hình chiếu của hình chữ nhật là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của một hình thang (nằm trong mặt phẳng không song song với phương chiếu) là một hình thang',
          wrongs: [
            'Hình chiếu song song của một hình thang cân luôn là hình thang cân',
            'Hình chiếu song song của tam giác cân luôn là tam giác cân',
            'Hình chiếu song song của hình vuông luôn có hai đường chéo vuông góc',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song của hai cạnh đáy hình thang và tỉ số độ dài trên hai đáy đó.',
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

  // D04 (Q4): Hình chiếu song song của đỉnh C lên mặt đáy trên (A1B1C1)
  t11_c6_bt_d04_prism_proj_top_mc: {
    id: 't11_c6_bt_d04_prism_proj_top_mc',
    name: 'Hình chiếu song song của đỉnh đáy dưới lên mặt đáy trên lăng trụ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Tìm hình chiếu song song của một đỉnh thuộc mặt đáy dưới lên mặt đáy trên theo phương cạnh bên.',
    conditionSummary: 'vIdx ∈ [0; 2], setIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Đỉnh cần chiếu (0: A, 1: B, 2: C)', min: 0, max: 2 },
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { vIdx, setIdx } = params;
      if (vIdx < 0 || vIdx > 2 || setIdx < 0 || setIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, setIdx } = params;
      const SETS = [
        { bots: ['A', 'B', 'C'], tops: ['A_1', 'B_1', 'C_1'] },
        { bots: ['A', 'B', 'C'], tops: ["A'", "B'", "C'"] },
        { bots: ['D', 'E', 'F'], tops: ['D_1', 'E_1', 'F_1'] },
      ];
      const s = SETS[setIdx];
      const base = s.bots.join('');
      const top = s.tops.join('');
      const dirIdx = (vIdx + 1) % 3;
      const pt = s.bots[vIdx];
      const img = s.tops[vIdx];
      const dirLine = s.bots[dirIdx] + s.tops[dirIdx];

      const correct = 'Điểm $' + img + '$';
      const wrongs = [
        'Điểm $' + s.tops[(vIdx + 1) % 3] + '$',
        'Điểm $' + s.tops[(vIdx + 2) % 3] + '$',
        'Điểm $' + pt + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Hình chiếu song song của điểm $' + pt + '$ lên mặt phẳng $(' + top + ')$ theo phương $' + dirLine + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.bots[0], vF: s.bots[1], vR: s.bots[2], tL: s.tops[0], tF: s.tops[1], tR: s.tops[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Do $' + pt + img + ' \\parallel ' + dirLine + '$ và $' + img + ' \\in (' + top + ')$ nên hình chiếu song song của điểm $' + pt + '$ lên mặt phẳng $(' + top + ')$ theo phương $' + dirLine + '$ là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { vIdx: 3, setIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (C -> C_1)', params: { vIdx: 2, setIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hình chiếu song song của đỉnh B' lên mặt đáy dưới (ABC)
  t11_c6_bt_d05_prism_proj_bot_mc: {
    id: 't11_c6_bt_d05_prism_proj_bot_mc',
    name: 'Hình chiếu song song của đỉnh đáy trên lên mặt đáy dưới lăng trụ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Tìm hình chiếu song song của một đỉnh thuộc mặt đáy trên lên mặt đáy dưới theo phương cạnh bên.',
    conditionSummary: 'vIdx ∈ [0; 2], setIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Đỉnh trên cần chiếu (0..2)', min: 0, max: 2 },
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { vIdx, setIdx } = params;
      if (vIdx < 0 || vIdx > 2 || setIdx < 0 || setIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, setIdx } = params;
      const SETS = [
        { bots: ['A', 'B', 'C'], tops: ["A'", "B'", "C'"] },
        { bots: ['A', 'B', 'C'], tops: ['A_1', 'B_1', 'C_1'] },
        { bots: ['M', 'N', 'P'], tops: ["M'", "N'", "P'"] },
      ];
      const s = SETS[setIdx];
      const base = s.bots.join('');
      const top = s.tops.join('');
      const dirIdx = (vIdx + 1) % 3;
      const pt = s.tops[vIdx];
      const img = s.bots[vIdx];
      const dirLine = s.bots[dirIdx] + s.tops[dirIdx];

      const correct = 'Điểm $' + img + '$';
      const wrongs = [
        'Điểm $' + s.bots[(vIdx + 2) % 3] + '$',
        'Điểm $' + s.tops[(vIdx + 2) % 3] + '$',
        'Điểm $' + s.tops[(vIdx + 1) % 3] + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Hình chiếu song song của điểm $' + pt + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + dirLine + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.bots[0], vF: s.bots[1], vR: s.bots[2], tL: s.tops[0], tF: s.tops[1], tR: s.tops[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì các cạnh bên lăng trụ song song nhau nên $' + pt + img + ' \\parallel ' + dirLine + '$, mà $' + img + ' \\in (' + base + ')$ nên hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { vIdx: 1, setIdx: 3 }, expectedValid: false },
      { label: "Mẫu chuẩn Q5 (B' -> B)", params: { vIdx: 1, setIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Lãi kép theo năm S = P(1 + r)^n
  t11_c6_bt_d06_compound_yearly_mc: {
    id: 't11_c6_bt_d06_compound_yearly_mc',
    name: 'Bài toán lãi suất kép theo năm',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Tính tổng tiền vốn và lãi S = P(1 + r%)^n sau n năm gửi tiết kiệm theo hình thức lãi kép.',
    conditionSummary: 'P ∈ [60; 250], r10 ∈ [35; 85] (lãi suất r = r10/10 %/năm), n ∈ [5; 18]',
    paramSpecs: [
      { name: 'P', label: 'Số tiền gửi ban đầu (triệu đồng)', min: 60, max: 250 },
      { name: 'r10', label: '10 · lãi suất (%/năm, VD: 47 là 4,7%)', min: 35, max: 85 },
      { name: 'n', label: 'Số năm gửi n', min: 5, max: 18 },
    ],
    validateCode: `
      const { P, r10, n } = params;
      if (P < 60 || P > 250 || r10 < 35 || r10 > 85 || n < 5 || n > 18) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const r = r10 / 1000;
      const S = P * Math.pow(1 + r, n);
      const frac = S * 100 - Math.floor(S * 100);
      if (Math.abs(frac - 0.5) < 0.02) return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P, r10, n } = params;
      const rPct = (r10 / 10).toFixed(1).replace('.', ',');
      const r = r10 / 1000;
      const S = P * Math.pow(1 + r, n);
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const ansVal = Math.round(S * 100) / 100;
      const correct = fmt2(ansVal) + ' triệu đồng';
      const wrongs = [
        fmt2(P * Math.pow(1 + r, n - 1)) + ' triệu đồng',
        fmt2(P * Math.pow(1 + r, n + 1)) + ' triệu đồng',
        fmt2(P * Math.pow(1 + r, n - 2)) + ' triệu đồng',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Một người gửi tiết kiệm ngân hàng số tiền $' + P + '$ triệu đồng theo hình thức lãi suất kép với lãi suất $' + rPct + '\\%$/năm. Tính tổng tiền cả vốn lẫn lãi người đó nhận được sau $' + n + '$ năm.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tổng tiền cả vốn lẫn lãi người đó nhận được sau $' + n + '$ năm là: $S = ' + P + '\\left(1 + ' + rPct + '\\%\\right)^{' + n + '} \\approx ' + fmt2(ansVal) + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 4', params: { P: 128, r10: 47, n: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (232,55 triệu)', params: { P: 128, r10: 47, n: 13 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Lãi kép theo tháng S = P(1 + r%)^m
  t11_c6_bt_d07_compound_monthly_mc: {
    id: 't11_c6_bt_d07_compound_monthly_mc',
    name: 'Bài toán lãi suất kép theo tháng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Tính tổng tiền cả vốn lẫn lãi S = P(1 + r%)^m sau m tháng gửi tiết kiệm.',
    conditionSummary: 'P ∈ [15; 120], r10 ∈ [3; 9] (0,3% - 0,9%/tháng), m ∈ [4; 12]',
    paramSpecs: [
      { name: 'P', label: 'Số tiền gửi ban đầu (triệu đồng)', min: 15, max: 120 },
      { name: 'r10', label: '10 · lãi suất (%/tháng, VD: 4 là 0,4%)', min: 3, max: 9 },
      { name: 'm', label: 'Số tháng gửi m', min: 4, max: 12 },
    ],
    validateCode: `
      const { P, r10, m } = params;
      if (P < 15 || P > 120 || r10 < 3 || r10 > 9 || m < 4 || m > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const r = r10 / 1000;
      const S = P * Math.pow(1 + r, m);
      const frac = S * 100 - Math.floor(S * 100);
      if (Math.abs(frac - 0.5) < 0.02) return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P, r10, m } = params;
      const rPct = (r10 / 10).toFixed(1).replace('.', ',');
      const r = r10 / 1000;
      const S = P * Math.pow(1 + r, m);
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const ansVal = Math.round(S * 100) / 100;
      const correct = fmt2(ansVal) + ' triệu đồng';
      const wrongs = [
        fmt2(P * Math.pow(1 + r, m + 1)) + ' triệu đồng',
        fmt2(P * Math.pow(1 + r, m - 1)) + ' triệu đồng',
        fmt2(P * Math.pow(1 + r, m - 2)) + ' triệu đồng',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Một người gửi tiết kiệm ngân hàng số tiền $' + P + '$ triệu đồng theo hình thức lãi suất kép với lãi suất $' + rPct + '\\%$/tháng. Tính tổng tiền cả vốn lẫn lãi người đó nhận được sau $' + m + '$ tháng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tổng tiền cả vốn lẫn lãi nhận được sau $' + m + '$ tháng là: $S = ' + P + '\\left(1 + ' + rPct + '\\%\\right)^{' + m + '} \\approx ' + fmt2(ansVal) + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r10 = 2', params: { P: 17, r10: 2, m: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (17,41 triệu)', params: { P: 17, r10: 4, m: 6 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Lãi kép tìm số năm tối thiểu đạt T triệu
  t11_c6_bt_d08_compound_min_years_mc: {
    id: 't11_c6_bt_d08_compound_min_years_mc',
    name: 'Tìm thời gian tối thiểu trong bài toán lãi suất kép',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Tìm số năm nguyên tối thiểu n sao cho P(1 + r%)^n >= T.',
    conditionSummary: 'P ∈ [40; 150], r10 ∈ [35; 80], T ∈ [P+25; P+120], giá trị thực n không sát số nguyên',
    paramSpecs: [
      { name: 'P', label: 'Tiền gốc P (triệu đồng)', min: 40, max: 150 },
      { name: 'r10', label: '10 · lãi suất (%/năm, VD: 47 là 4,7%)', min: 35, max: 80 },
      { name: 'extra', label: 'Tiền lãi tối thiểu cần thêm', min: 25, max: 120 },
    ],
    validateCode: `
      const { P, r10, extra } = params;
      if (P < 40 || P > 150 || r10 < 35 || r10 > 80 || extra < 25 || extra > 120) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const T = P + extra;
      const r = r10 / 1000;
      const nExact = Math.log(T / P) / Math.log(1 + r);
      if (Math.abs(nExact - Math.round(nExact)) < 0.005 || nExact < 4) {
        return { valid: false, reason: 'Tránh nghiệm n sát số nguyên hoặc quá nhỏ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P, r10, extra } = params;
      const T = P + extra;
      const rPct = (r10 / 10).toFixed(1).replace('.', ',');
      const r = r10 / 1000;
      const nExact = Math.log(T / P) / Math.log(1 + r);
      const ans = Math.ceil(nExact);
      const nApprox = nExact.toFixed(2).replace('.', ',');
      const correct = ans + ' năm';
      const wrongs = [
        (ans + 1) + ' năm',
        (ans - 1) + ' năm',
        (ans - 2) + ' năm',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Một người gửi tiết kiệm ngân hàng số tiền $' + P + '$ triệu đồng theo hình thức lãi suất kép với lãi suất $' + rPct + '\\%$/năm. Tính thời gian tối thiểu (tính theo số nguyên năm) để người đó nhận được số tiền ít nhất là $' + T + '$ triệu đồng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta cần $' + P + '\\left(1 + ' + rPct + '\\%\\right)^n \\ge ' + T + ' \\Leftrightarrow n \\ge \\log_{1 + ' + rPct + '\\%}\\left(\\dfrac{' + T + '}{' + P + '}\\right) \\approx ' + nApprox + '$.',
          'Do $n$ là số nguyên năm nên thời gian tối thiểu là $' + ans + '$ năm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên extra = 10', params: { P: 72, r10: 47, extra: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (72 -> 109 => 10 năm)', params: { P: 72, r10: 47, extra: 37 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Lãi kép kỳ hạn 3 tháng (quý) với lãi suất năm r%/năm trong t năm
  t11_c6_bt_d09_compound_quarterly_mc: {
    id: 't11_c6_bt_d09_compound_quarterly_mc',
    name: 'Bài toán lãi suất kép kì hạn 3 tháng (theo quý)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Quy đổi lãi suất năm r%/năm sang lãi suất quý (r/4)% và tính số tiền sau t năm (4t quý).',
    conditionSummary: 'P ∈ [80; 250], r10 ∈ [35; 85], t ∈ [2; 8]',
    paramSpecs: [
      { name: 'P', label: 'Tiền gốc P (triệu đồng)', min: 80, max: 250 },
      { name: 'r10', label: '10 · lãi suất năm (%/năm, VD: 47 là 4,7%)', min: 35, max: 85 },
      { name: 't', label: 'Số năm gửi t', min: 2, max: 8 },
    ],
    validateCode: `
      const { P, r10, t } = params;
      if (P < 80 || P > 250 || r10 < 35 || r10 > 85 || t < 2 || t > 8) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const rq = r10 / 4000;
      const S = P * Math.pow(1 + rq, 4 * t);
      const frac = S * 100 - Math.floor(S * 100);
      if (Math.abs(frac - 0.5) < 0.02) return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P, r10, t } = params;
      const rPct = (r10 / 10).toFixed(1).replace('.', ',');
      const qCount = 4 * t;
      const rqPctVal = r10 / 40;
      const rqPctStr = rqPctVal.toFixed(3).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',');
      const rq = r10 / 4000;
      const S = P * Math.pow(1 + rq, qCount);
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const ansVal = Math.round(S * 100) / 100;
      const correct = fmt2(ansVal) + ' triệu đồng';
      const wrongs = [
        fmt2(P * Math.pow(1 + r10 / 1000, qCount)) + ' triệu đồng',
        fmt2(P * Math.pow(1 + rq, t)) + ' triệu đồng',
        fmt2(P * Math.pow(1 + rq, qCount) - 0.63) + ' triệu đồng',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Một người gửi tiết kiệm ngân hàng số tiền $' + P + '$ triệu đồng theo hình thức lãi suất kép với kì hạn $3$ tháng và lãi suất $' + rPct + '\\%$/năm. Tính tổng tiền cả vốn lẫn lãi người đó nhận được sau $' + t + '$ năm.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Số quý sau $' + t + '$ năm là $' + qCount + '$ quý. Lãi suất của một quý là $\\dfrac{' + rPct + '\\%}{12} \\cdot 3 = ' + rqPctStr + '\\%$.',
          'Tổng tiền nhận được sau $' + t + '$ năm là: $S = ' + P + '\\left(1 + ' + rqPctStr + '\\%\\right)^{' + qCount + '} \\approx ' + fmt2(ansVal) + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t = 1', params: { P: 164, r10: 47, t: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (197,70 triệu)', params: { P: 164, r10: 47, t: 4 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Dân số tăng trưởng rời rạc S = P(1 + r%)^dt
  t11_c6_bt_d10_pop_discrete_mc: {
    id: 't11_c6_bt_d10_pop_discrete_mc',
    name: 'Bài toán tăng trưởng dân số theo tỉ lệ phần trăm hằng năm',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Tính dân số dự báo sau dt năm theo công thức S = P(1 + r%)^dt (làm tròn 2 chữ số thập phân).',
    conditionSummary: 'P100 ∈ [150; 650] (1,50 - 6,50 triệu), r10 ∈ [8; 25], y0 ∈ [2018; 2024], dt ∈ [3; 9]',
    paramSpecs: [
      { name: 'P100', label: '100 · dân số gốc (VD: 267 là 2,67 triệu)', min: 150, max: 650 },
      { name: 'r10', label: '10 · tỉ lệ tăng (%/năm, VD: 11 là 1,1%)', min: 8, max: 25 },
      { name: 'y0', label: 'Năm mốc', min: 2018, max: 2024 },
      { name: 'dt', label: 'Số năm sau năm mốc', min: 3, max: 9 },
    ],
    validateCode: `
      const { P100, r10, y0, dt } = params;
      if (P100 < 150 || P100 > 650 || r10 < 8 || r10 > 25 || y0 < 2018 || y0 > 2024 || dt < 3 || dt > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const P = P100 / 100;
      const r = r10 / 1000;
      const S = P * Math.pow(1 + r, dt);
      const frac = S * 100 - Math.floor(S * 100);
      if (Math.abs(frac - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P100, r10, y0, dt } = params;
      const P = P100 / 100;
      const r = r10 / 1000;
      const y1 = y0 + dt;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const rPct = (r10 / 10).toFixed(1).replace('.', ',');
      const S = P * Math.pow(1 + r, dt);
      const ansVal = Math.round(S * 100) / 100;
      const correct = fmt2(ansVal) + ' (triệu người)';
      const wrongs = [
        fmt2(ansVal - 0.03) + ' (triệu người)',
        fmt2(ansVal + 0.03) + ' (triệu người)',
        fmt2(ansVal - 0.06) + ' (triệu người)',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Biết rằng vào ngày 01/11/' + y0 + ', dân số của thành phố $C$ có khoảng $' + fmt2(P) + '$ (triệu người). Nếu tỉ lệ tăng dân số của thành phố $C$ là $' + rPct + '\\%$/năm và giữ ổn định qua các năm thì vào ngày 01/11/' + y1 + ', dân số của thành phố $C$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dân số của thành phố $C$ sau $' + dt + '$ năm là: $S = ' + fmt2(P) + '\\left(1 + ' + rPct + '\\%\\right)^{' + dt + '} \\approx ' + fmt2(ansVal) + '$ (triệu người).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dt = 2', params: { P100: 267, r10: 11, y0: 2022, dt: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (2,79 triệu người)', params: { P100: 267, r10: 11, y0: 2022, dt: 4 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Tăng lương định kỳ sau mỗi 2 năm
  t11_c6_bt_d11_periodic_salary_mc: {
    id: 't11_c6_bt_d11_periodic_salary_mc',
    name: 'Bài toán tăng lương định kỳ theo cấp số nhân',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Mức lương khởi điểm L, sau mỗi 2 năm tăng p%, tính mức lương hàng tháng ở năm thứ 2k + 1.',
    conditionSummary: 'L100 ∈ [550; 1200] (5,50 - 12,00 triệu), p ∈ [15; 40], k ∈ [6; 14] (n = 2k + 1 năm)',
    paramSpecs: [
      { name: 'L100', label: '100 · lương khởi điểm (VD: 796 là 7,96 triệu)', min: 550, max: 1200 },
      { name: 'p', label: 'Tỉ lệ tăng mỗi chu kì 2 năm (%)', min: 15, max: 40 },
      { name: 'k', label: 'Số lần tăng lương k (năm thứ 2k + 1)', min: 6, max: 14 },
    ],
    validateCode: `
      const { L100, p, k } = params;
      if (L100 < 550 || L100 > 1200 || p < 15 || p > 40 || k < 6 || k > 14) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const L = L100 / 100;
      const S = L * Math.pow(1 + p / 100, k);
      const frac = S * 100 - Math.floor(S * 100);
      if (Math.abs(frac - 0.5) < 0.02) return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L100, p, k } = params;
      const L = L100 / 100;
      const nYears = 2 * k + 1;
      const rate = 1 + p / 100;
      const S = L * Math.pow(rate, k);
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const ansVal = Math.round(S * 100) / 100;
      const correct = fmt2(ansVal) + ' (triệu đồng)';
      const wrongs = [
        fmt2(L * Math.pow(rate, k - 1)) + ' (triệu đồng)',
        fmt2(L * Math.pow(rate, k + 1)) + ' (triệu đồng)',
        fmt2(ansVal + 1) + ' (triệu đồng)',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Một nhân viên giao hàng làm việc trong một công ty với mức lương khởi điểm là $' + fmt2(L) + '$ triệu đồng/tháng. Cứ sau $2$ năm thì mức lương tăng lên thêm $' + p + '\\%$ so với mức lương trước đó. Nếu nhân viên này làm việc liên tục trong $' + nYears + '$ năm thì mức lương hàng tháng của năm thứ $' + nYears + '$ là bao nhiêu?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Cứ sau $2$ năm lương tăng một lần, nên đến năm thứ $' + nYears + '$ số lần được tăng lương là $k = \\dfrac{' + nYears + ' - 1}{2} = ' + k + '$.',
          'Mức lương hàng tháng của năm thứ $' + nYears + '$ là: $S = ' + fmt2(L) + '\\left(1 + ' + p + '\\%\\right)^{' + k + '} \\approx ' + fmt2(ansVal) + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 5', params: { L100: 796, p: 35, k: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (291,69 triệu đồng)', params: { L100: 796, p: 35, k: 12 }, expectedValid: true },
    ],
  },
};
