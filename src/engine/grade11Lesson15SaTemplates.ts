import { MathTemplate } from '../types/math';

export const G11_B15_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D22 (Q22): Giới hạn phân thức bậc 4 trên (e n^2 + f)^2 (làm tròn 2 chữ số thập phân)
  t11_b15_d22_limit_deg4_sa: {
    id: 't11_b15_d22_limit_deg4_sa',
    name: 'Tính giới hạn phân thức bậc 4 trên bình phương bậc 2 (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính lim (a n^4 + b n^3 + c n + d)/(e n^2 + f)^2 làm tròn đến hàng phần trăm.',
    conditionSummary: 'a ∈ [1; 8], b, c ∈ [-5; 5], d ∈ [-5; 5], e ∈ [2; 6], f ∈ [1; 4], tránh .xx5',
    paramSpecs: [
      { name: 'a', label: 'Hệ số n^4 ở tử', min: 1, max: 8 },
      { name: 'b', label: 'Hệ số n^3 ở tử', min: -5, max: 5 },
      { name: 'c', label: 'Hệ số n ở tử', min: -5, max: 5 },
      { name: 'd', label: 'Hằng số ở tử', min: -5, max: 5 },
      { name: 'e', label: 'Hệ số n^2 ở mẫu', min: 2, max: 6 },
      { name: 'f', label: 'Hằng số ở mẫu', min: 1, max: 4 },
    ],
    validateCode: `
      const { a, e, f } = params;
      if (a < 1 || a > 8 || e < 2 || e > 6 || f < 1 || f > 4) return { valid: false, reason: 'Tham số ngoài miền' };
      const e2 = e * e;
      if ((200 * a) % (2 * e2) === e2) return { valid: false, reason: 'Tránh đuôi .xx5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, e, f } = params;
      const e2 = e * e;
      const ansF = u.simplifyFrac(a, e2);
      const val = ansF.value;
      const rounded = Math.round(val * 100) / 100;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const numPoly = u.formatPoly([a, b, 0, c, d], 'n');
      const denInner = u.formatPoly([e, 0, f], 'n');

      return {
        stem: 'Tính $\\lim \\frac{' + numPoly + '}{\\left(' + denInner + '\\right)^2}$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Chia cả tử và mẫu cho $n^4$, ta được $\\lim \\frac{' + a + ' + \\frac{' + b + '}{n} + \\frac{' + c + '}{n^3} + \\frac{' + d + '}{n^4}}{\\left(' + e + ' + \\frac{' + f + '}{n^2}\\right)^2} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên e = 1', params: { a: 3, b: 4, c: 4, d: -3, e: 1, f: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (a=3, e=3 -> 0,33)', params: { a: 3, b: 4, c: 4, d: -3, e: 3, f: 1 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Tỉ số tổng n số hạng đầu của hai cấp số cộng (Trả lời ngắn)
  t11_b15_d23_limit_ap_sum_sa: {
    id: 't11_b15_d23_limit_ap_sum_sa',
    name: 'Giới hạn tỉ số tổng n số hạng đầu hai cấp số cộng (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính giới hạn tỉ số tổng n số hạng đầu hai cấp số cộng, làm tròn đến hàng phần mười.',
    conditionSummary: 'u1 ∈ [-5; -1], d1 ∈ [-5; -1], v1 ∈ [1; 5], d2 ∈ [2; 7], tránh .x5',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -5, max: -1 },
      { name: 'd1', label: 'Công sai d1 (âm)', min: -5, max: -1 },
      { name: 'v1', label: 'Số hạng đầu v1', min: 1, max: 5 },
      { name: 'd2', label: 'Công sai d2 (dương)', min: 2, max: 7 },
    ],
    validateCode: `
      const { u1, d1, v1, d2 } = params;
      if (u1 < -5 || u1 > -1 || d1 < -5 || d1 > -1 || v1 < 1 || v1 > 5 || d2 < 2 || d2 > 7) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const absD1 = Math.abs(d1);
      if ((20 * absD1) % (2 * d2) === d2) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d1, v1, d2 } = params;
      const u2 = u1 + d1, u3 = u1 + 2 * d1;
      const v2 = v1 + d2, v3 = v1 + 2 * d2;
      const uEnd = u.formatLinear(d1, u1 - d1, 'n');
      const vEnd = u.formatLinear(d2, v1 - d2, 'n');

      const numStr = u1 + ' - ' + Math.abs(u2) + ' - ' + Math.abs(u3) + ' + \\dots + (' + uEnd + ')';
      const denStr = v1 + ' + ' + v2 + ' + ' + v3 + ' + \\dots + (' + vEnd + ')';

      const ansF = u.simplifyFrac(d1, d2);
      const val = ansF.value;
      const rounded = (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      const sumNumPoly = u.formatLinear(d1, 2 * u1 - d1, 'n');
      const sumDenPoly = u.formatLinear(d2, 2 * v1 - d2, 'n');

      return {
        stem: 'Tính $\\lim \\dfrac{' + numStr + '}{' + denStr + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Tử là tổng $n$ số hạng đầu cấp số cộng ($u_1 = ' + u1 + ',\\; d_1 = ' + d1 + '$) bằng $\\frac{n(' + sumNumPoly + ')}{2}$; mẫu là tổng $n$ số hạng đầu cấp số cộng ($v_1 = ' + v1 + ',\\; d_2 = ' + d2 + '$) bằng $\\frac{n(' + sumDenPoly + ')}{2}$.',
          'Suy ra giới hạn bằng $\\lim \\dfrac{' + sumNumPoly + '}{' + sumDenPoly + '} = ' + ansF.latex + (ansF.value === rounded ? (ansF.isInteger ? '' : ' = ' + shortAns) : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d2 = 1', params: { u1: -3, d1: -2, v1: 3, d2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (d1=-2, d2=4 -> -0,5)', params: { u1: -3, d1: -2, v1: 3, d2: 4 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Tỉ số tổng n số hạng đầu hai cấp số nhân cùng công bội q > 1 (Trả lời ngắn)
  t11_b15_d24_limit_gp_sum_sa: {
    id: 't11_b15_d24_limit_gp_sum_sa',
    name: 'Giới hạn tỉ số tổng n số hạng đầu hai cấp số nhân cùng công bội (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính giới hạn tỉ số tổng hai cấp số nhân cùng công bội q > 1, làm tròn đến hàng phần mười.',
    conditionSummary: 'u1 ∈ [-9; -2], v1 ∈ [-9; -2], q ∈ [2; 6], tránh .x5',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1 (âm)', min: -9, max: -2 },
      { name: 'v1', label: 'Số hạng đầu v1 (âm)', min: -9, max: -2 },
      { name: 'q', label: 'Công bội chung q', min: 2, max: 6 },
    ],
    validateCode: `
      const { u1, v1, q } = params;
      if (u1 < -9 || u1 > -2 || v1 < -9 || v1 > -2 || q < 2 || q > 6) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const a1 = Math.abs(u1), b1 = Math.abs(v1);
      if ((20 * a1) % (2 * b1) === b1) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, v1, q } = params;
      const u2 = u1 * q;
      const v2 = v1 * q, v3 = v1 * q * q;

      const numStr = u1 + ' - ' + Math.abs(u2) + ' + \\dots + (' + u1 + ' \\cdot ' + q + '^{n-1})';
      const denStr = v1 + ' - ' + Math.abs(v2) + ' - ' + Math.abs(v3) + ' + \\dots + (' + v1 + ' \\cdot ' + q + '^{n-1})';

      const ansF = u.simplifyFrac(u1, v1);
      const rounded = Math.round(ansF.value * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tính $\\lim \\dfrac{' + numStr + '}{' + denStr + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Tử là tổng $n$ số hạng đầu CSN ($u_1 = ' + u1 + ',\\; q = ' + q + '$) bằng $' + u1 + ' \\cdot \\frac{' + q + '^n - 1}{' + (q - 1) + '}$; mẫu bằng $' + v1 + ' \\cdot \\frac{' + q + '^n - 1}{' + (q - 1) + '}$.',
          'Rút gọn $\\frac{' + q + '^n - 1}{' + (q - 1) + '}$, giới hạn bằng $\\frac{' + u1 + '}{' + v1 + '} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { u1: -5, v1: -3, q: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn (u1=-5, v1=-3, q=4 -> 1,7)', params: { u1: -5, v1: -3, q: 4 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Tổng cấp số nhân lùi vô hạn dạng trả lời ngắn
  t11_b15_d25_infinite_gp_sa: {
    id: 't11_b15_d25_infinite_gp_sa',
    name: 'Tính tổng cấp số nhân lùi vô hạn (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Giới hạn của dãy số',
    description: 'Tính tổng S = u1 + u1/k + ... + u1·(1/k)^n + ... làm tròn đến hàng phần mười.',
    conditionSummary: 'u1 ∈ [2; 9], k ∈ [2; 6], tránh .x5',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: 2, max: 9 },
      { name: 'k', label: 'Mẫu số công bội k', min: 2, max: 6 },
    ],
    validateCode: `
      const { u1, k } = params;
      if (u1 < 2 || u1 > 9 || k < 2 || k > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      const den = k - 1;
      if ((20 * u1 * k) % (2 * den) === den) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, k } = params;
      const u2F = u.simplifyFrac(u1, k);
      const ansF = u.simplifyFrac(u1 * k, k - 1);
      const rounded = Math.round(ansF.value * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Tính tổng của cấp số nhân lùi vô hạn $S = ' + u1 + ' + ' + u2F.latex + ' + \\dots + ' + u1 + '\\left(\\frac{1}{' + k + '}\\right)^n + \\dots$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Ta có $u_1 = ' + u1 + ',\\; q = \\frac{1}{' + k + '}$ nên $S = \\frac{' + u1 + '}{1 - \\frac{1}{' + k + '}} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 1', params: { u1: 3, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (u1=3, k=3 -> 4,5)', params: { u1: 3, k: 3 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Tổng diện tích vô hạn các hình vuông nối trung điểm
  t11_b15_d26_nested_squares_mid_sa: {
    id: 't11_b15_d26_nested_squares_mid_sa',
    name: 'Tổng diện tích vô hạn các hình vuông nối trung điểm bốn cạnh (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Từ hình vuông cạnh c√2, nối các trung điểm 4 cạnh để tạo hình vuông tiếp theo vô hạn. Tính tổng diện tích.',
    conditionSummary: 'c ∈ [1; 6]',
    paramSpecs: [
      { name: 'c', label: 'Hệ số cạnh c√2', min: 1, max: 6 },
    ],
    validateCode: `
      if (params.c < 1 || params.c > 6) return { valid: false, reason: 'c ngoài miền [1; 6]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c } = params;
      const sideStr = c === 1 ? '\\sqrt{2}' : c + '\\sqrt{2}';
      const s1 = 2 * c * c;
      const total = 2 * s1;

      return {
        stem: 'Từ hình vuông đầu tiên có cạnh bằng $' + sideStr + '$, nối các trung điểm của bốn cạnh để tạo hình vuông tiếp theo. Tính tổng diện tích $T$ của các hình vuông khi cho số hình vuông tăng lên vô hạn.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b15_nested_squares',
          params: { ratioDen: 2 },
        },
        shortAnswer: String(total),
        numericValue: total,
        answerSummary: String(total),
        solutionSteps: [
          'Diện tích hình vuông đầu tiên là $S_1 = (' + sideStr + ')^2 = ' + s1 + '$.',
          'Mỗi hình vuông kế tiếp có cạnh bằng $\\frac{\\sqrt{2}}{2}$ lần cạnh hình vuông ngay trước đó, nên diện tích giảm một nửa: $S_{n+1} = \\frac{1}{2} S_n$.',
          'Do đó $T = \\frac{S_1}{1 - \\frac{1}{2}} = 2 S_1 = ' + total + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { c: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (cạnh 2√2 -> 16)', params: { c: 2 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Tổng diện tích vô hạn các hình vuông chia cạnh theo tỉ lệ 1/k
  t11_b15_d27_nested_squares_ratio_sa: {
    id: 't11_b15_d27_nested_squares_ratio_sa',
    name: 'Tổng diện tích vô hạn các hình vuông chia cạnh thành k phần bằng nhau (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Hình vuông C1 cạnh a1, chia mỗi cạnh thành k phần bằng nhau nối điểm chia tạo C2, C3,... Tính tổng diện tích.',
    conditionSummary: 'a1 ∈ [2; 7], k ∈ [3; 6], tránh .x5',
    paramSpecs: [
      { name: 'a1', label: 'Cạnh hình vuông C1', min: 2, max: 7 },
      { name: 'k', label: 'Số phần chia mỗi cạnh k', min: 3, max: 6 },
    ],
    validateCode: `
      const { a1, k } = params;
      if (a1 < 2 || a1 > 7 || k < 3 || k > 6) return { valid: false, reason: 'Tham số ngoài miền' };
      const num = a1 * a1 * k * k;
      const den = 2 * (k - 1);
      if ((20 * num) % (2 * den) === den) return { valid: false, reason: 'Tránh đuôi .x5 khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, k } = params;
      const s1 = a1 * a1;
      const qNum = (k - 1) * (k - 1) + 1;
      const qDen = k * k;
      const qFrac = u.simplifyFrac(qNum, qDen);
      const ansF = u.simplifyFrac(s1 * k * k, 2 * (k - 1));
      const rounded = Math.round(ansF.value * 10) / 10;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');

      return {
        stem: 'Cho hình vuông $C_1$ có cạnh bằng $' + a1 + '$. Người ta chia mỗi cạnh thành $' + k + '$ phần bằng nhau và nối các điểm chia (theo cùng một chiều) để tạo hình vuông $C_2$. Tiếp tục quá trình này mãi mãi, tính tổng diện tích của tất cả các hình vuông (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b15_nested_squares',
          params: { ratioDen: k },
        },
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Hình vuông $C_1$ có diện tích $S_1 = ' + a1 + '^2 = ' + s1 + '$.',
          'Cạnh hình vuông $C_2$ là $a_2 = a_1\\sqrt{\\left(\\frac{' + (k - 1) + '}{' + k + '}\\right)^2 + \\left(\\frac{1}{' + k + '}\\right)^2} \\Rightarrow S_2 = ' + qFrac.latex + ' S_1$.',
          'Dãy $(S_n)$ lập thành cấp số nhân lùi vô hạn với $u_1 = ' + s1 + ',\\; q = ' + qFrac.latex + '$.',
          'Vậy tổng diện tích $S = \\frac{' + s1 + '}{1 - ' + qFrac.latex + '} = ' + ansF.latex + (ansF.isInteger ? '' : ' \\approx ' + shortAns) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 2', params: { a1: 2, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (a1=2, k=4 -> 10,7)', params: { a1: 2, k: 4 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Tổng diện tích các tam giác đều nội tiếp trung điểm S1 + S2 + ...
  t11_b15_d28_nested_triangles_area_sa: {
    id: 't11_b15_d28_nested_triangles_area_sa',
    name: 'Tổng diện tích vô hạn các tam giác đều nối trung điểm S₁ + S₂ + ... (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Cho tam giác đều ABC cạnh √m, nối trung điểm tạo A1B1C1, A2B2C2,... Tính S1 + S2 + ... làm tròn đến hàng phần trăm.',
    conditionSummary: 'm ∈ [5; 29], m không chính phương',
    paramSpecs: [
      { name: 'm', label: 'Giá trị m trong cạnh √m', min: 5, max: 29 },
    ],
    validateCode: `
      const { m } = params;
      if (m < 5 || m > 29) return { valid: false, reason: 'm ngoài miền [5; 29]' };
      const rt = Math.round(Math.sqrt(m));
      if (rt * rt === m) return { valid: false, reason: 'Chọn m không chính phương để giữ dạng √m' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m } = params;
      const val = (m * Math.sqrt(3)) / 12;
      const rounded = Math.round(val * 100) / 100;
      const shortAns = rounded.toFixed(2).replace('.', ',');
      const s0Frac = u.simplifyFrac(m, 4);
      const s1Frac = u.simplifyFrac(m, 16);

      return {
        stem: 'Cho tam giác đều $ABC$ có cạnh bằng $\\sqrt{' + m + '}$. Nối các trung điểm $A_1, B_1, C_1$ của $BC, CA, AB$ được tam giác đều $A_1B_1C_1$. Tiếp tục nối các trung điểm $A_2, B_2, C_2$ của các cạnh $B_1C_1, C_1A_1, A_1B_1$ ta được tam giác đều $A_2B_2C_2$. Tiếp tục nối các trung điểm đến vô hạn. Gọi $S_n$ là diện tích tam giác $A_nB_nC_n$. Tính $S_1 + S_2 + \\cdots + S_n + \\cdots$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b15_nested_triangles',
          params: {},
        },
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Diện tích tam giác $ABC$ là $S_0 = \\frac{(\\sqrt{' + m + '})^2 \\sqrt{3}}{4} = ' + (s0Frac.den === 1 ? (s0Frac.num === 1 ? '' : s0Frac.num) + '\\sqrt{3}' : '\\frac{' + s0Frac.num + '\\sqrt{3}}{' + s0Frac.den + '}') + '$.',
          'Mỗi tam giác sau có cạnh bằng $\\frac{1}{2}$ cạnh tam giác trước nên $S_1 = \\frac{1}{4} S_0,\\; S_{n+1} = \\frac{1}{4} S_n$.',
          'Tổng $S = \\frac{S_1}{1 - \\frac{1}{4}} = \\frac{\\frac{' + s1Frac.num + '\\sqrt{3}}{' + s1Frac.den + '}}{\\frac{3}{4}} \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 9 (chính phương)', params: { m: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (m=14 -> 2,02)', params: { m: 14 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Tổng độ dài các đường trung tuyến nối tiếp AA1 + A1A2 + ...
  t11_b15_d29_nested_triangles_length_sa: {
    id: 't11_b15_d29_nested_triangles_length_sa',
    name: 'Tổng độ dài vô hạn đường trung tuyến trong chuỗi tam giác đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Cho tam giác đều ABC cạnh √m, lấy các trung điểm nối tiếp nhau. Tính l = AA1 + A1A2 + ... làm tròn đến hàng phần trăm.',
    conditionSummary: 'm ∈ [3; 23], m không chia hết cho 3 hoặc 3m không chính phương',
    paramSpecs: [
      { name: 'm', label: 'Giá trị m trong cạnh √m', min: 3, max: 23 },
    ],
    validateCode: `
      const { m } = params;
      if (m < 3 || m > 23) return { valid: false, reason: 'm ngoài miền [3; 23]' };
      const rt = Math.round(Math.sqrt(m));
      if (rt * rt === m) return { valid: false, reason: 'Chọn m không chính phương để giữ dạng √m' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m } = params;
      const val = Math.sqrt(3 * m);
      const rounded = Math.round(val * 100) / 100;
      const shortAns = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace('.', ',');

      return {
        stem: 'Cho tam giác đều $ABC$ có cạnh bằng $\\sqrt{' + m + '}$. Nối các trung điểm $A_1, B_1, C_1$ của $BC, CA, AB$ được tam giác đều $A_1B_1C_1$. Tiếp tục nối các trung điểm $A_2, B_2, C_2$ của các cạnh $B_1C_1, C_1A_1, A_1B_1$ ta được tam giác đều $A_2B_2C_2$. Tiếp tục nối các trung điểm đến vô hạn. Tính tổng các độ dài $l = AA_1 + A_1A_2 + A_2A_3 + \\cdots + A_{n-1}A_n + \\cdots$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b15_nested_triangles',
          params: {},
        },
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Đặt $u_1 = AA_1, u_2 = A_1A_2, \\dots, u_n = A_{n-1}A_n$. Vì $AA_1$ là đường cao tam giác đều $ABC$ cạnh $\\sqrt{' + m + '}$ nên $u_1 = \\frac{\\sqrt{' + (3 * m) + '}}{2}$.',
          'Tương tự, $u_2 = \\frac{1}{2} u_1, u_3 = \\frac{1}{2} u_2, \\dots$ lập thành cấp số nhân lùi vô hạn có công bội $q = \\frac{1}{2}$.',
          'Vậy $l = \\frac{u_1}{1 - \\frac{1}{2}} = 2 u_1 = \\sqrt{' + (3 * m) + '} \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 16 (chính phương)', params: { m: 16 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (m=7 -> 4,58)', params: { m: 7 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Tổng diện tích chuỗi hình tròn R, 2 hình R/2, 4 hình R/4,...
  t11_b15_d30_nested_circles_area_sa: {
    id: 't11_b15_d30_nested_circles_area_sa',
    name: 'Tổng diện tích vô hạn các hình tròn bán kính R/2^{n-1} (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giới hạn của dãy số',
    description: 'Cắt 1 hình tròn bán kính R, 2 hình tròn bán kính R/2, 4 hình tròn bán kính R/4,... vô hạn. Tính tổng diện tích làm tròn đến hàng đơn vị.',
    conditionSummary: 'R ∈ [5; 25]',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (cm)', min: 5, max: 25 },
    ],
    validateCode: `
      if (params.R < 5 || params.R > 25) return { valid: false, reason: 'R ngoài miền [5; 25]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R } = params;
      const val = 2 * Math.PI * R * R;
      const rounded = Math.round(val);
      const shortAns = String(rounded);

      return {
        stem: 'Từ tờ giấy, cắt một hình tròn bán kính $R = ' + R + '$ cm. Tiếp theo, cắt hai hình tròn bán kính $\\dfrac{R}{2}$ chồng lên hình tròn đầu tiên. Tiếp tục cắt bốn hình tròn bán kính $\\dfrac{R}{4}$ và chồng lên các hình trước, tiếp tục quá trình này mãi mãi. Tính tổng diện tích của các hình tròn (kết quả làm tròn đến hàng đơn vị).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b15_nested_circles',
          params: { R },
        },
        shortAnswer: shortAns,
        numericValue: rounded,
        answerSummary: shortAns,
        solutionSteps: [
          'Diện tích hình tròn thứ nhất là $u_1 = \\pi R^2$. Tổng diện tích lần thứ hai là $u_2 = 2\\pi\\left(\\frac{R}{2}\\right)^2 = \\frac{1}{2}\\pi R^2$, lần thứ $n$ là $u_n = 2^{n-1}\\pi\\left(\\frac{R}{2^{n-1}}\\right)^2 = \\pi R^2 \\cdot \\left(\\frac{1}{2}\\right)^{n-1}$.',
          'Tổng diện tích các hình tròn là $S = \\frac{\\pi R^2}{1 - \\frac{1}{2}} = 2\\pi R^2 = 2\\pi \\cdot ' + R + '^2 \\approx ' + shortAns + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R = 4', params: { R: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (R=10 -> 628)', params: { R: 10 }, expectedValid: true },
    ],
  },
};
