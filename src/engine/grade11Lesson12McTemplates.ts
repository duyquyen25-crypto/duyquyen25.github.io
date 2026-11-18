import { MathTemplate } from '../types/math';

export const G11_B12_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất và điều kiện đường thẳng song song với mặt phẳng
  t11_b12_d01_line_parallel_plane_axiom_mc: {
    id: 't11_b12_d01_line_parallel_plane_axiom_mc',
    name: 'Điều kiện và hệ quả đường thẳng song song với mặt phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho hai đường thẳng và các mặt phẳng trong không gian. Xác định khẳng định đúng về quan hệ song song giữa đường thẳng và mặt phẳng.',
    conditionSummary: 'setIdx ∈ [0; 3] (đổi tên đường thẳng và mặt phẳng)',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu hình học (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 3) {
        return { valid: false, reason: 'setIdx ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx } = params;
      const SETS = [
        { a: 'n', b: 'l', p1: '\\beta', p2: 'P' },
        { a: 'd', b: 'a', p1: '\\alpha', p2: 'Q' },
        { a: 'm', b: '\\Delta', p1: 'P', p2: '\\gamma' },
        { a: 'a', b: 'b', p1: '\\gamma', p2: 'R' },
      ];
      const s = SETS[setIdx];

      const correct = 'Nếu $' + s.a + '$ song song với mặt phẳng $(' + s.p1 + ')$ và $' + s.b + ' \\subset (' + s.p1 + ')$ thì $' + s.a + '$ song song $' + s.b + '$ hoặc $' + s.a + ', ' + s.b + '$ chéo nhau';
      const w1 = 'Nếu $' + s.a + '$ song song với $' + s.b + '$ và $' + s.b + ' \\subset (' + s.p1 + ')$ thì $' + s.a + '$ song song với $(' + s.p1 + ')$';
      const w2 = 'Nếu hai đường thẳng phân biệt $' + s.a + ', ' + s.b + '$ cùng song song với mặt phẳng $(' + s.p1 + ')$ thì $' + s.a + ', ' + s.b + '$ song song nhau';
      const w3 = 'Nếu đường thẳng $' + s.a + '$ song song với một đường thẳng $' + s.b + '$ nào đó nằm trong $(' + s.p1 + ')$ thì $' + s.a + '$ song song với $(' + s.p1 + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => 'Nếu $' + s.a + '$ cắt $(' + s.p2 + ')$ thì $' + s.a + '$ song song với $(' + s.p1 + ')$ (' + j + ')'
      );

      return {
        stem: 'Cho các đường thẳng $' + s.a + ', ' + s.b + '$ và các mặt phẳng $(' + s.p1 + '), (' + s.p2 + ')$. Khẳng định nào sau đây là khẳng định đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + s.a + ' \\parallel (' + s.p1 + ')$ nên $' + s.a + '$ và $(' + s.p1 + ')$ không có điểm chung. Với mọi đường thẳng $' + s.b + ' \\subset (' + s.p1 + ')$, $' + s.a + '$ và $' + s.b + '$ không thể cắt nhau, nên chúng chỉ có thể song song hoặc chéo nhau.',
          'Các khẳng định còn lại đều sai: thiếu điều kiện $' + s.a + ' \\not\\subset (' + s.p1 + ')$ (có thể $' + s.a + '$ nằm trong $(' + s.p1 + ')$), hoặc hai đường thẳng cùng song song với một mặt phẳng có thể cắt nhau hay chéo nhau.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx âm', params: { setIdx: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (n, l, beta, P)', params: { setIdx: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Vị trí tương đối khi một đường nằm trong mặt phẳng và một đường song song mặt phẳng
  t11_b12_d02_line_parallel_plane_basic_mc: {
    id: 't11_b12_d02_line_parallel_plane_basic_mc',
    name: 'Nhận biết quan hệ giữa đường thẳng song song mặt phẳng với điểm và đường nằm trong mặt phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho đường thẳng Δ ⊂ (β), đường thẳng n // (β) và điểm I ∈ (β). Chọn khẳng định đúng.',
    conditionSummary: 'setIdx ∈ [0; 3] (đổi tên đường thẳng, điểm, mặt phẳng)',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu hình học (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 3) {
        return { valid: false, reason: 'setIdx ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx } = params;
      const SETS = [
        { d: '\\Delta', pl: '\\beta', n: 'n', pt: 'I' },
        { d: 'd', pl: '\\alpha', n: 'a', pt: 'M' },
        { d: 'a', pl: 'P', n: 'b', pt: 'K' },
        { d: 'm', pl: '\\gamma', n: 'd', pt: 'H' },
      ];
      const s = SETS[setIdx];

      const correct = '$' + s.n + '$ và mặt phẳng $(' + s.pl + ')$ không có điểm chung';
      const w1 = '$' + s.d + '$ và $' + s.n + '$ cùng thuộc một mặt phẳng';
      const w2 = 'Có vô số đường thẳng đi qua $' + s.pt + '$ và song song với $' + s.n + '$';
      const w3 = 'Có vô số đường thẳng đi qua $' + s.pt + '$ và song song với $' + s.d + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$' + s.n + '$ cắt đường thẳng $' + s.d + '$ tại $' + s.pt + '$ (' + j + ')'
      );

      return {
        stem: 'Trong không gian cho đường thẳng $' + s.d + '$ nằm trong mặt phẳng $(' + s.pl + ')$, đường thẳng $' + s.n + '$ song song với mặt phẳng $(' + s.pl + ')$ và điểm $' + s.pt + '$ thuộc mặt phẳng $(' + s.pl + ')$. Tìm khẳng định đúng trong các khẳng định sau.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo định nghĩa đường thẳng song song với mặt phẳng, $' + s.n + ' \\parallel (' + s.pl + ')$ suy ra $' + s.n + '$ và $(' + s.pl + ')$ không có điểm chung.',
          'Hai đường thẳng $' + s.d + '$ và $' + s.n + '$ có thể chéo nhau (không đồng phẳng), và qua điểm $' + s.pt + ' \\notin ' + s.n + '$ chỉ có duy nhất một đường thẳng song song với $' + s.n + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 4', params: { setIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (Delta, beta, n, I)', params: { setIdx: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Đường trung bình mặt bên tứ diện song song mặt phẳng chứa cạnh đối diện
  t11_b12_d03_tetra_midpoints_parallel_plane_mc: {
    id: 't11_b12_d03_tetra_midpoints_parallel_plane_mc',
    name: 'Đường trung bình trong tứ diện song song với mặt phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho hình chóp tam giác (tứ diện) và 3 trung điểm trên các cạnh. Xác định khẳng định đúng về đường thẳng song song với mặt phẳng.',
    conditionSummary: 'setIdx ∈ [0; 3], edgeOpt ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh tứ diện (0..3)', min: 0, max: 3 },
      { name: 'edgeOpt', label: 'Đỉnh đáy chính (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, edgeOpt } = params;
      if (setIdx < 0 || setIdx > 3 || edgeOpt < 0 || edgeOpt > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, edgeOpt } = params;
      const SETS = [
        { S: 'B', v: ['C', 'E', 'F'], m1: 'N', m2: 'J', m3: 'P' },
        { S: 'S', v: ['A', 'B', 'C'], m1: 'M', m2: 'N', m3: 'P' },
        { S: 'S', v: ['M', 'N', 'P'], m1: 'E', m2: 'F', m3: 'K' },
        { S: 'A', v: ['B', 'C', 'D'], m1: 'I', m2: 'K', m3: 'H' },
      ];
      const s = SETS[setIdx];
      const v0 = s.v[edgeOpt];
      const v1 = s.v[(edgeOpt + 1) % 3];
      const v2 = s.v[(edgeOpt + 2) % 3];

      const e1 = s.S + v0;
      const e2 = v0 + v1;
      const e3 = s.S + v2;

      const correct = '$' + s.m1 + s.m2 + ' \\parallel (' + s.S + s.m3 + v1 + ')$';
      const w1 = '$' + v0 + v1 + ' \\parallel (' + s.m1 + s.m2 + s.m3 + ')$';
      const w2 = '$' + v1 + v2 + ' \\parallel (' + s.S + s.m1 + s.m2 + ')$';
      const w3 = '$' + s.m1 + v2 + ' \\parallel (' + s.S + v0 + v1 + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$' + s.m1 + s.m2 + ' \\parallel (' + s.S + v0 + v1 + ')$ (' + j + ')'
      );

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.v.join('') + '$. Gọi $' + s.m1 + ', ' + s.m2 + ', ' + s.m3 + '$ lần lượt là trung điểm của $' + e1 + ', ' + e2 + ', ' + e3 + '$. Khẳng định nào sau đây là khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: s.S, vL: s.v[0], vF: s.v[1], vR: s.v[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong tam giác $' + s.S + v0 + v1 + '$, vì $' + s.m1 + ', ' + s.m2 + '$ lần lượt là trung điểm của $' + e1 + ', ' + e2 + '$ nên $' + s.m1 + s.m2 + '$ là đường trung bình, suy ra $' + s.m1 + s.m2 + ' \\parallel ' + s.S + v1 + '$.',
          'Mà $' + s.S + v1 + ' \\subset (' + s.S + s.m3 + v1 + ')$ (do $' + s.m3 + ' \\in ' + e3 + '$) và $' + s.m1 + ' \\notin (' + s.S + s.m3 + v1 + ')$ nên $' + s.m1 + s.m2 + ' \\parallel (' + s.S + s.m3 + v1 + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên edgeOpt = 3', params: { setIdx: 0, edgeOpt: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (B.CEF, N, J, P)', params: { setIdx: 0, edgeOpt: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Đường trung bình nối trung điểm hai cạnh bên đối nhau của hình chóp đáy hình vuông
  t11_b12_d04_square_pyramid_midpoints_plane_mc: {
    id: 't11_b12_d04_square_pyramid_midpoints_plane_mc',
    name: 'Đoạn nối trung điểm hai cạnh bên đối diện song song mặt phẳng đáy hình chóp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho hình chóp đáy hình vuông tâm O, hai trung điểm M, H của hai cạnh bên đối diện. Xác định mặt phẳng song song với MH.',
    conditionSummary: 'setIdx ∈ [0; 3], diagOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..3)', min: 0, max: 3 },
      { name: 'diagOpt', label: 'Cặp cạnh bên đối (0: chéo 1, 1: chéo 2)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, diagOpt } = params;
      if (setIdx < 0 || setIdx > 3 || (diagOpt !== 0 && diagOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, diagOpt } = params;
      const SETS = [
        { S: 'S', v: ['C', 'D', 'E', 'F'], O: 'O', M: 'M', H: 'H' },
        { S: 'S', v: ['A', 'B', 'C', 'D'], O: 'O', M: 'M', H: 'N' },
        { S: 'S', v: ['M', 'N', 'P', 'Q'], O: 'I', M: 'E', H: 'F' },
        { S: 'O', v: ['A', 'B', 'C', 'D'], O: 'I', M: 'P', H: 'Q' },
      ];
      const s = SETS[setIdx];
      const v0 = diagOpt === 0 ? s.v[0] : s.v[1];
      const v1 = diagOpt === 0 ? s.v[1] : s.v[2];
      const v2 = diagOpt === 0 ? s.v[2] : s.v[3];
      const v3 = diagOpt === 0 ? s.v[3] : s.v[0];
      const mh = s.M + s.H;

      const correct = '$' + mh + ' \\parallel (' + v0 + v2 + v3 + ')$';
      const w1 = '$' + v1 + v2 + ' \\parallel (' + s.O + mh + ')$';
      const w2 = '$' + mh + ' \\parallel (' + s.S + v0 + v1 + ')$';
      const w3 = '$' + mh + ' \\parallel (' + s.S + v0 + v2 + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$' + mh + ' \\parallel (' + s.S + v2 + v3 + ')$ (' + j + ')'
      );

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.v.join('') + '$ có đáy là hình vuông tâm $' + s.O + '$. Gọi $' + s.M + ', ' + s.H + '$ lần lượt là trung điểm của $' + s.S + v0 + ', ' + s.S + v2 + '$. Khẳng định nào sau đây là khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.S, vBL: s.v[0], vBR: s.v[1], vFR: s.v[2], vFL: s.v[3], center: s.O },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong tam giác $' + s.S + v0 + v2 + '$, $' + mh + '$ là đường trung bình nên $' + mh + ' \\parallel ' + v0 + v2 + '$.',
          'Vì $' + v0 + v2 + ' \\subset (' + v0 + v2 + v3 + ')$ (chính là mặt phẳng đáy) và $' + s.M + ' \\notin (' + v0 + v2 + v3 + ')$ nên $' + mh + ' \\parallel (' + v0 + v2 + v3 + ')$.',
          'Lưu ý mặt phẳng $(' + s.O + mh + ')$ chính là $(' + s.S + v0 + v2 + ')$ nên $' + v1 + v2 + '$ cắt mặt phẳng này tại $' + v2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên diagOpt = 2', params: { setIdx: 0, diagOpt: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (S.CDEF, O, M, H)', params: { setIdx: 0, diagOpt: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Đường trung bình mặt bên hình chóp đáy hình thang song song mặt bên chứa đáy nhỏ
  t11_b12_d05_trapezoid_pyramid_midpoints_plane_mc: {
    id: 't11_b12_d05_trapezoid_pyramid_midpoints_plane_mc',
    name: 'Đường trung bình mặt bên hình chóp đáy hình thang song song mặt bên',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho hình chóp đáy hình thang đáy lớn AB, hai trung điểm P, Q trên cạnh bên hình thang và cạnh bên hình chóp. Tìm khẳng định đúng.',
    conditionSummary: 'setIdx ∈ [0; 3], sideOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..3)', min: 0, max: 3 },
      { name: 'sideOpt', label: 'Cạnh bên hình thang (0: AD-SA, 1: BC-SB)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, sideOpt } = params;
      if (setIdx < 0 || setIdx > 3 || (sideOpt !== 0 && sideOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, sideOpt } = params;
      const SETS = [
        { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', P: 'P', Q: 'Q' },
        { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', P: 'M', Q: 'N' },
        { S: 'S', A: 'M', B: 'N', C: 'P', D: 'Q', P: 'E', Q: 'F' },
        { S: 'O', A: 'A', B: 'B', C: 'C', D: 'D', P: 'I', Q: 'K' },
      ];
      const s = SETS[setIdx];
      const pq = s.P + s.Q;
      const baseEdge = sideOpt === 0 ? s.A + s.D : s.B + s.C;
      const latEdge = sideOpt === 0 ? s.S + s.A : s.S + s.B;
      const parLat = sideOpt === 0 ? s.S + s.D : s.S + s.C;
      const targetPlane = s.S + s.C + s.D;
      const wrongLatPlane1 = sideOpt === 0 ? s.S + s.A + s.C : s.S + s.B + s.D;
      const wrongLatPlane2 = sideOpt === 0 ? s.S + s.B + s.C : s.S + s.A + s.D;
      const basePlane = s.A + s.B + s.C + s.D;

      const correct = '$' + pq + ' \\parallel (' + targetPlane + ')$';
      const w1 = '$' + pq + ' \\parallel (' + wrongLatPlane1 + ')$';
      const w2 = '$' + pq + ' \\parallel (' + basePlane + ')$';
      const w3 = '$' + pq + ' \\parallel (' + wrongLatPlane2 + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (j) => '$' + pq + ' \\parallel (' + s.S + s.A + s.B + ')$ (' + j + ')'
      );

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + basePlane + '$ có đáy là hình thang đáy lớn $' + s.A + s.B + '$. Gọi $' + s.P + '$ và $' + s.Q + '$ lần lượt là trung điểm của các cạnh $' + baseEdge + '$ và $' + latEdge + '$. Tìm khẳng định đúng.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { isTrapezoid: 1, showDiags: 0 },
          labels: { apex: s.S, vBL: s.A, vBR: s.B, vFR: s.C, vFL: s.D },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong tam giác $' + s.S + baseEdge + '$, vì $' + s.P + ', ' + s.Q + '$ lần lượt là trung điểm của $' + baseEdge + '$ và $' + latEdge + '$ nên $' + pq + '$ là đường trung bình, suy ra $' + pq + ' \\parallel ' + parLat + '$.',
          'Mà $' + parLat + ' \\subset (' + targetPlane + ')$ và $' + s.P + ' \\notin (' + targetPlane + ')$ nên $' + pq + ' \\parallel (' + targetPlane + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên sideOpt = 2', params: { setIdx: 0, sideOpt: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (S.ABCD, P, Q trên AD, SA -> PQ // (SCD))', params: { setIdx: 0, sideOpt: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Ba trung điểm xuất phát từ một đỉnh đáy của tứ diện -> Tìm khẳng định sai
  t11_b12_d06_tetra_midpoints_false_mc: {
    id: 't11_b12_d06_tetra_midpoints_false_mc',
    name: 'Quan hệ song song và thuộc mặt phẳng từ 3 trung điểm trong tứ diện (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho tứ diện S.CDE, gọi N, M, J là trung điểm 3 cạnh chung một đỉnh đáy. Xác định khẳng định sai.',
    conditionSummary: 'setIdx ∈ [0; 3], cornerOpt ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh tứ diện (0..3)', min: 0, max: 3 },
      { name: 'cornerOpt', label: 'Đỉnh chung 3 cạnh (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, cornerOpt } = params;
      if (setIdx < 0 || setIdx > 3 || cornerOpt < 0 || cornerOpt > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, cornerOpt } = params;
      const SETS = [
        { S: 'S', v: ['C', 'D', 'E'], n: 'N', m: 'M', j: 'J' },
        { S: 'S', v: ['A', 'B', 'C'], n: 'I', m: 'K', j: 'H' },
        { S: 'O', v: ['A', 'B', 'C'], n: 'M', m: 'N', j: 'P' },
        { S: 'A', v: ['B', 'C', 'D'], n: 'E', m: 'F', j: 'G' },
      ];
      const s = SETS[setIdx];
      const v0 = s.v[cornerOpt];
      const v1 = s.v[(cornerOpt + 1) % 3];
      const v2 = s.v[(cornerOpt + 2) % 3];

      const e1 = s.S + v0;
      const e2 = v0 + v1;
      const e3 = v0 + v2;

      const correct = '$' + s.n + v2 + ' \\subset (' + s.S + v0 + v1 + ')$';
      const w1 = '$' + s.n + s.j + ' \\parallel (' + s.m + s.S + v2 + ')$';
      const w2 = '$' + v1 + v2 + ' \\parallel (' + s.n + s.m + s.j + ')$';
      const w3 = '$' + s.n + s.m + ' \\parallel (' + s.S + v1 + v2 + ')$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (k) => '$' + s.m + s.j + ' \\parallel (' + s.S + v1 + v2 + ')$ (' + k + ')'
      );

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.v.join('') + '$. Gọi $' + s.n + ', ' + s.m + ', ' + s.j + '$ lần lượt là trung điểm của $' + e1 + ', ' + e2 + ', ' + e3 + '$. Khẳng định nào sau đây là khẳng định **sai**?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: s.S, vL: s.v[0], vF: s.v[1], vR: s.v[2] },
        },
        options,
        correctIndex,
        answerSummary: correct + ' (sai)',
        solutionSteps: [
          'Ta có $' + s.n + s.j + ' \\parallel ' + s.S + v2 + ' \\Rightarrow ' + s.n + s.j + ' \\parallel (' + s.m + s.S + v2 + ')$; $' + v1 + v2 + ' \\parallel ' + s.m + s.j + ' \\Rightarrow ' + v1 + v2 + ' \\parallel (' + s.n + s.m + s.j + ')$; và $' + s.n + s.m + ' \\parallel ' + s.S + v1 + ' \\Rightarrow ' + s.n + s.m + ' \\parallel (' + s.S + v1 + v2 + ')$.',
          'Riêng điểm $' + v2 + ' \\notin (' + s.S + v0 + v1 + ')$ trong khi $' + s.n + ' \\in ' + e1 + ' \\subset (' + s.S + v0 + v1 + ')$ nên đường thẳng $' + s.n + v2 + '$ cắt $(' + s.S + v0 + v1 + ')$ tại $' + s.n + '$, không thể nằm trong $(' + s.S + v0 + v1 + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cornerOpt = -1', params: { setIdx: 0, cornerOpt: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (S.CDE, N, M, J)', params: { setIdx: 0, cornerOpt: 0 }, expectedValid: true },
    ],
  },
};
