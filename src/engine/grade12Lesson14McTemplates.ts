import { MathTemplate } from '../types/math';

export const G12_B14_MC_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 1 (Q1): Tìm một vectơ pháp tuyến của mặt phẳng Ax + By + Cz + D = 0
  t12_b14_d01_plane_normal_mc: {
    id: 't12_b14_d01_plane_normal_mc',
    name: 'Nhận dạng vectơ pháp tuyến của mặt phẳng Ax + By + Cz + D = 0',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho phương trình tổng quát của mặt phẳng (P): Ax + By + Cz + D = 0, xác định một vectơ pháp tuyến.',
    conditionSummary: 'A, B, C khác 0 và không đồng thời bằng nhau về trị tuyệt đối gây trùng nhiễu',
    paramSpecs: [
      { name: 'a', label: 'Hệ số A', min: -7, max: 7, allowZero: false },
      { name: 'b', label: 'Hệ số B', min: -7, max: 7, allowZero: false },
      { name: 'c', label: 'Hệ số C', min: -7, max: 7, allowZero: false },
      { name: 'd', label: 'Hệ số D', min: -15, max: 15 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Cần A, B, C đều khác 0 để tạo đủ nhiễu đảo dấu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const planeNames = ['(P)', '(Q)', '(R)', '(\\alpha)', '(\\beta)'];
      const pName = planeNames[Math.floor(rng() * planeNames.length)];
      const eq = u.formatPlaneEq(a, b, c, d);
      const ans = '$\\overrightarrow{n}=' + u.formatCoord3D(a, b, c) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$\\overrightarrow{n}=' + u.formatCoord3D(a, b, -c) + '$',
          '$\\overrightarrow{n}=' + u.formatCoord3D(a, -b, c) + '$',
          '$\\overrightarrow{n}=' + u.formatCoord3D(a, 0, c) + '$',
        ],
        rng,
        (k) => '$\\overrightarrow{n}=' + u.formatCoord3D(a + k, -b, c) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $' + pName + '$ có phương trình $' + eq + '$. Mặt phẳng $' + pName + '$ nhận vectơ nào trong các vectơ sau làm vectơ pháp tuyến?',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Mặt phẳng $Ax + By + Cz + D = 0$ có một vectơ pháp tuyến là $\\overrightarrow{n} = (A;\\, B;\\, C)$.',
          'Từ phương trình $' + eq + '$, suy ra $' + pName + '$ có một vectơ pháp tuyến là $\\overrightarrow{n}=' + u.formatCoord3D(a, b, c) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số A = 0', params: { a: 0, b: -5, c: 4, d: 13 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (-4, -5, 4, 13)', params: { a: -4, b: -5, c: 4, d: 13 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2): Tìm điểm thuộc mặt phẳng Ax + By + Cz + D = 0
  t12_b14_d02_point_on_plane_mc: {
    id: 't12_b14_d02_point_on_plane_mc',
    name: 'Tìm điểm thuộc mặt phẳng cho trước',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho mặt phẳng (β): Ax + By + Cz + D = 0, xác định điểm thuộc mặt phẳng trong 4 phương án.',
    conditionSummary: 'A, B, C khác 0; D = -(A*x0 + B*y0 + C*z0)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số A', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hệ số B', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Hệ số C', min: -5, max: 5, allowZero: false },
      { name: 'x0', label: 'Hoành độ điểm đúng x0', min: -5, max: 5 },
      { name: 'y0', label: 'Tung độ điểm đúng y0', min: -5, max: 5 },
      { name: 'z0', label: 'Cao độ điểm đúng z0', min: -5, max: 5 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số A, B, C phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0, y0, z0 } = params;
      const d = -(a * x0 + b * y0 + c * z0);
      const eq = u.formatPlaneEq(a, b, c, d);
      const ans = '$A' + u.formatCoord3D(x0, y0, z0) + '$';
      const f1 = [x0 + 1, y0, z0];
      const f2 = [x0, y0 + 1, z0];
      const f3 = [x0, y0, z0 - 1];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$E' + u.formatCoord3D(f1[0], f1[1], f1[2]) + '$',
          '$I' + u.formatCoord3D(f2[0], f2[1], f2[2]) + '$',
          '$H' + u.formatCoord3D(f3[0], f3[1], f3[2]) + '$',
        ],
        rng,
        (k) => '$M' + u.formatCoord3D(x0 + k, y0, z0 + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\beta)$ có phương trình $' + eq + '$. Điểm nào trong các điểm sau thuộc mặt phẳng $(\\beta)$?',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Thay tọa độ từng điểm vào vế trái phương trình mặt phẳng $(\\beta): ' + eq + '$.',
          'Với điểm $A' + u.formatCoord3D(x0, y0, z0) + '$: giá trị vế trái bằng $0$, thỏa mãn phương trình nên $A \\in (\\beta)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B = 0', params: { a: 2, b: 0, c: 2, x0: -4, y0: -3, z0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2', params: { a: 2, b: -1, c: 2, x0: -4, y0: -3, z0: 0 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3): Tìm điểm KHÔNG thuộc mặt phẳng Ax + By + Cz + D = 0
  t12_b14_d03_point_not_on_plane_mc: {
    id: 't12_b14_d03_point_not_on_plane_mc',
    name: 'Tìm điểm không thuộc mặt phẳng cho trước',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho mặt phẳng (α): Ax + By + Cz + D = 0, tìm 1 điểm không thuộc mặt phẳng trong số 4 điểm.',
    conditionSummary: 'A, B, C khác 0 và khác bội tầm thường; 3 điểm đúng thuộc mặt phẳng',
    paramSpecs: [
      { name: 'a', label: 'Hệ số A', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số B', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số C', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'Hoành độ điểm gốc x0', min: -4, max: 4 },
      { name: 'y0', label: 'Tung độ điểm gốc y0', min: -4, max: 4 },
      { name: 'z0', label: 'Cao độ điểm gốc z0', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các hệ số A, B, C phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0, y0, z0 } = params;
      const d = -(a * x0 + b * y0 + c * z0);
      const eq = u.formatPlaneEq(a, b, c, d);
      // 3 distinct points strictly on the plane using nullspace vectors of (a,b,c)
      const p1 = [x0, y0, z0];
      const p2 = [x0 + b, y0 - a, z0];
      const p3 = [x0, y0 + c, z0 - b];
      // 1 point strictly NOT on the plane
      const pBad = [x0, y0, z0 + 2];
      const ans = '$A' + u.formatCoord3D(pBad[0], pBad[1], pBad[2]) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$D' + u.formatCoord3D(p1[0], p1[1], p1[2]) + '$',
          '$G' + u.formatCoord3D(p2[0], p2[1], p2[2]) + '$',
          '$N' + u.formatCoord3D(p3[0], p3[1], p3[2]) + '$',
        ],
        rng,
        (k) => '$K' + u.formatCoord3D(x0 + k * b, y0 - k * a, z0) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(\\alpha)$ có phương trình $' + eq + '$. Điểm nào trong các điểm sau không thuộc mặt phẳng $(\\alpha)$?',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Thay tọa độ các điểm vào phương trình mặt phẳng $(\\alpha): ' + eq + '$.',
          'Ba điểm $D, G, N$ đều làm vế trái bằng $0$; riêng điểm $A' + u.formatCoord3D(pBad[0], pBad[1], pBad[2]) + '$ cho giá trị khác $0$ nên $A \\notin (\\alpha)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên C = 0', params: { a: 3, b: 2, c: 0, x0: 1, y0: 0, z0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3', params: { a: 14, b: 3, c: 4, x0: -3, y0: 0, z0: 1 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4): Viết PT mặt phẳng đi qua điểm D và có VTPT n
  t12_b14_d04_plane_point_normal_mc: {
    id: 't12_b14_d04_plane_point_normal_mc',
    name: 'Viết phương trình mặt phẳng biết một điểm và một vectơ pháp tuyến',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Viết phương trình mặt phẳng (Q) đi qua điểm D(x0; y0; z0) và nhận vectơ n = (a; b; c) làm VTPT.',
    conditionSummary: 'gcd(|a|, |b|, |c|) = 1, a > 0, (x0, y0, z0) không tỉ lệ tầm thường với (a, b, c)',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ VTPT a', min: 1, max: 5 },
      { name: 'b', label: 'Tung độ VTPT b', min: -5, max: 5, allowZero: false },
      { name: 'c', label: 'Cao độ VTPT c', min: -5, max: 5, allowZero: false },
      { name: 'x0', label: 'x0', min: -6, max: 6 },
      { name: 'y0', label: 'y0', min: -6, max: 6 },
      { name: 'z0', label: 'z0', min: -6, max: 6 },
    ],
    validateCode: `
      const { a, b, c, x0, y0, z0 } = params;
      if (a <= 0 || b === 0 || c === 0) return { valid: false, reason: 'Cần a > 0 và b, c khác 0' };
      const g = u.gcd(a, u.gcd(b, c));
      if (g !== 1) return { valid: false, reason: 'Cần gcd(a, b, c) = 1 để phương trình tối giản' };
      if (a * x0 + b * y0 + c * z0 === 0) return { valid: false, reason: 'Tránh D = 0 gây trùng nhiễu đổi dấu D' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0, y0, z0 } = params;
      const d = -(a * x0 + b * y0 + c * z0);
      const ans = '$' + u.formatPlaneEq(a, b, c, d) + '$';
      const eqExp = a + '(' + u.formatShift('x', -x0) + ')' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + '(' + u.formatShift('y', -y0) + ')' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c)) + '(' + u.formatShift('z', -z0) + ') = 0';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + u.formatPlaneEq(a, b, c, -d) + '$',
          '$' + u.formatPlaneEq(a, b, c, d + 2) + '$',
          '$' + u.formatPlaneEq(a, -b, c, d) + '$',
        ],
        rng,
        (k) => '$' + u.formatPlaneEq(a, b, c, d + 2 * k + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(Q)$ đi qua điểm $D' + u.formatCoord3D(x0, y0, z0) + '$ và nhận vectơ $\\vec{n}=' + u.formatCoord3D(a, b, c) + '$ làm vectơ pháp tuyến.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Mặt phẳng $(Q)$ đi qua $D' + u.formatCoord3D(x0, y0, z0) + '$ và có vectơ pháp tuyến $\\vec{n}=' + u.formatCoord3D(a, b, c) + '$ có phương trình:',
          '$' + eqExp + ' \\Leftrightarrow ' + u.formatPlaneEq(a, b, c, d) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên gcd != 1', params: { a: 2, b: -4, c: 2, x0: 1, y0: -1, z0: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { a: 1, b: -3, c: 3, x0: 1, y0: -1, z0: 7 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5): Viết PT mặt phẳng đi qua H và nhận vector IM làm VTPT
  t12_b14_d05_plane_point_vec_ab_mc: {
    id: 't12_b14_d05_plane_point_vec_ab_mc',
    name: 'Viết phương trình mặt phẳng đi qua điểm H và vuông góc với đoạn thẳng IM',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho 3 điểm H, I, M. Viết phương trình mặt phẳng đi qua H và nhận vectơ IM làm VTPT.',
    conditionSummary: 'Vectơ IM khác 0 và tối giản, tích vô hướng IM·OH != 0',
    paramSpecs: [
      { name: 'xH', label: 'xH', min: -5, max: 8 },
      { name: 'yH', label: 'yH', min: -5, max: 6 },
      { name: 'zH', label: 'zH', min: -5, max: 5 },
      { name: 'a', label: 'Hoành độ IM', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Tung độ IM', min: -6, max: 9, allowZero: false },
      { name: 'c', label: 'Cao độ IM', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { xH, yH, zH, a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Các thành phần vectơ IM khác 0' };
      if (u.gcd(a, u.gcd(b, c)) !== 1) return { valid: false, reason: 'Cần gcd(a, b, c) = 1' };
      if (a * xH + b * yH + c * zH === 0) return { valid: false, reason: 'Tránh mặt phẳng đi qua gốc O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xH, yH, zH, a, b, c } = params;
      const xI = 2;
      const yI = 1;
      const zI = 3;
      const xM = xI + a;
      const yM = yI + b;
      const zM = zI + c;
      const d = -(a * xH + b * yH + c * zH);
      const eq = u.formatPlaneEq(a, b, c, d);
      const ans = '$' + eq + '$';
      const eqExp = a + '(' + u.formatShift('x', -xH) + ')' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + '(' + u.formatShift('y', -yH) + ')' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c)) + '(' + u.formatShift('z', -zH) + ') = 0';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + u.formatPlaneEq(a, b, c, -d) + '$',
          '$' + u.formatPlaneEq(a, b, c, d + 2) + '$',
          '$' + u.formatPlaneEq(a, -b, c, d) + '$',
        ],
        rng,
        (k) => '$' + u.formatPlaneEq(a, b, c, d + 2 * k + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(\\beta)$ đi qua điểm $H' + u.formatCoord3D(xH, yH, zH) + '$ và nhận vectơ $\\overrightarrow{IM}$ làm vectơ pháp tuyến với $I' + u.formatCoord3D(xI, yI, zI) + '$ và $M' + u.formatCoord3D(xM, yM, zM) + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Ta có $\\overrightarrow{IM} = ' + u.formatCoord3D(a, b, c) + '$.',
          'Phương trình mặt phẳng $(\\beta)$ là: $' + eqExp + ' \\Leftrightarrow ' + eq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mặt phẳng qua O', params: { xH: 1, yH: 1, zH: 1, a: 1, b: 1, c: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5', params: { xH: 8, yH: 5, zH: 0, a: -5, b: 9, c: 1 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6): Viết PT mặt phẳng đi qua điểm N và vuông góc với một trục tọa độ
  t12_b14_d06_plane_perp_axis_mc: {
    id: 't12_b14_d06_plane_perp_axis_mc',
    name: 'Viết phương trình mặt phẳng qua một điểm và vuông góc với trục tọa độ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Viết phương trình mặt phẳng (P) đi qua điểm N(x0; y0; z0) và vuông góc với trục Ox, Oy hoặc Oz.',
    conditionSummary: 'x0, y0, z0 đều khác 0 và đôi một phân biệt',
    paramSpecs: [
      { name: 'axis', label: 'Trục (0:Ox, 1:Oy, 2:Oz)', min: 0, max: 2 },
      { name: 'x0', label: 'x0', min: -9, max: 9, allowZero: false },
      { name: 'y0', label: 'y0', min: -9, max: 9, allowZero: false },
      { name: 'z0', label: 'z0', min: -16, max: 16, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0 } = params;
      if (x0 === 0 || y0 === 0 || z0 === 0) return { valid: false, reason: 'Các tọa độ phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { axis, x0, y0, z0 } = params;
      const axes = ['Ox', 'Oy', 'Oz'];
      const vecNames = ['\\vec{i}=(1;0;0)', '\\vec{j}=(0;1;0)', '\\vec{k}=(0;0;1)'];
      const eqs = [
        u.formatPlaneEq(1, 0, 0, -x0),
        u.formatPlaneEq(0, 1, 0, -y0),
        u.formatPlaneEq(0, 0, 1, -z0),
      ];
      const ans = '$' + eqs[axis] + '$';
      const others = eqs.filter((_, i) => i !== axis).map((e) => '$' + e + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [...others, '$' + u.formatPlaneEq(1, 1, 0, -(x0 + y0)) + '$'],
        rng,
        (k) => '$' + u.formatPlaneEq(axis === 0 ? 1 : 0, axis === 1 ? 1 : 0, axis === 2 ? 1 : 0, k + 20) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(P)$ đi qua điểm $N' + u.formatCoord3D(x0, y0, z0) + '$ và vuông góc với trục $' + axes[axis] + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Mặt phẳng $(P)$ vuông góc với trục $' + axes[axis] + '$ nên nhận vectơ $' + vecNames[axis] + '$ làm vectơ pháp tuyến.',
          'Vì $(P)$ đi qua $N' + u.formatCoord3D(x0, y0, z0) + '$ nên phương trình của $(P)$ là $' + eqs[axis] + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tọa độ bằng 0', params: { axis: 1, x0: 1, y0: 0, z0: 16 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6', params: { axis: 1, x0: 1, y0: -3, z0: 16 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7): Viết PT mặt phẳng đi qua điểm N và song song với mặt phẳng (β)
  t12_b14_d07_plane_parallel_plane_mc: {
    id: 't12_b14_d07_plane_parallel_plane_mc',
    name: 'Viết phương trình mặt phẳng đi qua điểm N và song song với mặt phẳng cho trước',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho điểm N và mặt phẳng (β): Ax + By + Cz + D0 = 0. Viết phương trình mặt phẳng (α) qua N và song song với (β).',
    conditionSummary: 'N không thuộc (β), gcd(A,B,C) = 1, D mới khác 0',
    paramSpecs: [
      { name: 'a', label: 'A', min: 1, max: 7 },
      { name: 'b', label: 'B', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'C', min: -8, max: 8, allowZero: false },
      { name: 'd0', label: 'D0 của (β)', min: -20, max: 20 },
      { name: 'x0', label: 'xN', min: -5, max: 5 },
      { name: 'y0', label: 'yN', min: -8, max: 5 },
      { name: 'z0', label: 'zN', min: -5, max: 5 },
    ],
    validateCode: `
      const { a, b, c, d0, x0, y0, z0 } = params;
      if (a <= 0 || b === 0 || c === 0) return { valid: false, reason: 'Cần a > 0 và b, c khác 0' };
      if (u.gcd(a, u.gcd(b, c)) !== 1) return { valid: false, reason: 'Cần gcd(a, b, c) = 1' };
      const d = -(a * x0 + b * y0 + c * z0);
      if (d === d0 || d === 0) return { valid: false, reason: 'N không được thuộc (β) và tránh d = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d0, x0, y0, z0 } = params;
      const d = -(a * x0 + b * y0 + c * z0);
      const eqBeta = u.formatPlaneEq(a, b, c, d0);
      const eqAns = u.formatPlaneEq(a, b, c, d);
      const ans = '$' + eqAns + '$';
      const eqExp = a + '(' + u.formatShift('x', -x0) + ')' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + '(' + u.formatShift('y', -y0) + ')' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c)) + '(' + u.formatShift('z', -z0) + ') = 0';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + eqBeta + '$',
          '$' + u.formatPlaneEq(a, b, c, -d) + '$',
          '$' + u.formatPlaneEq(a, -b, c, d) + '$',
        ],
        rng,
        (k) => '$' + u.formatPlaneEq(a, b, c, d + 2 * k + 3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(\\alpha)$ đi qua điểm $N' + u.formatCoord3D(x0, y0, z0) + '$ và song song với mặt phẳng $(\\beta): ' + eqBeta + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Mặt phẳng $(\\alpha)$ song song với $(\\beta)$ nên nhận $\\overrightarrow{n}=' + u.formatCoord3D(a, b, c) + '$ làm vectơ pháp tuyến.',
          'Do $(\\alpha)$ đi qua $N' + u.formatCoord3D(x0, y0, z0) + '$ nên phương trình là: $' + eqExp + ' \\Leftrightarrow ' + eqAns + '$ (thỏa mãn $' + d + ' \\neq ' + d0 + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên N thuộc (β)', params: { a: 1, b: 2, c: 3, d0: -6, x0: 1, y0: 1, z0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7', params: { a: 5, b: 8, c: 7, d0: 57, x0: 3, y0: -8, z0: 1 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8): Mặt phẳng qua điểm M và song song với mặt phẳng tọa độ (Oxy), (Oyz), (Oxz)
  t12_b14_d08_plane_parallel_coord_plane_mc: {
    id: 't12_b14_d08_plane_parallel_coord_plane_mc',
    name: 'Viết phương trình mặt phẳng qua điểm M và song song với mặt phẳng tọa độ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Viết phương trình mặt phẳng (Q) đi qua điểm M và song song với (Oxy), (Oyz) hoặc (Oxz).',
    conditionSummary: 'M không nằm trên mặt phẳng tọa độ tương ứng (tọa độ vuông góc khác 0)',
    paramSpecs: [
      { name: 'planeIdx', label: 'Mặt phẳng (0:Oxy, 1:Oyz, 2:Oxz)', min: 0, max: 2 },
      { name: 'x0', label: 'xM', min: -8, max: 8, allowZero: false },
      { name: 'y0', label: 'yM', min: -8, max: 8, allowZero: false },
      { name: 'z0', label: 'zM', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0 } = params;
      if (x0 === 0 || y0 === 0 || z0 === 0) return { valid: false, reason: 'M không được nằm trên các mặt phẳng tọa độ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { planeIdx, x0, y0, z0 } = params;
      const pNames = ['(Oxy)', '(Oyz)', '(Oxz)'];
      const vecs = ['\\overrightarrow{k}=(0;0;1)', '\\overrightarrow{i}=(1;0;0)', '\\overrightarrow{j}=(0;1;0)'];
      const eqs = [
        u.formatPlaneEq(0, 0, 1, -z0),
        u.formatPlaneEq(1, 0, 0, -x0),
        u.formatPlaneEq(0, 1, 0, -y0),
      ];
      const ans = '$' + eqs[planeIdx] + '$';
      const others = eqs.filter((_, i) => i !== planeIdx).map((e) => '$' + e + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [...others, '$' + u.formatPlaneEq(1, 0, 1, -(x0 + z0)) + '$'],
        rng,
        (k) => '$' + u.formatPlaneEq(0, 0, 1, z0 + k) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, mặt phẳng $(Q)$ qua điểm $M' + u.formatCoord3D(x0, y0, z0) + '$ và song song với mặt phẳng $' + pNames[planeIdx] + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          '$(Q)$ song song với mặt phẳng $' + pNames[planeIdx] + '$ nên nhận vectơ $' + vecs[planeIdx] + '$ làm vectơ pháp tuyến.',
          'Do $(Q)$ đi qua $M' + u.formatCoord3D(x0, y0, z0) + '$ nên phương trình của $(Q)$ là $' + eqs[planeIdx] + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M thuộc (Oxy)', params: { planeIdx: 0, x0: -2, y0: -6, z0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8', params: { planeIdx: 0, x0: -2, y0: -6, z0: 2 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9): Mặt phẳng qua điểm C và chứa một trục tọa độ Ox, Oy hoặc Oz
  t12_b14_d09_plane_through_point_axis_mc: {
    id: 't12_b14_d09_plane_through_point_axis_mc',
    name: 'Viết phương trình mặt phẳng qua điểm C và chứa một trục tọa độ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Tìm phương trình mặt phẳng (R) đi qua điểm C và chứa trục Ox, Oy hoặc Oz bằng tích có hướng.',
    conditionSummary: 'C không nằm trên trục tọa độ được chọn',
    paramSpecs: [
      { name: 'axis', label: 'Trục (0:Ox, 1:Oy, 2:Oz)', min: 0, max: 2 },
      { name: 'x0', label: 'xC', min: -6, max: 6, allowZero: false },
      { name: 'y0', label: 'yC', min: -6, max: 6, allowZero: false },
      { name: 'z0', label: 'zC', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { axis, x0, y0, z0 } = params;
      if (axis === 0 && y0 === 0 && z0 === 0) return { valid: false, reason: 'C thuộc Ox' };
      if (axis === 1 && x0 === 0 && z0 === 0) return { valid: false, reason: 'C thuộc Oy' };
      if (axis === 2 && x0 === 0 && y0 === 0) return { valid: false, reason: 'C thuộc Oz' };
      if (x0 === 0 || y0 === 0 || z0 === 0) return { valid: false, reason: 'Cần tọa độ khác 0 để đa dạng nhiễu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { axis, x0, y0, z0 } = params;
      const axes = ['Ox', 'Oy', 'Oz'];
      const uVecs = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      const uNames = ['\\overrightarrow{i}=(1;0;0)', '\\overrightarrow{j}=(0;1;0)', '\\overrightarrow{k}=(0;0;1)'];
      const uv = uVecs[axis];
      const nx0 = uv[1] * z0 - uv[2] * y0;
      const ny0 = uv[2] * x0 - uv[0] * z0;
      const nz0 = uv[0] * y0 - uv[1] * x0;
      const g = u.gcd(nx0, u.gcd(ny0, nz0));
      let a = nx0 / g, b = ny0 / g, c = nz0 / g;
      if (a < 0 || (a === 0 && b < 0) || (a === 0 && b === 0 && c < 0)) { a = -a; b = -b; c = -c; }
      const eq = u.formatPlaneEq(a, b, c, 0);
      const ans = '$' + eq + '$';
      const f1 = u.formatPlaneEq(a, b, c, 2);
      const f2 = u.formatPlaneEq(a === 0 ? Math.abs(b) || 1 : 0, b === 0 ? Math.abs(c) || 1 : b, c, 0);
      const f3 = u.formatPlaneEq(axis === 0 ? Math.abs(b) || 1 : a, axis === 1 ? Math.abs(c) || 1 : 0, c, 0);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        ['$' + f1 + '$', '$' + f2 + '$', '$' + f3 + '$'],
        rng,
        (k) => '$' + u.formatPlaneEq(a + k, b - k, c, 0) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, mặt phẳng $(R)$ qua điểm $C' + u.formatCoord3D(x0, y0, z0) + '$ và chứa trục $' + axes[axis] + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Ta có $' + uNames[axis] + '$ và $\\overrightarrow{OC}=' + u.formatCoord3D(x0, y0, z0) + '$.',
          '$(R)$ nhận $\\overrightarrow{n} = \\left[' + uNames[axis].split('=')[0] + ', \\overrightarrow{OC}\\right] = ' + u.formatCoord3D(nx0, ny0, nz0) + '$ (cùng phương với $' + u.formatCoord3D(a, b, c) + '$) làm vectơ pháp tuyến.',
          'Vì $(R)$ đi qua $O(0;0;0)$ nên phương trình $(R)$ là $' + eq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên C nằm trên trục', params: { axis: 0, x0: 3, y0: 0, z0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9', params: { axis: 0, x0: -5, y0: 1, z0: -4 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10): Mặt phẳng trung trực của đoạn thẳng AB
  t12_b14_d10_perp_bisector_plane_mc: {
    id: 't12_b14_d10_perp_bisector_plane_mc',
    name: 'Viết phương trình mặt phẳng trung trực của đoạn thẳng AB',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho hai điểm A, B. Xác định trung điểm I và vectơ AB để viết phương trình mặt phẳng trung trực.',
    conditionSummary: 'A khác B; cùng tính chẵn lẻ từng tọa độ để trung điểm I nguyên',
    paramSpecs: [
      { name: 'xA', label: 'xA', min: -6, max: 6 },
      { name: 'yA', label: 'yA', min: -6, max: 6 },
      { name: 'zA', label: 'zA', min: -6, max: 8 },
      { name: 'dx', label: 'Nửa hiệu (xB - xA)/2', min: 1, max: 5 },
      { name: 'dy', label: 'Nửa hiệu (yB - yA)/2', min: -5, max: 5, allowZero: false },
      { name: 'dz', label: 'Nửa hiệu (zB - zA)/2', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { dx, dy, dz, xA, yA, zA } = params;
      if (dx <= 0 || dy === 0 || dz === 0) return { valid: false, reason: 'Cần dx > 0 và dy, dz khác 0' };
      const g = u.gcd(dx, u.gcd(dy, dz));
      const a = dx / g, b = dy / g, c = dz / g;
      const xI = xA + dx, yI = yA + dy, zI = zA + dz;
      const d = -(a * xI + b * yI + c * zI);
      if (d === 0) return { valid: false, reason: 'Tránh d = 0 gây trùng nhiễu -d' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, dx, dy, dz } = params;
      const xB = xA + 2 * dx, yB = yA + 2 * dy, zB = zA + 2 * dz;
      const xI = xA + dx, yI = yA + dy, zI = zA + dz;
      const vx = 2 * dx, vy = 2 * dy, vz = 2 * dz;
      const g = u.gcd(dx, u.gcd(dy, dz));
      const a = dx / g, b = dy / g, c = dz / g;
      const d = -(a * xI + b * yI + c * zI);
      const eq = u.formatPlaneEq(a, b, c, d);
      const ans = '$' + eq + '$';
      const eqExp = a + '(' + u.formatShift('x', -xI) + ')' + (b >= 0 ? ' + ' + b : ' - ' + Math.abs(b)) + '(' + u.formatShift('y', -yI) + ')' + (c >= 0 ? ' + ' + c : ' - ' + Math.abs(c)) + '(' + u.formatShift('z', -zI) + ') = 0';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + u.formatPlaneEq(a, b, c, d - 2) + '$',
          '$' + u.formatPlaneEq(a, -b, c, d) + '$',
          '$' + u.formatPlaneEq(a, b, c, -d) + '$',
        ],
        rng,
        (k) => '$' + u.formatPlaneEq(a, b, c, d + 2 * k + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(R)$ là mặt phẳng trung trực của đoạn thẳng $AB$ với $A' + u.formatCoord3D(xA, yA, zA) + '$ và $B' + u.formatCoord3D(xB, yB, zB) + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Trung điểm đoạn thẳng $AB$ là $I' + u.formatCoord3D(xI, yI, zI) + '$.',
          'Ta có $\\overrightarrow{AB} = ' + u.formatCoord3D(vx, vy, vz) + '$ cùng phương với $\\overrightarrow{n} = ' + u.formatCoord3D(a, b, c) + '$ là một vectơ pháp tuyến của $(R)$.',
          'Mặt phẳng $(R)$ đi qua $I' + u.formatCoord3D(xI, yI, zI) + '$ nên có phương trình: $' + eqExp + ' \\Leftrightarrow ' + eq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mặt phẳng trung trực qua O', params: { xA: -1, yA: -1, zA: -1, dx: 1, dy: 1, dz: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10', params: { xA: -5, yA: 0, zA: 6, dx: 2, dy: 3, dz: 2 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11): Mặt phẳng đi qua ba điểm không thẳng hàng M, B, H
  t12_b14_d11_plane_3_points_mc: {
    id: 't12_b14_d11_plane_3_points_mc',
    name: 'Viết phương trình mặt phẳng đi qua ba điểm không thẳng hàng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho ba điểm M, B, H không thẳng hàng. Viết phương trình mặt phẳng (P) đi qua ba điểm đó.',
    conditionSummary: 'Hai vectơ MB và MH không cùng phương (tích có hướng khác 0)',
    paramSpecs: [
      { name: 'x1', label: 'xM', min: -5, max: 5 },
      { name: 'y1', label: 'yM', min: -8, max: 5 },
      { name: 'z1', label: 'zM', min: -5, max: 7 },
      { name: 'u1', label: 'xB - xM', min: -4, max: 4, allowZero: false },
      { name: 'u2', label: 'yB - yM', min: -3, max: 4, allowZero: false },
      { name: 'v1', label: 'xH - xM', min: 1, max: 8 },
      { name: 'v3', label: 'zH - zM', min: -11, max: -2 },
    ],
    validateCode: `
      const { x1, y1, z1, u1, u2, v1, v3 } = params;
      const u3 = -2;
      const v2 = 3;
      const nx = u2 * v3 - u3 * v2;
      const ny = u3 * v1 - u1 * v3;
      const nz = u1 * v2 - u2 * v1;
      if (nx === 0 && ny === 0 && nz === 0) return { valid: false, reason: 'Ba điểm thẳng hàng' };
      const g = u.gcd(nx, u.gcd(ny, nz));
      let a = nx / g, b = ny / g, c = nz / g;
      if (a < 0 || (a === 0 && b < 0) || (a === 0 && b === 0 && c < 0)) { a = -a; b = -b; c = -c; }
      const d = -(a * x1 + b * y1 + c * z1);
      if (d === 0) return { valid: false, reason: 'Tránh d = 0 để không trùng nhiễu đổi dấu d' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, u1, u2, v1, v3 } = params;
      const u3 = -2, v2 = 3;
      const x2 = x1 + u1, y2 = y1 + u2, z2 = z1 + u3;
      const x3 = x1 + v1, y3 = y1 + v2, z3 = z1 + v3;
      const nx = u2 * v3 - u3 * v2;
      const ny = u3 * v1 - u1 * v3;
      const nz = u1 * v2 - u2 * v1;
      const g = u.gcd(nx, u.gcd(ny, nz));
      let a = nx / g, b = ny / g, c = nz / g;
      if (a < 0 || (a === 0 && b < 0) || (a === 0 && b === 0 && c < 0)) { a = -a; b = -b; c = -c; }
      const d = -(a * x1 + b * y1 + c * z1);
      const eq = u.formatPlaneEq(a, b, c, d);
      const ans = '$' + eq + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + u.formatPlaneEq(a, b, c, -d) + '$',
          '$' + u.formatPlaneEq(a, b, c, d + 4) + '$',
          '$' + u.formatPlaneEq(x1 || 1, y1 || 1, z1 || 1, d) + '$',
        ],
        rng,
        (k) => '$' + u.formatPlaneEq(a, b, c, d + 3 * k + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(P)$ đi qua ba điểm $M' + u.formatCoord3D(x1, y1, z1) + '$, $B' + u.formatCoord3D(x2, y2, z2) + '$ và $H' + u.formatCoord3D(x3, y3, z3) + '$.',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Ta có $\\overrightarrow{MB} = ' + u.formatCoord3D(u1, u2, u3) + '$, $\\overrightarrow{MH} = ' + u.formatCoord3D(v1, v2, v3) + '$.',
          'Mặt phẳng $(P)$ nhận $\\overrightarrow{n} = \\left[\\overrightarrow{MB}, \\overrightarrow{MH}\\right] = ' + u.formatCoord3D(nx, ny, nz) + '$ (cùng phương với $' + u.formatCoord3D(a, b, c) + '$) làm một vectơ pháp tuyến.',
          'Vì $(P)$ đi qua $M' + u.formatCoord3D(x1, y1, z1) + '$ nên phương trình là $' + eq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mặt phẳng qua O', params: { x1: 0, y1: 0, z1: 0, u1: 1, u2: 2, v1: 3, v3: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11', params: { x1: -1, y1: -8, z1: 7, u1: -3, u2: 2, v1: 8, v3: -11 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12): Phương trình mặt phẳng theo đoạn chắn
  t12_b14_d12_intercept_plane_mc: {
    id: 't12_b14_d12_intercept_plane_mc',
    name: 'Viết phương trình mặt phẳng theo đoạn chắn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Cho ba điểm M(a;0;0), B(0;b;0), C(0;0;c) với a, b, c != 0. Xác định phương trình đoạn chắn x/a + y/b + z/c = 1.',
    conditionSummary: 'a, b, c khác 0',
    paramSpecs: [
      { name: 'a', label: 'Giao trục Ox (a)', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Giao trục Oy (b)', min: -8, max: 9, allowZero: false },
      { name: 'c', label: 'Giao trục Oz (c)', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'a, b, c phải khác 0 để tồn tại phương trình đoạn chắn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c } = params;
      const seg = '\\dfrac{x}{' + a + '}+\\dfrac{y}{' + b + '}+\\dfrac{z}{' + c + '}';
      const ans = '$' + seg + '=1$';
      const lin = u.formatPlaneEq(a, b, c, -1).replace(' = 0', '');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + lin.replace(/\\s*-\\s*1$/, '') + '=1$',
          '$' + lin.replace(/\\s*-\\s*1$/, '') + '=0$',
          '$' + seg + '=0$',
        ],
        rng,
        (k) => '$\\dfrac{x}{' + a + '}+\\dfrac{y}{' + b + '}+\\dfrac{z}{' + c + '}=' + (k + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(R)$ đi qua ba điểm $M' + u.formatCoord3D(a, 0, 0) + '$, $B' + u.formatCoord3D(0, b, 0) + '$, $C' + u.formatCoord3D(0, 0, c) + '$. Phương trình mặt phẳng $(R)$ là:',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Áp dụng công thức phương trình mặt phẳng theo đoạn chắn đi qua $(a;0;0),\\,(0;b;0),\\,(0;0;c)$ với $abc \\neq 0$: $\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1$.',
          'Thay số ta được phương trình mặt phẳng $(R)$ là $' + seg + '=1$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 8, c: -4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12', params: { a: 2, b: 8, c: -4 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13): Mặt phẳng qua B và vuông góc đường thẳng dạng chính tắc
  t12_b14_d13_plane_perp_canonical_line_mc: {
    id: 't12_b14_d13_plane_perp_canonical_line_mc',
    name: 'Viết phương trình mặt phẳng qua điểm B và vuông góc với đường thẳng chính tắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Mặt phẳng (R) đi qua điểm B và vuông góc với đường thẳng Δ dạng chính tắc.',
    conditionSummary: 'u1, u2, u3 khác 0, gcd = 1, u1 > 0, mặt phẳng không qua gốc O',
    paramSpecs: [
      { name: 'u1', label: 'u1', min: 1, max: 5 },
      { name: 'u2', label: 'u2', min: -7, max: 7, allowZero: false },
      { name: 'u3', label: 'u3', min: -6, max: 6, allowZero: false },
      { name: 'x0', label: 'xB', min: -7, max: 6 },
      { name: 'y0', label: 'yB', min: -6, max: 6 },
      { name: 'z0', label: 'zB', min: -5, max: 5 },
    ],
    validateCode: `
      const { u1, u2, u3, x0, y0, z0 } = params;
      if (u1 <= 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'Cần u1 > 0 và u2, u3 khác 0' };
      if (u.gcd(u1, u.gcd(u2, u3)) !== 1) return { valid: false, reason: 'Cần gcd(u1, u2, u3) = 1' };
      if (u1 * x0 + u2 * y0 + u3 * z0 === 0) return { valid: false, reason: 'Tránh D = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, x0, y0, z0 } = params;
      const p1 = 1, p2 = 5, p3 = 4;
      const d = -(u1 * x0 + u2 * y0 + u3 * z0);
      const eq = u.formatPlaneEq(u1, u2, u3, d);
      const ans = '$' + eq + '$';
      const lineEq = '\\dfrac{x - ' + p1 + '}{' + u1 + '}=\\dfrac{y - ' + p2 + '}{' + u2 + '}=\\dfrac{z - ' + p3 + '}{' + u3 + '}';
      const eqExp = u1 + '(' + u.formatShift('x', -x0) + ')' + (u2 >= 0 ? ' + ' + u2 : ' - ' + Math.abs(u2)) + '(' + u.formatShift('y', -y0) + ')' + (u3 >= 0 ? ' + ' + u3 : ' - ' + Math.abs(u3)) + '(' + u.formatShift('z', -z0) + ') = 0';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + u.formatPlaneEq(u1, u2, u3, -d) + '$',
          '$' + u.formatPlaneEq(u1, u2, u3, d + 4) + '$',
          '$' + u.formatPlaneEq(x0 || 1, y0 || 1, z0 || 1, d) + '$',
        ],
        rng,
        (k) => '$' + u.formatPlaneEq(u1, u2, u3, d + 2 * k + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, mặt phẳng $(R)$ đi qua điểm $B' + u.formatCoord3D(x0, y0, z0) + '$ và vuông góc với đường thẳng $\\Delta:' + lineEq + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Đường thẳng $\\Delta$ có một vectơ chỉ phương là $\\overrightarrow{u}=' + u.formatCoord3D(u1, u2, u3) + '$. Vì $(R) \\perp \\Delta$ nên $(R)$ nhận $\\overrightarrow{u}$ làm vectơ pháp tuyến.',
          'Phương trình mặt phẳng $(R)$ là: $' + eqExp + ' \\Leftrightarrow ' + eq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u2 = 0', params: { u1: 1, u2: 0, u3: 4, x0: -7, y0: -3, z0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13', params: { u1: 1, u2: -7, u3: 4, x0: -7, y0: -3, z0: 2 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14): Mặt phẳng qua N và vuông góc đường thẳng dạng tham số
  t12_b14_d14_plane_perp_param_line_mc: {
    id: 't12_b14_d14_plane_perp_param_line_mc',
    name: 'Viết phương trình mặt phẳng qua điểm N và vuông góc với đường thẳng tham số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt phẳng',
    description: 'Mặt phẳng (α) đi qua điểm N và vuông góc với đường thẳng Δ cho ở dạng tham số.',
    conditionSummary: 'Vectơ chỉ phương (u1, u2, u3) có gcd = 1, khác 0 từng thành phần, D != 0',
    paramSpecs: [
      { name: 'u1', label: 'u1', min: -5, max: 5, allowZero: false },
      { name: 'u2', label: 'u2', min: -4, max: 4, allowZero: false },
      { name: 'u3', label: 'u3', min: -4, max: 4, allowZero: false },
      { name: 'x0', label: 'xN', min: -6, max: 6 },
      { name: 'y0', label: 'yN', min: -6, max: 7 },
      { name: 'z0', label: 'zN', min: -5, max: 5 },
    ],
    validateCode: `
      const { u1, u2, u3, x0, y0, z0 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 phải khác 0' };
      if (u.gcd(u1, u.gcd(u2, u3)) !== 1) return { valid: false, reason: 'Cần gcd(u1, u2, u3) = 1' };
      if (u1 * x0 + u2 * y0 + u3 * z0 === 0) return { valid: false, reason: 'Tránh D = 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, x0, y0, z0 } = params;
      const d = -(u1 * x0 + u2 * y0 + u3 * z0);
      const eq = u.formatPlaneEq(u1, u2, u3, d);
      const ans = '$' + eq + '$';
      const lx = '3' + u.formatTerm(u1, 't', false);
      const ly = '3' + u.formatTerm(u2, 't', false);
      const lz = '1' + u.formatTerm(u3, 't', false);
      const eqExp = u1 + '(' + u.formatShift('x', -x0) + ')' + (u2 >= 0 ? ' + ' + u2 : ' - ' + Math.abs(u2)) + '(' + u.formatShift('y', -y0) + ')' + (u3 >= 0 ? ' + ' + u3 : ' - ' + Math.abs(u3)) + '(' + u.formatShift('z', -z0) + ') = 0';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + u.formatPlaneEq(u1, u2, u3, -d) + '$',
          '$' + u.formatPlaneEq(u1, u2, u3, d + 1) + '$',
          '$' + u.formatPlaneEq(x0 || 1, y0 || 1, z0 || 1, d) + '$',
        ],
        rng,
        (k) => '$' + u.formatPlaneEq(u1, u2, u3, d + 2 * k + 3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, mặt phẳng $(\\alpha)$ đi qua điểm $N' + u.formatCoord3D(x0, y0, z0) + '$ và vuông góc với đường thẳng $\\Delta:\\left\\{\\begin{array}{l}x = ' + lx + '\\\\ y = ' + ly + '\\\\ z = ' + lz + '\\end{array}\\right.$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Đường thẳng $\\Delta$ có một vectơ chỉ phương là $\\overrightarrow{u}=' + u.formatCoord3D(u1, u2, u3) + '$.',
          'Mặt phẳng $(\\alpha)$ vuông góc với $\\Delta$ và đi qua $N' + u.formatCoord3D(x0, y0, z0) + '$ nên có phương trình: $' + eqExp + ' \\Leftrightarrow ' + eq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mặt phẳng qua O', params: { u1: 1, u2: -1, u3: 0, x0: 1, y0: 1, z0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14', params: { u1: -2, u2: 1, u3: -1, x0: -5, y0: 7, z0: 2 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15): Vị trí tương đối hai mặt phẳng — Cắt và không vuông góc (hệ số chẵn/dễ nhầm tỉ lệ)
  t12_b14_d15_rel_pos_intersect_even_mc: {
    id: 't12_b14_d15_rel_pos_intersect_even_mc',
    name: 'Vị trí tương đối hai mặt phẳng: cắt nhau và không vuông góc (hệ số bội)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Vị trí tương đối hai mặt phẳng',
    description: 'Cho hai mặt phẳng có một số hệ số đối hoặc cùng tỉ lệ, xác định vị trí tương đối (cắt và không vuông góc).',
    conditionSummary: 'n1, n2 không cùng phương và n1·n2 != 0',
    paramSpecs: [
      { name: 'a', label: 'A1', min: 2, max: 8, step: 2 },
      { name: 'b', label: 'B1', min: -10, max: -2, step: 2 },
      { name: 'c', label: 'C1', min: 2, max: 6, step: 2 },
      { name: 'd1', label: 'D1', min: -10, max: -2, step: 2 },
      { name: 'b2', label: 'B2', min: -5, max: 5, allowZero: false },
      { name: 'c2', label: 'C2', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, b, c, b2, c2 } = params;
      if (b2 === 0 || c2 === 0) return { valid: false, reason: 'Cần B2, C2 khác 0' };
      const a2 = -a;
      const crossX = b * c2 - c * b2;
      const crossY = c * a2 - a * c2;
      const crossZ = a * b2 - b * a2;
      if (crossX === 0 && crossY === 0 && crossZ === 0) return { valid: false, reason: 'Hai VTPT cùng phương' };
      if (a * a2 + b * b2 + c * c2 === 0) return { valid: false, reason: 'Hai VTPT vuông góc' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d1, b2, c2 } = params;
      const a2 = -a;
      const d2 = -2;
      const eq1 = u.formatPlaneEq(a, b, c, d1);
      const eq2 = u.formatPlaneEq(a2, b2, c2, d2);
      const dot = a * a2 + b * b2 + c * c2;
      const ans = '$(P)$ và $(\\beta)$ cắt và không vuông góc';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$(P)$ và $(\\beta)$ trùng nhau',
          '$(P)$ song song $(\\beta)$',
          '$(P)$ vuông góc $(\\beta)$',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(P): ' + eq1 + '$ và mặt phẳng $(\\beta): ' + eq2 + '$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          '$(P)$ có vectơ pháp tuyến $\\overrightarrow{n_1}=' + u.formatCoord3D(a, b, c) + '$, $(\\beta)$ có vectơ pháp tuyến $\\overrightarrow{n_2}=' + u.formatCoord3D(a2, b2, c2) + '$.',
          'Vì $\\overrightarrow{n_1}$ và $\\overrightarrow{n_2}$ không cùng phương nên $(P)$ cắt $(\\beta)$.',
          'Ta có $\\overrightarrow{n_1}\\cdot \\overrightarrow{n_2} = ' + dot + ' \\neq 0$ nên $(P)$ và $(\\beta)$ cắt và không vuông góc.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai VTPT vuông góc', params: { a: 2, b: -2, c: 2, d1: -4, b2: 1, c2: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15', params: { a: 6, b: -10, c: 4, d1: -10, b2: -3, c2: -1 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16): Vị trí tương đối hai mặt phẳng — Trùng nhau
  t12_b14_d16_rel_pos_coincident_mc: {
    id: 't12_b14_d16_rel_pos_coincident_mc',
    name: 'Vị trí tương đối hai mặt phẳng: trùng nhau',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối hai mặt phẳng',
    description: 'Nhận biết hai mặt phẳng có phương trình tỉ lệ toàn bộ hệ số (A, B, C, D) là hai mặt phẳng trùng nhau.',
    conditionSummary: 'A, B, C, D khác 0 và k != 0, 1',
    paramSpecs: [
      { name: 'a', label: 'A', min: 2, max: 7 },
      { name: 'b', label: 'B', min: -8, max: -2 },
      { name: 'c', label: 'C', min: -7, max: 7, allowZero: false },
      { name: 'd', label: 'D', min: -6, max: 6, allowZero: false },
      { name: 'k', label: 'Hệ số tỉ lệ k', min: -4, max: -2 },
    ],
    validateCode: `
      const { a, b, c, d, k } = params;
      if (a === 0 || b === 0 || c === 0 || d === 0 || k === 0 || k === 1) {
        return { valid: false, reason: 'Các hệ số và k phải khác 0, k != 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, k } = params;
      const eq1 = u.formatPlaneEq(a, b, c, d);
      const eq2 = u.formatPlaneEq(k * a, k * b, k * c, k * d);
      const ans = '$(P)$ và $(\\gamma)$ trùng nhau';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$(P)$ và $(\\gamma)$ cắt và không vuông góc',
          '$(P)$ vuông góc $(\\gamma)$',
          '$(P)$ song song $(\\gamma)$',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(P): ' + eq1 + '$ và mặt phẳng $(\\gamma): ' + eq2 + '$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Ta có $\\dfrac{' + a + '}{' + (k * a) + '} = \\dfrac{' + b + '}{' + (k * b) + '} = \\dfrac{' + c + '}{' + (k * c) + '} = \\dfrac{' + d + '}{' + (k * d) + '} = ' + u.simplifyFrac(1, k).latex + '$.',
          'Suy ra hai mặt phẳng $(P)$ và $(\\gamma)$ trùng nhau.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên D = 0', params: { a: 6, b: -8, c: -7, d: 0, k: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16', params: { a: 6, b: -8, c: -7, d: -4, k: -3 }, expectedValid: true },
    ],
  },

  // Dạng 17 (Q17): Vị trí tương đối hai mặt phẳng — Song song
  t12_b14_d17_rel_pos_parallel_mc: {
    id: 't12_b14_d17_rel_pos_parallel_mc',
    name: 'Vị trí tương đối hai mặt phẳng: song song',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối hai mặt phẳng',
    description: 'Nhận biết hai mặt phẳng có (A1,B1,C1) tỉ lệ với (A2,B2,C2) nhưng hệ số tự do không cùng tỉ lệ là song song.',
    conditionSummary: 'A, B, C, D1, D2 khác 0 và D2 != k*D1',
    paramSpecs: [
      { name: 'a', label: 'A', min: -8, max: -2 },
      { name: 'b', label: 'B', min: 2, max: 8 },
      { name: 'c', label: 'C', min: 2, max: 8 },
      { name: 'd1', label: 'D1', min: 1, max: 6 },
      { name: 'd2', label: 'D2', min: 7, max: 14 },
      { name: 'k', label: 'Hệ số tỉ lệ k', min: 1, max: 3 },
    ],
    validateCode: `
      const { a, b, c, d1, d2, k } = params;
      if (a === 0 || b === 0 || c === 0 || d1 === 0 || d2 === 0) return { valid: false, reason: 'Các hệ số khác 0' };
      if (d2 === k * d1) return { valid: false, reason: 'Sẽ bị trùng nhau nếu D2 = k*D1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d1, d2, k } = params;
      const eq1 = u.formatPlaneEq(a, b, c, d1);
      const eq2 = u.formatPlaneEq(k * a, k * b, k * c, d2);
      const ans = '$(R)$ song song $(Q)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$(R)$ vuông góc $(Q)$',
          '$(R)$ và $(Q)$ trùng nhau',
          '$(R)$ và $(Q)$ cắt và không vuông góc',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(R): ' + eq1 + '$ và mặt phẳng $(Q): ' + eq2 + '$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Ta có $\\dfrac{' + a + '}{' + (k * a) + '} = \\dfrac{' + b + '}{' + (k * b) + '} = \\dfrac{' + c + '}{' + (k * c) + '} \\neq \\dfrac{' + d1 + '}{' + d2 + '}$.',
          'Vậy hai mặt phẳng $(R)$ và $(Q)$ song song với nhau.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên trùng nhau D2 = k*D1', params: { a: -7, b: 4, c: 5, d1: 2, d2: 4, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17', params: { a: -7, b: 4, c: 5, d1: 2, d2: 8, k: 1 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18): Vị trí tương đối hai mặt phẳng — Vuông góc
  t12_b14_d18_rel_pos_perp_mc: {
    id: 't12_b14_d18_rel_pos_perp_mc',
    name: 'Vị trí tương đối hai mặt phẳng: vuông góc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối hai mặt phẳng',
    description: 'Kiểm tra điều kiện vuông góc n1 · n2 = 0 của hai mặt phẳng trong không gian Oxyz.',
    conditionSummary: 'n1·n2 = 0 và n1, n2 đều khác vectơ 0',
    paramSpecs: [
      { name: 'a1', label: 'A1', min: -8, max: -2 },
      { name: 'b1', label: 'B1', min: 2, max: 9 },
      { name: 'a2', label: 'A2', min: 2, max: 8 },
      { name: 'b2', label: 'B2', min: 2, max: 8 },
      { name: 'd2', label: 'D2', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { a1, b1, a2, b2, d2 } = params;
      if (d2 === 0) return { valid: false, reason: 'D2 khác 0' };
      const prodSum = a1 * a2 + b1 * b2;
      if (prodSum === 0) return { valid: false, reason: 'Cần A1*A2 + B1*B2 != 0 để C1, C2 khác 0' };
      // Pick C1, C2 so C1*C2 = -prodSum
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b1, a2, b2, d2 } = params;
      const target = -(a1 * a2 + b1 * b2);
      // Factor target as c1 * c2 cleanly
      let c1 = 1, c2 = target;
      for (let f = 2; f <= Math.floor(Math.sqrt(Math.abs(target))); f++) {
        if (target % f === 0) {
          c1 = f;
          c2 = target / f;
          break;
        }
      }
      const eq1 = u.formatPlaneEq(a1, b1, c1, 0);
      const eq2 = u.formatPlaneEq(a2, b2, c2, d2);
      const ans = '$(P)$ vuông góc $(Q)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$(P)$ song song $(Q)$',
          '$(P)$ và $(Q)$ trùng nhau',
          '$(P)$ và $(Q)$ cắt và không vuông góc',
        ],
        rng
      );
      const s1 = (a1 < 0 ? '(' + a1 + ')' : a1) + '\\cdot ' + (a2 < 0 ? '(' + a2 + ')' : a2);
      const s2 = (b1 < 0 ? '(' + b1 + ')' : b1) + '\\cdot ' + (b2 < 0 ? '(' + b2 + ')' : b2);
      const s3 = (c1 < 0 ? '(' + c1 + ')' : c1) + '\\cdot ' + (c2 < 0 ? '(' + c2 + ')' : c2);
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(P): ' + eq1 + '$ và mặt phẳng $(Q): ' + eq2 + '$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Hai mặt phẳng có vectơ pháp tuyến lần lượt là $\\overrightarrow{n_P}=' + u.formatCoord3D(a1, b1, c1) + '$ và $\\overrightarrow{n_Q}=' + u.formatCoord3D(a2, b2, c2) + '$.',
          'Ta có $\\overrightarrow{n_P}\\cdot \\overrightarrow{n_Q} = ' + s1 + ' + ' + s2 + ' + ' + s3 + ' = 0$ nên $(P) \\perp (Q)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A1*A2 + B1*B2 = 0', params: { a1: -3, b1: 3, a2: 2, b2: 2, d2: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18', params: { a1: -6, b1: 8, a2: 5, b2: 6, d2: 6 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19): Vị trí tương đối hai mặt phẳng tổng quát — Cắt và không vuông góc
  t12_b14_d19_rel_pos_intersect_general_mc: {
    id: 't12_b14_d19_rel_pos_intersect_general_mc',
    name: 'Vị trí tương đối hai mặt phẳng tổng quát (cắt và không vuông góc)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối hai mặt phẳng',
    description: 'Xét vị trí tương đối của hai mặt phẳng tổng quát có hệ số tự do và VTPT đều khác không.',
    conditionSummary: 'n1, n2 không cùng phương và n1·n2 != 0',
    paramSpecs: [
      { name: 'a1', label: 'A1', min: 2, max: 8 },
      { name: 'b1', label: 'B1', min: -7, max: -1 },
      { name: 'c1', label: 'C1', min: -5, max: -1 },
      { name: 'a2', label: 'A2', min: 3, max: 9 },
      { name: 'b2', label: 'B2', min: 2, max: 9 },
      { name: 'c2', label: 'C2', min: 2, max: 9 },
    ],
    validateCode: `
      const { a1, b1, c1, a2, b2, c2 } = params;
      const cx = b1 * c2 - c1 * b2;
      const cy = c1 * a2 - a1 * c2;
      const cz = a1 * b2 - b1 * a2;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'n1, n2 cùng phương' };
      if (a1 * a2 + b1 * b2 + c1 * c2 === 0) return { valid: false, reason: 'n1, n2 vuông góc' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b1, c1, a2, b2, c2 } = params;
      const eq1 = u.formatPlaneEq(a1, b1, c1, 6);
      const eq2 = u.formatPlaneEq(a2, b2, c2, -7);
      const dot = a1 * a2 + b1 * b2 + c1 * c2;
      const ans = '$(P)$ và $(\\gamma)$ cắt và không vuông góc';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$(P)$ và $(\\gamma)$ trùng nhau',
          '$(P)$ vuông góc $(\\gamma)$',
          '$(P)$ song song $(\\gamma)$',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(P): ' + eq1 + '$ và mặt phẳng $(\\gamma): ' + eq2 + '$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          '$(P)$ có vectơ pháp tuyến $\\overrightarrow{n_1}=' + u.formatCoord3D(a1, b1, c1) + '$, $(\\gamma)$ có vectơ pháp tuyến $\\overrightarrow{n_2}=' + u.formatCoord3D(a2, b2, c2) + '$.',
          '$\\overrightarrow{n_1}$ và $\\overrightarrow{n_2}$ không cùng phương nên $(P)$ cắt $(\\gamma)$.',
          'Mặt khác $\\overrightarrow{n_1}\\cdot \\overrightarrow{n_2} = ' + dot + ' \\neq 0$ nên $(P)$ và $(\\gamma)$ cắt và không vuông góc.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai VTPT vuông góc', params: { a1: 2, b1: -2, c1: -1, a2: 3, b2: 2, c2: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19', params: { a1: 7, b1: -5, c1: -1, a2: 6, b2: 8, c2: 7 }, expectedValid: true },
    ],
  },

  // Dạng 20 (Q20): Khoảng cách từ điểm I đến mặt phẳng (P)
  t12_b14_d20_dist_point_plane_exact_mc: {
    id: 't12_b14_d20_dist_point_plane_exact_mc',
    name: 'Tính khoảng cách từ điểm I đến mặt phẳng (P) (dạng căn thức đúng)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Khoảng cách trong không gian',
    description: 'Cho điểm I và mặt phẳng (P): Ax + By + Cz + D = 0. Tính d(I, (P)) dưới dạng phân số tối giản hoặc căn thức.',
    conditionSummary: 'Điểm I không nằm trên (P), A,B,C khác 0',
    paramSpecs: [
      { name: 'a', label: 'A', min: 1, max: 5 },
      { name: 'b', label: 'B', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'C', min: -4, max: 4, allowZero: false },
      { name: 'd', label: 'D', min: -8, max: 8, allowZero: false },
      { name: 'x0', label: 'xI', min: -5, max: 5 },
      { name: 'y0', label: 'yI', min: -4, max: 6 },
      { name: 'z0', label: 'zI', min: -4, max: 5 },
    ],
    validateCode: `
      const { a, b, c, d, x0, y0, z0 } = params;
      if (b === 0 || c === 0 || d === 0) return { valid: false, reason: 'b, c, d khác 0' };
      const num = Math.abs(a * x0 + b * y0 + c * z0 + d);
      if (num <= 2) return { valid: false, reason: 'Cần tử số > 2 để dễ tạo phương án nhiễu phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d, x0, y0, z0 } = params;
      const numAbs = Math.abs(a * x0 + b * y0 + c * z0 + d);
      const sInt = a * a + b * b + c * c;
      function fmtRadFrac(topNum, sVal) {
        let rad = sVal, sq = 1;
        for (let f = 2; f * f <= rad; f++) {
          while (rad % (f * f) === 0) { rad /= f * f; sq *= f; }
        }
        const fr = u.simplifyFrac(topNum, sq * rad);
        if (rad === 1) return fr.latex;
        const top = (fr.num === 1 ? '' : '' + fr.num) + '\\sqrt{' + rad + '}';
        return fr.den === 1 ? top : '\\frac{' + top + '}{' + fr.den + '}';
      }
      const ansTex = fmtRadFrac(numAbs, sInt);
      const ans = '$' + ansTex + '$';
      const f1 = '$' + u.simplifyFrac(numAbs, sInt).latex + '$';
      const f2 = '$' + fmtRadFrac(Math.max(1, numAbs - 4), sInt) + '$';
      const f3 = '$' + fmtRadFrac(numAbs + 2, sInt + 1) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [f1, f2, f3],
        rng,
        (k) => '$' + fmtRadFrac(numAbs + k, sInt) + '$'
      );
      const eq = u.formatPlaneEq(a, b, c, d);
      const mul = (k, v) => (k < 0 ? '(' + k + ')' : k) + '\\cdot ' + (v < 0 ? '(' + v + ')' : v);
      const numExpr = mul(a, x0) + ' + ' + mul(b, y0) + ' + ' + mul(c, z0) + (d >= 0 ? ' + ' + d : ' - ' + Math.abs(d));
      return {
        stem: 'Trong không gian $Oxyz$, cho điểm $I' + u.formatCoord3D(x0, y0, z0) + '$ và mặt phẳng $(P): ' + eq + '$. Khoảng cách từ điểm $I$ đến mặt phẳng $(P)$ bằng:',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Khoảng cách từ điểm $I' + u.formatCoord3D(x0, y0, z0) + '$ đến mặt phẳng $(P): ' + eq + '$ là:',
          '$d(I,(P)) = \\dfrac{|' + numExpr + '|}{\\sqrt{' + (a * a) + ' + ' + (b * b) + ' + ' + (c * c) + '}} = \\dfrac{' + numAbs + '}{\\sqrt{' + sInt + '}} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên I thuộc (P)', params: { a: 3, b: -2, c: 2, d: -3, x0: 1, y0: 1, z0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20', params: { a: 3, b: -2, c: 2, d: -4, x0: -2, y0: 6, z0: 1 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21): Khoảng cách giữa hai mặt phẳng song song (R) và (Q)
  t12_b14_d21_dist_parallel_planes_mc: {
    id: 't12_b14_d21_dist_parallel_planes_mc',
    name: 'Tính khoảng cách giữa hai mặt phẳng song song',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Khoảng cách trong không gian',
    description: 'Cho hai mặt phẳng song song (R) và (Q) có hệ số tỉ lệ k != 1. Tính khoảng cách giữa hai mặt phẳng.',
    conditionSummary: 'a,b,c không đồng thời bằng 0, k != 0, 1, |k*d1 - d2| > 0',
    paramSpecs: [
      { name: 'a', label: 'A', min: 1, max: 3 },
      { name: 'b', label: 'B', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'C', min: -3, max: 3, allowZero: false },
      { name: 'd1', label: 'D1', min: 1, max: 6 },
      { name: 'k', label: 'Hệ số tỉ lệ âm k', min: -3, max: -2 },
      { name: 'diff', label: 'Độ lệch tử số |k*d1 - d2|', min: 1, max: 5 },
    ],
    validateCode: `
      const { a, b, c, k, diff } = params;
      if (b === 0 || c === 0 || k >= 0 || diff <= 0) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d1, k, diff } = params;
      const d2 = k * d1 + diff;
      const absK = Math.abs(k);
      const sInt = a * a + b * b + c * c;
      function fmtRadDiv(topNum, denExtra, sVal) {
        let rad = sVal, sq = 1;
        for (let f = 2; f * f <= rad; f++) {
          while (rad % (f * f) === 0) { rad /= f * f; sq *= f; }
        }
        const fr = u.simplifyFrac(topNum, denExtra * sq * rad);
        if (rad === 1) return fr.latex;
        const top = (fr.num === 1 ? '' : '' + fr.num) + '\\sqrt{' + rad + '}';
        return fr.den === 1 ? top : '\\frac{' + top + '}{' + fr.den + '}';
      }
      const ansTex = fmtRadDiv(diff, absK, sInt);
      const ans = '$' + ansTex + '$';
      const eqR = u.formatPlaneEq(a, b, c, d1);
      const eqQ = u.formatPlaneEq(k * a, k * b, k * c, d2);
      const d2Scaled = u.simplifyFrac(d2, k);
      const eqQNorm = u.formatPlaneEq(a, b, c, 0).replace(' = 0', '') + (d2Scaled.value >= 0 ? ' + ' + d2Scaled.latex.replace('-', '') : ' - ' + d2Scaled.latex.replace('-', '')) + ' = 0';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        ans,
        [
          '$' + fmtRadDiv(diff * 2, absK, sInt) + '$',
          '$' + u.simplifyFrac(diff, absK * sInt).latex + '$',
          '$' + fmtRadDiv(diff + 1, absK, sInt) + '$',
        ],
        rng,
        (idx) => '$' + fmtRadDiv(diff + idx + 2, absK, sInt) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt phẳng $(R): ' + eqR + '$ và mặt phẳng $(Q): ' + eqQ + '$. Khoảng cách giữa hai mặt phẳng đã cho bằng:',
        options,
        correctIndex,
        answerSummary: ans,
        solutionSteps: [
          'Chia hai vế phương trình $(Q)$ cho $' + k + '$ ta được $(Q): ' + eqQNorm + '$.',
          'Nhận thấy $(R) \\parallel (Q)$ nên $d((R),(Q)) = \\dfrac{\\left|' + d1 + ' - \\left(' + d2Scaled.latex + '\\right)\\right|}{\\sqrt{' + (a * a) + ' + ' + (b * b) + ' + ' + (c * c) + '}} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên diff = 0 (trùng nhau)', params: { a: 1, b: -4, c: 1, d1: 3, k: -2, diff: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21', params: { a: 1, b: -4, c: 1, d1: 3, k: -2, diff: 1 }, expectedValid: true },
    ],
  },
};
