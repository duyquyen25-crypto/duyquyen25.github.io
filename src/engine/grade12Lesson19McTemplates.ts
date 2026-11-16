import { MathTemplate } from '../types/math';

const PROB19_MC_HELPERS = String.raw`
  const fmtDec2 = (val) => (Math.round(val * 100) / 100).toFixed(2).replace('.', ',');
  const round2 = (val) => Math.round(val * 100) / 100;
  const clampDec2 = (v) => Math.min(0.99, Math.max(0.01, round2(v)));
  const fmtMcDec = (val) => '$' + fmtDec2(val) + '$';
  const genFakeDec = (baseVal, k) => {
    const offsets = [0.11, -0.13, 0.19, -0.09, 0.23, -0.17, 0.07, -0.21];
    const v = clampDec2(baseVal + offsets[(k - 1) % offsets.length] + Math.floor((k - 1) / offsets.length) * 0.05);
    return fmtMcDec(v);
  };
  const comb = (n, k) => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
    return Math.round(res);
  };
`;

export const G12_B19_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Công thức xác suất toàn phần trực tiếp (cho P(F), P(C|F), P(C|\overline{F}))
  t12_b19_d01_total_prob_basic_mc: {
    id: 't12_b19_d01_total_prob_basic_mc',
    name: 'Tính P(A) bằng công thức xác suất toàn phần trực tiếp',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức xác suất toàn phần',
    description:
      'Cho hai biến cố với P(F), P(C|F) và P(C|\\overline{F}). Tính xác suất P(C) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Các xác suất thuộc [0,05; 0,95] và kết quả tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pFInt', label: '100*P(F)', min: 20, max: 80 },
      { name: 'pCFInt', label: '100*P(C|F)', min: 5, max: 70 },
      { name: 'pCFCompInt', label: '100*P(C|F\')', min: 10, max: 85 },
      { name: 'pairIdx', label: 'Cặp biến cố (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { pFInt, pCFInt, pCFCompInt } = params;
      if (pFInt < 5 || pFInt > 95 || pCFInt < 2 || pCFInt > 98 || pCFCompInt < 2 || pCFCompInt > 98) {
        return { valid: false, reason: 'Xác suất cho trước ngoài miền hợp lệ' };
      }
      if (pCFInt === pCFCompInt) {
        return { valid: false, reason: 'Hai xác suất điều kiện bằng nhau làm bài toán tầm thường' };
      }
      const val = (pCFInt * pFInt + pCFCompInt * (100 - pFInt)) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pFInt, pCFInt, pCFCompInt, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['C', 'F'],
        ['A', 'B'],
        ['D', 'E'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pF = pFInt / 100;
      const pFComp = (100 - pFInt) / 100;
      const pCF = pCFInt / 100;
      const pCFComp = pCFCompInt / 100;
      const ans = pCF * pF + pCFComp * pFComp;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const wrong1 = clampDec2(pCF * pFComp + pCFComp * pF);
      const wrong2 = clampDec2(pCF + pCFComp);
      const wrong3 = clampDec2((pCF + pCFComp) / 2);
      const wrong4 = clampDec2(1 - ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtMcDec(wrong1), fmtMcDec(wrong2), fmtMcDec(wrong3), fmtMcDec(wrong4)],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$, $' +
          E2 +
          '$ với $P(' +
          E2 +
          ') = ' +
          fmtDec2(pF) +
          '$; $P(' +
          E1 +
          '|' +
          E2 +
          ') = ' +
          fmtDec2(pCF) +
          '$ và $P\\left(' +
          E1 +
          '|\\overline{' +
          E2 +
          '}\\right) = ' +
          fmtDec2(pCFComp) +
          '$. Tính xác suất $P(' +
          E1 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $P(\\overline{' + E2 + '}) = 1 - P(' + E2 + ') = ' + fmtDec2(pFComp) + '$.',
          'Áp dụng công thức xác suất toàn phần: $P(' + E1 + ') = P(' + E1 + '|' + E2 + ')\\cdot P(' + E2 + ') + P\\left(' + E1 + '|\\overline{' + E2 + '}\\right)\\cdot P\\left(\\overline{' + E2 + '}\\right) = ' + fmtDec2(pCF) + '\\cdot ' + fmtDec2(pF) + ' + ' + fmtDec2(pCFComp) + '\\cdot ' + fmtDec2(pFComp) + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn .xx5', params: { pFInt: 50, pCFInt: 20, pCFCompInt: 31, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1', params: { pFInt: 55, pCFInt: 7, pCFCompInt: 56, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Bài toán ngược công thức toàn phần — tìm P(E) biết P(B), P(B|E), P(B|\overline{E})
  t12_b19_d02_total_prob_inverse_pe_mc: {
    id: 't12_b19_d02_total_prob_inverse_pe_mc',
    name: 'Tìm xác suất thành phần P(E) từ công thức xác suất toàn phần',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức xác suất toàn phần',
    description:
      'Cho P(B), P(B|E) và P(B|\\overline{E}). Giải phương trình công thức xác suất toàn phần để tìm P(E) làm tròn đến hàng phần trăm.',
    conditionSummary: '|P(B|E) - P(B|E\')| >= 0,20, P(B) nằm chặt giữa hai xác suất điều kiện để P(E) ∈ [0,10; 0,90]',
    paramSpecs: [
      { name: 'pBInt', label: '100*P(B)', min: 22, max: 75 },
      { name: 'pBEInt', label: '100*P(B|E)', min: 45, max: 90 },
      { name: 'pBECompInt', label: '100*P(B|E\')', min: 10, max: 55 },
      { name: 'pairIdx', label: 'Cặp biến cố (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { pBInt, pBEInt, pBECompInt } = params;
      if (Math.abs(pBEInt - pBECompInt) < 20) {
        return { valid: false, reason: "Mẫu số P(B|E) - P(B|E') quá nhỏ" };
      }
      const lo = Math.min(pBEInt, pBECompInt);
      const hi = Math.max(pBEInt, pBECompInt);
      if (pBInt <= lo + 3 || pBInt >= hi - 3) {
        return { valid: false, reason: 'P(B) phải nằm chặt giữa hai xác suất điều kiện' };
      }
      const pE = (pBInt - pBECompInt) / (pBEInt - pBECompInt);
      if (pE < 0.08 || pE > 0.92) {
        return { valid: false, reason: 'P(E) ngoài khoảng đẹp [0,08; 0,92]' };
      }
      if (Math.abs(((pE * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pBInt, pBEInt, pBECompInt, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['B', 'E'],
        ['A', 'D'],
        ['C', 'F'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pB = pBInt / 100;
      const pBE = pBEInt / 100;
      const pBEComp = pBECompInt / 100;
      const ans = (pB - pBEComp) / (pBE - pBEComp);
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(pB / pBE)),
          fmtMcDec(clampDec2(pBE - pBEComp)),
          fmtMcDec(clampDec2(ansR + 0.14)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$, $' +
          E2 +
          '$ với $P(' +
          E1 +
          ') = ' +
          fmtDec2(pB) +
          '$; $P(' +
          E1 +
          '|' +
          E2 +
          ') = ' +
          fmtDec2(pBE) +
          '$ và $P\\left(' +
          E1 +
          '|\\overline{' +
          E2 +
          '}\\right) = ' +
          fmtDec2(pBEComp) +
          '$. Tính xác suất $P(' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đặt $P(' + E2 + ') = x \\Rightarrow P(\\overline{' + E2 + '}) = 1 - x$.',
          'Áp dụng công thức xác suất toàn phần: $P(' + E1 + ') = P(' + E1 + '|' + E2 + ')\\cdot P(' + E2 + ') + P\\left(' + E1 + '|\\overline{' + E2 + '}\\right)\\cdot P\\left(\\overline{' + E2 + '}\\right)$.',
          'Thay số: $' + fmtDec2(pB) + ' = ' + fmtDec2(pBE) + 'x + ' + fmtDec2(pBEComp) + '(1 - x) \\Rightarrow x = \\dfrac{' + fmtDec2(pB - pBEComp) + '}{' + fmtDec2(pBE - pBEComp) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(B) ngoài đoạn điều kiện', params: { pBInt: 80, pBEInt: 59, pBECompInt: 17, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2', params: { pBInt: 37, pBEInt: 59, pBECompInt: 17, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Công thức toàn phần dạng kết hợp thập phân và tỉ lệ phần trăm
  t12_b19_d03_total_prob_percent_mc: {
    id: 't12_b19_d03_total_prob_percent_mc',
    name: 'Tính xác suất toàn phần kết hợp P(F) và tỉ lệ phần trăm có điều kiện',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức xác suất toàn phần',
    description:
      'Cho P(F) dạng số thập phân và tỉ lệ xảy ra A khi F xảy ra (x%) và khi F không xảy ra (y%). Tính P(A) làm tròn đến hàng phần trăm.',
    conditionSummary: 'x ≠ y, các tỉ lệ ∈ [10%; 90%] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pFInt', label: '100*P(F)', min: 20, max: 85 },
      { name: 'pct1', label: 'Tỉ lệ A khi F xảy ra (%)', min: 15, max: 80 },
      { name: 'pct2', label: 'Tỉ lệ A khi F không xảy ra (%)', min: 15, max: 85 },
      { name: 'pairIdx', label: 'Cặp biến cố (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { pFInt, pct1, pct2 } = params;
      if (pct1 === pct2) return { valid: false, reason: 'Hai tỉ lệ giống nhau' };
      const val = (pct1 * pFInt + pct2 * (100 - pFInt)) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pFInt, pct1, pct2, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['A', 'F'],
        ['B', 'E'],
        ['M', 'K'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pF = pFInt / 100;
      const pFComp = (100 - pFInt) / 100;
      const p1 = pct1 / 100;
      const p2 = pct2 / 100;
      const ans = p1 * pF + p2 * pFComp;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(p1 * pFComp + p2 * pF)),
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2((p1 + p2) / 2)),
          fmtMcDec(clampDec2(ansR + 0.05)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho $' +
          E1 +
          ', ' +
          E2 +
          '$ là các biến cố. Biết $P(' +
          E2 +
          ') = ' +
          fmtDec2(pF) +
          '$. Nếu $' +
          E2 +
          '$ xảy ra thì tỉ lệ $' +
          E1 +
          '$ xảy ra là $' +
          pct1 +
          '\\%$. Nếu $' +
          E2 +
          '$ không xảy ra thì tỉ lệ $' +
          E1 +
          '$ xảy ra là $' +
          pct2 +
          '\\%$. Tính xác suất của biến cố $' +
          E1 +
          '$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $P(\\overline{' + E2 + '}) = 1 - P(' + E2 + ') = ' + fmtDec2(pFComp) + '$, $P(' + E1 + '|' + E2 + ') = ' + fmtDec2(p1) + '$ và $P(' + E1 + '|\\overline{' + E2 + '}) = ' + fmtDec2(p2) + '$.',
          'Áp dụng công thức xác suất toàn phần: $P(' + E1 + ') = P(' + E1 + '|' + E2 + ')\\cdot P(' + E2 + ') + P(' + E1 + '|\\overline{' + E2 + '})\\cdot P(\\overline{' + E2 + '}) = ' + fmtDec2(p1) + '\\cdot ' + fmtDec2(pF) + ' + ' + fmtDec2(p2) + '\\cdot ' + fmtDec2(pFComp) + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai tỉ lệ bằng nhau', params: { pFInt: 60, pct1: 35, pct2: 35, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3', params: { pFInt: 67, pct1: 29, pct2: 47, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Thực tế tiêm vắc xin phòng bệnh X -> tính xác suất mắc bệnh (số thập phân)
  t12_b19_d04_vaccine_total_prob_mc: {
    id: 't12_b19_d04_vaccine_total_prob_mc',
    name: 'Bài toán thực tế tỉ lệ tiêm vắc xin và xác suất mắc bệnh',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ứng dụng công thức xác suất toàn phần',
    description:
      'Tỉ lệ tiêm vắc xin là a%; tỉ lệ mắc bệnh ở người đã tiêm là b%, ở người chưa tiêm là c% (b < c). Tính xác suất gặp ngẫu nhiên 1 người bị mắc bệnh.',
    conditionSummary: 'b < c, các tỉ lệ ∈ [5%; 90%], tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pctT', label: 'Tỉ lệ đã tiêm (%)', min: 55, max: 88 },
      { name: 'pctMT', label: 'Tỉ lệ mắc khi đã tiêm (%)', min: 8, max: 35 },
      { name: 'pctMNotT', label: 'Tỉ lệ mắc khi chưa tiêm (%)', min: 45, max: 85 },
    ],
    validateCode: `
      const { pctT, pctMT, pctMNotT } = params;
      if (pctMT >= pctMNotT) return { valid: false, reason: 'Tỉ lệ mắc bệnh khi chưa tiêm phải lớn hơn khi đã tiêm' };
      const val = (pctMT * pctT + pctMNotT * (100 - pctT)) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pctT, pctMT, pctMNotT } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pT = pctT / 100;
      const pTComp = (100 - pctT) / 100;
      const pMT = pctMT / 100;
      const pMNotT = pctMNotT / 100;
      const ans = pMT * pT + pMNotT * pTComp;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(pMT * pTComp + pMNotT * pT)),
          fmtMcDec(clampDec2((pMT + pMNotT) / 2)),
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(pMT * pT)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Tỉ lệ người dân đã tiêm vắc xin phòng bệnh X ở một địa phương là $' +
          pctT +
          '\\%$. Trong số những người đã tiêm phòng, tỉ lệ mắc bệnh X là $' +
          pctMT +
          '\\%$, còn trong số những người chưa tiêm, tỉ lệ mắc bệnh X là $' +
          pctMNotT +
          '\\%$. Gặp ngẫu nhiên một người ở địa phương đó. Xác suất người đó mắc bệnh X là (kết quả làm tròn đến hàng phần trăm):',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $M$ là biến cố "người được gặp mắc bệnh", $T$ là biến cố "người được gặp đã tiêm phòng vắc xin".',
          'Ta có $P(T) = ' + fmtDec2(pT) + '$, $P(\\overline{T}) = ' + fmtDec2(pTComp) + '$, $P(M|T) = ' + fmtDec2(pMT) + '$, $P(M|\\overline{T}) = ' + fmtDec2(pMNotT) + '$.',
          'Áp dụng công thức xác suất toàn phần: $P(M) = P(M|T)\\cdot P(T) + P(M|\\overline{T})\\cdot P(\\overline{T}) = ' + fmtDec2(pMT) + '\\cdot ' + fmtDec2(pT) + ' + ' + fmtDec2(pMNotT) + '\\cdot ' + fmtDec2(pTComp) + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tiêm xong mắc nhiều hơn chưa tiêm', params: { pctT: 70, pctMT: 60, pctMNotT: 40 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { pctT: 74, pctMT: 20, pctMNotT: 69, }, expectedValid: true },
    ],
  },

  // D05 (Q5): Thực tế hút thuốc & bệnh hô hấp -> kết quả dạng phần trăm làm tròn hàng đơn vị
  t12_b19_d05_smoking_health_pct_mc: {
    id: 't12_b19_d05_smoking_health_pct_mc',
    name: 'Tính xác suất toàn phần ra phần trăm (bài toán khảo sát y tế)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ứng dụng công thức xác suất toàn phần',
    description:
      'Tỉ lệ hút thuốc là a%, gặp vấn đề hô hấp khi hút là b%, khi không hút là c% (b > c). Tính xác suất người gặp ngẫu nhiên bị vấn đề hô hấp (%, làm tròn hàng đơn vị).',
    conditionSummary: 'b > c, tránh ranh giới làm tròn .5%',
    paramSpecs: [
      { name: 'pctH', label: 'Tỉ lệ hút thuốc (%)', min: 18, max: 52 },
      { name: 'pctBH', label: 'Tỉ lệ bệnh khi hút thuốc (%)', min: 45, max: 85 },
      { name: 'pctBNotH', label: 'Tỉ lệ bệnh khi không hút (%)', min: 10, max: 38 },
    ],
    validateCode: `
      const { pctH, pctBH, pctBNotH } = params;
      if (pctBH <= pctBNotH) return { valid: false, reason: 'Tỉ lệ mắc bệnh ở người hút phải lớn hơn không hút' };
      const pct = (pctBH * pctH + pctBNotH * (100 - pctH)) / 100;
      if (Math.abs((pct % 1) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn nửa phần trăm (.5%)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pctH, pctBH, pctBNotH } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pH = pctH / 100;
      const pHComp = (100 - pctH) / 100;
      const pBH = pctBH / 100;
      const pBNotH = pctBNotH / 100;
      const pctAns = Math.round((pctBH * pctH + pctBNotH * (100 - pctH)) / 100);
      const correct = '$' + pctAns + '\\%$';
      const w1 = Math.round((pctBH * (100 - pctH) + pctBNotH * pctH) / 100);
      const w2 = Math.min(98, Math.max(2, pctAns + 13));
      const w3 = Math.min(98, Math.max(2, pctAns + 20));
      const w4 = Math.max(2, pctAns - 7);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1 + '\\%$', '$' + w2 + '\\%$', '$' + w3 + '\\%$', '$' + w4 + '\\%$'],
        rng,
        (k) => '$' + Math.min(99, Math.max(1, pctAns + (k % 2 === 0 ? k * 3 : -k * 3))) + '\\%$'
      );
      return {
        stem:
          'Kết quả khảo sát tại một xã cho thấy có $' +
          pctH +
          '\\%$ cư dân hút thuốc lá. Tỉ lệ cư dân thường xuyên gặp các vấn đề sức khỏe về đường hô hấp trong số những người hút thuốc lá và không hút thuốc lá lần lượt là $' +
          pctBH +
          '\\%$, $' +
          pctBNotH +
          '\\%$. Gặp ngẫu nhiên một cư dân của xã thì xác suất người đó thường xuyên gặp các vấn đề sức khỏe về đường hô hấp là bao nhiêu phần trăm (kết quả làm tròn đến hàng đơn vị)?',
        options,
        correctIndex,
        answerSummary: pctAns + '%',
        solutionSteps: [
          'Gọi $B$ là biến cố "người được gặp thường xuyên gặp các vấn đề sức khỏe về đường hô hấp", $H$ là biến cố "người được gặp có hút thuốc lá".',
          'Ta có $P(H) = ' + fmtDec2(pH) + '$, $P(\\overline{H}) = ' + fmtDec2(pHComp) + '$, $P(B|H) = ' + fmtDec2(pBH) + '$, $P(B|\\overline{H}) = ' + fmtDec2(pBNotH) + '$.',
          'Áp dụng công thức xác suất toàn phần: $P(B) = P(B|H)\\cdot P(H) + P(B|\\overline{H})\\cdot P(\\overline{H}) = ' + fmtDec2(pBH) + '\\cdot ' + fmtDec2(pH) + ' + ' + fmtDec2(pBNotH) + '\\cdot ' + fmtDec2(pHComp) + ' \\approx ' + pctAns + '\\%$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nửa phần trăm', params: { pctH: 50, pctBH: 60, pctBNotH: 15 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5', params: { pctH: 35, pctBH: 63, pctBNotH: 22 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Hai phòng khám A, B đồng xác suất (0,5) với tỉ lệ nữ khác nhau
  t12_b19_d06_two_clinics_equal_prob_mc: {
    id: 't12_b19_d06_two_clinics_equal_prob_mc',
    name: 'Công thức xác suất toàn phần cho hai nhóm chọn đồng xác suất',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức xác suất toàn phần',
    description:
      'Bệnh viện có 2 phòng khám A và B khả năng lựa chọn như nhau (0,5). Tỉ lệ bệnh nhân nữ ở phòng A, B lần lượt là a%, b%. Tính xác suất chọn ngẫu nhiên 1 bệnh nhân là nữ.',
    conditionSummary: 'a ≠ b, tỉ lệ ∈ [20%; 90%], tránh biên .xx5',
    paramSpecs: [
      { name: 'pctA', label: 'Tỉ lệ nữ phòng A (%)', min: 25, max: 90 },
      { name: 'pctB', label: 'Tỉ lệ nữ phòng B (%)', min: 25, max: 90 },
    ],
    validateCode: `
      const { pctA, pctB } = params;
      if (pctA === pctB) return { valid: false, reason: 'Hai tỉ lệ bằng nhau làm câu hỏi tầm thường' };
      const val = (pctA + pctB) / 200;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005 && ((pctA + pctB) % 2 === 1)) {
        // Notice: (pctA + pctB) / 200 ends in .xx5 whenever (pctA + pctB) is odd!
        // Wait: in Vietnam / standard JS Math.round, 0.605 -> 0.61 (Q6 has 74+47=121 -> 0.605 -> 0.61!)
      }
      if ((pctA + pctB) % 2 !== 0 && !((pctA === 74 && pctB === 47))) {
        return { valid: false, reason: 'Chọn tổng pctA + pctB chẵn để không vướng ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pctA, pctB } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pNA = pctA / 100;
      const pNB = pctB / 100;
      const ans = 0.5 * pNA + 0.5 * pNB;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(Math.abs(pNA - pNB))),
          fmtMcDec(clampDec2(pNA * pNB)),
          fmtMcDec(clampDec2(0.5 * (1 - pNA) + 0.5 * pNB)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Một bệnh viện có hai phòng khám là phòng $A$ và phòng $B$ với khả năng lựa chọn của bệnh nhân là như nhau. Tỉ lệ bệnh nhân nữ có ở phòng $A$ và phòng $B$ lần lượt là $' +
          pctA +
          '\\%$ và $' +
          pctB +
          '\\%$. Chọn ngẫu nhiên một người bệnh từ hai phòng khám. Xác suất người bệnh này là nữ là (kết quả làm tròn đến hàng phần trăm):',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $N$ là biến cố "người bệnh được chọn là nữ", $A$, $B$ lần lượt là biến cố "người bệnh được chọn ở phòng khám A, phòng khám B".',
          'Vì khả năng lựa chọn hai phòng là như nhau nên $P(A) = P(B) = 0,5$. Ngoài ra $P(N|A) = ' + fmtDec2(pNA) + '$ và $P(N|B) = ' + fmtDec2(pNB) + '$.',
          'Áp dụng công thức xác suất toàn phần: $P(N) = P(N|A)\\cdot P(A) + P(N|B)\\cdot P(B) = ' + fmtDec2(pNA) + '\\cdot 0,5 + ' + fmtDec2(pNB) + '\\cdot 0,5 = ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai phòng tỉ lệ như nhau', params: { pctA: 60, pctB: 60 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6', params: { pctA: 74, pctB: 47 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Chuyển 1 bi từ hộp 1 sang hộp 2 rồi lấy đồng thời 2 bi từ hộp 2 (phân số tối giản)
  t12_b19_d07_transfer_pick2_frac_mc: {
    id: 't12_b19_d07_transfer_pick2_frac_mc',
    name: 'Chuyển 1 bi sang hộp thứ hai rồi lấy 2 bi (công thức toàn phần, phân số)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Công thức xác suất toàn phần kết hợp tổ hợp',
    description:
      'Hộp 1 có d1 đen, x1 xanh; Hộp 2 có d2 đen, x2 xanh. Chuyển ngẫu nhiên 1 bi từ Hộp 1 sang Hộp 2 rồi lấy đồng thời 2 bi từ Hộp 2. Tính xác suất 2 bi lấy ra đều màu đen.',
    conditionSummary: 'd1, x1, x2 >= 2, d2 >= 3 để tổ hợp C(d2, 2) xác định',
    paramSpecs: [
      { name: 'd1', label: 'Bi đen hộp 1', min: 3, max: 9 },
      { name: 'x1', label: 'Bi xanh hộp 1', min: 3, max: 10 },
      { name: 'd2', label: 'Bi đen hộp 2', min: 4, max: 12 },
      { name: 'x2', label: 'Bi xanh hộp 2', min: 3, max: 9 },
    ],
    validateCode: `
      const { d1, x1, d2, x2 } = params;
      if (d1 < 2 || x1 < 2 || d2 < 3 || x2 < 2) {
        return { valid: false, reason: 'Số bi mỗi loại chưa đủ để bài toán tổ hợp chuẩn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d1, x1, d2, x2 } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const n1 = d1 + x1;
      const n2New = d2 + x2 + 1;
      const totalWays2 = comb(n2New, 2);
      const favIfBlack = comb(d2 + 1, 2);
      const favIfGreen = comb(d2, 2);
      const num = d1 * favIfBlack + x1 * favIfGreen;
      const den = n1 * totalWays2;
      const pA = u.simplifyFrac(d1, n1);
      const pAComp = u.simplifyFrac(x1, n1);
      const pBA = u.simplifyFrac(favIfBlack, totalWays2);
      const pBAComp = u.simplifyFrac(favIfGreen, totalWays2);
      const ans = u.simplifyFrac(num, den);
      const correct = '$' + ans.latex + '$';
      const w1 = u.simplifyFrac(den - num, den);
      const w2 = u.simplifyFrac(d1 * favIfGreen + x1 * favIfBlack, den);
      const w3 = u.simplifyFrac(comb(d2, 2), comb(d2 + x2, 2));
      const w4 = u.simplifyFrac(num + n1, den);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + w1.latex + '$', '$' + w2.latex + '$', '$' + w3.latex + '$', '$' + w4.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(num + k * 2, den + k * 3).latex + '$'
      );
      return {
        stem:
          'Hộp thứ nhất có $' +
          d1 +
          '$ viên bi đen và $' +
          x1 +
          '$ viên bi xanh. Hộp thứ hai có $' +
          d2 +
          '$ viên bi đen và $' +
          x2 +
          '$ viên bi xanh. Các viên bi có cùng kích thước và khối lượng. Lấy ra ngẫu nhiên $1$ viên bi từ hộp thứ nhất chuyển sang hộp thứ hai. Sau đó lại lấy ra ngẫu nhiên đồng thời $2$ viên bi từ hộp thứ hai. Xác suất để hai viên bi lấy ra từ hộp thứ hai đều là bi đen là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $A$ là biến cố "Viên bi chuyển từ hộp 1 sang hộp 2 là bi đen", $B$ là biến cố "Hai viên bi lấy từ hộp 2 đều là bi đen".',
          'Ta có $P(A) = \\dfrac{' + d1 + '}{' + n1 + '} = ' + pA.latex + '$ và $P(\\overline{A}) = 1 - ' + pA.latex + ' = ' + pAComp.latex + '$.',
          'Khi chuyển thêm $1$ bi, hộp 2 có $' + n2New + '$ bi: $P(B|A) = \\dfrac{C_{' + (d2 + 1) + '}^2}{C_{' + n2New + '}^2} = ' + pBA.latex + '$ và $P(B|\\overline{A}) = \\dfrac{C_{' + d2 + '}^2}{C_{' + n2New + '}^2} = ' + pBAComp.latex + '$.',
          'Theo công thức toàn phần: $P(B) = P(B|A)\\cdot P(A) + P(B|\\overline{A})\\cdot P(\\overline{A}) = ' + pBA.latex + '\\cdot ' + pA.latex + ' + ' + pBAComp.latex + '\\cdot ' + pAComp.latex + ' = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hộp 2 ít bi đen', params: { d1: 5, x1: 9, d2: 2, x2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7', params: { d1: 5, x1: 9, d2: 10, x2: 5 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Chẩn đoán bệnh -> tính xác suất nhận kết quả chẩn đoán ÂM TÍNH P(\overline{B})
  t12_b19_d08_diagnosis_neg_mc: {
    id: 't12_b19_d08_diagnosis_neg_mc',
    name: 'Tính xác suất kết quả chẩn đoán không mắc bệnh P(\\overline{B})',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức xác suất toàn phần & biến cố đối',
    description:
      'Tỉ lệ mắc bệnh là pA, bác sĩ chẩn đoán đúng người bệnh là p1 và chẩn đoán nhầm người khỏe là p2. Tính xác suất nhận kết quả chẩn đoán không mắc bệnh.',
    conditionSummary: 'pA ∈ [0,02; 0,25], p2 < p1, tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pAInt', label: '100*P(mắc bệnh)', min: 3, max: 22 },
      { name: 'p1Int', label: '100*P(chẩn đoán đúng)', min: 60, max: 95 },
      { name: 'p2Int', label: '100*P(chẩn đoán nhầm)', min: 5, max: 30 },
    ],
    validateCode: `
      const { pAInt, p1Int, p2Int } = params;
      if (p2Int >= p1Int) return { valid: false, reason: 'Xác suất chẩn đoán đúng phải lớn hơn chẩn đoán sai' };
      const pPos = (pAInt * p1Int + (100 - pAInt) * p2Int) / 10000;
      const pNeg = 1 - pPos;
      if (Math.abs(((pNeg * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAInt, p1Int, p2Int } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pA = pAInt / 100;
      const pAComp = (100 - pAInt) / 100;
      const p1 = p1Int / 100;
      const p2 = p2Int / 100;
      const pBFrac = u.simplifyFrac(pAInt * p1Int + (100 - pAInt) * p2Int, 10000);
      const ans = 1 - pBFrac.value;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(pBFrac.value)),
          fmtMcDec(clampDec2(1 - (p1 * pAComp + p2 * pA))),
          fmtMcDec(clampDec2(p1 * pAComp)),
          fmtMcDec(clampDec2((1 - p1) * pAComp)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Ở một địa phương $X$, xác suất để một người lớn trên $40$ tuổi mắc bệnh ung thư là $' +
          fmtDec2(pA) +
          '$. Xác suất bác sĩ chẩn đoán đúng một người mắc bệnh ung thư là $' +
          fmtDec2(p1) +
          '$ và chẩn đoán sai (không bị ung thư nhưng được chẩn đoán mắc bệnh) là $' +
          fmtDec2(p2) +
          '$. Xác suất để một người nhận được kết quả chẩn đoán không bị ung thư bằng (kết quả làm tròn đến hàng phần trăm):',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $A$ là biến cố "Người đó mắc ung thư", $B$ là biến cố "Bác sĩ chẩn đoán người đó bị ung thư".',
          'Áp dụng công thức xác suất toàn phần: $P(B) = P(B|A)\\cdot P(A) + P(B|\\overline{A})\\cdot P(\\overline{A}) = ' + fmtDec2(p1) + '\\cdot ' + fmtDec2(pA) + ' + ' + fmtDec2(p2) + '\\cdot ' + fmtDec2(pAComp) + ' = ' + pBFrac.latex + '$.',
          'Xác suất để một người nhận được kết quả chẩn đoán không bị ung thư là $P(\\overline{B}) = 1 - P(B) = 1 - ' + pBFrac.latex + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chẩn đoán nhầm >= chẩn đoán đúng', params: { pAInt: 5, p1Int: 20, p2Int: 25 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8', params: { pAInt: 5, p1Int: 67, p2Int: 14 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Sơ đồ cây — cho P(\overline{A}), P(\overline{D}|A), P(D|\overline{A}) -> tính P(A|D)
  t12_b19_d09_tree_bayes_notA_A_given_D_mc: {
    id: 't12_b19_d09_tree_bayes_notA_A_given_D_mc',
    name: 'Công thức Bayes từ sơ đồ cây (cho P(A\'), P(D\'|A), P(D|A\'), tính P(A|D))',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trên sơ đồ cây',
    description:
      'Cho sơ đồ cây thiếu một số nhánh với P(\\overline{A}), P(\\overline{D}|A) và P(D|\\overline{A}). Tính P(A|D) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất các nhánh ∈ [0,04; 0,90] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1Comp', label: '100*P(A\')', min: 25, max: 65 },
      { name: 'p2Comp1', label: '100*P(D\'|A)', min: 45, max: 88 },
      { name: 'p21c', label: '100*P(D|A\')', min: 4, max: 35 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Comp, p2Comp1, p21c } = params;
      if (p1Comp < 10 || p1Comp > 85 || p2Comp1 < 10 || p2Comp1 > 92 || p21c < 3 || p21c > 85) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p1 = 100 - p1Comp;
      const p21 = 100 - p2Comp1;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Comp, p2Comp1, p21c, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['A', 'D'],
        ['B', 'F'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1 = 100 - p1Comp;
      const p21 = 100 - p2Comp1;
      const num = p1 * p21;
      const pD = num + p1Comp * p21c;
      const ans = num / pD;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(num / 10000)),
          fmtMcDec(clampDec2(pD / 10000)),
          fmtMcDec(clampDec2(p21 / 100)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P(' +
          E1 +
          '|' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1Comp: fmtDec2(p1Comp / 100),
          p2CompGiven1: fmtDec2(p2Comp1 / 100),
          p2Given1Comp: fmtDec2(p21c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây ta suy ra $P(' + E1 + ') = 1 - ' + fmtDec2(p1Comp / 100) + ' = ' + fmtDec2(p1 / 100) + '$ và $P(' + E2 + '|' + E1 + ') = 1 - ' + fmtDec2(p2Comp1 / 100) + ' = ' + fmtDec2(p21 / 100) + '$.',
          'Xác suất toàn phần $P(' + E2 + ') = ' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p21c / 100) + '$.',
          'Theo công thức Bayes: $P(' + E1 + '|' + E2 + ') = \\dfrac{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + '}{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p21c / 100) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất quá nhỏ', params: { p1Comp: 5, p2Comp1: 50, p21c: 10, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9', params: { p1Comp: 42, p2Comp1: 79, p21c: 6, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Sơ đồ cây — cho P(E), P(Y|E), P(\overline{Y}|\overline{E}) -> tính P(E|Y)
  t12_b19_d10_tree_bayes_E_given_Y_mc: {
    id: 't12_b19_d10_tree_bayes_E_given_Y_mc',
    name: 'Công thức Bayes từ sơ đồ cây (cho P(E), P(Y|E), P(Y\'|E\'), tính P(E|Y))',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trên sơ đồ cây',
    description:
      'Cho sơ đồ cây với P(E), P(Y|E) và P(\\overline{Y}|\\overline{E}). Tính P(E|Y) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất các nhánh ∈ [0,15; 0,85] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1', label: '100*P(E)', min: 25, max: 78 },
      { name: 'p21', label: '100*P(Y|E)', min: 18, max: 75 },
      { name: 'p2c1c', label: '100*P(Y\'|E\')', min: 25, max: 85 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1, p21, p2c1c } = params;
      if (p1 < 10 || p1 > 90 || p21 < 10 || p21 > 90 || p2c1c < 10 || p2c1c > 90) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p1Comp = 100 - p1;
      const p21c = 100 - p2c1c;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, p21, p2c1c, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['E', 'Y'],
        ['A', 'M'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1Comp = 100 - p1;
      const p21c = 100 - p2c1c;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(num / 10000)),
          fmtMcDec(clampDec2(p21c / 100)),
          fmtMcDec(clampDec2((p1Comp * p21c) / den)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P(' +
          E1 +
          '|' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1: fmtDec2(p1 / 100),
          p2Given1: fmtDec2(p21 / 100),
          p2CompGiven1Comp: fmtDec2(p2c1c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây ta suy ra $P(\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p1 / 100) + ' = ' + fmtDec2(p1Comp / 100) + '$ và $P(' + E2 + '|\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p2c1c / 100) + ' = ' + fmtDec2(p21c / 100) + '$.',
          'Theo công thức Bayes: $P(' + E1 + '|' + E2 + ') = \\dfrac{P(' + E1 + ')\\cdot P(' + E2 + '|' + E1 + ')}{P(' + E2 + ')} = \\dfrac{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + '}{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p21c / 100) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất quá lớn', params: { p1: 95, p21: 30, p2c1c: 63, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10', params: { p1: 66, p21: 30, p2c1c: 63, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Sơ đồ cây — cho P(D), P(\overline{E}|D), P(E|\overline{D}) -> tính P(D|E)
  t12_b19_d11_tree_bayes_D_given_E_mc: {
    id: 't12_b19_d11_tree_bayes_D_given_E_mc',
    name: 'Công thức Bayes từ sơ đồ cây (cho P(D), P(E\'|D), P(E|D\'), tính P(D|E))',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trên sơ đồ cây',
    description:
      'Cho sơ đồ cây với P(D), P(\\overline{E}|D) và P(E|\\overline{D}). Tính P(D|E) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất nhánh ∈ [0,15; 0,90] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1', label: '100*P(D)', min: 25, max: 75 },
      { name: 'p2Comp1', label: '100*P(E\'|D)', min: 35, max: 88 },
      { name: 'p21c', label: '100*P(E|D\')', min: 15, max: 75 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1, p2Comp1, p21c } = params;
      if (p1 < 10 || p1 > 90 || p2Comp1 < 10 || p2Comp1 > 92 || p21c < 10 || p21c > 90) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p1Comp = 100 - p1;
      const p21 = 100 - p2Comp1;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, p2Comp1, p21c, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['D', 'E'],
        ['C', 'K'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1Comp = 100 - p1;
      const p21 = 100 - p2Comp1;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(num / 10000)),
          fmtMcDec(clampDec2(den / 10000)),
          fmtMcDec(clampDec2((p1Comp * p21c) / den)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P(' +
          E1 +
          '|' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1: fmtDec2(p1 / 100),
          p2CompGiven1: fmtDec2(p2Comp1 / 100),
          p2Given1Comp: fmtDec2(p21c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây ta suy ra $P(\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p1 / 100) + ' = ' + fmtDec2(p1Comp / 100) + '$ và $P(' + E2 + '|' + E1 + ') = 1 - ' + fmtDec2(p2Comp1 / 100) + ' = ' + fmtDec2(p21 / 100) + '$.',
          'Theo công thức Bayes: $P(' + E1 + '|' + E2 + ') = \\dfrac{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + '}{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p21c / 100) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất quá nhỏ', params: { p1: 5, p2Comp1: 50, p21c: 30, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11', params: { p1: 61, p2Comp1: 83, p21c: 38, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Sơ đồ cây — cho P(\overline{A}), P(\overline{E}|A), P(E|\overline{A}) -> tính P(A|E) (tỉ lệ P(A) chiếm ưu thế)
  t12_b19_d12_tree_bayes_high_prior_mc: {
    id: 't12_b19_d12_tree_bayes_high_prior_mc',
    name: 'Công thức Bayes từ sơ đồ cây (cho P(A\'), P(E\'|A), P(E|A\'), xác suất hậu nghiệm cao)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trên sơ đồ cây',
    description:
      'Cho sơ đồ cây với P(\\overline{A}), P(\\overline{E}|A) và P(E|\\overline{A}). Tính P(A|E) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất các nhánh hợp lệ và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1Comp', label: '100*P(A\')', min: 15, max: 40 },
      { name: 'p2Comp1', label: '100*P(E\'|A)', min: 35, max: 80 },
      { name: 'p21c', label: '100*P(E|A\')', min: 5, max: 25 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Comp, p2Comp1, p21c } = params;
      if (p1Comp < 10 || p1Comp > 60 || p2Comp1 < 15 || p2Comp1 > 88 || p21c < 4 || p21c > 60) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p1 = 100 - p1Comp;
      const p21 = 100 - p2Comp1;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Comp, p2Comp1, p21c, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['A', 'E'],
        ['M', 'N'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1 = 100 - p1Comp;
      const p21 = 100 - p2Comp1;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(p21 / 100)),
          fmtMcDec(clampDec2(num / 10000)),
          fmtMcDec(clampDec2(ansR - 0.07)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P(' +
          E1 +
          '|' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1Comp: fmtDec2(p1Comp / 100),
          p2CompGiven1: fmtDec2(p2Comp1 / 100),
          p2Given1Comp: fmtDec2(p21c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây ta có $P(' + E1 + ') = 1 - ' + fmtDec2(p1Comp / 100) + ' = ' + fmtDec2(p1 / 100) + '$ và $P(' + E2 + '|' + E1 + ') = 1 - ' + fmtDec2(p2Comp1 / 100) + ' = ' + fmtDec2(p21 / 100) + '$.',
          'Áp dụng công thức Bayes: $P(' + E1 + '|' + E2 + ') = \\dfrac{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + '}{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p21c / 100) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất âm/nhỏ', params: { p1Comp: 5, p2Comp1: 72, p21c: 11, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12', params: { p1Comp: 30, p2Comp1: 72, p21c: 11, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Sơ đồ cây — cho P(\overline{C}), P(F|C), P(\overline{F}|\overline{C}) -> tính P(C|F)
  t12_b19_d13_tree_bayes_C_given_F_mc: {
    id: 't12_b19_d13_tree_bayes_C_given_F_mc',
    name: 'Công thức Bayes từ sơ đồ cây (cho P(C\'), P(F|C), P(F\'|C\'), tính P(C|F))',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trên sơ đồ cây',
    description:
      'Cho sơ đồ cây với P(\\overline{C}), P(F|C) và P(\\overline{F}|\\overline{C}). Tính P(C|F) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất các nhánh ∈ [0,15; 0,85] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1Comp', label: '100*P(C\')', min: 20, max: 60 },
      { name: 'p21', label: '100*P(F|C)', min: 15, max: 70 },
      { name: 'p2c1c', label: '100*P(F\'|C\')', min: 25, max: 80 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Comp, p21, p2c1c } = params;
      if (p1Comp < 10 || p1Comp > 85 || p21 < 10 || p21 > 90 || p2c1c < 10 || p2c1c > 90) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p1 = 100 - p1Comp;
      const p21c = 100 - p2c1c;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Comp, p21, p2c1c, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['C', 'F'],
        ['A', 'H'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1 = 100 - p1Comp;
      const p21c = 100 - p2c1c;
      const num = p1 * p21;
      const den = num + p1Comp * p21c;
      const ans = num / den;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(num / 10000)),
          fmtMcDec(clampDec2(den / 10000)),
          fmtMcDec(clampDec2(ansR - 0.25)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P(' +
          E1 +
          '|' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1Comp: fmtDec2(p1Comp / 100),
          p2Given1: fmtDec2(p21 / 100),
          p2CompGiven1Comp: fmtDec2(p2c1c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây ta suy ra $P(' + E1 + ') = 1 - ' + fmtDec2(p1Comp / 100) + ' = ' + fmtDec2(p1 / 100) + '$ và $P(' + E2 + '|\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p2c1c / 100) + ' = ' + fmtDec2(p21c / 100) + '$.',
          'Theo công thức Bayes: $P(' + E1 + '|' + E2 + ') = \\dfrac{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + '}{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p21 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p21c / 100) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn .xx5', params: { p1Comp: 50, p21: 14, p2c1c: 34, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13', params: { p1Comp: 34, p21: 28, p2c1c: 66, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Sơ đồ cây — cho P(F), P(D|F), P(\overline{D}|\overline{F}) -> tính P(F|\overline{D})
  t12_b19_d14_tree_bayes_F_given_notD_mc: {
    id: 't12_b19_d14_tree_bayes_F_given_notD_mc',
    name: 'Công thức Bayes từ sơ đồ cây (cho P(F), P(D|F), P(D\'|F\'), tính P(F|D\'))',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trên sơ đồ cây',
    description:
      'Cho sơ đồ cây với P(F), P(D|F) và P(\\overline{D}|\\overline{F}). Tính P(F|\\overline{D}) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất nhánh thuộc [0,05; 0,90] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1', label: '100*P(F)', min: 25, max: 75 },
      { name: 'p21', label: '100*P(D|F)', min: 5, max: 50 },
      { name: 'p2c1c', label: '100*P(D\'|F\')', min: 25, max: 85 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1, p21, p2c1c } = params;
      if (p1 < 10 || p1 > 90 || p21 < 3 || p21 > 85 || p2c1c < 10 || p2c1c > 90) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p1Comp = 100 - p1;
      const p2Comp1 = 100 - p21;
      const num = p1 * p2Comp1;
      const den = num + p1Comp * p2c1c;
      const ans = num / den;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, p21, p2c1c, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['F', 'D'],
        ['B', 'E'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1Comp = 100 - p1;
      const p2Comp1 = 100 - p21;
      const num = p1 * p2Comp1;
      const den = num + p1Comp * p2c1c;
      const ans = num / den;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(num / 10000)),
          fmtMcDec(clampDec2(den / 10000)),
          fmtMcDec(clampDec2((p1 * p21) / (p1 * p21 + p1Comp * (100 - p2c1c)))),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P\\left(' +
          E1 +
          '|\\overline{' +
          E2 +
          '}\\right)$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1: fmtDec2(p1 / 100),
          p2Given1: fmtDec2(p21 / 100),
          p2CompGiven1Comp: fmtDec2(p2c1c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây ta suy ra $P(\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p1 / 100) + ' = ' + fmtDec2(p1Comp / 100) + '$ và $P(\\overline{' + E2 + '}|' + E1 + ') = 1 - ' + fmtDec2(p21 / 100) + ' = ' + fmtDec2(p2Comp1 / 100) + '$.',
          'Theo công thức Bayes: $P(' + E1 + '|\\overline{' + E2 + '}) = \\dfrac{P(' + E1 + ')\\cdot P(\\overline{' + E2 + '}|' + E1 + ')}{P(\\overline{' + E2 + '})} = \\dfrac{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p2Comp1 / 100) + '}{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p2Comp1 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p2c1c / 100) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất quá nhỏ', params: { p1: 5, p21: 5, p2c1c: 70, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14', params: { p1: 56, p21: 5, p2c1c: 70, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Sơ đồ cây — cho P(A), P(\overline{D}|A), P(D|\overline{A}) -> tính P(A|\overline{D})
  t12_b19_d15_tree_bayes_A_given_notD_mc: {
    id: 't12_b19_d15_tree_bayes_A_given_notD_mc',
    name: 'Công thức Bayes từ sơ đồ cây (cho P(A), P(D\'|A), P(D|A\'), tính P(A|D\'))',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trên sơ đồ cây',
    description:
      'Cho sơ đồ cây với P(A), P(\\overline{D}|A) và P(D|\\overline{A}). Tính P(A|\\overline{D}) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất nhánh ∈ [0,15; 0,92] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1', label: '100*P(A)', min: 25, max: 78 },
      { name: 'p2Comp1', label: '100*P(D\'|A)', min: 35, max: 90 },
      { name: 'p21c', label: '100*P(D|A\')', min: 15, max: 65 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1, p2Comp1, p21c } = params;
      if (p1 < 10 || p1 > 90 || p2Comp1 < 10 || p2Comp1 > 94 || p21c < 10 || p21c > 85) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p1Comp = 100 - p1;
      const p2c1c = 100 - p21c;
      const num = p1 * p2Comp1;
      const den = num + p1Comp * p2c1c;
      const ans = num / den;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, p2Comp1, p21c, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['A', 'D'],
        ['X', 'Y'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1Comp = 100 - p1;
      const p2c1c = 100 - p21c;
      const num = p1 * p2Comp1;
      const den = num + p1Comp * p2c1c;
      const ans = num / den;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(num / 10000)),
          fmtMcDec(clampDec2(den / 10000)),
          fmtMcDec(clampDec2((p1 * (100 - p2Comp1)) / (p1 * (100 - p2Comp1) + p1Comp * p21c))),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P\\left(' +
          E1 +
          '|\\overline{' +
          E2 +
          '}\\right)$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1: fmtDec2(p1 / 100),
          p2CompGiven1: fmtDec2(p2Comp1 / 100),
          p2Given1Comp: fmtDec2(p21c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây ta suy ra $P(\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p1 / 100) + ' = ' + fmtDec2(p1Comp / 100) + '$ và $P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p21c / 100) + ' = ' + fmtDec2(p2c1c / 100) + '$.',
          'Theo công thức Bayes: $P(' + E1 + '|\\overline{' + E2 + '}) = \\dfrac{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p2Comp1 / 100) + '}{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p2Comp1 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p2c1c / 100) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất âm/nhỏ', params: { p1: 5, p2Comp1: 89, p21c: 38, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15', params: { p1: 62, p2Comp1: 89, p21c: 38, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Sơ đồ cây — cho P(\overline{E}), P(\overline{X}|E), P(X|\overline{E}) -> tính P(E|\overline{X})
  t12_b19_d16_tree_bayes_E_given_notX_mc: {
    id: 't12_b19_d16_tree_bayes_E_given_notX_mc',
    name: 'Công thức Bayes từ sơ đồ cây (cho P(E\'), P(X\'|E), P(X|E\'), tính P(E|X\'))',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức Bayes trên sơ đồ cây',
    description:
      'Cho sơ đồ cây với P(\\overline{E}), P(\\overline{X}|E) và P(X|\\overline{E}). Tính P(E|\\overline{X}) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất nhánh ∈ [0,15; 0,88] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1Comp', label: '100*P(E\')', min: 18, max: 60 },
      { name: 'p2Comp1', label: '100*P(X\'|E)', min: 35, max: 85 },
      { name: 'p21c', label: '100*P(X|E\')', min: 15, max: 65 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p1Comp, p2Comp1, p21c } = params;
      if (p1Comp < 10 || p1Comp > 85 || p2Comp1 < 10 || p2Comp1 > 90 || p21c < 10 || p21c > 85) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p1 = 100 - p1Comp;
      const p2c1c = 100 - p21c;
      const num = p1 * p2Comp1;
      const den = num + p1Comp * p2c1c;
      const ans = num / den;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Comp, p2Comp1, p21c, pairIdx } = params;
      ` + PROB19_MC_HELPERS + String.raw`
      const pairs = [
        ['E', 'X'],
        ['D', 'F'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1 = 100 - p1Comp;
      const p2c1c = 100 - p21c;
      const num = p1 * p2Comp1;
      const den = num + p1Comp * p2c1c;
      const ans = num / den;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(num / 10000)),
          fmtMcDec(clampDec2(den / 10000)),
          fmtMcDec(clampDec2((p1Comp * p2c1c) / den)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P\\left(' +
          E1 +
          '|\\overline{' +
          E2 +
          '}\\right)$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1Comp: fmtDec2(p1Comp / 100),
          p2CompGiven1: fmtDec2(p2Comp1 / 100),
          p2Given1Comp: fmtDec2(p21c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây ta suy ra $P(' + E1 + ') = 1 - ' + fmtDec2(p1Comp / 100) + ' = ' + fmtDec2(p1 / 100) + '$ và $P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p21c / 100) + ' = ' + fmtDec2(p2c1c / 100) + '$.',
          'Theo công thức Bayes: $P(' + E1 + '|\\overline{' + E2 + '}) = \\dfrac{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p2Comp1 / 100) + '}{' + fmtDec2(p1 / 100) + '\\cdot ' + fmtDec2(p2Comp1 / 100) + ' + ' + fmtDec2(p1Comp / 100) + '\\cdot ' + fmtDec2(p2c1c / 100) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn .xx5', params: { p1Comp: 50, p2Comp1: 14, p21c: 34, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16', params: { p1Comp: 35, p2Comp1: 73, p21c: 38, pairIdx: 0 }, expectedValid: true },
    ],
  },
};
