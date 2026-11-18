import { MathTemplate } from '../types/math';

export const G11_B19_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D22 (Q22): Phép chiếu song song trong hình lăng trụ ABC.A'B'C' (H, P, N -> AN' = -2 PN')
  t11_b19_d22_prism_proj_tf: {
    id: 't11_b19_d22_prism_proj_tf',
    name: 'Phép chiếu song song điểm, trung tuyến và hệ thức trọng tâm lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Cho hình lăng trụ ABC.A\'B\'C\', gọi H, P là trung điểm A\'C\', BC và N là trọng tâm ΔA\'BC. Xét 4 mệnh đề Đúng/Sai.',
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
        { A: 'A', B: 'B', C: 'C', Ap: "A'", Bp: "B'", Cp: "C'", H: 'H', P: 'P', N: 'N', Np: "N'" },
        { A: 'A', B: 'B', C: 'C', Ap: 'D', Bp: 'E', Cp: 'F', H: 'G', P: 'M', N: 'Q', Np: "Q'" },
        { A: 'M', B: 'N', C: 'P', Ap: 'M_1', Bp: 'N_1', Cp: 'P_1', H: 'I', P: 'K', N: 'G', Np: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const latAB = s.A + s.B + s.Bp + s.Ap;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.Ap + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.Cp + s.C + '$ là điểm $' + (aIs ? s.A : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.H + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.Ap + '$ là ' + (bIs ? 'đường trung tuyến xuất phát từ $' + s.B + '$ của tam giác $' + base + '$' : 'đoạn thẳng $' + s.B + s.P + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.H + '$ lên mặt phẳng $(' + latAB + ')$ theo phương $' + s.Bp + s.Cp + '$ là trung điểm của $' + (cIs ? s.Ap + s.Bp : s.A + s.B) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Np + '$ là hình chiếu song song của $' + s.N + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.Bp + '$. Khi đó: $\\overrightarrow{' + s.A + s.Np + '} = ' + (dIs ? '-2' : '2') + '\\overrightarrow{' + s.P + s.Np + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + s.Ap + s.Bp + s.Cp + '$. Gọi $' + s.H + ', ' + s.P + '$ lần lượt là trung điểm của $' + s.Ap + s.Cp + ', ' + s.B + s.C + '$. Gọi $' + s.N + '$ là trọng tâm của tam giác $' + s.Ap + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.Ap, tF: s.Bp, tR: s.Cp },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.Ap + s.A + ' \\parallel ' + s.Cp + s.C + '$ nên hình chiếu của $' + s.Ap + '$ lên $(' + base + ')$ là $' + s.A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu theo phương $' + s.A + s.Ap + '$ đưa $' + s.H + '$ về trung điểm của $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.H + '$ là trung tuyến từ $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Trong mặt đáy trên, đường thẳng qua trung điểm $' + s.H + '$ của $' + s.Ap + s.Cp + '$ song song với $' + s.Bp + s.Cp + '$ cắt $' + s.Ap + s.Bp + '$ tại trung điểm của $' + s.Ap + s.Bp + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $' + s.Np + '$ là trọng tâm tam giác $' + base + '$ và $' + s.P + '$ là trung điểm $' + s.B + s.C + '$ nên $\\overrightarrow{' + s.A + s.Np + '} = -2\\overrightarrow{' + s.P + s.Np + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (S S S Đ)', params: { setIdx: 0, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Các phép biến đổi lôgarit hai biến dương c > d > 0 và hệ thức c^2 + d^2 = k cd
  t11_b19_d23_log_two_vars_tf: {
    id: 't11_b19_d23_log_two_vars_tf',
    name: 'Phép biến đổi lôgarit hai biến dương và hệ thức bậc hai đối xứng (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Cho c, d > 0 (c ≠ 1, c > d). Kiểm tra tính chất log_{c^k} d, log(c^k d), tổng log và khai triển từ c^2 + d^2 = (b0-2)cd.',
    conditionSummary: 'k ∈ [4; 14], p ∈ [3; 6], b0 ∈ {5, 7, 11}, flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'k', label: 'Số mũ k trong ý (a),(b)', min: 4, max: 14 },
      { name: 'p', label: 'Số mũ p trong ý (c)', min: 3, max: 6 },
      { name: 'b0Idx', label: 'Cơ số log b0 ∈ {5, 7, 11} (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { k, p, b0Idx, aTrue, bTrue, cTrue, dTrue } = params;
      if (k < 4 || p < 3 || b0Idx < 0 || b0Idx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, p, b0Idx, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const b0 = [5, 7, 11][b0Idx];
      const coefEq = b0 - 2; // c^2 + d^2 = (b0 - 2)cd => (c+d)^2 = b0 cd

      const tfStatements = [
        {
          key: 'a',
          text: '$\\log_{c^{' + k + '}} d = ' + (aIs ? '\\frac{1}{' + k + '}' : String(k)) + '\\log_{c} d$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\log(c^{' + k + '} d) = ' + (bIs ? k + '\\log c + \\log d' : k + '\\log c \\cdot \\log d') + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\log_{c} d^{' + p + '} + \\log_{c^2} d^2 = ' + (cIs ? (p + 1) : (p - 1)) + '\\log_{c} d$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Nếu $c^2 + d^2 = ' + coefEq + 'cd$ thì $\\log_{' + b0 + '}(c + d) = \\frac{1}{2}(' + (dIs ? '1 + ' : '2 + ') + '\\log_{' + b0 + '} c + \\log_{' + b0 + '} d)$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho $c, d$ là các số thực dương tùy ý và $c > d,\\; c \\ne 1$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $\\log_{c^{' + k + '}} d = \\frac{1}{' + k + '}\\log_{c} d$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\log(c^{' + k + '} d) = ' + k + '\\log c + \\log d$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\log_{c} d^{' + p + '} + \\log_{c^2} d^2 = ' + p + '\\log_{c} d + \\frac{2}{2}\\log_{c} d = ' + (p + 1) + '\\log_{c} d$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Ta có $(c + d)^2 = c^2 + d^2 + 2cd = ' + b0 + 'cd \\Rightarrow \\log_{' + b0 + '}(c + d) = \\frac{1}{2}(1 + \\log_{' + b0 + '} c + \\log_{' + b0 + '} d)$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b0Idx = 3', params: { k: 12, p: 3, b0Idx: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (k=12, p=3, b0=7 -> Đ Đ S Đ)', params: { k: 12, p: 3, b0Idx: 1, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Tính chất lôgarit và tổng nghịch đảo log dạng giai thừa (a > 0, a ≠ 1)
  t11_b19_d24_log_single_var_telescope_tf: {
    id: 't11_b19_d24_log_single_var_telescope_tf',
    name: 'Quy tắc đổi cơ số lôgarit và tổng dãy nghịch đảo lôgarit dạng giai thừa (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Kiểm tra log_b a - log_b m, log_p(p^2/a), tổng đổi cơ số và tổng 1/log_k a đưa về log_a(m2!/(m1-1)!).',
    conditionSummary: 'b ∈ [3; 9], m ∈ [5; 18], p ∈ {2, 3, 5}, q ∈ {2, 3, 7}\\p, r ∈ [3; 9], m1 ∈ [5; 12], m2 ∈ [80; 180]',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b trong ý (a)', min: 3, max: 9 },
      { name: 'm', label: 'Số m trong ý (a)', min: 5, max: 18 },
      { name: 'pIdx', label: 'Cơ số p ∈ {2, 3, 5} (0..2)', min: 0, max: 2 },
      { name: 'r', label: 'Hệ số r trong ý (c)', min: 3, max: 9 },
      { name: 'm1', label: 'Số đầu m1 trong tổng ý (d)', min: 5, max: 12 },
      { name: 'm2', label: 'Số cuối m2 trong tổng ý (d)', min: 80, max: 180 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { b, m, pIdx, r, m1, m2, aTrue, bTrue, cTrue, dTrue } = params;
      if (b < 3 || m < 5 || pIdx < 0 || pIdx > 2 || r < 3 || m1 < 5 || m2 <= m1 + 10) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, m, pIdx, r, m1, m2, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const p = [2, 3, 5][pIdx];
      const q = p === 3 ? 7 : 3;
      const p2 = p * p;
      const cCoeff = u.simplifyFrac(2 * r + 1, 2);
      const cCoeffWrong = u.simplifyFrac(2 * r - 1, 2);

      const tfStatements = [
        {
          key: 'a',
          text: '$\\log_{' + b + '} a - \\log_{' + b + '} ' + m + ' = \\log_{' + b + '} ' + (aIs ? '\\dfrac{a}{' + m + '}' : '\\dfrac{' + m + '}{a}') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\log_{' + p + '} \\dfrac{' + p2 + '}{a} = ' + (bIs ? '2 - \\log_{' + p + '} a' : '2 + \\log_{' + p + '} a') + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\log_{' + p2 + '} a + ' + r + '\\dfrac{\\log_{' + q + '} a}{\\log_{' + q + '} ' + p + '} = ' + (cIs ? cCoeff.latex : cCoeffWrong.latex) + '\\log_{' + p + '} a$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: '$\\dfrac{1}{\\log_{' + m1 + '} a} + \\dfrac{1}{\\log_{' + (m1 + 1) + '} a} + \\dots + \\dfrac{1}{\\log_{' + m2 + '} a} = \\log_{a} \\dfrac{' + m2 + '!}{' + (dIs ? (m1 - 1) : m1) + '!}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho số thực dương $a \\ne 1$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $\\log_{' + b + '} a - \\log_{' + b + '} ' + m + ' = \\log_{' + b + '} \\dfrac{a}{' + m + '}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\log_{' + p + '} \\dfrac{' + p2 + '}{a} = \\log_{' + p + '} ' + p + '^2 - \\log_{' + p + '} a = 2 - \\log_{' + p + '} a$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\frac{1}{2}\\log_{' + p + '} a + ' + r + '\\log_{' + p + '} a = ' + cCoeff.latex + '\\log_{' + p + '} a$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tổng bằng $\\log_{a} ' + m1 + ' + \\log_{a} ' + (m1 + 1) + ' + \\dots + \\log_{a} ' + m2 + ' = \\log_{a} \\dfrac{' + m2 + '!}{' + (m1 - 1) + '!}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m2 quá gần m1', params: { b: 8, m: 14, pIdx: 2, r: 7, m1: 9, m2: 12, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (Đ Đ Đ Đ)', params: { b: 8, m: 14, pIdx: 2, r: 7, m1: 9, m2: 150, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Biểu diễn lôgarit theo a = log_2 3, b = log_2 7 (4 ý Đúng/Sai)
  t11_b19_d25_log_express_decomp_tf: {
    id: 't11_b19_d25_log_express_decomp_tf',
    name: 'Đổi cơ số và phân tích thừa số nguyên tố biểu diễn theo a, b (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Cho a = log_c(p1), b = log_c(p2). Kiểm tra nghịch đảo lôgarit, tỉ số a/b, log_{p1 p2}(c^k) và biểu thức m + na + pb.',
    conditionSummary: 'c, p1, p2 ∈ {(2, 3, 7), (2, 3, 5), (3, 2, 5)}, k ∈ [5; 11], e0 ∈ [2; 4], e1 ∈ [2; 3], e2 ∈ [1; 2], flags ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ số nguyên tố (0..2)', min: 0, max: 2 },
      { name: 'k', label: 'Số mũ k trong ý (c)', min: 5, max: 11 },
      { name: 'e0', label: 'Số mũ c trong M ý (d)', min: 2, max: 4 },
      { name: 'e1', label: 'Số mũ p1 trong M ý (d)', min: 2, max: 3 },
      { name: 'e2', label: 'Số mũ p2 trong M ý (d)', min: 1, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, k, e0, e1, e2, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2 || k < 5 || e0 < 2 || e1 < 2 || e2 < 1) return { valid: false, reason: 'Tham số ngoài miền' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, k, e0, e1, e2, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const [c, p1, p2] = [[2, 3, 7], [2, 3, 5], [3, 2, 5]][setIdx];

      const ck = Math.pow(c, k);
      const p1p2 = p1 * p2;
      const M = Math.pow(c, e0) * Math.pow(p1, e1) * Math.pow(p2, e2);
      const exprTrue = -e0 - 3 * e1 + 2 * e2;
      const exprWrong = exprTrue + 2;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\dfrac{1}{\\log_{' + c + '} ' + p2 + '} = ' + (aIs ? '\\log_{' + p2 + '} ' + c : '\\log_{' + p1 + '} ' + p2) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: '$\\dfrac{a}{b} = \\log_{' + (bIs ? p2 + '} ' + p1 : p1 + '} ' + p2) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$\\log_{' + p1p2 + '} ' + ck + ' = \\dfrac{' + (cIs ? k : k + 2) + '}{a + b}$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Biết $\\log_{' + c + '} ' + M + ' = m + na + pb$. Khi đó $-m - 3n + 2p = ' + (dIs ? exprTrue : exprWrong) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho $a = \\log_{' + c + '} ' + p1 + ',\\; b = \\log_{' + c + '} ' + p2 + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $\\frac{1}{\\log_{' + c + '} ' + p2 + '} = \\log_{' + p2 + '} ' + c + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\frac{a}{b} = \\frac{\\log_{' + c + '} ' + p1 + '}{\\log_{' + c + '} ' + p2 + '} = \\log_{' + p2 + '} ' + p1 + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\log_{' + p1p2 + '} ' + c + '^{' + k + '} = \\frac{' + k + '}{\\log_{' + c + '}(' + p1 + ' \\cdot ' + p2 + ')} = \\frac{' + k + '}{a + b}$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $\\log_{' + c + '} ' + M + ' = ' + e0 + ' + ' + e1 + 'a + ' + e2 + 'b \\Rightarrow m = ' + e0 + ',\\; n = ' + e1 + ',\\; p = ' + e2 + ' \\Rightarrow -m - 3n + 2p = ' + exprTrue + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, k: 9, e0: 4, e1: 3, e2: 2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (Đ S S S)', params: { setIdx: 0, k: 9, e0: 4, e1: 3, e2: 2, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
