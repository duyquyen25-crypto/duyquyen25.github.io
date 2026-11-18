import { MathTemplate } from '../types/math';

export const G11_B24_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D13 (Q13): Lăng trụ ABC.A'B'C', H, G trung điểm A'C', BC; I trọng tâm A'BC
  t11_b24_d13_prism_proj_tf: {
    id: 't11_b24_d13_prism_proj_tf',
    name: 'Phép chiếu song song điểm, đường thẳng và trọng tâm trong lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Cho lăng trụ ABC.A\'B\'C\' với H, G lần lượt là trung điểm A\'C\', BC và I là trọng tâm ΔA\'BC. Xét 4 khẳng định Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'", H: 'H', G: 'G', I: 'I', Ip: "I'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1', H: 'M', G: 'N', I: 'K', Ip: 'K_1' },
        { A: 'D', B: 'E', C: 'F', Ap: "D'", Bp: "E'", Cp: "F'", H: 'M', G: 'N', I: 'G', Ip: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.Ap + s.Bp + s.Cp;
      const sideBC = s.B + s.C + s.Cp + s.Bp;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.Cp + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.Bp + '$ là điểm $' + (aIs ? s.C : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đường thẳng $' + s.A + s.H + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.Ap + '$ là đường thẳng $' + (bIs ? s.A + s.C : s.A + s.B) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.H + '$ lên mặt phẳng $(' + sideBC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + (cIs ? s.Bp + s.Cp : s.B + s.C) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Ip + '$ là hình chiếu song song của $' + s.I + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.Bp + '$. Khi đó: $\\overrightarrow{' + s.A + s.Ip + '} = ' + (dIs ? '-2' : '2') + '\\overrightarrow{' + s.G + s.Ip + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.H + ', ' + s.G + '$ lần lượt là trung điểm của $' + s.Ap + s.Cp + ', ' + s.B + s.C + '$. Gọi $' + s.I + '$ là trọng tâm của tam giác $' + s.Ap + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.Cp + s.C + ' \\parallel ' + s.B + s.Bp + '$ và $' + s.C + ' \\in (' + base + ')$ nên hình chiếu của $' + s.Cp + '$ là $' + s.C + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.H + '$ lên $(' + base + ')$ theo phương $' + s.A + s.Ap + '$ được trung điểm $' + s.A + s.C + '$, nên hình chiếu của đường thẳng $' + s.A + s.H + '$ là đường thẳng $' + s.A + s.C + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.H + '$ là trung điểm $' + s.Ap + s.Cp + '$ và $' + s.Bp + s.Ap + ' \\parallel ' + s.B + s.A + '$ nên hình chiếu của $' + s.H + '$ lên $(' + sideBC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + s.Bp + s.Cp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Ip + '$ là trọng tâm tam giác $' + base + '$ và $' + s.G + '$ là trung điểm $' + s.B + s.C + '$ nên $' + s.A + s.Ip + ' = 2' + s.G + s.Ip + '$ và $\\overrightarrow{' + s.A + s.Ip + '} = -2\\overrightarrow{' + s.G + s.Ip + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (Đ Đ S Đ)', params: { setIdx: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },
};
