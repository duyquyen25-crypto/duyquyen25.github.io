import { MathTemplate } from '../types/math';

export const G11_B9_TF_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 6 (Q6 - TF): Giá trị đại diện, số trung bình, Q1, Q3 của bảng cân nặng 5 lớp
  t11_b9_d06_midpoint_mean_q1_q3_tf: {
    id: 't11_b9_d06_midpoint_mean_q1_q3_tf',
    name: 'Đánh giá đúng sai về giá trị đại diện, số trung bình, Q1 và Q3 (bảng 5 lớp)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Số trung bình và tứ phân vị mẫu ghép nhóm',
    description:
      'Cho bảng ghép nhóm 5 lớp độ rộng nguyên. Xét tính đúng sai của 4 khẳng định về giá trị đại diện nhóm, số trung bình cộng, Q1 và Q3 (làm tròn đến hàng phần trăm).',
    conditionSummary: 'Đầu mút dương, h >= 3, tần số các nhóm dương, tránh ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Cân nặng, 1:Chiều cao, 2:Tuổi)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút đầu', min: 25, max: 60 },
      { name: 'h', label: 'Độ rộng lớp h', min: 4, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 5, max: 25 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 10, max: 40 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 6, max: 30 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 8, max: 30 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 5, max: 20 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, mode } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2 || !Number.isInteger(mode) || mode < 0 || mode > 3) {
        return { valid: false, reason: 'Tham số chế độ hoặc ngữ cảnh không hợp lệ' };
      }
      if (a0 <= 0 || a0 > 180 || h < 3 || h > 25) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      if (freqs.some((f) => f <= 0 || f > 80)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 80]' };
      }
      const N = n1 + n2 + n3 + n4 + n5;
      let sumMid = 0;
      for (let i = 0; i < 5; i++) sumMid += freqs[i] * (a0 + (i + 0.5) * h);
      const mean = sumMid / N;
      const p1 = N / 4, p3 = (3 * N) / 4;
      let s = 0, c1 = -1, c3 = -1, F1 = 0, F3 = 0;
      for (let i = 0; i < 5; i++) {
        if (c1 < 0 && s + freqs[i] >= p1) { c1 = i; F1 = s; }
        if (c3 < 0 && s + freqs[i] >= p3) { c3 = i; F3 = s; }
        s += freqs[i];
      }
      if (c1 < 0 || c3 < 0 || c1 >= c3) {
        return { valid: false, reason: 'Q1 và Q3 phải nằm ở hai nhóm phân biệt' };
      }
      const q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      for (const v of [mean, q1, q3]) {
        if (Math.abs(v * 100 - Math.floor(v * 100) - 0.5) < 0.03) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, mode } = params;
      const contexts = [
        { title: 'cân nặng (đơn vị: kg) và số người', row1: 'Cân nặng (đơn vị: kg)', row2: 'Số người' },
        { title: 'chiều cao (đơn vị: cm) và số học sinh', row1: 'Chiều cao (đơn vị: cm)', row2: 'Số học sinh' },
        { title: 'độ tuổi và số lao động', row1: 'Độ tuổi', row2: 'Số lao động' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt1 = (v) => v.toFixed(1).replace('.', ',');
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const N = n1 + n2 + n3 + n4 + n5;

      const lastMid = a0 + 4.5 * h;
      let sumMid2 = 0;
      for (let i = 0; i < 5; i++) sumMid2 += freqs[i] * (2 * a0 + (2 * i + 1) * h);
      const meanFrac = u.simplifyFrac(sumMid2, 2 * N);
      const meanR = Math.round(meanFrac.value * 100) / 100;

      const p1 = N / 4, p3 = (3 * N) / 4;
      let s = 0, c1 = 0, c3 = 0, F1 = 0, F3 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p1 && c1 === 0 && F1 === 0 && (i === 0 || s < p1)) { c1 = i; F1 = s; }
        if (s + freqs[i] >= p3 && (i === 0 || s < p3)) { c3 = i; F3 = s; }
        s += freqs[i];
      }
      const L1 = a0 + c1 * h, L3 = a0 + c3 * h;
      const f1 = freqs[c1], f3 = freqs[c3];
      const q1Frac = u.simplifyFrac(L1 * 4 * f1 + (N - 4 * F1) * h, 4 * f1);
      const q3Frac = u.simplifyFrac(L3 * 4 * f3 + (3 * N - 4 * F3) * h, 4 * f3);
      const q1R = Math.round(q1Frac.value * 100) / 100;
      const q3R = Math.round(q3Frac.value * 100) / 100;

      // mode=0 reproduces canonical Q6: Đ - S - Đ - S
      const patterns = [
        [true, false, true, false],
        [false, true, true, false],
        [true, true, false, true],
        [false, true, false, true],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode] || patterns[0];

      const shownMid = aTrue ? lastMid : lastMid + 2.5;
      const shownMean = bTrue ? meanR : Math.round((meanR + 0.2) * 100) / 100;
      const shownQ1 = cTrue ? q1R : Math.round((q1R + 1.4) * 100) / 100;
      const shownQ3 = dTrue ? q3R : Math.round((q3R + 0.7) * 100) / 100;

      const tfStatements = [
        { key: 'a', text: 'Giá trị đại diện của nhóm $' + intervals[4] + '$ là $' + fmt1(shownMid) + '$.', isTrue: aTrue },
        { key: 'b', text: 'Số trung bình cộng của mẫu số liệu ghép nhóm đã cho bằng $' + fmt2(shownMean) + '$ (làm tròn đến hàng phần trăm).', isTrue: bTrue },
        { key: 'c', text: 'Tứ phân vị thứ nhất $Q_1$ của mẫu số liệu ghép nhóm đã cho bằng $' + fmt2(shownQ1) + '$ (làm tròn đến hàng phần trăm).', isTrue: cTrue },
        { key: 'd', text: 'Tứ phân vị thứ ba $Q_3$ của mẫu số liệu ghép nhóm đã cho bằng $' + fmt2(shownQ3) + '$ (làm tròn đến hàng phần trăm).', isTrue: dTrue },
      ];
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ') ' + (st.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Giá trị đại diện nhóm $' + intervals[4] + '$ là $\\frac{' + (a0 + 4 * h) + ' + ' + (a0 + 5 * h) + '}{2} = ' + fmt1(lastMid) + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' Tổng tần số $N = ' + N + '$, số trung bình là $\\overline{x} = ' + meanFrac.latex + ' \\approx ' + fmt2(meanR) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\frac{N}{4} = ' + fmtDec(p1) + '$ thuộc nhóm $' + intervals[c1] + ' \\Rightarrow Q_1 = ' + L1 + ' + \\frac{' + fmtDec(p1) + ' - ' + F1 + '}{' + f1 + '} \\cdot ' + h + ' = ' + q1Frac.latex + ' \\approx ' + fmt2(q1R) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\frac{3N}{4} = ' + fmtDec(p3) + '$ thuộc nhóm $' + intervals[c3] + ' \\Rightarrow Q_3 = ' + L3 + ' + \\frac{' + fmtDec(p3) + ' - ' + F3 + '}{' + f3 + '} \\cdot ' + h + ' = ' + q3Frac.latex + ' \\approx ' + fmt2(q3R) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Q1 và Q3 cùng lớp', params: { ctxIdx: 0, a0: 43, h: 8, n1: 80, n2: 5, n3: 3, n4: 2, n5: 3, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 Cân nặng [43;83), f=[10,35,14,24,10], Đ-S-Đ-S', params: { ctxIdx: 0, a0: 43, h: 8, n1: 10, n2: 35, n3: 14, n4: 24, n5: 10, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7 - TF): Mốt M_o, số trung bình, Q1, Q3 của bảng lương 5 lớp
  t11_b9_d07_mode_mean_q1_q3_tf: {
    id: 't11_b9_d07_mode_mean_q1_q3_tf',
    name: 'Đánh giá đúng sai về mốt, số trung bình, Q1 và Q3 (bảng lương 5 lớp)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Mốt, số trung bình và tứ phân vị',
    description:
      'Cho bảng ghép nhóm 5 lớp độ rộng nguyên. Xét tính đúng sai của 4 khẳng định về mốt, số trung bình cộng, Q1 và Q3 (làm tròn đến hàng phần trăm).',
    conditionSummary: 'Đầu mút dương, h >= 2, tần số các nhóm dương, công thức mốt có mẫu dương, tránh ranh giới 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Lương, 1:Thu nhập, 2:Năng suất)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút đầu', min: 6, max: 25 },
      { name: 'h', label: 'Độ rộng lớp h', min: 3, max: 8 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 18 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 4, max: 20 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 16 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 1, max: 14 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 18 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, mode } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2 || !Number.isInteger(mode) || mode < 0 || mode > 3) {
        return { valid: false, reason: 'Tham số chế độ hoặc ngữ cảnh không hợp lệ' };
      }
      if (a0 <= 0 || a0 > 120 || h < 2 || h > 20) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      if (freqs.some((f) => f <= 0 || f > 60)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 60]' };
      }
      const maxFreq = Math.max(...freqs);
      const k = freqs.indexOf(maxFreq);
      const nPrev = k === 0 ? 0 : freqs[k - 1];
      const nNext = k === 4 ? 0 : freqs[k + 1];
      const mDenom = (maxFreq - nPrev) + (maxFreq - nNext);
      if (mDenom <= 0) return { valid: false, reason: 'Nhóm chứa mốt suy biến' };
      const mo = a0 + k * h + ((maxFreq - nPrev) / mDenom) * h;

      const N = n1 + n2 + n3 + n4 + n5;
      let sumMid = 0;
      for (let i = 0; i < 5; i++) sumMid += freqs[i] * (a0 + (i + 0.5) * h);
      const mean = sumMid / N;

      const p1 = N / 4, p3 = (3 * N) / 4;
      let s = 0, c1 = -1, c3 = -1, F1 = 0, F3 = 0;
      for (let i = 0; i < 5; i++) {
        if (c1 < 0 && s + freqs[i] >= p1) { c1 = i; F1 = s; }
        if (c3 < 0 && s + freqs[i] >= p3) { c3 = i; F3 = s; }
        s += freqs[i];
      }
      if (c1 < 0 || c3 < 0 || c1 >= c3) return { valid: false, reason: 'Q1 và Q3 phải nằm ở hai nhóm phân biệt' };
      const q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;

      for (const v of [mo, mean, q1, q3]) {
        if (Math.abs(v * 100 - Math.floor(v * 100) - 0.5) < 0.03) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, mode } = params;
      const contexts = [
        { title: 'lương (đơn vị: triệu đồng) và số nhân viên', row1: 'Lương (đơn vị: triệu đồng)', row2: 'Số nhân viên' },
        { title: 'thu nhập (đơn vị: triệu đồng/tháng) và số hộ', row1: 'Thu nhập (triệu đồng)', row2: 'Số hộ' },
        { title: 'năng suất lúa (tạ/ha) và số thửa ruộng', row1: 'Năng suất (tạ/ha)', row2: 'Số thửa ruộng' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const N = n1 + n2 + n3 + n4 + n5;

      const maxFreq = Math.max(...freqs);
      const k = freqs.indexOf(maxFreq);
      const nPrev = k === 0 ? 0 : freqs[k - 1];
      const nNext = k === 4 ? 0 : freqs[k + 1];
      const mDenom = (maxFreq - nPrev) + (maxFreq - nNext);
      const um = a0 + k * h;
      const moFrac = u.simplifyFrac(um * mDenom + (maxFreq - nPrev) * h, mDenom);
      const moR = Math.round(moFrac.value * 100) / 100;

      const allModalValues = new Set();
      for (let i = 0; i < 5; i++) {
        if (freqs[i] === maxFreq) {
          const ap = i === 0 ? 0 : freqs[i - 1];
          const an = i === 4 ? 0 : freqs[i + 1];
          const ad = (freqs[i] - ap) + (freqs[i] - an);
          if (ad > 0) allModalValues.add(Math.round((a0 + i * h + ((freqs[i] - ap) / ad) * h) * 100) / 100);
        }
      }

      let sumMid2 = 0;
      for (let i = 0; i < 5; i++) sumMid2 += freqs[i] * (2 * a0 + (2 * i + 1) * h);
      const meanFrac = u.simplifyFrac(sumMid2, 2 * N);
      const meanR = Math.round(meanFrac.value * 100) / 100;

      const p1 = N / 4, p3 = (3 * N) / 4;
      let s = 0, c1 = -1, c3 = -1, F1 = 0, F3 = 0;
      for (let i = 0; i < 5; i++) {
        if (c1 < 0 && s + freqs[i] >= p1) { c1 = i; F1 = s; }
        if (c3 < 0 && s + freqs[i] >= p3) { c3 = i; F3 = s; }
        s += freqs[i];
      }
      const L1 = a0 + c1 * h, L3 = a0 + c3 * h;
      const f1 = freqs[c1], f3 = freqs[c3];
      const q1Frac = u.simplifyFrac(L1 * 4 * f1 + (N - 4 * F1) * h, 4 * f1);
      const q3Frac = u.simplifyFrac(L3 * 4 * f3 + (3 * N - 4 * F3) * h, 4 * f3);
      const q1R = Math.round(q1Frac.value * 100) / 100;
      const q3R = Math.round(q3Frac.value * 100) / 100;

      // mode=0 reproduces canonical Q7: Đ - S - S - S
      const patterns = [
        [true, false, false, false],
        [true, true, false, true],
        [false, true, true, false],
        [false, false, true, true],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode] || patterns[0];

      let fakeMo = Math.round((moR + 0.95) * 100) / 100;
      while (allModalValues.has(fakeMo)) fakeMo = Math.round((fakeMo + 0.45) * 100) / 100;

      const shownMo = aTrue ? moR : fakeMo;
      const shownMean = bTrue ? meanR : Math.round((meanR + 0.8) * 100) / 100;
      const shownQ1 = cTrue ? q1R : Math.round((q1R + 0.6) * 100) / 100;
      const shownQ3 = dTrue ? q3R : Math.round((q3R + 0.7) * 100) / 100;

      const tfStatements = [
        { key: 'a', text: 'Giá trị $' + fmt2(shownMo) + '$ là một mốt của mẫu số liệu đã cho.', isTrue: aTrue },
        { key: 'b', text: 'Số trung bình cộng của mẫu số liệu ghép nhóm đã cho bằng $' + fmt2(shownMean) + '$ (làm tròn đến hàng phần trăm).', isTrue: bTrue },
        { key: 'c', text: 'Tứ phân vị thứ nhất $Q_1$ của mẫu số liệu ghép nhóm đã cho bằng $' + fmt2(shownQ1) + '$ (làm tròn đến hàng phần trăm).', isTrue: cTrue },
        { key: 'd', text: 'Tứ phân vị thứ ba $Q_3$ của mẫu số liệu ghép nhóm đã cho bằng $' + fmt2(shownQ3) + '$ (làm tròn đến hàng phần trăm).', isTrue: dTrue },
      ];
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ') ' + (st.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Nhóm thứ $' + (k + 1) + '$ ($' + intervals[k] + '$) có tần số lớn nhất $n_k = ' + maxFreq + '$, nên $M_o = ' + um + ' + \\frac{' + maxFreq + ' - ' + nPrev + '}{(' + maxFreq + ' - ' + nPrev + ') + (' + maxFreq + ' - ' + nNext + ')} \\cdot ' + h + ' = ' + moFrac.latex + ' \\approx ' + fmt2(moR) + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' Tổng tần số $N = ' + N + '$, số trung bình là $\\overline{x} = ' + meanFrac.latex + ' \\approx ' + fmt2(meanR) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\frac{N}{4} = ' + fmtDec(p1) + '$ thuộc nhóm $' + intervals[c1] + ' \\Rightarrow Q_1 = ' + L1 + ' + \\frac{' + fmtDec(p1) + ' - ' + F1 + '}{' + f1 + '} \\cdot ' + h + ' = ' + q1Frac.latex + ' \\approx ' + fmt2(q1R) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\frac{3N}{4} = ' + fmtDec(p3) + '$ thuộc nhóm $' + intervals[c3] + ' \\Rightarrow Q_3 = ' + L3 + ' + \\frac{' + fmtDec(p3) + ' - ' + F3 + '}{' + f3 + '} \\cdot ' + h + ' = ' + q3Frac.latex + ' \\approx ' + fmt2(q3R) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tất cả tần số bằng 0', params: { ctxIdx: 0, a0: 10, h: 4, n1: 0, n2: 0, n3: 0, n4: 0, n5: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 Lương [10;30), f=[13,15,7,1,15], Đ-S-S-S', params: { ctxIdx: 0, a0: 10, h: 4, n1: 13, n2: 15, n3: 7, n4: 1, n5: 15, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8 - TF): Độ dài nhóm, Mốt M_o, Số trung bình, Q3 của bảng lương 5 lớp
  t11_b9_d08_width_mode_mean_q3_tf: {
    id: 't11_b9_d08_width_mode_mean_q3_tf',
    name: 'Đánh giá đúng sai về độ dài nhóm, mốt, số trung bình và Q3 (bảng 5 lớp)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Độ dài nhóm, mốt, số trung bình và tứ phân vị',
    description:
      'Cho bảng ghép nhóm 5 lớp độ rộng nguyên. Xét tính đúng sai của 4 khẳng định về độ dài các nhóm, giá trị mốt, số trung bình cộng và Q3.',
    conditionSummary: 'Đầu mút dương, h >= 2, tần số các nhóm dương, công thức mốt có mẫu dương, tránh ranh giới 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Lương, 1:Doanh thu, 2:Chi phí)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút đầu', min: 5, max: 25 },
      { name: 'h', label: 'Độ rộng lớp h', min: 2, max: 8 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 16 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 4, max: 20 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 3, max: 18 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 5, max: 22 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 3, max: 18 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, mode } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2 || !Number.isInteger(mode) || mode < 0 || mode > 3) {
        return { valid: false, reason: 'Tham số chế độ hoặc ngữ cảnh không hợp lệ' };
      }
      if (a0 <= 0 || a0 > 120 || h < 2 || h > 20) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      if (freqs.some((f) => f <= 0 || f > 60)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 60]' };
      }
      const maxFreq = Math.max(...freqs);
      const k = freqs.indexOf(maxFreq);
      const nPrev = k === 0 ? 0 : freqs[k - 1];
      const nNext = k === 4 ? 0 : freqs[k + 1];
      const mDenom = (maxFreq - nPrev) + (maxFreq - nNext);
      if (mDenom <= 0) return { valid: false, reason: 'Nhóm chứa mốt suy biến' };
      const mo = a0 + k * h + ((maxFreq - nPrev) / mDenom) * h;

      const N = n1 + n2 + n3 + n4 + n5;
      let sumMid = 0;
      for (let i = 0; i < 5; i++) sumMid += freqs[i] * (a0 + (i + 0.5) * h);
      const mean = sumMid / N;

      const p3 = (3 * N) / 4;
      let s = 0, c3 = -1, F3 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p3) { c3 = i; F3 = s; break; }
        s += freqs[i];
      }
      if (c3 < 0) return { valid: false, reason: 'Không tìm thấy nhóm chứa Q3' };
      const q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;

      for (const v of [mo, mean, q3]) {
        if (Math.abs(v * 100 - Math.floor(v * 100) - 0.5) < 0.03) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, mode } = params;
      const contexts = [
        { title: 'lương (đơn vị: triệu đồng) và số nhân viên', row1: 'Lương (đơn vị: triệu đồng)', row2: 'Số nhân viên' },
        { title: 'doanh thu ngày (triệu đồng) và số cửa hàng', row1: 'Doanh thu (triệu đồng)', row2: 'Số cửa hàng' },
        { title: 'chi phí sản xuất (triệu đồng) và số phân xưởng', row1: 'Chi phí (triệu đồng)', row2: 'Số phân xưởng' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const N = n1 + n2 + n3 + n4 + n5;

      const maxFreq = Math.max(...freqs);
      const k = freqs.indexOf(maxFreq);
      const nPrev = k === 0 ? 0 : freqs[k - 1];
      const nNext = k === 4 ? 0 : freqs[k + 1];
      const mDenom = (maxFreq - nPrev) + (maxFreq - nNext);
      const um = a0 + k * h;
      const moFrac = u.simplifyFrac(um * mDenom + (maxFreq - nPrev) * h, mDenom);
      const moR = Math.round(moFrac.value * 100) / 100;

      const allModalValues = new Set();
      for (let i = 0; i < 5; i++) {
        if (freqs[i] === maxFreq) {
          const ap = i === 0 ? 0 : freqs[i - 1];
          const an = i === 4 ? 0 : freqs[i + 1];
          const ad = (freqs[i] - ap) + (freqs[i] - an);
          if (ad > 0) allModalValues.add(Math.round((a0 + i * h + ((freqs[i] - ap) / ad) * h) * 100) / 100);
        }
      }

      let sumMid2 = 0;
      for (let i = 0; i < 5; i++) sumMid2 += freqs[i] * (2 * a0 + (2 * i + 1) * h);
      const meanFrac = u.simplifyFrac(sumMid2, 2 * N);
      const meanR = Math.round(meanFrac.value * 100) / 100;

      const p3 = (3 * N) / 4;
      let s = 0, c3 = 0, F3 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p3) { c3 = i; F3 = s; break; }
        s += freqs[i];
      }
      const L3 = a0 + c3 * h;
      const f3 = freqs[c3];
      const q3Frac = u.simplifyFrac(L3 * 4 * f3 + (3 * N - 4 * F3) * h, 4 * f3);
      const q3R = Math.round(q3Frac.value * 100) / 100;

      // mode=0 reproduces canonical Q8: Đ - Đ - Đ - Đ
      const patterns = [
        [true, true, true, true],
        [true, false, true, false],
        [false, true, false, true],
        [false, false, true, true],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode] || patterns[0];

      let fakeMo = Math.round((moR + 0.85) * 100) / 100;
      while (allModalValues.has(fakeMo)) fakeMo = Math.round((fakeMo + 0.45) * 100) / 100;

      const shownH = aTrue ? h : h + 1;
      const shownMo = bTrue ? moR : fakeMo;
      const shownMean = cTrue ? meanR : Math.round((meanR + 0.75) * 100) / 100;
      const shownQ3 = dTrue ? q3R : Math.round((q3R - 0.9) * 100) / 100;

      const tfStatements = [
        { key: 'a', text: 'Độ dài các nhóm trong mẫu số liệu ghép nhóm bằng $' + shownH + '$.', isTrue: aTrue },
        { key: 'b', text: 'Giá trị $' + fmt2(shownMo) + '$ là một mốt của mẫu số liệu đã cho.', isTrue: bTrue },
        { key: 'c', text: 'Số trung bình cộng của mẫu số liệu ghép nhóm đã cho bằng $' + fmt2(shownMean) + '$ (làm tròn đến hàng phần trăm).', isTrue: cTrue },
        { key: 'd', text: 'Tứ phân vị thứ ba $Q_3$ của mẫu số liệu ghép nhóm đã cho bằng $' + fmt2(shownQ3) + '$ (làm tròn đến hàng phần trăm).', isTrue: dTrue },
      ];
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ') ' + (st.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Độ dài mỗi nhóm là $' + (a0 + h) + ' - ' + a0 + ' = ' + h + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' Nhóm thứ $' + (k + 1) + '$ ($' + intervals[k] + '$) có tần số lớn nhất $n_k = ' + maxFreq + '$, nên $M_o = ' + um + ' + \\frac{' + maxFreq + ' - ' + nPrev + '}{(' + maxFreq + ' - ' + nPrev + ') + (' + maxFreq + ' - ' + nNext + ')} \\cdot ' + h + ' = ' + moFrac.latex + ' \\approx ' + fmt2(moR) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' Tổng tần số $N = ' + N + '$, số trung bình là $\\overline{x} = ' + meanFrac.latex + ' \\approx ' + fmt2(meanR) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\frac{3N}{4} = ' + fmtDec(p3) + '$ thuộc nhóm $' + intervals[c3] + ' \\Rightarrow Q_3 = ' + L3 + ' + \\frac{' + fmtDec(p3) + ' - ' + F3 + '}{' + f3 + '} \\cdot ' + h + ' = ' + q3Frac.latex + ' \\approx ' + fmt2(q3R) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 1 không hợp lệ', params: { ctxIdx: 0, a0: 10, h: 1, n1: 3, n2: 14, n3: 9, n4: 15, n5: 11, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 Lương [10;25), f=[3,14,9,15,11], Đ-Đ-Đ-Đ', params: { ctxIdx: 0, a0: 10, h: 3, n1: 3, n2: 14, n3: 9, n4: 15, n5: 11, mode: 0 }, expectedValid: true },
    ],
  },
};
