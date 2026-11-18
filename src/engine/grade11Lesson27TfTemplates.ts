import { MathTemplate } from '../types/math';

export const G11_B27_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D25 (Q25): Lăng trụ ABC.A1B1C1, I, H trung điểm A1C1, BC; M trọng tâm ΔA1BC
  t11_b27_d25_prism_proj_tf: {
    id: 't11_b27_d25_prism_proj_tf',
    name: 'Phép chiếu song song trên lăng trụ ABC.A₁B₁C₁ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Cho lăng trụ ABC.A₁B₁C₁ có I, H là trung điểm A₁C₁, BC và M là trọng tâm ΔA₁BC. Xét 4 khẳng định Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1', I: 'I', H: 'H', M: 'M', Mp: "M'" },
        { A: 'A', B: 'B', C: 'C', A1: "A'", B1: "B'", C1: "C'", I: 'E', H: 'F', M: 'G', Mp: "G'" },
        { A: 'P', B: 'Q', C: 'R', A1: 'P_1', B1: 'Q_1', C1: 'R_1', I: 'I', H: 'K', M: 'G', Mp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.A1 + s.B1 + s.C1;
      const sideAB = s.A + s.B + s.B1 + s.A1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.B1 + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.A1 + '$ là điểm $' + (aIs ? s.B : s.C) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.I + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.B1 + '$ là ' + (bIs ? 'một trung tuyến của tam giác $' + base + '$' : 'cạnh $' + s.B + s.C + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.I + '$ lên mặt phẳng $(' + sideAB + ')$ theo phương $' + s.B1 + s.C1 + '$ là trung điểm của $' + (cIs ? s.A1 + s.B1 : s.A + s.B) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Mp + '$ là hình chiếu song song của $' + s.M + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.A1 + '$. Khi đó: $\\overrightarrow{' + s.A + s.Mp + '} = ' + (dIs ? '-2' : '2') + '\\overrightarrow{' + s.H + s.Mp + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.I + ', ' + s.H + '$ lần lượt là trung điểm của $' + s.A1 + s.C1 + ', ' + s.B + s.C + '$. Gọi $' + s.M + '$ là trọng tâm của tam giác $' + s.A1 + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.B1 + s.B + ' \\parallel ' + s.A + s.A1 + '$ và $' + s.B + ' \\in (' + base + ')$ nên hình chiếu của $' + s.B1 + '$ là $' + s.B + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.I + '$ lên $(' + base + ')$ theo phương $' + s.B + s.B1 + '$ được trung điểm $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.I + '$ là trung tuyến xuất phát từ đỉnh $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.I + '$ là trung điểm $' + s.A1 + s.C1 + '$ và $' + s.B1 + s.C1 + ' \\parallel ' + s.B + s.C + '$ nên hình chiếu của $' + s.I + '$ lên $(' + sideAB + ')$ theo phương $' + s.B1 + s.C1 + '$ là trung điểm của $' + s.A1 + s.B1 + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Mp + '$ là trọng tâm tam giác $' + base + '$ và $' + s.H + '$ là trung điểm $' + s.B + s.C + '$ nên $' + s.A + s.Mp + ' = 2' + s.H + s.Mp + '$ và hai vectơ ngược hướng, suy ra $\\overrightarrow{' + s.A + s.Mp + '} = -2\\overrightarrow{' + s.H + s.Mp + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (S Đ Đ Đ)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
