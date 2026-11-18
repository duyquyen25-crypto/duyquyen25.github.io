import { MathTemplate } from '../types/math';

export const G11_B26_MC_PART2: Record<string, MathTemplate> = {
  // D08 (Q8): Chóp S.ABCD đáy chữ nhật, SD ⊥ (ABCD), tính d(D, (SBC))
  t11_b26_d08_pyr_rect_d_sbc_mc: {
    id: 't11_b26_d08_pyr_rect_d_sbc_mc',
    name: 'Khoảng cách từ chân đường cao đến mặt đối diện trong chóp đáy chữ nhật',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy chữ nhật, SD ⊥ (ABCD), DA = v·a, DC = u·a, SD = h·a. Tính d(D, (SBC)).',
    conditionSummary: 'u ∈ [6; 16], v ∈ [4; 12], h ∈ [3; 10], u ≠ h',
    paramSpecs: [
      { name: 'v', label: 'Độ dài DA = v·a', min: 4, max: 12 },
      { name: 'u', label: 'Độ dài DC = u·a', min: 6, max: 16 },
      { name: 'h', label: 'Độ dài SD = h·a', min: 3, max: 10 },
    ],
    validateCode: `
      const { v: da, u: dc, h: sd } = params;
      if (da < 4 || da > 12 || dc < 6 || dc > 16 || sd < 3 || sd > 10) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (dc === sd) return { valid: false, reason: 'DC ≠ SD' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v: da, u: dc, h: sd } = params;
      const fmtRadFracA = (coeff, radN, den) => {
        let out = 1, rem = radN;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        const totalNum = coeff * out;
        const g = u.gcd(totalNum, den);
        const n = totalNum / g;
        const d = den / g;
        const sqrtPart = rem === 1 ? '' : '\\sqrt{' + rem + '}';
        const numExpr = rem === 1 ? String(n) : (n === 1 ? sqrtPart : n + ' ' + sqrtPart);
        const core = d === 1 ? numExpr : '\\frac{' + numExpr + '}{' + d + '}';
        return '$' + core + 'a$';
      };

      const s2 = sd * sd + dc * dc;
      const correct = fmtRadFracA(sd * dc, s2, s2);
      const wrongs = [
        '$' + u.simplifyFrac(sd * dc, sd + dc).latex + 'a$',
        '$' + u.simplifyFrac(da * sd, sd + da).latex + 'a$',
        fmtRadFracA(sd * da, sd * sd + da * da, sd * sd + da * da),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + u.simplifyFrac(sd * dc, idx + 3).latex + 'a$'
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SD \\perp (ABCD)$. Biết $DA = ' + da + 'a$, $DC = ' + dc + 'a$, $SD = ' + sd + 'a$. Tính khoảng cách từ điểm $D$ đến mặt phẳng $(SBC)$.',
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
          'Vì $BC \\perp DC$ và $BC \\perp SD$ nên $BC \\perp (SDC)$.',
          'Kẻ $DH \\perp SC$ ($H \\in SC$). Do $BC \\perp DH$ nên $DH \\perp (SBC) \\Rightarrow d(D, (SBC)) = DH$.',
          'Trong $\\Delta SDC$ vuông tại $D$: $DH = \\dfrac{SD \\cdot DC}{\\sqrt{SD^2 + DC^2}} = \\dfrac{' + sd + 'a \\cdot ' + dc + 'a}{\\sqrt{' + (sd * sd) + 'a^2 + ' + (dc * dc) + 'a^2}} = ' + correct.slice(1, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên DC = SD', params: { v: 8, u: 6, h: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (21√58 / 29 a)', params: { v: 8, u: 14, h: 6 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Lăng trụ đứng ABC.A'B'C' đáy vuông tại C, tính d(A, (BCC'B'))
  t11_b26_d09_standing_prism_right_dist_mc: {
    id: 't11_b26_d09_standing_prism_right_dist_mc',
    name: 'Khoảng cách từ đỉnh đến mặt bên trong lăng trụ đứng đáy vuông',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Cho lăng trụ đứng ABC.A\'B\'C\' đáy vuông tại C biết C\'A\' = b·a, B\'A\' = √(b²+c²)·a, BB\' = h·a. Tính d(A, (BCC\'B\')).',
    conditionSummary: 'b ∈ [3; 9], c ∈ [3; 9], h ∈ [3; 9]',
    paramSpecs: [
      { name: 'b', label: 'Độ dài C\'A\' = b·a', min: 3, max: 9 },
      { name: 'c', label: 'Cạnh BC = c·a', min: 3, max: 9 },
      { name: 'h', label: 'Chiều cao BB\' = h·a', min: 3, max: 9 },
    ],
    validateCode: `
      const { b, c, h } = params;
      if (b < 3 || b > 9 || c < 3 || c > 9 || h < 3 || h > 9) {
        return { valid: false, reason: 'Tham số ngoài miền [3; 9]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, c, h } = params;
      const hyp2 = b * b + c * c;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const hypTex = rad(hyp2);
      const correct = '$' + b + 'a$';
      const wrongs = [
        '$(' + Math.max(1, b - 3) + ' + ' + hypTex + ')a$',
        '$(' + Math.max(1, b - 4) + ' + ' + hypTex + ')a$',
        '$' + hypTex + 'a$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (b + c + idx) + 'a$'
      );

      return {
        stem: "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác vuông tại $C$, $C'A' = " + b + "a$, $B'A' = " + hypTex + "a$, $BB' = " + h + "a$. Khoảng cách từ điểm $A$ đến mặt phẳng $(BCC'B')$ bằng",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'B', vF: 'C', vR: 'A', tL: "B'", tF: "C'", tR: "A'" },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          "Do $ABC.A'B'C'$ là lăng trụ đứng nên $BB' \\perp (ABC) \\Rightarrow AC \\perp BB'$.",
          "Lại có đáy vuông tại $C$ nên $AC \\perp BC$, suy ra $AC \\perp (BCC'B')$.",
          "Do đó $d(A, (BCC'B')) = AC = C'A' = " + b + "a$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 2', params: { b: 2, c: 6, h: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (5a)', params: { b: 5, c: 6, h: 5 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Lăng trụ đứng ABC.A'B'C' đáy đều cạnh 2m, BB' = k√2, tính d(A', (C'AB))
  t11_b26_d10_standing_prism_equi_dist_mc: {
    id: 't11_b26_d10_standing_prism_equi_dist_mc',
    name: 'Khoảng cách từ đỉnh đến mặt cắt (C\'AB) trong lăng trụ đứng đáy đều',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho lăng trụ đứng ABC.A\'B\'C\' đáy tam giác đều cạnh 2m·a, BB\' = k√2·a. Tính d(A\', (C\'AB)).',
    conditionSummary: 'm ∈ [2; 6], k ∈ [2; 5]',
    paramSpecs: [
      { name: 'm', label: 'Nửa cạnh đáy m (AC = 2m·a)', min: 2, max: 6 },
      { name: 'k', label: 'Hệ số chiều cao k (BB\' = k√2·a)', min: 2, max: 5 },
    ],
    validateCode: `
      const { m, k } = params;
      if (m < 2 || m > 6 || k < 2 || k > 5) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, k } = params;
      const side = 2 * m;
      const fmtRadFracA = (coeff, radN, den) => {
        let out = 1, rem = radN;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        const totalNum = coeff * out;
        const g = u.gcd(totalNum, den);
        const n = totalNum / g;
        const d = den / g;
        const sqrtPart = rem === 1 ? '' : '\\sqrt{' + rem + '}';
        const numExpr = rem === 1 ? String(n) : (n === 1 ? sqrtPart : n + ' ' + sqrtPart);
        const core = d === 1 ? numExpr : '\\frac{' + numExpr + '}{' + d + '}';
        return '$' + core + 'a$';
      };

      const denomSq = 2 * k * k + 3 * m * m;
      const correct = fmtRadFracA(k * m, 6 * denomSq, denomSq);
      const wrongs = [
        '$' + side + 'a$',
        '$' + m + ' \\sqrt{3}a$',
        '$' + k + ' \\sqrt{2}a$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (side + idx) + 'a$'
      );

      return {
        stem: "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác đều, $AC = " + side + "a$, $BB' = " + k + "\\sqrt{2}a$. Khoảng cách từ điểm $A'$ đến mặt phẳng $(C'AB)$ bằng",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'C', vF: 'A', vR: 'B', tL: "C'", tF: "A'", tR: "B'" },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          "Vì $CA'$ cắt $(C'AB)$ tại trung điểm của $CA'$ nên $d(A', (C'AB)) = d(C, (C'AB))$.",
          "Gọi $M$ là trung điểm $AB \\Rightarrow AB \\perp (C'CM)$ và $CM = " + m + "\\sqrt{3}a$. Kẻ $CH \\perp C'M \\Rightarrow CH \\perp (C'AB)$.",
          "Khi đó $d(C, (C'AB)) = CH = \\dfrac{C'C \\cdot CM}{\\sqrt{C'C^2 + CM^2}} = \\dfrac{" + k + "\\sqrt{2}a \\cdot " + m + "\\sqrt{3}a}{\\sqrt{" + (2 * k * k) + "a^2 + " + (3 * m * m) + "a^2}} = " + correct.slice(1, -1) + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { m: 1, k: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (3√30 / 5 a)', params: { m: 3, k: 3 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Hình lập phương ABCD.EFGH cạnh √q·a, d(BF, AD)
  t11_b26_d11_cube_skew_perp_edges_mc: {
    id: 't11_b26_d11_cube_skew_perp_edges_mc',
    name: 'Khoảng cách giữa hai cạnh chéo nhau của hình lập phương',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Cho hình lập phương ABCD.EFGH có cạnh bằng √q·a. Tính khoảng cách giữa hai đường thẳng BF và AD.',
    conditionSummary: 'q ∈ [2; 30]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương hệ số cạnh q (cạnh = √q·a)', min: 2, max: 30 },
    ],
    validateCode: `
      const { q } = params;
      if (q < 2 || q > 30) return { valid: false, reason: 'q ngoài miền [2; 30]' };
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
      const correct = '$' + edgeTex + 'a$';
      const wrongs = [
        '$' + rad(2 * q) + 'a$',
        '$' + q + 'a$',
        '$' + rad(4 * q) + 'a$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (q + idx + 1) + 'a$'
      );

      return {
        stem: 'Cho hình lập phương $ABCD.EFGH$ có cạnh bằng $' + edgeTex + 'a$. Khoảng cách giữa hai đường thẳng $BF$ và $AD$ bằng',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 3 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trong hình lập phương $ABCD.EFGH$, ta có $AB \\perp BF$ và $AB \\perp AD$.',
          'Do đó $AB$ là đoạn vuông góc chung của hai đường thẳng chéo nhau $BF$ và $AD$, suy ra $d(BF, AD) = AB = ' + edgeTex + 'a$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { q: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (√15 a)', params: { q: 15 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Hình lập phương ABCD.A'B'C'D' cạnh u√3·a, d(A'B, AD)
  t11_b26_d12_cube_diag_edge_dist_mc: {
    id: 't11_b26_d12_cube_diag_edge_dist_mc',
    name: 'Khoảng cách giữa đường chéo mặt bên và cạnh đáy hình lập phương',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho hình lập phương ABCD.A\'B\'C\'D\' cạnh u√3·a. Tính khoảng cách giữa A\'B và AD.',
    conditionSummary: 'u ∈ [2; 9]',
    paramSpecs: [
      { name: 'u', label: 'Hệ số u (cạnh = u√3·a)', min: 2, max: 9 },
    ],
    validateCode: `
      const { u: k } = params;
      if (k < 2 || k > 9) return { valid: false, reason: 'u ngoài miền [2; 9]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: k } = params;
      const correct = k % 2 === 0
        ? '$' + (k / 2) + '\\sqrt{6}a$'
        : '$\\frac{' + k + ' \\sqrt{6}}{2}a$';
      const wrongs = [
        '$' + (3 * k * k) + 'a$',
        '$' + k + ' \\sqrt{6}a$',
        '$' + (2 * k) + ' \\sqrt{3}a$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (k + idx) + '\\sqrt{3}a$'
      );

      return {
        stem: "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $" + k + "\\sqrt{3}a$. Khoảng cách giữa hai đường thẳng $A'B$ và $AD$ bằng",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          "Ta có $AD \\parallel (A'BCD')$ và $A'B \\subset (A'BCD')$, suy ra $d(A'B, AD) = d(AD, (A'BCD')) = d(A, (A'BCD'))$.",
          "Gọi $I$ là tâm hình vuông $ABB'A'$ (giao điểm $AB'$ và $A'B$). Do $AI \\perp A'B$ và $AI \\perp BC$ nên $AI \\perp (A'BCD')$.",
          "Vậy $d(A'B, AD) = AI = \\dfrac{AB'}{2} = \\dfrac{" + k + "\\sqrt{3}a \\cdot \\sqrt{2}}{2} = " + correct.slice(1, -1) + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (5√6 / 2 a)', params: { u: 5 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Chóp S.ABCD đáy chữ nhật, SD ⊥ (ABCD), d(SD, AB)
  t11_b26_d13_pyr_rect_sd_ab_mc: {
    id: 't11_b26_d13_pyr_rect_sd_ab_mc',
    name: 'Khoảng cách giữa đường cao SD và cạnh đáy AB trong chóp chữ nhật',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy chữ nhật, SD ⊥ (ABCD), DA = v·a, DC = u·a, SD = √q·a. Tính d(SD, AB).',
    conditionSummary: 'v ∈ [2; 10], u ∈ [3; 12], q ∈ [11; 65], v ≠ u',
    paramSpecs: [
      { name: 'v', label: 'Độ dài DA = v·a', min: 2, max: 10 },
      { name: 'u', label: 'Độ dài DC = u·a', min: 3, max: 12 },
      { name: 'q', label: 'Bình phương SD: q (SD = √q·a)', min: 11, max: 65 },
    ],
    validateCode: `
      const { v: da, u: dc, q } = params;
      if (da < 2 || da > 10 || dc < 3 || dc > 12 || q < 11 || q > 65) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (da === dc || da + dc === da || da * da + dc * dc === da * da) {
        return { valid: false, reason: 'DA ≠ DC' };
      }
      if (Math.round(Math.sqrt(da * da + dc * dc)) ** 2 === da * da + dc * dc && Math.sqrt(da * da + dc * dc) === da + dc) {
        return { valid: false, reason: 'Trùng phương án' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v: da, u: dc, q } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const sdTex = rad(q);
      const correct = '$' + da + 'a$';
      const wrongs = [
        '$' + rad(da * da + dc * dc) + 'a$',
        '$' + (da + dc) + 'a$',
        '$' + dc + 'a$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (da + idx + 1) + 'a$'
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SD \\perp (ABCD)$, $DA = ' + da + 'a$, $DC = ' + dc + 'a$, $SD = ' + sdTex + 'a$. Tính khoảng cách giữa các đường thẳng $SD$ và $AB$.',
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
          'Vì đáy $ABCD$ là hình chữ nhật nên $DA \\perp AB$.',
          'Mặt khác $SD \\perp (ABCD) \\Rightarrow DA \\perp SD$. Do đó $DA$ là đoạn vuông góc chung của $SD$ và $AB$.',
          'Vậy $d(SD, AB) = DA = ' + da + 'a$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên DA = DC', params: { v: 5, u: 5, q: 51 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (4a)', params: { v: 4, u: 6, q: 51 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), d(SB, AD)
  t11_b26_d14_pyr_rect_sb_ad_mc: {
    id: 't11_b26_d14_pyr_rect_sb_ad_mc',
    name: 'Khoảng cách giữa cạnh bên SB và cạnh đáy AD trong chóp chữ nhật',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), AB = u·a, AD = v·a, SA = √q·a. Tính d(SB, AD).',
    conditionSummary: 'u ∈ [3; 10], v ∈ [4; 14], q ∈ [11; 50], u ≠ v',
    paramSpecs: [
      { name: 'u', label: 'Độ dài AB = u·a', min: 3, max: 10 },
      { name: 'v', label: 'Độ dài AD = v·a', min: 4, max: 14 },
      { name: 'q', label: 'Bình phương SA: q (SA = √q·a)', min: 11, max: 50 },
    ],
    validateCode: `
      const { u: ab, v: ad, q } = params;
      if (ab < 3 || ab > 10 || ad < 4 || ad > 14 || q < 11 || q > 50) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (ab === ad) return { valid: false, reason: 'AB ≠ AD' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: ad, q } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const fmtRadFracA = (coeff, radN, den) => {
        let out = 1, rem = radN;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        const totalNum = coeff * out;
        const g = u.gcd(totalNum, den);
        const n = totalNum / g;
        const d = den / g;
        const sqrtPart = rem === 1 ? '' : '\\sqrt{' + rem + '}';
        const numExpr = rem === 1 ? String(n) : (n === 1 ? sqrtPart : n + ' ' + sqrtPart);
        const core = d === 1 ? numExpr : '\\frac{' + numExpr + '}{' + d + '}';
        return '$' + core + 'a$';
      };

      const saTex = rad(q);
      const s2 = q + ab * ab;
      const correct = fmtRadFracA(ab, q * s2, s2);
      const wrongs = [
        fmtRadFracA(ad, q * (q + ad * ad), q + ad * ad),
        '$' + rad(q + ab * ab + ad * ad) + 'a$',
        '$' + ad + 'a$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (ab + idx) + 'a$'
      );

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$, $AB = ' + ab + 'a$, $AD = ' + ad + 'a$, $SA = ' + saTex + 'a$. Tính khoảng cách giữa các đường thẳng $SB$ và $AD$.',
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
          'Vì $AD \\parallel BC$ và $BC \\subset (SBC)$ nên $AD \\parallel (SBC)$, suy ra $d(SB, AD) = d(AD, (SBC)) = d(A, (SBC))$.',
          'Kẻ $AH \\perp SB$ ($H \\in SB$). Do $BC \\perp (SAB)$ nên $BC \\perp AH$, suy ra $AH \\perp (SBC)$.',
          'Vậy $d(SB, AD) = AH = \\dfrac{SA \\cdot AB}{\\sqrt{SA^2 + AB^2}} = \\dfrac{' + saTex + 'a \\cdot ' + ab + 'a}{\\sqrt{' + q + 'a^2 + ' + (ab * ab) + 'a^2}} = ' + correct.slice(1, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = v', params: { u: 8, v: 8, q: 34 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (8√17 / 7 a)', params: { u: 8, v: 11, q: 34 }, expectedValid: true },
    ],
  },
};
