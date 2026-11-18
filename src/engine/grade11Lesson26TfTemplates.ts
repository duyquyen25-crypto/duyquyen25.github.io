import { MathTemplate } from '../types/math';

export const G11_B26_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D15 (Q15): Lăng trụ ABC.A1B1C1, H, Q trung điểm A1C1, BC; I trọng tâm ΔA1BC
  t11_b26_d15_prism_proj_tf: {
    id: 't11_b26_d15_prism_proj_tf',
    name: 'Phép chiếu song song trên lăng trụ ABC.A₁B₁C₁ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho lăng trụ ABC.A₁B₁C₁ với H, Q lần lượt là trung điểm A₁C₁, BC và I là trọng tâm ΔA₁BC. Xét 4 khẳng định Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1', H: 'H', Q: 'Q', I: 'I', Ip: "I'" },
        { A: 'A', B: 'B', C: 'C', A1: "A'", B1: "B'", C1: "C'", H: 'M', Q: 'N', I: 'G', Ip: "G'" },
        { A: 'P', B: 'Q', C: 'R', A1: 'P_1', B1: 'Q_1', C1: 'R_1', H: 'H', Q: 'K', I: 'I', Ip: "I'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.A1 + s.B1 + s.C1;
      const sideBC = s.B + s.C + s.C1 + s.B1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.A1 + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B1 + s.B + '$ là điểm $' + (aIs ? s.A : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.H + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.A1 + '$ là ' + (bIs ? 'một trung tuyến của tam giác $' + base + '$' : 'cạnh $' + s.B + s.C + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.H + '$ lên mặt phẳng $(' + sideBC + ')$ theo phương $' + s.B1 + s.A1 + '$ là trung điểm của $' + (cIs ? s.B1 + s.C1 : s.B + s.C) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Ip + '$ là hình chiếu song song của $' + s.I + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.C + s.C1 + '$. Khi đó: $\\overrightarrow{' + s.A + s.Ip + '} = ' + (dIs ? '-2' : '2') + '\\overrightarrow{' + s.Q + s.Ip + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.H + ', ' + s.Q + '$ lần lượt là trung điểm của $' + s.A1 + s.C1 + ', ' + s.B + s.C + '$. Gọi $' + s.I + '$ là trọng tâm của tam giác $' + s.A1 + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.A1 + s.A + ' \\parallel ' + s.B1 + s.B + '$ và $' + s.A + ' \\in (' + base + ')$ nên hình chiếu của $' + s.A1 + '$ là $' + s.A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.H + '$ lên $(' + base + ')$ theo phương $' + s.A + s.A1 + '$ được trung điểm $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.H + '$ là trung tuyến xuất phát từ đỉnh $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.H + '$ là trung điểm $' + s.A1 + s.C1 + '$ và $' + s.A1 + s.B1 + ' \\parallel ' + s.B1 + s.A1 + '$ nên hình chiếu của $' + s.H + '$ lên $(' + sideBC + ')$ theo phương $' + s.B1 + s.A1 + '$ là trung điểm của $' + s.B1 + s.C1 + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Ip + '$ là trọng tâm của tam giác $' + base + '$ và $' + s.Q + '$ là trung điểm $' + s.B + s.C + '$ nên $' + s.A + s.Ip + ' = 2' + s.Q + s.Ip + '$ và ngược hướng với $\\overrightarrow{' + s.Q + s.Ip + '}$, tức $\\overrightarrow{' + s.A + s.Ip + '} = -2\\overrightarrow{' + s.Q + s.Ip + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (S Đ Đ Đ)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
