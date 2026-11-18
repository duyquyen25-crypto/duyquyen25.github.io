import { MathTemplate } from '../types/math';

export const G11_B13_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D07 (Q7): Hình lăng trụ tam giác với 3 trọng tâm mặt đáy & mặt bên (Đúng/Sai)
  t11_b13_d07_prism_three_centroids_parallel_tf: {
    id: 't11_b13_d07_prism_three_centroids_parallel_tf',
    name: 'Quan hệ song song và đồng phẳng từ trọng tâm các mặt trong hình lăng trụ tam giác (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Cho hình lăng trụ tam giác ABC.A1B1C1, gọi I, K, H là trọng tâm các tam giác ABC, A1B1C1, ACC1. Xét 4 mệnh đề Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1', I: 'I', K: 'K', H: 'H' },
        { A: 'A', B: 'B', C: 'C', A1: "A'", B1: "B'", C1: "C'", I: 'G', K: "G'", H: 'E' },
        { A: 'M', B: 'N', C: 'P', A1: 'M_1', B1: 'N_1', C1: 'P_1', I: 'I', K: 'K', H: 'H' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: aIs
            ? 'Đường thẳng $' + s.A1 + s.K + '$ song song với mặt phẳng $(' + s.C1 + s.A + s.I + ')$'
            : 'Đường thẳng $' + s.A1 + s.K + '$ cắt mặt phẳng $(' + s.C1 + s.A + s.I + ')$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: bIs
            ? 'Đường thẳng $' + s.H + s.C + '$ nằm trong mặt phẳng $(' + s.A + s.A1 + s.C1 + ')$'
            : 'Đường thẳng $' + s.H + s.C + '$ song song với mặt phẳng $(' + s.A + s.A1 + s.C1 + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: cIs
            ? 'Hai đáy của hình lăng trụ nằm trong hai mặt phẳng song song nhau'
            : 'Hai đáy của hình lăng trụ nằm trong hai mặt phẳng cắt nhau',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$(' + s.A1 + s.K + s.B1 + ')$ và $(' + s.A + s.B + s.C + ')$ ' + (dIs ? 'song song với nhau' : 'không song song'),
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + s.A + s.B + s.C + '.' + s.A1 + s.B1 + s.C1 + '$. Gọi $' + s.I + ', ' + s.K + ', ' + s.H + '$ lần lượt là trọng tâm các tam giác $' + s.A + s.B + s.C + ', ' + s.A1 + s.B1 + s.C1 + ', ' + s.A + s.C + s.C1 + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Gọi $M, P$ là trung điểm $' + s.B + s.C + ', ' + s.B1 + s.C1 + '$, ta có $' + s.A + s.A1 + 'PM$ là hình bình hành và $\\dfrac{' + s.A + s.I + '}{' + s.A + 'M} = \\dfrac{' + s.A1 + s.K + '}{' + s.A1 + 'P} = \\dfrac{2}{3} \\Rightarrow ' + s.A1 + s.K + ' \\parallel ' + s.A + s.I + ' \\subset (' + s.C1 + s.A + s.I + ')$, mà $' + s.A1 + ' \\notin (' + s.C1 + s.A + s.I + ')$ nên $' + s.A1 + s.K + ' \\parallel (' + s.C1 + s.A + s.I + ')$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + s.H + '$ là trọng tâm $\\triangle ' + s.A + s.C + s.C1 + '$ nên $' + s.H + ', ' + s.C + ' \\in (' + s.A + s.A1 + s.C1 + ') \\Rightarrow ' + s.H + s.C + ' \\subset (' + s.A + s.A1 + s.C1 + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Hai đáy của hình lăng trụ luôn nằm trong hai mặt phẳng song song (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Ta có $(' + s.A1 + s.K + s.B1 + ') \\equiv (' + s.A1 + s.B1 + s.C1 + ') \\parallel (' + s.A + s.B + s.C + ')$ (do $' + s.A1 + s.K + ' \\parallel ' + s.A + s.I + '$ và $' + s.A1 + s.B1 + ' \\parallel ' + s.A + s.B + '$) (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (S Đ Đ S)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Hình hộp với hai trọng tâm hai mặt phẳng song song AHF và GBD (Đúng/Sai)
  t11_b13_d08_box_two_face_centroids_parallel_tf: {
    id: 't11_b13_d08_box_two_face_centroids_parallel_tf',
    name: 'Hai mặt phẳng song song và tính chất trọng tâm hai tam giác chéo trong hình hộp (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Cho hình hộp ABCD.EFGH, G1, G2 là trọng tâm ΔAHF, ΔGBD. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Kiểu ký hiệu hình hộp (0..2)', min: 0, max: 2 },
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
        { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', H: 'H', g1: 'G_1', g2: 'G_2', variant: 3 },
        { A: 'A', B: 'B', C: 'C', D: 'D', E: "A'", F: "B'", G: "C'", H: "D'", g1: 'G_1', g2: 'G_2', variant: 1 },
        { A: 'A', B: 'B', C: 'C', D: 'D', E: 'A_1', F: 'B_1', G: 'C_1', H: 'D_1', g1: 'I', g2: 'K', variant: 0 },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const boxName = s.A + s.B + s.C + s.D + '.' + s.E + s.F + s.G + s.H;
      const pl1 = s.A + s.H + s.F;
      const pl2 = s.G + s.B + s.D;

      const tfStatements = [
        {
          key: 'a',
          text: '$(' + pl1 + ')$ và $(' + pl2 + ')$ ' + (aIs ? 'song song với nhau' : 'không song song'),
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hai đáy của hình hộp là các ' + (bIs ? 'hình bình hành' : 'hình vuông'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$' + s.B + s.G + (cIs ? ' \\subset ' : ' \\parallel ') + '(' + s.A + s.H + s.G + ')$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: dIs
            ? '$' + s.A + s.g1 + ' \\parallel (' + s.B + s.G + s.D + ')$'
            : '$' + s.A + s.g1 + '$ cắt $(' + s.B + s.G + s.D + ')$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình hộp $' + boxName + '$. Gọi $' + s.g1 + ', ' + s.g2 + '$ lần lượt là trọng tâm tam giác $' + pl1 + ', ' + pl2 + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: s.variant },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.A + s.H + ' \\parallel ' + s.B + s.G + ' \\subset (' + pl2 + ')$ và $' + s.H + s.F + ' \\parallel ' + s.B + s.D + ' \\subset (' + pl2 + ')$ nên $(' + pl1 + ') \\parallel (' + pl2 + ')$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Hình hộp nói chung có hai đáy là các hình bình hành (không nhất thiết là hình vuông) (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Do $' + s.A + s.H + ' \\parallel ' + s.B + s.G + '$ nên bốn điểm $' + s.A + ', ' + s.H + ', ' + s.G + ', ' + s.B + '$ đồng phẳng, suy ra $' + s.B + s.G + ' \\subset (' + s.A + s.H + s.G + ')$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Gọi $O, O\'$ là tâm hai đáy $' + s.A + s.B + s.C + s.D + ', ' + s.E + s.F + s.G + s.H + '$. Khi đó $' + s.g1 + ' \\in ' + s.A + 'O\'$, mà $' + s.A + 'O\' \\parallel O' + s.G + ' \\subset (' + s.B + s.G + s.D + ')$ nên $' + s.A + s.g1 + ' \\parallel (' + s.B + s.G + s.D + ')$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = -1', params: { setIdx: -1, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (S S Đ Đ)', params: { setIdx: 0, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
