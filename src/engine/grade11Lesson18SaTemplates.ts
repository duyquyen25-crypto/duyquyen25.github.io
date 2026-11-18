import { MathTemplate } from '../types/math';

export const G11_B18_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D17 (Q17): Biết b^a = p/q, tính biểu thức đối xứng b^{2a} + C + k^2 · b^{-2a}
  t11_b18_d17_sa_sym_exp_diff_sq: {
    id: 't11_b18_d17_sa_sym_exp_diff_sq',
    name: 'Tính giá trị biểu thức đối xứng b^(2a) + C + k²·b^(-2a) khi biết b^a (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Cho b^a = p/q. Tính b^{2a} + C + k^2 b^{-2a} làm tròn đến hàng phần mười.',
    conditionSummary: 'b ∈ {2, 3, 5}, p ∈ [2; 9], q ∈ [3; 10], gcd(p, q) = 1, p ≠ q, k ∈ [2; 4], C ∈ [-10; 10]\\{0}, tránh .x5',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'p', label: 'Tử số p của b^a', min: 2, max: 9 },
      { name: 'q', label: 'Mẫu số q của b^a', min: 3, max: 10 },
      { name: 'k', label: 'Hệ số k (hệ số sau là k^2)', min: 2, max: 4 },
      { name: 'C', label: 'Hằng số C cộng thêm', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { bIdx, p, q, k, C } = params;
      if (bIdx < 0 || bIdx > 2 || p < 2 || q < 3 || k < 2 || C === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (p === q || u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q phải tối giản và khác 1' };
      const num = p * p * p * p + C * p * p * q * q + k * k * q * q * q * q;
      const den = p * p * q * q;
      if ((20 * Math.abs(num)) % (2 * den) === den) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, p, q, k, C } = params;
      const b = [2, 3, 5][bIdx];
      const b2 = b * b;

      const num = p * p * p * p + C * p * p * q * q + k * k * q * q * q * q;
      const den = p * p * q * q;
      const ansF = u.simplifyFrac(num, den);
      const val = ansF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const midStr = C > 0 ? '+ ' + C : '- ' + Math.abs(C);
      const k2 = k * k;
      const expr = b2 + '^{a} ' + midStr + ' + ' + k2 + ' \\cdot ' + b2 + '^{-a}';
      const stepDiff = C + 2 * k;

      return {
        stem: 'Cho biết $' + b + '^{a} = \\dfrac{' + p + '}{' + q + '}$. Tính giá trị biểu thức $P = ' + expr + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $' + b2 + '^{a} = (' + b + '^{a})^2 = \\left(\\frac{' + p + '}{' + q + '}\\right)^2 = \\frac{' + (p * p) + '}{' + (q * q) + '}$ và $' + b2 + '^{-a} = \\frac{' + (q * q) + '}{' + (p * p) + '}$.',
          'Suy ra $P = \\left(' + b + '^{a} - ' + k + ' \\cdot ' + b + '^{-a}\\right)^2 ' + (stepDiff === 0 ? '' : stepDiff > 0 ? '+ ' + stepDiff : '- ' + Math.abs(stepDiff)) + ' = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { bIdx: 0, p: 5, q: 5, k: 3, C: -10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (2^a = 7/8 -> 2,5)', params: { bIdx: 0, p: 7, q: 8, k: 3, C: -10 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Cho u·b^a + v·b^{-a} = S, tính u^2·(b^2)^a + C + v^2·(b^2)^{-a}
  t11_b18_d18_sa_sym_exp_from_sum: {
    id: 't11_b18_d18_sa_sym_exp_from_sum',
    name: 'Tính biểu thức luỹ thừa bình phương từ tổng u·b^a + v·b^(-a) = S (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Từ u·b^a + v·b^{-a} = S (S^2 >= 4uv), tính u^2·(b^2)^a + C + v^2·(b^2)^{-a}.',
    conditionSummary: 'b ∈ {2, 3, 5}, u, v ∈ [1; 5], S ∈ [5; 15], S^2 >= 4uv, C ∈ [-9; 9]\\{0}',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số b ∈ {2, 3, 5}', min: 0, max: 2 },
      { name: 'u0', label: 'Hệ số u', min: 1, max: 5 },
      { name: 'v0', label: 'Hệ số v', min: 1, max: 5 },
      { name: 'S', label: 'Giá trị tổng S', min: 5, max: 15 },
      { name: 'C', label: 'Hằng số C', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { bIdx, u0, v0, S, C } = params;
      if (bIdx < 0 || bIdx > 2 || u0 < 1 || v0 < 1 || S < 5 || C === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (S * S < 4 * u0 * v0) return { valid: false, reason: 'Không tồn tại số thực a vì S^2 < 4uv' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, u0, v0, S, C } = params;
      const b = [2, 3, 5][bIdx];
      const b2 = b * b;
      const u2 = u0 * u0;
      const v2 = v0 * v0;
      const val = S * S - 2 * u0 * v0 + C;
      const shortAns = String(val);

      const t1 = u0 === 1 ? b + '^{a}' : u0 + ' \\cdot ' + b + '^{a}';
      const t2 = v0 === 1 ? b + '^{-a}' : v0 + ' \\cdot ' + b + '^{-a}';
      const p1 = u2 === 1 ? b2 + '^{a}' : u2 + ' \\cdot ' + b2 + '^{a}';
      const p2 = v2 === 1 ? b2 + '^{-a}' : v2 + ' \\cdot ' + b2 + '^{-a}';
      const midC = C > 0 ? '+ ' + C : '- ' + Math.abs(C);

      return {
        stem: 'Cho biết $' + t1 + ' + ' + t2 + ' = ' + S + '$. Tính giá trị biểu thức $P = ' + p1 + ' ' + midC + ' + ' + p2 + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: val,
        answerSummary: shortAns,
        solutionSteps: [
          'Bình phương hai vế giả thiết: $\\left(' + t1 + ' + ' + t2 + '\\right)^2 = ' + (S * S) + ' \\Leftrightarrow ' + p1 + ' + ' + (2 * u0 * v0) + ' + ' + p2 + ' = ' + (S * S) + '$.',
          'Suy ra $' + p1 + ' + ' + p2 + ' = ' + (S * S - 2 * u0 * v0) + '$, do đó $P = ' + (S * S - 2 * u0 * v0) + (C > 0 ? ' + ' + C : ' - ' + Math.abs(C)) + ' = ' + val + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vô nghiệm thực (S=5, u=4, v=3 -> 25 < 48)', params: { bIdx: 0, u0: 4, v0: 3, S: 5, C: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (2·2^a + 3·2^-a = 7 -> 43)', params: { bIdx: 0, u0: 2, v0: 3, S: 7, C: 6 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Cho (b^2)^a + C + k^2 (b^2)^{-a} = M/N, tính P = b^a + k·b^{-a} > 0
  t11_b18_d19_sa_sym_exp_sqrt_sum: {
    id: 't11_b18_d19_sa_sym_exp_sqrt_sum',
    name: 'Tính P = b^a + k·b^(-a) > 0 từ biểu thức bình phương (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Cho (b^2)^a + C + k^2(b^2)^{-a} = M/N. Tính P = b^a + k·b^{-a} biết P > 0.',
    conditionSummary: 'b ∈ {2, 3, 5, 6}, k ∈ [2; 5], P = p/q với q ∈ {2, 5, 10}, p/q >= 2√k + 0.5',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số cơ số b ∈ {2, 3, 5, 6}', min: 0, max: 3 },
      { name: 'k', label: 'Hệ số k trong P = b^a + k·b^(-a)', min: 2, max: 5 },
      { name: 'p', label: 'Tử số giá trị P = p/q', min: 9, max: 25 },
      { name: 'qIdx', label: 'Mẫu số q ∈ {2, 5}', min: 0, max: 1 },
      { name: 'C', label: 'Hằng số C trong giả thiết', min: 1, max: 12 },
    ],
    validateCode: `
      const { bIdx, k, p, qIdx, C } = params;
      if (bIdx < 0 || bIdx > 3 || k < 2 || qIdx < 0 || qIdx > 1 || C < 1) return { valid: false, reason: 'Tham số ngoài miền' };
      const q = [2, 5][qIdx];
      if (u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q phải tối giản' };
      const pVal = p / q;
      if (pVal < 2 * Math.sqrt(k) + 0.5) return { valid: false, reason: 'Cần P >= 2√k để tồn tại số thực a' };
      const rhs = (p * p) / (q * q) - 2 * k + C;
      if (rhs <= 0) return { valid: false, reason: 'Vế phải phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k, p, qIdx, C } = params;
      const b = [2, 3, 5, 6][bIdx];
      const b2 = b * b;
      const q = [2, 5][qIdx];
      const pFrac = u.simplifyFrac(p, q);
      const val = pFrac.value;
      const shortAns = Number.isInteger(val) ? String(val) : String(val).replace('.', ',');

      const rhsFrac = u.simplifyFrac(p * p + (C - 2 * k) * q * q, q * q);
      const pSqFrac = u.simplifyFrac(p * p, q * q);
      const k2 = k * k;

      return {
        stem: 'Cho $' + b2 + '^{a} + ' + C + ' + ' + k2 + ' \\cdot ' + b2 + '^{-a} = ' + rhsFrac.latex + '$. Tính giá trị biểu thức $P = ' + b + '^{a} + ' + k + ' \\cdot ' + b + '^{-a}$ biết $P > 0$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: val,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $P^2 = \\left(' + b + '^{a} + ' + k + ' \\cdot ' + b + '^{-a}\\right)^2 = ' + b2 + '^{a} + ' + (2 * k) + ' + ' + k2 + ' \\cdot ' + b2 + '^{-a} = ' + rhsFrac.latex + (2 * k - C === 0 ? '' : (2 * k - C > 0 ? ' + ' + (2 * k - C) : ' - ' + Math.abs(2 * k - C))) + ' = ' + pSqFrac.latex + '$.',
          'Vì $P > 0$ nên $P = \\sqrt{' + pSqFrac.latex + '} = ' + pFrac.latex + ' = ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên không tồn tại a thực (p=5, q=2, k=4 -> 2.5 < 4)', params: { bIdx: 0, k: 4, p: 5, qIdx: 0, C: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (36^a + 6 + 9·36^-a = 169/4 -> 6,5)', params: { bIdx: 3, k: 3, p: 13, qIdx: 0, C: 6 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Biết b^x = u, b^y = v, tính phân thức lũy thừa cộng C
  t11_b18_d20_sa_power_ratio_xy: {
    id: 't11_b18_d20_sa_power_ratio_xy',
    name: 'Tính giá trị biểu thức phân thức luỹ thừa theo b^x và b^y cho trước (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Biết b^x = u, b^y = v. Tính P = [(b^{p1})^x · (1/b^{p2})^y] / [(1/b^{p3})^x · b^{p4 y}] + C.',
    conditionSummary: 'u ∈ [2; 7], v ∈ [2; 9], u ≠ v, p1, p2, p3 ∈ [1; 3], p4 ∈ [1; 2], C ∈ [1; 8], kết quả hợp lí, tránh .x5',
    paramSpecs: [
      { name: 'u0', label: 'Giá trị b^x', min: 2, max: 7 },
      { name: 'v0', label: 'Giá trị b^y', min: 2, max: 9 },
      { name: 'p1', label: 'Số mũ p1 trên tử (b^p1)^x', min: 2, max: 3 },
      { name: 'p2', label: 'Số mũ p2 trên tử (1/b^p2)^y', min: 1, max: 3 },
      { name: 'p3', label: 'Số mũ p3 dưới mẫu (1/b^p3)^x', min: 1, max: 3 },
      { name: 'p4', label: 'Số mũ p4 dưới mẫu b^(p4 y)', min: 1, max: 2 },
      { name: 'C', label: 'Hằng số C cộng thêm', min: 1, max: 8 },
    ],
    validateCode: `
      const { u0, v0, p1, p2, p3, p4, C } = params;
      if (u0 < 2 || u0 > 12 || v0 < 2 || v0 > 12 || u0 === v0 || p1 < 2 || p1 > 5 || p2 < 1 || p2 > 5 || p3 < 1 || p3 > 5 || p4 < 1 || p4 > 4 || C < 1 || C > 20) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const numU = Math.pow(u0, p1 + p3);
      const denV = Math.pow(v0, p2 + p4);
      if (!Number.isFinite(numU) || !Number.isFinite(denV) || denV <= 0 || numU / denV > 500) {
        return { valid: false, reason: 'Giá trị quá lớn hoặc không hợp lệ' };
      }
      const numTotal = numU + C * denV;
      if ((20 * numTotal) % (2 * denV) === denV) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v0, p1, p2, p3, p4, C } = params;
      const sx = p1 + p3;
      const sy = p2 + p4;
      const numU = Math.pow(u0, sx);
      const denV = Math.pow(v0, sy);
      const ansF = u.simplifyFrac(numU + C * denV, denV);
      const val = ansF.value;
      const rounded = Math.round(val * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const fmtPowB = (p) => p === 1 ? 'b' : 'b^{' + p + '}';
      const tNum1 = '\\left(' + fmtPowB(p1) + '\\right)^{x}';
      const tNum2 = '\\left(\\dfrac{1}{' + fmtPowB(p2) + '}\\right)^{y}';
      const tDen1 = '\\left(\\dfrac{1}{' + fmtPowB(p3) + '}\\right)^{x}';
      const tDen2 = p4 === 1 ? 'b^{y}' : '\\left(' + fmtPowB(p4) + '\\right)^{y}';

      return {
        stem: 'Biết $b^{x} = ' + u0 + ',\\; b^{y} = ' + v0 + '$. Tính $P = \\dfrac{' + tNum1 + ' \\cdot ' + tNum2 + '}{' + tDen1 + ' \\cdot ' + tDen2 + '} + ' + C + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Rút gọn theo quy tắc luỹ thừa: $P = \\left(b^{' + sx + '}\\right)^{x} \\cdot \\left(\\frac{1}{b^{' + sy + '}}\\right)^{y} + ' + C + ' = (b^{x})^{' + sx + '} \\cdot \\frac{1}{(b^{y})^{' + sy + '}} + ' + C + '$.',
          'Thay $b^{x} = ' + u0 + ',\\; b^{y} = ' + v0 + '$: $P = ' + numU + ' \\cdot \\frac{1}{' + denV + '} + ' + C + ' = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u0 = v0', params: { u0: 5, v0: 5, p1: 3, p2: 3, p3: 3, p4: 1, C: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (b^x=5, b^y=8 -> 7,8)', params: { u0: 5, v0: 8, p1: 3, p2: 3, p3: 3, p4: 1, C: 4 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Tích hai biểu thức liên hợp bậc cao (A√D + B)^{n+1} · (B - A√D)^n với B^2 - D·A^2 = 1
  t11_b18_d21_sa_conjugate_high_power: {
    id: 't11_b18_d21_sa_conjugate_high_power',
    name: 'Rút gọn tích hai biểu thức liên hợp số mũ lớn (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Tính (A√D + B)^{n+1} · (B - A√D)^n hoặc (B + A√D)^n · (B - A√D)^{n+1} với B^2 - D·A^2 = 1.',
    conditionSummary: 'pairIdx ∈ [0; 7] (nghiệm Pell B^2 - D A^2 = 1), n ∈ [2024; 2036], mode ∈ {0, 1}',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp liên hợp Pell (0..7)', min: 0, max: 7 },
      { name: 'n', label: 'Số mũ nhỏ n', min: 2024, max: 2036 },
      { name: 'mode', label: 'Nhân tử dư bậc 1 (0: B + A√D, 1: B - A√D)', min: 0, max: 1 },
    ],
    validateCode: `
      const { pairIdx, n, mode } = params;
      if (pairIdx < 0 || pairIdx > 7 || n < 2020 || (mode !== 0 && mode !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, n, mode } = params;
      const PAIRS = [
        { B: 17, A: 12, D: 2 },
        { B: 3, A: 2, D: 2 },
        { B: 2, A: 1, D: 3 },
        { B: 7, A: 4, D: 3 },
        { B: 9, A: 4, D: 5 },
        { B: 5, A: 2, D: 6 },
        { B: 8, A: 3, D: 7 },
        { B: 19, A: 6, D: 10 },
      ];
      const { B, A, D } = PAIRS[pairIdx];
      const radStr = (A === 1 ? '' : A) + '\\sqrt{' + D + '}';
      const posTerm = radStr + ' + ' + B;
      const negTerm = B + ' - ' + radStr;

      const e1 = mode === 0 ? n + 1 : n;
      const e2 = mode === 0 ? n : n + 1;
      const exactExpr = mode === 0 ? (radStr + ' + ' + B) : (B + ' - ' + radStr);
      const val = mode === 0 ? (B + A * Math.sqrt(D)) : (B - A * Math.sqrt(D));
      const rounded = Math.round(val * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tính giá trị biểu thức $P = \\left(' + posTerm + '\\right)^{' + e1 + '} \\cdot \\left(' + negTerm + '\\right)^{' + e2 + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Nhận xét $\\left(' + posTerm + '\\right)\\left(' + negTerm + '\\right) = ' + B + '^2 - (' + radStr + ')^2 = ' + (B * B) + ' - ' + (A * A * D) + ' = 1$.',
          'Do đó $P = \\left[\\left(' + posTerm + '\\right)\\left(' + negTerm + '\\right)\\right]^{' + n + '} \\cdot \\left(' + exactExpr + '\\right) = 1^{' + n + '} \\cdot \\left(' + exactExpr + '\\right) = ' + exactExpr + ' \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pairIdx = 8', params: { pairIdx: 8, n: 2033, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 ((12√2+17)^2034 · (17-12√2)^2033 -> 34)', params: { pairIdx: 0, n: 2033, mode: 0 }, expectedValid: true },
    ],
  },
};
