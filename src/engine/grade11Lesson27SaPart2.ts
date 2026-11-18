import { MathTemplate } from '../types/math';

export const G11_B27_SA_PART2: Record<string, MathTemplate> = {
  // D40 (Q40): Chóp tứ giác đều S.ABCD biết SA = l và góc (SA, đáy) = α -> V
  t11_b27_d40_reg_sq_pyr_sa_angle_sa: {
    id: 't11_b27_d40_reg_sq_pyr_sa_angle_sa',
    name: 'Thể tích chóp tứ giác đều biết cạnh bên SA và góc với đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp tứ giác đều S.ABCD có góc giữa cạnh bên SA và (ABCD) bằng α, SA = l. Tính thể tích V.',
    conditionSummary: 'l ∈ [2; 12], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'l', label: 'Cạnh bên SA = l', min: 2, max: 12 },
      { name: 'degIdx', label: 'Góc giữa SA và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { l, degIdx } = params;
      if (l < 2 || l > 12 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const radA = [30, 45, 60][degIdx] * Math.PI / 180;
      const vol = (2 * l * l * l * Math.sin(radA) * Math.cos(radA) * Math.cos(radA)) / 3;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { l, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const radA = alphaDeg * Math.PI / 180;
      const vol = (2 * l * l * l * Math.sin(radA) * Math.cos(radA) * Math.cos(radA)) / 3;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp tứ giác đều $S.ABCD$ có góc giữa cạnh bên $SA$ và mặt phẳng $(ABCD)$ bằng $' + alphaDeg + '^\\circ$, $SA = ' + l + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B', center: 'O' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $O$ là tâm hình vuông $ABCD \\Rightarrow SO = SA \\sin ' + alphaDeg + '^\\circ$, $AO = SA \\cos ' + alphaDeg + '^\\circ$.',
          'Cạnh đáy $AB = AO\\sqrt{2} \\Rightarrow S_{ABCD} = 2 AO^2$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABCD} \\cdot SO = \\dfrac{2}{3} l^3 \\sin ' + alphaDeg + '^\\circ \\cos^2 ' + alphaDeg + '^\\circ \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên l = 1', params: { l: 1, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40 (49,5)', params: { l: 7, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D41 (Q41): Chóp tứ giác đều S.ABCD có tất cả các cạnh bằng u
  t11_b27_d41_reg_sq_pyr_all_equal_sa: {
    id: 't11_b27_d41_reg_sq_pyr_all_equal_sa',
    name: 'Thể tích chóp tứ giác đều có tất cả các cạnh bằng u (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho chóp tứ giác đều S.ABCD có tất cả các cạnh đều bằng u. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 12]',
    paramSpecs: [
      { name: 'u', label: 'Độ dài tất cả các cạnh u', min: 2, max: 12 },
    ],
    validateCode: `
      const { u: edge } = params;
      if (edge < 2 || edge > 12) return { valid: false, reason: 'u ngoài miền [2; 12]' };
      const vol = (edge * edge * edge * Math.SQRT2) / 6;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge } = params;
      const vol = (edge * edge * edge * Math.SQRT2) / 6;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp tứ giác đều $S.ABCD$ có tất cả các cạnh đều bằng $' + edge + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B', center: 'O' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $O$ là tâm hình vuông $ABCD \\Rightarrow OA = \\dfrac{' + edge + '\\sqrt{2}}{2}$, $SO = \\sqrt{SA^2 - OA^2} = \\dfrac{' + edge + '\\sqrt{2}}{2}$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} \\cdot ' + (edge * edge) + ' \\cdot \\dfrac{' + edge + '\\sqrt{2}}{2} = \\dfrac{' + (edge * edge * edge) + '\\sqrt{2}}{6} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41 (50,9)', params: { u: 6 }, expectedValid: true },
    ],
  },

  // D42 (Q42): Chóp S.ABCD đáy hình thang vuông tại A và D, SA ⊥ (ABCD), góc (SC, đáy) = α -> V
  t11_b27_d42_trap_pyr_vol_sa: {
    id: 't11_b27_d42_trap_pyr_vol_sa',
    name: 'Thể tích khối chóp đáy hình thang vuông biết góc (SC, đáy) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy hình thang vuông tại A và D, SA ⊥ (ABCD), AB = b₁, AD = hd, DC = b₂, góc giữa SC và đáy bằng α. Tính thể tích V.',
    conditionSummary: 'b1 ∈ [3; 9], hd ∈ [3; 9], b2 ∈ [2; 8], b1 > b2, degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'b1', label: 'Đáy lớn AB = b1', min: 3, max: 9 },
      { name: 'hd', label: 'Chiều cao đáy AD = hd', min: 3, max: 9 },
      { name: 'b2', label: 'Đáy nhỏ DC = b2', min: 2, max: 8 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { b1, hd, b2, degIdx } = params;
      if (b1 < 3 || b1 > 9 || hd < 3 || hd > 9 || b2 < 2 || b2 > 8 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (b1 <= b2) return { valid: false, reason: 'Cần AB > DC' };
      const tanA = Math.tan([30, 45, 60][degIdx] * Math.PI / 180);
      const ac = Math.sqrt(hd * hd + b2 * b2);
      const sa = ac * tanA;
      const area = ((b1 + b2) * hd) / 2;
      const vol = (area * sa) / 3;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b1, hd, b2, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const tanA = Math.tan(alphaDeg * Math.PI / 180);
      const ac = Math.sqrt(hd * hd + b2 * b2);
      const sa = ac * tanA;
      const area = ((b1 + b2) * hd) / 2;
      const vol = (area * sa) / 3;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thang vuông tại $A$ và $D$, $SA \\perp (ABCD)$. Biết $AB = ' + b1 + '$, $AD = ' + hd + '$, $DC = ' + b2 + '$, góc giữa $SC$ và mặt phẳng $(ABCD)$ bằng $' + alphaDeg + '^\\circ$. Tính thể tích khối chóp $S.ABCD$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { isTrapezoid: 1 },
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Góc giữa $SC$ và $(ABCD)$ là $\\widehat{SCA} = ' + alphaDeg + '^\\circ$.',
          'Trong $\\triangle ADC$ vuông tại $D$: $AC = \\sqrt{AD^2 + DC^2} = \\sqrt{' + (hd * hd + b2 * b2) + '} \\Rightarrow SA = AC \\tan ' + alphaDeg + '^\\circ$.',
          'Diện tích hình thang: $S_{ABCD} = \\dfrac{(AB + DC) \\cdot AD}{2} = ' + u.formatNumberVN(area, 1) + ' \\Rightarrow V = \\dfrac{1}{3} S_{ABCD} \\cdot SA \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b1 ≤ b2 (b1=4, b2=4)', params: { b1: 4, hd: 6, b2: 4, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42 (112,4)', params: { b1: 5, hd: 6, b2: 4, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D43 (Q43): Thể tích hình chóp cụt tam giác đều (làm tròn hàng đơn vị)
  t11_b27_d43_frustum_tri_vol_sa: {
    id: 't11_b27_d43_frustum_tri_vol_sa',
    name: 'Thể tích khối chóp cụt tam giác đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho hình chóp cụt đều ABC.A\'B\'C\' cạnh đáy lớn a₁, cạnh đáy nhỏ a₂, chiều cao h. Tính thể tích V.',
    conditionSummary: 'a1 ∈ [3; 10], a2 ∈ [1; 8], a1 > a2, h ∈ [2; 9]',
    paramSpecs: [
      { name: 'a1', label: 'Cạnh đáy lớn a₁', min: 3, max: 10 },
      { name: 'a2', label: 'Cạnh đáy nhỏ a₂', min: 1, max: 8 },
      { name: 'h', label: 'Chiều cao h', min: 2, max: 9 },
    ],
    validateCode: `
      const { a1, a2, h } = params;
      if (a1 < 3 || a1 > 10 || a2 < 1 || a2 > 8 || h < 2 || h > 9 || a1 <= a2) {
        return { valid: false, reason: 'Cần cạnh đáy lớn a₁ > a₂' };
      }
      const vol = (h * Math.sqrt(3) * (a1 * a1 + a2 * a2 + a1 * a2)) / 12;
      const frac = vol - Math.floor(vol);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, h } = params;
      const vol = (h * Math.sqrt(3) * (a1 * a1 + a2 * a2 + a1 * a2)) / 12;
      const numVal = Math.round(vol);
      const ansStr = String(numVal);

      return {
        stem: "Cho hình chóp cụt đều $ABC.A'B'C'$ có cạnh đáy lớn $ABC$ bằng $" + a1 + "$, cạnh đáy nhỏ $A'B'C'$ bằng $" + a2 + "$, chiều cao bằng $" + h + "$. Tính thể tích khối chóp cụt đã cho (kết quả làm tròn đến hàng đơn vị).",
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Diện tích đáy lớn: $S_1 = \\dfrac{' + a1 + '^2\\sqrt{3}}{4}$; diện tích đáy nhỏ: $S_2 = \\dfrac{' + a2 + '^2\\sqrt{3}}{4}$.',
          'Thể tích khối chóp cụt đều: $V = \\dfrac{1}{3} h\\left(S_1 + S_2 + \\sqrt{S_1 S_2}\\right) = \\dfrac{' + h + '\\sqrt{3}}{12}(' + a1 + '^2 + ' + a2 + '^2 + ' + (a1 * a2) + ') \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a1 ≤ a2 (a1=3, a2=3)', params: { a1: 3, a2: 3, h: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43 (11)', params: { a1: 4, a2: 3, h: 2 }, expectedValid: true },
    ],
  },

  // D44 (Q44): Thể tích hình chóp cụt tứ giác đều (làm tròn hàng đơn vị)
  t11_b27_d44_frustum_sq_vol_sa: {
    id: 't11_b27_d44_frustum_sq_vol_sa',
    name: 'Thể tích khối chóp cụt tứ giác đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho hình chóp cụt đều có hai đáy là hình vuông cạnh a₁, a₂ và chiều cao h. Tính thể tích V.',
    conditionSummary: 'a1 ∈ [3; 10], a2 ∈ [1; 8], a1 > a2, h ∈ [2; 12]',
    paramSpecs: [
      { name: 'a1', label: 'Cạnh đáy lớn a₁', min: 3, max: 10 },
      { name: 'a2', label: 'Cạnh đáy nhỏ a₂', min: 1, max: 8 },
      { name: 'h', label: 'Chiều cao h', min: 2, max: 12 },
    ],
    validateCode: `
      const { a1, a2, h } = params;
      if (a1 < 3 || a1 > 10 || a2 < 1 || a2 > 8 || h < 2 || h > 12 || a1 <= a2) {
        return { valid: false, reason: 'Cần cạnh đáy lớn a₁ > a₂' };
      }
      const vol = (h * (a1 * a1 + a2 * a2 + a1 * a2)) / 3;
      const frac = vol - Math.floor(vol);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, h } = params;
      const s1 = a1 * a1, s2 = a2 * a2, sm = a1 * a2;
      const vol = (h * (s1 + s2 + sm)) / 3;
      const numVal = Math.round(vol);
      const ansStr = String(numVal);

      return {
        stem: 'Cho hình chóp cụt đều có hai đáy là các hình vuông, cạnh đáy lớn bằng $' + a1 + '$, cạnh đáy nhỏ bằng $' + a2 + '$, chiều cao bằng $' + h + '$. Tính thể tích khối chóp cụt đã cho (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Diện tích hai đáy: $S_1 = ' + s1 + '$, $S_2 = ' + s2 + '$, $\\sqrt{S_1 S_2} = ' + sm + '$.',
          'Thể tích khối chóp cụt đều: $V = \\dfrac{1}{3} \\cdot ' + h + ' (' + s1 + ' + ' + s2 + ' + ' + sm + ') \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a1 ≤ a2 (a1=4, a2=5)', params: { a1: 4, a2: 5, h: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44 (117)', params: { a1: 5, a2: 2, h: 9 }, expectedValid: true },
    ],
  },

  // D45 (Q45): Thể tích hình chóp cụt lục giác đều (làm tròn hàng đơn vị)
  t11_b27_d45_frustum_hex_vol_sa: {
    id: 't11_b27_d45_frustum_hex_vol_sa',
    name: 'Thể tích khối chóp cụt lục giác đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho hình chóp cụt đều có hai đáy là các hình lục giác đều cạnh a₁, a₂ và chiều cao h. Tính thể tích V.',
    conditionSummary: 'a1 ∈ [3; 10], a2 ∈ [1; 8], a1 > a2, h ∈ [2; 10]',
    paramSpecs: [
      { name: 'a1', label: 'Cạnh đáy lớn a₁', min: 3, max: 10 },
      { name: 'a2', label: 'Cạnh đáy nhỏ a₂', min: 1, max: 8 },
      { name: 'h', label: 'Chiều cao h', min: 2, max: 10 },
    ],
    validateCode: `
      const { a1, a2, h } = params;
      if (a1 < 3 || a1 > 10 || a2 < 1 || a2 > 8 || h < 2 || h > 10 || a1 <= a2) {
        return { valid: false, reason: 'Cần cạnh đáy lớn a₁ > a₂' };
      }
      const vol = (h * Math.sqrt(3) * (a1 * a1 + a2 * a2 + a1 * a2)) / 2;
      const frac = vol - Math.floor(vol);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, h } = params;
      const sumSq = a1 * a1 + a2 * a2 + a1 * a2;
      const vol = (h * Math.sqrt(3) * sumSq) / 2;
      const numVal = Math.round(vol);
      const ansStr = String(numVal);

      return {
        stem: 'Cho hình chóp cụt đều có hai đáy là các hình lục giác đều, cạnh đáy lớn bằng $' + a1 + '$, cạnh đáy nhỏ bằng $' + a2 + '$, chiều cao bằng $' + h + '$. Tính thể tích khối chóp cụt đã cho (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Diện tích đáy lớn $S_1 = \\dfrac{3\\sqrt{3}}{2}\\cdot ' + a1 + '^2$, diện tích đáy nhỏ $S_2 = \\dfrac{3\\sqrt{3}}{2}\\cdot ' + a2 + '^2$.',
          'Thể tích khối chóp cụt: $V = \\dfrac{1}{3} h\\left(S_1 + S_2 + \\sqrt{S_1 S_2}\\right) = \\dfrac{' + (h * sumSq) + '\\sqrt{3}}{2} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a1 ≤ a2 (a1=5, a2=6)', params: { a1: 5, a2: 6, h: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45 (770)', params: { a1: 7, a2: 6, h: 7 }, expectedValid: true },
    ],
  },

  // D46 (Q46): Cắt chóp tam giác đều qua trung điểm cạnh bên -> thể tích chóp cụt (hàng đơn vị)
  t11_b27_d46_cut_pyr_midpoint_frustum_sa: {
    id: 't11_b27_d46_cut_pyr_midpoint_frustum_sa',
    name: 'Thể tích chóp cụt tạo bởi mặt phẳng qua trung điểm các cạnh bên (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cắt khối chóp tam giác đều S.ABC cạnh đáy u và chiều cao h bởi mặt phẳng song song đáy qua trung điểm các cạnh bên. Tính thể tích khối chóp cụt.',
    conditionSummary: 'u ∈ [3; 12], h ∈ [3; 12]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy u', min: 3, max: 12 },
      { name: 'h', label: 'Chiều cao h', min: 3, max: 12 },
    ],
    validateCode: `
      const { u: edge, h } = params;
      if (edge < 3 || edge > 12 || h < 3 || h > 12) return { valid: false, reason: 'Tham số ngoài miền' };
      const vol = (7 * edge * edge * h * Math.sqrt(3)) / 96;
      const frac = vol - Math.floor(vol);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h } = params;
      const volFull = (edge * edge * h * Math.sqrt(3)) / 12;
      const volFrustum = (7 / 8) * volFull;
      const numVal = Math.round(volFrustum);
      const ansStr = String(numVal);

      return {
        stem: 'Cắt khối chóp tam giác đều $S.ABC$ có cạnh đáy bằng $' + edge + '$ và chiều cao bằng $' + h + '$ bởi một mặt phẳng song song với đáy và đi qua trung điểm các cạnh bên. Tính thể tích khối chóp cụt đều được tạo thành (kết quả làm tròn đến hàng đơn vị).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 1 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', cent: 'O' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Thể tích khối chóp $S.ABC$ là $V_{S.ABC} = \\dfrac{1}{3} \\cdot \\dfrac{' + edge + '^2\\sqrt{3}}{4} \\cdot ' + h + ' = \\dfrac{' + (edge * edge * h) + '\\sqrt{3}}{12}$.',
          'Mặt phẳng qua trung điểm các cạnh bên cắt ra khối chóp nhỏ phía trên đồng dạng với khối ban đầu theo tỉ số $\\dfrac{1}{2}$, nên $V_{\\text{nhỏ}} = \\left(\\dfrac{1}{2}\\right)^3 V_{S.ABC} = \\dfrac{1}{8} V_{S.ABC}$.',
          'Thể tích khối chóp cụt đều: $V = \\dfrac{7}{8} V_{S.ABC} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 2', params: { u: 2, h: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46 (23)', params: { u: 6, h: 5 }, expectedValid: true },
    ],
  },

  // D47 (Q47): Dụng cụ đong gạo hình chóp cụt tứ giác đều, mực gạo 1/2 chiều cao -> khối lượng tối đa
  t11_b27_d47_rice_scoop_frustum_sa: {
    id: 't11_b27_d47_rice_scoop_frustum_sa',
    name: 'Bài toán thực tế dụng cụ đong gạo dạng chóp cụt (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Dụng cụ đong gạo chóp cụt tứ giác đều đáy lớn AB = a₂, đáy nhỏ A₁B₁ = a₁. Khi chiều cao gạo bằng nửa chiều cao dụng cụ thì nặng m₁ kg. Tính lượng gạo tối đa.',
    conditionSummary: 'a1 ∈ [2; 5], a2 ∈ [4; 9], a2 > a1, mult ∈ [1; 3]',
    paramSpecs: [
      { name: 'a1', label: 'Cạnh đáy nhỏ A₁B₁ = a₁', min: 2, max: 5 },
      { name: 'a2', label: 'Cạnh đáy lớn AB = a₂', min: 4, max: 9 },
      { name: 'mult', label: 'Hệ số nhân khối lượng mẫu (1..3)', min: 1, max: 3 },
    ],
    validateCode: `
      const { a1, a2, mult } = params;
      if (a1 < 2 || a1 > 5 || a2 < 4 || a2 > 9 || mult < 1 || mult > 3 || a2 <= a1) {
        return { valid: false, reason: 'Cần đáy lớn a₂ > a₁' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, mult } = params;
      const numRatio = 7 * a1 * a1 + 4 * a1 * a2 + a2 * a2;
      const denRatio = 8 * (a1 * a1 + a2 * a2 + a1 * a2);
      const frac = u.simplifyFrac(numRatio, denRatio);
      const m1 = frac.num * mult;
      const maxMass = frac.den * mult;
      const ansStr = String(maxMass);
      const aMidFrac = u.simplifyFrac(a1 + a2, 2);

      return {
        stem: 'Một dụng cụ đong gạo có dạng một hình chóp cụt tứ giác đều (trên là đáy lớn $ABCD$, dưới là đáy nhỏ $A_1B_1C_1D_1$). Biết $AB = ' + a2 + '$, $A_1B_1 = ' + a1 + '$. Hiện trong dụng cụ có gạo. Khi chiều cao lớp gạo bằng một nửa chiều cao của dụng cụ thì lượng gạo nặng $' + m1 + '$ kg. Hỏi dụng cụ này có thể đong tối đa bao nhiêu kg gạo?',
        shortAnswer: ansStr,
        numericValue: maxMass,
        answerSummary: ansStr,
        solutionSteps: [
          'Diện tích đáy nhỏ $S_1 = ' + (a1 * a1) + '$, đáy lớn $S_2 = ' + (a2 * a2) + '$. Thiết diện tại nửa chiều cao có cạnh $a\' = \\dfrac{' + a1 + ' + ' + a2 + '}{2} = ' + aMidFrac.latex + '$, nên $S\' = (a\')^2$.',
          'Tỉ số thể tích phần gạo $V_1$ và toàn bộ dụng cụ $V$: $\\dfrac{V_1}{V} = \\dfrac{S_1 + S\' + \\sqrt{S_1 S\'}}{2(S_1 + S_2 + \\sqrt{S_1 S_2})} = ' + frac.latex + '$.',
          'Do khối lượng gạo tỉ lệ thuận với thể tích: $\\dfrac{' + m1 + '}{M} = ' + frac.latex + ' \\Rightarrow M = ' + ansStr + '\\text{ (kg)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a2 ≤ a1 (a1=4, a2=4)', params: { a1: 4, a2: 4, mult: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47 (112)', params: { a1: 3, a2: 6, mult: 2 }, expectedValid: true },
    ],
  },

  // D48 (Q48): Diện tích cần sơn bục chóp cụt tứ giác đều (trừ đáy lớn)
  t11_b27_d48_frustum_paint_area_sa: {
    id: 't11_b27_d48_frustum_paint_area_sa',
    name: 'Bài toán thực tế diện tích sơn bục hình chóp cụt đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Tính tổng diện tích các mặt (trừ đáy lớn) của bục chóp cụt tứ giác đều biết đáy lớn a₂, đáy nhỏ a₁ và cạnh bên l.',
    conditionSummary: 'a2_cm ∈ [120; 200] (step 10), a1_cm ∈ [80; 140] (step 2), l_cm ∈ [120; 200] (step 10), a2 > a1, l > (a2-a1)/2',
    paramSpecs: [
      { name: 'a2Cm', label: 'Cạnh đáy lớn (cm, VD 150 = 1,5 m)', min: 120, max: 200, step: 10 },
      { name: 'a1Cm', label: 'Cạnh đáy nhỏ (cm, VD 112 = 1,12 m)', min: 80, max: 140, step: 2 },
      { name: 'lCm', label: 'Cạnh bên (cm, VD 150 = 1,5 m)', min: 120, max: 200, step: 10 },
    ],
    validateCode: `
      const { a2Cm, a1Cm, lCm } = params;
      if (a2Cm < 120 || a2Cm > 200 || a1Cm < 80 || a1Cm > 140 || lCm < 120 || lCm > 200) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (a2Cm <= a1Cm + 10) return { valid: false, reason: 'Cần đáy lớn > đáy nhỏ' };
      const diffHalf = (a2Cm - a1Cm) / 200;
      const l = lCm / 100;
      if (l <= diffHalf + 0.1) return { valid: false, reason: 'Cạnh bên phải lớn hơn nửa hiệu hai đáy' };
      const a1 = a1Cm / 100, a2 = a2Cm / 100;
      const hSide = Math.sqrt(l * l - diffHalf * diffHalf);
      const area = 2 * (a1 + a2) * hSide + a1 * a1;
      const frac = area * 100 - Math.floor(area * 100);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .005' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a2Cm, a1Cm, lCm } = params;
      const a2 = a2Cm / 100, a1 = a1Cm / 100, l = lCm / 100;
      const diffHalf = (a2 - a1) / 2;
      const hSide = Math.sqrt(l * l - diffHalf * diffHalf);
      const sLat = 2 * (a1 + a2) * hSide;
      const sTop = a1 * a1;
      const total = sLat + sTop;
      const numVal = Math.round(total * 100) / 100;
      const ansStr = u.formatNumberVN(numVal, 2);
      const a2Str = u.formatNumberVN(a2, 2);
      const a1Str = u.formatNumberVN(a1, 2);
      const lStr = u.formatNumberVN(l, 2);

      return {
        stem: 'Một người cần sơn các mặt của một cái bục (trừ đáy lớn) để đặt một bức tượng. Bục có dạng hình chóp cụt tứ giác đều có cạnh đáy lớn $' + a2Str + '\\,\\text{m}$, cạnh bên và cạnh đáy nhỏ lần lượt bằng $' + lStr + '\\,\\text{m}$ và $' + a1Str + '\\,\\text{m}$. Tính tổng diện tích cần sơn theo đơn vị $\\text{m}^2$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Diện tích đáy nhỏ: $S_{\\text{đáy nhỏ}} = ' + a1Str + '^2 = ' + u.formatNumberVN(sTop, 4) + '\\,\\text{m}^2$.',
          'Chiều cao mỗi mặt bên hình thang cân: $h = \\sqrt{' + lStr + '^2 - \\left(\\dfrac{' + a2Str + ' - ' + a1Str + '}{2}\\right)^2} \\approx ' + u.formatNumberVN(hSide, 4) + '\\,\\text{m}$.',
          'Diện tích xung quanh: $S_{xq} = 2(' + a2Str + ' + ' + a1Str + ') \\cdot h \\approx ' + u.formatNumberVN(sLat, 4) + '\\,\\text{m}^2 \\Rightarrow S = S_{xq} + S_{\\text{đáy nhỏ}} \\approx ' + ansStr + '\\,\\text{m}^2$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên đáy nhỏ ≥ đáy lớn', params: { a2Cm: 120, a1Cm: 130, lCm: 150 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48 (9,05)', params: { a2Cm: 150, a1Cm: 112, lCm: 150 }, expectedValid: true },
    ],
  },

  // D49 (Q49): Chân tháp bê tông hình chóp cụt tứ giác đều -> tính chi phí (triệu đồng)
  t11_b27_d49_tower_base_cost_sa: {
    id: 't11_b27_d49_tower_base_cost_sa',
    name: 'Bài toán thực tế chi phí đổ bê tông chân tháp chóp cụt (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Chân tháp dạng chóp cụt tứ giác đều đáy dưới a₂, đáy trên a₁, cạnh bên l, giá bê tông P đồng/m³. Tính chi phí theo triệu đồng.',
    conditionSummary: 'a2 ∈ [5; 12], a1 ∈ [3; 9], a2 > a1, l ∈ [2; 7], l > (a2-a1)/√2, p10k ∈ [110; 180]',
    paramSpecs: [
      { name: 'a2', label: 'Cạnh đáy dưới a₂ (m)', min: 5, max: 12 },
      { name: 'a1', label: 'Cạnh đáy trên a₁ (m)', min: 3, max: 9 },
      { name: 'l', label: 'Cạnh bên l (m)', min: 2, max: 7 },
      { name: 'p10k', label: 'Đơn giá (chục nghìn đồng/m³, VD 137 = 1.370.000đ)', min: 110, max: 180 },
    ],
    validateCode: `
      const { a2, a1, l, p10k } = params;
      if (a2 < 5 || a2 > 12 || a1 < 3 || a1 > 9 || l < 2 || l > 7 || p10k < 110 || p10k > 180) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (a2 <= a1) return { valid: false, reason: 'Cần đáy dưới > đáy trên' };
      const dSq = ((a2 - a1) * (a2 - a1)) / 2;
      if (l * l <= dSq + 0.5) return { valid: false, reason: 'Cạnh bên phải lớn hơn hình chiếu đường chéo hiệu hai đáy' };
      const h = Math.sqrt(l * l - dSq);
      const vol = (h * (a2 * a2 + a1 * a1 + a1 * a2)) / 3;
      const costMil = (vol * p10k) / 100;
      const frac = costMil - Math.floor(costMil);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a2, a1, l, p10k } = params;
      const priceFull = p10k * 10000;
      const dSq = ((a2 - a1) * (a2 - a1)) / 2;
      const h = Math.sqrt(l * l - dSq);
      const vol = (h * (a2 * a2 + a1 * a1 + a1 * a2)) / 3;
      const costMil = (vol * priceFull) / 1000000;
      const numVal = Math.round(costMil);
      const ansStr = String(numVal);

      return {
        stem: 'Người ta xây dựng một chân tháp bằng bê tông có dạng khối chóp cụt tứ giác đều. Cạnh đáy dưới dài $' + a2 + '\\,\\text{m}$, cạnh đáy trên dài $' + a1 + '\\,\\text{m}$, cạnh bên dài $' + l + '\\,\\text{m}$. Biết rằng chân tháp được làm bằng bê tông tươi với giá tiền $' + priceFull + '$ đồng/$\\text{m}^3$. Tính số tiền để mua bê tông tươi làm chân tháp theo đơn vị triệu đồng (làm tròn đến hàng đơn vị).',
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Khoảng cách ngang giữa hai đỉnh tương ứng trên hai đáy là $d = \\dfrac{' + a2 + ' - ' + a1 + '}{\\sqrt{2}} \\Rightarrow h = \\sqrt{' + l + '^2 - d^2} \\approx ' + u.formatNumberVN(h, 3) + '\\,\\text{m}$.',
          'Thể tích khối chóp cụt: $V = \\dfrac{h}{3}(' + a2 + '^2 + ' + a1 + '^2 + ' + a2 + '\\cdot ' + a1 + ') \\approx ' + u.formatNumberVN(vol, 3) + '\\,\\text{m}^3$.',
          'Số tiền mua bê tông: $T = \\dfrac{V \\cdot ' + priceFull + '}{10^6} \\approx ' + u.formatNumberVN(costMil, 2) + '$ triệu đồng, làm tròn được $' + ansStr + '$ triệu đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh bên quá ngắn (a2=10, a1=4, l=3)', params: { a2: 10, a1: 4, l: 3, p10k: 137 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49 (179)', params: { a2: 8, a1: 6, l: 3, p10k: 137 }, expectedValid: true },
    ],
  },

  // D50 (Q50): Lăng trụ đứng ABC.A'B'C' đáy vuông tại B, AB=√p, AC=√q, góc (A'C, đáy) = α -> V
  t11_b27_d50_prism_right_b_angle_sa: {
    id: 't11_b27_d50_prism_right_b_angle_sa',
    name: 'Thể tích lăng trụ đứng đáy vuông tại B biết góc (A\'C, đáy) (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho lăng trụ đứng ABC.A\'B\'C\' đáy vuông tại B, AB = √p, AC = √q, góc giữa A\'C và (ABC) bằng α. Tính thể tích V.',
    conditionSummary: 'p ∈ [2; 10], q ∈ [3; 16], q > p, degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'p', label: 'Bình phương cạnh AB: p (AB = √p)', min: 2, max: 10 },
      { name: 'q', label: 'Bình phương cạnh huyền AC: q (AC = √q)', min: 3, max: 16 },
      { name: 'degIdx', label: 'Góc giữa A\'C và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { p, q, degIdx } = params;
      if (p < 2 || p > 10 || q < 3 || q > 16 || degIdx < 0 || degIdx > 2 || q <= p) {
        return { valid: false, reason: 'Cần cạnh huyền AC > AB (q > p)' };
      }
      const tanA = Math.tan([30, 45, 60][degIdx] * Math.PI / 180);
      const vol = 0.5 * Math.sqrt(p * (q - p) * q) * tanA;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const tanA = Math.tan(alphaDeg * Math.PI / 180);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const abTex = rad(p), acTex = rad(q), bcTex = rad(q - p);
      const vol = 0.5 * Math.sqrt(p * (q - p) * q) * tanA;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác vuông tại $B$, $AB = " + abTex + "$, $AC = " + acTex + "$. Góc giữa đường thẳng $A'C$ và $(ABC)$ bằng $" + alphaDeg + "^\\circ$. Tính thể tích khối lăng trụ đã cho (kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $BC = \\sqrt{AC^2 - AB^2} = ' + bcTex + ' \\Rightarrow S_{ABC} = \\dfrac{1}{2} AB \\cdot BC = \\dfrac{1}{2} \\cdot ' + abTex + ' \\cdot ' + bcTex + '$.',
          "Chiều cao $AA' = AC \\tan " + alphaDeg + "^\\circ = " + acTex + " \\tan " + alphaDeg + "^\\circ$.",
          "Thể tích khối lăng trụ: $V = S_{ABC} \\cdot AA' \\approx " + ansStr + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q ≤ p (p=6, q=5)', params: { p: 6, q: 5, degIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50 (1,6)', params: { p: 5, q: 6, degIdx: 0 }, expectedValid: true },
    ],
  },

  // D51 (Q51): Lăng trụ đứng ABC.A'B'C' đáy vuông tại A, AB=√p, BC=√q, góc (A'C, đáy) = α -> V
  t11_b27_d51_prism_right_a_angle_sa: {
    id: 't11_b27_d51_prism_right_a_angle_sa',
    name: 'Thể tích lăng trụ đứng đáy vuông tại A biết góc (A\'C, đáy) (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho lăng trụ đứng ABC.A\'B\'C\' đáy vuông tại A, AB = √p, BC = √q, góc giữa A\'C và (ABC) bằng α. Tính thể tích V.',
    conditionSummary: 'p ∈ [2; 10], q ∈ [3; 16], q > p, degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'p', label: 'Bình phương cạnh AB: p (AB = √p)', min: 2, max: 10 },
      { name: 'q', label: 'Bình phương cạnh huyền BC: q (BC = √q)', min: 3, max: 16 },
      { name: 'degIdx', label: 'Góc giữa A\'C và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { p, q, degIdx } = params;
      if (p < 2 || p > 10 || q < 3 || q > 16 || degIdx < 0 || degIdx > 2 || q <= p) {
        return { valid: false, reason: 'Cần cạnh huyền BC > AB (q > p)' };
      }
      const tanA = Math.tan([30, 45, 60][degIdx] * Math.PI / 180);
      const vol = 0.5 * Math.sqrt(p) * (q - p) * tanA;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const tanA = Math.tan(alphaDeg * Math.PI / 180);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const abTex = rad(p), bcTex = rad(q), acTex = rad(q - p);
      const vol = 0.5 * Math.sqrt(p) * (q - p) * tanA;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác vuông tại $A$, $AB = " + abTex + "$, $BC = " + bcTex + "$. Góc giữa đường thẳng $A'C$ và $(ABC)$ bằng $" + alphaDeg + "^\\circ$. Tính thể tích khối lăng trụ đã cho (kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $AC = \\sqrt{BC^2 - AB^2} = ' + acTex + ' \\Rightarrow S_{ABC} = \\dfrac{1}{2} AB \\cdot AC = \\dfrac{1}{2} \\cdot ' + abTex + ' \\cdot ' + acTex + '$.',
          "Chiều cao $AA' = AC \\tan " + alphaDeg + "^\\circ = " + acTex + " \\tan " + alphaDeg + "^\\circ$.",
          "Thể tích khối lăng trụ: $V = S_{ABC} \\cdot AA' \\approx " + ansStr + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q ≤ p (p=5, q=5)', params: { p: 5, q: 5, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q51 (3)', params: { p: 3, q: 5, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D52 (Q52): Lăng trụ đứng ABC.A'B'C' đáy vuông cân tại A, BC=√q, góc (A'B, đáy) = α -> V
  t11_b27_d52_prism_iso_right_angle_sa: {
    id: 't11_b27_d52_prism_iso_right_angle_sa',
    name: 'Thể tích lăng trụ đứng đáy vuông cân biết góc (A\'B, đáy) (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho lăng trụ đứng ABC.A\'B\'C\' đáy tam giác vuông cân tại A, BC = √q, góc giữa A\'B và (ABC) bằng α. Tính thể tích V.',
    conditionSummary: 'q ∈ [2; 20], degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh huyền BC: q (BC = √q)', min: 2, max: 20 },
      { name: 'degIdx', label: 'Góc giữa A\'B và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { q, degIdx } = params;
      if (q < 2 || q > 20 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const tanA = Math.tan([30, 45, 60][degIdx] * Math.PI / 180);
      const vol = (q * Math.sqrt(2 * q) * tanA) / 8;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const tanA = Math.tan(alphaDeg * Math.PI / 180);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const bcTex = rad(q);
      const areaFrac = u.simplifyFrac(q, 4);
      const vol = (q * Math.sqrt(2 * q) * tanA) / 8;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác vuông cân tại $A$, $BC = " + bcTex + "$. Góc giữa đường thẳng $A'B$ và $(ABC)$ bằng $" + alphaDeg + "^\\circ$. Tính thể tích khối lăng trụ đã cho (kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Do $\\triangle ABC$ vuông cân tại $A$ nên $AB = AC = \\dfrac{BC}{\\sqrt{2}} = \\dfrac{' + bcTex + '}{\\sqrt{2}}$, suy ra $S_{ABC} = \\dfrac{1}{4}BC^2 = ' + areaFrac.latex + '$.',
          "Chiều cao $AA' = AB \\tan " + alphaDeg + "^\\circ = \\dfrac{" + bcTex + "}{\\sqrt{2}} \\tan " + alphaDeg + "^\\circ$.",
          "Thể tích khối lăng trụ: $V = S_{ABC} \\cdot AA' = \\dfrac{" + q + "\\sqrt{" + (2 * q) + "} \\tan " + alphaDeg + "^\\circ}{8} \\approx " + ansStr + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { q: 1, degIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q52 (2,6)', params: { q: 6, degIdx: 1 }, expectedValid: true },
    ],
  },
};
