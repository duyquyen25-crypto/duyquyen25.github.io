import { MathTemplate } from '../types/math';

export const G11_B30_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D09 (Q9): Hai người bạn đi câu cá (Minh và Phúc) - Đúng/Sai
  t11_b30_d09_two_friends_fishing_tf: {
    id: 't11_b30_d09_two_friends_fishing_tf',
    name: 'Xác suất câu cá của hai người bạn độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Hai người bạn đi câu cá với xác suất câu được cá độc lập p₁, p₂. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'pairIdx ∈ [0; 2], p1Int, p2Int ∈ [35; 85], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp tên bạn (0..2)', min: 0, max: 2 },
      { name: 'p1Int', label: '100·P(người 1 câu được)', min: 35, max: 85 },
      { name: 'p2Int', label: '100·P(người 2 câu được)', min: 35, max: 85 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { pairIdx, p1Int, p2Int, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 2) return { valid: false, reason: 'pairIdx ngoài miền [0; 2]' };
      if (!Number.isInteger(p1Int) || p1Int < 35 || p1Int > 85) return { valid: false, reason: 'p1Int ngoài miền [35; 85]' };
      if (!Number.isInteger(p2Int) || p2Int < 35 || p2Int > 85) return { valid: false, reason: 'p2Int ngoài miền [35; 85]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, p1Int, p2Int, aTrue, bTrue, cTrue, dTrue } = params;
      const PAIRS = [
        ['Minh', 'Phúc'],
        ['Hùng', 'Phúc'],
        ['An', 'Bình'],
      ];
      const [n1, n2] = PAIRS[pairIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt = (v) => u.formatNumberVN(v, 2);

      const ansA = r2(q1);
      const ansB = r2(p1 * q2 + q1 * p2);
      const ansC = r2(q1 * q2);
      const ansD = r2(1 - ansC);

      const makeWrong = (ans, shift) => {
        let w = r2(ans + shift);
        if (w > 0.97 || w < 0.03 || Math.abs(w - ans) < 0.02) {
          w = r2(ans >= 0.5 ? ans - Math.abs(shift) : ans + Math.abs(shift));
        }
        if (Math.abs(w - ans) < 0.02 || w > 0.97 || w < 0.03) {
          w = ans >= 0.5 ? r2(ans - 0.19) : r2(ans + 0.19);
        }
        return w;
      };

      const wrongA = makeWrong(ansA, 0.31);
      const wrongB = makeWrong(ansB, 0.27);
      const wrongC = makeWrong(ansC, 0.29);
      const wrongD = makeWrong(ansD, -0.24);

      const tfStatements = [
        { key: 'a', text: 'Xác suất ' + n1 + ' không câu được cá bằng $' + fmt(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất có đúng $1$ người câu được cá bằng $' + fmt(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để cả $2$ người đều không câu được cá bằng $' + fmt(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất có ít nhất $1$ người câu được cá bằng $' + fmt(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: n1 + ' và ' + n2 + ' rủ nhau đi câu cá vào ngày nghỉ cuối tuần. Xác suất câu được cá của ' + n1 + ' là $' + fmt(p1) + '$ và xác suất câu được cá của ' + n2 + ' là $' + fmt(p2) + '$ (hai người câu độc lập với nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Gọi $A, B$ lần lượt là biến cố ' + n1 + ', ' + n2 + ' câu được cá. Ta có $P(\\overline{A}) = 1 - ' + fmt(p1) + ' = ' + fmt(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $P(\\text{đúng } 1 \\text{ người}) = ' + fmt(p1) + '(1 - ' + fmt(p2) + ') + (1 - ' + fmt(p1) + ')' + fmt(p2) + ' \\approx ' + fmt(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $P(\\overline{A}\\,\\overline{B}) = (1 - ' + fmt(p1) + ')(1 - ' + fmt(p2) + ') \\approx ' + fmt(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $P(\\text{ít nhất } 1 \\text{ người}) = 1 - ' + fmt(ansC) + ' = ' + fmt(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 20', params: { pairIdx: 0, p1Int: 20, p2Int: 47, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (0,57 và 0,47 -> S S S Đ)', params: { pairIdx: 0, p1Int: 57, p2Int: 47, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Ba học sinh Quân, Phương, Dũng bắn bia - Đúng/Sai
  t11_b30_d10_shooting_three_tf: {
    id: 't11_b30_d10_shooting_three_tf',
    name: 'Ba học sinh thực hành bắn bia độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Ba bạn Quân, Phương và Dũng bắn bia với xác suất trúng độc lập p₁, p₂, p₃. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'p1Int ∈ [45; 90], p2Int ∈ [45; 92], p3Int ∈ [30; 90], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Quân trúng)', min: 45, max: 90 },
      { name: 'p2Int', label: '100·P(Phương trúng)', min: 45, max: 92 },
      { name: 'p3Int', label: '100·P(Dũng trúng)', min: 30, max: 90 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(p1Int) || p1Int < 45 || p1Int > 90) return { valid: false, reason: 'p1Int ngoài miền [45; 90]' };
      if (!Number.isInteger(p2Int) || p2Int < 45 || p2Int > 92) return { valid: false, reason: 'p2Int ngoài miền [45; 92]' };
      if (!Number.isInteger(p3Int) || p3Int < 30 || p3Int > 90) return { valid: false, reason: 'p3Int ngoài miền [30; 90]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const p1 = p1Int / 100, p2 = p2Int / 100, p3 = p3Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100, q3 = (100 - p3Int) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const ansA = r2(q3);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(1 - q1 * q2 * q3);

      const makeWrong = (ans, shift) => {
        let w = r2(ans + shift);
        if (w > 0.96 || w < 0.02 || Math.abs(w - ans) < 0.02) {
          w = r2(ans >= 0.5 ? ans - Math.abs(shift) : ans + Math.abs(shift));
        }
        if (Math.abs(w - ans) < 0.02 || w > 0.96 || w < 0.02) {
          w = ans >= 0.5 ? r2(ans - 0.17) : r2(ans + 0.17);
        }
        return w;
      };

      const wrongA = Math.abs(p3 - ansA) >= 0.02 ? p3 : makeWrong(ansA, 0.21);
      const wrongB = makeWrong(ansB, 0.19);
      const wrongC = makeWrong(ansC, 0.22);
      const wrongD = makeWrong(ansD, -0.25);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bạn Dũng bắn không trúng bia là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ bạn Quân bắn trúng bia là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai bạn bắn trúng bia là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để ít nhất một người bắn trúng bia là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Trong giờ học môn giáo dục quốc phòng, các bạn Quân, Phương và Dũng lần lượt thực hành bắn vào bia. Biết xác suất trúng bia của ba bạn lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (các lần bắn độc lập). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất bạn Dũng bắn không trúng bia là $1 - ' + fmt2(p3) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ bạn Quân bắn trúng bia là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai bạn trúng bia là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất ít nhất một người trúng bia là $1 - ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p3Int = 20', params: { p1Int: 74, p2Int: 90, p3Int: 20, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (0,74; 0,90; 0,78 -> S Đ Đ Đ)', params: { p1Int: 74, p2Int: 90, p3Int: 78, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Ba bác sĩ An, Sơn, Lâm xét nghiệm (ý d: không có bác sĩ nào đúng) - Đúng/Sai
  t11_b30_d11_doctors_diag_tf: {
    id: 't11_b30_d11_doctors_diag_tf',
    name: 'Ba bác sĩ xét nghiệm chẩn đoán bệnh độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Ba bác sĩ An, Sơn, Lâm xét nghiệm độc lập với xác suất chẩn đoán đúng p₁, p₂, p₃. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int, p3Int ∈ [40; 85], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(An đúng)', min: 40, max: 85 },
      { name: 'p2Int', label: '100·P(Sơn đúng)', min: 40, max: 85 },
      { name: 'p3Int', label: '100·P(Lâm đúng)', min: 40, max: 85 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      for (const v of [p1Int, p2Int, p3Int]) {
        if (!Number.isInteger(v) || v < 40 || v > 85) return { valid: false, reason: 'Xác suất phần trăm ngoài miền [40; 85]' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const p1 = p1Int / 100, p2 = p2Int / 100, p3 = p3Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100, q3 = (100 - p3Int) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const ansA = r2(q3);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(q1 * q2 * q3);

      const makeWrong = (ans, shift) => {
        let w = r2(ans + shift);
        if (w > 0.95 || w < 0.02 || Math.abs(w - ans) < 0.02) {
          w = r2(ans >= 0.5 ? ans - Math.abs(shift) : ans + Math.abs(shift));
        }
        if (Math.abs(w - ans) < 0.02 || w > 0.95 || w < 0.02) {
          w = ans >= 0.5 ? r2(ans - 0.16) : r2(ans + 0.16);
        }
        return w;
      };

      const wrongA = makeWrong(ansA, 0.23);
      const wrongB = makeWrong(ansB, 0.18);
      const wrongC = makeWrong(ansC, 0.14);
      const wrongD = makeWrong(ansD, 0.25);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bác sĩ Lâm chẩn đoán không đúng bệnh là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ bác sĩ An chẩn đoán đúng bệnh là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai bác sĩ chẩn đoán đúng bệnh là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để không có bác sĩ nào chẩn đoán đúng bệnh là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Trong một cuộc kiểm tra sức khỏe, ba bác sĩ An, Sơn và Lâm lần lượt xét nghiệm một bệnh nhân. Biết xác suất chẩn đoán đúng bệnh của ba bác sĩ lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (các chẩn đoán độc lập). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất bác sĩ Lâm chẩn đoán không đúng là $1 - ' + fmt2(p3) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ bác sĩ An chẩn đoán đúng là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai bác sĩ chẩn đoán đúng là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất không có bác sĩ nào chẩn đoán đúng là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 30', params: { p1Int: 30, p2Int: 75, p3Int: 63, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (0,74; 0,75; 0,63 -> Đ S S Đ)', params: { p1Int: 74, p2Int: 75, p3Int: 63, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Kỳ thi học sinh giỏi (Dũng, Minh, Phúc) - Đúng/Sai
  t11_b30_d12_contest_three_tf: {
    id: 't11_b30_d12_contest_three_tf',
    name: 'Ba học sinh dự thi học sinh giỏi làm bài độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Ba bạn Dũng, Minh, Phúc làm phần bài khó với xác suất đúng độc lập p₁, p₂, p₃. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int, p3Int ∈ [40; 88], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Dũng đúng)', min: 40, max: 88 },
      { name: 'p2Int', label: '100·P(Minh đúng)', min: 40, max: 88 },
      { name: 'p3Int', label: '100·P(Phúc đúng)', min: 40, max: 88 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      for (const v of [p1Int, p2Int, p3Int]) {
        if (!Number.isInteger(v) || v < 40 || v > 88) return { valid: false, reason: 'Xác suất phần trăm ngoài miền [40; 88]' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const p1 = p1Int / 100, p2 = p2Int / 100, p3 = p3Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100, q3 = (100 - p3Int) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const ansA = r2(q2);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(1 - q1 * q2 * q3);

      const makeWrong = (ans, shift) => {
        let w = r2(ans + shift);
        if (w > 0.96 || w < 0.02 || Math.abs(w - ans) < 0.02) {
          w = r2(ans >= 0.5 ? ans - Math.abs(shift) : ans + Math.abs(shift));
        }
        if (Math.abs(w - ans) < 0.02 || w > 0.96 || w < 0.02) {
          w = ans >= 0.5 ? r2(ans - 0.19) : r2(ans + 0.19);
        }
        return w;
      };

      const wrongA = makeWrong(ansA, 0.25);
      const wrongB = makeWrong(ansB, 0.21);
      const wrongC = makeWrong(ansC, -0.18);
      const wrongD = makeWrong(ansD, -0.25);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bạn Minh làm sai là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ bạn Dũng làm đúng là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai bạn làm đúng là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để ít nhất một bạn làm đúng là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Trong kỳ thi học sinh giỏi, các bạn Dũng, Minh và Phúc lần lượt làm bài. Biết xác suất mỗi bạn làm đúng phần bài khó nhất lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (độc lập nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất bạn Minh làm sai là $1 - ' + fmt2(p2) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ bạn Dũng làm đúng là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai bạn làm đúng là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất ít nhất một bạn làm đúng là $1 - ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p2Int = 95', params: { p1Int: 72, p2Int: 95, p3Int: 75, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (0,72; 0,79; 0,75 -> Đ Đ S Đ)', params: { p1Int: 72, p2Int: 79, p3Int: 75, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Ba kỹ sư Thảo, Vy, Hùng kiểm tra lỗi phần mềm - Đúng/Sai
  t11_b30_d13_engineers_qa_tf: {
    id: 't11_b30_d13_engineers_qa_tf',
    name: 'Ba kỹ sư kiểm tra lỗi phần mềm độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Ba kỹ sư Thảo, Vy, Hùng kiểm tra lỗi phần mềm với xác suất phát hiện đúng p₁, p₂, p₃. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int, p3Int ∈ [40; 88], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Thảo phát hiện)', min: 40, max: 88 },
      { name: 'p2Int', label: '100·P(Vy phát hiện)', min: 40, max: 88 },
      { name: 'p3Int', label: '100·P(Hùng phát hiện)', min: 40, max: 88 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      for (const v of [p1Int, p2Int, p3Int]) {
        if (!Number.isInteger(v) || v < 40 || v > 88) return { valid: false, reason: 'Xác suất phần trăm ngoài miền [40; 88]' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const p1 = p1Int / 100, p2 = p2Int / 100, p3 = p3Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100, q3 = (100 - p3Int) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const ansA = r2(q2);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(1 - q1 * q2 * q3);

      const makeWrong = (ans, shift) => {
        let w = r2(ans + shift);
        if (w > 0.96 || w < 0.02 || Math.abs(w - ans) < 0.02) {
          w = r2(ans >= 0.5 ? ans - Math.abs(shift) : ans + Math.abs(shift));
        }
        if (Math.abs(w - ans) < 0.02 || w > 0.96 || w < 0.02) {
          w = ans >= 0.5 ? r2(ans - 0.19) : r2(ans + 0.19);
        }
        return w;
      };

      const wrongA = makeWrong(ansA, 0.24);
      const wrongB = makeWrong(ansB, 0.31);
      const wrongC = makeWrong(ansC, -0.19);
      const wrongD = makeWrong(ansD, -0.25);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để kỹ sư Vy không phát hiện lỗi là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ kỹ sư Thảo phát hiện lỗi là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai kỹ sư phát hiện lỗi là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để ít nhất một kỹ sư phát hiện lỗi là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Ba kỹ sư Thảo, Vy và Hùng lần lượt kiểm tra lỗi phần mềm của một ứng dụng mới. Biết xác suất phát hiện đúng lỗi của ba kỹ sư lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (độc lập nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất kỹ sư Vy không phát hiện lỗi là $1 - ' + fmt2(p2) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ kỹ sư Thảo phát hiện lỗi là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai kỹ sư phát hiện lỗi là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất ít nhất một kỹ sư phát hiện lỗi là $1 - ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p3Int = 30', params: { p1Int: 66, p2Int: 82, p3Int: 30, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (0,66; 0,82; 0,85 -> Đ S Đ Đ)', params: { p1Int: 66, p2Int: 82, p3Int: 85, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Ba bệnh nhân Khang, Đạt, Kiên tiêm vắc xin - Đúng/Sai
  t11_b30_d14_vaccine_three_tf: {
    id: 't11_b30_d14_vaccine_three_tf',
    name: 'Ba bệnh nhân tiêm vắc xin có phản ứng tốt độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Ba bệnh nhân Khang, Đạt, Kiên tiêm vắc xin với xác suất phản ứng tốt độc lập p₁, p₂, p₃. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int, p3Int ∈ [50; 94], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Khang tốt)', min: 50, max: 94 },
      { name: 'p2Int', label: '100·P(Đạt tốt)', min: 50, max: 94 },
      { name: 'p3Int', label: '100·P(Kiên tốt)', min: 50, max: 94 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      for (const v of [p1Int, p2Int, p3Int]) {
        if (!Number.isInteger(v) || v < 50 || v > 94) return { valid: false, reason: 'Xác suất phần trăm ngoài miền [50; 94]' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const p1 = p1Int / 100, p2 = p2Int / 100, p3 = p3Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100, q3 = (100 - p3Int) / 100;
      const r2 = (v) => Math.round(v * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');

      const ansA = r2(q2);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(1 - q1 * q2 * q3);

      const makeWrong = (ans, shift) => {
        let w = r2(ans + shift);
        if (w > 0.96 || w < 0.02 || Math.abs(w - ans) < 0.02) {
          w = r2(ans >= 0.5 ? ans - Math.abs(shift) : ans + Math.abs(shift));
        }
        if (Math.abs(w - ans) < 0.02 || w > 0.96 || w < 0.02) {
          w = ans >= 0.5 ? r2(ans - 0.21) : r2(ans + 0.21);
        }
        return w;
      };

      const wrongA = Math.abs(p2 - ansA) >= 0.02 ? p2 : makeWrong(ansA, 0.24);
      const wrongB = makeWrong(ansB, 0.22);
      const wrongC = makeWrong(ansC, -0.17);
      const wrongD = makeWrong(ansD, -0.23);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bạn Đạt không phản ứng tốt là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ bạn Khang phản ứng tốt là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai bạn phản ứng tốt là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để ít nhất một bạn phản ứng tốt là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Ba bệnh nhân Khang, Đạt và Kiên lần lượt tiêm vắc xin. Biết xác suất mỗi bạn phản ứng tốt sau tiêm lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (độc lập nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất bạn Đạt không phản ứng tốt là $1 - ' + fmt2(p2) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ bạn Khang phản ứng tốt là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai bạn phản ứng tốt là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất ít nhất một bạn phản ứng tốt là $1 - ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p3Int = 98', params: { p1Int: 79, p2Int: 84, p3Int: 98, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (0,79; 0,84; 0,92 -> S S Đ Đ)', params: { p1Int: 79, p2Int: 84, p3Int: 92, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
