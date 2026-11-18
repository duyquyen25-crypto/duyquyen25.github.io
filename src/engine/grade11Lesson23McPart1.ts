import { MathTemplate } from '../types/math';

export const G11_B23_MC_PART1: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Tìm khẳng định đúng)
  t11_b23_d01_proj_prop_correct_mc: {
    id: 't11_b23_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
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
          correct: 'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song bảo toàn hình dạng của một hình',
            'Phép chiếu song song biến hai đường thẳng song song luôn thành hai đường thẳng song song',
            'Phép chiếu song song bảo toàn tính vuông góc',
          ],
          sol: 'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng (còn hai đường thẳng song song có thể chiếu thành song song hoặc trùng nhau).',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song bảo toàn diện tích của tam giác',
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và giữ nguyên thứ tự của chúng.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn góc giữa hai đường thẳng',
            'Phép chiếu song song luôn biến hình bình hành thành hình chữ nhật',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn chu vi đa giác',
            'Phép chiếu song song bảo toàn tính vuông góc của hai đường thẳng',
            'Phép chiếu song song luôn biến tam giác cân thành tam giác cân',
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

  // D02 (Q2): Tính chất phép chiếu song song (Tìm khẳng định sai)
  t11_b23_d02_proj_prop_wrong_mc: {
    id: 't11_b23_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
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
          correct: 'Phép chiếu song song bảo toàn hình dạng của một hình',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn hình dạng và kích thước của một hình (ví dụ đường tròn có thể chiếu thành elip hoặc đoạn thẳng), nên khẳng định đó sai.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
          wrongs: [
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song không bảo toàn góc nên không bảo toàn tính vuông góc giữa hai đường thẳng.',
        },
        {
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Phép chiếu song song biến trung điểm đoạn thẳng (không song song phương chiếu) thành trung điểm của hình chiếu',
            'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng trên cùng một đường thẳng',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
          ],
          sol: 'Hình chiếu song song của mọi đường thẳng đều đồng phẳng trên mặt phẳng chiếu nên không thể là hai đường thẳng chéo nhau.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn diện tích của mọi đa giác',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Hình chiếu song song của hình bình hành (mặt phẳng không chứa phương chiếu) là một hình bình hành',
            'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng song song',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn độ dài và diện tích.',
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

  // D03 (Q3): Hình chiếu song song của hình tròn, tam giác đều, hình vuông
  t11_b23_d03_proj_circle_tri_mc: {
    id: 't11_b23_d03_proj_circle_tri_mc',
    name: 'Hình chiếu song song của đường tròn và đa giác đều',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Nhận biết hình chiếu song song của đường tròn, tam giác đều, hình vuông.',
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
          correct: 'Hình chiếu song song của một đường tròn là một đường elip, hoặc một đường tròn, hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của hình vuông luôn là một hình vuông',
            'Hình chiếu song song của tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của một đường tròn luôn là một đường elip hoặc một đường tròn',
          ],
          sol: 'Khi mặt phẳng chứa đường tròn song song với phương chiếu thì hình chiếu là một đoạn thẳng; các trường hợp còn lại là đường tròn hoặc elip.',
        },
        {
          correct: 'Hình chiếu song song của một tam giác đều (trên mặt phẳng không chứa phương chiếu) là một tam giác',
          wrongs: [
            'Hình chiếu song song của một tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của một đường tròn có thể là một điểm',
            'Hình chiếu song song của một hình thang cân luôn là một hình thang cân',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng nhưng không bảo toàn độ dài và góc, nên hình chiếu của tam giác đều nói chung là một tam giác.',
        },
        {
          correct: 'Hình chiếu song song của một hình chữ nhật (trên mặt phẳng không chứa phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của một hình chữ nhật luôn là một hình chữ nhật',
            'Hình chiếu song song của một hình thoi luôn là một hình thoi',
            'Hình chiếu song song của một đường tròn luôn là một đường tròn',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song nên hình chiếu của hình chữ nhật (khi mặt phẳng chứa nó không chứa phương chiếu) là một hình bình hành.',
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

  // D04 (Q4): Hình chiếu song song đỉnh của lăng trụ ABC.A_1B_1C_1
  t11_b23_d04_prism_proj_point_sub_mc: {
    id: 't11_b23_d04_prism_proj_point_sub_mc',
    name: 'Hình chiếu song song của đỉnh trong lăng trụ tam giác (chỉ số dưới)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Tìm hình chiếu song song của một đỉnh lăng trụ lên mặt bên theo phương cạnh đáy.',
    conditionSummary: 'setIdx ∈ [0; 1], caseIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0: ABC.A₁B₁C₁, 1: MNP.M₁N₁P₁)', min: 0, max: 1 },
      { name: 'caseIdx', label: 'Cặp điểm chiếu & mặt phẳng (0..2)', min: 0, max: 2 },
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
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1' },
        { A: 'M', B: 'N', C: 'P', A1: 'M_1', B1: 'N_1', C1: 'P_1' },
      ];
      const s = SETS[setIdx];
      const CASES = [
        { pt: s.C1, plane: s.A + s.B + s.B1 + s.A1, dir: s.A + s.C, ans: s.A1, w1: s.A, w2: s.B1, w3: s.B, topEdge: s.C1 + s.A1 },
        { pt: s.C1, plane: s.A + s.B + s.B1 + s.A1, dir: s.B + s.C, ans: s.B1, w1: s.A1, w2: s.B, w3: s.A, topEdge: s.C1 + s.B1 },
        { pt: s.B1, plane: s.A + s.C + s.C1 + s.A1, dir: s.B + s.A, ans: s.A1, w1: s.C1, w2: s.A, w3: s.C, topEdge: s.B1 + s.A1 },
      ];
      const item = CASES[caseIdx];
      const correct = 'Điểm $' + item.ans + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      const prismName = s.A + s.B + s.C + '.' + s.A1 + s.B1 + s.C1;
      return {
        stem: 'Cho hình lăng trụ $' + prismName + '$. Hình chiếu song song của điểm $' + item.pt + '$ lên mặt phẳng $(' + item.plane + ')$ theo phương $' + item.dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + item.topEdge + ' \\parallel ' + item.dir + '$ và $' + item.ans + ' \\in (' + item.plane + ')$ nên hình chiếu song song của điểm $' + item.pt + '$ lên $(' + item.plane + ')$ theo phương $' + item.dir + '$ là điểm $' + item.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx = 3', params: { setIdx: 0, caseIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (A₁)', params: { setIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hình chiếu song song đỉnh của lăng trụ ABC.A'B'C'
  t11_b23_d05_prism_proj_point_prime_mc: {
    id: 't11_b23_d05_prism_proj_point_prime_mc',
    name: 'Hình chiếu song song của đỉnh trong lăng trụ tam giác (dấu phẩy)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Tìm hình chiếu song song của đỉnh trên mặt bên lăng trụ ABC.A\'B\'C\'.',
    conditionSummary: 'setIdx ∈ [0; 1], caseIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0: ABC.A\'B\'C\', 1: DEF.D\'E\'F\')', min: 0, max: 1 },
      { name: 'caseIdx', label: 'Cặp điểm chiếu & mặt phẳng (0..3)', min: 0, max: 3 },
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
        { A: 'D', B: 'E', C: 'F', Ap: "D'", Bp: "E'", Cp: "F'" },
      ];
      const s = SETS[setIdx];
      const CASES = [
        { pt: s.Cp, plane: s.A + s.B + s.Bp + s.Ap, dir: s.A + s.C, ans: s.Ap, w1: s.Cp, w2: s.C, w3: s.Bp, topEdge: s.Cp + s.Ap },
        { pt: s.Cp, plane: s.A + s.B + s.Bp + s.Ap, dir: s.B + s.C, ans: s.Bp, w1: s.Ap, w2: s.B, w3: s.C, topEdge: s.Cp + s.Bp },
        { pt: s.Bp, plane: s.A + s.C + s.Cp + s.Ap, dir: s.B + s.C, ans: s.Cp, w1: s.Ap, w2: s.B, w3: s.C, topEdge: s.Bp + s.Cp },
        { pt: s.Ap, plane: s.B + s.C + s.Cp + s.Bp, dir: s.A + s.C, ans: s.Cp, w1: s.Bp, w2: s.A, w3: s.C, topEdge: s.Ap + s.Cp },
      ];
      const item = CASES[caseIdx];
      const correct = 'Điểm $' + item.ans + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      const prismName = s.A + s.B + s.C + '.' + s.Ap + s.Bp + s.Cp;
      return {
        stem: 'Cho hình lăng trụ $' + prismName + '$. Hình chiếu song song của điểm $' + item.pt + '$ lên mặt phẳng $(' + item.plane + ')$ theo phương $' + item.dir + '$ là điểm nào?',
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

  // D06 (Q6): Định nghĩa đường thẳng vuông góc với mặt phẳng
  t11_b23_d06_line_perp_plane_def_mc: {
    id: 't11_b23_d06_line_perp_plane_def_mc',
    name: 'Định nghĩa đường thẳng vuông góc với mặt phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Đường thẳng c vuông góc mặt phẳng (β) và d nằm trong (β) thì c vuông góc với d.',
    conditionSummary: 'linePair ∈ [0; 3], planeIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'linePair', label: 'Cặp đường thẳng (0: c,d; 1: a,b; 2: m,n; 3: d,a)', min: 0, max: 3 },
      { name: 'planeIdx', label: 'Mặt phẳng (0: β, 1: α, 2: P, 3: Q)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.linePair < 0 || params.linePair > 3 || params.planeIdx < 0 || params.planeIdx > 3) {
        return { valid: false, reason: 'Tham số ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { linePair, planeIdx } = params;
      const PAIRS = [
        { l1: 'c', l2: 'd' },
        { l1: 'a', l2: 'b' },
        { l1: 'm', l2: 'n' },
        { l1: 'd', l2: 'a' },
      ];
      const PLANES = ['\\beta', '\\alpha', 'P', 'Q'];
      const p = PAIRS[linePair];
      const pl = PLANES[planeIdx];
      const correct = '$' + p.l1 + ' \\perp ' + p.l2 + '$';
      const wrongs = [
        '$' + p.l1 + ' \\parallel ' + p.l2 + '$',
        '$' + p.l1 + ', ' + p.l2 + '$ chéo nhau',
        '$' + p.l1 + ' \\subset (' + pl + ')$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho đường thẳng $' + p.l1 + '$ vuông góc với mặt phẳng $(' + pl + ')$, đường thẳng $' + p.l2 + '$ nằm trong mặt phẳng $(' + pl + ')$. Tìm khẳng định đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo định nghĩa, một đường thẳng vuông góc với một mặt phẳng thì vuông góc với mọi đường thẳng nằm trong mặt phẳng đó nên $' + p.l1 + ' \\perp ' + p.l2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên planeIdx = 4', params: { linePair: 0, planeIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (c⊥d)', params: { linePair: 0, planeIdx: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng
  t11_b23_d07_two_lines_perp_plane_mc: {
    id: 't11_b23_d07_two_lines_perp_plane_mc',
    name: 'Hai đường thẳng phân biệt cùng vuông góc một mặt phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau.',
    conditionSummary: 'linePair ∈ [0; 3], planeIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'linePair', label: 'Cặp đường thẳng (0..3)', min: 0, max: 3 },
      { name: 'planeIdx', label: 'Mặt phẳng (0: α, 1: β, 2: P, 3: Q)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.linePair < 0 || params.linePair > 3 || params.planeIdx < 0 || params.planeIdx > 3) {
        return { valid: false, reason: 'Tham số ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { linePair, planeIdx } = params;
      const PAIRS = [
        { l1: 'a', l2: 'd' },
        { l1: 'a', l2: 'b' },
        { l1: 'c', l2: 'd' },
        { l1: 'm', l2: 'n' },
      ];
      const PLANES = ['\\alpha', '\\beta', 'P', 'Q'];
      const p = PAIRS[linePair];
      const pl = PLANES[planeIdx];
      const correct = '$' + p.l1 + ' \\parallel ' + p.l2 + '$';
      const wrongs = [
        '$' + p.l1 + '$ cắt $' + p.l2 + '$',
        '$' + p.l1 + ' \\perp ' + p.l2 + '$',
        '$' + p.l2 + ' \\subset (' + pl + ')$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hai đường thẳng phân biệt $' + p.l1 + '$ và $' + p.l2 + '$ cùng vuông góc với mặt phẳng $(' + pl + ')$. Tìm khẳng định đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau nên $' + p.l1 + ' \\parallel ' + p.l2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên linePair = 4', params: { linePair: 4, planeIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (a∥d)', params: { linePair: 0, planeIdx: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Định lí liên hệ song song và vuông góc (Khẳng định lí thuyết)
  t11_b23_d08_theorem_two_perp_same_plane_mc: {
    id: 't11_b23_d08_theorem_two_perp_same_plane_mc',
    name: 'Mối liên hệ giữa tính song song và tính vuông góc (Lí thuyết)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Nhận biết phát biểu đúng về hai đường thẳng/mặt phẳng vuông góc trong không gian.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể định lí (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau',
          wrongs: [
            'Hai mặt phẳng phân biệt cùng vuông góc với một mặt phẳng thì cắt nhau',
            'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau',
            'Hai đường thẳng phân biệt cùng song song với một mặt phẳng thì song song với nhau',
          ],
          sol: 'Theo định lí về tính chất đường thẳng vuông góc với mặt phẳng: hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì song song với nhau.',
        },
        {
          correct: 'Hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau',
          wrongs: [
            'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau',
            'Hai đường thẳng phân biệt cùng vuông góc với một mặt phẳng thì chéo nhau',
            'Nếu một đường thẳng vuông góc với một đường thẳng trong mặt phẳng thì nó vuông góc với mặt phẳng đó',
          ],
          sol: 'Hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau.',
        },
        {
          correct: 'Nếu hai đường thẳng song song thì mặt phẳng nào vuông góc với đường thẳng này cũng vuông góc với đường thẳng kia',
          wrongs: [
            'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì vuông góc với nhau',
            'Nếu hai đường thẳng cùng song song với một mặt phẳng thì chúng song song với nhau',
            'Có duy nhất một đường thẳng đi qua một điểm và vuông góc với một đường thẳng cho trước',
          ],
          sol: 'Mặt phẳng vuông góc với một trong hai đường thẳng song song thì cũng vuông góc với đường thẳng còn lại.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Tìm khẳng định đúng trong các khẳng định sau:',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Đường thẳng c ⊥ (Q) và đường thẳng d // (Q) hoặc d // c
  t11_b23_d09_perp_plane_and_parallel_mc: {
    id: 't11_b23_d09_perp_plane_and_parallel_mc',
    name: 'Quan hệ vuông góc khi biết c ⊥ (Q) và d // (Q) hoặc d // c',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Xác định khẳng định đúng giữa hai đường thẳng c, d và mặt phẳng (Q) khi cho c ⊥ (Q).',
    conditionSummary: 'linePair ∈ [0; 2], planeIdx ∈ [0; 2], mode ∈ {0, 1}',
    paramSpecs: [
      { name: 'linePair', label: 'Cặp đường thẳng (0..2)', min: 0, max: 2 },
      { name: 'planeIdx', label: 'Mặt phẳng (0: Q, 1: P, 2: α)', min: 0, max: 2 },
      { name: 'mode', label: 'Biến thể (0: d∥(Q)=>c⊥d, 1: d∥c=>d⊥(Q))', min: 0, max: 1 },
    ],
    validateCode: `
      if (params.linePair < 0 || params.linePair > 2 || params.planeIdx < 0 || params.planeIdx > 2 || (params.mode !== 0 && params.mode !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { linePair, planeIdx, mode } = params;
      const PAIRS = [
        { l1: 'c', l2: 'd' },
        { l1: 'a', l2: 'b' },
        { l1: 'm', l2: 'n' },
      ];
      const PLANES = ['Q', 'P', '\\alpha'];
      const { l1, l2 } = PAIRS[linePair];
      const pl = PLANES[planeIdx];

      const correct = mode === 0
        ? 'Nếu $' + l2 + ' \\parallel (' + pl + ')$ thì $' + l1 + ' \\perp ' + l2 + '$'
        : 'Nếu $' + l2 + ' \\parallel ' + l1 + '$ thì $' + l2 + ' \\perp (' + pl + ')$';

      const wrongs = mode === 0
        ? [
            'Nếu $' + l2 + ' \\subset (' + pl + ')$ thì $' + l2 + ' \\parallel ' + l1 + '$',
            'Nếu $' + l1 + '$ và $' + l2 + '$ chéo nhau thì $' + l1 + ' \\perp ' + l2 + '$',
            'Nếu $' + l1 + ' \\perp ' + l2 + '$ thì $' + l2 + ' \\parallel (' + pl + ')$',
          ]
        : [
            'Nếu $' + l1 + ' \\perp ' + l2 + '$ thì $' + l2 + ' \\subset (' + pl + ')$',
            'Nếu $' + l2 + ' \\parallel (' + pl + ')$ thì $' + l2 + ' \\parallel ' + l1 + '$',
            'Nếu $' + l2 + '$ cắt $(' + pl + ')$ thì $' + l2 + ' \\perp ' + l1 + '$',
          ];

      const sol = mode === 0
        ? 'Vì $' + l2 + ' \\parallel (' + pl + ')$ nên tồn tại $' + l2 + "' \\subset (" + pl + ')$ sao cho $' + l2 + "' \\parallel " + l2 + '$. Do $' + l1 + ' \\perp (' + pl + ')$ nên $' + l1 + ' \\perp ' + l2 + "'$, suy ra $' + l1 + ' \\perp ' + l2 + '$."
        : 'Vì $' + l2 + ' \\parallel ' + l1 + '$ và $' + l1 + ' \\perp (' + pl + ')$ nên $' + l2 + ' \\perp (' + pl + ')$.';

      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hai đường thẳng phân biệt $' + l1 + ', ' + l2 + '$ và mặt phẳng $(' + pl + ')$, trong đó $' + l1 + ' \\perp (' + pl + ')$. Tìm khẳng định đúng trong các khẳng định sau:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 2', params: { linePair: 0, planeIdx: 0, mode: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9', params: { linePair: 0, planeIdx: 0, mode: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Hình chóp đáy vuông SC ⊥ đáy -> cạnh đáy vuông góc mặt bên
  t11_b23_d10_pyr_square_perp_face_mc: {
    id: 't11_b23_d10_pyr_square_perp_face_mc',
    name: 'Chứng minh cạnh đáy vuông góc mặt bên (Chóp đáy hình vuông)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp đáy hình vuông có một cạnh bên vuông góc với đáy. Tìm quan hệ đường vuông góc mặt đúng.',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Vị trí cạnh cao (0: SC, 1: SA, 2: SB, 3: SD)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          baseName: 'CDAB',
          alt: 'SC',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
          correct: '$DA \\perp (SCD)$',
          wrongs: ['$DB \\perp (SCB)$', '$DB \\perp (SDA)$', '$SC \\perp (SDB)$'],
          sol: 'Ta có $DA \\perp CD$ và $DA \\perp SC$ (do $SC \\perp (CDAB)$) nên $DA \\perp (SCD)$.',
        },
        {
          baseName: 'ABCD',
          alt: 'SA',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
          correct: '$BC \\perp (SAB)$',
          wrongs: ['$AC \\perp (SBC)$', '$AC \\perp (SCD)$', '$SA \\perp (SBD)$'],
          sol: 'Ta có $BC \\perp AB$ và $BC \\perp SA$ (do $SA \\perp (ABCD)$) nên $BC \\perp (SAB)$.',
        },
        {
          baseName: 'ABCD',
          alt: 'SB',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
          correct: '$CD \\perp (SBC)$',
          wrongs: ['$BD \\perp (SCD)$', '$BD \\perp (SAD)$', '$SB \\perp (SAC)$'],
          sol: 'Ta có $CD \\perp BC$ và $CD \\perp SB$ (do $SB \\perp (ABCD)$) nên $CD \\perp (SBC)$.',
        },
        {
          baseName: 'ABCD',
          alt: 'SD',
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C',
          correct: '$AB \\perp (SAD)$',
          wrongs: ['$BD \\perp (SAB)$', '$BD \\perp (SBC)$', '$SD \\perp (SAC)$'],
          sol: 'Ta có $AB \\perp AD$ và $AB \\perp SD$ (do $SD \\perp (ABCD)$) nên $AB \\perp (SAD)$.',
        },
      ];
      const item = CASES[rot];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.' + item.baseName + '$ có đáy là hình vuông, $' + item.alt + ' \\perp (' + item.baseName + ')$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (DA⊥(SCD))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Chóp đáy chữ nhật SB ⊥ (ABCD), M hình chiếu B trên CA -> CA ⊥ (SBM)
  t11_b23_d11_pyr_rect_diag_perp_mc: {
    id: 't11_b23_d11_pyr_rect_diag_perp_mc',
    name: 'Chứng minh đường chéo vuông góc mặt phẳng phụ (Chóp đáy chữ nhật)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Chóp đáy hình chữ nhật có một cạnh bên vuông góc đáy và đường cao từ chân đường vuông góc tới đường chéo.',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Vị trí đường cao bên (0: SB, 1: SA, 2: SC, 3: SD)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altVertex: 'B', diag: 'CA', midPt: 'M',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
          correct: '$CA \\perp (SBM)$',
          wrongs: ['$CD \\perp (SDA)$', '$SB \\perp (SCA)$', '$CA \\perp (SCD)$'],
          sol: 'Ta có $CA \\perp BM$ (giả thiết) và $CA \\perp SB$ (do $SB \\perp (ABCD)$) nên $CA \\perp (SBM)$.',
        },
        {
          altVertex: 'A', diag: 'BD', midPt: 'H',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
          correct: '$BD \\perp (SAH)$',
          wrongs: ['$BC \\perp (SCD)$', '$SA \\perp (SBD)$', '$BD \\perp (SCD)$'],
          sol: 'Ta có $BD \\perp AH$ (giả thiết) và $BD \\perp SA$ (do $SA \\perp (ABCD)$) nên $BD \\perp (SAH)$.',
        },
        {
          altVertex: 'C', diag: 'BD', midPt: 'K',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
          correct: '$BD \\perp (SCK)$',
          wrongs: ['$AB \\perp (SAD)$', '$SC \\perp (SBD)$', '$BD \\perp (SAB)$'],
          sol: 'Ta có $BD \\perp CK$ (giả thiết) và $BD \\perp SC$ (do $SC \\perp (ABCD)$) nên $BD \\perp (SCK)$.',
        },
        {
          altVertex: 'D', diag: 'AC', midPt: 'E',
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C',
          correct: '$AC \\perp (SDE)$',
          wrongs: ['$CD \\perp (SAB)$', '$SD \\perp (SAC)$', '$AC \\perp (SBC)$'],
          sol: 'Ta có $AC \\perp DE$ (giả thiết) và $AC \\perp SD$ (do $SD \\perp (ABCD)$) nên $AC \\perp (SDE)$.',
        },
      ];
      const item = CASES[rot];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $S' + item.altVertex + ' \\perp (ABCD)$. Gọi $' + item.midPt + '$ là hình chiếu vuông góc của $' + item.altVertex + '$ trên đường thẳng $' + item.diag + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (CA⊥(SBM))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Chóp đáy hình thoi SC ⊥ (CDAB) -> DB ⊥ (SCA)
  t11_b23_d12_pyr_rhombus_diag_perp_mc: {
    id: 't11_b23_d12_pyr_rhombus_diag_perp_mc',
    name: 'Đường chéo đáy vuông góc mặt chéo (Chóp đáy hình thoi)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Trong hình chóp có đáy là hình thoi và một cạnh bên vuông góc đáy, xác định mặt phẳng vuông góc với đường chéo còn lại.',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Vị trí cạnh cao (0: SC, 1: SA, 2: SB, 3: SD)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          baseName: 'CDAB', alt: 'SC',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
          correct: '$DB \\perp (SCA)$',
          wrongs: ['$DB \\perp (SDA)$', '$SC \\perp (SDA)$', '$DA \\perp (SCA)$'],
          sol: 'Vì đáy $CDAB$ là hình thoi nên $DB \\perp CA$. Lại có $DB \\perp SC$ (do $SC \\perp (CDAB)$) nên $DB \\perp (SCA)$.',
        },
        {
          baseName: 'ABCD', alt: 'SA',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
          correct: '$BD \\perp (SAC)$',
          wrongs: ['$BD \\perp (SBC)$', '$SA \\perp (SBD)$', '$AB \\perp (SAC)$'],
          sol: 'Vì đáy $ABCD$ là hình thoi nên $BD \\perp AC$. Lại có $BD \\perp SA$ (do $SA \\perp (ABCD)$) nên $BD \\perp (SAC)$.',
        },
        {
          baseName: 'ABCD', alt: 'SB',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
          correct: '$AC \\perp (SBD)$',
          wrongs: ['$AC \\perp (SCD)$', '$SB \\perp (SAC)$', '$BC \\perp (SBD)$'],
          sol: 'Vì đáy $ABCD$ là hình thoi nên $AC \\perp BD$. Lại có $AC \\perp SB$ (do $SB \\perp (ABCD)$) nên $AC \\perp (SBD)$.',
        },
        {
          baseName: 'ABCD', alt: 'SD',
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C',
          correct: '$AC \\perp (SBD)$',
          wrongs: ['$AC \\perp (SAB)$', '$SD \\perp (SAC)$', '$AD \\perp (SBD)$'],
          sol: 'Vì đáy $ABCD$ là hình thoi nên $AC \\perp BD$. Lại có $AC \\perp SD$ (do $SD \\perp (ABCD)$) nên $AC \\perp (SBD)$.',
        },
      ];
      const item = CASES[rot];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.' + item.baseName + '$ có đáy là hình thoi, $' + item.alt + ' \\perp (' + item.baseName + ')$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (DB⊥(SCA))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Chóp S.CAB đáy vuông tại C, SC ⊥ đáy, CE ⊥ AB -> AB ⊥ (SCE)
  t11_b23_d13_tri_pyr_right_alt_mc: {
    id: 't11_b23_d13_tri_pyr_right_alt_mc',
    name: 'Chóp tam giác vuông tại chân đường cao có đường cao đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.CAB đáy vuông tại C, SC ⊥ (CAB), CE ⊥ AB. Chứng minh AB ⊥ (SCE).',
    conditionSummary: 'rot ∈ [0; 2]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh góc vuông (0: C, 1: A, 2: B)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 2) return { valid: false, reason: 'rot ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          name: 'S.CAB', rightV: 'C', hyp: 'AB', proj: 'E', vL: 'C', vF: 'A', vR: 'B',
          correct: '$AB \\perp (SCE)$',
          wrongs: ['$CB \\perp (SCE)$', '$CA \\perp (SAB)$', '$SC \\perp (SEA)$'],
          sol: 'Ta có $AB \\perp CE$ (do $E$ là hình chiếu vuông góc của $C$ trên $AB$) và $AB \\perp SC$ (do $SC \\perp (CAB)$), nên $AB \\perp (SCE)$.',
        },
        {
          name: 'S.ABC', rightV: 'A', hyp: 'BC', proj: 'H', vL: 'A', vF: 'B', vR: 'C',
          correct: '$BC \\perp (SAH)$',
          wrongs: ['$AB \\perp (SAH)$', '$AC \\perp (SBC)$', '$SA \\perp (SHB)$'],
          sol: 'Ta có $BC \\perp AH$ (do $H$ là hình chiếu vuông góc của $A$ trên $BC$) và $BC \\perp SA$ (do $SA \\perp (ABC)$), nên $BC \\perp (SAH)$.',
        },
        {
          name: 'S.BCA', rightV: 'B', hyp: 'AC', proj: 'K', vL: 'B', vF: 'C', vR: 'A',
          correct: '$AC \\perp (SBK)$',
          wrongs: ['$BC \\perp (SBK)$', '$BA \\perp (SAC)$', '$SB \\perp (SKC)$'],
          sol: 'Ta có $AC \\perp BK$ (do $K$ là hình chiếu vuông góc của $B$ trên $AC$) và $AC \\perp SB$ (do $SB \\perp (BCA)$), nên $AC \\perp (SBK)$.',
        },
      ];
      const item = CASES[rot];
      const base = item.name.slice(2);
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $' + item.name + '$ có đáy là tam giác vuông tại $' + item.rightV + '$, $S' + item.rightV + ' \\perp (' + base + ')$. Gọi $' + item.proj + '$ là hình chiếu vuông góc của $' + item.rightV + '$ trên đường thẳng $' + item.hyp + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 3', params: { rot: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (AB⊥(SCE))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Chóp đáy tam giác đều, trung tuyến đáy vuông góc mặt bên
  t11_b23_d14_tri_pyr_equi_mid_perp_mc: {
    id: 't11_b23_d14_tri_pyr_equi_mid_perp_mc',
    name: 'Chóp tam giác đều đáy: trung tuyến vuông góc mặt bên',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp tam giác đáy đều có một cạnh bên vuông góc với đáy, tìm trung tuyến vuông góc mặt bên.',
    conditionSummary: 'rot ∈ [0; 2]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: B, 1: A, 2: C)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 2) return { valid: false, reason: 'rot ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          name: 'S.BCA', altV: 'B', m1: 'N', e1: 'CA', m2: 'P', e2: 'BA', m3: 'Q', e3: 'BC',
          vL: 'B', vF: 'C', vR: 'A',
          correct: '$CP \\perp (SBA)$',
          wrongs: ['$BA \\perp (SBC)$', '$BN \\perp (SCA)$', '$BC \\perp (SBA)$'],
          sol: 'Vì tam giác $BCA$ đều và $P$ là trung điểm $BA$ nên $CP \\perp BA$. Lại có $CP \\perp SB$ (do $SB \\perp (BCA)$) nên $CP \\perp (SBA)$.',
        },
        {
          name: 'S.ABC', altV: 'A', m1: 'M', e1: 'BC', m2: 'N', e2: 'AC', m3: 'P', e3: 'AB',
          vL: 'A', vF: 'B', vR: 'C',
          correct: '$BN \\perp (SAC)$',
          wrongs: ['$AC \\perp (SAB)$', '$AM \\perp (SBC)$', '$BC \\perp (SAB)$'],
          sol: 'Vì tam giác $ABC$ đều và $N$ là trung điểm $AC$ nên $BN \\perp AC$. Lại có $BN \\perp SA$ (do $SA \\perp (ABC)$) nên $BN \\perp (SAC)$.',
        },
        {
          name: 'S.CAB', altV: 'C', m1: 'M', e1: 'AB', m2: 'N', e2: 'BC', m3: 'P', e3: 'AC',
          vL: 'C', vF: 'A', vR: 'B',
          correct: '$AN \\perp (SCB)$',
          wrongs: ['$AB \\perp (SCA)$', '$CM \\perp (SAB)$', '$AC \\perp (SBC)$'],
          sol: 'Vì tam giác $CAB$ đều và $N$ là trung điểm $BC$ nên $AN \\perp BC$. Lại có $AN \\perp SC$ (do $SC \\perp (CAB)$) nên $AN \\perp (SCB)$.',
        },
      ];
      const item = CASES[rot];
      const base = item.name.slice(2);
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $' + item.name + '$ có đáy là tam giác đều, $S' + item.altV + ' \\perp (' + base + ')$. Gọi $' + item.m1 + ', ' + item.m2 + ', ' + item.m3 + '$ lần lượt là trung điểm của $' + item.e1 + ', ' + item.e2 + ', ' + item.e3 + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 3', params: { rot: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (CP⊥(SBA))', params: { rot: 0 }, expectedValid: true },
    ],
  },
};
