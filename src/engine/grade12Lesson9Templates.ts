import { MathTemplate } from '../types/math';

export const G12_B9_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 9. KHOẢNG BIẾN THIÊN VÀ KHOẢNG TỨ PHÂN VỊ (7 DẠNG BỔ SUNG)
  // =====================================================================

  // Dạng 1 (Q1 - MC): Khoảng biến thiên của mẫu số liệu ghép nhóm dạng bảng
  t12_b9_d01_range_table_mc: {
    id: 't12_b9_d01_range_table_mc',
    name: 'Tính khoảng biến thiên của mẫu số liệu ghép nhóm từ bảng phân bố',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khoảng biến thiên mẫu số liệu ghép nhóm',
    description: 'Cho bảng tần số ghép nhóm 6 lớp liên tiếp độ rộng h. Tính khoảng biến thiên R = u_{k+1} - u_1.',
    conditionSummary: 'Độ rộng h >= 3, tần số lớp đầu và lớp cuối đều dương (n1 > 0, n6 > 0)',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh bảng (0:Cân nặng, 1:Chiều cao, 2:Tuổi)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút trái đầu tiên', min: 20, max: 140 },
      { name: 'h', label: 'Độ rộng mỗi nhóm h', min: 3, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 38 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 35 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 1, max: 30 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 35 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 35 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 2, max: 35 },
    ],
    validateCode: `
      const { a0, h, n1, n6 } = params;
      if (a0 <= 0 || h < 3) return { valid: false, reason: 'Cần đầu mút dương và độ rộng h >= 3' };
      if (n1 <= 0 || n6 <= 0) return { valid: false, reason: 'Nhóm đầu và nhóm cuối phải có tần số dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, n6 } = params;
      const contexts = [
        { title: 'cân nặng (kg) và số người', row1: 'Cân nặng (kg)', row2: 'Số người' },
        { title: 'chiều cao (cm) và số học sinh', row1: 'Chiều cao (cm)', row2: 'Số học sinh' },
        { title: 'độ tuổi và số nhân viên', row1: 'Độ tuổi', row2: 'Số nhân viên' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const freqs = [n1, n2, n3, n4, n5, n6];
      const upper = a0 + 6 * h;
      const range = upper - a0;
      const correct = '$' + range + '$';
      const distractors = [
        '$' + h + '$',
        '$' + (5 * h) + '$',
        '$' + (range - 35 > 0 ? range - 35 : range + 10) + '$',
        '$' + (range - 31 > 0 ? range - 31 : range + 15) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + (range + k) + '$'
      );
      return {
        stem: 'Cho mẫu số liệu ghép nhóm về ' + ctx.title + ' như bảng sau. Khoảng biến thiên của mẫu số liệu ghép nhóm là:',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đầu mút trái của nhóm đầu tiên là $u_1 = ' + a0 + '$ (với tần số $' + n1 + ' > 0$), đầu mút phải của nhóm cuối cùng là $u_7 = ' + upper + '$ (với tần số $' + n6 + ' > 0$).',
          'Khoảng biến thiên của mẫu số liệu ghép nhóm là: $R = ' + upper + ' - ' + a0 + ' = ' + range + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm đầu bằng 0', params: { ctxIdx: 0, a0: 40, h: 9, n1: 0, n2: 25, n3: 2, n4: 35, n5: 31, n6: 20 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 cân nặng [40;94), R = 54', params: { ctxIdx: 0, a0: 40, h: 9, n1: 35, n2: 25, n3: 2, n4: 35, n5: 31, n6: 20 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2 - MC): Khoảng tứ phân vị bảng 5 lớp (bước thập phân, làm tròn hàng phần trăm)
  t12_b9_d02_iqr_table_mc: {
    id: 't12_b9_d02_iqr_table_mc',
    name: 'Tìm khoảng tứ phân vị mẫu số liệu ghép nhóm (bảng 5 lớp thập phân)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Khoảng tứ phân vị mẫu số liệu ghép nhóm',
    description: 'Cho bảng phân bố ghép nhóm 5 lớp độ rộng h. Tính Q1, Q3 và khoảng tứ phân vị Δ_Q = Q3 - Q1 (làm tròn đến hàng phần trăm).',
    conditionSummary: 'Tần số dương, Q1 và Q3 thuộc hai nhóm phân biệt, tránh ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'a0_10', label: 'Đầu mút đầu (x10)', min: 10, max: 30 },
      { name: 'h10', label: 'Độ rộng lớp (x10)', min: 5, max: 20, step: 5 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 3, max: 12 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 4, max: 14 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 10 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 4, max: 14 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 3, max: 12 },
    ],
    validateCode: `
      const { a0_10, h10, n1, n2, n3, n4, n5 } = params;
      if (h10 <= 0 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0) {
        return { valid: false, reason: 'Độ rộng và tần số các nhóm phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      if (c1 < 0 || c3 < 0 || c1 >= c3) return { valid: false, reason: 'Q1 và Q3 phải nằm ở hai nhóm phân biệt' };
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const a0 = a0_10 / 10, h = h10 / 10;
      const Q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;
      if (Math.abs(iqr * 100 - Math.floor(iqr * 100) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      if (Math.abs(iqr - Q1) < 0.05 || Math.abs(iqr - Q3) < 0.05) {
        return { valid: false, reason: 'Tránh phương án nhiễu trùng đáp án đúng' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0_10, h10, n1, n2, n3, n4, n5 } = params;
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const a0 = a0_10 / 10, h = h10 / 10;
      const intervals = [0, 1, 2, 3, 4].map((i) => {
        const l = Number((a0 + i * h).toFixed(1));
        const r = Number((a0 + (i + 1) * h).toFixed(1));
        return '[' + fmtDec(l) + ' ; ' + fmtDec(r) + ')';
      });
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const L1 = Number((a0 + c1 * h).toFixed(1));
      const L3 = Number((a0 + c3 * h).toFixed(1));
      const f1 = freqs[c1], f3 = freqs[c3];
      const q1Frac = u.simplifyFrac(Math.round(L1 * 10) * 4 * f1 + (N - 4 * F1) * h10, 40 * f1);
      const q3Frac = u.simplifyFrac(Math.round(L3 * 10) * 4 * f3 + (3 * N - 4 * F3) * h10, 40 * f3);
      const iqrNum = q3Frac.num * q1Frac.den - q1Frac.num * q3Frac.den;
      const iqrDen = q3Frac.den * q1Frac.den;
      const iqrFrac = u.simplifyFrac(iqrNum, iqrDen);
      const iqrRound = Math.round(iqrFrac.value * 100) / 100;
      const correct = '$' + fmt2(iqrRound) + '$';
      const distractors = [
        '$' + fmt2(Math.round((iqrRound + 0.79) * 100) / 100) + '$',
        '$' + fmt2(Math.round(q1Frac.value * 100) / 100) + '$',
        '$' + fmt2(Math.max(0.15, Math.round((iqrRound - 1.08) * 100) / 100)) + '$',
        '$' + fmt2(Math.round(q3Frac.value * 100) / 100) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + fmt2(Math.round((iqrRound + k * 0.25) * 100) / 100) + '$'
      );
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về quãng đường chạy bộ (km) và số ngày chạy bộ như bảng sau. Tìm khoảng tứ phân vị của mẫu số liệu ghép nhóm đã cho (làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Quãng đường chạy bộ (km)',
          row2Label: 'Số ngày chạy bộ',
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: '$\\Delta_Q \\approx ' + fmt2(iqrRound) + '$',
        solutionSteps: [
          'Tổng tần số là $N = ' + N + '$. Vị trí $Q_1$ ứng với $\\frac{N}{4} = ' + fmtDec(p1) + '$ thuộc lớp $' + intervals[c1] + '$.',
          'Ta có $Q_1 = ' + fmtDec(L1) + ' + \\frac{' + fmtDec(p1) + ' - ' + F1 + '}{' + f1 + '} \\cdot ' + fmtDec(h) + ' = ' + q1Frac.latex + '$.',
          'Vị trí $Q_3$ ứng với $\\frac{3N}{4} = ' + fmtDec(p3) + '$ thuộc lớp $' + intervals[c3] + '$.',
          'Ta có $Q_3 = ' + fmtDec(L3) + ' + \\frac{' + fmtDec(p3) + ' - ' + F3 + '}{' + f3 + '} \\cdot ' + fmtDec(h) + ' = ' + q3Frac.latex + '$.',
          'Khoảng tứ phân vị là $\\Delta_Q = Q_3 - Q_1 = ' + iqrFrac.latex + ' \\approx ' + fmt2(iqrRound) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { a0_10: 12, h10: 10, n1: 0, n2: 7, n3: 3, n4: 8, n5: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 [1,2;6,2), f=[6,7,3,8,7], ΔQ=2,66', params: { a0_10: 12, h10: 10, n1: 6, n2: 7, n3: 3, n4: 8, n5: 7 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3 - MC): Điều kiện bất đẳng thức xác định giá trị ngoại lệ
  t12_b9_d03_outlier_condition_mc: {
    id: 't12_b9_d03_outlier_condition_mc',
    name: 'Xác định điều kiện bất đẳng thức của giá trị ngoại lệ từ bảng ghép nhóm',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giá trị ngoại lệ mẫu số liệu ghép nhóm',
    description: 'Cho bảng ghép nhóm 5 lớp. Xác định điều kiện để x là giá trị ngoại lệ: x < Q1 - 1,5*Δ_Q hoặc x > Q3 + 1,5*Δ_Q.',
    conditionSummary: 'Ngưỡng dưới dương, các ngưỡng làm tròn hàng phần trăm cách ranh giới 0,005',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu', min: 35, max: 60 },
      { name: 'h', label: 'Độ rộng lớp h', min: 5, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 15, max: 35 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 12, max: 30 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 10, max: 28 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 15, max: 38 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 15, max: 38 },
      { name: 'mode', label: 'Nhánh đúng (0: dưới, 1: trên)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a0, h, n1, n2, n3, n4, n5 } = params;
      if (h < 3 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0) {
        return { valid: false, reason: 'Tham số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      if (c1 < 0 || c3 < 0 || c1 >= c3) return { valid: false, reason: 'Q1 và Q3 phải nằm ở hai nhóm phân biệt' };
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const Q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;
      const lowOut = Q1 - 1.5 * iqr;
      const highOut = Q3 + 1.5 * iqr;
      const wrong1 = Q1 - iqr;
      if (lowOut <= 1) return { valid: false, reason: 'Ngưỡng ngoại lệ dưới phải dương' };
      for (const v of [Q1, Q3, iqr, lowOut, highOut, wrong1]) {
        if (Math.abs(v * 100 - Math.floor(v * 100) - 0.5) < 0.01) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, n1, n2, n3, n4, n5, mode } = params;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const Q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;
      const lowOut = Q1 - 1.5 * iqr;
      const highOut = Q3 + 1.5 * iqr;
      const wrong1 = Q1 - iqr;
      const lowStr = fmt2(lowOut);
      const highStr = fmt2(highOut);
      const wrong1Str = fmt2(wrong1);

      const isUpper = mode === 1;
      const correct = isUpper ? '$x > ' + highStr + '$' : '$x < ' + lowStr + '$';
      const distractors = isUpper
        ? ['$x \\le ' + highStr + '$', '$x > ' + lowStr + '$', '$x < ' + fmt2(Q3 + iqr) + '$']
        : ['$x < ' + wrong1Str + '$', '$x \\ge ' + lowStr + '$', '$x < ' + highStr + '$'];

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$x < ' + fmt2(lowOut + k * 5) + '$'
      );
      return {
        stem:
          'Cho bảng số liệu ghép nhóm về cân nặng (kg) và số người như bảng sau. Gọi $x$ là một giá trị ngoại lệ của bảng số liệu đã cho. Khẳng định nào sau đây là khẳng định đúng?',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Cân nặng (kg)',
          row2Label: 'Số người',
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tứ phân vị thứ nhất và thứ ba lần lượt là $Q_1 \\approx ' + fmt2(Q1) + '$ và $Q_3 \\approx ' + fmt2(Q3) + '$.',
          'Khoảng tứ phân vị là $\\Delta_Q = Q_3 - Q_1 \\approx ' + fmt2(iqr) + '$.',
          'Giá trị $x$ là ngoại lệ nếu $x < Q_1 - 1,5\\Delta_Q$ hoặc $x > Q_3 + 1,5\\Delta_Q$, tức là $x < ' + lowStr + '$ hoặc $x > ' + highStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Q1 và Q3 cùng thuộc một nhóm', params: { a0: 41, h: 10, n1: 10, n2: 90, n3: 2, n4: 2, n5: 2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 [41;91), f=[25,19,17,34,30], x < 14,78', params: { a0: 41, h: 10, n1: 25, n2: 19, n3: 17, n4: 34, n5: 30, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4 - MC): Nhận biết giá trị cụ thể là giá trị ngoại lệ
  t12_b9_d04_identify_outlier_mc: {
    id: 't12_b9_d04_identify_outlier_mc',
    name: 'Nhận biết một giá trị cụ thể là giá trị ngoại lệ của mẫu số liệu ghép nhóm',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giá trị ngoại lệ mẫu số liệu ghép nhóm',
    description: 'Cho bảng phân bố lệch phải về khoảng tuổi. Xác định giá trị nào trong 4 đáp án là giá trị ngoại lệ.',
    conditionSummary: 'Đáp án đúng vượt ngưỡng trên Q3 + 1,5*Δ_Q; 3 phương án nhiễu nằm hẳn trong [L_out; U_out]',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu', min: 15, max: 30 },
      { name: 'h', label: 'Độ rộng lớp h', min: 5, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 20, max: 40 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 20, max: 40 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 10 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 1, max: 6 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 1, max: 5 },
    ],
    validateCode: `
      const { a0, h, n1, n2, n3, n4, n5 } = params;
      if (a0 <= 0 || h < 4 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0) {
        return { valid: false, reason: 'Tham số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      if (c1 < 0 || c3 < 0 || c1 === c3) return { valid: false, reason: 'Q1 và Q3 cần thuộc 2 lớp khác nhau' };
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const Q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;
      if (iqr < 4) return { valid: false, reason: 'Khoảng tứ phân vị quá hẹp để tạo phương án nhiễu đẹp' };
      const highOut = Q3 + 1.5 * iqr;
      if (Math.abs(highOut * 100 - Math.floor(highOut * 100) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, n1, n2, n3, n4, n5 } = params;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const Q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;
      const lowOut = Q1 - 1.5 * iqr;
      const highOut = Q3 + 1.5 * iqr;
      const outlierVal = Number((highOut + 0.75).toFixed(2));
      const in1 = Number((Q1 - 1.27).toFixed(2));
      const in2 = Number(((lowOut + Q1) / 2 + 0.62).toFixed(2));
      const in3 = Number((Q1 + 1.15).toFixed(2));

      const correct = '$' + fmt2(outlierVal) + '$';
      const distractors = ['$' + fmt2(in1) + '$', '$' + fmt2(in2) + '$', '$' + fmt2(in3) + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + fmt2(Number((Q1 + k * 0.7).toFixed(2))) + '$'
      );
      return {
        stem:
          'Cho bảng số liệu ghép nhóm về khoảng tuổi và số người như bảng sau. Giá trị nào sau đây là một giá trị ngoại lệ của bảng số liệu đã cho?',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Khoảng tuổi',
          row2Label: 'Số người',
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tứ phân vị thứ nhất và thứ ba là $Q_1 \\approx ' + fmt2(Q1) + '$ và $Q_3 \\approx ' + fmt2(Q3) + '$.',
          'Khoảng tứ phân vị là $\\Delta_Q = Q_3 - Q_1 \\approx ' + fmt2(iqr) + '$.',
          'Ngưỡng ngoại lệ trên là $Q_3 + 1,5\\Delta_Q \\approx ' + fmt2(highOut) + '$ (và ngưỡng dưới $Q_1 - 1,5\\Delta_Q \\approx ' + fmt2(lowOut) + '$).',
          'Vì $' + fmt2(outlierVal) + ' > ' + fmt2(highOut) + '$ nên $' + fmt2(outlierVal) + '$ là giá trị ngoại lệ.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Q1 và Q3 chung lớp', params: { a0: 20, h: 9, n1: 60, n2: 4, n3: 4, n4: 2, n5: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 [20;65), f=[34,34,4,2,1], đáp án 50,53', params: { a0: 20, h: 9, n1: 34, n2: 34, n3: 4, n4: 2, n5: 1 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5 - TF): Đánh giá 4 khẳng định R, Q1, Q3, Δ_Q trên bảng ghép nhóm 5 lớp bước thập phân
  t12_b9_d05_stats_tf_small_step: {
    id: 't12_b9_d05_stats_tf_small_step',
    name: 'Đánh giá đúng sai các khẳng định về khoảng biến thiên, Q1, Q3 và khoảng tứ phân vị',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Khoảng biến thiên và khoảng tứ phân vị',
    description: 'Cho bảng phân bố quãng đường chạy bộ 5 lớp thập phân. Xét 4 mệnh đề về khoảng biến thiên, Q1, Q3 và Δ_Q.',
    conditionSummary: 'Q1 < Q3 ở các lớp rõ ràng và giá trị làm tròn phần trăm cách ranh giới 0,005',
    paramSpecs: [
      { name: 'a0_10', label: 'Đầu mút đầu (x10)', min: 5, max: 25, step: 5 },
      { name: 'h10', label: 'Độ rộng lớp (x10)', min: 4, max: 10 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 1, max: 6 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 8 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 1, max: 6 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 1, max: 6 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 8 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { h10, n1, n2, n3, n4, n5 } = params;
      if (h10 <= 0 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0) {
        return { valid: false, reason: 'Độ rộng và tần số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      if (c1 < 0 || c3 < 0 || c1 >= c3) return { valid: false, reason: 'Q1 và Q3 phải nằm ở hai nhóm phân biệt' };
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const h = h10 / 10;
      const Q1 = params.a0_10 / 10 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = params.a0_10 / 10 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;
      for (const v of [Q1, Q3, iqr]) {
        if (Math.abs(v * 100 - Math.floor(v * 100) - 0.5) < 0.03) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0_10, h10, n1, n2, n3, n4, n5, mode } = params;
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const a0 = a0_10 / 10, h = h10 / 10;
      const intervals = [0, 1, 2, 3, 4].map((i) => {
        const l = Number((a0 + i * h).toFixed(1));
        const r = Number((a0 + (i + 1) * h).toFixed(1));
        return '[' + fmtDec(l) + ' ; ' + fmtDec(r) + ')';
      });
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const L1 = Number((a0 + c1 * h).toFixed(1));
      const L3 = Number((a0 + c3 * h).toFixed(1));
      const f1 = freqs[c1], f3 = freqs[c3];
      const q1Frac = u.simplifyFrac(Math.round(L1 * 10) * 4 * f1 + (N - 4 * F1) * h10, 40 * f1);
      const q3Frac = u.simplifyFrac(Math.round(L3 * 10) * 4 * f3 + (3 * N - 4 * F3) * h10, 40 * f3);
      const iqrFrac = u.simplifyFrac(q3Frac.num * q1Frac.den - q1Frac.num * q3Frac.den, q3Frac.den * q1Frac.den);
      const R = Number((5 * h).toFixed(1));
      const q1R = Math.round(q1Frac.value * 100) / 100;
      const q3R = Math.round(q3Frac.value * 100) / 100;
      const iqrR = Math.round(iqrFrac.value * 100) / 100;

      const aTrue = mode === 2;
      const bTrue = mode !== 3;
      const cTrue = mode !== 1;
      const dTrue = mode !== 2;

      const shownR = aTrue ? R : Number((R + 2).toFixed(1));
      const shownQ1 = bTrue ? q1R : Number((q1R + 0.45).toFixed(2));
      const shownQ3 = cTrue ? q3R : Number((q3R - 0.55).toFixed(2));
      const shownIqr = dTrue ? iqrR : Number((iqrR + 0.5).toFixed(2));

      const tfStatements = [
        { key: 'a', text: 'Khoảng biến thiên của mẫu số liệu là $' + fmtDec(shownR) + '$.', isTrue: aTrue },
        { key: 'b', text: 'Tứ phân vị thứ nhất bằng $' + fmt2(shownQ1) + '$.', isTrue: bTrue },
        { key: 'c', text: 'Tứ phân vị thứ ba bằng $' + fmt2(shownQ3) + '$.', isTrue: cTrue },
        { key: 'd', text: 'Khoảng tứ phân vị bằng $' + fmt2(shownIqr) + '$.', isTrue: dTrue },
      ];
      return {
        stem:
          'Cho bảng số liệu ghép nhóm về quãng đường chạy bộ (km) và số ngày chạy bộ như bảng sau. Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Quãng đường chạy bộ (km)',
          row2Label: 'Số ngày chạy bộ',
          intervals,
          frequencies: freqs,
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ') ' + (st.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Khoảng biến thiên của mẫu số liệu là $R = ' + fmtDec(Number((a0 + 5 * h).toFixed(1))) + ' - ' + fmtDec(a0) + ' = ' + fmtDec(R) + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $N = ' + N + '$, vị trí $\\frac{N}{4} = ' + fmtDec(p1) + '$ thuộc lớp $' + intervals[c1] + '$, nên $Q_1 = ' + fmtDec(L1) + ' + \\frac{' + fmtDec(p1) + ' - ' + F1 + '}{' + f1 + '} \\cdot ' + fmtDec(h) + ' = ' + q1Frac.latex + ' \\approx ' + fmt2(q1R) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' Vị trí $\\frac{3N}{4} = ' + fmtDec(p3) + '$ thuộc lớp $' + intervals[c3] + '$, nên $Q_3 = ' + fmtDec(L3) + ' + \\frac{' + fmtDec(p3) + ' - ' + F3 + '}{' + f3 + '} \\cdot ' + fmtDec(h) + ' = ' + q3Frac.latex + ' \\approx ' + fmt2(q3R) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Khoảng tứ phân vị là $\\Delta_Q = Q_3 - Q_1 = ' + iqrFrac.latex + ' \\approx ' + fmt2(iqrR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm cuối bằng 0', params: { a0_10: 10, h10: 5, n1: 1, n2: 3, n3: 1, n4: 1, n5: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 [1;3,5), f=[1,3,1,1,4], S-Đ-Đ-Đ', params: { a0_10: 10, h10: 5, n1: 1, n2: 3, n3: 1, n4: 1, n5: 4, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6 - TF): Tổng hợp khoảng biến thiên, Q1, Q3 và kiểm tra giá trị ngoại lệ (6 lớp)
  t12_b9_d06_stats_outlier_tf: {
    id: 't12_b9_d06_stats_outlier_tf',
    name: 'Đánh giá đúng sai về R, Q1, Q3 và nhận diện giá trị ngoại lệ (bảng 6 lớp)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Khoảng tứ phân vị và giá trị ngoại lệ',
    description: 'Cho bảng phân bố lương (triệu đồng) gồm 6 lớp. Xét tính đúng sai của 4 khẳng định về khoảng biến thiên, Q1, Q3 và giá trị ngoại lệ.',
    conditionSummary: '6 lớp tần số dương, Q1 < Q3 thuộc các lớp phân biệt, tránh ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu', min: 6, max: 20 },
      { name: 'h', label: 'Độ rộng lớp h', min: 2, max: 6 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 6, max: 16 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 6, max: 16 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 3, max: 10 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 8 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 1, max: 6 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 1, max: 6 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a0, h, n1, n2, n3, n4, n5, n6 } = params;
      if (a0 <= 0 || h < 2 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0 || n6 <= 0) {
        return { valid: false, reason: 'Tham số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      if (c1 < 0 || c3 < 0 || c1 >= c3) return { valid: false, reason: 'Q1 và Q3 phải nằm ở hai nhóm phân biệt' };
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const Q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;
      const lowOut = Q1 - 1.5 * iqr;
      const highOut = Q3 + 1.5 * iqr;
      for (const v of [Q1, Q3, iqr, lowOut, highOut]) {
        if (Math.abs(v * 100 - Math.floor(v * 100) - 0.5) < 0.03) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, n1, n2, n3, n4, n5, n6, mode } = params;
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5, n6];
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const L1 = a0 + c1 * h, L3 = a0 + c3 * h;
      const f1 = freqs[c1], f3 = freqs[c3];
      const q1Frac = u.simplifyFrac(L1 * 4 * f1 + (N - 4 * F1) * h, 4 * f1);
      const q3Frac = u.simplifyFrac(L3 * 4 * f3 + (3 * N - 4 * F3) * h, 4 * f3);
      const iqrFrac = u.simplifyFrac(q3Frac.num * q1Frac.den - q1Frac.num * q3Frac.den, q3Frac.den * q1Frac.den);
      const R = 6 * h;
      const q1R = Math.round(q1Frac.value * 100) / 100;
      const q3R = Math.round(q3Frac.value * 100) / 100;
      const iqrR = Math.round(iqrFrac.value * 100) / 100;
      const lowOutR = Math.round((q1Frac.value - 1.5 * iqrFrac.value) * 100) / 100;
      const highOutR = Math.round((q3Frac.value + 1.5 * iqrFrac.value) * 100) / 100;
      const xTest = Math.round((q3Frac.value + 1.5 * iqrFrac.value + 0.75) * 100) / 100;

      const aTrue = mode === 1;
      const bTrue = mode !== 2;
      const cTrue = mode === 2 || mode === 3;
      const dTrue = mode === 3;

      const shownR = aTrue ? R : R + 1;
      const shownQ1 = bTrue ? q1R : Math.round((q1R + 1.25) * 100) / 100;
      const shownQ3 = cTrue ? q3R : Math.round((q3R - 2.55) * 100) / 100;
      const dStatementText = dTrue
        ? '$' + fmt2(xTest) + '$ là giá trị ngoại lệ của mẫu số liệu.'
        : '$' + fmt2(xTest) + '$ không phải là giá trị ngoại lệ của mẫu số liệu.';

      const tfStatements = [
        { key: 'a', text: 'Khoảng biến thiên của mẫu số liệu là $' + shownR + '$.', isTrue: aTrue },
        { key: 'b', text: 'Tứ phân vị thứ nhất bằng $' + fmt2(shownQ1) + '$.', isTrue: bTrue },
        { key: 'c', text: 'Tứ phân vị thứ ba bằng $' + fmt2(shownQ3) + '$.', isTrue: cTrue },
        { key: 'd', text: dStatementText, isTrue: dTrue },
      ];
      return {
        stem:
          'Cho bảng số liệu ghép nhóm về lương (triệu đồng) và số nhân viên như bảng sau. Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Lương (triệu đồng)',
          row2Label: 'Số nhân viên',
          intervals,
          frequencies: freqs,
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ') ' + (st.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Khoảng biến thiên là $R = ' + (a0 + 6 * h) + ' - ' + a0 + ' = ' + R + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $N = ' + N + '$, vị trí $\\frac{N}{4} = ' + fmtDec(p1) + '$ thuộc lớp $' + intervals[c1] + ' \\Rightarrow Q_1 = ' + q1Frac.latex + ' = ' + fmt2(q1R) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' Vị trí $\\frac{3N}{4} = ' + fmtDec(p3) + '$ thuộc lớp $' + intervals[c3] + ' \\Rightarrow Q_3 = ' + q3Frac.latex + ' = ' + fmt2(q3R) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\Delta_Q = ' + iqrFrac.latex + ' \\approx ' + fmt2(iqrR) + '$, ta có $Q_1 - 1,5\\Delta_Q \\approx ' + fmt2(lowOutR) + '$ và $Q_3 + 1,5\\Delta_Q \\approx ' + fmt2(highOutR) + '$. Vì $' + fmt2(xTest) + ' > ' + fmt2(highOutR) + '$ nên $' + fmt2(xTest) + '$ là giá trị ngoại lệ.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Q1 và Q3 cùng lớp', params: { a0: 10, h: 3, n1: 30, n2: 2, n3: 2, n4: 1, n5: 1, n6: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 [10;28), f=[10,13,5,3,2,3], S-Đ-S-S', params: { a0: 10, h: 3, n1: 10, n2: 13, n3: 5, n4: 3, n5: 2, n6: 3, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7 - SA): Tính khoảng tứ phân vị bảng 6 lớp (làm tròn đến hàng phần mười)
  t12_b9_d07_iqr_6classes_sa: {
    id: 't12_b9_d07_iqr_6classes_sa',
    name: 'Tính khoảng tứ phân vị mẫu số liệu ghép nhóm 6 lớp (làm tròn phần mười)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng tứ phân vị mẫu số liệu ghép nhóm',
    description: 'Cho bảng ghép nhóm 6 lớp về khoảng tuổi và số người. Tính khoảng tứ phân vị Δ_Q làm tròn đến hàng phần mười.',
    conditionSummary: '6 lớp tần số dương, Q1 < Q3 thuộc các lớp phân biệt, tránh ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu', min: 18, max: 32 },
      { name: 'h', label: 'Độ rộng lớp h', min: 5, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 15, max: 40 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 15, max: 38 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 15 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 8, max: 25 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 15 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 8, max: 25 },
    ],
    validateCode: `
      const { a0, h, n1, n2, n3, n4, n5, n6 } = params;
      if (a0 <= 0 || h < 3 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0 || n6 <= 0) {
        return { valid: false, reason: 'Tham số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      if (c1 < 0 || c3 < 0 || c1 >= c3) return { valid: false, reason: 'Q1 và Q3 phải nằm ở hai nhóm phân biệt' };
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const Q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;
      if (Math.abs(iqr * 10 - Math.floor(iqr * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, n1, n2, n3, n4, n5, n6 } = params;
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const freqs = [n1, n2, n3, n4, n5, n6];
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const L1 = a0 + c1 * h, L3 = a0 + c3 * h;
      const f1 = freqs[c1], f3 = freqs[c3];
      const q1Frac = u.simplifyFrac(L1 * 4 * f1 + (N - 4 * F1) * h, 4 * f1);
      const q3Frac = u.simplifyFrac(L3 * 4 * f3 + (3 * N - 4 * F3) * h, 4 * f3);
      const iqrFrac = u.simplifyFrac(q3Frac.num * q1Frac.den - q1Frac.num * q3Frac.den, q3Frac.den * q1Frac.den);
      const rounded = Math.round(iqrFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về khoảng tuổi và số người như bảng sau. Tìm khoảng tứ phân vị của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Khoảng tuổi',
          row2Label: 'Số người',
          intervals,
          frequencies: freqs,
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tổng tần số là $N = ' + N + '$. Vị trí $Q_1$ là $\\frac{' + N + '}{4} = ' + fmtDec(p1) + '$, thuộc lớp $' + intervals[c1] + '$.',
          'Ta có $Q_1 = ' + L1 + ' + \\frac{' + fmtDec(p1) + ' - ' + F1 + '}{' + f1 + '} \\cdot ' + h + ' = ' + q1Frac.latex + '$.',
          'Vị trí $Q_3$ là $\\frac{3 \\cdot ' + N + '}{4} = ' + fmtDec(p3) + '$, thuộc lớp $' + intervals[c3] + '$.',
          'Ta có $Q_3 = ' + L3 + ' + \\frac{' + fmtDec(p3) + ' - ' + F3 + '}{' + f3 + '} \\cdot ' + h + ' = ' + q3Frac.latex + '$.',
          'Khoảng tứ phân vị là $\\Delta_Q = ' + q3Frac.latex + ' - ' + q1Frac.latex + ' = ' + iqrFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Q1 và Q3 cùng lớp', params: { a0: 23, h: 9, n1: 90, n2: 2, n3: 2, n4: 2, n5: 2, n6: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 [23;77), f=[34,32,2,16,2,17], ΔQ=25,4', params: { a0: 23, h: 9, n1: 34, n2: 32, n3: 2, n4: 16, n5: 2, n6: 17 }, expectedValid: true },
    ],
  },
};

export const G12_B9_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B9_TEMPLATES).filter(
  (t) => t.category === 'MC'
);
export const G12_B9_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B9_TEMPLATES).filter(
  (t) => t.category === 'TF'
);
export const G12_B9_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B9_TEMPLATES).filter(
  (t) => t.category === 'SA'
);
