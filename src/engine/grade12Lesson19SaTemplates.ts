import { MathTemplate } from '../types/math';

const PROB19_SA_HELPERS = String.raw`
  const fmtDec2 = (val) => (Math.round(val * 100) / 100).toFixed(2).replace('.', ',');
  const fmtDecClean = (val) => {
    const r = Math.round(val * 10000) / 10000;
    return String(r).replace('.', ',');
  };
  const round2 = (val) => Math.round(val * 100) / 100;
  const comb = (n, k) => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
    return Math.round(res);
  };
`;

const makeSequentialPick2SameTypeSa = (cfg: {
  id: string;
  name: string;
  description: string;
  defaultN: number;
  defaultK: number;
  sampleLabel: string;
  stemTemplate: string;
  eventA: string;
  eventB: string;
}): MathTemplate => ({
  id: cfg.id,
  name: cfg.name,
  category: 'SA',
  level: 'Hiểu',
  topicTag: 'Công thức xác suất toàn phần hai lượt rút không hoàn lại',
  description: cfg.description,
  conditionSummary: 'n ∈ [12; 30], 3 <= k <= n - 3, tránh biên làm tròn .xx5',
  paramSpecs: [
    { name: 'n', label: 'Tổng số phần tử n', min: 12, max: 30 },
    { name: 'k', label: 'Số phần tử loại A (k)', min: 4, max: 22 },
  ],
  validateCode: `
    const { n, k } = params;
    if (k < 3 || k > n - 3) return { valid: false, reason: 'Cần 3 <= k <= n - 3' };
    const val = k / n;
    if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
      return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
    }
    return { valid: true };
  `,
  generateCode: String.raw`
    const { n, k } = params;
    ` + PROB19_SA_HELPERS + String.raw`
    const pB = u.simplifyFrac(k, n);
    const pBComp = u.simplifyFrac(n - k, n);
    const pAB = u.simplifyFrac(k - 1, n - 1);
    const pABComp = u.simplifyFrac(k, n - 1);
    const ansR = round2(k / n);
    const shortAnswer = fmtDec2(ansR);
    ` + cfg.stemTemplate + String.raw`
    return {
      stem,
      shortAnswer,
      numericValue: ansR,
      answerSummary: shortAnswer,
      solutionSteps: [
        'Xét hai biến cố: $A$: "' + ` + JSON.stringify(cfg.eventA) + ` + '", $B$: "' + ` + JSON.stringify(cfg.eventB) + ` + '".',
        'Ta có $P(B) = ' + pB.latex + '$, $P(\\overline{B}) = ' + pBComp.latex + '$, $P(A|B) = ' + pAB.latex + '$, $P(A|\\overline{B}) = ' + pABComp.latex + '$.',
        'Áp dụng công thức xác suất toàn phần: $P(A) = P(B)\\cdot P(A|B) + P(\\overline{B})\\cdot P(A|\\overline{B}) = ' + pB.latex + '\\cdot ' + pAB.latex + ' + ' + pBComp.latex + '\\cdot ' + pABComp.latex + ' = ' + pB.latex + ' \\approx ' + shortAnswer + '$.',
      ],
    };
  `,
  boundaryCases: [
    { label: 'Biên k quá lớn', params: { n: cfg.defaultN, k: cfg.defaultN }, expectedValid: false },
    { label: cfg.sampleLabel, params: { n: cfg.defaultN, k: cfg.defaultK }, expectedValid: true },
  ],
});

const makeTwoGroupBayesSa = (cfg: {
  id: string;
  name: string;
  description: string;
  defaults: { p1Pct: number; q1Pct: number; q2Pct: number; label: string };
  stemTemplate: string;
  eventNames: string;
  stepDesc: string;
}): MathTemplate => ({
  id: cfg.id,
  name: cfg.name,
  category: 'SA',
  level: 'Hiểu',
  topicTag: 'Công thức Bayes trong bài toán hai nguồn',
  description: cfg.description,
  conditionSummary: 'Tỉ lệ nhóm 1 ∈ [15%; 85%], các tỉ lệ điều kiện khác 0; tránh biên làm tròn .xx5',
  paramSpecs: [
    { name: 'p1Pct', label: 'Tỉ lệ nhóm I (%)', min: 25, max: 75 },
    { name: 'q1Pct', label: 'Tỉ lệ đặc trưng nhóm I (%)', min: 2, max: 20 },
    { name: 'q2Pct', label: 'Tỉ lệ đặc trưng nhóm II (%)', min: 3, max: 25 },
  ],
  validateCode: `
    const { p1Pct, q1Pct, q2Pct } = params;
    if (p1Pct < 10 || p1Pct > 90 || q1Pct < 1 || q1Pct > 80 || q2Pct < 1 || q2Pct > 80) {
      return { valid: false, reason: 'Tỉ lệ ngoài miền hợp lệ' };
    }
    if (q1Pct === q2Pct) return { valid: false, reason: 'Hai tỉ lệ điều kiện bằng nhau làm câu hỏi tầm thường' };
    const p1 = p1Pct / 100, p2 = 1 - p1;
    const c1 = q1Pct / 100, c2 = q2Pct / 100;
    const pL = p1 * c1 + p2 * c2;
    const ansExact = (p1 * c1) / pL;
    const pLRound4 = Math.round(pL * 10000) / 10000;
    const ansViaRound4 = (p1 * c1) / pLRound4;
    if (Math.round(ansExact * 100) !== Math.round(ansViaRound4 * 100)) {
      return { valid: false, reason: 'Tránh sai lệch 0,01 khi làm tròn mẫu số P(L) đến 4 chữ số' };
    }
    if (Math.abs(((ansExact * 100) % 1) - 0.5) < 0.005) {
      return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
    }
    return { valid: true };
  `,
  generateCode: String.raw`
    const { p1Pct, q1Pct, q2Pct } = params;
    ` + PROB19_SA_HELPERS + String.raw`
    const p2Pct = 100 - p1Pct;
    const p1 = p1Pct / 100, p2 = p2Pct / 100;
    const c1 = q1Pct / 100, c2 = q2Pct / 100;
    const pL = p1 * c1 + p2 * c2;
    const ans = (p1 * c1) / pL;
    const ansR = round2(ans);
    const shortAnswer = fmtDec2(ansR);
    ` + cfg.stemTemplate + String.raw`
    return {
      stem,
      shortAnswer,
      numericValue: ansR,
      answerSummary: shortAnswer,
      solutionSteps: [
        ` + JSON.stringify(cfg.eventNames) + `,
        'Ta có $P(A) = ' + fmtDecClean(p1) + '$, $P(B) = ' + fmtDecClean(p2) + '$, $P(L|A) = ' + fmtDecClean(c1) + '$, $P(L|B) = ' + fmtDecClean(c2) + '$.',
        'Xác suất toàn phần: $P(L) = P(A)P(L|A) + P(B)P(L|B) = ' + fmtDecClean(p1) + '\\cdot ' + fmtDecClean(c1) + ' + ' + fmtDecClean(p2) + '\\cdot ' + fmtDecClean(c2) + ' = ' + fmtDecClean(pL) + '$.',
        'Theo công thức Bayes: ' + ` + JSON.stringify(cfg.stepDesc) + ` + ' $= \\dfrac{' + fmtDecClean(p1) + '\\cdot ' + fmtDecClean(c1) + '}{' + fmtDecClean(pL) + '} \\approx ' + shortAnswer + '$.',
      ],
    };
  `,
  boundaryCases: [
    { label: 'Biên hai tỉ lệ điều kiện bằng nhau', params: { p1Pct: 50, q1Pct: 5, q2Pct: 5 }, expectedValid: false },
    { label: cfg.defaults.label, params: { p1Pct: cfg.defaults.p1Pct, q1Pct: cfg.defaults.q1Pct, q2Pct: cfg.defaults.q2Pct }, expectedValid: true },
  ],
});

export const G12_B19_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D28 (Q28): Công thức xác suất toàn phần cơ bản (SA)
  t12_b19_d28_total_prob_basic_sa: {
    id: 't12_b19_d28_total_prob_basic_sa',
    name: 'Tính P(D) bằng công thức xác suất toàn phần (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Công thức xác suất toàn phần',
    description: 'Cho P(E), P(D|E) và P(D|\\overline{E}). Tính P(D) làm tròn đến hàng phần trăm.',
    conditionSummary: 'P(D|E) ≠ P(D|E\') và tránh biên .xx5',
    paramSpecs: [
      { name: 'pEInt', label: '100*P(E)', min: 20, max: 80 },
      { name: 'pDEInt', label: '100*P(D|E)', min: 8, max: 80 },
      { name: 'pDECompInt', label: '100*P(D|E\')', min: 10, max: 85 },
    ],
    validateCode: `
      const { pEInt, pDEInt, pDECompInt } = params;
      if (pDEInt === pDECompInt) return { valid: false, reason: 'Hai xác suất điều kiện bằng nhau' };
      const val = (pDEInt * pEInt + pDECompInt * (100 - pEInt)) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pEInt, pDEInt, pDECompInt } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pE = pEInt / 100, pEComp = (100 - pEInt) / 100;
      const pDE = pDEInt / 100, pDEComp = pDECompInt / 100;
      const ansR = round2(pDE * pE + pDEComp * pEComp);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Cho hai biến cố $D$, $E$ với $P(E) = ' +
          fmtDec2(pE) +
          '$; $P(D|E) = ' +
          fmtDec2(pDE) +
          '$ và $P\\left(D|\\overline{E}\\right) = ' +
          fmtDec2(pDEComp) +
          '$. Tính xác suất $P(D)$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $P(\\overline{E}) = 1 - P(E) = ' + fmtDec2(pEComp) + '$.',
          'Áp dụng công thức xác suất toàn phần: $P(D) = P(D|E)\\cdot P(E) + P(D|\\overline{E})\\cdot P(\\overline{E}) = ' + fmtDec2(pDE) + '\\cdot ' + fmtDec2(pE) + ' + ' + fmtDec2(pDEComp) + '\\cdot ' + fmtDec2(pEComp) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai XS điều kiện bằng nhau', params: { pEInt: 50, pDEInt: 40, pDECompInt: 40 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28', params: { pEInt: 56, pDEInt: 11, pDECompInt: 58 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Độ khó đề thi và tỉ lệ học sinh đạt điểm cao
  t12_b19_d29_exam_difficulty_sa: {
    id: 't12_b19_d29_exam_difficulty_sa',
    name: 'Bài toán độ khó đề thi và xác suất đạt điểm cao (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Ứng dụng công thức xác suất toàn phần',
    description: 'Cho xác suất đề thi khó pA, xác suất đạt điểm cao khi đề khó p1 và khi đề dễ p2 (p1 < p2). Tính xác suất học sinh bất kỳ đạt điểm cao.',
    conditionSummary: 'p1 < p2, pA ∈ [0,20; 0,80], tránh biên .xx5',
    paramSpecs: [
      { name: 'pAInt', label: '100*P(đề khó)', min: 25, max: 75 },
      { name: 'pHardInt', label: '100*P(điểm cao | đề khó)', min: 20, max: 55 },
      { name: 'pEasyInt', label: '100*P(điểm cao | đề dễ)', min: 58, max: 90 },
    ],
    validateCode: `
      const { pAInt, pHardInt, pEasyInt } = params;
      if (pHardInt >= pEasyInt) return { valid: false, reason: 'Xác suất điểm cao khi đề dễ phải lớn hơn khi đề khó' };
      const val = (pHardInt * pAInt + pEasyInt * (100 - pAInt)) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAInt, pHardInt, pEasyInt } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pA = pAInt / 100, pAComp = (100 - pAInt) / 100;
      const p1 = pHardInt / 100, p2 = pEasyInt / 100;
      const ansR = round2(pA * p1 + pAComp * p2);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Tỷ lệ học sinh đạt điểm cao trong một kỳ thi chịu ảnh hưởng bởi mức độ khó của đề thi. Nếu đề thi dễ, xác suất học sinh đạt điểm cao là $' +
          fmtDec2(p2) +
          '$; còn nếu đề thi khó, xác suất này giảm xuống còn $' +
          fmtDec2(p1) +
          '$. Theo phân tích, xác suất đề thi khó là $' +
          fmtDec2(pA) +
          '$. Tính xác suất để một học sinh bất kỳ đạt điểm cao trong kỳ thi (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$ là biến cố "Đề thi khó", $B$ là biến cố "Học sinh đạt điểm cao". Ta có $P(A) = ' + fmtDec2(pA) + '$, $P(\\overline{A}) = ' + fmtDec2(pAComp) + '$, $P(B|A) = ' + fmtDec2(p1) + '$, $P(B|\\overline{A}) = ' + fmtDec2(p2) + '$.',
          'Áp dụng công thức xác suất toàn phần: $P(B) = P(A)\\cdot P(B|A) + P(\\overline{A})\\cdot P(B|\\overline{A}) = ' + fmtDec2(pA) + '\\cdot ' + fmtDec2(p1) + ' + ' + fmtDec2(pAComp) + '\\cdot ' + fmtDec2(p2) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên đề khó điểm cao hơn đề dễ', params: { pAInt: 50, pHardInt: 70, pEasyInt: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29', params: { pAInt: 64, pHardInt: 41, pEasyInt: 68 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Chọn tổ hợp D07 và xác suất đỗ đại học
  t12_b19_d30_combo_d07_univ_sa: {
    id: 't12_b19_d30_combo_d07_univ_sa',
    name: 'Bài toán chọn tổ hợp thi và xác suất đỗ đại học (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Ứng dụng công thức xác suất toàn phần',
    description: 'Tỉ lệ chọn tổ hợp D07 là a%, xác suất đỗ đại học khi chọn D07 là p1, khi không chọn là p2. Tính xác suất đỗ đại học.',
    conditionSummary: 'p1 ≠ p2, tỉ lệ chọn tổ hợp ∈ [25%; 85%], tránh biên .xx5',
    paramSpecs: [
      { name: 'pctA', label: 'Tỉ lệ chọn tổ hợp D07 (%)', min: 30, max: 82 },
      { name: 'p1Int', label: '100*P(đỗ | chọn D07)', min: 45, max: 85 },
      { name: 'p2Int', label: '100*P(đỗ | không D07)', min: 35, max: 78 },
    ],
    validateCode: `
      const { pctA, p1Int, p2Int } = params;
      if (p1Int === p2Int) return { valid: false, reason: 'Hai xác suất đỗ bằng nhau' };
      const val = (pctA * p1Int + (100 - pctA) * p2Int) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pctA, p1Int, p2Int } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pA = pctA / 100, pAComp = (100 - pctA) / 100;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const ansR = round2(pA * p1 + pAComp * p2);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Trong một kì thi tốt nghiệp trung học phổ thông, một tỉnh $X$ có $' +
          pctA +
          '\\%$ học sinh lựa chọn tổ hợp D07 (gồm các môn Toán, Hóa học, Tiếng Anh). Biết rằng, nếu một học sinh chọn tổ hợp D07 thì xác suất để học sinh đó đỗ đại học là $' +
          fmtDec2(p1) +
          '$; còn nếu một học sinh không chọn tổ hợp D07 thì xác suất để học sinh đó đỗ đại học là $' +
          fmtDec2(p2) +
          '$. Chọn ngẫu nhiên một học sinh của tỉnh $X$ đã tốt nghiệp trung học phổ thông trong kì thi trên. Tính xác suất để học sinh đó đỗ đại học (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Học sinh đó chọn tổ hợp D07", $B$: "Học sinh đó đỗ đại học". Ta có $P(A) = ' + fmtDec2(pA) + '$, $P(\\overline{A}) = ' + fmtDec2(pAComp) + '$.',
          'Theo giả thiết: $P(B|A) = ' + fmtDec2(p1) + '$ và $P(B|\\overline{A}) = ' + fmtDec2(p2) + '$.',
          'Thay vào công thức xác suất toàn phần: $P(B) = P(A)\\cdot P(B|A) + P(\\overline{A})\\cdot P(B|\\overline{A}) = ' + fmtDec2(pA) + '\\cdot ' + fmtDec2(p1) + ' + ' + fmtDec2(pAComp) + '\\cdot ' + fmtDec2(p2) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai xác suất bằng nhau', params: { pctA: 70, p1Int: 60, p2Int: 60 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30', params: { pctA: 73, p1Int: 64, p2Int: 57 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Hái hoa có thưởng hai lượt
  t12_b19_d31_pick_flowers_seq_sa: makeSequentialPick2SameTypeSa({
    id: 't12_b19_d31_pick_flowers_seq_sa',
    name: 'Bài toán hái hoa có thưởng hai lượt không hoàn lại (Trả lời ngắn)',
    description: 'Có n bông hoa trong đó k bông có phiếu thưởng. An hái trước, Thảo hái sau. Tính xác suất Thảo hái được hoa có thưởng.',
    defaultN: 18,
    defaultK: 13,
    sampleLabel: 'Mẫu chuẩn Q31',
    stemTemplate: `
      const stem = 'Trong trò chơi hái hoa có thưởng của lớp 12A2, cô giáo treo $' + n + '$ bông hoa trên cành cây, trong đó có $' + k + '$ bông hoa chứa phiếu có thưởng. Bạn An hái bông hoa đầu tiên, sau đó bạn Thảo hái bông hoa thứ hai. Tính xác suất để bạn Thảo hái được bông hoa chứa phiếu có thưởng (kết quả làm tròn đến hàng phần trăm).';
    `,
    eventA: 'Bông hoa bạn Thảo hái được chứa phiếu có thưởng',
    eventB: 'Bông hoa bạn An hái được chứa phiếu có thưởng',
  }),

  // D32 (Q32): Rút bi màu tím hai lượt
  t12_b19_d32_draw_balls_seq_sa: makeSequentialPick2SameTypeSa({
    id: 't12_b19_d32_draw_balls_seq_sa',
    name: 'Bài toán hai bạn rút bi liên tiếp không hoàn lại (Trả lời ngắn)',
    description: 'Hộp có n viên bi trong đó k bi tím. Bảo rút trước, Hạnh rút sau. Tính xác suất Hạnh rút được bi tím.',
    defaultN: 23,
    defaultK: 15,
    sampleLabel: 'Mẫu chuẩn Q32',
    stemTemplate: `
      const stem = 'Một hộp chứa $' + n + '$ viên bi, trong đó có $' + k + '$ viên bi màu tím. Bạn Bảo rút ngẫu nhiên một viên bi trước, sau đó bạn Hạnh rút một viên bi. Tính xác suất để bạn Hạnh rút được một viên bi màu tím (kết quả làm tròn đến hàng phần trăm).';
    `,
    eventA: 'Bạn Hạnh rút được viên bi màu tím',
    eventB: 'Bạn Bảo rút được viên bi màu tím',
  }),

  // D33 (Q33): Lấy ly thủy tinh hai lượt
  t12_b19_d33_pick_glasses_seq_sa: makeSequentialPick2SameTypeSa({
    id: 't12_b19_d33_pick_glasses_seq_sa',
    name: 'Bài toán lấy ly thủy tinh trên kệ hai lượt (Trả lời ngắn)',
    description: 'Trên kệ có n chiếc ly gồm k ly thủy tinh còn lại ly nhựa. An lấy trước, Quân lấy sau. Tính xác suất Quân lấy được ly thủy tinh.',
    defaultN: 22,
    defaultK: 15,
    sampleLabel: 'Mẫu chuẩn Q33',
    stemTemplate: `
      const stem = 'Trên kệ có $' + n + '$ chiếc ly, trong đó có $' + k + '$ chiếc ly thủy tinh còn lại là ly nhựa. Bạn An lấy ngẫu nhiên một chiếc ly trước, sau đó đến lượt bạn Quân lấy một chiếc ly. Tính xác suất để bạn Quân lấy được chiếc ly thủy tinh (kết quả làm tròn đến hàng phần trăm).';
    `,
    eventA: 'Bạn Quân lấy được chiếc ly thủy tinh',
    eventB: 'Bạn An lấy được chiếc ly thủy tinh',
  }),

  // D34 (Q34): Lấy sách Tin học hai lượt
  t12_b19_d34_pick_books_seq_sa: makeSequentialPick2SameTypeSa({
    id: 't12_b19_d34_pick_books_seq_sa',
    name: 'Bài toán lấy sách trên kệ hai lượt (Trả lời ngắn)',
    description: 'Trên kệ có n cuốn sách gồm k cuốn Tin học. Tuấn lấy trước, Vy lấy sau. Tính xác suất Vy lấy được sách Tin học.',
    defaultN: 19,
    defaultK: 13,
    sampleLabel: 'Mẫu chuẩn Q34',
    stemTemplate: `
      const stem = 'Trên kệ có $' + n + '$ cuốn sách, trong đó có $' + k + '$ cuốn sách Tin học khác nhau. Bạn Tuấn lấy ngẫu nhiên một cuốn sách, sau đó đến lượt bạn Vy lấy một cuốn khác từ kệ. Tính xác suất để bạn Vy lấy được cuốn sách Tin học (kết quả làm tròn đến hàng phần trăm).';
    `,
    eventA: 'Bạn Vy lấy được cuốn sách Tin học',
    eventB: 'Bạn Tuấn lấy được cuốn sách Tin học',
  }),

  // D35 (Q35): Khảo sát việc làm sinh viên tốt nghiệp
  t12_b19_d35_graduate_job_sa: {
    id: 't12_b19_d35_graduate_job_sa',
    name: 'Bài toán khảo sát tỉ lệ việc làm đúng chuyên ngành sau tốt nghiệp (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Ứng dụng công thức xác suất toàn phần',
    description: 'Tỉ lệ tốt nghiệp loại giỏi là a%; tìm được việc đúng chuyên ngành của loại giỏi và loại khác là b%, c%. Tính xác suất tìm việc đúng chuyên ngành.',
    conditionSummary: 'b ≠ c, a ∈ [15%; 50%], tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pctG', label: 'Tỉ lệ tốt nghiệp giỏi (%)', min: 18, max: 45 },
      { name: 'pctDG', label: 'Đúng chuyên ngành | giỏi (%)', min: 70, max: 95 },
      { name: 'pctDK', label: 'Đúng chuyên ngành | khác (%)', min: 55, max: 88 },
    ],
    validateCode: `
      const { pctG, pctDG, pctDK } = params;
      if (pctDG === pctDK) return { valid: false, reason: 'Hai tỉ lệ bằng nhau' };
      const val = (pctG * pctDG + (100 - pctG) * pctDK) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pctG, pctDG, pctDK } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pG = pctG / 100, pK = (100 - pctG) / 100;
      const pDG = pctDG / 100, pDK = pctDK / 100;
      const ansR = round2(pG * pDG + pK * pDK);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một trường đại học tiến hành khảo sát tình trạng việc làm sau khi tốt nghiệp của sinh viên. Kết quả khảo sát cho thấy tỉ lệ người tìm được việc làm đúng chuyên ngành là $' +
          pctDG +
          '\\%$ đối với sinh viên tốt nghiệp loại giỏi và $' +
          pctDK +
          '\\%$ đối với sinh viên tốt nghiệp loại khác. Tỉ lệ sinh viên tốt nghiệp loại giỏi là $' +
          pctG +
          '\\%$. Chọn ngẫu nhiên một sinh viên đã tốt nghiệp của trường. Tính xác suất sinh viên đó tìm được việc làm đúng chuyên ngành (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $G$: "Sinh viên tốt nghiệp loại giỏi", $K = \\overline{G}$: "Sinh viên tốt nghiệp loại khác", $D$: "Sinh viên tìm được việc làm đúng chuyên ngành".',
          'Ta có $P(G) = ' + fmtDec2(pG) + '$, $P(K) = ' + fmtDec2(pK) + '$, $P(D|G) = ' + fmtDec2(pDG) + '$, $P(D|K) = ' + fmtDec2(pDK) + '$.',
          'Áp dụng công thức xác suất toàn phần: $P(D) = P(G)\\cdot P(D|G) + P(K)\\cdot P(D|K) = ' + fmtDec2(pG) + '\\cdot ' + fmtDec2(pDG) + ' + ' + fmtDec2(pK) + '\\cdot ' + fmtDec2(pDK) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn .xx5', params: { pctG: 50, pctDG: 80, pctDK: 71 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35', params: { pctG: 26, pctDG: 83, pctDK: 78 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Chuyển 1 bi từ hộp 1 sang hộp 2 rồi lấy đồng thời 2 bi từ hộp 2 (SA làm tròn 2 chữ số)
  t12_b19_d36_transfer_pick2_dec_sa: {
    id: 't12_b19_d36_transfer_pick2_dec_sa',
    name: 'Chuyển 1 bi sang hộp thứ hai rồi lấy 2 bi (Trả lời ngắn thập phân)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức xác suất toàn phần kết hợp tổ hợp',
    description:
      'Hộp 1 có r1 bi đỏ, x1 bi xanh; Hộp 2 có r2 bi đỏ, x2 bi xanh. Chuyển 1 bi từ hộp 1 sang hộp 2 rồi lấy 2 bi từ hộp 2. Tính xác suất 2 bi đều đỏ làm tròn hàng phần trăm.',
    conditionSummary: 'r1, x1, r2, x2 >= 3 và tránh biên .xx5',
    paramSpecs: [
      { name: 'r1', label: 'Bi đỏ hộp 1', min: 3, max: 9 },
      { name: 'x1', label: 'Bi xanh hộp 1', min: 3, max: 9 },
      { name: 'r2', label: 'Bi đỏ hộp 2', min: 4, max: 11 },
      { name: 'x2', label: 'Bi xanh hộp 2', min: 4, max: 12 },
    ],
    validateCode: `
      const { r1, x1, r2, x2 } = params;
      if (r1 < 2 || x1 < 2 || r2 < 3 || x2 < 2) return { valid: false, reason: 'Số bi chưa đủ' };
      const comb2 = (n) => (n * (n - 1)) / 2;
      const num = r1 * comb2(r2 + 1) + x1 * comb2(r2);
      const den = (r1 + x1) * comb2(r2 + x2 + 1);
      const val = num / den;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, x1, r2, x2 } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const n1 = r1 + x1;
      const n2New = r2 + x2 + 1;
      const total2 = comb(n2New, 2);
      const favR = comb(r2 + 1, 2);
      const favG = comb(r2, 2);
      const pA = u.simplifyFrac(r1, n1);
      const pAComp = u.simplifyFrac(x1, n1);
      const pBA = u.simplifyFrac(favR, total2);
      const pBAComp = u.simplifyFrac(favG, total2);
      const ansFrac = u.simplifyFrac(r1 * favR + x1 * favG, n1 * total2);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Hộp thứ nhất có $' +
          r1 +
          '$ viên bi đỏ và $' +
          x1 +
          '$ viên bi xanh. Hộp thứ hai có $' +
          r2 +
          '$ viên bi đỏ và $' +
          x2 +
          '$ viên bi xanh. Các viên bi có cùng kích thước và khối lượng. Lấy ra ngẫu nhiên $1$ viên bi từ hộp thứ nhất chuyển sang hộp thứ hai. Sau đó lại lấy ra ngẫu nhiên đồng thời $2$ viên bi từ hộp thứ hai. Xác suất để hai viên bi lấy ra từ hộp thứ hai đều là bi đỏ là (kết quả làm tròn đến hàng phần trăm):',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Viên bi chuyển sang hộp thứ hai màu đỏ", $B$: "Hai viên bi lấy từ hộp thứ hai đều là bi đỏ".',
          'Ta có $P(A) = ' + pA.latex + '$, $P(\\overline{A}) = ' + pAComp.latex + '$, $P(B|A) = \\dfrac{C_{' + (r2 + 1) + '}^2}{C_{' + n2New + '}^2} = ' + pBA.latex + '$, $P(B|\\overline{A}) = \\dfrac{C_{' + r2 + '}^2}{C_{' + n2New + '}^2} = ' + pBAComp.latex + '$.',
          'Theo công thức xác suất toàn phần: $P(B) = ' + pBA.latex + '\\cdot ' + pA.latex + ' + ' + pBAComp.latex + '\\cdot ' + pAComp.latex + ' = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ít bi đỏ hộp 2', params: { r1: 7, x1: 3, r2: 2, x2: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36', params: { r1: 7, x1: 3, r2: 8, x2: 11 }, expectedValid: true },
    ],
  },

  // D37 (Q37): Chẩn đoán ung thư — xác suất nhận kết quả KHÔNG bị ung thư (SA)
  t12_b19_d37_diagnosis_neg_sa: {
    id: 't12_b19_d37_diagnosis_neg_sa',
    name: 'Tính xác suất kết quả chẩn đoán không mắc bệnh P(\\overline{B}) (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức xác suất toàn phần & biến cố đối',
    description: 'Cho P(mắc bệnh), xác suất chẩn đoán đúng người bệnh và chẩn đoán nhầm người khỏe. Tính xác suất chẩn đoán không mắc bệnh (2 chữ số).',
    conditionSummary: 'p2 < p1, tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pAInt', label: '100*P(mắc bệnh)', min: 5, max: 25 },
      { name: 'p1Int', label: '100*P(chẩn đoán đúng)', min: 60, max: 94 },
      { name: 'p2Int', label: '100*P(chẩn đoán nhầm)', min: 6, max: 28 },
    ],
    validateCode: `
      const { pAInt, p1Int, p2Int } = params;
      if (p2Int >= p1Int) return { valid: false, reason: 'Xác suất chẩn đoán đúng phải lớn hơn chẩn đoán sai' };
      const pPos = (pAInt * p1Int + (100 - pAInt) * p2Int) / 10000;
      const pNeg = 1 - pPos;
      if (Math.abs(((pNeg * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAInt, p1Int, p2Int } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pA = pAInt / 100, pAComp = (100 - pAInt) / 100;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const pBFrac = u.simplifyFrac(pAInt * p1Int + (100 - pAInt) * p2Int, 10000);
      const ansR = round2(1 - pBFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Ở một địa phương $X$, xác suất để một người lớn trên $40$ tuổi mắc bệnh ung thư là $' +
          fmtDec2(pA) +
          '$. Xác suất bác sĩ chẩn đoán đúng một người mắc bệnh ung thư là $' +
          fmtDec2(p1) +
          '$ và chẩn đoán sai (không bị ung thư nhưng được chẩn đoán mắc bệnh) là $' +
          fmtDec2(p2) +
          '$. Xác suất để một người nhận được kết quả chẩn đoán không bị ung thư bằng (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Người đó mắc ung thư", $B$: "Bác sĩ chẩn đoán người đó bị ung thư".',
          'Theo công thức xác suất toàn phần: $P(B) = ' + fmtDec2(p1) + '\\cdot ' + fmtDec2(pA) + ' + ' + fmtDec2(p2) + '\\cdot ' + fmtDec2(pAComp) + ' = ' + pBFrac.latex + '$.',
          'Xác suất chẩn đoán không bị ung thư: $P(\\overline{B}) = 1 - P(B) = 1 - ' + pBFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chẩn đoán nhầm cao hơn đúng', params: { pAInt: 14, p1Int: 20, p2Int: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37', params: { pAInt: 14, p1Int: 69, p2Int: 22 }, expectedValid: true },
    ],
  },

  // D38 (Q38): Xét nghiệm bệnh truyền nhiễm tỉ lệ thấp -> xác suất dương tính theo % làm tròn hàng đơn vị
  t12_b19_d38_rare_disease_test_pct_sa: {
    id: 't12_b19_d38_rare_disease_test_pct_sa',
    name: 'Tính tỉ lệ phần trăm xét nghiệm dương tính (bệnh hiếm gặp, Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức xác suất toàn phần',
    description: 'Tỉ lệ dân số mắc bệnh là k phần nghìn (0,1%..0,9%); xét nghiệm dương tính 90% với người bệnh và p2% với người khỏe. Hỏi xác suất dương tính bằng bao nhiêu % (làm tròn hàng đơn vị).',
    conditionSummary: 'k ∈ [1; 9] (tương ứng 0,1%..0,9%), tránh ranh giới làm tròn .5%',
    paramSpecs: [
      { name: 'kPromille', label: 'Tỉ lệ mắc bệnh (phần nghìn, 1..9)', min: 2, max: 9 },
      { name: 'pTruePct', label: 'Độ nhạy xét nghiệm (%)', min: 85, max: 98 },
      { name: 'pFalsePct', label: 'Dương tính giả (%)', min: 1, max: 8 },
    ],
    validateCode: `
      const { kPromille, pTruePct, pFalsePct } = params;
      if (kPromille < 1 || kPromille > 15 || pFalsePct >= pTruePct) {
        return { valid: false, reason: 'Tham số xét nghiệm không hợp lý' };
      }
      const pB = kPromille / 1000;
      const pct = (pB * (pTruePct / 100) + (1 - pB) * (pFalsePct / 100)) * 100;
      if (Math.abs((pct % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn nửa phần trăm (.5%)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { kPromille, pTruePct, pFalsePct } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pB = kPromille / 1000;
      const pBComp = 1 - pB;
      const p1 = pTruePct / 100, p2 = pFalsePct / 100;
      const pD = pB * p1 + pBComp * p2;
      const ansPct = Math.round(pD * 100);
      const shortAnswer = String(ansPct);
      const pBPctStr = ('0,' + kPromille);
      return {
        stem:
          'Ở một đất nước, có khoảng $' +
          pBPctStr +
          '\\%$ dân số mắc một bệnh truyền nhiễm $T$. Khi thực hiện xét nghiệm bệnh $T$ thì kết quả dương tính chính xác $' +
          pTruePct +
          '\\%$ với người bị bệnh và $' +
          pFalsePct +
          '\\%$ với người không bị bệnh. Chọn ngẫu nhiên một người và xét nghiệm. Xác suất để người đó dương tính là bao nhiêu $\\%$ (làm tròn đến hàng đơn vị)?',
        shortAnswer,
        numericValue: ansPct,
        answerSummary: shortAnswer + '%',
        solutionSteps: [
          'Gọi $B$ là biến cố "người mắc bệnh", $D$ là biến cố "kết quả dương tính". Ta có $P(B) = ' + fmtDecClean(pB) + '$, $P(\\overline{B}) = ' + fmtDecClean(pBComp) + '$.',
          'Ta có $P(D|B) = ' + fmtDecClean(p1) + '$ và $P(D|\\overline{B}) = ' + fmtDecClean(p2) + '$.',
          'Theo công thức xác suất toàn phần: $P(D) = P(D|B)\\cdot P(B) + P(D|\\overline{B})\\cdot P(\\overline{B}) = ' + fmtDecClean(p1) + '\\cdot ' + fmtDecClean(pB) + ' + ' + fmtDecClean(p2) + '\\cdot ' + fmtDecClean(pBComp) + ' \\approx ' + ansPct + '\\%$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nửa phần trăm', params: { kPromille: 6, pTruePct: 84, pFalsePct: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38', params: { kPromille: 3, pTruePct: 90, pFalsePct: 2 }, expectedValid: true },
    ],
  },

  // D39 (Q39): Trộn sản phẩm hai nhà máy -> tính xác suất lấy được linh kiện TỐT
  t12_b19_d39_two_factories_good_part_sa: {
    id: 't12_b19_d39_two_factories_good_part_sa',
    name: 'Bài toán hai nhà máy sản xuất — tính xác suất chọn được linh kiện tốt (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức xác suất toàn phần',
    description: 'Lô hàng trộn n1 sản phẩm nhà máy I (phế phẩm p1%) và n2 sản phẩm nhà máy II (phế phẩm p2%). Tính xác suất lấy ngẫu nhiên được linh kiện tốt.',
    conditionSummary: 'p1 ≠ p2, n1, n2 ∈ [40; 150], tránh biên .xx5',
    paramSpecs: [
      { name: 'n1', label: 'Số sản phẩm nhà máy I', min: 50, max: 130 },
      { name: 'n2', label: 'Số sản phẩm nhà máy II', min: 50, max: 130 },
      { name: 'p1Pct', label: 'Tỉ lệ phế phẩm NM I (%)', min: 2, max: 12 },
      { name: 'p2Pct', label: 'Tỉ lệ phế phẩm NM II (%)', min: 1, max: 10 },
    ],
    validateCode: `
      const { n1, n2, p1Pct, p2Pct } = params;
      if (p1Pct === p2Pct) return { valid: false, reason: 'Hai tỉ lệ phế phẩm bằng nhau' };
      const tot = n1 + n2;
      const pGood = (n1 * (100 - p1Pct) + n2 * (100 - p2Pct)) / (tot * 100);
      if (Math.abs(((pGood * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, p1Pct, p2Pct } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const tot = n1 + n2;
      const pI = u.simplifyFrac(n1, tot);
      const pII = u.simplifyFrac(n2, tot);
      const g1 = (100 - p1Pct) / 100;
      const g2 = (100 - p2Pct) / 100;
      const pT = (n1 * (100 - p1Pct) + n2 * (100 - p2Pct)) / (tot * 100);
      const ansR = round2(pT);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một loại linh kiện do hai nhà máy $I$ và $II$ cùng sản xuất. Tỉ lệ phế phẩm của các nhà máy $I$ và $II$ lần lượt là $' +
          p1Pct +
          '\\%$ và $' +
          p2Pct +
          '\\%$. Trong một lô linh kiện có $' +
          n1 +
          '$ sản phẩm của nhà máy $I$ và $' +
          n2 +
          '$ sản phẩm của nhà máy $II$ được trộn lẫn với nhau. Một khách hàng lấy ngẫu nhiên một linh kiện từ lô hàng đó. Tính xác suất để linh kiện lấy ra là linh kiện tốt (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $I, II$ lần lượt là biến cố linh kiện do nhà máy $I, II$ sản xuất, $T$ là biến cố linh kiện tốt. Ta có $P(I) = ' + pI.latex + '$, $P(II) = ' + pII.latex + '$.',
          'Tỉ lệ linh kiện tốt: $P(T|I) = 1 - ' + fmtDec2(p1Pct / 100) + ' = ' + fmtDec2(g1) + '$ và $P(T|II) = 1 - ' + fmtDec2(p2Pct / 100) + ' = ' + fmtDec2(g2) + '$.',
          'Theo công thức xác suất toàn phần: $P(T) = ' + pI.latex + '\\cdot ' + fmtDec2(g1) + ' + ' + pII.latex + '\\cdot ' + fmtDec2(g2) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai tỉ lệ phế phẩm bằng nhau', params: { n1: 80, n2: 80, p1Pct: 4, p2Pct: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39', params: { n1: 95, n2: 98, p1Pct: 6, p2Pct: 2 }, expectedValid: true },
    ],
  },

  // D40 (Q40): Trò chơi lật k lá đỏ và k lá tím — xác suất lần lật thứ 3 đoán đúng
  t12_b19_d40_card_flip_strategy_sa: {
    id: 't12_b19_d40_card_flip_strategy_sa',
    name: 'Bài toán chiến lược đoán màu lá bài ở lần lật thứ 3 (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức xác suất toàn phần trong trò chơi chiến lược',
    description:
      'Có k lá đỏ và k lá tím. Dũng lật từng lá và luôn đoán màu sao cho xác suất đúng lớn nhất. Tính xác suất lần lật thứ 3 đoán đúng.',
    conditionSummary: 'k ∈ [3; 14] và k/(2k - 1) không nằm sát biên .xx5',
    paramSpecs: [
      { name: 'k', label: 'Số lá bài mỗi màu (k)', min: 3, max: 14 },
    ],
    validateCode: `
      const { k } = params;
      if (k < 3 || k > 20) return { valid: false, reason: 'Số lá bài mỗi màu phải >= 3' };
      const val = k / (2 * k - 1);
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const nTotal = 2 * k;
      const pSame = u.simplifyFrac(k - 1, 2 * k - 1);
      const pDiff = u.simplifyFrac(k, 2 * k - 1);
      const pWinSame = u.simplifyFrac(k, nTotal - 2);
      const ansFrac = u.simplifyFrac(k, 2 * k - 1);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Trên mặt bàn có $' +
          k +
          '$ lá bài đỏ và $' +
          k +
          '$ lá bài tím chưa được lật. Bạn Dũng thực hiện lật ngẫu nhiên lần lượt từng lá bài, trước khi lật từng lá bài Dũng phải đoán màu của lá bài đó và luôn đoán sao cho xác suất đoán đúng là lớn nhất. Hỏi xác suất lần lật bài thứ $3$, Dũng đoán đúng màu của lá bài đó là bao nhiêu (làm tròn kết quả đến hàng phần trăm)?',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Xét $2$ lần lật đầu tiên trong $' + nTotal + '$ lá bài:',
          '- Nếu $2$ lá đầu cùng màu (xác suất $2\\cdot \\dfrac{' + k + '}{' + nTotal + '}\\cdot \\dfrac{' + (k - 1) + '}{' + (nTotal - 1) + '} = ' + pSame.latex + '$), trong $' + (nTotal - 2) + '$ lá còn lại có $' + k + '$ lá màu kia nên xác suất đoán đúng lớn nhất ở lần $3$ là $\\dfrac{' + k + '}{' + (nTotal - 2) + '}$.',
          '- Nếu $2$ lá đầu khác màu (xác suất $' + pDiff.latex + '$), còn lại $' + (k - 1) + '$ lá mỗi màu nên xác suất đúng ở lần $3$ là $\\dfrac{1}{2}$.',
          'Theo công thức xác suất toàn phần: $P = ' + pSame.latex + '\\cdot ' + pWinSame.latex + ' + ' + pDiff.latex + '\\cdot \\dfrac{1}{2} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k quá nhỏ (< 3)', params: { k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40', params: { k: 6 }, expectedValid: true },
    ],
  },

  // D41 (Q41): Bayes — Hai phân xưởng I và II (sản phẩm lỗi -> phân xưởng I)
  t12_b19_d41_bayes_two_workshops_sa: makeTwoGroupBayesSa({
    id: 't12_b19_d41_bayes_two_workshops_sa',
    name: 'Công thức Bayes tìm xác suất sản phẩm lỗi do phân xưởng I (Trả lời ngắn)',
    description: 'Nhà máy có phân xưởng I (p1%) và II (100-p1%), tỉ lệ lỗi q1% và q2%. Kiểm tra 1 sản phẩm bị lỗi, tính xác suất do phân xưởng I.',
    defaults: { p1Pct: 43, q1Pct: 3, q2Pct: 7, label: 'Mẫu chuẩn Q41' },
    stemTemplate: `
      const stem = 'Một nhà máy có hai phân xưởng $I$ và $II$. Phân xưởng $I$ sản xuất $' + p1Pct + '\\\\%$ số sản phẩm và phân xưởng $II$ sản xuất $' + p2Pct + '\\\\%$ số sản phẩm. Tỉ lệ sản phẩm bị lỗi của phân xưởng $I$ là $' + q1Pct + '\\\\%$ và của phân xưởng $II$ là $' + q2Pct + '\\\\%$. Kiểm tra ngẫu nhiên một sản phẩm của nhà máy và thấy sản phẩm bị lỗi. Tính xác suất sản phẩm lỗi đó do phân xưởng $I$ sản xuất (kết quả làm tròn đến hàng phần trăm).';
    `,
    eventNames: 'Gọi $A$: "Sản phẩm do phân xưởng I sản xuất", $B$: "Sản phẩm do phân xưởng II sản xuất", $L$: "Sản phẩm bị lỗi".',
    stepDesc: '$P(A|L)$',
  }),

  // D42 (Q42): Bayes — Công ty có hai chi nhánh I và II (khách hàng không hài lòng -> chi nhánh I)
  t12_b19_d42_bayes_two_branches_sa: makeTwoGroupBayesSa({
    id: 't12_b19_d42_bayes_two_branches_sa',
    name: 'Công thức Bayes tìm xác suất khách hàng không hài lòng thuộc chi nhánh I (Trả lời ngắn)',
    description: 'Công ty có chi nhánh I (p1% khách) và II (100-p1% khách), tỉ lệ không hài lòng q1% và q2%. Chọn 1 khách không hài lòng, tính xác suất thuộc chi nhánh I.',
    defaults: { p1Pct: 60, q1Pct: 10, q2Pct: 5, label: 'Mẫu chuẩn Q42' },
    stemTemplate: `
      const stem = 'Một công ty có hai chi nhánh $I$ và $II$. Chi nhánh $I$ chiếm $' + p1Pct + '\\\\%$ tổng số khách hàng và chi nhánh $II$ chiếm $' + p2Pct + '\\\\%$ tổng số khách hàng. Theo khảo sát, ở chi nhánh $I$ có $' + q1Pct + '\\\\%$ khách hàng không hài lòng về dịch vụ trong khi ở chi nhánh $II$ tỷ lệ này là $' + q2Pct + '\\\\%$. Chọn ngẫu nhiên một khách hàng không hài lòng. Tính xác suất khách hàng không hài lòng về dịch vụ thuộc chi nhánh $I$ (kết quả làm tròn đến hàng phần trăm).';
    `,
    eventNames: 'Gọi $A$: "Khách hàng do chi nhánh I phục vụ", $B$: "Khách hàng do chi nhánh II phục vụ", $L$: "Khách hàng không hài lòng".',
    stepDesc: '$P(A|L)$',
  }),

  // D43 (Q43): Bayes — Xe đạp và xe máy điện gặp lỗi kỹ thuật
  t12_b19_d43_bayes_ebike_defect_sa: makeTwoGroupBayesSa({
    id: 't12_b19_d43_bayes_ebike_defect_sa',
    name: 'Công thức Bayes tìm xác suất xe lỗi thuộc dòng xe đạp (Trả lời ngắn)',
    description: 'Nhà máy sản xuất xe đạp (p1%) và xe máy điện (100-p1%), xác suất lỗi kỹ thuật lần lượt là q1% và q2%. Chọn 1 xe bị lỗi, tính xác suất là xe đạp.',
    defaults: { p1Pct: 40, q1Pct: 7, q2Pct: 8, label: 'Mẫu chuẩn Q43' },
    stemTemplate: `
      const stem = 'Một nhà máy sản xuất hai dòng xe là xe đạp và xe máy điện. Dòng xe đạp chiếm $' + p1Pct + '\\\\%$ tổng sản lượng, còn dòng xe máy điện chiếm $' + p2Pct + '\\\\%$ tổng sản lượng. Xác suất một chiếc xe đạp gặp lỗi kỹ thuật là $' + q1Pct + '\\\\%$ trong khi xác suất này với xe máy điện là $' + q2Pct + '\\\\%$. Một chiếc xe được chọn ngẫu nhiên và phát hiện bị lỗi. Tính xác suất chiếc xe đó thuộc dòng xe đạp (kết quả làm tròn đến hàng phần trăm).';
    `,
    eventNames: 'Gọi $A$: "Xe được chọn là dòng xe đạp", $B$: "Xe được chọn là dòng xe máy điện", $L$: "Xe bị lỗi kỹ thuật".',
    stepDesc: '$P(A|L)$',
  }),

  // D44 (Q44): Bayes — Bệnh viện xét nghiệm phát hiện bệnh (khỏe mạnh p1%, mắc bệnh (100-p1)%)
  t12_b19_d44_bayes_medical_test_sa: {
    id: 't12_b19_d44_bayes_medical_test_sa',
    name: 'Công thức Bayes trong xét nghiệm y khoa — xác suất thực sự mắc bệnh khi dương tính (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trong y học',
    description:
      'Trong số bệnh nhân xét nghiệm có pK% khỏe mạnh, (100-pK)% mắc bệnh. Tỉ lệ dương tính ở người khỏe là q1%, ở người mắc bệnh là q2%. Biết dương tính, tính xác suất thực sự mắc bệnh.',
    conditionSummary: 'q1 < q2, tránh sai lệch làm tròn P(D) 3 chữ số và tránh biên .xx5',
    paramSpecs: [
      { name: 'pKPct', label: 'Tỉ lệ người khỏe mạnh (%)', min: 40, max: 75 },
      { name: 'q1Pct', label: 'Dương tính ở người khỏe (%)', min: 3, max: 15 },
      { name: 'q2Pct', label: 'Dương tính ở người bệnh (%)', min: 55, max: 92 },
    ],
    validateCode: `
      const { pKPct, q1Pct, q2Pct } = params;
      if (q1Pct >= q2Pct) return { valid: false, reason: 'Xác suất dương tính ở người bệnh phải cao hơn người khỏe' };
      const pK = pKPct / 100, pM = 1 - pK;
      const c1 = q1Pct / 100, c2 = q2Pct / 100;
      const pD = pK * c1 + pM * c2;
      const ansExact = (pM * c2) / pD;
      const pDRound3 = Math.round(pD * 1000) / 1000;
      const ansViaRound3 = (pM * c2) / pDRound3;
      if (Math.round(ansExact * 100) !== Math.round(ansViaRound3 * 100)) {
        return { valid: false, reason: 'Tránh lệch 0,01 khi làm tròn P(D) 3 chữ số' };
      }
      if (Math.abs(((ansExact * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pKPct, q1Pct, q2Pct } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pMPct = 100 - pKPct;
      const pK = pKPct / 100, pM = pMPct / 100;
      const c1 = q1Pct / 100, c2 = q2Pct / 100;
      const pD = pK * c1 + pM * c2;
      const ans = (pM * c2) / pD;
      const ansR = round2(ans);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một bệnh viện thực hiện xét nghiệm phát hiện một loại bệnh. Trong số các bệnh nhân đến xét nghiệm, có $' +
          pKPct +
          '\\%$ là người khỏe mạnh và $' +
          pMPct +
          '\\%$ là người mắc bệnh. Xét nghiệm có xác suất cho kết quả dương tính ở người khỏe mạnh là $' +
          q1Pct +
          '\\%$ và xác suất cho kết quả dương tính ở người mắc bệnh là $' +
          q2Pct +
          '\\%$. Một người có kết quả xét nghiệm là dương tính. Tính xác suất người đó thực sự mắc bệnh (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $K$: "Người xét nghiệm khỏe mạnh", $M$: "Người xét nghiệm mắc bệnh", $D$: "Kết quả dương tính".',
          'Ta có $P(K) = ' + fmtDec2(pK) + '$, $P(M) = ' + fmtDec2(pM) + '$, $P(D|K) = ' + fmtDec2(c1) + '$, $P(D|M) = ' + fmtDec2(c2) + '$.',
          'Xác suất kết quả dương tính: $P(D) = ' + fmtDec2(pK) + '\\cdot ' + fmtDec2(c1) + ' + ' + fmtDec2(pM) + '\\cdot ' + fmtDec2(c2) + ' = ' + fmtDecClean(pD) + '$.',
          'Theo công thức Bayes: $P(M|D) = \\dfrac{P(M)\\cdot P(D|M)}{P(D)} = \\dfrac{' + fmtDec2(pM) + '\\cdot ' + fmtDec2(c2) + '}{' + fmtDecClean(pD) + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên độ nhạy thấp hơn dương tính giả', params: { pKPct: 53, q1Pct: 40, q2Pct: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44', params: { pKPct: 53, q1Pct: 6, q2Pct: 62 }, expectedValid: true },
    ],
  },

  // D45 (Q45): Bayes — Hai đội phát triển phần mềm (Team Phoenix & Team Dragon)
  t12_b19_d45_bayes_software_teams_sa: makeTwoGroupBayesSa({
    id: 't12_b19_d45_bayes_software_teams_sa',
    name: 'Công thức Bayes tìm xác suất sản phẩm lỗi do Team Phoenix (Trả lời ngắn)',
    description: 'Team Phoenix phát triển p1%, Team Dragon phát triển (100-p1%), tỉ lệ lỗi q1% và q2%. Chọn 1 sản phẩm bị lỗi, tính xác suất do Team Phoenix.',
    defaults: { p1Pct: 61, q1Pct: 4, q2Pct: 10, label: 'Mẫu chuẩn Q45' },
    stemTemplate: `
      const stem = 'Một công ty phần mềm có hai đội phát triển là Team Phoenix và Team Dragon. Biết rằng Team Phoenix phát triển $' + p1Pct + '\\\\%$ số sản phẩm và Team Dragon phát triển $' + p2Pct + '\\\\%$ số sản phẩm. Tỉ lệ sản phẩm có lỗi từ Team Phoenix là $' + q1Pct + '\\\\%$ và từ Team Dragon là $' + q2Pct + '\\\\%$. Chọn ngẫu nhiên một sản phẩm do các đội phát triển và thấy sản phẩm bị lỗi. Tính xác suất sản phẩm đó được phát triển bởi Team Phoenix (kết quả làm tròn đến hàng phần trăm).';
    `,
    eventNames: 'Gọi $A$: "Sản phẩm do Team Phoenix phát triển", $B$: "Sản phẩm do Team Dragon phát triển", $L$: "Sản phẩm bị lỗi".',
    stepDesc: '$P(A|L)$',
  }),

  // D46 (Q46): Bayes — Hệ thống radar phát cảnh báo mục tiêu thật/giả
  t12_b19_d46_bayes_radar_alert_sa: {
    id: 't12_b19_d46_bayes_radar_alert_sa',
    name: 'Công thức Bayes trong bài toán hệ thống radar phát cảnh báo (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức Bayes',
    description: 'Có pG% vật thể bay là mục tiêu giả. Xác suất radar cảnh báo khi gặp mục tiêu thật là q1%, khi gặp mục tiêu giả là q2%. Biết đang cảnh báo, tính xác suất là mục tiêu thật.',
    conditionSummary: 'pG ∈ [80%; 96%], q2 < q1, tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pGPct', label: 'Tỉ lệ mục tiêu giả (%)', min: 82, max: 96 },
      { name: 'q1Pct', label: 'Cảnh báo | mục tiêu thật (%)', min: 75, max: 96 },
      { name: 'q2Pct', label: 'Cảnh báo | mục tiêu giả (%)', min: 2, max: 12 },
    ],
    validateCode: `
      const { pGPct, q1Pct, q2Pct } = params;
      if (pGPct < 60 || pGPct > 98 || q2Pct >= q1Pct) {
        return { valid: false, reason: 'Tham số radar không hợp lý' };
      }
      const pT = (100 - pGPct) / 100, pG = pGPct / 100;
      const c1 = q1Pct / 100, c2 = q2Pct / 100;
      const pA = pT * c1 + pG * c2;
      const ans = (pT * c1) / pA;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pGPct, q1Pct, q2Pct } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pTPct = 100 - pGPct;
      const pT = pTPct / 100, pG = pGPct / 100;
      const c1 = q1Pct / 100, c2 = q2Pct / 100;
      const pA = pT * c1 + pG * c2;
      const ans = (pT * c1) / pA;
      const ansR = round2(ans);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Khi phát hiện một vật thể bay, xác suất một hệ thống radar phát cảnh báo là $' +
          q1Pct +
          '\\%$ nếu vật thể đó là mục tiêu thật và là $' +
          q2Pct +
          '\\%$ nếu đó là mục tiêu giả. Có $' +
          pGPct +
          '\\%$ các vật thể bay là mục tiêu giả. Biết rằng hệ thống radar đang phát cảnh báo khi phát hiện một vật thể bay. Tính xác suất vật thể đó là mục tiêu thật (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $T$: "mục tiêu thật", $G$: "mục tiêu giả", $A$: "radar phát cảnh báo". Ta có $P(T) = ' + fmtDec2(pT) + '$, $P(G) = ' + fmtDec2(pG) + '$, $P(A|T) = ' + fmtDec2(c1) + '$, $P(A|G) = ' + fmtDec2(c2) + '$.',
          'Xác suất radar phát cảnh báo: $P(A) = ' + fmtDec2(c1) + '\\cdot ' + fmtDec2(pT) + ' + ' + fmtDec2(c2) + '\\cdot ' + fmtDec2(pG) + ' = ' + fmtDecClean(pA) + '$.',
          'Theo định lý Bayes: $P(T|A) = \\dfrac{P(A|T)P(T)}{P(A)} = \\dfrac{' + fmtDec2(c1) + '\\cdot ' + fmtDec2(pT) + '}{' + fmtDecClean(pA) + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên báo giả cao hơn báo thật', params: { pGPct: 94, q1Pct: 10, q2Pct: 20 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46', params: { pGPct: 94, q1Pct: 88, q2Pct: 5 }, expectedValid: true },
    ],
  },

  // D47 (Q47): Bayes — Trộn sản phẩm hai nhà máy -> biết phế phẩm, tính XS do nhà máy I
  t12_b19_d47_bayes_mixed_lot_defect_sa: {
    id: 't12_b19_d47_bayes_mixed_lot_defect_sa',
    name: 'Công thức Bayes cho lô hàng trộn hai nhà máy (phế phẩm -> nhà máy I, Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức Bayes',
    description:
      'Lô linh kiện có n1 sản phẩm nhà máy I (phế phẩm q1%) và n2 sản phẩm nhà máy II (phế phẩm q2%). Lấy ra 1 phế phẩm, tính xác suất do nhà máy I sản xuất.',
    conditionSummary: 'n1, n2 ∈ [50; 150], q1 ≠ q2, tránh sai lệch làm tròn và biên .xx5',
    paramSpecs: [
      { name: 'n1', label: 'Số sản phẩm nhà máy I', min: 60, max: 140 },
      { name: 'n2', label: 'Số sản phẩm nhà máy II', min: 55, max: 135 },
      { name: 'q1Pct', label: 'Tỉ lệ phế phẩm NM I (%)', min: 2, max: 10 },
      { name: 'q2Pct', label: 'Tỉ lệ phế phẩm NM II (%)', min: 1, max: 9 },
    ],
    validateCode: `
      const { n1, n2, q1Pct, q2Pct } = params;
      if (q1Pct === q2Pct) return { valid: false, reason: 'Hai tỉ lệ phế phẩm bằng nhau' };
      const tot = n1 + n2;
      const pF = (n1 * q1Pct + n2 * q2Pct) / (tot * 100);
      const ansExact = (n1 * q1Pct) / (n1 * q1Pct + n2 * q2Pct);
      const pFRound4 = Math.round(pF * 10000) / 10000;
      const ansViaRound4 = ((n1 / tot) * (q1Pct / 100)) / pFRound4;
      if (Math.round(ansExact * 100) !== Math.round(ansViaRound4 * 100)) {
        return { valid: false, reason: 'Tránh lệch 0,01 khi làm tròn P(F) đến 4 chữ số' };
      }
      if (Math.abs(((ansExact * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, q1Pct, q2Pct } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const tot = n1 + n2;
      const pI = u.simplifyFrac(n1, tot);
      const pII = u.simplifyFrac(n2, tot);
      const c1 = q1Pct / 100, c2 = q2Pct / 100;
      const pF = (n1 * c1 + n2 * c2) / tot;
      const ansFrac = u.simplifyFrac(n1 * q1Pct, n1 * q1Pct + n2 * q2Pct);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một loại linh kiện do hai nhà máy $I$ và $II$ cùng sản xuất. Tỉ lệ phế phẩm của các nhà máy $I$, $II$ lần lượt là $' +
          q1Pct +
          '\\%$ và $' +
          q2Pct +
          '\\%$. Trong một lô linh kiện có $' +
          n1 +
          '$ sản phẩm của nhà máy $I$ và $' +
          n2 +
          '$ sản phẩm của nhà máy $II$ được trộn lẫn với nhau. Một khách hàng lấy ngẫu nhiên một linh kiện từ lô hàng đó. Biết linh kiện lấy ra là phế phẩm. Tính xác suất để linh kiện đó được sản xuất bởi nhà máy $I$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $I, II$ là biến cố linh kiện do nhà máy $I, II$ sản xuất; $F$ là biến cố linh kiện là phế phẩm. Ta có $P(I) = ' + pI.latex + '$, $P(II) = ' + pII.latex + '$.',
          'Theo công thức toàn phần: $P(F) = ' + pI.latex + '\\cdot ' + fmtDec2(c1) + ' + ' + pII.latex + '\\cdot ' + fmtDec2(c2) + ' \\approx ' + fmtDecClean(pF) + '$.',
          'Theo định lý Bayes: $P(I|F) = \\dfrac{P(I)\\cdot P(F|I)}{P(F)} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai tỉ lệ phế phẩm giống nhau', params: { n1: 100, n2: 90, q1Pct: 3, q2Pct: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47', params: { n1: 117, n2: 95, q1Pct: 4, q2Pct: 1 }, expectedValid: true },
    ],
  },

  // D48 (Q48): Bayes — Câu lạc bộ âm nhạc & biết chơi đàn piano
  t12_b19_d48_bayes_music_club_piano_sa: {
    id: 't12_b19_d48_bayes_music_club_piano_sa',
    name: 'Công thức Bayes trong bài toán câu lạc bộ âm nhạc (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes',
    description:
      'Trường có pA% học sinh tham gia CLB âm nhạc. Trong CLB có q1% biết chơi piano, ngoài CLB có q2% biết chơi piano. Chọn 1 học sinh biết chơi piano, tính XS thuộc CLB.',
    conditionSummary: 'q1 > q2, pA ∈ [20%; 65%], tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pAPct', label: 'Tỉ lệ tham gia CLB (%)', min: 25, max: 60 },
      { name: 'q1Pct', label: 'Biết piano | trong CLB (%)', min: 55, max: 90 },
      { name: 'q2Pct', label: 'Biết piano | ngoài CLB (%)', min: 8, max: 35 },
    ],
    validateCode: `
      const { pAPct, q1Pct, q2Pct } = params;
      if (q2Pct >= q1Pct) return { valid: false, reason: 'Tỉ lệ biết piano trong CLB phải cao hơn ngoài CLB' };
      const pB = (pAPct * q1Pct + (100 - pAPct) * q2Pct) / 10000;
      const ans = ((pAPct * q1Pct) / 10000) / pB;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAPct, q1Pct, q2Pct } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const pA = u.simplifyFrac(pAPct, 100);
      const pAComp = u.simplifyFrac(100 - pAPct, 100);
      const pBA = u.simplifyFrac(q1Pct, 100);
      const pBAComp = u.simplifyFrac(q2Pct, 100);
      const pB = u.simplifyFrac(pAPct * q1Pct + (100 - pAPct) * q2Pct, 10000);
      const ansFrac = u.simplifyFrac(pAPct * q1Pct, pAPct * q1Pct + (100 - pAPct) * q2Pct);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Trường THPT có $' +
          pAPct +
          '\\%$ học sinh tham gia câu lạc bộ âm nhạc, trong số những học sinh đó có $' +
          q1Pct +
          '\\%$ học sinh biết chơi đàn piano. Ngoài ra, trong số học sinh không tham gia câu lạc bộ âm nhạc có $' +
          q2Pct +
          '\\%$ học sinh biết chơi đàn piano. Chọn ngẫu nhiên $1$ học sinh của trường. Giả sử học sinh đó biết chơi đàn piano. Tính xác suất để chọn được học sinh thuộc câu lạc bộ âm nhạc (làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Học sinh thuộc câu lạc bộ âm nhạc", $B$: "Học sinh biết chơi đàn piano". Ta có $P(A) = ' + pA.latex + '$, $P(\\overline{A}) = ' + pAComp.latex + '$, $P(B|A) = ' + pBA.latex + '$, $P(B|\\overline{A}) = ' + pBAComp.latex + '$.',
          'Theo công thức toàn phần: $P(B) = ' + pA.latex + '\\cdot ' + pBA.latex + ' + ' + pAComp.latex + '\\cdot ' + pBAComp.latex + ' = ' + pB.latex + '$.',
          'Theo công thức Bayes: $P(A|B) = \\dfrac{P(A)P(B|A)}{P(B)} = \\dfrac{' + pA.latex + '\\cdot ' + pBA.latex + '}{' + pB.latex + '} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ngoài CLB piano nhiều hơn trong CLB', params: { pAPct: 40, q1Pct: 20, q2Pct: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48', params: { pAPct: 40, q1Pct: 80, q2Pct: 12 }, expectedValid: true },
    ],
  },

  // D49 (Q49): Bayes — Làm 2 bài tập kế tiếp (biết đúng bài 2, tính XS đúng bài 1)
  t12_b19_d49_bayes_two_exercises_sa: {
    id: 't12_b19_d49_bayes_two_exercises_sa',
    name: 'Công thức Bayes cho bài toán làm hai bài tập kế tiếp (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes',
    description:
      'Làm đúng bài 1 xác suất p1; đúng bài 2 nếu đúng bài 1 là p2, nếu sai bài 1 là p3. Biết đúng bài 2, tính xác suất đúng bài 1.',
    conditionSummary: 'p3 < p2, p1 ∈ [0,40; 0,85], tránh biên .xx5',
    paramSpecs: [
      { name: 'p1Int', label: '100*P(đúng bài 1)', min: 45, max: 85 },
      { name: 'p2Int', label: '100*P(đúng bài 2 | đúng bài 1)', min: 55, max: 90 },
      { name: 'p3Int', label: '100*P(đúng bài 2 | sai bài 1)', min: 10, max: 40 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int } = params;
      if (p3Int >= p2Int) return { valid: false, reason: 'Xác suất đúng bài 2 phải cao hơn khi đã làm đúng bài 1' };
      const p1 = p1Int / 100, p1Comp = 1 - p1;
      const p2 = p2Int / 100, p3 = p3Int / 100;
      const pB = p1 * p2 + p1Comp * p3;
      const ans = (p1 * p2) / pB;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, p3Int } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const p1 = p1Int / 100, p1Comp = (100 - p1Int) / 100;
      const p2 = p2Int / 100, p3 = p3Int / 100;
      const pB = p1 * p2 + p1Comp * p3;
      const ans = (p1 * p2) / pB;
      const ansR = round2(ans);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Bạn Trang làm hai bài tập kế tiếp. Xác suất Trang làm đúng bài thứ nhất là $' +
          fmtDec2(p1) +
          '$. Nếu Trang làm đúng bài thứ nhất thì xác suất làm đúng bài thứ hai là $' +
          fmtDec2(p2) +
          '$, nhưng nếu làm sai bài thứ nhất thì xác suất làm đúng bài thứ hai là $' +
          fmtDec2(p3) +
          '$. Tính xác suất để Trang làm đúng bài thứ nhất biết rằng Trang làm đúng bài thứ hai (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Trang làm đúng bài thứ nhất", $B$: "Trang làm đúng bài thứ hai". Ta có $P(A) = ' + fmtDec2(p1) + '$, $P(\\overline{A}) = ' + fmtDec2(p1Comp) + '$, $P(B|A) = ' + fmtDec2(p2) + '$, $P(B|\\overline{A}) = ' + fmtDec2(p3) + '$.',
          'Xác suất Trang làm đúng bài thứ hai là $P(B) = ' + fmtDec2(p1) + '\\cdot ' + fmtDec2(p2) + ' + ' + fmtDec2(p1Comp) + '\\cdot ' + fmtDec2(p3) + ' = ' + fmtDecClean(pB) + '$.',
          'Theo công thức Bayes: $P(A|B) = \\dfrac{' + fmtDec2(p1) + '\\cdot ' + fmtDec2(p2) + '}{' + fmtDecClean(pB) + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p3 >= p2', params: { p1Int: 70, p2Int: 30, p3Int: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49', params: { p1Int: 72, p2Int: 75, p3Int: 13 }, expectedValid: true },
    ],
  },

  // D50 (Q50): Bayes — Xạ thủ bắn hai viên đạn vào bia (biết viên 2 trúng, tính XS viên 1 trúng)
  t12_b19_d50_bayes_archer_two_shots_sa: {
    id: 't12_b19_d50_bayes_archer_two_shots_sa',
    name: 'Công thức Bayes cho bài toán xạ thủ bắn hai viên đạn (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes',
    description:
      'Viên 1 trúng với xác suất p1; viên 2 trúng với xác suất p2 (nếu viên 1 trúng) hoặc p3 (nếu viên 1 trượt). Biết viên 2 trúng, tính xác suất viên 1 trúng.',
    conditionSummary: 'p3 < p2, p1 ∈ [0,45; 0,90], tránh biên .xx5',
    paramSpecs: [
      { name: 'p1Int', label: '100*P(viên 1 trúng)', min: 50, max: 88 },
      { name: 'p2Int', label: '100*P(viên 2 | viên 1 trúng)', min: 60, max: 92 },
      { name: 'p3Int', label: '100*P(viên 2 | viên 1 trượt)', min: 10, max: 45 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int } = params;
      if (p3Int >= p2Int) return { valid: false, reason: 'Xác suất trúng viên 2 khi viên 1 trúng phải cao hơn' };
      const p1 = p1Int / 100, p1Comp = 1 - p1;
      const p2 = p2Int / 100, p3 = p3Int / 100;
      const pB = p1 * p2 + p1Comp * p3;
      const ans = (p1 * p2) / pB;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, p3Int } = params;
      ` + PROB19_SA_HELPERS + String.raw`
      const p1 = p1Int / 100, p1Comp = (100 - p1Int) / 100;
      const p2 = p2Int / 100, p3 = p3Int / 100;
      const pB = p1 * p2 + p1Comp * p3;
      const ans = (p1 * p2) / pB;
      const ansR = round2(ans);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một xạ thủ bắn hai viên đạn vào một bia. Xác suất bắn viên thứ nhất trúng là $' +
          fmtDecClean(p1) +
          '$. Nếu bắn trúng viên thứ nhất thì xác suất bắn trúng viên thứ hai là $' +
          fmtDec2(p2) +
          '$, nhưng nếu bắn trượt viên thứ nhất thì xác suất bắn trúng viên thứ hai là $' +
          fmtDec2(p3) +
          '$. Tính xác suất bắn trúng viên thứ nhất biết rằng viên thứ hai bắn trúng (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "bắn trúng viên thứ nhất", $B$: "bắn trúng viên thứ hai". Ta có $P(A) = ' + fmtDecClean(p1) + '$, $P(\\overline{A}) = ' + fmtDecClean(p1Comp) + '$, $P(B|A) = ' + fmtDec2(p2) + '$, $P(B|\\overline{A}) = ' + fmtDec2(p3) + '$.',
          'Xác suất bắn trúng viên thứ hai là $P(B) = ' + fmtDecClean(p1) + '\\cdot ' + fmtDec2(p2) + ' + ' + fmtDecClean(p1Comp) + '\\cdot ' + fmtDec2(p3) + ' = ' + fmtDecClean(pB) + '$.',
          'Theo công thức Bayes: $P(A|B) = \\dfrac{' + fmtDecClean(p1) + '\\cdot ' + fmtDec2(p2) + '}{' + fmtDecClean(pB) + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p3 >= p2', params: { p1Int: 80, p2Int: 30, p3Int: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50', params: { p1Int: 80, p2Int: 85, p3Int: 17 }, expectedValid: true },
    ],
  },
};
