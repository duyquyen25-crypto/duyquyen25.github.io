import { MathTemplate } from '../types/math';

export const G11_B26_MC_PART1: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Khẳng định đúng)
  t11_b26_d01_proj_prop_correct_mc: {
    id: 't11_b26_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Nhận biết khẳng định đúng về tính chất của phép chiếu song song.',
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
          correct: 'Phép chiếu song song có thể biến đường tròn thành đường elip',
          wrongs: [
            'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
            'Phép chiếu song song bảo toàn góc trong tam giác',
          ],
          sol: 'Khi mặt phẳng chứa đường tròn không song song với mặt phẳng chiếu và không chứa phương chiếu, phép chiếu song song biến đường tròn thành đường elip.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và giữ nguyên thứ tự',
          wrongs: [
            'Phép chiếu song song bảo toàn diện tích của hình phẳng',
            'Phép chiếu song song bảo toàn tính vuông góc của hai đường thẳng',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng và thứ tự của ba điểm thẳng hàng.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song luôn biến hai đường thẳng chéo nhau thành hai đường thẳng song song',
            'Phép chiếu song song bảo toàn chu vi tam giác',
            'Phép chiếu song song bảo toàn góc giữa hai đường thẳng bất kì',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song (không song song phương chiếu) là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song giữ nguyên độ dài mọi đoạn thẳng',
            'Phép chiếu song song bảo toàn hình dạng của đa giác',
            'Phép chiếu song song biến hình chữ nhật luôn thành hình chữ nhật',
          ],
          sol: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc trên hai đường thẳng song song.',
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
  t11_b26_d02_proj_prop_wrong_mc: {
    id: 't11_b26_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Nhận biết khẳng định sai về phép chiếu song song.',
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
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và bảo toàn thứ tự của chúng',
          ],
          sol: 'Hình chiếu song song của đường tròn là đường tròn, đường elip hoặc một đoạn thẳng, không thể là một điểm nên khẳng định trên sai.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn độ dài của đoạn thẳng',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song biến trung điểm đoạn thẳng thành trung điểm hình chiếu',
          ],
          sol: 'Phép chiếu song song nói chung làm thay đổi độ dài đoạn thẳng (chỉ giữ nguyên tỉ số trên các đường song song).',
        },
        {
          correct: 'Phép chiếu song song bảo toàn góc trong tam giác',
          wrongs: [
            'Phép chiếu song song biến tam giác thành tam giác hoặc đoạn thẳng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn số đo góc.',
        },
        {
          correct: 'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          wrongs: [
            'Hình chiếu song song của hai đường thẳng chéo nhau là hai đường thẳng đồng phẳng',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song biến ba đường thẳng đồng quy (không song song phương chiếu) thành ba đường thẳng đồng quy',
          ],
          sol: 'Hình chiếu song song của mọi đường thẳng đều nằm trên cùng một mặt phẳng chiếu nên không thể chéo nhau.',
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

  // D03 (Q3): Hình chiếu song song của hình phẳng và đường tròn
  t11_b26_d03_proj_shape_mc: {
    id: 't11_b26_d03_proj_shape_mc',
    name: 'Hình chiếu song song của hình tròn và đa giác đặc biệt',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Nhận biết tính chất hình chiếu song song của đường tròn, hình thoi, hình thang, tam giác đều.',
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
          correct: 'Hình chiếu song song của một đường tròn là một đường elip, đường tròn hoặc một đoạn thẳng',
          wrongs: [
            'Hình chiếu song song của hình thoi luôn là một hình thoi',
            'Hình chiếu song song của một tam giác đều luôn là một tam giác cân',
            'Hình chiếu song song của hình thang luôn là một hình chữ nhật',
          ],
          sol: 'Tùy vị trí mặt phẳng chứa đường tròn so với phương chiếu và mặt phẳng chiếu, hình chiếu song song của đường tròn là đường tròn, đường elip hoặc một đoạn thẳng.',
        },
        {
          correct: 'Hình chiếu song song của một hình thoi (mặt phẳng không chứa phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình vuông luôn là một hình vuông',
            'Hình chiếu song song của hình thang luôn là một hình bình hành',
            'Hình chiếu song song của hình chữ nhật luôn là một hình thoi',
          ],
          sol: 'Vì hình thoi có các cặp cạnh đối song song và phép chiếu song song bảo toàn tính song song nên hình chiếu là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của một hình thang (mặt phẳng không chứa phương chiếu) là một hình thang',
          wrongs: [
            'Hình chiếu song song của một tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của một hình thang luôn là hình bình hành',
            'Hình chiếu song song của một đường tròn có thể là một hình vuông',
          ],
          sol: 'Phép chiếu song song bảo toàn hai cạnh đáy song song nên hình chiếu của hình thang (không song song phương chiếu) là một hình thang.',
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

  // D04 (Q4): Chiếu đỉnh đáy dưới của lăng trụ ABC.A'B'C' lên mặt đáy trên
  t11_b26_d04_prism_proj_top_mc: {
    id: 't11_b26_d04_prism_proj_top_mc',
    name: 'Hình chiếu song song của đỉnh lăng trụ lên đáy trên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Xác định hình chiếu song song của một đỉnh đáy dưới lên mặt đáy trên theo phương cạnh bên.',
    conditionSummary: 'vIdx ∈ [0; 2], dirIdx ∈ [0; 2], setIdx ∈ [0; 1]',
    paramSpecs: [
      { name: 'vIdx', label: 'Đỉnh được chiếu (0: A, 1: B, 2: C)', min: 0, max: 2 },
      { name: 'dirIdx', label: 'Cạnh bên làm phương chiếu (0..2)', min: 0, max: 2 },
      { name: 'setIdx', label: 'Ký hiệu lăng trụ (0: ABC.A\'B\'C\', 1: ABC.A_1B_1C_1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { vIdx, dirIdx, setIdx } = params;
      if (vIdx < 0 || vIdx > 2 || dirIdx < 0 || dirIdx > 2 || setIdx < 0 || setIdx > 1) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, dirIdx, setIdx } = params;
      const bots = ['A', 'B', 'C'];
      const tops = setIdx === 0 ? ["A'", "B'", "C'"] : ['A_1', 'B_1', 'C_1'];
      const V = bots[vIdx];
      const Vp = tops[vIdx];
      const dir = tops[dirIdx] + bots[dirIdx];
      const topPlane = tops.join('');

      const otherBot = bots.filter((_, i) => i !== vIdx);
      const otherTop = tops.filter((_, i) => i !== vIdx);
      const correct = 'Điểm $' + Vp + '$';
      const wrongs = [
        'Điểm $' + otherTop[0] + '$',
        'Điểm $' + otherTop[1] + '$',
        'Điểm $' + otherBot[0] + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $ABC.' + topPlane + '$. Hình chiếu song song của điểm $' + V + '$ lên mặt phẳng $(' + topPlane + ')$ theo phương $' + dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: tops[0], tF: tops[1], tR: tops[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + V + Vp + ' \\parallel ' + dir + '$ (hoặc trùng phương) và $' + Vp + ' \\in (' + topPlane + ')$ nên hình chiếu song song của $' + V + '$ lên $(' + topPlane + ')$ là điểm $' + Vp + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { vIdx: 3, dirIdx: 2, setIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { vIdx: 0, dirIdx: 2, setIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu đỉnh đáy trên của lăng trụ ABC.DEF lên mặt đáy (ABC)
  t11_b26_d05_prism_proj_def_mc: {
    id: 't11_b26_d05_prism_proj_def_mc',
    name: 'Hình chiếu song song trên lăng trụ ABC.DEF lên mặt đáy',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Xác định hình chiếu song song của đỉnh đáy trên lên mặt đáy (ABC) theo phương cạnh bên.',
    conditionSummary: 'vIdx ∈ [0; 2], dirIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'vIdx', label: 'Đỉnh được chiếu (0: D, 1: E, 2: F)', min: 0, max: 2 },
      { name: 'dirIdx', label: 'Phương cạnh bên (0: AD, 1: BE, 2: CF)', min: 0, max: 2 },
    ],
    validateCode: `
      const { vIdx, dirIdx } = params;
      if (vIdx < 0 || vIdx > 2 || dirIdx < 0 || dirIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, dirIdx } = params;
      const bots = ['A', 'B', 'C'];
      const tops = ['D', 'E', 'F'];
      const dirs = ['AD', 'BE', 'CF'];
      const Dp = tops[vIdx];
      const Bp = bots[vIdx];
      const dir = dirs[dirIdx];

      const otherTop = tops.filter((_, i) => i !== vIdx);
      const otherBot = bots.filter((_, i) => i !== vIdx);
      const correct = 'Điểm $' + Bp + '$';
      const wrongs = [
        'Điểm $' + Dp + '$',
        'Điểm $' + otherTop[0] + '$',
        'Điểm $' + otherBot[0] + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình lăng trụ $ABC.DEF$. Hình chiếu song song của điểm $' + Dp + '$ lên mặt phẳng $(ABC)$ theo phương $' + dir + '$ là điểm nào?',
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
          'Vì đường thẳng qua $' + Dp + '$ song song (hoặc trùng) với $' + dir + '$ chính là cạnh bên $' + Dp + Bp + '$ và $' + Bp + ' \\in (ABC)$ nên hình chiếu là điểm $' + Bp + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dirIdx = 3', params: { vIdx: 0, dirIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5', params: { vIdx: 0, dirIdx: 1 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Khoảng cách từ B đến (SAD) trong chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD)
  t11_b26_d06_pyr_rect_pt_plane_direct_mc: {
    id: 't11_b26_d06_pyr_rect_pt_plane_direct_mc',
    name: 'Khoảng cách từ đỉnh đáy đến mặt bên chứa đường cao',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), AB = u·a, AD = v·a. Tính d(B, (SAD)) hoặc d(D, (SAB)).',
    conditionSummary: 'u ∈ [3; 12], v ∈ [4; 16], u ≠ v, mode ∈ {0, 1}',
    paramSpecs: [
      { name: 'u', label: 'Độ dài AB = u·a', min: 3, max: 12 },
      { name: 'v', label: 'Độ dài AD = v·a', min: 4, max: 16 },
      { name: 'mode', label: '0: d(B,(SAD)), 1: d(D,(SAB))', min: 0, max: 1 },
    ],
    validateCode: `
      const { u: ab, v: ad, mode } = params;
      if (ab < 3 || ab > 12 || ad < 4 || ad > 16 || (mode !== 0 && mode !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (ab === ad) {
        return { valid: false, reason: 'AB và AD phải khác nhau để tránh trùng đáp án' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: ad, mode } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };

      const ansNum = mode === 0 ? ab : ad;
      const otherNum = mode === 0 ? ad : ab;
      const targetPt = mode === 0 ? 'B' : 'D';
      const targetPlane = mode === 0 ? '(SAD)' : '(SAB)';
      const edgeName = mode === 0 ? 'BA' : 'DA';
      const perpEdge = mode === 0 ? 'AD' : 'AB';

      const correct = '$' + ansNum + 'a$';
      const wrongs = [
        '$' + otherNum + 'a$',
        '$' + rad(ab + ad) + 'a$',
        '$' + rad(ab * ab + ad * ad) + 'a$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (ansNum + idx * 3 + 1) + 'a$'
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$. Biết $AB = ' + ab + 'a$, $AD = ' + ad + 'a$. Tính khoảng cách từ điểm $' + targetPt + '$ đến mặt phẳng $' + targetPlane + '$.',
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
          'Vì đáy $ABCD$ là hình chữ nhật nên $' + edgeName + ' \\perp ' + perpEdge + '$.',
          'Mặt khác $SA \\perp (ABCD) \\Rightarrow ' + edgeName + ' \\perp SA$, do đó $' + edgeName + ' \\perp ' + targetPlane + '$.',
          'Vậy $d(' + targetPt + ', ' + targetPlane + ') = ' + edgeName + ' = ' + ansNum + 'a$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = v', params: { u: 6, v: 6, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (8a)', params: { u: 8, v: 14, mode: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Khoảng cách từ M ∈ SC (SM = k MC) đến (SAB)
  t11_b26_d07_pyr_rect_ratio_sc_mc: {
    id: 't11_b26_d07_pyr_rect_ratio_sc_mc',
    name: 'Khoảng cách từ điểm chia đoạn SC đến mặt phẳng (SAB)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), M ∈ SC với SM = k·MC. Tính d(M, (SAB)).',
    conditionSummary: 'u ∈ [4; 10], v ∈ [5; 15], k ∈ [2; 5], u ≠ v',
    paramSpecs: [
      { name: 'u', label: 'Độ dài AB = u·a', min: 4, max: 10 },
      { name: 'v', label: 'Độ dài AD = v·a', min: 5, max: 15 },
      { name: 'k', label: 'Tỉ số SM = k·MC', min: 2, max: 5 },
    ],
    validateCode: `
      const { u: ab, v: ad, k } = params;
      if (ab < 4 || ab > 10 || ad < 5 || ad > 15 || k < 2 || k > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (ab === ad) return { valid: false, reason: 'AB ≠ AD' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: ad, k } = params;
      const den = k + 1;
      const fAns = u.simplifyFrac(k * ad, den);
      const fW1 = u.simplifyFrac(k * ab, den);
      const fW2 = u.simplifyFrac(ad, den);
      const fmtA = (f) => '$' + f.latex + 'a$';

      const correct = fmtA(fAns);
      const wrongs = [
        fmtA(fW1),
        '$' + (k * ab) + 'a$',
        fmtA(fW2),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (ad + idx) + 'a$'
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$. Biết $AB = ' + ab + 'a$, $AD = ' + ad + 'a$. Gọi $M$ là điểm thuộc cạnh $SC$ sao cho $SM = ' + k + 'MC$. Tính khoảng cách từ điểm $M$ đến mặt phẳng $(SAB)$.',
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
          'Vì $CB \\perp AB$ và $CB \\perp SA$ nên $CB \\perp (SAB) \\Rightarrow d(C, (SAB)) = CB = AD = ' + ad + 'a$.',
          'Do $M \\in SC$ và $SM = ' + k + 'MC$ nên $\\dfrac{d(M, (SAB))}{d(C, (SAB))} = \\dfrac{SM}{SC} = \\dfrac{' + k + '}{' + den + '}$.',
          'Suy ra $d(M, (SAB)) = \\dfrac{' + k + '}{' + den + '} \\cdot ' + ad + 'a = ' + fAns.latex + 'a$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { u: 8, v: 11, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (44/5 a)', params: { u: 8, v: 11, k: 4 }, expectedValid: true },
    ],
  },
};
