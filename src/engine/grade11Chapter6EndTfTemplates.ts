import { MathTemplate } from '../types/math';

export const G11_C6_END_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D12 (Q12): Phép chiếu song song trên lăng trụ ABC.A1B1C1 (Q trung điểm A1C1, H trung điểm BC, N trọng tâm A1BC)
  t11_c6_bt_d12_prism_proj_tf: {
    id: 't11_c6_bt_d12_prism_proj_tf',
    name: 'Phép chiếu song song điểm, đường thẳng và đẳng thức vectơ trọng tâm trong lăng trụ (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Cho hình lăng trụ với trung điểm Q của cạnh trên, H của cạnh đáy và trọng tâm N. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'setIdx ∈ [0; 2], aTrue, bTrue, cTrue, dTrue ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1', Q: 'Q', H: 'H', N: 'N', Np: "N'" },
        { A: 'A', B: 'B', C: 'C', A1: "A'", B1: "B'", C1: "C'", Q: 'I', H: 'M', N: 'G', Np: "G'" },
        { A: 'D', B: 'E', C: 'F', A1: 'D_1', B1: 'E_1', C1: 'F_1', Q: 'P', H: 'K', N: 'G', Np: "G'" },
      ];
      const s = SETS[setIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;
      const base = s.A + s.B + s.C;
      const top = s.A1 + s.B1 + s.C1;
      const latBC = s.B + s.C + s.C1 + s.B1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hình chiếu song song của điểm $' + s.C1 + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.B + s.B1 + '$ là điểm $' + (aIs ? s.C : s.B) + '$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Hình chiếu song song của đường thẳng $' + s.A + s.Q + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.A1 + '$ là đường thẳng $' + (bIs ? s.A + s.C : s.B + s.C) + '$',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Hình chiếu song song của điểm $' + s.Q + '$ lên mặt phẳng $(' + latBC + ')$ theo phương $' + s.B + s.A + '$ là trung điểm của $' + (cIs ? s.B1 + s.C1 : s.B + s.C) + '$',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Gọi $' + s.Np + '$ là hình chiếu song song của $' + s.N + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + s.A + s.A1 + '$. Khi đó: $\\overrightarrow{' + s.A1 + s.A + '} + ' + (dIs ? '2' : '') + '\\overrightarrow{' + s.A1 + s.H + '} = 3\\overrightarrow{' + s.A1 + s.Np + '}$',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + top + '$. Gọi $' + s.Q + ', ' + s.H + '$ lần lượt là trung điểm của $' + s.A1 + s.C1 + ', ' + s.B + s.C + '$. Gọi $' + s.N + '$ là trọng tâm của tam giác $' + s.A1 + s.B + s.C + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Vì $' + s.C1 + s.C + ' \\parallel ' + s.B1 + s.B + '$ và $' + s.C + ' \\in (' + base + ')$ nên hình chiếu của $' + s.C1 + '$ là $' + s.C + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Hình chiếu của $' + s.A + '$ là $' + s.A + '$, hình chiếu của $' + s.Q + '$ là trung điểm của $' + s.A + s.C + '$ nên hình chiếu đường thẳng $' + s.A + s.Q + '$ là đường thẳng $' + s.A + s.C + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Trong mặt đáy trên, đường thẳng qua trung điểm $' + s.Q + '$ của $' + s.A1 + s.C1 + '$ song song $' + s.B1 + s.A1 + '$ (tức phương $' + s.B + s.A + '$) cắt $' + s.B1 + s.C1 + '$ tại trung điểm của $' + s.B1 + s.C1 + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + s.Np + '$ là trọng tâm tam giác $' + base + '$ và $' + s.H + '$ là trung điểm $' + s.B + s.C + '$ nên $\\overrightarrow{' + s.A + s.Np + '} = \\dfrac{2}{3}\\overrightarrow{' + s.A + s.H + '} \\Rightarrow \\overrightarrow{' + s.A1 + s.A + '} + 2\\overrightarrow{' + s.A1 + s.H + '} = 3\\overrightarrow{' + s.A1 + s.Np + '}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (Đ Đ Đ S)', params: { setIdx: 0, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Bài toán lãi kép gửi một lần theo tháng (Đúng/Sai)
  t11_c6_bt_d13_compound_monthly_tf: {
    id: 't11_c6_bt_d13_compound_monthly_tf',
    name: 'Bài toán lãi suất kép kì hạn 1 tháng (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Xét công thức tổng tiền, số tiền sau t1 tháng, số tháng ít nhất vượt ngưỡng tổng tiền và vượt ngưỡng tiền lãi.',
    conditionSummary: 'P ∈ [60; 200], r100 ∈ [45; 95] (0,45% - 0,95%/tháng), t1 ∈ [3; 8], extraM ∈ [25; 65], L ∈ [4; 9]',
    paramSpecs: [
      { name: 'P', label: 'Tiền gốc P (triệu đồng)', min: 60, max: 200 },
      { name: 'r100', label: '100 · lãi suất (%/tháng, VD: 70 là 0,70%)', min: 45, max: 95 },
      { name: 't1', label: 'Số tháng ở ý (b)', min: 3, max: 8 },
      { name: 'extraM', label: 'Tiền tăng thêm ở ý (c)', min: 25, max: 65 },
      { name: 'L', label: 'Tiền lãi tối thiểu ở ý (d)', min: 4, max: 9 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { P, r100, t1, extraM, L, aTrue, bTrue, cTrue, dTrue } = params;
      if (P < 60 || P > 200 || r100 < 45 || r100 > 95 || t1 < 3 || t1 > 8 || extraM < 25 || extraM > 65 || L < 4 || L > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      const r = r100 / 10000;
      const sB = P * Math.pow(1 + r, t1);
      if (Math.abs(sB * 100 - Math.floor(sB * 100) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn ở ý (b)' };
      }
      const mC = Math.log((P + extraM) / P) / Math.log(1 + r);
      const mD = Math.log((P + L) / P) / Math.log(1 + r);
      if (Math.abs(mC - Math.round(mC)) < 0.03 || Math.abs(mD - Math.round(mD)) < 0.03) {
        return { valid: false, reason: 'Tránh nghiệm log sát số nguyên' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P, r100, t1, extraM, L, aTrue, bTrue, cTrue, dTrue } = params;
      const rPct = (r100 / 100).toFixed(2).replace('.', ',');
      const r = r100 / 10000;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const sB = P * Math.pow(1 + r, t1);
      const sBRound = Math.round(sB * 100) / 100;
      const M = P + extraM;
      const nExactC = Math.log(M / P) / Math.log(1 + r);
      const nMinC = Math.ceil(nExactC);
      const nWrongC = Math.max(1, nMinC - 1);
      const nExactD = Math.log((P + L) / P) / Math.log(1 + r);
      const nMinD = Math.ceil(nExactD);
      const nWrongD = nMinD + 2;

      const tfStatements = [
        {
          key: 'a',
          text: 'Sau $n$ tháng, tổng số tiền cả vốn lẫn lãi là $' + P + '(1 + ' + rPct + '\\%)^{' + (aIs ? 'n' : 'n-1') + '}$',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Sau $' + t1 + '$ tháng ông An có tổng số tiền là $' + fmt2(bIs ? sBRound : sBRound + 1.15) + '$ triệu đồng',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Sau ít nhất $' + (cIs ? nMinC : nWrongC) + '$ tháng, ông An nhận được tổng số tiền nhiều hơn $' + M + '$ triệu',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Để thu được nhiều hơn $' + L + '$ triệu tiền lãi thì ông An cần gửi ngân hàng ít nhất $' + (dIs ? nMinD : nWrongD) + '$ tháng',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Ông An lần đầu gửi vào ngân hàng $' + P + '$ triệu đồng với kỳ hạn $1$ tháng, lãi suất $' + rPct + '\\%$ một tháng theo hình thức lãi kép. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sau $n$ tháng, tổng số tiền cả vốn lẫn lãi là $' + P + '(1 + ' + rPct + '\\%)^n$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Sau $' + t1 + '$ tháng, tổng số tiền là $S = ' + P + '(1 + ' + rPct + '\\%)^{' + t1 + '} \\approx ' + fmt2(sBRound) + '$ triệu đồng (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $' + P + '(1 + ' + rPct + '\\%)^n > ' + M + ' \\Rightarrow n > ' + fmt2(nExactC) + '$, nên cần ít nhất $' + nMinC + '$ tháng (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $' + P + '(1 + ' + rPct + '\\%)^n - ' + P + ' > ' + L + ' \\Rightarrow n > ' + fmt2(nExactD) + '$, nên cần ít nhất $' + nMinD + '$ tháng (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t1 = 2', params: { P: 114, r100: 70, t1: 2, extraM: 43, L: 5, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (Đ Đ S S)', params: { P: 114, r100: 70, t1: 4, extraM: 43, L: 5, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Bài toán lãi kép gửi theo quý + rút thêm tiền gửi tiếp (Đúng/Sai)
  t11_c6_bt_d14_compound_quarterly_tf: {
    id: 't11_c6_bt_d14_compound_quarterly_tf',
    name: 'Bài toán lãi suất kép kì hạn 3 tháng và nạp thêm tiền (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Xét tổng tiền sau q1 quý, thời gian tối thiểu vượt ngưỡng M, tổng tiền khi gửi thêm C sau q2 quý và vốn ban đầu tối thiểu.',
    conditionSummary: 'P ∈ [90; 220], r10 ∈ [14; 28], q1 ∈ [6; 12], extraM ∈ [30; 70], q2 ∈ [2; 4], C ∈ [40; 80], extraT ∈ [50; 90]',
    paramSpecs: [
      { name: 'P', label: 'Tiền gốc P (triệu đồng)', min: 90, max: 220 },
      { name: 'r10', label: '10 · lãi suất quý (%/quý, VD: 21 là 2,1%)', min: 14, max: 28 },
      { name: 'q1', label: 'Số quý ở ý (a)', min: 6, max: 12 },
      { name: 'extraM', label: 'Mức vượt thêm ở ý (b)', min: 30, max: 70 },
      { name: 'q2', label: 'Số quý trước khi nạp thêm ở ý (c)', min: 2, max: 4 },
      { name: 'C', label: 'Tiền nạp thêm ở ý (c)', min: 40, max: 80 },
      { name: 'extraT', label: 'Mức tăng ở ý (d) sau 24 tháng', min: 50, max: 90 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { P, r10, q1, extraM, q2, C, extraT, aTrue, bTrue, cTrue, dTrue } = params;
      if (P < 90 || P > 220 || r10 < 14 || r10 > 28 || q1 < 6 || q1 > 12 || extraM < 30 || extraM > 70 || q2 < 2 || q2 > 4 || C < 40 || C > 80 || extraT < 50 || extraT > 90) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      const r = r10 / 1000;
      const sa = P * Math.pow(1 + r, q1);
      const s1 = P * Math.pow(1 + r, q2);
      const s2Exact = (s1 + C) * Math.pow(1 + r, 4);
      const s2RoundMid = (Math.round(s1 * 100) / 100 + C) * Math.pow(1 + r, 4);
      if (Math.round(s2Exact * 100) !== Math.round(s2RoundMid * 100)) {
        return { valid: false, reason: 'Tránh sai khác 0,01 giữa làm tròn trung gian và tính thẳng' };
      }
      const a0 = (P + extraT) / Math.pow(1 + r, 8);
      for (const val of [sa, s2Exact, a0]) {
        if (Math.abs(val * 100 - Math.floor(val * 100) - 0.5) < 0.025) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
        }
      }
      const qb = Math.log((P + extraM) / P) / Math.log(1 + r);
      if (Math.abs(qb - Math.round(qb)) < 0.03) return { valid: false, reason: 'Tránh nghiệm quý sát số nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P, r10, q1, extraM, q2, C, extraT, aTrue, bTrue, cTrue, dTrue } = params;
      const rPct = (r10 / 10).toFixed(1).replace('.', ',');
      const r = r10 / 1000;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const saRound = Math.round(P * Math.pow(1 + r, q1) * 100) / 100;
      const M = P + extraM;
      const qbExact = Math.log(M / P) / Math.log(1 + r);
      const qbMin = Math.ceil(qbExact);
      const mC = q2 * 3;
      const s1Round = Math.round(P * Math.pow(1 + r, q2) * 100) / 100;
      const s2Round = Math.round((s1Round + C) * Math.pow(1 + r, 4) * 100) / 100;
      const T = P + extraT;
      const a0Round = Math.round((T / Math.pow(1 + r, 8)) * 100) / 100;

      const tfStatements = [
        {
          key: 'a',
          text: 'Sau $' + q1 + '$ quý cô Bình có tổng số tiền là $' + fmt2(aIs ? saRound : saRound + 2.4) + '$ triệu đồng',
          isTrue: aIs,
        },
        {
          key: 'b',
          text: 'Sau ít nhất $' + (bIs ? qbMin : qbMin + 2) + '$ quý, cô Bình nhận được tổng số tiền nhiều hơn $' + M + '$ triệu',
          isTrue: bIs,
        },
        {
          key: 'c',
          text: 'Sau đúng $' + mC + '$ tháng, cô Bình rút hết cả vốn lẫn lãi rồi dùng số tiền đó cộng thêm $' + C + '$ triệu đồng gửi tiếp ngân hàng với kỳ hạn và lãi suất như trước đó. Tổng số tiền cô Bình nhận được $1$ năm sau đó là $' + fmt2(cIs ? s2Round : s2Round + 3) + '$ triệu đồng',
          isTrue: cIs,
        },
        {
          key: 'd',
          text: 'Để nhận được số tiền $' + T + '$ triệu sau $24$ tháng với lãi suất như trên thì ban đầu cô Bình cần gửi ít nhất $' + fmt2(dIs ? a0Round : a0Round - 3) + '$ triệu',
          isTrue: dIs,
        },
      ];

      return {
        stem: 'Cô Bình lần đầu gửi vào ngân hàng $' + P + '$ triệu đồng với kỳ hạn $3$ tháng, lãi suất $' + rPct + '\\%$ một quý theo hình thức lãi kép. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sau $' + q1 + '$ quý, tổng số tiền là $S = ' + P + '(1 + ' + rPct + '\\%)^{' + q1 + '} \\approx ' + fmt2(saRound) + '$ triệu đồng (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $' + P + '(1 + ' + rPct + '\\%)^n > ' + M + ' \\Rightarrow n > ' + fmt2(qbExact) + '$, nên ít nhất $' + qbMin + '$ quý (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Sau $' + mC + '$ tháng ($' + q2 + '$ quý) được $S_1 \\approx ' + fmt2(s1Round) + '$ triệu; gửi tiếp $' + fmt2(s1Round + C) + '$ triệu thêm $1$ năm ($4$ quý) được $S_2 \\approx ' + fmt2(s2Round) + '$ triệu đồng (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Để sau $24$ tháng ($8$ quý) được $' + T + '$ triệu cần $a = \\dfrac{' + T + '}{(1 + ' + rPct + '\\%)^8} \\approx ' + fmt2(a0Round) + '$ triệu đồng (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q2 = 5', params: { P: 148, r10: 21, q1: 10, extraM: 47, q2: 5, C: 61, extraT: 69, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (Đ Đ S Đ)', params: { P: 148, r10: 21, q1: 10, extraM: 47, q2: 3, C: 61, extraT: 69, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },
};
