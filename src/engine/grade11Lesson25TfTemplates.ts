import { MathTemplate } from '../types/math';

export const G11_B25_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D23 (Q23): Lăng trụ ABC.A'B'C', I, Q trung điểm A'C', BC; H trọng tâm A'BC
  t11_b25_d23_prism_proj_tf: {
    id: 't11_b25_d23_prism_proj_tf',
    name: 'Phép chiếu song song trên lăng trụ ABC.A\'B\'C\' (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho lăng trụ ABC.A\'B\'C\' với I, Q là trung điểm A\'C\', BC và H là trọng tâm ΔA\'BC. Xét 4 khẳng định Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'", I: 'I', Q: 'Q', H: 'H', Hp: "H'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1', I: 'M', Q: 'N', H: 'G', Hp: 'G_1' },
        { A: 'P', B: 'R', C: 'S', Ap: "P'", Bp: "R'", Cp: "S'", I: 'I', Q: 'Q', H: 'H', Hp: "H'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.Ap + s.Bp + s.Cp;
      const sideAB = s.A + s.B + s.Bp + s.Ap;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.Ap + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.Bp + s.B + '$ là điểm $' + (aIs ? s.A : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.I + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.Bp + '$ là ' + (bIs ? 'một trung tuyến của tam giác $' + base + '$' : 'đoạn thẳng $' + s.B + s.Q + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.I + '$ lên mặt phẳng $(' + sideAB + ')$ theo phương $' + s.B + s.C + '$ là trung điểm của $' + (cIs ? s.Ap + s.Bp : s.A + s.B) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Hp + '$ là hình chiếu song song của $' + s.H + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.Bp + '$. Khi đó: $\\overrightarrow{' + s.A + s.Hp + '} = ' + (dIs ? '-\\dfrac{2}{3}' : '\\dfrac{2}{3}') + '\\overrightarrow{' + s.Q + s.A + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.I + ', ' + s.Q + '$ lần lượt là trung điểm của $' + s.Ap + s.Cp + ', ' + s.B + s.C + '$. Gọi $' + s.H + '$ là trọng tâm của tam giác $' + s.Ap + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.Ap + s.A + ' \\parallel ' + s.Bp + s.B + '$ và $' + s.A + ' \\in (' + base + ')$ nên hình chiếu của $' + s.Ap + '$ là $' + s.A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.I + '$ lên $(' + base + ')$ theo phương $' + s.B + s.Bp + '$ được trung điểm $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.I + '$ là trung tuyến từ $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.I + '$ là trung điểm $' + s.Ap + s.Cp + '$ và $' + s.Bp + s.Cp + ' \\parallel ' + s.B + s.C + '$ nên hình chiếu của $' + s.I + '$ lên $(' + sideAB + ')$ theo phương $' + s.B + s.C + '$ là trung điểm của $' + s.Ap + s.Bp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Hp + '$ là trọng tâm tam giác $' + base + '$ và $' + s.Q + '$ là trung điểm $' + s.B + s.C + '$ nên $' + s.A + s.Hp + ' = \\dfrac{2}{3}' + s.A + s.Q + '$ và $\\overrightarrow{' + s.A + s.Hp + '} = -\\dfrac{2}{3}\\overrightarrow{' + s.Q + s.A + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (Đ S Đ Đ)', params: { setIdx: 0, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
