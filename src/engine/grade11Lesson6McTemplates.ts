import { MathTemplate } from '../types/math';

export const G11_B6_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tìm số hạng thứ n của cấp số cộng biết u_1 và d
  t11_b6_d01_nth_term_mc: {
    id: 't11_b6_d01_nth_term_mc',
    name: 'Tìm số hạng thứ n của cấp số cộng biết u_1 và công sai d',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho u_1 và công sai d. Tính số hạng thứ n của cấp số cộng.',
    conditionSummary: 'u1 ∈ [-15; 15], d ∈ [-10; 10] \\ {0}, n ∈ [8; 30]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -15, max: 15 },
      { name: 'd', label: 'Công sai d', min: -10, max: 10, allowZero: false },
      { name: 'n', label: 'Chỉ số n', min: 8, max: 30 },
    ],
    validateCode: `
      const { u1, d, n } = params;
      if (d === 0 || d < -10 || d > 10 || u1 < -15 || u1 > 15 || n < 8 || n > 30) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, n } = params;
      const un = u1 + (n - 1) * d;
      const correct = '$u_{' + n + '} = ' + un + '$';
      const wList = [
        '$u_{' + n + '} = ' + (un + d) + '$',
        '$u_{' + n + '} = ' + (un + 2 * d) + '$',
        '$u_{' + n + '} = ' + (un - d) + '$',
        '$u_{' + n + '} = ' + (u1 + n * d - 1) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$u_{' + n + '} = ' + (un + j * 3 + 1) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$. Tìm số hạng thứ $' + n + '$ của cấp số cộng đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức số hạng tổng quát $u_n = u_1 + (n - 1)d$:',
          '$u_{' + n + '} = ' + u1 + ' + ' + (n - 1) + ' \\cdot (' + d + ') = ' + un + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: -7, d: 0, n: 16 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (u1=-7, d=-3, n=16 -> -52)', params: { u1: -7, d: -3, n: 16 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Tìm công sai d khi biết hai số hạng liên tiếp u_k, u_{k+1}
  t11_b6_d02_diff_consecutive_mc: {
    id: 't11_b6_d02_diff_consecutive_mc',
    name: 'Tìm công sai d từ hai số hạng liên tiếp u_k và u_{k+1}',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho u_k và u_{k+1} của cấp số cộng. Tính công sai d.',
    conditionSummary: 'k ∈ [2; 15], uk ∈ [-15; 15], d ∈ [-10; 10] \\ {0}',
    paramSpecs: [
      { name: 'k', label: 'Chỉ số k', min: 2, max: 15 },
      { name: 'uk', label: 'Giá trị u_k', min: -15, max: 15 },
      { name: 'd', label: 'Công sai d', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { k, uk, d } = params;
      if (d === 0 || d < -10 || d > 10 || uk < -15 || uk > 15 || k < 2 || k > 15) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, uk, d } = params;
      const uk1 = uk + d;
      const correct = '$' + d + '$';
      const fracWrong = uk !== 0 ? u.simplifyFrac(uk1, uk).latex : '\\frac{1}{2}';
      const wList = [
        '$' + (-d) + '$',
        '$' + (uk1 + uk) + '$',
        '$' + fracWrong + '$',
        '$' + (d + 2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + (d + j + 3) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_{' + k + '} = ' + uk + '$ và $u_{' + (k + 1) + '} = ' + uk1 + '$. Công sai $d$ của cấp số cộng đã cho là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Công sai của cấp số cộng là $d = u_{' + (k + 1) + '} - u_{' + k + '} = ' + uk1 + ' - (' + uk + ') = ' + d + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { k: 7, uk: 3, d: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (u7=3, u8=-1 -> d=-4)', params: { k: 7, uk: 3, d: -4 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Tìm số hạng kế tiếp u_{k+2} từ u_k, u_{k+1}
  t11_b6_d03_next_term_from_two_mc: {
    id: 't11_b6_d03_next_term_from_two_mc',
    name: 'Tìm số hạng kế tiếp u_{k+2} khi biết u_k và u_{k+1}',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho u_k và u_{k+1} của cấp số cộng. Tính số hạng u_{k+2}.',
    conditionSummary: 'k ∈ [2; 12], uk ∈ [-15; 15], d ∈ [-10; 10] \\ {0}',
    paramSpecs: [
      { name: 'k', label: 'Chỉ số k', min: 2, max: 12 },
      { name: 'uk', label: 'Giá trị u_k', min: -15, max: 15 },
      { name: 'd', label: 'Công sai d', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { k, uk, d } = params;
      if (d === 0 || d < -10 || d > 10 || uk < -15 || uk > 15 || k < 2 || k > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, uk, d } = params;
      const uk1 = uk + d;
      const uk2 = uk1 + d;
      const correct = '$' + uk2 + '$';
      const fracWrong = uk !== 0 ? u.simplifyFrac(uk1, uk).latex : '\\frac{1}{3}';
      const wList = [
        '$' + (uk1 - d) + '$',
        '$' + (uk1 - 1) + '$',
        '$' + fracWrong + '$',
        '$' + (uk2 + d) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + (uk2 + j + 2) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_{' + k + '} = ' + uk + '$ và $u_{' + (k + 1) + '} = ' + uk1 + '$. Số hạng $u_{' + (k + 2) + '}$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Công sai của cấp số cộng là $d = u_{' + (k + 1) + '} - u_{' + k + '} = ' + uk1 + ' - (' + uk + ') = ' + d + '$.',
          'Số hạng $u_{' + (k + 2) + '} = u_{' + (k + 1) + '} + d = ' + uk1 + ' + (' + d + ') = ' + uk2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { k: 2, uk: -3, d: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (u2=-3, u3=-1 -> u4=1)', params: { k: 2, uk: -3, d: 2 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Tìm công sai d khi biết u_1 và u_n
  t11_b6_d04_diff_from_u1_un_mc: {
    id: 't11_b6_d04_diff_from_u1_un_mc',
    name: 'Tìm công sai d khi biết u_1 và u_n',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho số hạng đầu u_1 và số hạng thứ n của cấp số cộng. Tính công sai d.',
    conditionSummary: 'u1 ∈ [-15; 15], d ∈ [-12; 12] \\ {0}, n ∈ [6; 20]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -15, max: 15 },
      { name: 'd', label: 'Công sai d', min: -12, max: 12, allowZero: false },
      { name: 'n', label: 'Chỉ số n', min: 6, max: 20 },
    ],
    validateCode: `
      const { u1, d, n } = params;
      if (d === 0 || d < -12 || d > 12 || u1 < -15 || u1 > 15 || n < 6 || n > 20) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, n } = params;
      const un = u1 + (n - 1) * d;
      const correct = '$' + d + '$';
      const wList = [
        '$' + (un - u1) + '$',
        '$' + (un + u1) + '$',
        '$' + (u1 * un) + '$',
        '$' + (-d) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + (d + j + 2) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_1 = ' + u1 + '$ và $u_{' + n + '} = ' + un + '$. Công sai $d$ của cấp số cộng đã cho là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $u_{' + n + '} = u_1 + ' + (n - 1) + 'd \\Leftrightarrow ' + un + ' = ' + u1 + ' + ' + (n - 1) + 'd \\Rightarrow d = ' + d + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: -9, d: 0, n: 14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (u1=-9, u14=-113 -> d=-8)', params: { u1: -9, d: -8, n: 14 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Tìm số thứ tự của số hạng có giá trị V
  t11_b6_d05_find_index_mc: {
    id: 't11_b6_d05_find_index_mc',
    name: 'Tìm vị trí số hạng trong cấp số cộng biết u_1 và d',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho u_1, công sai d và một giá trị u_n. Hỏi giá trị đó là số hạng thứ mấy.',
    conditionSummary: 'u1 ∈ [-15; 15], d ∈ [-10; 10] \\ {0}, n ∈ [8; 35]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -15, max: 15 },
      { name: 'd', label: 'Công sai d', min: -10, max: 10, allowZero: false },
      { name: 'n', label: 'Vị trí đáp án n', min: 8, max: 35 },
    ],
    validateCode: `
      const { u1, d, n } = params;
      if (d === 0 || d < -10 || d > 10 || u1 < -15 || u1 > 15 || n < 8 || n > 35) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, n } = params;
      const val = u1 + (n - 1) * d;
      const correct = '$' + n + '$';
      const wList = [
        '$' + (n + 1) + '$',
        '$' + (n + 2) + '$',
        '$' + (n - 4) + '$',
        '$' + (n - 1) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$' + (n + j + 3) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_1 = ' + u1 + '$ và $d = ' + d + '$. Hỏi số $' + val + '$ là số hạng thứ mấy của cấp số cộng đã cho?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $u_n = ' + val + ' \\Leftrightarrow ' + u1 + ' + (n - 1) \\cdot (' + d + ') = ' + val + ' \\Rightarrow n = ' + n + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: -6, d: 0, n: 19 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (u1=-6, d=5, val=84 -> 19)', params: { u1: -6, d: 5, n: 19 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Tính tổng n số hạng đầu của cấp số cộng
  t11_b6_d06_sum_n_terms_mc: {
    id: 't11_b6_d06_sum_n_terms_mc',
    name: 'Tính tổng n số hạng đầu của cấp số cộng biết u_1 và d',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho u_1 và công sai d. Tính tổng S_n của n số hạng đầu tiên.',
    conditionSummary: 'u1 ∈ [-10; 15], d ∈ [-9; 12] \\ {0}, n ∈ [10; 35], S_n ≠ 0',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -10, max: 15 },
      { name: 'd', label: 'Công sai d', min: -9, max: 12, allowZero: false },
      { name: 'n', label: 'Số số hạng n', min: 10, max: 35 },
    ],
    validateCode: `
      const { u1, d, n } = params;
      if (d === 0 || d < -9 || d > 12 || u1 < -10 || u1 > 15 || n < 10 || n > 35) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const sn = (n * (2 * u1 + (n - 1) * d)) / 2;
      if (sn === 0) return { valid: false, reason: 'Tránh tổng S_n = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, n } = params;
      const sn = (n * (2 * u1 + (n - 1) * d)) / 2;
      const correct = '$S_{' + n + '} = ' + sn + '$';
      const w1 = u.simplifyFrac(n * (u1 + (n - 1) * d), 2);
      const w2 = u.simplifyFrac(n * (2 * u1 + n * d), 2);
      const wList = [
        '$S_{' + n + '} = ' + w1.latex + '$',
        '$S_{' + n + '} = ' + w2.latex + '$',
        '$S_{' + n + '} = ' + (2 * sn) + '$',
        '$S_{' + n + '} = ' + (sn + n * d) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$S_{' + n + '} = ' + (sn + j * 10 + 5) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$. Tính tổng của $' + n + '$ số hạng đầu tiên.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $S_n = \\frac{n}{2}\\left[2u_1 + (n - 1)d\\right]$:',
          '$S_{' + n + '} = \\frac{' + n + '}{2}\\left[2 \\cdot (' + u1 + ') + ' + (n - 1) + ' \\cdot (' + d + ')\\right] = ' + sn + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 1, d: 0, n: 27 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (u1=1, d=9, n=27 -> 3186)', params: { u1: 1, d: 9, n: 27 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Tìm số hạng đầu u_1 khi biết u_p và u_q
  t11_b6_d07_u1_from_two_terms_mc: {
    id: 't11_b6_d07_u1_from_two_terms_mc',
    name: 'Tìm số hạng đầu u_1 khi biết u_p và u_q',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho hai số hạng u_p và u_q của cấp số cộng. Tính số hạng đầu u_1.',
    conditionSummary: 'u1 ∈ [-15; 15], d ∈ [-8; 8] \\ {0}, 3 ≤ p < q ≤ 20',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -15, max: 15 },
      { name: 'd', label: 'Công sai d', min: -8, max: 8, allowZero: false },
      { name: 'p', label: 'Chỉ số p', min: 3, max: 10 },
      { name: 'q', label: 'Chỉ số q (> p)', min: 11, max: 20 },
    ],
    validateCode: `
      const { u1, d, p, q } = params;
      if (d === 0 || d < -8 || d > 8 || u1 < -15 || u1 > 15 || p < 3 || q > 20 || p >= q) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, p, q } = params;
      const up = u1 + (p - 1) * d;
      const uq = u1 + (q - 1) * d;
      const correct = '$u_1 = ' + u1 + '$';
      const wList = [
        '$u_1 = ' + (-u1) + '$',
        '$u_1 = ' + up + '$',
        '$u_1 = ' + (u1 + d) + '$',
        '$u_1 = ' + (u1 + 23) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$u_1 = ' + (u1 + j + 2) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_{' + p + '} = ' + up + '$ và $u_{' + q + '} = ' + uq + '$. Tìm số hạng đầu $u_1$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $d = \\frac{u_{' + q + '} - u_{' + p + '}}{' + q + ' - ' + p + '} = \\frac{' + (uq - up) + '}{' + (q - p) + '} = ' + d + '$.',
          'Suy ra $u_1 = u_{' + p + '} - ' + (p - 1) + 'd = ' + up + ' - ' + (p - 1) + ' \\cdot (' + d + ') = ' + u1 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: -2, d: 0, p: 9, q: 16 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (u9=14, u16=28 -> u1=-2)', params: { u1: -2, d: 2, p: 9, q: 16 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Tìm công sai d khi biết u_p và u_q
  t11_b6_d08_d_from_two_terms_mc: {
    id: 't11_b6_d08_d_from_two_terms_mc',
    name: 'Tìm công sai d khi biết hai số hạng u_p và u_q',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho hai số hạng không liên tiếp u_p và u_q của cấp số cộng. Tính công sai d.',
    conditionSummary: 'u1 ∈ [-15; 15], d ∈ [-15; 15] \\ {0}, 2 ≤ p, q ≥ p + 2',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -15, max: 15 },
      { name: 'd', label: 'Công sai d', min: -15, max: 15, allowZero: false },
      { name: 'p', label: 'Chỉ số p', min: 2, max: 8 },
      { name: 'q', label: 'Chỉ số q (≥ p + 2)', min: 4, max: 16 },
    ],
    validateCode: `
      const { u1, d, p, q } = params;
      if (d === 0 || d < -15 || d > 15 || u1 < -15 || u1 > 15 || p < 2 || q > 16 || q < p + 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, p, q } = params;
      const up = u1 + (p - 1) * d;
      const uq = u1 + (q - 1) * d;
      const correct = '$d = ' + d + '$';
      const fracWrong = up !== 0 ? u.simplifyFrac(uq, up).latex : '\\frac{1}{2}';
      const wList = [
        '$d = ' + (uq - up) + '$',
        '$d = ' + fracWrong + '$',
        '$d = ' + u1 + '$',
        '$d = ' + (-d) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$d = ' + (d + j + 2) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_{' + p + '} = ' + up + '$ và $u_{' + q + '} = ' + uq + '$. Tìm công sai $d$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $u_{' + q + '} - u_{' + p + '} = ' + (q - p) + 'd \\Rightarrow d = \\frac{' + uq + ' - (' + up + ')}{' + (q - p) + '} = ' + d + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q < p + 2', params: { u1: -1, d: 12, p: 4, q: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (u3=23, u5=47 -> d=12)', params: { u1: -1, d: 12, p: 3, q: 5 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Tìm công sai d từ số hạng tổng quát u_n = dn + b
  t11_b6_d09_d_from_linear_formula_mc: {
    id: 't11_b6_d09_d_from_linear_formula_mc',
    name: 'Tìm công sai d từ số hạng tổng quát u_n = dn + b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho số hạng tổng quát dạng bậc nhất u_n = dn + b. Xác định công sai d.',
    conditionSummary: 'd ∈ [-12; 12] \\ {0}, b ∈ [-15; 15]',
    paramSpecs: [
      { name: 'd', label: 'Công sai d', min: -12, max: 12, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -15, max: 15 },
    ],
    validateCode: `
      const { d, b } = params;
      if (d === 0 || d < -12 || d > 12 || b < -15 || b > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d, b } = params;
      const expr = b > 0 && d < 0 ? b + ' - ' + (Math.abs(d) === 1 ? 'n' : Math.abs(d) + 'n') : u.formatLinear(d, b, 'n');
      const correct = '$d = ' + d + '$';
      const wList = [
        '$d = ' + (-d) + '$',
        '$d = ' + b + '$',
        '$d = ' + (d - 2) + '$',
        '$d = ' + (b + d) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$d = ' + (d + j + 3) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có số hạng tổng quát là $u_n = ' + expr + '$. Tìm công sai $d$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $d = u_{n+1} - u_n = \\left(' + u.formatLinear(d, b + d, 'n') + '\\right) - \\left(' + expr + '\\right) = ' + d + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { d: 0, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (u_n = 1 - 3n -> d = -3)', params: { d: -3, b: 1 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Nhận dạng cấp số cộng qua số hạng tổng quát
  t11_b6_d10_identify_formula_mc: {
    id: 't11_b6_d10_identify_formula_mc',
    name: 'Nhận biết dãy số là cấp số cộng qua công thức tổng quát',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho 4 công thức số hạng tổng quát u_n. Chọn công thức biểu diễn một cấp số cộng.',
    conditionSummary: 'a ∈ [-8; 8] \\ {0}, b ∈ [-9; 9], base ∈ [2; 6]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -9, max: 9 },
      { name: 'base', label: 'Cơ số mũ nhiễu', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, b, base } = params;
      if (a === 0 || a < -8 || a > 8 || b < -9 || b > 9 || base < 2 || base > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, base } = params;
      const correct = '$u_n = ' + u.formatLinear(a, b, 'n') + '$';
      const wList = [
        '$u_n = ' + base + '^n$',
        '$u_n = ' + base + '^{n+1}$',
        '$u_n = n^2' + u.formatTrailingConst(b === 0 ? -1 : b) + '$',
        '$u_n = \\frac{1}{n + ' + base + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$u_n = n^3 + ' + j + '$'
      );
      return {
        stem: 'Trong các dãy số $(u_n)$ được cho bởi số hạng tổng quát $u_n$ sau, dãy nào là cấp số cộng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dãy ' + correct + ' là cấp số cộng vì $u_{n+1} - u_n = ' + a + '$ (không đổi với mọi $n \\ge 1$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -3, base: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (u_n = -3n - 3)', params: { a: -3, b: -3, base: 4 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Nhận dạng dãy số hữu hạn là cấp số cộng
  t11_b6_d11_identify_finite_seq_mc: {
    id: 't11_b6_d11_identify_finite_seq_mc',
    name: 'Nhận biết dãy số hữu hạn là một cấp số cộng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho 4 dãy gồm 4 số hạng đầu. Chọn dãy lập thành cấp số cộng.',
    conditionSummary: 'u1 ∈ [-10; 12], d ∈ [-8; 8] \\ {0}',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -10, max: 12 },
      { name: 'd', label: 'Công sai d', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { u1, d } = params;
      if (d === 0 || d < -8 || d > 8 || u1 < -10 || u1 > 12) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d } = params;
      const t1 = u1, t2 = u1 + d, t3 = u1 + 2 * d, t4 = u1 + 3 * d;
      const fmtSeq = (x1, x2, x3, x4) => '$' + x1 + ';\\; ' + x2 + ';\\; ' + x3 + ';\\; ' + x4 + '$';
      const correct = fmtSeq(t1, t2, t3, t4);
      const wList = [
        fmtSeq(t1 + 4, t2 + 5, 16, -20),
        fmtSeq(t1 - 10, t1 - 11, t1 - 13, t1 - 17),
        fmtSeq(-2, -6, -18, -54),
        fmtSeq(t1, t2, t3 + 1, t4 + 3),
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => fmtSeq(t1, t2 + j, t3 + 2 * j + 1, t4)
      );
      return {
        stem: 'Trong các dãy số sau, dãy nào là một cấp số cộng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dãy ' + correct + ' là một cấp số cộng với số hạng đầu $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 4, d: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (4; -1; -6; -11)', params: { u1: 4, d: -5 }, expectedValid: true },
    ],
  },
};
