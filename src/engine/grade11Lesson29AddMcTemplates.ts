import { MathTemplate } from '../types/math';

export const G11_B29_ADD_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D31 (Q1): Hai biến cố xung khắc, tính P(A ∪ B) = P(A) + P(B)
  t11_b29_d31_mutually_excl_union_mc: {
    id: 't11_b29_d31_mutually_excl_union_mc',
    name: 'Xác suất biến cố hợp của hai biến cố xung khắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho hai biến cố xung khắc A, B với P(A), P(B) dạng thập phân. Tính xác suất P(A ∪ B).',
    conditionSummary: 'pA100, pB100 ∈ [10; 85] và pA100 + pB100 ≤ 99',
    paramSpecs: [
      { name: 'pA100', label: '100·P(A)', min: 10, max: 85 },
      { name: 'pB100', label: '100·P(B)', min: 10, max: 85 },
    ],
    validateCode: `
      const { pA100, pB100 } = params;
      if (!Number.isInteger(pA100) || pA100 < 10 || pA100 > 85) {
        return { valid: false, reason: 'pA100 ngoài miền [10; 85]' };
      }
      if (!Number.isInteger(pB100) || pB100 < 10 || pB100 > 85) {
        return { valid: false, reason: 'pB100 ngoài miền [10; 85]' };
      }
      if (pA100 + pB100 > 99) {
        return { valid: false, reason: 'Cần P(A) + P(B) < 1 đối với hai biến cố xung khắc' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pA100, pB100 } = params;
      const pA = pA100 / 100;
      const pB = pB100 / 100;
      const pUnion = (pA100 + pB100) / 100;
      const fmt = (v) => u.formatNumberVN(v, 2);
      const fmtProd = (v) => u.formatNumberVN(Number(v.toFixed(4)), 4);

      const correct = '$' + fmt(pUnion) + '$';
      const prod = pA * pB;
      const candWrongs = [
        '$' + fmtProd(prod) + '$',
        '$' + fmt(Math.abs(pA - pB)) + '$',
        '$' + fmt(1 - pUnion) + '$',
        '$' + fmtProd(pUnion - prod) + '$',
        '$' + fmt(Math.max(0.05, Number((pUnion - 0.14).toFixed(2)))) + '$',
      ].filter((s) => s !== '$0$' && s !== correct);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candWrongs,
        rng,
        (idx) => {
          const val = ((pA100 + pB100 + idx * 7) % 93 + 5) / 100;
          return '$' + fmt(val) + '$';
        }
      );

      return {
        stem: 'Cho $A$ và $B$ là hai biến cố xung khắc. Biết $P(A) = ' + fmt(pA) + '$ và $P(B) = ' + fmt(pB) + '$. Tính xác suất của biến cố $A \\cup B$.',
        options,
        correctIndex,
        answerSummary: fmt(pUnion),
        solutionSteps: [
          'Vì $A$ và $B$ là hai biến cố xung khắc nên áp dụng công thức cộng xác suất ta có:',
          '$P(A \\cup B) = P(A) + P(B) = ' + fmt(pA) + ' + ' + fmt(pB) + ' = ' + fmt(pUnion) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(A) + P(B) > 1', params: { pA100: 60, pB100: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (0,6 và 0,35 -> 0,95)', params: { pA100: 60, pB100: 35 }, expectedValid: true },
    ],
  },

  // D32 (Q2): Công thức cộng tổng quát P(A ∪ B) = P(A) + P(B) - P(AB) (2 chữ số thập phân)
  t11_b29_d32_union_from_inter_mc: {
    id: 't11_b29_d32_union_from_inter_mc',
    name: 'Tính xác suất biến cố hợp khi biết P(A), P(B) và P(AB)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho hai biến cố với P(A), P(B), P(AB) gồm hai chữ số thập phân. Tính P(A ∪ B).',
    conditionSummary: '0 < P(AB) < min(P(A), P(B)) và P(A) + P(B) - P(AB) ≤ 0,99',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
      { name: 'pA100', label: '100·P(X)', min: 25, max: 80 },
      { name: 'pB100', label: '100·P(Y)', min: 25, max: 80 },
      { name: 'pAB100', label: '100·P(XY)', min: 5, max: 50 },
    ],
    validateCode: `
      const { pairIdx, pA100, pB100, pAB100 } = params;
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 3) {
        return { valid: false, reason: 'pairIdx ngoài miền [0; 3]' };
      }
      if (!Number.isInteger(pA100) || pA100 < 25 || pA100 > 80) {
        return { valid: false, reason: 'pA100 ngoài miền [25; 80]' };
      }
      if (!Number.isInteger(pB100) || pB100 < 25 || pB100 > 80) {
        return { valid: false, reason: 'pB100 ngoài miền [25; 80]' };
      }
      if (!Number.isInteger(pAB100) || pAB100 < 5 || pAB100 > 50) {
        return { valid: false, reason: 'pAB100 ngoài miền [5; 50]' };
      }
      if (pAB100 >= Math.min(pA100, pB100)) {
        return { valid: false, reason: 'Cần P(XY) < min(P(X), P(Y))' };
      }
      if (pA100 + pB100 - pAB100 > 99) {
        return { valid: false, reason: 'Cần P(X ∪ Y) < 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, pA100, pB100, pAB100 } = params;
      const PAIRS = [
        ['B', 'E'],
        ['A', 'B'],
        ['M', 'N'],
        ['C', 'D'],
      ];
      const [X, Y] = PAIRS[pairIdx];
      const pU100 = pA100 + pB100 - pAB100;
      const pA = pA100 / 100;
      const pB = pB100 / 100;
      const pAB = pAB100 / 100;
      const pU = pU100 / 100;
      const fmt = (v) => u.formatNumberVN(v, 2);

      const correct = '$' + fmt(pU) + '$';
      const candVals = [
        (pA100 + pB100) <= 99 ? (pA100 + pB100) / 100 : Math.abs(pA100 - pB100) / 100,
        (100 - pU100) / 100,
        Math.abs(pA100 + pB100 - 2 * pAB100) / 100,
        pA,
        pB,
        Math.min(99, pU100 + 11) / 100,
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - pU) >= 0.005);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt(v) + '$'),
        rng,
        (idx) => '$' + fmt(((pU100 + idx * 9) % 91 + 5) / 100) + '$'
      );

      return {
        stem: 'Cho các biến cố $' + X + ', ' + Y + '$ thỏa mãn $P(' + X + ') = ' + fmt(pA) + '$, $P(' + Y + ') = ' + fmt(pB) + '$ và $P(' + X + Y + ') = ' + fmt(pAB) + '$. Tính $P(' + X + ' \\cup ' + Y + ')$.',
        options,
        correctIndex,
        answerSummary: fmt(pU),
        solutionSteps: [
          'Áp dụng công thức cộng xác suất cho hai biến cố bất kì:',
          '$P(' + X + ' \\cup ' + Y + ') = P(' + X + ') + P(' + Y + ') - P(' + X + Y + ') = ' + fmt(pA) + ' + ' + fmt(pB) + ' - ' + fmt(pAB) + ' = ' + fmt(pU) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(BE) ≥ min(P(B), P(E))', params: { pairIdx: 0, pA100: 48, pB100: 45, pAB100: 56 }, expectedValid: false },
      { label: 'Mẫu hợp lệ (0,48; 0,45; 0,26 -> 0,67)', params: { pairIdx: 0, pA100: 48, pB100: 45, pAB100: 26 }, expectedValid: true },
    ],
  },

  // D33 (Q3): Biết P(N), P(E), P(N ∪ E) -> tính P(NE)
  t11_b29_d33_inter_from_union_mc: {
    id: 't11_b29_d33_inter_from_union_mc',
    name: 'Tính xác suất biến cố giao P(AB) từ công thức cộng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho P(A), P(B) và P(A ∪ B). Áp dụng công thức cộng xác suất để tìm P(AB).',
    conditionSummary: 'max(P(A), P(B)) < P(A ∪ B) < min(1, P(A) + P(B))',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
      { name: 'pA100', label: '100·P(X)', min: 25, max: 80 },
      { name: 'pB100', label: '100·P(Y)', min: 25, max: 80 },
      { name: 'pU100', label: '100·P(X ∪ Y)', min: 40, max: 98 },
    ],
    validateCode: `
      const { pairIdx, pA100, pB100, pU100 } = params;
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 3) {
        return { valid: false, reason: 'pairIdx ngoài miền [0; 3]' };
      }
      if (!Number.isInteger(pA100) || pA100 < 25 || pA100 > 80) {
        return { valid: false, reason: 'pA100 ngoài miền [25; 80]' };
      }
      if (!Number.isInteger(pB100) || pB100 < 25 || pB100 > 80) {
        return { valid: false, reason: 'pB100 ngoài miền [25; 80]' };
      }
      if (!Number.isInteger(pU100) || pU100 < 40 || pU100 > 98) {
        return { valid: false, reason: 'pU100 ngoài miền [40; 98]' };
      }
      if (pU100 <= Math.max(pA100, pB100)) {
        return { valid: false, reason: 'Cần P(X ∪ Y) > max(P(X), P(Y))' };
      }
      if (pU100 >= pA100 + pB100) {
        return { valid: false, reason: 'Cần P(X ∪ Y) < P(X) + P(Y) để P(XY) > 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, pA100, pB100, pU100 } = params;
      const PAIRS = [
        ['N', 'E'],
        ['A', 'B'],
        ['C', 'D'],
        ['H', 'K'],
      ];
      const [X, Y] = PAIRS[pairIdx];
      const pInter100 = pA100 + pB100 - pU100;
      const pA = pA100 / 100;
      const pB = pB100 / 100;
      const pU = pU100 / 100;
      const pInter = pInter100 / 100;
      const fmt = (v) => u.formatNumberVN(v, 2);

      const correct = '$' + fmt(pInter) + '$';
      const candVals = [
        (pU100 - pA100) / 100,
        (pU100 - pB100) / 100,
        (100 - pU100) / 100,
        Math.round((pA100 * pB100) / 100) / 100,
        (pInter100 + 13) / 100,
      ].filter((v) => v > 0 && v < 1 && Math.abs(v - pInter) >= 0.005);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candVals.map((v) => '$' + fmt(v) + '$'),
        rng,
        (idx) => '$' + fmt(((pInter100 + idx * 7) % 85 + 5) / 100) + '$'
      );

      return {
        stem: 'Cho các biến cố $' + X + ', ' + Y + '$ thỏa mãn $P(' + X + ') = ' + fmt(pA) + '$, $P(' + Y + ') = ' + fmt(pB) + '$ và $P(' + X + ' \\cup ' + Y + ') = ' + fmt(pU) + '$. Tính $P(' + X + Y + ')$.',
        options,
        correctIndex,
        answerSummary: fmt(pInter),
        solutionSteps: [
          'Từ công thức cộng xác suất $P(' + X + ' \\cup ' + Y + ') = P(' + X + ') + P(' + Y + ') - P(' + X + Y + ')$, suy ra:',
          '$P(' + X + Y + ') = P(' + X + ') + P(' + Y + ') - P(' + X + ' \\cup ' + Y + ') = ' + fmt(pA) + ' + ' + fmt(pB) + ' - ' + fmt(pU) + ' = ' + fmt(pInter) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(X ∪ Y) ≥ P(X) + P(Y)', params: { pairIdx: 0, pA100: 40, pB100: 45, pU100: 90 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (0,48; 0,67; 0,82 -> 0,33)', params: { pairIdx: 0, pA100: 48, pB100: 67, pU100: 82 }, expectedValid: true },
    ],
  },

  // D34 (Q4): Gieo đồng xu và xúc xắc, tính xác suất biến cố hợp A ∪ B
  t11_b29_d34_coin_die_union_mc: {
    id: 't11_b29_d34_coin_die_union_mc',
    name: 'Tính P(A ∪ B) khi gieo đồng thời đồng xu và xúc xắc',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Gieo đồng thời một đồng xu và một con xúc xắc, xác định các phần tử của A, B, A ∪ B và tính P(A ∪ B).',
    conditionSummary: 'coinIdx ∈ {0, 1}, aRuleIdx ∈ [0; 4], bRuleIdx ∈ [0; 3] với A, B không bao hàm nhau và A ∪ B ≠ Ω',
    paramSpecs: [
      { name: 'coinIdx', label: 'Mặt đồng xu của A (0: Ngửa, 1: Sấp)', min: 0, max: 1 },
      { name: 'aRuleIdx', label: 'Điều kiện mặt xúc xắc của A (0..4)', min: 0, max: 4 },
      { name: 'bRuleIdx', label: 'Điều kiện của biến cố B (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { coinIdx, aRuleIdx, bRuleIdx } = params;
      if (coinIdx !== 0 && coinIdx !== 1) return { valid: false, reason: 'coinIdx phải là 0 hoặc 1' };
      if (!Number.isInteger(aRuleIdx) || aRuleIdx < 0 || aRuleIdx > 4) return { valid: false, reason: 'aRuleIdx ngoài miền [0; 4]' };
      if (!Number.isInteger(bRuleIdx) || bRuleIdx < 0 || bRuleIdx > 3) return { valid: false, reason: 'bRuleIdx ngoài miền [0; 3]' };

      const A_DIE = [[1], [1, 2], [5, 6], [2, 3, 5], [3, 6]];
      const B_DIE = [[2, 4, 6], [1, 3, 5], [5, 6], [3, 6]];
      const coinChar = coinIdx === 0 ? 'N' : 'S';
      const setA = new Set(A_DIE[aRuleIdx].map((d) => coinChar + d));
      const setB = new Set();
      for (const c of ['N', 'S']) {
        for (const d of B_DIE[bRuleIdx]) setB.add(c + d);
      }
      const union = new Set([...setA, ...setB]);
      if (union.size <= Math.max(setA.size, setB.size) || union.size >= 12) {
        return { valid: false, reason: 'Cần A, B không chứa nhau hoàn toàn và A ∪ B khác Ω' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { coinIdx, aRuleIdx, bRuleIdx } = params;
      const coinChar = coinIdx === 0 ? 'N' : 'S';
      const coinName = coinIdx === 0 ? 'ngửa' : 'sấp';
      const A_RULES = [
        { desc: 'nhỏ hơn $2$', faces: [1] },
        { desc: 'nhỏ hơn $3$', faces: [1, 2] },
        { desc: 'lớn hơn $4$', faces: [5, 6] },
        { desc: 'là số nguyên tố', faces: [2, 3, 5] },
        { desc: 'chia hết cho $3$', faces: [3, 6] },
      ];
      const B_RULES = [
        { desc: 'Xúc xắc xuất hiện mặt chứa số chẵn', faces: [2, 4, 6] },
        { desc: 'Xúc xắc xuất hiện mặt chứa số lẻ', faces: [1, 3, 5] },
        { desc: 'Xúc xắc xuất hiện mặt chứa số lớn hơn $4$', faces: [5, 6] },
        { desc: 'Xúc xắc xuất hiện mặt chứa số chia hết cho $3$', faces: [3, 6] },
      ];

      const aRule = A_RULES[aRuleIdx];
      const bRule = B_RULES[bRuleIdx];
      const listA = aRule.faces.map((d) => coinChar + d);
      const listB = [];
      for (const c of ['N', 'S']) {
        for (const d of bRule.faces) listB.push(c + d);
      }
      const unionSet = new Set([...listA, ...listB]);
      const listUnion = Array.from(unionSet);
      const interCount = listA.filter((x) => listB.includes(x)).length;

      const ansFrac = u.simplifyFrac(listUnion.length, 12);
      const correct = '$' + ansFrac.latex + '$';

      const distractorFracs = [
        u.simplifyFrac(listA.length + listB.length, 12),
        u.simplifyFrac(listA.length * listB.length, 144),
        u.simplifyFrac(12 - listUnion.length, 12),
        u.simplifyFrac(listA.length + listB.length + 12, 12),
        u.simplifyFrac(interCount > 0 ? interCount : 1, 12),
        u.simplifyFrac(listUnion.length === 11 ? 10 : listUnion.length + 1, 12),
      ].map((f) => '$' + f.latex + '$');

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractorFracs,
        rng,
        (idx) => '$' + u.simplifyFrac(idx + 1, 12).latex + '$'
      );

      return {
        stem: 'Gieo đồng thời một đồng xu và một con xúc xắc. Gọi $A$ là biến cố: "Đồng xu xuất hiện mặt ' + coinName + ' và xúc xắc xuất hiện mặt chứa số ' + aRule.desc + '". Gọi $B$ là biến cố: "' + bRule.desc + '". Tính xác suất của biến cố $A \\cup B$.',
        options,
        correctIndex,
        answerSummary: ansFrac.latex,
        solutionSteps: [
          'Số phần tử của không gian mẫu là $n(\\Omega) = 2 \\cdot 6 = 12$.',
          'Biến cố $A$ có các phần tử là $\\{' + listA.join(', ') + '\\}$ ($n(A) = ' + listA.length + '$).',
          'Biến cố $B$ có các phần tử là $\\{' + listB.join(', ') + '\\}$ ($n(B) = ' + listB.length + '$).',
          'Do đó $A \\cup B = \\{' + listUnion.join(', ') + '\\}$, suy ra $n(A \\cup B) = ' + listUnion.length + '$.',
          'Xác suất của biến cố $A \\cup B$ là $P(A \\cup B) = \\dfrac{' + listUnion.length + '}{12}' + (ansFrac.den !== 12 ? ' = ' + ansFrac.latex : '') + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên coinIdx = 2', params: { coinIdx: 2, aRuleIdx: 0, bRuleIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (Ngửa & <2; Chẵn -> 7/12)', params: { coinIdx: 0, aRuleIdx: 0, bRuleIdx: 0 }, expectedValid: true },
    ],
  },

  // D35 (Q5): Thư viện có a truyện cổ tích và b truyện ngắn, chọn k cuốn cùng thể loại
  t11_b29_d35_same_genre_books_mc: {
    id: 't11_b29_d35_same_genre_books_mc',
    name: 'Xác suất chọn sách cùng thể loại (truyện cổ tích và truyện ngắn)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Chọn ngẫu nhiên k cuốn truyện từ a truyện cổ tích và b truyện ngắn. Tính xác suất cả k cuốn cùng thể loại.',
    conditionSummary: '4 ≤ a, b ≤ 14; 3 ≤ k ≤ 10; k ≤ min(a, b)',
    paramSpecs: [
      { name: 'a', label: 'Số cuốn truyện cổ tích', min: 4, max: 14 },
      { name: 'b', label: 'Số cuốn truyện ngắn', min: 4, max: 14 },
      { name: 'k', label: 'Số cuốn chọn ngẫu nhiên', min: 3, max: 10 },
    ],
    validateCode: `
      const { a, b, k } = params;
      if (!Number.isInteger(a) || a < 4 || a > 14) return { valid: false, reason: 'a ngoài miền [4; 14]' };
      if (!Number.isInteger(b) || b < 4 || b > 14) return { valid: false, reason: 'b ngoài miền [4; 14]' };
      if (!Number.isInteger(k) || k < 3 || k > 10) return { valid: false, reason: 'k ngoài miền [3; 10]' };
      if (k > Math.min(a, b)) return { valid: false, reason: 'Cần k ≤ min(a, b)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k } = params;
      const N = a + b;
      const tot = u.comb(N, k);
      const w1 = u.comb(a, k);
      const w2 = u.comb(b, k);
      const fav = w1 + w2;
      const ansFrac = u.simplifyFrac(fav, tot);
      const correct = '$' + ansFrac.latex + '$';

      const candFracs = [
        u.simplifyFrac(w1, tot),
        u.simplifyFrac(w2, tot),
        u.simplifyFrac(tot - fav, tot),
        u.simplifyFrac(fav + 1, tot),
        u.simplifyFrac(fav, tot * 2),
      ]
        .map((f) => '$' + f.latex + '$')
        .filter((s) => s !== correct);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candFracs,
        rng,
        (idx) => '$' + u.simplifyFrac(fav + idx * 3 + 2, tot).latex + '$'
      );

      return {
        stem: 'Một thư viện có $' + a + '$ cuốn truyện cổ tích và $' + b + '$ cuốn truyện ngắn, các cuốn truyện là khác nhau. Chọn ngẫu nhiên $' + k + '$ cuốn truyện từ thư viện. Tính xác suất của biến cố "Cả $' + k + '$ cuốn truyện được chọn đều cùng thể loại truyện".',
        options,
        correctIndex,
        answerSummary: ansFrac.latex,
        solutionSteps: [
          'Số cách chọn $' + k + '$ cuốn truyện bất kì là $n(\\Omega) = C^{' + k + '}_{' + N + '} = ' + tot + '$.',
          'Số cách chọn $' + k + '$ cuốn đều là truyện cổ tích là $C^{' + k + '}_{' + a + '} = ' + w1 + '$.',
          'Số cách chọn $' + k + '$ cuốn đều là truyện ngắn là $C^{' + k + '}_{' + b + '} = ' + w2 + '$.',
          'Hai trường hợp xung khắc nên xác suất cần tính là $P = \\dfrac{' + w1 + ' + ' + w2 + '}{' + tot + '} = ' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k > min(a, b)', params: { a: 5, b: 12, k: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (11, 12, k=10 -> 1/14858)', params: { a: 11, b: 12, k: 10 }, expectedValid: true },
    ],
  },

  // D36 (Q6): Lớp có a nam và b nữ, chọn k học sinh cùng giới tính
  t11_b29_d36_same_gender_students_mc: {
    id: 't11_b29_d36_same_gender_students_mc',
    name: 'Xác suất chọn học sinh cùng giới tính (nam và nữ)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Chọn ngẫu nhiên k học sinh từ lớp gồm a nam và b nữ. Tính xác suất cả k học sinh được chọn cùng giới tính.',
    conditionSummary: '5 ≤ a, b ≤ 15; 3 ≤ k ≤ 10; k ≤ min(a, b)',
    paramSpecs: [
      { name: 'a', label: 'Số học sinh nam', min: 5, max: 15 },
      { name: 'b', label: 'Số học sinh nữ', min: 5, max: 15 },
      { name: 'k', label: 'Số học sinh được chọn', min: 3, max: 10 },
    ],
    validateCode: `
      const { a, b, k } = params;
      if (!Number.isInteger(a) || a < 5 || a > 15) return { valid: false, reason: 'a ngoài miền [5; 15]' };
      if (!Number.isInteger(b) || b < 5 || b > 15) return { valid: false, reason: 'b ngoài miền [5; 15]' };
      if (!Number.isInteger(k) || k < 3 || k > 10) return { valid: false, reason: 'k ngoài miền [3; 10]' };
      if (k > Math.min(a, b)) return { valid: false, reason: 'Cần k ≤ min(a, b)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k } = params;
      const N = a + b;
      const tot = u.comb(N, k);
      const w1 = u.comb(a, k);
      const w2 = u.comb(b, k);
      const fav = w1 + w2;
      const ansFrac = u.simplifyFrac(fav, tot);
      const correct = '$' + ansFrac.latex + '$';

      const candFracs = [
        u.simplifyFrac(w1, tot),
        u.simplifyFrac(w2, tot),
        u.simplifyFrac(tot - fav, tot),
        u.simplifyFrac(fav + 2, tot),
        u.simplifyFrac(fav, tot * 2),
      ]
        .map((f) => '$' + f.latex + '$')
        .filter((s) => s !== correct);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candFracs,
        rng,
        (idx) => '$' + u.simplifyFrac(fav + idx * 5 + 3, tot).latex + '$'
      );

      return {
        stem: 'Một lớp học có $' + a + '$ học sinh nam và $' + b + '$ học sinh nữ. Chọn ngẫu nhiên $' + k + '$ học sinh từ lớp học. Tính xác suất của biến cố "Cả $' + k + '$ học sinh được chọn đều cùng giới tính".',
        options,
        correctIndex,
        answerSummary: ansFrac.latex,
        solutionSteps: [
          'Số cách chọn $' + k + '$ học sinh bất kì là $n(\\Omega) = C^{' + k + '}_{' + N + '} = ' + tot + '$.',
          'Số cách chọn $' + k + '$ học sinh nam là $C^{' + k + '}_{' + a + '} = ' + w1 + '$.',
          'Số cách chọn $' + k + '$ học sinh nữ là $C^{' + k + '}_{' + b + '} = ' + w2 + '$.',
          'Áp dụng công thức cộng hai biến cố xung khắc, xác suất cần tính là $P = \\dfrac{' + w1 + ' + ' + w2 + '}{' + tot + '} = ' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 2', params: { a: 14, b: 11, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (14, 11, k=7 -> 9/1150)', params: { a: 14, b: 11, k: 7 }, expectedValid: true },
    ],
  },

  // D37 (Q7): Hộp có a bi đỏ và b bi vàng, chọn k bi cùng màu
  t11_b29_d37_same_color_balls_mc: {
    id: 't11_b29_d37_same_color_balls_mc',
    name: 'Xác suất chọn viên bi cùng màu từ một hộp hai màu',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Chọn ngẫu nhiên k viên bi từ hộp gồm a viên bi đỏ và b viên bi vàng. Tính xác suất cả k viên bi cùng màu.',
    conditionSummary: '4 ≤ a ≤ 14; 4 ≤ b ≤ 15; 2 ≤ k ≤ 7; k ≤ min(a, b)',
    paramSpecs: [
      { name: 'a', label: 'Số viên bi màu đỏ', min: 4, max: 14 },
      { name: 'b', label: 'Số viên bi màu vàng', min: 4, max: 15 },
      { name: 'k', label: 'Số viên bi chọn ngẫu nhiên', min: 2, max: 7 },
    ],
    validateCode: `
      const { a, b, k } = params;
      if (!Number.isInteger(a) || a < 4 || a > 14) return { valid: false, reason: 'a ngoài miền [4; 14]' };
      if (!Number.isInteger(b) || b < 4 || b > 15) return { valid: false, reason: 'b ngoài miền [4; 15]' };
      if (!Number.isInteger(k) || k < 2 || k > 7) return { valid: false, reason: 'k ngoài miền [2; 7]' };
      if (k > Math.min(a, b)) return { valid: false, reason: 'Cần k ≤ min(a, b)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k } = params;
      const N = a + b;
      const tot = u.comb(N, k);
      const w1 = u.comb(a, k);
      const w2 = u.comb(b, k);
      const fav = w1 + w2;
      const ansFrac = u.simplifyFrac(fav, tot);
      const correct = '$' + ansFrac.latex + '$';

      const candFracs = [
        u.simplifyFrac(w1, tot),
        u.simplifyFrac(w2, tot),
        u.simplifyFrac(tot - fav, tot),
        u.simplifyFrac(Math.max(1, fav - w1), tot),
        u.simplifyFrac(fav + 4, tot),
      ]
        .map((f) => '$' + f.latex + '$')
        .filter((s) => s !== correct);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candFracs,
        rng,
        (idx) => '$' + u.simplifyFrac((fav + idx * 7) % (tot - 1) + 1, tot).latex + '$'
      );

      return {
        stem: 'Một hộp có $' + a + '$ viên bi màu đỏ và $' + b + '$ viên bi màu vàng, các viên bi là khác nhau. Chọn ngẫu nhiên $' + k + '$ viên bi từ hộp. Tính xác suất của biến cố "Cả $' + k + '$ viên bi được chọn đều cùng màu".',
        options,
        correctIndex,
        answerSummary: ansFrac.latex,
        solutionSteps: [
          'Số cách chọn $' + k + '$ viên bi từ hộp là $n(\\Omega) = C^{' + k + '}_{' + N + '} = ' + tot + '$.',
          'Số cách chọn $' + k + '$ viên bi màu đỏ là $C^{' + k + '}_{' + a + '} = ' + w1 + '$.',
          'Số cách chọn $' + k + '$ viên bi màu vàng là $C^{' + k + '}_{' + b + '} = ' + w2 + '$.',
          'Do hai biến cố xung khắc nên xác suất cần tính là $P = \\dfrac{' + w1 + ' + ' + w2 + '}{' + tot + '} = ' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k > a', params: { a: 4, b: 10, k: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (8, 14, k=3 -> 3/11)', params: { a: 8, b: 14, k: 3 }, expectedValid: true },
    ],
  },

  // D38 (Q8): Thư viện có a truyện trinh thám và b truyện tiểu thuyết, chọn k cuốn cùng thể loại
  t11_b29_d38_same_genre_detective_novel_mc: {
    id: 't11_b29_d38_same_genre_detective_novel_mc',
    name: 'Xác suất chọn sách cùng thể loại (trinh thám và tiểu thuyết)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Chọn ngẫu nhiên k cuốn truyện từ a cuốn truyện trinh thám và b cuốn tiểu thuyết. Tính xác suất cả k cuốn cùng thể loại.',
    conditionSummary: '5 ≤ a, b ≤ 14; 3 ≤ k ≤ 9; k ≤ min(a, b)',
    paramSpecs: [
      { name: 'a', label: 'Số cuốn truyện trinh thám', min: 5, max: 14 },
      { name: 'b', label: 'Số cuốn truyện tiểu thuyết', min: 5, max: 14 },
      { name: 'k', label: 'Số cuốn chọn ngẫu nhiên', min: 3, max: 9 },
    ],
    validateCode: `
      const { a, b, k } = params;
      if (!Number.isInteger(a) || a < 5 || a > 14) return { valid: false, reason: 'a ngoài miền [5; 14]' };
      if (!Number.isInteger(b) || b < 5 || b > 14) return { valid: false, reason: 'b ngoài miền [5; 14]' };
      if (!Number.isInteger(k) || k < 3 || k > 9) return { valid: false, reason: 'k ngoài miền [3; 9]' };
      if (k > Math.min(a, b)) return { valid: false, reason: 'Cần k ≤ min(a, b)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k } = params;
      const N = a + b;
      const tot = u.comb(N, k);
      const w1 = u.comb(a, k);
      const w2 = u.comb(b, k);
      const fav = w1 + w2;
      const ansFrac = u.simplifyFrac(fav, tot);
      const correct = '$' + ansFrac.latex + '$';

      const candFracs = [
        u.simplifyFrac(w1, tot),
        u.simplifyFrac(w2, tot),
        u.simplifyFrac(tot - fav, tot),
        u.simplifyFrac(fav + 3, tot),
        u.simplifyFrac(fav, tot * 2),
      ]
        .map((f) => '$' + f.latex + '$')
        .filter((s) => s !== correct);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        candFracs,
        rng,
        (idx) => '$' + u.simplifyFrac(fav + idx * 11 + 5, tot).latex + '$'
      );

      return {
        stem: 'Một thư viện có $' + a + '$ cuốn truyện trinh thám và $' + b + '$ cuốn truyện tiểu thuyết, các cuốn truyện là khác nhau. Chọn ngẫu nhiên $' + k + '$ cuốn truyện từ thư viện. Tính xác suất của biến cố "Cả $' + k + '$ cuốn truyện được chọn đều cùng thể loại truyện".',
        options,
        correctIndex,
        answerSummary: ansFrac.latex,
        solutionSteps: [
          'Số cách chọn $' + k + '$ cuốn truyện là $n(\\Omega) = C^{' + k + '}_{' + N + '} = ' + tot + '$.',
          'Số cách chọn $' + k + '$ cuốn truyện trinh thám là $C^{' + k + '}_{' + a + '} = ' + w1 + '$.',
          'Số cách chọn $' + k + '$ cuốn truyện tiểu thuyết là $C^{' + k + '}_{' + b + '} = ' + w2 + '$.',
          'Xác suất cần tính là $P = \\dfrac{' + w1 + ' + ' + w2 + '}{' + tot + '} = ' + ansFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k > a', params: { a: 5, b: 13, k: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (10, 13, k=6 -> 642/33649)', params: { a: 10, b: 13, k: 6 }, expectedValid: true },
    ],
  },
};
