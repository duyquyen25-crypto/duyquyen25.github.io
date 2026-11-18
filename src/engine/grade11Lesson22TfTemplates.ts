import { MathTemplate } from '../types/math';

export const G11_B22_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D09 (Q9): Phép chiếu song song trên lăng trụ ABC.DEF (Q trung điểm DF, N trung điểm BC, M trọng tâm DBC)
  t11_b22_d09_prism_proj_tf: {
    id: 't11_b22_d09_prism_proj_tf',
    name: 'Phép chiếu song song đỉnh, đoạn thẳng và trọng tâm trong lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Cho lăng trụ ABC.DEF với Q, N là trung điểm DF, BC và M là trọng tâm ΔDBC. Xét 4 khẳng định Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', Q: 'Q', N: 'N', M: 'M', Mp: "M'" },
        { A: 'A', B: 'B', C: 'C', D: "A'", E: "B'", F: "C'", Q: 'I', N: 'H', M: 'G', Mp: "G'" },
        { A: 'P', B: 'R', C: 'S', D: "P'", E: "R'", F: "S'", Q: 'K', N: 'I', M: 'G', Mp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.D + s.E + s.F;
      const latAC = s.A + s.C + s.F + s.D;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.E + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.F + s.C + '$ là điểm $' + (aIs ? s.B : s.C) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.Q + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.E + '$ là ' + (bIs ? 'trung tuyến xuất phát từ đỉnh $' + s.B + '$ của tam giác $' + base + '$' : 'đoạn thẳng $' + s.B + s.N + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.N + '$ lên mặt phẳng $(' + latAC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + (cIs ? s.A + s.C : s.D + s.F) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Mp + '$ là hình chiếu song song của $' + s.M + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.E + '$. Khi đó: $\\overrightarrow{' + s.A + s.Mp + '} = ' + (dIs ? '\\dfrac{2}{3}' : '\\dfrac{3}{2}') + '\\overrightarrow{' + s.A + s.N + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.Q + ', ' + s.N + '$ lần lượt là trung điểm của $' + s.D + s.F + ', ' + s.B + s.C + '$. Gọi $' + s.M + '$ là trọng tâm của tam giác $' + s.D + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.D, tF: s.E, tR: s.F },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.E + s.B + ' \\parallel ' + s.F + s.C + '$ và $' + s.B + ' \\in (' + base + ')$ nên hình chiếu của $' + s.E + '$ là $' + s.B + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu trung điểm $' + s.Q + '$ của $' + s.D + s.F + '$ theo phương $' + s.B + s.E + '$ được trung điểm của $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.Q + '$ là trung tuyến từ đỉnh $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Trong mặt đáy, $' + s.N + '$ là trung điểm $' + s.B + s.C + '$ nên hình chiếu của $' + s.N + '$ lên $(' + latAC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + s.A + s.C + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Mp + '$ là trọng tâm của tam giác $' + base + '$ và $' + s.N + '$ là trung điểm $' + s.B + s.C + '$ nên $\\overrightarrow{' + s.A + s.Mp + '} = \\dfrac{2}{3}\\overrightarrow{' + s.A + s.N + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (Đ S S S)', params: { setIdx: 0, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Góc giữa các cặp đường thẳng trong hình lập phương (Đúng/Sai)
  t11_b22_d10_cube_angles_tf: {
    id: 't11_b22_d10_cube_angles_tf',
    name: 'Góc giữa các cặp đường thẳng trong hình lập phương (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Cho hình lập phương ABCD.A\'B\'C\'D\' (hoặc ABCD.A₁B₁C₁D₁). Xét tính đúng sai của 4 khẳng định về góc giữa hai đường thẳng.',
    conditionSummary: 'setIdx ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Ký hiệu đỉnh trên (0: A₁B₁C₁D₁, 1: A\'B\'C\'D\')', min: 0, max: 1 },
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
      const top = setIdx === 1 ? "A'B'C'D'" : 'A_1B_1C_1D_1';
      const Ap = setIdx === 1 ? "A'" : 'A_1';
      const Bp = setIdx === 1 ? "B'" : 'B_1';
      const Cp = setIdx === 1 ? "C'" : 'C_1';
      const Dp = setIdx === 1 ? "D'" : 'D_1';
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Góc giữa hai đường thẳng $' + Ap + Dp + '$ và $CD$ bằng $' + (aIs ? 90 : 60) + '^\\circ$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Góc giữa hai đường thẳng $A' + Bp + '$ và $C' + Dp + '$ bằng $' + (bIs ? 90 : 45) + '^\\circ$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Góc giữa hai đường thẳng $' + Ap + 'B$ và $BD$ bằng $' + (cIs ? 60 : 45) + '^\\circ$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Góc giữa hai đường thẳng $' + Bp + 'C$ và $AD$ bằng $' + (dIs ? 45 : 60) + '^\\circ$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lập phương $ABCD.' + top + '$. Xét tính đúng sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: setIdx === 1 ? 1 : 2 },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $(' + Ap + Dp + ', CD) = (' + Ap + Dp + ', ' + Cp + Dp + ') = 90^\\circ$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $(' + 'A' + Bp + ', C' + Dp + ') = (A' + Bp + ', B' + Ap + ') = 90^\\circ$ vì là hai đường chéo của hình vuông $AB' + Bp + Ap + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Tam giác $' + Ap + 'BD$ đều nên $(' + Ap + 'B, BD) = 60^\\circ$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $(' + Bp + 'C, AD) = (' + Bp + 'C, BC) = 45^\\circ$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 2', params: { setIdx: 2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (Đ S S Đ)', params: { setIdx: 1, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },
};
