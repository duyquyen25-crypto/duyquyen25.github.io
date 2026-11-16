import { MathTemplate } from '../types/math';

export const G12_B13_TF_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 13. ỨNG DỤNG HÌNH HỌC CỦA TÍCH PHÂN — PHẦN II: 18 DẠNG ĐÚNG/SAI (D27..D44)
  // =====================================================================

  // Dạng 27 (Q27): Tổng hợp diện tích hình phẳng và tam giác cong (có hình)
  t12_b13_d27_area_curved_triangle_tf: {
    id: 't12_b13_d27_area_curved_triangle_tf',
    name: 'Tổng hợp tính diện tích hình phẳng và tam giác cong (có hình)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Diện tích hình phẳng',
    description: 'Đánh giá 4 mệnh đề về công thức diện tích, diện tích đường thẳng qua Ox, parabol cắt đường thẳng và tam giác cong.',
    conditionSummary: 'p >= 2, xv >= 1, d1 >= 2, d2 >= 1',
    paramSpecs: [
      { name: 'p', label: 'Mốc đối xứng p (ý b)', min: 2, max: 4 },
      { name: 'm', label: 'Hệ số m (ý b)', min: 1, max: 3 },
      { name: 'xv', label: 'Đỉnh parabol xv (ý d)', min: 1, max: 2 },
      { name: 'd1', label: 'Khoảng xm - xv', min: 2, max: 3 },
      { name: 'd2', label: 'Khoảng xr - xm', min: 1, max: 2 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { p, m, xv, d1, d2 } = params;
      if (p < 2 || m < 1 || xv < 1 || d1 < 2 || d2 < 1) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, m, xv, d1, d2, mode } = params;
      const aA = -p - 3, bA = -p - 2;
      // Ý a: S = ∫ |g(x)|dx vs |∫ g(x)dx|
      const aTrue = mode === 1;
      const stmtA = aTrue
        ? 'Hình phẳng giới hạn bởi các đường $y=g(x),\\, x=' + aA + ',\\, x=' + bA + ',\\, y=0$ có diện tích xác định bởi công thức $S=\\int \\limits_{' + aA + '}^{' + bA + '}|g(x)|\\mathrm{\\,d}x$.'
        : 'Hình phẳng giới hạn bởi các đường $y=g(x),\\, x=' + aA + ',\\, x=' + bA + ',\\, y=0$ có diện tích xác định bởi công thức $S=\\left|\\int \\limits_{' + aA + '}^{' + bA + '}g(x)\\mathrm{\\,d}x\\right|$.';

      // Ý b: y = m - mx trên [-p; p] -> S = m(p^2 + 1)
      const linB = u.formatLinear(-m, m);
      const areaB = m * (p * p + 1);
      const shownB = mode === 3 ? areaB + 2 : areaB;
      const bTrue = shownB === areaB;
      const stmtB = 'Hình phẳng giới hạn bởi các đường $y=' + linB + ',\\, x=-' + p + ',\\, x=' + p + ',\\, y=0$ có diện tích bằng $' + shownB + '$.';

      // Ý c: 3(x + 3)(x + 1) = 3x^2 + 12x + 9, tách thành 3x^2+14x+4 và 2x-5
      const kC = 3, r1 = -3, r2 = -1;
      const lineC = u.formatLinear(2, -5);
      const quadC = u.formatQuadratic(kC, 14, 4);
      const exactC = Math.abs(kC) * Math.pow(r2 - r1, 3) / 6; // = 4
      const shownC = mode === 2 ? exactC + 3 : exactC;
      const cTrue = shownC === exactC;
      const stmtC = 'Diện tích của hình phẳng giới hạn bởi đường thẳng $y=' + lineC + '$ và đồ thị hàm số $y=' + quadC + '$ bằng $' + shownC + '$.';

      // Ý d: Tam giác cong y=(x-xv)^2, y=slope*(xr-x), y=0
      const xm = xv + d1;
      const xr = xm + d2;
      const ym = d1 * d1;
      const frSlope = u.simplifyFrac(ym, d2);
      const slopeTex = frSlope.den === 1 ? '' + frSlope.num : '\\frac{' + frSlope.num + '}{' + frSlope.den + '}';
      const lineDConstFr = u.simplifyFrac(ym * xr, d2);
      const lineDConstTex = lineDConstFr.den === 1 ? '' + lineDConstFr.num : '\\frac{' + lineDConstFr.num + '}{' + lineDConstFr.den + '}';
      const lineDTex = lineDConstTex + ' - ' + (frSlope.num === 1 && frSlope.den === 1 ? 'x' : slopeTex + 'x');
      const paraD = u.formatQuadratic(1, -2 * xv, xv * xv);
      const numAreaD = 2 * Math.pow(d1, 3) + 3 * ym * d2;
      const frAreaD = u.simplifyFrac(numAreaD, 6);
      const exactDTex = frAreaD.den === 1 ? '' + frAreaD.num : '\\frac{' + frAreaD.num + '}{' + frAreaD.den + '}';
      const wrongFrD = u.simplifyFrac(numAreaD + 6, 6);
      const wrongDTex = wrongFrD.den === 1 ? '' + wrongFrD.num : '\\frac{' + wrongFrD.num + '}{' + wrongFrD.den + '}';
      const dTrue = mode === 2 || mode === 3;
      const shownDTex = dTrue ? exactDTex : wrongDTex;
      const stmtD = 'Gọi tam giác cong là hình phẳng giới hạn bởi đồ thị các hàm số $y=' + lineDTex + '$, $y=' + paraD + '$ và $y=0$ (phần gạch chéo trong hình vẽ). Diện tích của tam giác cong đã cho bằng $' + shownDTex + '$.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        {
          key: 'd',
          text: stmtD,
          isTrue: dTrue,
          diagram: {
            kind: 'geometry_figure',
            figureType: 'l13_curved_triangle',
            params: { xv, xm, xr, ym },
          },
        },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Công thức chuẩn là $S = \\int \\limits_{' + aA + '}^{' + bA + '}|g(x)|\\mathrm{\\,d}x$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. Ta có $S = \\int \\limits_{-' + p + '}^{' + p + '} |' + linB + '|\\mathrm{\\,d}x = ' + areaB + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Hai đồ thị cắt nhau tại $x=-3, x=-1$ nên $S = \\int \\limits_{-3}^{-1}|3x^2+12x+9|\\mathrm{\\,d}x = ' + exactC + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Giao điểm giữa parabol và đường thẳng có hoành độ $x=' + xm + '$, suy ra $S = \\int \\limits_{' + xv + '}^{' + xm + '} (' + paraD + ')\\mathrm{\\,d}x + \\int \\limits_{' + xm + '}^{' + xr + '} (' + lineDTex + ')\\mathrm{\\,d}x = ' + exactDTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p < 2', params: { p: 1, m: 2, xv: 1, d1: 3, d2: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27', params: { p: 2, m: 2, xv: 1, d1: 3, d2: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 28 (Q28): Tổng hợp thể tích tròn xoay và tam giác cong qua O (có hình)
  t12_b13_d28_volume_curved_triangle_tf: {
    id: 't12_b13_d28_volume_curved_triangle_tf',
    name: 'Tổng hợp công thức thể tích tròn xoay, diện tích và tam giác cong (có hình)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Diện tích & Thể tích tròn xoay',
    description: 'Xét 4 mệnh đề về công thức V tròn xoay, thể tích hình trụ, diện tích parabol-đường thẳng và tam giác cong.',
    conditionSummary: 'h >= 1, xm >= 2, d2 >= 2',
    paramSpecs: [
      { name: 'h', label: 'Chiều cao y = h (ý b)', min: 1, max: 3 },
      { name: 'L', label: 'Độ dài đoạn [0; L] (ý b)', min: 1, max: 4 },
      { name: 'xm', label: 'Hoành độ giao điểm xm (ý d)', min: 2, max: 3 },
      { name: 'd2', label: 'Khoảng xr - xm (ý d)', min: 2, max: 3 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.h < 1 || params.L < 1 || params.xm < 2 || params.d2 < 2) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h, L, xm, d2, mode } = params;
      const aTrue = mode === 2;
      const stmtA = aTrue
        ? 'Thể tích của vật thể tròn xoay được tạo thành khi quay hình phẳng giới hạn bởi các đường $y=f(x),\\, x=-2,\\, x=1,\\, y=0$ quanh trục $Ox$ có công thức là $V=\\pi\\int \\limits_{-2}^{1}[f(x)]^2\\mathrm{\\,d}x$.'
        : 'Thể tích của vật thể tròn xoay được tạo thành khi quay hình phẳng giới hạn bởi các đường $y=f(x),\\, x=-2,\\, x=1,\\, y=0$ quanh trục $Ox$ có công thức là $V=\\int \\limits_{-2}^{1}[f(x)]^2\\mathrm{\\,d}x$.';

      const exactB = h * h * L;
      const bVal = mode === 3 ? exactB + 2 : exactB;
      const bTrue = bVal === exactB;
      const stmtB = 'Quay hình phẳng giới hạn bởi các đường $y=' + h + ',\\, x=0,\\, x=' + L + ',\\, y=0$ quanh trục $Ox$ tạo thành vật thể tròn xoay có thể tích bằng $' + (bVal === 1 ? '\\pi' : bVal + '\\pi') + '$.';

      // Ý c: y = -4x - 3 và y = 3x^2 - 4x - 6 cắt tại ±1 => S = 4
      const exactC = 4;
      const cVal = mode === 1 ? exactC : exactC + 1;
      const cTrue = cVal === exactC;
      const stmtC = 'Diện tích của hình phẳng giới hạn bởi đường thẳng $y=-4x - 3$ và đồ thị hàm số $y=3x^{2} - 4x - 6$ bằng $' + cVal + '$.';

      // Ý d: y = x^2 và y = slope*(xr - x), xv = 0
      const xr = xm + d2;
      const ym = xm * xm;
      const slFr = u.simplifyFrac(ym, d2);
      const slTex = slFr.den === 1 ? (slFr.num === 1 ? '' : '' + slFr.num) : '\\frac{' + slFr.num + '}{' + slFr.den + '}';
      const cDFr = u.simplifyFrac(ym * xr, d2);
      const cDTex = cDFr.den === 1 ? '' + cDFr.num : '\\frac{' + cDFr.num + '}{' + cDFr.den + '}';
      const lineDTex = cDTex + ' - ' + slTex + 'x';
      const numD = 2 * Math.pow(xm, 3) + 3 * ym * d2;
      const frD = u.simplifyFrac(numD, 6);
      const exactDTex = frD.den === 1 ? '' + frD.num : '\\frac{' + frD.num + '}{' + frD.den + '}';
      const wrongFrD = u.simplifyFrac(numD + 6, 6);
      const wrongDTex = wrongFrD.den === 1 ? '' + wrongFrD.num : '\\frac{' + wrongFrD.num + '}{' + wrongFrD.den + '}';
      const dTrue = mode === 1 || mode === 3;
      const shownDTex = dTrue ? exactDTex : wrongDTex;
      const stmtD = 'Gọi tam giác cong là hình phẳng giới hạn bởi đồ thị các hàm số $y=' + lineDTex + '$, $y=x^{2}$ và $y=0$. Diện tích của tam giác cong đã cho bằng $' + shownDTex + '$.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        {
          key: 'd',
          text: stmtD,
          isTrue: dTrue,
          diagram: {
            kind: 'geometry_figure',
            figureType: 'l13_curved_triangle',
            params: { xv: 0, xm, xr, ym },
          },
        },
      ];
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Công thức thể tích tròn xoay quanh trục $Ox$ luôn có hệ số $\\pi$: $V=\\pi\\int \\limits_{-2}^{1}[f(x)]^2\\mathrm{\\,d}x$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $V = \\pi\\int \\limits_{0}^{' + L + '} ' + (h * h) + '\\mathrm{\\,d}x = ' + (exactB === 1 ? '\\pi' : exactB + '\\pi') + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Hai đồ thị cắt nhau tại $x=-1, x=1$ nên $S = \\int \\limits_{-1}^{1}|3x^2 - 3|\\mathrm{\\,d}x = 4$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Hai đồ thị cắt nhau tại $x=' + xm + '$ nên $S = \\int \\limits_{0}^{' + xm + '} x^2\\mathrm{\\,d}x + \\int \\limits_{' + xm + '}^{' + xr + '} (' + lineDTex + ')\\mathrm{\\,d}x = ' + exactDTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xm < 2', params: { h: 1, L: 1, xm: 1, d2: 2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28', params: { h: 1, L: 1, xm: 2, d2: 2, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 29 (Q29): Hình phẳng (H) giới hạn bởi f(x) >= g(x) >= 0 trên [0; b] (có hình)
  t12_b13_d29_two_curves_H_tf: {
    id: 't12_b13_d29_two_curves_H_tf',
    name: 'Công thức diện tích và thể tích hình phẳng (H) từ đồ thị',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Diện tích & Thể tích qua đồ thị',
    description: 'Nhận diện công thức diện tích và thể tích tròn xoay của miền f(x) >= g(x) >= 0 trên [0; b].',
    conditionSummary: 'b nguyên dương từ 2 đến 5',
    paramSpecs: [
      { name: 'b', label: 'Cận trên b', min: 2, max: 5 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.b < 2 || params.b > 5) return { valid: false, reason: 'Cần 2 <= b <= 5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, mode } = params;
      const aTrue = mode !== 1;
      const bTrue = mode !== 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 0 || mode === 1;
      const tfStatements = [
        {
          key: 'a',
          text: aTrue
            ? 'Diện tích hình phẳng giới hạn bởi đồ thị hàm số $y=f(x)$, trục hoành và hai đường thẳng $x=0$, $x=' + b + '$ là $S=\\displaystyle\\int_0^{' + b + '} f(x)\\mathrm{\\,d}x$.'
            : 'Diện tích hình phẳng giới hạn bởi đồ thị hàm số $y=f(x)$, trục hoành và hai đường thẳng $x=0$, $x=' + b + '$ là $S=\\pi\\displaystyle\\int_0^{' + b + '} f(x)\\mathrm{\\,d}x$.',
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: bTrue
            ? 'Thể tích vật thể tròn xoay tạo thành khi quay hình phẳng giới hạn bởi đồ thị hàm số $y=f(x)$, trục hoành và hai đường thẳng $x=0$, $x=' + b + '$ quanh trục hoành là $V=\\pi\\displaystyle\\int_0^{' + b + '} f^2(x)\\mathrm{\\,d}x$.'
            : 'Thể tích vật thể tròn xoay tạo thành khi quay hình phẳng giới hạn bởi đồ thị hàm số $y=f(x)$, trục hoành và hai đường thẳng $x=0$, $x=' + b + '$ quanh trục hoành là $V=\\displaystyle\\int_0^{' + b + '} f^2(x)\\mathrm{\\,d}x$.',
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: cTrue
            ? 'Diện tích hình phẳng $(H)$ là $S=\\displaystyle\\int_0^{' + b + '} \\left[f(x)-g(x)\\right]\\mathrm{\\,d}x$.'
            : 'Diện tích hình phẳng $(H)$ là $S=\\displaystyle\\int_0^{' + b + '} \\left[f(x)+g(x)\\right]\\mathrm{\\,d}x$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: dTrue
            ? 'Thể tích vật thể tròn xoay tạo thành khi quay $(H)$ quanh trục $Ox$ là $V=\\pi\\displaystyle\\int_0^{' + b + '} \\left[f^2(x)-g^2(x)\\right]\\mathrm{\\,d}x$.'
            : 'Thể tích vật thể tròn xoay tạo thành khi quay $(H)$ quanh trục $Ox$ là $V=\\pi\\displaystyle\\int_0^{' + b + '} \\left[f(x)-g(x)\\right]^2\\mathrm{\\,d}x$.',
          isTrue: dTrue,
        },
      ];
      return {
        stem: 'Cho các hàm số $y=f(x)$, $y=g(x)$ liên tục trên đoạn $[0;' + b + ']$ và có đồ thị như hình bên. Hình phẳng $(H)$ giới hạn bởi đồ thị các hàm số $y=f(x)$, $y=g(x)$ và hai đường thẳng $x=0$, $x=' + b + '$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_two_curves_H',
          params: { b },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Vì $f(x) \\ge 0$ trên $[0;' + b + ']$ nên $S = \\int_0^{' + b + '} f(x)\\mathrm{\\,d}x$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. Theo công thức thể tích tròn xoay quanh $Ox$, $V = \\pi\\int_0^{' + b + '} f^2(x)\\mathrm{\\,d}x$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Vì $f(x) \\ge g(x)$ trên $[0;' + b + ']$ nên $S = \\int_0^{' + b + '} [f(x)-g(x)]\\mathrm{\\,d}x$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Vì $f(x) \\ge g(x) \\ge 0$ trên $[0;' + b + ']$ nên $V = \\pi\\int_0^{' + b + '} [f^2(x)-g^2(x)]\\mathrm{\\,d}x$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 1', params: { b: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 [0; 2]', params: { b: 2, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 30 (Q30): Chia diện tích miền y = e^x trên [a; b] bằng đường x = k — đã sửa erratum ý d!
  t12_b13_d30_exp_split_area_tf: {
    id: 't12_b13_d30_exp_split_area_tf',
    name: 'Chia diện tích hình phẳng y = e^x bởi đường thẳng x = k',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Diện tích & Thể tích hàm mũ',
    description: 'Tính S, V của y=e^x trên [a; a+1] và tìm k ∈ (a; a+1) để S2 = m*S1.',
    conditionSummary: 'a ∈ [-6; 2], m ∈ {1, 2, 3}',
    paramSpecs: [
      { name: 'a', label: 'Cận dưới a', min: -5, max: 1 },
      { name: 'm', label: 'Tỉ số S2/S1 = m', min: 1, max: 3 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.m < 1 || params.m > 3) return { valid: false, reason: 'Cần 1 <= m <= 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, m, mode } = params;
      const b = a + 1;
      const fmtExp = (n) => (n === 0 ? '1' : n === 1 ? 'e' : n > 1 ? 'e^{' + n + '}' : '\\frac{1}{e^{' + (-n) + '}}');
      const sTex = '-' + fmtExp(a) + ' + ' + fmtExp(b);
      const aTrue = mode !== 2;
      const stmtA = aTrue ? '$S=' + sTex + '$' : '$S=' + fmtExp(a) + ' + ' + fmtExp(b) + '$';

      const vExactTex = '\\pi\\left(-\\frac{1}{2}' + fmtExp(2 * a) + ' + \\frac{1}{2}' + fmtExp(2 * b) + '\\right)';
      const bTrue = mode === 2;
      const stmtB = bTrue ? '$V=' + vExactTex + '$' : '$V=\\pi\\left(' + sTex + '\\right)$';

      const cTrue = mode !== 3;
      const stmtC = cTrue ? '$S=S_1+S_2$' : '$S=S_1-S_2$';

      // S2 = m S1 => e^b - e^k = m(e^k - e^a) => e^k = (e^{a+1} + m e^a)/(m+1) => k = a - ln(m+1) + ln(m+e)
      const exactK = a + ' - \\ln(' + (m + 1) + ') + \\ln(' + m + ' + e)';
      const wrongK = b + ' - \\ln(' + (m + 1) + ') + \\ln(' + m + ' + e)';
      const dTrue = mode !== 1;
      const stmtD = 'Với $k=' + (dTrue ? exactK : wrongK) + '$ thì $S_2=' + (m === 1 ? '' : m) + 'S_1$.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Gọi $S_1$ là diện tích hình phẳng giới hạn bởi các đường $y=e^x,\\, x=' + a + ',\\, x=k,\\, y=0$. Gọi $S_2$ là diện tích hình phẳng giới hạn bởi các đường $y=e^x,\\, x=k,\\, x=' + b + ',\\, y=0$. Gọi $S$ là diện tích hình phẳng giới hạn bởi $y=e^x,\\, x=' + a + ',\\, x=' + b + ',\\, y=0$ và $V$ là thể tích khối tròn xoay khi quay $S$ quanh trục $Ox$. Biết $' + a + ' < k < ' + b + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $S = \\int \\limits_{' + a + '}^{' + b + '} e^x\\mathrm{\\,d}x = ' + sTex + '$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $V = \\pi\\int \\limits_{' + a + '}^{' + b + '} e^{2x}\\mathrm{\\,d}x = ' + vExactTex + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Do $' + a + '<k<' + b + '$ nên $S = S_1 + S_2$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. $S_2=' + (m === 1 ? '' : m) + 'S_1 \\Leftrightarrow e^{' + b + '}-e^k = ' + (m === 1 ? '' : m) + '(e^k - e^{' + a + '}) \\Leftrightarrow e^k = e^{' + a + '}\\frac{' + m + '+e}{' + (m + 1) + '} \\Leftrightarrow k = ' + exactK + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { a: -4, m: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 [-4; -3], m=1', params: { a: -4, m: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 31 (Q31): Bể chứa nước hình chóp cụt tứ giác đều (có hình)
  t12_b13_d31_frustum_tank_tf: {
    id: 't12_b13_d31_frustum_tank_tf',
    name: 'Bài toán bơm nước vào bể hình chóp cụt tứ giác đều (có hình)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Thiết lập V(h) = ∫_0^h S(x)dx cho hình chóp cụt vuông, tính tốc độ dâng h\'(t) = Q/S(h) và tỉ lệ thời gian.',
    conditionSummary: '0 < a < b = a + step, H = 4 hoặc 6 chẵn, Q ∈ {1, 2}',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy dưới a (m)', min: 2, max: 4 },
      { name: 'db', label: 'Hiệu b - a (chia hết H)', min: 2, max: 4, step: 2 },
      { name: 'H', label: 'Chiều cao bể H (m)', min: 4, max: 6, step: 2 },
      { name: 'Q', label: 'Lưu lượng bơm Q (m^3/phút)', min: 1, max: 2 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, db, H, Q } = params;
      if (a < 2 || db < 2 || (H !== 4 && H !== 6) || Q < 1) return { valid: false, reason: 'Cần a>=2, db chẵn, H∈{4,6}, Q>=1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, db, H, Q, mode } = params;
      const b = a + db;
      // x(h) = a + alpha*h, alpha = db/H
      const al = u.simplifyFrac(db, H);
      const alTex = al.den === 1 ? (al.num === 1 ? '' : '' + al.num) : '\\frac{' + al.num + '}{' + al.den + '}';
      const c1 = a * a;
      const c2Fr = u.simplifyFrac(a * db, H);
      const c2Tex = c2Fr.den === 1 ? (c2Fr.num === 1 ? '' : '' + c2Fr.num) : '\\frac{' + c2Fr.num + '}{' + c2Fr.den + '}';
      const c3Fr = u.simplifyFrac(db * db, 3 * H * H);
      const c3Tex = c3Fr.den === 1 ? (c3Fr.num === 1 ? '' : '' + c3Fr.num) : '\\frac{' + c3Fr.num + '}{' + c3Fr.den + '}';
      const vExactTex = c1 + 'h+' + c2Tex + 'h^2+' + c3Tex + 'h^3';
      const vWrongTex = c1 + 'h+' + c2Tex + 'h^2+' + (c3Fr.num + 1) + 'h^3';
      const aTrue = mode !== 2;
      const stmtA = 'Thể tích nước $V\\,(\\mathrm{m^3})$ trong bể khi mực nước đạt chiều cao $h\\,(\\mathrm{m})$ được xác định bởi biểu thức $V(h)=' + (aTrue ? vExactTex : vWrongTex) + '$ với $0\\le h\\le ' + H + '$.';

      const hMid = H / 2;
      const sideMid = a + db / 2;
      const sMid = sideMid * sideMid;
      const dhCmExact = (Q * 100) / sMid; // cm/phút
      const dhCmRound = Math.round(dhCmExact * 100) / 100;
      const dhCmWrong = Math.round((dhCmExact - 2.25) * 100) / 100;
      const bTrue = mode === 2;
      const shownDh = bTrue ? u.formatNumberVN(dhCmRound) : u.formatNumberVN(Math.max(0.5, dhCmWrong));
      const stmtB = 'Tại thời điểm mực nước trong bể đạt độ sâu $h=' + hMid + '\\,\\mathrm{m}$ (đúng bằng một nửa chiều cao của bể), tốc độ dâng của mực nước bằng khoảng $' + shownDh + '$ cm/phút (làm tròn kết quả đến hàng phần trăm).';

      const cTrue = mode === 3;
      const stmtC = 'Trong suốt quá trình bơm nước từ đáy cho đến khi bể đầy, tốc độ dâng mực nước $h\'(t)$ là một hàm số ' + (cTrue ? 'nghịch biến' : 'đồng biến') + ' theo thời gian $t$.';

      // V(h) = H_val/3 * (a^2 + a*x + x^2)
      const vHalf = (hMid / 3) * (a * a + a * sideMid + sideMid * sideMid);
      const vFull = (H / 3) * (a * a + a * b + b * b);
      const pct = (vHalf / vFull) * 100;
      const pctUpper = Math.ceil(pct) + 1; // e.g., 37.76 -> 39
      const dTrue = mode !== 1;
      const stmtD = dTrue
        ? 'Thời gian cần thiết để bơm nước từ đáy bể đến khi mực nước đạt độ sâu $h=' + hMid + '\\,\\mathrm{m}$ chiếm chưa đến $' + pctUpper + '\\%$ tổng thời gian để bơm đầy hoàn toàn bể nước.'
        : 'Thời gian cần thiết để bơm nước từ đáy bể đến khi mực nước đạt độ sâu $h=' + hMid + '\\,\\mathrm{m}$ chiếm hơn $50\\%$ tổng thời gian để bơm đầy hoàn toàn bể nước.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Một bể chứa nước có dạng hình chóp cụt tứ giác đều mở rộng về phía trên. Đáy dưới của bể là hình vuông cạnh $a=' + a + '\\,\\mathrm{m}$, đáy trên là hình vuông cạnh $b=' + b + '\\,\\mathrm{m}$, chiều cao thẳng đứng của bể là $H=' + H + '\\,\\mathrm{m}$. Ban đầu bể hoàn toàn không có nước. Người ta tiến hành bơm nước vào bể từ đáy với tốc độ không đổi $Q=' + Q + '\\,\\mathrm{m^3/phút}$. Gọi $h(t)$ (đơn vị: mét) là chiều cao mực nước trong bể tại thời điểm $t$ (phút) kể từ khi bắt đầu bơm ($0\\le h\\le ' + H + '$). Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_frustum_tank',
          params: { a, b, H, Q },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Cạnh mặt nước $x(h) = ' + a + ' + ' + alTex + 'h$, suy ra $V(h) = \\int \\limits_0^h \\left(' + a + ' + ' + alTex + 'x\\right)^2\\mathrm{\\,d}x = ' + vExactTex + '$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. Tại $h=' + hMid + '\\,\\mathrm{m}$, cạnh mặt nước là $' + sideMid + '\\,\\mathrm{m}$, tốc độ dâng $h\'(t) = \\frac{' + Q + '}{' + sMid + '}\\,\\mathrm{m/phút} \\approx ' + u.formatNumberVN(dhCmRound) + '\\,\\mathrm{cm/phút}$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Vì $S(h(t))$ tăng dần theo $t$ nên $h\'(t)=\\frac{Q}{S(h(t))}$ nghịch biến theo $t$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Tỉ lệ thời gian $\\frac{V(' + hMid + ')}{V(' + H + ')} \\approx ' + u.formatNumberVN(Math.round(pct * 100) / 100) + '\\% < ' + pctUpper + '\\%$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên H lẻ không hợp lệ', params: { a: 3, db: 2, H: 5, Q: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 a=3, b=5, H=4, Q=1', params: { a: 3, db: 2, H: 4, Q: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 32 (Q32): Tốc độ khách tham quan khu di tích K'(t) = -c*t^2 + c*T*t
  t12_b13_d32_visitor_rate_tf: {
    id: 't12_b13_d32_visitor_rate_tf',
    name: 'Bài toán tốc độ khách tham quan từ 0 đến T giờ',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Cho K\'(t) = -ct^2 + cTt, tìm tốc độ cực đại, hàm lượng khách N(t), tỉ lệ khách trong khung giờ và tổng lượng khách cả ngày.',
    conditionSummary: 'c chia hết cho 6 (30, 48, 60), T chẵn (12, 14, 16)',
    paramSpecs: [
      { name: 'cMult', label: 'Hệ số c = 6 * cMult', min: 5, max: 12 },
      { name: 'halfT', label: 'Nửa thời gian T/2', min: 6, max: 8 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.cMult < 5 || params.halfT < 6) return { valid: false, reason: 'Cần cMult >= 5 và halfT >= 6' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { cMult, halfT, mode } = params;
      const c = 6 * cMult;
      const T = 2 * halfT;
      const q = c * T;
      const maxRate = c * halfT * halfT;
      const a3 = c / 3;
      const a2 = q / 2;
      const totalN = a2 * T * T - a3 * Math.pow(T, 3);
      const tL = halfT - 2;
      const tR = halfT + 2;
      const nInterval = (a2 * tR * tR - a3 * Math.pow(tR, 3)) - (a2 * tL * tL - a3 * Math.pow(tL, 3));
      const pctRound = Math.round((nInterval / totalN) * 100);

      const aTrue = mode === 1;
      const stmtA = 'Tốc độ khách đến đông nhất là $' + (aTrue ? maxRate : maxRate - 60) + '$ (người/giờ), lúc $' + halfT + '$ giờ.';

      const bTrue = mode !== 2;
      const stmtB = 'Số lượng khách đến tham quan từ lúc $0$ giờ đến lúc $t$ giờ là $N(t)=-' + (bTrue ? a3 : a3 + 5) + 't^3+' + a2 + 't^2$ (người).';

      const cTrue = mode !== 3;
      const stmtC = 'Lượng khách đến tham quan trong khoảng thời gian từ $' + tL + '$ giờ đến $' + tR + '$ giờ bằng khoảng $' + (cTrue ? pctRound : pctRound + 12) + '\\%$ tổng lượng khách đến tham quan trong cả ngày (làm tròn kết quả đến hàng đơn vị).';

      const dTrue = mode !== 1;
      const stmtD = 'Lượng khách tham quan trong cả ngày là $' + (dTrue ? totalN : totalN + 600) + '$ lượt người.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Vào ngày chính hội, một khu di tích mở cửa đón khách (từ $0$ giờ đến $' + T + '$ giờ). Ban quản lý mô hình hóa tốc độ lượng khách đến tham quan tại thời điểm $t$ giờ $(0\\le t\\le ' + T + ')$ bởi hàm số $K\'(t)=-' + c + 't^2+' + q + 't$ (người/giờ). Biết rằng đúng lúc $0$ giờ chưa có khách nào đến tham quan. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $K\'\'(t)=-' + (2 * c) + 't+' + q + '=0\\Leftrightarrow t=' + halfT + '\\Rightarrow \\max K\'(t)=K\'(' + halfT + ')=' + maxRate + '$ (người/giờ).',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $N(t)=\\int (-' + c + 't^2+' + q + 't)\\mathrm{\\,d}t = -' + a3 + 't^3+' + a2 + 't^2$ (vì $N(0)=0$).',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. $\\int_{' + tL + '}^{' + tR + '} K\'(t)\\mathrm{\\,d}t = ' + nInterval + '$, chiếm $\\frac{' + nInterval + '}{' + totalN + '} \\approx ' + pctRound + '\\%$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Lượng khách cả ngày là $N(' + T + ') = ' + totalN + '$ lượt người.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cMult < 5', params: { cMult: 3, halfT: 8, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 c=60, T=16', params: { cMult: 10, halfT: 8, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 33 (Q33): Chuyển động thẳng với v0 và gia tốc a(t) = p - qt
  t12_b13_d33_motion_decel_quad_v_tf: {
    id: 't12_b13_d33_motion_decel_quad_v_tf',
    name: 'Khảo sát chuyển động thẳng từ vận tốc đầu và gia tốc a(t) = p - qt',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tính gia tốc, hàm vận tốc v(t), vận tốc tại t2 và quãng đường đi được trên [tA; tB].',
    conditionSummary: 'q chẵn >= 4, v(t) > 0 trên [1; tB]',
    paramSpecs: [
      { name: 'v0', label: 'Vận tốc ban đầu v0 (m/s)', min: 60, max: 90, step: 6 },
      { name: 'p', label: 'Hệ số p của gia tốc', min: 12, max: 18, step: 3 },
      { name: 'halfQ', label: 'Nửa hệ số q/2', min: 2, max: 4 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { v0, p, halfQ } = params;
      if (v0 < 50 || p < 9 || halfQ < 2) return { valid: false, reason: 'Tham số không hợp lệ' };
      // Cần v(7) = -halfQ*49 + p*7 + v0 > 0
      if (-halfQ * 49 + p * 7 + v0 <= 0) return { valid: false, reason: 'Cần v(7) > 0 để quãng đường không đổi chiều' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v0, p, halfQ, mode } = params;
      const q = 2 * halfQ;
      const t1 = 7, t2 = 3, tA = 1, tB = 7;
      const aAtT1 = p - q * t1;
      const vFunc = (t) => -halfQ * t * t + p * t + v0;
      const vAtT2 = vFunc(t2);
      // ∫_{1}^{7} (-halfQ*t^2 + p*t + v0) dt: nguyên hàm F(t) = -halfQ*t^3/3 + p*t^2/2 + v0*t (chọn p chia hết 3 hay tính trực tiếp phân số)
      // Lưu ý p là bội 3, tB^3 - tA^3 = 343 - 1 = 342 chia hết cho 3! tB^2 - tA^2 = 48 chia hết cho 2! Do đó quãng đường LUÔN nguyên!
      const dist = -halfQ * ((Math.pow(tB, 3) - Math.pow(tA, 3)) / 3) + p * ((tB * tB - tA * tA) / 2) + v0 * (tB - tA);

      const aTrue = mode === 2;
      const bTrue = mode !== 3;
      const cTrue = mode === 1;
      const dTrue = mode === 3;

      const stmtA = 'Gia tốc của vật tại thời điểm $t=' + t1 + '$ là $' + (aTrue ? aAtT1 : aAtT1 + 2) + '\\mathrm{\\,m/s^2}$.';
      const vExpr = '-' + (halfQ === 1 ? '' : halfQ) + 't^2 + ' + p + 't + ' + (bTrue ? v0 : v0 - 10);
      const stmtB = 'Kể từ khi thay đổi chuyển động, vận tốc của vật tại thời điểm $t$ là $v(t)=' + vExpr + '$.';
      const stmtC = 'Vận tốc của vật tại thời điểm $t=' + t2 + '$ là $' + (cTrue ? vAtT2 : vAtT2 + 2) + '\\mathrm{\\,m/s}$.';
      const stmtD = 'Quãng đường vật đi được trong khoảng thời gian từ $t=' + tA + '$ đến $t=' + tB + '$ là $' + (dTrue ? dist : dist + 3) + '\\,\\mathrm{m}$.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Một vật đang chuyển động thẳng với vận tốc ban đầu $' + v0 + '\\mathrm{\\,m/s}$ thì đột ngột thay đổi chuyển động với gia tốc $a(t)=' + p + ' - ' + q + 't\\mathrm{\\,m/s^2}$, thời gian $t$ tính bằng giây, $t=0$ là thời điểm bắt đầu thay đổi chuyển động. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $a(' + t1 + ') = ' + p + ' - ' + q + '\\cdot ' + t1 + ' = ' + aAtT1 + '\\mathrm{\\,m/s^2}$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $v(t) = \\int (' + p + ' - ' + q + 't)\\mathrm{\\,d}t = -' + (halfQ === 1 ? '' : halfQ) + 't^2 + ' + p + 't + ' + v0 + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. $v(' + t2 + ') = ' + vAtT2 + '\\mathrm{\\,m/s}$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. $S = \\int \\limits_{' + tA + '}^{' + tB + '} (-' + (halfQ === 1 ? '' : halfQ) + 't^2 + ' + p + 't + ' + v0 + ')\\mathrm{\\,d}t = ' + dist + '\\,\\mathrm{m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v(7) <= 0', params: { v0: 40, p: 9, halfQ: 4, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 v0=72, a(t)=15-6t', params: { v0: 72, p: 15, halfQ: 3, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 34 (Q34): Hai chất điểm chuyển động ngược chiều va chạm rồi đi tiếp đến khi dừng
  t12_b13_d34_two_particles_collision_tf: {
    id: 't12_b13_d34_two_particles_collision_tf',
    name: 'Bài toán hai chất điểm chuyển động ngược chiều sau va chạm',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Bài toán chuyển động',
    description: 'Xác định hàm quãng đường s1(t), s2(t), quãng đường dừng từng chất điểm và tổng khoảng cách giữa chúng.',
    conditionSummary: 'b1, b2 chẵn, T1 >= 2, T2 >= 3',
    paramSpecs: [
      { name: 'hb1', label: 'Nửa hệ số b1/2', min: 1, max: 3 },
      { name: 'T1', label: 'Thời gian dừng T1', min: 2, max: 4 },
      { name: 'hb2', label: 'Nửa hệ số b2/2', min: 2, max: 4 },
      { name: 'T2', label: 'Thời gian dừng T2', min: 4, max: 7 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { hb1, T1, hb2, T2 } = params;
      if (hb1 < 1 || T1 < 2 || hb2 < 2 || T2 < 3) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { hb1, T1, hb2, T2, mode } = params;
      const b1 = 2 * hb1, a1 = b1 * T1;
      const b2 = 2 * hb2, a2 = b2 * T2;
      const s1Stop = hb1 * T1 * T1;
      const s2Stop = hb2 * T2 * T2;
      const totalDist = s1Stop + s2Stop;

      const aTrue = mode === 1;
      const bTrue = mode === 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 3;

      const stmtA = 'Quãng đường chất điểm thứ nhất di chuyển sau khi va chạm được biểu diễn bởi hàm số $s_1(t)=-' + (hb1 === 1 ? '' : hb1) + 't^2 + ' + (aTrue ? a1 : a1 + 1) + 't + C$.';
      const stmtB = 'Quãng đường chất điểm thứ hai di chuyển sau khi va chạm được biểu diễn bởi hàm số $s_2(t)=-' + (hb2 === 1 ? '' : hb2) + 't^2 + ' + (bTrue ? a2 : a2 + 1) + 't + C$.';
      const stmtC = 'Quãng đường chất điểm thứ nhất di chuyển sau khi va chạm là $' + (cTrue ? s1Stop : s1Stop + 2) + '\\,\\mathrm{m}$.';
      const stmtD = 'Khoảng cách hai chất điểm khi đã dừng hẳn là $' + (dTrue ? totalDist : totalDist - 18) + '\\,\\mathrm{m}$.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Hai chất điểm chuyển động ngược chiều nhau thì xảy ra va chạm, hai chất điểm tiếp tục di chuyển theo chiều ban đầu thêm một quãng đường nữa thì dừng hẳn. Biết rằng sau khi va chạm, chất điểm thứ nhất di chuyển với vận tốc $v_1(t)=' + a1 + ' - ' + b1 + 't\\,(\\mathrm{m/s})$, chất điểm thứ hai di chuyển với vận tốc $v_2(t)=' + a2 + ' - ' + b2 + 't\\,(\\mathrm{m/s})$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $s_1(t)=\\int(' + a1 + '-' + b1 + 't)\\mathrm{\\,d}t = -' + (hb1 === 1 ? '' : hb1) + 't^2+' + a1 + 't+C$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $s_2(t)=\\int(' + a2 + '-' + b2 + 't)\\mathrm{\\,d}t = -' + (hb2 === 1 ? '' : hb2) + 't^2+' + a2 + 't+C$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Thời gian dừng $t_1=' + T1 + '\\Rightarrow S_1=\\int_0^{' + T1 + '}(' + a1 + '-' + b1 + 't)\\mathrm{\\,d}t = ' + s1Stop + '\\,\\mathrm{m}$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Chất điểm 2 dừng lúc $t_2=' + T2 + '$ với $S_2=' + s2Stop + '\\,\\mathrm{m}$, do đó khoảng cách là $' + s1Stop + '+' + s2Stop + '=' + totalDist + '\\,\\mathrm{m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên T1 < 2', params: { hb1: 1, T1: 1, hb2: 2, T2: 6, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 v1=6-2t, v2=24-4t', params: { hb1: 1, T1: 3, hb2: 2, T2: 6, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 35 (Q35): Ô tô đi quãng đường S với gia tốc đều a sau t0 giây đầu
  t12_b13_d35_car_accel_phases_tf: {
    id: 't12_b13_d35_car_accel_phases_tf',
    name: 'Chuyển động hai giai đoạn của ô tô: chạy đều rồi tăng tốc đều',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài toán chuyển động',
    description: 'Đổi km/h sang m/s, xác định gia tốc a từ quãng đường đi trong T1 giây, kiểm tra vận tốc và thời gian đi quãng đường cho trước.',
    conditionSummary: 'v0 ∈ {15, 20, 25} m/s, a ∈ {2, 3, 4} m/s^2, t2 nguyên',
    paramSpecs: [
      { name: 'v0', label: 'Vận tốc đầu v0 (m/s)', min: 15, max: 25, step: 5 },
      { name: 'a', label: 'Gia tốc a (m/s^2)', min: 2, max: 4 },
      { name: 't0', label: 'Thời gian chạy đều t0 (s)', min: 2, max: 4 },
      { name: 't2', label: 'Mốc thời gian t2 (ý d)', min: 12, max: 16, step: 2 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { v0, a, t0, t2 } = params;
      if (v0 < 15 || a < 2 || t0 < 2 || t2 < 12) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v0, a, t0, t2, mode } = params;
      const vKmh = Math.round((v0 * 18) / 5);
      const T1 = 10;
      const sPhase2 = (a * T1 * T1) / 2 + v0 * T1;
      const sTotal = v0 * t0 + sPhase2;
      const tC = 6;
      const vAtC = a * tC + v0; // e.g., 3*6+20 = 38
      const dAtT2m = 0.5 * a * t2 * t2 + v0 * t2;
      const dAtT2kmStr = u.formatNumberVN(dAtT2m / 1000);

      const aTrue = mode === 1;
      const bTrue = mode === 2;
      const cTrue = mode === 3;
      const dTrue = mode !== 1;

      const stmtA = 'Vận tốc của ô tô vào thời điểm bắt đầu tăng tốc là $' + (aTrue ? v0 : v0 + 1) + '$ m/s.';
      const stmtB = 'Gia tốc của ô tô là $' + (bTrue ? a : a + 1) + '\\,\\mathrm{m/s^2}$.';
      const stmtC = 'Kể từ lúc bắt đầu tăng tốc, sau ' + tC + ' giây vận tốc của ô tô ' + (cTrue ? 'nhỏ hơn $' + (vAtC + 3) + '$ m/s.' : 'lớn hơn $' + (vAtC + 3) + '$ m/s.');
      const stmtD = 'Kể từ lúc bắt đầu tăng tốc, thời gian để ô tô đi được quãng đường $' + dAtT2kmStr + '$ km là $' + (dTrue ? t2 : t2 + 2) + '$ giây.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Một ô tô chuyển động thẳng trên quãng đường dài $' + sTotal + '\\,\\mathrm{m}$. Trong $' + t0 + '$ giây đầu tiên, ô tô chuyển động với tốc độ không đổi là $' + vKmh + '$ km/h. Sau đó, ô tô bắt đầu tăng tốc với gia tốc không đổi $a\\,(a>0)$. Gọi $t$ (giây) là thời gian tính từ lúc bắt đầu tăng tốc. Biết rằng kể từ lúc bắt đầu tăng tốc, ô tô đi hết quãng đường còn lại trong tổng thời gian $' + T1 + '$ giây. Giả sử sau khi đi hết quãng đường trên, ô tô vẫn tiếp tục duy trì gia tốc này. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Đổi $' + vKmh + '\\,\\mathrm{km/h} = ' + v0 + '\\,\\mathrm{m/s}$, đây là vận tốc tại $t=0$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. Quãng đường tăng tốc dài $' + sTotal + ' - ' + v0 + '\\cdot ' + t0 + ' = ' + sPhase2 + '\\,\\mathrm{m}$, suy ra $\\int_0^{' + T1 + '}(at+' + v0 + ')\\mathrm{\\,d}t = ' + sPhase2 + ' \\Rightarrow a = ' + a + '\\,\\mathrm{m/s^2}$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. $v(' + tC + ') = ' + a + '\\cdot ' + tC + ' + ' + v0 + ' = ' + vAtC + '\\,\\mathrm{m/s} < ' + (vAtC + 3) + '\\,\\mathrm{m/s}$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Với $' + dAtT2kmStr + '\\,\\mathrm{km} = ' + dAtT2m + '\\,\\mathrm{m}$, giải $\\frac{' + a + '}{2}t_2^2 + ' + v0 + 't_2 = ' + dAtT2m + ' \\Rightarrow t_2 = ' + t2 + '$ giây.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a < 2', params: { v0: 20, a: 1, t0: 3, t2: 14, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 v0=20, a=3, t0=3, S=410', params: { v0: 20, a: 3, t0: 3, t2: 15, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 36 (Q36): Phanh xe khẩn cấp tránh chướng ngại vật cách D m
  t12_b13_d36_emergency_braking_tf: {
    id: 't12_b13_d36_emergency_braking_tf',
    name: 'Bài toán hãm phanh khẩn cấp tránh chướng ngại vật',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Bài toán chuyển động',
    description: 'Kiểm tra quan hệ nguyên hàm s(t), tìm thời gian dừng và so sánh quãng đường phanh với khoảng cách tới vật cản.',
    conditionSummary: 'k chẵn >= 4, T >= 4, D = sStop + margin (margin ∈ {-5, +5})',
    paramSpecs: [
      { name: 'hk', label: 'Nửa gia tốc hãm k/2', min: 2, max: 4 },
      { name: 'T', label: 'Thời gian dừng T (s)', min: 4, max: 8 },
      { name: 'gap', label: 'Dư khoảng cách D - sStop', min: -6, max: 8, allowZero: false },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { hk, T, gap } = params;
      if (hk < 2 || T < 4 || gap === 0) return { valid: false, reason: 'Cần hk>=2, T>=4 và gap ≠ 0' };
      const D = hk * T * T + gap;
      if (D <= 10) return { valid: false, reason: 'Khoảng cách D quá nhỏ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { hk, T, gap, mode } = params;
      const k = 2 * hk;
      const v0 = k * T;
      const sStop = hk * T * T;
      const D = sStop + gap;

      const aTrue = mode !== 1;
      const stmtA = aTrue
        ? 'Quãng đường $s(t)$ là một nguyên hàm của $v(t)=-' + k + 't+' + v0 + '$.'
        : 'Vận tốc $v(t)$ là một nguyên hàm của quãng đường $s(t)$ theo thời gian $t$.';

      const bTrue = mode === 2;
      const sExpr = '-' + (bTrue ? hk : hk + 1) + 't^2+' + v0 + 't';
      const stmtB = '$s(t)=' + sExpr + '$.';

      const cTrue = mode !== 3;
      const stmtC = 'Thời gian kể từ lúc đạp phanh đến khi dừng hẳn là $t=' + (cTrue ? T : T + 1) + '$ giây.';

      const willCollide = sStop > D;
      const dTrue = mode === 1 ? !willCollide : willCollide;
      const stmtD = (mode === 1)
        ? 'Trong trường hợp trên, xe ô tô dừng lại an toàn trước chướng ngại vật.'
        : 'Trong trường hợp trên, xe ô tô gặp tai nạn do va chạm với chướng ngại vật.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Một chiếc ô tô đang chạy với vận tốc $v_0=' + v0 + '\\,\\mathrm{m/s}$ thì nhìn thấy chướng ngại vật trên đường cách đó $' + D + '\\,\\mathrm{m}$, người lái xe hãm phanh khẩn cấp. Sau khi hãm phanh, ô tô chuyển động chậm dần đều với vận tốc $v(t)=-' + k + 't+' + v0 + '\\,(\\mathrm{m/s})$, trong đó $t$ tính bằng giây. Gọi $s(t)$ là quãng đường xe ô tô đi được trong thời gian $t$ kể từ lúc đạp phanh. Các mệnh đề sau đúng hay sai?',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Vì $s\'(t)=v(t)$ nên $s(t)$ là một nguyên hàm của $v(t)$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $s(t)=\\int(-' + k + 't+' + v0 + ')\\mathrm{\\,d}t = -' + hk + 't^2+' + v0 + 't$ (do $s(0)=0$).',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. $v(t)=0\\Leftrightarrow -' + k + 't+' + v0 + '=0\\Leftrightarrow t=' + T + '\\,\\mathrm{s}$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Quãng đường phanh $s(' + T + ')=' + sStop + '\\,\\mathrm{m}$ ' + (willCollide ? '$>$' : '$\\le$') + ' $D=' + D + '\\,\\mathrm{m}$ nên xe ' + (willCollide ? 'va chạm' : 'dừng an toàn trước') + ' chướng ngại vật.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên gap = 0', params: { hk: 2, T: 6, gap: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 v0=24, k=4, D=77', params: { hk: 2, T: 6, gap: 5, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 37 (Q37): Ô tô giảm tốc chuẩn bị rẽ tại ngã tư
  t12_b13_d37_car_intersection_decel_tf: {
    id: 't12_b13_d37_car_intersection_decel_tf',
    name: 'Bài toán ô tô giảm tốc trước ngã tư',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài toán chuyển động',
    description: 'Tính quãng đường giai đoạn giảm tốc, tìm b=v0, xác định gia tốc âm a và tốc độ tại thời điểm T2.',
    conditionSummary: 'v0 ∈ {20, 25, 30} m/s, t0=2, t1=5, kChẵn ∈ [24..36] sao cho v(T2) > 0',
    paramSpecs: [
      { name: 'v0', label: 'Vận tốc đầu v0 (m/s)', min: 20, max: 30, step: 5 },
      { name: 'hk', label: 'Tham số k/2 (a = -2hk/25)', min: 14, max: 18 },
      { name: 'T2', label: 'Thời điểm sau giảm tốc T2 (s)', min: 14, max: 16, step: 2 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { v0, hk, T2 } = params;
      const a = -(2 * hk) / 25;
      if (a * T2 + v0 <= 0.5) return { valid: false, reason: 'Cần tốc độ tại T2 dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v0, hk, T2, mode } = params;
      const vKmh = Math.round((v0 * 18) / 5);
      const t0 = 2, t1 = 5;
      const s0 = v0 * t0;
      const s1 = v0 * t1 - hk; // vì (a/2)*25 = -hk
      const D = s0 + s1;
      const aNum = -2 * hk;
      const aFr = u.simplifyFrac(aNum, 25);
      const aTex = '-\\frac{' + (-aFr.num) + '}{' + aFr.den + '}';
      const vAtT2ms = v0 + (aNum / 25) * T2;
      const vAtT2kmh = vAtT2ms * 3.6;
      const vBoundKmh = Math.round((vAtT2kmh + 3.6) * 10) / 10;

      const aTrue = mode === 1;
      const bTrue = mode !== 2;
      const cTrue = mode !== 3;
      const dTrue = mode !== 1;

      const stmtA = 'Quãng đường ô tô đi được từ khi bắt đầu giảm tốc đến khi gặp ngã tư là $' + (aTrue ? s1 : s1 + 4) + '$ m.';
      const stmtB = 'Giá trị của $b$ là $' + (bTrue ? v0 : v0 + 5) + '$.';
      const stmtC = 'Quãng đường $s(t)$ (mét) mà ô tô đi được trong $t$ giây kể từ khi giảm tốc được tính theo công thức ' + (cTrue ? '$s(t)=\\int \\limits_{0}^{t} v(u)\\mathrm{\\,d}u$.' : '$s(t)=\\int \\limits_{0}^{t} v^2(u)\\mathrm{\\,d}u$.');
      const stmtD = dTrue
        ? 'Sau ' + T2 + ' giây kể từ khi giảm tốc, tốc độ của ô tô không vượt quá $' + u.formatNumberVN(vBoundKmh) + '\\,\\mathrm{km/h}$.'
        : 'Sau ' + T2 + ' giây kể từ khi giảm tốc, tốc độ của ô tô lớn hơn $' + u.formatNumberVN(vBoundKmh) + '\\,\\mathrm{km/h}$.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Một người điều khiển ô tô đang đi thẳng và muốn chuyển hướng ở ngã tư tiếp theo. Khi ở vị trí cách ngã tư $' + D + '\\,\\mathrm{m}$, tốc độ của ô tô là $' + vKmh + '\\,\\mathrm{km/h}$. Đúng $' + t0 + '$ giây sau đó, ô tô bắt đầu giảm tốc với tốc độ $v(t)=at+b\\,(\\mathrm{m/s})$ $(a,b\\in\\mathbb{R},\\, a<0)$, trong đó $t$ là thời gian tính bằng giây kể từ khi bắt đầu giảm tốc. Biết rằng ô tô đến ngã tư sau $' + t1 + '$ giây kể từ khi bắt đầu giảm tốc và duy trì sự giảm tốc trong $' + T2 + '$ giây kể từ khi bắt đầu giảm tốc. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Đổi $' + vKmh + '\\,\\mathrm{km/h} = ' + v0 + '\\,\\mathrm{m/s}$, trong ' + t0 + ' giây đầu đi $' + s0 + '$ m, còn lại $s_1 = ' + D + ' - ' + s0 + ' = ' + s1 + '$ m.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $v(0) = b = ' + v0 + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Theo định nghĩa tích phân quãng đường, $s(t) = \\int_0^t v(u)\\mathrm{\\,d}u$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. $\\int_0^{' + t1 + '} (at+' + v0 + ')\\mathrm{\\,d}t = ' + s1 + ' \\Rightarrow a = ' + aTex + '$, nên $v(' + T2 + ') = ' + u.formatNumberVN(Math.round(vAtT2ms * 100) / 100) + '\\,\\mathrm{m/s} \\approx ' + u.formatNumberVN(Math.round(vAtT2kmh * 10) / 10) + '\\,\\mathrm{km/h} < ' + u.formatNumberVN(vBoundKmh) + '\\,\\mathrm{km/h}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v(T2) <= 0', params: { v0: 20, hk: 18, T2: 16, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37 v0=25, D=157', params: { v0: 25, hk: 18, T2: 16, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 38 (Q38): Tích phân và diện tích từ đường gấp khúc (có hình polyline)
  t12_b13_d38_polyline_graph_tf: {
    id: 't12_b13_d38_polyline_graph_tf',
    name: 'Tích phân và diện tích hình phẳng từ đồ thị đường gấp khúc (có hình)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Diện tích qua đồ thị',
    description: 'Từ đường gấp khúc A(xA,h) - B(0,h) - C(2m,-h), tính tích phân trên từng đoạn và diện tích toàn miền.',
    conditionSummary: 'xA <= -2, h >= 2, m >= 2',
    paramSpecs: [
      { name: 'wA', label: 'Độ dài |xA|', min: 2, max: 4 },
      { name: 'h', label: 'Tung độ h', min: 2, max: 4 },
      { name: 'm', label: 'Hoành độ giao điểm Ox', min: 2, max: 3 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.wA < 2 || params.h < 2 || params.m < 2) return { valid: false, reason: 'Cần wA, h, m >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { wA, h, m, mode } = params;
      const xA = -wA;
      const xC = 2 * m;
      const int1 = wA * h;
      const fr2 = u.simplifyFrac(m * h, 2);
      const int2Tex = fr2.den === 1 ? '' + fr2.num : '\\frac{' + fr2.num + '}{' + fr2.den + '}';
      const wrong2Tex = fr2.den === 1 ? '' + (fr2.num + 1) : '\\frac{' + (fr2.num + 2) + '}{' + fr2.den + '}';
      const totalArea = int1 + m * h;

      const aTrue = mode === 1;
      const bTrue = mode !== 2;
      const cTrue = mode === 3;
      const dTrue = mode !== 1;

      const stmtA = 'Tích phân $\\int \\limits_{' + xA + '}^{0} f(x)\\mathrm{\\,d}x$ bằng $' + (aTrue ? int1 : int1 + 1) + '$.';
      const stmtB = 'Tích phân $\\int \\limits_{0}^{' + m + '} f(x)\\mathrm{\\,d}x$ bằng $' + (bTrue ? int2Tex : wrong2Tex) + '$.';
      const stmtC = 'Tích phân $\\int \\limits_{0}^{' + xC + '} f(x)\\mathrm{\\,d}x$ bằng $' + (cTrue ? 0 : m + 2) + '$.';
      const stmtD = 'Diện tích hình phẳng giới hạn bởi đồ thị $y=f(x)$, trục $Ox$, các đường thẳng $x=' + xA + ',\\, x=' + xC + '$ bằng $' + (dTrue ? totalArea : totalArea + 4) + '$.';

      const xTicks = [];
      for (let t = xA; t <= xC; t++) if (t !== 0) xTicks.push(t);
      const yTicks = [-h, h];

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Đường gấp khúc $ABC$ trong hình bên là đồ thị của hàm số $y=f(x)$ trên đoạn $[' + xA + ';' + xC + ']$ với $A(' + xA + ';' + h + '),\\, B(0;' + h + '),\\, C(' + xC + ';-' + h + ')$. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'function_plot',
          curveType: 'polyline',
          coeffs: [],
          points: [[xA, h], [0, h], [xC, -h]],
          xMin: xA - 1,
          xMax: xC + 1,
          yMin: -h - 1,
          yMax: h + 1,
          xTicks,
          yTicks,
          strokeColor: '#0f172a',
          highlightPoints: [
            { x: xA, y: h, label: 'A' },
            { x: 0, y: h, label: 'B' },
            { x: xC, y: -h, label: 'C' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $\\int_{' + xA + '}^{0} f(x)\\mathrm{\\,d}x = \\int_{' + xA + '}^{0} ' + h + '\\mathrm{\\,d}x = ' + int1 + '$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $\\int_0^{' + m + '} f(x)\\mathrm{\\,d}x = \\frac{1}{2}\\cdot ' + m + '\\cdot ' + h + ' = ' + int2Tex + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Do tính đối xứng qua điểm $(' + m + ';0)$ nên $\\int_0^{' + xC + '} f(x)\\mathrm{\\,d}x = 0$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. $S = ' + int1 + ' + 2\\cdot ' + int2Tex + ' = ' + totalArea + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m < 2', params: { wA: 3, h: 3, m: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38 A(-3,3), B(0,3), C(4,-3)', params: { wA: 3, h: 3, m: 2, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 39 (Q39): Quảng trường tròn trang trí bằng hai parabol đối xứng (có hình)
  t12_b13_d39_circle_parabolas_plaza_tf: {
    id: 't12_b13_d39_circle_parabolas_plaza_tf',
    name: 'Bài toán quảng trường hình tròn và hai parabol đối xứng (có hình)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Xác định tọa độ A, B, I, phương trình parabol, diện tích hai miền và tổng chi phí lát gạch, trồng hoa.',
    conditionSummary: 'R ∈ [5..10], d ∈ [1..3], R - d >= 3',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (m)', min: 6, max: 10 },
      { name: 'd', label: 'Khoảng cách đỉnh đến mép d (m)', min: 1, max: 3 },
      { name: 'c1', label: 'Giá trồng hoa (nghìn đ/m^2)', min: 180, max: 250, step: 10 },
      { name: 'c2', label: 'Giá lát gạch (nghìn đ/m^2)', min: 450, max: 550, step: 10 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { R, d } = params;
      if (R < 5 || d < 1 || R - d < 3) return { valid: false, reason: 'Cần R >= 5, d >= 1 và R - d >= 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, d, c1, c2, mode } = params;
      const diam = 2 * R;
      const hp = R - d; // vertex at (0, -hp)
      const aFr = u.simplifyFrac(hp, R * R);
      const aTex = aFr.den === 1 ? '' + aFr.num : '\\frac{' + aFr.num + '}{' + aFr.den + '}';
      const s1Fr = u.simplifyFrac(8 * R * hp, 3);
      const s1Val = s1Fr.value;
      const s1Tex = s1Fr.den === 1 ? '' + s1Fr.num : '\\frac{' + s1Fr.num + '}{' + s1Fr.den + '}';
      const s1WrongTex = s1Fr.den === 1 ? '' + (s1Fr.num / 2) : '\\frac{' + Math.round(s1Fr.num / 2) + '}{' + s1Fr.den + '}';
      const s2Val = Math.PI * R * R - s1Val;
      const totalMillion = Math.round((s1Val * c1 + s2Val * c2) / 1000);
      const wrongMillion = totalMillion + 4;

      const aTrue = mode === 1;
      const bTrue = mode !== 2;
      const cTrue = mode === 2;
      const dTrue = mode === 3;

      const stmtA = 'Với hệ trục như trên ta có ' + (aTrue ? '$I(0;-' + hp + '),\\, A(' + R + ';0),\\, B(-' + R + ';0)$.' : '$I(0;' + d + '),\\, A(' + R + ';0),\\, B(-' + R + ';0)$.');
      const stmtB = 'Parabol có đỉnh $I$ và bề lõm hướng lên có phương trình là $y=' + (bTrue ? '' : '-') + aTex + 'x^2-' + hp + '$.';
      const stmtC = 'Diện tích phần trồng hoa giới hạn bởi hai parabol là $' + (cTrue ? s1Tex : s1WrongTex) + '\\,\\mathrm{m^2}$.';
      const stmtD = 'Tổng chi phí để trồng hoa và lát gạch cho khu vực này là $' + (dTrue ? totalMillion : wrongMillion) + '$ triệu đồng (kết quả làm tròn đến hàng đơn vị của triệu).';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Khu vực trung tâm một quảng trường có dạng hình tròn đường kính $AB=' + diam + '\\,\\mathrm{m}$. Người ta trang trí khu vực này bằng hai đường Parabol đối xứng nhau qua $AB$, nằm trong hình tròn, đi qua các điểm $A,\\, B$ và có đỉnh $I$ cách mép hình tròn $' + d + '\\,\\mathrm{m}$. Phần giới hạn bởi hai parabol được trồng hoa với chi phí $' + c1 + '$ nghìn đồng/$\\mathrm{m^2}$, phần còn lại được lát gạch hoa với chi phí $' + c2 + '$ nghìn đồng/$\\mathrm{m^2}$. Gắn hệ trục tọa độ như hình vẽ bên (đơn vị trên các trục là mét). Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_circle_two_parabolas',
          params: { R, d, axesVariant: 1 },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Đỉnh $I$ nằm phía dưới $O$ một đoạn $R-d=' + hp + '\\,\\mathrm{m}$ nên $I(0;-' + hp + '),\\, A(' + R + ';0),\\, B(-' + R + ';0)$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. Parabol bề lõm hướng lên dạng $y=ax^2-' + hp + '$ qua $A(' + R + ';0)\\Rightarrow a=' + aTex + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. $S_1 = 2\\int_{-' + R + '}^{' + R + '}\\left|' + aTex + 'x^2-' + hp + '\\right|\\mathrm{\\,d}x = ' + s1Tex + '\\,\\mathrm{m^2}$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. $S_2 = ' + (R * R) + '\\pi - ' + s1Tex + '$, suy ra chi phí là $S_1\\cdot ' + c1 + ' + S_2\\cdot ' + c2 + ' \\approx ' + totalMillion + '$ triệu đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R - d < 3', params: { R: 4, d: 2, c1: 214, c2: 506, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39 R=8, d=2', params: { R: 8, d: 2, c1: 210, c2: 500, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 40 (Q40): Bài toán dân số với tốc độ tăng N'(t) = a * e^(-b*t)
  t12_b13_d40_population_exp_growth_tf: {
    id: 't12_b13_d40_population_exp_growth_tf',
    name: 'Mô hình tăng trưởng dân số N\'(t) = a·e^(-bt)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Xác định hằng số a, b, ước tính dân số theo năm, thời điểm gấp đôi dân số và giới hạn bão hòa.',
    conditionSummary: 'n0 ∈ [40..55], aTenths ∈ [10..13], t1 ∈ [5..7], rMil ∈ [850..990]',
    paramSpecs: [
      { name: 'n0', label: 'Dân số ban đầu (triệu)', min: 45, max: 52 },
      { name: 'aTenths', label: 'Tốc độ đầu (×0,1 triệu/năm)', min: 10, max: 12 },
      { name: 't1', label: 'Mốc năm t1', min: 5, max: 7 },
      { name: 'rThous', label: 'Tốc độ tại t1 (×0,001 triệu)', min: 920, max: 990, step: 10 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { n0, aTenths, t1, rThous } = params;
      const a = aTenths / 10;
      const r1 = rThous / 1000;
      if (r1 >= a || r1 <= 0.5) return { valid: false, reason: 'Cần 0.5 < r1 < a' };
      const b = -Math.log(r1 / a) / t1;
      const nCap = n0 + a / b;
      // Đảm bảo có thể tăng gấp đôi (2*n0 < nCap) và tránh sát ranh tròn
      if (nCap <= 2 * n0 + 6) return { valid: false, reason: 'Cần giới hạn bão hòa > 2*n0 + 6' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n0, aTenths, t1, rThous, mode } = params;
      const a = aTenths / 10;
      const r1 = rThous / 1000;
      const bExact = -Math.log(r1 / a) / t1;
      const bRound2 = Math.round(bExact * 100) / 100;
      const bRound4 = Math.round(bExact * 10000) / 10000;
      const N = (t) => n0 + (a / bExact) * (1 - Math.exp(-bExact * t));
      const n15 = N(15);
      const nCap = n0 + a / bExact;
      const tDoubleExact = -Math.log(1 - (n0 * bExact) / a) / bExact;
      const tCheck = Math.ceil(tDoubleExact) + 4; // Chắc chắn N(tCheck) > 2*n0 + 2
      const nAtCheck = N(tCheck);
      const n15Thresh = Math.floor(n15 - 1);

      const aTrue = mode === 1;
      const bTrue = mode !== 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 2;

      const bWrong = Math.round((bRound2 + 0.02) * 100) / 100;
      const stmtA = 'Xác định được $a=' + u.formatNumberVN(a) + '$ và $b=' + u.formatNumberVN(aTrue ? bRound2 : bWrong) + '$ (làm tròn kết quả đến hàng phần trăm).';
      const stmtB = 'Vào năm thứ $15$ thì dân số của quốc gia đó ' + (bTrue ? 'lớn hơn $' + n15Thresh + '$ triệu dân.' : 'nhỏ hơn $' + n15Thresh + '$ triệu dân.');
      const stmtC = 'Sau $' + tCheck + '$ năm thì dân số của quốc gia đó ' + (cTrue ? 'đã tăng vượt gấp đôi so với ban đầu.' : 'vẫn chưa đạt mức gấp đôi ban đầu.');
      const nCapApprox = Math.round(nCap);
      const stmtD = 'Về lâu dài dân số tiến gần đến giới hạn bão hòa là $' + (dTrue ? nCapApprox : Math.max(n0 + 20, nCapApprox - 10)) + '$ triệu dân (làm tròn đến hàng đơn vị).';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Một quốc gia có $' + n0 + '$ triệu dân. Tốc độ tăng trưởng tại thời điểm đầu là $' + u.formatNumberVN(a) + '$ triệu người/năm và sau $' + t1 + '$ năm là $' + u.formatNumberVN(r1) + '$ triệu người/năm. Giả sử rằng tốc độ tăng trưởng được cho bởi hàm $N\'(t)=a\\cdot e^{-bt}$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $N\'(0)=a=' + u.formatNumberVN(a) + '$ và $e^{-' + t1 + 'b}=\\frac{' + u.formatNumberVN(r1) + '}{' + u.formatNumberVN(a) + '}\\Rightarrow b\\approx ' + u.formatNumberVN(bRound4) + '\\approx ' + u.formatNumberVN(bRound2) + '$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $N(15) = ' + n0 + ' + \\frac{a}{b}(1 - e^{-15b}) \\approx ' + u.formatNumberVN(Math.round(n15 * 100) / 100) + ' > ' + n15Thresh + '$ triệu.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Mức gấp đôi là $' + (2 * n0) + '$ triệu; $N(' + tCheck + ') \\approx ' + u.formatNumberVN(Math.round(nAtCheck * 100) / 100) + ' > ' + (2 * n0) + '$ triệu.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. $\\lim\\limits_{t\\to +\\infty} N(t) = ' + n0 + ' + \\frac{a}{b} \\approx ' + nCapApprox + '$ triệu người.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r1 >= a', params: { n0: 47, aTenths: 10, t1: 6, rThous: 1000, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40 n0=47, a=1.1, t1=6', params: { n0: 47, aTenths: 11, t1: 6, rThous: 980, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 41 (Q41): Cổng parabol căng hai sợi dây AB, CD chia ba phần (có hình) — đã sửa erratum hệ số tích phân!
  t12_b13_d41_parabolic_gate_2cords_tf: {
    id: 't12_b13_d41_parabolic_gate_2cords_tf',
    name: 'Cổng hình parabol căng hai dây ngang chia diện tích (có hình)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Lập phương trình cổng parabol y = -H/w^2 x^2, tính diện tích S_AB, S_CD và tỉ số CD/AB = cbrt(2).',
    conditionSummary: 'w ∈ [3..5], H ∈ [6..10]',
    paramSpecs: [
      { name: 'w', label: 'Nửa chiều rộng chân cổng w (m)', min: 3, max: 5 },
      { name: 'H', label: 'Chiều cao cổng H (m)', min: 6, max: 10 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.w < 3 || params.H < 6) return { valid: false, reason: 'Cần w >= 3 và H >= 6' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { w, H, mode } = params;
      const baseW = 2 * w;
      const aFr = u.simplifyFrac(H, w * w);
      const aTex = aFr.den === 1 ? (aFr.num === 1 ? '' : '' + aFr.num) : '\\frac{' + aFr.num + '}{' + aFr.den + '}';
      const kFr = u.simplifyFrac(4 * H, 3 * w * w);
      const kTex = kFr.den === 1 ? (kFr.num === 1 ? '' : '' + kFr.num) : '\\frac{' + kFr.num + '}{' + kFr.den + '}';

      const aTrue = mode === 1;
      const bTrue = mode !== 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 2;

      const stmtA = 'Phương trình parabol là $y=-' + (aTrue ? aTex : (aFr.num + 1)) + 'x^2$.';
      const stmtB = 'Diện tích hình phẳng giới hạn bởi parabol và đường thẳng $AB$ là $' + (bTrue ? kTex : '\\frac{' + (kFr.num + 2) + '}{' + kFr.den + '}') + 'x_1^3\\,\\mathrm{m^2}$.';
      const stmtC = 'Diện tích hình phẳng giới hạn bởi parabol và đường thẳng $CD$ là $' + (cTrue ? kTex : '\\frac{' + (kFr.num + 3) + '}{' + kFr.den + '}') + 'x_2^3\\,\\mathrm{m^2}$.';
      const stmtD = 'Tỉ số $\\dfrac{CD}{AB}$ gần bằng $' + (dTrue ? '1,26' : '1,14') + '$ (làm tròn kết quả đến hàng phần trăm).';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Một cổng có dạng hình parabol với chiều cao $' + H + '\\,\\mathrm{m}$, chiều rộng chân đế $' + baseW + '\\,\\mathrm{m}$. Người ta căng hai sợi dây trang trí $AB,\\, CD$ nằm ngang, đồng thời chia cổng thành ba phần sao cho hai phần ở phía trên có diện tích bằng nhau. Gắn hệ trục tọa độ như hình vẽ bên, với đỉnh parabol là gốc tọa độ và đơn vị trên các trục tọa độ là mét. Xét tính đúng-sai của các khẳng định sau:',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_parabolic_gate_2cords',
          params: { w, H },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. Parabol $y=ax^2$ qua $(' + w + ';-' + H + ')\\Rightarrow a = -' + aTex + '$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $S_{AB} = \\int_{-x_1}^{x_1}\\left(-' + aTex + 'x^2 + ' + aTex + 'x_1^2\\right)\\mathrm{\\,d}x = ' + kTex + 'x_1^3\\,\\mathrm{m^2}$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Tương tự, $S_{CD} = ' + kTex + 'x_2^3\\,\\mathrm{m^2}$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. Do $S_{AB}=S_{CD}-S_{AB}\\Rightarrow x_2^3=2x_1^3\\Rightarrow \\frac{CD}{AB}=\\frac{x_2}{x_1}=\\sqrt[3]{2}\\approx 1{,}26$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên w < 3', params: { w: 2, H: 8, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41 w=3, H=8', params: { w: 3, H: 8, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 42 (Q42): Nồng độ thuốc thủy sản y(t1)=2M, y(2*t1)=M — đã sửa erratum C & y(t3)!
  t12_b13_d42_residue_halving_tf: {
    id: 't12_b13_d42_residue_halving_tf',
    name: 'Bài toán nồng độ thuốc tồn dư giảm theo chu kỳ bán rã',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Giải y\'(t)=k·y(t) với y(t1)=2M, y(2t1)=M: xác định g(t)=kt+C, tìm k, C và dự báo nồng độ tại t3.',
    conditionSummary: 't1 ∈ [4..8], M ∈ [1..3]',
    paramSpecs: [
      { name: 't1', label: 'Chu kỳ bán rã t1 (ngày)', min: 4, max: 8 },
      { name: 'M', label: 'Nồng độ tại 2*t1 (mg/lít)', min: 1, max: 3 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.t1 < 4 || params.M < 1) return { valid: false, reason: 'Cần t1 >= 4 và M >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { t1, M, mode } = params;
      const t2 = 2 * t1;
      const c1 = 2 * M;
      const t3 = Math.round(3.5 * t1); // Tại t3 = 3.5 t1: y(t3) = 4M * 2^{-3.5} = M / (2*sqrt(2)) = 0.3536 * M
      const y3 = c1 * Math.pow(0.5, (t3 - t1) / t1);
      const y3Thresh = Math.round((y3 + 0.05) * 10) / 10; // Ví dụ M=1 -> 0.3536 -> 0.4

      const aTrue = mode !== 1;
      const bTrue = mode !== 2;
      const cTrue = mode === 2;
      const dTrue = mode === 3;

      const cTex = M === 1 ? '2\\ln 2' : '\\ln(' + (4 * M) + ')';
      const cWrongTex = M === 1 ? '4\\ln 2' : '\\ln(' + (8 * M) + ')';

      const stmtA = '$g(t)=' + (aTrue ? 'kt+C' : 'kt^2+C') + '\\,(t\\ge 0)$ với $C$ là một hằng số xác định.';
      const stmtB = '$k=-\\dfrac{\\ln 2}{' + (bTrue ? t1 : t1 + 2) + '}$.';
      const stmtC = '$C=' + (cTrue ? cTex : cWrongTex) + '$.';
      const stmtD = 'Nồng độ thuốc tồn dư trong nước tại thời điểm $t=' + t3 + '$ (ngày) kể từ lúc sử dụng thuốc ' + (dTrue ? 'nhỏ hơn $' + u.formatNumberVN(y3Thresh) + '$ mg/lít.' : 'lớn hơn $' + u.formatNumberVN(y3Thresh) + '$ mg/lít.');

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Khi nghiên cứu một loại thuốc trị bệnh trong nuôi trồng thủy sản, người ta sử dụng thuốc đó một lần và theo dõi nồng độ thuốc tồn dư $y(t)$ (mg/lít) tại thời điểm $t$ ngày $(t\\ge 0)$, thỏa mãn $y(t)>0$ và $y\'(t)=k\\cdot y(t)\\,(k\\ne 0)$. Đo nồng độ thuốc tại các thời điểm $t=' + t1 + '$ (ngày) và $t=' + t2 + '$ (ngày) nhận được kết quả lần lượt là $' + c1 + '$ mg/lít và $' + M + '$ mg/lít. Cho biết $y(t)=e^{g(t)}\\,(t\\ge 0)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $y\'(t)=g\'(t)y(t)=k\\cdot y(t)\\Rightarrow g\'(t)=k\\Rightarrow g(t)=kt+C$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $\\frac{y(' + t2 + ')}{y(' + t1 + ')}=e^{' + t1 + 'k}=\\frac{1}{2}\\Rightarrow k=-\\frac{\\ln 2}{' + t1 + '}$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. $y(' + t1 + ')=' + c1 + '\\Rightarrow e^{-\ln 2 + C}=' + c1 + '\\Rightarrow e^C=' + (4 * M) + '\\Rightarrow C=' + cTex + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. $y(' + t3 + ')=e^{' + t3 + 'k+C}\\approx ' + u.formatNumberVN(Math.round(y3 * 1000) / 1000) + '\\,\\mathrm{mg/lít} < ' + u.formatNumberVN(y3Thresh) + '\\,\\mathrm{mg/lít}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t1 < 4', params: { t1: 3, M: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42 t1=6, M=1', params: { t1: 6, M: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 43 (Q43): Nồng độ thuốc thủy sản dạng tổng quát tại t1, t2 -> c1, c2 — đã sửa erratum!
  t12_b13_d43_residue_general_tf: {
    id: 't12_b13_d43_residue_general_tf',
    name: 'Mô hình nồng độ thuốc tồn dư y(t) = e^(kt+C) với hai mốc đo tổng quát',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tìm k và C từ y(t1)=c1, y(t2)=c2 và kiểm tra nồng độ tại t3 với ngưỡng rõ ràng.',
    conditionSummary: '1 <= t1 < t2, c1 > c2 >= 4',
    paramSpecs: [
      { name: 't1', label: 'Thời điểm đo t1 (ngày)', min: 2, max: 4 },
      { name: 'dt', label: 'Khoảng t2 - t1 (ngày)', min: 4, max: 6 },
      { name: 'c2', label: 'Nồng độ c2 (mg/lít)', min: 5, max: 8 },
      { name: 'dc', label: 'Độ chênh c1 - c2', min: 1, max: 3 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { t1, dt, c2, dc } = params;
      if (t1 < 2 || dt < 4 || c2 < 5 || dc < 1) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { t1, dt, c2, dc, mode } = params;
      const t2 = t1 + dt;
      const c1 = c2 + dc;
      const t3 = t2 + dt + 1;
      const kExact = (Math.log(c2) - Math.log(c1)) / dt;
      const cExact = Math.log(c1) - kExact * t1;
      const y3Exact = Math.exp(kExact * t3 + cExact);
      const y3Round2 = Math.round(y3Exact * 100) / 100;
      const threshUpper = Math.round((y3Exact + 0.15) * 10) / 10;

      const aTrue = mode === 1;
      const bTrue = mode !== 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 2;

      const kTex = '-\\frac{\\ln(' + c1 + ')}{' + dt + '} + \\frac{\\ln(' + c2 + ')}{' + dt + '}';
      const kWrongTex = '-\\frac{\\ln(' + c1 + ')}{' + (dt + 1) + '} + \\frac{\\ln(' + c2 + ')}{' + (dt + 1) + '}';
      const cTex = '-\\frac{' + t1 + '\\ln(' + c2 + ')}{' + dt + '} + \\frac{' + t2 + '\\ln(' + c1 + ')}{' + dt + '}';
      const cWrongTex = '\\frac{' + t1 + '\\ln(' + c2 + ')}{' + dt + '} + \\frac{' + t2 + '\\ln(' + c1 + ')}{' + dt + '}';

      const stmtA = '$g(t)=' + (aTrue ? 'kt+C' : 'kt^2+C') + '\\,(t\\ge 0)$ với $C$ là một hằng số xác định.';
      const stmtB = '$k=' + (bTrue ? kTex : kWrongTex) + '$.';
      const stmtC = '$C=' + (cTrue ? cTex : cWrongTex) + '$.';
      const stmtD = 'Nồng độ thuốc tồn dư trong nước tại thời điểm $t=' + t3 + '$ ngày ' + (dTrue ? 'nhỏ hơn $' + u.formatNumberVN(threshUpper) + '\\,\\mathrm{mg/lít}$.' : 'lớn hơn $' + u.formatNumberVN(threshUpper) + '\\,\\mathrm{mg/lít}$.');

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: dTrue },
      ];
      return {
        stem: 'Khi nghiên cứu một loại thuốc trị bệnh trong nuôi trồng thủy sản, người ta theo dõi nồng độ thuốc tồn dư $y(t)$ (mg/lít) tại thời điểm $t$ ngày $(t\\ge 0)$, thỏa mãn $y(t)>0$ và $y\'(t)=k\\cdot y(t)\\,(k\\ne 0)$. Đo nồng độ thuốc tại các thời điểm $t=' + t1 + '$ (ngày) và $t=' + t2 + '$ (ngày) nhận được kết quả lần lượt là $' + c1 + '\\,\\mathrm{mg/lít}$ và $' + c2 + '\\,\\mathrm{mg/lít}$. Cho biết $y(t)=e^{g(t)}\\,(t\\ge 0)$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $g\'(t)=k\\Rightarrow g(t)=kt+C$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. $\\frac{y(' + t2 + ')}{y(' + t1 + ')}=e^{' + dt + 'k}=\\frac{' + c2 + '}{' + c1 + '}\\Rightarrow k=' + kTex + '$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. $y(' + t1 + ')=' + c1 + '\\Rightarrow C=\\ln ' + c1 + ' - ' + t1 + 'k = ' + cTex + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + '. $y(' + t3 + ')\\approx ' + u.formatNumberVN(y3Round2) + '\\,\\mathrm{mg/lít} < ' + u.formatNumberVN(threshUpper) + '\\,\\mathrm{mg/lít}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dt < 4', params: { t1: 2, dt: 3, c2: 6, dc: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43 t1=2, t2=7, c1=7, c2=6', params: { t1: 2, dt: 5, c2: 6, dc: 1, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 44 (Q44): Hệ thống pin năng lượng mặt trời F'(t) = -0,5 t^2 + q t
  t12_b13_d44_solar_energy_storage_tf: {
    id: 't12_b13_d44_solar_energy_storage_tf',
    name: 'Tốc độ lưu trữ điện của hệ thống pin năng lượng mặt trời',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tìm hàm điện năng F(t), kiểm tra công thức Newton-Leibniz và tính điện năng lưu trữ giữa hai thời điểm.',
    conditionSummary: 'q ∈ {5, 6, 7}, 0 <= t <= 2q',
    paramSpecs: [
      { name: 'q', label: 'Hệ số q của -0,5t^2 + qt', min: 5, max: 7 },
      { name: 't1', label: 'Mốc đầu t1', min: 1, max: 2 },
      { name: 't2', label: 'Mốc t2', min: 4, max: 6 },
      { name: 'mode', label: 'Chế độ Đúng/Sai', min: 0, max: 3 },
    ],
    validateCode: `
      const { q, t1, t2 } = params;
      if (q < 5 || t1 >= t2 || t2 > 2 * q) return { valid: false, reason: 'Cần q>=5 và t1 < t2 <= 2q' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { q, t1, t2, mode } = params;
      const T = 2 * q;
      const t3 = t2 + 3;
      const F6 = (t) => -Math.pow(t, 3) + 3 * q * t * t; // = 6 * F(t)
      const e12Num = F6(t2) - F6(t1);
      const e12Fr = u.simplifyFrac(e12Num, 6);
      const e12Thresh = Math.floor(e12Fr.value - 2);
      const e13Num = F6(t3) - F6(t1);

      const qHalfTex = q % 2 === 0 ? '' + (q / 2) : '\\frac{' + q + '}{2}';
      const fExprTex = '-\\frac{1}{6}t^3+' + qHalfTex + 't^2';
      const fWrongTex = '-\\frac{1}{2}t^3+' + qHalfTex + 't^2';

      const aTrue = mode !== 1;
      const bTrue = mode === 2;
      const cTrue = mode !== 3;
      const dTrue = mode === 1 && e13Num === 2 * e12Num ? false : mode === 3;

      const stmtA = '$F(t)=' + (aTrue ? fExprTex : fWrongTex) + '$ với $0\\le t\\le ' + T + '$.';
      const stmtB = bTrue
        ? '$F(b)-F(a)=\\int_a^b f(t)\\mathrm{\\,d}t$ với $0\\le a<b\\le ' + T + '$.'
        : '$F(a)+F(b)=\\int_a^b f(t)\\mathrm{\\,d}t$ với $0\\le a<b\\le ' + T + '$.';
      const stmtC = 'Năng lượng điện lưu trữ được kể từ thời điểm $t=' + t1 + '$ đến thời điểm $t=' + t2 + '$ ' + (cTrue ? 'lớn hơn $' + e12Thresh + '\\,\\mathrm{kWh}$.' : 'nhỏ hơn $' + e12Thresh + '\\,\\mathrm{kWh}$.');
      // Đặt mệnh đề d với tỉ số rõ ràng sai (hoặc đúng khi so với tổng thật nếu mode === 3)
      const ratioFr = u.simplifyFrac(e13Num, 6);
      const ratioTex = ratioFr.den === 1 ? '' + ratioFr.num : '\\frac{' + ratioFr.num + '}{' + ratioFr.den + '}';
      const stmtD = (mode === 3)
        ? 'Năng lượng điện lưu trữ được từ $t=' + t1 + '$ đến $t=' + t3 + '$ bằng $' + ratioTex + '\\,\\mathrm{kWh}$.'
        : 'Năng lượng điện lưu trữ được kể từ thời điểm $t=' + t1 + '$ đến thời điểm $t=' + t3 + '$ gấp hai lần năng lượng điện lưu trữ được kể từ thời điểm $t=' + t1 + '$ đến thời điểm $t=' + t2 + '$.';

      const tfStatements = [
        { key: 'a', text: stmtA, isTrue: aTrue },
        { key: 'b', text: stmtB, isTrue: bTrue },
        { key: 'c', text: stmtC, isTrue: cTrue },
        { key: 'd', text: stmtD, isTrue: mode === 3 ? true : false },
      ];
      return {
        stem: 'Một hệ thống pin năng lượng mặt trời được kết nối với bộ lưu trữ điện. Gọi $F(t)$ là năng lượng điện (kWh) lưu trữ được từ $t=0$ đến thời điểm $t$ giờ $(0\\le t\\le ' + T + ')$, với $F(0)=0$. Tốc độ lưu trữ năng lượng điện (kW) là hàm số $f(t)=F\'(t)=-0{,}5t^2+' + q + 't$ với $0\\le t\\le ' + T + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join('; '),
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + '. $F(t)=\\int(-\\frac{1}{2}t^2+' + q + 't)\\mathrm{\\,d}t = ' + fExprTex + '$ (do $F(0)=0$).',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + '. Theo định nghĩa tích phân: $\\int_a^b f(t)\\mathrm{\\,d}t = F(b) - F(a)$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. $\\int_{' + t1 + '}^{' + t2 + '} f(t)\\mathrm{\\,d}t \\approx ' + u.formatNumberVN(Math.round(e12Fr.value * 100) / 100) + '\\,\\mathrm{kWh} > ' + e12Thresh + '\\,\\mathrm{kWh}$.',
          'd) ' + ((mode === 3) ? 'Đúng' : 'Sai') + '. $\\int_{' + t1 + '}^{' + t3 + '} f(t)\\mathrm{\\,d}t = ' + ratioTex + '\\ne ' + u.formatNumberVN(Math.round(2 * e12Fr.value * 100) / 100) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t1 >= t2', params: { q: 6, t1: 5, t2: 5, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44 q=6, t1=1, t2=5', params: { q: 6, t1: 1, t2: 5, mode: 0 }, expectedValid: true },
    ],
  },
};
