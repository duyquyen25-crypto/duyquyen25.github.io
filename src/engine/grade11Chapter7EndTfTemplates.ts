import { MathTemplate } from '../types/math';

export const G11_C7_END_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D06 (Q6): Phép chiếu song song trên lăng trụ ABC.A1B1C1 (G, N trung điểm A1C1, BC; Q trọng tâm ΔA1BC)
  t11_c7_bt_d06_prism_proj_tf: {
    id: 't11_c7_bt_d06_prism_proj_tf',
    name: 'Phép chiếu song song trên hình lăng trụ tam giác (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Cho lăng trụ ABC.A₁B₁C₁ có G, N lần lượt là trung điểm A₁C₁, BC và Q là trọng tâm ΔA₁BC. Xét 4 mệnh đề Đúng/Sai về phép chiếu song song.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh và điểm (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 2) {
        return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1', G: 'G', N: 'N', Q: 'Q', Qp: "Q'" },
        { A: 'A', B: 'B', C: 'C', A1: "A'", B1: "B'", C1: "C'", G: 'I', N: 'H', Q: 'M', Qp: "M'" },
        { A: 'M', B: 'N', C: 'P', A1: 'M_1', B1: 'N_1', C1: 'P_1', G: 'E', N: 'K', Q: 'G', Qp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.A1 + s.B1 + s.C1;
      const sideAB = s.A + s.B + s.B1 + s.A1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.C1 + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.A1 + '$ là điểm $' + (aIs ? s.C : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đường thẳng $' + s.A + s.G + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.A1 + '$ là đường thẳng $' + (bIs ? s.A + s.C : s.B + s.C) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.G + '$ lên mặt phẳng $(' + sideAB + ')$ theo phương $' + s.B + s.C + '$ là trung điểm của $' + (cIs ? s.A1 + s.B1 : s.A + s.B) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Qp + '$ là hình chiếu song song của $' + s.Q + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.B1 + '$. Khi đó: $\\overrightarrow{' + s.A + s.Qp + '} = ' + (dIs ? '-\\frac{2}{3}' : '\\frac{2}{3}') + '\\overrightarrow{' + s.N + s.A + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.G + ', ' + s.N + '$ lần lượt là trung điểm của $' + s.A1 + s.C1 + ', ' + s.B + s.C + '$. Gọi $' + s.Q + '$ là trọng tâm của tam giác $' + s.A1 + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.C1 + s.C + ' \\parallel ' + s.A + s.A1 + '$ và $' + s.C + ' \\in (' + base + ')$ nên hình chiếu song song của $' + s.C1 + '$ lên $(' + base + ')$ theo phương $' + s.A + s.A1 + '$ là điểm $' + s.C + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $' + s.A + ' \\in (' + base + ')$ và hình chiếu của $' + s.G + '$ lên $(' + base + ')$ theo phương $' + s.A + s.A1 + '$ là trung điểm của $' + s.A + s.C + '$, nên hình chiếu song song của đường thẳng $' + s.A + s.G + '$ là đường thẳng $' + s.A + s.C + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + s.G + '$ là trung điểm $' + s.A1 + s.C1 + '$ và đường trung bình qua $' + s.G + '$ song song $' + s.C1 + s.B1 + ' \\parallel ' + s.B + s.C + '$ cắt $' + s.A1 + s.B1 + '$ tại trung điểm của $' + s.A1 + s.B1 + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Chiếu $' + s.A1 + ', ' + s.B + ', ' + s.C + '$ lên $(' + base + ')$ theo phương $' + s.B + s.B1 + '$ được $' + s.A + ', ' + s.B + ', ' + s.C + '$, nên $' + s.Qp + '$ là trọng tâm tam giác $' + base + '$. Do $' + s.N + '$ là trung điểm $' + s.B + s.C + '$ nên $\\overrightarrow{' + s.A + s.Qp + '} = \\frac{2}{3}\\overrightarrow{' + s.A + s.N + '} = -\\frac{2}{3}\\overrightarrow{' + s.N + s.A + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (S Đ Đ Đ)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Chóp S.ABC đáy đều, SB ⊥ (ABC), BC = u·a, SB = √p·a (Đúng/Sai)
  t11_c7_bt_d07_tri_pyr_perp_edge_tf: {
    id: 't11_c7_bt_d07_tri_pyr_perp_edge_tf',
    name: 'Góc, hai mặt phẳng vuông góc và thể tích khối chóp S.ABC có SB ⊥ (ABC) (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Cho chóp S.ABC đáy là tam giác đều cạnh u·a, SB ⊥ (ABC) và SB = √p·a. Xét tính đúng sai về góc, quan hệ vuông góc và thể tích.',
    conditionSummary: 'u ∈ [2; 8], p ∈ [2; 85], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'u', label: 'Độ dài cạnh đáy BC = u·a', min: 2, max: 8 },
      { name: 'p', label: 'Số dưới căn chiều cao p (SB = √p·a)', min: 2, max: 85 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { u: edge, p, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(edge) || edge < 2 || edge > 8) {
        return { valid: false, reason: 'u ngoài miền [2; 8]' };
      }
      if (!Number.isInteger(p) || p < 2 || p > 85) {
        return { valid: false, reason: 'p ngoài miền [2; 85]' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, p, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const splitRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return { out, rem };
      };
      const fmtRad = (coeff, radN) => {
        const s = splitRad(radN);
        const total = coeff * s.out;
        if (s.rem === 1) return String(total);
        return (total === 1 ? '' : String(total) + ' ') + '\\sqrt{' + s.rem + '}';
      };
      const fmtRadFracA3 = (coeff, radN, den) => {
        const s = splitRad(radN);
        const total = coeff * s.out;
        const g = u.gcd(total, den);
        const num = total / g, d = den / g;
        const sq = s.rem === 1 ? '' : '\\sqrt{' + s.rem + '}';
        const numExpr = s.rem === 1 ? num + 'a^3' : (num === 1 ? sq + 'a^3' : num + ' ' + sq + 'a^3');
        return d === 1 ? numExpr : '\\frac{' + numExpr + '}{' + d + '}';
      };
      const fmtBaseArea = (side) => {
        const f = u.simplifyFrac(side * side, 4);
        const numExpr = (f.num === 1 ? '' : String(f.num)) + '\\sqrt{3}';
        return (f.den === 1 ? numExpr : '\\frac{' + numExpr + '}{' + f.den + '}') + 'a^2';
      };
      const fmtBm = (side) => {
        const f = u.simplifyFrac(side, 2);
        const numExpr = (f.num === 1 ? '' : String(f.num)) + '\\sqrt{3}';
        return (f.den === 1 ? numExpr : '\\frac{' + numExpr + '}{' + f.den + '}') + 'a';
      };

      const sbTex = fmtRad(1, p) + 'a';
      const u2 = edge * edge;
      const volTrueTex = fmtRadFracA3(u2, 3 * p, 12);
      const volFalseTex = fmtRadFracA3(u2, 3 * p, 4);
      const areaTex = fmtBaseArea(edge);
      const bmTex = fmtBm(edge);

      const tfStatements = [
        {
          key: 'a',
          text: 'Góc giữa đường thẳng $SA$ và mặt phẳng $(ABC)$ là $' + (aIs ? '\\widehat{SAB}' : '\\widehat{SBA}') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: bIs
            ? 'Góc giữa hai mặt phẳng $(SCA)$ và $(ABC)$ là $\\widehat{SMB}$ với $M$ là trung điểm cạnh $CA$'
            : 'Góc giữa hai mặt phẳng $(SCA)$ và $(ABC)$ là $\\widehat{SCB}$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: (cIs ? '$(SBM) \\perp (SCA)$' : '$(SBC) \\perp (SCA)$') + ' với $M$ là trung điểm cạnh $CA$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Thể tích của khối chóp đã cho bằng $' + (dIs ? volTrueTex : volFalseTex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều, $SB \\perp (ABC)$. Biết $BC = ' + edge + 'a$, $SB = ' + sbTex + '$. Xét tính đúng sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'B', vF: 'C', vR: 'A' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $SB \\perp (ABC)$ nên $AB$ là hình chiếu vuông góc của $SA$ lên $(ABC)$, suy ra góc giữa $SA$ và $(ABC)$ là $\\widehat{SAB}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Gọi $M$ là trung điểm của $CA$. Vì $\\triangle ABC$ đều nên $BM \\perp CA$ và $BM = ' + bmTex + '$. Lại có $SB \\perp CA$ nên $CA \\perp (SBM) \\Rightarrow SM \\perp CA$, suy ra góc giữa $(SCA)$ và $(ABC)$ là $\\widehat{SMB}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Ta có $CA \\perp BM$ và $CA \\perp SB \\Rightarrow CA \\perp (SBM)$. Vì $CA \\subset (SCA)$ nên $(SBM) \\perp (SCA)$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $V = \\dfrac{1}{3} S_{ABC} \\cdot SB = \\dfrac{1}{3} \\cdot ' + areaTex + ' \\cdot ' + sbTex + ' = ' + volTrueTex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 1', params: { u: 1, p: 77, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (Đ S Đ Đ)', params: { u: 5, p: 77, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Chóp S.ABC đáy đều, SB ⊥ (ABC), BC = u·a, SB = k√q·a — Tính góc phẳng nhị diện, V, góc đường-mặt, khoảng cách
  t11_c7_bt_d08_tri_pyr_angle_dist_tf: {
    id: 't11_c7_bt_d08_tri_pyr_angle_dist_tf',
    name: 'Góc, thể tích và khoảng cách trên hình chóp S.ABC có SB ⊥ (ABC) (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Cho chóp S.ABC đáy đều cạnh u·a, SB ⊥ (ABC) và SB = k√q·a. Tính góc giữa hai mặt phẳng, thể tích, góc đường-mặt và khoảng cách.',
    conditionSummary: 'u ∈ [2; 9], k ∈ [1; 5], q ∈ {2, 3, 5, 6, 7}, aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'u', label: 'Độ dài cạnh đáy BC = u·a', min: 2, max: 9 },
      { name: 'k', label: 'Hệ số chiều cao k (SB = k√q·a)', min: 1, max: 5 },
      { name: 'q', label: 'Số dưới căn không chính phương q (2..7)', min: 2, max: 7 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { u: edge, k, q, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(edge) || edge < 2 || edge > 9) {
        return { valid: false, reason: 'u ngoài miền [2; 9]' };
      }
      if (!Number.isInteger(k) || k < 1 || k > 5) {
        return { valid: false, reason: 'k ngoài miền [1; 5]' };
      }
      if (!Number.isInteger(q) || q < 2 || q > 7 || q === 4) {
        return { valid: false, reason: 'q phải thuộc {2, 3, 5, 6, 7}' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, k, q, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const splitRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return { out, rem };
      };
      const fmtRadFrac = (coeff, radN, den, suffix) => {
        const s = splitRad(radN);
        const total = coeff * s.out;
        const g = u.gcd(total, den);
        const num = total / g, d = den / g;
        const sq = s.rem === 1 ? '' : '\\sqrt{' + s.rem + '}';
        const numExpr = s.rem === 1 ? num + suffix : (num === 1 ? sq + suffix : num + ' ' + sq + suffix);
        return d === 1 ? numExpr : '\\frac{' + numExpr + '}{' + d + '}';
      };

      const sbTex = (k === 1 ? '' : k + ' ') + '\\sqrt{' + q + '}a';
      const bmTex = fmtRadFrac(edge, 3, 2, 'a');
      const areaTex = fmtRadFrac(edge * edge, 3, 4, 'a^2');

      // tan(SBM) = SB / BM = (2 * k * sqrt(q)) / (edge * sqrt(3))
      const tanSbmTex = fmtRadFrac(2 * k, 3 * q, 3 * edge, '');
      const degSbm = (Math.atan((2 * k * Math.sqrt(q)) / (edge * Math.sqrt(3))) * 180) / Math.PI;
      const wrongDegSbm = degSbm > 25 ? degSbm - 11.45 : degSbm + 13.25;
      const degSbmTex = degSbm.toFixed(2).replace('.', ',') + '^\\circ';
      const wrongDegSbmTex = wrongDegSbm.toFixed(2).replace('.', ',') + '^\\circ';

      // tan(SCB) = SB / BC = (k * sqrt(q)) / edge
      const tanScbTex = fmtRadFrac(k, q, edge, '');
      const degScb = ((Math.atan((k * Math.sqrt(q)) / edge) * 180) / Math.PI).toFixed(2).replace('.', ',') + '^\\circ';

      const volTrueTex = fmtRadFrac(edge * edge * k, 3 * q, 12, 'a^3');
      const volFalseTex = fmtRadFrac(edge * edge * k, 3 * q, 4, 'a^3');

      const distTrueTex = fmtRadFrac(edge, 3, 2, 'a');
      const distFalseTex = fmtRadFrac(edge, 3, 1, 'a');

      const tfStatements = [
        {
          key: 'a',
          text: 'Góc giữa hai mặt phẳng $(SCA)$ và $(ABC)$ bằng $' + (aIs ? degSbmTex : wrongDegSbmTex) + '$ (làm tròn đến hàng phần trăm)',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Thể tích của khối chóp đã cho bằng $' + (bIs ? volTrueTex : volFalseTex) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Góc giữa đường thẳng $SC$ và mặt phẳng $(ABC)$ là $' + (cIs ? '\\widehat{SCB}' : '\\widehat{SBC}') + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Khoảng cách từ điểm $C$ đến mặt phẳng $(SBA)$ bằng $' + (dIs ? distTrueTex : distFalseTex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $S.BCA$ có đáy là tam giác đều, $SB \\perp (ABC)$. Biết $BC = ' + edge + 'a$, $SB = ' + sbTex + '$. Xét tính đúng sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: 'B', vF: 'C', vR: 'A' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Gọi $M$ là trung điểm của $CA$, ta có $BM = ' + bmTex + '$. Góc giữa $(SCA)$ và $(ABC)$ là $\\widehat{SBM}$ với $\\tan \\widehat{SBM} = \\dfrac{SB}{BM} = ' + tanSbmTex + ' \\Rightarrow \\widehat{SBM} \\approx ' + degSbmTex + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $V = \\dfrac{1}{3} S_{ABC} \\cdot SB = \\dfrac{1}{3} \\cdot ' + areaTex + ' \\cdot ' + sbTex + ' = ' + volTrueTex + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $SB \\perp (ABC)$ nên góc giữa $SC$ và $(ABC)$ là $\\widehat{SCB}$, với $\\tan \\widehat{SCB} = \\dfrac{SB}{BC} = ' + tanScbTex + ' \\Rightarrow \\widehat{SCB} \\approx ' + degScb + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Gọi $N$ là trung điểm của $BA$, ta có $CN = ' + distTrueTex + '$. Vì $CN \\perp BA$ và $CN \\perp SB$ nên $CN \\perp (SBA)$, suy ra $d(C, (SBA)) = CN = ' + distTrueTex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 4 (chính phương)', params: { u: 5, k: 2, q: 4, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (Đ S Đ S)', params: { u: 5, k: 2, q: 2, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Chóp S.CDAB đáy hình vuông tâm E cạnh u, SC ⊥ (CDAB), SD = √(u² + h²)
  t11_c7_bt_d09_sq_pyr_sc_perp_tf: {
    id: 't11_c7_bt_d09_sq_pyr_sc_perp_tf',
    name: 'Đường cao, hai mặt phẳng vuông góc, thể tích và khoảng cách trên chóp đáy vuông S.CDAB (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VII',
    description: 'Cho chóp S.CDAB có SC ⊥ (CDAB), đáy hình vuông tâm E cạnh u và cạnh bên SD = √(u² + h²). Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'u ∈ [2; 7], h ∈ [1; 5], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy hình vuông u', min: 2, max: 7 },
      { name: 'h', label: 'Độ dài chiều cao SC = h', min: 1, max: 5 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { u: edge, h, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(edge) || edge < 2 || edge > 7) {
        return { valid: false, reason: 'u ngoài miền [2; 7]' };
      }
      if (!Number.isInteger(h) || h < 1 || h > 5) {
        return { valid: false, reason: 'h ngoài miền [1; 5]' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, h, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const splitRad = (n) => {
        let out = 1, rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) { out *= d; rem /= d * d; }
        }
        return { out, rem };
      };
      const fmtRadOnly = (n) => {
        const s = splitRad(n);
        if (s.rem === 1) return String(s.out);
        return (s.out === 1 ? '' : String(s.out) + ' ') + '\\sqrt{' + s.rem + '}';
      };
      // Format (coeff * sqrt(radN)) / den in simplified form
      const fmtRadFrac = (coeff, radN, den) => {
        const s = splitRad(radN);
        const total = coeff * s.out;
        const g = u.gcd(total, den);
        const num = total / g, d = den / g;
        const sq = s.rem === 1 ? '' : '\\sqrt{' + s.rem + '}';
        const numExpr = s.rem === 1 ? String(num) : (num === 1 ? sq : num + ' ' + sq);
        return d === 1 ? numExpr : '\\frac{' + numExpr + '}{' + d + '}';
      };

      const sdSq = edge * edge + h * h;
      const sdTex = fmtRadOnly(sdSq);
      const area = edge * edge;
      const vTrue = u.simplifyFrac(area * h, 3);
      const vFalse = area * h; // forgot 1/3

      // d(E, (SDA)) = 1/2 * (h * edge) / sqrt(sdSq) = (h * edge * sqrt(sdSq)) / (2 * sdSq)
      const distTrueTex = fmtRadFrac(h * edge, sdSq, 2 * sdSq);
      const distFalseTex = fmtRadFrac(h * edge, sdSq, sdSq); // forgot 1/2
      const chTex = distFalseTex;

      const tfStatements = [
        {
          key: 'a',
          text: 'Chiều cao của hình chóp $S.CDAB$ là độ dài cạnh $' + (aIs ? 'SC' : 'SD') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hai mặt phẳng $(SCB)$ và $(SAB)$ là hai mặt phẳng ' + (bIs ? 'vuông góc với nhau' : 'không vuông góc'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Thể tích của khối chóp đã cho bằng $' + (cIs ? vTrue.latex : String(vFalse)) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Khoảng cách từ điểm $E$ đến mặt phẳng $(SDA)$ bằng $' + (dIs ? distTrueTex : distFalseTex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình chóp $S.CDAB$ có $SC \\perp (CDAB)$, đáy là hình vuông tâm $E$ cạnh bằng $' + edge + '$, $SD = ' + sdTex + '$. Xét tính đúng sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: 'C', vBR: 'B', vFR: 'A', vFL: 'D', center: 'E' },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $SC \\perp (CDAB)$ nên chiều cao của hình chóp $S.CDAB$ là độ dài cạnh $SC$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Ta có $AB \\perp BC$ và $AB \\perp SC \\Rightarrow AB \\perp (SCB)$. Vì $AB \\subset (SAB)$ nên $(SCB) \\perp (SAB)$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $SC^2 = SD^2 - CD^2 = ' + sdSq + ' - ' + area + ' = ' + (h * h) + ' \\Rightarrow SC = ' + h + '$. Thể tích khối chóp bằng $V = \\dfrac{1}{3} S_{CDAB} \\cdot SC = \\dfrac{1}{3} \\cdot ' + area + ' \\cdot ' + h + ' = ' + vTrue.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Ta có $DA \\perp SC, DA \\perp CD \\Rightarrow DA \\perp (SCD)$. Kẻ $CH \\perp SD$ thì $CH \\perp (SDA)$. Do $E$ là trung điểm $AC$ nên $d(E, (SDA)) = \\dfrac{1}{2} d(C, (SDA)) = \\dfrac{1}{2} CH = \\dfrac{1}{2} \\cdot \\dfrac{SC \\cdot CD}{\\sqrt{SC^2 + CD^2}} = \\dfrac{1}{2} \\cdot \\dfrac{' + h + ' \\cdot ' + edge + '}{\\sqrt{' + sdSq + '}} = ' + distTrueTex + '$ (chú ý $CH = ' + chTex + '$) (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 0', params: { u: 3, h: 0, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (S S S Đ)', params: { u: 3, h: 1, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },
};
