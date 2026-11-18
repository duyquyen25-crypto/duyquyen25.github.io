import { MathTemplate } from '../types/math';

export const G11_B11_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Vị trí tương đối của đường thẳng và mặt phẳng, điều kiện xác định mặt phẳng
  t11_b11_d01_space_axioms_parallel_mc: {
    id: 't11_b11_d01_space_axioms_parallel_mc',
    name: 'Mệnh đề về đường thẳng song song mặt phẳng và xác định mặt phẳng duy nhất',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho đường thẳng d nằm trong mặt phẳng (P), điểm F thuộc (P), và đường thẳng n không có điểm chung với (P). Tìm khẳng định đúng.',
    conditionSummary: 'setIdx ∈ [0; 3] (đổi tên đường thẳng, điểm và mặt phẳng)',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu hình học (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 3) return { valid: false, reason: 'setIdx ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx } = params;
      const SETS = [
        { d: 'd', pl: '\\gamma', pt: 'F', n: 'n' },
        { d: '\\Delta', pl: '\\alpha', pt: 'M', n: 'a' },
        { d: 'a', pl: 'P', pt: 'K', n: 'b' },
        { d: 'm', pl: '\\beta', pt: 'H', n: '\\Delta' },
      ];
      const s = SETS[setIdx];
      const correct = 'Có duy nhất một mặt phẳng chứa điểm $' + s.pt + '$ và đường thẳng $' + s.n + '$';
      const w1 = '$' + s.d + '$ và $' + s.n + '$ song song';
      const w2 = 'Có vô số đường thẳng đi qua $' + s.pt + '$ và song song với $' + s.d + '$';
      const w3 = 'Điểm $' + s.pt + '$ thuộc đường thẳng $' + s.d + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => 'Đường thẳng $' + s.n + '$ cắt đường thẳng $' + s.d + '$ (' + j + ')'
      );

      return {
        stem: 'Trong không gian cho đường thẳng $' + s.d + '$ nằm trong mặt phẳng $(' + s.pl + ')$, điểm $' + s.pt + '$ thuộc mặt phẳng $(' + s.pl + ')$, đường thẳng $' + s.n + '$ và mặt phẳng $(' + s.pl + ')$ không có điểm chung. Tìm khẳng định đúng trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì đường thẳng $' + s.n + '$ và mặt phẳng $(' + s.pl + ')$ không có điểm chung và $' + s.pt + ' \\in (' + s.pl + ')$ nên $' + s.pt + ' \\notin ' + s.n + '$.',
          'Do đó qua điểm $' + s.pt + '$ và đường thẳng $' + s.n + '$ xác định duy nhất một mặt phẳng. Hai đường thẳng $' + s.d + '$ và $' + s.n + '$ có thể chéo nhau hoặc song song.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx âm', params: { setIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (d, (gamma), F, n)', params: { setIdx: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Vị trí tương đối hai đường thẳng (chéo nhau vs cắt nhau) từ đường cắt mặt phẳng
  t11_b11_d02_skew_lines_false_mc: {
    id: 't11_b11_d02_skew_lines_false_mc',
    name: 'Nhận biết hai đường thẳng chéo nhau trong không gian (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho d ⊂ (β) qua A, D; đường thẳng b cắt (β) tại F ∉ d; G ∈ b \\ {F}. Tìm khẳng định sai.',
    conditionSummary: 'setIdx ∈ [0; 3], pairOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu điểm và đường (0..3)', min: 0, max: 3 },
      { name: 'pairOpt', label: 'Cặp đoạn thẳng ở ý sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, pairOpt } = params;
      if (setIdx < 0 || setIdx > 3 || (pairOpt !== 0 && pairOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, pairOpt } = params;
      const SETS = [
        { d: 'd', pl: '\\beta', A: 'A', D: 'D', b: 'b', F: 'F', G: 'G' },
        { d: 'a', pl: '\\alpha', A: 'M', D: 'N', b: 'c', F: 'E', G: 'K' },
        { d: '\\Delta', pl: 'P', A: 'B', D: 'C', b: 'm', F: 'I', G: 'H' },
        { d: 'd', pl: 'Q', A: 'A', D: 'B', b: '\\Delta', F: 'E', G: 'M' },
      ];
      const s = SETS[setIdx];
      const correct = pairOpt === 0
        ? '$' + s.A + s.F + '$ và $' + s.D + s.G + '$ cắt nhau'
        : '$' + s.D + s.F + '$ và $' + s.A + s.G + '$ cắt nhau';
      const w1 = '$' + s.A + ',' + s.D + ',' + s.F + ',' + s.G + '$ không đồng phẳng';
      const w2 = pairOpt === 0
        ? '$' + s.G + s.A + '$ và $' + s.F + s.D + '$ chéo nhau'
        : '$' + s.G + s.D + '$ và $' + s.F + s.A + '$ chéo nhau';
      const w3 = '$' + s.G + ',' + s.A + ',' + s.D + '$ đồng phẳng';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$' + s.A + ',' + s.D + ',' + s.F + '$ đồng phẳng (' + j + ')'
      );

      return {
        stem: 'Trong không gian cho đường thẳng $' + s.d + '$ nằm trong mặt phẳng $(' + s.pl + ')$, $' + s.d + '$ qua hai điểm $' + s.A + ', ' + s.D + '$ phân biệt. Đường thẳng $' + s.b + '$ cắt mặt phẳng $(' + s.pl + ')$ tại điểm $' + s.F + '$ và $' + s.F + '$ không thuộc $' + s.d + '$. Gọi $' + s.G + '$ là điểm bất kì thuộc $' + s.b + '$ và không trùng với điểm $' + s.F + '$. Tìm khẳng định **sai** trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct + ' (sai)',
        solutionSteps: [
          'Vì $' + s.A + ', ' + s.D + ', ' + s.F + ' \\in (' + s.pl + ')$ không thẳng hàng và $' + s.G + ' \\notin (' + s.pl + ')$ nên $4$ điểm $' + s.A + ', ' + s.D + ', ' + s.F + ', ' + s.G + '$ không đồng phẳng.',
          'Do đó hai đường thẳng $' + (pairOpt === 0 ? s.A + s.F + '$ và $' + s.D + s.G : s.D + s.F + '$ và $' + s.A + s.G) + '$ chéo nhau, không cắt nhau.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pairOpt = 2', params: { setIdx: 0, pairOpt: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (AF và DG cắt nhau sai)', params: { setIdx: 0, pairOpt: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Đường trung bình của mặt bên hình chóp đáy hình vuông/bình hành song song cạnh đối
  t11_b11_d03_midsegment_parallel_base_mc: {
    id: 't11_b11_d03_midsegment_parallel_base_mc',
    name: 'Đường trung bình mặt bên hình chóp song song với cạnh đáy đối diện',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho hình chóp đáy hình vuông, M, N là trung điểm hai cạnh bên liên tiếp. Xác định cạnh đáy song song với MN.',
    conditionSummary: 'setIdx ∈ [0; 3], sideIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..3)', min: 0, max: 3 },
      { name: 'sideIdx', label: 'Cặp cạnh bên (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { setIdx, sideIdx } = params;
      if (setIdx < 0 || setIdx > 3 || sideIdx < 0 || sideIdx > 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, sideIdx } = params;
      const SETS = [
        { apex: 'S', v: ['A', 'B', 'C', 'D'], m: 'M', n: 'N' },
        { apex: 'S', v: ['A', 'B', 'C', 'D'], m: 'E', n: 'F' },
        { apex: 'S', v: ['M', 'N', 'P', 'Q'], m: 'I', n: 'K' },
        { apex: 'O', v: ['A', 'B', 'C', 'D'], m: 'P', n: 'Q' },
      ];
      const s = SETS[setIdx];
      const v0 = s.v[sideIdx];
      const v1 = s.v[(sideIdx + 1) % 4];
      const v2 = s.v[(sideIdx + 2) % 4];
      const v3 = s.v[(sideIdx + 3) % 4];

      const oppEdge = [v2, v3].join('');
      const adj1 = [v1, v2].join('');
      const adj2 = [v3, v0].join('');
      const diag = [v1, v3].join('');
      const mn = s.m + s.n;

      const correct = '$' + mn + ' \\parallel ' + oppEdge + '$';
      const wList = [
        '$' + mn + ' \\parallel ' + adj1 + '$',
        '$' + mn + ' \\parallel ' + diag + '$',
        '$' + mn + ' \\parallel ' + adj2 + '$',
        '$' + mn + ' \\parallel ' + v0 + v2 + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + mn + ' \\parallel ' + s.apex + s.v[j % 4] + '$'
      );

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.v.join('') + '$ có đáy là hình vuông. Gọi $' + s.m + '$ và $' + s.n + '$ lần lượt là trung điểm của các cạnh $' + s.apex + v0 + '$ và $' + s.apex + v1 + '$. Tìm khẳng định đúng.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 0 },
          labels: { apex: s.apex, vBL: s.v[0], vBR: s.v[1], vFR: s.v[2], vFL: s.v[3] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong tam giác $' + s.apex + v0 + v1 + '$, $' + mn + '$ là đường trung bình nên $' + mn + ' \\parallel ' + v0 + v1 + '$.',
          'Vì đáy $' + s.v.join('') + '$ là hình vuông nên $' + v0 + v1 + ' \\parallel ' + oppEdge + '$, suy ra $' + mn + ' \\parallel ' + oppEdge + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên sideIdx = 4', params: { setIdx: 0, sideIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (S.ABCD, M, N trên SA, SB -> MN // CD)', params: { setIdx: 0, sideIdx: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Đường nối hai trọng tâm hai mặt kề của tứ diện (định lí Thales đảo)
  t11_b11_d04_tetra_two_centroids_parallel_mc: {
    id: 't11_b11_d04_tetra_two_centroids_parallel_mc',
    name: 'Tính chất song song của đoạn nối hai trọng tâm hai mặt kề tứ diện',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho tứ diện O.ABC, H và I là trọng tâm hai mặt có chung cạnh đáy. Xác định đường thẳng song song với HI.',
    conditionSummary: 'setIdx ∈ [0; 3], edgeIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..3)', min: 0, max: 3 },
      { name: 'edgeIdx', label: 'Cạnh đáy chung (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, edgeIdx } = params;
      if (setIdx < 0 || setIdx > 3 || edgeIdx < 0 || edgeIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, edgeIdx } = params;
      const SETS = [
        { apex: 'O', v: ['A', 'B', 'C'], h: 'H', i: 'I', j: 'J' },
        { apex: 'S', v: ['A', 'B', 'C'], h: 'G', i: 'K', j: 'M' },
        { apex: 'S', v: ['M', 'N', 'P'], h: 'E', i: 'F', j: 'K' },
        { apex: 'A', v: ['B', 'C', 'D'], h: 'G', i: 'H', j: 'I' },
      ];
      const s = SETS[setIdx];
      const v0 = s.v[edgeIdx];
      const v1 = s.v[(edgeIdx + 1) % 3];
      const vOpp = s.v[(edgeIdx + 2) % 3];
      const hi = s.h + s.i;

      const correct = '$' + hi + ' \\parallel ' + s.apex + vOpp + '$';
      const wList = [
        '$' + hi + ' \\parallel ' + s.apex + v0 + '$',
        '$' + v0 + s.h + ' \\parallel ' + v1 + s.i + '$',
        '$' + v0 + s.i + ' \\parallel ' + s.apex + vOpp + '$',
        '$' + hi + ' \\parallel ' + v0 + v1 + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (k) => '$' + hi + ' \\parallel ' + s.apex + s.v[k % 3] + '$'
      );

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.v.join('') + '$. Gọi $' + s.h + ', ' + s.i + '$ lần lượt là trọng tâm của các tam giác $' + s.apex + v0 + v1 + '$ và $' + s.v.join('') + '$. Khẳng định nào sau đây là đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: s.apex, vL: s.v[0], vF: s.v[1], vR: s.v[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $' + s.j + '$ là trung điểm của cạnh $' + v0 + v1 + '$. Vì $' + s.h + '$ là trọng tâm $\\triangle ' + s.apex + v0 + v1 + '$ và $' + s.i + '$ là trọng tâm $\\triangle ' + s.v.join('') + '$ nên $\\frac{' + s.j + s.h + '}{' + s.j + s.apex + '} = \\frac{' + s.j + s.i + '}{' + s.j + vOpp + '} = \\frac{1}{3}$.',
          'Theo định lí Thales đảo trong tam giác $' + s.apex + s.j + vOpp + '$, suy ra $' + hi + ' \\parallel ' + s.apex + vOpp + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên edgeIdx = 3', params: { setIdx: 0, edgeIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (O.ABC, H, I -> HI // OC)', params: { setIdx: 0, edgeIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Định lí Thales đảo trên cạnh bên và đường chéo đáy hình chóp đáy hình bình hành
  t11_b11_d05_para_thales_side_diag_mc: {
    id: 't11_b11_d05_para_thales_side_diag_mc',
    name: 'Áp dụng định lí Thales đảo với điểm chia tỉ lệ trên cạnh bên và đường chéo đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho hình chóp đáy hình bình hành tâm O, hai điểm M, P chia cùng tỉ số trên SB và BE. Tìm đường thẳng song song với MP.',
    conditionSummary: 'setIdx ∈ [0; 3], kRatio ∈ [2; 3], diagOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..3)', min: 0, max: 3 },
      { name: 'kRatio', label: 'Tỉ số chia k (2 hoặc 3)', min: 2, max: 3 },
      { name: 'diagOpt', label: 'Đường chéo đáy (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, kRatio, diagOpt } = params;
      if (setIdx < 0 || setIdx > 3 || (kRatio !== 2 && kRatio !== 3) || (diagOpt !== 0 && diagOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, kRatio, diagOpt } = params;
      const SETS = [
        { apex: 'S', v: ['B', 'C', 'E', 'F'], center: 'O', m: 'M', p: 'P' },
        { apex: 'S', v: ['A', 'B', 'C', 'D'], center: 'O', m: 'M', p: 'N' },
        { apex: 'S', v: ['M', 'N', 'P', 'Q'], center: 'O', m: 'I', p: 'K' },
        { apex: 'O', v: ['A', 'B', 'C', 'D'], center: 'I', m: 'E', p: 'F' },
      ];
      const s = SETS[setIdx];
      const vStart = diagOpt === 0 ? s.v[0] : s.v[1];
      const vEnd = diagOpt === 0 ? s.v[2] : s.v[3];
      const vAdj = diagOpt === 0 ? s.v[1] : s.v[2];
      const vOther = diagOpt === 0 ? s.v[3] : s.v[0];

      const mp = s.m + s.p;
      const correct = '$' + mp + ' \\parallel ' + s.apex + vEnd + '$';
      const wList = [
        '$' + s.center + s.m + ' \\parallel ' + s.apex + vEnd + '$',
        '$' + mp + ' \\parallel ' + vAdj + vEnd + '$',
        '$' + vStart + s.p + ' \\parallel ' + vAdj + vOther + '$',
        '$' + mp + ' \\parallel ' + s.apex + vAdj + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + mp + ' \\parallel ' + vStart + s.v[j % 4] + '$'
      );

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.v.join('') + '$ có đáy là hình bình hành tâm $' + s.center + '$. Gọi $' + s.m + ', ' + s.p + '$ lần lượt là các điểm thuộc các đoạn thẳng $' + s.apex + vStart + ', ' + vStart + vEnd + '$ sao cho $' + vStart + s.m + ' = ' + kRatio + s.apex + s.m + ',\\; ' + vStart + s.p + ' = ' + kRatio + s.p + vEnd + '$. Khẳng định nào sau đây là khẳng định đúng?',
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
          'Trong tam giác $' + s.apex + vStart + vEnd + '$, ta có $\\frac{' + vStart + s.m + '}{' + s.apex + vStart + '} = \\frac{' + vStart + s.p + '}{' + vStart + vEnd + '} = \\frac{' + kRatio + '}{' + (kRatio + 1) + '}$.',
          'Theo định lí Thales đảo suy ra $' + mp + ' \\parallel ' + s.apex + vEnd + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kRatio = 1', params: { setIdx: 0, kRatio: 1, diagOpt: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (S.BCEF, BM=2SM, BP=2PE -> MP // SE)', params: { setIdx: 0, kRatio: 2, diagOpt: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Trung điểm và điểm chia tỉ lệ khác 1/2 -> hai đường thẳng đồng phẳng cắt nhau trong tứ diện
  t11_b11_d06_tetra_intersecting_vs_skew_mc: {
    id: 't11_b11_d06_tetra_intersecting_vs_skew_mc',
    name: 'Phân biệt hai đường thẳng cắt nhau với chéo nhau qua trung điểm và tỉ số cạnh tứ diện',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho tứ diện S.OAB với các trung điểm M, F, Q và điểm K thỏa KA = k·KB. Chọn khẳng định đúng về hai đường thẳng cắt nhau.',
    conditionSummary: 'setIdx ∈ [0; 3], kRatio ∈ [2; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..3)', min: 0, max: 3 },
      { name: 'kRatio', label: 'Tỉ số KA/KB (2 hoặc 3)', min: 2, max: 3 },
    ],
    validateCode: `
      const { setIdx, kRatio } = params;
      if (setIdx < 0 || setIdx > 3 || (kRatio !== 2 && kRatio !== 3)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, kRatio } = params;
      const SETS = [
        { S: 'S', O: 'O', A: 'A', B: 'B', M: 'M', F: 'F', Q: 'Q', K: 'K' },
        { S: 'S', O: 'A', A: 'B', B: 'C', M: 'I', F: 'N', Q: 'P', K: 'E' },
        { S: 'A', O: 'B', A: 'C', B: 'D', M: 'M', F: 'N', Q: 'P', K: 'K' },
        { S: 'O', O: 'A', A: 'B', B: 'C', M: 'E', F: 'F', Q: 'H', K: 'G' },
      ];
      const s = SETS[setIdx];
      const correct = '$' + s.F + s.K + '$ và $' + s.O + s.B + '$ cắt nhau';
      const wList = [
        '$' + s.A + s.Q + '$ và $' + s.S + s.O + '$ cắt nhau',
        '$' + s.M + s.K + '$ và $' + s.S + s.B + '$ cắt nhau',
        '$' + s.K + s.Q + '$ và $' + s.S + s.A + '$ song song',
        '$' + s.M + s.F + '$ và $' + s.O + s.B + '$ song song',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + s.M + s.Q + '$ và $' + s.A + s.O + '$ chéo nhau (' + j + ')'
      );

      return {
        stem: 'Cho tứ diện $' + s.S + s.O + s.A + s.B + '$. Gọi $' + s.M + ', ' + s.F + ', ' + s.Q + '$ lần lượt là trung điểm của các cạnh $' + s.S + s.O + ', ' + s.O + s.A + '$ và $' + s.S + s.B + '$. Gọi $' + s.K + '$ là điểm thuộc cạnh $' + s.A + s.B + '$ sao cho $' + s.K + s.A + ' = ' + kRatio + s.K + s.B + '$. Tìm khẳng định đúng trong các khẳng định sau.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: s.S, vL: s.O, vF: s.A, vR: s.B },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong mặt phẳng $(' + s.O + s.A + s.B + ')$, ta có $' + s.F + '$ là trung điểm $' + s.O + s.A + '$ ($\\frac{' + s.A + s.F + '}{' + s.A + s.O + '} = \\frac{1}{2}$) và $' + s.K + ' \\in ' + s.A + s.B + '$ thỏa $\\frac{' + s.A + s.K + '}{' + s.A + s.B + '} = \\frac{' + kRatio + '}{' + (kRatio + 1) + '} \\neq \\frac{1}{2}$.',
          'Do đó $' + s.F + s.K + '$ và $' + s.O + s.B + '$ không song song nên chúng cắt nhau trong $(' + s.O + s.A + s.B + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kRatio = 1', params: { setIdx: 0, kRatio: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (SOAB -> FK và OB cắt nhau)', params: { setIdx: 0, kRatio: 2 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Hai đường thẳng chéo nhau / đồng phẳng trong tứ diện S.ABC với trọng tâm hai mặt bên
  t11_b11_d07_tetra_skew_opposite_edges_mc: {
    id: 't11_b11_d07_tetra_skew_opposite_edges_mc',
    name: 'Nhận biết cặp cạnh đối diện chéo nhau trong tứ diện',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho tứ diện S.ABC có N, P là trung điểm AB, AC và K, G là trọng tâm các tam giác SAB, SAC. Chọn khẳng định đúng.',
    conditionSummary: 'setIdx ∈ [0; 3], pairOpt ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..3)', min: 0, max: 3 },
      { name: 'pairOpt', label: 'Cặp cạnh đối diện chéo nhau (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, pairOpt } = params;
      if (setIdx < 0 || setIdx > 3 || pairOpt < 0 || pairOpt > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, pairOpt } = params;
      const SETS = [
        { S: 'S', A: 'A', B: 'B', C: 'C', N: 'N', P: 'P', K: 'K', G: 'G' },
        { S: 'S', A: 'A', B: 'B', C: 'C', N: 'M', P: 'Q', K: 'I', G: 'E' },
        { S: 'O', A: 'A', B: 'B', C: 'C', N: 'M', P: 'N', K: 'H', G: 'I' },
        { S: 'S', A: 'M', B: 'N', C: 'P', N: 'E', P: 'F', K: 'I', G: 'K' },
      ];
      const s = SETS[setIdx];
      const pairs = [
        s.S + s.C + '$ và $' + s.A + s.B,
        s.S + s.B + '$ và $' + s.A + s.C,
        s.S + s.A + '$ và $' + s.B + s.C,
      ];
      const correct = '$' + pairs[pairOpt] + '$ chéo nhau';
      const wList = [
        '$' + s.S + s.G + '$ và $' + s.C + s.P + '$ chéo nhau',
        '$' + s.A + s.K + '$ và $' + s.N + s.G + '$ song song',
        '$' + s.A + s.K + '$ và $' + s.S + s.B + '$ chéo nhau',
        '$' + s.N + s.P + '$ và $' + s.B + s.C + '$ cắt nhau',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + s.A + s.K + '$ và $' + s.S + s.N + '$ song song (' + j + ')'
      );

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.A + s.B + s.C + '$. Gọi $' + s.N + ', ' + s.P + '$ lần lượt là trung điểm của các cạnh $' + s.A + s.B + ', ' + s.A + s.C + '$. Gọi $' + s.K + ', ' + s.G + '$ lần lượt là trọng tâm của các tam giác $' + s.S + s.A + s.B + ', ' + s.S + s.A + s.C + '$. Khẳng định nào sau đây là đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: s.S, vL: s.A, vF: s.B, vR: s.C },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai đường thẳng $' + pairs[pairOpt] + '$ là hai cạnh đối diện của tứ diện $' + s.S + s.A + s.B + s.C + '$ nên chúng không đồng phẳng, tức là chéo nhau.',
          'Các cặp còn lại đều cắt nhau (như $' + s.A + s.K + '$ và $' + s.S + s.B + '$, $' + s.S + s.G + '$ và $' + s.C + s.P + '$) hoặc song song ($' + s.N + s.P + ' \\parallel ' + s.B + s.C + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pairOpt = 3', params: { setIdx: 0, pairOpt: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (S.ABC -> SC và AB chéo nhau)', params: { setIdx: 0, pairOpt: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Giao tuyến hai mặt bên đối diện hình chóp đáy hình bình hành song song đường trung bình
  t11_b11_d08_para_opposite_faces_inter_mc: {
    id: 't11_b11_d08_para_opposite_faces_inter_mc',
    name: 'Giao tuyến hai mặt bên đối diện của hình chóp đáy hình bình hành song song với đường trung bình',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho hình chóp đáy hình bình hành với P, Q là trung điểm hai cạnh đối diện của đáy. Tìm đường thẳng song song với giao tuyến hai mặt bên đối diện.',
    conditionSummary: 'setIdx ∈ [0; 3], pairOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..3)', min: 0, max: 3 },
      { name: 'pairOpt', label: 'Cặp mặt bên đối diện (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, pairOpt } = params;
      if (setIdx < 0 || setIdx > 3 || (pairOpt !== 0 && pairOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, pairOpt } = params;
      const SETS = [
        { apex: 'S', v: ['C', 'D', 'E', 'F'], P: 'P', Q: 'Q' },
        { apex: 'S', v: ['A', 'B', 'C', 'D'], P: 'M', Q: 'N' },
        { apex: 'S', v: ['M', 'N', 'P', 'Q'], P: 'I', Q: 'K' },
        { apex: 'O', v: ['A', 'B', 'C', 'D'], P: 'E', Q: 'F' },
      ];
      const s = SETS[setIdx];
      const [C, D, E, F] = s.v;
      const pq = s.P + s.Q;

      const edge1 = pairOpt === 0 ? C + F : C + D;
      const edge2 = pairOpt === 0 ? D + E : F + E;
      const face1 = pairOpt === 0 ? s.apex + C + D : s.apex + C + F;
      const face2 = pairOpt === 0 ? s.apex + E + F : s.apex + D + E;
      const par1 = pairOpt === 0 ? C + D : C + F;
      const par2 = pairOpt === 0 ? E + F : D + E;

      const correct = '$' + pq + '$';
      const wList = [
        '$' + C + E + '$',
        '$' + F + s.P + '$',
        '$' + D + E + '$',
        '$' + D + F + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + s.apex + s.v[j % 4] + '$'
      );

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.v.join('') + '$ có đáy là hình bình hành. Gọi $' + s.P + ', ' + s.Q + '$ lần lượt là trung điểm của $' + edge1 + ', ' + edge2 + '$. Giao tuyến của hai mặt phẳng $(' + face1 + ')$ và $(' + face2 + ')$ là đường thẳng song song với đường thẳng nào sau đây?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 0 },
          labels: { apex: s.apex, vBL: C, vBR: D, vFR: E, vFL: F },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + par1 + ' \\subset (' + face1 + ')$, $' + par2 + ' \\subset (' + face2 + ')$ và $' + par1 + ' \\parallel ' + par2 + '$ nên giao tuyến của $(' + face1 + ')$ và $(' + face2 + ')$ là đường thẳng qua $' + s.apex + '$ và song song với $' + par1 + '$, $' + par2 + '$.',
          'Mặt khác $' + pq + '$ là đường trung bình của hình bình hành $' + s.v.join('') + '$ nên $' + pq + ' \\parallel ' + par1 + '$, suy ra giao tuyến song song với $' + pq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pairOpt = 2', params: { setIdx: 0, pairOpt: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (S.CDEF, P, Q -> PQ)', params: { setIdx: 0, pairOpt: 0 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Giao tuyến mặt phẳng chứa đường trung bình với mặt đáy/mặt phẳng phụ của tứ diện
  t11_b11_d09_tetra_midsegment_plane_inter_mc: {
    id: 't11_b11_d09_tetra_midsegment_plane_inter_mc',
    name: 'Giao tuyến mặt phẳng chứa đường trung bình với mặt đáy của tứ diện',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho tứ diện, M, Q là trung điểm hai cạnh bên và G thuộc cạnh bên còn lại. Xác định giao tuyến của (GMQ) và mặt đáy.',
    conditionSummary: 'setIdx ∈ [0; 3], kRatio ∈ [2; 3], faceOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..3)', min: 0, max: 3 },
      { name: 'kRatio', label: 'Tỉ số chia GB/GE (2 hoặc 3)', min: 2, max: 3 },
      { name: 'faceOpt', label: 'Cặp cạnh lấy trung điểm (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, kRatio, faceOpt } = params;
      if (setIdx < 0 || setIdx > 3 || (kRatio !== 2 && kRatio !== 3) || (faceOpt !== 0 && faceOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, kRatio, faceOpt } = params;
      const SETS = [
        { A: 'A', B: 'B', E: 'E', F: 'F', M: 'M', Q: 'Q', G: 'G' },
        { A: 'S', B: 'A', E: 'B', F: 'C', M: 'M', Q: 'N', G: 'K' },
        { A: 'S', B: 'M', E: 'N', F: 'P', M: 'I', Q: 'K', G: 'H' },
        { A: 'A', B: 'B', E: 'C', F: 'D', M: 'E', Q: 'F', G: 'P' },
      ];
      const s = SETS[setIdx];
      const edge1 = faceOpt === 0 ? s.A + s.B : s.A + s.E;
      const edge2 = s.A + s.F;
      const parBase = faceOpt === 0 ? s.B + s.F : s.E + s.F;
      const wrongBase1 = faceOpt === 0 ? s.F + s.M : s.B + s.M;
      const wrongBase2 = faceOpt === 0 ? s.E + s.F : s.B + s.F;
      const plBase = s.B + s.E + s.F;
      const plTop = s.G + s.M + s.Q;

      const correct = 'đường thẳng qua $' + s.G + '$ và song song với $' + parBase + '$';
      const w1 = 'đường thẳng qua $' + s.E + '$ và song song với $' + wrongBase1 + '$';
      const w2 = 'đường thẳng qua $' + s.F + '$ và song song với $' + s.B + s.E + '$';
      const w3 = 'đường thẳng qua $' + s.G + '$ và song song với $' + wrongBase2 + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => 'đường thẳng qua $' + s.B + '$ và song song với $' + s.M + s.Q + '$ (' + j + ')'
      );

      return {
        stem: 'Cho tứ diện $' + s.A + s.B + s.E + s.F + '$. Gọi $' + s.M + ', ' + s.Q + '$ lần lượt là trung điểm của $' + edge1 + ', ' + edge2 + '$. Gọi $' + s.G + '$ là điểm thuộc cạnh $' + s.B + s.E + '$ sao cho $' + s.G + s.B + ' = ' + kRatio + s.G + s.E + '$. Giao tuyến của hai mặt phẳng $(' + plTop + ')$ và $(' + plBase + ')$ là:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: s.A, vL: s.B, vF: s.E, vR: s.F },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong tam giác $' + (faceOpt === 0 ? s.A + s.B + s.F : s.A + s.E + s.F) + '$, $' + s.M + s.Q + '$ là đường trung bình nên $' + s.M + s.Q + ' \\parallel ' + parBase + '$.',
          'Ta có $' + s.G + ' \\in (' + plTop + ') \\cap (' + plBase + ')$, đồng thời $' + s.M + s.Q + ' \\subset (' + plTop + ')$, $' + parBase + ' \\subset (' + plBase + ')$ và $' + s.M + s.Q + ' \\parallel ' + parBase + '$.',
          'Vậy giao tuyến của hai mặt phẳng đó là đường thẳng qua $' + s.G + '$ và song song với $' + parBase + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kRatio = 0', params: { setIdx: 0, kRatio: 0, faceOpt: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (ABEF, M, Q, G -> qua G // BF)', params: { setIdx: 0, kRatio: 2, faceOpt: 0 }, expectedValid: true },
    ],
  },
};
