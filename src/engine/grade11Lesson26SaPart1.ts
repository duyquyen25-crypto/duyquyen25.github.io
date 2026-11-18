import { MathTemplate } from '../types/math';

export const G11_B26_SA_PART1: Record<string, MathTemplate> = {
  // D16 (Q16): Lăng trụ đứng ABC.DEF biết DE=c, EF=a, AC=b, tính d(AD, BC)
  t11_b26_d16_standing_prism_heron_dist_sa: {
    id: 't11_b26_d16_standing_prism_heron_dist_sa',
    name: 'Khoảng cách giữa cạnh bên AD và cạnh đáy BC trong lăng trụ đứng (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho lăng trụ đứng ABC.DEF biết DE = c, EF = a, AC = b. Tính khoảng cách giữa AD và BC.',
    conditionSummary: 'c ∈ [4; 9], a ∈ [3; 8], b ∈ [3; 8], bất đẳng thức tam giác nghiêm ngặt',
    paramSpecs: [
      { name: 'c', label: 'Độ dài DE = AB = c', min: 4, max: 9 },
      { name: 'u', label: 'Độ dài EF = BC = u', min: 3, max: 8 },
      { name: 'b', label: 'Độ dài AC = b', min: 3, max: 8 },
    ],
    validateCode: `
      const { c, u: a, b } = params;
      if (c < 4 || c > 9 || a < 3 || a > 8 || b < 3 || b > 8) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (a + b <= c || a + c <= b || b + c <= a) {
        return { valid: false, reason: 'Không thỏa mãn bất đẳng thức tam giác' };
      }
      const p = (a + b + c) / 2;
      const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
      const ah = (2 * area) / a;
      const frac = ah * 100 - Math.floor(ah * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .005' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, u: a, b } = params;
      const p = (a + b + c) / 2;
      const num16 = (a + b + c) * (b + c - a) * (a + c - b) * (a + b - c);
      const area = Math.sqrt(num16) / 4;
      const ah = (2 * area) / a;
      const numVal = Number(ah.toFixed(2));
      const ansStr = u.formatNumberVN(numVal, 2);
      const pTex = (a + b + c) % 2 === 0 ? String(p) : '\\dfrac{' + (a + b + c) + '}{2}';

      return {
        stem: 'Cho hình lăng trụ đứng $ABC.DEF$ có $DE = ' + c + '$, $EF = ' + a + '$, $AC = ' + b + '$. Tính khoảng cách giữa $AD$ và $BC$ (kết quả làm tròn đến hàng phần trăm).',
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
          'Kẻ $AH \\perp BC$ ($H \\in BC$). Vì lăng trụ đứng nên $AD \\perp (ABC) \\Rightarrow AD \\perp AH$, suy ra $d(AD, BC) = AH$.',
          'Tam giác $ABC$ có $AB = DE = ' + c + '$, $BC = EF = ' + a + '$, $AC = ' + b + '$, nửa chu vi $p = ' + pTex + '$.',
          'Áp dụng công thức Hê-rông: $S_{ABC} = \\sqrt{p(p-' + a + ')(p-' + b + ')(p-' + c + ')} \\approx ' + u.formatNumberVN(area, 4) + ' \\Rightarrow AH = \\dfrac{2S_{ABC}}{BC} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vi phạm bất đẳng thức tam giác (c=8, u=4, b=3)', params: { c: 8, u: 4, b: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (2,67)', params: { c: 6, u: 4, b: 3 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Chóp S.ABC vuông cân cạnh góc vuông k√2, thể tích V -> d(S, (ABC))
  t11_b26_d17_vol_to_height_iso_right_sa: {
    id: 't11_b26_d17_vol_to_height_iso_right_sa',
    name: 'Khoảng cách từ đỉnh đến đáy từ thể tích chóp đáy vuông cân (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABC đáy tam giác vuông cân cạnh góc vuông k√2, thể tích V. Tính d(S, (ABC)).',
    conditionSummary: 'k ∈ [1; 5], v ∈ [3; 20]',
    paramSpecs: [
      { name: 'k', label: 'Hệ số cạnh góc vuông k (cạnh = k√2)', min: 1, max: 5 },
      { name: 'v', label: 'Thể tích khối chóp V', min: 3, max: 20 },
    ],
    validateCode: `
      const { k, v } = params;
      if (k < 1 || k > 5 || v < 3 || v > 20) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = (3 * v) / (k * k);
      const frac = d * 100 - Math.floor(d * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .005' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, v } = params;
      const legTex = k === 1 ? '\\sqrt{2}' : k + '\\sqrt{2}';
      const area = k * k;
      const d = (3 * v) / area;
      const numVal = Number(d.toFixed(2));
      const ansStr = u.formatNumberVN(numVal, 2);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông cân, cạnh góc vuông bằng $' + legTex + '$. Biết thể tích khối chóp đã cho bằng $' + v + '$. Tính khoảng cách từ điểm $S$ đến mặt phẳng $(ABC)$ (kết quả làm tròn đến hàng phần trăm).',
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
          'Diện tích tam giác đáy $ABC$ là $S_{ABC} = \\dfrac{1}{2}(' + legTex + ')^2 = ' + area + '$.',
          'Khoảng cách từ $S$ đến mặt phẳng $(ABC)$ chính là chiều cao $h$: $d(S, (ABC)) = \\dfrac{3V_{S.ABC}}{S_{ABC}} = \\dfrac{' + (3 * v) + '}{' + area + '} = ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, v: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (4,5)', params: { k: 2, v: 6 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Chóp S.ABC đáy đều cạnh √q, thể tích V -> d(S, (ABC))
  t11_b26_d18_vol_to_height_equi_sa: {
    id: 't11_b26_d18_vol_to_height_equi_sa',
    name: 'Khoảng cách từ đỉnh đến đáy từ thể tích chóp đáy đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABC đáy tam giác đều cạnh √q, thể tích V. Tính d(S, (ABC)).',
    conditionSummary: 'q ∈ [3; 18], v ∈ [3; 18]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh đáy q (AB = √q)', min: 3, max: 18 },
      { name: 'v', label: 'Thể tích khối chóp V', min: 3, max: 18 },
    ],
    validateCode: `
      const { q, v } = params;
      if (q < 3 || q > 18 || v < 3 || v > 18) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = (4 * Math.sqrt(3) * v) / q;
      const frac = d * 100 - Math.floor(d * 100);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .005' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, v } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const sideTex = rad(q);
      const d = (4 * Math.sqrt(3) * v) / q;
      const numVal = Number(d.toFixed(2));
      const ansStr = u.formatNumberVN(numVal, 2);
      const areaFrac = u.simplifyFrac(q, 4);
      const areaTex = areaFrac.isInteger
        ? (areaFrac.num === 1 ? '\\sqrt{3}' : areaFrac.num + '\\sqrt{3}')
        : '\\dfrac{' + (areaFrac.num === 1 ? '' : areaFrac.num) + '\\sqrt{3}}{' + areaFrac.den + '}';

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều, $AB = ' + sideTex + '$. Biết thể tích khối chóp đã cho bằng $' + v + '$. Tính khoảng cách từ điểm $S$ đến mặt phẳng $(ABC)$ (kết quả làm tròn đến hàng phần trăm).',
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
          'Diện tích tam giác đều $ABC$ là $S_{ABC} = \\dfrac{(' + sideTex + ')^2\\sqrt{3}}{4} = ' + areaTex + '$.',
          'Khoảng cách từ $S$ đến $(ABC)$ bằng $d(S, (ABC)) = \\dfrac{3V_{S.ABC}}{S_{ABC}} = \\dfrac{' + (3 * v) + '}{' + areaTex + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 2', params: { q: 2, v: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (4,16)', params: { q: 10, v: 6 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Chóp S.ABCD đáy vuông cạnh u, ΔSCD vuông tại D, SD = k√2, thể tích V -> d(A, (SCD))
  t11_b26_d19_vol_to_dist_sq_pyr_sa: {
    id: 't11_b26_d19_vol_to_dist_sq_pyr_sa',
    name: 'Khoảng cách từ đỉnh đáy đến mặt bên từ thể tích chóp tứ giác (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy hình vuông cạnh u, ΔSCD vuông tại D, SD = k√2, thể tích chóp bằng V. Tính d(A, (SCD)).',
    conditionSummary: 'u ∈ [2; 6], k ∈ [1; 5], v ∈ [2; 16]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh hình vuông đáy u', min: 2, max: 6 },
      { name: 'k', label: 'Hệ số SD = k√2', min: 1, max: 5 },
      { name: 'v', label: 'Thể tích khối chóp V', min: 2, max: 16 },
    ],
    validateCode: `
      const { u: edge, k, v } = params;
      if (edge < 2 || edge > 6 || k < 1 || k > 5 || v < 2 || v > 16) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const d = (3 * v) / (edge * k * Math.SQRT2);
      const frac = d * 100 - Math.floor(d * 100);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .005' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, k, v } = params;
      const sdTex = k === 1 ? '\\sqrt{2}' : k + '\\sqrt{2}';
      const d = (3 * v) / (edge * k * Math.SQRT2);
      const numVal = Number(d.toFixed(2));
      const ansStr = u.formatNumberVN(numVal, 2);
      const areaFrac = u.simplifyFrac(edge * k, 2);
      const areaTex = areaFrac.isInteger
        ? (areaFrac.num === 1 ? '\\sqrt{2}' : areaFrac.num + '\\sqrt{2}')
        : '\\dfrac{' + (areaFrac.num === 1 ? '' : areaFrac.num) + '\\sqrt{2}}{' + areaFrac.den + '}';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh bằng $' + edge + '$. Tam giác $SCD$ vuông tại $D$ và $SD = ' + sdTex + '$. Biết thể tích khối chóp $S.ABCD$ bằng $' + v + '$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SCD)$ (kết quả làm tròn đến hàng phần trăm).',
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
          'Diện tích tam giác $SCD$ vuông tại $D$ là $S_{SCD} = \\dfrac{1}{2} CD \\cdot SD = \\dfrac{1}{2} \\cdot ' + edge + ' \\cdot ' + sdTex + ' = ' + areaTex + '$.',
          'Vì $S_{ACD} = \\dfrac{1}{2} S_{ABCD}$ nên $V_{A.SCD} = V_{S.ACD} = \\dfrac{1}{2} V_{S.ABCD} = \\dfrac{' + v + '}{2}$.',
          'Do đó $d(A, (SCD)) = \\dfrac{3 V_{A.SCD}}{S_{SCD}} = \\dfrac{' + (3 * v) + '}{2 \\cdot ' + areaTex + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, k: 2, v: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (1,59)', params: { u: 2, k: 2, v: 3 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Chóp S.ABC đáy đều cạnh √q, SA ⊥ (ABC), SA = h -> d(A, (SBC))
  t11_b26_d20_tri_equi_a_sbc_sa: {
    id: 't11_b26_d20_tri_equi_a_sbc_sa',
    name: 'Khoảng cách từ chân đường cao đến mặt đối diện trong chóp tam giác đều đáy (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABC đáy tam giác đều cạnh √q, SA ⊥ (ABC), SA = h. Tính d(A, (SBC)).',
    conditionSummary: 'q ∈ [2; 12], h ∈ [1; 7]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh đáy q (cạnh = √q)', min: 2, max: 12 },
      { name: 'h', label: 'Chiều cao SA = h', min: 1, max: 7 },
    ],
    validateCode: `
      const { q, h } = params;
      if (q < 2 || q > 12 || h < 1 || h > 7) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = (h * Math.sqrt(3 * q)) / Math.sqrt(4 * h * h + 3 * q);
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, h } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const sideTex = rad(q);
      const amTex = '\\dfrac{' + rad(3 * q) + '}{2}';
      const d = (h * Math.sqrt(3 * q)) / Math.sqrt(4 * h * h + 3 * q);
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều cạnh bằng $' + sideTex + '$, $SA \\perp (ABC)$, $SA = ' + h + '$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { midEdge: 1 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', mid: 'M' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $M$ là trung điểm của $BC \\Rightarrow AM \\perp BC$ và $AM = \\dfrac{' + sideTex + '\\sqrt{3}}{2} = ' + amTex + '$.',
          'Vì $SA \\perp BC$ nên $BC \\perp (SAM)$. Dựng $AH \\perp SM$ ($H \\in SM$) $\\Rightarrow AH \\perp (SBC)$.',
          'Do đó $d(A, (SBC)) = AH = \\dfrac{SA \\cdot AM}{\\sqrt{SA^2 + AM^2}} = \\dfrac{' + h + ' \\cdot ' + amTex + '}{\\sqrt{' + (h * h) + ' + \\dfrac{' + (3 * q) + '}{4}}} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { q: 1, h: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (1,7)', params: { q: 6, h: 3 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Chóp S.ABC đáy vuông tại A, AB = √p, AC = √q, SA = h -> d(A, (SBC))
  t11_b26_d21_tri_right_a_sbc_sa: {
    id: 't11_b26_d21_tri_right_a_sbc_sa',
    name: 'Khoảng cách từ chân đường cao trong chóp tam giác vuông tại A (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABC có đáy vuông tại A, AB = √p, AC = √q, SA ⊥ (ABC), SA = h. Tính d(A, (SBC)).',
    conditionSummary: 'p ∈ [2; 9], q ∈ [2; 9], h ∈ [2; 7]',
    paramSpecs: [
      { name: 'p', label: 'Bình phương cạnh AB: p (AB = √p)', min: 2, max: 9 },
      { name: 'q', label: 'Bình phương cạnh AC: q (AC = √q)', min: 2, max: 9 },
      { name: 'h', label: 'Chiều cao SA = h', min: 2, max: 7 },
    ],
    validateCode: `
      const { p, q, h } = params;
      if (p < 2 || p > 9 || q < 2 || q > 9 || h < 2 || h > 7) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = 1 / Math.sqrt(1 / p + 1 / q + 1 / (h * h));
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, h } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const abTex = rad(p), acTex = rad(q);
      const d = 1 / Math.sqrt(1 / p + 1 / q + 1 / (h * h));
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $A$, $AB = ' + abTex + '$, $AC = ' + acTex + '$, $SA \\perp (ABC)$, $SA = ' + h + '$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$ (kết quả làm tròn đến hàng phần mười).',
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
          'Vì $SA, AB, AC$ đôi một vuông góc tại $A$ nên tứ diện $S.ABC$ là tứ diện vuông tại $A$.',
          'Đặt $d = d(A, (SBC))$, ta có $\\dfrac{1}{d^2} = \\dfrac{1}{SA^2} + \\dfrac{1}{AB^2} + \\dfrac{1}{AC^2} = \\dfrac{1}{' + (h * h) + '} + \\dfrac{1}{' + p + '} + \\dfrac{1}{' + q + '}$.',
          'Suy ra $d(A, (SBC)) \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 1', params: { p: 1, q: 5, h: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (1,2)', params: { p: 3, q: 5, h: 3 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Chóp S.ABC đáy vuông cân tại A biết BC = c, SA = h -> d(A, (SBC))
  t11_b26_d22_tri_iso_right_a_sbc_sa: {
    id: 't11_b26_d22_tri_iso_right_a_sbc_sa',
    name: 'Khoảng cách từ chân đường cao trong chóp đáy vuông cân tại A (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABC đáy vuông cân tại A, BC = c, SA ⊥ (ABC), SA = h. Tính d(A, (SBC)).',
    conditionSummary: 'c ∈ [2; 10], h ∈ [1; 7]',
    paramSpecs: [
      { name: 'c', label: 'Cạnh huyền BC = c', min: 2, max: 10 },
      { name: 'h', label: 'Chiều cao SA = h', min: 1, max: 7 },
    ],
    validateCode: `
      const { c, h } = params;
      if (c < 2 || c > 10 || h < 1 || h > 7) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = (c * h) / Math.sqrt(4 * h * h + c * c);
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, h } = params;
      const d = (c * h) / Math.sqrt(4 * h * h + c * c);
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);
      const amFrac = u.simplifyFrac(c, 2);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông cân tại $A$, $BC = ' + c + '$, $SA \\perp (ABC)$, $SA = ' + h + '$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { midEdge: 1 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', mid: 'M' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $M$ là trung điểm $BC$. Vì $\\triangle ABC$ vuông cân tại $A$ nên $AM \\perp BC$ và $AM = \\dfrac{BC}{2} = ' + amFrac.latex + '$.',
          'Dựng $AH \\perp SM$ ($H \\in SM$). Do $BC \\perp (SAM)$ nên $AH \\perp (SBC)$.',
          'Suy ra $d(A, (SBC)) = AH = \\dfrac{SA \\cdot AM}{\\sqrt{SA^2 + AM^2}} = \\dfrac{' + h + ' \\cdot ' + amFrac.latex + '}{\\sqrt{' + (h * h) + ' + \\dfrac{' + (c * c) + '}{4}}} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 1', params: { c: 1, h: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (1,4)', params: { c: 4, h: 2 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Chóp S.ABC đáy đều cạnh √q, SA = h, G trọng tâm ΔABC -> d(G, (SBC))
  t11_b26_d23_tri_equi_centroid_sbc_sa: {
    id: 't11_b26_d23_tri_equi_centroid_sbc_sa',
    name: 'Khoảng cách từ trọng tâm đáy tam giác đều đến mặt bên (SBC) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABC đáy tam giác đều cạnh √q, SA ⊥ (ABC), SA = h, G là trọng tâm ΔABC. Tính d(G, (SBC)).',
    conditionSummary: 'q ∈ [2; 12], h ∈ [1; 6]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh đáy q (cạnh = √q)', min: 2, max: 12 },
      { name: 'h', label: 'Chiều cao SA = h', min: 1, max: 6 },
    ],
    validateCode: `
      const { q, h } = params;
      if (q < 2 || q > 12 || h < 1 || h > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = ((h * Math.sqrt(3 * q)) / Math.sqrt(4 * h * h + 3 * q)) / 3;
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, h } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const sideTex = rad(q);
      const dA = (h * Math.sqrt(3 * q)) / Math.sqrt(4 * h * h + 3 * q);
      const d = dA / 3;
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều cạnh bằng $' + sideTex + '$, $SA \\perp (ABC)$, $SA = ' + h + '$. Gọi $G$ là trọng tâm của tam giác $ABC$. Tính khoảng cách từ điểm $G$ đến mặt phẳng $(SBC)$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { showCentroid: 1, midEdge: 1 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', cent: 'G', mid: 'M' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $M$ là trung điểm $BC \\Rightarrow AM = \\dfrac{' + sideTex + '\\sqrt{3}}{2}$ và $BC \\perp (SAM)$.',
          'Kẻ $AH \\perp SM \\Rightarrow d(A, (SBC)) = AH = \\dfrac{SA \\cdot AM}{\\sqrt{SA^2 + AM^2}} \\approx ' + u.formatNumberVN(dA, 3) + '$.',
          'Vì $G$ là trọng tâm $\\triangle ABC$ nên $\\dfrac{d(G, (SBC))}{d(A, (SBC))} = \\dfrac{MG}{MA} = \\dfrac{1}{3} \\Rightarrow d(G, (SBC)) = \\dfrac{1}{3} d(A, (SBC)) \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { q: 1, h: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (0,3)', params: { q: 6, h: 1 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Chóp S.ABC đáy đều cạnh √q, SA = √p, N ∈ AB với AN = k·NB -> d(N, (SBC))
  t11_b26_d24_tri_equi_ratio_ab_sbc_sa: {
    id: 't11_b26_d24_tri_equi_ratio_ab_sbc_sa',
    name: 'Khoảng cách từ điểm chia đoạn AB đến mặt bên (SBC) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABC đáy tam giác đều cạnh √q, SA ⊥ (ABC), SA = √p, N ∈ AB với AN = k·NB. Tính d(N, (SBC)).',
    conditionSummary: 'q ∈ [2; 10], p ∈ [2; 15], k ∈ [1; 4]',
    paramSpecs: [
      { name: 'q', label: 'Bình phương cạnh đáy q (cạnh = √q)', min: 2, max: 10 },
      { name: 'p', label: 'Bình phương chiều cao p (SA = √p)', min: 2, max: 15 },
      { name: 'k', label: 'Tỉ số AN = k·NB', min: 1, max: 4 },
    ],
    validateCode: `
      const { q, p, k } = params;
      if (q < 2 || q > 10 || p < 2 || p > 15 || k < 1 || k > 4) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const d = Math.sqrt((3 * p * q) / (4 * p + 3 * q)) / (k + 1);
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, p, k } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const sideTex = rad(q), saTex = rad(p);
      const dA = Math.sqrt((3 * p * q) / (4 * p + 3 * q));
      const d = dA / (k + 1);
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);
      const ratioStr = k === 1 ? 'NB' : k + 'NB';

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều cạnh bằng $' + sideTex + '$, $SA \\perp (ABC)$, $SA = ' + saTex + '$. Gọi $N$ là điểm thuộc đoạn $AB$ sao cho $AN = ' + ratioStr + '$. Tính khoảng cách từ điểm $N$ đến mặt phẳng $(SBC)$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: { midEdge: 1 },
          labels: { apex: 'S', vL: 'A', vF: 'B', vR: 'C', mid: 'M' },
        },
        shortAnswer: ansStr,
        numericValue: numVal,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $M$ là trung điểm $BC \\Rightarrow AM = \\dfrac{' + sideTex + '\\sqrt{3}}{2}$ và $BC \\perp (SAM)$.',
          'Kẻ $AH \\perp SM \\Rightarrow d(A, (SBC)) = AH = \\dfrac{SA \\cdot AM}{\\sqrt{SA^2 + AM^2}} \\approx ' + u.formatNumberVN(dA, 3) + '$.',
          'Do $B = AB \\cap (SBC)$ và $AN = ' + ratioStr + '$ nên $\\dfrac{d(N, (SBC))}{d(A, (SBC))} = \\dfrac{BN}{BA} = \\dfrac{1}{' + (k + 1) + '} \\Rightarrow d(N, (SBC)) \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { q: 2, p: 7, k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (0,4)', params: { q: 2, p: 7, k: 2 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Chóp S.ABCD đáy vuông cạnh k√2, SA = √p -> d(A, (SCD))
  t11_b26_d25_sq_pyr_a_scd_sa: {
    id: 't11_b26_d25_sq_pyr_a_scd_sa',
    name: 'Khoảng cách từ chân đường cao đến mặt bên (SCD) trong chóp đáy vuông (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy hình vuông cạnh k√2, SA ⊥ (ABCD), SA = √p. Tính d(A, (SCD)).',
    conditionSummary: 'k ∈ [1; 5], p ∈ [2; 15]',
    paramSpecs: [
      { name: 'k', label: 'Hệ số cạnh đáy k (cạnh = k√2)', min: 1, max: 5 },
      { name: 'p', label: 'Bình phương chiều cao p (SA = √p)', min: 2, max: 15 },
    ],
    validateCode: `
      const { k, p } = params;
      if (k < 1 || k > 5 || p < 2 || p > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = (k * Math.sqrt(2 * p)) / Math.sqrt(p + 2 * k * k);
      const frac = d * 10 - Math.floor(d * 10);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, p } = params;
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return rem === 1 ? String(out) : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };
      const edgeTex = k === 1 ? '\\sqrt{2}' : k + '\\sqrt{2}';
      const saTex = rad(p);
      const d = (k * Math.sqrt(2 * p)) / Math.sqrt(p + 2 * k * k);
      const numVal = Number(d.toFixed(1));
      const ansStr = u.formatNumberVN(numVal, 1);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh bằng $' + edgeTex + '$, $SA \\perp (ABCD)$, $SA = ' + saTex + '$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SCD)$ (kết quả làm tròn đến hàng phần mười).',
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
          'Suy ra $d(A, (SCD)) = AH = \\dfrac{SA \\cdot AD}{\\sqrt{SA^2 + AD^2}} = \\dfrac{' + saTex + ' \\cdot ' + edgeTex + '}{\\sqrt{' + p + ' + ' + (2 * k * k) + '}} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, p: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (1,5)', params: { k: 2, p: 3 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Chóp S.ABCD đáy vuông cạnh u, SA = h -> d(C, (SBD))
  t11_b26_d26_sq_pyr_c_sbd_sa: {
    id: 't11_b26_d26_sq_pyr_c_sbd_sa',
    name: 'Khoảng cách từ đỉnh C đến mặt chéo (SBD) trong chóp đáy vuông (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách',
    description: 'Cho chóp S.ABCD đáy hình vuông cạnh u, SA ⊥ (ABCD), SA = h. Tính khoảng cách từ C đến (SBD).',
    conditionSummary: 'u ∈ [2; 8], h ∈ [2; 10]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh hình vuông đáy u', min: 2, max: 8 },
      { name: 'h', label: 'Chiều cao SA = h', min: 2, max: 10 },
    ],
    validateCode: `
      const { u: edge, h } = params;
      if (edge < 2 || edge > 8 || h < 2 || h > 10) return { valid: false, reason: 'Tham số ngoài miền' };
      const d = (edge * h) / Math.sqrt(2 * h * h + edge * edge);
      const frac = d * 100 - Math.floor(d * 100);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .005' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h } = params;
      const aoTex = edge % 2 === 0 ? (edge === 2 ? '\\sqrt{2}' : (edge / 2) + '\\sqrt{2}') : '\\dfrac{' + edge + '\\sqrt{2}}{2}';
      const d = (edge * h) / Math.sqrt(2 * h * h + edge * edge);
      const numVal = Number(d.toFixed(2));
      const ansStr = u.formatNumberVN(numVal, 2);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông và $SA$ vuông góc với đáy, $SA = ' + h + '$, $AB = ' + edge + '$. Tính khoảng cách từ điểm $C$ đến mặt phẳng $(SBD)$ (kết quả làm tròn đến hàng phần trăm).',
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
          'Gọi $O = AC \\cap BD \\Rightarrow AO = \\dfrac{AC}{2} = ' + aoTex + '$. Vì $O$ là trung điểm $AC$ nên $d(C, (SBD)) = d(A, (SBD))$.',
          'Ta có $BD \\perp (SAC)$. Kẻ $AH \\perp SO$ ($H \\in SO$) $\\Rightarrow BD \\perp AH \\Rightarrow AH \\perp (SBD)$.',
          'Do đó $d(C, (SBD)) = AH = \\dfrac{SA \\cdot AO}{\\sqrt{SA^2 + AO^2}} = \\dfrac{' + h + ' \\cdot ' + aoTex + '}{\\sqrt{' + (h * h) + ' + \\dfrac{' + (edge * edge) + '}{2}}} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, h: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (1,39)', params: { u: 2, h: 7 }, expectedValid: true },
    ],
  },
};
