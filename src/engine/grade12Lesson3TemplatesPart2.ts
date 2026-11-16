import { MathTemplate } from '../types/math';

export const G12_B3_TEMPLATES_PART2: Record<string, MathTemplate> = {
  // Dạng 18 [TF - Hiểu]: 4 mệnh đề về giới hạn một bên, giới hạn vô cực, TCĐ, TCN của y = ax/(cx+d)
  t12_b3_d18_rat11_limits_asym_tf: {
    id: 't12_b3_d18_rat11_limits_asym_tf',
    name: 'Dạng 18: Đúng - Sai về giới hạn và tiệm cận của hàm y = ax/(cx + d)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận — Đúng/Sai',
    description:
      'Cho hàm phân thức y = ax/(cx + d). Xét giới hạn một bên tại tiệm cận đứng, giới hạn vô cực, TCĐ và TCN.',
    conditionSummary: 'a != 0, c > 0, d != 0, x0 = -d/c != a/c',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a trên tử', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c của x ở mẫu', min: 2, max: 10 },
      { name: 'd', label: 'Hằng số d ở mẫu', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, c, d } = params;
      if (a === 0 || c <= 0 || d === 0) return { valid: false, reason: 'Cần a != 0, c > 0, d != 0' };
      if (-d === a) return { valid: false, reason: 'Tránh x0 = y0 (tức -d/c = a/c)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, d } = params;
      const numStr = u.formatTerm(a, 'x', true);
      const denStr = u.formatLinear(c, d);
      const x0 = u.simplifyFrac(-d, c);
      const y0 = u.simplifyFrac(a, c);
      // Numerator at x0 = -ad/c; since c > 0, as x -> x0+, denom -> 0+, so sign of limit is sign(-a*d)
      const rightIsNegInf = -a * d < 0;

      const tfStatements = [
        {
          key: 'a',
          text: '$\\lim_{x \\to \\left(' + x0.latex + '\\right)^+} y = -\\infty$',
          isTrue: rightIsNegInf,
        },
        {
          key: 'b',
          text: '$\\lim_{x \\to -\\infty} y = ' + x0.latex + '$',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Tiệm cận đứng của đồ thị hàm số là đường thẳng $x = ' + x0.latex + '$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Tiệm cận ngang của đồ thị hàm số là đường thẳng $y = ' + y0.latex + '$',
          isTrue: true,
        },
      ];
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định ' + (rightIsNegInf ? 'đúng' : 'sai') + '. Tại $x \\to \\left(' + x0.latex + '\\right)^+$, mẫu $' + denStr + ' \\to 0^+$ và tử tiến tới $' + u.simplifyFrac(-a * d, c).latex + '$, suy ra $\\lim_{x \\to (' + x0.latex + ')^+} y = ' + (rightIsNegInf ? '-\\infty' : '+\\infty') + '$.',
          'b) Khẳng định đã cho là khẳng định sai. $\\lim_{x \\to -\\infty} y = ' + y0.latex + '$.',
          'c) Khẳng định đã cho là khẳng định đúng. Đường tiệm cận đứng là $x = ' + x0.latex + '$.',
          'd) Khẳng định đã cho là khẳng định đúng. Đường tiệm cận ngang là $y = ' + y0.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc 2x/(10x+2)', params: { a: 2, c: 10, d: 2 }, expectedValid: true },
      { label: 'Biên lỗi x0 = y0', params: { a: -2, c: 4, d: 2 }, expectedValid: false },
    ],
  },

  // Dạng 19 [TF - Hiểu]: 4 mệnh đề về hàm bậc 2 / bậc 1 tổng quát ((ax+b)(cx+d)+r)/(cx+d)
  t12_b3_d19_rat21_limits_tcx_tf: {
    id: 't12_b3_d19_rat21_limits_tcx_tf',
    name: 'Dạng 19: Đúng - Sai về giới hạn, tiệm cận xiên và tiệm cận đứng',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận — Đúng/Sai',
    description:
      'Cho hàm số bậc 2/bậc 1 dạng y = ((ax + b)(cx + d) + r)/(cx + d). Xét giới hạn tiệm cận xiên, giới hạn một bên, phương trình TCX và TCĐ.',
    conditionSummary: 'a != 0, c > 0, d != 0, r != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc TCX a', min: 1, max: 4 },
      { name: 'b', label: 'Tung độ gốc TCX b', min: -6, max: 7 },
      { name: 'c', label: 'Hệ số c ở mẫu', min: 2, max: 5 },
      { name: 'd', label: 'Hằng số d ở mẫu', min: 1, max: 9 },
      { name: 'r', label: 'Phần dư r', min: -8, max: -1 },
    ],
    validateCode: `
      const { a, c, d, r } = params;
      if (a === 0 || c <= 0 || d === 0 || r === 0) return { valid: false, reason: 'Các hệ số phải khác 0 và c > 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, r } = params;
      const A = a * c;
      const B = a * d + b * c;
      const C = b * d + r;
      const numStr = u.formatQuadratic(A, B, C);
      const denStr = u.formatLinear(c, d);
      const tcxStr = u.formatLinear(a, b);
      const wrongTcx = u.formatLinear(-a, b);
      const x0 = u.simplifyFrac(-d, c);
      const wrongX0 = u.simplifyFrac(d, c);
      const rightIsPosInf = r > 0;

      const tfStatements = [
        { key: 'a', text: '$\\lim_{x \\to -\\infty} [y - (' + tcxStr + ')] = 0$', isTrue: true },
        { key: 'b', text: '$\\lim_{x \\to \\left(' + x0.latex + '\\right)^+} y = +\\infty$', isTrue: rightIsPosInf },
        { key: 'c', text: 'Tiệm cận xiên của đồ thị hàm số là đường thẳng $y = ' + wrongTcx + '$', isTrue: false },
        { key: 'd', text: 'Tiệm cận đứng của đồ thị hàm số là đường thẳng $x = ' + wrongX0.latex + '$', isTrue: false },
      ];
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định đúng. Ta có $y = ' + tcxStr + (r > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(r) + '}{' + denStr + '}$, suy ra $\\lim_{x \\to -\\infty}[y - (' + tcxStr + ')] = 0$.',
          'b) Khẳng định đã cho là khẳng định ' + (rightIsPosInf ? 'đúng' : 'sai') + '. Khi $x \\to (' + x0.latex + ')^+$ mẫu $' + denStr + ' \\to 0^+$ và phần dư là $' + r + '$, nên giới hạn bằng $' + (rightIsPosInf ? '+\\infty' : '-\\infty') + '$.',
          'c) Khẳng định đã cho là khẳng định sai. Tiệm cận xiên đúng là $y = ' + tcxStr + '$.',
          'd) Khẳng định đã cho là khẳng định sai. Tiệm cận đứng đúng là $x = ' + x0.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (8x^2+42x+43)/(4x+7)', params: { a: 2, b: 7, c: 4, d: 7, r: -6 }, expectedValid: true },
      { label: 'Biên lỗi r = 0', params: { a: 2, b: 7, c: 4, d: 7, r: 0 }, expectedValid: false },
    ],
  },

  // Dạng 20 [TF - Hiểu]: 4 mệnh đề về TCĐ, TCX, đạo hàm và nghiệm y'=0 của hàm (x^2 + px + q)/(x + p)
  t12_b3_d20_rat21_asym_deriv_tf: {
    id: 't12_b3_d20_rat21_asym_deriv_tf',
    name: 'Dạng 20: Đúng - Sai về tiệm cận và đạo hàm hàm y = x + r/(x + p)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận — Đúng/Sai',
    description:
      'Cho hàm phân thức y = (x^2 + px + q)/(x + p). Xét TCĐ, TCX, công thức đạo hàm và số nghiệm phương trình y\' = 0.',
    conditionSummary: 'p != 0, q > 0 để y\' = 0 có 2 nghiệm phân biệt',
    paramSpecs: [
      { name: 'p', label: 'Hằng số p ở mẫu x + p', min: -6, max: 6, allowZero: false },
      { name: 'q', label: 'Phần dư q > 0', min: 1, max: 9 },
    ],
    validateCode: `
      const { p, q } = params;
      if (p === 0 || q <= 0) return { valid: false, reason: 'Cần p != 0 và q > 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      const numStr = u.formatQuadratic(1, p, q);
      const denStr = u.formatShift('x', p);
      const derivNumTrue = u.formatQuadratic(1, 2 * p, p * p - q);
      const derivNumWrong = u.formatQuadratic(1, -2 * p, p * p - q - 2);

      const tfStatements = [
        { key: 'a', text: 'Tiệm cận đứng của đồ thị hàm số là đường thẳng $x = ' + (-p) + '$', isTrue: true },
        { key: 'b', text: 'Tiệm cận xiên của đồ thị hàm số là đường thẳng $y = -x$', isTrue: false },
        { key: 'c', text: "$y' = \\dfrac{" + derivNumWrong + '}{(' + denStr + ')^2}$', isTrue: false },
        { key: 'd', text: "Phương trình $y' = 0$ có $1$ nghiệm", isTrue: false },
      ];
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định đúng. Vì $q = ' + q + ' \\neq 0$ nên $x = ' + (-p) + '$ là tiệm cận đứng.',
          'b) Khẳng định đã cho là khẳng định sai. Ta có $y = x + \\dfrac{' + q + '}{' + denStr + '}$ nên tiệm cận xiên là $y = x$.',
          "c) Khẳng định đã cho là khẳng định sai. Đạo hàm đúng là $y' = 1 - \\dfrac{" + q + '}{(' + denStr + ')^2} = \\dfrac{' + derivNumTrue + '}{(' + denStr + ')^2}$.',
          "d) Khẳng định đã cho là khẳng định sai. Giải $y' = 0 \\Leftrightarrow (" + denStr + ')^2 = ' + q + '$ có $2$ nghiệm phân biệt.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (x^2+3x+1)/(x+3)', params: { p: 3, q: 1 }, expectedValid: true },
      { label: 'Biên lỗi q = 0', params: { p: 3, q: 0 }, expectedValid: false },
    ],
  },

  // Dạng 21 [TF - Vận dụng]: Hàm bậc 2/bậc 1 — TXĐ, TCĐ, TCX, diện tích ΔOAB
  t12_b3_d21_rat21_area_oab_tf: {
    id: 't12_b3_d21_rat21_area_oab_tf',
    name: 'Dạng 21: Đúng - Sai về tập xác định, tiệm cận xiên và diện tích ΔOAB',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường tiệm cận — Ứng dụng hình học (Đúng/Sai)',
    description:
      'Cho hàm phân thức bậc 2 trên bậc 1 y = ((ax + b)(x + p) + r)/(x + p). Xét TXĐ, TCĐ, TCX và diện tích tam giác OAB tạo bởi TCX với 2 trục tọa độ.',
    conditionSummary: 'a != 0, b != 0, p != 0, r != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -4, max: 5, allowZero: false },
      { name: 'b', label: 'Tung độ gốc b', min: -5, max: 5, allowZero: false },
      { name: 'p', label: 'Hằng số mẫu p', min: -4, max: 4, allowZero: false },
      { name: 'r', label: 'Phần dư r', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { a, b, p, r } = params;
      if (a === 0 || b === 0 || p === 0 || r === 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, p, r } = params;
      const A = a;
      const B = a * p + b;
      const C = b * p + r;
      const numStr = u.formatQuadratic(A, B, C);
      const denStr = u.formatShift('x', p);
      const tcxStr = u.formatLinear(a, b);
      const x0 = -p;
      const areaTrue = u.simplifyFrac(b * b, 2 * Math.abs(a));
      const areaWrong = u.simplifyFrac(2 * b * b, Math.abs(a));
      const xInt = u.simplifyFrac(-b, a);

      const tfStatements = [
        { key: 'a', text: 'Tập xác định của hàm số là $D = (' + x0 + ';\\, +\\infty)$', isTrue: false },
        { key: 'b', text: 'Đồ thị $(C)$ có đường tiệm cận đứng là $y = ' + x0 + '$', isTrue: false },
        { key: 'c', text: 'Đồ thị $(C)$ có đường tiệm cận xiên là $y = ' + tcxStr + '$', isTrue: true },
        {
          key: 'd',
          text: 'Đường tiệm cận xiên của đồ thị cắt hai trục tọa độ tại $A, B$. Diện tích tam giác $OAB$ bằng $' + areaWrong.latex + '$',
          isTrue: false,
        },
      ];
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$ có đồ thị $(C)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định sai. Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{' + x0 + '\\}$.',
          'b) Khẳng định đã cho là khẳng định sai. Đường tiệm cận đứng của $(C)$ là $x = ' + x0 + '$.',
          'c) Khẳng định đã cho là khẳng định đúng. Ta có $y = ' + tcxStr + (r > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(r) + '}{' + denStr + '}$ nên tiệm cận xiên là $y = ' + tcxStr + '$.',
          'd) Khẳng định đã cho là khẳng định sai. Tiệm cận xiên $y = ' + tcxStr + '$ cắt hai trục tại $A\\left(' + xInt.latex + ';\\, 0\\right)$ và $B(0;\\, ' + b + ')$, nên $S_{OAB} = \\dfrac{1}{2}|x_A|\\cdot |y_B| = ' + areaTrue.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (3x^2+x-5)/(x+1)', params: { a: 3, b: -2, p: 1, r: -3 }, expectedValid: true },
      { label: 'Biên lỗi r = 0', params: { a: 3, b: -2, p: 1, r: 0 }, expectedValid: false },
    ],
  },

  // Dạng 22 [TF - Vận dụng]: Hàm chứa tham số m: y = (m*x^2 + (p*m^2 + a)x + b)/(x + p*m)
  t12_b3_d22_param_m_tcx_area_tf: {
    id: 't12_b3_d22_param_m_tcx_area_tf',
    name: 'Dạng 22: Đúng - Sai về tiệm cận chứa tham số m và diện tích ΔOAB',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường tiệm cận — Biện luận tham số m (Đúng/Sai)',
    description:
      'Cho hàm số y = (mx^2 + (pm^2 + a)x + b)/(x + pm). Biện luận tiệm cận đứng, tiệm cận xiên tại m = m0, điều kiện có 2 tiệm cận và tổng bình phương m để S_OAB = S0.',
    conditionSummary: 'p >= 2, a != 0, b != 0, m0 != 0, b - a*p*m0 != 0, S0 > 0',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p của pm ở mẫu', min: 2, max: 4 },
      { name: 'a', label: 'Hằng số a của TCX y = mx + a', min: -4, max: -1 },
      { name: 'b', label: 'Hằng số tự do b trên tử', min: -4, max: 4, allowZero: false },
      { name: 'm0', label: 'Giá trị cụ thể m0', min: -3, max: 3, allowZero: false },
      { name: 'S0', label: 'Diện tích mục tiêu S0', min: 2, max: 8, step: 2 },
    ],
    validateCode: `
      const { p, a, b, m0, S0 } = params;
      if (p < 2 || a >= 0 || b === 0 || m0 === 0 || S0 <= 0) {
        return { valid: false, reason: 'Tham số không hợp lệ' };
      }
      if (b - a * p * m0 === 0) {
        return { valid: false, reason: 'Tại m0 phần dư bằng 0 nên không có TCĐ' };
      }
      const mCrit = b / (a * p);
      const mAbs = (a * a) / (2 * S0);
      if (Math.abs(Math.abs(mCrit) - mAbs) < 1e-6) {
        return { valid: false, reason: 'Nghiệm diện tích trùng giá trị loại của điều kiện 2 tiệm cận' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, a, b, m0, S0 } = params;
      const pm2Str = p + 'm^2' + u.formatTrailingConst(a);
      const numStr = 'mx^2 + (' + pm2Str + ')x' + u.formatTrailingConst(b);
      const denStr = 'x + ' + p + 'm';
      const x0AtM0 = -p * m0;
      const tcxAtM0 = u.formatLinear(m0, a);
      const tcxGen = 'mx' + u.formatTrailingConst(a);
      const remCoef = -a * p;
      const mForbid = u.simplifyFrac(b, a * p);
      const mAbsFrac = u.simplifyFrac(a * a, 2 * S0);
      const sumSq = u.simplifyFrac(Math.pow(a, 4), 2 * S0 * S0);
      const remAtM0 = b - a * p * m0;

      const tfStatements = [
        {
          key: 'a',
          text: 'Khi $m = ' + m0 + '$, đồ thị hàm số có đường tiệm cận đứng là $x = ' + x0AtM0 + '$',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Khi $m = ' + m0 + '$, tiệm cận xiên của đồ thị hàm số là $y = ' + tcxAtM0 + '$',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Đồ thị hàm số có hai đường tiệm cận khi $m \\neq ' + mForbid.latex + '$',
          isTrue: true,
        },
        {
          key: 'd',
          text:
            'Gọi $S$ là tập các giá trị của tham số $m$ để tiệm cận xiên của đồ thị cắt hai trục tọa độ tại $A, B$ sao cho tam giác $OAB$ có diện tích bằng $' +
            S0 +
            '$. Tổng bình phương các phần tử của tập $S$ bằng $' +
            sumSq.latex +
            '$',
          isTrue: true,
        },
      ];
      return {
        stem:
          'Cho hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$ có đồ thị là $(C)$, với $m$ là tham số. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định đúng. Với $m = ' + m0 + '$, mẫu bằng $0 \\Leftrightarrow x = ' + x0AtM0 + '$ và tử tại $x = ' + x0AtM0 + '$ bằng $' + remAtM0 + ' \\neq 0$, nên tiệm cận đứng là $x = ' + x0AtM0 + '$.',
          'b) Khẳng định đã cho là khẳng định đúng. Chia tử cho mẫu: $y = ' + tcxGen + ' + \\dfrac{' + u.formatLinear(remCoef, b) + '}{' + denStr + '}$. Khi $m = ' + m0 + '$, tiệm cận xiên là $y = ' + tcxAtM0 + '$.',
          'c) Khẳng định đã cho là khẳng định đúng. Đồ thị có đúng hai đường tiệm cận (1 TCĐ và 1 TCX) khi phần dư khác $0$, tức $' + u.formatLinear(remCoef, b) + ' \\neq 0 \\Leftrightarrow m \\neq ' + mForbid.latex + '$.',
          'd) Khẳng định đã cho là khẳng định đúng. Tiệm cận xiên $y = ' + tcxGen + '$ ($m \\neq 0, ' + mForbid.latex + '$) cắt $Oy$ tại $A(0;\\, ' + a + ')$ và $Ox$ tại $B\\left(\\dfrac{' + (-a) + '}{m};\\, 0\\right)$. Từ $\\dfrac{1}{2}|' + a + '| \\cdot \\left|\\dfrac{' + (-a) + '}{m}\\right| = ' + S0 + '$ suy ra $|m| = ' + mAbsFrac.latex + ' \\Rightarrow m = \\pm ' + mAbsFrac.latex + '$. Tổng bình phương là $' + sumSq.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (p=3, a=-2, b=-2, m0=-2, S0=4)', params: { p: 3, a: -2, b: -2, m0: -2, S0: 4 }, expectedValid: true },
      { label: 'Biên lỗi phần dư bằng 0 tại m0', params: { p: 2, a: -1, b: -4, m0: 2, S0: 4 }, expectedValid: false },
    ],
  },

  // Dạng 23 [TF - Vận dụng]: Từ bảng biến thiên suy ra TCĐ, TCN, tổng tiệm cận và TCĐ của hàm hợp k/(f(x) - yMin)
  t12_b3_d23_bbt_4prop_tf: {
    id: 't12_b3_d23_bbt_4prop_tf',
    name: 'Dạng 23: Đúng - Sai từ BBT về tiệm cận của f(x) và hàm hợp k/(f(x) - y₀)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường tiệm cận — Hàm hợp từ BBT (Đúng/Sai)',
    description:
      'Cho BBT của hàm số y = f(x) có hai tiệm cận ngang phân biệt L1, L2 và một tiệm cận đứng x1. Xét các mệnh đề về tiệm cận của f(x) và k/(f(x) - yMin).',
    conditionSummary: 'x1 < x2, yMin < yRight, yMin < L1, yMin < L2, L1 != L2',
    paramSpecs: [
      { name: 'x1', label: 'Điểm gián đoạn x1', min: -5, max: -1 },
      { name: 'x2', label: 'Điểm cực tiểu x2', min: 1, max: 5 },
      { name: 'L1', label: 'Giới hạn trái tại -∞', min: 12, max: 18 },
      { name: 'yRight', label: 'Giới hạn phải tại x1', min: 10, max: 15 },
      { name: 'yMin', label: 'Giá trị cực tiểu yMin', min: 4, max: 9 },
      { name: 'L2', label: 'Giới hạn phải tại +∞', min: 11, max: 17 },
      { name: 'kNum', label: 'Tử số k của k/(f(x) - yMin)', min: 1, max: 5 },
    ],
    validateCode: `
      const { x1, x2, L1, yRight, yMin, L2, kNum } = params;
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2' };
      if (L1 === L2) return { valid: false, reason: 'Cần L1 != L2 để có 2 TCN phân biệt' };
      if (!(yMin < L1 && yMin < yRight && yMin < L2)) {
        return { valid: false, reason: 'Cần yMin nhỏ hơn L1, yRight và L2 để f(x) = yMin có đúng 2 nghiệm' };
      }
      if (kNum <= 0) return { valid: false, reason: 'k > 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, L1, yRight, yMin, L2, kNum } = params;
      const tfStatements = [
        { key: 'a', text: 'Đồ thị hàm số $y = f(x)$ có tiệm cận đứng là $x = ' + x2 + '$', isTrue: false },
        {
          key: 'b',
          text: 'Đồ thị hàm số $y = f(x)$ nhận đường thẳng $y = ' + L1 + '$ làm một tiệm cận ngang',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Đồ thị hàm số $y = f(x)$ có số đường tiệm cận đứng và tiệm cận ngang là $3$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Đồ thị hàm số $y = \\dfrac{' + kNum + '}{f(x) - ' + yMin + '}$ có số tiệm cận đứng là $2$',
          isTrue: true,
        },
      ];
      return {
        stem: 'Cho hàm số $y = f(x)$ có bảng biến thiên như hình vẽ. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '-' },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ],
          yNodes: [
            { kind: 'single', pos: 'top', value: '' + L1 },
            { kind: 'asymptote', leftPos: 'bot', leftVal: '-\\infty', rightPos: 'top', rightVal: '' + yRight },
            { kind: 'single', pos: 'bot', value: '' + yMin },
            { kind: 'single', pos: 'top', value: '' + L2 },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định sai. Ta có $\\lim_{x \\to ' + x1 + '^-} f(x) = -\\infty$ nên $x = ' + x1 + '$ là tiệm cận đứng của đồ thị $y = f(x)$.',
          'b) Khẳng định đã cho là khẳng định đúng. Vì $\\lim_{x \\to -\\infty} f(x) = ' + L1 + '$ và $\\lim_{x \\to +\\infty} f(x) = ' + L2 + '$ nên $y = ' + L1 + '$ và $y = ' + L2 + '$ là hai tiệm cận ngang.',
          'c) Khẳng định đã cho là khẳng định đúng. Đồ thị có $1$ tiệm cận đứng ($x = ' + x1 + '$) và $2$ tiệm cận ngang ($y = ' + L1 + ',\\, y = ' + L2 + '$), tổng cộng $3$ tiệm cận.',
          'd) Khẳng định đã cho là khẳng định đúng. Vì $' + yMin + ' < ' + L1 + '$ và $' + yMin + ' < ' + yRight + ',\\, ' + L2 + '$ nên phương trình $f(x) = ' + yMin + '$ có đúng $2$ nghiệm phân biệt ($x = \\alpha < ' + x1 + '$ và $x = ' + x2 + '$). Do đó đồ thị hàm số $y = \\dfrac{' + kNum + '}{f(x) - ' + yMin + '}$ có $2$ đường tiệm cận đứng.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x1=-3, x2=2, L1=14, yRight=11, yMin=9, L2=13)',
        params: { x1: -3, x2: 2, L1: 14, yRight: 11, yMin: 9, L2: 13, kNum: 2 },
        expectedValid: true,
      },
      { label: 'Biên lỗi L1 = L2', params: { x1: -3, x2: 2, L1: 13, yRight: 11, yMin: 9, L2: 13, kNum: 2 }, expectedValid: false },
    ],
  },

  // Dạng 24 [TF - Hiểu]: Hàm y = ax/(x0 - x) — TCĐ, TCN, giao điểm I và diện tích hình chữ nhật
  t12_b3_d24_rat11_rect_area_tf: {
    id: 't12_b3_d24_rat11_rect_area_tf',
    name: 'Dạng 24: Đúng - Sai về tâm đối xứng và hình chữ nhật tiệm cận',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận — Hình học tọa độ (Đúng/Sai)',
    description:
      'Cho hàm phân thức y = ax/(x0 - x). Xét TCĐ, TCN, giao điểm I của hai tiệm cận và diện tích hình chữ nhật giới hạn bởi hai tiệm cận và hai trục tọa độ.',
    conditionSummary: 'a > 0, x0 > 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a > 0', min: 1, max: 8 },
      { name: 'x0', label: 'Tiệm cận đứng x0 > 0', min: 1, max: 7 },
    ],
    validateCode: `
      if (params.a <= 0 || params.x0 <= 0) return { valid: false, reason: 'Cần a > 0 và x0 > 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x0 } = params;
      const numStr = u.formatTerm(a, 'x', true);
      const denStr = x0 + ' - x';
      const y0 = -a;
      const area = a * x0;

      const tfStatements = [
        { key: 'a', text: 'Tiệm cận đứng của đồ thị hàm số là đường thẳng $x = ' + x0 + '$', isTrue: true },
        { key: 'b', text: 'Tiệm cận ngang của đồ thị hàm số là đường thẳng $y = ' + y0 + '$', isTrue: true },
        {
          key: 'c',
          text: 'Giao điểm của tiệm cận đứng và tiệm cận ngang của đồ thị hàm số là điểm $I(' + (x0 + 1) + ';\\, ' + (y0 - 1) + ')$',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Hình chữ nhật giới hạn bởi $2$ đường tiệm cận của đồ thị hàm số và hai trục tọa độ có diện tích bằng $' + area + '$',
          isTrue: true,
        },
      ];
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định đúng. Vì $\\lim_{x \\to ' + x0 + '^+} y = -\\infty$ nên đường tiệm cận đứng là $x = ' + x0 + '$.',
          'b) Khẳng định đã cho là khẳng định đúng. Vì $\\lim_{x \\to \\pm\\infty} y = ' + y0 + '$ nên đường tiệm cận ngang là $y = ' + y0 + '$.',
          'c) Khẳng định đã cho là khẳng định sai. Giao điểm đúng của hai đường tiệm cận là $I(' + x0 + ';\\, ' + y0 + ')$.',
          'd) Khẳng định đã cho là khẳng định đúng. Diện tích hình chữ nhật là $S = |' + x0 + '| \\cdot |' + y0 + '| = ' + area + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc 4x/(1-x)', params: { a: 4, x0: 1 }, expectedValid: true },
      { label: 'Biên lỗi x0 = 0', params: { a: 4, x0: 0 }, expectedValid: false },
    ],
  },

  // Dạng 25 [TF - Vận dụng]: Từ giới hạn f(x) xét tiệm cận của f(x) và hàm hợp (pf(x)+q)/(rf(x)+s)
  t12_b3_d25_limits_composite_tf: {
    id: 't12_b3_d25_limits_composite_tf',
    name: 'Dạng 25: Đúng - Sai về tiệm cận của f(x) và hàm phân thức hợp',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đường tiệm cận — Hàm hợp (Đúng/Sai)',
    description:
      'Cho hàm y = f(x) xác định với x != x0 biết giới hạn tại ±∞ và x0+. Xét tiệm cận của f(x) và TCN của (p*f(x) + q)/(r*f(x) + s).',
    conditionSummary: 'L1 != L2, r*L1 + s != 0, r*L2 + s != 0, p*s - q*r != 0',
    paramSpecs: [
      { name: 'x0', label: 'Điểm gián đoạn x0', min: -4, max: 4 },
      { name: 'L1', label: 'Giới hạn tại -∞', min: -8, max: -3 },
      { name: 'L2', label: 'Giới hạn tại +∞', min: -2, max: 4 },
      { name: 'p', label: 'Hệ số p của f(x) trên tử', min: 1, max: 4 },
      { name: 'q', label: 'Hằng số q trên tử', min: -4, max: 4 },
      { name: 'r', label: 'Hệ số r của f(x) dưới mẫu', min: -6, max: -2 },
      { name: 's', label: 'Hằng số s dưới mẫu', min: -7, max: -2 },
    ],
    validateCode: `
      const { L1, L2, p, q, r, s } = params;
      if (L1 === L2) return { valid: false, reason: 'Cần L1 != L2 để có 2 TCN phân biệt' };
      if (r === 0 || p === 0) return { valid: false, reason: 'p và r phải khác 0' };
      if (p * s - q * r === 0) return { valid: false, reason: 'Hàm hợp suy biến thành hằng số' };
      if (r * L1 + s === 0 || r * L2 + s === 0) return { valid: false, reason: 'Mẫu triệt tiêu ở vô cực' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, L1, L2, p, q, r, s } = params;
      const g1 = u.simplifyFrac(p * L1 + q, r * L1 + s);
      const g2 = u.simplifyFrac(p * L2 + q, r * L2 + s);
      // Construct a guaranteed-distinct wrong horizontal asymptote
      let wrongNum = g1.num + 1;
      let wrongDen = g1.den * 3;
      const wrongFrac = u.simplifyFrac(wrongNum, wrongDen);
      const isDistinct = Math.abs(wrongFrac.value - g1.value) > 1e-6 && Math.abs(wrongFrac.value - g2.value) > 1e-6;
      const safeWrong = isDistinct ? wrongFrac : u.simplifyFrac(g1.num + 5, g1.den + 7);

      const numComp = u.formatTerm(p, 'f(x)', true) + u.formatTrailingConst(q);
      const denComp = u.formatTerm(r, 'f(x)', true) + u.formatTrailingConst(s);

      const tfStatements = [
        { key: 'a', text: 'Đồ thị hàm số $y = f(x)$ có một tiệm cận ngang là $x = ' + L1 + '$', isTrue: false },
        { key: 'b', text: 'Đồ thị hàm số $y = f(x)$ có tiệm cận đứng là $x = ' + x0 + '$', isTrue: true },
        { key: 'c', text: 'Số tiệm cận đứng và tiệm cận ngang của đồ thị hàm số $y = f(x)$ là $3$', isTrue: true },
        {
          key: 'd',
          text: 'Đường thẳng $y = ' + safeWrong.latex + '$ là một tiệm cận ngang của đồ thị hàm số $y = \\dfrac{' + numComp + '}{' + denComp + '}$',
          isTrue: false,
        },
      ];
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định với mọi $x \\neq ' +
          x0 +
          '$ có $\\lim_{x \\to -\\infty} f(x) = ' +
          L1 +
          '$, $\\lim_{x \\to +\\infty} f(x) = ' +
          L2 +
          '$ và $\\lim_{x \\to ' +
          x0 +
          '^+} f(x) = -\\infty$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định sai. Tiệm cận ngang phải là đường thẳng $y = ' + L1 + '$ và $y = ' + L2 + '$.',
          'b) Khẳng định đã cho là khẳng định đúng. Vì $\\lim_{x \\to ' + x0 + '^+} f(x) = -\\infty$ nên $x = ' + x0 + '$ là tiệm cận đứng.',
          'c) Khẳng định đã cho là khẳng định đúng. Đồ thị có $2$ tiệm cận ngang ($y = ' + L1 + ',\\, y = ' + L2 + '$) và $1$ tiệm cận đứng ($x = ' + x0 + '$), tổng là $3$.',
          'd) Khẳng định đã cho là khẳng định sai. Ta có $\\lim_{x \\to -\\infty} \\dfrac{' + numComp + '}{' + denComp + '} = ' + g1.latex + '$ và $\\lim_{x \\to +\\infty} \\dfrac{' + numComp + '}{' + denComp + '} = ' + g2.latex + '$. Vậy hai tiệm cận ngang là $y = ' + g1.latex + '$ và $y = ' + g2.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x0=-1, L1=-6, L2=-2, (3f-3)/(-5f-6))',
        params: { x0: -1, L1: -6, L2: -2, p: 3, q: -3, r: -5, s: -6 },
        expectedValid: true,
      },
      { label: 'Biên lỗi L1 = L2', params: { x0: -1, L1: -3, L2: -3, p: 3, q: -3, r: -5, s: -6 }, expectedValid: false },
    ],
  },

  // Dạng 26 [SA - Hiểu]: Tìm điều kiện m != a để y = (px + q)/(m - rx) có tiệm cận đứng
  t12_b3_d26_param_tcd_sa: {
    id: 't12_b3_d26_param_tcd_sa',
    name: 'Dạng 26: Tìm điều kiện tham số m để hàm y = (px + q)/(m - rx) có tiệm cận đứng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận — Tham số (Trả lời ngắn)',
    description:
      'Cho hàm phân thức y = (px + q)/(m - rx) có tiệm cận đứng khi m != a. Tính giá trị của a làm tròn đến hàng phần mười.',
    conditionSummary: 'p != 0, q != 0, r != 0',
    paramSpecs: [
      { name: 'p', label: 'Hệ số px trên tử', min: 2, max: 9 },
      { name: 'q', label: 'Hằng số q trên tử', min: -8, max: 8, allowZero: false },
      { name: 'r', label: 'Hệ số r trong m - rx', min: 2, max: 7 },
    ],
    validateCode: `
      const { p, q, r } = params;
      if (p <= 0 || q === 0 || r <= 0) return { valid: false, reason: 'p > 0, q != 0, r > 0' };
      const aVal = (-q * r) / p;
      const frac10 = Math.abs(aVal * 10 - Math.floor(aVal * 10));
      if (Math.abs(frac10 - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, r } = params;
      const numStr = u.formatLinear(p, q);
      const denStr = 'm - ' + r + 'x';
      // p*x + q = 0 => x = -q/p; m - r*x = 0 at same root <=> m = -q*r/p
      const aFrac = u.simplifyFrac(-q * r, p);
      const rounded = Number(aFrac.value.toFixed(1));
      const ansStr = Number.isInteger(rounded) ? '' + rounded : u.formatNumberVN(rounded, 1);

      return {
        stem:
          'Biết các giá trị của tham số $m$ để đồ thị hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$ có tiệm cận đứng là $m \\neq a$. Tính giá trị của $a$ (làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Đồ thị hàm số có tiệm cận đứng khi $p \\cdot m - q \\cdot (-' + r + ') \\neq 0 \\Leftrightarrow ' + p + 'm ' + (q * r >= 0 ? '+ ' + q * r : '- ' + Math.abs(q * r)) + ' \\neq 0$.',
          'Giải ra $m \\neq ' + aFrac.latex + '$. Vậy $a = ' + aFrac.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (5x-1)/(m-3x)', params: { p: 5, q: -1, r: 3 }, expectedValid: true },
      { label: 'Biên lỗi q = 0', params: { p: 5, q: 0, r: 3 }, expectedValid: false },
    ],
  },

  // Dạng 27 [SA - Hiểu]: Tiệm cận xiên y = ax + b, tính biểu thức u*a + v*b
  t12_b3_d27_tcx_linear_combo_sa: {
    id: 't12_b3_d27_tcx_linear_combo_sa',
    name: 'Dạng 27: Xác định tiệm cận xiên y = ax + b và tính giá trị ua + vb',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đường tiệm cận xiên (Trả lời ngắn)',
    description:
      'Cho đồ thị hàm số y = ((ax + b)(px + q) + r)/(px + q) nhận đường thẳng y = ax + b làm tiệm cận xiên. Tính giá trị biểu thức u*a + v*b.',
    conditionSummary: 'a != 0, b != 0, p != 0, q != 0, r != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Tung độ gốc b', min: -5, max: 5, allowZero: false },
      { name: 'p', label: 'Hệ số p của x ở mẫu', min: -4, max: 4, allowZero: false },
      { name: 'q', label: 'Hằng số q ở mẫu', min: -6, max: 6, allowZero: false },
      { name: 'r', label: 'Phần dư r', min: -6, max: 6, allowZero: false },
      { name: 'uC', label: 'Hệ số u của a', min: 2, max: 4 },
      { name: 'vC', label: 'Hệ số v của b', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, p, q, r, uC, vC } = params;
      if (a === 0 || b === 0 || p === 0 || q === 0 || r === 0 || uC === 0 || vC === 0) {
        return { valid: false, reason: 'Các hệ số phải khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, p, q, r, uC, vC } = params;
      const A = a * p;
      const B = a * q + b * p;
      const C = b * q + r;
      const numStr = u.formatQuadratic(A, B, C);
      const denStr = u.formatLinear(p, q);
      const tcxStr = u.formatLinear(a, b);
      const comboExpr = u.formatTerm(uC, 'a', true) + u.formatTerm(vC, 'b', false);
      const ans = uC * a + vC * b;

      return {
        stem:
          'Biết đồ thị hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$ nhận đường thẳng $y = ax + b$ làm đường tiệm cận xiên. Tính $' +
          comboExpr +
          '$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '' + ans,
        solutionSteps: [
          'Chia tử cho mẫu: $y = \\dfrac{' + numStr + '}{' + denStr + '} = ' + tcxStr + (r > 0 ? ' + ' : ' - ') + '\\dfrac{' + Math.abs(r) + '}{' + denStr + '}$.',
          'Đường tiệm cận xiên là $y = ' + tcxStr + '$, suy ra $a = ' + a + ',\\; b = ' + b + '$.',
          'Vậy $' + comboExpr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (8x^2+16x-5)/(-2x-5), 3a-3b=-18',
        params: { a: -4, b: 2, p: -2, q: -5, r: 5, uC: 3, vC: -3 },
        expectedValid: true,
      },
      { label: 'Biên lỗi r = 0', params: { a: -4, b: 2, p: -2, q: -5, r: 0, uC: 3, vC: -3 }, expectedValid: false },
    ],
  },

  // Dạng 28 [SA - Vận dụng]: Quần thể nấm men N(t) = a/(b + e^(-kt))
  t12_b3_d28_yeast_logistic_sa: {
    id: 't12_b3_d28_yeast_logistic_sa',
    name: 'Dạng 28: Giới hạn tối đa quần thể nấm men mô hình Logistic',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường tiệm cận ngang — Sinh học Logistic (Trả lời ngắn)',
    description:
      'Số lượng quần thể nấm men N(t) = a/(b + e^(-kt)). Biết N(0) = N0 và N\'(0) = v0, tìm số lượng tối đa lim_{t→+∞} N(t) (làm tròn hàng đơn vị).',
    conditionSummary: 'k*N0 > v0 > 0, kết quả không nằm sát ranh giới .5',
    paramSpecs: [
      { name: 'kTen', label: 'Tham số 100*k', min: 40, max: 85, step: 5 },
      { name: 'N0', label: 'Số tế bào ban đầu N(0)', min: 15, max: 40 },
      { name: 'v0', label: 'Tốc độ tăng ban đầu N\'(0)', min: 4, max: 14 },
    ],
    validateCode: `
      const { kTen, N0, v0 } = params;
      if (kTen <= 0 || N0 <= 0 || v0 <= 0) return { valid: false, reason: 'Các tham số phải dương' };
      const k = kTen / 100;
      if (k * N0 <= v0 + 0.5) return { valid: false, reason: 'Cần k*N0 > v0 để b > 0 (tăng trưởng logistic)' };
      const limitVal = (k * N0 * N0) / (k * N0 - v0);
      if (!Number.isFinite(limitVal) || limitVal > 1e6) return { valid: false, reason: 'Giới hạn vượt ngưỡng thực tế' };
      const frac = Math.abs(limitVal - Math.floor(limitVal));
      if (Math.abs(frac - 0.5) < 0.05) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { kTen, N0, v0 } = params;
      const kStr = u.formatNumberVN(kTen / 100, 2);
      const bFrac = u.simplifyFrac(kTen * N0 - 100 * v0, 100 * v0);
      const aFrac = u.simplifyFrac(kTen * N0 * N0, 100 * v0);
      const limitFrac = u.simplifyFrac(kTen * N0 * N0, kTen * N0 - 100 * v0);
      const rounded = Math.round(limitFrac.value);

      return {
        stem:
          'Giả sử số lượng của một quần thể nấm men tại môi trường nuôi cấy trong phòng thí nghiệm được mô hình hóa bằng hàm số $N(t) = \\dfrac{a}{b + e^{-' +
          kStr +
          't}}$, trong đó thời gian $t$ được tính bằng giờ. Tại thời điểm ban đầu $t = 0$, quần thể có $' +
          N0 +
          '$ tế bào và tăng với tốc độ $' +
          v0 +
          '$ tế bào/giờ. Theo mô hình này, số lượng nấm men không vượt quá bao nhiêu tế bào (kết quả làm tròn đến hàng đơn vị)?',
        shortAnswer: '' + rounded,
        numericValue: rounded,
        answerSummary: rounded + ' tế bào',
        solutionSteps: [
          'Tại $t = 0$: $N(0) = ' + N0 + ' \\Rightarrow \\dfrac{a}{b + 1} = ' + N0 + ' \\Rightarrow a = ' + N0 + '(b + 1)$.',
          "Đạo hàm $N'(t) = \\dfrac{" + kStr + ' a e^{-' + kStr + 't}}{(b + e^{-' + kStr + 't})^2}$. Với $N\'(0) = ' + v0 + '$ ta có $\\dfrac{' + kStr + ' a}{(b + 1)^2} = ' + v0 + ' \\Rightarrow \\dfrac{' + kStr + ' \\cdot ' + N0 + '}{b + 1} = ' + v0 + '$.',
          'Giải được $b = ' + bFrac.latex + '$ và $a = ' + aFrac.latex + '$. Khi $t \\to +\\infty$: $\\lim_{t \\to +\\infty} N(t) = \\dfrac{a}{b} = ' + limitFrac.latex + ' \\approx ' + rounded + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (k=0.60, N0=22, v0=10)', params: { kTen: 60, N0: 22, v0: 10 }, expectedValid: true },
      { label: 'Biên lỗi k*N0 <= v0', params: { kTen: 40, N0: 15, v0: 10 }, expectedValid: false },
    ],
  },

  // Dạng 29 [SA - Vận dụng]: Số lượng người dùng ứng dụng mới N(t) = a/(b + e^(-kt))
  t12_b3_d29_app_users_logistic_sa: {
    id: 't12_b3_d29_app_users_logistic_sa',
    name: 'Dạng 29: Số lượng người dùng tối đa của ứng dụng theo mô hình Logistic',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường tiệm cận ngang — Kinh doanh số Logistic (Trả lời ngắn)',
    description:
      'Số lượng người dùng ứng dụng N(t) = a/(b + e^(-kt)) theo tháng t. Biết N(0) và tốc độ tăng N\'(0), tìm số người dùng tối đa (làm tròn hàng đơn vị).',
    conditionSummary: 'k*N0 > v0 > 0, kết quả không nằm sát .5',
    paramSpecs: [
      { name: 'kTen', label: 'Tham số 100*k', min: 50, max: 95, step: 5 },
      { name: 'N0', label: 'Số người dùng ban đầu N(0)', min: 12, max: 35 },
      { name: 'v0', label: 'Tốc độ tăng N\'(0) (người/tháng)', min: 4, max: 14 },
    ],
    validateCode: `
      const { kTen, N0, v0 } = params;
      if (kTen <= 0 || N0 <= 0 || v0 <= 0) return { valid: false, reason: 'Các tham số phải dương' };
      const k = kTen / 100;
      if (k * N0 <= v0 + 0.5) return { valid: false, reason: 'Cần k*N0 > v0 để b > 0' };
      const limitVal = (k * N0 * N0) / (k * N0 - v0);
      if (!Number.isFinite(limitVal) || limitVal > 1e6) return { valid: false, reason: 'Giới hạn vượt ngưỡng thực tế' };
      const frac = Math.abs(limitVal - Math.floor(limitVal));
      if (Math.abs(frac - 0.5) < 0.05) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { kTen, N0, v0 } = params;
      const kStr = u.formatNumberVN(kTen / 100, 2);
      const bFrac = u.simplifyFrac(kTen * N0 - 100 * v0, 100 * v0);
      const aFrac = u.simplifyFrac(kTen * N0 * N0, 100 * v0);
      const limitFrac = u.simplifyFrac(kTen * N0 * N0, kTen * N0 - 100 * v0);
      const rounded = Math.round(limitFrac.value);

      return {
        stem:
          'Giả sử số lượng khách hàng sử dụng một ứng dụng mới được mô hình hóa bằng hàm số $N(t) = \\dfrac{a}{b + e^{-' +
          kStr +
          't}}$, trong đó thời gian $t$ được tính bằng tháng. Tại thời điểm ban đầu $t = 0$, có $' +
          N0 +
          '$ người dùng và tăng với tốc độ $' +
          v0 +
          '$ người/tháng. Theo mô hình này, số lượng người dùng tối đa là bao nhiêu (kết quả làm tròn đến hàng đơn vị)?',
        shortAnswer: '' + rounded,
        numericValue: rounded,
        answerSummary: rounded + ' người dùng',
        solutionSteps: [
          'Từ $N(0) = ' + N0 + ' \\Rightarrow a = ' + N0 + '(b + 1)$.',
          "Đạo hàm $N'(t) = \\dfrac{" + kStr + ' a e^{-' + kStr + 't}}{(b + e^{-' + kStr + 't})^2}$. Với $N\'(0) = ' + v0 + '$ ta có $\\dfrac{' + kStr + ' \\cdot ' + N0 + '}{b + 1} = ' + v0 + ' \\Rightarrow b = ' + bFrac.latex + ',\\; a = ' + aFrac.latex + '$.',
          'Số lượng người dùng tối đa là $\\lim_{t \\to +\\infty} N(t) = \\dfrac{a}{b} = ' + limitFrac.latex + ' \\approx ' + rounded + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (k=0.75, N0=15, v0=10)', params: { kTen: 75, N0: 15, v0: 10 }, expectedValid: true },
      { label: 'Biên lỗi k*N0 <= v0', params: { kTen: 50, N0: 12, v0: 10 }, expectedValid: false },
    ],
  },

  // Dạng 30 [SA - Vận dụng]: Số học sinh khóa học online N(t) = a/(b + e^(-kt))
  t12_b3_d30_course_students_logistic_sa: {
    id: 't12_b3_d30_course_students_logistic_sa',
    name: 'Dạng 30: Số lượng học sinh tối đa tham gia khóa học online',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường tiệm cận ngang — Giáo dục Logistic (Trả lời ngắn)',
    description:
      'Số học sinh tham gia khóa học online N(t) = a/(b + e^(-kt)) theo tuần t. Biết N(0) và tốc độ tăng ban đầu N\'(0), tìm giới hạn số học sinh tối đa.',
    conditionSummary: 'k*N0 > v0 > 0, kết quả không nằm sát .5',
    paramSpecs: [
      { name: 'kTen', label: 'Tham số 10*k', min: 4, max: 9 },
      { name: 'N0', label: 'Số học sinh ban đầu N(0)', min: 10, max: 30 },
      { name: 'v0', label: 'Tốc độ tăng N\'(0) (học sinh/tuần)', min: 3, max: 11 },
    ],
    validateCode: `
      const { kTen, N0, v0 } = params;
      if (kTen <= 0 || N0 <= 0 || v0 <= 0) return { valid: false, reason: 'Các tham số phải dương' };
      const k = kTen / 10;
      if (k * N0 <= v0 + 0.4) return { valid: false, reason: 'Cần k*N0 > v0 để b > 0' };
      const limitVal = (k * N0 * N0) / (k * N0 - v0);
      if (!Number.isFinite(limitVal) || limitVal > 1e6) return { valid: false, reason: 'Giới hạn vượt ngưỡng thực tế' };
      const frac = Math.abs(limitVal - Math.floor(limitVal));
      if (Math.abs(frac - 0.5) < 0.05) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { kTen, N0, v0 } = params;
      const kStr = u.formatNumberVN(kTen / 10, 1);
      const bFrac = u.simplifyFrac(kTen * N0 - 10 * v0, 10 * v0);
      const aFrac = u.simplifyFrac(kTen * N0 * N0, 10 * v0);
      const limitFrac = u.simplifyFrac(kTen * N0 * N0, kTen * N0 - 10 * v0);
      const rounded = Math.round(limitFrac.value);

      return {
        stem:
          'Giả sử số lượng học sinh tham gia một khóa học online được mô hình hóa bằng hàm số $N(t) = \\dfrac{a}{b + e^{-' +
          kStr +
          't}}$, trong đó thời gian $t$ được tính bằng tuần. Tại thời điểm ban đầu $t = 0$, có $' +
          N0 +
          '$ học sinh đăng kí và số lượng học sinh tăng với tốc độ $' +
          v0 +
          '$ học sinh/tuần. Theo mô hình này, số lượng học sinh tối đa tiến tới là bao nhiêu (kết quả làm tròn đến hàng đơn vị)?',
        shortAnswer: '' + rounded,
        numericValue: rounded,
        answerSummary: rounded + ' học sinh',
        solutionSteps: [
          'Tại $t = 0$: $N(0) = ' + N0 + ' \\Rightarrow a = ' + N0 + '(b + 1)$.',
          "Đạo hàm $N'(t) = \\dfrac{" + kStr + ' a e^{-' + kStr + 't}}{(b + e^{-' + kStr + 't})^2}$. Từ $N\'(0) = ' + v0 + '$ suy ra $\\dfrac{' + kStr + ' \\cdot ' + N0 + '}{b + 1} = ' + v0 + ' \\Rightarrow b = ' + bFrac.latex + ',\\; a = ' + aFrac.latex + '$.',
          'Vì $a > 0, b > 0, k > 0$ nên hàm số đồng biến trên $[0;\\, +\\infty)$. Khi $t \\to +\\infty$, $\\lim_{t \\to +\\infty} N(t) = \\dfrac{a}{b} = ' + limitFrac.latex + ' \\approx ' + rounded + '$ học sinh.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (k=0.6, N0=13, v0=5)', params: { kTen: 6, N0: 13, v0: 5 }, expectedValid: true },
      { label: 'Biên lỗi k*N0 <= v0', params: { kTen: 4, N0: 10, v0: 6 }, expectedValid: false },
    ],
  },

  // Dạng 31 [SA - Vận dụng]: Đếm số nguyên m ∈ [-R; R] để đồ thị (x+c)/((k-x)√(x-m)) có đúng 2 tiệm cận
  t12_b3_d31_count_m_sqrt_asym_sa: {
    id: 't12_b3_d31_count_m_sqrt_asym_sa',
    name: 'Dạng 31: Đếm tham số nguyên m để đồ thị (x + c)/((k - x)√(x - m)) có đúng 2 tiệm cận',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường tiệm cận — Biện luận tham số nguyên (Trả lời ngắn)',
    description:
      'Cho hàm số y = (x + c)/((k - x)√(x - m)). Đếm số giá trị nguyên của tham số m ∈ [-R; R] để đồ thị hàm số có đúng 2 đường tiệm cận.',
    conditionSummary: 'k > -c (tức c + k > 0) và -R < -c < k < R',
    paramSpecs: [
      { name: 'c', label: 'Hằng số c trên tử x + c', min: 1, max: 12 },
      { name: 'k', label: 'Nghiệm mẫu k ở (k - x)', min: 1, max: 10 },
      { name: 'R', label: 'Cận đoạn [-R; R]', min: 25, max: 60, step: 5 },
    ],
    validateCode: `
      const { c, k, R } = params;
      if (R < 15) return { valid: false, reason: 'Đoạn [-R; R] phải đủ rộng (>= 15)' };
      if (!(-R < -c && -c < k && k < R)) {
        return { valid: false, reason: 'Cần -R < -c < k < R để m = -c nằm trong đoạn xét và nhỏ hơn k' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, k, R } = params;
      const numStr = u.formatShift('x', c);
      const negC = -c;
      const count = R - k + 2; // {negC} U {k, k+1, ..., R}

      return {
        stem:
          'Cho hàm số $y = f(x) = \\dfrac{' +
          numStr +
          '}{(' +
          k +
          ' - x)\\sqrt{x - m}}$, với $m$ là tham số. Có tất cả bao nhiêu giá trị nguyên của $m \\in [-' +
          R +
          ';\\, ' +
          R +
          ']$ để đồ thị hàm số có đúng $2$ đường tiệm cận?',
        shortAnswer: '' + count,
        numericValue: count,
        answerSummary: count + ' giá trị',
        solutionSteps: [
          'Tập xác định $D = (m;\\, +\\infty) \\setminus \\{' + k + '\\}$. Ta có $\\lim_{x \\to +\\infty} f(x) = 0$ nên đồ thị luôn có đúng $1$ đường tiệm cận ngang là $y = 0$.',
          'Để đồ thị có đúng $2$ đường tiệm cận thì đồ thị phải có đúng $1$ đường tiệm cận đứng.',
          '• Trường hợp $m = ' + negC + '$: $D = (' + negC + ';\\, +\\infty) \\setminus \\{' + k + '\\}$ và $f(x) = \\dfrac{\\sqrt{' + numStr + '}}{' + k + ' - x}$. Khi đó chỉ có duy nhất một tiệm cận đứng là $x = ' + k + '$ (thỏa mãn).',
          '• Trường hợp $m \\neq ' + negC + '$: $\\lim_{x \\to m^+} |f(x)| = +\\infty$ nên $x = m$ luôn là tiệm cận đứng. Để $x = m$ là tiệm cận đứng duy nhất thì nghiệm $x = ' + k + '$ không thuộc $D$, tức là $m \\ge ' + k + '$.',
          'Kết hợp điều kiện $m \\in \\mathbb{Z}$ và $m \\in [-' + R + ';\\, ' + R + ']$, suy ra $m \\in \\{' + negC + '\\} \\cup \\{' + k + ';\\, ' + (k + 1) + ';\\, \\ldots;\\, ' + R + '\\}$. Vậy có $' + count + '$ giá trị nguyên của $m$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (c=7, k=3, R=50)', params: { c: 7, k: 3, R: 50 }, expectedValid: true },
      { label: 'Biên lỗi -c >= k', params: { c: -5, k: 3, R: 50 }, expectedValid: false },
    ],
  },
};
