import { MathTemplate } from '../types/math';

export const G11_B5_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Ba số hạng đầu của dãy số u_n = an + b
  t11_b5_d01_first3_linear_mc: {
    id: 't11_b5_d01_first3_linear_mc',
    name: 'Tìm ba số hạng đầu tiên của dãy số bậc nhất u_n = an + b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Dãy số và cách cho dãy số',
    description: 'Cho số hạng tổng quát u_n = an + b. Tính ba số hạng đầu tiên u_1, u_2, u_3.',
    conditionSummary: 'a ∈ [-9; 9] \\ {0}, b ∈ [-12; 12]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -12, max: 12 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a === 0 || a < -9 || a > 9 || b < -12 || b > 12) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const u1 = a + b;
      const u2 = 2 * a + b;
      const u3 = 3 * a + b;
      const expr = b === 0 ? u.formatLinear(a, 0, 'n') : (b > 0 && a < 0 ? b + ' - ' + (Math.abs(a) === 1 ? 'n' : Math.abs(a) + 'n') : u.formatLinear(a, b, 'n'));
      const fmt3 = (x1, x2, x3) => '$u_1 = ' + x1 + ',\\; u_2 = ' + x2 + ',\\; u_3 = ' + x3 + '$';
      const correct = fmt3(u1, u2, u3);
      const wList = [
        fmt3(u1 + 2, u2 - 2, u3),
        fmt3(u1 + 1, u2 - 2, u3 + Math.abs(a) * 4),
        fmt3(u1, -u2, u3),
        fmt3(b, u1, u2),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => fmt3(u1 + j, u2 + j, u3)
      );
      return {
        stem: 'Cho dãy số $(u_n)$ có $u_n = ' + expr + '$. Ba số hạng đầu tiên của dãy số đã cho là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thay lần lượt $n = 1, 2, 3$ vào công thức $u_n = ' + expr + '$:',
          '$u_1 = ' + u1 + '$, $u_2 = ' + u2 + '$, $u_3 = ' + u3 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (u_n = 5 - 5n)', params: { a: -5, b: 5 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Ba số hạng đầu của dãy phân thức bậc nhất u_n = (an + b)/(cn + d)
  t11_b5_d02_first3_rational_linear_mc: {
    id: 't11_b5_d02_first3_rational_linear_mc',
    name: 'Tìm ba số hạng đầu tiên của dãy số u_n = (an + b)/(cn + d)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Dãy số và cách cho dãy số',
    description: 'Cho dãy số u_n = (an + b)/(cn + d). Tính u_1, u_2, u_3 dưới dạng phân số tối giản.',
    conditionSummary: 'a ∈ [-6; 6] \\ {0}, b ∈ [-8; 8], c ∈ [1; 4], d ∈ [1; 6], ad - bc ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -8, max: 8 },
      { name: 'c', label: 'Hệ số mẫu c', min: 1, max: 4 },
      { name: 'd', label: 'Hằng số mẫu d', min: 1, max: 6 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || a < -6 || a > 6 || b < -8 || b > 8 || c < 1 || c > 4 || d < 1 || d > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (a * d - b * c === 0) return { valid: false, reason: 'Dãy hằng không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const f1 = u.simplifyFrac(a + b, c + d);
      const f2 = u.simplifyFrac(2 * a + b, 2 * c + d);
      const f3 = u.simplifyFrac(3 * a + b, 3 * c + d);
      const fmt3 = (x1, x2, x3) => '$u_1 = ' + x1.latex + ',\\; u_2 = ' + x2.latex + ',\\; u_3 = ' + x3.latex + '$';
      const correct = fmt3(f1, f2, f3);
      const wList = [
        fmt3(u.simplifyFrac(-(a + b), c + d), u.simplifyFrac(2 * a + b + 5, 2 * c + d), u.simplifyFrac(3 * a + b - 6, 3 * c + d)),
        fmt3(u.simplifyFrac(a + b + 1, c + d), u.simplifyFrac(2 * a + b - 1, 2 * c + d), u.simplifyFrac(3 * a + b + 2, 3 * c + d)),
        fmt3(u.simplifyFrac(a + b - 2, c + d), u.simplifyFrac(2 * a + b + 2, 2 * c + d), u.simplifyFrac(-(3 * a + b), 3 * c + d)),
        fmt3(f2, f1, f3),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => fmt3(u.simplifyFrac(a + b + j, c + d), f2, f3)
      );
      const numStr = u.formatLinear(a, b, 'n');
      const denStr = u.formatLinear(c, d, 'n');
      return {
        stem: 'Cho dãy số $(u_n)$ có $u_n = \\frac{' + numStr + '}{' + denStr + '}$. Ba số hạng đầu tiên của dãy số đã cho là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thay $n = 1, 2, 3$ vào công thức $u_n = \\frac{' + numStr + '}{' + denStr + '}$:',
          '$u_1 = ' + f1.latex + '$, $u_2 = ' + f2.latex + '$, $u_3 = ' + f3.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ad - bc = 0 (dãy hằng)', params: { a: 2, b: 6, c: 1, d: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (u_n = (-3n - 2)/(n + 3))', params: { a: -3, b: -2, c: 1, d: 3 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Ba số hạng đầu của dãy phân thức tử bậc hai
  t11_b5_d03_first3_rational_quad_mc: {
    id: 't11_b5_d03_first3_rational_quad_mc',
    name: 'Tìm ba số hạng đầu tiên của dãy phân thức tử bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Dãy số và cách cho dãy số',
    description: 'Cho u_n = (an² + bn + c)/(pn + q). Tính u_1, u_2, u_3.',
    conditionSummary: 'a ∈ [-3; 3] \\ {0}, b, c ∈ [-5; 5], p ∈ [1; 4], q ∈ [-3; 6], p + q ≥ 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 3, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -5, max: 5 },
      { name: 'c', label: 'Hằng số c', min: -5, max: 5 },
      { name: 'p', label: 'Hệ số mẫu p', min: 1, max: 4 },
      { name: 'q', label: 'Hằng số mẫu q', min: -3, max: 6 },
    ],
    validateCode: `
      const { a, b, c, p, q } = params;
      if (a === 0 || a < -3 || a > 3 || b < -5 || b > 5 || c < -5 || c > 5) return { valid: false, reason: 'Hệ số tử ngoài miền' };
      if (p < 1 || p > 4 || q < -3 || q > 6 || p + q < 1) return { valid: false, reason: 'Mẫu số phải dương với mọi n >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, p, q } = params;
      const calc = (n) => u.simplifyFrac(a * n * n + b * n + c, p * n + q);
      const f1 = calc(1);
      const f2 = calc(2);
      const f3 = calc(3);
      const fmt3 = (x1, x2, x3) => '$u_1 = ' + x1.latex + ',\\; u_2 = ' + x2.latex + ',\\; u_3 = ' + x3.latex + '$';
      const correct = fmt3(f1, f2, f3);
      const wList = [
        fmt3(u.simplifyFrac(-(a + b + c), p + q), u.simplifyFrac(4 * a + 2 * b + c + 3, 2 * p + q), u.simplifyFrac(9 * a + 3 * b + c - 5, 3 * p + q)),
        fmt3(u.simplifyFrac(a + b + c + 1, p + q), u.simplifyFrac(4 * a + 2 * b + c - 6, 2 * p + q), f3),
        fmt3(u.simplifyFrac(-(a + b + c) + 1, p + q), u.simplifyFrac(4 * a + 2 * b + c - 3, 2 * p + q), u.simplifyFrac(-(9 * a + 3 * b + c) + 10, 3 * p + q)),
        fmt3(f1, f3, f2),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => fmt3(u.simplifyFrac(a + b + c + j, p + q), f2, f3)
      );
      const numStr = u.formatQuadratic(a, b, c, 'n');
      const denStr = u.formatLinear(p, q, 'n');
      return {
        stem: 'Cho dãy số $(u_n)$ có $u_n = \\frac{' + numStr + '}{' + denStr + '}$. Ba số hạng đầu tiên của dãy số đã cho là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thay $n = 1, 2, 3$ vào $u_n = \\frac{' + numStr + '}{' + denStr + '}$:',
          '$u_1 = ' + f1.latex + '$, $u_2 = ' + f2.latex + '$, $u_3 = ' + f3.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p + q = 0 (chia cho 0 tại n = 1)', params: { a: -1, b: -3, c: -1, p: 2, q: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (u_n = (-n^2 - 3n - 1)/(2n - 1))', params: { a: -1, b: -3, c: -1, p: 2, q: -1 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Đếm số hạng dương/âm trong N số hạng đầu của u_n = (-p/q)^n
  t11_b5_d04_count_pos_neg_power_mc: {
    id: 't11_b5_d04_count_pos_neg_power_mc',
    name: 'Đếm số hạng dương/âm trong N số hạng đầu của u_n = (-p/q)^n',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Dãy số và cách cho dãy số',
    description: 'Cho dãy số u_n = (-p/q)^n. Đếm số lượng số hạng dương hoặc âm trong N số hạng đầu tiên.',
    conditionSummary: '1 ≤ p < q ≤ 9, gcd(p, q) = 1, N ∈ [7; 19]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 7 },
      { name: 'q', label: 'Mẫu số q', min: 2, max: 9 },
      { name: 'N', label: 'Số hạng xét N', min: 7, max: 19 },
      { name: 'mode', label: 'Yêu cầu (0: dương, 1: âm)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p, q, N, mode } = params;
      if (p < 1 || q < 2 || p >= q || q > 9 || N < 7 || N > 19) return { valid: false, reason: 'Tham số ngoài miền' };
      if (u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q chưa tối giản' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode thuộc {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, N, mode } = params;
      const posCount = Math.floor(N / 2);
      const negCount = Math.ceil(N / 2);
      const ans = mode === 0 ? posCount : negCount;
      const signLabel = mode === 0 ? 'dương' : 'âm';
      const parityText = mode === 0 ? '$n$ chẵn' : '$n$ lẻ';
      const correct = '$' + ans + '$';
      const wList = [
        '$' + (ans + 1) + '$',
        '$' + Math.max(1, ans - 1) + '$',
        '$' + (ans + 2) + '$',
        '$' + Math.max(1, ans - 2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + (ans + j + 2) + '$'
      );
      return {
        stem: 'Cho dãy số $(u_n)$ xác định bởi $u_n = \\left(-\\frac{' + p + '}{' + q + '}\\right)^n$. Có bao nhiêu số ' + signLabel + ' trong $' + N + '$ số hạng đầu tiên của dãy số đó?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $u_n = \\left(-\\frac{' + p + '}{' + q + '}\\right)^n ' + (mode === 0 ? '> 0' : '< 0') + '$ khi và chỉ khi ' + parityText + '.',
          'Trong $' + N + '$ số hạng đầu tiên (ứng với $n \\in \\{1; 2; \\ldots; ' + N + '\\}$) có đúng $' + ans + '$ chỉ số ' + (mode === 0 ? 'chẵn' : 'lẻ') + ' nên có $' + ans + '$ số hạng ' + signLabel + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p/q chưa tối giản', params: { p: 2, q: 4, N: 10, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (u_n = (-3/7)^n, 10 số hạng -> 5 dương)', params: { p: 3, q: 7, N: 10, mode: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Biểu diễn số hạng dịch chỉ số u_{n+k} của dãy u_n = a^n
  t11_b5_d05_shifted_index_exp_mc: {
    id: 't11_b5_d05_shifted_index_exp_mc',
    name: 'Xác định công thức số hạng dịch chỉ số u_{n+k} của dãy u_n = a^n',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Dãy số và cách cho dãy số',
    description: 'Cho u_n = a^n. Xác định biểu thức đúng của u_{n+k}.',
    conditionSummary: 'a ∈ [2; 9], k ∈ [2; 7]',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 9 },
      { name: 'k', label: 'Độ dịch chỉ số k', min: 2, max: 7 },
    ],
    validateCode: `
      const { a, k } = params;
      if (a < 2 || a > 9 || k < 2 || k > 7) return { valid: false, reason: 'a thuộc [2; 9], k thuộc [2; 7]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k } = params;
      const lhs = 'u_{n+' + k + '}';
      const correct = '$' + lhs + ' = ' + a + '^{n+' + k + '}$';
      const wList = [
        '$' + lhs + ' = ' + k + ' \\cdot ' + a + '^n$',
        '$' + lhs + ' = ' + a + '^n + ' + k + '$',
        '$' + lhs + ' = ' + a + '^' + k + '$',
        '$' + lhs + ' = ' + (a + 1) + '^{n+' + k + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + lhs + ' = ' + a + '^{n+' + (k + j + 1) + '}$'
      );
      return {
        stem: 'Cho dãy số $(u_n)$ biết $u_n = ' + a + '^n$. Mệnh đề nào sau đây là mệnh đề đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo định nghĩa của dãy số, thay $n$ bởi $n + ' + k + '$ vào công thức $u_n = ' + a + '^n$ ta được $' + lhs + ' = ' + a + '^{n+' + k + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (u_n = 2^n, tìm u_{n+4})', params: { a: 2, k: 4 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Tìm số thứ tự n biết giá trị u_n của dãy u_n = an + b
  t11_b5_d06_find_index_linear_mc: {
    id: 't11_b5_d06_find_index_linear_mc',
    name: 'Tìm vị trí số hạng trong dãy bậc nhất u_n = an + b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Dãy số và cách cho dãy số',
    description: 'Cho u_n = an + b và một giá trị thuộc dãy. Hỏi giá trị đó là số hạng thứ mấy.',
    conditionSummary: 'a ∈ [-8; 8] \\ {0}, b ∈ [-15; 15], k ∈ [12; 85]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -15, max: 15 },
      { name: 'k', label: 'Chỉ số đáp án k', min: 12, max: 85 },
    ],
    validateCode: `
      const { a, b, k } = params;
      if (a === 0 || a < -8 || a > 8 || b < -15 || b > 15 || k < 12 || k > 85) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k } = params;
      const val = a * k + b;
      const expr = u.formatLinear(a, b, 'n');
      const correct = '$u_{' + k + '}$';
      const wList = [
        '$u_{' + (k - 1) + '}$',
        '$u_{' + (k - 2) + '}$',
        '$u_{' + (k + 7) + '}$',
        '$u_{' + (k + 1) + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$u_{' + (k + j + 2) + '}$'
      );
      return {
        stem: 'Cho dãy số $(u_n)$ có $u_n = ' + expr + '$. Số $' + val + '$ là số hạng thứ mấy của dãy số đã cho?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Giải phương trình $' + expr + ' = ' + val + ' \\Leftrightarrow n = ' + k + '$.',
          'Vậy số $' + val + '$ là số hạng thứ $' + k + '$ ($u_{' + k + '}$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 3, k: 53 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (u_n = 3n + 3, val = 162 -> u_53)', params: { a: 3, b: 3, k: 53 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Tìm số thứ tự n biết giá trị u_n của dãy phân thức u_n = (an + b)/(cn + d)
  t11_b5_d07_find_index_rational_mc: {
    id: 't11_b5_d07_find_index_rational_mc',
    name: 'Tìm vị trí số hạng trong dãy phân thức u_n = (an + b)/(cn + d)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Dãy số và cách cho dãy số',
    description: 'Cho dãy số u_n = (an + b)/(cn + d) và một phân số thuộc dãy. Xác định chỉ số của số hạng đó.',
    conditionSummary: 'a ∈ [-7; 7] \\ {0}, b ∈ [-10; 10], c ∈ [1; 3], d ∈ [1; 8], ad - bc ≠ 0, k ∈ [15; 130]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -10, max: 10 },
      { name: 'c', label: 'Hệ số mẫu c', min: 1, max: 3 },
      { name: 'd', label: 'Hằng số mẫu d', min: 1, max: 8 },
      { name: 'k', label: 'Chỉ số đáp án k', min: 15, max: 130 },
    ],
    validateCode: `
      const { a, b, c, d, k } = params;
      if (a === 0 || a < -7 || a > 7 || b < -10 || b > 10 || c < 1 || c > 3 || d < 1 || d > 8 || k < 15 || k > 130) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (a * d - b * c === 0) return { valid: false, reason: 'Dãy hằng không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, k } = params;
      const val = u.simplifyFrac(a * k + b, c * k + d);
      const expr = '\\frac{' + u.formatLinear(a, b, 'n') + '}{' + u.formatLinear(c, d, 'n') + '}';
      const correct = '$u_{' + k + '}$';
      const wList = [
        '$u_{' + (k + 1) + '}$',
        '$u_{' + (k - 2) + '}$',
        '$u_{' + (k + 5) + '}$',
        '$u_{' + (k - 1) + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$u_{' + (k + j + 2) + '}$'
      );
      return {
        stem: 'Cho dãy số $(u_n)$ có $u_n = ' + expr + '$. Số $' + val.latex + '$ là số hạng thứ mấy của dãy số đã cho?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Giải phương trình $' + expr + ' = ' + val.latex + '$.',
          'Quy đồng và rút gọn thu được $n = ' + k + '$. Vậy số đã cho là số hạng thứ $' + k + '$ ($u_{' + k + '}$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ad - bc = 0', params: { a: 2, b: 6, c: 1, d: 3, k: 20 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (u_n = (-5n + 2)/(n + 3), val = -34/7 -> u_116)', params: { a: -5, b: 2, c: 1, d: 3, k: 116 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Công thức tổng quát của dãy truy hồi cộng u_1, u_{n+1} = u_n + d
  t11_b5_d08_arith_recurrence_formula_mc: {
    id: 't11_b5_d08_arith_recurrence_formula_mc',
    name: 'Tìm công thức tổng quát từ hệ thức truy hồi u_{n+1} = u_n + d',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Cho dãy số xác định bởi u_1 và u_{n+1} = u_n + d (∀ n ≥ 1). Tìm công thức số hạng tổng quát u_n.',
    conditionSummary: 'u1 ∈ [-12; 12], d ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -12, max: 12 },
      { name: 'd', label: 'Công sai d', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { u1, d } = params;
      if (d === 0 || d < -9 || d > 9 || u1 < -12 || u1 > 12) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d } = params;
      const c = u1 - d;
      const correct = '$u_n = ' + u.formatLinear(d, c, 'n') + '$';
      const wList = [
        '$u_n = ' + u.formatLinear(d, c + d, 'n') + '$',
        '$u_n = ' + u.formatLinear(-d, c, 'n') + '$',
        '$u_n = ' + u.formatLinear(d, c - d, 'n') + '$',
        '$u_n = ' + u.formatLinear(d, u1, 'n') + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$u_n = ' + u.formatLinear(d, c + (j + 2) * d, 'n') + '$'
      );
      const rec = 'u_{n+1} = u_n' + u.formatTrailingConst(d);
      return {
        stem: 'Cho dãy số $(u_n)$ xác định bởi $\\left\\{\\begin{array}{l} u_1 = ' + u1 + ' \\\\ ' + rec + ',\\; \\forall n \\ge 1 \\end{array}\\right.$. Mệnh đề nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dãy $(u_n)$ là cấp số cộng với số hạng đầu $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$.',
          'Do đó $u_n = u_1 + (n - 1)d = ' + u.formatLinear(d, c, 'n') + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: -5, d: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (u1 = -5, d = -5 -> u_n = -5n)', params: { u1: -5, d: -5 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Công thức tổng quát của dãy truy hồi tuyến tính u_{n+1} = q·u_n + b
  t11_b5_d09_linear_recurrence_q2_mc: {
    id: 't11_b5_d09_linear_recurrence_q2_mc',
    name: 'Tìm công thức tổng quát của dãy truy hồi u_{n+1} = q·u_n + b',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Giải hệ thức truy hồi u_{n+1} = q·u_n + b bằng phương pháp đặt dãy phụ cấp số nhân.',
    conditionSummary: 'q ∈ [2; 5], x0 ∈ [-6; 6] \\ {0}, v1 ∈ [-6; 6] \\ {0}',
    paramSpecs: [
      { name: 'q', label: 'Hệ số nhân q', min: 2, max: 5 },
      { name: 'x0', label: 'Nghiệm đặc trưng x0', min: -6, max: 6, allowZero: false },
      { name: 'v1', label: 'Số hạng đầu v1 = u1 - x0', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { q, x0, v1 } = params;
      if (q < 2 || q > 5 || x0 === 0 || v1 === 0 || x0 < -6 || x0 > 6 || v1 < -6 || v1 > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, x0, v1 } = params;
      const b = (1 - q) * x0;
      const u1 = x0 + v1;
      const fmtFormula = (leadConst, coefV, base) => {
        const vTerm = coefV >= 0 ? ' + ' + coefV + ' \\cdot ' + base + '^{n-1}' : ' - ' + Math.abs(coefV) + ' \\cdot ' + base + '^{n-1}';
        return '$u_n = ' + leadConst + vTerm + '$';
      };
      const correct = fmtFormula(x0, v1, q);
      const wList = [
        fmtFormula(u1, -v1, q),
        fmtFormula(x0, v1, q + 1),
        fmtFormula(-x0, v1, q),
        fmtFormula(x0, -v1, q),
        fmtFormula(x0, v1 + 1, q),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => fmtFormula(x0 + j, v1, q)
      );
      const recStr = 'u_{n+1} = ' + q + 'u_n' + u.formatTrailingConst(b);
      return {
        stem: 'Cho dãy số $(u_n)$ xác định bởi $u_1 = ' + u1 + ',\\; ' + recStr + ',\\; \\forall n \\ge 1$. Mệnh đề nào sau đây là mệnh đề đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Giải phương trình đặc trưng $x = ' + q + 'x' + u.formatTrailingConst(b) + ' \\Rightarrow x = ' + x0 + '$.',
          'Đặt $v_n = u_n - (' + x0 + ')$, khi đó $v_{n+1} = ' + q + 'v_n$ với $v_1 = u_1 - (' + x0 + ') = ' + v1 + '$.',
          'Suy ra $v_n = ' + v1 + ' \\cdot ' + q + '^{n-1}$, nên ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v1 = 0 (dãy hằng)', params: { q: 2, x0: -1, v1: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (u1=-2, u_{n+1}=2u_n+1 -> -1 - 1*2^{n-1})', params: { q: 2, x0: -1, v1: -1 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Tìm số hạng u_k của dãy tuần hoàn u_{n+1} = -u_n + b
  t11_b5_d10_periodic_recurrence_term_mc: {
    id: 't11_b5_d10_periodic_recurrence_term_mc',
    name: 'Tìm số hạng u_k của dãy truy hồi u_{n+1} = -u_n + b',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Cho u_1 và hệ thức truy hồi u_{n+1} = -u_n + b. Tính số hạng u_k.',
    conditionSummary: 'u1 ∈ [-9; 9], b ∈ [-9; 9] \\ {0}, 2u1 ≠ b, k ∈ [4; 9]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -9, max: 9 },
      { name: 'b', label: 'Hằng số b', min: -9, max: 9, allowZero: false },
      { name: 'k', label: 'Chỉ số cần tìm k', min: 4, max: 9 },
    ],
    validateCode: `
      const { u1, b, k } = params;
      if (b === 0 || u1 < -9 || u1 > 9 || b < -9 || b > 9 || k < 4 || k > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (2 * u1 === b) return { valid: false, reason: 'Dãy hằng không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, b, k } = params;
      const seq = [u1];
      for (let i = 1; i < k; i++) {
        seq.push(-seq[i - 1] + b);
      }
      const ans = seq[k - 1];
      const altVal = seq[1];
      const correct = '$' + ans + '$';
      const wList = [
        '$' + altVal + '$',
        '$' + (ans + 26) + '$',
        '$' + (ans + 35) + '$',
        '$' + (ans + 42) + '$',
        '$' + (-ans) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + (ans + j * 3 + 7) + '$'
      );
      const recStr = 'u_{n+1} = -u_n' + u.formatTrailingConst(b);
      return {
        stem: 'Cho dãy số $(u_n)$ thỏa mãn $\\left\\{\\begin{array}{l} u_1 = ' + u1 + ' \\\\ ' + recStr + ' \\end{array}\\right.$. Tìm $u_{' + k + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tính lần lượt các số hạng: ' + seq.map((v, i) => '$u_{' + (i + 1) + '} = ' + v + '$').join(', ') + '.',
          'Vậy $u_{' + k + '} = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 2u1 = b (dãy hằng)', params: { u1: 3, b: 6, k: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (u1=3, u_{n+1}=-u_n-3, u_5 -> 3)', params: { u1: 3, b: -3, k: 5 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Nhận biết số thuộc dãy truy hồi bậc hai u_n = p·u_{n-1} + q·u_{n-2} + r
  t11_b5_d11_order2_recurrence_belongs_mc: {
    id: 't11_b5_d11_order2_recurrence_belongs_mc',
    name: 'Xác định số hạng thuộc dãy truy hồi bậc hai u_n = p·u_{n-1} + q·u_{n-2} + r',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Cho u_1, u_2 và công thức truy hồi bậc hai. Tìm số thuộc dãy số đã cho trong 4 phương án.',
    conditionSummary: 'u1, u2 ∈ [-4; 6], p ∈ [1; 4], q ∈ [1; 3], r ∈ [-6; 6], p·u2 + q·u1 + r > u2',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng u1', min: -3, max: 5 },
      { name: 'u2', label: 'Số hạng u2', min: -2, max: 6 },
      { name: 'p', label: 'Hệ số p', min: 1, max: 4 },
      { name: 'q', label: 'Hệ số q', min: 1, max: 3 },
      { name: 'r', label: 'Hằng số r', min: -6, max: 6 },
    ],
    validateCode: `
      const { u1, u2, p, q, r } = params;
      if (u1 < -3 || u1 > 5 || u2 < -2 || u2 > 6 || p < 1 || p > 4 || q < 1 || q > 3 || r < -6 || r > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const u3 = p * u2 + q * u1 + r;
      if (u3 <= u2 || u3 <= u1 || u2 <= u1 || u3 > 200) {
        return { valid: false, reason: 'Cần dãy tăng thực sự tại các số hạng đầu để loại trừ nhiễu duy nhất' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, p, q, r } = params;
      const seq = [u1, u2];
      for (let i = 2; i < 8; i++) {
        seq.push(p * seq[i - 1] + q * seq[i - 2] + r);
      }
      const u3 = seq[2];
      const seqSet = new Set(seq);
      const correct = '$' + u3 + '$';
      const candidates = [u3 - 1, u3 - 2, u3 - 3, u3 + 1, u3 + 2, u3 - 6, u3 + 3, u3 - 4];
      const distractors = candidates
        .filter((v) => !seqSet.has(v))
        .map((v) => '$' + v + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (j) => {
          let v = u3 + j + 4;
          while (seqSet.has(v)) v++;
          return '$' + v + '$';
        }
      );
      const recRhs = u.formatTerm(p, 'u_{n-1}', true) + u.formatTerm(q, 'u_{n-2}', false) + u.formatTrailingConst(r);
      return {
        stem: 'Cho dãy số $(u_n)$ xác định bởi $u_1 = ' + u1 + ',\\; u_2 = ' + u2 + '$ và $u_n = ' + recRhs + '$ với mọi $n \\ge 3$. Số nào sau đây thuộc dãy số đã cho?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tính $u_3 = ' + p + ' \\cdot (' + u2 + ') + ' + q + ' \\cdot (' + u1 + ')' + u.formatTrailingConst(r) + ' = ' + u3 + '$.',
          'Do $u_1 < u_2 < u_3 < u_4 < \\cdots$ nên trong các phương án chỉ có $' + u3 + '$ thuộc dãy số đã cho.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 >= u2', params: { u1: 4, u2: 2, p: 3, q: 2, r: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (u1=1, u2=2, u_n=3u_{n-1}+2u_{n-2}-3 -> 5)', params: { u1: 1, u2: 2, p: 3, q: 2, r: -3 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Tính đơn điệu của dãy phân thức u_n = (an + b)/(n + c)
  t11_b5_d12_monotone_bounded_rational_mc: {
    id: 't11_b5_d12_monotone_bounded_rational_mc',
    name: 'Xét tính tăng, giảm của dãy phân thức u_n = (an + b)/(n + c)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Dãy số tăng, dãy số giảm và dãy số bị chặn',
    description: 'Cho dãy số u_n = (an + b)/(n + c). Xác định tính tăng/giảm và bị chặn của dãy số.',
    conditionSummary: 'a ∈ [-5; 5] \\ {0}, b ∈ [-8; 8], c ∈ [1; 8], b - ac ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -8, max: 8 },
      { name: 'c', label: 'Hằng số mẫu c', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || a < -5 || a > 5 || b < -8 || b > 8 || c < 1 || c > 8) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (b - a * c === 0) return { valid: false, reason: 'Dãy hằng không tăng không giảm' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const rem = b - a * c; // u_n = a + rem / (n + c)
      const isDecreasing = rem > 0;
      const correct = isDecreasing ? '$(u_n)$ là dãy số giảm' : '$(u_n)$ là dãy số tăng';
      const wrongSame = isDecreasing ? '$(u_n)$ là dãy số tăng' : '$(u_n)$ là dãy số giảm';
      const wList = [
        '$(u_n)$ là dãy số không bị chặn',
        wrongSame + ' và bị chặn dưới',
        wrongSame + ' và bị chặn',
        '$(u_n)$ là dãy số không tăng, không giảm',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$(u_n)$ không bị chặn trên (phương án ' + j + ')'
      );
      const expr = '\\frac{' + u.formatLinear(a, b, 'n') + '}{n + ' + c + '}';
      const remTerm = rem > 0 ? ' + \\frac{' + rem + '}{n + ' + c + '}' : ' - \\frac{' + Math.abs(rem) + '}{n + ' + c + '}';
      const cmp = isDecreasing ? '< 0' : '> 0';
      return {
        stem: 'Cho dãy số $(u_n)$ xác định bởi $u_n = ' + expr + ',\\; \\forall n \\ge 1$. Mệnh đề nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta viết lại $u_n = ' + a + remTerm + '$.',
          'Xét hiệu $u_{n+1} - u_n = \\frac{' + (-rem) + '}{(n + ' + c + ')(n + ' + (c + 1) + ')} ' + cmp + ',\\; \\forall n \\ge 1$, nên ' + correct + ' (và bị chặn).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b - ac = 0 (dãy hằng)', params: { a: -1, b: -4, c: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (u_n = -n/(n + 4) -> giảm)', params: { a: -1, b: 0, c: 4 }, expectedValid: true },
    ],
  },
};
