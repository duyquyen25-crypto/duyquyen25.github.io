import { MathTemplate } from '../types/math';

const PROB19_TF_HELPERS = String.raw`
  const fmtDec2 = (val) => (Math.round(val * 100) / 100).toFixed(2).replace('.', ',');
  const fmtDecClean = (val) => {
    const r = Math.round(val * 1000) / 1000;
    return String(r).replace('.', ',');
  };
  const round2 = (val) => Math.round(val * 100) / 100;
  const round3 = (val) => Math.round(val * 1000) / 1000;
  const clampDec2 = (v) => Math.min(0.98, Math.max(0.02, round2(v)));
`;

const makePartitionSurveyTfTemplate = (cfg: {
  id: string;
  name: string;
  description: string;
  defaults: { pMInt: number; pDMInt: number; pDNInt: number; fA: number; fB: number; fC: number; fD: number; label: string };
  stemFn: string;
  stmtA: string;
  stmtB: string;
  stmtC: string;
  stmtD: string;
}): MathTemplate => ({
  id: cfg.id,
  name: cfg.name,
  category: 'TF',
  level: 'Hiểu',
  topicTag: 'Công thức xác suất toàn phần trong khảo sát tỉ lệ',
  description: cfg.description,
  conditionSummary: 'Các tỉ lệ thuộc [20%; 90%] và tránh ranh giới làm tròn .xx5',
  paramSpecs: [
    { name: 'pMInt', label: 'Tỉ lệ nhóm 1 (%)', min: 35, max: 78 },
    { name: 'pDMInt', label: 'Tỉ lệ đạt ở nhóm 1 (%)', min: 45, max: 90 },
    { name: 'pDNInt', label: 'Tỉ lệ đạt ở nhóm 2 (%)', min: 35, max: 88 },
    { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
    { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
    { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
    { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
  ],
  validateCode: `
    const { pMInt, pDMInt, pDNInt } = params;
    if (pMInt < 20 || pMInt > 85 || pDMInt < 20 || pDMInt > 95 || pDNInt < 20 || pDNInt > 95) {
      return { valid: false, reason: 'Tỉ lệ phần trăm ngoài miền hợp lệ' };
    }
    const pM = pMInt / 100, pN = (100 - pMInt) / 100;
    const pDM = pDMInt / 100, pDN = pDNInt / 100;
    const vB = pDM * pM;
    const vC = (1 - pDN) * pN;
    const vD = vB + pDN * pN;
    for (const v of [vB, vC, vD]) {
      if (Math.abs(((v * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
    }
    return { valid: true };
  `,
  generateCode: String.raw`
    const { pMInt, pDMInt, pDNInt, flagA, flagB, flagC, flagD } = params;
    ` + PROB19_TF_HELPERS + String.raw`
    const pNInt = 100 - pMInt;
    const pNIntShown = flagA === 1 ? pNInt : (pNInt + 17 <= 80 ? pNInt + 17 : pNInt - 13);
    const pM = pMInt / 100, pN = pNInt / 100;
    const pDM = pDMInt / 100, pDN = pDNInt / 100;
    const pNotDN = (100 - pDNInt) / 100;

    const valB = round2(pDM * pM);
    const valBShown = flagB === 1 ? valB : clampDec2(valB + 0.14 > 0.96 ? valB - 0.14 : valB + 0.14);

    const valC = round2(pNotDN * pN);
    const valCShown = flagC === 1 ? valC : clampDec2(valC + 0.21 > 0.96 ? valC - 0.12 : valC + 0.21);

    const valD = round2(pDM * pM + pDN * pN);
    const valDShown = flagD === 1 ? valD : clampDec2(valD - 0.23 >= 0.05 ? valD - 0.23 : valD + 0.19);

    ` + cfg.stemFn + String.raw`

    const tfStatements = [
      { key: 'a', text: ` + cfg.stmtA + String.raw`, isTrue: flagA === 1 },
      { key: 'b', text: ` + cfg.stmtB + String.raw`, isTrue: flagB === 1 },
      { key: 'c', text: ` + cfg.stmtC + String.raw`, isTrue: flagC === 1 },
      { key: 'd', text: ` + cfg.stmtD + String.raw`, isTrue: flagD === 1 },
    ];
    return {
      stem,
      tfStatements,
      answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
      solutionSteps: [
        'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Ta có $P(M) = ' + pMInt + '\\% = ' + fmtDec2(pM) + ' \\Rightarrow P(N) = ' + pNInt + '\\% = ' + fmtDec2(pN) + '$.',
        'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. Áp dụng công thức nhân: $P(DM) = P(D|M)\\cdot P(M) = ' + fmtDec2(pDM) + '\\cdot ' + fmtDec2(pM) + ' \\approx ' + fmtDec2(valB) + '$.',
        'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. Ta có $P(\\overline{D}N) = P(\\overline{D}|N)\\cdot P(N) = ' + fmtDec2(pNotDN) + '\\cdot ' + fmtDec2(pN) + ' \\approx ' + fmtDec2(valC) + '$.',
        'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Áp dụng công thức toàn phần: $P(D) = P(D|M)\\cdot P(M) + P(D|N)\\cdot P(N) = ' + fmtDec2(pDM) + '\\cdot ' + fmtDec2(pM) + ' + ' + fmtDec2(pDN) + '\\cdot ' + fmtDec2(pN) + ' \\approx ' + fmtDec2(valD) + '$.',
      ],
    };
  `,
  boundaryCases: [
    { label: 'Biên tỉ lệ ngoài miền', params: { pMInt: 5, pDMInt: 80, pDNInt: 70, flagA: 1, flagB: 0, flagC: 1, flagD: 1 }, expectedValid: false },
    {
      label: cfg.defaults.label,
      params: {
        pMInt: cfg.defaults.pMInt,
        pDMInt: cfg.defaults.pDMInt,
        pDNInt: cfg.defaults.pDNInt,
        flagA: cfg.defaults.fA,
        flagB: cfg.defaults.fB,
        flagC: cfg.defaults.fC,
        flagD: cfg.defaults.fD,
      },
      expectedValid: true,
    },
  ],
});

export const G12_B19_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D17 (Q17): Cửa hàng bán 2 loại đồ chơi (xe tăng và búp bê)
  t12_b19_d17_toy_store_tf: {
    id: 't12_b19_d17_toy_store_tf',
    name: 'Bài toán cửa hàng bán hai loại đồ chơi cho học sinh nam và nữ (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Xác suất có điều kiện và công thức toàn phần',
    description:
      'Cửa hàng bán n1 xe tăng (p1% nam) và n2 búp bê (p2% nữ), mỗi bé mua 1 loại. Xét 4 mệnh đề về xác suất mua xe tăng, xác suất điều kiện, giao biến cố và số bé nam.',
    conditionSummary: 'n1, n2 là bội của 10 để số lượng bé nam/nữ nguyên; p1, p2 ∈ [40%; 90%]',
    paramSpecs: [
      { name: 'n1', label: 'Số xe tăng đồ chơi', min: 40, max: 120, step: 10 },
      { name: 'n2', label: 'Số búp bê', min: 30, max: 100, step: 10 },
      { name: 'p1Pct', label: 'Tỉ lệ nam mua xe tăng (%)', min: 40, max: 80, step: 10 },
      { name: 'p2Pct', label: 'Tỉ lệ nữ mua búp bê (%)', min: 50, max: 90, step: 10 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { n1, n2, p1Pct, p2Pct } = params;
      if (n1 < 20 || n2 < 20 || p1Pct < 20 || p1Pct > 90 || p2Pct < 20 || p2Pct > 90) {
        return { valid: false, reason: 'Số lượng hoặc tỉ lệ ngoài miền' };
      }
      if ((n1 * p1Pct) % 100 !== 0 || (n2 * p2Pct) % 100 !== 0) {
        return { valid: false, reason: 'Số học sinh nam/nữ mua mỗi loại phải là số nguyên' };
      }
      const total = n1 + n2;
      const pTank = n1 / total;
      const boysTank = (n1 * p1Pct) / 100;
      const pBoysTank = boysTank / total;
      if (Math.abs(((pTank * 100) % 1) - 0.5) < 0.005 || Math.abs(((pBoysTank * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, p1Pct, p2Pct, flagA, flagB, flagC, flagD } = params;
      ` + PROB19_TF_HELPERS + String.raw`
      const total = n1 + n2;
      const pTank = round2(n1 / total);
      const pTankShown = flagA === 1 ? pTank : clampDec2(pTank + 0.15 > 0.96 ? pTank - 0.15 : pTank + 0.15);

      const pGirlTank = round2((100 - p1Pct) / 100);
      const pGirlTankShown = flagB === 1 ? pGirlTank : clampDec2(pGirlTank + 0.21);

      const boysTank = (n1 * p1Pct) / 100;
      const boysDoll = (n2 * (100 - p2Pct)) / 100;
      const pBoyNotDoll = round2(boysTank / total);
      const pBoyNotDollShown = flagC === 1 ? pBoyNotDoll : clampDec2(pBoyNotDoll + 0.11);

      const totalBoys = boysTank + boysDoll;
      const totalBoysShown = flagD === 1 ? totalBoys : totalBoys + 12;

      const tfStatements = [
        {
          key: 'a',
          text: 'Xác suất bé được chọn đã mua xe tăng đồ chơi bằng $' + fmtDec2(pTankShown) + '$.',
          isTrue: flagA === 1,
        },
        {
          key: 'b',
          text: 'Xác suất bé được chọn là nữ, biết rằng bé đó mua xe tăng đồ chơi, bằng $' + fmtDecClean(pGirlTankShown) + '$.',
          isTrue: flagB === 1,
        },
        {
          key: 'c',
          text: 'Xác suất bé được chọn là nam và không mua búp bê bằng $' + fmtDec2(pBoyNotDollShown) + '$.',
          isTrue: flagC === 1,
        },
        {
          key: 'd',
          text: 'Số bé nam mua đồ chơi là $' + totalBoysShown + '$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem:
          'Một cửa hàng đã bán $2$ loại đồ chơi gồm $' +
          n1 +
          '$ xe tăng đồ chơi và $' +
          n2 +
          '$ búp bê cho các bé ở một trường tiểu học. Qua thống kê thấy rằng trong số bé mua xe tăng đồ chơi có $' +
          p1Pct +
          '\\%$ là nam, trong số bé mua búp bê có $' +
          p2Pct +
          '\\%$ là nữ. Biết rằng mỗi bé chỉ mua duy nhất một loại đồ chơi. Chọn ngẫu nhiên một bé đã mua đồ chơi trong trường tiểu học đó. Xét tính đúng - sai của các khẳng định sau (kết quả xác suất làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Tổng số bé là $' + n1 + ' + ' + n2 + ' = ' + total + '$. Xác suất bé mua xe tăng là $P = \\dfrac{' + n1 + '}{' + total + '} \\approx ' + fmtDec2(pTank) + '$.',
          'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. Trong số bé mua xe tăng có $' + p1Pct + '\\%$ nam nên có $' + (100 - p1Pct) + '\\%$ nữ, suy ra $P(\\text{nữ}|\\text{xe tăng}) = ' + fmtDecClean(pGirlTank) + '$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. Bé không mua búp bê tức là mua xe tăng. Số bé nam mua xe tăng là $' + n1 + '\\cdot ' + p1Pct + '\\% = ' + boysTank + '$, suy ra $P = \\dfrac{' + boysTank + '}{' + total + '} \\approx ' + fmtDec2(pBoyNotDoll) + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Số bé nam mua búp bê là $' + n2 + '\\cdot ' + (100 - p2Pct) + '\\% = ' + boysDoll + '$. Vậy tổng số bé nam là $' + boysTank + ' + ' + boysDoll + ' = ' + totalBoys + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên số lẻ không nguyên', params: { n1: 45, n2: 50, p1Pct: 30, p2Pct: 80, flagA: 1, flagB: 1, flagC: 0, flagD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17', params: { n1: 80, n2: 50, p1Pct: 50, p2Pct: 80, flagA: 1, flagB: 1, flagC: 0, flagD: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Sát hạch lái xe
  t12_b19_d18_driving_test_tf: makePartitionSurveyTfTemplate({
    id: 't12_b19_d18_driving_test_tf',
    name: 'Bài toán kỳ sát hạch lái xe (công thức nhân & toàn phần, Đúng/Sai)',
    description: 'Trong kỳ sát hạch lái xe, tỉ lệ nam, tỉ lệ nam đỗ và nữ đỗ được cho theo phần trăm. Xét 4 mệnh đề xác suất toàn phần.',
    defaults: { pMInt: 60, pDMInt: 80, pDNInt: 72, fA: 1, fB: 0, fC: 1, fD: 1, label: 'Mẫu chuẩn Q18' },
    stemFn: `
      const stem = 'Trong một kì sát hạch lái xe có $' + pMInt + '\\\\%$ thí sinh nam. Biết rằng $' + pDMInt + '\\\\%$ thí sinh nam và $' + pDNInt + '\\\\%$ thí sinh nữ đỗ sát hạch kì này. Chọn ngẫu nhiên một thí sinh trong kỳ sát hạch. Xét tính đúng - sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):';
    `,
    stmtA: `'Tỉ lệ chọn được một thí sinh nữ là $' + pNIntShown + '\\\\%$.'`,
    stmtB: `'Xác suất chọn được một thí sinh nam và đỗ sát hạch là $' + fmtDec2(valBShown) + '$.'`,
    stmtC: `'Xác suất chọn được một thí sinh nữ và không đỗ sát hạch là $' + fmtDec2(valCShown) + '$.'`,
    stmtD: `'Xác suất chọn được một thí sinh đỗ sát hạch là $' + fmtDec2(valDShown) + '$.'`,
  }),

  // D19 (Q19): Tuyển dụng công ty
  t12_b19_d19_recruitment_tf: makePartitionSurveyTfTemplate({
    id: 't12_b19_d19_recruitment_tf',
    name: 'Bài toán đợt tuyển dụng nhân sự (công thức toàn phần, Đúng/Sai)',
    description: 'Đợt tuyển dụng gồm ứng viên có kinh nghiệm và chưa có kinh nghiệm với tỉ lệ qua phỏng vấn khác nhau. Xét 4 mệnh đề.',
    defaults: { pMInt: 70, pDMInt: 71, pDNInt: 52, fA: 0, fB: 1, fC: 1, fD: 0, label: 'Mẫu chuẩn Q19' },
    stemFn: `
      const stem = 'Trong một đợt tuyển dụng của công ty, có $' + pMInt + '\\\\%$ ứng viên có kinh nghiệm. Biết rằng $' + pDMInt + '\\\\%$ ứng viên có kinh nghiệm và $' + pDNInt + '\\\\%$ ứng viên chưa có kinh nghiệm vượt qua vòng phỏng vấn. Chọn ngẫu nhiên một ứng viên trong đợt tuyển dụng. Xét tính đúng - sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):';
    `,
    stmtA: `'Tỉ lệ chọn được một ứng viên chưa có kinh nghiệm là $' + pNIntShown + '\\\\%$.'`,
    stmtB: `'Xác suất chọn được một ứng viên có kinh nghiệm và vượt qua phỏng vấn là $' + fmtDec2(valBShown) + '$.'`,
    stmtC: `'Xác suất chọn được một ứng viên chưa có kinh nghiệm và không vượt qua phỏng vấn là $' + fmtDec2(valCShown) + '$.'`,
    stmtD: `'Xác suất chọn được một ứng viên vượt qua phỏng vấn là $' + fmtDec2(valDShown) + '$.'`,
  }),

  // D20 (Q20): Khóa học Kỹ thuật / Kinh tế
  t12_b19_d20_course_exam_tf: makePartitionSurveyTfTemplate({
    id: 't12_b19_d20_course_exam_tf',
    name: 'Bài toán khóa học hai chuyên ngành vượt qua kỳ thi (Đúng/Sai)',
    description: 'Khóa học có hai nhóm sinh viên Kỹ thuật và Kinh tế với tỉ lệ đỗ khác nhau. Xét 4 mệnh đề.',
    defaults: { pMInt: 61, pDMInt: 65, pDNInt: 84, fA: 0, fB: 0, fC: 1, fD: 0, label: 'Mẫu chuẩn Q20' },
    stemFn: `
      const stem = 'Trong một khóa học, có $' + pMInt + '\\\\%$ sinh viên học ngành Kỹ thuật, số còn lại học ngành Kinh tế. Biết rằng $' + pDMInt + '\\\\%$ sinh viên Kỹ thuật và $' + pDNInt + '\\\\%$ sinh viên Kinh tế vượt qua kỳ thi cuối kỳ. Chọn ngẫu nhiên một sinh viên trong khóa học. Xét tính đúng - sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):';
    `,
    stmtA: `'Tỉ lệ sinh viên học ngành Kinh tế là $' + pNIntShown + '\\\\%$.'`,
    stmtB: `'Xác suất chọn được sinh viên Kỹ thuật vượt qua kỳ thi là $' + fmtDec2(valBShown) + '$.'`,
    stmtC: `'Xác suất chọn được sinh viên Kinh tế không vượt qua kỳ thi là $' + fmtDec2(valCShown) + '$.'`,
    stmtD: `'Xác suất chọn được sinh viên vượt qua kỳ thi là $' + fmtDec2(valDShown) + '$.'`,
  }),

  // D21 (Q21): Bảo hiểm y tế
  t12_b19_d21_health_insurance_tf: makePartitionSurveyTfTemplate({
    id: 't12_b19_d21_health_insurance_tf',
    name: 'Bài toán khảo sát bảo hiểm y tế và hỗ trợ chi phí (Đúng/Sai)',
    description: 'Khảo sát người có và không có bảo hiểm y tế cùng tỉ lệ được hỗ trợ chi phí. Xét 4 mệnh đề.',
    defaults: { pMInt: 63, pDMInt: 82, pDNInt: 58, fA: 1, fB: 1, fC: 0, fD: 0, label: 'Mẫu chuẩn Q21' },
    stemFn: `
      const stem = 'Trong một khảo sát, có $' + pMInt + '\\\\%$ người tham gia có bảo hiểm y tế. Biết rằng $' + pDMInt + '\\\\%$ người có bảo hiểm và $' + pDNInt + '\\\\%$ người không có bảo hiểm được hỗ trợ chi phí khám chữa bệnh. Chọn ngẫu nhiên một người từ khảo sát. Xét tính đúng - sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):';
    `,
    stmtA: `'Tỉ lệ người không có bảo hiểm y tế là $' + pNIntShown + '\\\\%$.'`,
    stmtB: `'Xác suất chọn được người có bảo hiểm và được hỗ trợ chi phí là $' + fmtDec2(valBShown) + '$.'`,
    stmtC: `'Xác suất chọn được người không có bảo hiểm và không được hỗ trợ là $' + fmtDec2(valCShown) + '$.'`,
    stmtD: `'Xác suất chọn được người được hỗ trợ là $' + fmtDec2(valDShown) + '$.'`,
  }),

  // D22 (Q22): Sàn thương mại điện tử
  t12_b19_d22_ecommerce_loyalty_tf: makePartitionSurveyTfTemplate({
    id: 't12_b19_d22_ecommerce_loyalty_tf',
    name: 'Bài toán phân tích khách hàng thân thiết sàn TMĐT (Đúng/Sai)',
    description: 'Phân loại khách hàng thân thiết và không thân thiết cùng tỉ lệ quay lại mua hàng. Xét 4 mệnh đề.',
    defaults: { pMInt: 43, pDMInt: 82, pDNInt: 52, fA: 1, fB: 0, fC: 1, fD: 0, label: 'Mẫu chuẩn Q22' },
    stemFn: `
      const stem = 'Trong một sàn thương mại điện tử, có $' + pMInt + '\\\\%$ khách hàng là khách hàng thân thiết. Biết rằng $' + pDMInt + '\\\\%$ khách hàng thân thiết và $' + pDNInt + '\\\\%$ khách hàng không phải là khách hàng thân thiết thường xuyên quay lại mua hàng. Chọn ngẫu nhiên một khách hàng của sàn thương mại điện tử đó. Xét tính đúng - sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):';
    `,
    stmtA: `'Tỉ lệ khách hàng không thân thiết là $' + pNIntShown + '\\\\%$.'`,
    stmtB: `'Xác suất chọn được khách hàng thân thiết và quay lại mua là $' + fmtDec2(valBShown) + '$.'`,
    stmtC: `'Xác suất chọn được khách hàng không thân thiết và không quay lại mua là $' + fmtDec2(valCShown) + '$.'`,
    stmtD: `'Xác suất chọn được khách hàng quay lại mua là $' + fmtDec2(valDShown) + '$.'`,
  }),

  // D23 (Q23): Trang trại trồng 2 loại cây
  t12_b19_d23_farm_yield_tf: makePartitionSurveyTfTemplate({
    id: 't12_b19_d23_farm_yield_tf',
    name: 'Bài toán trang trại trồng hai loại cây và năng suất cao (Đúng/Sai)',
    description: 'Trang trại chia diện tích trồng củ mì và đậu đen với tỉ lệ đạt năng suất cao cho từng loại. Xét 4 mệnh đề.',
    defaults: { pMInt: 60, pDMInt: 75, pDNInt: 75, fA: 0, fB: 1, fC: 0, fD: 1, label: 'Mẫu chuẩn Q23' },
    stemFn: `
      const stem = 'Trong một trang trại trồng $2$ loại cây, có $' + pMInt + '\\\\%$ diện tích trồng củ mì, phần còn lại trồng đậu đen. Biết rằng $' + pDMInt + '\\\\%$ diện tích trồng củ mì và $' + pDNInt + '\\\\%$ diện tích trồng đậu đen cho năng suất cao. Chọn ngẫu nhiên một mảnh đất. Xét tính đúng - sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):';
    `,
    stmtA: `'Tỉ lệ diện tích trồng đậu đen là $' + pNIntShown + '\\\\%$.'`,
    stmtB: `'Xác suất chọn được mảnh trồng củ mì và cho năng suất cao là $' + fmtDec2(valBShown) + '$.'`,
    stmtC: `'Xác suất chọn được mảnh trồng đậu đen và không cho năng suất cao là $' + fmtDec2(valCShown) + '$.'`,
    stmtD: `'Xác suất chọn được mảnh đất cho năng suất cao là $' + fmtDec2(valDShown) + '$.'`,
  }),

  // D24 (Q24): Hai người kiểm tra tờ tiền giả (Bayes + phần bù + hợp)
  t12_b19_d24_counterfeit_check_tf: {
    id: 't12_b19_d24_counterfeit_check_tf',
    name: 'Bài toán hai người kiểm tra tờ tiền giả (hợp biến cố & Bayes, Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân, biến cố hợp và Bayes',
    description:
      'Phương và Lan lần lượt kiểm tra tờ tiền giả với P(A), P(B|A), P(\\overline{B}|\\overline{A}). Xét 4 mệnh đề về P(\\overline{A}), P(\\overline{A}\\overline{B}), P(A \\cup B), và P(A | A \\cup B).',
    conditionSummary: 'Đồng bộ làm tròn P(A ∪ B) và P(A | A ∪ B) theo cả giá trị đúng và trung gian; tránh .xx5',
    paramSpecs: [
      { name: 'pAInt', label: '100*P(Phương phát hiện)', min: 40, max: 80, step: 5 },
      { name: 'pBAInt', label: '100*P(Lan cùng nhận định giả)', min: 40, max: 85 },
      { name: 'pBbarAbarInt', label: '100*P(Lan cùng nhận định thật)', min: 25, max: 75 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { pAInt, pBAInt, pBbarAbarInt } = params;
      if (pAInt < 20 || pAInt > 85 || pBAInt < 20 || pBAInt > 95 || pBbarAbarInt < 15 || pBbarAbarInt > 85) {
        return { valid: false, reason: 'Xác suất ngoài miền hợp lệ' };
      }
      const pA = pAInt / 100;
      const pNotA = 1 - pA;
      const pNotBGivenNotA = pBbarAbarInt / 100;
      const pNotANotBExact = pNotA * pNotBGivenNotA;
      const pNotANotBRound = Math.round(pNotANotBExact * 100) / 100;
      const pUnionExact = 1 - pNotANotBExact;
      const pUnionViaRound = 1 - pNotANotBRound;
      if (Math.round(pUnionExact * 100) !== Math.round(pUnionViaRound * 100)) {
        return { valid: false, reason: 'Tránh lệch 0,01 khi tính P(A ∪ B) qua giá trị làm tròn' };
      }
      const pBayesExact = pA / pUnionExact;
      const pBayesViaRound = pA / pUnionViaRound;
      if (Math.round(pBayesExact * 100) !== Math.round(pBayesViaRound * 100)) {
        return { valid: false, reason: 'Tránh lệch 0,01 ở P(A | A ∪ B)' };
      }
      for (const v of [pNotANotBExact, pUnionExact, pBayesExact]) {
        if (Math.abs(((v * 100) % 1) - 0.5) < 0.005) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAInt, pBAInt, pBbarAbarInt, flagA, flagB, flagC, flagD } = params;
      ` + PROB19_TF_HELPERS + String.raw`
      const pA = pAInt / 100;
      const pNotA = round2(1 - pA);
      const pNotAShown = flagA === 1 ? pNotA : clampDec2(pNotA + 0.17 > 0.95 ? pNotA - 0.15 : pNotA + 0.17);
      const pBA = pBAInt / 100;
      const pNotBNotA = pBbarAbarInt / 100;
      const pNotANotB = round2(pNotA * pNotBNotA);
      const pNotANotBShown = flagB === 1 ? pNotANotB : clampDec2(pNotANotB + 0.2);

      const pUnion = round2(1 - pNotANotB);
      const pUnionShown = flagC === 1 ? pUnion : clampDec2(pUnion - 0.18);

      const pBayes = round2(pA / (1 - pNotA * pNotBNotA));
      const pBayesShown = flagD === 1 ? pBayes : clampDec2(pBayes + 0.05 > 0.98 ? pBayes - 0.08 : pBayes + 0.05);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để bạn Phương không phát hiện ra tờ tiền đó giả là $' + fmtDecClean(pNotAShown) + '$.', isTrue: flagA === 1 },
        { key: 'b', text: 'Xác suất để hai người này đều không phát hiện đây là tờ tiền giả là $' + fmtDec2(pNotANotBShown) + '$.', isTrue: flagB === 1 },
        { key: 'c', text: 'Xác suất để ít nhất một trong hai người này phát hiện ra tờ tiền đó là giả là $' + fmtDec2(pUnionShown) + '$.', isTrue: flagC === 1 },
        { key: 'd', text: 'Biết tờ tiền đó đã bị ít nhất một trong hai người này phát hiện là giả, xác suất để bạn Phương phát hiện ra nó giả là $' + fmtDec2(pBayesShown) + '$.', isTrue: flagD === 1 },
      ];
      return {
        stem:
          'Một tờ tiền giả lần lượt bị hai bạn Phương và Lan kiểm tra. Xác suất để bạn Phương phát hiện ra tờ này giả là $' +
          fmtDecClean(pA) +
          '$. Nếu bạn Phương cho rằng tờ này tiền giả, thì xác suất để bạn Lan cũng nhận định như thế là $' +
          fmtDecClean(pBA) +
          '$. Ngược lại, nếu bạn Phương cho rằng tờ này là tiền thật thì xác suất để bạn Lan cũng nhận định như thế là $' +
          fmtDecClean(pNotBNotA) +
          '$. Xét tính đúng - sai của các khẳng định sau (các kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Gọi $A$: "Phương phát hiện tiền giả", $B$: "Lan phát hiện tiền giả". $P(\\overline{A}) = 1 - ' + fmtDecClean(pA) + ' = ' + fmtDecClean(pNotA) + '$.',
          'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. $P(\\overline{A}\\,\\overline{B}) = P(\\overline{A})\\cdot P(\\overline{B}|\\overline{A}) = ' + fmtDecClean(pNotA) + '\\cdot ' + fmtDecClean(pNotBNotA) + ' \\approx ' + fmtDec2(pNotANotB) + '$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. $P(A \\cup B) = 1 - P(\\overline{A}\\,\\overline{B}) = 1 - ' + fmtDec2(pNotANotB) + ' = ' + fmtDec2(pUnion) + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. $P(A | A \\cup B) = \\dfrac{P(A)}{P(A \\cup B)} = \\dfrac{' + fmtDecClean(pA) + '}{' + fmtDec2(pUnion) + '} \\approx ' + fmtDec2(pBayes) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất không hợp lệ', params: { pAInt: 10, pBAInt: 50, pBbarAbarInt: 30, flagA: 1, flagB: 0, flagC: 1, flagD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24', params: { pAInt: 60, pBAInt: 56, pBbarAbarInt: 39, flagA: 1, flagB: 0, flagC: 1, flagD: 0 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Hai thí nghiệm liên tiếp (toàn phần & Bayes, Đúng/Sai)
  t12_b19_d25_two_experiments_bayes_tf: {
    id: 't12_b19_d25_two_experiments_bayes_tf',
    name: 'Bài toán thực hiện hai thí nghiệm liên tiếp (toàn phần & Bayes, Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Công thức xác suất toàn phần và Bayes',
    description:
      'Thí nghiệm 1 có xác suất thành công p1; thí nghiệm 2 thành công với xác suất p2 (nếu 1 thành công) hoặc p3 (nếu 1 không thành công). Xét 4 mệnh đề.',
    conditionSummary: 'p1, p2, p3 ∈ [0,20; 0,88] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1Int', label: '100*P(TN1 thành công)', min: 30, max: 80 },
      { name: 'p2Int', label: '100*P(TN2 | TN1 đúng)', min: 40, max: 85 },
      { name: 'p3Int', label: '100*P(TN2 | TN1 sai)', min: 20, max: 75 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Int, p2Int, p3Int } = params;
      if (p1Int < 15 || p1Int > 90 || p2Int < 15 || p2Int > 90 || p3Int < 15 || p3Int > 90) {
        return { valid: false, reason: 'Xác suất ngoài miền hợp lệ' };
      }
      const pAB = (p1Int * p2Int) / 10000;
      const pB = pAB + ((100 - p1Int) * p3Int) / 10000;
      const pA_B = pAB / pB;
      for (const v of [pAB, pB, pA_B]) {
        if (Math.abs(((v * 100) % 1) - 0.5) < 0.005) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int, p3Int, flagA, flagB, flagC, flagD } = params;
      ` + PROB19_TF_HELPERS + String.raw`
      const p1 = p1Int / 100, p1Comp = (100 - p1Int) / 100;
      const p2 = p2Int / 100, p3 = p3Int / 100;
      const pABExact = p1 * p2;
      const pBExact = pABExact + p1Comp * p3;
      const pA_BExact = pABExact / pBExact;

      const p1CompShown = flagA === 1 ? round2(p1Comp) : clampDec2(p1Comp + 0.3 > 0.95 ? p1Comp - 0.18 : p1Comp + 0.3);
      const pAB = round2(pABExact);
      const pABShown = flagB === 1 ? pAB : clampDec2(pAB + 0.17);
      const pB = round2(pBExact);
      const pBShown = flagC === 1 ? pB : clampDec2(pB + 0.1 > 0.96 ? pB - 0.14 : pB + 0.1);
      const pA_B = round2(pA_BExact);
      const pA_BShown = flagD === 1 ? pA_B : clampDec2(pA_B - 0.16);

      const tfStatements = [
        { key: 'a', text: 'Xác suất để thí nghiệm thứ nhất không thành công là $' + fmtDecClean(p1CompShown) + '$.', isTrue: flagA === 1 },
        { key: 'b', text: 'Xác suất để thí nghiệm thứ nhất và thí nghiệm thứ hai đều thành công là $' + fmtDec2(pABShown) + '$.', isTrue: flagB === 1 },
        { key: 'c', text: 'Xác suất để thí nghiệm thứ hai thành công là $' + fmtDec2(pBShown) + '$.', isTrue: flagC === 1 },
        { key: 'd', text: 'Biết rằng thí nghiệm thứ hai thành công, xác suất để thí nghiệm thứ nhất thành công là $' + fmtDec2(pA_BShown) + '$.', isTrue: flagD === 1 },
      ];
      return {
        stem:
          'Bạn Hùng phải thực hiện hai thí nghiệm liên tiếp. Thí nghiệm thứ nhất có xác suất thành công là $' +
          fmtDecClean(p1) +
          '$. Nếu thí nghiệm thứ nhất thành công thì xác suất thành công của thí nghiệm thứ hai là $' +
          fmtDecClean(p2) +
          '$. Nếu thí nghiệm thứ nhất không thành công thì xác suất thành công của thí nghiệm thứ hai là $' +
          fmtDecClean(p3) +
          '$. Xét tính đúng - sai của các khẳng định sau (kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Gọi $A$: "TN1 thành công", $B$: "TN2 thành công". $P(\\overline{A}) = 1 - ' + fmtDecClean(p1) + ' = ' + fmtDecClean(p1Comp) + '$.',
          'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. $P(AB) = P(A)\\cdot P(B|A) = ' + fmtDecClean(p1) + '\\cdot ' + fmtDecClean(p2) + ' \\approx ' + fmtDec2(pAB) + '$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. $P(B) = ' + fmtDecClean(p1) + '\\cdot ' + fmtDecClean(p2) + ' + ' + fmtDecClean(p1Comp) + '\\cdot ' + fmtDecClean(p3) + ' \\approx ' + fmtDec2(pB) + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Theo công thức Bayes: $P(A|B) = \\dfrac{P(AB)}{P(B)} = \\dfrac{' + fmtDecClean(p1) + '\\cdot ' + fmtDecClean(p2) + '}{' + fmtDecClean(p1) + '\\cdot ' + fmtDecClean(p2) + ' + ' + fmtDecClean(p1Comp) + '\\cdot ' + fmtDecClean(p3) + '} \\approx ' + fmtDec2(pA_B) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất quá nhỏ', params: { p1Int: 5, p2Int: 60, p3Int: 63, flagA: 0, flagB: 1, flagC: 0, flagD: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25', params: { p1Int: 68, p2Int: 60, p3Int: 63, flagA: 0, flagB: 1, flagC: 0, flagD: 1 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Lớp học chọn ngoại ngữ tiếng Hàn hoặc tiếng Nhật
  t12_b19_d26_language_choice_bayes_tf: {
    id: 't12_b19_d26_language_choice_bayes_tf',
    name: 'Bài toán chọn ngoại ngữ theo giới tính (toàn phần & Bayes, Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Công thức xác suất toàn phần và Bayes',
    description:
      'Lớp có pA% nam; xác suất học tiếng Hàn của nam và nữ lần lượt là p2 và p3. Xét 4 mệnh đề về tỉ lệ nữ, XS nam học tiếng Nhật, XS chung học tiếng Nhật và Bayes.',
    conditionSummary: 'Các xác suất thuộc [0,25; 0,80] và tránh biên .xx5',
    paramSpecs: [
      { name: 'pctBoy', label: 'Tỉ lệ học sinh nam (%)', min: 35, max: 72 },
      { name: 'pKorBoyInt', label: '100*P(Hàn | Nam)', min: 30, max: 78 },
      { name: 'pKorGirlInt', label: '100*P(Hàn | Nữ)', min: 30, max: 78 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { pctBoy, pKorBoyInt, pKorGirlInt } = params;
      if (pctBoy < 20 || pctBoy > 80 || pKorBoyInt < 20 || pKorBoyInt > 85 || pKorGirlInt < 20 || pKorGirlInt > 85) {
        return { valid: false, reason: 'Xác suất ngoài miền hợp lệ' };
      }
      const pA = pctBoy / 100, pNotA = 1 - pA;
      const pB_A = pKorBoyInt / 100, pB_NotA = pKorGirlInt / 100;
      const pNotB = pA * (1 - pB_A) + pNotA * (1 - pB_NotA);
      const pA_B = (pA * pB_A) / (pA * pB_A + pNotA * pB_NotA);
      for (const v of [pNotB, pA_B]) {
        if (Math.abs(((v * 100) % 1) - 0.5) < 0.005) {
          return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pctBoy, pKorBoyInt, pKorGirlInt, flagA, flagB, flagC, flagD } = params;
      ` + PROB19_TF_HELPERS + String.raw`
      const pA = pctBoy / 100;
      const pNotA = round2(1 - pA);
      const pBA = pKorBoyInt / 100;
      const pBNotA = pKorGirlInt / 100;
      const pNotB_A = round2(1 - pBA);
      const pNotB_NotA = round2(1 - pBNotA);
      const pNotB = round2(pA * pNotB_A + pNotA * pNotB_NotA);
      const pA_B = round2((pA * pBA) / (pA * pBA + pNotA * pBNotA));

      const pNotAShown = flagA === 1 ? pNotA : clampDec2(pNotA + 0.15 > 0.95 ? pNotA - 0.15 : pNotA + 0.15);
      const pNotB_AShown = flagB === 1 ? pNotB_A : clampDec2(pNotB_A + 0.3 > 0.95 ? pNotB_A - 0.22 : pNotB_A + 0.3);
      const pNotBShown = flagC === 1 ? pNotB : clampDec2(pNotB + 0.14);
      const pA_BShown = flagD === 1 ? pA_B : clampDec2(pA_B + 0.1 > 0.95 ? pA_B - 0.15 : pA_B + 0.1);

      const tfStatements = [
        { key: 'a', text: 'Xác suất chọn được học sinh nữ là $' + fmtDecClean(pNotAShown) + '$.', isTrue: flagA === 1 },
        { key: 'b', text: 'Biết rằng chọn được học sinh nam, xác suất để học sinh đó học tiếng Nhật là $' + fmtDecClean(pNotB_AShown) + '$.', isTrue: flagB === 1 },
        { key: 'c', text: 'Xác suất để học sinh được chọn học tiếng Nhật là $' + fmtDec2(pNotBShown) + '$.', isTrue: flagC === 1 },
        { key: 'd', text: 'Biết rằng học sinh được chọn học tiếng Hàn Quốc, xác suất để học sinh đó là nam là $' + fmtDecClean(pA_BShown) + '$.', isTrue: flagD === 1 },
      ];
      return {
        stem:
          'Trong một lớp học có $' +
          pctBoy +
          '\\%$ là học sinh nam. Mỗi học sinh trong lớp đều lựa chọn học ngoại ngữ là tiếng Hàn Quốc hoặc tiếng Nhật. Xác suất học tiếng Hàn Quốc của mỗi bạn học sinh nam là $' +
          fmtDecClean(pBA) +
          '$, của mỗi bạn học sinh nữ là $' +
          fmtDecClean(pBNotA) +
          '$. Chọn ngẫu nhiên một bạn học sinh của lớp. Xét tính đúng - sai của các khẳng định sau (kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Gọi $A$: "Học sinh là nam", $B$: "Học sinh học tiếng Hàn". $P(\\overline{A}) = 1 - ' + fmtDecClean(pA) + ' = ' + fmtDecClean(pNotA) + '$.',
          'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. $P(\\overline{B}|A) = 1 - ' + fmtDecClean(pBA) + ' = ' + fmtDecClean(pNotB_A) + '$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. $P(\\overline{B}) = ' + fmtDecClean(pA) + '\\cdot ' + fmtDecClean(pNotB_A) + ' + ' + fmtDecClean(pNotA) + '\\cdot ' + fmtDecClean(pNotB_NotA) + ' \\approx ' + fmtDec2(pNotB) + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. $P(A|B) = \\dfrac{' + fmtDecClean(pA) + '\\cdot ' + fmtDecClean(pBA) + '}{' + fmtDecClean(pA) + '\\cdot ' + fmtDecClean(pBA) + ' + ' + fmtDecClean(pNotA) + '\\cdot ' + fmtDecClean(pBNotA) + '} \\approx ' + fmtDecClean(pA_B) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn .xx5', params: { pctBoy: 50, pKorBoyInt: 51, pKorGirlInt: 50, flagA: 1, flagB: 0, flagC: 1, flagD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26', params: { pctBoy: 59, pKorBoyInt: 58, pKorGirlInt: 56, flagA: 1, flagB: 0, flagC: 1, flagD: 0 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Hai phác đồ điều trị A và B (khỏi bệnh & tác dụng phụ độc lập trong mỗi phác đồ)
  t12_b19_d27_treatment_protocols_tf: {
    id: 't12_b19_d27_treatment_protocols_tf',
    name: 'Bài toán hai phác đồ điều trị độc lập thành phần (Bayes & toàn phần, Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức xác suất toàn phần và Bayes',
    description:
      'Hai phác đồ A và B chọn đồng xác suất 50%, biết tỉ lệ khỏi bệnh và tỉ lệ tác dụng phụ nghiêm trọng độc lập trong từng phác đồ. Xét 4 mệnh đề.',
    conditionSummary: 'pKA, pKB ∈ [40%; 80%], pTA, pTB ∈ [4%; 20%], pTA + pTB chẵn để P(T) tròn 2 chữ số',
    paramSpecs: [
      { name: 'pKA', label: 'Tỉ lệ khỏi bệnh phác đồ A (%)', min: 45, max: 78 },
      { name: 'pTA', label: 'Tác dụng phụ phác đồ A (%)', min: 6, max: 18 },
      { name: 'pKB', label: 'Tỉ lệ khỏi bệnh phác đồ B (%)', min: 45, max: 80 },
      { name: 'pTB', label: 'Tác dụng phụ phác đồ B (%)', min: 4, max: 16 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { pKA, pTA, pKB, pTB } = params;
      if (pKA < 30 || pKA > 90 || pKB < 30 || pKB > 90 || pTA < 2 || pTA > 25 || pTB < 2 || pTB > 25) {
        return { valid: false, reason: 'Tỉ lệ ngoài miền hợp lệ' };
      }
      if ((pTA + pTB) % 2 !== 0) {
        return { valid: false, reason: 'Chọn pTA + pTB chẵn để P(T) đẹp đúng 2 chữ số thập phân' };
      }
      const pNoSideCure = 0.5 * (pKA / 100) * (1 - pTA / 100) + 0.5 * (pKB / 100) * (1 - pTB / 100);
      if (Math.abs(((pNoSideCure * 1000) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần nghìn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pKA, pTA, pKB, pTB, flagA, flagB, flagC, flagD } = params;
      ` + PROB19_TF_HELPERS + String.raw`
      const pT = (pTA + pTB) / 200;
      const pB_T = pTB / (pTA + pTB);
      const thresh = flagA === 1 ? round2(pB_T - 0.025) : round2(pB_T + 0.05);

      const pKNotT = round3(0.5 * (pKA / 100) * (1 - pTA / 100) + 0.5 * (pKB / 100) * (1 - pTB / 100));
      const pKNotTShown = flagB === 1 ? pKNotT : round3(pKNotT - 0.045);

      const pTShown = flagC === 1 ? pT : clampDec2(pT + 0.06);

      const pAK = round3(0.5 * (pKA / 100));
      const pAKShown = flagD === 1 ? pAK : round3(pKA / 100);

      const fmt3 = (v) => String(round3(v)).replace('.', ',');

      const tfStatements = [
        {
          key: 'a',
          text: 'Nếu biết bệnh nhân này gặp tác dụng phụ nghiêm trọng thì xác suất bệnh nhân đã được điều trị bằng phác đồ $B$ lớn hơn $' + fmtDec2(thresh) + '$.',
          isTrue: flagA === 1,
        },
        {
          key: 'b',
          text: 'Xác suất bệnh nhân khỏi bệnh và không bị tác dụng phụ nghiêm trọng là $' + fmt3(pKNotTShown) + '$.',
          isTrue: flagB === 1,
        },
        {
          key: 'c',
          text: 'Xác suất để bệnh nhân bị tác dụng phụ nghiêm trọng là $' + fmtDecClean(pTShown) + '$.',
          isTrue: flagC === 1,
        },
        {
          key: 'd',
          text: 'Xác suất bệnh nhân điều trị bằng phác đồ $A$ và được chữa khỏi bệnh là $' + fmtDecClean(pAKShown) + '$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem:
          'Có hai phác đồ điều trị $A$ và $B$ cho một loại bệnh. Phác đồ $A$ có xác suất chữa khỏi bệnh là $' +
          pKA +
          '\\%$ và xác suất gây tác dụng phụ nghiêm trọng là $' +
          pTA +
          '\\%$. Phác đồ $B$ có xác suất chữa khỏi bệnh là $' +
          pKB +
          '\\%$ và xác suất gây tác dụng phụ nghiêm trọng là $' +
          pTB +
          '\\%$. Một bệnh nhân được điều trị ngẫu nhiên bằng một trong hai phác đồ, xác suất chọn mỗi phác đồ là $50\\%$. Biết rằng trong mỗi phác đồ điều trị thì biến cố “bệnh nhân được chữa khỏi bệnh” và biến cố “bệnh nhân không bị tác dụng phụ nghiêm trọng” là độc lập với nhau. Xét tính đúng - sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. Gọi $T$: "gặp tác dụng phụ nghiêm trọng". $P(T) = 0,5\\cdot ' + fmtDecClean(pTA / 100) + ' + 0,5\\cdot ' + fmtDecClean(pTB / 100) + ' = ' + fmtDecClean(pT) + '$.',
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Theo Bayes: $P(B|T) = \\dfrac{0,5\\cdot ' + fmtDecClean(pTB / 100) + '}{' + fmtDecClean(pT) + '} \\approx ' + fmt3(pB_T) + '$ (' + (flagA === 1 ? '$>$ ' : '$<$ ') + '$' + fmtDec2(thresh) + '$).',
          'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. Do độc lập trong từng phác đồ: $P(K \\cap \\overline{T}) = 0,5\\cdot ' + fmtDecClean(pKA / 100) + '\\cdot ' + fmtDecClean(1 - pTA / 100) + ' + 0,5\\cdot ' + fmtDecClean(pKB / 100) + '\\cdot ' + fmtDecClean(1 - pTB / 100) + ' \\approx ' + fmt3(pKNotT) + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. $P(A \\cap K) = P(A)\\cdot P(K|A) = 0,5\\cdot ' + fmtDecClean(pKA / 100) + ' = ' + fmtDecClean(pAK) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pTA + pTB lẻ', params: { pKA: 56, pTA: 11, pKB: 58, pTB: 8, flagA: 1, flagB: 1, flagC: 1, flagD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27', params: { pKA: 56, pTA: 10, pKB: 58, pTB: 8, flagA: 1, flagB: 1, flagC: 1, flagD: 0 }, expectedValid: true },
    ],
  },
};
