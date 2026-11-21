import { MathTemplate } from '../types/math';

export const G10_B2_SA_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 37 (Q37 - SA): Số phần tử tập D = {n ∈ N | |n - a| < b}
  t10_b2_d37_count_abs_nat_sa: {
    id: 't10_b2_d37_count_abs_nat_sa',
    name: 'Đếm số phần tử tập hợp số tự nhiên theo bất phương trình trị tuyệt đối |n - a| < b',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đếm số phần tử tập hợp',
    description: 'Tính số phần tử của D = {n ∈ N | |n - a| < b} với a, b nguyên dương.',
    conditionSummary: 'a in [5; 45], b in [8; 65]',
    paramSpecs: [
      { name: 'a', label: 'Tâm a', min: 5, max: 45 },
      { name: 'b', label: 'Bán kính b', min: 8, max: 65 },
    ],
    validateCode: `
      const { a, b } = params;
      if (!Number.isInteger(a) || a < 1 || a > 200) return { valid: false, reason: 'a phải thuộc [1; 200]' };
      if (!Number.isInteger(b) || b < 2 || b > 200) return { valid: false, reason: 'b phải thuộc [2; 200]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const loStrict = a - b;
      const hiStrict = a + b;
      const nMin = Math.max(0, loStrict + 1);
      const nMax = hiStrict - 1;
      const ans = nMax - nMin + 1;
      const shortAnswer = String(ans);
      return {
        stem: 'Số phần tử của tập hợp $D = \\{n \\in \\mathbb{N} \\mid |n - ' + a + '| < ' + b + '\\}$ là bao nhiêu?',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $|n - ' + a + '| < ' + b + ' \\Leftrightarrow ' + loStrict + ' < n < ' + hiStrict + '$.',
          'Vì $n \\in \\mathbb{N}$ nên $n \\in [' + nMin + ';\\, ' + nMax + '] \\cap \\mathbb{N}$.',
          'Vậy tập hợp $D$ có $' + nMax + ' - ' + nMin + ' + 1 = ' + ans + '$ phần tử.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 16, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37: |n - 16| < 42 => 58', params: { a: 16, b: 42 }, expectedValid: true },
    ],
  },

  // Dạng 38 (Q38 - SA): Số phần tử tập E = {n ∈ N | L < n² < R}
  t10_b2_d38_count_square_range_sa: {
    id: 't10_b2_d38_count_square_range_sa',
    name: 'Đếm số phần tử tập hợp E = {n ∈ N | L < n² < R}',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đếm số phần tử tập hợp',
    description: 'Tìm số phần tử của tập hợp các số tự nhiên n thỏa mãn L < n² < R.',
    conditionSummary: '2 <= L < R <= 900, có ít nhất 4 số tự nhiên thỏa mãn',
    paramSpecs: [
      { name: 'L', label: 'Cận dưới L', min: 3, max: 45 },
      { name: 'R', label: 'Cận trên R', min: 100, max: 650 },
    ],
    validateCode: `
      const { L, R } = params;
      if (!Number.isInteger(L) || L < 1 || L > 200) return { valid: false, reason: 'L phải thuộc [1; 200]' };
      if (!Number.isInteger(R) || R <= L + 20 || R > 1200) return { valid: false, reason: 'R phải thuộc [L + 21; 1200]' };
      const nMin = Math.floor(Math.sqrt(L)) + 1;
      const nMax = Math.ceil(Math.sqrt(R)) - 1;
      if (nMax - nMin + 1 < 4) return { valid: false, reason: 'Cần có ít nhất 4 phần tử thỏa mãn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L, R } = params;
      const nMin = Math.floor(Math.sqrt(L)) + 1;
      const nMax = Math.ceil(Math.sqrt(R)) - 1;
      const ans = nMax - nMin + 1;
      const shortAnswer = String(ans);
      return {
        stem: 'Số phần tử của tập hợp $E = \\{n \\in \\mathbb{N} \\mid ' + L + ' < n^2 < ' + R + '\\}$ là bao nhiêu?',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vì $n \\in \\mathbb{N}$ nên từ $' + L + ' < n^2 < ' + R + '$ suy ra $\\sqrt{' + L + '} < n < \\sqrt{' + R + '}$.',
          'Do đó $n \\in \\{' + nMin + ';\\, ' + (nMin + 1) + ';\\, \\ldots;\\, ' + nMax + '\\}$.',
          'Vậy tập hợp $E$ có $' + nMax + ' - ' + nMin + ' + 1 = ' + ans + '$ phần tử.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R <= L', params: { L: 50, R: 40 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38: 10 < n² < 258 => 13', params: { L: 10, R: 258 }, expectedValid: true },
    ],
  },

  // Dạng 39 (Q39 - SA): Số phần tử tập E = {x ∈ Q | x = 1/b^n, n ∈ N, x ≥ 1/b^k}
  t10_b2_d39_count_pow_fraction_sa: {
    id: 't10_b2_d39_count_pow_fraction_sa',
    name: 'Đếm số phần tử tập hợp lũy thừa phân số E = {x = 1/bⁿ, x ≥ 1/bᵏ}',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đếm số phần tử tập hợp',
    description: 'Đếm số phần tử của tập hợp {x ∈ Q | x = 1/b^n, n ∈ N, x ≥ 1/b^k} (n chạy từ 0 đến k nên có k + 1 phần tử).',
    conditionSummary: 'base in [2; 4], k in [3; 9] (với base=2 thì k <= 9; base=3 thì k <= 6; base=4 thì k <= 5)',
    paramSpecs: [
      { name: 'base', label: 'Cơ số b (2..4)', min: 2, max: 4 },
      { name: 'k', label: 'Số mũ tối đa k', min: 3, max: 9 },
    ],
    validateCode: `
      const { base, k } = params;
      if (!Number.isInteger(base) || base < 2 || base > 5) return { valid: false, reason: 'base phải thuộc [2; 5]' };
      if (!Number.isInteger(k) || k < 2 || k > 10) return { valid: false, reason: 'k phải thuộc [2; 10]' };
      if (Math.pow(base, k) > 4096) return { valid: false, reason: 'b^k không vượt quá 4096 để mẫu số gọn đẹp' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { base, k } = params;
      const denom = Math.pow(base, k);
      const ans = k + 1;
      const shortAnswer = String(ans);
      return {
        stem:
          'Số phần tử của tập hợp $E = \\left\\{x \\in \\mathbb{Q} \\mid x = \\dfrac{1}{' + base + '^n},\\; n \\in \\mathbb{N},\\; x \\ge \\dfrac{1}{' + denom + '}\\right\\}$ là bao nhiêu?',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\dfrac{1}{' + base + '^n} \\ge \\dfrac{1}{' + denom + '} = \\dfrac{1}{' + base + '^{' + k + '}} \\Leftrightarrow ' + base + '^n \\le ' + base + '^{' + k + '} \\Leftrightarrow n \\le ' + k + '$.',
          'Vì $n \\in \\mathbb{N}$ nên $n \\in \\{0;\\, 1;\\, 2;\\, \\ldots;\\, ' + k + '\\}$.',
          'Vậy tập hợp $E$ có $' + ans + '$ phần tử.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên base = 1', params: { base: 1, k: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39: 1/2^n >= 1/64 => 7', params: { base: 2, k: 6 }, expectedValid: true },
    ],
  },

  // Dạng 40 (Q40 - SA): Tổng các phần tử phân biệt của tập D = {x = k² - c | k ∈ Z, a ≤ k ≤ b}
  t10_b2_d40_sum_quad_image_sa: {
    id: 't10_b2_d40_sum_quad_image_sa',
    name: 'Tính tổng các phần tử của tập hợp D = {k² - c | k ∈ Z, a ≤ k ≤ b}',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tổng phần tử của tập hợp',
    description: 'Liệt kê các giá trị phân biệt của k² - c khi k chạy trên đoạn số nguyên [a; b] (tránh đếm trùng các giá trị đối nhau) và tính tổng.',
    conditionSummary: 'a < 0 < b, c in [1; 8], |a| và b trong [1; 5]',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái a (< 0)', min: -5, max: -1 },
      { name: 'b', label: 'Đầu mút phải b (> 0)', min: 1, max: 4 },
      { name: 'c', label: 'Hằng số trừ c', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (!Number.isInteger(a) || a < -6 || a > -1) return { valid: false, reason: 'a phải nguyên âm trong [-6; -1]' };
      if (!Number.isInteger(b) || b < 1 || b > 6) return { valid: false, reason: 'b phải nguyên dương trong [1; 6]' };
      if (!Number.isInteger(c) || c < 1 || c > 15) return { valid: false, reason: 'c phải thuộc [1; 15]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const valSet = new Set();
      for (let k = a; k <= b; k++) valSet.add(k * k - c);
      const elems = Array.from(valSet).sort((x, y) => x - y);
      const sum = elems.reduce((acc, v) => acc + v, 0);
      const sumExpr = elems
        .map((v, idx) => (idx === 0 ? String(v) : v < 0 ? ' - ' + Math.abs(v) : ' + ' + v))
        .join('');
      const shortAnswer = String(sum);
      return {
        stem:
          'Tính tổng các phần tử của tập hợp $D = \\left\\{x = k^2 - ' + c + ' \\mid k \\in \\mathbb{Z},\\; ' + a + ' \\le k \\le ' + b + '\\right\\}$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Cho $k$ lần lượt nhận các giá trị nguyên từ $' + a + '$ đến $' + b + '$, loại bỏ các giá trị trùng lặp ta thu được $D = \\{' + elems.join(';\\, ') + '\\}$.',
          'Tổng các phần tử của tập hợp $D$ là $' + sumExpr + ' = ' + sum + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= 0', params: { a: 0, b: 2, c: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40: k² - 2, -3 <= k <= 1 => tổng 6', params: { a: -3, b: 1, c: 2 }, expectedValid: true },
    ],
  },

  // Dạng 41 (Q41 - SA): Tổng các số tự nhiên thuộc B = {n ∈ N | L < an + c < R}
  t10_b2_d41_sum_linear_nat_sa: {
    id: 't10_b2_d41_sum_linear_nat_sa',
    name: 'Tính tổng các phần tử tập hợp B = {n ∈ N | L < an + c < R}',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tổng phần tử của tập hợp',
    description: 'Giải bất phương trình kép L < an + c < R trên tập số tự nhiên N rồi tính tổng cấp số cộng các phần tử tìm được.',
    conditionSummary: 'a in [2; 7], c in [1; 12], L < c, R > c + 15a',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 7 },
      { name: 'c', label: 'Hằng số c', min: 1, max: 12 },
      { name: 'L', label: 'Cận dưới L', min: -12, max: 10 },
      { name: 'R', label: 'Cận trên R', min: 60, max: 240 },
    ],
    validateCode: `
      const { a, c, L, R } = params;
      if (!Number.isInteger(a) || a < 2 || a > 10) return { valid: false, reason: 'a phải thuộc [2; 10]' };
      if (!Number.isInteger(c) || c < 1 || c > 20) return { valid: false, reason: 'c phải thuộc [1; 20]' };
      if (!Number.isInteger(L) || L < -30 || L > 30) return { valid: false, reason: 'L phải thuộc [-30; 30]' };
      if (!Number.isInteger(R) || R < 30 || R > 400) return { valid: false, reason: 'R phải thuộc [30; 400]' };
      const nMin = Math.max(0, Math.floor((L - c) / a) + 1);
      const nMax = Math.ceil((R - c) / a) - 1;
      if (nMax - nMin + 1 < 8) return { valid: false, reason: 'Cần có ít nhất 8 phần tử tự nhiên thỏa mãn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, L, R } = params;
      const nMin = Math.max(0, Math.floor((L - c) / a) + 1);
      const nMax = Math.ceil((R - c) / a) - 1;
      const cnt = nMax - nMin + 1;
      const sum = ((nMin + nMax) * cnt) / 2;
      const linExpr = u.formatLinear(a, c, 'n');
      const shortAnswer = String(sum);
      return {
        stem:
          'Cho tập hợp $B = \\left\\{n \\in \\mathbb{N} \\mid ' + L + ' < ' + linExpr + ' < ' + R + '\\right\\}$. Tính tổng tất cả các số thuộc tập hợp $B$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $' + L + ' < ' + linExpr + ' < ' + R + ' \\Leftrightarrow ' + u.simplifyFrac(L - c, a).latex + ' < n < ' + u.simplifyFrac(R - c, a).latex + '$.',
          'Vì $n \\in \\mathbb{N}$ nên $' + nMin + ' \\le n \\le ' + nMax + '$, tức là $B = \\{' + nMin + ';\\, ' + (nMin + 1) + ';\\, \\ldots;\\, ' + nMax + '\\}$ (gồm $' + cnt + '$ phần tử).',
          'Tổng tất cả các phần tử của $B$ là $\\dfrac{(' + nMin + ' + ' + nMax + ') \\cdot ' + cnt + '}{2} = ' + sum + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, c: 5, L: -5, R: 154 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41: -5 < 3n + 5 < 154 => tổng 1225', params: { a: 3, c: 5, L: -5, R: 154 }, expectedValid: true },
    ],
  },

  // Dạng 42 (Q42 - SA): Đếm số nguyên chia hết cho d thỏa L < an + c < R
  t10_b2_d42_count_linear_divisible_sa: {
    id: 't10_b2_d42_count_linear_divisible_sa',
    name: 'Đếm số phần tử tập hợp D = {n ∈ Z | L < an + c < R và n ⋮ d}',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm số phần tử theo điều kiện chia hết',
    description: 'Giải bất phương trình kép L < an + c < R trên Z và đếm các số nguyên n chia hết cho d trong đoạn tìm được.',
    conditionSummary: 'a in [3; 9], c in [1; 12], d in [3; 7], L < -50, R > 60',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 3, max: 9 },
      { name: 'c', label: 'Hằng số c', min: 1, max: 12 },
      { name: 'L', label: 'Cận dưới L', min: -220, max: -60 },
      { name: 'R', label: 'Cận trên R', min: 80, max: 300 },
      { name: 'd', label: 'Số chia d', min: 3, max: 7 },
    ],
    validateCode: `
      const { a, c, L, R, d } = params;
      if (!Number.isInteger(a) || a < 2 || a > 12) return { valid: false, reason: 'a phải thuộc [2; 12]' };
      if (!Number.isInteger(c) || Math.abs(c) > 25) return { valid: false, reason: '|c| <= 25' };
      if (!Number.isInteger(L) || L < -400 || L > -20) return { valid: false, reason: 'L phải thuộc [-400; -20]' };
      if (!Number.isInteger(R) || R < 20 || R > 500) return { valid: false, reason: 'R phải thuộc [20; 500]' };
      if (!Number.isInteger(d) || d < 2 || d > 12) return { valid: false, reason: 'd phải thuộc [2; 12]' };
      const nMin = Math.floor((L - c) / a) + 1;
      const nMax = Math.ceil((R - c) / a) - 1;
      const kMin = Math.ceil(nMin / d);
      const kMax = Math.floor(nMax / d);
      if (kMax - kMin + 1 < 5) return { valid: false, reason: 'Cần có ít nhất 5 phần tử chia hết cho d' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, L, R, d } = params;
      const nMin = Math.floor((L - c) / a) + 1;
      const nMax = Math.ceil((R - c) / a) - 1;
      const kMin = Math.ceil(nMin / d);
      const kMax = Math.floor(nMax / d);
      const ans = kMax - kMin + 1;
      const firstVal = kMin * d;
      const secondVal = (kMin + 1) * d;
      const lastVal = kMax * d;
      const linExpr = u.formatLinear(a, c, 'n');
      const shortAnswer = String(ans);
      return {
        stem:
          'Cho tập hợp $D = \\left\\{n \\in \\mathbb{Z} \\mid ' + L + ' < ' + linExpr + ' < ' + R + ' \\text{ và } n \\,\\vdots\\, ' + d + '\\right\\}$. Tập hợp $D$ có bao nhiêu phần tử?',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Giải bất phương trình $' + L + ' < ' + linExpr + ' < ' + R + '$ với $n \\in \\mathbb{Z}$, ta được $' + nMin + ' \\le n \\le ' + nMax + '$.',
          'Các số nguyên chia hết cho $' + d + '$ trong đoạn trên là $D = \\{' + firstVal + ';\\, ' + secondVal + ';\\, \\ldots;\\, ' + lastVal + '\\}$.',
          'Số phần tử của $D$ là $\\dfrac{' + lastVal + ' - (' + firstVal + ')}{' + d + '} + 1 = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { a: 6, c: 4, L: -139, R: 242, d: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42: -139 < 6n + 4 < 242, n ⋮ 4 => 15', params: { a: 6, c: 4, L: -139, R: 242, d: 4 }, expectedValid: true },
    ],
  },

  // Dạng 43 (Q43 - SA): Tổng phần tử tập hợp ảnh bậc nhất I = {y = ax + b | x ∈ Z, x1 ≤ x ≤ x2}
  t10_b2_d43_sum_linear_image_sa: {
    id: 't10_b2_d43_sum_linear_image_sa',
    name: 'Tính tổng các phần tử của tập hợp I = {y = ax + b | x ∈ Z, x₁ ≤ x ≤ x₂}',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tổng phần tử của tập hợp',
    description: 'Tính tổng tất cả các giá trị y = ax + b khi x chạy qua các số nguyên trong đoạn [x1; x2].',
    conditionSummary: 'a != 0, |a| <= 8, |b| <= 10, x1 < x2 và 4 <= x2 - x1 <= 10',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (khác 0)', min: 2, max: 7 },
      { name: 'b', label: 'Hằng số b', min: -5, max: 6 },
      { name: 'x1', label: 'Đầu mút trái x1', min: -5, max: 1 },
      { name: 'span', label: 'Độ rộng x2 - x1', min: 4, max: 8 },
    ],
    validateCode: `
      const { a, b, x1, span } = params;
      if (!Number.isInteger(a) || a === 0 || Math.abs(a) > 10) return { valid: false, reason: 'a khác 0 và |a| <= 10' };
      if (!Number.isInteger(b) || Math.abs(b) > 15) return { valid: false, reason: '|b| <= 15' };
      if (!Number.isInteger(x1) || x1 < -15 || x1 > 10) return { valid: false, reason: 'x1 phải thuộc [-15; 10]' };
      if (!Number.isInteger(span) || span < 3 || span > 10) return { valid: false, reason: 'span phải thuộc [3; 10]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x1, span } = params;
      const x2 = x1 + span;
      const elems = [];
      for (let x = x1; x <= x2; x++) elems.push(a * x + b);
      const sum = elems.reduce((acc, v) => acc + v, 0);
      const linExpr = u.formatLinear(a, b, 'x');
      const shortAnswer = String(sum);
      return {
        stem:
          'Cho tập hợp $I = \\left\\{y \\in \\mathbb{Z} \\mid y = ' + linExpr + ',\\; x \\in \\mathbb{Z},\\; ' + x1 + ' \\le x \\le ' + x2 + '\\right\\}$. Tính tổng các phần tử của tập hợp $I$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Với $x \\in [' + x1 + ';\\, ' + x2 + '] \\cap \\mathbb{Z}$, thay từng giá trị của $x$ vào $y = ' + linExpr + '$ ta thu được $I = \\{' + elems.join(';\\, ') + '\\}$.',
          'Tổng các phần tử của tập hợp $I$ là $' + sum + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 0, x1: -2, span: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43: y = 4x, -2 <= x <= 4 => 28', params: { a: 4, b: 0, x1: -2, span: 6 }, expectedValid: true },
    ],
  },

  // Dạng 44 (Q44 - SA): Tìm phần tử nhỏ nhất của tập giá trị hàm bậc hai (a > 0)
  t10_b2_d44_min_quad_set_sa: {
    id: 't10_b2_d44_min_quad_set_sa',
    name: 'Tìm phần tử nhỏ nhất của tập giá trị tam thức bậc hai (a > 0)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tập hợp số thực và cực trị bậc hai',
    description: 'Cho G = {y ∈ R | y = ax² + bx + c, x ∈ R} với a > 0. Tìm phần tử có giá trị nhỏ nhất (làm tròn đến hàng phần mười).',
    conditionSummary: 'a in [2; 8], b khác 0, c in [-6; 10], tránh điểm làm tròn cận biên không chính xác',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (> 0)', min: 2, max: 8 },
      { name: 'b', label: 'Hệ số b (khác 0)', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -5, max: 10 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (!Number.isInteger(a) || a < 1 || a > 12) return { valid: false, reason: 'a phải thuộc [1; 12]' };
      if (!Number.isInteger(b) || b === 0 || Math.abs(b) > 15) return { valid: false, reason: 'b khác 0 và |b| <= 15' };
      if (!Number.isInteger(c) || Math.abs(c) > 20) return { valid: false, reason: '|c| <= 20' };
      const minVal = (4 * a * c - b * b) / (4 * a);
      const frac = Math.abs(minVal * 10) % 1;
      // Allow exact .5 (like 2.75 -> 2.8) but reject near-half floats like .495 or .505
      if (Math.abs(frac - 0.5) > 1e-9 && Math.abs(frac - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const minFrac = u.simplifyFrac(4 * a * c - b * b, 4 * a);
      const xMinFrac = u.simplifyFrac(-b, 2 * a);
      const sign = minFrac.num < 0 ? -1 : 1;
      const rounded10 = sign * Math.floor((20 * Math.abs(minFrac.num) + minFrac.den) / (2 * minFrac.den));
      const rounded = rounded10 / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const quadStr = u.formatQuadratic(a, b, c, 'x');
      const shiftStr = xMinFrac.num >= 0 ? 'x - ' + xMinFrac.latex : 'x + ' + u.simplifyFrac(Math.abs(xMinFrac.num), xMinFrac.den).latex;
      const tailStr = minFrac.num === 0 ? '' : minFrac.num > 0 ? ' + ' + minFrac.latex : ' - ' + u.simplifyFrac(Math.abs(minFrac.num), minFrac.den).latex;
      return {
        stem:
          'Cho tập hợp $G = \\left\\{y \\in \\mathbb{R} \\mid y = ' + quadStr + ',\\; x \\in \\mathbb{R}\\right\\}$. Tìm phần tử có giá trị nhỏ nhất của tập hợp $G$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta biến đổi $y = ' + a + '\\left(' + shiftStr + '\\right)^2' + tailStr + ' \\ge ' + minFrac.latex + '$ với mọi $x \\in \\mathbb{R}$.',
          'Dấu "$=$" xảy ra khi $x = ' + xMinFrac.latex + '$.',
          'Vậy phần tử nhỏ nhất của tập hợp $G$ là $' + minFrac.latex + (minFrac.isInteger ? '' : ' \\approx ' + shortAnswer) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -5, c: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44: 5x² - 5x + 4 => 11/4 ≈ 2,8', params: { a: 5, b: -5, c: 4 }, expectedValid: true },
    ],
  },

  // Dạng 45 (Q45 - SA): Tìm phần tử lớn nhất của tập giá trị hàm bậc hai (-a < 0)
  t10_b2_d45_max_quad_set_sa: {
    id: 't10_b2_d45_max_quad_set_sa',
    name: 'Tìm phần tử lớn nhất của tập giá trị tam thức bậc hai (a < 0)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tập hợp số thực và cực trị bậc hai',
    description: 'Cho J = {y ∈ R | y = -ax² + bx + c, x ∈ R} với a > 0. Tìm phần tử có giá trị lớn nhất (làm tròn đến hàng phần mười).',
    conditionSummary: 'a in [2; 8] (hệ số x² là -a < 0), b khác 0, c in [-5; 10]',
    paramSpecs: [
      { name: 'a', label: 'Độ lớn a (hệ số x² là -a)', min: 2, max: 8 },
      { name: 'b', label: 'Hệ số b (khác 0)', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -5, max: 10 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (!Number.isInteger(a) || a < 1 || a > 12) return { valid: false, reason: 'a phải thuộc [1; 12]' };
      if (!Number.isInteger(b) || b === 0 || Math.abs(b) > 15) return { valid: false, reason: 'b khác 0 và |b| <= 15' };
      if (!Number.isInteger(c) || Math.abs(c) > 20) return { valid: false, reason: '|c| <= 20' };
      const maxVal = (4 * a * c + b * b) / (4 * a);
      const frac = Math.abs(maxVal * 10) % 1;
      if (Math.abs(frac - 0.5) > 1e-9 && Math.abs(frac - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const maxFrac = u.simplifyFrac(4 * a * c + b * b, 4 * a);
      const xMaxFrac = u.simplifyFrac(b, 2 * a);
      const sign = maxFrac.num < 0 ? -1 : 1;
      const rounded10 = sign * Math.floor((20 * Math.abs(maxFrac.num) + maxFrac.den) / (2 * maxFrac.den));
      const rounded = rounded10 / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const quadStr = u.formatQuadratic(-a, b, c, 'x');
      const shiftStr = xMaxFrac.num >= 0 ? 'x - ' + xMaxFrac.latex : 'x + ' + u.simplifyFrac(Math.abs(xMaxFrac.num), xMaxFrac.den).latex;
      const tailStr = maxFrac.num === 0 ? '' : maxFrac.num > 0 ? ' + ' + maxFrac.latex : ' - ' + u.simplifyFrac(Math.abs(maxFrac.num), maxFrac.den).latex;
      return {
        stem:
          'Cho tập hợp $J = \\left\\{y \\in \\mathbb{R} \\mid y = ' + quadStr + ',\\; x \\in \\mathbb{R}\\right\\}$. Tìm phần tử có giá trị lớn nhất của tập hợp $J$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta biến đổi $y = -' + a + '\\left(' + shiftStr + '\\right)^2' + tailStr + ' \\le ' + maxFrac.latex + '$ với mọi $x \\in \\mathbb{R}$.',
          'Dấu "$=$" xảy ra khi $x = ' + xMaxFrac.latex + '$.',
          'Vậy phần tử lớn nhất của tập hợp $J$ là $' + maxFrac.latex + (maxFrac.isInteger ? '' : ' \\approx ' + shortAnswer) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 5, c: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45: -6x² + 5x + 1 => 49/24 ≈ 2', params: { a: 6, b: 5, c: 1 }, expectedValid: true },
    ],
  },

  // Dạng 46 (Q46 - SA): Tổng các nghiệm tự nhiên của phương trình tích (ax² + akx)(x⁴ - px² + q) = 0
  t10_b2_d46_sum_poly_nat_roots_sa: {
    id: 't10_b2_d46_sum_poly_nat_roots_sa',
    name: 'Tính tổng các phần tử tập nghiệm tự nhiên của phương trình tích bậc hai và trùng phương',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giải phương trình xác định tập hợp',
    description: 'Giải (ax² + akx)(x⁴ - (r₁² + r₂²)x² + r₁²r₂²) = 0, lọc nghiệm thuộc N và tính tổng.',
    conditionSummary: 'a in [2; 6], k in [1; 5], 1 <= r1 < r2 <= 6',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 6 },
      { name: 'k', label: 'Nghiệm âm -k (k >= 1)', min: 1, max: 5 },
      { name: 'r1', label: 'Nghiệm dương nhỏ r1', min: 1, max: 4 },
      { name: 'r2', label: 'Nghiệm dương lớn r2 (> r1)', min: 2, max: 7 },
    ],
    validateCode: `
      const { a, k, r1, r2 } = params;
      if (!Number.isInteger(a) || a < 1 || a > 8) return { valid: false, reason: 'a phải thuộc [1; 8]' };
      if (!Number.isInteger(k) || k < 1 || k > 8) return { valid: false, reason: 'k phải thuộc [1; 8]' };
      if (!Number.isInteger(r1) || !Number.isInteger(r2) || r1 < 1 || r2 <= r1 || r2 > 8) {
        return { valid: false, reason: 'Cần 1 <= r1 < r2 <= 8' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k, r1, r2 } = params;
      const f1 = u.formatQuadratic(a, a * k, 0, 'x');
      const sSq = r1 * r1 + r2 * r2;
      const pSq = r1 * r1 * r2 * r2;
      const f2 = 'x^4 - ' + sSq + 'x^2 + ' + pSq;
      const sum = r1 + r2;
      const shortAnswer = String(sum);
      return {
        stem:
          'Tính tổng các phần tử của tập hợp $M = \\left\\{x \\in \\mathbb{N} \\mid (' + f1 + ')(' + f2 + ') = 0\\right\\}$.',
        shortAnswer,
        numericValue: sum,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Giải $(' + f1 + ') = 0 \\Leftrightarrow x(' + u.formatLinear(a, a * k, 'x') + ') = 0 \\Leftrightarrow x = 0$ hoặc $x = -' + k + '$.',
          'Giải $' + f2 + ' = 0 \\Leftrightarrow (x^2 - ' + (r1 * r1) + ')(x^2 - ' + (r2 * r2) + ') = 0 \\Leftrightarrow x = \\pm ' + r1 + '$ hoặc $x = \\pm ' + r2 + '$.',
          'Vì $x \\in \\mathbb{N}$ nên $M = \\{0;\\, ' + r1 + ';\\, ' + r2 + '\\}$. Tổng các phần tử là $0 + ' + r1 + ' + ' + r2 + ' = ' + sum + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r1 = r2', params: { a: 4, k: 1, r1: 3, r2: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46: (4x²+4x)(x⁴-20x²+64)=0 => tổng 6', params: { a: 4, k: 1, r1: 2, r2: 4 }, expectedValid: true },
    ],
  },

  // Dạng 47 (Q47 - SA): Bài toán Ven 2 tập — tìm số HS thích cả hai môn
  t10_b2_d47_venn_2sets_both_sa: {
    id: 't10_b2_d47_venn_2sets_both_sa',
    name: 'Bài toán thực tế 2 tập hợp: Tính số học sinh thích cả hai môn',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng công thức tập hợp (2 tập)',
    description: 'Biết sĩ số lớp N (mọi học sinh thích ít nhất 1 trong 2 môn), số bạn thích môn 1 và môn 2. Tìm số bạn thích cả hai môn.',
    conditionSummary: 'only1 >= 4, only2 >= 4, both >= 2',
    paramSpecs: [
      { name: 'only1', label: 'Chỉ thích môn 1', min: 6, max: 22 },
      { name: 'only2', label: 'Chỉ thích môn 2', min: 6, max: 22 },
      { name: 'both', label: 'Thích cả hai môn', min: 3, max: 14 },
      { name: 'ctxIdx', label: 'Ngữ cảnh lớp/môn (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { only1, only2, both, ctxIdx } = params;
      if (![only1, only2, both].every((v) => Number.isInteger(v) && v >= 2 && v <= 40)) {
        return { valid: false, reason: 'Số học sinh từng nhóm phải nguyên trong [2; 40]' };
      }
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) return { valid: false, reason: 'ctxIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { only1, only2, both, ctxIdx } = params;
      const ctxs = [
        { cls: '10A6', s1: 'môn Toán', s2: 'môn Tiếng Anh' },
        { cls: '10A1', s1: 'môn Vật Lí', s2: 'môn Tin học' },
        { cls: '10B2', s1: 'môn Ngữ Văn', s2: 'môn Lịch Sử' },
      ];
      const ctx = ctxs[ctxIdx];
      const n1 = only1 + both;
      const n2 = only2 + both;
      const N = only1 + only2 + both;
      const shortAnswer = String(both);
      return {
        stem:
          'Lớp ' + ctx.cls + ' có tổng cộng $' + N + '$ học sinh, các học sinh này đều thích ' + ctx.s1 + ' hoặc thích ' + ctx.s2 + '. Có $' + n1 + '$ học sinh thích ' + ctx.s1 + ' và $' + n2 + '$ học sinh thích ' + ctx.s2 + '. Hỏi lớp ' + ctx.cls + ' có bao nhiêu học sinh thích cả ' + ctx.s1 + ' và ' + ctx.s2 + '?',
        shortAnswer,
        numericValue: both,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Số học sinh chỉ thích ' + ctx.s1 + ' và không thích ' + ctx.s2 + ' là: $' + N + ' - ' + n2 + ' = ' + only1 + '$.',
          'Số học sinh thích cả ' + ctx.s1 + ' và ' + ctx.s2 + ' là: $' + n1 + ' - ' + only1 + ' = ' + both + '$ (hoặc $' + n1 + ' + ' + n2 + ' - ' + N + ' = ' + both + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên both = 0', params: { only1: 12, only2: 16, both: 0, ctxIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47: N=33, Toán=17, Anh=21 => 5', params: { only1: 12, only2: 16, both: 5, ctxIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 48 (Q48 - SA): Bài toán Ven 2 tập — tìm sĩ số lớp (mọi HS đều tham gia >= 1 hoạt động)
  t10_b2_d48_venn_2sets_total_sa: {
    id: 't10_b2_d48_venn_2sets_total_sa',
    name: 'Bài toán thực tế 2 tập hợp: Tính sĩ số lớp (mọi học sinh đều thích ít nhất 1 sở thích)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng công thức tập hợp (2 tập)',
    description: 'Biết mọi học sinh đều thích A hoặc B, cho n(A), n(B) và n(A ∩ B). Tính tổng số học sinh của lớp.',
    conditionSummary: 'only1 >= 4, only2 >= 4, both >= 2',
    paramSpecs: [
      { name: 'only1', label: 'Chỉ thích hoạt động 1', min: 6, max: 22 },
      { name: 'only2', label: 'Chỉ thích hoạt động 2', min: 6, max: 22 },
      { name: 'both', label: 'Thích cả hai hoạt động', min: 3, max: 14 },
      { name: 'ctxIdx', label: 'Ngữ cảnh lớp/sở thích (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { only1, only2, both, ctxIdx } = params;
      if (![only1, only2, both].every((v) => Number.isInteger(v) && v >= 2 && v <= 40)) {
        return { valid: false, reason: 'Số học sinh từng nhóm phải nguyên trong [2; 40]' };
      }
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) return { valid: false, reason: 'ctxIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { only1, only2, both, ctxIdx } = params;
      const ctxs = [
        { cls: '12B3', a1: 'nghe nhạc', a2: 'xem phim' },
        { cls: '10A5', a1: 'đọc sách', a2: 'chơi cờ vua' },
        { cls: '11C1', a1: 'vẽ tranh', a2: 'chụp ảnh' },
      ];
      const ctx = ctxs[ctxIdx];
      const n1 = only1 + both;
      const n2 = only2 + both;
      const total = only1 + only2 + both;
      const shortAnswer = String(total);
      return {
        stem:
          'Mỗi học sinh của lớp ' + ctx.cls + ' đều thích ' + ctx.a1 + ' hoặc thích ' + ctx.a2 + '. Biết rằng lớp có $' + n1 + '$ bạn thích ' + ctx.a1 + ', có $' + n2 + '$ bạn thích ' + ctx.a2 + ' và có $' + both + '$ bạn thích cả ' + ctx.a1 + ' và ' + ctx.a2 + '. Hỏi lớp ' + ctx.cls + ' có tổng cộng bao nhiêu học sinh?',
        shortAnswer,
        numericValue: total,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A, B$ lần lượt là tập hợp các bạn thích ' + ctx.a1 + ' và ' + ctx.a2 + '. Ta có $n(A) = ' + n1 + ',\\; n(B) = ' + n2 + ',\\; n(A \\cap B) = ' + both + '$.',
          'Tổng số học sinh của lớp là $n(A \\cup B) = ' + n1 + ' + ' + n2 + ' - ' + both + ' = ' + total + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên only1 = 0', params: { only1: 0, only2: 16, both: 5, ctxIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48: 14 nghe nhạc, 21 xem phim, 5 cả hai => 30', params: { only1: 9, only2: 16, both: 5, ctxIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 49 (Q49 - SA): Bài toán Ven 2 tập có phần tử ngoài — tìm tổng sĩ số lớp
  t10_b2_d49_venn_2sets_with_none_sa: {
    id: 't10_b2_d49_venn_2sets_with_none_sa',
    name: 'Bài toán thực tế 2 tập hợp: Tính sĩ số lớp (có học sinh không thích môn nào)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng công thức tập hợp (2 tập)',
    description: 'Biết số HS thích môn 1, môn 2, thích cả hai môn và số HS không thích môn nào. Tính sĩ số lớp.',
    conditionSummary: 'only1 >= 4, only2 >= 4, both >= 2, none >= 2',
    paramSpecs: [
      { name: 'only1', label: 'Chỉ thích môn 1', min: 6, max: 20 },
      { name: 'only2', label: 'Chỉ thích môn 2', min: 6, max: 20 },
      { name: 'both', label: 'Thích cả hai môn', min: 3, max: 14 },
      { name: 'none', label: 'Không thích môn nào', min: 3, max: 12 },
      { name: 'ctxIdx', label: 'Ngữ cảnh lớp/môn (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { only1, only2, both, none, ctxIdx } = params;
      if (![only1, only2, both, none].every((v) => Number.isInteger(v) && v >= 2 && v <= 40)) {
        return { valid: false, reason: 'Số học sinh từng nhóm phải nguyên trong [2; 40]' };
      }
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) return { valid: false, reason: 'ctxIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { only1, only2, both, none, ctxIdx } = params;
      const ctxs = [
        { cls: '11A9', s1: 'môn Vật Lí', s2: 'môn Hóa Học' },
        { cls: '10A4', s1: 'môn Toán', s2: 'môn Sinh Học' },
        { cls: '10C2', s1: 'môn Địa Lí', s2: 'môn Tiếng Anh' },
      ];
      const ctx = ctxs[ctxIdx];
      const n1 = only1 + both;
      const n2 = only2 + both;
      const nUnion = only1 + only2 + both;
      const total = nUnion + none;
      const shortAnswer = String(total);
      return {
        stem:
          'Biết rằng lớp ' + ctx.cls + ' có $' + n1 + '$ bạn thích ' + ctx.s1 + ' và $' + n2 + '$ bạn thích ' + ctx.s2 + '. Trong số các bạn thích ' + ctx.s1 + ' hoặc thích ' + ctx.s2 + ' có $' + both + '$ bạn thích cả hai môn. Lớp vẫn còn $' + none + '$ bạn không thích ' + ctx.s1 + ' và không thích ' + ctx.s2 + '. Hỏi lớp ' + ctx.cls + ' có tổng cộng bao nhiêu học sinh?',
        shortAnswer,
        numericValue: total,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A, B$ lần lượt là tập hợp các bạn thích ' + ctx.s1 + ' và ' + ctx.s2 + '. Ta có $n(A \\cup B) = ' + n1 + ' + ' + n2 + ' - ' + both + ' = ' + nUnion + '$.',
          'Tổng số học sinh của lớp ' + ctx.cls + ' là $' + nUnion + ' + ' + none + ' = ' + total + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên none = 0', params: { only1: 11, only2: 10, both: 8, none: 0, ctxIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49: 19 Lí, 18 Hóa, 8 cả hai, 6 không => 35', params: { only1: 11, only2: 10, both: 8, none: 6, ctxIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 50 (Q50 - SA): Bài toán Ven 3 tập — tính số HS thích ít nhất 1 môn n(A ∪ B ∪ C)
  t10_b2_d50_venn_3sets_union_sa: {
    id: 't10_b2_d50_venn_3sets_union_sa',
    name: 'Bài toán thực tế 3 tập hợp: Tính số học sinh thích ít nhất một môn học',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Nguyên lí bù trừ 3 tập hợp',
    description: 'Cho n(A), n(B), n(C), các giao đôi n(A∩B), n(B∩C), n(A∩C) và giao ba n(A∩B∩C). Tính n(A ∪ B ∪ C).',
    conditionSummary: '7 miền biểu đồ Ven đều nguyên dương >= 2',
    paramSpecs: [
      { name: 'onlyA', label: 'Chỉ thích môn 1', min: 5, max: 14 },
      { name: 'onlyB', label: 'Chỉ thích môn 2', min: 5, max: 14 },
      { name: 'onlyC', label: 'Chỉ thích môn 3', min: 5, max: 14 },
      { name: 'onlyAB', label: 'Chỉ thích môn 1 và 2', min: 2, max: 7 },
      { name: 'onlyBC', label: 'Chỉ thích môn 2 và 3', min: 2, max: 7 },
      { name: 'onlyCA', label: 'Chỉ thích môn 1 và 3', min: 2, max: 7 },
      { name: 'all3', label: 'Thích cả 3 môn', min: 2, max: 6 },
      { name: 'ctxIdx', label: 'Ngữ cảnh lớp/môn (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3, ctxIdx } = params;
      if (![onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3].every((v) => Number.isInteger(v) && v >= 1 && v <= 25)) {
        return { valid: false, reason: 'Các miền Ven phải nguyên dương trong [1; 25]' };
      }
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) return { valid: false, reason: 'ctxIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3, ctxIdx } = params;
      const ctxs = [
        { cls: '12A5', m1: 'Vật Lí', m2: 'Lịch Sử', m3: 'Hóa Học' },
        { cls: '10A3', m1: 'Toán', m2: 'Vật Lí', m3: 'Tiếng Anh' },
        { cls: '11B1', m1: 'Sinh Học', m2: 'Hóa Học', m3: 'Tin học' },
      ];
      const ctx = ctxs[ctxIdx];
      const nA = onlyA + onlyAB + onlyCA + all3;
      const nB = onlyB + onlyAB + onlyBC + all3;
      const nC = onlyC + onlyBC + onlyCA + all3;
      const nAB = onlyAB + all3;
      const nBC = onlyBC + all3;
      const nCA = onlyCA + all3;
      const union3 = onlyA + onlyB + onlyC + onlyAB + onlyBC + onlyCA + all3;
      const shortAnswer = String(union3);
      return {
        stem:
          'Lớp ' + ctx.cls + ' có $' + nA + '$ bạn thích môn ' + ctx.m1 + ', $' + nB + '$ bạn thích môn ' + ctx.m2 + ', $' + nC + '$ bạn thích môn ' + ctx.m3 + ', $' + nAB + '$ bạn thích môn ' + ctx.m1 + ' và môn ' + ctx.m2 + ', $' + nBC + '$ bạn thích môn ' + ctx.m2 + ' và môn ' + ctx.m3 + ', $' + nCA + '$ bạn thích môn ' + ctx.m1 + ' và môn ' + ctx.m3 + ' và $' + all3 + '$ bạn thích cả ba môn. Hỏi lớp ' + ctx.cls + ' có tất cả bao nhiêu học sinh thích ít nhất một môn học?',
        shortAnswer,
        numericValue: union3,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A, B, C$ lần lượt là tập hợp các bạn thích môn ' + ctx.m1 + ', ' + ctx.m2 + ', ' + ctx.m3 + '.',
          'Áp dụng công thức $n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(B \\cap C) - n(A \\cap C) + n(A \\cap B \\cap C)$.',
          'Thay số: $n(A \\cup B \\cup C) = ' + nA + ' + ' + nB + ' + ' + nC + ' - ' + nAB + ' - ' + nBC + ' - ' + nCA + ' + ' + all3 + ' = ' + union3 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên all3 = 0', params: { onlyA: 9, onlyB: 9, onlyC: 6, onlyAB: 2, onlyBC: 2, onlyCA: 4, all3: 0, ctxIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50: 18,16,15; 5,5,7; 3 => 35', params: { onlyA: 9, onlyB: 9, onlyC: 6, onlyAB: 2, onlyBC: 2, onlyCA: 4, all3: 3, ctxIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 51 (Q51 - SA): Bài toán Ven 3 tập — tính số HS chỉ thích đúng một môn học
  t10_b2_d51_venn_3sets_only1_sa: {
    id: 't10_b2_d51_venn_3sets_only1_sa',
    name: 'Bài toán thực tế 3 tập hợp: Tính số học sinh chỉ thích đúng một môn học',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Nguyên lí bù trừ 3 tập hợp',
    description: 'Cho số học sinh thích từng môn, từng cặp môn và cả ba môn. Tính tổng số học sinh chỉ thích đúng một trong ba môn.',
    conditionSummary: '7 miền biểu đồ Ven đều nguyên dương >= 1',
    paramSpecs: [
      { name: 'onlyA', label: 'Chỉ thích môn 1', min: 5, max: 15 },
      { name: 'onlyB', label: 'Chỉ thích môn 2', min: 5, max: 15 },
      { name: 'onlyC', label: 'Chỉ thích môn 3', min: 5, max: 15 },
      { name: 'onlyAB', label: 'Chỉ thích môn 1 và 2', min: 1, max: 6 },
      { name: 'onlyBC', label: 'Chỉ thích môn 2 và 3', min: 1, max: 6 },
      { name: 'onlyCA', label: 'Chỉ thích môn 1 và 3', min: 2, max: 7 },
      { name: 'all3', label: 'Thích cả 3 môn', min: 2, max: 6 },
      { name: 'ctxIdx', label: 'Ngữ cảnh lớp/môn (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3, ctxIdx } = params;
      if (![onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3].every((v) => Number.isInteger(v) && v >= 1 && v <= 25)) {
        return { valid: false, reason: 'Các miền Ven phải nguyên dương trong [1; 25]' };
      }
      if (!Number.isInteger(ctxIdx) || ctxIdx < 0 || ctxIdx > 2) return { valid: false, reason: 'ctxIdx phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { onlyA, onlyB, onlyC, onlyAB, onlyBC, onlyCA, all3, ctxIdx } = params;
      const ctxs = [
        { cls: '12B5', m1: 'Tin học', m2: 'Tiếng Anh', m3: 'Ngữ Văn' },
        { cls: '10A2', m1: 'Toán', m2: 'Vật Lí', m3: 'Hóa Học' },
        { cls: '11A7', m1: 'Lịch Sử', m2: 'Địa Lí', m3: 'Tiếng Anh' },
      ];
      const ctx = ctxs[ctxIdx];
      const nA = onlyA + onlyAB + onlyCA + all3;
      const nB = onlyB + onlyAB + onlyBC + all3;
      const nC = onlyC + onlyBC + onlyCA + all3;
      const nAB = onlyAB + all3;
      const nBC = onlyBC + all3;
      const nCA = onlyCA + all3;
      const ans = onlyA + onlyB + onlyC;
      const shortAnswer = String(ans);
      return {
        stem:
          'Lớp ' + ctx.cls + ' có $' + nA + '$ bạn thích môn ' + ctx.m1 + ', $' + nB + '$ bạn thích môn ' + ctx.m2 + ', $' + nC + '$ bạn thích môn ' + ctx.m3 + ', $' + nAB + '$ bạn thích môn ' + ctx.m1 + ' và môn ' + ctx.m2 + ', $' + nBC + '$ bạn thích môn ' + ctx.m2 + ' và môn ' + ctx.m3 + ', $' + nCA + '$ bạn thích môn ' + ctx.m1 + ' và môn ' + ctx.m3 + ' và $' + all3 + '$ bạn thích cả ba môn. Hỏi lớp ' + ctx.cls + ' có tất cả bao nhiêu học sinh chỉ thích đúng một môn học trong các môn kể trên?',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Số học sinh chỉ thích môn ' + ctx.m1 + ' là: $' + nA + ' - ' + nAB + ' - ' + nCA + ' + ' + all3 + ' = ' + onlyA + '$.',
          'Số học sinh chỉ thích môn ' + ctx.m2 + ' là: $' + nB + ' - ' + nAB + ' - ' + nBC + ' + ' + all3 + ' = ' + onlyB + '$.',
          'Số học sinh chỉ thích môn ' + ctx.m3 + ' là: $' + nC + ' - ' + nCA + ' - ' + nBC + ' + ' + all3 + ' = ' + onlyC + '$.',
          'Vậy số học sinh chỉ thích đúng một môn học là: $' + onlyA + ' + ' + onlyB + ' + ' + onlyC + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên onlyA = 0', params: { onlyA: 0, onlyB: 10, onlyC: 9, onlyAB: 1, onlyBC: 1, onlyCA: 4, all3: 4, ctxIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q51: 19,16,18; 5,5,8; 4 => 29', params: { onlyA: 10, onlyB: 10, onlyC: 9, onlyAB: 1, onlyBC: 1, onlyCA: 4, all3: 4, ctxIdx: 0 }, expectedValid: true },
    ],
  },
};
