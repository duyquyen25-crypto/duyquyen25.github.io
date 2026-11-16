import { MathTemplate } from '../types/math';

const FMT_HELPERS = String.raw`
  const fmtParamLine = (x0, y0, z0, u1, u2, u3) => {
    const lineVar = (vName, p0, vel) => {
      if (p0 === 0 && vel === 0) return vName + ' = 0';
      if (p0 === 0) return vName + ' = ' + u.formatTerm(vel, 't', true);
      return vName + ' = ' + p0 + u.formatTerm(vel, 't', false);
    };
    return '\\left\\{ \\begin{array}{l}' +
      lineVar('x', x0, u1) + ' \\\\ ' +
      lineVar('y', y0, u2) + ' \\\\ ' +
      lineVar('z', z0, u3) +
      '\\end{array} \\right.';
  };
  const fmtCanonLine = (x0, y0, z0, u1, u2, u3) =>
    '\\dfrac{' + u.formatShift('x', -x0) + '}{' + u1 + '} = ' +
    '\\dfrac{' + u.formatShift('y', -y0) + '}{' + u2 + '} = ' +
    '\\dfrac{' + u.formatShift('z', -z0) + '}{' + u3 + '}';
`;

export const G12_B15_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01: Nhận diện VTCP từ phương trình tham số
  t12_b15_d01_vtcp_parametric_mc: {
    id: 't12_b15_d01_vtcp_parametric_mc',
    name: 'Nhận diện vectơ chỉ phương của đường thẳng từ phương trình tham số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho đường thẳng Δ ở dạng tham số. Xác định một vectơ chỉ phương của Δ.',
    conditionSummary: 'u1, u2, u3 không đồng thời bằng 0; tránh trùng vectơ tọa độ điểm đi qua',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -8, max: 8 },
      { name: 'y0', label: 'y0', min: -8, max: 8 },
      { name: 'z0', label: 'z0', min: -8, max: 8 },
      { name: 'u1', label: 'u1', min: -7, max: 7, allowZero: false },
      { name: 'u2', label: 'u2', min: -7, max: 7, allowZero: false },
      { name: 'u3', label: 'u3', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3 } = params;
      if (u1 === 0 && u2 === 0 && u3 === 0) return { valid: false, reason: 'Vectơ chỉ phương không thể là vectơ-không' };
      const k1 = (u1 === x0 && u2 === y0 && u3 === z0);
      const k2 = (u1 === -x0 && u2 === -y0 && u3 === -z0);
      const k3 = (u1 === -u1 && u3 === -u3);
      if (k1 || k2 || k3) return { valid: false, reason: 'Tránh trùng vectơ gây nhiễu đáp án' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const eq = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const correctVec = u.formatCoord3D(u1, u2, u3);
      const correct = '$\\overrightarrow{u_2} = ' + correctVec + '$';
      const cand1 = '$\\overrightarrow{u_4} = ' + u.formatCoord3D(x0, y0, z0) + '$';
      const cand2 = '$\\overrightarrow{u_1} = ' + u.formatCoord3D(-x0, -y0, -z0) + '$';
      const cand3 = '$\\overrightarrow{u_3} = ' + u.formatCoord3D(-u1, u2, -u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$\\overrightarrow{v} = ' + u.formatCoord3D(u1 + k, u2 - k, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta: ' + eq + '$. Đường thẳng $\\Delta$ nhận vectơ nào sau đây làm vectơ chỉ phương?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ phương trình tham số của $\\Delta$, hệ số của tham số $t$ ở ba phương trình lần lượt là $' + u1 + ';\\,' + u2 + ';\\,' + u3 + '$.',
          'Vậy đường thẳng $\\Delta$ nhận vectơ $\\vec{u} = ' + correctVec + '$ làm vectơ chỉ phương.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên trùng điểm và VTCP', params: { x0: 1, y0: 2, z0: 3, u1: 1, u2: 2, u3: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1', params: { x0: -7, y0: 2, z0: 5, u1: -5, u2: 6, u3: -6 }, expectedValid: true },
    ],
  },

  // D02: Nhận diện VTCP từ phương trình chính tắc
  t12_b15_d02_vtcp_canonical_mc: {
    id: 't12_b15_d02_vtcp_canonical_mc',
    name: 'Nhận diện vectơ chỉ phương từ phương trình chính tắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho đường thẳng d ở dạng chính tắc. Xác định một vectơ chỉ phương của d.',
    conditionSummary: 'u1, u2, u3 ≠ 0; tránh trùng (x0, y0, z0) hoặc (-x0, -y0, -z0)',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -7, max: 7 },
      { name: 'y0', label: 'y0', min: -7, max: 7 },
      { name: 'z0', label: 'z0', min: -7, max: 7 },
      { name: 'u1', label: 'u1', min: -7, max: 7, allowZero: false },
      { name: 'u2', label: 'u2', min: -7, max: 7, allowZero: false },
      { name: 'u3', label: 'u3', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'Mẫu số chính tắc phải khác 0' };
      if ((u1 === x0 && u2 === y0 && u3 === z0) || (u1 === -x0 && u2 === -y0 && u3 === -z0)) {
        return { valid: false, reason: 'Tránh trùng vectơ gây nhiễu' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const eq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const correctVec = u.formatCoord3D(u1, u2, u3);
      const correct = '$\\overrightarrow{u_3} = ' + correctVec + '$';
      const cand1 = '$\\overrightarrow{u_4} = ' + u.formatCoord3D(x0, y0, z0) + '$';
      const cand2 = '$\\overrightarrow{u_1} = ' + u.formatCoord3D(-x0, -y0, -z0) + '$';
      const cand3 = '$\\overrightarrow{u_2} = ' + u.formatCoord3D(-u1, u2, -u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$\\overrightarrow{v} = ' + u.formatCoord3D(u1 + k, u2, u3 + k) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + eq + '$. Đường thẳng $d$ nhận vectơ nào sau đây làm vectơ chỉ phương?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ phương trình chính tắc của $d$, bộ ba số ở mẫu là $(' + u1 + ';\\,' + u2 + ';\\,' + u3 + ')$.',
          'Vậy đường thẳng $d$ nhận vectơ $\\vec{u} = ' + correctVec + '$ làm vectơ chỉ phương.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu bằng 0', params: { x0: 3, y0: 5, z0: -2, u1: 0, u2: 4, u3: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2', params: { x0: 3, y0: 5, z0: -2, u1: 2, u2: 4, u3: 5 }, expectedValid: true },
    ],
  },

  // D03: Tìm điểm đi qua của đường thẳng tham số
  t12_b15_d03_point_on_parametric_mc: {
    id: 't12_b15_d03_point_on_parametric_mc',
    name: 'Xác định điểm thuộc đường thẳng từ phương trình tham số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho đường thẳng d dạng tham số. Chọn điểm nằm trên đường thẳng d.',
    conditionSummary: 'Các điểm gây nhiễu không nằm trên đường thẳng d',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -8, max: 8 },
      { name: 'y0', label: 'y0', min: -8, max: 8 },
      { name: 'z0', label: 'z0', min: -8, max: 8 },
      { name: 'u1', label: 'u1', min: -8, max: 8, allowZero: false },
      { name: 'u2', label: 'u2', min: -8, max: 8, allowZero: false },
      { name: 'u3', label: 'u3', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 ≠ 0' };
      const onLine = (px, py, pz) => {
        const tx = (px - x0) * u2 === (py - y0) * u1;
        const ty = (py - y0) * u3 === (pz - z0) * u2;
        return tx && ty;
      };
      if (onLine(u1, u2, u3) || onLine(-x0, -y0, -z0) || onLine(x0 + u1, y0 - u2, z0 + u3)) {
        return { valid: false, reason: 'Điểm gây nhiễu vô tình thuộc đường thẳng' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const eq = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const correct = '$A = ' + u.formatCoord3D(x0, y0, z0) + '$';
      const cand1 = '$B = ' + u.formatCoord3D(u1, u2, u3) + '$';
      const cand2 = '$D = ' + u.formatCoord3D(-x0, -y0, -z0) + '$';
      const cand3 = '$C = ' + u.formatCoord3D(x0 + u1, y0 - u2, z0 + u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$M = ' + u.formatCoord3D(x0 + k, y0, z0 - k) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + eq + '$. Đường thẳng $d$ đi qua điểm nào trong các điểm sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ứng với $t = 0$, thay vào phương trình đường thẳng $d$ ta được $x = ' + x0 + ',\\, y = ' + y0 + ',\\, z = ' + z0 + '$.',
          'Vậy đường thẳng $d$ đi qua điểm $A = ' + u.formatCoord3D(x0, y0, z0) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên điểm (0;0;0) trên đường thẳng', params: { x0: 0, y0: 0, z0: 0, u1: 1, u2: 2, u3: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3', params: { x0: 6, y0: 4, z0: 4, u1: -8, u2: 7, u3: -6 }, expectedValid: true },
    ],
  },

  // D04: Tìm điểm đi qua của đường thẳng chính tắc (t ≠ 0)
  t12_b15_d04_point_on_canonical_mc: {
    id: 't12_b15_d04_point_on_canonical_mc',
    name: 'Xác định điểm thuộc đường thẳng từ phương trình chính tắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho đường thẳng d dạng chính tắc. Tìm điểm thuộc d ứng với tham số t0 ≠ 0.',
    conditionSummary: 'u1, u2, u3 ≠ 0; t0 ≠ 0; các điểm nhiễu không nằm trên d',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -8, max: 8 },
      { name: 'y0', label: 'y0', min: -8, max: 8 },
      { name: 'z0', label: 'z0', min: -8, max: 8 },
      { name: 'u1', label: 'u1', min: -5, max: 5, allowZero: false },
      { name: 'u2', label: 'u2', min: -5, max: 5, allowZero: false },
      { name: 'u3', label: 'u3', min: -5, max: 5, allowZero: false },
      { name: 't0', label: 'Tham số t0', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3, t0 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || t0 === 0) return { valid: false, reason: 'u1, u2, u3 và t0 phải khác 0' };
      const onLine = (px, py, pz) => (px - x0) * u2 === (py - y0) * u1 && (py - y0) * u3 === (pz - z0) * u2;
      if (onLine(u1, u2, u3) || onLine(-x0, -y0, -z0) || onLine(-x0, y0, -z0)) {
        return { valid: false, reason: 'Điểm nhiễu nằm trên d' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3, t0 } = params;
      ` + FMT_HELPERS + String.raw`
      const eq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const paramEq = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const cx = x0 + u1 * t0, cy = y0 + u2 * t0, cz = z0 + u3 * t0;
      const correct = '$C = ' + u.formatCoord3D(cx, cy, cz) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$D = ' + u.formatCoord3D(u1, u2, u3) + '$',
          '$B = ' + u.formatCoord3D(-x0, -y0, -z0) + '$',
          '$A = ' + u.formatCoord3D(-x0, y0, -z0) + '$',
        ],
        rng,
        (k) => '$M = ' + u.formatCoord3D(cx + k, cy - k, cz) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + eq + '$. Đường thẳng $d$ đi qua điểm nào trong các điểm sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $d$ có phương trình tham số là $' + paramEq + '$.',
          'Với $t = ' + t0 + '$, ta có $x = ' + cx + ',\\, y = ' + cy + ',\\, z = ' + cz + '$ nên $d$ đi qua $C = ' + u.formatCoord3D(cx, cy, cz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t0 = 0', params: { x0: -7, y0: 7, z0: 2, u1: -4, u2: -1, u3: 3, t0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { x0: -7, y0: 7, z0: 2, u1: -4, u2: -1, u3: 3, t0: -3 }, expectedValid: true },
    ],
  },

  // D05: Viết PT chính tắc qua điểm và có VTCP cho trước
  t12_b15_d05_canon_point_vec_mc: {
    id: 't12_b15_d05_canon_point_vec_mc',
    name: 'Viết phương trình chính tắc đường thẳng qua điểm và biết vectơ chỉ phương',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm N và vectơ chỉ phương u. Viết phương trình chính tắc của đường thẳng Δ.',
    conditionSummary: 'u1, u2, u3 ≠ 0; N không trùng O(0;0;0)',
    paramSpecs: [
      { name: 'x0', label: 'x_N', min: -8, max: 8 },
      { name: 'y0', label: 'y_N', min: -8, max: 8 },
      { name: 'z0', label: 'z_N', min: -8, max: 8 },
      { name: 'u1', label: 'u1', min: -9, max: 9, allowZero: false },
      { name: 'u2', label: 'u2', min: -9, max: 9, allowZero: false },
      { name: 'u3', label: 'u3', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 phải khác 0' };
      if (x0 === 0 && y0 === 0 && z0 === 0) return { valid: false, reason: 'N khác gốc O để tránh phân biệt dấu yếu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const correct = '$' + fmtCanonLine(x0, y0, z0, u1, u2, u3) + '$';
      const cand1 = '$' + fmtCanonLine(-x0, -y0, -z0, -u1, u2, -u3) + '$';
      const cand2 = '$' + fmtCanonLine(-x0, -y0, -z0, u1, u2, u3) + '$';
      const cand3 = '$' + fmtCanonLine(x0, y0, z0, u1, -u2, u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(x0 + k, y0, z0, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, đường thẳng $\\Delta$ đi qua điểm $N' + u.formatCoord3D(x0, y0, z0) + '$ và nhận vectơ $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm vectơ chỉ phương có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $\\Delta$ đi qua $N' + u.formatCoord3D(x0, y0, z0) + '$ và có vectơ chỉ phương $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ nên có phương trình chính tắc là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0', params: { x0: 8, y0: 0, z0: -5, u1: 0, u2: 5, u3: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5', params: { x0: 8, y0: 0, z0: -5, u1: 1, u2: 5, u3: 9 }, expectedValid: true },
    ],
  },

  // D06: Viết PT chính tắc qua điểm E và có VTCP là vector MK
  t12_b15_d06_canon_point_vec2pts_mc: {
    id: 't12_b15_d06_canon_point_vec2pts_mc',
    name: 'Viết phương trình chính tắc qua một điểm và nhận vectơ MK làm VTCP',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm E và hai điểm M, K. Viết phương trình chính tắc đường thẳng đi qua E nhận MK làm VTCP.',
    conditionSummary: 'Các tọa độ của MK đều khác 0; E khác MK',
    paramSpecs: [
      { name: 'xE', label: 'x_E', min: -6, max: 8 },
      { name: 'yE', label: 'y_E', min: -6, max: 8 },
      { name: 'zE', label: 'z_E', min: -6, max: 8 },
      { name: 'xM', label: 'x_M', min: -6, max: 6 },
      { name: 'yM', label: 'y_M', min: -6, max: 6 },
      { name: 'zM', label: 'z_M', min: -6, max: 6 },
      { name: 'u1', label: 'x_K - x_M', min: -8, max: 8, allowZero: false },
      { name: 'u2', label: 'y_K - y_M', min: -8, max: 8, allowZero: false },
      { name: 'u3', label: 'z_K - z_M', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { xE, yE, zE, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'Thành phần vectơ MK phải khác 0' };
      if (xE === 0 && yE === 0 && zE === 0) return { valid: false, reason: 'E khác gốc O' };
      if (xE === u1 && yE === u2 && zE === u3) return { valid: false, reason: 'Tránh E trùng tọa độ VTCP' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xE, yE, zE, xM, yM, zM, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const xK = xM + u1, yK = yM + u2, zK = zM + u3;
      const correct = '$' + fmtCanonLine(xE, yE, zE, u1, u2, u3) + '$';
      const cand1 = '$' + fmtCanonLine(u1, u2, u3, xE || 1, yE || 1, zE || 1) + '$';
      const cand2 = '$' + fmtCanonLine(-xE, -yE, -zE, u1, u2, u3) + '$';
      const cand3 = '$' + fmtCanonLine(xE, yE, zE, -u1, u2, u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(xE + k, yE, zE, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, đường thẳng $\\Delta$ đi qua điểm $E' + u.formatCoord3D(xE, yE, zE) + '$ và nhận vectơ $\\overrightarrow{MK}$ làm vectơ chỉ phương với $M' + u.formatCoord3D(xM, yM, zM) + '$ và $K' + u.formatCoord3D(xK, yK, zK) + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\overrightarrow{MK} = ' + u.formatCoord3D(u1, u2, u3) + '$.',
          'Đường thẳng $\\Delta$ đi qua $E' + u.formatCoord3D(xE, yE, zE) + '$ nhận $\\overrightarrow{MK}$ làm vectơ chỉ phương nên có phương trình là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u2 = 0', params: { xE: 8, yE: 2, zE: 2, xM: -6, yM: 5, zM: 1, u1: -8, u2: 0, u3: -5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6', params: { xE: 8, yE: 2, zE: 2, xM: -6, yM: 5, zM: 1, u1: -8, u2: 8, u3: -5 }, expectedValid: true },
    ],
  },

  // D07: Viết PT chính tắc qua điểm I và song song đường thẳng d1
  t12_b15_d07_canon_parallel_line_mc: {
    id: 't12_b15_d07_canon_parallel_line_mc',
    name: 'Viết phương trình chính tắc đường thẳng qua điểm và song song đường thẳng khác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm I và đường thẳng d1 có mẫu số tỉ lệ. Viết phương trình chính tắc đường thẳng Δ qua I và song song d1.',
    conditionSummary: 'I không nằm trên d1; (u1, u2, u3) nguyên tố cùng nhau và khác 0; |k| >= 2',
    paramSpecs: [
      { name: 'xI', label: 'x_I', min: -6, max: 6 },
      { name: 'yI', label: 'y_I', min: -6, max: 8 },
      { name: 'zI', label: 'z_I', min: -6, max: 6 },
      { name: 'x1', label: 'x_d1', min: -7, max: 7 },
      { name: 'y1', label: 'y_d1', min: -7, max: 7 },
      { name: 'u1', label: 'u1', min: -7, max: 7, allowZero: false },
      { name: 'u2', label: 'u2', min: -7, max: 7, allowZero: false },
      { name: 'u3', label: 'u3', min: -7, max: 7, allowZero: false },
      { name: 'k', label: 'Hệ số tỉ lệ k', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { xI, yI, zI, x1, y1, u1, u2, u3, k } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || Math.abs(k) < 2) return { valid: false, reason: 'u_i ≠ 0 và |k| >= 2' };
      if (u.gcd(u1, u.gcd(u2, u3)) !== 1) return { valid: false, reason: 'Vectơ rút gọn cần nguyên tố cùng nhau' };
      const z1 = -1;
      if ((xI - x1) * u2 === (yI - y1) * u1 && (yI - y1) * u3 === (zI - z1) * u2) {
        return { valid: false, reason: 'Điểm I thuộc đường thẳng d1' };
      }
      if (xI === 0 && yI === 0 && zI === 0) return { valid: false, reason: 'I khác O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xI, yI, zI, x1, y1, u1, u2, u3, k } = params;
      ` + FMT_HELPERS + String.raw`
      const z1 = -1;
      const v1 = k * u1, v2 = k * u2, v3 = k * u3;
      const d1Eq = fmtCanonLine(x1, y1, z1, v1, v2, v3);
      const correct = '$' + fmtCanonLine(xI, yI, zI, u1, u2, u3) + '$';
      const cand1 = '$' + fmtCanonLine(-u1, -u2, -u3, xI || 1, yI || 1, zI || 1) + '$';
      const cand2 = '$' + fmtCanonLine(-xI, -yI, -zI, u1, u2, u3) + '$';
      const cand3 = '$' + fmtCanonLine(xI, yI, zI, -u1, u2, u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (m) => '$' + fmtCanonLine(xI + m, yI, zI, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, đường thẳng $\\Delta$ đi qua điểm $I' + u.formatCoord3D(xI, yI, zI) + '$ và song song với đường thẳng $d_1: ' + d1Eq + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $d_1$ có vectơ chỉ phương là $\\overrightarrow{u_1} = ' + u.formatCoord3D(v1, v2, v3) + '$.',
          'Vì $\\Delta \\parallel d_1$ nên $\\Delta$ nhận $\\vec{u} = \\frac{1}{' + k + '}\\overrightarrow{u_1} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm vectơ chỉ phương.',
          'Phương trình chính tắc của $\\Delta$ đi qua $I' + u.formatCoord3D(xI, yI, zI) + '$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên |k| = 1', params: { xI: -4, yI: 8, zI: 1, x1: -5, y1: 7, u1: -7, u2: 4, u3: -2, k: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7', params: { xI: -4, yI: 8, zI: 1, x1: -5, y1: 7, u1: -7, u2: 4, u3: -2, k: -3 }, expectedValid: true },
    ],
  },

  // D08: Viết PT chính tắc qua điểm E và vuông góc với mặt phẳng (γ)
  t12_b15_d08_canon_perp_plane_mc: {
    id: 't12_b15_d08_canon_perp_plane_mc',
    name: 'Viết phương trình chính tắc đường thẳng qua điểm và vuông góc mặt phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm E và mặt phẳng (γ): Ax + By + Cz + D = 0. Viết phương trình chính tắc đường thẳng d qua E và vuông góc với (γ).',
    conditionSummary: 'A, B, C ≠ 0; gcd(A, B, C) = 1',
    paramSpecs: [
      { name: 'xE', label: 'x_E', min: -6, max: 7 },
      { name: 'yE', label: 'y_E', min: -6, max: 7 },
      { name: 'zE', label: 'z_E', min: -6, max: 7 },
      { name: 'A', label: 'A', min: -6, max: 6, allowZero: false },
      { name: 'B', label: 'B', min: -6, max: 6, allowZero: false },
      { name: 'C', label: 'C', min: -6, max: 6, allowZero: false },
      { name: 'D', label: 'D', min: -12, max: 12 },
    ],
    validateCode: `
      const { xE, yE, zE, A, B, C } = params;
      if (A === 0 || B === 0 || C === 0) return { valid: false, reason: 'A, B, C phải khác 0' };
      if (u.gcd(A, u.gcd(B, C)) !== 1) return { valid: false, reason: 'VTPT nên tối giản' };
      if ((xE === A && yE === B && zE === C) || (xE === 0 && yE === 0 && zE === 0)) {
        return { valid: false, reason: 'Tránh trùng vectơ gây nhiễu' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xE, yE, zE, A, B, C, D } = params;
      ` + FMT_HELPERS + String.raw`
      const planeEq = u.formatPlaneEq(A, B, C, D);
      const correct = '$' + fmtCanonLine(xE, yE, zE, A, B, C) + '$';
      const cand1 = '$' + fmtCanonLine(-xE, -yE, -zE, A, B, C) + '$';
      const cand2 = '$' + fmtCanonLine(A, B, C, xE || 1, yE || 1, zE || 1) + '$';
      const cand3 = '$' + fmtCanonLine(xE, yE, zE, A, -B, C) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(xE + k, yE, zE, A, B, C) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, đường thẳng $d$ đi qua điểm $E' + u.formatCoord3D(xE, yE, zE) + '$ và vuông góc với mặt phẳng $(\\gamma): ' + planeEq + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mặt phẳng $(\\gamma)$ có vectơ pháp tuyến là $\\vec{n} = ' + u.formatCoord3D(A, B, C) + '$.',
          'Vì $d \\perp (\\gamma)$ nên $d$ nhận $\\vec{u} = ' + u.formatCoord3D(A, B, C) + '$ làm vectơ chỉ phương.',
          'Phương trình chính tắc của $d$ qua $E' + u.formatCoord3D(xE, yE, zE) + '$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên C = 0', params: { xE: -3, yE: 2, zE: 7, A: -5, B: 2, C: 0, D: -10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8', params: { xE: -3, yE: 2, zE: 7, A: -5, B: 2, C: 4, D: -10 }, expectedValid: true },
    ],
  },

  // D09: Viết PT chính tắc đi qua hai điểm C và F
  t12_b15_d09_canon_2pts_mc: {
    id: 't12_b15_d09_canon_2pts_mc',
    name: 'Viết phương trình chính tắc đường thẳng đi qua hai điểm C và F',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho hai điểm C, F. Viết phương trình chính tắc đường thẳng CF.',
    conditionSummary: 'u1, u2, u3 ≠ 0; gcd(u1, u2, u3) = 1',
    paramSpecs: [
      { name: 'xC', label: 'x_C', min: -7, max: 7 },
      { name: 'yC', label: 'y_C', min: -7, max: 7 },
      { name: 'zC', label: 'z_C', min: -7, max: 7 },
      { name: 'u1', label: 'x_F - x_C', min: -6, max: 6, allowZero: false },
      { name: 'u2', label: 'y_F - y_C', min: -6, max: 6, allowZero: false },
      { name: 'u3', label: 'z_F - z_C', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { xC, yC, zC, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 ≠ 0' };
      if (u.gcd(u1, u.gcd(u2, u3)) !== 1) return { valid: false, reason: 'CF nên tối giản' };
      if (xC === 0 && yC === 0 && zC === 0) return { valid: false, reason: 'C khác O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xC, yC, zC, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const xF = xC + u1, yF = yC + u2, zF = zC + u3;
      const correct = '$' + fmtCanonLine(xC, yC, zC, u1, u2, u3) + '$';
      const cand1 = '$' + fmtCanonLine(-xC, -yC, -zC, u1, u2, u3) + '$';
      const cand2 = '$' + fmtCanonLine(xF, -yF, -zF, u1, u2, u3) + '$';
      const cand3 = '$' + fmtCanonLine(xC, yC, zC, u1, -u2, u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(xC + k, yC, zC, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, đường thẳng đi qua hai điểm $C' + u.formatCoord3D(xC, yC, zC) + '$ và $F' + u.formatCoord3D(xF, yF, zF) + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $CF$ đi qua $C' + u.formatCoord3D(xC, yC, zC) + '$ và nhận $\\overrightarrow{CF} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm vectơ chỉ phương.',
          'Phương trình chính tắc của $CF$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0', params: { xC: -5, yC: 3, zC: 4, u1: 0, u2: 3, u3: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9', params: { xC: -5, yC: 3, zC: 4, u1: -3, u2: 3, u3: 2 }, expectedValid: true },
    ],
  },

  // D10: Chuyển phương trình tham số sang chính tắc
  t12_b15_d10_param_to_canon_mc: {
    id: 't12_b15_d10_param_to_canon_mc',
    name: 'Chuyển phương trình đường thẳng từ dạng tham số sang dạng chính tắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho đường thẳng Δ dưới dạng tham số. Viết phương trình chính tắc tương ứng của Δ.',
    conditionSummary: 'u1, u2, u3 ≠ 0; tọa độ điểm và VTCP không trùng nhau',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -8, max: 8 },
      { name: 'y0', label: 'y0', min: -8, max: 8 },
      { name: 'z0', label: 'z0', min: -8, max: 8 },
      { name: 'u1', label: 'u1', min: -8, max: 8, allowZero: false },
      { name: 'u2', label: 'u2', min: -8, max: 8, allowZero: false },
      { name: 'u3', label: 'u3', min: -8, max: 8, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 ≠ 0' };
      if (x0 === 0 || y0 === 0 || z0 === 0) return { valid: false, reason: 'x0, y0, z0 ≠ 0 để mẫu phân biệt rõ' };
      if (x0 === u1 && y0 === u2 && z0 === u3) return { valid: false, reason: 'Tránh trùng tọa độ điểm và VTCP' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const paramEq = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const correct = '$' + fmtCanonLine(x0, y0, z0, u1, u2, u3) + '$';
      const cand1 = '$' + fmtCanonLine(-u1, -u2, -u3, x0, y0, z0) + '$';
      const cand2 = '$' + fmtCanonLine(u1, u2, u3, x0, y0, z0) + '$';
      const cand3 = '$' + fmtCanonLine(-x0, -y0, -z0, u1, u2, u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(x0 + k, y0, z0, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta: ' + paramEq + '$. Phương trình chính tắc của đường thẳng $\\Delta$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $\\Delta$ đi qua $A' + u.formatCoord3D(x0, y0, z0) + '$ và nhận $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm vectơ chỉ phương.',
          'Phương trình chính tắc của $\\Delta$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u3 = 0', params: { x0: 7, y0: -1, z0: 3, u1: 8, u2: -5, u3: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10', params: { x0: 7, y0: -1, z0: 3, u1: 8, u2: -5, u3: -1 }, expectedValid: true },
    ],
  },

  // D11: Viết PT chính tắc qua C, vuông góc d1 và song song (β)
  t12_b15_d11_canon_perp_line_par_plane_mc: {
    id: 't12_b15_d11_canon_perp_line_par_plane_mc',
    name: 'Phương trình đường thẳng qua điểm, vuông góc đường thẳng và song song mặt phẳng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm C, đường thẳng d1 và mặt phẳng (β). Viết phương trình đường thẳng Δ qua C, vuông góc d1 và song song (β).',
    conditionSummary: 'Tích có hướng [u1, n] có cả 3 tọa độ khác 0; C không thuộc (β)',
    paramSpecs: [
      { name: 'xC', label: 'x_C', min: -6, max: 6 },
      { name: 'yC', label: 'y_C', min: -6, max: 6 },
      { name: 'zC', label: 'z_C', min: -6, max: 6 },
      { name: 'u1x', label: 'u1_x', min: -5, max: 5, allowZero: false },
      { name: 'u1y', label: 'u1_y', min: -6, max: 6, allowZero: false },
      { name: 'u1z', label: 'u1_z', min: -4, max: 4, allowZero: false },
      { name: 'nx', label: 'n_x', min: -5, max: 5, allowZero: false },
      { name: 'ny', label: 'n_y', min: -5, max: 5, allowZero: false },
      { name: 'nz', label: 'n_z', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { xC, yC, zC, u1x, u1y, u1z, nx, ny, nz } = params;
      if (u1x === 0 || u1y === 0 || u1z === 0 || nx === 0 || ny === 0 || nz === 0) {
        return { valid: false, reason: 'Thành phần vectơ chỉ phương và pháp tuyến khác 0' };
      }
      const vx = u1y * nz - u1z * ny;
      const vy = u1z * nx - u1x * nz;
      const vz = u1x * ny - u1y * nx;
      if (vx === 0 || vy === 0 || vz === 0) return { valid: false, reason: 'Tích có hướng có thành phần bằng 0' };
      if (xC === 0 && yC === 0 && zC === 0) return { valid: false, reason: 'C khác O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xC, yC, zC, u1x, u1y, u1z, nx, ny, nz } = params;
      ` + FMT_HELPERS + String.raw`
      const vx = u1y * nz - u1z * ny;
      const vy = u1z * nx - u1x * nz;
      const vz = u1x * ny - u1y * nx;
      const g = u.gcd(vx, u.gcd(vy, vz));
      const ux = vx / g, uy = vy / g, uz = vz / g;
      const x1 = -5, y1 = -6, z1 = -5;
      const D = -(nx * xC + ny * yC + nz * zC) + 3;
      const d1Eq = fmtCanonLine(x1, y1, z1, u1x, u1y, u1z);
      const planeEq = u.formatPlaneEq(nx, ny, nz, D);
      const correct = '$' + fmtCanonLine(xC, yC, zC, ux, uy, uz) + '$';
      const cand1 = '$' + fmtCanonLine(-xC, -yC, -zC, ux, uy, uz) + '$';
      const cand2 = '$' + fmtCanonLine(-ux, -uy, -uz, xC || 1, yC || 1, zC || 1) + '$';
      const cand3 = '$' + fmtCanonLine(xC, yC, zC, ux, -uy, uz) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(xC + k, yC, zC, ux, uy, uz) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta$ đi qua điểm $C' + u.formatCoord3D(xC, yC, zC) + '$. Biết $\\Delta$ vuông góc với đường thẳng $d_1: ' + d1Eq + '$ và song song với mặt phẳng $(\\beta): ' + planeEq + '$. Phương trình đường thẳng $\\Delta$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$d_1$ có vectơ chỉ phương $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1x, u1y, u1z) + '$; $(\\beta)$ có vectơ pháp tuyến $\\vec{n} = ' + u.formatCoord3D(nx, ny, nz) + '$.',
          'Ta có $\\left[\\overrightarrow{u_1}, \\vec{n}\\right] = ' + u.formatCoord3D(vx, vy, vz) + '$ (cùng phương với $\\vec{u} = ' + u.formatCoord3D(ux, uy, uz) + '$) là một vectơ chỉ phương của $\\Delta$.',
          'Đường thẳng $\\Delta$ đi qua $C' + u.formatCoord3D(xC, yC, zC) + '$ nhận $\\vec{u}$ làm VTCP có phương trình là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tích có hướng có thành phần 0', params: { xC: -4, yC: -5, zC: -5, u1x: 1, u1y: 2, u1z: 3, nx: 1, ny: 2, nz: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11', params: { xC: -4, yC: -5, zC: -5, u1x: 3, u1y: -6, u1z: -2, nx: -4, ny: 4, nz: -2 }, expectedValid: true },
    ],
  },

  // D12: Viết PT chính tắc qua N và song song cả hai mặt phẳng (α) và (Q)
  t12_b15_d12_canon_par_two_planes_mc: {
    id: 't12_b15_d12_canon_par_two_planes_mc',
    name: 'Phương trình đường thẳng qua điểm và song song hai mặt phẳng cắt nhau',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm N và hai mặt phẳng (α), (Q) cắt nhau. Viết phương trình đường thẳng Δ qua N và song song với cả (α), (Q).',
    conditionSummary: '[n1, n2] có cả 3 tọa độ khác 0; N không thuộc (α) và (Q)',
    paramSpecs: [
      { name: 'xN', label: 'x_N', min: -6, max: 6 },
      { name: 'yN', label: 'y_N', min: -6, max: 6 },
      { name: 'zN', label: 'z_N', min: -6, max: 6 },
      { name: 'n1x', label: 'n1_x', min: -7, max: 7, allowZero: false },
      { name: 'n1y', label: 'n1_y', min: -5, max: 5, allowZero: false },
      { name: 'n1z', label: 'n1_z', min: -6, max: 6, allowZero: false },
      { name: 'n2x', label: 'n2_x', min: -5, max: 5, allowZero: false },
      { name: 'n2y', label: 'n2_y', min: -5, max: 5, allowZero: false },
      { name: 'n2z', label: 'n2_z', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { xN, yN, zN, n1x, n1y, n1z, n2x, n2y, n2z } = params;
      if (n1x === 0 || n1y === 0 || n1z === 0 || n2x === 0 || n2y === 0 || n2z === 0) return { valid: false, reason: 'Thành phần VTPT khác 0' };
      const vx = n1y * n2z - n1z * n2y;
      const vy = n1z * n2x - n1x * n2z;
      const vz = n1x * n2y - n1y * n2x;
      if (vx === 0 || vy === 0 || vz === 0) return { valid: false, reason: '[n1, n2] có thành phần 0' };
      if (xN === 0 && yN === 0 && zN === 0) return { valid: false, reason: 'N khác O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xN, yN, zN, n1x, n1y, n1z, n2x, n2y, n2z } = params;
      ` + FMT_HELPERS + String.raw`
      const vx = n1y * n2z - n1z * n2y;
      const vy = n1z * n2x - n1x * n2z;
      const vz = n1x * n2y - n1y * n2x;
      const g = u.gcd(vx, u.gcd(vy, vz));
      const ux = vx / g, uy = vy / g, uz = vz / g;
      const D1 = -(n1x * xN + n1y * yN + n1z * zN) + 5;
      const D2 = -(n2x * xN + n2y * yN + n2z * zN) - 4;
      const eq1 = u.formatPlaneEq(n1x, n1y, n1z, D1);
      const eq2 = u.formatPlaneEq(n2x, n2y, n2z, D2);
      const correct = '$' + fmtCanonLine(xN, yN, zN, ux, uy, uz) + '$';
      const cand1 = '$' + fmtCanonLine(-xN, -yN, -zN, ux, uy, uz) + '$';
      const cand2 = '$' + fmtCanonLine(ux, uy, uz, xN || 1, yN || 1, zN || 1) + '$';
      const cand3 = '$' + fmtCanonLine(xN, yN, zN, -ux, uy, uz) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(xN + k, yN, zN, ux, uy, uz) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta$ đi qua điểm $N' + u.formatCoord3D(xN, yN, zN) + '$. Biết $\\Delta$ song song với cả hai mặt phẳng $(\\alpha): ' + eq1 + '$ và $(Q): ' + eq2 + '$. Phương trình đường thẳng $\\Delta$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$(\\alpha)$ có vectơ pháp tuyến $\\overrightarrow{n_1} = ' + u.formatCoord3D(n1x, n1y, n1z) + '$; $(Q)$ có vectơ pháp tuyến $\\overrightarrow{n_2} = ' + u.formatCoord3D(n2x, n2y, n2z) + '$.',
          'Ta có $\\left[\\overrightarrow{n_1}, \\overrightarrow{n_2}\\right] = ' + u.formatCoord3D(vx, vy, vz) + '$ (cùng phương với $\\vec{u} = ' + u.formatCoord3D(ux, uy, uz) + '$) là một vectơ chỉ phương của $\\Delta$.',
          'Vậy phương trình chính tắc của $\\Delta$ qua $N' + u.formatCoord3D(xN, yN, zN) + '$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai mặt phẳng song song', params: { xN: -4, yN: 6, zN: 2, n1x: 1, n1y: 2, n1z: -1, n2x: 2, n2y: 4, n2z: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12', params: { xN: -4, yN: 6, zN: 2, n1x: -7, n1y: 3, n1z: -6, n2x: -3, n2y: 3, n2z: 2 }, expectedValid: true },
    ],
  },

  // D13: Viết PT tham số qua I và có VTCP u
  t12_b15_d13_param_point_vec_mc: {
    id: 't12_b15_d13_param_point_vec_mc',
    name: 'Viết phương trình tham số đường thẳng qua điểm và biết vectơ chỉ phương',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm I và vectơ chỉ phương u. Viết phương trình tham số đường thẳng d.',
    conditionSummary: 'u1, u2, u3 ≠ 0; I ≠ (u1, u2, u3)',
    paramSpecs: [
      { name: 'x0', label: 'x_I', min: -7, max: 7 },
      { name: 'y0', label: 'y_I', min: -7, max: 7 },
      { name: 'z0', label: 'z_I', min: -7, max: 7 },
      { name: 'u1', label: 'u1', min: -6, max: 6, allowZero: false },
      { name: 'u2', label: 'u2', min: -6, max: 6, allowZero: false },
      { name: 'u3', label: 'u3', min: -6, max: 6, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 ≠ 0' };
      if ((x0 === u1 && y0 === u2 && z0 === u3) || (x0 === 0 && y0 === 0 && z0 === 0)) {
        return { valid: false, reason: 'Tránh trùng vectơ gây nhiễu' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const correct = '$' + fmtParamLine(x0, y0, z0, u1, u2, u3) + '$';
      const cand1 = '$' + fmtParamLine(u1, u2, u3, x0 || 1, y0 || 1, z0 || 1) + '$';
      const cand2 = '$' + fmtParamLine(-x0, -y0, -z0, u1, u2, u3) + '$';
      const cand3 = '$' + fmtParamLine(x0, -y0, z0, u1, -u2, u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtParamLine(x0 + k, y0, z0, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, đường thẳng $d$ đi qua điểm $I' + u.formatCoord3D(x0, y0, z0) + '$ và nhận vectơ $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm vectơ chỉ phương có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $d$ đi qua $I' + u.formatCoord3D(x0, y0, z0) + '$ nhận $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm vectơ chỉ phương nên có phương trình tham số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên I = O', params: { x0: 0, y0: 0, z0: 0, u1: 3, u2: -5, u3: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13', params: { x0: 4, y0: 3, z0: 4, u1: 3, u2: -5, u3: -1 }, expectedValid: true },
    ],
  },

  // D14: Viết PT tham số qua điểm E và có VTCP MC
  t12_b15_d14_param_point_vec2pts_mc: {
    id: 't12_b15_d14_param_point_vec2pts_mc',
    name: 'Viết phương trình tham số qua một điểm và nhận vectơ MC làm VTCP',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm E và hai điểm M, C. Viết phương trình tham số đường thẳng d đi qua E nhận vectơ MC làm vectơ chỉ phương.',
    conditionSummary: 'MC có ba tọa độ khác 0; E khác MC',
    paramSpecs: [
      { name: 'xE', label: 'x_E', min: -7, max: 7 },
      { name: 'yE', label: 'y_E', min: -7, max: 7 },
      { name: 'zE', label: 'z_E', min: -7, max: 7 },
      { name: 'xM', label: 'x_M', min: -5, max: 5 },
      { name: 'yM', label: 'y_M', min: -5, max: 5 },
      { name: 'zM', label: 'z_M', min: -5, max: 5 },
      { name: 'u1', label: 'x_C - x_M', min: -9, max: 9, allowZero: false },
      { name: 'u2', label: 'y_C - y_M', min: -9, max: 9, allowZero: false },
      { name: 'u3', label: 'z_C - z_M', min: -9, max: 9, allowZero: false },
    ],
    validateCode: `
      const { xE, yE, zE, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 ≠ 0' };
      if ((xE === u1 && yE === u2 && zE === u3) || (xE === 0 && yE === 0 && zE === 0)) {
        return { valid: false, reason: 'Tránh trùng vectơ gây nhiễu' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xE, yE, zE, xM, yM, zM, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const xC = xM + u1, yC = yM + u2, zC = zM + u3;
      const correct = '$' + fmtParamLine(xE, yE, zE, u1, u2, u3) + '$';
      const cand1 = '$' + fmtParamLine(u1, u2, u3, xE || 1, yE || 1, zE || 1) + '$';
      const cand2 = '$' + fmtParamLine(-xE, -yE, -zE, u1, u2, u3) + '$';
      const cand3 = '$' + fmtParamLine(xE, -yE, zE, u1, -u2, u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtParamLine(xE + k, yE, zE, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, đường thẳng $d$ đi qua điểm $E' + u.formatCoord3D(xE, yE, zE) + '$ và nhận vectơ $\\overrightarrow{MC}$ làm vectơ chỉ phương với $M' + u.formatCoord3D(xM, yM, zM) + '$ và $C' + u.formatCoord3D(xC, yC, zC) + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $\\overrightarrow{MC} = ' + u.formatCoord3D(u1, u2, u3) + '$.',
          'Đường thẳng $d$ đi qua $E' + u.formatCoord3D(xE, yE, zE) + '$ nhận $\\overrightarrow{MC}$ làm vectơ chỉ phương nên có phương trình là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0', params: { xE: -6, yE: 4, zE: 4, xM: -2, yM: 4, zM: 7, u1: 0, u2: 5, u3: -9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14', params: { xE: -6, yE: 4, zE: 4, xM: -2, yM: 4, zM: 7, u1: 8, u2: 5, u3: -9 }, expectedValid: true },
    ],
  },

  // D15: Viết PT tham số qua A và song song d1
  t12_b15_d15_param_parallel_line_mc: {
    id: 't12_b15_d15_param_parallel_line_mc',
    name: 'Viết phương trình tham số đường thẳng qua điểm và song song đường thẳng khác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho điểm A và đường thẳng d1 dạng chính tắc. Viết phương trình tham số đường thẳng d đi qua A và song song d1.',
    conditionSummary: 'A không thuộc d1; u_i ≠ 0',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -6, max: 6 },
      { name: 'yA', label: 'y_A', min: -6, max: 6 },
      { name: 'zA', label: 'z_A', min: -6, max: 6 },
      { name: 'x1', label: 'x_d1', min: -9, max: 5 },
      { name: 'y1', label: 'y_d1', min: -5, max: 5 },
      { name: 'u1', label: 'u1', min: -7, max: 7, allowZero: false },
      { name: 'u2', label: 'u2', min: -9, max: 9, allowZero: false },
      { name: 'u3', label: 'u3', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      const { xA, yA, zA, x1, y1, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 ≠ 0' };
      const z1 = -7;
      if ((xA - x1) * u2 === (yA - y1) * u1 && (yA - y1) * u3 === (zA - z1) * u2) {
        return { valid: false, reason: 'Điểm A nằm trên đường thẳng d1' };
      }
      if (xA === 0 && yA === 0 && zA === 0) return { valid: false, reason: 'A khác O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, x1, y1, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const z1 = -7;
      const g = u.gcd(u1, u.gcd(u2, u3));
      const ux = -u1 / g, uy = -u2 / g, uz = -u3 / g;
      const d1Eq = fmtCanonLine(x1, y1, z1, u1, u2, u3);
      const correct = '$' + fmtParamLine(xA, yA, zA, ux, uy, uz) + '$';
      const cand1 = '$' + fmtParamLine(-xA, -yA, zA, ux, uy, uz) + '$';
      const cand2 = '$' + fmtParamLine(xA + 1, yA, zA, ux, uy, uz) + '$';
      const cand3 = '$' + fmtParamLine(xA, yA, zA, ux, -uy, uz) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtParamLine(xA, yA + k, zA, ux, uy, uz) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, đường thẳng $d$ đi qua điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ và song song với đường thẳng $d_1: ' + d1Eq + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $d_1$ có vectơ chỉ phương là $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1, u2, u3) + '$.',
          'Vì $d \\parallel d_1$ nên $d$ nhận $\\vec{u} = ' + u.formatCoord3D(ux, uy, uz) + '$ làm vectơ chỉ phương.',
          'Phương trình tham số của $d$ qua $A' + u.formatCoord3D(xA, yA, zA) + '$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A thuộc d1', params: { xA: -9, yA: -3, zA: -7, x1: -9, y1: -3, u1: -2, u2: -9, u3: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15', params: { xA: -5, yA: -1, zA: -5, x1: -9, y1: -3, u1: -2, u2: -9, u3: 7 }, expectedValid: true },
    ],
  },

  // D16: Chuyển phương trình chính tắc sang tham số
  t12_b15_d16_canon_to_param_mc: {
    id: 't12_b15_d16_canon_to_param_mc',
    name: 'Chuyển phương trình đường thẳng từ dạng chính tắc sang dạng tham số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho đường thẳng d dạng chính tắc. Viết phương trình tham số tương ứng của d.',
    conditionSummary: 'u1, u2, u3 ≠ 0; tọa độ điểm và VTCP khác nhau',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -7, max: 7 },
      { name: 'y0', label: 'y0', min: -7, max: 7 },
      { name: 'z0', label: 'z0', min: -7, max: 7 },
      { name: 'u1', label: 'u1', min: -7, max: 7, allowZero: false },
      { name: 'u2', label: 'u2', min: -7, max: 7, allowZero: false },
      { name: 'u3', label: 'u3', min: -7, max: 7, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 ≠ 0' };
      if (x0 === 0 || y0 === 0 || z0 === 0) return { valid: false, reason: 'x0, y0, z0 ≠ 0' };
      if (x0 === u1 && y0 === u2 && z0 === u3) return { valid: false, reason: 'Tránh trùng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3 } = params;
      ` + FMT_HELPERS + String.raw`
      const canonEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const correct = '$' + fmtParamLine(x0, y0, z0, u1, u2, u3) + '$';
      const cand1 = '$' + fmtParamLine(-x0, -y0, -z0, u1, u2, u3) + '$';
      const cand2 = '$' + fmtParamLine(u1, u2, u3, x0, y0, z0) + '$';
      const cand3 = '$' + fmtParamLine(x0, y0, z0, u1, -u2, -u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtParamLine(x0 + k, y0, z0, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + canonEq + '$. Phương trình tham số của đường thẳng $d$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $d$ đi qua điểm $I' + u.formatCoord3D(x0, y0, z0) + '$ nhận vectơ $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm vectơ chỉ phương.',
          'Phương trình tham số của $d$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u2 = 0', params: { x0: -1, y0: 3, z0: 2, u1: -7, u2: 0, u3: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16', params: { x0: -1, y0: 3, z0: 2, u1: -7, u2: -2, u3: 3 }, expectedValid: true },
    ],
  },

  // D17: Vị trí tương đối: song song
  t12_b15_d17_relpos_parallel_mc: {
    id: 't12_b15_d17_relpos_parallel_mc',
    name: 'Xét vị trí tương đối của hai đường thẳng (trường hợp song song)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối của hai đường thẳng',
    description: 'Cho hai đường thẳng Δ và Δ\' dạng chính tắc với vectơ chỉ phương tỉ lệ và không có điểm chung. Xác định vị trí tương đối.',
    conditionSummary: 'u2 = k*u1 (|k| >= 2) và điểm đi qua của Δ không thuộc Δ\'',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -6, max: 6 },
      { name: 'yA', label: 'y_A', min: -6, max: 6 },
      { name: 'zA', label: 'z_A', min: -7, max: 6 },
      { name: 'u1', label: 'u1', min: -6, max: 6, allowZero: false },
      { name: 'u2', label: 'u2', min: -6, max: 6, allowZero: false },
      { name: 'u3', label: 'u3', min: -6, max: 6, allowZero: false },
      { name: 'k', label: 'Tỉ số k', min: -3, max: 3, allowZero: false },
      { name: 'shift', label: 'Độ lệch xB', min: 1, max: 6 },
    ],
    validateCode: `
      const { xA, yA, zA, u1, u2, u3, k, shift } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || Math.abs(k) < 2) return { valid: false, reason: 'u_i ≠ 0 và |k| >= 2' };
      const xB = xA + 3 * u1 + shift, yB = yA + 3 * u2, zB = zA + 3 * u3;
      if ((xA - xB) * u2 === (yA - yB) * u1 && (yA - yB) * u3 === (zA - zB) * u2) {
        return { valid: false, reason: 'Hai đường thẳng trùng nhau' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, u1, u2, u3, k, shift } = params;
      ` + FMT_HELPERS + String.raw`
      const v1 = k * u1, v2 = k * u2, v3 = k * u3;
      const xB = xA + 3 * u1 + shift, yB = yA + 3 * u2, zB = zA + 3 * u3;
      const eq1 = fmtCanonLine(xA, yA, zA, u1, u2, u3);
      const eq2 = fmtCanonLine(xB, yB, zB, v1, v2, v3);
      const correct = '$\\Delta$ song song với $\\Delta\'$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$\\Delta$ và $\\Delta\'$ chéo nhau',
          '$\\Delta$ và $\\Delta\'$ trùng nhau',
          '$\\Delta$ cắt $\\Delta\'$',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho hai đường thẳng $\\Delta: ' + eq1 + '$ và $\\Delta\': ' + eq2 + '$. Xét vị trí tương đối của hai đường thẳng đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\Delta$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1, u2, u3) + '$; $\\Delta\'$ có VTCP $\\overrightarrow{u_2} = ' + u.formatCoord3D(v1, v2, v3) + '$.',
          'Ta có $\\overrightarrow{u_2} = ' + k + '\\overrightarrow{u_1}$ nên hai vectơ chỉ phương cùng phương.',
          'Điểm $A' + u.formatCoord3D(xA, yA, zA) + ' \\in \\Delta$ nhưng không thỏa mãn phương trình $\\Delta\'$ nên $\\Delta$ song song với $\\Delta\'$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên shift = 0 (trùng nhau)', params: { xA: -4, yA: -2, zA: -7, u1: -3, u2: 6, u3: -1, k: 3, shift: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17', params: { xA: -4, yA: -2, zA: -7, u1: -3, u2: 6, u3: -1, k: 3, shift: 2 }, expectedValid: true },
    ],
  },

  // D18: Vị trí tương đối: trùng nhau
  t12_b15_d18_relpos_coincident_mc: {
    id: 't12_b15_d18_relpos_coincident_mc',
    name: 'Xét vị trí tương đối của hai đường thẳng (trường hợp trùng nhau)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối của hai đường thẳng',
    description: 'Cho hai đường thẳng Δ1 và Δ2 dạng chính tắc có vectơ chỉ phương cùng phương và chung điểm. Xác định vị trí tương đối.',
    conditionSummary: 'u2 = k*u1 (k ≠ 0) và điểm đi qua của Δ2 nằm trên Δ1 (m ≠ 0)',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -6, max: 6 },
      { name: 'yA', label: 'y_A', min: -6, max: 6 },
      { name: 'zA', label: 'z_A', min: -6, max: 6 },
      { name: 'u1', label: 'u1', min: -7, max: 7, allowZero: false },
      { name: 'u2', label: 'u2', min: -7, max: 7, allowZero: false },
      { name: 'u3', label: 'u3', min: -7, max: 7, allowZero: false },
      { name: 'k', label: 'Hệ số VTCP k', min: -2, max: 2, allowZero: false },
      { name: 'm', label: 'Bước điểm m', min: -2, max: 2, allowZero: false },
    ],
    validateCode: `
      const { u1, u2, u3, k, m } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || k === 0 || m === 0) return { valid: false, reason: 'u_i, k, m khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, u1, u2, u3, k, m } = params;
      ` + FMT_HELPERS + String.raw`
      const v1 = k * u1, v2 = k * u2, v3 = k * u3;
      const xB = xA + m * u1, yB = yA + m * u2, zB = zA + m * u3;
      const eq1 = fmtCanonLine(xA, yA, zA, u1, u2, u3);
      const eq2 = fmtCanonLine(xB, yB, zB, v1, v2, v3);
      const correct = '$\\Delta_1$ và $\\Delta_2$ trùng nhau';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$\\Delta_1$ và $\\Delta_2$ chéo nhau',
          '$\\Delta_1$ cắt $\\Delta_2$',
          '$\\Delta_1$ song song với $\\Delta_2$',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho hai đường thẳng $\\Delta_1: ' + eq1 + '$ và $\\Delta_2: ' + eq2 + '$. Xét vị trí tương đối của hai đường thẳng đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\Delta_1$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1, u2, u3) + '$; $\\Delta_2$ có VTCP $\\overrightarrow{u_2} = ' + u.formatCoord3D(v1, v2, v3) + ' = ' + k + '\\overrightarrow{u_1}$.',
          'Điểm $A' + u.formatCoord3D(xA, yA, zA) + ' \\in \\Delta_1$ thay vào phương trình $\\Delta_2$ đều cho tỉ số bằng $' + (-m / k === Math.round(-m / k) ? -m / k : (-m) + '/' + k) + '$ nên $A \\in \\Delta_2$.',
          'Vậy $\\Delta_1$ và $\\Delta_2$ trùng nhau.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m = 0', params: { xA: 4, yA: 6, zA: -2, u1: 7, u2: 2, u3: -3, k: -1, m: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18', params: { xA: 4, yA: 6, zA: -2, u1: 7, u2: 2, u3: -3, k: -1, m: -1 }, expectedValid: true },
    ],
  },

  // D19: Vị trí tương đối: cắt nhau (dạng 1: Δ và Δ')
  t12_b15_d19_relpos_intersect_mc: {
    id: 't12_b15_d19_relpos_intersect_mc',
    name: 'Xét vị trí tương đối của hai đường thẳng (trường hợp cắt nhau - dạng 1)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối của hai đường thẳng',
    description: 'Cho hai đường thẳng Δ và Δ\' cắt nhau tại một điểm. Xác định vị trí tương đối bằng tích hỗn tạp [u1, u2].AB.',
    conditionSummary: 'u1 và u2 không cùng phương; t1, t2 ≠ 0 để A ≠ B',
    paramSpecs: [
      { name: 'xI', label: 'x giao điểm', min: -6, max: 6 },
      { name: 'yI', label: 'y giao điểm', min: -6, max: 6 },
      { name: 'zI', label: 'z giao điểm', min: -6, max: 6 },
      { name: 'u1x', label: 'u1_x', min: -5, max: 5, allowZero: false },
      { name: 'u1y', label: 'u1_y', min: -5, max: 5, allowZero: false },
      { name: 'u1z', label: 'u1_z', min: -5, max: 5, allowZero: false },
      { name: 'u2x', label: 'u2_x', min: -5, max: 5, allowZero: false },
      { name: 'u2y', label: 'u2_y', min: -5, max: 5, allowZero: false },
      { name: 'u2z', label: 'u2_z', min: -5, max: 5, allowZero: false },
      { name: 't1', label: 't1', min: -2, max: 2, allowZero: false },
      { name: 't2', label: 't2', min: -2, max: 2, allowZero: false },
    ],
    validateCode: `
      const { u1x, u1y, u1z, u2x, u2y, u2z, t1, t2 } = params;
      if (u1x === 0 || u1y === 0 || u1z === 0 || u2x === 0 || u2y === 0 || u2z === 0 || t1 === 0 || t2 === 0) {
        return { valid: false, reason: 'Các thành phần khác 0' };
      }
      const cx = u1y * u2z - u1z * u2y;
      const cy = u1z * u2x - u1x * u2z;
      const cz = u1x * u2y - u1y * u2x;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'u1 và u2 cùng phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xI, yI, zI, u1x, u1y, u1z, u2x, u2y, u2z, t1, t2 } = params;
      ` + FMT_HELPERS + String.raw`
      const xA = xI - t1 * u1x, yA = yI - t1 * u1y, zA = zI - t1 * u1z;
      const xB = xI - t2 * u2x, yB = yI - t2 * u2y, zB = zI - t2 * u2z;
      const cx = u1y * u2z - u1z * u2y;
      const cy = u1z * u2x - u1x * u2z;
      const cz = u1x * u2y - u1y * u2x;
      const eq1 = fmtCanonLine(xA, yA, zA, u1x, u1y, u1z);
      const eq2 = fmtCanonLine(xB, yB, zB, u2x, u2y, u2z);
      const correct = '$\\Delta$ cắt $\\Delta\'$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$\\Delta$ song song với $\\Delta\'$',
          '$\\Delta$ và $\\Delta\'$ trùng nhau',
          '$\\Delta$ và $\\Delta\'$ chéo nhau',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho hai đường thẳng $\\Delta: ' + eq1 + '$ và $\\Delta\': ' + eq2 + '$. Xét vị trí tương đối của hai đường thẳng đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\Delta$ đi qua $A' + u.formatCoord3D(xA, yA, zA) + '$, VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1x, u1y, u1z) + '$; $\\Delta\'$ đi qua $B' + u.formatCoord3D(xB, yB, zB) + '$, VTCP $\\overrightarrow{u_2} = ' + u.formatCoord3D(u2x, u2y, u2z) + '$.',
          'Vì $\\overrightarrow{u_1}, \\overrightarrow{u_2}$ không cùng phương nên $\\Delta$ và $\\Delta\'$ cắt nhau hoặc chéo nhau.',
          'Ta có $\\left[\\overrightarrow{u_1}, \\overrightarrow{u_2}\\right] = ' + u.formatCoord3D(cx, cy, cz) + '$ và $\\overrightarrow{AB} = ' + u.formatCoord3D(xB - xA, yB - yA, zB - zA) + '$, suy ra $\\left[\\overrightarrow{u_1}, \\overrightarrow{u_2}\\right] \\cdot \\overrightarrow{AB} = 0$. Vậy $\\Delta$ cắt $\\Delta\'$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1, u2 cùng phương', params: { xI: 0, yI: 0, zI: 0, u1x: 1, u1y: 2, u1z: 3, u2x: 2, u2y: 4, u2z: 6, t1: 1, t2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19', params: { xI: 2, yI: -7, zI: -3, u1x: 3, u1y: 1, u1z: 2, u2x: -2, u2y: 5, u2z: -2, t1: 1, t2: -2 }, expectedValid: true },
    ],
  },

  // D20: Vị trí tương đối: chéo nhau
  t12_b15_d20_relpos_skew_mc: {
    id: 't12_b15_d20_relpos_skew_mc',
    name: 'Xét vị trí tương đối của hai đường thẳng (trường hợp chéo nhau)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối của hai đường thẳng',
    description: 'Cho hai đường thẳng d và d\' không đồng phẳng. Xác định vị trí tương đối dựa vào tích hỗn tạp khác 0.',
    conditionSummary: 'u1 và u2 không cùng phương và [u1, u2].AB ≠ 0',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -6, max: 6 },
      { name: 'yA', label: 'y_A', min: -6, max: 6 },
      { name: 'zA', label: 'z_A', min: -8, max: 4 },
      { name: 'xB', label: 'x_B', min: -7, max: 6 },
      { name: 'yB', label: 'y_B', min: -5, max: 8 },
      { name: 'zB', label: 'z_B', min: -4, max: 6 },
      { name: 'u1x', label: 'u1_x', min: -5, max: 5, allowZero: false },
      { name: 'u1y', label: 'u1_y', min: -5, max: 5, allowZero: false },
      { name: 'u1z', label: 'u1_z', min: -6, max: 6, allowZero: false },
      { name: 'u2x', label: 'u2_x', min: -6, max: 8, allowZero: false },
      { name: 'u2y', label: 'u2_y', min: -5, max: 5, allowZero: false },
      { name: 'u2z', label: 'u2_z', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { xA, yA, zA, xB, yB, zB, u1x, u1y, u1z, u2x, u2y, u2z } = params;
      if (u1x === 0 || u1y === 0 || u1z === 0 || u2x === 0 || u2y === 0 || u2z === 0) return { valid: false, reason: 'u_i ≠ 0' };
      const cx = u1y * u2z - u1z * u2y;
      const cy = u1z * u2x - u1x * u2z;
      const cz = u1x * u2y - u1y * u2x;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'u1 và u2 cùng phương' };
      const mixed = cx * (xB - xA) + cy * (yB - yA) + cz * (zB - zA);
      if (mixed === 0) return { valid: false, reason: 'Hai đường thẳng đồng phẳng (cắt nhau)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, xB, yB, zB, u1x, u1y, u1z, u2x, u2y, u2z } = params;
      ` + FMT_HELPERS + String.raw`
      const cx = u1y * u2z - u1z * u2y;
      const cy = u1z * u2x - u1x * u2z;
      const cz = u1x * u2y - u1y * u2x;
      const mixed = cx * (xB - xA) + cy * (yB - yA) + cz * (zB - zA);
      const eq1 = fmtCanonLine(xA, yA, zA, u1x, u1y, u1z);
      const eq2 = fmtCanonLine(xB, yB, zB, u2x, u2y, u2z);
      const correct = '$d$ và $d\'$ chéo nhau';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$d$ và $d\'$ trùng nhau',
          '$d$ song song với $d\'$',
          '$d$ cắt $d\'$',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho hai đường thẳng $d: ' + eq1 + '$ và $d\': ' + eq2 + '$. Xét vị trí tương đối của hai đường thẳng đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$d$ đi qua $A' + u.formatCoord3D(xA, yA, zA) + '$, VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1x, u1y, u1z) + '$; $d\'$ đi qua $B' + u.formatCoord3D(xB, yB, zB) + '$, VTCP $\\overrightarrow{u_2} = ' + u.formatCoord3D(u2x, u2y, u2z) + '$.',
          'Ta có $\\left[\\overrightarrow{u_1}, \\overrightarrow{u_2}\\right] = ' + u.formatCoord3D(cx, cy, cz) + '$ và $\\overrightarrow{AB} = ' + u.formatCoord3D(xB - xA, yB - yA, zB - zA) + '$.',
          'Suy ra $\\left[\\overrightarrow{u_1}, \\overrightarrow{u_2}\\right] \\cdot \\overrightarrow{AB} = ' + mixed + ' \\ne 0$. Vậy $d$ và $d\'$ chéo nhau.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tích hỗn tạp = 0', params: { xA: 0, yA: 0, zA: 0, xB: 1, yB: 2, zB: 2, u1x: 1, u1y: 1, u1z: 2, u2x: 2, u2y: 1, u2z: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20', params: { xA: 5, yA: 6, zA: -8, xB: -7, yB: 8, zB: 4, u1x: -5, u1y: 3, u1z: -6, u2x: 8, u2y: -2, u2z: 5 }, expectedValid: true },
    ],
  },

  // D21: Vị trí tương đối: cắt nhau (dạng 2: d và d', trực tiếp kiểm chứng giao điểm)
  t12_b15_d21_relpos_intersect_v2_mc: {
    id: 't12_b15_d21_relpos_intersect_v2_mc',
    name: 'Xét vị trí tương đối của hai đường thẳng (trường hợp cắt nhau - dạng 2)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vị trí tương đối của hai đường thẳng',
    description: 'Cho hai đường thẳng d và d\' dạng chính tắc cắt nhau. Xác định vị trí tương đối của chúng.',
    conditionSummary: 'u1 và u2 không cùng phương; hai đường thẳng có giao điểm duy nhất I',
    paramSpecs: [
      { name: 'xI', label: 'x giao điểm', min: -6, max: 6 },
      { name: 'yI', label: 'y giao điểm', min: -6, max: 6 },
      { name: 'zI', label: 'z giao điểm', min: -6, max: 6 },
      { name: 'u1x', label: 'u1_x', min: -4, max: 4, allowZero: false },
      { name: 'u1y', label: 'u1_y', min: -4, max: 4, allowZero: false },
      { name: 'u1z', label: 'u1_z', min: -4, max: 4, allowZero: false },
      { name: 'u2x', label: 'u2_x', min: -4, max: 4, allowZero: false },
      { name: 'u2y', label: 'u2_y', min: -7, max: 7, allowZero: false },
      { name: 'u2z', label: 'u2_z', min: -4, max: 4, allowZero: false },
      { name: 't1', label: 't1', min: 1, max: 3 },
      { name: 't2', label: 't2', min: -3, max: -1 },
    ],
    validateCode: `
      const { u1x, u1y, u1z, u2x, u2y, u2z, t1, t2 } = params;
      if (u1x === 0 || u1y === 0 || u1z === 0 || u2x === 0 || u2y === 0 || u2z === 0 || t1 === 0 || t2 === 0) {
        return { valid: false, reason: 'Các thành phần khác 0' };
      }
      const cx = u1y * u2z - u1z * u2y;
      const cy = u1z * u2x - u1x * u2z;
      const cz = u1x * u2y - u1y * u2x;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'u1 và u2 cùng phương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xI, yI, zI, u1x, u1y, u1z, u2x, u2y, u2z, t1, t2 } = params;
      ` + FMT_HELPERS + String.raw`
      const xA = xI - t1 * u1x, yA = yI - t1 * u1y, zA = zI - t1 * u1z;
      const xB = xI - t2 * u2x, yB = yI - t2 * u2y, zB = zI - t2 * u2z;
      const cx = u1y * u2z - u1z * u2y;
      const cy = u1z * u2x - u1x * u2z;
      const cz = u1x * u2y - u1y * u2x;
      const eq1 = fmtCanonLine(xA, yA, zA, u1x, u1y, u1z);
      const eq2 = fmtCanonLine(xB, yB, zB, u2x, u2y, u2z);
      const correct = '$d$ cắt $d\'$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$d$ và $d\'$ chéo nhau',
          '$d$ và $d\'$ trùng nhau',
          '$d$ song song với $d\'$',
        ],
        rng
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho hai đường thẳng $d: ' + eq1 + '$ và $d\': ' + eq2 + '$. Xét vị trí tương đối của hai đường thẳng đã cho.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$d$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1x, u1y, u1z) + '$ và $d\'$ có VTCP $\\overrightarrow{u_2} = ' + u.formatCoord3D(u2x, u2y, u2z) + '$ không cùng phương.',
          '$d$ qua $A' + u.formatCoord3D(xA, yA, zA) + '$, $d\'$ qua $B' + u.formatCoord3D(xB, yB, zB) + '$.',
          'Ta có $\\left[\\overrightarrow{u_1}, \\overrightarrow{u_2}\\right] = ' + u.formatCoord3D(cx, cy, cz) + '$ và $\\left[\\overrightarrow{u_1}, \\overrightarrow{u_2}\\right] \\cdot \\overrightarrow{AB} = 0$ nên $d$ và $d\'$ cắt nhau (tại $I' + u.formatCoord3D(xI, yI, zI) + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1, u2 cùng phương', params: { xI: 1, yI: 2, zI: 3, u1x: -1, u1y: 1, u1z: 3, u2x: 2, u2y: -2, u2z: -6, t1: 1, t2: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21', params: { xI: -5, yI: -3, zI: 1, u1x: -1, u1y: 1, u1z: 3, u2x: 2, u2y: 7, u2z: 3, t1: 2, t2: -1 }, expectedValid: true },
    ],
  },

  // D22: Giao điểm H(a;b;c) của đường thẳng d và mặt phẳng (α), tính a+b+c
  t12_b15_d22_intersect_line_plane_mc: {
    id: 't12_b15_d22_intersect_line_plane_mc',
    name: 'Tìm giao điểm của đường thẳng và mặt phẳng (tính tổng tọa độ)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giao điểm đường thẳng và mặt phẳng',
    description: 'Cho đường thẳng d và mặt phẳng (α) cắt nhau tại H(a;b;c). Tính P = a + b + c.',
    conditionSummary: 'u · n ≠ 0 và giao điểm H có tọa độ nguyên (t0 ≠ 0)',
    paramSpecs: [
      { name: 'a', label: 'a (x_H)', min: -6, max: 8 },
      { name: 'b', label: 'b (y_H)', min: -6, max: 8 },
      { name: 'c', label: 'c (z_H)', min: -6, max: 8 },
      { name: 'u1', label: 'u1', min: -5, max: 5, allowZero: false },
      { name: 'u2', label: 'u2', min: -7, max: 7, allowZero: false },
      { name: 'u3', label: 'u3', min: -5, max: 5, allowZero: false },
      { name: 'A', label: 'A_(α)', min: -6, max: 6, allowZero: false },
      { name: 'B', label: 'B_(α)', min: -6, max: 6, allowZero: false },
      { name: 'C', label: 'C_(α)', min: -6, max: 6, allowZero: false },
      { name: 't0', label: 't0', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { u1, u2, u3, A, B, C, t0 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || A === 0 || B === 0 || C === 0 || t0 === 0) {
        return { valid: false, reason: 'Các hệ số khác 0' };
      }
      if (A * u1 + B * u2 + C * u3 === 0) return { valid: false, reason: 'Đường thẳng song song hoặc nằm trong mặt phẳng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, u1, u2, u3, A, B, C, t0 } = params;
      ` + FMT_HELPERS + String.raw`
      const x0 = a - t0 * u1, y0 = b - t0 * u2, z0 = c - t0 * u3;
      const D = -(A * a + B * b + C * c);
      const ans = a + b + c;
      const lineEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const paramEq = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const planeEq = u.formatPlaneEq(A, B, C, D);
      const linX = u.formatLinear(u1, x0, 't');
      const linY = u.formatLinear(u2, y0, 't');
      const linZ = u.formatLinear(u3, z0, 't');
      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + (ans - 12) + '$', '$' + (ans - 6) + '$', '$' + (ans - 15) + '$'],
        rng,
        (k) => '$' + (ans + k) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, tọa độ giao điểm của đường thẳng $d: ' + lineEq + '$ và mặt phẳng $(\\alpha): ' + planeEq + '$ là điểm $H(a;b;c)$. Tính $P = a + b + c$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $d$ có phương trình tham số là $' + paramEq + '$.',
          'Thay $x, y, z$ vào phương trình $(\\alpha)$: $' + A + '(' + linX + ')' + u.formatTerm(B, '(' + linY + ')', false) + u.formatTerm(C, '(' + linZ + ')', false) + u.formatTrailingConst(D) + ' = 0 \\Rightarrow t = ' + t0 + '$.',
          'Suy ra tọa độ giao điểm là $H' + u.formatCoord3D(a, b, c) + '$ và $P = a + b + c = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d song song (α)', params: { a: 2, b: 3, c: 7, u1: 1, u2: 1, u3: 0, A: 1, B: -1, C: 2, t0: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22', params: { a: 2, b: 3, c: 7, u1: -1, u2: 7, u3: 5, A: 6, B: -6, C: -4, t0: -2 }, expectedValid: true },
    ],
  },

  // D23: Hình chiếu vuông góc H(a;b;c) của B lên đường thẳng d, tính phân số P = a+b+c
  t12_b15_d23_proj_point_line_frac_mc: {
    id: 't12_b15_d23_proj_point_line_frac_mc',
    name: 'Hình chiếu vuông góc của điểm lên đường thẳng (tổng tọa độ dạng phân số)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hình chiếu vuông góc trong không gian',
    description: 'Cho điểm B và đường thẳng d. Tìm hình chiếu vuông góc H(a;b;c) của B lên d và tính P = a + b + c.',
    conditionSummary: 'u1, u2, u3 ≠ 0; B ∉ d; P là phân số tối giản khác số nguyên',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -6, max: 7 },
      { name: 'y0', label: 'y0', min: -6, max: 6 },
      { name: 'z0', label: 'z0', min: -6, max: 6 },
      { name: 'u1', label: 'u1', min: -7, max: 7, allowZero: false },
      { name: 'u2', label: 'u2', min: -6, max: 6, allowZero: false },
      { name: 'u3', label: 'u3', min: -6, max: 6, allowZero: false },
      { name: 'xB', label: 'x_B', min: -5, max: 5 },
      { name: 'yB', label: 'y_B', min: -6, max: 5 },
      { name: 'zB', label: 'z_B', min: -5, max: 5 },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3, xB, yB, zB } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u1, u2, u3 ≠ 0' };
      const dx = x0 - xB, dy = y0 - yB, dz = z0 - zB;
      if (dx * u2 === dy * u1 && dy * u3 === dz * u2) return { valid: false, reason: 'B nằm trên d' };
      const den = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -(u1 * dx + u2 * dy + u3 * dz);
      if (tNum === 0) return { valid: false, reason: 't = 0 tầm thường' };
      const pNum = (x0 + y0 + z0) * den + (u1 + u2 + u3) * tNum;
      const fracP = u.simplifyFrac(pNum, den);
      if (fracP.isInteger) return { valid: false, reason: 'Cần P dạng phân số tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3, xB, yB, zB } = params;
      ` + FMT_HELPERS + String.raw`
      const dx = x0 - xB, dy = y0 - yB, dz = z0 - zB;
      const den = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -(u1 * dx + u2 * dy + u3 * dz);
      const fracT = u.simplifyFrac(tNum, den);
      const fracA = u.simplifyFrac(x0 * den + u1 * tNum, den);
      const fracB = u.simplifyFrac(y0 * den + u2 * tNum, den);
      const fracC = u.simplifyFrac(z0 * den + u3 * tNum, den);
      const fracP = u.simplifyFrac((x0 + y0 + z0) * den + (u1 + u2 + u3) * tNum, den);
      const canonEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const paramH = '(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ')';
      const vecBH = '(' + u.formatLinear(u1, dx, 't') + ';\\,' + u.formatLinear(u2, dy, 't') + ';\\,' + u.formatLinear(u3, dz, 't') + ')';
      const correct = '$' + fracP.latex + '$';
      const d1 = u.simplifyFrac(fracP.num + 123, fracP.den);
      const d2 = u.simplifyFrac(-fracP.num, fracP.den);
      const d3 = u.simplifyFrac(fracP.num + 97, fracP.den);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + d1.latex + '$', '$' + d2.latex + '$', '$' + d3.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(fracP.num + k * 7, fracP.den).latex + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + canonEq + '$ và điểm $B' + u.formatCoord3D(xB, yB, zB) + '$. Hình chiếu vuông góc của điểm $B$ trên đường thẳng $d$ là điểm $H(a;b;c)$. Tính $P = a + b + c$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $d$ có VTCP $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$. Gọi $H' + paramH + ' \\in d$.',
          'Ta có $\\overrightarrow{BH} = ' + vecBH + '$. Từ $\\overrightarrow{BH} \\cdot \\vec{u} = 0$, giải được $' + den + 't ' + u.formatTrailingConst(-tNum) + ' = 0 \\Rightarrow t = ' + fracT.latex + '$.',
          'Suy ra $H\\left(' + fracA.latex + ';\\, ' + fracB.latex + ';\\, ' + fracC.latex + '\\right)$ và $P = a + b + c = ' + fracP.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0', params: { x0: 7, y0: -5, z0: -1, u1: 0, u2: 6, u3: 6, xB: -2, yB: -6, zB: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23', params: { x0: 7, y0: -5, z0: -1, u1: 7, u2: 6, u3: 6, xB: -2, yB: -6, zB: 4 }, expectedValid: true },
    ],
  },

  // D24: Đường thẳng d' đi qua A cắt và vuông góc với đường thẳng d
  t12_b15_d24_line_intersect_perp_line_mc: {
    id: 't12_b15_d24_line_intersect_perp_line_mc',
    name: 'Đường thẳng đi qua điểm A, cắt và vuông góc với đường thẳng d',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng cắt và vuông góc',
    description: 'Cho đường thẳng d và điểm A ngoài d. Viết phương trình chính tắc đường thẳng d\' qua A, cắt và vuông góc với d.',
    conditionSummary: 'd\' có VTCP khác 0 ở cả 3 thành phần; điểm cắt B có tham số nguyên t0',
    paramSpecs: [
      { name: 'u1', label: 'u_d x', min: -4, max: 4, allowZero: false },
      { name: 'u2', label: 'u_d y', min: -4, max: 4, allowZero: false },
      { name: 'u3', label: 'u_d z', min: -4, max: 4, allowZero: false },
      { name: 'px', label: 'Trợ tạo v x', min: -4, max: 4, allowZero: false },
      { name: 'py', label: 'Trợ tạo v y', min: -4, max: 4, allowZero: false },
      { name: 'xB', label: 'x_B (giao điểm)', min: 1, max: 9 },
      { name: 'yB', label: 'y_B (giao điểm)', min: 1, max: 12 },
      { name: 'zB', label: 'z_B (giao điểm)', min: -12, max: -2 },
      { name: 't0', label: 't0', min: 1, max: 3 },
    ],
    validateCode: `
      const { u1, u2, u3, px, py, t0 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || px === 0 || py === 0 || t0 === 0) return { valid: false, reason: 'Các hệ số khác 0' };
      const vx0 = u2 * py - u3 * px;
      const vy0 = u3 * px - u1 * py;
      const vz0 = u1 * py - u2 * px;
      // Wait: check dot with u: u1*(u2*py-u3*px)+u2*(u3*px-u1*py)+u3*(u1*py-u2*px) != 0 in general unless [u, w]!
      // Use w = (px, py, 0) cross u:
      const wx = -u3 * py;
      const wy = u3 * px;
      const wz = u1 * py - u2 * px;
      if (wx === 0 || wy === 0 || wz === 0) return { valid: false, reason: "VTCP của d' có thành phần bằng 0" };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, px, py, xB, yB, zB, t0 } = params;
      ` + FMT_HELPERS + String.raw`
      const wx = -u3 * py, wy = u3 * px, wz = u1 * py - u2 * px;
      const g = u.gcd(wx, u.gcd(wy, wz));
      const vx = wx / g, vy = wy / g, vz = wz / g;
      const xA = xB - vx, yA = yB - vy, zA = zB - vz;
      const x0 = xB - t0 * u1, y0 = yB - t0 * u2, z0 = zB - t0 * u3;
      const dEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const correct = '$' + fmtCanonLine(xA, yA, zA, vx, vy, vz) + '$';
      const cand1 = '$' + fmtCanonLine(xA, yA, zA, -vx, -vy, vz) + '$';
      const cand2 = '$' + fmtCanonLine(xB, yB, zB, u1, u2, u3) + '$';
      const cand3 = '$' + fmtCanonLine(xA + 2, yA - 1, zA + 1, vx, -vy, vz) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(xA + k, yA, zA, vx, vy, vz) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + dEq + '$. Đường thẳng $d\'$ đi qua $A' + u.formatCoord3D(xA, yA, zA) + '$, cắt và vuông góc với đường thẳng $d$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $d$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1, u2, u3) + '$. Gọi $B = d \\cap d\' \\Rightarrow B(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ')$.',
          'Ta có $\\overrightarrow{AB} = (' + u.formatLinear(u1, x0 - xA, 't') + ';\\,' + u.formatLinear(u2, y0 - yA, 't') + ';\\,' + u.formatLinear(u3, z0 - zA, 't') + ')$. Do $\\overrightarrow{AB} \\cdot \\overrightarrow{u_1} = 0 \\Rightarrow t = ' + t0 + '$.',
          'Suy ra $B' + u.formatCoord3D(xB, yB, zB) + '$, $\\overrightarrow{AB} = ' + u.formatCoord3D(vx, vy, vz) + '$. Vậy $d\': ' + fmtCanonLine(xA, yA, zA, vx, vy, vz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên giao điểm cùng hướng', params: { u1: -4, u2: 2, u3: -1, px: 4, py: -2, xB: 8, yB: 11, zB: -12, t0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24', params: { u1: -4, u2: 2, u3: -1, px: -7, py: 5, xB: 8, yB: 11, zB: -12, t0: 2 }, expectedValid: true },
    ],
  },

  // D25: Đường thẳng Δ' đi qua E cắt Δ và song song (P)
  t12_b15_d25_line_intersect_par_plane_mc: {
    id: 't12_b15_d25_line_intersect_par_plane_mc',
    name: 'Đường thẳng đi qua điểm E, cắt đường thẳng Δ và song song mặt phẳng (P)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng cắt đường thẳng và song song mặt phẳng',
    description: 'Cho đường thẳng Δ, điểm E và mặt phẳng (P). Viết phương trình chính tắc đường thẳng Δ\' qua E, cắt Δ và song song với (P).',
    conditionSummary: 'u_Δ · n_P ≠ 0; các thành phần VTCP của Δ\' đều khác 0; E ∉ (P)',
    paramSpecs: [
      { name: 'u1', label: 'u_Δ x', min: -4, max: 4, allowZero: false },
      { name: 'u2', label: 'u_Δ y', min: -4, max: 4, allowZero: false },
      { name: 'u3', label: 'u_Δ z', min: -4, max: 4, allowZero: false },
      { name: 'nx', label: 'n_P x', min: 1, max: 6 },
      { name: 'ny', label: 'n_P y', min: 1, max: 5 },
      { name: 'nz', label: 'n_P z', min: 1, max: 5 },
      { name: 'qx', label: 'Trợ tạo v x', min: -3, max: 3, allowZero: false },
      { name: 'qy', label: 'Trợ tạo v y', min: -3, max: 3, allowZero: false },
      { name: 't0', label: 't0', min: -2, max: 2, allowZero: false },
    ],
    validateCode: `
      const { u1, u2, u3, nx, ny, nz, qx, qy, t0 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || nx <= 0 || ny <= 0 || nz <= 0 || qx === 0 || qy === 0 || t0 === 0) {
        return { valid: false, reason: 'Các hệ số khác 0' };
      }
      if (nx * u1 + ny * u2 + nz * u3 === 0) return { valid: false, reason: 'Δ song song (P)' };
      const vx0 = -nz * qy, vy0 = nz * qx, vz0 = nx * qy - ny * qx;
      if (vx0 === 0 || vy0 === 0 || vz0 === 0) return { valid: false, reason: "VTCP Δ' có thành phần 0" };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, nx, ny, nz, qx, qy, t0 } = params;
      ` + FMT_HELPERS + String.raw`
      const vx0 = -nz * qy, vy0 = nz * qx, vz0 = nx * qy - ny * qx;
      const g = u.gcd(vx0, u.gcd(vy0, vz0));
      const vx = vx0 / g, vy = vy0 / g, vz = vz0 / g;
      const xF = 3, yF = -4, zF = -8;
      const xE = xF - vx, yE = yF - vy, zE = zF - vz;
      const x0 = xF - t0 * u1, y0 = yF - t0 * u2, z0 = zF - t0 * u3;
      const D = -(nx * xE + ny * yE + nz * zE) + 21;
      const deltaEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const planeEq = u.formatPlaneEq(nx, ny, nz, D);
      const correct = '$' + fmtCanonLine(xE, yE, zE, vx, vy, vz) + '$';
      const cand1 = '$' + fmtCanonLine(xE, yE, zE, -vx, vy, vz) + '$';
      const cand2 = '$' + fmtCanonLine(xF, yF, zF, nx, ny, nz) + '$';
      const cand3 = '$' + fmtCanonLine(-xE, -yE, -zE, vx, -vy, vz) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [cand1, cand2, cand3],
        rng,
        (k) => '$' + fmtCanonLine(xE + k, yE, zE, vx, vy, vz) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta: ' + deltaEq + '$. Đường thẳng $\\Delta\'$ đi qua điểm $E' + u.formatCoord3D(xE, yE, zE) + '$ cắt đường thẳng $\\Delta$ và song song với mặt phẳng $(P): ' + planeEq + '$ có phương trình là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $F(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ') = \\Delta \\cap \\Delta\'$. Mặt phẳng $(P)$ có VTPT $\\vec{n} = ' + u.formatCoord3D(nx, ny, nz) + '$.',
          'Vì $\\Delta\' \\parallel (P) \\Rightarrow \\overrightarrow{EF} \\cdot \\vec{n} = 0$, giải được $t = ' + t0 + '$.',
          'Khi đó $F' + u.formatCoord3D(xF, yF, zF) + '$ và $\\overrightarrow{EF} = ' + u.formatCoord3D(vx, vy, vz) + '$, suy ra $\\Delta\': ' + fmtCanonLine(xE, yE, zE, vx, vy, vz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u_Δ · n_P = 0', params: { u1: 1, u2: -1, u3: 1, nx: 1, ny: 2, nz: 1, qx: 1, qy: -1, t0: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25', params: { u1: 3, u2: -2, u3: -2, nx: 5, ny: 3, nz: 4, qx: -3, qy: -5, t0: -1 }, expectedValid: true },
    ],
  },

  // D26: Mặt phẳng (Q) qua E, F sao cho khoảng cách từ N đến (Q) lớn nhất
  t12_b15_d26_plane_2pts_max_dist_mc: {
    id: 't12_b15_d26_plane_2pts_max_dist_mc',
    name: 'Mặt phẳng qua hai điểm E, F sao cho khoảng cách từ điểm N lớn nhất',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Cực trị khoảng cách và hình chiếu lên đường thẳng',
    description: 'Mặt phẳng (Q): ax + by + cz + D = 0 qua E, F tối đa hóa d(N, (Q)). Tính T = 2a + b + c + 5.',
    conditionSummary: 'EF không đi qua N; vectơ pháp tuyến a, b, c tối giản và D ≠ 0',
    paramSpecs: [
      { name: 'u1', label: 'u_EF x', min: -6, max: 6, allowZero: false },
      { name: 'u2', label: 'u_EF y', min: -9, max: 9, allowZero: false },
      { name: 'u3', label: 'u_EF z', min: -5, max: 5, allowZero: false },
      { name: 'qx', label: 'Trợ tạo n x', min: -3, max: 3, allowZero: false },
      { name: 'qy', label: 'Trợ tạo n y', min: -3, max: 3, allowZero: false },
      { name: 'xH', label: 'x_H', min: 1, max: 11 },
      { name: 'yH', label: 'y_H', min: -9, max: 2 },
      { name: 'zH', label: 'z_H', min: -4, max: 4 },
    ],
    validateCode: `
      const { u1, u2, u3, qx, qy, xH, yH, zH } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || qx === 0 || qy === 0) return { valid: false, reason: 'u_i và q_i khác 0' };
      const nx0 = -u3 * qy, ny0 = u3 * qx, nz0 = u1 * qy - u2 * qx;
      if (nx0 === 0 || ny0 === 0 || nz0 === 0) return { valid: false, reason: 'VTPT có thành phần bằng 0' };
      const g = u.gcd(nx0, u.gcd(ny0, nz0));
      const a = nx0 / g, b = ny0 / g, c = nz0 / g;
      const D = -(a * xH + b * yH + c * zH);
      if (D === 0) return { valid: false, reason: 'D = 0 tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, qx, qy, xH, yH, zH } = params;
      const nx0 = -u3 * qy, ny0 = u3 * qx, nz0 = u1 * qy - u2 * qx;
      const g = u.gcd(nx0, u.gcd(ny0, nz0));
      const a = nx0 / g, b = ny0 / g, c = nz0 / g;
      const D = -(a * xH + b * yH + c * zH);
      const xN = xH - a, yN = yH - b, zN = zH - c;
      const xE = xH - u1, yE = yH - u2, zE = zH - u3;
      const xF = xH + u1, yF = yH + u2, zF = zH + u3;
      const ans = 2 * a + b + c + 5;
      const planeEq = u.formatPlaneEq(a, b, c, D);
      const tailSign = D > 0 ? '+ ' + D : '- ' + Math.abs(D);
      const correct = '$' + ans + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + (ans - 4) + '$', '$' + (ans - 6) + '$', '$' + (ans + 3) + '$'],
        rng,
        (k) => '$' + (ans + k) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho hai điểm $E' + u.formatCoord3D(xE, yE, zE) + '$ và $F' + u.formatCoord3D(xF, yF, zF) + '$. Gọi $(Q)$ là mặt phẳng đi qua $E, F$ và không đi qua điểm $N' + u.formatCoord3D(xN, yN, zN) + '$ sao cho khoảng cách từ $N$ đến $(Q)$ đạt giá trị lớn nhất. Biết $(Q): ax + by + cz ' + tailSign + ' = 0$ với $a, b, c \\in \\mathbb{Z}$. Tính $T = 2a + b + c + 5$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $H, K$ lần lượt là hình chiếu vuông góc của $N$ lên $(Q)$ và lên $EF$. Ta có $d(N, (Q)) = NH \\le NK$ nên $d(N, (Q))$ lớn nhất khi $H \\equiv K$.',
          'Khi đó $(Q)$ nhận $\\overrightarrow{NK}$ (tức $\\vec{n} = ' + u.formatCoord3D(a, b, c) + '$) làm vectơ pháp tuyến.',
          'Phương trình $(Q): ' + planeEq + '$, suy ra $a = ' + a + ',\\, b = ' + b + ',\\, c = ' + c + ' \\Rightarrow T = 2a + b + c + 5 = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên (Q) qua gốc O (D=0)', params: { u1: 1, u2: 1, u3: 1, qx: 1, qy: 2, xH: 0, yH: 0, zH: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26', params: { u1: -6, u2: -9, u3: -5, qx: 1, qy: 1, xH: 11, yH: -9, zH: -1 }, expectedValid: true },
    ],
  },

  // D27: Góc giữa hai đường thẳng chính tắc (làm tròn 0,01 độ)
  t12_b15_d27_angle_two_canon_lines_mc: {
    id: 't12_b15_d27_angle_two_canon_lines_mc',
    name: 'Tính góc giữa hai đường thẳng dạng chính tắc',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Góc giữa hai đường thẳng',
    description: 'Cho hai đường thẳng d và d\' dạng chính tắc. Tính góc giữa d và d\' làm tròn đến hàng phần trăm.',
    conditionSummary: 'u1, u2 ≠ 0 ở các thành phần, không cùng phương, không vuông góc và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'u1x', label: 'u1_x', min: -5, max: 5, allowZero: false },
      { name: 'u1y', label: 'u1_y', min: -5, max: 5, allowZero: false },
      { name: 'u1z', label: 'u1_z', min: -5, max: 5, allowZero: false },
      { name: 'u2x', label: 'u2_x', min: -5, max: 5, allowZero: false },
      { name: 'u2y', label: 'u2_y', min: -5, max: 5, allowZero: false },
      { name: 'u2z', label: 'u2_z', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { u1x, u1y, u1z, u2x, u2y, u2z } = params;
      if (u1x === 0 || u1y === 0 || u1z === 0 || u2x === 0 || u2y === 0 || u2z === 0) return { valid: false, reason: 'u_i ≠ 0' };
      const dot = Math.abs(u1x * u2x + u1y * u2y + u1z * u2z);
      const n1 = u1x * u1x + u1y * u1y + u1z * u1z;
      const n2 = u2x * u2x + u2y * u2y + u2z * u2z;
      const cosVal = dot / Math.sqrt(n1 * n2);
      if (dot === 0 || cosVal >= 0.9999) return { valid: false, reason: 'Tránh góc 0° hoặc 90°' };
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      if (Math.abs(((deg * 100) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh sát ranh giới làm tròn 0,01' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1x, u1y, u1z, u2x, u2y, u2z } = params;
      ` + FMT_HELPERS + String.raw`
      const dot = Math.abs(u1x * u2x + u1y * u2y + u1z * u2z);
      const n1 = u1x * u1x + u1y * u1y + u1z * u1z;
      const n2 = u2x * u2x + u2y * u2y + u2z * u2z;
      const deg = (Math.acos(dot / Math.sqrt(n1 * n2)) * 180) / Math.PI;
      const r = Number(deg.toFixed(2));
      const ansStr = u.formatNumberVN(r, 2);
      const eq1 = fmtCanonLine(-4, 3, -3, u1x, u1y, u1z);
      const eq2 = fmtCanonLine(-1, 0, 1, u2x, u2y, u2z);
      const correct = '$' + ansStr + '^\\circ$';
      const f1 = u.formatNumberVN(Number(Math.max(1.5, Math.abs(r - 21.53)).toFixed(2)), 2);
      const f2 = u.formatNumberVN(Number(Math.max(2.1, Math.min(89.5, r > 45 ? r - 72.04 : r + 24.31)).toFixed(2)), 2);
      const f3 = u.formatNumberVN(Number(Math.max(3.2, Math.abs(90 - r)).toFixed(2)), 2);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + f1 + '^\\circ$', '$' + f2 + '^\\circ$', '$' + f3 + '^\\circ$'],
        rng,
        (k) => '$' + u.formatNumberVN(Number(Math.min(89.5, Math.max(1, (r + k * 5.17) % 89)).toFixed(2)), 2) + '^\\circ$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, góc giữa hai đường thẳng $d: ' + eq1 + '$ và $d\': ' + eq2 + '$ bằng (kết quả làm tròn đến hàng phần trăm):',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$d$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1x, u1y, u1z) + '$; $d\'$ có VTCP $\\overrightarrow{u_2} = ' + u.formatCoord3D(u2x, u2y, u2z) + '$.',
          '$\\cos(d, d\') = \\dfrac{|\\overrightarrow{u_1} \\cdot \\overrightarrow{u_2}|}{|\\overrightarrow{u_1}|\\cdot|\\overrightarrow{u_2}|} = \\dfrac{' + dot + '}{\\sqrt{' + n1 + '}\\cdot\\sqrt{' + n2 + '}} \\Rightarrow (d, d\') \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai đường thẳng vuông góc', params: { u1x: 1, u1y: 2, u1z: -1, u2x: 2, u2y: -1, u2z: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27', params: { u1x: -2, u1y: 5, u1z: 4, u2x: 2, u2y: 3, u2z: -3 }, expectedValid: true },
    ],
  },

  // D28: Góc giữa hai đường thẳng tham số (làm tròn 0,01 độ)
  t12_b15_d28_angle_two_param_lines_mc: {
    id: 't12_b15_d28_angle_two_param_lines_mc',
    name: 'Tính góc giữa hai đường thẳng dạng tham số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Góc giữa hai đường thẳng',
    description: 'Cho hai đường thẳng Δ1, Δ2 dạng tham số. Tính góc giữa hai đường thẳng làm tròn đến hàng phần trăm.',
    conditionSummary: 'u1, u2 ≠ 0, không cùng phương, không vuông góc',
    paramSpecs: [
      { name: 'u1x', label: 'u1_x', min: -5, max: 5, allowZero: false },
      { name: 'u1y', label: 'u1_y', min: -5, max: 5, allowZero: false },
      { name: 'u1z', label: 'u1_z', min: -5, max: 5, allowZero: false },
      { name: 'u2x', label: 'u2_x', min: -5, max: 5, allowZero: false },
      { name: 'u2y', label: 'u2_y', min: -5, max: 5, allowZero: false },
      { name: 'u2z', label: 'u2_z', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { u1x, u1y, u1z, u2x, u2y, u2z } = params;
      if (u1x === 0 || u1y === 0 || u1z === 0 || u2x === 0 || u2y === 0 || u2z === 0) return { valid: false, reason: 'u_i ≠ 0' };
      const dot = Math.abs(u1x * u2x + u1y * u2y + u1z * u2z);
      const n1 = u1x * u1x + u1y * u1y + u1z * u1z;
      const n2 = u2x * u2x + u2y * u2y + u2z * u2z;
      const cosVal = dot / Math.sqrt(n1 * n2);
      if (dot === 0 || cosVal >= 0.9999) return { valid: false, reason: 'Tránh góc 0° hoặc 90°' };
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      if (Math.abs(((deg * 100) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh sát ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1x, u1y, u1z, u2x, u2y, u2z } = params;
      ` + FMT_HELPERS + String.raw`
      const dot = Math.abs(u1x * u2x + u1y * u2y + u1z * u2z);
      const n1 = u1x * u1x + u1y * u1y + u1z * u1z;
      const n2 = u2x * u2x + u2y * u2y + u2z * u2z;
      const deg = (Math.acos(dot / Math.sqrt(n1 * n2)) * 180) / Math.PI;
      const r = Number(deg.toFixed(2));
      const ansStr = u.formatNumberVN(r, 2);
      const eq1 = fmtParamLine(3, 4, -2, u1x, u1y, u1z);
      const eq2 = fmtParamLine(4, 2, 1, u2x, u2y, u2z);
      const correct = '$' + ansStr + '^\\circ$';
      const f1 = u.formatNumberVN(Number(Math.max(1.2, Math.abs(90 - r)).toFixed(2)), 2);
      const f2 = u.formatNumberVN(Number(Math.max(2.3, Math.abs(r - 21.84)).toFixed(2)), 2);
      const f3 = u.formatNumberVN(Number(Math.min(89.2, r + 14.17).toFixed(2)), 2);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + f1 + '^\\circ$', '$' + f2 + '^\\circ$', '$' + f3 + '^\\circ$'],
        rng,
        (k) => '$' + u.formatNumberVN(Number(Math.min(89.5, Math.max(1, (r + k * 4.73) % 89)).toFixed(2)), 2) + '^\\circ$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, góc giữa hai đường thẳng $\\Delta_1: ' + eq1 + '$ và $\\Delta_2: ' + eq2 + '$ bằng (kết quả làm tròn đến hàng phần trăm):',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\Delta_1$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1x, u1y, u1z) + '$; $\\Delta_2$ có VTCP $\\overrightarrow{u_2} = ' + u.formatCoord3D(u2x, u2y, u2z) + '$.',
          '$\\cos(\\Delta_1, \\Delta_2) = \\dfrac{|\\overrightarrow{u_1} \\cdot \\overrightarrow{u_2}|}{|\\overrightarrow{u_1}|\\cdot|\\overrightarrow{u_2}|} = \\dfrac{' + dot + '}{\\sqrt{' + n1 + '}\\cdot\\sqrt{' + n2 + '}} \\Rightarrow (\\Delta_1, \\Delta_2) \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai đường thẳng song song', params: { u1x: 1, u1y: -1, u1z: 2, u2x: 2, u2y: -2, u2z: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28', params: { u1x: 3, u1y: -1, u1z: 1, u2x: -1, u2y: -1, u2z: -4 }, expectedValid: true },
    ],
  },

  // D29: Góc giữa đường thẳng chính tắc Δ1 và đường thẳng tham số Δ2
  t12_b15_d29_angle_canon_param_lines_mc: {
    id: 't12_b15_d29_angle_canon_param_lines_mc',
    name: 'Tính góc giữa đường thẳng chính tắc và đường thẳng tham số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Góc giữa hai đường thẳng',
    description: 'Cho Δ1 dạng chính tắc và Δ2 dạng tham số. Tính góc giữa hai đường thẳng làm tròn đến hàng phần trăm.',
    conditionSummary: 'u1, u2 ≠ 0, không cùng phương, không vuông góc',
    paramSpecs: [
      { name: 'u1x', label: 'u1_x', min: -5, max: 5, allowZero: false },
      { name: 'u1y', label: 'u1_y', min: -5, max: 5, allowZero: false },
      { name: 'u1z', label: 'u1_z', min: -5, max: 5, allowZero: false },
      { name: 'u2x', label: 'u2_x', min: -5, max: 5, allowZero: false },
      { name: 'u2y', label: 'u2_y', min: -5, max: 5, allowZero: false },
      { name: 'u2z', label: 'u2_z', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { u1x, u1y, u1z, u2x, u2y, u2z } = params;
      if (u1x === 0 || u1y === 0 || u1z === 0 || u2x === 0 || u2y === 0 || u2z === 0) return { valid: false, reason: 'u_i ≠ 0' };
      const dot = Math.abs(u1x * u2x + u1y * u2y + u1z * u2z);
      const n1 = u1x * u1x + u1y * u1y + u1z * u1z;
      const n2 = u2x * u2x + u2y * u2y + u2z * u2z;
      const cosVal = dot / Math.sqrt(n1 * n2);
      if (dot === 0 || cosVal >= 0.9999) return { valid: false, reason: 'Tránh góc 0° hoặc 90°' };
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      if (Math.abs(((deg * 100) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh sát ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1x, u1y, u1z, u2x, u2y, u2z } = params;
      ` + FMT_HELPERS + String.raw`
      const dot = Math.abs(u1x * u2x + u1y * u2y + u1z * u2z);
      const n1 = u1x * u1x + u1y * u1y + u1z * u1z;
      const n2 = u2x * u2x + u2y * u2y + u2z * u2z;
      const deg = (Math.acos(dot / Math.sqrt(n1 * n2)) * 180) / Math.PI;
      const r = Number(deg.toFixed(2));
      const ansStr = u.formatNumberVN(r, 2);
      const eq1 = fmtCanonLine(1, -3, 1, u1x, u1y, u1z);
      const eq2 = fmtParamLine(4, -2, -2, u2x, u2y, u2z);
      const correct = '$' + ansStr + '^\\circ$';
      const f1 = u.formatNumberVN(Number(Math.min(88.5, r + 12.3).toFixed(2)), 2);
      const f2 = u.formatNumberVN(Number(Math.max(1.5, Math.abs(90 - r)).toFixed(2)), 2);
      const f3 = u.formatNumberVN(Number(Math.min(89.1, r + 15.06).toFixed(2)), 2);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + f1 + '^\\circ$', '$' + f2 + '^\\circ$', '$' + f3 + '^\\circ$'],
        rng,
        (k) => '$' + u.formatNumberVN(Number(Math.min(89.5, Math.max(1, (r + k * 6.13) % 89)).toFixed(2)), 2) + '^\\circ$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, cho hai đường thẳng $\\Delta_1: ' + eq1 + '$ và $\\Delta_2: ' + eq2 + '$. Góc giữa hai đường thẳng đã cho bằng (kết quả làm tròn đến hàng phần trăm):',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$\\Delta_1$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1x, u1y, u1z) + '$; $\\Delta_2$ có VTCP $\\overrightarrow{u_2} = ' + u.formatCoord3D(u2x, u2y, u2z) + '$.',
          '$\\cos(\\Delta_1, \\Delta_2) = \\dfrac{|\\overrightarrow{u_1} \\cdot \\overrightarrow{u_2}|}{|\\overrightarrow{u_1}|\\cdot|\\overrightarrow{u_2}|} = \\dfrac{' + dot + '}{\\sqrt{' + n1 + '}\\cdot\\sqrt{' + n2 + '}} \\Rightarrow (\\Delta_1, \\Delta_2) \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai đường thẳng vuông góc', params: { u1x: 1, u1y: 1, u1z: -2, u2x: 1, u2y: 1, u2z: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29', params: { u1x: -5, u1y: 2, u1z: -4, u2x: 5, u2y: -4, u2z: 4 }, expectedValid: true },
    ],
  },

  // D30: Góc giữa hai mặt phẳng (R) và (Q)
  t12_b15_d30_angle_two_planes_mc: {
    id: 't12_b15_d30_angle_two_planes_mc',
    name: 'Tính góc giữa hai mặt phẳng trong không gian Oxyz',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Góc giữa hai mặt phẳng',
    description: 'Cho hai mặt phẳng (R) và (Q). Tính góc giữa hai mặt phẳng làm tròn đến hàng phần trăm.',
    conditionSummary: 'n1, n2 không cùng phương, không vuông góc và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'a1', label: 'A1', min: -5, max: 5, allowZero: false },
      { name: 'b1', label: 'B1', min: -5, max: 5, allowZero: false },
      { name: 'c1', label: 'C1', min: -5, max: 5, allowZero: false },
      { name: 'a2', label: 'A2', min: -5, max: 5, allowZero: false },
      { name: 'b2', label: 'B2', min: -5, max: 5, allowZero: false },
      { name: 'c2', label: 'C2', min: -5, max: 5, allowZero: false },
      { name: 'd1', label: 'D1', min: -10, max: 12 },
      { name: 'd2', label: 'D2', min: -10, max: 18 },
    ],
    validateCode: `
      const { a1, b1, c1, a2, b2, c2 } = params;
      if (a1 === 0 || b1 === 0 || c1 === 0 || a2 === 0 || b2 === 0 || c2 === 0) return { valid: false, reason: 'Hệ số VTPT khác 0' };
      const dot = Math.abs(a1 * a2 + b1 * b2 + c1 * c2);
      const n1 = a1 * a1 + b1 * b1 + c1 * c1;
      const n2 = a2 * a2 + b2 * b2 + c2 * c2;
      const cosVal = dot / Math.sqrt(n1 * n2);
      if (dot === 0 || cosVal >= 0.9999) return { valid: false, reason: 'Tránh góc 0° hoặc 90°' };
      const deg = (Math.acos(cosVal) * 180) / Math.PI;
      if (Math.abs(((deg * 100) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh sát ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b1, c1, a2, b2, c2, d1, d2 } = params;
      const dot = Math.abs(a1 * a2 + b1 * b2 + c1 * c2);
      const n1 = a1 * a1 + b1 * b1 + c1 * c1;
      const n2 = a2 * a2 + b2 * b2 + c2 * c2;
      const deg = (Math.acos(dot / Math.sqrt(n1 * n2)) * 180) / Math.PI;
      const r = Number(deg.toFixed(2));
      const ansStr = u.formatNumberVN(r, 2);
      const eq1 = u.formatPlaneEq(a1, b1, c1, d1);
      const eq2 = u.formatPlaneEq(a2, b2, c2, d2);
      const correct = '$' + ansStr + '^\\circ$';
      const f1 = u.formatNumberVN(Number(Math.max(1.2, r - 0.8).toFixed(2)), 2);
      const f2 = u.formatNumberVN(Number(Math.max(2.1, Math.abs(90 - r)).toFixed(2)), 2);
      const f3 = u.formatNumberVN(Number(Math.min(89.5, r + 9).toFixed(2)), 2);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + f1 + '^\\circ$', '$' + f2 + '^\\circ$', '$' + f3 + '^\\circ$'],
        rng,
        (k) => '$' + u.formatNumberVN(Number(Math.min(89.5, Math.max(1, (r + k * 4.19) % 89)).toFixed(2)), 2) + '^\\circ$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, góc giữa hai mặt phẳng $(R): ' + eq1 + '$ và $(Q): ' + eq2 + '$ bằng (kết quả làm tròn đến hàng phần trăm):',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$(R)$ có VTPT $\\overrightarrow{n_1} = ' + u.formatCoord3D(a1, b1, c1) + '$; $(Q)$ có VTPT $\\overrightarrow{n_2} = ' + u.formatCoord3D(a2, b2, c2) + '$.',
          '$\\cos((R), (Q)) = \\dfrac{|\\overrightarrow{n_1} \\cdot \\overrightarrow{n_2}|}{|\\overrightarrow{n_1}|\\cdot|\\overrightarrow{n_2}|} = \\dfrac{' + dot + '}{\\sqrt{' + n1 + '}\\cdot\\sqrt{' + n2 + '}} \\Rightarrow ((R), (Q)) \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai mặt phẳng vuông góc', params: { a1: 1, b1: 1, c1: -2, a2: 1, b2: 1, c2: 1, d1: 2, d2: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30', params: { a1: -4, b1: -3, c1: 3, a2: 3, b2: 3, c2: -4, d1: 8, d2: 17 }, expectedValid: true },
    ],
  },

  // D31: Góc giữa đường thẳng d (tham số) và mặt phẳng (β)
  t12_b15_d31_angle_line_plane_mc: {
    id: 't12_b15_d31_angle_line_plane_mc',
    name: 'Tính góc giữa đường thẳng và mặt phẳng trong không gian Oxyz',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Góc giữa đường thẳng và mặt phẳng',
    description: 'Cho đường thẳng d dạng tham số và mặt phẳng (β). Tính góc giữa d và (β) làm tròn đến hàng phần trăm.',
    conditionSummary: 'u · n ≠ 0 và u, n không cùng phương; tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'u1', label: 'u_x', min: -5, max: 5, allowZero: false },
      { name: 'u2', label: 'u_y', min: -5, max: 5, allowZero: false },
      { name: 'u3', label: 'u_z', min: -5, max: 5, allowZero: false },
      { name: 'nx', label: 'A_(β)', min: -5, max: 5, allowZero: false },
      { name: 'ny', label: 'B_(β)', min: -5, max: 5, allowZero: false },
      { name: 'nz', label: 'C_(β)', min: -5, max: 5, allowZero: false },
      { name: 'D', label: 'D_(β)', min: -8, max: 8 },
    ],
    validateCode: `
      const { u1, u2, u3, nx, ny, nz } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || nx === 0 || ny === 0 || nz === 0) return { valid: false, reason: 'u_i, n_i ≠ 0' };
      const dot = Math.abs(u1 * nx + u2 * ny + u3 * nz);
      const n1 = u1 * u1 + u2 * u2 + u3 * u3;
      const n2 = nx * nx + ny * ny + nz * nz;
      const sinVal = dot / Math.sqrt(n1 * n2);
      if (dot === 0 || sinVal >= 0.9999) return { valid: false, reason: 'Tránh góc 0° hoặc 90°' };
      const deg = (Math.asin(sinVal) * 180) / Math.PI;
      if (Math.abs(((deg * 100) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh sát ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, nx, ny, nz, D } = params;
      ` + FMT_HELPERS + String.raw`
      const dot = Math.abs(u1 * nx + u2 * ny + u3 * nz);
      const n1 = u1 * u1 + u2 * u2 + u3 * u3;
      const n2 = nx * nx + ny * ny + nz * nz;
      const deg = (Math.asin(dot / Math.sqrt(n1 * n2)) * 180) / Math.PI;
      const r = Number(deg.toFixed(2));
      const ansStr = u.formatNumberVN(r, 2);
      const lineEq = fmtParamLine(-3, 1, 4, u1, u2, u3);
      const planeEq = u.formatPlaneEq(nx, ny, nz, D);
      const correct = '$' + ansStr + '^\\circ$';
      const f1 = u.formatNumberVN(Number(Math.max(1.5, Math.abs(90 - r)).toFixed(2)), 2);
      const f2 = u.formatNumberVN(Number(Math.max(2.2, Math.abs(r - 21.95)).toFixed(2)), 2);
      const f3 = u.formatNumberVN(Number(Math.min(88.5, r + 20.85).toFixed(2)), 2);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + f1 + '^\\circ$', '$' + f2 + '^\\circ$', '$' + f3 + '^\\circ$'],
        rng,
        (k) => '$' + u.formatNumberVN(Number(Math.min(89.5, Math.max(1, (r + k * 5.31) % 89)).toFixed(2)), 2) + '^\\circ$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, góc giữa đường thẳng $d: ' + lineEq + '$ và mặt phẳng $(\\beta): ' + planeEq + '$ bằng (kết quả làm tròn đến hàng phần trăm):',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$d$ có VTCP $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$; $(\\beta)$ có VTPT $\\vec{n} = ' + u.formatCoord3D(nx, ny, nz) + '$.',
          '$\\sin(d, (\\beta)) = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}|\\cdot|\\vec{n}|} = \\dfrac{' + dot + '}{\\sqrt{' + n1 + '}\\cdot\\sqrt{' + n2 + '}} \\Rightarrow (d, (\\beta)) \\approx ' + ansStr + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d song song (β)', params: { u1: 1, u2: -1, u3: 1, nx: 1, ny: 2, nz: 1, D: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31', params: { u1: 4, u2: 3, u3: 5, nx: 4, ny: -1, nz: 4, D: 4 }, expectedValid: true },
    ],
  },
};
