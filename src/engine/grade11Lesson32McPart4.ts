import { MathTemplate } from '../types/math';

export const G11_B32_MC_PART4: Record<string, MathTemplate> = {
  // Q48: Đạo hàm cấp hai của hàm bậc hai y = ax² + bx + c
  t11_b32_d48_quad_d2_mc: {
    id: 't11_b32_d48_quad_d2_mc',
    name: 'Tính đạo hàm cấp hai của hàm bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm cấp hai',
    description: 'Tính đạo hàm cấp hai của hàm số bậc hai y = ax² + bx + c.',
    conditionSummary: 'a, b, c ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const fx = u.formatPoly([a, b, c]);
      const y1 = u.formatLinear(2 * a, b);
      const y2 = 2 * a;
      const ans = "$y''=" + y2 + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y''=" + y1 + '$',
          "$y''=" + (y2 + 3) + '$',
          "$y''=" + u.formatLinear(2 * a - 2, b) + '$',
          "$y''=" + (-y2) + '$',
        ],
        rng,
        (idx) => "$y''=" + (y2 + idx * 2 + 1) + '$'
      );
      return {
        stem: 'Tính đạo hàm cấp hai của hàm số $y=' + fx + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "$y'=(" + fx + ")'=" + y1 + '$.',
          "$y''=(" + y1 + ")'=" + y2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -4, c: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48 (-5x²-4x+5)', params: { a: -5, b: -4, c: 5 }, expectedValid: true },
    ],
  },

  // Q49: Đạo hàm cấp hai của hàm bậc ba tại điểm x0
  t11_b32_d49_cubic_d2_at_x0_mc: {
    id: 't11_b32_d49_cubic_d2_at_x0_mc',
    name: 'Tính đạo hàm cấp hai của hàm bậc ba tại điểm x₀',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đạo hàm cấp hai',
    description: 'Tính đạo hàm cấp hai của hàm số y = ax³ + bx² + cx + d tại điểm x₀.',
    conditionSummary: 'a, b, c, d ∈ [-6; 6] \\ {0}, x₀ ∈ [-3; 3]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Điểm x₀', min: -3, max: 3 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, x0 } = params;
      const fx = u.formatPoly([a, b, c, d]);
      const y1 = u.formatPoly([3 * a, 2 * b, c]);
      const y2 = u.formatLinear(6 * a, 2 * b);
      const val = 6 * a * x0 + 2 * b;
      const correct = '$' + val + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + (val + 17) + '$',
          '$' + (-val) + '$',
          '$' + (3 * a * x0 * x0 + 2 * b * x0 + c) + '$',
          '$' + (val - 5) + '$',
        ],
        rng,
        (idx) => '$' + (val + idx * 3 + 1) + '$'
      );
      return {
        stem: 'Đạo hàm cấp hai của hàm số $y=' + fx + '$ tại điểm $x_0=' + x0 + '$ bằng',
        options,
        correctIndex,
        answerSummary: '$' + val + '$',
        solutionSteps: [
          "$y'=(" + fx + ")'=" + y1 + '$.',
          "$y''=(" + y1 + ")'=" + y2 + '$.',
          "Suy ra $y''(" + x0 + ')=' + val + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -5, c: 3, d: 3, x0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49 (-3x³-5x²+3x+3 tại x0=0)', params: { a: -3, b: -5, c: 3, d: 3, x0: 0 }, expectedValid: true },
    ],
  },

  // Q50: Đạo hàm cấp hai y = sin(ax + b)
  t11_b32_d50_sin_lin_d2_mc: {
    id: 't11_b32_d50_sin_lin_d2_mc',
    name: 'Tính đạo hàm cấp hai của hàm y = sin(ax + b)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm cấp hai',
    description: 'Tính đạo hàm cấp hai của hàm số y = sin(ax + b).',
    conditionSummary: 'a ∈ [-8; 8], |a| ≥ 2, b ∈ [-8; 8] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (Math.abs(a) < 2 || b === 0) return { valid: false, reason: '|a| ≥ 2 và b ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const arg = u.formatLinear(a, b);
      // Use positive leading coeff form for clean display: sin(-(ux+v)) = -sin(ux+v)
      const posArg = a < 0 ? u.formatLinear(-a, -b) : arg;
      const y1Coeff = a < 0 ? a : a; // actually sin(ax+b)' = a cos(ax+b) = a cos(posArg) since cos is even!
      const y2Coeff = a < 0 ? a * a : -(a * a); // since sin(ax+b) = -sin(posArg) when a < 0
      const y1Expr = y1Coeff + '\\cos\\left(' + posArg + '\\right)';
      const ansExpr = y2Coeff + '\\sin\\left(' + posArg + '\\right)';
      const ans = "$y''=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y''=" + y1Expr + '$',
          "$y''=" + (-y2Coeff) + '\\sin\\left(' + posArg + '\\right)$',
          "$y''=\\cos(" + arg + ')$',
          "$y''=" + (-y1Coeff) + '\\cos\\left(' + posArg + '\\right)$',
        ],
        rng,
        (idx) => "$y''=" + (y2Coeff + idx) + '\\sin\\left(' + posArg + '\\right)$'
      );
      return {
        stem: 'Tính đạo hàm cấp hai của hàm số $y=\\sin(' + arg + ')$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "$y'=\\left[\\sin(" + arg + ")\\right]'=" + y1Expr + '$.',
          "$y''=\\left[" + y1Expr + "\\right]'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên |a| = 1', params: { a: -1, b: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50 (sin(-5x-3))', params: { a: -5, b: -3 }, expectedValid: true },
    ],
  },

  // Q51: Đạo hàm cấp hai y = cos(ax + b)
  t11_b32_d51_cos_lin_d2_mc: {
    id: 't11_b32_d51_cos_lin_d2_mc',
    name: 'Tính đạo hàm cấp hai của hàm y = cos(ax + b)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm cấp hai',
    description: 'Tính đạo hàm cấp hai của hàm số y = cos(ax + b).',
    conditionSummary: 'a ∈ [-8; 8], |a| ≥ 2, b ∈ [-8; 8] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, b } = params;
      if (Math.abs(a) < 2 || b === 0) return { valid: false, reason: '|a| ≥ 2 và b ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const arg = u.formatLinear(a, b);
      const posArg = a < 0 ? u.formatLinear(-a, -b) : arg;
      // cos(ax+b)' = -a sin(ax+b) = -|a| sin(posArg)
      const y1Coeff = -Math.abs(a);
      const y2Coeff = -(a * a);
      const y1Expr = y1Coeff + '\\sin\\left(' + posArg + '\\right)';
      const ansExpr = y2Coeff + '\\cos\\left(' + posArg + '\\right)';
      const ans = "$y''=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y''=\\sin(" + arg + ')$',
          "$y''=" + (-y2Coeff) + '\\cos\\left(' + posArg + '\\right)$',
          "$y''=" + y1Expr + '$',
          "$y''=" + (-y1Coeff) + '\\sin\\left(' + posArg + '\\right)$',
        ],
        rng,
        (idx) => "$y''=" + (y2Coeff - idx) + '\\cos\\left(' + posArg + '\\right)$'
      );
      return {
        stem: 'Tính đạo hàm cấp hai của hàm số $y=\\cos(' + arg + ')$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "$y'=\\left[\\cos(" + arg + ")\\right]'=" + y1Expr + '$.',
          "$y''=\\left[" + y1Expr + "\\right]'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: -7, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q51 (cos(1-7x))', params: { a: -7, b: 1 }, expectedValid: true },
    ],
  },

  // Q52: Đạo hàm cấp hai y = (ax + b)/(cx + d)
  t11_b32_d52_homographic_d2_mc: {
    id: 't11_b32_d52_homographic_d2_mc',
    name: 'Tính đạo hàm cấp hai của hàm nhất biến (ax+b)/(cx+d)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm cấp hai',
    description: 'Tính đạo hàm cấp hai của hàm số y = (ax + b)/(cx + d).',
    conditionSummary: 'c ≠ 0, ad - bc ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -10, max: 10, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -10, max: 10, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -8, max: 8, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -10, max: 10, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const d2Num = -2 * c * det;
      const fmtFrac = (top, pow) => '\\dfrac{' + top + '}{\\left(' + denStr + '\\right)^{' + pow + '}}';
      const ansExpr = fmtFrac(d2Num, 3);
      const ans = "$y''=" + ansExpr + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          "$y''=" + fmtFrac(det, 2) + '$',
          "$y''=" + fmtFrac(-d2Num, 3) + '$',
          "$y''=" + fmtFrac(det, 4) + '$',
          "$y''=" + fmtFrac(c * det, 3) + '$',
        ],
        rng,
        (idx) => "$y''=" + fmtFrac(d2Num + idx, 3) + '$'
      );
      return {
        stem: 'Tính đạo hàm cấp hai của hàm số $y=\\dfrac{' + numStr + '}{' + denStr + '}$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "$y'=\\left(\\dfrac{" + numStr + '}{' + denStr + "}\\right)'=" + fmtFrac(det, 2) + '$.',
          "$y''=\\left[" + fmtFrac(det, 2) + "\\right]'=" + ansExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ad - bc = 0', params: { a: 2, b: 4, c: 1, d: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q52 ((9-10x)/(6x-9))', params: { a: -10, b: 9, c: 6, d: -9 }, expectedValid: true },
    ],
  },

  // Q53: Tính vận tốc chuyển động s(t) = a t^2 + b t + c tại thời điểm t0
  t11_b32_d53_kinematics_v_at_t0_mc: {
    id: 't11_b32_d53_kinematics_v_at_t0_mc',
    name: 'Tính vận tốc chuyển động tại thời điểm t₀ (trắc nghiệm)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho phương trình chuyển động s(t) = at² + bt + c. Tính vận tốc tại t = t₀.',
    conditionSummary: 'a ∈ [1; 6], b ∈ [0; 6], c ∈ [1; 10], t₀ ∈ [1; 8]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số t² (a)', min: 1, max: 6 },
      { name: 'b', label: 'Hệ số t (b)', min: 0, max: 6 },
      { name: 'c', label: 'Hằng số c', min: 1, max: 10 },
      { name: 't0', label: 'Thời điểm t₀', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, b, c, t0 } = params;
      if (a <= 0 || b < 0 || c <= 0 || t0 <= 0) return { valid: false, reason: 'Tham số phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, t0 } = params;
      const st = u.formatPoly([a, b, c], 't');
      const vt = u.formatLinear(2 * a, b, 't');
      const v0 = 2 * a * t0 + b;
      const s0 = a * t0 * t0 + b * t0 + c;
      const correct = '$' + v0 + '$ m/s';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + (2 * a) + '$ m/s',
          '$' + s0 + '$ m/s',
          '$' + (s0 + c) + '$ m/s',
          '$' + (v0 + 4) + '$ m/s',
        ],
        rng,
        (idx) => '$' + (v0 + idx * 3 + 1) + '$ m/s'
      );
      return {
        stem: 'Một vật chuyển động thẳng không đều xác định bởi phương trình $s(t)=' + st + '$, trong đó $s$ tính bằng mét và $t$ tính bằng giây. Tính vận tốc của chuyển động tại thời điểm $t=' + t0 + '$.',
        options,
        correctIndex,
        answerSummary: '$' + v0 + '$ m/s',
        solutionSteps: [
          "$v(t)=s'(t)=(" + st + ")'=" + vt + '$.',
          'Tại $t=' + t0 + '$: $v(' + t0 + ')=' + v0 + '$ m/s.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 0, c: 4, t0: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q53 (s=t²+4 tại t=3)', params: { a: 1, b: 0, c: 4, t0: 3 }, expectedValid: true },
    ],
  },

  // Q54: Tính gia tốc chuyển động s(t) = at^3 + bt^2 + ct + d tại t0
  t11_b32_d54_kinematics_a_at_t0_mc: {
    id: 't11_b32_d54_kinematics_a_at_t0_mc',
    name: 'Tính gia tốc chuyển động tại thời điểm t₀ (trắc nghiệm)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ý nghĩa vật lí của đạo hàm',
    description: 'Cho phương trình chuyển động s(t) = at³ + bt² + ct + d. Tính gia tốc tại t = t₀.',
    conditionSummary: 'a, b, c, d ∈ [1; 6], t₀ ∈ [1; 6]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số t³ (a)', min: 1, max: 6 },
      { name: 'b', label: 'Hệ số t² (b)', min: 1, max: 6 },
      { name: 'c', label: 'Hệ số t (c)', min: 1, max: 6 },
      { name: 'd', label: 'Hằng số d', min: 1, max: 6 },
      { name: 't0', label: 'Thời điểm t₀', min: 1, max: 6 },
    ],
    validateCode: `
      const { a, b, c, d, t0 } = params;
      if ([a, b, c, d, t0].some((v) => v <= 0)) return { valid: false, reason: 'Các tham số phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, t0 } = params;
      const st = u.formatPoly([a, b, c, d], 't');
      const vt = u.formatPoly([3 * a, 2 * b, c], 't');
      const at = u.formatLinear(6 * a, 2 * b, 't');
      const a0 = 6 * a * t0 + 2 * b;
      const v0 = 3 * a * t0 * t0 + 2 * b * t0 + c;
      const correct = '$' + a0 + '$ $\\text{m/s}^2$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + v0 + '$ $\\text{m/s}^2$',
          '$' + (v0 + 1) + '$ $\\text{m/s}^2$',
          '$' + (v0 - 1) + '$ $\\text{m/s}^2$',
          '$' + (a0 + 6) + '$ $\\text{m/s}^2$',
        ],
        rng,
        (idx) => '$' + (a0 + idx * 2 + 1) + '$ $\\text{m/s}^2$'
      );
      return {
        stem: 'Một vật chuyển động thẳng không đều xác định bởi phương trình $s(t)=' + st + '$, trong đó $s$ tính bằng mét và $t$ tính bằng giây. Tính gia tốc của chuyển động tại thời điểm $t=' + t0 + '$.',
        options,
        correctIndex,
        answerSummary: '$' + a0 + '$ $\\text{m/s}^2$',
        solutionSteps: [
          "$v(t)=s'(t)=(" + st + ")'=" + vt + '$.',
          "$a(t)=v'(t)=(" + vt + ")'=" + at + '$.',
          'Tại $t=' + t0 + '$: $a(' + t0 + ')=' + a0 + '$ $\\text{m/s}^2$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 3, c: 4, d: 3, t0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q54 (2t³+3t²+4t+3 tại t=2)', params: { a: 2, b: 3, c: 4, d: 3, t0: 2 }, expectedValid: true },
    ],
  },

  // Q55: Giải phương trình f'(x) = k với f(x) bậc 3
  t11_b32_d55_eq_fprime_eq_k_mc: {
    id: 't11_b32_d55_eq_fprime_eq_k_mc',
    name: 'Giải phương trình f\'(x) = k đối với hàm bậc ba',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Cho hàm bậc ba f(x) = ax³ + bx² + cx + d, tìm nghiệm phương trình f\'(x) = k.',
    conditionSummary: 'a > 0, Δ\' = b² - 3a(c - k) > 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 4 },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5 },
      { name: 'd', label: 'Hằng số d', min: -10, max: 10 },
      { name: 'k', label: 'Vế phải k', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, b, c, k } = params;
      if (a <= 0 || b === 0) return { valid: false, reason: 'a > 0 và b ≠ 0' };
      const dp = b * b - 3 * a * (c - k);
      if (dp <= 0) return { valid: false, reason: 'Biệt thức Delta <= 0 (không có 2 nghiệm phân biệt)' };
      // Check non-square dp for clean sqrt form
      const s = Math.round(Math.sqrt(dp));
      if (s * s === dp) return { valid: false, reason: 'Ưu tiên Delta không chính phương để phân biệt dạng nghiệm vô tỉ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, k } = params;
      const fx = u.formatPoly([a, b, c, d]);
      const fprime = u.formatPoly([3 * a, 2 * b, c]);
      const eqPoly = u.formatPoly([3 * a, 2 * b, c - k]);
      // Roots of 3a x^2 + 2b x + (c - k) = 0 -> (-b +- sqrt(dp)) / (3a)
      const dp = b * b - 3 * a * (c - k);
      // Extract square factor from dp
      let sq = 1;
      let rad = dp;
      for (let f = 2; f * f <= rad; f++) {
        while (rad % (f * f) === 0) {
          sq *= f;
          rad /= f * f;
        }
      }
      const den = 3 * a;
      const frMid = u.simplifyFrac(-b, den);
      const frRad = u.simplifyFrac(sq, den);
      const fmtRad = (fr) => {
        const sgn = fr.num < 0 ? '-' : '';
        const absN = Math.abs(fr.num);
        const top = (absN === 1 ? '' : absN) + '\\sqrt{' + rad + '}';
        return sgn + '\\frac{' + top + '}{' + fr.den + '}';
      };
      const fmtPair = (midFr, radFr) => {
        const x1 = '-' + fmtRad(radFr) + (midFr.num < 0 ? ' - ' + u.simplifyFrac(-midFr.num, midFr.den).latex : ' + ' + midFr.latex);
        const x2 = midFr.latex + ' + ' + fmtRad(radFr);
        return '$x_1=' + x1 + ',\\; x_2=' + x2 + '$';
      };

      const ans = fmtPair(frMid, frRad);
      const wrongMid = u.simplifyFrac(-b + 9, den);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          fmtPair(wrongMid, frRad),
          '$x=' + frMid.latex + '$',
          'Phương trình vô nghiệm',
          '$x_1=' + frMid.latex + ',\\; x_2=' + frMid.latex + ' + ' + fmtRad(frRad) + '$',
        ],
        rng,
        (idx) => fmtPair(u.simplifyFrac(-b + idx, den), frRad)
      );

      return {
        stem: 'Cho hàm số $f(x)=' + fx + "$. Nghiệm của phương trình $f'(x)=" + k + '$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "$f'(x)=(" + fx + ")'=" + fprime + '$.',
          "$f'(x)=" + k + '\\Leftrightarrow ' + eqPoly + '=0$.',
          'Giải phương trình bậc hai ta được ' + ans + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Δ\' <= 0', params: { a: 1, b: 1, c: 5, d: 0, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q55 (3x³+2x²+x-10, f\'=4)', params: { a: 3, b: 2, c: 1, d: -10, k: 4 }, expectedValid: true },
    ],
  },

  // Q56: Giải phương trình y'' = k với y bậc 4
  t11_b32_d56_eq_y2_eq_k_mc: {
    id: 't11_b32_d56_eq_y2_eq_k_mc',
    name: 'Giải phương trình y\'\' = k đối với hàm bậc bốn',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm cấp hai',
    description: 'Cho hàm số bậc bốn y = ax⁴ + bx³ + cx² + dx + e, giải phương trình y\'\' = k.',
    conditionSummary: 'a > 0, b ≠ 0, Δ\' = 9b² - 12a(2c - k) > 0 (không chính phương)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số x⁴ (a)', min: 1, max: 3 },
      { name: 'b', label: 'Hệ số x³ (b)', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hệ số x² (c)', min: -6, max: 2 },
      { name: 'd', label: 'Hệ số x (d)', min: 1, max: 6 },
      { name: 'e', label: 'Hằng số e', min: 1, max: 6 },
      { name: 'k', label: 'Vế phải k', min: 1, max: 9 },
    ],
    validateCode: `
      const { a, b, c, k } = params;
      if (a <= 0 || b === 0) return { valid: false, reason: 'a > 0 và b ≠ 0' };
      const dp = 9 * b * b - 12 * a * (2 * c - k);
      if (dp <= 0) return { valid: false, reason: 'Biệt thức Delta <= 0' };
      const s = Math.round(Math.sqrt(dp));
      if (s * s === dp) return { valid: false, reason: 'Ưu tiên nghiệm chứa căn thức' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, e, k } = params;
      const fx = u.formatPoly([a, b, c, d, e]);
      const y1 = u.formatPoly([4 * a, 3 * b, 2 * c, d]);
      const y2 = u.formatPoly([12 * a, 6 * b, 2 * c]);
      const eqPoly = u.formatPoly([12 * a, 6 * b, 2 * c - k]);
      // 12a x^2 + 6b x + (2c - k) = 0 -> (-3b +- sqrt(dp)) / (12a)
      const dp = 9 * b * b - 12 * a * (2 * c - k);
      let sq = 1;
      let rad = dp;
      for (let f = 2; f * f <= rad; f++) {
        while (rad % (f * f) === 0) {
          sq *= f;
          rad /= f * f;
        }
      }
      const den = 12 * a;
      const frMid = u.simplifyFrac(-3 * b, den);
      const frRad = u.simplifyFrac(sq, den);
      const fmtRad = (fr) => {
        const absN = Math.abs(fr.num);
        const top = (absN === 1 ? '' : absN) + '\\sqrt{' + rad + '}';
        return '\\frac{' + top + '}{' + fr.den + '}';
      };
      const x1Str = '-' + fmtRad(frRad) + (frMid.num < 0 ? ' - ' + u.simplifyFrac(-frMid.num, frMid.den).latex : ' + ' + frMid.latex);
      const x2Str = frMid.latex + ' + ' + fmtRad(frRad);
      const ans = '$x_1=' + x1Str + ',\\; x_2=' + x2Str + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$x_1=' + frMid.latex + ',\\; x_2=' + x2Str + '$',
          '$x=' + u.simplifyFrac(2 * c - k, den).latex + '$',
          'Phương trình vô nghiệm',
          '$x_1=-' + fmtRad(frRad) + ',\\; x_2=' + fmtRad(frRad) + '$',
        ],
        rng,
        (idx) => '$x_1=' + u.simplifyFrac(-3 * b + idx, den).latex + ',\\; x_2=' + x2Str + '$'
      );

      return {
        stem: 'Cho hàm số $y=' + fx + "$. Phương trình $y''=" + k + '$ có nghiệm là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "$y'=(" + fx + ")'=" + y1 + '$.',
          "$y''=(" + y1 + ")'=" + y2 + '$.',
          "$y''=" + k + '\\Leftrightarrow ' + eqPoly + '=0 \\Leftrightarrow $ ' + ans + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 1, c: -5, d: 5, e: 4, k: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q56 (2x⁴+x³-5x²+5x+4, y\'\'=7)', params: { a: 2, b: 1, c: -5, d: 5, e: 4, k: 7 }, expectedValid: true },
    ],
  },

  // Q57: Bất phương trình f'(x) - k <= 0 với f(x) bậc 3 (nghiệm hữu tỉ đẹp)
  t11_b32_d57_ineq_fprime_le_mc: {
    id: 't11_b32_d57_ineq_fprime_le_mc',
    name: 'Giải bất phương trình f\'(x) - k ≤ 0 với hàm bậc ba',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Cho hàm bậc ba có hệ số hữu tỉ, tìm tập nghiệm bất phương trình f\'(x) - k ≤ 0.',
    conditionSummary: 'A ∈ [2; 6], r1 < p2/A, f\'(x) - k = A(x - r1)(x - p2/A)',
    paramSpecs: [
      { name: 'A', label: 'Hệ số A của x² trong f\'(x)', min: 2, max: 6 },
      { name: 'r1', label: 'Nghiệm nguyên r₁', min: -10, max: 3 },
      { name: 'p2', label: 'Tử số p₂ của nghiệm r₂ = p₂/A', min: -15, max: 10, allowZero: false },
      { name: 'k', label: 'Hằng số k', min: 1, max: 6 },
      { name: 'd', label: 'Hằng số tự do d', min: 1, max: 9 },
    ],
    validateCode: `
      const { A, r1, p2, k } = params;
      if (A < 2 || A > 6 || p2 === 0 || k <= 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (A * r1 >= p2) return { valid: false, reason: 'Yêu cầu r₁ < p₂/A' };
      // Ensure p2 is not divisible by A so one root is a fraction (or distinct clean interval)
      if (p2 % A === 0) return { valid: false, reason: 'Ưu tiên p₂ không chia hết cho A để nghiệm thứ hai là phân số' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, r1, p2, k, d } = params;
      // f'(x) - k = A(x - r1)(x - p2/A) = (x - r1)(Ax - p2) = A x^2 - (A*r1 + p2)x + r1*p2
      const B = -(A * r1 + p2);
      const C = r1 * p2 + k;
      const frA3 = u.simplifyFrac(A, 3);
      const frB2 = u.simplifyFrac(B, 2);
      const fmtTermFrac = (fr, sym, isFirst) => {
        if (fr.num === 0) return '';
        const sgn = fr.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const absN = Math.abs(fr.num);
        if (fr.den === 1) return sgn + (absN === 1 ? '' : absN) + sym;
        return sgn + '\\frac{' + (absN === 1 ? '' : absN) + sym + '}{' + fr.den + '}';
      };
      const fx = fmtTermFrac(frA3, 'x^{3}', true) + fmtTermFrac(frB2, 'x^{2}', false) + u.formatTerm(C, 'x', false) + u.formatTrailingConst(d);
      const fprime = u.formatPoly([A, B, C]);
      const eqPoly = u.formatPoly([A, B, r1 * p2]);

      const r2Fr = u.simplifyFrac(p2, A);
      const ans = '$S=\\left[' + r1 + ';' + r2Fr.latex + '\\right]$';
      const wrongOpen = '$S=\\left(-\\infty;' + r1 + '\\right) \\cup \\left(' + r2Fr.latex + ';+\\infty\\right)$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$S=\\emptyset$',
          wrongOpen,
          '$S=\\mathbb{R}$',
          '$S=\\left(' + r1 + ';' + r2Fr.latex + '\\right)$',
        ],
        rng,
        (idx) => '$S=\\left[' + (r1 - idx) + ';' + r2Fr.latex + '\\right]$'
      );

      return {
        stem: 'Cho hàm số $f(x)=' + fx + "$. Tập nghiệm của bất phương trình $f'(x)-" + k + '\\le 0$ là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "$f'(x)=" + fprime + '$.',
          "$f'(x)-" + k + '\\le 0 \\Leftrightarrow ' + eqPoly + '\\le 0 \\Leftrightarrow ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r1 >= p2/A', params: { A: 5, r1: 0, p2: -12, k: 1, d: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q57 (5/3 x³ + 57/2 x² + 109x + 9)', params: { A: 5, r1: -9, p2: -12, k: 1, d: 9 }, expectedValid: true },
    ],
  },

  // Q58: Bất phương trình f'(x) > 0 với f(x) = a√x + bx + c
  t11_b32_d58_ineq_sqrt_fprime_gt_mc: {
    id: 't11_b32_d58_ineq_sqrt_fprime_gt_mc',
    name: 'Giải bất phương trình f\'(x) > 0 cho hàm chứa √x',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Cho hàm số f(x) = a√x + bx + c (a < 0, b > 0), giải bất phương trình f\'(x) > 0.',
    conditionSummary: 'a ∈ [-9; -1], b ∈ [1; 9], c ∈ [-9; 9] \\ {0}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số √x (a < 0)', min: -9, max: -1 },
      { name: 'b', label: 'Hệ số x (b > 0)', min: 1, max: 9 },
      { name: 'c', label: 'Hằng số c', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a >= 0 || b <= 0 || c === 0) return { valid: false, reason: 'Yêu cầu a < 0, b > 0, c ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const fx = u.formatTerm(a, '\\sqrt{x}', true) + u.formatTerm(b, 'x', false) + u.formatTrailingConst(c);
      const frSqrt = u.simplifyFrac(-a, 2 * b);
      const boundFr = u.simplifyFrac(frSqrt.num * frSqrt.num, frSqrt.den * frSqrt.den);
      const ans = '$\\left( ' + boundFr.latex + '; +\\infty \\right)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$\\left(-\\infty;' + boundFr.latex + ' \\right)$',
          '$\\left(-\\infty;' + boundFr.latex + ' \\right]$',
          '$\\left[' + boundFr.latex + '; +\\infty \\right)$',
          '$\\left(' + frSqrt.latex + '; +\\infty \\right)$',
        ],
        rng,
        (idx) => '$\\left(' + u.simplifyFrac(boundFr.num + idx, boundFr.den).latex + '; +\\infty \\right)$'
      );
      return {
        stem: 'Cho hàm số $f(x)=' + fx + "$. Tập nghiệm của bất phương trình $f'(x) > 0$ là",
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Điều kiện xác định: $x > 0$.',
          "$f'(x) > 0 \\Leftrightarrow \\frac{" + a + '}{2\\sqrt{x}} + ' + b + ' > 0 \\Leftrightarrow \\sqrt{x} > ' + frSqrt.latex + ' \\Leftrightarrow x > ' + boundFr.latex + '$.',
          'Vậy tập nghiệm là ' + ans + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= 0', params: { a: 2, b: 7, c: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q58 (-4√x + 7x + 2)', params: { a: -4, b: 7, c: 2 }, expectedValid: true },
    ],
  },

  // Q59: Tham số m để f'(x) > 0 vô nghiệm (tức f'(x) <= 0 ∀x ∈ R)
  t11_b32_d59_param_m_fprime_gt_impossible_mc: {
    id: 't11_b32_d59_param_m_fprime_gt_impossible_mc',
    name: 'Tìm tham số m để bất phương trình f\'(x) > 0 vô nghiệm',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Quy tắc tính đạo hàm',
    description: 'Tìm tất cả giá trị tham số m để f\'(x) > 0 vô nghiệm đối với hàm bậc ba có tham số m.',
    conditionSummary: 'A ∈ [2; 7], Δ_m = (k + 2Ap)² - 4(k² - 4Aq) > 0 (không chính phương)',
    paramSpecs: [
      { name: 'A', label: 'Hệ số A > 0', min: 2, max: 7 },
      { name: 'k', label: 'Hằng số k trong (m+k)/2', min: -3, max: 3 },
      { name: 'p', label: 'Hệ số p của m trong (pm-q)x', min: 1, max: 4 },
      { name: 'q', label: 'Hằng số q', min: 1, max: 7 },
    ],
    validateCode: `
      const { A, k, p, q } = params;
      if (A < 2 || p < 1 || q < 1) return { valid: false, reason: 'Tham số ngoài miền' };
      // f'(x) = -A x^2 + (m + k)x + (p m - q) <= 0 forall x
      // Delta = (m + k)^2 + 4A(p m - q) = m^2 + (2k + 4Ap) m + (k^2 - 4Aq) <= 0
      const B = 2 * k + 4 * A * p;
      const C = k * k - 4 * A * q;
      const dp = (B / 2) * (B / 2) - C; // integer since B is even
      if (dp <= 0) return { valid: false, reason: 'Δ_m <= 0 khiến tập nghiệm rỗng hoặc đơn điểm' };
      const s = Math.round(Math.sqrt(dp));
      if (s * s === dp) return { valid: false, reason: 'Ưu tiên Δ_m không chính phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, k, p, q } = params;
      const A3 = u.simplifyFrac(-A, 3);
      const leadStr = A3.den === 1 ? (A3.num === -1 ? '-x^3' : A3.num + 'x^3') : '-\\frac{' + A + '}{3}x^3';
      const mPlusK = u.formatShift('m', k);
      const linCoeff = u.formatLinear(p, -q, 'm');
      const tailM = u.formatLinear(-p, -1, 'm');
      const fx = leadStr + ' + \\left(\\dfrac{' + mPlusK + '}{2}\\right)x^2 + (' + linCoeff + ')x' + (tailM.startsWith('-') ? ' ' + tailM : ' + ' + tailM);

      const B = 2 * k + 4 * A * p;
      const C = k * k - 4 * A * q;
      const halfB = B / 2;
      const dp = halfB * halfB - C;
      let sq = 1;
      let rad = dp;
      for (let f = 2; f * f <= rad; f++) {
        while (rad % (f * f) === 0) {
          sq *= f;
          rad /= f * f;
        }
      }
      const radTerm = (sq === 1 ? '' : sq + ' ') + '\\sqrt{' + rad + '}';
      const mid = -halfB;
      const left = '- ' + radTerm + (mid < 0 ? ' - ' + Math.abs(mid) : (mid > 0 ? ' + ' + mid : ''));
      const right = (mid === 0 ? '' : mid + ' + ') + radTerm;

      const ans = '$' + left + ' \\le m \\le ' + right + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + left + ' < m < ' + right + '$',
          '$m < ' + left + '$ hoặc $m > ' + right + '$',
          '$m \\le ' + left + '$ hoặc $m \\ge ' + right + '$',
          '$m \\ge ' + right + '$',
        ],
        rng,
        (idx) => '$' + left + ' \\le m \\le ' + (mid + idx) + ' + ' + radTerm + '$'
      );

      return {
        stem: 'Cho hàm số $f(x)=' + fx + "$. Tìm tất cả các giá trị của tham số $m$ để bất phương trình $f'(x) > 0$ vô nghiệm.",
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Ta có $f'(x) = -" + A + 'x^2 + (' + mPlusK + ')x + (' + linCoeff + ')$.',
          "Bất phương trình $f'(x) > 0$ vô nghiệm $\\Leftrightarrow f'(x) \\le 0, \\forall x \\in \\mathbb{R}$.",
          'Do hệ số $-' + A + ' < 0$ nên điều kiện tương đương $\\Delta = ' + u.formatPoly([1, B, C], 'm') + ' \\le 0$.',
          'Giải bất phương trình trên ta được ' + ans + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 1', params: { A: 1, k: 1, p: 3, q: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q59 (A=5, k=1, p=3, q=5)', params: { A: 5, k: 1, p: 3, q: 5 }, expectedValid: true },
    ],
  },

  // Q60: Hệ số góc tiếp tuyến đồ thị hàm bậc hai tại x0
  t11_b32_d60_tangent_slope_quad_mc: {
    id: 't11_b32_d60_tangent_slope_quad_mc',
    name: 'Tìm hệ số góc tiếp tuyến của parabol tại điểm x₀',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ý nghĩa hình học của đạo hàm',
    description: 'Cho hàm số y = ax² + bx + c, tìm hệ số góc tiếp tuyến tại điểm có hoành độ x₀.',
    conditionSummary: 'a, b, c ∈ [-9; 9] \\ {0}, x₀ ∈ [-4; 4]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -8, max: 8, allowZero: false },
      { name: 'x0', label: 'Hoành độ x₀', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0 } = params;
      const fx = u.formatPoly([a, b, c]);
      const fprime = u.formatLinear(2 * a, b);
      const k = 2 * a * x0 + b;
      const ans = '$k=' + k + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$k=' + (k + 17) + '$',
          '$k=' + (k + 14) + '$',
          '$k=' + (k - 25) + '$',
          '$k=' + (-k) + '$',
        ],
        rng,
        (idx) => '$k=' + (k + idx * 3 + 1) + '$'
      );
      return {
        stem: 'Cho hàm số $y=' + fx + '$. Tiếp tuyến của đồ thị hàm số đã cho tại điểm có hoành độ $x_0=' + x0 + '$ có hệ số góc $k$ bằng',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Ta có $f'(x)=" + fprime + ' \\Rightarrow k = f\'(' + x0 + ') = ' + k + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -2, c: 5, x0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q60 (4x²-2x+5 tại x0=1)', params: { a: 4, b: -2, c: 5, x0: 1 }, expectedValid: true },
    ],
  },

  // Q61: Hệ số góc tiếp tuyến hàm nhất biến tại x = x0
  t11_b32_d61_tangent_slope_homographic_mc: {
    id: 't11_b32_d61_tangent_slope_homographic_mc',
    name: 'Tìm hệ số góc tiếp tuyến hàm nhất biến tại điểm x₀',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Ý nghĩa hình học của đạo hàm',
    description: 'Cho hàm số y = (ax + b)/(cx + d), tìm hệ số góc tiếp tuyến tại điểm có hoành độ x₀.',
    conditionSummary: 'ad - bc ≠ 0, c ≠ 0, cx₀ + d ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ x₀', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, c, d, x0 } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 suy biến' };
      if (c * x0 + d === 0) return { valid: false, reason: 'x₀ làm mẫu bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, x0 } = params;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const denVal = c * x0 + d;
      const kFr = u.simplifyFrac(det, denVal * denVal);
      const correct = '$' + kFr.latex + '$';
      const y0Fr = u.simplifyFrac(a * x0 + b, denVal);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + u.simplifyFrac(-det, denVal * denVal).latex + '$',
          '$' + y0Fr.latex + '$',
          '$' + u.simplifyFrac(det, denVal).latex + '$',
          '$' + (kFr.num + 4) + '$',
        ],
        rng,
        (idx) => '$' + u.simplifyFrac(det + idx, denVal * denVal).latex + '$'
      );
      return {
        stem: 'Cho hàm số $y=\\dfrac{' + numStr + '}{' + denStr + '}$. Tiếp tuyến của đồ thị hàm số đã cho tại điểm có hoành độ $x=' + x0 + '$ có hệ số góc bằng',
        options,
        correctIndex,
        answerSummary: '$' + kFr.latex + '$',
        solutionSteps: [
          "Ta có $f'(x)=\\dfrac{" + det + '}{(' + denStr + ')^2}$.',
          "Hệ số góc của tiếp tuyến là $f'(" + x0 + ') = ' + kFr.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu bằng 0', params: { a: -2, b: 6, c: 3, d: -9, x0: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q61 ((6-2x)/(3x-2) tại x=3)', params: { a: -2, b: 6, c: 3, d: -2, x0: 3 }, expectedValid: true },
    ],
  },

  // Q62: Viết phương trình tiếp tuyến parabol tại điểm B(x0; y0) cho trước
  t11_b32_d62_tangent_eq_at_point_quad_mc: {
    id: 't11_b32_d62_tangent_eq_at_point_quad_mc',
    name: 'Viết phương trình tiếp tuyến parabol tại điểm thuộc đồ thị',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho parabol y = ax² + bx + c và điểm M(x₀; y₀) thuộc đồ thị, viết phương trình tiếp tuyến tại M.',
    conditionSummary: 'a, b, c ≠ 0, k = 2ax₀ + b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ x₀', min: -3, max: 3 },
    ],
    validateCode: `
      const { a, b, c, x0 } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      if (2 * a * x0 + b === 0) return { valid: false, reason: 'Hệ số góc k = 0 tại đỉnh parabol' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0 } = params;
      const fx = u.formatPoly([a, b, c]);
      const fprime = u.formatLinear(2 * a, b);
      const y0 = a * x0 * x0 + b * x0 + c;
      const k = 2 * a * x0 + b;
      const bLine = y0 - k * x0;
      const ansLine = u.formatLinear(k, bLine);
      const ans = '$y=' + ansLine + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$y=' + u.formatLinear(k, bLine + 2) + '$',
          '$y=' + u.formatLinear(k + 1, bLine) + '$',
          '$y=' + u.formatLinear(k, bLine + 4) + '$',
          '$y=' + u.formatLinear(-k, bLine) + '$',
        ],
        rng,
        (idx) => '$y=' + u.formatLinear(k, bLine + idx * 3 + 1) + '$'
      );
      return {
        stem: 'Cho hàm số $y=' + fx + '$. Viết phương trình tiếp tuyến của đồ thị hàm số đã cho tại điểm $B(' + x0 + ';' + y0 + ')$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Ta có $f'(x)=" + fprime + " \\Rightarrow f'(" + x0 + ')=' + k + '$.',
          'Phương trình tiếp tuyến tại $B(' + x0 + ';' + y0 + ')$ là: $y=' + k + '(x' + (x0 >= 0 ? '-' + x0 : '+' + Math.abs(x0)) + ')' + u.formatTrailingConst(y0) + ' \\Leftrightarrow y=' + ansLine + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tại đỉnh k = 0', params: { a: -1, b: 4, c: -1, x0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q62 (-x²+4x-1 tại B(1;2))', params: { a: -1, b: 4, c: -1, x0: 1 }, expectedValid: true },
    ],
  },

  // Q63: Tiếp tuyến parabol tại điểm H có hoành độ x0
  t11_b32_d63_tangent_eq_at_x0_quad_mc: {
    id: 't11_b32_d63_tangent_eq_at_x0_quad_mc',
    name: 'Viết phương trình tiếp tuyến parabol tại hoành độ x₀',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho parabol y = ax² + bx + c, viết phương trình tiếp tuyến tại điểm H có hoành độ x₀.',
    conditionSummary: 'a, b, c ≠ 0, k = 2ax₀ + b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ x₀', min: -3, max: 3 },
    ],
    validateCode: `
      const { a, b, c, x0 } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      if (2 * a * x0 + b === 0) return { valid: false, reason: 'Hệ số góc tiếp tuyến bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0 } = params;
      const fx = u.formatPoly([a, b, c]);
      const fprime = u.formatLinear(2 * a, b);
      const y0 = a * x0 * x0 + b * x0 + c;
      const k = 2 * a * x0 + b;
      const bLine = y0 - k * x0;
      const ans = '$y=' + u.formatLinear(k, bLine) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$y=' + u.formatLinear(k + 2, 0) + '$',
          '$y=' + u.formatLinear(k, bLine + 4) + '$',
          '$y=' + u.formatLinear(k, bLine + 8) + '$',
          '$y=' + u.formatLinear(-k, bLine) + '$',
        ],
        rng,
        (idx) => '$y=' + u.formatLinear(k, bLine + idx * 3 + 1) + '$'
      );
      return {
        stem: 'Cho hàm số $y=' + fx + '$. Tiếp tuyến của đồ thị hàm số đã cho tại điểm $H$ có hoành độ bằng $' + x0 + '$ có phương trình là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          "Ta có $f'(x)=" + fprime + " \\Rightarrow f'(" + x0 + ')=' + k + '$, và $y_0 = f(' + x0 + ') = ' + y0 + '$.',
          'Phương trình tiếp tuyến là $y=' + k + '(x' + (x0 >= 0 ? '-' + x0 : '+' + Math.abs(x0)) + ')' + u.formatTrailingConst(y0) + ' \\Leftrightarrow y=' + u.formatLinear(k, bLine) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tại đỉnh k = 0', params: { a: 4, b: -4, c: -1, x0: 0 }, expectedValid: true },
      { label: 'Biên a = 0', params: { a: 0, b: -4, c: -1, x0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q63 (4x²-4x-1 tại x0=1)', params: { a: 4, b: -4, c: -1, x0: 1 }, expectedValid: true },
    ],
  },

  // Q64: Tiếp tuyến parabol tại điểm A có tung độ y0 (cho 2 tiếp tuyến phân biệt)
  t11_b32_d64_tangent_eq_at_y0_quad_mc: {
    id: 't11_b32_d64_tangent_eq_at_y0_quad_mc',
    name: 'Viết phương trình tiếp tuyến parabol tại điểm có tung độ y₀',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Phương trình tiếp tuyến',
    description: 'Cho parabol y = ax² + bx + c, viết phương trình tiếp tuyến tại điểm A có tung độ bằng y₀.',
    conditionSummary: 'a ∈ [2; 5], a x² + bx + c = y₀ có hai nghiệm hữu tỉ phân biệt x₁ = p₁, x₂ = p₂/a',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 5 },
      { name: 'p1', label: 'Nghiệm nguyên p₁', min: -5, max: 3 },
      { name: 'p2', label: 'Tử số p₂ của nghiệm p₂/a', min: 1, max: 11 },
      { name: 'c', label: 'Hằng số c', min: -4, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, p1, p2, c } = params;
      if (a < 2 || a > 5 || c === 0) return { valid: false, reason: 'Tham số ngoài miền' };
      if (a * p1 >= p2) return { valid: false, reason: 'Yêu cầu nghiệm thứ nhất nhỏ hơn nghiệm thứ hai' };
      if (p2 % a === 0) return { valid: false, reason: 'Ưu tiên nghiệm thứ hai dạng phân số' };
      const b = -(a * p1 + p2);
      if (b === 0) return { valid: false, reason: 'b ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p1, p2, c } = params;
      // a(x - p1)(x - p2/a) = ax^2 - (ap1+p2)x + p1*p2 = 0 => b = -(ap1+p2), y0 = c - p1*p2
      const b = -(a * p1 + p2);
      const y0 = c - p1 * p2;
      const fx = u.formatPoly([a, b, c]);
      const fprime = u.formatLinear(2 * a, b);

      const x2Fr = u.simplifyFrac(p2, a);
      const k1 = 2 * a * p1 + b; // = a*p1 - p2 < 0
      const k2 = 2 * p2 + b;     // = p2 - a*p1 = -k1 > 0

      // Tangent 1: y = k1(x - p1) + y0 = k1 x + (y0 - k1*p1)
      const b1 = y0 - k1 * p1;
      const line1 = 'y=' + u.formatLinear(k1, b1);

      // Tangent 2: y = k2(x - p2/a) + y0 = k2 x + (y0 - k2*p2/a)
      const b2Fr = u.simplifyFrac(y0 * a - k2 * p2, a);
      const fmtLineFr = (slope, bFr) => {
        const sPart = u.formatTerm(slope, 'x', true);
        if (bFr.num === 0) return 'y=' + sPart;
        const bPart = (bFr.num < 0 ? ' - ' : ' + ') + (bFr.den === 1 ? Math.abs(bFr.num) : '\\frac{' + Math.abs(bFr.num) + '}{' + bFr.den + '}');
        return 'y=' + sPart + bPart;
      };
      const line2 = fmtLineFr(k2, b2Fr);
      const ans = '$' + line1 + ',\\; ' + line2 + '$';

      const b2Wrong1 = u.simplifyFrac(b2Fr.num + 2 * b2Fr.den, b2Fr.den);
      const b2Wrong2 = u.simplifyFrac(b2Fr.num - b2Fr.den, b2Fr.den);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + line1 + '$',
          '$' + fmtLineFr(k2, b2Wrong1) + '$',
          '$y=' + u.formatLinear(k1, b1 + 2) + ',\\; ' + fmtLineFr(k2, b2Wrong2) + '$',
          '$y=' + u.formatLinear(-k1, b1) + ',\\; ' + fmtLineFr(-k2, b2Fr) + '$',
        ],
        rng,
        (idx) => '$y=' + u.formatLinear(k1, b1 + idx) + ',\\; ' + line2 + '$'
      );

      return {
        stem: 'Cho hàm số $y=' + fx + '$. Tiếp tuyến của đồ thị hàm số đã cho tại điểm $A$ có tung độ bằng $' + y0 + '$ có phương trình là',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Xét phương trình hoành độ tiếp điểm: $' + fx + '=' + y0 + ' \\Rightarrow x_1=' + p1 + ',\\; x_2=' + x2Fr.latex + '$.',
          "Ta có $f'(x)=" + fprime + " \\Rightarrow f'(" + p1 + ')=' + k1 + ",\\; f'(" + x2Fr.latex + ')=' + k2 + '$.',
          'Phương trình các tiếp tuyến là: $' + line1 + '$ và $' + line2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p2 chia hết a', params: { a: 3, p1: -2, p2: 6, c: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q64 (3x²-2x+2, y0=18)', params: { a: 3, p1: -2, p2: 8, c: 2 }, expectedValid: true },
    ],
  },
};
