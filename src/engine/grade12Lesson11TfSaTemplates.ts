import { MathTemplate } from '../types/math';

export const G12_B11_TF_SA_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 11. NGUYÊN HÀM — PHẦN II: 10 DẠNG ĐÚNG / SAI (D37..D46)
  // =====================================================================

  // Dạng 37 (Q37 - TF): Hỗn hợp công thức lượng giác, động học và tìm F(x1)
  t12_b11_d37_concept_physics_tf: {
    id: 't12_b11_d37_concept_physics_tf',
    name: 'Xét tính đúng sai tổng hợp công thức nguyên hàm, vật lý và điều kiện ban đầu',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm và ứng dụng chuyển động',
    description: 'Đánh giá 4 mệnh đề về nguyên hàm lượng giác cơ bản, quan hệ gia tốc-vận tốc, nguyên hàm thỏa F(x0)=y0 và quãng đường hãm phanh.',
    conditionSummary: 'v0 = a * k để quãng đường không âm trong [0; k], thời gian t1 <= v0/a',
    paramSpecs: [
      { name: 'a', label: 'Hằng số a trong f(x) = a + b/x²', min: -3, max: 3, allowZero: false },
      { name: 'b', label: 'Tử số b trong f(x) = a + b/x²', min: 1, max: 6 },
      { name: 'x0', label: 'Điểm x0 (< 0)', min: -6, max: -2 },
      { name: 'y0', label: 'Giá trị F(x0)', min: 2, max: 10 },
      { name: 'x1', label: 'Điểm tính F(x1) (< 0, khác x0)', min: -5, max: -1 },
      { name: 'v0', label: 'Vận tốc đầu xe (m/s)', min: 12, max: 24, step: 2 },
      { name: 'dec', label: 'Gia tốc giảm dần (m/s²)', min: 2, max: 6, step: 2 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, x0, x1, v0, dec } = params;
      if (a === 0 || b <= 0 || x0 >= 0 || x1 >= 0 || x0 === x1) {
        return { valid: false, reason: 'Tham số điểm âm x0 ≠ x1 và a ≠ 0, b > 0' };
      }
      if (v0 <= 0 || dec <= 0 || dec > v0 / 2) return { valid: false, reason: 'Vận tốc và gia tốc hãm phanh không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0, y0, x1, v0, dec, mode } = params;
      // f(x) = a + b/x^2 => F(x) = a*x - b/x + C
      const fPartX0 = u.simplifyFrac(a * x0 * x0 - b, x0);
      const cFrac = u.simplifyFrac(y0 * x0 - (a * x0 * x0 - b), x0);
      const valX1 = u.simplifyFrac((a * x1 * x1 - b) * cFrac.den + cFrac.num * x1, x1 * cFrac.den);
      const valX1Wrong = u.simplifyFrac(valX1.num + valX1.den, valX1.den);

      // Braking: t_stop = floor(v0 / dec), choose t1 = Math.min(4, Math.floor(v0 / dec)) or even
      const tMax = Math.floor(v0 / dec);
      const t1 = Math.max(2, Math.min(4, tMax));
      const sTrue = v0 * t1 - 0.5 * dec * t1 * t1;
      const sWrong = sTrue + 1;

      const aTrue = mode !== 2;
      const bTrue = mode === 1;
      const cTrue = mode !== 3;
      const dTrue = mode === 2 || mode === 3;

      const aText = aTrue
        ? '$\\int \\dfrac{1}{\\sin^2 x}\\mathrm{\\,d}x = -\\cot x + C$.'
        : '$\\int \\dfrac{1}{\\sin^2 x}\\mathrm{\\,d}x = \\cot x + C$.';
      const bText = bTrue
        ? 'Một vật chuyển động với vận tốc $v(t)$ thì gia tốc chuyển động là $a(t) = v\'(t)$.'
        : 'Một vật chuyển động với vận tốc $v(t)$ ($t$ tính bằng giây). Gia tốc chuyển động được xác định bởi $a(t) = \\int v(t)\\mathrm{\\,d}t$.';
      const fStr = a + ' + \\frac{' + b + '}{x^2}';
      const cText =
        'Biết $F(x)$ là một nguyên hàm của $f(x) = ' + fStr + '$ thỏa mãn $F(' + x0 + ') = ' + y0 + '$. Khi đó $F(' + x1 + ') = ' + (cTrue ? valX1.latex : valX1Wrong.latex) + '$.';
      const vStr = v0 + ' - ' + dec + 't';
      const dShown = dTrue ? u.formatNumberVN(sTrue, 1) : u.formatNumberVN(sWrong, 1);
      const dText =
        'Một ôtô đang chuyển động với vận tốc $' + v0 + '$ m/s thì hãm phanh và chuyển động chậm dần với vận tốc $v(t) = ' + vStr + '$ (m/s). Sau $' + t1 + '$ giây kể từ khi hãm phanh, quãng đường đi được là $' + dShown + '$ m.';

      const tfStatements = [
        { key: 'a', text: aText, isTrue: aTrue },
        { key: 'b', text: bText, isTrue: bTrue },
        { key: 'c', text: cText, isTrue: cTrue },
        { key: 'd', text: dText, isTrue: dTrue },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ' vì $\\int \\frac{1}{\\sin^2 x}\\mathrm{\\,d}x = -\\cot x + C$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ' vì gia tốc là đạo hàm của vận tốc $a(t) = v\'(t)$ (còn nguyên hàm của $v(t)$ cho quãng đường).',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': $F(x) = ' + u.formatTerm(a, 'x', true) + ' - \\frac{' + b + '}{x} + C$, từ $F(' + x0 + ') = ' + y0 + ' \\Rightarrow C = ' + cFrac.latex + '$, nên $F(' + x1 + ') = ' + valX1.latex + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': $s(t) = \\int (' + vStr + ')\\mathrm{\\,d}t = ' + v0 + 't - ' + u.formatTerm(dec / 2, 't^2', true) + '$ (với $s(0)=0$), suy ra $s(' + t1 + ') = ' + u.formatNumberVN(sTrue, 1) + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 >= 0', params: { a: -1, b: 3, x0: 0, y0: 7, x1: -4, v0: 16, dec: 6, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37 Đ-S-Đ-S', params: { a: -1, b: 3, x0: -5, y0: 7, x1: -4, v0: 16, dec: 6, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 38 (Q38 - TF): Cho f(x) bậc hai, xét tính chất g(x), ∫ f(x)dx, F(0)=y0, F(x1)
  t12_b11_d38_quadratic_antideriv_tf: {
    id: 't12_b11_d38_quadratic_antideriv_tf',
    name: 'Xét tính đúng sai các khẳng định về nguyên hàm của tam thức bậc hai',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm đa thức cơ bản',
    description: 'Cho f(x) = ax^2 + bx + c. Đánh giá 4 mệnh đề về một nguyên hàm g(x), họ nguyên hàm, F(x) thỏa F(0) = y0 và giá trị F(x1).',
    conditionSummary: 'Hệ số a ≠ 0, b chẵn để hệ số x^2 nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (bậc 2)', min: -5, max: 5, allowZero: false },
      { name: 'b2', label: 'Nửa hệ số b (b = 2*b2)', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hệ số tự do c', min: -6, max: 6, allowZero: false },
      { name: 'y0', label: 'Giá trị F(0)', min: 1, max: 6 },
      { name: 'x1', label: 'Điểm tính F(x1) (bội của 3)', min: -3, max: 3, step: 3 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b2, c, x1 } = params;
      if (a === 0 || b2 === 0 || c === 0 || x1 === 0) return { valid: false, reason: 'Các hệ số và điểm x1 phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b2, c, y0, x1, mode } = params;
      const b = 2 * b2;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const fx = u.formatQuadratic(a, b, c);
      const baseTrue = fmtFS(a, 3, 'x^3', true) + fmtFS(b2, 1, 'x^2', false) + u.formatTerm(c, 'x', false);
      const baseWrongSign = fmtFS(a, 3, 'x^3', true) + fmtFS(-b2, 1, 'x^2', false) + u.formatTerm(c, 'x', false);
      const derivFx = u.formatLinear(2 * a, b);
      const valX1 = (a / 3) * Math.pow(x1, 3) + b2 * x1 * x1 + c * x1 + y0;

      const aTrue = mode === 1;
      const bTrue = mode === 2;
      const cTrue = mode === 1 || mode === 3;
      const dTrue = mode === 2 || mode === 3;

      const tfStatements = [
        { key: 'a', text: '$g(x) = ' + (aTrue ? baseTrue : baseWrongSign) + '$ là một nguyên hàm của $f(x)$.', isTrue: aTrue },
        { key: 'b', text: '$\\int f(x)\\mathrm{\\,d}x = ' + (bTrue ? baseTrue : derivFx) + ' + C$.', isTrue: bTrue },
        { key: 'c', text: '$F(x)$ là một nguyên hàm của $f(x)$ thỏa mãn $F(0) = ' + y0 + '$ thì $F(x) = ' + baseTrue + u.formatTrailingConst(cTrue ? y0 : y0 + 1) + '$.', isTrue: cTrue },
        { key: 'd', text: '$F(x)$ là một nguyên hàm của $f(x)$ thỏa mãn $F(0) = ' + y0 + '$ thì $F(' + x1 + ') = ' + (dTrue ? valX1 : valX1 + 1) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Cho hàm số $f(x) = ' + fx + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Nguyên hàm của $f(x)$ có dạng $' + baseTrue + ' + C$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int f(x)\\mathrm{\\,d}x = ' + baseTrue + ' + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $F(0) = ' + y0 + ' \\Rightarrow C = ' + y0 + '$, nên $F(x) = ' + baseTrue + u.formatTrailingConst(y0) + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Thay $x = ' + x1 + '$ được $F(' + x1 + ') = ' + valX1 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b2: -1, c: -4, y0: 1, x1: -3, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38 f(x) = -4x² - 2x - 4, S-S-S-S', params: { a: -4, b2: -1, c: -4, y0: 1, x1: -3, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 39 (Q39 - TF): Nguyên hàm hàm lượng giác f(x) = a sin x + b cos x
  t12_b11_d39_trig_diff_val_tf: {
    id: 't12_b11_d39_trig_diff_val_tf',
    name: 'Xét tính đúng sai về F\'(x), F(x), hằng số C và hiệu F(π/3) - F(π/6) cho f(x) lượng giác',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Cho F(x) là nguyên hàm của f(x) = a sin x + b cos x. Đánh giá đạo hàm, công thức F(x), hằng số C tại π/6 và F(π/3) - F(π/6).',
    conditionSummary: 'a ≠ 0 và b ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số sin x', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số cos x', min: -5, max: 5, allowZero: false },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'Hệ số a, b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, mode } = params;
      // F'(x) = a sin x + b cos x
      // F(x) = b sin x - a cos x + C
      // Set F(pi/6) = b/2 -> C = b/2 - (b/2 - a*sqrt(3)/2) = (a/2)*sqrt(3)
      // Wait: if a = -2, b = -3 => b/2 = -3/2, C = (-2/2)*sqrt(3) = -sqrt(3) ! Matches canonical Q39!
      const fx = u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false);
      const fDerivWrong = u.formatTerm(-b, '\\sin x', true) + u.formatTerm(a, '\\cos x', false);
      const FxTrue = u.formatTerm(b, '\\sin x', true) + u.formatTerm(-a, '\\cos x', false);
      const FxWrong = u.formatTerm(-b, '\\sin x', true) + u.formatTerm(a, '\\cos x', false);

      const fmtHalf = (coeff) => {
        const f = u.simplifyFrac(coeff, 2);
        return f.latex;
      };
      const fmtSqrt3 = (coeff, isFirst) => {
        const f = u.simplifyFrac(coeff, 2);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 ? '' : an) + '\\sqrt{3}';
        return sign + '\\frac{' + (an === 1 ? '' : an) + '\\sqrt{3}}{' + f.den + '}';
      };
      // F(pi/6) = b*(1/2) - a*(sqrt(3)/2) + C = b/2 => C = (a/2)*sqrt(3)
      const valPi6 = fmtHalf(b);
      const cTrueStr = fmtSqrt3(a, true);
      const cWrongStr = '-2' + fmtSqrt3(a, false);
      // F(pi/3) - F(pi/6) = (b - a)/2 * sqrt(3) + (a - b)/2 * 1 -> let's compute exact!
      // F(pi/3) = b*(sqrt(3)/2) - a*(1/2) + C; F(pi/6) = b*(1/2) - a*(sqrt(3)/2) + C
      // diff = (-a - b)/2 + (a + b)/2 * sqrt(3)
      const rInt = -a - b;
      const sSqrt = a + b;
      const diffTrueStr =
        (rInt === 0 ? fmtSqrt3(sSqrt, true) : fmtHalf(rInt) + fmtSqrt3(sSqrt, false)) || '0';
      const diffWrongStr =
        (rInt + 6 === 0 ? fmtSqrt3(sSqrt, true) : fmtHalf(rInt + 6) + fmtSqrt3(sSqrt, false)) || '1';

      const aTrue = mode === 1;
      const bTrue = mode === 0 || mode === 2;
      const cTrue = mode === 2;
      const dTrue = mode === 3;

      const tfStatements = [
        { key: 'a', text: '$F\'(x) = ' + (aTrue ? fx : fDerivWrong) + '$.', isTrue: aTrue },
        { key: 'b', text: '$F(x) = ' + (bTrue ? FxTrue : FxWrong) + ' + C$.', isTrue: bTrue },
        { key: 'c', text: 'Biết $F\\left(\\frac{\\pi}{6}\\right) = ' + valPi6 + '$. Khi đó $C = ' + (cTrue ? cTrueStr : cWrongStr) + '$.', isTrue: cTrue },
        { key: 'd', text: '$F\\left(\\frac{\\pi}{3}\\right) - F\\left(\\frac{\\pi}{6}\\right) = ' + (dTrue ? diffTrueStr : diffWrongStr) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Giả sử $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $F\'(x) = f(x) = ' + fx + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $F(x) = ' + FxTrue + ' + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' Từ $F\\left(\\frac{\\pi}{6}\\right) = ' + valPi6 + ' \\Rightarrow C = ' + cTrueStr + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $F\\left(\\frac{\\pi}{3}\\right) - F\\left(\\frac{\\pi}{6}\\right) = ' + diffTrueStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -3, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39 f(x) = -2sin x - 3cos x', params: { a: -2, b: -3, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 40 (Q40 - TF): Cho f(x) = ax + b + c/x^2, xét F'(x), F(x), C và F(m) - F(1)
  t12_b11_d40_lin_invx2_tf: {
    id: 't12_b11_d40_lin_invx2_tf',
    name: 'Xét tính đúng sai nguyên hàm hàm f(x) = ax + b + c/x²',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Cho F(x) là nguyên hàm của f(x) = ax + b + c/x^2 (a chẵn). Xét F\'(x), F(x), hằng số C tại x=1 và hiệu F(m) - F(1).',
    conditionSummary: 'a chẵn khác 0, b > 0, c > 0, m ≥ 2',
    paramSpecs: [
      { name: 'a2', label: 'Nửa hệ số a (a = 2*a2)', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: 1, max: 7 },
      { name: 'c', label: 'Tử số c của c/x²', min: 1, max: 8 },
      { name: 'C0', label: 'Hằng số C', min: 2, max: 9 },
      { name: 'm', label: 'Điểm m >= 2', min: 2, max: 6 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a2, b, c, m } = params;
      if (a2 === 0 || b <= 0 || c <= 0 || m < 2) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a2, b, c, C0, m, mode } = params;
      const a = 2 * a2;
      const fx = u.formatLinear(a, b) + ' + \\frac{' + c + '}{x^2}';
      const fDerivWrong = a + ' - \\frac{' + (2 * c) + '}{x^3}';
      const FxTrue = u.formatTerm(a2, 'x^2', true) + u.formatTerm(b, 'x', false) + ' - \\frac{' + c + '}{x}';
      const FxWrong = u.formatTerm(a2, 'x^2', true) + u.formatTerm(b + 1, 'x', false) + ' - \\frac{' + c + '}{x}';
      const y1 = a2 + b - c + C0;
      const diffTrue = u.simplifyFrac(m * (a2 * m * m + b * m) - c - m * (a2 + b - c), m);
      const diffWrong = u.simplifyFrac(diffTrue.num + diffTrue.den, diffTrue.den);

      const aTrue = mode === 2;
      const bTrue = mode === 1;
      const cTrue = mode !== 3;
      const dTrue = mode !== 2;

      const tfStatements = [
        { key: 'a', text: '$F\'(x) = ' + (aTrue ? fx : fDerivWrong) + '$.', isTrue: aTrue },
        { key: 'b', text: '$F(x) = ' + (bTrue ? FxTrue : FxWrong) + ' + C$.', isTrue: bTrue },
        { key: 'c', text: 'Biết $F(1) = ' + y1 + '$. Khi đó $C = ' + (cTrue ? C0 : C0 + 2) + '$.', isTrue: cTrue },
        { key: 'd', text: '$F(' + m + ') - F(1) = ' + (dTrue ? diffTrue.latex : diffWrong.latex) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Giả sử $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $F\'(x) = f(x) = ' + fx + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $F(x) = ' + FxTrue + ' + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $F(1) = ' + y1 + ' \\Rightarrow ' + (a2 + b - c) + ' + C = ' + y1 + ' \\Rightarrow C = ' + C0 + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $F(' + m + ') - F(1) = ' + diffTrue.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 1', params: { a2: -1, b: 5, c: 5, C0: 6, m: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40 f(x) = -2x + 5 + 5/x², S-S-Đ-Đ', params: { a2: -1, b: 5, c: 5, C0: 6, m: 5, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 41 (Q41 - TF): Bốn mệnh đề kiểm tra kỹ năng tính nguyên hàm đa thức & 1/x^2
  t12_b11_d41_poly_product_invx2_tf: {
    id: 't12_b11_d41_poly_product_invx2_tf',
    name: 'Xét tính đúng sai các công thức nguyên hàm đa thức, tích nhị thức và 1/x²',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Nguyên hàm hàm đa thức và phân thức',
    description: 'Kiểm tra 4 công thức nguyên hàm: hàm hằng, bậc hai, tích hai nhị thức bậc nhất, và tổng hằng số với c/x^2.',
    conditionSummary: 'Hệ số khác 0 và khai triển tích bậc hai chuẩn',
    paramSpecs: [
      { name: 'k', label: 'Hằng số ý a', min: 2, max: 8 },
      { name: 'a2', label: 'Hệ số x² ý b (bội 3)', min: 3, max: 9, step: 3 },
      { name: 'p', label: 'Hằng số p ý c', min: 2, max: 7 },
      { name: 'q', label: 'Hệ số q ý c', min: 1, max: 4 },
      { name: 'r', label: 'Hệ số r ý c', min: 2, max: 6 },
      { name: 'm', label: 'Hằng số m ý d', min: 2, max: 9 },
      { name: 'n', label: 'Tử số n/x² ý d', min: 2, max: 9 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { k, a2, p, q, r, m, n } = params;
      if (k <= 0 || a2 <= 0 || p <= 0 || q <= 0 || r <= 0 || m <= 0 || n <= 0) {
        return { valid: false, reason: 'Các tham số phải dương' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, a2, p, q, r, m, n, mode } = params;
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      // b) int (a2 x^2 - x + 1) dx = (a2/3) x^3 - x^2/2 + x + C
      const bInt = (a2 / 3) + 'x^3 - \\frac{x^2}{2} + x';
      // c) (p - qx)(-rx - r) = q*r*x^2 + r*(q - p)*x - p*r
      const c2 = q * r, c1 = r * (q - p), c0 = -p * r;
      const cExpr = fmtFS(c2, 3, 'x^3', true) + fmtFS(c1, 2, 'x^2', false) + u.formatTerm(c0, 'x', false);
      const cWrong = fmtFS(c2, 3, 'x^3', true) + fmtFS(-c1 || 2, 2, 'x^2', false) + u.formatTerm(c0, 'x', false);

      const aTrue = mode !== 1;
      const bTrue = mode !== 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 0 || mode === 3;

      const tfStatements = [
        { key: 'a', text: 'Hàm số $F(x) = ' + (aTrue ? k + 'x' : k + 'x^2') + '$ là một nguyên hàm của hàm số $f(x) = ' + k + '$.', isTrue: aTrue },
        { key: 'b', text: '$\\int (' + a2 + 'x^2 - x + 1)\\mathrm{\\,d}x = ' + (bTrue ? bInt : a2 + 'x^3 - x^2 + x') + ' + C$.', isTrue: bTrue },
        { key: 'c', text: '$\\int [(' + p + ' - ' + u.formatTerm(q, 'x', true) + ')(-' + r + 'x - ' + r + ')]\\mathrm{\\,d}x = ' + (cTrue ? cExpr : cWrong) + ' + C$.', isTrue: cTrue },
        { key: 'd', text: '$\\int \\left(' + m + ' - \\frac{' + n + '}{x^2}\\right)\\mathrm{\\,d}x = ' + m + 'x ' + (dTrue ? '+ \\frac{' + n + '}{x}' : '- \\frac{' + n + '}{x}') + ' + C$.', isTrue: dTrue },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Đạo hàm của $' + k + 'x$ là $' + k + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int (' + a2 + 'x^2 - x + 1)\\mathrm{\\,d}x = ' + bInt + ' + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' Khai triển biểu thức dưới dấu nguyên hàm được $' + u.formatQuadratic(c2, c1, c0) + '$, nên nguyên hàm là $' + cExpr + ' + C$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\int \\left(' + m + ' - \\frac{' + n + '}{x^2}\\right)\\mathrm{\\,d}x = ' + m + 'x + \\frac{' + n + '}{x} + C$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hằng số k = 0', params: { k: 0, a2: 6, p: 5, q: 2, r: 8, m: 5, n: 8, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41 Đ-Đ-Đ-Đ', params: { k: 3, a2: 6, p: 5, q: 2, r: 8, m: 5, n: 8, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 42 (Q42 - TF): Nguyên hàm lượng giác chứa tan^2 x và tìm F(pi/6) biết F(2pi)
  t12_b11_d42_trig_tan2_cond_tf: {
    id: 't12_b11_d42_trig_tan2_cond_tf',
    name: 'Xét tính đúng sai nguyên hàm lượng giác chứa tan²x và giá trị F(π/6)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Kiểm tra công thức nguyên hàm sin x, cos x, m - tan^2(x) và tính giá trị F(π/6) từ F(2π) = y0.',
    conditionSummary: 'Giá trị làm tròn hàng phần mười không chạm ranh giới 0,05',
    paramSpecs: [
      { name: 'k', label: 'Hệ số ý a', min: 3, max: 9 },
      { name: 'm', label: 'Hằng số ý c (m - tan²x)', min: 2, max: 7 },
      { name: 'a', label: 'Hệ số sin x ý d', min: 1, max: 5 },
      { name: 'b', label: 'Hệ số cos x ý d', min: -6, max: -1 },
      { name: 'c', label: 'Hằng số c ý d', min: -4, max: -1 },
      { name: 'y0', label: 'Giá trị F(2π)', min: -3, max: 5 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, c, y0 } = params;
      // F(x) = c*x + b*sin x - a*cos x + C
      // F(2pi) = 2*pi*c - a + C = y0 => C = y0 + a - 2*pi*c
      // F(pi/6) = c*pi/6 + b/2 - a*sqrt(3)/2 + C
      const val = c * (Math.PI / 6 - 2 * Math.PI) + 0.5 * b - 0.5 * a * Math.sqrt(3) + y0 + a;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, m, a, b, c, y0, mode } = params;
      const val = c * (Math.PI / 6 - 2 * Math.PI) + 0.5 * b - 0.5 * a * Math.sqrt(3) + y0 + a;
      const valR = Math.round(val * 10) / 10;
      const valWrongR = Math.round((valR + 1.2) * 10) / 10;

      const aTrue = mode === 1;
      const bTrue = mode === 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 0 || mode === 3;

      const fD = u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false) + u.formatTerm(c, '', false);
      const FxD = u.formatTerm(c, 'x', true) + u.formatTerm(b, '\\sin x', false) + u.formatTerm(-a, '\\cos x', false);

      const tfStatements = [
        { key: 'a', text: '$\\int ' + k + '\\sin x\\mathrm{\\,d}x = ' + (aTrue ? '-' + k : k) + '\\cos x + C$.', isTrue: aTrue },
        { key: 'b', text: '$\\int (\\sin x - \\cos x)\\mathrm{\\,d}x = ' + (bTrue ? '-\\sin x - \\cos x' : '\\sin x + \\cos x') + ' + C$.', isTrue: bTrue },
        { key: 'c', text: '$\\int (' + m + ' - \\tan^2 x)\\mathrm{\\,d}x = ' + (cTrue ? (m + 1) : m) + 'x - \\tan x + C$.', isTrue: cTrue },
        { key: 'd', text: 'Biết $F(x)$ là một nguyên hàm của $f(x) = ' + fD + '$ thỏa mãn $F(2\\pi) = ' + y0 + '$. Khi đó $F\\left(\\frac{\\pi}{6}\\right) = ' + u.formatNumberVN(dTrue ? valR : valWrongR, 1) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\int ' + k + '\\sin x\\mathrm{\\,d}x = -' + k + '\\cos x + C$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int (\\sin x - \\cos x)\\mathrm{\\,d}x = -\\cos x - \\sin x + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int (' + m + ' - \\tan^2 x)\\mathrm{\\,d}x = \\int (' + (m + 1) + ' - \\frac{1}{\\cos^2 x})\\mathrm{\\,d}x = ' + (m + 1) + 'x - \\tan x + C$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $F(x) = ' + FxD + ' + C$; từ $F(2\\pi) = ' + y0 + '$ suy ra $F\\left(\\frac{\\pi}{6}\\right) \\approx ' + u.formatNumberVN(valR, 1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Mẫu chuẩn Q42 f(x)=3sin x - 5cos x - 2, S-S-Đ-Đ', params: { k: 9, m: 2, a: 3, b: -5, c: -2, y0: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 43 (Q43 - TF): Nguyên hàm lượng giác chứa cot^2 x và tìm F(5pi/6) biết F(3pi/2)
  t12_b11_d43_trig_cot2_cond_tf: {
    id: 't12_b11_d43_trig_cot2_cond_tf',
    name: 'Xét tính đúng sai nguyên hàm lượng giác chứa cot²x và giá trị F(5π/6)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Kiểm tra nguyên hàm sin/cos, nguyên hàm cot^2(x) - m và tính giá trị F(5π/6) từ F(3π/2) = y0.',
    conditionSummary: 'Giá trị làm tròn hàng phần mười cách ranh giới 0,05',
    paramSpecs: [
      { name: 'k', label: 'Hệ số ý a', min: 3, max: 9 },
      { name: 'm', label: 'Số trừ m trong cot²x - m', min: 2, max: 6 },
      { name: 'a', label: 'Hệ số sin x ý d', min: 2, max: 6 },
      { name: 'b', label: 'Hệ số cos x ý d', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hằng số c ý d', min: 1, max: 5 },
      { name: 'y0', label: 'Giá trị F(3π/2)', min: -4, max: 4 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { b, c, a, y0 } = params;
      if (b === 0) return { valid: false, reason: 'Hệ số b phải khác 0' };
      // F(x) = c*x + b*sin x - a*cos x + C
      // F(3pi/2) = c*(3pi/2) - b + C = y0 => C = y0 + b - 3c*pi/2
      // F(5pi/6) = c*(5pi/6 - 3pi/2) + b*(1/2 + 1) - a*(-sqrt(3)/2) + y0 = -2c*pi/3 + 1.5*b + 0.5*a*sqrt(3) + y0
      const val = c * (-2 * Math.PI / 3) + 1.5 * b + 0.5 * a * Math.sqrt(3) + y0;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, m, a, b, c, y0, mode } = params;
      const val = c * (-2 * Math.PI / 3) + 1.5 * b + 0.5 * a * Math.sqrt(3) + y0;
      const valR = Math.round(val * 10) / 10;
      const valWrongR = Math.round((valR + 1.5) * 10) / 10;

      const aTrue = mode !== 3;
      const bTrue = mode === 1;
      const cTrue = mode === 2;
      const dTrue = mode !== 2;

      const fD = u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false) + u.formatTerm(c, '', false);
      const FxD = u.formatTerm(c, 'x', true) + u.formatTerm(b, '\\sin x', false) + u.formatTerm(-a, '\\cos x', false);

      const tfStatements = [
        { key: 'a', text: '$\\int ' + k + '\\sin x\\mathrm{\\,d}x = ' + (aTrue ? '-' + k : k) + '\\cos x + C$.', isTrue: aTrue },
        { key: 'b', text: '$\\int (3\\sin x + 5\\cos x)\\mathrm{\\,d}x = ' + (bTrue ? '5\\sin x - 3\\cos x' : '-5\\sin x + 3\\cos x') + ' + C$.', isTrue: bTrue },
        { key: 'c', text: '$\\int (\\cot^2 x - ' + m + ')\\mathrm{\\,d}x = -' + (cTrue ? m + 1 : m) + 'x - \\cot x + C$.', isTrue: cTrue },
        { key: 'd', text: 'Biết $F(x)$ là một nguyên hàm của $f(x) = ' + fD + '$ thỏa mãn $F\\left(\\frac{3\\pi}{2}\\right) = ' + y0 + '$. Khi đó $F\\left(\\frac{5\\pi}{6}\\right) = ' + u.formatNumberVN(dTrue ? valR : valWrongR, 1) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\int ' + k + '\\sin x\\mathrm{\\,d}x = -' + k + '\\cos x + C$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int (3\\sin x + 5\\cos x)\\mathrm{\\,d}x = 5\\sin x - 3\\cos x + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int (\\cot^2 x - ' + m + ')\\mathrm{\\,d}x = \\int (\\frac{1}{\\sin^2 x} - ' + (m + 1) + ')\\mathrm{\\,d}x = -' + (m + 1) + 'x - \\cot x + C$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $F(x) = ' + FxD + ' + C$; từ $F\\left(\\frac{3\\pi}{2}\\right) = ' + y0 + '$ suy ra $F\\left(\\frac{5\\pi}{6}\\right) \\approx ' + u.formatNumberVN(valR, 1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số cos b = 0', params: { k: 7, m: 3, a: 4, b: 0, c: 3, y0: -2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43 Đ-S-S-Đ', params: { k: 7, m: 3, a: 4, b: -1, c: 3, y0: -2, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 44 (Q44 - TF): Nguyên hàm f(x) = a tan^2 x + b cot^2 x + c và F(5pi/3)
  t12_b11_d44_trig_tan2_cot2_tf: {
    id: 't12_b11_d44_trig_tan2_cot2_tf',
    name: 'Xét tính đúng sai nguyên hàm tổng tan²x, cot²x và giá trị F(5π/3)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Kiểm tra nguyên hàm cos x, cos(kx) và tìm F(5π/3) cho f(x) = a tan^2 x + b cot^2 x + c biết F(π/4) = y0.',
    conditionSummary: 'Giá trị làm tròn hàng phần mười cách ranh giới 0,05',
    paramSpecs: [
      { name: 'k', label: 'Hệ số ý a', min: 2, max: 8 },
      { name: 'q', label: 'Hệ số sin(6x) ý c', min: 2, max: 6 },
      { name: 'a', label: 'Hệ số tan²x ý d', min: -6, max: -2 },
      { name: 'b', label: 'Hệ số cot²x ý d', min: 2, max: 6 },
      { name: 'c', label: 'Hằng số c ý d', min: -5, max: -1 },
      { name: 'y0', label: 'Giá trị F(π/4)', min: -4, max: 4 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, c, y0 } = params;
      // f(x) = a(1/cos^2 - 1) + b(1/sin^2 - 1) + c = a/cos^2 + b/sin^2 + (c - a - b)
      // F(x) = a tan x - b cot x + (c - a - b) x + C
      // At pi/4: F(pi/4) = a - b + (c - a - b)*pi/4 + C = y0
      // At 5pi/3: tan(5pi/3) = -sqrt(3), cot(5pi/3) = -1/sqrt(3) = -sqrt(3)/3
      const kLin = c - a - b;
      const val = a * (-Math.sqrt(3) - 1) - b * (-Math.sqrt(3) / 3 - 1) + kLin * (5 * Math.PI / 3 - Math.PI / 4) + y0;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, q, a, b, c, y0, mode } = params;
      const kLin = c - a - b;
      const val = a * (-Math.sqrt(3) - 1) - b * (-Math.sqrt(3) / 3 - 1) + kLin * (5 * Math.PI / 3 - Math.PI / 4) + y0;
      const valR = Math.round(val * 10) / 10;
      const valWrongR = Math.round((valR + 2) * 10) / 10;

      const aTrue = mode !== 2;
      const bTrue = mode === 1;
      const cTrue = mode !== 3;
      const dTrue = mode === 3;

      const fD = u.formatTerm(a, '\\tan^2 x', true) + u.formatTerm(b, '\\cot^2 x', false) + u.formatTerm(c, '', false);
      const FxD = u.formatTerm(kLin, 'x', true) + u.formatTerm(a, '\\tan x', false) + u.formatTerm(-b, '\\cot x', false);

      const tfStatements = [
        { key: 'a', text: '$\\int ' + k + '\\cos x\\mathrm{\\,d}x = ' + (aTrue ? k + '\\sin x' : '-' + k + '\\sin x') + ' + C$.', isTrue: aTrue },
        { key: 'b', text: '$\\int (-5\\sin x - 3\\cos x)\\mathrm{\\,d}x = ' + (bTrue ? '-3\\sin x + 5\\cos x' : '3\\sin x - 5\\cos x') + ' + C$.', isTrue: bTrue },
        { key: 'c', text: '$\\int (3 - ' + (6 * q) + '\\cos 6x)\\mathrm{\\,d}x = 3x - ' + (cTrue ? q : 6 * q) + '\\sin 6x + C$.', isTrue: cTrue },
        { key: 'd', text: 'Biết $F(x)$ là một nguyên hàm của $f(x) = ' + fD + '$ thỏa mãn $F\\left(\\frac{\\pi}{4}\\right) = ' + y0 + '$. Khi đó $F\\left(\\frac{5\\pi}{3}\\right) = ' + u.formatNumberVN(dTrue ? valR : valWrongR, 1) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\int ' + k + '\\cos x\\mathrm{\\,d}x = ' + k + '\\sin x + C$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int (-5\\sin x - 3\\cos x)\\mathrm{\\,d}x = -3\\sin x + 5\\cos x + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int (3 - ' + (6 * q) + '\\cos 6x)\\mathrm{\\,d}x = 3x - ' + q + '\\sin 6x + C$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $F(x) = ' + FxD + ' + C$; từ $F\\left(\\frac{\\pi}{4}\\right) = ' + y0 + '$ suy ra $F\\left(\\frac{5\\pi}{3}\\right) \\approx ' + u.formatNumberVN(valR, 1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Mẫu chuẩn Q44 Đ-S-Đ-S', params: { k: 2, q: 5, a: -5, b: 5, c: -4, y0: -2, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 45 (Q45 - TF): Nguyên hàm hàm mũ cơ số b, e^(kx), e^x, F(x) = a * b^x * ln b + c
  t12_b11_d45_exp_ax_ln_cond_tf: {
    id: 't12_b11_d45_exp_ax_ln_cond_tf',
    name: 'Xét tính đúng sai các khẳng định về nguyên hàm hàm số mũ và tìm F(-2)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Kiểm tra nguyên hàm b^x, e^(kx), tổ hợp e^x và e^(-x), và tìm F(-2) cho f(x) = a·b^x ln b + c biết F(0) = y0.',
    conditionSummary: 'Cơ số b >= 2, giá trị làm tròn hàng phần mười cách ranh giới 0,05',
    paramSpecs: [
      { name: 'b', label: 'Cơ số b', min: 2, max: 7 },
      { name: 'k', label: 'Hệ số k trong e^(kx)', min: 2, max: 7 },
      { name: 'a', label: 'Hệ số a trong a·b^x ln b', min: -5, max: -1 },
      { name: 'c', label: 'Hằng số c', min: -5, max: -1 },
      { name: 'y0', label: 'Giá trị F(0)', min: -5, max: 2 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { b, k, a, c, y0 } = params;
      if (b < 2 || k < 2) return { valid: false, reason: 'Cần b >= 2 và k >= 2' };
      // F(x) = a * b^x + c*x + C; F(0) = a + C = y0 => C = y0 - a
      // F(-2) = a / b^2 - 2c + y0 - a
      const val = a / (b * b) - 2 * c + y0 - a;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, k, a, c, y0, mode } = params;
      const cConst = y0 - a;
      const valFrac = u.simplifyFrac(a - 2 * c * b * b + cConst * b * b, b * b);
      const valR = Math.round(valFrac.value * 10) / 10;
      const valWrongR = Math.round((valR + 1.4) * 10) / 10;

      const aTrue = mode !== 2;
      const bTrue = mode === 1;
      const cTrue = mode !== 3;
      const dTrue = mode !== 1;

      const tfStatements = [
        { key: 'a', text: '$\\int ' + b + '^x\\mathrm{\\,d}x = ' + (aTrue ? '\\dfrac{' + b + '^x}{\\ln ' + b + '}' : b + '^x\\ln ' + b) + ' + C$.', isTrue: aTrue },
        { key: 'b', text: '$\\int \\mathrm{e}^{' + k + 'x}\\mathrm{\\,d}x = ' + (bTrue ? '\\dfrac{1}{' + k + '}\\mathrm{e}^{' + k + 'x}' : k + '\\mathrm{e}^{' + k + 'x}') + ' + C$.', isTrue: bTrue },
        { key: 'c', text: '$\\int (-3\\mathrm{e}^x - 2\\mathrm{e}^{-x})\\mathrm{\\,d}x = -3\\mathrm{e}^x ' + (cTrue ? '+ 2\\mathrm{e}^{-x}' : '- 2\\mathrm{e}^{-x}') + ' + C$.', isTrue: cTrue },
        { key: 'd', text: '$F(x)$ là một nguyên hàm của hàm số $f(x) = ' + a + ' \\cdot ' + b + '^x \\ln ' + b + u.formatTerm(c, '', false) + '$ thỏa mãn $F(0) = ' + y0 + '$. Khi đó $F(-2) = ' + u.formatNumberVN(dTrue ? valR : valWrongR, 1) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\int ' + b + '^x\\mathrm{\\,d}x = \\dfrac{' + b + '^x}{\\ln ' + b + '} + C$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int \\mathrm{e}^{' + k + 'x}\\mathrm{\\,d}x = \\dfrac{1}{' + k + '}\\mathrm{e}^{' + k + 'x} + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int (-3\\mathrm{e}^x - 2\\mathrm{e}^{-x})\\mathrm{\\,d}x = -3\\mathrm{e}^x + 2\\mathrm{e}^{-x} + C$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $F(x) = ' + a + ' \\cdot ' + b + '^x' + u.formatTerm(c, 'x', false) + u.formatTrailingConst(cConst) + '$, nên $F(-2) = ' + valFrac.latex + ' \\approx ' + u.formatNumberVN(valR, 1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1, k: 6, a: -4, c: -3, y0: -4, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45 Đ-S-Đ-Đ', params: { b: 6, k: 6, a: -4, c: -3, y0: -4, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 46 (Q46 - TF): Nguyên hàm b^(2x), tích lũy thừa, và F(x) = a e^x + c + b e^-x tại x=1
  t12_b11_d46_exp_prod_bases_tf: {
    id: 't12_b11_d46_exp_prod_bases_tf',
    name: 'Xét tính đúng sai nguyên hàm b^(2x), p^x·q^x·r^x và tính giá trị F(1)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Kiểm tra nguyên hàm k e^x, b^(2x), tích 3 hàm mũ cùng số mũ x, và tính F(1) của a e^x + c + b e^-x biết F(2) = y0.',
    conditionSummary: 'Giá trị làm tròn hàng phần mười cách ranh giới 0,05',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k ý a', min: 2, max: 8 },
      { name: 'b', label: 'Cơ số b trong b^(2x)', min: 3, max: 9 },
      { name: 'p', label: 'Cơ số p', min: 2, max: 5 },
      { name: 'q', label: 'Cơ số q', min: 3, max: 6 },
      { name: 'r', label: 'Cơ số r', min: 4, max: 7 },
      { name: 'a', label: 'Hệ số e^x ý d', min: 1, max: 4 },
      { name: 'y0', label: 'Giá trị F(2)', min: -2, max: 4 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { b, p, q, r, a, y0 } = params;
      if (b < 2 || p === q || q === r) return { valid: false, reason: 'Cần cơ số hợp lệ' };
      // f(x) = a e^x - 1 + e^(-x) => F(x) = a e^x - x - e^(-x) + C
      // F(2) = y0 => C = y0 + 2 - a e^2 + e^(-2)
      // F(1) = a e - 1 - e^(-1) + y0 + 2 - a e^2 + e^(-2)
      const e = Math.E;
      const val = a * e - 1 - 1 / e + y0 + 2 - a * e * e + 1 / (e * e);
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, b, p, q, r, a, y0, mode } = params;
      const prod = p * q * r;
      const b2 = b * b;
      const e = Math.E;
      const val = a * e - 1 - 1 / e + y0 + 2 - a * e * e + 1 / (e * e);
      const valR = Math.round(val * 10) / 10;
      const valWrongR = Math.round((valR + 1.0) * 10) / 10;

      const aTrue = mode === 1;
      const bTrue = mode === 2;
      const cTrue = mode === 3;
      const dTrue = mode === 2;

      const tfStatements = [
        { key: 'a', text: '$\\int ' + k + '\\mathrm{e}^x\\mathrm{\\,d}x = ' + (aTrue ? k + '\\mathrm{e}^x' : '\\mathrm{e}^{' + k + 'x}') + ' + C$.', isTrue: aTrue },
        { key: 'b', text: '$\\int ' + b + '^{2x}\\mathrm{\\,d}x = ' + (bTrue ? '\\dfrac{' + b2 + '^x}{\\ln ' + b2 + '}' : '\\dfrac{' + b + '^x}{\\ln ' + (2 * b) + '}') + ' + C$.', isTrue: bTrue },
        { key: 'c', text: '$\\int ' + p + '^x\\cdot ' + q + '^x\\cdot ' + r + '^x\\mathrm{\\,d}x = ' + (cTrue ? '\\dfrac{' + prod + '^x}{\\ln ' + prod + '}' : prod + '^x\\ln ' + prod) + ' + C$.', isTrue: cTrue },
        { key: 'd', text: '$F(x)$ là một nguyên hàm của hàm số $f(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + ' - 1 + \\mathrm{e}^{-x}$ thỏa mãn $F(2) = ' + y0 + '$. Khi đó $F(1) = ' + u.formatNumberVN(dTrue ? valR : valWrongR, 1) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\int ' + k + '\\mathrm{e}^x\\mathrm{\\,d}x = ' + k + '\\mathrm{e}^x + C$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int ' + b + '^{2x}\\mathrm{\\,d}x = \\int ' + b2 + '^x\\mathrm{\\,d}x = \\dfrac{' + b2 + '^x}{\\ln ' + b2 + '} + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int (' + prod + ')^x\\mathrm{\\,d}x = \\dfrac{' + prod + '^x}{\\ln ' + prod + '} + C$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $F(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + ' - x - \\mathrm{e}^{-x} + C$; với $F(2) = ' + y0 + '$ ta tính được $F(1) \\approx ' + u.formatNumberVN(valR, 1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { k: 4, b: 8, p: 4, q: 4, r: 7, a: 2, y0: 2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46 S-S-S-S', params: { k: 4, b: 8, p: 4, q: 6, r: 7, a: 2, y0: 2, mode: 0 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // BÀI 11. NGUYÊN HÀM — PHẦN III: 19 DẠNG TRẢ LỜI NGẮN (D47..D65)
  // =====================================================================

  // Dạng 47 (Q47 - SA): Nguyên hàm đa thức bậc 3 thỏa F(x0) = y0 -> tính F(x1)
  t12_b11_d47_poly_deg3_val_sa: {
    id: 't12_b11_d47_poly_deg3_val_sa',
    name: 'Tính giá trị F(x₁) của nguyên hàm hàm đa thức bậc ba biết F(x₀) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm thỏa mãn điều kiện ban đầu',
    description: 'Cho f(x) = 4kx^3 + 2mx + c. Biết F(x0) = y0, tìm F(x) và tính giá trị nguyên F(x1).',
    conditionSummary: 'k ≠ 0 và x0 ≠ x1',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k (a = 4k)', min: -3, max: 3, allowZero: false },
      { name: 'm', label: 'Hệ số m (b = 2m)', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hệ số tự do c', min: -5, max: 5, allowZero: false },
      { name: 'x0', label: 'Điểm cho trước x₀', min: -4, max: 4 },
      { name: 'y0', label: 'Giá trị F(x₀)', min: -5, max: 5 },
      { name: 'x1', label: 'Điểm cần tính x₁', min: -4, max: 4 },
    ],
    validateCode: `
      const { k, m, c, x0, x1 } = params;
      if (k === 0 || m === 0 || c === 0 || x0 === x1) {
        return { valid: false, reason: 'Các hệ số phải khác 0 và x0 ≠ x1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, m, c, x0, y0, x1 } = params;
      const a = 4 * k, b = 2 * m;
      const fx = u.formatPoly([a, 0, b, c]);
      const base = (x) => k * Math.pow(x, 4) + m * x * x + c * x;
      const C = y0 - base(x0);
      const ans = base(x1) + C;
      const baseStr = u.formatTerm(k, 'x^4', true) + u.formatTerm(m, 'x^2', false) + u.formatTerm(c, 'x', false);
      return {
        stem: 'Tìm một nguyên hàm $F(x)$ của hàm số $f(x) = ' + fx + '$ biết $F(' + x0 + ') = ' + y0 + '$. Tính $F(' + x1 + ')$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $F(x) = ' + baseStr + ' + C$.',
          'Do $F(' + x0 + ') = ' + y0 + '$ nên $' + base(x0) + ' + C = ' + y0 + ' \\Rightarrow C = ' + C + '$.',
          'Vậy $F(x) = ' + baseStr + u.formatTrailingConst(C) + '$, suy ra $F(' + x1 + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = x1', params: { k: -1, m: -3, c: -3, x0: -3, y0: 2, x1: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47 F(-4)=2, F(-3)=195', params: { k: -1, m: -3, c: -3, x0: -4, y0: 2, x1: -3 }, expectedValid: true },
    ],
  },

  // Dạng 48 (Q48 - SA): F(x) của f(x) = a + b/x^2, F(x0)=y0 -> tính F(x1)
  t12_b11_d48_const_invx2_val_sa: {
    id: 't12_b11_d48_const_invx2_val_sa',
    name: 'Tính giá trị F(x₁) của nguyên hàm f(x) = a + b/x² biết F(x₀) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Cho F(x) là nguyên hàm của a + b/x^2 trên khoảng cùng dấu chứa x0 và x1. Tính F(x1) làm tròn đến hàng phần mười.',
    conditionSummary: 'x0 và x1 cùng dấu, khác 0, x0 ≠ x1, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hằng số a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Tử số b', min: 1, max: 8 },
      { name: 'x0', label: 'Điểm x₀ > 0', min: 2, max: 6 },
      { name: 'y0', label: 'Giá trị F(x₀)', min: -6, max: 6 },
      { name: 'x1', label: 'Điểm x₁ > 0 (khác x₀)', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, b, x0, y0, x1 } = params;
      if (a === 0 || b <= 0 || x0 <= 0 || x1 <= 0 || x0 === x1) {
        return { valid: false, reason: 'Tham số phải hợp lệ và x0 ≠ x1' };
      }
      const val = a * (x1 - x0) - b * (1 / x1 - 1 / x0) + y0;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0, y0, x1 } = params;
      const fx = a + ' + \\frac{' + b + '}{x^2}';
      const fPart0 = u.simplifyFrac(a * x0 * x0 - b, x0);
      const cFrac = u.simplifyFrac(y0 * x0 - (a * x0 * x0 - b), x0);
      const valFrac = u.simplifyFrac((a * x1 * x1 - b) * cFrac.den + cFrac.num * x1, x1 * cFrac.den);
      const rounded = Math.round(valFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cSign = cFrac.num >= 0 ? ' + ' + cFrac.latex : ' - ' + u.simplifyFrac(-cFrac.num, cFrac.den).latex;
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(' + x0 + ') = ' + y0 + '$. Tính $F(' + x1 + ')$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $F(x) = ' + u.formatTerm(a, 'x', true) + ' - \\frac{' + b + '}{x} + C$.',
          'Từ $F(' + x0 + ') = ' + y0 + ' \\Leftrightarrow ' + fPart0.latex + ' + C = ' + y0 + ' \\Rightarrow C = ' + cFrac.latex + '$.',
          'Vậy $F(x) = ' + u.formatTerm(a, 'x', true) + cSign + ' - \\frac{' + b + '}{x}$, suy ra $F(' + x1 + ') = ' + valFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = x1', params: { a: -2, b: 5, x0: 4, y0: -4, x1: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48 f=-2+5/x², F(4)=-4, F(3)=-2,4', params: { a: -2, b: 5, x0: 4, y0: -4, x1: 3 }, expectedValid: true },
    ],
  },

  // Dạng 49 (Q49 - SA): F(x) của f(x) = ax + b/x^2, F(x0)=y0 -> tính F(x1)/d
  t12_b11_d49_lin_invx2_ratio_sa: {
    id: 't12_b11_d49_lin_invx2_ratio_sa',
    name: 'Tính tỉ số F(x₁)/d của nguyên hàm f(x) = ax + b/x²',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Cho F(x) là nguyên hàm của ax + b/x^2 (a chẵn) thỏa F(x0) = y0. Tính F(x1)/d làm tròn đến hàng phần mười.',
    conditionSummary: 'x0 ≠ x1 cùng dấu, d > 1, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a2', label: 'Nửa hệ số a (a = 2*a2)', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Tử số b', min: 1, max: 8 },
      { name: 'x0', label: 'Điểm x₀ > 0', min: 2, max: 6 },
      { name: 'y0', label: 'Giá trị F(x₀)', min: -6, max: 6 },
      { name: 'x1', label: 'Điểm x₁ > 0 (khác x₀)', min: 2, max: 6 },
      { name: 'd', label: 'Số chia d', min: 5, max: 15 },
    ],
    validateCode: `
      const { a2, b, x0, y0, x1, d } = params;
      if (a2 === 0 || b <= 0 || x0 <= 0 || x1 <= 0 || x0 === x1 || d <= 1) {
        return { valid: false, reason: 'Tham số phải hợp lệ và x0 ≠ x1' };
      }
      const val = (a2 * (x1 * x1 - x0 * x0) - b * (1 / x1 - 1 / x0) + y0) / d;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a2, b, x0, y0, x1, d } = params;
      const a = 2 * a2;
      const fx = u.formatTerm(a, 'x', true) + ' + \\frac{' + b + '}{x^2}';
      const fPart0 = u.simplifyFrac(a2 * Math.pow(x0, 3) - b, x0);
      const cFrac = u.simplifyFrac(y0 * x0 - (a2 * Math.pow(x0, 3) - b), x0);
      const fx1Frac = u.simplifyFrac((a2 * Math.pow(x1, 3) - b) * cFrac.den + cFrac.num * x1, x1 * cFrac.den);
      const ratioFrac = u.simplifyFrac(fx1Frac.num, fx1Frac.den * d);
      const rounded = Math.round(ratioFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(' + x0 + ') = ' + y0 + '$. Tính $\\dfrac{F(' + x1 + ')}{' + d + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $F(x) = ' + u.formatTerm(a2, 'x^2', true) + ' - \\frac{' + b + '}{x} + C$.',
          'Từ $F(' + x0 + ') = ' + y0 + ' \\Rightarrow ' + fPart0.latex + ' + C = ' + y0 + ' \\Rightarrow C = ' + cFrac.latex + '$.',
          'Suy ra $F(' + x1 + ') = ' + fx1Frac.latex + '$, do đó $\\dfrac{F(' + x1 + ')}{' + d + '} = ' + ratioFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = x1', params: { a2: -2, b: 5, x0: 5, y0: -4, x1: 5, d: 13 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49 F(5)=-4, F(3)/13 = 2,1', params: { a2: -2, b: 5, x0: 5, y0: -4, x1: 3, d: 13 }, expectedValid: true },
    ],
  },

  // Dạng 50 (Q50 - SA): F(x) của f(x) = ax + c + b/x^2 với x0, x1 âm
  t12_b11_d50_lin_const_invx2_val_sa: {
    id: 't12_b11_d50_lin_const_invx2_val_sa',
    name: 'Tính F(x₁) của nguyên hàm f(x) = ax + c + b/x² với điểm điều kiện âm',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm phân thức hữu tỉ',
    description: 'Cho F(x) là nguyên hàm của ax + c + b/x^2 (a chẵn) biết F(x0) = y0 (x0, x1 < 0). Tính F(x1) làm tròn hàng phần mười.',
    conditionSummary: 'x0 < 0, x1 < 0, x0 ≠ x1, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a2', label: 'Nửa hệ số a (a = 2*a2)', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Tử số b', min: 1, max: 6 },
      { name: 'x0', label: 'Điểm x₀ < 0', min: -6, max: -2 },
      { name: 'y0', label: 'Giá trị F(x₀)', min: -6, max: 4 },
      { name: 'x1', label: 'Điểm x₁ < 0 (khác x₀)', min: -5, max: -1 },
    ],
    validateCode: `
      const { a2, c, b, x0, y0, x1 } = params;
      if (a2 === 0 || c === 0 || b <= 0 || x0 >= 0 || x1 >= 0 || x0 === x1) {
        return { valid: false, reason: 'Tham số phải hợp lệ và x0 ≠ x1 < 0' };
      }
      const base = (x) => a2 * x * x + c * x - b / x;
      const val = base(x1) + (y0 - base(x0));
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a2, c, b, x0, y0, x1 } = params;
      const a = 2 * a2;
      const fx = u.formatLinear(a, c) + ' + \\frac{' + b + '}{x^2}';
      const fPart0 = u.simplifyFrac(a2 * Math.pow(x0, 3) + c * x0 * x0 - b, x0);
      const cFrac = u.simplifyFrac(y0 * x0 - (a2 * Math.pow(x0, 3) + c * x0 * x0 - b), x0);
      const valFrac = u.simplifyFrac((a2 * Math.pow(x1, 3) + c * x1 * x1 - b) * cFrac.den + cFrac.num * x1, x1 * cFrac.den);
      const rounded = Math.round(valFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(' + x0 + ') = ' + y0 + '$. Tính $F(' + x1 + ')$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $F(x) = ' + u.formatTerm(a2, 'x^2', true) + u.formatTerm(c, 'x', false) + ' - \\frac{' + b + '}{x} + C$.',
          'Từ $F(' + x0 + ') = ' + y0 + ' \\Leftrightarrow ' + fPart0.latex + ' + C = ' + y0 + ' \\Rightarrow C = ' + cFrac.latex + '$.',
          'Suy ra $F(' + x1 + ') = ' + valFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = x1', params: { a2: -3, c: 3, b: 1, x0: -5, y0: -5, x1: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50 F(-5)=-5, F(-1)=79,8', params: { a2: -3, c: 3, b: 1, x0: -5, y0: -5, x1: -1 }, expectedValid: true },
    ],
  },

  // Dạng 51 (Q51 - SA): F(x) của f(x) = a e^x + b, F(0)=y0 -> tính F(1)
  t12_b11_d51_exp_const_val_sa: {
    id: 't12_b11_d51_exp_const_val_sa',
    name: 'Tính F(1) của nguyên hàm f(x) = a e^x + b biết F(0) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Cho F(x) là nguyên hàm của f(x) = a e^x + b thỏa F(0) = y0. Tính F(1) làm tròn hàng phần mười.',
    conditionSummary: 'a, b khác 0, giá trị F(1) cách ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số của e^x', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -5, max: 5, allowZero: false },
      { name: 'y0', label: 'Giá trị F(0)', min: -4, max: 8 },
    ],
    validateCode: `
      const { a, b, y0 } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'Tham số a, b phải khác 0' };
      const val = b + a * Math.E + (y0 - a);
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, y0 } = params;
      const fx = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(b, '', false);
      const C = y0 - a;
      const constAt1 = b + C;
      const val = constAt1 + a * Math.E;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(0) = ' + y0 + '$. Tính $F(1)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(b, 'x', true) + u.formatTerm(a, '\\mathrm{e}^x', false) + ' + C$.',
          '$F(0) = ' + y0 + ' \\Leftrightarrow ' + a + ' + C = ' + y0 + ' \\Rightarrow C = ' + C + '$.',
          'Do đó $F(x) = ' + u.formatTerm(b, 'x', true) + u.formatTerm(a, '\\mathrm{e}^x', false) + u.formatTrailingConst(C) + '$, suy ra $F(1) = ' + constAt1 + u.formatTerm(a, '\\mathrm{e}', false) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -1, y0: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q51 F(0)=6, F(1)=-1,9', params: { a: -4, b: -1, y0: 6 }, expectedValid: true },
    ],
  },

  // Dạng 52 (Q52 - SA): F(x) của f(x) = a e^x + b e^-x, F(x0)=y0 -> tính F(x1)
  t12_b11_d52_exp_pos_neg_val_sa: {
    id: 't12_b11_d52_exp_pos_neg_val_sa',
    name: 'Tính F(x₁) của nguyên hàm f(x) = a e^x + b e^(-x) biết F(x₀) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tìm nguyên hàm F(x) của a e^x + b e^(-x) thỏa điều kiện tại x0 và tính F(x1) làm tròn đến hàng phần mười.',
    conditionSummary: 'a, b khác 0, x0 ≠ x1, giá trị F(x1) cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số của e^x', min: 1, max: 5 },
      { name: 'b', label: 'Hệ số của e^(-x)', min: -4, max: 4, allowZero: false },
      { name: 'x0', label: 'Điểm x₀', min: 0, max: 2 },
      { name: 'y0', label: 'Giá trị F(x₀)', min: -3, max: 4 },
      { name: 'x1', label: 'Điểm x₁ (âm)', min: -3, max: -1 },
    ],
    validateCode: `
      const { a, b, x0, y0, x1 } = params;
      if (a <= 0 || b === 0 || x0 === x1) return { valid: false, reason: 'Tham số không hợp lệ' };
      const fPart = (x) => a * Math.exp(x) - b * Math.exp(-x);
      const val = fPart(x1) + y0 - fPart(x0);
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0, y0, x1 } = params;
      const fx = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(b, '\\mathrm{e}^{-x}', false);
      const fPart = (x) => a * Math.exp(x) - b * Math.exp(-x);
      const C = y0 - fPart(x0);
      const val = fPart(x1) + C;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(' + x0 + ') = ' + y0 + '$. Tính $F(' + x1 + ')$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + ' + C$.',
          'Từ $F(' + x0 + ') = ' + y0 + '$ suy ra $C = ' + y0 + ' - (' + a + '\\mathrm{e}^{' + x0 + '} ' + (b < 0 ? '+ ' + Math.abs(b) : '- ' + b) + '\\mathrm{e}^{' + (-x0) + '})$. ',
          'Thay $x = ' + x1 + '$ ta tính được $F(' + x1 + ') \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 2, b: 0, x0: 2, y0: 2, x1: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q52 F(2)=2, F(-3)=7,3', params: { a: 2, b: -1, x0: 2, y0: 2, x1: -3 }, expectedValid: true },
    ],
  },

  // Dạng 53 (Q53 - SA): F(x) của f(x) = a e^x + c + b e^-x, F(0)=y0 -> tính F(1)
  t12_b11_d53_exp_mix_val_sa: {
    id: 't12_b11_d53_exp_mix_val_sa',
    name: 'Tính F(1) của nguyên hàm f(x) = a e^x + c + b e^(-x) biết F(0) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tìm F(x) từ F(0) = y0 và tính F(1) làm tròn đến hàng phần mười.',
    conditionSummary: 'a, c, b khác 0, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số e^x', min: 1, max: 4 },
      { name: 'c', label: 'Hằng số c', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số e^(-x)', min: -3, max: 3, allowZero: false },
      { name: 'y0', label: 'Giá trị F(0)', min: -3, max: 5 },
    ],
    validateCode: `
      const { a, c, b, y0 } = params;
      if (a <= 0 || c === 0 || b === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      const C = y0 - (a - b);
      const val = a * Math.E + c - b / Math.E + C;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, b, y0 } = params;
      const fx = u.formatTerm(a, '\\mathrm{e}^x', true) + u.formatTerm(c, '', false) + u.formatTerm(b, '\\mathrm{e}^{-x}', false);
      const C = y0 - (a - b);
      const val = a * Math.E + c - b / Math.E + C;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(0) = ' + y0 + '$. Tính $F(1)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(c, 'x', true) + u.formatTerm(a, '\\mathrm{e}^x', false) + u.formatTerm(-b, '\\mathrm{e}^{-x}', false) + ' + C$.',
          'Từ $F(0) = ' + y0 + ' \\Rightarrow ' + (a - b) + ' + C = ' + y0 + ' \\Rightarrow C = ' + C + '$.',
          'Suy ra $F(1) \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { a: 1, c: 0, b: 1, y0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q53 F(0)=2, F(1)=2,4', params: { a: 1, c: -2, b: 1, y0: 2 }, expectedValid: true },
    ],
  },

  // Dạng 54 (Q54 - SA): F(x) của f(x) = a·b^x ln b + c, F(x0)=y0 -> tính F(0)/d
  t12_b11_d54_base_ln_const_ratio_sa: {
    id: 't12_b11_d54_base_ln_const_ratio_sa',
    name: 'Tính tỉ số F(0)/d của nguyên hàm f(x) = a·b^x ln b + c',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Nhận dạng (b^x)\' = b^x ln b để tìm F(x) = a·b^x + cx + C từ F(x0) = y0, rồi tính F(0)/d.',
    conditionSummary: 'b >= 2, x0 >= 1, d >= 2, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: -1 },
      { name: 'b', label: 'Cơ số b', min: 2, max: 6 },
      { name: 'c', label: 'Hằng số c', min: -5, max: 5, allowZero: false },
      { name: 'x0', label: 'Điểm x₀', min: 1, max: 3 },
      { name: 'y0', label: 'Giá trị F(x₀)', min: -4, max: 6 },
      { name: 'd', label: 'Số chia d', min: 5, max: 16 },
    ],
    validateCode: `
      const { a, b, c, x0, y0, d } = params;
      if (a === 0 || b < 2 || c === 0 || x0 <= 0 || d <= 1) return { valid: false, reason: 'Tham số không hợp lệ' };
      const C = y0 - (a * Math.pow(b, x0) + c * x0);
      const val = (a + C) / d;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0, y0, d } = params;
      const fx = a + ' \\cdot ' + b + '^x \\ln ' + b + u.formatTerm(c, '', false);
      const valX0 = a * Math.pow(b, x0) + c * x0;
      const C = y0 - valX0;
      const f0 = a + C;
      const ratioFrac = u.simplifyFrac(f0, d);
      const rounded = Math.round(ratioFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(' + x0 + ') = ' + y0 + '$. Tính $\\dfrac{F(0)}{' + d + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + a + ' \\cdot ' + b + '^x' + u.formatTerm(c, 'x', false) + ' + C$.',
          'Từ $F(' + x0 + ') = ' + y0 + ' \\Leftrightarrow ' + valX0 + ' + C = ' + y0 + ' \\Rightarrow C = ' + C + '$.',
          'Suy ra $F(0) = ' + f0 + '$, do đó $\\dfrac{F(0)}{' + d + '} = ' + ratioFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { a: -3, b: 1, c: -2, x0: 3, y0: 1, d: 12 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q54 F(3)=1, F(0)/12=31,6', params: { a: -3, b: 5, c: -2, x0: 3, y0: 1, d: 12 }, expectedValid: true },
    ],
  },

  // Dạng 55 (Q55 - SA): F(x) của f(x) = a·b^x ln b + k e^x, F(x0)=y0 -> tính F(-x0)/d
  t12_b11_d55_base_ln_exp_ratio_sa: {
    id: 't12_b11_d55_base_ln_exp_ratio_sa',
    name: 'Tính tỉ số F(-x₀)/d của nguyên hàm f(x) = a·b^x ln b + k e^x',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số mũ',
    description: 'Tìm F(x) = a·b^x + k e^x + C thỏa điều kiện F(x0) = y0 và tính F(-x0)/d.',
    conditionSummary: 'b >= 2, a ≠ 0, k ≠ 0, x0 >= 1, d >= 2',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: -1 },
      { name: 'b', label: 'Cơ số b', min: 2, max: 5 },
      { name: 'k', label: 'Hệ số k của e^x', min: -4, max: -1 },
      { name: 'x0', label: 'Điểm x₀', min: 1, max: 3 },
      { name: 'y0', label: 'Giá trị F(x₀)', min: -4, max: 4 },
      { name: 'd', label: 'Số chia d', min: 5, max: 18 },
    ],
    validateCode: `
      const { b, x0, d, a, k, y0 } = params;
      if (b < 2 || x0 <= 0 || d <= 1) return { valid: false, reason: 'Tham số không hợp lệ' };
      const fPart = (x) => a * Math.pow(b, x) + k * Math.exp(x);
      const val = (fPart(-x0) + y0 - fPart(x0)) / d;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k, x0, y0, d } = params;
      const fx = a + ' \\cdot ' + b + '^x \\ln ' + b + u.formatTerm(k, '\\mathrm{e}^x', false);
      const bx0 = Math.pow(b, x0);
      const cNum = y0 - a * bx0;
      const fNeg = a / bx0 + k * Math.exp(-x0) + cNum - k * Math.exp(x0);
      const ratio = fNeg / d;
      const rounded = Math.round(ratio * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(' + x0 + ') = ' + y0 + '$. Tính $\\dfrac{F(' + (-x0) + ')}{' + d + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + a + ' \\cdot ' + b + '^x' + u.formatTerm(k, '\\mathrm{e}^x', false) + ' + C$.',
          'Từ $F(' + x0 + ') = ' + y0 + '$ suy ra $C = ' + cNum + u.formatTerm(-k, '\\mathrm{e}^{' + x0 + '}', false) + '$.',
          'Do đó $F(' + (-x0) + ') \\approx ' + u.formatNumberVN(fNeg, 2) + '$ và $\\dfrac{F(' + (-x0) + ')}{' + d + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { a: -2, b: 1, k: -2, x0: 3, y0: -2, d: 14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q55 F(3)=-2, F(-3)/14=6,6', params: { a: -2, b: 3, k: -2, x0: 3, y0: -2, d: 14 }, expectedValid: true },
    ],
  },

  // Dạng 56 (Q56 - SA): Hệ số bất định F(x) = (ax + 2b)e^x của f(x) = (px + q)e^x -> tính a^2 + 2b^2
  t12_b11_d56_undetermined_exp_pos_sa: {
    id: 't12_b11_d56_undetermined_exp_pos_sa',
    name: 'Đồng nhất hệ số nguyên hàm dạng F(x) = (ax + 2b)e^x',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tìm tham số bằng đạo hàm nguyên hàm',
    description: 'Cho F(x) = (ax + 2b)e^x là nguyên hàm của f(x) = (px + q)e^x. Đồng nhất F\'(x) = f(x) để tìm a, b và tính a^2 + 2b^2.',
    conditionSummary: 'a, b nguyên khác 0',
    paramSpecs: [
      { name: 'aVal', label: 'Giá trị đúng của a', min: 1, max: 8 },
      { name: 'bVal', label: 'Giá trị đúng của b', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      if (params.aVal <= 0 || params.bVal === 0) return { valid: false, reason: 'Tham số a > 0 và b ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aVal, bVal } = params;
      // F(x) = (ax + 2b)e^x => F'(x) = (ax + a + 2b)e^x = (px + q)e^x
      const p = aVal;
      const q = aVal + 2 * bVal;
      const ans = aVal * aVal + 2 * bVal * bVal;
      const fPoly = u.formatLinear(p, q);
      return {
        stem: 'Cho $F(x) = (ax + 2b)\\mathrm{e}^x$ với $a, b \\in \\mathbb{R}$ là một nguyên hàm của hàm số $f(x) = (' + fPoly + ')\\mathrm{e}^x$. Tính giá trị của $a^2 + 2b^2$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $F\'(x) = (ax + a + 2b)\\mathrm{e}^x$.',
          'Vì $F\'(x) = f(x)$ nên $a = ' + p + '$ và $a + 2b = ' + q + ' \\Rightarrow b = ' + bVal + '$.',
          'Vậy $a^2 + 2b^2 = ' + aVal + '^2 + 2(' + bVal + ')^2 = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { aVal: 5, bVal: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q56 a=5, b=3, a²+2b²=43', params: { aVal: 5, bVal: 3 }, expectedValid: true },
    ],
  },

  // Dạng 57 (Q57 - SA): Đồng nhất hệ số ∫ (px + q)/e^x dx = (ax + b)e^-x + C -> tính a - 2b
  t12_b11_d57_undetermined_exp_neg_sa: {
    id: 't12_b11_d57_undetermined_exp_neg_sa',
    name: 'Đồng nhất hệ số nguyên hàm dạng ∫ (px + q)/e^x dx = (ax + b)e^(-x) + C',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tìm tham số bằng đạo hàm nguyên hàm',
    description: 'Tính đạo hàm [(ax + b)e^(-x)]\' và đồng nhất với (px + q)e^(-x) để tìm a, b và tính a - 2b.',
    conditionSummary: 'a, b nguyên khác 0',
    paramSpecs: [
      { name: 'aVal', label: 'Giá trị đúng của a', min: -6, max: 6, allowZero: false },
      { name: 'bVal', label: 'Giá trị đúng của b', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      if (params.aVal === 0 || params.bVal === 0) return { valid: false, reason: 'Tham số a, b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aVal, bVal } = params;
      // [(ax+b)e^-x]' = (-ax + a - b)e^-x
      const p = -aVal;
      const q = aVal - bVal;
      const ans = aVal - 2 * bVal;
      const numPoly = u.formatLinear(p, q);
      return {
        stem: 'Biết $\\displaystyle \\int \\frac{' + numPoly + '}{\\mathrm{e}^x}\\mathrm{\\,d}x = (ax + b)\\mathrm{e}^{-x} + C$ với $a, b \\in \\mathbb{R}$. Tính giá trị của $a - 2b$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $[(ax + b)\\mathrm{e}^{-x}]\' = (-ax + a - b)\\mathrm{e}^{-x}$.',
          'Đồng nhất hệ số với $(' + numPoly + ')\\mathrm{e}^{-x}$: $-a = ' + p + '$ và $a - b = ' + q + '$, suy ra $a = ' + aVal + ',\\, b = ' + bVal + '$.',
          'Vậy $a - 2b = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { aVal: 0, bVal: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q57 (-4x+8)/e^x, a=4, b=-4, a-2b=12', params: { aVal: 4, bVal: -4 }, expectedValid: true },
    ],
  },

  // Dạng 58 (Q58 - SA): F(x) của a + b sin x, F(0)=y0 -> tính F(pi/6)
  t12_b11_d58_trig_const_sin_val_sa: {
    id: 't12_b11_d58_trig_const_sin_val_sa',
    name: 'Tính F(π/6) của nguyên hàm f(x) = a + b sin x biết F(0) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tìm F(x) = ax - b cos x + C thỏa F(0) = y0 và tính F(π/6) làm tròn hàng phần mười.',
    conditionSummary: 'a, b khác 0, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hằng số a', min: 1, max: 6 },
      { name: 'b', label: 'Hệ số sin x', min: -6, max: 6, allowZero: false },
      { name: 'y0', label: 'Giá trị F(0)', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, y0 } = params;
      if (a <= 0 || b === 0) return { valid: false, reason: 'Tham số phải khác 0' };
      // F(x) = ax - b cos x + C; F(0) = -b + C = y0 => C = y0 + b
      // F(pi/6) = a*pi/6 - b*sqrt(3)/2 + y0 + b
      const val = a * Math.PI / 6 - b * Math.sqrt(3) / 2 + y0 + b;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, y0 } = params;
      const fx = a + u.formatTerm(b, '\\sin x', false);
      const C = y0 + b;
      const val = a * Math.PI / 6 - b * Math.sqrt(3) / 2 + C;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(0) = ' + y0 + '$. Tính $F\\left(\\frac{\\pi}{6}\\right)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(a, 'x', true) + u.formatTerm(-b, '\\cos x', false) + ' + C$.',
          '$F(0) = ' + y0 + ' \\Leftrightarrow ' + (-b) + ' + C = ' + y0 + ' \\Rightarrow C = ' + C + '$.',
          'Thay $x = \\frac{\\pi}{6}$ ta được $F\\left(\\frac{\\pi}{6}\\right) \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 3, b: 0, y0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q58 f(x)=3-2sin x, F(0)=0, F(pi/6)=1,3', params: { a: 3, b: -2, y0: 0 }, expectedValid: true },
    ],
  },

  // Dạng 59 (Q59 - SA): F(x) của a cos x + b, F(5pi/6)=y0 -> tính F(pi/6)
  t12_b11_d59_trig_cos_const_val_sa: {
    id: 't12_b11_d59_trig_cos_const_val_sa',
    name: 'Tính F(π/6) của nguyên hàm f(x) = a cos x + b biết F(5π/6) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tìm F(x) = a sin x + bx + C từ F(5π/6) = y0 và tính F(π/6) làm tròn hàng phần mười.',
    conditionSummary: 'a, b khác 0, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số cos x', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -5, max: 5, allowZero: false },
      { name: 'y0', label: 'Giá trị F(5π/6)', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, y0 } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'Hệ số a, b phải khác 0' };
      // F(x) = a sin x + b x + C; sin(pi/6) = sin(5pi/6) = 1/2
      // F(pi/6) - F(5pi/6) = b*(pi/6 - 5pi/6) = -2b*pi/3
      const val = y0 - (2 * b * Math.PI) / 3;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, y0 } = params;
      const fx = u.formatTerm(a, '\\cos x', true) + u.formatTerm(b, '', false);
      const val = y0 - (2 * b * Math.PI) / 3;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const f5pi6Half = u.simplifyFrac(a, 2);
      const piCoeff = u.simplifyFrac(5 * b, 6);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F\\left(\\frac{5\\pi}{6}\\right) = ' + y0 + '$. Tính $F\\left(\\frac{\\pi}{6}\\right)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(b, 'x', true) + u.formatTerm(a, '\\sin x', false) + ' + C$.',
          'Từ $F\\left(\\frac{5\\pi}{6}\\right) = ' + y0 + '$ suy ra $C = ' + y0 + ' - (' + f5pi6Half.latex + ' + (' + piCoeff.latex + ')\\pi)$.',
          'Vì $\\sin\\frac{\\pi}{6} = \\sin\\frac{5\\pi}{6} = \\frac{1}{2}$ nên $F\\left(\\frac{\\pi}{6}\\right) = ' + y0 + ' - \\frac{2(' + b + ')\\pi}{3} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -3, y0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q59 f=4cos x - 3, F(5pi/6)=0, F(pi/6)=6,3', params: { a: 4, b: -3, y0: 0 }, expectedValid: true },
    ],
  },

  // Dạng 60 (Q60 - SA): F(x) của a cos x + b, F(pi/2)=y0 -> tính F(3pi/4)
  t12_b11_d60_trig_cos_const_pi2_val_sa: {
    id: 't12_b11_d60_trig_cos_const_pi2_val_sa',
    name: 'Tính F(3π/4) của nguyên hàm f(x) = a cos x + b biết F(π/2) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tìm F(x) = a sin x + bx + C từ F(π/2) = y0 và tính F(3π/4) làm tròn hàng phần mười.',
    conditionSummary: 'a, b khác 0, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số cos x', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -6, max: 6, allowZero: false },
      { name: 'y0', label: 'Giá trị F(π/2)', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, y0 } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'Tham số a, b phải khác 0' };
      // F(x) = a sin x + b x + C
      // F(pi/2) = a + b*pi/2 + C = y0 => F(3pi/4) = y0 + a*(sqrt(2)/2 - 1) + b*pi/4
      const val = y0 + a * (Math.SQRT2 / 2 - 1) + b * Math.PI / 4;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, y0 } = params;
      const fx = u.formatTerm(a, '\\cos x', true) + u.formatTerm(b, '', false);
      const val = y0 + a * (Math.SQRT2 / 2 - 1) + b * Math.PI / 4;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F\\left(\\frac{\\pi}{2}\\right) = ' + y0 + '$. Tính $F\\left(\\frac{3\\pi}{4}\\right)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(b, 'x', true) + u.formatTerm(a, '\\sin x', false) + ' + C$.',
          'Từ $F\\left(\\frac{\\pi}{2}\\right) = ' + y0 + '$ suy ra $C = ' + (y0 - a) + u.formatTerm(-b, '\\frac{\\pi}{2}', false) + '$.',
          'Thay $x = \\frac{3\\pi}{4}$ được $F\\left(\\frac{3\\pi}{4}\\right) \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: -3, b: 0, y0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q60 f=-3cos x - 4, F(pi/2)=1, F(3pi/4)=-1,3', params: { a: -3, b: -4, y0: 1 }, expectedValid: true },
    ],
  },

  // Dạng 61 (Q61 - SA): F(x) của a sin x + b cos x, F(2pi)=y0 -> tính F(pi/2)
  t12_b11_d61_trig_sin_cos_val_sa: {
    id: 't12_b11_d61_trig_sin_cos_val_sa',
    name: 'Tính F(π/2) của nguyên hàm f(x) = a sin x + b cos x biết F(2π) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tìm F(x) = b sin x - a cos x + C từ F(2π) = y0 và tính giá trị F(π/2).',
    conditionSummary: 'a, b khác 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số sin x', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hệ số cos x', min: -7, max: 7, allowZero: false },
      { name: 'y0', label: 'Giá trị F(2π)', min: -5, max: 5 },
    ],
    validateCode: `
      if (params.a === 0 || params.b === 0) return { valid: false, reason: 'Tham số a, b phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, y0 } = params;
      // F(x) = b sin x - a cos x + C
      // F(2pi) = -a + C = y0 => C = y0 + a
      // F(pi/2) = b + C = b + y0 + a
      const fx = u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false);
      const C = y0 + a;
      const ans = a + b + y0;
      const shortAnswer = String(ans);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(2\\pi) = ' + y0 + '$. Tính $F\\left(\\frac{\\pi}{2}\\right)$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(b, '\\sin x', true) + u.formatTerm(-a, '\\cos x', false) + ' + C$.',
          'Do $F(2\\pi) = ' + y0 + '$ nên $' + (-a) + ' + C = ' + y0 + ' \\Rightarrow C = ' + C + '$.',
          'Vậy $F\\left(\\frac{\\pi}{2}\\right) = ' + b + (C >= 0 ? ' + ' + C : ' - ' + Math.abs(C)) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -4, y0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q61 f=5sin x - 4cos x, F(2pi)=1, F(pi/2)=2', params: { a: 5, b: -4, y0: 1 }, expectedValid: true },
    ],
  },

  // Dạng 62 (Q62 - SA): F(x) của a sin x + b cos x + c, F(pi)=y0 -> tính F(5pi/6)
  t12_b11_d62_trig_sin_cos_const_val_sa: {
    id: 't12_b11_d62_trig_sin_cos_const_val_sa',
    name: 'Tính F(5π/6) của nguyên hàm f(x) = a sin x + b cos x + c biết F(π) = y₀',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Tìm F(x) = b sin x - a cos x + cx + C từ F(π) = y0 và tính F(5π/6) làm tròn hàng phần mười.',
    conditionSummary: 'a, b, c khác 0, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số sin x', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số cos x', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -4, max: 4, allowZero: false },
      { name: 'y0', label: 'Giá trị F(π)', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, c, y0 } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      // F(x) = b sin x - a cos x + c x + C
      // F(pi) = a + c*pi + C = y0 => C = y0 - a - c*pi
      // F(5pi/6) = b/2 + a*sqrt(3)/2 + c*(5pi/6) + y0 - a - c*pi = 0.5*b + 0.5*a*sqrt(3) - a - c*pi/6 + y0
      const val = 0.5 * b + 0.5 * a * Math.sqrt(3) - a - c * Math.PI / 6 + y0;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, y0 } = params;
      const fx = u.formatTerm(a, '\\sin x', true) + u.formatTerm(b, '\\cos x', false) + u.formatTerm(c, '', false);
      const val = 0.5 * b + 0.5 * a * Math.sqrt(3) - a - c * Math.PI / 6 + y0;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F(\\pi) = ' + y0 + '$. Tính $F\\left(\\frac{5\\pi}{6}\\right)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(c, 'x', true) + u.formatTerm(b, '\\sin x', false) + u.formatTerm(-a, '\\cos x', false) + ' + C$.',
          'Từ $F(\\pi) = ' + y0 + ' \\Rightarrow C = ' + (y0 - a) + u.formatTerm(-c, '\\pi', false) + '$.',
          'Thay $x = \\frac{5\\pi}{6}$ ta tính được $F\\left(\\frac{5\\pi}{6}\\right) \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { a: 2, b: -3, c: 0, y0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q62 f=2sin x-3cos x-1, F(pi)=0, F(5pi/6)=-1,2', params: { a: 2, b: -3, c: -1, y0: 0 }, expectedValid: true },
    ],
  },

  // Dạng 63 (Q63 - SA): F(x) của a tan^2 x + b, F(pi/3)=y0 -> tính F(2pi)
  t12_b11_d63_trig_tan2_const_sa: {
    id: 't12_b11_d63_trig_tan2_const_sa',
    name: 'Tính F(2π) của nguyên hàm f(x) = a tan²x + b biết F(π/3) = y₀',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Biến đổi tan^2 x = 1/cos^2 x - 1 để tìm nguyên hàm F(x) từ F(π/3) = y0 và tính F(2π).',
    conditionSummary: 'a ≠ 0, kết quả cách ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số tan²x', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -5, max: 5, allowZero: false },
      { name: 'y0', label: 'Giá trị F(π/3)', min: -4, max: 6 },
    ],
    validateCode: `
      const { a, b, y0 } = params;
      if (a === 0 || b === 0) return { valid: false, reason: 'Tham số a, b phải khác 0' };
      // F(x) = a tan x + (b - a) x + C
      // F(2pi) - F(pi/3) = -a*sqrt(3) + (b - a)*(5pi/3)
      const val = y0 - a * Math.sqrt(3) + (b - a) * (5 * Math.PI / 3);
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, y0 } = params;
      const kLin = b - a;
      const fx = u.formatTerm(a, '\\tan^2 x', true) + u.formatTerm(b, '', false);
      const val = y0 - a * Math.sqrt(3) + kLin * (5 * Math.PI / 3);
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F\\left(\\frac{\\pi}{3}\\right) = ' + y0 + '$. Tính $F(2\\pi)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = \\int \\left(\\frac{' + a + '}{\\cos^2 x}' + u.formatTerm(kLin, '', false) + '\\right)\\mathrm{\\,d}x = ' + u.formatTerm(kLin, 'x', true) + u.formatTerm(a, '\\tan x', false) + ' + C$.',
          'Từ $F\\left(\\frac{\\pi}{3}\\right) = ' + y0 + '$ suy ra $C$, và thay $x = 2\\pi$ được $F(2\\pi) \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -1, y0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q63 f=-4tan²x-1, F(pi/3)=1, F(2pi)=23,6', params: { a: -4, b: -1, y0: 1 }, expectedValid: true },
    ],
  },

  // Dạng 64 (Q64 - SA): F(x) của a cot^2 x + b, F(pi/6)=y0 -> tính F(pi/4)
  t12_b11_d64_trig_cot2_const_sa: {
    id: 't12_b11_d64_trig_cot2_const_sa',
    name: 'Tính F(π/4) của nguyên hàm f(x) = a cot²x + b biết F(π/6) = y₀',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Biến đổi cot^2 x = 1/sin^2 x - 1 để tìm nguyên hàm F(x) từ F(π/6) = y0 và tính F(π/4).',
    conditionSummary: 'a ≠ 0, kết quả cách ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số cot²x', min: 1, max: 6 },
      { name: 'b', label: 'Hằng số b', min: -5, max: 5, allowZero: false },
      { name: 'y0', label: 'Giá trị F(π/6)', min: -6, max: 4 },
    ],
    validateCode: `
      const { a, b, y0 } = params;
      if (a <= 0 || b === 0) return { valid: false, reason: 'Tham số a > 0 và b ≠ 0' };
      // F(x) = -a cot x + (b - a) x + C
      // F(pi/4) - F(pi/6) = -a*(1 - sqrt(3)) + (b - a)*(pi/12)
      const val = y0 + a * (Math.sqrt(3) - 1) + (b - a) * (Math.PI / 12);
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, y0 } = params;
      const kLin = b - a;
      const fx = u.formatTerm(a, '\\cot^2 x', true) + u.formatTerm(b, '', false);
      const val = y0 + a * (Math.sqrt(3) - 1) + kLin * (Math.PI / 12);
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F\\left(\\frac{\\pi}{6}\\right) = ' + y0 + '$. Tính $F\\left(\\frac{\\pi}{4}\\right)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = \\int \\left(\\frac{' + a + '}{\\sin^2 x}' + u.formatTerm(kLin, '', false) + '\\right)\\mathrm{\\,d}x = ' + u.formatTerm(kLin, 'x', true) + u.formatTerm(-a, '\\cot x', false) + ' + C$.',
          'Từ $F\\left(\\frac{\\pi}{6}\\right) = ' + y0 + '$ suy ra $C$, và thay $x = \\frac{\\pi}{4}$ được $F\\left(\\frac{\\pi}{4}\\right) \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { a: 1, b: 0, y0: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q64 f=cot²x-3, F(pi/6)=-4, F(pi/4)=-4,3', params: { a: 1, b: -3, y0: -4 }, expectedValid: true },
    ],
  },

  // Dạng 65 (Q65 - SA): F(x) của a tan^2 x + b cot^2 x + c, F(2pi/3)=y0 -> tính F(pi/3)
  t12_b11_d65_trig_tan2_cot2_const_sa: {
    id: 't12_b11_d65_trig_tan2_cot2_const_sa',
    name: 'Tính F(π/3) của nguyên hàm f(x) = a tan²x + b cot²x + c biết F(2π/3) = y₀',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Nguyên hàm hàm số lượng giác',
    description: 'Biến đổi a tan^2 x + b cot^2 x + c sang 1/cos^2 x và 1/sin^2 x để tìm F(x) từ F(2π/3) = y0 và tính F(π/3).',
    conditionSummary: 'a, b > 0, giá trị F(π/3) cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số tan²x', min: 1, max: 7 },
      { name: 'b', label: 'Hệ số cot²x', min: 1, max: 7 },
      { name: 'c', label: 'Hằng số c', min: 2, max: 12 },
      { name: 'y0', label: 'Giá trị F(2π/3)', min: -4, max: 6 },
    ],
    validateCode: `
      const { a, b, c, y0 } = params;
      if (a <= 0 || b <= 0) return { valid: false, reason: 'Tham số a, b phải dương' };
      // F(x) = a tan x - b cot x + (c - a - b) x + C
      // tan(pi/3)=sqrt(3), cot(pi/3)=sqrt(3)/3; tan(2pi/3)=-sqrt(3), cot(2pi/3)=-sqrt(3)/3
      // F(pi/3) - F(2pi/3) = 2*a*sqrt(3) - 2*b*sqrt(3)/3 + (c - a - b)*(-pi/3)
      const val = y0 + (2 * a - (2 * b) / 3) * Math.sqrt(3) - (c - a - b) * (Math.PI / 3);
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.015) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, y0 } = params;
      const kLin = c - a - b;
      const fx = u.formatTerm(a, '\\tan^2 x', true) + u.formatTerm(b, '\\cot^2 x', false) + u.formatTerm(c, '', false);
      const val = y0 + (2 * a - (2 * b) / 3) * Math.sqrt(3) - kLin * (Math.PI / 3);
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ thỏa mãn $F\\left(\\frac{2\\pi}{3}\\right) = ' + y0 + '$. Tính $F\\left(\\frac{\\pi}{3}\\right)$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$F(x) = ' + u.formatTerm(kLin, 'x', true) + u.formatTerm(a, '\\tan x', false) + u.formatTerm(-b, '\\cot x', false) + ' + C$.',
          'Từ $F\\left(\\frac{2\\pi}{3}\\right) = ' + y0 + '$ suy ra $C$, và thay $x = \\frac{\\pi}{3}$ được $F\\left(\\frac{\\pi}{3}\\right) \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 3, c: 7, y0: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q65 f=5tan²x+3cot²x+7, F(2pi/3)=4, F(pi/3)=18,9', params: { a: 5, b: 3, c: 7, y0: 4 }, expectedValid: true },
    ],
  },
};
