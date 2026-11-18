import { MathTemplate } from '../types/math';

export const G11_B20_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D34 (Q34): Mô hình tăng trưởng dân số S = A·e^{rt}
  t11_b20_d34_sa_population_exp: {
    id: 't11_b20_d34_sa_population_exp',
    name: 'Mô hình tăng trưởng dân số S = A·e^{rt} (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Tính dân số dự báo sau t năm theo mô hình tăng trưởng mũ S = A·e^{rt}, làm tròn đến hàng đơn vị.',
    conditionSummary: 'A ∈ [40; 150], r100 ∈ [75; 165], y0 ∈ [2018; 2024], dt ∈ [8; 20], tránh ngưỡng làm tròn 0.5',
    paramSpecs: [
      { name: 'A', label: 'Dân số năm mốc (triệu người)', min: 40, max: 150 },
      { name: 'r100', label: '100 · tỉ lệ tăng (%) (VD: 93 là 0,93%)', min: 75, max: 165 },
      { name: 'y0', label: 'Năm mốc', min: 2018, max: 2024 },
      { name: 'dt', label: 'Số năm sau năm mốc', min: 8, max: 20 },
    ],
    validateCode: `
      const { A, r100, y0, dt } = params;
      if (A < 40 || A > 150 || r100 < 75 || r100 > 165 || y0 < 2018 || y0 > 2024 || dt < 8 || dt > 20) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const r = r100 / 10000;
      const S = A * Math.exp(r * dt);
      const frac = S - Math.floor(S);
      if (!Number.isFinite(S) || Math.abs(frac - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh kết quả sát ngưỡng làm tròn .5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, r100, y0, dt } = params;
      const y1 = y0 + dt;
      const rPct = (r100 / 100).toFixed(2).replace('.', ',');
      const r = r100 / 10000;
      const S = A * Math.exp(r * dt);
      const ans = Math.round(S);
      const approx1 = (Math.round(S * 10) / 10).toFixed(1).replace('.', ',');

      return {
        stem: 'Ta coi năm lấy làm mốc để tính dân số của một vùng là năm $0$. Khi đó, dân số của vùng đó ở năm thứ $t$ là $S = A \\cdot e^{rt}$, trong đó $A$ là dân số ở năm $0$ và $r$ là tỉ lệ tăng dân số hằng năm. Biết rằng dân số khu vực $X$ năm $' + y0 + '$ ước tính là $' + A + '$ triệu người và tỉ lệ tăng dân số là $' + rPct + '\\%$/năm. Giả sử tỉ lệ tăng dân số hằng năm là như nhau tính từ năm $' + y0 + '$, dân số khu vực $X$ năm $' + y1 + '$ là bao nhiêu triệu người (làm tròn kết quả đến hàng đơn vị)?',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans) + ' triệu người',
        solutionSteps: [
          'Ta có $A = ' + A + '$ (triệu người), $r = ' + rPct + '\\% = ' + rPct + ' \\cdot 10^{-2}$ và $t = ' + y1 + ' - ' + y0 + ' = ' + dt + '$ (năm).',
          'Dân số năm $' + y1 + '$ được ước tính bởi: $S(' + dt + ') = ' + A + ' \\cdot e^{' + rPct + ' \\cdot 10^{-2} \\cdot ' + dt + '} \\approx ' + approx1 + ' \\approx ' + ans + '$ (triệu người).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 30', params: { A: 30, r100: 93, y0: 2021, dt: 13 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (A=105, r=0.93%, 2021->2034 => 118)', params: { A: 105, r100: 93, y0: 2021, dt: 13 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Đếm số giá trị nguyên m để y = log_b[x^2 - (-2k m - c)x + p^2] xác định trên R
  t11_b20_d35_sa_log_quad_count_int_m: {
    id: 't11_b20_d35_sa_log_quad_count_int_m',
    name: 'Đếm số giá trị nguyên m để hàm lôgarit tam thức xác định trên R (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Tìm số giá trị nguyên của m sao cho x² - (-Am - B)x + p² > 0 với mọi x ∈ R.',
    conditionSummary: 'bIdx ∈ [0; 3], k ∈ [1; 3], c ∈ [2; 9], p ∈ [1; 5], hai đầu mút không nguyên',
    paramSpecs: [
      { name: 'bIdx', label: 'Chỉ số chọn cơ số lôgarit (0..3)', min: 0, max: 3 },
      { name: 'k', label: 'Hệ số k (hệ số m là A = 2k)', min: 1, max: 3 },
      { name: 'c', label: 'Hằng số c > 0', min: 2, max: 9 },
      { name: 'p', label: 'Căn bậc hai p của hệ số tự do p²', min: 1, max: 5 },
    ],
    validateCode: `
      const { bIdx, k, c, p } = params;
      if (bIdx < 0 || bIdx > 3 || k < 1 || k > 3 || c < 2 || c > 9 || p < 1 || p > 5) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { bIdx, k, c, p } = params;
      const base = [2, 5, 8, 10][bIdx];
      const A = 2 * k;
      const p2 = p * p;
      const L = (-2 * p - c) / A;
      const R = (2 * p - c) / A;
      const intLow = Math.floor(L) + 1;
      const intHigh = Math.ceil(R) - 1;
      const ans = Math.max(0, intHigh - intLow + 1);

      const Lfrac = u.simplifyFrac(-2 * p - c, A).latex;
      const Rfrac = u.simplifyFrac(2 * p - c, A).latex;

      return {
        stem: 'Tìm số các giá trị nguyên của $m$ để hàm số $y = \\log_{' + base + '}\\left[x^2 - (-' + A + 'm - ' + c + ')x + ' + p2 + '\\right]$ xác định với mọi $x \\in \\mathbb{R}$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Điều kiện: $x^2 - (-' + A + 'm - ' + c + ')x + ' + p2 + ' > 0,\\; \\forall x \\in \\mathbb{R} \\Leftrightarrow \\Delta = (-' + A + 'm - ' + c + ')^2 - ' + (4 * p2) + ' < 0$.',
          'Giải bất phương trình: $-' + (2 * p) + ' < -' + A + 'm - ' + c + ' < ' + (2 * p) + ' \\Leftrightarrow ' + Lfrac + ' < m < ' + Rfrac + '$.',
          'Do đó có $' + ans + '$ giá trị nguyên của $m$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 6', params: { bIdx: 2, k: 2, c: 6, p: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 (A=4, c=6, p=1 -> -2 < m < -1 => 0)', params: { bIdx: 2, k: 2, c: 6, p: 1 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Đếm số giá trị nguyên m để y = (ax+b)/sqrt(log_c(x^2 - 2mx + K)) xác định trên R
  t11_b20_d36_sa_log_sqrt_denom_count_m: {
    id: 't11_b20_d36_sa_log_sqrt_denom_count_m',
    name: 'Đếm số giá trị nguyên m để hàm chứa √(log_c(x² - 2mx + K)) ở mẫu xác định trên R (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hàm số mũ và hàm số lôgarit',
    description: 'Điều kiện log_c(x² - 2mx + K) > 0 ∀x ⇔ x² - 2mx + (K - 1) > 0 ∀x ⇔ |m| < √(K - 1).',
    conditionSummary: 'cIdx ∈ [0; 3], a ∈ [2; 8], b ∈ [1; 9], K ∈ [12; 80], K - 1 không chính phương',
    paramSpecs: [
      { name: 'cIdx', label: 'Chỉ số chọn cơ số c > 1 (0..3)', min: 0, max: 3 },
      { name: 'a', label: 'Hệ số a trên tử số', min: 2, max: 8 },
      { name: 'b', label: 'Hằng số b trên tử số', min: 1, max: 9 },
      { name: 'K', label: 'Hằng số K trong biểu thức lôgarit', min: 12, max: 80 },
    ],
    validateCode: `
      const { cIdx, a, b, K } = params;
      if (cIdx < 0 || cIdx > 3 || a < 2 || a > 8 || b < 1 || b > 9 || K < 12 || K > 80) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const d = K - 1;
      const r = Math.round(Math.sqrt(d));
      if (r * r === d) return { valid: false, reason: 'Cần K - 1 không phải số chính phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { cIdx, a, b, K } = params;
      const base = [2, 3, 5, 10][cIdx];
      const d = K - 1;
      const maxAbs = Math.floor(Math.sqrt(d));
      const ans = 2 * maxAbs + 1;

      return {
        stem: 'Tìm số giá trị nguyên của tham số $m$ để hàm số $y = \\dfrac{' + a + 'x + ' + b + '}{\\sqrt{\\log_{' + base + '}(x^2 - 2mx + ' + K + ')}}$ có tập xác định là $\\mathbb{R}$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Hàm số xác định với mọi $x \\in \\mathbb{R} \\Leftrightarrow \\log_{' + base + '}(x^2 - 2mx + ' + K + ') > 0,\\; \\forall x \\in \\mathbb{R} \\Leftrightarrow x^2 - 2mx + ' + d + ' > 0,\\; \\forall x \\in \\mathbb{R}$.',
          'Điều kiện tương đương $\\Delta\' = m^2 - ' + d + ' < 0 \\Leftrightarrow -\\sqrt{' + d + '} < m < \\sqrt{' + d + '}$.',
          'Vì $m \\in \\mathbb{Z}$ nên $m \\in \\{-' + maxAbs + '; \\dots; ' + maxAbs + '\\}$. Vậy có $' + ans + '$ giá trị nguyên của $m$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên K - 1 chính phương (K = 50 -> 49)', params: { cIdx: 0, a: 4, b: 4, K: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (K = 48 -> |m| < √47 => 13)', params: { cIdx: 0, a: 4, b: 4, K: 48 }, expectedValid: true },
    ],
  },
};
