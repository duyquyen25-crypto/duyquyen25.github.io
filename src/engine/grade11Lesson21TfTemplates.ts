import { MathTemplate } from '../types/math';

export const G11_B21_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D37 (Q37): Phép chiếu song song trên lăng trụ ABC.DEF
  t11_b21_d37_prism_proj_tf: {
    id: 't11_b21_d37_prism_proj_tf',
    name: 'Phép chiếu song song điểm, đoạn thẳng và trọng tâm trong lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Cho hình lăng trụ với trung điểm I, H và trọng tâm G. Xét 4 khẳng định Đúng/Sai về hình chiếu song song.',
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
        { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', I: 'I', H: 'H', G: 'G', Gp: "G'" },
        { A: 'A', B: 'B', C: 'C', D: "A'", E: "B'", F: "C'", I: 'M', H: 'N', G: 'G', Gp: "G'" },
        { A: 'P', B: 'Q', C: 'R', D: "P'", E: "Q'", F: "R'", I: 'E', H: 'K', G: 'G', Gp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.D + s.E + s.F;
      const latAC = s.A + s.C + s.F + s.D;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.D + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.E + s.B + '$ là điểm $' + (aIs ? s.A : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.I + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.D + '$ là ' + (bIs ? 'một trung tuyến của tam giác $' + base + '$' : 'cạnh $' + s.B + s.C + '$ của tam giác $' + base + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.H + '$ lên mặt phẳng $(' + latAC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + (cIs ? s.A + s.C : s.D + s.F) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Gp + '$ là hình chiếu song song của $' + s.G + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.D + '$. Khi đó: $\\overrightarrow{' + s.A + s.Gp + '} = ' + (dIs ? '-2' : '2') + '\\overrightarrow{' + s.H + s.Gp + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.I + ', ' + s.H + '$ lần lượt là trung điểm của $' + s.D + s.F + ', ' + s.B + s.C + '$. Gọi $' + s.G + '$ là trọng tâm của tam giác $' + s.D + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.D, tF: s.E, tR: s.F },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.D + s.A + ' \\parallel ' + s.E + s.B + '$ và $' + s.A + ' \\in (' + base + ')$ nên hình chiếu của $' + s.D + '$ theo phương $' + s.E + s.B + '$ là $' + s.A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu trung điểm $' + s.I + '$ của $' + s.D + s.F + '$ theo phương $' + s.A + s.D + '$ được trung điểm $' + s.A + s.C + '$, nên hình chiếu của $' + s.B + s.I + '$ là trung tuyến xuất phát từ $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Trong mặt đáy, $' + s.H + '$ là trung điểm $' + s.B + s.C + '$ nên hình chiếu của $' + s.H + '$ lên $(' + latAC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + s.A + s.C + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Hình chiếu của trọng tâm $' + s.G + '$ của $\\triangle ' + s.D + s.B + s.C + '$ là trọng tâm $' + s.Gp + '$ của $\\triangle ' + base + '$. Vì $' + s.Gp + '$ nằm giữa $' + s.A + '$ và $' + s.H + '$ với $' + s.A + s.Gp + ' = 2' + s.H + s.Gp + '$ nên $\\overrightarrow{' + s.A + s.Gp + '} = -2\\overrightarrow{' + s.H + s.Gp + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37 (Đ Đ Đ S)', params: { setIdx: 0, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D38 (Q38): Phương trình mũ cơ bản tổng hợp (Đúng/Sai)
  t11_b21_d38_basic_exp_eq_tf: {
    id: 't11_b21_d38_basic_exp_eq_tf',
    name: 'Nhận biết nghiệm phương trình mũ cơ bản (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Xét tính đúng sai của 4 khẳng định về nghiệm của phương trình mũ dạng a^x = a^k, b^x = -C, c^x = D, a^{x^2} = a^k.',
    conditionSummary: 'b1 ∈ {2,3,5}, k1 ∈ [3;5], b2 ∈ [4;9], C2 ∈ [12;45], b3 ∈ [3;7], D3 ∈ [5;13] (không là lũy thừa b3), aTrue..dTrue ∈ {0,1}',
    paramSpecs: [
      { name: 'b1', label: 'Cơ số b1', min: 2, max: 5 },
      { name: 'k1', label: 'Số mũ k1', min: 3, max: 5 },
      { name: 'b2', label: 'Cơ số b2', min: 4, max: 9 },
      { name: 'C2', label: 'Số dương C2 (vế phải -C2)', min: 12, max: 45 },
      { name: 'b3', label: 'Cơ số b3', min: 3, max: 7 },
      { name: 'D3', label: 'Vế phải D3', min: 5, max: 13 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { b1, k1, b2, C2, b3, D3, aTrue, bTrue, cTrue, dTrue } = params;
      if (b1 === 4 || b1 < 2 || b1 > 5 || k1 < 3 || k1 > 5 || b2 < 4 || b2 > 9 || C2 < 12 || C2 > 45 || b3 < 3 || b3 > 7 || D3 < 5 || D3 > 13) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (D3 === b3 || D3 === b3 * b3) {
        return { valid: false, reason: 'Tránh D3 là lũy thừa đúng của b3' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b1, k1, b2, C2, b3, D3, aTrue, bTrue, cTrue, dTrue } = params;
      const rhs1 = Math.pow(b1, k1);
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Phương trình $' + b1 + '^x = ' + rhs1 + '$ có nghiệm là $x = ' + (aIs ? k1 : k1 + 1) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Phương trình $' + b2 + '^x = -' + C2 + '$ ' + (bIs ? 'vô nghiệm' : 'có nghiệm $x = \\log_{' + b2 + '} ' + C2 + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Phương trình $' + b3 + '^x = ' + D3 + '$ có nghiệm là $x = ' + (cIs ? '\\log_{' + b3 + '} ' + D3 : '\\log_{' + D3 + '} ' + b3) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Phương trình $' + b1 + '^{x^2} = ' + rhs1 + '$ có $' + (dIs ? 2 : 1) + '$ nghiệm phân biệt',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $' + b1 + '^x = ' + rhs1 + ' \\Leftrightarrow ' + b1 + '^x = ' + b1 + '^{' + k1 + '} \\Leftrightarrow x = ' + k1 + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $' + b2 + '^x > 0$ với mọi $x \\in \\mathbb{R}$ mà $-' + C2 + ' < 0$ nên phương trình $' + b2 + '^x = -' + C2 + '$ vô nghiệm (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + b3 + '^x = ' + D3 + ' \\Leftrightarrow x = \\log_{' + b3 + '} ' + D3 + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + b1 + '^{x^2} = ' + rhs1 + ' \\Leftrightarrow x^2 = ' + k1 + ' \\Leftrightarrow x = \\pm\\sqrt{' + k1 + '}$, nên có $2$ nghiệm phân biệt (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b1 = 4', params: { b1: 4, k1: 5, b2: 6, C2: 38, b3: 4, D3: 7, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38 (Đ Đ Đ Đ)', params: { b1: 3, k1: 5, b2: 6, C2: 38, b3: 4, D3: 7, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D39 (Q39): Phương trình mũ đưa về bậc hai b^{2x^2 - px + q} = b^k
  t11_b21_d39_exp_quad_vieta_tf: {
    id: 't11_b21_d39_exp_quad_vieta_tf',
    name: 'Phương trình mũ có số mũ bậc hai và hệ thức Vi-ét (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Cho b^{2x² - px + q} = b^k. Xét tính đúng sai về phương trình hệ quả, nghiệm, tổng và tích các nghiệm.',
    conditionSummary: 'b ∈ {2,3,5,7}, p ∈ [1;4], q ∈ [1;4], k ∈ [q+1; 5], Δ không chính phương',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5, 3:7)', min: 0, max: 3 },
      { name: 'p', label: 'Hệ số p của -px', min: 1, max: 4 },
      { name: 'q', label: 'Hằng số q', min: 1, max: 4 },
      { name: 'k', label: 'Số mũ vế phải k > q', min: 2, max: 5 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { bIdx, p, q, k, aTrue, bTrue, cTrue, dTrue } = params;
      if (bIdx < 0 || bIdx > 3 || p < 1 || p > 4 || q < 1 || q > 4 || k < 2 || k > 5 || k <= q) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc k <= q' };
      }
      const cQuad = q - k;
      const delta = p * p - 8 * cQuad;
      const rt = Math.round(Math.sqrt(delta));
      if (rt * rt === delta) {
        return { valid: false, reason: 'Cần Δ không là số chính phương để nghiệm vô tỉ' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, p, q, k, aTrue, bTrue, cTrue, dTrue } = params;
      const b = [2, 3, 5, 7][bIdx];
      const rhs = Math.pow(b, k);
      const cQuad = q - k;
      const cWrong = q + k;
      const delta = p * p - 8 * cQuad;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const origQuad = u.formatQuadratic(2, -p, q);
      const corrQuad = u.formatQuadratic(2, -p, cQuad);
      const wrongQuad = u.formatQuadratic(2, -p, cWrong);
      const sumFrac = u.simplifyFrac(p, 2);
      const wrongSum = u.simplifyFrac(-p, 2);
      const prodFrac = u.simplifyFrac(cQuad, 2);
      const testWrongX = -(k * 3 + 1);

      const tfStatements = [
        {
          key: 'a',
          text: 'Biến đổi phương trình ta được phương trình $' + (aIs ? corrQuad : wrongQuad) + ' = 0$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: bIs ? 'Phương trình đã cho có hai nghiệm phân biệt trái dấu' : '$x = ' + testWrongX + '$ là một nghiệm của phương trình đã cho',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Tổng các nghiệm của phương trình đã cho là $' + (cIs ? sumFrac.latex : wrongSum.latex) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Tích các nghiệm của phương trình đã cho là $' + (dIs ? prodFrac.latex : '0') + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho phương trình $' + b + '^{' + origQuad + '} = ' + rhs + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $' + b + '^{' + origQuad + '} = ' + rhs + ' = ' + b + '^{' + k + '} \\Leftrightarrow ' + corrQuad + ' = 0$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Phương trình bậc hai có $\\Delta = ' + delta + ' > 0$ nên có hai nghiệm phân biệt $x_{1,2} = \\dfrac{' + p + ' \\pm \\sqrt{' + delta + '}}{4}$, tích $x_1 x_2 = ' + prodFrac.latex + ' < 0$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Theo định lí Vi-ét: $x_1 + x_2 = ' + sumFrac.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Theo định lí Vi-ét: $x_1 x_2 = ' + prodFrac.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k <= q', params: { bIdx: 2, p: 1, q: 3, k: 3, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39 (5^{2x^2-x+3}=3125)', params: { bIdx: 2, p: 1, q: 3, k: 5, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D40 (Q40): Phương trình mũ đặt ẩn phụ -a^{2x} + (1+t2)a^x - t2 = 0
  t11_b21_d40_exp_sub_tf: {
    id: 't11_b21_d40_exp_sub_tf',
    name: 'Phương trình mũ đặt ẩn phụ t = a^x (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Cho -a^{2x} + (1 + t₂)a^x - t₂ = 0. Xét điều kiện ẩn phụ t, phương trình bậc hai theo t, nghiệm x và tích các nghiệm.',
    conditionSummary: 'a ∈ {2,3,5,7}, t2 ∈ [2;6], aTrue..dTrue ∈ {0,1}',
    paramSpecs: [
      { name: 'aIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5, 3:7)', min: 0, max: 3 },
      { name: 't2', label: 'Nghiệm dương thứ hai t₂ của ẩn phụ t', min: 2, max: 6 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { aIdx, t2, aTrue, bTrue, cTrue, dTrue } = params;
      if (aIdx < 0 || aIdx > 3 || t2 < 2 || t2 > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aIdx, t2, aTrue, bTrue, cTrue, dTrue } = params;
      const a = [2, 3, 5, 7][aIdx];
      const a2 = a * a;
      const sumT = 1 + t2;
      const prodT = t2;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const eqT = u.formatQuadratic(-1, sumT, -prodT);
      const eqTWrong = u.formatQuadratic(-1, sumT, prodT);
      const wrongProd = 2 * t2;

      const tfStatements = [
        {
          key: 'a',
          text: 'Đặt $t = ' + a + '^x$ thì điều kiện của $t$ là $' + (aIs ? 't > 0' : 't \\ge 0') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Đặt $t = ' + a + '^x$ ta có phương trình $' + (bIs ? eqT : eqTWrong) + ' = 0$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: '$x = ' + (cIs ? '\\log_{' + a + '} ' + t2 : t2) + '$ là một nghiệm của phương trình $(1)$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Tích các nghiệm của phương trình $(1)$ bằng $' + (dIs ? 0 : wrongProd) + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho phương trình $-' + a2 + '^x + ' + sumT + ' \\cdot ' + a + '^x - ' + prodT + ' = 0\\;(1)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Với $t = ' + a + '^x$ thì điều kiện của $t$ là $t > 0$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Thay ' + a2 + '^x = t^2, ta thu được phương trình $' + eqT + ' = 0$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Giải $' + eqT + ' = 0 \\Leftrightarrow t = 1$ hoặc $t = ' + t2 + '$. Suy ra $x = \\log_{' + a + '} 1 = 0$ hoặc $x = \\log_{' + a + '} ' + t2 + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tích các nghiệm của $(1)$ là $x_1 x_2 = 0 \\cdot \\log_{' + a + '} ' + t2 + ' = 0$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t2 = 1', params: { aIdx: 3, t2: 1, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40 (Đ Đ S S)', params: { aIdx: 3, t2: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D41 (Q41): Phương trình lôgarit cơ bản tổng hợp (Đúng/Sai)
  t11_b21_d41_basic_log_eq_tf: {
    id: 't11_b21_d41_basic_log_eq_tf',
    name: 'Nhận biết nghiệm phương trình lôgarit cơ bản (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Xét nghiệm của log_b x = k, log x = m, log_b x = log_b N, ln x = n.',
    conditionSummary: 'b ∈ {2,3,5}, k ∈ [3;5], m ∈ [10;25], N ∈ [20;90], n ∈ [10;25]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5)', min: 0, max: 2 },
      { name: 'k', label: 'Số mũ k', min: 3, max: 5 },
      { name: 'm', label: 'Vế phải log x = m', min: 10, max: 25 },
      { name: 'N', label: 'Số N trong log_b x = log_b N', min: 20, max: 90 },
      { name: 'n', label: 'Vế phải ln x = n', min: 10, max: 25 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { bIdx, k, m, N, n, aTrue, bTrue, cTrue, dTrue } = params;
      if (bIdx < 0 || bIdx > 2 || k < 3 || k > 5 || m < 10 || m > 25 || N < 20 || N > 90 || n < 10 || n > 25) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k, m, N, n, aTrue, bTrue, cTrue, dTrue } = params;
      const b = [2, 3, 5][bIdx];
      const rhs1 = Math.pow(b, k);
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Phương trình $\\log_{' + b + '} x = ' + k + '$ có nghiệm là $x = ' + (aIs ? rhs1 : rhs1 + b) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Phương trình $\\log x = ' + m + '$ có nghiệm là $x = ' + (bIs ? '10^{' + m + '}' : 'e^{' + m + '}') + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Phương trình $\\log_{' + b + '} x = \\log_{' + b + '} ' + N + '$ có nghiệm là $x = ' + (cIs ? N : Math.pow(b, 2)) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Phương trình $\\ln x = ' + n + '$ có nghiệm là $x = ' + (dIs ? 'e^{' + n + '}' : '10^{' + n + '}') + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $\\log_{' + b + '} x = ' + k + ' \\Leftrightarrow x = ' + b + '^{' + k + '} = ' + rhs1 + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $\\log x = ' + m + ' \\Leftrightarrow x = 10^{' + m + '}$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\log_{' + b + '} x = \\log_{' + b + '} ' + N + ' \\Leftrightarrow x = ' + N + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $\\ln x = ' + n + ' \\Leftrightarrow x = e^{' + n + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 2', params: { bIdx: 1, k: 2, m: 20, N: 80, n: 14, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41 (Đ S Đ S)', params: { bIdx: 1, k: 5, m: 20, N: 80, n: 14, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D42 (Q42): Bất phương trình mũ cơ bản tổng hợp (Đúng/Sai)
  t11_b21_d42_basic_exp_ineq_tf: {
    id: 't11_b21_d42_basic_exp_ineq_tf',
    name: 'Giải bất phương trình mũ cơ bản tổng hợp (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Xét nghiệm của các bất phương trình mũ cùng cơ số, khác cơ số > 1, cơ số thuộc (0; 1) và vế phải âm.',
    conditionSummary: 'b1 ∈ [11;19], c1 ∈ [6;12], d1 ∈ [2;6], b2 ∈ [5;12], K2 ∈ [15;40], b3 ∈ [4;8], C3 ∈ [10;25], M4 ∈ [120;320]',
    paramSpecs: [
      { name: 'b1', label: 'Cơ số b1 > 1', min: 11, max: 19 },
      { name: 'c1', label: 'Số hạng c1', min: 6, max: 12 },
      { name: 'd1', label: 'Số hạng d1', min: 2, max: 6 },
      { name: 'b2', label: 'Cơ số b2', min: 5, max: 12 },
      { name: 'K2', label: 'Vế phải K2', min: 15, max: 40 },
      { name: 'b3', label: 'Cơ số b3', min: 4, max: 8 },
      { name: 'C3', label: 'Hằng số C3 (vế phải -C3)', min: 10, max: 25 },
      { name: 'M4', label: 'Vế phải M4 của (5/8)^x < M4', min: 120, max: 320 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { b1, c1, d1, b2, K2, b3, C3, M4, aTrue, bTrue, cTrue, dTrue } = params;
      if (b1 < 11 || b1 > 19 || c1 < 6 || c1 > 12 || d1 < 2 || d1 > 6 || b2 < 5 || b2 > 12 || K2 < 15 || K2 > 40 || b3 < 4 || b3 > 8 || C3 < 10 || C3 > 25 || M4 < 120 || M4 > 320) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b1, c1, d1, b2, K2, b3, C3, M4, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const expL = u.formatLinear(-2, c1);
      const expR = u.formatLinear(-5, -d1);
      const crit = u.simplifyFrac(-(c1 + d1), 3);

      const tfStatements = [
        {
          key: 'a',
          text: 'Bất phương trình $' + b1 + '^{' + expL + '} \\ge ' + b1 + '^{' + expR + '}$ có nghiệm là $x ' + (aIs ? '\\ge ' : '\\le ') + crit.latex + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Bất phương trình $' + b2 + '^x > ' + K2 + '$ có nghiệm là $x ' + (bIs ? '> ' : '\\le ') + '\\log_{' + b2 + '} ' + K2 + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Bất phương trình $' + b3 + '^x < -' + C3 + '$ ' + (cIs ? 'vô nghiệm' : 'có nghiệm $x < \\log_{' + b3 + '} ' + C3 + '$'),
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Bất phương trình $\\left(\\dfrac{5}{8}\\right)^x < ' + M4 + '$ có nghiệm là $x ' + (dIs ? '> ' : '< ') + '\\log_{\\frac{5}{8}} ' + M4 + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + b1 + ' > 1$ nên $' + expL + ' \\ge ' + expR + ' \\Leftrightarrow 3x \\ge ' + (-(c1 + d1)) + ' \\Leftrightarrow x \\ge ' + crit.latex + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $' + b2 + '^x > ' + K2 + ' \\Leftrightarrow x > \\log_{' + b2 + '} ' + K2 + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Vì $' + b3 + '^x > 0$ với mọi $x \\in \\mathbb{R}$ mà $-' + C3 + ' < 0$ nên $' + b3 + '^x < -' + C3 + '$ vô nghiệm (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $0 < \\dfrac{5}{8} < 1$ nên $\\left(\\dfrac{5}{8}\\right)^x < ' + M4 + ' \\Leftrightarrow x > \\log_{\\frac{5}{8}} ' + M4 + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b1 = 10', params: { b1: 10, c1: 10, d1: 3, b2: 9, K2: 28, b3: 6, C3: 13, M4: 278, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42 (S S Đ S)', params: { b1: 17, c1: 10, d1: 3, b2: 9, K2: 28, b3: 6, C3: 13, M4: 278, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D43 (Q43): Hàm số y = log_b(c - px) với phương trình và bất phương trình
  t11_b21_d43_log_func_eq_ineq_tf: {
    id: 't11_b21_d43_log_func_eq_ineq_tf',
    name: 'Tập xác định, đơn điệu, phương trình và bất phương trình y = log_b(c - px) (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Cho y = log_b(c - px) với b > 1, c, p > 0. Xét tập xác định, chiều biến thiên, nghiệm phương trình và bất phương trình.',
    conditionSummary: 'b ∈ {2,3,5}, c ∈ [2;5], p ∈ [2;7], gcd(c,p)=1, k1 ∈ [1;2], k2 ∈ [k1+1; 4]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5)', min: 0, max: 2 },
      { name: 'c', label: 'Hằng số c', min: 2, max: 5 },
      { name: 'p', label: 'Hệ số p của -px', min: 2, max: 7 },
      { name: 'k1', label: 'Vế phải k1 của phương trình', min: 1, max: 2 },
      { name: 'k2', label: 'Vế phải k2 > k1 của bất phương trình', min: 2, max: 4 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { bIdx, c, p, k1, k2, aTrue, bTrue, cTrue, dTrue } = params;
      if (bIdx < 0 || bIdx > 2 || c < 2 || c > 5 || p < 2 || p > 7 || u.gcd(c, p) !== 1 || k1 < 1 || k1 > 2 || k2 <= k1 || k2 > 4) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc k2 <= k1' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, c, p, k1, k2, aTrue, bTrue, cTrue, dTrue } = params;
      const b = [2, 3, 5][bIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const domFrac = u.simplifyFrac(c, p);
      const eqFrac = u.simplifyFrac(c - Math.pow(b, k1), p);
      const eqWrongFrac = u.simplifyFrac(c + Math.pow(b, k1), p);
      const ineqFrac = u.simplifyFrac(c - Math.pow(b, k2), p);
      const lin = u.formatLinear(-p, c);

      const tfStatements = [
        {
          key: 'a',
          text: 'Tập xác định của hàm số là $D = ' + (aIs ? '(-\\infty; ' + domFrac.latex + ')' : '(' + domFrac.latex + '; +\\infty)') + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hàm số ' + (bIs ? 'nghịch biến' : 'đồng biến') + ' trên khoảng $(-\\infty; ' + domFrac.latex + ')$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Tập nghiệm của phương trình $\\log_{' + b + '}(' + lin + ') = ' + k1 + '$ là $S = \\left\\{' + (cIs ? eqFrac.latex : eqWrongFrac.latex) + '\\right\\}$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Tập nghiệm của bất phương trình $\\log_{' + b + '}(' + lin + ') < ' + k2 + '$ là $S = ' + (dIs ? '(' + ineqFrac.latex + '; ' + domFrac.latex + ')' : '(-\\infty; ' + ineqFrac.latex + ')') + '$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\log_{' + b + '}(' + lin + ')$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Hàm số xác định khi $' + lin + ' > 0 \\Leftrightarrow x < ' + domFrac.latex + '$. Tập xác định $D = (-\\infty; ' + domFrac.latex + ')$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì cơ số $' + b + ' > 1$ và biểu thức $' + lin + '$ nghịch biến nên hàm số $y$ nghịch biến trên $D$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $\\log_{' + b + '}(' + lin + ') = ' + k1 + ' \\Leftrightarrow ' + lin + ' = ' + Math.pow(b, k1) + ' \\Leftrightarrow x = ' + eqFrac.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $\\log_{' + b + '}(' + lin + ') < ' + k2 + ' \\Leftrightarrow 0 < ' + lin + ' < ' + Math.pow(b, k2) + ' \\Leftrightarrow ' + ineqFrac.latex + ' < x < ' + domFrac.latex + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k2 <= k1', params: { bIdx: 0, c: 2, p: 5, k1: 2, k2: 2, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43 (Đ S Đ Đ)', params: { bIdx: 0, c: 2, p: 5, k1: 2, k2: 4, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
