import { MathTemplate } from '../types/math';

export const G11_C6_END_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D15 (Q15): Lãi kép kì hạn 3 tháng + rút ra cộng thêm C triệu gửi tiếp t năm
  t11_c6_bt_d15_sa_compound_reinvest: {
    id: 't11_c6_bt_d15_sa_compound_reinvest',
    name: 'Lãi suất kép gửi thêm tiền sau kì hạn (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Gửi P triệu kì hạn 3 tháng (lãi suất r%/quý), sau m1 quý cộng thêm C triệu gửi tiếp t năm, làm tròn hàng đơn vị.',
    conditionSummary: 'P ∈ [30; 120], r10 ∈ [12; 26], q1 ∈ [2; 4], C ∈ [40; 120], t ∈ [2; 5]',
    paramSpecs: [
      { name: 'P', label: 'Tiền gửi ban đầu P (triệu đồng)', min: 30, max: 120 },
      { name: 'r10', label: '10 · lãi suất quý (%/quý, VD: 18 là 1,8%)', min: 12, max: 26 },
      { name: 'q1', label: 'Số quý trước khi gửi thêm', min: 2, max: 4 },
      { name: 'C', label: 'Số tiền gửi thêm C (triệu đồng)', min: 40, max: 120 },
      { name: 't', label: 'Số năm gửi tiếp theo', min: 2, max: 5 },
    ],
    validateCode: `
      const { P, r10, q1, C, t } = params;
      if (P < 30 || P > 120 || r10 < 12 || r10 > 26 || q1 < 2 || q1 > 4 || C < 40 || C > 120 || t < 2 || t > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const r = r10 / 1000;
      const s1 = P * Math.pow(1 + r, q1);
      const s2Exact = (s1 + C) * Math.pow(1 + r, 4 * t);
      const s2Mid = (Math.round(s1 * 100) / 100 + C) * Math.pow(1 + r, 4 * t);
      if (Math.round(s2Exact) !== Math.round(s2Mid)) {
        return { valid: false, reason: 'Tránh sai khác khi làm tròn trung gian' };
      }
      const frac = s2Exact - Math.floor(s2Exact);
      if (Math.abs(frac - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { P, r10, q1, C, t } = params;
      const rPct = (r10 / 10).toFixed(1).replace('.', ',');
      const r = r10 / 1000;
      const m1 = q1 * 3;
      const q2 = 4 * t;
      const s1 = Math.round(P * Math.pow(1 + r, q1) * 100) / 100;
      const s2 = (s1 + C) * Math.pow(1 + r, q2);
      const ans = Math.round(s2);
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');

      return {
        stem: 'Anh Minh lần đầu gửi vào ngân hàng $' + P + '$ triệu đồng với kỳ hạn $3$ tháng, lãi suất $' + rPct + '\\%$ một quý theo hình thức lãi kép. Sau đúng $' + m1 + '$ tháng, anh Minh rút hết cả vốn lẫn lãi rồi dùng số tiền đó cộng thêm $' + C + '$ triệu đồng gửi tiếp ngân hàng với kỳ hạn và lãi suất như trước đó. Tổng số tiền anh Minh nhận được $' + t + '$ năm sau đó là bao nhiêu triệu đồng (kết quả làm tròn đến hàng đơn vị)?',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans) + ' triệu đồng',
        solutionSteps: [
          'Số tiền có được sau $' + m1 + '$ tháng ($' + q1 + '$ quý) là $S_1 = ' + P + '(1 + ' + rPct + '\\%)^{' + q1 + '} \\approx ' + fmt2(s1) + '$ triệu đồng.',
          'Tổng tiền cả vốn lẫn lãi sau $' + t + '$ năm ($' + q2 + '$ quý) là: $S_2 = ' + fmt2(s1 + C) + '(1 + ' + rPct + '\\%)^{' + q2 + '} \\approx ' + ans + '$ triệu đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q1 = 5', params: { P: 52, r10: 18, q1: 5, C: 86, t: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (176 triệu)', params: { P: 52, r10: 18, q1: 4, C: 86, t: 3 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Dân số tăng trưởng liên tục S = A·e^{rt}, tìm năm đạt gấp k lần
  t11_c6_bt_d16_sa_population_multiple_year: {
    id: 't11_c6_bt_d16_sa_population_multiple_year',
    name: 'Tìm năm dân số đạt gấp k lần theo mô hình mũ S = A·e^{rt} (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Từ S = A·e^{rt}, tìm năm y0 + round(ln(k)/r) để dân số đạt gấp k lần năm mốc y0.',
    conditionSummary: 'y0 ∈ [2020; 2025], k ∈ [2; 4], r100 ∈ [95; 210] (0,95% - 2,10%/năm), tránh ranh giới .5',
    paramSpecs: [
      { name: 'y0', label: 'Năm mốc', min: 2020, max: 2025 },
      { name: 'k', label: 'Hệ số gấp k lần (2..4)', min: 2, max: 4 },
      { name: 'r100', label: '100 · tỉ lệ tăng (%/năm, VD: 113 là 1,13%)', min: 95, max: 210 },
    ],
    validateCode: `
      const { y0, k, r100 } = params;
      if (y0 < 2020 || y0 > 2025 || k < 2 || k > 4 || r100 < 95 || r100 > 210) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const r = r100 / 10000;
      const t = Math.log(k) / r;
      const frac = t - Math.floor(t);
      if (Math.abs(frac - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { y0, k, r100 } = params;
      const rPct = (r100 / 100).toFixed(2).replace('.', ',');
      const r = r100 / 10000;
      const t = Math.log(k) / r;
      const dt = Math.round(t);
      const ans = y0 + dt;
      const tApprox = (Math.round(t * 10) / 10).toFixed(1).replace('.', ',');

      return {
        stem: 'Dân số ở một địa phương được ước tính theo công thức $S = A \\cdot e^{rt}$, trong đó $A$ là dân số của năm $' + y0 + '$, $S$ là dân số sau $t$ năm, $r$ là tỉ lệ tăng dân số hằng năm. Hỏi đến năm nào thì dân số ở địa phương đó sẽ đạt gấp $' + k + '$ lần dân số năm $' + y0 + '$? Biết $r = ' + rPct + '\\%$/năm.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Theo giả thiết ta có $' + k + 'A = A e^{rt} \\Rightarrow e^{rt} = ' + k + ' \\Rightarrow t = \\dfrac{\\ln ' + k + '}{' + rPct + '\\%} \\approx ' + tApprox + '$ (năm).',
          'Vậy dân số địa phương đó sẽ đạt gấp $' + k + '$ lần vào khoảng năm $' + y0 + ' + ' + dt + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { y0: 2023, k: 1, r100: 113 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (2120)', params: { y0: 2023, k: 3, r100: 113 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Nuôi vi khuẩn N(x) = C·e^{kx} biết N(0) = C, N(1) = N1
  t11_c6_bt_d17_sa_bacteria_exp_hours: {
    id: 't11_c6_bt_d17_sa_bacteria_exp_hours',
    name: 'Mô hình tăng trưởng vi khuẩn N(x) = C·e^{kx} (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Biết số vi khuẩn ban đầu C và sau 1 giờ là N1, tính số vi khuẩn sau h giờ (làm tròn hàng đơn vị).',
    conditionSummary: 'C ∈ [100; 250], ratio100 ∈ [150; 260], h ∈ [3; 6], tránh ranh giới làm tròn .5',
    paramSpecs: [
      { name: 'C', label: 'Số vi khuẩn ban đầu C', min: 100, max: 250 },
      { name: 'N1', label: 'Số vi khuẩn sau 1 giờ (> C)', min: 180, max: 520 },
      { name: 'h', label: 'Số giờ h', min: 3, max: 6 },
    ],
    validateCode: `
      const { C, N1, h } = params;
      if (C < 100 || C > 250 || N1 <= C + 30 || N1 > 520 || h < 3 || h > 6) {
        return { valid: false, reason: 'Tham số ngoài miền hoặc N1 quá gần C' };
      }
      const val = C * Math.pow(N1 / C, h);
      if (!Number.isFinite(val) || val > 50000) return { valid: false, reason: 'Giá trị quá lớn' };
      const frac = val - Math.floor(val);
      if (Math.abs(frac - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { C, N1, h } = params;
      const k = Math.log(N1 / C);
      const val = C * Math.pow(N1 / C, h);
      const ans = Math.round(val);
      const kApprox = k.toFixed(2).replace('.', ',');

      return {
        stem: 'Trong một phòng thí nghiệm, người ta nuôi một loại vi khuẩn. Lúc đầu có $' + C + '$ vi khuẩn. Sau một giờ, số vi khuẩn là $' + N1 + '$ con. Giả sử số vi khuẩn tăng lên theo công thức tăng trưởng mũ, số vi khuẩn sau $x$ giờ là $N(x) = C e^{kx}$. Tính số lượng vi khuẩn có được sau $' + h + '$ giờ (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $N(1) = ' + C + ' e^k = ' + N1 + ' \\Rightarrow e^k = \\dfrac{' + N1 + '}{' + C + '} \\Rightarrow k = \\ln\\left(\\dfrac{' + N1 + '}{' + C + '}\\right) \\approx ' + kApprox + '$.',
          'Số lượng vi khuẩn sau $' + h + '$ giờ là $N(' + h + ') = ' + C + ' \\left(\\dfrac{' + N1 + '}{' + C + '}\\right)^{' + h + '} \\approx ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 2', params: { C: 158, N1: 318, h: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (2593)', params: { C: 158, N1: 318, h: 4 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Cường độ động đất Richter M_Y = M_X + log(k)
  t11_c6_bt_d18_sa_earthquake_richter_amp: {
    id: 't11_c6_bt_d18_sa_earthquake_richter_amp',
    name: 'Bài toán cường độ động đất theo độ Richte khi biết tỉ số biên độ (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Biết cường độ trận X là M_X và biên độ trận Y gấp k lần trận X, tính cường độ trận Y (làm tròn hàng phần mười).',
    conditionSummary: 'Mx10 ∈ [25; 65] (2,5 - 6,5), k ∈ [3; 25] (không là lũy thừa 10), tránh ranh giới .x5',
    paramSpecs: [
      { name: 'Mx10', label: '10 · cường độ M_X (VD: 42 là 4,2)', min: 25, max: 65 },
      { name: 'k', label: 'Hệ số biên độ gấp k lần', min: 3, max: 25 },
    ],
    validateCode: `
      const { Mx10, k } = params;
      if (Mx10 < 25 || Mx10 > 65 || k < 3 || k > 25 || k === 10) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const my = Mx10 / 10 + Math.log10(k);
      const frac = my * 10 - Math.floor(my * 10);
      if (Math.abs(frac - 0.5) < 0.025) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { Mx10, k } = params;
      const mx = Mx10 / 10;
      const my = mx + Math.log10(k);
      const rounded1 = Math.round(my * 10) / 10;
      const mxStr = mx.toFixed(1).replace('.', ',');
      const shortAnswer = Number.isInteger(rounded1)
        ? String(rounded1)
        : rounded1.toFixed(1).replace('.', ',');

      return {
        stem: 'Cường độ một trận động đất $M$ (Richte) được tính bởi $M = \\log A - \\log A_0$, với $A$ là biên độ rung chấn tối đa và $A_0$ là một biên độ chuẩn (hằng số). Một trận động đất ở khu vực $X$ có cường độ $' + mxStr + '$ (Richte). Trận động đất khác ở khu vực $Y$ có biên độ rung chấn mạnh gấp $' + k + '$ lần biên độ rung chấn trận động đất ở khu vực $X$. Cường độ động đất của khu vực $Y$ là bao nhiêu Richte (kết quả làm tròn đến hàng phần mười)?',
        shortAnswer,
        numericValue: rounded1,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $M_X = \\log A_X - \\log A_0 = ' + mxStr + '$ và $A_Y = ' + k + 'A_X$.',
          'Cường độ ở khu vực $Y$ là: $M_Y = \\log(' + k + 'A_X) - \\log A_0 = \\log ' + k + ' + M_X = \\log ' + k + ' + ' + mxStr + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 10', params: { Mx10: 42, k: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (4,9)', params: { Mx10: 42, k: 5 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Tỉ số biên độ động đất k / D = 10^{M_Y - M_Z} / D
  t11_c6_bt_d19_sa_earthquake_amp_ratio: {
    id: 't11_c6_bt_d19_sa_earthquake_amp_ratio',
    name: 'Tính tỉ số biên độ k/D giữa hai trận động đất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Biết cường độ M_Y > M_Z và biên độ Y gấp k lần biên độ Z, tính k/D làm tròn đến hàng đơn vị.',
    conditionSummary: 'My10 ∈ [60; 82], Mz10 ∈ [25; 45], My10 - Mz10 ∈ [28; 46], D ∈ [20; 80]',
    paramSpecs: [
      { name: 'My10', label: '10 · M_Y (VD: 73 là 7,3)', min: 60, max: 82 },
      { name: 'Mz10', label: '10 · M_Z (VD: 32 là 3,2)', min: 25, max: 45 },
      { name: 'D', label: 'Mẫu số chia D', min: 20, max: 80 },
    ],
    validateCode: `
      const { My10, Mz10, D } = params;
      if (My10 < 60 || My10 > 82 || Mz10 < 25 || Mz10 > 45 || D < 20 || D > 80) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const dM10 = My10 - Mz10;
      if (dM10 < 28 || dM10 > 46) return { valid: false, reason: 'Chênh lệch cường độ cần thuộc [2,8; 4,6]' };
      const ratio = Math.pow(10, dM10 / 10) / D;
      const frac = ratio - Math.floor(ratio);
      if (Math.abs(frac - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { My10, Mz10, D } = params;
      const myStr = (My10 / 10).toFixed(1).replace('.', ',');
      const mzStr = (Mz10 / 10).toFixed(1).replace('.', ',');
      const diff = (My10 - Mz10) / 10;
      const diffStr = diff.toFixed(1).replace('.', ',');
      const k = Math.pow(10, diff);
      const ans = Math.round(k / D);

      return {
        stem: 'Cường độ một trận động đất $M$ (Richte) được tính bởi $M = \\log A - \\log A_0$, với $A$ là biên độ rung chấn tối đa và $A_0$ là một biên độ chuẩn (hằng số). Một trận động đất ở khu vực $Y$ có cường độ $' + myStr + '$ (Richte). Một trận động đất ở khu vực $Z$ có cường độ $' + mzStr + '$ (Richte). Biết trận động đất ở khu vực $Y$ có biên độ rung chấn mạnh gấp $k$ lần biên độ rung chấn trận động đất ở khu vực $Z$. Tính tỉ số $\\dfrac{k}{' + D + '}$ (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $M_Y - M_Z = \\log A_Y - \\log A_Z = ' + myStr + ' - ' + mzStr + ' = ' + diffStr + ' \\Rightarrow \\log\\dfrac{A_Y}{A_Z} = ' + diffStr + '$.',
          'Suy ra $k = \\dfrac{A_Y}{A_Z} = 10^{' + diffStr + '}$, do đó $\\dfrac{k}{' + D + '} \\approx ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên D = 10', params: { My10: 73, Mz10: 32, D: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (331)', params: { My10: 73, Mz10: 32, D: 38 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Giao điểm hai quần thể vi khuẩn X (A_X e^{rt}) và Y (A_Y (1+p%)^t)
  t11_c6_bt_d20_sa_two_bacteria_equal: {
    id: 't11_c6_bt_d20_sa_two_bacteria_equal',
    name: 'Thời điểm hai quần thể vi khuẩn bằng nhau (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài tập cuối chương VI',
    description: 'Quần thể X tăng theo S_X(t) = A_X e^{rt}, quần thể Y tăng p% mỗi giờ; tìm t để S_X(t) = S_Y(t) làm tròn hàng phần mười.',
    conditionSummary: 'Ax ∈ {200, 250, 300}, multX ∈ [2; 4], t1 ∈ [2; 3], AyRatio ∈ [3; 5], p ∈ [4; 12]',
    paramSpecs: [
      { name: 'axIdx', label: 'Số vi khuẩn X lúc đầu (0:200, 1:250, 2:300)', min: 0, max: 2 },
      { name: 'multX', label: 'Hệ số tăng của X sau t1 giờ (2..4)', min: 2, max: 4 },
      { name: 't1', label: 'Thời gian mốc t1 (giờ)', min: 2, max: 3 },
      { name: 'ayMult', label: 'Tỉ lệ A_Y / A_X (3..5)', min: 3, max: 5 },
      { name: 'p', label: 'Tỉ lệ tăng của Y mỗi giờ (%)', min: 4, max: 12 },
    ],
    validateCode: `
      const { axIdx, multX, t1, ayMult, p } = params;
      if (axIdx < 0 || axIdx > 2 || multX < 2 || multX > 4 || (t1 !== 2 && t1 !== 3) || ayMult < 3 || ayMult > 5 || p < 4 || p > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const r = Math.log(multX) / t1;
      const ly = Math.log(1 + p / 100);
      if (r <= ly + 0.05) return { valid: false, reason: 'Tốc độ tăng của X phải lớn hơn Y' };
      const t = Math.log(ayMult) / (r - ly);
      const frac = t * 10 - Math.floor(t * 10);
      if (Math.abs(frac - 0.5) < 0.025) return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { axIdx, multX, t1, ayMult, p } = params;
      const Ax = [200, 250, 300][axIdx];
      const Bx = Ax * multX;
      const Ay = Ax * ayMult;
      const r = Math.log(multX) / t1;
      const yBase = (1 + p / 100).toFixed(2).replace(/0$/, '');
      const t = Math.log(ayMult) / (r - Math.log(1 + p / 100));
      const rounded1 = Math.round(t * 10) / 10;
      const shortAnswer = Number.isInteger(rounded1)
        ? String(rounded1)
        : rounded1.toFixed(1).replace('.', ',');

      return {
        stem: 'Trong một phòng thí nghiệm, số lượng của một vi khuẩn $X$ được biểu diễn theo công thức $S(t) = A e^{rt}$, trong đó $A$ là số lượng vi khuẩn tại thời điểm chọn mốc thời gian, $r$ là tỉ lệ tăng trưởng $(r > 0)$, $t$ là thời gian tăng trưởng (tính theo giờ). Lúc $0$ giờ sáng, số lượng vi khuẩn $X$ là $' + Ax + '$ con. Sau $' + t1 + '$ giờ, số lượng vi khuẩn $X$ là $' + Bx + '$ con. Cùng thời điểm $0$ giờ, số lượng vi khuẩn $Y$ là $' + Ay + '$ con. Biết rằng số lượng vi khuẩn $Y$ tăng $' + p + '\\%$ mỗi giờ. Hỏi sau bao nhiêu giờ thì số lượng vi khuẩn $X$ bằng số lượng vi khuẩn $Y$ (làm tròn kết quả đến hàng phần mười)?',
        shortAnswer,
        numericValue: rounded1,
        answerSummary: shortAnswer + ' giờ',
        solutionSteps: [
          'Ta có $S_X(t) = ' + Ax + 'e^{rt}$. Sau $' + t1 + '$ giờ: $' + Ax + 'e^{' + t1 + 'r} = ' + Bx + ' \\Rightarrow r = \\dfrac{\\ln ' + multX + '}{' + t1 + '}$.',
          'Số lượng vi khuẩn $Y$ sau $t$ giờ là $S_Y(t) = ' + Ay + '\\left(1 + ' + p + '\\%\\right)^t = ' + Ay + ' \\cdot ' + yBase.replace('.', ',') + '^t$.',
          'Giải $S_X(t) = S_Y(t) \\Leftrightarrow e^{\\frac{\\ln ' + multX + '}{' + t1 + '}t} = ' + ayMult + ' \\cdot ' + yBase.replace('.', ',') + '^t \\Rightarrow t = \\dfrac{\\ln ' + ayMult + '}{\\dfrac{\\ln ' + multX + '}{' + t1 + '} - \\ln ' + yBase.replace('.', ',') + '} \\approx ' + shortAnswer + '$ giờ.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t1 = 1', params: { axIdx: 1, multX: 3, t1: 1, ayMult: 4, p: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (2,8 giờ)', params: { axIdx: 1, multX: 3, t1: 2, ayMult: 4, p: 5 }, expectedValid: true },
    ],
  },
};
