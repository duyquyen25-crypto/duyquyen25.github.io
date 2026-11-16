import { MathTemplate } from '../types/math';

export const G12_B4_TEMPLATES_PART2: Record<string, MathTemplate> = {
  // =====================================================================
  // PHẦN II. TRẮC NGHIỆM ĐÚNG - SAI (7 DẠNG: DẠNG 13 -> DẠNG 19)
  // =====================================================================

  // Dạng 13 (Q13)
  t12_b4_d13_cubic_frac_survey_tf: {
    id: 't12_b4_d13_cubic_frac_survey_tf',
    name: 'Khảo sát hàm bậc ba hệ số phân thức y = (a/3)x³ + (b/2)x² + d',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho hàm số y = (a/3)x³ + (b/2)x² + d. Xét 4 mệnh đề về đạo hàm, khoảng xét dấu, bảng biến thiên và đồ thị hàm số.',
    conditionSummary: 'a ∈ {-1, 1}, b ∈ {-2, -1, 1, 2}, d ≠ 0 và |d| ≤ 4',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -2, max: 2, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { a, b, d } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1}' };
      if (b === 0 || Math.abs(b) > 3) return { valid: false, reason: 'Chọn b ∈ [-3; 3] \ {0}' };
      if (d === 0 || Math.abs(d) > 5) return { valid: false, reason: 'Chọn d ≠ 0 và |d| ≤ 5 để kiểm chứng BBT rõ ràng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, d } = params;
      const t3 = a > 0 ? '\\frac{x^3}{3}' : '-\\frac{x^3}{3}';
      const absB = Math.abs(b);
      const t2 = absB === 2
        ? (b > 0 ? ' + x^2' : ' - x^2')
        : absB === 1
        ? (b > 0 ? ' + \\frac{x^2}{2}' : ' - \\frac{x^2}{2}')
        : (b > 0 ? ' + \\frac{' + absB + 'x^2}{2}' : ' - \\frac{' + absB + 'x^2}{2}');
      const funcExpr = t3 + t2 + u.formatTrailingConst(d);
      const derivExpr = u.formatQuadratic(a, b, 0);

      const x0 = -b / a;
      const x1 = Math.min(0, x0);
      const x2 = Math.max(0, x0);
      const yAt0 = u.simplifyFrac(d, 1);
      const yAtX0 = u.simplifyFrac(2 * a * x0 * x0 * x0 + 3 * b * x0 * x0 + 6 * d, 6);
      const yAtX1 = x1 === 0 ? yAt0 : yAtX0;
      const yAtX2 = x2 === 0 ? yAt0 : yAtX0;

      const upFirst = a > 0;
      const trueYNodes = [
        { kind: 'single', pos: upFirst ? 'bot' : 'top', value: upFirst ? '-\\infty' : '+\\infty' },
        { kind: 'single', pos: upFirst ? 'top' : 'bot', value: yAtX1.latex },
        { kind: 'single', pos: upFirst ? 'bot' : 'top', value: yAtX2.latex },
        { kind: 'single', pos: upFirst ? 'top' : 'bot', value: upFirst ? '+\\infty' : '-\\infty' },
      ];
      // Statement (c) intentionally puts wrong value 0 at x=0 (since d != 0)
      const wrongYNodes = [
        { kind: 'single', pos: upFirst ? 'bot' : 'top', value: upFirst ? '-\\infty' : '+\\infty' },
        { kind: 'single', pos: upFirst ? 'top' : 'bot', value: x1 === 0 ? '0' : u.simplifyFrac(yAtX1.num + yAtX1.den, yAtX1.den).latex },
        { kind: 'single', pos: upFirst ? 'bot' : 'top', value: x2 === 0 ? '0' : yAtX2.latex },
        { kind: 'single', pos: upFirst ? 'top' : 'bot', value: upFirst ? '+\\infty' : '-\\infty' },
      ];

      const yMinPlot = Math.floor(Math.min(yAt0.value, yAtX0.value, -yAt0.value, -yAtX0.value, -3) - 2);
      const yMaxPlot = Math.ceil(Math.max(yAt0.value, yAtX0.value, -yAt0.value, -yAtX0.value, 3) + 2);

      const tfStatements = [
        { key: 'a', text: 'Hàm số có đạo hàm là $y\' = ' + derivExpr + '$.', isTrue: true },
        { key: 'b', text: '$y\' < 0$ khi $x \\in (' + x1 + ';\\, ' + x2 + ')$.', isTrue: a > 0 },
        {
          key: 'c',
          text: 'Hàm số có bảng biến thiên là:',
          isTrue: false,
          diagram: {
            kind: 'variation_table',
            derivLabel: "y'",
            funcLabel: 'y',
            xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
            derivTokens: [
              { type: 'sign', value: upFirst ? '+' : '-' },
              { type: 'node', kind: '0' },
              { type: 'sign', value: upFirst ? '-' : '+' },
              { type: 'node', kind: '0' },
              { type: 'sign', value: upFirst ? '+' : '-' },
            ],
            yNodes: wrongYNodes,
          },
        },
        {
          key: 'd',
          text: 'Hàm số có đồ thị là:',
          isTrue: false,
          diagram: {
            kind: 'function_plot',
            curveType: 'cubic',
            coeffs: [-a / 3, -b / 2, 0, -d],
            xMin: -5,
            xMax: 5,
            yMin: yMinPlot,
            yMax: yMaxPlot,
            xTicks: [-3, -2, -1, 1, 2, 3],
            yTicks: [-3, -2, -1, 1, 2, 3],
          },
        },
      ];

      return {
        stem: 'Cho hàm số $y = ' + funcExpr + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Đạo hàm $y\' = ' + derivExpr + '$ (ý a đúng).',
          'Giải $y\' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$. Vì hệ số bậc hai của $y\'$ là $a = ' + a + (a > 0 ? ' > 0$' : ' < 0$') + ' nên $y\' ' + (a > 0 ? '< 0$' : '> 0$') + ' trên $(' + x1 + ';\\, ' + x2 + ')$ (ý b ' + (a > 0 ? 'đúng' : 'sai') + ').',
          'Tại $x = 0$ ta có $y(0) = ' + d + ' \\neq 0$, tại $x = ' + x0 + '$ có $y(' + x0 + ') = ' + yAtX0.latex + '$, nên bảng biến thiên ở ý c sai.',
          'Đồ thị ở ý d có nhánh cuối và giao điểm với $Oy$ tại $(0; ' + (-d) + ')$ trái dấu với hàm số đã cho nên ý d sai.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0 (trùng giá trị sai)', params: { a: 1, b: 1, d: 0 }, expectedValid: false },
      { label: 'Biên a = 0 (không phải bậc ba)', params: { a: 0, b: 1, d: 3 }, expectedValid: false },
      { label: 'Biên chuẩn a=1, b=1, d=3', params: { a: 1, b: 1, d: 3 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14)
  t12_b4_d14_cubic_int_survey_tf: {
    id: 't12_b4_d14_cubic_int_survey_tf',
    name: 'Khảo sát hàm bậc ba y = ax³ + bx² + d (đơn điệu, tâm đối xứng, đồ thị)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho hàm số bậc ba có hai điểm cực trị nguyên 0 và 2k. Xét tính đúng sai của đạo hàm, khoảng nghịch biến, tâm đối xứng và đồ thị.',
    conditionSummary: 'a ∈ {-1, 1}, k ∈ {-2, -1, 1, 2}, |d| ≤ 4',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'k', label: 'Hoành độ điểm uốn k', min: -2, max: 2, allowZero: false },
      { name: 'd', label: 'Hệ số tự do d', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, k, d } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1}' };
      if (k === 0 || Math.abs(k) > 2) return { valid: false, reason: 'Chọn k ∈ {-2, -1, 1, 2} để đồ thị cân đối' };
      if (Math.abs(d) > 6) return { valid: false, reason: 'Giới hạn |d| <= 6 cho khung nhìn đồ thị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k, d } = params;
      const b = -3 * a * k;
      const poly = u.formatPoly([a, b, 0, d]);
      const deriv = u.formatQuadratic(3 * a, 2 * b, 0);
      const x1 = Math.min(0, 2 * k);
      const x2 = Math.max(0, 2 * k);
      const yAt0 = d;
      const yAt2k = a * Math.pow(2 * k, 3) + b * Math.pow(2 * k, 2) + d;
      const xI = k;
      const yI = a * k * k * k + b * k * k + d;

      const yMinPlot = Math.floor(Math.min(yAt0, yAt2k, -3) - 2);
      const yMaxPlot = Math.ceil(Math.max(yAt0, yAt2k, 3) + 2);
      const xMinPlot = Math.min(-4, x1 - 2);
      const xMaxPlot = Math.max(4, x2 + 2);

      const tfStatements = [
        { key: 'a', text: 'Hàm số có đạo hàm là $y\' = ' + deriv + '$.', isTrue: true },
        { key: 'b', text: 'Hàm số nghịch biến trên khoảng $(' + x1 + ';\\, ' + x2 + ')$.', isTrue: a > 0 },
        { key: 'c', text: 'Đồ thị hàm số có tâm đối xứng là điểm $I(' + xI + ';\\, ' + yI + ')$.', isTrue: true },
        {
          key: 'd',
          text: 'Hàm số có đồ thị là:',
          isTrue: true,
          diagram: {
            kind: 'function_plot',
            curveType: 'cubic',
            coeffs: [a, b, 0, d],
            xMin: xMinPlot,
            xMax: xMaxPlot,
            yMin: yMinPlot,
            yMax: yMaxPlot,
            xTicks: [-3, -2, -1, 1, 2, 3].filter((t) => t > xMinPlot && t < xMaxPlot),
            yTicks: Array.from(new Set([-2, -1, 1, 2, yAt0, yI, yAt2k])).filter((t) => t !== 0 && t > yMinPlot && t < yMaxPlot).sort((p, q) => p - q),
          },
        },
      ];

      return {
        stem: 'Cho hàm số $y = ' + poly + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Đạo hàm $y\' = ' + deriv + '$ (ý a đúng).',
          'Giải $y\' = 0 \\Leftrightarrow x = 0$ hoặc $x = ' + (2 * k) + '$. Trong khoảng $(' + x1 + ';\\, ' + x2 + ')$, dấu $y\'$ ' + (a > 0 ? 'âm nên hàm số nghịch biến' : 'dương nên hàm số đồng biến') + ' (ý b ' + (a > 0 ? 'đúng' : 'sai') + ').',
          'Giải $y\'\' = ' + u.formatLinear(6 * a, 2 * b) + ' = 0 \\Rightarrow x_I = ' + xI + ',\\, y_I = ' + yI + '$. Vậy tâm đối xứng là $I(' + xI + ';\\, ' + yI + ')$ (ý c đúng).',
          'Đồ thị đi qua $(0; ' + yAt0 + ')$, $I(' + xI + ';\\, ' + yI + ')$ và đạt cực trị tại $x = 0, x = ' + (2 * k) + '$ khớp hoàn toàn với hình vẽ ở ý d (ý d đúng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (cực trị trùng tại x = 0)', params: { a: 1, k: 0, d: -2 }, expectedValid: false },
      { label: 'Biên a = 0', params: { a: 0, k: 1, d: -2 }, expectedValid: false },
      { label: 'Biên chuẩn a=1, k=1, d=-2', params: { a: 1, k: 1, d: -2 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15)
  t12_b4_d15_cubic_from_bbt_tf: {
    id: 't12_b4_d15_cubic_from_bbt_tf',
    name: 'Đọc bảng biến thiên hàm bậc ba và tìm GTLN/GTNN trên đoạn [m; n]',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Khảo sát sự biến thiên và giá trị lớn nhất, nhỏ nhất',
    description:
      'Cho bảng biến thiên của hàm số bậc ba y = f(x) = ax³ + bx² + cx + d. Xét 4 mệnh đề về dấu hệ số a, điểm cực trị và giá trị nhỏ nhất trên đoạn [m; n].',
    conditionSummary: 'a ∈ {-1, 1}, x1 < x2 thỏa mãn 2 ≤ x2 - x1 ≤ 5',
    paramSpecs: [
      { name: 'a', label: 'Dấu hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'x1', label: 'Điểm cực trị x1', min: -4, max: 0 },
      { name: 'x2', label: 'Điểm cực trị x2', min: -1, max: 4 },
      { name: 'y1', label: 'Giá trị y(x1)', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, x1, x2, y1 } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1}' };
      if (x2 - x1 < 2 || x2 - x1 > 5) return { valid: false, reason: 'Cần 2 <= x2 - x1 <= 5 để đoạn [m; n] chứa điểm cực trị' };
      if (Math.abs(x1) > 10 || Math.abs(x2) > 10 || Math.abs(y1) > 20) return { valid: false, reason: 'Giá trị quá lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2, y1 } = params;
      const fFrac = (x) => u.simplifyFrac(2 * y1 + a * (x - x1) * (x - x1) * (2 * x + x1 - 3 * x2), 2);
      const y1F = fFrac(x1);
      const y2F = fFrac(x2);
      const m = x1 + 1;
      const n = x2 + 2;
      const fm = fFrac(m);
      const fn = fFrac(n);
      const upFirst = a > 0;

      const trueMin = a < 0 ? (fm.value <= fn.value ? fm : fn) : y2F;
      const wrongMin = u.simplifyFrac(trueMin.num + trueMin.den, trueMin.den);

      const tfStatements = [
        { key: 'a', text: 'Hàm số có hệ số $a < 0$.', isTrue: a < 0 },
        {
          key: 'b',
          text: 'Đồ thị hàm số đi qua hai điểm $(' + x1 + ';\\, ' + y2F.latex + ')$ và $(' + x2 + ';\\, ' + y1F.latex + ')$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: '$f\'(x) = 0$ tại các giá trị $x = ' + m + '$, $x = ' + n + '$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Giá trị nhỏ nhất của hàm số trên $[' + m + ';\\, ' + n + ']$ bằng $' + wrongMin.latex + '$.',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $y = f(x) = ax^3 + bx^2 + cx + d$ có bảng biến thiên như hình dưới đây. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: upFirst ? '+' : '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: upFirst ? '-' : '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: upFirst ? '+' : '-' },
          ],
          yNodes: [
            { kind: 'single', pos: upFirst ? 'bot' : 'top', value: upFirst ? '-\\infty' : '+\\infty' },
            { kind: 'single', pos: upFirst ? 'top' : 'bot', value: y1F.latex },
            { kind: 'single', pos: upFirst ? 'bot' : 'top', value: y2F.latex },
            { kind: 'single', pos: upFirst ? 'top' : 'bot', value: upFirst ? '+\\infty' : '-\\infty' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Từ bảng biến thiên, khi $x \\to +\\infty$ thì $f(x) \\to ' + (upFirst ? '+\\infty$' : '-\\infty$') + ' nên $a ' + (a < 0 ? '< 0$' : '> 0$') + ' (ý a ' + (a < 0 ? 'đúng' : 'sai') + ').',
          'Từ bảng biến thiên ta có $f(' + x1 + ') = ' + y1F.latex + '$ và $f(' + x2 + ') = ' + y2F.latex + '$ (ý b sai do hoán đổi tung độ).',
          'Dựa vào bảng biến thiên thì $f\'(' + x1 + ') = f\'(' + x2 + ') = 0$ (ý c sai).',
          'Khôi phục $f\'(x) = ' + (3 * a) + '(' + u.formatShift('x', -x1) + ')(' + u.formatShift('x', -x2) + ')$, tính được $f(' + m + ') = ' + fm.latex + '$, $f(' + x2 + ') = ' + y2F.latex + '$, $f(' + n + ') = ' + fn.latex + '$. Suy ra $\\min_{[' + m + '; ' + n + ']} f(x) = ' + trueMin.latex + ' \\neq ' + wrongMin.latex + '$ (ý d sai).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x2 - x1 = 1 (không đủ khoảng chứa m)', params: { a: -1, x1: -2, x2: -1, y1: 0 }, expectedValid: false },
      { label: 'Biên a = 0', params: { a: 0, x1: -4, x2: -1, y1: -2 }, expectedValid: false },
      { label: 'Biên chuẩn a=-1, x1=-4, x2=-1, y1=-2', params: { a: -1, x1: -4, x2: -1, y1: -2 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16)
  t12_b4_d16_rational_1_1_survey_tf: {
    id: 't12_b4_d16_rational_1_1_survey_tf',
    name: 'Khảo sát toàn diện hàm phân thức (ax+b)/(cx+d) (đạo hàm, đơn điệu, BBT, đồ thị)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho hàm số y = (ax + b)/(cx + d). Xét 4 mệnh đề về đạo hàm, khoảng đơn điệu, bảng biến thiên và đồ thị hàm số.',
    conditionSummary: 'c ≠ 0, ad - bc ≠ 0, hai tiệm cận thuộc [-4; 4]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -5, max: 5 },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -5, max: 5 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || c === 0) return { valid: false, reason: 'a và c phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm hàm suy biến thành hàm hằng' };
      if (Math.abs(-d / c) > 3.5 || Math.abs(a / c) > 3.5) return { valid: false, reason: 'Tiệm cận vượt khung đồ thị chuẩn [-5; 5]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const num = u.formatLinear(a, b);
      const den = u.formatLinear(c, d);
      const det = a * d - b * c;
      const vAsym = u.simplifyFrac(-d, c);
      const hAsym = u.simplifyFrac(a, c);
      const inc = det > 0;
      const sign = inc ? '+' : '-';

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số có $y\' = \\frac{' + (-det) + '}{(' + den + ')^2}$.',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Hàm số nghịch biến trên các khoảng $\\left(-\\infty;\\, ' + vAsym.latex + '\\right)$ và $\\left(' + vAsym.latex + ';\\, +\\infty\\right)$.',
          isTrue: !inc,
        },
        {
          key: 'c',
          text: 'Hàm số có bảng biến thiên là:',
          isTrue: true,
          diagram: {
            kind: 'variation_table',
            derivLabel: "y'",
            funcLabel: 'y',
            xNodes: ['-\\infty', vAsym.latex, '+\\infty'],
            derivTokens: [
              { type: 'sign', value: sign },
              { type: 'node', kind: 'd' },
              { type: 'sign', value: sign },
            ],
            yNodes: [
              { kind: 'single', pos: inc ? 'bot' : 'top', value: hAsym.latex },
              {
                kind: 'asymptote',
                leftPos: inc ? 'top' : 'bot',
                leftVal: inc ? '+\\infty' : '-\\infty',
                rightPos: inc ? 'bot' : 'top',
                rightVal: inc ? '-\\infty' : '+\\infty',
              },
              { kind: 'single', pos: inc ? 'top' : 'bot', value: hAsym.latex },
            ],
          },
        },
        {
          key: 'd',
          text: 'Hàm số có đồ thị là:',
          isTrue: true,
          diagram: {
            kind: 'function_plot',
            curveType: 'rational_2_1',
            coeffs: [0, a, b, c, d],
            xMin: -5,
            xMax: 5,
            yMin: -5,
            yMax: 5,
            xTicks: [-4, -2, 2, 4],
            yTicks: [-4, -2, 2, 4],
            verticalAsymptote: vAsym.value,
            obliqueAsymptote: { m: 0, q: hAsym.value },
          },
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\frac{' + num + '}{' + den + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Đạo hàm đúng là $y\' = \\frac{' + det + '}{(' + den + ')^2}$ nên ý a sai dấu tử số.',
          'Vì $y\' ' + (inc ? '> 0$' : '< 0$') + ' với mọi $x \\neq ' + vAsym.latex + '$ nên hàm số ' + (inc ? 'đồng biến' : 'nghịch biến') + ' trên từng khoảng xác định (ý b ' + (!inc ? 'đúng' : 'sai') + ').',
          'Bảng biến thiên ở ý c thể hiện đúng tiệm cận đứng $x = ' + vAsym.latex + '$, tiệm cận ngang $y = ' + hAsym.latex + '$ và chiều biến thiên (ý c đúng).',
          'Đồ thị ở ý d nhận đúng hai tiệm cận và tính đơn điệu của hàm số (ý d đúng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ad - bc = 0', params: { a: 2, b: 4, c: 1, d: 2 }, expectedValid: false },
      { label: 'Biên c = 0', params: { a: 4, b: -5, c: 0, d: -2 }, expectedValid: false },
      { label: 'Biên chuẩn a=4, b=-5, c=-5, d=-2', params: { a: 4, b: -5, c: -5, d: -2 }, expectedValid: true },
    ],
  },

  // Dạng 17 (Q17)
  t12_b4_d17_rational_2_1_survey_tf: {
    id: 't12_b4_d17_rational_2_1_survey_tf',
    name: 'Khảo sát toàn diện hàm phân thức bậc 2/bậc 1 (đạo hàm, BBT, đồ thị)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho hàm số y = (ax² + bx + c)/(x + p) có hai cực trị nguyên. Xét 4 mệnh đề về đạo hàm, khoảng xét dấu, bảng biến thiên và đồ thị.',
    conditionSummary: 'a ∈ {-1, 1}, k ∈ {1, 2}, |p| ≤ 3, |q| ≤ 2',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'p', label: 'Tham số mẫu p', min: -3, max: 3 },
      { name: 'q', label: 'Hệ số tự do TCX q', min: -2, max: 2 },
      { name: 'k', label: 'Khoảng cách cực trị k', min: 1, max: 2 },
    ],
    validateCode: `
      const { a, p, q, k } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1}' };
      if (k !== 1 && k !== 2) return { valid: false, reason: 'Chọn k ∈ {1, 2} để đồ thị rõ nét' };
      if (Math.abs(p) > 4 || Math.abs(q) > 3) return { valid: false, reason: 'Tham số vượt khung hiển thị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, p, q, k } = params;
      // y = a x + q + (a k^2) / (x + p) = (a x^2 + (a p + q) x + (q p + a k^2)) / (x + p)
      const B = a * p + q;
      const C = q * p + a * k * k;
      const numPoly = u.formatQuadratic(a, B, C);
      const denPoly = u.formatShift('x', p);
      const x0 = -p;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const y1 = -a * p + q - 2 * a * k;
      const y2 = -a * p + q + 2 * a * k;

      const dNum = u.formatQuadratic(a, 2 * a * p, a * (p * p - k * k));
      const upOuter = a > 0;
      const sOuter = upOuter ? '+' : '-';
      const sInner = upOuter ? '-' : '+';

      const xMin = x0 - 7;
      const xMax = x0 + 7;
      const yCenter = a * x0 + q;
      const yMin = Math.floor(Math.min(y1, y2, yCenter - 7) - 1);
      const yMax = Math.ceil(Math.max(y1, y2, yCenter + 7) + 1);
      const xTicks = [-6, -4, -2, 2, 4, 6].map((v) => v + x0).filter((t) => t !== 0 && t > xMin && t < xMax);
      const yTicks = [-6, -4, -2, 2, 4, 6].map((v) => v + yCenter).filter((t) => t !== 0 && t > yMin && t < yMax);

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số có đạo hàm là $y\' = \\frac{' + dNum + '}{(' + denPoly + ')^2}$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: '$y\' < 0$ khi $x \\in (-\\infty;\\, ' + x1 + ') \\cup (' + x2 + ';\\, +\\infty)$.',
          isTrue: a < 0,
        },
        {
          key: 'c',
          text: 'Hàm số có bảng biến thiên là:',
          isTrue: true,
          diagram: {
            kind: 'variation_table',
            derivLabel: "y'",
            funcLabel: 'y',
            xNodes: ['-\\infty', '' + x1, '' + x0, '' + x2, '+\\infty'],
            derivTokens: [
              { type: 'sign', value: sOuter },
              { type: 'node', kind: '0' },
              { type: 'sign', value: sInner },
              { type: 'node', kind: 'd' },
              { type: 'sign', value: sInner },
              { type: 'node', kind: '0' },
              { type: 'sign', value: sOuter },
            ],
            yNodes: [
              { kind: 'single', pos: upOuter ? 'bot' : 'top', value: upOuter ? '-\\infty' : '+\\infty' },
              { kind: 'single', pos: upOuter ? 'top' : 'bot', value: '' + y1 },
              {
                kind: 'asymptote',
                leftPos: upOuter ? 'bot' : 'top',
                leftVal: upOuter ? '-\\infty' : '+\\infty',
                rightPos: upOuter ? 'top' : 'bot',
                rightVal: upOuter ? '+\\infty' : '-\\infty',
              },
              { kind: 'single', pos: upOuter ? 'bot' : 'top', value: '' + y2 },
              { kind: 'single', pos: upOuter ? 'top' : 'bot', value: upOuter ? '+\\infty' : '-\\infty' },
            ],
          },
        },
        {
          key: 'd',
          text: 'Hàm số có đồ thị là:',
          isTrue: true,
          diagram: {
            kind: 'function_plot',
            curveType: 'rational_2_1',
            coeffs: [a, B, C, 1, p],
            xMin,
            xMax,
            yMin,
            yMax,
            xTicks,
            yTicks,
            verticalAsymptote: x0,
            obliqueAsymptote: { m: a, q },
          },
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\frac{' + numPoly + '}{' + denPoly + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Tính đạo hàm: $y\' = \\frac{' + dNum + '}{(' + denPoly + ')^2}$ (ý a đúng).',
          'Giải $y\' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$. Ngoài khoảng hai nghiệm, $y\'$ cùng dấu với $a = ' + a + '$ (ý b ' + (a < 0 ? 'đúng' : 'sai') + ').',
          'Bảng biến thiên có tiệm cận đứng $x = ' + x0 + '$ và hai điểm cực trị $(' + x1 + ';\\, ' + y1 + ')$, $(' + x2 + ';\\, ' + y2 + ')$ khớp hoàn toàn với ý c.',
          'Đồ thị có tiệm cận đứng $x = ' + x0 + '$ và tiệm cận xiên $y = ' + u.formatLinear(a, q) + '$ đúng như hình ở ý d.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (không có cực trị)', params: { a: -1, p: 2, q: 1, k: 0 }, expectedValid: false },
      { label: 'Biên a = 0', params: { a: 0, p: 2, q: 1, k: 1 }, expectedValid: false },
      { label: 'Biên chuẩn a=-1, p=2, q=1, k=1', params: { a: -1, p: 2, q: 1, k: 1 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18)
  t12_b4_d18_rational_2_1_props_tf: {
    id: 't12_b4_d18_rational_2_1_props_tf',
    name: 'Khảo sát tính chất hàm phân thức y = (Ax² + Bx + C)/(p - x)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị hàm số',
    description:
      'Cho hàm số y = (Ax² + Bx + C)/(p - x). Kiểm tra tập xác định, đạo hàm, tiệm cận đứng và tâm đối xứng.',
    conditionSummary: 'A ≠ 0, p ≠ 0 và phần dư A·p² + B·p + C ≠ 0',
    paramSpecs: [
      { name: 'A', label: 'Hệ số A', min: 1, max: 3 },
      { name: 'B', label: 'Hệ số B', min: -4, max: 5 },
      { name: 'C', label: 'Hệ số C', min: -4, max: 5 },
      { name: 'p', label: 'Tham số p', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { A, B, C, p } = params;
      if (A === 0 || p === 0) return { valid: false, reason: 'A và p phải khác 0' };
      const rem = A * p * p + B * p + C;
      if (rem === 0) return { valid: false, reason: 'Tử chia hết cho mẫu (p - x), hàm suy biến thành đường thẳng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, B, C, p } = params;
      const numPoly = u.formatQuadratic(A, B, C);
      const denPoly = u.formatLinear(-1, p).replace(/^-x \+ /, '').replace(/^-x - /, '');
      // Write denominator explicitly as "p - x"
      const denDisplay = p + ' - x';
      const rem = A * p * p + B * p + C;
      const dB = 2 * A * p;
      const dC = B * p + C;
      const trueDerivNum = u.formatQuadratic(-A, dB, dC);
      const wrongDerivNum = u.formatQuadratic(-A, -dB, dC - 1);

      // Division: (-A x - (A p + B)) + R / (p - x)
      const q0 = -(A * p + B);
      const tcxPoly = u.formatLinear(-A, q0);
      const yI = -A * p + q0;
      const remLatex = (rem >= 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(rem) + '}{' + denDisplay + '}';

      const tfStatements = [
        { key: 'a', text: 'Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{' + (-p) + '\\}$.', isTrue: false },
        {
          key: 'b',
          text: 'Đạo hàm của hàm số là $y\' = \\frac{' + wrongDerivNum + '}{(' + denDisplay + ')^2}$.',
          isTrue: false,
        },
        { key: 'c', text: 'Tiệm cận đứng của đồ thị hàm số là đường thẳng $x = ' + p + '$.', isTrue: true },
        { key: 'd', text: 'Đồ thị hàm số có tâm đối xứng là điểm $I(' + (-p) + ';\\, ' + yI + ')$.', isTrue: false },
      ];

      return {
        stem: 'Cho hàm số $y = \\frac{' + numPoly + '}{' + denDisplay + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Điều kiện xác định: $' + denDisplay + ' \\neq 0 \\Leftrightarrow x \\neq ' + p + '$ nên $D = \\mathbb{R} \\setminus \\{' + p + '\\}$ (ý a sai).',
          'Đạo hàm đúng của hàm số là $y\' = \\frac{' + trueDerivNum + '}{(' + denDisplay + ')^2}$ (ý b sai).',
          'Vì tử thức tại $x = ' + p + '$ bằng $' + rem + ' \\neq 0$ nên tiệm cận đứng là $x = ' + p + '$ (ý c đúng).',
          'Ta có $y = ' + tcxPoly + remLatex + '$ nên tiệm cận xiên là $y = ' + tcxPoly + '$. Tâm đối xứng là $I(' + p + ';\\, ' + yI + ')$ (ý d sai).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0 (tâm đối xứng trùng dấu -p)', params: { A: 2, B: 4, C: 3, p: 0 }, expectedValid: false },
      { label: 'Biên tử chia hết cho mẫu', params: { A: 1, B: 2, C: -3, p: 1 }, expectedValid: false },
      { label: 'Biên chuẩn A=2, B=4, C=3, p=1', params: { A: 2, B: 4, C: 3, p: 1 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19)
  t12_b4_d19_rational_2_1_extrema_line_tf: {
    id: 't12_b4_d19_rational_2_1_extrema_line_tf',
    name: 'Khảo sát đạo hàm, tiệm cận xiên và đường thẳng qua hai điểm cực trị',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Khảo sát sự biến thiên và cực trị hàm phân thức',
    description:
      'Cho hàm số y = (x² + Bx + C)/(x - p) có hai điểm cực trị nguyên. Kiểm tra đạo hàm, khoảng đồng biến, tiệm cận xiên và đường thẳng đi qua hai điểm cực trị.',
    conditionSummary: 'p ≠ 0, k ∈ {1, 2, 3} (k ≠ 0 đảm bảo tử không chia hết cho mẫu)',
    paramSpecs: [
      { name: 'm', label: 'Hằng số TCX m', min: -3, max: 3 },
      { name: 'p', label: 'Tiệm cận đứng p', min: -3, max: 3, allowZero: false },
      { name: 'k', label: 'Bán kính cực trị k', min: 1, max: 3 },
    ],
    validateCode: `
      const { p, k } = params;
      if (p === 0) return { valid: false, reason: 'Chọn p ≠ 0 để mẫu khác x tầm thường' };
      if (k <= 0 || k > 4) return { valid: false, reason: 'Chọn k ∈ {1, 2, 3, 4}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, p, k } = params;
      // y = x + m + k^2 / (x - p) = (x^2 + (m - p)x + (k^2 - m*p)) / (x - p)
      const B = m - p;
      const C = k * k - m * p;
      const numPoly = u.formatQuadratic(1, B, C);
      const denPoly = u.formatShift('x', -p);
      const x1 = p - k;
      const x2 = p + k;
      const trueDNum = u.formatQuadratic(1, -2 * p, p * p - k * k);
      const wrongDNum = u.formatQuadratic(1, -2 * p, p * p - k * k + 2);
      const trueTCX = u.formatLinear(1, m);
      const wrongTCX = u.formatLinear(1, m + 3);
      const trueExtLine = u.formatLinear(2, B);
      const wrongExtLine = u.formatLinear(2, B + 2);

      const tfStatements = [
        { key: 'a', text: 'Hàm số có đạo hàm là $y\' = \\frac{' + wrongDNum + '}{(' + denPoly + ')^2}$.', isTrue: false },
        { key: 'b', text: '$y\' > 0$ khi $x \\in (' + x1 + ';\\, ' + x2 + ')$.', isTrue: false },
        { key: 'c', text: 'Đồ thị hàm số có tiệm cận xiên là đường thẳng $y = ' + wrongTCX + '$.', isTrue: false },
        {
          key: 'd',
          text: 'Đường thẳng đi qua hai điểm cực trị của đồ thị hàm số có phương trình là $y = ' + wrongExtLine + '$.',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $y = \\frac{' + numPoly + '}{' + denPoly + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Đạo hàm đúng của hàm số là $y\' = \\frac{' + trueDNum + '}{(' + denPoly + ')^2}$ (ý a sai).',
          'Giải $y\' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$. Khi $x \\in (-\\infty; ' + x1 + ') \\cup (' + x2 + '; +\\infty)$ thì $y\' > 0$, còn trong khoảng $(' + x1 + ';\\, ' + x2 + ') \\setminus \\{' + p + '\\}$ thì $y\' < 0$ (ý b sai).',
          'Ta có $y = ' + trueTCX + ' + \\frac{' + (k * k) + '}{' + denPoly + '}$ nên tiệm cận xiên là $y = ' + trueTCX + '$ (ý c sai).',
          'Tại hai điểm cực trị $y(x_i) = \\frac{(' + u.formatQuadratic(1, B, 0) + ')\'|_{x=x_i}}{(' + denPoly + ')\'|_{x=x_i}} = ' + trueExtLine + '$. Đường thẳng qua hai điểm cực trị là $y = ' + trueExtLine + '$ (ý d sai).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { m: 1, p: 0, k: 1 }, expectedValid: false },
      { label: 'Biên k = 0 (tử chia hết)', params: { m: 1, p: 1, k: 0 }, expectedValid: false },
      { label: 'Biên chuẩn m=1, p=1, k=1 (y = x²/(x-1))', params: { m: 1, p: 1, k: 1 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // PHẦN III. TRẢ LỜI NGẮN (7 DẠNG: DẠNG 20 -> DẠNG 26)
  // =====================================================================

  // Dạng 20 (Q20)
  t12_b4_d20_cubic_graph_coeff_sa: {
    id: 't12_b4_d20_cubic_graph_coeff_sa',
    name: 'Xác định hệ số hàm bậc ba từ các giao điểm với trục tọa độ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đọc đồ thị và xác định hàm số',
    description:
      'Cho đồ thị hàm số y = ax³ + x² + cx + d đi qua 3 giao điểm nguyên trên Ox và giao điểm Oy. Tính giá trị biểu thức tuyến tính của a, c, d.',
    conditionSummary: 'a ∈ {-1, 1}, ba nghiệm nguyên phân biệt khác 0 có tổng bằng -a',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'r1', label: 'Nghiệm r1', min: -3, max: -1 },
      { name: 'r2', label: 'Nghiệm r2', min: 1, max: 3 },
      { name: 'w', label: 'Hệ số biểu thức w', min: 1, max: 3 },
    ],
    validateCode: `
      const { a, r1, r2, w } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1}' };
      if (r1 === 0 || r2 === 0 || r1 === r2) return { valid: false, reason: 'r1, r2 phải khác 0 và phân biệt' };
      const r3 = -a - r1 - r2;
      if (r3 === 0 || r3 === r1 || r3 === r2) return { valid: false, reason: 'Nghiệm r3 suy ra phải khác 0 và khác r1, r2' };
      if (Math.abs(r1) > 5 || Math.abs(r2) > 5 || Math.abs(r3) > 5 || w < 1 || w > 5) {
        return { valid: false, reason: 'Tham số vượt khung hiển thị' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, r1, r2, w } = params;
      const r3 = -a - r1 - r2;
      const b = 1;
      const c = a * (r1 * r2 + r2 * r3 + r3 * r1);
      const d = -a * r1 * r2 * r3;
      const ans = 2 * a - w * c + d;
      const expr = u.formatTerm(2, 'a', true) + u.formatTerm(-w, 'c', false) + u.formatTerm(1, 'd', false);

      // Compute clean bounding box covering roots and critical values
      const disc = 4 * b * b - 12 * a * c;
      let yExtMin = d;
      let yExtMax = d;
      if (disc > 0) {
        const xc1 = (-2 * b - Math.sqrt(disc)) / (6 * a);
        const xc2 = (-2 * b + Math.sqrt(disc)) / (6 * a);
        const f = (x) => a * x * x * x + b * x * x + c * x + d;
        yExtMin = Math.min(yExtMin, f(xc1), f(xc2));
        yExtMax = Math.max(yExtMax, f(xc1), f(xc2));
      }
      const xMin = Math.min(-4, r1 - 2, r3 - 2);
      const xMax = Math.max(4, r2 + 2, r3 + 2);
      const yMin = Math.floor(Math.min(yExtMin, -2) - 2);
      const yMax = Math.ceil(Math.max(yExtMax, 2) + 2);
      const xTicks = Array.from(new Set([-3, -2, -1, 1, 2, 3, r1, r2, r3])).filter((t) => t !== 0 && t > xMin && t < xMax).sort((p, q) => p - q);
      const yTicks = Array.from(new Set([-2, -1, 1, 2, d])).filter((t) => t !== 0 && t > yMin && t < yMax).sort((p, q) => p - q);

      return {
        stem: 'Hàm số $y = ax^3 + x^2 + cx + d$ có đồ thị như hình vẽ bên. Tính $' + expr + '$.',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [a, b, c, d],
          xMin,
          xMax,
          yMin,
          yMax,
          xTicks,
          yTicks,
          highlightPoints: [
            { x: r1, y: 0 },
            { x: r2, y: 0 },
            { x: r3, y: 0 },
            { x: 0, y: d },
          ],
        },
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '' + ans,
        solutionSteps: [
          'Đồ thị cắt trục tung tại điểm $(0; ' + d + ')$ nên $d = ' + d + '$.',
          'Đồ thị đi qua ba điểm $(' + r1 + '; 0)$, $(' + r2 + '; 0)$ và $(' + r3 + '; 0)$ nên hàm số có dạng $y = a(' + u.formatShift('x', -r1) + ')(' + u.formatShift('x', -r2) + ')(' + u.formatShift('x', -r3) + ')$.',
          'So sánh hệ số tự do và hệ số của $x^2$ ta tìm được $a = ' + a + ',\\, c = ' + c + ',\\, d = ' + d + '$.',
          'Vậy $' + expr + ' = 2(' + a + ') - ' + (w === 1 ? '' : w + '\\cdot') + '(' + c + ') + (' + d + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, r1: -2, r2: 2, w: 1 }, expectedValid: false },
      { label: 'Biên tạo nghiệm r3 = 0', params: { a: 1, r1: -2, r2: 1, w: 1 }, expectedValid: false },
      { label: 'Biên chuẩn a=1, r1=-2, r2=2 (nghiệm -2, -1, 2)', params: { a: 1, r1: -2, r2: 2, w: 1 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21)
  t12_b4_d21_rational_1_1_coeff_sa: {
    id: 't12_b4_d21_rational_1_1_coeff_sa',
    name: 'Xác định hệ số hàm phân thức y = (ax+b)/(-x+d) từ đồ thị',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đọc đồ thị và xác định hàm số',
    description:
      'Cho đồ thị hàm số y = (ax + b)/(-x + d) kèm hai tiệm cận và giao điểm trục tọa độ. Tính giá trị biểu thức theo a, b, d.',
    conditionSummary: 'a ≠ 0, b ≠ 0, d ≠ 0 và ad + b ≠ 0 (mẫu -x + d)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 3, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -4, max: 4, allowZero: false },
      { name: 'w', label: 'Tham số biểu thức w', min: 1, max: 3 },
    ],
    validateCode: `
      const { a, b, d, w } = params;
      if (a === 0 || b === 0 || d === 0) return { valid: false, reason: 'a, b, d phải khác 0 để đọc rõ giao điểm và tiệm cận' };
      if (a * d + b === 0) return { valid: false, reason: 'ad + b = 0 làm tử tỉ lệ với mẫu, hàm suy biến thành hàm hằng' };
      if (Math.abs(a) > 6 || Math.abs(b) > 6 || Math.abs(d) > 6 || w < 1 || w > 5) {
        return { valid: false, reason: 'Hệ số ngoài phạm vi khung đồ thị chuẩn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, d, w } = params;
      const kCoeff = 2 + w;
      const ans = kCoeff * a + b - 2 * d;
      const expr = kCoeff + 'a + b - 2d';
      const x0 = d;
      const y0 = -a;
      const xOx = u.simplifyFrac(-b, a);
      const yOy = u.simplifyFrac(b, d);
      const xMin = Math.min(-6, x0 - 6);
      const xMax = Math.max(6, x0 + 6);
      const yMin = Math.min(-6, y0 - 6);
      const yMax = Math.max(6, y0 + 6);
      const xTicks = [-8, -6, -4, -2, 2, 4, 6, 8].filter((t) => t > xMin && t < xMax);
      const yTicks = [-8, -6, -4, -2, 2, 4, 6, 8].filter((t) => t > yMin && t < yMax);

      return {
        stem: 'Hàm số $y = \\frac{ax + b}{-x + d}$ có đồ thị như hình vẽ bên. Tính $' + expr + '$.',
        diagram: {
          kind: 'function_plot',
          curveType: 'rational_2_1',
          coeffs: [0, a, b, -1, d],
          xMin,
          xMax,
          yMin,
          yMax,
          xTicks,
          yTicks,
          verticalAsymptote: x0,
          obliqueAsymptote: { m: 0, q: y0 },
          highlightPoints: [
            { x: xOx.value, y: 0 },
            { x: 0, y: yOy.value },
          ],
        },
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '' + ans,
        solutionSteps: [
          'Đồ thị có đường tiệm cận đứng là $x = ' + x0 + '$ nên $-(' + x0 + ') + d = 0 \\Rightarrow d = ' + d + '$.',
          'Đồ thị có đường tiệm cận ngang là $y = ' + y0 + '$ nên $\\frac{a}{-1} = ' + y0 + ' \\Rightarrow a = ' + a + '$.',
          'Đồ thị đi qua điểm $\\left(' + xOx.latex + ';\\, 0\\right)$ và $\\left(0;\\, ' + yOy.latex + '\\right)$, suy ra $b = ' + b + '$.',
          'Vậy $' + expr + ' = ' + kCoeff + '\\cdot(' + a + ') + (' + b + ') - 2\\cdot(' + d + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0 (tiệm cận đứng trùng Oy)', params: { a: 1, b: 1, d: 0, w: 1 }, expectedValid: false },
      { label: 'Biên suy biến ad + b = 0', params: { a: 2, b: 4, d: -2, w: 1 }, expectedValid: false },
      { label: 'Biên chuẩn a=1, b=1, d=-3, w=1', params: { a: 1, b: 1, d: -3, w: 1 }, expectedValid: true },
    ],
  },

  // Dạng 22 (Q22)
  t12_b4_d22_cubic_sign_pos_count_sa: {
    id: 't12_b4_d22_cubic_sign_pos_count_sa',
    name: 'Đếm số hệ số dương của hàm bậc ba y = ax³ + bx² + cx + d từ đồ thị',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Xác định dấu hệ số từ đồ thị hàm số',
    description:
      'Cho đồ thị hàm số bậc ba (không đánh số trên trục tọa độ). Dựa vào hình dạng, vị trí hai cực trị và giao điểm với Oy để đếm số hệ số dương trong a, b, c, d.',
    conditionSummary: 'a ∈ {-1, 1}, x1 < x2 thỏa mãn x1 ≠ 0, x2 ≠ 0, x1 + x2 ≠ 0, d ≠ 0',
    paramSpecs: [
      { name: 'aSign', label: 'Dấu hệ số a (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
      { name: 'x1', label: 'Hoành độ cực trị x1', min: -2, max: 1, allowZero: false },
      { name: 'x2', label: 'Hoành độ cực trị x2', min: -1, max: 2, allowZero: false },
      { name: 'dSign', label: 'Hệ số tự do d', min: -2, max: 2, allowZero: false },
    ],
    validateCode: `
      const { aSign, x1, x2, dSign } = params;
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'Chọn aSign ∈ {-1, 1}' };
      if (x1 === 0 || x2 === 0 || x1 >= x2 || x1 + x2 === 0) {
        return { valid: false, reason: 'Cần x1 < x2, x1 ≠ 0, x2 ≠ 0 và x1 + x2 ≠ 0 để xác định rõ dấu b và c' };
      }
      if (Math.abs(x1) > 3 || Math.abs(x2) > 3 || dSign === 0 || Math.abs(dSign) > 4) {
        return { valid: false, reason: 'Tham số ngoài miền đồ thị trực quan' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aSign, x1, x2, dSign } = params;
      const a = aSign * 0.5;
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const d = dSign * 0.5;
      const posCount = [a, b, c, d].filter((v) => v > 0).length;

      const f = (x) => a * x * x * x + b * x * x + c * x + d;
      const y1 = f(x1);
      const y2 = f(x2);
      const yMin = Math.floor(Math.min(y1, y2, d, -3) - 1.5);
      const yMax = Math.ceil(Math.max(y1, y2, d, 3) + 1.5);

      const sumSign = x1 + x2 > 0 ? '> 0' : '< 0';
      const prodSign = x1 * x2 > 0 ? '> 0' : '< 0';

      return {
        stem: 'Cho hàm số $y = ax^3 + bx^2 + cx + d$ có đồ thị là đường cong trong hình bên. Có bao nhiêu số dương trong các số $a, b, c, d$?',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [a, b, c, d],
          xMin: -4,
          xMax: 4,
          yMin,
          yMax,
          xTicks: [],
          yTicks: [],
        },
        shortAnswer: '' + posCount,
        numericValue: posCount,
        answerSummary: '' + posCount,
        solutionSteps: [
          'Dựa vào nhánh cuối đồ thị đi ' + (a > 0 ? 'lên' : 'xuống') + ' suy ra $a ' + (a > 0 ? '> 0$' : '< 0$') + '.',
          'Đạo hàm $y\' = 3ax^2 + 2bx + c$ có hai nghiệm $x_1, x_2$ thỏa mãn $x_1 + x_2 = -\\frac{2b}{3a} ' + sumSign + ' \\Rightarrow b ' + (b > 0 ? '> 0$' : '< 0$') + '.',
          'Lại có $x_1 x_2 = \\frac{c}{3a} ' + prodSign + ' \\Rightarrow c ' + (c > 0 ? '> 0$' : '< 0$') + '.',
          'Giao điểm với trục tung $(0; d)$ nằm ' + (d > 0 ? 'phía trên' : 'phía dưới') + ' gốc $O$ nên $d ' + (d > 0 ? '> 0$' : '< 0$') + '. Vậy có $' + posCount + '$ hệ số dương.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 + x2 = 0 (suy biến b = 0)', params: { aSign: -1, x1: -1, x2: 1, dSign: -1 }, expectedValid: false },
      { label: 'Biên dSign = 0 (qua gốc O)', params: { aSign: -1, x1: 1, x2: 2, dSign: 0 }, expectedValid: false },
      { label: 'Biên chuẩn aSign=-1, x1=1, x2=2, dSign=-1', params: { aSign: -1, x1: 1, x2: 2, dSign: -1 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23)
  t12_b4_d23_cubic_sign_neg_count_sa: {
    id: 't12_b4_d23_cubic_sign_neg_count_sa',
    name: 'Đếm số hệ số âm của hàm bậc ba y = ax³ + bx² + cx + d từ đồ thị',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Xác định dấu hệ số từ đồ thị hàm số',
    description:
      'Cho đồ thị hàm số bậc ba (không đánh số trên trục tọa độ). Dựa vào hình dạng, hai cực trị và giao điểm trục tung để đếm số hệ số âm trong a, b, c, d.',
    conditionSummary: 'a ∈ {-1, 1}, x1 < x2 thỏa mãn x1 ≠ 0, x2 ≠ 0, x1 + x2 ≠ 0, d ≠ 0',
    paramSpecs: [
      { name: 'aSign', label: 'Dấu hệ số a (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
      { name: 'x1', label: 'Hoành độ cực trị x1', min: -2, max: 1, allowZero: false },
      { name: 'x2', label: 'Hoành độ cực trị x2', min: -1, max: 2, allowZero: false },
      { name: 'dSign', label: 'Hệ số tự do d', min: -2, max: 2, allowZero: false },
    ],
    validateCode: `
      const { aSign, x1, x2, dSign } = params;
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'Chọn aSign ∈ {-1, 1}' };
      if (x1 === 0 || x2 === 0 || x1 >= x2 || x1 + x2 === 0) {
        return { valid: false, reason: 'Cần x1 < x2, x1 ≠ 0, x2 ≠ 0 và x1 + x2 ≠ 0' };
      }
      if (Math.abs(x1) > 3 || Math.abs(x2) > 3 || dSign === 0 || Math.abs(dSign) > 4) {
        return { valid: false, reason: 'Tham số ngoài miền đồ thị' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { aSign, x1, x2, dSign } = params;
      const a = aSign * 0.5;
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const d = dSign * 0.5;
      const negCount = [a, b, c, d].filter((v) => v < 0).length;

      const f = (x) => a * x * x * x + b * x * x + c * x + d;
      const y1 = f(x1);
      const y2 = f(x2);
      const yMin = Math.floor(Math.min(y1, y2, d, -3) - 1.5);
      const yMax = Math.ceil(Math.max(y1, y2, d, 3) + 1.5);

      const sumSign = x1 + x2 > 0 ? '> 0' : '< 0';
      const prodSign = x1 * x2 > 0 ? '> 0' : '< 0';

      return {
        stem: 'Cho hàm số $y = ax^3 + bx^2 + cx + d$ có đồ thị là đường cong trong hình bên. Có bao nhiêu số âm trong các số $a, b, c, d$?',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [a, b, c, d],
          xMin: -4,
          xMax: 4,
          yMin,
          yMax,
          xTicks: [],
          yTicks: [],
        },
        shortAnswer: '' + negCount,
        numericValue: negCount,
        answerSummary: '' + negCount,
        solutionSteps: [
          'Dựa vào đồ thị suy ra $a ' + (a > 0 ? '> 0$' : '< 0$') + '.',
          'Đạo hàm $y\' = 3ax^2 + 2bx + c$ có hai nghiệm $x_1, x_2$ với $x_1 + x_2 = -\\frac{2b}{3a} ' + sumSign + ' \\Rightarrow b ' + (b > 0 ? '> 0$' : '< 0$') + '.',
          'Tích $x_1 x_2 = \\frac{c}{3a} ' + prodSign + ' \\Rightarrow c ' + (c > 0 ? '> 0$' : '< 0$') + '.',
          'Tại $x = 0$ có $y = d ' + (d > 0 ? '> 0$' : '< 0$') + '. Vậy có đúng $' + negCount + '$ hệ số âm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = 0', params: { aSign: -1, x1: 0, x2: 1, dSign: -2 }, expectedValid: false },
      { label: 'Biên dSign = 0', params: { aSign: -1, x1: -2, x2: 1, dSign: 0 }, expectedValid: false },
      { label: 'Biên chuẩn aSign=-1, x1=-2, x2=1, dSign=-2', params: { aSign: -1, x1: -2, x2: 1, dSign: -2 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24)
  t12_b4_d24_rational_sign_count_sa: {
    id: 't12_b4_d24_rational_sign_count_sa',
    name: 'Đếm số hệ số dương của hàm phân thức y = (ax+b)/(cx+d) từ đồ thị',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Xác định dấu hệ số từ đồ thị hàm số',
    description:
      'Cho đồ thị hàm số phân thức y = (ax+b)/(cx+d) (không ghi số trên trục) với giả thiết dấu của a. Đếm số hệ số dương trong các số b, c, d.',
    conditionSummary: 'a, b, c, d ≠ 0, ad - bc ≠ 0, vị trí tiệm cận và giao điểm Oy tách biệt rõ với gốc O',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -2, max: 2, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -3, max: 3, allowZero: false },
      { name: 'c', label: 'Hệ số c', min: -2, max: 2, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0) return { valid: false, reason: 'Các hệ số phải khác 0 để xác định dấu rõ ràng' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm đồ thị suy biến thành đường thẳng nằm ngang' };
      const v = Math.abs(-d / c);
      const h = Math.abs(a / c);
      const y0 = Math.abs(b / d);
      if (v < 0.5 || v > 3 || h < 0.5 || h > 3 || y0 < 0.5 || y0 > 3.5) {
        return { valid: false, reason: 'Tiệm cận hoặc giao điểm Oy quá sát gốc hoặc vượt khung' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const posCount = [b, c, d].filter((v) => v > 0).length;
      const vAsym = -d / c;
      const hAsym = a / c;
      const yInt = b / d;
      const aCond = a < 0 ? 'a < 0' : 'a > 0';

      return {
        stem: 'Cho hàm số $y = \\frac{ax + b}{cx + d}$ với $' + aCond + '$ có đồ thị như hình vẽ bên. Có bao nhiêu số dương trong các số $b, c, d$?',
        diagram: {
          kind: 'function_plot',
          curveType: 'rational_2_1',
          coeffs: [0, a, b, c, d],
          xMin: -5,
          xMax: 5,
          yMin: -5,
          yMax: 5,
          xTicks: [],
          yTicks: [],
          verticalAsymptote: vAsym,
          obliqueAsymptote: { m: 0, q: hAsym },
        },
        shortAnswer: '' + posCount,
        numericValue: posCount,
        answerSummary: '' + posCount,
        solutionSteps: [
          'Theo giả thiết ta đã có $' + aCond + '$.',
          'Đường tiệm cận ngang $y = \\frac{a}{c} ' + (hAsym > 0 ? '> 0$' : '< 0$') + ' suy ra $c ' + (c > 0 ? '> 0$' : '< 0$') + '.',
          'Đường tiệm cận đứng $x = -\\frac{d}{c} ' + (vAsym > 0 ? '> 0$' : '< 0$') + ' suy ra $d ' + (d > 0 ? '> 0$' : '< 0$') + '.',
          'Đồ thị cắt trục $Oy$ tại điểm có tung độ $y = \\frac{b}{d} ' + (yInt > 0 ? '> 0$' : '< 0$') + ' suy ra $b ' + (b > 0 ? '> 0$' : '< 0$') + '. Vậy có $' + posCount + '$ hệ số dương trong $b, c, d$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0 (qua gốc O)', params: { a: -1, b: 0, c: 1, d: 1 }, expectedValid: false },
      { label: 'Biên ad - bc = 0', params: { a: -1, b: -2, c: 1, d: 2 }, expectedValid: false },
      { label: 'Biên chuẩn a=-1, b=-2, c=1, d=1', params: { a: -1, b: -2, c: 1, d: 1 }, expectedValid: true },
    ],
  },

  // Dạng 25 (Q25)
  t12_b4_d25_rational_2_1_coeff_sa: {
    id: 't12_b4_d25_rational_2_1_coeff_sa',
    name: 'Xác định hệ số hàm phân thức y = (ax² + bx - 1)/(x + c) từ đồ thị',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đọc đồ thị và xác định hàm số',
    description:
      'Cho đồ thị hàm số y = (ax² + bx - 1)/(x + c) có tiệm cận đứng nguyên và tiệm cận xiên y = ax. Tính 2a - b - 4c.',
    conditionSummary: 'a ∈ {-1, 1}, c ∈ [-4; 4] \\ {0} và b = ac để tiệm cận xiên là y = ax',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, allowZero: false },
      { name: 'c', label: 'Tham số c', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, c } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1} để tiệm cận xiên rõ nét' };
      if (c === 0 || Math.abs(c) > 5) return { valid: false, reason: 'Chọn c ≠ 0 và |c| <= 5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c } = params;
      const b = a * c;
      const ans = 2 * a - b - 4 * c;
      const x0 = -c;
      const xMin = Math.min(-8, x0 - 6);
      const xMax = Math.max(8, x0 + 6);
      const yMin = -8;
      const yMax = 8;
      const xTicks = [-6, -4, -2, 2, 4, 6].filter((t) => t > xMin && t < xMax);
      const yTicks = [-6, -4, -2, 2, 4, 6];
      const tcx = a === 1 ? 'y = x' : 'y = -x';

      return {
        stem: 'Cho hàm số $y = \\frac{ax^2 + bx - 1}{x + c}$ có đồ thị như hình vẽ dưới đây. Tính $2a - b - 4c$.',
        diagram: {
          kind: 'function_plot',
          curveType: 'rational_2_1',
          coeffs: [a, b, -1, 1, c],
          xMin,
          xMax,
          yMin,
          yMax,
          xTicks,
          yTicks,
          verticalAsymptote: x0,
          obliqueAsymptote: { m: a, q: 0 },
        },
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '' + ans,
        solutionSteps: [
          'Đồ thị có đường tiệm cận đứng là $x = ' + x0 + '$ nên $' + x0 + ' + c = 0 \\Rightarrow c = ' + c + '$.',
          'Đồ thị có đường tiệm cận xiên đi qua gốc tọa độ là $' + tcx + '$. Thực hiện chia tử cho mẫu: $y = ax + (b - ac) - \\frac{1 + c(b - ac)}{x + c}$.',
          'Suy ra $a = ' + a + '$ và $b - ac = 0 \\Rightarrow b = ' + b + '$.',
          'Do đó $2a - b - 4c = 2(' + a + ') - (' + b + ') - 4(' + c + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0 (TCĐ trùng Oy)', params: { a: -1, c: 0 }, expectedValid: false },
      { label: 'Biên a = 0', params: { a: 0, c: 2 }, expectedValid: false },
      { label: 'Biên chuẩn a=-1, c=2', params: { a: -1, c: 2 }, expectedValid: true },
    ],
  },

  // Dạng 26 (Q26)
  t12_b4_d26_rational_2_1_asym_inter_sa: {
    id: 't12_b4_d26_rational_2_1_asym_inter_sa',
    name: 'Tính biểu thức tọa độ giao điểm hai tiệm cận của hàm (x²+bx+c)/(x+p)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tiệm cận và tâm đối xứng đồ thị hàm số',
    description:
      'Cho hàm số y = (x² + bx + c)/(x + p) có giao điểm hai tiệm cận là I(m; n). Tính giá trị biểu thức u1·m + u2·n.',
    conditionSummary: 'p ≠ 0 và phần dư p² - b·p + c ≠ 0 để tồn tại tiệm cận đứng và tiệm cận xiên',
    paramSpecs: [
      { name: 'b', label: 'Hệ số b', min: -8, max: 8 },
      { name: 'c', label: 'Hệ số c', min: -25, max: 25 },
      { name: 'p', label: 'Tham số mẫu p', min: -7, max: 7, allowZero: false },
      { name: 'u1', label: 'Hệ số u1', min: 2, max: 9 },
      { name: 'u2', label: 'Hệ số u2', min: 2, max: 6 },
    ],
    validateCode: `
      const { b, c, p, u1, u2 } = params;
      if (p === 0) return { valid: false, reason: 'Chọn p ≠ 0 để mẫu khác x tầm thường' };
      const rem = p * p - b * p + c;
      if (rem === 0) return { valid: false, reason: 'Tử chia hết cho mẫu, không có tiệm cận đứng và tiệm cận xiên' };
      if (Math.abs(b) > 30 || Math.abs(c) > 100 || Math.abs(p) > 20 || u1 <= 0 || u2 <= 0) {
        return { valid: false, reason: 'Tham số ngoài giới hạn tính toán đẹp' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, c, p, u1, u2 } = params;
      const numPoly = u.formatQuadratic(1, b, c);
      const denPoly = u.formatShift('x', p);
      const rem = p * p - b * p + c;
      const qConst = b - p;
      const tcx = u.formatLinear(1, qConst);
      const m = -p;
      const n = m + qConst;
      const ans = u1 * m + u2 * n;
      const remLatex = (rem >= 0 ? ' + ' : ' - ') + '\\frac{' + Math.abs(rem) + '}{' + denPoly + '}';

      return {
        stem: 'Cho hàm số $y = \\frac{' + numPoly + '}{' + denPoly + '}$ có đồ thị là $(C)$. Tọa độ giao điểm hai tiệm cận của đồ thị $(C)$ là điểm $I(m;\\, n)$. Tính giá trị của biểu thức $' + u1 + 'm + ' + u2 + 'n$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '' + ans,
        solutionSteps: [
          'Ta có $y = ' + tcx + remLatex + '$.',
          'Vì số dư $' + rem + ' \\neq 0$ nên đồ thị có tiệm cận đứng $x = ' + m + '$ và tiệm cận xiên $y = ' + tcx + '$.',
          'Giao điểm hai tiệm cận là $I(' + m + ';\\, ' + n + ')$. Do đó $' + u1 + 'm + ' + u2 + 'n = ' + u1 + '\\cdot(' + m + ') + ' + u2 + '\\cdot(' + n + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tử chia hết cho mẫu (p=6, b=1, c=-30)', params: { b: 1, c: -30, p: 6, u1: 8, u2: 4 }, expectedValid: false },
      { label: 'Biên p = 0', params: { b: 1, c: -20, p: 0, u1: 8, u2: 4 }, expectedValid: false },
      { label: 'Biên chuẩn b=1, c=-20, p=6, u1=8, u2=4', params: { b: 1, c: -20, p: 6, u1: 8, u2: 4 }, expectedValid: true },
    ],
  },
};
