import { MathTemplate } from '../types/math';

export const G11_B29_ADD_SA_PART1: Record<string, MathTemplate> = {
  // D42 (Q12): Cho C, F độc lập, biết P(C) và P(C ∪ F), tính P(F)
  t11_b29_d42_indep_solve_prob_sa: {
    id: 't11_b29_d42_indep_solve_prob_sa',
    name: 'Tìm xác suất thành phần P(F) khi biết P(C) và P(C ∪ F) (độc lập)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho hai biến cố độc lập C, F với P(C) và P(C ∪ F). Sử dụng công thức cộng để tìm P(F).',
    conditionSummary: 'pA100 ∈ [20; 75], pU100 ∈ [45; 95], pA100 < pU100',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
      { name: 'pA100', label: '100·P(X)', min: 20, max: 75 },
      { name: 'pU100', label: '100·P(X ∪ Y)', min: 45, max: 95 },
    ],
    validateCode: `
      const { pairIdx, pA100, pU100 } = params;
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 3) return { valid: false, reason: 'pairIdx ngoài miền [0; 3]' };
      if (!Number.isInteger(pA100) || pA100 < 20 || pA100 > 75) return { valid: false, reason: 'pA100 ngoài miền [20; 75]' };
      if (!Number.isInteger(pU100) || pU100 < 45 || pU100 > 95) return { valid: false, reason: 'pU100 ngoài miền [45; 95]' };
      if (pU100 <= pA100) return { valid: false, reason: 'Cần P(X ∪ Y) > P(X)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, pA100, pU100 } = params;
      const PAIRS = [
        ['C', 'F'],
        ['A', 'B'],
        ['M', 'N'],
        ['E', 'K'],
      ];
      const [X, Y] = PAIRS[pairIdx];
      const pA = pA100 / 100;
      const pU = pU100 / 100;
      const num = pU100 - pA100;
      const den = 100 - pA100;
      const ans = Math.floor((200 * num + den) / (2 * den)) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Cho hai biến cố $' + X + ', ' + Y + '$ độc lập và thỏa mãn $P(' + X + ') = ' + fmt2(pA) + '$ và $P(' + X + ' \\cup ' + Y + ') = ' + fmt2(pU) + '$. Tính $P(' + Y + ')$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Vì $' + X + ', ' + Y + '$ độc lập nên $P(' + X + Y + ') = P(' + X + ') \\cdot P(' + Y + ') = ' + fmt2(pA) + 'P(' + Y + ')$.',
          'Áp dụng công thức cộng: $P(' + X + ' \\cup ' + Y + ') = P(' + X + ') + P(' + Y + ') - P(' + X + Y + ') \\Leftrightarrow ' + fmt2(pU) + ' = ' + fmt2(pA) + ' + P(' + Y + ') - ' + fmt2(pA) + 'P(' + Y + ')$.',
          'Suy ra $' + fmt2(1 - pA) + 'P(' + Y + ') = ' + fmt2(pU - pA) + ' \\Rightarrow P(' + Y + ') = \\dfrac{' + num + '}{' + den + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(C ∪ F) ≤ P(C)', params: { pairIdx: 0, pA100: 60, pU100: 55 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (0,55; 0,81 -> 0,58)', params: { pairIdx: 0, pA100: 55, pU100: 81 }, expectedValid: true },
    ],
  },

  // D43 (Q13): Hộp 4 màu bi, lấy ngẫu nhiên 2 viên cùng màu
  t11_b29_d43_four_colors_same_pair_sa: {
    id: 't11_b29_d43_four_colors_same_pair_sa',
    name: 'Xác suất lấy 2 viên bi cùng màu từ hộp gồm 4 màu bi',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hộp gồm r bi đỏ, b bi xanh, y bi vàng và w bi trắng. Lấy ngẫu nhiên 2 viên bi, tính xác suất 2 viên cùng màu.',
    conditionSummary: 'r ∈ [3; 12], b ∈ [2; 10], y ∈ [3; 12], w ∈ [2; 10]',
    paramSpecs: [
      { name: 'r', label: 'Số bi đỏ', min: 3, max: 12 },
      { name: 'b', label: 'Số bi xanh', min: 2, max: 10 },
      { name: 'y', label: 'Số bi vàng', min: 3, max: 12 },
      { name: 'w', label: 'Số bi trắng', min: 2, max: 10 },
    ],
    validateCode: `
      const { r, b, y, w } = params;
      if (!Number.isInteger(r) || r < 3 || r > 12) return { valid: false, reason: 'r ngoài miền [3; 12]' };
      if (!Number.isInteger(b) || b < 2 || b > 10) return { valid: false, reason: 'b ngoài miền [2; 10]' };
      if (!Number.isInteger(y) || y < 3 || y > 12) return { valid: false, reason: 'y ngoài miền [3; 12]' };
      if (!Number.isInteger(w) || w < 2 || w > 10) return { valid: false, reason: 'w ngoài miền [2; 10]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r, b, y, w } = params;
      const total = r + b + y + w;
      const den = u.comb(total, 2);
      const fav = u.comb(r, 2) + u.comb(b, 2) + u.comb(y, 2) + u.comb(w, 2);
      const ans = Math.floor((200 * fav + den) / (2 * den)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Một hộp đựng $' + total + '$ viên bi gồm $' + r + '$ viên bi đỏ, $' + b + '$ viên bi xanh, $' + y + '$ viên bi vàng và $' + w + '$ viên bi trắng. Lấy ngẫu nhiên từ hộp đó $2$ viên bi. Tính xác suất của biến cố “lấy được $2$ viên bi cùng màu” (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Tổng số cách chọn $2$ viên bi là $C^2_{' + total + '} = ' + den + '$.',
          'Số cách chọn $2$ viên bi cùng màu (cùng đỏ, cùng xanh, cùng vàng hoặc cùng trắng) là: $C^2_{' + r + '} + C^2_{' + b + '} + C^2_{' + y + '} + C^2_{' + w + '} = ' + fav + '$.',
          'Vậy xác suất cần tìm là $P = \\dfrac{' + fav + '}{' + den + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 1', params: { r: 1, b: 2, y: 7, w: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (8, 2, 7, 5 -> 0,26)', params: { r: 8, b: 2, y: 7, w: 5 }, expectedValid: true },
    ],
  },

  // D44 (Q14): Hai hộp bi 3 màu, lấy mỗi hộp 1 viên cùng màu
  t11_b29_d44_two_boxes_one_each_same_color_sa: {
    id: 't11_b29_d44_two_boxes_one_each_same_color_sa',
    name: 'Xác suất lấy mỗi hộp 1 viên bi được 2 viên cùng màu (3 màu)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai hộp A, B đều có bi trắng, đỏ, xanh. Lấy ngẫu nhiên mỗi hộp 1 viên bi, tính xác suất 2 viên cùng màu.',
    conditionSummary: 'w1, r1, b1, w2, r2, b2 ∈ [2; 8]',
    paramSpecs: [
      { name: 'w1', label: 'Bi trắng hộp A', min: 2, max: 8 },
      { name: 'r1', label: 'Bi đỏ hộp A', min: 2, max: 8 },
      { name: 'b1', label: 'Bi xanh hộp A', min: 2, max: 8 },
      { name: 'w2', label: 'Bi trắng hộp B', min: 2, max: 8 },
      { name: 'r2', label: 'Bi đỏ hộp B', min: 2, max: 8 },
      { name: 'b2', label: 'Bi xanh hộp B', min: 2, max: 8 },
    ],
    validateCode: `
      const { w1, r1, b1, w2, r2, b2 } = params;
      for (const v of [w1, r1, b1, w2, r2, b2]) {
        if (!Number.isInteger(v) || v < 2 || v > 8) {
          return { valid: false, reason: 'Số bi mỗi màu ngoài miền [2; 8]' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { w1, r1, b1, w2, r2, b2 } = params;
      const n1 = w1 + r1 + b1;
      const n2 = w2 + r2 + b2;
      const den = n1 * n2;
      const fav = w1 * w2 + r1 * r2 + b1 * b2;
      const fW = u.simplifyFrac(w1 * w2, den);
      const fR = u.simplifyFrac(r1 * r2, den);
      const fB = u.simplifyFrac(b1 * b2, den);
      const ans = Math.floor((200 * fav + den) / (2 * den)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Hộp $A$ có $' + w1 + '$ viên bi trắng, $' + r1 + '$ viên bi đỏ và $' + b1 + '$ viên bi xanh. Hộp $B$ có $' + w2 + '$ viên bi trắng, $' + r2 + '$ viên bi đỏ và $' + b2 + '$ viên bi xanh. Lấy ngẫu nhiên mỗi hộp một viên bi. Tính xác suất để hai viên bi được lấy ra có cùng màu (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Tổng số bi ở hộp $A$ là $' + n1 + '$, ở hộp $B$ là $' + n2 + '$.',
          'Xác suất hai viên cùng trắng: $\\dfrac{' + w1 + '}{' + n1 + '} \\cdot \\dfrac{' + w2 + '}{' + n2 + '} = ' + fW.latex + '$.',
          'Xác suất hai viên cùng đỏ: $\\dfrac{' + r1 + '}{' + n1 + '} \\cdot \\dfrac{' + r2 + '}{' + n2 + '} = ' + fR.latex + '$.',
          'Xác suất hai viên cùng xanh: $\\dfrac{' + b1 + '}{' + n1 + '} \\cdot \\dfrac{' + b2 + '}{' + n2 + '} = ' + fB.latex + '$.',
          'Vì các trường hợp xung khắc nên $P = ' + fW.latex + ' + ' + fR.latex + ' + ' + fB.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên w1 = 0', params: { w1: 0, r1: 6, b1: 3, w2: 4, r2: 4, b2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 ((2,6,3) & (4,4,4) -> 0,33)', params: { w1: 2, r1: 6, b1: 3, w2: 4, r2: 4, b2: 4 }, expectedValid: true },
    ],
  },

  // D45 (Q15): Thi đấu bóng bàn chạm 3 séc (tối đa 5 séc)
  t11_b29_d45_table_tennis_best_of_5_sa: {
    id: 't11_b29_d45_table_tennis_best_of_5_sa',
    name: 'Xác suất thắng chung cuộc trận bóng bàn chạm 3 séc',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai vận động viên đấu bóng bàn thắng trước 3 séc (tối đa 5 séc), biết xác suất thắng mỗi séc của một người là p. Tính xác suất người đó thắng chung cuộc.',
    conditionSummary: 'pairIdx ∈ [0; 3], p100 ∈ [25; 75]',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp tên người chơi (0..3)', min: 0, max: 3 },
      { name: 'p100', label: '100·P(thắng mỗi séc)', min: 25, max: 75 },
    ],
    validateCode: `
      const { pairIdx, p100 } = params;
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 3) return { valid: false, reason: 'pairIdx ngoài miền [0; 3]' };
      if (!Number.isInteger(p100) || p100 < 25 || p100 > 75) return { valid: false, reason: 'p100 ngoài miền [25; 75]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, p100 } = params;
      const PAIRS = [
        ['Mạnh', 'Chí'],
        ['An', 'Bình'],
        ['Hùng', 'Dũng'],
        ['Nam', 'Khánh'],
      ];
      const [p1Name, p2Name] = PAIRS[pairIdx];
      const p = p100 / 100;
      const q = (100 - p100) / 100;
      const p30 = Math.pow(p, 3);
      const p31 = 3 * Math.pow(p, 3) * q;
      const p32 = 6 * Math.pow(p, 3) * Math.pow(q, 2);
      const total = p30 + p31 + p32;
      const ans = Math.round(total * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const fmt3 = (v) => v.toFixed(3).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: p1Name + ' và ' + p2Name + ' thi đấu với nhau một trận bóng bàn, người thắng trước $3$ séc sẽ giành chiến thắng chung cuộc. Xác suất ' + p1Name + ' giành chiến thắng mỗi séc là $' + fmt2(p) + '$. Tính xác suất ' + p1Name + ' thắng chung cuộc biết mỗi trận đấu bóng bàn có tối đa $5$ séc (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $p = ' + fmt2(p) + '$, khi đó $q = 1 - p = ' + fmt2(q) + '$.',
          p1Name + ' thắng chung cuộc khi xảy ra một trong các trường hợp xung khắc:',
          '- Thắng $3$–$0$: $P_{3-0} = p^3 \\approx ' + fmt3(p30) + '$.',
          '- Thắng $3$–$1$: $P_{3-1} = C^2_3 \\cdot p^3 \\cdot q \\approx ' + fmt3(p31) + '$.',
          '- Thắng $3$–$2$: $P_{3-2} = C^2_4 \\cdot p^3 \\cdot q^2 \\approx ' + fmt3(p32) + '$.',
          'Vậy xác suất ' + p1Name + ' thắng chung cuộc là $P \\approx ' + fmt3(p30) + ' + ' + fmt3(p31) + ' + ' + fmt3(p32) + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p100 = 10', params: { pairIdx: 0, p100: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (0,46 -> 0,43)', params: { pairIdx: 0, p100: 46 }, expectedValid: true },
    ],
  },

  // D46 (Q16): Bữa tiệc theo giới tính và độ tuổi, tính P(A ∪ B)
  t11_b29_d46_party_union_age_gender_sa: {
    id: 't11_b29_d46_party_union_age_gender_sa',
    name: 'Xác suất chọn người là phụ nữ hoặc nhỏ hơn mốc tuổi trong buổi tiệc',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Phân loại khách mời theo giới tính (nam/nữ) và độ tuổi (không nhỏ hơn mốc / nhỏ hơn mốc). Tính xác suất chọn được phụ nữ hoặc người trẻ hơn mốc tuổi.',
    conditionSummary: 'mOld, wOld ∈ [4; 15]; mYoung, wYoung ∈ [3; 12]; ageIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'mOld', label: 'Đàn ông không nhỏ hơn mốc tuổi', min: 4, max: 15 },
      { name: 'mYoung', label: 'Đàn ông nhỏ hơn mốc tuổi', min: 3, max: 12 },
      { name: 'wOld', label: 'Phụ nữ không nhỏ hơn mốc tuổi', min: 4, max: 15 },
      { name: 'wYoung', label: 'Phụ nữ nhỏ hơn mốc tuổi', min: 3, max: 12 },
      { name: 'ageIdx', label: 'Mốc tuổi (0:25, 1:22, 2:30)', min: 0, max: 2 },
    ],
    validateCode: `
      const { mOld, mYoung, wOld, wYoung, ageIdx } = params;
      if (!Number.isInteger(mOld) || mOld < 4 || mOld > 15) return { valid: false, reason: 'mOld ngoài miền [4; 15]' };
      if (!Number.isInteger(wOld) || wOld < 4 || wOld > 15) return { valid: false, reason: 'wOld ngoài miền [4; 15]' };
      if (!Number.isInteger(mYoung) || mYoung < 3 || mYoung > 12) return { valid: false, reason: 'mYoung ngoài miền [3; 12]' };
      if (!Number.isInteger(wYoung) || wYoung < 3 || wYoung > 12) return { valid: false, reason: 'wYoung ngoài miền [3; 12]' };
      if (!Number.isInteger(ageIdx) || ageIdx < 0 || ageIdx > 2) return { valid: false, reason: 'ageIdx ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mOld, mYoung, wOld, wYoung, ageIdx } = params;
      const AGES = [25, 22, 30];
      const age = AGES[ageIdx];
      const total = mOld + mYoung + wOld + wYoung;
      const nA = wOld + wYoung;
      const nB = mYoung + wYoung;
      const nAB = wYoung;
      const nUnion = nA + nB - nAB;
      const ans = Math.floor((200 * nUnion + total) / (2 * total)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Trong một buổi tiệc có: $' + mOld + '$ người đàn ông có số tuổi không nhỏ hơn $' + age + '$; $' + mYoung + '$ người đàn ông có số tuổi nhỏ hơn $' + age + '$; $' + wOld + '$ người phụ nữ có số tuổi không nhỏ hơn $' + age + '$; và $' + wYoung + '$ người phụ nữ có số tuổi nhỏ hơn $' + age + '$. Chọn ngẫu nhiên một người trong buổi tiệc để trao quà. Tính xác suất để người đó là phụ nữ hoặc có số tuổi nhỏ hơn $' + age + '$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Tổng số người trong buổi tiệc là $' + total + '$.',
          'Gọi $A$ là biến cố “chọn được phụ nữ”, ta có $P(A) = \\dfrac{' + nA + '}{' + total + '}$.',
          'Gọi $B$ là biến cố “chọn được người có tuổi nhỏ hơn $' + age + '$”, ta có $P(B) = \\dfrac{' + nB + '}{' + total + '}$.',
          'Biến cố giao $A \\cap B$ gồm $' + nAB + '$ người phụ nữ có tuổi nhỏ hơn $' + age + '$ nên $P(A \\cap B) = \\dfrac{' + nAB + '}{' + total + '}$.',
          'Áp dụng công thức cộng: $P(A \\cup B) = \\dfrac{' + nA + '}{' + total + '} + \\dfrac{' + nB + '}{' + total + '} - \\dfrac{' + nAB + '}{' + total + '} = \\dfrac{' + nUnion + '}{' + total + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mOld = 0', params: { mOld: 0, mYoung: 6, wOld: 8, wYoung: 6, ageIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (8, 6, 8, 6 -> 0,71)', params: { mOld: 8, mYoung: 6, wOld: 8, wYoung: 6, ageIdx: 0 }, expectedValid: true },
    ],
  },

  // D47 (Q17): Hai bạn lấy bút lần lượt không hoàn lại, xác suất 2 bút cùng màu
  t11_b29_d47_two_pens_same_color_sa: {
    id: 't11_b29_d47_two_pens_same_color_sa',
    name: 'Xác suất lấy lần lượt không hoàn lại được 2 bút cùng màu',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hộp kín có số bút bi xanh và bút bi đen cho trước. Hai bạn lấy lần lượt mỗi người một chiếc không hoàn lại. Tính xác suất hai bút cùng màu.',
    conditionSummary: 'blue, black ∈ [4; 15], nameIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'blue', label: 'Số bút bi xanh', min: 4, max: 15 },
      { name: 'black', label: 'Số bút bi đen', min: 4, max: 15 },
      { name: 'nameIdx', label: 'Cặp tên học sinh (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { blue, black, nameIdx } = params;
      if (!Number.isInteger(blue) || blue < 4 || blue > 15) return { valid: false, reason: 'blue ngoài miền [4; 15]' };
      if (!Number.isInteger(black) || black < 4 || black > 15) return { valid: false, reason: 'black ngoài miền [4; 15]' };
      if (!Number.isInteger(nameIdx) || nameIdx < 0 || nameIdx > 2) return { valid: false, reason: 'nameIdx ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { blue, black, nameIdx } = params;
      const NAMES = [
        ['Sơn', 'Tùng'],
        ['Minh', 'Tuấn'],
        ['Hải', 'Long'],
      ];
      const [n1, n2] = NAMES[nameIdx];
      const total = blue + black;
      const den = u.comb(total, 2);
      const wBlue = u.comb(blue, 2);
      const wBlack = u.comb(black, 2);
      const fav = wBlue + wBlack;
      const ans = Math.floor((200 * fav + den) / (2 * den)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Trong một hộp kín có $' + blue + '$ chiếc bút bi xanh và $' + black + '$ chiếc bút bi đen. Bạn ' + n1 + ' lấy ngẫu nhiên một chiếc bút bi từ trong hộp, không trả lại. Sau đó bạn ' + n2 + ' lấy ngẫu nhiên một bút trong những chiếc bút còn lại. Tính xác suất để hai bút được lấy ra là cùng màu (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Tổng số bút là $' + total + '$. Số cách chọn $2$ bút bất kì là $C^2_{' + total + '} = ' + den + '$.',
          'Số cách lấy $2$ bút cùng màu là $C^2_{' + blue + '} + C^2_{' + black + '} = ' + wBlue + ' + ' + wBlack + ' = ' + fav + '$.',
          'Vậy xác suất cần tìm là $P = \\dfrac{' + fav + '}{' + den + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên blue = 2', params: { blue: 2, black: 7, nameIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (9 xanh, 7 đen -> 0,48)', params: { blue: 9, black: 7, nameIdx: 0 }, expectedValid: true },
    ],
  },

  // D48 (Q18): Hai bạn lấy bút lần lượt không hoàn lại, xác suất 2 bút khác màu
  t11_b29_d48_two_pens_diff_color_sa: {
    id: 't11_b29_d48_two_pens_diff_color_sa',
    name: 'Xác suất lấy lần lượt không hoàn lại được 2 bút khác màu',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hộp kín có số bút bi xanh và bút bi đen cho trước. Hai bạn lấy lần lượt mỗi người một chiếc không hoàn lại. Tính xác suất hai bút khác màu.',
    conditionSummary: 'blue, black ∈ [3; 14], nameIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'blue', label: 'Số bút bi xanh', min: 3, max: 14 },
      { name: 'black', label: 'Số bút bi đen', min: 3, max: 14 },
      { name: 'nameIdx', label: 'Cặp tên học sinh (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { blue, black, nameIdx } = params;
      if (!Number.isInteger(blue) || blue < 3 || blue > 14) return { valid: false, reason: 'blue ngoài miền [3; 14]' };
      if (!Number.isInteger(black) || black < 3 || black > 14) return { valid: false, reason: 'black ngoài miền [3; 14]' };
      if (!Number.isInteger(nameIdx) || nameIdx < 0 || nameIdx > 2) return { valid: false, reason: 'nameIdx ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { blue, black, nameIdx } = params;
      const NAMES = [
        ['Sơn', 'Tùng'],
        ['An', 'Huy'],
        ['Linh', 'Trang'],
      ];
      const [n1, n2] = NAMES[nameIdx];
      const total = blue + black;
      const den = total * (total - 1);
      const halfFav = blue * black;
      const fav = 2 * halfFav;
      const fHalf = u.simplifyFrac(halfFav, den);
      const ans = Math.floor((200 * fav + den) / (2 * den)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Trong một hộp kín có $' + blue + '$ chiếc bút bi xanh và $' + black + '$ chiếc bút bi đen. Bạn ' + n1 + ' lấy ngẫu nhiên một chiếc bút bi từ trong hộp, không trả lại. Sau đó bạn ' + n2 + ' lấy ngẫu nhiên một chiếc bút từ những chiếc bút còn lại. Tính xác suất để hai bút được lấy ra là khác màu (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Tổng số bút là $' + total + '$. Hai bút khác màu khi xảy ra một trong hai trường hợp xung khắc:',
          '- ' + n1 + ' lấy bút xanh, ' + n2 + ' lấy bút đen: $\\dfrac{' + blue + '}{' + total + '} \\cdot \\dfrac{' + black + '}{' + (total - 1) + '} = ' + fHalf.latex + '$.',
          '- ' + n1 + ' lấy bút đen, ' + n2 + ' lấy bút xanh: $\\dfrac{' + black + '}{' + total + '} \\cdot \\dfrac{' + blue + '}{' + (total - 1) + '} = ' + fHalf.latex + '$.',
          'Xác suất cần tính là $P = ' + fHalf.latex + ' + ' + fHalf.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên black = 1', params: { blue: 5, black: 1, nameIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (5 xanh, 7 đen -> 0,53)', params: { blue: 5, black: 7, nameIdx: 0 }, expectedValid: true },
    ],
  },
};
