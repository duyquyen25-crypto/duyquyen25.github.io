import { MathTemplate } from '../types/math';

export const G10_B2_MC_PART1_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 1 (Q1 - MC): Kí hiệu phần tử thuộc tập hợp số (∈)
  t10_b2_d01_element_symbol_mc: {
    id: 't10_b2_d01_element_symbol_mc',
    name: 'Nhận biết kí hiệu phần tử thuộc tập hợp số (∈)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khái niệm tập hợp và kí hiệu thuộc',
    description: 'Chọn kí hiệu toán học đúng để viết mệnh đề một số cho trước thuộc tập hợp số N, Z, Q hoặc R.',
    conditionSummary: 'n nguyên dương trong [1; 500], setIdx trong 0..3',
    paramSpecs: [
      { name: 'n', label: 'Số n', min: 2, max: 250 },
      { name: 'setIdx', label: 'Tập số (0:N, 1:Z, 2:Q, 3:R)', min: 0, max: 3 },
    ],
    validateCode: `
      const { n, setIdx } = params;
      if (!Number.isInteger(n) || n < 1 || n > 1000) return { valid: false, reason: 'Số n phải là số nguyên trong [1; 1000]' };
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 3) return { valid: false, reason: 'setIdx phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, setIdx } = params;
      const sets = [
        { sym: '\\mathbb{N}', name: 'một số tự nhiên' },
        { sym: '\\mathbb{Z}', name: 'một số nguyên' },
        { sym: '\\mathbb{Q}', name: 'một số hữu tỉ' },
        { sym: '\\mathbb{R}', name: 'một số thực' },
      ];
      const s = sets[setIdx];
      const correct = '$' + n + ' \\in ' + s.sym + '$';
      const w1 = '$' + n + ' < ' + s.sym + '$';
      const w2 = '$' + n + ' \\subset ' + s.sym + '$';
      const w3 = '$' + n + ' \\le ' + s.sym + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + (n + step) + ' \\notin ' + s.sym + '$'
      );
      return {
        stem: 'Kí hiệu nào sau đây dùng để viết đúng mệnh đề "$' + n + '$ là ' + s.name + '"?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Để diễn đạt một phần tử thuộc một tập hợp, ta dùng kí hiệu "$\\in$".',
          'Do đó mệnh đề "$' + n + '$ là ' + s.name + '" được viết là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 0', params: { n: 0, setIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1: 100 ∈ N', params: { n: 100, setIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2 - MC): Nhận biết tập rỗng qua phương trình bậc hai vô nghiệm
  t10_b2_d02_empty_set_quad_mc: {
    id: 't10_b2_d02_empty_set_quad_mc',
    name: 'Nhận biết tập rỗng qua phương trình bậc hai trên R',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tập hợp rỗng',
    description: 'Trong bốn tập nghiệm trên R của phương trình bậc hai, tìm tập hợp là tập rỗng (phương trình có Δ < 0).',
    conditionSummary: 'p in [1;5], q in [1;6], r > 0 (phương trình vô nghiệm (px+q)²+r=0), và 3 phương trình có Δ > 0',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p của (px + q)² + r', min: 2, max: 5 },
      { name: 'q', label: 'Hằng số q', min: 1, max: 6 },
      { name: 'r', label: 'Hằng số dương r', min: 2, max: 12 },
      { name: 'p1', label: 'Hệ số p1 (nhiễu 1)', min: 2, max: 4 },
      { name: 'q1', label: 'Hằng số q1 (nhiễu 1)', min: 1, max: 5 },
      { name: 'r1', label: 'Hằng số dương r1 (nhiễu 1)', min: 2, max: 10 },
      { name: 'r2a', label: 'Nghiệm nguyên r2a (nhiễu 3)', min: 1, max: 5 },
      { name: 'r2b', label: 'Nghiệm nguyên r2b (nhiễu 3)', min: 2, max: 9 },
    ],
    validateCode: `
      const { p, q, r, p1, q1, r1, r2a, r2b } = params;
      if (!Number.isInteger(p) || p < 1 || p > 6) return { valid: false, reason: 'p phải thuộc [1; 6]' };
      if (!Number.isInteger(q) || q < 1 || q > 8) return { valid: false, reason: 'q phải thuộc [1; 8]' };
      if (!Number.isInteger(r) || r < 1 || r > 20) return { valid: false, reason: 'r phải thuộc [1; 20]' };
      if (!Number.isInteger(p1) || p1 < 1 || p1 > 6) return { valid: false, reason: 'p1 phải thuộc [1; 6]' };
      if (!Number.isInteger(q1) || q1 < 1 || q1 > 8) return { valid: false, reason: 'q1 phải thuộc [1; 8]' };
      if (!Number.isInteger(r1) || r1 < 1 || r1 > 20) return { valid: false, reason: 'r1 phải thuộc [1; 20]' };
      if (!Number.isInteger(r2a) || !Number.isInteger(r2b) || r2a < 1 || r2b <= r2a || r2b > 12) {
        return { valid: false, reason: 'Cần 1 <= r2a < r2b <= 12' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, r, p1, q1, r1, r2a, r2b } = params;
      // Empty set: (px + q)^2 + r = p^2 x^2 + 2pq x + (q^2 + r) = 0 (Δ = -4 p^2 r < 0)
      const a0 = p * p, b0 = 2 * p * q, c0 = q * q + r;
      const eq0 = u.formatQuadratic(a0, b0, c0, 'x') + ' = 0';

      // Non-empty 1: (p1 x + q1)^2 - r1 = 0 (Δ = 4 p1^2 r1 > 0)
      const a1 = p1 * p1, b1 = 2 * p1 * q1, c1 = q1 * q1 - r1;
      const eq1 = u.formatQuadratic(a1, b1, c1, 'x') + ' = 0';

      // Non-empty 2: (2x + (q1 + 2))^2 - 6 = 0 (Δ = 96 > 0)
      const a2 = 4, b2 = 4 * (q1 + 2), c2 = (q1 + 2) * (q1 + 2) - 6;
      const eq2 = u.formatQuadratic(a2, b2, c2, 'x') + ' = 0';

      // Non-empty 3: (x + r2a)(x + r2b) = 0
      const eq3 = u.formatQuadratic(1, r2a + r2b, r2a * r2b, 'x') + ' = 0';

      const correct = '$\\left\\{x \\in \\mathbb{R} \\mid ' + eq0 + '\\right\\}$';
      const w1 = '$\\left\\{x \\in \\mathbb{R} \\mid ' + eq1 + '\\right\\}$';
      const w2 = '$\\left\\{x \\in \\mathbb{R} \\mid ' + eq2 + '\\right\\}$';
      const w3 = '$\\left\\{x \\in \\mathbb{R} \\mid ' + eq3 + '\\right\\}$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$\\left\\{x \\in \\mathbb{R} \\mid ' + u.formatQuadratic(1, 0, -(step * step), 'x') + ' = 0\\right\\}$'
      );
      const delta0 = b0 * b0 - 4 * a0 * c0;
      return {
        stem: 'Tập hợp nào sau đây là tập rỗng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Xét phương trình $' + eq0 + '$ có $\\Delta = ' + b0 + '^2 - 4 \\cdot ' + a0 + ' \\cdot ' + c0 + ' = ' + delta0 + ' < 0$ (hay $(' + u.formatLinear(p, q, 'x') + ')^2 + ' + r + ' > 0\\,\\forall x \\in \\mathbb{R}$), nên phương trình vô nghiệm.',
          'Ba phương trình còn lại đều có biệt thức $\\Delta > 0$ nên đều có nghiệm thực.',
          'Do đó ' + correct + ' là tập rỗng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 0 (có nghiệm kép)', params: { p: 4, q: 3, r: 0, p1: 3, q1: 2, r1: 7, r2a: 3, r2b: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2: 16x² + 24x + 14 = 0', params: { p: 4, q: 3, r: 5, p1: 3, q1: 2, r1: 7, r2a: 3, r2b: 7 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3 - MC): Cách viết đúng quan hệ phần tử và tập hợp con
  t10_b2_d03_subset_notation_mc: {
    id: 't10_b2_d03_subset_notation_mc',
    name: 'Nhận biết cách viết đúng về quan hệ tập con (⊂) và phần tử (∈)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tập hợp con',
    description: 'Cho tập hợp gồm 4 số nguyên phân biệt. Phân biệt cách viết đúng {a} ⊂ C với các cách viết sai {a} ∈ C, {a} < C, a ⊂ C.',
    conditionSummary: '4 số nguyên a1 < a2 < a3 < a4, |ai| <= 50',
    paramSpecs: [
      { name: 'a1', label: 'Phần tử a1', min: -25, max: -6 },
      { name: 'a2', label: 'Phần tử a2 (> a1)', min: -10, max: 3 },
      { name: 'a3', label: 'Phần tử a3 (> a2)', min: 4, max: 14 },
      { name: 'a4', label: 'Phần tử a4 (> a3)', min: 15, max: 35 },
      { name: 'setNameIdx', label: 'Tên tập hợp (0:C, 1:A, 2:B, 3:M)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a1, a2, a3, a4, setNameIdx } = params;
      if (![a1, a2, a3, a4].every((v) => Number.isInteger(v) && Math.abs(v) <= 100)) {
        return { valid: false, reason: 'Các phần tử phải nguyên và có trị tuyệt đối <= 100' };
      }
      if (!(a1 < a2 && a2 < a3 && a3 < a4)) {
        return { valid: false, reason: 'Cần a1 < a2 < a3 < a4' };
      }
      if (!Number.isInteger(setNameIdx) || setNameIdx < 0 || setNameIdx > 3) {
        return { valid: false, reason: 'setNameIdx phải thuộc 0..3' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, a3, a4, setNameIdx } = params;
      const names = ['C', 'A', 'B', 'M'];
      const S = names[setNameIdx];
      const correct = '$\\{' + a4 + '\\} \\subset ' + S + '$';
      const w1 = '$\\{' + a1 + '\\} \\in ' + S + '$';
      const w2 = '$\\{' + a2 + '\\} < ' + S + '$';
      const w3 = '$' + a1 + ' \\subset ' + S + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + (a4 + step) + ' \\in ' + S + '$'
      );
      return {
        stem: 'Cho tập hợp $' + S + ' = \\{' + [a1, a2, a3, a4].join(';\\, ') + '\\}$. Cách viết nào sau đây là đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Kí hiệu $\\subset$ dùng giữa hai tập hợp, còn kí hiệu $\\in$ dùng giữa một phần tử và một tập hợp.',
          'Vì $\\{' + a4 + '\\}$ là một tập hợp con của $' + S + '$ nên cách viết đúng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên phần tử trùng nhau', params: { a1: -4, a2: -4, a3: 9, a4: 15, setNameIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3: C = {-14;-4;9;15} => {15} ⊂ C', params: { a1: -14, a2: -4, a3: 9, a4: 15, setNameIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4 - MC): Tìm x, y để ba tập hợp bằng nhau
  t10_b2_d04_equal_sets_xy_mc: {
    id: 't10_b2_d04_equal_sets_xy_mc',
    name: 'Tìm giá trị x, y để ba tập hợp bằng nhau',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai tập hợp bằng nhau',
    description: 'Cho ba tập hợp gồm 2 phần tử C = {a; b}, E = {a; x}, G = {y; b}. Xác định x và y để C = E = G.',
    conditionSummary: 'a != b, a và b là số nguyên trong [-20; 40]',
    paramSpecs: [
      { name: 'a', label: 'Phần tử a', min: -10, max: 12 },
      { name: 'b', label: 'Phần tử b (khác a)', min: 2, max: 25 },
      { name: 'nameIdx', label: 'Bộ tên tập hợp (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { a, b, nameIdx } = params;
      if (!Number.isInteger(a) || !Number.isInteger(b) || Math.abs(a) > 50 || Math.abs(b) > 50) {
        return { valid: false, reason: 'a và b phải nguyên trong [-50; 50]' };
      }
      if (a === b) return { valid: false, reason: 'a và b phải khác nhau' };
      if (!Number.isInteger(nameIdx) || nameIdx < 0 || nameIdx > 2) return { valid: false, reason: 'nameIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, nameIdx } = params;
      const triples = [
        ['C', 'E', 'G'],
        ['A', 'B', 'C'],
        ['M', 'N', 'P'],
      ];
      const [S1, S2, S3] = triples[nameIdx];
      const correct = '$x = ' + b + ',\\; y = ' + a + '$';
      const w1 = '$x = ' + (b + 1) + ',\\; y = ' + a + '$';
      const w2 = '$x = ' + b + ',\\; y = ' + (a - 1) + '$';
      const w3 = '$x = ' + (b - 2) + ',\\; y = ' + a + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$x = ' + (b + step + 2) + ',\\; y = ' + (a + step) + '$'
      );
      return {
        stem:
          'Cho các tập hợp $' + S1 + ' = \\{' + a + ';\\, ' + b + '\\},\\; ' +
          S2 + ' = \\{' + a + ';\\, x\\},\\; ' +
          S3 + ' = \\{y;\\, ' + b + '\\}$. Giá trị của $x, y$ để ba tập hợp bằng nhau là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ba tập hợp bằng nhau khi và chỉ khi chúng có cùng các phần tử.',
          'Do $' + a + ' \\ne ' + b + '$ nên $' + S1 + ' = ' + S2 + ' = ' + S3 + ' \\Leftrightarrow x = ' + b + ',\\; y = ' + a + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = b', params: { a: 5, b: 5, nameIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4: a=1, b=10 => x=10, y=1', params: { a: 1, b: 10, nameIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5 - MC): Xét 3 mệnh đề (I), (II), (III) về kí hiệu ∈ và ⊂
  t10_b2_d05_belong_subset_3stmts_mc: {
    id: 't10_b2_d05_belong_subset_3stmts_mc',
    name: 'Xét tính đúng sai của 3 mệnh đề (I), (II), (III) về quan hệ ∈ và ⊂',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quan hệ phần tử và tập hợp con',
    description: 'Cho tập hợp 6 phần tử gồm 4 số và 2 chữ y, z. Đánh giá đồng thời 3 phát biểu (I), (II), (III).',
    conditionSummary: '4 số nguyên dương tăng dần a1 < a2 < a3 < a4 <= 50',
    paramSpecs: [
      { name: 'a1', label: 'Số thứ nhất a1', min: 1, max: 8 },
      { name: 'a2', label: 'Số thứ hai a2', min: 2, max: 14 },
      { name: 'a3', label: 'Số thứ ba a3', min: 6, max: 22 },
      { name: 'a4', label: 'Số thứ tư a4', min: 10, max: 35 },
      { name: 'setIdx', label: 'Tên tập hợp (0:B, 1:A, 2:X)', min: 0, max: 2 },
    ],
    validateCode: `
      const { a1, a2, a3, a4, setIdx } = params;
      if (![a1, a2, a3, a4].every((v) => Number.isInteger(v) && v >= 1 && v <= 80)) {
        return { valid: false, reason: 'Các số phải nguyên dương trong [1; 80]' };
      }
      if (!(a1 < a2 && a2 < a3 && a3 < a4)) {
        return { valid: false, reason: 'Cần a1 < a2 < a3 < a4' };
      }
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 2) return { valid: false, reason: 'setIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, a3, a4, setIdx } = params;
      const S = ['B', 'A', 'X'][setIdx];
      const correct = '$(I); (III)$ là mệnh đề đúng';
      const w1 = 'Cả $3$ mệnh đề đều đúng';
      const w2 = '$(II); (III)$ là mệnh đề đúng';
      const w3 = '$(I); (II)$ là mệnh đề đúng';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => 'Chỉ có $(' + step + ')$ là mệnh đề đúng'
      );
      return {
        stem:
          'Cho tập hợp $' + S + ' = \\{' + a1 + ';\\, ' + a2 + ';\\, ' + a3 + ';\\, ' + a4 + ';\\, y;\\, z\\}$. Xét các mệnh đề sau đây, mệnh đề nào đúng?\n' +
          '$(I): y \\in ' + S + '$.\n' +
          '$(II): \\{' + a1 + ';\\, ' + a3 + '\\} \\in ' + S + '$.\n' +
          '$(III): \\{' + a2 + ';\\, z\\} \\subset ' + S + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phần tử $y$ thuộc tập hợp $' + S + '$ nên $(I)$ đúng.',
          'Tập hợp $\\{' + a1 + ';\\, ' + a3 + '\\}$ là tập hợp con của $' + S + '$, không phải một phần tử của $' + S + '$, nên $(II)$ sai.',
          'Mọi phần tử của $\\{' + a2 + ';\\, z\\}$ đều thuộc $' + S + '$ nên $(III)$ đúng.',
          'Vậy $(I); (III)$ là các mệnh đề đúng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a2 = a3', params: { a1: 3, a2: 10, a3: 10, a4: 14, setIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5: B = {3;4;10;14;y;z}', params: { a1: 3, a2: 4, a3: 10, a4: 14, setIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6 - MC): Xác định chuỗi bao hàm G ⊂ H ⊂ D
  t10_b2_d06_subset_chain_mc: {
    id: 't10_b2_d06_subset_chain_mc',
    name: 'Xác định chuỗi bao hàm tập con giữa ba tập hợp',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tập hợp con',
    description: 'Cho ba tập hợp hữu hạn được liệt kê phần tử thỏa mãn G ⊂ H ⊂ D. Xác định quan hệ bao hàm đúng.',
    conditionSummary: '6 phần tử nguyên dương tăng dần v1 < v2 < v3 < v4 < v5 < v6 <= 99',
    paramSpecs: [
      { name: 'v1', label: 'Phần tử v1', min: 1, max: 15 },
      { name: 'v2', label: 'Phần tử v2', min: 10, max: 35 },
      { name: 'v3', label: 'Phần tử v3', min: 18, max: 45 },
      { name: 'v4', label: 'Phần tử v4', min: 25, max: 55 },
      { name: 'v5', label: 'Phần tử v5', min: 35, max: 70 },
      { name: 'v6', label: 'Phần tử v6', min: 45, max: 90 },
      { name: 'nameIdx', label: 'Bộ tên tập hợp (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { v1, v2, v3, v4, v5, v6, nameIdx } = params;
      const arr = [v1, v2, v3, v4, v5, v6];
      if (!arr.every((x) => Number.isInteger(x) && x >= 1 && x <= 120)) {
        return { valid: false, reason: 'Các phần tử phải nguyên dương <= 120' };
      }
      for (let i = 0; i < 5; i++) {
        if (arr[i] >= arr[i + 1]) return { valid: false, reason: 'Cần v1 < v2 < v3 < v4 < v5 < v6' };
      }
      if (!Number.isInteger(nameIdx) || nameIdx < 0 || nameIdx > 2) return { valid: false, reason: 'nameIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v1, v2, v3, v4, v5, v6, nameIdx } = params;
      const triples = [
        ['H', 'D', 'G'],
        ['B', 'C', 'A'],
        ['M', 'P', 'N'],
      ];
      const [H, D, G] = triples[nameIdx];
      const setG = [v2, v5];
      const setH = [v1, v2, v5, v6];
      const setD = [v1, v2, v3, v4, v5, v6];
      const correct = '$' + G + ' \\subset ' + H + ' \\subset ' + D + '$';
      const w1 = '$' + H + ' \\subset ' + G + ' \\subset ' + D + '$';
      const w2 = '$' + D + ' \\subset ' + H + ' \\subset ' + G + '$';
      const w3 = '$' + G + ' \\subset ' + D + ' \\subset ' + H + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + D + ' \\subset ' + G + ' \\subset ' + H + '$ (' + step + ')'
      );
      return {
        stem:
          'Cho các tập hợp $' + H + ' = \\{' + setH.join(';\\, ') + '\\},\\; ' +
          D + ' = \\{' + setD.join(';\\, ') + '\\}$ và $' + G + ' = \\{' + setG.join(';\\, ') + '\\}$. Tìm mệnh đề đúng trong các mệnh đề sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mọi phần tử của $' + G + '$ đều thuộc $' + H + '$ nên $' + G + ' \\subset ' + H + '$.',
          'Mọi phần tử của $' + H + '$ đều thuộc $' + D + '$ nên $' + H + ' \\subset ' + D + '$.',
          'Do đó ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên không tăng dần', params: { v1: 1, v2: 30, v3: 30, v4: 38, v5: 43, v6: 45, nameIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6: G ⊂ H ⊂ D', params: { v1: 1, v2: 30, v3: 32, v4: 38, v5: 43, v6: 45, nameIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7 - MC): Số phần tử của tập nghiệm nguyên phương trình bậc hai
  t10_b2_d07_quad_int_roots_count_mc: {
    id: 't10_b2_d07_quad_int_roots_count_mc',
    name: 'Đếm số phần tử tập nghiệm nguyên của phương trình bậc hai',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Số phần tử của tập hợp',
    description: 'Xác định số phần tử của tập hợp {x ∈ Z | ax² + bx + c = 0} bằng cách giải phương trình và lọc nghiệm nguyên.',
    conditionSummary: 'k in [1;4], q in [2;5], gcd(|p|, q) = 1, r nguyên khác 0',
    paramSpecs: [
      { name: 'k', label: 'Nhân tử chung k', min: 1, max: 4 },
      { name: 'q', label: 'Mẫu số nghiệm phân số q (>= 2)', min: 2, max: 5 },
      { name: 'p', label: 'Tử số nghiệm phân số p (nguyên tố cùng nhau với q)', min: -5, max: 5, allowZero: false },
      { name: 'r', label: 'Nghiệm nguyên r', min: -6, max: 6, allowZero: false },
      { name: 'caseMode', label: 'Số nghiệm nguyên (0: 1 nghiệm, 1: 2 nghiệm, 2: 0 nghiệm)', min: 0, max: 2 },
    ],
    validateCode: `
      const { k, q, p, r, caseMode } = params;
      if (!Number.isInteger(k) || k < 1 || k > 5) return { valid: false, reason: 'k phải thuộc [1; 5]' };
      if (!Number.isInteger(q) || q < 2 || q > 6) return { valid: false, reason: 'q phải thuộc [2; 6]' };
      if (!Number.isInteger(p) || p === 0 || Math.abs(p) > 8) return { valid: false, reason: 'p phải khác 0 và |p| <= 8' };
      if (u.gcd(Math.abs(p), q) !== 1) return { valid: false, reason: 'p/q phải tối giản (không phải số nguyên)' };
      if (!Number.isInteger(r) || r === 0 || Math.abs(r) > 8) return { valid: false, reason: 'r phải khác 0 và |r| <= 8' };
      if (!Number.isInteger(caseMode) || caseMode < 0 || caseMode > 2) return { valid: false, reason: 'caseMode phải thuộc 0..2' };
      if (caseMode === 1 && p === r) return { valid: false, reason: 'Hai nghiệm nguyên phải phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, q, p, r, caseMode } = params;
      let a, b, c, ans, step1, step2;
      if (caseMode === 0) {
        // k(qx - p)(x - r) = 0 -> roots p/q (not int) and r (int)
        a = k * q;
        b = -k * (p + q * r);
        c = k * p * r;
        ans = 1;
        const f1 = u.simplifyFrac(p, q);
        step1 = 'Phương trình $' + u.formatQuadratic(a, b, c, 'x') + ' = 0$ có hai nghiệm $x_1 = ' + f1.latex + ' \\notin \\mathbb{Z}$ và $x_2 = ' + r + ' \\in \\mathbb{Z}$.';
        step2 = 'Vậy $A = \\{' + r + '\\}$ có $1$ phần tử.';
      } else if (caseMode === 1) {
        // k(x - p)(x - r) = 0 -> 2 distinct integer roots
        a = k;
        b = -k * (p + r);
        c = k * p * r;
        ans = 2;
        step1 = 'Phương trình $' + u.formatQuadratic(a, b, c, 'x') + ' = 0$ có hai nghiệm phân biệt $x_1 = ' + p + ' \\in \\mathbb{Z}$ và $x_2 = ' + r + ' \\in \\mathbb{Z}$.';
        step2 = 'Vậy $A = \\{' + Math.min(p, r) + ';\\, ' + Math.max(p, r) + '\\}$ có $2$ phần tử.';
      } else {
        // k(qx - p)(qx + p) = 0 -> ±p/q, neither integer
        a = k * q * q;
        b = 0;
        c = -k * p * p;
        ans = 0;
        const fPos = u.simplifyFrac(Math.abs(p), q);
        step1 = 'Phương trình $' + u.formatQuadratic(a, b, c, 'x') + ' = 0$ có hai nghiệm $x = \\pm ' + fPos.latex + ' \\notin \\mathbb{Z}$.';
        step2 = 'Vậy $A = \\emptyset$ có $0$ phần tử.';
      }
      const eqStr = u.formatQuadratic(a, b, c, 'x') + ' = 0';
      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$0$', '$1$', '$2$', '$3$'].filter((x) => x !== correct),
        rng,
        (step) => '$' + (step + 3) + '$'
      );
      return {
        stem: 'Số phần tử của tập hợp $A = \\{x \\in \\mathbb{Z} \\mid ' + eqStr + '\\}$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [step1, step2],
      };
    `,
    boundaryCases: [
      { label: 'Biên p chia hết cho q', params: { k: 3, q: 3, p: 3, r: 4, caseMode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7: 9x² - 39x + 12 = 0 => 1 phần tử', params: { k: 3, q: 3, p: 1, r: 4, caseMode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8 - MC): Liệt kê phần tử tập hợp số nguyên trong khoảng/nửa khoảng
  t10_b2_d08_list_int_interval_mc: {
    id: 't10_b2_d08_list_int_interval_mc',
    name: 'Liệt kê phần tử của tập hợp số nguyên theo bất đẳng thức kép',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Các cách xác định tập hợp',
    description: 'Liệt kê các số nguyên thỏa mãn a < x ≤ b (hoặc a ≤ x < b, a < x < b, a ≤ x ≤ b).',
    conditionSummary: 'a, b nguyên, 4 <= b - a <= 7, mode in 0..3',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái a', min: -8, max: 3 },
      { name: 'span', label: 'Độ rộng b - a', min: 5, max: 7 },
      { name: 'mode', label: 'Kiểu dấu (0: < ≤, 1: ≤ <, 2: < <, 3: ≤ ≤)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, span, mode } = params;
      if (!Number.isInteger(a) || a < -20 || a > 20) return { valid: false, reason: 'a phải thuộc [-20; 20]' };
      if (!Number.isInteger(span) || span < 4 || span > 8) return { valid: false, reason: 'span phải thuộc [4; 8]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, span, mode } = params;
      const b = a + span;
      const leftInc = mode === 1 || mode === 3;
      const rightInc = mode === 0 || mode === 3;
      const leftSym = leftInc ? '\\le' : '<';
      const rightSym = rightInc ? '\\le' : '<';
      const rangeArr = (lo, hi) => {
        const res = [];
        for (let x = lo; x <= hi; x++) res.push(x);
        return res;
      };
      const fmtSet = (arr) => '$A = \\{' + arr.join(';\\, ') + '\\}$';
      const lo = leftInc ? a : a + 1;
      const hi = rightInc ? b : b - 1;
      const correct = fmtSet(rangeArr(lo, hi));
      const d1 = fmtSet(rangeArr(a, b));
      const d2 = fmtSet(rangeArr(a, b - 2));
      const d3 = fmtSet(rangeArr(a + 1, b - 1));
      const d4 = fmtSet(rangeArr(a, b - 1));
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3, d4].filter((x) => x !== correct),
        rng,
        (step) => fmtSet(rangeArr(lo, hi + step))
      );
      return {
        stem: 'Liệt kê các phần tử của tập hợp $A = \\{x \\in \\mathbb{Z} \\mid ' + a + ' ' + leftSym + ' x ' + rightSym + ' ' + b + '\\}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $x \\in \\mathbb{Z}$ và $' + a + ' ' + leftSym + ' x ' + rightSym + ' ' + b + '$ nên $x$ nhận các giá trị nguyên từ $' + lo + '$ đến $' + hi + '$.',
          'Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên span = 0', params: { a: -3, span: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8: -3 < x ≤ 3', params: { a: -3, span: 6, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9 - MC): Liệt kê nghiệm vô tỉ của phương trình bậc hai trên R
  t10_b2_d09_list_real_quad_irrational_mc: {
    id: 't10_b2_d09_list_real_quad_irrational_mc',
    name: 'Liệt kê các phần tử (nghiệm vô tỉ) của tập nghiệm phương trình bậc hai trên R',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Xác định tập hợp bằng cách liệt kê',
    description: 'Giải phương trình ax² + bx + c = 0 với Δ > 0 không chứa ước chính phương > 1 và viết tập nghiệm trên R.',
    conditionSummary: 'a != 0, b lẻ, Δ = b² - 4ac > 0 không chia hết cho bình phương > 1 (square-free)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (khác 0)', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b (khác 0)', min: -7, max: 7, allowZero: false },
      { name: 'c', label: 'Hằng số c (khác 0)', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (!Number.isInteger(a) || a === 0 || Math.abs(a) > 10) return { valid: false, reason: 'a khác 0 và |a| <= 10' };
      if (!Number.isInteger(b) || b === 0 || Math.abs(b) > 10) return { valid: false, reason: 'b khác 0 và |b| <= 10' };
      if (!Number.isInteger(c) || c === 0 || Math.abs(c) > 10) return { valid: false, reason: 'c khác 0 và |c| <= 10' };
      const delta = b * b - 4 * a * c;
      if (delta <= 1 || delta > 300) return { valid: false, reason: 'Cần 1 < Δ <= 300' };
      for (let d = 2; d * d <= delta; d++) {
        if (delta % (d * d) === 0) return { valid: false, reason: 'Chọn Δ không chứa ước chính phương > 1 để căn tối giản' };
      }
      if (u.gcd(Math.abs(b), 2 * Math.abs(a)) !== 1) return { valid: false, reason: 'Cần gcd(|b|, 2|a|) = 1 để phân số tối giản đẹp' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const delta = b * b - 4 * a * c;
      const denom = 2 * Math.abs(a);
      const midFrac = u.simplifyFrac(-b, 2 * a);
      const radPart = '\\frac{\\sqrt{' + delta + '}}{' + denom + '}';
      const r1 = midFrac.latex + ' - ' + radPart;
      const r2 = midFrac.latex + ' + ' + radPart;
      const eqStr = u.formatQuadratic(a, b, c, 'x') + ' = 0';
      const wHalf = u.simplifyFrac(-b, a);

      const correct = '$F = \\{' + r1 + ';\\, ' + r2 + '\\}$';
      const w1 = '$F = \\emptyset$';
      const w2 = '$F = \\{' + wHalf.latex + '\\}$';
      const w3 = '$F = \\{' + midFrac.latex + '\\}$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$F = \\{' + step + '\\}$'
      );
      return {
        stem: 'Liệt kê các phần tử của tập hợp $F = \\{x \\in \\mathbb{R} \\mid ' + eqStr + '\\}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Xét phương trình $' + eqStr + '$ có $\\Delta = (' + b + ')^2 - 4 \\cdot (' + a + ') \\cdot (' + c + ') = ' + delta + ' > 0$.',
          'Phương trình có hai nghiệm phân biệt $x_1 = ' + r1 + '$ và $x_2 = ' + r2 + '$.',
          'Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -5, c: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9: -7x² - 5x + 5 = 0 (Δ = 165)', params: { a: -7, b: -5, c: 5 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10 - MC): Liệt kê ước tự nhiên lớn hơn k của số N
  t10_b2_d10_list_divisors_gt_mc: {
    id: 't10_b2_d10_list_divisors_gt_mc',
    name: 'Liệt kê các ước tự nhiên lớn hơn k của một số nguyên dương',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Liệt kê phần tử tập hợp',
    description: 'Tìm tất cả các số tự nhiên x > k sao cho x là ước của số nguyên dương N.',
    conditionSummary: 'N trong [18; 72], k trong [2; 7], tập kết quả có từ 3 đến 6 phần tử',
    paramSpecs: [
      { name: 'N', label: 'Số nguyên dương N', min: 18, max: 60 },
      { name: 'k', label: 'Ngưỡng dưới k (x > k)', min: 2, max: 6 },
    ],
    validateCode: `
      const { N, k } = params;
      if (!Number.isInteger(N) || N < 12 || N > 96) return { valid: false, reason: 'N phải thuộc [12; 96]' };
      if (!Number.isInteger(k) || k < 2 || k > 10) return { valid: false, reason: 'k phải thuộc [2; 10]' };
      const divs = [];
      for (let d = 1; d <= N; d++) {
        if (N % d === 0 && d > k) divs.push(d);
      }
      if (divs.length < 3 || divs.length > 7) {
        return { valid: false, reason: 'Số ước > k phải nằm trong [3; 7] để liệt kê đẹp' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { N, k } = params;
      const allDivs = [];
      const validDivs = [];
      const smallDivs = [];
      for (let d = 1; d <= N; d++) {
        if (N % d === 0) {
          allDivs.push(d);
          if (d > k) validDivs.push(d);
          else smallDivs.push(d);
        }
      }
      const fmt = (arr) => '$\\{' + arr.join(';\\, ') + '\\}$';
      const correct = fmt(validDivs);
      const w1 = fmt([1, k]);
      const w2 = fmt(smallDivs.length > 0 ? smallDivs : [1, 2]);
      const w3 = fmt([0, ...smallDivs.slice(0, 2)]);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => fmt(validDivs.slice(0, Math.max(1, validDivs.length - step)))
      );
      return {
        stem: 'Liệt kê các phần tử của tập hợp $A = \\{x \\in \\mathbb{N} \\mid x > ' + k + ',\\; x \\text{ là ước của } ' + N + '\\}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập hợp các ước tự nhiên của $' + N + '$ là $\\{' + allDivs.join(';\\, ') + '\\}$.',
          'Lọc các ước thỏa mãn $x > ' + k + '$, ta thu được $A = \\{' + validDivs.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên N là số nguyên tố (29)', params: { N: 29, k: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10: ước của 28 lớn hơn 3 => {4;7;14;28}', params: { N: 28, k: 3 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11 - MC): Liệt kê bội tự nhiên nhỏ hơn M của số d
  t10_b2_d11_list_multiples_lt_mc: {
    id: 't10_b2_d11_list_multiples_lt_mc',
    name: 'Liệt kê các bội tự nhiên nhỏ hơn M của một số nguyên dương',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Liệt kê phần tử tập hợp',
    description: 'Tìm tất cả các số tự nhiên x < M sao cho x là bội của d (lưu ý 0 ∈ N là bội của mọi số nguyên dương d).',
    conditionSummary: 'd in [3; 9], M in [15; 55], tập kết quả có từ 5 đến 9 phần tử',
    paramSpecs: [
      { name: 'd', label: 'Số cơ sở d', min: 3, max: 8 },
      { name: 'M', label: 'Cận trên M (x < M)', min: 18, max: 52 },
    ],
    validateCode: `
      const { d, M } = params;
      if (!Number.isInteger(d) || d < 2 || d > 12) return { valid: false, reason: 'd phải thuộc [2; 12]' };
      if (!Number.isInteger(M) || M < 10 || M > 80) return { valid: false, reason: 'M phải thuộc [10; 80]' };
      const count = Math.floor((M - 1) / d) + 1;
      if (count < 5 || count > 9) return { valid: false, reason: 'Số phần tử phải nằm trong [5; 9]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d, M } = params;
      const mults = [];
      for (let x = 0; x < M; x += d) mults.push(x);
      const fmt = (arr) => '$\\{' + arr.join(';\\, ') + '\\}$';
      const correct = fmt(mults);
      const w1 = fmt([0, 1, 2, 3]);
      const w2 = fmt(mults.slice(1)); // quên phần tử 0
      const w3 = fmt(mults.filter((_, idx) => idx % 2 === 1));
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => fmt([...mults, mults[mults.length - 1] + d * step])
      );
      return {
        stem: 'Liệt kê các phần tử của tập hợp $A = \\{x \\in \\mathbb{N} \\mid x < ' + M + ',\\; x \\text{ là bội của } ' + d + '\\}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Các bội tự nhiên của $' + d + '$ có dạng $x = ' + d + 'k$ với $k \\in \\mathbb{N}$.',
          'Với điều kiện $' + d + 'k < ' + M + '$, ta được $A = \\{' + mults.join(';\\, ') + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { d: 0, M: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11: bội của 4 nhỏ hơn 30', params: { d: 4, M: 30 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12 - MC): Đếm số nguyên tố trong đoạn [a; b]
  t10_b2_d12_count_primes_range_mc: {
    id: 't10_b2_d12_count_primes_range_mc',
    name: 'Đếm số phần tử tập hợp các số nguyên tố trong đoạn [a; b]',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Số phần tử của tập hợp',
    description: 'Đếm số các số nguyên tố n thỏa mãn a ≤ n ≤ b.',
    conditionSummary: '2 <= a < b <= 70, b - a >= 15',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái a', min: 2, max: 20 },
      { name: 'b', label: 'Đầu mút phải b', min: 22, max: 60 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || !Number.isInteger(b) || a < 1 || b > 80 || b - a < 12) {
        return { valid: false, reason: 'Cần 1 <= a < b <= 80 và b - a >= 12' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const isPrime = (n) => {
        if (n < 2) return false;
        for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
        return true;
      };
      const primes = [];
      for (let n = a; n <= b; n++) if (isPrime(n)) primes.push(n);
      const ans = primes.length;
      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + (ans + 3) + '$', '$' + (ans + 1) + '$', '$' + Math.max(1, ans - 3) + '$'],
        rng,
        (step) => '$' + (ans + step + 3) + '$'
      );
      return {
        stem: 'Số các phần tử của tập hợp $D = \\{n \\in \\mathbb{N} \\mid ' + a + ' \\le n \\le ' + b + ',\\; n \\text{ là số nguyên tố}\\}$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Liệt kê các số nguyên tố thuộc đoạn $[' + a + ';\\, ' + b + ']$: $D = \\{' + primes.join(';\\, ') + '\\}$.',
          'Vậy tập hợp $D$ có $' + ans + '$ phần tử.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b <= a', params: { a: 20, b: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12: 4 <= n <= 34 => 9 số nguyên tố', params: { a: 4, b: 34 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13 - MC): Đếm số chẵn/lẻ trong khoảng (a; b)
  t10_b2_d13_count_even_range_mc: {
    id: 't10_b2_d13_count_even_range_mc',
    name: 'Đếm số phần tử tập hợp các số chẵn (hoặc lẻ) trong khoảng (a; b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Số phần tử của tập hợp',
    description: 'Đếm số các số tự nhiên chẵn (hoặc lẻ) thỏa mãn a < n < b.',
    conditionSummary: '1 <= a < b <= 60, b - a >= 8, parity in {0: chẵn, 1: lẻ}',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: 1, max: 18 },
      { name: 'b', label: 'Cận trên b', min: 15, max: 45 },
      { name: 'parity', label: 'Tính chẵn lẻ (0: chẵn, 1: lẻ)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, parity } = params;
      if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b > 80 || b - a < 8) {
        return { valid: false, reason: 'Cần 0 <= a < b <= 80 và b - a >= 8' };
      }
      if (!Number.isInteger(parity) || parity < 0 || parity > 1) return { valid: false, reason: 'parity phải thuộc {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, parity } = params;
      const elems = [];
      for (let n = a + 1; n < b; n++) {
        if (n % 2 === parity) elems.push(n);
      }
      const ans = elems.length;
      const label = parity === 0 ? 'số chẵn' : 'số lẻ';
      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + (ans + 2) + '$', '$' + Math.max(1, ans - 1) + '$', '$' + (ans + 1) + '$'],
        rng,
        (step) => '$' + (ans + step + 2) + '$'
      );
      return {
        stem: 'Số các phần tử của tập hợp $D = \\{n \\in \\mathbb{N} \\mid ' + a + ' < n < ' + b + ',\\; n \\text{ là ' + label + '}\\}$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Liệt kê các ' + label + ' thỏa mãn $' + a + ' < n < ' + b + '$: $D = \\{' + elems.join(';\\, ') + '\\}$.',
          'Vậy tập hợp $D$ có $' + ans + '$ phần tử.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b - a quá nhỏ', params: { a: 4, b: 7, parity: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13: 4 < n < 19, chẵn => 7 phần tử', params: { a: 4, b: 19, parity: 0 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14 - MC): Chỉ ra tính chất đặc trưng của tập số tự nhiên liên tiếp
  t10_b2_d14_characteristic_prop_mc: {
    id: 't10_b2_d14_characteristic_prop_mc',
    name: 'Chỉ ra tính chất đặc trưng của tập hợp số tự nhiên liên tiếp',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Xác định tập hợp theo tính chất đặc trưng',
    description: 'Chuyển tập hợp liệt kê các số tự nhiên liên tiếp {a; a+1; ...; b} sang cách viết chỉ ra tính chất đặc trưng.',
    conditionSummary: 'a >= 2, len in [5; 8]',
    paramSpecs: [
      { name: 'a', label: 'Số bắt đầu a', min: 2, max: 20 },
      { name: 'len', label: 'Số lượng phần tử', min: 5, max: 8 },
    ],
    validateCode: `
      const { a, len } = params;
      if (!Number.isInteger(a) || a < 2 || a > 40) return { valid: false, reason: 'a phải thuộc [2; 40]' };
      if (!Number.isInteger(len) || len < 4 || len > 10) return { valid: false, reason: 'len phải thuộc [4; 10]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, len } = params;
      const b = a + len - 1;
      const elems = [];
      for (let x = a; x <= b; x++) elems.push(x);
      const correct = '$A = \\{x \\in \\mathbb{N} \\mid ' + a + ' \\le x \\le ' + b + '\\}$';
      const w1 = '$A = \\{x \\in \\mathbb{N} \\mid x \\le ' + b + '\\}$';
      const w2 = '$A = \\{x \\in \\mathbb{N} \\mid x \\ge ' + b + '\\}$';
      const w3 = '$A = \\{x \\in \\mathbb{N} \\mid 1 \\le x \\le ' + b + '\\}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$A = \\{x \\in \\mathbb{N} \\mid ' + a + ' < x < ' + (b + step) + '\\}$'
      );
      return {
        stem: 'Chỉ ra tính chất đặc trưng của tập hợp $A = \\{' + elems.join(';\\, ') + '\\}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Các phần tử của $A$ là tất cả các số tự nhiên liên tiếp từ $' + a + '$ đến $' + b + '$.',
          'Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1 (trùng nhiễu 1 <= x <= b)', params: { a: 1, len: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14: {8;9;10;11;12;13;14}', params: { a: 8, len: 7 }, expectedValid: true },
    ],
  },
};
