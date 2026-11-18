import { MathTemplate } from '../types/math';

export const G11_B28_MC_PART2: Record<string, MathTemplate> = {
  // D09 (Q9): Gieo xúc xắc 2 lần; s1 < tổng số chấm < s2 -> tính |AB|
  t11_b28_d09_dice_sum_range_inter_mc: {
    id: 't11_b28_d09_dice_sum_range_inter_mc',
    name: 'Đếm số phần tử biến cố giao tổng số chấm hai lần gieo xúc xắc thuộc khoảng (s₁; s₂)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Gieo một con xúc xắc cân đối và đồng chất hai lần. Tính số phần tử của biến cố tổng số chấm lớn hơn s₁ và nhỏ hơn s₂.',
    conditionSummary: 's1 ∈ [4; 9], s2 ∈ [8; 13], s2 - s1 ≥ 2, 2 ≤ |AB| ≤ 18',
    paramSpecs: [
      { name: 's1', label: 'Chặn dưới nghiêm ngặt s₁', min: 4, max: 9 },
      { name: 's2', label: 'Chặn trên nghiêm ngặt s₂', min: 8, max: 13 },
    ],
    validateCode: `
      const { s1, s2 } = params;
      if (!Number.isInteger(s1) || s1 < 4 || s1 > 9) return { valid: false, reason: 's1 ngoài miền [4; 9]' };
      if (!Number.isInteger(s2) || s2 < 8 || s2 > 13) return { valid: false, reason: 's2 ngoài miền [8; 13]' };
      if (s2 - s1 < 2) return { valid: false, reason: 'Cần s2 - s1 ≥ 2' };
      let cnt = 0;
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 6; j++) {
          if (i + j > s1 && i + j < s2) cnt++;
        }
      }
      if (cnt < 2 || cnt > 18) return { valid: false, reason: 'Số kết quả thuận lợi ngoài [2; 18]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s1, s2 } = params;
      const pairs = [];
      let nA = 0, nB = 0;
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 6; j++) {
          const sum = i + j;
          if (sum > s1) nA++;
          if (sum < s2) nB++;
          if (sum > s1 && sum < s2) pairs.push('(' + i + ';' + j + ')');
        }
      }
      const cnt = pairs.length;
      const candWrongs = [
        cnt + 3,
        Math.max(1, cnt - 2),
        nA,
        nB - cnt,
        cnt + 5,
      ].filter((v) => v !== cnt && v > 0);
      const correct = '$' + cnt + '$';
      const wrongs = candWrongs.map((v) => '$' + v + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (cnt + idx + 6) + '$'
      );

      return {
        stem: 'Gieo đồng thời một con xúc xắc cân đối và đồng chất hai lần. Gọi $A$ là biến cố “Tổng số chấm của hai lần gieo lớn hơn $' + s1 + '$”, $B$ là biến cố “Tổng số chấm của hai lần gieo nhỏ hơn $' + s2 + '$”. Xác định số phần tử của biến cố $AB$.',
        options,
        correctIndex,
        answerSummary: String(cnt),
        solutionSteps: [
          '$AB$ là biến cố tổng số chấm của hai lần gieo lớn hơn $' + s1 + '$ và nhỏ hơn $' + s2 + '$.',
          'Các cặp kết quả thỏa mãn là $AB = \\{' + pairs.join(', ') + '\\}$.',
          'Vậy số phần tử của biến cố $AB$ là $' + cnt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên s2 = s1', params: { s1: 9, s2: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (s1=8, s2=11)', params: { s1: 8, s2: 11 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Gieo xúc xắc 2 lần; A: có ít nhất 1 mặt f chấm, B: tổng bằng S -> tính |AB|
  t11_b28_d10_dice_face_sum_inter_mc: {
    id: 't11_b28_d10_dice_face_sum_inter_mc',
    name: 'Đếm số phần tử biến cố giao: xuất hiện mặt f chấm và tổng bằng S',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Gieo một con xúc xắc hai lần. Tính số phần tử của biến cố giao có ít nhất một lần xuất hiện mặt f và tổng số chấm bằng S.',
    conditionSummary: 'f ∈ [1; 6], S ∈ [3; 11], 1 ≤ S - f ≤ 6',
    paramSpecs: [
      { name: 'f', label: 'Số chấm mặt yêu cầu f', min: 1, max: 6 },
      { name: 'sumVal', label: 'Tổng số chấm S', min: 3, max: 11 },
    ],
    validateCode: `
      const { f, sumVal } = params;
      if (!Number.isInteger(f) || f < 1 || f > 6) return { valid: false, reason: 'f ngoài miền [1; 6]' };
      if (!Number.isInteger(sumVal) || sumVal < 3 || sumVal > 11) return { valid: false, reason: 'S ngoài miền [3; 11]' };
      const other = sumVal - f;
      if (other < 1 || other > 6) return { valid: false, reason: 'Không tồn tại cặp (i, j) với i + j = S chứa f' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { f, sumVal } = params;
      const pairs = [];
      let nB = 0;
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 6; j++) {
          if (i + j === sumVal) {
            nB++;
            if (i === f || j === f) pairs.push('(' + i + ';' + j + ')');
          }
        }
      }
      const cnt = pairs.length;
      const candWrongs = [0, 6, Math.max(3, nB), 4, 3].filter((v) => v !== cnt);
      const correct = '$' + cnt + '$';
      const wrongs = candWrongs.map((v) => '$' + v + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (idx + 7) + '$'
      );

      return {
        stem: 'Gieo một con xúc xắc cân đối và đồng chất hai lần. Gọi $A$ là biến cố “Có ít nhất một lần gieo xuất hiện mặt $' + f + '$ chấm”, $B$ là biến cố “Tổng số chấm của hai lần gieo bằng $' + sumVal + '$”. Xác định số phần tử của biến cố $AB$.',
        options,
        correctIndex,
        answerSummary: String(cnt),
        solutionSteps: [
          '$AB$ là biến cố có ít nhất một lần gieo xuất hiện mặt $' + f + '$ và tổng số chấm của hai lần gieo bằng $' + sumVal + '$.',
          'Các cặp kết quả thỏa mãn là $AB = \\{' + pairs.join(', ') + '\\}$.',
          'Vậy số phần tử của biến cố $AB$ là $' + cnt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên S - f = 7 > 6', params: { f: 1, sumVal: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (f=5, S=8)', params: { f: 5, sumVal: 8 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Gieo xúc xắc 2 lần; A: tổng bằng S, B: tích nhỏ hơn P -> tính |AB|
  t11_b28_d11_dice_sum_prod_inter_mc: {
    id: 't11_b28_d11_dice_sum_prod_inter_mc',
    name: 'Đếm số phần tử biến cố giao: tổng bằng S và tích nhỏ hơn P',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Gieo một con xúc xắc hai lần. Tính số phần tử của biến cố giao có tổng số chấm bằng S và tích số chấm nhỏ hơn P.',
    conditionSummary: 'S ∈ [5; 9], P ∈ [7; 18], |AB| ≥ 1',
    paramSpecs: [
      { name: 'sumVal', label: 'Tổng số chấm S', min: 5, max: 9 },
      { name: 'prodLim', label: 'Ngưỡng tích P (tích < P)', min: 7, max: 18 },
    ],
    validateCode: `
      const { sumVal, prodLim } = params;
      if (!Number.isInteger(sumVal) || sumVal < 5 || sumVal > 9) return { valid: false, reason: 'S ngoài miền [5; 9]' };
      if (!Number.isInteger(prodLim) || prodLim < 7 || prodLim > 18) return { valid: false, reason: 'P ngoài miền [7; 18]' };
      let cnt = 0;
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 6; j++) {
          if (i + j === sumVal && i * j < prodLim) cnt++;
        }
      }
      if (cnt < 1) return { valid: false, reason: 'Cần có ít nhất 1 cặp thỏa mãn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { sumVal, prodLim } = params;
      const pairs = [];
      let nB = 0;
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 6; j++) {
          if (i * j < prodLim) nB++;
          if (i + j === sumVal && i * j < prodLim) pairs.push('(' + i + ';' + j + ')');
        }
      }
      const cnt = pairs.length;
      const candWrongs = [nB, 36 - cnt, Math.floor(nB / 2), cnt + 2].filter((v) => v !== cnt && v > 0);
      const correct = '$' + cnt + '$';
      const wrongs = candWrongs.map((v) => '$' + v + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (cnt + idx + 6) + '$'
      );

      return {
        stem: 'Gieo một con xúc xắc cân đối và đồng chất hai lần. Gọi $A$ là biến cố “Tổng số chấm của hai lần gieo bằng $' + sumVal + '$”, $B$ là biến cố “Tích số chấm của hai lần gieo nhỏ hơn $' + prodLim + '$”. Xác định số phần tử của biến cố $AB$.',
        options,
        correctIndex,
        answerSummary: String(cnt),
        solutionSteps: [
          '$AB$ là biến cố tổng số chấm của hai lần gieo bằng $' + sumVal + '$ và tích số chấm của hai lần gieo nhỏ hơn $' + prodLim + '$.',
          'Các cặp kết quả thỏa mãn là $AB = \\{' + pairs.join(', ') + '\\}$.',
          'Vậy số phần tử của biến cố $AB$ là $' + cnt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên S=9, P=7 (3*6=18 ≥ 7)', params: { sumVal: 9, prodLim: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (S=7, P=11)', params: { sumVal: 7, prodLim: 11 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Diễn tả bằng lời biến cố giao A_k ∩ A_m khi lấy bi có hoàn lại
  t11_b28_d12_urn_replace_inter_desc_mc: {
    id: 't11_b28_d12_urn_replace_inter_desc_mc',
    name: 'Mô tả bằng lời biến cố giao Aₖ ∩ Aₘ trong phép thử có hoàn lại',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Xác định mệnh đề mô tả đúng biến cố giao của hai lần rút có hoàn lại thứ k và thứ m.',
    conditionSummary: 'n ∈ [10; 25], N ∈ [5; 10], 1 ≤ k < m ≤ N, colorIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'n', label: 'Số viên bi trong hộp n', min: 10, max: 25 },
      { name: 'N', label: 'Tổng số lần rút có hoàn lại N', min: 5, max: 10 },
      { name: 'k', label: 'Chỉ số lần rút thứ nhất k', min: 1, max: 5 },
      { name: 'delta', label: 'Khoảng cách m - k', min: 1, max: 4 },
      { name: 'colorIdx', label: 'Màu viên bi (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { n, N, k, delta, colorIdx } = params;
      if (!Number.isInteger(n) || n < 10 || n > 25) return { valid: false, reason: 'n ngoài miền [10; 25]' };
      if (!Number.isInteger(N) || N < 5 || N > 10) return { valid: false, reason: 'N ngoài miền [5; 10]' };
      if (!Number.isInteger(k) || k < 1 || k > 5) return { valid: false, reason: 'k ngoài miền [1; 5]' };
      if (!Number.isInteger(delta) || delta < 1 || delta > 4) return { valid: false, reason: 'delta ngoài miền [1; 4]' };
      if (k + delta > N) return { valid: false, reason: 'Cần m = k + delta ≤ N' };
      if (!Number.isInteger(colorIdx) || colorIdx < 0 || colorIdx > 3) return { valid: false, reason: 'colorIdx ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, N, k, delta, colorIdx } = params;
      const m = k + delta;
      const COLORS = ['đỏ', 'xanh', 'vàng', 'tím'];
      const color = COLORS[colorIdx];

      const correct = 'Cả hai lần lấy thứ $' + k + '$ và thứ $' + m + '$ đều lấy được bi màu ' + color;
      const wrongs = [
        'Lần rút đầu tiên lấy được bi màu ' + color + ' là lần lấy thứ $' + k + '$',
        'Cả hai lần lấy thứ $' + k + '$ và thứ $' + m + '$ đều không lấy được bi màu ' + color,
        'Ít nhất một trong hai lần lấy thứ $' + k + '$ và thứ $' + m + '$ lấy được bi màu ' + color,
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Một hộp chứa $' + n + '$ viên bi có màu sắc khác nhau. Lấy ngẫu nhiên một viên bi, quan sát màu sắc rồi trả lại vào hộp. Tiếp tục lấy lần $2$ rồi trả lại, cứ tiếp tục như thế đến $' + N + '$ lần. Gọi $A_i$ là biến cố “Lần thứ $i$ lấy được viên bi màu ' + color + '”. Mệnh đề nào dưới đây mô tả biến cố $A_' + k + ' \\cap A_' + m + '$?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Biến cố giao $A_' + k + ' \\cap A_' + m + '$ xảy ra khi và chỉ khi cả $A_' + k + '$ và $A_' + m + '$ cùng xảy ra.',
          'Do đó $A_' + k + ' \\cap A_' + m + '$ là biến cố: “Cả hai lần lấy thứ $' + k + '$ và thứ $' + m + '$ đều lấy được bi màu ' + color + '”.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k + delta > N', params: { n: 17, N: 6, k: 4, delta: 3, colorIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (n=17, N=7, k=4, m=5, đỏ)', params: { n: 17, N: 7, k: 4, delta: 1, colorIdx: 0 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Diễn tả biến cố hợp P ∪ Q của hai biến cố chọn 2 bi cùng màu A hoặc cùng màu B
  t11_b28_d13_two_colors_union_desc_mc: {
    id: 't11_b28_d13_two_colors_union_desc_mc',
    name: 'Diễn tả biến cố hợp P ∪ Q khi chọn hai viên bi cùng màu',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Hộp gồm a bi màu C₁ và b bi màu C₂. Xác định biến cố hợp của hai biến cố lấy được 2 bi màu C₁ và 2 bi màu C₂.',
    conditionSummary: 'a ∈ [8; 25], b ∈ [8; 30], pairIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'a', label: 'Số bi màu thứ nhất a', min: 8, max: 25 },
      { name: 'b', label: 'Số bi màu thứ hai b', min: 8, max: 30 },
      { name: 'pairIdx', label: 'Cặp màu (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, pairIdx } = params;
      if (!Number.isInteger(a) || a < 8 || a > 25) return { valid: false, reason: 'a ngoài miền [8; 25]' };
      if (!Number.isInteger(b) || b < 8 || b > 30) return { valid: false, reason: 'b ngoài miền [8; 30]' };
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 3) return { valid: false, reason: 'pairIdx ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, pairIdx } = params;
      const PAIRS = [
        { c1: 'xanh dương', c2: 'nâu' },
        { c1: 'đỏ', c2: 'vàng' },
        { c1: 'trắng', c2: 'đen' },
        { c1: 'xanh lá', c2: 'tím' },
      ];
      const p = PAIRS[pairIdx];
      const correct = 'Hai viên bi lấy ra có cùng màu';
      const wrongs = [
        'Hai viên bi lấy ra chỉ có màu ' + p.c2,
        'Hai viên bi lấy ra có màu khác nhau',
        'Hai viên bi lấy ra chỉ có màu ' + p.c1,
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Một hộp chứa $' + a + '$ viên bi màu ' + p.c1 + ' và $' + b + '$ viên bi màu ' + p.c2 + '. Lấy ngẫu nhiên hai viên bi. Xét các biến cố:\n$P$: “Hai viên bi lấy được có màu ' + p.c1 + '”.\n$Q$: “Hai viên bi lấy được có màu ' + p.c2 + '”.\nKhi đó biến cố hợp của hai biến cố $P$ và $Q$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Biến cố hợp $P \\cup Q$ xảy ra khi $P$ hoặc $Q$ xảy ra, tức là hai viên bi lấy được hoặc đều màu ' + p.c1 + ' hoặc đều màu ' + p.c2 + '.',
          'Do đó $P \\cup Q$ là biến cố “Hai viên bi lấy ra có cùng màu”.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 7', params: { a: 7, b: 20, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (a=12 xanh dương, b=20 nâu)', params: { a: 12, b: 20, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Diễn tả bằng lời biến cố hợp A_k ∪ A_m khi lấy bi có hoàn lại
  t11_b28_d14_urn_replace_union_desc_mc: {
    id: 't11_b28_d14_urn_replace_union_desc_mc',
    name: 'Mô tả bằng lời biến cố hợp Aₖ ∪ Aₘ trong phép thử có hoàn lại',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Xác định mệnh đề mô tả đúng biến cố hợp của hai lần rút có hoàn lại thứ k và thứ m.',
    conditionSummary: 'n ∈ [10; 25], N ∈ [5; 10], 1 ≤ k < m ≤ N, colorIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'n', label: 'Số viên bi trong hộp n', min: 10, max: 25 },
      { name: 'N', label: 'Tổng số lần rút có hoàn lại N', min: 5, max: 10 },
      { name: 'k', label: 'Chỉ số lần rút thứ nhất k', min: 1, max: 5 },
      { name: 'delta', label: 'Khoảng cách m - k', min: 1, max: 4 },
      { name: 'colorIdx', label: 'Màu viên bi (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { n, N, k, delta, colorIdx } = params;
      if (!Number.isInteger(n) || n < 10 || n > 25) return { valid: false, reason: 'n ngoài miền [10; 25]' };
      if (!Number.isInteger(N) || N < 5 || N > 10) return { valid: false, reason: 'N ngoài miền [5; 10]' };
      if (!Number.isInteger(k) || k < 1 || k > 5) return { valid: false, reason: 'k ngoài miền [1; 5]' };
      if (!Number.isInteger(delta) || delta < 1 || delta > 4) return { valid: false, reason: 'delta ngoài miền [1; 4]' };
      if (k + delta > N) return { valid: false, reason: 'Cần m = k + delta ≤ N' };
      if (!Number.isInteger(colorIdx) || colorIdx < 0 || colorIdx > 3) return { valid: false, reason: 'colorIdx ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, N, k, delta, colorIdx } = params;
      const m = k + delta;
      const COLORS = ['đen', 'trắng', 'cam', 'xanh lá'];
      const color = COLORS[colorIdx];

      const correct = 'Lần lấy thứ $' + k + '$ hoặc thứ $' + m + '$ lấy được bi màu ' + color;
      const wrongs = [
        'Cả hai lần lấy thứ $' + k + '$ và thứ $' + m + '$ đều không lấy được bi màu ' + color,
        'Lần rút đầu tiên lấy được bi màu ' + color + ' là lần lấy thứ $' + (k + 1) + '$',
        'Cả hai lần lấy thứ $' + k + '$ và thứ $' + m + '$ đều lấy được bi màu ' + color,
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Một hộp chứa $' + n + '$ viên bi có màu sắc khác nhau. Lấy ngẫu nhiên một viên bi, quan sát màu sắc rồi trả lại vào hộp. Tiếp tục lấy lần $2$ rồi trả lại, cứ tiếp tục như thế đến $' + N + '$ lần. Gọi $A_i$ là biến cố “Lần thứ $i$ lấy được viên bi màu ' + color + '”. Mệnh đề nào dưới đây mô tả biến cố $A_' + k + ' \\cup A_' + m + '$?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Biến cố hợp $A_' + k + ' \\cup A_' + m + '$ xảy ra khi ít nhất một trong hai biến cố $A_' + k + '$ hoặc $A_' + m + '$ xảy ra.',
          'Do đó $A_' + k + ' \\cup A_' + m + '$ là biến cố: “Lần lấy thứ $' + k + '$ hoặc thứ $' + m + '$ lấy được bi màu ' + color + '”.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên delta = 0', params: { n: 13, N: 8, k: 1, delta: 0, colorIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (n=13, N=8, k=1, m=3, đen)', params: { n: 13, N: 8, k: 1, delta: 2, colorIdx: 0 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Gieo đồng thời đồng xu và xúc xắc -> tính |A ∪ B|
  t11_b28_d15_coin_die_union_count_mc: {
    id: 't11_b28_d15_coin_die_union_count_mc',
    name: 'Đếm số phần tử biến cố hợp khi gieo đồng thời đồng xu và xúc xắc',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Gieo đồng thời đồng xu và xúc xắc. Đếm số phần tử của biến cố hợp A ∪ B.',
    conditionSummary: 'sideIdx ∈ {0, 1}, condAIdx ∈ {0, 1}, condBIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'sideIdx', label: 'Mặt đồng xu ở A (0: sấp, 1: ngửa)', min: 0, max: 1 },
      { name: 'condAIdx', label: 'Số chấm ở A (0: lẻ, 1: chẵn)', min: 0, max: 1 },
      { name: 'condBIdx', label: 'Điều kiện số chấm ở B (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { sideIdx, condAIdx, condBIdx } = params;
      if (sideIdx !== 0 && sideIdx !== 1) return { valid: false, reason: 'sideIdx phải là 0 hoặc 1' };
      if (condAIdx !== 0 && condAIdx !== 1) return { valid: false, reason: 'condAIdx phải là 0 hoặc 1' };
      if (!Number.isInteger(condBIdx) || condBIdx < 0 || condBIdx > 3) return { valid: false, reason: 'condBIdx ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { sideIdx, condAIdx, condBIdx } = params;
      const coinChar = sideIdx === 0 ? 'S' : 'N';
      const coinWord = sideIdx === 0 ? 'sấp' : 'ngửa';
      const aNums = condAIdx === 0 ? [1, 3, 5] : [2, 4, 6];
      const aDesc = condAIdx === 0 ? 'số lẻ' : 'số chẵn';

      const B_CONDS = [
        { nums: [2, 3, 5], desc: 'số nguyên tố' },
        { nums: [2, 4, 6], desc: 'số chia hết cho $2$' },
        { nums: [4, 5, 6], desc: 'số lớn hơn $3$' },
        { nums: [3, 6], desc: 'số chia hết cho $3$' },
      ];
      const bCond = B_CONDS[condBIdx];

      const setA = aNums.map((x) => coinChar + x);
      const setB = [];
      for (const ch of ['N', 'S']) {
        for (const x of bCond.nums) setB.push(ch + x);
      }
      const unionSet = Array.from(new Set([...setA, ...setB])).sort();
      const cnt = unionSet.length;

      const candWrongs = [2, 12, 14, 10, cnt + 2, Math.max(1, cnt - 2)].filter((v) => v !== cnt && v > 0);
      const correct = '$' + cnt + '$';
      const wrongs = candWrongs.map((v) => '$' + v + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wrongs,
        rng,
        (idx) => '$' + (cnt + idx + 5) + '$'
      );

      return {
        stem: 'Gieo đồng thời một đồng xu và một con xúc xắc.\nGọi $A$ là biến cố: “Đồng xu xuất hiện mặt ' + coinWord + ' và xúc xắc xuất hiện mặt chứa ' + aDesc + '”.\nGọi $B$ là biến cố: “Xúc xắc xuất hiện mặt chứa ' + bCond.desc + '”.\nSố phần tử của biến cố $A \\cup B$ là',
        options,
        correctIndex,
        answerSummary: String(cnt),
        solutionSteps: [
          'Biến cố $A$ có các phần tử là $\\{' + setA.join(', ') + '\\}$.',
          'Biến cố $B$ có các phần tử là $\\{' + setB.join(', ') + '\\}$.',
          'Suy ra biến cố $A \\cup B = \\{' + unionSet.join(', ') + '\\}$, nên số phần tử của $A \\cup B$ là $' + cnt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên condBIdx = 4', params: { sideIdx: 0, condAIdx: 0, condBIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (Sấp, lẻ, nguyên tố -> 7)', params: { sideIdx: 0, condAIdx: 0, condBIdx: 0 }, expectedValid: true },
    ],
  },
};
