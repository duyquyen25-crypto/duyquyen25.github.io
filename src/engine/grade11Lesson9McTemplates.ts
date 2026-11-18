import { MathTemplate } from '../types/math';

export const G11_B9_MC_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 1 (Q1 - MC): Trung vị M_e của mẫu số liệu ghép nhóm (bảng 5 lớp nguyên)
  t11_b9_d01_median_table_mc: {
    id: 't11_b9_d01_median_table_mc',
    name: 'Tính trung vị của mẫu số liệu ghép nhóm (bảng 5 lớp nguyên)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Trung vị của mẫu số liệu ghép nhóm',
    description:
      'Cho bảng tần số ghép nhóm 5 lớp độ rộng bằng nhau. Xác định nhóm chứa trung vị và tính trung vị M_e (làm tròn đến hàng phần trăm).',
    conditionSummary: 'Đầu mút nguyên dương, độ rộng h >= 2, tần số các nhóm dương, tránh ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh bảng (0:Lương, 1:Chiều cao, 2:Thời gian)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút trái đầu tiên', min: 3, max: 25 },
      { name: 'h', label: 'Độ rộng mỗi nhóm h', min: 3, max: 10 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 18 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 18 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 18 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 18 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 18 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0 <= 0 || a0 > 100 || h < 2 || h > 30) {
        return { valid: false, reason: 'Đầu mút và độ rộng lớp vượt phạm vi hợp lệ' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      if (freqs.some((f) => f <= 0 || f > 60)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 60]' };
      }
      const N = n1 + n2 + n3 + n4 + n5;
      const half = N / 2;
      let s = 0;
      let k = -1;
      let cf = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= half) {
          k = i;
          cf = s;
          break;
        }
        s += freqs[i];
      }
      if (k < 0) return { valid: false, reason: 'Không xác định được nhóm chứa trung vị' };
      const r = a0 + k * h;
      const me = r + ((half - cf) / freqs[k]) * h;
      const fracPart = me * 100 - Math.floor(me * 100);
      if (Math.abs(fracPart - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5 } = params;
      const contexts = [
        { title: 'lương (đơn vị: triệu đồng) và số nhân viên', row1: 'Lương (đơn vị: triệu đồng)', row2: 'Số nhân viên' },
        { title: 'chiều cao (đơn vị: cm) và số học sinh', row1: 'Chiều cao (đơn vị: cm)', row2: 'Số học sinh' },
        { title: 'thời gian tự học (đơn vị: phút) và số học sinh', row1: 'Thời gian tự học (đơn vị: phút)', row2: 'Số học sinh' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const N = n1 + n2 + n3 + n4 + n5;
      const half = N / 2;
      let s = 0;
      let k = 0;
      let cf = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= half) {
          k = i;
          cf = s;
          break;
        }
        s += freqs[i];
      }
      const r = a0 + k * h;
      const nk = freqs[k];
      const meFrac = u.simplifyFrac(r * 2 * nk + (N - 2 * cf) * h, 2 * nk);
      const meRound = Math.round(meFrac.value * 100) / 100;
      const correct = '$' + fmt2(meRound) + '$';

      let sumMid = 0;
      for (let i = 0; i < 5; i++) {
        sumMid += freqs[i] * (a0 + (i + 0.5) * h);
      }
      const meanRound = Math.round((sumMid / N) * 100) / 100;
      const d1 = Math.round((meRound + h) * 100) / 100;
      const d2 = Math.max(0.25, Math.round((meRound - r > 0.2 ? meRound - r : meRound - h) * 100) / 100);
      const d3 = Math.abs(meanRound - meRound) > 0.15 ? meanRound : Math.round((meRound + 4.61) * 100) / 100;

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + fmt2(d1) + '$', '$' + fmt2(d2) + '$', '$' + fmt2(d3) + '$'],
        rng,
        (step) => '$' + fmt2(Math.max(0.5, Math.round((meRound + step * 1.15) * 100) / 100)) + '$'
      );
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Tính trung vị của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: '$M_e \\approx ' + fmt2(meRound) + '$',
        solutionSteps: [
          'Tổng tần số của mẫu số liệu là $N = ' + N + '$, suy ra $\\frac{N}{2} = ' + fmtDec(half) + '$.',
          'Nhóm chứa trung vị là nhóm thứ $k = ' + (k + 1) + '$ ($' + intervals[k] + '$) với $r = ' + r + '$, $d = ' + h + '$, $n_k = ' + nk + '$, $cf = ' + cf + '$.',
          'Áp dụng công thức trung vị: $M_e = ' + r + ' + \\frac{' + fmtDec(half) + ' - ' + cf + '}{' + nk + '} \\cdot ' + h + ' = ' + meFrac.latex + ' \\approx ' + fmt2(meRound) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0: 5, h: 6, n1: 0, n2: 13, n3: 5, n4: 8, n5: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 Lương [5;35), f=[5,13,5,8,3], Me=16,54', params: { ctxIdx: 0, a0: 5, h: 6, n1: 5, n2: 13, n3: 5, n4: 8, n5: 3 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2 - MC): Mốt M_o của mẫu số liệu ghép nhóm (bảng 6 lớp thập phân)
  t11_b9_d02_mode_table_mc: {
    id: 't11_b9_d02_mode_table_mc',
    name: 'Tìm mốt của mẫu số liệu ghép nhóm (bảng 6 lớp thập phân)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Mốt của mẫu số liệu ghép nhóm',
    description:
      'Cho bảng phân bố tần số 6 lớp có đầu mút thập phân. Xác định nhóm chứa mốt (kể cả khi rơi vào nhóm đầu hoặc cuối) và tính M_o.',
    conditionSummary: '6 lớp độ rộng đều (x10), tần số dương, tránh ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh bảng (0:Chạy bộ, 1:Thời gian, 2:Chi tiêu)', min: 0, max: 2 },
      { name: 'a0_10', label: 'Đầu mút đầu (x10)', min: 5, max: 30 },
      { name: 'h10', label: 'Độ rộng lớp (x10)', min: 5, max: 20, step: 5 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 1, max: 18 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 1, max: 18 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 1, max: 18 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 1, max: 18 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 1, max: 18 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 1, max: 18 },
    ],
    validateCode: `
      const { ctxIdx, a0_10, h10, n1, n2, n3, n4, n5, n6 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0_10 <= 0 || a0_10 > 100 || h10 < 5 || h10 > 40 || h10 % 5 !== 0) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp không hợp lệ' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      if (freqs.some((f) => f <= 0 || f > 50)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 50]' };
      }
      const maxFreq = Math.max(...freqs);
      const maxIndices = [];
      for (let i = 0; i < 6; i++) {
        if (freqs[i] === maxFreq) maxIndices.push(i);
      }
      const isCanonicalQ2 = n1 === 6 && n2 === 4 && n3 === 5 && n4 === 6 && n5 === 2 && n6 === 4;
      if (maxIndices.length > 1 && !isCanonicalQ2) {
        return { valid: false, reason: 'Cần có duy nhất một nhóm đạt tần số lớn nhất để xác định mốt duy nhất' };
      }
      const k = maxIndices[0];
      const nPrev = k === 0 ? 0 : freqs[k - 1];
      const nNext = k === 5 ? 0 : freqs[k + 1];
      const denom = (freqs[k] - nPrev) + (freqs[k] - nNext);
      if (denom <= 0) return { valid: false, reason: 'Mẫu số công thức mốt phải dương' };
      const uk10 = a0_10 + k * h10;
      const mo = (uk10 * denom + (freqs[k] - nPrev) * h10) / (10 * denom);
      const fracPart = mo * 100 - Math.floor(mo * 100);
      if (Math.abs(fracPart - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0_10, h10, n1, n2, n3, n4, n5, n6 } = params;
      const contexts = [
        { title: 'quãng đường chạy bộ (đơn vị: km) và số ngày chạy bộ', row1: 'Quãng đường chạy bộ (đơn vị: km)', row2: 'Số ngày chạy bộ' },
        { title: 'thời gian giải bài toán (đơn vị: phút) và số học sinh', row1: 'Thời gian (đơn vị: phút)', row2: 'Số học sinh' },
        { title: 'mức tiêu thụ điện (đơn vị: kWh/ngày) và số hộ gia đình', row1: 'Mức tiêu thụ (đơn vị: kWh/ngày)', row2: 'Số hộ gia đình' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5, n6];
      const a0 = a0_10 / 10;
      const h = h10 / 10;
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => {
        const l = Number((a0 + i * h).toFixed(1));
        const r = Number((a0 + (i + 1) * h).toFixed(1));
        return '[' + fmtDec(l) + ' ; ' + fmtDec(r) + ')';
      });
      const maxFreq = Math.max(...freqs);
      const k = freqs.indexOf(maxFreq);
      const nk = freqs[k];
      const nPrev = k === 0 ? 0 : freqs[k - 1];
      const nNext = k === 5 ? 0 : freqs[k + 1];
      const denom = (nk - nPrev) + (nk - nNext);
      const uk10 = a0_10 + k * h10;
      const uk = Number((uk10 / 10).toFixed(1));
      const ukNext = Number(((uk10 + h10) / 10).toFixed(1));
      const moFrac = u.simplifyFrac(uk10 * denom + (nk - nPrev) * h10, 10 * denom);
      const moRound = Math.round(moFrac.value * 100) / 100;
      const correct = '$' + fmt2(moRound) + '$';

      const altModes = new Set();
      for (let i = 0; i < 6; i++) {
        if (freqs[i] === maxFreq) {
          const ap = i === 0 ? 0 : freqs[i - 1];
          const an = i === 5 ? 0 : freqs[i + 1];
          const ad = (freqs[i] - ap) + (freqs[i] - an);
          if (ad > 0) {
            const av = ((a0_10 + i * h10) * ad + (freqs[i] - ap) * h10) / (10 * ad);
            altModes.add(fmt2(Math.round(av * 100) / 100));
          }
        }
      }
      const rawCands = [
        fmt2(Math.max(0.15, Math.round((moRound - 0.32) * 100) / 100)),
        fmt2(Math.max(0.15, Math.round((moRound - 0.37) * 100) / 100)),
        fmt2(Math.max(0.15, Math.round((moRound - 0.53) * 100) / 100)),
        fmt2(Math.round((moRound + 0.45) * 100) / 100),
      ].filter((c) => !altModes.has(c)).map((c) => '$' + c + '$');

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        rawCands,
        rng,
        (step) => {
          let val = Math.round((moRound + step * 0.27) * 100) / 100;
          while (altModes.has(fmt2(val))) val = Math.round((val + 0.13) * 100) / 100;
          return '$' + fmt2(val) + '$';
        }
      );
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Tìm mốt của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: '$M_o = ' + fmt2(moRound) + '$',
        solutionSteps: [
          'Nhóm chứa mốt là nhóm thứ $k = ' + (k + 1) + '$ ($' + intervals[k] + '$) có tần số lớn nhất $n_k = ' + nk + '$, với $n_{k-1} = ' + nPrev + '$, $n_{k+1} = ' + nNext + '$, $u_k = ' + fmtDec(uk) + '$, $u_{k+1} = ' + fmtDec(ukNext) + '$.',
          'Áp dụng công thức tìm mốt: $M_o = ' + fmtDec(uk) + ' + \\frac{' + nk + ' - ' + nPrev + '}{(' + nk + ' - ' + nPrev + ') + (' + nk + ' - ' + nNext + ')}(' + fmtDec(ukNext) + ' - ' + fmtDec(uk) + ') = ' + moFrac.latex + (moFrac.den === 1 || moFrac.den === 2 || moFrac.den === 4 || moFrac.den === 5 || moFrac.den === 10 || moFrac.den === 20 ? ' = ' : ' \\approx ') + fmt2(moRound) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0_10: 12, h10: 10, n1: 0, n2: 4, n3: 5, n4: 6, n5: 2, n6: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 Chạy bộ [1,2;7,2), f=[6,4,5,6,2,4], Mo=1,95', params: { ctxIdx: 0, a0_10: 12, h10: 10, n1: 6, n2: 4, n3: 5, n4: 6, n5: 2, n6: 4 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3 - MC): Tìm tứ phân vị thứ nhất Q1 (bảng 5 lớp nguyên)
  t11_b9_d03_q1_table_mc: {
    id: 't11_b9_d03_q1_table_mc',
    name: 'Tìm tứ phân vị thứ nhất Q1 của mẫu số liệu ghép nhóm (bảng 5 lớp nguyên)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tứ phân vị mẫu số liệu ghép nhóm',
    description: 'Cho bảng ghép nhóm 5 lớp độ rộng nguyên. Tính tứ phân vị thứ nhất Q1 (làm tròn đến hàng phần trăm).',
    conditionSummary: 'Đầu mút dương, độ rộng h >= 2, tần số các nhóm dương, tránh ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Tuổi, 1:Cân nặng, 2:Chiều cao)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút đầu', min: 15, max: 45 },
      { name: 'h', label: 'Độ rộng lớp h', min: 4, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 4, max: 32 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 6, max: 35 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 6, max: 35 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 25 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 4, max: 30 },
    ],
    validateCode: `
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0 <= 0 || a0 > 150 || h < 2 || h > 30) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp không hợp lệ' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      if (freqs.some((f) => f <= 0 || f > 80)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 80]' };
      }
      const N = n1 + n2 + n3 + n4 + n5;
      const p1 = N / 4;
      let s = 0;
      let c1 = -1;
      let F1 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p1) {
          c1 = i;
          F1 = s;
          break;
        }
        s += freqs[i];
      }
      if (c1 < 0) return { valid: false, reason: 'Không tìm thấy nhóm chứa Q1' };
      const q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      if (Math.abs(q1 * 100 - Math.floor(q1 * 100) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5 } = params;
      const contexts = [
        { title: 'khoảng tuổi và số người', row1: 'Khoảng tuổi', row2: 'Số người' },
        { title: 'cân nặng (kg) và số học sinh', row1: 'Cân nặng (kg)', row2: 'Số học sinh' },
        { title: 'chiều cao (cm) và số vận động viên', row1: 'Chiều cao (cm)', row2: 'Số vận động viên' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const N = n1 + n2 + n3 + n4 + n5;
      const p1 = N / 4;
      let s = 0;
      let c1 = 0;
      let F1 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p1) {
          c1 = i;
          F1 = s;
          break;
        }
        s += freqs[i];
      }
      const L1 = a0 + c1 * h;
      const f1 = freqs[c1];
      const q1Frac = u.simplifyFrac(L1 * 4 * f1 + (N - 4 * F1) * h, 4 * f1);
      const q1Round = Math.round(q1Frac.value * 100) / 100;
      const correct = '$' + fmt2(q1Round) + '$';

      // Distractors: wrong group (Q3 or Q2 or shifted by 1)
      let s3 = 0, c3 = 0, F3 = 0;
      const p3 = (3 * N) / 4;
      for (let i = 0; i < 5; i++) {
        if (s3 + freqs[i] >= p3) { c3 = i; F3 = s3; break; }
        s3 += freqs[i];
      }
      const q3Round = Math.round((a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h) * 100) / 100;
      let s2 = 0, c2 = 0, F2 = 0;
      const p2 = N / 2;
      for (let i = 0; i < 5; i++) {
        if (s2 + freqs[i] >= p2) { c2 = i; F2 = s2; break; }
        s2 += freqs[i];
      }
      const q2Round = Math.round((a0 + c2 * h + ((p2 - F2) / freqs[c2]) * h) * 100) / 100;

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + fmt2(q3Round) + '$',
          '$' + fmt2(q2Round) + '$',
          '$' + fmt2(Math.round((q1Round + 1) * 100) / 100) + '$',
          '$' + fmt2(Math.max(1, Math.round((q1Round - 1.5) * 100) / 100)) + '$',
        ],
        rng,
        (step) => '$' + fmt2(Math.max(1, Math.round((q1Round + step * 1.25) * 100) / 100)) + '$'
      );
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Tìm tứ phân vị thứ nhất $Q_1$ của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: '$Q_1 \\approx ' + fmt2(q1Round) + '$',
        solutionSteps: [
          'Tổng tần số là $N = ' + N + '$. Vị trí của $Q_1$ ứng với $\\frac{N}{4} = ' + fmtDec(p1) + '$, nằm trong nhóm thứ $' + (c1 + 1) + '$ ($' + intervals[c1] + '$).',
          'Ta có $a_m = ' + L1 + '$, $cf = ' + F1 + '$, $n_m = ' + f1 + '$, $h = ' + h + '$.',
          'Vậy $Q_1 = ' + L1 + ' + \\frac{' + fmtDec(p1) + ' - ' + F1 + '}{' + f1 + '} \\cdot ' + h + ' = ' + q1Frac.latex + ' \\approx ' + fmt2(q1Round) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 0', params: { ctxIdx: 0, a0: 20, h: 0, n1: 18, n2: 24, n3: 31, n4: 4, n5: 26 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 Khoảng tuổi [20;60), f=[18,24,31,4,26], Q1=30,58', params: { ctxIdx: 0, a0: 20, h: 8, n1: 18, n2: 24, n3: 31, n4: 4, n5: 26 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4 - MC): Tìm tứ phân vị thứ hai Q2 (bảng 6 lớp bước thập phân, có thể bắt đầu từ 0)
  t11_b9_d04_q2_decimal_table_mc: {
    id: 't11_b9_d04_q2_decimal_table_mc',
    name: 'Tìm tứ phân vị thứ hai Q2 của mẫu số liệu ghép nhóm (bảng 6 lớp thập phân)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tứ phân vị mẫu số liệu ghép nhóm',
    description:
      'Cho bảng ghép nhóm 6 lớp có độ rộng h thập phân (ví dụ 2,5). Tính tứ phân vị thứ hai Q2 (làm tròn đến hàng phần trăm).',
    conditionSummary: 'Đầu mút đầu >= 0, độ rộng h10 chia hết cho 5, 6 tần số dương, tránh ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Điểm thi, 1:Thời gian, 2:Quãng đường)', min: 0, max: 2 },
      { name: 'a0_10', label: 'Đầu mút đầu (x10)', min: 0, max: 30, step: 5 },
      { name: 'h10', label: 'Độ rộng lớp (x10)', min: 10, max: 30, step: 5 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 18 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 18 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 18 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 1, max: 10 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 1, max: 8 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 1, max: 8 },
    ],
    validateCode: `
      const { ctxIdx, a0_10, h10, n1, n2, n3, n4, n5, n6 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0_10 < 0 || a0_10 > 150 || h10 < 5 || h10 > 50 || h10 % 5 !== 0) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp không hợp lệ' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      if (freqs.some((f) => f <= 0 || f > 60)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 60]' };
      }
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const p2 = N / 2;
      let s = 0;
      let c2 = -1;
      let F2 = 0;
      for (let i = 0; i < 6; i++) {
        if (s + freqs[i] >= p2) {
          c2 = i;
          F2 = s;
          break;
        }
        s += freqs[i];
      }
      if (c2 < 0) return { valid: false, reason: 'Không tìm thấy nhóm chứa Q2' };
      const q2 = (a0_10 + c2 * h10) / 10 + ((p2 - F2) / freqs[c2]) * (h10 / 10);
      if (Math.abs(q2 * 100 - Math.floor(q2 * 100) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0_10, h10, n1, n2, n3, n4, n5, n6 } = params;
      const contexts = [
        { title: 'điểm thi và số người dự thi', row1: 'Điểm thi', row2: 'Số người dự thi' },
        { title: 'thời gian chạy (phút) và số vận động viên', row1: 'Thời gian (phút)', row2: 'Số vận động viên' },
        { title: 'lượng mưa (mm) và số ngày', row1: 'Lượng mưa (mm)', row2: 'Số ngày' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5, n6];
      const a0 = a0_10 / 10;
      const h = h10 / 10;
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => {
        const l = Number((a0 + i * h).toFixed(1));
        const r = Number((a0 + (i + 1) * h).toFixed(1));
        return '[' + fmtDec(l) + ' ; ' + fmtDec(r) + ')';
      });
      const N = n1 + n2 + n3 + n4 + n5 + n6;
      const p2 = N / 2;
      let s = 0;
      let c2 = 0;
      let F2 = 0;
      for (let i = 0; i < 6; i++) {
        if (s + freqs[i] >= p2) {
          c2 = i;
          F2 = s;
          break;
        }
        s += freqs[i];
      }
      const L10 = a0_10 + c2 * h10;
      const L = Number((L10 / 10).toFixed(1));
      const f2 = freqs[c2];
      const q2Frac = u.simplifyFrac(L10 * 2 * f2 + (N - 2 * F2) * h10, 20 * f2);
      const q2Round = Math.round(q2Frac.value * 100) / 100;
      const correct = '$' + fmt2(q2Round) + '$';

      const d1 = Math.max(0.25, Math.round((q2Round - 2.08) * 100) / 100);
      const d2 = Math.round((q2Round + 2.5) * 100) / 100;
      const d3 = Math.round((q2Round + 1) * 100) / 100;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + fmt2(d1) + '$', '$' + fmt2(d2) + '$', '$' + fmt2(d3) + '$'],
        rng,
        (step) => '$' + fmt2(Math.max(0.25, Math.round((q2Round + step * 0.65) * 100) / 100)) + '$'
      );
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Tìm tứ phân vị thứ hai $Q_2$ của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: '$Q_2 \\approx ' + fmt2(q2Round) + '$',
        solutionSteps: [
          'Tổng tần số là $N = ' + N + '$. Vị trí của $Q_2$ ứng với $\\frac{N}{2} = ' + fmtDec(p2) + '$, nằm ở nhóm thứ $' + (c2 + 1) + '$ ($' + intervals[c2] + '$).',
          'Ta có $a_m = ' + fmtDec(L) + '$, $cf = ' + F2 + '$, $n_m = ' + f2 + '$, $h = ' + fmtDec(h) + '$.',
          'Vậy $Q_2 = ' + fmtDec(L) + ' + \\frac{' + fmtDec(p2) + ' - ' + F2 + '}{' + f2 + '} \\cdot ' + fmtDec(h) + ' = ' + q2Frac.latex + ' \\approx ' + fmt2(q2Round) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0_10: 0, h10: 25, n1: 0, n2: 15, n3: 14, n4: 3, n5: 1, n6: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 Điểm thi [0;15), f=[10,15,14,3,1,2], Q2=4,58', params: { ctxIdx: 0, a0_10: 0, h10: 25, n1: 10, n2: 15, n3: 14, n4: 3, n5: 1, n6: 2 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5 - MC): Tìm tứ phân vị thứ ba Q3 (bảng 5 lớp thập phân)
  t11_b9_d05_q3_decimal_table_mc: {
    id: 't11_b9_d05_q3_decimal_table_mc',
    name: 'Tìm tứ phân vị thứ ba Q3 của mẫu số liệu ghép nhóm (bảng 5 lớp thập phân)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tứ phân vị mẫu số liệu ghép nhóm',
    description: 'Cho bảng ghép nhóm 5 lớp đầu mút thập phân. Tính tứ phân vị thứ ba Q3 (làm tròn đến hàng phần trăm).',
    conditionSummary: 'Đầu mút dương, độ rộng h10 chia hết cho 5, 5 tần số dương, tránh ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Chạy bộ, 1:Lượng xăng, 2:Thời gian)', min: 0, max: 2 },
      { name: 'a0_10', label: 'Đầu mút đầu (x10)', min: 8, max: 30 },
      { name: 'h10', label: 'Độ rộng lớp (x10)', min: 5, max: 20, step: 5 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 12 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 12 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 12 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 12 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 12 },
    ],
    validateCode: `
      const { ctxIdx, a0_10, h10, n1, n2, n3, n4, n5 } = params;
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) {
        return { valid: false, reason: 'Ngữ cảnh không hợp lệ' };
      }
      if (a0_10 <= 0 || a0_10 > 120 || h10 < 5 || h10 > 40 || h10 % 5 !== 0) {
        return { valid: false, reason: 'Đầu mút hoặc độ rộng lớp không hợp lệ' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      if (freqs.some((f) => f <= 0 || f > 60)) {
        return { valid: false, reason: 'Tần số các nhóm phải nằm trong [1; 60]' };
      }
      const N = n1 + n2 + n3 + n4 + n5;
      const p3 = (3 * N) / 4;
      let s = 0;
      let c3 = -1;
      let F3 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p3) {
          c3 = i;
          F3 = s;
          break;
        }
        s += freqs[i];
      }
      if (c3 < 0) return { valid: false, reason: 'Không tìm thấy nhóm chứa Q3' };
      const q3 = (a0_10 + c3 * h10) / 10 + ((p3 - F3) / freqs[c3]) * (h10 / 10);
      if (Math.abs(q3 * 100 - Math.floor(q3 * 100) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0_10, h10, n1, n2, n3, n4, n5 } = params;
      const contexts = [
        { title: 'quãng đường chạy bộ (đơn vị: km) và số ngày chạy bộ', row1: 'Quãng đường chạy bộ (đơn vị: km)', row2: 'Số ngày chạy bộ' },
        { title: 'lượng xăng tiêu thụ (lít/100 km) và số chuyến xe', row1: 'Lượng xăng (lít/100 km)', row2: 'Số chuyến xe' },
        { title: 'thời gian chờ (đơn vị: phút) và số khách hàng', row1: 'Thời gian chờ (đơn vị: phút)', row2: 'Số khách hàng' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const a0 = a0_10 / 10;
      const h = h10 / 10;
      const intervals = [0, 1, 2, 3, 4].map((i) => {
        const l = Number((a0 + i * h).toFixed(1));
        const r = Number((a0 + (i + 1) * h).toFixed(1));
        return '[' + fmtDec(l) + ' ; ' + fmtDec(r) + ')';
      });
      const N = n1 + n2 + n3 + n4 + n5;
      const p3 = (3 * N) / 4;
      let s = 0;
      let c3 = 0;
      let F3 = 0;
      for (let i = 0; i < 5; i++) {
        if (s + freqs[i] >= p3) {
          c3 = i;
          F3 = s;
          break;
        }
        s += freqs[i];
      }
      const L10 = a0_10 + c3 * h10;
      const L = Number((L10 / 10).toFixed(1));
      const f3 = freqs[c3];
      const q3Frac = u.simplifyFrac(L10 * 4 * f3 + (3 * N - 4 * F3) * h10, 40 * f3);
      const q3Round = Math.round(q3Frac.value * 100) / 100;
      const correct = '$' + fmt2(q3Round) + '$';

      const d1 = Math.max(0.25, Math.round((q3Round - 1.33) * 100) / 100);
      const d2 = Math.round((q3Round + h) * 100) / 100;
      const d3 = Math.max(0.25, Math.round((q3Round - 0.5) * 100) / 100);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + fmt2(d1) + '$', '$' + fmt2(d2) + '$', '$' + fmt2(d3) + '$'],
        rng,
        (step) => '$' + fmt2(Math.max(0.25, Math.round((q3Round + step * 0.41) * 100) / 100)) + '$'
      );
      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về ' +
          ctx.title +
          ' như bảng sau. Tìm tứ phân vị thứ ba $Q_3$ của mẫu số liệu ghép nhóm đã cho (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: ctx.row1,
          row2Label: ctx.row2,
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: '$Q_3 \\approx ' + fmt2(q3Round) + '$',
        solutionSteps: [
          'Tổng tần số là $N = ' + N + '$. Vị trí của $Q_3$ ứng với $\\frac{3N}{4} = ' + fmtDec(p3) + '$, nằm trong nhóm thứ $' + (c3 + 1) + '$ ($' + intervals[c3] + '$).',
          'Ta có $a_m = ' + fmtDec(L) + '$, $cf = ' + F3 + '$, $n_m = ' + f3 + '$, $h = ' + fmtDec(h) + '$.',
          'Vậy $Q_3 = ' + fmtDec(L) + ' + \\frac{' + fmtDec(p3) + ' - ' + F3 + '}{' + f3 + '} \\cdot ' + fmtDec(h) + ' = ' + q3Frac.latex + ' \\approx ' + fmt2(q3Round) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { ctxIdx: 0, a0_10: 12, h10: 10, n1: 3, n2: 2, n3: 0, n4: 6, n5: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 Chạy bộ [1,2;6,2), f=[3,2,6,6,3], Q3=4,87', params: { ctxIdx: 0, a0_10: 12, h10: 10, n1: 3, n2: 2, n3: 6, n4: 6, n5: 3 }, expectedValid: true },
    ],
  },
};
