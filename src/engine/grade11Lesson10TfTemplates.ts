import { MathTemplate } from '../types/math';

export const G11_B10_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D07 (Q7): Hình chóp đáy hình thoi S.ABCD, N trên OC, M trên SA -> Đúng/Sai
  t11_b10_d07_rhombus_collinear_tf: {
    id: 't11_b10_d07_rhombus_collinear_tf',
    name: 'Quan hệ chứa trong, giao điểm và 3 điểm thẳng hàng trong hình chóp đáy hình thoi (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho hình chóp đáy hình thoi tâm O, các điểm phụ trên đường chéo và cạnh bên. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], swapDiag ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
      { name: 'swapDiag', label: 'Đổi cặp đường chéo (0/1)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, swapDiag, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2 || (swapDiag !== 0 && swapDiag !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, swapDiag, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { apex: 'S', A: 'A', B: 'B', C: 'C', D: 'D', O: 'O', N: 'N', M: 'M', E: 'E', F: 'F', I: 'I' },
        { apex: 'S', A: 'M', B: 'N', C: 'P', D: 'Q', O: 'O', N: 'K', M: 'I', E: 'E', F: 'F', I: 'J' },
        { apex: 'O', A: 'A', B: 'B', C: 'C', D: 'D', O: 'I', N: 'N', M: 'M', E: 'E', F: 'F', I: 'K' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const vM = swapDiag === 0 ? s.A : s.C;
      const vNEnd = swapDiag === 0 ? s.C : s.A;
      const vF = swapDiag === 0 ? s.B : s.D;
      const vD = swapDiag === 0 ? s.D : s.B;
      const edgeC = swapDiag === 0 ? s.A + s.B : s.C + s.D;
      const planeCTrue = s.apex + vM + vF;
      const planeCFalse = s.apex + vD + vNEnd;

      const tfStatements = [
        {
          key: 'a',
          text: 'Điểm $' + s.N + '$ thuộc mặt phẳng $(' + (aIs ? s.apex + s.A + s.C : s.apex + s.A + s.D) + ')$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$' + s.M + s.N + '$ ' + (bIs ? 'chứa' : 'không chứa') + ' trong mặt phẳng $(' + s.apex + s.A + s.C + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Gọi $' + s.I + ' = ' + s.N + vD + ' \\cap ' + edgeC + '$. Khi đó $' + s.M + s.I + ' \\subset (' + (cIs ? planeCTrue : planeCFalse) + ')$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Ba điểm $' + (dIs ? vD + ', ' + s.F + ', ' + s.E : vNEnd + ', ' + s.F + ', ' + s.E) + '$ thẳng hàng',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.A + s.B + s.C + s.D + '$ có đáy là hình thoi. Gọi $' + s.O + ' = ' + s.A + s.C + ' \\cap ' + s.B + s.D + '$. Lấy điểm $' + s.N + '$ thuộc đoạn $' + s.O + vNEnd + '$, điểm $' + s.M + '$ thuộc đoạn $' + s.apex + vM + '$. Gọi $' + s.E + ' = ' + s.M + s.N + ' \\cap ' + s.apex + s.O + '$, $' + s.F + ' = ' + s.apex + vF + ' \\cap (' + s.M + s.N + vD + ')$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.apex, vBL: s.A, vBR: s.B, vFR: s.C, vFL: s.D, center: s.O },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.N + ' \\in ' + s.A + s.C + '$ nên $' + s.N + ' \\in (' + s.apex + s.A + s.C + ')$ và $' + s.N + ' \\notin (' + s.apex + s.A + s.D + ')$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Cả $' + s.M + '$ và $' + s.N + '$ đều thuộc $(' + s.apex + s.A + s.C + ')$ nên $' + s.M + s.N + ' \\subset (' + s.apex + s.A + s.C + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Do $' + s.I + ' \\in ' + edgeC + '$ và $' + s.M + ' \\in ' + s.apex + vM + '$ nên $' + s.M + s.I + ' \\subset (' + planeCTrue + ')$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Ba điểm $' + vD + ', ' + s.F + ', ' + s.E + '$ cùng thuộc hai mặt phẳng phân biệt $(' + s.M + s.N + vD + ')$ và $(' + s.apex + s.B + s.D + ')$ nên thẳng hàng (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx ngoài miền', params: { setIdx: 5, swapDiag: 0, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (S S Đ Đ)', params: { setIdx: 0, swapDiag: 0, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Hình chóp tứ giác có AB ∩ CD = J, AC ∩ BD = E -> Đúng/Sai
  t11_b10_d08_quad_base_intersection_tf: {
    id: 't11_b10_d08_quad_base_intersection_tf',
    name: 'Xác định đường thẳng trong mặt phẳng và giao tuyến trong hình chóp tứ giác (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho hình chóp tứ giác với hai cặp cạnh đối cắt nhau tại J và hai đường chéo cắt nhau tại E. Xét tính đúng/sai.',
    conditionSummary: 'setIdx ∈ [0; 2], variant ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
      { name: 'variant', label: 'Cặp cạnh cắt nhau (0: AB∩CD, 1: AD∩BC)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, variant, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2 || (variant !== 0 && variant !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, variant, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { apex: 'S', A: 'A', B: 'B', C: 'C', D: 'D', J: 'J', E: 'E', G: 'G' },
        { apex: 'S', A: 'M', B: 'N', C: 'P', D: 'Q', J: 'I', E: 'O', G: 'K' },
        { apex: 'O', A: 'A', B: 'B', C: 'C', D: 'D', J: 'J', E: 'E', G: 'G' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const pairStr = variant === 0
        ? s.A + s.B + ' \\cap ' + s.C + s.D + ' = ' + s.J
        : s.A + s.D + ' \\cap ' + s.B + s.C + ' = ' + s.J;
      const f1 = variant === 0 ? s.apex + s.A + s.B : s.apex + s.A + s.D;
      const f2 = variant === 0 ? s.apex + s.C + s.D : s.apex + s.B + s.C;
      const wrongFaceA = variant === 0 ? s.apex + s.B + s.C : s.apex + s.A + s.B;
      const baseEdgeB = variant === 0 ? s.A + s.B : s.B + s.C;
      const baseWrongB = variant === 0 ? s.A + s.C : s.B + s.D;
      const planeB = variant === 0 ? s.apex + s.A + s.B : s.apex + s.B + s.C;
      const baseTri = s.A + s.B + s.C;
      const edgeG = variant === 0 ? s.A + s.D : s.A + s.B;
      const faceD = variant === 0 ? s.apex + s.A + s.D : s.apex + s.A + s.B;
      const wrongPtD = variant === 0 ? s.B : s.C;

      const tfStatements = [
        {
          key: 'a',
          text: 'Đường thẳng $' + s.apex + s.J + '$ nằm trong mặt phẳng $(' + (aIs ? f2 : wrongFaceA) + ')$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Giao tuyến của mặt phẳng $(' + planeB + ')$ và mặt phẳng $(' + baseTri + ')$ là đường thẳng $' + (bIs ? baseEdgeB : baseWrongB) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Giao tuyến của mặt phẳng $(' + f1 + ')$ và mặt phẳng $(' + f2 + ')$ là đường thẳng $' + (cIs ? s.apex + s.J : s.apex + s.E) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.G + ' = ' + s.J + s.E + ' \\cap ' + edgeG + '$. Khi đó $(' + s.apex + s.J + s.E + ') \\cap (' + faceD + ') = ' + (dIs ? s.apex + s.G : wrongPtD + s.G) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.A + s.B + s.C + s.D + '$ có $' + pairStr + '$, $' + s.A + s.C + ' \\cap ' + s.B + s.D + ' = ' + s.E + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.apex, vBL: s.A, vBR: s.B, vFR: s.C, vFL: s.D, center: s.E },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đường thẳng $' + s.apex + s.J + '$ nằm trong hai mặt phẳng $(' + f1 + ')$ và $(' + f2 + ')$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $(' + planeB + ') \\cap (' + baseTri + ') = ' + baseEdgeB + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + s.apex + '$ và $' + s.J + '$ là hai điểm chung nên $(' + f1 + ') \\cap (' + f2 + ') = ' + s.apex + s.J + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.apex + '$ và $' + s.G + '$ là hai điểm chung nên $(' + s.apex + s.J + s.E + ') \\cap (' + faceD + ') = ' + s.apex + s.G + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên variant ngoài miền', params: { setIdx: 0, variant: 2, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (S Đ Đ S)', params: { setIdx: 0, variant: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Tứ diện ABCD với hai trung điểm và hai điểm trên cạnh bên -> Đúng/Sai
  t11_b10_d09_tetra_midpoints_points_tf: {
    id: 't11_b10_d09_tetra_midpoints_points_tf',
    name: 'Tìm giao tuyến và giao điểm đường thẳng - mặt phẳng trong tứ diện (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho tứ diện ABCD với 4 điểm trên các cạnh. Xét tính đúng/sai về chứa trong, giao tuyến và giao điểm.',
    conditionSummary: 'setIdx ∈ [0; 3] (đổi bộ tên 4 điểm trên cạnh), aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên 4 điểm trên cạnh (0..3)', min: 0, max: 3 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 3) return { valid: false, reason: 'setIdx ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { M: 'M', K: 'K', J: 'J', N: 'N' },
        { M: 'I', K: 'J', J: 'M', N: 'N' },
        { M: 'E', K: 'F', J: 'P', N: 'Q' },
        { M: 'H', K: 'K', J: 'E', N: 'F' },
      ];
      const p = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: '$' + p.M + p.K + ' \\subset (' + (aIs ? p.K + 'AD' : 'ABD') + ')$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$(' + p.J + p.N + 'D) \\cap (ABD) = ' + (bIs ? p.J + 'D' : p.N + 'D') + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$(BC' + p.M + ') \\cap (ABD) = ' + (cIs ? 'B' + p.M : 'C' + p.M) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Giao điểm của đường thẳng $' + p.J + 'D$ và mặt phẳng $(' + p.M + 'BC)$ là giao điểm của $' + p.J + 'D$ và $' + (dIs ? p.M + 'B' : p.M + 'C') + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho tứ diện $ABCD$. Gọi $' + p.M + ', ' + p.K + '$ lần lượt là trung điểm của $AD, BC$, $' + p.J + '$ là một điểm trên cạnh $AB$, $' + p.N + '$ là một điểm trên cạnh $AC$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: 'A', vL: 'B', vF: 'C', vR: 'D' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + p.M + ' \\in AD$ nên $' + p.M + p.K + ' \\subset (' + p.K + 'AD)$ và $' + p.M + p.K + ' \\not\\subset (ABD)$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Hai điểm chung là $' + p.J + '$ và $D$ nên $(' + p.J + p.N + 'D) \\cap (ABD) = ' + p.J + 'D$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Hai điểm chung là $B$ và $' + p.M + '$ nên $(BC' + p.M + ') \\cap (ABD) = B' + p.M + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Trong mặt phẳng $(ABD)$, $' + p.J + 'D$ cắt giao tuyến $' + p.M + 'B$ của $(' + p.M + 'BC)$ và $(ABD)$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 4', params: { setIdx: 4, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (S Đ Đ S)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Tứ diện ABCD với tỉ số BP = k*PD -> Đúng/Sai
  t11_b10_d10_tetra_ratio_secant_tf: {
    id: 't11_b10_d10_tetra_ratio_secant_tf',
    name: 'Xác định giao tuyến và giao điểm bằng cách kéo dài đoạn chia tỉ lệ trong tứ diện (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho tứ diện ABCD với hai trung điểm I, M và điểm P thỏa BP = k·PD. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], kRatio ∈ [2; 4], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
      { name: 'kRatio', label: 'Tỉ số BP/PD (2..4)', min: 2, max: 4 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, kRatio, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2 || kRatio < 2 || kRatio > 4) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, kRatio, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { I: 'I', M: 'M', P: 'P', F: 'F' },
        { I: 'E', M: 'N', P: 'Q', F: 'K' },
        { I: 'M', M: 'N', P: 'P', F: 'E' },
      ];
      const p = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const pl = p.I + p.M + p.P;

      const tfStatements = [
        {
          key: 'a',
          text: '$' + (aIs ? p.M + p.P : p.I + p.P) + '$ là giao tuyến của hai mặt phẳng $(' + pl + ')$ và $(BCD)$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$' + (bIs ? 'CD' : 'BC') + '$ là giao tuyến của hai mặt phẳng $(B' + p.M + p.P + ')$ và $(A' + p.I + 'D)$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Giao điểm của đường thẳng $CD$ và mặt phẳng $(' + pl + ')$ là điểm $' + (cIs ? p.F : p.M) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Giao điểm của đường thẳng $AD$ và mặt phẳng $(' + pl + ')$ là giao điểm của đường thẳng $AD$ với đường thẳng $' + (dIs ? p.I + p.F : p.M + p.F) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho tứ diện $ABCD$. Gọi $' + p.I + ', ' + p.M + '$ lần lượt là trung điểm của $AC, BC$, trên đoạn $BD$ lấy điểm $' + p.P + '$ sao cho $B' + p.P + ' = ' + kRatio + p.P + 'D$. Gọi $' + p.F + ' = CD \\cap ' + p.M + p.P + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: 'A', vL: 'B', vF: 'C', vR: 'D' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $(' + pl + ') \\cap (BCD) = ' + p.M + p.P + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $(B' + p.M + p.P + ') \\equiv (BCD)$ và $(A' + p.I + 'D) \\equiv (ACD)$ nên giao tuyến là $CD$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + p.F + ' = CD \\cap ' + p.M + p.P + ' \\Rightarrow CD \\cap (' + pl + ') = ' + p.F + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Trong mặt phẳng $(ACD)$, giao tuyến với $(' + pl + ')$ là $' + p.I + p.F + '$ nên $AD \\cap (' + pl + ') = AD \\cap ' + p.I + p.F + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kRatio = 1 (song song)', params: { setIdx: 0, kRatio: 1, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (kRatio=3; S S S Đ)', params: { setIdx: 0, kRatio: 3, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Hình chóp S.ABCD, F = AC ∩ BD, K ∈ SC, G = AK ∩ SF -> Đúng/Sai
  t11_b10_d11_pyramid_secant_intersection_tf: {
    id: 't11_b10_d11_pyramid_secant_intersection_tf',
    name: 'Tìm giao tuyến mặt chéo và giao điểm cạnh bên với mặt phẳng phụ trong hình chóp (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho hình chóp tứ giác với giao điểm hai đường chéo F, điểm K trên cạnh bên SC (hoặc SD) và G = AK ∩ SF. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], edgeOpt ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
      { name: 'edgeOpt', label: 'Cạnh chứa K (0: SC, 1: SD)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, edgeOpt, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2 || (edgeOpt !== 0 && edgeOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, edgeOpt, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { apex: 'S', A: 'A', B: 'B', C: 'C', D: 'D', F: 'F', K: 'K', G: 'G' },
        { apex: 'S', A: 'A', B: 'B', C: 'C', D: 'D', F: 'O', K: 'M', G: 'E' },
        { apex: 'O', A: 'A', B: 'B', C: 'C', D: 'D', F: 'F', K: 'K', G: 'G' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const edgeK = edgeOpt === 0 ? s.apex + s.C : s.apex + s.D;
      const endK = edgeOpt === 0 ? s.C : s.D;
      const lineAK = edgeOpt === 0 ? s.A + s.K : s.B + s.K;
      const diagA = edgeOpt === 0 ? s.B + s.D : s.A + s.C;
      const planeA = edgeOpt === 0 ? s.apex + s.B + s.D : s.apex + s.A + s.C;
      const wrongA = edgeOpt === 0 ? s.apex + s.B : s.apex + s.A;
      const wrongB = edgeOpt === 0 ? s.apex + s.A : s.apex + s.B;
      const targetEdgeD = edgeOpt === 0 ? s.apex + s.D : s.apex + s.C;
      const rightLineD = edgeOpt === 0 ? s.B + s.G : s.A + s.G;
      const wrongLineD = edgeOpt === 0 ? s.B + s.K : s.A + s.K;

      const tfStatements = [
        {
          key: 'a',
          text: '$' + (aIs ? diagA : wrongA) + '$ là giao tuyến của hai mặt phẳng $(' + planeA + ')$ và $(' + s.A + s.B + s.C + s.D + ')$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$' + (bIs ? s.apex + s.F : wrongB) + '$ là giao tuyến của hai mặt phẳng $(' + s.apex + s.A + s.C + ')$ và $(' + s.apex + s.B + s.D + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: cIs
            ? 'Giao điểm của đường thẳng $' + s.apex + s.F + '$ với mặt phẳng $(' + s.A + s.B + s.K + ')$ là điểm $' + s.G + '$'
            : 'Giao điểm của đường thẳng $' + s.apex + s.F + '$ với mặt phẳng $(' + s.A + s.B + s.K + ')$ là giao điểm của $' + s.apex + s.F + '$ và $' + s.A + s.B + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Giao điểm của đường thẳng $' + targetEdgeD + '$ với mặt phẳng $(' + s.A + s.B + s.K + ')$ là giao điểm của $' + targetEdgeD + '$ và $' + (dIs ? rightLineD : wrongLineD) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.A + s.B + s.C + s.D + '$ có $' + s.A + s.C + ' \\cap ' + s.B + s.D + ' = ' + s.F + '$. Trên đoạn $' + edgeK + '$ lấy một điểm $' + s.K + '$ không trùng với $' + s.apex + '$ và $' + endK + '$. Gọi $' + s.G + '$ là giao điểm của hai đường thẳng $' + lineAK + '$ và $' + s.apex + s.F + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.apex, vBL: s.A, vBR: s.B, vFR: s.C, vFL: s.D, center: s.F },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $(' + planeA + ') \\cap (' + s.A + s.B + s.C + s.D + ') = ' + diagA + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $(' + s.apex + s.A + s.C + ') \\cap (' + s.apex + s.B + s.D + ') = ' + s.apex + s.F + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + s.G + ' = ' + s.apex + s.F + ' \\cap ' + lineAK + ' \\Rightarrow ' + s.apex + s.F + ' \\cap (' + s.A + s.B + s.K + ') = ' + s.G + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Trong $(' + s.apex + s.B + s.D + ')$, giao điểm của $' + targetEdgeD + '$ và $(' + s.A + s.B + s.K + ')$ là giao điểm của $' + targetEdgeD + '$ và $' + rightLineD + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên edgeOpt ngoài miền', params: { setIdx: 0, edgeOpt: 2, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (S S S S)', params: { setIdx: 0, edgeOpt: 0, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
