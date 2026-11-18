import { MathTemplate } from '../types/math';

export const G11_B10_ES_TEMPLATES: Record<string, MathTemplate> = {
  // D12 (Q12): Tìm giao tuyến hai mặt phẳng trong hình chóp đáy hình bình hành (Tự luận)
  t11_b10_d12_para_pyramid_plane_intersection_es: {
    id: 't11_b10_d12_para_pyramid_plane_intersection_es',
    name: 'Tìm giao tuyến mặt phẳng qua hai điểm phụ với mặt bên hình chóp đáy hình bình hành (Tự luận)',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho hình chóp đáy hình bình hành, E thuộc cạnh bên SB sao cho SE = (1/k)SB, H là trung điểm một cạnh đáy. Tìm giao tuyến hai mặt phẳng.',
    conditionSummary: 'setIdx ∈ [0; 2], kDen ∈ [2; 4], sideOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên điểm (0..2)', min: 0, max: 2 },
      { name: 'kDen', label: 'Mẫu tỉ lệ SE = (1/k)SB (2..4)', min: 2, max: 4 },
      { name: 'sideOpt', label: 'Cặp mặt phẳng (0: (CEH)∩(SAB), 1: (AEH)∩(SBC))', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, kDen, sideOpt } = params;
      if (setIdx < 0 || setIdx > 2 || kDen < 2 || kDen > 4 || (sideOpt !== 0 && sideOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, kDen, sideOpt } = params;
      const SETS = [
        { apex: 'S', A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', H: 'H', O: 'O' },
        { apex: 'S', A: 'A', B: 'B', C: 'C', D: 'D', E: 'M', H: 'N', O: 'I' },
        { apex: 'O', A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', H: 'K', O: 'H' },
      ];
      const s = SETS[setIdx];

      const planeMain = sideOpt === 0 ? s.C + s.E + s.H : s.A + s.E + s.H;
      const faceTarget = sideOpt === 0 ? s.apex + s.A + s.B : s.apex + s.B + s.C;
      const edgeH = sideOpt === 0 ? s.A + s.D : s.C + s.D;
      const lineBase1 = sideOpt === 0 ? s.C + s.H : s.A + s.H;
      const lineBase2 = sideOpt === 0 ? s.A + s.B : s.B + s.C;
      const resultLine = s.E + s.O;

      return {
        stem: 'Cho hình chóp $' + s.apex + '.' + s.A + s.B + s.C + s.D + '$ có đáy là hình bình hành. Gọi $' + s.E + '$ là điểm thuộc cạnh $' + s.apex + s.B + '$ sao cho $' + s.apex + s.E + ' = \\frac{1}{' + kDen + '}' + s.apex + s.B + '$. Gọi $' + s.H + '$ là trung điểm của cạnh $' + edgeH + '$. Tìm giao tuyến của hai mặt phẳng $(' + planeMain + ')$ và $(' + faceTarget + ')$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 0, showSecant: sideOpt === 0 ? 1 : 0, tE: 1 / kDen },
          labels: { apex: s.apex, vBL: s.A, vBR: s.B, vFR: s.C, vFL: s.D, ptE: s.E, ptH: s.H },
        },
        rubric: [
          { description: 'Chỉ ra điểm chung thứ nhất ' + s.E + ' ∈ ' + s.apex + s.B + ' ⊂ (' + faceTarget + ')', points: 0.3 },
          { description: 'Trong (' + s.A + s.B + s.C + s.D + '), gọi ' + s.O + ' = ' + lineBase1 + ' ∩ ' + lineBase2 + ' và chứng minh ' + s.O + ' là điểm chung thứ hai', points: 0.4 },
          { description: 'Kết luận giao tuyến (' + planeMain + ') ∩ (' + faceTarget + ') = ' + resultLine, points: 0.3 },
        ],
        answerSummary: '$(' + planeMain + ') \\cap (' + faceTarget + ') = ' + resultLine + '$',
        solutionSteps: [
          'Ta có $' + s.E + ' \\in ' + s.apex + s.B + ' \\subset (' + faceTarget + ')$ và $' + s.E + ' \\in (' + planeMain + ') \\Rightarrow ' + s.E + ' \\in (' + planeMain + ') \\cap (' + faceTarget + ')$.',
          'Trong mặt phẳng $(' + s.A + s.B + s.C + s.D + ')$, vì $' + s.H + '$ là trung điểm của $' + edgeH + '$ nên $' + lineBase1 + '$ cắt $' + lineBase2 + '$ tại điểm $' + s.O + '$.',
          'Suy ra $' + s.O + ' \\in (' + planeMain + ') \\cap (' + faceTarget + ')$.',
          'Vậy $(' + planeMain + ') \\cap (' + faceTarget + ') = ' + resultLine + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kDen = 1', params: { setIdx: 0, kDen: 1, sideOpt: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (S.ABCD, E trung điểm SB, H trung điểm AD -> EO)', params: { setIdx: 0, kDen: 2, sideOpt: 0 }, expectedValid: true },
    ],
  },
};
