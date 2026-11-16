import { MathTemplate } from '../types/math';

export const G12_B6_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (11 DẠNG: DẠNG 1 -> DẠNG 11)
  // =====================================================================

  // Dạng 1 (Q1)
  t12_b6_d01_box_equal_vec_mc: {
    id: 't12_b6_d01_box_equal_vec_mc',
    name: 'Xác định vectơ bằng vectơ cho trước trong hình hộp ABCD.A1B1C1D1',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vectơ bằng nhau trong không gian',
    description:
      'Cho hình hộp ABCD.A1B1C1D1 (kèm hình minh họa). Tìm vectơ khác vectơ-không có điểm đầu và điểm cuối là các đỉnh của hình hộp bằng một vectơ chéo mặt cho trước.',
    conditionSummary: 'edgeIdx ∈ {0..7} chọn một vectơ chéo mặt bên của hình hộp ABCD.A1B1C1D1',
    paramSpecs: [{ name: 'edgeIdx', label: 'Chỉ số vectơ mẫu (0..7)', min: 0, max: 7 }],
    validateCode: `
      const { edgeIdx } = params;
      if (!Number.isInteger(edgeIdx) || edgeIdx < 0 || edgeIdx > 7) {
        return { valid: false, reason: 'edgeIdx phải là số nguyên thuộc [0; 7]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const cases = [
        {
          target: '\\overrightarrow{C_1D}',
          correct: '\\overrightarrow{B_1A}',
          distractors: ['\\overrightarrow{A_1B_1}', '\\overrightarrow{BA_1}', '\\overrightarrow{A_1B}'],
          why: 'Do $B_1C_1 // AD$ và $B_1C_1 = AD$ nên tứ giác $AB_1C_1D$ là hình bình hành, suy ra $C_1D // B_1A$, cùng độ dài và cùng hướng nên $\\overrightarrow{C_1D} = \\overrightarrow{B_1A}$.',
        },
        {
          target: '\\overrightarrow{B_1C}',
          correct: '\\overrightarrow{A_1D}',
          distractors: ['\\overrightarrow{DA_1}', '\\overrightarrow{C_1B}', '\\overrightarrow{AB_1}'],
          why: 'Do $A_1B_1CD$ là hình bình hành nên $\\overrightarrow{B_1C} = \\overrightarrow{A_1D}$.',
        },
        {
          target: '\\overrightarrow{A_1D}',
          correct: '\\overrightarrow{B_1C}',
          distractors: ['\\overrightarrow{CB_1}', '\\overrightarrow{D_1A}', '\\overrightarrow{CD_1}'],
          why: 'Do $A_1B_1CD$ là hình bình hành nên $\\overrightarrow{A_1D} = \\overrightarrow{B_1C}$.',
        },
        {
          target: '\\overrightarrow{D_1C}',
          correct: '\\overrightarrow{A_1B}',
          distractors: ['\\overrightarrow{BA_1}', '\\overrightarrow{C_1D}', '\\overrightarrow{AD_1}'],
          why: 'Do $A_1D_1CB$ là hình bình hành nên $\\overrightarrow{D_1C} = \\overrightarrow{A_1B}$.',
        },
        {
          target: '\\overrightarrow{AB_1}',
          correct: '\\overrightarrow{DC_1}',
          distractors: ['\\overrightarrow{C_1D}', '\\overrightarrow{B_1A}', '\\overrightarrow{CD_1}'],
          why: 'Do $AD // B_1C_1$ và $AD = B_1C_1$ nên tứ giác $AB_1C_1D$ là hình bình hành, suy ra $\\overrightarrow{AB_1} = \\overrightarrow{DC_1}$.',
        },
        {
          target: '\\overrightarrow{BC_1}',
          correct: '\\overrightarrow{AD_1}',
          distractors: ['\\overrightarrow{D_1A}', '\\overrightarrow{C_1B}', '\\overrightarrow{BA_1}'],
          why: 'Do $AD_1C_1B$ là hình bình hành nên $\\overrightarrow{BC_1} = \\overrightarrow{AD_1}$.',
        },
        {
          target: '\\overrightarrow{DC_1}',
          correct: '\\overrightarrow{AB_1}',
          distractors: ['\\overrightarrow{B_1A}', '\\overrightarrow{C_1D}', '\\overrightarrow{BC_1}'],
          why: 'Do $AB_1C_1D$ là hình bình hành nên $\\overrightarrow{DC_1} = \\overrightarrow{AB_1}$.',
        },
        {
          target: '\\overrightarrow{B_1A}',
          correct: '\\overrightarrow{C_1D}',
          distractors: ['\\overrightarrow{DC_1}', '\\overrightarrow{AB_1}', '\\overrightarrow{A_1B}'],
          why: 'Do $AB_1C_1D$ là hình bình hành nên $B_1A // C_1D$, cùng độ dài và cùng hướng, suy ra $\\overrightarrow{B_1A} = \\overrightarrow{C_1D}$.',
        },
      ];
      const item = cases[params.edgeIdx];
      const correctOpt = '$' + item.correct + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correctOpt,
        item.distractors.map((d) => '$' + d + '$'),
        rng
      );

      return {
        stem: 'Cho hình hộp $ABCD.A_1B_1C_1D_1$. Vectơ có điểm đầu và điểm cuối là các đỉnh của hình hộp và bằng vectơ $' + item.target + '$ là:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 0 },
        },
        options,
        correctIndex,
        answerSummary: correctOpt,
        solutionSteps: [
          'Hai vectơ bằng nhau khi và chỉ khi chúng cùng hướng và có cùng độ dài.',
          item.why,
          'Vậy ' + correctOpt + ' là khẳng định đúng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên edgeIdx = -1 (ngoài miền)', params: { edgeIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc C1D = B1A', params: { edgeIdx: 0 }, expectedValid: true },
      { label: 'Biên cuối edgeIdx = 7', params: { edgeIdx: 7 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2)
  t12_b6_d02_space_3pts_rule_mc: {
    id: 't12_b6_d02_space_3pts_rule_mc',
    name: 'Quy tắc ba điểm (cộng, trừ vectơ) trong không gian',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc ba điểm trong không gian',
    description:
      'Cho ba điểm phân biệt trong không gian (thay đổi tên điểm động). Nhận diện đẳng thức cộng hoặc trừ vectơ đúng theo quy tắc ba điểm.',
    conditionSummary: 'tripleIdx ∈ {0..5}, opType ∈ {0, 1} (0: quy tắc hiệu, 1: quy tắc cộng)',
    paramSpecs: [
      { name: 'tripleIdx', label: 'Bộ 3 điểm (0..5)', min: 0, max: 5 },
      { name: 'opType', label: 'Loại quy tắc (0: hiệu, 1: cộng)', min: 0, max: 1 },
    ],
    validateCode: `
      const { tripleIdx, opType } = params;
      if (!Number.isInteger(tripleIdx) || tripleIdx < 0 || tripleIdx > 5) {
        return { valid: false, reason: 'tripleIdx phải thuộc [0; 5]' };
      }
      if (opType !== 0 && opType !== 1) {
        return { valid: false, reason: 'opType chỉ nhận 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const triples = [
        ['P', 'G', 'L'],
        ['M', 'N', 'K'],
        ['A', 'B', 'C'],
        ['E', 'F', 'H'],
        ['I', 'J', 'K'],
        ['X', 'Y', 'Z'],
      ];
      const [p, q, r] = triples[params.tripleIdx];
      const isDiff = params.opType === 0;

      const correct = isDiff
        ? '$\\overrightarrow{' + p + q + '} - \\overrightarrow{' + p + r + '} = \\overrightarrow{' + r + q + '}$'
        : '$\\overrightarrow{' + p + q + '} + \\overrightarrow{' + q + r + '} = \\overrightarrow{' + p + r + '}$';

      const distractors = isDiff
        ? [
            '$\\overrightarrow{' + p + r + '} + \\overrightarrow{' + q + r + '} = \\overrightarrow{' + p + q + '}$',
            '$\\overrightarrow{' + p + q + '} + \\overrightarrow{' + p + r + '} = \\overrightarrow{' + q + r + '}$',
            '$\\overrightarrow{' + p + r + '} - \\overrightarrow{' + q + r + '} = \\overrightarrow{' + q + p + '}$',
          ]
        : [
            '$\\overrightarrow{' + p + q + '} + \\overrightarrow{' + q + r + '} = \\overrightarrow{' + r + p + '}$',
            '$\\overrightarrow{' + p + q + '} - \\overrightarrow{' + p + r + '} = \\overrightarrow{' + q + r + '}$',
            '$\\overrightarrow{' + p + r + '} + \\overrightarrow{' + q + r + '} = \\overrightarrow{' + p + q + '}$',
          ];

      const { options, correctIndex } = u.buildUniqueMcOptions(correct, distractors, rng);

      return {
        stem: 'Trong không gian, cho các điểm $' + p + ',\\, ' + q + ',\\, ' + r + '$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          isDiff
            ? 'Áp dụng quy tắc hiệu với chung điểm đầu $' + p + '$: $\\overrightarrow{' + p + q + '} - \\overrightarrow{' + p + r + '} = \\overrightarrow{' + r + q + '}$.'
            : 'Áp dụng quy tắc ba điểm (cộng nối tiếp): $\\overrightarrow{' + p + q + '} + \\overrightarrow{' + q + r + '} = \\overrightarrow{' + p + r + '}$.',
          'Do đó khẳng định đúng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên opType = 2 (ngoài miền)', params: { tripleIdx: 0, opType: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc P, G, L', params: { tripleIdx: 0, opType: 0 }, expectedValid: true },
      { label: 'Biến thể quy tắc cộng', params: { tripleIdx: 2, opType: 1 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3)
  t12_b6_d03_box_diag_rule_mc: {
    id: 't12_b6_d03_box_diag_rule_mc',
    name: "Quy tắc hình hộp trong hình hộp ABCD.A'B'C'D'",
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc hình hộp',
    description:
      "Cho hình hộp ABCD.A'B'C'D' (kèm hình minh họa). Chọn đỉnh xuất phát động và xác định tổng 3 vectơ cạnh chung đỉnh bằng vectơ đường chéo hình hộp.",
    conditionSummary: 'vertexIdx ∈ {0..7} chọn 1 trong 8 đỉnh của hình hộp',
    paramSpecs: [{ name: 'vertexIdx', label: 'Chỉ số đỉnh (0..7)', min: 0, max: 7 }],
    validateCode: `
      const { vertexIdx } = params;
      if (!Number.isInteger(vertexIdx) || vertexIdx < 0 || vertexIdx > 7) {
        return { valid: false, reason: 'vertexIdx phải thuộc [0; 7]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const corners = [
        { v: "A", e1: "A'", e2: "B", e3: "D", opp: "C'", wrong: ["C'A'", "CA'", "A'C'"] },
        { v: "B", e1: "B'", e2: "A", e3: "C", opp: "D'", wrong: ["D'B'", "DB'", "B'D'"] },
        { v: "C", e1: "C'", e2: "B", e3: "D", opp: "A'", wrong: ["A'C'", "AC'", "C'A'"] },
        { v: "D", e1: "D'", e2: "A", e3: "C", opp: "B'", wrong: ["B'D'", "BD'", "D'B'"] },
        { v: "A'", e1: "A", e2: "B'", e3: "D'", opp: "C", wrong: ["CA", "C'A", "AC"] },
        { v: "B'", e1: "B", e2: "A'", e3: "C'", opp: "D", wrong: ["DB", "D'B", "BD"] },
        { v: "C'", e1: "C", e2: "B'", e3: "D'", opp: "A", wrong: ["AC", "A'C", "CA"] },
        { v: "D'", e1: "D", e2: "A'", e3: "C'", opp: "B", wrong: ["BD", "B'D", "DB"] },
      ];
      const item = corners[params.vertexIdx];
      const lhs =
        "\\overrightarrow{" + item.v + item.e1 + "} + \\overrightarrow{" + item.v + item.e2 + "} + \\overrightarrow{" + item.v + item.e3 + "}";
      const correct = "$" + lhs + " = \\overrightarrow{" + item.v + item.opp + "}$";
      const distractors = item.wrong.map((w) => "$" + lhs + " = \\overrightarrow{" + w + "}$");
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, distractors, rng);

      return {
        stem: "Cho hình hộp $ABCD.A'B'C'D'$. Tìm khẳng định đúng.",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          "Áp dụng quy tắc hình hộp tại đỉnh $" + item.v + "$: tổng ba vectơ theo ba cạnh xuất phát từ đỉnh $" + item.v + "$ bằng vectơ đường chéo xuất phát từ đỉnh đó đến đỉnh đối diện $" + item.opp + "$.",
          "Do đó " + correct + " là khẳng định đúng.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vertexIdx = 8 (ngoài miền)', params: { vertexIdx: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc tại đỉnh A', params: { vertexIdx: 0 }, expectedValid: true },
      { label: 'Đỉnh mặt trên C\'', params: { vertexIdx: 6 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4)
  t12_b6_d04_tetra_identity_mc: {
    id: 't12_b6_d04_tetra_identity_mc',
    name: 'Đẳng thức tổng hiệu vectơ trên tứ diện',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép cộng và phép trừ vectơ trong không gian',
    description:
      'Cho tứ diện có 4 đỉnh bất kì (thay đổi tên đỉnh động). Áp dụng quy tắc ba điểm, quy tắc hiệu để tìm đẳng thức vectơ đúng.',
    conditionSummary: 'setIdx ∈ {0..4} chọn bộ 4 đỉnh tứ diện, variant ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ 4 đỉnh (0..4)', min: 0, max: 4 },
      { name: 'variant', label: 'Dạng đẳng thức (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, variant } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 4) {
        return { valid: false, reason: 'setIdx phải thuộc [0; 4]' };
      }
      if (variant !== 0 && variant !== 1) {
        return { valid: false, reason: 'variant chỉ nhận 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const sets = [
        ['E', 'F', 'G', 'H'],
        ['A', 'B', 'C', 'D'],
        ['M', 'N', 'P', 'Q'],
        ['S', 'A', 'B', 'C'],
        ['P', 'Q', 'R', 'S'],
      ];
      const [a, b, c, d] = sets[params.setIdx];
      const isVar0 = params.variant === 0;

      const correct = isVar0
        ? '$\\overrightarrow{' + c + d + '} - \\overrightarrow{' + c + b + '} = \\overrightarrow{' + b + a + '} + \\overrightarrow{' + a + d + '}$'
        : '$\\overrightarrow{' + a + b + '} + \\overrightarrow{' + b + c + '} = \\overrightarrow{' + d + c + '} - \\overrightarrow{' + d + a + '}$';

      const distractors = [
        '$\\overrightarrow{' + b + c + '} + \\overrightarrow{' + a + b + '} = \\overrightarrow{' + d + a + '} - \\overrightarrow{' + d + c + '}$',
        '$\\overrightarrow{' + a + b + '} - \\overrightarrow{' + a + d + '} = \\overrightarrow{' + c + d + '} + \\overrightarrow{' + b + c + '}$',
        '$\\overrightarrow{' + a + c + '} - \\overrightarrow{' + a + d + '} = \\overrightarrow{' + b + d + '} - \\overrightarrow{' + b + c + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, distractors, rng);

      const reducedVec = isVar0 ? '\\overrightarrow{' + b + d + '}' : '\\overrightarrow{' + a + c + '}';

      return {
        stem: 'Cho tứ diện $' + a + b + c + d + '$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Biến đổi hai vế của từng đẳng thức bằng quy tắc ba điểm và quy tắc hiệu.',
          isVar0
            ? 'Ta có $\\overrightarrow{' + c + d + '} - \\overrightarrow{' + c + b + '} = ' + reducedVec + '$ và $\\overrightarrow{' + b + a + '} + \\overrightarrow{' + a + d + '} = ' + reducedVec + '$.'
            : 'Ta có $\\overrightarrow{' + a + b + '} + \\overrightarrow{' + b + c + '} = ' + reducedVec + '$ và $\\overrightarrow{' + d + c + '} - \\overrightarrow{' + d + a + '} = ' + reducedVec + '$.',
          'Vậy ' + correct + ' là khẳng định đúng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 5 (ngoài miền)', params: { setIdx: 5, variant: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc EFGH', params: { setIdx: 0, variant: 0 }, expectedValid: true },
      { label: 'Biến thể tổng bằng hiệu', params: { setIdx: 1, variant: 1 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5)
  t12_b6_d05_tetra_midpoints_mc: {
    id: 't12_b6_d05_tetra_midpoints_mc',
    name: 'Tính chất đường trung bình và vectơ trên tứ diện (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường trung bình và vectơ trong tứ diện',
    description:
      'Cho tứ diện có M, N, P là trung điểm ba cạnh xuất phát từ một đỉnh. Tìm khẳng định sai về quan hệ giữa hiệu/tổng hai cạnh và vectơ đường trung bình.',
    conditionSummary: 'setIdx ∈ {0..3} chọn bộ đỉnh và trung điểm, falseIdx ∈ {0..2} chọn phương án sai',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..3)', min: 0, max: 3 },
      { name: 'falseIdx', label: 'Kiểu phát biểu sai (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, falseIdx } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 3) {
        return { valid: false, reason: 'setIdx phải thuộc [0; 3]' };
      }
      if (!Number.isInteger(falseIdx) || falseIdx < 0 || falseIdx > 2) {
        return { valid: false, reason: 'falseIdx phải thuộc [0; 2]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const configs = [
        { apex: 'D', a: 'A', b: 'B', c: 'C', m: 'M', n: 'N', p: 'P', tetra: 'DABC' },
        { apex: 'S', a: 'A', b: 'B', c: 'C', m: 'M', n: 'N', p: 'P', tetra: 'SABC' },
        { apex: 'A', a: 'B', b: 'C', c: 'D', m: 'M', n: 'N', p: 'P', tetra: 'ABCD' },
        { apex: 'O', a: 'A', b: 'B', c: 'C', m: 'I', n: 'J', p: 'K', tetra: 'OABC' },
      ];
      const cfg = configs[params.setIdx];
      const { apex: D, a: A, b: B, c: C, m: M, n: N, p: P, tetra } = cfg;

      // Four true equalities:
      // 0: AB + BC = 2 MP (= AC)
      // 1: DC + BD = 2 NP (= BC)
      // 2: DA - DC = 2 PM (= CA)
      // 3: DA - DB = 2 NM (= BA)
      const candidates = [
        {
          trueExpr: '$\\overrightarrow{' + A + B + '} + \\overrightarrow{' + B + C + '} = 2\\overrightarrow{' + M + P + '}$',
          falseExpr: '$\\overrightarrow{' + A + B + '} + \\overrightarrow{' + B + C + '} = 2\\overrightarrow{' + P + M + '}$',
          reason: '$\\overrightarrow{' + A + B + '} + \\overrightarrow{' + B + C + '} = \\overrightarrow{' + A + C + '} = 2\\overrightarrow{' + M + P + '}$',
        },
        {
          trueExpr: '$\\overrightarrow{' + D + C + '} + \\overrightarrow{' + B + D + '} = 2\\overrightarrow{' + N + P + '}$',
          falseExpr: '$\\overrightarrow{' + D + C + '} + \\overrightarrow{' + B + D + '} = 2\\overrightarrow{' + P + N + '}$',
          reason: '$\\overrightarrow{' + D + C + '} + \\overrightarrow{' + B + D + '} = \\overrightarrow{' + B + C + '} = 2\\overrightarrow{' + N + P + '}$',
        },
        {
          trueExpr: '$\\overrightarrow{' + D + A + '} - \\overrightarrow{' + D + C + '} = 2\\overrightarrow{' + P + M + '}$',
          falseExpr: '$\\overrightarrow{' + D + A + '} - \\overrightarrow{' + D + C + '} = 2\\overrightarrow{' + M + P + '}$',
          reason: '$\\overrightarrow{' + D + A + '} - \\overrightarrow{' + D + C + '} = \\overrightarrow{' + C + A + '} = 2\\overrightarrow{' + P + M + '}$',
        },
        {
          trueExpr: '$\\overrightarrow{' + D + A + '} - \\overrightarrow{' + D + B + '} = 2\\overrightarrow{' + N + M + '}$',
          falseExpr: '$\\overrightarrow{' + D + A + '} - \\overrightarrow{' + D + B + '} = 2\\overrightarrow{' + M + N + '}$',
          reason: '$\\overrightarrow{' + D + A + '} - \\overrightarrow{' + D + B + '} = \\overrightarrow{' + B + A + '} = 2\\overrightarrow{' + N + M + '}$',
        },
      ];

      // falseIdx = 0 reproduces source Q5 (candidate 2 is false, candidates 0,1,3 are true)
      const pickFalseIndex = params.falseIdx === 0 ? 2 : params.falseIdx === 1 ? 1 : 3;
      const falseItem = candidates[pickFalseIndex];
      const trueDistractors = candidates
        .filter((_, idx) => idx !== pickFalseIndex)
        .map((it) => it.trueExpr);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        falseItem.falseExpr,
        trueDistractors,
        rng
      );

      return {
        stem:
          'Cho tứ diện $' +
          tetra +
          '$. Gọi $' +
          M +
          ',\\, ' +
          N +
          ',\\, ' +
          P +
          '$ lần lượt là trung điểm của các đoạn $' +
          D +
          A +
          ',\\, ' +
          D +
          B +
          ',\\, ' +
          D +
          C +
          '$. Tìm khẳng định sai.',
        options,
        correctIndex,
        answerSummary: falseItem.falseExpr,
        solutionSteps: [
          'Vì $' + M + ',\\, ' + N + ',\\, ' + P + '$ lần lượt là trung điểm của $' + D + A + ',\\, ' + D + B + ',\\, ' + D + C + '$ nên theo tính chất đường trung bình: $\\overrightarrow{' + A + C + '} = 2\\overrightarrow{' + M + P + '}$, $\\overrightarrow{' + B + C + '} = 2\\overrightarrow{' + N + P + '}$, $\\overrightarrow{' + B + A + '} = 2\\overrightarrow{' + N + M + '}$.',
          'Mà ' + falseItem.reason + ', nên khẳng định ' + falseItem.falseExpr + ' là sai.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên falseIdx = 3 (ngoài miền)', params: { setIdx: 0, falseIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc DABC', params: { setIdx: 0, falseIdx: 0 }, expectedValid: true },
      { label: 'Biến thể tứ diện SABC', params: { setIdx: 1, falseIdx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6)
  t12_b6_d06_cube_diag_sum_len_mc: {
    id: 't12_b6_d06_cube_diag_sum_len_mc',
    name: 'Tính độ dài tổng hai vectơ đường chéo hai mặt bên kề nhau của hình lập phương',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Độ dài tổng hai vectơ trong hình lập phương',
    description:
      'Cho hình lập phương ABCD.A1B1C1D1 cạnh k·a (k nguyên dương, kèm hình minh họa). Tính độ dài vectơ tổng hai đường chéo mặt kề nhau chung gốc.',
    conditionSummary: 'k ∈ [1; 9], pairIdx ∈ {0..3} chọn đỉnh chung gốc',
    paramSpecs: [
      { name: 'k', label: 'Hệ số cạnh k (cạnh ka)', min: 1, max: 9 },
      { name: 'pairIdx', label: 'Đỉnh xuất phát (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { k, pairIdx } = params;
      if (!Number.isInteger(k) || k < 1 || k > 15) {
        return { valid: false, reason: 'Hệ số cạnh k phải nguyên dương thuộc [1; 15]' };
      }
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 3) {
        return { valid: false, reason: 'pairIdx phải thuộc [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, pairIdx } = params;
      const configs = [
        { v1: 'AB_1', v2: 'AD_1', p1: 'B_1', p2: 'D_1', base: 'A' },
        { v1: 'BA_1', v2: 'BC_1', p1: 'A_1', p2: 'C_1', base: 'B' },
        { v1: 'CB_1', v2: 'CD_1', p1: 'B_1', p2: 'D_1', base: 'C' },
        { v1: 'DA_1', v2: 'DC_1', p1: 'A_1', p2: 'C_1', base: 'D' },
      ];
      const cfg = configs[pairIdx];
      const kStr = k === 1 ? '' : '' + k;
      const sideTex = kStr + 'a';
      const diagTex = kStr + '\\sqrt{2}a';
      const ansTex = '$' + kStr + '\\sqrt{6}a$';

      const distractors = [
        '$' + (5 * k) + 'a$',
        '$' + kStr + '\\sqrt{3}a$',
        '$' + diagTex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ansTex,
        distractors,
        rng,
        (step) => '$' + (k + step) + '\\sqrt{6}a$'
      );

      return {
        stem:
          'Cho hình lập phương $ABCD.A_1B_1C_1D_1$ có độ dài cạnh bằng $' +
          sideTex +
          '$. Tính độ dài vectơ $\\vec{x} = \\overrightarrow{' +
          cfg.v1 +
          '} + \\overrightarrow{' +
          cfg.v2 +
          '}$ theo $a$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 2, k },
        },
        options,
        correctIndex,
        answerSummary: ansTex,
        solutionSteps: [
          'Gọi $I$ là trung điểm của cạnh $' + cfg.p1 + cfg.p2 + '$. Khi đó $|\\vec{x}| = |\\overrightarrow{' + cfg.v1 + '} + \\overrightarrow{' + cfg.v2 + '}| = |2\\overrightarrow{' + cfg.base + 'I}| = 2' + cfg.base + 'I$.',
          'Vì tất cả các mặt của hình lập phương đều là hình vuông cạnh $' + sideTex + '$ nên tam giác $' + cfg.base + cfg.p1 + cfg.p2 + '$ là tam giác đều cạnh $' + diagTex + '$.',
          'Đường cao của tam giác đều là $' + cfg.base + 'I = ' + diagTex + ' \\cdot \\frac{\\sqrt{3}}{2}$, suy ra $|\\vec{x}| = 2 \\cdot ' + cfg.base + 'I = ' + kStr + '\\sqrt{6}a$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh k = 0', params: { k: 0, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc cạnh 3a', params: { k: 3, pairIdx: 0 }, expectedValid: true },
      { label: 'Biên đơn vị k = 1 (cạnh a)', params: { k: 1, pairIdx: 2 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7)
  t12_b6_d07_pyramid_parallelogram_mc: {
    id: 't12_b6_d07_pyramid_parallelogram_mc',
    name: 'Phép toán vectơ trên hình chóp có đáy là hình bình hành (Tìm mệnh đề sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Quy tắc hình bình hành và vectơ trong hình chóp',
    description:
      'Cho hình chóp có đáy là hình bình hành tâm I. Xác định mệnh đề sai trong bốn đẳng thức tổng hiệu vectơ liên quan đến đỉnh S và các đỉnh đáy.',
    conditionSummary: 'setIdx ∈ {0..3} chọn bộ đỉnh đáy, falseIdx ∈ {0..2} chọn đẳng thức sai dấu',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ đỉnh đáy (0..3)', min: 0, max: 3 },
      { name: 'falseIdx', label: 'Biến thể mệnh đề sai (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, falseIdx } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 3) {
        return { valid: false, reason: 'setIdx phải thuộc [0; 3]' };
      }
      if (!Number.isInteger(falseIdx) || falseIdx < 0 || falseIdx > 2) {
        return { valid: false, reason: 'falseIdx phải thuộc [0; 2]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const baseSets = [
        ['A', 'B', 'E', 'F'],
        ['A', 'B', 'C', 'D'],
        ['M', 'N', 'P', 'Q'],
        ['E', 'F', 'G', 'H'],
      ];
      const [p1, p2, p3, p4] = baseSets[params.setIdx];
      const true1 = '$\\overrightarrow{' + p2 + p1 + '} + \\overrightarrow{' + p2 + p3 + '} = \\overrightarrow{' + p2 + p4 + '}$';
      const true2 = '$\\overrightarrow{S' + p2 + '} - \\overrightarrow{S' + p3 + '} = \\overrightarrow{S' + p1 + '} - \\overrightarrow{S' + p4 + '}$';
      const true3 = '$\\overrightarrow{S' + p1 + '} - \\overrightarrow{S' + p2 + '} = \\overrightarrow{S' + p4 + '} - \\overrightarrow{S' + p3 + '}$';

      const falseVariants = [
        {
          stmt: '$\\overrightarrow{S' + p3 + '} - \\overrightarrow{' + p2 + p3 + '} = \\overrightarrow{' + p2 + 'S}$',
          correctRhs: '\\overrightarrow{S' + p2 + '}',
          lhs: '\\overrightarrow{S' + p3 + '} - \\overrightarrow{' + p2 + p3 + '}',
        },
        {
          stmt: '$\\overrightarrow{S' + p1 + '} - \\overrightarrow{' + p4 + p1 + '} = \\overrightarrow{' + p4 + 'S}$',
          correctRhs: '\\overrightarrow{S' + p4 + '}',
          lhs: '\\overrightarrow{S' + p1 + '} - \\overrightarrow{' + p4 + p1 + '}',
        },
        {
          stmt: '$\\overrightarrow{S' + p2 + '} - \\overrightarrow{' + p1 + p2 + '} = \\overrightarrow{' + p1 + 'S}$',
          correctRhs: '\\overrightarrow{S' + p1 + '}',
          lhs: '\\overrightarrow{S' + p2 + '} - \\overrightarrow{' + p1 + p2 + '}',
        },
      ];
      const fv = falseVariants[params.falseIdx];

      const { options, correctIndex } = u.buildUniqueMcOptions(
        fv.stmt,
        [true1, true2, true3],
        rng
      );

      return {
        stem:
          'Cho hình chóp $S.' +
          p1 +
          p2 +
          p3 +
          p4 +
          '$ có $' +
          p1 +
          p2 +
          p3 +
          p4 +
          '$ là hình bình hành tâm $I$. Tìm mệnh đề sai trong các mệnh đề sau.',
        options,
        correctIndex,
        answerSummary: fv.stmt,
        solutionSteps: [
          'Do $' + p1 + p2 + p3 + p4 + '$ là hình bình hành nên $\\overrightarrow{' + p2 + p1 + '} + \\overrightarrow{' + p2 + p3 + '} = \\overrightarrow{' + p2 + p4 + '}$ và $\\overrightarrow{' + p3 + p2 + '} = \\overrightarrow{' + p4 + p1 + '}$, $\\overrightarrow{' + p2 + p1 + '} = \\overrightarrow{' + p3 + p4 + '}$, dẫn tới hai đẳng thức hiệu chung gốc $S$ đều đúng.',
          'Ta có $' + fv.lhs + ' = ' + fv.lhs.split(' - ')[0] + ' + \\overrightarrow{' + fv.lhs.split('\\overrightarrow{')[2].replace('}', '').split('').reverse().join('') + '} = ' + fv.correctRhs + '$, nên mệnh đề ' + fv.stmt + ' là mệnh đề sai.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = -1 (ngoài miền)', params: { setIdx: -1, falseIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc S.ABEF', params: { setIdx: 0, falseIdx: 0 }, expectedValid: true },
      { label: 'Biến thể S.ABCD', params: { setIdx: 1, falseIdx: 2 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8)
  t12_b6_d08_cube_vec_angle_mc: {
    id: 't12_b6_d08_cube_vec_angle_mc',
    name: 'Tính góc giữa hai vectơ trong hình lập phương ABCD.A1B1C1D1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai vectơ trong không gian',
    description:
      'Cho hình lập phương ABCD.A1B1C1D1 (kèm hình minh họa). Tính góc giữa hai vectơ cạnh hoặc đường chéo mặt trong hình lập phương.',
    conditionSummary: 'pairIdx ∈ {0..7} cho các cặp vectơ có góc đặc biệt 45°, 60°, 90°, 120°, 135°',
    paramSpecs: [{ name: 'pairIdx', label: 'Chỉ số cặp vectơ (0..7)', min: 0, max: 7 }],
    validateCode: `
      const { pairIdx } = params;
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 7) {
        return { valid: false, reason: 'pairIdx phải thuộc [0; 7]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const coords = {
        A: [0, 0, 0],
        B: [1, 0, 0],
        C: [1, 1, 0],
        D: [0, 1, 0],
        A_1: [0, 0, 1],
        B_1: [1, 0, 1],
        C_1: [1, 1, 1],
        D_1: [0, 1, 1],
      };
      const pairs = [
        { p1: 'C_1', p2: 'C', q1: 'C_1', q2: 'D', note: 'Hai vectơ cùng gốc $C_1$ nằm trong hình vuông $CDD_1C_1$, với $C_1D$ là đường chéo hình vuông nên góc bằng $45^\\circ$.' },
        { p1: 'A_1', p2: 'A', q1: 'A_1', q2: 'B', note: 'Hai vectơ cùng gốc $A_1$ nằm trong hình vuông $ABB_1A_1$, với $A_1B$ là đường chéo hình vuông nên góc bằng $45^\\circ$.' },
        { p1: 'B_1', p2: 'B', q1: 'D', q2: 'C_1', note: 'Ta có $\\overrightarrow{B_1B} = \\overrightarrow{C_1C}$, mà $(\\overrightarrow{C_1C}, \\overrightarrow{C_1D}) = 45^\\circ$ nên $(\\overrightarrow{B_1B}, \\overrightarrow{DC_1}) = 180^\\circ - 45^\\circ = 135^\\circ$.' },
        { p1: 'A', p2: 'D_1', q1: 'A', q2: 'C', note: 'Tam giác $AD_1C$ có ba cạnh đều là đường chéo của các mặt hình lập phương nên là tam giác đều, suy ra $(\\overrightarrow{AD_1}, \\overrightarrow{AC}) = 60^\\circ$.' },
        { p1: 'D_1', p2: 'A', q1: 'A', q2: 'C', note: 'Tam giác $AD_1C$ đều nên $\\widehat{D_1AC} = 60^\\circ$, suy ra $(\\overrightarrow{D_1A}, \\overrightarrow{AC}) = 180^\\circ - 60^\\circ = 120^\\circ$.' },
        { p1: 'A', p2: 'B_1', q1: 'A', q2: 'D_1', note: 'Tam giác $AB_1D_1$ là tam giác đều nên $(\\overrightarrow{AB_1}, \\overrightarrow{AD_1}) = 60^\\circ$.' },
        { p1: 'A_1', p2: 'D', q1: 'B', q2: 'A_1', note: 'Ta có $\\overrightarrow{BA_1} = -\\overrightarrow{A_1B}$ và tam giác $A_1BD$ đều ($\\widehat{BA_1D} = 60^\\circ$) nên $(\\overrightarrow{A_1D}, \\overrightarrow{BA_1}) = 180^\\circ - 60^\\circ = 120^\\circ$.' },
        { p1: 'A', p2: 'C', q1: 'B_1', q2: 'D_1', note: 'Do $\\overrightarrow{B_1D_1} = \\overrightarrow{BD}$ và hai đường chéo hình vuông đáy $AC \\perp BD$ nên góc giữa hai vectơ bằng $90^\\circ$.' },
      ];
      const item = pairs[params.pairIdx];
      const a1 = coords[item.p1];
      const a2 = coords[item.p2];
      const b1 = coords[item.q1];
      const b2 = coords[item.q2];
      const uVec = [a2[0] - a1[0], a2[1] - a1[1], a2[2] - a1[2]];
      const vVec = [b2[0] - b1[0], b2[1] - b1[1], b2[2] - b1[2]];
      const dot = uVec[0] * vVec[0] + uVec[1] * vVec[1] + uVec[2] * vVec[2];
      const nU = Math.sqrt(uVec[0] * uVec[0] + uVec[1] * uVec[1] + uVec[2] * uVec[2]);
      const nV = Math.sqrt(vVec[0] * vVec[0] + vVec[1] * vVec[1] + vVec[2] * vVec[2]);
      const cosVal = dot / (nU * nV);
      const deg = Math.round((Math.acos(Math.max(-1, Math.min(1, cosVal))) * 180) / Math.PI);

      const correct = '$' + deg + '^\\circ$';
      const candidateDegs = [45, 60, 90, 120, 135].filter((d) => d !== deg);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candidateDegs.map((d) => '$' + d + '^\\circ$'),
        rng
      );

      return {
        stem:
          'Cho hình lập phương $ABCD.A_1B_1C_1D_1$. Góc giữa hai vectơ $\\overrightarrow{' +
          item.p1 +
          item.p2 +
          '}$ và $\\overrightarrow{' +
          item.q1 +
          item.q2 +
          '}$ bằng:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 2 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          item.note,
          'Vậy $(\\overrightarrow{' + item.p1 + item.p2 + '},\\, \\overrightarrow{' + item.q1 + item.q2 + '}) = ' + deg + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pairIdx = 8 (ngoài miền)', params: { pairIdx: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc C1C và C1D = 45°', params: { pairIdx: 0 }, expectedValid: true },
      { label: 'Góc tù giữa A1D và BA1 = 120°', params: { pairIdx: 6 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9)
  t12_b6_d09_reg_tetra_dot_mc: {
    id: 't12_b6_d09_reg_tetra_dot_mc',
    name: 'Tính tích vô hướng hai vectơ cạnh trong tứ diện đều SBCD',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích vô hướng của hai vectơ trong không gian',
    description:
      'Cho tứ diện đều SBCD cạnh k·a (kèm hình minh họa). Tính tích vô hướng của cặp vectơ cạnh đối (vuông góc) hoặc cặp cạnh kề nhau.',
    conditionSummary: 'k ∈ [1; 9], pairIdx ∈ {0..3}',
    paramSpecs: [
      { name: 'k', label: 'Hệ số cạnh k (cạnh ka)', min: 1, max: 9 },
      { name: 'pairIdx', label: 'Cặp vectơ cạnh (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { k, pairIdx } = params;
      if (!Number.isInteger(k) || k < 1 || k > 15) {
        return { valid: false, reason: 'k phải nguyên dương thuộc [1; 15]' };
      }
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 3) {
        return { valid: false, reason: 'pairIdx phải thuộc [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, pairIdx } = params;
      const kStr = k === 1 ? '' : '' + k;
      const sideTex = kStr + 'a';
      const k2 = k * k;
      const fmtA2 = (num, den) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '0';
        if (f.isInteger) {
          if (f.num === 1) return 'a^{2}';
          if (f.num === -1) return '-a^{2}';
          return f.num + 'a^{2}';
        }
        const sgn = f.num < 0 ? '-' : '';
        const absN = Math.abs(f.num);
        return sgn + '\\frac{' + (absN === 1 ? '' : absN) + 'a^{2}}{' + f.den + '}';
      };

      const configs = [
        {
          v1: 'BC',
          v2: 'SD',
          num: 0,
          den: 1,
          steps: [
            'Gọi $E$ là trung điểm của cạnh $BC$. Vì $\\triangle SBC$ và $\\triangle DBC$ là các tam giác đều nên $SE \\perp BC$ và $DE \\perp BC$.',
            'Suy ra $BC \\perp (SDE) \\Rightarrow BC \\perp SD$, do đó $\\overrightarrow{BC} \\cdot \\overrightarrow{SD} = 0$.',
          ],
        },
        {
          v1: 'SB',
          v2: 'CD',
          num: 0,
          den: 1,
          steps: [
            'Gọi $I$ là trung điểm của cạnh $CD$. Vì $\\triangle SCD$ và $\\triangle BCD$ đều nên $SI \\perp CD$ và $BI \\perp CD$.',
            'Suy ra $CD \\perp (SBI) \\Rightarrow CD \\perp SB$, do đó $\\overrightarrow{SB} \\cdot \\overrightarrow{CD} = 0$.',
          ],
        },
        {
          v1: 'SB',
          v2: 'SC',
          num: k2,
          den: 2,
          steps: [
            'Tam giác $SBC$ đều cạnh $' + sideTex + '$ nên $(\\overrightarrow{SB}, \\overrightarrow{SC}) = \\widehat{BSC} = 60^\\circ$.',
            'Do đó $\\overrightarrow{SB} \\cdot \\overrightarrow{SC} = SB \\cdot SC \\cdot \\cos 60^\\circ = ' + sideTex + ' \\cdot ' + sideTex + ' \\cdot \\frac{1}{2} = ' + fmtA2(k2, 2) + '$.',
          ],
        },
        {
          v1: 'BC',
          v2: 'CD',
          num: -k2,
          den: 2,
          steps: [
            'Tam giác $BCD$ đều nên $\\widehat{BCD} = 60^\\circ$, suy ra góc giữa hai vectơ $(\\overrightarrow{BC}, \\overrightarrow{CD}) = 180^\\circ - 60^\\circ = 120^\\circ$.',
            'Do đó $\\overrightarrow{BC} \\cdot \\overrightarrow{CD} = BC \\cdot CD \\cdot \\cos 120^\\circ = ' + sideTex + ' \\cdot ' + sideTex + ' \\cdot \\left(-\\frac{1}{2}\\right) = ' + fmtA2(-k2, 2) + '$.',
          ],
        },
      ];

      const cfg = configs[pairIdx];
      const correct = '$' + fmtA2(cfg.num, cfg.den) + '$';
      const candidatePool = [
        '$0$',
        '$' + fmtA2(-k2, 2) + '$',
        '$' + fmtA2(k2, 2) + '$',
        '$' + fmtA2(k2, 1) + '$',
        '$' + fmtA2(-k2, 4) + '$',
        '$' + fmtA2(3 * k2, 2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candidatePool,
        rng,
        (step) => '$' + fmtA2(k2 + step, 1) + '$'
      );

      return {
        stem:
          'Cho tứ diện đều $SBCD$ có cạnh bằng $' +
          sideTex +
          '$. Tính tích vô hướng $\\overrightarrow{' +
          cfg.v1 +
          '} \\cdot \\overrightarrow{' +
          cfg.v2 +
          '}$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'reg_tetra_3d',
          params: { apexVariant: 0 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: cfg.steps,
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (tứ diện suy biến)', params: { k: 0, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc cạnh 4a, BC·SD = 0', params: { k: 4, pairIdx: 0 }, expectedValid: true },
      { label: 'Biến thể cạnh kề góc 120°', params: { k: 3, pairIdx: 3 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10)
  t12_b6_d10_dot_from_angle_mc: {
    id: 't12_b6_d10_dot_from_angle_mc',
    name: 'Tính tích vô hướng từ độ dài và góc giữa hai vectơ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích vô hướng của hai vectơ',
    description:
      'Cho độ dài hai vectơ |u|, |v| và góc đặc biệt α ∈ {30°, 45°, 60°, 120°, 135°, 150°}. Tính tích vô hướng u · v dưới dạng chính xác.',
    conditionSummary: 'len1, len2 ∈ [1; 9], angIdx ∈ {0..5}',
    paramSpecs: [
      { name: 'len1', label: 'Độ dài |m|', min: 1, max: 9 },
      { name: 'len2', label: 'Độ dài |v|', min: 1, max: 9 },
      { name: 'angIdx', label: 'Góc (0:30°, 1:45°, 2:60°, 3:120°, 4:135°, 5:150°)', min: 0, max: 5 },
    ],
    validateCode: `
      const { len1, len2, angIdx } = params;
      if (len1 <= 0 || len2 <= 0 || len1 > 20 || len2 > 20) {
        return { valid: false, reason: 'Độ dài hai vectơ phải dương thuộc [1; 20]' };
      }
      if (!Number.isInteger(angIdx) || angIdx < 0 || angIdx > 5) {
        return { valid: false, reason: 'angIdx phải thuộc [0; 5]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { len1, len2, angIdx } = params;
      const angles = [
        { deg: 30, sign: 1, rad: 3, cosTex: '\\frac{\\sqrt{3}}{2}' },
        { deg: 45, sign: 1, rad: 2, cosTex: '\\frac{\\sqrt{2}}{2}' },
        { deg: 60, sign: 1, rad: 1, cosTex: '\\frac{1}{2}' },
        { deg: 120, sign: -1, rad: 1, cosTex: '-\\frac{1}{2}' },
        { deg: 135, sign: -1, rad: 2, cosTex: '-\\frac{\\sqrt{2}}{2}' },
        { deg: 150, sign: -1, rad: 3, cosTex: '-\\frac{\\sqrt{3}}{2}' },
      ];
      const ang = angles[angIdx];
      const f = u.simplifyFrac(ang.sign * len1 * len2, 2);

      const fmtDot = (num, den, rad) => {
        if (rad === 1) return u.simplifyFrac(num, den).latex;
        const fr = u.simplifyFrac(num, den);
        const sgn = fr.num < 0 ? '-' : '';
        const absN = Math.abs(fr.num);
        if (fr.isInteger) {
          return sgn + (absN === 1 ? '' : absN) + '\\sqrt{' + rad + '}';
        }
        return sgn + '\\frac{' + (absN === 1 ? '' : absN) + '\\sqrt{' + rad + '}}{' + fr.den + '}';
      };

      const ansTex = fmtDot(f.num, f.den, ang.rad);
      const correct = '$' + ansTex + '$';
      const prod = len1 * len2;
      const distractors = [
        '$' + fmtDot(-f.num, f.den, ang.rad) + '$',
        '$' + prod + '$',
        '$' + fmtDot(f.num, f.den, ang.rad === 2 ? 3 : 2) + '$',
        '$' + (prod + 2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (step) => '$' + (prod + step + 3) + '$'
      );

      return {
        stem:
          'Cho hai vectơ $\\overrightarrow{m}$ và $\\overrightarrow{v}$ thỏa mãn $|\\overrightarrow{m}| = ' +
          len1 +
          '$, $|\\overrightarrow{v}| = ' +
          len2 +
          '$ và góc giữa hai vectơ bằng $' +
          ang.deg +
          '^\\circ$. Tính tích vô hướng $\\overrightarrow{m} \\cdot \\overrightarrow{v}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức định nghĩa tích vô hướng: $\\overrightarrow{m} \\cdot \\overrightarrow{v} = |\\overrightarrow{m}| \\cdot |\\overrightarrow{v}| \\cdot \\cos(\\overrightarrow{m}, \\overrightarrow{v})$.',
          'Thay số: $\\overrightarrow{m} \\cdot \\overrightarrow{v} = ' +
            len1 +
            ' \\cdot ' +
            len2 +
            ' \\cdot \\cos ' +
            ang.deg +
            '^\\circ = ' +
            prod +
            ' \\cdot \\left(' +
            ang.cosTex +
            '\\right) = ' +
            ansTex +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên độ dài vectơ bằng 0', params: { len1: 0, len2: 8, angIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc 2, 8, 45° -> 8√2', params: { len1: 2, len2: 8, angIdx: 1 }, expectedValid: true },
      { label: 'Góc tù 150° tích vô hướng âm', params: { len1: 4, len2: 5, angIdx: 5 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11)
  t12_b6_d11_angle_from_dot_mc: {
    id: 't12_b6_d11_angle_from_dot_mc',
    name: 'Tìm góc giữa hai vectơ khi biết độ dài và tích vô hướng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Góc giữa hai vectơ trong không gian',
    description:
      'Cho |u|, |b| và tích vô hướng u · b tương ứng góc đặc biệt α ∈ {30°, 45°, 60°, 120°, 135°, 150°} (chọn tích độ dài chẵn để biểu thức tích vô hướng đẹp). Tìm góc giữa hai vectơ.',
    conditionSummary: 'len1, len2 ∈ [2; 9] với (len1·len2) chẵn, angIdx ∈ {0..5}',
    paramSpecs: [
      { name: 'len1', label: 'Độ dài |u|', min: 2, max: 8 },
      { name: 'len2', label: 'Độ dài |b|', min: 2, max: 9 },
      { name: 'angIdx', label: 'Góc chuẩn (0:30°, 1:45°, 2:60°, 3:120°, 4:135°, 5:150°)', min: 0, max: 5 },
    ],
    validateCode: `
      const { len1, len2, angIdx } = params;
      if (len1 < 1 || len2 < 1 || len1 > 15 || len2 > 15) {
        return { valid: false, reason: 'Độ dài phải dương thuộc [1; 15]' };
      }
      if ((len1 * len2) % 2 !== 0) {
        return { valid: false, reason: 'Tích |u|.|b| cần là số chẵn để biểu thức tích vô hướng có hệ số nguyên đẹp' };
      }
      if (!Number.isInteger(angIdx) || angIdx < 0 || angIdx > 5) {
        return { valid: false, reason: 'angIdx phải thuộc [0; 5]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { len1, len2, angIdx } = params;
      const angles = [
        { deg: 30, sign: 1, rad: 3, cosTex: '\\frac{\\sqrt{3}}{2}' },
        { deg: 45, sign: 1, rad: 2, cosTex: '\\frac{\\sqrt{2}}{2}' },
        { deg: 60, sign: 1, rad: 1, cosTex: '\\frac{1}{2}' },
        { deg: 120, sign: -1, rad: 1, cosTex: '-\\frac{1}{2}' },
        { deg: 135, sign: -1, rad: 2, cosTex: '-\\frac{\\sqrt{2}}{2}' },
        { deg: 150, sign: -1, rad: 3, cosTex: '-\\frac{\\sqrt{3}}{2}' },
      ];
      const ang = angles[angIdx];
      const coeff = ang.sign * ((len1 * len2) / 2);
      const dotTex =
        ang.rad === 1
          ? '' + coeff
          : (coeff === 1 ? '' : coeff === -1 ? '-' : coeff) + '\\sqrt{' + ang.rad + '}';

      const correct = '$' + ang.deg + '^\\circ$';
      const distDegs = [30, 45, 60, 120, 135, 150].filter((d) => d !== ang.deg);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distDegs.map((d) => '$' + d + '^\\circ$'),
        rng
      );

      return {
        stem:
          'Cho hai vectơ $\\overrightarrow{u}$ và $\\overrightarrow{b}$ thỏa mãn $|\\overrightarrow{u}| = ' +
          len1 +
          '$, $|\\overrightarrow{b}| = ' +
          len2 +
          '$ và $\\overrightarrow{u} \\cdot \\overrightarrow{b} = ' +
          dotTex +
          '$. Góc giữa hai vectơ đã cho là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\cos(\\overrightarrow{u}, \\overrightarrow{b}) = \\frac{\\overrightarrow{u} \\cdot \\overrightarrow{b}}{|\\overrightarrow{u}| \\cdot |\\overrightarrow{b}|} = \\frac{' + dotTex + '}{' + len1 + ' \\cdot ' + len2 + '} = ' + ang.cosTex + '$.',
          'Vì $0^\\circ \\le (\\overrightarrow{u}, \\overrightarrow{b}) \\le 180^\\circ$ nên $(\\overrightarrow{u}, \\overrightarrow{b}) = ' + ang.deg + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tích |u|.|b| lẻ (3*5)', params: { len1: 3, len2: 5, angIdx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc 4, 7, -14√3 -> 150°', params: { len1: 4, len2: 7, angIdx: 5 }, expectedValid: true },
      { label: 'Góc nhọn 60°', params: { len1: 2, len2: 5, angIdx: 2 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG - SAI (5 DẠNG: DẠNG 12 -> DẠNG 16)
  // =====================================================================

  // Dạng 12 (Q12)
  t12_b6_d12_cuboid_ops_tf: {
    id: 't12_b6_d12_cuboid_ops_tf',
    name: 'Phép toán và độ dài vectơ trong hình hộp chữ nhật ABCD.EFGH',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phép toán vectơ trong hình hộp chữ nhật',
    description:
      'Cho hình hộp chữ nhật ABCD.EFGH biết EF = c1·a, AD = c2·a, AE = c3·a (kèm hình minh họa). Đánh giá 4 mệnh đề Đúng/Sai về tổng đối nhau, quy tắc hình hộp và độ dài tổng vectơ.',
    conditionSummary: 'c1, c2, c3 ∈ [1; 5], mode ∈ {0, 1} thay đổi trạng thái đúng/sai của các ý c, d',
    paramSpecs: [
      { name: 'c1', label: 'Hệ số cạnh EF = c1·a', min: 1, max: 5 },
      { name: 'c2', label: 'Hệ số cạnh AD = c2·a', min: 1, max: 5 },
      { name: 'c3', label: 'Hệ số cạnh AE = c3·a', min: 1, max: 5 },
      { name: 'mode', label: 'Kiểu tráo giá trị ý c, d (0: Sai/Sai, 1: Đúng/Đúng)', min: 0, max: 1 },
    ],
    validateCode: `
      const { c1, c2, c3, mode } = params;
      if (c1 < 1 || c2 < 1 || c3 < 1 || c1 > 10 || c2 > 10 || c3 > 10) {
        return { valid: false, reason: 'Các hệ số cạnh c1, c2, c3 phải nguyên dương thuộc [1; 10]' };
      }
      if (mode !== 0 && mode !== 1) {
        return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c1, c2, c3, mode } = params;
      const fmtCoeffA = (c) => (c === 1 ? 'a' : c + 'a');
      const fmtRadA = (rad) => {
        let out = 1;
        let rem = rad;
        for (let p = 2; p * p <= rem; p++) {
          while (rem % (p * p) === 0) {
            out *= p;
            rem /= p * p;
          }
        }
        if (rem === 1) return (out === 1 ? '' : out) + 'a';
        return (out === 1 ? '' : out) + '\\sqrt{' + rem + '}a';
      };

      const baseSq = c1 * c1 + c2 * c2;
      const spaceSq = baseSq + c3 * c3;
      const baseLenTex = fmtRadA(baseSq);
      const spaceLenTex = fmtRadA(spaceSq);

      const cIsTrue = mode === 1;
      const dIsTrue = mode === 1;
      const stmtCTex = cIsTrue ? baseLenTex : spaceLenTex;
      const stmtDTex = dIsTrue ? spaceLenTex : baseLenTex;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{ED} + \\overrightarrow{CF} \\ne \\overrightarrow{0}$',
          isTrue: false,
        },
        {
          key: 'b',
          text: '$\\overrightarrow{EF} + \\overrightarrow{EH} + \\overrightarrow{EA} = \\overrightarrow{EG}$',
          isTrue: false,
        },
        {
          key: 'c',
          text: '$|\\overrightarrow{AB} + \\overrightarrow{AD}| = ' + stmtCTex + '$',
          isTrue: cIsTrue,
        },
        {
          key: 'd',
          text: '$|\\overrightarrow{AB} + \\overrightarrow{EH} + \\overrightarrow{CG}| = ' + stmtDTex + '$',
          isTrue: dIsTrue,
        },
      ];

      return {
        stem:
          'Cho hình hộp chữ nhật $ABCD.EFGH$ có $EF = ' +
          fmtCoeffA(c1) +
          '$, $AD = ' +
          fmtCoeffA(c2) +
          '$, $AE = ' +
          fmtCoeffA(c3) +
          '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 3 },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Do $EDCF$ là hình bình hành với $\\overrightarrow{ED} = \\overrightarrow{FC} = -\\overrightarrow{CF}$ nên $\\overrightarrow{ED} + \\overrightarrow{CF} = \\overrightarrow{0}$.',
          'b) Sai. Theo quy tắc hình hộp tại đỉnh $E$, ta có $\\overrightarrow{EF} + \\overrightarrow{EH} + \\overrightarrow{EA} = \\overrightarrow{EC} \\ne \\overrightarrow{EG}$.',
          'c) ' +
            (cIsTrue ? 'Đúng' : 'Sai') +
            '. Ta có $|\\overrightarrow{AB} + \\overrightarrow{AD}| = |\\overrightarrow{AC}| = \\sqrt{' +
            c1 +
            '^2 + ' +
            c2 +
            '^2}\\,a = ' +
            baseLenTex +
            '$.',
          'd) ' +
            (dIsTrue ? 'Đúng' : 'Sai') +
            '. Vì $\\overrightarrow{EH} = \\overrightarrow{AD}$ và $\\overrightarrow{CG} = \\overrightarrow{AE}$ nên $|\\overrightarrow{AB} + \\overrightarrow{EH} + \\overrightarrow{CG}| = |\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AE}| = \\sqrt{' +
            c1 +
            '^2 + ' +
            c2 +
            '^2 + ' +
            c3 +
            '^2}\\,a = ' +
            spaceLenTex +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c3 = 0 (suy biến hình phẳng)', params: { c1: 1, c2: 3, c3: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a, 3a, a', params: { c1: 1, c2: 3, c3: 1, mode: 0 }, expectedValid: true },
      { label: 'Biến thể cạnh Pytago (3, 4, 12)', params: { c1: 3, c2: 4, c3: 5, mode: 1 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13)
  t12_b6_d13_reg_tetra_ops_tf: {
    id: 't12_b6_d13_reg_tetra_ops_tf',
    name: 'Tổng hiệu, tích vô hướng và góc vectơ trong tứ diện đều ABCD',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Vectơ và tích vô hướng trong tứ diện đều',
    description:
      'Cho tứ diện đều ABCD cạnh k·a, M là trung điểm BC, H là trọng tâm tam giác BCD (kèm hình minh họa). Đánh giá 4 mệnh đề về vòng khép kín, hai cạnh đối vuông góc, tích vô hướng cạnh kề và góc hai vectơ tại trọng tâm.',
    conditionSummary: 'k ∈ [1; 9], flipC ∈ {0, 1}',
    paramSpecs: [
      { name: 'k', label: 'Hệ số cạnh k (cạnh ka)', min: 1, max: 9 },
      { name: 'flipC', label: 'Đổi giá trị ý c (0: Sai k²a², 1: Đúng k²a²/2)', min: 0, max: 1 },
    ],
    validateCode: `
      const { k, flipC } = params;
      if (!Number.isInteger(k) || k < 1 || k > 15) {
        return { valid: false, reason: 'Hệ số cạnh k phải nguyên dương thuộc [1; 15]' };
      }
      if (flipC !== 0 && flipC !== 1) {
        return { valid: false, reason: 'flipC chỉ nhận 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, flipC } = params;
      const sideTex = k === 1 ? 'a' : k + 'a';
      const k2 = k * k;
      const wrongDotTex = (k2 === 1 ? '' : k2) + 'a^{2}';
      const trueFrac = u.simplifyFrac(k2, 2);
      const trueDotTex = trueFrac.isInteger
        ? (trueFrac.num === 1 ? '' : trueFrac.num) + 'a^{2}'
        : '\\frac{' + trueFrac.num + 'a^{2}}{' + trueFrac.den + '}';
      const cIsTrue = flipC === 1;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{AB} + \\overrightarrow{CD} + \\overrightarrow{BC} + \\overrightarrow{DA} = \\overrightarrow{0}$',
          isTrue: true,
        },
        {
          key: 'b',
          text: '$\\overrightarrow{AC} \\cdot \\overrightarrow{BD} = 0$',
          isTrue: true,
        },
        {
          key: 'c',
          text: '$\\overrightarrow{BA} \\cdot \\overrightarrow{CA} = ' + (cIsTrue ? trueDotTex : wrongDotTex) + '$',
          isTrue: cIsTrue,
        },
        {
          key: 'd',
          text: '$(\\overrightarrow{HB}, \\overrightarrow{CH}) = 60^\\circ$',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Cho tứ diện đều $ABCD$ có cạnh bằng $' +
          sideTex +
          '$. Gọi $M$ là trung điểm của cạnh $BC$, $H$ là trọng tâm tam giác $BCD$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'reg_tetra_3d',
          params: { apexVariant: 1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đúng. $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} + \\overrightarrow{DA} = \\overrightarrow{AA} = \\overrightarrow{0}$.',
          'b) Đúng. Gọi $N$ là trung điểm $BD$, vì $\\triangle ABD$ và $\\triangle CBD$ đều nên $BD \\perp AN$ và $BD \\perp CN \\Rightarrow BD \\perp (ACN) \\Rightarrow BD \\perp AC$, suy ra $\\overrightarrow{AC} \\cdot \\overrightarrow{BD} = 0$.',
          'c) ' +
            (cIsTrue ? 'Đúng' : 'Sai') +
            '. Ta có $(\\overrightarrow{BA}, \\overrightarrow{CA}) = (\\overrightarrow{AB}, \\overrightarrow{AC}) = \\widehat{BAC} = 60^\\circ$, nên $\\overrightarrow{BA} \\cdot \\overrightarrow{CA} = ' +
            sideTex +
            ' \\cdot ' +
            sideTex +
            ' \\cdot \\cos 60^\\circ = ' +
            trueDotTex +
            '$.',
          'd) Đúng. Trong tam giác đều $BCD$ có trọng tâm $H$ đồng thời là tâm đường tròn ngoại tiếp nên $\\widehat{BHC} = 120^\\circ$, suy ra $(\\overrightarrow{HB}, \\overrightarrow{CH}) = 180^\\circ - (\\overrightarrow{HB}, \\overrightarrow{HC}) = 180^\\circ - 120^\\circ = 60^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh k = 0', params: { k: 0, flipC: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc cạnh 7a', params: { k: 7, flipC: 0 }, expectedValid: true },
      { label: 'Biến thể cạnh 2a (tích phân số nguyên 2a²)', params: { k: 2, flipC: 1 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14)
  t12_b6_d14_pyramid_equi_base_tf: {
    id: 't12_b6_d14_pyramid_equi_base_tf',
    name: 'Vectơ trong hình chóp S.ABC có SA vuông góc với đáy tam giác đều',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Phép toán vectơ và tích vô hướng trong hình chóp',
    description:
      'Cho hình chóp S.ABC có SA ⊥ (ABC), SA = h, tam giác ABC đều cạnh b, H là trọng tâm ABC, M là trung điểm BC (kèm hình minh họa). Đánh giá 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'h ∈ [2; 12], b ∈ [2; 10], flipC ∈ {0, 1}',
    paramSpecs: [
      { name: 'h', label: 'Chiều cao SA = h', min: 2, max: 12 },
      { name: 'b', label: 'Cạnh đáy đều b', min: 2, max: 10 },
      { name: 'flipC', label: 'Đổi ý c (0: Sai b√3/2, 1: Đúng b√3)', min: 0, max: 1 },
    ],
    validateCode: `
      const { h, b, flipC } = params;
      if (h < 1 || b < 1 || h > 20 || b > 20) {
        return { valid: false, reason: 'Chiều cao h và cạnh b phải nguyên dương thuộc [1; 20]' };
      }
      if (flipC !== 0 && flipC !== 1) {
        return { valid: false, reason: 'flipC chỉ nhận 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h, b, flipC } = params;
      const fmtRad = (rad) => {
        let out = 1;
        let rem = rad;
        for (let p = 2; p * p <= rem; p++) {
          while (rem % (p * p) === 0) {
            out *= p;
            rem /= p * p;
          }
        }
        if (rem === 1) return '' + out;
        return (out === 1 ? '' : out) + '\\sqrt{' + rem + '}';
      };

      const dotAB_BC = u.simplifyFrac(-b * b, 2);
      const halfMedFrac = u.simplifyFrac(b, 2);
      const halfMedTex =
        halfMedFrac.isInteger
          ? (halfMedFrac.num === 1 ? '' : halfMedFrac.num) + '\\sqrt{3}'
          : '\\frac{' + (halfMedFrac.num === 1 ? '' : halfMedFrac.num) + '\\sqrt{3}}{' + halfMedFrac.den + '}';
      const fullSumTex = (b === 1 ? '' : b) + '\\sqrt{3}';
      const scTex = fmtRad(h * h + b * b);
      const cIsTrue = flipC === 1;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{BC} \\cdot \\overrightarrow{AB} = ' + dotAB_BC.latex + '$',
          isTrue: true,
        },
        {
          key: 'b',
          text: '$\\overrightarrow{HB} + \\overrightarrow{HC} = \\overrightarrow{AH}$',
          isTrue: true,
        },
        {
          key: 'c',
          text: '$|\\overrightarrow{AB} + \\overrightarrow{AC}| = ' + (cIsTrue ? fullSumTex : halfMedTex) + '$',
          isTrue: cIsTrue,
        },
        {
          key: 'd',
          text: '$|\\overrightarrow{SB} + 2\\overrightarrow{MC}| = ' + scTex + '$',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, $SA = ' +
          h +
          '$, tam giác $ABC$ đều có cạnh bằng $' +
          b +
          '$. Gọi $H$ là trọng tâm của tam giác $ABC$, điểm $M$ là trung điểm của $BC$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'pyramid_perp_base_3d',
          params: { variant: 0 },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đúng. $\\overrightarrow{BC} \\cdot \\overrightarrow{AB} = ' + b + ' \\cdot ' + b + ' \\cdot \\cos 120^\\circ = ' + dotAB_BC.latex + '$.',
          'b) Đúng. Do $M$ là trung điểm $BC$ và $H$ là trọng tâm tam giác $ABC$ nên $\\overrightarrow{HB} + \\overrightarrow{HC} = 2\\overrightarrow{HM} = \\overrightarrow{AH}$.',
          'c) ' +
            (cIsTrue ? 'Đúng' : 'Sai') +
            '. Ta có $|\\overrightarrow{AB} + \\overrightarrow{AC}| = |2\\overrightarrow{AM}| = 2 \\cdot ' +
            halfMedTex +
            ' = ' +
            fullSumTex +
            '$.',
          'd) Đúng. Vì $2\\overrightarrow{MC} = \\overrightarrow{BC}$ nên $|\\overrightarrow{SB} + 2\\overrightarrow{MC}| = |\\overrightarrow{SB} + \\overrightarrow{BC}| = |\\overrightarrow{SC}| = \\sqrt{SA^2 + AC^2} = \\sqrt{' +
            h +
            '^2 + ' +
            b +
            '^2} = ' +
            scTex +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { h: 0, b: 2, flipC: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc SA=7, cạnh 2', params: { h: 7, b: 2, flipC: 0 }, expectedValid: true },
      { label: 'Tam giác Pytago SA=3, b=4 -> SC=5', params: { h: 3, b: 4, flipC: 1 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15)
  t12_b6_d15_cube_diag_given_tf: {
    id: 't12_b6_d15_cube_diag_given_tf',
    name: 'Vectơ cùng phương, góc và tích vô hướng trong hình lập phương biết đường chéo mặt',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Vectơ trong hình lập phương',
    description:
      'Cho hình lập phương ABCD.A1B1C1D1 biết B1C = k·√2·a (kèm hình minh họa). Xét 4 mệnh đề về số vectơ cùng phương, góc giữa hai đường chéo mặt, tích vô hướng và độ dài tổng 3 vectơ.',
    conditionSummary: 'k ∈ [1; 6], flipB ∈ {0, 1}',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k (B1C = k√2·a)', min: 1, max: 6 },
      { name: 'flipB', label: 'Đổi ý b (0: Sai 60°, 1: Đúng 120°)', min: 0, max: 1 },
    ],
    validateCode: `
      const { k, flipB } = params;
      if (!Number.isInteger(k) || k < 1 || k > 12) {
        return { valid: false, reason: 'Hệ số k phải nguyên dương thuộc [1; 12]' };
      }
      if (flipB !== 0 && flipB !== 1) {
        return { valid: false, reason: 'flipB chỉ nhận 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, flipB } = params;
      const kStr = k === 1 ? '' : '' + k;
      const sideTex = kStr + 'a';
      const diagFaceTex = kStr + '\\sqrt{2}a';
      const k2 = k * k;
      const a2Tex = (k2 === 1 ? '' : k2) + 'a^{2}';
      const diagSpaceTex = kStr + '\\sqrt{3}a';
      const bIsTrue = flipB === 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Số vectơ khác vectơ-không có điểm đầu và điểm cuối là các đỉnh của hình lập phương cùng phương với vectơ $\\overrightarrow{AB}$ là $7$',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Góc giữa $\\overrightarrow{A_1D}$ và $\\overrightarrow{BA_1}$ bằng $' + (bIsTrue ? 120 : 60) + '^\\circ$',
          isTrue: bIsTrue,
        },
        {
          key: 'c',
          text: '$\\overrightarrow{C_1D_1} \\cdot \\overrightarrow{BC} = ' + a2Tex + '$',
          isTrue: false,
        },
        {
          key: 'd',
          text: '$|\\overrightarrow{AB} + \\overrightarrow{A_1D_1} + \\overrightarrow{CC_1}| = ' + diagSpaceTex + '$',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Cho hình lập phương $ABCD.A_1B_1C_1D_1$ có $B_1C = ' +
          diagFaceTex +
          '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 2 },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đúng. Các vectơ khác vectơ-không có điểm đầu, điểm cuối là đỉnh hình lập phương cùng phương với $\\overrightarrow{AB}$ gồm: $\\overrightarrow{BA},\\, \\overrightarrow{CD},\\, \\overrightarrow{DC},\\, \\overrightarrow{A_1B_1},\\, \\overrightarrow{B_1A_1},\\, \\overrightarrow{C_1D_1},\\, \\overrightarrow{D_1C_1}$ (có đúng $7$ vectơ).',
          'b) ' +
            (bIsTrue ? 'Đúng' : 'Sai') +
            '. Vì $\\overrightarrow{BA_1} = -\\overrightarrow{A_1B}$ và tam giác $A_1BD$ đều ($\\widehat{BA_1D} = 60^\\circ$) nên $(\\overrightarrow{A_1D}, \\overrightarrow{BA_1}) = 180^\\circ - 60^\\circ = 120^\\circ$.',
          'c) Sai. Vì $B_1C = ' +
            diagFaceTex +
            '$ nên cạnh hình lập phương bằng $' +
            sideTex +
            '$. Do $C_1D_1 \\perp BC$ nên $\\overrightarrow{C_1D_1} \\cdot \\overrightarrow{BC} = ' +
            sideTex +
            ' \\cdot ' +
            sideTex +
            ' \\cdot \\cos 90^\\circ = 0 \\ne ' +
            a2Tex +
            '$.',
          'd) Đúng. Ta có $|\\overrightarrow{AB} + \\overrightarrow{A_1D_1} + \\overrightarrow{CC_1}| = |\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA_1}| = |\\overrightarrow{AC_1}| = ' +
            diagSpaceTex +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, flipB: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc B1C = √2 a', params: { k: 1, flipB: 0 }, expectedValid: true },
      { label: 'Biến thể k = 3', params: { k: 3, flipB: 1 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16)
  t12_b6_d16_trihedral_perp_tf: {
    id: 't12_b6_d16_trihedral_perp_tf',
    name: 'Biểu diễn vectơ, độ dài và góc trong hình chóp có ba cạnh bên đôi một vuông góc',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tam diện vuông và phân tích vectơ',
    description:
      'Cho hình chóp S.ABC có SA, SB, SC đôi một vuông góc với SA = c1·a, SB = c2·a, SC = c3·a, M trung điểm CA, H trung điểm BM (kèm hình minh họa). Đánh giá 4 khẳng định Đúng/Sai.',
    conditionSummary: 'c1, c2, c3 ∈ [1; 5] và c1 ≠ c3 để cos(SH, CA) ≠ 0',
    paramSpecs: [
      { name: 'c1', label: 'Hệ số SA = c1·a', min: 1, max: 5 },
      { name: 'c2', label: 'Hệ số SB = c2·a', min: 1, max: 5 },
      { name: 'c3', label: 'Hệ số SC = c3·a', min: 1, max: 5 },
    ],
    validateCode: `
      const { c1, c2, c3 } = params;
      if (c1 < 1 || c2 < 1 || c3 < 1 || c1 > 10 || c2 > 10 || c3 > 10) {
        return { valid: false, reason: 'c1, c2, c3 phải nguyên dương thuộc [1; 10]' };
      }
      if (c1 === c3) {
        return { valid: false, reason: 'Cần c1 ≠ c3 để cos(SH, CA) khác 0, tránh trùng dấu ở ý d' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c1, c2, c3 } = params;
      const fmtCoeffA = (c) => (c === 1 ? 'a' : c + 'a');
      const simplifyRad = (n) => {
        let out = 1;
        let rem = n;
        for (let p = 2; p * p <= rem; p++) {
          while (rem % (p * p) === 0) {
            out *= p;
            rem /= p * p;
          }
        }
        return { out, rem };
      };
      const fmtRadFracA = (numFactor, rad, den) => {
        const s = simplifyRad(rad);
        const fr = u.simplifyFrac(numFactor * s.out, den);
        if (s.rem === 1) {
          if (fr.isInteger) return (fr.num === 1 ? '' : fr.num) + 'a';
          return '\\frac{' + fr.num + 'a}{' + fr.den + '}';
        }
        const top = (fr.num === 1 ? '' : fr.num) + '\\sqrt{' + s.rem + '}a';
        return fr.den === 1 ? top : '\\frac{' + top + '}{' + fr.den + '}';
      };
      const fmtCosFrac = (num, rad) => {
        const s = simplifyRad(rad);
        // num / (s.out * sqrt(s.rem)) = num * sqrt(s.rem) / (s.out * s.rem)
        const fr = u.simplifyFrac(num, s.out * s.rem);
        const sgn = fr.num < 0 ? '-' : '';
        const absN = Math.abs(fr.num);
        if (s.rem === 1) {
          return fr.latex;
        }
        const top = (absN === 1 ? '' : absN) + '\\sqrt{' + s.rem + '}';
        return fr.den === 1 ? sgn + top : sgn + '\\frac{' + top + '}{' + fr.den + '}';
      };

      // True values:
      // b) SB.SH = (1/2) c2^2 a^2
      const dotSbSh = u.simplifyFrac(c2 * c2, 2);
      const dotSbShTex = dotSbSh.isInteger
        ? (dotSbSh.num === 1 ? '' : dotSbSh.num) + 'a^{2}'
        : '\\frac{' + dotSbSh.num + 'a^{2}}{' + dotSbSh.den + '}';

      // c) True SH = sqrt(4 c2^2 + c1^2 + c3^2)/4 a; Fake SH (statement) = sqrt(c1^2+c2^2+c3^2)/2 a (guaranteed distinct!)
      const shRadTrue = 4 * c2 * c2 + c1 * c1 + c3 * c3;
      const shTrueTex = fmtRadFracA(1, shRadTrue, 4);
      const shFakeRad = c1 * c1 + c2 * c2 + c3 * c3;
      const shFakeTex = fmtRadFracA(1, shFakeRad, 2);

      // d) SH.CA = (c1^2 - c3^2)/4 a^2, CA = sqrt(c1^2+c3^2) a -> cos = (c1^2 - c3^2) / sqrt(shRadTrue * caSq)
      const caSq = c1 * c1 + c3 * c3;
      const diffSq = c1 * c1 - c3 * c3;
      const sh2Frac = u.simplifyFrac(shRadTrue, 16);
      const sh2Tex = sh2Frac.isInteger ? sh2Frac.num + 'a^{2}' : '\\frac{' + sh2Frac.num + 'a^{2}}{' + sh2Frac.den + '}';
      const dotShCaFrac = u.simplifyFrac(diffSq, 4);
      const dotShCaTex = dotShCaFrac.isInteger
        ? (dotShCaFrac.num === 1 ? '' : dotShCaFrac.num === -1 ? '-' : dotShCaFrac.num) + 'a^{2}'
        : (dotShCaFrac.num < 0 ? '-' : '') + '\\frac{' + (Math.abs(dotShCaFrac.num) === 1 ? '' : Math.abs(dotShCaFrac.num)) + 'a^{2}}{' + dotShCaFrac.den + '}';
      const caTex = fmtRadFracA(1, caSq, 1);
      const trueCosTex = fmtCosFrac(diffSq, shRadTrue * caSq);
      const fakeCosTex = fmtCosFrac(-diffSq, shRadTrue * caSq);

      const tfStatements = [
        {
          key: 'a',
          text: '$\\overrightarrow{SH} = \\frac{1}{4}\\overrightarrow{SB} + \\frac{\\overrightarrow{SC} + \\overrightarrow{SA}}{2}$',
          isTrue: false,
        },
        {
          key: 'b',
          text: '$\\overrightarrow{SB} \\cdot \\overrightarrow{SH} = ' + dotSbShTex + '$',
          isTrue: true,
        },
        {
          key: 'c',
          text: '$SH = ' + shFakeTex + '$',
          isTrue: false,
        },
        {
          key: 'd',
          text: '$\\cos\\left(\\overrightarrow{SH}, \\overrightarrow{CA}\\right) = ' + fakeCosTex + '$',
          isTrue: false,
        },
      ];

      return {
        stem:
          'Cho hình chóp $S.ABC$ có $SA, SB, SC$ đôi một vuông góc. Biết $SA = ' +
          fmtCoeffA(c1) +
          '$, $SB = ' +
          fmtCoeffA(c2) +
          '$, $SC = ' +
          fmtCoeffA(c3) +
          '$. Gọi $M$ là trung điểm của $CA$, $H$ là trung điểm của $BM$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'pyramid_perp_base_3d',
          params: { variant: 1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Ta có $\\overrightarrow{SH} = \\frac{1}{2}\\left(\\overrightarrow{SM} + \\overrightarrow{SB}\\right) = \\frac{1}{2}\\overrightarrow{SB} + \\frac{\\overrightarrow{SC} + \\overrightarrow{SA}}{4}$.',
          'b) Đúng. Vì $SA, SB, SC$ đôi một vuông góc nên $\\overrightarrow{SB} \\cdot \\overrightarrow{SA} = 0$ và $\\overrightarrow{SB} \\cdot \\overrightarrow{SC} = 0$, do đó $\\overrightarrow{SB} \\cdot \\overrightarrow{SH} = \\frac{1}{2}SB^2 = ' + dotSbShTex + '$.',
          'c) Sai. $SH^2 = \\frac{1}{4}SB^2 + \\frac{1}{16}SC^2 + \\frac{1}{16}SA^2 = ' + sh2Tex + ' \\Rightarrow SH = ' + shTrueTex + ' \\ne ' + shFakeTex + '$.',
          'd) Sai. Ta có $\\overrightarrow{SH} \\cdot \\overrightarrow{CA} = \\left(\\frac{1}{2}\\overrightarrow{SB} + \\frac{1}{4}\\overrightarrow{SC} + \\frac{1}{4}\\overrightarrow{SA}\\right)\\cdot\\left(\\overrightarrow{SA} - \\overrightarrow{SC}\\right) = \\frac{1}{4}SA^2 - \\frac{1}{4}SC^2 = ' + dotShCaTex + '$, và $CA = ' + caTex + '$. Suy ra $\\cos(\\overrightarrow{SH}, \\overrightarrow{CA}) = \\frac{\\overrightarrow{SH}\\cdot\\overrightarrow{CA}}{SH \\cdot CA} = ' + trueCosTex + ' \\ne ' + fakeCosTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1 = c3 (cos = 0 làm đối dấu trùng nhau)', params: { c1: 2, c2: 2, c3: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc SA=3a, SB=2a, SC=a', params: { c1: 3, c2: 2, c3: 1 }, expectedValid: true },
      { label: 'Biến thể SA < SC (cos âm, fakeCos dương)', params: { c1: 1, c2: 3, c3: 2 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (8 DẠNG: DẠNG 17 -> DẠNG 24)
  // =====================================================================

  // Dạng 17 (Q17)
  t12_b6_d17_gravity_force_sa: {
    id: 't12_b6_d17_gravity_force_sa',
    name: 'Tính độ lớn lực hấp dẫn P = mg của vật cho khối lượng (gam)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Ứng dụng vectơ lực hấp dẫn',
    description:
      'Cho vật có khối lượng m (gam) và gia tốc rơi tự do g = 9,8 m/s². Tính độ lớn lực hấp dẫn (Newton), làm tròn đến hàng phần trăm.',
    conditionSummary: 'mGram ∈ [120; 1850] và tránh mốc làm tròn trung gian .xx5',
    paramSpecs: [{ name: 'mGram', label: 'Khối lượng m (gam)', min: 120, max: 1850 }],
    validateCode: `
      const { mGram } = params;
      if (mGram <= 0 || mGram > 10000) {
        return { valid: false, reason: 'Khối lượng phải dương và không quá 10000 gam' };
      }
      const exact = (mGram / 1000) * 9.8;
      const frac = (exact * 100) - Math.floor(exact * 100);
      if (Math.abs(frac - 0.5) < 1e-4) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5 gây nhập nhằng' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mGram } = params;
      const mKg = mGram / 1000;
      const mKgStr = u.formatNumberVN(mKg, 3);
      const exact = mKg * 9.8;
      const rounded = Number(exact.toFixed(2));
      const ansStr = u.formatNumberVN(rounded, 2);

      return {
        stem:
          'Nếu một vật có khối lượng $m$ (kg) thì lực hấp dẫn $\\overrightarrow{P}$ của Trái Đất tác dụng lên vật được xác định theo công thức $\\overrightarrow{P} = m\\overrightarrow{g}$, trong đó $\\overrightarrow{g}$ là gia tốc rơi tự do có độ lớn $g = 9,8\\text{ m/s}^2$. Tính độ lớn của lực hấp dẫn của Trái Đất tác dụng lên một vật có khối lượng $' +
          mGram +
          '$ gam (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr + ' N',
        solutionSteps: [
          'Đổi đơn vị khối lượng: $m = ' + mGram + '\\text{ gam} = ' + mKgStr + '\\text{ kg}$.',
          'Độ lớn của lực hấp dẫn tác dụng lên vật là $|\\overrightarrow{P}| = |m\\overrightarrow{g}| = m \\cdot |\\overrightarrow{g}| = ' + mKgStr + ' \\cdot 9,8 \\approx ' + ansStr + '\\text{ (N)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mGram = 0', params: { mGram: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc 472 gam -> 4,63', params: { mGram: 472 }, expectedValid: true },
      { label: 'Vật nặng 1250 gam', params: { mGram: 1250 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18)
  t12_b6_d18_lamp_3cables_sa: {
    id: 't12_b6_d18_lamp_3cables_sa',
    name: 'Tính lực căng mỗi sợi dây treo đèn bằng ba sợi dây đều hợp trần góc α',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cân bằng lực trong không gian',
    description:
      'Chiếc đèn trọng lượng P (N) được treo bởi 3 sợi dây không dãn bằng nhau tại A, B, C tạo tam giác đều, mỗi dây hợp mặt phẳng trần một góc α ∈ {30°, 45°, 60°} (kèm hình minh họa). Tính lực căng mỗi dây.',
    conditionSummary: 'P ∈ [90; 450] (bước 15), angIdx ∈ {0, 1, 2} và tránh ranh giới .5 khi làm tròn hàng đơn vị',
    paramSpecs: [
      { name: 'P', label: 'Trọng lượng đèn P (N)', min: 90, max: 450, step: 15 },
      { name: 'angIdx', label: 'Góc hợp trần (0:30°, 1:45°, 2:60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { P, angIdx } = params;
      if (P <= 0 || P > 2000) return { valid: false, reason: 'Trọng lượng P phải dương' };
      if (![0, 1, 2].includes(angIdx)) return { valid: false, reason: 'angIdx chỉ nhận 0, 1, 2' };
      const deg = [30, 45, 60][angIdx];
      const T = P / (3 * Math.sin((deg * Math.PI) / 180));
      if (Math.abs((T - Math.floor(T)) - 0.5) < 1e-4) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P, angIdx } = params;
      const angles = [
        { deg: 30, sinTex: '\\frac{1}{2}' },
        { deg: 45, sinTex: '\\frac{\\sqrt{2}}{2}' },
        { deg: 60, sinTex: '\\frac{\\sqrt{3}}{2}' },
      ];
      const ang = angles[angIdx];
      const exactT = P / (3 * Math.sin((ang.deg * Math.PI) / 180));
      const ans = Math.round(exactT);

      return {
        stem:
          'Người ta treo một chiếc đèn trang trí có trọng lượng $' +
          P +
          '\\text{ N}$ lên trần nhà bằng ba sợi dây không co dãn, bằng nhau tại ba điểm $A, B, C$. Mỗi sợi dây tạo với mặt phẳng trần nhà một góc $' +
          ang.deg +
          '^\\circ$, đèn được giữ ở trạng thái cân bằng. Biết tam giác $ABC$ đều, hỏi độ lớn lực căng của mỗi sợi dây là bao nhiêu Newton (làm tròn kết quả đến hàng đơn vị)?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'lamp_3cables_3d',
          params: { deg: ang.deg, P },
        },
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: ans + ' N',
        solutionSteps: [
          'Gọi điểm treo đèn là $O$. Tại $O$, đèn chịu tác dụng của trọng lực $\\vec{P}$ và ba lực căng dây $\\vec{T}_A, \\vec{T}_B, \\vec{T}_C$.',
          'Do tam giác $ABC$ đều và các sợi dây dài bằng nhau nên theo tính đối xứng, độ lớn lực căng trên ba sợi dây bằng nhau: $T_A = T_B = T_C = T$, và tổng các thành phần nằm ngang triệt tiêu nhau.',
          'Chiếu phương trình cân bằng lực lên phương thẳng đứng: $3 \\cdot T \\cdot \\sin ' +
            ang.deg +
            '^\\circ = P \\Leftrightarrow 3 \\cdot T \\cdot ' +
            ang.sinTex +
            ' = ' +
            P +
            ' \\Rightarrow T \\approx ' +
            ans +
            '\\text{ N}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên trọng lượng P = 0', params: { P: 0, angIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc P=150 N, góc 30° -> 100', params: { P: 150, angIdx: 0 }, expectedValid: true },
      { label: 'Góc 60°', params: { P: 240, angIdx: 2 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19)
  t12_b6_d19_car_crane_4cables_sa: {
    id: 't12_b6_d19_car_crane_4cables_sa',
    name: 'Tính trọng lượng ô tô được cần cẩu nâng qua khung sắt và 4 dây cáp đối xứng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cân bằng tổng hợp bốn lực căng dây cáp',
    description:
      'Khung sắt hộp chữ nhật nặng Pk (N) chứa ô tô được buộc vào móc E bởi 4 dây cáp bằng nhau tạo góc α với mặt phẳng (ABCD), mỗi dây có lực căng F (N) (kèm hình minh họa). Tính trọng lượng ô tô theo nghìn Newton.',
    conditionSummary: 'F ∈ [3000; 9000], Pk ∈ [2000; 6000], angIdx ∈ {0, 1, 2} sao cho 4F sin α - Pk ≥ 3000 N',
    paramSpecs: [
      { name: 'F', label: 'Lực căng mỗi dây cáp F (N)', min: 3000, max: 9000, step: 500 },
      { name: 'Pk', label: 'Trọng lượng khung sắt Pk (N)', min: 2000, max: 6000, step: 500 },
      { name: 'angIdx', label: 'Góc nghiêng cáp (0:30°, 1:45°, 2:60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { F, Pk, angIdx } = params;
      if (F <= 0 || Pk <= 0) return { valid: false, reason: 'Lực căng và trọng lượng khung phải dương' };
      if (![0, 1, 2].includes(angIdx)) return { valid: false, reason: 'angIdx chỉ nhận 0, 1, 2' };
      const deg = [30, 45, 60][angIdx];
      const pCarN = 4 * F * Math.sin((deg * Math.PI) / 180) - Pk;
      if (pCarN < 3000) {
        return { valid: false, reason: 'Trọng lượng xe ô tô phải đạt tối thiểu 3000 N để thực tế' };
      }
      const pKilo = pCarN / 1000;
      if (Math.abs((pKilo - Math.floor(pKilo)) - 0.5) < 1e-4) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .5 nghìn N' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { F, Pk, angIdx } = params;
      const deg = [30, 45, 60][angIdx];
      const exactN = 4 * F * Math.sin((deg * Math.PI) / 180) - Pk;
      const exactKilo = exactN / 1000;
      const ans = Math.round(exactKilo);

      return {
        stem:
          'Một chiếc ô tô được đặt trên mặt đáy dưới của một khung sắt có dạng hình hộp chữ nhật với đáy trên là hình chữ nhật $ABCD$, mặt phẳng $(ABCD)$ song song với mặt phẳng nằm ngang. Khung sắt đó được buộc vào móc $E$ của chiếc cần cẩu sao cho các đoạn dây cáp $EA, EB, EC, ED$ có độ dài bằng nhau và cùng tạo với mặt phẳng $(ABCD)$ một góc bằng $' +
          deg +
          '^\\circ$. Chiếc cần cẩu kéo khung sắt lên theo phương thẳng đứng. Trọng lượng của chiếc xe ô tô là bao nhiêu nghìn Newton (làm tròn kết quả đến hàng đơn vị), biết rằng các lực căng $\\overrightarrow{F_1}, \\overrightarrow{F_2}, \\overrightarrow{F_3}, \\overrightarrow{F_4}$ đều có cường độ là $' +
          F +
          '\\text{ N}$ và trọng lượng của khung sắt là $' +
          Pk +
          '\\text{ N}$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'crane_car_frame_3d',
          params: { deg, F, Pk },
        },
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: ans + ' nghìn N',
        solutionSteps: [
          'Do bốn dây cáp có độ dài bằng nhau và cùng tạo với mặt phẳng $(ABCD)$ góc $' + deg + '^\\circ$ nên hình chiếu của bốn lực căng lên mặt phẳng nằm ngang đôi một triệt tiêu nhau.',
          'Tổng các thành phần lực căng theo phương thẳng đứng cân bằng với tổng trọng lượng của ô tô $P$ và khung sắt $P_{\\text{khung}}$: $P + P_{\\text{khung}} = 4F\\sin ' + deg + '^\\circ$.',
          'Suy ra $P = 4 \\cdot ' +
            F +
            ' \\cdot \\sin ' +
            deg +
            '^\\circ - ' +
            Pk +
            ' \\approx ' +
            u.formatNumberVN(exactN, 1) +
            '\\text{ N} \\approx ' +
            u.formatNumberVN(exactKilo, 2) +
            '\\text{ (nghìn N)}$. Làm tròn đến hàng đơn vị ta được $' +
            ans +
            '$ nghìn Newton.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên lực kéo không đủ nâng khung', params: { F: 2000, Pk: 4000, angIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc F=4000, Pk=4000, 60° -> 10', params: { F: 4000, Pk: 4000, angIdx: 2 }, expectedValid: true },
      { label: 'Biến thể góc 45°', params: { F: 5000, Pk: 3000, angIdx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 20 (Q20)
  t12_b6_d20_chandelier_4chains_sa: {
    id: 't12_b6_d20_chandelier_4chains_sa',
    name: 'Tính lực căng mỗi đoạn xích treo đèn chùm hình chóp tứ giác đều',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cân bằng lực qua chóp tứ giác đều',
    description:
      'Chiếc đèn chùm khối lượng m (kg) treo bởi 4 đoạn xích SA, SB, SC, SD tạo hình chóp tứ giác đều có góc ASC = θ ∈ {60°, 90°}, lấy g = 10 m/s² (kèm hình minh họa). Tính độ lớn lực căng mỗi xích, làm tròn đến hàng phần mười.',
    conditionSummary: 'm ∈ [3; 20], thetaIdx ∈ {0, 1} (60° hoặc 90°), tránh ranh giới .x5',
    paramSpecs: [
      { name: 'm', label: 'Khối lượng đèn chùm m (kg)', min: 3, max: 20 },
      { name: 'thetaIdx', label: 'Góc ASC (0: 60°, 1: 90°)', min: 0, max: 1 },
    ],
    validateCode: `
      const { m, thetaIdx } = params;
      if (m <= 0 || m > 100) return { valid: false, reason: 'Khối lượng m phải dương' };
      if (thetaIdx !== 0 && thetaIdx !== 1) return { valid: false, reason: 'thetaIdx chỉ nhận 0 hoặc 1' };
      const theta = thetaIdx === 0 ? 60 : 90;
      const T = (10 * m) / (4 * Math.cos(((theta / 2) * Math.PI) / 180));
      const frac = (T * 10) - Math.floor(T * 10);
      if (Math.abs(frac - 0.5) < 1e-4) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, thetaIdx } = params;
      const theta = thetaIdx === 0 ? 60 : 90;
      const half = theta / 2;
      const cosTex = thetaIdx === 0 ? '\\frac{\\sqrt{3}}{2}' : '\\frac{\\sqrt{2}}{2}';
      const exactT = (10 * m) / (4 * Math.cos((half * Math.PI) / 180));
      const rounded = Number(exactT.toFixed(1));
      const ansStr = u.formatNumberVN(rounded, 1);

      return {
        stem:
          'Một chiếc đèn chùm treo có khối lượng $m = ' +
          m +
          '\\text{ kg}$ được thiết kế với đĩa đèn được giữ bởi bốn đoạn xích $SA, SB, SC, SD$ sao cho $S.ABCD$ là hình chóp tứ giác đều có $\\widehat{ASC} = ' +
          theta +
          '^\\circ$. Cho biết công thức tính độ lớn của trọng lực là $\\vec{P} = m\\vec{g}$ trong đó $\\vec{g}$ là vectơ gia tốc rơi tự do có độ lớn $g = 10\\text{ m/s}^2$. Tìm độ lớn lực căng của mỗi dây xích theo Newton (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'chandelier_4chains_3d',
          params: { theta, m },
        },
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr + ' N',
        solutionSteps: [
          'Trọng lượng của đèn chùm là $P = mg = ' + m + ' \\cdot 10 = ' + 10 * m + '\\text{ N}$.',
          'Gọi $O$ là tâm hình vuông $ABCD$. Do $S.ABCD$ là hình chóp tứ giác đều nên $SO \\perp (ABCD)$ và $SO$ là phân giác của $\\widehat{ASC}$, suy ra $\\widehat{ASO} = ' + half + '^\\circ$.',
          'Theo tính đối xứng, độ lớn lực căng trên bốn đoạn xích bằng nhau: $T_A = T_B = T_C = T_D = T$. Chiếu điều kiện cân bằng lực lên phương thẳng đứng $SO$: $4T \\cdot \\cos ' +
            half +
            '^\\circ = P \\Leftrightarrow 4T \\cdot ' +
            cosTex +
            ' = ' +
            10 * m +
            '$.',
          'Suy ra $T = \\frac{' + 10 * m + '}{4 \\cdot \\cos ' + half + '^\\circ} \\approx ' + ansStr + '\\text{ N}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { m: 0, thetaIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc m=5 kg, 60° -> 14,4', params: { m: 5, thetaIdx: 0 }, expectedValid: true },
      { label: 'Biến thể góc 90°, m = 8 kg', params: { m: 8, thetaIdx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21)
  t12_b6_d21_three_perp_forces_sa: {
    id: 't12_b6_d21_three_perp_forces_sa',
    name: 'Tính độ lớn hợp lực của ba lực đôi một vuông góc',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Quy tắc hình hộp hợp lực ba chiều',
    description:
      'Ba lực F1, F2, F3 đôi một vuông góc cùng tác động vào một vật có độ lớn f1, f2, f3 (N) (kèm hình minh họa). Tính độ lớn hợp lực, làm tròn đến hàng phần mười.',
    conditionSummary: 'f1, f2, f3 ∈ [3; 15], tránh ranh giới .x5',
    paramSpecs: [
      { name: 'f1', label: 'Độ lớn lực F1 (N)', min: 3, max: 15 },
      { name: 'f2', label: 'Độ lớn lực F2 (N)', min: 3, max: 15 },
      { name: 'f3', label: 'Độ lớn lực F3 (N)', min: 3, max: 15 },
    ],
    validateCode: `
      const { f1, f2, f3 } = params;
      if (f1 <= 0 || f2 <= 0 || f3 <= 0) {
        return { valid: false, reason: 'Độ lớn các lực phải dương' };
      }
      const F = Math.sqrt(f1 * f1 + f2 * f2 + f3 * f3);
      const frac = (F * 10) - Math.floor(F * 10);
      if (Math.abs(frac - 0.5) < 1e-4) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { f1, f2, f3 } = params;
      const sumSq = f1 * f1 + f2 * f2 + f3 * f3;
      const F = Math.sqrt(sumSq);
      const rounded = Number(F.toFixed(1));
      const ansStr = u.formatNumberVN(rounded, 1);

      return {
        stem:
          'Ba lực $\\vec{F_1},\\, \\vec{F_2},\\, \\vec{F_3}$ cùng tác động vào một vật có phương đôi một vuông góc nhau và có độ lớn lần lượt là $' +
          f1 +
          '\\text{ N}$, $' +
          f2 +
          '\\text{ N}$, $' +
          f3 +
          '\\text{ N}$. Tính độ lớn hợp lực của ba lực đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'three_perp_forces_3d',
          params: { f1, f2, f3 },
        },
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr + ' N',
        solutionSteps: [
          'Đặt $\\overrightarrow{OA} = \\overrightarrow{F_1}$, $\\overrightarrow{OB} = \\overrightarrow{F_2}$, $\\overrightarrow{OC} = \\overrightarrow{F_3}$. Dựng hình hộp chữ nhật nhận $OA, OB, OC$ làm ba cạnh xuất phát từ $O$ với đường chéo $OF$.',
          'Theo quy tắc hình hộp: $\\overrightarrow{F_1} + \\overrightarrow{F_2} + \\overrightarrow{F_3} = \\overrightarrow{OF}$.',
          'Độ lớn hợp lực là $|\\overrightarrow{OF}| = \\sqrt{OA^2 + OB^2 + OC^2} = \\sqrt{' +
            f1 +
            '^2 + ' +
            f2 +
            '^2 + ' +
            f3 +
            '^2} = \\sqrt{' +
            sumSq +
            '} \\approx ' +
            ansStr +
            '\\text{ N}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên lực F1 = 0', params: { f1: 0, f2: 7, f3: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc 8, 7, 6 -> 12,2', params: { f1: 8, f2: 7, f3: 6 }, expectedValid: true },
      { label: 'Bộ số nguyên 2, 3, 6 -> 7', params: { f1: 2, f2: 3, f3: 6 }, expectedValid: true },
    ],
  },

  // Dạng 22 (Q22)
  t12_b6_d22_linear_comb_norm_sa: {
    id: 't12_b6_d22_linear_comb_norm_sa',
    name: 'Tính độ dài tổ hợp tuyến tính |p·u + q·n| từ độ dài và tích vô hướng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Bình phương vô hướng và độ dài vectơ',
    description:
      'Cho |u|, |n| và tích vô hướng u · n thỏa mãn bất đẳng thức Cauchy-Schwarz |u · n| ≤ |u|.|n|. Tính độ dài |p·u + q·n| (làm tròn đến hàng phần mười).',
    conditionSummary: 'lenU, lenN ∈ [1; 6], p, q ≠ 0, |dot| ≤ lenU·lenN, |p·u + q·n| > 0',
    paramSpecs: [
      { name: 'lenU', label: 'Độ dài |u|', min: 1, max: 6 },
      { name: 'lenN', label: 'Độ dài |n|', min: 1, max: 6 },
      { name: 'dot', label: 'Tích vô hướng u·n', min: -12, max: 12 },
      { name: 'p', label: 'Hệ số p của u', min: -4, max: 4, allowZero: false },
      { name: 'q', label: 'Hệ số q của n', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { lenU, lenN, dot, p, q } = params;
      if (lenU < 1 || lenN < 1 || p === 0 || q === 0) {
        return { valid: false, reason: 'Độ dài phải dương và hệ số p, q khác 0' };
      }
      if (Math.abs(dot) > lenU * lenN) {
        return { valid: false, reason: 'Vi phạm bất đẳng thức Cauchy-Schwarz |u.n| <= |u|.|n|' };
      }
      const sq = p * p * lenU * lenU + 2 * p * q * dot + q * q * lenN * lenN;
      if (sq <= 0) {
        return { valid: false, reason: 'Độ dài tổ hợp vectơ phải dương' };
      }
      const val = Math.sqrt(sq);
      const frac = (val * 10) - Math.floor(val * 10);
      if (Math.abs(frac - 0.5) < 1e-4) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { lenU, lenN, dot, p, q } = params;
      const pTerm = u.formatTerm(p, '\\overrightarrow{u}', true);
      const qTerm = u.formatTerm(q, '\\overrightarrow{n}', false);
      const combExpr = pTerm + qTerm;
      const p2 = p * p;
      const q2 = q * q;
      const twoPQ = 2 * p * q;
      const sq = p2 * lenU * lenU + twoPQ * dot + q2 * lenN * lenN;
      const val = Math.sqrt(sq);
      const rounded = Number(val.toFixed(1));
      const ansStr = u.formatNumberVN(rounded, 1);

      const dotWrap = dot < 0 ? '(' + dot + ')' : '' + dot;
      const expTerm = twoPQ >= 0 ? ' + ' + twoPQ + '\\overrightarrow{u}\\cdot\\overrightarrow{n}' : ' - ' + Math.abs(twoPQ) + '\\overrightarrow{u}\\cdot\\overrightarrow{n}';

      return {
        stem:
          'Cho hai vectơ $\\overrightarrow{u}$ và $\\overrightarrow{n}$ thỏa mãn $|\\overrightarrow{u}| = ' +
          lenU +
          '$, $|\\overrightarrow{n}| = ' +
          lenN +
          '$ và $\\overrightarrow{u} \\cdot \\overrightarrow{n} = ' +
          dot +
          '$. Tính $|' +
          combExpr +
          '|$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Bình phương vô hướng biểu thức cần tính: $|' + combExpr + '|^2 = (' + combExpr + ')^2 = ' + p2 + '\\overrightarrow{u}^2' + expTerm + ' + ' + q2 + '\\overrightarrow{n}^2$.',
          'Thay số: $|' + combExpr + '|^2 = ' + p2 + ' \\cdot ' + lenU + '^2' + (twoPQ >= 0 ? ' + ' : ' - ') + Math.abs(twoPQ) + ' \\cdot ' + dotWrap + ' + ' + q2 + ' \\cdot ' + lenN + '^2 = ' + sq + '$.',
          'Suy ra $|' + combExpr + '| = \\sqrt{' + sq + '} ' + (Number.isInteger(val) ? '= ' + ansStr : '\\approx ' + ansStr) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vi phạm |u·n| > |u|.|n|', params: { lenU: 2, lenN: 3, dot: 8, p: 1, q: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc |2u - 4n| = 20', params: { lenU: 2, lenN: 4, dot: -8, p: 2, q: -4 }, expectedValid: true },
      { label: 'Kết quả vô tỉ làm tròn 1 chữ số', params: { lenU: 3, lenN: 2, dot: 2, p: 1, q: -2 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23)
  t12_b6_d23_cos_from_comb_norm_sa: {
    id: 't12_b6_d23_cos_from_comb_norm_sa',
    name: 'Tính cos góc giữa hai vectơ từ độ dài tổ hợp tuyến tính |p·u + q·v|',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tìm góc từ độ dài tổng hiệu vectơ',
    description:
      'Cho |u|, |v| và độ dài |p·u + q·v| dưới dạng căn chính xác (tích vô hướng là bội của 0,5). Tính cos(u, v) làm tròn đến hàng phần mười.',
    conditionSummary: 'lenU, lenV ∈ [1; 4], p, q ≠ 0, |dotHalf| ≤ 2·lenU·lenV (dot = dotHalf/2), |p·u + q·v| > 0',
    paramSpecs: [
      { name: 'lenU', label: 'Độ dài |u|', min: 1, max: 4 },
      { name: 'lenV', label: 'Độ dài |v|', min: 1, max: 4 },
      { name: 'p', label: 'Hệ số p của u', min: -4, max: 4, allowZero: false },
      { name: 'q', label: 'Hệ số q của v', min: -4, max: 4, allowZero: false },
      { name: 'dotHalf', label: 'Hai lần tích vô hướng 2(u·v)', min: -16, max: 16 },
    ],
    validateCode: `
      const { lenU, lenV, p, q, dotHalf } = params;
      if (lenU < 1 || lenV < 1 || p === 0 || q === 0) {
        return { valid: false, reason: 'Độ dài phải dương và hệ số p, q khác 0' };
      }
      if (Math.abs(dotHalf) > 2 * lenU * lenV) {
        return { valid: false, reason: 'Vi phạm bất đẳng thức Cauchy-Schwarz |cos| <= 1' };
      }
      const mSq = p * p * lenU * lenU + p * q * dotHalf + q * q * lenV * lenV;
      if (mSq <= 0) {
        return { valid: false, reason: 'Độ dài |pu + qv| phải dương' };
      }
      const cosVal = dotHalf / (2 * lenU * lenV);
      const frac = Math.abs(cosVal * 10) - Math.floor(Math.abs(cosVal * 10));
      if (Math.abs(frac - 0.5) < 1e-4) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { lenU, lenV, p, q, dotHalf } = params;
      const fmtRad = (n) => {
        let out = 1;
        let rem = n;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) {
            out *= k;
            rem /= k * k;
          }
        }
        if (rem === 1) return '' + out;
        return (out === 1 ? '' : out) + '\\sqrt{' + rem + '}';
      };

      const combExpr = u.formatTerm(p, '\\overrightarrow{u}', true) + u.formatTerm(q, '\\overrightarrow{v}', false);
      const p2 = p * p;
      const q2 = q * q;
      const twoPQ = 2 * p * q;
      const mSq = p2 * lenU * lenU + p * q * dotHalf + q2 * lenV * lenV;
      const normCombTex = fmtRad(mSq);
      const baseSum = p2 * lenU * lenU + q2 * lenV * lenV;

      const dotFrac = u.simplifyFrac(dotHalf, 2);
      const cosFrac = u.simplifyFrac(dotHalf, 2 * lenU * lenV);
      const rounded = Number(cosFrac.value.toFixed(1));
      const ansStr = u.formatNumberVN(rounded, 1);

      const expMid = twoPQ >= 0 ? ' + ' + twoPQ + '\\overrightarrow{u}\\cdot\\overrightarrow{v}' : ' - ' + Math.abs(twoPQ) + '\\overrightarrow{u}\\cdot\\overrightarrow{v}';

      return {
        stem:
          'Cho hai vectơ $\\overrightarrow{u}$ và $\\overrightarrow{v}$ thỏa mãn $|\\overrightarrow{u}| = ' +
          lenU +
          '$, $|\\overrightarrow{v}| = ' +
          lenV +
          '$ và $|' +
          combExpr +
          '| = ' +
          normCombTex +
          '$. Tính $\\cos(\\overrightarrow{u}, \\overrightarrow{v})$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $|' + combExpr + '|^2 = (' + combExpr + ')^2 = ' + p2 + '\\overrightarrow{u}^2' + expMid + ' + ' + q2 + '\\overrightarrow{v}^2 = ' + baseSum + expMid + '$.',
          'Theo giả thiết $|' + combExpr + '|^2 = ' + mSq + ' \\Rightarrow ' + baseSum + expMid + ' = ' + mSq + ' \\Rightarrow \\overrightarrow{u}\\cdot\\overrightarrow{v} = ' + dotFrac.latex + '$.',
          'Vậy $\\cos(\\overrightarrow{u}, \\overrightarrow{v}) = \\frac{\\overrightarrow{u}\\cdot\\overrightarrow{v}}{|\\overrightarrow{u}|\\cdot|\\overrightarrow{v}|} = ' + cosFrac.latex + (cosFrac.isInteger ? '' : ' \\approx ' + ansStr) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vi phạm |cos| > 1', params: { lenU: 1, lenV: 1, p: -4, q: 2, dotHalf: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc |-4u + 2v| = 2√7 -> -0,5', params: { lenU: 1, lenV: 1, p: -4, q: 2, dotHalf: -1 }, expectedValid: true },
      { label: 'Hai vectơ vuông góc (dotHalf = 0)', params: { lenU: 3, lenV: 2, p: 1, q: 2, dotHalf: 0 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24)
  t12_b6_d24_cos_two_combs_sa: {
    id: 't12_b6_d24_cos_two_combs_sa',
    name: 'Tính cos góc giữa hai vectơ tổ hợp tuyến tính x = p1·a + q1·b và y = p2·a + q2·b',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Góc giữa hai vectơ tổ hợp tuyến tính',
    description:
      'Cho |a|, |b| và tích vô hướng a · b (thỏa mãn Cauchy-Schwarz). Xét x = p1·a + q1·b và y = p2·a + q2·b khác vectơ-không. Tính cos(x, y) làm tròn đến hàng phần mười.',
    conditionSummary: 'lenA, lenB ∈ [1; 4], |dot| ≤ lenA·lenB, |x| > 0, |y| > 0',
    paramSpecs: [
      { name: 'lenA', label: 'Độ dài |a|', min: 1, max: 4 },
      { name: 'lenB', label: 'Độ dài |b|', min: 1, max: 4 },
      { name: 'dot', label: 'Tích vô hướng a·b', min: -8, max: 8 },
      { name: 'p1', label: 'Hệ số p1 của x', min: -3, max: 3, allowZero: false },
      { name: 'q1', label: 'Hệ số q1 của x', min: -3, max: 3, allowZero: false },
      { name: 'p2', label: 'Hệ số p2 của y', min: -3, max: 3, allowZero: false },
      { name: 'q2', label: 'Hệ số q2 của y', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { lenA, lenB, dot, p1, q1, p2, q2 } = params;
      if (lenA < 1 || lenB < 1 || p1 === 0 || q1 === 0 || p2 === 0 || q2 === 0) {
        return { valid: false, reason: 'Độ dài phải dương và các hệ số p1, q1, p2, q2 phải khác 0' };
      }
      if (Math.abs(dot) > lenA * lenB) {
        return { valid: false, reason: 'Vi phạm bất đẳng thức Cauchy-Schwarz |a.b| <= |a|.|b|' };
      }
      const xSq = p1 * p1 * lenA * lenA + 2 * p1 * q1 * dot + q1 * q1 * lenB * lenB;
      const ySq = p2 * p2 * lenA * lenA + 2 * p2 * q2 * dot + q2 * q2 * lenB * lenB;
      if (xSq <= 0 || ySq <= 0) {
        return { valid: false, reason: 'Hai vectơ x và y phải khác vectơ-không' };
      }
      const xy = p1 * p2 * lenA * lenA + q1 * q2 * lenB * lenB + (p1 * q2 + p2 * q1) * dot;
      const cosVal = Math.max(-1, Math.min(1, xy / Math.sqrt(xSq * ySq)));
      const frac = Math.abs(cosVal * 10) - Math.floor(Math.abs(cosVal * 10));
      if (Math.abs(frac - 0.5) < 1e-4) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { lenA, lenB, dot, p1, q1, p2, q2 } = params;
      const fmtRad = (n) => {
        let out = 1;
        let rem = n;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) {
            out *= k;
            rem /= k * k;
          }
        }
        if (rem === 1) return '' + out;
        return (out === 1 ? '' : out) + '\\sqrt{' + rem + '}';
      };

      const xExpr = u.formatTerm(p1, '\\overrightarrow{a}', true) + u.formatTerm(q1, '\\overrightarrow{b}', false);
      const yExpr = u.formatTerm(p2, '\\overrightarrow{a}', true) + u.formatTerm(q2, '\\overrightarrow{b}', false);

      const xSq = p1 * p1 * lenA * lenA + 2 * p1 * q1 * dot + q1 * q1 * lenB * lenB;
      const ySq = p2 * p2 * lenA * lenA + 2 * p2 * q2 * dot + q2 * q2 * lenB * lenB;
      const xy = p1 * p2 * lenA * lenA + q1 * q2 * lenB * lenB + (p1 * q2 + p2 * q1) * dot;
      const cosVal = Math.max(-1, Math.min(1, xy / Math.sqrt(xSq * ySq)));
      const rounded = Number(cosVal.toFixed(1));
      const ansStr = u.formatNumberVN(rounded, 1);

      const normXTex = fmtRad(xSq);
      const normYTex = fmtRad(ySq);
      const crossC = p1 * q2 + p2 * q1;
      const xyExpansion =
        u.formatTerm(p1 * p2, '\\overrightarrow{a}^2', true) +
        u.formatTerm(q1 * q2, '\\overrightarrow{b}^2', false) +
        (crossC !== 0 ? u.formatTerm(crossC, '\\overrightarrow{a}\\cdot\\overrightarrow{b}', false) : '');

      return {
        stem:
          'Cho hai vectơ $\\overrightarrow{a}$ và $\\overrightarrow{b}$ thỏa mãn $|\\overrightarrow{a}| = ' +
          lenA +
          '$, $|\\overrightarrow{b}| = ' +
          lenB +
          '$ và $\\overrightarrow{a} \\cdot \\overrightarrow{b} = ' +
          dot +
          '$. Xét hai vectơ $\\overrightarrow{x} = ' +
          xExpr +
          '$ và $\\overrightarrow{y} = ' +
          yExpr +
          '$. Tính $\\cos(\\overrightarrow{x}, \\overrightarrow{y})$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Tính tích vô hướng $\\overrightarrow{x} \\cdot \\overrightarrow{y} = (' + xExpr + ')(' + yExpr + ') = ' + xyExpansion + ' = ' + xy + '$.',
          'Tính độ dài: $|\\overrightarrow{x}| = \\sqrt{(' + xExpr + ')^2} = \\sqrt{' + xSq + '} = ' + normXTex + '$ và $|\\overrightarrow{y}| = \\sqrt{(' + yExpr + ')^2} = \\sqrt{' + ySq + '} = ' + normYTex + '$.',
          'Do đó $\\cos(\\overrightarrow{x}, \\overrightarrow{y}) = \\frac{\\overrightarrow{x} \\cdot \\overrightarrow{y}}{|\\overrightarrow{x}| \\cdot |\\overrightarrow{y}|} = \\frac{' + xy + '}{' + normXTex + ' \\cdot ' + normYTex + '} ' + (Math.abs(cosVal - rounded) < 1e-9 ? '= ' + ansStr : '\\approx ' + ansStr) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vectơ x triệt tiêu (= 0)', params: { lenA: 2, lenB: 2, dot: 4, p1: 1, q1: -1, p2: 2, q2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc cos = -1', params: { lenA: 2, lenB: 2, dot: 4, p1: -1, q1: -3, p2: 2, q2: 1 }, expectedValid: true },
      { label: 'Biến thể tổng quát góc nhọn/tù', params: { lenA: 3, lenB: 2, dot: -3, p1: 2, q1: 1, p2: 1, q2: -2 }, expectedValid: true },
    ],
  },
};

export const G12_B6_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B6_TEMPLATES).filter(
  (t) => t.category === 'MC'
);
export const G12_B6_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B6_TEMPLATES).filter(
  (t) => t.category === 'TF'
);
export const G12_B6_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B6_TEMPLATES).filter(
  (t) => t.category === 'SA'
);
