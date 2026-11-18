import { MathTemplate } from '../types/math';

export const G11_B14_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D06 (Q6): Phép chiếu song song trong hình lăng trụ tam giác với trung điểm và trọng tâm (Đúng/Sai)
  t11_b14_d06_prism_parallel_projection_tf: {
    id: 't11_b14_d06_prism_parallel_projection_tf',
    name: 'Hình chiếu song song của điểm, đoạn trung tuyến và trọng tâm trong hình lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Phép chiếu song song',
    description: 'Cho hình lăng trụ ABC.A1B1C1, P, Q là trung điểm A1C1, BC và N là trọng tâm ΔA1BC. Xét 4 mệnh đề Đúng/Sai về phép chiếu song song.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2) {
        return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1', P: 'P', Q: 'Q', N: 'N', Np: "N'" },
        { A: 'A', B: 'B', C: 'C', A1: "A'", B1: "B'", C1: "C'", P: 'M', Q: 'I', N: 'G', Np: "G'" },
        { A: 'M', B: 'N', C: 'P', A1: 'M_1', B1: 'N_1', C1: 'P_1', P: 'E', Q: 'F', N: 'G', Np: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const baseBot = s.A + s.B + s.C;
      const baseTop = s.A1 + s.B1 + s.C1;
      const latAC = s.A + s.C + s.C1 + s.A1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.A1 + '$ lên mặt phẳng $(' + baseBot + ')$ theo phương $' + s.B1 + s.B + '$ là điểm $' + (aIs ? s.A : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.P + '$ lên mặt phẳng $(' + baseBot + ')$ theo phương $' + s.A + s.A1 + '$ là một ' + (bIs ? 'trung tuyến' : 'đường cao') + ' của tam giác $' + baseBot + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.Q + '$ lên mặt phẳng $(' + latAC + ')$ theo phương $' + s.B1 + s.A1 + '$ là trung điểm của $' + (cIs ? s.A + s.C : s.A1 + s.C1) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Np + '$ là hình chiếu song song của $' + s.N + '$ lên mặt phẳng $(' + baseBot + ')$ theo phương $' + s.C + s.C1 + '$. Khi đó: $\\overrightarrow{' + s.A + s.Np + '} = -' + (dIs ? '\\frac{2}{3}' : '\\frac{3}{2}') + '\\overrightarrow{' + s.Q + s.A + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + baseBot + '.' + baseTop + '$. Gọi $' + s.P + ', ' + s.Q + '$ lần lượt là trung điểm của $' + s.A1 + s.C1 + ', ' + s.B + s.C + '$. Gọi $' + s.N + '$ là trọng tâm của tam giác $' + s.A1 + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.A1 + s.A + ' \\parallel ' + s.B1 + s.B + '$ và $' + s.A + ' \\in (' + baseBot + ')$ nên hình chiếu của $' + s.A1 + '$ lên $(' + baseBot + ')$ theo phương $' + s.B1 + s.B + '$ là điểm $' + s.A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu theo phương $' + s.A + s.A1 + '$ lên $(' + baseBot + ')$, điểm $' + s.B + '$ giữ nguyên, trung điểm $' + s.P + '$ của $' + s.A1 + s.C1 + '$ biến thành trung điểm $M$ của $' + s.A + s.C + '$. Do đó hình chiếu của $' + s.B + s.P + '$ là trung tuyến $' + s.B + 'M$ của $\\triangle ' + baseBot + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.B1 + s.A1 + ' \\parallel ' + s.B + s.A + '$ và $' + s.Q + '$ là trung điểm $' + s.B + s.C + '$, đường thẳng qua $' + s.Q + '$ song song $' + s.B + s.A + '$ nằm trong $(' + baseBot + ')$ và cắt $' + s.A + s.C + '$ tại trung điểm của $' + s.A + s.C + '$ (không phải trung điểm của $' + s.A1 + s.C1 + '$) (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Chiếu $\\triangle ' + s.A1 + s.B + s.C + '$ lên $(' + baseBot + ')$ theo phương $' + s.C + s.C1 + '$ biến $' + s.A1 + ' \\mapsto ' + s.A + '$ và giữ nguyên $' + s.B + ', ' + s.C + '$, suy ra trọng tâm $' + s.N + '$ biến thành trọng tâm $' + s.Np + '$ của $\\triangle ' + baseBot + '$. Vì vậy $\\overrightarrow{' + s.A + s.Np + '} = \\frac{2}{3}\\overrightarrow{' + s.A + s.Q + '} = -\\frac{2}{3}\\overrightarrow{' + s.Q + s.A + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (S Đ S S)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
