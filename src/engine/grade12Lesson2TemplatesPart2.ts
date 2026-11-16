import { MathTemplate } from '../types/math';

export const G12_B2_TEMPLATES_PART2: Record<string, MathTemplate> = {
  // Dạng 13 [TF - Hiểu]: 4 mệnh đề về đạo hàm, cực trị, giá trị và GTNN của hàm bậc ba trên [L; R]
  t12_b2_d13_cubic_4prop_tf: {
    id: 't12_b2_d13_cubic_4prop_tf',
    name: 'Dạng 13: Đúng - Sai về tính chất và GTNN của hàm bậc ba trên đoạn',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Hàm bậc ba (Đúng/Sai)',
    description:
      'Cho hàm bậc ba y = ax^3 + bx^2 + cx + d. Xét 4 mệnh đề về đạo hàm, nghiệm y\' = 0, giá trị tại cực trị và GTNN trên đoạn [L; R].',
    conditionSummary: 'a ∈ {-1, 1}, x1 < x2, x1 + x2 chẵn, L < x1 < x2 < R',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc ba a', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'x1', label: 'Điểm cực trị x1', min: -2, max: 4 },
      { name: 'x2', label: 'Điểm cực trị x2', min: 1, max: 7 },
      { name: 'd', label: 'Hệ số tự do d', min: -6, max: 6 },
      { name: 'dL', label: 'Khoảng cách L đến x1', min: 1, max: 4 },
      { name: 'dR', label: 'Khoảng cách x2 đến R', min: 1, max: 3 },
    ],
    validateCode: `
      const { a, x1, x2, dL, dR } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'Chọn a ∈ {-1, 1}' };
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2' };
      if ((x1 + x2) % 2 !== 0) return { valid: false, reason: 'Cần x1 + x2 chẵn để hệ số b nguyên' };
      if (dL < 1 || dR < 1) return { valid: false, reason: 'Cần L < x1 và x2 < R' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2, d, dL, dR } = params;
      const L = x1 - dL;
      const R = x2 + dR;
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const poly = u.formatPoly([a, b, c, d]);
      const dPoly = u.formatQuadratic(3 * a, 2 * b, c);
      const evalF = (x) => a * x * x * x + b * x * x + c * x + d;
      const yL = evalF(L);
      const y1 = evalF(x1);
      const y2 = evalF(x2);
      const yR = evalF(R);
      const minVal = Math.min(yL, y1, y2, yR);
      const wrongMinClaim = minVal === y1 ? y2 : y1;
      const fakeR1 = x1 - 2;
      const fakeR2 = x2 + 2;

      const tfStatements = [
        { key: 'a', text: "$y' = " + dPoly + '$', isTrue: true },
        { key: 'b', text: "$y' = 0$ khi $x = " + fakeR1 + ',\\, x = ' + fakeR2 + '$', isTrue: false },
        { key: 'c', text: '$y(' + x1 + ') = ' + y1 + '$', isTrue: true },
        {
          key: 'd',
          text: 'Giá trị nhỏ nhất của hàm số trên đoạn $[' + L + ';\\, ' + R + ']$ bằng $' + wrongMinClaim + '$',
          isTrue: false,
        },
      ];
      return {
        stem: 'Cho hàm số $y = ' + poly + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Khẳng định đã cho là khẳng định đúng. Ta có $y' = " + dPoly + '$.',
          "b) Khẳng định đã cho là khẳng định sai. Giải $y' = " + dPoly + ' = 0$ ta được $x = ' + x1 + ',\\, x = ' + x2 + '$.',
          'c) Khẳng định đã cho là khẳng định đúng. Thay $x = ' + x1 + '$ vào hàm số ta có $y(' + x1 + ') = ' + y1 + '$.',
          'd) Khẳng định đã cho là khẳng định sai. Ta có $y(' + L + ') = ' + yL + ',\\; y(' + x1 + ') = ' + y1 + ',\\; y(' + x2 + ') = ' + y2 + ',\\; y(' + R + ') = ' + yR + '$. Do đó $\\min_{[' + L + ';\\, ' + R + ']} y = ' + minVal + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x1=4, x2=6, d=-3, [0;7])',
        params: { a: 1, x1: 4, x2: 6, d: -3, dL: 4, dR: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi x1 + x2 lẻ',
        params: { a: 1, x1: 1, x2: 4, d: 0, dL: 1, dR: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 14 [TF - Hiểu]: 4 mệnh đề về hàm phân thức bậc nhất/bậc nhất (ax+b)/(x-x0)
  t12_b2_d14_rat11_4prop_tf: {
    id: 't12_b2_d14_rat11_4prop_tf',
    name: 'Dạng 14: Đúng - Sai về đạo hàm, đơn điệu và GTLN của hàm (ax+b)/(x-x0)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Hàm phân thức (Đúng/Sai)',
    description:
      'Cho hàm phân thức y = (ax + b)/(x - x0). Xét 4 mệnh đề về đạo hàm, dấu đạo hàm, giá trị tại đầu mút và GTLN trên đoạn [L; R].',
    conditionSummary: '-a*x0 - b ≠ 0, x0 ∉ [L; R]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -6, max: 6 },
      { name: 'x0', label: 'Nghiệm mẫu x0', min: -7, max: 7 },
      { name: 'side', label: 'Phía đoạn (-1 trái, 1 phải)', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'lenSeg', label: 'Độ dài đoạn', min: 2, max: 4 },
    ],
    validateCode: `
      const { a, b, x0, side, lenSeg } = params;
      if (a === 0) return { valid: false, reason: 'a phải khác 0' };
      if (side !== -1 && side !== 1) return { valid: false, reason: 'side ∈ {-1, 1}' };
      if (lenSeg < 2) return { valid: false, reason: 'Độ dài đoạn tối thiểu bằng 2' };
      const det = -a * x0 - b;
      if (det === 0) return { valid: false, reason: 'Tử và mẫu tỉ lệ, hàm suy biến hằng số' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0, side, lenSeg } = params;
      const L = side === -1 ? x0 - 1 - lenSeg : x0 + 1;
      const R = side === -1 ? x0 - 1 : x0 + 1 + lenSeg;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatShift('x', -x0);
      const det = -a * x0 - b;
      const yL = u.simplifyFrac(a * L + b, L - x0);
      const yR = u.simplifyFrac(a * R + b, R - x0);
      const isInc = det > 0;
      const maxVal = isInc ? yR : yL;

      const tfStatements = [
        {
          key: 'a',
          text: "$y' = \\dfrac{" + (-det) + '}{(' + denStr + ')^2}$',
          isTrue: false,
        },
        {
          key: 'b',
          text: "$y' > 0$ với mọi $x \\neq " + x0 + '$',
          isTrue: isInc,
        },
        {
          key: 'c',
          text: '$y(' + R + ') = ' + yR.latex + '$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Giá trị lớn nhất của hàm số trên đoạn $[' + L + ';\\, ' + R + ']$ là $' + maxVal.latex + '$',
          isTrue: true,
        },
      ];
      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numStr + '}{' + denStr + '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Khẳng định đã cho là khẳng định sai. Đạo hàm đúng là $y' = \\dfrac{" + det + '}{(' + denStr + ')^2}$.',
          "b) Khẳng định đã cho là khẳng định " + (isInc ? 'đúng' : 'sai') + ". Vì $" + det + (isInc ? ' > 0$' : ' < 0$') + " nên $y' " + (isInc ? '> 0$' : '< 0$') + ' với mọi $x \\neq ' + x0 + '$.',
          'c) Khẳng định đã cho là khẳng định đúng. Thay $x = ' + R + '$ ta được $y(' + R + ') = ' + yR.latex + '$.',
          'd) Khẳng định đã cho là khẳng định đúng. Ta có $y(' + L + ') = ' + yL.latex + ',\\; y(' + R + ') = ' + yR.latex + '$ và hàm số ' + (isInc ? 'đồng biến' : 'nghịch biến') + ' trên $(' + L + ';\\, ' + R + ')$, nên $\\max_{[' + L + ';\\, ' + R + ']} y = ' + maxVal.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc ((4x-1)/(x+7) trên [-10; -8])',
        params: { a: 4, b: -1, x0: -7, side: -1, lenSeg: 2 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi tử tỉ lệ mẫu (det = 0)',
        params: { a: 2, b: 6, x0: -3, side: 1, lenSeg: 2 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 15 [TF - Vận dụng]: Hàm bậc ba y = 2x^3 + bx^2 + cx + d, GTNN trên (x1; +∞) và |f(x)| + k
  t12_b2_d15_cubic_abs_shift_tf: {
    id: 't12_b2_d15_cubic_abs_shift_tf',
    name: 'Dạng 15: Đúng - Sai về cực trị và GTNN của |f(x)| + k trên đoạn cực trị',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hàm trị tuyệt đối (Đúng/Sai)',
    description:
      'Cho hàm số y = f(x) = 2x^3 + bx^2 + cx + d có hai cực trị x1 < x2 với f(x1) > 0 > f(x2). Xét GTNN trên (x1; +∞) và GTNN của |f(x)| + k.',
    conditionSummary: 'x1 < x2 và f(x1) > 0 > f(x2), k > 0',
    paramSpecs: [
      { name: 'x1', label: 'Điểm cực đại x1', min: -3, max: -1 },
      { name: 'x2', label: 'Điểm cực tiểu x2', min: 1, max: 3 },
      { name: 'd', label: 'Hệ số tự do d', min: -5, max: 5 },
      { name: 'k', label: 'Hằng số cộng thêm k', min: 1, max: 6 },
    ],
    validateCode: `
      const { x1, x2, d, k } = params;
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2' };
      if (k <= 0) return { valid: false, reason: 'Cần k > 0' };
      const b = -3 * (x1 + x2);
      const c = 6 * x1 * x2;
      const evalF = (x) => 2 * x * x * x + b * x * x + c * x + d;
      if (!(evalF(x1) > 0 && evalF(x2) < 0)) {
        return { valid: false, reason: 'Cần f(x1) > 0 > f(x2) để đồ thị cắt trục hoành trên (x1; x2)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, d, k } = params;
      const b = -3 * (x1 + x2);
      const c = 6 * x1 * x2;
      const poly = u.formatPoly([2, b, c, d]);
      const dPoly = u.formatQuadratic(6, 2 * b, c);
      const evalF = (x) => 2 * x * x * x + b * x * x + c * x + d;
      const f1 = evalF(x1);
      const f2 = evalF(x2);
      const wrongAbsMin = Math.abs(f2) + k;

      const tfStatements = [
        { key: 'a', text: "$y' = " + dPoly + '$', isTrue: true },
        { key: 'b', text: "$y' = 0$ vô nghiệm", isTrue: false },
        {
          key: 'c',
          text: 'Giá trị nhỏ nhất của hàm số trên khoảng $(' + x1 + ';\\, +\\infty)$ bằng $' + f2 + '$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Giá trị nhỏ nhất của hàm số $y = |f(x)| + ' + k + '$ trên đoạn $[' + x1 + ';\\, ' + x2 + ']$ bằng $' + wrongAbsMin + '$',
          isTrue: false,
        },
      ];
      return {
        stem: 'Cho hàm số $y = f(x) = ' + poly + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
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
            { kind: 'single', pos: 'top', value: '' + f1 },
            { kind: 'single', pos: 'bot', value: '' + f2 },
            { kind: 'single', pos: 'top', value: '+\\infty' },
          ],
        },
        solutionSteps: [
          "a) Khẳng định đã cho là khẳng định đúng. Ta có $y' = " + dPoly + '$.',
          "b) Khẳng định đã cho là khẳng định sai. $y' = 0 \\Leftrightarrow x = " + x1 + '$ hoặc $x = ' + x2 + '$.',
          'c) Khẳng định đã cho là khẳng định đúng. Lập bảng biến thiên ta có giá trị nhỏ nhất của hàm số trên khoảng $(' + x1 + ';\\, +\\infty)$ là $f(' + x2 + ') = ' + f2 + '$.',
          'd) Khẳng định đã cho là khẳng định sai. Vì $f(' + x1 + ') = ' + f1 + ' > 0$ và $f(' + x2 + ') = ' + f2 + ' < 0$ nên phương trình $f(x) = 0$ có nghiệm trên $(' + x1 + ';\\, ' + x2 + ')$, suy ra $\\min_{[' + x1 + ';\\, ' + x2 + ']} |f(x)| = 0$. Do đó $\\min_{[' + x1 + ';\\, ' + x2 + ']} (|f(x)| + ' + k + ') = 0 + ' + k + ' = ' + k + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x1=-2, x2=1, d=-2, k=3)',
        params: { x1: -2, x2: 1, d: -2, k: 3 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi f(x1) <= 0 (không đổi dấu)',
        params: { x1: -1, x2: 1, d: -6, k: 2 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 16 [TF - Vận dụng]: Hàm phân thức bậc 2/bậc 1 (x^2 + bx + c)/(x - x0), cực trị, S_OAB, đt qua 2 cực trị, GTLN+GTNN
  t12_b2_d16_rat21_4prop_tf: {
    id: 't12_b2_d16_rat21_4prop_tf',
    name: 'Dạng 16: Đúng - Sai về hàm phân thức bậc hai trên bậc nhất',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hàm bậc 2/bậc 1 (Đúng/Sai)',
    description:
      'Cho hàm số y = (x^2 + bx + c)/(x - x0) có hai điểm cực trị A, B. Xét đơn điệu, diện tích OAB, đường thẳng AB và sự tồn tại GTLN + GTNN qua tiệm cận đứng.',
    conditionSummary: 'k >= 2, b ≠ 0, đoạn [L; R] chứa x0 ở bên trong',
    paramSpecs: [
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -3, max: 4 },
      { name: 'k', label: 'Khoảng cách cực trị k', min: 2, max: 5 },
      { name: 'b', label: 'Hệ số b', min: -5, max: 5, allowZero: false },
      { name: 'du', label: 'Độ lệch u < x1', min: 1, max: 3 },
      { name: 'dL', label: 'Độ lệch L < x0', min: 1, max: 3 },
      { name: 'dR', label: 'Độ lệch x0 < R', min: 1, max: 3 },
    ],
    validateCode: `
      const { k, b, du, dL, dR } = params;
      if (k < 2) return { valid: false, reason: 'Cần k >= 2' };
      if (b === 0) return { valid: false, reason: 'Cần b ≠ 0 để O, A, B không thẳng hàng (S_OAB > 0)' };
      if (du < 1 || dL < 1 || dR < 1) return { valid: false, reason: 'Khoảng cách phải >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, k, b, du, dL, dR } = params;
      const c = k * k - x0 * x0 - b * x0;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const y1 = 2 * x1 + b;
      const y2 = 2 * x2 + b;
      const areaOAB = Math.abs(b) * k;
      const uVal = x1 - du;
      const L = x0 - dL;
      const R = x0 + dR;
      const numPoly = u.formatQuadratic(1, b, c);
      const denPoly = u.formatShift('x', -x0);
      const trueLine = 'y = ' + u.formatLinear(2, b);
      const falseLine = 'y = ' + u.formatLinear(2, b + 1);
      const numDeriv = u.formatQuadratic(1, -2 * x0, x0 * x0 - k * k);

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số đã cho nghịch biến trên khoảng $(-\\infty;\\, ' + uVal + ')$',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Gọi $A, B$ là các điểm cực trị của đồ thị hàm số. Diện tích tam giác $OAB$ bằng $' + areaOAB + '$',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Đường thẳng đi qua hai điểm cực trị của đồ thị hàm số là $' + falseLine + '$',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Tổng giá trị lớn nhất và giá trị nhỏ nhất của hàm số trên đoạn $[' + L + ';\\, ' + R + ']$ không tồn tại',
          isTrue: true,
        },
      ];
      return {
        stem:
          'Cho hàm số $y = f(x) = \\dfrac{' +
          numPoly +
          '}{' +
          denPoly +
          '}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Khẳng định đã cho là khẳng định sai. Ta có $f'(x) = 1 - \\dfrac{" + k * k + '}{(' + denPoly + ')^2} = \\dfrac{' + numDeriv + '}{(' + denPoly + ')^2}$. Vì $' + uVal + ' < ' + x1 + "$ nên với $x < " + uVal + "$ ta có $f'(x) > 0$, hàm số đồng biến trên $(-\\infty;\\, " + uVal + ')$.',
          'b) Khẳng định đã cho là khẳng định đúng. Hai điểm cực trị là $A(' + x1 + ';\\, ' + y1 + ')$ và $B(' + x2 + ';\\, ' + y2 + ')$. Suy ra $S_{OAB} = \\dfrac{1}{2}|x_A y_B - x_B y_A| = ' + areaOAB + '$.',
          'c) Khẳng định đã cho là khẳng định sai. Đường thẳng đi qua hai điểm cực trị $A, B$ có phương trình là $' + trueLine + '$.',
          'd) Khẳng định đã cho là khẳng định đúng. Tiệm cận đứng của đồ thị là $x = ' + x0 + ' \\in (' + L + ';\\, ' + R + ')$ làm hàm số không xác định và không bị chặn trên $[' + L + ';\\, ' + R + '] \\setminus \\{' + x0 + '\\}$, nên tổng GTLN và GTNN không tồn tại.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x0=2, k=4, b=-4, [-1;4])',
        params: { x0: 2, k: 4, b: -4, du: 3, dL: 3, dR: 2 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi b = 0 (S_OAB = 0)',
        params: { x0: 2, k: 4, b: 0, du: 2, dL: 2, dR: 2 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 17 [TF - Vận dụng]: Hàm lượng giác f(x) = -2c cos x - c r x trên [0; U]
  t12_b2_d17_trig_cos_linear_tf: {
    id: 't12_b2_d17_trig_cos_linear_tf',
    name: 'Dạng 17: Đúng - Sai về GTLN/GTNN của hàm lượng giác f(x) = -a cos x - bx',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hàm lượng giác (Đúng/Sai)',
    description:
      'Cho hàm số f(x) = -2c cos x - c*r*x trên đoạn [0; U] với r ∈ {√3, 1}. Xét giá trị tại 0, đạo hàm, số nghiệm f\'(x) = 0 và GTNN.',
    conditionSummary: 'c ∈ {1, 2, 3}, mode ∈ {0, 1} đảm bảo phương trình f\'(x) = 0 có đúng 2 nghiệm trên đoạn',
    paramSpecs: [
      { name: 'c', label: 'Hệ số tỉ lệ c', min: 1, max: 3 },
      { name: 'mode', label: 'Dạng góc (0: √3 trên [0;3π/4], 1: 1 trên [0;π])', min: 0, max: 1 },
    ],
    validateCode: `
      const { c, mode } = params;
      if (c < 1 || c > 3) return { valid: false, reason: 'c phải thuộc [1; 3]' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode ∈ {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, mode } = params;
      const aCoef = 2 * c;
      const f0 = -2 * c;
      if (mode === 0) {
        const bLatex = c === 1 ? '\\sqrt{3}' : c + '\\sqrt{3}';
        const minLatex =
          c === 1
            ? '-\\dfrac{\\sqrt{3}\\pi}{3} - 1'
            : '-\\dfrac{' + c + '\\sqrt{3}\\pi}{3} - ' + c;
        const f23Latex =
          c === 1
            ? '-\\dfrac{2\\sqrt{3}\\pi}{3} + 1'
            : '-\\dfrac{' + 2 * c + '\\sqrt{3}\\pi}{3} + ' + c;
        const f34Latex =
          c === 1
            ? '-\\dfrac{3\\sqrt{3}\\pi}{4} + \\sqrt{2}'
            : '-\\dfrac{' + 3 * c + '\\sqrt{3}\\pi}{4} + ' + c + '\\sqrt{2}';
        const tfStatements = [
          { key: 'a', text: '$f(0) = ' + f0 + '$', isTrue: true },
          { key: 'b', text: "$f'(x) = " + aCoef + '\\sin x - ' + bLatex + '$', isTrue: true },
          {
            key: 'c',
            text: "Số nghiệm của phương trình $f'(x) = 0$ trên đoạn $\\left[0;\\, \\dfrac{3\\pi}{4}\\right]$ là $2$",
            isTrue: true,
          },
          {
            key: 'd',
            text: "Giá trị nhỏ nhất của $f(x)$ trên đoạn $\\left[0;\\, \\dfrac{3\\pi}{4}\\right]$ là $" + f0 + '$',
            isTrue: false,
          },
        ];
        return {
          stem: 'Cho hàm số $f(x) = -' + aCoef + '\\cos x - ' + bLatex + 'x$. Xét tính đúng-sai của các khẳng định sau:',
          tfStatements,
          answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
          solutionSteps: [
            'a) Khẳng định đã cho là khẳng định đúng. $f(0) = -' + aCoef + '\\cos 0 = ' + f0 + '$.',
            "b) Khẳng định đã cho là khẳng định đúng. $f'(x) = " + aCoef + '\\sin x - ' + bLatex + '$.',
            "c) Khẳng định đã cho là khẳng định đúng. Giải $f'(x) = 0 \\Leftrightarrow \\sin x = \\dfrac{\\sqrt{3}}{2}$, trên $\\left[0;\\, \\dfrac{3\\pi}{4}\\right]$ có đúng $2$ nghiệm $x = \\dfrac{\\pi}{3}$ và $x = \\dfrac{2\\pi}{3}$.",
            'd) Khẳng định đã cho là khẳng định sai. Ta có $f(0) = ' + f0 + '$, $f\\left(\\dfrac{\\pi}{3}\\right) = ' + minLatex + '$, $f\\left(\\dfrac{2\\pi}{3}\\right) = ' + f23Latex + '$, $f\\left(\\dfrac{3\\pi}{4}\\right) = ' + f34Latex + '$. Giá trị nhỏ nhất trên đoạn là $' + minLatex + '$.',
          ],
        };
      } else {
        const bLatex = c === 1 ? '' : '' + c;
        const minLatex =
          c === 1
            ? '-\\sqrt{3} - \\dfrac{\\pi}{6}'
            : '-' + c + '\\sqrt{3} - \\dfrac{' + c + '\\pi}{6}';
        const f56Latex =
          c === 1
            ? '\\sqrt{3} - \\dfrac{5\\pi}{6}'
            : c + '\\sqrt{3} - \\dfrac{' + 5 * c + '\\pi}{6}';
        const fPiLatex = c === 1 ? '2 - \\pi' : 2 * c + ' - ' + c + '\\pi';
        const tfStatements = [
          { key: 'a', text: '$f(0) = ' + f0 + '$', isTrue: true },
          { key: 'b', text: "$f'(x) = " + aCoef + '\\sin x - ' + c + '$', isTrue: true },
          {
            key: 'c',
            text: "Số nghiệm của phương trình $f'(x) = 0$ trên đoạn $[0;\\, \\pi]$ là $2$",
            isTrue: true,
          },
          {
            key: 'd',
            text: 'Giá trị nhỏ nhất của $f(x)$ trên đoạn $[0;\\, \\pi]$ là $' + f0 + '$',
            isTrue: false,
          },
        ];
        return {
          stem: 'Cho hàm số $f(x) = -' + aCoef + '\\cos x - ' + bLatex + 'x$. Xét tính đúng-sai của các khẳng định sau:',
          tfStatements,
          answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
          solutionSteps: [
            'a) Khẳng định đã cho là khẳng định đúng. $f(0) = ' + f0 + '$.',
            "b) Khẳng định đã cho là khẳng định đúng. $f'(x) = " + aCoef + '\\sin x - ' + c + '$.',
            "c) Khẳng định đã cho là khẳng định đúng. Giải $f'(x) = 0 \\Leftrightarrow \\sin x = \\dfrac{1}{2}$, trên $[0;\\, \\pi]$ có $2$ nghiệm $x = \\dfrac{\\pi}{6}$ và $x = \\dfrac{5\\pi}{6}$.",
            'd) Khẳng định đã cho là khẳng định sai. Ta có $f(0) = ' + f0 + '$, $f\\left(\\dfrac{\\pi}{6}\\right) = ' + minLatex + '$, $f\\left(\\dfrac{5\\pi}{6}\\right) = ' + f56Latex + '$, $f(\\pi) = ' + fPiLatex + '$. Giá trị nhỏ nhất trên $[0;\\, \\pi]$ là $' + minLatex + '$.',
          ],
        };
      }
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (c=1, r=√3)', params: { c: 1, mode: 0 }, expectedValid: true },
      { label: 'Biên lỗi c = 0', params: { c: 0, mode: 0 }, expectedValid: false },
    ],
  },

  // Dạng 18 [TF - Vận dụng]: Hàm lượng giác f(x) = 2c sin x - c √2 x trên [π/2; π] hoặc [2π/3; π]
  t12_b2_d18_trig_sin_linear_tf: {
    id: 't12_b2_d18_trig_sin_linear_tf',
    name: 'Dạng 18: Đúng - Sai về hàm f(x) = a sin x - bx trên [π/2; π]',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hàm lượng giác (Đúng/Sai)',
    description:
      'Cho hàm số f(x) = 2c sin x - c√2 x trên đoạn [L; π] (L ∈ {π/2, 2π/3}). Đạo hàm âm trên cả đoạn nên GTLN đạt tại đầu mút trái.',
    conditionSummary: 'c ∈ {1, 2, 3}, lMode ∈ {0, 1}',
    paramSpecs: [
      { name: 'c', label: 'Hệ số tỉ lệ c', min: 1, max: 3 },
      { name: 'lMode', label: 'Đầu mút trái (0: π/2, 1: 2π/3)', min: 0, max: 1 },
    ],
    validateCode: `
      const { c, lMode } = params;
      if (c < 1 || c > 3) return { valid: false, reason: 'c phải thuộc [1; 3]' };
      if (lMode !== 0 && lMode !== 1) return { valid: false, reason: 'lMode ∈ {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, lMode } = params;
      const aCoef = 2 * c;
      const bCoefLatex = c === 1 ? '\\sqrt{2}' : c + '\\sqrt{2}';
      const fPiLatex = c === 1 ? '-\\sqrt{2}\\pi' : '-' + c + '\\sqrt{2}\\pi';
      const segLatex =
        lMode === 0
          ? '\\left[\\dfrac{\\pi}{2};\\, \\pi\\right]'
          : '\\left[\\dfrac{2\\pi}{3};\\, \\pi\\right]';
      const fLeftLatex =
        lMode === 0
          ? '-\\dfrac{' + (c === 1 ? '' : c) + '\\sqrt{2}\\pi}{2} + ' + aCoef
          : '-\\dfrac{' + (c === 1 ? '2' : 2 * c) + '\\sqrt{2}\\pi}{3} + ' + (c === 1 ? '\\sqrt{3}' : c + '\\sqrt{3}');
      const leftPtLatex = lMode === 0 ? '\\dfrac{\\pi}{2}' : '\\dfrac{2\\pi}{3}';

      const tfStatements = [
        { key: 'a', text: '$f(\\pi) = ' + fPiLatex + '$', isTrue: true },
        { key: 'b', text: "$f'(x) = " + aCoef + '\\cos x - ' + bCoefLatex + '$', isTrue: true },
        {
          key: 'c',
          text: "Số nghiệm của phương trình $f'(x) = 0$ trên đoạn $" + segLatex + '$ là $0$',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Giá trị lớn nhất của $f(x)$ trên đoạn $' + segLatex + '$ là $' + fPiLatex + '$',
          isTrue: false,
        },
      ];
      return {
        stem: 'Cho hàm số $f(x) = ' + aCoef + '\\sin x - ' + bCoefLatex + 'x$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Khẳng định đã cho là khẳng định đúng. $f(\\pi) = ' + aCoef + '\\sin\\pi - ' + bCoefLatex + '\\pi = ' + fPiLatex + '$.',
          "b) Khẳng định đã cho là khẳng định đúng. $f'(x) = " + aCoef + '\\cos x - ' + bCoefLatex + '$.',
          "c) Khẳng định đã cho là khẳng định đúng. Vì với $x \\in " + segLatex + '$ ta luôn có $\\cos x \\le 0 < \\dfrac{\\sqrt{2}}{2}$ nên $f\'(x) < 0$, phương trình $f\'(x) = 0$ vô nghiệm trên đoạn đã cho.',
          'd) Khẳng định đã cho là khẳng định sai. Do hàm số nghịch biến trên $' + segLatex + '$ nên giá trị lớn nhất đạt tại đầu mút trái: $f\\left(' + leftPtLatex + '\\right) = ' + fLeftLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (c=1, [π/2; π])', params: { c: 1, lMode: 0 }, expectedValid: true },
      { label: 'Biên lỗi c = 0', params: { c: 0, lMode: 0 }, expectedValid: false },
    ],
  },

  // Dạng 19 [TF - Hiểu]: Đọc đồ thị y = f'(x) (bậc ba), xét đơn điệu, cực đại và GTNN của f(x)
  t12_b2_d19_graph_fprime_maxmin_tf: {
    id: 't12_b2_d19_graph_fprime_maxmin_tf',
    name: 'Dạng 19: Đúng - Sai từ đồ thị hàm số đạo hàm y = f\'(x)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Đồ thị f\'(x) (Đúng/Sai)',
    description:
      'Cho đồ thị hàm số đạo hàm y = f\'(x) cắt trục hoành tại 3 điểm r1 < r2 < r3. Xét tính đơn điệu, điểm cực đại và GTNN của f(x).',
    conditionSummary: 'r1 < r2 < r3 nguyên phân biệt',
    paramSpecs: [
      { name: 'r1', label: 'Nghiệm f\'(x) = 0 thứ nhất', min: -3, max: -1 },
      { name: 'r2', label: 'Nghiệm f\'(x) = 0 thứ hai', min: 0, max: 2 },
      { name: 'r3', label: 'Nghiệm f\'(x) = 0 thứ ba', min: 3, max: 5 },
    ],
    validateCode: `
      const { r1, r2, r3 } = params;
      if (!(r1 < r2 && r2 < r3)) return { valid: false, reason: 'Cần r1 < r2 < r3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, r2, r3 } = params;
      let maxAmp = 1;
      for (let i = 0; i <= 60; i++) {
        const x = r1 + ((r3 - r1) * i) / 60;
        const val = Math.abs((x - r1) * (x - r2) * (x - r3));
        if (val > maxAmp) maxAmp = val;
      }
      const s = Number((3.6 / maxAmp).toFixed(2));
      const c3 = -s;
      const c2 = s * (r1 + r2 + r3);
      const c1 = -s * (r1 * r2 + r2 * r3 + r3 * r1);
      const c0 = s * r1 * r2 * r3;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số nghịch biến trên khoảng $(' + r1 + ';\\, +\\infty)$',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Điểm cực đại của hàm số đã cho trên khoảng $(-\\infty;\\, ' + r2 + ')$ là $x = ' + r1 + '$',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Giá trị nhỏ nhất của hàm số $y = f(x)$ trên khoảng $(' + r1 + ';\\, ' + r3 + ')$ là $f(' + r2 + ')$',
          isTrue: true,
        },
        {
          key: 'd',
          text: '$f(' + r1 + ') > f(' + r2 + ')$',
          isTrue: true,
        },
      ];
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có đồ thị của hàm số $y = f\'(x)$ như hình vẽ. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [c3, c2, c1, c0],
          xMin: r1 - 1.5,
          xMax: r3 + 1.5,
          yMin: -5,
          yMax: 5,
          xTicks: [r1, r2, r3],
          yTicks: [],
          strokeColor: '#c026d3',
          highlightPoints: [
            { x: r1, y: 0 },
            { x: r2, y: 0 },
            { x: r3, y: 0 },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((sItem) => sItem.key + ':' + (sItem.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Khẳng định đã cho là khẳng định sai. Dựa vào đồ thị $y = f'(x)$ ta thấy $f'(x) > 0$ trên các khoảng $(-\\infty;\\, " + r1 + ')$ và $(' + r2 + ';\\, ' + r3 + ")$; $f'(x) < 0$ trên các khoảng $(" + r1 + ';\\, ' + r2 + ')$ và $(' + r3 + ';\\, +\\infty)$. Hàm số không nghịch biến trên cả $(' + r1 + ';\\, +\\infty)$.',
          "b) Khẳng định đã cho là khẳng định đúng. Vì $f'(x)$ đổi dấu từ dương sang âm khi đi qua $x = " + r1 + '$ nên hàm số đạt cực đại tại $x = ' + r1 + '$.',
          "c) Khẳng định đã cho là khẳng định đúng. Trên khoảng $(" + r1 + ';\\, ' + r3 + ')$, hàm số nghịch biến trên $(' + r1 + ';\\, ' + r2 + ')$ và đồng biến trên $(' + r2 + ';\\, ' + r3 + ')$, nên $\\min_{(' + r1 + ';\\, ' + r3 + ')} f(x) = f(' + r2 + ')$.',
          'd) Khẳng định đã cho là khẳng định đúng. Hàm số nghịch biến trên đoạn $[' + r1 + ';\\, ' + r2 + ']$ nên $f(' + r1 + ') > f(' + r2 + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (-2, 1, 4)', params: { r1: -2, r2: 1, r3: 4 }, expectedValid: true },
      { label: 'Biên lỗi r1 >= r2', params: { r1: 1, r2: 1, r3: 4 }, expectedValid: false },
    ],
  },

  // Dạng 20 [SA - Hiểu]: GTLN / GTNN của hàm y = x^3/3 + (b/2)x^2 + cx + d trên [L; R]
  t12_b2_d20_cubic_frac_maxmin_sa: {
    id: 't12_b2_d20_cubic_frac_maxmin_sa',
    name: 'Dạng 20: GTLN/GTNN của hàm y = x^3/3 + (b/2)x^2 + cx + d trên đoạn [a; b]',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Hàm bậc ba (Trả lời ngắn)',
    description:
      'Tìm giá trị lớn nhất hoặc nhỏ nhất của hàm số y = x^3/3 + (b/2)x^2 + cx + d trên đoạn [L; R], làm tròn đến hàng phần mười.',
    conditionSummary: 'x1 < x2 nguyên, L < x1 < x2 < R',
    paramSpecs: [
      { name: 'x1', label: 'Điểm cực trị x1', min: -3, max: 2 },
      { name: 'x2', label: 'Điểm cực trị x2', min: 0, max: 5 },
      { name: 'd', label: 'Hệ số tự do d', min: -5, max: 5 },
      { name: 'dL', label: 'Độ lệch L < x1', min: 1, max: 3 },
      { name: 'dR', label: 'Độ lệch x2 < R', min: 1, max: 4 },
      { name: 'askMax', label: 'Loại câu hỏi (1: GTLN, 0: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x1, x2, d, dL, dR, askMax } = params;
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2' };
      if (dL < 1 || dR < 1) return { valid: false, reason: 'Cần L < x1 và x2 < R' };
      const b = -(x1 + x2);
      const c = x1 * x2;
      const L = x1 - dL;
      const R = x2 + dR;
      const evalF = (x) => (x * x * x) / 3 + (b * x * x) / 2 + c * x + d;
      const vals = [evalF(L), evalF(x1), evalF(x2), evalF(R)];
      const target = askMax === 1 ? Math.max(...vals) : Math.min(...vals);
      const frac10 = Math.abs(target * 10 - Math.floor(target * 10));
      if (Math.abs(frac10 - 0.5) < 0.05) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, d, dL, dR, askMax } = params;
      const b = -(x1 + x2);
      const c = x1 * x2;
      const L = x1 - dL;
      const R = x2 + dR;
      let fxStr = '\\dfrac{x^3}{3}';
      if (b !== 0) {
        if (b % 2 === 0) {
          fxStr += u.formatTerm(b / 2, 'x^2', false);
        } else {
          fxStr += (b > 0 ? ' + ' : ' - ') + '\\dfrac{' + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x^2}{2}';
        }
      }
      if (c !== 0) fxStr += u.formatTerm(c, 'x', false);
      if (d !== 0) fxStr += u.formatTrailingConst(d);

      const dPoly = u.formatQuadratic(1, b, c);
      const evalNum = (x) => 2 * x * x * x + 3 * b * x * x + 6 * c * x + 6 * d;
      const fL = u.simplifyFrac(evalNum(L), 6);
      const f1 = u.simplifyFrac(evalNum(x1), 6);
      const f2 = u.simplifyFrac(evalNum(x2), 6);
      const fR = u.simplifyFrac(evalNum(R), 6);
      const arr = [fL, f1, f2, fR];
      const best = arr.reduce((acc, cur) => (askMax === 1 ? (cur.value > acc.value ? cur : acc) : cur.value < acc.value ? cur : acc));
      const rounded = Number(best.value.toFixed(1));
      const ansStr = Number.isInteger(rounded) ? '' + rounded : u.formatNumberVN(rounded, 1);
      const label = askMax === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';

      return {
        stem:
          'Tìm ' +
          label +
          ' của hàm số $y = ' +
          fxStr +
          '$ trên đoạn $[' +
          L +
          ';\\, ' +
          R +
          ']$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          "Đạo hàm $y' = " + dPoly + "$. Giải $y' = 0 \\Leftrightarrow x = " + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Tính giá trị tại các điểm: $f(' + L + ') = ' + fL.latex + ',\\; f(' + x1 + ') = ' + f1.latex + ',\\; f(' + x2 + ') = ' + f2.latex + ',\\; f(' + R + ') = ' + fR.latex + '$.',
          'Vậy ' + label + ' của hàm số trên đoạn $[' + L + ';\\, ' + R + ']$ là $' + best.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x1=0, x2=3, d=1, [-1;7])',
        params: { x1: 0, x2: 3, d: 1, dL: 1, dR: 4, askMax: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi x1 >= x2',
        params: { x1: 2, x2: 2, d: 1, dL: 1, dR: 2, askMax: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 21 [SA - Biết]: GTNN / GTLN của hàm phân thức (ax+b)/(cx+d) trên [L; R] làm tròn 0.1
  t12_b2_d21_rat11_seg_sa: {
    id: 't12_b2_d21_rat11_seg_sa',
    name: 'Dạng 21: GTLN/GTNN của hàm phân thức (ax+b)/(cx+d) trên đoạn',
    category: 'SA',
    level: 'Biết',
    topicTag: 'GTLN & GTNN — Hàm phân thức (Trả lời ngắn)',
    description:
      'Tìm giá trị nhỏ nhất hoặc lớn nhất của hàm số y = (ax + b)/(cx + d) trên đoạn [L; R], làm tròn đến hàng phần mười.',
    conditionSummary: 'c ≠ 0, ad - bc ≠ 0, -d/c ∉ [L; R]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -8, max: 8 },
      { name: 'c', label: 'Hệ số mẫu c', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hằng số mẫu d', min: -6, max: 6 },
      { name: 'L', label: 'Đầu mút trái L', min: -8, max: -2 },
      { name: 'lenSeg', label: 'Độ dài đoạn', min: 2, max: 4 },
      { name: 'askMin', label: 'Loại (1: GTNN, 0: GTLN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c, d, L, lenSeg } = params;
      if (a === 0 || c === 0) return { valid: false, reason: 'a và c phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm suy biến hàm hằng' };
      const R = L + lenSeg;
      const v1 = c * L + d;
      const v2 = c * R + d;
      if (v1 === 0 || v2 === 0 || v1 * v2 <= 0) {
        return { valid: false, reason: 'Tiệm cận đứng -d/c nằm trên đoạn [L; R]' };
      }
      const yL = (a * L + b) / v1;
      const yR = (a * R + b) / v2;
      const checkRound = (val) => Math.abs(Math.abs(val * 10 - Math.floor(val * 10)) - 0.5) < 0.05;
      if (checkRound(yL) || checkRound(yR)) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, L, lenSeg, askMin } = params;
      const R = L + lenSeg;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const isInc = det > 0;
      const yL = u.simplifyFrac(a * L + b, c * L + d);
      const yR = u.simplifyFrac(a * R + b, c * R + d);
      const target = askMin === 1 ? (yL.value < yR.value ? yL : yR) : yL.value > yR.value ? yL : yR;
      const rounded = Number(target.value.toFixed(1));
      const ansStr = Number.isInteger(rounded) ? '' + rounded : u.formatNumberVN(rounded, 1);
      const label = askMin === 1 ? 'giá trị nhỏ nhất' : 'giá trị lớn nhất';
      const vAsym = u.simplifyFrac(-d, c);

      return {
        stem:
          'Tìm ' +
          label +
          ' của hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$ trên đoạn $[' +
          L +
          ';\\, ' +
          R +
          ']$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          "Đạo hàm $y' = \\dfrac{" + det + '}{(' + denStr + ')^2} ' + (isInc ? '> 0' : '< 0') + '$ với mọi $x \\neq ' + vAsym.latex + '$.',
          'Hàm số ' + (isInc ? 'đồng biến' : 'nghịch biến') + ' trên đoạn $[' + L + ';\\, ' + R + ']$.',
          'Ta có $y(' + L + ') = ' + yL.latex + '$ và $y(' + R + ') = ' + yR.latex + '$. Vậy ' + label + ' bằng $' + target.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc ((-4x+2)/(-6x-1) trên [-6; -4])',
        params: { a: -4, b: 2, c: -6, d: -1, L: -6, lenSeg: 2, askMin: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi tiệm cận đứng nằm trong đoạn',
        params: { a: 2, b: 1, c: 1, d: 3, L: -5, lenSeg: 4, askMin: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 22 [SA - Hiểu]: Tối ưu lợi nhuận cửa hàng giày P(x) = (x - c0)(N - x)
  t12_b2_d22_profit_shoes_sa: {
    id: 't12_b2_d22_profit_shoes_sa',
    name: 'Dạng 22: Bài toán tối ưu giá bán để đạt lợi nhuận lớn nhất',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Ứng dụng thực tế (Trả lời ngắn)',
    description:
      'Cửa hàng nhập giày giá c0 đôla, bán giá x đôla thì bán được N - x đôi/tháng. Tìm giá bán tối ưu để lợi nhuận lớn nhất.',
    conditionSummary: 'N > c0 + 10 và N + c0 chẵn để giá bán tối ưu nguyên',
    paramSpecs: [
      { name: 'c0', label: 'Giá nhập một đôi (đôla)', min: 20, max: 50 },
      { name: 'N', label: 'Ngưỡng cầu N', min: 70, max: 160 },
    ],
    validateCode: `
      const { c0, N } = params;
      if (N <= c0 + 10) return { valid: false, reason: 'Cần N > c0 + 10' };
      if ((N + c0) % 2 !== 0) return { valid: false, reason: 'Cần N + c0 chẵn để đỉnh parabol nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, N } = params;
      const bCoef = N + c0;
      const cCoef = -c0 * N;
      const xOpt = bCoef / 2;
      const pPoly = u.formatQuadratic(-1, bCoef, cCoef);
      return {
        stem:
          'Một cửa hàng kinh doanh giày nhập một đôi với giá là $' +
          c0 +
          '$ đôla. Cửa hàng ước tính rằng nếu mỗi đôi giày được bán với giá $x$ đôla thì mỗi tháng khách hàng sẽ mua $' +
          N +
          ' - x$ đôi. Hỏi cửa hàng nên bán mỗi đôi giày với giá bao nhiêu đôla để thu được lợi nhuận lớn nhất?',
        shortAnswer: '' + xOpt,
        numericValue: xOpt,
        answerSummary: xOpt + ' đôla',
        solutionSteps: [
          'Lợi nhuận mỗi tháng là $P(x) = (x - ' + c0 + ')(' + N + ' - x)$ với điều kiện $' + c0 + ' < x < ' + N + '$.',
          'Khai triển: $P(x) = ' + pPoly + '$.',
          'Đây là hàm bậc hai có hệ số $a = -1 < 0$ nên đạt giá trị lớn nhất tại đỉnh $x = \\dfrac{' + bCoef + '}{2} = ' + xOpt + '$. Vậy giá bán tối ưu là $' + xOpt + '$ đôla.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (c0=35, N=105)', params: { c0: 35, N: 105 }, expectedValid: true },
      { label: 'Biên lỗi N <= c0 + 10', params: { c0: 45, N: 51 }, expectedValid: false },
    ],
  },

  // Dạng 23 [SA - Hiểu]: GTLN của hàm (x^2 + bx + c)e^x trên đoạn [L; R] làm tròn 0.1
  t12_b2_d23_quad_exp_sa: {
    id: 't12_b2_d23_quad_exp_sa',
    name: 'Dạng 23: Tìm GTLN của hàm y = (x^2 + bx + c)e^x trên đoạn',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Hàm mũ (Trả lời ngắn)',
    description:
      'Tìm giá trị lớn nhất của hàm số y = (x^2 + bx + c)e^x trên đoạn [L; R] với y\' = (x - r1)(x - r2)e^x, làm tròn đến hàng phần mười.',
    conditionSummary: 'r1 < r2 nguyên, L < r1 < r2 <= R',
    paramSpecs: [
      { name: 'r1', label: 'Nghiệm cực đại r1', min: -3, max: 0 },
      { name: 'r2', label: 'Nghiệm cực tiểu r2', min: 1, max: 3 },
      { name: 'dL', label: 'Độ lệch L < r1', min: 1, max: 2 },
      { name: 'dR', label: 'Độ lệch r2 <= R', min: 0, max: 1 },
    ],
    validateCode: `
      const { r1, r2, dL, dR } = params;
      if (r1 >= r2) return { valid: false, reason: 'Cần r1 < r2' };
      if (dL < 1 || dR < 0) return { valid: false, reason: 'Cần L < r1 và R >= r2' };
      const b = -(r1 + r2) - 2;
      const c = r1 * r2 - b;
      const L = r1 - dL;
      const R = r2 + dR;
      const evalF = (x) => (x * x + b * x + c) * Math.exp(x);
      const maxVal = Math.max(evalF(L), evalF(r1), evalF(r2), evalF(R));
      if (!Number.isFinite(maxVal) || maxVal > 1e12) {
        return { valid: false, reason: 'Giá trị lũy thừa quá lớn vượt ngưỡng tính toán thực tế' };
      }
      const frac10 = Math.abs(maxVal * 10 - Math.floor(maxVal * 10));
      if (Math.abs(frac10 - 0.5) < 0.05) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, r2, dL, dR } = params;
      const b = -(r1 + r2) - 2;
      const c = r1 * r2 - b;
      const L = r1 - dL;
      const R = r2 + dR;
      const qPoly = u.formatQuadratic(1, b, c);
      const dQPoly = u.formatLinear(2, b);
      const derivQ = u.formatQuadratic(1, -(r1 + r2), r1 * r2);

      const evalF = (x) => (x * x + b * x + c) * Math.exp(x);
      const pts = [L, r1, r2, R];
      const vals = pts.map((x) => evalF(x));
      let bestVal = vals[0];
      let bestX = pts[0];
      for (let i = 1; i < pts.length; i++) {
        if (vals[i] > bestVal) {
          bestVal = vals[i];
          bestX = pts[i];
        }
      }
      const rounded = Number(bestVal.toFixed(1));
      const ansStr = Number.isInteger(rounded) ? '' + rounded : u.formatNumberVN(rounded, 1);
      const coeffBest = bestX * bestX + b * bestX + c;
      const exactBestLatex =
        bestX === 0
          ? '' + coeffBest
          : bestX > 0
            ? coeffBest + 'e^{' + bestX + '}'
            : '\\dfrac{' + coeffBest + '}{e' + (bestX === -1 ? '' : '^{' + Math.abs(bestX) + '}') + '}';

      return {
        stem:
          'Tìm giá trị lớn nhất của hàm số $y = (' +
          qPoly +
          ')e^x$ trên đoạn $[' +
          L +
          ';\\, ' +
          R +
          ']$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          "Ta có $y' = (" + dQPoly + ')e^x + (' + qPoly + ')e^x = (' + derivQ + ')e^x$.',
          "Giải $y' = 0 \\Leftrightarrow x = " + r1 + '$ hoặc $x = ' + r2 + '$ (đều thuộc đoạn $[' + L + ';\\, ' + R + ']$).',
          'So sánh giá trị hàm số tại $x = ' + L + ',\\; ' + r1 + ',\\; ' + r2 + ',\\; ' + R + '$, ta được giá trị lớn nhất tại $x = ' + bestX + '$ bằng $' + exactBestLatex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc ((x^2-2x+1)e^x trên [-2;1])',
        params: { r1: -1, r2: 1, dL: 1, dR: 0 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi r1 >= r2',
        params: { r1: 1, r2: 1, dL: 1, dR: 0 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 24 [SA - Hiểu]: GTLN/GTNN của hàm (x^2 + bx + c)/(x - x0) trên khoảng vô hạn (-∞; x0) hoặc (x0; +∞)
  t12_b2_d24_rat21_open_sa: {
    id: 't12_b2_d24_rat21_open_sa',
    name: 'Dạng 24: GTLN/GTNN của hàm phân thức bậc 2/bậc 1 trên khoảng vô hạn',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Hàm bậc 2/bậc 1 (Trả lời ngắn)',
    description:
      'Tìm GTLN trên (-∞; x0) hoặc GTNN trên (x0; +∞) của hàm số y = (x^2 + bx + c)/(x - x0), làm tròn đến hàng phần mười.',
    conditionSummary: 'k >= 1 nguyên',
    paramSpecs: [
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -6, max: 10 },
      { name: 'k', label: 'Khoảng cách cực trị k', min: 1, max: 5 },
      { name: 'b', label: 'Hệ số b', min: -12, max: 6 },
      { name: 'askMaxLeft', label: '1: GTLN (-∞; x0), 0: GTNN (x0; +∞)', min: 0, max: 1 },
    ],
    validateCode: `
      const { k } = params;
      if (k < 1) return { valid: false, reason: 'Cần k >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, k, b, askMaxLeft } = params;
      const c = k * k - x0 * x0 - b * x0;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const numPoly = u.formatQuadratic(1, b, c);
      const denPoly = u.formatShift('x', -x0);
      const derivNum = u.formatQuadratic(1, -2 * x0, x0 * x0 - k * k);
      const xAns = askMaxLeft === 1 ? x1 : x2;
      const ansVal = 2 * xAns + b;
      const intervalStr = askMaxLeft === 1 ? '(-\\infty;\\, ' + x0 + ')' : '(' + x0 + ';\\, +\\infty)';
      const label = askMaxLeft === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';
      const opLatex = askMaxLeft === 1 ? '\\max' : '\\min';

      return {
        stem:
          'Tìm ' +
          label +
          ' của hàm số $y = \\dfrac{' +
          numPoly +
          '}{' +
          denPoly +
          '}$ trên khoảng $' +
          intervalStr +
          '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: '' + ansVal,
        numericValue: ansVal,
        answerSummary: '' + ansVal,
        solutionSteps: [
          'Tập xác định $D = \\mathbb{R} \\setminus \\{' + x0 + '\\}$.',
          "Đạo hàm $y' = \\dfrac{" + derivNum + '}{(' + denPoly + ")^2}$. Giải $y' = 0 \\Leftrightarrow x = " + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Lập bảng biến thiên trên $' + intervalStr + '$, ta được $' + opLatex + '_{' + intervalStr + '} y = y(' + xAns + ') = ' + ansVal + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc ((x^2-10x+4)/(x-10) trên (-∞;10))',
        params: { x0: 10, k: 2, b: -10, askMaxLeft: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi k = 0',
        params: { x0: 5, k: 0, b: -4, askMaxLeft: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 25 [SA - Vận dụng]: Tìm m để min y + max y = K với y = (m + ax)/(cx + d) trên [L; R]
  t12_b2_d25_param_rat11_sum_sa: {
    id: 't12_b2_d25_param_rat11_sum_sa',
    name: 'Dạng 25: Tìm tham số m để min y + max y = K cho hàm phân thức bậc nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hàm chứa tham số m (Trả lời ngắn)',
    description:
      'Cho hàm số y = (m + ax)/(cx + d). Tìm tham số m để min_[L;R] y + max_[L;R] y = K, kết quả làm tròn đến hàng đơn vị.',
    conditionSummary: 'c ≠ 0, -d/c ∉ [L; R], K ≠ 2a/c để hàm không suy biến hằng',
    paramSpecs: [
      { name: 'a', label: 'Hệ số ax trên tử', min: -4, max: 5, allowZero: false },
      { name: 'c', label: 'Hệ số cx ở mẫu', min: -4, max: 4, allowZero: false },
      { name: 'd', label: 'Hằng số mẫu d', min: -8, max: 8 },
      { name: 'L', label: 'Đầu mút trái L', min: -3, max: 2 },
      { name: 'lenSeg', label: 'Độ dài đoạn', min: 2, max: 5 },
      { name: 'K', label: 'Tổng K = min + max', min: 2, max: 14 },
    ],
    validateCode: `
      const { a, c, d, L, lenSeg, K } = params;
      if (a === 0 || c === 0) return { valid: false, reason: 'a và c phải khác 0' };
      const R = L + lenSeg;
      const denL = c * L + d;
      const denR = c * R + d;
      if (denL === 0 || denR === 0 || denL * denR <= 0) {
        return { valid: false, reason: 'Tiệm cận đứng nằm trên đoạn [L; R]' };
      }
      const coefM = 1 / denL + 1 / denR;
      const rhs = K - (a * L) / denL - (a * R) / denR;
      const mVal = rhs / coefM;
      if (Math.abs(mVal * c - a * d) < 1e-4) {
        return { valid: false, reason: 'Hàm suy biến thành hằng số' };
      }
      const frac = Math.abs(mVal - Math.floor(mVal));
      if (Math.abs(frac - 0.5) < 0.05) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, d, L, lenSeg, K } = params;
      const R = L + lenSeg;
      const denL = c * L + d;
      const denR = c * R + d;
      const numStr = 'm ' + (a >= 0 ? '+ ' + (a === 1 ? '' : a) + 'x' : '- ' + (Math.abs(a) === 1 ? '' : Math.abs(a)) + 'x');
      const denStr = u.formatLinear(c, d);
      const vAsym = u.simplifyFrac(-d, c);

      // (m + aL)/denL + (m + aR)/denR = K => m * (denL + denR) = K*denL*denR - aL*denR - aR*denL
      const mNum = K * denL * denR - a * L * denR - a * R * denL;
      const mDen = denL + denR;
      const mFrac = u.simplifyFrac(mNum, mDen);
      const mRounded = Math.round(mFrac.value);
      const detCoef = u.simplifyFrac(a * d, c);

      const valAt = (x) => {
        const den = c * x + d;
        const cM = u.simplifyFrac(1, den);
        const c0 = u.simplifyFrac(a * x, den);
        const mPart =
          cM.num === 1 && cM.den === 1
            ? 'm'
            : cM.num === -1 && cM.den === 1
              ? '-m'
              : cM.den === 1
                ? cM.num + 'm'
                : (cM.num < 0 ? '-' : '') + '\\dfrac{' + (Math.abs(cM.num) === 1 ? '' : Math.abs(cM.num)) + 'm}{' + cM.den + '}';
        if (c0.num === 0) return mPart;
        return mPart + (c0.num > 0 ? ' + ' : ' - ') + (c0.den === 1 ? Math.abs(c0.num) : '\\dfrac{' + Math.abs(c0.num) + '}{' + c0.den + '}');
      };

      const yLStr = valAt(L);
      const yRStr = valAt(R);
      const derivNumStr = u.formatLinear(c, -a * d);

      return {
        stem:
          'Cho hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$ với $m$ là tham số. Tìm tham số $m$ để $\\min_{[' +
          L +
          ';\\, ' +
          R +
          ']} y + \\max_{[' +
          L +
          ';\\, ' +
          R +
          ']} y = ' +
          K +
          '$ (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: '' + mRounded,
        numericValue: mRounded,
        answerSummary: 'm ≈ ' + mRounded,
        solutionSteps: [
          "Đạo hàm $y' = \\dfrac{" + derivNumStr + '}{(' + denStr + ')^2}$ với $x \\neq ' + vAsym.latex + '$.',
          'Với $m \\neq ' + detCoef.latex + '$, hàm số đơn điệu trên đoạn $[' + L + ';\\, ' + R + ']$ nên $\\min_{[' + L + ';\\, ' + R + ']} y + \\max_{[' + L + ';\\, ' + R + ']} y = y(' + L + ') + y(' + R + ') = ' + K + '$.',
          'Thay vào ta có $\\left(' + yLStr + '\\right) + \\left(' + yRStr + '\\right) = ' + K + ' \\Leftrightarrow m = ' + mFrac.latex + ' \\approx ' + mRounded + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (a=3, c=-3, d=-6, [-1;4], K=9)',
        params: { a: 3, c: -3, d: -6, L: -1, lenSeg: 5, K: 9 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi tiệm cận đứng nằm trong đoạn',
        params: { a: 2, c: 1, d: 0, L: -2, lenSeg: 4, K: 5 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 26 [SA - Vận dụng]: Tìm m để max_{[L; R]} (|g(x)| + k*m) = T
  t12_b2_d26_param_abs_cubic_sa: {
    id: 't12_b2_d26_param_abs_cubic_sa',
    name: 'Dạng 26: Tìm tham số m để GTLN của |g(x)| + km trên đoạn bằng T',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hàm trị tuyệt đối chứa tham số (Trả lời ngắn)',
    description:
      'Cho hàm số y = |x^3 + (b/2)x^2 + cx + d| + k*m. Tìm m để giá trị lớn nhất của hàm số trên đoạn [L; R] bằng T, làm tròn hàng phần mười.',
    conditionSummary: 'x1 < x2 nguyên, L < x1 < x2 < R, k ≠ 0',
    paramSpecs: [
      { name: 'x1', label: 'Điểm cực trị x1', min: -1, max: 1 },
      { name: 'x2', label: 'Điểm cực trị x2', min: 2, max: 5 },
      { name: 'd', label: 'Hệ số tự do d', min: -6, max: 6 },
      { name: 'dL', label: 'Độ lệch L < x1', min: 1, max: 2 },
      { name: 'dR', label: 'Độ lệch x2 < R', min: 1, max: 4 },
      { name: 'k', label: 'Hệ số k của m', min: 2, max: 7 },
      { name: 'T', label: 'Giá trị GTLN mục tiêu T', min: 2, max: 12 },
    ],
    validateCode: `
      const { x1, x2, d, dL, dR, k, T } = params;
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2' };
      if (k <= 0) return { valid: false, reason: 'Cần k > 0' };
      if (dL < 1 || dR < 1) return { valid: false, reason: 'Cần L < x1 và x2 < R' };
      const b = -3 * (x1 + x2);
      const c = 3 * x1 * x2;
      const L = x1 - dL;
      const R = x2 + dR;
      const evalG = (x) => x * x * x + (b * x * x) / 2 + c * x + d;
      const maxAbs = Math.max(Math.abs(evalG(L)), Math.abs(evalG(x1)), Math.abs(evalG(x2)), Math.abs(evalG(R)));
      const mVal = (T - maxAbs) / k;
      const frac10 = Math.abs(mVal * 10 - Math.floor(mVal * 10));
      if (Math.abs(frac10 - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, d, dL, dR, k, T } = params;
      const b = -3 * (x1 + x2);
      const c = 3 * x1 * x2;
      const L = x1 - dL;
      const R = x2 + dR;
      let gxStr = 'x^3';
      if (b !== 0) {
        if (b % 2 === 0) {
          gxStr += u.formatTerm(b / 2, 'x^2', false);
        } else {
          gxStr += (b > 0 ? ' + ' : ' - ') + '\\dfrac{' + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x^2}{2}';
        }
      }
      if (c !== 0) gxStr += u.formatTerm(c, 'x', false);
      if (d !== 0) gxStr += u.formatTrailingConst(d);

      const dgStr = u.formatQuadratic(3, b, c);
      const evalNum = (x) => 2 * x * x * x + b * x * x + 2 * c * x + 2 * d;
      const gL = u.simplifyFrac(evalNum(L), 2);
      const g1 = u.simplifyFrac(evalNum(x1), 2);
      const g2 = u.simplifyFrac(evalNum(x2), 2);
      const gR = u.simplifyFrac(evalNum(R), 2);
      const absCandidates = [gL, g1, g2, gR].map((f) => ({
        absVal: Math.abs(f.value),
        absFrac: u.simplifyFrac(Math.abs(f.num), f.den),
      }));
      const maxAbsObj = absCandidates.reduce((acc, cur) => (cur.absVal > acc.absVal ? cur : acc));
      const mFrac = u.simplifyFrac(T * maxAbsObj.absFrac.den - maxAbsObj.absFrac.num, k * maxAbsObj.absFrac.den);
      const rounded = Number(mFrac.value.toFixed(1));
      const ansStr = Number.isInteger(rounded) ? '' + rounded : u.formatNumberVN(rounded, 1);

      return {
        stem:
          'Cho hàm số $y = \\left|' +
          gxStr +
          '\\right| + ' +
          k +
          'm$ với $m$ là tham số. Tìm $m$ sao cho giá trị lớn nhất của hàm số đã cho trên đoạn $[' +
          L +
          ';\\, ' +
          R +
          ']$ bằng $' +
          T +
          '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: 'm ≈ ' + ansStr,
        solutionSteps: [
          'Đặt $g(x) = ' + gxStr + "$. Ta có $g'(x) = " + dgStr + " = 0 \\Leftrightarrow x = " + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Tính giá trị: $g(' + L + ') = ' + gL.latex + ',\\; g(' + x1 + ') = ' + g1.latex + ',\\; g(' + x2 + ') = ' + g2.latex + ',\\; g(' + R + ') = ' + gR.latex + '$. Suy ra $\\max_{[' + L + ';\\, ' + R + ']} |g(x)| = ' + maxAbsObj.absFrac.latex + '$.',
          'Khi đó $\\max_{[' + L + ';\\, ' + R + ']} (|g(x)| + ' + k + 'm) = ' + maxAbsObj.absFrac.latex + ' + ' + k + 'm = ' + T + ' \\Rightarrow m = ' + mFrac.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x1=0, x2=5, d=4, [-1;9], k=5, T=5)',
        params: { x1: 0, x2: 5, d: 4, dL: 1, dR: 4, k: 5, T: 5 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi x1 >= x2',
        params: { x1: 3, x2: 3, d: 1, dL: 1, dR: 2, k: 5, T: 5 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 27 [SA - Hiểu]: Vận tốc tức thời v(t) = t^4 - 2at^2 + c trên [0; T]
  t12_b2_d27_velocity_quartic_sa: {
    id: 't12_b2_d27_velocity_quartic_sa',
    name: 'Dạng 27: Tìm vận tốc nhỏ nhất của chất điểm v(t) = t^4 - 2at^2 + c',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Chuyển động (Trả lời ngắn)',
    description:
      'Một chất điểm chuyển động có vận tốc tức thời v(t) = t^4 - 2at^2 + c trên đoạn [0; T] với T > √a. Tìm vận tốc nhỏ nhất.',
    conditionSummary: 'a >= 2, T^2 > a, c > a^2 + 10',
    paramSpecs: [
      { name: 'a', label: 'Tham số a (t^2 = a)', min: 2, max: 11 },
      { name: 'T', label: 'Thời điểm cuối T (s)', min: 4, max: 8 },
      { name: 'c', label: 'Vận tốc ban đầu c', min: 150, max: 300 },
    ],
    validateCode: `
      const { a, T, c } = params;
      if (a < 2) return { valid: false, reason: 'Cần a >= 2' };
      if (T * T <= a) return { valid: false, reason: 'Cần T > √a để điểm cực tiểu nằm trong (0; T)' };
      if (c - a * a <= 10) return { valid: false, reason: 'Cần c > a^2 + 10 để vận tốc luôn dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, T, c } = params;
      const poly = u.formatPoly([1, 0, -2 * a, 0, c], 't');
      const vMin = c - a * a;
      const vT = T * T * T * T - 2 * a * T * T + c;
      const sqrtStr = Number.isInteger(Math.sqrt(a)) ? '' + Math.sqrt(a) : '\\sqrt{' + a + '}';
      return {
        stem:
          'Một chất điểm chuyển động có vận tốc tức thời $v(t)$ phụ thuộc vào thời gian $t$ theo hàm số $v(t) = ' +
          poly +
          '$ $(\\text{m/s})$. Trong khoảng thời gian từ $t = 0\\text{ (s)}$ đến $t = ' +
          T +
          '\\text{ (s)}$ chất điểm đạt vận tốc nhỏ nhất bằng bao nhiêu $\\text{m/s}$?',
        shortAnswer: '' + vMin,
        numericValue: vMin,
        answerSummary: vMin + ' m/s',
        solutionSteps: [
          "Đạo hàm $v'(t) = 4t(t^2 - " + a + ")$. Giải $v'(t) = 0 \\Leftrightarrow t = 0$ hoặc $t = \\pm " + sqrtStr + '$.',
          'Trên $[0;\\, ' + T + ']$, tính $v(0) = ' + c + '$, $v(' + sqrtStr + ') = ' + vMin + '$, $v(' + T + ') = ' + vT + '$.',
          'Vậy vận tốc nhỏ nhất bằng $' + vMin + '\\text{ (m/s)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (a=5, T=6, c=207)', params: { a: 5, T: 6, c: 207 }, expectedValid: true },
      { label: 'Biên lỗi T <= √a', params: { a: 9, T: 3, c: 200 }, expectedValid: false },
    ],
  },

  // Dạng 28 [SA - Vận dụng]: Hình chữ nhật nội tiếp nửa đường tròn bán kính R
  t12_b2_d28_semicircle_rect_sa: {
    id: 't12_b2_d28_semicircle_rect_sa',
    name: 'Dạng 28: Diện tích lớn nhất hình chữ nhật cắt từ nửa hình tròn',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hình học tối ưu (Trả lời ngắn)',
    description:
      'Từ một tấm tôn hình nửa đường tròn bán kính R, cắt ra một hình chữ nhật nội tiếp. Tính diện tích lớn nhất S = R^2.',
    conditionSummary: 'R >= 2 nguyên',
    paramSpecs: [{ name: 'R', label: 'Bán kính R', min: 3, max: 20 }],
    validateCode: `
      if (params.R < 2) return { valid: false, reason: 'Bán kính R phải >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R } = params;
      const rSq = R * R;
      return {
        stem:
          'Từ một tấm tôn có hình dạng là nửa hình tròn bán kính $R = ' +
          R +
          '$, người ta muốn cắt ra một hình chữ nhật (như hình vẽ). Diện tích lớn nhất có thể của tấm tôn hình chữ nhật là bao nhiêu?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'semicircle_rect',
          params: { R },
        },
        shortAnswer: '' + rSq,
        numericValue: rSq,
        answerSummary: '' + rSq,
        solutionSteps: [
          'Đặt $OA = x \\Rightarrow AB = 2x$ với $0 < x < ' + R + '$. Khi đó $AD = \\sqrt{OD^2 - OA^2} = \\sqrt{' + rSq + ' - x^2}$.',
          'Diện tích hình chữ nhật là $S(x) = AB \\cdot AD = 2x\\sqrt{' + rSq + ' - x^2}$ trên $(0;\\, ' + R + ')$.',
          "Ta có $S'(x) = \\dfrac{2(" + rSq + ' - 2x^2)}{\\sqrt{' + rSq + ' - x^2}} = 0 \\Leftrightarrow x = \\dfrac{' + R + '\\sqrt{2}}{2}$.',
          'Vậy diện tích lớn nhất có thể của hình chữ nhật là $S_{\\max} = R^2 = ' + rSq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (R=8)', params: { R: 8 }, expectedValid: true },
      { label: 'Biên lỗi R = 0', params: { R: 0 }, expectedValid: false },
    ],
  },

  // Dạng 29 [SA - Vận dụng]: Gấp hộp từ tấm bìa W x L cắt bốn góc cạnh x ∈ [xMin; xMax]
  t12_b2_d29_box_cut_sa: {
    id: 't12_b2_d29_box_cut_sa',
    name: 'Dạng 29: Thể tích lớn nhất chiếc hộp cắt từ tấm bìa chữ nhật',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hình học tối ưu (Trả lời ngắn)',
    description:
      'Từ tấm bìa W x L (cm), cắt bốn góc bốn hình vuông cạnh x ∈ [xMin; xMax] rồi gấp thành hộp không nắp. Tính thể tích lớn nhất (làm tròn hàng đơn vị).',
    conditionSummary: '10 <= W < L, 1 <= xMin < xMax < W/2',
    paramSpecs: [
      { name: 'W', label: 'Chiều rộng W (cm)', min: 20, max: 44, step: 2 },
      { name: 'L', label: 'Chiều dài L (cm)', min: 48, max: 86, step: 2 },
      { name: 'dLow', label: 'Biên dưới quanh x_opt', min: 0, max: 2 },
      { name: 'dHigh', label: 'Biên trên quanh x_opt', min: 1, max: 2 },
    ],
    validateCode: `
      const { W, L, dLow, dHigh } = params;
      if (W < 10 || W >= L) return { valid: false, reason: 'Cần 10 <= W < L' };
      const disc = W * W - W * L + L * L;
      const xOpt = (W + L - Math.sqrt(disc)) / 6;
      const xMin = Math.max(1, Math.floor(xOpt) - dLow);
      const xMax = Math.min(Math.floor(W / 2) - 1, Math.ceil(xOpt) + dHigh);
      if (xMin >= xMax) return { valid: false, reason: 'Đoạn [xMin; xMax] không hợp lệ' };
      const evalV = (x) => x * (W - 2 * x) * (L - 2 * x);
      const cands = [evalV(xMin), evalV(xMax)];
      if (xOpt >= xMin && xOpt <= xMax) cands.push(evalV(xOpt));
      const best = Math.max(...cands);
      const frac = Math.abs(best - Math.floor(best));
      if (Math.abs(frac - 0.5) < 0.05) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { W, L, dLow, dHigh } = params;
      const disc = W * W - W * L + L * L;
      const xOpt = (W + L - Math.sqrt(disc)) / 6;
      const xMin = Math.max(1, Math.floor(xOpt) - dLow);
      const xMax = Math.min(Math.floor(W / 2) - 1, Math.ceil(xOpt) + dHigh);
      const evalV = (x) => x * (W - 2 * x) * (L - 2 * x);
      const vMin = evalV(xMin);
      const vMax = evalV(xMax);
      let best = Math.max(vMin, vMax);
      const hasOptInSeg = xOpt >= xMin && xOpt <= xMax;
      if (hasOptInSeg) {
        best = Math.max(best, evalV(xOpt));
      }
      const rounded = Math.round(best);
      const b2 = -2 * (W + L);
      const c1 = W * L;
      const vPoly = u.formatPoly([4, b2, c1, 0]);
      const dvPoly = u.formatQuadratic(12, 2 * b2, c1);
      const halfSum = u.simplifyFrac(W + L, 3);
      const optApprox = u.formatNumberVN(xOpt, 2);

      return {
        stem:
          'Từ một tấm bìa hình chữ nhật có chiều rộng $' +
          W +
          '\\text{ cm}$ và chiều dài $' +
          L +
          '\\text{ cm}$ như hình a, người ta cắt ở bốn góc bốn hình vuông có cạnh $x$ với $' +
          xMin +
          ' \\le x \\le ' +
          xMax +
          '$ và gấp lại để tạo thành chiếc hộp có dạng hình hộp chữ nhật không nắp như hình b. Tính thể tích lớn nhất của chiếc hộp có thể tạo ra (kết quả làm tròn đến hàng đơn vị, đơn vị $\\text{cm}^3$).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_cut',
          params: { W, L },
        },
        shortAnswer: '' + rounded,
        numericValue: rounded,
        answerSummary: rounded + ' cm^3',
        solutionSteps: [
          'Thể tích chiếc hộp là $V(x) = x(' + W + ' - 2x)(' + L + ' - 2x) = ' + vPoly + '$ với $' + xMin + ' \\le x \\le ' + xMax + '$.',
          "Đạo hàm $V'(x) = " + dvPoly + "$. Giải $V'(x) = 0$ thu được nghiệm nhỏ $x_1 = " + halfSum.latex + ' - \\dfrac{\\sqrt{' + disc + '}}{3} \\approx ' + optApprox + '$.',
          'So sánh $V(' + xMin + ') = ' + vMin + '$, $V(' + xMax + ') = ' + vMax + '$' + (hasOptInSeg ? ' và $V(x_1) \\approx ' + Math.round(evalV(xOpt)) + '$' : '') + ', ta thu được thể tích lớn nhất $V_{\\max} \\approx ' + rounded + '\\text{ (cm}^3\\text{)}$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (W=30, L=70)',
        params: { W: 30, L: 70, dLow: 0, dHigh: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi W >= L',
        params: { W: 50, L: 50, dLow: 1, dHigh: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 30 [SA - Vận dụng]: Quỹ dự phòng Q(x) = ax^3 + b >= C(x) = kx, tìm k_max
  t12_b2_d30_reserve_fund_cubic_sa: {
    id: 't12_b2_d30_reserve_fund_cubic_sa',
    name: 'Dạng 30: Tìm k lớn nhất để quỹ dự phòng Q(x) = ax^3 + b luôn đủ bù C(x) = kx',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Tài chính tối ưu (Trả lời ngắn)',
    description:
      'Quỹ hiện có Q(x) = ax^3 + b và khoản chi C(x) = kx (x ≥ 0). Tìm giá trị lớn nhất của k để Q(x) ≥ C(x) với mọi x ≥ 0 (làm tròn hàng phần mười).',
    conditionSummary: 'a > 0, b > 0 nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a của x^3', min: 1, max: 5 },
      { name: 'b', label: 'Quỹ ban đầu b', min: 1, max: 8 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a <= 0 || b <= 0) return { valid: false, reason: 'Cần a > 0 và b > 0' };
      const kMax = 3 * Math.cbrt((a * b * b) / 4);
      const frac10 = Math.abs(kMax * 10 - Math.floor(kMax * 10));
      if (Math.abs(frac10 - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const kMax = 3 * Math.cbrt((a * b * b) / 4);
      const rounded = Number(kMax.toFixed(1));
      const ansStr = Number.isInteger(rounded) ? '' + rounded : u.formatNumberVN(rounded, 1);
      const qPoly = u.formatTerm(a, 'x^3', true) + ' + ' + b;
      const fPoly = u.formatTerm(a, 'x^2', true) + ' + \\dfrac{' + b + '}{x}';
      const dF = (2 * a) + 'x - \\dfrac{' + b + '}{x^2}';
      const radArg = u.simplifyFrac(a * b * b, 4);

      return {
        stem:
          'Một doanh nghiệp lập quỹ dự phòng cho một dự án dài hạn. Sau $x$ tháng kể từ khi bắt đầu ($x \\ge 0$), tổng số tiền quỹ hiện có (đơn vị: chục triệu đồng) được mô hình hóa bởi $Q(x) = ' +
          qPoly +
          '$. Tổng khoản chi của dự án đến thời điểm đó được mô hình hóa bởi $C(x) = kx$. Để tại mọi thời điểm $x \\ge 0$, quỹ luôn đủ bù cho khoản chi, cần có $Q(x) \\ge C(x)$. Hãy tìm giá trị lớn nhất của $k$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Với $x = 0$: $Q(0) = ' + b + ' > 0 = C(0)$ luôn đúng. Với $x > 0$: $Q(x) \\ge C(x) \\Leftrightarrow k \\le ' + fPoly + '$.',
          'Xét hàm số $f(x) = ' + fPoly + "$ trên $(0;\\, +\\infty)$. Ta có $f'(x) = " + dF + ' = 0 \\Leftrightarrow x^3 = \\dfrac{' + b + '}{' + 2 * a + '}$.',
          'Khi đó $k_{\\max} = \\min_{x > 0} f(x) = 3\\sqrt[3]{' + radArg.latex + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (a=2, b=2)', params: { a: 2, b: 2 }, expectedValid: true },
      { label: 'Biên lỗi b = 0', params: { a: 2, b: 0 }, expectedValid: false },
    ],
  },

  // Dạng 31 [SA - Vận dụng]: Công ty nông sản tối đa lợi nhuận P(x) = px - (0.001*c3 x^3 + c1 x + c0)
  t12_b2_d31_agri_profit_sa: {
    id: 't12_b2_d31_agri_profit_sa',
    name: 'Dạng 31: Tối đa hóa lợi nhuận sản xuất hàm chi phí bậc ba',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Kinh tế tối ưu (Trả lời ngắn)',
    description:
      'Chi phí C(x) = 0,001*c3 x^3 + c1 x + c0 và doanh thu R(x) = p x với 1 ≤ x ≤ M_cap. Tính lợi nhuận lớn nhất (làm tròn hàng đơn vị).',
    conditionSummary: 'p > c1, 2 <= √((p-c1)/(0.003*c3)) <= M_cap - 2, P_max > 10',
    paramSpecs: [
      { name: 'c3', label: 'Hệ số 0,001*c3 của x^3', min: 1, max: 5 },
      { name: 'c1', label: 'Chi phí biến đổi c1', min: 25, max: 45 },
      { name: 'c0', label: 'Chi phí cố định c0', min: 8, max: 25 },
      { name: 'deltaP', label: 'Biên lợi nhuận gộp p - c1', min: 12, max: 35 },
      { name: 'extraCap', label: 'Dư công suất thêm', min: 20, max: 140, step: 10 },
    ],
    validateCode: `
      const { c3, c1, c0, deltaP, extraCap } = params;
      if (c3 < 1 || deltaP < 5) return { valid: false, reason: 'c3 >= 1 và p - c1 >= 5' };
      const c3Val = 0.001 * c3;
      const x0 = Math.sqrt(deltaP / (3 * c3Val));
      const mCap = Math.ceil(x0) + extraCap;
      if (x0 < 2 || x0 > mCap - 2) return { valid: false, reason: 'Điểm dừng ngoài phạm vi sản xuất' };
      const pMax = -c3Val * x0 * x0 * x0 + deltaP * x0 - c0;
      if (pMax <= 10) return { valid: false, reason: 'Lợi nhuận tối đa quá nhỏ' };
      const frac = Math.abs(pMax - Math.floor(pMax));
      if (Math.abs(frac - 0.5) < 0.05) return { valid: false, reason: 'Tránh ranh giới làm tròn .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c3, c1, c0, deltaP, extraCap } = params;
      const p = c1 + deltaP;
      const c3Val = 0.001 * c3;
      const dc3Val = 0.003 * c3;
      const x0 = Math.sqrt(deltaP / dc3Val);
      const mCap = Math.ceil(x0) + extraCap;
      const pMax = -c3Val * x0 * x0 * x0 + deltaP * x0 - c0;
      const rounded = Math.round(pMax);

      const c3Str = u.formatNumberVN(c3Val, 3);
      const dc3Str = u.formatNumberVN(dc3Val, 3);
      const ddc3Str = u.formatNumberVN(0.006 * c3, 3);

      return {
        stem:
          'Một công ty nông sản có công suất chế biến không quá $' +
          mCap +
          '$ tấn nguyên liệu một tháng. Nếu công ty chế biến $x$ tấn nguyên liệu trong một tháng ($1 \\le x \\le ' +
          mCap +
          '$) thì chi phí sản xuất và doanh thu lần lượt là $C(x) = ' +
          c3Str +
          'x^3 + ' +
          c1 +
          'x + ' +
          c0 +
          '$ (triệu đồng) và $R(x) = ' +
          p +
          'x$ (triệu đồng). Lợi nhuận lớn nhất mà công ty đạt được trong một tháng là bao nhiêu triệu đồng (kết quả làm tròn đến hàng đơn vị)?',
        shortAnswer: '' + rounded,
        numericValue: rounded,
        answerSummary: rounded + ' triệu đồng',
        solutionSteps: [
          'Lợi nhuận của công ty là $P(x) = R(x) - C(x) = -' + c3Str + 'x^3 + ' + deltaP + 'x - ' + c0 + '$ với $1 \\le x \\le ' + mCap + '$.',
          "Đạo hàm $P'(x) = -" + dc3Str + 'x^2 + ' + deltaP + " = 0 \\Leftrightarrow x_0 = \\sqrt{\\dfrac{" + deltaP + '}{' + dc3Str + '}} \\approx ' + u.formatNumberVN(x0, 2) + ' \\in [1;\\, ' + mCap + ']$.',
          "Vì $P''(x) = -" + ddc3Str + 'x < 0$ với $x > 0$ nên hàm số đạt giá trị lớn nhất tại $x_0$: $P_{\\max} = P(x_0) \\approx ' + rounded + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (c3=3, c1=39, c0=10, deltaP=21)',
        params: { c3: 3, c1: 39, c0: 10, deltaP: 21, extraCap: 160 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi c3 = 0',
        params: { c3: 0, c1: 30, c0: 10, deltaP: 20, extraCap: 50 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 32 [SA - Vận dụng]: Bắc cầu EF qua sông ngắn nhất đường đi AEFB
  t12_b2_d32_river_bridge_min_sa: {
    id: 't12_b2_d32_river_bridge_min_sa',
    name: 'Dạng 32: Tối ưu vị trí bắc cầu qua sông để đường đi AEFB ngắn nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'GTLN & GTNN — Hình học thực tế (Trả lời ngắn)',
    description:
      'Hai thành phố A, B cách hai bờ sông các khoảng h1, h2 (km), biết HE + KF = D (km) và cầu EF vuông góc bờ sông. Tìm EH để AEFB ngắn nhất (làm tròn 0,1).',
    conditionSummary: 'h1 >= 2, h2 >= 2, D >= 10',
    paramSpecs: [
      { name: 'h1', label: 'Khoảng cách AH (km)', min: 3, max: 12 },
      { name: 'h2', label: 'Khoảng cách BK (km)', min: 4, max: 14 },
      { name: 'D', label: 'Tổng HE + KF (km)', min: 15, max: 35 },
    ],
    validateCode: `
      const { h1, h2, D } = params;
      if (h1 < 2 || h2 < 2 || D < 10) return { valid: false, reason: 'Kích thước hình học quá nhỏ' };
      const xVal = (h1 * D) / (h1 + h2);
      const frac10 = Math.abs(xVal * 10 - Math.floor(xVal * 10));
      if (Math.abs(frac10 - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h1, h2, D } = params;
      const xFrac = u.simplifyFrac(h1 * D, h1 + h2);
      const rounded = Number(xFrac.value.toFixed(1));
      const ansStr = Number.isInteger(rounded) ? '' + rounded : u.formatNumberVN(rounded, 1);

      return {
        stem:
          'Hai thành phố $A$ và $B$ cách nhau một con sông. Người ta xây dựng một cây cầu $EF$ bắc qua sông biết rằng thành phố $A$ cách con sông một khoảng $' +
          h1 +
          '\\text{ km}$ và thành phố $B$ cách con sông một khoảng $' +
          h2 +
          '\\text{ km}$ (được mô hình hóa như hình vẽ), biết $HE + KF = ' +
          D +
          '\\text{ km}$ và độ dài $EF$ không đổi. Hỏi độ dài $EH$ bằng bao nhiêu kilômét để đường đi từ thành phố $A$ đến thành phố $B$ là ngắn nhất (đi theo đường $AEFB$)? (Kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'river_bridge',
          params: { h1, h2, D },
        },
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr + ' km',
        solutionSteps: [
          'Gọi $EH = x\\; (0 < x < ' + D + ')$, khi đó $KF = ' + D + ' - x$.',
          'Tổng độ dài đường đi là $S = AE + EF + FB = \\sqrt{x^2 + ' + h1 + '^2} + EF + \\sqrt{(' + D + ' - x)^2 + ' + h2 + '^2}$.',
          'Vì $EF$ không đổi nên $S$ nhỏ nhất khi $f(x) = \\sqrt{x^2 + ' + h1 * h1 + '} + \\sqrt{(' + D + ' - x)^2 + ' + h2 * h2 + '}$ đạt giá trị nhỏ nhất.',
          'Theo tính chất hình học (hoặc giải $f\'(x) = 0$), dấu bằng xảy ra khi $\\dfrac{x}{' + h1 + '} = \\dfrac{' + D + ' - x}{' + h2 + '} \\Rightarrow x = \\dfrac{' + h1 + ' \\cdot ' + D + '}{' + h1 + ' + ' + h2 + '} = ' + xFrac.latex + ' \\approx ' + ansStr + '\\text{ (km)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (h1=7, h2=8, D=24)', params: { h1: 7, h2: 8, D: 24 }, expectedValid: true },
      { label: 'Biên lỗi h1 = 0', params: { h1: 0, h2: 8, D: 24 }, expectedValid: false },
    ],
  },
};
