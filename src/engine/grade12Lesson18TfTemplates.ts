import { MathTemplate } from '../types/math';

const PROB_TF_HELPERS = String.raw`
  const fmtDec2 = (val) => (Math.round(val * 100) / 100).toFixed(2).replace('.', ',');
  const round2 = (val) => Math.round(val * 100) / 100;
  const clampDec2 = (v) => Math.min(0.98, Math.max(0.02, round2(v)));
  const comb = (n, k) => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
    return Math.round(res);
  };
`;

export const G12_B18_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D19 (Q19): Đúng/sai các công thức và giá trị P(\overline{A}), P(BA), P(A\overline{B})
  t12_b18_d19_cond_prob_identities_tf: {
    id: 't12_b18_d19_cond_prob_identities_tf',
    name: 'Nhận định tính chất và tính toán P(A\\overline{B}), P(BA) (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Công thức nhân và phần bù có điều kiện',
    description:
      'Cho P(A) và P(B|A). Xét 4 mệnh đề về P(\\overline{A}), đẳng thức P(A\\overline{B}) = P(A) - P(AB), giá trị P(BA) và P(A\\overline{B}).',
    conditionSummary: 'P(A), P(B|A) ∈ [0,20; 0,85], phép trừ thẳng và trừ sau làm tròn khớp nhau',
    paramSpecs: [
      { name: 'pAInt', label: '100*P(A)', min: 25, max: 85 },
      { name: 'pBAInt', label: '100*P(B|A)', min: 20, max: 80 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { pAInt, pBAInt } = params;
      if (pAInt < 20 || pAInt > 90 || pBAInt < 15 || pBAInt > 88) {
        return { valid: false, reason: 'Xác suất ngoài miền' };
      }
      const pA = pAInt / 100, pBA = pBAInt / 100;
      const pABExact = pA * pBA;
      const pABRound = Math.round(pABExact * 100) / 100;
      const pDiffExact = pA - pABExact;
      const pDiffViaRound = pA - pABRound;
      if (Math.round(pDiffExact * 100) !== Math.round(pDiffViaRound * 100)) {
        return { valid: false, reason: 'Tránh sai lệch 0,01 khi làm tròn trung gian' };
      }
      if (Math.abs(((pABExact * 100) % 1) - 0.5) < 0.005 || Math.abs(((pDiffExact * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAInt, pBAInt, flagA, flagC, flagD } = params;
      ` + PROB_TF_HELPERS + String.raw`
      const pA = pAInt / 100;
      const pBA = pBAInt / 100;
      const pNotA = round2(1 - pA);
      const pNotAShown = flagA === 1 ? pNotA : clampDec2(pNotA + 0.29);
      const pAB = round2(pA * pBA);
      const pABShown = flagC === 1 ? pAB : clampDec2(pAB + 0.31 > 0.98 ? pAB - 0.17 : pAB + 0.31);
      const pANotB = round2(pA - pAB);
      const pANotBShown = flagD === 1 ? pANotB : clampDec2(pANotB + 0.22);

      const tfStatements = [
        {
          key: 'a',
          text: '$P(\\overline{A}) = ' + fmtDec2(pNotAShown) + '$.',
          isTrue: flagA === 1,
        },
        {
          key: 'b',
          text: '$P(A\\overline{B}) = P(A) - P(AB)$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: '$P(BA) = ' + fmtDec2(pABShown) + '$.',
          isTrue: flagC === 1,
        },
        {
          key: 'd',
          text: '$P(A\\overline{B}) = ' + fmtDec2(pANotBShown) + '$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem:
          'Cho hai biến cố $A, B$ có $P(A) = ' +
          fmtDec2(pA) +
          '$ và $P(B|A) = ' +
          fmtDec2(pBA) +
          '$. Xét tính đúng - sai của các khẳng định sau (kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Ta có $P(\\overline{A}) = 1 - P(A) = 1 - ' + fmtDec2(pA) + ' = ' + fmtDec2(pNotA) + '$.',
          'b) Đúng. Vì $A\\overline{B}$ và $AB$ xung khắc và $A\\overline{B} \\cup AB = A$ nên $P(A\\overline{B}) = P(A) - P(AB)$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. Áp dụng công thức nhân xác suất: $P(BA) = P(B|A)\\cdot P(A) = ' + fmtDec2(pBA) + '\\cdot ' + fmtDec2(pA) + ' \\approx ' + fmtDec2(pAB) + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. $P(A\\overline{B}) = P(A) - P(AB) = ' + fmtDec2(pA) + ' - ' + fmtDec2(pAB) + ' = ' + fmtDec2(pANotB) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất quá nhỏ', params: { pAInt: 10, pBAInt: 50, flagA: 0, flagC: 0, flagD: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19', params: { pAInt: 64, pBAInt: 51, flagA: 0, flagC: 0, flagD: 1 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Gọi lần lượt hai bạn lên bảng trong lớp học (Đúng/Sai)
  t12_b18_d20_class_pick_two_tf: {
    id: 't12_b18_d20_class_pick_two_tf',
    name: 'Bài toán chọn lần lượt hai học sinh trong lớp học (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Không gian mẫu và xác suất có điều kiện',
    description:
      'Lớp có N học sinh gồm g nữ và b nam. Gọi lần lượt 2 bạn lên bảng. Xét số phần tử không gian mẫu, n(B), xác suất có điều kiện và xác suất cả hai nam.',
    conditionSummary: '20 <= N <= 45, 5 <= g <= N - 5',
    paramSpecs: [
      { name: 'N', label: 'Sĩ số lớp N', min: 22, max: 42 },
      { name: 'g', label: 'Số học sinh nữ', min: 8, max: 22 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { N, g } = params;
      if (N < 15 || g < 4 || N - g < 4) return { valid: false, reason: 'Số nam và nữ đều phải >= 4' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { N, g, flagA, flagB, flagC, flagD } = params;
      const b = N - g;
      const omega = N * (N - 1);
      const omegaShown = flagA === 1 ? omega : omega + N;
      const nB = g * (N - 1);
      const nBShown = flagB === 1 ? nB : nB - g;
      const condFrac = u.simplifyFrac(g - 1, N - 1);
      const condWrong = u.simplifyFrac(g, N - 1);
      const condShown = flagC === 1 ? condFrac : condWrong;
      const twoBoysFrac = u.simplifyFrac(b * (b - 1), N * (N - 1));
      const twoBoysWrong = u.simplifyFrac(b - 1, N - 1);
      const twoBoysShown = flagD === 1 ? twoBoysFrac : twoBoysWrong;

      const tfStatements = [
        {
          key: 'a',
          text: 'Số phần tử của không gian mẫu là $' + omegaShown + '$.',
          isTrue: flagA === 1,
        },
        {
          key: 'b',
          text: '$n(B) = ' + nBShown + '$.',
          isTrue: flagB === 1,
        },
        {
          key: 'c',
          text: 'Xác suất để bạn thứ hai là nữ biết bạn thứ nhất là nữ bằng $' + condShown.latex + '$.',
          isTrue: flagC === 1,
        },
        {
          key: 'd',
          text: 'Xác suất để cả hai bạn được chọn đều là nam là $' + twoBoysShown.latex + '$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem:
          'Lớp $12A1$ có $' +
          N +
          '$ học sinh, trong đó có $' +
          g +
          '$ học sinh nữ. Giáo viên gọi ngẫu nhiên lần lượt hai bạn lên bảng làm bài tập. Gọi $A$ là biến cố "Bạn thứ nhất được chọn là một học sinh nữ", $B$ là biến cố "Bạn thứ hai được chọn là một học sinh nữ". Xét tính đúng - sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Số phần tử không gian mẫu là $n(\\Omega) = ' + N + ' \\cdot ' + (N - 1) + ' = ' + omega + '$.',
          'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. Bạn thứ hai là nữ gồm $2$ trường hợp: (Nữ, Nữ) có $' + g + ' \\cdot ' + (g - 1) + ' = ' + (g * (g - 1)) + '$ cách; (Nam, Nữ) có $' + b + ' \\cdot ' + g + ' = ' + (b * g) + '$ cách. Tổng $n(B) = ' + nB + '$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. Khi bạn thứ nhất là nữ, lớp còn $' + (g - 1) + '$ nữ và $' + b + '$ nam nên $P(B|A) = \\dfrac{' + (g - 1) + '}{' + (N - 1) + '} = ' + condFrac.latex + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Xác suất cả hai bạn là nam là $\\dfrac{' + b + '}{' + N + '} \\cdot \\dfrac{' + (b - 1) + '}{' + (N - 1) + '} = ' + twoBoysFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên số nữ vượt sĩ số', params: { N: 25, g: 24, flagA: 1, flagB: 1, flagC: 1, flagD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20', params: { N: 30, g: 11, flagA: 1, flagB: 1, flagC: 1, flagD: 0 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Khảo sát khách hàng mua máy lọc nước RO (Đúng/Sai)
  t12_b18_d21_water_purifier_survey_tf: {
    id: 't12_b18_d21_water_purifier_survey_tf',
    name: 'Bài toán thực tế khảo sát khách hàng mua máy lọc nước (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân và phần bù trong thống kê khách hàng',
    description:
      'Khảo sát khách hàng mua máy lọc nước (tỉ lệ mua nhiều máy P(A), tỉ lệ mua RO P(B), tỉ lệ P(B|A)). Xét 4 mệnh đề về biến cố đối, xác suất có điều kiện, xác suất giao và P(\\overline{A}\\overline{B}).',
    conditionSummary: 'P(A)P(B|A) < P(B), P(A) + P(B) - P(AB) <= 0,95 và phép làm tròn khớp nhau',
    paramSpecs: [
      { name: 'pAInt', label: 'Tỉ lệ mua >1 máy (%)', min: 45, max: 78 },
      { name: 'pBInt', label: 'Tỉ lệ mua RO (%)', min: 15, max: 35 },
      { name: 'pBAInt', label: 'Tỉ lệ P(B|A) (%)', min: 5, max: 25 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { pAInt, pBInt, pBAInt } = params;
      const pA = pAInt / 100, pB = pBInt / 100, pBA = pBAInt / 100;
      const pABExact = pA * pBA;
      const pABRound = Math.round(pABExact * 100) / 100;
      if (pABExact >= pB - 0.02 || pA + pB - pABExact > 0.96) {
        return { valid: false, reason: 'Cần P(AB) < P(B) và P(A ∪ B) <= 0,96' };
      }
      const pNoneExact = 1 - pA - pB + pABExact;
      const pNoneViaRound = 1 - pA - pB + pABRound;
      if (Math.round(pNoneExact * 100) !== Math.round(pNoneViaRound * 100)) {
        return { valid: false, reason: 'Tránh sai lệch 0,01 khi làm tròn trung gian P(AB)' };
      }
      if (Math.abs(((pABExact * 100) % 1) - 0.5) < 0.005 || Math.abs(((pNoneExact * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAInt, pBInt, pBAInt, flagA, flagB, flagC, flagD } = params;
      ` + PROB_TF_HELPERS + String.raw`
      const pA = pAInt / 100;
      const pB = pBInt / 100;
      const pBA = pBAInt / 100;
      const pNotA = round2(1 - pA);
      const pAB = round2(pA * pBA);
      const pNone = round2(1 - pA - pB + pAB);

      const pNotAShown = flagA === 1 ? pNotA : clampDec2(pA);
      const pBAShown = flagB === 1 ? pBA : clampDec2(1 - pBA);
      const pABShown = flagC === 1 ? pAB : clampDec2(1 - pAB);
      const pNoneShown = flagD === 1 ? pNone : clampDec2(pNone + 0.12);

      const tfStatements = [
        {
          key: 'a',
          text: '$P(\\overline{A}) = ' + fmtDec2(pNotAShown) + '$.',
          isTrue: flagA === 1,
        },
        {
          key: 'b',
          text: '$P(B|A) = ' + fmtDec2(pBAShown) + '$.',
          isTrue: flagB === 1,
        },
        {
          key: 'c',
          text: '$P(AB) = ' + fmtDec2(pABShown) + '$.',
          isTrue: flagC === 1,
        },
        {
          key: 'd',
          text: 'Xác suất một khách hàng chỉ mua đúng một chiếc máy lọc nước và chiếc máy lọc nước đó không phải là máy lọc nước RO bằng $' + fmtDec2(pNoneShown) + '$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem:
          'Một công ty kinh doanh máy lọc nước sau khi kiểm tra nhóm khách hàng mua sản phẩm của mình đã thu thập được các thông tin sau:\n' +
          '- Tất cả khách hàng đều mua ít nhất một chiếc máy lọc nước.\n' +
          '- Có $' + pAInt + '\\%$ khách hàng mua nhiều hơn một chiếc máy lọc nước.\n' +
          '- Có $' + pBInt + '\\%$ khách hàng mua máy lọc nước RO.\n' +
          '- Trong số những khách hàng mua nhiều hơn một chiếc máy lọc nước, có $' + pBAInt + '\\%$ mua máy lọc nước RO.\n' +
          'Gọi $A$ là biến cố "Khách hàng mua nhiều hơn một chiếc máy lọc nước", $B$ là biến cố "Khách hàng mua máy lọc nước RO". Xét tính đúng - sai của các khẳng định sau (kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Ta có $P(A) = ' + fmtDec2(pA) + ' \\Rightarrow P(\\overline{A}) = 1 - ' + fmtDec2(pA) + ' = ' + fmtDec2(pNotA) + '$.',
          'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. Trong số khách mua nhiều hơn $1$ máy có $' + pBAInt + '\\%$ mua máy RO nên $P(B|A) = ' + fmtDec2(pBA) + '$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. Áp dụng công thức nhân: $P(AB) = P(B|A)\\cdot P(A) = ' + fmtDec2(pBA) + '\\cdot ' + fmtDec2(pA) + ' \\approx ' + fmtDec2(pAB) + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Xác suất cần tìm là $P(\\overline{A}\\overline{B}) = 1 - P(A \\cup B) = 1 - P(A) - P(B) + P(AB) = 1 - ' + fmtDec2(pA) + ' - ' + fmtDec2(pB) + ' + ' + fmtDec2(pAB) + ' = ' + fmtDec2(pNone) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(AB) vượt P(B)', params: { pAInt: 80, pBInt: 15, pBAInt: 25, flagA: 1, flagB: 0, flagC: 0, flagD: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21', params: { pAInt: 69, pBInt: 19, pBAInt: 6, flagA: 1, flagB: 0, flagC: 0, flagD: 1 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Lấy 1 bi rồi lấy 2 bi không hoàn lại (công thức Bayes & xác suất có điều kiện)
  t12_b18_d22_draw1_then2_bayes_tf: {
    id: 't12_b18_d22_draw1_then2_bayes_tf',
    name: 'Bài toán lấy 1 bi rồi lấy 2 bi liên tiếp không hoàn lại (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Xác suất có điều kiện và công thức Bayes',
    description:
      'Hộp có g bi xanh và r bi đỏ. Bạn thứ nhất lấy 1 bi không hoàn lại, bạn thứ hai lấy 2 bi. Xét 4 mệnh đề về xác suất lấy 1 bi, 2 bi và xác suất hậu nghiệm Bayes.',
    conditionSummary: 'g >= 4, r >= 4',
    paramSpecs: [
      { name: 'g', label: 'Số bi xanh', min: 5, max: 11 },
      { name: 'r', label: 'Số bi đỏ', min: 4, max: 10 },
      { name: 'flagA', label: 'Ý a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagB', label: 'Ý b đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Ý c đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Ý d đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { g, r } = params;
      if (g < 4 || r < 4) return { valid: false, reason: 'Số bi xanh và đỏ đều phải >= 4' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { g, r, flagA, flagB, flagC, flagD } = params;
      ` + PROB_TF_HELPERS + String.raw`
      const N = g + r;
      const p1Green = u.simplifyFrac(g, N);
      const p1Red = u.simplifyFrac(r, N);
      const p2GreenGivenRed = u.simplifyFrac(g * (g - 1), (N - 1) * (N - 2));
      const p1RedAndMixed = u.simplifyFrac(r * 2 * g * (r - 1), N * (N - 1) * (N - 2));
      // Bayes: A = Khôi lấy 1 đỏ, B = Nam lấy ít nhất 1 đỏ
      // P(A) = r/N; P(B|A) = 1 - C(g,2)/C(N-1,2); P(B) = 1 - C(g,2)/C(N,2)
      const cG2 = comb(g, 2);
      const cN1_2 = comb(N - 1, 2);
      const cN_2 = comb(N, 2);
      const pBGivenA = u.simplifyFrac(cN1_2 - cG2, cN1_2);
      const pAB = u.simplifyFrac(r * (cN1_2 - cG2), N * cN1_2);
      const pB = u.simplifyFrac(cN_2 - cG2, cN_2);
      const pAGivenB = u.simplifyFrac(r * (cN1_2 - cG2) * cN_2, N * cN1_2 * (cN_2 - cG2));

      const p1GreenShown = flagA === 1 ? p1Green : u.simplifyFrac(g, N + 1);
      const p2GreenShown = flagB === 1 ? p2GreenGivenRed : u.simplifyFrac(g * (g - 1), N * (N - 1));
      const p1RedMixedWrong = u.simplifyFrac(r * g * (r - 1), N * (N - 1) * (N - 2));
      const p1RedMixedShown = flagC === 1 ? p1RedAndMixed : p1RedMixedWrong;
      const pAGivenBShown = flagD === 1 ? pAGivenB : p1Red;

      const tfStatements = [
        {
          key: 'a',
          text: 'Xác suất để bạn Khôi lấy được $1$ viên bi màu xanh là $' + p1GreenShown.latex + '$.',
          isTrue: flagA === 1,
        },
        {
          key: 'b',
          text: 'Xác suất bạn Nam lấy được $2$ viên bi màu xanh, biết rằng bạn Khôi đã lấy được $1$ viên bi màu đỏ là $' + p2GreenShown.latex + '$.',
          isTrue: flagB === 1,
        },
        {
          key: 'c',
          text: 'Xác suất để bạn Khôi lấy được $1$ viên bi màu đỏ và bạn Nam lấy được $1$ viên bi màu xanh và $1$ viên bi màu đỏ là $' + p1RedMixedShown.latex + '$.',
          isTrue: flagC === 1,
        },
        {
          key: 'd',
          text: 'Biết rằng bạn Nam lấy được ít nhất một viên bi màu đỏ, xác suất bạn Khôi lấy được một viên bi màu đỏ là $' + pAGivenBShown.latex + '$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem:
          'Một hộp có chứa $' +
          g +
          '$ viên bi màu xanh và $' +
          r +
          '$ viên bi màu đỏ (các viên bi có cùng kích thước và khối lượng, được đánh số khác nhau). Bạn Khôi lấy ngẫu nhiên $1$ viên bi từ trong hộp và không hoàn lại, tiếp đó bạn Nam lấy ngẫu nhiên $2$ viên bi từ trong hộp. Xét tính đúng - sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (flagA === 1 ? 'Đúng' : 'Sai') + '. Tổng số bi là $' + N + '$, nên xác suất Khôi lấy được bi xanh là $\\dfrac{' + g + '}{' + N + '} = ' + p1Green.latex + '$.',
          'b) ' + (flagB === 1 ? 'Đúng' : 'Sai') + '. Sau khi Khôi lấy $1$ bi đỏ, trong hộp còn $' + g + '$ xanh trong $' + (N - 1) + '$ bi, nên xác suất Nam lấy $2$ bi xanh là $\\dfrac{C_{' + g + '}^2}{C_{' + (N - 1) + '}^2} = ' + p2GreenGivenRed.latex + '$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. Xác suất cần tìm là $\\dfrac{' + r + '}{' + N + '} \\cdot \\dfrac{C_{' + g + '}^1 C_{' + (r - 1) + '}^1}{C_{' + (N - 1) + '}^2} = ' + p1RedAndMixed.latex + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Gọi $A$: "Khôi lấy $1$ đỏ", $B$: "Nam lấy ít nhất $1$ đỏ". Ta có $P(A) = ' + p1Red.latex + '$, $P(B|A) = ' + pBGivenA.latex + ' \\Rightarrow P(AB) = ' + pAB.latex + '$, và $P(B) = 1 - \\dfrac{C_{' + g + '}^2}{C_{' + N + '}^2} = ' + pB.latex + '$. Do đó $P(A|B) = \\dfrac{P(AB)}{P(B)} = ' + pAGivenB.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên g < 4', params: { g: 3, r: 5, flagA: 1, flagB: 1, flagC: 0, flagD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22', params: { g: 7, r: 6, flagA: 1, flagB: 1, flagC: 0, flagD: 0 }, expectedValid: true },
    ],
  },
};
