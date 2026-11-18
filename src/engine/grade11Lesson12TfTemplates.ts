import { MathTemplate } from '../types/math';

export const G11_B12_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D07 (Q7): Hình chóp đáy hình thoi, trung điểm cạnh bên hình thoi & trọng tâm hai mặt bên đối (Đúng/Sai)
  t11_b12_d07_rhombus_centroids_parallel_tf: {
    id: 't11_b12_d07_rhombus_centroids_parallel_tf',
    name: 'Tính chất song song, thuộc mặt phẳng và giao điểm từ trọng tâm hai mặt bên hình chóp (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho hình chóp đáy hình thoi tâm O, J, N là trung điểm hai cạnh đối và P, H là trọng tâm hai mặt bên tương ứng. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
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
        { S: 'S', A: 'A', B: 'B', E: 'E', F: 'F', O: 'O', J: 'J', N: 'N', P: 'P', H: 'H' },
        { S: 'S', A: 'A', B: 'B', E: 'C', F: 'D', O: 'O', J: 'M', N: 'N', P: 'G', H: 'K' },
        { S: 'O', A: 'A', B: 'B', E: 'C', F: 'D', O: 'I', J: 'E', N: 'F', P: 'P', H: 'Q' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: aIs
            ? '$' + s.P + s.H + ' \\parallel ' + s.B + s.E + '$'
            : '$' + s.P + s.H + '$ và $' + s.B + s.E + '$ chéo nhau',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: bIs
            ? '$' + s.B + s.P + '$ cắt $(' + s.S + s.E + s.F + ')$'
            : '$' + s.B + s.P + ' \\parallel (' + s.S + s.E + s.F + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$' + s.O + (cIs ? ' \\notin ' : ' \\in ') + '(' + s.S + s.E + s.F + ')$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Giao điểm của $' + s.J + s.F + '$ và $(' + s.S + s.B + s.E + ')$ là giao điểm của $' + s.J + s.F + '$ và $' + (dIs ? s.B + s.E : s.S + s.E) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.A + s.B + s.E + s.F + '$ có đáy là hình thoi tâm $' + s.O + '$. Gọi $' + s.J + ', ' + s.N + '$ lần lượt là các trung điểm của $' + s.A + s.B + ', ' + s.E + s.F + '$ và $' + s.P + ', ' + s.H + '$ lần lượt là trọng tâm các tam giác $' + s.S + s.A + s.B + ', ' + s.S + s.E + s.F + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.S, vBL: s.A, vBR: s.B, vFR: s.E, vFL: s.F, center: s.O },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $\\dfrac{' + s.S + s.P + '}{' + s.S + s.J + '} = \\dfrac{' + s.S + s.H + '}{' + s.S + s.N + '} = \\dfrac{2}{3}$ nên $' + s.P + s.H + ' \\parallel ' + s.J + s.N + '$. Mặt khác $' + s.J + s.N + '$ là đường nối trung điểm hai cạnh đối của hình thoi nên $' + s.J + s.N + ' \\parallel ' + s.B + s.E + '$, suy ra $' + s.P + s.H + ' \\parallel ' + s.B + s.E + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Giao tuyến của $(' + s.S + s.A + s.B + ')$ và $(' + s.S + s.E + s.F + ')$ là đường thẳng $d$ qua $' + s.S + '$ song song $' + s.A + s.B + '$. Trong $(' + s.S + s.A + s.B + ')$, trung tuyến $' + s.B + s.P + '$ cắt $' + s.S + s.A + '$ tại trung điểm nên $' + s.B + s.P + '$ không song song $d$, do đó $' + s.B + s.P + '$ cắt $(' + s.S + s.E + s.F + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Tâm $' + s.O + ' = ' + s.A + s.E + ' \\cap ' + s.B + s.F + '$ không nằm trên $' + s.E + s.F + ' = (' + s.S + s.E + s.F + ') \\cap (' + s.A + s.B + s.E + s.F + ')$ nên $' + s.O + ' \\notin (' + s.S + s.E + s.F + ')$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Trong mặt phẳng đáy, $' + s.J + s.F + '$ cắt $' + s.B + s.E + '$ tại một điểm $K \\subset (' + s.S + s.B + s.E + ')$, do đó $' + s.J + s.F + ' \\cap (' + s.S + s.B + s.E + ') = ' + s.J + s.F + ' \\cap ' + s.B + s.E + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (Đ S S S)', params: { setIdx: 0, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Hình chóp đáy hình thoi tâm I, trọng tâm hai mặt bên & giao tuyến song song (Đúng/Sai)
  t11_b12_d08_rhombus_centroids_section_tf: {
    id: 't11_b12_d08_rhombus_centroids_section_tf',
    name: 'Quan hệ song song đường – mặt, đường nằm trong mặt và giao tuyến hai mặt bên (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho hình chóp đáy hình thoi tâm I, trung điểm J, N và trọng tâm P, H của hai mặt bên. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
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
        { S: 'S', B: 'B', C: 'C', D: 'D', E: 'E', I: 'I', J: 'J', N: 'N', P: 'P', H: 'H' },
        { S: 'S', B: 'A', C: 'B', D: 'C', E: 'D', I: 'O', J: 'M', N: 'N', P: 'G', H: 'K' },
        { S: 'O', B: 'A', C: 'B', D: 'C', E: 'D', I: 'H', J: 'E', N: 'F', P: 'P', H: 'Q' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: '$' + s.P + s.H + '$ và $' + s.D + s.E + '$ ' + (aIs ? 'chéo nhau' : 'song song'),
          isTrue: aIs,
        },
        {
          key: 'b',
          text: bIs
            ? '$' + s.C + s.D + ' \\parallel (' + s.S + s.J + s.N + ')$'
            : '$' + s.C + s.D + '$ cắt $(' + s.S + s.J + s.N + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: cIs
            ? '$' + s.B + s.P + ' \\subset (' + s.S + s.C + s.J + ')$'
            : '$' + s.B + s.P + ' \\parallel (' + s.S + s.C + s.J + ')$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: dIs
            ? 'Giao tuyến của $(' + s.P + s.C + s.D + ')$ và $(' + s.S + s.B + s.E + ')$ đi qua trung điểm của $' + s.S + s.B + '$ và song song với $' + s.B + s.E + '$'
            : '$(' + s.P + s.C + s.D + ') \\cap (' + s.S + s.B + s.E + ') = ' + s.P + s.H + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.B + s.C + s.D + s.E + '$ có đáy là hình thoi tâm $' + s.I + '$. Gọi $' + s.J + ', ' + s.N + '$ lần lượt là các trung điểm của $' + s.B + s.C + ', ' + s.D + s.E + '$ và $' + s.P + ', ' + s.H + '$ lần lượt là trọng tâm các tam giác $' + s.S + s.B + s.C + ', ' + s.S + s.D + s.E + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.S, vBL: s.B, vBR: s.C, vFR: s.D, vFL: s.E, center: s.I },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Ta có $' + s.P + s.H + ' \\parallel ' + s.J + s.N + ' \\parallel ' + s.C + s.D + '$, mà $' + s.C + s.D + '$ cắt $' + s.D + s.E + '$ tại $' + s.D + '$ nên $' + s.P + s.H + '$ và $' + s.D + s.E + '$ chéo nhau, không song song (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + s.J + s.N + ' \\parallel ' + s.C + s.D + '$ và $' + s.J + s.N + ' \\subset (' + s.S + s.J + s.N + ')$, $' + s.C + ' \\notin (' + s.S + s.J + s.N + ')$ nên $' + s.C + s.D + ' \\parallel (' + s.S + s.J + s.N + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.P + ' \\in ' + s.S + s.J + ' \\subset (' + s.S + s.C + s.J + ')$ và $' + s.B + ' \\in ' + s.C + s.J + ' \\subset (' + s.S + s.C + s.J + ')$ nên $' + s.B + s.P + ' \\subset (' + s.S + s.C + s.J + ')$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Trung tuyến $' + s.C + s.P + '$ của $\\triangle ' + s.S + s.B + s.C + '$ cắt $' + s.S + s.B + '$ tại trung điểm $M$ của $' + s.S + s.B + '$. Vì $' + s.C + s.D + ' \\parallel ' + s.B + s.E + '$ nên giao tuyến của $(' + s.P + s.C + s.D + ')$ và $(' + s.S + s.B + s.E + ')$ đi qua $M$ và song song với $' + s.B + s.E + '$ (không phải $' + s.P + s.H + '$) (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên aTrue = 2', params: { setIdx: 0, aTrue: 2, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (S Đ Đ S)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },
};
