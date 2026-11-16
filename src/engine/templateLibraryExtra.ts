import { MathTemplate } from '../types/math';

export const EXTRA_TEMPLATES_10_11: Record<string, MathTemplate> = {
  // =====================================================================
  // TOÁN 10 BỔ SUNG (BÀI 1 -> BÀI 27)
  // =====================================================================
  t10_b1_proposition_mc: {
    id: 't10_b1_proposition_mc',
    name: 'Xác định số giá trị nguyên để mệnh đề chứa biến đúng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Mệnh đề',
    description: 'Cho mệnh đề chứa biến P(n): "an + b > 0" trên đoạn số nguyên [-r; r]. Đếm số giá trị nguyên của n để P(n) là mệnh đề đúng.',
    conditionSummary: 'a ≠ 0 và r >= 2 để khoảng xét đủ rộng',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -6, max: 6 },
      { name: 'r', label: 'Bán kính miền [-r; r]', min: 2, max: 6 },
    ],
    validateCode: `
      if (params.a === 0) return { valid: false, reason: 'a = 0 làm mất biến n trong mệnh đề' };
      if (params.r < 2) return { valid: false, reason: 'Bán kính r phải >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, r } = params;
      const validInts = [];
      for (let n = -r; n <= r; n++) {
        if (a * n + b > 0) validInts.push(n);
      }
      const cnt = validInts.length;
      const total = 2 * r + 1;
      const expr = u.formatLinear(a, b).replace(/x/g, 'n');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + cnt + '$',
        ['$' + Math.max(0, cnt - 1) + '$', '$' + (cnt + 1) + '$', '$' + (total - cnt) + '$'],
        rng,
        (k) => '$' + (cnt + k + 2) + '$'
      );
      return {
        stem: 'Cho mệnh đề chứa biến $P(n): "' + expr + ' > 0"$ với $n \\in \\mathbb{Z}$ và $-' + r + ' \\le n \\le ' + r + '$. Có bao nhiêu giá trị nguyên của $n$ để $P(n)$ là mệnh đề đúng?',
        options,
        correctIndex,
        answerSummary: '$' + cnt + '$',
        solutionSteps: [
          'Giải bất phương trình $' + expr + ' > 0$ trên tập $\\mathbb{Z} \\cap [-' + r + ';\\, ' + r + ']$.',
          'Các giá trị nguyên $n$ thỏa mãn là: $\\{' + (validInts.length ? validInts.join(',\\, ') : '\\varnothing') + '\\}$.',
          'Vậy có $' + cnt + '$ giá trị nguyên của $n$ làm cho $P(n)$ đúng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (mất biến n)', params: { a: 0, b: 2, r: 3 }, expectedValid: false },
      { label: 'Biên a < 0', params: { a: -2, b: 3, r: 4 }, expectedValid: true },
    ],
  },

  t10_b3_linear_ineq_2var_mc: {
    id: 't10_b3_linear_ineq_2var_mc',
    name: 'Kiểm tra nghiệm của bất phương trình bậc nhất hai ẩn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bất phương trình bậc nhất hai ẩn',
    description: 'Cho bất phương trình ax + by <= c với a, b không đồng thời bằng 0. Tìm cặp số (x; y) là nghiệm của bất phương trình.',
    conditionSummary: 'a^2 + b^2 > 0 để bất phương trình là bậc nhất hai ẩn thực sự',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4, allowZero: false },
      { name: 'x0', label: 'Hoành độ mẫu x0', min: -3, max: 3 },
      { name: 'y0', label: 'Tung độ mẫu y0', min: -3, max: 3 },
    ],
    validateCode: `
      if (params.a === 0 && params.b === 0) return { valid: false, reason: 'a và b không được đồng thời bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0, y0 } = params;
      const c = a * x0 + b * y0 + 2;
      const lhs = [u.formatTerm(a, 'x', true), u.formatTerm(b, 'y', false)].filter(Boolean).join('');
      const correct = '$(' + x0 + ';\\, ' + y0 + ')$';
      const stepX = a > 0 ? 3 : -3;
      const stepY = b > 0 ? 3 : -3;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + (x0 + stepX) + ';\\, ' + (y0 + stepY) + ')$',
          '$(' + (x0 + 2 * stepX) + ';\\, ' + y0 + ')$',
          '$(' + x0 + ';\\, ' + (y0 + 2 * stepY) + ')$',
        ],
        rng,
        (k) => '$(' + (x0 + (k + 2) * stepX) + ';\\, ' + (y0 + stepY) + ')$'
      );
      return {
        stem: 'Cặp số nào sau đây là một nghiệm của bất phương trình $' + lhs + ' \\le ' + c + '$?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thay tọa độ $(x;\\, y) = (' + x0 + ';\\, ' + y0 + ')$ vào vế trái: $' + a + '\\cdot(' + x0 + ') + (' + b + ')\\cdot(' + y0 + ') = ' + (a * x0 + b * y0) + ' \\le ' + c + '$ (đúng).',
          'Các cặp số còn lại đều cho giá trị vế trái lớn hơn $' + c + '$. Vậy chọn ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0, b = 0', params: { a: 0, b: 0, x0: 1, y0: 1 }, expectedValid: false },
      { label: 'Biên hệ số âm', params: { a: -2, b: 3, x0: -1, y0: 2 }, expectedValid: true },
    ],
  },

  t10_b4_system_ineq_2var_sa: {
    id: 't10_b4_system_ineq_2var_sa',
    name: 'Tìm giá trị lớn nhất của biểu thức F(x; y) trên miền nghiệm hệ BPT',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hệ bất phương trình bậc nhất hai ẩn',
    description: 'Miền nghiệm gồm x >= 0, y >= 0, x <= m, y <= n, x + y <= s với max(m, n) < s < m + n. Tính max F = px + qy.',
    conditionSummary: 'm >= 2, n >= 2 và max(m, n) < s < m + n để miền đa giác đủ 5 đỉnh không suy biến',
    paramSpecs: [
      { name: 'm', label: 'Chặn x <= m', min: 3, max: 8 },
      { name: 'n', label: 'Chặn y <= n', min: 3, max: 8 },
      { name: 's', label: 'Chặn x + y <= s', min: 5, max: 14 },
      { name: 'p', label: 'Hệ số p', min: 1, max: 5 },
      { name: 'q', label: 'Hệ số q', min: 1, max: 5 },
    ],
    validateCode: `
      const { m, n, s, p, q } = params;
      if (m < 2 || n < 2 || p <= 0 || q <= 0) return { valid: false, reason: 'Các tham số phải dương' };
      if (s <= Math.max(m, n) || s >= m + n) return { valid: false, reason: 'Cần max(m, n) < s < m + n để miền ngũ giác không suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, n, s, p, q } = params;
      const vertices = [
        [0, 0],
        [m, 0],
        [m, s - m],
        [s - n, n],
        [0, n],
      ];
      const vals = vertices.map(([x, y]) => p * x + q * y);
      const maxVal = Math.max(...vals);
      const expr = u.formatLinear(p, 0).replace(/x/g, 'x') + ' + ' + (q === 1 ? 'y' : q + 'y');
      return {
        stem: 'Biết $(x;\\, y)$ là nghiệm của hệ bất phương trình $\\begin{cases} x \\ge 0, \\, y \\ge 0 \\\\ x \\le ' + m + ', \\, y \\le ' + n + ' \\\\ x + y \\le ' + s + ' \\end{cases}$. Giá trị lớn nhất của biểu thức $F(x;\\, y) = ' + expr + '$ bằng bao nhiêu?',
        shortAnswer: '' + maxVal,
        numericValue: maxVal,
        answerSummary: '$F_{\\max} = ' + maxVal + '$',
        solutionSteps: [
          'Miền nghiệm của hệ là ngũ giác lồi có các đỉnh: $O(0;0),\\, A(' + m + ';0),\\, B(' + m + ';' + (s - m) + '),\\, C(' + (s - n) + ';' + n + '),\\, D(0;' + n + ')$.',
          'Tính giá trị $F$ tại các đỉnh: ' + vertices.map(([x, y], i) => '$F(' + x + ';\\,' + y + ') = ' + vals[i] + '$').join(', ') + '.',
          'Vậy $\\max F = ' + maxVal + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên s >= m + n (ràng buộc x+y<=s thừa)', params: { m: 4, n: 4, s: 8, p: 2, q: 3 }, expectedValid: false },
      { label: 'Biên ngũ giác hợp lệ', params: { m: 5, n: 4, s: 7, p: 2, q: 3 }, expectedValid: true },
    ],
  },

  t10_b5_trig_0_180_mc: {
    id: 't10_b5_trig_0_180_mc',
    name: 'Tính giá trị lượng giác của góc tù từ 90° đến 180°',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giá trị lượng giác của góc từ 0° đến 180°',
    description: 'Cho sin α = a/c (bộ Pytago) với 90° < α < 180°. Tính cos α.',
    conditionSummary: 'Sử dụng bộ Pytago (3,4,5), (5,12,13), (8,15,17) và góc tù nên cos α < 0',
    paramSpecs: [
      { name: 'tripleIdx', label: 'Bộ Pytago (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.tripleIdx < 0 || params.tripleIdx > 2) return { valid: false, reason: 'Chỉ số bộ Pytago phải từ 0 đến 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
      ];
      const [a, b, c] = triples[params.tripleIdx];
      const sinF = u.simplifyFrac(a, c);
      const cosF = u.simplifyFrac(-b, c);
      const wrong1 = u.simplifyFrac(b, c);
      const wrong2 = u.simplifyFrac(-a, b);
      const wrong3 = u.simplifyFrac(a, b);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + cosF.latex + '$',
        ['$' + wrong1.latex + '$', '$' + wrong2.latex + '$', '$' + wrong3.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(-(b + k), c + 1).latex + '$'
      );
      return {
        stem: 'Cho $\\sin \\alpha = ' + sinF.latex + '$ với $90^\\circ < \\alpha < 180^\\circ$. Giá trị của $\\cos \\alpha$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + cosF.latex + '$',
        solutionSteps: [
          'Vì $90^\\circ < \\alpha < 180^\\circ$ nên $\\cos \\alpha < 0$.',
          'Áp dụng $\\cos^2 \\alpha = 1 - \\sin^2 \\alpha = 1 - \\frac{' + (a * a) + '}{' + (c * c) + '} = \\frac{' + (b * b) + '}{' + (c * c) + '}$.',
          'Do $\\cos \\alpha < 0$ nên $\\cos \\alpha = ' + cosF.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ngoài miền chỉ số', params: { tripleIdx: 3 }, expectedValid: false },
      { label: 'Biên bộ (3,4,5)', params: { tripleIdx: 0 }, expectedValid: true },
    ],
  },

  t10_b7_vector_intro_mc: {
    id: 't10_b7_vector_intro_mc',
    name: 'Đếm số vectơ khác vectơ-không tạo bởi các đỉnh đa giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Các khái niệm mở đầu về vectơ',
    description: 'Cho n điểm phân biệt (n >= 3). Tính số vectơ khác vectơ-không có điểm đầu và điểm cuối là 2 trong n điểm đó.',
    conditionSummary: 'Số điểm n >= 3',
    paramSpecs: [
      { name: 'n', label: 'Số đỉnh đa giác n', min: 3, max: 10 },
    ],
    validateCode: `
      if (params.n < 3) return { valid: false, reason: 'Số đỉnh phải n >= 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n } = params;
      const ans = n * (n - 1);
      const comb2 = (n * (n - 1)) / 2;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + comb2 + '$', '$' + (n * n) + '$', '$' + (2 * n) + '$'],
        rng,
        (k) => '$' + (ans + k * 2) + '$'
      );
      return {
        stem: 'Cho đa giác lồi có $' + n + '$ đỉnh. Số vectơ khác vectơ-không có điểm đầu và điểm cuối là các đỉnh của đa giác bằng:',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Mỗi vectơ khác $\\vec{0}$ được xác định bởi một cặp điểm đầu và điểm cuối có thứ tự chọn từ $' + n + '$ đỉnh.',
          'Vậy số vectơ là chỉnh hợp chập $2$ của $' + n + '$: $A_{' + n + '}^2 = ' + n + ' \\cdot ' + (n - 1) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 2 (không tạo đa giác)', params: { n: 2 }, expectedValid: false },
      { label: 'Biên tam giác n = 3', params: { n: 3 }, expectedValid: true },
    ],
  },

  t10_b8_vector_sum_diff_sa: {
    id: 't10_b8_vector_sum_diff_sa',
    name: 'Tính độ dài tổng hai vectơ trong hình chữ nhật',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tổng và hiệu của hai vectơ',
    description: 'Cho hình chữ nhật ABCD có cạnh k*3 và k*4 (bộ Pytago). Tính độ dài |AB + AD| = AC = 5k.',
    conditionSummary: 'Hệ số k >= 1 để độ dài cạnh dương và kết quả nguyên',
    paramSpecs: [
      { name: 'k', label: 'Hệ số tỉ lệ k', min: 1, max: 8 },
      { name: 'tripleIdx', label: 'Bộ Pytago (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      if (params.k <= 0) return { valid: false, reason: 'Hệ số k phải dương' };
      if (params.tripleIdx !== 0 && params.tripleIdx !== 1) return { valid: false, reason: 'Chỉ số bộ Pytago phải là 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const bases = [
        [3, 4, 5],
        [5, 12, 13],
      ];
      const [u1, u2, u3] = bases[params.tripleIdx];
      const a = u1 * params.k;
      const b = u2 * params.k;
      const c = u3 * params.k;
      return {
        stem: 'Cho hình chữ nhật $ABCD$ có $AB = ' + a + '$ và $AD = ' + b + '$. Tính độ dài của vectơ tổng $|\\overrightarrow{AB} + \\overrightarrow{AD}|$.',
        shortAnswer: '' + c,
        numericValue: c,
        answerSummary: '$' + c + '$',
        solutionSteps: [
          'Theo quy tắc hình bình hành, ta có $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$.',
          'Trong tam giác vuông $ABC$, đường chéo $AC = \\sqrt{AB^2 + AD^2} = \\sqrt{' + a + '^2 + ' + b + '^2} = ' + c + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (cạnh bằng 0)', params: { k: 0, tripleIdx: 0 }, expectedValid: false },
      { label: 'Biên bộ (5, 12, 13)', params: { k: 2, tripleIdx: 1 }, expectedValid: true },
    ],
  },

  t10_b9_vector_scalar_mc: {
    id: 't10_b9_vector_scalar_mc',
    name: 'Biểu diễn vectơ theo tỉ số chia đoạn thẳng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích của một vectơ với một số',
    description: 'Cho điểm M nằm trên đoạn thẳng AB thỏa mãn p*MA + q*MB = 0. Biểu diễn AM theo AB.',
    conditionSummary: 'p >= 1, q >= 1 và p != q để tránh trung điểm tầm thường',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p', min: 1, max: 6 },
      { name: 'q', label: 'Hệ số q', min: 1, max: 6 },
    ],
    validateCode: `
      if (params.p <= 0 || params.q <= 0) return { valid: false, reason: 'p và q phải dương' };
      if (params.p === params.q) return { valid: false, reason: 'p = q tạo trung điểm đơn giản, chọn p ≠ q' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      const frac = u.simplifyFrac(q, p + q);
      const f1 = u.simplifyFrac(p, p + q);
      const f2 = u.simplifyFrac(-q, p + q);
      const f3 = u.simplifyFrac(q, Math.abs(p - q));
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$\\overrightarrow{AM} = ' + frac.latex + '\\overrightarrow{AB}$',
        [
          '$\\overrightarrow{AM} = ' + f1.latex + '\\overrightarrow{AB}$',
          '$\\overrightarrow{AM} = ' + f2.latex + '\\overrightarrow{AB}$',
          '$\\overrightarrow{AM} = ' + f3.latex + '\\overrightarrow{AB}$',
        ],
        rng,
        (k) => '$\\overrightarrow{AM} = ' + u.simplifyFrac(q + k, p + q + 1).latex + '\\overrightarrow{AB}$'
      );
      return {
        stem: 'Cho đoạn thẳng $AB$ và điểm $M$ thỏa mãn $' + (p === 1 ? '' : p) + '\\overrightarrow{MA} + ' + (q === 1 ? '' : q) + '\\overrightarrow{MB} = \\vec{0}$. Đẳng thức nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: '$\\overrightarrow{AM} = ' + frac.latex + '\\overrightarrow{AB}$',
        solutionSteps: [
          'Chèn điểm $A$ vào $\\overrightarrow{MB} = \\overrightarrow{MA} + \\overrightarrow{AB}$, ta được $(' + p + ' + ' + q + ')\\overrightarrow{MA} + ' + q + '\\overrightarrow{AB} = \\vec{0}$.',
          'Suy ra $' + (p + q) + '\\overrightarrow{AM} = ' + q + '\\overrightarrow{AB} \\Leftrightarrow \\overrightarrow{AM} = ' + frac.latex + '\\overrightarrow{AB}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { p: 0, q: 3 }, expectedValid: false },
      { label: 'Biên p = 2, q = 3', params: { p: 2, q: 3 }, expectedValid: true },
    ],
  },

  t10_b10_vector_coord_mc: {
    id: 't10_b10_vector_coord_mc',
    name: 'Tìm đỉnh thứ tư của hình bình hành trong mặt phẳng Oxy',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vectơ trong mặt phẳng toạ độ',
    description: 'Cho 3 điểm không thẳng hàng A, B, C. Tìm tọa độ điểm D sao cho ABCD là hình bình hành.',
    conditionSummary: 'A, B, C không thẳng hàng để hình bình hành ABCD không suy biến',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -4, max: 4 },
      { name: 'yA', label: 'y_A', min: -4, max: 4 },
      { name: 'xB', label: 'x_B', min: -4, max: 4 },
      { name: 'yB', label: 'y_B', min: -4, max: 4 },
      { name: 'xC', label: 'x_C', min: -4, max: 4 },
      { name: 'yC', label: 'y_C', min: -4, max: 4 },
    ],
    validateCode: `
      const { xA, yA, xB, yB, xC, yC } = params;
      const cross = (xB - xA) * (yC - yA) - (yB - yA) * (xC - xA);
      if (cross === 0) return { valid: false, reason: 'Ba điểm A, B, C thẳng hàng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, xB, yB, xC, yC } = params;
      const xD = xA + xC - xB;
      const yD = yA + yC - yB;
      const correct = '$D(' + xD + ';\\, ' + yD + ')$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$D(' + (xA + xB - xC) + ';\\, ' + (yA + yB - yC) + ')$',
          '$D(' + (xB + xC - xA) + ';\\, ' + (yB + yC - yA) + ')$',
          '$D(' + (-xD) + ';\\, ' + (-yD) + ')$',
        ],
        rng,
        (k) => '$D(' + (xD + k) + ';\\, ' + (yD - k) + ')$'
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, cho ba điểm $A(' + xA + ';\\, ' + yA + '),\\, B(' + xB + ';\\, ' + yB + '),\\, C(' + xC + ';\\, ' + yC + ')$. Tọa độ điểm $D$ để tứ giác $ABCD$ là hình bình hành là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$ABCD$ là hình bình hành khi và chỉ khi $\\overrightarrow{AB} = \\overrightarrow{DC}$.',
          'Ta có $\\overrightarrow{AB} = (' + (xB - xA) + ';\\, ' + (yB - yA) + ')$ và $\\overrightarrow{DC} = (' + xC + ' - x_D;\\, ' + yC + ' - y_D)$.',
          'Giải hệ được $x_D = ' + xD + ',\\, y_D = ' + yD + '$, vậy $' + correct.slice(1, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A, B, C thẳng hàng', params: { xA: 0, yA: 0, xB: 1, yB: 1, xC: 2, yC: 2 }, expectedValid: false },
      { label: 'Biên tam giác không thẳng hàng', params: { xA: 1, yA: 2, xB: 3, yB: -1, xC: 0, yC: 4 }, expectedValid: true },
    ],
  },

  t10_b12_approx_error_sa: {
    id: 't10_b12_approx_error_sa',
    name: 'Tìm số quy tròn của số gần đúng theo độ chính xác d',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Số gần đúng và sai số',
    description: 'Cho số gần đúng a với độ chính xác d = 50 hoặc 500. Tìm số quy tròn của a.',
    conditionSummary: 'Độ chính xác d thuộc {50, 500} quy tròn tương ứng đến hàng trăm hoặc hàng nghìn',
    paramSpecs: [
      { name: 'base', label: 'Phần nghìn', min: 12, max: 85 },
      { name: 'rem', label: 'Phần dư 3 chữ số', min: 105, max: 985 },
      { name: 'mode', label: 'Cấp chính xác (0: d=50, 1: d=500)', min: 0, max: 1 },
    ],
    validateCode: `
      if (params.mode !== 0 && params.mode !== 1) return { valid: false, reason: 'mode phải là 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { base, rem, mode } = params;
      const num = base * 1000 + rem;
      const d = mode === 0 ? 50 : 500;
      const unit = mode === 0 ? 100 : 1000;
      const unitName = mode === 0 ? 'hàng trăm' : 'hàng nghìn';
      const rounded = Math.round(num / unit) * unit;
      return {
        stem: 'Hãy viết số quy tròn của số gần đúng $a = ' + num + '$ biết độ chính xác là $d = ' + d + '$.',
        shortAnswer: '' + rounded,
        numericValue: rounded,
        answerSummary: '$' + rounded + '$',
        solutionSteps: [
          'Hàng lớn nhất của độ chính xác $d = ' + d + '$ là ' + (mode === 0 ? 'hàng chục' : 'hàng trăm') + ', do đó ta quy tròn số $a$ đến ' + unitName + '.',
          'Số quy tròn của $' + num + '$ đến ' + unitName + ' là $' + rounded + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode ngoài miền', params: { base: 15, rem: 450, mode: 2 }, expectedValid: false },
      { label: 'Biên làm tròn lên', params: { base: 24, rem: 670, mode: 1 }, expectedValid: true },
    ],
  },

  t10_b13_central_tendency_sa: {
    id: 't10_b13_central_tendency_sa',
    name: 'Tìm số trung bình và trung vị của mẫu số liệu không ghép nhóm',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Các số đặc trưng đo xu thế trung tâm',
    description: 'Cho mẫu số liệu gồm 5 giá trị điều chỉnh để số trung bình nguyên. Tính tổng số trung bình và trung vị.',
    conditionSummary: 'Các giá trị mẫu dương và tổng chia hết cho 5',
    paramSpecs: [
      { name: 'x1', label: 'Giá trị 1', min: 2, max: 6 },
      { name: 'd1', label: 'Bước tăng 1', min: 1, max: 4 },
      { name: 'd2', label: 'Bước tăng 2', min: 1, max: 4 },
      { name: 'd3', label: 'Bước tăng 3', min: 1, max: 4 },
    ],
    validateCode: `
      if (params.d1 <= 0 || params.d2 <= 0 || params.d3 <= 0) return { valid: false, reason: 'Bước tăng phải dương để dãy tăng ngặt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, d1, d2, d3 } = params;
      const a1 = x1;
      const a2 = a1 + d1;
      const a3 = a2 + d2;
      const a4 = a3 + d3;
      const rem = (a1 + a2 + a3 + a4) % 5;
      const add5 = rem === 0 ? 5 : 5 - rem;
      const a5 = a4 + add5;
      const mean = (a1 + a2 + a3 + a4 + a5) / 5;
      const median = a3;
      const ans = mean + median;
      return {
        stem: 'Cho mẫu số liệu điểm kiểm tra của 5 học sinh: $' + a1 + ',\\, ' + a2 + ',\\, ' + a3 + ',\\, ' + a4 + ',\\, ' + a5 + '$. Tính tổng của số trung bình $\\overline{x}$ và trung vị $M_e$ của mẫu số liệu trên.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '$\\overline{x} + M_e = ' + ans + '$',
        solutionSteps: [
          'Mẫu số liệu đã sắp xếp theo thứ tự không giảm gồm 5 phần tử nên trung vị là số chính giữa: $M_e = ' + median + '$.',
          'Số trung bình: $\\overline{x} = \\frac{' + a1 + ' + ' + a2 + ' + ' + a3 + ' + ' + a4 + ' + ' + a5 + '}{5} = ' + mean + '$.',
          'Tổng cần tìm: $\\overline{x} + M_e = ' + mean + ' + ' + median + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d1 = 0', params: { x1: 3, d1: 0, d2: 2, d3: 2 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { x1: 4, d1: 1, d2: 2, d3: 2 }, expectedValid: true },
    ],
  },

  t10_b14_dispersion_sa: {
    id: 't10_b14_dispersion_sa',
    name: 'Tính phương sai của mẫu số liệu đối xứng không ghép nhóm',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Các số đặc trưng đo độ phân tán',
    description: 'Cho 5 số liệu dạng m - 2d, m - d, m, m + d, m + 2d với d > 0. Phương sai s^2 = 2d^2 luôn là số nguyên.',
    conditionSummary: 'Khoảng cách d > 0 để mẫu có độ phân tán dương',
    paramSpecs: [
      { name: 'm', label: 'Trung tâm m', min: 10, max: 30 },
      { name: 'd', label: 'Khoảng cách d', min: 1, max: 6 },
    ],
    validateCode: `
      if (params.d <= 0) return { valid: false, reason: 'd phải dương để các số liệu không trùng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, d } = params;
      const arr = [m - 2 * d, m - d, m, m + d, m + 2 * d];
      const varVal = 2 * d * d;
      return {
        stem: 'Cho mẫu số liệu gồm 5 giá trị: $' + arr.join(',\\, ') + '$. Tính phương sai $s^2$ của mẫu số liệu trên.',
        shortAnswer: '' + varVal,
        numericValue: varVal,
        answerSummary: '$s^2 = ' + varVal + '$',
        solutionSteps: [
          'Số trung bình của mẫu số liệu là $\\overline{x} = ' + m + '$.',
          'Phương sai $s^2 = \\frac{(-' + (2 * d) + ')^2 + (-' + d + ')^2 + 0^2 + ' + d + '^2 + ' + (2 * d) + '^2}{5} = \\frac{' + (10 * d * d) + '}{5} = ' + varVal + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0 (tất cả bằng m, s^2 = 0)', params: { m: 15, d: 0 }, expectedValid: false },
      { label: 'Biên d = 3', params: { m: 20, d: 3 }, expectedValid: true },
    ],
  },

  t10_b15_function_domain_mc: {
    id: 't10_b15_function_domain_mc',
    name: 'Tìm tập xác định của hàm số chứa căn và phân thức',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số',
    description: 'Cho y = sqrt(x - a) / (x - b) với a < b. Tập xác định là [a; +∞) \\ {b}.',
    conditionSummary: 'a < b để điểm loại trừ b thực sự nằm trong miền x >= a',
    paramSpecs: [
      { name: 'a', label: 'Cận căn a', min: -5, max: 3 },
      { name: 'b', label: 'Nghiệm mẫu b', min: -2, max: 7 },
    ],
    validateCode: `
      if (params.a >= params.b) return { valid: false, reason: 'Cần a < b để b thuộc [a; +∞)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const correct = '$[' + a + ';\\, +\\infty) \\setminus \\{' + b + '\\}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + a + ';\\, +\\infty) \\setminus \\{' + b + '\\}$',
          '$[' + a + ';\\, +\\infty)$',
          '$\\mathbb{R} \\setminus \\{' + b + '\\}$',
        ],
        rng,
        (k) => '$[' + (a - k) + ';\\, +\\infty) \\setminus \\{' + b + '\\}$'
      );
      return {
        stem: 'Tập xác định $D$ của hàm số $y = \\frac{\\sqrt{' + u.formatShift('x', -a) + '}}{' + u.formatShift('x', -b) + '}$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện xác định: $\\begin{cases} ' + u.formatShift('x', -a) + ' \\ge 0 \\\\ ' + u.formatShift('x', -b) + ' \\neq 0 \\end{cases} \\Leftrightarrow \\begin{cases} x \\ge ' + a + ' \\\\ x \\neq ' + b + ' \\end{cases}$.',
          'Vì $' + a + ' < ' + b + '$ nên tập xác định là $D = [' + a + ';\\, +\\infty) \\setminus \\{' + b + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b (b ngoài miền căn)', params: { a: 3, b: 1 }, expectedValid: false },
      { label: 'Biên a < b', params: { a: -2, b: 3 }, expectedValid: true },
    ],
  },

  t10_b18_radical_eq_sa: {
    id: 't10_b18_radical_eq_sa',
    name: 'Giải phương trình chứa căn quy về bậc hai',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình quy về phương trình bậc hai',
    description: 'Giải sqrt(2x^2 + px + q) = x + k với hai nghiệm x1 < -k < x0, chỉ nhận nghiệm x0 thỏa điều kiện x + k >= 0.',
    conditionSummary: 'x1 < -k < x0 để loại nghiệm ngoại lai x1 chặt chẽ',
    paramSpecs: [
      { name: 'k', label: 'Hằng số k', min: -3, max: 3 },
      { name: 'd1', label: 'Khoảng cách x0 - (-k)', min: 1, max: 5 },
      { name: 'd2', label: 'Khoảng cách (-k) - x1', min: 1, max: 5 },
    ],
    validateCode: `
      if (params.d1 <= 0 || params.d2 <= 0) return { valid: false, reason: 'Khoảng cách d1, d2 phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, d1, d2 } = params;
      const x0 = -k + d1;
      const x1 = -k - d2;
      const B = 2 * k - x0 - x1;
      const C = k * k + x0 * x1;
      const radExpr = u.formatQuadratic(2, B, C);
      const rhs = u.formatShift('x', k);
      return {
        stem: 'Tìm nghiệm của phương trình $\\sqrt{' + radExpr + '} = ' + rhs + '$.',
        shortAnswer: '' + x0,
        numericValue: x0,
        answerSummary: '$x = ' + x0 + '$',
        solutionSteps: [
          'Điều kiện: $' + rhs + ' \\ge 0 \\Leftrightarrow x \\ge ' + (-k) + '$.',
          'Bình phương hai vế thu được $' + radExpr + ' = (' + rhs + ')^2 \\Leftrightarrow x^2' + u.formatTerm(-(x0 + x1), 'x', false) + u.formatTerm(x0 * x1, '', false) + ' = 0$.',
          'Giải phương trình bậc hai được $x = ' + x0 + '$ (thỏa mãn) hoặc $x = ' + x1 + '$ (loại vì $' + x1 + ' < ' + (-k) + '$). Vậy nghiệm duy nhất là $x = ' + x0 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d1 = 0', params: { k: 1, d1: 0, d2: 2 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { k: -2, d1: 3, d2: 2 }, expectedValid: true },
    ],
  },

  t10_b19_line_eq_mc: {
    id: 't10_b19_line_eq_mc',
    name: 'Viết phương trình tổng quát đường thẳng qua điểm với vectơ pháp tuyến',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng',
    description: 'Viết phương trình đường thẳng đi qua M(x0; y0) và có vectơ pháp tuyến n(a; b) khác 0.',
    conditionSummary: 'a != 0 và b != 0 để phương trình đầy đủ cả x và y',
    paramSpecs: [
      { name: 'a', label: 'n_x', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'n_y', min: -4, max: 4, allowZero: false },
      { name: 'x0', label: 'x_M', min: -5, max: 5 },
      { name: 'y0', label: 'y_M', min: -5, max: 5 },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'Chọn a ≠ 0 và b ≠ 0 để tạo đường thẳng xiên đầy đủ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0, y0 } = params;
      let na = a, nb = b;
      const g = u.gcd(Math.abs(na), Math.abs(nb));
      na /= g; nb /= g;
      if (na < 0) { na = -na; nb = -nb; }
      const c = -(na * x0 + nb * y0);
      const fmtLine = (ca, cb, cc) => [u.formatTerm(ca, 'x', true), u.formatTerm(cb, 'y', false), u.formatTerm(cc, '', false)].filter(Boolean).join('') + ' = 0';
      const correct = '$' + fmtLine(na, nb, c) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + fmtLine(na, nb, -c + (c === 0 ? 2 : 0)) + '$',
          '$' + fmtLine(na, -nb, -(na * x0 - nb * y0)) + '$',
          '$' + fmtLine(nb, -na, -(nb * x0 - na * y0)) + '$',
        ],
        rng,
        (k) => '$' + fmtLine(na, nb, c + k + 3) + '$'
      );
      return {
        stem: 'Trong mặt phẳng $Oxy$, đường thẳng $\\Delta$ đi qua điểm $M(' + x0 + ';\\, ' + y0 + ')$ và có vectơ pháp tuyến $\\vec{n} = (' + a + ';\\, ' + b + ')$ có phương trình tổng quát là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phương trình tổng quát có dạng $' + a + '(x - (' + x0 + ')) + (' + b + ')(y - (' + y0 + ')) = 0$.',
          'Rút gọn thu được $' + correct.slice(1, -1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 2, x0: 1, y0: 2 }, expectedValid: false },
      { label: 'Biên qua gốc O(0;0)', params: { a: 2, b: -3, x0: 0, y0: 0 }, expectedValid: true },
    ],
  },

  t10_b20_line_dist_angle_mc: {
    id: 't10_b20_line_dist_angle_mc',
    name: 'Tính khoảng cách từ điểm đến đường thẳng trong mặt phẳng Oxy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Vị trí tương đối, góc và khoảng cách',
    description: 'Dùng bộ Pytago (3,4,5), (5,12,13), (8,15,17) để mẫu căn luôn nguyên khi tính d(M, Δ).',
    conditionSummary: 'Độ dài pháp tuyến luôn nguyên dương (5, 13, 17)',
    paramSpecs: [
      { name: 'tripleIdx', label: 'Bộ pháp tuyến (0..2)', min: 0, max: 2 },
      { name: 'x0', label: 'x_M', min: -4, max: 4 },
      { name: 'y0', label: 'y_M', min: -4, max: 4 },
      { name: 'c', label: 'Hằng số c', min: -8, max: 8 },
    ],
    validateCode: `
      if (params.tripleIdx < 0 || params.tripleIdx > 2) return { valid: false, reason: 'Chỉ số bộ Pytago phải từ 0 đến 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const triples = [
        [3, 4, 5],
        [5, -12, 13],
        [8, 15, 17],
      ];
      const [a, b, r] = triples[params.tripleIdx];
      const { x0, y0, c } = params;
      const num = Math.abs(a * x0 + b * y0 + c);
      const frac = u.simplifyFrac(num, r);
      const lineStr = [u.formatTerm(a, 'x', true), u.formatTerm(b, 'y', false), u.formatTerm(c, '', false)].filter(Boolean).join('') + ' = 0';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + frac.latex + '$',
        [
          '$' + u.simplifyFrac(num + 1, r).latex + '$',
          '$' + u.simplifyFrac(num, r + 1).latex + '$',
          '$' + u.simplifyFrac(Math.abs(num - 2) + 1, r).latex + '$',
        ],
        rng,
        (k) => '$' + u.simplifyFrac(num + k + 2, r).latex + '$'
      );
      return {
        stem: 'Trong mặt phẳng $Oxy$, khoảng cách từ điểm $M(' + x0 + ';\\, ' + y0 + ')$ đến đường thẳng $\\Delta: ' + lineStr + '$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + frac.latex + '$',
        solutionSteps: [
          'Áp dụng công thức: $d(M, \\Delta) = \\frac{|' + a + '\\cdot(' + x0 + ') + (' + b + ')\\cdot(' + y0 + ') + (' + c + ')|}{\\sqrt{' + a + '^2 + (' + b + ')^2}} = \\frac{' + num + '}{' + r + '} = ' + frac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chỉ số sai', params: { tripleIdx: 4, x0: 1, y0: 1, c: 0 }, expectedValid: false },
      { label: 'Biên điểm nằm trên đường thẳng (d = 0)', params: { tripleIdx: 0, x0: 1, y0: 1, c: -7 }, expectedValid: true },
    ],
  },

  t10_b21_circle_eq_mc: {
    id: 't10_b21_circle_eq_mc',
    name: 'Xác định tâm và bán kính đường tròn từ phương trình khai triển',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tròn trong mặt phẳng toạ độ',
    description: 'Cho x^2 + y^2 - 2ax - 2by + c = 0 với R > 0 nguyên. Tìm tâm I(a; b) và bán kính R.',
    conditionSummary: 'R > 0 đảm bảo a^2 + b^2 - c > 0',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm a', min: -5, max: 5 },
      { name: 'b', label: 'Tung độ tâm b', min: -5, max: 5 },
      { name: 'R', label: 'Bán kính R', min: 1, max: 8 },
    ],
    validateCode: `
      if (params.R <= 0) return { valid: false, reason: 'Bán kính R phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, R } = params;
      const c = a * a + b * b - R * R;
      const eq = ['x^2 + y^2', u.formatTerm(-2 * a, 'x', false), u.formatTerm(-2 * b, 'y', false), u.formatTerm(c, '', false)].filter(Boolean).join('') + ' = 0';
      const correct = '$I(' + a + ';\\, ' + b + '),\\; R = ' + R + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$I(' + (-a) + ';\\, ' + (-b) + '),\\; R = ' + R + '$',
          '$I(' + a + ';\\, ' + b + '),\\; R = ' + (R * R) + '$',
          '$I(' + (2 * a) + ';\\, ' + (2 * b) + '),\\; R = ' + (R + 1) + '$',
        ],
        rng,
        (k) => '$I(' + a + ';\\, ' + b + '),\\; R = ' + (R + k + 2) + '$'
      );
      return {
        stem: 'Trong mặt phẳng $Oxy$, đường tròn $(C): ' + eq + '$ có tâm $I$ và bán kính $R$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $a = ' + a + ',\\, b = ' + b + ',\\, c = ' + c + '$.',
          'Bán kính $R = \\sqrt{a^2 + b^2 - c} = \\sqrt{' + (R * R) + '} = ' + R + '$. Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R = 0', params: { a: 1, b: 2, R: 0 }, expectedValid: false },
      { label: 'Biên tâm O(0;0)', params: { a: 0, b: 0, R: 5 }, expectedValid: true },
    ],
  },

  t10_b22_conic_ellipse_mc: {
    id: 't10_b22_conic_ellipse_mc',
    name: 'Tìm tiêu cự của đường Elip chuẩn',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Ba đường conic',
    description: 'Cho elip x^2/a^2 + y^2/b^2 = 1 sử dụng bộ Pytago (c, b, a) sao cho a^2 - b^2 = c^2. Tính tiêu cự 2c.',
    conditionSummary: 'b > 0, c > 0 và a = sqrt(b^2 + c^2) nguyên',
    paramSpecs: [
      { name: 'tripleIdx', label: 'Bộ Pytago (0..2)', min: 0, max: 2 },
      { name: 'k', label: 'Hệ số k', min: 1, max: 3 },
    ],
    validateCode: `
      if (params.k <= 0) return { valid: false, reason: 'k phải dương' };
      if (params.tripleIdx < 0 || params.tripleIdx > 2) return { valid: false, reason: 'tripleIdx từ 0 đến 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
      ];
      const [c0, b0, a0] = triples[params.tripleIdx];
      const a = a0 * params.k, b = b0 * params.k, c = c0 * params.k;
      const ans = 2 * c;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + c + '$', '$' + (2 * a) + '$', '$' + (2 * b) + '$'],
        rng,
        (step) => '$' + (ans + step * 2) + '$'
      );
      return {
        stem: 'Trong mặt phẳng $Oxy$, elip $(E): \\frac{x^2}{' + (a * a) + '} + \\frac{y^2}{' + (b * b) + '} = 1$ có tiêu cự bằng:',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Ta có $a^2 = ' + (a * a) + '$ và $b^2 = ' + (b * b) + '$.',
          'Nửa tiêu cự $c = \\sqrt{a^2 - b^2} = \\sqrt{' + (c * c) + '} = ' + c + '$. Vậy tiêu cự của elip là $2c = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { tripleIdx: 0, k: 0 }, expectedValid: false },
      { label: 'Biên bộ (5,12,13)', params: { tripleIdx: 1, k: 1 }, expectedValid: true },
    ],
  },

  t10_b23_counting_rules_sa: {
    id: 't10_b23_counting_rules_sa',
    name: 'Đếm số tự nhiên có 3 chữ số đôi một khác nhau bằng quy tắc nhân',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Quy tắc đếm',
    description: 'Từ tập {1, 2, ..., k} (k >= 4), lập được bao nhiêu số tự nhiên có 3 chữ số đôi một khác nhau?',
    conditionSummary: 'Số chữ số cho trước k >= 4',
    paramSpecs: [
      { name: 'k', label: 'Số phần tử tập A', min: 4, max: 9 },
    ],
    validateCode: `
      if (params.k < 4 || params.k > 9) return { valid: false, reason: 'Số chữ số k phải thuộc [4; 9]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const ans = k * (k - 1) * (k - 2);
      const setList = Array.from({ length: k }, (_, i) => i + 1).join(';\\, ');
      return {
        stem: 'Từ tập hợp $A = \\{' + setList + '\\}$ có thể lập được bao nhiêu số tự nhiên có $3$ chữ số đôi một khác nhau?',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Gọi số có 3 chữ số là $\\overline{abc}$ với $a, b, c \\in A$ đôi một khác nhau.',
          'Chọn $a$ có $' + k + '$ cách, chọn $b$ có $' + (k - 1) + '$ cách, chọn $c$ có $' + (k - 2) + '$ cách.',
          'Theo quy tắc nhân, lập được $' + k + ' \\cdot ' + (k - 1) + ' \\cdot ' + (k - 2) + ' = ' + ans + '$ số.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 2 (không đủ 3 chữ số)', params: { k: 2 }, expectedValid: false },
      { label: 'Biên k = 4', params: { k: 4 }, expectedValid: true },
    ],
  },

  t10_b24_comb_perm_sa: {
    id: 't10_b24_comb_perm_sa',
    name: 'Đếm số cách chọn tổ hợp có điều kiện nam - nữ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hoán vị, chỉnh hợp và tổ hợp',
    description: 'Từ tổ gồm n nam và m nữ, chọn nhóm gồm 2 nam và 2 nữ.',
    conditionSummary: 'n >= 3 và m >= 3 để tránh chọn tất cả tầm thường',
    paramSpecs: [
      { name: 'n', label: 'Số học sinh nam n', min: 3, max: 10 },
      { name: 'm', label: 'Số học sinh nữ m', min: 3, max: 10 },
    ],
    validateCode: `
      if (params.n < 3 || params.m < 3) return { valid: false, reason: 'Số nam n và số nữ m phải >= 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, m } = params;
      const cN = u.comb(n, 2);
      const cM = u.comb(m, 2);
      const ans = cN * cM;
      return {
        stem: 'Một tổ học tập gồm $' + n + '$ học sinh nam và $' + m + '$ học sinh nữ. Giáo viên cần chọn ra một nhóm $4$ học sinh gồm $2$ nam và $2$ nữ. Có bao nhiêu cách chọn?',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Chọn $2$ nam trong $' + n + '$ nam có $C_{' + n + '}^2 = ' + cN + '$ cách.',
          'Chọn $2$ nữ trong $' + m + '$ nữ có $C_{' + m + '}^2 = ' + cM + '$ cách.',
          'Theo quy tắc nhân, có $' + cN + ' \\cdot ' + cM + ' = ' + ans + '$ cách chọn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 1 (không chọn được 2 nam)', params: { n: 1, m: 4 }, expectedValid: false },
      { label: 'Biên n = 3, m = 3', params: { n: 3, m: 3 }, expectedValid: true },
    ],
  },

  t10_b25_newton_binomial_mc: {
    id: 't10_b25_newton_binomial_mc',
    name: 'Tìm hệ số của x^k trong khai triển nhị thức Newton (ax + b)^n',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Nhị thức Newton',
    description: 'Cho (ax + b)^n với n in {4, 5}, tìm hệ số của số hạng chứa x^k (1 <= k <= n - 1).',
    conditionSummary: 'a != 0, b != 0, n in {4, 5}, 1 <= k <= n - 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 3, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -3, max: 3, allowZero: false },
      { name: 'n', label: 'Số mũ n (4 hoặc 5)', min: 4, max: 5 },
      { name: 'k', label: 'Bậc x^k', min: 1, max: 4 },
    ],
    validateCode: `
      const { a, b, n, k } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      if (n !== 4 && n !== 5) return { valid: false, reason: 'Theo GDPT 2018 Toán 10, n thuộc {4, 5}' };
      if (k < 1 || k >= n) return { valid: false, reason: 'Cần 1 <= k <= n - 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, n, k } = params;
      const cnk = u.comb(n, k);
      const ans = cnk * Math.pow(a, k) * Math.pow(b, n - k);
      const inner = u.formatLinear(a, b);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (-ans) + '$', '$' + (cnk * Math.pow(a, n - k) * Math.pow(b, k)) + '$', '$' + (ans + cnk) + '$'],
        rng,
        (step) => '$' + (ans + step * 5) + '$'
      );
      return {
        stem: 'Hệ số của $x^{' + (k === 1 ? '1' : k) + '}$ trong khai triển nhị thức Newton $(' + inner + ')^{' + n + '}$ là:',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Số hạng tổng quát chứa $x^{' + k + '}$ ứng với $C_{' + n + '}^{' + (n - k) + '}(' + (a === 1 ? '' : a) + 'x)^{' + k + '}(' + b + ')^{' + (n - k) + '}$.',
          'Hệ số của $x^{' + k + '}$ là $' + cnk + ' \\cdot (' + a + ')^{' + k + '} \\cdot (' + b + ')^{' + (n - k) + '} = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = n', params: { a: 2, b: 1, n: 4, k: 4 }, expectedValid: false },
      { label: 'Biên b âm', params: { a: 2, b: -1, n: 5, k: 3 }, expectedValid: true },
    ],
  },

  t10_b26_event_sample_space_mc: {
    id: 't10_b26_event_sample_space_mc',
    name: 'Xác định số phần tử của biến cố khi gieo hai con xúc xắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố và định nghĩa cổ điển của xác suất',
    description: 'Gieo một con xúc xắc cân đối hai lần. Đếm số phần tử của biến cố A: "Tổng số chấm trong hai lần gieo bằng S".',
    conditionSummary: '3 <= S <= 11 để biến cố khác rỗng và không tầm thường',
    paramSpecs: [
      { name: 'S', label: 'Tổng số chấm S', min: 3, max: 11 },
    ],
    validateCode: `
      if (params.S < 3 || params.S > 11) return { valid: false, reason: 'Tổng số chấm S phải nằm trong [3; 11]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { S } = params;
      const pairs = [];
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 6; j++) {
          if (i + j === S) pairs.push('(' + i + ';' + j + ')');
        }
      }
      const cnt = pairs.length;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + cnt + '$',
        ['$' + (cnt + 1) + '$', '$' + Math.max(1, cnt - 1) + '$', '$' + (cnt + 2) + '$'],
        rng,
        (k) => '$' + (cnt + k + 3) + '$'
      );
      return {
        stem: 'Gieo một con xúc xắc cân đối đồng chất hai lần liên tiếp. Số phần tử của biến cố $A$: "Tổng số chấm xuất hiện trong hai lần gieo bằng $' + S + '$" là:',
        options,
        correctIndex,
        answerSummary: '$' + cnt + '$',
        solutionSteps: [
          'Liệt kê các kết quả thuận lợi $(i; j)$ với $i, j \\in \\{1;2;3;4;5;6\\}$ và $i + j = ' + S + '$: ' + pairs.join(', ') + '.',
          'Vậy $n(A) = ' + cnt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên S = 1 (không thể xảy ra)', params: { S: 1 }, expectedValid: false },
      { label: 'Biên S = 7 (lớn nhất)', params: { S: 7 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // TOÁN 11 BỔ SUNG (BÀI 2 -> BÀI 33)
  // =====================================================================
  t11_b2_trig_formulas_mc: {
    id: 't11_b2_trig_formulas_mc',
    name: 'Tính cos(2α) từ giá trị cos(α) bằng công thức nhân đôi',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức lượng giác',
    description: 'Cho cos α = p/q (phân số tối giản khác 0 và ±1). Tính cos 2α = 2cos^2 α - 1.',
    conditionSummary: '0 < |p| < q để |cos α| < 1 hợp lệ',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: -5, max: 5, allowZero: false },
      { name: 'q', label: 'Mẫu số q', min: 3, max: 7 },
    ],
    validateCode: `
      const { p, q } = params;
      if (p === 0 || q <= 1) return { valid: false, reason: 'p != 0 và q >= 2' };
      if (Math.abs(p) >= q) return { valid: false, reason: 'Cần |cos α| < 1 nên |p| < q' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      const cosA = u.simplifyFrac(p, q);
      const cos2A = u.simplifyFrac(2 * p * p - q * q, q * q);
      const fake1 = u.simplifyFrac(2 * p, q);
      const fake2 = u.simplifyFrac(q * q - 2 * p * p, q * q);
      const fake3 = u.simplifyFrac(p * p - q * q, q * q);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + cos2A.latex + '$',
        ['$' + fake1.latex + '$', '$' + fake2.latex + '$', '$' + fake3.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(2 * p * p - q * q + k, q * q).latex + '$'
      );
      return {
        stem: 'Biết $\\cos \\alpha = ' + cosA.latex + '$. Giá trị của $\\cos 2\\alpha$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + cos2A.latex + '$',
        solutionSteps: [
          'Áp dụng công thức nhân đôi: $\\cos 2\\alpha = 2\\cos^2 \\alpha - 1$.',
          'Thay số: $\\cos 2\\alpha = 2\\left(' + cosA.latex + '\\right)^2 - 1 = ' + cos2A.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên |cos α| > 1', params: { p: 5, q: 3 }, expectedValid: false },
      { label: 'Biên cos α âm', params: { p: -2, q: 3 }, expectedValid: true },
    ],
  },

  t11_b3_trig_func_period_mc: {
    id: 't11_b3_trig_func_period_mc',
    name: 'Tìm giá trị lớn nhất và nhỏ nhất của hàm số lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số lượng giác',
    description: 'Cho y = a*sin(bx + c) + d với a != 0, b != 0. Tìm tổng M + m hoặc tập giá trị [d - |a|; d + |a|].',
    conditionSummary: 'a != 0 và b != 0',
    paramSpecs: [
      { name: 'a', label: 'Biên độ a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Tần số góc b', min: 1, max: 4 },
      { name: 'd', label: 'Hằng số d', min: -5, max: 5 },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'a và b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, d } = params;
      const minV = d - Math.abs(a);
      const maxV = d + Math.abs(a);
      const correct = '$[' + minV + ';\\, ' + maxV + ']$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$[' + (minV - 1) + ';\\, ' + (maxV + 1) + ']$',
          '$[-1;\\, 1]$',
          '$[' + (-Math.abs(a)) + ';\\, ' + Math.abs(a) + ']$',
        ],
        rng,
        (k) => '$[' + (minV + k) + ';\\, ' + (maxV + k) + ']$'
      );
      const fnTerm = (a === 1 ? '' : a === -1 ? '-' : a) + '\\sin(' + (b === 1 ? 'x' : b + 'x') + ')';
      const fullExpr = fnTerm + u.formatTrailingConst(d);
      return {
        stem: 'Tập giá trị của hàm số $y = ' + fullExpr + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Với mọi $x \\in \\mathbb{R}$, ta có $-1 \\le \\sin(' + (b === 1 ? 'x' : b + 'x') + ') \\le 1$.',
          'Nhân với $' + a + '$ rồi cộng thêm $' + d + '$ suy ra $' + minV + ' \\le y \\le ' + maxV + '$. Tập giá trị là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (hàm hằng)', params: { a: 0, b: 2, d: 3 }, expectedValid: false },
      { label: 'Biên a âm', params: { a: -3, b: 2, d: 4 }, expectedValid: true },
    ],
  },

  t11_b5_sequence_term_mc: {
    id: 't11_b5_sequence_term_mc',
    name: 'Tìm số hạng thứ k của dãy số cho bởi công thức tổng quát',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Dãy số',
    description: 'Cho dãy số u_n = (an + b)/(cn + d) với c >= 1, d >= 0. Tìm u_k.',
    conditionSummary: 'c >= 1, d >= 0, k >= 2 để mẫu luôn dương',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 5, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -4, max: 6 },
      { name: 'c', label: 'Hệ số c', min: 1, max: 3 },
      { name: 'd', label: 'Hằng số d', min: 0, max: 4 },
      { name: 'k', label: 'Chỉ số k', min: 3, max: 10 },
    ],
    validateCode: `
      const { a, c, d, k } = params;
      if (a === 0 || c <= 0 || d < 0 || k < 2) return { valid: false, reason: 'Tham số không hợp lệ' };
      if (c * k + d === 0) return { valid: false, reason: 'Mẫu số bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, k } = params;
      const frac = u.simplifyFrac(a * k + b, c * k + d);
      const numStr = u.formatLinear(a, b).replace(/x/g, 'n');
      const denStr = u.formatLinear(c, d).replace(/x/g, 'n');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + frac.latex + '$',
        [
          '$' + u.simplifyFrac(a * k + b + 1, c * k + d).latex + '$',
          '$' + u.simplifyFrac(a * (k - 1) + b, c * (k - 1) + d).latex + '$',
          '$' + u.simplifyFrac(a * k - b, c * k + d + 1).latex + '$',
        ],
        rng,
        (step) => '$' + u.simplifyFrac(a * k + b + step + 2, c * k + d).latex + '$'
      );
      return {
        stem: 'Cho dãy số $(u_n)$ có số hạng tổng quát $u_n = \\frac{' + numStr + '}{' + denStr + '}$. Số hạng thứ $' + k + '$ ($u_{' + k + '}$) bằng:',
        options,
        correctIndex,
        answerSummary: '$u_{' + k + '} = ' + frac.latex + '$',
        solutionSteps: [
          'Thay $n = ' + k + '$ vào công thức tổng quát: $u_{' + k + '} = \\frac{' + (a * k + b) + '}{' + (c * k + d) + '} = ' + frac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0, d = 0 (chia cho 0)', params: { a: 2, b: 1, c: 0, d: 0, k: 3 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { a: 2, b: -1, c: 1, d: 2, k: 5 }, expectedValid: true },
    ],
  },

  t11_b8_grouped_sample_mc: {
    id: 't11_b8_grouped_sample_mc',
    name: 'Xác định giá trị đại diện và cỡ mẫu của mẫu số liệu ghép nhóm',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Mẫu số liệu ghép nhóm',
    description: 'Cho bảng tần số 4 nhóm độ dài h chẵn. Tìm giá trị đại diện của nhóm chỉ định.',
    conditionSummary: 'Độ dài nhóm h > 0 và tần số các nhóm dương',
    paramSpecs: [
      { name: 'a0', label: 'Đầu mút đầu a0', min: 10, max: 30, step: 5 },
      { name: 'h', label: 'Độ dài nhóm h', min: 4, max: 12, step: 2 },
      { name: 'idx', label: 'Nhóm cần hỏi (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.h <= 0 || params.h % 2 !== 0) return { valid: false, reason: 'h dương và chẵn để giá trị đại diện nguyên' };
      if (params.idx < 0 || params.idx > 3) return { valid: false, reason: 'idx thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, h, idx } = params;
      const groups = [0, 1, 2, 3].map((i) => [a0 + i * h, a0 + (i + 1) * h]);
      const [lo, hi] = groups[idx];
      const mid = (lo + hi) / 2;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + mid + '$',
        ['$' + lo + '$', '$' + hi + '$', '$' + (mid + h) + '$'],
        rng,
        (k) => '$' + (mid + k * 2 + 1) + '$'
      );
      return {
        stem: 'Một mẫu số liệu ghép nhóm được chia thành các nhóm có độ dài bằng nhau là ' + groups.map(([l, r]) => '$[' + l + ';\\, ' + r + ')$').join(', ') + '. Giá trị đại diện của nhóm $[' + lo + ';\\, ' + hi + ')$ là:',
        options,
        correctIndex,
        answerSummary: '$' + mid + '$',
        solutionSteps: [
          'Giá trị đại diện của nhóm $[a_i;\\, a_{i+1})$ được tính bằng trung bình cộng hai đầu mút: $c = \\frac{' + lo + ' + ' + hi + '}{2} = ' + mid + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 0', params: { a0: 10, h: 0, idx: 1 }, expectedValid: false },
      { label: 'Biên nhóm cuối', params: { a0: 20, h: 10, idx: 3 }, expectedValid: true },
    ],
  },

  t11_b9_grouped_central_sa: {
    id: 't11_b9_grouped_central_sa',
    name: 'Tính trung vị của mẫu số liệu ghép nhóm',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Các số đặc trưng đo xu thế trung tâm',
    description: 'Cho 4 nhóm [0;10), [10;20), [20;30), [30;40) sao cho N/2 rơi vào nhóm [10;20). Tính trung vị M_e.',
    conditionSummary: 'n1 < N/2 < n1 + n2 để nhóm chứa trung vị luôn là [10; 20)',
    paramSpecs: [
      { name: 'n1', label: 'Tần số [0;10)', min: 3, max: 8 },
      { name: 'n2', label: 'Tần số [10;20)', min: 8, max: 16 },
      { name: 'n3', label: 'Tần số [20;30)', min: 4, max: 9 },
      { name: 'n4', label: 'Tần số [30;40)', min: 2, max: 6 },
    ],
    validateCode: `
      const { n1, n2, n3, n4 } = params;
      if (n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0) return { valid: false, reason: 'Các tần số phải dương' };
      const N = n1 + n2 + n3 + n4;
      if (!(n1 < N / 2 && N / 2 < n1 + n2)) return { valid: false, reason: 'Cần n1 < N/2 < n1 + n2 để trung vị rơi vào nhóm [10;20)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, n3, n4 } = params;
      const N = n1 + n2 + n3 + n4;
      const me = 10 + ((N / 2 - n1) / n2) * 10;
      const rounded = Number(me.toFixed(2));
      const ansText = u.formatNumberVN(rounded, 2);
      return {
        stem: 'Cho mẫu số liệu ghép nhóm gồm 4 nhóm $[0;10),\\, [10;20),\\, [20;30),\\, [30;40)$ với tần số lần lượt là $' + n1 + ',\\, ' + n2 + ',\\, ' + n3 + ',\\, ' + n4 + '$. Trung vị $M_e$ của mẫu số liệu trên bằng bao nhiêu? (Làm tròn đến hàng phần trăm).',
        shortAnswer: ansText,
        numericValue: rounded,
        answerSummary: '$M_e \\approx ' + ansText + '$',
        solutionSteps: [
          'Cỡ mẫu $N = ' + N + ' \\Rightarrow \\frac{N}{2} = ' + u.formatNumberVN(N / 2, 1) + '$, rơi vào nhóm $[10; 20)$.',
          'Áp dụng công thức: $M_e = 10 + \\frac{\\frac{' + N + '}{2} - ' + n1 + '}{' + n2 + '} \\cdot 10 \\approx ' + ansText + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên trung vị không rơi vào nhóm 2', params: { n1: 12, n2: 3, n3: 3, n4: 2 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { n1: 5, n2: 12, n3: 6, n4: 3 }, expectedValid: true },
    ],
  },

  t11_b10_line_plane_space_mc: {
    id: 't11_b10_line_plane_space_mc',
    name: 'Đếm số mặt phẳng phân biệt xác định bởi n điểm trong không gian',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho n điểm trong không gian không có 4 điểm nào đồng phẳng. Tính số mặt phẳng đi qua 3 trong n điểm đó.',
    conditionSummary: 'n >= 4 để tạo thành ít nhất 4 mặt phẳng không gian',
    paramSpecs: [
      { name: 'n', label: 'Số điểm n', min: 4, max: 10 },
    ],
    validateCode: `
      if (params.n < 4) return { valid: false, reason: 'Cần n >= 4 điểm không đồng phẳng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n } = params;
      const ans = u.comb(n, 3);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + u.comb(n, 2) + '$', '$' + (n * (n - 1) * (n - 2)) + '$', '$' + (ans + n) + '$'],
        rng,
        (k) => '$' + (ans + k * 2) + '$'
      );
      return {
        stem: 'Trong không gian cho $' + n + '$ điểm phân biệt, trong đó không có $4$ điểm nào đồng phẳng. Số mặt phẳng phân biệt đi qua $3$ trong $' + n + '$ điểm đã cho bằng:',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Mỗi bộ $3$ điểm không thẳng hàng xác định duy nhất một mặt phẳng, và không có $4$ điểm nào đồng phẳng nên các mặt phẳng đôi một phân biệt.',
          'Số mặt phẳng cần tìm là $C_{' + n + '}^3 = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 3 (chỉ có 1 mặt phẳng)', params: { n: 3 }, expectedValid: false },
      { label: 'Biên tứ diện n = 4', params: { n: 4 }, expectedValid: true },
    ],
  },

  t11_b11_two_parallel_lines_mc: {
    id: 't11_b11_two_parallel_lines_mc',
    name: 'Tính độ dài đoạn giao tuyến song song trong hình chóp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng song song',
    description: 'Cho hình chóp S.ABCD đáy hình bình hành AB = L*k. Trên SA, SB lấy M, N sao cho SM/SA = SN/SB = 1/k. Tính MN.',
    conditionSummary: 'L > 0 và k >= 2',
    paramSpecs: [
      { name: 'L', label: 'Độ dài kết quả L', min: 2, max: 10 },
      { name: 'k', label: 'Tỉ số chia k', min: 2, max: 5 },
    ],
    validateCode: `
      if (params.L <= 0 || params.k < 2) return { valid: false, reason: 'L > 0 và k >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L, k } = params;
      const ab = L * k;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + L + '$',
        ['$' + (L * 2) + '$', '$' + ab + '$', '$' + (L + 1) + '$'],
        rng,
        (step) => '$' + (L + step + 2) + '$'
      );
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành với $AB = ' + ab + '$. Trên các cạnh $SA, SB$ lần lượt lấy các điểm $M, N$ sao cho $\\frac{SM}{SA} = \\frac{SN}{SB} = \\frac{1}{' + k + '}$. Độ dài đoạn thẳng $MN$ bằng:',
        options,
        correctIndex,
        answerSummary: '$MN = ' + L + '$',
        solutionSteps: [
          'Trong tam giác $SAB$, do $\\frac{SM}{SA} = \\frac{SN}{SB} = \\frac{1}{' + k + '}$ nên $MN \\parallel AB$ (định lí Thalès đảo).',
          'Suy ra $\\frac{MN}{AB} = \\frac{1}{' + k + '} \\Rightarrow MN = \\frac{' + ab + '}{' + k + '} = ' + L + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1 (M trùng A)', params: { L: 3, k: 1 }, expectedValid: false },
      { label: 'Biên trung điểm k = 2', params: { L: 5, k: 2 }, expectedValid: true },
    ],
  },

  t11_b12_line_parallel_plane_mc: {
    id: 't11_b12_line_parallel_plane_mc',
    name: 'Tính diện tích thiết diện song song với mặt phẳng đáy hình chóp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng song song',
    description: 'Hình chóp S.ABCD đáy hình chữ nhật cạnh q*a, q*b. Mặt phẳng song song đáy cắt SA tại M với SM/SA = p/q. Tính S_MNPQ.',
    conditionSummary: '1 <= p < q và a, b > 0',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 3 },
      { name: 'q', label: 'Mẫu số q', min: 2, max: 5 },
      { name: 'a', label: 'Hệ số cạnh a', min: 1, max: 4 },
      { name: 'b', label: 'Hệ số cạnh b', min: 1, max: 4 },
    ],
    validateCode: `
      const { p, q, a, b } = params;
      if (p <= 0 || p >= q) return { valid: false, reason: 'Cần 0 < p < q để M nằm trong đoạn SA' };
      if (a <= 0 || b <= 0) return { valid: false, reason: 'Kích thước đáy phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, a, b } = params;
      const AB = q * a;
      const AD = q * b;
      const sBase = AB * AD;
      const sCut = p * p * a * b;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + sCut + '$',
        ['$' + (p * q * a * b) + '$', '$' + sBase + '$', '$' + (sCut + 2) + '$'],
        rng,
        (k) => '$' + (sCut + k * 3 + 1) + '$'
      );
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = ' + AB + ',\\, AD = ' + AD + '$. Điểm $M$ trên cạnh $SA$ thỏa mãn $\\frac{SM}{SA} = \\frac{' + p + '}{' + q + '}$. Mặt phẳng $(\\alpha)$ đi qua $M$ và song song với $(ABCD)$ cắt $SB, SC, SD$ lần lượt tại $N, P, Q$. Diện tích tứ giác $MNPQ$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + sCut + '$',
        solutionSteps: [
          'Do $(\\alpha) \\parallel (ABCD)$ nên thiết diện $MNPQ$ là hình chữ nhật đồng dạng với $ABCD$ theo tỉ số $k = \\frac{SM}{SA} = \\frac{' + p + '}{' + q + '}$.',
          'Diện tích đáy $S_{ABCD} = ' + AB + ' \\cdot ' + AD + ' = ' + sBase + '$.',
          'Vậy $S_{MNPQ} = k^2 \\cdot S_{ABCD} = \\left(\\frac{' + p + '}{' + q + '}\\right)^2 \\cdot ' + sBase + ' = ' + sCut + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q (M trùng A)', params: { p: 3, q: 3, a: 2, b: 2 }, expectedValid: false },
      { label: 'Biên tỉ số 1/2', params: { p: 1, q: 2, a: 3, b: 4 }, expectedValid: true },
    ],
  },

  t11_b13_two_parallel_planes_sa: {
    id: 't11_b13_two_parallel_planes_sa',
    name: 'Áp dụng định lý Thalès cho ba mặt phẳng song song',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng song song',
    description: 'Ba mặt phẳng song song (P), (Q), (R) chắn trên d các đoạn AB = x1, BC = k*x1 và trên d\' các đoạn A\'B\' = y1, B\'C\'. Tính A\'C\'.',
    conditionSummary: 'x1, k, y1 > 0',
    paramSpecs: [
      { name: 'x1', label: 'Đoạn AB = x1', min: 2, max: 6 },
      { name: 'k', label: 'Tỉ số BC/AB = k', min: 2, max: 5 },
      { name: 'y1', label: 'Đoạn A\'B\' = y1', min: 3, max: 9 },
    ],
    validateCode: `
      if (params.x1 <= 0 || params.k <= 0 || params.y1 <= 0) return { valid: false, reason: 'Các độ dài và tỉ số phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, k, y1 } = params;
      const bc = k * x1;
      const bcpc = k * y1;
      const acPrime = y1 + bcpc;
      return {
        stem: 'Ba mặt phẳng đôi một song song $(P),\\, (Q),\\, (R)$ lần lượt cắt hai đường thẳng $d$ và $d\'$ tại các điểm $A, B, C$ và $A\', B\', C\'$ theo thứ tự đó. Biết $AB = ' + x1 + ',\\, BC = ' + bc + '$ và $A\'B\' = ' + y1 + '$. Tính độ dài đoạn thẳng $A\'C\'$.',
        shortAnswer: '' + acPrime,
        numericValue: acPrime,
        answerSummary: "$A'C' = " + acPrime + '$',
        solutionSteps: [
          "Theo định lí Thalès trong không gian: $\\frac{B'C'}{A'B'} = \\frac{BC}{AB} = \\frac{" + bc + '}{' + x1 + '} = ' + k + '$.',
          "Suy ra $B'C' = " + k + " \\cdot " + y1 + ' = ' + bcpc + "$, do đó $A'C' = A'B' + B'C' = " + y1 + ' + ' + bcpc + ' = ' + acPrime + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = 0 (A trùng B)', params: { x1: 0, k: 2, y1: 4 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { x1: 3, k: 2, y1: 5 }, expectedValid: true },
    ],
  },

  t11_b14_parallel_projection_mc: {
    id: 't11_b14_parallel_projection_mc',
    name: 'Bảo toàn tỉ số độ dài hai đoạn song song qua phép chiếu song song',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép chiếu song song',
    description: 'Cho AB // CD có AB = m, CD = n. Ảnh qua phép chiếu song song là A\'B\' = k*m, C\'D\'. Tính C\'D\'.',
    conditionSummary: 'm, n, k >= 2 và hai đoạn không song song phương chiếu',
    paramSpecs: [
      { name: 'm', label: 'Độ dài AB = m', min: 2, max: 6 },
      { name: 'n', label: 'Độ dài CD = n', min: 3, max: 9 },
      { name: 'k', label: 'Hệ số co giãn k', min: 2, max: 4 },
    ],
    validateCode: `
      if (params.m <= 0 || params.n <= 0 || params.k <= 0) return { valid: false, reason: 'Độ dài phải dương' };
      if (params.m === params.n) return { valid: false, reason: 'Chọn m ≠ n để phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, n, k } = params;
      const abp = k * m;
      const cdp = k * n;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + cdp + '$',
        ['$' + n + '$', '$' + abp + '$', '$' + (cdp + k) + '$'],
        rng,
        (step) => '$' + (cdp + step * 2 + 1) + '$'
      );
      return {
        stem: 'Cho hai đoạn thẳng song song $AB = ' + m + '$ và $CD = ' + n + '$ (không song song với phương chiếu). Qua phép chiếu song song lên mặt phẳng $(P)$, ảnh của $AB$ có độ dài $A\'B\' = ' + abp + '$. Độ dài ảnh $C\'D\'$ bằng:',
        options,
        correctIndex,
        answerSummary: "$C'D' = " + cdp + '$',
        solutionSteps: [
          'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng song song: $\\frac{C\'D\'}{A\'B\'} = \\frac{CD}{AB}$.',
          'Suy ra $C\'D\' = \\frac{' + n + '}{' + m + '} \\cdot ' + abp + ' = ' + cdp + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = n', params: { m: 4, n: 4, k: 2 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { m: 3, n: 5, k: 2 }, expectedValid: true },
    ],
  },

  t11_b15_seq_limit_mc: {
    id: 't11_b15_seq_limit_mc',
    name: 'Tính giới hạn của dãy số phân thức hữu tỉ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính lim (an^2 + bn + c) / (dn^2 + en + f) với a != 0, d > 0.',
    conditionSummary: 'a != 0 và d > 0 để dạng vô định ∞/∞ cùng bậc 2',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4 },
      { name: 'd', label: 'Hệ số d', min: 1, max: 5 },
      { name: 'e', label: 'Hệ số e', min: -4, max: 4 },
    ],
    validateCode: `
      if (params.a === 0 || params.d <= 0) return { valid: false, reason: 'Cần a ≠ 0 và d > 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, d, e } = params;
      const ans = u.simplifyFrac(a, d);
      const numPoly = u.formatQuadratic(a, b, 1).replace(/x/g, 'n');
      const denPoly = u.formatQuadratic(d, e, 2).replace(/x/g, 'n');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + u.simplifyFrac(-a, d).latex + '$', '$0$', '$+\\infty$'],
        rng,
        (k) => '$' + u.simplifyFrac(a + k, d + 1).latex + '$'
      );
      return {
        stem: 'Giá trị của giới hạn $\\lim \\frac{' + numPoly + '}{' + denPoly + '}$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Chia cả tử và mẫu cho $n^2$: $\\lim \\frac{' + a + ' + \\frac{' + b + '}{n} + \\frac{1}{n^2}}{' + d + ' + \\frac{' + e + '}{n} + \\frac{2}{n^2}} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (tử bậc thấp hơn mẫu)', params: { a: 0, b: 2, d: 3, e: 1 }, expectedValid: false },
      { label: 'Biên a âm', params: { a: -4, b: 3, d: 2, e: -1 }, expectedValid: true },
    ],
  },

  t11_b17_continuity_sa: {
    id: 't11_b17_continuity_sa',
    name: 'Tìm tham số để hàm số liên tục tại điểm x0',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hàm số liên tục',
    description: 'Cho f(x) = (x^2 - x0^2)/(x - x0) khi x != x0 và f(x) = m + x0 khi x = x0. Tìm m để f(x) liên tục tại x0.',
    conditionSummary: 'x0 != 0 để tránh 0/0 tại gốc tầm thường',
    paramSpecs: [
      { name: 'x0', label: 'Điểm x0', min: -6, max: 6, allowZero: false },
      { name: 'k', label: 'Hệ số phụ k', min: -3, max: 4 },
    ],
    validateCode: `
      if (params.x0 === 0) return { valid: false, reason: 'Chọn x0 ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, k } = params;
      const ans = 2 * x0 - k;
      const numStr = 'x^2 ' + (x0 * x0 > 0 ? '- ' + (x0 * x0) : '');
      const denStr = u.formatShift('x', -x0);
      return {
        stem: 'Tìm giá trị của tham số $m$ để hàm số $f(x) = \\begin{cases} \\dfrac{' + numStr + '}{' + denStr + '} & \\text{khi } x \\neq ' + x0 + ' \\\\ m' + u.formatTrailingConst(k) + ' & \\text{khi } x = ' + x0 + ' \\end{cases}$ liên tục tại điểm $x_0 = ' + x0 + '$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '$m = ' + ans + '$',
        solutionSteps: [
          'Tính giới hạn: $\\lim_{x \\to ' + x0 + '} f(x) = \\lim_{x \\to ' + x0 + '} (' + u.formatShift('x', x0) + ') = ' + (2 * x0) + '$.',
          'Hàm số liên tục tại $x_0 = ' + x0 + '$ khi $\\lim_{x \\to ' + x0 + '} f(x) = f(' + x0 + ') \\Leftrightarrow ' + (2 * x0) + ' = m' + u.formatTrailingConst(k) + ' \\Leftrightarrow m = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 0', params: { x0: 0, k: 2 }, expectedValid: false },
      { label: 'Biên x0 âm', params: { x0: -3, k: 4 }, expectedValid: true },
    ],
  },

  t11_b18_real_exponent_mc: {
    id: 't11_b18_real_exponent_mc',
    name: 'Rút gọn biểu thức luỹ thừa với số mũ hữu tỉ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Với x > 0, rút gọn biểu thức P = x^(p/q) * căn bậc r của x^s.',
    conditionSummary: 'q >= 2, r >= 2, p >= 1, s >= 1',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 4 },
      { name: 'q', label: 'Mẫu số q', min: 2, max: 5 },
      { name: 'r', label: 'Bậc căn r', min: 2, max: 5 },
      { name: 's', label: 'Số mũ trong căn s', min: 1, max: 3 },
    ],
    validateCode: `
      const { p, q, r, s } = params;
      if (q < 2 || r < 2 || p < 1 || s < 1) return { valid: false, reason: 'Bậc căn r, mẫu số q phải >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, r, s } = params;
      const exp = u.simplifyFrac(p * r + s * q, q * r);
      const expTerm = exp.isInteger ? (exp.num === 1 ? 'x' : 'x^{' + exp.num + '}') : 'x^{' + exp.latex + '}';
      const f1 = u.simplifyFrac(p + s, q + r);
      const f2 = u.simplifyFrac(p * s, q * r);
      const f3 = u.simplifyFrac(Math.abs(p * r - s * q) + 1, q * r);
      const fmtPow = (f) => f.isInteger ? (f.num === 1 ? 'x' : 'x^{' + f.num + '}') : 'x^{' + f.latex + '}';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + expTerm + '$',
        ['$' + fmtPow(f1) + '$', '$' + fmtPow(f2) + '$', '$' + fmtPow(f3) + '$'],
        rng,
        (k) => '$' + fmtPow(u.simplifyFrac(p * r + s * q + k, q * r + 1)) + '$'
      );
      const leftPow = u.simplifyFrac(p, q);
      const rootStr = r === 2 ? '\\sqrt{x' + (s === 1 ? '' : '^{' + s + '}') + '}' : '\\sqrt[' + r + ']{x' + (s === 1 ? '' : '^{' + s + '}') + '}';
      return {
        stem: 'Với $x > 0$, rút gọn biểu thức $P = x^{' + leftPow.latex + '} \\cdot ' + rootStr + '$ ta được:',
        options,
        correctIndex,
        answerSummary: '$P = ' + expTerm + '$',
        solutionSteps: [
          'Đưa căn về lũy thừa số mũ hữu tỉ: $' + rootStr + ' = x^{' + u.simplifyFrac(s, r).latex + '}$.',
          'Cộng số mũ: $' + leftPow.latex + ' + ' + u.simplifyFrac(s, r).latex + ' = ' + exp.latex + '$. Vậy $P = ' + expTerm + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 1 (không phải phép khai căn)', params: { p: 1, q: 2, r: 1, s: 1 }, expectedValid: false },
      { label: 'Biên căn bậc 3', params: { p: 1, q: 2, r: 3, s: 1 }, expectedValid: true },
    ],
  },

  t11_b19_logarithm_mc: {
    id: 't11_b19_logarithm_mc',
    name: 'Tính giá trị biểu thức lôgarit theo quy tắc lôgarit của tích, thương, luỹ thừa',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Lôgarit',
    description: 'Cho log_a(b) = m và log_a(c) = n. Tính P = log_a(a^p * b^q / c^r).',
    conditionSummary: 'q >= 1, r >= 1, p >= 1',
    paramSpecs: [
      { name: 'm', label: 'Giá trị m', min: 2, max: 6 },
      { name: 'n', label: 'Giá trị n', min: 1, max: 5 },
      { name: 'p', label: 'Số mũ p', min: 1, max: 4 },
      { name: 'q', label: 'Số mũ q', min: 1, max: 4 },
      { name: 'r', label: 'Số mũ r', min: 1, max: 3 },
    ],
    validateCode: `
      if (params.q <= 0 || params.r <= 0 || params.p <= 0) return { valid: false, reason: 'Số mũ phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, n, p, q, r } = params;
      const ans = p + q * m - r * n;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (p + q * m + r * n) + '$', '$' + (q * m - r * n) + '$', '$' + (p + m - n) + '$'],
        rng,
        (k) => '$' + (ans + k * 2 + 1) + '$'
      );
      return {
        stem: 'Với các số thực dương $a, b, c$ ($a \\neq 1$) thỏa mãn $\\log_a b = ' + m + '$ và $\\log_a c = ' + n + '$. Giá trị của biểu thức $P = \\log_a \\left(\\frac{a^{' + (p === 1 ? '' : p) + '} b^{' + (q === 1 ? '' : q) + '}}{c^{' + (r === 1 ? '' : r) + '}}\\right)$ bằng:',
        options,
        correctIndex,
        answerSummary: '$P = ' + ans + '$',
        solutionSteps: [
          'Áp dụng quy tắc lôgarit: $P = ' + p + '\\log_a a + ' + q + '\\log_a b - ' + r + '\\log_a c$.',
          'Thay số: $P = ' + p + ' + ' + q + '\\cdot' + m + ' - ' + r + '\\cdot' + n + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { m: 3, n: 2, p: 0, q: 2, r: 1 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { m: 4, n: 3, p: 2, q: 3, r: 2 }, expectedValid: true },
    ],
  },

  t11_b20_exp_log_func_mc: {
    id: 't11_b20_exp_log_func_mc',
    name: 'Tìm tập xác định của hàm số lôgarit chứa tam thức bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Cho y = log_a(-x^2 + (x1 + x2)x - x1*x2) với x1 < x2 và cơ số a > 1. Tập xác định là (x1; x2).',
    conditionSummary: 'x1 < x2 và cơ số a >= 2',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 5 },
      { name: 'x1', label: 'Nghiệm x1', min: -4, max: 2 },
      { name: 'x2', label: 'Nghiệm x2', min: -1, max: 6 },
    ],
    validateCode: `
      if (params.a <= 1) return { valid: false, reason: 'Cơ số phải a > 1' };
      if (params.x1 >= params.x2) return { valid: false, reason: 'Cần x1 < x2 để khoảng nghiệm khác rỗng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2 } = params;
      const poly = u.formatQuadratic(-1, x1 + x2, -x1 * x2);
      const correct = '$(' + x1 + ';\\, ' + x2 + ')$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$[' + x1 + ';\\, ' + x2 + ']$',
          '$(-\\infty;\\, ' + x1 + ') \\cup (' + x2 + ';\\, +\\infty)$',
          '$(' + x1 + ';\\, +\\infty)$',
        ],
        rng,
        (k) => '$(' + (x1 - k) + ';\\, ' + (x2 + k) + ')$'
      );
      return {
        stem: 'Tập xác định của hàm số $y = \\log_{' + a + '}(' + poly + ')$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện xác định: $' + poly + ' > 0$.',
          'Tam thức có hai nghiệm $x_1 = ' + x1 + ',\\, x_2 = ' + x2 + '$ và hệ số $a = -1 < 0$ nên tập xác định là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = x2 (tập xác định rỗng)', params: { a: 2, x1: 2, x2: 2 }, expectedValid: false },
      { label: 'Biên đối xứng', params: { a: 3, x1: -2, x2: 2 }, expectedValid: true },
    ],
  },

  t11_b22_two_perp_lines_mc: {
    id: 't11_b22_two_perp_lines_mc',
    name: 'Xác định góc giữa hai đường thẳng chéo nhau trong hình lập phương',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai đường thẳng vuông góc',
    description: 'Cho hình lập phương ABCD.A\'B\'C\'D\' cạnh a > 0. Tính góc giữa hai đường thẳng chéo nhau (3 cấu hình chuẩn 45°, 60°, 90°).',
    conditionSummary: 'Cạnh a > 0 và mode trong {0, 1, 2}',
    paramSpecs: [
      { name: 'a', label: 'Cạnh lập phương a', min: 2, max: 10 },
      { name: 'mode', label: 'Cặp đường thẳng (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.a <= 0) return { valid: false, reason: 'Cạnh lập phương phải dương' };
      if (![0, 1, 2].includes(params.mode)) return { valid: false, reason: 'mode thuộc {0, 1, 2}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, mode } = params;
      const configs = [
        { pair: "$AB$ và $B'D'$", deg: 45, reason: "Do $AB \\parallel C'D'$ nên $(AB, B'D') = (C'D', B'D') = \\widehat{B'D'C'} = 45^\\circ$." },
        { pair: "$AC$ và $B'D'$", deg: 90, reason: "Do $AC \\parallel A'C'$ và $A'C' \\perp B'D'$ nên $(AC, B'D') = 90^\\circ$." },
        { pair: "$AD'$ và $A'C'$", deg: 60, reason: "Do $AD' \\parallel BC'$ nên $(AD', A'C') = (BC', A'C') = \\widehat{A'C'B} = 60^\\circ$ (tam giác $A'BC'$ đều)." },
      ];
      const cfg = configs[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + cfg.deg + '^\\circ$',
        ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'].filter((x) => x !== '$' + cfg.deg + '^\\circ$'),
        rng,
        (k) => '$' + (cfg.deg + k * 15) + '^\\circ$'
      );
      return {
        stem: "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $" + a + "$. Góc giữa hai đường thẳng " + cfg.pair + " bằng:",
        options,
        correctIndex,
        answerSummary: '$' + cfg.deg + '^\\circ$',
        solutionSteps: [cfg.reason],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh a = 0', params: { a: 0, mode: 0 }, expectedValid: false },
      { label: 'Biên góc 60 độ', params: { a: 3, mode: 2 }, expectedValid: true },
    ],
  },

  t11_b23_line_perp_plane_mc: {
    id: 't11_b23_line_perp_plane_mc',
    name: 'Tính cạnh bên hình chóp có cạnh bên vuông góc với đáy',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho S.ABC có SA perp (ABC), tam giác ABC vuông tại B, AB = 3k, BC = 4k, SA = 12k -> AC = 5k, SC = 13k nguyên.',
    conditionSummary: 'Hệ số k >= 1 để các cạnh dương và độ dài SC nguyên',
    paramSpecs: [
      { name: 'k', label: 'Hệ số tỉ lệ k', min: 1, max: 6 },
    ],
    validateCode: `
      if (params.k <= 0) return { valid: false, reason: 'k phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      const ab = 3 * k, bc = 4 * k, sa = 12 * k, ac = 5 * k, sc = 13 * k;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + sc + '$',
        ['$' + ac + '$', '$' + (14 * k) + '$', '$' + (15 * k) + '$'],
        rng,
        (step) => '$' + (sc + step * 2) + '$'
      );
      return {
        stem: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$, đáy $ABC$ là tam giác vuông tại $B$ với $AB = ' + ab + ',\\, BC = ' + bc + '$ và $SA = ' + sa + '$. Độ dài cạnh $SC$ bằng:',
        options,
        correctIndex,
        answerSummary: '$SC = ' + sc + '$',
        solutionSteps: [
          'Tam giác $ABC$ vuông tại $B \\Rightarrow AC = \\sqrt{AB^2 + BC^2} = \\sqrt{' + ab + '^2 + ' + bc + '^2} = ' + ac + '$.',
          'Do $SA \\perp (ABC)$ nên $SA \\perp AC \\Rightarrow SC = \\sqrt{SA^2 + AC^2} = \\sqrt{' + sa + '^2 + ' + ac + '^2} = ' + sc + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Biên k = 2', params: { k: 2 }, expectedValid: true },
    ],
  },

  t11_b24_angle_line_plane_sa: {
    id: 't11_b24_angle_line_plane_sa',
    name: 'Tính góc giữa đường thẳng và mặt phẳng đáy',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng',
    description: 'Cho hình chóp S.ABCD có SA perp (ABCD), đáy hình chữ nhật AB = 3k, BC = 4k (AC = 5k), và SA = 5k*tan(alpha) hoặc tìm tan(SC, (ABCD)) = SA/AC.',
    conditionSummary: 'k >= 1 và m >= 1 để tỉ số tan(alpha) tối giản',
    paramSpecs: [
      { name: 'k', label: 'Hệ số cạnh đáy k', min: 1, max: 4 },
      { name: 'm', label: 'Chiều cao SA = m', min: 2, max: 12 },
    ],
    validateCode: `
      if (params.k <= 0 || params.m <= 0) return { valid: false, reason: 'Các kích thước phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, m } = params;
      const ab = 3 * k, bc = 4 * k, ac = 5 * k;
      const tanFrac = u.simplifyFrac(m, ac);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có $SA \\perp (ABCD)$, đáy $ABCD$ là hình chữ nhật với $AB = ' + ab + ',\\, BC = ' + bc + '$ và $SA = ' + m + '$. Gọi $\\varphi$ là góc giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$. Tính $\\tan\\varphi$ (viết kết quả dưới dạng phân số tối giản).',
        shortAnswer: tanFrac.text,
        numericValue: Number(tanFrac.value.toFixed(2)),
        answerSummary: '$\\tan\\varphi = ' + tanFrac.latex + '$',
        solutionSteps: [
          'Do $SA \\perp (ABCD)$ nên $AC$ là hình chiếu vuông góc của $SC$ lên $(ABCD)$, suy ra $\\varphi = \\widehat{SCA}$.',
          'Đường chéo $AC = \\sqrt{AB^2 + BC^2} = ' + ac + '$.',
          'Trong tam giác vuông $SAC$: $\\tan\\varphi = \\frac{SA}{AC} = \\frac{' + m + '}{' + ac + '} = ' + tanFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên SA = 0', params: { k: 1, m: 0 }, expectedValid: false },
      { label: 'Biên góc 45 độ (SA = AC = 5)', params: { k: 1, m: 5 }, expectedValid: true },
    ],
  },

  t11_b25_two_perp_planes_sa: {
    id: 't11_b25_two_perp_planes_sa',
    name: 'Tính cạnh bên khi mặt bên vuông góc với mặt phẳng đáy',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho S.ABCD đáy hình vuông cạnh a = 2k, tam giác SAB đều nằm trong mặt phẳng vuông góc với đáy. Tính SD^2 = 2a^2.',
    conditionSummary: 'a = 2k > 0 để trung điểm H cho số đẹp',
    paramSpecs: [
      { name: 'k', label: 'Nửa cạnh đáy k', min: 1, max: 6 },
    ],
    validateCode: `
      if (params.k <= 0) return { valid: false, reason: 'Cạnh đáy phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const a = 2 * params.k;
      const sdSq = 2 * a * a;
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh bằng $' + a + '$. Biết tam giác $SAB$ đều và nằm trong mặt phẳng vuông góc với mặt phẳng đáy $(ABCD)$. Tính bình phương độ dài cạnh $SD^2$.',
        shortAnswer: '' + sdSq,
        numericValue: sdSq,
        answerSummary: '$SD^2 = ' + sdSq + '$',
        solutionSteps: [
          'Gọi $H$ là trung điểm của $AB$. Do $\\Delta SAB$ đều và $(SAB) \\perp (ABCD)$ nên $SH \\perp (ABCD)$ với $SH = \\frac{a\\sqrt{3}}{2}$.',
          'Trong đáy $ABCD$: $HD^2 = HA^2 + AD^2 = ' + params.k + '^2 + ' + a + '^2 = ' + (5 * params.k * params.k) + '$.',
          'Khi đó $SD^2 = SH^2 + HD^2 = ' + (3 * params.k * params.k) + ' + ' + (5 * params.k * params.k) + ' = ' + sdSq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Biên a = 4', params: { k: 2 }, expectedValid: true },
    ],
  },

  t11_b26_distance_space_sa: {
    id: 't11_b26_distance_space_sa',
    name: 'Tính khoảng cách từ chân đường cao đến mặt bên hình chóp',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách trong không gian',
    description: 'Cho S.ABC có SA perp (ABC), đáy ABC vuông tại B, AB = 15k, SA = 20k -> d(A, (SBC)) = 12k nguyên.',
    conditionSummary: 'k >= 1 để khoảng cách nguyên dương',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 1, max: 5 },
      { name: 'bc', label: 'Cạnh BC', min: 4, max: 15 },
    ],
    validateCode: `
      if (params.k <= 0 || params.bc <= 0) return { valid: false, reason: 'Các cạnh phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, bc } = params;
      const ab = 15 * k;
      const sa = 20 * k;
      const dist = 12 * k;
      return {
        stem: 'Cho hình chóp $S.ABC$ có $SA \\perp (ABC)$ và tam giác $ABC$ vuông tại $B$. Biết $SA = ' + sa + ',\\, AB = ' + ab + ',\\, BC = ' + bc + '$. Tính khoảng cách từ điểm $A$ đến mặt phẳng $(SBC)$.',
        shortAnswer: '' + dist,
        numericValue: dist,
        answerSummary: '$d(A, (SBC)) = ' + dist + '$',
        solutionSteps: [
          'Ta có $BC \\perp AB$ và $BC \\perp SA \\Rightarrow BC \\perp (SAB)$.',
          'Kẻ $AH \\perp SB$ ($H \\in SB$) suy ra $AH \\perp (SBC)$, do đó $d(A, (SBC)) = AH$.',
          'Trong tam giác vuông $SAB$: $AH = \\frac{SA \\cdot AB}{\\sqrt{SA^2 + AB^2}} = \\frac{' + sa + ' \\cdot ' + ab + '}{' + (25 * k) + '} = ' + dist + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, bc: 6 }, expectedValid: false },
      { label: 'Biên k = 2', params: { k: 2, bc: 8 }, expectedValid: true },
    ],
  },

  t11_b27_volume_space_sa: {
    id: 't11_b27_volume_space_sa',
    name: 'Tính thể tích khối chóp có đáy hình chữ nhật',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Thể tích',
    description: 'Tính thể tích khối chóp S.ABCD có đáy hình chữ nhật kích thước a, b và đường cao h = 3k.',
    conditionSummary: 'a, b, k > 0 để thể tích nguyên dương',
    paramSpecs: [
      { name: 'a', label: 'Chiều rộng a', min: 2, max: 10 },
      { name: 'b', label: 'Chiều dài b', min: 3, max: 12 },
      { name: 'k', label: 'Hệ số chiều cao (h = 3k)', min: 1, max: 6 },
    ],
    validateCode: `
      if (params.a <= 0 || params.b <= 0 || params.k <= 0) return { valid: false, reason: 'Kích thước hình chóp phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k } = params;
      const h = 3 * k;
      const vol = a * b * k;
      return {
        stem: 'Cho khối chóp $S.ABCD$ có đáy $ABCD$ là hình chữ nhật với $AB = ' + a + ',\\, AD = ' + b + '$ và đường cao $SH = ' + h + '$. Thể tích của khối chóp đã cho bằng bao nhiêu?',
        shortAnswer: '' + vol,
        numericValue: vol,
        answerSummary: '$V = ' + vol + '$',
        solutionSteps: [
          'Diện tích đáy: $S_{ABCD} = ' + a + ' \\cdot ' + b + ' = ' + (a * b) + '$.',
          'Thể tích khối chóp: $V = \\frac{1}{3} S_{ABCD} \\cdot SH = \\frac{1}{3} \\cdot ' + (a * b) + ' \\cdot ' + h + ' = ' + vol + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { a: 4, b: 5, k: 0 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { a: 3, b: 5, k: 2 }, expectedValid: true },
    ],
  },

  t11_b28_events_ops_mc: {
    id: 't11_b28_events_ops_mc',
    name: 'Xác định biến cố hợp và biến cố giao trên tập số tự nhiên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố hợp, biến cố giao, biến cố độc lập',
    description: 'Chọn ngẫu nhiên 1 số từ 1 đến 6k. Gọi A: chia hết cho 2, B: chia hết cho 3. Tìm số phần tử của biến cố hợp A ∪ B.',
    conditionSummary: 'N = 6k >= 12',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k (N = 6k)', min: 2, max: 8 },
    ],
    validateCode: `
      if (params.k < 2) return { valid: false, reason: 'Cần k >= 2 để không gian mẫu đủ lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const N = 6 * params.k;
      const nA = N / 2;
      const nB = N / 3;
      const nAB = N / 6;
      const ans = nA + nB - nAB;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (nA + nB) + '$', '$' + nAB + '$', '$' + (ans - 1) + '$'],
        rng,
        (step) => '$' + (ans + step + 2) + '$'
      );
      return {
        stem: 'Chọn ngẫu nhiên một số tự nhiên từ $1$ đến $' + N + '$. Gọi $A$ là biến cố "Số được chọn chia hết cho $2$" và $B$ là biến cố "Số được chọn chia hết cho $3$". Số phần tử của biến cố hợp $A \\cup B$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Ta có $n(A) = ' + nA + ',\\, n(B) = ' + nB + '$ và $n(AB) = ' + nAB + '$ (các số chia hết cho $6$).',
          'Số phần tử của biến cố hợp là $n(A \\cup B) = n(A) + n(B) - n(AB) = ' + nA + ' + ' + nB + ' - ' + nAB + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0 }, expectedValid: false },
      { label: 'Biên N = 30', params: { k: 5 }, expectedValid: true },
    ],
  },

  t11_b29_prob_addition_mc: {
    id: 't11_b29_prob_addition_mc',
    name: 'Tính xác suất biến cố hợp bằng công thức cộng xác suất',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho P(A), P(B), P(AB) thỏa 0 < P(AB) < min(P(A), P(B)) và P(A) + P(B) - P(AB) < 1. Tính P(A ∪ B).',
    conditionSummary: '0 < P(AB) < min(P(A), P(B)) và P(A ∪ B) < 1',
    paramSpecs: [
      { name: 'a', label: '10*P(A)', min: 3, max: 7 },
      { name: 'b', label: '10*P(B)', min: 3, max: 7 },
      { name: 'ab', label: '10*P(AB)', min: 1, max: 4 },
    ],
    validateCode: `
      const { a, b, ab } = params;
      if (ab <= 0 || ab >= Math.min(a, b)) return { valid: false, reason: 'Cần 0 < P(AB) < min(P(A), P(B))' };
      if (a + b - ab >= 10) return { valid: false, reason: 'Xác suất P(A ∪ B) phải < 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, ab } = params;
      const pUnion = (a + b - ab) / 10;
      const correct = '$' + u.formatNumberVN(pUnion, 1) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + u.formatNumberVN((a + b) / 10, 1) + '$',
          '$' + u.formatNumberVN((a + b + ab) / 10, 1) + '$',
          '$' + u.formatNumberVN(Math.max(0.1, (a + b - 2 * ab) / 10), 1) + '$',
        ],
        rng,
        (k) => '$' + u.formatNumberVN(Math.min(0.99, pUnion + k * 0.05), 2) + '$'
      );
      return {
        stem: 'Cho hai biến cố $A$ và $B$ có $P(A) = ' + u.formatNumberVN(a / 10, 1) + ',\\, P(B) = ' + u.formatNumberVN(b / 10, 1) + '$ và $P(AB) = ' + u.formatNumberVN(ab / 10, 1) + '$. Xác suất $P(A \\cup B)$ bằng:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức cộng xác suất: $P(A \\cup B) = P(A) + P(B) - P(AB) = ' + u.formatNumberVN(a / 10, 1) + ' + ' + u.formatNumberVN(b / 10, 1) + ' - ' + u.formatNumberVN(ab / 10, 1) + ' = ' + u.formatNumberVN(pUnion, 1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(A ∪ B) > 1 (vô lý)', params: { a: 7, b: 7, ab: 2 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { a: 5, b: 4, ab: 2 }, expectedValid: true },
    ],
  },

  t11_b32_derivative_rules_mc: {
    id: 't11_b32_derivative_rules_mc',
    name: 'Tính đạo hàm của hàm phân thức bậc nhất trên bậc nhất tại x0',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Các quy tắc tính đạo hàm',
    description: 'Cho y = (ax + b)/(cx + d) với c != 0, ad - bc != 0, cx0 + d != 0. Tính y\'(x0).',
    conditionSummary: 'c != 0, ad - bc != 0 và cx0 + d != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -5, max: 5 },
      { name: 'c', label: 'Hệ số c', min: 1, max: 3 },
      { name: 'd', label: 'Hệ số d', min: -4, max: 4 },
      { name: 'x0', label: 'Điểm x0', min: -2, max: 4 },
    ],
    validateCode: `
      const { a, b, c, d, x0 } = params;
      if (c === 0) return { valid: false, reason: 'c = 0 suy biến thành hàm bậc nhất' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 suy biến thành hàm hằng' };
      if (c * x0 + d === 0) return { valid: false, reason: 'x0 làm mẫu số bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, x0 } = params;
      const det = a * d - b * c;
      const denVal = c * x0 + d;
      const frac = u.simplifyFrac(det, denVal * denVal);
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + frac.latex + '$',
        [
          '$' + u.simplifyFrac(-det, denVal * denVal).latex + '$',
          '$' + u.simplifyFrac(det, denVal).latex + '$',
          '$' + u.simplifyFrac(a * d + b * c, denVal * denVal).latex + '$',
        ],
        rng,
        (k) => '$' + u.simplifyFrac(det + k, denVal * denVal + 1).latex + '$'
      );
      return {
        stem: "Đạo hàm của hàm số $y = \\frac{" + numStr + '}{' + denStr + '}$ tại điểm $x_0 = ' + x0 + '$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + frac.latex + '$',
        solutionSteps: [
          "Áp dụng công thức đạo hàm hàm phân thức: $y' = \\frac{ad - bc}{(" + denStr + ")^2} = \\frac{" + det + "}{(" + denStr + ")^2}$.",
          "Thay $x_0 = " + x0 + "$ thu được $y'(" + x0 + ") = \\frac{" + det + "}{" + (denVal * denVal) + "} = " + frac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu bằng 0 tại x0', params: { a: 2, b: 1, c: 1, d: -2, x0: 2 }, expectedValid: false },
      { label: 'Biên ad - bc = 0', params: { a: 2, b: 4, c: 1, d: 2, x0: 1 }, expectedValid: false },
      { label: 'Biên hợp lệ', params: { a: 2, b: 1, c: 1, d: 1, x0: 1 }, expectedValid: true },
    ],
  },

  t11_b33_second_derivative_sa: {
    id: 't11_b33_second_derivative_sa',
    name: 'Tính gia tốc tức thời bằng đạo hàm cấp hai',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đạo hàm cấp hai',
    description: 'Một vật chuyển động theo phương trình s(t) = a t^3 + b t^2 + c t + d. Tính gia tốc tức thời a(t0) = s\'\'(t0).',
    conditionSummary: 'a != 0 và t0 > 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 4 },
      { name: 'b', label: 'Hệ số b', min: -5, max: 6 },
      { name: 'c', label: 'Hệ số c', min: 1, max: 8 },
      { name: 't0', label: 'Thời điểm t0 (s)', min: 1, max: 6 },
    ],
    validateCode: `
      if (params.a <= 0 || params.t0 <= 0) return { valid: false, reason: 'a và t0 phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, t0 } = params;
      const poly = u.formatPoly([a, b, c, 0]).replace(/x/g, 't');
      const vPoly = u.formatQuadratic(3 * a, 2 * b, c).replace(/x/g, 't');
      const aPoly = u.formatLinear(6 * a, 2 * b).replace(/x/g, 't');
      const acc = 6 * a * t0 + 2 * b;
      return {
        stem: 'Một chất điểm chuyển động thẳng xác định bởi phương trình $s(t) = ' + poly + '$ ($s$ tính bằng mét, $t$ tính bằng giây). Gia tốc tức thời của chất điểm tại thời điểm $t = ' + t0 + '\\text{ s}$ bằng bao nhiêu $\\text{m/s}^2$?',
        shortAnswer: '' + acc,
        numericValue: acc,
        answerSummary: '$' + acc + '\\text{ m/s}^2$',
        solutionSteps: [
          "Vận tốc tức thời: $v(t) = s'(t) = " + vPoly + '$.',
          "Gia tốc tức thời: $a(t) = s''(t) = " + aPoly + '$.',
          'Tại $t = ' + t0 + '\\text{ s}$, ta có $a(' + t0 + ') = ' + (6 * a) + '\\cdot' + t0 + u.formatTrailingConst(2 * b) + ' = ' + acc + '\\text{ m/s}^2$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t0 = 0', params: { a: 1, b: 2, c: 3, t0: 0 }, expectedValid: false },
      { label: 'Biên b âm', params: { a: 2, b: -3, c: 5, t0: 4 }, expectedValid: true },
    ],
  },
};
