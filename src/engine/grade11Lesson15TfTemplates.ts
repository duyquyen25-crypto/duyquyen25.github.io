import { MathTemplate } from '../types/math';

export const G11_B15_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D15 (Q15): Phép chiếu song song trong lăng trụ ABC.A'B'C' với trung điểm và trọng tâm (Đúng/Sai)
  t11_b15_d15_prism_proj_tf: {
    id: 't11_b15_d15_prism_proj_tf',
    name: 'Phép chiếu song song điểm, trung tuyến và trọng tâm trong lăng trụ tam giác (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Cho hình lăng trụ ABC.A\'B\'C\', gọi I, P là trung điểm A\'C\', BC và G là trọng tâm ΔA\'BC. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'", I: 'I', P: 'P', G: 'G', Gp: "G'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'A_1', Bp: 'B_1', Cp: 'C_1', I: 'M', P: 'Q', G: 'N', Gp: "N'" },
        { A: 'M', B: 'N', C: 'P', Ap: "M'", Bp: "N'", Cp: "P'", I: 'E', P: 'F', G: 'G', Gp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const baseBot = s.A + s.B + s.C;
      const latBC = s.B + s.C + s.Cp + s.Bp;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.Bp + '$ lên mặt phẳng $(' + baseBot + ')$ theo phương $' + s.Cp + s.C + '$ là điểm $' + (aIs ? s.B : s.C) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: bIs
            ? 'Hình chiếu song song của đoạn thẳng $' + s.B + s.I + '$ lên mặt phẳng $(' + baseBot + ')$ theo phương $' + s.A + s.Ap + '$ là đường trung tuyến xuất phát từ $' + s.B + '$ của tam giác $' + baseBot + '$'
            : 'Hình chiếu song song của đoạn thẳng $' + s.B + s.I + '$ lên mặt phẳng $(' + baseBot + ')$ theo phương $' + s.A + s.Ap + '$ là đoạn thẳng $' + s.B + s.P + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.I + '$ lên mặt phẳng $(' + latBC + ')$ theo phương $' + s.Bp + s.Ap + '$ là trung điểm của $' + (cIs ? s.Bp + s.Cp : s.A + s.C) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Gp + '$ là hình chiếu song song của $' + s.G + '$ lên mặt phẳng $(' + baseBot + ')$ theo phương $' + s.C + s.Cp + '$. Khi đó: $\\overrightarrow{' + s.A + s.Gp + '} = ' + (dIs ? '-2' : '2') + '\\overrightarrow{' + s.P + s.Gp + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + baseBot + '.' + s.Ap + s.Bp + s.Cp + '$. Gọi $' + s.I + ', ' + s.P + '$ lần lượt là trung điểm của $' + s.Ap + s.Cp + ', ' + s.B + s.C + '$. Gọi $' + s.G + '$ là trọng tâm của tam giác $' + s.Ap + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.Bp + s.B + ' \\parallel ' + s.Cp + s.C + '$ nên hình chiếu của $' + s.Bp + '$ lên $(' + baseBot + ')$ là điểm $' + s.B + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu theo phương $' + s.A + s.Ap + '$ lên $(' + baseBot + ')$ đưa $' + s.I + '$ về trung điểm của $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.I + '$ là trung tuyến từ $' + s.B + '$, không phải $' + s.B + s.P + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Trong mặt đáy trên, đường thẳng qua trung điểm $' + s.I + '$ của $' + s.Ap + s.Cp + '$ song song với $' + s.Bp + s.Ap + '$ cắt $' + s.Bp + s.Cp + '$ tại trung điểm của $' + s.Bp + s.Cp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Gp + '$ là trọng tâm tam giác $' + baseBot + '$ nên $' + s.A + s.Gp + ' = 2' + s.P + s.Gp + '$ và ngược hướng với $\\overrightarrow{' + s.P + s.Gp + '}$, suy ra $\\overrightarrow{' + s.A + s.Gp + '} = -2\\overrightarrow{' + s.P + s.Gp + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (S S Đ S)', params: { setIdx: 0, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Hai dãy số bậc 2 u_n, v_n với giới hạn phân thức và tham số m (Đúng/Sai)
  t11_b15_d16_two_seqs_quadratic_tf: {
    id: 't11_b15_d16_two_seqs_quadratic_tf',
    name: 'Giới hạn phân thức của hai dãy số bậc hai và bài toán chứa tham số m (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Giới hạn của dãy số',
    description: 'Cho hai dãy bậc hai u_n, v_n. Xét các giới hạn u_n/v_n, u_n/(v_n)^2, u_n/(v_n + p·n^2) và biểu thức chứa tham số m.',
    conditionSummary: 'a, d ∈ [1; 5], b, c ∈ [-5; 5], e ∈ [1; 8], p ∈ [1; 3], m0 ∈ [-3; 3] \\ {0}, aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số n^2 của u_n', min: 1, max: 5 },
      { name: 'b', label: 'Hệ số n của u_n', min: -5, max: 5 },
      { name: 'c', label: 'Hằng số của u_n', min: -5, max: 5 },
      { name: 'd', label: 'Hệ số n^2 của v_n', min: 1, max: 5 },
      { name: 'e', label: 'Hệ số n của v_n', min: 1, max: 8 },
      { name: 'p', label: 'Hệ số cộng thêm p·n^2', min: 1, max: 3 },
      { name: 'm0', label: 'Giá trị tham số m', min: -3, max: 3, allowZero: false },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, d, p, m0, aTrue, bTrue, cTrue, dTrue } = params;
      if (a < 1 || a > 5 || d < 1 || d > 5 || p < 1 || p > 3 || m0 === 0 || Math.abs(m0) > 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (a + m0 === 0) return { valid: false, reason: 'Tránh a + m0 = 0' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, e, p, m0, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const uStr = u.formatPoly([a, b, c], 'n');
      const vStr = u.formatPoly([d, e, 2], 'n');

      const limA = u.simplifyFrac(a, d);
      const limAWrong = u.simplifyFrac(-a, d);
      const limC = u.simplifyFrac(a, d + p);
      const limCWrong = u.simplifyFrac(a + 3, d + p);
      const limDTrue = u.simplifyFrac(a + m0, d);
      const limDWrong = u.simplifyFrac(-(a + m0 + 1), d);

      const pTerm = p === 1 ? 'n^2' : p + 'n^2';

      const tfStatements = [
        {
          key: 'a',
          text: '$\\lim \\dfrac{u_n}{v_n} = ' + (aIs ? limA.latex : limAWrong.latex) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim \\dfrac{u_n}{(v_n)^2} = ' + (bIs ? '0' : limA.latex) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim \\dfrac{u_n}{v_n + ' + pTerm + '} = ' + (cIs ? limC.latex : limCWrong.latex) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Với $m = ' + m0 + '$ thì $\\lim \\dfrac{u_n + m n^2 + 5}{v_n + 2} = ' + (dIs ? limDTrue.latex : limDWrong.latex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hai dãy số $(u_n)$ và $(v_n)$ có $u_n = ' + uStr + ',\\; v_n = ' + vStr + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $\\lim \\dfrac{u_n}{v_n} = ' + limA.latex + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Bậc của $u_n$ là $2$, bậc của $(v_n)^2$ là $4$ nên $\\lim \\dfrac{u_n}{(v_n)^2} = 0$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Mẫu $v_n + ' + pTerm + '$ có hệ số $n^2$ là $' + (d + p) + '$ nên $\\lim \\dfrac{u_n}{v_n + ' + pTerm + '} = ' + limC.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Với $m = ' + m0 + '$, $\\lim \\dfrac{u_n + m n^2 + 5}{v_n + 2} = \\dfrac{' + a + ' + (' + m0 + ')}{' + d + '} = ' + limDTrue.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a + m0 = 0', params: { a: 3, b: -3, c: -3, d: 2, e: 8, p: 1, m0: -3, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (S Đ S S)', params: { a: 3, b: -3, c: -3, d: 2, e: 8, p: 1, m0: -1, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D17 (Q17): 4 giới hạn cơ bản (1/n^k, q^n, bậc 1/bậc 2, mũ p^n và r^n) (Đúng/Sai)
  t11_b15_d17_four_basic_limits_tf: {
    id: 't11_b15_d17_four_basic_limits_tf',
    name: 'Tổng hợp bốn giới hạn cơ bản của dãy số (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Giới hạn của dãy số',
    description: 'Kiểm tra giới hạn dạng c/n^k, q^n (|q|<1), bậc 1/bậc 2, và tỉ số chứa lũy thừa.',
    conditionSummary: 'A ∈ [10; 80], k ∈ [2; 6], 2 ≤ p < q ≤ 9, gcd(p, q)=1, r ∈ [4; 7], s1 < r, s2 < r, a, b ∈ [2; 6]',
    paramSpecs: [
      { name: 'A', label: 'Hằng số A', min: 10, max: 80 },
      { name: 'k', label: 'Số mũ k', min: 2, max: 6 },
      { name: 'p', label: 'Tử cơ số |q| < 1', min: 2, max: 8 },
      { name: 'q', label: 'Mẫu cơ số |q| < 1', min: 3, max: 9 },
      { name: 'r', label: 'Cơ số lớn nhất r', min: 4, max: 7 },
      { name: 'a', label: 'Hệ số r^n ở tử', min: 2, max: 6 },
      { name: 'b', label: 'Hệ số r^n ở mẫu', min: 2, max: 6 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { A, k, p, q, r, a, b, aTrue, bTrue, cTrue, dTrue } = params;
      if (A < 10 || A > 80 || k < 2 || k > 6 || p < 2 || q <= p || q > 9 || u.gcd(p, q) !== 1 || r < 4 || r > 7 || a < 2 || a > 6 || b < 2 || b > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, k, p, q, r, a, b, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const qFrac = u.simplifyFrac(p, q);
      const ansD = u.simplifyFrac(a, b);
      const ansDWrong = u.simplifyFrac(a + 6, b);
      const s1 = 2;
      const s2 = r - 1;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\lim \\left(-\\frac{' + A + '}{n^{' + k + '}}\\right) = ' + (aIs ? '0' : '-' + A) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim \\left(-' + qFrac.latex + '\\right)^n = ' + (bIs ? '0' : '-' + qFrac.latex) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim \\dfrac{n - ' + (b + 5) + '}{n^2 - 2n + 2} = ' + (cIs ? '0' : '-' + (b + 1)) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$\\lim \\frac{' + s1 + '^n + ' + a + ' \\cdot ' + r + '^n}{' + s2 + '^n + ' + b + ' \\cdot ' + r + '^n} = ' + (dIs ? ansD.latex : ansDWrong.latex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $\\lim \\left(-\\frac{' + A + '}{n^{' + k + '}}\\right) = 0$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $\\left|-\\frac{' + p + '}{' + q + '}\\right| < 1$ nên $\\lim \\left(-' + qFrac.latex + '\\right)^n = 0$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Bậc tử nhỏ hơn bậc mẫu nên $\\lim \\dfrac{n - ' + (b + 5) + '}{n^2 - 2n + 2} = 0$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Chia cả tử và mẫu cho $' + r + '^n$ được giới hạn bằng $' + ansD.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { A: 62, k: 5, p: 6, q: 6, r: 5, a: 2, b: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (Đ Đ S S)', params: { A: 62, k: 5, p: 6, q: 7, r: 5, a: 2, b: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Lũy thừa (k·π)^n, đa thức bậc 3, căn thức, tỉ số 2 tổng cấp số cộng (Đúng/Sai)
  t11_b15_d18_four_limits_ap_sum_tf: {
    id: 't11_b15_d18_four_limits_ap_sum_tf',
    name: 'Giới hạn vô cực, căn thức và tỉ số tổng hai cấp số cộng (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Xét giới hạn (kπ)^n, đa thức bậc 3, căn bậc hai trên bậc nhất, và tỉ số tổng n số hạng đầu của hai cấp số cộng.',
    conditionSummary: 'kPi ∈ [2; 7], aCub ∈ [-6; -2], kDen ∈ [2; 7], d1 ∈ {1, 2}, d2 ∈ {-5..-2}',
    paramSpecs: [
      { name: 'kPi', label: 'Hệ số của π', min: 2, max: 7 },
      { name: 'aCub', label: 'Hệ số n^3 (âm)', min: -6, max: -2 },
      { name: 'kDen', label: 'Hệ số n dưới mẫu căn', min: 2, max: 7 },
      { name: 'd1', label: 'Công sai d1 ở tử', min: 1, max: 2 },
      { name: 'd2', label: 'Công sai d2 ở mẫu (âm)', min: -5, max: -2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { kPi, aCub, kDen, d1, d2, aTrue, bTrue, cTrue, dTrue } = params;
      if (kPi < 2 || kPi > 7 || aCub > -2 || aCub < -6 || kDen < 2 || kDen > 7 || (d1 !== 1 && d1 !== 2) || d2 < -5 || d2 > -2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { kPi, aCub, kDen, d1, d2, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const cubPoly = u.formatPoly([aCub, 1, -3, -4], 'n');
      const limC = u.simplifyFrac(1, kDen);

      const u1 = -2;
      const u2 = u1 + d1;
      const u3 = u1 + 2 * d1;
      const uEnd = u.formatLinear(d1, u1 - d1, 'n');
      const v1 = 1;
      const v2 = v1 + d2;
      const v3 = v1 + 2 * d2;
      const vEnd = u.formatLinear(d2, v1 - d2, 'n');

      const numStr = u1 + (u2 >= 0 ? ' + ' + u2 : ' - ' + Math.abs(u2)) + (u3 >= 0 ? ' + ' + u3 : ' - ' + Math.abs(u3)) + ' + \\dots + (' + uEnd + ')';
      const denStr = v1 + (v2 >= 0 ? ' + ' + v2 : ' - ' + Math.abs(v2)) + (v3 >= 0 ? ' + ' + v3 : ' - ' + Math.abs(v3)) + ' + \\dots + (' + vEnd + ')';

      const ansD = u.simplifyFrac(d1, d2);
      const ansDWrong = u.simplifyFrac(-d1, d2);

      const tfStatements = [
        {
          key: 'a',
          text: '$\\lim (' + kPi + '\\pi)^n = ' + (aIs ? '+\\infty' : '0') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim (' + cubPoly + ') = ' + (bIs ? '-\\infty' : '+\\infty') + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim \\dfrac{\\sqrt{n^2 + 2n + 1}}{' + kDen + 'n - 2} = ' + (cIs ? limC.latex : '1') + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$\\lim \\dfrac{' + numStr + '}{' + denStr + '} = ' + (dIs ? ansD.latex : ansDWrong.latex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + kPi + '\\pi > 1$ nên $\\lim (' + kPi + '\\pi)^n = +\\infty$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Hệ số bậc cao nhất $' + aCub + ' < 0$ nên $\\lim (' + cubPoly + ') = -\\infty$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Chia tử và mẫu cho $n > 0$ được giới hạn bằng $' + limC.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tử là tổng $n$ số hạng đầu cấp số cộng ($u_1=' + u1 + ', d_1=' + d1 + '$), mẫu là tổng $n$ số hạng đầu cấp số cộng ($v_1=' + v1 + ', d_2=' + d2 + '$), nên tỉ số có giới hạn bằng $\\dfrac{d_1}{d_2} = ' + ansD.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kDen = 1', params: { kPi: 5, aCub: -4, kDen: 1, d1: 1, d2: -3, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (S Đ Đ Đ)', params: { kPi: 5, aCub: -4, kDen: 5, d1: 1, d2: -3, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Lũy thừa q^n, đa thức bậc 3 -> +inf, căn thức, tỉ số tổng hai cấp số nhân (Đúng/Sai)
  t11_b15_d19_four_limits_gp_sum_tf: {
    id: 't11_b15_d19_four_limits_gp_sum_tf',
    name: 'Giới hạn lũy thừa, đa thức, căn thức và tỉ số tổng hai cấp số nhân (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Xét giới hạn (p/q)^n, đa thức bậc 3 hệ số dương, căn thức bậc hai, và tỉ số hai tổng cấp số nhân có công bội q1 < q2.',
    conditionSummary: '2 ≤ p < q ≤ 17, gcd(p, q)=1, aCub ∈ [2; 6], kSq ∈ [2; 5], 2 ≤ q1 < q2 ≤ 7',
    paramSpecs: [
      { name: 'p', label: 'Tử cơ số p', min: 2, max: 11 },
      { name: 'q', label: 'Mẫu cơ số q', min: 5, max: 17 },
      { name: 'aCub', label: 'Hệ số n^3 (dương)', min: 2, max: 6 },
      { name: 'kSq', label: 'Hệ số k trong căn k^2 n^2', min: 2, max: 5 },
      { name: 'q1', label: 'Công bội tử q1', min: 2, max: 5 },
      { name: 'q2', label: 'Công bội mẫu q2 (> q1)', min: 3, max: 7 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p, q, aCub, kSq, q1, q2, aTrue, bTrue, cTrue, dTrue } = params;
      if (p < 2 || q <= p || q > 17 || u.gcd(p, q) !== 1 || aCub < 2 || aCub > 6 || kSq < 2 || kSq > 5 || q1 < 2 || q2 <= q1 || q2 > 7) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, aCub, kSq, q1, q2, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const qFrac = u.simplifyFrac(p, q);
      const cubPoly = u.formatPoly([aCub, -4, -1, 2], 'n');
      const k2 = kSq * kSq;
      const radPoly = u.formatPoly([k2, 2 * k2, k2], 'n');

      const u1 = 2, v1 = 3;
      const gpNum = u1 + ' + ' + (u1 * q1) + ' + \\dots + ' + u1 + ' \\cdot ' + q1 + '^{n-1}';
      const gpDen = v1 + ' + ' + (v1 * q2) + ' + ' + (v1 * q2 * q2) + ' + \\dots + ' + v1 + ' \\cdot ' + q2 + '^{n-1}';

      const tfStatements = [
        {
          key: 'a',
          text: '$\\lim \\left(' + qFrac.latex + '\\right)^n = ' + (aIs ? '0' : qFrac.latex) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim (' + cubPoly + ') = ' + (bIs ? '+\\infty' : '0,5') + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim \\dfrac{\\sqrt{' + radPoly + '}}{-n - 5} = ' + (cIs ? '-' + kSq : '-\\sqrt{' + (k2 + 2) + '}') + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$\\lim \\dfrac{' + gpNum + '}{' + gpDen + '} = ' + (dIs ? '0' : u.simplifyFrac(u1, v1).latex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $0 < ' + qFrac.latex + ' < 1$ nên $\\lim \\left(' + qFrac.latex + '\\right)^n = 0$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Bậc $3$ có hệ số $' + aCub + ' > 0$ nên $\\lim (' + cubPoly + ') = +\\infty$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\lim \\dfrac{\\sqrt{' + radPoly + '}}{-n - 5} = \\dfrac{\\sqrt{' + k2 + '}}{-1} = -' + kSq + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tử là tổng cấp số nhân công bội $' + q1 + '$, mẫu có công bội $' + q2 + ' > ' + q1 + '$ nên khi chia cả tử và mẫu cho $' + q2 + '^n$, giới hạn bằng $0$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q1 = q2', params: { p: 9, q: 17, aCub: 2, kSq: 2, q1: 5, q2: 5, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (S S S Đ)', params: { p: 9, q: 17, aCub: 2, kSq: 2, q1: 4, q2: 5, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Hằng số, phân thức bậc 1, phân thức bậc 6 mũ 3, tổng CSN lùi vô hạn (Đúng/Sai)
  t11_b15_d20_four_limits_mixed_tf: {
    id: 't11_b15_d20_four_limits_mixed_tf',
    name: 'Giới hạn hằng số, phân thức hữu tỉ bậc cao và tổng cấp số nhân lùi vô hạn (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Kiểm tra giới hạn dãy hằng, phân thức bậc nhất, phân thức ((p - qn^2)^3)/(r n^6 + ...), và tổng CSN lùi vô hạn.',
    conditionSummary: 'C ∈ [10; 80], c ∈ [2; 7], q ∈ [2; 5], r ∈ [-6; -2], kGP ∈ [3; 9], pGP ∈ [2; kGP-1], gcd(pGP, kGP)=1',
    paramSpecs: [
      { name: 'C', label: 'Hằng số C', min: 10, max: 80 },
      { name: 'c', label: 'Hệ số mẫu bậc nhất', min: 2, max: 7 },
      { name: 'q', label: 'Hệ số n^2 trong lập phương', min: 2, max: 5 },
      { name: 'r', label: 'Hệ số n^6 ở mẫu (âm)', min: -6, max: -2 },
      { name: 'pGP', label: 'Tử công bội CSN', min: 2, max: 7 },
      { name: 'kGP', label: 'Mẫu công bội CSN', min: 3, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { C, c, q, r, pGP, kGP, aTrue, bTrue, cTrue, dTrue } = params;
      if (C < 10 || C > 80 || c < 2 || c > 7 || q < 2 || q > 5 || r > -2 || r < -6 || pGP < 2 || kGP <= pGP || kGP > 9 || u.gcd(pGP, kGP) !== 1) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { C, c, q, r, pGP, kGP, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const limB = u.simplifyFrac(-1, c);
      const limBWrong = u.simplifyFrac(1, c);
      const denPoly6 = u.formatPoly([r, 0, -3, -4, 0, 0, 1], 'n');
      const limC = u.simplifyFrac(-q * q * q, r);
      const limCWrong = u.simplifyFrac(q * q * q, r);

      const u1 = -2;
      const t2 = u.simplifyFrac(Math.abs(u1 * pGP), kGP);
      const t3 = u.simplifyFrac(Math.abs(u1 * pGP * pGP), kGP * kGP);
      const qLatex = u.simplifyFrac(pGP, kGP).latex;
      const sumTrue = u.simplifyFrac(u1 * kGP, kGP - pGP);
      const sumWrong = u.simplifyFrac(u1 * kGP, kGP + pGP);

      const tfStatements = [
        {
          key: 'a',
          text: '$\\lim (-' + C + ') = ' + (aIs ? '-' + C : '0') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\lim \\frac{-n - ' + c + '}{' + c + 'n - 5} = ' + (bIs ? limB.latex : limBWrong.latex) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim \\frac{(2 - ' + q + 'n^2)^3}{' + denPoly6 + '} = ' + (cIs ? limC.latex : limCWrong.latex) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$S = ' + u1 + ' - ' + t2.latex + ' - ' + t3.latex + ' + \\dots ' + u1 + '\\left(' + qLatex + '\\right)^{n-1} + \\dots = ' + (dIs ? sumTrue.latex : sumWrong.latex) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Giới hạn của dãy hằng bằng chính hằng số đó: $\\lim(-' + C + ') = -' + C + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\lim \\frac{-n - ' + c + '}{' + c + 'n - 5} = ' + limB.latex + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Tử có số hạng bậc cao nhất $(- ' + q + 'n^2)^3 = -' + (q * q * q) + 'n^6$, mẫu có $' + r + 'n^6$ nên giới hạn bằng $' + limC.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Cấp số nhân lùi vô hạn có $u_1 = ' + u1 + ',\\; q = ' + qLatex + '$ nên $S = \\frac{' + u1 + '}{1 - ' + qLatex + '} = ' + sumTrue.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pGP = kGP', params: { C: 62, c: 4, q: 4, r: -4, pGP: 7, kGP: 7, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (Đ Đ Đ Đ)', params: { C: 62, c: 4, q: 4, r: -4, pGP: 3, kGP: 7, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Bài toán thực tế phóng xạ bán rã (cấp số nhân lùi về 0) (Đúng/Sai)
  t11_b15_d21_radioactive_decay_tf: {
    id: 't11_b15_d21_radioactive_decay_tf',
    name: 'Mô hình phân rã chất phóng xạ theo cấp số nhân lùi vô hạn (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Bài toán thực tế lượng chất phóng xạ ban đầu m0 kg, chu kì bán rã T năm, ngưỡng an toàn 10^{-7} gam.',
    conditionSummary: 'm0Tenths ∈ {16, 20, 24, 28, 32, 36, 40, 44, 48}, T ∈ [12000; 30000], cVal ∈ [3; 9]',
    paramSpecs: [
      { name: 'm0Tenths', label: 'Khối lượng ban đầu (x0.1 kg, chẵn)', min: 16, max: 48, step: 4 },
      { name: 'T', label: 'Chu kì bán rã (năm)', min: 12000, max: 30000, step: 3000 },
      { name: 'cVal', label: 'Hằng số trừ c ở ý (c)', min: 3, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { m0Tenths, T, cVal, aTrue, bTrue, cTrue, dTrue } = params;
      if (m0Tenths < 16 || m0Tenths > 48 || m0Tenths % 2 !== 0 || T < 12000 || T > 30000 || cVal < 3 || cVal > 9) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc m0 lẻ' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m0Tenths, T, cVal, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const m0 = m0Tenths / 10;
      const m0Str = Number.isInteger(m0) ? String(m0) : String(m0).replace('.', ',');
      const u2 = m0 / 2;
      const u2Str = Number.isInteger(u2) ? String(u2) : String(u2).replace('.', ',');
      const u2Wrong = u2 + 0.5;
      const u2WrongStr = Number.isInteger(u2Wrong) ? String(u2Wrong) : String(u2Wrong).replace('.', ',');

      let nMin = 1;
      while (m0 * 1e10 >= Math.pow(2, nMin - 1)) {
        nMin++;
      }

      const tfStatements = [
        {
          key: 'a',
          text: '$u_2 = ' + (aIs ? u2Str : u2WrongStr) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$u_n = ' + m0Str + ' \\cdot \\left(\\frac{1}{2}\\right)^{' + (bIs ? 'n - 1' : 'n + 1') + '}$, với $n \\in \\mathbb{N}^*$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\lim (u_n - ' + cVal + ') = ' + (cIs ? '-' + cVal : String(cVal)) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Sau ít nhất $' + (dIs ? nMin : nMin - 3) + '$ chu kì khối lượng chất phóng xạ đã cho ban đầu không còn độc hại đối với con người',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Có $' + m0Str + '$ kg chất phóng xạ độc hại. Biết rằng, cứ sau một khoảng thời gian $T = ' + T + '$ năm thì một nửa số chất phóng xạ này bị phân rã thành chất khác không độc hại đối với sức khỏe của con người ($T$ được gọi là chu kì bán rã). Biết rằng chất phóng xạ này sẽ không độc hại nữa nếu khối lượng chất phóng xạ còn lại bé hơn $10^{-7}$ gam. Gọi $u_n$ là khối lượng chất phóng xạ còn lại ở chu kì thứ $n$ (tính bằng kg, $u_1 = ' + m0Str + '$). Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $u_2 = \\frac{1}{2} u_1 = \\frac{1}{2} \\cdot ' + m0Str + ' = ' + u2Str + '$ kg (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Dãy $(u_n)$ là cấp số nhân với $u_1 = ' + m0Str + ',\\; q = \\frac{1}{2}$ nên $u_n = ' + m0Str + ' \\cdot \\left(\\frac{1}{2}\\right)^{n-1}$ với $n \\in \\mathbb{N}^*$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $\\lim u_n = 0$ nên $\\lim(u_n - ' + cVal + ') = 0 - ' + cVal + ' = -' + cVal + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Đổi $' + m0Str + '$ kg $= ' + m0Str + ' \\cdot 10^3$ g. Điều kiện $' + m0Str + ' \\cdot 10^3 \\cdot \\left(\\frac{1}{2}\\right)^{n-1} < 10^{-7} \\Leftrightarrow 2^{n-1} > ' + m0Str + ' \\cdot 10^{10} \\Rightarrow n \\ge ' + nMin + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m0 lẻ (25)', params: { m0Tenths: 25, T: 21000, cVal: 5, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn (m0=2,4 kg, Đ Đ S Đ)', params: { m0Tenths: 24, T: 21000, cVal: 5, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },
};
