import { MathTemplate } from '../types/math';

export const G12_B16_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Khoảng cách từ điểm P đến mặt phẳng (MED) trong hình lập phương ABCD.MNPQ
  t12_b16_d01_cube_point_plane_dist_sa: {
    id: 't12_b16_d01_cube_point_plane_dist_sa',
    name: 'Khoảng cách từ đỉnh đến mặt phẳng chéo qua trung điểm cạnh đáy hình lập phương',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách từ điểm đến mặt phẳng',
    description:
      'Cho hình lập phương ABCD.MNPQ cạnh a, E là trung điểm AB. Tính khoảng cách từ P đến mặt phẳng (MED) bằng phương pháp tọa độ Oxyz (làm tròn đến hàng phần trăm).',
    conditionSummary: 'Cạnh hình lập phương a ≥ 2 và tránh giá trị làm tròn sát biên .xx5',
    paramSpecs: [{ name: 'a', label: 'Cạnh hình lập phương a', min: 2, max: 14 }],
    validateCode: `
      const { a } = params;
      if (a < 2) return { valid: false, reason: 'Cạnh hình lập phương phải a >= 2' };
      const val = (a * Math.sqrt(6)) / 2;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a } = params;
      const eCoord = u.simplifyFrac(a, 2);
      const val = (a * Math.sqrt(6)) / 2;
      const rounded = Number(val.toFixed(2));
      const shortAnswer = u.formatNumberVN(rounded, 2);
      const halfAFrac = u.simplifyFrac(a, 2);
      const planeEq = u.formatPlaneEq(2, 1, 1, -a);
      const exactFrac = u.simplifyFrac(a, 2);
      const exactSqrt = exactFrac.isInteger
        ? (exactFrac.num === 1 ? '\\sqrt{6}' : exactFrac.num + '\\sqrt{6}')
        : '\\dfrac{' + a + '\\sqrt{6}}{2}';
      return {
        stem:
          'Cho hình lập phương $ABCD.MNPQ$ có cạnh bằng $' +
          a +
          '$. Gọi $E$ là trung điểm của đoạn thẳng $AB$. Khoảng cách từ điểm $P$ đến mặt phẳng $(MED)$ bằng bao nhiêu (không làm tròn kết quả các phép tính trung gian, chỉ làm tròn kết quả cuối cùng đến hàng phần trăm)?',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chọn hệ trục tọa độ $Oxyz$ với $A(0;\\, 0;\\, 0)$, $B(' + a + ';\\, 0;\\, 0)$, $D(0;\\, ' + a + ';\\, 0)$, $M(0;\\, 0;\\, ' + a + ')$.',
          'Khi đó $E\\left(' + eCoord.latex + ';\\, 0;\\, 0\\right)$ và $P' + u.formatCoord3D(a, a, a) + '$.',
          'Ta có $\\overrightarrow{ME} = \\left(' + eCoord.latex + ';\\, 0;\\, -' + a + '\\right)$, $\\overrightarrow{MD} = (0;\\, ' + a + ';\\, -' + a + ')$.',
          'Một vectơ pháp tuyến của mặt phẳng $(MED)$ là $\\vec{n} = (2;\\, 1;\\, 1)$ (cùng phương với $[\\overrightarrow{ME}, \\overrightarrow{MD}]$).',
          'Mặt phẳng $(MED)$ đi qua $D(0;\\, ' + a + ';\\, 0)$ nên có phương trình là $' + planeEq + '$.',
          'Khoảng cách từ $P$ đến $(MED)$ là $d(P, (MED)) = \\dfrac{|2\\cdot ' + a + ' + ' + a + ' + ' + a + ' - ' + a + '|}{\\sqrt{2^2 + 1^2 + 1^2}} = \\dfrac{' + 3 * a + '}{\\sqrt{6}} = ' + exactSqrt + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh a = 1 (< 2)', params: { a: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (a = 4)', params: { a: 4 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Khoảng cách giữa BD và CD' trong hình hộp chữ nhật đáy vuông
  t12_b16_d02_cuboid_dist_bd_cd1_sa: {
    id: 't12_b16_d02_cuboid_dist_bd_cd1_sa',
    name: "Khoảng cách giữa hai đường thẳng chéo nhau BD và CD' trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách giữa hai đường thẳng chéo nhau',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' có đáy là hình vuông cạnh a, chiều cao AA' = h. Tính khoảng cách giữa BD và CD' bằng tọa độ Axyz.",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const val = (a * h) / Math.sqrt(a * a + 2 * h * h);
      if (Math.abs(((val * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const denomSq = a * a + 2 * h * h;
      const val = (a * h) / Math.sqrt(denomSq);
      const rounded = Number(val.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính khoảng cách giữa hai đường thẳng $BD$ và $CD'$ (kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Chọn hệ trục tọa độ $Axyz$ sao cho $B$ thuộc tia $Ax$, $D$ thuộc tia $Ay$, $A'$ thuộc tia $Az$.",
          "Ta có $A(0;\\, 0;\\, 0)$, $B(" + a + ";\\, 0;\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $D'(0;\\, " + a + ";\\, " + h + ")$.",
          "Suy ra $\\overrightarrow{BD} = (-" + a + ";\\, " + a + ";\\, 0)$, $\\overrightarrow{CD'} = (-" + a + ";\\, 0;\\, " + h + ")$ và $\\overrightarrow{BC} = (0;\\, " + a + ";\\, 0)$.",
          'Ta có $[\\overrightarrow{BD}, \\overrightarrow{CD\'}] = (' + (a * h) + ';\\, ' + (a * h) + ';\\, ' + (a * a) + ')$.',
          'Khoảng cách cần tìm: $d(BD, CD\') = \\dfrac{|[\\overrightarrow{BD}, \\overrightarrow{CD\'}] \\cdot \\overrightarrow{BC}|}{|[\\overrightarrow{BD}, \\overrightarrow{CD\'}]|} = \\dfrac{' + (a * a * h) + '}{\\sqrt{' + (a * a * denomSq) + '}} = \\dfrac{' + (a * h) + '}{\\sqrt{' + denomSq + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { a: 4, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (a = 4, h = 3)', params: { a: 4, h: 3 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Khoảng cách giữa AC và BC' trong hình hộp chữ nhật đáy vuông
  t12_b16_d03_cuboid_dist_ac_bc1_sa: {
    id: 't12_b16_d03_cuboid_dist_ac_bc1_sa',
    name: "Khoảng cách giữa hai đường thẳng chéo nhau AC và BC' trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng cách giữa hai đường thẳng chéo nhau',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' có đáy là hình vuông cạnh a, AA' = h. Tính khoảng cách giữa AC và BC' bằng tọa độ Axyz.",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const val = (a * h) / Math.sqrt(a * a + 2 * h * h);
      if (Math.abs(((val * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const denomSq = a * a + 2 * h * h;
      const val = (a * h) / Math.sqrt(denomSq);
      const rounded = Number(val.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính khoảng cách giữa hai đường thẳng $AC$ và $BC'$ (kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Chọn hệ trục tọa độ $Axyz$ sao cho $B$ thuộc tia $Ax$, $D$ thuộc tia $Ay$, $A'$ thuộc tia $Az$.",
          "Ta có $A(0;\\, 0;\\, 0)$, $B(" + a + ";\\, 0;\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $C'(" + a + ";\\, " + a + ";\\, " + h + ")$.",
          "Suy ra $\\overrightarrow{AC} = (" + a + ";\\, " + a + ";\\, 0)$, $\\overrightarrow{BC'} = (0;\\, " + a + ";\\, " + h + ")$ và $\\overrightarrow{AB} = (" + a + ";\\, 0;\\, 0)$.",
          'Ta có $[\\overrightarrow{AC}, \\overrightarrow{BC\'}] = (' + (a * h) + ';\\, ' + (-a * h) + ';\\, ' + (a * a) + ')$.',
          'Vậy $d(AC, BC\') = \\dfrac{|[\\overrightarrow{AC}, \\overrightarrow{BC\'}] \\cdot \\overrightarrow{AB}|}{|[\\overrightarrow{AC}, \\overrightarrow{BC\'}]|} = \\dfrac{' + (a * a * h) + '}{\\sqrt{' + (a * a * denomSq) + '}} = \\dfrac{' + (a * h) + '}{\\sqrt{' + denomSq + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh đáy a = 0', params: { a: 0, h: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (a = 4, h = 4)', params: { a: 4, h: 4 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Khoảng cách giữa A'B và B'D trong hình hộp chữ nhật đáy vuông
  t12_b16_d04_cuboid_dist_a1b_b1d_sa: {
    id: 't12_b16_d04_cuboid_dist_a1b_b1d_sa',
    name: "Khoảng cách giữa hai đường thẳng chéo nhau A'B và B'D trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách giữa hai đường thẳng chéo nhau',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' có đáy là hình vuông cạnh a, AA' = h. Tính khoảng cách giữa A'B và B'D bằng tọa độ Axyz.",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const val = (a * h) / Math.sqrt(a * a + 5 * h * h);
      if (Math.abs(((val * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const denomSq = a * a + 5 * h * h;
      const val = (a * h) / Math.sqrt(denomSq);
      const rounded = Number(val.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính khoảng cách giữa hai đường thẳng $A'B$ và $B'D$ (kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Chọn hệ trục tọa độ $Axyz$ sao cho $B$ thuộc tia $Ax$, $D$ thuộc tia $Ay$, $A'$ thuộc tia $Az$.",
          "Ta có $B(" + a + ";\\, 0;\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $A'(0;\\, 0;\\, " + h + ")$, $B'(" + a + ";\\, 0;\\, " + h + ")$.",
          "Suy ra $\\overrightarrow{A'B} = (" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{B'D} = (-" + a + ";\\, " + a + ";\\, -" + h + ")$ và $\\overrightarrow{BD} = (-" + a + ";\\, " + a + ";\\, 0)$.",
          'Ta có $[\\overrightarrow{A\'B}, \\overrightarrow{B\'D}] = (' + (a * h) + ';\\, ' + (2 * a * h) + ';\\, ' + (a * a) + ')$.',
          'Vậy $d(A\'B, B\'D) = \\dfrac{|[\\overrightarrow{A\'B}, \\overrightarrow{B\'D}] \\cdot \\overrightarrow{BD}|}{|[\\overrightarrow{A\'B}, \\overrightarrow{B\'D}]|} = \\dfrac{' + (a * a * h) + '}{\\sqrt{' + (a * a * denomSq) + '}} = \\dfrac{' + (a * h) + '}{\\sqrt{' + denomSq + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { a: 4, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (a = 4, h = 2)', params: { a: 4, h: 2 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Khoảng cách giữa C'D và BD' trong hình hộp chữ nhật đáy vuông
  t12_b16_d05_cuboid_dist_c1d_bd1_sa: {
    id: 't12_b16_d05_cuboid_dist_c1d_bd1_sa',
    name: "Khoảng cách giữa hai đường thẳng chéo nhau C'D và BD' trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách giữa hai đường thẳng chéo nhau',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' có đáy là hình vuông cạnh a, AA' = h. Tính khoảng cách giữa C'D và BD' bằng tọa độ Axyz.",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const val = (a * h) / Math.sqrt(a * a + 5 * h * h);
      if (Math.abs(((val * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const denomSq = a * a + 5 * h * h;
      const val = (a * h) / Math.sqrt(denomSq);
      const rounded = Number(val.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính khoảng cách giữa hai đường thẳng $C'D$ và $BD'$ (kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Chọn hệ trục tọa độ $Axyz$ sao cho $B$ thuộc tia $Ax$, $D$ thuộc tia $Ay$, $A'$ thuộc tia $Az$.",
          "Ta có $B(" + a + ";\\, 0;\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $C'(" + a + ";\\, " + a + ";\\, " + h + ")$, $D'(0;\\, " + a + ";\\, " + h + ")$.",
          "Suy ra $\\overrightarrow{C'D} = (-" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{BD'} = (-" + a + ";\\, " + a + ";\\, " + h + ")$ và $\\overrightarrow{BD} = (-" + a + ";\\, " + a + ";\\, 0)$.",
          'Ta có $[\\overrightarrow{C\'D}, \\overrightarrow{BD\'}] = (' + (a * h) + ';\\, ' + (2 * a * h) + ';\\, ' + (-a * a) + ')$.',
          'Vậy $d(C\'D, BD\') = \\dfrac{|[\\overrightarrow{C\'D}, \\overrightarrow{BD\'}] \\cdot \\overrightarrow{BD}|}{|[\\overrightarrow{C\'D}, \\overrightarrow{BD\'}]|} = \\dfrac{' + (a * a * h) + '}{\\sqrt{' + (a * a * denomSq) + '}} = \\dfrac{' + (a * h) + '}{\\sqrt{' + denomSq + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh đáy a = 0', params: { a: 0, h: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (a = 5, h = 6)', params: { a: 5, h: 6 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Góc giữa hai đường thẳng BD và CD' trong hình hộp chữ nhật
  t12_b16_d06_cuboid_angle_bd_cd1_sa: {
    id: 't12_b16_d06_cuboid_angle_bd_cd1_sa',
    name: "Tính góc giữa hai đường thẳng BD và CD' trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai đường thẳng trong không gian',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa BD và CD' (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const cosVal = a / Math.sqrt(2 * (a * a + h * h));
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const cosVal = a / Math.sqrt(2 * (a * a + h * h));
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cosStr = u.formatNumberVN(Number(cosVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa hai đường thẳng $BD$ và $CD'$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Chọn hệ trục tọa độ $Axyz$ sao cho $B$ thuộc tia $Ax$, $D$ thuộc tia $Ay$, $A'$ thuộc tia $Az$.",
          "Ta có $B(" + a + ";\\, 0;\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $D'(0;\\, " + a + ";\\, " + h + ")$.",
          "Suy ra $\\overrightarrow{BD} = (-" + a + ";\\, " + a + ";\\, 0)$, $\\overrightarrow{CD'} = (-" + a + ";\\, 0;\\, " + h + ")$.",
          '$\\cos(BD, CD\') = \\dfrac{|\\overrightarrow{BD} \\cdot \\overrightarrow{CD\'}|}{|\\overrightarrow{BD}| \\cdot |\\overrightarrow{CD\'}|} = \\dfrac{' + (a * a) + '}{\\sqrt{' + (2 * a * a) + '} \\cdot \\sqrt{' + (a * a + h * h) + '}} \\approx ' + cosStr + '$.',
          '$\\Rightarrow (BD, CD\') \\approx ' + shortAnswer + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 0', params: { a: 2, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (a = 1, h = 6)', params: { a: 1, h: 6 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Góc giữa hai đường thẳng AC và BC' trong hình hộp chữ nhật
  t12_b16_d07_cuboid_angle_ac_bc1_sa: {
    id: 't12_b16_d07_cuboid_angle_ac_bc1_sa',
    name: "Tính góc giữa hai đường thẳng AC và BC' trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai đường thẳng trong không gian',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa AC và BC' (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const cosVal = a / Math.sqrt(2 * (a * a + h * h));
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const cosVal = a / Math.sqrt(2 * (a * a + h * h));
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cosStr = u.formatNumberVN(Number(cosVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa hai đường thẳng $AC$ và $BC'$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Chọn hệ trục tọa độ $Axyz$ sao cho $B$ thuộc tia $Ax$, $D$ thuộc tia $Ay$, $A'$ thuộc tia $Az$.",
          "Ta có $A(0;\\, 0;\\, 0)$, $B(" + a + ";\\, 0;\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $C'(" + a + ";\\, " + a + ";\\, " + h + ")$.",
          "Suy ra $\\overrightarrow{AC} = (" + a + ";\\, " + a + ";\\, 0)$, $\\overrightarrow{BC'} = (0;\\, " + a + ";\\, " + h + ")$.",
          '$\\cos(AC, BC\') = \\dfrac{|\\overrightarrow{AC} \\cdot \\overrightarrow{BC\'}|}{|\\overrightarrow{AC}| \\cdot |\\overrightarrow{BC\'}|} = \\dfrac{' + (a * a) + '}{\\sqrt{' + (2 * a * a) + '} \\cdot \\sqrt{' + (a * a + h * h) + '}} \\approx ' + cosStr + '$.',
          '$\\Rightarrow (AC, BC\') \\approx ' + shortAnswer + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, h: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (a = 4, h = 2)', params: { a: 4, h: 2 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Góc giữa hai đường thẳng A'B và B'D trong hình hộp chữ nhật
  t12_b16_d08_cuboid_angle_a1b_b1d_sa: {
    id: 't12_b16_d08_cuboid_angle_a1b_b1d_sa',
    name: "Tính góc giữa hai đường thẳng A'B và B'D trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai đường thẳng trong không gian',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa A'B và B'D (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0, a ≠ h và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      if (a === h) return { valid: false, reason: 'a = h làm hai đường thẳng vuông góc (90°)' };
      const cosVal = Math.abs(h * h - a * a) / Math.sqrt((a * a + h * h) * (2 * a * a + h * h));
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const dotAbs = Math.abs(h * h - a * a);
      const len1Sq = a * a + h * h;
      const len2Sq = 2 * a * a + h * h;
      const cosVal = dotAbs / Math.sqrt(len1Sq * len2Sq);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cosStr = u.formatNumberVN(Number(cosVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa hai đường thẳng $A'B$ và $B'D$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Chọn hệ trục tọa độ $Axyz$ sao cho $B$ thuộc tia $Ax$, $D$ thuộc tia $Ay$, $A'$ thuộc tia $Az$.",
          "Ta có $B(" + a + ";\\, 0;\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $A'(0;\\, 0;\\, " + h + ")$, $B'(" + a + ";\\, 0;\\, " + h + ")$.",
          "Suy ra $\\overrightarrow{A'B} = (" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{B'D} = (-" + a + ";\\, " + a + ";\\, -" + h + ")$.",
          '$\\cos(A\'B, B\'D) = \\dfrac{|\\overrightarrow{A\'B} \\cdot \\overrightarrow{B\'D}|}{|\\overrightarrow{A\'B}| \\cdot |\\overrightarrow{B\'D}|} = \\dfrac{' + dotAbs + '}{\\sqrt{' + len1Sq + '} \\cdot \\sqrt{' + len2Sq + '}} \\approx ' + cosStr + '$.',
          '$\\Rightarrow (A\'B, B\'D) \\approx ' + shortAnswer + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = h (vuông góc 90°)', params: { a: 4, h: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (a = 5, h = 1)', params: { a: 5, h: 1 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Góc giữa hai đường thẳng C'D và BD' trong hình hộp chữ nhật
  t12_b16_d09_cuboid_angle_c1d_bd1_sa: {
    id: 't12_b16_d09_cuboid_angle_c1d_bd1_sa',
    name: "Tính góc giữa hai đường thẳng C'D và BD' trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai đường thẳng trong không gian',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa C'D và BD' (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0, a ≠ h và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      if (a === h) return { valid: false, reason: 'a = h làm hai đường thẳng vuông góc (90°)' };
      const cosVal = Math.abs(a * a - h * h) / Math.sqrt((a * a + h * h) * (2 * a * a + h * h));
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const dotAbs = Math.abs(a * a - h * h);
      const len1Sq = a * a + h * h;
      const len2Sq = 2 * a * a + h * h;
      const cosVal = dotAbs / Math.sqrt(len1Sq * len2Sq);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cosStr = u.formatNumberVN(Number(cosVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa hai đường thẳng $C'D$ và $BD'$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Chọn hệ trục tọa độ $Axyz$ sao cho $B$ thuộc tia $Ax$, $D$ thuộc tia $Ay$, $A'$ thuộc tia $Az$.",
          "Ta có $B(" + a + ";\\, 0;\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $C'(" + a + ";\\, " + a + ";\\, " + h + ")$, $D'(0;\\, " + a + ";\\, " + h + ")$.",
          "Suy ra $\\overrightarrow{C'D} = (-" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{BD'} = (-" + a + ";\\, " + a + ";\\, " + h + ")$.",
          '$\\cos(C\'D, BD\') = \\dfrac{|\\overrightarrow{C\'D} \\cdot \\overrightarrow{BD\'}|}{|\\overrightarrow{C\'D}| \\cdot |\\overrightarrow{BD\'}|} = \\dfrac{' + dotAbs + '}{\\sqrt{' + len1Sq + '} \\cdot \\sqrt{' + len2Sq + '}} \\approx ' + cosStr + '$.',
          '$\\Rightarrow (C\'D, BD\') \\approx ' + shortAnswer + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = h (vuông góc 90°)', params: { a: 3, h: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (a = 4, h = 5)', params: { a: 4, h: 5 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Góc giữa hai mặt phẳng (A'BC') và (B'CD) trong hình hộp chữ nhật
  t12_b16_d10_cuboid_angle_planes_1_sa: {
    id: 't12_b16_d10_cuboid_angle_planes_1_sa',
    name: "Tính góc giữa hai mặt phẳng (A'BC') và (B'CD) trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Góc giữa hai mặt phẳng trong không gian',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa hai mặt phẳng (A'BC') và (B'CD) (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const cosVal = Math.abs(a * a - h * h) / Math.sqrt((a * a + 2 * h * h) * (a * a + h * h));
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const n1x = a * h, n1y = -a * h, n1z = a * a;
      const n2x = 0, n2y = a * h, n2z = a * a;
      const dotAbs = Math.abs(n1x * n2x + n1y * n2y + n1z * n2z);
      const l1Sq = n1x * n1x + n1y * n1y + n1z * n1z;
      const l2Sq = n2x * n2x + n2y * n2y + n2z * n2z;
      const cosVal = dotAbs / Math.sqrt(l1Sq * l2Sq);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cosStr = u.formatNumberVN(Number(cosVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa hai mặt phẳng $(A'BC')$ và $(B'CD)$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Gọi $\\alpha$ là góc giữa hai mặt phẳng. Chọn hệ trục tọa độ $Axyz$ với $A'(0;\\, 0;\\, " + h + ")$, $B(" + a + ";\\, 0;\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $B'(" + a + ";\\, 0;\\, " + h + ")$, $C'(" + a + ";\\, " + a + ";\\, " + h + ")$.",
          "Ta có $\\overrightarrow{A'B} = (" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{A'C'} = (" + a + ";\\, " + a + ";\\, 0) \\Rightarrow \\overrightarrow{n_1} = [\\overrightarrow{A'B}, \\overrightarrow{A'C'}] = " + u.formatCoord3D(n1x, n1y, n1z) + "$.",
          "Ta có $\\overrightarrow{B'C} = (0;\\, " + a + ";\\, -" + h + ")$, $\\overrightarrow{CD} = (-" + a + ";\\, 0;\\, 0) \\Rightarrow \\overrightarrow{n_2} = [\\overrightarrow{B'C}, \\overrightarrow{CD}] = " + u.formatCoord3D(n2x, n2y, n2z) + "$.",
          '$\\cos\\alpha = \\dfrac{|\\overrightarrow{n_1} \\cdot \\overrightarrow{n_2}|}{|\\overrightarrow{n_1}| \\cdot |\\overrightarrow{n_2}|} = \\dfrac{' + dotAbs + '}{\\sqrt{' + l1Sq + '} \\cdot \\sqrt{' + l2Sq + '}}' + (dotAbs === 0 ? ' = 0' : ' \\approx ' + cosStr) + '$.',
          '$\\Rightarrow \\alpha ' + (dotAbs === 0 ? '= 90' : '\\approx ' + shortAnswer) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { a: 3, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (a = 3, h = 3 -> 90°)', params: { a: 3, h: 3 }, expectedValid: true },
      { label: 'Biên a ≠ h (a = 4, h = 3)', params: { a: 4, h: 3 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Góc giữa hai mặt phẳng (A'BC) và (B'AD) trong hình hộp chữ nhật
  t12_b16_d11_cuboid_angle_planes_2_sa: {
    id: 't12_b16_d11_cuboid_angle_planes_2_sa',
    name: "Tính góc giữa hai mặt phẳng (A'BC) và (B'AD) trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Góc giữa hai mặt phẳng trong không gian',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa hai mặt phẳng (A'BC) và (B'AD) (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const cosVal = Math.abs(h * h - a * a) / (a * a + h * h);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const n1x = a * h, n1y = 0, n1z = a * a;
      const n2x = a * h, n2y = 0, n2z = -a * a;
      const dotAbs = Math.abs(n1x * n2x + n1y * n2y + n1z * n2z);
      const l1Sq = n1x * n1x + n1y * n1y + n1z * n1z;
      const l2Sq = n2x * n2x + n2y * n2y + n2z * n2z;
      const cosVal = dotAbs / Math.sqrt(l1Sq * l2Sq);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cosStr = u.formatNumberVN(Number(cosVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa hai mặt phẳng $(A'BC)$ và $(B'AD)$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Gọi $\\alpha$ là góc giữa hai mặt phẳng. Chọn hệ trục tọa độ $Axyz$ với $A(0;\\, 0;\\, 0)$, $B(" + a + ";\\, 0;\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $A'(0;\\, 0;\\, " + h + ")$, $B'(" + a + ";\\, 0;\\, " + h + ")$.",
          "Ta có $\\overrightarrow{A'B} = (" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{A'C} = (" + a + ";\\, " + a + ";\\, -" + h + ") \\Rightarrow \\overrightarrow{n_1} = [\\overrightarrow{A'B}, \\overrightarrow{A'C}] = " + u.formatCoord3D(n1x, n1y, n1z) + "$.",
          "Ta có $\\overrightarrow{B'A} = (-" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{B'D} = (-" + a + ";\\, " + a + ";\\, -" + h + ") \\Rightarrow \\overrightarrow{n_2} = [\\overrightarrow{B'A}, \\overrightarrow{B'D}] = " + u.formatCoord3D(n2x, n2y, n2z) + "$.",
          '$\\cos\\alpha = \\dfrac{|\\overrightarrow{n_1} \\cdot \\overrightarrow{n_2}|}{|\\overrightarrow{n_1}| \\cdot |\\overrightarrow{n_2}|} = \\dfrac{' + dotAbs + '}{' + l1Sq + '}' + (dotAbs === 0 ? ' = 0' : ' \\approx ' + cosStr) + '$.',
          '$\\Rightarrow \\alpha ' + (dotAbs === 0 ? '= 90' : '\\approx ' + shortAnswer) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh đáy a = 0', params: { a: 0, h: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (a = 3, h = 3 -> 90°)', params: { a: 3, h: 3 }, expectedValid: true },
      { label: 'Biên a ≠ h (a = 4, h = 2)', params: { a: 4, h: 2 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Góc giữa hai mặt phẳng (AB'C') và (BCD) trong hình hộp chữ nhật
  t12_b16_d12_cuboid_angle_planes_3_sa: {
    id: 't12_b16_d12_cuboid_angle_planes_3_sa',
    name: "Tính góc giữa hai mặt phẳng (AB'C') và (BCD) trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai mặt phẳng trong không gian',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa hai mặt phẳng (AB'C') và (BCD) (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const cosVal = a / Math.sqrt(a * a + h * h);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const n1x = -a * h, n1y = 0, n1z = a * a;
      const l1Sq = n1x * n1x + n1z * n1z;
      const cosVal = a / Math.sqrt(a * a + h * h);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cosStr = u.formatNumberVN(Number(cosVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa hai mặt phẳng $(AB'C')$ và $(BCD)$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Gọi $\\alpha$ là góc giữa hai mặt phẳng. Chọn hệ trục tọa độ $Axyz$ với $A(0;\\, 0;\\, 0)$, $B(" + a + ";\\, 0;\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $B'(" + a + ";\\, 0;\\, " + h + ")$, $C'(" + a + ";\\, " + a + ";\\, " + h + ")$.",
          "Ta có $\\overrightarrow{AB'} = (" + a + ";\\, 0;\\, " + h + ")$, $\\overrightarrow{AC'} = (" + a + ";\\, " + a + ";\\, " + h + ") \\Rightarrow \\overrightarrow{n_1} = [\\overrightarrow{AB'}, \\overrightarrow{AC'}] = " + u.formatCoord3D(n1x, n1y, n1z) + "$.",
          "Mặt phẳng $(BCD)$ trùng với $(Oxy)$ nên có vectơ pháp tuyến $\\overrightarrow{n_2} = (0;\\, 0;\\, 1)$.",
          '$\\cos\\alpha = \\dfrac{|\\overrightarrow{n_1} \\cdot \\overrightarrow{n_2}|}{|\\overrightarrow{n_1}| \\cdot |\\overrightarrow{n_2}|} = \\dfrac{' + n1z + '}{\\sqrt{' + l1Sq + '} \\cdot 1} = \\dfrac{' + a + '}{\\sqrt{' + (a * a + h * h) + '}} \\approx ' + cosStr + '$.',
          '$\\Rightarrow \\alpha \\approx ' + shortAnswer + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { a: 2, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (a = 1, h = 6)', params: { a: 1, h: 6 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Góc giữa hai mặt phẳng (AB'D') và (ABD) trong hình hộp chữ nhật
  t12_b16_d13_cuboid_angle_planes_4_sa: {
    id: 't12_b16_d13_cuboid_angle_planes_4_sa',
    name: "Tính góc giữa hai mặt phẳng (AB'D') và (ABD) trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai mặt phẳng trong không gian',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa hai mặt phẳng (AB'D') và (ABD) (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const cosVal = a / Math.sqrt(a * a + 2 * h * h);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const n1x = -a * h, n1y = -a * h, n1z = a * a;
      const n2z = a * a;
      const l1Sq = n1x * n1x + n1y * n1y + n1z * n1z;
      const cosVal = a / Math.sqrt(a * a + 2 * h * h);
      const deg = (Math.acos(Math.min(1, cosVal)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const cosStr = u.formatNumberVN(Number(cosVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa hai mặt phẳng $(AB'D')$ và $(ABD)$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Gọi $\\alpha$ là góc giữa hai mặt phẳng. Chọn hệ trục tọa độ $Axyz$ với $A(0;\\, 0;\\, 0)$, $B(" + a + ";\\, 0;\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $B'(" + a + ";\\, 0;\\, " + h + ")$, $D'(0;\\, " + a + ";\\, " + h + ")$.",
          "Ta có $\\overrightarrow{AB'} = (" + a + ";\\, 0;\\, " + h + ")$, $\\overrightarrow{AD'} = (0;\\, " + a + ";\\, " + h + ") \\Rightarrow \\overrightarrow{n_1} = [\\overrightarrow{AB'}, \\overrightarrow{AD'}] = " + u.formatCoord3D(n1x, n1y, n1z) + "$.",
          "Ta có $\\overrightarrow{AB} = (" + a + ";\\, 0;\\, 0)$, $\\overrightarrow{AD} = (0;\\, " + a + ";\\, 0) \\Rightarrow \\overrightarrow{n_2} = [\\overrightarrow{AB}, \\overrightarrow{AD}] = (0;\\, 0;\\, " + n2z + ")$.",
          '$\\cos\\alpha = \\dfrac{|\\overrightarrow{n_1} \\cdot \\overrightarrow{n_2}|}{|\\overrightarrow{n_1}| \\cdot |\\overrightarrow{n_2}|} = \\dfrac{' + (n1z * n2z) + '}{\\sqrt{' + l1Sq + '} \\cdot ' + n2z + '} = \\dfrac{' + a + '}{\\sqrt{' + (a * a + 2 * h * h) + '}} \\approx ' + cosStr + '$.',
          '$\\Rightarrow \\alpha \\approx ' + shortAnswer + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh đáy a = 0', params: { a: 0, h: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (a = 4, h = 3)', params: { a: 4, h: 3 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Góc giữa đường thẳng AC' và mặt phẳng (A'BD) trong hình hộp chữ nhật
  t12_b16_d14_cuboid_angle_ac1_a1bd_sa: {
    id: 't12_b16_d14_cuboid_angle_ac1_a1bd_sa',
    name: "Tính góc giữa đường thẳng AC' và mặt phẳng (A'BD) trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Góc giữa đường thẳng và mặt phẳng',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa đường thẳng AC' và mặt phẳng (A'BD) (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const sinVal = Math.min(1, (3 * a * h) / Math.sqrt((a * a + 2 * h * h) * (2 * a * a + h * h)));
      const deg = (Math.asin(sinVal) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const nx = a * h, ny = a * h, nz = a * a;
      const nSq = nx * nx + ny * ny + nz * nz;
      const uSq = 2 * a * a + h * h;
      const dotAbs = 3 * a * a * h;
      const sinVal = Math.min(1, dotAbs / Math.sqrt(nSq * uSq));
      const deg = (Math.asin(sinVal) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const sinStr = u.formatNumberVN(Number(sinVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa đường thẳng $AC'$ và mặt phẳng $(A'BD)$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Gọi $\\alpha$ là góc cần tìm. Chọn hệ trục tọa độ $Axyz$ với $A(0;\\, 0;\\, 0)$, $A'(0;\\, 0;\\, " + h + ")$, $B(" + a + ";\\, 0;\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $C'(" + a + ";\\, " + a + ";\\, " + h + ")$.",
          "Ta có $\\overrightarrow{A'B} = (" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{BD} = (-" + a + ";\\, " + a + ";\\, 0) \\Rightarrow \\overrightarrow{n} = [\\overrightarrow{A'B}, \\overrightarrow{BD}] = " + u.formatCoord3D(nx, ny, nz) + "$.",
          "Đường thẳng $AC'$ có vectơ chỉ phương $\\overrightarrow{u} = \\overrightarrow{AC'} = (" + a + ";\\, " + a + ";\\, " + h + ")$.",
          '$\\sin\\alpha = \\dfrac{|\\overrightarrow{n} \\cdot \\overrightarrow{u}|}{|\\overrightarrow{n}| \\cdot |\\overrightarrow{u}|} = \\dfrac{' + dotAbs + '}{\\sqrt{' + nSq + '} \\cdot \\sqrt{' + uSq + '}}' + (a === h ? ' = 1' : ' \\approx ' + sinStr) + '$.',
          '$\\Rightarrow \\alpha ' + (a === h ? '= 90' : '\\approx ' + shortAnswer) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { a: 1, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (a = 1, h = 6)', params: { a: 1, h: 6 }, expectedValid: true },
      { label: 'Biên hình lập phương a = h (AC\' vuông góc (A\'BD) -> 90°)', params: { a: 3, h: 3 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Góc giữa đường thẳng B'D và mặt phẳng (A'BC) trong hình hộp chữ nhật
  t12_b16_d15_cuboid_angle_b1d_a1bc_sa: {
    id: 't12_b16_d15_cuboid_angle_b1d_a1bc_sa',
    name: "Tính góc giữa đường thẳng B'D và mặt phẳng (A'BC) trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Góc giữa đường thẳng và mặt phẳng',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa đường thẳng B'D và mặt phẳng (A'BC) (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const sinVal = Math.min(1, (2 * a * h) / Math.sqrt((a * a + h * h) * (2 * a * a + h * h)));
      const deg = (Math.asin(sinVal) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const nx = a * h, ny = 0, nz = a * a;
      const nSq = nx * nx + nz * nz;
      const uSq = 2 * a * a + h * h;
      const dotAbs = 2 * a * a * h;
      const sinVal = Math.min(1, dotAbs / Math.sqrt(nSq * uSq));
      const deg = (Math.asin(sinVal) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const sinStr = u.formatNumberVN(Number(sinVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa đường thẳng $B'D$ và mặt phẳng $(A'BC)$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Gọi $\\alpha$ là góc cần tìm. Chọn hệ trục tọa độ $Axyz$ với $A'(0;\\, 0;\\, " + h + ")$, $B(" + a + ";\\, 0;\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $B'(" + a + ";\\, 0;\\, " + h + ")$, $D(0;\\, " + a + ";\\, 0)$.",
          "Ta có $\\overrightarrow{A'B} = (" + a + ";\\, 0;\\, -" + h + ")$, $\\overrightarrow{BC} = (0;\\, " + a + ";\\, 0) \\Rightarrow \\overrightarrow{n} = [\\overrightarrow{A'B}, \\overrightarrow{BC}] = " + u.formatCoord3D(nx, ny, nz) + "$.",
          "Đường thẳng $B'D$ có vectơ chỉ phương $\\overrightarrow{u} = \\overrightarrow{B'D} = (-" + a + ";\\, " + a + ";\\, -" + h + ")$.",
          '$\\sin\\alpha = \\dfrac{|\\overrightarrow{n} \\cdot \\overrightarrow{u}|}{|\\overrightarrow{n}| \\cdot |\\overrightarrow{u}|} = \\dfrac{' + dotAbs + '}{\\sqrt{' + nSq + '} \\cdot \\sqrt{' + uSq + '}} \\approx ' + sinStr + '$.',
          '$\\Rightarrow \\alpha \\approx ' + shortAnswer + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh đáy a = 0', params: { a: 0, h: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (a = 5, h = 4)', params: { a: 5, h: 4 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Góc giữa đường thẳng CD' và mặt phẳng (A'B'D) trong hình hộp chữ nhật
  t12_b16_d16_cuboid_angle_cd1_a1b1d_sa: {
    id: 't12_b16_d16_cuboid_angle_cd1_a1b1d_sa',
    name: "Tính góc giữa đường thẳng CD' và mặt phẳng (A'B'D) trong hình hộp chữ nhật",
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Góc giữa đường thẳng và mặt phẳng',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' đáy vuông cạnh a, AA' = h. Tính góc giữa đường thẳng CD' và mặt phẳng (A'B'D) (độ, làm tròn đến hàng phần mười).",
    conditionSummary: 'a > 0, h > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 1, max: 9 },
      { name: 'h', label: "Chiều cao AA' = h", min: 1, max: 9 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh hình hộp phải dương' };
      const sinVal = Math.min(1, (a * h) / (a * a + h * h));
      const deg = (Math.asin(sinVal) * 180) / Math.PI;
      if (Math.abs(((deg * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const nx = 0, ny = a * h, nz = a * a;
      const nSq = ny * ny + nz * nz;
      const uSq = a * a + h * h;
      const dotAbs = a * a * h;
      const sinVal = Math.min(1, (a * h) / uSq);
      const deg = (Math.asin(sinVal) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const sinStr = u.formatNumberVN(Number(sinVal.toFixed(4)), 4);
      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có đáy là hình vuông cạnh bằng $" +
          a +
          "$, $AA' = " +
          h +
          "$. Tính góc giữa đường thẳng $CD'$ và mặt phẳng $(A'B'D)$ (đơn vị độ, kết quả làm tròn đến hàng phần mười).",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Gọi $\\alpha$ là góc cần tìm. Chọn hệ trục tọa độ $Axyz$ với $A'(0;\\, 0;\\, " + h + ")$, $B'(" + a + ";\\, 0;\\, " + h + ")$, $D(0;\\, " + a + ";\\, 0)$, $C(" + a + ";\\, " + a + ";\\, 0)$, $D'(0;\\, " + a + ";\\, " + h + ")$.",
          "Ta có $\\overrightarrow{A'B'} = (" + a + ";\\, 0;\\, 0)$, $\\overrightarrow{B'D} = (-" + a + ";\\, " + a + ";\\, -" + h + ") \\Rightarrow \\overrightarrow{n} = [\\overrightarrow{A'B'}, \\overrightarrow{B'D}] = " + u.formatCoord3D(nx, ny, nz) + "$.",
          "Đường thẳng $CD'$ có vectơ chỉ phương $\\overrightarrow{u} = \\overrightarrow{CD'} = (-" + a + ";\\, 0;\\, " + h + ")$.",
          '$\\sin\\alpha = \\dfrac{|\\overrightarrow{n} \\cdot \\overrightarrow{u}|}{|\\overrightarrow{n}| \\cdot |\\overrightarrow{u}|} = \\dfrac{' + dotAbs + '}{\\sqrt{' + nSq + '} \\cdot \\sqrt{' + uSq + '}} = \\dfrac{' + (a * h) + '}{' + uSq + '} \\approx ' + sinStr + '$.',
          '$\\Rightarrow \\alpha \\approx ' + shortAnswer + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { a: 3, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (a = 3, h = 7)', params: { a: 3, h: 7 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Khoảng cách giữa SB và AC trong hình chóp S.ABC có SA ⊥ (ABC), đáy vuông tại C
  t12_b16_d17_pyramid_dist_sb_ac_sa: {
    id: 't12_b16_d17_pyramid_dist_sb_ac_sa',
    name: 'Khoảng cách giữa hai đường thẳng SB và AC trong hình chóp S.ABC',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Khoảng cách giữa hai đường thẳng chéo nhau',
    description:
      'Cho hình chóp S.ABC có SA = h, SA ⊥ (ABC) và tam giác ABC vuông tại C có BC = b. Tính khoảng cách giữa SB và AC bằng tọa độ Oxyz (làm tròn đến hàng phần mười).',
    conditionSummary: 'h > 0, b > 0 và tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'h', label: 'Chiều cao SA = h', min: 1, max: 10 },
      { name: 'b', label: 'Cạnh đáy BC = b', min: 1, max: 10 },
    ],
    validateCode: `
      const { h, b } = params;
      if (h <= 0 || b <= 0) return { valid: false, reason: 'Độ dài cạnh phải dương' };
      const val = (b * h) / Math.sqrt(b * b + h * h);
      if (Math.abs(((val * 10) % 1) - 0.5) < 0.03) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h, b } = params;
      const sumSq = b * b + h * h;
      const val = (b * h) / Math.sqrt(sumSq);
      const rounded = Number(val.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem:
          'Cho hình chóp $S.ABC$ có $SA = ' +
          h +
          '$ và $SA \\perp (ABC)$. Tam giác $ABC$ vuông tại $C$ có cạnh $BC = ' +
          b +
          '$. Tính khoảng cách giữa $SB$ và $AC$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Đặt hệ trục tọa độ $Oxyz$ sao cho $A(0;\\, 0;\\, 0)$, $C(c;\\, 0;\\, 0)$, $B(c;\\, ' + b + ';\\, 0)$, $S(0;\\, 0;\\, ' + h + ')$ với $c = AC > 0$.',
          'Khi đó vectơ chỉ phương của $AC$ là $\\vec{u} = (1;\\, 0;\\, 0)$, vectơ chỉ phương của $SB$ là $\\vec{v} = (c;\\, ' + b + ';\\, -' + h + ')$.',
          'Suy ra $[\\vec{u}, \\vec{v}] = (0;\\, ' + h + ';\\, ' + b + ')$ nên $|[\\vec{u}, \\vec{v}]| = \\sqrt{' + (h * h) + ' + ' + (b * b) + '} = \\sqrt{' + sumSq + '}$.',
          'Lấy $\\overrightarrow{AS} = (0;\\, 0;\\, ' + h + ')$, khoảng cách giữa $SB$ và $AC$ là $d(SB, AC) = \\dfrac{|\\overrightarrow{AS} \\cdot [\\vec{u}, \\vec{v}]|}{|[\\vec{u}, \\vec{v}]|} = \\dfrac{' + (b * h) + '}{\\sqrt{' + sumSq + '}} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên BC = 0', params: { h: 2, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (SA = 2, BC = 4)', params: { h: 2, b: 4 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Tích vô hướng hai vectơ gắn với hình lập phương ABCD.A'B'C'D'
  t12_b16_d18_cube_dot_product_sa: {
    id: 't12_b16_d18_cube_dot_product_sa',
    name: "Tính tích vô hướng hai vectơ trên hình lập phương ABCD.A'B'C'D'",
    category: 'SA',
    level: 'Biết',
    topicTag: 'Tích vô hướng hai vectơ trong không gian',
    description:
      "Cho hình lập phương ABCD.A'B'C'D' cạnh a. Sử dụng phương pháp gắn hệ trục tọa độ để tính tích vô hướng của một cặp vectơ nối các đỉnh hình lập phương.",
    conditionSummary: 'Cạnh hình lập phương a > 0 và chỉ số cặp vectơ 0 <= pairIdx <= 4',
    paramSpecs: [
      { name: 'a', label: 'Cạnh hình lập phương a', min: 2, max: 9 },
      { name: 'pairIdx', label: 'Cặp vectơ (0..4)', min: 0, max: 4 },
    ],
    validateCode: `
      const { a, pairIdx } = params;
      if (a <= 0) return { valid: false, reason: 'Cạnh hình lập phương phải dương' };
      if (pairIdx < 0 || pairIdx > 4) return { valid: false, reason: 'Chỉ số cặp vectơ phải thuộc 0..4' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, pairIdx } = params;
      const pairs = [
        {
          v1Name: "\\overrightarrow{AD'}",
          v2Name: "\\overrightarrow{B'C}",
          v1: [0, a, a],
          v2: [0, a, -a],
          pts: "D'(0;\\, " + a + ";\\, " + a + "),\\; B'(" + a + ";\\, 0;\\, " + a + "),\\; C(" + a + ";\\, " + a + ";\\, 0)",
        },
        {
          v1Name: '\\overrightarrow{AC}',
          v2Name: "\\overrightarrow{AD'}",
          v1: [a, a, 0],
          v2: [0, a, a],
          pts: "C(" + a + ";\\, " + a + ";\\, 0),\\; D'(0;\\, " + a + ";\\, " + a + ")",
        },
        {
          v1Name: '\\overrightarrow{AB}',
          v2Name: "\\overrightarrow{CA'}",
          v1: [a, 0, 0],
          v2: [-a, -a, a],
          pts: "B(" + a + ";\\, 0;\\, 0),\\; C(" + a + ";\\, " + a + ";\\, 0),\\; A'(0;\\, 0;\\, " + a + ")",
        },
        {
          v1Name: "\\overrightarrow{AC'}",
          v2Name: "\\overrightarrow{AD'}",
          v1: [a, a, a],
          v2: [0, a, a],
          pts: "C'(" + a + ";\\, " + a + ";\\, " + a + "),\\; D'(0;\\, " + a + ";\\, " + a + ")",
        },
        {
          v1Name: "\\overrightarrow{AD'}",
          v2Name: "\\overrightarrow{C'B}",
          v1: [0, a, a],
          v2: [0, -a, -a],
          pts: "D'(0;\\, " + a + ";\\, " + a + "),\\; C'(" + a + ";\\, " + a + ";\\, " + a + "),\\; B(" + a + ";\\, 0;\\, 0)",
        },
      ];
      const p = pairs[pairIdx];
      const dot = p.v1[0] * p.v2[0] + p.v1[1] * p.v2[1] + p.v1[2] * p.v2[2];
      const shortAnswer = String(dot);
      return {
        stem:
          "Trong không gian, cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $" +
          a +
          '$. Tính tích vô hướng của hai vectơ $' +
          p.v1Name +
          '$ và $' +
          p.v2Name +
          '$.',
        shortAnswer,
        numericValue: dot,
        answerSummary: shortAnswer,
        solutionSteps: [
          "Đặt hệ trục tọa độ $Axyz$ với $A(0;\\, 0;\\, 0)$, $B(" + a + ";\\, 0;\\, 0)$, $D(0;\\, " + a + ";\\, 0)$, $A'(0;\\, 0;\\, " + a + ")$.",
          'Khi đó $' + p.pts + '$.',
          'Ta có $' + p.v1Name + ' = ' + u.formatCoord3D(p.v1[0], p.v1[1], p.v1[2]) + '$ và $' + p.v2Name + ' = ' + u.formatCoord3D(p.v2[0], p.v2[1], p.v2[2]) + '$.',
          'Suy ra $' + p.v1Name + ' \\cdot ' + p.v2Name + ' = (' + p.v1[0] + ')\\cdot(' + p.v2[0] + ') + (' + p.v1[1] + ')\\cdot(' + p.v2[1] + ') + (' + p.v1[2] + ')\\cdot(' + p.v2[2] + ') = ' + dot + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh a = 0', params: { a: 0, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (a = 4, AD\' · B\'C = 0)', params: { a: 4, pairIdx: 0 }, expectedValid: true },
      { label: 'Biên tích vô hướng âm (AB · CA\' = -a^2)', params: { a: 4, pairIdx: 2 }, expectedValid: true },
    ],
  },
};

export const G12_B16_SA_LIST = Object.values(G12_B16_SA_TEMPLATES);

export const G12_B16_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B16_SA_TEMPLATES,
};
