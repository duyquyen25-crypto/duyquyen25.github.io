import { MathTemplate } from '../types/math';

export const G11_B29_MC_PART1: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Tìm khẳng định đúng)
  t11_b29_d01_proj_prop_correct_mc: {
    id: 't11_b29_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng xác suất',
    description: 'Nhận biết khẳng định đúng về các tính chất bất biến của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề đúng (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (!Number.isInteger(params.mode) || params.mode < 0 || params.mode > 3) {
        return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
          wrongs: [
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song',
            'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng',
            'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
          ],
          sol: 'Khi ba đường thẳng đồng quy không nằm trong mặt phẳng song song phương chiếu, phép chiếu song song biến chúng thành ba đường thẳng đồng quy.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song bảo toàn diện tích của hình phẳng',
            'Phép chiếu song song bảo toàn số đo góc trong tam giác',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng của ba điểm.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn tính vuông góc',
            'Phép chiếu song song biến mọi tam giác vuông thành tam giác vuông',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Ảnh của hai đường thẳng song song (không song song phương chiếu) qua phép chiếu song song là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn chu vi mọi đa giác',
            'Phép chiếu song song luôn biến hình chữ nhật thành hình chữ nhật',
            'Phép chiếu song song luôn giữ nguyên độ dài của đoạn thẳng bất kì',
          ],
          sol: 'Tỉ số độ dài hai đoạn thẳng trên cùng một đường thẳng hoặc trên hai đường thẳng song song được bảo toàn qua phép chiếu song song.',
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
  t11_b29_d02_proj_prop_wrong_mc: {
    id: 't11_b29_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng xác suất',
    description: 'Nhận biết khẳng định sai về tính chất của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề sai (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (!Number.isInteger(params.mode) || params.mode < 0 || params.mode > 3) {
        return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song bảo toàn góc trong tam giác',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          ],
          sol: 'Khẳng định đã cho sai vì phép chiếu song song nói chung không bảo toàn số đo góc nên góc trong tam giác có thể thay đổi.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song biến trung điểm đoạn thẳng thành trung điểm của hình chiếu',
          ],
          sol: 'Khẳng định đã cho sai vì phép chiếu song song nói chung làm thay đổi độ dài của đoạn thẳng.',
        },
        {
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song bảo toàn thứ tự ba điểm thẳng hàng',
            'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
          ],
          sol: 'Khẳng định đã cho sai vì hình chiếu của hai đường thẳng nằm cùng trên một mặt phẳng chiếu nên không thể chéo nhau.',
        },
        {
          correct: 'Phép chiếu song song luôn bảo toàn diện tích của hình phẳng',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng cùng nằm trên một đường thẳng',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          ],
          sol: 'Khẳng định đã cho sai vì độ dài và góc bị biến đổi nên diện tích không được bảo toàn.',
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

  // D03 (Q3): Hình chiếu song song của hình phẳng (tam giác, đường tròn, tứ giác)
  t11_b29_d03_proj_shape_correct_mc: {
    id: 't11_b29_d03_proj_shape_correct_mc',
    name: 'Hình chiếu song song của tam giác, đường tròn và tứ giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng xác suất',
    description: 'Nhận diện khẳng định đúng về hình chiếu song song của các hình phẳng cơ bản.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể nhận diện hình chiếu (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (!Number.isInteger(params.mode) || params.mode < 0 || params.mode > 3) {
        return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của một tam giác (có mặt phẳng không song song phương chiếu) là một tam giác',
          wrongs: [
            'Hình chiếu song song của một đường tròn chỉ có thể là đường elip hoặc đường tròn',
            'Hình chiếu song song của hình thang là một hình chữ nhật',
            'Hình chiếu song song của hình tròn luôn là một hình tròn',
          ],
          sol: 'Khi mặt phẳng chứa tam giác không song song với phương chiếu, hình chiếu song song của ba đỉnh không thẳng hàng tạo thành một tam giác.',
        },
        {
          correct: 'Hình chiếu song song của một đường tròn là một đường tròn, một đường elip hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của một đường tròn luôn là một đường elip',
            'Hình chiếu song song của một tam giác vuông luôn là một tam giác vuông',
            'Hình chiếu song song của một hình vuông luôn là một hình vuông',
          ],
          sol: 'Hình chiếu song song của đường tròn là đường tròn, elip hoặc đoạn thẳng tùy vào góc nghiêng giữa mặt phẳng chứa đường tròn với phương chiếu và mặt phẳng chiếu.',
        },
        {
          correct: 'Hình chiếu song song của một hình bình hành (có mặt phẳng không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của một hình bình hành luôn là một hình thoi',
            'Hình chiếu song song của một hình chữ nhật luôn có bốn góc vuông',
            'Hình chiếu song song của một đường tròn có thể là đường parabol',
          ],
          sol: 'Vì phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau, ảnh của hình bình hành khi không suy biến là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của một hình thang (có mặt phẳng không song song phương chiếu) là một hình thang',
          wrongs: [
            'Hình chiếu song song của một hình thang luôn là hình bình hành',
            'Hình chiếu song song của một tam giác đều luôn là tam giác đều',
            'Hình chiếu song song của một hình tròn luôn là hình tròn',
          ],
          sol: 'Phép chiếu song song giữ nguyên tính song song của hai đáy hình thang nên hình chiếu khi không suy biến vẫn là hình thang.',
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

  // D04 (Q4): Hình chiếu song song của đỉnh lên mặt bên lăng trụ ABC.A'B'C' theo phương cạnh đáy
  t11_b29_d04_prism_proj_point_side_mc: {
    id: 't11_b29_d04_prism_proj_point_side_mc',
    name: 'Hình chiếu song song của đỉnh lên mặt bên lăng trụ theo phương cạnh đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Tìm hình chiếu song song của một đỉnh lăng trụ tam giác lên mặt bên theo phương cạnh đáy.',
    conditionSummary: 'setIdx ∈ [0; 2], variant ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'variant', label: 'Biến thể đỉnh và mặt chiếu (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, variant } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      if (!Number.isInteger(variant) || variant < 0 || variant > 3) return { valid: false, reason: 'variant ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, variant } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1' },
        { A: 'M', B: 'N', C: 'P', Ap: "M'", Bp: "N'", Cp: "P'" },
      ];
      const s = SETS[setIdx];
      const prism = s.A + s.B + s.C + '.' + s.Ap + s.Bp + s.Cp;
      const CASES = [
        { pt: s.Cp, plane: s.A + s.B + s.Bp + s.Ap, dir: s.B + s.C, ans: s.Bp, wrongs: [s.Ap, s.B, s.A], edge: s.Cp + s.Bp },
        { pt: s.Cp, plane: s.A + s.B + s.Bp + s.Ap, dir: s.A + s.C, ans: s.Ap, wrongs: [s.Bp, s.A, s.B], edge: s.Cp + s.Ap },
        { pt: s.A, plane: s.B + s.C + s.Cp + s.Bp, dir: s.A + s.C, ans: s.C, wrongs: [s.B, s.Cp, s.Bp], edge: s.A + s.C },
        { pt: s.B, plane: s.A + s.C + s.Cp + s.Ap, dir: s.A + s.B, ans: s.A, wrongs: [s.C, s.Ap, s.Cp], edge: s.B + s.A },
      ];
      const c = CASES[variant];
      const correct = 'Điểm $' + c.ans + '$';
      const wrongs = c.wrongs.map((w) => 'Điểm $' + w + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $' + prism + '$. Hình chiếu song song của điểm $' + c.pt + '$ lên mặt phẳng $(' + c.plane + ')$ theo phương $' + c.dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì hai đáy lăng trụ có các cặp cạnh tương ứng song song nên đường thẳng đi qua $' + c.pt + '$ song song với $' + c.dir + '$ chính là cạnh $' + c.edge + '$.',
          'Đường thẳng $' + c.edge + '$ cắt mặt phẳng $(' + c.plane + ')$ tại điểm $' + c.ans + '$, suy ra hình chiếu là điểm $' + c.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên variant = 4', params: { setIdx: 0, variant: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { setIdx: 0, variant: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hình chiếu song song trên lăng trụ ABC.DEF
  t11_b29_d05_prism_proj_def_side_mc: {
    id: 't11_b29_d05_prism_proj_def_side_mc',
    name: 'Hình chiếu song song của đỉnh lên mặt bên lăng trụ ABC.DEF',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Tìm hình chiếu song song của một đỉnh lăng trụ ABC.DEF lên mặt bên (BCFE) theo phương cạnh đáy.',
    conditionSummary: 'setIdx ∈ [0; 2], variant ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'variant', label: 'Biến thể đỉnh và mặt chiếu (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, variant } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      if (!Number.isInteger(variant) || variant < 0 || variant > 3) return { valid: false, reason: 'variant ngoài miền [0; 3]' };
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
      const prism = s.A + s.B + s.C + '.' + s.D + s.E + s.F;
      const CASES = [
        { pt: s.D, plane: s.B + s.C + s.F + s.E, dir: s.A + s.C, ans: s.F, wrongs: [s.A, s.E, s.C], edge: s.D + s.F },
        { pt: s.D, plane: s.B + s.C + s.F + s.E, dir: s.A + s.B, ans: s.E, wrongs: [s.A, s.F, s.B], edge: s.D + s.E },
        { pt: s.A, plane: s.B + s.C + s.F + s.E, dir: s.D + s.E, ans: s.B, wrongs: [s.C, s.E, s.D], edge: s.A + s.B },
        { pt: s.E, plane: s.A + s.C + s.F + s.D, dir: s.B + s.C, ans: s.F, wrongs: [s.C, s.D, s.A], edge: s.E + s.F },
      ];
      const c = CASES[variant];
      const correct = 'Điểm $' + c.ans + '$';
      const wrongs = c.wrongs.map((w) => 'Điểm $' + w + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $' + prism + '$. Hình chiếu song song của điểm $' + c.pt + '$ lên mặt phẳng $(' + c.plane + ')$ theo phương $' + c.dir + '$ là điểm nào?',
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
          'Đường thẳng đi qua $' + c.pt + '$ song song với $' + c.dir + '$ chính là cạnh $' + c.edge + '$.',
          'Do $' + c.ans + ' \\in (' + c.plane + ')$ nên hình chiếu cần tìm là điểm $' + c.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, variant: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5', params: { setIdx: 0, variant: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Cho A, B độc lập, biết P(A), P(B) -> tính P(AB)
  t11_b29_d06_indep_ab_prob_mc: {
    id: 't11_b29_d06_indep_ab_prob_mc',
    name: 'Tính xác suất biến cố giao P(AB) của hai biến cố độc lập',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho hai biến cố độc lập A, B với P(A) = a/10, P(B) = b/10. Tính xác suất P(AB).',
    conditionSummary: 'a ∈ [1; 9], b ∈ [1; 9]',
    paramSpecs: [
      { name: 'a', label: '10·P(A)', min: 1, max: 9 },
      { name: 'b', label: '10·P(B)', min: 1, max: 9 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 1 || a > 9) return { valid: false, reason: 'a ngoài miền [1; 9]' };
      if (!Number.isInteger(b) || b < 1 || b > 9) return { valid: false, reason: 'b ngoài miền [1; 9]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const pA = a / 10, pB = b / 10;
      const prod = Math.round(a * b) / 100;
      const fmtVn = (val) => {
        const s = String(Number(val.toFixed(3)));
        return s.replace('.', ',');
      };
      const correct = '$' + fmtVn(prod) + '$';
      const candWrongs = [
        Number((pA + pB).toFixed(2)),
        Number((pA + pB - prod).toFixed(2)),
        Number((Math.max(pA, pB) + 0.2).toFixed(2)),
        Number((prod + 0.3).toFixed(2)),
        Number((prod + 0.15).toFixed(2)),
      ].filter((v) => Math.abs(v - prod) > 1e-6);

      const wrongs = candWrongs.map((v) => '$' + fmtVn(v) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + fmtVn(Number((prod + (idx + 1) * 0.11).toFixed(2))) + '$'
      );

      return {
        stem: 'Cho $A$ và $B$ là hai biến cố độc lập. Biết $P(A) = ' + fmtVn(pA) + '$ và $P(B) = ' + fmtVn(pB) + '$. Tính xác suất của biến cố $AB$ (kết quả làm tròn đến hàng phần nghìn).',
        options,
        correctIndex,
        answerSummary: fmtVn(prod),
        solutionSteps: [
          'Do $A$ và $B$ là hai biến cố độc lập nên $P(AB) = P(A) \\cdot P(B) = ' + fmtVn(pA) + ' \\cdot ' + fmtVn(pB) + ' = ' + fmtVn(prod) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (0,5 và 0,2)', params: { a: 5, b: 2 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Cho A, B độc lập, biết P(A), P(B) -> tính P(Ā B̄)
  t11_b29_d07_indep_comp_inter_prob_mc: {
    id: 't11_b29_d07_indep_comp_inter_prob_mc',
    name: 'Tính xác suất P(ĀB̄) của hai biến cố độc lập',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho hai biến cố độc lập A, B với P(A), P(B). Tính xác suất để cả A và B đều không xảy ra.',
    conditionSummary: 'a ∈ [10; 85], b ∈ [10; 85]',
    paramSpecs: [
      { name: 'a', label: '100·P(A)', min: 10, max: 85 },
      { name: 'b', label: '100·P(B)', min: 10, max: 85 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 10 || a > 85) return { valid: false, reason: 'a ngoài miền [10; 85]' };
      if (!Number.isInteger(b) || b < 10 || b > 85) return { valid: false, reason: 'b ngoài miền [10; 85]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const pA = a / 100, pB = b / 100;
      const qA = (100 - a) / 100, qB = (100 - b) / 100;
      const ans = Math.round(qA * qB * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const w1 = Math.round((pA * qB) * 100) / 100;
      const w2 = Math.round((pA * pB) * 100) / 100;
      const w3 = Math.round((qA * pB) * 100) / 100;
      const candWrongs = [
        ans + 0.02,
        w2,
        w1,
        w3,
        ans + 0.2,
        ans + 0.14,
      ].map((v) => Math.round(v * 100) / 100).filter((v) => v > 0 && Math.abs(v - ans) >= 0.01);

      const correct = '$' + fmt2(ans) + '$';
      const wrongs = candWrongs.map((v) => '$' + fmt2(v) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + fmt2(Math.min(0.99, ans + (idx + 3) * 0.05)) + '$'
      );

      return {
        stem: 'Cho $A$ và $B$ là hai biến cố độc lập. Biết $P(A) = ' + fmt2(pA) + '$ và $P(B) = ' + fmt2(pB) + '$. Tính xác suất của biến cố $\\overline{A}\\,\\overline{B}$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Vì $A$ và $B$ độc lập nên $\\overline{A}$ và $\\overline{B}$ cũng độc lập.',
          '$P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = (1 - ' + fmt2(pA) + ')(1 - ' + fmt2(pB) + ') = ' + fmt2(qA) + ' \\cdot ' + fmt2(qB) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 5', params: { a: 5, b: 72 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (0,54 và 0,72)', params: { a: 54, b: 72 }, expectedValid: true },
    ],
  },
};
