import { MathTemplate } from '../types/math';

export const G11_B24_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Khẳng định đúng)
  t11_b24_d01_proj_prop_correct_mc: {
    id: 't11_b24_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
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
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng bất kì',
            'Phép chiếu song song biến hai đường thẳng song song luôn thành hai đường thẳng song song',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
          ],
          sol: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng (còn hai đường thẳng song song có thể chiếu thành song song hoặc trùng nhau, và tỉ số độ dài chỉ bảo toàn trên hai đường thẳng song song hoặc cùng đường thẳng).',
        },
        {
          correct: 'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song bảo toàn góc trong không gian',
            'Phép chiếu song song bảo toàn diện tích của hình phẳng',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng và thứ tự của ba điểm thẳng hàng.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song bảo toàn hình dạng của một hình',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song (không song song phương chiếu) là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn chu vi tam giác',
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song biến mọi đường tròn thành đường tròn',
          ],
          sol: 'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng nằm trên cùng một đường thẳng hoặc trên hai đường thẳng song song.',
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

  // D02 (Q2): Tính chất phép chiếu song song (Khẳng định sai)
  t11_b24_d02_proj_prop_wrong_mc: {
    id: 't11_b24_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Nhận biết khẳng định sai về tính chất của phép chiếu song song.',
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
          correct: 'Phép chiếu song song có thể biến đường tròn thành một điểm',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          ],
          sol: 'Hình chiếu song song của một đường tròn chỉ có thể là đường tròn, đường elip hoặc một đoạn thẳng, không bao giờ là một điểm; do đó khẳng định này sai.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
          wrongs: [
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Phép chiếu song song biến trung điểm đoạn thẳng (không song song phương chiếu) thành trung điểm của hình chiếu',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn số đo góc nên không bảo toàn tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn diện tích của tam giác',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng trên cùng một đường thẳng',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn độ dài và diện tích.',
        },
        {
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Hình chiếu song song của hình bình hành (mặt phẳng không chứa phương chiếu) là một hình bình hành',
          ],
          sol: 'Hình chiếu song song của các đường thẳng đều nằm trên cùng một mặt phẳng chiếu nên không thể chéo nhau.',
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

  // D03 (Q3): Hình chiếu song song của tam giác, hình chữ nhật, hình thang
  t11_b24_d03_proj_polygon_mc: {
    id: 't11_b24_d03_proj_polygon_mc',
    name: 'Hình chiếu song song của tam giác và tứ giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Nhận biết hình chiếu song song của tam giác, hình chữ nhật, hình thang (trên mặt phẳng không chứa phương chiếu).',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể câu hỏi (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của một tam giác (mặt phẳng chứa nó không song song phương chiếu) là một tam giác',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
            'Hình chiếu song song của hình thang luôn là một hình chữ nhật',
            'Hình chiếu song song của tam giác vuông luôn là một tam giác vuông',
          ],
          sol: 'Khi mặt phẳng chứa tam giác không song song với phương chiếu, hình chiếu song song của một tam giác luôn là một tam giác.',
        },
        {
          correct: 'Hình chiếu song song của một hình bình hành (mặt phẳng chứa nó không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của một hình vuông luôn là một hình vuông',
            'Hình chiếu song song của một tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của một hình thoi luôn là một hình thoi',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song nên hình chiếu của hình bình hành (khi không suy biến) là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của một hình thang (mặt phẳng chứa nó không song song phương chiếu) là một hình thang',
          wrongs: [
            'Hình chiếu song song của một hình thang cân luôn là một hình thang cân',
            'Hình chiếu song song của một hình chữ nhật luôn là một hình chữ nhật',
            'Hình chiếu song song của một đường tròn có thể là một điểm',
          ],
          sol: 'Do tính song song của hai cạnh đáy được bảo toàn nên hình chiếu của hình thang (không suy biến) vẫn là một hình thang.',
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

  // D04 (Q4): Chiếu đỉnh C' lên (ABB'A') theo phương AC trong lăng trụ ABC.A'B'C'
  t11_b24_d04_prism_proj_cprime_mc: {
    id: 't11_b24_d04_prism_proj_cprime_mc',
    name: 'Hình chiếu song song đỉnh C\' lên mặt bên lăng trụ theo phương cạnh đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Tìm hình chiếu song song của điểm C\' lên mặt phẳng (ABB\'A\') theo phương AC hoặc BC.',
    conditionSummary: 'setIdx ∈ [0; 1], caseIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0: ABC.A\'B\'C\', 1: ABC.A₁B₁C₁)', min: 0, max: 1 },
      { name: 'caseIdx', label: 'Hướng chiếu & mặt bên (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 1 || params.caseIdx < 0 || params.caseIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, caseIdx } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1' },
      ];
      const s = SETS[setIdx];
      const CASES = [
        { pt: s.Cp, plane: s.A + s.B + s.Bp + s.Ap, dir: s.A + s.C, ans: s.Ap, w1: s.Bp, w2: s.A, w3: s.Cp, topEdge: s.Cp + s.Ap },
        { pt: s.Cp, plane: s.A + s.B + s.Bp + s.Ap, dir: s.B + s.C, ans: s.Bp, w1: s.Ap, w2: s.B, w3: s.Cp, topEdge: s.Cp + s.Bp },
        { pt: s.C, plane: s.A + s.B + s.Bp + s.Ap, dir: s.A + s.C, ans: s.A, w1: s.B, w2: s.Ap, w3: s.Bp, topEdge: s.C + s.A },
      ];
      const item = CASES[caseIdx];
      const correct = 'Điểm $' + item.ans + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình lăng trụ $' + s.A + s.B + s.C + '.' + s.Ap + s.Bp + s.Cp + '$. Hình chiếu song song của điểm $' + item.pt + '$ lên mặt phẳng $(' + item.plane + ')$ theo phương $' + item.dir + '$ là điểm nào?',
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
          'Vì $' + item.topEdge + ' \\parallel ' + item.dir + '$ (hoặc nằm trên $' + item.dir + '$) và $' + item.ans + ' \\in (' + item.plane + ')$ nên hình chiếu là điểm $' + item.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx = 3', params: { setIdx: 0, caseIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (A\')', params: { setIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu đỉnh B' lên (ACC'A') theo phương AB trong lăng trụ ABC.A'B'C'
  t11_b24_d05_prism_proj_bprime_mc: {
    id: 't11_b24_d05_prism_proj_bprime_mc',
    name: 'Hình chiếu song song đỉnh B\' lên mặt bên (ACC\'A\') theo phương AB',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Tìm hình chiếu song song của đỉnh B\' hoặc A\' lên mặt bên đối diện theo phương cạnh đáy.',
    conditionSummary: 'setIdx ∈ [0; 1], caseIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0: ABC.A\'B\'C\', 1: MNP.M\'N\'P\')', min: 0, max: 1 },
      { name: 'caseIdx', label: 'Cặp điểm chiếu & mặt bên (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 1 || params.caseIdx < 0 || params.caseIdx > 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, caseIdx } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'" },
        { A: 'M', B: 'N', C: 'P', Ap: "M'", Bp: "N'", Cp: "P'" },
      ];
      const s = SETS[setIdx];
      const CASES = [
        { pt: s.Bp, plane: s.A + s.C + s.Cp + s.Ap, dir: s.A + s.B, ans: s.Ap, w1: s.C, w2: s.A, w3: s.Bp, topEdge: s.Bp + s.Ap },
        { pt: s.Bp, plane: s.A + s.C + s.Cp + s.Ap, dir: s.B + s.C, ans: s.Cp, w1: s.Ap, w2: s.C, w3: s.Bp, topEdge: s.Bp + s.Cp },
        { pt: s.Ap, plane: s.B + s.C + s.Cp + s.Bp, dir: s.A + s.B, ans: s.Bp, w1: s.Cp, w2: s.B, w3: s.Ap, topEdge: s.Ap + s.Bp },
        { pt: s.Ap, plane: s.B + s.C + s.Cp + s.Bp, dir: s.A + s.C, ans: s.Cp, w1: s.Bp, w2: s.C, w3: s.Ap, topEdge: s.Ap + s.Cp },
      ];
      const item = CASES[caseIdx];
      const correct = 'Điểm $' + item.ans + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình lăng trụ $' + s.A + s.B + s.C + '.' + s.Ap + s.Bp + s.Cp + '$. Hình chiếu song song của điểm $' + item.pt + '$ lên mặt phẳng $(' + item.plane + ')$ theo phương $' + item.dir + '$ là điểm nào?',
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
          'Vì $' + item.topEdge + ' \\parallel ' + item.dir + '$ và $' + item.ans + ' \\in (' + item.plane + ')$ nên hình chiếu là điểm $' + item.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx = 4', params: { setIdx: 0, caseIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (A\')', params: { setIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Xác định góc giữa cạnh bên và mặt đáy (chóp đáy vuông SA ⊥ đáy)
  t11_b24_d06_angle_edge_base_square_mc: {
    id: 't11_b24_d06_angle_edge_base_square_mc',
    name: 'Xác định góc giữa cạnh bên và mặt phẳng đáy (Chóp đáy vuông)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Xác định góc giữa cạnh bên SB (hoặc SC, SD) và mặt phẳng đáy (ABCD) khi SA ⊥ (ABCD).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Cạnh bên xét góc (0: SB, 1: SC, 2: SD, 3: SB với SD⊥)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'A', edge: 'SB', proj: 'AB', ans: 'SBA', w1: 'SBD', w2: 'SCB', w3: 'SAB',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'A', edge: 'SC', proj: 'AC', ans: 'SCA', w1: 'SCB', w2: 'SCD', w3: 'SAC',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'A', edge: 'SD', proj: 'AD', ans: 'SDA', w1: 'SDB', w2: 'SDC', w3: 'SAD',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'D', edge: 'SB', proj: 'DB', ans: 'SBD', w1: 'SBA', w2: 'SBC', w3: 'SDB',
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C',
        },
      ];
      const item = CASES[rot];
      const footPt = item.altV;
      const otherPt = item.edge.slice(1);
      const correct = '$\\widehat{' + item.ans + '}$';
      const wrongs = ['$\\widehat{' + item.w1 + '}$', '$\\widehat{' + item.w2 + '}$', '$\\widehat{' + item.w3 + '}$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $S' + footPt + ' \\perp (ABCD)$. Góc giữa đường thẳng $' + item.edge + '$ và mặt phẳng $(ABCD)$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điểm $S$ có hình chiếu trên $(ABCD)$ là $' + footPt + '$, điểm $' + otherPt + '$ có hình chiếu trên $(ABCD)$ là $' + otherPt + '$.',
          'Do đó $' + item.edge + '$ có hình chiếu trên $(ABCD)$ là $' + item.proj + '$.',
          'Suy ra $\\left(' + item.edge + ', (ABCD)\\right) = \\left(' + item.edge + ', ' + item.proj + '\\right) = \\widehat{' + item.ans + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (∠SBA)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Góc giữa đường chéo AC và mặt bên (SAB) trong chóp đáy vuông
  t11_b24_d07_angle_diag_side_square_mc: {
    id: 't11_b24_d07_angle_diag_side_square_mc',
    name: 'Xác định góc giữa đường chéo đáy và mặt bên (Chóp đáy vuông)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Xác định góc giữa đường chéo đáy AC (hoặc BD) và mặt bên chứa đường cao (SAB) hoặc (SAD).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Đường chéo & mặt bên (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          line: 'AC', plane: 'SAB', perpFrom: 'C', foot: 'B', oppEdge: 'AB', proj: 'AB',
          ans: 'CAB', w1: 'CSA', w2: 'SCB', w3: 'SCA',
        },
        {
          line: 'AC', plane: 'SAD', perpFrom: 'C', foot: 'D', oppEdge: 'AD', proj: 'AD',
          ans: 'CAD', w1: 'CSA', w2: 'SCD', w3: 'SCA',
        },
        {
          line: 'BD', plane: 'SAB', perpFrom: 'D', foot: 'A', oppEdge: 'AB', proj: 'BA',
          ans: 'DBA', w1: 'SDB', w2: 'DSA', w3: 'BDA',
        },
        {
          line: 'BD', plane: 'SAD', perpFrom: 'B', foot: 'A', oppEdge: 'AD', proj: 'DA',
          ans: 'BDA', w1: 'SBD', w2: 'BSA', w3: 'DBA',
        },
      ];
      const item = CASES[rot];
      const correct = '$\\widehat{' + item.ans + '}$';
      const wrongs = ['$\\widehat{' + item.w1 + '}$', '$\\widehat{' + item.w2 + '}$', '$\\widehat{' + item.w3 + '}$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $SA \\perp (ABCD)$. Góc giữa đường thẳng $' + item.line + '$ và mặt phẳng $(' + item.plane + ')$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + item.perpFrom + item.foot + ' \\perp ' + item.oppEdge + '$ và $' + item.perpFrom + item.foot + ' \\perp SA \\Rightarrow ' + item.perpFrom + item.foot + ' \\perp (' + item.plane + ')$.',
          'Do đó $' + item.line + '$ có hình chiếu trên $(' + item.plane + ')$ là $' + item.proj + '$.',
          'Suy ra $\\left(' + item.line + ', (' + item.plane + ')\\right) = \\left(' + item.line + ', ' + item.proj + '\\right) = \\widehat{' + item.ans + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (∠CAB)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Góc giữa cạnh bên và mặt bên chứa đường cao (Chóp đáy chữ nhật)
  t11_b24_d08_angle_edge_side_rect_mc: {
    id: 't11_b24_d08_angle_edge_side_rect_mc',
    name: 'Xác định góc giữa cạnh bên và mặt bên chứa đường cao (Đáy chữ nhật)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Xác định góc giữa cạnh bên SB (hoặc SD, SC) và mặt bên (SAD) hoặc (SAB) khi đáy là hình chữ nhật, SA ⊥ (ABCD).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Cạnh bên & mặt bên (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          line: 'SB', plane: 'SAD', perp: 'BA', baseEdge: 'AD', proj: 'SA',
          ans: 'BSA', w1: 'SBA', w2: 'BSD', w3: 'SBD',
        },
        {
          line: 'SD', plane: 'SAB', perp: 'DA', baseEdge: 'AB', proj: 'SA',
          ans: 'DSA', w1: 'SDA', w2: 'DSB', w3: 'SDB',
        },
        {
          line: 'SC', plane: 'SAD', perp: 'CD', baseEdge: 'AD', proj: 'SD',
          ans: 'CSD', w1: 'SCD', w2: 'CSA', w3: 'SCA',
        },
        {
          line: 'SC', plane: 'SAB', perp: 'CB', baseEdge: 'AB', proj: 'SB',
          ans: 'CSB', w1: 'SCB', w2: 'CSA', w3: 'SCA',
        },
      ];
      const item = CASES[rot];
      const correct = '$\\widehat{' + item.ans + '}$';
      const wrongs = ['$\\widehat{' + item.w1 + '}$', '$\\widehat{' + item.w2 + '}$', '$\\widehat{' + item.w3 + '}$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$. Góc giữa đường thẳng $' + item.line + '$ và mặt phẳng $(' + item.plane + ')$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + item.perp + ' \\perp ' + item.baseEdge + '$ và $' + item.perp + ' \\perp SA \\Rightarrow ' + item.perp + ' \\perp (' + item.plane + ')$.',
          'Do đó $' + item.line + '$ có hình chiếu trên $(' + item.plane + ')$ là $' + item.proj + '$.',
          'Suy ra $\\left(' + item.line + ', (' + item.plane + ')\\right) = \\left(' + item.line + ', ' + item.proj + '\\right) = \\widehat{' + item.ans + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (∠BSA)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Góc giữa cạnh bên và mặt đáy (Chóp tam giác vuông)
  t11_b24_d09_angle_edge_base_tri_mc: {
    id: 't11_b24_d09_angle_edge_base_tri_mc',
    name: 'Xác định góc giữa cạnh bên và mặt đáy (Chóp tam giác)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Xác định góc giữa cạnh bên SB (hoặc SC) và mặt đáy (ABC) trong hình chóp tam giác có SA ⊥ (ABC).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Biến thể đỉnh đáy (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          rightAt: 'C', altV: 'A', edge: 'SB', proj: 'AB', ans: 'SBA', w1: 'SBC', w2: 'BSA', w3: 'BCA',
          vL: 'A', vF: 'B', vR: 'C',
        },
        {
          rightAt: 'B', altV: 'A', edge: 'SC', proj: 'AC', ans: 'SCA', w1: 'SCB', w2: 'CSA', w3: 'BCA',
          vL: 'A', vF: 'B', vR: 'C',
        },
        {
          rightAt: 'C', altV: 'B', edge: 'SA', proj: 'BA', ans: 'SAB', w1: 'SAC', w2: 'ASB', w3: 'ACB',
          vL: 'B', vF: 'C', vR: 'A',
        },
        {
          rightAt: 'A', altV: 'C', edge: 'SB', proj: 'CB', ans: 'SBC', w1: 'SBA', w2: 'BSC', w3: 'BAC',
          vL: 'C', vF: 'A', vR: 'B',
        },
      ];
      const item = CASES[rot];
      const correct = '$\\widehat{' + item.ans + '}$';
      const wrongs = ['$\\widehat{' + item.w1 + '}$', '$\\widehat{' + item.w2 + '}$', '$\\widehat{' + item.w3 + '}$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $' + item.rightAt + '$, $S' + item.altV + ' \\perp (ABC)$. Góc giữa đường thẳng $' + item.edge + '$ và mặt phẳng $(ABC)$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $S' + item.altV + ' \\perp (ABC)$. Do đó $' + item.edge + '$ có hình chiếu trên $(ABC)$ là $' + item.proj + '$.',
          'Suy ra $\\left(' + item.edge + ', (ABC)\\right) = \\left(' + item.edge + ', ' + item.proj + '\\right) = \\widehat{' + item.ans + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (∠SBA)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Góc giữa cạnh bên và mặt bên vuông góc (Chóp tam giác vuông)
  t11_b24_d10_angle_edge_side_tri_mc: {
    id: 't11_b24_d10_angle_edge_side_tri_mc',
    name: 'Xác định góc giữa cạnh bên và mặt bên (Chóp tam giác vuông)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Xác định góc giữa cạnh bên SC (hoặc SB) và mặt bên (SAB) trong chóp S.ABC có đáy vuông tại B và SA ⊥ (ABC).',
    conditionSummary: 'rot ∈ [0; 2]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh góc vuông & đường cao (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 2) return { valid: false, reason: 'rot ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          rightAt: 'B', altV: 'A', edge: 'SC', plane: 'SAB', perp: 'CB', baseEdge: 'AB', proj: 'SB',
          ans: 'CSB', w1: 'BCA', w2: 'SCB', w3: 'SCA', vL: 'A', vF: 'B', vR: 'C',
        },
        {
          rightAt: 'C', altV: 'A', edge: 'SB', plane: 'SAC', perp: 'BC', baseEdge: 'AC', proj: 'SC',
          ans: 'BSC', w1: 'CBA', w2: 'SBC', w3: 'SBA', vL: 'A', vF: 'B', vR: 'C',
        },
        {
          rightAt: 'A', altV: 'B', edge: 'SC', plane: 'SAB', perp: 'CA', baseEdge: 'AB', proj: 'SA',
          ans: 'CSA', w1: 'ACB', w2: 'SCA', w3: 'SCB', vL: 'B', vF: 'C', vR: 'A',
        },
      ];
      const item = CASES[rot];
      const correct = '$\\widehat{' + item.ans + '}$';
      const wrongs = ['$\\widehat{' + item.w1 + '}$', '$\\widehat{' + item.w2 + '}$', '$\\widehat{' + item.w3 + '}$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $' + item.rightAt + '$, $S' + item.altV + ' \\perp (ABC)$. Góc giữa đường thẳng $' + item.edge + '$ và mặt phẳng $(' + item.plane + ')$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + item.perp + ' \\perp ' + item.baseEdge + '$ và $' + item.perp + ' \\perp S' + item.altV + ' \\Rightarrow ' + item.perp + ' \\perp (' + item.plane + ')$.',
          'Do đó $' + item.edge + '$ có hình chiếu trên $(' + item.plane + ')$ là $' + item.proj + '$.',
          'Suy ra $\\left(' + item.edge + ', (' + item.plane + ')\\right) = \\left(' + item.edge + ', ' + item.proj + '\\right) = \\widehat{' + item.ans + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 3', params: { rot: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (∠CSB)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Tính số đo góc giữa SD và (ABCD) khi biết cạnh đáy và SA
  t11_b24_d11_calc_angle_sd_base_mc: {
    id: 't11_b24_d11_calc_angle_sd_base_mc',
    name: 'Tính số đo góc giữa cạnh bên SD và mặt đáy (ABCD)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy hình vuông cạnh u·a, SA ⊥ (ABCD), SA = √k·a. Tính góc giữa SD và (ABCD).',
    conditionSummary: 'u ∈ [1; 4], k ∈ [10; 55], tránh ranh giới làm tròn .xx5',
    paramSpecs: [
      { name: 'u', label: 'Hệ số cạnh đáy AD = u·a', min: 1, max: 4 },
      { name: 'k', label: 'Biểu thức dưới căn SA = √k·a', min: 10, max: 55 },
    ],
    validateCode: `
      const { u: side, k } = params;
      if (side < 1 || side > 4 || k < 10 || k > 55) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const deg = Math.atan(Math.sqrt(k) / side) * 180 / Math.PI;
      const frac = (deg * 100) - Math.floor(deg * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: side, k } = params;
      const simplifyRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1
          ? String(out)
          : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const saTex = simplifyRad(k);
      const degExact = Math.atan(Math.sqrt(k) / side) * 180 / Math.PI;
      const deg = Math.round(degExact * 100) / 100;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');

      const candidates = [
        Math.max(5, Math.round((deg - 4.55) * 100) / 100),
        Math.max(4, Math.round((deg - 9.10) * 100) / 100),
        deg + 4.20 < 89.2 ? Math.round((deg + 4.20) * 100) / 100 : Math.max(6, Math.round((deg - 12.60) * 100) / 100),
        Math.max(8, Math.round((90 - deg) * 100) / 100),
      ];
      const seen = new Set([fmt2(deg)]);
      const wrongs = [];
      for (const c of candidates) {
        const s = fmt2(c);
        if (!seen.has(s) && wrongs.length < 3) {
          seen.add(s);
          wrongs.push('$' + s + '^\\circ$');
        }
      }
      let extra = 1.5;
      while (wrongs.length < 3) {
        const s = fmt2(Math.max(3, deg - extra));
        if (!seen.has(s)) {
          seen.add(s);
          wrongs.push('$' + s + '^\\circ$');
        }
        extra += 2.3;
      }

      const correct = '$' + fmt2(deg) + '^\\circ$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      const sideDen = side === 1 ? 'a' : side + 'a';
      const tanTex = side === 1 ? saTex : '\\dfrac{' + saTex + '}{' + side + '}';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh bằng $' + side + 'a$, $SA \\perp (ABCD)$, $SA = ' + saTex + 'a$. Số đo góc giữa đường thẳng $SD$ và mặt phẳng $(ABCD)$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điểm $S$ có hình chiếu trên $(ABCD)$ là $A$, điểm $D$ có hình chiếu trên $(ABCD)$ là $D$. Do đó $SD$ có hình chiếu trên $(ABCD)$ là $AD$.',
          'Suy ra $\\left(SD, (ABCD)\\right) = \\left(SD, AD\\right) = \\widehat{SDA}$.',
          '$\\tan \\widehat{SDA} = \\dfrac{SA}{AD} = \\dfrac{' + saTex + 'a}{' + sideDen + '} = ' + tanTex + ' \\Rightarrow \\widehat{SDA} \\approx ' + fmt2(deg) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 0', params: { u: 0, k: 39 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (80,90°)', params: { u: 1, k: 39 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Tính số đo góc giữa SB và mặt phẳng (SAC) trong chóp đáy vuông
  t11_b24_d12_calc_angle_sb_sac_mc: {
    id: 't11_b24_d12_calc_angle_sb_sac_mc',
    name: 'Tính số đo góc giữa cạnh bên SB và mặt phẳng chéo (SAC)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy hình vuông tâm O cạnh √p·a, SA ⊥ (ABCD), SA = √q·a. Tính góc giữa SB và (SAC).',
    conditionSummary: 'p ∈ [6; 25], q ∈ [10; 35], tránh ranh giới làm tròn .xx5',
    paramSpecs: [
      { name: 'p', label: 'Biểu thức cạnh đáy AB = √p·a', min: 6, max: 25 },
      { name: 'q', label: 'Biểu thức đường cao SA = √q·a', min: 10, max: 35 },
    ],
    validateCode: `
      const { p, q } = params;
      if (p < 6 || p > 25 || q < 10 || q > 35) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const sinV = Math.sqrt(p / (2 * (p + q)));
      const deg = Math.asin(sinV) * 180 / Math.PI;
      const frac = (deg * 100) - Math.floor(deg * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) { out *= k; rem /= k * k; }
        }
        return { out, rem };
      };
      const fmtRad = (r) => r.rem === 1 ? String(r.out) : (r.out === 1 ? '' : String(r.out)) + '\\sqrt{' + r.rem + '}';

      const rAB = rad(p);
      const rSA = rad(q);
      const rBD = rad(2 * p);
      const rSB = rad(p + q);
      const rProd = rad(2 * p * (p + q));

      const obNum = rBD.out, obDen = 2;
      const gOB = gcd(obNum, obDen);
      const obTex = (obDen / gOB === 1)
        ? (rBD.rem === 1 ? String(obNum / gOB) : (obNum / gOB === 1 ? '' : String(obNum / gOB)) + '\\sqrt{' + rBD.rem + '}')
        : '\\dfrac{' + fmtRad(rBD) + '}{2}';

      const sinNum = rProd.out;
      const sinDen = 2 * (p + q);
      const gSin = gcd(sinNum, sinDen);
      const sN = sinNum / gSin, sD = sinDen / gSin;
      const sinTex = rProd.rem === 1
        ? '\\dfrac{' + sN + '}{' + sD + '}'
        : '\\dfrac{' + (sN === 1 ? '' : String(sN)) + '\\sqrt{' + rProd.rem + '}}{' + sD + '}';

      const sinV = Math.sqrt(p / (2 * (p + q)));
      const deg = Math.round((Math.asin(sinV) * 180 / Math.PI) * 100) / 100;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');

      const candidates = [
        Math.round((deg + 4.10) * 100) / 100,
        Math.round((deg + 9.00) * 100) / 100,
        Math.round((deg + 18.40) * 100) / 100,
        Math.max(4, Math.round((deg - 5.20) * 100) / 100),
      ];
      const seen = new Set([fmt2(deg)]);
      const wrongs = [];
      for (const c of candidates) {
        const s = fmt2(c);
        if (!seen.has(s) && wrongs.length < 3) {
          seen.add(s);
          wrongs.push('$' + s + '^\\circ$');
        }
      }

      const correct = '$' + fmt2(deg) + '^\\circ$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông tâm $O$, cạnh bằng $' + fmtRad(rAB) + 'a$, $SA \\perp (ABCD)$, $SA = ' + fmtRad(rSA) + 'a$. Số đo góc giữa đường thẳng $SB$ và mặt phẳng $(SAC)$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', center: 'O' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Do $BO \\perp AC$ và $BO \\perp SA$ nên $BO \\perp (SAC)$. Do đó hình chiếu của $SB$ trên $(SAC)$ là $SO$, suy ra $\\left(SB, (SAC)\\right) = \\widehat{BSO}$.',
          'Ta có $OB = \\dfrac{BD}{2} = \\dfrac{AB\\sqrt{2}}{2} = ' + obTex + 'a$, $SB = \\sqrt{SA^2 + AB^2} = ' + fmtRad(rSB) + 'a$.',
          'Suy ra $\\sin \\widehat{BSO} = \\dfrac{OB}{SB} = ' + sinTex + ' \\Rightarrow \\widehat{BSO} \\approx ' + fmt2(deg) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 5', params: { p: 5, q: 26 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (27,35°)', params: { p: 19, q: 26 }, expectedValid: true },
    ],
  },
};
