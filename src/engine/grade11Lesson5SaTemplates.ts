import { MathTemplate } from '../types/math';

export const G11_B5_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D15 (Q15): Dãy Fibonacci tổng quát u_{n+1} = u_n + u_{n-1}
  t11_b5_d15_fibonacci_recurrence_sa: {
    id: 't11_b5_d15_fibonacci_recurrence_sa',
    name: 'Tính số hạng u_k của dãy truy hồi dạng Fibonacci u_{n+1} = u_n + u_{n-1} (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Cho u_1, u_2 và công thức u_{n+1} = u_n + u_{n-1} (n ≥ 2). Tính u_k.',
    conditionSummary: 'u1, u2 ∈ [-8; 8], |u1| + |u2| > 0, k ∈ [4; 8]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng u1', min: -8, max: 8 },
      { name: 'u2', label: 'Số hạng u2', min: -8, max: 8 },
      { name: 'k', label: 'Chỉ số cần tìm k', min: 4, max: 8 },
    ],
    validateCode: `
      const { u1, u2, k } = params;
      if (u1 < -8 || u1 > 8 || u2 < -8 || u2 > 8 || k < 4 || k > 8) return { valid: false, reason: 'Tham số ngoài miền' };
      if (u1 === 0 && u2 === 0) return { valid: false, reason: 'Tránh dãy 0 tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, k } = params;
      const seq = [u1, u2];
      for (let i = 2; i < k; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
      }
      const ans = seq[k - 1];
      const steps = [];
      for (let i = 2; i < k; i++) {
        steps.push('$u_{' + (i + 1) + '} = ' + seq[i - 1] + ' + (' + seq[i - 2] + ') = ' + seq[i] + '$.');
      }
      return {
        stem: 'Cho dãy số $(u_n)$ xác định bởi $u_1 = ' + u1 + ',\\; u_2 = ' + u2 + ',\\; u_{n+1} = u_n + u_{n-1}$ với $n \\ge 2$. Tìm $u_{' + k + '}$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: steps,
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = u2 = 0', params: { u1: 0, u2: 0, k: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (u1=-2, u2=3 -> u_5 = 5)', params: { u1: -2, u2: 3, k: 5 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Dãy truy hồi bậc hai u_n = p·u_{n-1} + q·u_{n-2} + r
  t11_b5_d16_order2_linear_recurrence_sa: {
    id: 't11_b5_d16_order2_linear_recurrence_sa',
    name: 'Tính số hạng u_k của dãy truy hồi bậc hai u_n = p·u_{n-1} + q·u_{n-2} + r (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Cho u_1, u_2 và công thức truy hồi u_n = p·u_{n-1} + q·u_{n-2} + r. Tính u_4 hoặc u_5.',
    conditionSummary: 'u1, u2 ∈ [-5; 8], p ∈ [2; 6], q ∈ [-5; 6] \\ {0}, r ∈ [-9; 9], k ∈ {4, 5}',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng u1', min: -5, max: 8 },
      { name: 'u2', label: 'Số hạng u2', min: -5, max: 8 },
      { name: 'p', label: 'Hệ số p', min: 2, max: 6 },
      { name: 'q', label: 'Hệ số q', min: -5, max: 6, allowZero: false },
      { name: 'r', label: 'Hằng số r', min: -9, max: 9 },
      { name: 'k', label: 'Chỉ số cần tìm k (4 hoặc 5)', min: 4, max: 5 },
    ],
    validateCode: `
      const { u1, u2, p, q, r, k } = params;
      if (u1 < -5 || u1 > 8 || u2 < -5 || u2 > 8 || p < 2 || p > 6 || q === 0 || q < -5 || q > 6 || r < -9 || r > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (k !== 4 && k !== 5) return { valid: false, reason: 'k chỉ nhận 4 hoặc 5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, p, q, r, k } = params;
      const seq = [u1, u2];
      const steps = [];
      for (let i = 2; i < k; i++) {
        const val = p * seq[i - 1] + q * seq[i - 2] + r;
        seq.push(val);
        steps.push('$u_{' + (i + 1) + '} = ' + p + ' \\cdot (' + seq[i - 1] + ')' + (q >= 0 ? ' + ' + q : ' - ' + Math.abs(q)) + ' \\cdot (' + seq[i - 2] + ')' + u.formatTrailingConst(r) + ' = ' + val + '$.');
      }
      const ans = seq[k - 1];
      const recRhs = u.formatTerm(p, 'u_{n-1}', true) + u.formatTerm(q, 'u_{n-2}', false) + u.formatTrailingConst(r);
      return {
        stem: 'Cho dãy số $(u_n)$ xác định bởi $u_1 = ' + u1 + ',\\; u_2 = ' + u2 + '$ và $u_n = ' + recRhs + '$, với mọi $n \\ge 3$. Tìm $u_{' + k + '}$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: steps,
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 0', params: { u1: 3, u2: 5, p: 4, q: 0, r: -7, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (u1=3, u2=5, 4u_{n-1}+5u_{n-2}-7 -> u_4=130)', params: { u1: 3, u2: 5, p: 4, q: 5, r: -7, k: 4 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Tìm k biết u_k trong dãy sai phân u_n = u_{n-1} + d·n
  t11_b5_d17_telescoping_find_k_sa: {
    id: 't11_b5_d17_telescoping_find_k_sa',
    name: 'Tìm chỉ số k từ dãy sai phân u_n = u_{n-1} + d·n (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Cho u_1 = p/q và u_n = u_{n-1} + d·n (∀ n ≥ 2). Biết u_k bằng một giá trị cho trước, tìm k.',
    conditionSummary: 'p ∈ [1; 7], q ∈ {2, 3, 4}, gcd(p, q) = 1, d ∈ [1; 4], k ∈ [12; 60]',
    paramSpecs: [
      { name: 'p', label: 'Tử số u1', min: 1, max: 7 },
      { name: 'q', label: 'Mẫu số u1', min: 2, max: 4 },
      { name: 'd', label: 'Hệ số d (d·n)', min: 1, max: 4 },
      { name: 'k', label: 'Chỉ số đáp án k', min: 12, max: 60 },
    ],
    validateCode: `
      const { p, q, d, k } = params;
      if (p < 1 || p > 7 || q < 2 || q > 4 || d < 1 || d > 4 || k < 12 || k > 60) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q phải tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, d, k } = params;
      const u1Frac = u.simplifyFrac(p, q);
      // u_n = p/q + d*(n(n+1)/2 - 1) = (d*n^2 + d*n)/2 + (p/q - d)
      const cFrac = u.simplifyFrac(p - d * q, q);
      const ukFrac = u.simplifyFrac(2 * p + d * q * (k * (k + 1) - 2), 2 * q);
      const dTerm = d === 1 ? 'n' : d + 'n';
      const cLead = u.simplifyFrac(d, 2);
      const quadLead = cLead.num === 1 && cLead.den === 1 ? 'n^2 + n' : cLead.latex + '(n^2 + n)';
      const constTail = cFrac.num === 0 ? '' : cFrac.num > 0 ? ' + ' + cFrac.latex : ' - ' + u.simplifyFrac(-cFrac.num, cFrac.den).latex;

      return {
        stem:
          'Cho dãy số $(u_n)$ xác định bởi $u_1 = ' +
          u1Frac.latex +
          ',\\; u_n = u_{n-1} + ' +
          dTerm +
          ',\\; \\forall n \\ge 2$. Biết số hạng thứ $k$ của dãy là $u_k = ' +
          ukFrac.latex +
          '$. Tìm $k$.',
        shortAnswer: String(k),
        numericValue: k,
        answerSummary: String(k),
        solutionSteps: [
          'Cộng dồn sai phân: $u_n = u_1 + \\sum\\limits_{i=2}^{n} ' + (d === 1 ? 'i' : d + 'i') + ' = ' + u1Frac.latex + ' + ' + (d === 1 ? '' : d) + '\\left(\\frac{n(n+1)}{2} - 1\\right) = ' + quadLead + constTail + '$.',
          'Giải phương trình $u_k = ' + ukFrac.latex + '$ (với $k \\in \\mathbb{N}^*$) thu được $k = ' + k + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p/q chưa tối giản', params: { p: 2, q: 4, d: 2, k: 43 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (u1=1/2, d=2, u_k=3781/2 -> k=43)', params: { p: 1, q: 2, d: 2, k: 43 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Đếm số giá trị n để u_n <= M với u_{n+1} = u_n + d·n
  t11_b5_d18_telescoping_count_le_sa: {
    id: 't11_b5_d18_telescoping_count_le_sa',
    name: 'Đếm số giá trị n thỏa u_n ≤ M trong dãy u_{n+1} = u_n + d·n (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Cho u_1 = c và u_{n+1} = u_n + d·n. Tìm số giá trị nguyên dương n để u_n ≤ M.',
    conditionSummary: 'c ∈ [1; 10], d ∈ [1; 4], n0 ∈ [20; 300], 0 ≤ offset < d·n0',
    paramSpecs: [
      { name: 'c', label: 'Số hạng đầu u1', min: 1, max: 10 },
      { name: 'd', label: 'Hệ số d (d·n)', min: 1, max: 4 },
      { name: 'n0', label: 'Số lượng nghiệm n0', min: 20, max: 300 },
      { name: 'offset', label: 'Độ lệch ngưỡng M - u_{n0}', min: 0, max: 25 },
    ],
    validateCode: `
      const { c, d, n0, offset } = params;
      if (c < 1 || c > 10 || d < 1 || d > 4 || n0 < 20 || n0 > 300) return { valid: false, reason: 'Tham số ngoài miền' };
      if (offset < 0 || offset >= d * n0) return { valid: false, reason: 'offset phải nhỏ hơn d·n0 để đáp án đúng bằng n0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, d, n0, offset } = params;
      const calcU = (n) => c + (d * n * (n - 1)) / 2;
      const uN0 = calcU(n0);
      const uNext = calcU(n0 + 1);
      const M = uN0 + offset;
      const prodLimit = Math.floor((2 * (M - c)) / d);
      const dTerm = d === 1 ? 'n' : d + 'n';
      const sumFormula = c + ' + ' + (d === 1 ? '' : d + ' \\cdot ') + '\\frac{n(n-1)}{2}';
      return {
        stem: 'Cho dãy số $(u_n)$ được xác định bởi $u_1 = ' + c + ',\\; u_{n+1} = u_n + ' + dTerm + ',\\; \\forall n \\ge 1$. Tìm số các giá trị của $n$ để $u_n \\le ' + M + '$.',
        shortAnswer: String(n0),
        numericValue: n0,
        answerSummary: String(n0),
        solutionSteps: [
          'Ta có $u_n = u_1 + \\sum\\limits_{i=1}^{n-1} ' + (d === 1 ? 'i' : d + 'i') + ' = ' + sumFormula + '$.',
          'Điều kiện $u_n \\le ' + M + ' \\Leftrightarrow n(n - 1) \\le ' + prodLimit + '$.',
          'Vì $u_{' + n0 + '} = ' + uN0 + ' \\le ' + M + ' < ' + uNext + ' = u_{' + (n0 + 1) + '}$ và $(u_n)$ tăng ngặt nên $1 \\le n \\le ' + n0 + '$. Vậy có tất cả $' + n0 + '$ giá trị của $n$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên offset >= d·n0', params: { c: 1, d: 1, n0: 20, offset: 25 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (u1=1, u_{n+1}=u_n+n, M=37145 -> 273)', params: { c: 1, d: 1, n0: 273, offset: 16 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Tìm q^{k-1} · u_k cho dãy u_{n+1} = (u_n + b)/q
  t11_b5_d19_linear_recurrence_scaled_term_sa: {
    id: 't11_b5_d19_linear_recurrence_scaled_term_sa',
    name: 'Tính q^{k-1}·u_k của dãy truy hồi u_{n+1} = (u_n + b)/q (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Dãy số cho bằng hệ thức truy hồi',
    description: 'Cho u_1 và u_{n+1} = (u_n + b)/q. Đưa về cấp số nhân phụ v_n = u_n - c để tính q^{k-1}·u_k.',
    conditionSummary: 'q ∈ {2, 3}, c ∈ [-3; 6], v1 ∈ [1; 8], k ∈ [5; 8]',
    paramSpecs: [
      { name: 'q', label: 'Mẫu số q (2 hoặc 3)', min: 2, max: 3 },
      { name: 'c', label: 'Điểm bất động c', min: -3, max: 6 },
      { name: 'v1', label: 'Hiệu đầu v1 = u1 - c', min: 1, max: 8 },
      { name: 'k', label: 'Chỉ số cần tính k', min: 5, max: 8 },
    ],
    validateCode: `
      const { q, c, v1, k } = params;
      if ((q !== 2 && q !== 3) || c < -3 || c > 6 || v1 < 1 || v1 > 8 || k < 5 || k > 8) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (q === 3 && k > 7) return { valid: false, reason: 'Tránh hệ số 3^{k-1} quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, c, v1, k } = params;
      const b = (q - 1) * c;
      const u1 = c + v1;
      const powQ = Math.pow(q, k - 1);
      const ans = c * powQ + v1;
      const ukFrac = u.simplifyFrac(ans, powQ);
      const recNum = b === 0 ? 'u_n' : 'u_n' + u.formatTrailingConst(b);
      const vnExpr = c === 0 ? 'u_n' : c > 0 ? 'u_n - ' + c : 'u_n + ' + Math.abs(c);
      return {
        stem:
          'Cho dãy số $(u_n)$ xác định bởi $u_1 = ' +
          u1 +
          ',\\; u_{n+1} = \\frac{' +
          recNum +
          '}{' +
          q +
          '},\\; \\forall n \\ge 1$. Tìm $' +
          powQ +
          'u_{' +
          k +
          '}$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Đặt $v_n = ' + vnExpr + '$, khi đó $v_{n+1} = \\frac{v_n}{' + q + '}$ nên $(v_n)$ là cấp số nhân với $v_1 = ' + v1 + '$ và công bội $\\frac{1}{' + q + '}$.',
          'Suy ra $u_n = ' + c + ' + \\frac{' + v1 + '}{' + q + '^{n-1}}$, nên $u_{' + k + '} = ' + ukFrac.latex + '$.',
          'Vậy $' + powQ + 'u_{' + k + '} = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 3, k = 8', params: { q: 3, c: 1, v1: 4, k: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (u1=5, (u_n+1)/2 -> 128 u_8 = 132)', params: { q: 2, c: 1, v1: 4, k: 8 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Tìm a + b khi biết u_1 và u_m của dãy u_n = (an + b)/(c + n)
  t11_b5_d20_rational_find_ab_sa: {
    id: 't11_b5_d20_rational_find_ab_sa',
    name: 'Tìm tham số a + b của dãy u_n = (an + b)/(c + n) từ hai số hạng cho trước (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Dãy số và cách cho dãy số',
    description: 'Cho dãy số u_n = (an + b)/(c + n) biết giá trị u_1 và u_m. Tính a + b.',
    conditionSummary: 'c ∈ [2; 8], a ∈ [-12; 15] \\ {0}, b ∈ [-12; 15], m ∈ [2; 5], b ≠ ac',
    paramSpecs: [
      { name: 'c', label: 'Hằng số mẫu c', min: 2, max: 8 },
      { name: 'a', label: 'Tham số a', min: -12, max: 15, allowZero: false },
      { name: 'b', label: 'Tham số b', min: -12, max: 15 },
      { name: 'm', label: 'Chỉ số thứ hai m', min: 2, max: 5 },
    ],
    validateCode: `
      const { c, a, b, m } = params;
      if (c < 2 || c > 8 || a === 0 || a < -12 || a > 15 || b < -12 || b > 15 || m < 2 || m > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (b === a * c) return { valid: false, reason: 'Tránh dãy hằng b = ac' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, a, b, m } = params;
      const u1Frac = u.simplifyFrac(a + b, c + 1);
      const umFrac = u.simplifyFrac(m * a + b, c + m);
      const ans = a + b;
      const ordNames = { 2: 'hai', 3: 'ba', 4: 'tư', 5: 'năm' };
      const sum2 = m * a + b;
      return {
        stem:
          'Cho dãy số $(u_n)$ có số hạng tổng quát $u_n = \\frac{an + b}{' +
          c +
          ' + n}$. Biết số hạng thứ nhất và số hạng thứ ' +
          ordNames[m] +
          ' lần lượt bằng $' +
          u1Frac.latex +
          '$ và $' +
          umFrac.latex +
          '$. Tính $a + b$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Từ $u_1 = ' + u1Frac.latex + '$ suy ra $\\frac{a + b}{' + (c + 1) + '} = ' + u1Frac.latex + ' \\Leftrightarrow a + b = ' + (c + 1) + ' \\cdot ' + u1Frac.latex + ' = ' + ans + '$.',
          '(Kiểm tra thêm từ $u_{' + m + '} = ' + umFrac.latex + '$ có $' + m + 'a + b = ' + sum2 + '$, suy ra $a = ' + a + ',\\; b = ' + b + '$). Vậy $a + b = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = ac', params: { c: 5, a: 2, b: 10, m: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (c=5, a=10, b=4, m=3 -> a+b=14)', params: { c: 5, a: 10, b: 4, m: 3 }, expectedValid: true },
    ],
  },
};
