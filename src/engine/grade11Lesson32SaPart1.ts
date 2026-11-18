import { MathTemplate } from '../types/math';

export const G11_B32_SA_PART1: Record<string, MathTemplate> = {
  // Q65: f(x) = log_a x + log_b x đi qua M(e; k), tính f'(x0)
  t11_b32_d65_log_sum_point_sa: {
    id: 't11_b32_d65_log_sum_point_sa',
    name: 'Tính đạo hàm hàm tổng logarit đi qua điểm M(e; k)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Cho f(x) = log_a(x) + log_b(x) đi qua M(e; k). Tính f\'(x₀) làm tròn đến hàng phần mười.',
    conditionSummary: 'k ∈ [3; 18], x₀ ∈ [2; 15]',
    paramSpecs: [
      { name: 'k', label: 'Tung độ k của M(e; k)', min: 3, max: 18 },
      { name: 'x0', label: 'Điểm x₀', min: 2, max: 15 },
    ],
    validateCode: `
      const { k, x0 } = params;
      if (k < 3 || k > 18 || x0 < 2 || x0 > 15) return { valid: false, reason: 'Tham số ngoài miền' };
      // Avoid exact .x5 edge rounding sensitivity
      const rem = (k * 20) % (x0 * 2);
      if (rem === x0) return { valid: false, reason: 'Tránh ranh giới làm tròn ,x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, x0 } = params;
      const ans = Math.round((k / x0) * 10 + 1e-9) / 10;
      const ansStr = u.formatNumberVN(ans, 1);
      const fr = u.simplifyFrac(k, x0);

      return {
        stem: 'Cho $a, b$ là hai số thực dương khác $1$ thỏa mãn đồ thị hàm số $y=f(x)=\\log_a x+\\log_b x$ luôn đi qua điểm $M(e;' + k + ')$. Tính đạo hàm của hàm số tại điểm $x=' + x0 + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $f(x)=\\log_a x+\\log_b x=\\ln x\\left(\\dfrac{1}{\\ln a}+\\dfrac{1}{\\ln b}\\right)$.',
          'Vì đồ thị đi qua $M(e;' + k + ')$ nên $f(e)=' + k + ' \\Rightarrow \\dfrac{1}{\\ln a}+\\dfrac{1}{\\ln b}=' + k + '$.',
          "Suy ra $f'(x)=\\dfrac{" + k + '}{x} \\Rightarrow f\'(' + x0 + ')=' + fr.latex + '\\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 2', params: { k: 2, x0: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q65 (M(e;9), x0=7 -> 1,3)', params: { k: 9, x0: 7 }, expectedValid: true },
    ],
  },

  // Q66: Tính vận tốc tại thời điểm t0 với s(t) bậc 2 (SA)
  t11_b32_d66_kinematics_v_sa: {
    id: 't11_b32_d66_kinematics_v_sa',
    name: 'Tính vận tốc tức thời của chuyển động s(t) bậc hai (trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho s(t) = at² + bt + c. Tính vận tốc tại thời điểm t₀.',
    conditionSummary: 'a, b, c ∈ [1; 9], t₀ ∈ [2; 12]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số t² (a)', min: 1, max: 9 },
      { name: 'b', label: 'Hệ số t (b)', min: 1, max: 9 },
      { name: 'c', label: 'Hằng số c', min: 1, max: 9 },
      { name: 't0', label: 'Thời điểm t₀', min: 2, max: 12 },
    ],
    validateCode: `
      const { a, b, c, t0 } = params;
      if ([a, b, c, t0].some((v) => v <= 0)) return { valid: false, reason: 'Tham số phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, t0 } = params;
      const st = u.formatPoly([a, b, c], 't');
      const vt = u.formatLinear(2 * a, b, 't');
      const ans = 2 * a * t0 + b;
      return {
        stem: 'Một vật chuyển động thẳng không đều xác định bởi phương trình $s(t)=' + st + '$, trong đó $s$ tính bằng mét và $t$ tính bằng giây. Tính vận tốc của chuyển động tại thời điểm $t=' + t0 + '$ (đơn vị: m/s).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          "$v(t)=s'(t)=(" + st + ")'=" + vt + '$.',
          '$v(' + t0 + ')=' + ans + '$ (m/s).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 3, c: 4, t0: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q66 (5t²+3t+4 tại t=8 -> 83)', params: { a: 5, b: 3, c: 4, t0: 8 }, expectedValid: true },
    ],
  },

  // Q67: Tính gia tốc tại thời điểm t0 với s(t) bậc 3 (SA)
  t11_b32_d67_kinematics_a_sa: {
    id: 't11_b32_d67_kinematics_a_sa',
    name: 'Tính gia tốc tức thời của chuyển động s(t) bậc ba (trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho s(t) = at³ + bt² + ct + d. Tính gia tốc tại thời điểm t₀.',
    conditionSummary: 'a, b, c, d ∈ [1; 8], t₀ ∈ [2; 10]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số t³ (a)', min: 1, max: 8 },
      { name: 'b', label: 'Hệ số t² (b)', min: 1, max: 8 },
      { name: 'c', label: 'Hệ số t (c)', min: 1, max: 8 },
      { name: 'd', label: 'Hằng số d', min: 1, max: 8 },
      { name: 't0', label: 'Thời điểm t₀', min: 2, max: 10 },
    ],
    validateCode: `
      const { a, b, c, d, t0 } = params;
      if ([a, b, c, d, t0].some((v) => v <= 0)) return { valid: false, reason: 'Tham số phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, t0 } = params;
      const st = u.formatPoly([a, b, c, d], 't');
      const vt = u.formatPoly([3 * a, 2 * b, c], 't');
      const at = u.formatLinear(6 * a, 2 * b, 't');
      const ans = 6 * a * t0 + 2 * b;
      return {
        stem: 'Một vật chuyển động thẳng không đều xác định bởi phương trình $s(t)=' + st + '$, trong đó $s$ tính bằng mét và $t$ tính bằng giây. Tính gia tốc của chuyển động tại thời điểm $t=' + t0 + '$ (đơn vị: $\\text{m/s}^2$).',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          "$v(t)=s'(t)=(" + st + ")'=" + vt + '$.',
          "$a(t)=v'(t)=(" + vt + ")'=" + at + '$.',
          '$a(' + t0 + ')=' + ans + '$ ($\\text{m/s}^2$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 2, c: 1, d: 6, t0: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q67 (2t³+2t²+t+6 tại t=6 -> 76)', params: { a: 2, b: 2, c: 1, d: 6, t0: 6 }, expectedValid: true },
    ],
  },

  // Q68: Tính gia tốc khi vận tốc triệt tiêu
  t11_b32_d68_accel_when_v_zero_sa: {
    id: 't11_b32_d68_accel_when_v_zero_sa',
    name: 'Tính gia tốc tại thời điểm vận tốc triệt tiêu',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho phương trình chuyển động s(t) bậc ba, tính gia tốc tại thời điểm vận tốc bằng 0 (t > 0).',
    conditionSummary: 'tPos ∈ [2; 9], tNeg ∈ [1; 6], tNeg ≡ tPos (mod 2)',
    paramSpecs: [
      { name: 'tPos', label: 'Nghiệm dương t₁ của v(t)=0', min: 2, max: 9 },
      { name: 'tNeg', label: 'Giá trị |t₂| (nghiệm âm)', min: 1, max: 6 },
    ],
    validateCode: `
      const { tPos, tNeg } = params;
      if (tPos < 2 || tNeg < 1) return { valid: false, reason: 'tPos ≥ 2, tNeg ≥ 1' };
      if ((tPos - tNeg) % 2 !== 0) return { valid: false, reason: 'Ưu tiên hệ số t² nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { tPos, tNeg } = params;
      // v(t) = (t - tPos)(t + tNeg) = t^2 + (tNeg - tPos)t - tPos*tNeg
      const bV = tNeg - tPos;
      const cV = -tPos * tNeg;
      const bS = bV / 2;
      const st = '\\frac{t^{3}}{3}' + u.formatTerm(bS, 't^{2}', false) + u.formatTerm(cV, 't', false);
      const vt = u.formatPoly([1, bV, cV], 't');
      const at = u.formatLinear(2, bV, 't');
      const ans = 2 * tPos + bV; // = tPos + tNeg

      return {
        stem: 'Một vật đang chuyển động thẳng theo thời gian $t$ (tính bằng giây) xác định bởi hàm số $s(t)=' + st + '$ (đơn vị: mét). Tính gia tốc của vật tại thời điểm vận tốc của vật triệt tiêu.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          "$v(t)=s'(t)=" + vt + '$.',
          'Vận tốc triệt tiêu khi $v(t)=0 \\Leftrightarrow ' + vt + '=0 \\Rightarrow t=-' + tNeg + '$ (loại) hoặc $t=' + tPos + '$.',
          "$a(t)=v'(t)=" + at + ' \\Rightarrow a(' + tPos + ')=' + ans + '$ ($\\text{m/s}^2$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên lệch tính chẵn lẻ', params: { tPos: 6, tNeg: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q68 (t³/3 - 2t² - 12t -> 8)', params: { tPos: 6, tNeg: 2 }, expectedValid: true },
    ],
  },

  // Q69: Tính vận tốc khi gia tốc triệt tiêu (số thập phân, làm tròn hàng phần trăm)
  t11_b32_d69_vel_when_a_zero_sa: {
    id: 't11_b32_d69_vel_when_a_zero_sa',
    name: 'Tính vận tốc tại thời điểm gia tốc triệt tiêu',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho s(t) = a t³ - b t² + c t + d, tính vận tốc tại thời điểm gia tốc bằng 0 (làm tròn hàng phần trăm).',
    conditionSummary: 'a ∈ [1; 4], b = b10/10 > 0, c = c10/10 > 0, v(t₀) > 0 và ổn định làm tròn',
    paramSpecs: [
      { name: 'a', label: 'Hệ số t³ (a)', min: 1, max: 4 },
      { name: 'b10', label: '10·b', min: 45, max: 165, step: 5 },
      { name: 'c10', label: '10·c', min: 120, max: 350, step: 2 },
      { name: 'd', label: 'Hằng số d', min: 1, max: 9 },
    ],
    validateCode: `
      const { a, b10, c10 } = params;
      if (a < 1 || b10 <= 0 || c10 <= 0) return { valid: false, reason: 'Tham số không hợp lệ' };
      const b = b10 / 10;
      const c = c10 / 10;
      const tExact = b / (3 * a);
      const tRound2 = Math.round(tExact * 100 + 1e-9) / 100;
      const vExact = 3 * a * tExact * tExact - 2 * b * tExact + c;
      const vRound2FromT2 = 3 * a * tRound2 * tRound2 - 2 * b * tRound2 + c;
      if (vExact <= 0.5) return { valid: false, reason: 'Vận tốc phải dương' };
      const rExact = Math.round(vExact * 100 + 1e-9) / 100;
      const rMid = Math.round(vRound2FromT2 * 100 + 1e-9) / 100;
      if (rExact !== rMid) return { valid: false, reason: 'Tránh sai khác làm tròn trung gian' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b10, c10, d } = params;
      const b = b10 / 10;
      const c = c10 / 10;
      const fmtDec = (val) => (Number.isInteger(val) ? String(val) : u.formatNumberVN(val, 2));
      const st = u.formatTerm(a, 't^{3}', true) + ' - ' + fmtDec(b) + ' t^{2} + ' + fmtDec(c) + ' t + ' + d;
      const vt = u.formatTerm(3 * a, 't^{2}', true) + ' - ' + fmtDec(2 * b) + ' t + ' + fmtDec(c);
      const at = (6 * a) + ' t - ' + fmtDec(2 * b);
      const tExact = b / (3 * a);
      const tRound2 = Math.round(tExact * 100 + 1e-9) / 100;
      const vVal = 3 * a * tRound2 * tRound2 - 2 * b * tRound2 + c;
      const ans = Math.round(vVal * 100 + 1e-9) / 100;
      const ansStr = u.formatNumberVN(ans, 2);

      return {
        stem: 'Quãng đường chuyển động của một chất điểm xác định bởi $s(t)=' + st + '$, trong đó $s$ tính bằng mét và $t$ tính bằng giây. Tính vận tốc tại thời điểm gia tốc triệt tiêu (quá trình tính toán các kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          "Vận tốc của chất điểm: $v(t)=s'(t)=" + vt + '$.',
          "Gia tốc của chất điểm: $a(t)=v'(t)=" + at + '$.',
          'Gia tốc triệt tiêu khi $a(t)=0 \\Leftrightarrow t \\approx ' + u.formatNumberVN(tRound2, 2) + '$.',
          'Vận tốc lúc đó là $v(' + u.formatNumberVN(tRound2, 2) + ') \\approx ' + ansStr + '$ (m/s).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b10: 125, c10: 292, d: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q69 (2t³-12,5t²+29,2t+2 -> 3,16)', params: { a: 2, b10: 125, c10: 292, d: 2 }, expectedValid: true },
    ],
  },

  // Q70: Vận tốc nhỏ nhất của chuyển động s(t) = a t^3 - b t^2 + c t + d
  t11_b32_d70_min_vel_sa: {
    id: 't11_b32_d70_min_vel_sa',
    name: 'Tìm vận tốc nhỏ nhất của chuyển động bậc ba',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho s(t) = at³ - bt² + ct + d (a > 0, b > 0). Tính vận tốc nhỏ nhất của chuyển động (làm tròn hàng phần mười).',
    conditionSummary: 'a ∈ [1; 3], b ∈ [1; 9], c ∈ [4; 20], v_min > 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a > 0', min: 1, max: 3 },
      { name: 'b', label: 'Hệ số b > 0 (trong -bt²)', min: 1, max: 9 },
      { name: 'c', label: 'Hệ số c', min: 4, max: 20 },
      { name: 'd', label: 'Hằng số d', min: 1, max: 9 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a <= 0 || b <= 0) return { valid: false, reason: 'a, b phải dương' };
      const vmin = c - (b * b) / (3 * a);
      if (vmin <= 0.5) return { valid: false, reason: 'v_min phải dương' };
      // Avoid .x5 midpoint ambiguity (3ac - b^2)/(3a) -> 20*(3ac - b^2) % (6a) === 3a
      if ((20 * (3 * a * c - b * b)) % (6 * a) === 3 * a) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn ,x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const st = u.formatPoly([a, -b, c, d], 't');
      const vt = u.formatPoly([3 * a, -2 * b, c], 't');
      const tMinFr = u.simplifyFrac(b, 3 * a);
      const vminExact = c - (b * b) / (3 * a);
      const ans = Math.round(vminExact * 10 + 1e-9) / 10;
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem: 'Quãng đường chuyển động của một chất điểm xác định bởi $s(t)=' + st + '$, trong đó $s$ tính bằng mét và $t$ tính bằng giây. Tính vận tốc nhỏ nhất của chuyển động (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          "Vận tốc của chất điểm: $v(t)=s'(t)=" + vt + '$.',
          'Do $' + (3 * a) + ' > 0$ nên $v(t)$ đạt giá trị nhỏ nhất tại $t=\\frac{' + b + '}{2\\cdot ' + (3 * a) + '}=' + tMinFr.latex + '$.',
          'Vận tốc nhỏ nhất là $v\\left(' + tMinFr.latex + '\\right)\\approx ' + ansStr + '$ (m/s).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 1, c: 9, d: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q70 (t³-t²+9t+4 -> 8,7)', params: { a: 1, b: 1, c: 9, d: 4 }, expectedValid: true },
    ],
  },

  // Q71: Vận tốc lớn nhất của chuyển động s(t) = -a t^3 + (b/2) t^2 + ct + d
  t11_b32_d71_max_vel_sa: {
    id: 't11_b32_d71_max_vel_sa',
    name: 'Tìm vận tốc lớn nhất của chuyển động bậc ba',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho s(t) = -at³ + (b/2)t² + d (a > 0, b > 0). Tính vận tốc lớn nhất (làm tròn hàng phần mười).',
    conditionSummary: 'a ∈ [1; 3], b ∈ [3; 15], d ∈ [1; 20]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a > 0 (trong -at³)', min: 1, max: 3 },
      { name: 'b', label: 'Tử số b trong (b/2)t²', min: 3, max: 15 },
      { name: 'd', label: 'Hằng số d', min: 1, max: 20 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a <= 0 || b <= 0) return { valid: false, reason: 'a, b phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, d } = params;
      const b2Fr = u.simplifyFrac(b, 2);
      const t2Term = b2Fr.den === 1
        ? u.formatTerm(b2Fr.num, 't^{2}', false)
        : ' + \\frac{' + b + ' t^{2}}{2}';
      const st = u.formatTerm(-a, 't^{3}', true) + t2Term + u.formatTrailingConst(d);
      const vt = u.formatLinear(-3 * a, b, 't');
      const vtFull = u.formatPoly([-3 * a, b, 0], 't');
      const tMaxFr = u.simplifyFrac(b, 6 * a);
      const vmaxNum = b * b;
      const vmaxDen = 12 * a;
      const ans = Math.round((vmaxNum / vmaxDen) * 10 + 1e-9) / 10;
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem: 'Quãng đường chuyển động của một chất điểm xác định bởi $s(t)=' + st + '$, trong đó $s$ tính bằng mét và $t$ tính bằng giây. Tính vận tốc lớn nhất của chuyển động (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          "Vận tốc của chất điểm: $v(t)=s'(t)=" + vtFull + '$.',
          'Do $-' + (3 * a) + ' < 0$ nên $v(t)$ đạt giá trị lớn nhất tại $t=-\\frac{' + b + '}{2\\cdot(-' + (3 * a) + ')}=' + tMaxFr.latex + '$.',
          'Vận tốc lớn nhất là $v\\left(' + tMaxFr.latex + '\\right)=' + u.simplifyFrac(vmaxNum, vmaxDen).latex + '\\approx ' + ansStr + '$ (m/s).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 9, d: 14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q71 (-t³ + 9/2 t² + 14 -> 6,8)', params: { a: 1, b: 9, d: 14 }, expectedValid: true },
    ],
  },

  // Q72: Tổng quãng đường vật đi được trong T giây đầu tiên (đổi chiều 2 lần tại t1, t2)
  t11_b32_d72_total_distance_sa: {
    id: 't11_b32_d72_total_distance_sa',
    name: 'Tính tổng quãng đường vật đi được trong T giây đầu khi đổi chiều',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho s(t) = t³ - bt² + ct, biết vận tốc đổi dấu tại t₁, t₂ ∈ (0; T). Tính tổng quãng đường trong T giây đầu.',
    conditionSummary: '1 ≤ t₁ < t₂ < T ≤ 14, t₁ + t₂ chẵn',
    paramSpecs: [
      { name: 't1', label: 'Thời điểm đổi chiều t₁', min: 1, max: 5 },
      { name: 't2', label: 'Thời điểm đổi chiều t₂', min: 3, max: 9 },
      { name: 'T', label: 'Thời gian khảo sát T', min: 5, max: 13 },
    ],
    validateCode: `
      const { t1, t2, T } = params;
      if (t1 < 1 || t2 <= t1 || T <= t2) return { valid: false, reason: 'Yêu cầu 1 ≤ t₁ < t₂ < T' };
      if ((t1 + t2) % 2 !== 0) return { valid: false, reason: 'Ưu tiên t₁ + t₂ chẵn để hệ số nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { t1, t2, T } = params;
      // v(t) = 3(t - t1)(t - t2) = 3t^2 - 3(t1+t2)t + 3*t1*t2
      // s(t) = t^3 - 3*(t1+t2)/2 * t^2 + 3*t1*t2 * t
      const bS = -(3 * (t1 + t2)) / 2;
      const cS = 3 * t1 * t2;
      const st = u.formatPoly([1, bS, cS, 0], 't');
      const vt = u.formatPoly([3, 2 * bS, cS], 't');
      const sVal = (t) => t * t * t + bS * t * t + cS * t;
      const s0 = sVal(0);
      const s1 = sVal(t1);
      const s2 = sVal(t2);
      const sT = sVal(T);
      const d1 = Math.abs(s1 - s0);
      const d2 = Math.abs(s2 - s1);
      const d3 = Math.abs(sT - s2);
      const total = d1 + d2 + d3;

      return {
        stem: 'Một vật chuyển động thẳng được cho bởi phương trình $s=f(t)=' + st + '$, trong đó $t$ tính bằng giây và $s$ tính bằng mét. Tính tổng quãng đường vật đi được trong $' + T + '$ giây đầu tiên.',
        shortAnswer: String(total),
        numericValue: total,
        answerSummary: String(total),
        solutionSteps: [
          "Vận tốc của vật: $v(t)=s'(t)=" + vt + '=3(t-' + t1 + ')(t-' + t2 + ')$.',
          'Vật đổi chiều chuyển động tại $t=' + t1 + '$ và $t=' + t2 + '$.',
          'Ta có $s(0)=' + s0 + ',\\; s(' + t1 + ')=' + s1 + ',\\; s(' + t2 + ')=' + s2 + ',\\; s(' + T + ')=' + sT + '$.',
          'Tổng quãng đường trong $' + T + '$ giây đầu là $S=|s(' + t1 + ')-s(0)|+|s(' + t2 + ')-s(' + t1 + ')|+|s(' + T + ')-s(' + t2 + ')|=' + d1 + '+' + d2 + '+' + d3 + '=' + total + '$ (m).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên T <= t2', params: { t1: 3, t2: 7, T: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q72 (t³-15t²+63t, T=9 -> 145)', params: { t1: 3, t2: 7, T: 9 }, expectedValid: true },
    ],
  },

  // Q73: Số nghiệm trên [-Nπ; Nπ] của f'(x) = 0 với f(x) = a x + cos(a x + φ)
  t11_b32_d73_count_trig_sols_cos_sa: {
    id: 't11_b32_d73_count_trig_sols_cos_sa',
    name: 'Đếm số nghiệm phương trình f\'(x) = 0 với f(x) = ax + cos(ax + φ)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Cho f(x) = ax + cos(ax + φ). Đếm số nghiệm của f\'(x) = 0 trên đoạn [-Nπ; Nπ].',
    conditionSummary: 'a ∈ [2; 4], N ∈ [3; 12]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 4 },
      { name: 'phiIdx', label: 'Góc pha φ (0..3)', min: 0, max: 3 },
      { name: 'N', label: 'Giới hạn đoạn [-Nπ; Nπ]', min: 3, max: 12 },
    ],
    validateCode: `
      const { a, phiIdx, N } = params;
      if (a < 2 || a > 4 || phiIdx < 0 || phiIdx > 3 || N < 3 || N > 12) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, phiIdx, N } = params;
      // sin(a x + p*pi/q) = 1 => a x + p*pi/q = pi/2 + k*2pi => x/pi = (1/2 - p/q)/a + k*(2/a)
      const PHIS = [
        { p: 2, q: 3, latex: '\\frac{2\\pi}{3}' },
        { p: 1, q: 3, latex: '\\frac{\\pi}{3}' },
        { p: 1, q: 4, latex: '\\frac{\\pi}{4}' },
        { p: 1, q: 6, latex: '\\frac{\\pi}{6}' },
      ];
      const phi = PHIS[phiIdx];
      // alpha = (1/2 - p/q) / a = (q - 2p) / (2 a q), step = 2 / a
      const aNum = phi.q - 2 * phi.p;
      const aDen = 2 * a * phi.q;
      const x0Fr = u.simplifyFrac(aNum, aDen);
      const stepFr = u.simplifyFrac(2, a);
      // -N <= aNum/aDen + k*(2/a) <= N
      // (-N - aNum/aDen) * (a/2) <= k <= (N - aNum/aDen) * (a/2)
      const kMinExact = (-N - aNum / aDen) * (a / 2);
      const kMaxExact = (N - aNum / aDen) * (a / 2);
      const kMin = Math.ceil(kMinExact - 1e-12);
      const kMax = Math.floor(kMaxExact + 1e-12);
      const count = kMax - kMin + 1;

      const fx = a + ' x+\\cos\\left(' + a + ' x + ' + phi.latex + '\\right)';
      const stepStr = stepFr.den === 1 ? (stepFr.num === 1 ? '\\pi' : stepFr.num + '\\pi') : '\\frac{' + stepFr.num + '\\pi}{' + stepFr.den + '}';
      const x0Str = x0Fr.num === 0 ? '0' : (x0Fr.num < 0 ? '-' : '') + '\\frac{' + (Math.abs(x0Fr.num) === 1 ? '' : Math.abs(x0Fr.num)) + '\\pi}{' + x0Fr.den + '}';

      return {
        stem: 'Cho hàm số $f(x)=' + fx + "$. Số nghiệm thuộc đoạn $[-" + N + '\\pi;' + N + "\\pi]$ của phương trình $f'(x)=0$ là",
        shortAnswer: String(count),
        numericValue: count,
        answerSummary: String(count),
        solutionSteps: [
          "$f'(x)=0 \\Leftrightarrow \\sin\\left(" + a + ' x + ' + phi.latex + '\\right)=1 \\Leftrightarrow x=' + x0Str + '+k' + stepStr + '\\;(k\\in\\mathbb{Z})$.',
          'Do $x\\in [-' + N + '\\pi;' + N + '\\pi]$ nên $' + kMin + '\\le k\\le ' + kMax + '$.',
          'Có $' + count + '$ giá trị nguyên $k$ thỏa mãn nên phương trình có $' + count + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, phiIdx: 0, N: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q73 (2x+cos(2x+2π/3) trên [-10π;10π] -> 20)', params: { a: 2, phiIdx: 0, N: 10 }, expectedValid: true },
    ],
  },

  // Q74: Số nghiệm trên [-Nπ; Nπ] của f'(x) = 0 với f(x) = sin(x + φ) + x
  t11_b32_d74_count_trig_sols_sin_sa: {
    id: 't11_b32_d74_count_trig_sols_sin_sa',
    name: 'Đếm số nghiệm phương trình f\'(x) = 0 với f(x) = sin(x + φ) + x',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đạo hàm hàm lượng giác',
    description: 'Cho f(x) = sin(x + φ) + x. Đếm số nghiệm của f\'(x) = 0 trên đoạn [-Nπ; Nπ].',
    conditionSummary: 'N ∈ [2; 10]',
    paramSpecs: [
      { name: 'phiIdx', label: 'Góc pha φ (0..4)', min: 0, max: 4 },
      { name: 'N', label: 'Giới hạn đoạn [-Nπ; Nπ]', min: 2, max: 10 },
    ],
    validateCode: `
      const { phiIdx, N } = params;
      if (phiIdx < 0 || phiIdx > 4 || N < 2 || N > 10) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { phiIdx, N } = params;
      const PHIS = [
        { p: 1, q: 4, latex: '\\frac{\\pi}{4}' },
        { p: 1, q: 3, latex: '\\frac{\\pi}{3}' },
        { p: 1, q: 6, latex: '\\frac{\\pi}{6}' },
        { p: 2, q: 3, latex: '\\frac{2\\pi}{3}' },
        { p: 3, q: 4, latex: '\\frac{3\\pi}{4}' },
      ];
      const phi = PHIS[phiIdx];
      // cos(x + p*pi/q) = -1 => x/pi = (1 - p/q) + 2k
      const x0Fr = u.simplifyFrac(phi.q - phi.p, phi.q);
      const kMinFr = u.simplifyFrac(-N * x0Fr.den - x0Fr.num, 2 * x0Fr.den);
      const kMaxFr = u.simplifyFrac(N * x0Fr.den - x0Fr.num, 2 * x0Fr.den);
      const kMin = Math.ceil(kMinFr.value - 1e-12);
      const kMax = Math.floor(kMaxFr.value + 1e-12);
      const count = kMax - kMin + 1;
      const x0Str = '\\frac{' + (x0Fr.num === 1 ? '' : x0Fr.num) + '\\pi}{' + x0Fr.den + '}';

      return {
        stem: 'Cho hàm số $f(x)=\\sin\\left(x + ' + phi.latex + '\\right)+x$. Số nghiệm thuộc đoạn $[-' + N + '\\pi;' + N + "\\pi]$ của phương trình $f'(x)=0$ là",
        shortAnswer: String(count),
        numericValue: count,
        answerSummary: String(count),
        solutionSteps: [
          "$f'(x)=0 \\Leftrightarrow \\cos\\left(x + " + phi.latex + '\\right)=-1 \\Leftrightarrow x=' + x0Str + '+k2\\pi\\;(k\\in\\mathbb{Z})$.',
          'Do $x\\in [-' + N + '\\pi;' + N + '\\pi]$ nên $' + kMinFr.latex + '\\le k\\le ' + kMaxFr.latex + '\\Rightarrow ' + kMin + '\\le k\\le ' + kMax + '$.',
          'Có $' + count + '$ số nguyên $k$ thỏa mãn nên phương trình có $' + count + '$ nghiệm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên N = 1', params: { phiIdx: 0, N: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q74 (sin(x+π/4)+x trên [-4π;4π] -> 4)', params: { phiIdx: 0, N: 4 }, expectedValid: true },
    ],
  },

  // Q75: Bài toán dân số P(t) = C e^(rt) + M với P'(t) = r P(t) - k
  t11_b32_d75_population_exp_ode_sa: {
    id: 't11_b32_d75_population_exp_ode_sa',
    name: 'Bài toán thực tế tăng trưởng dân số dùng đạo hàm hàm mũ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đạo hàm hàm mũ và logarit',
    description: 'Cho mô hình dân số P(t) = C·e^(rt) + M thỏa mãn P\'(t) = r·P(t) - k. Tính mức tăng dân số sau T năm.',
    conditionSummary: 'r ∈ {0,04; 0,05; 0,06; 0,08}, M ∈ [80; 250], C > 100, T ∈ [5; 20]',
    paramSpecs: [
      { name: 'r100', label: '100·r', min: 4, max: 8 },
      { name: 'M', label: 'Hằng số M', min: 100, max: 250, step: 5 },
      { name: 'P0', label: 'Dân số ban đầu P(0)', min: 300, max: 600, step: 5 },
      { name: 'T', label: 'Số năm T', min: 5, max: 20 },
    ],
    validateCode: `
      const { r100, M, P0, T } = params;
      if (![4, 5, 6, 8].includes(r100)) return { valid: false, reason: 'r ∈ {0,04; 0,05; 0,06; 0,08}' };
      if (P0 <= M + 50 || T < 5 || T > 20) return { valid: false, reason: 'Yêu cầu C = P(0) - M > 50' };
      const r = r100 / 100;
      const k = (r100 * M) / 100;
      if (!Number.isInteger(k)) return { valid: false, reason: 'k = r·M phải là số nguyên đẹp' };
      const C = P0 - M;
      const delta = C * (Math.exp(r * T) - 1);
      // Avoid .5 rounding ambiguity except canonical Q75
      if (Math.abs(delta - Math.floor(delta) - 0.5) < 0.004) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn ,5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r100, M, P0, T } = params;
      const r = r100 / 100;
      const rStr = u.formatNumberVN(r, 2);
      const k = (r100 * M) / 100;
      const C = P0 - M;
      const pT = C * Math.exp(r * T) + M;
      const inc = pT - P0;
      const ans = Math.round(inc);

      return {
        stem: 'Dân số của một đô thị được cho bởi hàm số $P(t)=C\\cdot e^{' + rStr + 't}+M$, trong đó $C, M$ là các hằng số (đơn vị: nghìn người), thời gian $t$ tính bằng năm. Tốc độ biến thiên dân số tại thời điểm $t$ thỏa mãn hệ thức $P\'(t)=' + rStr + '\\cdot P(t)-' + k + '$ với $t \\ge 0$. Biết rằng dân số tại thời điểm ban đầu $(t=0)$ là $' + P0 + '$ nghìn người. Sau $' + T + '$ năm $(t=' + T + ')$, dân số của đô thị này tăng thêm khoảng bao nhiêu nghìn người (kết quả làm tròn đến hàng đơn vị)?',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          "Ta có $P'(t)=" + rStr + 'Ce^{' + rStr + 't}$.',
          'Từ hệ thức $' + rStr + 'Ce^{' + rStr + 't}=' + rStr + '(Ce^{' + rStr + 't}+M)-' + k + ' \\Rightarrow M=\\dfrac{' + k + '}{' + rStr + '}=' + M + '$.',
          'Do $P(0)=' + P0 + '$ nên $C+' + M + '=' + P0 + ' \\Rightarrow C=' + C + '$.',
          'Mức tăng dân số sau $' + T + '$ năm là $P(' + T + ')-P(0)=' + C + '\\left(e^{' + u.formatNumberVN(r * T, 2) + '}-1\\right)\\approx ' + u.formatNumberVN(inc, 2) + '\\approx ' + ans + '$ (nghìn người).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 0,07', params: { r100: 7, M: 150, P0: 395, T: 14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q75 (r=0,06, k=9, P0=395, T=14 -> 323)', params: { r100: 6, M: 150, P0: 395, T: 14 }, expectedValid: true },
    ],
  },

  // Q76: Tiếp tuyến parabol có hệ số góc k -> tính p*a + q*b
  t11_b32_d76_quad_tangent_lin_comb_sa: {
    id: 't11_b32_d76_quad_tangent_lin_comb_sa',
    name: 'Tính tổ hợp hệ số tiếp tuyến parabol biết hệ số góc k',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho parabol y = ax² + bx + c, tiếp tuyến có hệ số góc k dạng y = Ax + B. Tính p·A + q·B.',
    conditionSummary: 'a ∈ [-4; 4] \\ {0}, x₀ ∈ [-5; 5] \\ {0}, k = 2ax₀ + b ≠ 0, p, q ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ tiếp điểm x₀', min: -5, max: 5, allowZero: false },
      { name: 'p', label: 'Hệ số p của A', min: 1, max: 5 },
      { name: 'q', label: 'Hệ số q của B', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, x0, p, q } = params;
      if (a === 0 || b === 0 || c === 0 || x0 === 0 || p <= 0 || q === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (2 * a * x0 + b === 0) return { valid: false, reason: 'Hệ số góc k = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0, p, q } = params;
      const fx = u.formatPoly([a, b, c]);
      const fprime = u.formatLinear(2 * a, b);
      const k = 2 * a * x0 + b;
      const y0 = a * x0 * x0 + b * x0 + c;
      const bLine = y0 - k * x0;
      const ans = p * k + q * bLine;
      const combExpr = u.formatTerm(p, 'a', true) + u.formatTerm(q, 'b', false);

      return {
        stem: 'Cho hàm số $y=' + fx + '$. Biết tiếp tuyến của đồ thị hàm số có hệ số góc $k=' + k + '$ có phương trình dạng $y=ax+b$. Tính $' + combExpr + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          "Xét phương trình $y'=" + k + ' \\Leftrightarrow ' + fprime + '=' + k + ' \\Rightarrow x=' + x0 + '$.',
          'Với $x=' + x0 + ' \\Rightarrow y_0=f(' + x0 + ')=' + y0 + '$.',
          'Phương trình tiếp tuyến là: $y=' + k + '(x' + (x0 >= 0 ? '-' + x0 : '+' + Math.abs(x0)) + ')' + u.formatTrailingConst(y0) + ' \\Leftrightarrow y=' + u.formatLinear(k, bLine) + '$.',
          'Suy ra $a=' + k + ',\\; b=' + bLine + ' \\Rightarrow ' + combExpr + '=' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 3, c: 5, x0: 5, p: 4, q: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q76 (-x²+3x+5, k=-7, 4a-3b -> -118)', params: { a: -1, b: 3, c: 5, x0: 5, p: 4, q: -3 }, expectedValid: true },
    ],
  },

  // Q77: Hai tiếp tuyến của hàm bậc 3 có hệ số góc k -> tính |b1 + b2|
  t11_b32_d77_cubic_two_tangents_b_sum_sa: {
    id: 't11_b32_d77_cubic_two_tangents_b_sum_sa',
    name: 'Tính |b₁ + b₂| của hai tiếp tuyến đồ thị bậc ba có cùng hệ số góc k',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho hàm số bậc ba y = x³/3 + (b/2)x² + cx, tìm |b₁ + b₂| của hai tiếp tuyến có hệ số góc k (làm tròn hàng phần mười).',
    conditionSummary: 'x₁ < x₂ nguyên, k ≠ 0',
    paramSpecs: [
      { name: 'x1', label: 'Hoành độ tiếp điểm x₁', min: -4, max: 3 },
      { name: 'x2', label: 'Hoành độ tiếp điểm x₂', min: -2, max: 6 },
      { name: 'k', label: 'Hệ số góc k', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { x1, x2, k } = params;
      if (x1 >= x2 || k === 0) return { valid: false, reason: 'Yêu cầu x₁ < x₂ và k ≠ 0' };
      const bCoef = -(x1 + x2);
      const cCoef = k + x1 * x2;
      if (bCoef === 0 || cCoef === 0) return { valid: false, reason: 'Tránh triệt tiêu hệ số' };
      const numSum = -(2 * (Math.pow(x1, 3) + Math.pow(x2, 3)) + 3 * bCoef * (x1 * x1 + x2 * x2));
      if (numSum === 0) return { valid: false, reason: 'Tránh tổng bằng 0' };
      // Avoid .x5 midpoint ambiguity with denominator 6: (20 * |numSum|) % 12 === 6
      if ((20 * Math.abs(numSum)) % 12 === 6) return { valid: false, reason: 'Tránh ranh giới làm tròn ,x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, k } = params;
      // y = x^3/3 + (bCoef/2) x^2 + cCoef x, y' = x^2 + bCoef x + cCoef
      // y' = k <=> x^2 + bCoef x + x1*x2 = 0
      const bCoef = -(x1 + x2);
      const cCoef = k + x1 * x2;
      const b2Fr = u.simplifyFrac(bCoef, 2);
      const term2 = b2Fr.den === 1 ? u.formatTerm(b2Fr.num, 'x^{2}', false) : (bCoef < 0 ? ' - ' : ' + ') + '\\frac{' + Math.abs(bCoef) + ' x^{2}}{2}';
      const fx = '\\frac{x^{3}}{3}' + term2 + u.formatTerm(cCoef, 'x', false);
      const fprime = u.formatPoly([1, bCoef, cCoef]);
      const eqPoly = u.formatPoly([1, bCoef, x1 * x2]);

      // y(xi) - k*xi = xi^3/3 + (bCoef/2)*xi^2 + (cCoef - k)*xi = xi^3/3 + bCoef*xi^2/2 + x1*x2*xi
      const b1Fr = u.simplifyFrac(2 * Math.pow(x1, 3) + 3 * bCoef * x1 * x1 + 6 * x1 * x1 * x2, 6);
      const b2Fr2 = u.simplifyFrac(2 * Math.pow(x2, 3) + 3 * bCoef * x2 * x2 + 6 * x1 * x2 * x2, 6);
      const y1Fr = u.simplifyFrac(2 * Math.pow(x1, 3) + 3 * bCoef * x1 * x1 + 6 * cCoef * x1, 6);
      const y2Fr = u.simplifyFrac(2 * Math.pow(x2, 3) + 3 * bCoef * x2 * x2 + 6 * cCoef * x2, 6);

      const sumFr = u.simplifyFrac(b1Fr.num * b2Fr2.den + b2Fr2.num * b1Fr.den, b1Fr.den * b2Fr2.den);
      const absSumVal = Math.abs(sumFr.value);
      const ans = Math.round(absSumVal * 10 + 1e-9) / 10;
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem: 'Cho hàm số $y=' + fx + '$. Biết các tiếp tuyến của đồ thị hàm số có hệ số góc $k=' + k + '$ có các phương trình lần lượt là $y=a_1x+b_1$ và $y=a_2x+b_2$. Tính $|b_1+b_2|$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          "Xét phương trình $y'=" + k + ' \\Leftrightarrow ' + eqPoly + '=0 \\Rightarrow x=' + x1 + ',\\; x=' + x2 + '$.',
          'Với $x=' + x1 + '\\Rightarrow y_1=' + y1Fr.latex + '\\Rightarrow b_1=' + b1Fr.latex + '$.',
          'Với $x=' + x2 + '\\Rightarrow y_2=' + y2Fr.latex + '\\Rightarrow b_2=' + b2Fr2.latex + '$.',
          'Do đó $|b_1+b_2|=\\left|' + b1Fr.latex + (b2Fr2.num < 0 ? ' ' + b2Fr2.latex : ' + ' + b2Fr2.latex) + '\\right|\\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 >= x2', params: { x1: 4, x2: 2, k: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q77 (x³/3 - 7/2 x² + 5x, k=-5 -> 12,8)', params: { x1: 2, x2: 5, k: -5 }, expectedValid: true },
    ],
  },
};
