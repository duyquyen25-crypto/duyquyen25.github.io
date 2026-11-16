import { MathTemplate } from '../types/math';

export const G12_B8_PART1_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (DẠNG 1 -> DẠNG 29)
  // =====================================================================

  // Dạng 1 (Q1): Tìm tọa độ vectơ từ hai điểm
  t12_b8_d01_vec_two_points_mc: {
    id: 't12_b8_d01_vec_two_points_mc',
    name: 'Tìm tọa độ vectơ NA từ tọa độ hai điểm N, A',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tọa độ vectơ từ hai điểm',
    description: 'Cho hai điểm N(xN; yN; zN) và A(xA; yA; zA). Tính tọa độ vectơ NA = (xA - xN; yA - yN; zA - zN).',
    conditionSummary: 'Các thành phần hiệu khác 0 để tránh phương án nhiễu trùng lặp',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -9, max: 9 },
      { name: 'yN', label: 'y_N', min: -9, max: 9 },
      { name: 'zN', label: 'z_N', min: -9, max: 9 },
      { name: 'xA', label: 'x_A', min: -9, max: 9 },
      { name: 'yA', label: 'y_A', min: -9, max: 9 },
      { name: 'zA', label: 'z_A', min: -9, max: 9 },
    ],
    validateCode: `
      const { xN, yN, zN, xA, yA, zA } = params;
      if (xA === xN || yA === yN || zA === zN) {
        return { valid: false, reason: 'Cần hoành độ, tung độ, cao độ của hai điểm đôi một khác nhau' };
      }
      if (xA + xN === xA - xN || yA + yN === yA - yN || zA + zN === zA - zN) {
        return { valid: false, reason: 'Tránh trùng giữa tổng và hiệu tọa độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN, xA, yA, zA } = params;
      const dx = xA - xN;
      const dy = yA - yN;
      const dz = zA - zN;
      const subFmt = (a, b) => (b < 0 ? a + ' + ' + Math.abs(b) : a + ' - ' + b);
      const correct = '$' + u.formatCoord3D(dx, dy, dz) + '$';
      const distractors = [
        '$' + u.formatCoord3D(-dx, -dy, -dz) + '$',
        '$' + u.formatCoord3D(dx, dy + 2, dz) + '$',
        '$' + u.formatCoord3D(dx + 2, dy, dz) + '$',
        '$' + u.formatCoord3D(xA + xN, yA + yN, zA + zN) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(dx, dy, dz + k) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai điểm $N' +
          u.formatCoord3D(xN, yN, zN) +
          '$ và $A' +
          u.formatCoord3D(xA, yA, zA) +
          '$. Tọa độ vectơ $\\overrightarrow{NA}$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $\\overrightarrow{NA} = (x_A - x_N;\\, y_A - y_N;\\, z_A - z_N)$.',
          'Ta có $\\overrightarrow{NA} = (' + subFmt(xA, xN) + ';\\, ' + subFmt(yA, yN) + ';\\, ' + subFmt(zA, zN) + ') = ' + u.formatCoord3D(dx, dy, dz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên trùng hoành độ xA = xN', params: { xN: 2, yN: 3, zN: 1, xA: 2, yA: -1, zA: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 N(-1;6;1), A(5;-5;-1)', params: { xN: -1, yN: 6, zN: 1, xA: 5, yA: -5, zA: -1 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2): Tổng hai vectơ
  t12_b8_d02_vec_sum_mc: {
    id: 't12_b8_d02_vec_sum_mc',
    name: 'Tính tọa độ tổng hai vectơ a + v',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Các phép toán vectơ theo tọa độ',
    description: 'Cho hai vectơ a(x1; y1; z1) và v(x2; y2; z2). Tìm tọa độ vectơ a + v.',
    conditionSummary: 'Các tổng khác 0 và khác hiệu để các phương án nhiễu phân biệt',
    paramSpecs: [
      { name: 'x1', label: 'a_x', min: -12, max: 12, allowZero: false },
      { name: 'y1', label: 'a_y', min: -12, max: 12, allowZero: false },
      { name: 'z1', label: 'a_z', min: -12, max: 12, allowZero: false },
      { name: 'x2', label: 'v_x', min: -12, max: 12, allowZero: false },
      { name: 'y2', label: 'v_y', min: -12, max: 12, allowZero: false },
      { name: 'z2', label: 'v_z', min: -12, max: 12, allowZero: false },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2 } = params;
      if (x1 === 0 || y1 === 0 || z1 === 0 || x2 === 0 || y2 === 0 || z2 === 0) {
        return { valid: false, reason: 'Các thành phần khác 0' };
      }
      if (x1 + x2 === 0 && y1 + y2 === 0 && z1 + z2 === 0) {
        return { valid: false, reason: 'Tổng không được là vectơ-không' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2 } = params;
      const sx = x1 + x2;
      const sy = y1 + y2;
      const sz = z1 + z2;
      const addFmt = (a, b) => (b < 0 ? a + ' - ' + Math.abs(b) : a + ' + ' + b);
      const correct = '$' + u.formatCoord3D(sx, sy, sz) + '$';
      const distractors = [
        '$' + u.formatCoord3D(x1 - x2, y1 - y2, z1 - z2) + '$',
        '$' + u.formatCoord3D(x1 * x2, y1 * y2, z1 * z2) + '$',
        '$' + u.formatCoord3D(-sx, -sy, -sz) + '$',
        '$' + u.formatCoord3D(x2 - x1, y2 - y1, z2 - z1) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(sx + k, sy, sz) + '$'
      );
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{a}' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $\\overrightarrow{v}' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tìm tọa độ vectơ $\\overrightarrow{a} + \\overrightarrow{v}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\overrightarrow{a} + \\overrightarrow{v} = (' + addFmt(x1, x2) + ';\\, ' + addFmt(y1, y2) + ';\\, ' + addFmt(z1, z2) + ') = ' + u.formatCoord3D(sx, sy, sz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai vectơ đối nhau', params: { x1: 3, y1: -4, z1: 5, x2: -3, y2: 4, z2: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 a(10;-7;-1), v(-11;-14;2)', params: { x1: 10, y1: -7, z1: -1, x2: -11, y2: -14, z2: 2 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3): Hiệu hai vectơ
  t12_b8_d03_vec_diff_mc: {
    id: 't12_b8_d03_vec_diff_mc',
    name: 'Tính tọa độ hiệu hai vectơ a - b',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Các phép toán vectơ theo tọa độ',
    description: 'Cho hai vectơ a(x1; y1; z1) và b(x2; y2; z2). Tính tọa độ vectơ a - b.',
    conditionSummary: 'Hai vectơ khác nhau và có các thành phần khác 0',
    paramSpecs: [
      { name: 'x1', label: 'a_x', min: -12, max: 12, allowZero: false },
      { name: 'y1', label: 'a_y', min: -12, max: 12, allowZero: false },
      { name: 'z1', label: 'a_z', min: -12, max: 12, allowZero: false },
      { name: 'x2', label: 'b_x', min: -12, max: 12, allowZero: false },
      { name: 'y2', label: 'b_y', min: -12, max: 12, allowZero: false },
      { name: 'z2', label: 'b_z', min: -12, max: 12, allowZero: false },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2 } = params;
      if (x1 === 0 || y1 === 0 || z1 === 0 || x2 === 0 || y2 === 0 || z2 === 0) {
        return { valid: false, reason: 'Các thành phần phải khác 0' };
      }
      if (x1 === x2 && y1 === y2 && z1 === z2) {
        return { valid: false, reason: 'Hiệu không được bằng vectơ-không' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2 } = params;
      const dx = x1 - x2;
      const dy = y1 - y2;
      const dz = z1 - z2;
      const subFmt = (a, b) => (b < 0 ? a + ' + ' + Math.abs(b) : a + ' - ' + b);
      const correct = '$' + u.formatCoord3D(dx, dy, dz) + '$';
      const distractors = [
        '$' + u.formatCoord3D(x1 + x2, y1 + y2, z1 + z2) + '$',
        '$' + u.formatCoord3D(-dx, -dy, -dz) + '$',
        '$' + u.formatCoord3D(x1 * x2, y1 * y2, z1 * z2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(dx, dy + k, dz) + '$'
      );
      return {
        stem:
          'Trong không gian với hệ tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{a}' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $\\overrightarrow{b}' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tính $\\overrightarrow{a} - \\overrightarrow{b}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\overrightarrow{a} - \\overrightarrow{b} = (' + subFmt(x1, x2) + ';\\, ' + subFmt(y1, y2) + ';\\, ' + subFmt(z1, z2) + ') = ' + u.formatCoord3D(dx, dy, dz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai vectơ bằng nhau', params: { x1: 2, y1: -3, z1: 4, x2: 2, y2: -3, z2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 a(-3;7;9), b(-6;4;-7)', params: { x1: -3, y1: 7, z1: 9, x2: -6, y2: 4, z2: -7 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4): Tổ hợp tuyến tính k1*m - k2*c
  t12_b8_d04_linear_comb_mc: {
    id: 't12_b8_d04_linear_comb_mc',
    name: 'Tìm tọa độ tổ hợp tuyến tính k₁m - k₂c',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Các phép toán vectơ theo tọa độ',
    description: 'Cho hai vectơ m, c và hệ số k1, k2. Tính tọa độ vectơ k1*m - k2*c.',
    conditionSummary: 'k1, k2 ∈ [2; 7]; m không cùng phương với k2/k1 * c để tránh vectơ không',
    paramSpecs: [
      { name: 'k1', label: 'Hệ số k₁', min: 2, max: 7 },
      { name: 'k2', label: 'Hệ số k₂', min: 2, max: 7 },
      { name: 'x1', label: 'm_x', min: -6, max: 6, allowZero: false },
      { name: 'y1', label: 'm_y', min: -6, max: 6, allowZero: false },
      { name: 'z1', label: 'm_z', min: -6, max: 6, allowZero: false },
      { name: 'x2', label: 'c_x', min: -6, max: 6, allowZero: false },
      { name: 'y2', label: 'c_y', min: -6, max: 6, allowZero: false },
      { name: 'z2', label: 'c_z', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { k1, k2, x1, y1, z1, x2, y2, z2 } = params;
      if (k1 <= 1 || k2 <= 1) return { valid: false, reason: 'Cần hệ số k₁, k₂ >= 2' };
      const rx = k1 * x1 - k2 * x2;
      const ry = k1 * y1 - k2 * y2;
      const rz = k1 * z1 - k2 * z2;
      if (rx === 0 && ry === 0 && rz === 0) return { valid: false, reason: 'Kết quả khác vectơ-không' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k1, k2, x1, y1, z1, x2, y2, z2 } = params;
      const rx = k1 * x1 - k2 * x2;
      const ry = k1 * y1 - k2 * y2;
      const rz = k1 * z1 - k2 * z2;
      const correct = '$' + u.formatCoord3D(rx, ry, rz) + '$';
      const distractors = [
        '$' + u.formatCoord3D(x1 + x2, y1 + y2, z1 + z2) + '$',
        '$' + u.formatCoord3D(k1 * x1 + k2 * x2, k1 * y1 + k2 * y2, k1 * z1 + k2 * z2) + '$',
        '$' + u.formatCoord3D(-rx, -ry, -rz) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(rx + k, ry, rz) + '$'
      );
      const expr = k1 + '\\overrightarrow{m} - ' + k2 + '\\overrightarrow{c}';
      return {
        stem:
          'Trong hệ trục tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{m}' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $\\overrightarrow{c}' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tọa độ vectơ $' +
          expr +
          '$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + k1 + '\\overrightarrow{m} = ' + u.formatCoord3D(k1 * x1, k1 * y1, k1 * z1) + '$ và $' + k2 + '\\overrightarrow{c} = ' + u.formatCoord3D(k2 * x2, k2 * y2, k2 * z2) + '$.',
          'Suy ra $' + expr + ' = ' + u.formatCoord3D(rx, ry, rz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số nhỏ hơn 2', params: { k1: 1, k2: 2, x1: 1, y1: 2, z1: 3, x2: 2, y2: 1, z2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 6m - 6c = (12; 36; 12)', params: { k1: 6, k2: 6, x1: -3, y1: 3, z1: -3, x2: -5, y2: -3, z2: -5 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5): Độ dài vectơ
  t12_b8_d05_vec_length_mc: {
    id: 't12_b8_d05_vec_length_mc',
    name: 'Tính độ dài của vectơ cho trước',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Độ dài vectơ trong không gian',
    description: 'Cho vectơ n = (x; y; z). Tính |n| = sqrt(x² + y² + z²).',
    conditionSummary: '(x; y; z) ≠ (0; 0; 0) và có ít nhất 2 thành phần khác 0',
    paramSpecs: [
      { name: 'x', label: 'x', min: -9, max: 9 },
      { name: 'y', label: 'y', min: -9, max: 9 },
      { name: 'z', label: 'z', min: -9, max: 9 },
    ],
    validateCode: `
      const { x, y, z } = params;
      const nz = (x !== 0 ? 1 : 0) + (y !== 0 ? 1 : 0) + (z !== 0 ? 1 : 0);
      if (nz < 2) return { valid: false, reason: 'Cần ít nhất 2 tọa độ khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z } = params;
      const sumSq = x * x + y * y + z * z;
      const sqrtSimp = (n) => {
        let k = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) {
            k = i;
            r = n / (i * i);
            break;
          }
        }
        if (r === 1) return '' + k;
        return (k === 1 ? '' : k) + '\\sqrt{' + r + '}';
      };
      const ansTex = sqrtSimp(sumSq);
      const correct = '$' + ansTex + '$';
      const absSum = Math.abs(x) + Math.abs(y) + Math.abs(z);
      const distractors = [
        '$' + sumSq + '$',
        '$' + absSum + '$',
        '$\\sqrt{' + (sumSq + 2) + '}$',
        '$' + (Math.round(Math.sqrt(sumSq)) + 2) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$\\sqrt{' + (sumSq + k + 5) + '}$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho vectơ $\\overrightarrow{n} = ' + u.formatCoord3D(x, y, z) + '$. Độ dài vectơ $\\overrightarrow{n}$ bằng',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Độ dài vectơ $\\overrightarrow{n}$ là $|\\overrightarrow{n}| = \\sqrt{(' + x + ')^2 + (' + y + ')^2 + (' + z + ')^2} = \\sqrt{' + (x * x) + ' + ' + (y * y) + ' + ' + (z * z) + '} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vectơ chỉ có 1 tọa độ khác 0', params: { x: 0, y: 0, z: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 n=(7;6;-3)', params: { x: 7, y: 6, z: -3 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6): Độ dài đoạn thẳng từ hai điểm
  t12_b8_d06_segment_length_mc: {
    id: 't12_b8_d06_segment_length_mc',
    name: 'Tính độ dài đoạn thẳng PN khi biết tọa độ P, N',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Độ dài đoạn thẳng trong không gian',
    description: 'Cho hai điểm P, N. Tính độ dài đoạn thẳng PN = |PN|.',
    conditionSummary: 'P ≠ N và vectơ PN có ít nhất 2 thành phần khác 0',
    paramSpecs: [
      { name: 'xP', label: 'x_P', min: -8, max: 8 },
      { name: 'yP', label: 'y_P', min: -8, max: 8 },
      { name: 'zP', label: 'z_P', min: -8, max: 8 },
      { name: 'xN', label: 'x_N', min: -8, max: 8 },
      { name: 'yN', label: 'y_N', min: -8, max: 8 },
      { name: 'zN', label: 'z_N', min: -8, max: 8 },
    ],
    validateCode: `
      const { xP, yP, zP, xN, yN, zN } = params;
      const dx = xN - xP, dy = yN - yP, dz = zN - zP;
      const nz = (dx !== 0 ? 1 : 0) + (dy !== 0 ? 1 : 0) + (dz !== 0 ? 1 : 0);
      if (nz < 2) return { valid: false, reason: 'Cần P ≠ N và có ít nhất 2 thành phần hiệu khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xP, yP, zP, xN, yN, zN } = params;
      const dx = xN - xP, dy = yN - yP, dz = zN - zP;
      const sumSq = dx * dx + dy * dy + dz * dz;
      const sqrtSimp = (n) => {
        let k = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) {
            k = i;
            r = n / (i * i);
            break;
          }
        }
        if (r === 1) return '' + k;
        return (k === 1 ? '' : k) + '\\sqrt{' + r + '}';
      };
      const ansTex = sqrtSimp(sumSq);
      const correct = '$' + ansTex + '$';
      const wrongSum = (xN + xP) * (xN + xP) + (yN + yP) * (yN + yP) + (zN + zP) * (zN + zP);
      const distractors = [
        '$' + sqrtSimp(wrongSum > 0 ? wrongSum : sumSq + 3) + '$',
        '$\\sqrt{' + (sumSq + 1) + '}$',
        '$' + (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) + '$',
        '$' + sumSq + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$\\sqrt{' + (sumSq + k + 4) + '}$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai điểm $P' +
          u.formatCoord3D(xP, yP, zP) +
          '$ và $N' +
          u.formatCoord3D(xN, yN, zN) +
          '$. Độ dài đoạn thẳng $PN$ bằng',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\overrightarrow{PN} = ' + u.formatCoord3D(dx, dy, dz) + '$.',
          'Suy ra $PN = \\sqrt{(' + dx + ')^2 + (' + dy + ')^2 + (' + dz + ')^2} = \\sqrt{' + (dx * dx) + ' + ' + (dy * dy) + ' + ' + (dz * dz) + '} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai điểm trùng nhau', params: { xP: 1, yP: 2, zP: 3, xN: 1, yN: 2, zN: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 P(-6;7;0), N(-4;2;-7)', params: { xP: -6, yP: 7, zP: 0, xN: -4, yN: 2, zN: -7 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7): Tích vô hướng hai vectơ
  t12_b8_d07_dot_product_mc: {
    id: 't12_b8_d07_dot_product_mc',
    name: 'Tính tích vô hướng của hai vectơ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tích vô hướng hai vectơ',
    description: 'Cho hai vectơ d(x1; y1; z1) và w(x2; y2; z2). Tính tích vô hướng d.w = x1x2 + y1y2 + z1z2.',
    conditionSummary: 'Các tọa độ khác 0 và tránh các phương án nhiễu trùng nhau',
    paramSpecs: [
      { name: 'x1', label: 'd_x', min: -9, max: 9, allowZero: false },
      { name: 'y1', label: 'd_y', min: -9, max: 9, allowZero: false },
      { name: 'z1', label: 'd_z', min: -9, max: 9, allowZero: false },
      { name: 'x2', label: 'w_x', min: -9, max: 9, allowZero: false },
      { name: 'y2', label: 'w_y', min: -9, max: 9, allowZero: false },
      { name: 'z2', label: 'w_z', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2 } = params;
      if (x1 === 0 || y1 === 0 || z1 === 0 || x2 === 0 || y2 === 0 || z2 === 0) {
        return { valid: false, reason: 'Các thành phần tọa độ cần khác 0' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2 } = params;
      const dot = x1 * x2 + y1 * y2 + z1 * z2;
      const wNum = (n) => (n < 0 ? '(' + n + ')' : '' + n);
      const correct = '$\\overrightarrow{d}\\cdot\\overrightarrow{w} = ' + dot + '$';
      const distractors = [
        '$\\overrightarrow{d}\\cdot\\overrightarrow{w} = ' + (x1 * x2 - y1 * y2 + z1 * z2) + '$',
        '$\\overrightarrow{d}\\cdot\\overrightarrow{w} = ' + (x1 * x2 + y1 * y2 - z1 * z2) + '$',
        '$\\overrightarrow{d}\\cdot\\overrightarrow{w} = ' + (dot + 12) + '$',
        '$\\overrightarrow{d}\\cdot\\overrightarrow{w} = ' + (-dot) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$\\overrightarrow{d}\\cdot\\overrightarrow{w} = ' + (dot + k * 3) + '$'
      );
      return {
        stem:
          'Trong hệ trục tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{d}' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $\\overrightarrow{w}' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tích vô hướng $\\overrightarrow{d}\\cdot\\overrightarrow{w}$ bằng',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức tích vô hướng: $\\overrightarrow{d}\\cdot\\overrightarrow{w} = ' +
            wNum(x1) +
            '\\cdot ' +
            wNum(x2) +
            ' + ' +
            wNum(y1) +
            '\\cdot ' +
            wNum(y2) +
            ' + ' +
            wNum(z1) +
            '\\cdot ' +
            wNum(z2) +
            ' = ' +
            dot +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tọa độ bằng 0', params: { x1: 0, y1: 2, z1: 3, x2: 1, y2: 2, z2: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 d(1;3;-9), w(9;-2;-3)', params: { x1: 1, y1: 3, z1: -9, x2: 9, y2: -2, z2: -3 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8): Tích có hướng hai vectơ
  t12_b8_d08_cross_product_mc: {
    id: 't12_b8_d08_cross_product_mc',
    name: 'Tìm tọa độ tích có hướng của hai vectơ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Tích có hướng hai vectơ',
    description: 'Cho hai vectơ m(x1; y1; z1) và v(x2; y2; z2). Tìm tọa độ tích có hướng [m, v].',
    conditionSummary: 'Hai vectơ không cùng phương ([m, v] ≠ 0)',
    paramSpecs: [
      { name: 'x1', label: 'm_x', min: -9, max: 9, allowZero: false },
      { name: 'y1', label: 'm_y', min: -9, max: 9, allowZero: false },
      { name: 'z1', label: 'm_z', min: -9, max: 9, allowZero: false },
      { name: 'x2', label: 'v_x', min: -9, max: 9, allowZero: false },
      { name: 'y2', label: 'v_y', min: -9, max: 9, allowZero: false },
      { name: 'z2', label: 'v_z', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2 } = params;
      const cx = y1 * z2 - z1 * y2;
      const cy = z1 * x2 - x1 * z2;
      const cz = x1 * y2 - y1 * x2;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'Hai vectơ cùng phương nên tích có hướng bằng vectơ-không' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2 } = params;
      const cx = y1 * z2 - z1 * y2;
      const cy = z1 * x2 - x1 * z2;
      const cz = x1 * y2 - y1 * x2;
      const wNum = (n) => (n < 0 ? '(' + n + ')' : '' + n);
      const correct = '$\\left[\\overrightarrow{m},\\overrightarrow{v}\\right] = ' + u.formatCoord3D(cx, cy, cz) + '$';
      const distractors = [
        '$\\left[\\overrightarrow{m},\\overrightarrow{v}\\right] = ' + u.formatCoord3D(-cx, -cy, -cz) + '$',
        '$\\left[\\overrightarrow{m},\\overrightarrow{v}\\right] = ' + u.formatCoord3D(cx, cy + 3, cz - 2) + '$',
        '$\\left[\\overrightarrow{m},\\overrightarrow{v}\\right] = ' + u.formatCoord3D(cx + 1, cy - 2, cz + 4) + '$',
        '$\\left[\\overrightarrow{m},\\overrightarrow{v}\\right] = ' + u.formatCoord3D(cx, -cy, cz) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$\\left[\\overrightarrow{m},\\overrightarrow{v}\\right] = ' + u.formatCoord3D(cx + k, cy, cz) + '$'
      );
      return {
        stem:
          'Trong hệ trục tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{m}' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $\\overrightarrow{v}' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tọa độ tích có hướng $\\left[\\overrightarrow{m},\\overrightarrow{v}\\right]$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức tích có hướng: $\\left[\\overrightarrow{m},\\overrightarrow{v}\\right] = \\left(y_1 z_2 - z_1 y_2;\\; z_1 x_2 - x_1 z_2;\\; x_1 y_2 - y_1 x_2\\right)$.',
          'Thay số: $(' + wNum(y1) + '\\cdot ' + wNum(z2) + ' - ' + wNum(z1) + '\\cdot ' + wNum(y2) + ';\\; ' + wNum(z1) + '\\cdot ' + wNum(x2) + ' - ' + wNum(x1) + '\\cdot ' + wNum(z2) + ';\\; ' + wNum(x1) + '\\cdot ' + wNum(y2) + ' - ' + wNum(y1) + '\\cdot ' + wNum(x2) + ') = ' + u.formatCoord3D(cx, cy, cz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai vectơ cùng phương', params: { x1: 1, y1: 2, z1: -3, x2: -2, y2: -4, z2: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 m(-5;-9;-3), v(-7;2;7)', params: { x1: -5, y1: -9, z1: -3, x2: -7, y2: 2, z2: 7 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9): Cosin góc giữa hai vectơ (rút gọn căn chính xác)
  t12_b8_d09_cos_two_vectors_mc: {
    id: 't12_b8_d09_cos_two_vectors_mc',
    name: 'Tính cosin của góc giữa hai vectơ trong Oxyz',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai vectơ',
    description: 'Cho hai vectơ m, b khác vectơ-không. Tính cos(m, b) dưới dạng phân thức rút gọn chính xác.',
    conditionSummary: 'Hai vectơ khác vectơ-không và tích vô hướng khác 0',
    paramSpecs: [
      { name: 'x1', label: 'm_x', min: -5, max: 5 },
      { name: 'y1', label: 'm_y', min: -5, max: 5 },
      { name: 'z1', label: 'm_z', min: -5, max: 5 },
      { name: 'x2', label: 'b_x', min: -4, max: 4 },
      { name: 'y2', label: 'b_y', min: -4, max: 4 },
      { name: 'z2', label: 'b_z', min: -4, max: 4 },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2 } = params;
      const s1 = x1 * x1 + y1 * y1 + z1 * z1;
      const s2 = x2 * x2 + y2 * y2 + z2 * z2;
      const dot = x1 * x2 + y1 * y2 + z1 * z2;
      if (s1 === 0 || s2 === 0) return { valid: false, reason: 'Vectơ không được là vectơ-không' };
      if (dot === 0) return { valid: false, reason: 'Tích vô hướng bằng 0 làm cos = 0 quá đơn giản' };
      if (dot * dot === s1 * s2) return { valid: false, reason: 'Hai vectơ cùng phương làm cos = ±1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2 } = params;
      const s1 = x1 * x1 + y1 * y1 + z1 * z1;
      const s2 = x2 * x2 + y2 * y2 + z2 * z2;
      const dot = x1 * x2 + y1 * y2 + z1 * z2;
      const factorSq = (n) => {
        let k = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { k = i; r = n / (i * i); break; }
        }
        return { k, r, tex: r === 1 ? '' + k : (k === 1 ? '' : k) + '\\sqrt{' + r + '}' };
      };
      const cosLatex = (d, a, b) => {
        const { k, r } = factorSq(a * b);
        if (r === 1) return u.simplifyFrac(d, k).latex;
        const fr = u.simplifyFrac(d, k * r);
        const absN = Math.abs(fr.num);
        const top = (absN === 1 ? '' : absN) + '\\sqrt{' + r + '}';
        const sign = fr.num < 0 ? '-' : '';
        return fr.den === 1 ? sign + top : sign + '\\frac{' + top + '}{' + fr.den + '}';
      };
      const ansTex = cosLatex(dot, s1, s2);
      const correct = '$' + ansTex + '$';
      const f1 = factorSq(s1);
      const f2 = factorSq(s2);
      const pSq = factorSq(s1 * s2);
      const wrongR = pSq.r === 1 ? 2 : pSq.r;
      const distractors = [
        '$' + cosLatex(-dot, s1, s2) + '$',
        '$\\frac{' + Math.abs(dot) + '}{' + f1.tex + ' + ' + f2.tex + '}$',
        '$' + u.simplifyFrac(dot, s1 + s2).latex + '$',
        '$\\frac{\\sqrt{' + wrongR + '}}{' + (Math.max(2, pSq.k) + 3) + '}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$\\frac{' + (k + 1) + '\\sqrt{' + wrongR + '}}{' + (s1 + s2 + k) + '}$'
      );
      return {
        stem:
          'Trong hệ trục tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{m} = ' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $\\overrightarrow{b} = ' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tính cosin của góc giữa hai vectơ $\\overrightarrow{m}$ và $\\overrightarrow{b}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\overrightarrow{m}\\cdot\\overrightarrow{b} = ' + dot + '$, $|\\overrightarrow{m}| = ' + f1.tex + '$, $|\\overrightarrow{b}| = ' + f2.tex + '$.',
          'Suy ra $\\cos(\\overrightarrow{m},\\overrightarrow{b}) = \\dfrac{\\overrightarrow{m}\\cdot\\overrightarrow{b}}{|\\overrightarrow{m}|\\cdot|\\overrightarrow{b}|} = \\dfrac{' + dot + '}{' + f1.tex + '\\cdot ' + f2.tex + '} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai vectơ vuông góc', params: { x1: 1, y1: 1, z1: 0, x2: 1, y2: -1, z2: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 m(-4;1;-4), b(-2;2;-2)', params: { x1: -4, y1: 1, z1: -4, x2: -2, y2: 2, z2: -2 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10): Góc giữa hai vectơ (độ, làm tròn hàng phần mười)
  t12_b8_d10_angle_two_vectors_mc: {
    id: 't12_b8_d10_angle_two_vectors_mc',
    name: 'Tính góc giữa hai vectơ (đơn vị độ, làm tròn hàng phần mười)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Góc giữa hai vectơ',
    description: 'Cho hai vectơ w, b. Tính góc giữa hai vectơ (w, b) theo độ, làm tròn đến hàng phần mười.',
    conditionSummary: 'Hai vectơ khác vectơ-không, không cùng phương, góc không gần biên .05 làm tròn hàng phần mười',
    paramSpecs: [
      { name: 'x1', label: 'w_x', min: -6, max: 6 },
      { name: 'y1', label: 'w_y', min: -6, max: 6 },
      { name: 'z1', label: 'w_z', min: -6, max: 6 },
      { name: 'x2', label: 'b_x', min: -4, max: 4 },
      { name: 'y2', label: 'b_y', min: -4, max: 4 },
      { name: 'z2', label: 'b_z', min: -4, max: 4 },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2 } = params;
      const s1 = x1 * x1 + y1 * y1 + z1 * z1;
      const s2 = x2 * x2 + y2 * y2 + z2 * z2;
      if (s1 === 0 || s2 === 0) return { valid: false, reason: 'Vectơ không được bằng 0' };
      const dot = x1 * x2 + y1 * y2 + z1 * z2;
      if (dot * dot >= s1 * s2) return { valid: false, reason: 'Hai vectơ cùng phương' };
      const deg = (Math.acos(dot / Math.sqrt(s1 * s2)) * 180) / Math.PI;
      if (Math.abs(deg * 10 - Math.floor(deg * 10) - 0.5) < 0.03) {
        return { valid: false, reason: 'Góc gần ranh giới làm tròn hàng phần mười' };
      }
      if (deg < 5 || deg > 175) return { valid: false, reason: 'Góc quá sát 0° hoặc 180°' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2 } = params;
      const s1 = x1 * x1 + y1 * y1 + z1 * z1;
      const s2 = x2 * x2 + y2 * y2 + z2 * z2;
      const dot = x1 * x2 + y1 * y2 + z1 * z2;
      const deg = (Math.acos(dot / Math.sqrt(s1 * s2)) * 180) / Math.PI;
      const rounded = Number(deg.toFixed(1));
      const supp = Number((180 - deg).toFixed(1));
      const fmtDeg = (v) => v.toFixed(1).replace('.', ',') + '^\\circ';
      const correct = '$' + fmtDeg(rounded) + '$';
      const distractors = [
        '$' + fmtDeg(supp !== rounded ? supp : Number((rounded + 15).toFixed(1))) + '$',
        '$' + fmtDeg(Number((Math.max(5, rounded - 22.4)).toFixed(1))) + '$',
        '$' + fmtDeg(Number((Math.min(175, rounded + 31.6)).toFixed(1))) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + fmtDeg(Number(((rounded + k * 7.3) % 170 + 5).toFixed(1))) + '$'
      );
      return {
        stem:
          'Trong hệ trục tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{w} = ' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $\\overrightarrow{b} = ' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tính góc giữa hai vectơ $\\overrightarrow{w}$ và $\\overrightarrow{b}$ (kết quả làm tròn đến hàng phần mười).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\cos(\\overrightarrow{w},\\overrightarrow{b}) = \\dfrac{\\overrightarrow{w}\\cdot\\overrightarrow{b}}{|\\overrightarrow{w}|\\cdot|\\overrightarrow{b}|} = \\dfrac{' + dot + '}{\\sqrt{' + s1 + '}\\cdot\\sqrt{' + s2 + '}}$.',
          'Suy ra $(\\overrightarrow{w},\\overrightarrow{b}) \\approx ' + fmtDeg(rounded) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai vectơ cùng hướng', params: { x1: 2, y1: 2, z1: 0, x2: 1, y2: 1, z2: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 w(3;-5;-1), b(1;1;0)', params: { x1: 3, y1: -5, z1: -1, x2: 1, y2: 1, z2: 0 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11): Tìm tham số m để hai vectơ vuông góc
  t12_b8_d11_perp_param_mc: {
    id: 't12_b8_d11_perp_param_mc',
    name: 'Tìm tham số m để hai vectơ chứa m vuông góc với nhau',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Điều kiện vuông góc của hai vectơ',
    description: 'Cho d = (m + a; y1; z1) và v = (x2; b - c*m; z2). Tìm m để d ⊥ v.',
    conditionSummary: 'x2 - c*y1 ≠ 0 để phương trình bậc nhất có nghiệm duy nhất',
    paramSpecs: [
      { name: 'a', label: 'a', min: -7, max: 7 },
      { name: 'y1', label: 'y₁', min: -6, max: 6, allowZero: false },
      { name: 'z1', label: 'z₁', min: -8, max: 8, allowZero: false },
      { name: 'x2', label: 'x₂', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'b', min: -6, max: 6 },
      { name: 'c', label: 'c', min: 2, max: 9 },
      { name: 'z2', label: 'z₂', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { y1, z1, x2, c, z2 } = params;
      if (y1 === 0 || z1 === 0 || x2 === 0 || z2 === 0) return { valid: false, reason: 'Các hệ số hằng phải khác 0' };
      const coeff = x2 - y1 * c;
      if (coeff === 0) return { valid: false, reason: 'Hệ số của m bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, y1, z1, x2, b, c, z2 } = params;
      const coeff = x2 - y1 * c;
      const constTerm = a * x2 + b * y1 + z1 * z2;
      const mFrac = u.simplifyFrac(-constTerm, coeff);
      const correct = '$m = ' + mFrac.latex + '$';
      const wNum = (n) => (n < 0 ? '(' + n + ')' : '' + n);
      const comp1 = u.formatShift('m', a);
      const comp2 = b === 0 ? '-' + c + 'm' : b + ' - ' + c + 'm';
      const distractors = [
        '$m = ' + u.simplifyFrac(constTerm, coeff).latex + '$',
        '$m = ' + u.simplifyFrac(-constTerm + 12, coeff).latex + '$',
        '$m = ' + u.simplifyFrac(-(a * x2 - b * y1 + z1 * z2), coeff).latex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$m = ' + u.simplifyFrac(mFrac.num + k, mFrac.den).latex + '$'
      );
      return {
        stem:
          'Trong hệ trục tọa độ $Oxyz$, cho hai vectơ $\\overrightarrow{d} = (' +
          comp1 +
          ';\\, ' +
          y1 +
          ';\\, ' +
          z1 +
          ')$ và $\\overrightarrow{v} = (' +
          x2 +
          ';\\, ' +
          comp2 +
          ';\\, ' +
          z2 +
          ')$. Tìm giá trị của $m$ để $\\overrightarrow{d}$ và $\\overrightarrow{v}$ vuông góc.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\overrightarrow{d} \\perp \\overrightarrow{v} \\Leftrightarrow \\overrightarrow{d}\\cdot\\overrightarrow{v} = 0$.',
          'Khi đó $(' + comp1 + ')\\cdot ' + wNum(x2) + ' + ' + wNum(y1) + '(' + comp2 + ') + ' + wNum(z1) + '\\cdot ' + wNum(z2) + ' = 0 \\Leftrightarrow m = ' + mFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số m bị triệt tiêu (x2 = c*y1)', params: { a: 1, y1: 2, z1: 3, x2: 6, b: 1, c: 3, z2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 m = 55/18', params: { a: 6, y1: -3, z1: -7, x2: -6, b: 4, c: 8, z2: 1 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12): Tìm ẩn để hai vectơ cùng phương
  t12_b8_d12_collinear_vectors_mc: {
    id: 't12_b8_d12_collinear_vectors_mc',
    name: 'Tìm tổng x + y để hai vectơ cùng phương',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Điều kiện cùng phương của hai vectơ',
    description: 'Cho d = (d1; d2; d3) và a = (a1; x - p; y - q) cùng phương. Tính x + y.',
    conditionSummary: 'd1, d2, d3, a1 ≠ 0 để tỷ lệ xác định',
    paramSpecs: [
      { name: 'd1', label: 'd₁', min: -6, max: 6, allowZero: false },
      { name: 'd2', label: 'd₂', min: -6, max: 6, allowZero: false },
      { name: 'd3', label: 'd₃', min: -6, max: 6, allowZero: false },
      { name: 'a1', label: 'a₁', min: -5, max: 5, allowZero: false },
      { name: 'p', label: 'Dịch p', min: -5, max: 5 },
      { name: 'q', label: 'Dịch q', min: -5, max: 5 },
    ],
    validateCode: `
      const { d1, d2, d3, a1 } = params;
      if (d1 === 0 || d2 === 0 || d3 === 0 || a1 === 0) return { valid: false, reason: 'Các thành phần tỷ lệ phải khác 0' };
      if (d1 === a1) return { valid: false, reason: 'Tránh hệ số tỷ lệ tầm thường k = 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d1, d2, d3, a1, p, q } = params;
      const kFrac = u.simplifyFrac(a1, d1);
      const xVal = u.simplifyFrac(p * d1 + a1 * d2, d1);
      const yVal = u.simplifyFrac(q * d1 + a1 * d3, d1);
      const sumVal = u.simplifyFrac((p + q) * d1 + a1 * (d2 + d3), d1);
      const correct = '$' + sumVal.latex + '$';
      const distractors = [
        '$' + u.simplifyFrac(sumVal.num + 1, sumVal.den).latex + '$',
        '$' + u.simplifyFrac(a1 * (d2 + d3), d1).latex + '$',
        '$' + u.simplifyFrac((p + q) * d1 - a1 * (d2 + d3), d1).latex + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.simplifyFrac(sumVal.num + k * sumVal.den, sumVal.den).latex + '$'
      );
      const comp2 = u.formatShift('x', -p);
      const comp3 = u.formatShift('y', -q);
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai vectơ $\\overrightarrow{d} = ' +
          u.formatCoord3D(d1, d2, d3) +
          '$ và $\\overrightarrow{a} = (' +
          a1 +
          ';\\, ' +
          comp2 +
          ';\\, ' +
          comp3 +
          ')$. Biết rằng $\\overrightarrow{d}$ và $\\overrightarrow{a}$ cùng phương. Tính tổng $x + y$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\overrightarrow{d}$ và $\\overrightarrow{a}$ cùng phương khi $\\dfrac{' + a1 + '}{' + d1 + '} = \\dfrac{' + comp2 + '}{' + d2 + '} = \\dfrac{' + comp3 + '}{' + d3 + '} = ' + kFrac.latex + '$.',
          'Suy ra $x = ' + xVal.latex + ',\\; y = ' + yVal.latex + '$.',
          'Vậy $x + y = ' + sumVal.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d1 = 0 (chia cho 0)', params: { d1: 0, d2: 2, d3: -3, a1: 3, p: 3, q: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 sum = 23/5', params: { d1: -5, d2: 2, d3: -3, a1: 3, p: 3, q: 1 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13): Ba điểm thẳng hàng tìm x + y
  t12_b8_d13_collinear_points_mc: {
    id: 't12_b8_d13_collinear_points_mc',
    name: 'Tìm tổng x + y để ba điểm E, D, F thẳng hàng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Điều kiện ba điểm thẳng hàng',
    description: 'Cho E, D và F(x; y; zF). Tìm x + y sao cho E, D, F thẳng hàng.',
    conditionSummary: 'zD ≠ zE và zF ≠ zE để xác định duy nhất hệ số tỷ lệ t',
    paramSpecs: [
      { name: 'xE', label: 'x_E', min: -6, max: 6 },
      { name: 'yE', label: 'y_E', min: -6, max: 6 },
      { name: 'zE', label: 'z_E', min: -5, max: 5 },
      { name: 'dx', label: 'x_D - x_E', min: -4, max: 4, allowZero: false },
      { name: 'dy', label: 'y_D - y_E', min: -4, max: 4, allowZero: false },
      { name: 'dz', label: 'z_D - z_E', min: -4, max: 4, allowZero: false },
      { name: 't', label: 'Hệ số t', min: -3, max: 4, allowZero: false },
    ],
    validateCode: `
      const { dx, dy, dz, t } = params;
      if (dx === 0 || dy === 0 || dz === 0 || t === 0 || t === 1) {
        return { valid: false, reason: 'Cần vectơ ED khác 0 theo các phương và t ≠ 0, 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xE, yE, zE, dx, dy, dz, t } = params;
      const xD = xE + dx, yD = yE + dy, zD = zE + dz;
      const zF = zE + t * dz;
      const xF = xE + t * dx;
      const yF = yE + t * dy;
      const sum = xF + yF;
      const correct = '$' + sum + '$';
      const distractors = [
        '$' + (sum + 2) + '$',
        '$' + (sum - 3) + '$',
        '$' + u.simplifyFrac(sum * 3 + 1, 5).latex + '$',
        '$' + (-sum) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + (sum + k + 4) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho các điểm $E' +
          u.formatCoord3D(xE, yE, zE) +
          ',\\; D' +
          u.formatCoord3D(xD, yD, zD) +
          '$ và $F(x;\\, y;\\, ' +
          zF +
          ')$. Biết rằng ba điểm $E, D, F$ thẳng hàng. Tính $x + y$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$E, D, F$ thẳng hàng khi $\\overrightarrow{ED} = ' +
            u.formatCoord3D(dx, dy, dz) +
            '$ và $\\overrightarrow{EF} = (' +
            u.formatShift('x', -xE) +
            ';\\, ' +
            u.formatShift('y', -yE) +
            ';\\, ' +
            t * dz +
            ')$ cùng phương.',
          'Ta có $\\dfrac{' + u.formatShift('x', -xE) + '}{' + dx + '} = \\dfrac{' + u.formatShift('y', -yE) + '}{' + dy + '} = \\dfrac{' + t * dz + '}{' + dz + '} = ' + t + '$.',
          'Suy ra $x = ' + xF + ',\\; y = ' + yF + ' \\Rightarrow x + y = ' + sum + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t = 1 (điểm F trùng D)', params: { xE: -3, yE: 3, zE: 1, dx: -2, dy: 1, dz: -2, t: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 E(-3;3;1), D(-5;4;-1), zF=5', params: { xE: -3, yE: 3, zE: 1, dx: -2, dy: 1, dz: -2, t: -2 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14): Hình chiếu vuông góc lên trục tọa độ
  t12_b8_d14_proj_axis_mc: {
    id: 't12_b8_d14_proj_axis_mc',
    name: 'Tìm hình chiếu vuông góc của một điểm lên trục tọa độ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hình chiếu và đối xứng trong Oxyz',
    description: 'Cho điểm E(x; y; z). Tìm tọa độ hình chiếu vuông góc I của E lên trục Ox, Oy hoặc Oz.',
    conditionSummary: 'x, y, z khác 0 để bốn phương án phân biệt hoàn toàn',
    paramSpecs: [
      { name: 'x', label: 'x', min: -9, max: 9, allowZero: false },
      { name: 'y', label: 'y', min: -9, max: 9, allowZero: false },
      { name: 'z', label: 'z', min: -9, max: 9, allowZero: false },
      { name: 'axisIdx', label: 'Trục (0:Ox, 1:Oy, 2:Oz)', min: 0, max: 2 },
    ],
    validateCode: `
      const { x, y, z } = params;
      if (x === 0 || y === 0 || z === 0) return { valid: false, reason: 'Cần x, y, z khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z, axisIdx } = params;
      const axes = ['Ox', 'Oy', 'Oz'];
      const axisName = axes[axisIdx] || 'Ox';
      const ansTuple = axisIdx === 0 ? [x, 0, 0] : axisIdx === 1 ? [0, y, 0] : [0, 0, z];
      const correct = '$I' + u.formatCoord3D(ansTuple[0], ansTuple[1], ansTuple[2]) + '$';
      const distractors = [
        '$I' + u.formatCoord3D(0, y, z) + '$',
        '$I' + u.formatCoord3D(x, y, 0) + '$',
        '$I' + u.formatCoord3D(x, 0, z) + '$',
        '$I' + u.formatCoord3D(0, y, 0) + '$',
        '$I' + u.formatCoord3D(x, 0, 0) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$I' + u.formatCoord3D(k, 0, 0) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho điểm $E' +
          u.formatCoord3D(x, y, z) +
          '$. Gọi $I$ là hình chiếu vuông góc của điểm $E$ lên trục $' +
          axisName +
          '$. Tọa độ điểm $I$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hình chiếu vuông góc của điểm $E' +
            u.formatCoord3D(x, y, z) +
            '$ lên trục $' +
            axisName +
            '$ giữ nguyên tọa độ ứng với trục $' +
            axisName +
            '$ và cho hai tọa độ còn lại bằng $0$, thu được $I' +
            u.formatCoord3D(ansTuple[0], ansTuple[1], ansTuple[2]) +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tọa độ có số 0', params: { x: 0, y: 3, z: -2, axisIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 E(1;6;-2) lên Ox', params: { x: 1, y: 6, z: -2, axisIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15): Hình chiếu vuông góc lên mặt phẳng tọa độ
  t12_b8_d15_proj_plane_mc: {
    id: 't12_b8_d15_proj_plane_mc',
    name: 'Tìm hình chiếu vuông góc của một điểm lên mặt phẳng tọa độ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hình chiếu và đối xứng trong Oxyz',
    description: 'Cho điểm N(x; y; z). Tìm tọa độ hình chiếu vuông góc H của N lên mặt phẳng (Oxy), (Oxz) hoặc (Oyz).',
    conditionSummary: 'x, y, z khác 0',
    paramSpecs: [
      { name: 'x', label: 'x', min: -9, max: 9, allowZero: false },
      { name: 'y', label: 'y', min: -9, max: 9, allowZero: false },
      { name: 'z', label: 'z', min: -9, max: 9, allowZero: false },
      { name: 'planeIdx', label: 'Mặt phẳng (0:Oxy, 1:Oxz, 2:Oyz)', min: 0, max: 2 },
    ],
    validateCode: `
      const { x, y, z } = params;
      if (x === 0 || y === 0 || z === 0) return { valid: false, reason: 'Cần x, y, z khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z, planeIdx } = params;
      const planes = ['(Oxy)', '(Oxz)', '(Oyz)'];
      const planeName = planes[planeIdx] || '(Oxz)';
      const ans = planeIdx === 0 ? [x, y, 0] : planeIdx === 1 ? [x, 0, z] : [0, y, z];
      const correct = '$H' + u.formatCoord3D(ans[0], ans[1], ans[2]) + '$';
      const distractors = [
        '$H' + u.formatCoord3D(x, 0, 0) + '$',
        '$H' + u.formatCoord3D(0, 0, z) + '$',
        '$H' + u.formatCoord3D(0, y, 0) + '$',
        '$H' + u.formatCoord3D(x, y, 0) + '$',
        '$H' + u.formatCoord3D(x, 0, z) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$H' + u.formatCoord3D(k, y, 0) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho điểm $N' +
          u.formatCoord3D(x, y, z) +
          '$. Gọi $H$ là hình chiếu vuông góc của điểm $N$ lên mặt phẳng $' +
          planeName +
          '$. Tọa độ điểm $H$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hình chiếu vuông góc của $N' +
            u.formatCoord3D(x, y, z) +
            '$ lên mặt phẳng $' +
            planeName +
            '$ là $H' +
            u.formatCoord3D(ans[0], ans[1], ans[2]) +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tọa độ bằng 0', params: { x: 5, y: 0, z: -3, planeIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 N(5;-7;-3) lên (Oxz)', params: { x: 5, y: -7, z: -3, planeIdx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16): Điểm đối xứng qua trục tọa độ
  t12_b8_d16_sym_axis_mc: {
    id: 't12_b8_d16_sym_axis_mc',
    name: 'Tìm điểm đối xứng với một điểm qua trục tọa độ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hình chiếu và đối xứng trong Oxyz',
    description: 'Cho điểm D(x; y; z). Tìm tọa độ điểm K đối xứng với D qua trục Ox, Oy hoặc Oz.',
    conditionSummary: 'x, y, z khác 0',
    paramSpecs: [
      { name: 'x', label: 'x', min: -9, max: 9, allowZero: false },
      { name: 'y', label: 'y', min: -9, max: 9, allowZero: false },
      { name: 'z', label: 'z', min: -9, max: 9, allowZero: false },
      { name: 'axisIdx', label: 'Trục (0:Ox, 1:Oy, 2:Oz)', min: 0, max: 2 },
    ],
    validateCode: `
      const { x, y, z } = params;
      if (x === 0 || y === 0 || z === 0) return { valid: false, reason: 'Cần x, y, z khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z, axisIdx } = params;
      const axes = ['Ox', 'Oy', 'Oz'];
      const axisName = axes[axisIdx] || 'Oy';
      const ans = axisIdx === 0 ? [x, -y, -z] : axisIdx === 1 ? [-x, y, -z] : [-x, -y, z];
      const correct = '$K' + u.formatCoord3D(ans[0], ans[1], ans[2]) + '$';
      const distractors = [
        '$K' + u.formatCoord3D(x, -y, z) + '$',
        '$K' + u.formatCoord3D(x, y, -z) + '$',
        '$K' + u.formatCoord3D(0, y, z) + '$',
        '$K' + u.formatCoord3D(-x, -y, -z) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$K' + u.formatCoord3D(ans[0] + k, ans[1], ans[2]) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho điểm $D' +
          u.formatCoord3D(x, y, z) +
          '$. Gọi $K$ là điểm đối xứng với điểm $D$ qua trục $' +
          axisName +
          '$. Tọa độ điểm $K$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điểm đối xứng với $D' +
            u.formatCoord3D(x, y, z) +
            '$ qua trục $' +
            axisName +
            '$ giữ nguyên tọa độ trên trục $' +
            axisName +
            '$ và đổi dấu hai tọa độ còn lại, suy ra $K' +
            u.formatCoord3D(ans[0], ans[1], ans[2]) +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tọa độ bằng 0', params: { x: 0, y: 4, z: -8, axisIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 D(-4;4;-8) qua Oy', params: { x: -4, y: 4, z: -8, axisIdx: 1 }, expectedValid: true },
    ],
  },

  // Dạng 17 (Q17): Điểm đối xứng qua mặt phẳng tọa độ
  t12_b8_d17_sym_plane_mc: {
    id: 't12_b8_d17_sym_plane_mc',
    name: 'Tìm điểm đối xứng với một điểm qua mặt phẳng tọa độ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hình chiếu và đối xứng trong Oxyz',
    description: 'Cho điểm F(x; y; z). Tìm tọa độ điểm G đối xứng với F qua mặt phẳng (Oxy), (Oxz) hoặc (Oyz).',
    conditionSummary: 'x, y, z khác 0',
    paramSpecs: [
      { name: 'x', label: 'x', min: -9, max: 9, allowZero: false },
      { name: 'y', label: 'y', min: -9, max: 9, allowZero: false },
      { name: 'z', label: 'z', min: -9, max: 9, allowZero: false },
      { name: 'planeIdx', label: 'Mặt phẳng (0:Oxy, 1:Oxz, 2:Oyz)', min: 0, max: 2 },
    ],
    validateCode: `
      const { x, y, z } = params;
      if (x === 0 || y === 0 || z === 0) return { valid: false, reason: 'Cần x, y, z khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z, planeIdx } = params;
      const planes = ['(Oxy)', '(Oxz)', '(Oyz)'];
      const planeName = planes[planeIdx] || '(Oxy)';
      const ans = planeIdx === 0 ? [x, y, -z] : planeIdx === 1 ? [x, -y, z] : [-x, y, z];
      const correct = '$G' + u.formatCoord3D(ans[0], ans[1], ans[2]) + '$';
      const distractors = [
        '$G' + u.formatCoord3D(0, y, z) + '$',
        '$G' + u.formatCoord3D(x, y, 0) + '$',
        '$G' + u.formatCoord3D(-x, y, -z) + '$',
        '$G' + u.formatCoord3D(-x, -y, -z) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$G' + u.formatCoord3D(ans[0] + k, ans[1], ans[2]) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho điểm $F' +
          u.formatCoord3D(x, y, z) +
          '$. Gọi $G$ là điểm đối xứng với điểm $F$ qua mặt phẳng $' +
          planeName +
          '$. Tọa độ điểm $G$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Điểm đối xứng với $F' +
            u.formatCoord3D(x, y, z) +
            '$ qua mặt phẳng $' +
            planeName +
            '$ giữ nguyên hai tọa độ thuộc mặt phẳng đó và đổi dấu tọa độ còn lại, suy ra $G' +
            u.formatCoord3D(ans[0], ans[1], ans[2]) +
            '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tọa độ bằng 0', params: { x: 8, y: -7, z: 0, planeIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 F(8;-7;-2) qua (Oxy)', params: { x: 8, y: -7, z: -2, planeIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18): Tọa độ trung điểm đoạn thẳng
  t12_b8_d18_midpoint_mc: {
    id: 't12_b8_d18_midpoint_mc',
    name: 'Tìm tọa độ trung điểm của đoạn thẳng GF',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Trung điểm và trọng tâm trong Oxyz',
    description: 'Cho hai điểm G, F. Tính tọa độ trung điểm P của đoạn thẳng GF.',
    conditionSummary: 'G ≠ F',
    paramSpecs: [
      { name: 'x1', label: 'x_G', min: -10, max: 10 },
      { name: 'y1', label: 'y_G', min: -10, max: 10 },
      { name: 'z1', label: 'z_G', min: -10, max: 10 },
      { name: 'x2', label: 'x_F', min: -10, max: 10 },
      { name: 'y2', label: 'y_F', min: -10, max: 10 },
      { name: 'z2', label: 'z_F', min: -10, max: 10 },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2 } = params;
      if (x1 === x2 && y1 === y2 && z1 === z2) return { valid: false, reason: 'Hai điểm phải phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2 } = params;
      const mx = u.simplifyFrac(x1 + x2, 2);
      const my = u.simplifyFrac(y1 + y2, 2);
      const mz = u.simplifyFrac(z1 + z2, 2);
      const fmt3 = (a, b, c) => '(' + a + ';\\, ' + b + ';\\, ' + c + ')';
      const addFmt = (a, b) => (b < 0 ? a + ' - ' + Math.abs(b) : a + ' + ' + b);
      const correct = '$P' + fmt3(mx.latex, my.latex, mz.latex) + '$';
      const distractors = [
        '$P' + fmt3(mx.latex, u.simplifyFrac(y1 - y2, 2).latex, mz.latex) + '$',
        '$P' + fmt3(u.simplifyFrac(x1 + x2 + 2, 2).latex, my.latex, u.simplifyFrac(z1 + z2 + 2, 2).latex) + '$',
        '$P' + fmt3(mx.latex, my.latex, u.simplifyFrac(z1 + z2 + 4, 2).latex) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$P' + fmt3(u.simplifyFrac(x1 + x2 + k * 2, 2).latex, my.latex, mz.latex) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai điểm $G' +
          u.formatCoord3D(x1, y1, z1) +
          '$ và $F' +
          u.formatCoord3D(x2, y2, z2) +
          '$. Tìm tọa độ điểm $P$ là trung điểm của đoạn thẳng $GF$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tọa độ trung điểm $P$ của đoạn thẳng $GF$: $x_P = \\dfrac{' + addFmt(x1, x2) + '}{2} = ' + mx.latex + '$, $y_P = \\dfrac{' + addFmt(y1, y2) + '}{2} = ' + my.latex + '$, $z_P = \\dfrac{' + addFmt(z1, z2) + '}{2} = ' + mz.latex + '$.',
          'Vậy $P' + fmt3(mx.latex, my.latex, mz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên G trùng F', params: { x1: 2, y1: 3, z1: 4, x2: 2, y2: 3, z2: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 G(-9;-1;8), F(-6;5;-9)', params: { x1: -9, y1: -1, z1: 8, x2: -6, y2: 5, z2: -9 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19): Tìm điểm đối xứng qua một điểm
  t12_b8_d19_sym_point_mc: {
    id: 't12_b8_d19_sym_point_mc',
    name: 'Tìm điểm C đối xứng với điểm M qua điểm F',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Trung điểm và trọng tâm trong Oxyz',
    description: 'Cho M và F. Tìm điểm C sao cho M và C đối xứng nhau qua F (F là trung điểm MC).',
    conditionSummary: 'M ≠ F và C ≠ (0;0;0)',
    paramSpecs: [
      { name: 'xM', label: 'x_M', min: -10, max: 10 },
      { name: 'yM', label: 'y_M', min: -10, max: 10 },
      { name: 'zM', label: 'z_M', min: -10, max: 10 },
      { name: 'xF', label: 'x_F', min: -8, max: 8 },
      { name: 'yF', label: 'y_F', min: -8, max: 8 },
      { name: 'zF', label: 'z_F', min: -8, max: 8 },
    ],
    validateCode: `
      const { xM, yM, zM, xF, yF, zF } = params;
      if (xM === xF && yM === yF && zM === zF) return { valid: false, reason: 'M và F phải khác nhau' };
      const xC = 2 * xF - xM, yC = 2 * yF - yM, zC = 2 * zF - zM;
      if (xC === 0 && yC === 0 && zC === 0) return { valid: false, reason: 'Tránh C trùng gốc O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xM, yM, zM, xF, yF, zF } = params;
      const xC = 2 * xF - xM, yC = 2 * yF - yM, zC = 2 * zF - zM;
      const correct = '$C' + u.formatCoord3D(xC, yC, zC) + '$';
      const wNum = (n) => (n < 0 ? '(' + n + ')' : '' + n);
      const distractors = [
        '$C' + u.formatCoord3D(2 * xM - xF, 2 * yM - yF, 2 * zM - zF) + '$',
        '$C' + u.formatCoord3D(-xC, -yC, zC) + '$',
        '$C' + u.formatCoord3D(xC + 3, yC - 1, zC - 1) + '$',
        '$C' + u.formatCoord3D(xF + xM, yF + yM, zF + zM) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$C' + u.formatCoord3D(xC + k, yC, zC) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai điểm $M' +
          u.formatCoord3D(xM, yM, zM) +
          '$ và $F' +
          u.formatCoord3D(xF, yF, zF) +
          '$. Tìm tọa độ điểm $C$ sao cho $M$ và $C$ đối xứng nhau qua $F$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $M$ và $C$ đối xứng nhau qua $F$ nên $F$ là trung điểm của đoạn thẳng $MC$.',
          'Do đó $x_C = 2x_F - x_M = 2\\cdot ' + wNum(xF) + ' - ' + wNum(xM) + ' = ' + xC + '$, $y_C = 2\\cdot ' + wNum(yF) + ' - ' + wNum(yM) + ' = ' + yC + '$, $z_C = 2\\cdot ' + wNum(zF) + ' - ' + wNum(zM) + ' = ' + zC + '$.',
          'Vậy $C' + u.formatCoord3D(xC, yC, zC) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M trùng F', params: { xM: 2, yM: 5, zM: 4, xF: 2, yF: 5, zF: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 M(-10;3;-7), F(2;5;4)', params: { xM: -10, yM: 3, zM: -7, xF: 2, yF: 5, zF: 4 }, expectedValid: true },
    ],
  },

  // Dạng 20 (Q20): Trọng tâm tam giác cho 3 đỉnh
  t12_b8_d20_centroid_3pts_mc: {
    id: 't12_b8_d20_centroid_3pts_mc',
    name: 'Tìm tọa độ trọng tâm tam giác khi biết ba đỉnh',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Trung điểm và trọng tâm trong Oxyz',
    description: 'Cho tam giác DEN với tọa độ D, E, N. Tìm tọa độ trọng tâm K của tam giác DEN.',
    conditionSummary: 'Ba điểm D, E, N không thẳng hàng',
    paramSpecs: [
      { name: 'xD', label: 'x_D', min: -9, max: 6 },
      { name: 'yD', label: 'y_D', min: -6, max: 6 },
      { name: 'zD', label: 'z_D', min: -6, max: 6 },
      { name: 'xE', label: 'x_E', min: -9, max: 6 },
      { name: 'yE', label: 'y_E', min: -6, max: 6 },
      { name: 'zE', label: 'z_E', min: -6, max: 6 },
      { name: 'xN', label: 'x_N', min: -9, max: 6 },
      { name: 'yN', label: 'y_N', min: -6, max: 6 },
      { name: 'zN', label: 'z_N', min: -6, max: 6 },
    ],
    validateCode: `
      const { xD, yD, zD, xE, yE, zE, xN, yN, zN } = params;
      const u1 = xE - xD, u2 = yE - yD, u3 = zE - zD;
      const v1 = xN - xD, v2 = yN - yD, v3 = zN - zD;
      const cx = u2 * v3 - u3 * v2, cy = u3 * v1 - u1 * v3, cz = u1 * v2 - u2 * v1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'Ba đỉnh thẳng hàng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xD, yD, zD, xE, yE, zE, xN, yN, zN } = params;
      const gx = u.simplifyFrac(xD + xE + xN, 3);
      const gy = u.simplifyFrac(yD + yE + yN, 3);
      const gz = u.simplifyFrac(zD + zE + zN, 3);
      const fmt3 = (a, b, c) => '(' + a + ';\\, ' + b + ';\\, ' + c + ')';
      const sum3 = (a, b, c) => a + (b < 0 ? ' - ' + Math.abs(b) : ' + ' + b) + (c < 0 ? ' - ' + Math.abs(c) : ' + ' + c);
      const correct = '$' + fmt3(gx.latex, gy.latex, gz.latex) + '$';
      const distractors = [
        '$' + fmt3(gx.latex, gy.latex, gx.latex) + '$',
        '$' + fmt3(u.simplifyFrac(xD + xE + xN, 2).latex, u.simplifyFrac(yD + yE + yN, 2).latex, u.simplifyFrac(zD + zE + zN, 2).latex) + '$',
        '$' + fmt3(u.simplifyFrac(xD + xE + xN + 3, 3).latex, gy.latex, u.simplifyFrac(zD + zE + zN - 3, 3).latex) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + fmt3(u.simplifyFrac(xD + xE + xN + k, 3).latex, gy.latex, gz.latex) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $DEN$ với $D' +
          u.formatCoord3D(xD, yD, zD) +
          ',\\; E' +
          u.formatCoord3D(xE, yE, zE) +
          ',\\; N' +
          u.formatCoord3D(xN, yN, zN) +
          '$. Tọa độ trọng tâm $K$ của tam giác $DEN$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $K = \\left(\\dfrac{' + sum3(xD, xE, xN) + '}{3};\\; \\dfrac{' + sum3(yD, yE, yN) + '}{3};\\; \\dfrac{' + sum3(zD, zE, zN) + '}{3}\\right) = ' + fmt3(gx.latex, gy.latex, gz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ba điểm thẳng hàng', params: { xD: 0, yD: 0, zD: 0, xE: 1, yE: 1, zE: 1, xN: 2, yN: 2, zN: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 D(-3;-1;0), E(-6;0;-1), N(-9;-1;1)', params: { xD: -3, yD: -1, zD: 0, xE: -6, yE: 0, zE: -1, xN: -9, yN: -1, zN: 1 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21): Trọng tâm tam giác khi biết 1 đỉnh và 2 vectơ cạnh
  t12_b8_d21_centroid_vertex_2vecs_mc: {
    id: 't12_b8_d21_centroid_vertex_2vecs_mc',
    name: 'Tìm tọa độ trọng tâm tam giác khi biết một đỉnh và hai vectơ cạnh',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Trung điểm và trọng tâm trong Oxyz',
    description: 'Cho tam giác PNE với P, vectơ PN và PE. Tìm tọa độ trọng tâm H của tam giác PNE.',
    conditionSummary: 'PN và PE không cùng phương',
    paramSpecs: [
      { name: 'xP', label: 'x_P', min: -6, max: 6 },
      { name: 'yP', label: 'y_P', min: -6, max: 6 },
      { name: 'zP', label: 'z_P', min: -6, max: 6 },
      { name: 'u1', label: 'PN_x', min: -8, max: 8 },
      { name: 'u2', label: 'PN_y', min: -8, max: 8 },
      { name: 'u3', label: 'PN_z', min: -8, max: 8 },
      { name: 'v1', label: 'PE_x', min: -10, max: 10 },
      { name: 'v2', label: 'PE_y', min: -10, max: 10 },
      { name: 'v3', label: 'PE_z', min: -10, max: 10 },
    ],
    validateCode: `
      const { u1, u2, u3, v1, v2, v3 } = params;
      const cx = u2 * v3 - u3 * v2, cy = u3 * v1 - u1 * v3, cz = u1 * v2 - u2 * v1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'PN và PE cùng phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xP, yP, zP, u1, u2, u3, v1, v2, v3 } = params;
      const xN = xP + u1, yN = yP + u2, zN = zP + u3;
      const xE = xP + v1, yE = yP + v2, zE = zP + v3;
      const hx = u.simplifyFrac(3 * xP + u1 + v1, 3);
      const hy = u.simplifyFrac(3 * yP + u2 + v2, 3);
      const hz = u.simplifyFrac(3 * zP + u3 + v3, 3);
      const fmt3 = (a, b, c) => '(' + a + ';\\, ' + b + ';\\, ' + c + ')';
      const correct = '$' + fmt3(hx.latex, hy.latex, hz.latex) + '$';
      const distractors = [
        '$' + fmt3(hx.latex, hy.latex, hx.latex) + '$',
        '$' + fmt3(u.simplifyFrac(u1 + v1, 3).latex, u.simplifyFrac(u2 + v2, 3).latex, u.simplifyFrac(u3 + v3, 3).latex) + '$',
        '$' + fmt3(u.simplifyFrac(3 * xP + u1 + v1 + 3, 3).latex, hy.latex, u.simplifyFrac(3 * zP + u3 + v3 - 2, 3).latex) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + fmt3(u.simplifyFrac(3 * xP + u1 + v1 + k, 3).latex, hy.latex, hz.latex) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $PNE$ với $P' +
          u.formatCoord3D(xP, yP, zP) +
          ',\\; \\overrightarrow{PN}' +
          u.formatCoord3D(u1, u2, u3) +
          '$ và $\\overrightarrow{PE}' +
          u.formatCoord3D(v1, v2, v3) +
          '$. Tọa độ trọng tâm $H$ của tam giác $PNE$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ $P' + u.formatCoord3D(xP, yP, zP) + '$ và $\\overrightarrow{PN}, \\overrightarrow{PE}$ suy ra $N' + u.formatCoord3D(xN, yN, zN) + ',\\; E' + u.formatCoord3D(xE, yE, zE) + '$.',
          'Trọng tâm $H = ' + fmt3(hx.latex, hy.latex, hz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên PN và PE cùng phương', params: { xP: 0, yP: 0, zP: 0, u1: 1, u2: 2, u3: 3, v1: 2, v2: 4, v3: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 H(5/3; 1; 3)', params: { xP: -3, yP: -4, zP: 6, u1: 4, u2: 6, u3: -6, v1: 10, v2: 9, v3: -3 }, expectedValid: true },
    ],
  },

  // Dạng 22 (Q22): Tìm đỉnh còn lại của tam giác khi biết 2 đỉnh và trọng tâm
  t12_b8_d22_third_vertex_from_centroid_mc: {
    id: 't12_b8_d22_third_vertex_from_centroid_mc',
    name: 'Tìm tọa độ đỉnh B khi biết hai đỉnh M, C và trọng tâm I',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Trung điểm và trọng tâm trong Oxyz',
    description: 'Cho tam giác MCB biết đỉnh M, C và trọng tâm I. Tìm tọa độ đỉnh B.',
    conditionSummary: 'Ba đỉnh M, C, B không thẳng hàng',
    paramSpecs: [
      { name: 'xM', label: 'x_M', min: -7, max: 7 },
      { name: 'yM', label: 'y_M', min: -7, max: 7 },
      { name: 'zM', label: 'z_M', min: -7, max: 7 },
      { name: 'xC', label: 'x_C', min: -7, max: 7 },
      { name: 'yC', label: 'y_C', min: -7, max: 7 },
      { name: 'zC', label: 'z_C', min: -7, max: 7 },
      { name: 'xB', label: 'x_B', min: -7, max: 7 },
      { name: 'yB', label: 'y_B', min: -7, max: 7 },
      { name: 'zB', label: 'z_B', min: -7, max: 7 },
    ],
    validateCode: `
      const { xM, yM, zM, xC, yC, zC, xB, yB, zB } = params;
      const u1 = xC - xM, u2 = yC - yM, u3 = zC - zM;
      const v1 = xB - xM, v2 = yB - yM, v3 = zB - zM;
      const cx = u2 * v3 - u3 * v2, cy = u3 * v1 - u1 * v3, cz = u1 * v2 - u2 * v1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'M, C, B thẳng hàng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xM, yM, zM, xC, yC, zC, xB, yB, zB } = params;
      const ix = u.simplifyFrac(xM + xC + xB, 3);
      const iy = u.simplifyFrac(yM + yC + yB, 3);
      const iz = u.simplifyFrac(zM + zC + zB, 3);
      const fmt3 = (a, b, c) => '(' + a + ';\\, ' + b + ';\\, ' + c + ')';
      const correct = '$' + u.formatCoord3D(xB, yB, zB) + '$';
      const distractors = [
        '$' + u.formatCoord3D(xB, yB, xB) + '$',
        '$' + u.formatCoord3D(xB, yB + 1, xB) + '$',
        '$' + u.formatCoord3D(-xB, -yB, -zB) + '$',
        '$' + u.formatCoord3D(xB + 2, yB - 1, zB + 3) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$' + u.formatCoord3D(xB + k, yB, zB) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho tam giác $MCB$ với $M' +
          u.formatCoord3D(xM, yM, zM) +
          ',\\; C' +
          u.formatCoord3D(xC, yC, zC) +
          '$. Tam giác $MCB$ nhận $I' +
          fmt3(ix.latex, iy.latex, iz.latex) +
          '$ làm trọng tâm. Tọa độ điểm $B$ là',
        options,
        correctIndex,
        answerSummary: '$B' + u.formatCoord3D(xB, yB, zB) + '$',
        solutionSteps: [
          '$I$ là trọng tâm tam giác $MCB$ nên $x_B = 3x_I - x_M - x_C = ' + xB + '$, $y_B = 3y_I - y_M - y_C = ' + yB + '$, $z_B = 3z_I - z_M - z_C = ' + zB + '$.',
          'Vậy $B' + u.formatCoord3D(xB, yB, zB) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên thẳng hàng', params: { xM: 0, yM: 0, zM: 0, xC: 1, yC: 1, zC: 1, xB: 2, yB: 2, zB: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 M(-6;-1;2), C(-2;1;0), B(6;4;-1)', params: { xM: -6, yM: -1, zM: 2, xC: -2, yC: 1, zC: 0, xB: 6, yB: 4, zB: -1 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23): Hình chóp đáy tam giác vuông - trọng tâm mặt bên
  t12_b8_d23_pyramid_right_centroid_mc: {
    id: 't12_b8_d23_pyramid_right_centroid_mc',
    name: 'Tọa độ trọng tâm tam giác IBC trong hình chóp I.ABC có góc vuông tại A',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Gắn hệ trục tọa độ cho hình chóp',
    description: 'Hình chóp I.ABC có đáy vuông tại A, AB = a, AC = b, IA = h. A ≡ O, B ∈ Ox, C ∈ Oy, I ∈ Oz. Tìm trọng tâm G của tam giác IBC.',
    conditionSummary: 'a, b, h > 0 và phân biệt',
    paramSpecs: [
      { name: 'a', label: 'AB = a', min: 2, max: 11 },
      { name: 'b', label: 'AC = b', min: 2, max: 11 },
      { name: 'h', label: 'IA = h', min: 2, max: 11 },
    ],
    validateCode: `
      const { a, b, h } = params;
      if (a <= 0 || b <= 0 || h <= 0) return { valid: false, reason: 'Cạnh phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h } = params;
      const gx = u.simplifyFrac(a, 3);
      const gy = u.simplifyFrac(b, 3);
      const gz = u.simplifyFrac(h, 3);
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const correct = '$G' + fmt3(gx.latex, gy.latex, gz.latex) + '$';
      const distractors = [
        '$G' + u.formatCoord3D(a, 0, h) + '$',
        '$G' + u.formatCoord3D(a, 0, 0) + '$',
        '$G' + u.formatCoord3D(a, b, 0) + '$',
        '$G' + fmt3(u.simplifyFrac(a, 2).latex, u.simplifyFrac(b, 2).latex, u.simplifyFrac(h, 2).latex) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$G' + fmt3(u.simplifyFrac(a + k, 3).latex, gy.latex, gz.latex) + '$'
      );
      return {
        stem:
          'Cho hình chóp $I.ABC$ có đáy là tam giác vuông tại $A$, $AB = ' +
          a +
          ',\\; AC = ' +
          b +
          ',\\; IA = ' +
          h +
          '$. Chọn hệ trục $Oxyz$ sao cho $O \\equiv A$, điểm $B$ thuộc tia $Ox$, điểm $C$ thuộc tia $Oy$ và điểm $I$ thuộc tia $Oz$. Tọa độ trọng tâm $G$ của tam giác $IBC$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $A(0;0;0),\\; B(' + a + ';0;0),\\; C(0;' + b + ';0),\\; I(0;0;' + h + ')$.',
          'Trọng tâm $G$ của tam giác $IBC$ là $G' + fmt3(gx.latex, gy.latex, gz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh không dương', params: { a: 0, b: 3, h: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 a=5, b=3, h=7', params: { a: 5, b: 3, h: 7 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24): Hình chóp đáy tam giác vuông - trung điểm cạnh bên
  t12_b8_d24_pyramid_right_midpoint_mc: {
    id: 't12_b8_d24_pyramid_right_midpoint_mc',
    name: 'Tọa độ trung điểm cạnh IC trong hình chóp I.ABC vuông tại A',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Gắn hệ trục tọa độ cho hình chóp',
    description: 'Hình chóp I.ABC có đáy vuông tại A, AB = a, AC = b, IA = h. Tìm tọa độ trung điểm M của IC.',
    conditionSummary: 'a, b, h > 0',
    paramSpecs: [
      { name: 'a', label: 'AB = a', min: 2, max: 11 },
      { name: 'b', label: 'AC = b', min: 2, max: 11 },
      { name: 'h', label: 'IA = h', min: 2, max: 11 },
    ],
    validateCode: `
      const { a, b, h } = params;
      if (a <= 0 || b <= 0 || h <= 0) return { valid: false, reason: 'Cạnh phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h } = params;
      const my = u.simplifyFrac(b, 2);
      const mz = u.simplifyFrac(h, 2);
      const ax = u.simplifyFrac(a, 2);
      const gx = u.simplifyFrac(a, 3);
      const gy = u.simplifyFrac(b, 3);
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const correct = '$M' + fmt3('0', my.latex, mz.latex) + '$';
      const distractors = [
        '$M' + fmt3(ax.latex, '0', mz.latex) + '$',
        '$M' + fmt3(gx.latex, gy.latex, '' + h) + '$',
        '$M' + fmt3(ax.latex, my.latex, '0') + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$M' + fmt3('0', my.latex, u.simplifyFrac(h + k, 2).latex) + '$'
      );
      return {
        stem:
          'Cho hình chóp $I.ABC$ có đáy là tam giác vuông tại $A$, $AB = ' +
          a +
          ',\\; AC = ' +
          b +
          ',\\; IA = ' +
          h +
          '$. Chọn hệ trục $Oxyz$ sao cho $O \\equiv A$, điểm $B$ thuộc tia $Ox$, điểm $C$ thuộc tia $Oy$ và điểm $I$ thuộc tia $Oz$. Tọa độ trung điểm $M$ của đoạn thẳng $IC$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $C(0;' + b + ';0),\\; I(0;0;' + h + ')$.',
          'Trung điểm $M$ của $IC$ là $M' + fmt3('0', my.latex, mz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh âm', params: { a: 2, b: -3, h: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 a=2, b=3, h=8', params: { a: 2, b: 3, h: 8 }, expectedValid: true },
    ],
  },

  // Dạng 25 (Q25): Chóp tam giác đều cạnh a, SA ⊥ (ABC), trọng tâm SAB
  t12_b8_d25_pyramid_equilateral_centroid_mc: {
    id: 't12_b8_d25_pyramid_equilateral_centroid_mc',
    name: 'Tọa độ trọng tâm mặt bên SAB của hình chóp S.ABC đáy tam giác đều',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Gắn hệ trục tọa độ cho hình chóp',
    description: 'S.ABC có đáy đều cạnh a, SA ⊥ (ABC), SA = h. O là trung điểm BC, B ∈ Ox, A ∈ Oy, Oz // AS. Tìm trọng tâm G của SAB.',
    conditionSummary: 'a, h ≥ 2',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 2, max: 11 },
      { name: 'h', label: 'Chiều cao h', min: 2, max: 10 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh và chiều cao phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const fracSqrt3 = (num, den) => {
        const f = u.simplifyFrac(num, den);
        const absN = Math.abs(f.num);
        const sign = f.num < 0 ? '-' : '';
        const top = (absN === 1 ? '' : absN) + '\\sqrt{3}';
        return f.den === 1 ? sign + top : sign + '\\frac{' + top + '}{' + f.den + '}';
      };
      const gx = u.simplifyFrac(a, 6);
      const gy = fracSqrt3(a, 3);
      const gz = u.simplifyFrac(h, 3);
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const correct = '$G' + fmt3(gx.latex, gy, gz.latex) + '$';
      const distractors = [
        '$G' + fmt3(u.simplifyFrac(a, 2).latex, gy, '0') + '$',
        '$G' + fmt3('0', '0', gz.latex) + '$',
        '$G' + fmt3('0', '0', gy) + '$',
        '$G' + fmt3(u.simplifyFrac(a, 3).latex, fracSqrt3(a, 6), gz.latex) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$G' + fmt3(u.simplifyFrac(a + k, 6).latex, gy, gz.latex) + '$'
      );
      return {
        stem:
          'Cho hình chóp $S.ABC$ có đáy là tam giác đều cạnh bằng $' +
          a +
          '$, $SA \\perp (ABC)$ và $SA = ' +
          h +
          '$. Chọn hệ trục $Oxyz$ sao cho điểm $O$ trùng với trung điểm $M$ của $BC$, điểm $B$ thuộc tia $Ox$, điểm $A$ thuộc tia $Oy$ và tia $Oz$ cùng hướng với tia $\\overrightarrow{AS}$. Tọa độ trọng tâm $G$ của tam giác $SAB$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $M(0;0;0)$, $B' + fmt3(u.simplifyFrac(a, 2).latex, '0', '0') + '$, $A' + fmt3('0', fracSqrt3(a, 2), '0') + '$, $S' + fmt3('0', fracSqrt3(a, 2), '' + h) + '$.',
          'Trọng tâm $G$ của $\\triangle SAB$ là $G' + fmt3(gx.latex, gy, gz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh đáy = 0', params: { a: 0, h: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 a=5, h=3', params: { a: 5, h: 3 }, expectedValid: true },
    ],
  },

  // Dạng 26 (Q26): Chóp tam giác đều, trung điểm SC
  t12_b8_d26_pyramid_equilateral_midpoint_mc: {
    id: 't12_b8_d26_pyramid_equilateral_midpoint_mc',
    name: 'Tọa độ trung điểm cạnh SC trong hình chóp S.ABC đáy tam giác đều',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Gắn hệ trục tọa độ cho hình chóp',
    description: 'S.ABC có đáy đều cạnh a, SA ⊥ (ABC), SA = h. O là trung điểm N của BC, B ∈ Ox, A ∈ Oy, Oz // AS. Tìm trung điểm H của SC.',
    conditionSummary: 'a, h ≥ 2',
    paramSpecs: [
      { name: 'a', label: 'Cạnh đáy a', min: 2, max: 11 },
      { name: 'h', label: 'Chiều cao h', min: 2, max: 10 },
    ],
    validateCode: `
      const { a, h } = params;
      if (a <= 0 || h <= 0) return { valid: false, reason: 'Cạnh và chiều cao phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h } = params;
      const fracSqrt3 = (num, den) => {
        const f = u.simplifyFrac(num, den);
        const absN = Math.abs(f.num);
        const sign = f.num < 0 ? '-' : '';
        const top = (absN === 1 ? '' : absN) + '\\sqrt{3}';
        return f.den === 1 ? sign + top : sign + '\\frac{' + top + '}{' + f.den + '}';
      };
      const hx = u.simplifyFrac(-a, 4);
      const hy = fracSqrt3(a, 4);
      const hz = u.simplifyFrac(h, 2);
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const correct = '$H' + fmt3(hx.latex, hy, hz.latex) + '$';
      const distractors = [
        '$H' + fmt3('0', hy, hz.latex) + '$',
        '$H' + fmt3(hx.latex, '0', hz.latex) + '$',
        '$H' + fmt3(u.simplifyFrac(a, 2).latex, hy, hz.latex) + '$',
        '$H' + fmt3(u.simplifyFrac(a, 4).latex, hy, hz.latex) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$H' + fmt3(u.simplifyFrac(-a - k, 4).latex, hy, hz.latex) + '$'
      );
      return {
        stem:
          'Cho hình chóp $S.ABC$ có đáy là tam giác đều cạnh bằng $' +
          a +
          '$, $SA \\perp (ABC)$ và $SA = ' +
          h +
          '$. Chọn hệ trục $Oxyz$ sao cho điểm $O$ trùng với trung điểm $N$ của $BC$, điểm $B$ thuộc tia $Ox$, điểm $A$ thuộc tia $Oy$ và tia $Oz$ cùng hướng với tia $\\overrightarrow{AS}$. Tọa độ trung điểm $H$ của đoạn thẳng $SC$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $N(0;0;0),\\; B' + fmt3(u.simplifyFrac(a, 2).latex, '0', '0') + ',\\; C' + fmt3(u.simplifyFrac(-a, 2).latex, '0', '0') + ',\\; S' + fmt3('0', fracSqrt3(a, 2), '' + h) + '$.',
          'Tọa độ trung điểm $H$ của đoạn thẳng $SC$ là $H' + fmt3(hx.latex, hy, hz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao h = 0', params: { a: 7, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 a=7, h=2', params: { a: 7, h: 2 }, expectedValid: true },
    ],
  },

  // Dạng 27 (Q27): Chóp đáy chữ nhật, trung điểm SE
  t12_b8_d27_pyramid_rect_midpoint_mc: {
    id: 't12_b8_d27_pyramid_rect_midpoint_mc',
    name: 'Tọa độ trung điểm SE trong hình chóp S.CDEF đáy hình chữ nhật',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Gắn hệ trục tọa độ cho hình chóp',
    description: 'Cho hình chóp S.CDEF đáy hình chữ nhật, SC ⊥ (CDEF), CD = a, CF = b, SC = h. Tìm tọa độ trung điểm H của SE.',
    conditionSummary: 'a, b, h > 0',
    paramSpecs: [
      { name: 'a', label: 'CD = a', min: 2, max: 12 },
      { name: 'b', label: 'CF = b', min: 2, max: 12 },
      { name: 'h', label: 'SC = h', min: 2, max: 12 },
    ],
    validateCode: `
      const { a, b, h } = params;
      if (a <= 0 || b <= 0 || h <= 0) return { valid: false, reason: 'Các kích thước phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h } = params;
      const hx = u.simplifyFrac(a, 2);
      const hy = u.simplifyFrac(b, 2);
      const hz = u.simplifyFrac(h, 2);
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const correct = '$H' + fmt3(hx.latex, hy.latex, hz.latex) + '$';
      const distractors = [
        '$H' + u.formatCoord3D(a, b, 0) + '$',
        '$H' + fmt3('0', hy.latex, '0') + '$',
        '$H' + fmt3('0', '0', hz.latex) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$H' + fmt3(u.simplifyFrac(a + k, 2).latex, hy.latex, hz.latex) + '$'
      );
      return {
        stem:
          'Cho hình chóp $S.CDEF$ có đáy là hình chữ nhật, $SC \\perp (CDEF)$, $CD = ' +
          a +
          ',\\; CF = ' +
          b +
          '$ và $SC = ' +
          h +
          '$. Chọn hệ trục $Oxyz$ sao cho $O \\equiv C$, $D$ thuộc tia $Ox$, $F$ thuộc tia $Oy$ và $S$ thuộc tia $Oz$. Tọa độ trung điểm $H$ của đoạn thẳng $SE$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $C(0;0;0),\\; E(' + a + ';' + b + ';0),\\; S(0;0;' + h + ')$.',
          'Trung điểm $H$ của $SE$ là $H' + fmt3(hx.latex, hy.latex, hz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều dài <= 0', params: { a: 0, b: 3, h: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 a=9, b=3, h=7', params: { a: 9, b: 3, h: 7 }, expectedValid: true },
    ],
  },

  // Dạng 28 (Q28): Chóp đáy chữ nhật, trọng tâm SMQ
  t12_b8_d28_pyramid_rect_centroid_mc: {
    id: 't12_b8_d28_pyramid_rect_centroid_mc',
    name: 'Tọa độ trọng tâm tam giác SMQ trong hình chóp S.MNPQ đáy chữ nhật',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Gắn hệ trục tọa độ cho hình chóp',
    description: 'Hình chóp S.MNPQ đáy chữ nhật, SM ⊥ (MNPQ), MN = a, MQ = b, SM = h. Tìm trọng tâm G của tam giác SMQ.',
    conditionSummary: 'a, b, h > 0 và a ≠ b',
    paramSpecs: [
      { name: 'a', label: 'MN = a', min: 2, max: 12 },
      { name: 'b', label: 'MQ = b', min: 2, max: 12 },
      { name: 'h', label: 'SM = h', min: 2, max: 12 },
    ],
    validateCode: `
      const { a, b, h } = params;
      if (a <= 0 || b <= 0 || h <= 0) return { valid: false, reason: 'Các kích thước phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h } = params;
      const gy = u.simplifyFrac(b, 3);
      const gz = u.simplifyFrac(h, 3);
      const fmt3 = (x, y, z) => '(' + x + ';\\, ' + y + ';\\, ' + z + ')';
      const correct = '$G' + fmt3('0', gy.latex, gz.latex) + '$';
      const distractors = [
        '$G' + fmt3(gy.latex, gz.latex, '0') + '$',
        '$G' + fmt3('' + a, '' + b, gz.latex) + '$',
        '$G' + fmt3('0', u.simplifyFrac(a, 3).latex, gy.latex) + '$',
        '$G' + fmt3('0', u.simplifyFrac(b, 2).latex, u.simplifyFrac(h, 2).latex) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$G' + fmt3('0', u.simplifyFrac(b + k, 3).latex, gz.latex) + '$'
      );
      return {
        stem:
          'Cho hình chóp $S.MNPQ$ có đáy là hình chữ nhật, $SM \\perp (MNPQ)$, $MN = ' +
          a +
          ',\\; MQ = ' +
          b +
          '$ và $SM = ' +
          h +
          '$. Chọn hệ trục $Oxyz$ sao cho $O \\equiv M$, $N$ thuộc tia $Ox$, $Q$ thuộc tia $Oy$ và $S$ thuộc tia $Oz$. Tọa độ trọng tâm $G$ của tam giác $SMQ$ là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $M(0;0;0),\\; Q(0;' + b + ';0),\\; S(0;0;' + h + ')$.',
          'Trọng tâm $G$ của $\\triangle SMQ$ là $G' + fmt3('0', gy.latex, gz.latex) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh âm', params: { a: 4, b: -8, h: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 a=4, b=8, h=6', params: { a: 4, b: 8, h: 6 }, expectedValid: true },
    ],
  },

  // Dạng 29 (Q29): Chóp đáy chữ nhật, cosin góc giữa vectơ SG và EH
  t12_b8_d29_pyramid_rect_cos_angle_mc: {
    id: 't12_b8_d29_pyramid_rect_cos_angle_mc',
    name: 'Tính cosin góc giữa vectơ SG và EH trong hình chóp S.EFGH',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Gắn hệ trục tọa độ cho hình chóp',
    description: 'Hình chóp S.EFGH đáy chữ nhật, SE ⊥ (EFGH), EF = a, EH = b, SE = h. Tính cos(SG, EH).',
    conditionSummary: 'a, b, h > 0',
    paramSpecs: [
      { name: 'a', label: 'EF = a', min: 2, max: 10 },
      { name: 'b', label: 'EH = b', min: 2, max: 10 },
      { name: 'h', label: 'SE = h', min: 2, max: 10 },
    ],
    validateCode: `
      const { a, b, h } = params;
      if (a <= 0 || b <= 0 || h <= 0) return { valid: false, reason: 'Các kích thước phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, h } = params;
      const sumSq = a * a + b * b + h * h;
      const factorSq = (n) => {
        let k = 1, r = n;
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
          if (n % (i * i) === 0) { k = i; r = n / (i * i); break; }
        }
        return { k, r, tex: r === 1 ? '' + k : (k === 1 ? '' : k) + '\\sqrt{' + r + '}' };
      };
      const cosRes = (num, s) => {
        const { k, r } = factorSq(s);
        if (r === 1) return u.simplifyFrac(num, k).latex;
        const fr = u.simplifyFrac(num, k * r);
        const top = (fr.num === 1 ? '' : fr.num) + '\\sqrt{' + r + '}';
        return fr.den === 1 ? top : '\\frac{' + top + '}{' + fr.den + '}';
      };
      const ansTex = cosRes(b, sumSq);
      const correct = '$' + ansTex + '$';
      const pSq = factorSq(sumSq);
      const sqR = pSq.r === 1 ? 3 : pSq.r;
      const distractors = [
        '$1$',
        '$0$',
        '$\\frac{' + (b * 3) + '\\sqrt{' + (sqR * 3) + '}}{' + sumSq + '}$',
        '$' + cosRes(a, sumSq) + '$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$\\frac{' + (b + k) + '\\sqrt{' + sqR + '}}{' + (sumSq + k) + '}$'
      );
      return {
        stem:
          'Cho hình chóp $S.EFGH$ có đáy là hình chữ nhật, $SE \\perp (EFGH)$, $EF = ' +
          a +
          ',\\; EH = ' +
          b +
          '$ và $SE = ' +
          h +
          '$. Chọn hệ trục $Oxyz$ sao cho $O \\equiv E$, $F$ thuộc tia $Ox$, $H$ thuộc tia $Oy$ và $S$ thuộc tia $Oz$. Tính cosin của góc giữa hai vectơ $\\overrightarrow{SG}$ và $\\overrightarrow{EH}$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $E(0;0;0),\\; H(0;' + b + ';0),\\; G(' + a + ';' + b + ';0),\\; S(0;0;' + h + ')$.',
          'Suy ra $\\overrightarrow{SG} = (' + a + ';\\, ' + b + ';\\, -' + h + ')$ và $\\overrightarrow{EH} = (0;\\, ' + b + ';\\, 0)$.',
          'Vậy $\\cos(\\overrightarrow{SG},\\overrightarrow{EH}) = \\dfrac{' + b * b + '}{' + factorSq(sumSq).tex + '\\cdot ' + b + '} = ' + ansTex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao = 0', params: { a: 5, b: 3, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 a=5, b=3, h=2', params: { a: 5, b: 3, h: 2 }, expectedValid: true },
    ],
  },
};
