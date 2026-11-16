import { MathTemplate } from '../types/math';

export const G12_B2_TEMPLATES_PART1: Record<string, MathTemplate> = {
  // Dạng 1 [MC - Biết]: Đọc GTLN, GTNN từ đồ thị đường gấp khúc trên đoạn [a; b] và tính uM + vm
  t12_b2_d01_graph_polyline_maxmin_mc: {
    id: 't12_b2_d01_graph_polyline_maxmin_mc',
    name: 'Dạng 1: Tìm giá trị lớn nhất, nhỏ nhất từ đồ thị trên đoạn [a; b]',
    category: 'MC',
    level: 'Biết',
    topicTag: 'GTLN & GTNN — Đồ thị hàm số',
    description:
      'Cho đồ thị hàm số y = f(x) trên đoạn [a; b] gồm hai đoạn thẳng nối (a; yA), (xm; yM), (b; yB). Tìm M, m và tính biểu thức uM + vm.',
    conditionSummary: 'a < xm < b và max(yA, yM, yB) > min(yA, yM, yB), u != 0, v != 0',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái a', min: -4, max: -1 },
      { name: 'xm', label: 'Hoành độ đỉnh giữa xm', min: 0, max: 4 },
      { name: 'b', label: 'Đầu mút phải b', min: 5, max: 9 },
      { name: 'yA', label: 'Tung độ y(a)', min: -2, max: 3 },
      { name: 'yM', label: 'Tung độ y(xm)', min: 2, max: 6 },
      { name: 'yB', label: 'Tung độ y(b)', min: -4, max: 1 },
      { name: 'uCoef', label: 'Hệ số u của M', min: 1, max: 3 },
      { name: 'vCoef', label: 'Hệ số v của m', min: -2, max: 3, allowZero: false },
    ],
    validateCode: `
      const { a, xm, b, yA, yM, yB, uCoef, vCoef } = params;
      if (!(a < xm && xm < b)) return { valid: false, reason: 'Cần a < xm < b' };
      const maxY = Math.max(yA, yM, yB);
      const minY = Math.min(yA, yM, yB);
      if (maxY === minY) return { valid: false, reason: 'GTLN và GTNN phải phân biệt' };
      if (uCoef === 0 || vCoef === 0) return { valid: false, reason: 'u và v phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, xm, b, yA, yM, yB, uCoef, vCoef } = params;
      const maxY = Math.max(yA, yM, yB);
      const minY = Math.min(yA, yM, yB);
      const ans = uCoef * maxY + vCoef * minY;
      const expr = u.formatTerm(uCoef, 'M', true) + u.formatTerm(vCoef, 'm', false);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        [
          '$' + (ans + 1) + '$',
          '$' + (ans + 2) + '$',
          '$' + (ans + 4) + '$',
          '$' + (uCoef * minY + vCoef * maxY) + '$',
        ],
        rng,
        (k) => '$' + (ans - k - 2) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ có đồ thị trên đoạn $[' +
          a +
          ';\\, ' +
          b +
          ']$ như hình vẽ. Gọi $M$ và $m$ lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số đã cho trên đoạn $[' +
          a +
          ';\\, ' +
          b +
          ']$. Tính $' +
          expr +
          '$.',
        diagram: {
          kind: 'function_plot',
          curveType: 'polyline',
          coeffs: [],
          points: [
            [a, yA],
            [xm, yM],
            [b, yB],
          ],
          xMin: a - 1,
          xMax: b + 1,
          yMin: minY - 1,
          yMax: maxY + 1,
          xTicks: Array.from(new Set([a, xm, b])),
          yTicks: Array.from(new Set([minY, yA, maxY])),
          strokeColor: '#2563eb',
          highlightPoints: [
            { x: a, y: yA },
            { x: xm, y: yM },
            { x: b, y: yB },
          ],
        },
        options,
        correctIndex,
        answerSummary: '$' + ans + '$',
        solutionSteps: [
          'Dựa vào đồ thị trên đoạn $[' + a + ';\\, ' + b + ']$, ta thấy giá trị lớn nhất $M = ' + maxY + '$ và giá trị nhỏ nhất $m = ' + minY + '$.',
          'Do đó $' + expr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc ([-2; 7], (2; 4), 2M + m)',
        params: { a: -2, xm: 2, b: 7, yA: 1, yM: 4, yB: -2, uCoef: 2, vCoef: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi xm >= b',
        params: { a: -2, xm: 7, b: 7, yA: 1, yM: 4, yB: -2, uCoef: 2, vCoef: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 2 [MC - Biết]: GTLN / GTNN của hàm bậc ba trên đoạn [L; R]
  t12_b2_d02_cubic_seg_maxmin_mc: {
    id: 't12_b2_d02_cubic_seg_maxmin_mc',
    name: 'Dạng 2: Tìm giá trị lớn nhất, nhỏ nhất của hàm bậc ba trên đoạn [a; b]',
    category: 'MC',
    level: 'Biết',
    topicTag: 'GTLN & GTNN — Hàm bậc ba trên đoạn',
    description:
      'Cho hàm bậc ba y = ax^3 + bx^2 + cx + d (a ∈ {-1, 1}, hai cực trị nguyên x1 < x2) trên đoạn [L; R]. Tìm GTLN hoặc GTNN.',
    conditionSummary: 'a ∈ {-1, 1}, x1 < x2, x1 + x2 chẵn, L < x1 < x2 < R',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc ba a', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'x1', label: 'Điểm cực trị x1', min: -4, max: 0 },
      { name: 'x2', label: 'Điểm cực trị x2', min: 0, max: 4 },
      { name: 'd', label: 'Hệ số tự do d', min: -4, max: 4 },
      { name: 'padL', label: 'Độ mở trái (x1 - L)', min: 1, max: 3 },
      { name: 'padR', label: 'Độ mở phải (R - x2)', min: 1, max: 3 },
      { name: 'askMax', label: 'Tìm (0: GTNN, 1: GTLN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, x1, x2, padL, padR } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'a chỉ nhận -1 hoặc 1' };
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2' };
      if ((x1 + x2) % 2 !== 0) return { valid: false, reason: 'Cần x1 + x2 chẵn để hệ số nguyên' };
      if (padL < 1 || padR < 1) return { valid: false, reason: 'Cần L < x1 < x2 < R' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2, d, padL, padR, askMax } = params;
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const L = x1 - padL;
      const R = x2 + padR;
      const f = (x) => a * x * x * x + b * x * x + c * x + d;
      const fL = f(L);
      const f1 = f(x1);
      const f2 = f(x2);
      const fR = f(R);
      const vals = [fL, f1, f2, fR];
      const maxVal = Math.max(...vals);
      const minVal = Math.min(...vals);
      const target = askMax === 1 ? maxVal : minVal;
      const other = askMax === 1 ? minVal : maxVal;
      const sym = askMax === 1 ? 'M' : 'm';
      const askWord = askMax === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';
      const poly = u.formatPoly([a, b, c, d]);
      const deriv = u.formatQuadratic(3 * a, 2 * b, c);
      const correct = '$' + sym + ' = ' + target + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + sym + ' = ' + other + '$',
          '$' + sym + ' = ' + (target - 49) + '$',
          '$' + sym + ' = ' + (other + 49) + '$',
          '$' + sym + ' = ' + (target + 12) + '$',
        ],
        rng,
        (k) => '$' + sym + ' = ' + (target + k * 7) + '$'
      );
      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = ' +
          poly +
          '$ trên đoạn $[' +
          L +
          ';\\, ' +
          R +
          ']$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $y\' = ' + deriv + ' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$ (đều thuộc $[' + L + ';\\, ' + R + ']$).',
          'Tính các giá trị: $f(' + L + ') = ' + fL + ',\\; f(' + x1 + ') = ' + f1 + ',\\; f(' + x2 + ') = ' + f2 + ',\\; f(' + R + ') = ' + fR + '$.',
          'Vậy ' + askWord + ' của hàm số trên đoạn $[' + L + ';\\, ' + R + ']$ là $' + target + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (-x^3 - 3x^2 + 9x trên [-5; 3])',
        params: { a: -1, x1: -3, x2: 1, d: 0, padL: 2, padR: 2, askMax: 0 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi x1 + x2 lẻ',
        params: { a: 1, x1: 0, x2: 1, d: 0, padL: 1, padR: 1, askMax: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 3 [MC - Biết]: GTLN / GTNN của hàm phân thức bậc 1/bậc 1 trên đoạn [L; R]
  t12_b2_d03_rat11_seg_maxmin_mc: {
    id: 't12_b2_d03_rat11_seg_maxmin_mc',
    name: 'Dạng 3: Tìm giá trị lớn nhất, nhỏ nhất của hàm (ax + b)/(cx + d) trên đoạn [α; β]',
    category: 'MC',
    level: 'Biết',
    topicTag: 'GTLN & GTNN — Phân thức trên đoạn',
    description:
      'Cho hàm số y = (ax + b)/(cx + d) liên tục trên đoạn [L; R] (tiệm cận đứng nằm ngoài [L; R]). Tìm GTLN hoặc GTNN.',
    conditionSummary: 'c != 0, ad - bc != 0, L < R và tiệm cận đứng -d/c không thuộc [L; R]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6 },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6 },
      { name: 'c', label: 'Hệ số c', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -10, max: 10 },
      { name: 'L', label: 'Đầu mút trái L', min: -15, max: -2 },
      { name: 'len', label: 'Độ dài đoạn R - L', min: 3, max: 10 },
      { name: 'askMax', label: 'Tìm (0: GTNN, 1: GTLN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c, d, L, len } = params;
      if (c === 0) return { valid: false, reason: 'c phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm hàm suy biến thành hằng số' };
      if (len < 2) return { valid: false, reason: 'Độ dài đoạn phải >= 2' };
      const R = L + len;
      const denL = c * L + d;
      const denR = c * R + d;
      if (denL === 0 || denR === 0 || denL * denR <= 0) {
        return { valid: false, reason: 'Tiệm cận đứng không được nằm trong đoạn [L; R]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, L, len, askMax } = params;
      const R = L + len;
      const numExpr = u.formatLinear(a, b);
      const denExpr = u.formatLinear(c, d);
      const det = a * d - b * c;
      const fL = u.simplifyFrac(a * L + b, c * L + d);
      const fR = u.simplifyFrac(a * R + b, c * R + d);
      const isInc = det > 0;
      const targetFrac = askMax === 1 ? (fL.value >= fR.value ? fL : fR) : fL.value <= fR.value ? fL : fR;
      const otherFrac = targetFrac === fL ? fR : fL;
      const targetX = targetFrac === fL ? L : R;
      const sym = askMax === 1 ? 'M' : 'm';
      const askWord = askMax === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';
      const asym = u.simplifyFrac(-d, c);

      const fake1 = u.simplifyFrac(-targetFrac.num + 1, targetFrac.den);
      const fake2 = u.simplifyFrac(otherFrac.num + 2, otherFrac.den);
      const correct = '$' + sym + ' = ' + targetFrac.latex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + sym + ' = ' + otherFrac.latex + '$', '$' + sym + ' = ' + fake1.latex + '$', '$' + sym + ' = ' + fake2.latex + '$'],
        rng,
        (k) => '$' + sym + ' = ' + u.simplifyFrac(targetFrac.num + k * 3, targetFrac.den).latex + '$'
      );

      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = \\dfrac{' +
          numExpr +
          '}{' +
          denExpr +
          '}$ trên đoạn $[' +
          L +
          ';\\, ' +
          R +
          ']$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đạo hàm $y\' = \\dfrac{' + det + '}{(' + denExpr + ')^2} ' + (isInc ? '> 0' : '< 0') + ',\\, \\forall x \\neq ' + asym.latex + '$.',
          'Hàm số ' + (isInc ? 'đồng biến' : 'nghịch biến') + ' trên đoạn $[' + L + ';\\, ' + R + ']$.',
          'Ta có $f(' + L + ') = ' + fL.latex + '$, $f(' + R + ') = ' + fR.latex + '$. Vậy hàm số đạt ' + askWord + ' tại $x = ' + targetX + '$, $' + sym + ' = ' + targetFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (5x + 2)/(-6x - 9) trên [-14; -5]',
        params: { a: 5, b: 2, c: -6, d: -9, L: -14, len: 9, askMax: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi tiệm cận đứng nằm trong đoạn',
        params: { a: 2, b: 1, c: 1, d: 3, L: -5, len: 4, askMax: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 4 [MC - Hiểu]: GTLN / GTNN của hàm y = (x^2 + bx + c)e^x trên đoạn [L; R]
  t12_b2_d04_quad_exp_seg_maxmin_mc: {
    id: 't12_b2_d04_quad_exp_seg_maxmin_mc',
    name: 'Dạng 4: Tìm giá trị lớn nhất, nhỏ nhất của hàm (x² + bx + c)e^x trên đoạn',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Hàm mũ tích đa thức',
    description:
      'Xây dựng hàm y = (x^2 + bx + c)e^x có hai điểm dừng nguyên r1 = 0 < r2. Tìm GTLN hoặc GTNN trên đoạn [L; r2].',
    conditionSummary: 'r2 >= 3, L in [-3; -1], P(L)*e^L < c - 0.1 để M = f(0) = c và m = f(r2) phân biệt rõ',
    paramSpecs: [
      { name: 'r2', label: 'Điểm dừng dương r2', min: 3, max: 6 },
      { name: 'L', label: 'Đầu mút trái L', min: -3, max: -1 },
      { name: 'askMax', label: 'Tìm (0: GTNN, 1: GTLN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { r2, L } = params;
      if (r2 < 3) return { valid: false, reason: 'Cần r2 >= 3' };
      if (L >= 0) return { valid: false, reason: 'Cần L < 0 để đoạn [L; r2] chứa 0' };
      const b = -r2 - 2;
      const c = r2 + 2;
      const valL = (L * L + b * L + c) * Math.exp(L);
      if (valL >= c - 0.2) return { valid: false, reason: 'Chọn L sao cho f(L) < f(0) để tránh nhập nhằng GTLN' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r2, L, askMax } = params;
      // y' = (x^2 + (b+2)x + b+c)e^x = x(x - r2)e^x -> b = -r2 - 2, c = r2 + 2
      const b = -r2 - 2;
      const c = r2 + 2;
      const quad = u.formatQuadratic(1, b, c);
      const derivQuad = u.formatQuadratic(1, -r2, 0);
      const valLCoef = L * L + b * L + c;
      const valRCoef = r2 * r2 + b * r2 + c; // = 2 - r2 < 0

      const fmtExpVal = (coef, p) => {
        if (coef === 0) return '0';
        if (p === 0) return '' + coef;
        if (p === 1) return (coef === 1 ? '' : coef === -1 ? '-' : coef + ' ') + 'e';
        if (p > 1) return (coef === 1 ? '' : coef === -1 ? '-' : coef + ' ') + 'e^{' + p + '}';
        const posP = -p;
        const den = posP === 1 ? 'e' : 'e^{' + posP + '}';
        return (coef < 0 ? '-\\dfrac{' + Math.abs(coef) + '}{' + den + '}' : '\\dfrac{' + coef + '}{' + den + '}');
      };

      const fLStr = fmtExpVal(valLCoef, L);
      const fRStr = fmtExpVal(valRCoef, r2);
      const correct = askMax === 1 ? '$' + c + '$' : '$' + fRStr + '$';
      const askWord = askMax === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + (askMax === 1 ? fRStr : c) + '$',
          '$\\dfrac{' + (valLCoef + 12) + '}{e^{' + (Math.abs(L) + 1) + '}}$',
          '$e^{' + (r2 + 1) + '}$',
          '$' + (c + 3) + '$',
        ],
        rng,
        (k) => '$' + (c + k * 2) + '$'
      );

      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = (' +
          quad +
          ')e^{x}$ trên đoạn $[' +
          L +
          ';\\, ' +
          r2 +
          ']$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $y\' = (' + u.formatLinear(2, b) + ')e^x + (' + quad + ')e^x = (' + derivQuad + ')e^x$.',
          'Giải $y\' = 0 \\Leftrightarrow x = 0$ hoặc $x = ' + r2 + '$ (đều thuộc $[' + L + ';\\, ' + r2 + ']$).',
          'Tính giá trị: $f(' + L + ') = ' + fLStr + ',\\; f(0) = ' + c + ',\\; f(' + r2 + ') = ' + fRStr + '$.',
          'Vậy ' + askWord + ' của hàm số trên đoạn $[' + L + ';\\, ' + r2 + ']$ bằng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (x^2 - 7x + 7)e^x trên [-2; 5]', params: { r2: 5, L: -2, askMax: 1 }, expectedValid: true },
      { label: 'Biên tìm GTNN với r2 = 4', params: { r2: 4, L: -2, askMax: 0 }, expectedValid: true },
      { label: 'Biên lỗi L >= 0', params: { r2: 5, L: 0, askMax: 1 }, expectedValid: false },
    ],
  },

  // Dạng 5 [MC - Biết]: GTLN / GTNN của hàm y = e^(x^2 + bx + c) trên đoạn [L; R]
  t12_b2_d05_exp_quad_seg_maxmin_mc: {
    id: 't12_b2_d05_exp_quad_seg_maxmin_mc',
    name: 'Dạng 5: Tìm giá trị lớn nhất, nhỏ nhất của hàm e^(x² + bx + c) trên đoạn [α; β]',
    category: 'MC',
    level: 'Biết',
    topicTag: 'GTLN & GTNN — Hàm mũ hợp bậc hai',
    description:
      'Cho hàm số y = e^(x^2 + bx + c) trên đoạn [L; R] chứa đỉnh x0 = -b/2. Tìm GTNN hoặc GTLN.',
    conditionSummary: 'b chẵn, đỉnh x0 = -b/2 thuộc (L; R), L < R',
    paramSpecs: [
      { name: 'x0', label: 'Đỉnh x0 = -b/2', min: -3, max: 3 },
      { name: 'c', label: 'Hằng số c', min: -3, max: 5 },
      { name: 'padL', label: 'Khoảng cách trái x0 - L', min: 1, max: 4 },
      { name: 'padR', label: 'Khoảng cách phải R - x0', min: 1, max: 4 },
      { name: 'askMax', label: 'Tìm (0: GTNN, 1: GTLN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { padL, padR, askMax } = params;
      if (padL < 1 || padR < 1) return { valid: false, reason: 'Đỉnh x0 phải nằm bên trong đoạn [L; R]' };
      if (askMax === 1 && padL === padR) return { valid: false, reason: 'Tránh padL = padR nếu muốn hai đầu mút khác nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, c, padL, padR, askMax } = params;
      const b = -2 * x0;
      const L = x0 - padL;
      const R = x0 + padR;
      const polyExp = u.formatQuadratic(1, b, c);
      const derivLin = u.formatLinear(2, b);
      const uL = L * L + b * L + c;
      const u0 = x0 * x0 + b * x0 + c;
      const uR = R * R + b * R + c;
      const targetExp = askMax === 1 ? Math.max(uL, uR) : u0;
      const otherExp = askMax === 1 ? u0 : Math.max(uL, uR);

      const fmtE = (p) => (p === 0 ? '1' : p === 1 ? 'e' : 'e^{' + p + '}');
      const correct = '$' + fmtE(targetExp) + '$';
      const askWord = askMax === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + fmtE(otherExp) + '$',
          '$1 + ' + fmtE(Math.max(uL, uR) + 7) + '$',
          '$' + fmtE(Math.max(uL, uR) + 7) + '$',
          '$' + fmtE(targetExp + 2) + '$',
        ],
        rng,
        (k) => '$' + fmtE(targetExp + k * 3 + 1) + '$'
      );

      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = e^{' +
          polyExp +
          '}$ trên đoạn $[' +
          L +
          ';\\, ' +
          R +
          ']$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $y\' = (' + derivLin + ')e^{' + polyExp + '} = 0 \\Leftrightarrow x = ' + x0 + ' \\in [' + L + ';\\, ' + R + ']$.',
          'Tính các giá trị: $f(' + L + ') = ' + fmtE(uL) + ',\\; f(' + x0 + ') = ' + fmtE(u0) + ',\\; f(' + R + ') = ' + fmtE(uR) + '$.',
          'Vậy ' + askWord + ' của hàm số bằng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc e^(x^2 + 4x + 1) trên [-5; 0]', params: { x0: -2, c: 1, padL: 3, padR: 2, askMax: 0 }, expectedValid: true },
      { label: 'Biên lỗi padL = 0', params: { x0: -2, c: 1, padL: 0, padR: 2, askMax: 0 }, expectedValid: false },
    ],
  },

  // Dạng 6 [MC - Biết]: GTLN / GTNN của hàm y = ln(x^2 + bx + c) trên đoạn [L; R]
  t12_b2_d06_ln_quad_seg_maxmin_mc: {
    id: 't12_b2_d06_ln_quad_seg_maxmin_mc',
    name: 'Dạng 6: Tìm giá trị lớn nhất, nhỏ nhất của hàm ln(x² + bx + c) trên đoạn [α; β]',
    category: 'MC',
    level: 'Biết',
    topicTag: 'GTLN & GTNN — Hàm lôgarit hợp bậc hai',
    description:
      'Cho hàm số y = ln(x^2 + bx + c) (với b^2 - 4c < 0) trên đoạn [L; R] chứa đỉnh -b/2. Tìm GTNN hoặc GTLN.',
    conditionSummary: 'b^2 - 4c < 0 và L < -b/2 < R',
    paramSpecs: [
      { name: 'b', label: 'Hệ số b', min: -3, max: 3 },
      { name: 'c', label: 'Hệ số c', min: 3, max: 8 },
      { name: 'L', label: 'Đầu mút trái L', min: -5, max: -2 },
      { name: 'R', label: 'Đầu mút phải R', min: 2, max: 5 },
      { name: 'askMax', label: 'Tìm (0: GTNN, 1: GTLN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { b, c, L, R } = params;
      if (b * b - 4 * c >= 0) return { valid: false, reason: 'Cần b^2 - 4c < 0 để x^2 + bx + c > 0 với mọi x' };
      const x0 = -b / 2;
      if (!(L < x0 && x0 < R)) return { valid: false, reason: 'Đoạn [L; R] phải chứa đỉnh -b/2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, c, L, R, askMax } = params;
      const poly = u.formatQuadratic(1, b, c);
      const x0 = u.simplifyFrac(-b, 2);
      const uL = L * L + b * L + c;
      const uR = R * R + b * R + c;
      const u0 = u.simplifyFrac(4 * c - b * b, 4);
      const uMax = Math.max(uL, uR);
      const targetLatex = askMax === 1 ? '' + uMax : u0.latex;
      const otherLatex = askMax === 1 ? u0.latex : '' + uMax;
      const correct = '$\\ln ' + targetLatex + '$';
      const askWord = askMax === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$\\ln ' + otherLatex + '$',
          '$1 + \\ln ' + (uMax + 8) + '$',
          '$\\ln ' + (uMax + 8) + '$',
          '$\\ln ' + (uMax + 3) + '$',
        ],
        rng,
        (k) => '$\\ln ' + (uMax + k * 2 + 1) + '$'
      );

      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = \\ln(' +
          poly +
          ')$ trên đoạn $[' +
          L +
          ';\\, ' +
          R +
          ']$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $y\' = \\dfrac{' + u.formatLinear(2, b) + '}{' + poly + '} = 0 \\Leftrightarrow x = ' + x0.latex + ' \\in [' + L + ';\\, ' + R + ']$.',
          'Tính các giá trị: $f(' + L + ') = \\ln ' + uL + ',\\; f\\left(' + x0.latex + '\\right) = \\ln ' + u0.latex + ',\\; f(' + R + ') = \\ln ' + uR + '$.',
          'Vậy ' + askWord + ' của hàm số trên đoạn $[' + L + ';\\, ' + R + ']$ bằng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc ln(x^2 + x + 4) trên [-3; 3]', params: { b: 1, c: 4, L: -3, R: 3, askMax: 0 }, expectedValid: true },
      { label: 'Biên lỗi delta >= 0', params: { b: 4, c: 3, L: -4, R: 2, askMax: 0 }, expectedValid: false },
    ],
  },

  // Dạng 7 [MC - Hiểu]: GTLN / GTNN của hàm bậc ba trên khoảng (-∞; k)
  t12_b2_d07_cubic_unbounded_maxmin_mc: {
    id: 't12_b2_d07_cubic_unbounded_maxmin_mc',
    name: 'Dạng 7: Tìm giá trị lớn nhất, nhỏ nhất của hàm bậc ba trên khoảng (-∞; k)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Trên khoảng vô hạn',
    description:
      'Cho hàm bậc ba có 2 cực trị x1 < x2. Tìm GTLN (khi a > 0) hoặc GTNN (khi a < 0) trên khoảng (-∞; k) với x1 < k <= x2.',
    conditionSummary: 'a ∈ {-1, 1}, x1 < x2, x1 + x2 chẵn, x1 < k <= x2',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc ba a', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'x1', label: 'Điểm cực trị x1', min: -3, max: 2 },
      { name: 'gap', label: 'Khoảng cách x2 - x1', min: 2, max: 6, step: 2 },
      { name: 'kOffset', label: 'Độ lệch k - x1 (1 <= kOffset <= gap)', min: 1, max: 4 },
      { name: 'd', label: 'Hệ số tự do d', min: -5, max: 6 },
    ],
    validateCode: `
      const { a, gap, kOffset } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'a phải là -1 hoặc 1' };
      if (gap < 2 || gap % 2 !== 0) return { valid: false, reason: 'gap phải chẵn và >= 2 để hệ số nguyên' };
      if (kOffset < 1 || kOffset > gap) return { valid: false, reason: 'Cần x1 < k <= x2 để tồn tại duy nhất GTLN/GTNN trên (-∞; k)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, gap, kOffset, d } = params;
      const x2 = x1 + gap;
      const kBound = x1 + kOffset;
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const poly = u.formatPoly([a, b, c, d]);
      const deriv = u.formatQuadratic(3 * a, 2 * b, c);
      const y1 = a * x1 * x1 * x1 + b * x1 * x1 + c * x1 + d;
      const y2 = a * x2 * x2 * x2 + b * x2 * x2 + c * x2 + d;
      const isPos = a === 1;
      const askWord = isPos ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + y1 + '$',
        ['$' + y2 + '$', '$' + (y2 + 1) + '$', '$' + (y1 - 3) + '$', '$' + (y1 + 5) + '$'],
        rng,
        (j) => '$' + (y1 + j * 4) + '$'
      );

      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = ' +
          poly +
          '$ trên khoảng $(-\\infty;\\, ' +
          kBound +
          ')$.',
        options,
        correctIndex,
        answerSummary: '$' + y1 + '$',
        solutionSteps: [
          'Ta có $y\' = ' + deriv + ' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Trên khoảng $(-\\infty;\\, ' + x1 + ')$ đạo hàm mang dấu $' + (isPos ? '+' : '-') + '$, trên $(' + x1 + ';\\, ' + kBound + ')$ đạo hàm mang dấu $' + (isPos ? '-' : '+') + '$.',
          'Dựa vào bảng biến thiên, ' + askWord + ' của hàm số trên khoảng $(-\\infty;\\, ' + kBound + ')$ là $f(' + x1 + ') = ' + y1 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc x^3 - 6x^2 + 4 trên (-infty; 2)', params: { a: 1, x1: 0, gap: 4, kOffset: 2, d: 4 }, expectedValid: true },
      { label: 'Biên lỗi k > x2', params: { a: 1, x1: 0, gap: 4, kOffset: 5, d: 4 }, expectedValid: false },
    ],
  },

  // Dạng 8 [MC - Biết]: GTLN / GTNN của hàm phân thức (ax + b)/(cx + d) trên nửa khoảng [L; R)
  t12_b2_d08_rat11_halfopen_maxmin_mc: {
    id: 't12_b2_d08_rat11_halfopen_maxmin_mc',
    name: 'Dạng 8: Tìm GTLN / GTNN của hàm (ax + b)/(cx + d) trên nửa khoảng [α; β)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'GTLN & GTNN — Nửa khoảng',
    description:
      'Cho hàm phân thức bậc 1/bậc 1 trên nửa khoảng [L; R) không chứa tiệm cận đứng. Xác định GTNN (nếu đồng biến) hoặc GTLN (nếu nghịch biến) tại x = L.',
    conditionSummary: 'c != 0, ad - bc != 0, tiệm cận đứng không thuộc [L; R]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -7, max: 5 },
      { name: 'b', label: 'Hệ số b', min: -8, max: 6 },
      { name: 'c', label: 'Hệ số c', min: -7, max: 6, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -12, max: 10 },
      { name: 'L', label: 'Đầu mút đóng L', min: 1, max: 6 },
      { name: 'len', label: 'Độ dài nửa khoảng R - L', min: 4, max: 12 },
    ],
    validateCode: `
      const { a, b, c, d, L, len } = params;
      if (c === 0) return { valid: false, reason: 'c phải khác 0' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 suy biến thành hàm hằng' };
      if (len < 2) return { valid: false, reason: 'Độ dài nửa khoảng >= 2' };
      const R = L + len;
      const denL = c * L + d;
      const denR = c * R + d;
      if (denL === 0 || denR === 0 || denL * denR <= 0) {
        return { valid: false, reason: 'Tiệm cận đứng không được nằm trong [L; R]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, L, len } = params;
      const R = L + len;
      const det = a * d - b * c;
      const isInc = det > 0;
      const askWord = isInc ? 'giá trị nhỏ nhất' : 'giá trị lớn nhất';
      const sym = isInc ? 'm' : 'M';
      const numExpr = u.formatLinear(a, b);
      const denExpr = u.formatLinear(c, d);
      const asym = u.simplifyFrac(-d, c);
      const fL = u.simplifyFrac(a * L + b, c * L + d);
      const fR = u.simplifyFrac(a * R + b, c * R + d);
      const fake1 = u.simplifyFrac(fR.num + 2, fR.den);
      const fake2 = u.simplifyFrac(-fL.num - 3, fL.den);
      const correct = '$' + sym + ' = ' + fL.latex + '$';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + sym + ' = ' + fR.latex + '$', '$' + sym + ' = ' + fake1.latex + '$', '$' + sym + ' = ' + fake2.latex + '$'],
        rng,
        (k) => '$' + sym + ' = ' + u.simplifyFrac(fL.num + k * 5, fL.den).latex + '$'
      );

      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = \\dfrac{' +
          numExpr +
          '}{' +
          denExpr +
          '}$ trên nửa khoảng $[' +
          L +
          ';\\, ' +
          R +
          ')$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $y\' = \\dfrac{' + det + '}{(' + denExpr + ')^2} ' + (isInc ? '> 0' : '< 0') + ',\\, \\forall x \\neq ' + asym.latex + '$.',
          'Hàm số ' + (isInc ? 'đồng biến' : 'nghịch biến') + ' trên khoảng $(' + L + ';\\, ' + R + ')$.',
          'Hàm số đạt ' + askWord + ' trên nửa khoảng $[' + L + ';\\, ' + R + ')$ tại $x = ' + L + ',\\; ' + sym + ' = f(' + L + ') = ' + fL.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (-6x - 5)/(-6x - 10) trên [3; 12)',
        params: { a: -6, b: -5, c: -6, d: -10, L: 3, len: 9 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi tiệm cận nằm trong [L; R)',
        params: { a: 2, b: 1, c: 1, d: -4, L: 2, len: 5 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 9 [MC - Hiểu]: GTLN / GTNN của hàm y = ax + b/x trên (-∞; 0) hoặc (0; +∞)
  t12_b2_d09_ax_plus_b_over_x_mc: {
    id: 't12_b2_d09_ax_plus_b_over_x_mc',
    name: 'Dạng 9: Tìm GTLN / GTNN của hàm y = ax + b/x trên (-∞; 0) hoặc (0; +∞)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Bất đẳng thức / Đạo hàm trên khoảng',
    description:
      'Cho hàm số y = ax + b/x (a > 0, b > 0). Tìm giá trị lớn nhất trên (-∞; 0) hoặc giá trị nhỏ nhất trên (0; +∞).',
    conditionSummary: 'a > 0, b > 0, mode ∈ {0: (-∞; 0) tìm GTLN, 1: (0; +∞) tìm GTNN}',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 10 },
      { name: 'b', label: 'Hệ số b', min: 1, max: 12 },
      { name: 'mode', label: 'Miền (0: (-∞; 0), 1: (0; +∞))', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, mode } = params;
      if (a <= 0 || b <= 0) return { valid: false, reason: 'Cần a > 0 và b > 0' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, mode } = params;
      const prod = a * b;
      // Simplify 2 * sqrt(a * b)
      let outer = 1;
      let inner = prod;
      for (let d = 2; d * d <= inner; d++) {
        while (inner % (d * d) === 0) {
          outer *= d;
          inner /= d * d;
        }
      }
      const magCoef = 2 * outer;
      const fmtRad = (coef, rad) => {
        if (rad === 1) return '' + coef;
        if (coef === 1) return '\\sqrt{' + rad + '}';
        if (coef === -1) return '-\\sqrt{' + rad + '}';
        return coef + '\\sqrt{' + rad + '}';
      };
      const posAns = fmtRad(magCoef, inner);
      const negAns = fmtRad(-magCoef, inner);
      const isPosSide = mode === 1;
      const askWord = isPosSide ? 'Giá trị nhỏ nhất' : 'Giá trị lớn nhất';
      const domainLabel = isPosSide ? '(0;\\, +\\infty)' : '(-\\infty;\\, 0)';
      const correct = '$' + (isPosSide ? posAns : negAns) + '$';

      // Root magnitude: sqrt(b/a) = sqrt(a*b)/a = (outer/a)*sqrt(inner)
      const rFrac = u.simplifyFrac(outer, a);
      const fmtCrit = (sign) => {
        if (inner === 1) return u.simplifyFrac(sign * outer, a).latex;
        const absN = Math.abs(rFrac.num);
        const s = sign < 0 ? '-' : '';
        if (rFrac.den === 1) return s + (absN === 1 ? '' : absN) + '\\sqrt{' + inner + '}';
        return s + '\\dfrac{' + (absN === 1 ? '' : absN) + '\\sqrt{' + inner + '}}{' + rFrac.den + '}';
      };
      const xNegStr = fmtCrit(-1);
      const xPosStr = fmtCrit(1);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + (isPosSide ? negAns : posAns) + '$',
          '$2 + ' + posAns + '$',
          '$' + negAns + ' - 2$',
          '$' + fmtRad(magCoef + 2, inner) + '$',
        ],
        rng,
        (k) => '$' + fmtRad((isPosSide ? magCoef : -magCoef) + k * 2, inner) + '$'
      );

      return {
        stem:
          askWord +
          ' của hàm số $y = ' +
          u.formatTerm(a, 'x', true) +
          ' + \\dfrac{' +
          b +
          '}{x}$ trên khoảng $' +
          domainLabel +
          '$ bằng:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập xác định: $D = \\mathbb{R} \\setminus \\{0\\}$. Đạo hàm $y\' = ' + a + ' - \\dfrac{' + b + '}{x^2} = \\dfrac{' + a + 'x^2 - ' + b + '}{x^2}$.',
          'Giải $y\' = 0 \\Leftrightarrow x = ' + xNegStr + '$ hoặc $x = ' + xPosStr + '$.',
          'Từ bảng biến thiên, hàm số đạt ' + askWord.toLowerCase() + ' trên $' + domainLabel + '$ tại $x = ' + (isPosSide ? xPosStr : xNegStr) + '$ và bằng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc y = 8x + 7/x trên (-infty; 0)', params: { a: 8, b: 7, mode: 0 }, expectedValid: true },
      { label: 'Biên chính phương ab = 9 (2x + 4/x? 1*9)', params: { a: 1, b: 9, mode: 1 }, expectedValid: true },
      { label: 'Biên lỗi a = 0', params: { a: 0, b: 7, mode: 0 }, expectedValid: false },
    ],
  },

  // Dạng 10 [MC - Hiểu]: GTLN / GTNN của hàm phân thức (x^2 + bx + c)/(x - x0) trên khoảng (-∞; u)
  t12_b2_d10_rat21_unbounded_maxmin_mc: {
    id: 't12_b2_d10_rat21_unbounded_maxmin_mc',
    name: 'Dạng 10: Tìm GTLN / GTNN của hàm phân thức bậc 2/bậc 1 trên khoảng vô hạn',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Phân thức trên khoảng vô hạn',
    description:
      'Cho hàm số y = (x^2 + bx + c)/(x - x0) có cực đại tại x1 = x0 - k và cực tiểu tại x2 = x0 + k. Tìm GTLN trên (-∞; u) (với x1 < u < x0).',
    conditionSummary: 'k >= 2 để hai cực trị cách xa tiệm cận đứng x0',
    paramSpecs: [
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -4, max: 6 },
      { name: 'k', label: 'Bán kính cực trị k', min: 2, max: 5 },
      { name: 'b', label: 'Hệ số b của tử thức', min: -8, max: 6 },
    ],
    validateCode: `
      if (params.k < 2) return { valid: false, reason: 'Cần k >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, k, b } = params;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const c = k * k - x0 * x0 - b * x0;
      const uBound = u.simplifyFrac(2 * x0 - k, 2); // midpoint between x1 and x0
      const y1 = 2 * x1 + b;
      const y2 = 2 * x2 + b;
      const numExpr = u.formatQuadratic(1, b, c);
      const denExpr = u.formatShift('x', -x0);
      const derivNum = u.formatQuadratic(1, -2 * x0, x0 * x0 - k * k);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + y1 + '$',
        ['$' + y2 + '$', '$' + (y1 - 3) + '$', '$' + (y2 + 2) + '$', '$' + (y1 + 4) + '$'],
        rng,
        (j) => '$' + (y1 + j * 3) + '$'
      );

      return {
        stem:
          'Giá trị lớn nhất của hàm số $y = \\dfrac{' +
          numExpr +
          '}{' +
          denExpr +
          '}$ trên khoảng $\\left(-\\infty;\\, ' +
          uBound.latex +
          '\\right)$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + y1 + '$',
        solutionSteps: [
          'Tập xác định: $D = \\mathbb{R} \\setminus \\{' + x0 + '\\}$. Đạo hàm $y\' = \\dfrac{' + derivNum + '}{(' + denExpr + ')^2} = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Trên khoảng $(-\\infty;\\, ' + x1 + ')$ có $y\' > 0$, trên $(' + x1 + ';\\, ' + uBound.latex + ')$ có $y\' < 0$.',
          'Vậy $\\max_{(-\\infty;\\, ' + uBound.latex + ')} y = y(' + x1 + ') = ' + y1 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (x^2 - 5x + 9)/(x - 5) trên (-infty; 7/2)', params: { x0: 5, k: 3, b: -5 }, expectedValid: true },
      { label: 'Biên lỗi k = 1', params: { x0: 5, k: 1, b: -5 }, expectedValid: false },
    ],
  },

  // Dạng 11 [MC - Hiểu]: GTLN / GTNN của hàm y = √(b - x) + √(x - a)
  t12_b2_d11_sum_two_radicals_mc: {
    id: 't12_b2_d11_sum_two_radicals_mc',
    name: 'Dạng 11: Tìm giá trị lớn nhất, nhỏ nhất của hàm y = √(b - x) + √(x - a)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Hàm chứa căn thức',
    description: 'Cho hàm số y = √(b - x) + √(x - a) trên tập xác định [a; b]. Tìm GTLN hoặc GTNN.',
    conditionSummary: 'b - a >= 2 để khoảng xác định đủ rộng và GTLN, GTNN khác nhau rõ rệt',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút trái a', min: -6, max: 6 },
      { name: 'span', label: 'Độ dài đoạn b - a', min: 2, max: 12 },
      { name: 'askMax', label: 'Tìm (1: GTLN, 0: GTNN)', min: 0, max: 1 },
    ],
    validateCode: `
      if (params.span < 2) return { valid: false, reason: 'Cần b - a >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, span, askMax } = params;
      const b = a + span;
      const mid = u.simplifyFrac(a + b, 2);
      const simplifyRad = (n) => {
        let out = 1;
        let rem = n;
        for (let d = 2; d * d <= rem; d++) {
          while (rem % (d * d) === 0) {
            out *= d;
            rem /= d * d;
          }
        }
        if (rem === 1) return '' + out;
        return (out === 1 ? '' : out + ' ') + '\\sqrt{' + rem + '}';
      };
      const maxStr = simplifyRad(2 * span);
      const minStr = simplifyRad(span);
      const targetStr = askMax === 1 ? maxStr : minStr;
      const otherStr = askMax === 1 ? minStr : maxStr;
      const askWord = askMax === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';
      const rightExpr = u.formatShift('x', -a);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + targetStr + '$',
        ['$' + otherStr + '$', '$2 + ' + maxStr + '$', '$' + simplifyRad(span + 1) + '$', '$1$'],
        rng,
        (k) => '$' + (k + 1) + ' + ' + targetStr + '$'
      );

      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = \\sqrt{' +
          b +
          ' - x} + \\sqrt{' +
          rightExpr +
          '}$.',
        options,
        correctIndex,
        answerSummary: '$' + targetStr + '$',
        solutionSteps: [
          'Tập xác định: $D = [' + a + ';\\, ' + b + ']$.',
          'Đạo hàm $y\' = \\dfrac{1}{2\\sqrt{' + rightExpr + '}} - \\dfrac{1}{2\\sqrt{' + b + ' - x}} = 0 \\Leftrightarrow x = ' + mid.latex + '$.',
          'Tính giá trị: $f(' + a + ') = f(' + b + ') = ' + minStr + ',\\; f\\left(' + mid.latex + '\\right) = ' + maxStr + '$.',
          'Vậy ' + askWord + ' của hàm số trên đoạn $[' + a + ';\\, ' + b + ']$ bằng $' + targetStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc √(8 - x) + √(x - 4)', params: { a: 4, span: 4, askMax: 1 }, expectedValid: true },
      { label: 'Biên lỗi span = 1', params: { a: 4, span: 1, askMax: 1 }, expectedValid: false },
    ],
  },

  // Dạng 12 [MC - Hiểu]: GTLN / GTNN của hàm y = k*x*√(R^2 - x^2)
  t12_b2_d12_x_sqrt_r2_x2_mc: {
    id: 't12_b2_d12_x_sqrt_r2_x2_mc',
    name: 'Dạng 12: Tìm giá trị lớn nhất, nhỏ nhất của hàm y = kx√(R² - x²)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'GTLN & GTNN — Hàm căn thức trên đoạn [-R; R]',
    description: 'Cho hàm số y = kx√(R^2 - x^2) trên tập xác định [-R; R] (R chẵn). Tìm GTNN hoặc GTLN.',
    conditionSummary: 'k >= 1, R >= 2 chẵn để k*R^2/2 là số nguyên đẹp',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 1, max: 5 },
      { name: 'halfR', label: 'Nửa bán kính R/2', min: 1, max: 6 },
      { name: 'askMax', label: 'Tìm (0: GTNN, 1: GTLN)', min: 0, max: 1 },
    ],
    validateCode: `
      const { k, halfR } = params;
      if (k < 1) return { valid: false, reason: 'k phải >= 1' };
      if (halfR < 1) return { valid: false, reason: 'R = 2*halfR phải >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, halfR, askMax } = params;
      const R = 2 * halfR;
      const R2 = R * R;
      const halfMag = (k * R2) / 2;
      const target = askMax === 1 ? halfMag : -halfMag;
      const other = -target;
      const askWord = askMax === 1 ? 'giá trị lớn nhất' : 'giá trị nhỏ nhất';
      const kx = k === 1 ? 'x' : k + 'x';
      const critMag = (halfR === 1 ? '' : halfR) + '\\sqrt{2}';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + target + '$',
        ['$' + other + '$', '$' + (target - 3) + '$', '$' + (other + 2) + '$', '$0$'],
        rng,
        (j) => '$' + (target + j * 5) + '$'
      );

      return {
        stem:
          'Tìm ' +
          askWord +
          ' của hàm số $y = ' +
          kx +
          '\\sqrt{' +
          R2 +
          ' - x^2}$.',
        options,
        correctIndex,
        answerSummary: '$' + target + '$',
        solutionSteps: [
          'Tập xác định: $D = [-' + R + ';\\, ' + R + ']$.',
          'Đạo hàm $y\' = \\dfrac{' + k * R2 + ' - ' + 2 * k + 'x^2}{\\sqrt{' + R2 + ' - x^2}} = 0 \\Leftrightarrow x = -' + critMag + '$ hoặc $x = ' + critMag + '$.',
          'Tính các giá trị: $f(-' + R + ') = f(' + R + ') = 0,\\; f(-' + critMag + ') = -' + halfMag + ',\\; f(' + critMag + ') = ' + halfMag + '$.',
          'Vậy ' + askWord + ' của hàm số bằng $' + target + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc 3x√(100 - x^2)', params: { k: 3, halfR: 5, askMax: 0 }, expectedValid: true },
      { label: 'Biên lỗi k = 0', params: { k: 0, halfR: 5, askMax: 0 }, expectedValid: false },
    ],
  },
};
