import { MathTemplate } from '../types/math';

export const G11_B24_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D14 (Q14): Lăng trụ đứng ABC.DEF đáy đều, AB = u, AD = √k -> góc giữa DP và AB
  t11_b24_d14_standing_prism_dp_ab_sa: {
    id: 't11_b24_d14_standing_prism_dp_ab_sa',
    name: 'Góc giữa đường chéo DP (đỉnh trên tới trung điểm BC) và AB trong lăng trụ đứng (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Cho lăng trụ đứng ABC.DEF đáy tam giác đều cạnh u, AD = √k, P trung điểm BC. Tính góc giữa DP và AB.',
    conditionSummary: 'u ∈ [2; 8], k ∈ [2; 12], tránh ranh giới .x5 độ',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u', min: 2, max: 8 },
      { name: 'k', label: 'Biểu thức chiều cao AD = √k', min: 2, max: 12 },
    ],
    validateCode: `
      const { u: edge, k } = params;
      if (edge < 2 || edge > 8 || k < 2 || k > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const cosV = (3 * edge) / (4 * Math.sqrt(k + 0.75 * edge * edge));
      const deg = Math.acos(cosV) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, k } = params;
      const simplifyRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1
          ? String(out)
          : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const fmtFracHalf = (n) => (n % 2 === 0 ? String(n / 2) : '\\dfrac{' + n + '}{2}');
      const fmtFracQuarter = (n) => (n % 4 === 0 ? String(n / 4) : (n % 2 === 0 ? '\\dfrac{' + (n / 2) + '}{2}' : '\\dfrac{' + n + '}{4}'));

      const adTex = simplifyRad(k);
      const pn2 = (edge * edge) / 4;
      const dn2x4 = 4 * k + edge * edge;
      const dp2x4 = 4 * k + 3 * edge * edge;
      const dnTex = dn2x4 % 4 === 0 ? simplifyRad(dn2x4 / 4) : (dn2x4 % 2 === 0 ? '\\dfrac{' + simplifyRad(dn2x4) + '}{2}' : '\\dfrac{' + simplifyRad(dn2x4) + '}{2}');
      const dpTex = dp2x4 % 4 === 0 ? simplifyRad(dp2x4 / 4) : '\\dfrac{' + simplifyRad(dp2x4) + '}{2}';

      const cosV = (3 * edge) / (4 * Math.sqrt(k + 0.75 * edge * edge));
      const deg = Math.round((Math.acos(cosV) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const cosApprox = cosV.toFixed(4).replace('.', ',');

      return {
        stem: 'Cho lăng trụ đứng $ABC.DEF$ có đáy là tam giác đều, $AB = ' + edge + '$, $AD = ' + adTex + '$. Gọi $P$ là trung điểm của cạnh $BC$. Tính góc giữa hai đường thẳng $DP$ và $AB$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: 'D', tF: 'E', tR: 'F' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Gọi $N$ là trung điểm của $AC$. Khi đó $PN \\parallel AB$ nên $(DP, AB) = (DP, PN) = \\widehat{DPN}$ (vì góc nhọn).',
          'Ta có $PN = ' + fmtFracHalf(edge) + '$, $DN^2 = AD^2 + AN^2 = ' + k + ' + ' + fmtFracQuarter(edge * edge) + '$ ($DN = ' + dnTex + '$), $DP^2 = AD^2 + AP^2 = ' + k + ' + ' + fmtFracQuarter(3 * edge * edge) + '$ ($DP = ' + dpTex + '$).',
          'Áp dụng định lí côsin trong $\\triangle DPN$: $\\cos \\widehat{DPN} = \\dfrac{DP^2 + PN^2 - DN^2}{2 \\cdot DP \\cdot PN} \\approx ' + cosApprox + ' \\Rightarrow (DP, AB) \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (36,7)', params: { u: 4, k: 2 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Lăng trụ đứng ABC.A1B1C1 đáy đều, AB = u, CC1 = h -> góc giữa A1B và B1C1
  t11_b24_d15_standing_prism_a1b_b1c1_sa: {
    id: 't11_b24_d15_standing_prism_a1b_b1c1_sa',
    name: 'Góc giữa đường chéo mặt bên A₁B và cạnh đáy B₁C₁ (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Cho lăng trụ đứng ABC.A₁B₁C₁ đáy tam giác đều cạnh u, chiều cao CC₁ = h. Tính góc giữa A₁B và B₁C₁.',
    conditionSummary: 'u ∈ [2; 9], h ∈ [2; 9], tránh ranh giới .x5 độ',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u', min: 2, max: 9 },
      { name: 'h', label: 'Chiều cao lăng trụ CC₁ = h', min: 2, max: 9 },
    ],
    validateCode: `
      const { u: edge, h } = params;
      if (edge < 2 || edge > 9 || h < 2 || h > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const cosV = edge / (2 * Math.sqrt(edge * edge + h * h));
      const deg = Math.acos(cosV) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h } = params;
      const simplifyRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1
          ? String(out)
          : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const bqTex = edge % 2 === 0 ? String(edge / 2) : '\\dfrac{' + edge + '}{2}';
      const ba1Tex = simplifyRad(edge * edge + h * h);
      const cosV = edge / (2 * Math.sqrt(edge * edge + h * h));
      const deg = Math.round((Math.acos(cosV) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const cosApprox = cosV.toFixed(4).replace('.', ',');

      return {
        stem: 'Cho lăng trụ đứng $ABC.A_1B_1C_1$ có đáy là tam giác đều, $AB = ' + edge + '$, $CC_1 = ' + h + '$. Tính góc giữa hai đường thẳng $A_1B$ và $B_1C_1$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: 'A_1', tF: 'B_1', tR: 'C_1' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Gọi $Q$ là trung điểm của $BC$. Vì $B_1C_1 \\parallel BC$ và $\\triangle A_1BC$ cân tại $A_1$ nên $(A_1B, B_1C_1) = (A_1B, BC) = \\widehat{A_1BQ}$.',
          'Ta có $BQ = ' + bqTex + '$, $BA_1 = \\sqrt{AB^2 + AA_1^2} = ' + ba1Tex + '$.',
          'Suy ra $\\cos \\widehat{A_1BQ} = \\dfrac{BQ}{BA_1} = \\dfrac{' + bqTex + '}{' + ba1Tex + '} \\approx ' + cosApprox + ' \\Rightarrow (A_1B, B_1C_1) \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, h: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (69,3)', params: { u: 2, h: 2 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Lăng trụ đứng ABC.A'B'C' đáy đều, AB = u, CC' = √k, P trung điểm AB -> góc A'P và B'C'
  t11_b24_d16_standing_prism_aprime_p_sa: {
    id: 't11_b24_d16_standing_prism_aprime_p_sa',
    name: 'Góc giữa đường nối A\'P (P trung điểm AB) và cạnh đáy B\'C\' (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Cho lăng trụ đứng ABC.A\'B\'C\' đáy đều cạnh u, CC\' = √k, P trung điểm AB. Tính góc giữa A\'P và B\'C\'.',
    conditionSummary: 'u ∈ [2; 9], k ∈ [2; 12], tránh ranh giới .x5 độ',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u', min: 2, max: 9 },
      { name: 'k', label: 'Biểu thức chiều cao CC\' = √k', min: 2, max: 12 },
    ],
    validateCode: `
      const { u: edge, k } = params;
      if (edge < 2 || edge > 9 || k < 2 || k > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const cosV = edge / (2 * Math.sqrt(edge * edge + 4 * k));
      const deg = Math.acos(cosV) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, k } = params;
      const simplifyRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1
          ? String(out)
          : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const ccTex = simplifyRad(k);
      const apTex = edge % 2 === 0 ? String(edge / 2) : '\\dfrac{' + edge + '}{2}';
      const piTex = edge % 4 === 0 ? String(edge / 4) : (edge % 2 === 0 ? '\\dfrac{' + (edge / 2) + '}{2}' : '\\dfrac{' + edge + '}{4}');
      const ap2x4 = edge * edge + 4 * k;
      const aprimePTex = ap2x4 % 4 === 0 ? simplifyRad(ap2x4 / 4) : '\\dfrac{' + simplifyRad(ap2x4) + '}{2}';

      const cosV = edge / (2 * Math.sqrt(ap2x4));
      const deg = Math.round((Math.acos(cosV) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const cosApprox = cosV.toFixed(4).replace('.', ',');

      return {
        stem: "Cho lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác đều, $AB = " + edge + "$, $CC' = " + ccTex + "$. Gọi $P$ là trung điểm của $AB$. Tính góc giữa hai đường thẳng $A'P$ và $B'C'$ (kết quả làm tròn đến hàng phần mười).",
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
          "Gọi $M$ là trung điểm của $AC$, $I$ là trung điểm của $PM$. Vì $PM \\parallel BC \\parallel B'C'$ và $\\triangle A'PM$ cân tại $A'$ nên $(A'P, B'C') = (A'P, PM) = \\widehat{A'PI}$.",
          "Ta có $AP = " + apTex + "$, $PI = " + piTex + "$, $A'P = \\sqrt{AP^2 + AA'^2} = " + aprimePTex + "$.",
          "Suy ra $\\cos \\widehat{A'PI} = \\dfrac{PI}{A'P} = \\dfrac{" + piTex + "}{" + aprimePTex + "} \\approx " + cosApprox + " \\Rightarrow (A'P, B'C') \\approx " + ansStr + "^\\circ$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { u: 5, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (65,7)', params: { u: 5, k: 3 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Lăng trụ đứng ABC.DEF đáy đều, AB = u, AD = √k, M,P trung điểm BE,BC -> góc AE và MP
  t11_b24_d17_standing_prism_ae_mp_sa: {
    id: 't11_b24_d17_standing_prism_ae_mp_sa',
    name: 'Góc giữa đường chéo mặt bên AE và đường trung bình MP (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Cho lăng trụ đứng ABC.DEF đáy đều cạnh u, AD = √k, M và P là trung điểm BE và BC. Tính góc giữa AE và MP.',
    conditionSummary: 'u ∈ [2; 9], k ∈ [2; 12], tránh ranh giới .x5 độ',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy tam giác đều u', min: 2, max: 9 },
      { name: 'k', label: 'Biểu thức chiều cao AD = √k', min: 2, max: 12 },
    ],
    validateCode: `
      const { u: edge, k } = params;
      if (edge < 2 || edge > 9 || k < 2 || k > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const cosV = (edge * edge + 2 * k) / (2 * (edge * edge + k));
      const deg = Math.acos(cosV) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, k } = params;
      const simplifyRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1
          ? String(out)
          : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const adTex = simplifyRad(k);
      const ae2 = edge * edge + k;
      const aeTex = simplifyRad(ae2);
      const cosNum = ae2 + ae2 - edge * edge;
      const cosDen = 2 * ae2;
      const cosV = cosNum / cosDen;
      const deg = Math.round((Math.acos(cosV) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const cosApprox = cosV.toFixed(4).replace('.', ',');

      return {
        stem: 'Cho lăng trụ đứng $ABC.DEF$ có đáy là tam giác đều, $AB = ' + edge + '$, $AD = ' + adTex + '$. Gọi $M, P$ lần lượt là trung điểm của $BE, BC$. Tính góc giữa hai đường thẳng $AE$ và $MP$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: 'D', tF: 'E', tR: 'F' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Vì $M, P$ lần lượt là trung điểm $BE, BC$ nên $MP \\parallel EC$. Suy ra $(AE, MP) = (AE, EC) = \\widehat{AEC}$.',
          'Ta có $AE = EC = \\sqrt{AB^2 + BE^2} = ' + aeTex + '$.',
          'Áp dụng định lí côsin trong $\\triangle AEC$: $\\cos \\widehat{AEC} = \\dfrac{AE^2 + EC^2 - AC^2}{2 \\cdot AE \\cdot EC} = \\dfrac{' + ae2 + ' + ' + ae2 + ' - ' + (edge * edge) + '}{2 \\cdot ' + ae2 + '} \\approx ' + cosApprox + ' \\Rightarrow (AE, MP) \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, k: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (56,4)', params: { u: 5, k: 3 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Lăng trụ xiên ABC.A1B1C1 đáy vuông tại A, AB = p, AC = q√2, cạnh bên ℓ, A1H ⊥ (ABC) tại trung điểm H của BC
  t11_b24_d18_oblique_prism_aa1_b1c1_sa: {
    id: 't11_b24_d18_oblique_prism_aa1_b1c1_sa',
    name: 'Góc giữa cạnh bên và cạnh đáy trong lăng trụ xiên (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phép chiếu vuông góc và góc giữa đường thẳng và mặt phẳng',
    description: 'Cho lăng trụ ABC.A₁B₁C₁ có đáy vuông tại A, AB = p, AC = q√2, cạnh bên ℓ, hình chiếu của A₁ trên (ABC) là trung điểm BC. Tính góc giữa AA₁ và B₁C₁.',
    conditionSummary: 'p ∈ [2; 6], q ∈ [1; 5], ℓ ∈ [4; 12], ℓ > √(p² + 2q²)/2 + 1',
    paramSpecs: [
      { name: 'p', label: 'Độ dài cạnh AB = p', min: 2, max: 6 },
      { name: 'q', label: 'Hệ số cạnh AC = q√2', min: 1, max: 5 },
      { name: 'ell', label: 'Độ dài cạnh bên ℓ', min: 4, max: 12 },
    ],
    validateCode: `
      const { p, q, ell } = params;
      if (p < 2 || p > 6 || q < 1 || q > 5 || ell < 4 || ell > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const bc2 = p * p + 2 * q * q;
      const ah = Math.sqrt(bc2) / 2;
      if (ell <= ah + 1) {
        return { valid: false, reason: 'Cạnh bên phải lớn hơn AH để tồn tại lăng trụ' };
      }
      const cosV = Math.abs(2 * q * q - p * p) / (2 * ell * Math.sqrt(bc2));
      if (cosV >= 0.99) {
        return { valid: false, reason: 'Góc quá gần 0 độ' };
      }
      const deg = Math.acos(cosV) * 180 / Math.PI;
      const frac = (deg * 10) - Math.floor(deg * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, ell } = params;
      const simplifyRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1
          ? String(out)
          : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const ac2 = 2 * q * q;
      const bc2 = p * p + ac2;
      const bcTex = simplifyRad(bc2);
      const ahTex = bc2 % 4 === 0 ? simplifyRad(bc2 / 4) : '\\dfrac{' + bcTex + '}{2}';
      const a1h2Num = 4 * ell * ell - bc2;
      const a1hTex = a1h2Num % 4 === 0 ? simplifyRad(a1h2Num / 4) : '\\dfrac{' + simplifyRad(a1h2Num) + '}{2}';
      const b1h2Num = 4 * p * p + a1h2Num;
      const b1hTex = b1h2Num % 4 === 0 ? simplifyRad(b1h2Num / 4) : '\\dfrac{' + simplifyRad(b1h2Num) + '}{2}';

      const cosV = Math.abs(ac2 - p * p) / (2 * ell * Math.sqrt(bc2));
      const deg = Math.round((Math.acos(cosV) * 180 / Math.PI) * 10) / 10;
      const ansStr = deg.toFixed(1).replace('.', ',');
      const cosApprox = cosV.toFixed(4).replace('.', ',');
      const acTex = (q === 1 ? '' : String(q)) + '\\sqrt{2}';

      return {
        stem: 'Cho hình lăng trụ $ABC.A_1B_1C_1$ có đáy là tam giác vuông tại $A$, $AB = ' + p + '$, $AC = ' + acTex + '$, độ dài cạnh bên bằng $' + ell + '$. Hình chiếu vuông góc của điểm $A_1$ trên mặt phẳng $(ABC)$ là trung điểm của cạnh $BC$. Tính góc giữa hai đường thẳng $AA_1$ và $B_1C_1$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: 'A_1', tF: 'B_1', tR: 'C_1' },
        },
        shortAnswer: ansStr,
        numericValue: deg,
        answerSummary: ansStr + '°',
        solutionSteps: [
          'Gọi $H$ là trung điểm của $BC$. Ta có $BC = \\sqrt{AB^2 + AC^2} = ' + bcTex + ' \\Rightarrow AH = \\dfrac{BC}{2} = BH = ' + ahTex + '$.',
          'Trong $\\triangle A_1AH$ vuông tại $H$: $A_1H = \\sqrt{AA_1^2 - AH^2} = ' + a1hTex + '$. Vì $A_1H \\perp (A_1B_1C_1)$ nên $B_1H = \\sqrt{B_1A_1^2 + A_1H^2} = ' + b1hTex + '$.',
          'Vì $AA_1 \\parallel BB_1$ và $B_1C_1 \\parallel BC$ nên $\\cos(AA_1, B_1C_1) = \\cos(BB_1, BH) = \\dfrac{\\left|BB_1^2 + BH^2 - B_1H^2\\right|}{2 \\cdot BB_1 \\cdot BH} \\approx ' + cosApprox + ' \\Rightarrow (AA_1, B_1C_1) \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ℓ ≤ AH + 1 (p=6, q=5, ℓ=4)', params: { p: 6, q: 5, ell: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (85,3)', params: { p: 2, q: 2, ell: 7 }, expectedValid: true },
    ],
  },
};
