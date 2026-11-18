import { MathTemplate } from '../types/math';

export const G11_B13_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Mặt phẳng qua 3 trung điểm của 3 cạnh bên hình lăng trụ tam giác song song với hai đáy
  t11_b13_d01_prism_midpoints_plane_mc: {
    id: 't11_b13_d01_prism_midpoints_plane_mc',
    name: 'Mặt phẳng qua trung điểm ba cạnh bên hình lăng trụ song song với mặt đáy',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Cho hình lăng trụ tam giác và ba trung điểm của ba cạnh bên. Xác định mặt phẳng song song với mặt phẳng đi qua ba trung điểm đó.',
    conditionSummary: 'setIdx ∈ [0; 3], baseOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..3)', min: 0, max: 3 },
      { name: 'baseOpt', label: 'Mặt đáy hỏi (0: đáy dưới, 1: đáy trên)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, baseOpt } = params;
      if (setIdx < 0 || setIdx > 3 || (baseOpt !== 0 && baseOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, baseOpt } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"], m: ['E', 'G', 'N'] },
        { b: ['A', 'B', 'C'], t: ['A_1', 'B_1', 'C_1'], m: ['M', 'N', 'P'] },
        { b: ['M', 'N', 'P'], t: ["M'", "N'", "P'"], m: ['E', 'F', 'K'] },
        { b: ['D', 'E', 'F'], t: ['D_1', 'E_1', 'F_1'], m: ['I', 'J', 'K'] },
      ];
      const s = SETS[setIdx];
      const baseBot = s.b.join('');
      const baseTop = s.t.join('');
      const midPl = s.m.join('');

      const targetBase = baseOpt === 0 ? baseBot : baseTop;
      const correct = '$(' + midPl + ') \\parallel (' + targetBase + ')$';
      const w1 = '$(' + midPl + ') \\parallel (' + s.t[0] + s.b[1] + s.b[2] + ')$';
      const w2 = '$(' + midPl + ') \\parallel (' + s.b[1] + s.b[2] + s.t[2] + s.t[1] + ')$';
      const w3 = '$(' + midPl + ') \\parallel (' + s.b[2] + s.t[1] + s.t[0] + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$(' + midPl + ') \\parallel (' + s.b[0] + s.b[1] + s.t[1] + ')$ (' + j + ')'
      );

      return {
        stem: 'Cho hình lăng trụ $' + baseBot + '.' + baseTop + '$. Gọi $' + s.m[0] + ', ' + s.m[1] + '$ và $' + s.m[2] + '$ lần lượt là trung điểm của các cạnh $' + s.b[0] + s.t[0] + ', ' + s.b[1] + s.t[1] + '$ và $' + s.b[2] + s.t[2] + '$. Tìm khẳng định đúng.',
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
          'Trong hình bình hành $' + s.b[0] + s.b[1] + s.t[1] + s.t[0] + '$, đường trung bình $' + s.m[0] + s.m[1] + ' \\parallel ' + s.b[0] + s.b[1] + ' \\parallel ' + s.t[0] + s.t[1] + '$.',
          'Tương tự, $' + s.m[1] + s.m[2] + ' \\parallel ' + s.b[1] + s.b[2] + ' \\parallel ' + s.t[1] + s.t[2] + '$. Vì $' + s.m[0] + s.m[1] + ', ' + s.m[1] + s.m[2] + '$ cắt nhau và $' + s.m[0] + ' \\notin (' + targetBase + ')$ nên $(' + midPl + ') \\parallel (' + targetBase + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên baseOpt = 2', params: { setIdx: 0, baseOpt: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (ABC.A\'B\'C\', (EGN) // (ABC))', params: { setIdx: 0, baseOpt: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Hai mặt phẳng song song qua đỉnh đáy trên và 3 trung điểm cạnh bên hình lăng trụ
  t11_b13_d02_prism_diagonal_parallel_planes_mc: {
    id: 't11_b13_d02_prism_diagonal_parallel_planes_mc',
    name: 'Hai mặt phẳng song song tạo bởi đỉnh đáy và trung điểm các cạnh bên hình lăng trụ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Cho hình lăng trụ ABC.A1B1C1, E, G, N lần lượt là trung điểm AA1, BB1, CC1. Xác định cặp mặt phẳng song song (B1EN) // (GAC).',
    conditionSummary: 'setIdx ∈ [0; 3], swapEnd ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..3)', min: 0, max: 3 },
      { name: 'swapEnd', label: 'Đổi đầu (0: B1EN // GAC, 1: BEN // GA1C1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, swapEnd } = params;
      if (setIdx < 0 || setIdx > 3 || (swapEnd !== 0 && swapEnd !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, swapEnd } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ['A_1', 'B_1', 'C_1'], m: ['E', 'G', 'N'] },
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"], m: ['M', 'N', 'P'] },
        { b: ['M', 'N', 'P'], t: ['M_1', 'N_1', 'P_1'], m: ['E', 'F', 'K'] },
        { b: ['D', 'E', 'F'], t: ["D'", "E'", "F'"], m: ['I', 'J', 'K'] },
      ];
      const s = SETS[setIdx];
      const baseBot = s.b.join('');
      const baseTop = s.t.join('');
      const [m0, m1, m2] = s.m;
      const [b0, b1, b2] = s.b;
      const [t0, t1, t2] = s.t;

      const plMain = swapEnd === 0 ? t1 + m0 + m2 : b1 + m0 + m2;
      const plTarget = swapEnd === 0 ? m1 + b0 + b2 : m1 + t0 + t2;
      const plOpp = swapEnd === 0 ? m1 + t0 + t2 : m1 + b0 + b2;
      const plSamePt = swapEnd === 0 ? t1 + b0 + b2 : b1 + t0 + t2;
      const plBase = swapEnd === 0 ? baseBot : baseTop;

      const edge1a = swapEnd === 0 ? t1 + m0 : b1 + m0;
      const edge1b = swapEnd === 0 ? m1 + b0 : m1 + t0;
      const edge2a = swapEnd === 0 ? t1 + m2 : b1 + m2;
      const edge2b = swapEnd === 0 ? m1 + b2 : m1 + t2;

      const correct = '$(' + plMain + ') \\parallel (' + plTarget + ')$';
      const w1 = '$(' + plMain + ') \\parallel (' + plOpp + ')$';
      const w2 = '$(' + plMain + ') \\parallel (' + plSamePt + ')$';
      const w3 = '$(' + plMain + ') \\parallel (' + plBase + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$(' + plMain + ') \\parallel (' + (swapEnd === 0 ? baseTop : baseBot) + ')$ (' + j + ')'
      );

      return {
        stem: 'Cho hình lăng trụ $' + baseBot + '.' + baseTop + '$. Gọi $' + m0 + ', ' + m1 + '$ và $' + m2 + '$ lần lượt là trung điểm của các cạnh $' + b0 + t0 + ', ' + b1 + t1 + '$ và $' + b2 + t2 + '$. Tìm khẳng định đúng.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: b0, vF: b1, vR: b2, tL: t0, tF: t1, tR: t2 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong hình bình hành $' + b0 + b1 + t1 + t0 + '$, ta có $' + b0 + m0 + ' \\parallel ' + m1 + t1 + '$ và $' + b0 + m0 + ' = ' + m1 + t1 + '$ nên $' + b0 + m0 + t1 + m1 + '$ là hình bình hành (tương tự ở đầu đối diện), suy ra $' + edge1a + ' \\parallel ' + edge1b + '$.',
          'Chứng minh tương tự trong mặt bên $' + b1 + b2 + t2 + t1 + '$, ta có $' + edge2a + ' \\parallel ' + edge2b + '$. Do đó $(' + plMain + ') \\parallel (' + plTarget + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên swapEnd = 2', params: { setIdx: 0, swapEnd: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 ((B1EN) // (GAC))', params: { setIdx: 0, swapEnd: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Khái niệm và tính chất cơ bản của hình lăng trụ / hình hộp
  t11_b13_d03_prism_definition_mc: {
    id: 't11_b13_d03_prism_definition_mc',
    name: 'Nhận biết đặc điểm mặt đáy của hình lăng trụ và hình hộp',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Nhận biết phát biểu đúng về hình dạng mặt đáy của hình lăng trụ tam giác, tứ giác, lục giác hoặc hình hộp.',
    conditionSummary: 'mode ∈ [0; 3] (4 dạng hình lăng trụ/hình hộp)',
    paramSpecs: [
      { name: 'mode', label: 'Loại hình (0: tam giác, 1: tứ giác, 2: hình hộp, 3: lục giác)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) {
        return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          subject: 'hình lăng trụ',
          correct: 'Hình lăng trụ tam giác có đáy là hình tam giác',
          wrongs: [
            'Hình lăng trụ tam giác có đáy là các tam giác vuông',
            'Hình lăng trụ tam giác có đáy là các tam giác đều',
            'Hình lăng trụ tam giác có đáy là các tam giác cân',
          ],
          sol: 'Theo định nghĩa, hình lăng trụ tam giác có hai đáy là hai tam giác bằng nhau (không bắt buộc phải là tam giác vuông, cân hay đều).',
        },
        {
          subject: 'hình lăng trụ tứ giác',
          correct: 'Hình lăng trụ tứ giác có đáy là hình tứ giác',
          wrongs: [
            'Hình lăng trụ tứ giác có đáy là các hình vuông',
            'Hình lăng trụ tứ giác có đáy là các hình chữ nhật',
            'Hình lăng trụ tứ giác có đáy là các hình thoi',
          ],
          sol: 'Hình lăng trụ tứ giác nói chung có hai đáy là hai tứ giác bằng nhau và nằm trên hai mặt phẳng song song.',
        },
        {
          subject: 'hình hộp',
          correct: 'Hình hộp có sáu mặt đều là hình bình hành',
          wrongs: [
            'Hình hộp có sáu mặt đều là hình chữ nhật',
            'Hình hộp có sáu mặt đều là hình vuông',
            'Hình hộp có sáu mặt đều là hình thoi',
          ],
          sol: 'Hình hộp là hình lăng trụ có đáy là hình bình hành, do đó tất cả sáu mặt của hình hộp đều là hình bình hành.',
        },
        {
          subject: 'hình lăng trụ ngũ giác',
          correct: 'Hình lăng trụ ngũ giác có hai đáy là hai hình ngũ giác bằng nhau',
          wrongs: [
            'Hình lăng trụ ngũ giác có đáy bắt buộc là ngũ giác đều',
            'Hình lăng trụ ngũ giác có các mặt bên là hình tam giác',
            'Hình lăng trụ ngũ giác có hai đáy nằm trên hai mặt phẳng cắt nhau',
          ],
          sol: 'Hai đáy của hình lăng trụ ngũ giác là hai ngũ giác bằng nhau nằm trong hai mặt phẳng song song, còn các mặt bên đều là hình bình hành.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);

      return {
        stem: 'Tìm khẳng định đúng về ' + item.subject + '.',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (hình lăng trụ tam giác)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Nhận biết cặp đỉnh đối diện của hình hộp
  t11_b13_d04_box_opposite_vertices_mc: {
    id: 't11_b13_d04_box_opposite_vertices_mc',
    name: 'Xác định hai đỉnh đối diện của hình hộp',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Cho hình hộp ABCD.EFGH (hoặc ABCD.A\'B\'C\'D\', ABCD.A1B1C1D1). Xác định cặp điểm là hai đỉnh đối diện.',
    conditionSummary: 'setIdx ∈ [0; 2], pairIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Kiểu ký hiệu hình hộp (0..2)', min: 0, max: 2 },
      { name: 'pairIdx', label: 'Đỉnh đáy chọn (0: A, 1: B, 2: C, 3: D)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, pairIdx } = params;
      if (setIdx < 0 || setIdx > 2 || pairIdx < 0 || pairIdx > 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, pairIdx } = params;
      const SETS = [
        { b: ['A', 'B', 'C', 'D'], t: ['E', 'F', 'G', 'H'], variant: 3 },
        { b: ['A', 'B', 'C', 'D'], t: ["A'", "B'", "C'", "D'"], variant: 1 },
        { b: ['A', 'B', 'C', 'D'], t: ['A_1', 'B_1', 'C_1', 'D_1'], variant: 0 },
      ];
      const s = SETS[setIdx];
      const botName = s.b.join('');
      const topName = s.t.join('');

      const bk = s.b[pairIdx];
      const tk = s.t[pairIdx];
      const tOpp = s.t[(pairIdx + 2) % 4];
      const bNext = s.b[(pairIdx + 1) % 4];
      const tNext = s.t[(pairIdx + 1) % 4];

      const correct = '$' + bk + '$ và $' + tOpp + '$';
      const w1 = '$' + tNext + '$ và $' + bk + '$';
      const w2 = '$' + bNext + '$ và $' + tOpp + '$';
      const w3 = '$' + tNext + '$ và $' + s.t[(pairIdx + 3) % 4] + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$' + tk + '$ và $' + bk + '$ (' + j + ')'
      );

      return {
        stem: 'Cho hình hộp $' + botName + '.' + topName + '$. Cặp điểm nào sau đây là hai đỉnh đối diện.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: s.variant },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong hình hộp $' + botName + '.' + topName + '$, các đường chéo của hình hộp nối hai đỉnh đối diện gồm $' + s.b[0] + s.t[2] + ', ' + s.b[1] + s.t[3] + ', ' + s.b[2] + s.t[0] + ', ' + s.b[3] + s.t[1] + '$.',
          'Do đó $' + bk + '$ và $' + tOpp + '$ là hai đỉnh đối diện nhau (các cặp điểm còn lại cùng nằm trên một mặt của hình hộp).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pairIdx = 4', params: { setIdx: 0, pairIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (ABCD.EFGH, D và F)', params: { setIdx: 0, pairIdx: 3 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Đường chéo hai mặt bên đối diện song song trong hình hộp
  t11_b13_d05_box_parallel_face_diagonals_mc: {
    id: 't11_b13_d05_box_parallel_face_diagonals_mc',
    name: 'Đường chéo của hai mặt đối diện song song trong hình hộp',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Cho hình hộp ABCD.EFGH. Tìm hai đường chéo của hai mặt bên đối diện song song với nhau.',
    conditionSummary: 'setIdx ∈ [0; 2], edgeIdx ∈ [0; 3], dirOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Kiểu ký hiệu hình hộp (0..2)', min: 0, max: 2 },
      { name: 'edgeIdx', label: 'Mặt bên xuất phát (0..3)', min: 0, max: 3 },
      { name: 'dirOpt', label: 'Chiều đường chéo (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, edgeIdx, dirOpt } = params;
      if (setIdx < 0 || setIdx > 2 || edgeIdx < 0 || edgeIdx > 3 || (dirOpt !== 0 && dirOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, edgeIdx, dirOpt } = params;
      const SETS = [
        { b: ['A', 'B', 'C', 'D'], t: ['E', 'F', 'G', 'H'], variant: 3 },
        { b: ['A', 'B', 'C', 'D'], t: ["A'", "B'", "C'", "D'"], variant: 1 },
        { b: ['A', 'B', 'C', 'D'], t: ['A_1', 'B_1', 'C_1', 'D_1'], variant: 0 },
      ];
      const s = SETS[setIdx];
      const i = edgeIdx;
      const b0 = s.b[i], b1 = s.b[(i + 1) % 4], b2 = s.b[(i + 2) % 4], b3 = s.b[(i + 3) % 4];
      const t0 = s.t[i], t1 = s.t[(i + 1) % 4], t2 = s.t[(i + 2) % 4], t3 = s.t[(i + 3) % 4];

      const mainDiag = dirOpt === 0 ? b0 + t1 : b1 + t0;
      const parDiag = dirOpt === 0 ? t2 + b3 : t3 + b2;
      const skewOpp = dirOpt === 0 ? b2 + t3 : b3 + t2;
      const adjEdge = b1 + b2;
      const oppEdge = b2 + b3;

      const correct = '$' + mainDiag + ' \\parallel ' + parDiag + '$';
      const w1 = '$' + mainDiag + ' \\parallel ' + skewOpp + '$';
      const w2 = '$' + mainDiag + ' \\parallel ' + adjEdge + '$';
      const w3 = '$' + mainDiag + ' \\parallel ' + oppEdge + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$' + mainDiag + ' \\parallel ' + b0 + t0 + '$ (' + j + ')'
      );

      const paraQuad = dirOpt === 0 ? b0 + t1 + t2 + b3 : b1 + t0 + t3 + b2;

      return {
        stem: 'Cho hình hộp $' + s.b.join('') + '.' + s.t.join('') + '$. Tìm khẳng định đúng.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: s.variant },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong hình hộp $' + s.b.join('') + '.' + s.t.join('') + '$, ta có $' + (dirOpt === 0 ? b0 + b3 + ' \\parallel ' + t1 + t2 : b1 + b2 + ' \\parallel ' + t0 + t3) + '$ và bằng nhau nên $' + paraQuad + '$ là hình bình hành.',
          'Suy ra hai cạnh đối của hình bình hành song song với nhau: $' + mainDiag + ' \\parallel ' + parDiag + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dirOpt = 2', params: { setIdx: 0, edgeIdx: 0, dirOpt: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (ABCD.EFGH, AF // GD)', params: { setIdx: 0, edgeIdx: 0, dirOpt: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Phân biệt cặp đường chéo song song với các đoạn nối trung điểm trong hình hộp
  t11_b13_d06_box_midpoints_vs_parallel_diag_mc: {
    id: 't11_b13_d06_box_midpoints_vs_parallel_diag_mc',
    name: 'Nhận biết hai đường chéo mặt bên song song giữa các giả thiết trung điểm trong hình hộp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Cho hình hộp ABCD.EFGH với ba trung điểm M, N, P trên ba cạnh đáy. Xác định khẳng định đúng về hai đường thẳng song song.',
    conditionSummary: 'setIdx ∈ [0; 2], edgeIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Kiểu ký hiệu hình hộp (0..2)', min: 0, max: 2 },
      { name: 'edgeIdx', label: 'Góc xoay đáy (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, edgeIdx } = params;
      if (setIdx < 0 || setIdx > 2 || edgeIdx < 0 || edgeIdx > 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, edgeIdx } = params;
      const SETS = [
        { b: ['A', 'B', 'C', 'D'], t: ['E', 'F', 'G', 'H'], m: ['M', 'N', 'P'], variant: 3 },
        { b: ['A', 'B', 'C', 'D'], t: ["A'", "B'", "C'", "D'"], m: ['M', 'N', 'P'], variant: 1 },
        { b: ['A', 'B', 'C', 'D'], t: ['A_1', 'B_1', 'C_1', 'D_1'], m: ['I', 'J', 'K'], variant: 0 },
      ];
      const s = SETS[setIdx];
      const i = edgeIdx;
      const b0 = s.b[i], b1 = s.b[(i + 1) % 4], b2 = s.b[(i + 2) % 4], b3 = s.b[(i + 3) % 4];
      const t0 = s.t[i], t1 = s.t[(i + 1) % 4], t2 = s.t[(i + 2) % 4], t3 = s.t[(i + 3) % 4];
      const [M, N, P] = s.m;

      const e1 = b0 + b1;
      const e2 = b0 + b3;
      const e3 = b2 + b3;

      const correct = '$' + t0 + b1 + ' \\parallel ' + b2 + t3 + '$';
      const w1 = '$' + b1 + t1 + ' \\parallel ' + t3 + M + '$';
      const w2 = '$' + M + P + ' \\parallel ' + t1 + t3 + '$';
      const w3 = '$' + b0 + M + ' \\parallel ' + b1 + b3 + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$' + M + N + ' \\parallel ' + t1 + t2 + '$ (' + j + ')'
      );

      return {
        stem: 'Cho hình hộp $' + s.b.join('') + '.' + s.t.join('') + '$. Gọi $' + M + ', ' + N + ', ' + P + '$ lần lượt là các trung điểm của các cạnh $' + e1 + ', ' + e2 + ', ' + e3 + '$. Tìm khẳng định đúng.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: s.variant },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + b0 + b3 + ' \\parallel ' + b1 + b2 + '$ và $' + t0 + b0 + ' \\parallel ' + t3 + b3 + '$ (cùng bằng nhau) nên tứ giác $' + t0 + b1 + b2 + t3 + '$ có $' + t0 + t3 + ' \\parallel ' + b1 + b2 + '$ và $' + t0 + t3 + ' = ' + b1 + b2 + '$, suy ra là hình bình hành.',
          'Do đó hai cạnh đối song song với nhau: $' + t0 + b1 + ' \\parallel ' + b2 + t3 + '$. (Còn $' + M + P + ' \\parallel ' + b0 + b3 + '$ không song song đường chéo $' + t1 + t3 + '$, và $' + b0 + M + '$ cắt $' + b1 + b3 + '$ tại $' + b1 + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên edgeIdx = 4', params: { setIdx: 0, edgeIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (ABCD.EFGH, EB // CH)', params: { setIdx: 0, edgeIdx: 0 }, expectedValid: true },
    ],
  },
};
