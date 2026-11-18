import { MathTemplate } from '../types/math';

export const G11_B25_MC_PART2: Record<string, MathTemplate> = {
  // D13 (Q13): Góc giữa mặt chéo (SCA) và (ABCD) trong chóp đáy chữ nhật
  t11_b25_d13_angle_diag_plane_base_mc: {
    id: 't11_b25_d13_angle_diag_plane_base_mc',
    name: 'Xác định góc giữa mặt chéo (SCA) và mặt đáy (Chóp đáy chữ nhật)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy chữ nhật, SB ⊥ (ABCD), BI ⊥ CA. Tìm góc giữa (SCA) và (ABCD).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: B, 1: A, 2: C, 3: D)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'B', foot: 'I', diag: 'CA', face: 'SCA', ans: 'SIB', w1: 'SCB', w2: 'SOB', w3: 'SAB',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
        },
        {
          altV: 'A', foot: 'H', diag: 'BD', face: 'SBD', ans: 'SHA', w1: 'SBA', w2: 'SOA', w3: 'SDA',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'C', foot: 'K', diag: 'BD', face: 'SBD', ans: 'SKC', w1: 'SBC', w2: 'SOC', w3: 'SDC',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
        },
        {
          altV: 'D', foot: 'M', diag: 'CA', face: 'SCA', ans: 'SMD', w1: 'SCD', w2: 'SOD', w3: 'SAD',
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C',
        },
      ];
      const item = CASES[rot];
      const correct = '$\\widehat{' + item.ans + '}$';
      const wrongs = ['$\\widehat{' + item.w1 + '}$', '$\\widehat{' + item.w2 + '}$', '$\\widehat{' + item.w3 + '}$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật tâm $O$, $S' + item.altV + ' \\perp (ABCD)$. Gọi $' + item.foot + '$ là hình chiếu vuông góc của điểm $' + item.altV + '$ trên đường thẳng $' + item.diag + '$. Tìm góc giữa mặt phẳng $(' + item.face + ')$ và mặt phẳng $(ABCD)$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR, center: 'O' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $(' + item.face + ') \\cap (ABCD) = ' + item.diag + '$. Trong $(ABCD)$ có $' + item.diag + ' \\perp ' + item.altV + item.foot + '$, lại có $' + item.diag + ' \\perp S' + item.altV + ' \\Rightarrow ' + item.diag + ' \\perp S' + item.foot + '$.',
          'Suy ra góc $\\left((' + item.face + '), (ABCD)\\right) = (S' + item.foot + ', ' + item.altV + item.foot + ') = \\widehat{' + item.ans + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (∠SIB)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Tính góc giữa (SCA) và (ABC) trong chóp S.ABC đáy đều, SB ⊥ (ABC)
  t11_b25_d14_calc_angle_face_base_equi_mc: {
    id: 't11_b25_d14_calc_angle_face_base_equi_mc',
    name: 'Tính góc giữa mặt bên đối diện và mặt đáy (Chóp đáy tam giác đều)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABC đáy đều cạnh u·a, SB ⊥ (ABC), SB = m√k·a. Tính góc giữa (SCA) và (ABC).',
    conditionSummary: 'u ∈ [1; 4], m ∈ [1; 6], k ∈ [2; 7]',
    paramSpecs: [
      { name: 'u', label: 'Hệ số cạnh đáy BC = u·a', min: 1, max: 4 },
      { name: 'm', label: 'Hệ số ngoài căn SB = m√k·a', min: 1, max: 6 },
      { name: 'k', label: 'Biểu thức dưới căn SB = m√k·a', min: 2, max: 7 },
    ],
    validateCode: `
      const { u: edge, m, k } = params;
      if (edge < 1 || edge > 4 || m < 1 || m > 6 || k < 2 || k > 7) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const sb = m * Math.sqrt(k);
      const bm = (edge * Math.sqrt(3)) / 2;
      const deg = Math.atan(sb / bm) * 180 / Math.PI;
      const frac = (deg * 100) - Math.floor(deg * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, m, k } = params;
      const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return { out, rem };
      };
      const fmtRad = (r) => r.rem === 1 ? String(r.out) : (r.out === 1 ? '' : String(r.out)) + '\\sqrt{' + r.rem + '}';

      const sbSq = m * m * k;
      const rSB = rad(sbSq);
      const rProd = rad(3 * k);
      const tanNum = 2 * m * rProd.out;
      const tanDen = 3 * edge;
      const g = gcd(tanNum, tanDen);
      const tN = tanNum / g, tD = tanDen / g;
      const tanTex = rProd.rem === 1
        ? (tD === 1 ? String(tN) : '\\dfrac{' + tN + '}{' + tD + '}')
        : (tD === 1 ? (tN === 1 ? '' : String(tN)) + '\\sqrt{' + rProd.rem + '}' : '\\dfrac{' + (tN === 1 ? '' : String(tN)) + '\\sqrt{' + rProd.rem + '}}{' + tD + '}');

      const bmTex = edge % 2 === 0 ? (edge === 2 ? '\\sqrt{3}' : (edge / 2) + '\\sqrt{3}') : '\\dfrac{' + (edge === 1 ? '' : edge) + '\\sqrt{3}}{2}';
      const sb = m * Math.sqrt(k);
      const bm = (edge * Math.sqrt(3)) / 2;
      const deg = Math.round((Math.atan(sb / bm) * 180 / Math.PI) * 100) / 100;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');

      const candidates = [
        Math.max(10, Math.round((deg - 5.20) * 100) / 100),
        Math.max(8, Math.round((deg - 10.00) * 100) / 100),
        deg + 4.80 < 89.5 ? Math.round((deg + 4.80) * 100) / 100 : Math.max(6, Math.round((deg - 15.40) * 100) / 100),
        Math.max(5, Math.round((90 - deg) * 100) / 100),
      ];
      const seen = new Set([fmt2(deg)]);
      const wrongs = [];
      for (const c of candidates) {
        const s = fmt2(c);
        if (!seen.has(s) && wrongs.length < 3) {
          seen.add(s);
          wrongs.push('$' + s + '^\\circ$');
        }
      }

      const correct = '$' + fmt2(deg) + '^\\circ$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      const bcTex = edge === 1 ? 'a' : edge + 'a';

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều, $SB \\perp (ABC)$, $BC = ' + bcTex + '$, $SB = ' + fmtRad(rSB) + 'a$. Tính góc giữa hai mặt phẳng $(SCA)$ và $(ABC)$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'B', vF: 'C', vR: 'A' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $M$ là trung điểm của $CA$. Vì $\\triangle ABC$ đều nên $BM = ' + bmTex + 'a$ và $BM \\perp CA$, kết hợp $SB \\perp CA \\Rightarrow SM \\perp CA$.',
          'Suy ra góc giữa $(SCA)$ và $(ABC)$ là $\\widehat{SMB}$.',
          'Ta có $\\tan \\widehat{SMB} = \\dfrac{SB}{BM} = ' + tanTex + ' \\Rightarrow \\widehat{SMB} \\approx ' + fmt2(deg) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { u: 1, m: 5, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (83,02°)', params: { u: 1, m: 5, k: 2 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Tính góc giữa (SBC) và (ABC) trong chóp S.ABC đáy vuông tại B, SA ⊥ (ABC)
  t11_b25_d15_calc_angle_face_base_right_mc: {
    id: 't11_b25_d15_calc_angle_face_base_right_mc',
    name: 'Tính góc giữa mặt bên (SBC) và mặt đáy (Chóp tam giác vuông tại B)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABC đáy vuông tại B, SA ⊥ (ABC), AB = u·a (cho AC), BC = v·a, SA = m√k·a. Tính góc giữa (SBC) và (ABC).',
    conditionSummary: 'u ∈ [2; 6], v ∈ [2; 5], m ∈ [1; 4], k ∈ [2; 13]',
    paramSpecs: [
      { name: 'u', label: 'Độ dài cạnh AB ẩn u', min: 2, max: 6 },
      { name: 'v', label: 'Hệ số cạnh BC = v·a', min: 2, max: 5 },
      { name: 'm', label: 'Hệ số ngoài căn SA = m√k·a', min: 1, max: 4 },
      { name: 'k', label: 'Biểu thức dưới căn SA = m√k·a', min: 2, max: 13 },
    ],
    validateCode: `
      const { u: ab, v: bc, m, k } = params;
      if (ab < 2 || ab > 6 || bc < 2 || bc > 5 || m < 1 || m > 4 || k < 2 || k > 13) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const sa = m * Math.sqrt(k);
      const deg = Math.atan(sa / ab) * 180 / Math.PI;
      const frac = (deg * 100) - Math.floor(deg * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: ab, v: bc, m, k } = params;
      const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return { out, rem };
      };
      const fmtRad = (r) => r.rem === 1 ? String(r.out) : (r.out === 1 ? '' : String(r.out)) + '\\sqrt{' + r.rem + '}';

      const rAC = rad(ab * ab + bc * bc);
      const rSA = rad(m * m * k);
      const g = gcd(rSA.out, ab);
      const tN = rSA.out / g, tD = ab / g;
      const tanTex = rSA.rem === 1
        ? (tD === 1 ? String(tN) : '\\dfrac{' + tN + '}{' + tD + '}')
        : (tD === 1 ? (tN === 1 ? '' : String(tN)) + '\\sqrt{' + rSA.rem + '}' : '\\dfrac{' + (tN === 1 ? '' : String(tN)) + '\\sqrt{' + rSA.rem + '}}{' + tD + '}');

      const deg = Math.round((Math.atan((m * Math.sqrt(k)) / ab) * 180 / Math.PI) * 100) / 100;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const candidates = [
        Math.round((deg + 4.20) * 100) / 100,
        Math.round((deg + 12.90) * 100) / 100,
        Math.round((deg + 17.00) * 100) / 100,
        Math.max(5, Math.round((deg - 6.80) * 100) / 100),
      ].map((v) => (v >= 89.5 ? Math.max(5, Math.round((deg - 9.50) * 100) / 100) : v));
      const seen = new Set([fmt2(deg)]);
      const wrongs = [];
      for (const c of candidates) {
        const s = fmt2(c);
        if (!seen.has(s) && wrongs.length < 3) {
          seen.add(s);
          wrongs.push('$' + s + '^\\circ$');
        }
      }

      const correct = '$' + fmt2(deg) + '^\\circ$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $B$, $SA \\perp (ABC)$, $AC = ' + fmtRad(rAC) + 'a$, $BC = ' + bc + 'a$, $SA = ' + fmtRad(rSA) + 'a$. Tính góc giữa hai mặt phẳng $(SBC)$ và $(ABC)$.',
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
          'Ta có $(SBC) \\cap (ABC) = BC$, $AB \\perp BC$ và $SA \\perp BC \\Rightarrow SB \\perp BC$. Suy ra góc giữa $(SBC)$ và $(ABC)$ là $\\widehat{SBA}$.',
          'Áp dụng định lí Pythagore trong $\\triangle ABC$ vuông tại $B$: $AB = \\sqrt{AC^2 - BC^2} = ' + ab + 'a$.',
          '$\\tan \\widehat{SBA} = \\dfrac{SA}{AB} = ' + tanTex + ' \\Rightarrow \\widehat{SBA} \\approx ' + fmt2(deg) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, v: 2, m: 3, k: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (68,10°)', params: { u: 4, v: 2, m: 3, k: 11 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Chứng minh mặt bên chứa đường cao vuông góc mặt đáy (Đáy vuông, SB ⊥ đáy)
  t11_b25_d16_perp_face_base_square_mc: {
    id: 't11_b25_d16_perp_face_base_square_mc',
    name: 'Mặt bên chứa đường cao vuông góc với mặt đáy (Chóp đáy vuông)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy hình vuông có cạnh bên vuông góc với đáy. Tìm cặp mặt phẳng vuông góc.',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: B, 1: A, 2: C, 3: D)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'B', m1: 'M', m2: 'F', e1: 'BC', e2: 'BA',
          correct: '$(SBC) \\perp (BCDA)$',
          wrongs: ['$(SBD) \\perp (SBA)$', '$(SFC) \\perp (SCA)$', '$(SBC) \\perp (SBD)$'],
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A', face: 'SBC',
        },
        {
          altV: 'A', m1: 'M', m2: 'N', e1: 'AB', e2: 'AD',
          correct: '$(SAB) \\perp (ABCD)$',
          wrongs: ['$(SAC) \\perp (SBD)$', '$(SMC) \\perp (SBD)$', '$(SAB) \\perp (SAC)$'],
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', face: 'SAB',
        },
        {
          altV: 'C', m1: 'E', m2: 'F', e1: 'CD', e2: 'CB',
          correct: '$(SCD) \\perp (CDAB)$',
          wrongs: ['$(SCA) \\perp (SCB)$', '$(SEA) \\perp (SBD)$', '$(SCD) \\perp (SCA)$'],
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B', face: 'SCD',
        },
        {
          altV: 'D', m1: 'P', m2: 'Q', e1: 'DA', e2: 'DC',
          correct: '$(SDA) \\perp (DABC)$',
          wrongs: ['$(SDB) \\perp (SDA)$', '$(SPB) \\perp (SAC)$', '$(SDC) \\perp (SDB)$'],
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C', face: 'SDA',
        },
      ];
      const item = CASES[rot];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $S' + item.altV + ' \\perp (ABCD)$. Gọi $' + item.m1 + ', ' + item.m2 + '$ lần lượt là trung điểm của các cạnh $' + item.e1 + '$ và $' + item.e2 + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [
          'Vì $S' + item.altV + ' \\perp (ABCD)$ và $S' + item.altV + ' \\subset (' + item.face + ')$ nên $(' + item.face + ') \\perp (ABCD)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 ((SBC)⊥(BCDA))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Mặt phẳng chéo chứa đường cao vuông góc mặt đáy (Chóp đáy chữ nhật, SC ⊥ đáy)
  t11_b25_d17_diag_plane_perp_base_rect_mc: {
    id: 't11_b25_d17_diag_plane_perp_base_rect_mc',
    name: 'Mặt chéo chứa đường cao vuông góc với mặt đáy (Đáy chữ nhật)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy chữ nhật, SC ⊥ (ABCD). Tìm khẳng định đúng: (SCA) ⊥ (CDAB).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: C, 1: A, 2: B, 3: D)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'C', m1: 'E', m2: 'N', e1: 'CD', e2: 'DA', diagPlane: 'SCA',
          correct: '$(SCA) \\perp (CDAB)$',
          wrongs: ['$(SCD) \\perp (SEN)$', '$(SCA) \\perp (SCB)$', '$(SBE) \\perp (SEN)$'],
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
        },
        {
          altV: 'A', m1: 'M', m2: 'P', e1: 'AB', e2: 'BC', diagPlane: 'SAC',
          correct: '$(SAC) \\perp (ABCD)$',
          wrongs: ['$(SAB) \\perp (SMP)$', '$(SAC) \\perp (SAD)$', '$(SDM) \\perp (SMP)$'],
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'B', m1: 'H', m2: 'K', e1: 'BC', e2: 'CD', diagPlane: 'SBD',
          correct: '$(SBD) \\perp (BCDA)$',
          wrongs: ['$(SBC) \\perp (SHK)$', '$(SBD) \\perp (SBA)$', '$(SAH) \\perp (SHK)$'],
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
        },
        {
          altV: 'D', m1: 'E', m2: 'F', e1: 'DA', e2: 'AB', diagPlane: 'SDB',
          correct: '$(SDB) \\perp (DABC)$',
          wrongs: ['$(SDA) \\perp (SEF)$', '$(SDB) \\perp (SDC)$', '$(SCE) \\perp (SEF)$'],
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C',
        },
      ];
      const item = CASES[rot];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $S' + item.altV + ' \\perp (ABCD)$. Gọi $' + item.m1 + ', ' + item.m2 + '$ lần lượt là trung điểm của các cạnh $' + item.e1 + '$ và $' + item.e2 + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [
          'Vì $S' + item.altV + ' \\perp (ABCD)$ và $S' + item.altV + ' \\subset (' + item.diagPlane + ')$ nên $(' + item.diagPlane + ') \\perp (ABCD)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 ((SCA)⊥(CDAB))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Hai mặt bên vuông góc với nhau (Chóp đáy vuông, SC ⊥ đáy -> (SCD) ⊥ (SDA))
  t11_b25_d18_two_side_faces_perp_square_mc: {
    id: 't11_b25_d18_two_side_faces_perp_square_mc',
    name: 'Hai mặt bên vuông góc với nhau (Chóp đáy vuông, SC ⊥ đáy)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy hình vuông, SC ⊥ (ABCD). Chứng minh (SCD) ⊥ (SDA).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: C, 1: A, 2: B, 3: D)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'C', m1: 'E', m2: 'N', e1: 'CD', e2: 'DA',
          line: 'DA', edge1: 'CD', f1: 'SCD', f2: 'SDA',
          correct: '$(SCD) \\perp (SDA)$',
          wrongs: ['$(SDB) \\perp (SEN)$', '$(SCD) \\perp (SCA)$', '$(SDA) \\perp (SEN)$'],
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
        },
        {
          altV: 'A', m1: 'M', m2: 'N', e1: 'AB', e2: 'BC',
          line: 'BC', edge1: 'AB', f1: 'SAB', f2: 'SBC',
          correct: '$(SAB) \\perp (SBC)$',
          wrongs: ['$(SBD) \\perp (SMN)$', '$(SAB) \\perp (SAC)$', '$(SBC) \\perp (SMN)$'],
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'B', m1: 'P', m2: 'Q', e1: 'BC', e2: 'CD',
          line: 'CD', edge1: 'BC', f1: 'SBC', f2: 'SCD',
          correct: '$(SBC) \\perp (SCD)$',
          wrongs: ['$(SAC) \\perp (SPQ)$', '$(SBC) \\perp (SBD)$', '$(SCD) \\perp (SPQ)$'],
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
        },
        {
          altV: 'D', m1: 'H', m2: 'K', e1: 'DA', e2: 'AB',
          line: 'AB', edge1: 'DA', f1: 'SDA', f2: 'SAB',
          correct: '$(SDA) \\perp (SAB)$',
          wrongs: ['$(SAC) \\perp (SHK)$', '$(SDA) \\perp (SBD)$', '$(SAB) \\perp (SHK)$'],
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C',
        },
      ];
      const item = CASES[rot];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $S' + item.altV + ' \\perp (ABCD)$. Gọi $' + item.m1 + ', ' + item.m2 + '$ lần lượt là trung điểm của các cạnh $' + item.e1 + '$ và $' + item.e2 + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [
          'Vì $' + item.line + ' \\perp ' + item.edge1 + '$ và $' + item.line + ' \\perp S' + item.altV + ' \\Rightarrow ' + item.line + ' \\perp (' + item.f1 + ')$.',
          'Lại có $' + item.line + ' \\subset (' + item.f2 + ')$ nên $(' + item.f1 + ') \\perp (' + item.f2 + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 ((SCD)⊥(SDA))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Hai mặt bên vuông góc (Chóp đáy chữ nhật, SA ⊥ đáy -> (SAB) ⊥ (SBC))
  t11_b25_d19_two_side_faces_perp_rect_mc: {
    id: 't11_b25_d19_two_side_faces_perp_rect_mc',
    name: 'Hai mặt bên vuông góc với nhau (Chóp đáy hình chữ nhật)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD). Tìm khẳng định đúng về hai mặt bên vuông góc: (SAB) ⊥ (SBC).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Cặp mặt bên & đường cao (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'A', m1: 'M', m2: 'N', e1: 'AB', e2: 'BC',
          line: 'BC', edge1: 'AB', f1: 'SAB', f2: 'SBC',
          correct: '$(SAB) \\perp (SBC)$',
          wrongs: ['$(SAD) \\perp (SMN)$', '$(SBD) \\perp (SMN)$', '$(SAC) \\perp (SAD)$'],
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'A', m1: 'M', m2: 'N', e1: 'AD', e2: 'DC',
          line: 'DC', edge1: 'AD', f1: 'SAD', f2: 'SDC',
          correct: '$(SAD) \\perp (SDC)$',
          wrongs: ['$(SAB) \\perp (SMN)$', '$(SBD) \\perp (SMN)$', '$(SAC) \\perp (SAB)$'],
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'B', m1: 'P', m2: 'Q', e1: 'BC', e2: 'CD',
          line: 'CD', edge1: 'BC', f1: 'SBC', f2: 'SCD',
          correct: '$(SBC) \\perp (SCD)$',
          wrongs: ['$(SBA) \\perp (SPQ)$', '$(SAC) \\perp (SPQ)$', '$(SBD) \\perp (SBA)$'],
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
        },
        {
          altV: 'C', m1: 'E', m2: 'F', e1: 'CD', e2: 'DA',
          line: 'DA', edge1: 'CD', f1: 'SCD', f2: 'SDA',
          correct: '$(SCD) \\perp (SDA)$',
          wrongs: ['$(SCB) \\perp (SEF)$', '$(SBD) \\perp (SEF)$', '$(SAC) \\perp (SCB)$'],
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
        },
      ];
      const item = CASES[rot];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $S' + item.altV + ' \\perp (ABCD)$. Gọi $' + item.m1 + ', ' + item.m2 + '$ lần lượt là trung điểm của các cạnh $' + item.e1 + '$ và $' + item.e2 + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [
          'Vì $' + item.line + ' \\perp ' + item.edge1 + '$ và $' + item.line + ' \\perp S' + item.altV + ' \\Rightarrow ' + item.line + ' \\perp (' + item.f1 + ')$.',
          'Mà $' + item.line + ' \\subset (' + item.f2 + ')$ nên $(' + item.f1 + ') \\perp (' + item.f2 + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 ((SAB)⊥(SBC))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Chóp S.ABC vuông tại A, SA ⊥ (ABC), AP ⊥ BC -> (SBC) ⊥ (SAP)
  t11_b25_d20_tri_pyr_perp_alt_plane_mc: {
    id: 't11_b25_d20_tri_pyr_perp_alt_plane_mc',
    name: 'Mặt phẳng chứa đường cao vuông góc mặt đối diện (Chóp tam giác)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABC có đáy vuông tại A, SA ⊥ (ABC), P là hình chiếu A trên BC. Chứng minh (SBC) ⊥ (SAP).',
    conditionSummary: 'rot ∈ [0; 2]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: A, 1: B, 2: C)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 2) return { valid: false, reason: 'rot ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          rightAt: 'A', midPt: 'Q', midEdge: 'AB', projPt: 'P', onEdge: 'BC', oppFace: 'SBC', altFace: 'SAP',
          correct: '$(SBC) \\perp (SAP)$',
          wrongs: ['$(SAB) \\perp (SCP)$', '$(SAP) \\perp (SAC)$', '$(SPQ) \\perp (SAB)$'],
          vL: 'A', vF: 'B', vR: 'C',
        },
        {
          rightAt: 'B', midPt: 'M', midEdge: 'BC', projPt: 'H', onEdge: 'AC', oppFace: 'SAC', altFace: 'SBH',
          correct: '$(SAC) \\perp (SBH)$',
          wrongs: ['$(SBC) \\perp (SAH)$', '$(SBH) \\perp (SAB)$', '$(SHM) \\perp (SBC)$'],
          vL: 'B', vF: 'C', vR: 'A',
        },
        {
          rightAt: 'C', midPt: 'N', midEdge: 'CA', projPt: 'K', onEdge: 'AB', oppFace: 'SAB', altFace: 'SCK',
          correct: '$(SAB) \\perp (SCK)$',
          wrongs: ['$(SCA) \\perp (SBK)$', '$(SCK) \\perp (SBC)$', '$(SKN) \\perp (SCA)$'],
          vL: 'C', vF: 'A', vR: 'B',
        },
      ];
      const item = CASES[rot];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $' + item.rightAt + '$, $S' + item.rightAt + ' \\perp (ABC)$. Gọi $' + item.midPt + '$ là trung điểm của cạnh $' + item.midEdge + '$. Gọi $' + item.projPt + '$ là hình chiếu vuông góc của $' + item.rightAt + '$ trên đường thẳng $' + item.onEdge + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [
          'Ta có $' + item.onEdge + ' \\perp ' + item.rightAt + item.projPt + '$ và $' + item.onEdge + ' \\perp S' + item.rightAt + ' \\Rightarrow ' + item.onEdge + ' \\perp (' + item.altFace + ')$.',
          'Mà $' + item.onEdge + ' \\subset (' + item.oppFace + ')$ nên $(' + item.oppFace + ') \\perp (' + item.altFace + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 3', params: { rot: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 ((SBC)⊥(SAP))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Lăng trụ đứng ABC.A'B'C' đáy vuông tại B -> (ABB') ⊥ (ABC)
  t11_b25_d21_standing_tri_prism_perp_planes_mc: {
    id: 't11_b25_d21_standing_tri_prism_perp_planes_mc',
    name: 'Hai mặt phẳng vuông góc trong lăng trụ đứng tam giác vuông',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Nhận biết cặp mặt phẳng vuông góc trong lăng trụ đứng ABC.A\'B\'C\' có đáy là tam giác vuông tại B.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể khẳng định (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: "$(ABB') \\perp (ABC)$",
          wrongs: ["$(ABB') \\perp (AB'C)$", "$(ABC) \\perp (A'B'C')$", "$(C'AB) \\perp (ABC)$"],
          sol: "Vì $ABC.A'B'C'$ là lăng trụ đứng nên $BB' \\perp (ABC)$, mà $BB' \\subset (ABB')$ nên $(ABB') \\perp (ABC)$.",
        },
        {
          correct: "$(BCC') \\perp (ABC)$",
          wrongs: ["$(BCC') \\perp (CA'B')$", "$(ABC) \\perp (A'B'C')$", "$(A'BC) \\perp (ABC)$"],
          sol: "Vì $CC' \\perp (ABC)$ và $CC' \\subset (BCC')$ nên $(BCC') \\perp (ABC)$.",
        },
        {
          correct: "$(ACC') \\perp (A'B'C')$",
          wrongs: ["$(ACC') \\perp (A'BC)$", "$(A'B'C') \\perp (ABC)$", "$(B'AC) \\perp (A'B'C')$"],
          sol: "Vì $AA' \\perp (A'B'C')$ và $AA' \\subset (ACC')$ nên $(ACC') \\perp (A'B'C')$.",
        },
        {
          correct: "$(ABB') \\perp (BCC')$",
          wrongs: ["$(ABB') \\perp (ACC')$", "$(ABC) \\perp (A'B'C')$", "$(B'AC) \\perp (ABC)$"],
          sol: "Vì $AB \\perp BC$ và $AB \\perp BB' \\Rightarrow AB \\perp (BCC')$. Mà $AB \\subset (ABB')$ nên $(ABB') \\perp (BCC')$.",
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy là tam giác vuông tại $B$. Tìm khẳng định đúng trong các khẳng định sau?",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: 'A', vF: 'B', vR: 'C', tL: "A'", tF: "B'", tR: "C'" },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 ((ABB\')⊥(ABC))', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Lăng trụ đứng ABCD.A'B'C'D' đáy chữ nhật -> (C'AC) ⊥ (ABCD)
  t11_b25_d22_standing_box_perp_planes_mc: {
    id: 't11_b25_d22_standing_box_perp_planes_mc',
    name: 'Hai mặt phẳng vuông góc trong hình hộp đứng đáy chữ nhật',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Nhận biết mặt phẳng chéo chứa cạnh bên vuông góc với mặt đáy trong lăng trụ đứng ABCD.A\'B\'C\'D\'.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể khẳng định (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: "$(C'AC) \\perp (ABCD)$",
          wrongs: ["$(B'AC) \\perp (ABCD)$", "$(B'BD) \\perp (A'AB)$", "$(A'BD) \\perp (ABCD)$"],
          sol: "Vì $CC' \\perp (ABCD)$ và $CC' \\subset (C'AC)$ nên $(C'AC) \\perp (ABCD)$.",
        },
        {
          correct: "$(A'AC) \\perp (ABCD)$",
          wrongs: ["$(D'AC) \\perp (ABCD)$", "$(A'AC) \\perp (B'BC)$", "$(C'BD) \\perp (ABCD)$"],
          sol: "Vì $AA' \\perp (ABCD)$ và $AA' \\subset (A'AC)$ nên $(A'AC) \\perp (ABCD)$.",
        },
        {
          correct: "$(B'BD) \\perp (ABCD)$",
          wrongs: ["$(A'BD) \\perp (ABCD)$", "$(C'BD) \\perp (ABCD)$", "$(B'BD) \\perp (C'CD)$"],
          sol: "Vì $BB' \\perp (ABCD)$ và $BB' \\subset (B'BD)$ nên $(B'BD) \\perp (ABCD)$.",
        },
        {
          correct: "$(D'BD) \\perp (A'B'C'D')$",
          wrongs: ["$(A'BD) \\perp (A'B'C'D')$", "$(C'AC) \\perp (A'AB)$", "$(B'AC) \\perp (A'B'C'D')$"],
          sol: "Vì $DD' \\perp (A'B'C'D')$ và $DD' \\subset (D'BD)$ nên $(D'BD) \\perp (A'B'C'D')$.",
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: "Cho hình lăng trụ đứng $ABCD.A'B'C'D'$ có đáy là hình chữ nhật. Tìm khẳng định đúng trong các khẳng định sau?",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 1 },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 ((C\'AC)⊥(ABCD))', params: { mode: 0 }, expectedValid: true },
    ],
  },
};
