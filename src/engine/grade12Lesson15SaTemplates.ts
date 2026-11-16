import { MathTemplate } from '../types/math';

const FMT_HELPERS_SA = String.raw`
  const fmtParamLine = (x0, y0, z0, u1, u2, u3, paramSym = 't') => {
    const lineVar = (vName, p0, vel) => {
      if (p0 === 0 && vel === 0) return vName + ' = 0';
      if (p0 === 0) return vName + ' = ' + u.formatTerm(vel, paramSym, true);
      return vName + ' = ' + p0 + u.formatTerm(vel, paramSym, false);
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

export const G12_B15_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D38 (Q38): Giao điểm H(a;b;c) của đường thẳng d và mặt phẳng (α)
  t12_b15_d38_intersect_line_plane_sa: {
    id: 't12_b15_d38_intersect_line_plane_sa',
    name: 'Tìm tổng tọa độ giao điểm của đường thẳng và mặt phẳng (trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giao điểm đường thẳng và mặt phẳng',
    description: 'Cho đường thẳng d và mặt phẳng (α) cắt nhau tại H(a;b;c). Tính P = a + b + c.',
    conditionSummary: 'u_i, A, B, C ≠ 0; u · n ≠ 0 và t0 nguyên khác 0',
    paramSpecs: [
      { name: 'a', label: 'x_H', min: -6, max: 6 },
      { name: 'b', label: 'y_H', min: -6, max: 6 },
      { name: 'c', label: 'z_H', min: -8, max: 6 },
      { name: 'u1', label: 'u1', min: -4, max: 4, allowZero: false },
      { name: 'u2', label: 'u2', min: -5, max: 5, allowZero: false },
      { name: 'u3', label: 'u3', min: -4, max: 4, allowZero: false },
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
      if (A * u1 + B * u2 + C * u3 === 0) return { valid: false, reason: 'd song song (α)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, u1, u2, u3, A, B, C, t0 } = params;
      ` + FMT_HELPERS_SA + String.raw`
      const x0 = a - t0 * u1, y0 = b - t0 * u2, z0 = c - t0 * u3;
      const D = -(A * a + B * b + C * c);
      const ans = a + b + c;
      const shortAnswer = String(ans);
      const dEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const paramD = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const planeEq = u.formatPlaneEq(A, B, C, D);
      const linX = u.formatLinear(u1, x0, 't');
      const linY = u.formatLinear(u2, y0, 't');
      const linZ = u.formatLinear(u3, z0, 't');
      return {
        stem: 'Trong không gian $Oxyz$, tọa độ giao điểm của đường thẳng $d: ' + dEq + '$ và mặt phẳng $(\\alpha): ' + planeEq + '$ là điểm $H(a;b;c)$. Tính $P = a + b + c$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Đường thẳng $d$ có phương trình tham số là $' + paramD + '$.',
          'Thay vào phương trình $(\\alpha)$: $' + A + '(' + linX + ')' + u.formatTerm(B, '(' + linY + ')', false) + u.formatTerm(C, '(' + linZ + ')', false) + u.formatTrailingConst(D) + ' = 0 \\Rightarrow t = ' + t0 + '$.',
          'Suy ra $H' + u.formatCoord3D(a, b, c) + '$ nên $P = a + b + c = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d song song (α)', params: { a: -3, b: 4, c: -7, u1: 1, u2: -4, u3: 3, A: 1, B: 1, C: 1, t0: -2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q38', params: { a: -3, b: 4, c: -7, u1: 1, u2: -4, u3: 3, A: -3, B: -6, C: -5, t0: -2 }, expectedValid: true },
    ],
  },

  // D39 (Q39): Góc hạ cánh của flycam xuống mặt phẳng sân (Oxy)
  t12_b15_d39_flycam_angle_sa: {
    id: 't12_b15_d39_flycam_angle_sa',
    name: 'Tính góc giữa đường bay thẳng của flycam và mặt phẳng sân (Oxy)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng góc giữa đường thẳng và mặt phẳng',
    description: 'Flycam bay thẳng từ M(xM; yM; zM) xuống vị trí hạ cánh D(xD; yD; 0) trên mặt sân (Oxy). Tính góc hạ cánh làm tròn đến hàng đơn vị.',
    conditionSummary: 'zM > 0, (xD, yD) ≠ (xM, yM); tránh góc sát ranh giới làm tròn .5 độ',
    paramSpecs: [
      { name: 'xM', label: 'x_M', min: -4, max: 6 },
      { name: 'yM', label: 'y_M', min: -6, max: 4 },
      { name: 'zM', label: 'z_M (độ cao)', min: 3, max: 9 },
      { name: 'xD', label: 'x_D', min: -4, max: 6 },
      { name: 'yD', label: 'y_D', min: -4, max: 6 },
    ],
    validateCode: `
      const { xM, yM, zM, xD, yD } = params;
      if (zM <= 0) return { valid: false, reason: 'Độ cao flycam phải dương' };
      const dx = xD - xM, dy = yD - yM;
      if (dx === 0 && dy === 0) return { valid: false, reason: 'D và M không thẳng đứng để tránh góc 90°' };
      const len = Math.sqrt(dx * dx + dy * dy + zM * zM);
      const deg = (Math.asin(zM / len) * 180) / Math.PI;
      if (Math.abs((deg % 1) - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xM, yM, zM, xD, yD } = params;
      const dx = xD - xM, dy = yD - yM, dz = -zM;
      const lenSq = dx * dx + dy * dy + dz * dz;
      const deg = (Math.asin(zM / Math.sqrt(lenSq)) * 180) / Math.PI;
      const rounded = Math.round(deg);
      const shortAnswer = String(rounded);
      const deg1 = u.formatNumberVN(Number(deg.toFixed(1)), 1);
      return {
        stem: 'Người ta gắn hệ trục tọa độ $Oxyz$ (đơn vị đo trên các trục tính theo kilômét) vào một quảng trường, mặt phẳng $(Oxy)$ trùng với mặt sân của quảng trường. Một chiếc flycam ở vị trí $M' + u.formatCoord3D(xM, yM, zM) + '$ chuẩn bị hạ cánh tới vị trí $D' + u.formatCoord3D(xD, yD, 0) + '$. Góc giữa đường thẳng $MD$ (quỹ đạo bay thẳng của flycam) và mặt sân của quảng trường bằng bao nhiêu độ (làm tròn kết quả đến hàng đơn vị)?',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $\\alpha = (MD, (Oxy))$. Đường thẳng $MD$ có vectơ chỉ phương $\\overrightarrow{MD} = ' + u.formatCoord3D(dx, dy, dz) + '$.',
          'Mặt phẳng $(Oxy)$ có vectơ pháp tuyến $\\vec{k} = (0;\\, 0;\\, 1)$.',
          'Ta có $\\sin\\alpha = \\dfrac{|\\overrightarrow{MD} \\cdot \\vec{k}|}{|\\overrightarrow{MD}| \\cdot |\\vec{k}|} = \\dfrac{' + zM + '}{\\sqrt{' + lenSq + '}} \\Rightarrow \\alpha \\approx ' + deg1 + '^\\circ$. Làm tròn đến hàng đơn vị được $' + rounded + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên bay thẳng đứng', params: { xM: 3, yM: 3, zM: 6, xD: 3, yD: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q39', params: { xM: 4, yM: -4, zM: 6, xD: 3, yD: 3 }, expectedValid: true },
    ],
  },

  // D40 (Q40): Đường thẳng Δ' qua C, cắt và vuông góc Δ, tìm giao điểm với (Oxy)
  t12_b15_d40_line_perp_intersect_oxy_sa: {
    id: 't12_b15_d40_line_perp_intersect_oxy_sa',
    name: 'Đường thẳng qua điểm, cắt và vuông góc với Δ, cắt mặt phẳng (Oxy)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng cắt và vuông góc cắt mặt phẳng tọa độ',
    description: 'Đường thẳng Δ\' đi qua C, cắt và vuông góc với Δ, cắt (Oxy) tại A(a;b;c). Tính a + b + c (làm tròn hàng phần mười).',
    conditionSummary: 'u_i ≠ 0; VTCP của Δ\' có thành phần z ≠ 0 để cắt (Oxy); tránh biên làm tròn .x5',
    paramSpecs: [
      { name: 'u1', label: 'u1', min: -3, max: 3, allowZero: false },
      { name: 'u2', label: 'u2', min: 1, max: 6 },
      { name: 'u3', label: 'u3', min: 1, max: 5 },
      { name: 'qx', label: 'Trợ tạo v x', min: -3, max: 3, allowZero: false },
      { name: 'qy', label: 'Trợ tạo v y', min: -3, max: 3, allowZero: false },
      { name: 'xB', label: 'x_B (trên Δ)', min: -5, max: 5 },
      { name: 'yB', label: 'y_B (trên Δ)', min: 2, max: 9 },
      { name: 'zB', label: 'z_B (trên Δ)', min: 2, max: 7 },
      { name: 't0', label: 't0', min: 1, max: 3 },
    ],
    validateCode: `
      const { u1, u2, u3, qx, qy, zB, t0 } = params;
      if (u1 === 0 || u2 <= 0 || u3 <= 0 || qx === 0 || qy === 0 || t0 <= 0) return { valid: false, reason: 'Hệ số khác 0' };
      const vx0 = -u3 * qy, vy0 = u3 * qx, vz0 = u1 * qy - u2 * qx;
      if (vx0 === 0 || vy0 === 0 || vz0 === 0) return { valid: false, reason: "VTCP Δ' phải khác 0 để cắt (Oxy)" };
      const g = u.gcd(vx0, u.gcd(vy0, vz0));
      const vx = vx0 / g, vy = vy0 / g, vz = vz0 / g;
      const zC = zB - vz;
      if (zC === 0) return { valid: false, reason: 'C không nên nằm sẵn trên (Oxy)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, qx, qy, xB, yB, zB, t0 } = params;
      ` + FMT_HELPERS_SA + String.raw`
      const vx0 = -u3 * qy, vy0 = u3 * qx, vz0 = u1 * qy - u2 * qx;
      const g = u.gcd(vx0, u.gcd(vy0, vz0));
      const vx = vx0 / g, vy = vy0 / g, vz = vz0 / g;
      const xC = xB - vx, yC = yB - vy, zC = zB - vz;
      const x0 = xB - t0 * u1, y0 = yB - t0 * u2, z0 = zB - t0 * u3;
      const sNum = -zC;
      const fracS = u.simplifyFrac(sNum, vz);
      const fracAx = u.simplifyFrac(xC * vz + vx * sNum, vz);
      const fracAy = u.simplifyFrac(yC * vz + vy * sNum, vz);
      const fracSum = u.simplifyFrac((xC + yC) * vz + (vx + vy) * sNum, vz);
      const rounded = Number(fracSum.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const deltaEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const primeParam = fmtParamLine(xC, yC, zC, vx, vy, vz);
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta: ' + deltaEq + '$. Đường thẳng $\\Delta\'$ đi qua $C' + u.formatCoord3D(xC, yC, zC) + '$ cắt và vuông góc với đường thẳng $\\Delta$, $\\Delta\'$ cắt mặt phẳng $(Oxy)$ tại điểm $A(a;b;c)$. Tính $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Đường thẳng $\\Delta$ có VTCP $\\overrightarrow{u_1} = ' + u.formatCoord3D(u1, u2, u3) + '$. Gọi $B(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ') = \\Delta \\cap \\Delta\'$.',
          'Từ $\\overrightarrow{CB} \\cdot \\overrightarrow{u_1} = 0$, giải được $t = ' + t0 + ' \\Rightarrow B' + u.formatCoord3D(xB, yB, zB) + '$, suy ra VTCP của $\\Delta\'$ là $\\vec{u} = ' + u.formatCoord3D(vx, vy, vz) + '$.',
          'Phương trình tham số $\\Delta\': ' + primeParam + '$. Giao với $(Oxy)$ ($z = 0$) ứng với $t = ' + fracS.latex + ' \\Rightarrow A\\left(' + fracAx.latex + ';\\,' + fracAy.latex + ';\\,0\\right)$, nên $a + b + c = ' + fracSum.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vz = 0 (Δ\' song song Oxy)', params: { u1: 1, u2: 5, u3: 3, qx: 1, qy: 5, xB: -4, yB: 7, zB: 5, t0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q40', params: { u1: 1, u2: 5, u3: 3, qx: 1, qy: 2, xB: -4, yB: 7, zB: 5, t0: 2 }, expectedValid: true },
    ],
  },

  // D41 (Q41): Hình chiếu vuông góc H(a;b;c) của A lên Δ, tính P = a+b+c (hàng phần mười)
  t12_b15_d41_proj_point_line_sa: {
    id: 't12_b15_d41_proj_point_line_sa',
    name: 'Hình chiếu vuông góc của điểm lên đường thẳng (tổng tọa độ làm tròn phần mười)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hình chiếu vuông góc lên đường thẳng',
    description: 'Cho đường thẳng Δ và điểm A ngoài Δ. Tìm hình chiếu vuông góc H(a;b;c) của A trên Δ và tính P = a + b + c.',
    conditionSummary: 'u_i ≠ 0; A ∉ Δ; tránh biên làm tròn .x5',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -5, max: 6 },
      { name: 'y0', label: 'y0', min: -4, max: 7 },
      { name: 'z0', label: 'z0', min: -4, max: 7 },
      { name: 'u1', label: 'u1', min: -5, max: -1 },
      { name: 'u2', label: 'u2', min: 1, max: 5 },
      { name: 'u3', label: 'u3', min: -5, max: -1 },
      { name: 'xA', label: 'x_A', min: -6, max: 4 },
      { name: 'yA', label: 'y_A', min: -7, max: 4 },
      { name: 'zA', label: 'z_A', min: -5, max: 5 },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3, xA, yA, zA } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) return { valid: false, reason: 'u_i ≠ 0' };
      const dx = x0 - xA, dy = y0 - yA, dz = z0 - zA;
      if (dx * u2 === dy * u1 && dy * u3 === dz * u2) return { valid: false, reason: 'A thuộc Δ' };
      const den = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -(u1 * dx + u2 * dy + u3 * dz);
      const val = ((x0 + y0 + z0) * den + (u1 + u2 + u3) * tNum) / den;
      if (Math.abs((Math.abs(val * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3, xA, yA, zA } = params;
      ` + FMT_HELPERS_SA + String.raw`
      const dx = x0 - xA, dy = y0 - yA, dz = z0 - zA;
      const den = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -(u1 * dx + u2 * dy + u3 * dz);
      const fracT = u.simplifyFrac(tNum, den);
      const fracA = u.simplifyFrac(x0 * den + u1 * tNum, den);
      const fracB = u.simplifyFrac(y0 * den + u2 * tNum, den);
      const fracC = u.simplifyFrac(z0 * den + u3 * tNum, den);
      const fracP = u.simplifyFrac((x0 + y0 + z0) * den + (u1 + u2 + u3) * tNum, den);
      const rounded = Number(fracP.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const deltaEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $\\Delta: ' + deltaEq + '$ và điểm $A' + u.formatCoord3D(xA, yA, zA) + '$. Hình chiếu vuông góc của điểm $A$ trên đường thẳng $\\Delta$ là điểm $H(a;b;c)$. Tính $P = a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Đường thẳng $\\Delta$ có VTCP $\\vec{u} = ' + u.formatCoord3D(u1, u2, u3) + '$. Gọi $H(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ') \\in \\Delta$.',
          'Từ $\\overrightarrow{AH} \\cdot \\vec{u} = 0$, giải được $t = ' + fracT.latex + '$.',
          'Suy ra $H\\left(' + fracA.latex + ';\\,' + fracB.latex + ';\\,' + fracC.latex + '\\right)$ và $P = a + b + c = ' + fracP.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A nằm trên Δ', params: { x0: 4, y0: 6, z0: 6, u1: -3, u2: 1, u3: -2, xA: 4, yA: 6, zA: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q41', params: { x0: 4, y0: 6, z0: 6, u1: -3, u2: 1, u3: -2, xA: -3, yA: -6, zA: -1 }, expectedValid: true },
    ],
  },

  // D42 (Q42): Đường thẳng d' qua F, cắt d, song song (β), cắt (Oxy) tại B(a;b;c)
  t12_b15_d42_line_par_plane_cut_oxy_sa: {
    id: 't12_b15_d42_line_par_plane_cut_oxy_sa',
    name: 'Đường thẳng qua điểm, cắt d, song song (β) và cắt mặt phẳng (Oxy)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng cắt đường thẳng song song mặt phẳng',
    description: 'Đường thẳng d\' đi qua F, cắt d và song song mặt phẳng (β), cắt (Oxy) tại B(a;b;c). Tính a + b + c (làm tròn phần mười).',
    conditionSummary: 'u_d · n_β ≠ 0; các thành phần VTCP d\' khác 0; F ∉ (β); tránh biên làm tròn 0,1',
    paramSpecs: [
      { name: 'u1', label: 'u_d x', min: -5, max: -1 },
      { name: 'u2', label: 'u_d y', min: 1, max: 4 },
      { name: 'u3', label: 'u_d z', min: -5, max: -1 },
      { name: 'nx', label: 'A_(β)', min: 1, max: 3 },
      { name: 'ny', label: 'B_(β)', min: -3, max: -1 },
      { name: 'nz', label: 'C_(β)', min: 1, max: 3 },
      { name: 'qx', label: 'Trợ tạo v x', min: -4, max: 4, allowZero: false },
      { name: 'qy', label: 'Trợ tạo v y', min: -4, max: 4, allowZero: false },
      { name: 't0', label: 't0', min: 1, max: 3 },
    ],
    validateCode: `
      const { u1, u2, u3, nx, ny, nz, qx, qy, t0 } = params;
      if (u1 >= 0 || u2 <= 0 || u3 >= 0 || qx === 0 || qy === 0 || t0 <= 0) return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      if (nx * u1 + ny * u2 + nz * u3 === 0) return { valid: false, reason: 'd song song (β)' };
      const vx0 = -nz * qy, vy0 = nz * qx, vz0 = nx * qy - ny * qx;
      if (vx0 === 0 || vy0 === 0 || vz0 === 0) return { valid: false, reason: "VTCP d' có thành phần bằng 0" };
      const g = u.gcd(vx0, u.gcd(vy0, vz0));
      const vx = vx0 / g, vy = vy0 / g, vz = vz0 / g;
      const xM = -4, yM = 8, zM = 1;
      const xF = xM - vx, yF = yM - vy, zF = zM - vz;
      if (zF === 0) return { valid: false, reason: 'F không nên thuộc (Oxy)' };
      const sumVal = (xF + yF) - zF * (vx + vy) / vz;
      if (Math.abs((Math.abs(sumVal * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, u2, u3, nx, ny, nz, qx, qy, t0 } = params;
      ` + FMT_HELPERS_SA + String.raw`
      const vx0 = -nz * qy, vy0 = nz * qx, vz0 = nx * qy - ny * qx;
      const g = u.gcd(vx0, u.gcd(vy0, vz0));
      const vx = vx0 / g, vy = vy0 / g, vz = vz0 / g;
      const xM = -4, yM = 8, zM = 1;
      const xF = xM - vx, yF = yM - vy, zF = zM - vz;
      const x0 = xM - t0 * u1, y0 = yM - t0 * u2, z0 = zM - t0 * u3;
      const D = -(nx * xF + ny * yF + nz * zF) + 8;
      const sNum = -zF;
      const fracS = u.simplifyFrac(sNum, vz);
      const fracBx = u.simplifyFrac(xF * vz + vx * sNum, vz);
      const fracBy = u.simplifyFrac(yF * vz + vy * sNum, vz);
      const fracSum = u.simplifyFrac((xF + yF) * vz + (vx + vy) * sNum, vz);
      const rounded = Number(fracSum.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const dEq = fmtCanonLine(x0, y0, z0, u1, u2, u3);
      const planeEq = u.formatPlaneEq(nx, ny, nz, D);
      const primeParam = fmtParamLine(xF, yF, zF, vx, vy, vz);
      return {
        stem: 'Trong không gian $Oxyz$, cho đường thẳng $d: ' + dEq + '$. Đường thẳng $d\'$ đi qua $F' + u.formatCoord3D(xF, yF, zF) + '$ cắt đường thẳng $d$ và song song với mặt phẳng $(\\beta): ' + planeEq + '$. Biết $d\'$ cắt mặt phẳng $(Oxy)$ tại điểm $B(a;b;c)$. Tính $a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $M(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ') = d \\cap d\'$. Mặt phẳng $(\\beta)$ có VTPT $\\vec{n} = ' + u.formatCoord3D(nx, ny, nz) + '$.',
          'Do $\\overrightarrow{FM} \\cdot \\vec{n} = 0$, giải được $t = ' + t0 + ' \\Rightarrow M' + u.formatCoord3D(xM, yM, zM) + '$ và VTCP của $d\'$ là $\\vec{u} = ' + u.formatCoord3D(vx, vy, vz) + '$.',
          'Phương trình tham số $d\': ' + primeParam + '$. Giao với $(Oxy)$ ($z = 0$) tại $t = ' + fracS.latex + ' \\Rightarrow B\\left(' + fracBx.latex + ';\\,' + fracBy.latex + ';\\,0\\right)$, suy ra $a + b + c = ' + fracSum.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vz = 0', params: { u1: -5, u2: 2, u3: -4, nx: 1, ny: -1, nz: 1, qx: 2, qy: -2, t0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q42', params: { u1: -5, u2: 2, u3: -4, nx: 1, ny: -1, nz: 1, qx: -2, qy: 5, t0: 2 }, expectedValid: true },
    ],
  },

  // D43 (Q43): Đường ống dẫn dầu trên không - tối ưu tổng độ dài AB + BC + CA
  t12_b15_d43_oil_pipeline_min_path_sa: {
    id: 't12_b15_d43_oil_pipeline_min_path_sa',
    name: 'Bài toán thực tế tối ưu đường dẫn dầu kết hợp đối xứng qua (Oxy)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị khoảng cách và ứng dụng thực tế Oxyz',
    description: 'Đường ống dọc theo đường thẳng d: x = 0, y = t, z = H; điểm trung chuyển A(xA; yA; zA). Tìm B thuộc d và C(m; n; 0) thuộc mặt đất sao cho AB + BC + CA nhỏ nhất. Tính m + n + b.',
    conditionSummary: 'H > zA > 0, xA > 0; tránh ranh giới làm tròn 0,1',
    paramSpecs: [
      { name: 'H', label: 'Độ cao đường ống H (m)', min: 14, max: 30, step: 2 },
      { name: 'xA', label: 'x_A', min: 3, max: 11 },
      { name: 'yA', label: 'y_A', min: 3, max: 12 },
      { name: 'zA', label: 'z_A', min: 4, max: 14 },
    ],
    validateCode: `
      const { H, xA, yA, zA } = params;
      if (H <= zA || zA <= 0 || xA <= 0) return { valid: false, reason: 'Cần 0 < zA < H và xA > 0' };
      const mVal = (H * xA) / (H + zA);
      const ans = mVal + 2 * yA;
      if (Math.abs((Math.abs(ans * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { H, xA, yA, zA } = params;
      ` + FMT_HELPERS_SA + String.raw`
      const dEq = fmtParamLine(0, 0, H, 0, 1, 0);
      const fracM = u.simplifyFrac(H * xA, H + zA);
      const fracAns = u.simplifyFrac(H * xA + 2 * yA * (H + zA), H + zA);
      const rounded = Number(fracAns.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const pipeABz = H - zA;
      const refABz = H + zA;
      return {
        stem: 'Đường ống dẫn dầu trên không là hệ thống đường ống được treo trên các giá đỡ hoặc cột cao, dùng để vận chuyển dầu thô mà không cần chôn dưới lòng đất. Với hệ trục tọa độ $Oxyz$ thích hợp, mặt đất là mặt phẳng $(Oxy)$, đơn vị trên mỗi trục là mét, người ta thiết lập một đường ống dẫn dầu trên không dọc theo đường thẳng $d: ' + dEq + '$. Người ta chọn điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ làm điểm trung chuyển dầu từ mặt đất đến đường ống. Cần xác định vị trí điểm $B(0;\\, b;\\, ' + H + ')$ thuộc đường ống và điểm $C(m;\\, n;\\, 0)$ thuộc mặt đất sao cho tổng độ dài $AB + BC + CA$ nhỏ nhất. Tính $m + n + b$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A\'$ là điểm đối xứng với $A$ qua $(Oxy)$, suy ra $A\'' + u.formatCoord3D(xA, yA, -zA) + '$. Ta có $AB + BC + CA = AB + BC + A\'C \\ge AB + A\'B$.',
          'Đường thẳng $d$ có VTCP $\\vec{j} = (0;\\, 1;\\, 0)$. Cả $AB$ và $A\'B$ cùng đạt nhỏ nhất khi $d \\perp (AA\'B)$, tức $\\overrightarrow{AB} \\cdot \\vec{j} = 0$ với $\\overrightarrow{AB} = (' + (-xA) + ';\\, b - ' + yA + ';\\, ' + pipeABz + ')$, suy ra $b = ' + yA + '$.',
          'Dấu bằng thứ hai xảy ra khi $C = A\'B \\cap (Oxy)$. Với $B(0;\\, ' + yA + ';\\, ' + H + ')$ và $\\overrightarrow{A\'B} = (' + (-xA) + ';\\, 0;\\, ' + refABz + ')$, giao điểm của $A\'B$ với $z = 0$ cho $C\\left(' + fracM.latex + ';\\, ' + yA + ';\\, 0\\right)$.',
          'Vậy $m + n + b = ' + fracM.latex + ' + ' + yA + ' + ' + yA + ' = ' + fracAns.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên zA >= H', params: { H: 14, xA: 5, yA: 7, zA: 14 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q43', params: { H: 20, xA: 5, yA: 7, zA: 10 }, expectedValid: true },
    ],
  },

  // D44 (Q44): Giao điểm mũi khoan CNC 3D và rãnh dẫn hướng
  t12_b15_d44_cnc_drill_intersect_sa: {
    id: 't12_b15_d44_cnc_drill_intersect_sa',
    name: 'Tìm giao điểm trục mũi khoan CNC 3D và đường rãnh dẫn hướng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giao điểm hai đường thẳng trong không gian',
    description: 'Cho hai đường thẳng tham số d1 (trục mũi khoan) và d2 (rãnh dẫn hướng) cắt nhau tại M(a;b;c). Tính S = a + b + c.',
    conditionSummary: 'u1 và u2 không cùng phương; giao điểm M có tọa độ nguyên',
    paramSpecs: [
      { name: 'a', label: 'a (x_M)', min: -6, max: 6 },
      { name: 'b', label: 'b (y_M)', min: -6, max: 6 },
      { name: 'c', label: 'c (z_M)', min: -6, max: 6 },
      { name: 'u1x', label: 'u1_x', min: -4, max: 4, allowZero: false },
      { name: 'u1y', label: 'u1_y', min: -4, max: 4, allowZero: false },
      { name: 'u1z', label: 'u1_z', min: -4, max: 4, allowZero: false },
      { name: 'u2x', label: 'u2_x', min: -4, max: 4, allowZero: false },
      { name: 'u2y', label: 'u2_y', min: -4, max: 4, allowZero: false },
      { name: 'u2z', label: 'u2_z', min: -4, max: 4, allowZero: false },
      { name: 't0', label: 't0', min: -3, max: 3, allowZero: false },
      { name: 's0', label: 's0', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { u1x, u1y, u1z, u2x, u2y, u2z, t0, s0 } = params;
      if (u1x === 0 || u1y === 0 || u1z === 0 || u2x === 0 || u2y === 0 || u2z === 0 || t0 === 0 || s0 === 0) {
        return { valid: false, reason: 'Các hệ số khác 0' };
      }
      const cx = u1y * u2z - u1z * u2y;
      const cy = u1z * u2x - u1x * u2z;
      const cz = u1x * u2y - u1y * u2x;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'Hai đường thẳng song song hoặc trùng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, u1x, u1y, u1z, u2x, u2y, u2z, t0, s0 } = params;
      ` + FMT_HELPERS_SA + String.raw`
      const x1 = a - t0 * u1x, y1 = b - t0 * u1y, z1 = c - t0 * u1z;
      const x2 = a - s0 * u2x, y2 = b - s0 * u2y, z2 = c - s0 * u2z;
      const d1Eq = fmtParamLine(x1, y1, z1, u1x, u1y, u1z, 't');
      const d2Eq = fmtParamLine(x2, y2, z2, u2x, u2y, u2z, 's');
      const ans = a + b + c;
      const shortAnswer = String(ans);
      return {
        stem: 'Trong một phần mềm mô phỏng gia công 3D, người ta gắn khối vật liệu với hệ trục tọa độ $Oxyz$ (đơn vị mm). Trục chuyển động của mũi khoan robot được mô tả bởi đường thẳng $d_1: ' + d1Eq + '$ với $t$ là tham số. Trên bề mặt khối vật liệu có một đường rãnh dẫn hướng mô tả bởi đường thẳng $d_2: ' + d2Eq + '$ với $s$ là tham số. Để khoan đúng kỹ thuật, mũi khoan phải đi qua đúng điểm giao $M(a;b;c)$ của $d_1$ và $d_2$. Tính $S = a + b + c$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Xét hệ phương trình giao điểm giữa $d_1$ và $d_2$: $\\left\\{ \\begin{array}{l} ' + u.formatLinear(u1x, x1, 't') + ' = ' + u.formatLinear(u2x, x2, 's') + ' \\\\ ' + u.formatLinear(u1y, y1, 't') + ' = ' + u.formatLinear(u2y, y2, 's') + ' \\\\ ' + u.formatLinear(u1z, z1, 't') + ' = ' + u.formatLinear(u2z, z2, 's') + ' \\end{array} \\right.$.',
          'Giải hệ được nghiệm duy nhất $t = ' + t0 + ',\\, s = ' + s0 + '$.',
          'Thay $t = ' + t0 + '$ vào $d_1$ thu được giao điểm $M' + u.formatCoord3D(a, b, c) + '$, suy ra $S = a + b + c = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d1, d2 song song', params: { a: -2, b: 1, c: 3, u1x: -3, u1y: -3, u1z: 3, u2x: 1, u2y: 1, u2z: -1, t0: -2, s0: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q44', params: { a: -2, b: 1, c: 3, u1x: -3, u1y: -3, u1z: 3, u2x: 1, u2y: -2, u2z: -2, t0: -2, s0: 1 }, expectedValid: true },
    ],
  },

  // D45 (Q45 + TikZ): Máy dò tín hiệu di chuyển trên đường thẳng d gần máy phát tín hiệu O nhất
  t12_b15_d45_signal_detector_min_dist_sa: {
    id: 't12_b15_d45_signal_detector_min_dist_sa',
    name: 'Tìm vị trí máy dò tín hiệu gần máy phát P nhất trên đường thẳng d',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị khoảng cách từ điểm đến đường thẳng',
    description: 'Máy phát tín hiệu tại gốc O(0;0;0), máy dò di chuyển dọc đường thẳng d. Tìm tâm I(a;b;c) tại thời điểm gần O nhất và tính P = a + b + c.',
    conditionSummary: 'u_i ≠ 0; P0 và u không cùng phương; tránh ranh giới làm tròn 0,1',
    paramSpecs: [
      { name: 'x0', label: 'x0', min: -8, max: 6, allowZero: false },
      { name: 'y0', label: 'y0', min: -6, max: 6, allowZero: false },
      { name: 'z0', label: 'z0', min: -8, max: 6, allowZero: false },
      { name: 'u1', label: 'u1', min: -4, max: 4, allowZero: false },
      { name: 'u2', label: 'u2', min: -4, max: 4, allowZero: false },
      { name: 'u3', label: 'u3', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { x0, y0, z0, u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0 || x0 === 0 || y0 === 0 || z0 === 0) return { valid: false, reason: 'Các hệ số khác 0' };
      const dot = x0 * u1 + y0 * u2 + z0 * u3;
      if (dot === 0) return { valid: false, reason: 't0 = 0 tầm thường' };
      const lenSq = u1 * u1 + u2 * u2 + u3 * u3;
      const tNum = -dot;
      const pVal = (x0 + y0 + z0) + ((u1 + u2 + u3) * tNum) / lenSq;
      if (Math.abs((Math.abs(pVal * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, y0, z0, u1, u2, u3 } = params;
      ` + FMT_HELPERS_SA + String.raw`
      const lenSq = u1 * u1 + u2 * u2 + u3 * u3;
      const bCoef = 2 * (x0 * u1 + y0 * u2 + z0 * u3);
      const cCoef = x0 * x0 + y0 * y0 + z0 * z0;
      const tNum = -(x0 * u1 + y0 * u2 + z0 * u3);
      const fracT = u.simplifyFrac(tNum, lenSq);
      const fracIx = u.simplifyFrac(x0 * lenSq + u1 * tNum, lenSq);
      const fracIy = u.simplifyFrac(y0 * lenSq + u2 * tNum, lenSq);
      const fracIz = u.simplifyFrac(z0 * lenSq + u3 * tNum, lenSq);
      const fracP = u.simplifyFrac((x0 + y0 + z0) * lenSq + (u1 + u2 + u3) * tNum, lenSq);
      const rounded = Number(fracP.value.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const dEq = fmtParamLine(x0, y0, z0, u1, u2, u3);
      const quadStr = u.formatQuadratic(lenSq, bCoef, cCoef, 't');
      return {
        stem: 'Một máy phát tín hiệu $P$ được đặt cố định ở một địa điểm và ta có thể nhận được tín hiệu trong phạm vi một mặt cầu. Một người cầm máy dò tín hiệu $A$ chuyển động trên đường thẳng $d$. Chọn điểm đặt máy phát $P$ làm gốc tọa độ $O$ của hệ trục $Oxyz$, máy dò $A$ di chuyển theo đường thẳng $d: ' + dEq + '$ trong đó $t$ (giờ) là thời gian chuyển động. Mặt cầu giới hạn phạm vi nhận tín hiệu tại thời điểm $A$ gần $P$ nhất có tâm $I(a;b;c)$. Tính $P = a + b + c$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l15_signal_line_3d',
          params: {},
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vị trí máy dò tại thời điểm $t$ là $A(' + u.formatLinear(u1, x0, 't') + ';\\,' + u.formatLinear(u2, y0, 't') + ';\\,' + u.formatLinear(u3, z0, 't') + ')$.',
          'Bình phương khoảng cách $OA^2 = (' + u.formatLinear(u1, x0, 't') + ')^2 + (' + u.formatLinear(u2, y0, 't') + ')^2 + (' + u.formatLinear(u3, z0, 't') + ')^2 = ' + quadStr + '$.',
          'Tam thức bậc hai đạt giá trị nhỏ nhất tại $t_0 = ' + fracT.latex + '$. Khi đó tâm mặt cầu tại thời điểm gần nhất là $I\\left(' + fracIx.latex + ';\\,' + fracIy.latex + ';\\,' + fracIz.latex + '\\right)$.',
          'Vậy $P = a + b + c = ' + fracP.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t0 = 0', params: { x0: 1, y0: 2, z0: 3, u1: 1, u2: 1, u3: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45', params: { x0: -5, y0: -1, z0: -4, u1: -1, u2: -2, u3: -2 }, expectedValid: true },
    ],
  },

  // D46 (Q46): Hai đường hầm X và Y đào thẳng tới điểm gặp nhau E
  t12_b15_d46_two_tunnels_meet_sa: {
    id: 't12_b15_d46_two_tunnels_meet_sa',
    name: 'Bài toán thực tế hai đường hầm thẳng đào gặp nhau tại điểm E trong không gian',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giao điểm hai đường thẳng và ứng dụng vận tốc',
    description: 'Đường hầm X đào từ A qua B với vận tốc vX (m/ngày), đường hầm Y đào từ M qua N cùng tiến tới điểm gặp E (1 đơn vị = 100 m). Tìm vận tốc đào vY để hai đội cùng tới E một ngày.',
    conditionSummary: 'uX, uY không cùng phương; E nằm cùng hướng tiến tới từ A→B và M→N; tránh biên làm tròn 0,1',
    paramSpecs: [
      { name: 'xE', label: 'x_E', min: -3, max: 3 },
      { name: 'yE', label: 'y_E', min: -3, max: 3 },
      { name: 'zE', label: 'z_E', min: -14, max: -6 },
      { name: 'ux1', label: 'uX_x', min: 1, max: 4 },
      { name: 'ux2', label: 'uX_y', min: 1, max: 4 },
      { name: 'ux3', label: 'uX_z', min: -6, max: -2 },
      { name: 'uy1', label: 'uY_x', min: -5, max: -2 },
      { name: 'uy2', label: 'uY_y', min: -4, max: -1 },
      { name: 'uy3', label: 'uY_z', min: 2, max: 5 },
      { name: 'kX', label: 'Số đoạn AE/AB', min: 2, max: 3 },
      { name: 'kY', label: 'Số đoạn ME/uY', min: 2, max: 4 },
      { name: 'vX', label: 'Vận tốc hầm X (m/ngày)', min: 3, max: 6 },
    ],
    validateCode: `
      const { ux1, ux2, ux3, uy1, uy2, uy3, kX, kY, vX } = params;
      if (kX < 2 || kY < 2 || vX <= 0) return { valid: false, reason: 'Tham số phải dương' };
      const cx = ux2 * uy3 - ux3 * uy2;
      const cy = ux3 * uy1 - ux1 * uy3;
      const cz = ux1 * uy2 - ux2 * uy1;
      if (cx === 0 && cy === 0 && cz === 0) return { valid: false, reason: 'Hai đường hầm song song' };
      const lenX = Math.sqrt(ux1 * ux1 + ux2 * ux2 + ux3 * ux3);
      const lenY = Math.sqrt(uy1 * uy1 + uy2 * uy2 + uy3 * uy3);
      const vY = vX * (kY * lenY) / (kX * lenX);
      if (Math.abs((Math.abs(vY * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn 0,1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xE, yE, zE, ux1, ux2, ux3, uy1, uy2, uy3, kX, kY, vX } = params;
      ` + FMT_HELPERS_SA + String.raw`
      const xA = xE - kX * ux1, yA = yE - kX * ux2, zA = zE - kX * ux3;
      const xB = xA + ux1, yB = yA + ux2, zB = zA + ux3;
      const xM = xE - kY * uy1, yM = yE - kY * uy2, zM = zE - kY * uy3;
      const stepN = kY >= 3 ? 2 : 1;
      const xN = xM + stepN * uy1, yN = yM + stepN * uy2, zN = zM + stepN * uy3;
      const lenXSq = ux1 * ux1 + ux2 * ux2 + ux3 * ux3;
      const lenYSq = uy1 * uy1 + uy2 * uy2 + uy3 * uy3;
      const aeMeters = 100 * kX * Math.sqrt(lenXSq);
      const meMeters = 100 * kY * Math.sqrt(lenYSq);
      const tDays = aeMeters / vX;
      const vYExact = vX * (meMeters / aeMeters);
      const rounded = Number(vYExact.toFixed(1));
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const eqX = fmtParamLine(xA, yA, zA, ux1, ux2, ux3, 't');
      const eqY = fmtParamLine(xM, yM, zM, uy1, uy2, uy3, 's');
      return {
        stem: 'Từ điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ một đường hầm thẳng $X$ được đào đi qua $B' + u.formatCoord3D(xB, yB, zB) + '$ với tốc độ đào là $' + vX + '$ m/ngày. Tương tự, một đường hầm thẳng $Y$ được đào từ điểm $M' + u.formatCoord3D(xM, yM, zM) + '$ đi qua điểm $N' + u.formatCoord3D(xN, yN, zN) + '$. Mục tiêu là hai đường hầm gặp nhau tại điểm $E$. Biết mỗi đơn vị trong hệ trục tương ứng với $100$ mét. Hỏi tốc độ đào đường hầm $Y$ bằng bao nhiêu mét mỗi ngày để cả hai cùng đến $E$ trong cùng một ngày (làm tròn đến hàng phần mười)?',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $\\overrightarrow{AB} = ' + u.formatCoord3D(ux1, ux2, ux3) + '$ và $\\overrightarrow{MN}$ cùng phương với $\\vec{v} = ' + u.formatCoord3D(uy1, uy2, uy3) + '$.',
          'Phương trình tham số của đường hầm $X: ' + eqX + '$ và $Y: ' + eqY + '$.',
          'Giải hệ tìm giao điểm được $t = ' + kX + ',\\, s = ' + kY + '$, suy ra giao điểm $E' + u.formatCoord3D(xE, yE, zE) + '$.',
          'Quãng đường $AE = ' + kX + '\\sqrt{' + lenXSq + '} \\cdot 100 \\approx ' + u.formatNumberVN(Number(aeMeters.toFixed(1)), 1) + '$ m; $ME = ' + kY + '\\sqrt{' + lenYSq + '} \\cdot 100 \\approx ' + u.formatNumberVN(Number(meMeters.toFixed(1)), 1) + '$ m.',
          'Thời gian đào của $X$ là $T = \\dfrac{AE}{' + vX + '} \\approx ' + u.formatNumberVN(Number(tDays.toFixed(1)), 1) + '$ ngày. Vận tốc cần của $Y$ là $v = \\dfrac{ME}{T} \\approx ' + shortAnswer + '$ m/ngày.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai đường hầm song song', params: { xE: -1, yE: 1, zE: -11, ux1: 2, ux2: 2, ux3: -4, uy1: -1, uy2: -1, uy3: 2, kX: 2, kY: 3, vX: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46', params: { xE: -1, yE: 1, zE: -11, ux1: 2, ux2: 2, ux3: -5, uy1: -4, uy2: -3, uy3: 3, kX: 2, kY: 3, vX: 4 }, expectedValid: true },
    ],
  },

  // D47 (Q47 + TikZ): Hai chú kiến vàng và nâu đi trên hai đường chéo AD' và DB của hình lập phương
  t12_b15_d47_cube_two_ants_min_dist_sa: {
    id: 't12_b15_d47_cube_two_ants_min_dist_sa',
    name: 'Khoảng cách nhỏ nhất giữa hai chú kiến chuyển động trên hai đường chéo hình lập phương',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị khoảng cách hai chuyển động trong không gian',
    description: 'Cho hình lập phương ABCD.A\'B\'C\'D\' cạnh a. Kiến vàng đi từ A đến D\' với vận tốc v1, kiến nâu đi từ D đến B với vận tốc v2. Tìm thời điểm khoảng cách giữa hai con kiến bé nhất.',
    conditionSummary: 'a, v1, v2 > 0; tránh biên làm tròn hàng đơn vị .5',
    paramSpecs: [
      { name: 'a', label: 'Cạnh hình lập phương a (cm)', min: 6, max: 20, step: 2 },
      { name: 'v1', label: 'Vận tốc kiến vàng v1 (cm/s)', min: 1, max: 5 },
      { name: 'v2', label: 'Vận tốc kiến nâu v2 (cm/s)', min: 1, max: 5 },
    ],
    validateCode: `
      const { a, v1, v2 } = params;
      if (a <= 0 || v1 <= 0 || v2 <= 0) return { valid: false, reason: 'Cạnh và vận tốc phải dương' };
      const denom = v1 * v1 + v1 * v2 + v2 * v2;
      const t0 = (a * Math.SQRT2 * (v1 + v2)) / (2 * denom);
      if (Math.abs((t0 % 1) - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị .5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, v1, v2 } = params;
      const denom = v1 * v1 + v1 * v2 + v2 * v2;
      const sumV = v1 + v2;
      const t0 = (a * Math.SQRT2 * sumV) / (2 * denom);
      const rounded = Math.round(t0);
      const shortAnswer = String(rounded);
      const fracCoef = u.simplifyFrac(a * sumV, 2 * denom);
      const cleanLatex = fracCoef.den === 1
        ? (fracCoef.num === 1 ? '\\sqrt{2}' : fracCoef.num + '\\sqrt{2}')
        : '\\dfrac{' + (fracCoef.num === 1 ? '' : fracCoef.num) + '\\sqrt{2}}{' + fracCoef.den + '}';
      const tMax1 = u.formatNumberVN(Number(((a * Math.SQRT2) / v1).toFixed(1)), 1);
      const tMax2 = u.formatNumberVN(Number(((a * Math.SQRT2) / v2).toFixed(1)), 1);
      const t0Str = u.formatNumberVN(Number(t0.toFixed(4)), 4);
      return {
        stem: 'Cho hình lập phương $ABCD.A\'B\'C\'D\'$ có cạnh bằng $' + a + '$ cm. Giả sử hai chú kiến vàng và nâu xuất phát cùng một lúc tại các vị trí $A$ và $D$; kiến vàng đi thẳng từ $A$ đến $D\'$ với vận tốc $' + v1 + '$ cm/s và kiến nâu đi thẳng từ $D$ đến $B$ với vận tốc $' + v2 + '$ cm/s. Hỏi sau bao nhiêu giây kể từ khi bắt đầu xuất phát, khoảng cách giữa hai con kiến là bé nhất? (Kết quả làm tròn đến hàng đơn vị).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l15_cube_two_ants_3d',
          params: { a },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chọn hệ trục $Oxyz$ với $A(0;0;0)$, $B(' + a + ';0;0)$, $D(0;' + a + ';0)$, $D\'(0;' + a + ';' + a + ')$.',
          'Tại thời điểm $t \\ge 0$ (giây), vị trí kiến vàng trên $AD\'$ là $P(t) = \\left(0;\\, \\dfrac{' + v1 + 't}{\\sqrt{2}};\\, \\dfrac{' + v1 + 't}{\\sqrt{2}}\\right)$ và vị trí kiến nâu trên $DB$ là $Q(t) = \\left(\\dfrac{' + v2 + 't}{\\sqrt{2}};\\, ' + a + ' - \\dfrac{' + v2 + 't}{\\sqrt{2}};\\, 0\\right)$.',
          'Bình phương khoảng cách $d^2(t) = PQ^2 = \\dfrac{(' + v1 + '^2 + ' + v2 + '^2)t^2}{2} + \\dfrac{(' + sumV + 't)^2}{2} - ' + a + '\\sqrt{2} \\cdot ' + sumV + 't + ' + (a * a) + ' = ' + denom + 't^2 - ' + (a * sumV) + '\\sqrt{2}t + ' + (a * a) + '$.',
          'Hàm bậc hai đạt cực tiểu tại $t_0 = \\dfrac{' + (a * sumV) + '\\sqrt{2}}{' + (2 * denom) + '} = ' + cleanLatex + ' \\approx ' + t0Str + '$ giây (cả hai kiến đều đang trên đường đi vì $t_1 = ' + tMax1 + '$ s, $t_2 = ' + tMax2 + '$ s). Làm tròn đến hàng đơn vị được $' + rounded + '$ giây.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, v1: 2, v2: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47', params: { a: 10, v1: 2, v2: 1 }, expectedValid: true },
    ],
  },
};
