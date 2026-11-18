import { MathTemplate } from '../types/math';

export const G11_B29_ADD_SA_PART2: Record<string, MathTemplate> = {
  // D49 (Q19): Chọn k số từ {1; ...; nMax} có tổng là số lẻ
  t11_b29_d49_subset_odd_sum_sa: {
    id: 't11_b29_d49_subset_odd_sum_sa',
    name: 'Xác suất chọn k số từ {1; ...; n} có tổng là số lẻ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Chọn ngẫu nhiên k số từ tập {1; 2; ...; n}. Tính xác suất để tổng các số chọn ra là một số lẻ.',
    conditionSummary: 'nMax ∈ [8; 18], k ∈ [3; 7], k < nMax',
    paramSpecs: [
      { name: 'setIdx', label: 'Tên tập hợp (0..3)', min: 0, max: 3 },
      { name: 'nMax', label: 'Phần tử lớn nhất n', min: 8, max: 18 },
      { name: 'k', label: 'Số phần tử được chọn k', min: 3, max: 7 },
    ],
    validateCode: `
      const { setIdx, nMax, k } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 3) return { valid: false, reason: 'setIdx ngoài miền [0; 3]' };
      if (!Number.isInteger(nMax) || nMax < 8 || nMax > 18) return { valid: false, reason: 'nMax ngoài miền [8; 18]' };
      if (!Number.isInteger(k) || k < 3 || k > 7) return { valid: false, reason: 'k ngoài miền [3; 7]' };
      if (k >= nMax) return { valid: false, reason: 'Cần k < nMax' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, nMax, k } = params;
      const SETS = ['M', 'A', 'B', 'S'];
      const setName = SETS[setIdx];
      const nOdd = Math.ceil(nMax / 2);
      const nEven = Math.floor(nMax / 2);
      const den = u.comb(nMax, k);

      let fav = 0;
      const terms = [];
      for (let i = 1; i <= k && i <= nOdd; i += 2) {
        const j = k - i;
        if (j <= nEven) {
          fav += u.comb(nOdd, i) * u.comb(nEven, j);
          terms.push('C_{' + nOdd + '}^{' + i + '}C_{' + nEven + '}^{' + j + '}');
        }
      }
      const ans = Math.floor((200 * fav + den) / (2 * den)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Cho tập $' + setName + ' = \\{1; 2; 3; \\dots; ' + nMax + '\\}$. Chọn ngẫu nhiên $' + k + '$ số thuộc tập $' + setName + '$. Tính xác suất để tổng các số chọn ra là một số lẻ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Trong tập $' + setName + '$ có $' + nOdd + '$ số lẻ và $' + nEven + '$ số chẵn.',
          'Tổng số cách chọn $' + k + '$ số từ $' + nMax + '$ số là $C^{' + k + '}_{' + nMax + '} = ' + den + '$.',
          'Tổng $' + k + '$ số là số lẻ khi số lượng số lẻ được chọn là số lẻ, do đó số cách chọn thuận lợi là: $' + terms.join(' + ') + ' = ' + fav + '$.',
          'Xác suất cần tìm là $P = \\dfrac{' + fav + '}{' + den + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k ≥ nMax', params: { setIdx: 0, nMax: 8, k: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (n=13, k=5 -> 0,51)', params: { setIdx: 0, nMax: 13, k: 5 }, expectedValid: true },
    ],
  },

  // D50 (Q20): Chọn k số từ {1; ...; nMax} có tổng là số chẵn
  t11_b29_d50_subset_even_sum_sa: {
    id: 't11_b29_d50_subset_even_sum_sa',
    name: 'Xác suất chọn k số từ {1; ...; n} có tổng là số chẵn',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Chọn ngẫu nhiên k số từ tập {1; 2; ...; n}. Tính xác suất để tổng các số chọn ra là một số chẵn.',
    conditionSummary: 'nMax ∈ [8; 18], k ∈ [3; 8], k < nMax',
    paramSpecs: [
      { name: 'setIdx', label: 'Tên tập hợp (0..3)', min: 0, max: 3 },
      { name: 'nMax', label: 'Phần tử lớn nhất n', min: 8, max: 18 },
      { name: 'k', label: 'Số phần tử được chọn k', min: 3, max: 8 },
    ],
    validateCode: `
      const { setIdx, nMax, k } = params;
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 3) return { valid: false, reason: 'setIdx ngoài miền [0; 3]' };
      if (!Number.isInteger(nMax) || nMax < 8 || nMax > 18) return { valid: false, reason: 'nMax ngoài miền [8; 18]' };
      if (!Number.isInteger(k) || k < 3 || k > 8) return { valid: false, reason: 'k ngoài miền [3; 8]' };
      if (k >= nMax) return { valid: false, reason: 'Cần k < nMax' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, nMax, k } = params;
      const SETS = ['C', 'M', 'E', 'K'];
      const setName = SETS[setIdx];
      const nOdd = Math.ceil(nMax / 2);
      const nEven = Math.floor(nMax / 2);
      const den = u.comb(nMax, k);

      let oddFav = 0;
      const oddTerms = [];
      for (let i = 1; i <= k && i <= nOdd; i += 2) {
        const j = k - i;
        if (j <= nEven) {
          oddFav += u.comb(nOdd, i) * u.comb(nEven, j);
          oddTerms.push('C_{' + nOdd + '}^{' + i + '}C_{' + nEven + '}^{' + j + '}');
        }
      }
      const evenFav = den - oddFav;
      const fOdd = u.simplifyFrac(oddFav, den);
      const fEven = u.simplifyFrac(evenFav, den);
      const ans = Math.floor((200 * evenFav + den) / (2 * den)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Cho tập $' + setName + ' = \\{1; 2; 3; \\dots; ' + nMax + '\\}$. Chọn ngẫu nhiên $' + k + '$ số thuộc tập $' + setName + '$. Tính xác suất để tổng các số chọn ra là một số chẵn (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Trong tập $' + setName + '$ có $' + nOdd + '$ số lẻ và $' + nEven + '$ số chẵn. Tổng số cách chọn là $C^{' + k + '}_{' + nMax + '} = ' + den + '$.',
          'Tổng $' + k + '$ số là số lẻ khi số lượng số lẻ được chọn là số lẻ, có số cách là: $' + oddTerms.join(' + ') + ' = ' + oddFav + '$.',
          'Xác suất tổng là số lẻ là $' + fOdd.latex + '$. Vậy xác suất tổng các số chọn ra là số chẵn là $1 - ' + fOdd.latex + ' = ' + fEven.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k ≥ nMax', params: { setIdx: 0, nMax: 8, k: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (n=9, k=6 -> 0,48)', params: { setIdx: 0, nMax: 9, k: 6 }, expectedValid: true },
    ],
  },

  // D51 (Q21): Phỏng vấn mua cây dịp Tết, tính xác suất mua đúng một loại cây
  t11_b29_d51_tet_trees_exactly_one_sa: {
    id: 't11_b29_d51_tet_trees_exactly_one_sa',
    name: 'Xác suất người được phỏng vấn mua đúng một loại cây dịp Tết',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Phỏng vấn N người về việc mua cây loại A, loại B và cả hai loại. Tính xác suất chọn ngẫu nhiên một người mua đúng một loại cây.',
    conditionSummary: 'nTotal ∈ [40; 120], nA, nB ∈ [15; 70], nAB ∈ [3; 20], nA + nB - nAB ≤ nTotal',
    paramSpecs: [
      { name: 'nTotal', label: 'Số người được phỏng vấn', min: 40, max: 120 },
      { name: 'nA', label: 'Số người mua loại 1', min: 15, max: 70 },
      { name: 'nB', label: 'Số người mua loại 2', min: 15, max: 70 },
      { name: 'nAB', label: 'Số người mua cả hai loại', min: 3, max: 20 },
      { name: 'ctxIdx', label: 'Bối cảnh loại cây (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { nTotal, nA, nB, nAB, ctxIdx } = params;
      if (!Number.isInteger(nTotal) || nTotal < 40 || nTotal > 120) return { valid: false, reason: 'nTotal ngoài miền [40; 120]' };
      if (!Number.isInteger(nA) || nA < 15 || nA > 70) return { valid: false, reason: 'nA ngoài miền [15; 70]' };
      if (!Number.isInteger(nB) || nB < 15 || nB > 70) return { valid: false, reason: 'nB ngoài miền [15; 70]' };
      if (!Number.isInteger(nAB) || nAB < 3 || nAB > 20) return { valid: false, reason: 'nAB ngoài miền [3; 20]' };
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) return { valid: false, reason: 'ctxIdx ngoài miền [0; 2]' };
      if (nA <= nAB + 1 || nB <= nAB + 1) return { valid: false, reason: 'Cần nA > nAB + 1 và nB > nAB + 1' };
      if (nA + nB - nAB > nTotal) return { valid: false, reason: 'Cần nA + nB - nAB ≤ nTotal' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { nTotal, nA, nB, nAB, ctxIdx } = params;
      const CTXS = [
        ['cây mai', 'cây quất'],
        ['cây đào', 'cây quất'],
        ['cây mai', 'cây cúc'],
      ];
      const [c1, c2] = CTXS[ctxIdx];
      const onlyA = nA - nAB;
      const onlyB = nB - nAB;
      const fav = onlyA + onlyB;
      const ans = Math.floor((200 * fav + nTotal) / (2 * nTotal)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Một nhóm có $' + nTotal + '$ người được phỏng vấn họ đã mua ' + c1 + ' hay ' + c2 + ' vào dịp Tết, trong đó có $' + nA + '$ người mua ' + c1 + ', $' + nB + '$ người mua ' + c2 + ' và $' + nAB + '$ người mua cả ' + c1 + ' và ' + c2 + '. Chọn ngẫu nhiên một người. Tính xác suất để người đó mua đúng một loại cây (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Số người chỉ mua ' + c1 + ' là $' + nA + ' - ' + nAB + ' = ' + onlyA + '$.',
          'Số người chỉ mua ' + c2 + ' là $' + nB + ' - ' + nAB + ' = ' + onlyB + '$.',
          'Số người mua đúng một loại cây là $' + onlyA + ' + ' + onlyB + ' = ' + fav + '$.',
          'Xác suất cần tìm là $P = \\dfrac{' + fav + '}{' + nTotal + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vượt tổng số người', params: { nTotal: 60, nA: 41, nB: 44, nAB: 7, ctxIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (95; 41; 44; 7 -> 0,75)', params: { nTotal: 95, nA: 41, nB: 44, nAB: 7, ctxIdx: 0 }, expectedValid: true },
    ],
  },

  // D52 (Q22): Đánh lụi bài trắc nghiệm n câu, m phương án, nhận điểm dưới T
  t11_b29_d52_random_quiz_below_score_sa: {
    id: 't11_b29_d52_random_quiz_below_score_sa',
    name: 'Xác suất chọn ngẫu nhiên bài trắc nghiệm nhận điểm dưới ngưỡng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Bài trắc nghiệm n câu, m phương án, đúng +a điểm, sai -b điểm. Chọn ngẫu nhiên mỗi câu một phương án, tính xác suất tổng điểm nhỏ hơn T.',
    conditionSummary: 'n ∈ [8; 15], m ∈ [3; 6], a ∈ [2; 6], b ∈ [1; 2], T ∈ [0; 6], 0 ≤ xMax ≤ n - 2 và 0,02 ≤ P ≤ 0,98',
    paramSpecs: [
      { name: 'n', label: 'Số câu hỏi trắc nghiệm', min: 8, max: 15 },
      { name: 'm', label: 'Số phương án mỗi câu', min: 3, max: 6 },
      { name: 'a', label: 'Điểm mỗi câu đúng', min: 2, max: 6 },
      { name: 'b', label: 'Điểm trừ mỗi câu sai', min: 1, max: 2 },
      { name: 'T', label: 'Ngưỡng điểm (< T)', min: 0, max: 6 },
    ],
    validateCode: `
      const { n, m, a, b, T } = params;
      if (!Number.isInteger(n) || n < 8 || n > 15) return { valid: false, reason: 'n ngoài miền [8; 15]' };
      if (!Number.isInteger(m) || m < 3 || m > 6) return { valid: false, reason: 'm ngoài miền [3; 6]' };
      if (!Number.isInteger(a) || a < 2 || a > 6) return { valid: false, reason: 'a ngoài miền [2; 6]' };
      if (!Number.isInteger(b) || b < 1 || b > 2) return { valid: false, reason: 'b ngoài miền [1; 2]' };
      if (!Number.isInteger(T) || T < 0 || T > 6) return { valid: false, reason: 'T ngoài miền [0; 6]' };

      let xMax = -1;
      for (let x = 0; x <= n; x++) {
        if ((a + b) * x - b * n < T) xMax = x;
      }
      if (xMax < 0 || xMax > n - 2) return { valid: false, reason: 'Số câu đúng tối đa xMax không hợp lệ' };

      const p = 1 / m;
      const q = 1 - p;
      let prob = 0;
      for (let i = 0; i <= xMax; i++) {
        prob += u.comb(n, i) * Math.pow(p, i) * Math.pow(q, n - i);
      }
      if (prob < 0.02 || prob > 0.98) return { valid: false, reason: 'Xác suất quá sát 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, m, a, b, T } = params;
      let xMax = -1;
      for (let x = 0; x <= n; x++) {
        if ((a + b) * x - b * n < T) xMax = x;
      }
      const threshFrac = u.simplifyFrac(T + b * n, a + b);
      const p = 1 / m;
      const q = 1 - p;
      let prob = 0;
      for (let i = 0; i <= xMax; i++) {
        prob += u.comb(n, i) * Math.pow(p, i) * Math.pow(q, n - i);
      }
      const ans = Math.round(prob * 100 + 1e-9) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Một bài trắc nghiệm có $' + n + '$ câu hỏi, mỗi câu hỏi có $' + m + '$ phương án lựa chọn trong đó có một đáp án đúng. Giả sử mỗi câu trả lời đúng được $' + a + '$ điểm và mỗi câu trả lời sai bị trừ $' + b + '$ điểm. Một học sinh không học bài nên chọn ngẫu nhiên mỗi câu một phương án. Tính xác suất để học sinh này nhận điểm dưới $' + T + '$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $x$ ($x \\in \\mathbb{N}, 0 \\le x \\le ' + n + '$) là số câu trả lời đúng. Số điểm nhận được là $S = ' + a + 'x - ' + b + '(' + n + ' - x) = ' + (a + b) + 'x - ' + (b * n) + '$.',
          'Điều kiện $S < ' + T + ' \\Leftrightarrow ' + (a + b) + 'x - ' + (b * n) + ' < ' + T + ' \\Leftrightarrow x < ' + threshFrac.latex + ' \\Rightarrow x \\le ' + xMax + '$.',
          'Xác suất trả lời đúng mỗi câu là $p = \\dfrac{1}{' + m + '}$, sai là $\\overline{p} = \\dfrac{' + (m - 1) + '}{' + m + '}$.',
          'Vậy xác suất cần tìm là $P(x \\le ' + xMax + ') = \\sum\\limits_{i=0}^{' + xMax + '} C^i_{' + n + '}\\left(\\dfrac{1}{' + m + '}\\right)^i\\left(\\dfrac{' + (m - 1) + '}{' + m + '}\\right)^{' + n + '-i} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { n: 12, m: 1, a: 5, b: 1, T: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (n=12, m=5, a=5, b=1, T=1 -> 0,56)', params: { n: 12, m: 5, a: 5, b: 1, T: 1 }, expectedValid: true },
    ],
  },

  // D53 (Q23): Đánh lụi bài trắc nghiệm n câu, m phương án, nhận điểm lớn hơn T
  t11_b29_d53_random_quiz_above_score_sa: {
    id: 't11_b29_d53_random_quiz_above_score_sa',
    name: 'Xác suất chọn ngẫu nhiên bài trắc nghiệm nhận điểm lớn hơn ngưỡng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Bài trắc nghiệm n câu, m phương án, đúng +a điểm, sai -b điểm. Chọn ngẫu nhiên mỗi câu một phương án, tính xác suất tổng điểm lớn hơn T.',
    conditionSummary: 'n ∈ [8; 15], m ∈ [3; 5], a ∈ [2; 5], b ∈ [1; 2], T ∈ [0; 8], 1 ≤ xMin ≤ n - 2 và 0,02 ≤ P ≤ 0,98',
    paramSpecs: [
      { name: 'n', label: 'Số câu hỏi trắc nghiệm', min: 8, max: 15 },
      { name: 'm', label: 'Số phương án mỗi câu', min: 3, max: 5 },
      { name: 'a', label: 'Điểm mỗi câu đúng', min: 2, max: 5 },
      { name: 'b', label: 'Điểm trừ mỗi câu sai', min: 1, max: 2 },
      { name: 'T', label: 'Ngưỡng điểm (> T)', min: 0, max: 8 },
    ],
    validateCode: `
      const { n, m, a, b, T } = params;
      if (!Number.isInteger(n) || n < 8 || n > 15) return { valid: false, reason: 'n ngoài miền [8; 15]' };
      if (!Number.isInteger(m) || m < 3 || m > 5) return { valid: false, reason: 'm ngoài miền [3; 5]' };
      if (!Number.isInteger(a) || a < 2 || a > 5) return { valid: false, reason: 'a ngoài miền [2; 5]' };
      if (!Number.isInteger(b) || b < 1 || b > 2) return { valid: false, reason: 'b ngoài miền [1; 2]' };
      if (!Number.isInteger(T) || T < 0 || T > 8) return { valid: false, reason: 'T ngoài miền [0; 8]' };

      let xMin = n + 1;
      for (let x = 0; x <= n; x++) {
        if ((a + b) * x - b * n > T) {
          xMin = x;
          break;
        }
      }
      if (xMin < 1 || xMin > n - 2) return { valid: false, reason: 'Số câu đúng tối thiểu xMin không hợp lệ' };

      const p = 1 / m;
      const q = 1 - p;
      let prob = 0;
      for (let i = xMin; i <= n; i++) {
        prob += u.comb(n, i) * Math.pow(p, i) * Math.pow(q, n - i);
      }
      if (prob < 0.02 || prob > 0.98) return { valid: false, reason: 'Xác suất quá sát 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, m, a, b, T } = params;
      let xMin = n + 1;
      for (let x = 0; x <= n; x++) {
        if ((a + b) * x - b * n > T) {
          xMin = x;
          break;
        }
      }
      const threshFrac = u.simplifyFrac(T + b * n, a + b);
      const p = 1 / m;
      const q = 1 - p;
      let prob = 0;
      for (let i = xMin; i <= n; i++) {
        prob += u.comb(n, i) * Math.pow(p, i) * Math.pow(q, n - i);
      }
      const ans = Math.round(prob * 100 + 1e-9) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Một bài trắc nghiệm có $' + n + '$ câu hỏi, mỗi câu hỏi có $' + m + '$ phương án lựa chọn trong đó có một đáp án đúng. Giả sử mỗi câu trả lời đúng được $' + a + '$ điểm và mỗi câu trả lời sai bị trừ $' + b + '$ điểm. Một học sinh không học bài nên chọn ngẫu nhiên mỗi câu một phương án. Tính xác suất để học sinh này nhận điểm lớn hơn $' + T + '$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $x$ ($x \\in \\mathbb{N}, 0 \\le x \\le ' + n + '$) là số câu trả lời đúng. Số điểm nhận được là $S = ' + a + 'x - ' + b + '(' + n + ' - x) = ' + (a + b) + 'x - ' + (b * n) + '$.',
          'Điều kiện $S > ' + T + ' \\Leftrightarrow ' + (a + b) + 'x - ' + (b * n) + ' > ' + T + ' \\Leftrightarrow x > ' + threshFrac.latex + ' \\Rightarrow x \\ge ' + xMin + '$.',
          'Xác suất trả lời đúng mỗi câu là $p = \\dfrac{1}{' + m + '}$, sai là $q = \\dfrac{' + (m - 1) + '}{' + m + '}$.',
          'Vậy xác suất cần tìm là $P(x \\ge ' + xMin + ') = \\sum\\limits_{i=' + xMin + '}^{' + n + '} C_{' + n + '}^i \\left(\\dfrac{1}{' + m + '}\\right)^i \\left(\\dfrac{' + (m - 1) + '}{' + m + '}\\right)^{' + n + '-i} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 3', params: { n: 3, m: 4, a: 4, b: 1, T: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (n=10, m=4, a=4, b=1, T=4 -> 0,47)', params: { n: 10, m: 4, a: 4, b: 1, T: 4 }, expectedValid: true },
    ],
  },

  // D54 (Q24): Chọn 3 thẻ từ 1..N lập thành CSC có tổng ≤ sMax, tính b - a
  t11_b29_d54_cards_ap_sum_limit_sa: {
    id: 't11_b29_d54_cards_ap_sum_limit_sa',
    name: 'Xác suất chọn 3 thẻ lập thành cấp số cộng có tổng không vượt quá S',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Chọn ngẫu nhiên 3 thẻ từ N thẻ đánh số 1..N. Tính xác suất 3 số lập thành cấp số cộng có tổng không vượt quá S dưới dạng phân số tối giản a/b và tính b - a.',
    conditionSummary: 'N ∈ [30; 120], sMax ∈ [45; 210] (bước 3), 5 ≤ ⌊sMax/3⌋ ≤ N - 2',
    paramSpecs: [
      { name: 'N', label: 'Số lượng thẻ N', min: 30, max: 120 },
      { name: 'sMax', label: 'Tổng tối đa S', min: 45, max: 210, step: 3 },
    ],
    validateCode: `
      const { N, sMax } = params;
      if (!Number.isInteger(N) || N < 30 || N > 120) return { valid: false, reason: 'N ngoài miền [30; 120]' };
      if (!Number.isInteger(sMax) || sMax < 45 || sMax > 210) return { valid: false, reason: 'sMax ngoài miền [45; 210]' };
      const xLim = Math.floor(sMax / 3);
      if (xLim < 5 || xLim > N - 2) return { valid: false, reason: 'Cần 5 ≤ ⌊sMax/3⌋ ≤ N - 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { N, sMax } = params;
      const xLim = Math.floor(sMax / 3);
      let fav = 0;
      const limitX = Math.min(N - 1, xLim);
      for (let x = 2; x <= limitX; x++) {
        fav += Math.min(x - 1, N - x);
      }
      const tot = u.comb(N, 3);
      const frac = u.simplifyFrac(fav, tot);
      const ans = frac.den - frac.num;

      return {
        stem: 'Trong hộp chứa $' + N + '$ cái thẻ được đánh số thứ tự liên tiếp từ $1$ đến $' + N + '$. Chọn ngẫu nhiên $3$ thẻ trong hộp. Xác suất để chọn được $3$ thẻ có số thứ tự lập thành cấp số cộng, đồng thời có tổng không vượt quá $' + sMax + '$ bằng $\\dfrac{a}{b}$ (trong đó $\\dfrac{a}{b}$ là phân số tối giản, $a, b \\in \\mathbb{N}$). Tính $b - a$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Gọi ba số được chọn lập thành cấp số cộng là $x - d, x, x + d$ với $d \\in \\mathbb{N}^*$ và $1 \\le x - d < x < x + d \\le ' + N + '$.',
          'Điều kiện tổng không vượt quá $' + sMax + '$ là $3x \\le ' + sMax + ' \\Rightarrow x \\le ' + xLim + '$.',
          'Với mỗi giá trị $x \\in [2; ' + limitX + ']$, số cách chọn $d$ là $\\min(x - 1, ' + N + ' - x)$. Cộng tất cả các trường hợp xung khắc theo $x$, số bộ thỏa mãn là $' + fav + '$.',
          'Tổng số cách chọn $3$ thẻ từ $' + N + '$ thẻ là $C^3_{' + N + '} = ' + tot + '$.',
          'Xác suất là $P = \\dfrac{' + fav + '}{' + tot + '}' + (frac.den !== tot ? ' = ' + frac.latex : '') + ' \\Rightarrow b - a = ' + frac.den + ' - ' + frac.num + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên sMax / 3 ≥ N', params: { N: 30, sMax: 120 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (N=102, S=120 -> 8546)', params: { N: 102, sMax: 120 }, expectedValid: true },
    ],
  },

  // D55 (Q25): Chia 3 loại sách thành cặp phần thưởng khác loại, xác suất 2 bạn nhận phần thưởng giống nhau
  t11_b29_d55_book_rewards_same_pair_sa: {
    id: 't11_b29_d55_book_rewards_same_pair_sa',
    name: 'Xác suất hai học sinh nhận phần thưởng giống nhau (chia 3 loại sách)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Sử dụng sách Toán, Vật lí, Hóa học phát phần thưởng cho N học sinh, mỗi học sinh 2 cuốn khác loại. Tính xác suất hai học sinh chỉ định có phần thưởng giống nhau.',
    conditionSummary: 'x, y, z ∈ [3; 10] là số phần thưởng (Toán–Lý), (Toán–Hóa), (Lý–Hóa); pairIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'x', label: 'Số phần thưởng Toán–Lý', min: 3, max: 10 },
      { name: 'y', label: 'Số phần thưởng Toán–Hóa', min: 3, max: 10 },
      { name: 'z', label: 'Số phần thưởng Lý–Hóa', min: 3, max: 10 },
      { name: 'pairIdx', label: 'Cặp học sinh (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { x, y, z, pairIdx } = params;
      for (const v of [x, y, z]) {
        if (!Number.isInteger(v) || v < 3 || v > 10) return { valid: false, reason: 'Số phần thưởng mỗi cặp ngoài miền [3; 10]' };
      }
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 2) return { valid: false, reason: 'pairIdx ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z, pairIdx } = params;
      const PAIRS = [
        ['Minh', 'Hiền'],
        ['An', 'Bình'],
        ['Lan', 'Mai'],
      ];
      const [s1, s2] = PAIRS[pairIdx];
      const mT = x + y;
      const mL = x + z;
      const mH = y + z;
      const N = x + y + z;
      const cx = u.comb(x, 2);
      const cy = u.comb(y, 2);
      const cz = u.comb(z, 2);
      const fav = cx + cy + cz;
      const den = u.comb(N, 2);
      const ans = Math.floor((200 * fav + den) / (2 * den)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Người ta sử dụng $' + mT + '$ cuốn sách Toán, $' + mL + '$ cuốn sách Vật lí, $' + mH + '$ cuốn sách Hóa học (các cuốn sách cùng loại giống nhau) để làm phần thưởng cho $' + N + '$ học sinh, mỗi học sinh được $2$ cuốn sách khác loại. Trong số $' + N + '$ học sinh trên có hai bạn ' + s1 + ' và ' + s2 + '. Tính xác suất để hai bạn ' + s1 + ' và ' + s2 + ' có phần thưởng giống nhau (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi số phần thưởng loại Toán–Lý, Toán–Hóa, Lý–Hóa lần lượt là $x, y, z$.',
          'Ta có hệ phương trình: $\\begin{cases} x + y = ' + mT + ' \\\\ x + z = ' + mL + ' \\\\ y + z = ' + mH + ' \\end{cases} \\Rightarrow x = ' + x + ',\\, y = ' + y + ',\\, z = ' + z + '$.',
          'Áp dụng công thức cộng cho các biến cố xung khắc (cùng nhận bộ Toán–Lý, cùng Toán–Hóa hoặc cùng Lý–Hóa), xác suất để ' + s1 + ' và ' + s2 + ' nhận cùng loại phần thưởng là:',
          '$P = \\dfrac{C^2_{' + x + '} + C^2_{' + y + '} + C^2_{' + z + '}}{C^2_{' + N + '}} = \\dfrac{' + cx + ' + ' + cy + ' + ' + cz + '}{' + den + '} = \\dfrac{' + fav + '}{' + den + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x = 1', params: { x: 1, y: 4, z: 4, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (8 Toán, 8 Lý, 8 Hóa, 12 HS -> 0,27)', params: { x: 4, y: 4, z: 4, pairIdx: 0 }, expectedValid: true },
    ],
  },
};
