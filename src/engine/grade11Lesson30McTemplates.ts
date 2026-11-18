import { MathTemplate } from '../types/math';

export const G11_B30_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Cho A, B độc lập, biết P(A), P(B) -> tính P(AB) (làm tròn hàng phần nghìn)
  t11_b30_d01_indep_ab_prob_mc: {
    id: 't11_b30_d01_indep_ab_prob_mc',
    name: 'Tính xác suất biến cố giao P(AB) của hai biến cố độc lập',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức nhân xác suất',
    description: 'Cho hai biến cố độc lập A, B với P(A), P(B) dạng thập phân. Tính xác suất P(AB) làm tròn đến hàng phần nghìn.',
    conditionSummary: 'pA100, pB100 ∈ [10; 90]',
    paramSpecs: [
      { name: 'pA100', label: '100·P(A)', min: 10, max: 90 },
      { name: 'pB100', label: '100·P(B)', min: 10, max: 90 },
    ],
    validateCode: `
      const { pA100, pB100 } = params;
      if (!Number.isInteger(pA100) || pA100 < 10 || pA100 > 90) return { valid: false, reason: 'pA100 ngoài miền [10; 90]' };
      if (!Number.isInteger(pB100) || pB100 < 10 || pB100 > 90) return { valid: false, reason: 'pB100 ngoài miền [10; 90]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pA100, pB100 } = params;
      const pA = pA100 / 100;
      const pB = pB100 / 100;
      const qA = (100 - pA100) / 100;
      const qB = (100 - pB100) / 100;
      const r3 = (v) => Math.round(v * 1000 + 1e-9) / 1000;
      const fmtIn = (v) => u.formatNumberVN(v, 2);
      const fmt3 = (v) => u.formatNumberVN(r3(v), 3);

      const ans = r3(pA * pB);
      const correct = '$' + fmt3(ans) + '$';
      const candVals = [
        r3(pA * qB),
        r3(qA * qB),
        r3(qA * pB),
        r3(pA + pB - pA * pB),
        r3(ans + 0.111),
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - ans) >= 0.002);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt3(v) + '$'),
        rng,
        (idx) => '$' + fmt3(((Math.round(ans * 1000) + idx * 37) % 890 + 15) / 1000) + '$'
      );

      return {
        stem: 'Cho $A$ và $B$ là hai biến cố độc lập. Biết $P(A) = ' + fmtIn(pA) + '$ và $P(B) = ' + fmtIn(pB) + '$. Tính xác suất của biến cố $AB$ (kết quả làm tròn đến hàng phần nghìn).',
        options,
        correctIndex,
        answerSummary: fmt3(ans),
        solutionSteps: [
          'Do $A$ và $B$ là hai biến cố độc lập nên $P(AB) = P(A) \\cdot P(B) = ' + fmtIn(pA) + ' \\cdot ' + fmtIn(pB) + ' = ' + fmt3(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pA100 = 5', params: { pA100: 5, pB100: 60 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (0,63 và 0,6 -> 0,378)', params: { pA100: 63, pB100: 60 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Cho A, B độc lập, biết P(A), P(B) -> tính P(Ā B)
  t11_b30_d02_indep_comp_a_b_mc: {
    id: 't11_b30_d02_indep_comp_a_b_mc',
    name: 'Tính xác suất P(ĀB) của hai biến cố độc lập',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức nhân xác suất',
    description: 'Cho hai biến cố độc lập A, B với P(A), P(B). Tính xác suất của biến cố ĀB.',
    conditionSummary: 'pA100, pB100 ∈ [15; 90]',
    paramSpecs: [
      { name: 'pA100', label: '100·P(A)', min: 15, max: 90 },
      { name: 'pB100', label: '100·P(B)', min: 15, max: 90 },
    ],
    validateCode: `
      const { pA100, pB100 } = params;
      if (!Number.isInteger(pA100) || pA100 < 15 || pA100 > 90) return { valid: false, reason: 'pA100 ngoài miền [15; 90]' };
      if (!Number.isInteger(pB100) || pB100 < 15 || pB100 > 90) return { valid: false, reason: 'pB100 ngoài miền [15; 90]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pA100, pB100 } = params;
      const pA = pA100 / 100;
      const pB = pB100 / 100;
      const qA = (100 - pA100) / 100;
      const qB = (100 - pB100) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmtIn = (v) => u.formatNumberVN(v, 2);

      const ans = r2(qA * pB);
      const correct = '$' + fmtIn(ans) + '$';
      const candVals = [
        r2(qA * qB),
        r2(pA * qB),
        r2(pA * pB),
        r2(ans + 0.07),
        r2(Math.max(0.03, ans - 0.12)),
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - ans) >= 0.01);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmtIn(v) + '$'),
        rng,
        (idx) => '$' + fmtIn(((Math.round(ans * 100) + idx * 11) % 89 + 4) / 100) + '$'
      );

      return {
        stem: 'Cho $A$ và $B$ là hai biến cố độc lập. Biết $P(A) = ' + fmtIn(pA) + '$ và $P(B) = ' + fmtIn(pB) + '$. Tính xác suất của biến cố $\\overline{A}B$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmtIn(ans),
        solutionSteps: [
          'Vì $A$ và $B$ độc lập nên $\\overline{A}$ và $B$ cũng độc lập, với $P(\\overline{A}) = 1 - ' + fmtIn(pA) + ' = ' + fmtIn(qA) + '$.',
          'Do đó $P(\\overline{A}B) = P(\\overline{A}) \\cdot P(B) = ' + fmtIn(qA) + ' \\cdot ' + fmtIn(pB) + ' \\approx ' + fmtIn(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pB100 = 10', params: { pA100: 53, pB100: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (0,53 và 0,85 -> 0,4)', params: { pA100: 53, pB100: 85 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hai bệnh nhân X, Y; tính xác suất cả hai đều KHÔNG bị biến chứng nặng
  t11_b30_d03_patients_neither_mc: {
    id: 't11_b30_d03_patients_neither_mc',
    name: 'Xác suất cả hai bệnh nhân đều không bị biến chứng nặng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Hai bệnh nhân X, Y có xác suất biến chứng nặng độc lập là p₁, p₂. Tính xác suất cả hai đều không bị biến chứng nặng.',
    conditionSummary: 'a, b ∈ [15; 85] và (100 - a)(100 - b) ≥ 150',
    paramSpecs: [
      { name: 'a', label: '100·P(X nặng)', min: 15, max: 85 },
      { name: 'b', label: '100·P(Y nặng)', min: 15, max: 85 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 15 || a > 85) return { valid: false, reason: 'a ngoài miền [15; 85]' };
      if (!Number.isInteger(b) || b < 15 || b > 85) return { valid: false, reason: 'b ngoài miền [15; 85]' };
      if ((100 - a) * (100 - b) < 150) return { valid: false, reason: 'Xác suất kết quả quá nhỏ (< 0,02)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const fmtIn = (v) => u.formatNumberVN(v, 2);

      const ans = r2(q1 * q2);
      const correct = '$' + fmt2(ans) + '$';
      const candVals = [
        r2(p1 * p2),
        r2(p1 * q2),
        r2(q1 * p2),
        r2(ans + 0.05),
        r2(ans + 0.21),
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - ans) >= 0.01);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt2(v) + '$'),
        rng,
        (idx) => '$' + fmt2(((Math.round(ans * 100) + idx * 9) % 85 + 3) / 100) + '$'
      );

      return {
        stem: 'Hai bệnh nhân $X$ và $Y$ bị nhiễm một loại vi rút. Biết rằng xác suất bị biến chứng nặng của bệnh nhân $X$ là $' + fmtIn(p1) + '$ và của bệnh nhân $Y$ là $' + fmtIn(p2) + '$. Khả năng bị biến chứng nặng của hai bệnh nhân là độc lập. Tính xác suất của biến cố “Cả hai bệnh nhân đều không bị biến chứng nặng” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A$ là biến cố “Bệnh nhân $X$ bị biến chứng nặng” $\\Rightarrow P(A) = ' + fmtIn(p1) + ',\\, P(\\overline{A}) = ' + fmtIn(q1) + '$.',
          'Gọi $B$ là biến cố “Bệnh nhân $Y$ bị biến chứng nặng” $\\Rightarrow P(B) = ' + fmtIn(p2) + ',\\, P(\\overline{B}) = ' + fmtIn(q2) + '$.',
          'Do $\\overline{A}$ và $\\overline{B}$ độc lập nên $P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = ' + fmtIn(q1) + ' \\cdot ' + fmtIn(q2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 90', params: { a: 90, b: 85 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (0,83 và 0,67 -> 0,06)', params: { a: 83, b: 67 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Hai bệnh nhân X, Y; tính xác suất cả hai đều BỊ biến chứng nặng
  t11_b30_d04_patients_both_mc: {
    id: 't11_b30_d04_patients_both_mc',
    name: 'Xác suất cả hai bệnh nhân đều bị biến chứng nặng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Hai bệnh nhân X, Y có xác suất biến chứng nặng độc lập là p₁, p₂. Tính xác suất cả hai đều bị biến chứng nặng.',
    conditionSummary: 'a, b ∈ [15; 85]',
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
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const fmtIn = (v) => u.formatNumberVN(v, 2);

      const ans = r2(p1 * p2);
      const correct = '$' + fmt2(ans) + '$';
      const candVals = [
        r2(q1 * q2),
        r2(p1 * q2),
        r2(q1 * p2),
        r2(ans + 0.13),
        r2(Math.max(0.03, ans - 0.11)),
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - ans) >= 0.01);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt2(v) + '$'),
        rng,
        (idx) => '$' + fmt2(((Math.round(ans * 100) + idx * 7) % 85 + 3) / 100) + '$'
      );

      return {
        stem: 'Hai bệnh nhân $X$ và $Y$ bị nhiễm một loại vi rút. Biết rằng xác suất bị biến chứng nặng của bệnh nhân $X$ là $' + fmtIn(p1) + '$ và của bệnh nhân $Y$ là $' + fmtIn(p2) + '$. Khả năng bị biến chứng nặng của hai bệnh nhân là độc lập. Tính xác suất của biến cố “Cả hai bệnh nhân đều bị biến chứng nặng” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố bệnh nhân $X$ và $Y$ bị biến chứng nặng, ta có $P(A) = ' + fmtIn(p1) + ',\\, P(B) = ' + fmtIn(p2) + '$.',
          'Do $A$ và $B$ độc lập nên xác suất để cả hai bệnh nhân đều bị biến chứng nặng là $P(AB) = P(A) \\cdot P(B) = ' + fmtIn(p1) + ' \\cdot ' + fmtIn(p2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 10', params: { a: 10, b: 37 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (0,76 và 0,37 -> 0,28)', params: { a: 76, b: 37 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hai bệnh nhân X, Y; tính xác suất chỉ một trong hai không bị biến chứng nặng
  t11_b30_d05_patients_exactly_one_mc: {
    id: 't11_b30_d05_patients_exactly_one_mc',
    name: 'Xác suất chỉ một trong hai bệnh nhân không bị biến chứng nặng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Hai bệnh nhân X, Y có xác suất biến chứng nặng độc lập là p₁, p₂. Tính xác suất chỉ một trong hai không bị biến chứng nặng.',
    conditionSummary: 'a, b ∈ [15; 85]',
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
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const fmtIn = (v) => u.formatNumberVN(v, 2);

      const ans = r2(q1 * p2 + p1 * q2);
      const correct = '$' + fmt2(ans) + '$';
      const candVals = [
        r2(q1 * p2),
        r2(p1 * q2),
        r2(p1 * p2),
        r2(q1 * q2),
        r2(ans + 0.14),
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - ans) >= 0.01);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt2(v) + '$'),
        rng,
        (idx) => '$' + fmt2(((Math.round(ans * 100) + idx * 11) % 85 + 3) / 100) + '$'
      );

      return {
        stem: 'Hai bệnh nhân $X$ và $Y$ bị nhiễm một loại vi rút. Biết rằng xác suất bị biến chứng nặng của bệnh nhân $X$ là $' + fmtIn(p1) + '$ và của bệnh nhân $Y$ là $' + fmtIn(p2) + '$. Khả năng bị biến chứng nặng của hai bệnh nhân là độc lập. Tính xác suất của biến cố “Chỉ một trong hai bệnh nhân không bị biến chứng nặng” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố bệnh nhân $X, Y$ bị biến chứng nặng $\\Rightarrow P(\\overline{A}) = ' + fmtIn(q1) + ',\\, P(\\overline{B}) = ' + fmtIn(q2) + '$.',
          'Xác suất chỉ một trong hai bệnh nhân không bị biến chứng nặng là:',
          '$P(\\overline{A}B \\cup A\\overline{B}) = P(\\overline{A})P(B) + P(A)P(\\overline{B}) = ' + fmtIn(q1) + ' \\cdot ' + fmtIn(p2) + ' + ' + fmtIn(p1) + ' \\cdot ' + fmtIn(q2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 90', params: { a: 32, b: 90 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (0,32 và 0,31 -> 0,43)', params: { a: 32, b: 31 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Xạ thủ bắn 2 viên đạn, tính xác suất cả hai lần đều trúng đích
  t11_b30_d06_shooter_both_hit_mc: {
    id: 't11_b30_d06_shooter_both_hit_mc',
    name: 'Xác suất xạ thủ bắn cả hai viên đạn đều trúng đích',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Xạ thủ bắn 2 viên đạn độc lập với xác suất trúng p₁, p₂. Tính xác suất cả hai lần đều trúng đích.',
    conditionSummary: 'a, b ∈ [12; 92]',
    paramSpecs: [
      { name: 'a', label: '100·P(viên 1 trúng)', min: 12, max: 92 },
      { name: 'b', label: '100·P(viên 2 trúng)', min: 12, max: 92 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 12 || a > 92) return { valid: false, reason: 'a ngoài miền [12; 92]' };
      if (!Number.isInteger(b) || b < 12 || b > 92) return { valid: false, reason: 'b ngoài miền [12; 92]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const fmtIn = (v) => u.formatNumberVN(v, 2);

      const ans = r2(p1 * p2);
      const correct = '$' + fmt2(ans) + '$';
      const candVals = [
        r2(q1 * q2),
        r2(q1 * p2),
        r2(p1 * q2),
        r2(ans + 0.14),
        r2(Math.max(0.02, ans - 0.08)),
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - ans) >= 0.01);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt2(v) + '$'),
        rng,
        (idx) => '$' + fmt2(((Math.round(ans * 100) + idx * 9) % 85 + 2) / 100) + '$'
      );

      return {
        stem: 'Một xạ thủ bắn lần lượt $2$ viên đạn vào một bia. Xác suất trúng đích của viên thứ nhất là $' + fmtIn(p1) + '$ và của viên thứ hai là $' + fmtIn(p2) + '$. Biết rằng kết quả của các lần bắn là độc lập với nhau. Tính xác suất của biến cố “Cả hai lần bắn đều trúng đích” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố viên thứ nhất và viên thứ hai bắn trúng, ta có $P(A) = ' + fmtIn(p1) + ',\\, P(B) = ' + fmtIn(p2) + '$.',
          'Do $A$ và $B$ độc lập nên $P(AB) = P(A) \\cdot P(B) = ' + fmtIn(p1) + ' \\cdot ' + fmtIn(p2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 5', params: { a: 5, b: 89 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (0,14 và 0,89 -> 0,12)', params: { a: 14, b: 89 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Xạ thủ bắn 2 viên đạn, tính xác suất cả hai lần đều KHÔNG trúng đích
  t11_b30_d07_shooter_neither_hit_mc: {
    id: 't11_b30_d07_shooter_neither_hit_mc',
    name: 'Xác suất xạ thủ bắn cả hai viên đạn đều không trúng đích',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Xạ thủ bắn 2 viên đạn độc lập với xác suất trúng p₁, p₂. Tính xác suất cả hai lần đều không trúng đích.',
    conditionSummary: 'a, b ∈ [15; 85] và (100 - a)(100 - b) ≥ 150',
    paramSpecs: [
      { name: 'a', label: '100·P(viên 1 trúng)', min: 15, max: 85 },
      { name: 'b', label: '100·P(viên 2 trúng)', min: 15, max: 85 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 15 || a > 85) return { valid: false, reason: 'a ngoài miền [15; 85]' };
      if (!Number.isInteger(b) || b < 15 || b > 85) return { valid: false, reason: 'b ngoài miền [15; 85]' };
      if ((100 - a) * (100 - b) < 150) return { valid: false, reason: 'Xác suất kết quả quá nhỏ (< 0,02)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const fmtIn = (v) => u.formatNumberVN(v, 2);

      const ans = r2(q1 * q2);
      const correct = '$' + fmt2(ans) + '$';
      const candVals = [
        r2(p1 * p2),
        r2(p1 * q2),
        r2(q1 * p2),
        r2(ans + 0.13),
        r2(ans + 0.25),
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - ans) >= 0.01);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt2(v) + '$'),
        rng,
        (idx) => '$' + fmt2(((Math.round(ans * 100) + idx * 7) % 85 + 3) / 100) + '$'
      );

      return {
        stem: 'Một xạ thủ bắn lần lượt $2$ viên đạn vào một bia. Xác suất trúng đích của viên thứ nhất là $' + fmtIn(p1) + '$ và của viên thứ hai là $' + fmtIn(p2) + '$. Biết rằng kết quả của các lần bắn là độc lập với nhau. Tính xác suất của biến cố “Cả hai lần bắn đều không trúng đích” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố viên thứ nhất và viên thứ hai bắn trúng $\\Rightarrow P(\\overline{A}) = ' + fmtIn(q1) + ',\\, P(\\overline{B}) = ' + fmtIn(q2) + '$.',
          'Do $\\overline{A}$ và $\\overline{B}$ độc lập nên $P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = ' + fmtIn(q1) + ' \\cdot ' + fmtIn(q2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 90', params: { a: 90, b: 85 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (0,67 và 0,69 -> 0,10)', params: { a: 67, b: 69 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Xạ thủ bắn 2 viên đạn, tính xác suất chỉ một lần bắn trúng đích
  t11_b30_d08_shooter_one_hit_mc: {
    id: 't11_b30_d08_shooter_one_hit_mc',
    name: 'Xác suất xạ thủ bắn chỉ có đúng một lần trúng đích',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Xạ thủ bắn 2 viên đạn độc lập với xác suất trúng p₁, p₂. Tính xác suất chỉ một lần bắn trúng đích.',
    conditionSummary: 'a, b ∈ [10; 85]',
    paramSpecs: [
      { name: 'a', label: '100·P(viên 1 trúng)', min: 10, max: 85 },
      { name: 'b', label: '100·P(viên 2 trúng)', min: 10, max: 85 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 10 || a > 85) return { valid: false, reason: 'a ngoài miền [10; 85]' };
      if (!Number.isInteger(b) || b < 10 || b > 85) return { valid: false, reason: 'b ngoài miền [10; 85]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const p1 = a / 100, p2 = b / 100;
      const q1 = (100 - a) / 100, q2 = (100 - b) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const fmtIn = (v) => u.formatNumberVN(v, 2);

      const ans = r2(q1 * p2 + p1 * q2);
      const correct = '$' + fmt2(ans) + '$';
      const candVals = [
        r2(p1 * p2),
        r2(p1 * q2),
        r2(q1 * p2),
        r2(q1 * q2),
        r2(ans + 0.12),
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - ans) >= 0.01);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt2(v) + '$'),
        rng,
        (idx) => '$' + fmt2(((Math.round(ans * 100) + idx * 11) % 85 + 2) / 100) + '$'
      );

      return {
        stem: 'Một xạ thủ bắn lần lượt $2$ viên đạn vào một bia. Xác suất trúng đích của viên thứ nhất là $' + fmtIn(p1) + '$ và của viên thứ hai là $' + fmtIn(p2) + '$. Biết rằng kết quả của các lần bắn là độc lập với nhau. Tính xác suất của biến cố “chỉ một lần bắn trúng đích” (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: fmt2(ans),
        solutionSteps: [
          'Gọi $A, B$ lần lượt là biến cố viên thứ nhất và viên thứ hai bắn trúng $\\Rightarrow P(\\overline{A}) = ' + fmtIn(q1) + ',\\, P(\\overline{B}) = ' + fmtIn(q2) + '$.',
          'Xác suất để chỉ một lần bắn trúng đích là:',
          '$P(\\overline{A}B \\cup A\\overline{B}) = P(\\overline{A})P(B) + P(A)P(\\overline{B}) = ' + fmtIn(q1) + ' \\cdot ' + fmtIn(p2) + ' + ' + fmtIn(p1) + ' \\cdot ' + fmtIn(q2) + ' \\approx ' + fmt2(ans) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 5', params: { a: 5, b: 14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (0,1 và 0,14 -> 0,21)', params: { a: 10, b: 14 }, expectedValid: true },
    ],
  },
};
