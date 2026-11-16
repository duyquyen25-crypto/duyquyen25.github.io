import { MathTemplate } from '../types/math';

export const G12_B13_MC_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 13. ỨNG DỤNG HÌNH HỌC CỦA TÍCH PHÂN — PHẦN I: 26 DẠNG TRẮC NGHIỆM (D01..D26)
  // =====================================================================

  // Dạng 01 (Q01): Công thức diện tích hình phẳng giới hạn bởi y=f(x), y=0, x=a, x=b
  t12_b13_d01_area_ox_formula_mc: {
    id: 't12_b13_d01_area_ox_formula_mc',
    name: 'Công thức diện tích hình phẳng giới hạn bởi y = f(x) và trục hoành',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Diện tích hình phẳng',
    description: 'Nhận diện công thức diện tích S = ∫_a^b |f(x)|dx khi biết hai cận a < b.',
    conditionSummary: 'a < b là hai cận tích phân nguyên',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -7, max: 2 },
      { name: 'b', label: 'Cận trên b', min: -2, max: 8 },
    ],
    validateCode: `
      if (params.a >= params.b) return { valid: false, reason: 'Cần a < b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const correct = '$S=\\int \\limits_{' + a + '}^{' + b + '}|f(x)|\\mathrm{\\,d}x$';
      const d1 = '$S=\\pi\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x$';
      const d2 = '$S=\\int \\limits_{' + b + '}^{' + a + '} f(x)\\mathrm{\\,d}x$';
      const d3 = '$S=\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$S=\\pi\\int \\limits_{' + a + '}^{' + (b + step) + '} f^2(x)\\mathrm{\\,d}x$'
      );
      return {
        stem: 'Gọi $S$ là diện tích của hình phẳng giới hạn bởi các đường $y=f(x),\\, y=0,\\, x=' + a + ',\\, x=' + b + '$ (với $f(x)$ liên tục trên $[' + a + '; ' + b + ']$). Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích hình phẳng giới hạn bởi đồ thị hàm số $y=f(x)$ liên tục trên $[' + a + ';' + b + ']$, trục hoành $y=0$ và hai đường thẳng $x=' + a + ',\\, x=' + b + '$ được tính theo công thức $S = \\int \\limits_{' + a + '}^{' + b + '} |f(x)|\\mathrm{\\,d}x$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 2, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q01 [-3; 1]', params: { a: -3, b: 1 }, expectedValid: true },
    ],
  },

  // Dạng 02 (Q02): Công thức diện tích giữa hai đồ thị y = f(x) và y = h(x)
  t12_b13_d02_area_two_curves_formula_mc: {
    id: 't12_b13_d02_area_two_curves_formula_mc',
    name: 'Công thức diện tích hình phẳng giới hạn bởi hai đồ thị hàm số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Diện tích hình phẳng',
    description: 'Nhận diện công thức S = ∫_a^b |f(x) - h(x)|dx = ∫_a^b |h(x) - f(x)|dx.',
    conditionSummary: 'a < b là hai cận tích phân nguyên',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -8, max: 2 },
      { name: 'b', label: 'Cận trên b', min: -5, max: 7 },
    ],
    validateCode: `
      if (params.a >= params.b) return { valid: false, reason: 'Cần a < b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const correct = '$S=\\int \\limits_{' + a + '}^{' + b + '}|h(x)-f(x)|\\mathrm{\\,d}x$';
      const d1 = '$S=\\int \\limits_{' + a + '}^{' + b + '}\\left[f(x)+h(x)\\right]\\mathrm{\\,d}x$';
      const d2 = '$S=\\pi\\int \\limits_{' + a + '}^{' + b + '}\\left(f(x)-h(x)\\right)\\mathrm{\\,d}x$';
      const d3 = '$S=\\pi\\int \\limits_{' + a + '}^{' + b + '}\\left[|h(x)|-|f(x)|\\right]\\mathrm{\\,d}x$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$S=\\int \\limits_{' + a + '}^{' + (b + step) + '}(f(x)-h(x))\\mathrm{\\,d}x$'
      );
      return {
        stem: 'Gọi $S$ là diện tích của hình phẳng giới hạn bởi các đường $y=f(x),\\, y=h(x),\\, x=' + a + ',\\, x=' + b + '$ (với $f, h$ liên tục trên $[' + a + ';' + b + ']$). Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích hình phẳng giới hạn bởi hai đồ thị $y=f(x),\\, y=h(x)$ và hai đường thẳng $x=' + a + ',\\, x=' + b + '$ là:',
          '$S = \\int \\limits_{' + a + '}^{' + b + '}|f(x)-h(x)|\\mathrm{\\,d}x = \\int \\limits_{' + a + '}^{' + b + '}|h(x)-f(x)|\\mathrm{\\,d}x$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = b', params: { a: -2, b: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q02 [-4; -3]', params: { a: -4, b: -3 }, expectedValid: true },
    ],
  },

  // Dạng 03 (Q03): Công thức diện tích của hàm mũ y = e^(kx) > 0
  t12_b13_d03_area_exp_formula_mc: {
    id: 't12_b13_d03_area_exp_formula_mc',
    name: 'Công thức diện tích hình phẳng giới hạn bởi y = e^(kx) và trục Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Diện tích hình phẳng',
    description: 'Nhận diện công thức diện tích S = ∫_a^b e^(kx)dx vì e^(kx) > 0 trên toàn trục số.',
    conditionSummary: 'a < b, hệ số k ∈ {1, 2, 3}',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -5, max: 2 },
      { name: 'b', label: 'Cận trên b', min: -3, max: 6 },
      { name: 'k', label: 'Hệ số mũ k', min: 1, max: 3 },
    ],
    validateCode: `
      if (params.a >= params.b) return { valid: false, reason: 'Cần a < b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k } = params;
      const expStr = k === 1 ? 'e^x' : 'e^{' + k + 'x}';
      const doubleExpStr = 'e^{' + (2 * k) + 'x}';
      const correct = '$S=\\int \\limits_{' + a + '}^{' + b + '}' + expStr + '\\mathrm{\\,d}x$';
      const d1 = '$S=\\int \\limits_{0}^{' + b + '}' + doubleExpStr + '\\mathrm{\\,d}x$';
      const d2 = '$S=\\int \\limits_{' + a + '}^{' + b + '}' + doubleExpStr + '\\mathrm{\\,d}x$';
      const d3 = '$S=\\pi\\int \\limits_{' + a + '}^{' + b + '}' + doubleExpStr + '\\mathrm{\\,d}x$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$S=\\pi\\int \\limits_{' + a + '}^{' + (b + step) + '}' + expStr + '\\mathrm{\\,d}x$'
      );
      return {
        stem: 'Gọi $S$ là diện tích của hình phẳng giới hạn bởi các đường $y=' + expStr + ',\\, y=0,\\, x=' + a + ',\\, x=' + b + '$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + expStr + ' > 0$ với mọi $x \\in \\mathbb{R}$ nên $S = \\int \\limits_{' + a + '}^{' + b + '}|' + expStr + '|\\mathrm{\\,d}x = \\int \\limits_{' + a + '}^{' + b + '}' + expStr + '\\mathrm{\\,d}x$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 0, b: -1, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q03 [-2; -1], k=1', params: { a: -2, b: -1, k: 1 }, expectedValid: true },
    ],
  },

  // Dạng 04 (Q04): Đọc đồ thị diện tích hình phẳng có phần âm và dương (có hình)
  t12_b13_d04_area_signed_graph_mc: {
    id: 't12_b13_d04_area_signed_graph_mc',
    name: 'Công thức diện tích hình phẳng từ đồ thị có phần nằm trên và dưới Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Diện tích qua đồ thị',
    description: 'Nhận diện dấu tích phân từng miền trên đồ thị: nằm dưới Ox lấy dấu trừ, nằm trên Ox lấy dấu cộng.',
    conditionSummary: 'a < 0 < b là các hoành độ giao điểm với trục Ox',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ âm a', min: -3, max: -1 },
      { name: 'b', label: 'Hoành độ dương b', min: 2, max: 5 },
    ],
    validateCode: `
      if (!(params.a < 0 && params.b > 0)) return { valid: false, reason: 'Cần a < 0 < b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const correct = '$S=-\\int \\limits_{' + a + '}^{0} f(x)\\mathrm{\\,d}x+\\int \\limits_{0}^{' + b + '} f(x)\\mathrm{\\,d}x$';
      const d1 = '$S=\\int \\limits_{' + a + '}^{0} f(x)\\mathrm{\\,d}x+\\int \\limits_{0}^{' + b + '} f(x)\\mathrm{\\,d}x$';
      const d2 = '$S=\\int \\limits_{' + a + '}^{0} f(x)\\mathrm{\\,d}x-\\int \\limits_{0}^{' + b + '} f(x)\\mathrm{\\,d}x$';
      const d3 = '$S=\\int \\limits_{' + a + '}^{' + b + '} f(x)\\mathrm{\\,d}x$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$S=\\pi\\int \\limits_{' + a + '}^{' + (b + step) + '} f(x)\\mathrm{\\,d}x$'
      );
      return {
        stem: 'Cho hàm số $y=f(x)$ có đồ thị như hình vẽ. Gọi $S$ là diện tích hình phẳng giới hạn bởi đồ thị hàm số $y=f(x)$ và trục hoành (phần gạch chéo trong hình). Khẳng định nào sau đây đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_signed_area_plot',
          params: { a, b },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trên đoạn $[' + a + ';0]$, đồ thị hàm số $y=f(x)$ nằm phía dưới trục hoành ($f(x) \\le 0$) nên diện tích phần này là $-\\int \\limits_{' + a + '}^{0} f(x)\\mathrm{\\,d}x$.',
          'Trên đoạn $[0;' + b + ']$, đồ thị hàm số nằm phía trên trục hoành ($f(x) \\ge 0$) nên diện tích phần này là $+\\int \\limits_{0}^{' + b + '} f(x)\\mathrm{\\,d}x$.',
          'Vậy $S = -\\int \\limits_{' + a + '}^{0} f(x)\\mathrm{\\,d}x + \\int \\limits_{0}^{' + b + '} f(x)\\mathrm{\\,d}x$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a không âm', params: { a: 0, b: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q04 a=-1, b=4', params: { a: -1, b: 4 }, expectedValid: true },
    ],
  },

  // Dạng 05 (Q05): Tích phân qua đường gấp khúc ABC trên đồ thị (có hình)
  t12_b13_d05_polyline_integral_mc: {
    id: 't12_b13_d05_polyline_integral_mc',
    name: 'Tính tích phân từ đồ thị đường gấp khúc ABC',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Diện tích qua đồ thị',
    description: 'Đồ thị là đường gấp khúc ABC với B trên trục Ox, tính tích phân bằng tổng diện tích hai tam giác vuông.',
    conditionSummary: 'xA < xB < xC, yA > 0, yC > 0, hoành độ trong [-6; 5]',
    paramSpecs: [
      { name: 'xA', label: 'Hoành độ xA', min: -5, max: -2 },
      { name: 'yA', label: 'Tung độ yA', min: 1, max: 3 },
      { name: 'xB', label: 'Hoành độ xB', min: 0, max: 2 },
      { name: 'dxBC', label: 'Khoảng xC - xB', min: 2, max: 3 },
      { name: 'yC', label: 'Tung độ yC', min: 1, max: 3 },
    ],
    validateCode: `
      const { xA, yA, xB, dxBC, yC } = params;
      if (xA >= xB || dxBC < 1 || yA < 1 || yC < 1) return { valid: false, reason: 'Cần xA < xB < xC và yA, yC >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, xB, dxBC, yC } = params;
      const xC = xB + dxBC;
      const num = (xB - xA) * yA + dxBC * yC;
      const fr = u.simplifyFrac(num, 2);
      const ansTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansTex + '$';
      const d1 = '$' + (num) + '$';
      const fr2 = u.simplifyFrac(num + 2, 2);
      const d2 = '$' + (fr2.den === 1 ? fr2.num : '\\frac{' + fr2.num + '}{' + fr2.den + '}') + '$';
      const d3 = '$' + Math.max(1, Math.floor(fr.value / 2)) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (Math.round(fr.value) + step + 3) + '$'
      );
      const xTicks = [];
      for (let t = xA - 1; t <= xC + 1; t++) if (t !== 0) xTicks.push(t);
      const yMax = Math.max(yA, yC) + 1;
      const yTicks = [];
      for (let t = 1; t <= yMax; t++) yTicks.push(t);
      const s1 = u.simplifyFrac((xB - xA) * yA, 2);
      const s2 = u.simplifyFrac(dxBC * yC, 2);
      const s1Tex = s1.den === 1 ? '' + s1.num : '\\frac{' + s1.num + '}{' + s1.den + '}';
      const s2Tex = s2.den === 1 ? '' + s2.num : '\\frac{' + s2.num + '}{' + s2.den + '}';
      return {
        stem: 'Đường gấp khúc $ABC$ trong hình vẽ là đồ thị hàm số $y=f(x)$ trên đoạn $[' + xA + ';' + xC + ']$ với $A(' + xA + ';' + yA + '),\\, B(' + xB + ';0),\\, C(' + xC + ';' + yC + ')$. Tính tích phân $\\int \\limits_{' + xA + '}^{' + xC + '} f(x)\\mathrm{\\,d}x$.',
        diagram: {
          kind: 'function_plot',
          curveType: 'polyline',
          coeffs: [],
          points: [[xA, yA], [xB, 0], [xC, yC]],
          xMin: xA - 1,
          xMax: xC + 1,
          yMin: -1,
          yMax: yMax,
          xTicks,
          yTicks,
          strokeColor: '#0f172a',
          highlightPoints: [
            { x: xA, y: yA, label: 'A' },
            { x: xB, y: 0, label: 'B' },
            { x: xC, y: yC, label: 'C' },
          ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Do $f(x) \\ge 0$ trên toàn đoạn $[' + xA + ';' + xC + ']$ nên $\\int \\limits_{' + xA + '}^{' + xC + '} f(x)\\mathrm{\\,d}x$ bằng tổng diện tích hai tam giác vuông tạo bởi $AB, BC$ và trục hoành:',
          '$S_1 = \\frac{1}{2} \\cdot ' + yA + ' \\cdot (' + xB + ' - (' + xA + ')) = ' + s1Tex + '$ và $S_2 = \\frac{1}{2} \\cdot ' + yC + ' \\cdot (' + xC + ' - ' + xB + ') = ' + s2Tex + '$.',
          'Vậy $\\int \\limits_{' + xA + '}^{' + xC + '} f(x)\\mathrm{\\,d}x = ' + s1Tex + ' + ' + s2Tex + ' = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xA >= xB', params: { xA: 2, yA: 2, xB: 1, dxBC: 2, yC: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q05 A(-5,2), B(1,0), C(4,1)', params: { xA: -5, yA: 2, xB: 1, dxBC: 3, yC: 1 }, expectedValid: true },
    ],
  },

  // Dạng 06 (Q06): Diện tích giới hạn bởi hai parabol trên hình vẽ (y=x^2+px+c, y=-x^2+qx+c)
  t12_b13_d06_two_parabolas_graph_formula_mc: {
    id: 't12_b13_d06_two_parabolas_graph_formula_mc',
    name: 'Công thức diện tích giữa hai parabol từ đồ thị',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Diện tích qua đồ thị',
    description: 'Quan sát hai parabol cắt nhau tại x=0 và x=b, xác định parabol trên trừ parabol dưới để chọn công thức ∫(-2x^2 + (q-p)x)dx.',
    conditionSummary: 'b = (q - p)/2 là số nguyên dương (q > p), p <= 0, q >= 2',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p', min: -4, max: 0 },
      { name: 'b', label: 'Hoành độ giao điểm b', min: 2, max: 4 },
      { name: 'c', label: 'Tung độ gốc c', min: -3, max: 1 },
    ],
    validateCode: `
      if (params.b < 2 || params.p > 0) return { valid: false, reason: 'Cần b >= 2 và p <= 0 để đồ thị cân đối' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, b, c } = params;
      const q = p + 2 * b;
      const f1Poly = u.formatQuadratic(1, p, c);
      const f2Poly = u.formatQuadratic(-1, q, c);
      const diffTopMinusBot = u.formatQuadratic(-2, q - p, 0);
      const diffBotMinusTop = u.formatQuadratic(2, p - q, 0);
      const sumLin = u.formatLinear(p + q, 2 * c);
      const wrongLin = u.formatLinear(p + q, 0);
      const correct = '$\\int \\limits_{0}^{' + b + '}(' + diffTopMinusBot + ')\\mathrm{\\,d}x$';
      const d1 = '$\\int \\limits_{0}^{' + b + '}(' + (wrongLin === '0' ? '2x' : wrongLin) + ')\\mathrm{\\,d}x$';
      const d2 = '$\\int \\limits_{0}^{' + b + '}|' + f1Poly + '|\\mathrm{\\,d}x$';
      const d3 = '$\\int \\limits_{0}^{' + b + '}(' + diffBotMinusTop + ')\\mathrm{\\,d}x$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\int \\limits_{0}^{' + (b + step) + '}(' + diffTopMinusBot + ')\\mathrm{\\,d}x$'
      );
      return {
        stem: 'Diện tích phần hình phẳng gạch chéo trong hình vẽ bên dưới (giới hạn bởi hai đồ thị $y=' + f1Poly + '$ và $y=' + f2Poly + '$) được tính theo công thức nào dưới đây?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_two_parabolas_area',
          params: { p, q, c, b },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai đồ thị cắt nhau tại $x=0$ và $x=' + b + '$. Trên $[0;' + b + ']$, đồ thị $y=' + f2Poly + '$ nằm phía trên đồ thị $y=' + f1Poly + '$.',
          'Do đó diện tích hình phẳng là $S = \\int \\limits_{0}^{' + b + '}\\left[(' + f2Poly + ') - (' + f1Poly + ')\\right]\\mathrm{\\,d}x = \\int \\limits_{0}^{' + b + '}(' + diffTopMinusBot + ')\\mathrm{\\,d}x$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b < 2', params: { p: -2, b: 1, c: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q06 p=-2, b=3, c=-1', params: { p: -2, b: 3, c: -1 }, expectedValid: true },
    ],
  },

  // Dạng 07 (Q07): Diện tích giới hạn bởi parabol y = x^2 - px và đường thẳng y = kx trên hình vẽ
  t12_b13_d07_parabola_line_graph_formula_mc: {
    id: 't12_b13_d07_parabola_line_graph_formula_mc',
    name: 'Công thức diện tích giữa parabol và đường thẳng từ đồ thị',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Diện tích qua đồ thị',
    description: 'Quan sát miền gạch chéo giữa y = kx (phía trên) và y = x^2 - px (phía dưới) trên [0; p+k].',
    conditionSummary: 'p >= 1, k >= 1, b = p + k <= 7',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p', min: 1, max: 5 },
      { name: 'k', label: 'Hệ số góc k', min: 1, max: 3 },
    ],
    validateCode: `
      const b = params.p + params.k;
      if (params.p < 1 || params.k < 1 || b > 7) return { valid: false, reason: 'Cần p >= 1, k >= 1 và p + k <= 7' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, k } = params;
      const b = p + k;
      const f1Poly = u.formatQuadratic(1, -p, 0);
      const lineStr = u.formatLinear(k, 0);
      const diffTop = u.formatQuadratic(-1, b, 0);
      const diffBot = u.formatQuadratic(1, -b, 0);
      const wrongAlt = u.formatQuadratic(1, -(p - k === 0 ? 2 : p - k), 0);
      const correct = '$\\int \\limits_{0}^{' + b + '}(' + diffTop + ')\\mathrm{\\,d}x$';
      const d1 = '$\\int \\limits_{0}^{' + b + '}(' + diffBot + ')\\mathrm{\\,d}x$';
      const d2 = '$\\int \\limits_{0}^{' + b + '}|' + f1Poly + '|\\mathrm{\\,d}x$';
      const d3 = '$\\int \\limits_{0}^{' + b + '}(' + wrongAlt + ')\\mathrm{\\,d}x$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\int \\limits_{0}^{' + (b + step) + '}(' + diffTop + ')\\mathrm{\\,d}x$'
      );
      return {
        stem: 'Diện tích phần hình phẳng gạch chéo trong hình vẽ bên dưới (giới hạn bởi $y=' + f1Poly + '$ và $y=' + lineStr + '$) được tính theo công thức nào dưới đây?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_parabola_line_area',
          params: { p, k, b },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai đồ thị cắt nhau tại $x=0$ và $x=' + b + '$. Trên $[0;' + b + ']$, đường thẳng $y=' + lineStr + '$ nằm phía trên parabol $y=' + f1Poly + '$.',
          'Diện tích hình phẳng là $S = \\int \\limits_{0}^{' + b + '}\\left[' + lineStr + ' - (' + f1Poly + ')\\right]\\mathrm{\\,d}x = \\int \\limits_{0}^{' + b + '}(' + diffTop + ')\\mathrm{\\,d}x$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p + k > 7', params: { p: 5, k: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q07 p=4, k=1', params: { p: 4, k: 1 }, expectedValid: true },
    ],
  },

  // Dạng 08 (Q08): Diện tích giới hạn bởi y = ax + b, Ox, x = x1, x = x2
  t12_b13_d08_linear_area_value_mc: {
    id: 't12_b13_d08_linear_area_value_mc',
    name: 'Tính diện tích hình phẳng giới hạn bởi đường thẳng và trục Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính diện tích cơ bản',
    description: 'Tính S = ∫_{x1}^{x2} |ax + b|dx (bao gồm cả trường hợp đường thẳng cắt hoặc không cắt Ox trên đoạn xét).',
    conditionSummary: 'a ≠ 0, x1 < x2',
    paramSpecs: [
      { name: 'a', label: 'Hệ số góc a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số tự do b', min: -8, max: 8 },
      { name: 'x1', label: 'Cận dưới x1', min: -10, max: 1 },
      { name: 'dx', label: 'Độ dài đoạn x2 - x1', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, b, x1, dx } = params;
      if (a === 0 || dx < 2) return { valid: false, reason: 'Cần a ≠ 0 và dx >= 2' };
      const x2 = x1 + dx;
      const root = -b / a;
      // Tránh cận trùng nghiệm quá nhỏ diện tích = 0
      if (x1 === root && x2 === root) return { valid: false, reason: 'Đoạn tích phân suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x1, dx } = params;
      const x2 = x1 + dx;
      const lineStr = u.formatLinear(a, b);
      // Tính chính xác ∫_{x1}^{x2} |ax+b|dx dưới dạng phân số tối giản
      const rootNum = -b;
      const rootDen = a;
      // Dùng bội số chung 2*a*a
      let numArea, denArea;
      const y1 = a * x1 + b;
      const y2 = a * x2 + b;
      if (y1 * y2 >= 0) {
        numArea = Math.abs(y1 + y2) * dx;
        denArea = 2;
      } else {
        // Chia tại root = -b/a: 0.5*(y1^2 + y2^2)/|a|
        numArea = y1 * y1 + y2 * y2;
        denArea = 2 * Math.abs(a);
      }
      const fr = u.simplifyFrac(numArea, denArea);
      const ansTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansTex + '$';
      const signedVal = Math.abs((y1 + y2) * dx);
      const frSigned = u.simplifyFrac(signedVal > 0 && signedVal !== numArea ? signedVal : numArea + 4, 2);
      const d1 = '$' + (frSigned.den === 1 ? frSigned.num : '\\frac{' + frSigned.num + '}{' + frSigned.den + '}') + '$';
      const d2 = '$' + (Math.round(fr.value * 2) + 3) + '$';
      const fr3 = u.simplifyFrac(numArea + denArea * 5, denArea);
      const d3 = '$' + (fr3.den === 1 ? fr3.num : '\\frac{' + fr3.num + '}{' + fr3.den + '}') + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (Math.round(fr.value) + step + 7) + '$'
      );
      return {
        stem: 'Tính diện tích hình phẳng giới hạn bởi đồ thị hàm số $y=' + lineStr + '$, trục $Ox$ và các đường thẳng $x=' + x1 + ',\\, x=' + x2 + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích hình phẳng xác định bởi $S = \\int \\limits_{' + x1 + '}^{' + x2 + '} |' + lineStr + '|\\mathrm{\\,d}x$.',
          'Tính tích phân trên đoạn $[' + x1 + ';' + x2 + ']$ ta được $S = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: -6, x1: -9, dx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q08 y=3x-6 trên [-9;-5]', params: { a: 3, b: -6, x1: -9, dx: 4 }, expectedValid: true },
    ],
  },

  // Dạng 09 (Q09): Tính diện tích giữa parabol và đường thẳng trên [0; b] (có hình học giải tích không đổi dấu)
  t12_b13_d09_quad_line_fixed_bounds_mc: {
    id: 't12_b13_d09_quad_line_fixed_bounds_mc',
    name: 'Tính diện tích hình phẳng giới hạn bởi parabol, đường thẳng trên đoạn [0; b]',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính diện tích cơ bản',
    description: 'Tính S = ∫_0^b |(ax^2 + bx + c) - (mx + c)|dx với b = (m - b1)/a hay hệ số tự do triệt tiêu gọn.',
    conditionSummary: 'k ≠ 0 (hệ số x^2 của hiệu), b >= 2 là hoành độ giao điểm',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k của hiệu kx(x - b)', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Cận trên b', min: 2, max: 5 },
      { name: 'm', label: 'Hệ số góc đường thẳng m', min: -8, max: 8 },
      { name: 'c', label: 'Tung độ gốc chung c', min: -6, max: 6 },
    ],
    validateCode: `
      if (params.k === 0 || params.b < 2) return { valid: false, reason: 'Cần k ≠ 0 và b >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, b, m, c } = params;
      // f(x) - g(x) = k*x^2 - k*b*x => f(x) = k*x^2 + (m - k*b)*x + c, g(x) = m*x + c
      const quadLinCoeff = m - k * b;
      const fPoly = u.formatQuadratic(k, quadLinCoeff, c);
      const gPoly = u.formatLinear(m, c);
      const diffPoly = u.formatQuadratic(k, -k * b, 0);
      const fr = u.simplifyFrac(Math.abs(k) * b * b * b, 6);
      const ansTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansTex + '$';
      const d1 = '$' + (Math.round(fr.value) + 12) + '$';
      const d2 = '$' + (Math.round(fr.value) + 27) + '$';
      const d3 = '$' + Math.max(2, Math.round(fr.value / 2) + 5) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (Math.round(fr.value) + step * 5 + 3) + '$'
      );
      return {
        stem: 'Tính diện tích hình phẳng giới hạn bởi đồ thị các hàm số $y=' + fPoly + ',\\, y=' + (gPoly === '0' ? '0' : gPoly) + '$ và các đường thẳng $x=0,\\, x=' + b + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích hình phẳng xác định bởi $S = \\int \\limits_{0}^{' + b + '} \\left|' + fPoly + ' - (' + (gPoly === '0' ? '0' : gPoly) + ')\\right|\\mathrm{\\,d}x = \\int \\limits_{0}^{' + b + '} |' + diffPoly + '|\\mathrm{\\,d}x$.',
          'Do $' + diffPoly + '$ không đổi dấu trên $[0;' + b + ']$, tính nguyên hàm tại cận $0$ và $' + b + '$ được $S = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { k: 0, b: 4, m: -8, c: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q09 k=-9, b=4, m=-8, c=-5', params: { k: -9, b: 4, m: -8, c: -5 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10): Tính diện tích giới hạn bởi hai parabol cắt nhau tại x1, x2
  t12_b13_d10_two_quadratics_area_mc: {
    id: 't12_b13_d10_two_quadratics_area_mc',
    name: 'Tính diện tích hình phẳng giới hạn bởi hai parabol cắt nhau',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính diện tích cơ bản',
    description: 'Giải phương trình hoành độ giao điểm x1 < x2 rồi tính ∫_{x1}^{x2} |f(x) - g(x)|dx = |a1-a2|(x2-x1)^3/6.',
    conditionSummary: 'a1 ≠ a2, x1 < x2 là hai nghiệm nguyên phân biệt',
    paramSpecs: [
      { name: 'a1', label: 'Hệ số x^2 của (P1)', min: 1, max: 4 },
      { name: 'a2', label: 'Hệ số x^2 của (P2)', min: 2, max: 6 },
      { name: 'x1', label: 'Nghiệm x1', min: -8, max: 1 },
      { name: 'span', label: 'Hiệu x2 - x1', min: 2, max: 5 },
    ],
    validateCode: `
      if (params.a1 === params.a2 || params.span < 2) return { valid: false, reason: 'Cần a1 ≠ a2 và x2 - x1 >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, x1, span } = params;
      const x2 = x1 + span;
      // f(x) - g(x) = dA*(x - x1)*(x - x2) = dA*x^2 - dA*(x1+x2)*x + dA*x1*x2
      const dA = a1 - a2;
      const b2 = -1;
      const c2 = -6;
      const b1 = b2 - dA * (x1 + x2);
      const c1 = c2 + dA * x1 * x2;
      const p1Poly = u.formatQuadratic(a1, b1, c1);
      const p2Poly = u.formatQuadratic(a2, b2, c2);
      const diffPoly = u.formatQuadratic(dA, b1 - b2, c1 - c2);
      const fr = u.simplifyFrac(Math.abs(dA) * span * span * span, 6);
      const ansTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansTex + '$';
      const fr1 = u.simplifyFrac(fr.num + 8, fr.den);
      const fr2 = u.simplifyFrac(fr.num + 16, fr.den);
      const fr3 = u.simplifyFrac(Math.max(1, fr.num - 4), fr.den);
      const d1 = '$' + (fr1.den === 1 ? fr1.num : '\\frac{' + fr1.num + '}{' + fr1.den + '}') + '$';
      const d2 = '$' + (fr2.den === 1 ? fr2.num : '\\frac{' + fr2.num + '}{' + fr2.den + '}') + '$';
      const d3 = '$' + (fr3.den === 1 ? fr3.num : '\\frac{' + fr3.num + '}{' + fr3.den + '}') + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 6 + 1) + '}{' + Math.max(1, fr.den) + '}$'
      );
      return {
        stem: 'Tính diện tích hình phẳng giới hạn bởi đồ thị các hàm số $y=' + p1Poly + '$ và $y=' + p2Poly + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Xét phương trình hoành độ giao điểm: $' + p1Poly + ' = ' + p2Poly + ' \\Leftrightarrow ' + diffPoly + ' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Diện tích hình phẳng là $S = \\int \\limits_{' + x1 + '}^{' + x2 + '}|' + diffPoly + '|\\mathrm{\\,d}x = \\frac{|' + dA + '|(' + x2 + ' - (' + x1 + '))^3}{6} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a1 = a2', params: { a1: 3, a2: 3, x1: -8, span: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 a1=3, a2=5, [-8;-4]', params: { a1: 3, a2: 5, x1: -8, span: 4 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11): Tính diện tích giới hạn bởi y = e^x, Ox, x = a, x = b
  t12_b13_d11_exp_area_value_mc: {
    id: 't12_b13_d11_exp_area_value_mc',
    name: 'Tính diện tích hình phẳng giới hạn bởi y = e^x, Ox và hai cận',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Diện tích hàm mũ & logarit',
    description: 'Tính trực tiếp ∫_a^b e^x dx = e^b - e^a.',
    conditionSummary: '0 <= a < b <= 8',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: 1, max: 4 },
      { name: 'b', label: 'Cận trên b', min: 3, max: 8 },
    ],
    validateCode: `
      if (!(params.a >= 1 && params.a < params.b)) return { valid: false, reason: 'Cần 1 <= a < b' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const eA = a === 1 ? 'e' : 'e^{' + a + '}';
      const eB = 'e^{' + b + '}';
      const correct = '$' + eB + ' - ' + eA + '$';
      const d1 = '$\\frac{e^{' + (2 * b) + '} - e^{' + (2 * a) + '}}{2}$';
      const d2 = '$' + eA + '$';
      const d3 = '$e^{' + (a + b) + '}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + eB + ' + ' + (step + 1) + eA + '$'
      );
      return {
        stem: 'Hình phẳng giới hạn bởi đồ thị hàm số $y=e^x$, các đường thẳng $x=' + a + ',\\, x=' + b + '$ và trục $Ox$ có diện tích là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích hình phẳng là $S = \\int \\limits_{' + a + '}^{' + b + '} e^x\\mathrm{\\,d}x = e^x\\Big|_{' + a + '}^{' + b + '} = ' + eB + ' - ' + eA + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 4, b: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 [3; 6]', params: { a: 3, b: 6 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12): Tính diện tích giới hạn bởi y = e^x, y = k, x = b (b > ln k) — đã sửa erratum!
  t12_b13_d12_exp_horiz_line_area_mc: {
    id: 't12_b13_d12_exp_horiz_line_area_mc',
    name: 'Tính diện tích hình phẳng giới hạn bởi y = e^x, y = k và x = b',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Diện tích hàm mũ & logarit',
    description: 'Tìm giao điểm x = ln k, tính ∫_{ln k}^b |e^x - k|dx = e^b - k - k(b - ln k) = e^b - (b+1)k + k ln k.',
    conditionSummary: 'k >= 2, b > ln k (đảm bảo b >= 2 với k <= 7)',
    paramSpecs: [
      { name: 'k', label: 'Đường thẳng ngang y = k', min: 2, max: 6 },
      { name: 'b', label: 'Đường thẳng đứng x = b', min: 3, max: 6 },
    ],
    validateCode: `
      const { k, b } = params;
      if (k < 2 || b <= Math.log(k)) return { valid: false, reason: 'Cần k >= 2 và b > ln k' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, b } = params;
      const linConst = -(b + 1) * k; // = -k - kb
      const correct = '$' + linConst + ' + ' + k + '\\ln ' + k + ' + e^{' + b + '}$';
      const d1 = '$e^{' + b + '}$';
      const d2 = '$' + (-k) + ' + e^{' + b + '}$';
      const d3 = '$e^{' + (2 * b) + '}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (linConst - step) + ' + ' + k + '\\ln ' + k + ' + e^{' + b + '}$'
      );
      return {
        stem: 'Hình phẳng giới hạn bởi đồ thị hàm số $y=e^x$ và các đường thẳng $y=' + k + ',\\, x=' + b + '$ có diện tích là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Xét phương trình hoành độ giao điểm: $e^x = ' + k + ' \\Leftrightarrow x = \\ln ' + k + '$ (do $e^{' + b + '} > ' + k + '$ nên $\\ln ' + k + ' < ' + b + '$).',
          'Diện tích hình phẳng là $S = \\int \\limits_{\\ln ' + k + '}^{' + b + '} (e^x - ' + k + ')\\mathrm{\\,d}x = (e^x - ' + k + 'x)\\Big|_{\\ln ' + k + '}^{' + b + '}$.',
          'Suy ra $S = (e^{' + b + '} - ' + (k * b) + ') - (' + k + ' - ' + k + '\\ln ' + k + ') = ' + linConst + ' + ' + k + '\\ln ' + k + ' + e^{' + b + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b <= ln k', params: { k: 5, b: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 k=4, b=4', params: { k: 4, b: 4 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13): Tính diện tích giới hạn bởi y = k/x, Ox, x = -u, x = -v — đã sửa NaN & nguyên hàm!
  t12_b13_d13_reciprocal_neg_area_mc: {
    id: 't12_b13_d13_reciprocal_neg_area_mc',
    name: 'Tính diện tích hình phẳng giới hạn bởi y = k/x và hai cận âm',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Diện tích hàm mũ & logarit',
    description: 'Tính ∫_{-v}^{-u} |k/x|dx = k ln(v/u) với v > u >= 1 (đặc biệt khi u=1 cho kết quả k ln v).',
    conditionSummary: 'k >= 2, v = u * m với u >= 1, m >= 2',
    paramSpecs: [
      { name: 'k', label: 'Tử số k', min: 2, max: 9 },
      { name: 'u', label: 'Mốc -u (u >= 1)', min: 1, max: 3 },
      { name: 'm', label: 'Tỉ số v/u', min: 2, max: 7 },
    ],
    validateCode: `
      if (params.k < 2 || params.u < 1 || params.m < 2) return { valid: false, reason: 'Cần k >= 2, u >= 1, m >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, u: uVal, m } = params;
      const vVal = uVal * m;
      const correct = '$' + k + '\\ln ' + m + '$';
      const d1 = '$' + (k * vVal + 2) + '$';
      const d2 = '$' + (k * m) + '\\ln ' + (m + 1) + '$';
      const d3 = '$-' + k + '\\ln ' + m + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (k + step) + '\\ln ' + m + '$'
      );
      return {
        stem: 'Hình phẳng giới hạn bởi đồ thị hàm số $y=\\frac{' + k + '}{x}$, các đường thẳng $x=-' + uVal + ',\\, x=-' + vVal + '$ và trục $Ox$ có diện tích là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trên đoạn $[-' + vVal + ';-' + uVal + ']$, ta có $\\frac{' + k + '}{x} < 0$. Do đó diện tích hình phẳng là:',
          '$S = \\int \\limits_{-' + vVal + '}^{-' + uVal + '} \\left|\\frac{' + k + '}{x}\\right|\\mathrm{\\,d}x = \\int \\limits_{-' + vVal + '}^{-' + uVal + '} \\left(-\\frac{' + k + '}{x}\\right)\\mathrm{\\,d}x = -' + k + '\\ln|x|\\Big|_{-' + vVal + '}^{-' + uVal + '} = ' + k + '(\\ln ' + vVal + ' - \\ln ' + uVal + ') = ' + k + '\\ln ' + m + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = v (m = 1)', params: { k: 7, u: 1, m: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 y=7/x trên [-5; -1]', params: { k: 7, u: 1, m: 5 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14): Thể tích tròn xoay quay y = x^2 - px quanh Ox trên [a; b]
  t12_b13_d14_rev_quad_x2_px_mc: {
    id: 't12_b13_d14_rev_quad_x2_px_mc',
    name: 'Thể tích khối tròn xoay khi quay parabol y = x^2 - px quanh trục Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích khối tròn xoay',
    description: 'Tính V = π ∫_a^b (x^2 - px)^2 dx trên đoạn [a; b] với a < b.',
    conditionSummary: 'p ≠ 0, a < b',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p', min: 1, max: 3 },
      { name: 'a', label: 'Cận dưới a', min: -4, max: 0 },
      { name: 'dx', label: 'Độ dài đoạn b - a', min: 1, max: 2 },
    ],
    validateCode: `
      if (params.p === 0 || params.dx < 1) return { valid: false, reason: 'Cần p ≠ 0 và dx >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, a, dx } = params;
      const b = a + dx;
      const F = (x) => Math.pow(x, 5) / 5 - (p * Math.pow(x, 4)) / 2 + (p * p * Math.pow(x, 3)) / 3;
      // Dùng mẫu số chung 30 để rút gọn chính xác tuyệt đối
      const F30 = (x) => 6 * Math.pow(x, 5) - 15 * p * Math.pow(x, 4) + 10 * p * p * Math.pow(x, 3);
      const num = F30(b) - F30(a);
      const fr = u.simplifyFrac(num, 30);
      const ansTex = fr.den === 1 ? fr.num + '\\pi' : '\\frac{' + fr.num + '}{' + fr.den + '}\\pi';
      const correct = '$' + ansTex + '$';
      const f1 = u.simplifyFrac(num + 90, 30);
      const f2 = u.simplifyFrac(num + 150, 30);
      const f3 = u.simplifyFrac(Math.max(10, Math.floor(num / 2)), 15);
      const fmtPi = (f) => '$' + (f.den === 1 ? f.num + '\\pi' : '\\frac{' + f.num + '}{' + f.den + '}\\pi') + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtPi(f1), fmtPi(f2), fmtPi(f3)],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 7) + '}{' + fr.den + '}\\pi$'
      );
      const fPoly = u.formatQuadratic(1, -p, 0);
      return {
        stem: 'Cho hình phẳng giới hạn bởi đồ thị hàm số $y=' + fPoly + '$, trục hoành và các đường thẳng $x=' + a + ',\\, x=' + b + '$. Tính thể tích khối tròn xoay tạo thành khi cho hình phẳng đó quay quanh trục $Ox$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thể tích khối tròn xoay xác định bởi $V = \\pi\\int \\limits_{' + a + '}^{' + b + '} \\left(' + fPoly + '\\right)^2\\mathrm{\\,d}x$.',
          'Khai triển $\\left(' + fPoly + '\\right)^2 = x^4 - ' + (2 * p) + 'x^3 + ' + (p * p) + 'x^2$, tìm nguyên hàm và thế cận được $V = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dx = 0', params: { p: 1, a: -4, dx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 y=x^2-x trên [-4; -3]', params: { p: 1, a: -4, dx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15): Thể tích tròn xoay quay y = c - x quanh Ox trên [a; b]
  t12_b13_d15_rev_linear_ox_mc: {
    id: 't12_b13_d15_rev_linear_ox_mc',
    name: 'Thể tích khối tròn xoay khi quay đoạn thẳng y = c - x quanh trục Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích khối tròn xoay',
    description: 'Tính V = π ∫_a^b (c - x)^2 dx = (π/3)[(c-a)^3 - (c-b)^3].',
    conditionSummary: 'a < b <= c + 3, a >= 0',
    paramSpecs: [
      { name: 'c', label: 'Hằng số c', min: 3, max: 9 },
      { name: 'a', label: 'Cận dưới a', min: 0, max: 4 },
      { name: 'dx', label: 'Độ dài b - a', min: 1, max: 3 },
    ],
    validateCode: `
      const b = params.a + params.dx;
      if (params.dx < 1 || b > params.c) return { valid: false, reason: 'Cần dx >= 1 và a + dx <= c' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, a, dx } = params;
      const b = a + dx;
      const u1 = c - a;
      const u2 = c - b;
      const num = u1 * u1 * u1 - u2 * u2 * u2;
      const fr = u.simplifyFrac(num, 3);
      const ansTex = fr.den === 1 ? fr.num + '\\pi' : '\\frac{' + fr.num + '}{' + fr.den + '}\\pi';
      const correct = '$' + ansTex + '$';
      const f1 = u.simplifyFrac(num + 2, 3);
      const f2 = u.simplifyFrac(num + 1, 3);
      const f3 = u.simplifyFrac(num + 6, 3);
      const fmtPi = (f) => '$' + (f.den === 1 ? f.num + '\\pi' : '\\frac{' + f.num + '}{' + f.den + '}\\pi') + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtPi(f1), fmtPi(f2), fmtPi(f3)],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 5) + '}{' + fr.den + '}\\pi$'
      );
      return {
        stem: 'Cho hình phẳng giới hạn bởi đồ thị hàm số $y=' + c + ' - x$, trục hoành và các đường thẳng $x=' + a + ',\\, x=' + b + '$. Tính thể tích khối tròn xoay tạo thành khi cho hình phẳng đó quay quanh trục $Ox$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thể tích khối tròn xoay là $V = \\pi\\int \\limits_{' + a + '}^{' + b + '} (' + c + ' - x)^2\\mathrm{\\,d}x = \\pi\\left[-\\frac{(' + c + '-x)^3}{3}\\right]_{' + a + '}^{' + b + '} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b > c', params: { c: 3, a: 2, dx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 y=5-x trên [3; 4]', params: { c: 5, a: 3, dx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16): Thể tích tròn xoay quay y = (x - x1)(x - x2) quanh Ox giữa hai nghiệm
  t12_b13_d16_rev_quad_roots_mc: {
    id: 't12_b13_d16_rev_quad_roots_mc',
    name: 'Thể tích khối tròn xoay khi quay parabol y = (x-x1)(x-x2) quanh Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích khối tròn xoay',
    description: 'Tính V = π ∫_{x1}^{x2} (x - x1)^2(x - x2)^2 dx = π(x2 - x1)^5 / 30.',
    conditionSummary: 'x1 < x2, hiệu d = x2 - x1 ∈ {2, 3, 4}',
    paramSpecs: [
      { name: 'x1', label: 'Nghiệm x1', min: -4, max: 3 },
      { name: 'span', label: 'Khoảng x2 - x1', min: 2, max: 4 },
    ],
    validateCode: `
      if (params.span < 2 || params.span > 4) return { valid: false, reason: 'Cần span ∈ {2, 3, 4}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, span } = params;
      const x2 = x1 + span;
      const poly = u.formatQuadratic(1, -(x1 + x2), x1 * x2);
      const fr = u.simplifyFrac(Math.pow(span, 5), 30);
      const ansTex = fr.den === 1 ? fr.num + '\\pi' : '\\frac{' + fr.num + '}{' + fr.den + '}\\pi';
      const correct = '$' + ansTex + '$';
      const d1 = '$\\frac{' + Math.pow(span + 1, 5) + '}{15}\\pi$';
      const d2 = '$\\frac{' + Math.pow(span, 3) + '}{6}\\pi$';
      const f3 = u.simplifyFrac(fr.num + 20, fr.den);
      const d3 = '$' + (f3.den === 1 ? f3.num + '\\pi' : '\\frac{' + f3.num + '}{' + f3.den + '}\\pi') + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 7) + '}{' + fr.den + '}\\pi$'
      );
      return {
        stem: 'Cho hình phẳng giới hạn bởi đồ thị hàm số $y=' + poly + '$, trục hoành và các đường thẳng $x=' + x1 + ',\\, x=' + x2 + '$. Tính thể tích khối tròn xoay tạo thành khi cho hình phẳng đó quay quanh trục $Ox$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thể tích khối tròn xoay xác định bởi $V = \\pi\\int \\limits_{' + x1 + '}^{' + x2 + '} (' + poly + ')^2\\mathrm{\\,d}x$.',
          'Với $' + poly + ' = (' + u.formatShift('x', -x1) + ')(' + u.formatShift('x', -x2) + ')$, ta có $V = \\pi\\frac{(' + x2 + ' - (' + x1 + '))^5}{30} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên span < 2', params: { x1: -2, span: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 [-2; 1]', params: { x1: -2, span: 3 }, expectedValid: true },
    ],
  },

  // Dạng 17 (Q17): Thể tích tròn xoay quay y = sqrt(ax + b) quanh Ox trên [x1; x2]
  t12_b13_d17_rev_sqrt_linear_mc: {
    id: 't12_b13_d17_rev_sqrt_linear_mc',
    name: 'Thể tích khối tròn xoay khi quay y = √(ax + b) quanh trục Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích khối tròn xoay',
    description: 'Tính V = π ∫_{x1}^{x2} (ax + b)dx với ax1 + b >= 0.',
    conditionSummary: 'a >= 1, a*x1 + b >= 0, x1 < x2',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 6 },
      { name: 'b', label: 'Hằng số b', min: 1, max: 9 },
      { name: 'x1', label: 'Cận dưới x1', min: 0, max: 3 },
      { name: 'dx', label: 'Độ dài x2 - x1', min: 2, max: 6 },
    ],
    validateCode: `
      const { a, b, x1, dx } = params;
      if (a < 1 || a * x1 + b < 0 || dx < 2) return { valid: false, reason: 'Cần a >= 1, ax1 + b >= 0 và dx >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x1, dx } = params;
      const x2 = x1 + dx;
      const lin = u.formatLinear(a, b);
      // V = pi * (y(x1) + y(x2)) * dx / 2
      const num = ((a * x1 + b) + (a * x2 + b)) * dx;
      const fr = u.simplifyFrac(num, 2);
      const ansTex = fr.den === 1 ? fr.num + '\\pi' : '\\frac{' + fr.num + '}{' + fr.den + '}\\pi';
      const correct = '$' + ansTex + '$';
      const d1 = '$' + (Math.round(fr.value) + 25) + '\\pi$';
      const d2 = '$' + (num + 3) + '\\pi$';
      const f3 = u.simplifyFrac(num + 6, 2);
      const d3 = '$' + (f3.den === 1 ? f3.num + '\\pi' : '\\frac{' + f3.num + '}{' + f3.den + '}') + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (Math.round(fr.value) + step * 4 + 2) + '\\pi$'
      );
      return {
        stem: 'Cho hình phẳng giới hạn bởi đồ thị hàm số $y=\\sqrt{' + lin + '}$, trục hoành và các đường thẳng $x=' + x1 + ',\\, x=' + x2 + '$. Tính thể tích khối tròn xoay tạo thành khi cho hình phẳng đó quay quanh trục $Ox$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thể tích khối tròn xoay xác định bởi $V = \\pi\\int \\limits_{' + x1 + '}^{' + x2 + '} \\left(\\sqrt{' + lin + '}\\right)^2\\mathrm{\\,d}x = \\pi\\int \\limits_{' + x1 + '}^{' + x2 + '} (' + lin + ')\\mathrm{\\,d}x = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dưới căn âm', params: { a: 1, b: -5, x1: 1, dx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 sqrt(3x+6) trên [1; 6]', params: { a: 3, b: 6, x1: 1, dx: 5 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18): Thể tích tròn xoay quay y = k*x*e^(m*x) quanh Ox trên [0; b]
  t12_b13_d18_rev_x_exp_mc: {
    id: 't12_b13_d18_rev_x_exp_mc',
    name: 'Thể tích khối tròn xoay khi quay y = kx·e^(mx) quanh Ox',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Thể tích khối tròn xoay',
    description: 'Dùng tích phân từng phần tính π ∫_0^b k^2 x^2 e^(2mx) dx = k^2 [e^(2mb)(4m^2b^2 - 4mb + 2) - 2]/(8m^3) * π.',
    conditionSummary: 'k, m, b nguyên dương nhỏ (1 <= b <= 3, 1 <= m <= 2)',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 1, max: 6 },
      { name: 'm', label: 'Hệ số mũ m', min: 1, max: 2 },
      { name: 'b', label: 'Cận trên b', min: 1, max: 3 },
    ],
    validateCode: `
      if (params.k < 1 || params.m < 1 || params.b < 1) return { valid: false, reason: 'Cần k, m, b >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, m, b } = params;
      // I = int_0^b k^2 x^2 e^{2mx} dx = [ e^{2mx}( (2mx)^2 - 4mx + 2 ) / (8m^3) ]_0^b * k^2
      const den = 8 * Math.pow(m, 3);
      const constNum = 2 * k * k;
      const expNum = k * k * (4 * m * m * b * b - 4 * m * b + 2);
      const expPow = 2 * m * b;
      const fConst = u.simplifyFrac(constNum, den);
      const fExp = u.simplifyFrac(expNum, den);
      const termC = fConst.den === 1 ? '' + fConst.num : '\\frac{' + fConst.num + '}{' + fConst.den + '}';
      const termE = fExp.den === 1 ? (fExp.num === 1 ? '' : '' + fExp.num) : '\\frac{' + fExp.num + '}{' + fExp.den + '}';
      const fExpTex = fExp.den === 1 ? (fExp.num === 1 ? 'e^{' + expPow + '}' : fExp.num + ' e^{' + expPow + '}') : '\\frac{' + fExp.num + ' e^{' + expPow + '}}{' + fExp.den + '}';
      const correct = '$\\left(-' + termC + ' + ' + fExpTex + '\\right)\\pi$';
      const d1 = '$\\left(-' + termC + ' + \\frac{' + (fExp.num * 2 + 275) + ' e^{' + (expPow + 4) + '}}{' + fExp.den + '}\\right)\\pi$';
      const d2 = '$\\left(-' + termC + ' + \\frac{' + (fExp.num + 500) + ' e^{' + (expPow + 8) + '}}{' + fExp.den + '}\\right)\\pi$';
      const fWrong = u.simplifyFrac(k, 2 * m);
      const d3 = '$\\left(\\frac{' + k + '}{4} + ' + (k * b + 5) + ' e^{' + (m * b + 2) + '}\\right)\\pi$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\left(' + (step + 1) + ' + ' + fExpTex + '\\right)\\pi$'
      );
      const yExpr = (k === 1 ? '' : k) + 'x e^{' + (m === 1 ? '' : m) + 'x}';
      return {
        stem: 'Cho hình phẳng giới hạn bởi đồ thị hàm số $y=' + yExpr + '$, trục hoành và các đường thẳng $x=0,\\, x=' + b + '$. Tính thể tích khối tròn xoay tạo thành khi cho hình phẳng đó quay quanh trục $Ox$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thể tích khối tròn xoay xác định bởi $V = \\pi\\int \\limits_{0}^{' + b + '} \\left(' + yExpr + '\\right)^2\\mathrm{\\,d}x = ' + (k * k) + '\\pi\\int \\limits_{0}^{' + b + '} x^2 e^{' + (2 * m) + 'x}\\mathrm{\\,d}x$.',
          'Áp dụng tích phân từng phần hai lần thu được $V = \\left(-' + termC + ' + ' + fExpTex + '\\right)\\pi$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { k: 5, m: 2, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 y=5x e^(2x) trên [0; 2]', params: { k: 5, m: 2, b: 2 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19): Thể tích tròn xoay quay y = k(x-x1)(x-x2) quanh Ox
  t12_b13_d19_rev_scaled_quad_roots_mc: {
    id: 't12_b13_d19_rev_scaled_quad_roots_mc',
    name: 'Thể tích khối tròn xoay khi quay parabol y = k(x-x1)(x-x2) quanh Ox',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích khối tròn xoay',
    description: 'Tìm nghiệm x1, x2 rồi tính V = π ∫_{x1}^{x2} k^2 (x-x1)^2(x-x2)^2 dx = k^2 (x2 - x1)^5 π / 30.',
    conditionSummary: 'k >= 2, x1 < x2, hiệu x2 - x1 ∈ {2, 3}',
    paramSpecs: [
      { name: 'k', label: 'Hệ số bậc hai k', min: 2, max: 6 },
      { name: 'x1', label: 'Nghiệm x1', min: -2, max: 3 },
      { name: 'span', label: 'Khoảng x2 - x1', min: 2, max: 3 },
    ],
    validateCode: `
      if (params.k < 2 || params.span < 2 || params.span > 3) return { valid: false, reason: 'Cần k >= 2 và span ∈ {2, 3}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, x1, span } = params;
      const x2 = x1 + span;
      const poly = u.formatQuadratic(k, -k * (x1 + x2), k * x1 * x2);
      const fr = u.simplifyFrac(k * k * Math.pow(span, 5), 30);
      const ansTex = fr.den === 1 ? fr.num + '\\pi' : '\\frac{' + fr.num + '}{' + fr.den + '}\\pi';
      const correct = '$' + ansTex + '$';
      const d1 = '$' + (Math.round(fr.value) + 63) + '\\pi$';
      const d2 = '$\\frac{' + (fr.num + 9) + '}{' + fr.den + '}\\pi$';
      const d3 = '$\\frac{' + (fr.num * 32) + '}{' + fr.den + '}\\pi$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 5) + '}{' + fr.den + '}\\pi$'
      );
      return {
        stem: 'Cho hình phẳng giới hạn bởi đồ thị hàm số $y=' + poly + '$, trục hoành và các đường thẳng $x=' + x1 + ',\\, x=' + x2 + '$. Tính thể tích khối tròn xoay tạo thành khi cho hình phẳng đó quay quanh trục $Ox$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Xét phương trình $' + poly + ' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Thể tích khối tròn xoay xác định bởi $V = \\pi\\int \\limits_{' + x1 + '}^{' + x2 + '} \\left(' + poly + '\\right)^2\\mathrm{\\,d}x = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên span < 2', params: { k: 5, x1: 1, span: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 5(x-1)(x-3) trên [1; 3]', params: { k: 5, x1: 1, span: 2 }, expectedValid: true },
    ],
  },

  // Dạng 20 (Q20): Thể tích vật thể theo thiết diện hình chữ nhật k*x và sqrt(R^2 - x^2)
  t12_b13_d20_cross_section_rect_mc: {
    id: 't12_b13_d20_cross_section_rect_mc',
    name: 'Thể tích vật thể có thiết diện hình chữ nhật vuông góc Ox',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Thể tích theo thiết diện',
    description: 'Tính V = ∫_0^R kx √(R^2 - x^2) dx = k R^3 / 3 (nhấn mạnh công thức không nhân π).',
    conditionSummary: 'k >= 2, R >= 2 nguyên dương',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 2, max: 8 },
      { name: 'R', label: 'Bán kính R', min: 2, max: 6 },
    ],
    validateCode: `
      if (params.k < 2 || params.R < 2) return { valid: false, reason: 'Cần k >= 2 và R >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, R } = params;
      const fr = u.simplifyFrac(k * R * R * R, 3);
      const ansTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansTex + '$';
      const d1 = '$' + (Math.round(fr.value) + 2) + '\\pi$';
      const d2 = '$' + ansTex + '\\pi$';
      const d3 = '$' + (Math.round(fr.value) + 17) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (Math.round(fr.value) + step * 6 + 3) + '$'
      );
      const R2 = R * R;
      return {
        stem: 'Tính thể tích $V$ của phần vật thể giới hạn bởi hai mặt phẳng $x=0$ và $x=' + R + '$, biết rằng khi cắt vật thể bởi mặt phẳng tùy ý vuông góc với trục $Ox$ tại điểm có hoành độ $x$ $(0 \\le x \\le ' + R + ')$ thì được thiết diện là một hình chữ nhật có hai cạnh là $' + k + 'x$ và $\\sqrt{' + R2 + ' - x^{2}}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích thiết diện tại hoành độ $x$ là $S(x) = ' + k + 'x\\sqrt{' + R2 + ' - x^2}$.',
          'Thể tích vật thể là $V = \\int \\limits_{0}^{' + R + '} ' + k + 'x\\sqrt{' + R2 + ' - x^2}\\mathrm{\\,d}x = \\left[-\\frac{' + k + '}{3}(' + R2 + ' - x^2)^{3/2}\\right]_0^{' + R + '} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R < 2', params: { k: 6, R: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 k=6, R=5', params: { k: 6, R: 5 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21): Thể tích vật thể có thiết diện hình vuông cạnh x*sqrt(a*x^2 - b)
  t12_b13_d21_cross_section_square_mc: {
    id: 't12_b13_d21_cross_section_square_mc',
    name: 'Thể tích vật thể có thiết diện hình vuông cạnh x√(ax^2 - b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích theo thiết diện',
    description: 'Tính V = ∫_{x1}^{x2} x^2(ax^2 - b)dx = [a(x2^5 - x1^5)/5 - b(x2^3 - x1^3)/3].',
    conditionSummary: 'a*x1^2 > b >= 1, 1 <= x1 < x2 <= 7',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 9 },
      { name: 'b', label: 'Hằng số b', min: 1, max: 8 },
      { name: 'x1', label: 'Cận dưới x1', min: 1, max: 3 },
      { name: 'dx', label: 'Độ dài x2 - x1', min: 2, max: 3 },
    ],
    validateCode: `
      const { a, b, x1, dx } = params;
      if (a * x1 * x1 <= b || dx < 2) return { valid: false, reason: 'Cần ax1^2 > b và dx >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x1, dx } = params;
      const x2 = x1 + dx;
      // Mẫu số chung 15: 3*a*(x^5) - 5*b*(x^3)
      const F15 = (x) => 3 * a * Math.pow(x, 5) - 5 * b * Math.pow(x, 3);
      const num = F15(x2) - F15(x1);
      const fr = u.simplifyFrac(num, 15);
      const ansTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansTex + '$';
      const f1 = u.simplifyFrac(num + 60, 15);
      const f2 = u.simplifyFrac(num + 150, 15);
      const d1 = '$' + (f1.den === 1 ? f1.num : '\\frac{' + f1.num + '}{' + f1.den + '}') + '$';
      const d2 = '$' + (f2.den === 1 ? f2.num : '\\frac{' + f2.num + '}{' + f2.den + '}') + '$';
      const d3 = '$' + Math.round(fr.value / 4) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 7) + '}{' + fr.den + '}$'
      );
      return {
        stem: 'Tính thể tích $V$ của phần vật thể giới hạn bởi hai mặt phẳng $x=' + x1 + '$ và $x=' + x2 + '$, biết rằng khi cắt vật thể bởi mặt phẳng tùy ý vuông góc với trục $Ox$ tại điểm có hoành độ $x$ $(' + x1 + ' \\le x \\le ' + x2 + ')$ thì được thiết diện là một hình vuông có cạnh là $x\\sqrt{' + a + 'x^{2} - ' + b + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích thiết diện là $S(x) = \\left(x\\sqrt{' + a + 'x^2 - ' + b + '}\\right)^2 = ' + a + 'x^4 - ' + b + 'x^2$.',
          'Thể tích vật thể là $V = \\int \\limits_{' + x1 + '}^{' + x2 + '} (' + a + 'x^4 - ' + b + 'x^2)\\mathrm{\\,d}x = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên căn âm tại x1', params: { a: 2, b: 10, x1: 1, dx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 a=9, b=3, [3; 5]', params: { a: 9, b: 3, x1: 3, dx: 2 }, expectedValid: true },
    ],
  },

  // Dạng 22 (Q22): Thể tích vật thể có thiết diện tam giác đều cạnh x*sqrt(a*x^2 - b)
  t12_b13_d22_cross_section_equitri_mc: {
    id: 't12_b13_d22_cross_section_equitri_mc',
    name: 'Thể tích vật thể có thiết diện tam giác đều cạnh x√(ax^2 - b)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Thể tích theo thiết diện',
    description: 'Tính V = ∫_{x1}^{x2} (√3 / 4) x^2(ax^2 - b)dx.',
    conditionSummary: 'a*x1^2 > b >= 1, 2 <= x1 < x2 <= 10',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 2, max: 8 },
      { name: 'b', label: 'Hằng số b', min: 1, max: 9 },
      { name: 'x1', label: 'Cận dưới x1', min: 2, max: 5 },
      { name: 'dx', label: 'Độ dài x2 - x1', min: 2, max: 4 },
    ],
    validateCode: `
      const { a, b, x1, dx } = params;
      if (a * x1 * x1 <= b || dx < 2) return { valid: false, reason: 'Cần ax1^2 > b và dx >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x1, dx } = params;
      const x2 = x1 + dx;
      // Mẫu số chung: 4 * 15 = 60 -> 3*a*x^5 - 5*b*x^3 trên 60
      const F15 = (x) => 3 * a * Math.pow(x, 5) - 5 * b * Math.pow(x, 3);
      const num = F15(x2) - F15(x1);
      const fr = u.simplifyFrac(num, 60);
      const ansTex = fr.den === 1 ? fr.num + '\\sqrt{3}' : '\\frac{' + fr.num + '\\sqrt{3}}{' + fr.den + '}';
      const correct = '$' + ansTex + '$';
      const d1 = '$\\frac{' + (fr.num * 2) + '\\sqrt{3}}{' + fr.den + '}$';
      const d2 = '$\\frac{' + (fr.num * 4) + '\\sqrt{3}}{' + fr.den + '}$';
      const d3 = '$' + Math.round(fr.value / 16) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 11) + '\\sqrt{3}}{' + fr.den + '}$'
      );
      return {
        stem: 'Tính thể tích $V$ của phần vật thể giới hạn bởi hai mặt phẳng $x=' + x1 + '$ và $x=' + x2 + '$, biết rằng khi cắt vật thể bởi mặt phẳng tùy ý vuông góc với trục $Ox$ tại điểm có hoành độ $x$ $(' + x1 + ' \\le x \\le ' + x2 + ')$ thì được thiết diện là một tam giác đều có cạnh là $x\\sqrt{' + a + 'x^{2} - ' + b + '}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Diện tích tam giác đều cạnh $c(x) = x\\sqrt{' + a + 'x^2 - ' + b + '}$ là $S(x) = \\frac{\\sqrt{3}}{4}\\left(' + a + 'x^4 - ' + b + 'x^2\\right)$.',
          'Thể tích vật thể là $V = \\int \\limits_{' + x1 + '}^{' + x2 + '} \\frac{\\sqrt{3}}{4}(' + a + 'x^4 - ' + b + 'x^2)\\mathrm{\\,d}x = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên căn âm tại x1', params: { a: 2, b: 10, x1: 2, dx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 a=6, b=7, [5; 9]', params: { a: 6, b: 7, x1: 5, dx: 4 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23): Quãng đường chuyển động với v(t) = at + b từ t1 đến t2
  t12_b13_d23_kinematics_dist_linear_v_mc: {
    id: 't12_b13_d23_kinematics_dist_linear_v_mc',
    name: 'Tính quãng đường khi biết vận tốc tuyến tính v(t) = at + b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tính S = ∫_{t1}^{t2} (at + b)dt.',
    conditionSummary: 'a >= 1, b >= 1, 0 <= t1 < t2',
    paramSpecs: [
      { name: 'a', label: 'Gia tốc a', min: 2, max: 12 },
      { name: 'b', label: 'Vận tốc ban đầu b', min: 1, max: 10 },
      { name: 't1', label: 'Thời điểm t1', min: 0, max: 3 },
      { name: 'dt', label: 'Khoảng thời gian t2 - t1', min: 1, max: 4 },
    ],
    validateCode: `
      if (params.a < 1 || params.b < 1 || params.dt < 1) return { valid: false, reason: 'Cần a >= 1, b >= 1 và dt >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, t1, dt } = params;
      const t2 = t1 + dt;
      const v1 = a * t1 + b;
      const v2 = a * t2 + b;
      const fr = u.simplifyFrac((v1 + v2) * dt, 2);
      const ansNumTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansNumTex + '\\mathrm{\\,(m)}$';
      const f1 = u.simplifyFrac((v1 + v2) * dt + 8, 2);
      const d1 = '$' + (f1.den === 1 ? f1.num : '\\frac{' + f1.num + '}{' + f1.den + '}') + '\\mathrm{\\,(m)}$';
      const d2 = '$' + a + '\\mathrm{\\,(m)}$';
      const d3 = '$' + (Math.round(fr.value * 10) + 150) + '\\mathrm{\\,(m)}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (Math.round(fr.value) + step * 3 + 11) + '\\mathrm{\\,(m)}$'
      );
      const vStr = u.formatLinear(a, b).replace(/x/g, 't');
      return {
        stem: 'Một vật chuyển động với tốc độ $v(t)=' + vStr + '\\mathrm{\\,(m/s)}$, với thời gian $t$ tính bằng giây. Tính quãng đường vật đi được trong khoảng thời gian từ $t=' + t1 + '$ đến $t=' + t2 + '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Quãng đường vật đi được từ $t=' + t1 + '$ đến $t=' + t2 + '$ là $S = \\int \\limits_{' + t1 + '}^{' + t2 + '} (' + vStr + ')\\mathrm{\\,d}t = ' + ansNumTex + '\\mathrm{\\,(m)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dt = 0', params: { a: 9, b: 5, t1: 1, dt: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 v(t)=9t+5 từ 1 đến 2', params: { a: 9, b: 5, t1: 1, dt: 1 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24): Ô tô đạp phanh với v(t) = v0 - a*t đến khi dừng hẳn
  t12_b13_d24_kinematics_braking_dist_mc: {
    id: 't12_b13_d24_kinematics_braking_dist_mc',
    name: 'Tính quãng đường phanh ô tô chuyển động chậm dần đều',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tìm t_stop = v0/a rồi tính ∫_0^{t_stop} (v0 - at)dt = v0^2 / (2a).',
    conditionSummary: 'v0 = a * T với a >= 2 và T >= 2 (thời gian dừng nguyên)',
    paramSpecs: [
      { name: 'a', label: 'Độ giảm tốc a (m/s^2)', min: 2, max: 8 },
      { name: 'T', label: 'Thời gian dừng T (giây)', min: 2, max: 6 },
    ],
    validateCode: `
      if (params.a < 2 || params.T < 2) return { valid: false, reason: 'Cần a >= 2 và T >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, T } = params;
      const v0 = a * T;
      const fr = u.simplifyFrac(v0 * T, 2);
      const ansNum = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansNum + '\\mathrm{\\,(m)}$';
      const d1 = '$' + (Math.round(fr.value) + 3) + '\\mathrm{\\,(m)}$';
      const d2 = '$' + v0 + '\\mathrm{\\,(m)}$';
      const d3 = '$' + (v0 * T * 8) + '\\mathrm{\\,(m)}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (Math.round(fr.value) + step * 5 + 7) + '\\mathrm{\\,(m)}$'
      );
      return {
        stem: 'Một ô tô đang chạy với tốc độ $' + v0 + '\\mathrm{\\,(m/s)}$ thì người lái đạp phanh; từ thời điểm đó ô tô chuyển động chậm dần đều với vận tốc $v(t)=' + v0 + ' - ' + a + 't\\mathrm{\\,(m/s)}$, trong đó thời gian $t$ tính bằng giây kể từ lúc bắt đầu đạp phanh. Hỏi từ lúc đạp phanh đến khi dừng hẳn, ô tô còn di chuyển bao nhiêu mét?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thời điểm ô tô dừng hẳn thỏa mãn $v(t) = 0 \\Leftrightarrow ' + v0 + ' - ' + a + 't = 0 \\Leftrightarrow t = ' + T + '\\mathrm{\\,(s)}$.',
          'Quãng đường ô tô còn di chuyển là $S = \\int \\limits_{0}^{' + T + '} (' + v0 + ' - ' + a + 't)\\mathrm{\\,d}t = ' + ansNum + '\\mathrm{\\,(m)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên T < 2', params: { a: 6, T: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 v0=24, a=6', params: { a: 6, T: 4 }, expectedValid: true },
    ],
  },

  // Dạng 25 (Q25): Biết v0 và gia tốc a(t) = ct + d, tính quãng đường sau T giờ (T có dạng m/2)
  t12_b13_d25_kinematics_accel_dist_mc: {
    id: 't12_b13_d25_kinematics_accel_dist_mc',
    name: 'Tính quãng đường từ gia tốc bậc nhất a(t) = ct + d và vận tốc đầu',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tìm v(t) = v0 + d·t + (c/2)t^2 rồi tính S = ∫_0^T v(t)dt với T = hHalf / 2 giờ.',
    conditionSummary: 'c, d >= 1, v0 >= 1, hHalf ∈ {3, 5, 7} (T = 1,5; 2,5; 3,5)',
    paramSpecs: [
      { name: 'v0', label: 'Vận tốc ban đầu v0 (km/h)', min: 3, max: 15 },
      { name: 'c', label: 'Hệ số c của gia tốc ct + d', min: 2, max: 8 },
      { name: 'd', label: 'Hằng số d của gia tốc ct + d', min: 2, max: 9 },
      { name: 'hHalf', label: 'Tử số T = hHalf/2', min: 3, max: 7, step: 2 },
    ],
    validateCode: `
      const { v0, c, d, hHalf } = params;
      if (v0 < 1 || c < 1 || d < 1 || hHalf % 2 === 0 || hHalf < 3) return { valid: false, reason: 'Cần v0,c,d >= 1 và hHalf lẻ >= 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v0, c, d, hHalf } = params;
      // v(t) = (c/2)*t^2 + d*t + v0
      // S = int_0^T v(t)dt = (c/6)*T^3 + (d/2)*T^2 + v0*T, voi T = hHalf/2
      // Mau chung: 6 * 8 = 48 -> c * hHalf^3 + 6 * d * hHalf^2 + 24 * v0 * hHalf
      const num = c * Math.pow(hHalf, 3) + 6 * d * hHalf * hHalf + 24 * v0 * hHalf;
      const fr = u.simplifyFrac(num, 48);
      const ansTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansTex + '\\mathrm{\\,(km)}$';
      const f1 = u.simplifyFrac(num + 192, 48);
      const f2 = u.simplifyFrac(Math.max(48, num - 840), 48);
      const f3 = u.simplifyFrac(Math.max(24, Math.floor(num * 0.55)), 48);
      const fmtKm = (f) => '$' + (f.den === 1 ? f.num : '\\frac{' + f.num + '}{' + f.den + '}') + '\\mathrm{\\,(km)}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtKm(f1), fmtKm(f2), fmtKm(f3)],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 7) + '}{' + fr.den + '}\\mathrm{\\,(km)}$'
      );
      const aStr = u.formatLinear(c, d).replace(/x/g, 't');
      const vCoef2 = u.simplifyFrac(c, 2);
      const vTerm2 = vCoef2.den === 1 ? (vCoef2.num === 1 ? 't^2' : vCoef2.num + 't^2') : '\\frac{' + vCoef2.num + '}{' + vCoef2.den + '}t^2';
      const tLabel = u.formatNumberVN(hHalf / 2);
      return {
        stem: 'Một vật đang chuyển động với tốc độ $' + v0 + '\\mathrm{\\,(km/h)}$ thì tăng tốc với gia tốc $a(t)=' + aStr + '\\mathrm{\\,(km/h^2)}$. Tính quãng đường vật đi được trong vòng $' + tLabel + '$ giờ kể từ khi tăng tốc.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vận tốc của vật tại thời điểm $t$ là $v(t) = \\int (' + aStr + ')\\mathrm{\\,d}t = ' + vTerm2 + ' + ' + d + 't + C$.',
          'Từ $v(0) = ' + v0 + ' \\Rightarrow C = ' + v0 + '$, suy ra $v(t) = ' + vTerm2 + ' + ' + d + 't + ' + v0 + '$.',
          'Quãng đường đi được trong $' + tLabel + '$ giờ là $S = \\int \\limits_{0}^{' + tLabel + '} \\left(' + vTerm2 + ' + ' + d + 't + ' + v0 + '\\right)\\mathrm{\\,d}t = ' + ansTex + '\\mathrm{\\,(km)}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hHalf chẵn', params: { v0: 7, c: 2, d: 7, hHalf: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 v0=7, a=2t+7, T=2,5', params: { v0: 7, c: 2, d: 7, hHalf: 5 }, expectedValid: true },
    ],
  },

  // Dạng 26 (Q26): Gia tốc bậc hai a(t) = pt^2 + qt + r và v(0) = v0, tính v(t1)
  t12_b13_d26_kinematics_accel_to_v_mc: {
    id: 't12_b13_d26_kinematics_accel_to_v_mc',
    name: 'Tính vận tốc sau t1 giây khi biết gia tốc bậc hai và vận tốc đầu',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tính v(t1) = v0 + ∫_0^{t1} (pt^2 + qt + r)dt.',
    conditionSummary: 'p, q, r >= 1, v0 >= 1, t1 ∈ {1, 2, 3}',
    paramSpecs: [
      { name: 'p', label: 'Hệ số p', min: 1, max: 6 },
      { name: 'q', label: 'Hệ số q', min: 1, max: 6 },
      { name: 'r', label: 'Hệ số r', min: 1, max: 6 },
      { name: 'v0', label: 'Vận tốc đầu v0 (m/s)', min: 1, max: 8 },
      { name: 't1', label: 'Thời điểm t1 (giây)', min: 1, max: 3 },
    ],
    validateCode: `
      const { p, q, r, v0, t1 } = params;
      if (p < 1 || q < 1 || r < 1 || v0 < 1 || t1 < 1) return { valid: false, reason: 'Các hệ số phải >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, r, v0, t1 } = params;
      // v(t1) = v0 + p*t1^3/3 + q*t1^2/2 + r*t1 -> mẫu 6
      const num = 6 * v0 + 2 * p * Math.pow(t1, 3) + 3 * q * t1 * t1 + 6 * r * t1;
      const fr = u.simplifyFrac(num, 6);
      const ansTex = fr.den === 1 ? '' + fr.num : '\\frac{' + fr.num + '}{' + fr.den + '}';
      const correct = '$' + ansTex + '\\,\\mathrm{m/s}$';
      const d1 = '$' + (Math.round(fr.value) + 12) + '\\,\\mathrm{m/s}$';
      const f2 = u.simplifyFrac(Math.max(6, num - 19), 6);
      const d2 = '$' + (f2.den === 1 ? f2.num : '\\frac{' + f2.num + '}{' + f2.den + '}') + '\\,\\mathrm{m/s}$';
      const f3 = u.simplifyFrac(Math.max(6, num - 26), 6);
      const d3 = '$' + (f3.den === 1 ? f3.num : '\\frac{' + f3.num + '}{' + f3.den + '}') + '\\,\\mathrm{m/s}$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$\\frac{' + (fr.num + step * 5) + '}{' + fr.den + '}\\,\\mathrm{m/s}$'
      );
      const aStr = u.formatQuadratic(p, q, r).replace(/x/g, 't');
      const v3 = u.simplifyFrac(p, 3);
      const v2 = u.simplifyFrac(q, 2);
      const v3Tex = v3.den === 1 ? (v3.num === 1 ? 't^3' : v3.num + 't^3') : '\\frac{' + v3.num + 't^3}{' + v3.den + '}';
      const v2Tex = v2.den === 1 ? (v2.num === 1 ? 't^2' : v2.num + 't^2') : '\\frac{' + v2.num + 't^2}{' + v2.den + '}';
      const vExpr = v3Tex + ' + ' + v2Tex + ' + ' + (r === 1 ? 't' : r + 't');
      return {
        stem: 'Một vật chuyển động với gia tốc $a(t)=' + aStr + '\\,(\\mathrm{m/s^2})$. Vận tốc ban đầu của vật là $' + v0 + '\\,\\mathrm{m/s}$. Hỏi vận tốc của vật là bao nhiêu sau khi chuyển động với gia tốc đó được $' + t1 + '$ giây?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vận tốc của chuyển động là $v(t) = \\int \\left(' + aStr + '\\right)\\mathrm{\\,d}t = ' + vExpr + ' + C$.',
          'Do $v(0) = ' + v0 + ' \\Rightarrow C = ' + v0 + '$, suy ra $v(t) = ' + vExpr + ' + ' + v0 + '$.',
          'Vận tốc của vật sau $' + t1 + '$ giây là $v(' + t1 + ') = ' + ansTex + '\\,\\mathrm{m/s}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t1 = 0', params: { p: 4, q: 3, r: 3, v0: 2, t1: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 4t^2+3t+3, v0=2, t=1', params: { p: 4, q: 3, r: 3, v0: 2, t1: 1 }, expectedValid: true },
    ],
  },
};
