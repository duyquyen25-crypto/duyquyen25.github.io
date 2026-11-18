import { MathTemplate } from '../types/math';

export const G11_B29_MC_PART2: Record<string, MathTemplate> = {
  // D08 (Q8): Hai bệnh nhân X, Y; tính xác suất cả hai đều KHÔNG bị biến chứng nặng
  t11_b29_d08_patients_neither_mc: {
    id: 't11_b29_d08_patients_neither_mc',
    name: 'Xác suất cả hai bệnh nhân đều không bị biến chứng nặng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai bệnh nhân X, Y có xác suất biến chứng nặng độc lập là p₁, p₂. Tính xác suất cả hai đều không bị biến chứng nặng.',
    conditionSummary: 'a ∈ [10; 75], b ∈ [10; 75]',
    paramSpecs: [
      { name: 'a', label: '100·P(X nặng)', min: 10, max: 75 },
      { name: 'b', label: '100·P(Y nặng)', min: 10, max: 75 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 10 || a > 75) return { valid: false, reason: 'a ngoài miền [10; 75]' };
      if (!Number.isInteger(b) || b < 10 || b > 75) return { valid: false, reason: 'b ngoài miền [10; 75]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const ans = Math.round(q1 * q2 * 100) / 100;
      const fmtInput = (v) => String(Number(v.toFixed(2))).replace('.', ',');
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const candWrongs = [
        Math.round(p1 * p2 * 100) / 100,
        Math.round(p1 * q2 * 100) / 100,
        Math.round(q1 * p2 * 100) / 100,
        Math.round((ans + 0.11) * 100) / 100,
      ].filter((v) => v > 0 && Math.abs(v - ans) >= 0.01);

      const correct = '$' + fmt2(ans) + '$';
      const wrongs = candWrongs.map((v) => '$' + fmt2(v) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + fmt2(Math.min(0.99, ans + (idx + 2) * 0.07)) + '$'
      );

      return {
        stem: 'Hai bệnh nhân $X$ và $Y$ bị nhiễm một loại vi rút. Biết rằng xác suất bị biến chứng nặng của bệnh nhân $X$ là $' + fmtInput(p1) + '$ và của bệnh nhân $Y$ là $' + fmtInput(p2) + '$. Khả năng bị biến chứng nặng của hai bệnh nhân là độc lập. Tính xác suất của biến cố “Cả hai bệnh nhân đều không bị biến chứng nặng” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A$ là biến cố “Bệnh nhân $X$ bị biến chứng nặng” $\\Rightarrow P(A) = ' + fmtInput(p1) + ', P(\\overline{A}) = ' + fmtInput(q1) + '$.',
          'Gọi $B$ là biến cố “Bệnh nhân $Y$ bị biến chứng nặng” $\\Rightarrow P(B) = ' + fmtInput(p2) + ', P(\\overline{B}) = ' + fmtInput(q2) + '$.',
          'Do $\\overline{A}$ và $\\overline{B}$ độc lập nên $P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = ' + fmtInput(q1) + ' \\cdot ' + fmtInput(q2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 80', params: { a: 20, b: 80 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (0,2 và 0,47 -> 0,42)', params: { a: 20, b: 47 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Hai bệnh nhân X, Y; tính xác suất cả hai đều BỊ biến chứng nặng
  t11_b29_d09_patients_both_mc: {
    id: 't11_b29_d09_patients_both_mc',
    name: 'Xác suất cả hai bệnh nhân đều bị biến chứng nặng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai bệnh nhân X, Y có xác suất biến chứng nặng độc lập là p₁, p₂. Tính xác suất cả hai đều bị biến chứng nặng.',
    conditionSummary: 'a ∈ [15; 85], b ∈ [15; 85]',
    paramSpecs: [
      { name: 'a', label: '100·P(X nặng)', min: 15, max: 85 },
      { name: 'b', label: '100·P(Y nặng)', min: 15, max: 85 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 15 || a > 85) return { valid: false, reason: 'a ngoài miền [15; 85]' };
      if (!Number.isInteger(b) || b < 15 || b > 85) return { valid: false, reason: 'b ngoài miền [15; 85]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const ans = Math.round(p1 * p2 * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const candWrongs = [
        Math.round(q1 * q2 * 100) / 100,
        Math.round(q1 * p2 * 100) / 100,
        Math.round(p1 * q2 * 100) / 100,
        Math.round((ans + 0.09) * 100) / 100,
      ].filter((v) => v > 0 && Math.abs(v - ans) >= 0.01);

      const correct = '$' + fmt2(ans) + '$';
      const wrongs = candWrongs.map((v) => '$' + fmt2(v) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + fmt2(Math.min(0.99, ans + (idx + 2) * 0.08)) + '$'
      );

      return {
        stem: 'Hai bệnh nhân $X$ và $Y$ bị nhiễm một loại vi rút. Biết rằng xác suất bị biến chứng nặng của bệnh nhân $X$ là $' + fmt2(p1) + '$ và của bệnh nhân $Y$ là $' + fmt2(p2) + '$. Khả năng bị biến chứng nặng của hai bệnh nhân là độc lập. Tính xác suất của biến cố “Cả hai bệnh nhân đều bị biến chứng nặng” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố bệnh nhân $X$ và $Y$ bị biến chứng nặng; ta có $P(A) = ' + fmt2(p1) + ', P(B) = ' + fmt2(p2) + '$.',
          'Do $A$ và $B$ độc lập nên $P(AB) = P(A) \\cdot P(B) = ' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 10', params: { a: 10, b: 28 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (0,63 và 0,28 -> 0,18)', params: { a: 63, b: 28 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Hai bệnh nhân X, Y; tính xác suất CHỈ MỘT trong hai không bị biến chứng nặng
  t11_b29_d10_patients_exactly_one_mc: {
    id: 't11_b29_d10_patients_exactly_one_mc',
    name: 'Xác suất chỉ một trong hai bệnh nhân không bị biến chứng nặng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai bệnh nhân X, Y có xác suất biến chứng nặng độc lập là p₁, p₂. Tính xác suất chỉ một trong hai bệnh nhân không bị biến chứng nặng.',
    conditionSummary: 'a ∈ [15; 85], b ∈ [15; 85]',
    paramSpecs: [
      { name: 'a', label: '100·P(X nặng)', min: 15, max: 85 },
      { name: 'b', label: '100·P(Y nặng)', min: 15, max: 85 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 15 || a > 85) return { valid: false, reason: 'a ngoài miền [15; 85]' };
      if (!Number.isInteger(b) || b < 15 || b > 85) return { valid: false, reason: 'b ngoài miền [15; 85]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const ans = Math.round((q1 * p2 + p1 * q2) * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const candWrongs = [
        Math.round(q1 * p2 * 100) / 100,
        Math.round(p1 * q2 * 100) / 100,
        Math.round(p1 * p2 * 100) / 100,
        Math.round(q1 * q2 * 100) / 100,
      ].filter((v) => v > 0 && Math.abs(v - ans) >= 0.01);

      const correct = '$' + fmt2(ans) + '$';
      const wrongs = candWrongs.map((v) => '$' + fmt2(v) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + fmt2(Math.min(0.99, ans + (idx + 2) * 0.09)) + '$'
      );

      return {
        stem: 'Hai bệnh nhân $X$ và $Y$ bị nhiễm một loại vi rút. Biết rằng xác suất bị biến chứng nặng của bệnh nhân $X$ là $' + fmt2(p1) + '$ và của bệnh nhân $Y$ là $' + fmt2(p2) + '$. Khả năng bị biến chứng nặng của hai bệnh nhân là độc lập. Tính xác suất của biến cố “Chỉ một trong hai bệnh nhân không bị biến chứng nặng” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố bệnh nhân $X, Y$ bị biến chứng nặng. Ta có $P(\\overline{A}) = ' + fmt2(q1) + '$, $P(\\overline{B}) = ' + fmt2(q2) + '$.',
          'Biến cố “Chỉ một trong hai bệnh nhân không bị biến chứng nặng” là $\\overline{A}B \\cup A\\overline{B}$.',
          'Do hai biến cố $\\overline{A}B$ và $A\\overline{B}$ xung khắc và $A, B$ độc lập nên $P = P(\\overline{A})P(B) + P(A)P(\\overline{B}) = ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 90', params: { a: 90, b: 17 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (0,52 và 0,17 -> 0,51)', params: { a: 52, b: 17 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Xạ thủ bắn 2 viên đạn; tính xác suất CẢ HAI lần bắn đều trúng đích
  t11_b29_d11_shooter_both_hit_mc: {
    id: 't11_b29_d11_shooter_both_hit_mc',
    name: 'Xác suất xạ thủ bắn cả hai lần đều trúng đích',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Xạ thủ bắn 2 viên độc lập với xác suất trúng lần lượt là p₁, p₂. Tính xác suất cả hai lần đều trúng.',
    conditionSummary: 'a ∈ [15; 85], b ∈ [15; 85]',
    paramSpecs: [
      { name: 'a', label: '100·P(viên 1 trúng)', min: 15, max: 85 },
      { name: 'b', label: '100·P(viên 2 trúng)', min: 15, max: 85 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 15 || a > 85) return { valid: false, reason: 'a ngoài miền [15; 85]' };
      if (!Number.isInteger(b) || b < 15 || b > 85) return { valid: false, reason: 'b ngoài miền [15; 85]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const ans = Math.round(p1 * p2 * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const candWrongs = [
        Math.round((p1 * q2) * 100) / 100,
        Math.round((q1 * q2) * 100) / 100,
        Math.round((q1 * p2) * 100) / 100,
        Math.round((ans + 0.07) * 100) / 100,
      ].filter((v) => v > 0 && Math.abs(v - ans) >= 0.01);

      const correct = '$' + fmt2(ans) + '$';
      const wrongs = candWrongs.map((v) => '$' + fmt2(v) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + fmt2(Math.min(0.99, ans + (idx + 2) * 0.06)) + '$'
      );

      return {
        stem: 'Một xạ thủ bắn lần lượt $2$ viên đạn vào một bia. Xác suất trúng đích của viên thứ nhất là $' + fmt2(p1) + '$ và của viên thứ hai là $' + fmt2(p2) + '$. Biết rằng kết quả của các lần bắn là độc lập với nhau. Tính xác suất của biến cố “Cả hai lần bắn đều trúng đích” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố viên thứ nhất, viên thứ hai bắn trúng: $P(A) = ' + fmt2(p1) + ', P(B) = ' + fmt2(p2) + '$.',
          'Do $A$ và $B$ độc lập nên $P(AB) = P(A) \\cdot P(B) = ' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 10', params: { a: 55, b: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (0,55 và 0,44 -> 0,24)', params: { a: 55, b: 44 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Xạ thủ bắn 2 viên đạn; tính xác suất CẢ HAI lần bắn đều KHÔNG trúng đích
  t11_b29_d12_shooter_neither_hit_mc: {
    id: 't11_b29_d12_shooter_neither_hit_mc',
    name: 'Xác suất xạ thủ bắn cả hai lần đều không trúng đích',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Xạ thủ bắn 2 viên độc lập với xác suất trúng lần lượt là p₁, p₂. Tính xác suất cả hai lần đều không trúng.',
    conditionSummary: 'a ∈ [10; 80], b ∈ [10; 80]',
    paramSpecs: [
      { name: 'a', label: '100·P(viên 1 trúng)', min: 10, max: 80 },
      { name: 'b', label: '100·P(viên 2 trúng)', min: 10, max: 80 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 10 || a > 80) return { valid: false, reason: 'a ngoài miền [10; 80]' };
      if (!Number.isInteger(b) || b < 10 || b > 80) return { valid: false, reason: 'b ngoài miền [10; 80]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const ans = Math.round(q1 * q2 * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const candWrongs = [
        Math.round(p1 * q2 * 100) / 100,
        Math.round(q1 * p2 * 100) / 100,
        Math.round(p1 * p2 * 100) / 100,
        Math.round((ans + 0.13) * 100) / 100,
      ].filter((v) => v > 0 && Math.abs(v - ans) >= 0.01);

      const correct = '$' + fmt2(ans) + '$';
      const wrongs = candWrongs.map((v) => '$' + fmt2(v) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + fmt2(Math.min(0.99, ans + (idx + 2) * 0.07)) + '$'
      );

      return {
        stem: 'Một xạ thủ bắn lần lượt $2$ viên đạn vào một bia. Xác suất trúng đích của viên thứ nhất là $' + fmt2(p1) + '$ và của viên thứ hai là $' + fmt2(p2) + '$. Biết rằng kết quả của các lần bắn là độc lập với nhau. Tính xác suất của biến cố “Cả hai lần bắn đều không trúng đích” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố viên thứ nhất và viên thứ hai bắn trúng: $P(\\overline{A}) = ' + fmt2(q1) + ', P(\\overline{B}) = ' + fmt2(q2) + '$.',
          'Do $\\overline{A}$ và $\\overline{B}$ độc lập nên $P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 5', params: { a: 5, b: 57 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (0,11 và 0,57 -> 0,38)', params: { a: 11, b: 57 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Xạ thủ bắn 2 viên đạn; tính xác suất CHỈ MỘT lần bắn trúng đích
  t11_b29_d13_shooter_one_hit_mc: {
    id: 't11_b29_d13_shooter_one_hit_mc',
    name: 'Xác suất xạ thủ bắn chỉ một lần trúng đích',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Xạ thủ bắn 2 viên độc lập với xác suất trúng lần lượt là p₁, p₂. Tính xác suất chỉ một lần trúng đích.',
    conditionSummary: 'a ∈ [15; 85], b ∈ [15; 85]',
    paramSpecs: [
      { name: 'a', label: '100·P(viên 1 trúng)', min: 15, max: 85 },
      { name: 'b', label: '100·P(viên 2 trúng)', min: 15, max: 85 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 15 || a > 85) return { valid: false, reason: 'a ngoài miền [15; 85]' };
      if (!Number.isInteger(b) || b < 15 || b > 85) return { valid: false, reason: 'b ngoài miền [15; 85]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const ans = Math.round((q1 * p2 + p1 * q2) * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const candWrongs = [
        Math.round(p1 * q2 * 100) / 100,
        Math.round(p1 * p2 * 100) / 100,
        Math.round(q1 * p2 * 100) / 100,
        Math.round(q1 * q2 * 100) / 100,
      ].filter((v) => v > 0 && Math.abs(v - ans) >= 0.01);

      const correct = '$' + fmt2(ans) + '$';
      const wrongs = candWrongs.map((v) => '$' + fmt2(v) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + fmt2(Math.min(0.99, ans + (idx + 2) * 0.08)) + '$'
      );

      return {
        stem: 'Một xạ thủ bắn lần lượt $2$ viên đạn vào một bia. Xác suất trúng đích của viên thứ nhất là $' + fmt2(p1) + '$ và của viên thứ hai là $' + fmt2(p2) + '$. Biết rằng kết quả của các lần bắn là độc lập với nhau. Tính xác suất của biến cố “Chỉ một lần bắn trúng đích” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố viên thứ nhất và viên thứ hai bắn trúng: $P(\\overline{A}) = ' + fmt2(q1) + ', P(\\overline{B}) = ' + fmt2(q2) + '$.',
          'Xác suất chỉ một lần bắn trúng đích là $P(\\overline{A}B \\cup A\\overline{B}) = P(\\overline{A})P(B) + P(A)P(\\overline{B}) = ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 90', params: { a: 90, b: 42 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (0,19 và 0,42 -> 0,45)', params: { a: 19, b: 42 }, expectedValid: true },
    ],
  },
};
