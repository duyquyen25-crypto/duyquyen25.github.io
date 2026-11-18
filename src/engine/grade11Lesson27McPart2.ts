import { MathTemplate } from '../types/math';

export const G11_B27_MC_PART2: Record<string, MathTemplate> = {
  // D13 (Q13): Chóp S.ABCD đáy chữ nhật AB=√q·a, AD=v·a, SA=h·a
  t11_b27_d13_rect_pyr_sa_vol_mc: {
    id: 't11_b27_d13_rect_pyr_sa_vol_mc',
    name: 'Thể tích khối chóp đáy hình chữ nhật có SA ⊥ (ABCD)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy chữ nhật AB = √q·a, AD = v·a, SA ⊥ (ABCD), SA = h·a. Tính thể tích V.',
    conditionSummary: 'q ∈ [2; 15], v ∈ [1; 6], h ∈ [2; 9]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh AB: q (AB = √q·a)', min: 2, max: 15 },
      { name: 'v', label: 'Độ dài AD = v·a', min: 1, max: 6 },
      { name: 'h', label: 'Chiều cao SA = h·a', min: 2, max: 9 },
    ],
    validateCode: `
      const { q, v, h } = params;
      if (q < 2 || q > 15 || v < 1 || v > 6 || h < 2 || h > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, v, h } = params;
      const fmtRadA3 = (coeff, radN, den) => {
        let out = 1, rem = radN;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        const total = coeff * out;
        const g = u.gcd(total, den);
        const n = total / g, d = den / g;
        const sq = rem === 1 ? '' : '\\sqrt{' + rem + '}';
        const numStr = rem === 1 ? n + ' a^3' : (n === 1 ? sq + ' a^3' : n + ' ' + sq + ' a^3');
        return d === 1 ? '$V = ' + numStr + '$' : '$V = \\frac{' + numStr + '}{' + d + '}$';
      };

      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const abTex = rad(q);
      const adStr = v === 1 ? 'a' : v + 'a';
      const vh = v * h;
      const correct = fmtRadA3(vh, q, 3);
      const wrongs = [
        fmtRadA3(vh, q, 2),
        fmtRadA3(vh, q, 1),
        fmtRadA3(2 * vh, q, 1),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtRadA3(vh + idx * 3, q, 3)
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật với $AB = ' + abTex + 'a$, $AD = ' + adStr + '$. Biết $SA \\perp (ABCD)$ và $SA = ' + h + 'a$. Thể tích $V$ của khối chóp $S.ABCD$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích hình chữ nhật đáy là $S_{ABCD} = AB \\cdot AD = ' + (v === 1 ? abTex : v + abTex) + 'a^2$.',
          'Thể tích khối chóp: $V = \\dfrac{1}{3} S_{ABCD} \\cdot SA = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { q: 1, v: 1, h: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (2√10 a³/3)', params: { q: 10, v: 1, h: 2 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Chóp S.ABCD đáy chữ nhật AB=k√2·a, AD=√p·a, SB=c·a
  t11_b27_d14_rect_pyr_sb_vol_mc: {
    id: 't11_b27_d14_rect_pyr_sb_vol_mc',
    name: 'Thể tích khối chóp đáy chữ nhật biết cạnh bên SB',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy chữ nhật AB = k√2·a, AD = √p·a, SA ⊥ (ABCD), SB = c·a. Tính thể tích V.',
    conditionSummary: 'k ∈ [1; 4], p ∈ [2; 11], c ∈ [2; 9], c² > 2k²',
    paramSpecs: [
      { name: 'k', label: 'Hệ số AB = k√2·a', min: 1, max: 4 },
      { name: 'p', label: 'Bình phương AD: p (AD = √p·a)', min: 2, max: 11 },
      { name: 'c', label: 'Độ dài cạnh bên SB = c·a', min: 2, max: 9 },
    ],
    validateCode: `
      const { k, p, c } = params;
      if (k < 1 || k > 4 || p < 2 || p > 11 || c < 2 || c > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (c * c <= 2 * k * k) {
        return { valid: false, reason: 'Cần SB > AB (c² > 2k²)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, p, c } = params;
      const fmtRadA3 = (coeff, radN, den) => {
        let out = 1, rem = radN;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        const total = coeff * out;
        const g = u.gcd(total, den);
        const n = total / g, d = den / g;
        const sq = rem === 1 ? '' : '\\sqrt{' + rem + '}';
        const numStr = rem === 1 ? n + ' a^3' : (n === 1 ? sq + ' a^3' : n + ' ' + sq + ' a^3');
        return d === 1 ? '$V = ' + numStr + '$' : '$V = \\frac{' + numStr + '}{' + d + '}$';
      };
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };

      const saSq = c * c - 2 * k * k;
      const radTot = 2 * p * saSq;
      const abTex = k === 1 ? '\\sqrt{2}' : k + '\\sqrt{2}';
      const adTex = rad(p), saTex = rad(saSq);

      const correct = fmtRadA3(k, radTot, 3);
      const wrongs = [
        fmtRadA3(2 * k, radTot, 1),
        fmtRadA3(k, radTot, 1),
        fmtRadA3(k, radTot, 2),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtRadA3(k + idx, radTot, 3)
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật với $AB = ' + abTex + 'a$, $AD = ' + adTex + 'a$. Biết $SA \\perp (ABCD)$ và $SB = ' + c + 'a$. Thể tích $V$ của khối chóp $S.ABCD$ là',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vBR: 'D', vFR: 'C', vFL: 'B' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong $\\triangle SAB$ vuông tại $A$: $SA = \\sqrt{SB^2 - AB^2} = ' + saTex + 'a$.',
          'Diện tích đáy $S_{ABCD} = AB \\cdot AD = ' + abTex + 'a \\cdot ' + adTex + 'a$.',
          'Thể tích khối chóp $V = \\dfrac{1}{3} S_{ABCD} \\cdot SA = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên SB ≤ AB (k=3, c=4)', params: { k: 3, p: 3, c: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (8√3 a³/3)', params: { k: 2, p: 3, c: 4 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Chóp S.ABC đáy đều cạnh u·a, SA ⊥ (ABC), góc (SC, đáy) = α -> V
  t11_b27_d15_tri_pyr_equi_angle_vol_mc: {
    id: 't11_b27_d15_tri_pyr_equi_angle_vol_mc',
    name: 'Thể tích khối chóp đáy tam giác đều biết góc giữa cạnh bên và đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABC đáy đều cạnh u·a, SA ⊥ (ABC), góc giữa SC và đáy bằng α. Tính thể tích V.',
    conditionSummary: 'u ∈ [1; 6], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy u (AB = u·a)', min: 1, max: 6 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u: edge, degIdx } = params;
      if (edge < 1 || edge > 6 || degIdx < 0 || degIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, degIdx } = params;
      const degs = [30, 45, 60];
      const alpha = degs[degIdx];
      // V = u^3 * sqrt(3) * tan(alpha) / 12
      // For alpha=30: tan=1/sqrt(3) -> u^3 / 12
      // For alpha=45: tan=1 -> u^3 sqrt(3) / 12
      // For alpha=60: tan=sqrt(3) -> u^3 * 3 / 12 = u^3 / 4
      const fmtRadA3 = (num, radN, den) => {
        const f = u.simplifyFrac(num, den);
        if (radN === 1) return '$V = ' + f.latex + 'a^3$';
        const sq = '\\sqrt{' + radN + '}';
        const numStr = (f.num === 1 ? '' : f.num + ' ') + sq + ' a^3';
        return f.isInteger ? '$V = ' + numStr + '$' : '$V = \\frac{' + numStr + '}{' + f.den + '}$';
      };

      const u3 = edge * edge * edge;
      const cRad = alpha === 45 ? 3 : 1;
      const cNum = alpha === 60 ? 3 * u3 : u3;
      const cDen = 12;

      const correct = fmtRadA3(cNum, cRad, cDen);
      const wrongs = [
        fmtRadA3(cNum * 3, cRad, cDen * 2),
        fmtRadA3(cNum * 3, cRad, cDen),
        fmtRadA3(cNum, cRad, cDen * 2),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtRadA3(cNum + idx, cRad, cDen)
      );

      const abStr = edge === 1 ? '1a' : edge + 'a';
      const saExpr = alpha === 30 ? '\\frac{' + (edge === 1 ? '' : edge) + '\\sqrt{3}}{3}a' : (alpha === 45 ? (edge === 1 ? 'a' : edge + 'a') : (edge === 1 ? '\\sqrt{3}a' : edge + '\\sqrt{3}a'));

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều cạnh bằng $' + abStr + '$, $SA \\perp (ABC)$. Góc giữa cạnh $SC$ và đáy bằng $' + alpha + '^\\circ$. Tính thể tích $V$ của khối chóp đã cho.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Góc giữa $SC$ và đáy $(ABC)$ là $\\widehat{SCA} = ' + alpha + '^\\circ \\Rightarrow SA = AC \\cdot \\tan ' + alpha + '^\\circ = ' + saExpr + '$.',
          'Diện tích đáy là $S_{ABC} = \\dfrac{(' + (edge === 1 ? 'a' : edge + 'a') + ')^2\\sqrt{3}}{4}$.',
          'Thể tích khối chóp là $V = \\dfrac{1}{3} S_{ABC} \\cdot SA = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên degIdx = 3', params: { u: 1, degIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (a³/4)', params: { u: 1, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Chóp S.ABCD đáy chữ nhật, SD ⊥ (ABCD), DA = v·a, DB = √p·a, (SC, AB) = 45° -> V
  t11_b27_d16_rect_pyr_angle_skew_vol_mc: {
    id: 't11_b27_d16_rect_pyr_angle_skew_vol_mc',
    name: 'Thể tích khối chóp đáy chữ nhật biết góc giữa SC và AB',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Thể tích',
    description: 'Cho chóp S.ABCD đáy chữ nhật, SD ⊥ (ABCD), DA = v·a, DB = √p·a, góc giữa SC và AB bằng 45°. Tính thể tích V.',
    conditionSummary: 'v ∈ [2; 8], dc ∈ [3; 9] (với DB = √(v²+dc²)·a)',
    paramSpecs: [
      { name: 'v', label: 'Độ dài DA = v·a', min: 2, max: 8 },
      { name: 'dc', label: 'Độ dài DC = dc·a', min: 3, max: 9 },
    ],
    validateCode: `
      const { v: da, dc } = params;
      if (da < 2 || da > 8 || dc < 3 || dc > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v: da, dc } = params;
      const p = da * da + dc * dc;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const dbTex = rad(p);
      const prod = da * dc * dc;
      const fAns = u.simplifyFrac(prod, 3);
      const fW1 = u.simplifyFrac(prod, 6);
      const fW2 = u.simplifyFrac(prod, 1);
      const fW3 = u.simplifyFrac(prod, 2);

      const correct = '$' + fAns.latex + 'a^3$';
      const wrongs = [
        '$' + fW1.latex + 'a^3$',
        '$' + fW2.latex + 'a^3$',
        '$' + fW3.latex + 'a^3$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + u.simplifyFrac(prod + idx * 3, 3).latex + 'a^3$'
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SD \\perp (ABCD)$, $DA = ' + da + 'a$, $DB = ' + dbTex + 'a$. Góc giữa hai đường thẳng $SC$ và $AB$ bằng $45^\\circ$. Tính thể tích của khối chóp $S.ABCD$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'D', vBR: 'C', vFR: 'B', vFL: 'A' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $AB = DC = \\sqrt{DB^2 - DA^2} = \\sqrt{' + p + 'a^2 - ' + (da * da) + 'a^2} = ' + dc + 'a$.',
          'Vì $AB \\parallel DC$ nên góc $(SC, AB) = (SC, DC) = \\widehat{SCD} = 45^\\circ \\Rightarrow SD = DC \\tan 45^\\circ = ' + dc + 'a$.',
          'Thể tích khối chóp $S.ABCD$: $V = \\dfrac{1}{3} DA \\cdot AB \\cdot SD = \\dfrac{1}{3} \\cdot ' + da + 'a \\cdot ' + dc + 'a \\cdot ' + dc + 'a = ' + fAns.latex + 'a^3$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v = 1', params: { v: 1, dc: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (196/3 a³)', params: { v: 4, dc: 7 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Thể tích khối lăng trụ biết diện tích đáy B và chiều cao h
  t11_b27_d17_prism_vol_bh_mc: {
    id: 't11_b27_d17_prism_vol_bh_mc',
    name: 'Thể tích khối lăng trụ biết diện tích đáy và chiều cao',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho khối lăng trụ có diện tích đáy B và chiều cao h. Tính thể tích V.',
    conditionSummary: 'b ∈ [4; 20], h ∈ [3; 16]',
    paramSpecs: [
      { name: 'b', label: 'Diện tích đáy B', min: 4, max: 20 },
      { name: 'h', label: 'Chiều cao h', min: 3, max: 16 },
    ],
    validateCode: `
      const { b, h } = params;
      if (b < 4 || b > 20 || h < 3 || h > 16) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, h } = params;
      const vol = b * h;
      const fW1 = u.simplifyFrac(vol, 3);
      const fW2 = u.simplifyFrac(vol, 2);
      const diff = Math.abs(b - h) || 6;

      const correct = '$V = ' + vol + '$';
      const wrongs = [
        '$V = ' + fW1.latex + '$',
        '$V = ' + diff + '$',
        '$V = ' + fW2.latex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$V = ' + (vol + idx * 5) + '$'
      );

      return {
        stem: 'Cho khối lăng trụ có diện tích đáy bằng $' + b + '$ và chiều cao bằng $' + h + '$. Tính thể tích $V$ của khối lăng trụ đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức thể tích khối lăng trụ: $V = B \\cdot h = ' + b + ' \\cdot ' + h + ' = ' + vol + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 3', params: { b: 3, h: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (V = 80)', params: { b: 8, h: 10 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Lăng trụ đáy tam giác đều cạnh u và chiều cao h
  t11_b27_d18_prism_vol_equi_h_mc: {
    id: 't11_b27_d18_prism_vol_equi_h_mc',
    name: 'Thể tích khối lăng trụ đáy tam giác đều biết cạnh và chiều cao',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho hình lăng trụ có đáy là tam giác đều cạnh u và chiều cao h. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 9], h ∈ [2; 12]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u', min: 2, max: 9 },
      { name: 'h', label: 'Chiều cao h', min: 2, max: 12 },
    ],
    validateCode: `
      const { u: edge, h } = params;
      if (edge < 2 || edge > 9 || h < 2 || h > 12) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h } = params;
      const fmtSqrt3 = (num, den) => {
        const f = u.simplifyFrac(num, den);
        if (f.isInteger) return '$V = ' + (f.num === 1 ? '' : f.num) + ' \\sqrt{3}$';
        return '$V = \\frac{' + f.num + '}{' + f.den + '}\\sqrt{3}$';
      };
      const u2h = edge * edge * h;
      const correct = fmtSqrt3(u2h, 4);
      const wrongs = [
        fmtSqrt3(u2h, 12),
        fmtSqrt3(u2h, 6),
        fmtSqrt3(u2h, 8),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => fmtSqrt3(u2h + idx * 4, 4)
      );

      return {
        stem: 'Cho hình lăng trụ có đáy là tam giác đều cạnh bằng $' + edge + '$ và chiều cao bằng $' + h + '$. Tính thể tích $V$ của khối lăng trụ đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thể tích khối lăng trụ là $V = B \\cdot h = \\dfrac{' + edge + '^2 \\sqrt{3}}{4} \\cdot ' + h + ' = ' + correct.slice(5, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, h: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (9√3)', params: { u: 2, h: 9 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Lăng trụ đứng ABC.A'B'C' đáy vuông tại A, AB=u·a, AC=v·a, AA'=h·a
  t11_b27_d19_standing_prism_right_vol_mc: {
    id: 't11_b27_d19_standing_prism_right_vol_mc',
    name: 'Thể tích khối lăng trụ đứng có đáy là tam giác vuông',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho lăng trụ đứng ABC.A\'B\'C\' đáy vuông tại A, AB = u·a, AC = v·a, AA\' = h·a. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 9], v ∈ [2; 9], h ∈ [2; 9]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh AB = u·a', min: 2, max: 9 },
      { name: 'v', label: 'Cạnh AC = v·a', min: 2, max: 9 },
      { name: 'h', label: 'Chiều cao AA\' = h·a', min: 2, max: 9 },
    ],
    validateCode: `
      const { u: ab, v: ac, h } = params;
      if (ab < 2 || ab > 9 || ac < 2 || ac > 9 || h < 2 || h > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: ac, h } = params;
      const prod = ab * ac * h;
      const fAns = u.simplifyFrac(prod, 2);
      const fW1 = u.simplifyFrac(prod, 6);
      const fW2 = u.simplifyFrac(prod, 4);

      const correct = '$V = ' + fAns.latex + 'a^3$';
      const wrongs = [
        '$V = ' + prod + 'a^3$',
        '$V = ' + fW1.latex + 'a^3$',
        '$V = ' + fW2.latex + 'a^3$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$V = ' + u.simplifyFrac(prod + idx * 2, 2).latex + 'a^3$'
      );

      return {
        stem: "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác vuông tại $A$, $AB = " + ab + "a$, $AC = " + ac + "a$, $AA' = " + h + "a$. Tính thể tích $V$ của khối lăng trụ đã cho.",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích đáy tam giác vuông là $S_{ABC} = \\dfrac{1}{2} AB \\cdot AC = \\dfrac{1}{2} \\cdot ' + ab + 'a \\cdot ' + ac + 'a$.',
          "Thể tích khối lăng trụ đứng: $V = S_{ABC} \\cdot AA' = " + fAns.latex + "a^3$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, v: 5, h: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (75a³)', params: { u: 6, v: 5, h: 5 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Lăng trụ đứng đáy hình vuông cạnh u·a, chiều cao h·a
  t11_b27_d20_standing_prism_sq_vol_mc: {
    id: 't11_b27_d20_standing_prism_sq_vol_mc',
    name: 'Thể tích khối lăng trụ đứng đáy hình vuông',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho lăng trụ đứng đáy là hình vuông cạnh u·a và chiều cao h·a. Tính thể tích V.',
    conditionSummary: 'u ∈ [2; 10], h ∈ [3; 15]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy hình vuông u·a', min: 2, max: 10 },
      { name: 'h', label: 'Chiều cao h·a', min: 3, max: 15 },
    ],
    validateCode: `
      const { u: edge, h } = params;
      if (edge < 2 || edge > 10 || h < 3 || h > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h } = params;
      const vol = edge * edge * h;
      const fW2 = u.simplifyFrac(vol, 3);
      const fW3 = u.simplifyFrac(vol, 2);

      const correct = '$V = ' + vol + 'a^3$';
      const wrongs = [
        '$V = ' + (vol + 1) + 'a^3$',
        '$V = ' + fW2.latex + 'a^3$',
        '$V = ' + fW3.latex + 'a^3$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$V = ' + (vol + idx + 2) + 'a^3$'
      );

      return {
        stem: 'Cho hình lăng trụ đứng có đáy là hình vuông cạnh bằng $' + edge + 'a$ và chiều cao bằng $' + h + 'a$. Tính thể tích $V$ của khối lăng trụ đã cho.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 0 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thể tích khối lăng trụ đứng đáy vuông là $V = (' + edge + 'a)^2 \\cdot ' + h + 'a = ' + vol + 'a^3$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, h: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (360a³)', params: { u: 6, h: 10 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Thể tích khối lập phương cạnh √q·a
  t11_b27_d21_cube_vol_mc: {
    id: 't11_b27_d21_cube_vol_mc',
    name: 'Thể tích khối lập phương cạnh chứa căn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho khối lập phương có cạnh bằng √q·a. Tính thể tích V.',
    conditionSummary: 'q ∈ [2; 90] (không chính phương để √q rõ căn)',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh lập phương q (cạnh = √q·a)', min: 2, max: 90 },
    ],
    validateCode: `
      const { q } = params;
      if (q < 2 || q > 90) return { valid: false, reason: 'q ngoài miền [2; 90]' };
      const rt = Math.round(Math.sqrt(q));
      if (rt * rt === q) return { valid: false, reason: 'q nên không chính phương để tránh trùng phương án' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const edgeTex = rad(q);
      const volTex = rad(q * q * q);
      const correct = '$V = ' + volTex + 'a^3$';
      const wrongs = [
        '$V = ' + q + 'a^3$',
        '$V = ' + rad(4 * q) + 'a^3$',
        '$V = ' + u.simplifyFrac(q, 2).latex + 'a^3$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$V = ' + (q + idx * 3) + 'a^3$'
      );

      return {
        stem: 'Cho khối lập phương có cạnh bằng $' + edgeTex + 'a$. Thể tích $V$ của khối lập phương đã cho bằng',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 2 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thể tích khối lập phương là $V = (' + edgeTex + 'a)^3 = ' + volTex + 'a^3$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q chính phương (q = 9)', params: { q: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (77√77 a³)', params: { q: 77 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Thể tích khối hộp chữ nhật ABCD.A'B'C'D' biết 3 kích thước
  t11_b27_d22_cuboid_vol_mc: {
    id: 't11_b27_d22_cuboid_vol_mc',
    name: 'Thể tích khối hộp chữ nhật biết ba kích thước',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Cho khối hộp chữ nhật ABCD.A\'B\'C\'D\' có C\'D\' = x·a, B\'C\' = y·a, CC\' = z·a. Tính thể tích V.',
    conditionSummary: 'x ∈ [1; 6], y ∈ [2; 8], z ∈ [2; 9]',
    paramSpecs: [
      { name: 'x', label: 'Kích thước C\'D\' = x·a', min: 1, max: 6 },
      { name: 'y', label: 'Kích thước B\'C\' = y·a', min: 2, max: 8 },
      { name: 'z', label: 'Chiều cao CC\' = z·a', min: 2, max: 9 },
    ],
    validateCode: `
      const { x, y, z } = params;
      if (x < 1 || x > 6 || y < 2 || y > 8 || z < 2 || z > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z } = params;
      const vol = x * y * z;
      const fW1 = u.simplifyFrac(vol, 3);
      const fW2 = u.simplifyFrac(vol, 6);
      const fW3 = u.simplifyFrac(vol, 2);

      const correct = '$V = ' + vol + 'a^3$';
      const wrongs = [
        '$V = ' + fW1.latex + 'a^3$',
        '$V = ' + fW2.latex + 'a^3$',
        '$V = ' + fW3.latex + 'a^3$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$V = ' + (vol + idx * 6) + 'a^3$'
      );

      const xStr = x === 1 ? 'a' : x + 'a';
      return {
        stem: "Cho khối hộp chữ nhật $ABCD.A'B'C'D'$ có $C'D' = " + xStr + "$, $B'C' = " + y + "a$, $CC' = " + z + "a$. Thể tích $V$ của khối hộp chữ nhật đã cho bằng",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          "Thể tích khối hộp chữ nhật là $V = C'D' \\cdot B'C' \\cdot CC' = " + xStr + " \\cdot " + y + "a \\cdot " + z + "a = " + vol + "a^3$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y = 1', params: { x: 1, y: 1, z: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (24a³)', params: { x: 1, y: 4, z: 6 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Tính chất hình lăng trụ đều
  t11_b27_d23_reg_prism_prop_mc: {
    id: 't11_b27_d23_reg_prism_prop_mc',
    name: 'Tính chất của hình lăng trụ đều',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Nhận biết khẳng định đúng về tính chất của hình lăng trụ đều.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể (0: ABCD.A1B1C1D1, 1: ABC.A\'B\'C\', 2: ABCDEF.A1..F1)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          stem: 'Cho hình lăng trụ đều $ABCD.A_1B_1C_1D_1$. Khẳng định nào sau đây đúng?',
          correct: 'Các mặt bên vuông góc với các mặt đáy',
          wrongs: [
            'Các mặt bên có diện tích bằng mặt đáy',
            'Các cạnh bên có độ dài bằng cạnh đáy',
            '$ABCD$ là hình thang có hai đáy không bằng nhau',
          ],
          sol: 'Hình lăng trụ đều là lăng trụ đứng có đáy là đa giác đều, nên các cạnh bên vuông góc với đáy và suy ra các mặt bên vuông góc với các mặt đáy.',
        },
        {
          stem: "Cho hình lăng trụ đều $ABC.A'B'C'$. Khẳng định nào sau đây đúng?",
          correct: 'Các mặt bên là các hình chữ nhật bằng nhau và vuông góc với đáy',
          wrongs: [
            'Các mặt bên luôn là hình vuông',
            'Chiều cao lăng trụ luôn bằng cạnh đáy',
            'Hai đáy không nhất thiết bằng nhau',
          ],
          sol: 'Lăng trụ tam giác đều là lăng trụ đứng có đáy tam giác đều, do đó mọi mặt bên đều là hình chữ nhật bằng nhau và vuông góc với hai mặt đáy.',
        },
        {
          stem: 'Cho hình lăng trụ đều có đáy là đa giác đều $n$ cạnh. Khẳng định nào sau đây đúng?',
          correct: 'Mọi cạnh bên đều vuông góc với mặt phẳng đáy và có độ dài bằng nhau',
          wrongs: [
            'Cạnh bên luôn tạo với đáy góc $45^\\circ$',
            'Mặt bên có thể là hình thang cân',
            'Độ dài cạnh bên luôn bằng cạnh đáy',
          ],
          sol: 'Hình lăng trụ đều là lăng trụ đứng nên mọi cạnh bên đều vuông góc với mặt phẳng đáy và bằng nhau.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: item.stem,
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Tính chất hình chóp đều S.ABC
  t11_b27_d24_reg_pyr_prop_mc: {
    id: 't11_b27_d24_reg_pyr_prop_mc',
    name: 'Tính chất của hình chóp tam giác đều',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Nhận biết mệnh đề đúng về hình chóp đều S.ABC và trọng tâm G của đáy.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          stem: 'Cho hình chóp đều $S.ABC$, điểm $G$ là trọng tâm của tam giác $ABC$. Tìm mệnh đề đúng trong các mệnh đề sau?',
          correct: '$GA = GB = GC$',
          wrongs: [
            '$SG \\subset (ABC)$',
            '$SA = SB = SC = SG$',
            '$SA \\perp (ABC)$',
          ],
          sol: 'Đáy $ABC$ là tam giác đều có $G$ là trọng tâm nên $G$ đồng thời là tâm đường tròn ngoại tiếp $\\triangle ABC$, do đó $GA = GB = GC$.',
        },
        {
          stem: 'Cho hình chóp đều $S.ABC$, điểm $G$ là trọng tâm của tam giác $ABC$. Tìm mệnh đề đúng trong các mệnh đề sau?',
          correct: '$SG \\perp (ABC)$',
          wrongs: [
            '$SA \\perp (ABC)$',
            '$SG = SA$',
            'Các mặt bên của hình chóp đều là các tam giác đều trong mọi trường hợp',
          ],
          sol: 'Chân đường cao hạ từ đỉnh $S$ của hình chóp tam giác đều $S.ABC$ là tâm của đáy, tức trọng tâm $G$, nên $SG \\perp (ABC)$.',
        },
        {
          stem: 'Cho hình chóp tứ giác đều $S.ABCD$, điểm $O$ là tâm của hình vuông $ABCD$. Tìm mệnh đề đúng trong các mệnh đề sau?',
          correct: '$SO \\perp (ABCD)$ và $SA = SB = SC = SD$',
          wrongs: [
            '$SA \\perp (ABCD)$',
            '$SO = SA$',
            '$\\widehat{SAB} = 90^\\circ$',
          ],
          sol: 'Trong hình chóp tứ giác đều $S.ABCD$, các cạnh bên bằng nhau và đường cao nối đỉnh $S$ với tâm $O$ của đáy.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: item.stem,
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = -1', params: { mode: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24', params: { mode: 0 }, expectedValid: true },
    ],
  },
};
