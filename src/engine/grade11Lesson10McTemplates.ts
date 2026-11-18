import { MathTemplate } from '../types/math';

export const G11_B10_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Quan hệ thuộc / chứa trong của điểm, đường thẳng, mặt phẳng trong tứ diện
  t11_b10_d01_tetra_inclusion_mc: {
    id: 't11_b10_d01_tetra_inclusion_mc',
    name: 'Xác định khẳng định đúng về quan hệ thuộc và chứa trong trong tứ diện',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho tứ diện với trung điểm một cạnh đáy và trọng tâm đáy. Chọn mệnh đề đúng về điểm thuộc mặt phẳng hoặc đường thẳng nằm trong mặt phẳng.',
    conditionSummary: 'setIdx ∈ [0; 3] (bộ tên đỉnh tứ diện), edgeIdx ∈ [0; 2] (cạnh đáy chứa trung điểm)',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh tứ diện (0..3)', min: 0, max: 3 },
      { name: 'edgeIdx', label: 'Cạnh đáy lấy trung điểm (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, edgeIdx } = params;
      if (setIdx < 0 || setIdx > 3 || edgeIdx < 0 || edgeIdx > 2) {
        return { valid: false, reason: 'Tham số chỉ số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, edgeIdx } = params;
      const SETS = [
        { apex: 'S', v: ['A', 'C', 'D'], mid: 'N', cent: 'G' },
        { apex: 'S', v: ['A', 'B', 'C'], mid: 'M', cent: 'G' },
        { apex: 'O', v: ['A', 'B', 'D'], mid: 'K', cent: 'G' },
        { apex: 'S', v: ['M', 'N', 'P'], mid: 'I', cent: 'G' },
      ];
      const s = SETS[setIdx];
      const [vL, vF, vR] = s.v;
      const edges = [
        { p: vF, q: vR, r: vL, midEdge: 1 },
        { p: vL, q: vF, r: vR, midEdge: 2 },
        { p: vL, q: vR, r: vF, midEdge: 3 },
      ];
      const ed = edges[edgeIdx];
      const correct = '$' + s.apex + s.mid + ' \\subset (' + s.apex + ed.p + ed.q + ')$';
      const w1 = '$' + ed.r + ed.q + ' \\subset (' + s.apex + ed.r + ed.p + ')$';
      const w2 = '$' + s.cent + ' \\in (' + s.apex + ed.r + ed.q + ')$';
      const w3 = '$' + s.mid + ' \\in ' + s.apex + ed.q + '$';
      const w4 = '$' + s.apex + ed.p + ' \\subset (' + vL + vF + vR + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3, w4],
        rng,
        (j) => '$' + s.apex + ed.r + ' \\subset (' + vL + vF + vR + ')_{' + j + '}$'
      );

      return {
        stem: 'Cho tứ diện $' + s.apex + vL + vF + vR + '$. Gọi $' + s.mid + '$ là trung điểm của cạnh $' + ed.p + ed.q + '$. Gọi $' + s.cent + '$ là trọng tâm của tam giác $' + vL + vF + vR + '$. Tìm khẳng định đúng trong các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 1, midEdge: ed.midEdge },
          labels: { apex: s.apex, vL, vF, vR, mid: s.mid, cent: s.cent },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + s.mid + ' \\in ' + ed.p + ed.q + ' \\subset (' + s.apex + ed.p + ed.q + ')$ và $' + s.apex + ' \\in (' + s.apex + ed.p + ed.q + ')$ nên đường thẳng $' + s.apex + s.mid + ' \\subset (' + s.apex + ed.p + ed.q + ')$.',
          'Các khẳng định còn lại đều sai vì đỉnh đối diện hoặc trọng tâm mặt đáy không nằm trong mặt bên tương ứng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx âm', params: { setIdx: -1, edgeIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (SACD, N trung điểm CD -> SN ⊂ (SCD))', params: { setIdx: 0, edgeIdx: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Hình chóp đáy hình bình hành tâm H, K trung điểm SH -> tìm khẳng định sai
  t11_b10_d02_para_pyramid_false_mc: {
    id: 't11_b10_d02_para_pyramid_false_mc',
    name: 'Tìm khẳng định sai về quan hệ liên thuộc trong hình chóp đáy hình bình hành',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho hình chóp đáy hình bình hành tâm H, K là trung điểm SH. Phân biệt khẳng định đúng và sai.',
    conditionSummary: 'setIdx ∈ [0; 3], faceIdx ∈ [0; 3] (chọn mặt bên ở mệnh đề sai)',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm hình chóp (0..3)', min: 0, max: 3 },
      { name: 'faceIdx', label: 'Chỉ số mặt bên sai (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, faceIdx } = params;
      if (setIdx < 0 || setIdx > 3 || faceIdx < 0 || faceIdx > 3) {
        return { valid: false, reason: 'Tham số chỉ số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, faceIdx } = params;
      const SETS = [
        { apex: 'S', v: ['A', 'B', 'M', 'N'], center: 'H', mid: 'K' },
        { apex: 'S', v: ['A', 'B', 'C', 'D'], center: 'O', mid: 'I' },
        { apex: 'S', v: ['M', 'N', 'P', 'Q'], center: 'O', mid: 'K' },
        { apex: 'O', v: ['A', 'B', 'C', 'D'], center: 'I', mid: 'M' },
      ];
      const s = SETS[setIdx];
      const v0 = s.v[0], v1 = s.v[1], v2 = s.v[2], v3 = s.v[3];
      const pA = s.v[faceIdx];
      const pB = s.v[(faceIdx + 1) % 4];

      // False statement (correct answer to "Tìm khẳng định sai")
      const correct = '$' + s.center + ' \\in (' + s.apex + pA + pB + ')$';
      // 3 true statements as distractors
      const t1 = '$' + s.mid + v2 + ' \\subset (' + s.apex + v0 + v2 + ')$';
      const t2 = '$' + s.mid + v3 + ' \\subset (' + s.apex + v1 + v3 + ')$';
      const t3 = '$' + s.center + ' \\in (' + s.apex + v0 + s.center + ')$';
      const t4 = '$' + s.mid + v0 + ' \\subset (' + s.apex + v0 + v2 + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [t1, t2, t3, t4],
        rng,
        (j) => '$' + s.mid + v1 + ' \\subset (' + s.apex + v1 + v3 + ')_{' + j + '}$'
      );

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + v0 + v1 + v2 + v3 + '$ có đáy là hình bình hành tâm $' + s.center + '$. Gọi $' + s.mid + '$ là trung điểm của $' + s.apex + s.center + '$. Tìm khẳng định **sai** trong các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.apex, vBL: v0, vBR: v1, vFR: v2, vFL: v3, center: s.center },
        },
        options,
        correctIndex,
        answerSummary: correct + ' (sai)',
        solutionSteps: [
          'Tâm $' + s.center + '$ là giao điểm hai đường chéo $' + v0 + v2 + '$ và $' + v1 + v3 + '$ nên nằm trong phần trong của đáy $' + v0 + v1 + v2 + v3 + '$, không nằm trên đường thẳng $' + pA + pB + '$.',
          'Do đó $' + s.center + ' \\notin (' + s.apex + pA + pB + ')$, suy ra khẳng định $' + s.center + ' \\in (' + s.apex + pA + pB + ')$ là sai.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên faceIdx ngoài miền', params: { setIdx: 0, faceIdx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (S.ABMN, tâm H, K trung điểm SH -> H ∈ (SBM) sai)', params: { setIdx: 0, faceIdx: 1 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chóp tứ giác S.ABCD, G = AC ∩ BD, I trung điểm SG -> khẳng định sai
  t11_b10_d03_quad_pyramid_false_mc: {
    id: 't11_b10_d03_quad_pyramid_false_mc',
    name: 'Tìm khẳng định sai về quan hệ liên thuộc trong hình chóp tứ giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho hình chóp tứ giác có G là giao điểm hai đường chéo đáy, I là trung điểm SG. Tìm khẳng định sai.',
    conditionSummary: 'setIdx ∈ [0; 3], faceIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm hình chóp (0..3)', min: 0, max: 3 },
      { name: 'faceIdx', label: 'Chỉ số mặt bên sai (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, faceIdx } = params;
      if (setIdx < 0 || setIdx > 3 || faceIdx < 0 || faceIdx > 3) {
        return { valid: false, reason: 'Tham số chỉ số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, faceIdx } = params;
      const SETS = [
        { apex: 'S', v: ['A', 'B', 'C', 'D'], diag: 'G', mid: 'I' },
        { apex: 'S', v: ['A', 'B', 'C', 'D'], diag: 'O', mid: 'K' },
        { apex: 'S', v: ['M', 'N', 'P', 'Q'], diag: 'O', mid: 'I' },
        { apex: 'O', v: ['A', 'B', 'C', 'D'], diag: 'H', mid: 'M' },
      ];
      const s = SETS[setIdx];
      const v0 = s.v[0], v1 = s.v[1], v2 = s.v[2], v3 = s.v[3];
      const pA = s.v[faceIdx];
      const pB = s.v[(faceIdx + 1) % 4];

      const correct = '$' + s.mid + ' \\in (' + s.apex + pA + pB + ')$';
      const t1 = '$' + v0 + v2 + ' \\subset (' + s.apex + v0 + v2 + ')$';
      const t2 = '$' + s.mid + v1 + ' \\subset (' + s.apex + v1 + v3 + ')$';
      const t3 = '$' + s.mid + ' \\in (' + s.apex + v0 + s.diag + ')$';
      const t4 = '$' + s.mid + v3 + ' \\subset (' + s.apex + v1 + v3 + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [t1, t2, t3, t4],
        rng,
        (j) => '$' + s.mid + v0 + ' \\subset (' + s.apex + v0 + v2 + ')_{' + j + '}$'
      );

      return {
        stem: 'Cho hình chóp tứ giác $' + s.apex + '.' + v0 + v1 + v2 + v3 + '$. Gọi $' + s.diag + '$ là giao điểm của các đường thẳng $' + v0 + v2 + '$ và $' + v1 + v3 + '$. Gọi $' + s.mid + '$ là trung điểm của $' + s.apex + s.diag + '$. Tìm khẳng định **sai** trong các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.apex, vBL: v0, vBR: v1, vFR: v2, vFL: v3, center: s.diag },
        },
        options,
        correctIndex,
        answerSummary: correct + ' (sai)',
        solutionSteps: [
          'Vì $' + s.mid + '$ là trung điểm của đoạn $' + s.apex + s.diag + '$ với $' + s.diag + ' \\notin ' + pA + pB + '$ nên $' + s.mid + '$ không nằm trong mặt bên $(' + s.apex + pA + pB + ')$.',
          'Các khẳng định còn lại đều đúng do $' + s.mid + ' \\in ' + s.apex + s.diag + ' \\subset (' + s.apex + v0 + v2 + ')$ và $' + s.apex + s.diag + ' \\subset (' + s.apex + v1 + v3 + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx ngoài miền', params: { setIdx: 4, faceIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (S.ABCD, G, I -> I ∈ (SCD) sai)', params: { setIdx: 0, faceIdx: 2 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Giao tuyến của hai mặt bên kề nhau của hình chóp tứ giác
  t11_b10_d04_pyramid_plane_intersection_mc: {
    id: 't11_b10_d04_pyramid_plane_intersection_mc',
    name: 'Tìm giao tuyến của hai mặt bên kề nhau trong hình chóp tứ giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho hình chóp tứ giác, xác định giao tuyến của hai mặt bên kề nhau có chung cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 3], vIdx ∈ [0; 3] (đỉnh đáy chung)',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm hình chóp (0..3)', min: 0, max: 3 },
      { name: 'vIdx', label: 'Chỉ số đỉnh đáy chung (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, vIdx } = params;
      if (setIdx < 0 || setIdx > 3 || vIdx < 0 || vIdx > 3) {
        return { valid: false, reason: 'Tham số chỉ số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, vIdx } = params;
      const SETS = [
        { apex: 'O', v: ['A', 'B', 'C', 'D'] },
        { apex: 'S', v: ['A', 'B', 'C', 'D'] },
        { apex: 'S', v: ['M', 'N', 'P', 'Q'] },
        { apex: 'O', v: ['E', 'F', 'G', 'H'] },
      ];
      const s = SETS[setIdx];
      const vPrev = s.v[(vIdx + 3) % 4];
      const vCur = s.v[vIdx];
      const vNext = s.v[(vIdx + 1) % 4];
      const vOpp = s.v[(vIdx + 2) % 4];

      const p1 = s.apex + vPrev + vCur;
      const p2 = s.apex + vNext + vCur;
      const correct = '$' + s.apex + vCur + '$';
      const wList = [
        '$' + vOpp + vCur + '$',
        '$' + s.apex + vOpp + '$',
        '$' + s.apex + vNext + '$',
        '$' + s.apex + vPrev + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + vPrev + vNext + '_{' + j + '}$'
      );

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.v.join('') + '$. Giao tuyến giữa hai mặt phẳng $(' + p1 + ')$ và $(' + p2 + ')$ là đường thẳng nào trong các đường thẳng sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { showDiags: 0 },
          labels: { apex: s.apex, vBL: s.v[0], vBR: s.v[1], vFR: s.v[2], vFL: s.v[3] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai mặt phẳng $(' + p1 + ')$ và $(' + p2 + ')$ có hai điểm chung phân biệt là $' + s.apex + '$ và $' + vCur + '$.',
          'Do đó giao tuyến của hai mặt phẳng đó là đường thẳng $' + s.apex + vCur + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = -1', params: { setIdx: 0, vIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (OABCD, (OCD) ∩ (OAD) = OD)', params: { setIdx: 0, vIdx: 3 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Tứ diện và hai đường trung tuyến đáy cắt nhau tại H -> giao tuyến hai mặt phẳng
  t11_b10_d05_tetra_medians_intersection_mc: {
    id: 't11_b10_d05_tetra_medians_intersection_mc',
    name: 'Tìm giao tuyến hai mặt phẳng qua đỉnh và hai trung tuyến đáy của tứ diện',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Trong tứ diện, lấy trung điểm hai cạnh đáy và giao điểm hai trung tuyến. Xác định giao tuyến hai mặt phẳng.',
    conditionSummary: 'setIdx ∈ [0; 3], commonIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm tứ diện (0..3)', min: 0, max: 3 },
      { name: 'commonIdx', label: 'Đỉnh đáy chung hai cạnh (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, commonIdx } = params;
      if (setIdx < 0 || setIdx > 3 || commonIdx < 0 || commonIdx > 2) {
        return { valid: false, reason: 'Tham số chỉ số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, commonIdx } = params;
      const SETS = [
        { apex: 'O', v: ['B', 'C', 'D'], m1: 'E', m2: 'Q', inter: 'H' },
        { apex: 'S', v: ['A', 'B', 'C'], m1: 'M', m2: 'N', inter: 'G' },
        { apex: 'A', v: ['B', 'C', 'D'], m1: 'E', m2: 'F', inter: 'G' },
        { apex: 'S', v: ['M', 'N', 'P'], m1: 'I', m2: 'K', inter: 'H' },
      ];
      const s = SETS[setIdx];
      const vC = s.v[commonIdx];
      const vA = s.v[(commonIdx + 2) % 3];
      const vB = s.v[(commonIdx + 1) % 3];
      // Canonical (setIdx=0, commonIdx=1): vA=B, vC=C, vB=D; m1=E on CD (vC vB), m2=Q on BC (vA vC)
      const correct = '$' + s.apex + s.inter + '$';
      const plane1 = s.apex + vA + s.m1;
      const plane2 = s.apex + vB + s.m2;
      const wList = [
        '$' + s.apex + vB + '$',
        '$' + s.inter + s.m2 + '$',
        '$' + s.apex + s.m2 + '$',
        '$' + s.apex + vA + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + s.apex + vC + '_{' + j + '}$'
      );

      return {
        stem: 'Cho tứ diện $' + s.apex + s.v.join('') + '$. Gọi $' + s.m1 + ', ' + s.m2 + '$ lần lượt là trung điểm của các cạnh $' + vC + vB + ', ' + vA + vC + '$. Gọi $' + s.inter + '$ là giao điểm của $' + vA + s.m1 + '$ và $' + vB + s.m2 + '$. Giao tuyến của hai mặt phẳng $(' + plane1 + ')$ và $(' + plane2 + ')$ là đường thẳng:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showMedians: 1 },
          labels: { apex: s.apex, vL: vA, vF: vC, vR: vB, m1: s.m1, m2: s.m2, cent: s.inter },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + s.apex + ' \\in (' + plane1 + ') \\cap (' + plane2 + ')$.',
          'Mặt khác $' + s.inter + ' = ' + vA + s.m1 + ' \\cap ' + vB + s.m2 + ' \\Rightarrow ' + s.inter + ' \\in (' + plane1 + ') \\cap (' + plane2 + ')$.',
          'Vậy $(' + plane1 + ') \\cap (' + plane2 + ') = ' + s.apex + s.inter + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên commonIdx ngoài miền', params: { setIdx: 0, commonIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (OBCD, E, Q, H -> OH)', params: { setIdx: 0, commonIdx: 1 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Giao điểm đường chéo đáy và mặt bên của hình chóp đáy hình bình hành
  t11_b10_d06_para_diag_face_intersection_mc: {
    id: 't11_b10_d06_para_diag_face_intersection_mc',
    name: 'Tìm giao điểm của đường thẳng qua đỉnh đáy và tâm hình bình hành với mặt bên',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho hình chóp đáy hình bình hành tâm G. Tìm giao điểm của đường thẳng nối một đỉnh đáy với tâm và mặt bên đối diện.',
    conditionSummary: 'setIdx ∈ [0; 3], startIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm hình chóp (0..3)', min: 0, max: 3 },
      { name: 'startIdx', label: 'Đỉnh bắt đầu đường chéo (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, startIdx } = params;
      if (setIdx < 0 || setIdx > 3 || startIdx < 0 || startIdx > 3) {
        return { valid: false, reason: 'Tham số chỉ số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, startIdx } = params;
      const SETS = [
        { apex: 'S', v: ['B', 'C', 'E', 'F'], center: 'G', m1: 'P', m2: 'Q' },
        { apex: 'S', v: ['A', 'B', 'C', 'D'], center: 'O', m1: 'M', m2: 'N' },
        { apex: 'S', v: ['M', 'N', 'P', 'Q'], center: 'O', m1: 'I', m2: 'K' },
        { apex: 'O', v: ['A', 'B', 'C', 'D'], center: 'I', m1: 'E', m2: 'F' },
      ];
      const s = SETS[setIdx];
      const vStart = s.v[startIdx];
      const vAdj = s.v[(startIdx + 1) % 4];
      const vOpp = s.v[(startIdx + 2) % 4];
      const vOther = s.v[(startIdx + 3) % 4];

      const faceName = s.apex + vAdj + vOpp;
      const correct = '$' + vOpp + '$';
      const wList = ['$' + s.m1 + '$', '$' + s.m2 + '$', '$' + vOther + '$', '$' + vAdj + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + s.center + '_{' + j + '}$'
      );

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.v.join('') + '$ có đáy là hình bình hành tâm $' + s.center + '$. Gọi $' + s.m1 + ', ' + s.m2 + '$ lần lượt là trung điểm của các cạnh $' + vStart + vAdj + '$ và $' + vAdj + vOpp + '$. Giao điểm của đường thẳng $' + vStart + s.center + '$ và mặt phẳng $(' + faceName + ')$ là điểm nào trong các điểm sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.apex, vBL: s.v[0], vBR: s.v[1], vFR: s.v[2], vFL: s.v[3], center: s.center },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong mặt phẳng đáy, $' + s.center + '$ là giao điểm hai đường chéo của hình bình hành $' + s.v.join('') + '$ nên đường thẳng $' + vStart + s.center + '$ chính là đường chéo $' + vStart + vOpp + '$.',
          'Ta có $' + vStart + s.center + ' \\cap ' + vAdj + vOpp + ' = ' + vOpp + '$, mà $' + vAdj + vOpp + ' \\subset (' + faceName + ')$ nên $' + vStart + s.center + ' \\cap (' + faceName + ') = ' + vOpp + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên startIdx âm', params: { setIdx: 0, startIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (S.BCEF, tâm G -> CG ∩ (SEF) = F)', params: { setIdx: 0, startIdx: 1 }, expectedValid: true },
    ],
  },
};
