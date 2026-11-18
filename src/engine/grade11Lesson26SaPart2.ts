import { MathTemplate } from '../types/math';

export const G11_B26_SA_PART2: Record<string, MathTemplate> = {
  // D27 (Q27): Chóp S.ABCD đáy chữ nhật AB=√q, AD=v, SA=√p -> d(A, (SCD))
  t11_b26_d27_rect_pyr_a_scd_sa: {
    id: 't11_b26_d27_rect_pyr_a_scd_sa',
    name: 'Khoảng cách từ chân đường cao đến (SCD) trong chóp đáy chữ nhật (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy chữ nhật AB = √q, AD = v, SA ⊥ (ABCD), SA = √p. Tính d(A, (SCD)).',
    conditionSummary: 'q ∈ [2; 12], v ∈ [1; 6], p ∈ [2; 12]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh AB: q (AB = √q)', min: 2, max: 12 },
      { name: 'v', label: 'Cạnh AD = v', min: 1, max: 6 },
      { name: 'p', label: 'Bình phương chiều cao p (SA = √p)', min: 2, max: 12 },
    ],
    validateCode: `
      const { q, v: ad, p } = params;
      if (q < 2 || q > 12 || ad < 1 || ad > 6 || p < 2 || p > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const d = (ad * Math.sqrt(p)) / Math.sqrt(p + ad * ad);
      const frac = d * 10 - Math.floor(d * 10);
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
      const abTex = rad(q), saTex = rad(p);
      const d = (ad * Math.sqrt(p)) / Math.sqrt(p + ad * ad);
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $AB = ' + abTex + '$, $AD = ' + ad + '$, $SA \\perp (ABCD)$, $SA = ' + saTex + '$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SCD)$ (kết quả làm tròn đến hàng phần mười).',
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
          'Ta có $CD \\perp AD$ và $CD \\perp SA \\Rightarrow CD \\perp (SAD)$.',
          'Dựng $AH \\perp SD$ ($H \\in SD$) $\\Rightarrow AH \\perp CD \\Rightarrow AH \\perp (SCD)$.',
          'Suy ra $d(A, (SCD)) = AH = \\dfrac{SA \\cdot AD}{\\sqrt{SA^2 + AD^2}} = \\dfrac{' + saTex + ' \\cdot ' + ad + '}{\\sqrt{' + p + ' + ' + (ad * ad) + '}} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v = 0', params: { q: 3, v: 0, p: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (0,8)', params: { q: 3, v: 1, p: 2 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Chóp S.ABCD đáy vuông cạnh u, SA = √p, I trên tia AB với AI = k·AB -> d(I, (SBC))
  t11_b26_d28_sq_pyr_ray_ab_sbc_sa: {
    id: 't11_b26_d28_sq_pyr_ray_ab_sbc_sa',
    name: 'Khoảng cách từ điểm trên tia AB song song (SBC) trong chóp đáy vuông (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy hình vuông cạnh u, SA ⊥ (ABCD), SA = √p, điểm I thuộc đường thẳng AB với AI = k·AB. Tính d(I, (SBC)).',
    conditionSummary: 'u ∈ [2; 8], p ∈ [2; 12], k ∈ [2; 5]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh hình vuông đáy u', min: 2, max: 8 },
      { name: 'p', label: 'Bình phương chiều cao p (SA = √p)', min: 2, max: 12 },
      { name: 'k', label: 'Hệ số AI = k·AB', min: 2, max: 5 },
    ],
    validateCode: `
      const { u: edge, p, k } = params;
      if (edge < 2 || edge > 8 || p < 2 || p > 12 || k < 2 || k > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const d = (edge * Math.sqrt(p)) / Math.sqrt(p + edge * edge);
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, p, k } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const saTex = rad(p);
      const d = (edge * Math.sqrt(p)) / Math.sqrt(p + edge * edge);
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh bằng $' + edge + '$, $SA \\perp (ABCD)$, $SA = ' + saTex + '$. Gọi $I$ là điểm thuộc đường thẳng $AD$ sao cho $AI = ' + k + 'AD$. Tính khoảng cách từ điểm $I$ đến mặt phẳng $(SBC)$ (kết quả làm tròn đến hàng phần mười).',
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
          'Do $I$ thuộc đường thẳng $AD$ và $AD \\parallel BC \\subset (SBC)$ nên $AI \\parallel (SBC)$, suy ra $d(I, (SBC)) = d(A, (SBC))$.',
          'Ta có $BC \\perp AB$ và $BC \\perp SA \\Rightarrow BC \\perp (SAB)$. Dựng $AH \\perp SB \\Rightarrow AH \\perp (SBC)$.',
          'Vậy $d(I, (SBC)) = AH = \\dfrac{SA \\cdot AB}{\\sqrt{SA^2 + AB^2}} = \\dfrac{' + saTex + ' \\cdot ' + edge + '}{\\sqrt{' + p + ' + ' + (edge * edge) + '}} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { u: 3, p: 2, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (1,3)', params: { u: 3, p: 2, k: 3 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Lăng trụ đứng ABC.A1B1C1 đáy vuông tại B, B1C1=c, A1B1=√p, CC1=h -> d(B1, (AMP))
  t11_b26_d29_standing_prism_mid_plane_sa: {
    id: 't11_b26_d29_standing_prism_mid_plane_sa',
    name: 'Khoảng cách từ đỉnh lăng trụ đến mặt phẳng (AMP) qua hai trung điểm (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho lăng trụ đứng ABC.A₁B₁C₁ đáy vuông tại B, B₁C₁ = c, A₁B₁ = √p, CC₁ = h. M, P là trung điểm BC, BB₁. Tính d(B₁, (AMP)).',
    conditionSummary: 'c ∈ [2; 8], p ∈ [2; 10], h ∈ [1; 6]',
    paramSpecs: [
      { name: 'c', label: 'Độ dài B₁C₁ = c', min: 2, max: 8 },
      { name: 'p', label: 'Bình phương A₁B₁: p (A₁B₁ = √p)', min: 2, max: 10 },
      { name: 'h', label: 'Chiều cao CC₁ = h', min: 1, max: 6 },
    ],
    validateCode: `
      const { c, p, h } = params;
      if (c < 2 || c > 8 || p < 2 || p > 10 || h < 1 || h > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const d = 1 / Math.sqrt(1 / p + 4 / (c * c) + 4 / (h * h));
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, p, h } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const abTex = rad(p);
      const bmFrac = u.simplifyFrac(c, 2);
      const bpFrac = u.simplifyFrac(h, 2);
      const d = 1 / Math.sqrt(1 / p + 4 / (c * c) + 4 / (h * h));
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình lăng trụ đứng $ABC.A_1B_1C_1$ có đáy là tam giác vuông tại $B$ và có độ dài các cạnh $B_1C_1 = ' + c + '$, $A_1B_1 = ' + abTex + '$, $CC_1 = ' + h + '$. Gọi $M, P$ lần lượt là trung điểm của $BC$ và $BB_1$. Tính khoảng cách từ điểm $B_1$ đến mặt phẳng $(AMP)$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: 'A_1', tF: 'B_1', tR: 'C_1' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Vì $BB_1$ cắt $(AMP)$ tại trung điểm $P$ nên $d(B_1, (AMP)) = d(B, (AMP))$.',
          'Ta có $BA = ' + abTex + '$, $BM = ' + bmFrac.latex + '$, $BP = ' + bpFrac.latex + '$ đôi một vuông góc tại $B$ (tam diện vuông $B.AMP$).',
          'Do đó $\\dfrac{1}{d(B, (AMP))^2} = \\dfrac{1}{BA^2} + \\dfrac{1}{BM^2} + \\dfrac{1}{BP^2} = \\dfrac{1}{' + p + '} + \\dfrac{4}{' + (c * c) + '} + \\dfrac{4}{' + (h * h) + '} \\Rightarrow d(B_1, (AMP)) \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 1', params: { c: 1, p: 2, h: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (0,4)', params: { c: 2, p: 2, h: 1 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Lăng trụ đứng ABC.DEF đáy vuông tại B, EF=c, AB=√p, BE=√q, N trung điểm BC -> d(AN, EC)
  t11_b26_d30_standing_prism_skew_an_ec_sa: {
    id: 't11_b26_d30_standing_prism_skew_an_ec_sa',
    name: 'Khoảng cách giữa AN và EC trong lăng trụ đứng đáy vuông (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho lăng trụ đứng ABC.DEF đáy vuông tại B, EF = c, AB = √p, BE = √q, N trung điểm BC. Tính d(AN, EC).',
    conditionSummary: 'c ∈ [2; 8], p ∈ [2; 10], q ∈ [2; 12]',
    paramSpecs: [
      { name: 'c', label: 'Độ dài EF = c', min: 2, max: 8 },
      { name: 'p', label: 'Bình phương cạnh AB: p (AB = √p)', min: 2, max: 10 },
      { name: 'q', label: 'Bình phương cạnh BE: q (BE = √q)', min: 2, max: 12 },
    ],
    validateCode: `
      const { c, p, q } = params;
      if (c < 2 || c > 8 || p < 2 || p > 10 || q < 2 || q > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const d = 1 / Math.sqrt(1 / p + 4 / (c * c) + 4 / q);
      const frac = d * 100 - Math.floor(d * 100);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .005' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, p, q } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const abTex = rad(p), beTex = rad(q);
      const bnFrac = u.simplifyFrac(c, 2);
      const d = 1 / Math.sqrt(1 / p + 4 / (c * c) + 4 / q);
      const numVal = Number(d.toFixed(2));
      const ansStr = u.formatNumberVN(numVal, 2);

      return {
        stem: 'Cho hình lăng trụ đứng $ABC.DEF$ có đáy là tam giác vuông tại $B$ và có độ dài các cạnh $EF = ' + c + '$, $AB = ' + abTex + '$, $BE = ' + beTex + '$. Gọi $N$ là trung điểm của $BC$. Tính khoảng cách giữa $AN$ và $EC$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: 'D', tF: 'E', tR: 'F' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $P$ là trung điểm của $BE \\Rightarrow NP \\parallel EC \\Rightarrow EC \\parallel (ANP)$.',
          'Suy ra $d(AN, EC) = d(E, (ANP)) = d(B, (ANP))$ (do $P$ là trung điểm $BE$).',
          'Tam diện $B.ANP$ vuông tại $B$ với $BA = ' + abTex + '$, $BN = ' + bnFrac.latex + '$, $BP = \\dfrac{' + beTex + '}{2}$.',
          'Áp dụng công thức $\\dfrac{1}{d^2} = \\dfrac{1}{BA^2} + \\dfrac{1}{BN^2} + \\dfrac{1}{BP^2} = \\dfrac{1}{' + p + '} + \\dfrac{4}{' + (c * c) + '} + \\dfrac{4}{' + q + '} \\Rightarrow d(AN, EC) \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 1', params: { c: 1, p: 2, q: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (0,87)', params: { c: 4, p: 2, q: 7 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Chóp S.ABCD đáy hình thoi góc B=60°, cạnh u, H trọng tâm ABC, SH=k√3 -> d(AC, SD)
  t11_b26_d31_rhombus_centroid_ac_sd_sa: {
    id: 't11_b26_d31_rhombus_centroid_ac_sd_sa',
    name: 'Khoảng cách giữa AC và SD trong chóp đáy hình thoi có đường cao qua trọng tâm (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy hình thoi cạnh u, góc ABC = 60°, hình chiếu của S là trọng tâm H của ΔABC, SH = k√3. Tính d(AC, SD).',
    conditionSummary: 'u ∈ [2; 8], k ∈ [1; 5]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh hình thoi AB = u', min: 2, max: 8 },
      { name: 'k', label: 'Hệ số chiều cao SH = k√3', min: 1, max: 5 },
    ],
    validateCode: `
      const { u: edge, k } = params;
      if (edge < 2 || edge > 8 || k < 1 || k > 5) return { valid: false, reason: 'Tham số ngoài miền' };
      const od = (edge * Math.sqrt(3)) / 2;
      const hd = (2 * edge * Math.sqrt(3)) / 3;
      const sh = k * Math.sqrt(3);
      const ok = (sh * od) / Math.sqrt(sh * sh + hd * hd);
      const frac = ok * 100 - Math.floor(ok * 100);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .005' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, k } = params;
      const shTex = k === 1 ? '\\sqrt{3}' : k + '\\sqrt{3}';
      const od = (edge * Math.sqrt(3)) / 2;
      const hd = (2 * edge * Math.sqrt(3)) / 3;
      const sh = k * Math.sqrt(3);
      const sd = Math.sqrt(sh * sh + hd * hd);
      const ok = (sh * od) / sd;
      const numVal = Number(ok.toFixed(2));
      const ansStr = u.formatNumberVN(numVal, 2);
      const odTex = edge % 2 === 0 ? (edge === 2 ? '\\sqrt{3}' : (edge / 2) + '\\sqrt{3}') : '\\dfrac{' + edge + '\\sqrt{3}}{2}';
      const hdFrac = u.simplifyFrac(2 * edge, 3);
      const hdTex = hdFrac.isInteger ? (hdFrac.num === 1 ? '\\sqrt{3}' : hdFrac.num + '\\sqrt{3}') : '\\dfrac{' + hdFrac.num + '\\sqrt{3}}{' + hdFrac.den + '}';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình thoi với $\\widehat{ABC} = 60^\\circ$ và $AB = ' + edge + '$. Biết rằng hình chiếu vuông góc của $S$ trên mặt phẳng $(ABCD)$ là trọng tâm $H$ của tam giác $ABC$ và $SH = ' + shTex + '$. Khoảng cách giữa hai đường thẳng $AC$ và $SD$ bằng bao nhiêu (không làm tròn kết quả các phép tính trung gian, chỉ làm tròn kết quả cuối cùng đến hàng phần trăm)?',
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
          'Gọi $O = AC \\cap BD$. Do $AC \\perp BD$ và $AC \\perp SH$ nên $AC \\perp (SBD)$. Kẻ $OK \\perp SD$ ($K \\in SD$) $\\Rightarrow OK \\perp AC \\Rightarrow d(AC, SD) = OK$.',
          'Tam giác $ABC$ đều cạnh $' + edge + '$ nên $OD = OB = ' + odTex + '$, $OH = \\dfrac{1}{3}OB \\Rightarrow HD = OD + OH = ' + hdTex + '$.',
          'Trong $\\triangle SHD$ vuông tại $H$: $\\sin \\widehat{SDH} = \\dfrac{OK}{OD} = \\dfrac{SH}{SD}$ với $SD = \\sqrt{SH^2 + HD^2}$. Suy ra $OK = \\dfrac{SH \\cdot OD}{SD} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { u: 2, k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (1,04)', params: { u: 2, k: 1 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Chóp S.ABCD đáy vuông cạnh u, ΔSAB vuông cân tại S trong mp vuông góc đáy -> d(BC, SA)
  // LƯU Ý HIỆU CHỈNH: Bài gốc nhầm 2√2 ≈ 1,4 (nhầm với HI = √2); khoảng cách đúng là d(BC, SA) = d(B, SA) = SB = u/√2 = u√2/2!
  t11_b26_d32_sq_pyr_perp_face_bc_sa_sa: {
    id: 't11_b26_d32_sq_pyr_perp_face_bc_sa_sa',
    name: 'Khoảng cách giữa BC và SA khi mặt bên (SAB) vuông cân vuông góc đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy hình vuông cạnh u, ΔSAB vuông cân tại S nằm trong mặt phẳng vuông góc với đáy. Tính d(BC, SA).',
    conditionSummary: 'u ∈ [2; 12]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh hình vuông đáy u', min: 2, max: 12 },
    ],
    validateCode: `
      const { u: edge } = params;
      if (edge < 2 || edge > 12) return { valid: false, reason: 'u ngoài miền [2; 12]' };
      const d = (edge * Math.SQRT2) / 2;
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge } = params;
      const d = (edge * Math.SQRT2) / 2;
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);
      const sbTex = edge % 2 === 0 ? (edge === 2 ? '\\sqrt{2}' : (edge / 2) + '\\sqrt{2}') : '\\dfrac{' + edge + '\\sqrt{2}}{2}';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh bằng $' + edge + '$, tam giác $SAB$ vuông cân tại $S$ và nằm trong mặt phẳng vuông góc với $(ABCD)$. Tính khoảng cách giữa hai đường thẳng $BC$ và $SA$ (kết quả làm tròn đến hàng phần mười).',
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
          'Gọi $H$ là trung điểm $AB \\Rightarrow SH \\perp (ABCD)$ (do $(SAB) \\perp (ABCD)$ theo giao tuyến $AB$).',
          'Ta có $BC \\perp AB$ và $BC \\perp SH \\Rightarrow BC \\perp (SAB)$. Lại có $\\triangle SAB$ vuông cân tại $S$ nên $SB \\perp SA$.',
          'Suy ra $SB$ là đoạn vuông góc chung của $BC$ và $SA$, vậy $d(BC, SA) = SB = \\dfrac{AB}{\\sqrt{2}} = ' + sbTex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 đã hiệu chỉnh (4 -> 2,8)', params: { u: 4 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Chóp S.ABCD đáy vuông cạnh u, hình chiếu của S là trọng tâm H của ΔABC, SH = k√2 -> d(AC, SD)
  t11_b26_d33_sq_pyr_centroid_ac_sd_sa: {
    id: 't11_b26_d33_sq_pyr_centroid_ac_sd_sa',
    name: 'Khoảng cách giữa AC và SD trong chóp đáy vuông có đường cao qua trọng tâm ΔABC (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy hình vuông cạnh u, hình chiếu của S là trọng tâm H của ΔABC, SH = k√2. Tính d(AC, SD).',
    conditionSummary: 'u ∈ [3; 12] (bội 3 cho đẹp hoặc bất kì), k ∈ [2; 10]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh hình vuông đáy u', min: 3, max: 12 },
      { name: 'k', label: 'Hệ số chiều cao SH = k√2', min: 2, max: 10 },
    ],
    validateCode: `
      const { u: edge, k } = params;
      if (edge < 3 || edge > 12 || k < 2 || k > 10) return { valid: false, reason: 'Tham số ngoài miền' };
      const sh = k * Math.SQRT2;
      const dh = (2 * edge * Math.SQRT2) / 3;
      const hk = (sh * dh) / Math.sqrt(sh * sh + dh * dh);
      const d = 0.75 * hk;
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, k } = params;
      const sh = k * Math.SQRT2;
      const dh = (2 * edge * Math.SQRT2) / 3;
      const hk = (sh * dh) / Math.sqrt(sh * sh + dh * dh);
      const d = 0.75 * hk;
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);
      const dhFrac = u.simplifyFrac(2 * edge, 3);
      const dhTex = dhFrac.isInteger ? (dhFrac.num === 1 ? '\\sqrt{2}' : dhFrac.num + '\\sqrt{2}') : '\\dfrac{' + dhFrac.num + '\\sqrt{2}}{' + dhFrac.den + '}';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông với $AB = ' + edge + '$. Biết rằng hình chiếu vuông góc của $S$ trên mặt phẳng $(ABCD)$ là trọng tâm $H$ của tam giác $ABC$ và $SH = ' + k + '\\sqrt{2}$. Khoảng cách giữa hai đường thẳng $AC$ và $SD$ bằng bao nhiêu? (Không làm tròn các bước trung gian, chỉ làm tròn kết quả cuối cùng đến hàng phần mười)',
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
          'Gọi $O = AC \\cap BD$. Dựng hình bình hành $ACDE$ ($DE \\parallel AC \\Rightarrow AC \\parallel (SDE)$), suy ra $d(AC, SD) = d(O, (SDE))$.',
          'Kẻ $HK \\perp SD$ ($K \\in SD$). Do $DE \\perp (SDH)$ nên $HK \\perp (SDE) \\Rightarrow d(H, (SDE)) = HK$, với $DH = \\dfrac{2}{3}BD = ' + dhTex + '$ và $\\dfrac{1}{HK^2} = \\dfrac{1}{SH^2} + \\dfrac{1}{DH^2}$.',
          'Mặt khác $\\dfrac{d(O, (SDE))}{d(H, (SDE))} = \\dfrac{OD}{HD} = \\dfrac{3}{4} \\Rightarrow d(AC, SD) = \\dfrac{3}{4}HK \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 2', params: { u: 2, k: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (5,1)', params: { u: 9, k: 8 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Chóp S.ABCD đáy thoi tâm O cạnh √q, AC = 2m, SO = h, SO ⊥ (ABCD), M trung điểm SC -> d(SA, BM)
  // LƯU Ý HIỆU CHỈNH: d(SA, BM) = 3V/(S_OMB) = hm / √(h² + m²); với q=5, m=2, h=4 kết quả đúng là 4√5/5 ≈ 1,8 (nguồn ghi nhầm 8√21/21 ≈ 1,7).
  t11_b26_d34_rhombus_so_sa_bm_sa: {
    id: 't11_b26_d34_rhombus_so_sa_bm_sa',
    name: 'Khoảng cách giữa SA và trung tuyến BM của chóp đáy hình thoi (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy hình thoi tâm O cạnh √q, AC = 2m, SO = h, SO ⊥ (ABCD), M trung điểm SC. Tính d(SA, BM).',
    conditionSummary: 'q ∈ [5; 25], m ∈ [2; 4], m² < q, h ∈ [2; 8]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh hình thoi q (cạnh = √q)', min: 5, max: 25 },
      { name: 'm', label: 'Nửa đường chéo AC: m (AC = 2m)', min: 2, max: 4 },
      { name: 'h', label: 'Chiều cao SO = h', min: 2, max: 8 },
    ],
    validateCode: `
      const { q, m, h } = params;
      if (q < 5 || q > 25 || m < 2 || m > 4 || h < 2 || h > 8) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (m * m >= q) {
        return { valid: false, reason: 'Cần có OC < BC (m² < q)' };
      }
      const d = (h * m) / Math.sqrt(h * h + m * m);
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, m, h } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const edgeTex = rad(q);
      const ac = 2 * m;
      const obTex = rad(q - m * m);
      const d = (h * m) / Math.sqrt(h * h + m * m);
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình thoi tâm $O$ cạnh $' + edgeTex + '$, $AC = ' + ac + '$, $SO = ' + h + '$ và $SO \\perp (ABCD)$. Gọi $M$ là trung điểm của $SC$. Tính khoảng cách giữa hai đường thẳng $SA$ và $BM$ (kết quả làm tròn đến hàng phần mười).',
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
          'Vì $OM \\parallel SA$ nên $SA \\parallel (OBM) \\Rightarrow d(SA, BM) = d(S, (OBM)) = d(C, (OBM)) = \\dfrac{3V_{C.OMB}}{S_{OMB}}$.',
          'Ta có $OC = ' + m + ' \\Rightarrow OB = \\sqrt{' + q + ' - ' + (m * m) + '} = ' + obTex + '$, $OM = \\dfrac{SA}{2} = \\dfrac{\\sqrt{' + (h * h + m * m) + '}}{2}$ và $OB \\perp (SAC) \\Rightarrow OB \\perp OM$.',
          'Rút gọn biểu thức thể tích và diện tích (hoặc nhận xét $(OBM) \\perp (SAC)$ nên $d(SA, BM) = d(O, SA)$): $d(SA, BM) = \\dfrac{SO \\cdot OA}{\\sqrt{SO^2 + OA^2}} = \\dfrac{' + (h * m) + '}{\\sqrt{' + (h * h + m * m) + '}} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m² ≥ q (q=5, m=3)', params: { q: 5, m: 3, h: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 đã hiệu chỉnh (1,8)', params: { q: 5, m: 2, h: 4 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Chóp S.ABCD đáy chữ nhật AD=2AB, SA ⊥ (ABCD), SC = k√5, góc (SC, đáy) = α, M trung điểm BC -> d(AM, SD)
  t11_b26_d35_rect_pyr_2ab_am_sd_sa: {
    id: 't11_b26_d35_rect_pyr_2ab_am_sd_sa',
    name: 'Khoảng cách giữa trung tuyến AM và cạnh bên SD trong chóp đáy chữ nhật tỉ lệ 2:1 (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy chữ nhật AD = 2AB, SA ⊥ (ABCD), SC = k√5, góc giữa SC và (ABCD) bằng α, M trung điểm BC. Tính d(AM, SD).',
    conditionSummary: 'k ∈ [2; 6], degIdx ∈ [0; 2] (30°, 45°, 60°)',
    paramSpecs: [
      { name: 'k', label: 'Hệ số cạnh huyền SC = k√5', min: 2, max: 6 },
      { name: 'degIdx', label: 'Góc giữa SC và đáy (0: 30°, 1: 45°, 2: 60°)', min: 0, max: 2 },
    ],
    validateCode: `
      const { k, degIdx } = params;
      if (k < 2 || k > 6 || degIdx < 0 || degIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const alpha = [30, 45, 60][degIdx] * Math.PI / 180;
      const sa = k * Math.sqrt(5) * Math.sin(alpha);
      const ab = k * Math.cos(alpha);
      const an = ab * Math.SQRT2;
      const ah = (sa * an) / Math.sqrt(sa * sa + an * an);
      const frac = ah * 10 - Math.floor(ah * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, degIdx } = params;
      const alphaDeg = [30, 45, 60][degIdx];
      const alpha = alphaDeg * Math.PI / 180;
      const sa = k * Math.sqrt(5) * Math.sin(alpha);
      const ab = k * Math.cos(alpha);
      const an = ab * Math.SQRT2;
      const ah = (sa * an) / Math.sqrt(sa * sa + an * an);
      const numVal = Number(ah.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật $ABCD$ có $AD = 2AB$, $SA \\perp (ABCD)$, $SC = ' + k + '\\sqrt{5}$ và góc giữa $SC$ và $(ABCD)$ bằng $' + alphaDeg + '^\\circ$, $M$ là trung điểm của cạnh $BC$. Tính khoảng cách giữa hai đường thẳng $AM$ và $SD$ (kết quả làm tròn đến hàng phần mười).',
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
          'Góc giữa $SC$ và $(ABCD)$ là $\\widehat{SCA} = ' + alphaDeg + '^\\circ \\Rightarrow AC = SC \\cos ' + alphaDeg + '^\\circ$, $SA = SC \\sin ' + alphaDeg + '^\\circ$.',
          'Do $AD = 2AB$ nên $AC = AB\\sqrt{5} \\Rightarrow AB = ' + u.formatNumberVN(ab, 3) + '$. Dựng hình bình hành $AMDN$ ($AM \\parallel DN \\Rightarrow AM \\parallel (SDN)$). Vì $\\triangle ABM, \\triangle DCM$ vuông cân nên $AM \\perp MD \\Rightarrow AN \\perp DN$ và $AN = AB\\sqrt{2}$.',
          'Khi đó $DN \\perp (SAN)$. Kẻ $AH \\perp SN \\Rightarrow AH \\perp (SDN)$, với $\\dfrac{1}{AH^2} = \\dfrac{1}{SA^2} + \\dfrac{1}{AN^2} \\Rightarrow d(AM, SD) = AH \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1, degIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 (1,3)', params: { k: 2, degIdx: 2 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh u, AA' = k√3 -> d(BD, CD')
  t11_b26_d36_cuboid_bd_cd1_sa: {
    id: 't11_b26_d36_cuboid_bd_cd1_sa',
    name: 'Khoảng cách giữa BD và CD\' trong hình hộp chữ nhật đáy vuông (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho hình hộp chữ nhật ABCD.A\'B\'C\'D\' đáy ABCD là hình vuông cạnh u, AA\' = k√3. Tính d(BD, CD\').',
    conditionSummary: 'u ∈ [2; 10], k ∈ [1; 5]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh hình vuông đáy u', min: 2, max: 10 },
      { name: 'k', label: 'Hệ số chiều cao AA\' = k√3', min: 1, max: 5 },
    ],
    validateCode: `
      const { u: edge, k } = params;
      if (edge < 2 || edge > 10 || k < 1 || k > 5) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = (edge * k * Math.sqrt(3)) / Math.sqrt(6 * k * k + edge * edge);
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, k } = params;
      const aaTex = k === 1 ? '\\sqrt{3}' : k + '\\sqrt{3}';
      const d = (edge * k * Math.sqrt(3)) / Math.sqrt(6 * k * k + edge * edge);
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy $ABCD$ là hình vuông cạnh $" + edge + "$, $AA' = " + aaTex + "$. Tính khoảng cách giữa hai đường thẳng $BD$ và $CD'$ (kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 1 },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          "Vì $CD' \\parallel AB'$ nên $CD' \\parallel (BDA') \\Rightarrow d(BD, CD') = d(CD', (BDA')) = d(C, (BDA')) = d(A, (BDA'))$.",
          "Xét tam diện vuông $A.BDA'$ tại $A$ với $AB = AD = " + edge + "$, $AA' = " + aaTex + "$.",
          "Đặt $h = d(A, (BDA'))$, ta có $\\dfrac{1}{h^2} = \\dfrac{1}{AB^2} + \\dfrac{1}{AD^2} + \\dfrac{1}{AA'^2} = \\dfrac{2}{" + (edge * edge) + "} + \\dfrac{1}{" + (3 * k * k) + "} \\Rightarrow d(BD, CD') = h \\approx " + ansStr + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (2,7)', params: { u: 6, k: 2 }, expectedValid: true },
    ],
  },
};
