import { MathTemplate } from '../types/math';

const FMT_HELPERS_TF = String.raw`
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

export const G12_B15_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D32 (Q32): Đường thẳng chính tắc d: VTCP, điểm thuộc, vuông góc Δ1, giao với (α)
  t12_b15_d32_canon_line_props_tf: {
    id: 't12_b15_d32_canon_line_props_tf',
    name: 'Khảo sát đường thẳng chính tắc (VTCP, điểm thuộc, vuông góc, giao mặt phẳng)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho đường thẳng d dạng chính tắc. Xét 4 mệnh đề đúng/sai về VTCP, điểm thuộc d, đường thẳng vuông góc Δ1 và giao điểm với mặt phẳng (α).',
    conditionSummary: 'u_i ≠ 0; mặt phẳng (α) cắt d tại điểm nguyên C; Δ1 vuông góc d',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -5, max: 5 },
      { name: 'y0', label: 'y0', min: -5, max: 6 },
      { name: 'z0', label: 'z0', min: -5, max: 5 },
      { name: 'u1', label: 'u1', min: -5, max: 5, allowZero: false },
      { name: 'u2', label: 'u2', min: -5, max: 5, allowZero: false },
      { name: 'u3', label: 'u3', min: -5, max: 5, allowZero: false },
      { name: 'qx', label: 'Trợ tạo Δ1 x', min: -4, max: 4, allowZero: false },
      { name: 'qy', label: 'Trợ tạo Δ1 y', min: -4, max: 4, allowZero: false },
      { name: 't0', label: 't giao điểm', min: 1, max: 3 },
      { name: 'A', label: 'A_(α)', min: -5, max: -1 },
      { name: 'B', label: 'B_(α)', min: -6, max: -1 },
      { name: 'C', label: 'C_(α)', min: 1, max: 4 },
    ],
    validateCode: `
      const { u1, u2, u3, qx, qy, t0, A, B, C } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || qx === 0 || qy === 0 || t0 === 0) return { valid: false, reason: 'Hệ số khác 0' };
      const v1 = -u3 * qy, v2 = u3 * qx, v3 = u1 * qy - u2 * qx;
      if (v1 === 0 || v2 === 0 || v3 === 0) return { valid: false, reason: 'VTCP Δ1 khác 0' };
      if (A * u1 + B * u2 + C * u3 === 0) return { valid: false, reason: 'd không cắt (α)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3, qx, qy, t0, A, B, C } = params;
      ` + FMT_HELPERS_TF + String.raw`
      const v1 = -u3 * qy, v2 = u3 * qx, v3 = u1 * qy - u2 * qx;
      const g = u.gcd(v1, u.gcd(v2, v3));
      const w1 = v1 / g, w2 = v2 / g, w3 = v3 / g;
      const xC = x0 + t0 * u1, yC = y0 + t0 * u2, zC = z0 + t0 * u3;
      const D = -(A * xC + B * yC + C * zC);
      const trueSum = xC + yC + zC;
      const fakeSum = trueSum + 3;
      const dEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const paramD = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const delta1Eq = fmtParamLine(4, 2, -1, w1, w2, w3);
      const planeEq = u.formatPlaneEq(A, B, C, D);
      const linX = u.formatLinear(u1, x0, 't');
      const linY = u.formatLinear(u2, y0, 't');
      const linZ = u.formatLinear(u3, z0, 't');
      const xB = x0 + u1, yB = y0 + u2 + 2, zB = z0 + u3;
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + dEq + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements: [
          { key: 'a', text: 'Một vectơ chỉ phương của đường thẳng $d$ là $\\overrightarrow{u} = ' + u.formatCoord3D(-u1, -u2, u3) + '$.', isTrue: false },
          { key: 'b', text: 'Điểm $B' + u.formatCoord3D(xB, yB, zB) + '$ thuộc đường thẳng $d$.', isTrue: false },
          { key: 'c', text: 'Đường thẳng $\\Delta_1: ' + delta1Eq + '$ vuông góc với đường thẳng $d$.', isTrue: true },
          { key: 'd', text: 'Gọi điểm $C(a;b;c)$ là giao điểm của đường thẳng $d$ và mặt phẳng $(\\alpha): ' + planeEq + '$. Khi đó $a + b + c = ' + fakeSum + '$.', isTrue: false },
        ],
        answerSummary: 'a) S, b) S, c) Đ, d) S',
        solutionSteps: [
          'a) Sai. Một vectơ chỉ phương của $d$ là $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ (không cùng phương với $' + u.formatCoord3D(-u1, -u2, u3) + '$).',
          'b) Sai. Thay $x = ' + xB + '$ được $t = 1$, khi đó $y = ' + (y0 + u2) + ' \\ne ' + yB + '$ nên $B \\notin d$.',
          'c) Đúng. $\\Delta_1$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(w1, w2, w3) + '$ và $\\vec{u} \\cdot \\overrightarrow{u_1} = ' + (u1 * w1 + u2 * w2 + u3 * w3) + ' = 0 \\Rightarrow \\Delta_1 \\perp d$.',
          'd) Sai. Viết $d: ' + paramD + '$, thay vào $(\\alpha)$: $' + A + '(' + linX + ')' + u.formatTerm(B, '(' + linY + ')', false) + u.formatTerm(C, '(' + linZ + ')', false) + u.formatTrailingConst(D) + ' = 0 \\Rightarrow t = ' + t0 + ' \\Rightarrow C' + u.formatCoord3D(xC, yC, zC) + '$. Vậy $a + b + c = ' + trueSum + ' \\ne ' + fakeSum + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0', params: { x0: -1, y0: 5, z0: -1, u1: 0, u2: -5, u3: 3, qx: 1, qy: 2, t0: 2, A: -3, B: -6, C: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32', params: { x0: -1, y0: 5, z0: -1, u1: -1, u2: -5, u3: 3, qx: -4, qy: 3, t0: 2, A: -3, B: -6, C: 1 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Đường thẳng tham số d: VTCP, điểm thuộc, song song Δ1, giao với (α)
  t12_b15_d33_param_line_props_tf: {
    id: 't12_b15_d33_param_line_props_tf',
    name: 'Khảo sát đường thẳng tham số (VTCP, điểm thuộc, song song, giao mặt phẳng)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho đường thẳng d dạng tham số. Xét 4 mệnh đề đúng/sai về VTCP, điểm thuộc d, đường thẳng song song Δ1 và giao điểm với mặt phẳng (α).',
    conditionSummary: 'u_i ≠ 0; Δ1 ∥ d (k ≥ 2 và không trùng); (α) cắt d tại điểm nguyên A',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: 1, max: 16 },
      { name: 'y0', label: 'y0', min: 1, max: 12 },
      { name: 'z0', label: 'z0', min: 1, max: 16 },
      { name: 'u1', label: 'u1', min: 1, max: 5 },
      { name: 'u2', label: 'u2', min: 1, max: 4 },
      { name: 'u3', label: 'u3', min: 1, max: 5 },
      { name: 'k', label: 'Hệ số song song k', min: 2, max: 3 },
      { name: 't0', label: 't giao điểm', min: -4, max: -1 },
      { name: 'A', label: 'A_(α)', min: -4, max: -1 },
      { name: 'B', label: 'B_(α)', min: -6, max: -1 },
      { name: 'C', label: 'C_(α)', min: -4, max: -1 },
    ],
    validateCode: `
      const { u1, u2, u3, k, t0, A, B, C } = params;
      if (u1 <= 0 || u2 <= 0 || u3 <= 0 || k < 2 || t0 >= 0) return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      if (A * u1 + B * u2 + C * u3 === 0) return { valid: false, reason: 'd song song (α)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3, k, t0, A, B, C } = params;
      ` + FMT_HELPERS_TF + String.raw`
      const dEq = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const xM = x0 - u1, yM = y0 - u2, zM = z0 - u3;
      const xD = x0 - 5, yD = y0 - 2, zD = z0 - 4;
      const v1 = k * u1, v2 = k * u2, v3 = k * u3;
      const delta1Eq = fmtParamLine(xD, yD, zD, v1, v2, v3);
      const xA = x0 + t0 * u1, yA = y0 + t0 * u2, zA = z0 + t0 * u3;
      const D = -(A * xA + B * yA + C * zA);
      const trueSum = xA + yA + zA;
      const fakeSum = trueSum + 3;
      const planeEq = u.formatPlaneEq(A, B, C, D);
      const linX = u.formatLinear(u1, x0, 't');
      const linY = u.formatLinear(u2, y0, 't');
      const linZ = u.formatLinear(u3, z0, 't');
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + dEq + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements: [
          { key: 'a', text: 'Một vectơ chỉ phương của đường thẳng $d$ là $\\overrightarrow{u} = ' + u.formatCoord3D(u1, u2, u3) + '$.', isTrue: true },
          { key: 'b', text: 'Điểm $M' + u.formatCoord3D(xM, yM, zM) + '$ không thuộc đường thẳng $d$.', isTrue: false },
          { key: 'c', text: 'Đường thẳng $\\Delta_1: ' + delta1Eq + '$ song song với đường thẳng $d$.', isTrue: true },
          { key: 'd', text: 'Gọi điểm $A(a;b;c)$ là giao điểm của đường thẳng $d$ và mặt phẳng $(\\alpha): ' + planeEq + '$. Khi đó $a + b + c = ' + fakeSum + '$.', isTrue: false },
        ],
        answerSummary: 'a) Đ, b) S, c) Đ, d) S',
        solutionSteps: [
          'a) Đúng. Hệ số của $t$ cho một VTCP là $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$.',
          'b) Sai. Với $t = -1$, ta được $x = ' + xM + ',\\, y = ' + yM + ',\\, z = ' + zM + '$ nên $M \\in d$.',
          'c) Đúng. $\\Delta_1$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(v1, v2, v3) + ' = ' + k + '\\vec{u}$ và điểm $D' + u.formatCoord3D(xD, yD, zD) + ' \\notin d$ nên $\\Delta_1 \\parallel d$.',
          'd) Sai. Thay vào $(\\alpha)$: $' + A + '(' + linX + ')' + u.formatTerm(B, '(' + linY + ')', false) + u.formatTerm(C, '(' + linZ + ')', false) + u.formatTrailingConst(D) + ' = 0 \\Rightarrow t = ' + t0 + ' \\Rightarrow A' + u.formatCoord3D(xA, yA, zA) + '$. Vậy $a + b + c = ' + trueSum + ' \\ne ' + fakeSum + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t0 = 0', params: { x0: 15, y0: 9, z0: 14, u1: 3, u2: 1, u3: 3, k: 2, t0: 0, A: -1, B: -6, C: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33', params: { x0: 15, y0: 9, z0: 14, u1: 3, u2: 1, u3: 3, k: 2, t0: -4, A: -1, B: -6, C: -3 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Đường thẳng chính tắc Δ và điểm C: VTCP, điểm không thuộc, mặt phẳng ⊥ Δ, hình chiếu H
  t12_b15_d34_canon_proj_plane_tf: {
    id: 't12_b15_d34_canon_proj_plane_tf',
    name: 'Khảo sát đường thẳng chính tắc (VTCP, điểm thuộc, mặt phẳng vuông góc, hình chiếu)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hình chiếu và mặt phẳng vuông góc đường thẳng',
    description: 'Cho đường thẳng Δ dạng chính tắc và điểm C. Xét 4 mệnh đề đúng/sai (kết quả làm tròn hàng phần mười).',
    conditionSummary: 'u_i ≠ 0; tránh biên làm tròn .x5 cho tổng tọa độ hình chiếu H',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -5, max: 6 },
      { name: 'y0', label: 'y0', min: -5, max: 5 },
      { name: 'z0', label: 'z0', min: -5, max: 5 },
      { name: 'u1', label: 'u1', min: 1, max: 6 },
      { name: 'u2', label: 'u2', min: 2, max: 7 },
      { name: 'u3', label: 'u3', min: -6, max: -1 },
      { name: 'xC', label: 'x_C', min: -5, max: 5 },
      { name: 'yC', label: 'y_C', min: -7, max: 4 },
      { name: 'zC', label: 'z_C', min: -7, max: 4 },
      { name: 'xB', label: 'x_B', min: -3, max: 3 },
      { name: 'yB', label: 'y_B', min: -3, max: 3 },
      { name: 'zB', label: 'z_B', min: -3, max: 3 },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3, xC, yC, zC } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u_i ≠ 0' };
      const dx = x0 - xC, dy = y0 - yC, dz = z0 - zC;
      if (dx * u2 === dy * u1 && dy * u3 === dz * u2) return { valid: false, reason: 'C thuộc Δ' };
      const den = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -(u1 * dx + u2 * dy + u3 * dz);
      const val = ((x0 + y0 + z0) * den + (u1 + u2 + u3) * tNum) / den;
      const frac = Math.abs((Math.abs(val * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3, xC, yC, zC, xB, yB, zB } = params;
      ` + FMT_HELPERS_TF + String.raw`
      const deltaEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const xF = x0 + u1, yF = y0 + u2, zF = z0 + u3 - 2;
      const dPlane = -(u1 * xB + u2 * yB + u3 * zB);
      const planeEq = u.formatPlaneEq(u1, u2, u3, dPlane);
      const dx = x0 - xC, dy = y0 - yC, dz = z0 - zC;
      const den = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -(u1 * dx + u2 * dy + u3 * dz);
      const fracT = u.simplifyFrac(tNum, den);
      const fracP = u.simplifyFrac((x0 + y0 + z0) * den + (u1 + u2 + u3) * tNum, den);
      const sumRounded = Number(fracP.value.toFixed(1));
      const sumStr = u.formatNumberVN(sumRounded, 1);
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta: ' + deltaEq + '$ và điểm $C' + u.formatCoord3D(xC, yC, zC) + '$. Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần mười):',
        tfStatements: [
          { key: 'a', text: 'Một vectơ chỉ phương của đường thẳng $\\Delta$ là $\\overrightarrow{u} = ' + u.formatCoord3D(-u1, -u2, u3) + '$.', isTrue: false },
          { key: 'b', text: 'Điểm $F' + u.formatCoord3D(xF, yF, zF) + '$ không thuộc đường thẳng $\\Delta$.', isTrue: true },
          { key: 'c', text: 'Mặt phẳng đi qua điểm $B' + u.formatCoord3D(xB, yB, zB) + '$ và vuông góc với $\\Delta$ có phương trình là $' + planeEq + '$.', isTrue: true },
          { key: 'd', text: 'Hình chiếu vuông góc của điểm $C$ trên đường thẳng $\\Delta$ là điểm $H(a;b;c)$. Khi đó $a + b + c = ' + sumStr + '$.', isTrue: true },
        ],
        answerSummary: 'a) S, b) Đ, c) Đ, d) Đ',
        solutionSteps: [
          'a) Sai. Một VTCP của $\\Delta$ là $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$, không cùng phương với $' + u.formatCoord3D(-u1, -u2, u3) + '$.',
          'b) Đúng. Thay tọa độ $F' + u.formatCoord3D(xF, yF, zF) + '$ vào $\\Delta$, tỉ số thứ ba khác hai tỉ số đầu nên $F \\notin \\Delta$.',
          'c) Đúng. Mặt phẳng qua $B' + u.formatCoord3D(xB, yB, zB) + '$ nhận $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm VTPT có phương trình $' + planeEq + '$.',
          'd) Đúng. Gọi $H(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ') \\in \\Delta$. Từ $\\overrightarrow{CH} \\cdot \\vec{u} = 0 \\Rightarrow t = ' + fracT.latex + ' \\Rightarrow a + b + c = ' + fracP.latex + ' \\approx ' + sumStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên C thuộc Δ', params: { x0: 3, y0: -3, z0: -1, u1: 5, u2: 7, u3: -6, xC: 3, yC: -3, zC: -1, xB: -1, yB: 2, zB: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34', params: { x0: 3, y0: -3, z0: -1, u1: 5, u2: 7, u3: -6, xC: 4, yC: -6, zC: -6, xB: -1, yB: 2, zB: 1 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Đường thẳng tham số d và điểm B: VTCP, điểm thuộc, mặt phẳng ⊥ d, hình chiếu H
  t12_b15_d35_param_proj_plane_tf: {
    id: 't12_b15_d35_param_proj_plane_tf',
    name: 'Khảo sát đường thẳng tham số (VTCP, điểm thuộc, mặt phẳng vuông góc, hình chiếu)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hình chiếu và mặt phẳng vuông góc đường thẳng',
    description: 'Cho đường thẳng d dạng tham số và điểm B. Xét 4 mệnh đề đúng/sai (các kết quả làm tròn đến hàng phần mười).',
    conditionSummary: 'u_i ≠ 0; B ∉ d; tránh ranh giới làm tròn 0,1 cho tổng tọa độ H',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -5, max: 5 },
      { name: 'y0', label: 'y0', min: -6, max: 4 },
      { name: 'z0', label: 'z0', min: -6, max: 4 },
      { name: 'u1', label: 'u1', min: 1, max: 5 },
      { name: 'u2', label: 'u2', min: 1, max: 4 },
      { name: 'u3', label: 'u3', min: -6, max: -1 },
      { name: 'xB', label: 'x_B', min: -7, max: 4 },
      { name: 'yB', label: 'y_B', min: -7, max: 4 },
      { name: 'zB', label: 'z_B', min: -5, max: 5 },
      { name: 'xN', label: 'x_N', min: -3, max: 4 },
      { name: 'yN', label: 'y_N', min: -4, max: 3 },
      { name: 'zN', label: 'z_N', min: -4, max: 3 },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3, xB, yB, zB } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u_i ≠ 0' };
      const dx = x0 - xB, dy = y0 - yB, dz = z0 - zB;
      if (dx * u2 === dy * u1 && dy * u3 === dz * u2) return { valid: false, reason: 'B thuộc d' };
      const den = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -(u1 * dx + u2 * dy + u3 * dz);
      const val = ((x0 + y0 + z0) * den + (u1 + u2 + u3) * tNum) / den;
      const frac = Math.abs((Math.abs(val * 10) % 1) - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3, xB, yB, zB, xN, yN, zN } = params;
      ` + FMT_HELPERS_TF + String.raw`
      const dEq = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const xG = x0 - 2 * u1, yG = y0 - 2 * u2, zG = z0 - 2 * u3;
      const dPlane = -(u1 * xN + u2 * yN + u3 * zN);
      const planeEq = u.formatPlaneEq(u1, u2, u3, dPlane);
      const dx = x0 - xB, dy = y0 - yB, dz = z0 - zB;
      const den = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -(u1 * dx + u2 * dy + u3 * dz);
      const fracT = u.simplifyFrac(tNum, den);
      const fracP = u.simplifyFrac((x0 + y0 + z0) * den + (u1 + u2 + u3) * tNum, den);
      const sumRounded = Number(fracP.value.toFixed(1));
      const sumStr = u.formatNumberVN(sumRounded, 1);
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + dEq + '$ và điểm $B' + u.formatCoord3D(xB, yB, zB) + '$. Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần mười):',
        tfStatements: [
          { key: 'a', text: 'Một vectơ chỉ phương của đường thẳng $d$ là $\\overrightarrow{u} = ' + u.formatCoord3D(u1, -u2, u3) + '$.', isTrue: false },
          { key: 'b', text: 'Điểm $G' + u.formatCoord3D(xG, yG, zG) + '$ thuộc đường thẳng $d$.', isTrue: true },
          { key: 'c', text: 'Mặt phẳng đi qua điểm $N' + u.formatCoord3D(xN, yN, zN) + '$ và vuông góc với $d$ có phương trình là $' + planeEq + '$.', isTrue: true },
          { key: 'd', text: 'Hình chiếu vuông góc của điểm $B$ trên đường thẳng $d$ là điểm $H(a;b;c)$. Khi đó $a + b + c = ' + sumStr + '$.', isTrue: true },
        ],
        answerSummary: 'a) S, b) Đ, c) Đ, d) Đ',
        solutionSteps: [
          'a) Sai. Một VTCP của $d$ là $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$, không cùng phương với $' + u.formatCoord3D(u1, -u2, u3) + '$.',
          'b) Đúng. Ứng với $t = -2$, ta được $x = ' + xG + ',\\, y = ' + yG + ',\\, z = ' + zG + '$ nên $G \\in d$.',
          'c) Đúng. Mặt phẳng qua $N' + u.formatCoord3D(xN, yN, zN) + '$ nhận $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm VTPT có phương trình $' + planeEq + '$.',
          'd) Đúng. Gọi $H(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ') \\in d$. Từ $\\overrightarrow{BH} \\cdot \\vec{u} = 0 \\Rightarrow t = ' + fracT.latex + ' \\Rightarrow a + b + c = ' + fracP.latex + ' \\approx ' + sumStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B thuộc d', params: { x0: 3, y0: -5, z0: -4, u1: 3, u2: 1, u3: -5, xB: 3, yB: -5, zB: -4, xN: 2, yN: -3, zN: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35', params: { x0: 3, y0: -5, z0: -4, u1: 3, u2: 1, u3: -5, xB: -6, yB: -6, zB: -2, xN: 2, yN: -3, zN: -3 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Đường thẳng chính tắc Δ và mặt phẳng (β): VTPT, điểm không thuộc, PT tham số, giao điểm D
  t12_b15_d36_canon_plane_intersect_tf: {
    id: 't12_b15_d36_canon_plane_intersect_tf',
    name: 'Khảo sát đường thẳng chính tắc và mặt phẳng (VTPT, tham số hóa, giao điểm)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đường thẳng và mặt phẳng trong không gian',
    description: 'Cho đường thẳng Δ dạng chính tắc và mặt phẳng (β). Xét 4 mệnh đề đúng/sai về VTPT của (β), điểm thuộc Δ, phương trình tham số và giao điểm D.',
    conditionSummary: 'u_i, A, B, C ≠ 0; Δ cắt (β) tại điểm nguyên D',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -4, max: 8 },
      { name: 'y0', label: 'y0', min: -4, max: 8 },
      { name: 'z0', label: 'z0', min: -5, max: 5 },
      { name: 'u1', label: 'u1', min: -4, max: 4, allowZero: false },
      { name: 'u2', label: 'u2', min: -5, max: 5, allowZero: false },
      { name: 'u3', label: 'u3', min: -4, max: 4, allowZero: false },
      { name: 'A', label: 'A_(β)', min: -5, max: 6, allowZero: false },
      { name: 'B', label: 'B_(β)', min: -7, max: 5, allowZero: false },
      { name: 'C', label: 'C_(β)', min: -5, max: 6, allowZero: false },
      { name: 't0', label: 't giao điểm', min: 1, max: 4 },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3, A, B, C, t0 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || A === 0 || B === 0 || C === 0 || t0 === 0) return { valid: false, reason: 'Các hệ số khác 0' };
      if (A * u1 + B * u2 + C * u3 === 0) return { valid: false, reason: 'Δ song song hoặc nằm trong (β)' };
      if (x0 === 0 && y0 === 0 && z0 === 0) return { valid: false, reason: 'Tránh trùng điểm gốc O' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3, A, B, C, t0 } = params;
      ` + FMT_HELPERS_TF + String.raw`
      const deltaEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const xD = x0 + t0 * u1, yD = y0 + t0 * u2, zD = z0 + t0 * u3;
      const Dcoef = -(A * xD + B * yD + C * zD);
      const planeEq = u.formatPlaneEq(A, B, C, Dcoef);
      const xB = x0 + u1, yB = y0 + u2, zB = z0 + u3 - 3;
      const wrongParam = fmtParamLine(-x0, -y0, z0 + 2, u1, u2, u3);
      const rightParam = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const trueSum = xD + yD + zD;
      const fakeSum = trueSum + 3;
      const linX = u.formatLinear(u1, x0, 't');
      const linY = u.formatLinear(u2, y0, 't');
      const linZ = u.formatLinear(u3, z0, 't');
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta: ' + deltaEq + '$ và mặt phẳng $(\\beta): ' + planeEq + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements: [
          { key: 'a', text: '$(\\beta)$ có một vectơ pháp tuyến là $\\overrightarrow{n} = ' + u.formatCoord3D(A, B, C) + '$.', isTrue: true },
          { key: 'b', text: 'Điểm $B' + u.formatCoord3D(xB, yB, zB) + '$ không thuộc đường thẳng $\\Delta$.', isTrue: true },
          { key: 'c', text: 'Phương trình tham số của $\\Delta$ là $' + wrongParam + '$.', isTrue: false },
          { key: 'd', text: 'Gọi điểm $D(a;b;c)$ là giao điểm của đường thẳng $\\Delta$ và mặt phẳng $(\\beta): ' + planeEq + '$. Khi đó $a + b + c = ' + fakeSum + '$.', isTrue: false },
        ],
        answerSummary: 'a) Đ, b) Đ, c) S, d) S',
        solutionSteps: [
          'a) Đúng. Mặt phẳng $(\\beta)$ có một VTPT là $\\vec{n} = ' + u.formatCoord3D(A, B, C) + '$.',
          'b) Đúng. Thay tọa độ $B' + u.formatCoord3D(xB, yB, zB) + '$ vào $\\Delta$, tỉ số cuối khác hai tỉ số đầu nên $B \\notin \\Delta$.',
          'c) Sai. $\\Delta$ đi qua $F' + u.formatCoord3D(x0, y0, z0) + '$ và có VTCP $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$ nên phương trình tham số đúng là $' + rightParam + '$.',
          'd) Sai. Thay phương trình tham số vào $(\\beta)$: $' + A + '(' + linX + ')' + u.formatTerm(B, '(' + linY + ')', false) + u.formatTerm(C, '(' + linZ + ')', false) + u.formatTrailingConst(Dcoef) + ' = 0 \\Rightarrow t = ' + t0 + ' \\Rightarrow D' + u.formatCoord3D(xD, yD, zD) + '$. Vậy $a + b + c = ' + trueSum + ' \\ne ' + fakeSum + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên Δ song song (β)', params: { x0: 6, y0: 6, z0: -2, u1: -1, u2: -3, u3: -1, A: 4, B: -2, C: 2, t0: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36', params: { x0: 6, y0: 6, z0: -2, u1: -1, u2: -3, u3: -1, A: 4, B: -6, C: 4, t0: 3 }, expectedValid: true },
    ],
  },

  // D37 (Q37): Máy bay tiếp cận hạ cánh (thời gian, góc tiếp cận, tầm nhìn, xuyên mây)
  t12_b15_d37_aircraft_landing_tf: {
    id: 't12_b15_d37_aircraft_landing_tf',
    name: 'Bài toán thực tế máy bay tiếp cận hạ cánh và xuyên qua đám mây',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng phương trình đường thẳng trong không gian',
    description: 'Máy bay hạ cánh từ A(0;0;h) đến B(0;L;0) với vận tốc v. Xét 4 mệnh đề đúng/sai về thời gian bay, góc tiếp cận, tầm nhìn tới C và độ cao xuyên mặt phẳng đám mây (PQR).',
    conditionSummary: 'h > 0, L > 0, α > 5.2°, giao điểm quỹ đạo với (PQR) nằm phía trên B và tránh biên làm tròn',
    paramSpecs: [
      { name: 'hTenths', label: 'Độ cao h (×0,1 km)', min: 7, max: 11 },
      { name: 'L', label: 'Khoảng cách ngang L (km)', min: 6, max: 10 },
      { name: 'v', label: 'Vận tốc máy bay (km/h)', min: 210, max: 300, step: 15 },
      { name: 'z1Hundredths', label: 'Độ cao xét tầm nhìn (×0,01 km)', min: 10, max: 20, step: 2 },
      { name: 'cy', label: 'Tọa độ đầu đường băng C(0;cy;0)', min: 5, max: 7 },
    ],
    validateCode: `
      const { hTenths, L, v, z1Hundredths, cy } = params;
      const h = hTenths / 10;
      const z1 = z1Hundredths / 100;
      if (h <= 0 || L <= 0 || v <= 0 || z1 >= h || cy >= L) return { valid: false, reason: 'Tham số không hợp lệ' };
      const alpha = (Math.atan(h / L) * 180) / Math.PI;
      if (alpha >= 1.8 && alpha <= 5.15) return { valid: false, reason: 'Góc tiếp cận gần ranh giới 2°–5°' };
      if (alpha <= 5.15) return { valid: false, reason: 'Cần góc tiếp cận > 5° phù hợp bài toán' };
      const ym = L * (1 - z1 / h);
      const mc = Math.hypot(ym - cy, z1);
      if (mc < 0.25) return { valid: false, reason: 'Tầm nhìn MC quá nhỏ' };
      if (Math.abs(((mc * 100) % 1) - 0.5) < 0.04) return { valid: false, reason: 'MC gần biên làm tròn 0,01' };
      // (PQR): -x + y - 3z + 9 = 0 => L*t - 3*h*(1-t) + 9 = 0 => t = (3*h - 9)/(L + 3*h)
      const tCloud = (3 * h - 9) / (L + 3 * h);
      const zCloud = h * (1 - tCloud);
      if (zCloud <= h || Math.abs(((zCloud * 100) % 1) - 0.5) < 0.04) return { valid: false, reason: 'Độ cao xuyên mây không đạt hoặc gần biên làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { hTenths, L, v, z1Hundredths, cy } = params;
      const h = hTenths / 10;
      const z1 = z1Hundredths / 100;
      const ab = Math.sqrt(L * L + h * h);
      const tHour = ab / v;
      const tMin = tHour * 60;
      const tMinClaim = Number((tMin + 0.5).toFixed(1));
      const alpha = (Math.atan(h / L) * 180) / Math.PI;
      const ym = L * (1 - z1 / h);
      const mc = Math.hypot(ym - cy, z1);
      const mcRound = Number(mc.toFixed(2));
      const tCloud = (3 * h - 9) / (L + 3 * h);
      const zCloud = h * (1 - tCloud);
      const zCloudRound = Number(zCloud.toFixed(2));
      const hStr = u.formatNumberVN(h, 1);
      const z1Str = u.formatNumberVN(z1, 2);
      const abStr = u.formatNumberVN(Number(ab.toFixed(2)), 2);
      const tMinStr = u.formatNumberVN(Number(tMin.toFixed(2)), 2);
      const tClaimStr = u.formatNumberVN(tMinClaim, 1);
      const alphaStr = u.formatNumberVN(Number(alpha.toFixed(3)), 3);
      const mcStr = u.formatNumberVN(mcRound, 2);
      const zCloudStr = u.formatNumberVN(zCloudRound, 2);
      return {
        stem: 'Trong không gian $Oxyz$ (đơn vị: km, giờ). Một máy bay đang tiếp cận hạ cánh xuống sân bay nằm trong mặt phẳng $(Oxy)$. Ở thời điểm xét, máy bay ở $A(0;\\, 0;\\, ' + hStr + ')$ và bay thẳng hướng đến $B(0;\\, ' + L + ';\\, 0)$ với vận tốc $' + v + '$ km/h. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements: [
          { key: 'a', text: 'Thời gian bay từ $A$ đến $B$ nếu tốc độ không đổi là $' + tClaimStr + '$ phút.', isTrue: false },
          { key: 'b', text: 'Góc tiếp cận không nằm trong khoảng $2^\\circ$ đến $5^\\circ$.', isTrue: true },
          { key: 'c', text: 'Tại độ cao $' + z1Str + '$ km, nếu phi công nhìn thấy đầu đường băng tại $C(0;\\, ' + cy + ';\\, 0)$ thì tầm nhìn khi đó là khoảng $' + mcStr + '$ km.', isTrue: true },
          { key: 'd', text: 'Mặt phẳng $(PQR)$ với $P(1;\\, 4;\\, 4)$, $Q(2;\\, 2;\\, 3)$, $R(2;\\, -1;\\, 2)$ mô tả đáy của một đám mây. Nếu kéo dài quỹ đạo bay thì máy bay xuyên qua đám mây này ở độ cao khoảng $' + zCloudStr + '$ km.', isTrue: true },
        ],
        answerSummary: 'a) S, b) Đ, c) Đ, d) Đ',
        solutionSteps: [
          'a) Sai. $AB = \\sqrt{' + L + '^2 + ' + hStr + '^2} \\approx ' + abStr + '$ km $\\Rightarrow t = \\dfrac{AB}{' + v + '} \\approx ' + tMinStr + '$ phút $\\ne ' + tClaimStr + '$ phút.',
          'b) Đúng. Góc tiếp cận $\\alpha$ thỏa mãn $\\sin\\alpha = \\dfrac{' + hStr + '}{AB} \\Rightarrow \\alpha \\approx ' + alphaStr + '^\\circ \\notin [2^\\circ; 5^\\circ]$.',
          'c) Đúng. Tại độ cao $z = ' + z1Str + '$ km, tọa độ máy bay là $M(0;\\, ' + u.formatNumberVN(Number(ym.toFixed(2)), 2) + ';\\, ' + z1Str + ')$, suy ra $MC \\approx ' + mcStr + '$ km.',
          'd) Đúng. $\\overrightarrow{PQ} = (1;\\, -2;\\, -1)$, $\\overrightarrow{PR} = (1;\\, -5;\\, -2)$ nên $(PQR)$ có VTPT $\\vec{n} = (-1;\\, 1;\\, -3)$ và phương trình $-x + y - 3z + 9 = 0$. Thay $x = 0,\\, y = ' + L + 't,\\, z = ' + hStr + '(1 - t)$ suy ra độ cao giao điểm là $z \\approx ' + zCloudStr + '$ km.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên góc nằm trong 2°..5°', params: { hTenths: 5, L: 10, v: 240, z1Hundredths: 12, cy: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37', params: { hTenths: 8, L: 8, v: 240, z1Hundredths: 12, cy: 6 }, expectedValid: true },
    ],
  },
};
