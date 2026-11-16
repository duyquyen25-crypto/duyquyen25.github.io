import { MathTemplate } from '../types/math';

export const G12_C1_END_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // PHẦN I. CÂU TRẮC NGHIỆM ĐÚNG - SAI (10 DẠNG: DẠNG 1 -> DẠNG 10)
  // =====================================================================

  // Dạng 1 (Q1)
  t12_bt1_d01_cubic_tf: {
    id: 't12_bt1_d01_cubic_tf',
    name: 'Khảo sát tổng hợp hàm bậc ba (đạo hàm, đơn điệu, cực trị, tiếp tuyến tại điểm uốn)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Khảo sát hàm bậc ba',
    description:
      'Cho f(x) = a·x³ + b·x² + c·x + d có hai điểm cực trị x1 < x2 nguyên và điểm uốn xu nguyên. Xét 4 khẳng định Đúng/Sai về đạo hàm, tính đơn điệu, điểm cực tiểu và hệ số góc tiếp tuyến nhỏ nhất.',
    conditionSummary: 'a ∈ [1; 3], x1 ∈ [-3; 3], halfDist ∈ [1; 4] (x2 = x1 + 2·halfDist), d ∈ [-10; 10]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc ba a', min: 1, max: 3 },
      { name: 'x1', label: 'Điểm cực đại x1', min: -3, max: 3 },
      { name: 'halfDist', label: 'Nửa khoảng cách cực trị', min: 1, max: 4 },
      { name: 'd', label: 'Hệ số tự do d', min: -8, max: 8 },
    ],
    validateCode: `
      const { a, x1, halfDist, d } = params;
      if (a <= 0 || a > 10) return { valid: false, reason: 'Hệ số a phải thuộc [1; 10]' };
      if (x1 < -15 || x1 > 15) return { valid: false, reason: 'x1 ngoài miền [-15; 15]' };
      if (halfDist < 1 || halfDist > 10) return { valid: false, reason: 'halfDist phải ≥ 1 để có hai cực trị phân biệt và điểm uốn nguyên' };
      if (d < -50 || d > 50) return { valid: false, reason: 'Hệ số tự do ngoài miền hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, halfDist, d } = params;
      const x2 = x1 + 2 * halfDist;
      const xu = x1 + halfDist;
      const b = -3 * a * xu;
      const c = 3 * a * x1 * x2;
      const fExpr = u.formatPoly([a, b, c, d]);
      const dfExpr = u.formatPoly([3 * a, 2 * b, c]);
      const ddfExpr = u.formatPoly([6 * a, 2 * b]);
      const yMinVal = a * x2 * x2 * x2 + b * x2 * x2 + c * x2 + d;

      const tfStatements = [
        {
          key: 'a',
          text: "Đạo hàm của hàm số đã cho là $f'(x) = " + dfExpr + '$',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Hàm số nghịch biến trên khoảng $(-\\infty;\\, ' + x1 + ')$',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Điểm cực tiểu của đồ thị hàm số là $A(' + x2 + ';\\, ' + yMinVal + ')$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Tiếp tuyến của đồ thị hàm số tại điểm cực đại có hệ số góc nhỏ nhất trong tất cả các tiếp tuyến',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = ' + fExpr + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Đúng. Ta có $f'(x) = " + dfExpr + '$.',
          "b) Sai. Ta có $f'(x) = " + (3 * a) + '(' + u.formatShift('x', -x1) + ')(' + u.formatShift('x', -x2) + ") > 0$ khi $x < " + x1 + '$ hoặc $x > ' + x2 + '$, nên hàm số đồng biến trên $(-\\infty;\\, ' + x1 + ')$.',
          "c) Đúng. $f'(x)$ đổi dấu từ âm sang dương khi qua $x = " + x2 + '$ và $f(' + x2 + ') = ' + yMinVal + '$, nên điểm cực tiểu là $A(' + x2 + ';\\, ' + yMinVal + ')$.',
          "d) Sai. Ta có $f''(x) = " + ddfExpr + ' = 0 \\Leftrightarrow x = ' + xu + "$ (hoành độ điểm uốn). Vì $f'(x) = " + dfExpr + '$ là tam thức bậc hai có hệ số bậc hai dương nên hệ số góc tiếp tuyến nhỏ nhất tại $x = ' + xu + ' \\neq ' + x1 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên halfDist = 0 (cực trị kép)', params: { a: 1, x1: 1, halfDist: 0, d: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc f(x)=x³-9x²+15x+4', params: { a: 1, x1: 1, halfDist: 2, d: 4 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2)
  t12_bt1_d02_cubic_minmax_extr_line_tf: {
    id: 't12_bt1_d02_cubic_minmax_extr_line_tf',
    name: 'GTLN/GTNN trên đoạn [x1; x2], vị trí hai cực trị và đường thẳng qua hai cực trị',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Cực trị và GTLN-GTNN hàm bậc ba',
    description:
      'Cho hàm bậc ba f(x) có hai điểm cực trị x1 < 0 < x2. Xét các mệnh đề về giá trị nhỏ nhất trên [x1; x2], đạo hàm, vị trí hai cực trị so với trục Oy và hệ số góc đường thẳng qua hai cực trị.',
    conditionSummary: 'a ∈ [1; 3], x1 < 0 < x2 với x2 = x1 + 2·halfDist, d ∈ [-10; 10]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc ba a', min: 1, max: 3 },
      { name: 'x1', label: 'Điểm cực trị âm x1', min: -4, max: -1 },
      { name: 'halfDist', label: 'Nửa khoảng cách cực trị', min: 3, max: 5 },
      { name: 'd', label: 'Hệ số tự do d', min: -8, max: 8 },
    ],
    validateCode: `
      const { a, x1, halfDist, d } = params;
      if (a <= 0 || a > 10) return { valid: false, reason: 'Hệ số a phải thuộc [1; 10]' };
      if (x1 >= 0 || x1 < -15) return { valid: false, reason: 'Cần điểm cực trị thứ nhất x1 < 0' };
      const x2 = x1 + 2 * halfDist;
      if (halfDist < 1 || halfDist > 12 || x2 <= 0) return { valid: false, reason: 'Cần điểm cực trị thứ hai x2 > 0' };
      if (d < -50 || d > 50) return { valid: false, reason: 'Hệ số tự do d ngoài miền hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, halfDist, d } = params;
      const x2 = x1 + 2 * halfDist;
      const xu = x1 + halfDist;
      const b = -3 * a * xu;
      const c = 3 * a * x1 * x2;
      const fExpr = u.formatPoly([a, b, c, d]);
      const dfExpr = u.formatPoly([3 * a, 2 * b, c]);
      const fakeDfExpr = u.formatPoly([3 * a + 2, 2 * b + 2, c]);
      const y1 = a * x1 * x1 * x1 + b * x1 * x1 + c * x1 + d;
      const y2 = a * x2 * x2 * x2 + b * x2 * x2 + c * x2 + d;
      const kTrue = -2 * a * halfDist * halfDist;
      const kFake = kTrue + 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Trên đoạn $[' + x1 + ';\\, ' + x2 + ']$, hàm số đạt giá trị nhỏ nhất bằng $' + y1 + '$',
          isTrue: false,
        },
        {
          key: 'b',
          text: "Đạo hàm của hàm số đã cho là $f'(x) = " + fakeDfExpr + '$',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Hai điểm cực trị của đồ thị hàm số đã cho nằm về hai phía của trục $Oy$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Hệ số góc của đường thẳng đi qua hai điểm cực trị của đồ thị hàm số $y = f(x)$ là $k = ' + kFake + '$',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = ' + fExpr + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Sai. Ta có $f'(x) = " + dfExpr + ' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$. Trên $(' + x1 + ';\\, ' + x2 + ')$ có $f\'(x) < 0$ nên $\\max_{[' + x1 + ';\\,' + x2 + ']} f(x) = f(' + x1 + ') = ' + y1 + '$ và $\\min_{[' + x1 + ';\\,' + x2 + ']} f(x) = f(' + x2 + ') = ' + y2 + '$.',
          "b) Sai. Đạo hàm đúng là $f'(x) = " + dfExpr + ' = ' + (3 * a) + '(' + u.formatShift('x', -x1) + ')(' + u.formatShift('x', -x2) + ')$.',
          'c) Đúng. Hai điểm cực trị là $A(' + x1 + ';\\, ' + y1 + ')$ và $B(' + x2 + ';\\, ' + y2 + ')$. Vì $' + x1 + ' < 0 < ' + x2 + '$ nên $A$ và $B$ nằm về hai phía của trục $Oy$.',
          'd) Sai. Hệ số góc đường thẳng qua hai điểm cực trị là $k = \\frac{f(' + x2 + ') - f(' + x1 + ')}{' + x2 + ' - (' + x1 + ')} = \\frac{' + (y2 - y1) + '}{' + (x2 - x1) + '} = ' + kTrue + ' \\neq ' + kFake + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = 0 (điểm cực trị nằm trên Oy)', params: { a: 1, x1: 0, halfDist: 3, d: -4 }, expectedValid: false },
      { label: 'Biên x2 ≤ 0 (hai cực trị cùng phía trái Oy)', params: { a: 1, x1: -5, halfDist: 2, d: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc f(x)=x³-6x²-15x-4', params: { a: 1, x1: -1, halfDist: 3, d: -4 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3)
  t12_bt1_d03_cubic_bbt_asymptote_tf: {
    id: 't12_bt1_d03_cubic_bbt_asymptote_tf',
    name: 'Đọc bảng biến thiên hàm bậc ba suy ra cực trị, a+b+c+d và tiệm cận hàm hợp M/(f(x)-k)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bảng biến thiên và tiệm cận hàm ẩn',
    description:
      'Cho bảng biến thiên của hàm bậc ba đối xứng qua điểm uốn tại x = 1 (x1 = 1 - h, x2 = 1 + h). Xác định cực đại/cực tiểu, a+b+c+d = f(1) và số đường tiệm cận của g(x) = M / (f(x) - k).',
    conditionSummary: 'h ∈ [1; 3], yCT ∈ [-4; 4], yCD = yCT + 2·halfY (halfY ≥ 2), k ∈ (yCT; yCD)',
    paramSpecs: [
      { name: 'h', label: 'Khoảng cách từ x=1 đến cực trị', min: 1, max: 3 },
      { name: 'yCT', label: 'Giá trị cực tiểu yCT', min: -3, max: 3 },
      { name: 'halfY', label: 'Nửa biên độ cực trị', min: 2, max: 5 },
      { name: 'numM', label: 'Tử số M (2025..2050)', min: 2025, max: 2050 },
    ],
    validateCode: `
      const { h, yCT, halfY, numM } = params;
      if (h < 1 || h > 6) return { valid: false, reason: 'h phải thuộc [1; 6]' };
      if (yCT < -20 || yCT > 20 || halfY < 2 || halfY > 20) return { valid: false, reason: 'Giá trị cực trị ngoài miền hợp lệ' };
      if (numM <= 0 || numM > 5000) return { valid: false, reason: 'Tử số M phải dương hợp lý' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h, yCT, halfY, numM } = params;
      const x1 = 1 - h;
      const x2 = 1 + h;
      const yCD = yCT + 2 * halfY;
      const f1 = yCT + halfY;
      const k = yCT + 1;
      const fakeSum = f1 === 1 ? 2 : 1;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số đạt cực đại tại điểm $x = ' + x2 + '$ và đạt cực tiểu tại điểm $x = ' + x1 + '$',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Hàm số nghịch biến trên khoảng $(-\\infty;\\, ' + x1 + ')$',
          isTrue: false,
        },
        {
          key: 'c',
          text: '$a + b + c + d = ' + fakeSum + '$',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Đồ thị hàm số $y = \\frac{' + numM + '}{' + u.formatShift('f(x)', -k) + '}$ có $4$ đường tiệm cận',
          isTrue: true,
        },
      ];

      return {
        stem: 'Cho hàm số $y = f(x) = ax^3 + bx^2 + cx + d$ có bảng biến thiên như hình vẽ. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ],
          yNodes: [
            { kind: 'single', pos: 'bot', value: '-\\infty' },
            { kind: 'single', pos: 'top', value: '' + yCD },
            { kind: 'single', pos: 'bot', value: '' + yCT },
            { kind: 'single', pos: 'top', value: '+\\infty' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Từ bảng biến thiên, hàm số đạt cực đại tại $x = ' + x1 + '$ và đạt cực tiểu tại $x = ' + x2 + '$.',
          'b) Sai. Hàm số đồng biến trên khoảng $(-\\infty;\\, ' + x1 + ')$.',
          'c) Sai. Điểm uốn là trung điểm của hai điểm cực trị có hoành độ $x_u = \\frac{' + x1 + ' + ' + x2 + '}{2} = 1$, nên $a + b + c + d = f(1) = \\frac{' + yCD + ' + (' + yCT + ')}{2} = ' + f1 + ' \\neq ' + fakeSum + '$.',
          'd) Đúng. Vì $' + yCT + ' < ' + k + ' < ' + yCD + '$ nên phương trình $f(x) = ' + k + '$ có đúng $3$ nghiệm phân biệt (3 tiệm cận đứng). Mặt khác $\\lim_{x \\to \\pm\\infty} \\frac{' + numM + '}{' + u.formatShift('f(x)', -k) + '} = 0$ cho $1$ tiệm cận ngang $y = 0$. Tổng cộng có $4$ đường tiệm cận.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 0 (không có hai cực trị)', params: { h: 0, yCT: 0, halfY: 2, numM: 2046 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc x1=0, x2=2, yCD=4, yCT=0, M=2046', params: { h: 1, yCT: 0, halfY: 2, numM: 2046 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4)
  t12_bt1_d04_cubic_zero_root_tf: {
    id: 't12_bt1_d04_cubic_zero_root_tf',
    name: 'Hàm bậc ba có cực đại tại x=0: cực trị, đơn điệu, GTLN trên [-1;1] và tiệm cận 1/(f(x)-d)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Khảo sát hàm bậc ba & tiệm cận',
    description:
      'Cho f(x) = a·x³ - 3a·k·x² + d với f\'(x) = 3a·x(x - 2k), k ≥ 1. Xét cực trị, khoảng nghịch biến, GTLN trên [-1; 1] và số tiệm cận đứng của 1/(f(x)-d).',
    conditionSummary: 'a ∈ [1; 5], k ∈ [1; 4] (x2 = 2k ≥ 2), d ∈ [-8; 8]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc ba a', min: 1, max: 5 },
      { name: 'k', label: 'Nửa điểm cực tiểu k (x2 = 2k)', min: 1, max: 4 },
      { name: 'd', label: 'Hệ số tự do d', min: -6, max: 6 },
    ],
    validateCode: `
      const { a, k, d } = params;
      if (a < 1 || a > 15) return { valid: false, reason: 'Hệ số a phải thuộc [1; 15]' };
      if (k < 1 || k > 10) return { valid: false, reason: 'Cần k ≥ 1 để x2 = 2k ≥ 2' };
      if (d < -50 || d > 50) return { valid: false, reason: 'Hệ số tự do ngoài miền hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k, d } = params;
      const x2 = 2 * k;
      const b = -3 * a * k;
      const fExpr = u.formatPoly([a, b, 0, d]);
      const fMinusD = u.formatPoly([a, b]);
      const fNeg1 = -a + b + d;
      const fPos1 = a + b + d;
      const root2 = u.simplifyFrac(3 * k, 1);

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số có hai điểm cực trị',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Hàm số nghịch biến trên khoảng $(0;\\, ' + x2 + ')$',
          isTrue: true,
        },
        {
          key: 'c',
          text: '$\\max_{[-1;\\, 1]} y = y(-1)$',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Đồ thị hàm số $y = \\frac{1}{f(x)' + u.formatTrailingConst(-d) + '}$ có $3$ đường tiệm cận đứng',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $y = f(x) = ' + fExpr + '$ có đồ thị $(C)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Đúng. Ta có $f'(x) = " + (3 * a) + 'x(x - ' + x2 + ')$ có hai nghiệm phân biệt $x_1 = 0$ và $x_2 = ' + x2 + '$ nên hàm số có hai điểm cực trị.',
          "b) Đúng. Do $a = " + a + " > 0$, ta có $f'(x) < 0$ với mọi $x \\in (0;\\, " + x2 + ')$ nên hàm số nghịch biến trên khoảng $(0;\\, ' + x2 + ')$.',
          'c) Sai. Trên đoạn $[-1;\\, 1]$ (với $' + x2 + ' \\ge 2$), $x = 0$ là điểm cực đại duy nhất nên $f(-1) = ' + fNeg1 + '$, $f(1) = ' + fPos1 + '$, $f(0) = ' + d + '$. Vậy $\\max_{[-1;\\, 1]} y = f(0) = ' + d + '$.',
          'd) Sai. Ta có $f(x)' + u.formatTrailingConst(-d) + ' = x^2(' + fMinusD + ') = 0 \\Leftrightarrow x = 0$ hoặc $x = ' + root2.latex + '$ (chỉ có $2$ nghiệm phân biệt), nên đồ thị hàm số $y = \\frac{1}{f(x)' + u.formatTrailingConst(-d) + '}$ chỉ có $2$ đường tiệm cận đứng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (nghiệm kép x = 0, không có cực trị)', params: { a: 3, k: 0, d: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc f(x)=3x³-18x²+2', params: { a: 3, k: 2, d: 2 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5)
  t12_bt1_d05_rational_1_1_props_tf: {
    id: 't12_bt1_d05_rational_1_1_props_tf',
    name: 'Hàm phân thức bậc nhất/bậc nhất: TXĐ, tiệm cận ngang, đơn điệu và tích khoảng cách',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm phân thức hữu tỉ (ax+b)/(cx+d)',
    description:
      'Cho y = (ax+b)/(cx+d) với tiệm cận đứng x = x0 nguyên và ad - bc < 0. Xét TXĐ, tiệm cận ngang, chiều biến thiên và tích khoảng cách từ M thuộc (C) đến hai tiệm cận.',
    conditionSummary: 'a, b ∈ [-6; 7], c ∈ [1; 3], x0 ∈ [-4; 4] \\ {0}, d = -c·x0, ad - bc < 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 6 },
      { name: 'b', label: 'Hệ số b', min: 1, max: 7 },
      { name: 'c', label: 'Hệ số c', min: 1, max: 3 },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -3, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, x0 } = params;
      if (c < 1 || c > 6 || x0 === 0 || x0 < -10 || x0 > 10) return { valid: false, reason: 'Tham số mẫu số ngoài miền hợp lệ' };
      if (a < -20 || a > 20 || b < -20 || b > 20) return { valid: false, reason: 'Tham số tử số ngoài miền hợp lệ' };
      const d = -c * x0;
      const det = a * d - b * c;
      if (det >= 0) return { valid: false, reason: 'Cần ad - bc < 0 để hàm số nghịch biến trên từng khoảng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0 } = params;
      const d = -c * x0;
      const det = a * d - b * c;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const tcn = u.simplifyFrac(a, c);
      const prodFrac = u.simplifyFrac(Math.abs(det), c * c);
      const fakeProd = prodFrac.isInteger ? '' + (prodFrac.num + 1) : '$' + u.simplifyFrac(Math.abs(det) + c, c * c).latex + '$';
      const prodDisplay = prodFrac.isInteger ? '$' + prodFrac.num + '$' : '$' + prodFrac.latex + '$';

      const tfStatements = [
        {
          key: 'a',
          text: 'Tập xác định của hàm số là $D = (-\\infty;\\, ' + x0 + ')$',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Đồ thị hàm số có đường tiệm cận ngang là $y = ' + tcn.latex + '$',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Hàm số nghịch biến trên $(-\\infty;\\, ' + x0 + ')$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Tích các khoảng cách từ một điểm $M$ bất kỳ thuộc đồ thị đến hai đường tiệm cận luôn bằng ' + (prodFrac.isInteger ? '$' + (prodFrac.num + 1) + '$' : fakeProd),
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\frac{' + numStr + '}{' + denStr + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Điều kiện xác định $' + denStr + ' \\neq 0 \\Leftrightarrow x \\neq ' + x0 + '$, nên $D = \\mathbb{R} \\setminus \\{' + x0 + '\\}$.',
          'b) Đúng. $\\lim_{x \\to \\pm\\infty} y = ' + tcn.latex + '$, nên tiệm cận ngang là $y = ' + tcn.latex + '$.',
          "c) Đúng. Ta có $y' = \\frac{" + det + '}{(' + denStr + ')^2} < 0,\\; \\forall x \\in D$, nên hàm số nghịch biến trên $(-\\infty;\\, ' + x0 + ')$ (và trên $(' + x0 + ';\\, +\\infty)$).',
          'd) Sai. Tích khoảng cách từ $M(x; y)$ thuộc đồ thị đến TCĐ $x = ' + x0 + '$ và TCN $y = ' + tcn.latex + '$ là $d_1 d_2 = \\left|x - (' + x0 + ')\\right|\\left|y - ' + tcn.latex + '\\right| = \\frac{|ad - bc|}{c^2} = ' + prodFrac.latex + '$ (khác ' + (prodFrac.isInteger ? prodFrac.num + 1 : fakeProd) + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên det = 0 (tử tỷ lệ mẫu, suy biến thành hằng)', params: { a: 2, b: -4, c: 2, x0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc y=(3x+2)/(2x-4)', params: { a: 3, b: 2, c: 2, x0: 2 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6)
  t12_bt1_d06_rational_1_1_graph_tf: {
    id: 't12_bt1_d06_rational_1_1_graph_tf',
    name: 'Hàm phân thức (ax+b)/(cx+d): đạo hàm, TCN, tâm đối xứng và nhận diện đồ thị',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đồ thị hàm phân thức bậc nhất/bậc nhất',
    description:
      'Cho hàm số y = (ax+b)/(cx+d). Kiểm tra đạo hàm, tiệm cận ngang, tâm đối xứng và nhận diện đồ thị minh họa ở khẳng định d.',
    conditionSummary: 'a ∈ [1; 3], b ∈ [-3; 3], c ∈ [-2; -1] hoặc [1; 2], d ∈ [1; 3], ad - bc ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 3 },
      { name: 'b', label: 'Hệ số b', min: -2, max: 3 },
      { name: 'c', label: 'Hệ số c', min: -2, max: -1 },
      { name: 'd', label: 'Hệ số d', min: 1, max: 3 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || c === 0 || Math.abs(a) > 8 || Math.abs(b) > 10 || Math.abs(c) > 6 || Math.abs(d) > 10) {
        return { valid: false, reason: 'Tham số phải khác 0 ở a, c và nằm trong miền gọn' };
      }
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm suy biến thành hàm hằng' };
      const tcd = -d / c;
      const tcn = a / c;
      if (Math.abs(tcd) > 3.5 || Math.abs(tcn) > 3.5) return { valid: false, reason: 'Tâm đối xứng phải nằm gọn trong khung đồ thị [-5; 5]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const det = a * d - b * c;
      const numStr = u.formatLinear(a, b);
      const denStr = d > 0 ? d + u.formatTerm(c, 'x', false) : u.formatLinear(c, d);
      const tcdFrac = u.simplifyFrac(-d, c);
      const tcnFrac = u.simplifyFrac(a, c);
      const fakeTcnVal = -tcnFrac.value;

      const tfStatements = [
        {
          key: 'a',
          text: "Hàm số có $y' = \\frac{" + (-det) + '}{(' + denStr + ')^2}$',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Tiệm cận ngang của đồ thị hàm số đã cho là $x = ' + tcnFrac.latex + '$',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Tâm đối xứng của đồ thị hàm số là điểm $I\\left(' + tcdFrac.latex + ';\\, ' + tcnFrac.latex + '\\right)$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Hàm số có đồ thị là:',
          isTrue: false,
          diagram: {
            kind: 'function_plot',
            curveType: 'rational_2_1',
            coeffs: [0, -a, -b, c, d],
            xMin: -5,
            xMax: 5,
            yMin: -5,
            yMax: 5,
            xTicks: [-4, -2, 2, 4],
            yTicks: [-4, -2, 2, 4],
            verticalAsymptote: tcdFrac.value,
            obliqueAsymptote: { m: 0, q: fakeTcnVal },
          },
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\frac{' + numStr + '}{' + denStr + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Sai. Đạo hàm đúng là $y' = \\frac{" + det + '}{(' + denStr + ')^2}$.',
          'b) Sai. Tiệm cận ngang phải là đường thẳng $y = ' + tcnFrac.latex + '$ (không phải $x = ' + tcnFrac.latex + '$).',
          'c) Đúng. Giao điểm của TCĐ $x = ' + tcdFrac.latex + '$ và TCN $y = ' + tcnFrac.latex + '$ là tâm đối xứng $I\\left(' + tcdFrac.latex + ';\\, ' + tcnFrac.latex + '\\right)$.',
          'd) Sai. Đồ thị trong khẳng định có đường tiệm cận ngang $y = ' + u.simplifyFrac(-a, c).latex + '$ (trái dấu với $y = ' + tcnFrac.latex + '$ của hàm số đã cho).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ad - bc = 0', params: { a: 2, b: -1, c: -2, d: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc y=(x+2)/(1-2x)', params: { a: 1, b: 2, c: -2, d: 1 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7)
  t12_bt1_d07_rational_graph_given_tf: {
    id: 't12_bt1_d07_rational_graph_given_tf',
    name: 'Từ đồ thị hàm nhất biến y=(ax+b)/(x+c) suy ra tiệm cận, đơn điệu, GTNN và dấu hệ số',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đọc đồ thị hàm phân thức',
    description:
      'Cho đồ thị hàm số y = (ax+b)/(x+c) (a, b, c ∈ ℤ) với ac - b > 0. Đánh giá tiệm cận đứng, tính đồng biến, GTNN trên đoạn [u; v] bên trái TCĐ và dấu của a, b, c.',
    conditionSummary: 'a ∈ [1; 2], c ∈ [1; 3], det = ac - b ∈ [2; 6] (b = ac - det)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (TCN y = a)', min: 1, max: 2 },
      { name: 'c', label: 'Hệ số c (TCĐ x = -c)', min: 1, max: 3 },
      { name: 'det', label: 'Định thức ac - b > 0', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, c, det } = params;
      if (a === 0 || Math.abs(a) > 4 || c <= 0 || c > 4) return { valid: false, reason: 'a ≠ 0 và c ∈ [1; 4] để đồ thị hiển thị đẹp' };
      if (det <= 0 || det > 12) return { valid: false, reason: 'Cần ac - b > 0 để hàm đồng biến trên từng khoảng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, det } = params;
      const b = a * c - det;
      const xAsym = -c;
      const uLeft = xAsym - 3;
      const uRight = xAsym - 1;
      const allNeg = a < 0 && b < 0 && c < 0;

      const tfStatements = [
        {
          key: 'a',
          text: 'Đường thẳng $x = ' + c + '$ là đường tiệm cận đứng của đồ thị hàm số.',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Hàm số đồng biến trên từng khoảng xác định',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Hàm số đạt giá trị nhỏ nhất bằng $f(' + uRight + ')$ trên đoạn $[' + uLeft + ';\\, ' + uRight + ']$',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Các số $a, b, c$ không đồng thời âm',
          isTrue: !allNeg,
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\frac{ax + b}{x + c}$ ($a, b, c \\in \\mathbb{Z}$) có đồ thị như hình dưới. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'function_plot',
          curveType: 'rational_2_1',
          coeffs: [0, a, b, 1, c],
          xMin: -6,
          xMax: 4,
          yMin: -4,
          yMax: 4,
          xTicks: [-5, -4, -3, -2, -1, 1, 2, 3],
          yTicks: [-3, -2, -1, 1, 2, 3],
          strokeColor: '#c026d3',
          verticalAsymptote: xAsym,
          obliqueAsymptote: { m: 0, q: a },
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Từ đồ thị, tiệm cận đứng là $x = ' + xAsym + '$ (nên $c = ' + c + '$), tiệm cận ngang là $y = ' + a + '$. Đường thẳng $x = ' + c + '$ không phải tiệm cận đứng.',
          "b) Đúng. Đồ thị đi lên từ trái sang phải trên hai khoảng $(-\\infty;\\, " + xAsym + ')$ và $(' + xAsym + ';\\, +\\infty)$ (hoặc $y\' = \\frac{' + det + '}{(x + ' + c + ')^2} > 0$).',
          'c) Sai. Vì hàm số đồng biến trên $[' + uLeft + ';\\, ' + uRight + ']$ nên giá trị nhỏ nhất đạt tại $x = ' + uLeft + '$, tức $\\min = f(' + uLeft + ')$.',
          'd) ' + (!allNeg ? 'Đúng' : 'Sai') + '. Đồ thị có $y = \\frac{' + u.formatLinear(a, b) + '}{' + u.formatShift('x', c) + '}$, tức $a = ' + a + ',\\, b = ' + b + ',\\, c = ' + c + '$, không đồng thời âm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0 (không khớp tiệm cận x = -c khác c)', params: { a: 1, c: 0, det: 5 }, expectedValid: false },
      { label: 'Biên det = 0 (đồ thị suy biến đường thẳng)', params: { a: 1, c: 2, det: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=1, b=-3, c=2', params: { a: 1, c: 2, det: 5 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8)
  t12_bt1_d08_bbt_restricted_domain_tf: {
    id: 't12_bt1_d08_bbt_restricted_domain_tf',
    name: 'Bảng biến thiên có miền gạch chéo không xác định: nghiệm, cực trị, tiệm cận hàm hợp',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đọc bảng biến thiên nâng cao',
    description:
      'Cho bảng biến thiên xác định trên (x1; x2) ∪ (x2; +∞) với y(x1+) = y1 < 0, lim(x→x2-) = +∞, y(x2+) = y2 > 0, lim(x→+∞) = -∞. Xét số giao điểm Ox, cực trị tại x2, đồng biến và tiệm cận k/(f(x)-y2).',
    conditionSummary: 'x1 < x2, y1 < 0 < y2, k > 0, yWrong ≠ 0',
    paramSpecs: [
      { name: 'x1', label: 'Điểm biên trái x1', min: -9, max: -4 },
      { name: 'dx', label: 'Khoảng cách x2 - x1', min: 3, max: 8 },
      { name: 'y1', label: 'Giới hạn phải tại x1 (âm)', min: -4, max: -1 },
      { name: 'y2', label: 'Giới hạn phải tại x2 (dương)', min: 2, max: 8 },
      { name: 'kNum', label: 'Tử số k của g(x)', min: 3, max: 12 },
    ],
    validateCode: `
      const { x1, dx, y1, y2, kNum } = params;
      if (x1 < -30 || x1 > 10 || dx < 1 || dx > 20) return { valid: false, reason: 'Khoảng biến thiên không hợp lệ' };
      if (y1 >= 0 || y1 < -20 || y2 <= 0 || y2 > 20) return { valid: false, reason: 'Cần y1 < 0 < y2 để có đúng 2 giao điểm với trục hoành' };
      if (kNum <= 0 || kNum > 100) return { valid: false, reason: 'Tử số k phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, dx, y1, y2, kNum } = params;
      const x2 = x1 + dx;
      const yWrong = -2;

      const tfStatements = [
        {
          key: 'a',
          text: 'Số giao điểm của đồ thị và trục hoành là $2$',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Điểm $x = ' + x2 + '$ là điểm cực đại của hàm số $y = f(x)$',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Hàm số đồng biến trên khoảng $(' + x1 + ';\\, ' + x2 + ')$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Đồ thị hàm số $y = \\frac{' + kNum + '}{f(x) - ' + y2 + '}$ có đường tiệm cận đứng là $x = ' + x1 + '$ và tiệm cận ngang là $y = ' + yWrong + '$',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $y = f(x)$ có bảng biến thiên như hình vẽ sau. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'variation_table',
          derivLabel: "f'(x)",
          funcLabel: 'f(x)',
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: 'hatched' },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: '+' },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: '-' },
          ],
          yNodes: [
            { kind: 'single', pos: 'mid', value: '' },
            { kind: 'asymptote', leftPos: 'bot', leftVal: '', rightPos: 'bot', rightVal: '' + y1 },
            { kind: 'asymptote', leftPos: 'top', leftVal: '+\\infty', rightPos: 'top', rightVal: '' + y2 },
            { kind: 'single', pos: 'bot', value: '-\\infty' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đúng. Trên $(' + x1 + ';\\, ' + x2 + ')$, $f(x)$ tăng liên tục từ $' + y1 + ' < 0$ lên $+\\infty$ (cắt $Ox$ tại 1 điểm); trên $(' + x2 + ';\\, +\\infty)$, $f(x)$ giảm liên tục từ $' + y2 + ' > 0$ xuống $-\\infty$ (cắt $Ox$ tại 1 điểm). Tổng cộng có $2$ giao điểm với $Ox$.',
          'b) Sai. Hàm số không xác định tại $x = ' + x2 + '$ (có hai gạch đứng tại $x = ' + x2 + '$) nên $x = ' + x2 + '$ không phải điểm cực đại.',
          "c) Đúng. Trên khoảng $(" + x1 + ';\\, ' + x2 + ")$, ta có $f'(x) > 0$ nên hàm số đồng biến.",
          'd) Sai. Vì $\\lim_{x \\to ' + x2 + '^+} f(x) = ' + y2 + '$ (nên $x = ' + x2 + '$ là TCĐ, còn tại $x \\to ' + x1 + '^+$ thì $f(x) \\to ' + y1 + ' \\neq ' + y2 + '$ nên $x = ' + x1 + '$ không là TCĐ) và $\\lim_{x \\to +\\infty} \\frac{' + kNum + '}{f(x) - ' + y2 + '} = 0$ nên tiệm cận ngang là $y = 0 \\neq ' + yWrong + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y1 ≥ 0 (chỉ có 1 giao điểm với Ox)', params: { x1: -7, dx: 6, y1: 1, y2: 5, kNum: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc x1=-7, x2=-1, y1=-1, y2=5', params: { x1: -7, dx: 6, y1: -1, y2: 5, kNum: 7 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9)
  t12_bt1_d09_rational_2_1_minmax_asym_tf: {
    id: 't12_bt1_d09_rational_2_1_minmax_asym_tf',
    name: 'Hàm bậc 2/bậc 1: đạo hàm, tiệm cận đứng, GTLN/GTNN trên đoạn và giao hai tiệm cận',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hàm phân thức bậc 2 trên bậc 1',
    description:
      'Cho f(x) = (x + m) + r²/(x - x0) với r chẵn (r = 2k ≥ 2). Xét đạo hàm, tiệm cận đứng, GTLN/GTNN trên [x0+1; x0+2r] và giao điểm hai đường tiệm cận.',
    conditionSummary: 'x0 ∈ [-3; 5], m ∈ [-4; 4], k ∈ [1; 2] (r = 2k chẵn để các giá trị đầu mút nguyên)',
    paramSpecs: [
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -3, max: 5 },
      { name: 'm', label: 'Hệ số tự do m trong TCX y=x+m', min: -4, max: 4 },
      { name: 'k', label: 'Tham số r = 2k (1 hoặc 2)', min: 1, max: 2 },
    ],
    validateCode: `
      const { x0, m, k } = params;
      if (x0 < -15 || x0 > 15 || m < -15 || m > 15) return { valid: false, reason: 'x0, m ngoài miền hợp lệ' };
      if (k < 1 || k > 4) return { valid: false, reason: 'k phải thuộc [1; 4]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, m, k } = params;
      const r = 2 * k;
      const rSq = r * r;
      // Numerator: (x + m)(x - x0) + r^2 = x^2 + (m - x0)x + (r^2 - m*x0)
      const B = m - x0;
      const C = rSq - m * x0;
      const numStr = u.formatQuadratic(1, B, C);
      const denStr = u.formatShift('x', -x0);
      // Derivative num: (x - x0)^2 - r^2 = x^2 - 2*x0*x + (x0^2 - r^2)
      const dNumTrue = u.formatQuadratic(1, -2 * x0, x0 * x0 - rSq);
      const dNumFake = u.formatQuadratic(1, -2 * x0, x0 * x0);
      const aInt = x0 + 1;
      const bInt = x0 + 2 * r;
      const xCrit = x0 + r;
      const valLeft = x0 + 1 + m + rSq;
      const valCrit = x0 + m + 2 * r;
      const valRight = x0 + m + 2 * r + k; // r + r^2/(2r) = r + k -> x0+2r+m+k
      const maxVal = Math.max(valLeft, valRight);
      const minVal = valCrit;
      const yInter = x0 + m;
      const yInterFake = yInter === -1 ? -3 : -yInter === yInter ? yInter - 2 : -1;

      const tfStatements = [
        {
          key: 'a',
          text: "$y' = \\frac{" + dNumFake + '}{(' + denStr + ')^2}$',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Đồ thị hàm số có một đường tiệm cận đứng là $x = ' + (x0 - 1) + '$',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Trên đoạn $[' + aInt + ';\\, ' + bInt + ']$, hàm số có giá trị lớn nhất bằng $' + maxVal + '$ và giá trị nhỏ nhất bằng $' + minVal + '$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Giao điểm của hai đường tiệm cận của đồ thị hàm số là điểm $I(' + x0 + ';\\, ' + yInterFake + ')$',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $y = f(x) = \\frac{' + numStr + '}{' + denStr + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Sai. Ta có $y = " + u.formatLinear(1, m) + ' + \\frac{' + rSq + '}{' + denStr + "}$ nên $y' = 1 - \\frac{" + rSq + '}{(' + denStr + ')^2} = \\frac{' + dNumTrue + '}{(' + denStr + ')^2}$.',
          'b) Sai. Vì $\\lim_{x \\to ' + x0 + '^+} f(x) = +\\infty$ nên tiệm cận đứng của đồ thị hàm số là $x = ' + x0 + '$.',
          "c) Đúng. Trên đoạn $[" + aInt + ';\\, ' + bInt + "]$, giải $y' = 0 \\Leftrightarrow x = " + xCrit + '$. Ta có $f(' + aInt + ') = ' + valLeft + '$, $f(' + xCrit + ') = ' + valCrit + '$, $f(' + bInt + ') = ' + valRight + '$. Do đó $\\max = ' + maxVal + '$ và $\\min = ' + minVal + '$.',
          'd) Sai. Tiệm cận đứng là $x = ' + x0 + '$ và tiệm cận xiên là $y = ' + u.formatLinear(1, m) + '$. Giao điểm là $I(' + x0 + ';\\, ' + yInter + ') \\neq I(' + x0 + ';\\, ' + yInterFake + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (r = 0 làm phân thức suy biến thành đường thẳng)', params: { x0: 2, m: -1, k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc y=(x²-3x+6)/(x-2)', params: { x0: 2, m: -1, k: 1 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10)
  t12_bt1_d10_rational_2_1_int_pts_tf: {
    id: 't12_bt1_d10_rational_2_1_int_pts_tf',
    name: 'Hàm bậc 2/bậc 1: TXĐ, tiệm cận đứng, tâm đối xứng và đếm số điểm tọa độ nguyên',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Điểm nguyên trên đồ thị phân thức',
    description:
      'Cho f(x) = a1(x - x0) + y0 + k/(x - x0) với a1 ∈ {-1, 1} và k ∈ {-6, -4, -3, -2, 2, 3, 4, 6}. Xét TXĐ, tiệm cận đứng, tâm đối xứng I(x0; y0) và số điểm nguyên trên đồ thị.',
    conditionSummary: 'a1 ∈ {-1, 1}, x0 ∈ [-4; 4], y0 ∈ [-5; 5], kIdx ∈ [0; 7] chọn k ∈ {±2, ±3, ±4, ±6}',
    paramSpecs: [
      { name: 'a1Sign', label: 'Dấu hệ số bậc 2 (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
      { name: 'x0', label: 'Hoành độ tâm x0', min: -4, max: 4 },
      { name: 'y0', label: 'Tung độ tâm y0', min: -4, max: 5 },
      { name: 'kIdx', label: 'Chỉ số số dư k (0..7)', min: 0, max: 7 },
    ],
    validateCode: `
      const { a1Sign, x0, y0, kIdx } = params;
      if (a1Sign !== -1 && a1Sign !== 1) return { valid: false, reason: 'a1Sign chỉ nhận giá trị -1 hoặc 1' };
      if (x0 < -12 || x0 > 12 || y0 < -12 || y0 > 12) return { valid: false, reason: 'Tâm đối xứng ngoài miền hợp lệ' };
      if (kIdx < 0 || kIdx > 7) return { valid: false, reason: 'Chỉ số kIdx ngoài [0; 7]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1Sign, x0, y0, kIdx } = params;
      const kList = [-2, 2, -3, 3, -4, 4, -6, 6];
      const k = kList[kIdx];
      // Expand: a1Sign*(x-x0)^2 + y0*(x-x0) + k = a1Sign*x^2 + (y0 - 2*a1Sign*x0)x + (a1Sign*x0^2 - y0*x0 + k)
      const B = y0 - 2 * a1Sign * x0;
      const C = a1Sign * x0 * x0 - y0 * x0 + k;
      const numStr = u.formatQuadratic(a1Sign, B, C);
      const denStr = u.formatShift('x', -x0);
      const absK = Math.abs(k);
      let divCount = 0;
      for (let d = 1; d <= absK; d++) {
        if (absK % d === 0) divCount += 2;
      }
      const wrongCount = divCount / 2;
      const linSym = a1Sign === 1 ? '(' + denStr + ')' : '-(' + denStr + ')';
      const splitForm = linSym + u.formatTrailingConst(y0) + ' + \\frac{' + k + '}{' + denStr + '}';

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số $f(x)$ có tập xác định là $\\mathbb{R} \\setminus \\{' + x0 + '\\}$',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Đồ thị $(C)$ có đường tiệm cận đứng $x = ' + x0 + '$',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Tâm đối xứng của đồ thị hàm số là $I(' + x0 + ';\\, ' + y0 + ')$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Trên đồ thị $(C)$ tồn tại đúng $' + wrongCount + '$ điểm có tọa độ nguyên',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $y = f(x) = \\frac{' + numStr + '}{' + denStr + '}$ có đồ thị $(C)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đúng. Điều kiện xác định là $' + denStr + ' \\neq 0 \\Leftrightarrow x \\neq ' + x0 + '$, nên tập xác định là $\\mathbb{R} \\setminus \\{' + x0 + '\\}$.',
          'b) Đúng. Ta có $\\lim_{x \\to ' + x0 + '^+} f(x)$ và $\\lim_{x \\to ' + x0 + '^-} f(x)$ đều vô cực nên $x = ' + x0 + '$ là tiệm cận đứng.',
          'c) Đúng. Chia đa thức ta được $y = ' + splitForm + '$. Giao điểm của TCĐ $x = ' + x0 + '$ và TCX $y = ' + linSym + u.formatTrailingConst(y0) + '$ là $I(' + x0 + ';\\, ' + y0 + ')$.',
          'd) Sai. Với $x \\in \\mathbb{Z}$, $y \\in \\mathbb{Z} \\Leftrightarrow \\frac{' + k + '}{' + denStr + '} \\in \\mathbb{Z} \\Leftrightarrow ' + denStr + '$ là ước nguyên của $' + k + '$. Số $' + k + '$ có tất cả $' + divCount + '$ ước nguyên (gồm cả ước âm và dương), nên có đúng $' + divCount + '$ điểm nguyên trên $(C)$, không phải $' + wrongCount + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a1Sign = 0 (không phải hàm bậc 2/bậc 1)', params: { a1Sign: 0, x0: 2, y0: 4, kIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc y=(-x²+8x-14)/(x-2)', params: { a1Sign: -1, x0: 2, y0: 4, kIdx: 0 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // PHẦN II. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (4 DẠNG: DẠNG 11 -> DẠNG 14)
  // =====================================================================

  // Dạng 11 (Q11)
  t12_bt1_d11_trapezoid_in_square_sa: {
    id: 't12_bt1_d11_trapezoid_in_square_sa',
    name: 'Diện tích nhỏ nhất của hình thang MNPQ nội tiếp hình vuông ABCD',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hình học phẳng',
    description:
      'Tấm bìa hình vuông ABCD cạnh a, tạo hình thang MNPQ (MN // PQ) với AN = p (trên AB), BP = q (trên BC). Tính diện tích nhỏ nhất của hình thang MNPQ (làm tròn hàng phần mười).',
    conditionSummary: '0 < p < a, 0 < q < a, điểm cực tiểu u0 = √(p·q·(a-q)/(a-p)) thuộc miền [p(a-q)/a; a], tránh sát ngưỡng .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh hình vuông a (cm)', min: 8, max: 16, step: 2 },
      { name: 'p', label: 'Độ dài AN = p (cm)', min: 2, max: 6 },
      { name: 'q', label: 'Độ dài BP = q (cm)', min: 2, max: 7 },
    ],
    validateCode: `
      const { a, p, q } = params;
      if (a < 4 || a > 60 || p <= 0 || q <= 0 || p >= a || q >= a) {
        return { valid: false, reason: 'Cần 0 < p < a và 0 < q < a' };
      }
      const uMin = (p * (a - q)) / a;
      const u0 = Math.sqrt((p * q * (a - q)) / (a - p));
      if (u0 <= uMin + 0.05 || u0 >= a - 0.05) {
        return { valid: false, reason: 'Điểm cực tiểu phải nằm trong khoảng (uMin; a)' };
      }
      const sMin = 0.5 * (a * a - (a - p) * q - p * (a - q)) + Math.sqrt((a - p) * p * q * (a - q));
      const frac = sMin * 10 - Math.floor(sMin * 10);
      if (Math.abs(frac - 0.5) < 0.0002) {
        return { valid: false, reason: 'Tránh giá trị sát ngưỡng làm tròn ,x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p, q } = params;
      const c1 = a - p;
      const c2 = a - q;
      const uMin = Number(((p * c2) / a).toFixed(2));
      const mMax = Number((a - uMin).toFixed(2));
      const baseConst = (a * a - c1 * q - p * c2) / 2;
      const prod = c1 * p * q * c2;
      const sMinExact = baseConst + Math.sqrt(prod);
      const ans = Number(sMinExact.toFixed(1));
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem:
          'Một tấm bìa hình vuông $ABCD$ có cạnh bằng $' +
          a +
          '$ cm. Bạn An muốn tạo thành một hình thang $MNPQ$ ($MN \\parallel PQ$) biết $M, N, P, Q$ lần lượt nằm trên các cạnh $AD, AB, BC, CD$ như hình minh họa sao cho đoạn $AN = ' +
          p +
          '$ cm, $BP = ' +
          q +
          '$ cm. Tính diện tích hình thang $MNPQ$ nhỏ nhất bạn An có thể tạo được (làm tròn kết quả đến hàng phần mười của $\\text{cm}^2$).',
        diagram: { kind: 'geometry_figure', figureType: 'trapezoid_square', params: { a, p, q } },
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' cm²',
        solutionSteps: [
          'Chọn hệ trục với $D(0; 0),\\, C(' + a + '; 0),\\, B(' + a + '; ' + a + '),\\, A(0; ' + a + ')$. Khi đó $N(' + p + '; ' + a + ')$, $P(' + a + '; ' + c2 + ')$, đặt $M(0; m)$ và $Q(q_{\\text{t}}; 0)$ với $0 \\le m, q_{\\text{t}} \\le ' + a + '$.',
          'Điều kiện $MN \\parallel PQ$ cho $\\frac{' + a + ' - m}{' + p + '} = \\frac{' + (-c2) + '}{q_{\\text{t}} - ' + a + '} \\Rightarrow q_{\\text{t}} = ' + a + ' - \\frac{' + (p * c2) + '}{' + a + ' - m} \\ge 0 \\Rightarrow 0 \\le m \\le ' + u.formatNumberVN(mMax, 2) + '$.',
          'Đặt $u = ' + a + ' - m \\in [' + u.formatNumberVN(uMin, 2) + ';\\, ' + a + ']$, diện tích hình thang là $S(u) = ' + u.formatNumberVN(baseConst, 1) + ' + \\frac{' + c1 + '}{2}u + \\frac{' + u.formatNumberVN((p * q * c2) / 2, 1) + '}{u}$.',
          'Áp dụng bất đẳng thức Cô-si (hoặc khảo sát hàm trên đoạn), ta có $S_{\\min} = ' + u.formatNumberVN(baseConst, 1) + ' + \\sqrt{' + prod + '} \\approx ' + u.formatNumberVN(sMinExact, 3) + ' \\approx ' + ansStr + '$ $\\text{cm}^2$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p ≥ a (N nằm ngoài cạnh AB)', params: { a: 10, p: 10, q: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=10, AN=3, BP=4 -> 49,4 cm²', params: { a: 10, p: 3, q: 4 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12)
  t12_bt1_d12_semicircle_boat_max_time_sa: {
    id: 't12_bt1_d12_semicircle_boat_max_time_sa',
    name: 'Thời gian chậm nhất đi từ P đến R trên bờ hồ bán nguyệt (chèo thuyền kết hợp chạy bộ)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'GTLN bài toán chuyển động trên đường tròn',
    description:
      'Bờ hồ bán nguyệt bán kính R, đường kính PR. Chèo thuyền từ P đến Q với vận tốc v1 rồi chạy bộ cung QR với vận tốc v2 (v2 > v1). Tìm thời gian chậm nhất từ P đến R (làm tròn hàng phần chục).',
    conditionSummary: 'R ∈ [2; 8], v1 ∈ [2; 6], v2 > v1 (mặc định v2 = mult·v1 hoặc tổng quát), tránh sát ngưỡng .x5',
    paramSpecs: [
      { name: 'R', label: 'Bán kính hồ R (km)', min: 2, max: 6 },
      { name: 'v1', label: 'Vận tốc chèo thuyền v1 (km/h)', min: 2, max: 6 },
      { name: 'v2', label: 'Vận tốc chạy bộ v2 (km/h)', min: 5, max: 14 },
    ],
    validateCode: `
      const { R, v1, v2 } = params;
      if (R < 1 || R > 50 || v1 < 1 || v1 > 50 || v2 <= v1 || v2 > 80) {
        return { valid: false, reason: 'Cần R > 0 và vận tốc chạy v2 > v1 > 0' };
      }
      const phi = Math.asin(v1 / v2);
      const tMax = (2 * R * Math.cos(phi)) / v1 + (2 * R * phi) / v2;
      const frac = tMax * 10 - Math.floor(tMax * 10);
      if (Math.abs(frac - 0.5) < 0.025) {
        return { valid: false, reason: 'Tránh giá trị sát ngưỡng làm tròn ,x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, v1, v2 } = params;
      const diam = 2 * R;
      const sinRatio = u.simplifyFrac(v1, v2);
      const phi = Math.asin(v1 / v2);
      const tMax = (diam * Math.cos(phi)) / v1 + (diam * phi) / v2;
      const ans = Number(tMax.toFixed(1));
      const ansStr = u.formatNumberVN(ans, 1);
      const cBoat = u.simplifyFrac(diam, v1);
      const cRun = u.simplifyFrac(diam, v2);
      const isHalf = v2 === 2 * v1;
      const phiLatex = isHalf ? '\\frac{\\pi}{6}' : '\\arcsin\\left(' + sinRatio.latex + '\\right)';

      return {
        stem:
          'Cho một bờ hồ hình bán nguyệt có bán kính bằng $' +
          R +
          '$ km, đường kính $PR$ như hình vẽ dưới đây. Từ điểm $P$ anh Tài chèo một chiếc thuyền với vận tốc $' +
          v1 +
          '$ km/h đến điểm $Q$ trên bờ hồ, rồi chạy bộ dọc theo thành hồ đến vị trí $R$ với vận tốc $' +
          v2 +
          '$ km/h. Thời gian chậm nhất mà anh Tài di chuyển từ $P$ đến $R$ là bao nhiêu? (Thời gian tính bằng giờ và làm tròn kết quả đến hàng phần chục).',
        diagram: { kind: 'geometry_figure', figureType: 'semicircle_boat_path', params: { R } },
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' giờ',
        solutionSteps: [
          'Đặt $\\widehat{QPR} = \\varphi$ (rad), $\\varphi \\in \\left(0;\\, \\frac{\\pi}{2}\\right)$. Tam giác $PQR$ vuông tại $Q$ nên $PQ = ' + diam + '\\cos\\varphi$, và cung $QR$ có số đo góc ở tâm $2\\varphi$ nên độ dài bằng $' + diam + '\\varphi$.',
          'Tổng thời gian di chuyển là $t(\\varphi) = ' + cBoat.latex + '\\cos\\varphi + ' + cRun.latex + '\\varphi$ trên $\\left(0;\\, \\frac{\\pi}{2}\\right)$.',
          "Đạo hàm $t'(\\varphi) = -" + cBoat.latex + '\\sin\\varphi + ' + cRun.latex + ' = 0 \\Leftrightarrow \\sin\\varphi = ' + sinRatio.latex + ' \\Leftrightarrow \\varphi = ' + phiLatex + '$.',
          'Lập bảng biến thiên suy ra thời gian chậm nhất đạt tại $\\varphi = ' + phiLatex + '$ và $t_{\\max} \\approx ' + u.formatNumberVN(tMax, 3) + ' \\approx ' + ansStr + '$ giờ.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v2 ≤ v1 (không tồn tại điểm dừng trong (0; π/2))', params: { R: 2, v1: 5, v2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc R=2, v1=3, v2=6 -> 1,5 giờ', params: { R: 2, v1: 3, v2: 6 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13)
  t12_bt1_d13_ladder_over_prop_sa: {
    id: 't12_bt1_d13_ladder_over_prop_sa',
    name: 'Chiều dài bé nhất của cái thang tựa tường vượt qua cột đỡ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hình học - cái thang',
    description:
      'Tìm chiều dài bé nhất của cái thang tựa tường thẳng đứng và mặt đất nằm ngang, đi qua đỉnh cột đỡ cao h m, đặt song song và cách tường d m (làm tròn đến hàng phần trăm).',
    conditionSummary: 'h = h10/10 ∈ [2,5; 6,0], d = d10/10 ∈ [0,4; 2,0], L_min = (h^(2/3) + d^(2/3))^(3/2), tránh sát ngưỡng .xx5',
    paramSpecs: [
      { name: 'h10', label: 'Chiều cao cột đỡ · 10 (m)', min: 25, max: 60, step: 5 },
      { name: 'd10', label: 'Khoảng cách tới tường · 10 (m)', min: 4, max: 20, step: 2 },
    ],
    validateCode: `
      const { h10, d10 } = params;
      if (h10 <= 0 || h10 > 300 || d10 <= 0 || d10 > 200) {
        return { valid: false, reason: 'Chiều cao cột đỡ và khoảng cách phải dương hợp lý' };
      }
      const h = h10 / 10;
      const d = d10 / 10;
      const lMin = Math.pow(Math.pow(h, 2 / 3) + Math.pow(d, 2 / 3), 1.5);
      const frac = lMin * 100 - Math.floor(lMin * 100);
      if (Math.abs(frac - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh giá trị sát ngưỡng làm tròn ,xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h10, d10 } = params;
      const h = Number((h10 / 10).toFixed(1));
      const d = Number((d10 / 10).toFixed(1));
      const hStr = u.formatNumberVN(h, 1);
      const dStr = u.formatNumberVN(d, 1);
      const xOpt = Math.cbrt(d * h * h);
      const lMin = Math.pow(Math.pow(h, 2 / 3) + Math.pow(d, 2 / 3), 1.5);
      const ans = Number(lMin.toFixed(2));
      const ansStr = u.formatNumberVN(ans, 2);

      return {
        stem:
          'Tìm chiều dài bé nhất của cái thang để nó có thể tựa vào tường và mặt đất, ngang qua cột đỡ cao $' +
          hStr +
          '$ m, song song và cách tường $' +
          dStr +
          '$ m kể từ gốc của cột đỡ như hình vẽ. Kết quả làm tròn đến hàng phần trăm.',
        diagram: { kind: 'geometry_figure', figureType: 'ladder_wall_prop', params: { h, d } },
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' m',
        solutionSteps: [
          'Đặt $HC = x > 0$ (m), suy ra $BC = x + ' + dStr + '$. Theo định lí Thales: $\\frac{HC}{BC} = \\frac{MH}{AB} \\Rightarrow AB = \\frac{' + hStr + '(x + ' + dStr + ')}{x}$.',
          'Theo định lí Pythagore trong tam giác vuông $ABC$: $AC^2 = f(x) = (x + ' + dStr + ')^2\\left(1 + \\frac{' + u.formatNumberVN(h * h, 2) + '}{x^2}\\right)$.',
          "Giải $f'(x) = 0$ với $x > 0$ thu được $x^3 = " + dStr + ' \\cdot ' + u.formatNumberVN(h * h, 2) + ' = ' + u.formatNumberVN(d * h * h, 3) + ' \\Rightarrow x \\approx ' + u.formatNumberVN(xOpt, 3) + '$ m.',
          'Suy ra $AC_{\\min} = \\left(' + hStr + '^{2/3} + ' + dStr + '^{2/3}\\right)^{3/2} \\approx ' + u.formatNumberVN(lMin, 4) + ' \\approx ' + ansStr + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0 (cột đỡ sát tường)', params: { h10: 40, d10: 0 }, expectedValid: false },
      { label: 'Biên h = 0 (cột đỡ cao bằng 0)', params: { h10: 0, d10: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc h=4, d=0,5 -> 5,59 m', params: { h10: 40, d10: 5 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14)
  t12_bt1_d14_parabola_pond_bridge_sa: {
    id: 't12_bt1_d14_parabola_pond_bridge_sa',
    name: 'Độ dài cầu ngắn nhất từ bờ parabol của cái ao đến mảnh vườn hình tròn',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị khoảng cách đường cong - đường tròn',
    description:
      'Ao hình ABCDE có bờ AB là parabol đỉnh A trên trục OA = a0, qua B trên trục OB = b0. Mảnh vườn tròn tâm I(xI; yI) bán kính R. Tính độ dài ngắn nhất từ bờ parabol đến mảnh vườn.',
    conditionSummary: 'xI > b0 + R, yI > R, min IM > R + 2, tránh sát ngưỡng .x5',
    paramSpecs: [
      { name: 'a0', label: 'Độ dài OA (m)', min: 30, max: 50, step: 5 },
      { name: 'b0', label: 'Độ dài OB (m)', min: 15, max: 25, step: 5 },
      { name: 'xI', label: 'Hoành độ tâm vườn xI (m)', min: 35, max: 50, step: 5 },
      { name: 'yI', label: 'Tung độ tâm vườn yI (m)', min: 25, max: 40, step: 5 },
      { name: 'R', label: 'Bán kính vườn tròn R (m)', min: 6, max: 12, step: 2 },
    ],
    validateCode: `
      const { a0, b0, xI, yI, R } = params;
      if (a0 < 10 || a0 > 200 || b0 < 5 || b0 > 100 || R <= 0 || R > 50) {
        return { valid: false, reason: 'Kích thước ao hoặc bán kính R ngoài miền hợp lệ' };
      }
      if (xI <= b0 + R || yI <= R) {
        return { valid: false, reason: 'Tâm vườn phải nằm đủ sâu bên phải B và phía trên bờ OC' };
      }
      const k = a0 / (b0 * b0);
      const distSq = (t) => {
        const y = a0 - k * t * t;
        return (t - xI) * (t - xI) + (y - yI) * (y - yI);
      };
      let bestSq = Math.min(distSq(0), distSq(b0));
      const df = (t) => 4 * k * k * t * t * t + 2 * (1 - 2 * k * (a0 - yI)) * t - 2 * xI;
      const steps = 300;
      for (let i = 0; i < steps; i++) {
        let lo = (b0 * i) / steps;
        let hi = (b0 * (i + 1)) / steps;
        let fLo = df(lo);
        let fHi = df(hi);
        if (fLo === 0) bestSq = Math.min(bestSq, distSq(lo));
        if (fLo * fHi < 0) {
          for (let it = 0; it < 45; it++) {
            const mid = (lo + hi) / 2;
            const fMid = df(mid);
            if (fLo * fMid <= 0) {
              hi = mid;
              fHi = fMid;
            } else {
              lo = mid;
              fLo = fMid;
            }
          }
          bestSq = Math.min(bestSq, distSq((lo + hi) / 2));
        }
      }
      const lMin = Math.sqrt(bestSq) - R;
      if (lMin <= 2) return { valid: false, reason: 'Mảnh vườn phải cách bờ parabol ít nhất 2 m' };
      const frac = lMin * 10 - Math.floor(lMin * 10);
      if (Math.abs(frac - 0.5) < 0.025) return { valid: false, reason: 'Tránh giá trị sát ngưỡng làm tròn ,x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a0, b0, xI, yI, R } = params;
      const k = a0 / (b0 * b0);
      const kFrac = u.simplifyFrac(a0, b0 * b0);
      const distSq = (t) => {
        const y = a0 - k * t * t;
        return (t - xI) * (t - xI) + (y - yI) * (y - yI);
      };
      const df = (t) => 4 * k * k * t * t * t + 2 * (1 - 2 * k * (a0 - yI)) * t - 2 * xI;

      let minSq = distSq(0);
      const rightSq = distSq(b0);
      if (rightSq < minSq) minSq = rightSq;

      const steps = 400;
      for (let i = 0; i < steps; i++) {
        let lo = (b0 * i) / steps;
        let hi = (b0 * (i + 1)) / steps;
        let fLo = df(lo);
        let fHi = df(hi);
        if (fLo === 0) {
          const v = distSq(lo);
          if (v < minSq) minSq = v;
        }
        if (fLo * fHi < 0) {
          for (let it = 0; it < 50; it++) {
            const mid = (lo + hi) / 2;
            const fMid = df(mid);
            if (fLo * fMid <= 0) {
              hi = mid;
              fHi = fMid;
            } else {
              lo = mid;
              fLo = fMid;
            }
          }
          const v = distSq((lo + hi) / 2);
          if (v < minSq) minSq = v;
        }
      }

      const lMin = Math.sqrt(minSq) - R;
      const ans = Number(lMin.toFixed(1));
      const ansStr = u.formatNumberVN(ans, 1);

      const dy = a0 - yI;
      const c4 = u.simplifyFrac(a0 * a0, Math.pow(b0, 4));
      const c2 = 1 - 2 * k * dy;
      const c0 = xI * xI + dy * dy;
      const paraEq = (kFrac.isInteger ? (kFrac.num === 1 ? '-' : '-' + kFrac.num) : '-' + kFrac.latex) + 'x^2 + ' + a0;
      const c2Term = Math.abs(c2) < 1e-9 ? '' : c2 < 0 ? ' - ' + (Math.abs(c2) === 1 ? '' : u.formatNumberVN(Math.abs(c2), 3)) + 't^2' : ' + ' + (c2 === 1 ? '' : u.formatNumberVN(c2, 3)) + 't^2';
      const ftExpr = c4.latex + 't^4' + c2Term + ' - ' + (2 * xI) + 't + ' + c0;

      return {
        stem:
          'Một cái ao có hình $ABCDE$ (như hình vẽ), ở giữa ao có một mảnh vườn hình tròn bán kính $' +
          R +
          '$ m, người ta muốn bắc một cây cầu từ bờ $AB$ của ao đến vườn. Hỏi độ dài ngắn nhất $l$ (đơn vị mét) của cây cầu là bao nhiêu (làm tròn đến chữ số hàng phần chục), biết: Hai bờ $AE$ và $BC$ nằm trên hai đường thẳng vuông góc với nhau tại $O$; bờ $AB$ là một phần của parabol có đỉnh $A$ và trục đối xứng $OA$; độ dài $OA = ' +
          a0 +
          '$ m, $OB = ' +
          b0 +
          '$ m; tâm $I$ của mảnh vườn cách $AE$ và $BC$ lần lượt là $' +
          xI +
          '$ m và $' +
          yI +
          '$ m.',
        diagram: { kind: 'geometry_figure', figureType: 'parabola_pond_bridge', params: { a0, b0, xI, yI, R } },
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' m',
        solutionSteps: [
          'Chọn hệ trục $Oxy$ với gốc $O$, tia $Ox$ trùng $OC$, tia $Oy$ trùng $OE$ (đơn vị mét). Khi đó parabol $AB$ có phương trình $y = ' + paraEq + '$ ($0 \\le x \\le ' + b0 + '$) và đường tròn có tâm $I(' + xI + ';\\, ' + yI + ')$, bán kính $R = ' + R + '$.',
          'Lấy điểm $M\\left(t;\\, ' + paraEq.replace(/x/g, 't') + '\\right)$ với $t \\in [0;\\, ' + b0 + ']$. Khoảng cách ngắn nhất từ $M$ đến đường tròn là $IM - R = \\sqrt{f(t)} - ' + R + '$.',
          'Với $f(t) = IM^2 = ' + ftExpr + '$ trên $[0;\\, ' + b0 + ']$, khảo sát hàm $f(t)$ tìm được $\\min_{[0;\\,' + b0 + ']} f(t) \\approx ' + u.formatNumberVN(minSq, 4) + '$.',
          'Do đó độ dài ngắn nhất của cây cầu là $l = \\sqrt{' + u.formatNumberVN(minSq, 4) + '} - ' + R + ' \\approx ' + u.formatNumberVN(lMin, 3) + ' \\approx ' + ansStr + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mảnh vườn chạm bờ bên trái (xI ≤ b0 + R)', params: { a0: 40, b0: 20, xI: 25, yI: 30, R: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc OA=40, OB=20, I(40;30), R=10 -> 17,7 m', params: { a0: 40, b0: 20, xI: 40, yI: 30, R: 10 }, expectedValid: true },
    ],
  },
};

export const G12_C1_END_TF_TEMPLATES: MathTemplate[] = Object.values(G12_C1_END_TEMPLATES).filter(
  (t) => t.category === 'TF'
);

export const G12_C1_END_SA_TEMPLATES: MathTemplate[] = Object.values(G12_C1_END_TEMPLATES).filter(
  (t) => t.category === 'SA'
);
