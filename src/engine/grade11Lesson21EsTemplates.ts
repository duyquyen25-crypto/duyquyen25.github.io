import { MathTemplate } from '../types/math';

export const G11_B21_ES_TEMPLATES: Record<string, MathTemplate> = {
  // D60 (Q60): Giải phương trình log_b(p x - q) = k (Tự luận)
  t11_b21_d60_es_log_linear_eq: {
    id: 't11_b21_d60_es_log_linear_eq',
    name: 'Giải phương trình lôgarit cơ bản log_b(px - q) = k (Tự luận)',
    category: 'ES',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải phương trình log_b(px - q) = k, nêu điều kiện xác định và kết luận nghiệm dưới dạng phân số tối giản.',
    conditionSummary: 'b ∈ {2,3,5}, p ∈ [2;7], q ∈ [2;9], k ∈ [2;7]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5)', min: 0, max: 2 },
      { name: 'p', label: 'Hệ số p', min: 2, max: 7 },
      { name: 'q', label: 'Hằng số q', min: 2, max: 9 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 7 },
    ],
    validateCode: `
      const { bIdx, p, q, k } = params;
      if (bIdx < 0 || bIdx > 2 || p < 2 || p > 7 || q < 2 || q > 9 || k < 2 || k > 7) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, p, q, k } = params;
      const b = [2, 3, 5][bIdx];
      const bk = Math.pow(b, k);
      const domFrac = u.simplifyFrac(q, p);
      const solFrac = u.simplifyFrac(bk + q, p);

      return {
        stem: 'Giải phương trình $\\log_{' + b + '}(' + p + 'x - ' + q + ') = ' + k + '$.',
        rubric: [
          { description: 'Đặt điều kiện xác định ' + p + 'x - ' + q + ' > 0', points: 0.3 },
          { description: 'Đưa về ' + p + 'x - ' + q + ' = ' + b + '^' + k + ' = ' + bk, points: 0.4 },
          { description: 'Tìm được nghiệm x = ' + solFrac.latex + ' và đối chiếu điều kiện kết luận', points: 0.3 },
        ],
        answerSummary: '$x = ' + solFrac.latex + '$',
        solutionSteps: [
          'Điều kiện: $' + p + 'x - ' + q + ' > 0 \\Leftrightarrow x > ' + domFrac.latex + '$.',
          'Phương trình $\\Leftrightarrow ' + p + 'x - ' + q + ' = ' + b + '^{' + k + '} = ' + bk + ' \\Leftrightarrow ' + p + 'x = ' + (bk + q) + '$.',
          'Suy ra $x = ' + solFrac.latex + '$ (thỏa mãn điều kiện).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { bIdx: 1, p: 5, q: 6, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q60 (x = 2193/5)', params: { bIdx: 1, p: 5, q: 6, k: 7 }, expectedValid: true },
    ],
  },

  // D61 (Q61): Giải phương trình \sqrt[n]{b^{px}} - b^K = 0 (Tự luận)
  t11_b21_d61_es_exp_radical_eq: {
    id: 't11_b21_d61_es_exp_radical_eq',
    name: 'Giải phương trình mũ chứa căn bậc n (Tự luận)',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Chuyển căn bậc n sang lũy thừa số mũ hữu tỉ để giải phương trình.',
    conditionSummary: 'n ∈ [3;5], b ∈ [2;7], p ∈ [2;7], gcd(n,p)=1, K ∈ [100; 450]',
    paramSpecs: [
      { name: 'n', label: 'Bậc căn n', min: 3, max: 5 },
      { name: 'b', label: 'Cơ số b', min: 2, max: 7 },
      { name: 'p', label: 'Hệ số p của px', min: 2, max: 7 },
      { name: 'K', label: 'Số mũ K', min: 100, max: 450 },
    ],
    validateCode: `
      const { n, b, p, K } = params;
      if (n < 3 || n > 5 || b < 2 || b > 7 || p < 2 || p > 7 || u.gcd(n, p) !== 1 || K < 100 || K > 450) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, b, p, K } = params;
      const solFrac = u.simplifyFrac(n * K, p);

      return {
        stem: 'Giải phương trình $\\sqrt[' + n + ']{' + b + '^{' + p + 'x}} - ' + b + '^{' + K + '} = 0$.',
        rubric: [
          { description: 'Chuyển vế và viết căn dưới dạng lũy thừa ' + b + '^{' + p + 'x/' + n + '} = ' + b + '^{' + K + '}', points: 0.4 },
          { description: 'Cho hai số mũ bằng nhau và giải tìm được x = ' + solFrac.latex, points: 0.4 },
          { description: 'Kết luận tập nghiệm của phương trình', points: 0.2 },
        ],
        answerSummary: '$x = ' + solFrac.latex + '$',
        solutionSteps: [
          'Phương trình $\\Leftrightarrow \\sqrt[' + n + ']{' + b + '^{' + p + 'x}} = ' + b + '^{' + K + '} \\Leftrightarrow ' + b + '^{\\frac{' + p + 'x}{' + n + '}} = ' + b + '^{' + K + '}$.',
          'Suy ra $\\dfrac{' + p + 'x}{' + n + '} = ' + K + ' \\Leftrightarrow x = ' + solFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n=3, p=3 (gcd!=1)', params: { n: 3, b: 6, p: 3, K: 231 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q61 (x = 693/2)', params: { n: 3, b: 6, p: 2, K: 231 }, expectedValid: true },
    ],
  },

  // D62 (Q62): Giải phương trình a1·b^x - b1·(b²)^x = -a2·b^x + b2·(b²)^x (Tự luận)
  t11_b21_d62_es_two_bases_exp_eq: {
    id: 't11_b21_d62_es_two_bases_exp_eq',
    name: 'Giải phương trình mũ đẳng cấp b^x và (b²)^x (Tự luận)',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Thu gọn phương trình về dạng (1/b)^x = C và giải nghiệm lôgarit.',
    conditionSummary: 'b ∈ {2,3,5}, a1,a2,b1,b2 ∈ [6;18]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5)', min: 0, max: 2 },
      { name: 'a1', label: 'Hệ số a1', min: 6, max: 16 },
      { name: 'b1', label: 'Hệ số b1', min: 6, max: 16 },
      { name: 'a2', label: 'Hệ số a2', min: 6, max: 18 },
      { name: 'b2', label: 'Hệ số b2', min: 6, max: 18 },
    ],
    validateCode: `
      const { bIdx, a1, b1, a2, b2 } = params;
      if (bIdx < 0 || bIdx > 2 || a1 < 6 || a1 > 16 || b1 < 6 || b1 > 16 || a2 < 6 || a2 > 18 || b2 < 6 || b2 > 18) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, a1, b1, a2, b2 } = params;
      const b = [2, 3, 5][bIdx];
      const B = b * b;
      const sumA = a1 + a2;
      const sumB = b1 + b2;
      const fracRatio = u.simplifyFrac(sumB, sumA);
      const ansTex = '\\log_{\\frac{1}{' + b + '}}\\left(' + fracRatio.latex + '\\right)';

      return {
        stem: 'Giải phương trình $' + a1 + ' \\cdot ' + b + '^x - ' + b1 + ' \\cdot ' + B + '^x = -' + a2 + ' \\cdot ' + b + '^x + ' + b2 + ' \\cdot ' + B + '^x$.',
        rubric: [
          { description: 'Chuyển vế thu gọn được ' + sumA + '·' + b + '^x = ' + sumB + '·' + B + '^x', points: 0.3 },
          { description: 'Chia hai vế cho ' + sumA + '·' + B + '^x đưa về (1/' + b + ')^x = ' + fracRatio.latex, points: 0.4 },
          { description: 'Giải tìm được x = ' + ansTex + ' và kết luận', points: 0.3 },
        ],
        answerSummary: '$x = ' + ansTex + '$',
        solutionSteps: [
          'Phương trình $\\Leftrightarrow ' + sumA + ' \\cdot ' + b + '^x = ' + sumB + ' \\cdot ' + B + '^x$.',
          'Chia cả hai vế cho $' + sumA + ' \\cdot ' + B + '^x > 0$ ta được $\\left(\\dfrac{1}{' + b + '}\\right)^x = ' + fracRatio.latex + '$.',
          'Vậy $x = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a1 = 4', params: { bIdx: 1, a1: 4, b1: 10, a2: 14, b2: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q62 (log_{1/3}(7/8))', params: { bIdx: 1, a1: 10, b1: 10, a2: 14, b2: 11 }, expectedValid: true },
    ],
  },

  // D63 (Q63): Giải phương trình 2^x + 2^{x-u1} + 2^{x+u2} = k0·4^x + 4^{x-v1} (Tự luận)
  t11_b21_d63_es_shifted_exp_eq_v1: {
    id: 't11_b21_d63_es_shifted_exp_eq_v1',
    name: 'Giải phương trình mũ lệch số mũ dạng 2^x + 2^{x-u₁} + 2^{x+u₂} = k₀·4^x + 4^{x-v₁} (Tự luận)',
    category: 'ES',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đặt nhân tử chung 2^x ở vế trái và 4^x ở vế phải để đưa về (1/2)^x = C.',
    conditionSummary: 'u1 ∈ [1;2], u2 ∈ [1;2], k0 ∈ [1;3], v1 ∈ [1;2]',
    paramSpecs: [
      { name: 'u1', label: 'Độ lệch u1 (ở 2^{x-u1})', min: 1, max: 2 },
      { name: 'u2', label: 'Độ lệch u2 (ở 2^{x+u2})', min: 1, max: 2 },
      { name: 'k0', label: 'Hệ số k0 của 4^x', min: 1, max: 3 },
      { name: 'v1', label: 'Độ lệch v1 (ở 4^{x-v1})', min: 1, max: 2 },
    ],
    validateCode: `
      const { u1, u2, k0, v1 } = params;
      if (u1 < 1 || u1 > 2 || u2 < 1 || u2 > 2 || k0 < 1 || k0 > 3 || v1 < 1 || v1 > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, k0, v1 } = params;
      const lhsDen = Math.pow(2, u1);
      const lhsNum = lhsDen + 1 + lhsDen * Math.pow(2, u2);
      const rhsDen = Math.pow(4, v1);
      const rhsNum = k0 * rhsDen + 1;
      const lhsFrac = u.simplifyFrac(lhsNum, lhsDen);
      const rhsFrac = u.simplifyFrac(rhsNum, rhsDen);
      const solFrac = u.simplifyFrac(lhsNum * rhsDen, lhsDen * rhsNum);
      const ansTex = '\\log_{\\frac{1}{2}}\\left(' + solFrac.latex + '\\right)';

      return {
        stem: 'Giải phương trình $2^x + 2^{x - ' + u1 + '} + 2^{x + ' + u2 + '} = ' + (k0 === 1 ? '' : k0 + ' \\cdot ') + '4^x + 4^{x - ' + v1 + '}$.',
        rubric: [
          { description: 'Phân tích vế trái thành (' + lhsFrac.latex + ')·2^x và vế phải thành (' + rhsFrac.latex + ')·4^x', points: 0.4 },
          { description: 'Biến đổi về (1/2)^x = ' + solFrac.latex, points: 0.3 },
          { description: 'Tìm nghiệm x = ' + ansTex + ' và kết luận', points: 0.3 },
        ],
        answerSummary: '$x = ' + ansTex + '$',
        solutionSteps: [
          'Phương trình $\\Leftrightarrow \\left(1 + \\dfrac{1}{' + lhsDen + '} + ' + Math.pow(2, u2) + '\\right) 2^x = \\left(' + k0 + ' + \\dfrac{1}{' + rhsDen + '}\\right) 4^x$.',
          'Thu gọn được $' + lhsFrac.latex + ' \\cdot 2^x = ' + rhsFrac.latex + ' \\cdot 4^x \\Leftrightarrow \\left(\\dfrac{1}{2}\\right)^x = ' + solFrac.latex + '$.',
          'Vậy nghiệm của phương trình là $x = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k0 = 4', params: { u1: 1, u2: 2, k0: 4, v1: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q63 (2^x+2^{x-1}+2^{x+2}=2·4^x+4^{x-2})', params: { u1: 1, u2: 2, k0: 2, v1: 2 }, expectedValid: true },
    ],
  },

  // D64 (Q64): Giải phương trình 2^x + 2^{x+u1} + 2^{x+u2} = 4^x + 4^{x-v1} + 4^{x+v2} (Tự luận)
  t11_b21_d64_es_shifted_exp_eq_v2: {
    id: 't11_b21_d64_es_shifted_exp_eq_v2',
    name: 'Giải phương trình mũ 3 số hạng hai vế 2^x và 4^x (Tự luận)',
    category: 'ES',
    level: 'Vận dụng',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đặt nhân tử chung 2^x ở vế trái và 4^x ở vế phải để giải phương trình.',
    conditionSummary: 'u1 ∈ [1;2], u2 ∈ [u1+1; 3], v1 ∈ [1;2], v2 ∈ [1;2]',
    paramSpecs: [
      { name: 'u1', label: 'Số mũ cộng u1 (ở 2^{x+u1})', min: 1, max: 2 },
      { name: 'u2', label: 'Số mũ cộng u2 > u1 (ở 2^{x+u2})', min: 2, max: 3 },
      { name: 'v1', label: 'Số mũ trừ v1 (ở 4^{x-v1})', min: 1, max: 2 },
      { name: 'v2', label: 'Số mũ cộng v2 (ở 4^{x+v2})', min: 1, max: 2 },
    ],
    validateCode: `
      const { u1, u2, v1, v2 } = params;
      if (u1 < 1 || u1 > 2 || u2 <= u1 || u2 > 3 || v1 < 1 || v1 > 2 || v2 < 1 || v2 > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, v1, v2 } = params;
      const lhsCoeff = 1 + Math.pow(2, u1) + Math.pow(2, u2);
      const rhsDen = Math.pow(4, v1);
      const rhsNum = rhsDen + 1 + rhsDen * Math.pow(4, v2);
      const rhsFrac = u.simplifyFrac(rhsNum, rhsDen);
      const solFrac = u.simplifyFrac(lhsCoeff * rhsDen, rhsNum);
      const ansTex = '\\log_{\\frac{1}{2}}\\left(' + solFrac.latex + '\\right)';

      return {
        stem: 'Giải phương trình $2^x + 2^{x + ' + u1 + '} + 2^{x + ' + u2 + '} = 4^x + 4^{x - ' + v1 + '} + 4^{x + ' + v2 + '}$.',
        rubric: [
          { description: 'Đưa phương trình về dạng ' + lhsCoeff + '·2^x = (' + rhsFrac.latex + ')·4^x', points: 0.4 },
          { description: 'Rút gọn thành (1/2)^x = ' + solFrac.latex, points: 0.3 },
          { description: 'Kết luận nghiệm x = ' + ansTex, points: 0.3 },
        ],
        answerSummary: '$x = ' + ansTex + '$',
        solutionSteps: [
          'Đặt nhân tử chung: $(1 + ' + Math.pow(2, u1) + ' + ' + Math.pow(2, u2) + ')2^x = \\left(1 + \\dfrac{1}{' + rhsDen + '} + ' + Math.pow(4, v2) + '\\right)4^x$.',
          'Thu gọn được $' + lhsCoeff + ' \\cdot 2^x = ' + rhsFrac.latex + ' \\cdot 4^x \\Leftrightarrow \\left(\\dfrac{1}{2}\\right)^x = ' + solFrac.latex + '$.',
          'Vậy $x = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u2 = u1', params: { u1: 2, u2: 2, v1: 2, v2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q64', params: { u1: 1, u2: 2, v1: 2, v2: 1 }, expectedValid: true },
    ],
  },

  // D65 (Q65): Giải phương trình log_b(p1 x - q1) - log_b(p2 x - q2) = k (Tự luận)
  t11_b21_d65_es_log_diff_eq: {
    id: 't11_b21_d65_es_log_diff_eq',
    name: 'Giải phương trình hiệu hai lôgarit cùng cơ số (Tự luận)',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đặt điều kiện xác định và giải log_b(p1·x - q1) - log_b(p2·x - q2) = k.',
    conditionSummary: 'b ∈ {2,3,5}, p1 ∈ [5;10], q1 ∈ [3;9], p2 ∈ [2;5], q2 ∈ [2;7], nghiệm thỏa điều kiện xác định',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số (0:2, 1:3, 2:5)', min: 0, max: 2 },
      { name: 'p1', label: 'Hệ số p1', min: 5, max: 10 },
      { name: 'q1', label: 'Hằng số q1', min: 3, max: 9 },
      { name: 'p2', label: 'Hệ số p2', min: 2, max: 5 },
      { name: 'q2', label: 'Hằng số q2', min: 2, max: 7 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 3 },
    ],
    validateCode: `
      const { bIdx, p1, q1, p2, q2, k } = params;
      if (bIdx < 0 || bIdx > 2 || p1 < 5 || p1 > 10 || q1 < 3 || q1 > 9 || p2 < 2 || p2 > 5 || q2 < 2 || q2 > 7 || (k !== 2 && k !== 3)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const b = [2, 3, 5][bIdx];
      const bk = Math.pow(b, k);
      const num = bk * q2 - q1;
      const den = bk * p2 - p1;
      if (den <= 0) return { valid: false, reason: 'Cần b^k * p2 > p1' };
      const x = num / den;
      if (p1 * x - q1 <= 0 || p2 * x - q2 <= 0) {
        return { valid: false, reason: 'Nghiệm không thỏa mãn điều kiện xác định' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, p1, q1, p2, q2, k } = params;
      const b = [2, 3, 5][bIdx];
      const bk = Math.pow(b, k);
      const solFrac = u.simplifyFrac(bk * q2 - q1, bk * p2 - p1);
      const d1 = u.simplifyFrac(q1, p1);
      const d2 = u.simplifyFrac(q2, p2);
      const lin1 = u.formatLinear(p1, -q1);
      const lin2 = u.formatLinear(p2, -q2);

      return {
        stem: 'Giải phương trình $\\log_{' + b + '}(' + lin1 + ') - \\log_{' + b + '}(' + lin2 + ') = ' + k + '$.',
        rubric: [
          { description: 'Đặt điều kiện xác định ' + lin1 + ' > 0 và ' + lin2 + ' > 0', points: 0.3 },
          { description: 'Đưa về phương trình thương (' + lin1 + ')/(' + lin2 + ') = ' + b + '^' + k + ' = ' + bk, points: 0.4 },
          { description: 'Giải được x = ' + solFrac.latex + ' và đối chiếu điều kiện kết luận', points: 0.3 },
        ],
        answerSummary: '$x = ' + solFrac.latex + '$',
        solutionSteps: [
          'Điều kiện: $' + lin1 + ' > 0$ và $' + lin2 + ' > 0 \\Leftrightarrow x > ' + d1.latex + '$ và $x > ' + d2.latex + '$.',
          'Phương trình $\\Leftrightarrow \\log_{' + b + '}\\dfrac{' + lin1 + '}{' + lin2 + '} = ' + k + ' \\Leftrightarrow ' + lin1 + ' = ' + bk + '(' + lin2 + ')$.',
          'Giải ra $x = ' + solFrac.latex + '$ (thỏa mãn điều kiện xác định).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { bIdx: 2, p1: 9, q1: 9, p2: 4, q2: 5, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q65 (x = 616/491)', params: { bIdx: 2, p1: 9, q1: 9, p2: 4, q2: 5, k: 3 }, expectedValid: true },
    ],
  },

  // D66 (Q66): Giải bất phương trình mũ bậc hai b^{x^2 + p1 x + q1} >= b^{a2 x^2 + p2 x + q2} (Tự luận)
  t11_b21_d66_es_exp_quad_ineq: {
    id: 't11_b21_d66_es_exp_quad_ineq',
    name: 'Giải bất phương trình mũ có số mũ bậc hai (Tự luận)',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đưa bất phương trình cùng cơ số b > 1 về bất phương trình bậc hai có hai nghiệm nguyên r1 < r2.',
    conditionSummary: 'b ∈ {2,3,4,5}, A = 1 - a2 ∈ [2;4], r1 ∈ [-5;-1], r2 ∈ [1;5], p2 ∈ [1;4], q2 ∈ [-8;-2]',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b', min: 2, max: 5 },
      { name: 'a2', label: 'Hệ số a2 (của a2 x² ở vế phải)', min: -3, max: -1 },
      { name: 'r1', label: 'Nghiệm nguyên r1 < 0', min: -5, max: -1 },
      { name: 'r2', label: 'Nghiệm nguyên r2 > 0', min: 1, max: 5 },
      { name: 'p2', label: 'Hệ số p2', min: 1, max: 4 },
      { name: 'q2', label: 'Hằng số q2', min: -8, max: -2 },
    ],
    validateCode: `
      const { b, a2, r1, r2, p2, q2 } = params;
      if (b < 2 || b > 5 || a2 < -3 || a2 > -1 || r1 < -5 || r1 > -1 || r2 < 1 || r2 > 5 || p2 < 1 || p2 > 4 || q2 < -8 || q2 > -2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, a2, r1, r2, p2, q2 } = params;
      const A = 1 - a2;
      const B = -A * (r1 + r2);
      const C = A * r1 * r2;
      const p1 = p2 + B;
      const q1 = q2 + C;
      const lhsExp = u.formatQuadratic(1, p1, q1);
      const rhsExp = u.formatQuadratic(a2, p2, q2);
      const diffQuad = u.formatQuadratic(A, B, C);

      return {
        stem: 'Giải bất phương trình $' + b + '^{' + lhsExp + '} \\ge ' + b + '^{' + rhsExp + '}$.',
        rubric: [
          { description: 'Dựa vào cơ số ' + b + ' > 1 giữ nguyên chiều bất phương trình số mũ', points: 0.3 },
          { description: 'Rút gọn về bất phương trình bậc hai ' + diffQuad + ' >= 0', points: 0.4 },
          { description: 'Tìm được nghiệm x <= ' + r1 + ' hoặc x >= ' + r2 + ' và kết luận tập nghiệm', points: 0.3 },
        ],
        answerSummary: '$x \\le ' + r1 + '$ hoặc $x \\ge ' + r2 + '$',
        solutionSteps: [
          'Vì cơ số $' + b + ' > 1$ nên bất phương trình $\\Leftrightarrow ' + lhsExp + ' \\ge ' + rhsExp + '$.',
          'Chuyển vế thu gọn được $' + diffQuad + ' \\ge 0$.',
          'Giải bất phương trình bậc hai ta được $x \\le ' + r1 + '$ hoặc $x \\ge ' + r2 + '$. Tập nghiệm là $S = (-\\infty; ' + r1 + '] \\cup [' + r2 + '; +\\infty)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a2 = 0', params: { b: 4, a2: 0, r1: -4, r2: 2, p2: 3, q2: -6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q66 (x <= -4 hoặc x >= 2)', params: { b: 4, a2: -2, r1: -4, r2: 2, p2: 3, q2: -6 }, expectedValid: true },
    ],
  },
};
