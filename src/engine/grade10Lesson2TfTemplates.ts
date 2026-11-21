import { MathTemplate } from '../types/math';

export const G10_B2_TF_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 28 (Q28 - TF): Tính chất của tập hợp số nguyên P = {x ∈ Z | a ≤ x ≤ b}
  t10_b2_d28_int_set_props_tf: {
    id: 't10_b2_d28_int_set_props_tf',
    name: 'Xét tính đúng-sai về liệt kê, số phần tử và số tập con của tập P = {x ∈ Z | a ≤ x ≤ b}',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Tập hợp số nguyên và tập con',
    description: 'Cho P = {x ∈ Z | a ≤ x ≤ b}. Đánh giá 4 khẳng định về quan hệ tập con, dạng liệt kê, số tập con 2^n và số phần tử n.',
    conditionSummary: 'a in [-6; 2], len in [5; 8], outVal nằm ngoài [a; b], mode in 0..3',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái a', min: -5, max: 2 },
      { name: 'len', label: 'Số phần tử của P', min: 5, max: 8 },
      { name: 'outShift', label: 'Độ lệch phần tử ngoài P', min: 3, max: 9 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, len, outShift, mode } = params;
      if (!Number.isInteger(a) || a < -15 || a > 10) return { valid: false, reason: 'a phải thuộc [-15; 10]' };
      if (!Number.isInteger(len) || len < 4 || len > 9) return { valid: false, reason: 'len phải thuộc [4; 9]' };
      if (!Number.isInteger(outShift) || outShift < 2 || outShift > 15) return { valid: false, reason: 'outShift phải thuộc [2; 15]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, len, outShift, mode } = params;
      const b = a + len - 1;
      const elems = [];
      for (let x = a; x <= b; x++) elems.push(x);
      const outVal = a - outShift;
      const sampleSub = [outVal, elems[1], elems[2], elems[3]];
      const subCount = Math.pow(2, len);
      const wrongSubCount = Math.pow(2, len - 1);

      // mode=0 reproduces exact Q28: Đ - S - S - S
      const patterns = [
        [true, false, false, false],
        [true, true, false, true],
        [false, true, true, false],
        [true, false, true, true],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: 'Tập hợp $\\{' + sampleSub.join(';\\, ') + '\\}$ ' + (aTrue ? 'không phải là một tập hợp con của tập hợp $P$.' : 'là một tập hợp con của tập hợp $P$.'),
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: '$P = \\{' + (bTrue ? elems : elems.slice(0, len - 1)).join(';\\, ') + '\\}$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Số tập hợp con của tập hợp $P$ là $' + (cTrue ? subCount : wrongSubCount) + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Số phần tử của tập hợp $P$ là $' + (dTrue ? len : len - 1) + '$.',
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem: 'Cho tập hợp $P = \\{x \\in \\mathbb{Z} \\mid ' + a + ' \\le x \\le ' + b + '\\}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'Liệt kê đầy đủ các phần tử của $P$: $P = \\{' + elems.join(';\\, ') + '\\}$ gồm $' + len + '$ phần tử.',
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Vì $' + outVal + ' \\notin P$ nên $\\{' + sampleSub.join(';\\, ') + '\\} \\not\\subset P$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Tập hợp đầy đủ là $P = \\{' + elems.join(';\\, ') + '\\}$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Số tập hợp con của $P$ là $2^{' + len + '} = ' + subCount + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Tập hợp $P$ có đúng $' + len + '$ phần tử.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên len = 1', params: { a: -1, len: 1, outShift: 5, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28: P = [-1; 4] (Đ-S-S-S)', params: { a: -1, len: 6, outShift: 5, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 29 (Q29 - TF): Tính chất của tập hợp liệt kê liên tiếp C = {a; ...; b}
  t10_b2_d29_listed_set_props_tf: {
    id: 't10_b2_d29_listed_set_props_tf',
    name: 'Xét tính đúng-sai về tính chất đặc trưng, số phần tử và tập con của tập hợp liệt kê',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Xác định tập hợp và tập con',
    description: 'Cho tập hợp liệt kê các số nguyên liên tiếp C = {a; a+1; ...; b}. Xét 4 khẳng định về tính chất đặc trưng, số phần tử, số tập con và quan hệ tập con.',
    conditionSummary: 'a in [-4; 6], len in [5; 8], outShift in [3; 12], mode in 0..3',
    paramSpecs: [
      { name: 'a', label: 'Phần tử nhỏ nhất a', min: -3, max: 6 },
      { name: 'len', label: 'Số phần tử của C', min: 5, max: 8 },
      { name: 'outShift', label: 'Độ lệch phần tử ngoài C', min: 4, max: 12 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, len, outShift, mode } = params;
      if (!Number.isInteger(a) || a < -15 || a > 20) return { valid: false, reason: 'a phải thuộc [-15; 20]' };
      if (!Number.isInteger(len) || len < 4 || len > 9) return { valid: false, reason: 'len phải thuộc [4; 9]' };
      if (!Number.isInteger(outShift) || outShift < 2 || outShift > 20) return { valid: false, reason: 'outShift phải thuộc [2; 20]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, len, outShift, mode } = params;
      const b = a + len - 1;
      const elems = [];
      for (let x = a; x <= b; x++) elems.push(x);
      const outVal = b + outShift;
      const testSub = [elems[1], elems[2], outVal];
      const subCount = Math.pow(2, len);
      const wrongSubCount = Math.pow(2, len - 1);

      // mode=0 reproduces exact Q29: Đ - Đ - S - Đ
      const patterns = [
        [true, true, false, true],
        [false, true, true, true],
        [true, false, true, false],
        [true, true, false, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: '$C = \\{x \\in \\mathbb{Z} \\mid ' + a + (aTrue ? ' \\le x \\le ' : ' < x < ') + b + '\\}$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Số phần tử của tập hợp $C$ là $' + (bTrue ? len : len + 1) + '$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Số tập hợp con của tập hợp $C$ là $' + (cTrue ? subCount : wrongSubCount) + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Tập hợp $\\{' + testSub.join(';\\, ') + '\\}$ ' + (dTrue ? 'không phải là một tập hợp con của tập hợp $C$.' : 'là một tập hợp con của tập hợp $C$.'),
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem: 'Cho tập hợp $C = \\{' + elems.join(';\\, ') + '\\}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Các phần tử của $C$ là mọi số nguyên thỏa mãn $' + a + ' \\le x \\le ' + b + '$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Tập hợp $C$ có $' + b + ' - (' + a + ') + 1 = ' + len + '$ phần tử.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Số tập hợp con của $C$ là $2^{' + len + '} = ' + subCount + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Vì $' + outVal + ' \\notin C$ nên $\\{' + testSub.join(';\\, ') + '\\} \\not\\subset C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên len = 0', params: { a: 2, len: 0, outShift: 8, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29: C = {2;3;4;5;6;7} (Đ-Đ-S-Đ)', params: { a: 2, len: 6, outShift: 8, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 30 (Q30 - TF): Đếm số phần tử của 4 tập hợp (đoạn nguyên, PT bậc 2, PT tích trên Q, BPT kép trên N)
  t10_b2_d30_four_sets_cardinality_tf: {
    id: 't10_b2_d30_four_sets_cardinality_tf',
    name: 'Xét tính đúng-sai về số phần tử của 4 tập hợp (Z, R, Q, N)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Số phần tử tập hợp theo tính chất đặc trưng',
    description: 'Đánh giá số phần tử của 4 tập hợp: đoạn số nguyên, phương trình bậc hai trên R, phương trình tích trên Q và bất đẳng thức kép trên N.',
    conditionSummary: 'a1 < a2, r1 < r2, r0 != ±m (m >= 2), p2 < p1 < p3 - 3',
    paramSpecs: [
      { name: 'a1', label: 'Đầu mút trái a1 của A', min: -5, max: 0 },
      { name: 'a2', label: 'Đầu mút phải a2 của A', min: 2, max: 8 },
      { name: 'kB', label: 'Hệ số k của PT bậc hai B', min: 1, max: 4 },
      { name: 'r1', label: 'Nghiệm r1 của B', min: 1, max: 4 },
      { name: 'r2', label: 'Nghiệm r2 của B (> r1)', min: 2, max: 7 },
      { name: 'r0', label: 'Nghiệm kép r0 của C', min: 1, max: 4 },
      { name: 'm', label: 'Hằng số m của x² - m² (khác r0)', min: 2, max: 5 },
      { name: 'p2', label: 'Hằng số p2 trong 2n + p2', min: 1, max: 4 },
      { name: 'p1', label: 'Hằng số p1 trong n + p1 (> p2)', min: 3, max: 8 },
      { name: 'spanD', label: 'Số phần tử + 1 của D', min: 5, max: 9 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a1, a2, kB, r1, r2, r0, m, p2, p1, spanD, mode } = params;
      if (!Number.isInteger(a1) || !Number.isInteger(a2) || a1 < -15 || a2 > 15 || a2 - a1 < 3) return { valid: false, reason: 'Đoạn [a1; a2] không hợp lệ' };
      if (!Number.isInteger(kB) || kB < 1 || kB > 6) return { valid: false, reason: 'kB phải thuộc [1; 6]' };
      if (!Number.isInteger(r1) || !Number.isInteger(r2) || r1 < 1 || r2 <= r1 || r2 > 10) return { valid: false, reason: 'Cần 1 <= r1 < r2 <= 10' };
      if (!Number.isInteger(r0) || !Number.isInteger(m) || r0 < 1 || m < 2 || m > 7 || r0 === m) return { valid: false, reason: 'Cần r0 >= 1, 2 <= m <= 7 và r0 != m' };
      if (!Number.isInteger(p2) || !Number.isInteger(p1) || p2 < 1 || p1 <= p2 || p1 > 12) return { valid: false, reason: 'Cần 1 <= p2 < p1 <= 12' };
      if (!Number.isInteger(spanD) || spanD < 4 || spanD > 12) return { valid: false, reason: 'spanD phải thuộc [4; 12]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, kB, r1, r2, r0, m, p2, p1, spanD, mode } = params;
      const cntA = a2 - a1 + 1;
      const eqB = u.formatQuadratic(kB, -kB * (r1 + r2), kB * r1 * r2, 'x') + ' = 0';
      const p3 = p1 + spanD;
      const dLo = p1 - p2;
      const dHi = p3 - p2;
      const cntD = dHi - dLo - 1; // strictly between dLo and dHi

      // mode=0 reproduces exact Q30: S - Đ - S - S
      const patterns = [
        [false, true, false, false],
        [true, true, false, true],
        [false, false, true, true],
        [true, false, true, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: 'Tập hợp $A = \\{x \\in \\mathbb{Z} \\mid ' + a1 + ' \\le x \\le ' + a2 + '\\}$ có số phần tử là $' + (aTrue ? cntA : cntA - 1) + '$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Tập hợp $B = \\{x \\in \\mathbb{R} \\mid ' + eqB + '\\}$ có $' + (bTrue ? 2 : 1) + '$ phần tử.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Tập hợp $C = \\left\\{x \\in \\mathbb{Q} \\mid (x - ' + r0 + ')^2(x^2 - ' + (m * m) + ') = 0\\right\\}$ có $' + (cTrue ? 3 : 2) + '$ phần tử.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Tập hợp $D = \\left\\{n \\in \\mathbb{N} \\mid n + ' + p1 + ' < 2n + ' + p2 + ' < n + ' + p3 + '\\right\\}$ có $' + (dTrue ? cntD : cntD + 1) + '$ phần tử.',
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Tập hợp $A$ gồm các số nguyên từ $' + a1 + '$ đến $' + a2 + '$ nên có $' + a2 + ' - (' + a1 + ') + 1 = ' + cntA + '$ phần tử.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Phương trình $' + eqB + '$ có hai nghiệm phân biệt $x = ' + r1 + '$ và $x = ' + r2 + '$ nên $B$ có $2$ phần tử.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Phương trình $(x - ' + r0 + ')^2(x^2 - ' + (m * m) + ') = 0$ có $3$ nghiệm hữu tỉ phân biệt $x = ' + r0 + ',\\; x = ' + m + ',\\; x = -' + m + '$ nên $C$ có $3$ phần tử.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Từ $n + ' + p1 + ' < 2n + ' + p2 + ' < n + ' + p3 + ' \\Leftrightarrow ' + dLo + ' < n < ' + dHi + '$. Vì $n \\in \\mathbb{N}$ nên $D$ có $' + cntD + '$ phần tử.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r0 = m (trùng nghiệm)', params: { a1: -2, a2: 5, kB: 3, r1: 1, r2: 2, r0: 2, m: 2, p2: 1, p1: 3, spanD: 7, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (S-Đ-S-S)', params: { a1: -2, a2: 5, kB: 3, r1: 1, r2: 2, r0: 1, m: 2, p2: 1, p1: 3, spanD: 7, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 31 (Q31 - TF): Các phép toán trên hai tập liệt kê với B ⊂ A (hiệu 1 phần tử)
  t10_b2_d31_two_listed_sets_ops_tf: {
    id: 't10_b2_d31_two_listed_sets_ops_tf',
    name: 'Xét tính đúng-sai phép toán trên hai tập hợp liệt kê (B ⊂ A)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Các phép toán trên tập hợp',
    description: 'Cho hai tập hợp liệt kê A và B với B ⊂ A và |A \\ B| = 1. Xét 4 khẳng định về A ∩ B, |A ∪ B|, quan hệ tập con và A \\ B.',
    conditionSummary: 'start in [-10; 2], lenB in [4; 6], mode in 0..3',
    paramSpecs: [
      { name: 'start', label: 'Phần tử nhỏ nhất (chỉ thuộc A)', min: -10, max: 2 },
      { name: 'lenB', label: 'Số phần tử của B', min: 4, max: 6 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { start, lenB, mode } = params;
      if (!Number.isInteger(start) || start < -20 || start > 15) return { valid: false, reason: 'start phải thuộc [-20; 15]' };
      if (!Number.isInteger(lenB) || lenB < 3 || lenB > 8) return { valid: false, reason: 'lenB phải thuộc [3; 8]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { start, lenB, mode } = params;
      const setA = [];
      const setB = [];
      for (let i = 0; i <= lenB; i++) {
        setA.push(start + i);
        if (i >= 1) setB.push(start + i);
      }
      const nA = setA.length;

      // mode=0 reproduces exact Q31: S - Đ - Đ - Đ
      const patterns = [
        [false, true, true, true],
        [true, false, true, true],
        [false, true, false, true],
        [true, true, true, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: aTrue ? '$A \\cap B = \\{' + setB.join(';\\, ') + '\\}$.' : '$A \\cap B = \\emptyset$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Số phần tử của $A \\cup B$ là $' + (bTrue ? nA : nA + 2) + '$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: cTrue ? 'Tập hợp $A$ không là tập hợp con của tập hợp $B$.' : 'Tập hợp $A$ là tập hợp con của tập hợp $B$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: dTrue ? '$A \\setminus B = \\{' + start + '\\}$.' : '$A \\setminus B = \\emptyset$.',
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem:
          'Cho hai tập hợp $A = \\{' + setA.join(';\\, ') + '\\}$ và $B = \\{' + setB.join(';\\, ') + '\\}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Ta có $A \\cap B = B = \\{' + setB.join(';\\, ') + '\\} \\ne \\emptyset$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Vì $B \\subset A$ nên $A \\cup B = A$, có đúng $' + nA + '$ phần tử.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Vì phần tử $' + start + ' \\in A$ nhưng $' + start + ' \\notin B$ nên $A \\not\\subset B$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Ta có $A \\setminus B = \\{' + start + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên lenB = 0', params: { start: -6, lenB: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31: A={-6..-1}, B={-5..-1} (S-Đ-Đ-Đ)', params: { start: -6, lenB: 5, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 32 (Q32 - TF): Các phép toán trên hai đoạn số nguyên lồng nhau A ⊂ B
  t10_b2_d32_two_int_intervals_ops_tf: {
    id: 't10_b2_d32_two_int_intervals_ops_tf',
    name: 'Xét tính đúng-sai phép toán trên hai tập hợp số nguyên lồng nhau (A ⊂ B)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Các phép toán trên tập hợp',
    description: 'Cho A = {x ∈ Z | a ≤ x ≤ b} và B = {x ∈ Z | a ≤ x ≤ c} với b < c (nên A ⊂ B). Xét 4 khẳng định về |A ∪ B|, A \\ B, A ∩ B và quan hệ bao hàm.',
    conditionSummary: 'a in [-8; 1], lenA in [3; 5], extra in [2; 4], mode in 0..3',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái chung a', min: -8, max: 1 },
      { name: 'lenA', label: 'Số phần tử của A', min: 3, max: 5 },
      { name: 'extra', label: 'Số phần tử B nhiều hơn A', min: 2, max: 4 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, lenA, extra, mode } = params;
      if (!Number.isInteger(a) || a < -15 || a > 10) return { valid: false, reason: 'a phải thuộc [-15; 10]' };
      if (!Number.isInteger(lenA) || lenA < 2 || lenA > 6) return { valid: false, reason: 'lenA phải thuộc [2; 6]' };
      if (!Number.isInteger(extra) || extra < 1 || extra > 5) return { valid: false, reason: 'extra phải thuộc [1; 5]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, lenA, extra, mode } = params;
      const b = a + lenA - 1;
      const c = b + extra;
      const setA = [];
      const setB = [];
      for (let x = a; x <= b; x++) setA.push(x);
      for (let x = a; x <= c; x++) setB.push(x);
      const nB = setB.length;

      // mode=0 reproduces exact Q32: S - Đ - S - S
      const patterns = [
        [false, true, false, false],
        [true, true, false, true],
        [false, false, true, true],
        [true, false, true, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: 'Số phần tử của $A \\cup B$ là $' + (aTrue ? nB : nB + 2) + '$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: bTrue ? '$A \\setminus B = \\emptyset$.' : '$A \\setminus B = \\{' + c + '\\}$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: cTrue ? '$A \\cap B = \\{' + setA.join(';\\, ') + '\\}$.' : '$A \\cap B = \\emptyset$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: dTrue ? 'Tập hợp $A$ là tập hợp con của tập hợp $B$.' : 'Tập hợp $A$ không là tập hợp con của tập hợp $B$.',
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem:
          'Cho hai tập hợp $A = \\{x \\in \\mathbb{Z} \\mid ' + a + ' \\le x \\le ' + b + '\\}$ và $B = \\{x \\in \\mathbb{Z} \\mid ' + a + ' \\le x \\le ' + c + '\\}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'Ta có $A = \\{' + setA.join(';\\, ') + '\\}$ và $B = \\{' + setB.join(';\\, ') + '\\}$, suy ra $A \\subset B$.',
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Vì $A \\subset B$ nên $A \\cup B = B$ có $' + nB + '$ phần tử.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Mọi phần tử của $A$ đều thuộc $B$ nên $A \\setminus B = \\emptyset$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': $A \\cap B = A = \\{' + setA.join(';\\, ') + '\\} \\ne \\emptyset$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Mọi phần tử của $A$ đều thuộc $B$ nên $A \\subset B$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên extra = 0', params: { a: -4, lenA: 4, extra: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32: A=[-4;-1], B=[-4;1] (S-Đ-S-S)', params: { a: -4, lenA: 4, extra: 2, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 33 (Q33 - TF): Ba tập hợp B ⊂ A ⊂ E và đếm số tập X ⊂ E sao cho A ∩ X = B
  t10_b2_d33_three_sets_count_X_tf: {
    id: 't10_b2_d33_three_sets_count_X_tf',
    name: 'Xét tính đúng-sai với 3 tập hợp B ⊂ A ⊂ E và đếm số tập X thỏa A ∩ X = B',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đếm tập hợp thỏa mãn điều kiện giao',
    description: 'Cho B ⊂ A ⊂ E. Xét 4 khẳng định về |A|, |B ∪ A|, số tập con của B và số tập X ⊂ E thỏa mãn A ∩ X = B (bằng 2^|E\\A|).',
    conditionSummary: 'nA in [5; 8], nB in [2; 3], nExtra in [1; 3], base in [2; 12]',
    paramSpecs: [
      { name: 'base', label: 'Phần tử nhỏ nhất', min: 2, max: 12 },
      { name: 'nA', label: 'Số phần tử tập A', min: 5, max: 7 },
      { name: 'nB', label: 'Số phần tử tập B (⊂ A)', min: 2, max: 3 },
      { name: 'nExtra', label: 'Số phần tử thuộc E \\ A', min: 1, max: 3 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { base, nA, nB, nExtra, mode } = params;
      if (!Number.isInteger(base) || base < 1 || base > 30) return { valid: false, reason: 'base phải thuộc [1; 30]' };
      if (!Number.isInteger(nA) || nA < 4 || nA > 9) return { valid: false, reason: 'nA phải thuộc [4; 9]' };
      if (!Number.isInteger(nB) || nB < 2 || nB >= nA - 1) return { valid: false, reason: 'nB phải thuộc [2; nA - 2]' };
      if (!Number.isInteger(nExtra) || nExtra < 1 || nExtra > 4) return { valid: false, reason: 'nExtra phải thuộc [1; 4]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { base, nA, nB, nExtra, mode } = params;
      const setA = [];
      for (let i = 0; i < nA; i++) setA.push(base + i * 2);
      const setB = setA.slice(nA - nB);
      const extraElems = [];
      for (let j = 0; j < nExtra; j++) extraElems.push(base + nA * 2 + 1 + j * 2);
      const setE = [...setA, ...extraElems].sort((x, y) => x - y);
      const subB = Math.pow(2, nB);
      const countX = Math.pow(2, nExtra);

      // mode=0 reproduces exact Q33: S - Đ - S - S
      const patterns = [
        [false, true, false, false],
        [true, true, false, true],
        [false, false, true, true],
        [true, false, true, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: 'Tập $A$ có $' + (aTrue ? nA : nA - 2) + '$ phần tử.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Tập $B \\cup A$ có $' + (bTrue ? nA : nA + nB) + '$ phần tử.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Số tập hợp con của tập hợp $B$ là $' + (cTrue ? subB : subB + 2) + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Có $' + (dTrue ? countX : Math.pow(2, nA)) + '$ tập hợp $X \\subset E$ sao cho $A \\cap X = B$.',
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem:
          'Cho $3$ tập hợp $A = \\{' + setA.join(';\\, ') + '\\}$, $B = \\{' + setB.join(';\\, ') + '\\}$ và $E = \\{' + setE.join(';\\, ') + '\\}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Đếm trực tiếp ta thấy tập $A$ có $' + nA + '$ phần tử.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Vì $B \\subset A$ nên $B \\cup A = A$, có đúng $' + nA + '$ phần tử.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Tập $B$ có $' + nB + '$ phần tử nên số tập con của $B$ là $2^{' + nB + '} = ' + subB + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Điều kiện $A \\cap X = B$ đòi hỏi mọi phần tử của $B$ bắt buộc thuộc $X$ và mọi phần tử của $A \\setminus B$ không thuộc $X$. Tập $E \\setminus A$ có $' + nExtra + '$ phần tử, mỗi phần tử có $2$ cách chọn (thuộc hoặc không thuộc $X$). Vậy có $2^{' + nExtra + '} = ' + countX + '$ tập hợp $X$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nExtra = 0', params: { base: 7, nA: 7, nB: 2, nExtra: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33: |A|=7, |B|=2, |E\\A|=1 => 2 tập X (S-Đ-S-S)', params: { base: 7, nA: 7, nB: 2, nExtra: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 34 (Q34 - TF): Biểu đồ Ven 3 tập hợp (3 tiết mục văn nghệ múa, hát, kịch)
  t10_b2_d34_venn_3sets_arts_tf: {
    id: 't10_b2_d34_venn_3sets_arts_tf',
    name: 'Bài toán thực tế biểu đồ Ven 3 tập hợp (Văn nghệ / Câu lạc bộ)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng tập hợp vào bài toán thực tế (3 tập)',
    description: 'Cho sĩ số lớp, số học sinh tham gia từng tiết mục và từng cặp tiết mục (mọi bạn tham gia ít nhất 1 tiết mục). Xét 4 khẳng định về hợp 2 tập, hiệu đối xứng, giao 3 tập và số bạn chỉ tham gia đúng 1 tiết mục.',
    conditionSummary: '7 miền sơ cấp của biểu đồ Ven đều dương: onlyA, onlyB, onlyC >= 4; onlyAB, onlyBC, onlyCA >= 2; all3 >= 2',
    paramSpecs: [
      { name: 'onlyA', label: 'Chỉ tham gia tiết mục 1', min: 6, max: 16 },
      { name: 'onlyB', label: 'Chỉ tham gia tiết mục 2', min: 6, max: 18 },
      { name: 'onlyC', label: 'Chỉ tham gia tiết mục 3', min: 6, max: 16 },
      { name: 'onlyAB', label: 'Chỉ tham gia 1 và 2', min: 3, max: 10 },
      { name: 'onlyBC', label: 'Chỉ tham gia 2 và 3', min: 2, max: 9 },
      { name: 'onlyCA', label: 'Chỉ tham gia 1 và 3', min: 3, max: 9 },
      { name: 'all3', label: 'Tham gia cả 3 tiết mục', min: 3, max: 10 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3, mode } = params;
      if (![onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3].every((v) => Number.isInteger(v) && v >= 2 && v <= 30)) {
        return { valid: false, reason: 'Các miền biểu đồ Ven phải nguyên dương trong [2; 30]' };
      }
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3, mode } = params;
      const nA = onlyA + onlyAB + onlyCA + all3;
      const nB = onlyB + onlyAB + onlyBC + all3;
      const nC = onlyC + onlyBC + onlyCA + all3;
      const nAB = onlyAB + all3;
      const nBC = onlyBC + all3;
      const nCA = onlyCA + all3;
      const N = onlyA + onlyB + onlyC + onlyAB + onlyBC + onlyCA + all3;
      const nAorB = nA + nB - nAB;
      const nAxorB = nAorB - nAB;
      const onlyOne = onlyA + onlyB + onlyC;

      // mode=0 reproduces exact Q34: S - Đ - Đ - S
      const patterns = [
        [false, true, true, false],
        [true, true, false, true],
        [false, false, true, true],
        [true, false, true, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: 'Số bạn tham gia tiết mục múa hoặc tiết mục hát là $' + (aTrue ? nAorB : nA + nB) + '$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Số bạn tham gia tiết mục múa hoặc tiết mục hát mà không tham gia cả múa và hát là $' + (bTrue ? nAxorB : nAorB) + '$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Số bạn tham gia cả $3$ tiết mục là $' + (cTrue ? all3 : all3 + 2) + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Số bạn chỉ tham gia đúng $1$ tiết mục là $' + (dTrue ? onlyOne : onlyOne + 2) + '$.',
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem:
          'Nhân kỉ niệm ngày thành lập trường, lớp 10A muốn thực hiện $3$ tiết mục văn nghệ: múa, hát, kịch. Bạn lớp trưởng khảo sát được: tiết mục múa, hát, kịch lần lượt có $' +
          nA + '$, $' + nB + '$, $' + nC + '$ bạn tham gia; có $' + nAB + '$ bạn tham gia $2$ tiết mục múa và hát, có $' + nBC + '$ bạn tham gia $2$ tiết mục hát và kịch, có $' + nCA + '$ bạn tham gia $2$ tiết mục múa và kịch. Biết lớp có tất cả $' + N + '$ bạn và bạn nào cũng tham gia ít nhất $1$ tiết mục. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Số bạn tham gia múa hoặc hát là $' + nA + ' + ' + nB + ' - ' + nAB + ' = ' + nAorB + '$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Số bạn tham gia múa hoặc hát nhưng không tham gia cả hai là $' + nAorB + ' - ' + nAB + ' = ' + nAxorB + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Gọi $k$ là số bạn tham gia cả $3$ tiết mục. Ta có $' + N + ' = ' + nA + ' + ' + nB + ' + ' + nC + ' - ' + nAB + ' - ' + nBC + ' - ' + nCA + ' + k \\Rightarrow k = ' + all3 + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Chỉ múa và hát: $' + onlyAB + '$; chỉ hát và kịch: $' + onlyBC + '$; chỉ múa và kịch: $' + onlyCA + '$. Từ đó chỉ múa: $' + onlyA + '$, chỉ hát: $' + onlyB + '$, chỉ kịch: $' + onlyC + '$. Tổng số bạn chỉ tham gia đúng $1$ tiết mục là $' + onlyA + ' + ' + onlyB + ' + ' + onlyC + ' = ' + onlyOne + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên all3 = 0', params: { onlyA: 10, onlyB: 15, onlyC: 12, onlyAB: 8, onlyBC: 4, onlyCA: 5, all3: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34: N=61, k=7, only1=37 (S-Đ-Đ-S)', params: { onlyA: 10, onlyB: 15, onlyC: 12, onlyAB: 8, onlyBC: 4, onlyCA: 5, all3: 7, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 35 (Q35 - TF): Phép toán hai tập A, B và số tập X thỏa S1 ⊂ X ⊂ S2
  t10_b2_d35_int_set_subset_sandwich_tf: {
    id: 't10_b2_d35_int_set_subset_sandwich_tf',
    name: 'Xét tính đúng-sai về hiệu hai tập số nguyên và số tập X thỏa S₁ ⊂ X ⊂ S₂',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Phép hiệu và đếm tập hợp con',
    description: 'Cho A = {x ∈ Z | -k ≤ x ≤ b} và B = {0; 1; ...; b + 2}. Xét 4 khẳng định về liệt kê A, số tập con của A, A \\ B và số tập X thỏa S1 ⊂ X ⊂ S2.',
    conditionSummary: 'k in [2; 4], b in [3; 6], extraX in [0; 2], mode in 0..3',
    paramSpecs: [
      { name: 'k', label: 'Số phần tử âm của A (a1 = -k)', min: 2, max: 4 },
      { name: 'b', label: 'Phần tử lớn nhất của A', min: 3, max: 6 },
      { name: 'extraX', label: 'Số phần tử S2 \\ S1 (0..2)', min: 0, max: 2 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { k, b, extraX, mode } = params;
      if (!Number.isInteger(k) || k < 2 || k > 5) return { valid: false, reason: 'k phải thuộc [2; 5]' };
      if (!Number.isInteger(b) || b < 2 || b > 7) return { valid: false, reason: 'b phải thuộc [2; 7]' };
      if (!Number.isInteger(extraX) || extraX < 0 || extraX > 3) return { valid: false, reason: 'extraX phải thuộc [0; 3]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, b, extraX, mode } = params;
      const setA = [];
      for (let x = -k; x <= b; x++) setA.push(x);
      const setB = [];
      for (let x = 0; x <= b + 2; x++) setB.push(x);
      const diffAB = [];
      for (let x = -k; x <= -1; x++) diffAB.push(x);
      const nA = setA.length;
      const subA = Math.pow(2, nA);
      const wrongSubA = Math.pow(2, nA - 1);

      const s1 = [-8, 1, 8];
      const s2 = [...s1];
      for (let j = 1; j <= extraX; j++) s2.push(8 + j);
      const countX = Math.pow(2, extraX);
      const wrongCountX = countX * 2;

      // mode=0 reproduces exact Q35: S - S - Đ - S
      const patterns = [
        [false, false, true, false],
        [true, false, true, true],
        [false, true, false, true],
        [true, true, true, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: '$A = \\{' + (aTrue ? setA : setA.slice(0, nA - 1)).join(';\\, ') + '\\}$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Số tập hợp con của tập hợp $A$ là $' + (bTrue ? subA : wrongSubA) + '$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: '$A \\setminus B = \\{' + (cTrue ? diffAB : [...diffAB, 0]).join(';\\, ') + '\\}$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Số tập hợp $X$ để $\\{' + s1.join(';\\, ') + '\\} \\subset X \\subset \\{' + s2.join(';\\, ') + '\\}$ là $' + (dTrue ? countX : wrongCountX) + '$.',
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem:
          'Cho hai tập hợp $A = \\{x \\in \\mathbb{Z} \\mid -' + k + ' \\le x \\le ' + b + '\\}$ và $B = \\{' + setB.join(';\\, ') + '\\}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Liệt kê đầy đủ ta được $A = \\{' + setA.join(';\\, ') + '\\}$ có $' + nA + '$ phần tử.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Số tập hợp con của $A$ là $2^{' + nA + '} = ' + subA + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Các phần tử thuộc $A$ nhưng không thuộc $B$ là $A \\setminus B = \\{' + diffAB.join(';\\, ') + '\\}$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Tập $S_2 \\setminus S_1$ có $' + extraX + '$ phần tử nên số tập hợp $X$ thỏa mãn là $2^{' + extraX + '} = ' + countX + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, b: 5, extraX: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35: A=[-2;5], B=[0;7] (S-S-Đ-S)', params: { k: 2, b: 5, extraX: 0, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 36 (Q36 - TF): Bài toán Ven 2 tập hợp có phần tử ngoài (thể thao lớp học)
  t10_b2_d36_venn_2sets_sports_tf: {
    id: 't10_b2_d36_venn_2sets_sports_tf',
    name: 'Bài toán thực tế biểu đồ Ven 2 tập hợp (có học sinh không tham gia môn nào)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Ứng dụng tập hợp vào bài toán thực tế (2 tập)',
    description: 'Cho số học sinh biết chơi môn 1, môn 2, cả 2 môn và số bạn không biết môn nào. Xét 4 khẳng định về chỉ chơi môn 1, chỉ chơi môn 2, chơi ít nhất 1 môn và sĩ số lớp.',
    conditionSummary: 'only1 >= 4, only2 >= 4, both >= 2, none >= 2',
    paramSpecs: [
      { name: 'only1', label: 'Số bạn chỉ chơi môn 1', min: 5, max: 18 },
      { name: 'only2', label: 'Số bạn chỉ chơi môn 2', min: 5, max: 20 },
      { name: 'both', label: 'Số bạn chơi cả hai môn', min: 3, max: 12 },
      { name: 'none', label: 'Số bạn không chơi môn nào', min: 3, max: 12 },
      { name: 'ctxIdx', label: 'Cặp môn thể thao (0..2)', min: 0, max: 2 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { only1, only2, both, none, ctxIdx, mode } = params;
      if (![only1, only2, both, none].every((v) => Number.isInteger(v) && v >= 2 && v <= 40)) {
        return { valid: false, reason: 'Các số học sinh phải nguyên dương trong [2; 40]' };
      }
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) return { valid: false, reason: 'ctxIdx phải thuộc 0..2' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { only1, only2, both, none, ctxIdx, mode } = params;
      const contexts = [
        { cls: '10B6', s1: 'bóng đá', s2: 'bóng chuyền' },
        { cls: '10A2', s1: 'cầu lông', s2: 'bóng bàn' },
        { cls: '10C4', s1: 'bơi lội', s2: 'bóng rổ' },
      ];
      const ctx = contexts[ctxIdx];
      const n1 = only1 + both;
      const n2 = only2 + both;
      const nUnion = only1 + only2 + both;
      const total = nUnion + none;

      // mode=0 reproduces exact Q36: Đ - Đ - S - S
      const patterns = [
        [true, true, false, false],
        [true, false, true, false],
        [false, true, true, true],
        [true, true, false, true],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: 'Số học sinh chỉ biết chơi ' + ctx.s1 + ' là $' + (aTrue ? only1 : n1) + '$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Số học sinh chỉ biết chơi ' + ctx.s2 + ' là $' + (bTrue ? only2 : n2) + '$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Số học sinh biết chơi ' + ctx.s1 + ' hoặc biết chơi ' + ctx.s2 + ' là $' + (cTrue ? nUnion : nUnion + 3) + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Tổng số học sinh của lớp ' + ctx.cls + ' là $' + (dTrue ? total : total + 1) + '$.',
          isTrue: dTrue,
        },
      ];
      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem:
          'Biết rằng lớp ' + ctx.cls + ' có $' + n1 + '$ bạn biết chơi ' + ctx.s1 + ' và $' + n2 + '$ bạn biết chơi ' + ctx.s2 + '. Trong số các bạn biết chơi ' + ctx.s1 + ' hoặc biết chơi ' + ctx.s2 + ' có $' + both + '$ bạn biết chơi cả hai. Lớp vẫn còn $' + none + '$ bạn không biết chơi ' + ctx.s1 + ' và không biết chơi ' + ctx.s2 + '. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Số học sinh chỉ biết chơi ' + ctx.s1 + ' là $' + n1 + ' - ' + both + ' = ' + only1 + '$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Số học sinh chỉ biết chơi ' + ctx.s2 + ' là $' + n2 + ' - ' + both + ' = ' + only2 + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Số học sinh biết chơi ' + ctx.s1 + ' hoặc ' + ctx.s2 + ' là $' + n1 + ' + ' + n2 + ' - ' + both + ' = ' + nUnion + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Tổng số học sinh của lớp ' + ctx.cls + ' là $' + nUnion + ' + ' + none + ' = ' + total + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên both = 0', params: { only1: 9, only2: 15, both: 0, none: 7, ctxIdx: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36: 14 bóng đá, 20 bóng chuyền, 5 cả hai, 7 không => tổng 36 (Đ-Đ-S-S)', params: { only1: 9, only2: 15, both: 5, none: 7, ctxIdx: 0, mode: 0 }, expectedValid: true },
    ],
  },
};
