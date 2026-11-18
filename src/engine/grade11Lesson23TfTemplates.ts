import { MathTemplate } from '../types/math';

export const G11_B23_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D28 (Q28): Lăng trụ ABC.A'B'C', M, G trung điểm A'C', BC; H trọng tâm A'BC
  t11_b23_d28_prism_proj_tf: {
    id: 't11_b23_d28_prism_proj_tf',
    name: 'Phép chiếu song song trên lăng trụ ABC.A\'B\'C\' (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho lăng trụ ABC.A\'B\'C\' với M, G là trung điểm A\'C\', BC và H là trọng tâm ΔA\'BC. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'", M: 'M', G: 'G', H: 'H', Hp: "H'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1', M: 'N', G: 'I', H: 'K', Hp: 'K_1' },
        { A: 'M', B: 'N', C: 'P', Ap: "M'", Bp: "N'", Cp: "P'", M: 'I', G: 'K', H: 'G', Hp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.Ap + s.Bp + s.Cp;
      const sideAB = s.A + s.B + s.Bp + s.Ap;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.Ap + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.Cp + s.C + '$ là điểm $' + (aIs ? s.A : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.M + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.Ap + '$ là ' + (bIs ? 'một trung tuyến của tam giác $' + base + '$' : 'cạnh $' + s.A + s.C + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.M + '$ lên mặt phẳng $(' + sideAB + ')$ theo phương $' + s.B + s.C + '$ là trung điểm của $' + (cIs ? s.Ap + s.Bp : s.A + s.B) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Hp + '$ là hình chiếu song song của $' + s.H + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.Ap + '$. Khi đó: $\\overrightarrow{' + s.A + s.Hp + '} = ' + (dIs ? '-2' : '2') + '\\overrightarrow{' + s.G + s.Hp + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.M + ', ' + s.G + '$ lần lượt là trung điểm của $' + s.Ap + s.Cp + ', ' + s.B + s.C + '$. Gọi $' + s.H + '$ là trọng tâm của tam giác $' + s.Ap + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.Ap + s.A + ' \\parallel ' + s.Cp + s.C + '$ và $' + s.A + ' \\in (' + base + ')$ nên hình chiếu của $' + s.Ap + '$ là $' + s.A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.M + '$ lên $(' + base + ')$ theo phương $' + s.A + s.Ap + '$ được trung điểm $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.M + '$ là trung tuyến từ $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.M + '$ là trung điểm $' + s.Ap + s.Cp + '$ và $' + s.Bp + s.Cp + ' \\parallel ' + s.B + s.C + '$ nên hình chiếu của $' + s.M + '$ lên $(' + sideAB + ')$ theo phương $' + s.B + s.C + '$ là trung điểm của $' + s.Ap + s.Bp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Hp + '$ là trọng tâm tam giác $' + base + '$ và $' + s.G + '$ là trung điểm $' + s.B + s.C + '$ nên $\\overrightarrow{' + s.A + s.Hp + '} = -2\\overrightarrow{' + s.G + s.Hp + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (Đ Đ S S)', params: { setIdx: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Chóp S.ABCD đáy vuông, SA ⊥ (ABCD) - Vuông góc các đường thẳng
  t11_b23_d29_pyr_square_lines_perp_tf: {
    id: 't11_b23_d29_pyr_square_lines_perp_tf',
    name: 'Quan hệ vuông góc giữa các đường thẳng trong chóp S.ABCD (SA ⊥ đáy)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABCD có đáy hình vuông, SA ⊥ (ABCD). Xét tính đúng sai của 4 khẳng định về hai đường thẳng vuông góc.',
    conditionSummary: 'setIdx ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Đỉnh hình vuông (0: ABCD, 1: MNPQ)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx !== 0 && setIdx !== 1) return { valid: false, reason: 'setIdx ngoài miền {0, 1}' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const V = setIdx === 0 ? ['A', 'B', 'C', 'D'] : ['M', 'N', 'P', 'Q'];
      const [A, B, C, D] = V;
      const base = A + B + C + D;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const phrase = (isT, l1, l2) => 'Hai đường thẳng $' + l1 + '$ và $' + l2 + '$ ' + (isT ? 'vuông góc nhau' : 'không vuông góc');

      const tfStatements = [
        { key: 'a', text: phrase(aIs, C + D, 'S' + D), isTrue: aIs },
        { key: 'b', text: phrase(bIs, 'S' + A, B + D), isTrue: bIs },
        { key: 'c', text: phrase(cIs, 'S' + A, B + C), isTrue: cIs },
        { key: 'd', text: phrase(dIs, B + D, 'S' + C), isTrue: dIs },
      ];

      return {
        stem: 'Cho hình chóp $S.' + base + '$ có đáy là hình vuông, $S' + A + ' \\perp (' + base + ')$. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: A, vFL: B, vFR: C, vBR: D },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Do $' + C + D + ' \\perp ' + A + D + '$ và $' + C + D + ' \\perp S' + A + '$ nên $' + C + D + ' \\perp (S' + A + D + ') \\Rightarrow ' + C + D + ' \\perp S' + D + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Do $S' + A + ' \\perp (' + base + ')$ và $' + B + D + ' \\subset (' + base + ')$ nên $S' + A + ' \\perp ' + B + D + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Do $S' + A + ' \\perp (' + base + ')$ và $' + B + C + ' \\subset (' + base + ')$ nên $S' + A + ' \\perp ' + B + C + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Do $' + B + D + ' \\perp ' + A + C + '$ và $' + B + D + ' \\perp S' + A + '$ nên $' + B + D + ' \\perp (S' + A + C + ') \\Rightarrow ' + B + D + ' \\perp S' + C + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 2', params: { setIdx: 2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (Đ S S S)', params: { setIdx: 0, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Chóp S.ABCD đáy chữ nhật, SB ⊥ (ABCD) - Vuông góc các đường thẳng
  t11_b23_d30_pyr_rect_lines_perp_tf: {
    id: 't11_b23_d30_pyr_rect_lines_perp_tf',
    name: 'Quan hệ vuông góc giữa các đường thẳng trong chóp đáy chữ nhật (SB ⊥ đáy)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy hình chữ nhật, SB ⊥ (ABCD). Xét tính đúng sai của 4 khẳng định.',
    conditionSummary: 'setIdx ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Đỉnh hình chữ nhật (0: ABCD, 1: MNPQ)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx !== 0 && setIdx !== 1) return { valid: false, reason: 'setIdx ngoài miền {0, 1}' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const V = setIdx === 0 ? ['A', 'B', 'C', 'D'] : ['M', 'N', 'P', 'Q'];
      const [A, B, C, D] = V;
      const base = A + B + C + D;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const phrase = (isT, l1, l2) => 'Hai đường thẳng $' + l1 + '$ và $' + l2 + '$ ' + (isT ? 'vuông góc nhau' : 'không vuông góc');

      const tfStatements = [
        { key: 'a', text: phrase(aIs, 'S' + B, C + A), isTrue: aIs },
        { key: 'b', text: phrase(bIs, 'S' + B, C + D), isTrue: bIs },
        { key: 'c', text: phrase(cIs, D + A, 'S' + A), isTrue: cIs },
        { key: 'd', text: phrase(!dIs, C + A, 'S' + D), isTrue: dIs },
      ];

      return {
        stem: 'Cho hình chóp $S.' + base + '$ có đáy là hình chữ nhật, $S' + B + ' \\perp (' + base + ')$. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: B, vFL: C, vFR: D, vBR: A },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Do $S' + B + ' \\perp (' + base + ')$ và $' + C + A + ' \\subset (' + base + ')$ nên $S' + B + ' \\perp ' + C + A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Do $S' + B + ' \\perp (' + base + ')$ và $' + C + D + ' \\subset (' + base + ')$ nên $S' + B + ' \\perp ' + C + D + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Do $' + D + A + ' \\perp ' + B + A + '$ và $' + D + A + ' \\perp S' + B + '$ nên $' + D + A + ' \\perp (S' + B + A + ') \\Rightarrow ' + D + A + ' \\perp S' + A + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Nếu $' + C + A + ' \\perp S' + D + '$ thì $' + C + A + ' \\perp (S' + B + D + ') \\Rightarrow ' + C + A + ' \\perp ' + B + D + '$ (vô lí với hình chữ nhật bất kì), nên $' + C + A + '$ và $S' + D + '$ không vuông góc (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 2', params: { setIdx: 2, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (S Đ S S)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Chóp S.CDAB đáy vuông, SC ⊥ (CDAB) - Đường thẳng vuông góc mặt phẳng
  t11_b23_d31_pyr_square_line_perp_plane_tf: {
    id: 't11_b23_d31_pyr_square_line_perp_plane_tf',
    name: 'Quan hệ đường thẳng vuông góc với mặt phẳng trong chóp S.CDAB (SC ⊥ đáy)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.CDAB đáy vuông, SC ⊥ (CDAB). Xét tính đúng sai của 4 khẳng định đường vuông góc mặt.',
    conditionSummary: 'setIdx ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Đỉnh hình vuông (0: CDAB, 1: MNPQ)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx !== 0 && setIdx !== 1) return { valid: false, reason: 'setIdx ngoài miền {0, 1}' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const V = setIdx === 0 ? ['C', 'D', 'A', 'B'] : ['M', 'N', 'P', 'Q'];
      const [C, D, A, B] = V;
      const base = C + D + A + B;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const stmt = (isPerpClaim, l, pl) => 'Đường thẳng $' + l + '$ ' + (isPerpClaim ? 'vuông góc' : 'không vuông góc') + ' với mặt phẳng $(' + pl + ')$';

      const tfStatements = [
        { key: 'a', text: stmt(!aIs, D + A, 'S' + C + A), isTrue: aIs },
        { key: 'b', text: stmt(bIs, D + B, 'S' + C + A), isTrue: bIs },
        { key: 'c', text: stmt(cIs, A + B, 'S' + C + B), isTrue: cIs },
        { key: 'd', text: stmt(!dIs, 'S' + C, 'S' + A + B), isTrue: dIs },
      ];

      return {
        stem: 'Cho hình chóp $S.' + base + '$ có đáy là hình vuông, $S' + C + ' \\perp (' + base + ')$. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: C, vFL: D, vFR: A, vBR: B },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Do $' + D + C + '$ không vuông góc với $' + C + A + '$ nên $' + D + A + '$ không vuông góc với mặt phẳng $(S' + C + A + ')$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Do $' + D + B + ' \\perp ' + C + A + '$ và $' + D + B + ' \\perp S' + C + '$ nên $' + D + B + ' \\perp (S' + C + A + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Do $' + A + B + ' \\perp ' + C + B + '$ và $' + A + B + ' \\perp S' + C + '$ nên $' + A + B + ' \\perp (S' + C + B + ')$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Nếu $S' + C + ' \\perp (S' + A + B + ')$ thì $S' + C + ' \\perp S' + B + '$ (vô lí vì tam giác $S' + C + B + '$ vuông tại $' + C + '$). Do đó $S' + C + '$ không vuông góc với $(S' + A + B + ')$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 2', params: { setIdx: 2, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (S Đ Đ Đ)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Chóp S.ABCD đáy vuông, SB ⊥ (ABCD) - Phủ định đường thẳng vuông góc mặt
  t11_b23_d32_pyr_square_line_not_perp_tf: {
    id: 't11_b23_d32_pyr_square_line_not_perp_tf',
    name: 'Nhận biết khẳng định không vuông góc giữa đường và mặt (SB ⊥ đáy)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy hình vuông, SB ⊥ (ABCD). Xét 4 khẳng định Đúng/Sai về đường thẳng vuông góc hoặc không vuông góc mặt phẳng.',
    conditionSummary: 'setIdx ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Đỉnh hình vuông (0: ABCD, 1: MNPQ)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx !== 0 && setIdx !== 1) return { valid: false, reason: 'setIdx ngoài miền {0, 1}' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const V = setIdx === 0 ? ['A', 'B', 'C', 'D'] : ['M', 'N', 'P', 'Q'];
      const [A, B, C, D] = V;
      const base = A + B + C + D;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const stmt = (isPerpClaim, l, pl) => 'Đường thẳng $' + l + '$ ' + (isPerpClaim ? 'vuông góc' : 'không vuông góc') + ' với mặt phẳng $(' + pl + ')$';

      const tfStatements = [
        { key: 'a', text: stmt(!aIs, C + D, 'S' + B + D), isTrue: aIs },
        { key: 'b', text: stmt(!bIs, 'S' + B, 'S' + D + A), isTrue: bIs },
        { key: 'c', text: stmt(!cIs, C + A, 'S' + B + C), isTrue: cIs },
        { key: 'd', text: stmt(dIs, D + A, 'S' + B + A), isTrue: dIs },
      ];

      return {
        stem: 'Cho hình chóp $S.' + base + '$ có đáy là hình vuông, $S' + B + ' \\perp (' + base + ')$. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: B, vFL: C, vFR: D, vBR: A },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Do $' + C + B + '$ không vuông góc với $' + B + D + '$ nên $' + C + D + '$ không vuông góc với $(S' + B + D + ')$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Nếu $S' + B + ' \\perp (S' + D + A + ')$ thì $S' + B + ' \\perp S' + A + '$ (vô lí vì tam giác $S' + B + A + '$ vuông tại $' + B + '$), nên $S' + B + '$ không vuông góc với $(S' + D + A + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Nếu $' + C + A + ' \\perp (S' + B + C + ')$ thì $' + C + A + ' \\perp ' + B + C + '$ (vô lí), nên $' + C + A + '$ không vuông góc với $(S' + B + C + ')$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Do $' + D + A + ' \\perp ' + B + A + '$ và $' + D + A + ' \\perp S' + B + '$ nên $' + D + A + ' \\perp (S' + B + A + ')$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 2', params: { setIdx: 2, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (Đ Đ Đ S)', params: { setIdx: 0, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Chóp S.ABCD đáy vuông, SB ⊥ (ABCD) - Đánh giá lập luận chứng minh vuông góc
  t11_b23_d33_pyr_square_reasoning_tf: {
    id: 't11_b23_d33_pyr_square_reasoning_tf',
    name: 'Đánh giá lập luận chứng minh đường thẳng vuông góc mặt phẳng (SB ⊥ đáy)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy vuông, SB ⊥ (ABCD). Đánh giá tính đúng sai của 4 lập luận chứng minh đường vuông góc mặt.',
    conditionSummary: 'setIdx ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Đỉnh hình vuông (0: ABCD, 1: MNPQ)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx !== 0 && setIdx !== 1) return { valid: false, reason: 'setIdx ngoài miền {0, 1}' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const V = setIdx === 0 ? ['A', 'B', 'C', 'D'] : ['M', 'N', 'P', 'Q'];
      const [A, B, C, D] = V;
      const base = A + B + C + D;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Vì $' + D + A + ' \\perp ' + B + A + '$ và $' + D + A + ' \\perp S' + B + '$ (do $S' + B + ' \\perp (' + base + ')$) nên $' + D + A + '$ ' + (aIs ? 'vuông góc với' : 'không vuông góc với') + ' $(S' + B + A + ')$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Vì $' + C + A + ' \\perp ' + B + D + '$ và $' + C + A + ' \\perp S' + B + '$ (do $S' + B + ' \\perp (' + base + ')$) nên $' + C + A + '$ ' + (bIs ? 'vuông góc với' : 'không vuông góc với') + ' $(S' + B + D + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Vì $' + C + D + '$ không vuông góc với $' + C + A + '$ nên $' + C + D + '$ ' + (cIs ? 'không vuông góc với' : 'vuông góc với') + ' $(S' + C + A + ')$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Vì $' + B + D + '$ không vuông góc với $' + D + A + '$ nên $' + B + D + '$ ' + (dIs ? 'không vuông góc với' : 'vuông góc với') + ' $(S' + D + A + ')$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $S.' + base + '$ có đáy là hình vuông, $S' + B + ' \\perp (' + base + ')$. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: B, vFL: C, vFR: D, vBR: A },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + D + A + ' \\perp ' + B + A + '$ và $' + D + A + ' \\perp S' + B + '$ nên $' + D + A + ' \\perp (S' + B + A + ')$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + C + A + ' \\perp ' + B + D + '$ và $' + C + A + ' \\perp S' + B + '$ nên $' + C + A + ' \\perp (S' + B + D + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + C + D + '$ không vuông góc với $' + C + A + '$ nên $' + C + D + '$ không vuông góc với $(S' + C + A + ')$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $' + B + D + '$ không vuông góc với $' + D + A + '$ nên $' + B + D + '$ không vuông góc với $(S' + D + A + ')$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 2', params: { setIdx: 2, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (Đ Đ S Đ)', params: { setIdx: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Chóp S.DABC đáy vuông tâm O, SD ⊥ đáy, DA = b*a, SD = h*a, DI ⊥ SC -> góc (DB, IB)
  t11_b23_d34_pyr_square_angle_calc_tf: {
    id: 't11_b23_d34_pyr_square_angle_calc_tf',
    name: 'Hình chiếu, quan hệ vuông góc và tính góc giữa DB và IB trong chóp S.DABC (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.DABC có SD ⊥ (DABC), đáy hình vuông cạnh b·a, SD = h·a. Tính góc giữa hai đường thẳng DB và IB.',
    conditionSummary: 'b ∈ [2; 6], h ∈ [2; 5], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'b', label: 'Hệ số cạnh đáy DA = b·a', min: 2, max: 6 },
      { name: 'h', label: 'Hệ số đường cao SD = h·a', min: 2, max: 5 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { b, h, aTrue, bTrue, cTrue, dTrue } = params;
      if (b < 2 || b > 6 || h < 2 || h > 5) return { valid: false, reason: 'b hoặc h ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      const sinV = h / Math.sqrt(2 * (h * h + b * b));
      const deg = Math.asin(sinV) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, h, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const s2 = h * h + b * b;
      const prod2 = 2 * s2;
      const sinV = h / Math.sqrt(prod2);
      const degExact = Math.asin(sinV) * 180 / Math.PI;
      const degTrue = Math.round(degExact * 10) / 10;
      const degShown = dIs ? degTrue : Math.round((degTrue + 3.0) * 10) / 10;
      const fmt1 = (x) => x.toFixed(1).replace('.', ',');

      const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) { out *= k; rem /= k * k; }
        }
        return { out, rem };
      };
      const diNum = h * b;
      const rS = rad(s2);
      const gDI = gcd(diNum, s2);
      const diTex = rS.rem === 1
        ? (() => {
            const den = rS.out;
            const g = gcd(diNum, den);
            return (den / g === 1) ? String(diNum / g) + 'a' : '\\frac{' + (diNum / g) + 'a}{' + (den / g) + '}';
          })()
        : (() => {
            const num = (diNum * rS.out) / gcd(diNum * rS.out, s2);
            const den = s2 / gcd(diNum * rS.out, s2);
            return '\\frac{' + (num === 1 ? '' : num) + '\\sqrt{' + rS.rem + '}a}{' + den + '}';
          })();

      const rSin = rad(prod2);
      const sinNum = h * rSin.out;
      const gSin = gcd(sinNum, prod2);
      const sN = sinNum / gSin, sD = prod2 / gSin;
      const sinTex = rSin.rem === 1
        ? '\\frac{' + sN + '}{' + sD + '}'
        : '\\frac{' + (sN === 1 ? '' : sN) + '\\sqrt{' + rSin.rem + '}}{' + sD + '}';

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu của đường thẳng $DB$ trên mặt phẳng $(SDA)$ là đường thẳng $' + (aIs ? 'DA' : 'SA') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hai đường thẳng $DC$ và $SA$ ' + (bIs ? 'vuông góc nhau' : 'không vuông góc nhau'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: cIs ? '$DB \\perp (SAC)$' : '$DB \\perp (SAB)$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $I$ là hình chiếu vuông góc của $D$ trên $SC$. Góc giữa hai đường thẳng $DB$ và $IB$ bằng $' + fmt1(degShown) + '^\\circ$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $S.DABC$ có $SD \\perp (DABC)$, đáy là hình vuông tâm $O$, $DA = ' + b + 'a$, $SD = ' + h + 'a$. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $BA \\perp DA$ và $BA \\perp SD \\Rightarrow BA \\perp (SDA)$ nên hình chiếu của $DB$ trên $(SDA)$ là $DA$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $DC \\perp DA, DC \\perp SD \\Rightarrow DC \\perp (SDA) \\Rightarrow DC \\perp SA$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Ta có $DB \\perp AC, DB \\perp SD \\Rightarrow DB \\perp (SAC)$ và $DB$ không vuông góc với $(SAB)$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $DI \\perp SC$ và $DI \\perp BC$ (do $BC \\perp (SDC)$) nên $DI \\perp (SBC) \\Rightarrow DI \\perp IB$. Khi đó $DB = ' + b + '\\sqrt{2}a$, $DI = \\dfrac{SD \\cdot DC}{\\sqrt{SD^2 + DC^2}} = ' + diTex + '$, suy ra $\\sin \\widehat{DBI} = \\dfrac{DI}{DB} = ' + sinTex + ' \\Rightarrow \\widehat{DBI} \\approx ' + fmt1(degTrue) + '^\\circ$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1, h: 2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (23,1° -> Đ S S S)', params: { b: 3, h: 2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
