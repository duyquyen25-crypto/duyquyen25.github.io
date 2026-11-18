import { MathTemplate } from '../types/math';

const GP11_SA_HELPERS = String.raw`
  const round1 = (val) => (val < 0 ? -Math.round(-val * 10) : Math.round(val * 10)) / 10;
  const round3 = (val) => (val < 0 ? -Math.round(-val * 1000) : Math.round(val * 1000)) / 1000;
  const fmtDec1 = (val) => {
    const r = round1(val);
    if (Object.is(r, -0) || r === 0) return '0';
    return Number.isInteger(r) ? String(r) : String(r).replace('.', ',');
  };
  const fmtFixed1 = (val) => {
    const r = round1(val);
    return r.toFixed(1).replace('.', ',');
  };
  const fmtDec2 = (val) => {
    const r = Math.round(val * 100) / 100;
    if (Object.is(r, -0) || r === 0) return '0';
    return Number.isInteger(r) ? String(r) : String(r).replace('.', ',');
  };
  const fmtDec3 = (val) => {
    const r = round3(val);
    if (Object.is(r, -0) || r === 0) return '0';
    return Number.isInteger(r) ? String(r) : String(r).replace('.', ',');
  };
`;

export const G11_B7_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D07 (Q7): Biết u_1, q, tìm chỉ số n khi biết giá trị u_n (Trả lời ngắn)
  t11_b7_d07_find_index_basic_sa: {
    id: 't11_b7_d07_find_index_basic_sa',
    name: 'Tìm vị trí số hạng trong cấp số nhân biết u_1 và q (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Cấp số nhân',
    description: 'Cho u_1, công bội q nguyên và giá trị V. Xác định V là số hạng thứ mấy.',
    conditionSummary: 'u1 ∈ [-6; 6] \\ {0}, q ∈ [-5; 5] \\ {-1, 0, 1}, n ∈ [5; 10], |u_n| ≤ 5·10^7',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -6, max: 6, allowZero: false },
      { name: 'q', label: 'Công bội q', min: -5, max: 5, allowZero: false },
      { name: 'n', label: 'Vị trí cần tìm n', min: 5, max: 10 },
    ],
    validateCode: `
      const { u1, q, n } = params;
      if (u1 === 0 || u1 < -6 || u1 > 6 || q < -5 || q > 5 || Math.abs(q) < 2 || n < 5 || n > 10) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (Math.abs(u1 * Math.pow(q, n - 1)) > 50000000) {
        return { valid: false, reason: 'Số hạng u_n quá lớn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, q, n } = params;
      const qPowVal = Math.pow(q, n - 1);
      const val = u1 * qPowVal;
      const qBase = q < 0 ? '(' + q + ')' : String(q);
      return {
        stem: 'Cho cấp số nhân $(u_n)$ có $u_1 = ' + u1 + ',\\; q = ' + q + '$. Số $' + val + '$ là số hạng thứ mấy?',
        shortAnswer: String(n),
        numericValue: n,
        answerSummary: String(n),
        solutionSteps: [
          'Ta có $u_n = ' + val + ' \\Rightarrow ' + u1 + ' \\cdot ' + qBase + '^{n-1} = ' + val + ' \\Rightarrow ' + qBase + '^{n-1} = ' + qPowVal + '$.',
          'Suy ra $n - 1 = ' + (n - 1) + ' \\Rightarrow n = ' + n + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1', params: { u1: -2, q: 1, n: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (u1=-2, q=-4, V=32768 -> n=8)', params: { u1: -2, q: -4, n: 8 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Hệ u_1 + u_{1+k} = A, u_2 + u_{2+k} = B -> tìm vị trí của V (Trả lời ngắn)
  t11_b7_d08_sys_ratio_find_index_sa: {
    id: 't11_b7_d08_sys_ratio_find_index_sa',
    name: 'Giải hệ tổng hai cặp số hạng CSN tìm vị trí số hạng V (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số nhân',
    description: 'Cho u_1 + u_{1+k} = A và u_2 + u_{2+k} = B. Tìm số hạng V là số hạng thứ mấy.',
    conditionSummary: 'u1 = aNum/aDen (tối giản, aDen | q), q ∈ [2; 6], k ∈ [2; 3], n ∈ [7; 13], V ≤ 2·10^8',
    paramSpecs: [
      { name: 'aNum', label: 'Tử số u1', min: 1, max: 7 },
      { name: 'aDen', label: 'Mẫu số u1', min: 1, max: 6 },
      { name: 'q', label: 'Công bội q', min: 2, max: 6 },
      { name: 'k', label: 'Độ lệch chỉ số k', min: 2, max: 3 },
      { name: 'n', label: 'Vị trí cần tìm n', min: 7, max: 13 },
    ],
    validateCode: `
      const { aNum, aDen, q, k, n } = params;
      if (aNum < 1 || aNum > 7 || aDen < 1 || aDen > 6 || q < 2 || q > 6 || k < 2 || k > 3 || n < 7 || n > 13) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (u.gcd(aNum, aDen) !== 1) return { valid: false, reason: 'u1 chưa tối giản' };
      if (aDen !== 1 && q % aDen !== 0) return { valid: false, reason: 'Yêu cầu aDen = 1 hoặc q chia hết cho aDen' };
      const val = (aNum * Math.pow(q, n - 1)) / aDen;
      if (val > 200000000) return { valid: false, reason: 'Giá trị số hạng V quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aNum, aDen, q, k, n } = params;
      const factor = 1 + Math.pow(q, k);
      const eq1Frac = u.simplifyFrac(aNum * factor, aDen);
      const eq2Frac = u.simplifyFrac(aNum * q * factor, aDen);
      const u1Frac = u.simplifyFrac(aNum, aDen);
      const qPowTarget = Math.pow(q, n - 1);
      const val = (aNum * qPowTarget) / aDen;
      const ratioRHS = Math.pow(q, n - 1);

      return {
        stem: 'Cho cấp số nhân $(u_n)$ có $u_1 + u_{' + (1 + k) + '} = ' + eq1Frac.latex + ',\\; u_2 + u_{' + (2 + k) + '} = ' + eq2Frac.latex + '$. Số $' + val + '$ là số hạng thứ mấy?',
        shortAnswer: String(n),
        numericValue: n,
        answerSummary: String(n),
        solutionSteps: [
          'Ta có $\\left\\{\\begin{array}{l} u_1(1 + q^{' + k + '}) = ' + eq1Frac.latex + ' \\\\ u_1 q(1 + q^{' + k + '}) = ' + eq2Frac.latex + ' \\end{array}\\right. \\Rightarrow \\left\\{\\begin{array}{l} q = ' + q + ' \\\\ u_1 = ' + u1Frac.latex + ' \\end{array}\\right.$.',
          'Từ $u_n = ' + val + ' \\Rightarrow ' + u1Frac.latex + ' \\cdot ' + q + '^{n-1} = ' + val + ' \\Rightarrow ' + q + '^{n-1} = ' + ratioRHS + ' = ' + q + '^{' + (n - 1) + '}$.',
          'Suy ra $n - 1 = ' + (n - 1) + ' \\Rightarrow n = ' + n + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q không chia hết aDen', params: { aNum: 3, aDen: 5, q: 4, k: 3, n: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (u1=3/5, q=5, k=3 -> n=13)', params: { aNum: 3, aDen: 5, q: 5, k: 3, n: 13 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Biết u_p, u_{p+3} và S_n -> tìm n (Trả lời ngắn)
  t11_b7_d09_two_terms_sum_find_n_sa: {
    id: 't11_b7_d09_two_terms_sum_find_n_sa',
    name: 'Biết hai số hạng u_p, u_{p+3} và tổng S_n của CSN tìm n (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số nhân',
    description: 'Cho u_p, u_{p+3} và tổng S_n của cấp số nhân. Tìm số lượng số hạng n.',
    conditionSummary: 'u1 ∈ [-6; 6] \\ {0}, q ∈ [-4; 4] \\ {-1, 0, 1}, p ∈ [2; 5], n ∈ [6; 10], |S_n| ≤ 5·10^6',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -6, max: 6, allowZero: false },
      { name: 'q', label: 'Công bội q', min: -4, max: 4, allowZero: false },
      { name: 'p', label: 'Chỉ số p', min: 2, max: 5 },
      { name: 'n', label: 'Số số hạng n cần tìm', min: 6, max: 10 },
    ],
    validateCode: `
      const { u1, q, p, n } = params;
      if (u1 === 0 || u1 < -6 || u1 > 6 || q < -4 || q > 4 || Math.abs(q) < 2 || p < 2 || p > 5 || n < 6 || n > 10) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const sn = (u1 * (Math.pow(q, n) - 1)) / (q - 1);
      const up3 = u1 * Math.pow(q, p + 2);
      if (Math.abs(sn) > 5000000 || Math.abs(up3) > 500000) {
        return { valid: false, reason: 'Giá trị S_n hoặc u_{p+3} quá lớn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, q, p, n } = params;
      const up = u1 * Math.pow(q, p - 1);
      const up3 = u1 * Math.pow(q, p + 2);
      const q3 = Math.pow(q, 3);
      const qPowN = Math.pow(q, n);
      const sn = (u1 * (qPowN - 1)) / (q - 1);
      const qBase = q < 0 ? '(' + q + ')' : String(q);

      return {
        stem: 'Cho cấp số nhân $(u_n)$ có $u_{' + p + '} = ' + up + ',\\; u_{' + (p + 3) + '} = ' + up3 + ',\\; S_n = ' + sn + '$. Tìm $n$.',
        shortAnswer: String(n),
        numericValue: n,
        answerSummary: String(n),
        solutionSteps: [
          'Ta có $\\frac{u_{' + (p + 3) + '}}{u_{' + p + '}} = q^3 = \\frac{' + up3 + '}{' + up + '} = ' + q3 + ' \\Rightarrow q = ' + q + '$.',
          'Từ $u_1 \\cdot ' + qBase + '^{' + (p - 1) + '} = ' + up + ' \\Rightarrow u_1 = ' + u1 + '$.',
          'Do $S_n = ' + u1 + '\\cdot\\frac{1 - ' + qBase + '^n}{1 - ' + qBase + '} = ' + sn + ' \\Rightarrow ' + qBase + '^n = ' + qPowN + ' = ' + qBase + '^{' + n + '} \\Rightarrow n = ' + n + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 0', params: { u1: -2, q: 0, p: 4, n: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (u4=-128, u7=-8192, Sn=-699050 -> n=10)', params: { u1: -2, q: 4, p: 4, n: 10 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Quả lắc đồng hồ dao động (tổng n cung tròn giảm đều theo tỉ lệ)
  t11_b7_d10_pendulum_arc_sum_sa: {
    id: 't11_b7_d10_pendulum_arc_sum_sa',
    name: 'Bài toán quả lắc đồng hồ tính tổng quãng đường sau n lần dao động (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số nhân',
    description: 'Cung tròn ban đầu L1 cm, mỗi lần kế tiếp bằng r lần lần trước. Tính tổng quãng đường sau n lần.',
    conditionSummary: 'L1 ∈ [25; 65], rPct ∈ [72; 92], n ∈ [8; 16], tránh mốc làm tròn 0,5',
    paramSpecs: [
      { name: 'L1', label: 'Độ dài cung đầu L1 (cm)', min: 25, max: 65 },
      { name: 'rPct', label: 'Tỉ lệ % cung sau so với trước', min: 72, max: 92 },
      { name: 'n', label: 'Số lần dao động n', min: 8, max: 16 },
    ],
    validateCode: `
      const { L1, rPct, n } = params;
      if (L1 < 25 || L1 > 65 || rPct < 72 || rPct > 92 || n < 8 || n > 16) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const r = rPct / 100;
      const sn = (L1 * (1 - Math.pow(r, n))) / (1 - r);
      if (Math.abs((sn - Math.floor(sn)) - 0.5) <= 0.02) {
        return { valid: false, reason: 'Quá sát ngưỡng làm tròn ,5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      ${GP11_SA_HELPERS}
      const { L1, rPct, n } = params;
      const r = rPct / 100;
      const rStr = fmtDec2(r);
      const sn = (L1 * (1 - Math.pow(r, n))) / (1 - r);
      const ans = Math.round(sn);
      return {
        stem: 'Ban đầu, một quả lắc đồng hồ dao động theo một cung tròn dài $' + L1 + '\\text{ cm}$. Sau mỗi lần đu liên tiếp, độ dài của cung tròn bằng $' + rStr + '$ độ dài cung tròn ở ngay lần trước đó. Sau $' + n + '$ lần dao động, quả lắc sẽ đi được quãng đường tổng cộng là bao nhiêu? (Kết quả tính theo centimét và làm tròn đến chữ số hàng đơn vị).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Độ dài cung tròn các lần dao động lập thành cấp số nhân với $u_1 = ' + L1 + '$ và công bội $q = ' + rStr + '$.',
          'Tổng quãng đường sau $' + n + '$ lần dao động là $S_{' + n + '} = ' + L1 + ' \\cdot \\frac{' + rStr + '^{' + n + '} - 1}{' + rStr + ' - 1} \\approx ' + fmtDec2(sn) + ' \\approx ' + ans + '\\text{ (cm)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên L1 ngoài miền', params: { L1: 0, rPct: 86, n: 13 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (L1=43, r=0,86, n=13 -> 264)', params: { L1: 43, rPct: 86, n: 13 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Khấu hao giá trị ô tô theo phần trăm mỗi năm (Trả lời ngắn)
  t11_b7_d11_car_depreciation_sa: {
    id: 't11_b7_d11_car_depreciation_sa',
    name: 'Bài toán khấu hao giá trị ô tô theo tỉ lệ phần trăm mỗi năm (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số nhân',
    description: 'Ô tô mua giá V0 triệu đồng, mỗi năm giá trị giảm p%. Tính giá trị còn lại sau n năm.',
    conditionSummary: 'v0 ∈ [450; 950], rPct ∈ [4; 12], n ∈ [6; 16], tránh mốc làm tròn 0,5',
    paramSpecs: [
      { name: 'v0', label: 'Giá mua ban đầu (triệu đồng)', min: 450, max: 950, step: 10 },
      { name: 'rPct', label: 'Tỉ lệ giảm hàng năm (%)', min: 4, max: 12 },
      { name: 'n', label: 'Số năm sử dụng n', min: 6, max: 16 },
    ],
    validateCode: `
      const { v0, rPct, n } = params;
      if (v0 < 450 || v0 > 950 || rPct < 4 || rPct > 12 || n < 6 || n > 16) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const val = v0 * Math.pow(1 - rPct / 100, n);
      if (Math.abs((val - Math.floor(val)) - 0.5) <= 0.02) {
        return { valid: false, reason: 'Quá sát ngưỡng làm tròn ,5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      ${GP11_SA_HELPERS}
      const { v0, rPct, n } = params;
      const val = v0 * Math.pow(1 - rPct / 100, n);
      const ans = Math.round(val);
      return {
        stem: 'Một gia đình mua một chiếc ô tô giá $' + v0 + '$ triệu đồng. Trung bình sau mỗi năm sử dụng, giá trị còn lại của ô tô giảm đi $' + rPct + '\\%$ (so với năm trước đó). Sau $' + n + '$ năm, giá trị của ô tô ước tính còn bao nhiêu triệu đồng? (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Giá trị còn lại sau $n$ năm là $u_n = ' + v0 + '\\left(1 - ' + rPct + '\\%\\right)^n$ (triệu đồng).',
          'Sau $' + n + '$ năm sử dụng, giá trị còn lại là $T = ' + v0 + '\\left(1 - ' + rPct + '\\%\\right)^{' + n + '} \\approx ' + fmtDec2(val) + ' \\approx ' + ans + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v0 = 0', params: { v0: 0, rPct: 7, n: 14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (v0=660, r=7%, n=14 -> 239)', params: { v0: 660, rPct: 7, n: 14 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Tốc độ lây lan dịch bệnh theo tuần (tổng triệu người, làm tròn hàng phần mười)
  t11_b7_d12_epidemic_spread_sa: {
    id: 't11_b7_d12_epidemic_spread_sa',
    name: 'Bài toán sự lây lan dịch bệnh theo cấp số nhân (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số nhân',
    description: 'Tuần đầu có u1 người bệnh, mỗi người lây cho q người ở cuối tuần sau. Tính tổng số người mắc đến hết tuần n (triệu người).',
    conditionSummary: 'u1 ∈ [2; 9], q ∈ [3; 6], n ∈ [8; 12], tổng ∈ [0,5; 500] triệu, tránh mốc ,x5',
    paramSpecs: [
      { name: 'u1', label: 'Số người tuần đầu u1', min: 2, max: 9 },
      { name: 'q', label: 'Số người lây thêm q', min: 3, max: 6 },
      { name: 'n', label: 'Số tuần n', min: 8, max: 12 },
    ],
    validateCode: `
      const { u1, q, n } = params;
      if (u1 < 2 || u1 > 9 || q < 3 || q > 6 || n < 8 || n > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const totalMil = (u1 * (Math.pow(q, n) - 1)) / ((q - 1) * 1e6);
      if (totalMil < 0.5 || totalMil > 500) {
        return { valid: false, reason: 'Tổng số người ngoài khoảng [0,5; 500] triệu' };
      }
      const scaled = totalMil * 10;
      if (Math.abs((scaled - Math.floor(scaled)) - 0.5) <= 0.02) {
        return { valid: false, reason: 'Quá sát ngưỡng làm tròn phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      ${GP11_SA_HELPERS}
      const { u1, q, n } = params;
      const total = (u1 * (Math.pow(q, n) - 1)) / (q - 1);
      const totalMil = total / 1e6;
      const ansNum = round1(totalMil);
      const ansStr = fmtFixed1(totalMil);
      return {
        stem: 'Các bệnh truyền nhiễm có thể lây lan rất nhanh. Giả sử có $' + u1 + '$ người bị bệnh trong tuần đầu tiên của một đợt dịch, và mỗi người bị bệnh sẽ lây bệnh cho $' + q + '$ người vào cuối tuần tiếp theo. Tính đến hết tuần thứ $' + n + '$ của đợt dịch, có tổng cộng bao nhiêu người đã bị lây bởi căn bệnh này (đơn vị tính: triệu người, kết quả làm tròn đến hàng phần mười)?',
        shortAnswer: ansStr,
        numericValue: ansNum,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $u_n$ là số người bị bệnh ở cuối tuần thứ $n$. Dãy $(u_n)$ là cấp số nhân với $u_1 = ' + u1 + ',\\; q = ' + q + '$.',
          'Tổng số người bị lây đến hết tuần thứ $' + n + '$ là $S_{' + n + '} = ' + u1 + ' \\cdot \\frac{' + q + '^{' + n + '} - 1}{' + q + ' - 1} = ' + total + '$ (người) $\\approx ' + ansStr + '$ (triệu người).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q ngoài miền', params: { u1: 5, q: 1, n: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (u1=5, q=5, n=11 -> 61,0)', params: { u1: 5, q: 5, n: 11 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Quả bóng cao su nảy lên (cấp số nhân lùi vô hạn)
  t11_b7_d13_bouncing_ball_infinite_gp_sa: {
    id: 't11_b7_d13_bouncing_ball_infinite_gp_sa',
    name: 'Bài toán thả bóng cao su - tổng cấp số nhân lùi vô hạn (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số nhân',
    description: 'Thả bóng từ độ cao h0 m, mỗi lần nảy lên bằng rNum/rDen độ cao trước đó. Tính tổng quãng đường đến khi dừng hẳn.',
    conditionSummary: 'h0 ∈ [6; 30], 1 ≤ rNum < rDen ≤ 6, gcd = 1, (h0·(rDen + rNum)) chia hết (rDen - rNum)',
    paramSpecs: [
      { name: 'h0', label: 'Độ cao thả ban đầu h0 (m)', min: 6, max: 30 },
      { name: 'rNum', label: 'Tử số tỉ lệ nảy rNum', min: 1, max: 5 },
      { name: 'rDen', label: 'Mẫu số tỉ lệ nảy rDen', min: 2, max: 6 },
    ],
    validateCode: `
      const { h0, rNum, rDen } = params;
      if (h0 < 6 || h0 > 30 || rNum < 1 || rDen < 2 || rDen > 6 || rNum >= rDen) {
        return { valid: false, reason: 'Tham số độ cao hoặc tỉ lệ nảy ngoài miền' };
      }
      if (u.gcd(rNum, rDen) !== 1) return { valid: false, reason: 'Phân số tỉ lệ chưa tối giản' };
      if ((h0 * (rDen + rNum)) % (rDen - rNum) !== 0) {
        return { valid: false, reason: 'Tổng quãng đường cần là số nguyên' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h0, rNum, rDen } = params;
      const downFrac = u.simplifyFrac(h0 * rDen, rDen - rNum);
      const ans = (h0 * (rDen + rNum)) / (rDen - rNum);
      const rLatex = '\\frac{' + rNum + '}{' + rDen + '}';
      return {
        stem: 'Bạn Quang Minh thả quả bóng cao su từ độ cao $' + h0 + '\\text{ m}$ theo phương thẳng đứng. Mỗi khi chạm đất nó lại nảy lên theo phương thẳng đứng có độ cao bằng $' + rLatex + '$ độ cao trước đó. Tính tổng quãng đường bóng đi được đến khi bóng dừng hẳn.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Các quãng đường khi bóng đi xuống lập thành một cấp số nhân lùi vô hạn có $u_1 = ' + h0 + ',\\; q = ' + rLatex + '$.',
          'Tổng các quãng đường khi bóng đi xuống là $S = \\frac{' + h0 + '}{1 - ' + rLatex + '} = ' + downFrac.latex + '$.',
          'Tổng quãng đường bóng đi được đến khi dừng hẳn là $2S - ' + h0 + ' = ' + ans + '\\text{ (m)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rNum = rDen', params: { h0: 10, rNum: 3, rDen: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (h0=10, q=3/4 -> 70)', params: { h0: 10, rNum: 3, rDen: 4 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Tăng trưởng dân số ổn định (Trả lời ngắn)
  t11_b7_d14_population_growth_sa: {
    id: 't11_b7_d14_population_growth_sa',
    name: 'Bài toán tăng trưởng dân số theo tỉ lệ phần trăm ổn định (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số nhân',
    description: 'Dân số ban đầu P0 triệu người, tăng r%/năm trong k năm. Tính dân số sau k năm (làm tròn phần mười).',
    conditionSummary: 'p0 ∈ [1,50; 4,50], r ∈ [0,5%; 2,5%], years ∈ [5; 12], tránh mốc ,x5',
    paramSpecs: [
      { name: 'p0Hundredths', label: 'Dân số P0 × 100 (triệu)', min: 150, max: 450, step: 5 },
      { name: 'rTenths', label: 'Tỉ lệ tăng × 10 (%)', min: 5, max: 25 },
      { name: 'y0', label: 'Năm mốc ban đầu', min: 2022, max: 2025 },
      { name: 'years', label: 'Số năm trôi qua', min: 5, max: 12 },
    ],
    validateCode: `
      const { p0Hundredths, rTenths, y0, years } = params;
      if (p0Hundredths < 150 || p0Hundredths > 450 || rTenths < 5 || rTenths > 25 || y0 < 2022 || y0 > 2025 || years < 5 || years > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const p0 = p0Hundredths / 100;
      const r = rTenths / 10;
      const pop = p0 * Math.pow(1 + r / 100, years);
      const scaled = pop * 10;
      if (Math.abs((scaled - Math.floor(scaled)) - 0.5) <= 0.02) {
        return { valid: false, reason: 'Quá sát ngưỡng làm tròn phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      ${GP11_SA_HELPERS}
      const { p0Hundredths, rTenths, y0, years } = params;
      const p0 = p0Hundredths / 100;
      const r = rTenths / 10;
      const p0Str = fmtDec2(p0);
      const rStr = fmtDec1(r);
      const yEnd = y0 + years;
      const pop = p0 * Math.pow(1 + r / 100, years);
      const ansNum = round1(pop);
      const ansStr = fmtFixed1(pop);
      return {
        stem: 'Biết rằng vào ngày 01/11/' + y0 + ', dân số của thành phố Y có khoảng $' + p0Str + '$ (triệu người). Nếu tỉ lệ tăng dân số của thành phố Y là $' + rStr + '\\%/\\text{năm}$ và giữ ổn định qua các năm thì vào ngày 01/11/' + yEnd + ', dân số của thành phố Y là bao nhiêu triệu người (kết quả làm tròn đến hàng phần mười)?',
        shortAnswer: ansStr,
        numericValue: ansNum,
        answerSummary: ansStr,
        solutionSteps: [
          'Dân số của thành phố Y sau $' + years + '$ năm là $S = ' + p0Str + '\\left(1 + ' + rStr + '\\%\\right)^{' + years + '} \\approx ' + fmtDec3(pop) + ' \\approx ' + ansStr + '$ (triệu người).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dân số = 0', params: { p0Hundredths: 0, rTenths: 8, y0: 2024, years: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (P0=2,45, r=0,8%, 9 năm -> 2,6)', params: { p0Hundredths: 245, rTenths: 8, y0: 2024, years: 9 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Lát gạch nền tòa tháp nhiều tầng diện tích giảm dần theo cấp số nhân
  t11_b7_d15_tower_tiling_bricks_sa: {
    id: 't11_b7_d15_tower_tiling_bricks_sa',
    name: 'Bài toán lát gạch nền tòa tháp diện tích giảm theo cấp số nhân (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cấp số nhân',
    description: 'Tháp có k tầng, tầng trên bằng p% tầng dưới, gạch vuông kích thước cạnh c cm. Tính số viên gạch tối thiểu.',
    conditionSummary: 'tileDm ∈ {5, 6, 8}, floors ∈ [4; 8], ratioPct ∈ [70; 90], area1 ∈ [30; 80], tránh sát số nguyên',
    paramSpecs: [
      { name: 'tileDm', label: 'Cạnh viên gạch (dm, khác 7)', min: 5, max: 8 },
      { name: 'floors', label: 'Số tầng của tháp', min: 4, max: 8 },
      { name: 'ratioPct', label: 'Tỉ lệ diện tích tầng trên (%)', min: 70, max: 90, step: 5 },
      { name: 'area1', label: 'Diện tích sàn tầng 1 (m^2)', min: 30, max: 80, step: 5 },
    ],
    validateCode: `
      const { tileDm, floors, ratioPct, area1 } = params;
      if (tileDm < 5 || tileDm > 8 || tileDm === 7) return { valid: false, reason: 'Cỡ gạch chọn trong {50, 60, 80} cm' };
      if (floors < 4 || floors > 8 || ratioPct < 70 || ratioPct > 90 || area1 < 30 || area1 > 80) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const r = ratioPct / 100;
      const totalArea = area1 * ((1 - Math.pow(r, floors)) / (1 - r));
      const tileSideM = tileDm / 10;
      const bricksExact = totalArea / (tileSideM * tileSideM);
      if (Math.abs(bricksExact - Math.round(bricksExact)) <= 0.02) {
        return { valid: false, reason: 'Số viên gạch sát số nguyên' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      ${GP11_SA_HELPERS}
      const { tileDm, floors, ratioPct, area1 } = params;
      const tileCm = tileDm * 10;
      const tileSideM = tileDm / 10;
      const tileSideStr = fmtDec1(tileSideM);
      const r = ratioPct / 100;
      const rFrac = u.simplifyFrac(ratioPct, 100);
      const totalArea = area1 * ((1 - Math.pow(r, floors)) / (1 - r));
      const tileArea = tileSideM * tileSideM;
      const bricksExact = totalArea / tileArea;
      const ans = Math.ceil(bricksExact);

      return {
        stem: 'Một đội thợ công nhân dùng gạch cỡ $' + tileCm + '\\times ' + tileCm + '\\text{ cm}$ để lát nền cho một toà tháp gồm $' + floors + '$ tầng theo cấu trúc diện tích mặt sàn của tầng trên bằng $' + ratioPct + '\\%$ diện tích mặt sàn của tầng dưới. Biết diện tích tầng 1 của tháp là $' + area1 + '\\text{ m}^2$. Hỏi đội công nhân dự định dùng tối thiểu bao nhiêu viên gạch?',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Diện tích mặt sàn các tầng từ tầng 1 đến tầng $' + floors + '$ lập thành cấp số nhân với $S_1 = ' + area1 + '$ và công bội $q = ' + rFrac.latex + '$.',
          'Tổng diện tích mặt sàn là $S = ' + area1 + ' \\cdot \\frac{1 - \\left(' + rFrac.latex + '\\right)^{' + floors + '}}{1 - ' + rFrac.latex + '} \\approx ' + fmtDec3(totalArea) + '\\text{ (m}^2\\text{)}$.',
          'Số viên gạch cần dùng là $\\frac{S}{' + tileSideStr + ' \\cdot ' + tileSideStr + '} \\approx ' + fmtDec3(bricksExact) + '$, suy ra cần tối thiểu $' + ans + '$ viên gạch.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tileDm = 7 (loại trừ)', params: { tileDm: 7, floors: 6, ratioPct: 80, area1: 45 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (80x80cm, 6 tầng, 80%, 45m2 -> 260)', params: { tileDm: 8, floors: 6, ratioPct: 80, area1: 45 }, expectedValid: true },
    ],
  },
};
