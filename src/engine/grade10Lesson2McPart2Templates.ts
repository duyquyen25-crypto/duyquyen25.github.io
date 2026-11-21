import { MathTemplate } from '../types/math';

export const G10_B2_MC_PART2_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 15 (Q15 - MC): Giao hai tập hợp liệt kê A ∩ B
  t10_b2_d15_intersection_listed_mc: {
    id: 't10_b2_d15_intersection_listed_mc',
    name: 'Tìm giao của hai tập hợp liệt kê (A ∩ B)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép giao hai tập hợp',
    description: 'Cho hai tập hợp số nguyên A, B được liệt kê phần tử. Tìm tập hợp giao A ∩ B.',
    conditionSummary: '7 số nguyên phân biệt chia thành phần chung (2 phần tử), chỉ thuộc A (2 phần tử), chỉ thuộc B (3 phần tử)',
    paramSpecs: [
      { name: 'c1', label: 'Phần tử chung 1', min: -8, max: 2 },
      { name: 'c2', label: 'Phần tử chung 2', min: 3, max: 10 },
      { name: 'a1', label: 'Chỉ thuộc A (1)', min: -3, max: 4 },
      { name: 'a2', label: 'Chỉ thuộc A (2)', min: 1, max: 9 },
      { name: 'b1', label: 'Chỉ thuộc B (1)', min: -12, max: -5 },
      { name: 'b2', label: 'Chỉ thuộc B (2)', min: -9, max: -2 },
      { name: 'b3', label: 'Chỉ thuộc B (3)', min: 5, max: 14 },
    ],
    validateCode: `
      const vals = [params.c1, params.c2, params.a1, params.a2, params.b1, params.b2, params.b3];
      if (!vals.every((v) => Number.isInteger(v) && Math.abs(v) <= 50)) {
        return { valid: false, reason: 'Các phần tử phải nguyên trong [-50; 50]' };
      }
      if (new Set(vals).size !== 7) {
        return { valid: false, reason: 'Cả 7 phần tử phải đôi một phân biệt' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c1, c2, a1, a2, b1, b2, b3 } = params;
      const sortNum = (arr) => [...arr].sort((x, y) => x - y);
      const fmt = (arr) => '$\\{' + sortNum(arr).join(';\\, ') + '\\}$';
      const setA = sortNum([a1, a2, c1, c2]);
      const setB = sortNum([b1, b2, b3, c1, c2]);
      const inter = sortNum([c1, c2]);
      const union = sortNum([a1, a2, b1, b2, b3, c1, c2]);
      const onlyA = sortNum([a1, a2]);
      const onlyB = sortNum([b1, b2, b3]);
      const correct = fmt(inter);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmt(union), fmt(onlyA), fmt(onlyB)],
        rng,
        (step) => '$\\{' + (c1 + step) + '\\}$'
      );
      return {
        stem: 'Cho hai tập hợp $A = \\{' + setA.join(';\\, ') + '\\}$ và $B = \\{' + setB.join(';\\, ') + '\\}$. Tìm tập hợp $A \\cap B$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập hợp $A \\cap B$ gồm các phần tử thuộc cả $A$ và $B$.',
          'Các phần tử chung của $A$ và $B$ là $' + inter.join('$ và $') + '$, nên $A \\cap B = \\{' + inter.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên phần tử trùng', params: { c1: -1, c2: 4, a1: 4, a2: 3, b1: -9, b2: -5, b3: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15: A ∩ B = {-1; 4}', params: { c1: -1, c2: 4, a1: 0, a2: 3, b1: -9, b2: -5, b3: 6 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16 - MC): Hợp hai tập hợp liệt kê A ∪ B
  t10_b2_d16_union_listed_mc: {
    id: 't10_b2_d16_union_listed_mc',
    name: 'Tìm hợp của hai tập hợp liệt kê (A ∪ B)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép hợp hai tập hợp',
    description: 'Cho hai tập hợp số nguyên A, B được liệt kê phần tử. Tìm tập hợp hợp A ∪ B.',
    conditionSummary: '9 phần tử nguyên đôi một phân biệt (2 chung, 3 chỉ A, 4 chỉ B)',
    paramSpecs: [
      { name: 'c1', label: 'Phần tử chung 1', min: -5, max: 0 },
      { name: 'c2', label: 'Phần tử chung 2', min: 3, max: 8 },
      { name: 'a1', label: 'Chỉ A (1)', min: -4, max: 2 },
      { name: 'a2', label: 'Chỉ A (2)', min: -1, max: 5 },
      { name: 'a3', label: 'Chỉ A (3)', min: 1, max: 9 },
      { name: 'b1', label: 'Chỉ B (1)', min: -9, max: -3 },
      { name: 'b2', label: 'Chỉ B (2)', min: 1, max: 6 },
      { name: 'b3', label: 'Chỉ B (3)', min: 2, max: 9 },
      { name: 'b4', label: 'Chỉ B (4)', min: 6, max: 14 },
    ],
    validateCode: `
      const vals = [params.c1, params.c2, params.a1, params.a2, params.a3, params.b1, params.b2, params.b3, params.b4];
      if (!vals.every((v) => Number.isInteger(v) && Math.abs(v) <= 50)) return { valid: false, reason: 'Các phần tử phải nguyên trong [-50; 50]' };
      if (new Set(vals).size !== 9) return { valid: false, reason: 'Cả 9 phần tử phải đôi một phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c1, c2, a1, a2, a3, b1, b2, b3, b4 } = params;
      const sortNum = (arr) => [...arr].sort((x, y) => x - y);
      const fmt = (arr) => '$\\{' + sortNum(arr).join(';\\, ') + '\\}$';
      const setA = sortNum([a1, a2, a3, c1, c2]);
      const setB = sortNum([b1, b2, b3, b4, c1, c2]);
      const union = sortNum([a1, a2, a3, b1, b2, b3, b4, c1, c2]);
      const inter = sortNum([c1, c2]);
      const onlyA = sortNum([a1, a2, a3]);
      const onlyB = sortNum([b1, b2, b3, b4]);
      const correct = fmt(union);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmt(onlyB), fmt(inter), fmt(onlyA)],
        rng,
        (step) => fmt([...inter, step + 20])
      );
      return {
        stem: 'Cho hai tập hợp $A = \\{' + setA.join(';\\, ') + '\\}$ và $B = \\{' + setB.join(';\\, ') + '\\}$. Tìm tập hợp $A \\cup B$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập hợp $A \\cup B$ gồm tất cả các phần tử thuộc $A$ hoặc thuộc $B$ (mỗi phần tử chỉ viết một lần).',
          'Vậy $A \\cup B = \\{' + union.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên trùng phần tử', params: { c1: -2, c2: 4, a1: -1, a2: 0, a3: 1, b1: -5, b2: 2, b3: 2, b4: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16: A ∪ B', params: { c1: -2, c2: 4, a1: -1, a2: 0, a3: 1, b1: -5, b2: 2, b3: 3, b4: 7 }, expectedValid: true },
    ],
  },

  // Dạng 17 (Q17 - MC): Hiệu hai tập hợp liệt kê A \ B
  t10_b2_d17_difference_listed_mc: {
    id: 't10_b2_d17_difference_listed_mc',
    name: 'Tìm hiệu của hai tập hợp liệt kê (A \\ B)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép hiệu hai tập hợp',
    description: 'Cho hai tập hợp số nguyên A, B được liệt kê phần tử. Tìm tập hợp hiệu A \\ B.',
    conditionSummary: '8 phần tử nguyên đôi một phân biệt (3 chung, 2 chỉ A, 3 chỉ B)',
    paramSpecs: [
      { name: 'c1', label: 'Phần tử chung 1', min: -8, max: -2 },
      { name: 'c2', label: 'Phần tử chung 2', min: -4, max: 1 },
      { name: 'c3', label: 'Phần tử chung 3', min: 1, max: 6 },
      { name: 'a1', label: 'Chỉ A (1)', min: -2, max: 4 },
      { name: 'a2', label: 'Chỉ A (2)', min: 2, max: 9 },
      { name: 'b1', label: 'Chỉ B (1)', min: -12, max: -5 },
      { name: 'b2', label: 'Chỉ B (2)', min: 4, max: 10 },
      { name: 'b3', label: 'Chỉ B (3)', min: 6, max: 15 },
    ],
    validateCode: `
      const vals = [params.c1, params.c2, params.c3, params.a1, params.a2, params.b1, params.b2, params.b3];
      if (!vals.every((v) => Number.isInteger(v) && Math.abs(v) <= 50)) return { valid: false, reason: 'Các phần tử phải nguyên trong [-50; 50]' };
      if (new Set(vals).size !== 8) return { valid: false, reason: 'Cả 8 phần tử phải đôi một phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c1, c2, c3, a1, a2, b1, b2, b3 } = params;
      const sortNum = (arr) => [...arr].sort((x, y) => x - y);
      const fmt = (arr) => '$\\{' + sortNum(arr).join(';\\, ') + '\\}$';
      const setA = sortNum([a1, a2, c1, c2, c3]);
      const setB = sortNum([b1, b2, b3, c1, c2, c3]);
      const onlyA = sortNum([a1, a2]);
      const onlyB = sortNum([b1, b2, b3]);
      const inter = sortNum([c1, c2, c3]);
      const union = sortNum([a1, a2, b1, b2, b3, c1, c2, c3]);
      const correct = fmt(onlyA);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmt(onlyB), fmt(inter), fmt(union)],
        rng,
        (step) => '$\\{' + (a1 + step + 20) + '\\}$'
      );
      return {
        stem: 'Cho hai tập hợp $A = \\{' + setA.join(';\\, ') + '\\}$ và $B = \\{' + setB.join(';\\, ') + '\\}$. Tìm tập hợp $A \\setminus B$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập hợp $A \\setminus B$ gồm các phần tử thuộc $A$ nhưng không thuộc $B$.',
          'Loại bỏ các phần tử chung $\\{' + inter.join(';\\, ') + '\\}$ khỏi $A$, ta được $A \\setminus B = \\{' + onlyA.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên trùng phần tử', params: { c1: -4, c2: -1, c3: 2, a1: 2, a2: 3, b1: -7, b2: 6, b3: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17: A \\ B = {1; 3}', params: { c1: -4, c2: -1, c3: 2, a1: 1, a2: 3, b1: -7, b2: 6, b3: 7 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18 - MC): Phần bù C_M N (kết quả có nhiều phần tử)
  t10_b2_d18_complement_multi_mc: {
    id: 't10_b2_d18_complement_multi_mc',
    name: 'Tìm phần bù C_M N khi N ⊂ M (phần bù có từ 2 phần tử)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phần bù của tập con',
    description: 'Cho N ⊂ M với M có 7 phần tử và N có 5 phần tử. Tìm tập hợp phần bù C_M N = M \\ N.',
    conditionSummary: '7 phần tử nguyên đôi một phân biệt',
    paramSpecs: [
      { name: 'n1', label: 'Phần tử N (1)', min: -10, max: -4 },
      { name: 'n2', label: 'Phần tử N (2)', min: -6, max: -2 },
      { name: 'n3', label: 'Phần tử N (3)', min: -3, max: 1 },
      { name: 'n4', label: 'Phần tử N (4)', min: -1, max: 4 },
      { name: 'n5', label: 'Phần tử N (5)', min: 2, max: 7 },
      { name: 'e1', label: 'Phần tử phần bù 1', min: 5, max: 12 },
      { name: 'e2', label: 'Phần tử phần bù 2', min: 8, max: 16 },
    ],
    validateCode: `
      const vals = [params.n1, params.n2, params.n3, params.n4, params.n5, params.e1, params.e2];
      if (!vals.every((v) => Number.isInteger(v) && Math.abs(v) <= 50)) return { valid: false, reason: 'Các phần tử phải nguyên trong [-50; 50]' };
      if (new Set(vals).size !== 7) return { valid: false, reason: 'Cả 7 phần tử phải đôi một phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, n3, n4, n5, e1, e2 } = params;
      const sortNum = (arr) => [...arr].sort((x, y) => x - y);
      const fmt = (arr) => '$\\{' + sortNum(arr).join(';\\, ') + '\\}$';
      const setN = sortNum([n1, n2, n3, n4, n5]);
      const setM = sortNum([n1, n2, n3, n4, n5, e1, e2]);
      const comp = sortNum([e1, e2]);
      const correct = fmt(comp);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmt(setN), fmt(setM), '$\\emptyset$'],
        rng,
        (step) => '$\\{' + (e1 + step) + '\\}$'
      );
      return {
        stem: 'Cho hai tập hợp $M = \\{' + setM.join(';\\, ') + '\\}$ và $N = \\{' + setN.join(';\\, ') + '\\}$. Tìm tập hợp $C_M N$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta thấy mọi phần tử của $N$ đều thuộc $M$, tức là $N \\subset M$.',
          'Do đó $C_M N = M \\setminus N = \\{' + comp.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên e1 = e2', params: { n1: -5, n2: -3, n3: -1, n4: 0, n5: 3, e1: 6, e2: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18: C_M N = {6; 9}', params: { n1: -5, n2: -3, n3: -1, n4: 0, n5: 3, e1: 6, e2: 9 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19 - MC): Phần bù C_M N (kết quả có đúng 1 phần tử)
  t10_b2_d19_complement_single_mc: {
    id: 't10_b2_d19_complement_single_mc',
    name: 'Tìm phần bù C_M N khi N ⊂ M (phần bù có đúng 1 phần tử)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phần bù của tập con',
    description: 'Cho N ⊂ M với M hơn N đúng 1 phần tử. Tìm tập hợp phần bù C_M N.',
    conditionSummary: '5 phần tử nguyên đôi một phân biệt',
    paramSpecs: [
      { name: 'n1', label: 'Phần tử N (1)', min: -10, max: -4 },
      { name: 'n2', label: 'Phần tử N (2)', min: -7, max: -2 },
      { name: 'n3', label: 'Phần tử N (3)', min: -3, max: 2 },
      { name: 'n4', label: 'Phần tử N (4)', min: 3, max: 12 },
      { name: 'e1', label: 'Phần tử phần bù duy nhất', min: -2, max: 6 },
    ],
    validateCode: `
      const vals = [params.n1, params.n2, params.n3, params.n4, params.e1];
      if (!vals.every((v) => Number.isInteger(v) && Math.abs(v) <= 50)) return { valid: false, reason: 'Các phần tử phải nguyên trong [-50; 50]' };
      if (new Set(vals).size !== 5) return { valid: false, reason: 'Cả 5 phần tử phải đôi một phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, n3, n4, e1 } = params;
      const sortNum = (arr) => [...arr].sort((x, y) => x - y);
      const fmt = (arr) => '$\\{' + sortNum(arr).join(';\\, ') + '\\}$';
      const setN = sortNum([n1, n2, n3, n4]);
      const setM = sortNum([n1, n2, n3, n4, e1]);
      const correct = '$\\{' + e1 + '\\}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmt(setN), fmt(setM), '$\\emptyset$'],
        rng,
        (step) => '$\\{' + (e1 + step) + '\\}$'
      );
      return {
        stem: 'Cho hai tập hợp $M = \\{' + setM.join(';\\, ') + '\\}$ và $N = \\{' + setN.join(';\\, ') + '\\}$. Tìm tập hợp $C_M N$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $N \\subset M$ nên phần bù của $N$ trong $M$ là $C_M N = M \\setminus N = \\{' + e1 + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên e1 trùng phần tử của N', params: { n1: -5, n2: -4, n3: -1, n4: 7, e1: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19: C_M N = {0}', params: { n1: -5, n2: -4, n3: -1, n4: 7, e1: 0 }, expectedValid: true },
    ],
  },

  // Dạng 20 (Q20 - MC): Giao hai tập số nguyên cho bởi bất đẳng thức M ∩ N
  t10_b2_d20_intersection_int_intervals_mc: {
    id: 't10_b2_d20_intersection_int_intervals_mc',
    name: 'Tìm giao của hai tập hợp số nguyên cho bởi bất đẳng thức (M ∩ N)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép giao trên tập số nguyên',
    description: 'Liệt kê hai tập M = {x ∈ Z | a < x ≤ b} và N = {x ∈ Z | c ≤ x < d} giao nhau, sau đó tìm M ∩ N.',
    conditionSummary: 'a < c - 1, c <= b < d - 1, mỗi phần chỉ thuộc M, chung, chỉ thuộc N đều khác rỗng',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái a của M (a < x)', min: -10, max: -2 },
      { name: 'c', label: 'Đầu mút trái c của N (c ≤ x)', min: -6, max: 2 },
      { name: 'b', label: 'Đầu mút phải b của M (x ≤ b)', min: -3, max: 5 },
      { name: 'd', label: 'Đầu mút phải d của N (x < d)', min: 0, max: 9 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (![a, b, c, d].every((v) => Number.isInteger(v) && Math.abs(v) <= 25)) {
        return { valid: false, reason: 'Các đầu mút phải nguyên trong [-25; 25]' };
      }
      const mLo = a + 1, mHi = b;
      const nLo = c, nHi = d - 1;
      if (!(mLo < nLo && nLo <= mHi && mHi < nHi)) {
        return { valid: false, reason: 'Cần hai tập cắt nhau thực sự: a+1 < c <= b < d-1' };
      }
      if (mHi - mLo > 9 || nHi - nLo > 9) {
        return { valid: false, reason: 'Số phần tử mỗi tập không vượt quá 10' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const range = (lo, hi) => {
        const res = [];
        for (let x = lo; x <= hi; x++) res.push(x);
        return res;
      };
      const fmt = (arr) => '$\\{' + arr.join(';\\, ') + '\\}$';
      const setM = range(a + 1, b);
      const setN = range(c, d - 1);
      const inter = range(c, b);
      const onlyM = range(a + 1, c - 1);
      const onlyN = range(b + 1, d - 1);
      const union = range(a + 1, d - 1);
      const correct = fmt(inter);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmt(onlyN), fmt(union), fmt(onlyM)],
        rng,
        (step) => fmt(range(c, b + step))
      );
      return {
        stem:
          'Cho hai tập hợp $M = \\{x \\in \\mathbb{Z} \\mid ' + a + ' < x \\le ' + b + '\\}$ và $N = \\{x \\in \\mathbb{Z} \\mid ' + c + ' \\le x < ' + d + '\\}$. Tìm tập hợp $M \\cap N$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $M = \\{' + setM.join(';\\, ') + '\\}$ và $N = \\{' + setN.join(';\\, ') + '\\}$.',
          'Do đó $M \\cap N = \\{' + inter.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rời nhau', params: { a: -6, b: -4, c: -1, d: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20: M∩N = {-3;-2;-1;0}', params: { a: -6, b: 0, c: -3, d: 2 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21 - MC): Hợp hai tập số nguyên rời nhau C ∪ D
  t10_b2_d21_union_disjoint_int_intervals_mc: {
    id: 't10_b2_d21_union_disjoint_int_intervals_mc',
    name: 'Tìm hợp của hai tập hợp số nguyên rời nhau (C ∪ D)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép hợp trên tập số nguyên',
    description: 'Cho hai tập số nguyên rời nhau C = {x ∈ Z | a ≤ x ≤ b} và D = {x ∈ Z | c ≤ x ≤ d}. Tìm C ∪ D.',
    conditionSummary: 'c <= d < a <= b, mỗi tập có 3..5 phần tử',
    paramSpecs: [
      { name: 'c', label: 'Đầu mút trái c của D', min: -9, max: -3 },
      { name: 'lenD', label: 'Số phần tử tập D', min: 3, max: 5 },
      { name: 'gap', label: 'Khoảng cách giữa D và C', min: 2, max: 5 },
      { name: 'lenC', label: 'Số phần tử tập C', min: 3, max: 5 },
    ],
    validateCode: `
      const { c, lenD, gap, lenC } = params;
      if (!Number.isInteger(c) || c < -15 || c > 5) return { valid: false, reason: 'c phải thuộc [-15; 5]' };
      if (!Number.isInteger(lenD) || lenD < 2 || lenD > 6) return { valid: false, reason: 'lenD phải thuộc [2; 6]' };
      if (!Number.isInteger(gap) || gap < 1 || gap > 8) return { valid: false, reason: 'gap phải thuộc [1; 8]' };
      if (!Number.isInteger(lenC) || lenC < 2 || lenC > 6) return { valid: false, reason: 'lenC phải thuộc [2; 6]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, lenD, gap, lenC } = params;
      const d = c + lenD - 1;
      const a = d + gap;
      const b = a + lenC - 1;
      const range = (lo, hi) => {
        const res = [];
        for (let x = lo; x <= hi; x++) res.push(x);
        return res;
      };
      const fmt = (arr) => '$\\{' + arr.join(';\\, ') + '\\}$';
      const setC = range(a, b);
      const setD = range(c, d);
      const union = [...setD, ...setC];
      const correct = fmt(union);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmt(setC), '$\\emptyset$', fmt(setD)],
        rng,
        (step) => fmt([...setD, a + step])
      );
      return {
        stem:
          'Cho hai tập hợp $C = \\{x \\in \\mathbb{Z} \\mid ' + a + ' \\le x \\le ' + b + '\\}$ và $D = \\{x \\in \\mathbb{Z} \\mid ' + c + ' \\le x \\le ' + d + '\\}$. Tìm tập hợp $C \\cup D$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $C = \\{' + setC.join(';\\, ') + '\\}$ và $D = \\{' + setD.join(';\\, ') + '\\}$.',
          'Do đó $C \\cup D = \\{' + union.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên gap = 0 (không rời nhau)', params: { c: -5, lenD: 4, gap: 0, lenC: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21: C=[1;4], D=[-5;-2]', params: { c: -5, lenD: 4, gap: 3, lenC: 4 }, expectedValid: true },
    ],
  },

  // Dạng 22 (Q22 - MC): Hiệu hai tập số nguyên E \ F với F ⊂ E
  t10_b2_d22_difference_int_intervals_mc: {
    id: 't10_b2_d22_difference_int_intervals_mc',
    name: 'Tìm hiệu của hai tập hợp số nguyên cho bởi bất đẳng thức (E \\ F)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép hiệu trên tập số nguyên',
    description: 'Cho E = {x ∈ Z | a ≤ x < b} và F = {x ∈ Z | c < x ≤ b - 1} với F ⊂ E. Tìm tập hợp E \\ F.',
    conditionSummary: 'a <= c, b - 1 > c, E \\ F và F đều có từ 2..5 phần tử',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái a của E', min: -12, max: 2 },
      { name: 'lenDiff', label: 'Số phần tử của E \\ F', min: 2, max: 5 },
      { name: 'lenF', label: 'Số phần tử của F', min: 2, max: 5 },
    ],
    validateCode: `
      const { a, lenDiff, lenF } = params;
      if (!Number.isInteger(a) || a < -20 || a > 15) return { valid: false, reason: 'a phải thuộc [-20; 15]' };
      if (!Number.isInteger(lenDiff) || lenDiff < 2 || lenDiff > 6) return { valid: false, reason: 'lenDiff phải thuộc [2; 6]' };
      if (!Number.isInteger(lenF) || lenF < 2 || lenF > 6) return { valid: false, reason: 'lenF phải thuộc [2; 6]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, lenDiff, lenF } = params;
      const c = a + lenDiff - 1;
      const d = c + lenF;
      const b = d + 1;
      const range = (lo, hi) => {
        const res = [];
        for (let x = lo; x <= hi; x++) res.push(x);
        return res;
      };
      const fmt = (arr) => '$\\{' + arr.join(';\\, ') + '\\}$';
      const setE = range(a, d);
      const setF = range(c + 1, d);
      const diff = range(a, c);
      const correct = fmt(diff);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$\\emptyset$', fmt(setE), fmt(setF)],
        rng,
        (step) => fmt(range(a, c + step))
      );
      return {
        stem:
          'Cho hai tập hợp $E = \\{x \\in \\mathbb{Z} \\mid ' + a + ' \\le x < ' + b + '\\}$ và $F = \\{x \\in \\mathbb{Z} \\mid ' + c + ' < x \\le ' + d + '\\}$. Tìm tập hợp $E \\setminus F$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $E = \\{' + setE.join(';\\, ') + '\\}$ và $F = \\{' + setF.join(';\\, ') + '\\}$.',
          'Do đó $E \\setminus F = \\{' + diff.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên lenDiff = 0', params: { a: -7, lenDiff: 0, lenF: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22: E=[-7;-1), F=(-5;-2] => {-7;-6;-5}', params: { a: -7, lenDiff: 3, lenF: 3 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23 - MC): Số tập hợp con của tập A có k phần tử
  t10_b2_d23_num_subsets_mc: {
    id: 't10_b2_d23_num_subsets_mc',
    name: 'Tính số tập hợp con của một tập hợp hữu hạn (2ⁿ)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Số tập hợp con',
    description: 'Cho tập hợp A có k phần tử phân biệt (k ∈ [1; 5]). Tính tổng số tập hợp con của A theo công thức 2^k.',
    conditionSummary: 'k in [1; 5], a0 in [-10; 15], step in [1; 5]',
    paramSpecs: [
      { name: 'k', label: 'Số phần tử k của A', min: 1, max: 5 },
      { name: 'a0', label: 'Phần tử nhỏ nhất a0', min: -10, max: 15 },
      { name: 'step', label: 'Khoảng cách giữa các phần tử', min: 1, max: 5 },
    ],
    validateCode: `
      const { k, a0, step } = params;
      if (!Number.isInteger(k) || k < 1 || k > 6) return { valid: false, reason: 'k phải thuộc [1; 6]' };
      if (!Number.isInteger(a0) || Math.abs(a0) > 30) return { valid: false, reason: 'a0 phải thuộc [-30; 30]' };
      if (!Number.isInteger(step) || step < 1 || step > 10) return { valid: false, reason: 'step phải thuộc [1; 10]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, a0, step } = params;
      const elems = [];
      for (let i = 0; i < k; i++) elems.push(a0 + i * step);
      const ans = Math.pow(2, k);
      const correct = '$' + ans + '$';
      const cands = [
        '$' + (ans * 2) + '$',
        '$' + (ans + 3) + '$',
        '$' + Math.max(1, ans + 4) + '$',
        '$' + Math.max(1, k * 2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        cands,
        rng,
        (s) => '$' + (ans + s + 5) + '$'
      );
      return {
        stem: 'Cho tập hợp $A = \\{' + elems.join(';\\, ') + '\\}$. Tìm số tập hợp con của tập hợp $A$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập hợp $A$ có $n = ' + k + '$ phần tử.',
          'Số tập hợp con của $A$ là $2^{' + k + '} = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, a0: 6, step: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23: A = {6} => 2 tập con', params: { k: 1, a0: 6, step: 1 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24 - MC): Số tập hợp con gồm 1 phần tử của tập A
  t10_b2_d24_num_1elem_subsets_mc: {
    id: 't10_b2_d24_num_1elem_subsets_mc',
    name: 'Tính số tập hợp con gồm 1 phần tử của một tập hợp',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Số tập hợp con',
    description: 'Cho tập hợp A gồm k phần tử nguyên phân biệt. Xác định số tập hợp con gồm đúng 1 phần tử của A.',
    conditionSummary: 'k in [3; 7], các phần tử nguyên phân biệt',
    paramSpecs: [
      { name: 'k', label: 'Số phần tử k của A', min: 3, max: 7 },
      { name: 'a0', label: 'Phần tử nhỏ nhất a0', min: -12, max: 5 },
      { name: 'step', label: 'Bước nhảy', min: 2, max: 5 },
    ],
    validateCode: `
      const { k, a0, step } = params;
      if (!Number.isInteger(k) || k < 3 || k > 8) return { valid: false, reason: 'k phải thuộc [3; 8]' };
      if (!Number.isInteger(a0) || Math.abs(a0) > 30) return { valid: false, reason: 'a0 phải thuộc [-30; 30]' };
      if (!Number.isInteger(step) || step < 1 || step > 10) return { valid: false, reason: 'step phải thuộc [1; 10]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, a0, step } = params;
      const elems = [];
      for (let i = 0; i < k; i++) elems.push(a0 + i * step);
      const correct = '$' + k + '$';
      const totalSub = Math.pow(2, k);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$2$', '$' + totalSub + '$', '$' + (k + 1) + '$'],
        rng,
        (s) => '$' + (k + s + 1) + '$'
      );
      return {
        stem: 'Cho tập hợp $A = \\{' + elems.join(';\\, ') + '\\}$. Tìm số tập hợp con gồm $1$ phần tử của tập hợp $A$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mỗi phần tử của tập hợp $A$ tạo thành đúng một tập hợp con gồm $1$ phần tử.',
          'Vì $A$ có $' + k + '$ phần tử nên số tập hợp con gồm $1$ phần tử của $A$ là $' + k + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { k: 1, a0: -9, step: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24: 5 phần tử => 5 tập con 1 phần tử', params: { k: 5, a0: -9, step: 3 }, expectedValid: true },
    ],
  },

  // Dạng 25 (Q25 - MC): Tính n(A ∩ B) khi biết n(A), n(B), n(A ∪ B)
  t10_b2_d25_cardinality_inter_mc: {
    id: 't10_b2_d25_cardinality_inter_mc',
    name: 'Tính số phần tử tập giao n(A ∩ B) theo công thức cộng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức số phần tử hợp hai tập hợp',
    description: 'Cho n(A), n(B) và n(A ∪ B). Áp dụng n(A ∩ B) = n(A) + n(B) - n(A ∪ B).',
    conditionSummary: 'onlyA >= 3, onlyB >= 3, inter >= 2',
    paramSpecs: [
      { name: 'onlyA', label: 'Số phần tử chỉ thuộc tập 1', min: 4, max: 25 },
      { name: 'onlyB', label: 'Số phần tử chỉ thuộc tập 2', min: 4, max: 25 },
      { name: 'inter', label: 'Số phần tử phần giao', min: 3, max: 20 },
      { name: 'pairIdx', label: 'Tên cặp tập hợp (0:N,B; 1:A,B; 2:M,P)', min: 0, max: 2 },
    ],
    validateCode: `
      const { onlyA, onlyB, inter, pairIdx } = params;
      if (![onlyA, onlyB, inter].every((v) => Number.isInteger(v) && v >= 2 && v <= 60)) {
        return { valid: false, reason: 'onlyA, onlyB, inter phải nguyên trong [2; 60]' };
      }
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 2) return { valid: false, reason: 'pairIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { onlyA, onlyB, inter, pairIdx } = params;
      const [S1, S2] = [['N', 'B'], ['A', 'B'], ['M', 'P']][pairIdx];
      const n1 = onlyA + inter;
      const n2 = onlyB + inter;
      const nU = onlyA + onlyB + inter;
      const correct = '$' + inter + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + (n1 + n2) + '$', '$' + onlyB + '$', '$' + Math.abs(n1 - n2) + '$', '$' + onlyA + '$'],
        rng,
        (step) => '$' + (inter + step + 2) + '$'
      );
      return {
        stem:
          'Cho hai tập hợp $' + S1 + '$ và $' + S2 + '$ biết $n(' + S1 + ') = ' + n1 + ',\\; n(' + S2 + ') = ' + n2 + ',\\; n(' + S1 + ' \\cup ' + S2 + ') = ' + nU + '$. Tính $n(' + S1 + ' \\cap ' + S2 + ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $n(' + S1 + ' \\cap ' + S2 + ') = n(' + S1 + ') + n(' + S2 + ') - n(' + S1 + ' \\cup ' + S2 + ')$.',
          'Thay số: $n(' + S1 + ' \\cap ' + S2 + ') = ' + n1 + ' + ' + n2 + ' - ' + nU + ' = ' + inter + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên inter = 0', params: { onlyA: 13, onlyB: 11, inter: 0, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25: n(N)=26, n(B)=24, n(N∪B)=37 => 13', params: { onlyA: 13, onlyB: 11, inter: 13, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 26 (Q26 - MC): Tính n(A ∪ B) khi biết n(A), n(B), n(A ∩ B)
  t10_b2_d26_cardinality_union_mc: {
    id: 't10_b2_d26_cardinality_union_mc',
    name: 'Tính số phần tử tập hợp hợp n(A ∪ B) theo công thức cộng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức số phần tử hợp hai tập hợp',
    description: 'Cho n(A), n(B) và n(A ∩ B). Tính n(A ∪ B) = n(A) + n(B) - n(A ∩ B).',
    conditionSummary: 'onlyA >= 3, onlyB >= 3, inter >= 2',
    paramSpecs: [
      { name: 'onlyA', label: 'Số phần tử chỉ thuộc tập 1', min: 4, max: 28 },
      { name: 'onlyB', label: 'Số phần tử chỉ thuộc tập 2', min: 4, max: 28 },
      { name: 'inter', label: 'Số phần tử phần giao', min: 3, max: 18 },
      { name: 'pairIdx', label: 'Tên cặp tập hợp (0:A,E; 1:A,B; 2:C,D)', min: 0, max: 2 },
    ],
    validateCode: `
      const { onlyA, onlyB, inter, pairIdx } = params;
      if (![onlyA, onlyB, inter].every((v) => Number.isInteger(v) && v >= 2 && v <= 60)) {
        return { valid: false, reason: 'onlyA, onlyB, inter phải nguyên trong [2; 60]' };
      }
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 2) return { valid: false, reason: 'pairIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { onlyA, onlyB, inter, pairIdx } = params;
      const [S1, S2] = [['A', 'E'], ['A', 'B'], ['C', 'D']][pairIdx];
      const n1 = onlyA + inter;
      const n2 = onlyB + inter;
      const nU = onlyA + onlyB + inter;
      const correct = '$' + nU + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + (n1 + inter) + '$', '$' + (n2 + inter) + '$', '$' + (n1 + n2) + '$', '$' + (nU + 2) + '$'],
        rng,
        (step) => '$' + (nU + step + 3) + '$'
      );
      return {
        stem:
          'Cho hai tập hợp $' + S1 + '$ và $' + S2 + '$ biết $n(' + S1 + ') = ' + n1 + ',\\; n(' + S2 + ') = ' + n2 + ',\\; n(' + S1 + ' \\cap ' + S2 + ') = ' + inter + '$. Tính $n(' + S1 + ' \\cup ' + S2 + ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $n(' + S1 + ' \\cup ' + S2 + ') = n(' + S1 + ') + n(' + S2 + ') - n(' + S1 + ' \\cap ' + S2 + ')$.',
          'Thay số: $n(' + S1 + ' \\cup ' + S2 + ') = ' + n1 + ' + ' + n2 + ' - ' + inter + ' = ' + nU + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên onlyA = 0', params: { onlyA: 0, onlyB: 19, inter: 9, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26: n(A)=24, n(E)=28, n(A∩E)=9 => 43', params: { onlyA: 15, onlyB: 19, inter: 9, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 27 (Q27 - MC): Tính n(M) khi biết n(N), n(N ∩ M), n(N ∪ M)
  t10_b2_d27_cardinality_second_set_mc: {
    id: 't10_b2_d27_cardinality_second_set_mc',
    name: 'Tính số phần tử của một tập hợp khi biết tập kia, giao và hợp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức số phần tử hợp hai tập hợp',
    description: 'Cho n(N), n(N ∩ M) và n(N ∪ M). Tính n(M) = n(N ∪ M) + n(N ∩ M) - n(N).',
    conditionSummary: 'only1 >= 3, only2 >= 3, inter >= 2',
    paramSpecs: [
      { name: 'only1', label: 'Số phần tử chỉ thuộc tập 1', min: 4, max: 25 },
      { name: 'only2', label: 'Số phần tử chỉ thuộc tập 2', min: 4, max: 25 },
      { name: 'inter', label: 'Số phần tử phần giao', min: 3, max: 20 },
      { name: 'pairIdx', label: 'Tên cặp tập hợp (0:N,M; 1:A,B; 2:X,Y)', min: 0, max: 2 },
    ],
    validateCode: `
      const { only1, only2, inter, pairIdx } = params;
      if (![only1, only2, inter].every((v) => Number.isInteger(v) && v >= 2 && v <= 60)) {
        return { valid: false, reason: 'only1, only2, inter phải nguyên trong [2; 60]' };
      }
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 2) return { valid: false, reason: 'pairIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { only1, only2, inter, pairIdx } = params;
      const [S1, S2] = [['N', 'M'], ['A', 'B'], ['X', 'Y']][pairIdx];
      const n1 = only1 + inter;
      const n2 = only2 + inter;
      const nU = only1 + only2 + inter;
      const correct = '$' + n2 + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + only2 + '$', '$' + (nU + only2 - inter) + '$', '$' + (nU + inter) + '$', '$' + (n2 + 20) + '$'],
        rng,
        (step) => '$' + (n2 + step + 3) + '$'
      );
      return {
        stem:
          'Cho hai tập hợp $' + S1 + '$ và $' + S2 + '$ biết $n(' + S1 + ') = ' + n1 + ',\\; n(' + S1 + ' \\cap ' + S2 + ') = ' + inter + ',\\; n(' + S1 + ' \\cup ' + S2 + ') = ' + nU + '$. Tính $n(' + S2 + ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ công thức $n(' + S1 + ' \\cup ' + S2 + ') = n(' + S1 + ') + n(' + S2 + ') - n(' + S1 + ' \\cap ' + S2 + ')$, suy ra:',
          '$n(' + S2 + ') = n(' + S1 + ' \\cup ' + S2 + ') + n(' + S1 + ' \\cap ' + S2 + ') - n(' + S1 + ') = ' + nU + ' + ' + inter + ' - ' + n1 + ' = ' + n2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên inter = 0', params: { only1: 15, only2: 10, inter: 0, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27: n(N)=29, n(N∩M)=14, n(N∪M)=39 => n(M)=24', params: { only1: 15, only2: 10, inter: 14, pairIdx: 0 }, expectedValid: true },
    ],
  },
};
