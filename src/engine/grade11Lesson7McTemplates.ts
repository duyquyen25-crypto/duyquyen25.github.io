import { MathTemplate } from '../types/math';

const GP11_MC_HELPERS = String.raw`
  const fmtFrac = (num, den) => {
    const f = u.simplifyFrac(num, den);
    return f.latex;
  };
  const fmtPowBase = (num, den) => {
    const f = u.simplifyFrac(num, den);
    if (f.isInteger) {
      return f.num < 0 ? '\\left(' + f.num + '\\right)' : String(f.num);
    }
    return '\\left(' + f.latex + '\\right)';
  };
  const fmtMulFactor = (num) => (num < 0 ? '(' + num + ')' : String(num));
`;

export const G11_B7_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tìm số hạng u_k của cấp số nhân biết u_1 và công bội q
  t11_b7_d01_nth_term_mc: {
    id: 't11_b7_d01_nth_term_mc',
    name: 'Tìm số hạng u_k của cấp số nhân biết u_1 và công bội q',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số nhân',
    description: 'Cho số hạng đầu u_1 và công bội q (nguyên hoặc phân số). Tính số hạng u_k.',
    conditionSummary: 'u1 ∈ [-9; 9] \\ {0}, q = qNum/qDen tối giản khác 0 và ±1, k ∈ [4; 8], mẫu số ≤ 10^6',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -9, max: 9, allowZero: false },
      { name: 'qNum', label: 'Tử số công bội qNum', min: -5, max: 5, allowZero: false },
      { name: 'qDen', label: 'Mẫu số công bội qDen', min: 1, max: 6 },
      { name: 'k', label: 'Chỉ số k', min: 4, max: 8 },
    ],
    validateCode: `
      const { u1, qNum, qDen, k } = params;
      if (u1 === 0 || u1 < -9 || u1 > 9) return { valid: false, reason: 'u1 ngoài miền hoặc bằng 0' };
      if (qNum === 0 || qNum < -5 || qNum > 5 || qDen < 1 || qDen > 6) {
        return { valid: false, reason: 'Công bội q ngoài miền' };
      }
      if (Math.abs(qNum) === qDen) return { valid: false, reason: 'Công bội q không được bằng ±1' };
      if (u.gcd(Math.abs(qNum), qDen) !== 1) return { valid: false, reason: 'Phân số q chưa tối giản' };
      if (k < 4 || k > 8) return { valid: false, reason: 'Chỉ số k ngoài miền [4; 8]' };
      if (Math.pow(qDen, k - 1) > 1000000 || Math.abs(u1) * Math.pow(Math.abs(qNum), k - 1) > 1000000) {
        return { valid: false, reason: 'Giá trị lũy thừa quá lớn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      ${GP11_MC_HELPERS}
      const { u1, qNum, qDen, k } = params;
      const numK = u1 * Math.pow(qNum, k - 1);
      const denK = Math.pow(qDen, k - 1);
      const ansFrac = u.simplifyFrac(numK, denK);
      const correct = '$u_{' + k + '} = ' + ansFrac.latex + '$';

      const w1 = '$u_{' + k + '} = ' + fmtFrac(u1 * Math.pow(qNum, k), Math.pow(qDen, k)) + '$';
      const w2 = '$u_{' + k + '} = ' + fmtFrac(u1 * Math.pow(qNum, k - 2), Math.pow(qDen, k - 2)) + '$';
      const w3 = '$u_{' + k + '} = ' + fmtFrac(-numK, denK) + '$';
      const w4 = '$u_{' + k + '} = ' + fmtFrac(numK * 2, denK) + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3, w4],
        rng,
        (j) => '$u_{' + k + '} = ' + fmtFrac(numK + (numK >= 0 ? j : -j), denK) + '$'
      );

      const qLatex = fmtFrac(qNum, qDen);
      const qBase = fmtPowBase(qNum, qDen);

      return {
        stem: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và công bội $q = ' + qLatex + '$. Tìm số hạng $u_{' + k + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức số hạng tổng quát $u_n = u_1 \\cdot q^{n-1}$:',
          '$u_{' + k + '} = ' + u1 + ' \\cdot ' + qBase + '^{' + (k - 1) + '} = ' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0', params: { u1: 0, qNum: 2, qDen: 5, k: 7 }, expectedValid: false },
      { label: 'Biên q = 1 (suy biến)', params: { u1: -2, qNum: 1, qDen: 1, k: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (u1=-2, q=2/5, k=7 -> -128/15625)', params: { u1: -2, qNum: 2, qDen: 5, k: 7 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Tìm công bội q từ hai số hạng liên tiếp u_p và u_{p+1}
  t11_b7_d02_ratio_consecutive_mc: {
    id: 't11_b7_d02_ratio_consecutive_mc',
    name: 'Tìm công bội q khi biết hai số hạng liên tiếp u_p và u_{p+1}',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số nhân',
    description: 'Cho u_p và u_{p+1} của cấp số nhân. Tính công bội q.',
    conditionSummary: 'p ∈ [2; 10], up, up1 ∈ [-12; 12] \\ {0}, |up1| ≠ |up|',
    paramSpecs: [
      { name: 'p', label: 'Chỉ số p', min: 2, max: 10 },
      { name: 'up', label: 'Giá trị u_p', min: -12, max: 12, allowZero: false },
      { name: 'up1', label: 'Giá trị u_{p+1}', min: -12, max: 12, allowZero: false },
    ],
    validateCode: `
      const { p, up, up1 } = params;
      if (p < 2 || p > 10 || up === 0 || up1 === 0 || up < -12 || up > 12 || up1 < -12 || up1 > 12) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc bằng 0' };
      }
      if (Math.abs(up1) === Math.abs(up)) {
        return { valid: false, reason: '|u_{p+1}| = |u_p| dẫn đến q = ±1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, up, up1 } = params;
      const qFrac = u.simplifyFrac(up1, up);
      const qInv = u.simplifyFrac(up, up1);
      const qNeg = u.simplifyFrac(-up1, up);
      const correct = '$q = ' + qFrac.latex + '$';

      const wList = [
        '$q = ' + (up1 - up) + '$',
        '$q = ' + qInv.latex + '$',
        '$q = ' + qNeg.latex + '$',
        '$q = ' + (up1 + up) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$q = ' + u.simplifyFrac(up1 + j, up).latex + '$'
      );

      return {
        stem: 'Cho cấp số nhân $(u_n)$ có $u_{' + p + '} = ' + up + '$ và $u_{' + (p + 1) + '} = ' + up1 + '$. Tìm công bội $q$ của cấp số nhân đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Công bội của cấp số nhân là $q = \\frac{u_{' + (p + 1) + '}}{u_{' + p + '}} = \\frac{' + up1 + '}{' + up + '} = ' + qFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u_p = 0', params: { p: 3, up: 0, up1: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (u3=5, u4=-1 -> q=-1/5)', params: { p: 3, up: 5, up1: -1 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Tính tổng ba số hạng u_a + u_b + u_c của cấp số nhân
  t11_b7_d03_sum_three_terms_mc: {
    id: 't11_b7_d03_sum_three_terms_mc',
    name: 'Tính tổng tổ hợp ba số hạng u_a + u_b + u_c của cấp số nhân',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cấp số nhân',
    description: 'Cho u_1 và công bội q nguyên. Tính S = u_a + u_b + u_c.',
    conditionSummary: 'u1 ∈ [-8; 8] \\ {0}, q ∈ [-3; 3] \\ {-1, 0, 1}, 2 ≤ a < b < c ≤ 9',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -8, max: 8, allowZero: false },
      { name: 'q', label: 'Công bội q', min: -3, max: 3, allowZero: false },
      { name: 'a', label: 'Chỉ số thứ nhất a', min: 2, max: 4 },
      { name: 'b', label: 'Chỉ số thứ hai b', min: 5, max: 7 },
      { name: 'c', label: 'Chỉ số thứ ba c', min: 8, max: 9 },
    ],
    validateCode: `
      const { u1, q, a, b, c } = params;
      if (u1 === 0 || u1 < -8 || u1 > 8 || q === 0 || Math.abs(q) === 1 || q < -3 || q > 3) {
        return { valid: false, reason: 'u1 hoặc q ngoài miền' };
      }
      if (a < 2 || b <= a || c <= b || c > 9) {
        return { valid: false, reason: 'Chỉ số a < b < c ngoài miền [2; 9]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      ${GP11_MC_HELPERS}
      const { u1, q, a, b, c } = params;
      const ua = u1 * Math.pow(q, a - 1);
      const ub = u1 * Math.pow(q, b - 1);
      const uc = u1 * Math.pow(q, c - 1);
      const s = ua + ub + uc;
      const correct = '$S = ' + s + '$';

      const sShift = u1 * (Math.pow(q, a) + Math.pow(q, b) + Math.pow(q, c));
      const wList = [
        '$S = ' + (-s) + '$',
        '$S = ' + sShift + '$',
        '$S = ' + (ua + ub - uc) + '$',
        '$S = ' + (ua - ub + uc) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => '$S = ' + (s + j * 12) + '$'
      );

      const qPow = fmtMulFactor(q);
      return {
        stem: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và công bội $q = ' + q + '$. Tính $S = u_{' + a + '} + u_{' + b + '} + u_{' + c + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $u_{' + a + '} = ' + u1 + ' \\cdot ' + qPow + '^{' + (a - 1) + '} = ' + ua + '$, $u_{' + b + '} = ' + u1 + ' \\cdot ' + qPow + '^{' + (b - 1) + '} = ' + ub + '$, $u_{' + c + '} = ' + u1 + ' \\cdot ' + qPow + '^{' + (c - 1) + '} = ' + uc + '$.',
          'Vậy $S = (' + ua + ') + (' + ub + ') + (' + uc + ') = ' + s + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { u1: -4, q: 1, a: 3, b: 7, c: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (u1=-4, q=-2, u3+u7+u8=240)', params: { u1: -4, q: -2, a: 3, b: 7, c: 8 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Tính tổng n số hạng đầu tiên của cấp số nhân
  t11_b7_d04_sum_n_terms_mc: {
    id: 't11_b7_d04_sum_n_terms_mc',
    name: 'Tính tổng n số hạng đầu tiên của cấp số nhân',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số nhân',
    description: 'Cho số hạng đầu u_1 và công bội q. Tính tổng S_n của n số hạng đầu tiên.',
    conditionSummary: 'u1 ∈ [-8; 8] \\ {0}, q = qNum/qDen tối giản ≠ 0, ±1, n ∈ [4; 7]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -8, max: 8, allowZero: false },
      { name: 'qNum', label: 'Tử số qNum', min: -4, max: 4, allowZero: false },
      { name: 'qDen', label: 'Mẫu số qDen', min: 1, max: 4 },
      { name: 'n', label: 'Số lượng số hạng n', min: 4, max: 7 },
    ],
    validateCode: `
      const { u1, qNum, qDen, n } = params;
      if (u1 === 0 || u1 < -8 || u1 > 8) return { valid: false, reason: 'u1 ngoài miền' };
      if (qNum === 0 || qNum < -4 || qNum > 4 || qDen < 1 || qDen > 4) {
        return { valid: false, reason: 'Công bội q ngoài miền' };
      }
      if (Math.abs(qNum) === qDen) return { valid: false, reason: 'q không được bằng ±1' };
      if (u.gcd(Math.abs(qNum), qDen) !== 1) return { valid: false, reason: 'q chưa tối giản' };
      if (n < 4 || n > 7) return { valid: false, reason: 'n ngoài miền [4; 7]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      ${GP11_MC_HELPERS}
      const { u1, qNum, qDen, n } = params;
      // S_n = u1 * (q^n - 1) / (q - 1) = u1 * (qNum^n - qDen^n) / (qDen^{n-1} * (qNum - qDen))
      const snNum = u1 * (Math.pow(qNum, n) - Math.pow(qDen, n));
      const snDen = Math.pow(qDen, n - 1) * (qNum - qDen);
      const snFrac = u.simplifyFrac(snNum, snDen);
      const correct = '$' + snFrac.latex + '$';

      const w1 = '$' + u.simplifyFrac(-snNum, snDen).latex + '$';
      const w2 = '$' + u.simplifyFrac(u1 * qDen, qDen - qNum).latex + '$';
      const w3 = '$' + u.simplifyFrac(u1 * (Math.pow(qNum, n - 1) - Math.pow(qDen, n - 1)), Math.pow(qDen, n - 2) * (qNum - qDen)).latex + '$';
      const w4 = '$' + u.simplifyFrac(snNum + u1, snDen).latex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3, w4],
        rng,
        (j) => '$' + u.simplifyFrac(snNum + j * snDen, snDen).latex + '$'
      );

      const qLatex = fmtFrac(qNum, qDen);
      const qBase = fmtPowBase(qNum, qDen);

      return {
        stem: 'Cho cấp số nhân $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và công bội $q = ' + qLatex + '$. Tính tổng của $' + n + '$ số hạng đầu tiên của cấp số nhân đã cho.',
        options,
        correctIndex,
        answerSummary: '$S_{' + n + '} = ' + snFrac.latex + '$',
        solutionSteps: [
          'Áp dụng công thức tổng $S_n = u_1\\cdot\\frac{1 - q^n}{1 - q}$:',
          '$S_{' + n + '} = ' + u1 + ' \\cdot \\frac{1 - ' + qBase + '^{' + n + '}}{1 - ' + qBase + '} = ' + snFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { u1: 3, qNum: 1, qDen: 1, n: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (u1=3, q=1/2, n=7 -> 381/64)', params: { u1: 3, qNum: 1, qDen: 2, n: 7 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Nhận biết cấp số nhân từ dãy hữu hạn 4 số hạng
  t11_b7_d05_identify_gp_mc: {
    id: 't11_b7_d05_identify_gp_mc',
    name: 'Nhận biết dãy số là cấp số nhân trong các dãy hữu hạn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số nhân',
    description: 'Cho 4 dãy số hữu hạn gồm 4 số hạng. Xác định dãy nào là một cấp số nhân.',
    conditionSummary: 'u1 ∈ [-6; 6] \\ {0}, q ∈ [-3; 3] \\ {0, 1}, dWrong ∈ [2; 5], delta ∈ [1; 4]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -6, max: 6, allowZero: false },
      { name: 'q', label: 'Công bội q', min: -3, max: 3, allowZero: false },
      { name: 'dWrong', label: 'Công sai dãy nhiễu', min: 2, max: 5 },
      { name: 'delta', label: 'Độ lệch nhiễu', min: 1, max: 4 },
    ],
    validateCode: `
      const { u1, q, dWrong, delta } = params;
      if (u1 === 0 || u1 < -6 || u1 > 6 || q === 0 || q === 1 || q < -3 || q > 3) {
        return { valid: false, reason: 'u1 hoặc q ngoài miền' };
      }
      if (dWrong < 2 || dWrong > 5 || delta < 1 || delta > 4) {
        return { valid: false, reason: 'Tham số nhiễu ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, q, dWrong, delta } = params;
      const fmtSeq = (arr) => '$' + arr.join(';\\; ') + '$';
      const rightArr = [u1, u1 * q, u1 * q * q, u1 * q * q * q];
      const correct = fmtSeq(rightArr);

      const arithArr = [u1 - 2, u1 - 2 + dWrong, u1 - 2 + 2 * dWrong, u1 - 2 + 3 * dWrong];
      const b0 = Math.abs(u1) + 2;
      const lastBrokenArr = [b0, b0 * 2, b0 * 4, b0 * 8 + delta];
      const altArr = [delta, -(delta + 1), delta * 3 + 5, -(delta * 4 + 12)];

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtSeq(arithArr), fmtSeq(lastBrokenArr), fmtSeq(altArr)],
        rng,
        (j) => fmtSeq([u1 + j, u1 + j + dWrong, u1 + j + 2 * dWrong, u1 + j + 3 * dWrong + 1])
      );

      return {
        stem: 'Trong các dãy số sau, dãy nào là một cấp số nhân?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dãy số $' + rightArr.join(';\\; ') + '$ có tỉ số hai số hạng liên tiếp không đổi bằng $q = ' + q + '$ nên là cấp số nhân với $u_1 = ' + u1 + ',\\; q = ' + q + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0', params: { u1: 0, q: -1, dWrong: 3, delta: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (-2; 2; -2; 2)', params: { u1: -2, q: -1, dWrong: 3, delta: 1 }, expectedValid: true },
    ],
  },
};
