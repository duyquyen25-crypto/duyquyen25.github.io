import { MathTemplate } from '../types/math';

export const G11_B22_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Tìm khẳng định đúng)
  t11_b22_d01_proj_prop_correct_mc: {
    id: 't11_b22_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Nhận biết khẳng định đúng về tính chất bảo toàn của phép chiếu song song.',
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
            'Phép chiếu song song bảo toàn diện tích',
            'Phép chiếu song song bảo toàn góc trong tam giác',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau là khẳng định đúng.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và bảo toàn thứ tự của chúng',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song biến đường tròn luôn thành đường tròn',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng và thứ tự của ba điểm thẳng hàng.',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn diện tích tam giác',
            'Phép chiếu song song luôn bảo toàn chu vi đa giác',
            'Phép chiếu song song biến hai đường thẳng vuông góc luôn thành hai đường thẳng vuông góc',
          ],
          sol: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng trên hai đường thẳng song song (hoặc cùng đường thẳng).',
        },
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy (không song song phương chiếu) thành ba đường thẳng đồng quy hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn số đo góc',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
            'Phép chiếu song song biến hai đường thẳng chéo nhau luôn thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song bảo toàn giao điểm nên giữ tính đồng quy của ba đường thẳng.',
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
  t11_b22_d02_proj_prop_wrong_mc: {
    id: 't11_b22_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Nhận biết khẳng định sai về tính chất phép chiếu song song trong không gian.',
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
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          ],
          sol: 'Hình chiếu của hai đường thẳng chéo nhau cùng nằm trên mặt phẳng chiếu nên không thể là hai đường thẳng chéo nhau.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song biến trung điểm đoạn thẳng (không song song phương chiếu) thành trung điểm của hình chiếu',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song không bảo toàn góc nên không bảo toàn tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn độ dài của mọi đoạn thẳng',
          wrongs: [
            'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng trên cùng một đường thẳng',
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Hình chiếu song song của hình bình hành (mặt phẳng không chứa phương chiếu) là một hình bình hành',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn độ dài đoạn thẳng.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn diện tích hình phẳng',
          wrongs: [
            'Phép chiếu song song bảo toàn tính thẳng hàng của ba điểm',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
          ],
          sol: 'Phép chiếu song song không bảo toàn diện tích vì làm thay đổi kích thước và góc.',
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

  // D03 (Q3): Hình chiếu song song của hình bình hành / đa giác
  t11_b22_d03_proj_parallelogram_mc: {
    id: 't11_b22_d03_proj_parallelogram_mc',
    name: 'Hình chiếu song song của hình bình hành và đa giác phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Nhận biết khẳng định đúng về hình chiếu song song của hình bình hành, hình chữ nhật, hình thoi, đường tròn.',
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
          correct: 'Hình chiếu song song của hình bình hành (nằm trong mặt phẳng không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình vuông luôn là một hình vuông',
            'Hình chiếu song song của hình tròn luôn là một hình tròn',
            'Hình chiếu song song của một tam giác đều luôn là một tam giác cân',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song của các cặp cạnh đối nên hình chiếu của hình bình hành là một hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình thoi (nằm trong mặt phẳng không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình thoi luôn là một hình thoi',
            'Hình chiếu song song của hình thang vuông luôn là hình thang vuông',
            'Hình chiếu song song của tam giác vuông luôn là tam giác vuông',
          ],
          sol: 'Vì phép chiếu song song không bảo toàn độ dài hai cạnh kề và không bảo toàn góc vuông nên hình chiếu của hình thoi là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của đường tròn lên mặt phẳng bất kì có thể là một đường elip hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của đường tròn luôn là một đường tròn',
            'Hình chiếu song song của hình vuông luôn là một hình chữ nhật',
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ số hai kích thước',
          ],
          sol: 'Tùy phương chiếu và mặt phẳng chiếu, hình chiếu song song của đường tròn là đường tròn, đường elip hoặc đoạn thẳng.',
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

  // D04 (Q4): Hình chiếu song song của đỉnh trên lên mặt đáy dưới trong lăng trụ ABC.DEF
  t11_b22_d04_prism_proj_base_mc: {
    id: 't11_b22_d04_prism_proj_base_mc',
    name: 'Hình chiếu song song của đỉnh lên mặt đáy lăng trụ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Tìm hình chiếu song song của một đỉnh đáy trên lên mặt đáy dưới theo phương cạnh bên lăng trụ.',
    conditionSummary: 'vIdx ∈ [0; 2], setIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Đỉnh cần chiếu (0: D/A1, 1: E/B1, 2: F/C1)', min: 0, max: 2 },
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
        { bots: ['A', 'B', 'C'], tops: ['D', 'E', 'F'] },
        { bots: ['A', 'B', 'C'], tops: ["A'", "B'", "C'"] },
        { bots: ['M', 'N', 'P'], tops: ['M_1', 'N_1', 'P_1'] },
      ];
      const s = SETS[setIdx];
      const base = s.bots.join('');
      const top = s.tops.join('');
      const dirIdx = (vIdx + 2) % 3;
      const pt = s.tops[vIdx];
      const img = s.bots[vIdx];
      const dirLine = s.bots[dirIdx] + s.tops[dirIdx];

      const correct = 'Điểm $' + img + '$';
      const wrongs = [
        'Điểm $' + s.tops[(vIdx + 1) % 3] + '$',
        'Điểm $' + pt + '$',
        'Điểm $' + s.bots[(vIdx + 2) % 3] + '$',
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
          'Vì $' + pt + img + ' \\parallel ' + dirLine + '$ và $' + img + ' \\in (' + base + ')$ nên hình chiếu song song của điểm $' + pt + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + dirLine + '$ là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { vIdx: 3, setIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (E -> B)', params: { vIdx: 1, setIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hình chiếu song song của đỉnh A' lên mặt bên (BCC'B') theo phương AC
  t11_b22_d05_prism_proj_lateral_mc: {
    id: 't11_b22_d05_prism_proj_lateral_mc',
    name: 'Hình chiếu song song của đỉnh lên mặt bên lăng trụ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Tìm hình chiếu song song của đỉnh A hoặc A\' lên mặt bên (BCC\'B\') theo phương cạnh đáy AC hoặc AB.',
    conditionSummary: 'mode ∈ [0; 2], setIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể điểm và phương chiếu (0..2)', min: 0, max: 2 },
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { mode, setIdx } = params;
      if (mode < 0 || mode > 2 || setIdx < 0 || setIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode, setIdx } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'D', Bp: 'E', Cp: 'F' },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1' },
      ];
      const s = SETS[setIdx];
      const base = s.A + s.B + s.C;
      const top = s.Ap + s.Bp + s.Cp;
      const latFace = s.B + s.C + s.Cp + s.Bp;

      const MODES = [
        { pt: s.Ap, dir: s.A + s.C, dirNote: s.Ap + s.Cp + ' \\parallel ' + s.A + s.C, ans: s.Cp, w1: s.A, w2: s.B, w3: s.C },
        { pt: s.Ap, dir: s.A + s.B, dirNote: s.Ap + s.Bp + ' \\parallel ' + s.A + s.B, ans: s.Bp, w1: s.A, w2: s.B, w3: s.C },
        { pt: s.A, dir: s.A + s.C, dirNote: s.A + s.C + ' \\text{ cắt } (' + latFace + ') \\text{ tại } ' + s.C, ans: s.C, w1: s.Bp, w2: s.Cp, w3: s.Ap },
      ];
      const m = MODES[mode];
      const correct = 'Điểm $' + m.ans + '$';
      const wrongs = [
        'Điểm $' + m.w1 + '$',
        'Điểm $' + m.w2 + '$',
        'Điểm $' + m.w3 + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Hình chiếu song song của điểm $' + m.pt + '$ lên mặt phẳng $(' + latFace + ')$ theo phương $' + m.dir + '$ là điểm nào?',
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
          'Vì $' + m.dirNote + '$ và $' + m.ans + ' \\in (' + latFace + ')$ nên hình chiếu song song của điểm $' + m.pt + '$ là điểm $' + m.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3, setIdx: 0 }, expectedValid: false },
      { label: "Mẫu chuẩn Q5 (A' -> C')", params: { mode: 0, setIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Góc giữa hai đường thẳng trong hình lập phương
  t11_b22_d06_cube_lines_angle_mc: {
    id: 't11_b22_d06_cube_lines_angle_mc',
    name: 'Góc giữa hai đường thẳng trong hình lập phương',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Tính góc giữa hai đường thẳng chéo nhau là đường chéo các mặt hoặc cạnh trong hình lập phương có 6 mặt là hình vuông.',
    conditionSummary: 'mode ∈ [0; 4], setIdx ∈ [0; 1]',
    paramSpecs: [
      { name: 'mode', label: 'Cặp đường thẳng (0..4)', min: 0, max: 4 },
      { name: 'setIdx', label: 'Ký hiệu đỉnh trên (0: A₁B₁C₁D₁, 1: A\'B\'C\'D\')', min: 0, max: 1 },
    ],
    validateCode: `
      const { mode, setIdx } = params;
      if (mode < 0 || mode > 4 || (setIdx !== 0 && setIdx !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode, setIdx } = params;
      const top = setIdx === 1 ? "A'B'C'D'" : 'A_1B_1C_1D_1';
      const Ap = setIdx === 1 ? "A'" : 'A_1';
      const Bp = setIdx === 1 ? "B'" : 'B_1';
      const Cp = setIdx === 1 ? "C'" : 'C_1';
      const Dp = setIdx === 1 ? "D'" : 'D_1';

      const MODES = [
        {
          l1: Ap + 'D',
          l2: 'A' + Bp,
          deg: 60,
          sol: 'Vì $A' + Bp + ' \\parallel D' + Cp + '$ nên $(' + Ap + 'D, A' + Bp + ') = (' + Ap + 'D, D' + Cp + ')$. Tam giác $' + Ap + 'D' + Cp + '$ đều nên $(' + Ap + 'D, A' + Bp + ') = 60^\\circ$.',
        },
        {
          l1: 'AC',
          l2: Bp + 'C',
          deg: 60,
          sol: 'Vì $' + Bp + 'C \\parallel ' + Ap + 'D$ nên $(AC, ' + Bp + 'C) = (AC, ' + Ap + 'D)$. Tam giác $' + Ap + 'CD$ đều nên góc bằng $60^\\circ$.',
        },
        {
          l1: Ap + Cp,
          l2: 'BD',
          deg: 90,
          sol: 'Vì $' + Ap + Cp + ' \\parallel AC$ mà $AC \\perp BD$ (hai đường chéo hình vuông đáy) nên $(' + Ap + Cp + ', BD) = 90^\\circ$.',
        },
        {
          l1: Ap + 'B',
          l2: Cp + 'D',
          deg: 90,
          sol: 'Vì $' + Cp + 'D \\parallel ' + Bp + 'A$ mà $' + Ap + 'B \\perp ' + Bp + 'A$ (hai đường chéo mặt vuông) nên $(' + Ap + 'B, ' + Cp + 'D) = 90^\\circ$.',
        },
        {
          l1: Ap + 'D',
          l2: 'B' + Bp,
          deg: 45,
          sol: 'Vì $B' + Bp + ' \\parallel A' + Ap + '$ nên $(' + Ap + 'D, B' + Bp + ') = (' + Ap + 'D, A' + Ap + ') = \\widehat{' + Ap + 'AD} = 45^\\circ$.',
        },
      ];
      const item = MODES[mode];
      const correct = '$' + item.deg + '^\\circ$';
      const candidatePool = ['$90^\\circ$', '$60^\\circ$', '$45^\\circ$', '$37^\\circ$', '$82^\\circ$', '$30^\\circ$'].filter((c) => c !== correct);
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, candidatePool, rng);

      return {
        stem: 'Cho hình lăng trụ $ABCD.' + top + '$ có $6$ mặt đều là hình vuông. Tính góc giữa hai đường thẳng $' + item.l1 + '$ và $' + item.l2 + '$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: setIdx === 1 ? 1 : 2 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 5', params: { mode: 5, setIdx: 1 }, expectedValid: false },
      { label: "Mẫu chuẩn Q6 ((A'D, AB') = 60°)", params: { mode: 0, setIdx: 1 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Góc giữa SC và AB trong hình chóp S.ABCD (SD ⊥ đáy)
  t11_b22_d07_pyramid_lines_angle_mc: {
    id: 't11_b22_d07_pyramid_lines_angle_mc',
    name: 'Tính góc giữa cạnh bên và cạnh đáy trong hình chóp có cạnh bên vuông góc đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Cho S.ABCD có đáy hình chữ nhật, SD ⊥ DA, SD ⊥ DC. Tính góc giữa SC và AB.',
    conditionSummary: 'p ∈ [4; 9], d ∈ {2, 3, 5, 6, 7}, dc ∈ [6; 13], làm tròn đến 2 chữ số thập phân',
    paramSpecs: [
      { name: 'p', label: 'Độ dài DA = p·a', min: 4, max: 9 },
      { name: 'd', label: 'Hệ số SD = √d·a (d không chính phương)', min: 2, max: 7 },
      { name: 'dc', label: 'Độ dài DC = dc·a', min: 6, max: 13 },
    ],
    validateCode: `
      const { p, d, dc } = params;
      if (p < 4 || p > 9 || d < 2 || d > 7 || d === 4 || dc < 6 || dc > 13) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc d chính phương' };
      }
      const c = d + dc * dc;
      const deg = (Math.asin(Math.sqrt(d / c)) * 180) / Math.PI;
      const frac = deg * 100 - Math.floor(deg * 100);
      if (Math.abs(frac - 0.5) < 0.025) return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, d, dc } = params;
      const c = d + dc * dc;
      const prod = d * c;
      const deg = (Math.asin(Math.sqrt(d / c)) * 180) / Math.PI;
      const degRound = Math.round(deg * 100) / 100;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const correct = '$' + fmt2(degRound) + '^\\circ$';
      const wrongs = [
        '$' + fmt2(degRound + 9.5) + '^\\circ$',
        '$' + fmt2(degRound + 16.8) + '^\\circ$',
        '$' + fmt2(degRound + 3.5) + '^\\circ$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $DA = ' + p + 'a,\\; SC = \\sqrt{' + c + '}a,\\; SD = \\sqrt{' + d + '}a$. Biết $SD \\perp DA,\\; SD \\perp DC$. Tính góc giữa hai đường thẳng $SC$ và $AB$ (làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $AB \\parallel DC$ nên $(SC, AB) = (SC, DC) = \\widehat{SCD}$ (do $\\triangle SDC$ vuông tại $D$).',
          'Ta có $\\sin\\widehat{SCD} = \\dfrac{SD}{SC} = \\dfrac{\\sqrt{' + d + '}}{\\sqrt{' + c + '}} = \\dfrac{\\sqrt{' + prod + '}}{' + c + '}$.',
          'Suy ra $(SC, AB) = \\widehat{SCD} \\approx ' + fmt2(degRound) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 4 (chính phương)', params: { p: 7, d: 4, dc: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (7,33°)', params: { p: 7, d: 2, dc: 11 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Nhận biết cặp đường thẳng vuông góc qua đường trung bình trong hình chóp SC ⊥ đáy
  t11_b22_d08_pyramid_midline_perp_mc: {
    id: 't11_b22_d08_pyramid_midline_perp_mc',
    name: 'Nhận biết cặp đường thẳng vuông góc qua đường trung bình hình chóp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy vuông có SC ⊥ CD, SC ⊥ CB và trung điểm I, N của hai cạnh bên. Tìm cặp đường thẳng vuông góc.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Cặp trung điểm (0: SA & SB, 1: SA & SD, 2: SB & SD)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          e1: 'SA',
          e2: 'SB',
          parallelLine: 'AB',
          sol: 'Vì $IN$ là đường trung bình của $\\triangle SAB$ nên $IN \\parallel AB \\parallel CD$. Do $SC \\perp CD$ nên $(SC, IN) = (SC, CD) = 90^\\circ$, hay $SC \\perp IN$.',
        },
        {
          e1: 'SA',
          e2: 'SD',
          parallelLine: 'AD',
          sol: 'Vì $IN$ là đường trung bình của $\\triangle SAD$ nên $IN \\parallel AD \\parallel CB$. Do $SC \\perp CB$ nên $(SC, IN) = (SC, CB) = 90^\\circ$, hay $SC \\perp IN$.',
        },
        {
          e1: 'SB',
          e2: 'SD',
          parallelLine: 'BD',
          sol: 'Vì $SC \\perp CD$ và $SC \\perp CB$ nên $SC \\perp (ABCD)$, suy ra $SC \\perp BD$. Mà $IN \\parallel BD$ nên $SC \\perp IN$.',
        },
      ];
      const m = MODES[mode];
      const correct = '$SC$ và $IN$';
      const wrongs = [
        '$SD$ và $CD$',
        '$SC$ và $SA$',
        '$CD$ và $SA$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $SC \\perp CD,\\; SC \\perp CB$. Gọi $I, N$ lần lượt là trung điểm của các cạnh $' + m.e1 + ',\\; ' + m.e2 + '$. Cặp đường thẳng nào sau đây vuông góc với nhau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [m.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (SC và IN)', params: { mode: 0 }, expectedValid: true },
    ],
  },
};
