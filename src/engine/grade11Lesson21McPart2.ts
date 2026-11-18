import { MathTemplate } from '../types/math';

export const G11_B21_MC_PART2: Record<string, MathTemplate> = {
  // D19 (Q19): Bất phương trình mũ cơ số e: e^x >= K
  t11_b21_d19_exp_ineq_e_ge_mc: {
    id: 't11_b21_d19_exp_ineq_e_ge_mc',
    name: 'Giải bất phương trình mũ cơ số tự nhiên e^x ≥ K',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải e^x >= K ra tập nghiệm [ln K; +∞).',
    conditionSummary: 'K ∈ [3; 25]',
    paramSpecs: [
      { name: 'K', label: 'Hằng số K > 1', min: 3, max: 25 },
    ],
    validateCode: `
      if (params.K < 3 || params.K > 25) return { valid: false, reason: 'K ngoài miền [3; 25]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { K } = params;
      const correct = '$[\\ln ' + K + '; +\\infty)$';
      const wrongs = [
        '$(1; \\log ' + K + ')$',
        '$(-\\infty; \\ln ' + K + ']$',
        '$(0; \\ln ' + K + ']$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $e^x \\ge ' + K + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $e > 1$ nên $e^x \\ge ' + K + ' \\Leftrightarrow x \\ge \\ln ' + K + '$. Tập nghiệm là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên K = 2', params: { K: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (e^x >= 9)', params: { K: 9 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Bất phương trình mũ (p/q)^x <= K với 0 < p/q < 1
  t11_b21_d20_exp_ineq_frac_le_mc: {
    id: 't11_b21_d20_exp_ineq_frac_le_mc',
    name: 'Giải bất phương trình mũ (p/q)^x ≤ K với 0 < p/q < 1',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải (p/q)^x <= K (đổi chiều bất phương trình khi cơ số thuộc (0; 1)).',
    conditionSummary: 'p ∈ [2; 9], q ∈ [3; 13], p < q, gcd(p, q) = 1, K ∈ [50; 300]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 2, max: 9 },
      { name: 'q', label: 'Mẫu số q > p', min: 3, max: 13 },
      { name: 'K', label: 'Hằng số K', min: 50, max: 300 },
    ],
    validateCode: `
      const { p, q, K } = params;
      if (p < 2 || p > 9 || q < 3 || q > 13 || p >= q || u.gcd(p, q) !== 1 || K < 50 || K > 300) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, K } = params;
      const baseTex = '\\frac{' + p + '}{' + q + '}';
      const lg = '\\log_{' + baseTex + '} ' + K;
      const correct = '$S = \\left[' + lg + '; +\\infty\\right)$';
      const wrongs = [
        '$S = \\left(-\\infty; ' + lg + '\\right]$',
        '$S = \\left(-\\infty; ' + lg + '\\right)$',
        '$S = \\left(' + lg + '; +\\infty\\right)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $\\left(\\dfrac{' + p + '}{' + q + '}\\right)^x \\le ' + K + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $0 < \\dfrac{' + p + '}{' + q + '} < 1$ nên $\\left(\\dfrac{' + p + '}{' + q + '}\\right)^x \\le ' + K + ' \\Leftrightarrow x \\ge ' + lg + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 8, q: 8, K: 233 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 ((8/11)^x <= 233)', params: { p: 8, q: 11, K: 233 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Bất phương trình mũ (p/q)^x >= K với 0 < p/q < 1
  t11_b21_d21_exp_ineq_frac_ge_mc: {
    id: 't11_b21_d21_exp_ineq_frac_ge_mc',
    name: 'Giải bất phương trình mũ (p/q)^x ≥ K với 0 < p/q < 1',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải (p/q)^x >= K (đổi chiều bất phương trình khi cơ số thuộc (0; 1)).',
    conditionSummary: 'p ∈ [2; 7], q ∈ [3; 11], p < q, gcd(p, q) = 1, K ∈ [30; 250]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 2, max: 7 },
      { name: 'q', label: 'Mẫu số q > p', min: 3, max: 11 },
      { name: 'K', label: 'Hằng số K', min: 30, max: 250 },
    ],
    validateCode: `
      const { p, q, K } = params;
      if (p < 2 || p > 7 || q < 3 || q > 11 || p >= q || u.gcd(p, q) !== 1 || K < 30 || K > 250) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, K } = params;
      const baseTex = '\\frac{' + p + '}{' + q + '}';
      const lg = '\\log_{' + baseTex + '} ' + K;
      const correct = '$S = \\left(-\\infty; ' + lg + '\\right]$';
      const wrongs = [
        '$S = \\left(-\\infty; ' + lg + '\\right)$',
        '$S = \\left(' + lg + '; +\\infty\\right)$',
        '$S = \\left[' + lg + '; +\\infty\\right)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $\\left(\\dfrac{' + p + '}{' + q + '}\\right)^x \\ge ' + K + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $0 < \\dfrac{' + p + '}{' + q + '} < 1$ nên $\\left(\\dfrac{' + p + '}{' + q + '}\\right)^x \\ge ' + K + ' \\Leftrightarrow x \\le ' + lg + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p > q', params: { p: 5, q: 3, K: 102 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 ((2/3)^x >= 102)', params: { p: 2, q: 3, K: 102 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Bất phương trình mũ cùng cơ số b > 1: b^{a1 x + c1} > b^{a2 x + c2}
  t11_b21_d22_exp_ineq_same_base_gt_mc: {
    id: 't11_b21_d22_exp_ineq_same_base_gt_mc',
    name: 'Giải bất phương trình mũ cùng cơ số b^{a1 x + c1} > b^{a2 x + c2} (b > 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'So sánh số mũ giữ nguyên chiều khi b > 1 và giải bất phương trình bậc nhất.',
    conditionSummary: 'b ∈ {2, 3, 5, 11}, d ∈ [2; 7], a2 ∈ [3; 10], r ∈ [-4; 4], c2 ∈ [-6; -1]',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b > 1 (0..3)', min: 0, max: 3 },
      { name: 'd', label: 'Hiệu a1 - a2 > 0', min: 2, max: 7 },
      { name: 'a2', label: 'Hệ số a2', min: 3, max: 10 },
      { name: 'r', label: 'Nghiệm biên r', min: -4, max: 4 },
      { name: 'c2', label: 'Hằng số c2', min: -6, max: -1 },
    ],
    validateCode: `
      const { bIdx, d, a2, r, c2 } = params;
      if (bIdx < 0 || bIdx > 3 || d < 2 || d > 7 || a2 < 3 || a2 > 10 || r < -4 || r > 4 || c2 < -6 || c2 > -1) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, d, a2, r, c2 } = params;
      const b = [2, 3, 5, 11][bIdx];
      const a1 = a2 + d;
      const c1 = c2 - d * r;
      const exp1 = a1 + 'x' + (c1 === 0 ? '' : c1 > 0 ? ' + ' + c1 : ' - ' + (-c1));
      const exp2 = a2 + 'x' + (c2 === 0 ? '' : c2 > 0 ? ' + ' + c2 : ' - ' + (-c2));
      const wFrac = u.simplifyFrac(c1 + c2, a1 + a2);

      const correct = '$S = (' + r + '; +\\infty)$';
      const wrongs = [
        '$S = \\left(' + (wFrac.num / wFrac.den >= r ? '-\\infty' : wFrac.latex) + '; ' + r + '\\right)$',
        '$S = (-\\infty; ' + r + ')$',
        '$S = [' + r + '; +\\infty)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $' + b + '^{' + exp1 + '} > ' + b + '^{' + exp2 + '}$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì cơ số $' + b + ' > 1$ nên $' + exp1 + ' > ' + exp2 + ' \\Leftrightarrow ' + d + 'x > ' + (c2 - c1) + ' \\Leftrightarrow x > ' + r + '$.',
          'Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 1', params: { bIdx: 3, d: 1, a2: 9, r: 1, c2: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (11^{14x-7} > 11^{9x-2} -> (1; +inf))', params: { bIdx: 3, d: 5, a2: 9, r: 1, c2: -2 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Bất phương trình mũ cùng cơ số (1/b)^{a1 x + c1} >= (1/b)^{a2 x + c2}
  t11_b21_d23_exp_ineq_same_base_lt1_mc: {
    id: 't11_b21_d23_exp_ineq_same_base_lt1_mc',
    name: 'Giải bất phương trình mũ cùng cơ số (1/b)^{a1 x + c1} ≥ (1/b)^{a2 x + c2}',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đảo chiều bất phương trình số mũ khi cơ số 0 < 1/b < 1.',
    conditionSummary: 'b ∈ [2; 6], d ∈ [2; 6], a2 ∈ [4; 12], r ∈ [-5; 3], c2 ∈ [-5; -1]',
    paramSpecs: [
      { name: 'b', label: 'Mẫu số của cơ số 1/b', min: 2, max: 6 },
      { name: 'd', label: 'Hiệu a1 - a2 > 0', min: 2, max: 6 },
      { name: 'a2', label: 'Hệ số a2', min: 4, max: 12 },
      { name: 'r', label: 'Nghiệm biên r', min: -5, max: 3 },
      { name: 'c2', label: 'Hằng số c2', min: -5, max: -1 },
    ],
    validateCode: `
      const { b, d, a2, r, c2 } = params;
      if (b < 2 || b > 6 || d < 2 || d > 6 || a2 < 4 || a2 > 12 || r < -5 || r > 3 || c2 < -5 || c2 > -1) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, d, a2, r, c2 } = params;
      const a1 = a2 + d;
      const c1 = c2 - d * r;
      const exp1 = a1 + 'x' + (c1 === 0 ? '' : c1 > 0 ? ' + ' + c1 : ' - ' + (-c1));
      const exp2 = a2 + 'x' + (c2 === 0 ? '' : c2 > 0 ? ' + ' + c2 : ' - ' + (-c2));
      const wFrac = u.simplifyFrac(-(c1 + c2), a1 + a2);

      const correct = '$S = (-\\infty; ' + r + ']$';
      const wrongs = [
        '$S = \\left(' + r + '; ' + (wFrac.num / wFrac.den <= r ? String(r + 5) : wFrac.latex) + '\\right]$',
        '$S = [' + r + '; +\\infty)$',
        '$S = (' + r + '; +\\infty)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $\\left(\\dfrac{1}{' + b + '}\\right)^{' + exp1 + '} \\ge \\left(\\dfrac{1}{' + b + '}\\right)^{' + exp2 + '}$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $0 < \\dfrac{1}{' + b + '} < 1$ nên $' + exp1 + ' \\le ' + exp2 + ' \\Leftrightarrow ' + d + 'x \\le ' + (c2 - c1) + ' \\Leftrightarrow x \\le ' + r + '$.',
          'Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 1', params: { b: 2, d: 1, a2: 10, r: -3, c2: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 ((1/2)^{12x+5} >= (1/2)^{10x-1} -> (-inf; -3])', params: { b: 2, d: 2, a2: 10, r: -3, c2: -1 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Tập nghiệm log_b x >= k (dạng tập S = [b^k; +∞))
  t11_b21_d24_log_ineq_set_ge_mc: {
    id: 't11_b21_d24_log_ineq_set_ge_mc',
    name: 'Tập nghiệm bất phương trình lôgarit log_b x ≥ k (b > 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Tìm tập nghiệm dạng đoạn/khoảng của log_b x >= k với b > 1.',
    conditionSummary: 'b ∈ [2; 5], k ∈ [2; 4], b^k <= 256',
    paramSpecs: [
      { name: 'b', label: 'Cơ số nguyên b > 1', min: 2, max: 5 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
    ],
    validateCode: `
      const { b, k } = params;
      if (b < 2 || b > 5 || k < 2 || k > 4) return { valid: false, reason: 'Tham số ngoài miền' };
      if (Math.pow(b, k) > 256) return { valid: false, reason: 'b^k quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k } = params;
      const ans = Math.pow(b, k);
      const fake = Math.pow(k, b);
      const wrongVal = fake === ans ? ans - 9 : fake;

      const correct = '$S = [' + ans + '; +\\infty)$';
      const wrongs = [
        '$S = (-\\infty; ' + ans + ')$',
        '$S = (-\\infty; ' + wrongVal + ')$',
        '$S = (' + wrongVal + '; +\\infty)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $\\log_{' + b + '} x \\ge ' + k + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Vì $' + b + ' > 1$ nên $\\log_{' + b + '} x \\ge ' + k + ' \\Leftrightarrow x \\ge ' + b + '^{' + k + '} = ' + ans + '$. Vậy ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 5^4 > 256', params: { b: 5, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (log_3 x >= 4 -> [81; +inf))', params: { b: 3, k: 4 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Giải bất phương trình log_b x >= k (b ∈ [4; 8])
  t11_b21_d25_log_ineq_val_ge_mc: {
    id: 't11_b21_d25_log_ineq_val_ge_mc',
    name: 'Giải bất phương trình log_b x ≥ k (dạng bất đẳng thức)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải log_b x >= k ra nghiệm dạng x >= b^k.',
    conditionSummary: 'b ∈ [4; 8], k ∈ [2; 4], b^k <= 2000',
    paramSpecs: [
      { name: 'b', label: 'Cơ số nguyên b > 1', min: 4, max: 8 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
    ],
    validateCode: `
      const { b, k } = params;
      if (b < 4 || b > 8 || k < 2 || k > 4) return { valid: false, reason: 'Tham số ngoài miền' };
      if (Math.pow(b, k) > 2000) return { valid: false, reason: 'b^k quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k } = params;
      const ans = Math.pow(b, k);
      const correct = '$x \\ge ' + ans + '$';
      const wrongs = [
        '$x > ' + ans + '$',
        '$x < ' + ans + '$',
        '$0 < x < ' + ans + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{' + b + '} x \\ge ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Vì $' + b + ' > 1$ nên $\\log_{' + b + '} x \\ge ' + k + ' \\Leftrightarrow x \\ge ' + b + '^{' + k + '} = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 8^4 > 2000', params: { b: 8, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (log_6 x >= 4 -> x >= 1296)', params: { b: 6, k: 4 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Giải log_{p/q} x > k (0 < p/q < 1)
  t11_b21_d26_log_ineq_frac_gt_mc: {
    id: 't11_b21_d26_log_ineq_frac_gt_mc',
    name: 'Giải bất phương trình log_{p/q} x > k (0 < p/q < 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Kết hợp điều kiện x > 0 và phép đổi chiều khi cơ số thuộc (0; 1).',
    conditionSummary: 'p ∈ [1; 5], q ∈ [2; 6], p < q, gcd(p, q) = 1, k ∈ [2; 4]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 5 },
      { name: 'q', label: 'Mẫu số q > p', min: 2, max: 6 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
    ],
    validateCode: `
      const { p, q, k } = params;
      if (p < 1 || p > 5 || q < 2 || q > 6 || p >= q || u.gcd(p, q) !== 1 || k < 2 || k > 4) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, k } = params;
      const num = Math.pow(p, k), den = Math.pow(q, k);
      const fracTex = '\\frac{' + num + '}{' + den + '}';
      const correct = '$0 < x < ' + fracTex + '$';
      const wrongs = [
        '$x < ' + fracTex + '$',
        '$x > ' + fracTex + '$',
        '$x \\ge ' + fracTex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{\\frac{' + p + '}{' + q + '}} x > ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Vì $0 < \\frac{' + p + '}{' + q + '} < 1$ nên $x < \\left(\\frac{' + p + '}{' + q + '}\\right)^{' + k + '} = ' + fracTex + '$.',
          'Kết hợp điều kiện $x > 0$ ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 3, q: 3, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (log_{3/4} x > 4 -> 0 < x < 81/256)', params: { p: 3, q: 4, k: 4 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Giải log_{1/b} x >= k (k ∈ [1; 3])
  t11_b21_d27_log_ineq_inv_ge_mc: {
    id: 't11_b21_d27_log_ineq_inv_ge_mc',
    name: 'Giải bất phương trình log_{1/b} x ≥ k',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Kết hợp điều kiện x > 0 và đổi chiều thành 0 < x <= (1/b)^k.',
    conditionSummary: 'b ∈ [2; 5], k ∈ [1; 3]',
    paramSpecs: [
      { name: 'b', label: 'Mẫu số của cơ số 1/b', min: 2, max: 5 },
      { name: 'k', label: 'Vế phải k', min: 1, max: 3 },
    ],
    validateCode: `
      if (params.b < 2 || params.b > 5 || params.k < 1 || params.k > 3) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k } = params;
      const den = Math.pow(b, k);
      const fracTex = '\\frac{1}{' + den + '}';
      const correct = '$0 < x \\le ' + fracTex + '$';
      const wrongs = [
        '$0 \\le x \\le ' + fracTex + '$',
        '$x \\le ' + fracTex + '$',
        '$0 < x < ' + fracTex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{\\frac{1}{' + b + '}} x \\ge ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Vì $0 < \\frac{1}{' + b + '} < 1$ nên $x \\le \\left(\\frac{1}{' + b + '}\\right)^{' + k + '} = ' + fracTex + '$.',
          'Kết hợp điều kiện $x > 0$ ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (log_{1/2} x >= 1 -> 0 < x <= 1/2)', params: { b: 2, k: 1 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Giải log_b x < k (b > 1)
  t11_b21_d28_log_ineq_lt_mc: {
    id: 't11_b21_d28_log_ineq_lt_mc',
    name: 'Giải bất phương trình log_b x < k (b > 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Kết hợp điều kiện x > 0 và log_b x < k cho 0 < x < b^k.',
    conditionSummary: 'b ∈ [2; 6], k ∈ [2; 4], b^k <= 256',
    paramSpecs: [
      { name: 'b', label: 'Cơ số nguyên b > 1', min: 2, max: 6 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
    ],
    validateCode: `
      const { b, k } = params;
      if (b < 2 || b > 6 || k < 2 || k > 4 || Math.pow(b, k) > 256) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k } = params;
      const ans = Math.pow(b, k);
      const correct = '$0 < x < ' + ans + '$';
      const wrongs = [
        '$x \\le ' + ans + '$',
        '$x < ' + ans + '$',
        '$x \\ge ' + ans + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{' + b + '} x < ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Vì $' + b + ' > 1$ nên $x < ' + b + '^{' + k + '} = ' + ans + '$. Kết hợp $x > 0$ ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 6^4 > 256', params: { b: 6, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (log_3 x < 3 -> 0 < x < 27)', params: { b: 3, k: 3 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Giải log_{p/q} x < k (p/q > 1)
  t11_b21_d29_log_ineq_frac_gt1_lt_mc: {
    id: 't11_b21_d29_log_ineq_frac_gt1_lt_mc',
    name: 'Giải bất phương trình log_{p/q} x < k (p/q > 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Với cơ số p/q > 1, kết hợp x > 0 cho nghiệm 0 < x < (p/q)^k.',
    conditionSummary: 'p ∈ [3; 9], q ∈ [2; 5], p > q, gcd(p, q) = 1, k ∈ [2; 4]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p > q', min: 3, max: 9 },
      { name: 'q', label: 'Mẫu số q', min: 2, max: 5 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
    ],
    validateCode: `
      const { p, q, k } = params;
      if (p < 3 || p > 9 || q < 2 || q > 5 || p <= q || u.gcd(p, q) !== 1 || k < 2 || k > 4) {
        return { valid: false, reason: 'Cần p/q > 1 tối giản' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, k } = params;
      const num = Math.pow(p, k), den = Math.pow(q, k);
      const fracTex = '\\frac{' + num + '}{' + den + '}';
      const correct = '$0 < x < ' + fracTex + '$';
      const wrongs = [
        '$x > ' + fracTex + '$',
        '$0 < x \\le ' + fracTex + '$',
        '$0 \\le x < ' + fracTex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{\\frac{' + p + '}{' + q + '}} x < ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Vì $\\frac{' + p + '}{' + q + '} > 1$ nên $x < \\left(\\frac{' + p + '}{' + q + '}\\right)^{' + k + '} = ' + fracTex + '$. Kết hợp $x > 0$ suy ra ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p <= q', params: { p: 3, q: 4, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (log_{7/3} x < 4 -> 0 < x < 2401/81)', params: { p: 7, q: 3, k: 4 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Giải log_{p/q} x < k (0 < p/q < 1) -> x > (p/q)^k
  t11_b21_d30_log_ineq_frac_lt1_lt_mc: {
    id: 't11_b21_d30_log_ineq_frac_lt1_lt_mc',
    name: 'Giải bất phương trình log_{p/q} x < k (0 < p/q < 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Với 0 < p/q < 1, bất phương trình đảo chiều thành x > (p/q)^k > 0.',
    conditionSummary: 'p ∈ [1; 4], q ∈ [2; 6], p < q, gcd(p, q) = 1, k ∈ [2; 4]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 4 },
      { name: 'q', label: 'Mẫu số q > p', min: 2, max: 6 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
    ],
    validateCode: `
      const { p, q, k } = params;
      if (p < 1 || p > 4 || q < 2 || q > 6 || p >= q || u.gcd(p, q) !== 1 || k < 2 || k > 4) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, k } = params;
      const num = Math.pow(p, k), den = Math.pow(q, k);
      const fracTex = '\\frac{' + num + '}{' + den + '}';
      const correct = '$x > ' + fracTex + '$';
      const wrongs = [
        '$0 < x \\le ' + fracTex + '$',
        '$x < ' + fracTex + '$',
        '$x \\ge ' + fracTex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{\\frac{' + p + '}{' + q + '}} x < ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Vì $0 < \\frac{' + p + '}{' + q + '} < 1$ nên $x > \\left(\\frac{' + p + '}{' + q + '}\\right)^{' + k + '} = ' + fracTex + ' > 0$. Vậy nghiệm là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 2, q: 2, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (log_{2/5} x < 4 -> x > 16/625)', params: { p: 2, q: 5, k: 4 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Giải log_{p/q} x <= k (0 < p/q < 1) -> x >= (p/q)^k
  t11_b21_d31_log_ineq_frac_lt1_le_mc: {
    id: 't11_b21_d31_log_ineq_frac_lt1_le_mc',
    name: 'Giải bất phương trình log_{p/q} x ≤ k (0 < p/q < 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Với 0 < p/q < 1, bất phương trình đảo chiều thành x >= (p/q)^k.',
    conditionSummary: 'p ∈ [1; 5], q ∈ [2; 7], p < q, gcd(p, q) = 1, k ∈ [2; 3]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 5 },
      { name: 'q', label: 'Mẫu số q > p', min: 2, max: 7 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 3 },
    ],
    validateCode: `
      const { p, q, k } = params;
      if (p < 1 || p > 5 || q < 2 || q > 7 || p >= q || u.gcd(p, q) !== 1 || k < 2 || k > 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, k } = params;
      const num = Math.pow(p, k), den = Math.pow(q, k);
      const fracTex = '\\frac{' + num + '}{' + den + '}';
      const correct = '$x \\ge ' + fracTex + '$';
      const wrongs = [
        '$0 < x < ' + fracTex + '$',
        '$x < ' + fracTex + '$',
        '$x \\le ' + fracTex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{\\frac{' + p + '}{' + q + '}} x \\le ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > 0$. Vì $0 < \\frac{' + p + '}{' + q + '} < 1$ nên $x \\ge \\left(\\frac{' + p + '}{' + q + '}\\right)^{' + k + '} = ' + fracTex + ' > 0$. Vậy nghiệm là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 4', params: { p: 3, q: 5, k: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (log_{3/5} x <= 2 -> x >= 9/25)', params: { p: 3, q: 5, k: 2 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Tập nghiệm log_b(x + c) >= k (b > 1)
  t11_b21_d32_log_ineq_shift_ge_mc: {
    id: 't11_b21_d32_log_ineq_shift_ge_mc',
    name: 'Giải bất phương trình log_b(x + c) ≥ k (b > 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải x + c >= b^k cho tập nghiệm [b^k - c; +∞).',
    conditionSummary: 'b ∈ [2; 5], k ∈ [2; 4], c ∈ [3; 20], b^k ≤ 125',
    paramSpecs: [
      { name: 'b', label: 'Cơ số nguyên b > 1', min: 2, max: 5 },
      { name: 'k', label: 'Vế phải k', min: 2, max: 4 },
      { name: 'c', label: 'Hằng số dịch chuyển c', min: 3, max: 20 },
    ],
    validateCode: `
      const { b, k, c } = params;
      if (b < 2 || b > 5 || k < 2 || k > 4 || c < 3 || c > 20 || Math.pow(b, k) > 125) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k, c } = params;
      const bk = Math.pow(b, k);
      const ans = bk - c;
      const wrongVal = bk + c;
      const correct = '$S = [' + ans + '; +\\infty)$';
      const wrongs = [
        '$S = (-\\infty; ' + wrongVal + ']$',
        '$S = (' + ans + '; +\\infty)$',
        '$S = [' + wrongVal + '; +\\infty)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $\\log_{' + b + '}(x + ' + c + ') \\ge ' + k + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + b + ' > 1$ nên $\\log_{' + b + '}(x + ' + c + ') \\ge ' + k + ' \\Leftrightarrow x + ' + c + ' \\ge ' + bk + ' \\Leftrightarrow x \\ge ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 2', params: { b: 3, k: 3, c: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (log_3(x+14) >= 3 -> [13; +inf))', params: { b: 3, k: 3, c: 14 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Giải log_{p/q}(x + c) > 1 (0 < p/q < 1) -> -c < x < p/q - c
  t11_b21_d33_log_ineq_shift_frac_gt_mc: {
    id: 't11_b21_d33_log_ineq_shift_frac_gt_mc',
    name: 'Giải bất phương trình log_{p/q}(x + c) > 1 (0 < p/q < 1)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Kết hợp điều kiện x + c > 0 với 0 < p/q < 1 để tìm khoảng nghiệm (-c; p/q - c).',
    conditionSummary: 'p ∈ [1; 5], q ∈ [2; 7], p < q, gcd(p, q) = 1, c ∈ [1; 6]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 5 },
      { name: 'q', label: 'Mẫu số q > p', min: 2, max: 7 },
      { name: 'c', label: 'Hằng số c > 0', min: 1, max: 6 },
    ],
    validateCode: `
      const { p, q, c } = params;
      if (p < 1 || p > 5 || q < 2 || q > 7 || p >= q || u.gcd(p, q) !== 1 || c < 1 || c > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, c } = params;
      const rightF = u.simplifyFrac(p - c * q, q);
      const correct = '$-' + c + ' < x < ' + rightF.latex + '$';
      const wrongs = [
        '$x < ' + rightF.latex + '$',
        '$x > ' + rightF.latex + '$',
        '$x > -' + c + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{\\frac{' + p + '}{' + q + '}}(x + ' + c + ') > 1$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x + ' + c + ' > 0 \\Leftrightarrow x > -' + c + '$.',
          'Vì $0 < \\frac{' + p + '}{' + q + '} < 1$ nên $x + ' + c + ' < \\frac{' + p + '}{' + q + '} \\Leftrightarrow x < ' + rightF.latex + '$. Kết hợp điều kiện ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 2, q: 2, c: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (log_{2/3}(x+1) > 1 -> -1 < x < -1/3)', params: { p: 2, q: 3, c: 1 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Giải log_b(x + c) < k (b > 1) -> -c < x < b^k - c
  t11_b21_d34_log_ineq_shift_lt_mc: {
    id: 't11_b21_d34_log_ineq_shift_lt_mc',
    name: 'Giải bất phương trình log_b(x + c) < k (b > 1)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Kết hợp điều kiện x + c > 0 và x + c < b^k để suy ra -c < x < b^k - c.',
    conditionSummary: 'b ∈ [2; 5], k ∈ [1; 3], c ∈ [4; 15], b^k ≤ 27',
    paramSpecs: [
      { name: 'b', label: 'Cơ số nguyên b > 1', min: 2, max: 5 },
      { name: 'k', label: 'Vế phải k', min: 1, max: 3 },
      { name: 'c', label: 'Hằng số c', min: 4, max: 15 },
    ],
    validateCode: `
      const { b, k, c } = params;
      if (b < 2 || b > 5 || k < 1 || k > 3 || c < 4 || c > 15 || Math.pow(b, k) > 27) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k, c } = params;
      const rHigh = Math.pow(b, k) - c;
      const correct = '$-' + c + ' < x < ' + rHigh + '$';
      const wrongs = [
        '$x > ' + rHigh + '$',
        '$-' + c + ' < x \\le ' + rHigh + '$',
        '$x \\ge ' + rHigh + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{' + b + '}(x + ' + c + ') < ' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x + ' + c + ' > 0 \\Leftrightarrow x > -' + c + '$.',
          'Vì $' + b + ' > 1$ nên $x + ' + c + ' < ' + Math.pow(b, k) + ' \\Leftrightarrow x < ' + rHigh + '$. Kết hợp điều kiện ta được ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 3', params: { b: 3, k: 1, c: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (log_3(x+7) < 1 -> -7 < x < -4)', params: { b: 3, k: 1, c: 7 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Giải log_{p/q}(x + c) < -k (0 < p/q < 1, k >= 1) -> x > (q/p)^k - c
  t11_b21_d35_log_ineq_shift_neg_rhs_mc: {
    id: 't11_b21_d35_log_ineq_shift_neg_rhs_mc',
    name: 'Giải bất phương trình log_{p/q}(x + c) < -k (0 < p/q < 1)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Đảo chiều bất phương trình lôgarit cơ số nhỏ hơn 1 với vế phải âm.',
    conditionSummary: 'p ∈ [2; 4], q ∈ [3; 5], p < q, gcd(p, q) = 1, k ∈ [2; 3], c ∈ [1; 5]',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 2, max: 4 },
      { name: 'q', label: 'Mẫu số q > p', min: 3, max: 5 },
      { name: 'k', label: 'Số dương k (vế phải -k)', min: 2, max: 3 },
      { name: 'c', label: 'Hằng số c', min: 1, max: 5 },
    ],
    validateCode: `
      const { p, q, k, c } = params;
      if (p < 2 || p > 4 || q < 3 || q > 5 || p >= q || u.gcd(p, q) !== 1 || (k !== 2 && k !== 3) || c < 1 || c > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, k, c } = params;
      const num = Math.pow(q, k), den = Math.pow(p, k);
      const ansF = u.simplifyFrac(num - c * den, den);
      const powTex = '\\frac{' + num + '}{' + den + '}';
      const correct = '$x > ' + ansF.latex + '$';
      const wrongs = [
        '$-' + c + ' < x \\le ' + ansF.latex + '$',
        '$x \\le ' + ansF.latex + '$',
        '$x < ' + ansF.latex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Giải bất phương trình $\\log_{\\frac{' + p + '}{' + q + '}}(x + ' + c + ') < -' + k + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $x > -' + c + '$.',
          'Vì $0 < \\frac{' + p + '}{' + q + '} < 1$ nên $x + ' + c + ' > \\left(\\frac{' + p + '}{' + q + '}\\right)^{-' + k + '} = ' + powTex + ' \\Rightarrow x > ' + ansF.latex + '$ (luôn $> -' + c + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 3, q: 3, k: 3, c: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 (log_{2/3}(x+1) < -3 -> x > 19/8)', params: { p: 2, q: 3, k: 3, c: 1 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Bất phương trình log_b(a1 x - c1) >= log_b(a2 x + c2) (b > 1)
  t11_b21_d36_log_ineq_two_sides_mc: {
    id: 't11_b21_d36_log_ineq_two_sides_mc',
    name: 'Giải bất phương trình log_b(a1 x - c1) ≥ log_b(a2 x + c2) (b > 1)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình, bất phương trình mũ và lôgarit',
    description: 'Giải bất phương trình lôgarit hai vế cùng cơ số b > 1 và kết hợp điều kiện xác định.',
    conditionSummary: 'b ∈ {2, 3, 5}, d ∈ [1; 3], a2 ∈ [2; 5], r ∈ [2; 6], c2 ∈ [1; 5], c1 = d·r - c2 > 0',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b > 1 (0..2)', min: 0, max: 2 },
      { name: 'd', label: 'Hiệu a1 - a2 > 0', min: 1, max: 3 },
      { name: 'a2', label: 'Hệ số a2', min: 2, max: 5 },
      { name: 'r', label: 'Nghiệm biên r', min: 2, max: 6 },
      { name: 'c2', label: 'Hằng số c2', min: 1, max: 5 },
    ],
    validateCode: `
      const { bIdx, d, a2, r, c2 } = params;
      if (bIdx < 0 || bIdx > 2 || d < 1 || d > 3 || a2 < 2 || a2 > 5 || r < 2 || r > 6 || c2 < 1 || c2 > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const c1 = d * r - c2;
      if (c1 <= 0) return { valid: false, reason: 'Cần c1 > 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, d, a2, r, c2 } = params;
      const b = [2, 3, 5][bIdx];
      const a1 = a2 + d;
      const c1 = d * r - c2;
      const condBound = u.simplifyFrac(-c2, a2);

      const correct = '$S = [' + r + '; +\\infty)$';
      const wrongs = [
        '$S = (' + condBound.latex + '; ' + r + ']$',
        '$S = (-\\infty; ' + r + ')$',
        '$S = (' + condBound.latex + '; +\\infty)$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Tập nghiệm của bất phương trình $\\log_{' + b + '}(' + a1 + 'x - ' + c1 + ') \\ge \\log_{' + b + '}(' + a2 + 'x + ' + c2 + ')$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điều kiện: $' + a1 + 'x - ' + c1 + ' > 0$ và $' + a2 + 'x + ' + c2 + ' > 0 \\Leftrightarrow x > ' + u.simplifyFrac(c1, a1).latex + '$.',
          'Vì $' + b + ' > 1$ nên $' + a1 + 'x - ' + c1 + ' \\ge ' + a2 + 'x + ' + c2 + ' \\Leftrightarrow ' + d + 'x \\ge ' + (c1 + c2) + ' \\Leftrightarrow x \\ge ' + r + '$ (thỏa điều kiện).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1 <= 0', params: { bIdx: 0, d: 1, a2: 2, r: 2, c2: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (log_2(3x-3) >= log_2(2x+1) -> [4; +inf))', params: { bIdx: 0, d: 1, a2: 2, r: 4, c2: 1 }, expectedValid: true },
    ],
  },
};
