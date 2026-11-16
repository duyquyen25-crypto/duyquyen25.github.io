import { MathTemplate } from '../types/math';

const SPHERE_MC_HELPERS = String.raw`
  const fmtSqTerm = (v, c) => (c === 0 ? v + '^{2}' : '\\left(' + u.formatShift(v, -c) + '\\right)^{2}');
  const fmtSphereStd = (a, b, c, rhs) =>
    fmtSqTerm('x', a) + ' + ' + fmtSqTerm('y', b) + ' + ' + fmtSqTerm('z', c) + ' = ' + rhs;
  const fmtSphereGen = (A, B, C, D) => {
    const terms = [
      'x^2 + y^2 + z^2',
      u.formatTerm(A, 'x', false),
      u.formatTerm(B, 'y', false),
      u.formatTerm(C, 'z', false),
      u.formatTerm(D, '', false),
    ].filter(Boolean);
    return terms.join('') + ' = 0';
  };
  const fmtSqrtInt = (n) => {
    if (n <= 0) return '0';
    let sq = 1;
    let rem = n;
    for (let k = 2; k * k <= rem; k++) {
      while (rem % (k * k) === 0) {
        sq *= k;
        rem /= k * k;
      }
    }
    if (rem === 1) return String(sq);
    return sq === 1 ? '\\sqrt{' + rem + '}' : sq + '\\sqrt{' + rem + '}';
  };
`;

export const G12_B17_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tìm tâm mặt cầu từ phương trình chính tắc
  t12_b17_d01_center_std_mc: {
    id: 't12_b17_d01_center_std_mc',
    name: 'Tìm tọa độ tâm mặt cầu từ phương trình chính tắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tâm và bán kính mặt cầu',
    description:
      'Cho mặt cầu (S): (x - a)^2 + (y - b)^2 + (z - c)^2 = R^2. Xác định tọa độ tâm I(a; b; c).',
    conditionSummary: 'a, b, c ≠ 0 và R > 0 để các phương án đổi dấu phân biệt hoàn toàn',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm a', min: -12, max: 12, allowZero: false },
      { name: 'b', label: 'Tung độ tâm b', min: -12, max: 12, allowZero: false },
      { name: 'c', label: 'Cao độ tâm c', min: -12, max: 12, allowZero: false },
      { name: 'R', label: 'Bán kính R', min: 2, max: 15 },
    ],
    validateCode: `
      const { a, b, c, R } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Cần a, b, c khác 0 để các đáp án nhiễu đổi dấu không trùng nhau' };
      if (R <= 0) return { valid: false, reason: 'Bán kính R phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, R } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const eq = fmtSphereStd(a, b, c, R * R);
      const correct = '$I' + u.formatCoord3D(a, b, c) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$I' + u.formatCoord3D(-a, -b, c) + '$',
          '$I' + u.formatCoord3D(a, -b, c) + '$',
          '$I' + u.formatCoord3D(-a, -b, -c) + '$',
          '$I' + u.formatCoord3D(-a, b, -c) + '$',
        ],
        rng,
        (k) => '$I' + u.formatCoord3D(a + k, -b, c) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt cầu $(S): ' + eq + '$. Tọa độ tâm $I$ của mặt cầu $(S)$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mặt cầu $(S)$ có dạng $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ với $a = ' + a + ',\\, b = ' + b + ',\\, c = ' + c + '$.',
          'Vậy tọa độ tâm của mặt cầu $(S)$ là $I' + u.formatCoord3D(a, b, c) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R = 0 (suy biến)', params: { a: 10, b: -3, c: 7, R: 0 }, expectedValid: false },
      { label: 'Biên a = 0', params: { a: 0, b: -3, c: 7, R: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1', params: { a: 10, b: -3, c: 7, R: 8 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Tìm bán kính mặt cầu từ phương trình chính tắc
  t12_b17_d02_radius_std_mc: {
    id: 't12_b17_d02_radius_std_mc',
    name: 'Tìm bán kính mặt cầu từ phương trình chính tắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tâm và bán kính mặt cầu',
    description:
      'Cho mặt cầu (S): (x - a)^2 + (y - b)^2 + (z - c)^2 = R^2 với R nguyên dương. Xác định bán kính R.',
    conditionSummary: 'Bán kính R ≥ 4 và tránh R là số chính phương nếu muốn phân biệt R với √R rõ ràng',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm a', min: -10, max: 10 },
      { name: 'b', label: 'Tung độ tâm b', min: -10, max: 10 },
      { name: 'c', label: 'Cao độ tâm c', min: -10, max: 10 },
      { name: 'R', label: 'Bán kính R', min: 4, max: 35 },
    ],
    validateCode: `
      const { R } = params;
      if (R < 4) return { valid: false, reason: 'Cần R >= 4 để R, R^2, 2R, sqrt(R) tách biệt rõ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, R } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const rSq = R * R;
      const eq = fmtSphereStd(a, b, c, rSq);
      const correct = '$R = ' + R + '$';
      const sqrtR = fmtSqrtInt(R);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$R = ' + sqrtR + '$',
          '$R = ' + rSq + '$',
          '$R = ' + 2 * R + '$',
        ],
        rng,
        (k) => '$R = ' + (R + k + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt cầu $(S): ' + eq + '$. Bán kính của mặt cầu $(S)$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ phương trình mặt cầu $(S)$ ta có $R^2 = ' + rSq + '$.',
          'Suy ra bán kính của mặt cầu là $R = \\sqrt{' + rSq + '} = ' + R + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R = 1 (< 4)', params: { a: 3, b: -10, c: 9, R: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (R = 29)', params: { a: 3, b: -10, c: 9, R: 29 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Tìm tọa độ tâm mặt cầu từ phương trình khai triển
  t12_b17_d03_center_gen_mc: {
    id: 't12_b17_d03_center_gen_mc',
    name: 'Tìm tọa độ tâm mặt cầu từ phương trình khai triển',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tâm và bán kính mặt cầu',
    description:
      'Cho mặt cầu x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 với a^2 + b^2 + c^2 - d > 0. Tìm tọa độ tâm I.',
    conditionSummary: 'a, b, c ≠ 0 và rSq = a^2 + b^2 + c^2 - d > 0',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm a', min: -9, max: 9, allowZero: false },
      { name: 'b', label: 'Tung độ tâm b', min: -9, max: 9, allowZero: false },
      { name: 'c', label: 'Cao độ tâm c', min: -9, max: 9, allowZero: false },
      { name: 'rSq', label: 'Giá trị R^2', min: 2, max: 30 },
    ],
    validateCode: `
      const { a, b, c, rSq } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Cần a, b, c khác 0' };
      if (rSq <= 0) return { valid: false, reason: 'R^2 phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, rSq } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const d = a * a + b * b + c * c - rSq;
      const eq = fmtSphereGen(-2 * a, -2 * b, -2 * c, d);
      const correct = '$I' + u.formatCoord3D(a, b, c) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$I' + u.formatCoord3D(a, -b, c) + '$',
          '$I' + u.formatCoord3D(-a, -b, c) + '$',
          '$I' + u.formatCoord3D(-a, -b, -c) + '$',
          '$I' + u.formatCoord3D(-2 * a, -2 * b, -2 * c) + '$',
        ],
        rng,
        (k) => '$I' + u.formatCoord3D(a + k, b, -c) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt cầu $(S): ' + eq + '$. Tọa độ tâm $I$ của mặt cầu $(S)$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phương trình mặt cầu có dạng $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với $-2a = ' + (-2 * a) + ',\\; -2b = ' + (-2 * b) + ',\\; -2c = ' + (-2 * c) + ',\\; d = ' + d + '$.',
          'Kiểm tra $a^2 + b^2 + c^2 - d = ' + rSq + ' > 0$. Vậy tọa độ tâm mặt cầu $(S)$ là $I' + u.formatCoord3D(a, b, c) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R^2 = 0', params: { a: -3, b: 1, c: 7, rSq: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3', params: { a: -3, b: 1, c: 7, rSq: 4 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Tính bán kính mặt cầu từ phương trình khai triển
  t12_b17_d04_radius_gen_mc: {
    id: 't12_b17_d04_radius_gen_mc',
    name: 'Tính bán kính mặt cầu từ phương trình khai triển',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tâm và bán kính mặt cầu',
    description:
      'Cho mặt cầu x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 với R^2 = a^2 + b^2 + c^2 - d > 0. Tính bán kính R.',
    conditionSummary: 'a^2 + b^2 + c^2 > 0, rSq > 0 và d ≠ 0 để các đáp án nhiễu phân biệt',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm a', min: -8, max: 8 },
      { name: 'b', label: 'Tung độ tâm b', min: -8, max: 8 },
      { name: 'c', label: 'Cao độ tâm c', min: -8, max: 8 },
      { name: 'rSq', label: 'Giá trị R^2', min: 2, max: 40 },
    ],
    validateCode: `
      const { a, b, c, rSq } = params;
      if (a === 0 && b === 0 && c === 0) return { valid: false, reason: 'Tâm không nên trùng gốc O' };
      if (rSq <= 1) return { valid: false, reason: 'Cần R^2 >= 2' };
      const sumSq = a * a + b * b + c * c;
      if (sumSq === rSq) return { valid: false, reason: 'd = 0 làm sqrt(a^2+b^2+c^2) trùng với R' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, rSq } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const sumSq = a * a + b * b + c * c;
      const d = sumSq - rSq;
      const eq = fmtSphereGen(-2 * a, -2 * b, -2 * c, d);
      const rLatex = fmtSqrtInt(rSq);
      const correct = '$R = ' + rLatex + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$R = ' + rSq + '$',
          '$R = ' + fmtSqrtInt(sumSq) + '$',
          '$R = ' + fmtSqrtInt(rSq + 4) + '$',
          '$R = ' + fmtSqrtInt(Math.abs(sumSq + d) || rSq + 6) + '$',
        ],
        rng,
        (k) => '$R = ' + fmtSqrtInt(rSq + 2 * k + 3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho mặt cầu $(S): ' + eq + '$. Tính bán kính mặt cầu $(S)$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(a, b, c) + '$ và hệ số tự do $d = ' + d + '$.',
          'Bán kính mặt cầu $(S)$ là $R = \\sqrt{(' + a + ')^2 + (' + b + ')^2 + (' + c + ')^2 - (' + d + ')} = \\sqrt{' + rSq + '} = ' + rLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tâm gốc O và d = -R^2', params: { a: 0, b: 0, c: 0, rSq: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { a: 6, b: 7, c: 1, rSq: 10 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Viết phương trình mặt cầu biết tâm I và bán kính R = sqrt(k)
  t12_b17_d05_eq_center_sqrt_radius_mc: {
    id: 't12_b17_d05_eq_center_sqrt_radius_mc',
    name: 'Viết phương trình mặt cầu biết tâm và bán kính dạng căn thức',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Viết phương trình mặt cầu',
    description:
      'Viết phương trình chính tắc mặt cầu (S) có tâm I(a; b; c) và bán kính R = sqrt(k).',
    conditionSummary: 'a, b, c khác 0 và k không phải số chính phương (k >= 5)',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm a', min: -10, max: 10, allowZero: false },
      { name: 'b', label: 'Tung độ tâm b', min: -10, max: 10, allowZero: false },
      { name: 'c', label: 'Cao độ tâm c', min: -10, max: 10, allowZero: false },
      { name: 'k', label: 'Số dưới căn k (R = √k)', min: 5, max: 85 },
    ],
    validateCode: `
      const { a, b, c, k } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Cần a, b, c khác 0 để tránh phương án đổi dấu trùng nhau' };
      if (k < 5) return { valid: false, reason: 'Cần k >= 5' };
      const s = Math.round(Math.sqrt(k));
      if (s * s === k) return { valid: false, reason: 'Chọn k không chính phương để bán kính có dạng căn thức' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, k } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const rLatex = fmtSqrtInt(k);
      const correctEq = fmtSphereStd(a, b, c, k);
      const correct = '$' + correctEq + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + fmtSphereStd(a, b, c, 4 * k) + '$',
          '$' + fmtSphereStd(-a, -b, -c, rLatex) + '$',
          '$' + fmtSphereStd(-a, -b, -c, k) + '$',
          '$' + fmtSphereStd(a, b, c, rLatex) + '$',
        ],
        rng,
        (step) => '$' + fmtSphereStd(a, b, c, k + step * 3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, mặt cầu $(S)$ tâm $I' + u.formatCoord3D(a, b, c) + '$ và bán kính $R = ' + rLatex + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mặt cầu tâm $I' + u.formatCoord3D(a, b, c) + '$ có bán kính $R = ' + rLatex + ' \\Rightarrow R^2 = ' + k + '$.',
          'Phương trình mặt cầu $(S)$ là: $' + correctEq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k là số chính phương (k = 9)', params: { a: -2, b: 10, c: 8, k: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (k = 66)', params: { a: -2, b: 10, c: 8, k: 66 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Viết phương trình mặt cầu biết tâm và đường kính d = 2R
  t12_b17_d06_eq_center_diameter_mc: {
    id: 't12_b17_d06_eq_center_diameter_mc',
    name: 'Viết phương trình mặt cầu biết tâm và đường kính',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Viết phương trình mặt cầu',
    description:
      'Viết phương trình chính tắc mặt cầu (S) biết tọa độ tâm I(a; b; c) và đường kính d = 2R.',
    conditionSummary: 'R >= 3 và (a, b, c) không đồng thời bằng 0',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm a', min: -9, max: 9 },
      { name: 'b', label: 'Tung độ tâm b', min: -9, max: 9 },
      { name: 'c', label: 'Cao độ tâm c', min: -9, max: 9 },
      { name: 'R', label: 'Bán kính R (đường kính 2R)', min: 3, max: 18 },
    ],
    validateCode: `
      const { a, b, c, R } = params;
      if (a === 0 && b === 0 && c === 0) return { valid: false, reason: 'Cần tâm I khác O(0;0;0)' };
      if (R < 3) return { valid: false, reason: 'Bán kính R phải >= 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, R } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const diam = 2 * R;
      const rSq = R * R;
      const dSq = diam * diam;
      const correctEq = fmtSphereStd(a, b, c, rSq);
      const correct = '$' + correctEq + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + fmtSphereStd(-a, -b, -c, rSq) + '$',
          '$' + fmtSphereStd(a, b, c, dSq) + '$',
          '$' + fmtSphereStd(-a, -b, -c, R) + '$',
          '$' + fmtSphereStd(a, b, c, R) + '$',
        ],
        rng,
        (step) => '$' + fmtSphereStd(a, b, c, rSq + step * 5) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, mặt cầu $(S)$ tâm $I' + u.formatCoord3D(a, b, c) + '$ và đường kính bằng $' + diam + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(a, b, c) + '$ và bán kính $R = \\dfrac{' + diam + '}{2} = ' + R + '$.',
          'Phương trình mặt cầu: $' + correctEq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tâm O(0;0;0)', params: { a: 0, b: 0, c: 0, R: 13 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6', params: { a: 5, b: 7, c: 7, R: 13 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Viết phương trình mặt cầu nhận đoạn PQ làm đường kính
  t12_b17_d07_eq_diameter_pq_mc: {
    id: 't12_b17_d07_eq_diameter_pq_mc',
    name: 'Viết phương trình mặt cầu có đường kính PQ cho trước',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Viết phương trình mặt cầu',
    description:
      'Cho hai điểm P, Q. Tìm tâm I (trung điểm PQ), bán kính R = PQ/2 và viết phương trình mặt cầu đường kính PQ.',
    conditionSummary: 'Tâm I khác gốc tọa độ và khoảng cách nửa PQ thỏa dx^2 + dy^2 + dz^2 >= 3',
    paramSpecs: [
      { name: 'a', label: 'Tâm I_x', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Tâm I_y', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Tâm I_z', min: -6, max: 6, allowZero: false },
      { name: 'dx', label: 'Nửa hiệu x_Q - x_I', min: -5, max: 5 },
      { name: 'dy', label: 'Nửa hiệu y_Q - y_I', min: -8, max: 8 },
      { name: 'dz', label: 'Nửa hiệu z_Q - z_I', min: -5, max: 5 },
    ],
    validateCode: `
      const { a, b, c, dx, dy, dz } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Cần tọa độ tâm I khác 0 để đáp án đổi dấu phân biệt' };
      const rSq = dx * dx + dy * dy + dz * dz;
      if (rSq < 3) return { valid: false, reason: 'P và Q quá gần hoặc trùng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, dx, dy, dz } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const xP = a - dx, yP = b - dy, zP = c - dz;
      const xQ = a + dx, yQ = b + dy, zQ = c + dz;
      const rSq = dx * dx + dy * dy + dz * dz;
      const pqSq = 4 * rSq;
      const rLatex = fmtSqrtInt(rSq);
      const pqLatex = fmtSqrtInt(pqSq);
      const correctEq = fmtSphereStd(a, b, c, rSq);
      const correct = '$' + correctEq + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + fmtSphereStd(-a, -b, -c, rLatex) + '$',
          '$' + fmtSphereStd(-a, -b, -c, rSq) + '$',
          '$' + fmtSphereStd(a, b, c, pqSq) + '$',
          '$' + fmtSphereStd(a, b, c, rLatex) + '$',
        ],
        rng,
        (step) => '$' + fmtSphereStd(a, b, c, rSq + step * 3) + '$'
      );
      return {
        stem:
          'Trong không gian $Oxyz$, cho hai điểm $P' +
          u.formatCoord3D(xP, yP, zP) +
          '$, $Q' +
          u.formatCoord3D(xQ, yQ, zQ) +
          '$. Mặt cầu $(S)$ có đường kính $PQ$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(a, b, c) + '$ là trung điểm của đoạn thẳng $PQ$.',
          'Độ dài $PQ = \\sqrt{(' + xQ + ' - (' + xP + '))^2 + (' + yQ + ' - (' + yP + '))^2 + (' + zQ + ' - (' + zP + '))^2} = ' + pqLatex + '$.',
          'Mặt cầu $(S)$ có bán kính $R = \\dfrac{PQ}{2} = ' + rLatex + ' \\Rightarrow R^2 = ' + rSq + '$.',
          'Phương trình mặt cầu: $' + correctEq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P trùng Q', params: { a: -4, b: -5, c: 3, dx: 0, dy: 0, dz: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7', params: { a: -4, b: -5, c: 3, dx: 3, dy: -8, dz: -1 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Viết phương trình mặt cầu có tâm B và đi qua điểm K
  t12_b17_d08_eq_center_pass_point_mc: {
    id: 't12_b17_d08_eq_center_pass_point_mc',
    name: 'Viết phương trình mặt cầu biết tâm và một điểm đi qua',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Viết phương trình mặt cầu',
    description:
      'Viết phương trình mặt cầu (S) có tâm B(xB; yB; zB) và đi qua điểm K(xK; yK; zK).',
    conditionSummary: 'B ≠ K, B ≠ -B, B ≠ -K để 4 phương án trắc nghiệm phân biệt hoàn toàn',
    paramSpecs: [
      { name: 'a', label: 'Tâm B_x', min: -8, max: 8, allowZero: false },
      { name: 'b', label: 'Tâm B_y', min: -8, max: 8, allowZero: false },
      { name: 'c', label: 'Tâm B_z', min: -8, max: 8, allowZero: false },
      { name: 'dx', label: 'x_K - x_B', min: -4, max: 4 },
      { name: 'dy', label: 'y_K - y_B', min: -4, max: 4 },
      { name: 'dz', label: 'z_K - z_B', min: -4, max: 4 },
    ],
    validateCode: `
      const { a, b, c, dx, dy, dz } = params;
      if (a === 0 || b === 0 || c === 0) return { valid: false, reason: 'Cần tọa độ tâm B khác 0' };
      const rSq = dx * dx + dy * dy + dz * dz;
      if (rSq < 4) return { valid: false, reason: 'Cần BK^2 >= 4' };
      const xK = a + dx, yK = b + dy, zK = c + dz;
      if (xK === -a && yK === -b && zK === -c) return { valid: false, reason: 'Tránh K = -B làm trùng phương án nhiễu' };
      if (xK === a && yK === b && zK === c) return { valid: false, reason: 'K trùng B' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, dx, dy, dz } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const xK = a + dx, yK = b + dy, zK = c + dz;
      const rSq = dx * dx + dy * dy + dz * dz;
      const rLatex = fmtSqrtInt(rSq);
      const correctEq = fmtSphereStd(a, b, c, rSq);
      const correct = '$' + correctEq + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + fmtSphereStd(xK, yK, zK, rSq) + '$',
          '$' + fmtSphereStd(-a, -b, -c, rSq) + '$',
          '$' + fmtSphereStd(-xK, -yK, -zK, rSq) + '$',
          '$' + fmtSphereStd(a, b, c, rLatex) + '$',
        ],
        rng,
        (step) => '$' + fmtSphereStd(a, b, c, rSq + step * 3) + '$'
      );
      return {
        stem:
          'Trong hệ trục $Oxyz$, phương trình mặt cầu $(S)$ có tâm $B' +
          u.formatCoord3D(a, b, c) +
          '$ và đi qua điểm $K' +
          u.formatCoord3D(xK, yK, zK) +
          '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mặt cầu $(S)$ có bán kính là $R = BK = \\sqrt{(' + xK + ' - (' + a + '))^2 + (' + yK + ' - (' + b + '))^2 + (' + zK + ' - (' + c + '))^2} = ' + rLatex + ' \\Rightarrow R^2 = ' + rSq + '$.',
          'Mặt cầu $(S)$ tâm $B' + u.formatCoord3D(a, b, c) + '$ có phương trình là: $' + correctEq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên K trùng B', params: { a: -2, b: -7, c: -5, dx: 0, dy: 0, dz: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8', params: { a: -2, b: -7, c: -5, dx: -2, dy: -2, dz: 0 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Nhận biết điểm thuộc mặt cầu (S)
  t12_b17_d09_point_on_sphere_mc: {
    id: 't12_b17_d09_point_on_sphere_mc',
    name: 'Nhận biết điểm thuộc mặt cầu cho trước',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối của điểm và mặt cầu',
    description:
      'Cho mặt cầu (S) dạng chính tắc. Kiểm tra tọa độ điểm nằm trên mặt cầu bằng phép thế tọa độ.',
    conditionSummary: 'dx^2 + dy^2 + dz^2 > 0 và các điểm nhiễu không vô tình nằm trên mặt cầu',
    paramSpecs: [
      { name: 'a', label: 'Tâm I_x', min: -5, max: 5 },
      { name: 'b', label: 'Tâm I_y', min: -5, max: 5 },
      { name: 'c', label: 'Tâm I_z', min: -5, max: 5 },
      { name: 'dx', label: 'x_M - a', min: 1, max: 8 },
      { name: 'dy', label: 'y_M - b', min: 1, max: 8 },
      { name: 'dz', label: 'z_M - c', min: 1, max: 8 },
    ],
    validateCode: `
      const { dx, dy, dz } = params;
      if (dx * dx + dy * dy + dz * dz < 6) return { valid: false, reason: 'Bán kính R^2 phải >= 6' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, dx, dy, dz } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      const rSq = dx * dx + dy * dy + dz * dz;
      const eq = fmtSphereStd(a, b, c, rSq);
      const px = a + dx, py = b + dy, pz = c + dz;
      const correct = '$' + u.formatCoord3D(px, py, pz) + '$';
      const candidatePts = [
        [a - 1, b + 1, c],
        [a - 2, b + dy - 2, c + dz - 1],
        [-a, -b, -c],
        [px + 1, py, pz],
        [px, py - 1, pz + 1],
        [a + dx + 2, b + dy - 1, c],
      ];
      const distractors = [];
      for (const pt of candidatePts) {
        const dist2 = (pt[0] - a) * (pt[0] - a) + (pt[1] - b) * (pt[1] - b) + (pt[2] - c) * (pt[2] - c);
        if (dist2 !== rSq) {
          distractors.push('$' + u.formatCoord3D(pt[0], pt[1], pt[2]) + '$');
        }
      }
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (step) => '$' + u.formatCoord3D(px + step, py + step, pz) + '$'
      );
      return {
        stem: 'Trong hệ trục $Oxyz$, cho mặt cầu $(S)$ có phương trình $' + eq + '$. Mặt cầu $(S)$ đi qua điểm có tọa độ nào sau đây?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Thay tọa độ điểm $M' + u.formatCoord3D(px, py, pz) + '$ vào vế trái phương trình $(S)$: $(' + dx + ')^2 + (' + dy + ')^2 + (' + dz + ')^2 = ' + rSq + '$.',
          'Các điểm còn lại khi thay vào đều cho kết quả khác $' + rSq + '$. Vậy mặt cầu $(S)$ đi qua điểm ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dx = dy = dz = 1 (R^2 = 3 < 6)', params: { a: -1, b: -3, c: -1, dx: 1, dy: 1, dz: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9', params: { a: -1, b: -3, c: -1, dx: 5, dy: 8, dz: 7 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Số điểm chung của đường thẳng Δ và mặt cầu (S)
  t12_b17_d10_line_sphere_intersections_mc: {
    id: 't12_b17_d10_line_sphere_intersections_mc',
    name: 'Xác định số điểm chung của đường thẳng và mặt cầu',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Vị trí tương đối của đường thẳng và mặt cầu',
    description:
      'Cho đường thẳng Δ đi qua điểm A và mặt cầu (S) tâm I bán kính R. Tính khoảng cách d(I, Δ) để xác định số điểm chung (0, 1 hoặc 2).',
    conditionSummary: 'u ≠ 0, AI ⊥ u với AI ≠ 0, và chế độ mode ∈ {0, 1, 2} quyết định d > R, d = R hoặc d < R',
    paramSpecs: [
      { name: 'xI', label: 'Tâm I_x', min: -3, max: 3 },
      { name: 'yI', label: 'Tâm I_y', min: -3, max: 3 },
      { name: 'zI', label: 'Tâm I_z', min: -3, max: 3 },
      { name: 'u1', label: 'VTCP u_1', min: -3, max: 3, allowZero: false },
      { name: 'u2', label: 'VTCP u_2', min: -3, max: 3, allowZero: false },
      { name: 'u3', label: 'VTCP u_3', min: 1, max: 4 },
      { name: 'k', label: 'Tham số trực giao k', min: -3, max: 3, allowZero: false },
      { name: 'mode', label: 'Số điểm chung (0, 1, 2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { u1, u2, u3, k, mode } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || k === 0) return { valid: false, reason: 'Các hệ số khác 0' };
      if (![0, 1, 2].includes(mode)) return { valid: false, reason: 'mode phải thuộc {0, 1, 2}' };
      const dSq = k * k * (u1 * u1 + u2 * u2);
      if (mode === 0 && dSq <= 3) return { valid: false, reason: 'Cần d^2 > 3 để tạo bán kính R < d nguyên dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xI, yI, zI, u1, u2, u3, k, mode } = params;
      ` + SPHERE_MC_HELPERS + String.raw`
      // Vector AI = (-k*u2, k*u1, 0) is strictly perpendicular to u = (u1, u2, u3)
      const aix = -k * u2, aiy = k * u1, aiz = 0;
      const xA = xI - aix, yA = yI - aiy, zA = zI - aiz;
      const dSq = aix * aix + aiy * aiy + aiz * aiz;
      const rSq = mode === 0 ? Math.max(2, dSq - 3) : mode === 1 ? dSq : dSq + 6;
      const D = xI * xI + yI * yI + zI * zI - rSq;
      const eqS = fmtSphereGen(-2 * xI, -2 * yI, -2 * zI, D);
      const lineEq =
        '\\dfrac{' + u.formatShift('x', -xA) + '}{' + u1 + '} = ' +
        '\\dfrac{' + u.formatShift('y', -yA) + '}{' + u2 + '} = ' +
        '\\dfrac{' + u.formatShift('z', -zA) + '}{' + u3 + '}';
      const rLatex = fmtSqrtInt(rSq);
      const dLatex = fmtSqrtInt(dSq);
      const correct = '$' + mode + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$0$', '$1$', '$2$', '$3$'],
        rng,
        (step) => '$' + (step + 3) + '$'
      );
      const relStr = mode === 0 ? '> R = ' + rLatex : mode === 1 ? '= R = ' + rLatex : '< R = ' + rLatex;
      const conclStr =
        mode === 0
          ? 'không có điểm chung nào với mặt cầu $(S)$.'
          : mode === 1
          ? 'tiếp xúc với mặt cầu $(S)$ (có $1$ điểm chung).'
          : 'cắt mặt cầu $(S)$ tại $2$ điểm phân biệt.';
      return {
        stem:
          'Trong không gian $Oxyz$, cho đường thẳng $\\Delta: ' +
          lineEq +
          '$ và mặt cầu $(S): ' +
          eqS +
          '$. Số điểm chung của $\\Delta$ và $(S)$ là:',
        options,
        correctIndex,
        answerSummary: String(mode),
        solutionSteps: [
          'Đường thẳng $\\Delta$ đi qua điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ và có vectơ chỉ phương $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$.',
          'Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(xI, yI, zI) + '$ và bán kính $R = ' + rLatex + '$.',
          'Ta có $\\overrightarrow{AI} = ' + u.formatCoord3D(aix, aiy, aiz) + '$ thỏa mãn $\\overrightarrow{AI} \\cdot \\vec{u} = (' + aix + ')\\cdot(' + u1 + ') + (' + aiy + ')\\cdot(' + u2 + ') + 0\\cdot(' + u3 + ') = 0 \\Rightarrow AI \\perp \\Delta$.',
          'Suy ra $d(I, \\Delta) = AI = ' + dLatex + ' ' + relStr + '$, nên đường thẳng $\\Delta$ ' + conclStr,
          'Vậy số điểm chung là $' + mode + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hệ số u1 = 0', params: { xI: 1, yI: -1, zI: -1, u1: 0, u2: -2, u3: 4, k: 1, mode: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (2 điểm chung)', params: { xI: 1, yI: -1, zI: -1, u1: 2, u2: -2, u3: 4, k: 1, mode: 2 }, expectedValid: true },
      { label: 'Biên tiếp xúc (1 điểm chung)', params: { xI: 1, yI: -1, zI: -1, u1: 2, u2: -2, u3: 4, k: 1, mode: 1 }, expectedValid: true },
    ],
  },
};
