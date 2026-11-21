import { MathTemplate } from '../types/math';

export const G10_B1_SA_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 15 (Q15 - SA): Đếm số tự nhiên x < M để mệnh đề chứa biến (hệ số x âm) chia hết cho p đúng
  t10_b1_d15_divisible_neg_count_sa: {
    id: 't10_b1_d15_divisible_neg_count_sa',
    name: 'Đếm số tự nhiên x < M để mệnh đề chứa biến bậc hai chia hết cho p đúng (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Mệnh đề chứa biến',
    description:
      'Cho mệnh đề chứa biến P(x): "(ax² - bx + c) chia hết cho p" với p nguyên tố, a và c chia hết cho p, b không chia hết cho p. Tính số số tự nhiên x < M để P(x) đúng.',
    conditionSummary: 'p ∈ {3,5,7,11}, 1 <= remPos < p, kA >= 1, kB >= 1, kC >= 10, M in [100; 5000]',
    paramSpecs: [
      { name: 'pIdx', label: 'Số nguyên tố p (0:3, 1:5, 2:7, 3:11)', min: 0, max: 3 },
      { name: 'kA', label: 'Hệ số kA (a = kA·p)', min: 1, max: 4 },
      { name: 'kB', label: 'Thương kB cho hệ số âm b', min: 2, max: 12 },
      { name: 'remPos', label: 'Số dư dương của b theo mod p (1..p-1)', min: 1, max: 10 },
      { name: 'kC', label: 'Thương kC (c = kC·p)', min: 100, max: 1200 },
      { name: 'M', label: 'Cận trên M (x < M)', min: 250, max: 3000 },
    ],
    validateCode: `
      const { pIdx, kA, kB, remPos, kC, M } = params;
      if (!Number.isInteger(pIdx) || pIdx < 0 || pIdx > 3) return { valid: false, reason: 'pIdx phải thuộc 0..3' };
      const primes = [3, 5, 7, 11];
      const p = primes[pIdx];
      if (!Number.isInteger(kA) || kA < 1 || kA > 10) return { valid: false, reason: 'kA phải thuộc [1; 10]' };
      if (!Number.isInteger(kB) || kB < 1 || kB > 25) return { valid: false, reason: 'kB phải thuộc [1; 25]' };
      if (!Number.isInteger(remPos) || remPos < 1 || remPos >= p) return { valid: false, reason: 'remPos phải thỏa 1 <= remPos < p' };
      if (!Number.isInteger(kC) || kC < 10 || kC > 2000) return { valid: false, reason: 'kC phải thuộc [10; 2000]' };
      if (!Number.isInteger(M) || M < 100 || M > 6000) return { valid: false, reason: 'Cận trên M phải thuộc [100; 6000]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pIdx, kA, kB, remPos, kC, M } = params;
      const primes = [3, 5, 7, 11];
      const p = primes[pIdx];
      const a = kA * p;
      const b = -(kB * p + (p - remPos)); // b < 0 and b ≡ remPos (mod p)
      const c = kC * p;
      const expr = u.formatQuadratic(a, b, c, 'x');
      const ans = Math.floor((M - 1) / p) + 1;
      const lastX = (ans - 1) * p;
      const shortAnswer = String(ans);
      return {
        stem:
          'Cho mệnh đề chứa biến $P(x)$: "$(' +
          expr +
          ')$ chia hết cho $' +
          p +
          '$". Hỏi có bao nhiêu số tự nhiên $x$ nhỏ hơn $' +
          M +
          '$ để mệnh đề chứa biến thành mệnh đề đúng?',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $' + expr + ' \\,\\vdots\\, ' + p + '$. Viết $' + b + 'x = -' + ((kB + 1) * p) + 'x + ' + remPos + 'x$.',
          'Vì các hạng tử $' + a + 'x^2$, $-' + ((kB + 1) * p) + 'x$ và $' + c + '$ đều chia hết cho $' + p + '$ nên điều kiện tương đương với $' + remPos + 'x \\,\\vdots\\, ' + p + '$.',
          'Do $' + p + '$ là số nguyên tố và $' + remPos + '$ không chia hết cho $' + p + '$, suy ra $x \\,\\vdots\\, ' + p + '$.',
          'Với $x \\in \\mathbb{N}$ và $x < ' + M + '$, ta có $x \\in \\{0;\\, ' + p + ';\\, ' + (2 * p) + ';\\, \\ldots;\\, ' + lastX + '\\}$.',
          'Số giá trị của $x$ là $\\left\\lfloor \\frac{' + (M - 1) + '}{' + p + '} \\right\\rfloor + 1 = ' + ans + '$. Vậy có $' + ans + '$ số tự nhiên $x$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên remPos = 0 (b chia hết cho p)',
        params: { pIdx: 1, kA: 1, kB: 3, remPos: 0, kC: 663, M: 2003 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q15: 5x² - 16x + 3315 ⋮ 5, x < 2003 -> 401',
        params: { pIdx: 1, kA: 1, kB: 3, remPos: 4, kC: 663, M: 2003 },
        expectedValid: true,
      },
    ],
  },
};
