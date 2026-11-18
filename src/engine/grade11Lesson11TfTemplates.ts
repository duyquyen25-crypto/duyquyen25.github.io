import { MathTemplate } from '../types/math';

export const G11_B11_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D10 (Q10): Hình chóp đáy hình bình hành tâm I, H, K trung điểm hai cạnh bên -> Đúng/Sai
  t11_b11_d10_para_midpoints_skew_tf: {
    id: 't11_b11_d10_para_midpoints_skew_tf',
    name: 'Vị trí tương đối và giao điểm đường thẳng với mặt phẳng từ đường trung bình mặt bên (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho hình chóp đáy hình bình hành tâm I, hai trung điểm H, K trên hai cạnh bên. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], edgeOpt ∈ {0, 1}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
      { name: 'edgeOpt', label: 'Cặp cạnh bên (0: SA-SB, 1: SB-SC)', min: 0, max: 1 },
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
        { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', I: 'I', H: 'H', K: 'K' },
        { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', I: 'O', H: 'M', K: 'N' },
        { S: 'O', A: 'A', B: 'B', C: 'C', D: 'D', I: 'H', H: 'E', K: 'F' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const e1 = edgeOpt === 0 ? s.S + s.A : s.S + s.B;
      const e2 = edgeOpt === 0 ? s.S + s.B : s.S + s.C;
      const opp1 = edgeOpt === 0 ? s.D : s.A;
      const opp2 = edgeOpt === 0 ? s.C : s.D;
      const faceTarget = edgeOpt === 0 ? s.S + s.A + s.D : s.S + s.A + s.B;
      const skewEdge = edgeOpt === 0 ? s.S + s.B : s.S + s.C;
      const parOppEdge = opp2 + opp1;
      const diagPt = edgeOpt === 0 ? s.A : s.B;

      const tfStatements = [
        {
          key: 'a',
          text: '$' + skewEdge + '$ và $' + opp1 + s.H + '$ ' + (aIs ? 'chéo nhau' : 'cắt nhau'),
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Giao điểm của $' + opp2 + s.K + '$ và mặt phẳng $(' + faceTarget + ')$ là giao điểm giữa $' + opp2 + s.K + '$ và $' + (bIs ? opp1 + s.H : e1) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$' + s.H + s.K + '$ và $' + parOppEdge + '$ ' + (cIs ? 'song song' : 'chéo nhau'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$' + s.I + diagPt + '$ và $' + parOppEdge + '$ ' + (dIs ? 'cắt nhau' : 'chéo nhau'),
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.A + s.B + s.C + s.D + '$ có đáy là hình bình hành tâm $' + s.I + '$. Gọi $' + s.H + ', ' + s.K + '$ lần lượt là trung điểm của $' + e1 + ', ' + e2 + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.S, vBL: s.A, vBR: s.B, vFR: s.C, vFL: s.D, center: s.I },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $' + skewEdge + '$ và $' + opp1 + s.H + '$ không đồng phẳng nên chéo nhau (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + s.H + s.K + ' \\parallel ' + parOppEdge + '$ và $' + s.H + s.K + ' = \\frac{1}{2}' + parOppEdge + '$ nên $' + opp2 + ',' + opp1 + ',' + s.H + ',' + s.K + '$ lập thành hình thang; $' + opp2 + s.K + '$ cắt $' + opp1 + s.H + ' \\subset (' + faceTarget + ')$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + s.H + s.K + ' \\parallel ' + parOppEdge + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.I + diagPt + '$ chính là đường chéo chứa $' + opp2 + '$ nên cắt $' + parOppEdge + '$ tại $' + opp2 + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên edgeOpt ngoài miền', params: { setIdx: 0, edgeOpt: 2, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (Đ Đ S S)', params: { setIdx: 0, edgeOpt: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Hình chóp đáy hình bình hành, I ∈ SB, J, H chia tỉ lệ trên hai cạnh đáy -> Đúng/Sai
  t11_b11_d11_para_ratio_inter_tf: {
    id: 't11_b11_d11_para_ratio_inter_tf',
    name: 'Giao điểm, giao tuyến song song và đường thẳng chéo nhau trong hình chóp đáy hình bình hành (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho hình chóp đáy hình bình hành tâm O, điểm I trên SB và hai điểm J, H chia tỉ lệ bằng nhau trên hai cạnh kề. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], kRatio ∈ [2; 4], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
      { name: 'kRatio', label: 'Tỉ số chia CJ/JB = CH/HE (2..4)', min: 2, max: 4 },
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
        { S: 'S', B: 'B', C: 'C', E: 'E', F: 'F', O: 'O', I: 'I', J: 'J', H: 'H', N: 'N', M: 'M' },
        { S: 'S', B: 'A', C: 'B', E: 'C', F: 'D', O: 'O', I: 'K', J: 'M', H: 'N', N: 'P', M: 'Q' },
        { S: 'O', B: 'B', C: 'C', E: 'D', F: 'A', O: 'G', I: 'I', J: 'P', H: 'Q', N: 'N', M: 'M' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const plIJH = s.I + s.J + s.H;
      const plSJH = s.S + s.J + s.H;
      const plSEF = s.S + s.E + s.F;

      const tfStatements = [
        {
          key: 'a',
          text: 'Giao điểm của $' + s.B + s.F + '$ và $(' + plIJH + ')$ là điểm $' + s.N + '$ với $' + s.N + ' = ' + s.B + s.F + ' \\cap ' + (aIs ? s.J + s.H : s.I + s.J) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Giao tuyến của $(' + plSJH + ')$ và $(' + plSEF + ')$ là đường thẳng $' + s.S + s.M + '$ với $' + s.M + ' = ' + s.J + s.H + ' \\cap ' + (bIs ? s.E + s.F : s.C + s.F) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$' + s.J + s.H + '$ và $' + s.S + s.E + '$ ' + (cIs ? 'chéo nhau' : 'song song'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: dIs
            ? 'Giao tuyến của $(' + s.S + s.B + s.F + ')$ và $(' + s.S + s.C + s.E + ')$ là đường thẳng qua $' + s.S + '$ và song song với $' + s.C + s.E + '$'
            : 'Giao tuyến của $(' + s.S + s.B + s.F + ')$ và $(' + s.S + s.C + s.E + ')$ là đường thẳng $' + s.S + s.O + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.B + s.C + s.E + s.F + '$ có đáy là hình bình hành tâm $' + s.O + '$. Gọi $' + s.I + '$ là điểm tùy ý thuộc cạnh $' + s.S + s.B + '$ không trùng với $' + s.S + '$ và $' + s.B + '$. Gọi $' + s.J + ', ' + s.H + '$ là các điểm lần lượt thuộc $' + s.B + s.C + ', ' + s.C + s.E + '$ sao cho $' + s.C + s.J + ' = ' + kRatio + s.J + s.B + ',\\; ' + s.C + s.H + ' = ' + kRatio + s.H + s.E + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: s.S, vBL: s.B, vBR: s.C, vFR: s.E, vFL: s.F, center: s.O },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Trong mặt đáy, $' + s.J + s.H + ' \\parallel ' + s.B + s.E + '$ nên $' + s.J + s.H + '$ cắt $' + s.B + s.F + '$ tại $' + s.N + '$, do đó $' + s.B + s.F + ' \\cap (' + plIJH + ') = ' + s.N + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $' + s.M + ' = ' + s.J + s.H + ' \\cap ' + s.E + s.F + ' \\Rightarrow (' + plSJH + ') \\cap (' + plSEF + ') = ' + s.S + s.M + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + s.J + s.H + ' \\subset (' + s.B + s.C + s.E + s.F + ')$ và $' + s.S + s.E + '$ cắt đáy tại $' + s.E + ' \\notin ' + s.J + s.H + '$ nên chéo nhau (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $' + s.B + s.F + ' \\parallel ' + s.C + s.E + '$ nên giao tuyến của $(' + s.S + s.B + s.F + ')$ và $(' + s.S + s.C + s.E + ')$ qua $' + s.S + '$ và song song với $' + s.C + s.E + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kRatio = 1', params: { setIdx: 0, kRatio: 1, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (k=3; S S Đ Đ)', params: { setIdx: 0, kRatio: 3, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Hình chóp đáy hình thang với đường trung bình hình thang GN và trung điểm SB -> Đúng/Sai
  t11_b11_d12_trapezoid_midline_tf: {
    id: 't11_b11_d12_trapezoid_midline_tf',
    name: 'Giao tuyến song song và giao điểm trong hình chóp đáy hình thang (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho hình chóp đáy hình thang đáy lớn AB, G, N, E lần lượt là trung điểm AD, BC, SB. Xét 4 mệnh đề Đúng/Sai.',
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
      if (setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', G: 'G', N: 'N', E: 'E', K: 'K' },
        { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', G: 'M', N: 'P', E: 'Q', K: 'H' },
        { S: 'O', A: 'A', B: 'B', C: 'C', D: 'D', G: 'G', N: 'N', E: 'E', K: 'I' },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const plGNE = s.G + s.N + s.E;

      const tfStatements = [
        {
          key: 'a',
          text: 'Giao tuyến của mặt phẳng $(' + plGNE + ')$ với mặt phẳng $(' + s.S + s.B + s.C + ')$ là $' + (aIs ? s.N + s.E : s.G + s.E) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Giao tuyến của mặt phẳng $(' + s.S + s.A + s.B + ')$ và $(' + s.S + s.C + s.D + ')$ là $' + s.S + 'x$ thỏa mãn song song với $' + (bIs ? s.A + s.B : s.B + s.D) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: cIs
            ? 'Giao tuyến của mặt phẳng $(' + s.S + s.A + s.B + ')$ và $(' + plGNE + ')$ là đường thẳng qua $' + s.E + '$ và song song với $' + s.A + s.B + '$'
            : 'Giao tuyến của mặt phẳng $(' + s.S + s.A + s.B + ')$ và $(' + plGNE + ')$ là $' + s.A + s.N + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.K + '$ là trung điểm của $' + s.S + s.A + '$. Giao điểm của $' + s.N + s.E + '$ và $(' + s.S + s.A + s.D + ')$ là giao điểm của $' + s.N + s.E + '$ và $' + (dIs ? s.G + s.K : s.S + s.K) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.A + s.B + s.C + s.D + '$ có đáy là hình thang đáy lớn $' + s.A + s.B + '$. Gọi $' + s.G + ', ' + s.N + ', ' + s.E + '$ lần lượt là trung điểm của $' + s.A + s.D + ', ' + s.B + s.C + ', ' + s.S + s.B + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { showDiags: 0, isTrapezoid: 1 },
          labels: { apex: s.S, vBL: s.A, vBR: s.B, vFR: s.C, vFL: s.D },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.N + ' \\in ' + s.B + s.C + '$ và $' + s.E + ' \\in ' + s.S + s.B + '$ nên $(' + plGNE + ') \\cap (' + s.S + s.B + s.C + ') = ' + s.N + s.E + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + s.A + s.B + ' \\parallel ' + s.C + s.D + '$ nên $(' + s.S + s.A + s.B + ') \\cap (' + s.S + s.C + s.D + ') = ' + s.S + 'x \\parallel ' + s.A + s.B + ' \\parallel ' + s.C + s.D + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + s.G + s.N + '$ là đường trung bình hình thang nên $' + s.G + s.N + ' \\parallel ' + s.A + s.B + '$, suy ra $(' + s.S + s.A + s.B + ') \\cap (' + plGNE + ') = ' + s.E + 'y \\parallel ' + s.A + s.B + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Giao tuyến trên cắt $' + s.S + s.A + '$ tại trung điểm $' + s.K + '$, suy ra $(' + plGNE + ') \\cap (' + s.S + s.A + s.D + ') = ' + s.G + s.K + '$. Vì $' + s.N + s.E + ' \\parallel ' + s.S + s.C + '$ và $' + s.G + s.K + ' \\parallel ' + s.S + s.D + '$ nên chúng cắt nhau trong $(' + plGNE + ')$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (S S S Đ)', params: { setIdx: 0, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Tứ diện đều cạnh a, trọng tâm, tỉ số BI = 2IC, tính diện tích tam giác BCM -> Đúng/Sai
  t11_b11_d13_regular_tetra_thales_area_tf: {
    id: 't11_b11_d13_regular_tetra_thales_area_tf',
    name: 'Song song theo định lí Thales đảo và diện tích thiết diện tam giác trong tứ diện đều (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho tứ diện đều cạnh a, F trọng tâm tam giác ABD, BI = 2IC, M trung điểm AD. Xét 4 mệnh đề Đúng/Sai kể cả diện tích tam giác BCM.',
    conditionSummary: 'a ∈ [3; 9], setIdx ∈ {0, 1}, tránh mốc làm tròn ,x5 cho diện tích (a^2·√2)/4',
    paramSpecs: [
      { name: 'a', label: 'Độ dài cạnh tứ diện đều a', min: 3, max: 9 },
      { name: 'setIdx', label: 'Bộ tên điểm phụ (0/1)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (a < 3 || a > 9 || (setIdx !== 0 && setIdx !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      const area = (a * a * Math.SQRT2) / 4;
      const scaled = area * 10;
      if (Math.abs((scaled - Math.floor(scaled)) - 0.5) <= 0.02) {
        return { valid: false, reason: 'Diện tích quá sát ngưỡng làm tròn ,x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { F: 'F', I: 'I', M: 'M' },
        { F: 'G', I: 'K', M: 'N' },
      ];
      const p = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const area = (a * a * Math.SQRT2) / 4;
      const areaRound = Math.round(area * 10) / 10;
      const wrongRound = Math.round((area + 1.2) * 10) / 10;
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');

      const tfStatements = [
        {
          key: 'a',
          text: aIs
            ? 'Giao điểm của $B' + p.F + '$ và mặt phẳng $(ACD)$ là điểm $' + p.M + '$'
            : 'Giao điểm của $B' + p.F + '$ và mặt phẳng $(ACD)$ là giao điểm của $B' + p.F + '$ và $CD$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Đường thẳng $' + p.I + p.F + '$ ' + (bIs ? 'song song với' : 'cắt') + ' đường thẳng $C' + p.M + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Đường thẳng $AB$ và $C' + p.M + '$ ' + (cIs ? 'chéo nhau' : 'cắt nhau'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Diện tích tam giác $BC' + p.M + '$ bằng $' + fmt1(dIs ? areaRound : wrongRound) + '$ (kết quả làm tròn đến hàng phần mười)',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho tứ diện $ABCD$ có tất cả các cạnh bằng $' + a + '$. Gọi $' + p.F + '$ là trọng tâm tam giác $ABD$. Gọi $' + p.I + '$ là một điểm trên cạnh $BC$ sao cho $B' + p.I + ' = 2' + p.I + 'C$, $' + p.M + '$ là trung điểm của $AD$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: 'A', vL: 'B', vF: 'C', vR: 'D' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $B' + p.F + ' \\cap AD = ' + p.M + ' \\Rightarrow B' + p.F + ' \\cap (ACD) = ' + p.M + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Ta có $\\frac{B' + p.F + '}{B' + p.M + '} = \\frac{B' + p.I + '}{BC} = \\frac{2}{3} \\Rightarrow ' + p.I + p.F + ' \\parallel C' + p.M + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $AB$ và $C' + p.M + '$ không đồng phẳng nên chéo nhau (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $BC = ' + a + '$, $B' + p.M + ' = C' + p.M + ' = \\frac{' + a + '\\sqrt{3}}{2}$, suy ra đường cao hạ từ $' + p.M + '$ là $h = \\frac{' + a + '\\sqrt{2}}{2}$, nên $S_{\\triangle BC' + p.M + '} = \\frac{' + (a * a) + '\\sqrt{2}}{4} \\approx ' + fmt1(areaRound) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh a = 0', params: { a: 0, setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (a=4 -> S≈5,7; S Đ Đ Đ)', params: { a: 4, setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Thiết diện hình bình hành EHFG trong tứ diện ABCD -> Đúng/Sai
  t11_b11_d14_tetra_parallelogram_section_tf: {
    id: 't11_b11_d14_tetra_parallelogram_section_tf',
    name: 'Mặt phẳng song song cạnh đối và điều kiện thiết diện là hình bình hành trong tứ diện (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho tứ diện ABCD với E, H là trung điểm BC, BD và thiết diện EHFG. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], kWrong ∈ {3, 4}, aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên 4 điểm thiết diện (0..2)', min: 0, max: 2 },
      { name: 'kWrong', label: 'Mẫu số sai ở ý c (3 hoặc 4)', min: 3, max: 4 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, kWrong, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2 || (kWrong !== 3 && kWrong !== 4)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, kWrong, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { E: 'E', H: 'H', G: 'G', F: 'F' },
        { E: 'M', H: 'N', G: 'P', F: 'Q' },
        { E: 'I', H: 'K', G: 'M', F: 'N' },
      ];
      const p = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const quad = p.E + p.H + p.F + p.G;

      const tfStatements = [
        {
          key: 'a',
          text: 'Đường thẳng $B' + p.G + '$ và đường thẳng $' + p.H + p.F + '$ ' + (aIs ? 'chéo nhau' : 'song song'),
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Đường thẳng $' + p.G + p.F + '$ và đường thẳng $CD$ ' + (bIs ? 'song song' : 'chéo nhau'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$' + p.E + p.H + ' \\parallel CD$ và $' + p.E + p.H + ' = \\frac{1}{' + (cIs ? 2 : kWrong) + '}CD$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: dIs
            ? 'Để tứ giác $' + quad + '$ là hình bình hành thì $' + p.G + '$ là trung điểm của đoạn $AC$'
            : 'Để tứ giác $' + quad + '$ là hình bình hành thì $A' + p.G + ' = 2' + p.G + 'C$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho tứ diện $ABCD$ có $' + p.E + ', ' + p.H + '$ theo thứ tự là trung điểm của các cạnh $BC, BD$. Gọi $(P)$ là mặt phẳng qua $' + p.E + ', ' + p.H + '$ và cắt các cạnh $AC, AD$ lần lượt tại hai điểm $' + p.G + ', ' + p.F + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 0, midEdge: 0 },
          labels: { apex: 'A', vL: 'B', vF: 'C', vR: 'D' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $B' + p.G + ' \\subset (ABC)$ và $' + p.H + p.F + '$ cắt $(ABC)$ ngoài $B' + p.G + '$ nên chéo nhau (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + p.E + p.H + ' \\parallel CD$, mặt phẳng $(P)$ chứa $' + p.E + p.H + '$ cắt $(ACD)$ theo giao tuyến $' + p.G + p.F + ' \\parallel ' + p.E + p.H + ' \\parallel CD$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + p.E + p.H + '$ là đường trung bình $\\triangle BCD$ nên $' + p.E + p.H + ' \\parallel CD$ và $' + p.E + p.H + ' = \\frac{1}{2}CD$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Để hình thang $' + quad + '$ là hình bình hành cần $' + p.G + p.F + ' = ' + p.E + p.H + ' = \\frac{1}{2}CD$, tức $' + p.G + '$ là trung điểm của $AC$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kWrong = 2 (trùng đáp án đúng)', params: { setIdx: 0, kWrong: 2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (Đ S S Đ)', params: { setIdx: 0, kWrong: 3, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },
};
