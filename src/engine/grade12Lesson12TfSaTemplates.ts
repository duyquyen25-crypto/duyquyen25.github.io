import { MathTemplate } from '../types/math';

export const G12_B12_TF_SA_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 12. TÍCH PHÂN — PHẦN II: 7 DẠNG ĐÚNG / SAI (D37..D43)
  // =====================================================================

  // Dạng 37 (Q37 - TF): Tính chất tích phân, ∫ f'(x)dx và quãng đường từ vận tốc v(t)
  t12_b12_d37_properties_motion_tf: {
    id: 't12_b12_d37_properties_motion_tf',
    name: 'Xét tính đúng sai tổng hợp tính chất tích phân và bài toán chuyển động',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Đánh giá 4 mệnh đề về đưa hằng số ra ngoài tích phân, ∫[k f(x) + c]dx, ∫ f\'(x)dx và quãng đường s = ∫ v(t)dt.',
    conditionSummary: 'Cận dưới < cận trên và hệ số gia tốc chẵn để quãng đường nguyên',
    paramSpecs: [
      { name: 'kA', label: 'Hằng số ý a', min: -4, max: 4, allowZero: false },
      { name: 'valB', label: 'Giá trị ∫ f(x)dx ý b', min: 4, max: 14 },
      { name: 'kB', label: 'Hệ số f(x) ý b', min: 2, max: 6 },
      { name: 'cB', label: 'Hằng số cộng ý b', min: 1, max: 5 },
      { name: 'f1', label: 'Giá trị f(x1) ý c', min: -9, max: 5 },
      { name: 'f2', label: 'Giá trị f(x2) ý c', min: -10, max: 8 },
      { name: 'a2', label: 'Nửa gia tốc ý d (a = 2*a2)', min: 2, max: 7 },
      { name: 'v0', label: 'Vận tốc đầu v0 ý d', min: 4, max: 14 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { kA, valB, kB, cB, f1, f2, a2, v0 } = params;
      if (kA === 0 || kB <= 0 || cB <= 0 || f1 === f2 || a2 <= 0 || v0 <= 0) {
        return { valid: false, reason: 'Tham số phải hợp lệ và f(x1) ≠ f(x2)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { kA, valB, kB, cB, f1, f2, a2, v0, mode } = params;
      const aD = 2 * a2;
      const trueB = kB * valB + cB * 4; // interval [7; 11]
      const trueC = f2 - f1; // interval [8; 10]
      const trueD = a2 * (100 - 49) + v0 * (10 - 7); // interval [7; 10]

      const aTrue = mode !== 2;
      const bTrue = mode === 1;
      const cTrue = mode === 2 || mode === 3;
      const dTrue = mode !== 3;

      const aShown = aTrue ? kA : -kA;
      const bShown = bTrue ? trueB : trueB + 3;
      const cShown = cTrue ? trueC : trueC + 1;
      const dShown = dTrue ? trueD : trueD + 5;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\int \\limits_{-1}^{3} ' + u.formatTerm(kA, 'g(x)', true) + '\\mathrm{\\,d}x = ' + aShown + '\\int \\limits_{-1}^{3} g(x)\\mathrm{\\,d}x$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Cho tích phân $\\int\\limits_{7}^{11} f(x)\\mathrm{\\,d}x = ' + valB + '$. Khi đó $\\int\\limits_{7}^{11} \\left[' + kB + 'f(x) + ' + cB + '\\right]\\mathrm{\\,d}x = ' + bShown + '$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Cho hàm số $f(x)$ có đạo hàm trên đoạn $[8;10]$, $f(8) = ' + f1 + '$ và $f(10) = ' + f2 + '$. Khi đó $\\int\\limits_{8}^{10} f\'(x)\\mathrm{\\,d}x = ' + cShown + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Một vật chuyển động với tốc độ $v(t) = ' + aD + 't + ' + v0 + '\\text{ (m/s)}$, với thời gian $t$ tính bằng giây. Quãng đường vật đi được trong khoảng thời gian từ $t = 7$ đến $t = 10$ bằng $' + dShown + '\\text{ m}$.',
          isTrue: dTrue,
        },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Theo tính chất $\\int\\limits_{-1}^3 ' + kA + 'g(x)\\mathrm{\\,d}x = ' + kA + '\\int\\limits_{-1}^3 g(x)\\mathrm{\\,d}x$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int\\limits_{7}^{11} [' + kB + 'f(x)+' + cB + ']\\mathrm{\\,d}x = ' + kB + '\\cdot ' + valB + ' + ' + cB + '\\cdot(11 - 7) = ' + trueB + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int\\limits_{8}^{10} f\'(x)\\mathrm{\\,d}x = f(10) - f(8) = ' + f2 + ' - (' + f1 + ') = ' + trueC + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Quãng đường đi được là $\\int\\limits_{7}^{10} (' + aD + 't + ' + v0 + ')\\mathrm{\\,d}t = (' + a2 + 't^2 + ' + v0 + 't)\\Big|_7^{10} = ' + trueD + '\\text{ m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên f(8) = f(10)', params: { kA: -1, valB: 10, kB: 4, cB: 2, f1: -7, f2: -7, a2: 5, v0: 10, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37 Đ-S-S-Đ', params: { kA: -1, valB: 10, kB: 4, cB: 2, f1: -7, f2: -9, a2: 5, v0: 10, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 38 (Q38 - TF): Tính chất tích phân của hàm liên tục h(x) (đổi cận, vi phân, hàm lẻ, trị tuyệt đối)
  t12_b12_d38_continuous_properties_tf: {
    id: 't12_b12_d38_continuous_properties_tf',
    name: 'Xét tính đúng sai các tính chất lý thuyết của tích phân hàm liên tục',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Kiểm tra 4 tính chất: đổi cận, vi phân d(kx), tích phân hàm số lẻ trên đoạn đối xứng, và ∫|h(x)|dx khi h(x) giữ nguyên dấu.',
    conditionSummary: 'u0 < v0, k >= 2, m > 0, c > 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận u', min: -10, max: -2 },
      { name: 'v0', label: 'Cận v (> u)', min: -8, max: 3 },
      { name: 'k', label: 'Hệ số k trong d(kx)', min: 2, max: 9 },
      { name: 'm', label: 'Cận hàm lẻ M (> 0)', min: 3, max: 10 },
      { name: 'c', label: 'Cận trị tuyệt đối c (> 0)', min: 2, max: 6 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { u0, v0, k, m, c } = params;
      if (u0 >= v0 || k < 2 || m <= 0 || c <= 0) return { valid: false, reason: 'Tham số cận không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v0, k, m, c, mode } = params;
      const aTrue = mode !== 2;
      const bTrue = mode !== 3;
      const cTrue = mode === 0 || mode === 2;
      const dTrue = mode === 1 || mode === 3;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\int \\limits_{' + u0 + '}^{' + v0 + '} h(x)\\mathrm{\\,d}x = ' + (aTrue ? '-' : '') + '\\int \\limits_{' + v0 + '}^{' + u0 + '} h(x)\\mathrm{\\,d}x$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: '$\\int \\limits_{' + u0 + '}^{' + v0 + '} h(x)\\mathrm{\\,d}(' + k + 'x) = ' + (bTrue ? k : '\\frac{1}{' + k + '}') + '\\int \\limits_{' + u0 + '}^{' + v0 + '} h(x)\\mathrm{\\,d}x$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Biết $h(x)$ là hàm số lẻ. Khi đó $\\int \\limits_{' + (-m) + '}^{0} h(x)\\mathrm{\\,d}x = ' + (cTrue ? '-' : '') + '\\int \\limits_{0}^{' + m + '} h(x)\\mathrm{\\,d}x$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Biết rằng $h(x) < 0$ với mọi $x \\in [' + (-c) + '; ' + c + ']$. Khi đó $\\int \\limits_{' + (-c) + '}^{' + c + '} |h(x)|\\mathrm{\\,d}x = ' + (dTrue ? '-' : '') + '\\int \\limits_{' + (-c) + '}^{' + c + '} h(x)\\mathrm{\\,d}x$.',
          isTrue: dTrue,
        },
      ];
      return {
        stem: 'Cho hàm số $h(x)$ liên tục trên $\\mathbb{R}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Đổi cận tích phân thì tích phân đổi dấu: $\\int_{' + u0 + '}^{' + v0 + '} h(x)\\mathrm{\\,d}x = -\\int_{' + v0 + '}^{' + u0 + '} h(x)\\mathrm{\\,d}x$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\mathrm{d}(' + k + 'x) = ' + k + '\\mathrm{\\,d}x \\Rightarrow \\int_{' + u0 + '}^{' + v0 + '} h(x)\\mathrm{\\,d}(' + k + 'x) = ' + k + '\\int_{' + u0 + '}^{' + v0 + '} h(x)\\mathrm{\\,d}x$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' Vì $h(x)$ là hàm lẻ nên $\\int_{' + (-m) + '}^{' + m + '} h(x)\\mathrm{\\,d}x = 0 \\Leftrightarrow \\int_{' + (-m) + '}^0 h(x)\\mathrm{\\,d}x = -\\int_0^{' + m + '} h(x)\\mathrm{\\,d}x$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Vì $h(x) < 0$ trên $[' + (-c) + '; ' + c + ']$ nên $|h(x)| = -h(x)$, suy ra $\\int_{' + (-c) + '}^{' + c + '} |h(x)|\\mathrm{\\,d}x = -\\int_{' + (-c) + '}^{' + c + '} h(x)\\mathrm{\\,d}x$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: -7, v0: -8, k: 5, m: 8, c: 2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38 Đ-Đ-Đ-S', params: { u0: -8, v0: -7, k: 5, m: 8, c: 2, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 39 (Q39 - TF): Tích phân tổng quát ∫_a^b (Ax^2 + Bx + C)dx và thay số
  t12_b12_d39_quadratic_bounds_ab_tf: {
    id: 't12_b12_d39_quadratic_bounds_ab_tf',
    name: 'Xét tính đúng sai biểu thức tổng quát của tích phân ∫_a^b (Ax² + Bx + C)dx',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm đa thức cơ bản',
    description: 'Kiểm tra phép tách tuyến tính, biểu thức nguyên hàm F(x)|_a^b, khai triển F(b) - F(a) theo a, b và giá trị cụ thể khi thay a, b.',
    conditionSummary: 'A, B, C khác 0, B chẵn, x0 < 0 là bội của 3',
    paramSpecs: [
      { name: 'A', label: 'Hệ số x²', min: -5, max: 5, allowZero: false },
      { name: 'B2', label: 'Nửa hệ số x (B = 2*B2)', min: -4, max: 4, allowZero: false },
      { name: 'C', label: 'Hằng số C', min: -6, max: 6, allowZero: false },
      { name: 'aVal', label: 'Giá trị thay thế a (bội 3)', min: -6, max: -3, step: 3 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { A, B2, C, aVal } = params;
      if (A === 0 || B2 === 0 || C === 0 || aVal >= 0) return { valid: false, reason: 'Hệ số khác 0 và aVal < 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, B2, C, aVal, mode } = params;
      const B = 2 * B2;
      const fx = u.formatQuadratic(A, B, C);
      const fmtFS = (num, den, sym, isFirst) => {
        const f = u.simplifyFrac(num, den);
        if (f.num === 0) return '';
        const sign = f.num < 0 ? (isFirst ? '-' : ' - ') : (isFirst ? '' : ' + ');
        const an = Math.abs(f.num);
        if (f.den === 1) return sign + (an === 1 && sym ? '' : an) + sym;
        return sign + '\\frac{' + (an === 1 && sym ? '' : an) + sym + '}{' + f.den + '}';
      };
      const buildPolySym = (vName, mult) => {
        const t1 = fmtFS(mult * A, 3, vName + '^3', true);
        const t2 = fmtFS(mult * B2, 1, vName + '^2', false);
        const t3 = fmtFS(mult * C, 1, vName, false);
        return t1 + t2 + t3;
      };
      const antiX = buildPolySym('x', 1);
      const exprBA = buildPolySym('b', 1) + fmtFS(-A, 3, 'a^3', false) + fmtFS(-B2, 1, 'a^2', false) + fmtFS(-C, 1, 'a', false);
      const exprWrong = buildPolySym('a', 1) + fmtFS(A, 3, 'b^3', false) + fmtFS(B2, 1, 'b^2', false) + fmtFS(C, 1, 'b', false);
      // F(0) - F(aVal) = -( (A/3)aVal^3 + B2 aVal^2 + C aVal )
      const valAt0 = -((A * Math.pow(aVal, 3)) / 3 + B2 * aVal * aVal + C * aVal);

      const aTrue = mode === 1;
      const bTrue = mode !== 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 2 || mode === 3;

      const splitTrue = '\\int \\limits_{a}^{b} ' + u.formatTerm(A, 'x^2', true) + '\\mathrm{\\,d}x + \\int \\limits_{a}^{b} ' + u.formatTerm(B, 'x', true) + '\\mathrm{\\,d}x + \\int \\limits_{a}^{b} ' + C + '\\mathrm{\\,d}x';
      const splitWrong = '\\int \\limits_{a}^{b} ' + fmtFS(A, 3, 'x^3', true) + '\\mathrm{\\,d}x - \\int \\limits_{a}^{b} ' + fmtFS(B2, 1, 'x^2', true) + '\\mathrm{\\,d}x + \\int \\limits_{a}^{b} ' + u.formatTerm(C, 'x', true) + '\\mathrm{\\,d}x';

      const tfStatements = [
        { key: 'a', text: '$\\int \\limits_{a}^{b} (' + fx + ')\\mathrm{\\,d}x = ' + (aTrue ? splitTrue : splitWrong) + '$.', isTrue: aTrue },
        { key: 'b', text: '$I = \\left(' + antiX + '\\right)\\Big|_{a}^{b}$.', isTrue: bTrue },
        { key: 'c', text: '$I = ' + (cTrue ? exprBA : exprWrong) + '$.', isTrue: cTrue },
        { key: 'd', text: 'Với $a = ' + aVal + ',\\, b = 0$ thì $I = ' + (dTrue ? valAt0 : -valAt0) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Cho tích phân $I = \\int \\limits_{a}^{b} (' + fx + ')\\mathrm{\\,d}x$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Tách theo tính chất tuyến tính được $' + splitTrue + '$.',
          'b) Đúng. Nguyên hàm của $' + fx + '$ là $F(x) = ' + antiX + '$, suy ra $I = F(x)\\Big|_a^b$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $I = F(b) - F(a) = ' + exprBA + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Với $a = ' + aVal + ',\\, b = 0$: $I = F(0) - F(' + aVal + ') = ' + valAt0 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 0', params: { A: 0, B2: -1, C: -4, aVal: -3, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39 S-Đ-Đ-S', params: { A: -2, B2: -1, C: -4, aVal: -3, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 40 (Q40 - TF): Hệ phương trình tích phân của h(x) và g(x) + cộng đoạn
  t12_b12_d40_integral_system_tf: {
    id: 't12_b12_d40_integral_system_tf',
    name: 'Xét tính đúng sai hệ phương trình tích phân và tính tích phân tổ hợp',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Giải hệ tích phân của h(x) và g(x) trên [x0; x1], tách đoạn [x1; x2] và tính ∫[mx + n - p h(x) - q g(x)]dx.',
    conditionSummary: 'Nghiệm A, B nguyên khác 0 và p1*q2 - p2*q1 ≠ 0',
    paramSpecs: [
      { name: 'A', label: 'Giá trị đúng ∫_{-6}^{-3} h(x)dx', min: -8, max: 8, allowZero: false },
      { name: 'B', label: 'Giá trị đúng ∫_{-6}^{-3} g(x)dx', min: -8, max: 10, allowZero: false },
      { name: 'C', label: 'Giá trị ∫_{-6}^{0} h(x)dx', min: -8, max: 8, allowZero: false },
      { name: 'c1', label: 'Hệ số x ý d', min: -5, max: 5, allowZero: false },
      { name: 'c2', label: 'Hằng số tự do ý d', min: 1, max: 7 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { A, B, C, c1, c2 } = params;
      if (A === 0 || B === 0 || C === 0 || c1 === 0 || c2 <= 0) return { valid: false, reason: 'Các tham số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, B, C, c1, c2, mode } = params;
      // System: -4 h + 5 g = R1, 4 h - g = R2 => det = -16 != 0
      const R1 = -4 * A + 5 * B;
      const R2 = 4 * A - B;
      const midC = C - A; // int_{-3}^0 h(x)dx
      // d) int_{-6}^{-3} (c2 + c1 x - 4h(x) - 5g(x)) dx
      // int_{-6}^{-3} (c1 x + c2) dx = c1*(9 - 36)/2 + 3*c2 = (-27*c1 + 6*c2)/2
      const linNum = -27 * c1 + 6 * c2;
      const trueDFrac = u.simplifyFrac(linNum + 2 * (-4 * A - 5 * B), 2);
      const linFrac = u.simplifyFrac(linNum, 2);

      const aTrue = mode !== 2;
      const bTrue = mode === 1;
      const cTrue = mode === 2 || mode === 3;
      const dTrue = mode !== 3;

      const linExpr = c2 + u.formatTerm(c1, 'x', false);
      const tfStatements = [
        { key: 'a', text: '$\\int \\limits_{-6}^{-3} h(x)\\mathrm{\\,d}x = ' + (aTrue ? A : A + 2) + '$.', isTrue: aTrue },
        { key: 'b', text: '$\\int \\limits_{-6}^{-3} g(x)\\mathrm{\\,d}x = ' + (bTrue ? B : B + 3) + '$.', isTrue: bTrue },
        { key: 'c', text: '$\\int \\limits_{-3}^{0} h(x)\\mathrm{\\,d}x = ' + (cTrue ? midC : midC + 2) + '$.', isTrue: cTrue },
        { key: 'd', text: '$\\int \\limits_{-6}^{-3} \\left[' + linExpr + ' - 4h(x) - 5g(x)\\right]\\mathrm{\\,d}x = ' + (dTrue ? trueDFrac.latex : u.simplifyFrac(trueDFrac.num + 2, trueDFrac.den).latex) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Cho các hàm số $h(x), g(x)$ liên tục trên đoạn $[-6; 0]$ thỏa mãn $\\int \\limits_{-6}^{-3} \\left[-4h(x) + 5g(x)\\right]\\mathrm{\\,d}x = ' + R1 + '$, $\\int \\limits_{-6}^{-3} \\left[4h(x) - g(x)\\right]\\mathrm{\\,d}x = ' + R2 + '$ và $\\int \\limits_{-6}^{0} h(x)\\mathrm{\\,d}x = ' + C + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Cộng hai phương trình hệ: $4\\int_{-6}^{-3} g(x)\\mathrm{\\,d}x = ' + (R1 + R2) + ' \\Rightarrow \\int_{-6}^{-3} g(x)\\mathrm{\\,d}x = ' + B + '$, suy ra $\\int_{-6}^{-3} h(x)\\mathrm{\\,d}x = ' + A + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' Từ giải hệ trên có $\\int_{-6}^{-3} g(x)\\mathrm{\\,d}x = ' + B + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int_{-3}^0 h(x)\\mathrm{\\,d}x = \\int_{-6}^0 h(x)\\mathrm{\\,d}x - \\int_{-6}^{-3} h(x)\\mathrm{\\,d}x = ' + C + ' - (' + A + ') = ' + midC + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\int_{-6}^{-3} (' + linExpr + ')\\mathrm{\\,d}x = ' + linFrac.latex + '$, nên tổng cần tính bằng $' + linFrac.latex + ' - 4(' + A + ') - 5(' + B + ') = ' + trueDFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 0', params: { A: 0, B: 8, C: -5, c1: -3, c2: 5, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40 Đ-S-S-Đ', params: { A: -6, B: 8, C: -5, c1: -3, c2: 5, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 41 (Q41 - TF): F(x) là nguyên hàm của f(x) = ax + b -> F'(x), ∫ f(x)dx, ∫ f'(x)dx
  t12_b12_d41_linear_antideriv_integral_tf: {
    id: 't12_b12_d41_linear_antideriv_integral_tf',
    name: 'Xét tính đúng sai liên hệ nguyên hàm và tích phân của hàm bậc nhất',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Cho F(x) là một nguyên hàm của f(x) = ax + b. Xét F\'(x), ∫ f(x)dx = F(v) - F(u), ∫ f\'(x)dx và ∫ f(x)dx cụ thể.',
    conditionSummary: 'a ≠ 0, b ≠ 0, cận dưới < cận trên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 7, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -6, max: 7, allowZero: false },
      { name: 'u0', label: 'Cận p ý c', min: 1, max: 5 },
      { name: 'v0', label: 'Cận q ý c (> p)', min: 4, max: 11 },
      { name: 'r0', label: 'Cận r ý d', min: -7, max: -2 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, u0, v0, r0 } = params;
      if (a === 0 || b === 0 || u0 >= v0 || r0 >= -1) return { valid: false, reason: 'Tham số cận không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, u0, v0, r0, mode } = params;
      const fx = u.formatLinear(a, b);
      const s0 = r0 + 1;
      const intC = a * (v0 - u0);
      // int_{r0}^{r0+1} (ax + b)dx = (a*(s0^2 - r0^2) + 2*b*(s0 - r0))/2
      const intD = u.simplifyFrac(a * (s0 * s0 - r0 * r0) + 2 * b * (s0 - r0), 2);

      const aTrue = mode !== 1;
      const bTrue = mode !== 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 0 || mode === 3;

      const tfStatements = [
        { key: 'a', text: '$F\'(x) = ' + (aTrue ? fx : u.formatLinear(a, -b)) + '$.', isTrue: aTrue },
        { key: 'b', text: '$\\int \\limits_{3}^{4} (' + fx + ')\\mathrm{\\,d}x = ' + (bTrue ? 'F(4) - F(3)' : 'F(3) - F(4)') + '$.', isTrue: bTrue },
        { key: 'c', text: '$\\int \\limits_{' + u0 + '}^{' + v0 + '} f\'(x)\\mathrm{\\,d}x = ' + (cTrue ? intC : intC + a) + '$.', isTrue: cTrue },
        { key: 'd', text: '$\\int \\limits_{' + r0 + '}^{' + s0 + '} f(x)\\mathrm{\\,d}x = ' + (dTrue ? intD.latex : u.simplifyFrac(-intD.num, intD.den).latex) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Cho $F(x)$ là một nguyên hàm của $f(x) = ' + fx + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' Theo định nghĩa nguyên hàm, $F\'(x) = f(x) = ' + fx + '$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int_{3}^{4} f(x)\\mathrm{\\,d}x = F(4) - F(3)$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int_{' + u0 + '}^{' + v0 + '} f\'(x)\\mathrm{\\,d}x = \\int_{' + u0 + '}^{' + v0 + '} ' + a + '\\mathrm{\\,d}x = ' + intC + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' $\\int_{' + r0 + '}^{' + s0 + '} (' + fx + ')\\mathrm{\\,d}x = ' + intD.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 5, u0: 4, v0: 10, r0: -6, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41 Đ-Đ-Đ-Đ', params: { a: 5, b: 5, u0: 4, v0: 10, r0: -6, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 42 (Q42 - TF): Tích phân hàm mũ và hàm cho bởi hai công thức liên tục trên R
  t12_b12_d42_exp_and_piecewise_cont_tf: {
    id: 't12_b12_d42_exp_and_piecewise_cont_tf',
    name: 'Xét tính đúng sai tích phân hàm mũ và hàm cho bởi hai công thức liên tục trên R',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Đánh giá nguyên hàm b^x, tích phân k e^x, tách hàm trong ∫[f(x)+e^x]dx và tích phân hàm ghép liên tục tại x0.',
    conditionSummary: 'b >= 2, q > e^p, k >= 2, x1 < x0 < x2',
    paramSpecs: [
      { name: 'baseB', label: 'Cơ số b ý a', min: 3, max: 9 },
      { name: 'kB', label: 'Hệ số k ý b', min: -5, max: -2 },
      { name: 'uB', label: 'Cận âm -u ý b', min: 2, max: 5 },
      { name: 'pC', label: 'Cận dưới p ý c', min: 1, max: 2 },
      { name: 'qC', label: 'Tham số q trong ln(q) ý c', min: 4, max: 9 },
      { name: 'aD', label: 'Hằng số a của (a - bx) ý d', min: 1, max: 5 },
      { name: 'bD', label: 'Hệ số b của (a - bx) ý d', min: 2, max: 5 },
      { name: 'kD', label: 'Hệ số mũ k của e^(kx) ý d', min: 2, max: 5 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { baseB, kB, uB, pC, qC, aD, bD, kD } = params;
      if (baseB < 2 || kB === 0 || uB < 1 || qC <= Math.exp(pC) + 0.2) {
        return { valid: false, reason: 'Cần qC > e^pC để cận dưới < cận trên' };
      }
      if (aD <= 0 || bD <= 0 || kD < 2) return { valid: false, reason: 'Tham số ý d không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { baseB, kB, uB, pC, qC, aD, bD, kD, mode } = params;
      // d) x0 = 2, x in [-2, 6]; for x >= 2: aD - bD x; for x < 2: e^(kD x) + m
      // Continuity at x=2: e^(2 kD) + m = aD - 2 bD => m = -e^(2 kD) + (aD - 2 bD)
      const cM = aD - 2 * bD;
      // int_{-2}^2 (e^(kD x) - e^(2kD) + cM)dx = (e^(2kD) - e^(-2kD))/kD - 4 e^(2kD) + 4 cM
      // = (1 - 4*kD)/kD * e^(2kD) + 4*cM - 1/(kD * e^(2kD))
      // int_2^6 (aD - bD x)dx = 4*aD - bD*(36 - 4)/2 = 4*aD - 16*bD
      const ePow = 2 * kD;
      const coeffExp = u.simplifyFrac(1 - 4 * kD, kD);
      const constTotal = 4 * cM + 4 * aD - 16 * bD;
      const invExp = u.simplifyFrac(-1, kD);
      const fmtExpFrac = (f, denExp) => {
        const s = f.num < 0 ? ' - ' : ' + ';
        const an = Math.abs(f.num);
        if (f.den === 1) return s + (an === 1 ? '' : an) + 'e^{' + denExp + '}';
        return s + '\\frac{' + (an === 1 ? '' : an) + 'e^{' + denExp + '}}{' + f.den + '}';
      };
      const leadExp = (coeffExp.num < 0 ? '-' : '') + (coeffExp.den === 1 ? (Math.abs(coeffExp.num) === 1 ? '' : Math.abs(coeffExp.num)) + 'e^{' + ePow + '}' : '\\frac{' + Math.abs(coeffExp.num) + 'e^{' + ePow + '}}{' + coeffExp.den + '}');
      const tailInv = ' - \\frac{1}{' + kD + 'e^{' + ePow + '}}';
      const trueDExpr = leadExp + u.formatTrailingConst(constTotal) + tailInv;
      const wrongDExpr = leadExp + u.formatTrailingConst(constTotal + 8) + tailInv;

      const trueBExpr = kB + (kB < 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(kB) + '}{e^{' + uB + '}}';
      const wrongBExpr = (-kB) + (-kB < 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(kB) + '}{e^{' + uB + '}}';

      const aTrue = mode === 1;
      const bTrue = mode === 2;
      const cTrue = mode !== 2;
      const dTrue = mode !== 3;

      const linD = aD + ' - ' + bD + 'x';
      const tfStatements = [
        { key: 'a', text: '$\\int ' + baseB + '^x\\mathrm{\\,d}x = ' + (aTrue ? '\\dfrac{' + baseB + '^x}{\\ln ' + baseB + '}' : baseB + '^x\\ln ' + baseB) + ' + C$.', isTrue: aTrue },
        { key: 'b', text: '$\\int \\limits_{' + (-uB) + '}^{0} ' + u.formatTerm(kB, 'e^x', true) + '\\mathrm{\\,d}x = ' + (bTrue ? trueBExpr : wrongBExpr) + '$.', isTrue: bTrue },
        { key: 'c', text: 'Biết $\\int \\limits_{' + pC + '}^{\\ln ' + qC + '} \\left[f(x) + e^x\\right]\\mathrm{\\,d}x = ' + qC + '$. Khi đó $\\int \\limits_{' + pC + '}^{\\ln ' + qC + '} f(x)\\mathrm{\\,d}x = ' + (cTrue ? 'e^{' + pC + '}' : qC + ' + e^{' + pC + '}') + '$.', isTrue: cTrue },
        { key: 'd', text: 'Cho hàm số $f(x) = \\begin{cases} ' + linD + ' & \\text{khi } x \\ge 2 \\\\ e^{' + kD + 'x} + m & \\text{khi } x < 2 \\end{cases}$ liên tục trên $\\mathbb{R}$ ($m$ là tham số). Khi đó $\\int \\limits_{-2}^{6} f(x)\\mathrm{\\,d}x = ' + (dTrue ? trueDExpr : wrongDExpr) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\int ' + baseB + '^x\\mathrm{\\,d}x = \\dfrac{' + baseB + '^x}{\\ln ' + baseB + '} + C$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int_{' + (-uB) + '}^0 ' + u.formatTerm(kB, 'e^x', true) + '\\mathrm{\\,d}x = ' + trueBExpr + '$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' $\\int_{' + pC + '}^{\\ln ' + qC + '} f(x)\\mathrm{\\,d}x = ' + qC + ' - (' + qC + ' - e^{' + pC + '}) = e^{' + pC + '}$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Liên tục tại $x = 2 \\Rightarrow m = -e^{' + ePow + '}' + u.formatTrailingConst(cM) + '$. Tách $\\int_{-2}^6 = \\int_{-2}^2 + \\int_2^6$ được $' + trueDExpr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cận qC <= e^pC', params: { baseB: 8, kB: -3, uB: 4, pC: 2, qC: 5, aD: 2, bD: 3, kD: 4, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42 S-S-Đ-Đ', params: { baseB: 8, kB: -3, uB: 4, pC: 2, qC: 8, aD: 2, bD: 3, kD: 4, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 43 (Q43 - TF): Cho f'(x) = k/(ax+b) trên R\{-b/a} và hai điều kiện hai bên tiệm cận
  t12_b12_d43_split_domain_ln_tf: {
    id: 't12_b12_d43_split_domain_ln_tf',
    name: 'Xét tính đúng sai tìm nguyên hàm từng nhánh của f\'(x) = k/(ax + b)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Cho f\'(x) = k/(ax+b) với hai điều kiện f(x1) = y1 và f(x2) = y2 nằm ở hai phía của điểm gián đoạn -b/a.',
    conditionSummary: 'a >= 2, x1 < -b/a < x2, giá trị |ax+b| != 1 và kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a dưới mẫu', min: 3, max: 7 },
      { name: 'b', label: 'Hằng số b dưới mẫu', min: -6, max: -2 },
      { name: 'k', label: 'Tử số k', min: -6, max: -2 },
      { name: 'y2', label: 'Giá trị f(3)', min: 2, max: 7 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, k, y2 } = params;
      if (a < 2 || b >= 0 || k >= 0) return { valid: false, reason: 'Tham số phải hợp lệ' };
      const pole = -b / a; // in (0, 2)
      if (pole <= 0.1 || pole >= 1.9) return { valid: false, reason: 'Tiệm cận -b/a phải nằm trong (0,1; 1,9) để tách (-7, -3) và (2, 3)' };
      const v1 = Math.abs(a * (-3) + b);
      const v2 = Math.abs(a * 3 + b);
      const v3 = Math.abs(a * (-7) + b);
      const v4 = Math.abs(a * 2 + b);
      if (v1 <= 1 || v2 <= 1 || v3 <= 1 || v4 <= 1) return { valid: false, reason: 'Tránh ln 1' };
      // f(x) = (k/a) ln|ax+b| + C_i; f(-3)=0 => f(-7) = (k/a)*(ln v3 - ln v1); f(3)=y2 => f(2) = y2 + (k/a)*(ln v4 - ln v2)
      const val = (k / a) * (Math.log(v3) - Math.log(v1)) + y2 + (k / a) * (Math.log(v4) - Math.log(v2));
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k, y2, mode } = params;
      const lin = u.formatLinear(a, b);
      const poleFrac = u.simplifyFrac(-b, a);
      const coeff = u.simplifyFrac(k, a);
      const absCoeff = u.simplifyFrac(Math.abs(k), a);
      const v1 = Math.abs(a * (-3) + b);
      const v2 = Math.abs(a * 3 + b);
      const v3 = Math.abs(a * (-7) + b);
      const v4 = Math.abs(a * 2 + b);
      const val = (k / a) * (Math.log(v3) - Math.log(v1)) + y2 + (k / a) * (Math.log(v4) - Math.log(v2));
      const valR = Math.round(val * 10) / 10;
      const valWrong = Math.round((valR + 1.3) * 10) / 10;

      const fNeg7True = coeff.latex + '\\ln ' + v3 + ' + ' + absCoeff.latex + '\\ln ' + v1;
      const fNeg7Wrong = k + '\\ln ' + v3 + ' + ' + y2 + ' + ' + Math.abs(k) + '\\ln ' + v2;

      const aTrue = mode !== 2;
      const bTrue = mode !== 3;
      const cTrue = mode === 1;
      const dTrue = mode === 2 || mode === 3;

      const tfStatements = [
        { key: 'a', text: '$\\int ' + (aTrue ? '-\\frac{1}{x}' : '\\frac{1}{x^2}') + '\\mathrm{\\,d}x = -\\ln |x| + C$.', isTrue: aTrue },
        { key: 'b', text: '$\\int f\'(x)\\mathrm{\\,d}x = ' + (bTrue ? coeff.latex : k) + '\\ln |' + lin + '| + C$.', isTrue: bTrue },
        { key: 'c', text: '$f(-7) = ' + (cTrue ? fNeg7True : fNeg7Wrong) + '$.', isTrue: cTrue },
        { key: 'd', text: '$f(-7) + f(2) = ' + u.formatNumberVN(dTrue ? valR : valWrong, 1) + '$.', isTrue: dTrue },
      ];
      return {
        stem: 'Cho hàm số $f(x)$ xác định trên $\\mathbb{R} \\setminus \\left\\{' + poleFrac.latex + '\\right\\}$ thỏa mãn $f\'(x) = \\frac{' + k + '}{' + lin + '},\\, f(-3) = 0,\\, f(3) = ' + y2 + '$. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(', '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng.' : 'Sai.') + ' $\\int -\\frac{1}{x}\\mathrm{\\,d}x = -\\ln|x| + C$.',
          'b) ' + (bTrue ? 'Đúng.' : 'Sai.') + ' $\\int \\frac{' + k + '}{' + lin + '}\\mathrm{\\,d}x = ' + coeff.latex + '\\ln|' + lin + '| + C$.',
          'c) ' + (cTrue ? 'Đúng.' : 'Sai.') + ' Trên $(-\\infty; ' + poleFrac.latex + ')$, từ $f(-3) = 0 \\Rightarrow C_1 = ' + absCoeff.latex + '\\ln ' + v1 + '$, nên $f(-7) = ' + fNeg7True + '$.',
          'd) ' + (dTrue ? 'Đúng.' : 'Sai.') + ' Trên $(' + poleFrac.latex + '; +\\infty)$, $f(3) = ' + y2 + ' \\Rightarrow C_2 = ' + y2 + ' + ' + absCoeff.latex + '\\ln ' + v2 + '$, do đó $f(-7) + f(2) \\approx ' + u.formatNumberVN(valR, 1) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tiệm cận >= 1,9', params: { a: 3, b: -6, k: -5, y2: 5, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43 f\'=-5/(7x-5), Đ-Đ-S-S', params: { a: 7, b: -5, k: -5, y2: 5, mode: 0 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // BÀI 12. TÍCH PHÂN — PHẦN III: 17 DẠNG TRẢ LỜI NGẮN (D44..D60)
  // =====================================================================

  // Dạng 44 (Q44 - SA): Biết f(a) và ∫_a^b f'(x)dx -> tính f(b)
  t12_b12_d44_fb_from_deriv_sa: {
    id: 't12_b12_d44_fb_from_deriv_sa',
    name: 'Tính f(b) khi biết f(a) và tích phân ∫_a^b f\'(x)dx',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Sử dụng định lý Newton - Leibniz cho f\'(x) để tìm f(b) = f(a) + ∫_a^b f\'(x)dx.',
    conditionSummary: 'a < b và giá trị tích phân khác 0',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -8, max: 2 },
      { name: 'b', label: 'Cận trên b (> a)', min: -2, max: 7 },
      { name: 'fa', label: 'Giá trị f(a)', min: -10, max: 18 },
      { name: 'val', label: 'Giá trị ∫ f\'(x)dx', min: -12, max: 15, allowZero: false },
    ],
    validateCode: `
      const { a, b, val } = params;
      if (a >= b || val === 0) return { valid: false, reason: 'Cần a < b và giá trị tích phân khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, fa, val } = params;
      const ans = fa + val;
      return {
        stem: 'Cho hàm số $f(x)$ có đạo hàm trên đoạn $[' + a + '; ' + b + ']$ và $f(' + a + ') = ' + fa + '$. Biết $\\int \\limits_{' + a + '}^{' + b + '} f\'(x)\\mathrm{\\,d}x = ' + val + '$. Tính $f(' + b + ')$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          '$\\int \\limits_{' + a + '}^{' + b + '} f\'(x)\\mathrm{\\,d}x = f(x)\\Big|_{' + a + '}^{' + b + '} = f(' + b + ') - f(' + a + ') = ' + val + '$.',
          'Suy ra $f(' + b + ') = ' + val + ' + f(' + a + ') = ' + val + (fa >= 0 ? ' + ' + fa : ' - ' + Math.abs(fa)) + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 0, b: -5, fa: 14, val: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44 [-5;0], f(-5)=14, ∫=2 -> 16', params: { a: -5, b: 0, fa: 14, val: 2 }, expectedValid: true },
    ],
  },

  // Dạng 45 (Q45 - SA): Biết ∫(Ax^2 + Bx + km)dx = R -> tính ∫(-Ax^2 - Bx + km)dx
  t12_b12_d45_param_m_quad_integral_sa: {
    id: 't12_b12_d45_param_m_quad_integral_sa',
    name: 'Tìm tham số m từ tích phân hàm bậc hai rồi tính tích phân liên quan',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm đa thức cơ bản',
    description: 'Từ ∫_u^v (Ax² + Bx + km)dx = R tìm m, rồi tính ∫_u^v (-Ax² - Bx + km)dx làm tròn đến hàng phần mười.',
    conditionSummary: 'u < v, k > 0, A ≠ 0, kết quả cách ranh giới làm tròn 0,05',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: -3, max: 0 },
      { name: 'v', label: 'Cận trên v (> u)', min: 0, max: 3 },
      { name: 'A', label: 'Hệ số x²', min: -6, max: -2 },
      { name: 'B', label: 'Hệ số x', min: -5, max: 5, allowZero: false },
      { name: 'k', label: 'Hệ số của m', min: 2, max: 5 },
      { name: 'mVal', label: 'Giá trị đúng của m', min: -4, max: 5, allowZero: false },
    ],
    validateCode: `
      const { u0, v, A, B, k, mVal } = params;
      if (u0 >= v || A === 0 || B === 0 || k <= 0 || mVal === 0) return { valid: false, reason: 'Tham số phải hợp lệ' };
      const polyInt = (A * (Math.pow(v, 3) - Math.pow(u0, 3))) / 3 + (B * (v * v - u0 * u0)) / 2;
      const targetVal = -polyInt + k * mVal * (v - u0);
      if (Math.abs(Math.abs(targetVal) * 10 - Math.floor(Math.abs(targetVal) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, A, B, k, mVal } = params;
      const len = v - u0;
      const polyNum = 2 * A * (Math.pow(v, 3) - Math.pow(u0, 3)) + 3 * B * (v * v - u0 * u0);
      const polyFrac = u.simplifyFrac(polyNum, 6);
      const rhsFrac = u.simplifyFrac(polyNum + 6 * k * mVal * len, 6);
      const targetFrac = u.simplifyFrac(-polyNum + 6 * k * mVal * len, 6);
      const rounded = Math.round(targetFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const lhsPoly = u.formatTerm(A, 'x^2', true) + u.formatTerm(B, 'x', false);
      const negPoly = u.formatTerm(-A, 'x^2', true) + u.formatTerm(-B, 'x', false);
      return {
        stem: 'Biết $\\int \\limits_{' + u0 + '}^{' + v + '} (' + lhsPoly + ' + ' + k + 'm)\\mathrm{\\,d}x = ' + rhsFrac.latex + '$. Tính $\\int \\limits_{' + u0 + '}^{' + v + '} (' + negPoly + ' + ' + k + 'm)\\mathrm{\\,d}x$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\int \\limits_{' + u0 + '}^{' + v + '} (' + lhsPoly + ')\\mathrm{\\,d}x + ' + k + 'm \\cdot ' + len + ' = ' + rhsFrac.latex + ' \\Leftrightarrow ' + polyFrac.latex + ' + ' + (k * len) + 'm = ' + rhsFrac.latex + ' \\Rightarrow m = ' + mVal + '$.',
          'Thay $m = ' + mVal + '$ vào tích phân cần tính: $\\int \\limits_{' + u0 + '}^{' + v + '} (' + negPoly + u.formatTrailingConst(k * mVal) + ')\\mathrm{\\,d}x = ' + targetFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 0, v: -2, A: -5, B: -3, k: 3, mVal: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45 [-2;0], m=3 -> 25,3', params: { u0: -2, v: 0, A: -5, B: -3, k: 3, mVal: 3 }, expectedValid: true },
    ],
  },

  // Dạng 46 (Q46 - SA): ∫_u^v (ax^2 + bx + c)/x dx = p + q ln(v/u) -> tính p + q
  t12_b12_d46_quad_over_x_sa: {
    id: 't12_b12_d46_quad_over_x_sa',
    name: 'Tính p + q từ ∫_u^v (ax² + bx + c)/x dx = p + q ln(v/u)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Chia tam thức bậc hai cho x để tính tích phân và giá trị nguyên p + q.',
    conditionSummary: '0 < u < v, a chẵn khác 0, c > 0',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: 2, max: 6 },
      { name: 'v', label: 'Cận trên v (> u)', min: 5, max: 12 },
      { name: 'a2', label: 'Nửa hệ số x² (a = 2*a2)', min: 1, max: 4 },
      { name: 'b', label: 'Hệ số x', min: -6, max: 8, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: 1, max: 10 },
    ],
    validateCode: `
      const { u0, v, a2, b, c } = params;
      if (u0 <= 0 || v <= u0 || a2 <= 0 || b === 0 || c <= 0) return { valid: false, reason: 'Tham số phải hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, a2, b, c } = params;
      const a = 2 * a2;
      const ratio = u.simplifyFrac(v, u0);
      const p = a2 * (v * v - u0 * u0) + b * (v - u0);
      const q = c;
      const ans = p + q;
      const numStr = u.formatQuadratic(a, b, c);
      return {
        stem: 'Biết rằng $\\displaystyle \\int_{' + u0 + '}^{' + v + '} \\dfrac{' + numStr + '}{x}\\mathrm{\\,d}x = p + q\\ln ' + ratio.latex + '$ (với $p, q \\in \\mathbb{Z}$). Tính $p + q$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $\\dfrac{' + numStr + '}{x} = ' + u.formatLinear(a, b) + ' + \\dfrac{' + c + '}{x}$.',
          'Suy ra $\\int_{' + u0 + '}^{' + v + '} \\dfrac{' + numStr + '}{x}\\mathrm{\\,d}x = \\left[' + u.formatTerm(a2, 'x^2', true) + u.formatTerm(b, 'x', false) + '\\right]_{' + u0 + '}^{' + v + '} + ' + c + '\\ln ' + ratio.latex + ' = ' + p + ' + ' + q + '\\ln ' + ratio.latex + '$.',
          'Do đó $p = ' + p + ',\\, q = ' + q + ' \\Rightarrow p + q = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 10, v: 4, a2: 1, b: 6, c: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46 [4;10] (2x²+6x+9)/x -> 129', params: { u0: 4, v: 10, a2: 1, b: 6, c: 9 }, expectedValid: true },
    ],
  },

  // Dạng 47 (Q47 - SA): Tích phân hàm đa thức ghép 2 nhánh tại x = 0
  t12_b12_d47_piecewise_poly_zero_sa: {
    id: 't12_b12_d47_piecewise_poly_zero_sa',
    name: 'Tính tích phân hàm cho bởi hai công thức đa thức tách tại x = 0',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Tách tích phân từ x1 < 0 đến x2 > 0 thành tổng hai tích phân trên [x1; 0] và [0; x2].',
    conditionSummary: 'x1 < 0 < x2, kết quả làm tròn hàng phần mười',
    paramSpecs: [
      { name: 'a1', label: 'Hệ số nhánh x ≤ 0 (a1*x + b1)', min: -4, max: 4, allowZero: false },
      { name: 'b1', label: 'Hằng số nhánh x ≤ 0', min: -4, max: 5 },
      { name: 'a2', label: 'Hệ số x² nhánh x > 0', min: 1, max: 6 },
      { name: 'b2', label: 'Hệ số x nhánh x > 0', min: -5, max: 5, allowZero: false },
      { name: 'c2', label: 'Hằng số nhánh x > 0', min: -3, max: 4 },
      { name: 'x1', label: 'Cận dưới x1 (< 0)', min: -5, max: -1 },
      { name: 'x2', label: 'Cận trên x2 (> 0)', min: 1, max: 4 },
    ],
    validateCode: `
      const { a1, a2, b2, x1, x2 } = params;
      if (a1 === 0 || a2 <= 0 || b2 === 0 || x1 >= 0 || x2 <= 0) {
        return { valid: false, reason: 'Cần x1 < 0 < x2 và các hệ số khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b1, a2, b2, c2, x1, x2 } = params;
      const f1Str = u.formatLinear(a1, b1);
      const f2Str = u.formatQuadratic(a2, b2, c2);
      // int_{x1}^0 (a1 x + b1)dx = -(a1 x1^2 / 2 + b1 x1)
      const i1Frac = u.simplifyFrac(-(a1 * x1 * x1 + 2 * b1 * x1), 2);
      // int_0^{x2} (a2 x^2 + b2 x + c2)dx = (2 a2 x2^3 + 3 b2 x2^2 + 6 c2 x2)/6
      const i2Frac = u.simplifyFrac(2 * a2 * Math.pow(x2, 3) + 3 * b2 * x2 * x2 + 6 * c2 * x2, 6);
      const sumFrac = u.simplifyFrac(i1Frac.num * i2Frac.den + i2Frac.num * i1Frac.den, i1Frac.den * i2Frac.den);
      const rounded = Math.round(sumFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + f1Str + ' & \\text{khi } x \\le 0 \\\\ ' + f2Str + ' & \\text{khi } x > 0 \\end{cases}$. Tính $\\int \\limits_{' + x1 + '}^{' + x2 + '} f(x)\\mathrm{\\,d}x$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$\\int \\limits_{' + x1 + '}^{' + x2 + '} f(x)\\mathrm{\\,d}x = \\int \\limits_{' + x1 + '}^{0} (' + f1Str + ')\\mathrm{\\,d}x + \\int \\limits_{0}^{' + x2 + '} (' + f2Str + ')\\mathrm{\\,d}x$.',
          'Tính từng phần: $I_1 = ' + i1Frac.latex + ',\\, I_2 = ' + i2Frac.latex + '$, suy ra $I = ' + sumFrac.latex + (sumFrac.isInteger ? ' = ' + shortAnswer : ' \\approx ' + shortAnswer) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 >= 0', params: { a1: -1, b1: 1, a2: 5, b2: -4, c2: 1, x1: 0, x2: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47 [-4;3] -> 42,0', params: { a1: -1, b1: 1, a2: 5, b2: -4, c2: 1, x1: -4, x2: 3 }, expectedValid: true },
    ],
  },

  // Dạng 48 (Q48 - SA): Tích phân hàm ghép có 1/x^2 tại x0 âm (x1 < x0 < x2 < 0)
  t12_b12_d48_piecewise_invx2_sa: {
    id: 't12_b12_d48_piecewise_invx2_sa',
    name: 'Tính tích phân hàm cho bởi hai công thức chứa 1/x² tại điểm chia âm',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm phân thức hữu tỉ',
    description: 'Tách tích phân từ x1 đến x2 qua mốc x0 < 0, một nhánh dạng ax + k/x² và một nhánh đa thức bậc hai liên tục.',
    conditionSummary: 'x1 < x0 < x2 < 0, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'k', label: 'Tử số -k/x² (k >= 1)', min: 1, max: 4 },
      { name: 'a2', label: 'Hệ số x² nhánh phải', min: -6, max: -2 },
      { name: 'b2', label: 'Hệ số x nhánh phải', min: 1, max: 6 },
      { name: 'x0', label: 'Mốc chia x0 (< 0)', min: -3, max: -2 },
    ],
    validateCode: `
      const { k, a2, b2, x0 } = params;
      if (k < 1 || a2 >= 0 || b2 <= 0 || x0 >= -1) return { valid: false, reason: 'Tham số không hợp lệ' };
      const x1 = x0 - 1;
      const x2 = x0 + 1; // still < 0
      const c2Val = (x0 - k / (x0 * x0)) - (a2 * x0 * x0 + b2 * x0);
      const i1 = 0.5 * (x0 * x0 - x1 * x1) + k * (1 / x0 - 1 / x1);
      const i2 = (a2 / 3) * (x2 * x2 * x2 - x0 * x0 * x0) + (b2 / 2) * (x2 * x2 - x0 * x0) + c2Val * (x2 - x0);
      const val = i1 + i2;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, a2, b2, x0 } = params;
      const x1 = x0 - 1;
      const x2 = x0 + 1;
      // Branch 1: x - k/x^2; at x0: (x0^3 - k)/x0^2
      // Branch 2: a2 x^2 + b2 x + c2 continuous at x0: c2 = (x0^3 - k - a2 x0^4 - b2 x0^3)/x0^2
      const c2Num = Math.pow(x0, 3) - k - a2 * Math.pow(x0, 4) - b2 * Math.pow(x0, 3);
      const c2Den = x0 * x0;
      const c2Frac = u.simplifyFrac(c2Num, c2Den);
      const c2Str = c2Frac.num === 0 ? '' : (c2Frac.num > 0 ? ' + ' + c2Frac.latex : ' - ' + u.simplifyFrac(-c2Frac.num, c2Frac.den).latex);
      const f1Str = 'x - \\frac{' + k + '}{x^2}';
      const f2Str = u.formatTerm(a2, 'x^2', true) + u.formatTerm(b2, 'x', false) + c2Str;

      // Exact i1 = (x0^2 - x1^2)/2 + k*(x1 - x0)/(x0*x1)
      const i1Frac = u.simplifyFrac((x0 * x0 - x1 * x1) * x0 * x1 + 2 * k * (x1 - x0), 2 * x0 * x1);
      // Exact i2 = (2*a2*(x2^3 - x0^3) + 3*b2*(x2^2 - x0^2))/6 + c2*(x2 - x0)
      const polyPart = u.simplifyFrac(2 * a2 * (Math.pow(x2, 3) - Math.pow(x0, 3)) + 3 * b2 * (x2 * x2 - x0 * x0), 6);
      const cPart = u.simplifyFrac(c2Frac.num * (x2 - x0), c2Frac.den);
      const i2Frac = u.simplifyFrac(polyPart.num * cPart.den + cPart.num * polyPart.den, polyPart.den * cPart.den);
      const totalFrac = u.simplifyFrac(i1Frac.num * i2Frac.den + i2Frac.num * i1Frac.den, i1Frac.den * i2Frac.den);
      const rounded = Math.round(totalFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + f1Str + ' & \\text{khi } x \\le ' + x0 + ' \\\\ ' + f2Str + ' & \\text{khi } x > ' + x0 + ' \\end{cases}$. Tính $\\int \\limits_{' + x1 + '}^{' + x2 + '} f(x)\\mathrm{\\,d}x$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$\\int \\limits_{' + x1 + '}^{' + x2 + '} f(x)\\mathrm{\\,d}x = \\int \\limits_{' + x1 + '}^{' + x0 + '} \\left(' + f1Str + '\\right)\\mathrm{\\,d}x + \\int \\limits_{' + x0 + '}^{' + x2 + '} \\left(' + f2Str + '\\right)\\mathrm{\\,d}x$.',
          'Tính được $I_1 = ' + i1Frac.latex + ',\\, I_2 = ' + i2Frac.latex + '$, suy ra $I = ' + totalFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 >= -1 (chạm 0)', params: { k: 1, a2: -5, b2: 4, x0: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48 [-4;-2] chia tại -3 -> 8,6', params: { k: 1, a2: -5, b2: 4, x0: -3 }, expectedValid: true },
    ],
  },

  // Dạng 49 (Q49 - SA): Hàm ghép chứa tham số m liên tục trên R -> tìm m rồi tính tích phân
  t12_b12_d49_piecewise_find_m_sa: {
    id: 't12_b12_d49_piecewise_find_m_sa',
    name: 'Tìm tham số m để hàm ghép liên tục trên ℝ rồi tính tích phân',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Dùng điều kiện liên tục tại x0 để tìm m, sau đó tách cận tính tích phân trên [x1; x2].',
    conditionSummary: 'x1 < x0 < x2, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'a1', label: 'Hệ số bậc nhất nhánh 1', min: -5, max: -1 },
      { name: 'b1', label: 'Hằng số nhánh 1', min: 1, max: 6 },
      { name: 'a2', label: 'Hệ số x² nhánh 2', min: -4, max: -1 },
      { name: 'b2', label: 'Hệ số x nhánh 2', min: -4, max: 4, allowZero: false },
      { name: 'x0', label: 'Điểm chia x0', min: -3, max: -1 },
    ],
    validateCode: `
      const { a1, b1, a2, b2, x0 } = params;
      if (a1 >= 0 || a2 >= 0 || b2 === 0 || x0 >= 0) return { valid: false, reason: 'Tham số không hợp lệ' };
      const x1 = x0 - 4;
      const x2 = x0 + 2;
      const mVal = (a1 * x0 + b1) - (a2 * x0 * x0 + b2 * x0);
      const i1 = 0.5 * a1 * (x0 * x0 - x1 * x1) + b1 * (x0 - x1);
      const i2 = (a2 / 3) * (x2 * x2 * x2 - x0 * x0 * x0) + 0.5 * b2 * (x2 * x2 - x0 * x0) + mVal * (x2 - x0);
      const val = i1 + i2;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b1, a2, b2, x0 } = params;
      const x1 = x0 - 4;
      const x2 = x0 + 2;
      const mVal = (a1 * x0 + b1) - (a2 * x0 * x0 + b2 * x0);
      const f1Str = u.formatLinear(a1, b1);
      const f2Head = u.formatTerm(a2, 'x^2', true) + u.formatTerm(b2, 'x', false);
      const i1Frac = u.simplifyFrac(a1 * (x0 * x0 - x1 * x1) + 2 * b1 * (x0 - x1), 2);
      const i2Frac = u.simplifyFrac(2 * a2 * (Math.pow(x2, 3) - Math.pow(x0, 3)) + 3 * b2 * (x2 * x2 - x0 * x0) + 6 * mVal * (x2 - x0), 6);
      const totalFrac = u.simplifyFrac(i1Frac.num * i2Frac.den + i2Frac.num * i1Frac.den, i1Frac.den * i2Frac.den);
      const rounded = Math.round(totalFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + f1Str + ' & \\text{khi } x \\le ' + x0 + ' \\\\ ' + f2Head + ' + m & \\text{khi } x > ' + x0 + ' \\end{cases}$. Biết rằng hàm số $f(x)$ liên tục trên $\\mathbb{R}$. Tính $\\int \\limits_{' + x1 + '}^{' + x2 + '} f(x)\\mathrm{\\,d}x$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Hàm số liên tục tại $x_0 = ' + x0 + ' \\Leftrightarrow ' + (a1 * x0 + b1) + ' = ' + (a2 * x0 * x0 + b2 * x0) + ' + m \\Leftrightarrow m = ' + mVal + '$.',
          'Tách tích phân: $I = \\int_{' + x1 + '}^{' + x0 + '} (' + f1Str + ')\\mathrm{\\,d}x + \\int_{' + x0 + '}^{' + x2 + '} (' + f2Head + u.formatTrailingConst(mVal) + ')\\mathrm{\\,d}x = ' + i1Frac.latex + (i2Frac.num >= 0 ? ' + ' + i2Frac.latex : ' - ' + u.simplifyFrac(-i2Frac.num, i2Frac.den).latex) + ' = ' + totalFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 >= 0', params: { a1: -3, b1: 2, a2: -2, b2: -2, x0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49 [-6;0] chia tại -2 -> 78,7', params: { a1: -3, b1: 2, a2: -2, b2: -2, x0: -2 }, expectedValid: true },
    ],
  },

  // Dạng 50 (Q50 - SA): Hàm ghép có đạo hàm tại x0 -> tìm a, b rồi tính (1/d) ∫ f(x)dx
  t12_b12_d50_piecewise_diff_ab_sa: {
    id: 't12_b12_d50_piecewise_diff_ab_sa',
    name: 'Tìm hai tham số a, b để hàm ghép có đạo hàm tại x₀ rồi tính tích phân',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Định nghĩa và tính chất tích phân',
    description: 'Từ điều kiện khả vi tại x0 (liên tục và đạo hàm trái bằng đạo hàm phải) tìm a, b và tính (1/d) ∫_{x1}^{x2} f(x)dx.',
    conditionSummary: 'x1 < x0 < x2, d >= 10, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'c1', label: 'Hệ số x² nhánh trái', min: 1, max: 4 },
      { name: 'p2', label: 'Hệ số x³ nhánh phải', min: -3, max: -1 },
      { name: 'q2', label: 'Hệ số x² nhánh phải', min: 1, max: 4 },
      { name: 'r2', label: 'Hệ số x nhánh phải', min: 20, max: 35 },
      { name: 's2', label: 'Hằng số nhánh phải', min: -8, max: 2 },
      { name: 'x0', label: 'Điểm khả vi x0', min: 1, max: 3 },
      { name: 'd', label: 'Số chia d', min: 10, max: 25 },
    ],
    validateCode: `
      const { c1, p2, q2, r2, x0, d } = params;
      if (c1 <= 0 || p2 >= 0 || x0 <= 0 || d < 5) return { valid: false, reason: 'Tham số không hợp lệ' };
      const x1 = x0 - 4;
      const x2 = x0 + 2;
      const aVal = 3 * p2 * x0 * x0 + 2 * q2 * x0 + r2 - 2 * c1 * x0;
      const bVal = p2 * Math.pow(x0, 3) + q2 * x0 * x0 + r2 * x0 + params.s2 - c1 * x0 * x0 - aVal * x0;
      const i1 = (c1 / 3) * (Math.pow(x0, 3) - Math.pow(x1, 3)) + 0.5 * aVal * (x0 * x0 - x1 * x1) + bVal * (x0 - x1);
      const i2 = 0.25 * p2 * (Math.pow(x2, 4) - Math.pow(x0, 4)) + (q2 / 3) * (Math.pow(x2, 3) - Math.pow(x0, 3)) + 0.5 * r2 * (x2 * x2 - x0 * x0) + params.s2 * (x2 - x0);
      const val = (i1 + i2) / d;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c1, p2, q2, r2, s2, x0, d } = params;
      const x1 = x0 - 4;
      const x2 = x0 + 2;
      const derivRightAtX0 = 3 * p2 * x0 * x0 + 2 * q2 * x0 + r2;
      const aVal = derivRightAtX0 - 2 * c1 * x0;
      const rightAtX0 = p2 * Math.pow(x0, 3) + q2 * x0 * x0 + r2 * x0 + s2;
      const bVal = rightAtX0 - c1 * x0 * x0 - aVal * x0;

      const f1Poly = u.formatQuadratic(c1, aVal, bVal);
      const f2Poly = u.formatPoly([p2, q2, r2, s2]);
      const i1Frac = u.simplifyFrac(2 * c1 * (Math.pow(x0, 3) - Math.pow(x1, 3)) + 3 * aVal * (x0 * x0 - x1 * x1) + 6 * bVal * (x0 - x1), 6);
      const i2Frac = u.simplifyFrac(3 * p2 * (Math.pow(x2, 4) - Math.pow(x0, 4)) + 4 * q2 * (Math.pow(x2, 3) - Math.pow(x0, 3)) + 6 * r2 * (x2 * x2 - x0 * x0) + 12 * s2 * (x2 - x0), 12);
      const sumFrac = u.simplifyFrac(i1Frac.num * i2Frac.den + i2Frac.num * i1Frac.den, i1Frac.den * i2Frac.den);
      const ratioFrac = u.simplifyFrac(sumFrac.num, sumFrac.den * d);
      const rounded = Math.round(ratioFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Cho hàm số $f(x) = \\begin{cases} ' + u.formatTerm(c1, 'x^2', true) + ' + ax + b & \\text{khi } x \\le ' + x0 + ' \\\\ ' + f2Poly + ' & \\text{khi } x > ' + x0 + ' \\end{cases}$. Biết rằng hàm số $f(x)$ có đạo hàm tại điểm $x = ' + x0 + '$. Tính $\\frac{1}{' + d + '}\\int \\limits_{' + x1 + '}^{' + x2 + '} f(x)\\mathrm{\\,d}x$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Hàm số có đạo hàm tại $x = ' + x0 + '$ nên liên tục và $f\'_-(' + x0 + ') = f\'_+(' + x0 + ') \\Leftrightarrow ' + (2 * c1 * x0) + ' + a = ' + derivRightAtX0 + ' \\Rightarrow a = ' + aVal + '$.',
          'Từ điều kiện liên tục tại $x = ' + x0 + '$ suy ra $' + (c1 * x0 * x0 + aVal * x0) + ' + b = ' + rightAtX0 + ' \\Rightarrow b = ' + bVal + '$.',
          'Suy ra $\\int_{' + x1 + '}^{' + x2 + '} f(x)\\mathrm{\\,d}x = ' + i1Frac.latex + (i2Frac.num >= 0 ? ' + ' + i2Frac.latex : ' - ' + u.simplifyFrac(-i2Frac.num, i2Frac.den).latex) + ' = ' + sumFrac.latex + '$, nên $\\frac{1}{' + d + '}\\int_{' + x1 + '}^{' + x2 + '} f(x)\\mathrm{\\,d}x = ' + ratioFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1 = 0', params: { c1: 0, p2: -2, q2: 2, r2: 29, s2: -5, x0: 2, d: 20 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50 x0=2, a=1, b=31 -> 11,1', params: { c1: 3, p2: -2, q2: 2, r2: 29, s2: -5, x0: 2, d: 20 }, expectedValid: true },
    ],
  },

  // Dạng 51 (Q51 - SA): Đồng nhất hệ số F(x) = (ax^2 + bx + c)e^x
  t12_b12_d51_undetermined_quad_exp_sa: {
    id: 't12_b12_d51_undetermined_quad_exp_sa',
    name: 'Đồng nhất hệ số nguyên hàm dạng F(x) = (ax² + bx + c)e^x',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Tính F\'(x) = (ax² + (2a+b)x + b + c)e^x rồi đồng nhất với (px² + qx + r)e^x để tìm a, b, c và tính biểu thức tuyến tính.',
    conditionSummary: 'a, b, c nguyên khác 0',
    paramSpecs: [
      { name: 'aVal', label: 'Giá trị đúng a', min: -4, max: 4, allowZero: false },
      { name: 'bVal', label: 'Giá trị đúng b', min: -5, max: 6, allowZero: false },
      { name: 'cVal', label: 'Giá trị đúng c', min: -8, max: 6, allowZero: false },
      { name: 'k1', label: 'Hệ số của a', min: -4, max: 4, allowZero: false },
      { name: 'k2', label: 'Hệ số của b', min: -4, max: 4, allowZero: false },
      { name: 'k3', label: 'Hệ số của c', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { aVal, bVal, cVal, k1, k2, k3 } = params;
      if (aVal === 0 || bVal === 0 || cVal === 0 || k1 === 0 || k2 === 0 || k3 === 0) {
        return { valid: false, reason: 'Các hệ số phải khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aVal, bVal, cVal, k1, k2, k3 } = params;
      const p = aVal;
      const q = 2 * aVal + bVal;
      const r = bVal + cVal;
      const ans = k1 * aVal + k2 * bVal + k3 * cVal;
      const fPoly = u.formatQuadratic(p, q, r);
      const queryExpr = u.formatTerm(k1, 'a', true) + u.formatTerm(k2, 'b', false) + u.formatTerm(k3, 'c', false);
      return {
        stem: 'Biết $F(x) = (ax^2 + bx + c)e^x$ với $a, b, c \\in \\mathbb{R}$ là một nguyên hàm của hàm số $f(x) = (' + fPoly + ')e^x$. Tính $' + queryExpr + '$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Ta có $F\'(x) = (ax^2 + (2a + b)x + b + c)\\mathrm{e}^x$.',
          'Đồng nhất hệ số với $f(x)$: $a = ' + p + ',\\, 2a + b = ' + q + ' \\Rightarrow b = ' + bVal + ',\\, b + c = ' + r + ' \\Rightarrow c = ' + cVal + '$.',
          'Vậy $' + queryExpr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên aVal = 0', params: { aVal: 0, bVal: 4, cVal: -7, k1: -3, k2: -3, k3: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q51 a=-1, b=4, c=-7, -3a-3b-2c = 5', params: { aVal: -1, bVal: 4, cVal: -7, k1: -3, k2: -3, k3: -2 }, expectedValid: true },
    ],
  },

  // Dạng 52 (Q52 - SA): ∫_u^v (e^{kx} + ax^3 + bx^2 + cx + d)dx = (1/A)(e^{kv} - e^B) + C -> tính (A + B + C)/D
  t12_b12_d52_exp_plus_cubic_ratio_sa: {
    id: 't12_b12_d52_exp_plus_cubic_ratio_sa',
    name: 'Tính biểu thức (A + B + C)/D từ tích phân hỗn hợp mũ và đa thức bậc ba',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Tính ∫_u^v (e^{kx} + c3 x^3 + c2 x^2 + c1 x + c0)dx = (1/a)(e^{kv} - e^b) + c và tính (a + b + c)/d.',
    conditionSummary: '0 < u < v, k >= 2, d >= 3, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: 1, max: 3 },
      { name: 'v', label: 'Cận trên v (> u)', min: 3, max: 6 },
      { name: 'k', label: 'Hệ số mũ k', min: 2, max: 4 },
      { name: 'c3', label: 'Hệ số x³', min: 1, max: 3 },
      { name: 'c2', label: 'Hệ số x²', min: 1, max: 4 },
      { name: 'c1', label: 'Hệ số x', min: -3, max: 3, allowZero: false },
      { name: 'c0', label: 'Hằng số tự do', min: 1, max: 5 },
      { name: 'd', label: 'Số chia d', min: 4, max: 11 },
    ],
    validateCode: `
      const { u0, v, k, c3, c2, c1, c0, d } = params;
      if (u0 <= 0 || u0 >= v || k < 2 || c3 <= 0 || c2 <= 0 || c1 === 0 || c0 <= 0 || d < 3) {
        return { valid: false, reason: 'Tham số không hợp lệ' };
      }
      const cPoly = (3 * c3 * (Math.pow(v, 4) - Math.pow(u0, 4)) + 4 * c2 * (Math.pow(v, 3) - Math.pow(u0, 3)) + 6 * c1 * (v * v - u0 * u0) + 12 * c0 * (v - u0)) / 12;
      const val = (k + k * u0 + cPoly) / d;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, k, c3, c2, c1, c0, d } = params;
      const a = k;
      const b = k * u0;
      const kv = k * v;
      const polyStr = u.formatPoly([c3, c2, c1, c0]);
      const cNum = 3 * c3 * (Math.pow(v, 4) - Math.pow(u0, 4)) + 4 * c2 * (Math.pow(v, 3) - Math.pow(u0, 3)) + 6 * c1 * (v * v - u0 * u0) + 12 * c0 * (v - u0);
      const cFrac = u.simplifyFrac(cNum, 12);
      const totalNum = (a + b) * cFrac.den + cFrac.num;
      const ratioFrac = u.simplifyFrac(totalNum, cFrac.den * d);
      const rounded = Math.round(ratioFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} (e^{' + k + 'x} + ' + polyStr + ')\\mathrm{\\,d}x = \\dfrac{1}{a}(e^{' + kv + '} - e^b) + c$ (với $a, b \\in \\mathbb{Z}, c \\in \\mathbb{Q}$). Tính $\\dfrac{a + b + c}{' + d + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tách phần mũ $\\int_{' + u0 + '}^{' + v + '} e^{' + k + 'x}\\mathrm{\\,d}x = \\frac{1}{' + k + '}(e^{' + kv + '} - e^{' + b + '}) \\Rightarrow a = ' + a + ',\\, b = ' + b + '$.',
          'Tính phần đa thức được $c = ' + cFrac.latex + '$, do đó $\\dfrac{a + b + c}{' + d + '} = ' + ratioFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 6, v: 2, k: 2, c3: 1, c2: 2, c1: -1, c0: 1, d: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q52 [2;6], k=2 -> 64,7', params: { u0: 2, v: 6, k: 2, c3: 1, c2: 2, c1: -1, c0: 1, d: 7 }, expectedValid: true },
    ],
  },

  // Dạng 53 (Q53 - SA): ∫_u^v e^{kx + m} dx = a(e^b - e^c) -> tính a + b - c
  t12_b12_d53_exp_shift_param_sa: {
    id: 't12_b12_d53_exp_shift_param_sa',
    name: 'Tính biểu thức a + b - c từ tích phân ∫_u^v e^(kx + m)dx = a(e^b - e^c)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm số mũ',
    description: 'Tính ∫_u^v e^(kx+m)dx = (1/k)(e^(kv+m) - e^(ku+m)) để xác định a, b, c và tính a + b - c.',
    conditionSummary: 'u < v, k >= 2, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: 1, max: 5 },
      { name: 'v', label: 'Cận trên v (> u)', min: 3, max: 9 },
      { name: 'k', label: 'Hệ số k (>= 2)', min: 2, max: 7 },
      { name: 'm', label: 'Hằng số dịch m', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { u0, v, k, m } = params;
      if (u0 >= v || k < 2 || m === 0) return { valid: false, reason: 'Cần u < v, k >= 2 và m ≠ 0' };
      const val = 1 / k + k * (v - u0);
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, k, m } = params;
      const b = k * v + m;
      const c = k * u0 + m;
      const linExp = u.formatLinear(k, m);
      const ansFrac = u.simplifyFrac(1 + k * (b - c), k);
      const rounded = Math.round(ansFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết $\\int \\limits_{' + u0 + '}^{' + v + '} e^{' + linExp + '}\\mathrm{\\,d}x = a(e^b - e^c)$ (với $a \\in \\mathbb{Q}, b, c \\in \\mathbb{Z}$). Tính $a + b - c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$\\int \\limits_{' + u0 + '}^{' + v + '} e^{' + linExp + '}\\mathrm{\\,d}x = \\frac{1}{' + k + '}e^{' + linExp + '}\\Big|_{' + u0 + '}^{' + v + '} = \\frac{1}{' + k + '}(e^{' + b + '} - e^{' + c + '})$.',
          'Suy ra $a = \\frac{1}{' + k + '},\\, b = ' + b + ',\\, c = ' + c + '$, do đó $a + b - c = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 7, v: 4, k: 6, m: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q53 [4;7] e^(6x-4) -> 18,2', params: { u0: 4, v: 7, k: 6, m: -4 }, expectedValid: true },
    ],
  },

  // Dạng 54 (Q54 - SA): Bài toán thực tế chi phí cận biên C'(x) -> tính tổng chi phí C(x1)
  t12_b12_d54_marginal_cost_sa: {
    id: 't12_b12_d54_marginal_cost_sa',
    name: 'Bài toán thực tế: Tính tổng chi phí sản xuất từ hàm chi phí cận biên C\'(x)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế của tích phân',
    description: 'Cho chi phí cận biên C\'(x) = c0 - c1 x + c2 x² và chi phí cố định C(0), tính C(x1) = C(0) + ∫_0^{x1} C\'(x)dx làm tròn đến hàng đơn vị.',
    conditionSummary: '0 < x1 <= xMax, kết quả cách ranh giới làm tròn hàng đơn vị 0,05',
    paramSpecs: [
      { name: 'c0', label: 'Chi phí ban đầu c0 (triệu/tấn)', min: 6, max: 14 },
      { name: 'c1Hundred', label: 'Hệ số x (× 0,01)', min: 2, max: 6 },
      { name: 'c2HundredK', label: 'Hệ số x² (× 0,00001)', min: 20, max: 40 },
      { name: 'fixedCost', label: 'Chi phí cố định C(0) (triệu)', min: 25, max: 65, step: 5 },
      { name: 'x1', label: 'Sản lượng x1 (tấn)', min: 60, max: 110, step: 5 },
    ],
    validateCode: `
      const { c0, c1Hundred, c2HundredK, fixedCost, x1 } = params;
      const c1 = c1Hundred * 0.01;
      const c2 = c2HundredK * 0.00001;
      const deltaC = c0 * x1 - 0.5 * c1 * x1 * x1 + (c2 / 3) * Math.pow(x1, 3);
      const val = fixedCost + deltaC;
      if (Math.abs(val - Math.floor(val) - 0.5) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, c1Hundred, c2HundredK, fixedCost, x1 } = params;
      const c1 = c1Hundred * 0.01;
      const c2 = c2HundredK * 0.00001;
      const xMax = x1 + 7;
      const deltaC = c0 * x1 - 0.5 * c1 * x1 * x1 + (c2 / 3) * Math.pow(x1, 3);
      const total = fixedCost + deltaC;
      const rounded = Math.round(total);
      const c1Str = u.formatNumberVN(c1, 2);
      const c2Str = (c2).toFixed(5).replace('.', ',');
      const deltaStr = u.formatNumberVN(deltaC, 2);
      return {
        stem: 'Tại một nhà máy, gọi $C(x)$ là tổng chi phí (tính theo triệu đồng) để sản xuất $x$ tấn sản phẩm Z trong một tháng. Đạo hàm $C\'(x)$, gọi là chi phí cận biên, cho biết tốc độ tăng tổng chi phí theo lượng sản phẩm được sản xuất. Giả sử chi phí cận biên (tính theo triệu đồng trên tấn) được ước lượng bởi công thức $C\'(x) = ' + c0 + ' - ' + c1Str + 'x + ' + c2Str + 'x^2$ với $0 \\le x \\le ' + xMax + '$. Biết rằng chi phí cố định $C(0) = ' + fixedCost + '$ triệu đồng. Tính tổng chi phí khi nhà máy sản xuất $' + x1 + '$ tấn sản phẩm Z trong tháng (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: String(rounded),
        numericValue: rounded,
        answerSummary: String(rounded) + ' triệu đồng',
        solutionSteps: [
          'Ta có $C(' + x1 + ') - C(0) = \\int \\limits_{0}^{' + x1 + '} C\'(x)\\mathrm{\\,d}x = \\int \\limits_{0}^{' + x1 + '} \\left(' + c0 + ' - ' + c1Str + 'x + ' + c2Str + 'x^2\\right)\\mathrm{\\,d}x \\approx ' + deltaStr + '$.',
          'Suy ra $C(' + x1 + ') \\approx ' + fixedCost + ' + ' + deltaStr + ' \\approx ' + rounded + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Mẫu chuẩn Q54 C(95) = 702', params: { c0: 8, c1Hundred: 4, c2HundredK: 29, fixedCost: 40, x1: 95 }, expectedValid: true },
      { label: 'Sản lượng biên thấp x1 = 60', params: { c0: 10, c1Hundred: 3, c2HundredK: 25, fixedCost: 30, x1: 60 }, expectedValid: true },
    ],
  },

  // Dạng 55 (Q55 - SA): Tìm tham số m trong tích phân ∫ [m P(x) + Q(x)]dx = K
  t12_b12_d55_linear_param_m_poly_sa: {
    id: 't12_b12_d55_linear_param_m_poly_sa',
    name: 'Tìm tham số m thỏa mãn phương trình tích phân ∫ [m·P(x) + Q(x)]dx = K',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tích phân hàm đa thức cơ bản',
    description: 'Tách tích phân thành m ∫ P(x)dx + ∫ Q(x)dx = K để giải tìm m làm tròn đến hàng phần mười.',
    conditionSummary: '∫ P(x)dx ≠ 0, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'u0', label: 'Cận dưới u', min: 1, max: 3 },
      { name: 'v', label: 'Cận trên v (> u)', min: 4, max: 7 },
      { name: 'aP', label: 'Hệ số x² trong P(x)', min: 2, max: 6 },
      { name: 'bP', label: 'Hệ số x trong P(x)', min: -4, max: 4, allowZero: false },
      { name: 'cP', label: 'Hằng số trong P(x)', min: -3, max: 3, allowZero: false },
      { name: 'aQ', label: 'Hệ số x³ trong Q(x)', min: 1, max: 4 },
      { name: 'bQ', label: 'Hệ số x² trong Q(x)', min: 2, max: 6 },
      { name: 'K', label: 'Vế phải K', min: 2, max: 12 },
    ],
    validateCode: `
      const { u0, v, aP, bP, cP, aQ, bQ, K } = params;
      if (u0 >= v || aP <= 0 || bP === 0 || cP === 0 || aQ <= 0 || bQ <= 0) return { valid: false, reason: 'Tham số không hợp lệ' };
      const intP = (aP / 3) * (Math.pow(v, 3) - Math.pow(u0, 3)) + 0.5 * bP * (v * v - u0 * u0) + cP * (v - u0);
      if (Math.abs(intP) < 1) return { valid: false, reason: 'Hệ số của m quá nhỏ' };
      const intQ = 0.25 * aQ * (Math.pow(v, 4) - Math.pow(u0, 4)) + (bQ / 3) * (Math.pow(v, 3) - Math.pow(u0, 3)) - (v - u0);
      const val = (K - intQ) / intP;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u0, v, aP, bP, cP, aQ, bQ, K } = params;
      const Pstr = u.formatQuadratic(aP, bP, cP);
      const Qstr = u.formatPoly([aQ, bQ, 0, -1]);
      const intPFrac = u.simplifyFrac(2 * aP * (Math.pow(v, 3) - Math.pow(u0, 3)) + 3 * bP * (v * v - u0 * u0) + 6 * cP * (v - u0), 6);
      const intQFrac = u.simplifyFrac(3 * aQ * (Math.pow(v, 4) - Math.pow(u0, 4)) + 4 * bQ * (Math.pow(v, 3) - Math.pow(u0, 3)) - 12 * (v - u0), 12);
      // m = (K - intQ) / intP
      const diffNum = K * intQFrac.den - intQFrac.num;
      const mFrac = u.simplifyFrac(diffNum * intPFrac.den, intQFrac.den * intPFrac.num);
      const rounded = Math.round(mFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Biết tích phân $\\int \\limits_{' + u0 + '}^{' + v + '} \\left[m(' + Pstr + ') + ' + Qstr + '\\right]\\mathrm{\\,d}x = ' + K + '$. Giá trị của $m$ bằng bao nhiêu? (Kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tách thành $m \\int_{' + u0 + '}^{' + v + '} (' + Pstr + ')\\mathrm{\\,d}x + \\int_{' + u0 + '}^{' + v + '} (' + Qstr + ')\\mathrm{\\,d}x = ' + K + '$.',
          'Tính được $m \\cdot ' + intPFrac.latex + (intQFrac.num >= 0 ? ' + ' + intQFrac.latex : ' - ' + u.simplifyFrac(-intQFrac.num, intQFrac.den).latex) + ' = ' + K + ' \\Rightarrow m = ' + mFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u >= v', params: { u0: 6, v: 2, aP: 5, bP: -2, cP: -1, aQ: 3, bQ: 5, K: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q55 [2;6], K=6 -> m = -4,2', params: { u0: 2, v: 6, aP: 5, bP: -2, cP: -1, aQ: 3, bQ: 5, K: 6 }, expectedValid: true },
    ],
  },

  // Dạng 56 (Q56 - SA): ∫_{pi/6}^{3pi/4} (k cot^2 x + c)dx = aπ + b√3 + c0 -> tính a + b + c0
  t12_b12_d56_cot2_const_integral_sa: {
    id: 't12_b12_d56_cot2_const_integral_sa',
    name: 'Tính a + b + c từ tích phân ∫_{π/6}^{3π/4} (k cot²x + c)dx = aπ + b√3 + c₀',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Biến đổi cot²x = 1/sin²x - 1 để tính ∫_{π/6}^{3π/4} (k cot²x + c)dx và tính tổng các hệ số a + b + c0.',
    conditionSummary: 'k ≠ 0, c ≠ k, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'k', label: 'Hệ số cot²x', min: 1, max: 7 },
      { name: 'c', label: 'Hằng số c', min: 2, max: 12 },
    ],
    validateCode: `
      const { k, c } = params;
      if (k <= 0 || c === k) return { valid: false, reason: 'Tham số phải hợp lệ' };
      const val = ((c - k) * 7) / 12 + 2 * k;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, c } = params;
      // int (k/sin^2 x + c - k) dx = [(c-k)x - k cot x]_{pi/6}^{3pi/4}
      // At 3pi/4: (c-k)*(3pi/4) + k; at pi/6: (c-k)*(pi/6) - k sqrt(3)
      // Diff = (7/12)*(c-k)*pi + k*sqrt(3) + k => a = 7(c-k)/12, b = k, c0 = k
      const mLin = c - k;
      const aFrac = u.simplifyFrac(7 * mLin, 12);
      const sumFrac = u.simplifyFrac(7 * mLin + 24 * k, 12);
      const rounded = Math.round(sumFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const integrand = u.formatTerm(k, '\\cot^2 x', true) + u.formatTerm(c, '', false);
      const anti = u.formatTerm(mLin, 'x', true) + u.formatTerm(-k, '\\cot x', false);
      return {
        stem: 'Biết $\\int \\limits_{\\frac{\\pi}{6}}^{\\frac{3\\pi}{4}} (' + integrand + ')\\mathrm{\\,d}x = a\\pi + b\\sqrt{3} + c_0$ (với $a, b, c_0 \\in \\mathbb{Q}$). Tính $a + b + c_0$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Sử dụng $\\cot^2 x = \\frac{1}{\\sin^2 x} - 1$: $\\int \\limits_{\\frac{\\pi}{6}}^{\\frac{3\\pi}{4}} (' + integrand + ')\\mathrm{\\,d}x = \\left[' + anti + '\\right]_{\\frac{\\pi}{6}}^{\\frac{3\\pi}{4}} = ' + aFrac.latex + '\\pi + ' + k + '\\sqrt{3} + ' + k + '$.',
          'Suy ra $a = ' + aFrac.latex + ',\\, b = ' + k + ',\\, c_0 = ' + k + '$, nên $a + b + c_0 = ' + sumFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = k', params: { k: 5, c: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q56 5cot²x + 9 -> 12,3', params: { k: 5, c: 9 }, expectedValid: true },
    ],
  },

  // Dạng 57 (Q57 - SA): ∫_{3pi/4}^{2pi/3} (k tan^2 x + c)dx = aπ + b√3 + c0 -> tính a + b + c0
  t12_b12_d57_tan2_const_integral_sa: {
    id: 't12_b12_d57_tan2_const_integral_sa',
    name: 'Tính a + b + c từ tích phân ∫_{3π/4}^{2π/3} (k tan²x + c)dx = aπ + b√3 + c₀',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Biến đổi tan²x = 1/cos²x - 1 để tính ∫_{3π/4}^{2π/3} (k tan²x + c)dx và tính tổng a + b + c0.',
    conditionSummary: 'k ≠ 0, c ≠ k, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'k', label: 'Hệ số tan²x', min: -6, max: -1 },
      { name: 'c', label: 'Hằng số c', min: -9, max: -2 },
    ],
    validateCode: `
      const { k, c } = params;
      if (k >= 0 || c === k) return { valid: false, reason: 'Tham số phải hợp lệ' };
      const mLin = c - k;
      const val = -mLin / 12;
      if (val < 0 && Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười với số âm' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, c } = params;
      // int (k/cos^2 x + (c-k)) dx = [(c-k)x + k tan x]_{3pi/4}^{2pi/3}
      // At 2pi/3: (c-k)*(2pi/3) - k sqrt(3); at 3pi/4: (c-k)*(3pi/4) - k
      // Diff = -(c-k)/12 * pi - k*sqrt(3) + k => a = -(c-k)/12, b = -k, c0 = k => a + b + c0 = -(c-k)/12 (wait! check Q57!)
      // Wait: for Q57 k=-3, c=-6 => c-k=-3 => [-3x - 3tan x]_{3pi/4}^{2pi/3}:
      // (-2pi + 3sqrt(3)) - (-9pi/4 + 3) = pi/4 + 3sqrt(3) - 3 => a=1/4, b=3, c0=-3 => a+b+c0 = 1/4 = 0.25 -> 0.3!
      const mLin = c - k;
      const aFrac = u.simplifyFrac(-mLin, 12);
      const rounded = Math.round(aFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const integrand = u.formatTerm(k, '\\tan^2 x', true) + u.formatTerm(c, '', false);
      const anti = u.formatTerm(mLin, 'x', true) + u.formatTerm(k, '\\tan x', false);
      const bVal = -k;
      const c0Val = k;
      return {
        stem: 'Biết $\\int \\limits_{\\frac{3\\pi}{4}}^{\\frac{2\\pi}{3}} (' + integrand + ')\\mathrm{\\,d}x = a\\pi + b\\sqrt{3} + c_0$ (với $a, b, c_0 \\in \\mathbb{Q}$). Tính $a + b + c_0$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Sử dụng $\\tan^2 x = \\frac{1}{\\cos^2 x} - 1$: $\\int \\limits_{\\frac{3\\pi}{4}}^{\\frac{2\\pi}{3}} (' + integrand + ')\\mathrm{\\,d}x = \\left[' + anti + '\\right]_{\\frac{3\\pi}{4}}^{\\frac{2\\pi}{3}} = ' + aFrac.latex + '\\pi + ' + bVal + '\\sqrt{3}' + u.formatTrailingConst(c0Val) + '$.',
          'Suy ra $a = ' + aFrac.latex + ',\\, b = ' + bVal + ',\\, c_0 = ' + c0Val + '$, nên $a + b + c_0 = ' + aFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = k', params: { k: -3, c: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q57 -3tan²x - 6 -> 0,3', params: { k: -3, c: -6 }, expectedValid: true },
    ],
  },

  // Dạng 58 (Q58 - SA): ∫_{5pi/6}^{pi/2} (2k x + p sin x + q cos x)dx = aπ² + b√3 + c -> tính a + b + c
  t12_b12_d58_lin_trig_pi2_integral_sa: {
    id: 't12_b12_d58_lin_trig_pi2_integral_sa',
    name: 'Tính a + b + c từ tích phân ∫_{5π/6}^{π/2} (kx + p sin x + q cos x)dx = aπ² + b√3 + c',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính nguyên hàm của đa thức bậc nhất và sin x, cos x trên [5π/6; π/2] để suy ra hệ số π², √3 và hằng số.',
    conditionSummary: 'k chẵn khác 0, p, q khác 0, kết quả cách ranh giới 0,05',
    paramSpecs: [
      { name: 'k2', label: 'Nửa hệ số x (k = 2*k2)', min: -4, max: 4, allowZero: false },
      { name: 'p', label: 'Hệ số sin x', min: -6, max: 6, allowZero: false },
      { name: 'q', label: 'Hệ số cos x', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { k2, p, q } = params;
      if (k2 === 0 || p === 0 || q === 0) return { valid: false, reason: 'Tham số phải khác 0' };
      // k2*x^2 - p*cos x + q*sin x evaluated at pi/2 minus 5pi/6:
      // pi^2 coeff: k2 * (1/4 - 25/36) = k2 * (-16/36) = -4*k2/9
      // sqrt(3) coeff: -p * sqrt(3)/2
      // const coeff: q*(1 - 1/2) = q/2
      const val = (-4 * k2) / 9 - p / 2 + q / 2;
      if (Math.abs(Math.abs(val) * 10 - Math.floor(Math.abs(val) * 10) - 0.5) < 0.002) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k2, p, q } = params;
      const k = 2 * k2;
      const aFrac = u.simplifyFrac(-4 * k2, 9);
      const bFrac = u.simplifyFrac(-p, 2);
      const cFrac = u.simplifyFrac(q, 2);
      const sumFrac = u.simplifyFrac(-8 * k2 - 9 * p + 9 * q, 18);
      const rounded = Math.round(sumFrac.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const integrand = u.formatTerm(k, 'x', true) + u.formatTerm(p, '\\sin x', false) + u.formatTerm(q, '\\cos x', false);
      const anti = u.formatTerm(k2, 'x^2', true) + u.formatTerm(-p, '\\cos x', false) + u.formatTerm(q, '\\sin x', false);
      return {
        stem: 'Biết $\\int \\limits_{\\frac{5\\pi}{6}}^{\\frac{\\pi}{2}} (' + integrand + ')\\mathrm{\\,d}x = a\\pi^{2} + b\\sqrt{3} + c$ (với $a, b, c \\in \\mathbb{Q}$). Tính $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$\\int \\limits_{\\frac{5\\pi}{6}}^{\\frac{\\pi}{2}} (' + integrand + ')\\mathrm{\\,d}x = \\left[' + anti + '\\right]_{\\frac{5\\pi}{6}}^{\\frac{\\pi}{2}} = ' + aFrac.latex + '\\pi^2' + (bFrac.num >= 0 ? ' + ' + bFrac.latex : ' - ' + u.simplifyFrac(-bFrac.num, bFrac.den).latex) + '\\sqrt{3}' + (cFrac.num >= 0 ? ' + ' + cFrac.latex : ' - ' + u.simplifyFrac(-cFrac.num, cFrac.den).latex) + '$.',
          'Suy ra $a = ' + aFrac.latex + ',\\, b = ' + bFrac.latex + ',\\, c = ' + cFrac.latex + '$, nên $a + b + c = ' + sumFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k2 = 0', params: { k2: 0, p: -5, q: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q58 (-2x - 5sin x + cos x) -> 3,4', params: { k2: -1, p: -5, q: 1 }, expectedValid: true },
    ],
  },

  // Dạng 59 (Q59 - SA): ∫_{2pi/3}^{pi/6} 2k sin^2(x/2)dx = aπ + b√3 + c -> tính a + b + c
  t12_b12_d59_half_angle_sin2_sa: {
    id: 't12_b12_d59_half_angle_sin2_sa',
    name: 'Tính a + b + c từ tích phân hạ bậc ∫_{2π/3}^{π/6} 2k sin²(x/2)dx',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Áp dụng công thức hạ bậc sin²(x/2) = (1 - cos x)/2 để tính tích phân và suy ra a + b + c.',
    conditionSummary: 'k chẵn khác 0 để hệ số a, b, c nguyên đẹp',
    paramSpecs: [
      { name: 'k2', label: 'Hệ số m (biểu thức 4*m*sin²(x/2))', min: 1, max: 5 },
    ],
    validateCode: `
      if (params.k2 <= 0) return { valid: false, reason: 'Cần m >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const m = params.k2;
      const coeff = 4 * m;
      const k = 2 * m; // k*(1 - cos x) => [k x - k sin x]_{2pi/3}^{pi/6}
      // At pi/6: k*pi/6 - k/2; at 2pi/3: 2k*pi/3 - k sqrt(3)/2
      // Diff = -k/2 * pi + k/2 * sqrt(3) - k/2 = -m*pi + m*sqrt(3) - m
      const a = -m, b = m, c = -m;
      const ans = a + b + c;
      const shortAnswer = u.formatNumberVN(ans, 1);
      return {
        stem: 'Biết $\\int \\limits_{\\frac{2\\pi}{3}}^{\\frac{\\pi}{6}} \\left[' + coeff + '\\sin^{2}\\left(\\frac{x}{2}\\right)\\right]\\mathrm{\\,d}x = a\\pi + b\\sqrt{3} + c$ (với $a, b, c \\in \\mathbb{Q}$). Tính $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Áp dụng công thức hạ bậc $\\sin^2\\left(\\frac{x}{2}\\right) = \\frac{1 - \\cos x}{2}$: $' + coeff + '\\sin^2\\left(\\frac{x}{2}\\right) = ' + k + '(1 - \\cos x)$.',
          '$\\int \\limits_{\\frac{2\\pi}{3}}^{\\frac{\\pi}{6}} ' + k + '(1 - \\cos x)\\mathrm{\\,d}x = \\left[' + k + 'x - ' + k + '\\sin x\\right]_{\\frac{2\\pi}{3}}^{\\frac{\\pi}{6}} = ' + u.formatTerm(a, '\\pi', true) + u.formatTerm(b, '\\sqrt{3}', false) + u.formatTrailingConst(c) + '$.',
          'Suy ra $a = ' + a + ',\\, b = ' + b + ',\\, c = ' + c + ' \\Rightarrow a + b + c = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { k2: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q59 4sin²(x/2) -> -1,0', params: { k2: 1 }, expectedValid: true },
    ],
  },

  // Dạng 60 (Q60 - SA): ∫_{pi/3}^{pi/6} (4p sin 4x + q cos x)dx = a + b√3 -> tính a + b
  t12_b12_d60_sin4x_cosx_sa: {
    id: 't12_b12_d60_sin4x_cosx_sa',
    name: 'Tính a + b từ tích phân ∫_{π/3}^{π/6} (4p sin 4x + q cos x)dx = a + b√3',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tích phân hàm số lượng giác',
    description: 'Tính ∫_{π/3}^{π/6} (4p sin 4x + q cos x)dx = a + b√3 (với cos(4π/3) = cos(2π/3) = -1/2) và tìm a + b.',
    conditionSummary: 'p ≠ 0, q chẵn khác 0',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p (hệ số sin 4x là 4p)', min: 1, max: 6 },
      { name: 'q2', label: 'Nửa hệ số cos x (q = 2*q2)', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      if (params.p <= 0 || params.q2 === 0) return { valid: false, reason: 'Cần p > 0 và q2 ≠ 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q2 } = params;
      const q = 2 * q2;
      // Antiderivative: q sin x - p cos 4x
      // At pi/6: q*(1/2) - p*(-1/2) = q2 + p/2
      // At pi/3: q*(sqrt(3)/2) - p*(-1/2) = q2*sqrt(3) + p/2
      // Diff: q2 - q2*sqrt(3) => a = q2, b = -q2 => a + b = 0!
      // Wait: if we also want p to contribute or show exact algebra cleanly:
      // Note sin(pi/6)=1/2, cos(2pi/3)=-1/2; sin(pi/3)=sqrt(3)/2, cos(4pi/3)=-1/2, so cos 4x cancels at pi/6 and pi/3!
      const a = q2;
      const b = -q2;
      const ans = a + b;
      const shortAnswer = u.formatNumberVN(ans, 1);
      const integrand = (4 * p) + '\\sin 4x' + u.formatTerm(q, '\\cos x', false);
      const anti = u.formatTerm(q, '\\sin x', true) + u.formatTerm(-p, '\\cos 4x', false);
      return {
        stem: 'Biết $\\int \\limits_{\\frac{\\pi}{3}}^{\\frac{\\pi}{6}} (' + integrand + ')\\mathrm{\\,d}x = a + b\\sqrt{3}$ (với $a, b \\in \\mathbb{Q}$). Tính $a + b$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$\\int \\limits_{\\frac{\\pi}{3}}^{\\frac{\\pi}{6}} (' + integrand + ')\\mathrm{\\,d}x = \\left[' + anti + '\\right]_{\\frac{\\pi}{3}}^{\\frac{\\pi}{6}} = \\left(' + q2 + ' + \\frac{' + p + '}{2}\\right) - \\left(' + u.formatTerm(q2, '\\sqrt{3}', true) + ' + \\frac{' + p + '}{2}\\right) = ' + a + u.formatTerm(b, '\\sqrt{3}', false) + '$.',
          'Suy ra $a = ' + a + ',\\, b = ' + b + '$, nên $a + b = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q2 = 0', params: { p: 4, q2: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q60 (16sin 4x - 2cos x) -> 0,0', params: { p: 4, q2: -1 }, expectedValid: true },
    ],
  },
};
