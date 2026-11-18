import { MathTemplate } from '../types/math';

export const G11_B28_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D16 (Q16): Lăng trụ ABC.A'B'C', G, N trung điểm A'C', BC; Q trọng tâm ΔA'BC (Đúng/Sai)
  t11_b28_d16_prism_proj_tf: {
    id: 't11_b28_d16_prism_proj_tf',
    name: 'Phép chiếu song song trên lăng trụ ABC.A′B′C′ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Cho lăng trụ ABC.A′B′C′ có G, N lần lượt là trung điểm A′C′, BC và Q là trọng tâm ΔA′BC. Xét 4 mệnh đề Đúng/Sai về phép chiếu song song.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh và điểm (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 2) {
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
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'", G: 'G', N: 'N', Q: 'Q', Qp: "Q'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1', G: 'I', N: 'H', Q: 'M', Qp: "M'" },
        { A: 'M', B: 'N', C: 'P', Ap: "M'", Bp: "N'", Cp: "P'", G: 'E', N: 'K', Q: 'G', Qp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.Ap + s.Bp + s.Cp;
      const sideAC = s.A + s.C + s.Cp + s.Ap;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.Bp + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.Cp + s.C + '$ là điểm $' + (aIs ? s.B : s.C) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.G + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.Ap + '$ là ' + (bIs ? 'một trung tuyến của tam giác $' + base + '$' : 'cạnh $' + s.B + s.C + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.N + '$ lên mặt phẳng $(' + sideAC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + (cIs ? s.A + s.C : s.Ap + s.Cp) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Qp + '$ là hình chiếu song song của $' + s.Q + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.Bp + '$. Khi đó: $\\overrightarrow{' + s.A + s.Qp + '} = ' + (dIs ? '-\\frac{2}{3}' : '-\\frac{3}{2}') + '\\overrightarrow{' + s.N + s.A + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.G + ', ' + s.N + '$ lần lượt là trung điểm của $' + s.Ap + s.Cp + ', ' + s.B + s.C + '$. Gọi $' + s.Q + '$ là trọng tâm của tam giác $' + s.Ap + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.Bp + s.B + ' \\parallel ' + s.Cp + s.C + '$ và $' + s.B + ' \\in (' + base + ')$ nên hình chiếu của $' + s.Bp + '$ lên $(' + base + ')$ theo phương $' + s.Cp + s.C + '$ là điểm $' + s.B + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.B + '$ được $' + s.B + '$, chiếu $' + s.G + '$ theo phương $' + s.A + s.Ap + '$ được trung điểm $' + s.A + s.C + '$. Do đó hình chiếu của đoạn $' + s.B + s.G + '$ là trung tuyến xuất phát từ $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + s.N + '$ là trung điểm $' + s.B + s.C + '$, đường thẳng qua $' + s.N + '$ song song với $' + s.B + s.A + '$ cắt $' + s.A + s.C + '$ tại trung điểm của $' + s.A + s.C + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Qp + '$ là trọng tâm của tam giác $' + base + '$ và $' + s.N + '$ là trung điểm $' + s.B + s.C + '$ nên $\\overrightarrow{' + s.A + s.Qp + '} = \\frac{2}{3}\\overrightarrow{' + s.A + s.N + '} = -\\frac{2}{3}\\overrightarrow{' + s.N + s.A + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (Đ Đ Đ S)', params: { setIdx: 0, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },
};
