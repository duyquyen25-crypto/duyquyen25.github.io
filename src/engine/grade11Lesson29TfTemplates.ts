import { MathTemplate } from '../types/math';

export const G11_B29_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D14 (Q14): Lăng trụ ABC.A1B1C1, P, I trung điểm A1C1, BC; Q trọng tâm ΔA1BC (Đúng/Sai)
  t11_b29_d14_prism_proj_tf: {
    id: 't11_b29_d14_prism_proj_tf',
    name: 'Phép chiếu song song trên lăng trụ ABC.A₁B₁C₁ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho lăng trụ ABC.A₁B₁C₁ có P, I là trung điểm A₁C₁, BC; Q là trọng tâm ΔA₁BC. Xét 4 mệnh đề Đúng/Sai về phép chiếu song song.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh và điểm (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1', P: 'P', I: 'I', Q: 'Q', Qp: "Q'" },
        { A: 'A', B: 'B', C: 'C', A1: "A'", B1: "B'", C1: "C'", P: 'G', I: 'N', Q: 'M', Qp: "M'" },
        { A: 'M', B: 'N', C: 'P', A1: 'M_1', B1: 'N_1', C1: 'P_1', P: 'E', I: 'H', Q: 'G', Qp: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.A1 + s.B1 + s.C1;
      const sideAC = s.A + s.C + s.C1 + s.A1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.A1 + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B1 + s.B + '$ là điểm $' + (aIs ? s.A : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đoạn thẳng $' + s.B + s.P + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.B1 + '$ là ' + (bIs ? 'một trung tuyến của tam giác $' + base + '$' : 'cạnh $' + s.A + s.C + '$'),
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.I + '$ lên mặt phẳng $(' + sideAC + ')$ theo phương $' + s.B1 + s.A1 + '$ là trung điểm của $' + (cIs ? s.A + s.C : s.A1 + s.C1) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Qp + '$ là hình chiếu song song của $' + s.Q + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.C + s.C1 + '$. Khi đó: $\\overrightarrow{' + s.Q + s.A + '} + \\overrightarrow{' + s.Q + s.B + '} + \\overrightarrow{' + s.Q + s.C + '} = ' + (dIs ? '3' : '6') + '\\overrightarrow{' + s.Q + s.Qp + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.P + ', ' + s.I + '$ lần lượt là trung điểm của $' + s.A1 + s.C1 + ', ' + s.B + s.C + '$. Gọi $' + s.Q + '$ là trọng tâm của tam giác $' + s.A1 + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.A1 + s.A + ' \\parallel ' + s.B1 + s.B + '$ và $' + s.A + ' \\in (' + base + ')$ nên hình chiếu của $' + s.A1 + '$ là điểm $' + s.A + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Chiếu $' + s.P + '$ theo phương $' + s.B + s.B1 + '$ được trung điểm $' + s.A + s.C + '$, nên hình chiếu của đoạn $' + s.B + s.P + '$ là trung tuyến xuất phát từ đỉnh $' + s.B + '$ của tam giác $' + base + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + s.I + '$ là trung điểm $' + s.B + s.C + '$, đường thẳng qua $' + s.I + '$ song song với $' + s.B1 + s.A1 + ' \\parallel ' + s.B + s.A + '$ cắt $' + s.A + s.C + '$ tại trung điểm của $' + s.A + s.C + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Qp + '$ là trọng tâm tam giác $' + base + '$ nên $\\overrightarrow{' + s.Qp + s.A + '} + \\overrightarrow{' + s.Qp + s.B + '} + \\overrightarrow{' + s.Qp + s.C + '} = \\vec{0}$, suy ra $\\overrightarrow{' + s.Q + s.A + '} + \\overrightarrow{' + s.Q + s.B + '} + \\overrightarrow{' + s.Q + s.C + '} = 3\\overrightarrow{' + s.Q + s.Qp + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (S Đ Đ S)', params: { setIdx: 0, aTrue: 0, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Hùng và Phúc đi câu cá (2 biến cố độc lập, Đúng/Sai)
  t11_b29_d15_two_friends_fishing_tf: {
    id: 't11_b29_d15_two_friends_fishing_tf',
    name: 'Xác suất câu cá của hai người bạn độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai bạn cùng đi câu cá với xác suất câu được cá độc lập là p₁, p₂. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'p1Int ∈ [40; 90], p2Int ∈ [35; 85], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(người 1 câu được)', min: 40, max: 90 },
      { name: 'p2Int', label: '100·P(người 2 câu được)', min: 35, max: 85 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(p1Int) || p1Int < 40 || p1Int > 90) return { valid: false, reason: 'p1Int ngoài miền [40; 90]' };
      if (!Number.isInteger(p2Int) || p2Int < 35 || p2Int > 85) return { valid: false, reason: 'p2Int ngoài miền [35; 85]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const r2 = (v) => Math.round(v * 100) / 100;

      const ansA = r2(q1);
      const ansB = r2(p1 * q2 + q1 * p2);
      const ansC = r2(q1 * q2);
      const ansD = r2(1 - q1 * q2);

      const wrongA = r2(ansA < 0.7 ? ansA + 0.25 : ansA - 0.25);
      const wrongB = r2(ansB < 0.7 ? ansB + 0.19 : ansB - 0.19);
      const wrongC = r2(ansC + 0.22);
      const wrongD = r2(ansD - 0.25);

      const tfStatements = [
        { key: 'a', text: 'Xác suất Hùng không câu được cá bằng $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất có đúng $1$ người câu được cá bằng $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để cả $2$ người đều không câu được cá bằng $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất có ít nhất $1$ người câu được cá bằng $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Hùng và Phúc rủ nhau đi câu cá vào ngày nghỉ cuối tuần. Xác suất câu được cá của Hùng là $' + fmt2(p1) + '$ và xác suất câu được cá của Phúc là $' + fmt2(p2) + '$ (hai người câu độc lập với nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Gọi $A, B$ lần lượt là biến cố Hùng, Phúc câu được cá. Ta có $P(\\overline{A}) = 1 - ' + fmt2(p1) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $P(\\text{đúng } 1 \\text{ người}) = P(A)P(\\overline{B}) + P(\\overline{A})P(B) = ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $P(\\overline{A}\\,\\overline{B}) = ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $P(\\text{ít nhất } 1 \\text{ người}) = 1 - P(\\overline{A}\\,\\overline{B}) \\approx 1 - ' + fmt2(ansC) + ' = ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 30', params: { p1Int: 30, p2Int: 61, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (0,83 và 0,61 -> S Đ S Đ)', params: { p1Int: 83, p2Int: 61, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Thảo, Dũng, Lam bắn bia (3 biến cố độc lập, Đúng/Sai)
  t11_b29_d16_shooting_three_tf: {
    id: 't11_b29_d16_shooting_three_tf',
    name: 'Ba học sinh thực hành bắn bia độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Ba bạn Thảo, Dũng và Lam bắn bia với xác suất trúng độc lập p₁, p₂, p₃. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int ∈ [45; 88], p3Int ∈ [25; 70], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Thảo trúng)', min: 45, max: 88 },
      { name: 'p2Int', label: '100·P(Dũng trúng)', min: 45, max: 88 },
      { name: 'p3Int', label: '100·P(Lam trúng)', min: 25, max: 70 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(p1Int) || p1Int < 45 || p1Int > 88) return { valid: false, reason: 'p1Int ngoài miền [45; 88]' };
      if (!Number.isInteger(p2Int) || p2Int < 45 || p2Int > 88) return { valid: false, reason: 'p2Int ngoài miền [45; 88]' };
      if (!Number.isInteger(p3Int) || p3Int < 25 || p3Int > 70) return { valid: false, reason: 'p3Int ngoài miền [25; 70]' };
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
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const r2 = (v) => Math.round(v * 100) / 100;

      const ansA = r2(q3);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(1 - q1 * q2 * q3);

      const wrongA = r2(ansA < 0.7 ? ansA + 0.18 : ansA - 0.18);
      const wrongB = r2(ansB + 0.21);
      const wrongC = r2(ansC < 0.7 ? ansC + 0.19 : ansC - 0.19);
      const wrongD = r2(ansD > 0.3 ? ansD - 0.27 : ansD + 0.27);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bạn Lam bắn không trúng bia là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ bạn Thảo bắn trúng bia là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai bạn bắn trúng bia là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để ít nhất một người bắn trúng bia là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Trong giờ học môn giáo dục quốc phòng, các bạn Thảo, Dũng và Lam lần lượt thực hành bắn vào bia. Biết xác suất trúng bia của ba bạn lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (các lần bắn độc lập). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất bạn Lam bắn không trúng bia là $1 - ' + fmt2(p3) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ bạn Thảo bắn trúng bia là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai bạn trúng bia là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất ít nhất một người trúng bia là $1 - ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p3Int = 80', params: { p1Int: 78, p2Int: 64, p3Int: 80, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (0,78; 0,64; 0,32 -> Đ Đ Đ S)', params: { p1Int: 78, p2Int: 64, p3Int: 32, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Ba bác sĩ Khoa, Hà, Hùng xét nghiệm (3 biến cố độc lập, ý d: không bác sĩ nào đúng)
  t11_b29_d17_doctors_diag_tf: {
    id: 't11_b29_d17_doctors_diag_tf',
    name: 'Ba bác sĩ chẩn đoán bệnh độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Ba bác sĩ Khoa, Hà, Hùng chẩn đoán với xác suất đúng độc lập p₁, p₂, p₃. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int, p3Int ∈ [40; 85], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Khoa đúng)', min: 40, max: 85 },
      { name: 'p2Int', label: '100·P(Hà đúng)', min: 40, max: 85 },
      { name: 'p3Int', label: '100·P(Hùng đúng)', min: 40, max: 85 },
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
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const r2 = (v) => Math.round(v * 100) / 100;

      const ansA = r2(q1);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(q1 * q2 * q3);

      const wrongA = r2(p1 === ansA ? ansA + 0.15 : p1);
      const wrongB = r2(ansB + 0.25);
      const wrongC = r2(ansC < 0.7 ? ansC + 0.17 : ansC - 0.17);
      const wrongD = r2(ansD + 0.23);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bác sĩ Khoa chẩn đoán không đúng bệnh là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ bác sĩ Khoa chẩn đoán đúng bệnh là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai bác sĩ chẩn đoán đúng bệnh là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để không có bác sĩ nào chẩn đoán đúng bệnh là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Trong một cuộc kiểm tra sức khỏe, ba bác sĩ Khoa, Hà và Hùng lần lượt xét nghiệm một bệnh nhân. Biết xác suất chẩn đoán đúng bệnh của ba bác sĩ lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (độc lập nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất bác sĩ Khoa chẩn đoán không đúng là $1 - ' + fmt2(p1) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ bác sĩ Khoa chẩn đoán đúng là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất đúng hai bác sĩ chẩn đoán đúng là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất không có bác sĩ nào chẩn đoán đúng là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 30', params: { p1Int: 30, p2Int: 71, p3Int: 62, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (0,64; 0,71; 0,62 -> S S Đ S)', params: { p1Int: 64, p2Int: 71, p3Int: 62, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Lan, Minh, Tùng thi học sinh giỏi (3 biến cố độc lập, Đúng/Sai)
  t11_b29_d18_contest_three_tf: {
    id: 't11_b29_d18_contest_three_tf',
    name: 'Ba học sinh làm bài thi học sinh giỏi độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Ba bạn Lan, Minh, Tùng làm bài khó nhất với xác suất đúng p₁, p₂, p₃. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int, p3Int ∈ [55; 90], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Lan đúng)', min: 55, max: 90 },
      { name: 'p2Int', label: '100·P(Minh đúng)', min: 55, max: 90 },
      { name: 'p3Int', label: '100·P(Tùng đúng)', min: 55, max: 90 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      for (const v of [p1Int, p2Int, p3Int]) {
        if (!Number.isInteger(v) || v < 55 || v > 90) return { valid: false, reason: 'Xác suất phần trăm ngoài miền [55; 90]' };
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
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const r2 = (v) => Math.round(v * 100) / 100;

      const ansA = r2(q2);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(1 - q1 * q2 * q3);

      const wrongA = r2(ansA < 0.7 ? ansA + 0.16 : ansA - 0.16);
      const wrongB = r2(ansB + 0.19);
      const wrongC = r2(ansC < 0.7 ? ansC + 0.18 : ansC - 0.18);
      const wrongD = r2(ansD - 0.22);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bạn Minh làm sai là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ bạn Lan làm đúng là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai bạn làm đúng là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để ít nhất một bạn làm đúng là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Trong kỳ thi học sinh giỏi, các bạn Lan, Minh và Tùng lần lượt làm bài. Biết xác suất mỗi bạn làm đúng phần bài khó nhất lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (độc lập nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất bạn Minh làm sai là $1 - ' + fmt2(p2) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ bạn Lan làm đúng là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai bạn làm đúng là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất ít nhất một bạn làm đúng là $1 - ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 40', params: { p1Int: 40, p2Int: 72, p3Int: 76, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (0,79; 0,72; 0,76 -> Đ Đ Đ Đ)', params: { p1Int: 79, p2Int: 72, p3Int: 76, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Ba kỹ sư Hùng, Quân, Vy kiểm lỗi phần mềm (3 biến cố độc lập, Đúng/Sai)
  t11_b29_d19_engineers_qa_tf: {
    id: 't11_b29_d19_engineers_qa_tf',
    name: 'Ba kỹ sư kiểm tra lỗi phần mềm độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Ba kỹ sư Hùng, Quân, Vy kiểm tra lỗi phần mềm độc lập với xác suất phát hiện lỗi p₁, p₂, p₃. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int, p3Int ∈ [55; 92], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Hùng phát hiện)', min: 55, max: 92 },
      { name: 'p2Int', label: '100·P(Quân phát hiện)', min: 55, max: 92 },
      { name: 'p3Int', label: '100·P(Vy phát hiện)', min: 55, max: 92 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      for (const v of [p1Int, p2Int, p3Int]) {
        if (!Number.isInteger(v) || v < 55 || v > 92) return { valid: false, reason: 'Xác suất phần trăm ngoài miền [55; 92]' };
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
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const r2 = (v) => Math.round(v * 100) / 100;

      const ansA = r2(q1);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(1 - q1 * q2 * q3);

      const wrongA = r2(p1 === ansA ? ansA + 0.14 : p1);
      const wrongB = r2(p1 === ansB ? ansB + 0.14 : p1);
      const wrongC = r2(ansC < 0.7 ? ansC + 0.18 : ansC - 0.18);
      const wrongD = r2(ansD - 0.34);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để kỹ sư Hùng không phát hiện lỗi là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ kỹ sư Hùng phát hiện lỗi là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai kỹ sư phát hiện lỗi là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để ít nhất một kỹ sư phát hiện lỗi là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Ba kỹ sư Hùng, Quân và Vy lần lượt kiểm tra lỗi phần mềm của một ứng dụng mới. Biết xác suất phát hiện đúng lỗi của ba kỹ sư lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (độc lập nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất kỹ sư Hùng không phát hiện lỗi là $1 - ' + fmt2(p1) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ kỹ sư Hùng phát hiện lỗi là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai kỹ sư phát hiện lỗi là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất ít nhất một kỹ sư phát hiện lỗi là $1 - ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p2Int = 95', params: { p1Int: 78, p2Int: 95, p3Int: 86, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (0,78; 0,81; 0,86 -> S S S S)', params: { p1Int: 78, p2Int: 81, p3Int: 86, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Chi, Đạt, Yến tiêm vắc xin phản ứng tốt (3 biến cố độc lập, Đúng/Sai)
  t11_b29_d20_vaccine_three_tf: {
    id: 't11_b29_d20_vaccine_three_tf',
    name: 'Ba bệnh nhân tiêm vắc xin phản ứng tốt độc lập (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Ba bệnh nhân Chi, Đạt, Yến tiêm vắc xin với xác suất phản ứng tốt độc lập p₁, p₂, p₃. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'p1Int, p2Int, p3Int ∈ [70; 95], aTrue..dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(Chi tốt)', min: 70, max: 95 },
      { name: 'p2Int', label: '100·P(Đạt tốt)', min: 70, max: 95 },
      { name: 'p3Int', label: '100·P(Yến tốt)', min: 70, max: 95 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int, aTrue, bTrue, cTrue, dTrue } = params;
      for (const v of [p1Int, p2Int, p3Int]) {
        if (!Number.isInteger(v) || v < 70 || v > 95) return { valid: false, reason: 'Xác suất phần trăm ngoài miền [70; 95]' };
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
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const r2 = (v) => Math.round(v * 100) / 100;

      const ansA = r2(q1);
      const ansB = r2(p1 * q2 * q3);
      const ansC = r2(p1 * p2 * q3 + q1 * p2 * p3 + p1 * q2 * p3);
      const ansD = r2(1 - q1 * q2 * q3);

      const wrongA = r2(ansA + 0.17);
      const wrongB = r2(ansB + 0.15);
      const wrongC = r2(ansC < 0.7 ? ansC + 0.18 : ansC - 0.18);
      const wrongD = r2(ansD - 0.25);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bạn Chi không phản ứng tốt là $' + fmt2(aIs ? ansA : wrongA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất để chỉ bạn Chi phản ứng tốt là $' + fmt2(bIs ? ansB : wrongB) + '$', isTrue: bIs },
        { key: 'c', text: 'Xác suất để có đúng hai bạn phản ứng tốt là $' + fmt2(cIs ? ansC : wrongC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất để ít nhất một bạn phản ứng tốt là $' + fmt2(dIs ? ansD : wrongD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Ba bệnh nhân Chi, Đạt và Yến lần lượt tiêm vắc xin. Biết xác suất mỗi bạn phản ứng tốt sau tiêm lần lượt là $' + fmt2(p1) + '$; $' + fmt2(p2) + '$ và $' + fmt2(p3) + '$ (độc lập nhau). Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Xác suất bạn Chi không phản ứng tốt là $1 - ' + fmt2(p1) + ' = ' + fmt2(ansA) + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Xác suất chỉ bạn Chi phản ứng tốt là $' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansB) + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Xác suất có đúng hai bạn phản ứng tốt là $' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(q3) + ' + ' + fmt2(q1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' + ' + fmt2(p1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + fmt2(ansC) + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Xác suất ít nhất một bạn phản ứng tốt là $1 - ' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' \\cdot ' + fmt2(q3) + ' \\approx ' + fmt2(ansD) + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 60', params: { p1Int: 60, p2Int: 80, p3Int: 94, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (0,90; 0,80; 0,94 -> Đ S Đ Đ)', params: { p1Int: 90, p2Int: 80, p3Int: 94, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
