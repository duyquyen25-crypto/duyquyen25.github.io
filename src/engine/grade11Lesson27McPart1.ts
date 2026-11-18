import { MathTemplate } from '../types/math';

export const G11_B27_MC_PART1: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Khẳng định đúng)
  t11_b27_d01_proj_prop_correct_mc: {
    id: 't11_b27_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Nhận biết khẳng định đúng về tính chất cơ bản của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề đúng (0..3)', min: 0, max: 3 },
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
            'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng',
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song',
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng nên biến ba điểm thẳng hàng thành ba điểm thẳng hàng.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song bảo toàn số đo mọi góc trong tam giác',
            'Phép chiếu song song luôn bảo toàn diện tích hình phẳng',
          ],
          sol: 'Khi hai đường thẳng song song không song song với phương chiếu, hình chiếu song song của chúng là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc giữa hai đường thẳng',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng nằm trên cùng một đường thẳng hoặc trên hai đường thẳng song song.',
        },
        {
          correct: 'Phép chiếu song song có thể biến đường tròn thành đường elip',
          wrongs: [
            'Phép chiếu song song bảo toàn chu vi đa giác',
            'Phép chiếu song song luôn biến hình bình hành thành hình chữ nhật',
            'Phép chiếu song song biến hai đường thẳng cắt nhau luôn thành hai đường thẳng vuông góc',
          ],
          sol: 'Hình chiếu song song của đường tròn lên mặt phẳng không song song với nó (và không chứa phương chiếu) là một đường elip.',
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
  t11_b27_d02_proj_prop_wrong_mc: {
    id: 't11_b27_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
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
          correct: 'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song biến ba đường thẳng đồng quy thành ba đường thẳng đồng quy',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
          ],
          sol: 'Khẳng định đã cho sai vì hình chiếu song song của hai đường thẳng song song có thể trùng nhau (hoặc suy biến thành hai điểm nếu song song phương chiếu).',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tính vuông góc của hai đường thẳng',
          wrongs: [
            'Phép chiếu song song bảo toàn thứ tự ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song có thể biến đường tròn thành đoạn thẳng',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn góc nên không bảo toàn tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song biến trung điểm đoạn thẳng thành trung điểm của hình chiếu',
          ],
          sol: 'Phép chiếu song song nói chung làm thay đổi độ dài của đoạn thẳng.',
        },
        {
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Hình chiếu song song của đường tròn có thể là đoạn thẳng',
            'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng trên cùng đường thẳng',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          ],
          sol: 'Các hình chiếu đều nằm trên cùng một mặt phẳng chiếu nên không thể chéo nhau.',
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

  // D03 (Q3): Hình chiếu song song của tam giác và đa giác
  t11_b27_d03_proj_polygon_mc: {
    id: 't11_b27_d03_proj_polygon_mc',
    name: 'Hình chiếu song song của tam giác và tứ giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Nhận biết hình chiếu song song của tam giác, hình thoi, hình chữ nhật.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của một tam giác (mặt phẳng không chứa phương chiếu) là một tam giác',
          wrongs: [
            'Hình chiếu song song của hình thoi luôn cho một hình thoi',
            'Hình chiếu song song của tam giác đều thành một tam giác đều',
            'Hình chiếu song song của hình chữ nhật luôn giữ nguyên tỉ lệ chiều dài và chiều rộng',
          ],
          sol: 'Khi mặt phẳng chứa tam giác không song song với phương chiếu, hình chiếu song song của tam giác là một tam giác.',
        },
        {
          correct: 'Hình chiếu song song của hình bình hành (mặt phẳng không chứa phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình vuông luôn là hình vuông',
            'Hình chiếu song song của tam giác vuông luôn là tam giác vuông',
            'Hình chiếu song song của hình thang cân luôn là hình chữ nhật',
          ],
          sol: 'Vì phép chiếu song song bảo toàn tính song song của các cặp cạnh đối nên hình chiếu của hình bình hành là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của một hình chữ nhật (mặt phẳng không chứa phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn là hình chữ nhật',
            'Hình chiếu song song của tam giác cân luôn là tam giác cân',
            'Hình chiếu song song của hình thoi luôn bảo toàn độ dài hai đường chéo',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song của hai cặp cạnh đối nhưng không bảo toàn góc vuông nên hình chiếu của hình chữ nhật nói chung là hình bình hành.',
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

  // D04 (Q4): Lăng trụ ABC.DEF chiếu đỉnh D/E/F lên (ABC) theo phương FC/DA/EB
  t11_b27_d04_prism_proj_def_mc: {
    id: 't11_b27_d04_prism_proj_def_mc',
    name: 'Hình chiếu song song trên lăng trụ ABC.DEF',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Xác định hình chiếu song song của một đỉnh đáy trên lên mặt đáy (ABC) theo phương cạnh bên.',
    conditionSummary: 'vIdx ∈ [0; 2], dirIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Đỉnh được chiếu (0: D, 1: E, 2: F)', min: 0, max: 2 },
      { name: 'dirIdx', label: 'Phương chiếu (0: DA, 1: EB, 2: FC)', min: 0, max: 2 },
    ],
    validateCode: `
      const { vIdx, dirIdx } = params;
      if (vIdx < 0 || vIdx > 2 || dirIdx < 0 || dirIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, dirIdx } = params;
      const bots = ['A', 'B', 'C'];
      const tops = ['D', 'E', 'F'];
      const dirs = ['DA', 'EB', 'FC'];
      const V = tops[vIdx];
      const img = bots[vIdx];
      const dir = dirs[dirIdx];
      const otherBots = bots.filter((_, i) => i !== vIdx);
      const otherTops = tops.filter((_, i) => i !== vIdx);

      const correct = 'Điểm $' + img + '$';
      const wrongs = [
        'Điểm $' + otherBots[0] + '$',
        'Điểm $' + otherBots[1] + '$',
        'Điểm $' + otherTops[0] + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $ABC.DEF$. Hình chiếu song song của điểm $' + V + '$ lên mặt phẳng $(ABC)$ theo phương $' + dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: 'D', tF: 'E', tR: 'F' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì cạnh bên $' + V + img + '$ song song (hoặc trùng) với phương $' + dir + '$ và $' + img + ' \\in (ABC)$ nên hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { vIdx: 3, dirIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (A)', params: { vIdx: 0, dirIdx: 2 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Lăng trụ ABC.A'B'C' chiếu C' lên (ABB'A') theo phương AC (hoặc C lên (ABB'A') theo BC...)
  t11_b27_d05_prism_proj_side_mc: {
    id: 't11_b27_d05_prism_proj_side_mc',
    name: 'Hình chiếu song song lên mặt bên (ABB\'A\') của lăng trụ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Xác định hình chiếu song song của đỉnh C\' (hoặc C) lên mặt bên (ABB\'A\') theo phương AC hoặc BC.',
    conditionSummary: 'topFlag ∈ {0, 1}, dirIdx ∈ {0, 1}',
    paramSpecs: [
      { name: 'topFlag', label: '0: chiếu C, 1: chiếu C\'', min: 0, max: 1 },
      { name: 'dirIdx', label: 'Phương chiếu (0: AC, 1: BC)', min: 0, max: 1 },
    ],
    validateCode: `
      const { topFlag, dirIdx } = params;
      if ((topFlag !== 0 && topFlag !== 1) || (dirIdx !== 0 && dirIdx !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { topFlag, dirIdx } = params;
      const V = topFlag === 1 ? "C'" : 'C';
      const dir = dirIdx === 0 ? 'AC' : 'BC';
      const img = topFlag === 1 ? (dirIdx === 0 ? "A'" : "B'") : (dirIdx === 0 ? 'A' : 'B');
      const allCand = ['C', "C'", 'A', "A'", 'B', "B'"];
      const wrongs = allCand.filter((x) => x !== img && x !== V).slice(0, 3).map((x) => 'Điểm $' + x + '$');
      const correct = 'Điểm $' + img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: "Cho hình lăng trụ $ABC.A'B'C'$. Hình chiếu song song của điểm $" + V + "$ lên mặt phẳng $(ABB'A')$ theo phương $" + dir + "$ là điểm nào?",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          "Vì $" + img + V + " \\parallel " + dir + "$ (do mặt bên là hình bình hành) và $" + img + " \\in (ABB'A')$ nên hình chiếu song song của $" + V + "$ là điểm $" + img + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dirIdx = 2', params: { topFlag: 1, dirIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (A\')', params: { topFlag: 1, dirIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Thể tích khối chóp biết diện tích đáy B và chiều cao h
  t11_b27_d06_pyr_vol_bh_mc: {
    id: 't11_b27_d06_pyr_vol_bh_mc',
    name: 'Thể tích khối chóp biết diện tích đáy và chiều cao',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho khối chóp có diện tích đáy B và chiều cao h. Tính thể tích V.',
    conditionSummary: 'b ∈ [4; 24], h ∈ [3; 15]',
    paramSpecs: [
      { name: 'b', label: 'Diện tích đáy B', min: 4, max: 24 },
      { name: 'h', label: 'Chiều cao h', min: 3, max: 15 },
    ],
    validateCode: `
      const { b, h } = params;
      if (b < 4 || b > 24 || h < 3 || h > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, h } = params;
      const fAns = u.simplifyFrac(b * h, 3);
      const fW1 = u.simplifyFrac(b + h, 3);
      const fW2 = u.simplifyFrac(b * h, 2);
      const fW3 = u.simplifyFrac(b * h, 1);

      const correct = '$V = ' + fAns.latex + '$';
      const wrongs = [
        '$V = ' + fW1.latex + '$',
        '$V = ' + fW3.latex + '$',
        '$V = ' + fW2.latex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$V = ' + u.simplifyFrac(b * h + idx * 3, 3).latex + '$'
      );

      return {
        stem: 'Cho hình chóp có diện tích đáy bằng $' + b + '$ và chiều cao bằng $' + h + '$. Tính thể tích $V$ của khối chóp đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức thể tích khối chóp: $V = \\dfrac{1}{3} B h = \\dfrac{1}{3} \\cdot ' + b + ' \\cdot ' + h + ' = ' + fAns.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 3', params: { b: 3, h: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (V = 11)', params: { b: 11, h: 3 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Thể tích khối chóp đáy tam giác đều cạnh u và chiều cao h
  t11_b27_d07_pyr_vol_equi_h_mc: {
    id: 't11_b27_d07_pyr_vol_equi_h_mc',
    name: 'Thể tích khối chóp đáy tam giác đều biết cạnh và chiều cao',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho hình chóp đáy tam giác đều cạnh u và chiều cao h. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 10], h ∈ [2; 10]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u', min: 2, max: 10 },
      { name: 'h', label: 'Chiều cao h', min: 2, max: 10 },
    ],
    validateCode: `
      const { u: edge, h } = params;
      if (edge < 2 || edge > 10 || h < 2 || h > 10) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h } = params;
      const fmtSqrt3 = (num, den) => {
        const f = u.simplifyFrac(num, den);
        if (f.isInteger) return '$V = ' + (f.num === 1 ? '' : f.num) + '\\sqrt{3}$';
        return '$V = \\frac{' + f.num + '}{' + f.den + '}\\sqrt{3}$';
      };
      const correct = fmtSqrt3(edge * edge * h, 12);
      const wrongs = [
        fmtSqrt3(edge * edge * h, 6),
        fmtSqrt3(edge * edge * h, 4),
        fmtSqrt3(edge * edge * h, 2),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtSqrt3(edge * edge * h + idx, 12)
      );

      return {
        stem: 'Cho hình chóp có đáy là tam giác đều cạnh bằng $' + edge + '$ và chiều cao bằng $' + h + '$. Tính thể tích $V$ của khối chóp đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích đáy tam giác đều: $B = \\dfrac{' + edge + '^2 \\sqrt{3}}{4}$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} B h = \\dfrac{1}{3} \\cdot \\dfrac{' + (edge * edge) + '\\sqrt{3}}{4} \\cdot ' + h + ' = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, h: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (49/6 √3)', params: { u: 7, h: 2 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Chóp S.ABC đáy vuông tại A, AB=u·a, AC=v·a, SA=h·a
  t11_b27_d08_tri_pyr_right_a_vol_mc: {
    id: 't11_b27_d08_tri_pyr_right_a_vol_mc',
    name: 'Thể tích khối chóp S.ABC có đáy vuông tại A và SA ⊥ (ABC)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABC đáy vuông tại A, AB = u·a, AC = v·a, SA ⊥ (ABC), SA = h·a. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 9], v ∈ [2; 12], h ∈ [2; 10]',
    paramSpecs: [
      { name: 'u', label: 'Độ dài AB = u·a', min: 2, max: 9 },
      { name: 'v', label: 'Độ dài AC = v·a', min: 2, max: 12 },
      { name: 'h', label: 'Chiều cao SA = h·a', min: 2, max: 10 },
    ],
    validateCode: `
      const { u: ab, v: ac, h } = params;
      if (ab < 2 || ab > 9 || ac < 2 || ac > 12 || h < 2 || h > 10) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: ac, h } = params;
      const fmtA3 = (num, den) => {
        const f = u.simplifyFrac(num, den);
        return '$V = ' + f.latex + 'a^3$';
      };
      const prod = ab * ac * h;
      const correct = fmtA3(prod, 6);
      const wrongs = [
        fmtA3(prod, 4),
        fmtA3(prod, 1),
        fmtA3(prod, 2),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtA3(prod + idx * 6, 6)
      );

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $A$, $AB = ' + ab + 'a$ và $AC = ' + ac + 'a$, $SA \\perp (ABC)$, $SA = ' + h + 'a$. Tính thể tích $V$ của khối chóp đã cho.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích tam giác vuông $ABC$ là $S_{ABC} = \\dfrac{1}{2} AB \\cdot AC = \\dfrac{1}{2} \\cdot ' + ab + 'a \\cdot ' + ac + 'a$.',
          'Thể tích khối chóp $S.ABC$ là $V = \\dfrac{1}{3} S_{ABC} \\cdot SA = \\dfrac{1}{6} \\cdot ' + ab + 'a \\cdot ' + ac + 'a \\cdot ' + h + 'a = ' + u.simplifyFrac(prod, 6).latex + 'a^3$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, v: 10, h: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (35a³)', params: { u: 3, v: 10, h: 7 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Chóp S.ABC đáy vuông cân tại A, BC = √q·a, SA = √p·a
  t11_b27_d09_tri_pyr_iso_right_hyp_vol_mc: {
    id: 't11_b27_d09_tri_pyr_iso_right_hyp_vol_mc',
    name: 'Thể tích khối chóp S.ABC đáy vuông cân biết cạnh huyền BC',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABC đáy vuông cân tại A, BC = √q·a, SA ⊥ (ABC), SA = √p·a. Tính thể tích V.',
    conditionSummary: 'q ∈ [2; 20], p ∈ [2; 15]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh huyền q (BC = √q·a)', min: 2, max: 20 },
      { name: 'p', label: 'Bình phương chiều cao p (SA = √p·a)', min: 2, max: 15 },
    ],
    validateCode: `
      const { q, p } = params;
      if (q < 2 || q > 20 || p < 2 || p > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, p } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const fmtRadA3 = (coeff, radN, den) => {
        let out = 1, rem = radN;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        const total = coeff * out;
        const g = u.gcd(total, den);
        const n = total / g, d = den / g;
        const sq = rem === 1 ? '' : '\\sqrt{' + rem + '}';
        const numExpr = rem === 1 ? n + ' a^3' : (n === 1 ? sq + ' a^3' : n + ' ' + sq + ' a^3');
        return d === 1 ? '$V = ' + numExpr + '$' : '$V = \\frac{' + numExpr + '}{' + d + '}$';
      };

      const bcTex = rad(q), saTex = rad(p);
      const areaFrac = u.simplifyFrac(q, 4);
      const correct = fmtRadA3(q, p, 12);
      const wrongs = [
        fmtRadA3(q, p, 8),
        fmtRadA3(q, p, 4),
        fmtRadA3(q, p, 2),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtRadA3(q + idx, p, 12)
      );

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông cân tại $A$ với $BC = ' + bcTex + 'a$. Biết $SA \\perp (ABC)$ và $SA = ' + saTex + 'a$. Thể tích $V$ của khối chóp $S.ABC$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Do $\\triangle ABC$ vuông cân tại $A$ nên $S_{ABC} = \\dfrac{1}{4} BC^2 = ' + areaFrac.latex + ' a^2$.',
          'Thể tích khối chóp là $V = \\dfrac{1}{3} S_{ABC} \\cdot SA = \\dfrac{1}{3} \\cdot ' + areaFrac.latex + 'a^2 \\cdot ' + saTex + 'a = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { q: 1, p: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (5√3 a³/6)', params: { q: 10, p: 3 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Chóp S.ABC đáy vuông cân tại B, AB=u·a, ΔSAB đều trong mặt phẳng vuông góc đáy
  t11_b27_d10_tri_pyr_perp_equi_face_iso_mc: {
    id: 't11_b27_d10_tri_pyr_perp_equi_face_iso_mc',
    name: 'Thể tích khối chóp có mặt bên đều vuông góc với đáy vuông cân',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABC đáy vuông cân tại B, AB = u·a, ΔSAB đều nằm trong mặt phẳng vuông góc với đáy. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 9]',
    paramSpecs: [
      { name: 'u', label: 'Độ dài AB = u·a', min: 2, max: 9 },
    ],
    validateCode: `
      const { u: edge } = params;
      if (edge < 2 || edge > 9) return { valid: false, reason: 'u ngoài miền [2; 9]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge } = params;
      const fmtRadA3 = (num, radN, den) => {
        const f = u.simplifyFrac(num, den);
        const sq = '\\sqrt{' + radN + '}';
        const numStr = (f.num === 1 ? '' : f.num + ' ') + sq + ' a^3';
        return f.isInteger ? '$V = ' + numStr + '$' : '$V = \\frac{' + numStr + '}{' + f.den + '}$';
      };

      const u3 = edge * edge * edge;
      const correct = fmtRadA3(u3, 3, 12);
      const wrongs = [
        fmtRadA3(u3, 3, 4),
        fmtRadA3(u3, 2, 4),
        fmtRadA3(u3, 2, 12),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtRadA3(u3 + idx * 4, 3, 12)
      );

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông cân tại $B$ và $AB = ' + edge + 'a$. Tam giác $SAB$ đều nằm trong mặt phẳng vuông góc với đáy. Thể tích $V$ của khối chóp $S.ABC$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { midEdge: 2 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', mid: 'M' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích đáy $S_{ABC} = \\dfrac{1}{2} AB \\cdot BC = ' + u.simplifyFrac(edge * edge, 2).latex + 'a^2$.',
          'Gọi $M$ là trung điểm $AB$. Do $\\triangle SAB$ đều và $(SAB) \\perp (ABC)$ nên $SM \\perp (ABC)$ và $SM = \\dfrac{' + edge + '\\sqrt{3}a}{2}$.',
          'Vậy $V = \\dfrac{1}{3} S_{ABC} \\cdot SM = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (9√3 a³/4)', params: { u: 3 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Chóp S.ABC đáy đều, AB=√q·a, ΔSAB đều trong mặt phẳng vuông góc đáy
  t11_b27_d11_tri_pyr_perp_equi_face_equi_mc: {
    id: 't11_b27_d11_tri_pyr_perp_equi_face_equi_mc',
    name: 'Thể tích khối chóp đáy đều có mặt bên đều vuông góc với đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABC đáy tam giác đều cạnh AB = √q·a, ΔSAB đều nằm trong mặt phẳng vuông góc đáy. Tính thể tích V.',
    conditionSummary: 'q ∈ [2; 16]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh AB: q (AB = √q·a)', min: 2, max: 16 },
    ],
    validateCode: `
      const { q } = params;
      if (q < 2 || q > 16) return { valid: false, reason: 'q ngoài miền [2; 16]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const fmtRadA3 = (coeff, radN, den) => {
        let out = 1, rem = radN;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        const total = coeff * out;
        const g = u.gcd(total, den);
        const n = total / g, d = den / g;
        const sq = rem === 1 ? '' : '\\sqrt{' + rem + '}';
        const numStr = rem === 1 ? n + ' a^3' : (n === 1 ? sq + ' a^3' : n + ' ' + sq + ' a^3');
        return d === 1 ? '$V = ' + numStr + '$' : '$V = \\frac{' + numStr + '}{' + d + '}$';
      };

      const sideTex = rad(q);
      const correct = fmtRadA3(q, q, 8);
      const wrongs = [
        fmtRadA3(3 * q, q, 8),
        fmtRadA3(q, 6 * q, 8),
        fmtRadA3(q, 6 * q, 24),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtRadA3(q + idx, q, 8)
      );

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều và $AB = ' + sideTex + 'a$. Tam giác $SAB$ đều nằm trong mặt phẳng vuông góc với đáy. Thể tích $V$ của khối chóp $S.ABC$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { midEdge: 2 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', mid: 'M' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích đáy $S_{ABC} = \\dfrac{AB^2\\sqrt{3}}{4} = ' + fmtRadA3(q, 3, 4).slice(5, -5) + 'a^2$.',
          'Gọi $M$ là trung điểm $AB \\Rightarrow SM \\perp (ABC)$ và $SM = \\dfrac{' + rad(3 * q) + ' a}{2}$.',
          'Thể tích $V = \\dfrac{1}{3} S_{ABC} \\cdot SM = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { q: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (5√5 a³/8)', params: { q: 5 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Chóp S.ABCD đáy vuông cạnh u·a, SA ⊥ (ABCD), SA = √p·a
  t11_b27_d12_sq_pyr_sa_vol_mc: {
    id: 't11_b27_d12_sq_pyr_sa_vol_mc',
    name: 'Thể tích khối chóp tứ giác đáy vuông có SA ⊥ (ABCD)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy hình vuông cạnh u·a, SA ⊥ (ABCD), SA = √p·a. Tính thể tích V.',
    conditionSummary: 'u ∈ [1; 6], p ∈ [2; 15]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy AB = u·a', min: 1, max: 6 },
      { name: 'p', label: 'Bình phương chiều cao p (SA = √p·a)', min: 2, max: 15 },
    ],
    validateCode: `
      const { u: edge, p } = params;
      if (edge < 1 || edge > 6 || p < 2 || p > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, p } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const fmtRadA3 = (coeff, radN, den) => {
        let out = 1, rem = radN;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        const total = coeff * out;
        const g = u.gcd(total, den);
        const n = total / g, d = den / g;
        const sq = rem === 1 ? '' : '\\sqrt{' + rem + '}';
        const numStr = rem === 1 ? n + ' a^3' : (n === 1 ? sq + ' a^3' : n + ' ' + sq + ' a^3');
        return d === 1 ? '$V = ' + numStr + '$' : '$V = \\frac{' + numStr + '}{' + d + '}$';
      };

      const abStr = edge === 1 ? 'a' : edge + 'a';
      const saTex = rad(p);
      const u2 = edge * edge;
      const correct = fmtRadA3(u2, p, 3);
      const wrongs = [
        fmtRadA3(u2, p, 1),
        fmtRadA3(u2, p, 2),
        fmtRadA3(2 * u2, p, 1),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtRadA3(u2 + idx, p, 3)
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông và $AB = ' + abStr + '$. Biết $SA \\perp (ABCD)$ và $SA = ' + saTex + 'a$. Thể tích $V$ của khối chóp $S.ABCD$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích hình vuông $ABCD$ là $S_{ABCD} = AB^2 = ' + (u2 === 1 ? 'a^2' : u2 + 'a^2') + '$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABCD} \\cdot SA = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 1', params: { u: 1, p: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (√2 a³/3)', params: { u: 1, p: 2 }, expectedValid: true },
    ],
  },
};
