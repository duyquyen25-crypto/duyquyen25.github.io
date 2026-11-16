import { MathTemplate } from '../types/math';

const TRIG11_B1_MC_HELPERS = String.raw`
  const gcd = (x, y) => {
    let a = Math.abs(Math.round(x));
    let b = Math.abs(Math.round(y));
    while (b !== 0) { const t = b; b = a % b; a = t; }
    return a || 1;
  };
  const fmtPiFrac = (num, den) => {
    const f = u.simplifyFrac(num, den);
    if (f.num === 0) return '0';
    if (f.den === 1) {
      if (f.num === 1) return '\\pi';
      if (f.num === -1) return '-\\pi';
      return f.num + '\\pi';
    }
    const sign = f.num < 0 ? '-' : '';
    const absN = Math.abs(f.num);
    return sign + '\\frac{' + (absN === 1 ? '' : absN) + '\\pi}{' + f.den + '}';
  };
  const simplifyRad = (rad) => {
    const rAbs = Math.abs(Math.round(rad));
    if (rAbs === 0) return { k: 0, r: 1 };
    let k = 1, rem = rAbs;
    for (let d = 2; d * d <= rem; d++) {
      while (rem % (d * d) === 0) {
        k *= d;
        rem /= d * d;
      }
    }
    return { k, r: rem };
  };
  const fmtRadFrac = (coef, rad, den) => {
    if (coef === 0 || rad === 0) return '0';
    let s = simplifyRad(rad);
    let c = coef * s.k;
    let d = den;
    if (d < 0) { c = -c; d = -d; }
    const g = gcd(c, d);
    c /= g;
    d /= g;
    if (s.r === 1) {
      return u.simplifyFrac(c, d).latex;
    }
    const sign = c < 0 ? '-' : '';
    const absC = Math.abs(c);
    const numStr = (absC === 1 ? '' : String(absC)) + '\\sqrt{' + s.r + '}';
    if (d === 1) return sign + numStr;
    return sign + '\\frac{' + numStr + '}{' + d + '}';
  };
  const fmtIntervalHalfPi = (m) => {
    const left = m === 0 ? '0' : fmtPiFrac(m, 2);
    const right = (m + 1) === 0 ? '0' : fmtPiFrac(m + 1, 2);
    return '\\left( ' + left + '; ' + right + ' \\right)';
  };
`;

export const G11_B1_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Đổi số đo góc từ độ (bội của 5°) sang radian
  t11_b1_d01_deg5_to_rad_mc: {
    id: 't11_b1_d01_deg5_to_rad_mc',
    name: 'Đổi số đo góc (bội 5°) từ độ sang radian',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đổi đơn vị đo góc lượng giác',
    description: 'Đổi số đo góc α = 5k° (với k ≠ 0, α không phải bội của 180°) sang radian.',
    conditionSummary: 'k ∈ [-45; 45], k không chia hết cho 36 để tránh góc tầm thường',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k (góc 5k°)', min: -40, max: 40 },
    ],
    validateCode: `
      const { k } = params;
      if (k === 0 || k % 36 === 0) {
        return { valid: false, reason: 'Tránh góc 0° hoặc bội nguyên của 180° quá tầm thường' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const deg = 5 * k;
      const ansLatex = fmtPiFrac(deg, 180);
      const correct = '$' + ansLatex + '$';
      const w1 = '$' + fmtPiFrac(deg + 10, 180) + '$';
      const w2 = '$' + fmtPiFrac(deg - 10, 180) + '$';
      const w3 = '$' + fmtPiFrac(deg + 30, 180) + '$';
      const w4 = '$' + fmtPiFrac(-deg, 180) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3, w4],
        rng,
        (step) => '$' + fmtPiFrac(deg + step * 5, 180) + '$'
      );
      return {
        stem: 'Đổi số đo của góc $' + deg + '^\\circ$ sang radian ta được kết quả bằng',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức chuyển đổi $\\alpha_{\\text{rad}} = \\dfrac{\\alpha^\\circ \\cdot \\pi}{180}$.',
          'Ta có $' + deg + '^\\circ = \\dfrac{' + deg + '\\cdot \\pi}{180} = ' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (góc 0°)', params: { k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (-105°)', params: { k: -21 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Đổi số đo góc từ radian sang độ
  t11_b1_d02_rad_to_deg_mc: {
    id: 't11_b1_d02_rad_to_deg_mc',
    name: 'Đổi số đo góc từ radian sang độ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đổi đơn vị đo góc lượng giác',
    description: 'Đổi góc radian dạng pπ/q sang đơn vị độ (có thể âm hoặc lớn hơn 2π).',
    conditionSummary: 'q ∈ {3, 4, 6, 12}, p ≠ 0 và gcd(|p|, q) = 1',
    paramSpecs: [
      { name: 'p', label: 'Tử số p của pπ/q', min: -18, max: 18 },
      { name: 'qIdx', label: 'Mẫu số (0:3, 1:4, 2:6, 3:12)', min: 0, max: 3 },
    ],
    validateCode: `
      const { p, qIdx } = params;
      const qs = [3, 4, 6, 12];
      const q = qs[qIdx];
      if (!q || p === 0) return { valid: false, reason: 'p = 0 tạo góc 0°' };
      let a = Math.abs(p), b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, qIdx } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const qs = [3, 4, 6, 12];
      const q = qs[qIdx];
      const deg = (p * 180) / q;
      const radLatex = fmtPiFrac(p, q);
      const correct = '$' + deg + '^\\circ$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + (deg + 10) + '^\\circ$',
          '$' + (deg - 45) + '^\\circ$',
          '$' + (deg + 30) + '^\\circ$',
          '$' + (-deg) + '^\\circ$',
        ],
        rng,
        (step) => '$' + (deg + step * 15) + '^\\circ$'
      );
      return {
        stem: 'Đổi số đo của góc $' + radLatex + '$ sang độ ta được kết quả bằng',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức chuyển đổi $\\alpha^\\circ = \\left(\\dfrac{\\alpha_{\\text{rad}}\\cdot 180}{\\pi}\\right)^\\circ$.',
          'Ta có $' + radLatex + ' = \\left(\\dfrac{' + p + '\\cdot 180}{' + q + '}\\right)^\\circ = ' + deg + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { p: 0, qIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (-14π/3)', params: { p: -14, qIdx: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Tìm góc trong (0; 2π) có cùng điểm biểu diễn trên ĐTLG
  t11_b1_d03_same_point_coterminal_mc: {
    id: 't11_b1_d03_same_point_coterminal_mc',
    name: 'Tìm góc lượng giác có cùng điểm biểu diễn trên đường tròn lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biểu diễn góc trên đường tròn lượng giác',
    description: 'Cho góc lớn α + k2π, tìm góc thuộc (0; 2π) có cùng điểm biểu diễn trên đường tròn lượng giác.',
    conditionSummary: '0 < r < 2d, gcd(r, d) = 1 và kTurn ∈ {1, 2, 3}',
    paramSpecs: [
      { name: 'dIdx', label: 'Mẫu số (0:20, 1:24, 2:30, 3:36)', min: 0, max: 3 },
      { name: 'r', label: 'Tử số góc gốc r', min: 1, max: 45 },
      { name: 'kTurn', label: 'Số vòng quay thêm (k)', min: 1, max: 3 },
    ],
    validateCode: `
      const { dIdx, r, kTurn } = params;
      const ds = [20, 24, 30, 36];
      const d = ds[dIdx];
      if (!d || r <= 0 || r >= 2 * d || r === d) return { valid: false, reason: 'Góc cơ sở r/d phải thuộc (0; 2) và khác 1' };
      if (kTurn < 1 || kTurn > 5) return { valid: false, reason: 'Số vòng quay k phải >= 1' };
      let a = r, b = d;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Cần gcd(r, d) = 1 để phân số tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { dIdx, r, kTurn } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const ds = [20, 24, 30, 36];
      const d = ds[dIdx];
      const bigNum = r + 2 * kTurn * d;
      const bigLatex = fmtPiFrac(bigNum, d);
      const ansLatex = fmtPiFrac(r, d);
      const correct = '$' + ansLatex + '$';
      const w1 = '$' + fmtPiFrac(r + 2, d) + '$';
      const w2 = '$' + fmtPiFrac(r === 1 ? 3 : r - 1, d) + '$';
      const w3 = '$' + fmtPiFrac((r + 5) % (2 * d) || 1, d) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + fmtPiFrac(((r + step * 3) % (2 * d)) || 1, d) + '$'
      );
      return {
        stem: 'Góc lượng giác $' + bigLatex + '$ có cùng điểm biểu diễn trên đường tròn lượng giác với góc lượng giác nào sau đây?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phân tích góc đã cho theo bội của $2\\pi$:',
          '$' + bigLatex + ' = ' + ansLatex + ' + ' + kTurn + '\\cdot 2\\pi$.',
          'Vậy góc $' + bigLatex + '$ có cùng điểm biểu diễn trên đường tròn lượng giác với góc $' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r >= 2d (vượt 1 vòng)', params: { dIdx: 0, r: 41, kTurn: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (173π/36)', params: { dIdx: 3, r: 29, kTurn: 2 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Nhận diện góc từ điểm biểu diễn đỏ trên trục ĐTLG (kèm hình SVG + TikZ)
  t11_b1_d04_unit_circle_point_identify_mc: {
    id: 't11_b1_d04_unit_circle_point_identify_mc',
    name: 'Nhận diện góc lượng giác từ điểm đánh dấu trên đường tròn lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tròn lượng giác',
    description: 'Cho điểm đánh dấu trên đường tròn lượng giác tại góc cơ bản (0°, 90°, 180°, 270°). Chọn góc lượng giác có điểm biểu diễn trùng với điểm đó.',
    conditionSummary: 'degIdx ∈ {0, 1, 2, 3}, kTurn ∈ {1, 2, 3}',
    paramSpecs: [
      { name: 'degIdx', label: 'Vị trí điểm (0:0°, 1:90°, 2:180°, 3:270°)', min: 0, max: 3 },
      { name: 'kTurn', label: 'Số vòng quay k (1..3)', min: 1, max: 3 },
    ],
    validateCode: `
      const { degIdx, kTurn } = params;
      if (degIdx < 0 || degIdx > 3 || kTurn < 1 || kTurn > 5) {
        return { valid: false, reason: 'Chỉ số vị trí hoặc vòng quay không hợp lệ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { degIdx, kTurn } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const degs = [0, 90, 180, 270];
      const baseNums = [0, 1, 2, 3];
      const deg = degs[degIdx];
      const baseNum = baseNums[degIdx];
      const ansNum = baseNum + 4 * kTurn;
      const ansLatex = fmtPiFrac(ansNum, 2);
      const baseLatex = fmtPiFrac(baseNum, 2);
      const correct = '$' + ansLatex + '$';
      const wCandidates = [
        '$' + fmtPiFrac(ansNum + 2, 2) + '$',
        '$' + fmtPiFrac(ansNum + 1, 2) + '$',
        '$' + fmtPiFrac(ansNum + 3, 2) + '$',
        '$\\frac{' + (2 * kTurn + 1) + '\\pi}{4}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wCandidates,
        rng,
        (step) => '$\\frac{' + (4 * step + 1) + '\\pi}{4}$'
      );
      return {
        stem: 'Điểm biểu diễn trên đường tròn lượng giác như hình vẽ bên là của góc lượng giác nào sau đây?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b1_unit_circle_point',
          params: { deg },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điểm đánh dấu trên hình ứng với góc cơ bản $' + baseLatex + '$.',
          'Ta có $' + ansLatex + ' = ' + baseLatex + ' + ' + kTurn + '\\cdot 2\\pi$, nên $' + ansLatex + '$ có điểm biểu diễn trùng với điểm đã cho.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên degIdx ngoài [0..3]', params: { degIdx: 4, kTurn: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (5π tại 180°)', params: { degIdx: 2, kTurn: 2 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Họ số đo mọi góc có cùng tia đầu và tia cuối
  t11_b1_d05_coterminal_family_mc: {
    id: 't11_b1_d05_coterminal_family_mc',
    name: 'Công thức tổng quát các góc có cùng tia đầu và tia cuối',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Số đo góc lượng giác',
    description: 'Cho góc α₀, xác định dạng tổng quát α₀ + k2π (k ∈ Z) của mọi góc lượng giác có cùng tia đầu và tia cuối.',
    conditionSummary: '1 <= p < q, gcd(p, q) = 1, q ∈ {3, 4, 6}',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 5 },
      { name: 'qIdx', label: 'Mẫu số (0:3, 1:4, 2:6)', min: 0, max: 2 },
    ],
    validateCode: `
      const { p, qIdx } = params;
      const qs = [3, 4, 6];
      const q = qs[qIdx];
      if (!q || p <= 0 || p >= q) return { valid: false, reason: 'Cần 0 < p < q' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, qIdx } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const qs = [3, 4, 6];
      const q = qs[qIdx];
      const a0 = fmtPiFrac(p, q);
      const correct = '$' + a0 + '+k2\\pi, k\\in \\mathbb{Z}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + a0 + '+k4\\pi, k\\in \\mathbb{Z}$',
          '$' + a0 + '+\\dfrac{k\\pi}{3}, k\\in \\mathbb{Z}$',
          '$' + a0 + '+k3\\pi, k\\in \\mathbb{Z}$',
        ],
        rng,
        (step) => '$' + a0 + '+k' + (step + 4) + '\\pi, k\\in \\mathbb{Z}$'
      );
      return {
        stem: 'Trên đường tròn lượng giác, cho góc lượng giác có số đo $' + a0 + '$ thì mọi góc lượng giác có cùng tia đầu và tia cuối với góc lượng giác trên đều có số đo dạng nào trong các dạng sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai góc lượng giác có cùng tia đầu và tia cuối sai khác nhau một bội nguyên của $2\\pi$.',
          'Do đó mọi góc cần tìm đều có dạng $' + a0 + ' + k2\\pi, k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p/q chưa tối giản', params: { p: 2, qIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (π/4)', params: { p: 1, qIdx: 1 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Điểm N đối xứng M qua Ox -> họ góc lượng giác của điểm N
  t11_b1_d06_symmetry_ox_family_mc: {
    id: 't11_b1_d06_symmetry_ox_family_mc',
    name: 'Họ góc lượng giác của điểm đối xứng qua trục Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính đối xứng trên đường tròn lượng giác',
    description: 'Cho điểm M biểu diễn góc α₀. Điểm N đối xứng với M qua trục Ox biểu diễn cho họ góc -α₀ + k2π (k ∈ Z).',
    conditionSummary: '0 < p < q, gcd(p, q) = 1, q ∈ {3, 4, 5, 6}',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 5 },
      { name: 'qIdx', label: 'Mẫu số (0:3, 1:4, 2:5, 3:6)', min: 0, max: 3 },
    ],
    validateCode: `
      const { p, qIdx } = params;
      const qs = [3, 4, 5, 6];
      const q = qs[qIdx];
      if (!q || p <= 0 || p >= q) return { valid: false, reason: 'Cần 0 < p < q' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Cần p/q tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, qIdx } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const qs = [3, 4, 5, 6];
      const q = qs[qIdx];
      const a0 = fmtPiFrac(p, q);
      const negA0 = fmtPiFrac(-p, q);
      const correct = '$' + negA0 + '+k2\\pi, k\\in \\mathbb{Z}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + a0 + '+\\dfrac{k\\pi}{4}, k\\in \\mathbb{Z}$',
          '$' + a0 + '+k4\\pi, k\\in \\mathbb{Z}$',
          '$' + a0 + '+k2\\pi, k\\in \\mathbb{Z}$',
        ],
        rng,
        (step) => '$' + negA0 + '+k' + (step + 3) + '\\pi, k\\in \\mathbb{Z}$'
      );
      return {
        stem: 'Trên đường tròn lượng giác, cho góc lượng giác $' + a0 + '$ có điểm biểu diễn là $M$. Điểm $N$ đối xứng với $M$ qua trục $Ox$. Khi đó điểm $N$ là điểm biểu diễn cho các góc lượng giác nào sau đây?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $N$ đối xứng với $M$ qua trục hoành $Ox$ nên một góc lượng giác có điểm biểu diễn $N$ là $' + negA0 + '$.',
          'Do đó điểm $N$ biểu diễn cho họ góc $' + negA0 + ' + k2\\pi, k \\in \\mathbb{Z}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p >= q', params: { p: 6, qIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (π/6)', params: { p: 1, qIdx: 3 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Đếm số điểm biểu diễn của góc α0 + k(2π/m) trên ĐTLG
  t11_b1_d07_count_points_on_circle_mc: {
    id: 't11_b1_d07_count_points_on_circle_mc',
    name: 'Đếm số điểm biểu diễn của họ góc lượng giác trên đường tròn lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biểu diễn góc trên đường tròn lượng giác',
    description: 'Xác định số điểm biểu diễn phân biệt của họ góc a = pπ/q + k·2π/m (k ∈ Z) trên đường tròn lượng giác.',
    conditionSummary: 'm ∈ [3; 12], gcd(p, q) = 1',
    paramSpecs: [
      { name: 'p', label: 'Tử số góc gốc p', min: 1, max: 9 },
      { name: 'q', label: 'Mẫu số góc gốc q', min: 5, max: 13 },
      { name: 'm', label: 'Số điểm biểu diễn m', min: 3, max: 12 },
    ],
    validateCode: `
      const { p, q, m } = params;
      if (m < 3 || m > 15 || p <= 0 || q <= p) return { valid: false, reason: 'Tham số ngoài miền' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q phải tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, m } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const a0 = fmtPiFrac(p, q);
      const stepPi = fmtPiFrac(2, m);
      const correct = '$' + m + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + Math.max(2, m - 2) + '$', '$' + Math.max(2, m - 4) + '$', '$' + (m + 1) + '$', '$' + (m + 3) + '$'],
        rng,
        (step) => '$' + (m + step + 1) + '$'
      );
      return {
        stem: 'Số điểm biểu diễn của góc $a = ' + a0 + ' + k' + stepPi + '\\, (k\\in \\mathbb{Z})$ trên đường tròn lượng giác là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Khi $k$ chạy qua các số nguyên, sau đúng $m = ' + m + '$ bước thì góc tăng thêm $m\\cdot ' + stepPi + ' = 2\\pi$, quay về điểm ban đầu.',
          'Vậy góc lượng giác $' + a0 + ' + k' + stepPi + '$ có $' + m + '$ điểm biểu diễn trên đường tròn lượng giác.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m < 3', params: { p: 1, q: 5, m: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (m = 7)', params: { p: 7, q: 11, m: 7 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Đọc điểm biểu diễn góc bội π/3 (hình 4 điểm M, N, P, Q ở góc 60°, n âm)
  t11_b1_d08_read_point_60deg_neg_mc: {
    id: 't11_b1_d08_read_point_60deg_neg_mc',
    name: 'Đọc điểm biểu diễn góc âm bội π/3 trên hình đường tròn lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tròn lượng giác',
    description: 'Từ hình đường tròn lượng giác có 4 điểm M, N, P, Q đối xứng ứng với góc 60°, tìm điểm biểu diễn góc nπ/3 (n âm, không chia hết cho 3).',
    conditionSummary: 'n ∈ [-11; -1] và n không chia hết cho 3',
    paramSpecs: [
      { name: 'n', label: 'Tử số n của nπ/3 (âm)', min: -11, max: -1 },
    ],
    validateCode: `
      const { n } = params;
      if (n >= 0 || n % 3 === 0) return { valid: false, reason: 'n phải âm và không chia hết cho 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const rem = ((n % 6) + 6) % 6;
      const ptMap = { 1: 'M', 2: 'N', 4: 'P', 5: 'Q' };
      const baseNumMap = { 1: 1, 2: 2, 4: -2, 5: -1 };
      const pt = ptMap[rem];
      const baseNum = baseNumMap[rem];
      const angLatex = fmtPiFrac(n, 3);
      const baseLatex = fmtPiFrac(baseNum, 3);
      const correct = 'Điểm $' + pt + '$';
      const allPts = ['M', 'N', 'P', 'Q', "A'", "B'", 'B'];
      const distractors = allPts.filter((x) => x !== pt).map((x) => 'Điểm $' + x + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (step) => 'Điểm $K_' + step + '$'
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, cho đường tròn lượng giác như hình vẽ bên dưới. Điểm biểu diễn của góc có số đo bằng $' + angLatex + '$ là điểm nào trong các điểm sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b1_unit_circle_quad_sym',
          params: { baseDeg: 60, showArc: 1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + angLatex + '$ có cùng điểm biểu diễn với góc $' + baseLatex + '$.',
          'Quan sát hình vẽ đường tròn lượng giác với góc cơ sở $60^\\circ$, điểm biểu diễn tương ứng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n chia hết cho 3', params: { n: -6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (-5π/3)', params: { n: -5 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Đọc điểm biểu diễn góc bội π/2 trên hình A, A', B, B'
  t11_b1_d09_read_point_axes_mc: {
    id: 't11_b1_d09_read_point_axes_mc',
    name: 'Đọc điểm biểu diễn góc bội π/2 trên bốn điểm trục đường tròn lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tròn lượng giác',
    description: 'Cho hình đường tròn lượng giác với bốn giao điểm trục A, A\', B, B\'. Xác định điểm biểu diễn của góc nπ/2.',
    conditionSummary: 'n ∈ [-7; 9], n ≠ 0',
    paramSpecs: [
      { name: 'n', label: 'Tử số n của nπ/2', min: -7, max: 9 },
    ],
    validateCode: `
      if (params.n === 0) return { valid: false, reason: 'n = 0 quá tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const rem = ((n % 4) + 4) % 4;
      const ptMap = { 0: 'A', 1: 'B', 2: "A'", 3: "B'" };
      const pt = ptMap[rem];
      const angLatex = fmtPiFrac(n, 2);
      const correct = 'Điểm $' + pt + '$';
      const allPts = ['A', 'B', "A'", "B'"];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        allPts.filter((x) => x !== pt).map((x) => 'Điểm $' + x + '$'),
        rng
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, cho đường tròn lượng giác như hình vẽ bên dưới. Tìm điểm biểu diễn của góc có số đo bằng $' + angLatex + '$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b1_unit_circle_axes',
          params: {},
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Góc $' + angLatex + '$ nằm trên các trục tọa độ của đường tròn lượng giác.',
          'Đối chiếu vị trí góc trên hình vẽ, điểm biểu diễn của góc $' + angLatex + '$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 0', params: { n: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (3π/2)', params: { n: 3 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Đọc điểm biểu diễn góc lẻ π/4 trên hình 4 điểm M, N, P, Q (45°)
  t11_b1_d10_read_point_45deg_mc: {
    id: 't11_b1_d10_read_point_45deg_mc',
    name: 'Đọc điểm biểu diễn góc lẻ bội π/4 trên hình đường tròn lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tròn lượng giác',
    description: 'Cho hình đường tròn lượng giác với 4 điểm M, N, P, Q ứng với các góc ±45°, ±135°. Tìm điểm biểu diễn góc lẻ·π/4.',
    conditionSummary: 'n ∈ [-11; 11] và n là số nguyên lẻ',
    paramSpecs: [
      { name: 'n', label: 'Tử số lẻ n của nπ/4', min: -11, max: 11 },
    ],
    validateCode: `
      if (Math.abs(params.n % 2) !== 1) return { valid: false, reason: 'n phải là số lẻ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const rem = ((n % 8) + 8) % 8;
      const ptMap = { 1: 'M', 3: 'N', 5: 'P', 7: 'Q' };
      const baseNumMap = { 1: 1, 3: 3, 5: -3, 7: -1 };
      const pt = ptMap[rem];
      const baseLatex = fmtPiFrac(baseNumMap[rem], 4);
      const angLatex = fmtPiFrac(n, 4);
      const correct = 'Điểm $' + pt + '$';
      const allPts = ['M', 'N', 'P', 'Q', 'B'];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        allPts.filter((x) => x !== pt).map((x) => 'Điểm $' + x + '$'),
        rng
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, cho đường tròn lượng giác như hình vẽ bên dưới. Điểm biểu diễn của góc có số đo bằng $' + angLatex + '$ là điểm nào trong các điểm sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b1_unit_circle_quad_sym',
          params: { baseDeg: 45, showArc: 0 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có góc $' + angLatex + '$ có cùng điểm biểu diễn với góc $' + baseLatex + '$.',
          'Trên hình vẽ đường tròn lượng giác, vị trí đó là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n chẵn', params: { n: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (-7π/4)', params: { n: -7 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Đọc điểm biểu diễn góc nπ/6 trên hình 4 điểm M, N, P, Q (30°)
  t11_b1_d11_read_point_30deg_mc: {
    id: 't11_b1_d11_read_point_30deg_mc',
    name: 'Đọc điểm biểu diễn góc bội π/6 trên hình đường tròn lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tròn lượng giác',
    description: 'Từ hình đường tròn lượng giác có 4 điểm M, N, P, Q ứng với góc 30°, tìm điểm biểu diễn của góc nπ/6 (n ≡ ±1 mod 6).',
    conditionSummary: 'n ∈ [-35; 35] và |n mod 6| ∈ {1, 5}',
    paramSpecs: [
      { name: 'n', label: 'Tử số n của nπ/6', min: -31, max: 31 },
    ],
    validateCode: `
      const r = ((params.n % 6) + 6) % 6;
      if (r !== 1 && r !== 5) return { valid: false, reason: 'Cần n ≡ 1 hoặc 5 (mod 6) để nằm vào 4 điểm ±30°, ±150°' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const rem = ((n % 12) + 12) % 12;
      const ptMap = { 1: 'M', 5: 'N', 7: 'P', 11: 'Q' };
      const baseNumMap = { 1: 1, 5: 5, 7: -5, 11: -1 };
      const pt = ptMap[rem];
      const baseLatex = fmtPiFrac(baseNumMap[rem], 6);
      const angLatex = fmtPiFrac(n, 6);
      const correct = 'Điểm $' + pt + '$';
      const allPts = ['M', 'N', 'P', 'Q', "A'"];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        allPts.filter((x) => x !== pt).map((x) => 'Điểm $' + x + '$'),
        rng
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, cho đường tròn lượng giác như hình vẽ bên dưới. Điểm biểu diễn của góc có số đo bằng $' + angLatex + '$ là điểm nào trong các điểm sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b1_unit_circle_quad_sym',
          params: { baseDeg: 30, showArc: 1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + angLatex + '$ có cùng điểm biểu diễn với góc $' + baseLatex + '$.',
          'Trên hình vẽ đường tròn lượng giác góc cơ sở $30^\\circ$, vị trí đó là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n chia hết cho 3', params: { n: -18 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (-29π/6)', params: { n: -29 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Đọc điểm biểu diễn góc dương lớn hơn 2π bội π/3 trên hình 60°
  t11_b1_d12_read_point_60deg_pos_mc: {
    id: 't11_b1_d12_read_point_60deg_pos_mc',
    name: 'Đọc điểm biểu diễn góc dương lớn hơn 2π bội π/3 trên hình đường tròn lượng giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường tròn lượng giác',
    description: 'Từ hình đường tròn lượng giác góc 60° gồm M, N, P, Q, tìm điểm biểu diễn góc dương nπ/3 (n ≥ 4, n không chia hết cho 3).',
    conditionSummary: 'n ∈ [4; 17] và n không chia hết cho 3',
    paramSpecs: [
      { name: 'n', label: 'Tử số dương n của nπ/3', min: 4, max: 17 },
    ],
    validateCode: `
      const { n } = params;
      if (n < 4 || n % 3 === 0) return { valid: false, reason: 'Cần n >= 4 và không chia hết cho 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const rem = ((n % 6) + 6) % 6;
      const ptMap = { 1: 'M', 2: 'N', 4: 'P', 5: 'Q' };
      const baseNumMap = { 1: 1, 2: 2, 4: -2, 5: -1 };
      const pt = ptMap[rem];
      const baseLatex = fmtPiFrac(baseNumMap[rem], 3);
      const angLatex = fmtPiFrac(n, 3);
      const correct = 'Điểm $' + pt + '$';
      const allPts = ['M', 'N', 'P', 'Q', 'A', "B'"];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        allPts.filter((x) => x !== pt).map((x) => 'Điểm $' + x + '$'),
        rng
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, cho đường tròn lượng giác như hình vẽ bên dưới. Điểm biểu diễn của góc có số đo bằng $' + angLatex + '$ là điểm nào trong các điểm sau?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b1_unit_circle_quad_sym',
          params: { baseDeg: 60, showArc: 1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + angLatex + '$ có cùng điểm biểu diễn với góc $' + baseLatex + '$.',
          'Trên hình vẽ đường tròn lượng giác góc cơ sở $60^\\circ$, vị trí đó là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n chia hết cho 3', params: { n: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (8π/3)', params: { n: 8 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Điểm N đối xứng điểm E(pπ/q) qua gốc tọa độ O -> số đo pπ/q + π
  t11_b1_d13_symmetry_origin_mc: {
    id: 't11_b1_d13_symmetry_origin_mc',
    name: 'Tìm số đo góc của điểm đối xứng qua gốc tọa độ O',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính đối xứng trên đường tròn lượng giác',
    description: 'Cho điểm E biểu diễn góc pπ/q ∈ (0; π/2). Lấy N đối xứng với E qua gốc O. Tìm số đo góc biểu diễn bởi N.',
    conditionSummary: 'q ∈ [3; 9], 1 <= p < q/2, gcd(p, q) = 1',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 4 },
      { name: 'q', label: 'Mẫu số q', min: 3, max: 9 },
    ],
    validateCode: `
      const { p, q } = params;
      if (p <= 0 || 2 * p >= q) return { valid: false, reason: 'Cần góc ban đầu thuộc (0; π/2)' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Cần gcd(p, q) = 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const a0 = fmtPiFrac(p, q);
      const ansLatex = fmtPiFrac(p + q, q);
      const correct = '$' + ansLatex + '$';
      const w1 = '$' + fmtPiFrac(p + 2 * q, 2 * q) + '$';
      const w2 = '$' + fmtPiFrac(2 * q - p, 4 * q) + '$';
      const w3 = '$' + fmtPiFrac(p + q + 1, 3 * q) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + fmtPiFrac(p + q + step, q + 1) + '$'
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, trên đường tròn lượng giác gọi điểm $E$ là điểm biểu diễn của góc $' + a0 + '$. Lấy điểm $N$ đối xứng với $E$ qua gốc tọa độ. Hỏi $N$ là điểm biểu diễn của góc có số đo bằng bao nhiêu?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai điểm đối xứng nhau qua gốc tọa độ $O$ ứng với hai góc lượng giác hơn kém nhau $\\pi$.',
          'Do đó $N$ là điểm biểu diễn của góc $' + a0 + ' + \\pi = ' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên góc >= π/2', params: { p: 3, q: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (π/5)', params: { p: 1, q: 5 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Điểm N đối xứng điểm M(pπ/q) qua trục Ox -> số đo -pπ/q
  t11_b1_d14_symmetry_ox_val_mc: {
    id: 't11_b1_d14_symmetry_ox_val_mc',
    name: 'Tìm số đo góc của điểm đối xứng qua trục Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính đối xứng trên đường tròn lượng giác',
    description: 'Cho điểm M biểu diễn góc pπ/q ∈ (0; π). Lấy N đối xứng với M qua trục Ox. Tìm một số đo góc biểu diễn bởi N.',
    conditionSummary: 'q ∈ [3; 9], 1 <= p < q, gcd(p, q) = 1',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 7 },
      { name: 'q', label: 'Mẫu số q', min: 3, max: 9 },
    ],
    validateCode: `
      const { p, q } = params;
      if (p <= 0 || p >= q) return { valid: false, reason: 'Cần 0 < p < q' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Cần gcd(p, q) = 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const a0 = fmtPiFrac(p, q);
      const ansLatex = fmtPiFrac(-p, q);
      const correct = '$' + ansLatex + '$';
      const w1 = '$' + fmtPiFrac(p + q, 2 * q) + '$';
      const w2 = '$' + fmtPiFrac(p + 2 * q, q) + '$';
      const w3 = '$' + fmtPiFrac(2 * p + q, 2 * q) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + fmtPiFrac(p + step, q) + '$'
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, trên đường tròn lượng giác gọi điểm $M$ là điểm biểu diễn của góc $' + a0 + '$. Lấy điểm $N$ đối xứng với $M$ qua trục $Ox$. Hỏi $N$ là điểm biểu diễn của góc có số đo bằng bao nhiêu?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai điểm đối xứng qua trục $Ox$ biểu diễn cho hai góc đối nhau.',
          'Do đó $N$ là điểm biểu diễn của góc $' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên góc = π', params: { p: 5, q: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (2π/7)', params: { p: 2, q: 7 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Điểm N đối xứng điểm E(pπ/q) qua trục Oy -> số đo π - pπ/q = (q-p)π/q
  t11_b1_d15_symmetry_oy_val_mc: {
    id: 't11_b1_d15_symmetry_oy_val_mc',
    name: 'Tìm số đo góc của điểm đối xứng qua trục Oy',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính đối xứng trên đường tròn lượng giác',
    description: 'Cho điểm E biểu diễn góc pπ/q ∈ (0; π) khác π/2. Lấy N đối xứng với E qua trục Oy. Tìm số đo góc biểu diễn bởi N.',
    conditionSummary: 'q ∈ [3; 9], 1 <= p < q, 2p ≠ q, gcd(p, q) = 1',
    paramSpecs: [
      { name: 'p', label: 'Tử số p', min: 1, max: 8 },
      { name: 'q', label: 'Mẫu số q', min: 3, max: 9 },
    ],
    validateCode: `
      const { p, q } = params;
      if (p <= 0 || p >= q || 2 * p === q) return { valid: false, reason: 'Cần 0 < p < q và p/q ≠ 1/2' };
      let a = p, b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Cần gcd(p, q) = 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const a0 = fmtPiFrac(p, q);
      const ansLatex = fmtPiFrac(q - p, q);
      const correct = '$' + ansLatex + '$';
      const w1 = '$' + fmtPiFrac(-p, q) + '$';
      const w2 = '$' + fmtPiFrac(p, 2 * q) + '$';
      const w3 = '$' + fmtPiFrac(p + 2 * q, q) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + fmtPiFrac(q - p + step, q + 1) + '$'
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, trên đường tròn lượng giác gọi điểm $E$ là điểm biểu diễn của góc $' + a0 + '$. Lấy điểm $N$ đối xứng với $E$ qua trục $Oy$. Hỏi $N$ là điểm biểu diễn của góc có số đo bằng bao nhiêu?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai điểm đối xứng qua trục $Oy$ biểu diễn cho hai góc bù nhau (tổng bằng $\\pi$).',
          'Do đó $N$ là điểm biểu diễn của góc $\\pi - ' + a0 + ' = ' + ansLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên góc = π/2', params: { p: 2, q: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (4π/7)', params: { p: 4, q: 7 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Độ dài cung tròn theo bán kính R và số đo radian nguyên
  t11_b1_d16_arc_len_rad_mc: {
    id: 't11_b1_d16_arc_len_rad_mc',
    name: 'Tính độ dài cung tròn biết bán kính và số đo radian',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Độ dài cung tròn',
    description: 'Cho đường tròn bán kính R (cm) và cung có số đo α (radian nguyên). Tính độ dài l = R·α.',
    conditionSummary: 'R ∈ [4; 25], α ∈ [2; 20], R ≠ α',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (cm)', min: 4, max: 25 },
      { name: 'alpha', label: 'Số đo góc α (rad)', min: 2, max: 20 },
    ],
    validateCode: `
      const { R, alpha } = params;
      if (R < 2 || alpha < 2 || R === alpha) return { valid: false, reason: 'R, α phải >= 2 và khác nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, alpha } = params;
      const ans = R * alpha;
      const correct = '$' + ans + '$';
      const w1 = '$' + (R + alpha) + '$';
      const w2 = '$' + u.simplifyFrac(R, 2 * alpha).latex + '$';
      const w3 = '$' + u.simplifyFrac(alpha, R).latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + (ans + step * 5) + '$'
      );
      return {
        stem: 'Một đường tròn có bán kính bằng $' + R + '\\text{ cm}$. Cung trên đường tròn đó có số đo là $' + alpha + '$ thì có độ dài bằng',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức độ dài cung tròn $l = R\\cdot \\alpha$.',
          'Ta được $l = ' + R + ' \\cdot ' + alpha + ' = ' + ans + '$ (cm).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R = alpha', params: { R: 5, alpha: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (R=19, α=15)', params: { R: 19, alpha: 15 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Độ dài cung tròn biết bán kính R và số đo độ d° -> phân số của π
  t11_b1_d17_arc_len_deg_radius_mc: {
    id: 't11_b1_d17_arc_len_deg_radius_mc',
    name: 'Tính độ dài cung tròn biết bán kính và số đo độ (dạng phân số của π)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Độ dài cung tròn',
    description: 'Cho đường tròn bán kính R (cm) và cung có số đo d°. Tính độ dài cung tròn l = (R·d/180)π.',
    conditionSummary: 'R ∈ [2; 10], d ∈ [100; 600], (R·d) không chia hết cho 180',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (cm)', min: 2, max: 10 },
      { name: 'd', label: 'Số đo góc d (độ)', min: 100, max: 600 },
    ],
    validateCode: `
      const { R, d } = params;
      if (R < 2 || d <= 0 || (R * d) % 180 === 0) return { valid: false, reason: 'Tránh giá trị quá đơn giản chia hết 180' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, d } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const ansFrac = u.simplifyFrac(R * d, 180);
      const ansLatex = fmtPiFrac(ansFrac.num, ansFrac.den);
      const correct = '$' + ansLatex + '$';
      const w1 = '$' + fmtPiFrac(ansFrac.num * 2, ansFrac.den) + '$';
      const w2 = '$' + fmtPiFrac(ansFrac.num, ansFrac.den * 3) + '$';
      const w3 = '$' + fmtPiFrac(ansFrac.num, ansFrac.den * 2) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + fmtPiFrac(ansFrac.num + step, ansFrac.den) + '$'
      );
      return {
        stem: 'Một đường tròn có bán kính bằng $' + R + '\\text{ cm}$. Cung trên đường tròn đó có số đo là $' + d + '^\\circ$ thì có độ dài bằng',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Độ dài cung tròn có bán kính $R = ' + R + '$ và số đo $' + d + '^\\circ$ là:',
          '$l = \\dfrac{' + R + '\\cdot ' + d + '}{180}\\pi = ' + ansLatex + '$ (cm).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chia hết 180', params: { R: 2, d: 180 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (R=2, d=501°)', params: { R: 2, d: 501 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Độ dài cung tròn biết ĐƯỜNG KÍNH D = 2R và số đo độ d° -> phân số của π
  t11_b1_d18_arc_len_deg_diam_mc: {
    id: 't11_b1_d18_arc_len_deg_diam_mc',
    name: 'Tính độ dài cung tròn biết đường kính và số đo độ (dạng phân số của π)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Độ dài cung tròn',
    description: 'Cho đường tròn đường kính D = 2R (cm) và cung số đo d°. Tính độ dài cung tròn l = (R·d/180)π.',
    conditionSummary: 'R ∈ [1; 8] (đường kính D = 2R), d ∈ [100; 350], (R·d) không chia hết cho 180',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (đường kính 2R)', min: 1, max: 8 },
      { name: 'd', label: 'Số đo góc d (độ)', min: 100, max: 350 },
    ],
    validateCode: `
      const { R, d } = params;
      if (R < 1 || d <= 0 || (R * d) % 180 === 0) return { valid: false, reason: 'Tham số không hợp lệ hoặc quá tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, d } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const D = 2 * R;
      const ansFrac = u.simplifyFrac(R * d, 180);
      const ansLatex = fmtPiFrac(ansFrac.num, ansFrac.den);
      const correct = '$' + ansLatex + '$';
      const w1 = '$' + fmtPiFrac(ansFrac.num, ansFrac.den * 2) + '$';
      const w2 = '$' + fmtPiFrac(ansFrac.num, ansFrac.den * 3) + '$';
      const w3 = '$' + fmtPiFrac(ansFrac.num * 2, ansFrac.den) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + fmtPiFrac(ansFrac.num + step, ansFrac.den) + '$'
      );
      return {
        stem: 'Một đường tròn có đường kính bằng $' + D + '\\text{ cm}$. Cung trên đường tròn đó có số đo là $' + d + '^\\circ$ thì có độ dài bằng',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Bán kính của đường tròn là $R = \\dfrac{' + D + '}{2} = ' + R + '\\text{ cm}$.',
          'Độ dài cung tròn là $l = \\dfrac{' + R + '\\cdot ' + d + '}{180}\\pi = ' + ansLatex + '$ (cm).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chia hết 180', params: { R: 1, d: 180 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (D=2, d=293°)', params: { R: 1, d: 293 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Tính giá trị lượng giác (sin, cos, tan, cot) tại góc đặc biệt lớn hơn 2π
  t11_b1_d19_exact_trig_special_mc: {
    id: 't11_b1_d19_exact_trig_special_mc',
    name: 'Tính giá trị lượng giác của góc đặc biệt lớn hơn 2π hoặc góc âm',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giá trị lượng giác của góc lượng giác',
    description: 'Tính giá trị sin, cos, tan hoặc cot của góc có dạng pπ/q với q ∈ {3, 4, 6} và gcd(|p|, q) = 1.',
    conditionSummary: 'q ∈ {3, 4, 6}, gcd(|p|, q) = 1 để giá trị lượng giác luôn xác định và không tầm thường',
    paramSpecs: [
      { name: 'fnIdx', label: 'Hàm (0:sin, 1:cos, 2:tan, 3:cot)', min: 0, max: 3 },
      { name: 'qIdx', label: 'Mẫu (0:3, 1:4, 2:6)', min: 0, max: 2 },
      { name: 'p', label: 'Tử số p (góc pπ/q)', min: -25, max: 31 },
    ],
    validateCode: `
      const { fnIdx, qIdx, p } = params;
      const qs = [3, 4, 6];
      const q = qs[qIdx];
      if (!q || Math.abs(p) < 7) return { valid: false, reason: 'Góc cần ngoài [−π; π] để luyện rút gọn chu kỳ' };
      let a = Math.abs(p), b = q;
      while (b !== 0) { const t = b; b = a % b; a = t; }
      if (a !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      if (fnIdx < 0 || fnIdx > 3) return { valid: false, reason: 'Hàm lượng giác không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { fnIdx, qIdx, p } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const fnNames = ['\\sin', '\\cos', '\\tan', '\\cot'];
      const qs = [3, 4, 6];
      const q = qs[qIdx];
      const unit24 = (((p * (12 / q)) % 24) + 24) % 24;
      const getSin = (u24) => {
        const s = u24 < 12 ? 1 : -1;
        const m = u24 % 12;
        const ref = m <= 6 ? m : 12 - m; // 2->pi/6 (1/2), 3->pi/4 (sqrt(2)/2), 4->pi/3 (sqrt(3)/2)
        if (ref === 2) return fmtRadFrac(s, 1, 2);
        if (ref === 3) return fmtRadFrac(s, 2, 2);
        return fmtRadFrac(s, 3, 2);
      };
      const getCos = (u24) => getSin((u24 + 6) % 24);
      const getTan = (u24) => {
        const s = (u24 < 6 || (u24 >= 12 && u24 < 18)) ? 1 : -1;
        const m = u24 % 12;
        const ref = m <= 6 ? m : 12 - m;
        if (ref === 2) return fmtRadFrac(s, 3, 3);
        if (ref === 3) return String(s);
        return fmtRadFrac(s, 3, 1);
      };
      const getCot = (u24) => {
        const s = (u24 < 6 || (u24 >= 12 && u24 < 18)) ? 1 : -1;
        const m = u24 % 12;
        const ref = m <= 6 ? m : 12 - m;
        if (ref === 2) return fmtRadFrac(s, 3, 1);
        if (ref === 3) return String(s);
        return fmtRadFrac(s, 3, 3);
      };
      const valLatex =
        fnIdx === 0 ? getSin(unit24)
        : fnIdx === 1 ? getCos(unit24)
        : fnIdx === 2 ? getTan(unit24)
        : getCot(unit24);
      const angLatex = fmtPiFrac(p, q);
      const correct = '$' + valLatex + '$';
      const pool = [
        '$\\frac{\\sqrt{3}}{3}$',
        '$-\\frac{\\sqrt{3}}{3}$',
        '$\\sqrt{3}$',
        '$-\\sqrt{3}$',
        '$\\frac{1}{2}$',
        '$-\\frac{1}{2}$',
        '$\\frac{\\sqrt{2}}{2}$',
        '$\\frac{\\sqrt{3}}{2}$',
        '$1$',
        '$-1$',
        '$\\frac{3}{10}$',
        '$\\frac{9}{10}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        pool.filter((x) => x !== correct),
        rng
      );
      return {
        stem: 'Tính $' + fnNames[fnIdx] + ' ' + angLatex + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Sử dụng tính tuần hoàn và các góc liên quan đặc biệt trên đường tròn lượng giác,',
          'ta tính được $' + fnNames[fnIdx] + ' ' + angLatex + ' = ' + valLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p/q chưa tối giản', params: { fnIdx: 2, qIdx: 2, p: 14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (tan 25π/6)', params: { fnIdx: 2, qIdx: 2, p: 25 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Xác định dấu giá trị lượng giác khi α thuộc khoảng phần tư (mπ/2; (m+1)π/2)
  t11_b1_d20_quadrant_sign_mc: {
    id: 't11_b1_d20_quadrant_sign_mc',
    name: 'Xác định dấu các giá trị lượng giác theo góc phần tư',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Dấu của giá trị lượng giác',
    description: 'Cho góc α ∈ (mπ/2; (m+1)π/2). Chọn khẳng định đúng về dấu của sin α, cos α, tan α, cot α.',
    conditionSummary: 'm ∈ [-4; 6], chọn 1 mệnh đề đúng và 3 mệnh đề sai chắc chắn',
    paramSpecs: [
      { name: 'm', label: 'Chỉ số khoảng m trong (mπ/2; (m+1)π/2)', min: -4, max: 6 },
      { name: 'pickIdx', label: 'Lựa chọn hàm đúng (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { m, pickIdx } = params;
      if (pickIdx < 0 || pickIdx > 3 || m < -8 || m > 8) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, pickIdx } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const q = (((m % 4) + 4) % 4) + 1; // 1, 2, 3, 4
      const signs = {
        1: { sin: '>', cos: '>', tan: '>', cot: '>' },
        2: { sin: '>', cos: '<', tan: '<', cot: '<' },
        3: { sin: '<', cos: '<', tan: '>', cot: '>' },
        4: { sin: '<', cos: '>', tan: '<', cot: '<' },
      }[q];
      const fns = ['\\sin', '\\cos', '\\tan', '\\cot'];
      const keys = ['sin', 'cos', 'tan', 'cot'];
      const pickedKey = keys[pickIdx];
      const pickedFn = fns[pickIdx];
      const opp = (s) => (s === '>' ? '<' : '>');
      const correct = '$' + pickedFn + ' \\alpha ' + signs[pickedKey] + ' 0$';
      const wrongs = keys
        .filter((k) => k !== pickedKey)
        .map((k, idx) => '$' + fns[keys.indexOf(k)] + ' \\alpha ' + opp(signs[k]) + ' 0$');
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      const intervalStr = fmtIntervalHalfPi(m);
      return {
        stem: 'Cho góc lượng giác $\\alpha$ thỏa mãn $\\alpha \\in ' + intervalStr + '$. Khẳng định nào sau đây là khẳng định đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $\\alpha \\in ' + intervalStr + '$ nên điểm biểu diễn của góc $\\alpha$ thuộc góc phần tư thứ ' + q + '.',
          'Trong góc phần tư thứ ' + q + ', khẳng định đúng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pickIdx ngoài [0..3]', params: { m: 4, pickIdx: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 ((2π; 5π/2), cos > 0)', params: { m: 4, pickIdx: 1 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Cho cos α = s*(a/b) và khoảng phần tư -> tính sin α (căn thức chính xác)
  t11_b1_d21_compute_sin_from_cos_mc: {
    id: 't11_b1_d21_compute_sin_from_cos_mc',
    name: 'Tính sin α khi biết cos α và góc phần tư (dạng căn thức)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hệ thức lượng giác cơ bản',
    description: 'Cho cos α và khoảng góc phần tư tương ứng. Tính chính xác sin α bằng hệ thức sin²α + cos²α = 1.',
    conditionSummary: '1 <= a < b <= 18, gcd(a, b) = 1, dấu cos α khớp góc phần tư m',
    paramSpecs: [
      { name: 'a', label: 'Tử số |cos α|', min: 2, max: 14 },
      { name: 'b', label: 'Mẫu số b', min: 5, max: 18 },
      { name: 'm', label: 'Khoảng (mπ/2; (m+1)π/2)', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, m } = params;
      if (a <= 0 || a >= b) return { valid: false, reason: 'Cần 0 < |cos α| < 1' };
      let x = a, y = b;
      while (y !== 0) { const t = y; y = x % y; x = t; }
      if (x !== 1) return { valid: false, reason: 'Phân số a/b chưa tối giản' };
      const diff = b * b - a * a;
      const rt = Math.round(Math.sqrt(diff));
      if (rt * rt === diff) return { valid: false, reason: 'Ưu tiên kết quả chứa căn thức rõ ràng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, m } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const q = (((m % 4) + 4) % 4) + 1;
      const cosSign = (q === 1 || q === 4) ? 1 : -1;
      const sinSign = (q === 1 || q === 2) ? 1 : -1;
      const cosLatex = u.simplifyFrac(cosSign * a, b).latex;
      const diff = b * b - a * a;
      const sinLatex = fmtRadFrac(sinSign, diff, b);
      const correct = '$' + sinLatex + '$';
      const w1 = '$' + fmtRadFrac(-sinSign, diff, b) + '$';
      const w2 = '$' + fmtRadFrac(sinSign, a, b + 2) + '$';
      const w3 = '$' + fmtRadFrac(sinSign, diff + 4, b) + '$';
      const w4 = '$' + fmtRadFrac(sinSign, diff, b + 1) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3, w4],
        rng,
        (step) => '$' + fmtRadFrac(sinSign, diff + step * 2 + 1, b + step) + '$'
      );
      const intervalStr = fmtIntervalHalfPi(m);
      return {
        stem: 'Cho góc lượng giác $\\alpha$ thỏa mãn $\\cos \\alpha = ' + cosLatex + ',\\, \\alpha \\in ' + intervalStr + '$. Tính $\\sin\\alpha$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $\\alpha \\in ' + intervalStr + '$ (góc phần tư thứ ' + q + ') nên $\\sin\\alpha ' + (sinSign > 0 ? '> 0' : '< 0') + '$.',
          'Ta có $\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - \\dfrac{' + (a * a) + '}{' + (b * b) + '} = \\dfrac{' + diff + '}{' + (b * b) + '}$.',
          'Suy ra $\\sin\\alpha = ' + sinLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b (|cos| >= 1)', params: { a: 16, b: 16, m: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (-11/16, (-3π/2; -π))', params: { a: 11, b: 16, m: -3 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Cho cos α và khoảng phần tư -> tính tan α (căn thức chính xác)
  t11_b1_d22_compute_tan_from_cos_mc: {
    id: 't11_b1_d22_compute_tan_from_cos_mc',
    name: 'Tính tan α khi biết cos α và góc phần tư (dạng căn thức)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hệ thức lượng giác cơ bản',
    description: 'Cho cos α và khoảng góc phần tư tương ứng. Tính chính xác tan α dưới dạng phân thức chứa căn rút gọn.',
    conditionSummary: '1 <= a < b <= 13, gcd(a, b) = 1, b² - a² không chính phương',
    paramSpecs: [
      { name: 'a', label: 'Tử số |cos α|', min: 2, max: 11 },
      { name: 'b', label: 'Mẫu số b', min: 5, max: 13 },
      { name: 'm', label: 'Khoảng (mπ/2; (m+1)π/2)', min: -3, max: 3 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a <= 0 || a >= b) return { valid: false, reason: 'Cần 0 < |cos α| < 1' };
      let x = a, y = b;
      while (y !== 0) { const t = y; y = x % y; x = t; }
      if (x !== 1) return { valid: false, reason: 'Phân số a/b chưa tối giản' };
      const diff = b * b - a * a;
      const rt = Math.round(Math.sqrt(diff));
      if (rt * rt === diff) return { valid: false, reason: 'Ưu tiên kết quả chứa căn thức' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, m } = params;
      ` + TRIG11_B1_MC_HELPERS + String.raw`
      const q = (((m % 4) + 4) % 4) + 1;
      const cosSign = (q === 1 || q === 4) ? 1 : -1;
      const sinSign = (q === 1 || q === 2) ? 1 : -1;
      const tanSign = sinSign * cosSign;
      const cosLatex = u.simplifyFrac(cosSign * a, b).latex;
      const diff = b * b - a * a;
      const sinLatex = fmtRadFrac(sinSign, diff, b);
      const tanLatex = fmtRadFrac(tanSign, diff, a);
      const correct = '$' + tanLatex + '$';
      const w1 = '$' + fmtRadFrac(-tanSign, diff, a) + '$';
      const w2 = '$' + u.simplifyFrac(a, b).latex + '$';
      const w3 = '$' + fmtRadFrac(1, diff + 1, a + 2) + '$';
      const w4 = '$' + fmtRadFrac(1, a, b + 2) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3, w4],
        rng,
        (step) => '$' + fmtRadFrac(tanSign, diff + step * 3, a + step) + '$'
      );
      const intervalStr = fmtIntervalHalfPi(m);
      return {
        stem: 'Cho góc lượng giác $\\alpha$ thỏa mãn $\\cos \\alpha = ' + cosLatex + ',\\, \\alpha \\in ' + intervalStr + '$. Tính $\\tan\\alpha$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $\\alpha \\in ' + intervalStr + '$ (góc phần tư thứ ' + q + ') nên $\\sin\\alpha ' + (sinSign > 0 ? '> 0' : '< 0') + '$.',
          'Ta có $\\sin\\alpha = ' + (sinSign > 0 ? '' : '-') + '\\sqrt{1 - \\frac{' + (a * a) + '}{' + (b * b) + '}} = ' + sinLatex + '$.',
          'Suy ra $\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = ' + tanLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 9, b: 9, m: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (cos = 7/9, (-π/2; 0))', params: { a: 7, b: 9, m: -1 }, expectedValid: true },
    ],
  },
};
