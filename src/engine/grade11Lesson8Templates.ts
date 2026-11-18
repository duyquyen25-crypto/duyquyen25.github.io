import { MathTemplate } from '../types/math';

export const G11_B8_MC_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 1 (Q1 - MC): Tính giá trị đại diện của một nhóm trong bảng độ tuổi / thời gian (6 lớp)
  t11_b8_d01_midpoint_age_mc: {
    id: 't11_b8_d01_midpoint_age_mc',
    name: 'Tính giá trị đại diện của một nhóm trong bảng độ tuổi (6 lớp)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giá trị đại diện của nhóm số liệu',
    description:
      'Cho bảng tần số ghép nhóm 6 lớp về độ tuổi / thời gian. Tính giá trị đại diện c_i = (a_i + b_i)/2 của một nhóm được chỉ định.',
    conditionSummary: 'Đầu mút nguyên dương, độ rộng h >= 2, chỉ số nhóm targetIdx trong 0..5, tần số dương',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh bảng (0:Khách hàng, 1:Nhân viên, 2:Hội viên)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút trái đầu tiên', min: 12, max: 30 },
      { name: 'h', label: 'Độ rộng mỗi nhóm h', min: 4, max: 12 },
      { name: 'targetIdx', label: 'Nhóm cần tính (0..5)', min: 0, max: 5 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 25 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 25 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 25 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 25 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 25 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 2, max: 25 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, targetIdx, n1, n2, n3, n4, n5, n6 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (!Number.isInteger(targetIdx) || targetIdx < 0 || targetIdx > 5) {
        return { valid: false, reason: 'Chỉ số nhóm phải nằm trong 0..5' };
      }
      if (a0 <= 0 || a0 > 120 || h < 2 || h > 30) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi hợp lệ' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      if (freqs.some((f) => f <= 0 || f > 80)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 80]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, targetIdx, n1, n2, n3, n4, n5, n6 } = params;
      const contexts = [
        { title: 'độ tuổi và số lượng khách hàng của một cửa hàng', row1: 'Khoảng tuổi', row2: 'Số người' },
        { title: 'độ tuổi và số nhân viên của một công ty', row1: 'Khoảng tuổi', row2: 'Số nhân viên' },
        { title: 'độ tuổi và số hội viên câu lạc bộ', row1: 'Khoảng tuổi', row2: 'Số hội viên' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const freqs = [n1, n2, n3, n4, n5, n6];
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const a = a0 + targetIdx * h;
      const b = a + h;
      const mid = (a + b) / 2;
      const halfMid = mid / 2;
      const correct = '$' + fmtDec(mid) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + fmtDec(halfMid) + '$', '$' + b + '$', '$' + a + '$'],
        rng,
        (step) => '$' + fmtDec(mid + step * 1.5) + '$'
      );
      return {
        stem:
          'Cho bảng số liệu ghép nhóm về ' +
          ctx.title +
          ' như sau. Tính giá trị đại diện của nhóm $[' +
          a +
          ';' +
          b +
          ')$.',
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
          'Nhóm $[' + a + '; ' + b + ')$ có đầu mút trái $a = ' + a + '$ và đầu mút phải $b = ' + b + '$.',
          'Giá trị đại diện của nhóm là $\\frac{' + a + ' + ' + b + '}{2} = ' + fmtDec(mid) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0: 16, h: 9, targetIdx: 2, n1: 0, n2: 6, n3: 15, n4: 3, n5: 10, n6: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 Tuổi [16;70), nhóm [34;43) -> 38,5', params: { ctxIdx: 0, a0: 16, h: 9, targetIdx: 2, n1: 2, n2: 6, n3: 15, n4: 3, n5: 10, n6: 10 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2 - MC): Tính giá trị đại diện của một nhóm trong bảng chỉ số đo lường (cân nặng/chiều cao/quãng đường, 6 lớp)
  t11_b8_d02_midpoint_weight_mc: {
    id: 't11_b8_d02_midpoint_weight_mc',
    name: 'Tính giá trị đại diện của một nhóm trong bảng đo lường (6 lớp)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giá trị đại diện của nhóm số liệu',
    description:
      'Cho mẫu số liệu ghép nhóm 6 lớp về chỉ số đo lường (cân nặng, chiều cao, quãng đường). Tính giá trị đại diện của nhóm chỉ định.',
    conditionSummary: 'Đầu mút nguyên dương, độ rộng h >= 2, chỉ số nhóm targetIdx trong 0..5, tần số dương',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh bảng (0:Cân nặng, 1:Chiều cao, 2:Quãng đường)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút trái đầu tiên', min: 20, max: 50 },
      { name: 'h', label: 'Độ rộng mỗi nhóm h', min: 4, max: 12 },
      { name: 'targetIdx', label: 'Nhóm cần tính (0..5)', min: 0, max: 5 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 28 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 28 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 28 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 28 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 28 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 2, max: 28 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, targetIdx, n1, n2, n3, n4, n5, n6 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (!Number.isInteger(targetIdx) || targetIdx < 0 || targetIdx > 5) {
        return { valid: false, reason: 'Chỉ số nhóm phải nằm trong 0..5' };
      }
      if (a0 <= 0 || a0 > 180 || h < 2 || h > 30) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi hợp lệ' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      if (freqs.some((f) => f <= 0 || f > 80)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 80]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, targetIdx, n1, n2, n3, n4, n5, n6 } = params;
      const contexts = [
        { title: 'cân nặng (đơn vị: kg) và số người', row1: 'Cân nặng (đơn vị: kg)', row2: 'Số người' },
        { title: 'chiều cao (đơn vị: cm) và số học sinh', row1: 'Chiều cao (đơn vị: cm)', row2: 'Số học sinh' },
        { title: 'quãng đường di chuyển (đơn vị: km) và số chuyến xe', row1: 'Quãng đường (đơn vị: km)', row2: 'Số chuyến xe' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const freqs = [n1, n2, n3, n4, n5, n6];
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const a = a0 + targetIdx * h;
      const b = a + h;
      const mid = (a + b) / 2;
      const halfMid = mid / 2;
      const correct = '$' + fmtDec(mid) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + a + '$', '$' + fmtDec(halfMid) + '$', '$' + b + '$'],
        rng,
        (step) => '$' + fmtDec(mid + step * 2.5) + '$'
      );
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như sau. Tính giá trị đại diện của nhóm $[' +
          a +
          ';' +
          b +
          ')$.',
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
          'Nhóm $[' + a + '; ' + b + ')$ có đầu mút trái là $' + a + '$ và đầu mút phải là $' + b + '$.',
          'Giá trị đại diện của nhóm là $\\frac{' + a + ' + ' + b + '}{2} = ' + fmtDec(mid) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên độ rộng h = 1', params: { ctxIdx: 0, a0: 35, h: 1, targetIdx: 3, n1: 19, n2: 9, n3: 12, n4: 22, n5: 3, n6: 12 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 Cân nặng [35;77), nhóm [56;63) -> 59,5', params: { ctxIdx: 0, a0: 35, h: 7, targetIdx: 3, n1: 19, n2: 9, n3: 12, n4: 22, n5: 3, n6: 12 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3 - MC): Tính số trung bình cộng của mẫu số liệu ghép nhóm (bảng 6 lớp)
  t11_b8_d03_mean_table_mc: {
    id: 't11_b8_d03_mean_table_mc',
    name: 'Tính số trung bình của mẫu số liệu ghép nhóm (bảng 6 lớp)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Số trung bình của mẫu số liệu ghép nhóm',
    description:
      'Cho bảng tần số ghép nhóm 6 lớp (ví dụ điểm số, thời gian). Xác định 6 giá trị đại diện và tính số trung bình cộng làm tròn đến hàng phần trăm.',
    conditionSummary: 'Đầu mút đầu >= 0, độ rộng h >= 1, 6 tần số dương, làm tròn nửa lên chính xác đến hàng phần trăm',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh bảng (0:Điểm số, 1:Thời gian, 2:Lương)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút trái đầu tiên', min: 0, max: 10 },
      { name: 'h', label: 'Độ rộng mỗi nhóm h', min: 2, max: 6 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 1, max: 15 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 1, max: 15 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 1, max: 15 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 1, max: 15 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 1, max: 15 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 1, max: 15 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, n6 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0 < 0 || a0 > 100 || h < 1 || h > 20) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp vượt phạm vi hợp lệ' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      if (freqs.some((f) => f <= 0 || f > 60)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 60]' };
      }
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      let sumMid2 = 0;
      for (let i = 0; i < 6; i++) sumMid2 += freqs[i] * (2 * a0 + (2 * i + 1) * h);
      const mean = sumMid2 / (2 * N);
      const dist = Math.abs(mean * 100 - Math.floor(mean * 100) - 0.5);
      // Allow exact .xx5 (e.g. 6.125 -> 6.13) while guarding near-boundary floating-point drift
      if (dist > 1e-9 && dist < 0.025) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5, n6 } = params;
      const contexts = [
        { title: 'điểm số và số học sinh', row1: 'Điểm số', row2: 'Số học sinh', ask: 'Tính điểm số trung bình từ mẫu số liệu ghép nhóm trên' },
        { title: 'thời gian giải bài tập (phút) và số học sinh', row1: 'Thời gian (phút)', row2: 'Số học sinh', ask: 'Tính thời gian trung bình từ mẫu số liệu ghép nhóm trên' },
        { title: 'mức thưởng (triệu đồng) và số nhân viên', row1: 'Mức thưởng (triệu đồng)', row2: 'Số nhân viên', ask: 'Tính mức thưởng trung bình từ mẫu số liệu ghép nhóm trên' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5, n6];
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const mids = [0, 1, 2, 3, 4, 5].map((i) => a0 + (i + 0.5) * h);
      const N = n1 + n2 + n3 + n4 + n5 + n6;

      let sumMid2 = 0;
      for (let i = 0; i < 6; i++) sumMid2 += freqs[i] * (2 * a0 + (2 * i + 1) * h);
      const meanFrac = u.simplifyFrac(sumMid2, 2 * N);
      const meanRound = Math.floor((200 * meanFrac.num + meanFrac.den) / (2 * meanFrac.den)) / 100;
      const correct = '$' + fmt2(meanRound) + '$';

      // Distractors: midpoint of full range (a0+3h), mean using left endpoints (meanRound - h/2), and mean - 2.13 / mean - h
      const midRange = a0 + 3 * h;
      const leftMean = Math.max(0.25, Math.round((meanRound - h / 2) * 100) / 100);
      const shiftedDown = Math.max(0.25, Math.round((meanRound - 2.13) * 100) / 100);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + fmt2(midRange) + '$', '$' + fmt2(leftMean) + '$', '$' + fmt2(shiftedDown) + '$'],
        rng,
        (step) => '$' + fmt2(Math.max(0.25, Math.round((meanRound + step * 0.75) * 100) / 100)) + '$'
      );

      const sumExpr = mids.map((m, i) => fmtDec(m) + ' \\cdot ' + freqs[i]).join(' + ');
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như sau. ' +
          ctx.ask +
          ' (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: '$\\overline{x} \\approx ' + fmt2(meanRound) + '$',
        solutionSteps: [
          'Các giá trị đại diện của các nhóm lần lượt là: $' + mids.map(fmtDec).join('$; $') + '$.',
          'Tổng tần số của mẫu số liệu là: $n = ' + N + '$.',
          'Số trung bình của mẫu số liệu ghép nhóm là: $\\overline{x} = \\frac{' + sumExpr + '}{' + N + '} = ' + meanFrac.latex + ' \\approx ' + fmt2(meanRound) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0: 0, h: 2, n1: 0, n2: 7, n3: 3, n4: 8, n5: 5, n6: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 Điểm số [0;12), f=[4,7,3,8,5,5], xbar=6,13', params: { ctxIdx: 0, a0: 0, h: 2, n1: 4, n2: 7, n3: 3, n4: 8, n5: 5, n6: 5 }, expectedValid: true },
    ],
  },
};

export const G11_B8_MC_LIST: MathTemplate[] = Object.values(G11_B8_MC_TEMPLATES);
