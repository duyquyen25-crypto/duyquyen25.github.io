import { MathTemplate } from '../types/math';

export const G11_B13_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D09 (Q9): Hình chóp đáy hình thang, tìm tỉ số đáy x = AD/BC để (CMN) // (SAB)
  t11_b13_d09_trapezoid_parallel_planes_ratio_sa: {
    id: 't11_b13_d09_trapezoid_parallel_planes_ratio_sa',
    name: 'Tìm tỉ số hai đáy hình thang để thiết diện song song mặt bên hình chóp (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Cho hình chóp đáy hình thang S.ABCD (AD // BC, AD = x·BC), điểm M ∈ AD, N ∈ SD thỏa AM/AD = SN/SD = p/q. Tìm x để (CMN) // (SAB).',
    conditionSummary: 'setIdx ∈ [0; 2], q ∈ [3; 9], p ∈ [1; q-1], gcd(p, q) = 1, tránh điểm giữa .x5',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..2)', min: 0, max: 2 },
      { name: 'p', label: 'Tử số tỉ lệ p', min: 1, max: 8 },
      { name: 'q', label: 'Mẫu số tỉ lệ q', min: 3, max: 9 },
    ],
    validateCode: `
      const { setIdx, p, q } = params;
      if (setIdx < 0 || setIdx > 2 || q < 3 || q > 9 || p < 1 || p >= q) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (u.gcd(p, q) !== 1) {
        return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      }
      // Tránh đuôi .x5 ở hàng phần trăm khi làm tròn đến hàng phần mười
      if ((20 * q) % (2 * p) === p) {
        return { valid: false, reason: 'Tránh giá trị kết thúc bằng .x5 khi làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, p, q } = params;
      const SETS = [
        { S: 'S', A: 'A', B: 'B', C: 'C', D: 'D', M: 'M', N: 'N' },
        { S: 'S', A: 'M', B: 'N', C: 'P', D: 'Q', M: 'E', N: 'F' },
        { S: 'O', A: 'A', B: 'B', C: 'C', D: 'D', M: 'I', N: 'J' },
      ];
      const s = SETS[setIdx];

      const ratioFrac = u.simplifyFrac(p, q);
      const ansFrac = u.simplifyFrac(q, p);
      const rounded = Math.round(ansFrac.value * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const plCMN = s.C + s.M + s.N;
      const plSAB = s.S + s.A + s.B;

      return {
        stem: 'Cho hình chóp $' + s.S + '.' + s.A + s.B + s.C + s.D + '$ có đáy là hình thang, $' + s.A + s.D + ' \\parallel ' + s.B + s.C + ',\\; ' + s.A + s.D + ' = x\\,' + s.B + s.C + '$. Gọi $' + s.M + ', ' + s.N + '$ là hai điểm nằm trên $' + s.A + s.D + ', ' + s.S + s.D + '$ thỏa mãn $\\dfrac{' + s.A + s.M + '}{' + s.A + s.D + '} = \\dfrac{' + s.S + s.N + '}{' + s.S + s.D + '} = ' + ratioFrac.latex + '$. Tìm $x$ để $(' + plCMN + ') \\parallel (' + plSAB + ')$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { isTrapezoid: 1, showDiags: 0 },
          labels: { apex: s.S, vBL: s.A, vBR: s.D, vFR: s.C, vFL: s.B },
        },
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $\\dfrac{' + s.D + s.M + '}{' + s.D + s.A + '} = 1 - \\dfrac{' + s.A + s.M + '}{' + s.A + s.D + '} = 1 - \\dfrac{' + s.S + s.N + '}{' + s.S + s.D + '} = \\dfrac{' + s.D + s.N + '}{' + s.D + s.S + '}$ nên theo định lí Thalès đảo trong $\\triangle ' + s.S + s.A + s.D + '$, ta có $' + s.M + s.N + ' \\parallel ' + s.S + s.A + ' \\Rightarrow ' + s.M + s.N + ' \\parallel (' + plSAB + ')$.',
          'Để $(' + plCMN + ') \\parallel (' + plSAB + ')$ thì điều kiện cần và đủ là $' + s.C + s.M + ' \\parallel ' + s.A + s.B + '$ (khi đó $' + s.C + s.M + ' \\parallel (' + plSAB + ')$).',
          'Vì $' + s.A + s.M + ' \\parallel ' + s.B + s.C + '$ và $' + s.C + s.M + ' \\parallel ' + s.A + s.B + '$ nên $' + s.A + s.B + s.C + s.M + '$ là hình bình hành, suy ra $' + s.A + s.M + ' = ' + s.B + s.C + '$.',
          'Do đó $\\dfrac{' + s.B + s.C + '}{' + s.A + s.D + '} = \\dfrac{' + s.A + s.M + '}{' + s.A + s.D + '} = ' + ratioFrac.latex + ' \\Rightarrow \\dfrac{1}{x} = ' + ratioFrac.latex + ' \\Rightarrow x = ' + ansFrac.latex + (ansFrac.value === rounded ? (ansFrac.isInteger ? '' : ' = ' + shortAns) : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p/q chưa tối giản (p=2, q=4)', params: { setIdx: 0, p: 2, q: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (p=2, q=5 -> x = 2,5)', params: { setIdx: 0, p: 2, q: 5 }, expectedValid: true },
    ],
  },
};
