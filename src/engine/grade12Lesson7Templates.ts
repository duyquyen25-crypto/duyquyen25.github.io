import { MathTemplate } from '../types/math';

export const G12_B7_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (11 DẠNG: DẠNG 1 -> DẠNG 11)
  // =====================================================================

  // Dạng 1 (Q1)
  t12_b7_d01_vec_from_basis_mc: {
    id: 't12_b7_d01_vec_from_basis_mc',
    name: 'Tìm tọa độ vectơ từ biểu diễn qua bộ ba vectơ đơn vị i, j, k',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tọa độ của vectơ trong không gian',
    description:
      'Cho vectơ a = x.i + y.j + z.k trong hệ tọa độ Oxyz. Xác định tọa độ của vectơ a = (x; y; z).',
    conditionSummary: 'x, y, z ∈ [-12; 12], khác 0 để tránh các đáp án nhiễu trùng nhau',
    paramSpecs: [
      { name: 'x', label: 'Hoành độ x', min: -12, max: 12, allowZero: false },
      { name: 'y', label: 'Tung độ y', min: -12, max: 12, allowZero: false },
      { name: 'z', label: 'Cao độ z', min: -12, max: 12, allowZero: false },
    ],
    validateCode: `
      const { x, y, z } = params;
      if (x === 0 || y === 0 || z === 0) {
        return { valid: false, reason: 'Cần x, y, z khác 0 để đủ cả 3 thành phần i, j, k' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z } = params;
      const vecExpr =
        u.formatTerm(x, '\\overrightarrow{i}', true) +
        u.formatTerm(y, '\\overrightarrow{j}', false) +
        u.formatTerm(z, '\\overrightarrow{k}', false);
      const correct = '$' + u.formatCoord3D(x, y, z) + '$';
      const distractors = [
        '$' + u.formatCoord3D(x, -y, -z) + '$',
        '$' + u.formatCoord3D(x, y, 0) + '$',
        '$' + u.formatCoord3D(-x, -y, z) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(x + k, y, z) + '$'
      );
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho vectơ $\\overrightarrow{a} = ' +
          vecExpr +
          '$. Tìm tọa độ vectơ $\\overrightarrow{a}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo định nghĩa tọa độ của vectơ trong không gian $Oxyz$: nếu $\\overrightarrow{a} = x\\overrightarrow{i} + y\\overrightarrow{j} + z\\overrightarrow{k}$ thì $\\overrightarrow{a} = (x;\\, y;\\, z)$.',
          'Từ $\\overrightarrow{a} = ' + vecExpr + '$ suy ra $\\overrightarrow{a} = ' + u.formatCoord3D(x, y, z) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên suy biến x = 0 (thiếu thành phần i)', params: { x: 0, y: 4, z: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (-5; 8; -11)', params: { x: -5, y: 8, z: -11 }, expectedValid: true },
      { label: 'Biên hệ số đơn vị (1; -1; 1)', params: { x: 1, y: -1, z: 1 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2)
  t12_b7_d02_point_from_pos_vec_mc: {
    id: 't12_b7_d02_point_from_pos_vec_mc',
    name: 'Tìm tọa độ điểm khi biết vectơ vị trí OC = b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tọa độ của điểm trong không gian',
    description:
      'Cho vectơ b = (x; y; z) và điểm C thỏa mãn OC = b. Tìm tọa độ điểm C.',
    conditionSummary: 'x, y, z ∈ [-15; 15], khác 0 để phân biệt với các phương án nhiễu đổi dấu hoặc khuyết tọa độ',
    paramSpecs: [
      { name: 'x', label: 'Hoành độ x', min: -15, max: 15, allowZero: false },
      { name: 'y', label: 'Tung độ y', min: -15, max: 15, allowZero: false },
      { name: 'z', label: 'Cao độ z', min: -15, max: 15, allowZero: false },
    ],
    validateCode: `
      const { x, y, z } = params;
      if (x === 0 || y === 0 || z === 0) {
        return { valid: false, reason: 'Cần x, y, z khác 0 để các đáp án nhiễu không trùng đáp án đúng' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z } = params;
      const coord = u.formatCoord3D(x, y, z);
      const correct = '$' + coord + '$';
      const distractors = [
        '$' + u.formatCoord3D(x, -y, -z) + '$',
        '$' + u.formatCoord3D(x, y, 0) + '$',
        '$' + u.formatCoord3D(-x, -y, z) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(x, y + k, z) + '$'
      );
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho vectơ $\\overrightarrow{b} = ' +
          coord +
          '$ và điểm $C$. Biết $\\overrightarrow{OC} = \\overrightarrow{b}$. Tìm tọa độ điểm $C$.',
        options,
        correctIndex,
        answerSummary: '$C' + coord + '$',
        solutionSteps: [
          'Theo định nghĩa tọa độ của điểm trong không gian $Oxyz$: tọa độ điểm $C$ chính là tọa độ của vectơ $\\overrightarrow{OC}$.',
          'Vì $\\overrightarrow{OC} = \\overrightarrow{b} = ' + coord + '$ nên $C' + coord + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên suy biến y = 0', params: { x: -4, y: 0, z: -7 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc C(-4; -13; -7)', params: { x: -4, y: -13, z: -7 }, expectedValid: true },
      { label: 'Biên tọa độ dương toàn phần', params: { x: 2, y: 5, z: 9 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3)
  t12_b7_d03_vec_two_points_mc: {
    id: 't12_b7_d03_vec_two_points_mc',
    name: 'Tìm tọa độ vectơ nối hai điểm MB trong không gian Oxyz',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tọa độ của vectơ qua hai điểm',
    description:
      'Cho hai điểm phân biệt M(x1; y1; z1) và B(x2; y2; z2). Tính tọa độ vectơ MB = (x2 - x1; y2 - y1; z2 - z1).',
    conditionSummary: 'M ≠ B, không trùng gốc O để tránh bài toán tầm thường',
    paramSpecs: [
      { name: 'x1', label: 'Hoành độ M', min: -12, max: 12 },
      { name: 'y1', label: 'Tung độ M', min: -12, max: 12 },
      { name: 'z1', label: 'Cao độ M', min: -12, max: 12 },
      { name: 'x2', label: 'Hoành độ B', min: -14, max: 14 },
      { name: 'y2', label: 'Tung độ B', min: -14, max: 14 },
      { name: 'z2', label: 'Cao độ B', min: -14, max: 14 },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2 } = params;
      if (x1 === x2 && y1 === y2 && z1 === z2) {
        return { valid: false, reason: 'M và B trùng nhau làm vectơ MB = 0' };
      }
      if ((x1 === 0 && y1 === 0 && z1 === 0) || (x2 === 0 && y2 === 0 && z2 === 0)) {
        return { valid: false, reason: 'Tránh một điểm trùng gốc tọa độ O(0;0;0)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2 } = params;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dz = z2 - z1;
      const subExpr = (b, a) => (a < 0 ? b + ' - (' + a + ')' : b + ' - ' + a);
      const correct = '$' + u.formatCoord3D(dx, dy, dz) + '$';
      const distractors = [
        '$' + u.formatCoord3D(-dx, -dy, -dz) + '$',
        '$' + u.formatCoord3D(x1 + x2, y1 + y2, z1 + z2) + '$',
        '$' + u.formatCoord3D(x1 * x2, y1 * y2, z1 * z2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(dx + k, dy - k, dz) + '$'
      );
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho hai điểm $M' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $B' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tìm tọa độ vectơ $\\overrightarrow{MB}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $\\overrightarrow{MB} = (x_B - x_M;\\, y_B - y_M;\\, z_B - z_M)$.',
          'Ta có $\\overrightarrow{MB} = (' +
            subExpr(x2, x1) +
            ';\\, ' +
            subExpr(y2, y1) +
            ';\\, ' +
            subExpr(z2, z1) +
            ') = ' +
            u.formatCoord3D(dx, dy, dz) +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M trùng B', params: { x1: 2, y1: -3, z1: 4, x2: 2, y2: -3, z2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc M(9;-6;-10), B(-13;10;-10)', params: { x1: 9, y1: -6, z1: -10, x2: -13, y2: 10, z2: -10 }, expectedValid: true },
      { label: 'Biên có hai tọa độ đối xứng', params: { x1: -2, y1: 5, z1: 1, x2: 2, y2: -5, z2: 3 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4)
  t12_b7_d04_endpoint_from_vec_mc: {
    id: 't12_b7_d04_endpoint_from_vec_mc',
    name: 'Tìm tọa độ điểm cuối B khi biết điểm đầu P và vectơ PB = b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tọa độ của vectơ qua hai điểm',
    description:
      'Cho điểm P(xP; yP; zP) và vectơ b = (u; v; w). Biết PB = b, tìm tọa độ điểm B = P + b.',
    conditionSummary: 'Vectơ b khác vectơ-không và P khác gốc O',
    paramSpecs: [
      { name: 'xP', label: 'Hoành độ P', min: -14, max: 14 },
      { name: 'yP', label: 'Tung độ P', min: -14, max: 14 },
      { name: 'zP', label: 'Cao độ P', min: -14, max: 14 },
      { name: 'vx', label: 'Hoành độ vectơ b', min: -10, max: 10 },
      { name: 'vy', label: 'Tung độ vectơ b', min: -10, max: 10 },
      { name: 'vz', label: 'Cao độ vectơ b', min: -10, max: 10 },
    ],
    validateCode: `
      const { xP, yP, zP, vx, vy, vz } = params;
      if (vx === 0 && vy === 0 && vz === 0) {
        return { valid: false, reason: 'Vectơ b không thể bằng vectơ-không' };
      }
      if (xP === 0 && yP === 0 && zP === 0) {
        return { valid: false, reason: 'Tránh P trùng gốc tọa độ O(0;0;0)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xP, yP, zP, vx, vy, vz } = params;
      const xB = xP + vx;
      const yB = yP + vy;
      const zB = zP + vz;
      const addExpr = (a, b) => (b < 0 ? a + ' + (' + b + ')' : a + ' + ' + b);
      const correct = '$' + u.formatCoord3D(xB, yB, zB) + '$';
      const distractors = [
        '$' + u.formatCoord3D(vx - xP, vy - yP, vz - zP) + '$',
        '$' + u.formatCoord3D(xP - vx, yP - vy, zP - vz) + '$',
        '$' + u.formatCoord3D(xP * vx, yP * vy, zP * vz) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(xB + k, yB, zB - k) + '$'
      );
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho điểm $P' +
          u.formatCoord3D(xP, yP, zP) +
          '$ và vectơ $\\overrightarrow{b} = ' +
          u.formatCoord3D(vx, vy, vz) +
          '$. Tìm tọa độ điểm $B$ biết $\\overrightarrow{PB} = \\overrightarrow{b}$.',
        options,
        correctIndex,
        answerSummary: '$B' + u.formatCoord3D(xB, yB, zB) + '$',
        solutionSteps: [
          'Gọi $B(x_B;\\, y_B;\\, z_B)$. Ta có $\\overrightarrow{PB} = (x_B - (' + xP + ');\\, y_B - (' + yP + ');\\, z_B - (' + zP + '))$'.replace(/\-\s*\((\d+|0)\)/g, '- $1'),
          'Từ $\\overrightarrow{PB} = \\overrightarrow{b}$ suy ra $B(' +
            addExpr(xP, vx) +
            ';\\, ' +
            addExpr(yP, vy) +
            ';\\, ' +
            addExpr(zP, vz) +
            ') = ' +
            u.formatCoord3D(xB, yB, zB) +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vectơ b = 0', params: { xP: -2, yP: 3, zP: 1, vx: 0, vy: 0, vz: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc P(-13;3;-10), b(-9;-7;-3)', params: { xP: -13, yP: 3, zP: -10, vx: -9, vy: -7, vz: -3 }, expectedValid: true },
      { label: 'Biên tọa độ đối dấu triệt tiêu về 0', params: { xP: 4, yP: -5, zP: 6, vx: -4, vy: 5, vz: 2 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5)
  t12_b7_d05_proj_coord_plane_mc: {
    id: 't12_b7_d05_proj_coord_plane_mc',
    name: 'Hình chiếu vuông góc của một điểm lên mặt phẳng tọa độ (Oxy), (Oxz), (Oyz)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hình chiếu vuông góc lên mặt phẳng tọa độ',
    description:
      'Cho điểm P(x; y; z). Tìm tọa độ hình chiếu vuông góc của P lên một trong ba mặt phẳng tọa độ (Oxy), (Oxz) hoặc (Oyz).',
    conditionSummary: 'x, y, z khác 0 để 3 tọa độ phân biệt rõ thành phần bị triệt tiêu',
    paramSpecs: [
      { name: 'x', label: 'Hoành độ x', min: -14, max: 14, allowZero: false },
      { name: 'y', label: 'Tung độ y', min: -14, max: 14, allowZero: false },
      { name: 'z', label: 'Cao độ z', min: -14, max: 14, allowZero: false },
      { name: 'planeIdx', label: 'Mặt phẳng (0:Oxy, 1:Oxz, 2:Oyz)', min: 0, max: 2 },
    ],
    validateCode: `
      const { x, y, z, planeIdx } = params;
      if (x === 0 || y === 0 || z === 0) {
        return { valid: false, reason: 'Cần x, y, z khác 0 để hình chiếu không tầm thường' };
      }
      if (![0, 1, 2].includes(planeIdx)) {
        return { valid: false, reason: 'planeIdx phải thuộc {0, 1, 2}' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z, planeIdx } = params;
      const planes = [
        { name: '(Oxy)', coord: [x, y, 0], zeroAxis: 'z', keepDesc: 'giữ nguyên hoành độ và tung độ, cho cao độ $z = 0$' },
        { name: '(Oxz)', coord: [x, 0, z], zeroAxis: 'y', keepDesc: 'giữ nguyên hoành độ và cao độ, cho tung độ $y = 0$' },
        { name: '(Oyz)', coord: [0, y, z], zeroAxis: 'x', keepDesc: 'giữ nguyên tung độ và cao độ, cho hoành độ $x = 0$' },
      ];
      const item = planes[planeIdx];
      const correct = '$' + u.formatCoord3D(item.coord[0], item.coord[1], item.coord[2]) + '$';
      const distractors = [
        '$' + u.formatCoord3D(0, 0, z) + '$',
        '$' + u.formatCoord3D(0, y, 0) + '$',
        '$' + u.formatCoord3D(x, 0, 0) + '$',
        '$' + u.formatCoord3D(planes[(planeIdx + 1) % 3].coord[0], planes[(planeIdx + 1) % 3].coord[1], planes[(planeIdx + 1) % 3].coord[2]) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(item.coord[0] + k, item.coord[1], item.coord[2]) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, tìm tọa độ hình chiếu vuông góc của điểm $P' +
          u.formatCoord3D(x, y, z) +
          '$ lên mặt phẳng $' +
          item.name +
          '$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hình chiếu vuông góc của điểm $P(x;\\, y;\\, z)$ lên mặt phẳng $' + item.name + '$ thu được bằng cách ' + item.keepDesc + '.',
          'Vậy hình chiếu vuông góc cần tìm có tọa độ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tọa độ bằng 0', params: { x: 10, y: 0, z: -14, planeIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc P(10;8;-14) lên (Oxz)', params: { x: 10, y: 8, z: -14, planeIdx: 1 }, expectedValid: true },
      { label: 'Chiếu lên (Oyz)', params: { x: -3, y: 5, z: 7, planeIdx: 2 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6)
  t12_b7_d06_parallelogram_4th_vertex_mc: {
    id: 't12_b7_d06_parallelogram_4th_vertex_mc',
    name: 'Tìm đỉnh thứ tư của hình bình hành trong không gian Oxyz',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đỉnh thứ tư của hình bình hành',
    description:
      'Cho ba điểm không thẳng hàng M, F, H. Tìm tọa độ điểm K sao cho MFHK là hình bình hành bằng điều kiện vectơ MF = KH.',
    conditionSummary: 'Kiểm tra tích có hướng MF × MH ≠ 0 để đảm bảo M, F, H không thẳng hàng',
    paramSpecs: [
      { name: 'xM', label: 'Hoành độ M', min: -10, max: 10 },
      { name: 'yM', label: 'Tung độ M', min: -10, max: 10 },
      { name: 'zM', label: 'Cao độ M', min: -10, max: 10 },
      { name: 'xF', label: 'Hoành độ F', min: -12, max: 12 },
      { name: 'yF', label: 'Tung độ F', min: -12, max: 12 },
      { name: 'zF', label: 'Cao độ F', min: -12, max: 12 },
      { name: 'xH', label: 'Hoành độ H', min: -10, max: 10 },
      { name: 'yH', label: 'Tung độ H', min: -10, max: 10 },
      { name: 'zH', label: 'Cao độ H', min: -10, max: 10 },
    ],
    validateCode: `
      const { xM, yM, zM, xF, yF, zF, xH, yH, zH } = params;
      const ux = xF - xM, uy = yF - yM, uz = zF - zM;
      const vx = xH - xM, vy = yH - yM, vz = zH - zM;
      const cx = uy * vz - uz * vy;
      const cy = uz * vx - ux * vz;
      const cz = ux * vy - uy * vx;
      if (cx * cx + cy * cy + cz * cz === 0) {
        return { valid: false, reason: 'Ba điểm M, F, H thẳng hàng không tạo thành hình bình hành' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xM, yM, zM, xF, yF, zF, xH, yH, zH } = params;
      const ux = xF - xM, uy = yF - yM, uz = zF - zM;
      const xK = xM + xH - xF;
      const yK = yM + yH - yF;
      const zK = zM + zH - zF;
      const correct = '$' + u.formatCoord3D(xK, yK, zK) + '$';
      const distractors = [
        '$' + u.formatCoord3D(xF + xH - xM, yF + yH - yM, zF + zH - zM) + '$',
        '$' + u.formatCoord3D(xM + xF - xH, yM + yF - yH, zM + zF - zH) + '$',
        '$' + u.formatCoord3D(-xK, -yK, -zK) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(xK + k, yK - k, zK) + '$'
      );
      const wrapNeg = (v) => (v < 0 ? '(' + v + ')' : '' + v);
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho ba điểm $M' +
          u.formatCoord3D(xM, yM, zM) +
          '$, $F' +
          u.formatCoord3D(xF, yF, zF) +
          '$ và $H' +
          u.formatCoord3D(xH, yH, zH) +
          '$. Tìm tọa độ điểm $K$ sao cho $MFHK$ là hình bình hành.',
        options,
        correctIndex,
        answerSummary: '$K' + u.formatCoord3D(xK, yK, zK) + '$',
        solutionSteps: [
          'Ta có $\\overrightarrow{MF} = ' + u.formatCoord3D(ux, uy, uz) + '$.',
          'Gọi $K(x_K;\\, y_K;\\, z_K)$. Vì $MFHK$ là hình bình hành nên $\\overrightarrow{MF} = \\overrightarrow{KH} \\Leftrightarrow \\begin{cases} x_K = ' + xH + ' - ' + wrapNeg(ux) + ' = ' + xK + ' \\\\ y_K = ' + yH + ' - ' + wrapNeg(uy) + ' = ' + yK + ' \\\\ z_K = ' + zH + ' - ' + wrapNeg(uz) + ' = ' + zK + ' \\end{cases}$.',
          'Vậy $K' + u.formatCoord3D(xK, yK, zK) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên suy biến M, F, H thẳng hàng', params: { xM: 0, yM: 0, zM: 0, xF: 1, yF: 2, zF: 3, xH: 2, yH: 4, zH: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc M(-1;9;-6), F(0;-12;1), H(9;6;0)', params: { xM: -1, yM: 9, zM: -6, xF: 0, yF: -12, zF: 1, xH: 9, yH: 6, zH: 0 }, expectedValid: true },
      { label: 'Biên trong mặt phẳng tọa độ (z = 0)', params: { xM: 1, yM: 2, zM: 0, xF: 4, yF: 3, zF: 0, xH: 2, yH: 6, zH: 0 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7)
  t12_b7_d07_equal_vec_solve_mn_mc: {
    id: 't12_b7_d07_equal_vec_solve_mn_mc',
    name: 'Tìm tham số m, n từ điều kiện hai vectơ bằng nhau theo bộ ba i, j, k',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Điều kiện hai vectơ bằng nhau',
    description:
      'Cho vectơ a = a1.i - m.j + (cn + d).k và vectơ b = a1.i + b2.j + b3.k. Tìm m, n để a = b và tính m + n.',
    conditionSummary: 'c ≥ 2, d ≠ 0, m ≠ 0, cn + d ≠ 0 đảm bảo nghiệm nguyên duy nhất và phương án nhiễu phân biệt',
    paramSpecs: [
      { name: 'a1', label: 'Hệ số i', min: -6, max: 6, allowZero: false },
      { name: 'm', label: 'Giá trị m', min: -10, max: 10, allowZero: false },
      { name: 'c', label: 'Hệ số của n (c)', min: 2, max: 5 },
      { name: 'n', label: 'Giá trị n', min: -6, max: 6, allowZero: false },
      { name: 'd', label: 'Hằng số d', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { a1, m, c, n, d } = params;
      if (a1 === 0 || m === 0 || n === 0 || d === 0 || c < 2) {
        return { valid: false, reason: 'Các hệ số phải khác 0 và c ≥ 2' };
      }
      if (c * n + d === 0) {
        return { valid: false, reason: 'Thành phần k triệt tiêu làm biểu thức kém đa dạng' };
      }
      if (m + n === -m + n || m + n === m - n || m + n === -m - n) {
        return { valid: false, reason: 'Tránh trùng giá trị tổng khi đổi dấu m hoặc n' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, m, c, n, d } = params;
      const b2 = -m;
      const b3 = c * n + d;
      const sumMN = m + n;
      const kCoeffExpr = u.formatLinear(c, d, 'n');
      const vecA =
        u.formatTerm(a1, '\\overrightarrow{i}', true) +
        ' - m\\overrightarrow{j} + (' +
        kCoeffExpr +
        ')\\overrightarrow{k}';
      const vecB =
        u.formatTerm(a1, '\\overrightarrow{i}', true) +
        u.formatTerm(b2, '\\overrightarrow{j}', false) +
        u.formatTerm(b3, '\\overrightarrow{k}', false);

      const correct = '$' + sumMN + '$';
      const distractors = ['$' + (-m + n) + '$', '$' + (m - n) + '$', '$' + (-m - n) + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + (sumMN + k) + '$'
      );
      const wrapNeg = (v) => (v < 0 ? '(' + v + ')' : '' + v);
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho $\\overrightarrow{a} = ' +
          vecA +
          '$ và $\\overrightarrow{b} = ' +
          vecB +
          '$. Với giá trị nào của $m, n$ thì $\\overrightarrow{a} = \\overrightarrow{b}$? Tính $m + n$.',
        options,
        correctIndex,
        answerSummary: '$m + n = ' + sumMN + '$',
        solutionSteps: [
          'Ta có $\\overrightarrow{a} = (' + a1 + ';\\, -m;\\, ' + kCoeffExpr + ')$ và $\\overrightarrow{b} = (' + a1 + ';\\, ' + b2 + ';\\, ' + b3 + ')$.',
          'Để $\\overrightarrow{a} = \\overrightarrow{b}$ thì $\\begin{cases} -m = ' + b2 + ' \\\\ ' + kCoeffExpr + ' = ' + b3 + ' \\end{cases} \\Leftrightarrow \\begin{cases} m = ' + m + ' \\\\ n = ' + n + ' \\end{cases}$.',
          'Vậy $m + n = ' + m + ' + ' + wrapNeg(n) + ' = ' + sumMN + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên suy biến m = 0', params: { a1: 3, m: 0, c: 3, n: -1, d: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc m=-8, n=-1, tổng -9', params: { a1: 3, m: -8, c: 3, n: -1, d: 1 }, expectedValid: true },
      { label: 'Biên dương toàn bộ', params: { a1: 2, m: 4, c: 2, n: 3, d: -1 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8)
  t12_b7_d08_cube_vertex_coord_mc: {
    id: 't12_b7_d08_cube_vertex_coord_mc',
    name: "Xác định tọa độ đỉnh của hình lập phương ABCD.A'B'C'D' khi chọn gốc tại A",
    category: 'MC',
    level: 'Biết',
    topicTag: 'Gắn hệ trục tọa độ vào hình lập phương',
    description:
      "Cho hình lập phương ABCD.A'B'C'D' cạnh a. Chọn hệ trục Oxyz với gốc O ≡ A, tia Ox, Oy, Oz chứa AB, AD, AA'. Tìm tọa độ một đỉnh bất kỳ.",
    conditionSummary: 'side ∈ [2; 12], targetIdx ∈ [0; 6] ứng với B, C, D, A\', B\', C\', D\'',
    paramSpecs: [
      { name: 'side', label: 'Độ dài cạnh a', min: 2, max: 12 },
      { name: 'targetIdx', label: 'Đỉnh cần tìm (0:B..6:D\')', min: 0, max: 6 },
    ],
    validateCode: `
      const { side, targetIdx } = params;
      if (side <= 0) return { valid: false, reason: 'Cạnh hình lập phương phải dương' };
      if (!Number.isInteger(targetIdx) || targetIdx < 0 || targetIdx > 6) {
        return { valid: false, reason: 'targetIdx phải từ 0 đến 6' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { side, targetIdx } = params;
      const vertices = [
        { name: 'B', coord: [side, 0, 0], vec: side + '\\overrightarrow{i}' },
        { name: 'C', coord: [side, side, 0], vec: side + '\\overrightarrow{i} + ' + side + '\\overrightarrow{j}' },
        { name: 'D', coord: [0, side, 0], vec: side + '\\overrightarrow{j}' },
        { name: "A'", coord: [0, 0, side], vec: side + '\\overrightarrow{k}' },
        { name: "B'", coord: [side, 0, side], vec: side + '\\overrightarrow{i} + ' + side + '\\overrightarrow{k}' },
        { name: "C'", coord: [side, side, side], vec: side + '\\overrightarrow{i} + ' + side + '\\overrightarrow{j} + ' + side + '\\overrightarrow{k}' },
        { name: "D'", coord: [0, side, side], vec: side + '\\overrightarrow{j} + ' + side + '\\overrightarrow{k}' },
      ];
      const v = vertices[targetIdx];
      const correct = '$' + u.formatCoord3D(v.coord[0], v.coord[1], v.coord[2]) + '$';
      const candAll = [
        [side, side, side],
        [side, side, 0],
        [0, side, 0],
        [side, 0, side],
        [0, 0, side],
        [-side, side, side],
        [0, side, side],
      ];
      const distractors = candAll.map((c) => '$' + u.formatCoord3D(c[0], c[1], c[2]) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(v.coord[0] + k, v.coord[1], v.coord[2]) + '$'
      );
      return {
        stem:
          "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $" +
          side +
          "$. Chọn hệ trục tọa độ $Oxyz$ sao cho $O \\equiv A$, các tia $Ox, Oy, Oz$ lần lượt chứa các cạnh $AB, AD, AA'$. Tọa độ của điểm $" +
          v.name +
          "$ là:",
        options,
        correctIndex,
        answerSummary: '$' + v.name + u.formatCoord3D(v.coord[0], v.coord[1], v.coord[2]) + '$',
        solutionSteps: [
          "Vì $AB = AD = AA' = " + side + "$ và $B \\in Ox,\\, D \\in Oy,\\, A' \\in Oz$ nên $\\overrightarrow{AB} = " + side + "\\overrightarrow{i}$, $\\overrightarrow{AD} = " + side + "\\overrightarrow{j}$, $\\overrightarrow{AA'} = " + side + "\\overrightarrow{k}$.",
          'Do đó $\\overrightarrow{A' + v.name + '} = ' + v.vec + ' \\Rightarrow ' + v.name + u.formatCoord3D(v.coord[0], v.coord[1], v.coord[2]) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh bằng 0', params: { side: 0, targetIdx: 6 }, expectedValid: false },
      { label: "Mẫu chuẩn đề gốc cạnh 6, đỉnh D'", params: { side: 6, targetIdx: 6 }, expectedValid: true },
      { label: "Đỉnh đối diện C'", params: { side: 4, targetIdx: 5 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9)
  t12_b7_d09_rect_pyramid_coord_mc: {
    id: 't12_b7_d09_rect_pyramid_coord_mc',
    name: 'Tọa độ đỉnh của hình chóp S.ABCD có đáy hình chữ nhật và SA vuông góc đáy',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Gắn hệ trục tọa độ vào hình chóp',
    description:
      'Cho hình chóp S.ABCD đáy chữ nhật AB = a, AD = b, SA = h vuông góc với đáy. Chọn O ≡ A và B ∈ Ox, D ∈ Oy, S ∈ Oz. Tìm tọa độ điểm B, C, D hoặc S.',
    conditionSummary: 'a, b, h > 0 đôi một khác nhau để các phương án hoán vị tọa độ không trùng nhau',
    paramSpecs: [
      { name: 'a', label: 'Độ dài AB = a', min: 2, max: 10 },
      { name: 'b', label: 'Độ dài AD = b', min: 2, max: 10 },
      { name: 'h', label: 'Độ dài SA = h', min: 1, max: 10 },
      { name: 'targetIdx', label: 'Điểm cần tìm (0:B, 1:C, 2:D, 3:S)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, h, targetIdx } = params;
      if (a <= 0 || b <= 0 || h <= 0) {
        return { valid: false, reason: 'Các kích thước phải dương' };
      }
      if (a === b || b === h || a === h) {
        return { valid: false, reason: 'Cần a, b, h đôi một khác nhau để phân biệt các phương án nhiễu' };
      }
      if (![0, 1, 2, 3].includes(targetIdx)) {
        return { valid: false, reason: 'targetIdx phải thuộc [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h, targetIdx } = params;
      const pts = [
        { name: 'B', coord: [a, 0, 0], note: 'nằm trên tia $Ox$ và $AB = ' + a + '$' },
        { name: 'C', coord: [a, b, 0], note: 'thỏa mãn $\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{AD} = ' + a + '\\overrightarrow{i} + ' + b + '\\overrightarrow{j}$' },
        { name: 'D', coord: [0, b, 0], note: 'nằm trên tia $Oy$ và $AD = ' + b + '$' },
        { name: 'S', coord: [0, 0, h], note: 'nằm trên tia $Oz$ và $SA = ' + h + '$' },
      ];
      const target = pts[targetIdx];
      const correct = '$' + u.formatCoord3D(target.coord[0], target.coord[1], target.coord[2]) + '$';
      const candPool = [
        [a, 0, 0],
        [0, a, 0],
        [0, 0, a],
        [0, b, 0],
        [b, 0, 0],
        [0, 0, h],
        [a, b, 0],
        [b, a, 0],
      ];
      const distractors = candPool.map((c) => '$' + u.formatCoord3D(c[0], c[1], c[2]) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(target.coord[0], target.coord[1] + k, target.coord[2]) + '$'
      );
      return {
        stem:
          'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật $ABCD$, $AB = ' +
          a +
          '$, $AD = ' +
          b +
          '$, $SA = ' +
          h +
          '$ và $SA \\perp (ABCD)$. Thiết lập hệ trục tọa độ $Oxyz$ với gốc $O$ trùng với $A$, các điểm $B, D, S$ lần lượt nằm trên các tia $Ox, Oy, Oz$. Tọa độ của điểm $' +
          target.name +
          '$ là:',
        options,
        correctIndex,
        answerSummary: '$' + target.name + u.formatCoord3D(target.coord[0], target.coord[1], target.coord[2]) + '$',
        solutionSteps: [
          'Theo giả thiết, điểm $' + target.name + '$ ' + target.note + '.',
          'Do đó $' + target.name + u.formatCoord3D(target.coord[0], target.coord[1], target.coord[2]) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = b (đáy vuông làm trùng đáp án nhiễu)', params: { a: 4, b: 4, h: 3, targetIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc AB=8, AD=3, SA=1 tìm D', params: { a: 8, b: 3, h: 1, targetIdx: 2 }, expectedValid: true },
      { label: 'Tìm đỉnh C(a; b; 0)', params: { a: 5, b: 2, h: 6, targetIdx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10)
  t12_b7_d10_right_tri_pyramid_coord_mc: {
    id: 't12_b7_d10_right_tri_pyramid_coord_mc',
    name: 'Tọa độ đỉnh của hình chóp S.ABC đáy tam giác vuông tại A và SA vuông góc đáy',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Gắn hệ trục tọa độ vào hình chóp',
    description:
      'Cho hình chóp S.ABC có đáy ABC vuông tại A, AB = a, AC = b, SA = h vuông góc với (ABC). Gắn hệ trục O ≡ A và B ∈ Ox, C ∈ Oy, S ∈ Oz.',
    conditionSummary: 'a, b, h > 0 đôi một khác nhau',
    paramSpecs: [
      { name: 'a', label: 'Độ dài AB = a', min: 1, max: 10 },
      { name: 'b', label: 'Độ dài AC = b', min: 1, max: 10 },
      { name: 'h', label: 'Độ dài SA = h', min: 1, max: 10 },
      { name: 'targetIdx', label: 'Điểm cần tìm (0:B, 1:C, 2:S)', min: 0, max: 2 },
    ],
    validateCode: `
      const { a, b, h, targetIdx } = params;
      if (a <= 0 || b <= 0 || h <= 0) return { valid: false, reason: 'Các cạnh phải dương' };
      if (a === b || b === h || a === h) return { valid: false, reason: 'Cần a, b, h đôi một khác nhau' };
      if (![0, 1, 2].includes(targetIdx)) return { valid: false, reason: 'targetIdx thuộc [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h, targetIdx } = params;
      const pts = [
        { name: 'B', coord: [a, 0, 0], axis: 'Ox', len: a, edge: 'AB' },
        { name: 'C', coord: [0, b, 0], axis: 'Oy', len: b, edge: 'AC' },
        { name: 'S', coord: [0, 0, h], axis: 'Oz', len: h, edge: 'SA' },
      ];
      const t = pts[targetIdx];
      const correct = '$' + u.formatCoord3D(t.coord[0], t.coord[1], t.coord[2]) + '$';
      const pool = [
        [a, 0, 0],
        [0, b, 0],
        [0, 0, h],
        [h, 0, 0],
        [0, h, 0],
        [0, 0, -h],
        [a, b, 0],
      ];
      const distractors = pool.map((c) => '$' + u.formatCoord3D(c[0], c[1], c[2]) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(t.coord[0], t.coord[1], t.coord[2] + k) + '$'
      );
      return {
        stem:
          'Cho hình chóp $S.ABC$ có đáy là tam giác $ABC$ vuông tại $A$, $AB = ' +
          a +
          '$, $AC = ' +
          b +
          '$, $SA = ' +
          h +
          '$ và $SA \\perp (ABC)$. Thiết lập hệ trục tọa độ $Oxyz$ với gốc $O$ trùng với $A$, các điểm $B, C, S$ lần lượt nằm trên các tia $Ox, Oy, Oz$. Tọa độ của điểm $' +
          t.name +
          '$ là:',
        options,
        correctIndex,
        answerSummary: '$' + t.name + u.formatCoord3D(t.coord[0], t.coord[1], t.coord[2]) + '$',
        solutionSteps: [
          'Vì điểm $' + t.name + '$ nằm trên tia $' + t.axis + '$ và $' + t.edge + ' = ' + t.len + '$ nên $' + t.name + u.formatCoord3D(t.coord[0], t.coord[1], t.coord[2]) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = h', params: { a: 3, b: 1, h: 3, targetIdx: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc AB=2, AC=1, SA=6 tìm S', params: { a: 2, b: 1, h: 6, targetIdx: 2 }, expectedValid: true },
      { label: 'Tìm đỉnh B(a;0;0)', params: { a: 4, b: 3, h: 5, targetIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11)
  t12_b7_d11_equi_tri_pyramid_mid_coord_mc: {
    id: 't12_b7_d11_equi_tri_pyramid_mid_coord_mc',
    name: 'Tọa độ đỉnh khi chọn gốc O là trung điểm cạnh đáy tam giác đều',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Gắn hệ trục tọa độ vào hình chóp',
    description:
      'Cho hình chóp S.ABC đáy là tam giác đều cạnh a, SA ⊥ (ABC), SA = h. Chọn O trung điểm BC, B ∈ Ox, A ∈ Oy, tia Oz cùng hướng AS. Tìm tọa độ B hoặc C.',
    conditionSummary: 'a chẵn (step 2) để a/2 là số nguyên đẹp; h ≥ 1',
    paramSpecs: [
      { name: 'a', label: 'Cạnh tam giác đều a', min: 4, max: 14, step: 2 },
      { name: 'h', label: 'Chiều cao SA = h', min: 2, max: 10 },
      { name: 'targetIdx', label: 'Đỉnh cần tìm (0:B, 1:C)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, h, targetIdx } = params;
      if (a < 2 || a % 2 !== 0) return { valid: false, reason: 'Chọn cạnh a chẵn ≥ 2 để hoành độ a/2 nguyên' };
      if (h <= 0) return { valid: false, reason: 'Chiều cao h phải dương' };
      if (targetIdx !== 0 && targetIdx !== 1) return { valid: false, reason: 'targetIdx chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h, targetIdx } = params;
      const half = a / 2;
      const isB = targetIdx === 0;
      const xAns = isB ? half : -half;
      const ptName = isB ? 'B' : 'C';
      const correct = '$' + u.formatCoord3D(xAns, 0, 0) + '$';
      const distractors = [
        '$' + u.formatCoord3D(-xAns, 0, 0) + '$',
        '$' + u.formatCoord3D(0, half, 0) + '$',
        '$' + u.formatCoord3D(0, 0, half) + '$',
        '$' + u.formatCoord3D(a, 0, 0) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(xAns + (isB ? k : -k), 0, 0) + '$'
      );
      return {
        stem:
          'Cho hình chóp $S.ABC$ có đáy $ABC$ là tam giác đều cạnh $' +
          a +
          '$, $SA \\perp (ABC)$ và $SA = ' +
          h +
          '$. Thiết lập hệ trục tọa độ $Oxyz$ với $O$ là trung điểm $BC$, $B$ nằm trên tia $Ox$, $A$ nằm trên tia $Oy$, tia $Oz$ cùng hướng với vectơ $\\overrightarrow{AS}$. Tìm tọa độ điểm $' +
          ptName +
          '$.',
        options,
        correctIndex,
        answerSummary: '$' + ptName + u.formatCoord3D(xAns, 0, 0) + '$',
        solutionSteps: [
          'Tam giác $ABC$ đều cạnh $' + a + '$ có $O$ là trung điểm $BC$ nên $OA \\perp BC$ và $OB = OC = \\frac{' + a + '}{2} = ' + half + '$.',
          isB
            ? 'Do $B$ thuộc tia $Ox$ và $OB = ' + half + '$ nên $B' + u.formatCoord3D(half, 0, 0) + '$.'
            : 'Do $O$ là trung điểm $BC$ và $B$ thuộc tia $Ox$ nên $C$ nằm trên tia đối của tia $Ox$ với $OC = ' + half + '$, suy ra $C' + u.formatCoord3D(-half, 0, 0) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a lẻ (a/2 không nguyên)', params: { a: 5, h: 4, targetIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=8, SA=4 tìm B', params: { a: 8, h: 4, targetIdx: 0 }, expectedValid: true },
      { label: 'Tìm đỉnh C đối xứng trên tia đối Ox', params: { a: 6, h: 3, targetIdx: 1 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI (5 DẠNG: DẠNG 12 -> DẠNG 16)
  // =====================================================================

  // Dạng 12 (Q12)
  t12_b7_d12_cuboid_origin_vertex_tf: {
    id: 't12_b7_d12_cuboid_origin_vertex_tf',
    name: "Đọc tọa độ đỉnh, tâm mặt và vectơ trong hình hộp chữ nhật ABCD.A'B'C'D' (O ≡ A)",
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Gắn hệ trục tọa độ vào hình hộp chữ nhật',
    description:
      "Cho hình hộp chữ nhật ABCD.A'B'C'D' có AB = a, AD = b, AA' = h và hệ trục Oxyz (O ≡ A). Xét 4 mệnh đề về tâm mặt, tọa độ đỉnh và biểu diễn vectơ.",
    conditionSummary: 'a, b, h ≥ 2, a ≠ b để tránh trùng lặp cạnh',
    paramSpecs: [
      { name: 'a', label: 'Độ dài AB = a', min: 2, max: 9 },
      { name: 'b', label: 'Độ dài AD = b', min: 2, max: 9 },
      { name: 'h', label: "Độ dài AA' = h", min: 2, max: 9 },
      { name: 'mode', label: 'Biến thể Đ/S (0: chuẩn, 1: đảo)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, h, mode } = params;
      if (a < 2 || b < 2 || h < 2) return { valid: false, reason: 'Kích thước a, b, h phải >= 2' };
      if (a === b) return { valid: false, reason: 'Cần a ≠ b để hình chữ nhật không suy biến thành đáy vuông' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h, mode } = params;
      const ha = u.simplifyFrac(a, 2);
      const hb = u.simplifyFrac(b, 2);
      const hh = u.simplifyFrac(h, 2);
      const haFake = u.simplifyFrac(a + 4, 2);
      const isAlt = mode === 1;

      const tfStatements = [
        {
          key: 'a',
          text: isAlt
            ? "Tâm $I$ của hình chữ nhật $A'B'C'D'$ có tọa độ là $\\left(" + ha.latex + ";\\, " + hb.latex + ";\\, " + h + "\\right)$."
            : "Tâm $I$ của hình chữ nhật $A'B'C'D'$ có tọa độ là $\\left(" + haFake.latex + ";\\, " + hb.latex + ";\\, " + hh.latex + "\\right)$.",
          isTrue: isAlt,
        },
        {
          key: 'b',
          text: "Tọa độ của điểm $C'$ là $" + u.formatCoord3D(a, b, h) + "$.",
          isTrue: true,
        },
        {
          key: 'c',
          text: isAlt
            ? "$\\overrightarrow{D'C'} = " + a + "\\overrightarrow{i} + 0\\overrightarrow{j} + 0\\overrightarrow{k}$."
            : "$\\overrightarrow{D'C'} = -" + a + "\\overrightarrow{i} + 0\\overrightarrow{j} + 0\\overrightarrow{k}$.",
          isTrue: isAlt,
        },
        {
          key: 'd',
          text: "Tọa độ của điểm $D'$ là $" + u.formatCoord3D(a - 1, b - 1, h + 2) + "$.",
          isTrue: false,
        },
      ];

      return {
        stem:
          "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB = " +
          a +
          ",\\, AD = " +
          b +
          ",\\, AA' = " +
          h +
          "$. Chọn hệ trục tọa độ $Oxyz$ như hình vẽ (gốc $O \\equiv A$, các tia $Ox, Oy, Oz$ lần lượt chứa $AB, AD, AA'$). Xét tính đúng sai của các khẳng định sau:",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 0 },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "Ta có $A'(0;\\, 0;\\, " + h + ")$ và $C'(" + a + ";\\, " + b + ";\\, " + h + ")$, nên trung điểm $I$ của $A'C'$ có tọa độ $\\left(" + ha.latex + ";\\, " + hb.latex + ";\\, " + h + "\\right)$ (ý a " + (isAlt ? 'đúng' : 'sai') + ').',
          "Vì $\\overrightarrow{AC'} = \\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = " + a + "\\overrightarrow{i} + " + b + "\\overrightarrow{j} + " + h + "\\overrightarrow{k}$ nên $C'" + u.formatCoord3D(a, b, h) + "$ (ý b đúng).",
          "Ta có $\\overrightarrow{D'C'} = \\overrightarrow{AB} = " + a + "\\overrightarrow{i} + 0\\overrightarrow{j} + 0\\overrightarrow{k}$ (ý c " + (isAlt ? 'đúng' : 'sai') + ').',
          "Ta có $\\overrightarrow{AD'} = \\overrightarrow{AD} + \\overrightarrow{AA'} = " + b + "\\overrightarrow{j} + " + h + "\\overrightarrow{k}$ nên $D'" + u.formatCoord3D(0, b, h) + "$ (ý d sai).",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = b', params: { a: 3, b: 3, h: 2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=3, b=5, h=2', params: { a: 3, b: 5, h: 2, mode: 0 }, expectedValid: true },
      { label: 'Biến thể đảo Đ/S', params: { a: 4, b: 6, h: 3, mode: 1 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13)
  t12_b7_d13_cube_center_axes_tf: {
    id: 't12_b7_d13_cube_center_axes_tf',
    name: "Xác định tọa độ các đỉnh hình lập phương khi gốc O trùng tâm đáy P",
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Gắn hệ trục tọa độ vào hình lập phương',
    description:
      "Cho hình lập phương ABCD.A'B'C'D' cạnh k, P và P' là tâm hai đáy. Chọn hệ trục Oxyz có gốc O ≡ P, Ox, Oy, Oz đi qua B, C, P'. Xét 4 mệnh đề tọa độ.",
    conditionSummary: 'k ∈ [2; 10] là cạnh hình lập phương, mode ∈ {0, 1}',
    paramSpecs: [
      { name: 'k', label: 'Độ dài cạnh hình lập phương', min: 2, max: 10 },
      { name: 'mode', label: 'Biến thể (0: chuẩn, 1: sai c,d)', min: 0, max: 1 },
    ],
    validateCode: `
      const { k, mode } = params;
      if (k < 2) return { valid: false, reason: 'Cạnh hình lập phương phải >= 2' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, mode } = params;
      const fmtHalfSqrt2 = (coef, neg = false) => {
        const s = neg ? '-' : '';
        if (coef % 2 === 0) {
          const half = coef / 2;
          return half === 1 ? s + '\\sqrt{2}' : s + half + '\\sqrt{2}';
        }
        return s + '\\frac{' + coef + '\\sqrt{2}}{2}';
      };
      const rPos = fmtHalfSqrt2(k, false);
      const rNeg = fmtHalfSqrt2(k, true);
      const isStd = mode === 0;

      const tfStatements = [
        {
          key: 'a',
          text: "Tọa độ của điểm $C'$ là $\\left(0;\\, " + rPos + ";\\, " + k + "\\right)$.",
          isTrue: true,
        },
        {
          key: 'b',
          text: "Tọa độ của điểm $B'$ là $\\left(" + rPos + ";\\, 0;\\, " + k + "\\right)$.",
          isTrue: true,
        },
        {
          key: 'c',
          text: isStd
            ? "Tọa độ của điểm $D'$ là $\\left(" + rNeg + ";\\, 0;\\, " + k + "\\right)$."
            : "Tọa độ của điểm $D'$ là $\\left(" + rPos + ";\\, 0;\\, " + k + "\\right)$.",
          isTrue: isStd,
        },
        {
          key: 'd',
          text: isStd
            ? "Tọa độ của điểm $B$ là $\\left(" + rPos + ";\\, 0;\\, 0\\right)$."
            : "Tọa độ của điểm $B$ là $\\left(0;\\, " + rPos + ";\\, 0\\right)$.",
          isTrue: isStd,
        },
      ];

      return {
        stem:
          "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $" +
          k +
          "$. Gọi $P, P'$ lần lượt là tâm các hình vuông $ABCD$ và $A'B'C'D'$. Xét hệ trục tọa độ $Oxyz$ như hình vẽ (gốc $O$ trùng $P$, các tia $Ox, Oy, Oz$ lần lượt đi qua $B, C, P'$). Xét tính đúng sai của các khẳng định sau:",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cube_axes_center_3d',
          params: { k },
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Đường chéo hình vuông $ABCD$ cạnh $' + k + '$ bằng $' + k + '\\sqrt{2}$, suy ra $PB = PC = PD = ' + rPos + '$ và $PP\' = ' + k + '$.',
          "Vì $B$ nằm trên tia $Ox$ nên $B\\left(" + rPos + ";\\, 0;\\, 0\\right)$ (ý d " + (isStd ? 'đúng' : 'sai') + ").",
          "Từ $\\overrightarrow{PB} = " + rPos + "\\overrightarrow{i}$, $\\overrightarrow{PC} = " + rPos + "\\overrightarrow{j}$, $\\overrightarrow{PD} = " + rNeg + "\\overrightarrow{i}$ và $\\overrightarrow{PP'} = " + k + "\\overrightarrow{k}$:",
          "Ta suy ra $C'\\left(0;\\, " + rPos + ";\\, " + k + "\\right)$ (ý a đúng), $B'\\left(" + rPos + ";\\, 0;\\, " + k + "\\right)$ (ý b đúng) và $D'\\left(" + rNeg + ";\\, 0;\\, " + k + "\\right)$ (ý c " + (isStd ? 'đúng' : 'sai') + ").",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh k = 1 (< 2)', params: { k: 1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc k = 5', params: { k: 5, mode: 0 }, expectedValid: true },
      { label: 'Biên k chẵn rút gọn căn (k = 4)', params: { k: 4, mode: 1 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14)
  t12_b7_d14_box_given_4pts_tf: {
    id: 't12_b7_d14_box_given_4pts_tf',
    name: "Xác định các đỉnh còn lại, vectơ và trung điểm trong hình hộp khi biết A, C, C', D'",
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tìm đỉnh và trung điểm hình hộp trong Oxyz',
    description:
      "Cho hình hộp ABCD.A'B'C'D' biết tọa độ bốn đỉnh A, C, C', D'. Xét 4 khẳng định về vectơ B'D, vectơ AB, trung điểm A'B' và trung điểm BD.",
    conditionSummary: 'Định thức ba vectơ cạnh det(AB, AD, AA\') ≠ 0 để hình hộp không suy biến',
    paramSpecs: [
      { name: 'ax', label: 'Hoành độ A', min: -2, max: 2 },
      { name: 'ux', label: 'Hoành độ AB', min: -6, max: -2 },
      { name: 'vz', label: 'Cao độ AD', min: 4, max: 9 },
      { name: 'wx', label: "Hoành độ AA'", min: -3, max: -1 },
      { name: 'mode', label: 'Biến thể Đ/S (0: chuẩn, 1: b,d đúng)', min: 0, max: 1 },
    ],
    validateCode: `
      const { ux, vz, wx, mode } = params;
      // AB = (ux, 4, -5), AD = (0, -5, vz), AA' = (wx, 1, 0)
      const det = ux * (-vz) + 4 * (-wx * vz) - 5 * (5 * wx);
      if (det === 0) return { valid: false, reason: 'Ba vectơ cạnh đồng phẳng (suy biến)' };
      const { ax } = params;
      const xB = ax + ux;
      const xD = ax;
      if (xB + xD === 0) return { valid: false, reason: 'Tránh hoành độ trung điểm BD bằng 0' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ax, ux, vz, wx, mode } = params;
      const A = [ax, 1, -2];
      const AB = [ux, 4, -5];
      const AD = [0, -5, vz];
      const AA1 = [wx, 1, 0];

      const B = [A[0] + AB[0], A[1] + AB[1], A[2] + AB[2]];
      const D = [A[0] + AD[0], A[1] + AD[1], A[2] + AD[2]];
      const C = [D[0] + AB[0], D[1] + AB[1], D[2] + AB[2]];
      const A1 = [A[0] + AA1[0], A[1] + AA1[1], A[2] + AA1[2]];
      const B1 = [B[0] + AA1[0], B[1] + AA1[1], B[2] + AA1[2]];
      const C1 = [C[0] + AA1[0], C[1] + AA1[1], C[2] + AA1[2]];
      const D1 = [D[0] + AA1[0], D[1] + AA1[1], D[2] + AA1[2]];

      const vecB1D = [D[0] - B1[0], D[1] - B1[1], D[2] - B1[2]];
      const midA1B1X = u.simplifyFrac(A1[0] + B1[0], 2);
      const midA1B1Y = u.simplifyFrac(A1[1] + B1[1], 2);
      const midA1B1Z = u.simplifyFrac(A1[2] + B1[2], 2);

      const midBDX = u.simplifyFrac(B[0] + D[0], 2);
      const midBDXNeg = u.simplifyFrac(-(B[0] + D[0]), 2);
      const midBDY = u.simplifyFrac(B[1] + D[1], 2);
      const midBDZ = u.simplifyFrac(B[2] + D[2], 2);

      const isStd = mode === 0;
      const tfStatements = [
        {
          key: 'a',
          text:
            "Tọa độ của vectơ $\\overrightarrow{B'D}$ là $" +
            u.formatCoord3D(vecB1D[0], vecB1D[1], -vecB1D[2]) +
            "$.",
          isTrue: false,
        },
        {
          key: 'b',
          text:
            "Tọa độ của vectơ $\\overrightarrow{AB}$ là $" +
            (isStd ? u.formatCoord3D(AB[0], -AB[1], AB[2]) : u.formatCoord3D(AB[0], AB[1], AB[2])) +
            "$.",
          isTrue: !isStd,
        },
        {
          key: 'c',
          text:
            "Tọa độ trung điểm của đoạn thẳng $A'B'$ là $\\left(" +
            midA1B1X.latex +
            ";\\, " +
            (midA1B1Y.value + 1) +
            ";\\, " +
            midA1B1Z.latex +
            "\\right)$.",
          isTrue: false,
        },
        {
          key: 'd',
          text:
            "Tọa độ trung điểm của đoạn thẳng $BD$ là $\\left(" +
            (isStd ? midBDXNeg.latex : midBDX.latex) +
            ";\\, " +
            midBDY.latex +
            ";\\, " +
            midBDZ.latex +
            "\\right)$.",
          isTrue: !isStd,
        },
      ];

      return {
        stem:
          "Cho hình hộp $ABCD.A'B'C'D'$ có $A" +
          u.formatCoord3D(A[0], A[1], A[2]) +
          "$, $C" +
          u.formatCoord3D(C[0], C[1], C[2]) +
          "$, $C'" +
          u.formatCoord3D(C1[0], C1[1], C1[2]) +
          "$ và $D'" +
          u.formatCoord3D(D1[0], D1[1], D1[2]) +
          "$. Xét tính đúng sai của các khẳng định sau:",
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "Từ $\\overrightarrow{C'C} = " + u.formatCoord3D(C[0] - C1[0], C[1] - C1[1], C[2] - C1[2]) + "$ suy ra $D = D' + \\overrightarrow{C'C} = " + u.formatCoord3D(D[0], D[1], D[2]) + "$.",
          "Vì $ABCD$ là hình bình hành nên $\\overrightarrow{AB} = \\overrightarrow{DC} = " + u.formatCoord3D(AB[0], AB[1], AB[2]) + "$ (ý b " + (!isStd ? 'đúng' : 'sai') + "), suy ra $B" + u.formatCoord3D(B[0], B[1], B[2]) + "$.",
          "Tiếp tục có $A' = A + \\overrightarrow{CC'} = " + u.formatCoord3D(A1[0], A1[1], A1[2]) + "$, $B' = B + \\overrightarrow{CC'} = " + u.formatCoord3D(B1[0], B1[1], B1[2]) + "$. Khi đó $\\overrightarrow{B'D} = " + u.formatCoord3D(vecB1D[0], vecB1D[1], vecB1D[2]) + "$ (ý a sai).",
          "Trung điểm $A'B'$ là $\\left(" + midA1B1X.latex + ";\\, " + midA1B1Y.latex + ";\\, " + midA1B1Z.latex + "\\right)$ (ý c sai); trung điểm $BD$ là $\\left(" + midBDX.latex + ";\\, " + midBDY.latex + ";\\, " + midBDZ.latex + "\\right)$ (ý d " + (!isStd ? 'đúng' : 'sai') + ").",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xB + xD = 0', params: { ax: 2, ux: -4, vz: 7, wx: -1, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc A(0;1;-2), C(-4;0;0), C\'(-5;1;0), D\'(-1;-3;5)', params: { ax: 0, ux: -4, vz: 7, wx: -1, mode: 0 }, expectedValid: true },
      { label: 'Biến thể b, d đúng', params: { ax: 1, ux: -3, vz: 5, wx: -2, mode: 1 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15)
  t12_b7_d15_vec_param_m_tf: {
    id: 't12_b7_d15_vec_param_m_tf',
    name: 'Bài toán vectơ chứa tham số m với tung độ khuyết',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tham số và điều kiện trung điểm, hình bình hành trong Oxyz',
    description:
      'Cho OA = a1.i + a2.j + a3.k và OB = m.i - (m^2 + 1).k. Xét 4 khẳng định về trung điểm, tọa độ AB, tọa độ điểm A và điều kiện hình bình hành.',
    conditionSummary: 'a1 < 0, a2 > 0, a3 < 0, mVal ≥ 1 để tung độ trung điểm không thể bằng 0',
    paramSpecs: [
      { name: 'a1', label: 'Hoành độ a1', min: -5, max: -1 },
      { name: 'a2', label: 'Tung độ a2', min: 1, max: 6 },
      { name: 'a3', label: 'Cao độ a3', min: -5, max: -1 },
      { name: 'mVal', label: 'Giá trị m mẫu', min: 1, max: 4 },
      { name: 'mode', label: 'Biến thể (0: chuẩn, 1: ý a đúng)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a1, a2, a3, mVal, mode } = params;
      if (a1 >= 0 || a2 <= 0 || a3 >= 0 || mVal < 1) {
        return { valid: false, reason: 'Cần a1 < 0, a2 > 0, a3 < 0 và mVal ≥ 1' };
      }
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, a3, mVal, mode } = params;
      const vecOA =
        u.formatTerm(a1, '\\overrightarrow{i}', true) +
        u.formatTerm(a2, '\\overrightarrow{j}', false) +
        u.formatTerm(a3, '\\overrightarrow{k}', false);
      const xE = a1 - 2;
      const yE = a2 + 1;
      const zE = a3;
      const yMidAE = u.simplifyFrac(2 * a2 + 1, 2);
      const zBm = -(mVal * mVal + 1);
      const abX = mVal - a1;
      const abY = -a2;
      const abZ = zBm - a3;
      const isAlt = mode === 1;

      const tfStatements = [
        {
          key: 'a',
          text: isAlt
            ? 'Với điểm $E' + u.formatCoord3D(xE, yE, zE) + '$, không tồn tại giá trị $m$ để $B$ là trung điểm của đoạn $AE$.'
            : 'Với điểm $E' + u.formatCoord3D(xE, yE, zE) + '$, có hai giá trị của $m$ để $B$ là trung điểm của đoạn $AE$.',
          isTrue: isAlt,
        },
        {
          key: 'b',
          text: 'Khi $m = ' + mVal + '$ thì $\\overrightarrow{AB} = ' + u.formatCoord3D(abX, abY, abZ) + '$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Tọa độ điểm $A$ là $' + u.formatCoord3D(a1, a2, a3 - 1) + '$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Với hai điểm $C(2;\\, 3;\\, 3)$ và $D(4;\\, -5;\\, 0)$, tồn tại duy nhất giá trị của $m$ để $ABCD$ là hình bình hành.',
          isTrue: false,
        },
      ];

      return {
        stem:
          'Trong không gian $Oxyz$, cho $\\overrightarrow{OA} = ' +
          vecOA +
          '$ và $\\overrightarrow{OB} = m\\overrightarrow{i} - (m^2 + 1)\\overrightarrow{k}$ ($m$ là tham số). Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Từ giả thiết suy ra $A' + u.formatCoord3D(a1, a2, a3) + '$ (ý c sai) và $B(m;\\, 0;\\, -(m^2 + 1))$.',
          'Trung điểm đoạn $AE$ có tung độ $\\frac{' + a2 + ' + ' + yE + '}{2} = ' + yMidAE.latex + ' \\ne 0 = y_B$, nên không tồn tại $m$ để $B$ là trung điểm $AE$ (ý a ' + (isAlt ? 'đúng' : 'sai') + ').',
          'Khi $m = ' + mVal + '$ thì $B(' + mVal + ';\\, 0;\\, ' + zBm + ')$, suy ra $\\overrightarrow{AB} = ' + u.formatCoord3D(abX, abY, abZ) + '$ (ý b đúng).',
          'Để $ABCD$ là hình bình hành thì $\\overrightarrow{AB} = \\overrightarrow{DC} = (-2;\\, 8;\\, 3)$, dẫn đến $y_B = ' + (a2 + 8) + ' \\ne 0$ (vô nghiệm $m$, ý d sai).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a2 = 0', params: { a1: -3, a2: 0, a3: -2, mVal: 2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (-3; 4; -2), m=2', params: { a1: -3, a2: 4, a3: -2, mVal: 2, mode: 0 }, expectedValid: true },
      { label: 'Biến thể ý a đúng', params: { a1: -2, a2: 3, a3: -1, mVal: 1, mode: 1 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16)
  t12_b7_d16_cuboid_O_corner_tf: {
    id: 't12_b7_d16_cuboid_O_corner_tf',
    name: "Xác định tọa độ đỉnh và vectơ trong hình hộp chữ nhật OBCD.O'B'C'D'",
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Gắn hệ trục tọa độ vào hình hộp chữ nhật',
    description:
      "Cho hình hộp chữ nhật OBCD.O'B'C'D' với OB = a, OD = b, OO' = h và B ∈ Ox, D ∈ Oy, O' ∈ Oz. Xét 4 khẳng định về C', OB', BM (M trung điểm C'D') và CB.",
    conditionSummary: 'a, b, h ≥ 2 đôi một khác nhau',
    paramSpecs: [
      { name: 'a', label: 'Độ dài OB = a', min: 2, max: 10 },
      { name: 'b', label: 'Độ dài OD = b', min: 2, max: 10 },
      { name: 'h', label: "Độ dài OO' = h", min: 2, max: 10 },
      { name: 'flipD', label: 'Đảo dấu ý d (0: Đúng, 1: Sai)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, h, flipD } = params;
      if (a < 2 || b < 2 || h < 2) return { valid: false, reason: 'Các kích thước phải >= 2' };
      if (a === b || b === h || a === h) return { valid: false, reason: 'Cần a, b, h đôi một khác nhau' };
      if (flipD !== 0 && flipD !== 1) return { valid: false, reason: 'flipD chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h, flipD } = params;
      const halfA = u.simplifyFrac(a, 2);
      const negHalfA = u.simplifyFrac(-a, 2);
      const isDTrue = flipD === 0;
      const tfStatements = [
        {
          key: 'a',
          text: "Điểm $C'$ có tọa độ là $" + u.formatCoord3D(a, b, h) + "$.",
          isTrue: true,
        },
        {
          key: 'b',
          text: "$\\overrightarrow{OB'} = " + a + "\\overrightarrow{i} + " + h + "\\overrightarrow{k}$.",
          isTrue: true,
        },
        {
          key: 'c',
          text: "Gọi $M$ là trung điểm cạnh $C'D'$. Khi đó $\\overrightarrow{BM} = \\left(" + negHalfA.latex + ";\\, " + b + ";\\, " + h + "\\right)$.",
          isTrue: true,
        },
        {
          key: 'd',
          text: "$\\overrightarrow{CB} = " + u.formatCoord3D(0, isDTrue ? -b : b, 0) + "$.",
          isTrue: isDTrue,
        },
      ];

      return {
        stem:
          "Trong không gian cho hình hộp chữ nhật $OBCD.O'B'C'D'$ có $OB = " +
          a +
          ",\\, OD = " +
          b +
          ",\\, OO' = " +
          h +
          "$. Xét hệ trục tọa độ $Oxyz$ sao cho các điểm $B, D, O'$ lần lượt nằm trên các tia $Ox, Oy, Oz$. Xét tính đúng sai của các khẳng định sau:",
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "Từ giả thiết ta có $B(" + a + ";\\, 0;\\, 0)$, $D(0;\\, " + b + ";\\, 0)$, $O'(0;\\, 0;\\, " + h + ")$ và $C(" + a + ";\\, " + b + ";\\, 0)$.",
          "Suy ra $C'" + u.formatCoord3D(a, b, h) + "$ (ý a đúng) và $B'(" + a + ";\\, 0;\\, " + h + ") \\Rightarrow \\overrightarrow{OB'} = " + a + "\\overrightarrow{i} + " + h + "\\overrightarrow{k}$ (ý b đúng).",
          "Trung điểm $M$ của $C'D'$ là $M\\left(" + halfA.latex + ";\\, " + b + ";\\, " + h + "\\right)$, nên $\\overrightarrow{BM} = \\left(" + negHalfA.latex + ";\\, " + b + ";\\, " + h + "\\right)$ (ý c đúng).",
          "Ta có $\\overrightarrow{CB} = \\overrightarrow{DO} = (0;\\, -" + b + ";\\, 0)$ (ý d " + (isDTrue ? 'đúng' : 'sai') + ").",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = b', params: { a: 5, b: 5, h: 4, flipD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=5, b=7, h=4', params: { a: 5, b: 7, h: 4, flipD: 0 }, expectedValid: true },
      { label: 'Biến thể ý d sai dấu', params: { a: 3, b: 6, h: 5, flipD: 1 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (5 DẠNG: DẠNG 17 -> DẠNG 21)
  // =====================================================================

  // Dạng 17 (Q17)
  t12_b7_d17_cuboid_face_center_sa: {
    id: 't12_b7_d17_cuboid_face_center_sa',
    name: 'Tọa độ tâm mặt bên của hình hộp chữ nhật ABCD.A1B1C1D1',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Gắn hệ trục tọa độ vào hình hộp chữ nhật',
    description:
      'Cho hình hộp chữ nhật ABCD.A1B1C1D1 (kèm hình minh họa) biết AB, AD, AA1. Tâm M(a; b; c) của mặt ABB1A1. Tính biểu thức tuyến tính P = c1*a + c2*b + c3*c.',
    conditionSummary: 's1, s2, s3 > 0 đôi một khác nhau; c1, c2, c3 ≥ 1',
    paramSpecs: [
      { name: 's1', label: 'Độ dài AB', min: 1, max: 8 },
      { name: 's2', label: 'Độ dài AD', min: 2, max: 10 },
      { name: 's3', label: 'Độ dài AA1', min: 1, max: 8 },
      { name: 'c1', label: 'Hệ số c1', min: 1, max: 5 },
      { name: 'c2', label: 'Hệ số c2', min: 1, max: 4 },
      { name: 'c3', label: 'Hệ số c3', min: 1, max: 5 },
    ],
    validateCode: `
      const { s1, s2, s3, c1, c2, c3 } = params;
      if (s1 <= 0 || s2 <= 0 || s3 <= 0) return { valid: false, reason: 'Kích thước cạnh phải dương' };
      if (s1 === s2 || s2 === s3 || s1 === s3) return { valid: false, reason: 'Cần 3 kích thước đôi một khác nhau' };
      if (c1 <= 0 || c2 <= 0 || c3 <= 0) return { valid: false, reason: 'Hệ số biểu thức phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s1, s2, s3, c1, c2, c3 } = params;
      const aFrac = u.simplifyFrac(s1, 2);
      const cFrac = u.simplifyFrac(s3, 2);
      const pFrac = u.simplifyFrac(c1 * s1 + c3 * s3, 2);
      const pVal = Number(pFrac.value.toFixed(2));
      const pStr = u.formatNumberVN(pVal, 2);
      const exprP =
        u.formatTerm(c1, 'a', true) +
        u.formatTerm(c2, 'b', false) +
        u.formatTerm(c3, 'c', false);

      return {
        stem:
          'Cho hình hộp chữ nhật $ABCD.A_1B_1C_1D_1$ có $AB = ' +
          s1 +
          '$, $AD = ' +
          s2 +
          '$, $AA_1 = ' +
          s3 +
          '$. Chọn hệ trục tọa độ $Oxyz$ như hình vẽ (gốc $O \\equiv A$, các tia $Ox, Oy, Oz$ lần lượt chứa $AB, AD, AA_1$). Biết $M(a;\\, b;\\, c)$ là tâm của hình chữ nhật $ABB_1A_1$. Tính giá trị biểu thức $P = ' +
          exprP +
          '$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'cuboid_axes_vertex_3d',
          params: { variant: 1 },
        },
        shortAnswer: pStr,
        numericValue: pVal,
        answerSummary: pStr,
        solutionSteps: [
          'Trong hệ trục đã chọn: $A(0;\\, 0;\\, 0)$ và $B_1(' + s1 + ';\\, 0;\\, ' + s3 + ')$ (vì $\\overrightarrow{AB_1} = \\overrightarrow{AB} + \\overrightarrow{AA_1} = ' + s1 + '\\overrightarrow{i} + ' + s3 + '\\overrightarrow{k}$).',
          'Tâm $M$ của hình chữ nhật $ABB_1A_1$ là trung điểm $AB_1$, suy ra $M\\left(' + aFrac.latex + ';\\, 0;\\, ' + cFrac.latex + '\\right)$.',
          'Do đó $a = ' + aFrac.latex + ',\\, b = 0,\\, c = ' + cFrac.latex + '$. Vậy $P = ' + exprP + ' = ' + pFrac.latex + (pFrac.isInteger ? '' : ' = ' + pStr) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên s1 = s2', params: { s1: 2, s2: 2, s3: 4, c1: 3, c2: 2, c3: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc AB=1, AD=7, AA1=2 (đáp số 3,5)', params: { s1: 1, s2: 7, s3: 2, c1: 3, c2: 2, c3: 2 }, expectedValid: true },
      { label: 'Biên đáp số nguyên', params: { s1: 4, s2: 5, s3: 6, c1: 2, c2: 3, c3: 1 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18)
  t12_b7_d18_airport_plane_angles_sa: {
    id: 't12_b7_d18_airport_plane_angles_sa',
    name: 'Bài toán thực tế xác định tọa độ máy bay qua góc phương vị và góc nâng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng hệ trục tọa độ Oxyz vào bài toán thực tế',
    description:
      'Gắn hệ trục Oxyz tại sân bay (đơn vị km), máy bay ở vị trí P(a; b; c) với OP = R, (i, OH) = α°, (OH, OP) = β°. Tính a + b + c (làm tròn đến hàng đơn vị).',
    conditionSummary: 'R ≥ 20, α ∈ [15°; 75°], β ∈ [15°; 70°] và tổng cách xa điểm giữa .5 để làm tròn duy nhất',
    paramSpecs: [
      { name: 'R', label: 'Khoảng cách OP (km)', min: 25, max: 85 },
      { name: 'alpha', label: 'Góc phương vị α (độ)', min: 20, max: 70 },
      { name: 'beta', label: 'Góc nâng β (độ)', min: 20, max: 65 },
    ],
    validateCode: `
      const { R, alpha, beta } = params;
      if (R < 20 || alpha < 15 || alpha > 75 || beta < 15 || beta > 70) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lý' };
      }
      const aRad = (alpha * Math.PI) / 180;
      const bRad = (beta * Math.PI) / 180;
      const sum = R * Math.cos(bRad) * (Math.cos(aRad) + Math.sin(aRad)) + R * Math.sin(bRad);
      const frac = Math.abs(sum - Math.floor(sum) - 0.5);
      if (frac < 0.03) {
        return { valid: false, reason: 'Giá trị tổng quá gần .5 dễ gây tranh cãi làm tròn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, alpha, beta } = params;
      const aRad = (alpha * Math.PI) / 180;
      const bRad = (beta * Math.PI) / 180;
      const oh = R * Math.cos(bRad);
      const aVal = oh * Math.cos(aRad);
      const bVal = oh * Math.sin(aRad);
      const cVal = R * Math.sin(bRad);
      const sumVal = aVal + bVal + cVal;
      const rounded = Math.round(sumVal);
      const ansStr = '' + rounded;

      return {
        stem:
          'Tại một sân bay, chọn hệ trục tọa độ $Oxyz$ với gốc $O$ đặt tại đài kiểm soát không lưu (đơn vị trên mỗi trục tính theo kilômét). Tại một thời điểm xác định, một máy bay ở vị trí $P(a;\\, b;\\, c)$ cách đài kiểm soát một khoảng $OP = ' +
          R +
          '\\text{ km}$, góc $(\\overrightarrow{i},\\, \\overrightarrow{OH}) = ' +
          alpha +
          '^\\circ$ và góc $(\\overrightarrow{OH},\\, \\overrightarrow{OP}) = ' +
          beta +
          '^\\circ$ như hình vẽ (với $H$ là hình chiếu vuông góc của $P$ lên mặt phẳng $(Oxy)$). Tính giá trị của $a + b + c$ (làm tròn kết quả đến hàng đơn vị).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'airport_plane_3d',
          params: { alpha, beta },
        },
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Trong tam giác vuông $OHP$ vuông tại $H$: $OH = OP \\cos ' + beta + '^\\circ = ' + R + '\\cos ' + beta + '^\\circ$ và $c = PH = OP \\sin ' + beta + '^\\circ = ' + R + '\\sin ' + beta + '^\\circ \\approx ' + u.formatNumberVN(cVal, 2) + '$.',
          'Trong tam giác vuông $OAH$ vuông tại $A$: $a = OH \\cos ' + alpha + '^\\circ = ' + R + '\\cos ' + beta + '^\\circ \\cos ' + alpha + '^\\circ \\approx ' + u.formatNumberVN(aVal, 2) + '$.',
          'Tương tự, $b = OH \\sin ' + alpha + '^\\circ = ' + R + '\\cos ' + beta + '^\\circ \\sin ' + alpha + '^\\circ \\approx ' + u.formatNumberVN(bVal, 2) + '$.',
          'Suy ra $a + b + c \\approx ' + u.formatNumberVN(sumVal, 2) + ' \\approx ' + rounded + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R quá nhỏ (R = 5)', params: { R: 5, alpha: 45, beta: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc OP=52, α=59°, β=44° (đáp số 87)', params: { R: 52, alpha: 59, beta: 44 }, expectedValid: true },
      { label: 'Biến thể góc phương vị 30°', params: { R: 40, alpha: 30, beta: 45 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19)
  t12_b7_d19_sq_pyramid_vec_sum_sa: {
    id: 't12_b7_d19_sq_pyramid_vec_sum_sa',
    name: 'Tính x + y - z của vectơ AM trong hình chóp tứ giác đều S.ABCD',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Gắn hệ trục tọa độ vào hình chóp đều',
    description:
      'Cho hình chóp tứ giác đều S.ABCD cạnh đáy a, tâm O, chiều cao OS = h. Gắn Oxyz theo các tia OB, OC, OS. M là trung điểm SC, vectơ AM = (x; y; z). Tính x + y - z.',
    conditionSummary: 'a ≥ 2, h ≥ 2 và kết quả tránh vùng .x5 để làm tròn hàng phần mười duy nhất',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy hình vuông a', min: 2, max: 10 },
      { name: 'h', label: 'Chiều cao SO = h', min: 2, max: 12 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a < 2 || h < 2) return { valid: false, reason: 'Cần a ≥ 2 và h ≥ 2' };
      const val = (3 * a * Math.SQRT2) / 4 - h / 2;
      const dec10 = Math.abs(val * 10);
      const frac = Math.abs(dec10 - Math.floor(dec10) - 0.5);
      if (frac < 0.05) {
        return { valid: false, reason: 'Giá trị quá gần ranh giới làm tròn hàng phần mười' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const halfDiag = a % 2 === 0 ? (a === 2 ? '\\sqrt{2}' : (a / 2) + '\\sqrt{2}') : '\\frac{' + a + '\\sqrt{2}}{2}';
      const quarterDiag = u.simplifyFrac(a, 4);
      const quarterStr = quarterDiag.den === 1
        ? (quarterDiag.num === 1 ? '\\sqrt{2}' : quarterDiag.num + '\\sqrt{2}')
        : '\\frac{' + (quarterDiag.num === 1 ? '' : quarterDiag.num) + '\\sqrt{2}}{' + quarterDiag.den + '}';
      const yVecFrac = u.simplifyFrac(3 * a, 4);
      const yVecStr = yVecFrac.den === 1
        ? yVecFrac.num + '\\sqrt{2}'
        : '\\frac{' + yVecFrac.num + '\\sqrt{2}}{' + yVecFrac.den + '}';
      const hHalf = u.simplifyFrac(h, 2);

      const rawVal = (3 * a * Math.SQRT2) / 4 - h / 2;
      const rounded = Number(rawVal.toFixed(1));
      const ansStr = u.formatNumberVN(rounded, 1);

      return {
        stem:
          'Cho hình chóp tứ giác đều $S.ABCD$ có cạnh đáy bằng $' +
          a +
          '$, đường cao $SO = ' +
          h +
          '$ ($O$ là tâm của đáy). Chọn hệ trục tọa độ $Oxyz$ sao cho các tia $Ox, Oy, Oz$ lần lượt cùng hướng với các vectơ $\\overrightarrow{OB}, \\overrightarrow{OC}, \\overrightarrow{OS}$. Gọi $M$ là trung điểm của cạnh $SC$ và $\\overrightarrow{AM} = (x;\\, y;\\, z)$. Tính giá trị của $x + y - z$ (làm tròn kết quả đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Hình vuông $ABCD$ cạnh $' + a + '$ có $OA = OC = \\frac{' + a + '\\sqrt{2}}{2} = ' + halfDiag + '$. Vì $C$ thuộc tia $Oy$ và $A$ đối xứng với $C$ qua $O$ nên $C\\left(0;\\, ' + halfDiag + ';\\, 0\\right)$ và $A\\left(0;\\, -' + halfDiag + ';\\, 0\\right)$.',
          'Đỉnh $S(0;\\, 0;\\, ' + h + ')$, suy ra trung điểm $M$ của $SC$ có tọa độ $M\\left(0;\\, ' + quarterStr + ';\\, ' + hHalf.latex + '\\right)$.',
          'Do đó $\\overrightarrow{AM} = \\left(0;\\, ' + yVecStr + ';\\, ' + hHalf.latex + '\\right)$, nên $x + y - z = ' + yVecStr + ' - ' + hHalf.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh a = 0', params: { a: 0, h: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=2, h=6 (đáp số -0,9)', params: { a: 2, h: 6 }, expectedValid: true },
      { label: 'Biến thể dương a=4, h=2', params: { a: 4, h: 2 }, expectedValid: true },
    ],
  },

  // Dạng 20 (Q20)
  t12_b7_d20_rhombus_pyramid_len_sa: {
    id: 't12_b7_d20_rhombus_pyramid_len_sa',
    name: 'Tính độ dài đoạn AM trong hình chóp đáy hình thoi theo phương pháp tọa độ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng hệ trục tọa độ tính độ dài đoạn thẳng',
    description:
      'Cho hình chóp S.ABCD đáy hình thoi cạnh c tâm O, OA = d < c, OS = h, gắn hệ trục Oxyz theo OB, OC, OS. M là trung điểm SC. Tính độ dài AM.',
    conditionSummary: 'd ≥ 2, c > d, h ≥ 1 và tránh điểm ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'c', label: 'Cạnh hình thoi c', min: 4, max: 12 },
      { name: 'd', label: 'Nửa đường chéo OA = d', min: 2, max: 8 },
      { name: 'h', label: 'Chiều cao SO = h', min: 1, max: 10 },
    ],
    validateCode: `
      const { c, d, h } = params;
      if (d < 2 || c <= d || h <= 0) {
        return { valid: false, reason: 'Cần c > d ≥ 2 và h > 0 để hình thoi không suy biến' };
      }
      const len = Math.sqrt(9 * d * d + h * h) / 2;
      const dec10 = len * 10;
      const frac = Math.abs(dec10 - Math.floor(dec10) - 0.5);
      if (frac < 0.05) {
        return { valid: false, reason: 'Độ dài quá gần ranh giới làm tròn .x5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, d, h } = params;
      const mY = u.simplifyFrac(d, 2);
      const mZ = u.simplifyFrac(h, 2);
      const amY = u.simplifyFrac(3 * d, 2);
      const rad = 9 * d * d + h * h;
      const rawLen = Math.sqrt(rad) / 2;
      const rounded = Number(rawLen.toFixed(1));
      const ansStr = u.formatNumberVN(rounded, 1);

      return {
        stem:
          'Cho hình chóp $S.ABCD$ có đáy là hình thoi cạnh $' +
          c +
          '$ tâm $O$, $OA = ' +
          d +
          '$ và $OS = ' +
          h +
          '$. Thiết lập hệ trục tọa độ $Oxyz$ sao cho các tia $Ox, Oy, Oz$ lần lượt cùng hướng với các vectơ $\\overrightarrow{OB}, \\overrightarrow{OC}, \\overrightarrow{OS}$. Gọi $M$ là trung điểm của cạnh $SC$. Tính độ dài đoạn thẳng $AM$ (làm tròn kết quả đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: rounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Vì $O$ là tâm hình thoi và $C$ nằm trên tia $Oy$, $S$ nằm trên tia $Oz$ nên $C(0;\\, ' + d + ';\\, 0)$, $A(0;\\, -' + d + ';\\, 0)$ và $S(0;\\, 0;\\, ' + h + ')$.',
          'Trung điểm $M$ của $SC$ có tọa độ $M\\left(0;\\, ' + mY.latex + ';\\, ' + mZ.latex + '\\right)$.',
          'Suy ra $\\overrightarrow{AM} = \\left(0;\\, ' + amY.latex + ';\\, ' + mZ.latex + '\\right)$, do đó $AM = \\sqrt{\\left(' + amY.latex + '\\right)^2 + \\left(' + mZ.latex + '\\right)^2} = \\frac{\\sqrt{' + rad + '}}{2} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c <= d (hình thoi suy biến)', params: { c: 3, d: 3, h: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc cạnh 7, OA=2, OS=2 (đáp số 3,2)', params: { c: 7, d: 2, h: 2 }, expectedValid: true },
      { label: 'Biến thể Pytago nguyên (d=2, h=8 -> 5)', params: { c: 5, d: 2, h: 8 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21)
  t12_b7_d21_airplane_velocity_sa: {
    id: 't12_b7_d21_airplane_velocity_sa',
    name: 'Xác định vị trí máy bay chuyển động thẳng đều trong không gian Oxyz',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Bài toán chuyển động thẳng đều trong hệ trục Oxyz',
    description:
      'Một máy bay bay thẳng đều với hướng và độ cao không đổi từ A đến B trong 1 giờ, hỏi sau t phút tiếp theo máy bay ở C(x; y; z). Tính tổng x + y + z.',
    conditionSummary: 'Đảm bảo vận tốc khác 0 và tọa độ điểm C nguyên đẹp qua bước chuẩn hóa theo mẫu số thời gian',
    paramSpecs: [
      { name: 'xA', label: 'Hoành độ A', min: 400, max: 700, step: 10 },
      { name: 'yA', label: 'Tung độ A', min: 500, max: 850, step: 10 },
      { name: 'zA', label: 'Cao độ A', min: 6, max: 12 },
      { name: 'vx', label: 'Bước dịch x mỗi đoạn', min: 12, max: 35 },
      { name: 'vy', label: 'Bước dịch y mỗi đoạn', min: 5, max: 25 },
      { name: 'vz', label: 'Bước dịch z mỗi đoạn', min: 1, max: 4 },
      { name: 'tIdx', label: 'Thời gian tiếp theo (0:20p, 1:15p, 2:30p, 3:40p)', min: 0, max: 3 },
    ],
    validateCode: `
      const { vx, vy, vz, tIdx } = params;
      if (vx <= 0 || vy <= 0 || vz < 0) return { valid: false, reason: 'Thành phần dịch chuyển không hợp lệ' };
      if (![0, 1, 2, 3].includes(tIdx)) return { valid: false, reason: 'tIdx thuộc [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, vx, vy, vz, tIdx } = params;
      const configs = [
        { mins: 20, num: 1, den: 3 },
        { mins: 15, num: 1, den: 4 },
        { mins: 30, num: 1, den: 2 },
        { mins: 40, num: 2, den: 3 },
      ];
      const cfg = configs[tIdx];
      // AB = den * v (trong 1 gio); BC = num * v (trong mins phut = num/den gio)
      const dxAB = cfg.den * vx;
      const dyAB = cfg.den * vy;
      const dzAB = cfg.den * vz;
      const xB = xA + dxAB;
      const yB = yA + dyAB;
      const zB = zA + dzAB;
      const xC = xB + cfg.num * vx;
      const yC = yB + cfg.num * vy;
      const zC = zB + cfg.num * vz;
      const total = xC + yC + zC;
      const ratioLatex = '\\frac{' + cfg.num + '}{' + cfg.den + '}';

      return {
        stem:
          'Trong không gian $Oxyz$, một máy bay bay theo đường thẳng với vận tốc và hướng không đổi từ vị trí $A' +
          u.formatCoord3D(xA, yA, zA) +
          '$ đến vị trí $B' +
          u.formatCoord3D(xB, yB, zB) +
          '$ hết $1$ giờ. Nếu tiếp tục giữ nguyên vận tốc và hướng bay đó trong $' +
          cfg.mins +
          '$ phút tiếp theo thì máy bay tới vị trí $C(x;\\, y;\\, z)$. Tính giá trị của $x + y + z$.',
        shortAnswer: '' + total,
        numericValue: total,
        answerSummary: '' + total,
        solutionSteps: [
          'Đổi thời gian bay đoạn $BC$: $' + cfg.mins + '\\text{ phút} = ' + ratioLatex + '\\text{ giờ}$.',
          'Do máy bay chuyển động thẳng đều nên $\\overrightarrow{BC} = ' + ratioLatex + '\\overrightarrow{AB}$. Ta có $\\overrightarrow{AB} = ' + u.formatCoord3D(dxAB, dyAB, dzAB) + '$.',
          'Suy ra $\\overrightarrow{BC} = ' + u.formatCoord3D(cfg.num * vx, cfg.num * vy, cfg.num * vz) + ' \\Rightarrow C' + u.formatCoord3D(xC, yC, zC) + '$.',
          'Vậy $x + y + z = ' + xC + ' + ' + yC + ' + ' + zC + ' = ' + total + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vận tốc âm hoặc bằng 0', params: { xA: 610, yA: 700, zA: 8, vx: 0, vy: 9, vz: 2, tIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc A(610;700;8), B(679;727;14), 20 phút (đáp số 1454)', params: { xA: 610, yA: 700, zA: 8, vx: 23, vy: 9, vz: 2, tIdx: 0 }, expectedValid: true },
      { label: 'Biến thể 40 phút', params: { xA: 500, yA: 600, zA: 10, vx: 15, vy: 12, vz: 1, tIdx: 3 }, expectedValid: true },
    ],
  },
};

export const G12_B7_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B7_TEMPLATES).filter(
  (t) => t.category === 'MC'
);
export const G12_B7_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B7_TEMPLATES).filter(
  (t) => t.category === 'TF'
);
export const G12_B7_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B7_TEMPLATES).filter(
  (t) => t.category === 'SA'
);
