import { MathTemplate } from '../types/math';

export const G11_B9_SA_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 9 (Q9 - SA): Tính Q1 bảng 5 lớp nguyên (làm tròn đến hàng phần mười)
  t11_b9_d09_q1_5classes_sa: {
    id: 't11_b9_d09_q1_5classes_sa',
    name: 'Tính tứ phân vị thứ nhất Q1 (bảng 5 lớp nguyên, làm tròn hàng phần mười)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tứ phân vị mẫu số liệu ghép nhóm',
    description: 'Cho bảng ghép nhóm 5 lớp độ rộng nguyên. Tính Q1 và làm tròn kết quả đến hàng phần mười.',
    conditionSummary: 'Đầu mút dương, h >= 2, tần số các nhóm dương, tránh ranh giới làm tròn 0,05 không chính xác',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Cân nặng, 1:Chiều cao, 2:Tuổi)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút đầu', min: 25, max: 60 },
      { name: 'h', label: 'Độ rộng lớp h', min: 4, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 5, max: 30 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 5, max: 30 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 8, max: 40 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 4, max: 25 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 5, max: 30 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0 <= 0 || a0 > 180 || h < 2 || h > 30) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      if (freqs.some((f) => f <= 0 || f > 80)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 80]' };
      }
      const N = n1 + n2 + n3 + n4 + n5;
      const p1 = N / 4;
      let s = 0, c1 = -1, F1 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p1) { c1 = i; F1 = s; break; }
        s += freqs[i];
      }
      if (c1 < 0) return { valid: false, reason: 'Không tìm thấy nhóm chứa Q1' };
      const q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const dist = Math.abs(q1 * 10 - Math.floor(q1 * 10) - 0.5);
      if (dist > 1e-9 && dist < 0.025) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5 } = params;
      const contexts = [
        { title: 'cân nặng (đơn vị: kg) và số người', row1: 'Cân nặng (đơn vị: kg)', row2: 'Số người' },
        { title: 'chiều cao (đơn vị: cm) và số học sinh', row1: 'Chiều cao (đơn vị: cm)', row2: 'Số học sinh' },
        { title: 'khoảng tuổi và số khách hàng', row1: 'Khoảng tuổi', row2: 'Số khách hàng' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const freqs = [n1, n2, n3, n4, n5];
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const N = n1 + n2 + n3 + n4 + n5;
      const p1 = N / 4;
      let s = 0, c1 = 0, F1 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p1) { c1 = i; F1 = s; break; }
        s += freqs[i];
      }
      const L1 = a0 + c1 * h;
      const f1 = freqs[c1];
      const q1Frac = u.simplifyFrac(L1 * 4 * f1 + (N - 4 * F1) * h, 4 * f1);
      const rounded = Math.floor((20 * q1Frac.num + q1Frac.den) / (2 * q1Frac.den)) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Tìm tứ phân vị thứ nhất $Q_1$ của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tổng tần số là $N = ' + N + '$. Vị trí của $Q_1$ ứng với $\\frac{N}{4} = ' + fmtDec(p1) + '$, thuộc nhóm thứ $' + (c1 + 1) + '$ ($' + intervals[c1] + '$).',
          'Ta có $a_m = ' + L1 + '$, $cf = ' + F1 + '$, $n_m = ' + f1 + '$, $h = ' + h + '$.',
          'Vậy $Q_1 = ' + L1 + ' + \\frac{' + fmtDec(p1) + ' - ' + F1 + '}{' + f1 + '} \\cdot ' + h + ' = ' + q1Frac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0: 44, h: 8, n1: 23, n2: 0, n3: 35, n4: 15, n5: 21 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 Cân nặng [44;84), f=[23,11,35,15,21], Q1=54,4', params: { ctxIdx: 0, a0: 44, h: 8, n1: 23, n2: 11, n3: 35, n4: 15, n5: 21 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10 - SA): Tính Q2 bảng 6 lớp nguyên (làm tròn đến hàng phần mười)
  t11_b9_d10_q2_6classes_sa: {
    id: 't11_b9_d10_q2_6classes_sa',
    name: 'Tính tứ phân vị thứ hai Q2 (bảng 6 lớp nguyên, làm tròn hàng phần mười)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tứ phân vị mẫu số liệu ghép nhóm',
    description: 'Cho bảng ghép nhóm 6 lớp độ rộng nguyên. Tính tứ phân vị thứ hai Q2 (làm tròn kết quả đến hàng phần mười).',
    conditionSummary: 'Đầu mút dương, h >= 2, 6 tần số dương, tránh ranh giới làm tròn 0,05 không chính xác',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Cân nặng, 1:Chiều cao, 2:Doanh thu)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút đầu', min: 25, max: 60 },
      { name: 'h', label: 'Độ rộng lớp h', min: 4, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 5, max: 35 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 5, max: 38 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 1, max: 25 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 6, max: 32 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 4, max: 25 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 5, max: 32 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, n6 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0 <= 0 || a0 > 180 || h < 2 || h > 30) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      if (freqs.some((f) => f <= 0 || f > 80)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 80]' };
      }
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const p2 = N / 2;
      let s = 0, c2 = -1, F2 = 0;
      for (let i = 0; i < 6; i++) {
        if (s + freqs[i] >= p2) { c2 = i; F2 = s; break; }
        s += freqs[i];
      }
      if (c2 < 0) return { valid: false, reason: 'Không tìm thấy nhóm chứa Q2' };
      const q2 = a0 + c2 * h + ((p2 - F2) / freqs[c2]) * h;
      const dist = Math.abs(q2 * 10 - Math.floor(q2 * 10) - 0.5);
      if (dist > 1e-9 && dist < 0.025) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, n6 } = params;
      const contexts = [
        { title: 'cân nặng (đơn vị: kg) và số người', row1: 'Cân nặng (đơn vị: kg)', row2: 'Số người' },
        { title: 'chiều cao (đơn vị: cm) và số học sinh', row1: 'Chiều cao (đơn vị: cm)', row2: 'Số học sinh' },
        { title: 'doanh thu (đơn vị: triệu đồng) và số ngày', row1: 'Doanh thu (triệu đồng)', row2: 'Số ngày' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const freqs = [n1, n2, n3, n4, n5, n6];
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const p2 = N / 2;
      let s = 0, c2 = 0, F2 = 0;
      for (let i = 0; i < 6; i++) {
        if (s + freqs[i] >= p2) { c2 = i; F2 = s; break; }
        s += freqs[i];
      }
      const L2 = a0 + c2 * h;
      const f2 = freqs[c2];
      const q2Frac = u.simplifyFrac(L2 * 2 * f2 + (N - 2 * F2) * h, 2 * f2);
      const rounded = Math.floor((20 * q2Frac.num + q2Frac.den) / (2 * q2Frac.den)) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Tìm tứ phân vị thứ hai $Q_2$ của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tổng tần số là $N = ' + N + '$. Vị trí của $Q_2$ ứng với $\\frac{N}{2} = ' + fmtDec(p2) + '$, thuộc nhóm thứ $' + (c2 + 1) + '$ ($' + intervals[c2] + '$).',
          'Ta có $a_m = ' + L2 + '$, $cf = ' + F2 + '$, $n_m = ' + f2 + '$, $h = ' + h + '$.',
          'Vậy $Q_2 = ' + L2 + ' + \\frac{' + fmtDec(p2) + ' - ' + F2 + '}{' + f2 + '} \\cdot ' + h + ' = ' + q2Frac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0: 42, h: 9, n1: 21, n2: 33, n3: 0, n4: 26, n5: 13, n6: 28 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 Cân nặng [42;96), f=[21,33,1,26,13,28], Q2=71,1', params: { ctxIdx: 0, a0: 42, h: 9, n1: 21, n2: 33, n3: 1, n4: 26, n5: 13, n6: 28 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11 - SA): Tính Q3 bảng 6 lớp nguyên (làm tròn đến hàng phần mười)
  t11_b9_d11_q3_6classes_sa: {
    id: 't11_b9_d11_q3_6classes_sa',
    name: 'Tính tứ phân vị thứ ba Q3 (bảng 6 lớp nguyên, làm tròn hàng phần mười)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tứ phân vị mẫu số liệu ghép nhóm',
    description: 'Cho bảng ghép nhóm 6 lớp độ rộng nguyên. Tính tứ phân vị thứ ba Q3 (làm tròn kết quả đến hàng phần mười).',
    conditionSummary: 'Đầu mút dương, h >= 1, 6 tần số dương, làm tròn chính xác nửa lên đến hàng phần mười',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Chạy bộ, 1:Thời gian đọc sách, 2:Số bước chân)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút đầu', min: 1, max: 20 },
      { name: 'h', label: 'Độ rộng lớp h', min: 1, max: 6 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 15 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 15 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 15 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 15 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 1, max: 12 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 2, max: 15 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, n6 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0 <= 0 || a0 > 120 || h < 1 || h > 20) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      if (freqs.some((f) => f <= 0 || f > 60)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 60]' };
      }
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const p3 = (3 * N) / 4;
      let s = 0, c3 = -1, F3 = 0;
      for (let i = 0; i < 6; i++) {
        if (s + freqs[i] >= p3) { c3 = i; F3 = s; break; }
        s += freqs[i];
      }
      if (c3 < 0) return { valid: false, reason: 'Không tìm thấy nhóm chứa Q3' };
      const q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const dist = Math.abs(q3 * 10 - Math.floor(q3 * 10) - 0.5);
      // Allow exact .x5 (e.g. 5.75 -> 5.8) while blocking floating-point ambiguity just off 0.5
      if (dist > 1e-9 && dist < 0.025) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, n6 } = params;
      const contexts = [
        { title: 'quãng đường chạy bộ (đơn vị: km) và số ngày chạy bộ', row1: 'Quãng đường chạy bộ (đơn vị: km)', row2: 'Số ngày chạy bộ' },
        { title: 'thời gian tự học (giờ/tuần) và số học sinh', row1: 'Thời gian (giờ/tuần)', row2: 'Số học sinh' },
        { title: 'lượng nước tiêu thụ (lít/ngày) và số người', row1: 'Lượng nước (lít/ngày)', row2: 'Số người' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const freqs = [n1, n2, n3, n4, n5, n6];
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const p3 = (3 * N) / 4;
      let s = 0, c3 = 0, F3 = 0;
      for (let i = 0; i < 6; i++) {
        if (s + freqs[i] >= p3) { c3 = i; F3 = s; break; }
        s += freqs[i];
      }
      const L3 = a0 + c3 * h;
      const f3 = freqs[c3];
      const q3Frac = u.simplifyFrac(L3 * 4 * f3 + (3 * N - 4 * F3) * h, 4 * f3);
      const rounded = Math.floor((20 * q3Frac.num + q3Frac.den) / (2 * q3Frac.den)) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Tìm tứ phân vị thứ ba $Q_3$ của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tổng tần số là $N = ' + N + '$. Vị trí của $Q_3$ ứng với $\\frac{3N}{4} = ' + fmtDec(p3) + '$, thuộc nhóm thứ $' + (c3 + 1) + '$ ($' + intervals[c3] + '$).',
          'Ta có $a_m = ' + L3 + '$, $cf = ' + F3 + '$, $n_m = ' + f3 + '$, $h = ' + h + '$.',
          'Vậy $Q_3 = ' + L3 + ' + \\frac{' + fmtDec(p3) + ' - ' + F3 + '}{' + f3 + '} \\cdot ' + h + ' = ' + q3Frac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0: 1, h: 1, n1: 3, n2: 5, n3: 8, n4: 8, n5: 0, n6: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 Chạy bộ [1;7), f=[3,5,8,8,1,8], Q3=5,8', params: { ctxIdx: 0, a0: 1, h: 1, n1: 3, n2: 5, n3: 8, n4: 8, n5: 1, n6: 8 }, expectedValid: true },
    ],
  },
};
