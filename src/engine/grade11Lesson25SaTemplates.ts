import { MathTemplate } from '../types/math';

export const G11_B25_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D24 (Q24): Chóp S.ABC đáy đều cạnh u, SA ⊥ (ABC), góc (SB, đáy) = α -> [A, BC, S]
  t11_b25_d24_dihedral_tri_equi_sa: {
    id: 't11_b25_d24_dihedral_tri_equi_sa',
    name: 'Góc phẳng nhị diện [A, BC, S] trong chóp tam giác đều đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABC đáy tam giác đều cạnh u, SA ⊥ (ABC), SB tạo với đáy góc α. Tính số đo góc phẳng nhị diện [A, BC, S].',
    conditionSummary: 'u ∈ [2; 8], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u', min: 2, max: 8 },
      { name: 'degIdx', label: 'Góc giữa SB và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: edge, degIdx } = params;
      if (edge < 2 || edge > 8 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, degIdx } = params;
      const DEGS = [30, 45, 60];
      const alpha = DEGS[degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const tanAHS = (2 * tanAlpha) / Math.sqrt(3);
      const deg = Math.round((Math.atan(tanAHS) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const ahTex = edge % 2 === 0 ? (edge === 2 ? '\\sqrt{3}' : (edge / 2) + '\\sqrt{3}') : '\\dfrac{' + edge + '\\sqrt{3}}{2}';

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều cạnh bằng $' + edge + '$, $SA \\perp (ABC)$. Đường thẳng $SB$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BC, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Góc giữa $SB$ và mặt đáy $(ABC)$ là $\\widehat{SBA} = ' + alpha + '^\\circ \\Rightarrow SA = AB \\cdot \\tan ' + alpha + '^\\circ = ' + edge + '\\tan ' + alpha + '^\\circ$.',
          'Gọi $H$ là trung điểm $BC \\Rightarrow AH \\perp BC$, kết hợp $SA \\perp BC \\Rightarrow SH \\perp BC$, nên $[A, BC, S] = \\widehat{AHS}$.',
          'Ta có $AH = ' + ahTex + '$, suy ra $\\tan \\widehat{AHS} = \\dfrac{SA}{AH} = \\dfrac{' + edge + '\\tan ' + alpha + '^\\circ}{' + ahTex + '} \\Rightarrow \\widehat{AHS} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (63,4)', params: { u: 2, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Chóp S.ABC vuông cân tại A, BC = u, SA ⊥ đáy, (SB, đáy) = α -> [A, BC, S]
  t11_b25_d25_dihedral_tri_iso_right_a_sa: {
    id: 't11_b25_d25_dihedral_tri_iso_right_a_sa',
    name: 'Góc phẳng nhị diện [A, BC, S] trong chóp đáy vuông cân tại A (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABC đáy vuông cân tại A, cạnh huyền BC = u, SA ⊥ (ABC), SB tạo với đáy góc α. Tính [A, BC, S].',
    conditionSummary: 'u ∈ [2; 10], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'u', label: 'Độ dài cạnh huyền BC = u', min: 2, max: 10 },
      { name: 'degIdx', label: 'Góc giữa SB và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: hyp, degIdx } = params;
      if (hyp < 2 || hyp > 10 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: hyp, degIdx } = params;
      const DEGS = [30, 45, 60];
      const alpha = DEGS[degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const tanAHS = Math.SQRT2 * tanAlpha;
      const deg = Math.round((Math.atan(tanAHS) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const abTex = hyp % 2 === 0 ? (hyp / 2) + '\\sqrt{2}' : '\\dfrac{' + hyp + '\\sqrt{2}}{2}';
      const ahTex = hyp % 2 === 0 ? String(hyp / 2) : '\\dfrac{' + hyp + '}{2}';

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông cân tại $A$, $BC = ' + hyp + '$, $SA \\perp (ABC)$. Đường thẳng $SB$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BC, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Góc giữa $SB$ và đáy là $\\widehat{SBA} = ' + alpha + '^\\circ$. Vì $\\triangle ABC$ vuông cân tại $A$ nên $AB = \\dfrac{BC}{\\sqrt{2}} = ' + abTex + '$.',
          'Suy ra $SA = AB \\cdot \\tan ' + alpha + '^\\circ$. Gọi $H$ là trung điểm $BC \\Rightarrow AH = \\dfrac{BC}{2} = ' + ahTex + '$ và $AH \\perp BC$, nên $[A, BC, S] = \\widehat{AHS}$.',
          'Ta có $\\tan \\widehat{AHS} = \\dfrac{SA}{AH} = \\sqrt{2}\\tan ' + alpha + '^\\circ \\Rightarrow \\widehat{AHS} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, degIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (54,7)', params: { u: 5, degIdx: 1 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Chóp S.ABC vuông tại A, biết AB, AC, SA ⊥ đáy, (SC, đáy) = α -> [A, BC, S]
  t11_b25_d26_dihedral_tri_right_a_legs_sa: {
    id: 't11_b25_d26_dihedral_tri_right_a_legs_sa',
    name: 'Góc phẳng nhị diện [A, BC, S] biết hai cạnh góc vuông đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABC đáy vuông tại A biết AB = u, AC = v, SA ⊥ (ABC), SC tạo với đáy góc α. Tính [A, BC, S].',
    conditionSummary: 'u ∈ [2; 7], v ∈ [2; 7], degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh AB = u', min: 2, max: 7 },
      { name: 'v', label: 'Cạnh AC = v', min: 2, max: 7 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: ab, v: ac, degIdx } = params;
      if (ab < 2 || ab > 7 || ac < 2 || ac > 7 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const tanAlpha = Math.tan(([30, 45, 60][degIdx] * Math.PI) / 180);
      const tanAHS = (Math.sqrt(ab * ab + ac * ac) * tanAlpha) / ab;
      const deg = Math.atan(tanAHS) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: ac, degIdx } = params;
      const alpha = [30, 45, 60][degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const bc = Math.sqrt(ab * ab + ac * ac);
      const tanAHS = (bc * tanAlpha) / ab;
      const deg = Math.round((Math.atan(tanAHS) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $A$, $AB = ' + ab + '$, $AC = ' + ac + '$, $SA \\perp (ABC)$. Đường thẳng $SC$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BC, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Góc giữa $SC$ và đáy là $\\widehat{SCA} = ' + alpha + '^\\circ \\Rightarrow SA = AC \\cdot \\tan ' + alpha + '^\\circ = ' + ac + '\\tan ' + alpha + '^\\circ$.',
          'Dựng $AH \\perp BC$. Do $SA \\perp BC$ nên $BC \\perp (SAH) \\Rightarrow SH \\perp BC$, suy ra $[A, BC, S] = \\widehat{AHS}$.',
          'Ta có $AH = \\dfrac{AB \\cdot AC}{\\sqrt{AB^2 + AC^2}}$, suy ra $\\tan \\widehat{AHS} = \\dfrac{SA}{AH} = \\dfrac{\\sqrt{' + ab + '^2 + ' + ac + '^2}\\tan ' + alpha + '^\\circ}{' + ab + '} \\Rightarrow \\widehat{AHS} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, v: 3, degIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (54,7)', params: { u: 3, v: 3, degIdx: 1 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Chóp S.ABC vuông tại A biết AB và cạnh huyền BC, (SC, đáy) = α -> [A, BC, S]
  t11_b25_d27_dihedral_tri_right_a_hyp_sa: {
    id: 't11_b25_d27_dihedral_tri_right_a_hyp_sa',
    name: 'Góc phẳng nhị diện [A, BC, S] biết cạnh góc vuông AB và cạnh huyền BC (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABC đáy vuông tại A, AB = u, BC = c, SA ⊥ (ABC), SC tạo với đáy góc α. Tính [A, BC, S].',
    conditionSummary: 'u ∈ [2; 6], c ∈ [3; 10], c > u, degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh góc vuông AB = u', min: 2, max: 6 },
      { name: 'c', label: 'Cạnh huyền BC = c', min: 3, max: 10 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: ab, c: bc, degIdx } = params;
      if (ab < 2 || ab > 6 || bc < 3 || bc > 10 || bc <= ab || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Cạnh huyền BC phải lớn hơn AB' };
      }
      const tanAlpha = Math.tan(([30, 45, 60][degIdx] * Math.PI) / 180);
      const deg = Math.atan((bc * tanAlpha) / ab) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, c: bc, degIdx } = params;
      const alpha = [30, 45, 60][degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const deg = Math.round((Math.atan((bc * tanAlpha) / ab) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');

      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const acTex = rad(bc * bc - ab * ab);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $A$, $AB = ' + ab + '$, $BC = ' + bc + '$, $SA \\perp (ABC)$. Đường thẳng $SC$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BC, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Ta có $AC = \\sqrt{BC^2 - AB^2} = ' + acTex + '$. Góc giữa $SC$ và đáy là $\\widehat{SCA} = ' + alpha + '^\\circ \\Rightarrow SA = AC \\cdot \\tan ' + alpha + '^\\circ$.',
          'Dựng $AH \\perp BC$. Vì $SA \\perp BC$ nên $BC \\perp (SAH) \\Rightarrow SH \\perp BC$, suy ra $[A, BC, S] = \\widehat{AHS}$.',
          'Với $AH = \\dfrac{AB \\cdot AC}{BC}$, ta được $\\tan \\widehat{AHS} = \\dfrac{SA}{AH} = \\dfrac{BC \\cdot \\tan ' + alpha + '^\\circ}{AB} = \\dfrac{' + bc + '\\tan ' + alpha + '^\\circ}{' + ab + '} \\Rightarrow \\widehat{AHS} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên BC ≤ AB (u=5, c=4)', params: { u: 5, c: 4, degIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (49,1)', params: { u: 2, c: 4, degIdx: 0 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Chóp S.ABC vuông cân tại B, AC = u, SA ⊥ (ABC), (SC, đáy) = α -> [A, BC, S]
  t11_b25_d28_dihedral_tri_iso_right_b_sa: {
    id: 't11_b25_d28_dihedral_tri_iso_right_b_sa',
    name: 'Góc phẳng nhị diện [A, BC, S] trong chóp đáy vuông cân tại B (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABC đáy vuông cân tại B, AC = u, SA ⊥ (ABC), SC tạo với đáy góc α. Tính [A, BC, S].',
    conditionSummary: 'u ∈ [2; 9], degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'u', label: 'Độ dài cạnh huyền AC = u', min: 2, max: 9 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: ac, degIdx } = params;
      if (ac < 2 || ac > 9 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ac, degIdx } = params;
      const alpha = [30, 45, 60][degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const deg = Math.round((Math.atan(Math.SQRT2 * tanAlpha) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const abTex = ac % 2 === 0 ? (ac / 2) + '\\sqrt{2}' : '\\dfrac{' + ac + '\\sqrt{2}}{2}';

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông cân tại $B$, $AC = ' + ac + '$, $SA \\perp (ABC)$. Đường thẳng $SC$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BC, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Vì $\\triangle ABC$ vuông cân tại $B$ nên $BC = AB = \\dfrac{AC}{\\sqrt{2}} = ' + abTex + '$.',
          'Góc giữa $SC$ và đáy là $\\widehat{SCA} = ' + alpha + '^\\circ \\Rightarrow SA = AC \\cdot \\tan ' + alpha + '^\\circ = ' + ac + '\\tan ' + alpha + '^\\circ$.',
          'Vì $AB \\perp BC$ và $SA \\perp BC \\Rightarrow BC \\perp (SAB) \\Rightarrow SB \\perp BC$, nên $[A, BC, S] = \\widehat{ABS}$.',
          'Suy ra $\\tan \\widehat{ABS} = \\dfrac{SA}{AB} = \\sqrt{2}\\tan ' + alpha + '^\\circ \\Rightarrow \\widehat{ABS} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (67,8)', params: { u: 3, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Chóp S.ABC vuông tại C, AB = c, BC = u, SA ⊥ đáy, (SB, đáy) = α -> [A, BC, S]
  t11_b25_d29_dihedral_tri_right_c_sa: {
    id: 't11_b25_d29_dihedral_tri_right_c_sa',
    name: 'Góc phẳng nhị diện [A, BC, S] trong chóp đáy vuông tại C (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABC đáy vuông tại C biết cạnh huyền AB = c, BC = u, SA ⊥ (ABC), SB tạo với đáy góc α. Tính [A, BC, S].',
    conditionSummary: 'u ∈ [2; 6], c ∈ [3; 10], c > u, degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh góc vuông BC = u', min: 2, max: 6 },
      { name: 'c', label: 'Cạnh huyền AB = c', min: 3, max: 10 },
      { name: 'degIdx', label: 'Góc giữa SB và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: bc, c: ab, degIdx } = params;
      if (bc < 2 || bc > 6 || ab < 3 || ab > 10 || ab <= bc || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Cạnh huyền AB phải lớn hơn BC' };
      }
      const ac = Math.sqrt(ab * ab - bc * bc);
      const tanAlpha = Math.tan(([30, 45, 60][degIdx] * Math.PI) / 180);
      const deg = Math.atan((ab * tanAlpha) / ac) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: bc, c: ab, degIdx } = params;
      const alpha = [30, 45, 60][degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const ac2 = ab * ab - bc * bc;
      const ac = Math.sqrt(ac2);
      const deg = Math.round((Math.atan((ab * tanAlpha) / ac) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');

      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const acTex = rad(ac2);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $C$, $AB = ' + ab + '$, $BC = ' + bc + '$, $SA \\perp (ABC)$. Đường thẳng $SB$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BC, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Ta có $AC = \\sqrt{AB^2 - BC^2} = ' + acTex + '$. Góc giữa $SB$ và đáy là $\\widehat{SBA} = ' + alpha + '^\\circ \\Rightarrow SA = AB \\cdot \\tan ' + alpha + '^\\circ = ' + ab + '\\tan ' + alpha + '^\\circ$.',
          'Vì $AC \\perp BC$ và $SA \\perp BC \\Rightarrow BC \\perp (SAC) \\Rightarrow SC \\perp BC$, nên $[A, BC, S] = \\widehat{ACS}$.',
          'Suy ra $\\tan \\widehat{ACS} = \\dfrac{SA}{AC} = \\dfrac{' + ab + '\\tan ' + alpha + '^\\circ}{' + acTex + '} \\Rightarrow \\widehat{ACS} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên AB ≤ BC (u=5, c=4)', params: { u: 5, c: 4, degIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (37,8)', params: { u: 4, c: 6, degIdx: 0 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Chóp S.ABCD vuông cạnh u, SA ⊥ (ABCD), (SC, đáy) = α -> [A, BC, S]
  t11_b25_d30_dihedral_sq_a_bc_s_sa: {
    id: 't11_b25_d30_dihedral_sq_a_bc_s_sa',
    name: 'Góc phẳng nhị diện [A, BC, S] trong chóp đáy vuông (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABCD đáy vuông cạnh u, SA ⊥ (ABCD), cạnh bên SC tạo với đáy góc α. Tính [A, BC, S].',
    conditionSummary: 'u ∈ [2; 8], degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy hình vuông u', min: 2, max: 8 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: edge, degIdx } = params;
      if (edge < 2 || edge > 8 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, degIdx } = params;
      const alpha = [30, 45, 60][degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const deg = Math.round((Math.atan(Math.SQRT2 * tanAlpha) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $AB = ' + edge + '$, $SA \\perp (ABCD)$. Cạnh bên $SC$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BC, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Ta có $AC = ' + edge + '\\sqrt{2}$. Góc giữa $SC$ và đáy là $\\widehat{SCA} = ' + alpha + '^\\circ \\Rightarrow SA = AC \\cdot \\tan ' + alpha + '^\\circ = ' + edge + '\\sqrt{2}\\tan ' + alpha + '^\\circ$.',
          'Do $BC \\perp AB$ và $BC \\perp SA \\Rightarrow BC \\perp (SAB) \\Rightarrow BC \\perp SB$, nên $[A, BC, S] = \\widehat{SBA}$.',
          'Suy ra $\\tan \\widehat{SBA} = \\dfrac{SA}{AB} = \\sqrt{2}\\tan ' + alpha + '^\\circ \\Rightarrow \\widehat{SBA} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (67,8)', params: { u: 3, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Chóp S.ABCD vuông cạnh u, SA ⊥ (ABCD), (SC, đáy) = α -> [A, BD, S]
  t11_b25_d31_dihedral_sq_a_bd_s_sa: {
    id: 't11_b25_d31_dihedral_sq_a_bd_s_sa',
    name: 'Góc phẳng nhị diện [A, BD, S] trong chóp đáy vuông (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABCD đáy vuông cạnh u, SA ⊥ (ABCD), cạnh bên SC tạo với đáy góc α. Tính [A, BD, S].',
    conditionSummary: 'u ∈ [2; 8], degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy hình vuông u', min: 2, max: 8 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: edge, degIdx } = params;
      if (edge < 2 || edge > 8 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, degIdx } = params;
      const alpha = [30, 45, 60][degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const deg = Math.round((Math.atan(2 * tanAlpha) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const aoTex = edge % 2 === 0 ? (edge / 2) + '\\sqrt{2}' : '\\dfrac{' + edge + '\\sqrt{2}}{2}';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $AB = ' + edge + '$, $SA \\perp (ABCD)$. Cạnh bên $SC$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BD, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', center: 'O' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Ta có $AC = ' + edge + '\\sqrt{2}$. Góc giữa $SC$ và đáy là $\\widehat{SCA} = ' + alpha + '^\\circ \\Rightarrow SA = ' + edge + '\\sqrt{2}\\tan ' + alpha + '^\\circ$.',
          'Gọi $O$ là trung điểm $AC$, khi đó $AO = ' + aoTex + '$, $BD \\perp AO$ và $BD \\perp SA \\Rightarrow BD \\perp SO$, nên $[A, BD, S] = \\widehat{SOA}$.',
          'Suy ra $\\tan \\widehat{SOA} = \\dfrac{SA}{AO} = 2\\tan ' + alpha + '^\\circ \\Rightarrow \\widehat{SOA} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, degIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (63,4)', params: { u: 4, degIdx: 1 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Chóp S.ABCD chữ nhật, AB = u, BC = v, SA ⊥ đáy, (SC, đáy) = α -> [A, BC, S]
  t11_b25_d32_dihedral_rect_a_bc_s_sa: {
    id: 't11_b25_d32_dihedral_rect_a_bc_s_sa',
    name: 'Góc phẳng nhị diện [A, BC, S] trong chóp đáy chữ nhật (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABCD đáy hình chữ nhật AB = u, BC = v, SA ⊥ (ABCD), SC tạo với đáy góc α. Tính [A, BC, S].',
    conditionSummary: 'u ∈ [2; 7], v ∈ [2; 7], u ≠ v, degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh AB = u', min: 2, max: 7 },
      { name: 'v', label: 'Cạnh BC = v', min: 2, max: 7 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: ab, v: bc, degIdx } = params;
      if (ab < 2 || ab > 7 || bc < 2 || bc > 7 || ab === bc || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc AB = BC' };
      }
      const tanAlpha = Math.tan(([30, 45, 60][degIdx] * Math.PI) / 180);
      const deg = Math.atan((Math.sqrt(ab * ab + bc * bc) * tanAlpha) / ab) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: bc, degIdx } = params;
      const alpha = [30, 45, 60][degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const ac2 = ab * ab + bc * bc;
      const deg = Math.round((Math.atan((Math.sqrt(ac2) * tanAlpha) / ab) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');

      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const acTex = rad(ac2);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $AB = ' + ab + '$, $BC = ' + bc + '$, $SA \\perp (ABCD)$. Cạnh bên $SC$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BC, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Ta có $AC = \\sqrt{AB^2 + BC^2} = ' + acTex + '$. Góc giữa $SC$ và đáy là $\\widehat{SCA} = ' + alpha + '^\\circ \\Rightarrow SA = AC \\cdot \\tan ' + alpha + '^\\circ$.',
          'Vì $BC \\perp AB$ và $BC \\perp SA \\Rightarrow BC \\perp (SAB) \\Rightarrow BC \\perp SB$, nên $[A, BC, S] = \\widehat{ABS}$.',
          'Suy ra $\\tan \\widehat{ABS} = \\dfrac{SA}{AB} = \\dfrac{' + acTex + '\\tan ' + alpha + '^\\circ}{' + ab + '} \\Rightarrow \\widehat{ABS} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = v = 4', params: { u: 4, v: 4, degIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (36,5)', params: { u: 5, v: 4, degIdx: 0 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Chóp S.ABCD chữ nhật, AB = u, BC = v, SA ⊥ đáy, (SC, đáy) = α -> [A, BD, S]
  t11_b25_d33_dihedral_rect_a_bd_s_sa: {
    id: 't11_b25_d33_dihedral_rect_a_bd_s_sa',
    name: 'Góc phẳng nhị diện [A, BD, S] trong chóp đáy chữ nhật (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABCD đáy hình chữ nhật AB = u, BC = v, SA ⊥ (ABCD), SC tạo với đáy góc α. Tính [A, BD, S].',
    conditionSummary: 'u ∈ [2; 7], v ∈ [2; 7], u ≠ v, degIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh AB = u', min: 2, max: 7 },
      { name: 'v', label: 'Cạnh BC = v', min: 2, max: 7 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: ab, v: bc, degIdx } = params;
      if (ab < 2 || ab > 7 || bc < 2 || bc > 7 || ab === bc || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc AB = BC' };
      }
      const tanAlpha = Math.tan(([30, 45, 60][degIdx] * Math.PI) / 180);
      const deg = Math.atan(((ab * ab + bc * bc) * tanAlpha) / (ab * bc)) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: bc, degIdx } = params;
      const alpha = [30, 45, 60][degIdx];
      const tanAlpha = Math.tan((alpha * Math.PI) / 180);
      const ac2 = ab * ab + bc * bc;
      const deg = Math.round((Math.atan((ac2 * tanAlpha) / (ab * bc)) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');

      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const acTex = rad(ac2);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $AB = ' + ab + '$, $BC = ' + bc + '$, $SA \\perp (ABCD)$. Cạnh bên $SC$ tạo với đáy một góc $' + alpha + '^\\circ$. Tính số đo góc phẳng nhị diện $[A, BD, S]$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Ta có $AC = BD = ' + acTex + '$, $SA = AC \\cdot \\tan ' + alpha + '^\\circ$. Gọi $H$ là hình chiếu của $A$ trên $BD \\Rightarrow AH = \\dfrac{AB \\cdot BC}{BD} = \\dfrac{' + (ab * bc) + '}{' + acTex + '}$.',
          'Do $AH \\perp BD$ và $SA \\perp BD \\Rightarrow BD \\perp (SAH)$, nên $[A, BD, S] = \\widehat{AHS}$.',
          'Suy ra $\\tan \\widehat{AHS} = \\dfrac{SA}{AH} = \\dfrac{' + ac2 + '\\tan ' + alpha + '^\\circ}{' + (ab * bc) + '} \\Rightarrow \\widehat{AHS} \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = v = 3', params: { u: 3, v: 3, degIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (55,3)', params: { u: 2, v: 4, degIdx: 0 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Chóp S.ABCD vuông cạnh u, SA = h, SA ⊥ đáy -> [B, SC, D] (làm tròn hàng đơn vị)
  t11_b25_d34_dihedral_sq_b_sc_d_sa: {
    id: 't11_b25_d34_dihedral_sq_b_sc_d_sa',
    name: 'Góc phẳng nhị diện [B, SC, D] giữa hai mặt bên đối (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho chóp S.ABCD đáy hình vuông cạnh u, SA = h, SA ⊥ (ABCD). Tính góc phẳng nhị diện [B, SC, D] làm tròn đến hàng đơn vị.',
    conditionSummary: 'u ∈ [2; 7], h ∈ [3; 12], tránh ranh giới .5 độ',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy hình vuông u', min: 2, max: 7 },
      { name: 'h', label: 'Độ dài đường cao SA = h', min: 3, max: 12 },
    ],
    validateCode: `
      const { u: edge, h } = params;
      if (edge < 2 || edge > 7 || h < 3 || h > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const cosV = -(edge * edge) / (h * h + edge * edge);
      const deg = Math.acos(cosV) * 180 / Math.PI;
      const frac = deg - Math.floor(deg);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .5 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h } = params;
      const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
      const sb2 = h * h + edge * edge;
      const sc2 = sb2 + edge * edge;
      const cosV = -(edge * edge) / sb2;
      const deg = Math.round((Math.acos(cosV) * 180 / Math.PI));
      const g = gcd(edge * edge, sb2);
      const cN = (edge * edge) / g, cD = sb2 / g;
      const cosTex = '-\\dfrac{' + cN + '}{' + cD + '}';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $AB = ' + edge + '$, $SA = ' + h + '$, $SA \\perp (ABCD)$. Tính số đo góc phẳng nhị diện $[B, SC, D]$ (kết quả làm tròn đến hàng đơn vị).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        shortAnswer: String(deg),
        numericValue: deg,
        answerSummary: String(deg) + '°',
        solutionSteps: [
          'Ta có $BD = ' + edge + '\\sqrt{2}$, $SB = \\sqrt{SA^2 + AB^2} = \\sqrt{' + sb2 + '}$, $SC = \\sqrt{SB^2 + BC^2} = \\sqrt{' + sc2 + '}$.',
          'Gọi $I$ là hình chiếu của $B$ trên $SC \\Rightarrow BI = DI = \\dfrac{SB \\cdot BC}{SC} = \\dfrac{' + edge + '\\sqrt{' + sb2 + '}}{\\sqrt{' + sc2 + '}}$, nên $[B, SC, D] = \\widehat{BID}$.',
          'Suy ra $\\cos \\widehat{BID} = \\dfrac{BI^2 + DI^2 - BD^2}{2 \\cdot BI \\cdot DI} = ' + cosTex + ' \\Rightarrow \\widehat{BID} \\approx ' + deg + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, h: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (94)', params: { u: 2, h: 7 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Lăng trụ đều ABC.A'B'C' cạnh đáy s·a, cạnh bên h·a -> [A, B'C', A']
  t11_b25_d35_reg_prism_dihedral_sa: {
    id: 't11_b25_d35_reg_prism_dihedral_sa',
    name: 'Góc phẳng nhị diện [A, B\'C\', A\'] trong lăng trụ tam giác đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho lăng trụ đều ABC.A\'B\'C\' cạnh đáy s·a, cạnh bên h·a. Tính số đo góc nhị diện [A, B\'C\', A\'] (đơn vị độ, làm tròn hàng phần mười).',
    conditionSummary: 's ∈ [2; 8], h ∈ [1; 6], tránh ranh giới .05 độ',
    paramSpecs: [
      { name: 's', label: 'Hệ số cạnh đáy s·a', min: 2, max: 8 },
      { name: 'h', label: 'Hệ số cạnh bên h·a', min: 1, max: 6 },
    ],
    validateCode: `
      const { s, h } = params;
      if (s < 2 || s > 8 || h < 1 || h > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const tanV = (2 * h) / (s * Math.sqrt(3));
      const deg = Math.atan(tanV) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s, h } = params;
      const tanV = (2 * h) / (s * Math.sqrt(3));
      const cosV = (s * Math.sqrt(3)) / Math.sqrt(3 * s * s + 4 * h * h);
      const deg = Math.round((Math.atan(tanV) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const cosApprox = cosV.toFixed(4).replace('.', ',');
      const hTex = h === 1 ? 'a' : h + 'a';

      return {
        stem: "Cho hình lăng trụ đều $ABC.A'B'C'$ có cạnh đáy bằng $" + s + "a$, cạnh bên bằng $" + hTex + "$. Tính số đo của góc nhị diện $[A, B'C', A']$ (kết quả làm tròn đến hàng phần mười, đơn vị độ).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          "Gọi $M$ là trung điểm của $B'C'$. Ta có $A'M \\perp B'C'$ và $AM \\perp B'C'$, nên góc phẳng của nhị diện $[A, B'C', A']$ là $\\widehat{AMA'}$.",
          "Trong tam giác vuông $AA'M$ vuông tại $A'$, ta có $A'M = \\dfrac{\\sqrt{3}}{2} \\cdot " + s + "a$, $AA' = " + hTex + "$.",
          "Do đó $\\cos \\widehat{AMA'} = \\dfrac{A'M}{AM} = \\dfrac{" + s + "\\sqrt{3}}{\\sqrt{3\\cdot " + s + "^2 + 4\\cdot " + h + "^2}} \\approx " + cosApprox + "$ (hay $\\tan \\widehat{AMA'} = \\dfrac{" + (2 * h) + "}{" + s + "\\sqrt{3}}$), suy ra $\\widehat{AMA'} \\approx " + ansStr + "^\\circ$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên s = 1', params: { s: 1, h: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn s=4, h=1 (16,1°)', params: { s: 4, h: 1 }, expectedValid: true },
    ],
  },
};
