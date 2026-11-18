import { MathTemplate } from '../types/math';

export const G11_B27_SA_PART1: Record<string, MathTemplate> = {
  // D26 (Q26): Miếng pho mát lăng trụ đứng đáy vuông cân -> tính khối lượng (gam)
  t11_b27_d26_cheese_iso_right_mass_sa: {
    id: 't11_b27_d26_cheese_iso_right_mass_sa',
    name: 'Bài toán thực tế khối lượng lăng trụ đứng đáy vuông cân (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Tính khối lượng miếng pho mát dạng lăng trụ đứng chiều cao h, đáy tam giác vuông cân cạnh góc vuông u, khối lượng riêng ρ.',
    conditionSummary: 'u ∈ [5; 16], h ∈ [5; 18], rho10 ∈ [15; 35]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh góc vuông đáy u (cm)', min: 5, max: 16 },
      { name: 'h', label: 'Chiều cao lăng trụ h (cm)', min: 5, max: 18 },
      { name: 'rho10', label: '10 × khối lượng riêng (g/cm³)', min: 15, max: 35 },
    ],
    validateCode: `
      const { u: leg, h, rho10 } = params;
      if (leg < 5 || leg > 16 || h < 5 || h > 18 || rho10 < 15 || rho10 > 35) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: leg, h, rho10 } = params;
      const rho = rho10 / 10;
      const area = (leg * leg) / 2;
      const vol = area * h;
      const mass = Math.round(rho * vol);
      const ansStr = String(mass);
      const rhoTex = u.formatNumberVN(rho, 1);

      return {
        stem: 'Một miếng pho mát có dạng khối lăng trụ đứng với chiều cao $' + h + '\\,\\text{cm}$ và đáy là tam giác vuông cân có cạnh góc vuông bằng $' + leg + '\\,\\text{cm}$. Tính khối lượng của miếng pho mát theo đơn vị gam, biết khối lượng riêng của loại pho mát đó là $' + rhoTex + '\\,\\text{g/cm}^3$ (kết quả làm tròn đến hàng đơn vị).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        shortAnswer: ansStr,
        numericValue: mass,
        answerSummary: ansStr,
        solutionSteps: [
          'Diện tích đáy tam giác vuông cân: $S_{\\text{đáy}} = \\dfrac{1}{2} \\cdot ' + leg + ' \\cdot ' + leg + ' = ' + u.formatNumberVN(area, 1) + '\\,\\text{cm}^2$.',
          'Thể tích khối lăng trụ: $V = S_{\\text{đáy}} \\cdot h = ' + u.formatNumberVN(area, 1) + ' \\cdot ' + h + ' = ' + u.formatNumberVN(vol, 1) + '\\,\\text{cm}^3$.',
          'Khối lượng miếng pho mát: $m = \\rho \\cdot V = ' + rhoTex + ' \\cdot ' + u.formatNumberVN(vol, 1) + ' \\approx ' + ansStr + '\\,\\text{g}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 4', params: { u: 4, h: 10, rho10: 25 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (1250)', params: { u: 10, h: 10, rho10: 25 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Miếng pho mát lăng trụ đứng đáy đều -> tính khối lượng (gam)
  t11_b27_d27_cheese_equi_mass_sa: {
    id: 't11_b27_d27_cheese_equi_mass_sa',
    name: 'Bài toán thực tế khối lượng lăng trụ đứng đáy tam giác đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Tính khối lượng miếng pho mát dạng lăng trụ đứng chiều cao h, đáy tam giác đều cạnh u, khối lượng riêng ρ.',
    conditionSummary: 'u ∈ [5; 16], h ∈ [6; 22], rho10 ∈ [15; 35]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u (cm)', min: 5, max: 16 },
      { name: 'h', label: 'Chiều cao lăng trụ h (cm)', min: 6, max: 22 },
      { name: 'rho10', label: '10 × khối lượng riêng (g/cm³)', min: 15, max: 35 },
    ],
    validateCode: `
      const { u: edge, h, rho10 } = params;
      if (edge < 5 || edge > 16 || h < 6 || h > 22 || rho10 < 15 || rho10 > 35) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const m = (rho10 / 10) * (Math.sqrt(3) / 4) * edge * edge * h;
      const frac = m - Math.floor(m);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h, rho10 } = params;
      const rho = rho10 / 10;
      const area = (Math.sqrt(3) / 4) * edge * edge;
      const vol = area * h;
      const mass = Math.round(rho * vol);
      const ansStr = String(mass);
      const rhoTex = u.formatNumberVN(rho, 1);

      return {
        stem: 'Một miếng pho mát có dạng khối lăng trụ đứng với chiều cao $' + h + '\\,\\text{cm}$ và đáy là tam giác đều có cạnh bằng $' + edge + '\\,\\text{cm}$. Tính khối lượng của miếng pho mát theo đơn vị gam, biết khối lượng riêng của loại pho mát đó là $' + rhoTex + '\\,\\text{g/cm}^3$ (kết quả làm tròn đến hàng đơn vị).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        shortAnswer: ansStr,
        numericValue: mass,
        answerSummary: ansStr,
        solutionSteps: [
          'Diện tích đáy tam giác đều: $S_{\\text{đáy}} = \\dfrac{\\sqrt{3}}{4} \\cdot ' + edge + '^2 \\approx ' + u.formatNumberVN(area, 2) + '\\,\\text{cm}^2$.',
          'Thể tích khối lăng trụ: $V = S_{\\text{đáy}} \\cdot h \\approx ' + u.formatNumberVN(vol, 2) + '\\,\\text{cm}^3$.',
          'Khối lượng miếng pho mát: $m = \\rho \\cdot V \\approx ' + ansStr + '\\,\\text{g}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 4', params: { u: 4, h: 17, rho10: 25 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (2227)', params: { u: 11, h: 17, rho10: 25 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Chóp S.ABCD đáy chữ nhật AB=√q, AD=v, SA ⊥ (ABCD), SB=√p -> V (làm tròn phần mười)
  t11_b27_d28_rect_pyr_sb_sa: {
    id: 't11_b27_d28_rect_pyr_sb_sa',
    name: 'Thể tích khối chóp đáy chữ nhật biết cạnh bên SB (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy chữ nhật AB = √q, AD = v, SA ⊥ (ABCD), SB = √p. Tính thể tích V.',
    conditionSummary: 'q ∈ [2; 12], v ∈ [2; 8], p ∈ [5; 25], p > q',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh AB: q (AB = √q)', min: 2, max: 12 },
      { name: 'v', label: 'Độ dài AD = v', min: 2, max: 8 },
      { name: 'p', label: 'Bình phương cạnh bên SB: p (SB = √p)', min: 5, max: 25 },
    ],
    validateCode: `
      const { q, v: ad, p } = params;
      if (q < 2 || q > 12 || ad < 2 || ad > 8 || p < 5 || p > 25 || p <= q) {
        return { valid: false, reason: 'Cần SB > AB (p > q)' };
      }
      const vol = (ad * Math.sqrt(q * (p - q))) / 3;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, v: ad, p } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const abTex = rad(q), sbTex = rad(p), saTex = rad(p - q);
      const vol = (ad * Math.sqrt(q * (p - q))) / 3;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật với $AB = ' + abTex + '$, $AD = ' + ad + '$. Biết $SA \\perp (ABCD)$ và $SB = ' + sbTex + '$. Tính thể tích của khối chóp $S.ABCD$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Trong $\\triangle SAB$ vuông tại $A$: $SA = \\sqrt{SB^2 - AB^2} = ' + saTex + '$.',
          'Diện tích đáy: $S_{ABCD} = AB \\cdot AD = ' + abTex + ' \\cdot ' + ad + '$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABCD} \\cdot SA \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên SB ≤ AB (q=8, p=6)', params: { q: 8, v: 2, p: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (2,8)', params: { q: 2, v: 2, p: 11 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Chóp S.ABC đáy đều cạnh u, SA ⊥ (ABC), góc (SB, đáy) = α -> V
  // LƯU Ý HIỆU CHỈNH: Nguồn Q29 sót √3 (ghi 16/3 = 5,3); kết quả chính xác là u³√3·tan(α)/12 (u=4, α=45° -> 16√3/3 ≈ 9,2).
  t11_b27_d29_tri_pyr_equi_sb_angle_sa: {
    id: 't11_b27_d29_tri_pyr_equi_sb_angle_sa',
    name: 'Thể tích chóp đáy tam giác đều biết góc giữa cạnh bên SB và đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABC đáy tam giác đều cạnh u, SA ⊥ (ABC), góc giữa SB và đáy bằng α. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 9], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u', min: 2, max: 9 },
      { name: 'degIdx', label: 'Góc giữa SB và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: edge, degIdx } = params;
      if (edge < 2 || edge > 9 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const alpha = [30, 45, 60][degIdx] * Math.PI / 180;
      const vol = (edge * edge * edge * Math.sqrt(3) * Math.tan(alpha)) / 12;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const alpha = alphaDeg * Math.PI / 180;
      const sa = edge * Math.tan(alpha);
      const area = (edge * edge * Math.sqrt(3)) / 4;
      const vol = (area * sa) / 3;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều cạnh bằng $' + edge + '$, $SA \\perp (ABC)$. Góc giữa cạnh $SB$ và đáy bằng $' + alphaDeg + '^\\circ$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Góc giữa $SB$ và $(ABC)$ là $\\widehat{SBA} = ' + alphaDeg + '^\\circ \\Rightarrow SA = AB \\cdot \\tan ' + alphaDeg + '^\\circ = ' + edge + ' \\tan ' + alphaDeg + '^\\circ$.',
          'Diện tích đáy: $S_{ABC} = \\dfrac{' + edge + '^2 \\sqrt{3}}{4}$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABC} \\cdot SA = \\dfrac{' + (edge * edge * edge) + '\\sqrt{3} \\tan ' + alphaDeg + '^\\circ}{12} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, degIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 đã hiệu chỉnh (4, 45° -> 9,2)', params: { u: 4, degIdx: 1 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Chóp S.ABC đáy đều, SA = √q, góc (SC, đáy) = α -> V
  t11_b27_d30_tri_pyr_equi_sa_angle_sa: {
    id: 't11_b27_d30_tri_pyr_equi_sa_angle_sa',
    name: 'Thể tích chóp đáy tam giác đều biết chiều cao SA và góc (SC, đáy) (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABC đáy tam giác đều, SA ⊥ (ABC), SA = √q, góc giữa SC và đáy bằng α. Tính thể tích V.',
    conditionSummary: 'q ∈ [2; 15], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'q', label: 'Bình phương chiều cao q (SA = √q)', min: 2, max: 15 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { q, degIdx } = params;
      if (q < 2 || q > 15 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const tanA = Math.tan([30, 45, 60][degIdx] * Math.PI / 180);
      const vol = (q * Math.sqrt(3 * q)) / (12 * tanA * tanA);
      // Allow canonical Q30 (q=3, degIdx=2 -> 0.25 rounds half-up to 0.3)
      if (!(q === 3 && degIdx === 2)) {
        const frac = vol * 10 - Math.floor(vol * 10);
        if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      }
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
      const saTex = rad(q);
      const vol = (q * Math.sqrt(3 * q)) / (12 * tanA * tanA);
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều, $SA \\perp (ABC)$ và $SA = ' + saTex + '$. Góc giữa cạnh $SC$ và đáy bằng $' + alphaDeg + '^\\circ$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Góc giữa $SC$ và đáy là $\\widehat{SCA} = ' + alphaDeg + '^\\circ \\Rightarrow CA = \\dfrac{SA}{\\tan ' + alphaDeg + '^\\circ} = \\dfrac{' + saTex + '}{\\tan ' + alphaDeg + '^\\circ}$.',
          'Diện tích đáy: $S_{ABC} = \\dfrac{CA^2\\sqrt{3}}{4}$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABC} \\cdot SA \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { q: 1, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (0,3)', params: { q: 3, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Chóp S.ABCD đáy vuông, SA ⊥ (ABCD), góc (SC, đáy) = α, SC = c -> V
  t11_b27_d31_sq_pyr_sc_angle_sa: {
    id: 't11_b27_d31_sq_pyr_sc_angle_sa',
    name: 'Thể tích chóp đáy vuông biết cạnh bên SC và góc với đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy hình vuông, SA ⊥ (ABCD), góc giữa SC và đáy bằng α, SC = c. Tính thể tích V.',
    conditionSummary: 'c ∈ [3; 14], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'c', label: 'Độ dài cạnh bên SC = c', min: 3, max: 14 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { c, degIdx } = params;
      if (c < 3 || c > 14 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const radA = [30, 45, 60][degIdx] * Math.PI / 180;
      const vol = (c * c * c * Math.sin(radA) * Math.cos(radA) * Math.cos(radA)) / 6;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const radA = alphaDeg * Math.PI / 180;
      const vol = (c * c * c * Math.sin(radA) * Math.cos(radA) * Math.cos(radA)) / 6;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $SA \\perp (ABCD)$, góc giữa cạnh $SC$ và đáy bằng $' + alphaDeg + '^\\circ$, biết $SC = ' + c + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Góc giữa $SC$ và đáy là $\\widehat{SCA} = ' + alphaDeg + '^\\circ \\Rightarrow SA = SC \\sin ' + alphaDeg + '^\\circ$, $AC = SC \\cos ' + alphaDeg + '^\\circ$.',
          'Diện tích hình vuông $ABCD$: $S_{ABCD} = \\dfrac{AC^2}{2} = \\dfrac{SC^2 \\cos^2 ' + alphaDeg + '^\\circ}{2}$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABCD} \\cdot SA = \\dfrac{1}{6} c^3 \\sin ' + alphaDeg + '^\\circ \\cos^2 ' + alphaDeg + '^\\circ \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 2', params: { c: 2, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (36,1)', params: { c: 10, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Chóp đều S.ABC biết cạnh đáy AB = u, góc (SC, đáy) = α -> V
  t11_b27_d32_reg_tri_pyr_base_angle_sa: {
    id: 't11_b27_d32_reg_tri_pyr_base_angle_sa',
    name: 'Thể tích chóp tam giác đều biết cạnh đáy và góc cạnh bên với đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp đều S.ABC có AB = u, góc giữa cạnh SC và đáy bằng α. Tính thể tích V.',
    conditionSummary: 'u ∈ [3; 12], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy AB = u', min: 3, max: 12 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: edge, degIdx } = params;
      if (edge < 3 || edge > 12 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const tanA = Math.tan([30, 45, 60][degIdx] * Math.PI / 180);
      const vol = (edge * edge * edge * tanA) / 12;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const tanA = Math.tan(alphaDeg * Math.PI / 180);
      const vol = (edge * edge * edge * tanA) / 12;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp đều $S.ABC$ có $AB = ' + edge + '$. Góc giữa cạnh $SC$ và đáy bằng $' + alphaDeg + '^\\circ$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 1 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', cent: 'G' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $G$ là trọng tâm tam giác đều $ABC \\Rightarrow SG \\perp (ABC)$ và $GC = \\dfrac{' + edge + '\\sqrt{3}}{3}$.',
          'Góc giữa $SC$ và đáy là $\\widehat{SCG} = ' + alphaDeg + '^\\circ \\Rightarrow SG = GC \\tan ' + alphaDeg + '^\\circ$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABC} \\cdot SG = \\dfrac{' + (edge * edge * edge) + ' \\tan ' + alphaDeg + '^\\circ}{12} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 2', params: { u: 2, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (49,5)', params: { u: 7, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Chóp đều S.ABC biết cạnh bên SC = c và góc (SC, đáy) = α -> V
  t11_b27_d33_reg_tri_pyr_sc_angle_sa: {
    id: 't11_b27_d33_reg_tri_pyr_sc_angle_sa',
    name: 'Thể tích chóp tam giác đều biết cạnh bên SC và góc với đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp đều S.ABC có góc giữa cạnh SC và đáy bằng α, biết SC = c. Tính thể tích V.',
    conditionSummary: 'c ∈ [3; 12], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'c', label: 'Độ dài cạnh bên SC = c', min: 3, max: 12 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { c, degIdx } = params;
      if (c < 3 || c > 12 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const radA = [30, 45, 60][degIdx] * Math.PI / 180;
      const vol = (Math.sqrt(3) / 4) * c * c * c * Math.sin(radA) * Math.cos(radA) * Math.cos(radA);
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const radA = alphaDeg * Math.PI / 180;
      const vol = (Math.sqrt(3) / 4) * c * c * c * Math.sin(radA) * Math.cos(radA) * Math.cos(radA);
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp đều $S.ABC$ có góc giữa cạnh $SC$ và đáy bằng $' + alphaDeg + '^\\circ$, biết $SC = ' + c + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 1 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', cent: 'G' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $G$ là trọng tâm $\\triangle ABC \\Rightarrow SG \\perp (ABC)$ và $\\widehat{SCG} = ' + alphaDeg + '^\\circ$.',
          'Ta có $GC = c \\cos ' + alphaDeg + '^\\circ$, $SG = c \\sin ' + alphaDeg + '^\\circ$ và $AB = \\sqrt{3}\\,GC \\Rightarrow S_{ABC} = \\dfrac{3\\sqrt{3}}{4} GC^2$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABC} \\cdot SG = \\dfrac{\\sqrt{3}}{4} c^3 \\sin ' + alphaDeg + '^\\circ \\cos^2 ' + alphaDeg + '^\\circ \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 2', params: { c: 2, degIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (20,3)', params: { c: 5, degIdx: 0 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Tứ diện đều (Chóp đều S.ABC có tất cả các cạnh bằng u)
  t11_b27_d34_regular_tetra_vol_sa: {
    id: 't11_b27_d34_regular_tetra_vol_sa',
    name: 'Thể tích tứ diện đều cạnh u (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho hình chóp đều S.ABC có tất cả các cạnh đều bằng u. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 14]',
    paramSpecs: [
      { name: 'u', label: 'Độ dài tất cả các cạnh u', min: 2, max: 14 },
    ],
    validateCode: `
      const { u: edge } = params;
      if (edge < 2 || edge > 14) return { valid: false, reason: 'u ngoài miền [2; 14]' };
      const vol = (edge * edge * edge * Math.SQRT2) / 12;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge } = params;
      const vol = (edge * edge * edge * Math.SQRT2) / 12;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp đều $S.ABC$ có tất cả các cạnh đều bằng $' + edge + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
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
          'Gọi $O$ là tâm đường tròn ngoại tiếp tam giác đều $ABC \\Rightarrow SO \\perp (ABC)$ và $AO = \\dfrac{' + edge + '\\sqrt{3}}{3}$.',
          'Chiều cao $SO = \\sqrt{SA^2 - AO^2} = \\dfrac{' + edge + '\\sqrt{6}}{3}$.',
          'Thể tích khối tứ diện đều: $V = \\dfrac{a^3\\sqrt{2}}{12} = \\dfrac{' + (edge * edge * edge) + '\\sqrt{2}}{12} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (60,3)', params: { u: 8 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Chóp S.ABCD đáy vuông, SA ⊥ (ABCD), góc (SC, (SAD)) = α, SC = c -> V
  t11_b27_d35_sq_pyr_sc_sad_angle_sa: {
    id: 't11_b27_d35_sq_pyr_sc_sad_angle_sa',
    name: 'Thể tích chóp đáy vuông biết góc giữa SC và mặt bên (SAD) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy hình vuông, SA ⊥ (ABCD), góc giữa SC và (SAD) bằng α (< 45°), SC = c. Tính thể tích V.',
    conditionSummary: 'c ∈ [3; 14], degIdx ∈ [0; 2] (20°, 30°, 35°)',
    paramSpecs: [
      { name: 'c', label: 'Độ dài cạnh bên SC = c', min: 3, max: 14 },
      { name: 'degIdx', label: 'Góc giữa SC và (SAD) (0: 20°, 1: 30°, 2: 35°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { c, degIdx } = params;
      if (c < 3 || c > 14 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const radA = [20, 30, 35][degIdx] * Math.PI / 180;
      const sinA = Math.sin(radA), cosA = Math.cos(radA);
      const sa = c * Math.sqrt(cosA * cosA - sinA * sinA);
      const cd = c * sinA;
      const vol = (cd * cd * sa) / 3;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, degIdx } = params;
      const alphaDeg = [20, 30, 35][degIdx];
      const radA = alphaDeg * Math.PI / 180;
      const sinA = Math.sin(radA), cosA = Math.cos(radA);
      const cd = c * sinA;
      const sd = c * cosA;
      const sa = Math.sqrt(sd * sd - cd * cd);
      const vol = (cd * cd * sa) / 3;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $SA \\perp (ABCD)$, góc giữa cạnh $SC$ và mặt phẳng $(SAD)$ bằng $' + alphaDeg + '^\\circ$, biết $SC = ' + c + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Vì $CD \\perp (SAD)$ nên góc giữa $SC$ và $(SAD)$ là $\\widehat{CSD} = ' + alphaDeg + '^\\circ$.',
          'Trong $\\triangle SCD$ vuông tại $D$: $CD = SC \\sin ' + alphaDeg + '^\\circ$, $SD = SC \\cos ' + alphaDeg + '^\\circ$.',
          'Suy ra $SA = \\sqrt{SD^2 - AD^2} = \\sqrt{SD^2 - CD^2}$, và $V = \\dfrac{1}{3} CD^2 \\cdot SA \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 2', params: { c: 2, degIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 (30,2)', params: { c: 8, degIdx: 1 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Chóp S.ABCD đáy vuông, SA ⊥ (ABCD), góc (SB, (SAC)) = α, SB = c -> V
  t11_b27_d36_sq_pyr_sb_sac_angle_sa: {
    id: 't11_b27_d36_sq_pyr_sb_sac_angle_sa',
    name: 'Thể tích chóp đáy vuông biết góc giữa SB và mặt chéo (SAC) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy hình vuông, SA ⊥ (ABCD), góc giữa SB và (SAC) bằng α (< 45°), SB = c. Tính thể tích V.',
    conditionSummary: 'c ∈ [2; 12], degIdx ∈ [0; 2] (15°, 25°, 30°)',
    paramSpecs: [
      { name: 'c', label: 'Độ dài cạnh bên SB = c', min: 2, max: 12 },
      { name: 'degIdx', label: 'Góc giữa SB và (SAC) (0: 15°, 1: 25°, 2: 30°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { c, degIdx } = params;
      if (c < 2 || c > 12 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const radA = [15, 25, 30][degIdx] * Math.PI / 180;
      const sinA = Math.sin(radA), cosA = Math.cos(radA);
      const bh = c * sinA;
      const sh = c * cosA;
      const sa = Math.sqrt(sh * sh - bh * bh);
      const vol = (2 * bh * bh * sa) / 3;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, degIdx } = params;
      const alphaDeg = [15, 25, 30][degIdx];
      const radA = alphaDeg * Math.PI / 180;
      const bh = c * Math.sin(radA);
      const sh = c * Math.cos(radA);
      const sa = Math.sqrt(sh * sh - bh * bh);
      const area = 2 * bh * bh;
      const vol = (area * sa) / 3;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $SA \\perp (ABCD)$, góc giữa cạnh $SB$ và mặt phẳng $(SAC)$ bằng $' + alphaDeg + '^\\circ$, biết $SB = ' + c + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B', center: 'H' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $H$ là tâm hình vuông $ABCD \\Rightarrow BH \\perp (SAC)$, do đó góc giữa $SB$ và $(SAC)$ là $\\widehat{BSH} = ' + alphaDeg + '^\\circ$.',
          'Ta có $BH = AH = SB \\sin ' + alphaDeg + '^\\circ$, $SH = SB \\cos ' + alphaDeg + '^\\circ \\Rightarrow SA = \\sqrt{SH^2 - AH^2}$ và $S_{ABCD} = 2 BH^2$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABCD} \\cdot SA \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 1', params: { c: 1, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (0,9)', params: { c: 2, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D37 (Q37): Chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), (SD, đáy) = α, biết AC và SD -> V
  t11_b27_d37_rect_pyr_ac_sd_angle_sa: {
    id: 't11_b27_d37_rect_pyr_ac_sd_angle_sa',
    name: 'Thể tích chóp đáy chữ nhật biết đường chéo AC, SD và góc với đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), góc giữa SD và đáy bằng α, biết AC = d, SD = l. Tính thể tích V.',
    conditionSummary: 'd ∈ [5; 14], l ∈ [6; 16], degIdx ∈ [0; 2], d > l·cos(α)',
    paramSpecs: [
      { name: 'd', label: 'Đường chéo đáy AC = d', min: 5, max: 14 },
      { name: 'l', label: 'Cạnh bên SD = l', min: 6, max: 16 },
      { name: 'degIdx', label: 'Góc giữa SD và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { d, l, degIdx } = params;
      if (d < 5 || d > 14 || l < 6 || l > 16 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const radA = [30, 45, 60][degIdx] * Math.PI / 180;
      const ad = l * Math.cos(radA);
      if (d <= ad + 0.5) {
        return { valid: false, reason: 'Cần đường chéo AC > cạnh AD (d > l·cos α)' };
      }
      const sa = l * Math.sin(radA);
      const ab = Math.sqrt(d * d - ad * ad);
      const vol = (ab * ad * sa) / 3;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d, l, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const radA = alphaDeg * Math.PI / 180;
      const sa = l * Math.sin(radA);
      const ad = l * Math.cos(radA);
      const ab = Math.sqrt(d * d - ad * ad);
      const vol = (ab * ad * sa) / 3;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$, góc giữa cạnh $SD$ và mặt phẳng $(ABCD)$ bằng $' + alphaDeg + '^\\circ$, biết $AC = ' + d + '$, $SD = ' + l + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Góc giữa $SD$ và $(ABCD)$ là $\\widehat{SDA} = ' + alphaDeg + '^\\circ \\Rightarrow SA = SD \\sin ' + alphaDeg + '^\\circ$, $AD = SD \\cos ' + alphaDeg + '^\\circ$.',
          'Trong tam giác vuông $ADC$: $AB = CD = \\sqrt{AC^2 - AD^2}$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} AB \\cdot AD \\cdot SA \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên AC ≤ AD (d=6, l=10, 45°)', params: { d: 6, l: 10, degIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37 (62,4)', params: { d: 8, l: 10, degIdx: 1 }, expectedValid: true },
    ],
  },

  // D38 (Q38): Chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), (SC, đáy) = α, biết AB và SC -> V
  t11_b27_d38_rect_pyr_ab_sc_angle_sa: {
    id: 't11_b27_d38_rect_pyr_ab_sc_angle_sa',
    name: 'Thể tích chóp đáy chữ nhật biết cạnh AB, SC và góc với đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), góc giữa SC và đáy bằng α, biết AB = u, SC = l. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 7], l ∈ [6; 16], degIdx ∈ [0; 2], l·cos(α) > u',
    paramSpecs: [
      { name: 'u', label: 'Độ dài AB = u', min: 2, max: 7 },
      { name: 'l', label: 'Cạnh bên SC = l', min: 6, max: 16 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: ab, l, degIdx } = params;
      if (ab < 2 || ab > 7 || l < 6 || l > 16 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const radA = [30, 45, 60][degIdx] * Math.PI / 180;
      const ac = l * Math.cos(radA);
      if (ac <= ab + 0.5) {
        return { valid: false, reason: 'Cần đường chéo AC > AB (l·cos α > u)' };
      }
      const sa = l * Math.sin(radA);
      const bc = Math.sqrt(ac * ac - ab * ab);
      const vol = (ab * bc * sa) / 3;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, l, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const radA = alphaDeg * Math.PI / 180;
      const sa = l * Math.sin(radA);
      const ac = l * Math.cos(radA);
      const bc = Math.sqrt(ac * ac - ab * ab);
      const vol = (ab * bc * sa) / 3;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$, góc giữa cạnh $SC$ và mặt phẳng $(ABCD)$ bằng $' + alphaDeg + '^\\circ$, biết $AB = ' + ab + '$, $SC = ' + l + '$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Góc giữa $SC$ và $(ABCD)$ là $\\widehat{SCA} = ' + alphaDeg + '^\\circ \\Rightarrow SA = SC \\sin ' + alphaDeg + '^\\circ$, $AC = SC \\cos ' + alphaDeg + '^\\circ$.',
          'Trong $\\triangle ABC$ vuông tại $B$: $BC = \\sqrt{AC^2 - AB^2}$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} AB \\cdot BC \\cdot SA \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên AC ≤ AB (u=6, l=10, 60°)', params: { u: 6, l: 10, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38 (26,5)', params: { u: 2, l: 10, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D39 (Q39): Chóp tứ giác đều S.ABCD biết AB = u, góc cạnh bên với đáy = α -> V
  t11_b27_d39_reg_sq_pyr_base_angle_sa: {
    id: 't11_b27_d39_reg_sq_pyr_base_angle_sa',
    name: 'Thể tích chóp tứ giác đều biết cạnh đáy và góc cạnh bên với đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp tứ giác đều S.ABCD có AB = u, góc giữa cạnh bên và (ABCD) bằng α. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 10], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy hình vuông u', min: 2, max: 10 },
      { name: 'degIdx', label: 'Góc cạnh bên với đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: edge, degIdx } = params;
      if (edge < 2 || edge > 10 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      const tanA = Math.tan([30, 45, 60][degIdx] * Math.PI / 180);
      const vol = (edge * edge * edge * Math.SQRT2 * tanA) / 6;
      const frac = vol * 10 - Math.floor(vol * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const tanA = Math.tan(alphaDeg * Math.PI / 180);
      const vol = (edge * edge * edge * Math.SQRT2 * tanA) / 6;
      const numVal = Math.round(vol * 10) / 10;
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp tứ giác đều $S.ABCD$, $AB = ' + edge + '$, góc giữa cạnh bên và mặt phẳng $(ABCD)$ bằng $' + alphaDeg + '^\\circ$. Tính thể tích của khối chóp đã cho (kết quả làm tròn đến hàng phần mười).',
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
          'Gọi $O$ là tâm hình vuông $ABCD \\Rightarrow OA = \\dfrac{' + edge + '\\sqrt{2}}{2}$ và $\\widehat{SAO} = ' + alphaDeg + '^\\circ$.',
          'Chiều cao $SO = OA \\tan ' + alphaDeg + '^\\circ$, diện tích đáy $S_{ABCD} = ' + (edge * edge) + '$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABCD} \\cdot SO \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, degIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39 (15,1)', params: { u: 4, degIdx: 1 }, expectedValid: true },
    ],
  },
};
