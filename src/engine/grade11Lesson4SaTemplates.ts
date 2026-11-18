import { MathTemplate } from '../types/math';

const TRIG11_B4_SA_HELPERS = String.raw`
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
  const fmtKPiTerm = (num, den) => {
    const f = u.simplifyFrac(Math.abs(num), Math.abs(den));
    if (f.den === 1) {
      return f.num === 1 ? 'k\\pi' : 'k' + f.num + '\\pi';
    }
    return 'k\\frac{' + (f.num === 1 ? '' : f.num) + '\\pi}{' + f.den + '}';
  };
  const fmtRootExpr = (sNum, sDen, pNum, pDen) => {
    const f = u.simplifyFrac(sNum, sDen);
    if (f.num === 0) return 'x = ' + fmtKPiTerm(pNum, pDen);
    return 'x = ' + fmtPiFrac(f.num, f.den) + ' + ' + fmtKPiTerm(pNum, pDen);
  };
  const fmtLinearArg = (a, p, q) => {
    const aPart = a === 1 ? 'x' : a === -1 ? '-x' : a + 'x';
    const f = u.simplifyFrac(p, q);
    if (f.num === 0) return aPart;
    const absPi = fmtPiFrac(Math.abs(f.num), f.den);
    return f.num > 0 ? aPart + ' + ' + absPi : aPart + ' - ' + absPi;
  };
  const countIntegersClosed = (L, R, D) => {
    // Counts integers k such that L <= D*k <= R, D > 0
    const kMin = Math.ceil(L / D);
    const kMax = Math.floor(R / D);
    return { kMin, kMax, count: Math.max(0, kMax - kMin + 1) };
  };
  const countIntegersOpen = (L, R, D) => {
    // Counts integers k such that L < D*k < R, D > 0
    const kMin = Math.floor(L / D) + 1;
    const kMax = Math.ceil(R / D) - 1;
    return { kMin, kMax, count: Math.max(0, kMax - kMin + 1) };
  };
`;

export const G11_B4_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D23 (Q23): Đếm số nghiệm sin(ax + φ) = ±1 trên [-Bπ; Bπ] hoặc (-Bπ; Bπ)
  t11_b4_d23_count_roots_sin_interval_sa: {
    id: 't11_b4_d23_count_roots_sin_interval_sa',
    name: 'Đếm số nghiệm phương trình sin(ax + φ) = ±1 trên khoảng/đoạn đối xứng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm nghiệm phương trình lượng giác',
    description: 'Đếm số nghiệm thuộc [-Bπ; Bπ] (hoặc (-Bπ; Bπ)) của phương trình sin(ax + pπ/q) = ±1.',
    conditionSummary: 'a ∈ [2; 6], p ∈ [-3; 3] \\ {0}, q ∈ {2, 3, 4, 6}, B ∈ [2; 9], gcd(|p|, q) = 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 6 },
      { name: 'p', label: 'Tử pha p', min: -3, max: 3, allowZero: false },
      { name: 'q', label: 'Mẫu pha q', min: 2, max: 6 },
      { name: 'B', label: 'Biên B ([-Bπ; Bπ])', min: 2, max: 9 },
      { name: 'rhsSign', label: 'Vế phải (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
      { name: 'closed', label: 'Kiểu miền (1: đoạn, 0: khoảng)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, p, q, B, rhsSign, closed } = params;
      if (a < 2 || a > 6 || p === 0 || B < 2 || B > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      if (![2, 3, 4, 6].includes(q)) return { valid: false, reason: 'q thuộc {2, 3, 4, 6}' };
      if (u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q phải tối giản' };
      if (rhsSign !== 1 && rhsSign !== -1) return { valid: false, reason: 'rhsSign thuộc {-1, 1}' };
      if (closed !== 0 && closed !== 1) return { valid: false, reason: 'closed thuộc {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p, q, B, rhsSign, closed } = params;
      ` + TRIG11_B4_SA_HELPERS + String.raw`
      // sin(ax + p/q*pi) = rhsSign -> ax + p/q*pi = rhsSign*pi/2 + k2pi
      // x = (rhsSign*q - 2p)/(2qa) * pi + 2k/a * pi
      const shiftNum = rhsSign * q - 2 * p;
      const shiftDen = 2 * q * a;
      const L = -2 * q * a * B - shiftNum;
      const R = 2 * q * a * B - shiftNum;
      const D = 4 * q;
      const res = closed === 1 ? countIntegersClosed(L, R, D) : countIntegersOpen(L, R, D);
      const ans = res.count;

      const arg = fmtLinearArg(a, p, q);
      const rhsStr = rhsSign === 1 ? '1' : '-1';
      const baseAngle = rhsSign === 1 ? '\\frac{\\pi}{2}' : '-\\frac{\\pi}{2}';
      const intervalStr = closed === 1 ? '[-' + B + '\\pi;\\, ' + B + '\\pi]' : '(-' + B + '\\pi;\\, ' + B + '\\pi)';
      const domainLabel = closed === 1 ? 'đoạn' : 'khoảng';
      const cmpOp = closed === 1 ? '\\le' : '<';
      const rCore = fmtRootExpr(shiftNum, shiftDen, 2, a);
      const lFrac = u.simplifyFrac(L, D);
      const rFrac = u.simplifyFrac(R, D);

      return {
        stem: 'Số nghiệm thuộc ' + domainLabel + ' $' + intervalStr + '$ của phương trình $\\sin\\left(' + arg + '\\right) = ' + rhsStr + '$ là',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\sin\\left(' + arg + '\\right) = ' + rhsStr + ' \\Leftrightarrow ' + arg + ' = ' + baseAngle + ' + k2\\pi \\Leftrightarrow ' + rCore + '\\; (k \\in \\mathbb{Z})$.',
          'Do $x \\in ' + intervalStr + '$ nên $' + lFrac.latex + ' ' + cmpOp + ' k ' + cmpOp + ' ' + rFrac.latex + '$.',
          'Có $' + ans + '$ giá trị nguyên $k \\in [' + res.kMin + ';\\, ' + res.kMax + ']$ thỏa mãn nên phương trình có $' + ans + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { a: 4, p: 0, q: 4, B: 6, rhsSign: -1, closed: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (sin(4x-3π/4)=-1 trên [-6π;6π] -> 24)', params: { a: 4, p: -3, q: 4, B: 6, rhsSign: -1, closed: 1 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Đếm số nghiệm cos(ax + φ) = ±1 trên [-Bπ; Bπ] hoặc (-Bπ; Bπ)
  t11_b4_d24_count_roots_cos_interval_sa: {
    id: 't11_b4_d24_count_roots_cos_interval_sa',
    name: 'Đếm số nghiệm phương trình cos(ax + φ) = ±1 trên khoảng/đoạn đối xứng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm nghiệm phương trình lượng giác',
    description: 'Đếm số nghiệm thuộc [-Bπ; Bπ] (hoặc (-Bπ; Bπ)) của phương trình cos(ax + pπ/q) = ±1.',
    conditionSummary: 'a ∈ [2; 6], p ∈ [-3; 3] \\ {0}, q ∈ {2, 3, 4, 6}, B ∈ [2; 9], gcd(|p|, q) = 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 6 },
      { name: 'p', label: 'Tử pha p', min: -3, max: 3, allowZero: false },
      { name: 'q', label: 'Mẫu pha q', min: 2, max: 6 },
      { name: 'B', label: 'Biên B ([-Bπ; Bπ])', min: 2, max: 9 },
      { name: 'rhsSign', label: 'Vế phải (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
      { name: 'closed', label: 'Kiểu miền (1: đoạn, 0: khoảng)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, p, q, B, rhsSign, closed } = params;
      if (a < 2 || a > 6 || p === 0 || B < 2 || B > 9) return { valid: false, reason: 'Tham số ngoài miền' };
      if (![2, 3, 4, 6].includes(q)) return { valid: false, reason: 'q thuộc {2, 3, 4, 6}' };
      if (u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q phải tối giản' };
      if (rhsSign !== 1 && rhsSign !== -1) return { valid: false, reason: 'rhsSign thuộc {-1, 1}' };
      if (closed !== 0 && closed !== 1) return { valid: false, reason: 'closed thuộc {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p, q, B, rhsSign, closed } = params;
      ` + TRIG11_B4_SA_HELPERS + String.raw`
      // cos(ax + p/q*pi) = rhsSign -> target = t*pi (t = 0 if 1, t = 1 if -1)
      const t = rhsSign === 1 ? 0 : 1;
      const shiftNum = t * q - p;
      const shiftDen = q * a;
      const L = -q * a * B - shiftNum;
      const R = q * a * B - shiftNum;
      const D = 2 * q;
      const res = closed === 1 ? countIntegersClosed(L, R, D) : countIntegersOpen(L, R, D);
      const ans = res.count;

      const arg = fmtLinearArg(a, p, q);
      const rhsStr = rhsSign === 1 ? '1' : '-1';
      const baseAngle = rhsSign === 1 ? '0' : '\\pi';
      const intervalStr = closed === 1 ? '[-' + B + '\\pi;\\, ' + B + '\\pi]' : '(-' + B + '\\pi;\\, ' + B + '\\pi)';
      const domainLabel = closed === 1 ? 'đoạn' : 'khoảng';
      const cmpOp = closed === 1 ? '\\le' : '<';
      const rCore = fmtRootExpr(shiftNum, shiftDen, 2, a);
      const lFrac = u.simplifyFrac(L, D);
      const rFrac = u.simplifyFrac(R, D);

      return {
        stem: 'Số nghiệm thuộc ' + domainLabel + ' $' + intervalStr + '$ của phương trình $\\cos\\left(' + arg + '\\right) = ' + rhsStr + '$ là',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\cos\\left(' + arg + '\\right) = ' + rhsStr + ' \\Leftrightarrow ' + arg + ' = ' + (t === 0 ? 'k2\\pi' : '\\pi + k2\\pi') + ' \\Leftrightarrow ' + rCore + '\\; (k \\in \\mathbb{Z})$.',
          'Do $x \\in ' + intervalStr + '$ nên $' + lFrac.latex + ' ' + cmpOp + ' k ' + cmpOp + ' ' + rFrac.latex + '$.',
          'Có $' + ans + '$ giá trị nguyên $k \\in [' + res.kMin + ';\\, ' + res.kMax + ']$ thỏa mãn nên phương trình có $' + ans + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 5', params: { a: 4, p: 2, q: 5, B: 8, rhsSign: -1, closed: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (cos(4x+2π/3)=-1 trên [-8π;8π] -> 32)', params: { a: 4, p: 2, q: 3, B: 8, rhsSign: -1, closed: 1 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Đếm số nghiệm tan(ax + φ) = b trên (-Bπ; Bπ) hoặc [-Bπ; Bπ]
  t11_b4_d25_count_roots_tan_interval_sa: {
    id: 't11_b4_d25_count_roots_tan_interval_sa',
    name: 'Đếm số nghiệm phương trình tan(ax + φ) = b trên khoảng/đoạn đối xứng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm nghiệm phương trình lượng giác',
    description: 'Đếm số nghiệm thuộc (-Bπ; Bπ) hoặc [-Bπ; Bπ] của phương trình tan(ax + pπ/q) = b.',
    conditionSummary: 'a ∈ [2; 6], p ∈ [-3; 3] \\ {0}, q ∈ {2, 3, 4, 6}, B ∈ [2; 8], gcd(|p|, q) = 1',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 6 },
      { name: 'p', label: 'Tử pha p', min: -3, max: 3, allowZero: false },
      { name: 'q', label: 'Mẫu pha q', min: 2, max: 6 },
      { name: 'B', label: 'Biên B ((-Bπ; Bπ))', min: 2, max: 8 },
      { name: 'alphaIdx', label: 'Chỉ số giá trị VP (0..5)', min: 0, max: 5 },
      { name: 'closed', label: 'Kiểu miền (0: khoảng, 1: đoạn)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, p, q, B, alphaIdx, closed } = params;
      if (a < 2 || a > 6 || p === 0 || B < 2 || B > 8) return { valid: false, reason: 'Tham số ngoài miền' };
      if (![2, 3, 4, 6].includes(q)) return { valid: false, reason: 'q thuộc {2, 3, 4, 6}' };
      if (u.gcd(p, q) !== 1) return { valid: false, reason: 'p/q phải tối giản' };
      if (alphaIdx < 0 || alphaIdx > 5) return { valid: false, reason: 'alphaIdx thuộc [0; 5]' };
      if (closed !== 0 && closed !== 1) return { valid: false, reason: 'closed thuộc {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p, q, B, alphaIdx, closed } = params;
      ` + TRIG11_B4_SA_HELPERS + String.raw`
      const table = [
        { rhs: '1', u: 1, v: 4 },
        { rhs: '-1', u: -1, v: 4 },
        { rhs: '\\sqrt{3}', u: 1, v: 3 },
        { rhs: '-\\sqrt{3}', u: -1, v: 3 },
        { rhs: '\\frac{\\sqrt{3}}{3}', u: 1, v: 6 },
        { rhs: '-\\frac{\\sqrt{3}}{3}', u: -1, v: 6 },
      ];
      const item = table[alphaIdx];
      const M = q * item.v;
      const shiftNum = item.u * q - p * item.v;
      const shiftDen = M * a;
      const L = -M * a * B - shiftNum;
      const R = M * a * B - shiftNum;
      const D = M;
      const res = closed === 1 ? countIntegersClosed(L, R, D) : countIntegersOpen(L, R, D);
      const ans = res.count;

      const arg = fmtLinearArg(a, p, q);
      const intervalStr = closed === 1 ? '[-' + B + '\\pi;\\, ' + B + '\\pi]' : '(-' + B + '\\pi;\\, ' + B + '\\pi)';
      const domainLabel = closed === 1 ? 'đoạn' : 'khoảng';
      const cmpOp = closed === 1 ? '\\le' : '<';
      const rCore = fmtRootExpr(shiftNum, shiftDen, 1, a);
      const lFrac = u.simplifyFrac(L, D);
      const rFrac = u.simplifyFrac(R, D);

      return {
        stem: 'Số nghiệm thuộc ' + domainLabel + ' $' + intervalStr + '$ của phương trình $\\tan\\left(' + arg + '\\right) = ' + item.rhs + '$ là',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\tan\\left(' + arg + '\\right) = ' + item.rhs + ' \\Leftrightarrow ' + arg + ' = ' + fmtPiFrac(item.u, item.v) + ' + k\\pi \\Leftrightarrow ' + rCore + '\\; (k \\in \\mathbb{Z})$.',
          'Do $x \\in ' + intervalStr + '$ nên $' + lFrac.latex + ' ' + cmpOp + ' k ' + cmpOp + ' ' + rFrac.latex + '$.',
          'Có $' + ans + '$ giá trị nguyên $k \\in [' + res.kMin + ';\\, ' + res.kMax + ']$ thỏa mãn nên phương trình có $' + ans + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên alphaIdx = 6', params: { a: 2, p: -3, q: 4, B: 4, alphaIdx: 6, closed: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (tan(2x-3π/4)=√3/3 trên (-4π;4π) -> 16)', params: { a: 2, p: -3, q: 4, B: 4, alphaIdx: 4, closed: 0 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Đếm số nghiệm cos(ax) - sin(bx) = 0 trên (-Bπ; Bπ) hoặc [-Bπ; Bπ]
  t11_b4_d26_count_roots_cos_eq_sin_interval_sa: {
    id: 't11_b4_d26_count_roots_cos_eq_sin_interval_sa',
    name: 'Đếm số nghiệm phương trình cos(ax) - sin(bx) = 0 trên khoảng/đoạn đối xứng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm nghiệm phương trình lượng giác',
    description: 'Đưa cos(ax) = sin(bx) về hai họ nghiệm và đếm chính xác số nghiệm phân biệt trên (-Bπ; Bπ) hoặc [-Bπ; Bπ].',
    conditionSummary: '2 ≤ b < a ≤ 8, B ∈ [2; 9], hai họ nghiệm phân biệt (không trùng điểm)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 3, max: 8 },
      { name: 'b', label: 'Hệ số b (< a)', min: 2, max: 7 },
      { name: 'B', label: 'Biên B ((-Bπ; Bπ))', min: 2, max: 9 },
      { name: 'closed', label: 'Kiểu miền (0: khoảng, 1: đoạn)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, B, closed } = params;
      if (a < 3 || a > 8 || b < 2 || b >= a || B < 2 || B > 9) return { valid: false, reason: 'Cần 2 <= b < a <= 8 và B thuộc [2; 9]' };
      if (closed !== 0 && closed !== 1) return { valid: false, reason: 'closed thuộc {0, 1}' };
      // Ensure the two families (4k+1)/(2(a+b)) and (4m-1)/(2(a-b)) never overlap
      // Check in one full period [0, 2) in units of pi
      const p1 = a + b;
      const p2 = a - b;
      const seen = new Set();
      for (let k = 0; k < p1; k++) {
        const f = u.simplifyFrac(1 + 4 * k, 2 * p1);
        seen.add(f.num + '/' + f.den);
      }
      for (let m = 1; m <= p2; m++) {
        const f = u.simplifyFrac(-1 + 4 * m, 2 * p2);
        if (seen.has(f.num + '/' + f.den)) {
          return { valid: false, reason: 'Hai họ nghiệm có nghiệm trùng nhau' };
        }
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, B, closed } = params;
      ` + TRIG11_B4_SA_HELPERS + String.raw`
      // cos(ax) = cos(pi/2 - bx)
      // TH1: (a + b)x = pi/2 + k2pi -> x = (1 + 4k) / (2(a + b)) * pi
      // TH2: (a - b)x = -pi/2 + k2pi -> x = (-1 + 4k) / (2(a - b)) * pi
      const p1 = a + b;
      const p2 = a - b;
      const r1Info = closed === 1
        ? countIntegersClosed(-2 * p1 * B - 1, 2 * p1 * B - 1, 4)
        : countIntegersOpen(-2 * p1 * B - 1, 2 * p1 * B - 1, 4);
      const r2Info = closed === 1
        ? countIntegersClosed(-2 * p2 * B + 1, 2 * p2 * B + 1, 4)
        : countIntegersOpen(-2 * p2 * B + 1, 2 * p2 * B + 1, 4);
      const ans = r1Info.count + r2Info.count;

      const intervalStr = closed === 1 ? '[-' + B + '\\pi;\\, ' + B + '\\pi]' : '(-' + B + '\\pi;\\, ' + B + '\\pi)';
      const domainLabel = closed === 1 ? 'đoạn' : 'khoảng';
      const cmpOp = closed === 1 ? '\\le' : '<';
      const root1 = fmtRootExpr(1, 2 * p1, 2, p1);
      const root2 = fmtRootExpr(-1, 2 * p2, 2, p2);
      const l1 = u.simplifyFrac(-2 * p1 * B - 1, 4);
      const u1 = u.simplifyFrac(2 * p1 * B - 1, 4);
      const l2 = u.simplifyFrac(-2 * p2 * B + 1, 4);
      const u2 = u.simplifyFrac(2 * p2 * B + 1, 4);

      return {
        stem: 'Tìm số nghiệm thuộc ' + domainLabel + ' $' + intervalStr + '$ của phương trình $\\cos ' + a + 'x - \\sin ' + b + 'x = 0$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\cos ' + a + 'x - \\sin ' + b + 'x = 0 \\Leftrightarrow \\cos ' + a + 'x = \\cos\\left(\\frac{\\pi}{2} - ' + b + 'x\\right)$.',
          'Suy ra $\\left[\\begin{array}{l} ' + root1 + ' \\\\ ' + root2 + ' \\end{array}\\right.\\; (k \\in \\mathbb{Z})$ (hai họ nghiệm phân biệt).',
          'TH1: $' + l1.latex + ' ' + cmpOp + ' k ' + cmpOp + ' ' + u1.latex + '$ có $' + r1Info.count + '$ giá trị nguyên $k$.',
          'TH2: $' + l2.latex + ' ' + cmpOp + ' k ' + cmpOp + ' ' + u2.latex + '$ có $' + r2Info.count + '$ giá trị nguyên $k$.',
          'Vậy phương trình có tổng cộng $' + r1Info.count + ' + ' + r2Info.count + ' = ' + ans + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a <= b', params: { a: 3, b: 3, B: 7, closed: 0 }, expectedValid: false },
      { label: 'Biên họ nghiệm giao nhau (a=4, b=2)', params: { a: 4, b: 2, B: 4, closed: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (cos 5x - sin 3x = 0 trên (-7π;7π) -> 70)', params: { a: 5, b: 3, B: 7, closed: 0 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Đếm số nghiệm p·sin(2mx) + q·cos(mx) = 0 (hoặc sin(mx)) trên [-Bπ; Bπ]
  t11_b4_d27_count_roots_double_angle_factor_sa: {
    id: 't11_b4_d27_count_roots_double_angle_factor_sa',
    name: 'Đếm số nghiệm phương trình p·sin(2mx) + q·cos(mx) = 0 trên [-Bπ; Bπ]',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm nghiệm phương trình lượng giác',
    description: 'Dùng công thức nhân đôi đặt nhân tử chung để giải và đếm nghiệm trên đoạn [-Bπ; Bπ] khi nhân tử còn lại vô nghiệm.',
    conditionSummary: 'm ∈ [1; 4], p ∈ [-3; 3] \\ {0}, |q| > 2|p|, B ∈ [2; 10]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 1, max: 4 },
      { name: 'p', label: 'Hệ số p của sin(2mx)', min: -3, max: 3, allowZero: false },
      { name: 'q', label: 'Hệ số q (|q| > 2|p|)', min: -9, max: 9, allowZero: false },
      { name: 'B', label: 'Biên B ([-Bπ; Bπ])', min: 2, max: 10 },
      { name: 'mode', label: 'Nhân tử (0: cos, 1: sin)', min: 0, max: 1 },
    ],
    validateCode: `
      const { m, p, q, B, mode } = params;
      if (m < 1 || m > 4 || p === 0 || q === 0 || B < 2 || B > 10) return { valid: false, reason: 'Tham số ngoài miền' };
      if (p < -3 || p > 3 || q < -9 || q > 9) return { valid: false, reason: 'p, q ngoài miền' };
      if (Math.abs(q) <= 2 * Math.abs(p)) return { valid: false, reason: 'Cần |q| > 2|p| để nhân tử còn lại vô nghiệm' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode thuộc {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, p, q, B, mode } = params;
      ` + TRIG11_B4_SA_HELPERS + String.raw`
      const ang1 = m === 1 ? 'x' : m + 'x';
      const ang2 = (2 * m) + 'x';
      const fnFactor = mode === 0 ? '\\cos ' + ang1 : '\\sin ' + ang1;
      const fnOther = mode === 0 ? '\\sin ' + ang1 : '\\cos ' + ang1;
      const t1 = u.formatTerm(p, '\\sin ' + ang2, true);
      const t2 = u.formatTerm(q, fnFactor, false);
      const eqStr = t1 + t2 + ' = 0';

      const ans = mode === 0 ? 2 * m * B : 2 * m * B + 1;
      const otherRhs = u.simplifyFrac(-q, 2 * p);
      const rootLine = mode === 0
        ? fmtRootExpr(1, 2 * m, 1, m)
        : fmtRootExpr(0, 1, 1, m);
      const lBound = mode === 0 ? u.simplifyFrac(-2 * m * B - 1, 2) : { latex: String(-m * B) };
      const uBound = mode === 0 ? u.simplifyFrac(2 * m * B - 1, 2) : { latex: String(m * B) };

      return {
        stem: 'Số nghiệm thuộc đoạn $[-' + B + '\\pi;\\, ' + B + '\\pi]$ của phương trình $' + eqStr + '$ là',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $' + eqStr + ' \\Leftrightarrow ' + fnFactor + '\\left(' + u.formatLinear(2 * p, q, fnOther) + '\\right) = 0$.',
          'Do $' + fnOther + ' = ' + otherRhs.latex + '$ vô nghiệm (vì $\\left|' + otherRhs.latex + '\\right| > 1$), suy ra $' + fnFactor + ' = 0 \\Leftrightarrow ' + rootLine + '\\; (k \\in \\mathbb{Z})$.',
          'Với $x \\in [-' + B + '\\pi;\\, ' + B + '\\pi]$ ta được $' + lBound.latex + ' \\le k \\le ' + uBound.latex + '$, có $' + ans + '$ giá trị nguyên $k$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên |q| <= 2|p| (nhân tử hai có nghiệm)', params: { m: 1, p: -1, q: 2, B: 9, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (-sin 2x + 4cos x = 0 trên [-9π;9π] -> 18)', params: { m: 1, p: -1, q: 4, B: 9, mode: 0 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Đếm số nghiệm sin(mx)·cos(mx)·cos(2mx) = 0 trên [-Bπ; Bπ] hoặc (-Bπ; Bπ)
  t11_b4_d28_count_roots_triple_prod_sa: {
    id: 't11_b4_d28_count_roots_triple_prod_sa',
    name: 'Đếm số nghiệm phương trình sin(mx)·cos(mx)·cos(2mx) = 0 trên [-Bπ; Bπ]',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm nghiệm phương trình lượng giác',
    description: 'Áp dụng công thức nhân đôi liên tiếp đưa sin(mx)cos(mx)cos(2mx) = 0 về sin(4mx) = 0 và đếm nghiệm.',
    conditionSummary: 'm ∈ [1; 5], B ∈ [2; 9], closed ∈ {0, 1}',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 1, max: 5 },
      { name: 'B', label: 'Biên B ([-Bπ; Bπ])', min: 2, max: 9 },
      { name: 'closed', label: 'Kiểu miền (1: đoạn, 0: khoảng)', min: 0, max: 1 },
    ],
    validateCode: `
      const { m, B, closed } = params;
      if (m < 1 || m > 5 || B < 2 || B > 9) return { valid: false, reason: 'm thuộc [1; 5], B thuộc [2; 9]' };
      if (closed !== 0 && closed !== 1) return { valid: false, reason: 'closed thuộc {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, B, closed } = params;
      ` + TRIG11_B4_SA_HELPERS + String.raw`
      const ang1 = m === 1 ? 'x' : m + 'x';
      const ang2 = (2 * m) + 'x';
      const ang4 = (4 * m) + 'x';
      const maxK = 4 * m * B;
      const ans = closed === 1 ? 2 * maxK + 1 : 2 * maxK - 1;
      const intervalStr = closed === 1 ? '[-' + B + '\\pi;\\, ' + B + '\\pi]' : '(-' + B + '\\pi;\\, ' + B + '\\pi)';
      const domainLabel = closed === 1 ? 'đoạn' : 'khoảng';
      const cmpOp = closed === 1 ? '\\le' : '<';

      return {
        stem: 'Số nghiệm thuộc ' + domainLabel + ' $' + intervalStr + '$ của phương trình $\\sin ' + ang1 + ' \\cos ' + ang1 + ' \\cos ' + ang2 + ' = 0$ là',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\sin ' + ang1 + ' \\cos ' + ang1 + ' \\cos ' + ang2 + ' = 0 \\Leftrightarrow \\frac{1}{2}\\sin ' + ang2 + ' \\cos ' + ang2 + ' = 0 \\Leftrightarrow \\frac{1}{4}\\sin ' + ang4 + ' = 0$.',
          'Suy ra $' + ang4 + ' = k\\pi \\Leftrightarrow ' + fmtRootExpr(0, 1, 1, 4 * m) + '\\; (k \\in \\mathbb{Z})$.',
          'Với $x \\in ' + intervalStr + '$ ta có $-' + maxK + ' ' + cmpOp + ' k ' + cmpOp + ' ' + maxK + '$, nên có $' + ans + '$ giá trị nguyên $k$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { m: 0, B: 9, closed: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (sin 3x cos 3x cos 6x = 0 trên [-9π;9π] -> 217)', params: { m: 3, B: 9, closed: 1 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Đếm số nghiệm cos^2(mx) = 1/2 trên [-Bπ; Bπ]
  t11_b4_d29_count_roots_cos2_half_sa: {
    id: 't11_b4_d29_count_roots_cos2_half_sa',
    name: 'Đếm số nghiệm phương trình cos²(mx) = 1/2 trên [-Bπ; Bπ]',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm nghiệm phương trình lượng giác',
    description: 'Hạ bậc cos²(mx) = 1/2 về cos(2mx) = 0 và đếm số nghiệm thuộc đoạn [-Bπ; Bπ].',
    conditionSummary: 'm ∈ [2; 10], B ∈ [2; 9]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 10 },
      { name: 'B', label: 'Biên B ([-Bπ; Bπ])', min: 2, max: 9 },
    ],
    validateCode: `
      const { m, B } = params;
      if (m < 2 || m > 10 || B < 2 || B > 9) return { valid: false, reason: 'm thuộc [2; 10], B thuộc [2; 9]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, B } = params;
      const twoM = 2 * m;
      const fourM = 4 * m;
      const bound = fourM * B;
      const ans = bound; // odd integers in [-4mB, 4mB] is 4mB
      return {
        stem: 'Tìm số nghiệm thuộc đoạn $[-' + B + '\\pi;\\, ' + B + '\\pi]$ của phương trình $\\cos^2 ' + m + 'x = \\frac{1}{2}$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Hạ bậc: $\\cos^2 ' + m + 'x = \\frac{1}{2} \\Leftrightarrow \\frac{1 + \\cos ' + twoM + 'x}{2} = \\frac{1}{2} \\Leftrightarrow \\cos ' + twoM + 'x = 0$.',
          'Suy ra $' + twoM + 'x = \\frac{\\pi}{2} + k\\pi \\Leftrightarrow x = \\frac{(2k + 1)\\pi}{' + fourM + '}\\; (k \\in \\mathbb{Z})$.',
          'Do $x \\in [-' + B + '\\pi;\\, ' + B + '\\pi]$ nên $-' + bound + ' \\le 2k + 1 \\le ' + bound + '$. Trong đoạn $[-' + bound + ';\\, ' + bound + ']$ có $' + ans + '$ số nguyên lẻ nên phương trình có $' + ans + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { m: 1, B: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (cos² 7x = 1/2 trên [-5π;5π] -> 140)', params: { m: 7, B: 5 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Đếm số nghiệm sin^2(mx) = 1/2 trên [Aπ; Bπ]
  t11_b4_d30_count_roots_sin2_half_sa: {
    id: 't11_b4_d30_count_roots_sin2_half_sa',
    name: 'Đếm số nghiệm phương trình sin²(mx) = 1/2 trên đoạn [Aπ; Bπ]',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đếm nghiệm phương trình lượng giác',
    description: 'Hạ bậc sin²(mx) = 1/2 về cos(2mx) = 0 và đếm số nghiệm thuộc đoạn [Aπ; Bπ].',
    conditionSummary: 'm ∈ [2; 10], A ∈ [-9; -1], B ∈ [1; 9]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 2, max: 10 },
      { name: 'A', label: 'Cận dưới A (Aπ)', min: -9, max: -1 },
      { name: 'B', label: 'Cận trên B (Bπ)', min: 1, max: 9 },
    ],
    validateCode: `
      const { m, A, B } = params;
      if (m < 2 || m > 10 || A < -9 || A > -1 || B < 1 || B > 9 || A >= B) {
        return { valid: false, reason: 'Tham số ngoài miền (cần A < 0 < B)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, A, B } = params;
      const twoM = 2 * m;
      const fourM = 4 * m;
      const lowBound = fourM * A;
      const highBound = fourM * B;
      const ans = 2 * m * (B - A);
      return {
        stem: 'Tìm số nghiệm thuộc đoạn $[' + A + '\\pi;\\, ' + B + '\\pi]$ của phương trình $\\sin^2 ' + m + 'x = \\frac{1}{2}$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Hạ bậc: $\\sin^2 ' + m + 'x = \\frac{1}{2} \\Leftrightarrow \\frac{1 - \\cos ' + twoM + 'x}{2} = \\frac{1}{2} \\Leftrightarrow \\cos ' + twoM + 'x = 0$.',
          'Suy ra $' + twoM + 'x = \\frac{\\pi}{2} + k\\pi \\Leftrightarrow x = \\frac{(2k + 1)\\pi}{' + fourM + '}\\; (k \\in \\mathbb{Z})$.',
          'Do $x \\in [' + A + '\\pi;\\, ' + B + '\\pi]$ nên $' + lowBound + ' \\le 2k + 1 \\le ' + highBound + '$. Trong đoạn $[' + lowBound + ';\\, ' + highBound + ']$ có $' + ans + '$ số nguyên lẻ nên phương trình có $' + ans + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A >= B', params: { m: 9, A: 2, B: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (sin² 9x = 1/2 trên [-7π;7π] -> 252)', params: { m: 9, A: -7, B: 7 }, expectedValid: true },
    ],
  },
};
