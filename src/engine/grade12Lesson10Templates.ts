import { MathTemplate } from '../types/math';

export const G12_B10_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 10. PHƯƠNG SAI VÀ ĐỘ LỆCH CHUẨN (8 DẠNG BỔ SUNG)
  // =====================================================================

  // Dạng 1 (Q1 - MC): Tính phương sai mẫu số liệu ghép nhóm bảng 6 lớp (làm tròn hàng phần trăm)
  t12_b10_d01_variance_6classes_mc: {
    id: 't12_b10_d01_variance_6classes_mc',
    name: 'Tính phương sai của mẫu số liệu ghép nhóm (bảng 6 lớp, làm tròn phần trăm)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương sai mẫu số liệu ghép nhóm',
    description: 'Cho bảng phân bố ghép nhóm gồm 6 lớp độ rộng h. Tính phương sai S^2 làm tròn đến hàng phần trăm.',
    conditionSummary: '6 lớp tần số dương, S^2 > 0, cách ranh giới làm tròn hàng phần trăm 0,005',
    paramSpecs: [
      { name: 'a0_2', label: 'Đầu mút đầu (x2)', min: 2, max: 14 },
      { name: 'h2', label: 'Độ rộng lớp (x2)', min: 4, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 15 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 15 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 1, max: 12 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 15 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 1, max: 12 },
      { name: 'n6', label: 'Tần số nhóm 6', min: 2, max: 15 },
    ],
    validateCode: `
      const { h2, n1, n2, n3, n4, n5, n6 } = params;
      if (h2 <= 0 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0 || n6 <= 0) {
        return { valid: false, reason: 'Độ rộng và các tần số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5, n6];
      const n = n1 + n2 + n3 + n4 + n5 + n6;
      const a0 = params.a0_2 / 2, h = h2 / 2;
      const mids = [0, 1, 2, 3, 4, 5].map((i) => a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const ex2 = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n;
      const vari = ex2 - mean * mean;
      if (vari <= 1) return { valid: false, reason: 'Phương sai quá nhỏ' };
      if (Math.abs(vari * 100 - Math.floor(vari * 100) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      if (Math.abs(vari - Math.sqrt(vari)) < 0.5) {
        return { valid: false, reason: 'Tránh S và S^2 gần nhau gây trùng phương án nhiễu' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0_2, h2, n1, n2, n3, n4, n5, n6 } = params;
      const fmtDec = (v) => {
        const clean = Number(v.toFixed(4));
        return Number.isInteger(clean) ? String(clean) : String(clean).replace('.', ',');
      };
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const a0 = a0_2 / 2, h = h2 / 2;
      const freqs = [n1, n2, n3, n4, n5, n6];
      const n = n1 + n2 + n3 + n4 + n5 + n6;
      const intervals = [0, 1, 2, 3, 4, 5].map((i) => {
        const l = Number((a0 + i * h).toFixed(2));
        const r = Number((a0 + (i + 1) * h).toFixed(2));
        return '[' + fmtDec(l) + ' ; ' + fmtDec(r) + ')';
      });
      const mids = [0, 1, 2, 3, 4, 5].map((i) => Number((a0 + (i + 0.5) * h).toFixed(4)));
      const sumX = mids.reduce((acc, c, i) => acc + c * freqs[i], 0);
      const sumX2 = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0);
      const mean = sumX / n;
      const vari = sumX2 / n - mean * mean;
      const varR = Math.round(vari * 100) / 100;
      const meanR = Math.round(mean * 100) / 100;
      const sdR = Math.round(Math.sqrt(vari) * 100) / 100;
      const sampleVarR = Math.round((vari * n / (n - 1)) * 100) / 100;

      const correct = '$' + fmt2(varR) + '$';
      const distractors = [
        '$' + fmt2(sdR) + '$',
        '$' + fmt2(sampleVarR) + '$',
        '$' + fmt2(varR + 2) + '$',
        '$' + fmt2(Math.max(0.5, varR - 1.5)) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + fmt2(varR + k * 0.75) + '$'
      );
      const numMeanStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c)).join(' + ');
      const numVarStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c) + '^2').join(' + ');
      return {
        stem: 'Cho mẫu số liệu ghép nhóm về điểm thi và số người dự thi như bảng sau. Tính phương sai của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Điểm thi',
          row2Label: 'Số người dự thi',
          intervals,
          frequencies: freqs,
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Các giá trị đại diện của các nhóm là: ' + mids.map(fmtDec).join('; ') + '. Tổng tần số $n = ' + n + '$.',
          'Số trung bình: $\\overline{x} = \\frac{' + numMeanStr + '}{' + n + '} \\approx ' + fmt2(meanR) + '$.',
          'Phương sai: $S^2 = \\frac{1}{' + n + '}(' + numVarStr + ') - \\overline{x}^2 \\approx ' + fmt2(varR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số nhóm bằng 0', params: { a0_2: 4, h2: 7, n1: 0, n2: 8, n3: 3, n4: 7, n5: 1, n6: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 [2;23), S^2 = 47,35', params: { a0_2: 4, h2: 7, n1: 11, n2: 8, n3: 3, n4: 7, n5: 1, n6: 11 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2 - MC): Tính độ lệch chuẩn mẫu số liệu ghép nhóm bảng 5 lớp (làm tròn hàng phần trăm)
  t12_b10_d02_stddev_5classes_mc: {
    id: 't12_b10_d02_stddev_5classes_mc',
    name: 'Tính độ lệch chuẩn của mẫu số liệu ghép nhóm (bảng 5 lớp, làm tròn phần trăm)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Độ lệch chuẩn mẫu số liệu ghép nhóm',
    description: 'Cho bảng phân bố ghép nhóm 5 lớp độ rộng h. Tính độ lệch chuẩn S = căn(S^2) làm tròn đến hàng phần trăm.',
    conditionSummary: '5 lớp tần số dương, S > 0 cách ranh giới làm tròn 0,005',
    paramSpecs: [
      { name: 'ctxIdx', label: 'Ngữ cảnh (0:Lương, 1:Tuổi, 2:Thời gian)', min: 0, max: 2 },
      { name: 'a0', label: 'Đầu mút đầu', min: 5, max: 25 },
      { name: 'h', label: 'Độ rộng lớp h', min: 3, max: 10 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 3, max: 20 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 18 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 18 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 18 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 3, max: 20 },
    ],
    validateCode: `
      const { h, n1, n2, n3, n4, n5 } = params;
      if (h <= 0 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0) {
        return { valid: false, reason: 'Độ rộng và các tần số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      const n = n1 + n2 + n3 + n4 + n5;
      const mids = [0, 1, 2, 3, 4].map((i) => params.a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const ex2 = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n;
      const vari = ex2 - mean * mean;
      if (vari <= 0.5) return { valid: false, reason: 'Phương sai phải dương' };
      const sd = Math.sqrt(vari);
      if (Math.abs(sd * 100 - Math.floor(sd * 100) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ctxIdx, a0, h, n1, n2, n3, n4, n5 } = params;
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const contexts = [
        { title: 'lương (triệu đồng) và số nhân viên', row1: 'Lương (triệu đồng)', row2: 'Số nhân viên' },
        { title: 'tuổi và số người', row1: 'Khoảng tuổi', row2: 'Số người' },
        { title: 'thời gian tự học (phút) và số học sinh', row1: 'Thời gian (phút)', row2: 'Số học sinh' },
      ];
      const ctx = contexts[ctxIdx] || contexts[0];
      const freqs = [n1, n2, n3, n4, n5];
      const n = n1 + n2 + n3 + n4 + n5;
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n - mean * mean;
      const sd = Math.sqrt(vari);
      const meanR = Math.round(mean * 100) / 100;
      const varR = Math.round(vari * 100) / 100;
      const sdR = Math.round(sd * 100) / 100;
      const wrong1 = Math.round(Math.sqrt(vari * n / (n - 1)) * 100) / 100;
      const wrong2 = Math.round((sdR * 0.3) * 100) / 100;
      const wrong3 = Math.round((sdR + 0.05) * 100) / 100;

      const correct = '$' + fmt2(sdR) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + fmt2(wrong1) + '$', '$' + fmt2(wrong2) + '$', '$' + fmt2(wrong3) + '$'],
        rng,
        (k) => '$' + fmt2(Math.max(0.2, sdR + k * 0.4)) + '$'
      );
      const numMeanStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c)).join(' + ');
      const numVarStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c) + '^2').join(' + ');
      return {
        stem: 'Cho mẫu số liệu ghép nhóm về ' + ctx.title + ' như bảng sau. Tính độ lệch chuẩn của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần trăm).',
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
          'Các giá trị đại diện: ' + mids.map(fmtDec).join('; ') + '. Tổng tần số $n = ' + n + '$.',
          'Số trung bình: $\\overline{x} = \\frac{' + numMeanStr + '}{' + n + '} \\approx ' + fmt2(meanR) + '$.',
          'Phương sai: $S^2 = \\frac{1}{' + n + '}(' + numVarStr + ') - \\overline{x}^2 \\approx ' + fmt2(varR) + '$.',
          'Độ lệch chuẩn: $S = \\sqrt{S^2} \\approx ' + fmt2(sdR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên độ rộng h = 0', params: { ctxIdx: 0, a0: 10, h: 0, n1: 15, n2: 2, n3: 10, n4: 6, n5: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 [10;35), S = 7,96', params: { ctxIdx: 0, a0: 10, h: 5, n1: 15, n2: 2, n3: 10, n4: 6, n5: 11 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3 - TF): Đánh giá Đúng/Sai về số trung bình, phương sai, độ lệch chuẩn và khoảng tứ phân vị
  t12_b10_d03_mean_var_sd_iqr_tf: {
    id: 't12_b10_d03_mean_var_sd_iqr_tf',
    name: 'Xét tính đúng sai về số trung bình, phương sai, độ lệch chuẩn và khoảng tứ phân vị',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương sai, độ lệch chuẩn và khoảng tứ phân vị',
    description: 'Cho bảng tần số ghép nhóm 5 lớp. Đánh giá 4 khẳng định về số trung bình, phương sai S^2, độ lệch chuẩn S và khoảng tứ phân vị Δ_Q.',
    conditionSummary: 'Q1, Q3 thuộc hai lớp phân biệt, các giá trị làm tròn hàng phần trăm cách ranh giới 0,005',
    paramSpecs: [
      { name: 'a0_2', label: 'Đầu mút đầu (x2)', min: 0, max: 10 },
      { name: 'h10', label: 'Độ rộng lớp (x10)', min: 15, max: 40, step: 5 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 3, max: 12 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 1, max: 8 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 2, max: 10 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 10 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 2, max: 10 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { h10, n1, n2, n3, n4, n5 } = params;
      if (h10 <= 0 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0) {
        return { valid: false, reason: 'Độ rộng và các tần số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const a0 = params.a0_2 / 2, h = h10 / 10;
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / N;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / N - mean * mean;
      if (vari <= 0.5) return { valid: false, reason: 'Phương sai phải dương' };
      const sd = Math.sqrt(vari);

      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      if (c1 < 0 || c3 < 0 || c1 >= c3) return { valid: false, reason: 'Q1 và Q3 phải ở hai nhóm phân biệt' };
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const Q1 = a0 + c1 * h + ((p1 - F1) / freqs[c1]) * h;
      const Q3 = a0 + c3 * h + ((p3 - F3) / freqs[c3]) * h;
      const iqr = Q3 - Q1;

      for (const v of [mean, vari, sd, iqr]) {
        if (Math.abs(v * 100 - Math.floor(v * 100) - 0.5) < 0.02) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0_2, h10, n1, n2, n3, n4, n5, mode } = params;
      const fmtDec = (v) => {
        const clean = Number(v.toFixed(4));
        return Number.isInteger(clean) ? String(clean) : String(clean).replace('.', ',');
      };
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const a0 = a0_2 / 2, h = h10 / 10;
      const freqs = [n1, n2, n3, n4, n5];
      const N = n1 + n2 + n3 + n4 + n5;
      const intervals = [0, 1, 2, 3, 4].map((i) => {
        const l = Number((a0 + i * h).toFixed(2));
        const r = Number((a0 + (i + 1) * h).toFixed(2));
        return '[' + fmtDec(l) + ' ; ' + fmtDec(r) + ')';
      });
      const mids = [0, 1, 2, 3, 4].map((i) => Number((a0 + (i + 0.5) * h).toFixed(4)));
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / N;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / N - mean * mean;
      const sd = Math.sqrt(vari);

      const cum = [];
      let s = 0;
      for (const f of freqs) { s += f; cum.push(s); }
      const p1 = N / 4, p3 = (3 * N) / 4;
      const c1 = cum.findIndex((c) => p1 <= c);
      const c3 = cum.findIndex((c) => p3 <= c);
      const F1 = c1 === 0 ? 0 : cum[c1 - 1];
      const F3 = c3 === 0 ? 0 : cum[c3 - 1];
      const L1_10 = Math.round((a0 + c1 * h) * 10);
      const L3_10 = Math.round((a0 + c3 * h) * 10);
      const f1 = freqs[c1], f3 = freqs[c3];
      const q1Frac = u.simplifyFrac(L1_10 * 4 * f1 + (N - 4 * F1) * h10, 40 * f1);
      const q3Frac = u.simplifyFrac(L3_10 * 4 * f3 + (3 * N - 4 * F3) * h10, 40 * f3);
      const iqrFrac = u.simplifyFrac(q3Frac.num * q1Frac.den - q1Frac.num * q3Frac.den, q3Frac.den * q1Frac.den);

      const meanR = Math.round(mean * 100) / 100;
      const varR = Math.round(vari * 100) / 100;
      const sdR = Math.round(sd * 100) / 100;
      const iqrR = Math.round(iqrFrac.value * 100) / 100;

      const aTrue = mode !== 3;
      const bTrue = mode !== 2;
      const cTrue = mode === 1;
      const dTrue = mode === 0 || mode === 2;

      const shownMean = aTrue ? meanR : Math.round((meanR + 0.65) * 100) / 100;
      const shownVar = bTrue ? varR : Math.round((varR + 1.45) * 100) / 100;
      const shownSd = cTrue ? sdR : Math.round((sdR + 0.5) * 100) / 100;
      const shownIqr = dTrue ? iqrR : Math.round((iqrR + 0.75) * 100) / 100;

      const tfStatements = [
        { key: 'a', text: 'Số trung bình của mẫu số liệu bằng $' + fmt2(shownMean) + '$.', isTrue: aTrue },
        { key: 'b', text: 'Phương sai của mẫu số liệu bằng $' + fmt2(shownVar) + '$.', isTrue: bTrue },
        { key: 'c', text: 'Độ lệch chuẩn của mẫu số liệu bằng $' + fmt2(shownSd) + '$.', isTrue: cTrue },
        { key: 'd', text: 'Khoảng tứ phân vị của mẫu số liệu bằng $' + fmt2(shownIqr) + '$.', isTrue: dTrue },
      ];
      const numMeanStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c)).join(' + ');
      const numVarStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c) + '^2').join(' + ');

      return {
        stem:
          'Cho bảng số liệu ghép nhóm về điểm số và số học sinh như bảng dưới đây. Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Điểm số',
          row2Label: 'Số học sinh',
          intervals,
          frequencies: freqs,
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ') ' + (st.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\overline{x} = \\frac{' + numMeanStr + '}{' + N + '} \\approx ' + fmt2(meanR) + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $S^2 = \\frac{1}{' + N + '}(' + numVarStr + ') - \\overline{x}^2 \\approx ' + fmt2(varR) + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $S = \\sqrt{S^2} \\approx ' + fmt2(sdR) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $Q_1 = ' + q1Frac.latex + '$, $Q_3 = ' + q3Frac.latex + '$, nên $\\Delta_Q = ' + iqrFrac.latex + ' \\approx ' + fmt2(iqrR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Q1 và Q3 cùng lớp', params: { a0_2: 0, h10: 25, n1: 20, n2: 1, n3: 1, n4: 1, n5: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 [0;12,5), f=[8,1,6,5,3], Đ-Đ-S-Đ', params: { a0_2: 0, h10: 25, n1: 8, n2: 1, n3: 6, n4: 5, n5: 3, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4 - SA): Tính phương sai mẫu số liệu ghép nhóm bước thập phân (làm tròn phần mười)
  t12_b10_d04_variance_decimal_sa: {
    id: 't12_b10_d04_variance_decimal_sa',
    name: 'Tính phương sai mẫu số liệu ghép nhóm thập phân (làm tròn phần mười)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương sai mẫu số liệu ghép nhóm',
    description: 'Cho bảng phân bố quãng đường chạy bộ 5 lớp bước thập phân. Tính phương sai S^2 làm tròn đến hàng phần mười.',
    conditionSummary: '5 lớp tần số dương, S^2 làm tròn phần mười cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a0_10', label: 'Đầu mút đầu (x10)', min: 10, max: 30 },
      { name: 'h10', label: 'Độ rộng lớp (x10)', min: 5, max: 20, step: 5 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 1, max: 10 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 2, max: 12 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 3, max: 15 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 2, max: 12 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 1, max: 10 },
    ],
    validateCode: `
      const { h10, n1, n2, n3, n4, n5 } = params;
      if (h10 <= 0 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0) {
        return { valid: false, reason: 'Độ rộng và tần số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      const n = n1 + n2 + n3 + n4 + n5;
      const a0 = params.a0_10 / 10, h = h10 / 10;
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n - mean * mean;
      if (vari <= 0.2) return { valid: false, reason: 'Phương sai phải dương' };
      if (Math.abs(vari * 10 - Math.floor(vari * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0_10, h10, n1, n2, n3, n4, n5 } = params;
      const fmtDec = (v) => {
        const clean = Number(v.toFixed(4));
        return Number.isInteger(clean) ? String(clean) : String(clean).replace('.', ',');
      };
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const a0 = a0_10 / 10, h = h10 / 10;
      const freqs = [n1, n2, n3, n4, n5];
      const n = n1 + n2 + n3 + n4 + n5;
      const intervals = [0, 1, 2, 3, 4].map((i) => {
        const l = Number((a0 + i * h).toFixed(2));
        const r = Number((a0 + (i + 1) * h).toFixed(2));
        return '[' + fmtDec(l) + ' ; ' + fmtDec(r) + ')';
      });
      const mids = [0, 1, 2, 3, 4].map((i) => Number((a0 + (i + 0.5) * h).toFixed(4)));
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n - mean * mean;
      const varRounded1 = Math.round(vari * 10) / 10;
      const shortAnswer = u.formatNumberVN(varRounded1, 1);
      const numMeanStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c)).join(' + ');
      const numVarStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c) + '^2').join(' + ');

      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về quãng đường chạy bộ (km) và số ngày chạy bộ như bảng sau. Tính phương sai của mẫu số liệu ghép nhóm trên (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Quãng đường chạy bộ (km)',
          row2Label: 'Số ngày chạy bộ',
          intervals,
          frequencies: freqs,
        },
        shortAnswer,
        numericValue: varRounded1,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Các giá trị đại diện: ' + mids.map(fmtDec).join('; ') + '. Tổng tần số $n = ' + n + '$.',
          'Số trung bình: $\\overline{x} = \\frac{' + numMeanStr + '}{' + n + '} \\approx ' + fmt2(mean) + '$.',
          'Phương sai: $S^2 = \\frac{1}{' + n + '}(' + numVarStr + ') - \\overline{x}^2 \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số bằng 0', params: { a0_10: 12, h10: 10, n1: 0, n2: 4, n3: 8, n4: 4, n5: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 [1,2;6,2), f=[3,4,8,4,1], S^2=1,2', params: { a0_10: 12, h10: 10, n1: 3, n2: 4, n3: 8, n4: 4, n5: 1 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5 - SA): Tính độ lệch chuẩn mẫu số liệu ghép nhóm 5 lớp (làm tròn hàng phần mười)
  t12_b10_d05_stddev_1dec_sa: {
    id: 't12_b10_d05_stddev_1dec_sa',
    name: 'Tính độ lệch chuẩn mẫu số liệu ghép nhóm (làm tròn phần mười)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Độ lệch chuẩn mẫu số liệu ghép nhóm',
    description: 'Cho bảng phân bố cân nặng gồm 5 lớp nguyên. Tính độ lệch chuẩn S làm tròn đến hàng phần mười.',
    conditionSummary: '5 lớp tần số dương, S làm tròn hàng phần mười cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu', min: 30, max: 55 },
      { name: 'h', label: 'Độ rộng lớp h', min: 4, max: 12 },
      { name: 'n1', label: 'Tần số nhóm 1', min: 2, max: 18 },
      { name: 'n2', label: 'Tần số nhóm 2', min: 8, max: 35 },
      { name: 'n3', label: 'Tần số nhóm 3', min: 8, max: 38 },
      { name: 'n4', label: 'Tần số nhóm 4', min: 8, max: 35 },
      { name: 'n5', label: 'Tần số nhóm 5', min: 4, max: 25 },
    ],
    validateCode: `
      const { a0, h, n1, n2, n3, n4, n5 } = params;
      if (a0 <= 0 || h < 2 || n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0 || n5 <= 0) {
        return { valid: false, reason: 'Tham số phải dương' };
      }
      const freqs = [n1, n2, n3, n4, n5];
      const n = n1 + n2 + n3 + n4 + n5;
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n - mean * mean;
      if (vari <= 0.5) return { valid: false, reason: 'Phương sai phải dương' };
      const sd = Math.sqrt(vari);
      if (Math.abs(sd * 10 - Math.floor(sd * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, n1, n2, n3, n4, n5 } = params;
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const freqs = [n1, n2, n3, n4, n5];
      const n = n1 + n2 + n3 + n4 + n5;
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + ' ; ' + (a0 + (i + 1) * h) + ')');
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n - mean * mean;
      const sd = Math.sqrt(vari);
      const sdRounded = Math.round(sd * 10) / 10;
      const shortAnswer = u.formatNumberVN(sdRounded, 1);
      const numMeanStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c)).join(' + ');
      const numVarStr = mids.map((c, i) => freqs[i] + ' \\cdot ' + fmtDec(c) + '^2').join(' + ');

      return {
        stem:
          'Cho mẫu số liệu ghép nhóm về cân nặng (kg) và số người như bảng sau. Tính độ lệch chuẩn của mẫu số liệu ghép nhóm trên (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Cân nặng (kg)',
          row2Label: 'Số người',
          intervals,
          frequencies: freqs,
        },
        shortAnswer,
        numericValue: sdRounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Các giá trị đại diện: ' + mids.map(fmtDec).join('; ') + '. Tổng tần số $n = ' + n + '$.',
          'Số trung bình: $\\overline{x} = \\frac{' + numMeanStr + '}{' + n + '} \\approx ' + fmt2(mean) + '$.',
          'Phương sai: $S^2 = \\frac{1}{' + n + '}(' + numVarStr + ') - \\overline{x}^2 \\approx ' + fmt2(vari) + '$.',
          'Độ lệch chuẩn: $S = \\sqrt{S^2} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên đầu mút âm', params: { a0: -10, h: 8, n1: 3, n2: 27, n3: 29, n4: 27, n5: 16 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 [40;80), f=[3,27,29,27,16], S=8,8', params: { a0: 40, h: 8, n1: 3, n2: 27, n3: 29, n4: 27, n5: 16 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6 - SA): Tìm tần số ẩn x, y dựa vào trung vị Me rồi tính độ lệch chuẩn
  t12_b10_d06_missing_freq_median_stddev_sa: {
    id: 't12_b10_d06_missing_freq_median_stddev_sa',
    name: 'Tìm tần số ẩn x, y dựa vào trung vị Me rồi tính độ lệch chuẩn',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Độ lệch chuẩn và tần số chưa biết',
    description: 'Cho bảng phân bố doanh thu 5 lớp có hai tần số ẩn x, y, biết tổng cỡ mẫu n và trung vị Me. Giải tìm x, y rồi tính độ lệch chuẩn s.',
    conditionSummary: 'x, y nguyên dương, n/2 nằm nghiêm ngặt trong nhóm thứ 3 [a0+2h; a0+3h) để Me xác định duy nhất x, y',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu', min: 10, max: 30, step: 5 },
      { name: 'h', label: 'Độ rộng lớp h', min: 10, max: 30, step: 5 },
      { name: 'kx', label: 'Hệ số tần số x (x = 10*kx)', min: 2, max: 8 },
      { name: 'k2', label: 'Hệ số n2 (n2 = 10*k2)', min: 1, max: 5 },
      { name: 'k3', label: 'Hệ số n3 (n3 = 10*k3)', min: 8, max: 20 },
      { name: 'k4', label: 'Hệ số n4 (n4 = 10*k4)', min: 2, max: 8 },
      { name: 'ky', label: 'Hệ số tần số y (y = 10*ky)', min: 2, max: 12 },
    ],
    validateCode: `
      const { a0, h, kx, k2, k3, k4, ky } = params;
      if (a0 <= 0 || h <= 0 || kx <= 0 || k2 <= 0 || k3 <= 0 || k4 <= 0 || ky <= 0) {
        return { valid: false, reason: 'Các tham số phải dương' };
      }
      const x = 10 * kx, n2 = 10 * k2, n3 = 10 * k3, n4 = 10 * k4, y = 10 * ky;
      const n = x + n2 + n3 + n4 + y;
      const p2 = n / 2;
      if (p2 <= x + n2 || p2 >= x + n2 + n3) {
        return { valid: false, reason: 'Trung vị phải nằm nghiêm ngặt trong nhóm 3 để xác định duy nhất x, y' };
      }
      const freqs = [x, n2, n3, n4, y];
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n - mean * mean;
      const sd = Math.sqrt(vari);
      if (Math.abs(sd * 10 - Math.floor(sd * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, kx, k2, k3, k4, ky } = params;
      const x = 10 * kx, n2 = 10 * k2, n3 = 10 * k3, n4 = 10 * k4, y = 10 * ky;
      const n = x + n2 + n3 + n4 + y;
      const L3 = a0 + 2 * h;
      const meFrac = u.simplifyFrac(L3 * 2 * n3 + (n - 2 * (x + n2)) * h, 2 * n3);
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + '; ' + (a0 + (i + 1) * h) + ')');
      const freqs = [x, n2, n3, n4, y];
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);

      // Compute exact mean and variance (with scale factor 2 if mids have .5)
      const scale = h % 2 === 1 ? 2 : 1;
      const sumX = freqs.reduce((acc, f, i) => acc + f * Math.round(mids[i] * scale), 0);
      const meanFrac = u.simplifyFrac(sumX, n * scale);
      const sumX2 = freqs.reduce((acc, f, i) => acc + f * Math.round(mids[i] * scale) * Math.round(mids[i] * scale), 0);
      const ex2Frac = u.simplifyFrac(sumX2, n * scale * scale);
      const varFrac = u.simplifyFrac(
        ex2Frac.num * meanFrac.den * meanFrac.den - meanFrac.num * meanFrac.num * ex2Frac.den,
        ex2Frac.den * meanFrac.den * meanFrac.den
      );
      const sd = Math.sqrt(varFrac.value);
      const sdRounded = Math.round(sd * 10) / 10;
      const shortAnswer = u.formatNumberVN(sdRounded, 1);
      const sumRemain = x + y;
      const knownSum = n2 + n3 + n4;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const fmtDec = (v) => (Number.isInteger(v) ? String(v) : String(v).replace('.', ','));

      return {
        stem:
          'Khảo sát doanh thu (đơn vị: triệu đồng) trong một tháng của $' + n + '$ cửa hàng tiện lợi ở một thành phố, ta nhận được bảng số liệu sau. Biết trung vị của mẫu số liệu ghép nhóm trên là $M_e = ' + meFrac.latex + '$. Tính độ lệch chuẩn của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Doanh thu (triệu đồng)',
          row2Label: 'Số cửa hàng',
          intervals,
          frequencies: ['$x$', n2, n3, n4, '$y$'],
        },
        shortAnswer,
        numericValue: sdRounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Cỡ mẫu $n = ' + n + '$ nên $x + ' + knownSum + ' + y = ' + n + ' \\Rightarrow x + y = ' + sumRemain + '$.',
          'Ta có $\\frac{n}{2} = ' + fmtDec(n / 2) + '$. Vì $M_e = ' + meFrac.latex + ' \\in ' + intervals[2] + '$ nên nhóm chứa trung vị là $' + intervals[2] + '$.',
          'Suy ra $M_e = ' + L3 + ' + \\frac{' + fmtDec(n / 2) + ' - (' + n2 + ' + x)}{' + n3 + '} \\cdot ' + h + ' = ' + meFrac.latex + ' \\Leftrightarrow x = ' + x + '$, do đó $y = ' + y + '$.',
          'Số trung bình $\\overline{x} = ' + meanFrac.latex + ' \\approx ' + fmt2(meanFrac.value) + '$; phương sai $s^2 = ' + varFrac.latex + ' \\approx ' + fmt2(varFrac.value) + '$.',
          'Độ lệch chuẩn: $s = \\sqrt{s^2} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n/2 rơi ngoài nhóm 3', params: { a0: 20, h: 20, kx: 10, k2: 1, k3: 4, k4: 2, ky: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 n=340, Me=75, s=24,7', params: { a0: 20, h: 20, kx: 4, k2: 1, k3: 16, k4: 4, ky: 9 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7 - SA): Tìm tần số ẩn x, y dựa vào tứ phân vị thứ nhất Q1 rồi tính độ lệch chuẩn
  t12_b10_d07_missing_freq_q1_stddev_sa: {
    id: 't12_b10_d07_missing_freq_q1_stddev_sa',
    name: 'Tìm tần số ẩn x, y dựa vào Q1 rồi tính độ lệch chuẩn',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Độ lệch chuẩn và tứ phân vị với tần số ẩn',
    description: 'Cho bảng phân bố 5 lớp với tần số ẩn x, y, biết tổng cỡ mẫu n và tứ phân vị thứ nhất Q1. Giải tìm x, y rồi tính độ lệch chuẩn s.',
    conditionSummary: 'x, y nguyên dương, n/4 nằm nghiêm ngặt trong nhóm thứ 2 [a0+h; a0+2h) để Q1 xác định duy nhất x, y',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu', min: 0, max: 20, step: 5 },
      { name: 'h', label: 'Độ rộng lớp h', min: 10, max: 30, step: 5 },
      { name: 'kx', label: 'Hệ số tần số x (x = 10*kx)', min: 3, max: 12 },
      { name: 'k2', label: 'Hệ số n2 (n2 = 10*k2)', min: 8, max: 18 },
      { name: 'k3', label: 'Hệ số n3 (n3 = 10*k3)', min: 5, max: 16 },
      { name: 'k4', label: 'Hệ số n4 (n4 = 10*k4)', min: 3, max: 12 },
      { name: 'ky', label: 'Hệ số tần số y (y = 10*ky)', min: 6, max: 20 },
    ],
    validateCode: `
      const { h, kx, k2, k3, k4, ky } = params;
      if (h <= 0 || kx <= 0 || k2 <= 0 || k3 <= 0 || k4 <= 0 || ky <= 0) {
        return { valid: false, reason: 'Các tham số phải dương' };
      }
      const x = 10 * kx, n2 = 10 * k2, n3 = 10 * k3, n4 = 10 * k4, y = 10 * ky;
      const n = x + n2 + n3 + n4 + y;
      const p1 = n / 4;
      if (p1 <= x || p1 >= x + n2) {
        return { valid: false, reason: 'Vị trí Q1 = n/4 phải nằm nghiêm ngặt trong nhóm 2 để xác định duy nhất x, y' };
      }
      const freqs = [x, n2, n3, n4, y];
      const mids = [0, 1, 2, 3, 4].map((i) => params.a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n - mean * mean;
      const sd = Math.sqrt(vari);
      if (Math.abs(sd * 10 - Math.floor(sd * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, kx, k2, k3, k4, ky } = params;
      const x = 10 * kx, n2 = 10 * k2, n3 = 10 * k3, n4 = 10 * k4, y = 10 * ky;
      const n = x + n2 + n3 + n4 + y;
      const L2 = a0 + h;
      const q1Frac = u.simplifyFrac(L2 * 4 * n2 + (n - 4 * x) * h, 4 * n2);
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + '; ' + (a0 + (i + 1) * h) + ')');
      const freqs = [x, n2, n3, n4, y];
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);

      const scale = h % 2 === 1 ? 2 : 1;
      const sumX = freqs.reduce((acc, f, i) => acc + f * Math.round(mids[i] * scale), 0);
      const meanFrac = u.simplifyFrac(sumX, n * scale);
      const sumX2 = freqs.reduce((acc, f, i) => acc + f * Math.round(mids[i] * scale) * Math.round(mids[i] * scale), 0);
      const ex2Frac = u.simplifyFrac(sumX2, n * scale * scale);
      const varFrac = u.simplifyFrac(
        ex2Frac.num * meanFrac.den * meanFrac.den - meanFrac.num * meanFrac.num * ex2Frac.den,
        ex2Frac.den * meanFrac.den * meanFrac.den
      );
      const sd = Math.sqrt(varFrac.value);
      const sdRounded = Math.round(sd * 10) / 10;
      const shortAnswer = u.formatNumberVN(sdRounded, 1);
      const p1Frac = u.simplifyFrac(n, 4);
      const sumRemain = x + y;
      const knownSum = n2 + n3 + n4;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      return {
        stem:
          'Khảo sát thời gian sử dụng mạng xã hội (đơn vị: phút) trong một ngày của $' + n + '$ học sinh một trường THPT, ta nhận được bảng số liệu sau. Biết tứ phân vị thứ nhất của mẫu số liệu ghép nhóm trên là $Q_1 = ' + q1Frac.latex + '$. Tính độ lệch chuẩn của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Thời gian (phút)',
          row2Label: 'Số học sinh',
          intervals,
          frequencies: ['$x$', n2, n3, n4, '$y$'],
        },
        shortAnswer,
        numericValue: sdRounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Cỡ mẫu $n = ' + n + '$ nên $x + ' + knownSum + ' + y = ' + n + ' \\Rightarrow x + y = ' + sumRemain + '$.',
          'Ta có $\\frac{n}{4} = ' + p1Frac.latex + '$. Vì $Q_1 = ' + q1Frac.latex + ' \\in ' + intervals[1] + '$ nên nhóm chứa tứ phân vị thứ nhất là $' + intervals[1] + '$.',
          'Do đó $Q_1 = ' + L2 + ' + \\frac{' + p1Frac.latex + ' - x}{' + n2 + '} \\cdot ' + h + ' = ' + q1Frac.latex + ' \\Leftrightarrow x = ' + x + '$, suy ra $y = ' + y + '$.',
          'Số trung bình $\\overline{x} = ' + meanFrac.latex + ' \\approx ' + fmt2(meanFrac.value) + '$; phương sai $s^2 = ' + varFrac.latex + ' \\approx ' + fmt2(varFrac.value) + '$.',
          'Độ lệch chuẩn: $s = \\sqrt{s^2} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n/4 rơi vào nhóm 1', params: { a0: 0, h: 20, kx: 20, k2: 12, k3: 12, k4: 6, ky: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 n=540, Q1=175/6, s=28,8', params: { a0: 0, h: 20, kx: 8, k2: 12, k3: 12, k4: 6, ky: 16 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8 - SA): Tìm tần số ẩn x, y dựa vào tứ phân vị thứ ba Q3 rồi tính độ lệch chuẩn
  t12_b10_d08_missing_freq_q3_stddev_sa: {
    id: 't12_b10_d08_missing_freq_q3_stddev_sa',
    name: 'Tìm tần số ẩn x, y dựa vào Q3 rồi tính độ lệch chuẩn',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Độ lệch chuẩn và tứ phân vị với tần số ẩn',
    description: 'Cho bảng phân bố 5 lớp với tần số ẩn x, y, biết tổng cỡ mẫu n và tứ phân vị thứ ba Q3. Giải tìm x, y rồi tính độ lệch chuẩn s.',
    conditionSummary: 'x, y nguyên dương, 3n/4 nằm nghiêm ngặt trong nhóm thứ 4 [a0+3h; a0+4h) để Q3 xác định duy nhất x, y',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu', min: 5, max: 20, step: 5 },
      { name: 'h', label: 'Độ rộng lớp h', min: 4, max: 10 },
      { name: 'kx', label: 'Hệ số tần số x (x = 10*kx)', min: 6, max: 20 },
      { name: 'k2', label: 'Hệ số n2 (n2 = 10*k2)', min: 2, max: 8 },
      { name: 'k3', label: 'Hệ số n3 (n3 = 10*k3)', min: 2, max: 8 },
      { name: 'k4', label: 'Hệ số n4 (n4 = 10*k4)', min: 8, max: 20 },
      { name: 'ky', label: 'Hệ số tần số y (y = 10*ky)', min: 1, max: 6 },
    ],
    validateCode: `
      const { a0, h, kx, k2, k3, k4, ky } = params;
      if (a0 <= 0 || h <= 0 || kx <= 0 || k2 <= 0 || k3 <= 0 || k4 <= 0 || ky <= 0) {
        return { valid: false, reason: 'Các tham số phải dương' };
      }
      const x = 10 * kx, n2 = 10 * k2, n3 = 10 * k3, n4 = 10 * k4, y = 10 * ky;
      const n = x + n2 + n3 + n4 + y;
      const p3 = (3 * n) / 4;
      if (p3 <= x + n2 + n3 || p3 >= x + n2 + n3 + n4) {
        return { valid: false, reason: 'Vị trí Q3 = 3n/4 phải nằm nghiêm ngặt trong nhóm 4 để xác định duy nhất x, y' };
      }
      const freqs = [x, n2, n3, n4, y];
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);
      const mean = mids.reduce((acc, c, i) => acc + c * freqs[i], 0) / n;
      const vari = mids.reduce((acc, c, i) => acc + c * c * freqs[i], 0) / n - mean * mean;
      const sd = Math.sqrt(vari);
      if (Math.abs(sd * 10 - Math.floor(sd * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, kx, k2, k3, k4, ky } = params;
      const x = 10 * kx, n2 = 10 * k2, n3 = 10 * k3, n4 = 10 * k4, y = 10 * ky;
      const n = x + n2 + n3 + n4 + y;
      const L4 = a0 + 3 * h;
      const q3Frac = u.simplifyFrac(L4 * 4 * n4 + (3 * n - 4 * (x + n2 + n3)) * h, 4 * n4);
      const intervals = [0, 1, 2, 3, 4].map((i) => '[' + (a0 + i * h) + '; ' + (a0 + (i + 1) * h) + ')');
      const freqs = [x, n2, n3, n4, y];
      const mids = [0, 1, 2, 3, 4].map((i) => a0 + (i + 0.5) * h);

      const scale = h % 2 === 1 ? 2 : 1;
      const sumX = freqs.reduce((acc, f, i) => acc + f * Math.round(mids[i] * scale), 0);
      const meanFrac = u.simplifyFrac(sumX, n * scale);
      const sumX2 = freqs.reduce((acc, f, i) => acc + f * Math.round(mids[i] * scale) * Math.round(mids[i] * scale), 0);
      const ex2Frac = u.simplifyFrac(sumX2, n * scale * scale);
      const varFrac = u.simplifyFrac(
        ex2Frac.num * meanFrac.den * meanFrac.den - meanFrac.num * meanFrac.num * ex2Frac.den,
        ex2Frac.den * meanFrac.den * meanFrac.den
      );
      const sd = Math.sqrt(varFrac.value);
      const sdRounded = Math.round(sd * 10) / 10;
      const shortAnswer = u.formatNumberVN(sdRounded, 1);
      const p3Frac = u.simplifyFrac(3 * n, 4);
      const sumRemain = x + y;
      const knownSum = n2 + n3 + n4;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      return {
        stem:
          'Khảo sát lượng nước tiêu thụ (đơn vị: m$^3$) trong một tháng của $' + n + '$ hộ gia đình ở một khu dân cư, ta nhận được bảng số liệu sau. Biết tứ phân vị thứ ba của mẫu số liệu ghép nhóm trên là $Q_3 = ' + q3Frac.latex + '$. Tính độ lệch chuẩn của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần mười).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Lượng nước ($\\text{m}^3$)',
          row2Label: 'Số hộ gia đình',
          intervals,
          frequencies: ['$x$', n2, n3, n4, '$y$'],
        },
        shortAnswer,
        numericValue: sdRounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Cỡ mẫu $n = ' + n + '$ nên $x + ' + knownSum + ' + y = ' + n + ' \\Rightarrow x + y = ' + sumRemain + '$.',
          'Ta có $\\frac{3n}{4} = ' + p3Frac.latex + '$. Vì $Q_3 = ' + q3Frac.latex + ' \\in ' + intervals[3] + '$ nên nhóm chứa tứ phân vị thứ ba là $' + intervals[3] + '$.',
          'Do đó $Q_3 = ' + L4 + ' + \\frac{' + p3Frac.latex + ' - (' + (n2 + n3) + ' + x)}{' + n4 + '} \\cdot ' + h + ' = ' + q3Frac.latex + ' \\Leftrightarrow x = ' + x + '$, suy ra $y = ' + y + '$.',
          'Số trung bình $\\overline{x} = ' + meanFrac.latex + ' \\approx ' + fmt2(meanFrac.value) + '$; phương sai $s^2 = ' + varFrac.latex + ' \\approx ' + fmt2(varFrac.value) + '$.',
          'Độ lệch chuẩn: $s = \\sqrt{s^2} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 3n/4 rơi vào nhóm 5', params: { a0: 10, h: 5, kx: 6, k2: 2, k3: 2, k4: 6, ky: 20 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 n=380, Q3=885/32, s=7,4', params: { a0: 10, h: 5, kx: 15, k2: 3, k3: 2, k4: 16, ky: 2 }, expectedValid: true },
    ],
  },
};

export const G12_B10_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B10_TEMPLATES).filter(
  (t) => t.category === 'MC'
);
export const G12_B10_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B10_TEMPLATES).filter(
  (t) => t.category === 'TF'
);
export const G12_B10_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B10_TEMPLATES).filter(
  (t) => t.category === 'SA'
);
