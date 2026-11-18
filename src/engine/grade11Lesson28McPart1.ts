import { MathTemplate } from '../types/math';

export const G11_B28_MC_PART1: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Tìm khẳng định đúng)
  t11_b28_d01_proj_prop_correct_mc: {
    id: 't11_b28_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Nhận biết khẳng định đúng về tính chất cơ bản của phép chiếu song song.',
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
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng nên biến ba điểm thẳng hàng thành ba điểm thẳng hàng.',
        },
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song bảo toàn diện tích của mọi đa giác',
          ],
          sol: 'Khi ba đường thẳng đồng quy không song song phương chiếu, phép chiếu song song biến chúng thành ba đường thẳng đồng quy (hoặc trùng nhau tại giao điểm nếu trường hợp suy biến trên mặt phẳng chiếu).',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn số đo góc của tam giác',
            'Phép chiếu song song biến mọi hình vuông thành hình chữ nhật',
            'Phép chiếu song song luôn làm tăng độ dài đoạn thẳng',
          ],
          sol: 'Với hai đường thẳng song song không song song phương chiếu, hình chiếu song song của chúng là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn chu vi đa giác',
            'Phép chiếu song song biến hai đường thẳng cắt nhau luôn thành hai đường thẳng vuông góc',
            'Phép chiếu song song luôn giữ nguyên hình dạng của hình phẳng',
          ],
          sol: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng nằm trên cùng một đường thẳng hoặc trên hai đường thẳng song song.',
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
  t11_b28_d02_proj_prop_wrong_mc: {
    id: 't11_b28_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
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
          correct: 'Phép chiếu song song bảo toàn hình dạng của một hình',
          wrongs: [
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song không bảo toàn góc và độ dài nên nói chung làm biến đổi hình dạng của một hình (chẳng hạn tam giác đều có thể chiếu thành tam giác thường, hình tròn thành đường elip).',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tính vuông góc',
          wrongs: [
            'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
            'Phép chiếu song song biến trung điểm đoạn thẳng thành trung điểm của hình chiếu',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          ],
          sol: 'Phép chiếu song song không bảo toàn số đo góc nên không bảo toàn tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          ],
          sol: 'Hình chiếu song song của mọi hình đều nằm trong một mặt phẳng chiếu, do đó hình chiếu của hai đường thẳng chéo nhau là đồng phẳng nên không thể chéo nhau.',
        },
        {
          correct: 'Phép chiếu song song có thể biến đường tròn thành một điểm',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành đoạn thẳng',
            'Phép chiếu song song có thể biến đường tròn thành đường tròn',
            'Phép chiếu song song không làm thay đổi tỉ số độ dài hai đoạn thẳng song song',
          ],
          sol: 'Hình chiếu song song của một đường tròn là một đường tròn, đường elip hoặc một đoạn thẳng, không thể là một điểm.',
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

  // D03 (Q3): Hình chiếu song song của hình phẳng
  t11_b28_d03_proj_shape_correct_mc: {
    id: 't11_b28_d03_proj_shape_correct_mc',
    name: 'Hình chiếu song song của đường tròn, tam giác và tứ giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Nhận diện đúng dạng hình chiếu song song của đường tròn, tam giác đều, hình bình hành, hình thang.',
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
            'Hình chiếu song song của tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của một đường tròn chỉ có thể là đường elip hoặc đường tròn',
          ],
          sol: 'Hình chiếu song song của đường tròn là đường tròn (nếu mặt phẳng đường tròn song song mặt phẳng chiếu), đoạn thẳng (nếu song song phương chiếu) hoặc đường elip trong các trường hợp còn lại.',
        },
        {
          correct: 'Hình chiếu song song của một tam giác đều có thể là một tam giác bất kì hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của một tam giác đều luôn có ba góc bằng nhau',
            'Hình chiếu song song của một hình thang luôn là một hình chữ nhật',
            'Hình chiếu song song của một hình chữ nhật luôn bảo toàn góc vuông',
          ],
          sol: 'Phép chiếu song song không bảo toàn góc và độ dài nên tam giác đều có thể có hình chiếu là một tam giác bất kì (hoặc đoạn thẳng khi song song phương chiếu).',
        },
        {
          correct: 'Hình chiếu song song của một hình chữ nhật lên mặt phẳng không chứa phương chiếu là một hình bình hành hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của một hình chữ nhật luôn là một hình chữ nhật',
            'Hình chiếu song song của một đường tròn có thể là đường parabol',
            'Hình chiếu song song của một tam giác vuông luôn là tam giác vuông',
          ],
          sol: 'Các cặp cạnh đối của hình chữ nhật song song nên hình chiếu của chúng vẫn song song hoặc trùng nhau tạo thành hình bình hành hoặc đoạn thẳng.',
        },
        {
          correct: 'Hình chiếu song song của hình bình hành (nằm trong mặt phẳng không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình bình hành luôn là hình thoi',
            'Hình chiếu song song của hình thang luôn là hình bình hành',
            'Hình chiếu song song của đường tròn luôn là đường tròn',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song nên hình chiếu của hình bình hành trong trường hợp không suy biến vẫn là hình bình hành.',
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

  // D04 (Q4): Hình chiếu song song của đỉnh lên mặt đáy lăng trụ ABC.A'B'C' theo phương cạnh bên
  t11_b28_d04_prism_proj_point_base_mc: {
    id: 't11_b28_d04_prism_proj_point_base_mc',
    name: 'Hình chiếu song song của đỉnh lên mặt đáy lăng trụ theo phương cạnh bên',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Tìm hình chiếu song song của một đỉnh lăng trụ tam giác lên mặt phẳng đáy theo phương một cạnh bên.',
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
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1' },
        { A: 'M', B: 'N', C: 'P', Ap: "M'", Bp: "N'", Cp: "P'" },
      ];
      const s = SETS[setIdx];
      const base = s.A + s.B + s.C;
      const top = s.Ap + s.Bp + s.Cp;
      const CASES = [
        { pt: s.Bp, plane: base, dir: s.C + s.Cp, ans: s.B, wrongs: [s.Bp, s.Cp, s.A], edge: s.Bp + s.B },
        { pt: s.Ap, plane: base, dir: s.B + s.Bp, ans: s.A, wrongs: [s.Ap, s.Bp, s.C], edge: s.Ap + s.A },
        { pt: s.Cp, plane: base, dir: s.A + s.Ap, ans: s.C, wrongs: [s.Cp, s.Ap, s.B], edge: s.Cp + s.C },
        { pt: s.B, plane: top, dir: s.A + s.Ap, ans: s.Bp, wrongs: [s.B, s.Ap, s.Cp], edge: s.B + s.Bp },
      ];
      const c = CASES[variant];
      const correct = 'Điểm $' + c.ans + '$';
      const wrongs = c.wrongs.map((w) => 'Điểm $' + w + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Hình chiếu song song của điểm $' + c.pt + '$ lên mặt phẳng $(' + c.plane + ')$ theo phương $' + c.dir + '$ là điểm nào?',
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
          'Do các cạnh bên của hình lăng trụ song song với nhau nên đường thẳng qua $' + c.pt + '$ song song với $' + c.dir + '$ là $' + c.edge + '$.',
          'Đường thẳng $' + c.edge + '$ cắt mặt phẳng $(' + c.plane + ')$ tại điểm $' + c.ans + '$, suy ra hình chiếu là điểm $' + c.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên variant = 4', params: { setIdx: 0, variant: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { setIdx: 0, variant: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hình chiếu song song của đỉnh lên mặt bên lăng trụ ABC.DEF theo phương cạnh đáy
  t11_b28_d05_prism_proj_point_side_mc: {
    id: 't11_b28_d05_prism_proj_point_side_mc',
    name: 'Hình chiếu song song của đỉnh lên mặt bên lăng trụ ABC.DEF theo phương cạnh đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Tìm hình chiếu song song của một đỉnh lăng trụ ABC.DEF lên mặt bên theo phương một cạnh đáy.',
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
        { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F' },
        { A: 'M', B: 'N', C: 'P', D: 'Q', E: 'R', F: 'S' },
        { A: 'P', B: 'Q', C: 'R', D: 'X', E: 'Y', F: 'Z' },
      ];
      const s = SETS[setIdx];
      const prism = s.A + s.B + s.C + '.' + s.D + s.E + s.F;
      const CASES = [
        { pt: s.F, plane: s.A + s.B + s.E + s.D, dir: s.B + s.C, ans: s.E, wrongs: [s.B, s.A, s.D], edge: s.F + s.E },
        { pt: s.F, plane: s.A + s.B + s.E + s.D, dir: s.A + s.C, ans: s.D, wrongs: [s.A, s.B, s.E], edge: s.F + s.D },
        { pt: s.C, plane: s.A + s.B + s.E + s.D, dir: s.E + s.F, ans: s.B, wrongs: [s.E, s.A, s.D], edge: s.C + s.B },
        { pt: s.D, plane: s.B + s.C + s.F + s.E, dir: s.A + s.B, ans: s.E, wrongs: [s.B, s.C, s.F], edge: s.D + s.E },
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
          'Vì hai mặt đáy của hình lăng trụ có các cặp cạnh tương ứng song song nên đường thẳng đi qua $' + c.pt + '$ song song với $' + c.dir + '$ chính là cạnh $' + c.edge + '$.',
          'Giao điểm của đường thẳng $' + c.edge + '$ với mặt phẳng $(' + c.plane + ')$ là $' + c.ans + '$, nên hình chiếu là điểm $' + c.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, variant: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5', params: { setIdx: 0, variant: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Hộp chứa n quả cầu 1..n; A: chẵn, B: chia hết cho k -> tính |AB|
  t11_b28_d06_balls_even_div_inter_mc: {
    id: 't11_b28_d06_balls_even_div_inter_mc',
    name: 'Đếm số phần tử biến cố giao: số chẵn và chia hết cho k',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Hộp chứa n quả cầu đánh số từ 1 đến n. Tính số phần tử của biến cố giao vừa chẵn vừa chia hết cho k.',
    conditionSummary: 'n ∈ [18; 60], kIdx ∈ [0; 4] (k ∈ {3,5,7,9,11}), ⌊n / (2k)⌋ ≥ 1',
    paramSpecs: [
      { name: 'n', label: 'Tổng số quả cầu n', min: 18, max: 60 },
      { name: 'kIdx', label: 'Chỉ số ước k ∈ {3,5,7,9,11}', min: 0, max: 4 },
    ],
    validateCode: `
      const { n, kIdx } = params;
      if (!Number.isInteger(n) || n < 18 || n > 60) {
        return { valid: false, reason: 'n ngoài miền [18; 60]' };
      }
      if (!Number.isInteger(kIdx) || kIdx < 0 || kIdx > 4) {
        return { valid: false, reason: 'kIdx ngoài miền [0; 4]' };
      }
      const ks = [3, 5, 7, 9, 11];
      const k = ks[kIdx];
      if (Math.floor(n / (2 * k)) < 1) {
        return { valid: false, reason: 'Số phần tử giao phải ≥ 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, kIdx } = params;
      const ks = [3, 5, 7, 9, 11];
      const k = ks[kIdx];
      const step = 2 * k;
      const elems = [];
      for (let x = step; x <= n; x += step) elems.push(x);
      const cnt = elems.length;

      const candWrongs = [
        Math.floor(n / k),
        k,
        cnt + 1,
        cnt + 3,
        Math.floor(n / 2),
      ].filter((v) => v !== cnt && v >= 0);
      const correct = '$' + cnt + '$';
      const wrongs = candWrongs.map((v) => '$' + v + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (cnt + idx + 10) + '$'
      );

      return {
        stem: 'Một hộp chứa $' + n + '$ quả cầu cùng kích thước được đánh số từ $1$ đến $' + n + '$. Chọn ngẫu nhiên $1$ quả cầu từ hộp. Gọi $A$ là biến cố “Số ghi trên quả cầu được chọn là một số chẵn”, $B$ là biến cố “Số ghi trên quả cầu được chọn là số chia hết cho $' + k + '$”. Xác định số phần tử của biến cố $AB$.',
        options,
        correctIndex,
        answerSummary: String(cnt),
        solutionSteps: [
          '$AB$ là biến cố số ghi trên quả cầu được chọn vừa là một số chẵn vừa chia hết cho $' + k + '$, tức là chia hết cho $' + step + '$.',
          'Trong tập $\\{1; 2; \\dots; ' + n + '\\}$, các số chia hết cho $' + step + '$ gồm $AB = \\{' + elems.join(', ') + '\\}$.',
          'Vậy số phần tử của biến cố $AB$ là $' + cnt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 15, kIdx = 4 (n/22 < 1)', params: { n: 15, kIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (n=27, k=7)', params: { n: 27, kIdx: 2 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Hộp chứa n quả cầu 1..n; A: thuộc đoạn [a; b], B: chia hết cho d -> tính |AB|
  t11_b28_d07_balls_interval_div_inter_mc: {
    id: 't11_b28_d07_balls_interval_div_inter_mc',
    name: 'Đếm số phần tử biến cố giao: thuộc đoạn [a; b] và chia hết cho d',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Hộp chứa n quả cầu đánh số từ 1 đến n. Tính số phần tử biến cố giao: số thuộc [a; b] và chia hết cho d.',
    conditionSummary: 'n ∈ [25; 45], a ∈ [3; 10], b = n - bOff (bOff ∈ [1; 5]), d ∈ [3; 6], 3 ≤ |AB| ≤ 14',
    paramSpecs: [
      { name: 'n', label: 'Tổng số quả cầu n', min: 25, max: 45 },
      { name: 'a', label: 'Đầu mút trái đoạn a', min: 3, max: 10 },
      { name: 'bOff', label: 'Độ lệch đầu mút phải (b = n - bOff)', min: 1, max: 5 },
      { name: 'd', label: 'Số chia d', min: 3, max: 6 },
    ],
    validateCode: `
      const { n, a, bOff, d } = params;
      if (!Number.isInteger(n) || n < 25 || n > 45) return { valid: false, reason: 'n ngoài miền [25; 45]' };
      if (!Number.isInteger(a) || a < 3 || a > 10) return { valid: false, reason: 'a ngoài miền [3; 10]' };
      if (!Number.isInteger(bOff) || bOff < 1 || bOff > 5) return { valid: false, reason: 'bOff ngoài miền [1; 5]' };
      if (!Number.isInteger(d) || d < 3 || d > 6) return { valid: false, reason: 'd ngoài miền [3; 6]' };
      const b = n - bOff;
      if (b - a < 10) return { valid: false, reason: 'Đoạn [a; b] quá hẹp' };
      const cnt = Math.floor(b / d) - Math.floor((a - 1) / d);
      if (cnt < 3 || cnt > 14) return { valid: false, reason: 'Số phần tử phải trong [3; 14]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, a, bOff, d } = params;
      const b = n - bOff;
      const elems = [];
      for (let x = a; x <= b; x++) {
        if (x % d === 0) elems.push(x);
      }
      const cnt = elems.length;
      const candWrongs = [
        cnt + 1,
        cnt + 2,
        Math.floor(n / d) + cnt,
        Math.floor(n / 2),
        Math.max(1, cnt - 1),
      ].filter((v) => v !== cnt && v > 0);
      const correct = '$' + cnt + '$';
      const wrongs = candWrongs.map((v) => '$' + v + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (cnt + idx + 7) + '$'
      );

      return {
        stem: 'Một hộp chứa $' + n + '$ quả cầu cùng kích thước được đánh số từ $1$ đến $' + n + '$. Chọn ngẫu nhiên $1$ quả cầu từ hộp. Gọi $A$ là biến cố “Số ghi trên quả cầu được chọn là một số thuộc đoạn $[' + a + '; ' + b + ']$”, $B$ là biến cố “Số ghi trên quả cầu được chọn là số chia hết cho $' + d + '$”. Xác định số phần tử của biến cố $AB$.',
        options,
        correctIndex,
        answerSummary: String(cnt),
        solutionSteps: [
          '$AB$ là biến cố số ghi trên quả cầu được chọn vừa thuộc đoạn $[' + a + '; ' + b + ']$ vừa chia hết cho $' + d + '$.',
          'Liệt kê các số thỏa mãn ta được $AB = \\{' + elems.join(', ') + '\\}$.',
          'Vậy số phần tử của biến cố $AB$ là $' + cnt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 2 (ngoài miền [3;6])', params: { n: 32, a: 6, bOff: 1, d: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (n=32, [6;31], d=3)', params: { n: 32, a: 6, bOff: 1, d: 3 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Hộp chứa n quả cầu 1..n; A: chia hết cho p, B: chia hết cho q -> tính |AB|
  t11_b28_d08_balls_two_div_inter_mc: {
    id: 't11_b28_d08_balls_two_div_inter_mc',
    name: 'Đếm số phần tử biến cố giao: chia hết cho p và chia hết cho q',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Hộp chứa n quả cầu đánh số 1..n. Tính số phần tử biến cố giao vừa chia hết cho p vừa chia hết cho q.',
    conditionSummary: 'n ∈ [20; 60], p ∈ [2; 4], q ∈ {5, 7, 9}, ⌊n / lcm(p,q)⌋ ≥ 1',
    paramSpecs: [
      { name: 'n', label: 'Tổng số quả cầu n', min: 20, max: 60 },
      { name: 'p', label: 'Số chia thứ nhất p', min: 2, max: 4 },
      { name: 'qIdx', label: 'Chỉ số số chia thứ hai q ∈ {5,7,9}', min: 0, max: 2 },
    ],
    validateCode: `
      const { n, p, qIdx } = params;
      if (!Number.isInteger(n) || n < 20 || n > 60) return { valid: false, reason: 'n ngoài miền [20; 60]' };
      if (!Number.isInteger(p) || p < 2 || p > 4) return { valid: false, reason: 'p ngoài miền [2; 4]' };
      if (!Number.isInteger(qIdx) || qIdx < 0 || qIdx > 2) return { valid: false, reason: 'qIdx ngoài miền [0; 2]' };
      const q = [5, 7, 9][qIdx];
      const lcm = (p * q) / u.gcd(p, q);
      if (Math.floor(n / lcm) < 1) return { valid: false, reason: 'Số phần tử giao phải ≥ 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, p, qIdx } = params;
      const q = [5, 7, 9][qIdx];
      const lcm = (p * q) / u.gcd(p, q);
      const elems = [];
      for (let x = lcm; x <= n; x += lcm) elems.push(x);
      const cnt = elems.length;

      const nA = Math.floor(n / p);
      const nB = Math.floor(n / q);
      const candWrongs = [nA, nB, nA - nB, cnt + 3, cnt + 1].filter((v) => v !== cnt && v > 0);
      const correct = '$' + cnt + '$';
      const wrongs = candWrongs.map((v) => '$' + v + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (cnt + idx + 8) + '$'
      );

      return {
        stem: 'Một hộp chứa $' + n + '$ quả cầu cùng kích thước được đánh số từ $1$ đến $' + n + '$. Chọn ngẫu nhiên $1$ quả cầu từ hộp. Gọi $A$ là biến cố “Số ghi trên quả cầu được chọn là số chia hết cho $' + p + '$”, $B$ là biến cố “Số ghi trên quả cầu được chọn là số chia hết cho $' + q + '$”. Xác định số phần tử của biến cố $AB$.',
        options,
        correctIndex,
        answerSummary: String(cnt),
        solutionSteps: [
          '$AB$ là biến cố số ghi trên quả cầu được chọn vừa chia hết cho $' + p + '$, vừa chia hết cho $' + q + '$, tức là chia hết cho $\\mathrm{BCNN}(' + p + '; ' + q + ') = ' + lcm + '$.',
          'Các số thỏa mãn trong tập $\\{1; 2; \\dots; ' + n + '\\}$ là $AB = \\{' + elems.join(', ') + '\\}$.',
          'Vậy số phần tử của biến cố $AB$ là $' + cnt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên qIdx = 3', params: { n: 35, p: 2, qIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (n=35, p=2, q=7)', params: { n: 35, p: 2, qIdx: 1 }, expectedValid: true },
    ],
  },
};
