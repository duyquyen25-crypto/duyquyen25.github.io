import { MathTemplate } from '../types/math';

export const G11_B19_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D26 (Q26): Cho log_a b = k1, log_a c = k2, tính M = log_b(a √c)
  t11_b19_d26_sa_log_nested_sqrt: {
    id: 't11_b19_d26_sa_log_nested_sqrt',
    name: 'Tính giá trị log_b(a√c) khi biết log_a(b) và log_a(c) (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Biết log_a b = k1 và log_a c = k2. Tính M = log_b(a √c).',
    conditionSummary: 'k1 ∈ [2; 5], t ∈ [1; 5], k2 = 2t, tránh .x5 nếu là số thập phân',
    paramSpecs: [
      { name: 'k1', label: 'Giá trị log_a b', min: 2, max: 5 },
      { name: 't', label: 'Một nửa của log_a c', min: 1, max: 5 },
    ],
    validateCode: `
      const { k1, t } = params;
      if (k1 < 2 || k1 > 5 || t < 1 || t > 5) return { valid: false, reason: 'Tham số ngoài miền' };
      const num = 1 + t;
      if ((20 * num) % (2 * k1) === k1) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k1, t } = params;
      const k2 = 2 * t;
      const ansF = u.simplifyFrac(1 + t, k1);
      const val = ansF.value;
      const rounded = Math.round(val * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Cho các số thực dương $a, b, c$ ($a \\ne 1,\\; b \\ne 1$) thỏa mãn $\\log_{a} b = ' + k1 + ',\\; \\log_{a} c = ' + k2 + '$. Tính $M = \\log_{b}(a\\sqrt{c})$' + (ansF.isInteger ? '.' : ' (kết quả làm tròn đến hàng phần mười).'),
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $b = a^{' + k1 + '}$ và $c = a^{' + k2 + '}$, suy ra $\\sqrt{c} = a^{' + t + '}$.',
          'Do đó $M = \\log_{a^{' + k1 + '}}(a \\cdot a^{' + t + '}) = \\frac{1 + ' + t + '}{' + k1 + '} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k1 = 1', params: { k1: 1, t: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (k1=2, k2=6 -> M=2)', params: { k1: 2, t: 3 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Biết log_a b, log_a c, tính log_a(1/(b^m c^n)) + C
  t11_b19_d27_sa_log_linear_abc_1: {
    id: 't11_b19_d27_sa_log_linear_abc_1',
    name: 'Tính giá trị log_a(1 / (b^m c^n)) + C theo log_a(b) và log_a(c) (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Lôgarit',
    description: 'Biết log_a b = x, log_a c = y. Tính -m·x - n·y + C.',
    conditionSummary: 'x ∈ [-8; 8]\\{0}, y ∈ [-8; 8]\\{0}, m, n ∈ [2; 5], C ∈ [-6; 6]\\{0}',
    paramSpecs: [
      { name: 'x', label: 'Giá trị log_a b', min: -8, max: 8, allowZero: false },
      { name: 'y', label: 'Giá trị log_a c', min: -8, max: 8, allowZero: false },
      { name: 'm', label: 'Số mũ b ở mẫu', min: 2, max: 5 },
      { name: 'n', label: 'Số mũ c ở mẫu', min: 2, max: 5 },
      { name: 'C', label: 'Hằng số C cộng thêm', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { x, y, m, n, C } = params;
      if (x === 0 || y === 0 || m < 2 || n < 2 || C === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, m, n, C } = params;
      const val = -m * x - n * y + C;
      const shortAns = String(val);
      const trail = C > 0 ? ' + ' + C : ' - ' + Math.abs(C);
      return {
        stem: 'Biết $\\log_{a} b = ' + x + ',\\; \\log_{a} c = ' + y + '$ (với $a, b, c > 0,\\; a \\ne 1$). Tính giá trị biểu thức $P = \\log_{a} \\left(\\dfrac{1}{b^{' + m + '} c^{' + n + '}}\\right)' + trail + '$.',
        shortAnswer: shortAns,
        numericValue: val,
        answerSummary: shortAns,
        solutionSteps: [
          '$P = -' + m + '\\log_{a} b - ' + n + '\\log_{a} c' + trail + ' = -' + m + '\\cdot(' + x + ') - ' + n + '\\cdot(' + y + ')' + trail + ' = ' + val + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x = 0', params: { x: 0, y: 5, m: 4, n: 2, C: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (x=-6, y=5, m=4, n=2, C=2 -> 16)', params: { x: -6, y: 5, m: 4, n: 2, C: 2 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Biết log_a b, log_a c, tính log_a(b^m / (a^k c^n))
  t11_b19_d28_sa_log_linear_abc_2: {
    id: 't11_b19_d28_sa_log_linear_abc_2',
    name: 'Tính giá trị log_a(b^m / (a^k c^n)) theo log_a(b) và log_a(c) (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Biết log_a b = x, log_a c = y. Tính P = log_a(b^m/(a^k c^n)) = -k + m·x - n·y.',
    conditionSummary: 'x ∈ [-7; 7]\\{0}, y ∈ [-7; 7]\\{0}, m ∈ [2; 5], k ∈ [1; 4], n ∈ [2; 5]',
    paramSpecs: [
      { name: 'x', label: 'Giá trị log_a b', min: -7, max: 7, allowZero: false },
      { name: 'y', label: 'Giá trị log_a c', min: -7, max: 7, allowZero: false },
      { name: 'm', label: 'Số mũ b ở tử', min: 2, max: 5 },
      { name: 'k', label: 'Số mũ a ở mẫu', min: 1, max: 4 },
      { name: 'n', label: 'Số mũ c ở mẫu', min: 2, max: 5 },
    ],
    validateCode: `
      const { x, y, m, k, n } = params;
      if (x === 0 || y === 0 || m < 2 || k < 1 || n < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, m, k, n } = params;
      const val = -k + m * x - n * y;
      const shortAns = String(val);
      const aPow = k === 1 ? 'a' : 'a^{' + k + '}';
      return {
        stem: 'Biết $\\log_{a} b = ' + x + ',\\; \\log_{a} c = ' + y + '$ (với $a, b, c > 0,\\; a \\ne 1$). Tính giá trị biểu thức $P = \\log_{a} \\left(\\dfrac{b^{' + m + '}}{' + aPow + ' c^{' + n + '}}\\right)$.',
        shortAnswer: shortAns,
        numericValue: val,
        answerSummary: shortAns,
        solutionSteps: [
          '$P = ' + m + '\\log_{a} b - ' + k + ' - ' + n + '\\log_{a} c = ' + m + '\\cdot(' + x + ') - ' + k + ' - ' + n + '\\cdot(' + y + ') = ' + val + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y = 0', params: { x: -3, y: 0, m: 2, k: 2, n: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (x=-3, y=-6 -> 10)', params: { x: -3, y: -6, m: 2, k: 2, n: 3 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Phân tích số nguyên lớn N = 5^m · 2^n · 3^p qua log_5 N
  t11_b19_d29_sa_log_prime_decomp_int: {
    id: 't11_b19_d29_sa_log_prime_decomp_int',
    name: 'Phân tích số nguyên qua log_5(N) = m + n·log_5(2) + p·log_5(3) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Cho log_c(N) = m + n log_c(2) + p log_c(3). Tìm 2m + n + 2p.',
    conditionSummary: 'm0 ∈ [2; 4], n0 ∈ [1; 4], p0 ∈ [1; 5], N = 5^m0 · 2^n0 · 3^p0 <= 2500000',
    paramSpecs: [
      { name: 'm0', label: 'Số mũ của cơ số 5', min: 2, max: 4 },
      { name: 'n0', label: 'Số mũ của 2', min: 1, max: 4 },
      { name: 'p0', label: 'Số mũ của 3', min: 1, max: 5 },
    ],
    validateCode: `
      const { m0, n0, p0 } = params;
      if (m0 < 2 || m0 > 4 || n0 < 1 || n0 > 4 || p0 < 1 || p0 > 5) return { valid: false, reason: 'Tham số ngoài miền' };
      const N = Math.pow(5, m0) * Math.pow(2, n0) * Math.pow(3, p0);
      if (N > 2500000) return { valid: false, reason: 'N quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m0, n0, p0 } = params;
      const N = Math.pow(5, m0) * Math.pow(2, n0) * Math.pow(3, p0);
      const ans = 2 * m0 + n0 + 2 * p0;
      const shortAns = String(ans);
      return {
        stem: 'Biết $\\log_{5} ' + N + ' = m + n\\log_{5} 2 + p\\log_{5} 3$ với $m, n, p \\in \\mathbb{Z}$. Tính $2m + n + 2p$.',
        shortAnswer: shortAns,
        numericValue: ans,
        answerSummary: shortAns,
        solutionSteps: [
          'Phân tích thừa số nguyên tố: $' + N + ' = 5^{' + m0 + '} \\cdot 2^{' + n0 + '} \\cdot 3^{' + p0 + '}$.',
          'Suy ra $\\log_{5} ' + N + ' = ' + m0 + ' + ' + n0 + '\\log_{5} 2 + ' + p0 + '\\log_{5} 3 \\Rightarrow m = ' + m0 + ',\\; n = ' + n0 + ',\\; p = ' + p0 + '$.',
          'Vậy $2m + n + 2p = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m0 = 1', params: { m0: 1, n0: 3, p0: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (log_5 1215000 -> 21)', params: { m0: 4, n0: 3, p0: 5 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Phân tích phân số log_7(3^n / (7^m · 5^p))
  t11_b19_d30_sa_log_prime_decomp_frac: {
    id: 't11_b19_d30_sa_log_prime_decomp_frac',
    name: 'Phân tích phân số qua log_c(A/B) = m + n·log_c(3) + p·log_c(5) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Cho log_c(3^n0 / (c^e0 · 5^k0)) = m + n log_c 3 + p log_c 5. Tính 2m + 2n - 2p.',
    conditionSummary: 'c ∈ {7, 11}, e0 ∈ [1; 2], n0 ∈ [1; 2], k0 ∈ [1; 3]',
    paramSpecs: [
      { name: 'cIdx', label: 'Cơ số c ∈ {7, 11} (0..1)', min: 0, max: 1 },
      { name: 'e0', label: 'Số mũ của c ở mẫu', min: 1, max: 2 },
      { name: 'n0', label: 'Số mũ của 3 ở tử', min: 1, max: 2 },
      { name: 'k0', label: 'Số mũ của 5 ở mẫu', min: 1, max: 3 },
    ],
    validateCode: `
      const { cIdx, e0, n0, k0 } = params;
      if ((cIdx !== 0 && cIdx !== 1) || e0 < 1 || e0 > 2 || n0 < 1 || n0 > 2 || k0 < 1 || k0 > 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { cIdx, e0, n0, k0 } = params;
      const c = cIdx === 0 ? 7 : 11;
      const num = Math.pow(3, n0);
      const den = Math.pow(c, e0) * Math.pow(5, k0);
      const m = -e0, n = n0, p = -k0;
      const ans = 2 * m + 2 * n - 2 * p;
      const shortAns = String(ans);

      return {
        stem: 'Biết $\\log_{' + c + '} \\dfrac{' + num + '}{' + den + '} = m + n\\log_{' + c + '} 3 + p\\log_{' + c + '} 5$ với $m, n, p \\in \\mathbb{Z}$. Tính $2m + 2n - 2p$.',
        shortAnswer: shortAns,
        numericValue: ans,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $\\dfrac{' + num + '}{' + den + '} = ' + c + '^{-' + e0 + '} \\cdot 3^{' + n0 + '} \\cdot 5^{-' + k0 + '}$.',
          'Suy ra $m = ' + m + ',\\; n = ' + n + ',\\; p = ' + p + ' \\Rightarrow 2m + 2n - 2p = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k0 = 4', params: { cIdx: 0, e0: 1, n0: 1, k0: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (log_7(3/175) -> 4)', params: { cIdx: 0, e0: 1, n0: 1, k0: 2 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Biểu diễn log_5 N = (m + n log 2 + p log q) / (1 - log 2)
  t11_b19_d31_sa_log10_base5_decomp: {
    id: 't11_b19_d31_sa_log10_base5_decomp',
    name: 'Biểu diễn log_5(N) qua log 2 và log q (dạng phân thức mẫu 1 - log 2) (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Cho log_5(5^e0 · 2^e2 · q^eq) = (m + n log 2 + p log q)/(1 - log 2). Tính -3m + n - p.',
    conditionSummary: 'e0 ∈ [1; 3], e2 ∈ [1; 4], eq ∈ [2; 4], q ∈ {3, 7}, N <= 1000000',
    paramSpecs: [
      { name: 'qIdx', label: 'Số nguyên tố q ∈ {7, 3} (0..1)', min: 0, max: 1 },
      { name: 'e0', label: 'Số mũ của 5', min: 1, max: 3 },
      { name: 'e2', label: 'Số mũ của 2', min: 1, max: 4 },
      { name: 'eq', label: 'Số mũ của q', min: 2, max: 4 },
    ],
    validateCode: `
      const { qIdx, e0, e2, eq } = params;
      if ((qIdx !== 0 && qIdx !== 1) || e0 < 1 || e0 > 3 || e2 < 1 || e2 > 4 || eq < 2 || eq > 4) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const q = qIdx === 0 ? 7 : 3;
      const N = Math.pow(5, e0) * Math.pow(2, e2) * Math.pow(q, eq);
      if (N > 1000000) return { valid: false, reason: 'N quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { qIdx, e0, e2, eq } = params;
      const q = qIdx === 0 ? 7 : 3;
      const N = Math.pow(5, e0) * Math.pow(2, e2) * Math.pow(q, eq);
      const rest = Math.pow(2, e2) * Math.pow(q, eq);
      // log_5(N) = e0 + (e2 log 2 + eq log q) / (1 - log 2) = (e0 + (e2 - e0) log 2 + eq log q) / (1 - log 2)
      const m = e0;
      const n = e2 - e0;
      const p = eq;
      const ans = -3 * m + n - p;
      const shortAns = String(ans);

      return {
        stem: 'Biết $\\log_{5} ' + N + ' = \\dfrac{m + n\\log 2 + p\\log ' + q + '}{1 - \\log 2}$ với $m, n, p \\in \\mathbb{Z}$. Tính $-3m + n - p$.',
        shortAnswer: shortAns,
        numericValue: ans,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $' + N + ' = 5^{' + e0 + '} \\cdot ' + rest + ' = 5^{' + e0 + '} \\cdot 2^{' + e2 + '} \\cdot ' + q + '^{' + eq + '}$.',
          '$\\log_{5} ' + N + ' = ' + e0 + ' + \\dfrac{' + e2 + '\\log 2 + ' + eq + '\\log ' + q + '}{1 - \\log 2} = \\dfrac{' + m + (n === 0 ? '' : (n > 0 ? ' + ' + n : ' - ' + Math.abs(n)) + '\\log 2') + ' + ' + p + '\\log ' + q + '}{1 - \\log 2}$.',
          'Suy ra $m = ' + m + ',\\; n = ' + n + ',\\; p = ' + p + ' \\Rightarrow -3m + n - p = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên eq = 1', params: { qIdx: 0, e0: 2, e2: 2, eq: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (log_5 34300 -> -9)', params: { qIdx: 0, e0: 2, e2: 2, eq: 3 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Tích x1·x2...xk từ a^{x1}=a+1, ..., (N-1)^{xk}=N
  t11_b19_d32_sa_log_chain_product: {
    id: 't11_b19_d32_sa_log_chain_product',
    name: 'Tính tích dãy số mũ liên hoàn bằng công thức nhân lôgarit (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Cho a^{x1} = a+1, ..., (N-1)^{xk} = N. Tính x1·x2...xk = log_a N làm tròn hàng phần mười.',
    conditionSummary: 'a ∈ [5; 15], N ∈ [80; 320], tránh .x5',
    paramSpecs: [
      { name: 'a', label: 'Cơ số đầu a', min: 5, max: 15 },
      { name: 'N', label: 'Số cuối N', min: 80, max: 320 },
    ],
    validateCode: `
      const { a, N } = params;
      if (a < 5 || a > 15 || N < 80 || N > 320 || N <= a + 20) return { valid: false, reason: 'Tham số ngoài miền' };
      const val = Math.log(N) / Math.log(a);
      const frac10 = (val * 10) % 1;
      if (Math.abs(frac10 - 0.5) < 0.03) return { valid: false, reason: 'Tránh biên làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, N } = params;
      const count = N - a;
      const val = Math.log(N) / Math.log(a);
      const rounded = Math.round(val * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Cho $' + a + '^{x_1} = ' + (a + 1) + ',\\; ' + (a + 1) + '^{x_2} = ' + (a + 2) + ',\\; \\dots,\\; ' + (N - 1) + '^{x_{' + count + '}} = ' + N + '$. Tính $x_1 \\cdot x_2 \\cdots x_{' + count + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $x_1 = \\log_{' + a + '} ' + (a + 1) + ',\\; x_2 = \\log_{' + (a + 1) + '} ' + (a + 2) + ',\\; \\dots,\\; x_{' + count + '} = \\log_{' + (N - 1) + '} ' + N + '$.',
          'Áp dụng công thức nối cơ số: $x_1 \\cdot x_2 \\cdots x_{' + count + '} = \\log_{' + a + '} ' + N + ' \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 4', params: { a: 4, N: 229 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (12..229 -> 2,2)', params: { a: 12, N: 229 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Tổng log_b(m1/(m1+1)) + ... + log_b((m2-1)/m2)
  t11_b19_d33_sa_log_telescoping_sum: {
    id: 't11_b19_d33_sa_log_telescoping_sum',
    name: 'Tính tổng lôgarit dạng phân số rút gọn dây chuyền (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Tính tổng log_b(m1/(m1+1)) + ... + log_b((m2-1)/m2) = log_b(m1/m2) làm tròn hàng phần mười.',
    conditionSummary: 'b ∈ [2; 5], m1 ∈ [5; 25], m2 ∈ [150; 650], tránh .x5',
    paramSpecs: [
      { name: 'b', label: 'Cơ số lôgarit b', min: 2, max: 5 },
      { name: 'm1', label: 'Tử số đầu m1', min: 5, max: 25 },
      { name: 'm2', label: 'Mẫu số cuối m2', min: 150, max: 650 },
    ],
    validateCode: `
      const { b, m1, m2 } = params;
      if (b < 2 || b > 5 || m1 < 5 || m2 < 150 || m2 <= m1 + 20) return { valid: false, reason: 'Tham số ngoài miền' };
      const val = Math.log(m1 / m2) / Math.log(b);
      const frac10 = Math.abs(val * 10) % 1;
      if (Math.abs(frac10 - 0.5) < 0.03) return { valid: false, reason: 'Tránh biên làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, m1, m2 } = params;
      const val = Math.log(m1 / m2) / Math.log(b);
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tính tổng $P = \\log_{' + b + '} \\dfrac{' + m1 + '}{' + (m1 + 1) + '} + \\log_{' + b + '} \\dfrac{' + (m1 + 1) + '}{' + (m1 + 2) + '} + \\dots + \\log_{' + b + '} \\dfrac{' + (m2 - 1) + '}{' + m2 + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          '$P = \\log_{' + b + '} \\left(\\dfrac{' + m1 + '}{' + (m1 + 1) + '} \\cdot \\dfrac{' + (m1 + 1) + '}{' + (m1 + 2) + '} \\cdots \\dfrac{' + (m2 - 1) + '}{' + m2 + '}\\right) = \\log_{' + b + '} \\dfrac{' + m1 + '}{' + m2 + '} \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1, m1: 17, m2: 559 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (log_3(17/559) ≈ -3,2)', params: { b: 3, m1: 17, m2: 559 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Tổng S = c0 + log_{root[k1](b)} b + ... + log_{root[k2](b)} b, tính S/D
  t11_b19_d34_sa_log_root_base_ap_sum: {
    id: 't11_b19_d34_sa_log_root_base_ap_sum',
    name: 'Tính tổng dãy log_{ⁿ√b}(b) quy về cấp số cộng (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Lôgarit',
    description: 'Cho S = c0 + sum_{n=k1}^{k2} log_{root[n](b)} b. Tính S/D làm tròn đến hàng phần mười.',
    conditionSummary: 'b ∈ {2, 3, 5, 7}, c0 ∈ [3; 12], k1 ∈ [3; 8], k2 ∈ [600; 2000], D ∈ [120000; 260000], tránh .x5',
    paramSpecs: [
      { name: 'bIdx', label: 'Cơ số b ∈ {2, 3, 5, 7} (0..3)', min: 0, max: 3 },
      { name: 'c0', label: 'Số hạng cộng đầu c0', min: 3, max: 12 },
      { name: 'k1', label: 'Bậc căn bắt đầu k1', min: 3, max: 8 },
      { name: 'k2', label: 'Bậc căn kết thúc k2', min: 600, max: 2000 },
      { name: 'D', label: 'Số chia D', min: 120000, max: 260000, step: 17 },
    ],
    validateCode: `
      const { bIdx, c0, k1, k2, D } = params;
      if (bIdx < 0 || bIdx > 3 || c0 < 3 || k1 < 3 || k2 < 600 || D < 10000) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const S = c0 + ((k2 - k1 + 1) * (k1 + k2)) / 2;
      const val = S / D;
      const frac10 = (val * 10) % 1;
      if (Math.abs(frac10 - 0.5) < 0.03) return { valid: false, reason: 'Tránh biên làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, c0, k1, k2, D } = params;
      const b = [2, 3, 5, 7][bIdx];
      const count = k2 - k1 + 1;
      const S = c0 + (count * (k1 + k2)) / 2;
      const val = S / D;
      const rounded = Math.round(val * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Cho $S = ' + c0 + ' + \\log_{\\sqrt[' + k1 + ']{' + b + '}} ' + b + ' + \\log_{\\sqrt[' + (k1 + 1) + ']{' + b + '}} ' + b + ' + \\log_{\\sqrt[' + (k1 + 2) + ']{' + b + '}} ' + b + ' + \\dots + \\log_{\\sqrt[' + k2 + ']{' + b + '}} ' + b + '$. Tính $\\dfrac{S}{' + D + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Vì $\\log_{\\sqrt[n]{' + b + '}} ' + b + ' = n$ nên $S = ' + c0 + ' + (' + k1 + ' + ' + (k1 + 1) + ' + \\dots + ' + k2 + ') = ' + c0 + ' + \\dfrac{' + count + ' \\cdot (' + k1 + ' + ' + k2 + ')}{2} = ' + S + '$.',
          'Do đó $\\dfrac{S}{' + D + '} = \\dfrac{' + S + '}{' + D + '} \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên D quá nhỏ', params: { bIdx: 3, c0: 6, k1: 5, k2: 1728, D: 100 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (k1=5, k2=1728, D=194879 -> 7,7)', params: { bIdx: 3, c0: 6, k1: 5, k2: 1728, D: 194879 }, expectedValid: true },
    ],
  },
};
