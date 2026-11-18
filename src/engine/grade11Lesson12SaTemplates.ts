import { MathTemplate } from '../types/math';

export const G11_B12_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D09 (Q9): Mặt phẳng qua điểm chia cạnh đáy BE song song SE và BF cắt SF tại Q -> Tính FQ/SQ
  t11_b12_d09_square_pyramid_parallel_plane_ratio_sa: {
    id: 't11_b12_d09_square_pyramid_parallel_plane_ratio_sa',
    name: 'Tính tỉ số đoạn thẳng khi cắt hình chóp bởi mặt phẳng song song hai đường thẳng (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho hình chóp đáy hình vuông S.ABEF, điểm N ∈ BE với BN = (p/q)BE. Mặt phẳng (α) qua N song song SE và BF cắt SF tại Q. Tính FQ/SQ.',
    conditionSummary: 'setIdx ∈ [0; 2], q ∈ [3; 8], p ∈ [1; q-1], gcd(p, q) = 1, tránh điểm giữa .x5',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..2)', min: 0, max: 2 },
      { name: 'p', label: 'Tử số tỉ lệ p', min: 1, max: 7 },
      { name: 'q', label: 'Mẫu số tỉ lệ q', min: 3, max: 8 },
    ],
    validateCode: `
      const { setIdx, p, q } = params;
      if (setIdx < 0 || setIdx > 2 || q < 3 || q > 8 || p < 1 || p >= q) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (u.gcd(p, q) !== 1) {
        return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      }
      const den = q - p;
      // Tránh kết quả đúng dạng .x5 gây nhập nhằng làm tròn
      if ((20 * p) % (2 * den) === den) {
        return { valid: false, reason: 'Tránh giá trị kết thúc bằng .x5 khi làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, p, q } = params;
      const SETS = [
        { S: 'S', A: 'A', B: 'B', E: 'E', F: 'F', N: 'N', Q: 'Q', G: 'G', pl: '\\alpha' },
        { S: 'S', A: 'A', B: 'B', E: 'C', F: 'D', N: 'M', Q: 'P', G: 'K', pl: '\\beta' },
        { S: 'S', A: 'M', B: 'N', E: 'P', F: 'Q', N: 'I', Q: 'K', G: 'H', pl: 'P' },
      ];
      const s = SETS[setIdx];

      const ratioFrac = u.simplifyFrac(p, q);
      const compFrac = u.simplifyFrac(q - p, q);
      const ansFrac = u.simplifyFrac(p, q - p);
      const rounded = Math.round(ansFrac.value * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const stemRatioLatex = ratioFrac.latex;

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.A + s.B + s.E + s.F + '$ có đáy là hình vuông. Gọi $' + s.N + '$ là điểm thuộc cạnh $' + s.B + s.E + '$ sao cho $' + s.B + s.N + ' = ' + stemRatioLatex + s.B + s.E + '$. Mặt phẳng $(' + s.pl + ')$ qua $' + s.N + '$ và song song với các đường thẳng $' + s.S + s.E + '$ và $' + s.B + s.F + '$. Mặt phẳng $(' + s.pl + ')$ cắt $' + s.S + s.F + '$ tại điểm $' + s.Q + '$. Tính tỉ số $T = \\dfrac{' + s.F + s.Q + '}{' + s.S + s.Q + '}$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 0 },
          labels: { apex: s.S, vBL: s.A, vBR: s.B, vFR: s.E, vFL: s.F },
        },
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Trong mặt phẳng đáy $(' + s.A + s.B + s.E + s.F + ')$, qua $' + s.N + '$ dựng $' + s.N + s.G + ' \\parallel ' + s.B + s.F + '$ với $' + s.G + ' \\in ' + s.E + s.F + '$. Vì $(' + s.pl + ') \\parallel ' + s.B + s.F + '$ nên $' + s.N + s.G + ' \\subset (' + s.pl + ')$.',
          'Trong mặt phẳng $(' + s.S + s.E + s.F + ')$, qua $' + s.G + '$ dựng $' + s.G + s.Q + ' \\parallel ' + s.S + s.E + '$ với $' + s.Q + ' \\in ' + s.S + s.F + '$. Vì $(' + s.pl + ') \\parallel ' + s.S + s.E + '$ nên $' + s.G + s.Q + ' = (' + s.pl + ') \\cap (' + s.S + s.E + s.F + ')$.',
          'Ta có $' + s.N + s.E + ' = ' + s.B + s.E + ' - ' + s.B + s.N + ' = ' + compFrac.latex + s.B + s.E + '$. Theo định lí Thalès trong $\\triangle ' + s.E + s.B + s.F + '$ và $\\triangle ' + s.S + s.E + s.F + '$, ta được: $T = \\dfrac{' + s.F + s.Q + '}{' + s.S + s.Q + '} = \\dfrac{' + s.F + s.G + '}{' + s.E + s.G + '} = \\dfrac{' + s.B + s.N + '}{' + s.N + s.E + '} = ' + ansFrac.latex + (ansFrac.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p/q chưa tối giản (p=2, q=4)', params: { setIdx: 0, p: 2, q: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (BN = 2/3 BE -> T = 2)', params: { setIdx: 0, p: 2, q: 3 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Mặt phẳng qua M ∈ AD song song SA và BD cắt SB tại N -> Tính SN/SB
  t11_b12_d10_square_pyramid_parallel_section_ratio_sa: {
    id: 't11_b12_d10_square_pyramid_parallel_section_ratio_sa',
    name: 'Tính tỉ số SN/SB của giao điểm với mặt phẳng song song đường chéo đáy và cạnh bên (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Cho hình chóp đáy hình vuông S.ABCD, điểm M ∈ AD thỏa tỉ lệ AM = k·MD hoặc MD = k·AM. Mặt phẳng (β) qua M song song SA và BD cắt SB tại N. Tính tỉ số SN/SB.',
    conditionSummary: 'setIdx ∈ [0; 2], k ∈ [2; 8] \\ {3}, mode ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..2)', min: 0, max: 2 },
      { name: 'k', label: 'Hệ số tỉ lệ k (2..8, khác 3)', min: 2, max: 8 },
      { name: 'mode', label: 'Dạng tỉ lệ (0: AM=k·MD, 1: MD=k·AM)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, k, mode } = params;
      if (setIdx < 0 || setIdx > 2 || k < 2 || k > 8 || k === 3 || (mode !== 0 && mode !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc k=3 tạo đuôi .25/.75' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, k, mode } = params;
      const SETS = [
        { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', M: 'M', N: 'N', P: 'P', pl: '\\beta' },
        { S: 'S', A: 'A', B: 'B', E: 'C', F: 'D', C: 'C', D: 'D', M: 'E', N: 'F', P: 'K', pl: '\\alpha' },
        { S: 'O', A: 'A', B: 'B', C: 'C', D: 'D', M: 'I', N: 'J', P: 'H', pl: 'P' },
      ];
      const s = SETS[setIdx];

      const num = mode === 0 ? k : 1;
      const den = k + 1;
      const ansFrac = u.simplifyFrac(num, den);
      const rounded = Math.round(ansFrac.value * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const condText = mode === 0
        ? '$' + s.A + s.M + ' = ' + k + s.M + s.D + '$'
        : '$' + s.M + s.D + ' = ' + k + s.A + s.M + '$';

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.A + s.B + s.C + s.D + '$ có đáy là hình vuông. Gọi $' + s.M + '$ là điểm thuộc cạnh $' + s.A + s.D + '$ sao cho ' + condText + '. Mặt phẳng $(' + s.pl + ')$ qua $' + s.M + '$ và song song với các đường thẳng $' + s.S + s.A + '$ và $' + s.B + s.D + '$. Mặt phẳng $(' + s.pl + ')$ cắt $' + s.S + s.B + '$ tại điểm $' + s.N + '$. Tính tỉ số $T = \\dfrac{' + s.S + s.N + '}{' + s.S + s.B + '}$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 0 },
          labels: { apex: s.S, vBL: s.A, vBR: s.B, vFR: s.C, vFL: s.D },
        },
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Trong mặt phẳng $(' + s.A + s.B + s.C + s.D + ')$, qua $' + s.M + '$ dựng $' + s.M + s.P + ' \\parallel ' + s.B + s.D + '$ với $' + s.P + ' \\in ' + s.A + s.B + '$. Vì $(' + s.pl + ') \\parallel ' + s.B + s.D + '$ nên $' + s.M + s.P + ' \\subset (' + s.pl + ')$.',
          'Trong mặt phẳng $(' + s.S + s.A + s.B + ')$, qua $' + s.P + '$ dựng $' + s.P + s.N + ' \\parallel ' + s.S + s.A + '$ với $' + s.N + ' \\in ' + s.S + s.B + '$. Vì $(' + s.pl + ') \\parallel ' + s.S + s.A + '$ nên $' + s.N + ' = (' + s.pl + ') \\cap ' + s.S + s.B + '$.',
          'Từ ' + condText + ' suy ra $\\dfrac{' + s.A + s.M + '}{' + s.A + s.D + '} = ' + ansFrac.latex + '$. Theo định lí Thalès trong $\\triangle ' + s.A + s.B + s.D + '$ và $\\triangle ' + s.S + s.A + s.B + '$, ta có: $T = \\dfrac{' + s.S + s.N + '}{' + s.S + s.B + '} = \\dfrac{' + s.A + s.P + '}{' + s.A + s.B + '} = \\dfrac{' + s.A + s.M + '}{' + s.A + s.D + '} = ' + ansFrac.latex + (ansFrac.value === rounded ? (ansFrac.isInteger ? '' : ' = ' + shortAns) : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 3 (tỉ lệ 1/4 = 0,25)', params: { setIdx: 0, k: 3, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (AM = 4MD -> T = 0,8)', params: { setIdx: 0, k: 4, mode: 0 }, expectedValid: true },
      { label: 'Biến thể MD = 4AM -> T = 0,2', params: { setIdx: 0, k: 4, mode: 1 }, expectedValid: true },
    ],
  },
};
