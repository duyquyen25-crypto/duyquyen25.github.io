import { MathTemplate } from '../types/math';

const SPHERE_TF_HELPERS = String.raw`
  const fmtSqTerm = (v, c) => (c === 0 ? v + '^{2}' : '\\left(' + u.formatShift(v, -c) + '\\right)^{2}');
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
  const fmtSqrtFrac = (num, den) => {
    const f = u.simplifyFrac(num, den);
    if (f.num <= 0) return '0';
    const prod = f.num * f.den;
    let sq = 1;
    let rem = prod;
    for (let k = 2; k * k <= rem; k++) {
      while (rem % (k * k) === 0) {
        sq *= k;
        rem /= k * k;
      }
    }
    const kFrac = u.simplifyFrac(sq, f.den);
    if (rem === 1) return kFrac.latex;
    if (kFrac.den === 1) {
      return kFrac.num === 1 ? '\\sqrt{' + rem + '}' : kFrac.num + '\\sqrt{' + rem + '}';
    }
    return '\\dfrac{' + (kFrac.num === 1 ? '' : kFrac.num) + '\\sqrt{' + rem + '}}{' + kFrac.den + '}';
  };
`;

export const G12_B17_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D11 (Q11): Đúng-sai mặt cầu khai triển, vị trí điểm E và mặt phẳng tiếp xúc tại H
  t12_b17_d11_sphere_tangent_plane_tf: {
    id: 't12_b17_d11_sphere_tangent_plane_tf',
    name: 'Nhận định tâm, bán kính, vị trí điểm và mặt phẳng tiếp xúc mặt cầu',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Mặt phẳng tiếp xúc mặt cầu',
    description:
      'Cho mặt cầu (S) dạng khai triển đi qua điểm nguyên H. Xét 4 mệnh đề về tâm, bán kính, điểm trong/ngoài và mặt phẳng tiếp xúc tại H.',
    conditionSummary: 'hx^2 + hy^2 + hz^2 >= 9, tọa độ tâm khác 0 và tránh ranh giới trùng mặt cầu cho điểm E',
    paramSpecs: [
      { name: 'a', label: 'Tâm I_x', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Tâm I_y', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Tâm I_z', min: -5, max: 5, allowZero: false },
      { name: 'hx', label: 'x_H - a', min: -5, max: 5, allowZero: false },
      { name: 'hy', label: 'y_H - b', min: 2, max: 9 },
      { name: 'hz', label: 'z_H - c', min: -7, max: -2 },
      { name: 'flagC', label: 'E nằm trong (1) / ngoài (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'Tiếp diện đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c, hx, hy, hz } = params;
      if (a === 0 || b === 0 || c === 0 || hx === 0 || hy === 0 || hz === 0) {
        return { valid: false, reason: 'Các thành phần khác 0 để hệ số mặt phẳng đầy đủ' };
      }
      if (hx * hx + hy * hy + hz * hz < 9) return { valid: false, reason: 'Bán kính R^2 phải >= 9' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, hx, hy, hz, flagC, flagD } = params;
      ` + SPHERE_TF_HELPERS + String.raw`
      const rSq = hx * hx + hy * hy + hz * hz;
      const d = a * a + b * b + c * c - rSq;
      const eqS = fmtSphereGen(-2 * a, -2 * b, -2 * c, d);
      const rLatex = fmtSqrtInt(rSq);

      const xH = a + hx, yH = b + hy, zH = c + hz;
      const planeDTrue = -(hx * xH + hy * yH + hz * zH);
      const planeDShown = flagD === 1 ? planeDTrue : planeDTrue + 1;

      // E either inside (IE^2 < rSq) or outside (IE^2 > rSq)
      const ex = flagC === 1 ? 1 : Math.abs(hx) + 1;
      const ey = flagC === 1 ? 1 : Math.abs(hy) + 3;
      const ez = flagC === 1 ? 1 : 1;
      const xE = a + (flagC === 1 ? 1 : -ex), yE = b + ey, zE = c + ez;
      const ieSq = (xE - a) * (xE - a) + (yE - b) * (yE - b) + (zE - c) * (zE - c);
      const eInside = ieSq < rSq;

      const tfStatements = [
        {
          key: 'a',
          text: 'Tâm của mặt cầu $(S)$ là điểm $I' + u.formatCoord3D(a, b, c) + '$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Bán kính của mặt cầu $(S)$ là $R = ' + rLatex + '$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Điểm $E' + u.formatCoord3D(xE, yE, zE) + '$ nằm trong mặt cầu $(S)$.',
          isTrue: eInside,
        },
        {
          key: 'd',
          text: 'Mặt phẳng $(P)$ tiếp xúc với mặt cầu $(S)$ tại điểm $H' + u.formatCoord3D(xH, yH, zH) + '$ có phương trình là $' + u.formatPlaneEq(hx, hy, hz, planeDShown) + '$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem: 'Trong hệ trục $Oxyz$, cho mặt cầu $(S)$ có phương trình $' + eqS + '$. Xét tính đúng - sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đúng. Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(a, b, c) + '$.',
          'b) Đúng. Bán kính mặt cầu là $R = \\sqrt{(' + a + ')^2 + (' + b + ')^2 + (' + c + ')^2 - (' + d + ')} = ' + rLatex + '$.',
          'c) ' + (eInside ? 'Đúng' : 'Sai') + '. Ta có $IE = \\sqrt{' + ieSq + '} ' + (eInside ? '< ' : '> ') + rLatex + '$ nên điểm $E$ nằm ' + (eInside ? 'trong' : 'ngoài') + ' mặt cầu $(S)$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Mặt phẳng $(P)$ qua $H' + u.formatCoord3D(xH, yH, zH) + '$ nhận $\\overrightarrow{IH} = ' + u.formatCoord3D(hx, hy, hz) + '$ làm véctơ pháp tuyến có phương trình $' + u.formatPlaneEq(hx, hy, hz, planeDTrue) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hx = 0', params: { a: -1, b: -5, c: 2, hx: 0, hy: 9, hz: -7, flagC: 0, flagD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11', params: { a: -1, b: -5, c: 2, hx: -2, hy: 9, hz: -7, flagC: 0, flagD: 0 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Đúng-sai mặt cầu bán kính nguyên và đường tròn giao tuyến với (P)
  t12_b17_d12_sphere_plane_circle_tf: {
    id: 't12_b17_d12_sphere_plane_circle_tf',
    name: 'Mặt cầu bán kính nguyên và giao tuyến với mặt phẳng (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Giao tuyến mặt cầu và mặt phẳng',
    description:
      'Cho mặt cầu (S) bán kính nguyên R và mặt phẳng (P) cắt (S). Đánh giá 4 mệnh đề về tâm, bán kính, vị trí điểm M và bán kính đường tròn giao tuyến.',
    conditionSummary: 'A^2 + B^2 > 0, 0 < d(I,(P)) < R và điểm M không nằm trên mặt cầu',
    paramSpecs: [
      { name: 'a', label: 'Tâm I_x', min: 1, max: 7 },
      { name: 'b', label: 'Tâm I_y', min: 1, max: 7 },
      { name: 'c', label: 'Tâm I_z', min: -3, max: 3 },
      { name: 'R', label: 'Bán kính R', min: 6, max: 12 },
      { name: 'A', label: 'Pháp tuyến A', min: -5, max: 5, allowZero: false },
      { name: 'B', label: 'Pháp tuyến B', min: 1, max: 6 },
      { name: 'C', label: 'Pháp tuyến C', min: -2, max: 2 },
      { name: 'k', label: 'Giá trị |n·I + D|', min: 1, max: 6 },
      { name: 'flagC', label: 'M nằm ngoài (1) / trong (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'r giao tuyến đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { A, B, C, R, k } = params;
      const nSq = A * A + B * B + C * C;
      if (nSq === 0 || k <= 0) return { valid: false, reason: 'Vectơ pháp tuyến và khoảng cách phải khác 0' };
      if (k * k >= nSq * R * R) return { valid: false, reason: 'Mặt phẳng (P) không cắt mặt cầu (S)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, R, A, B, C, k, flagC, flagD } = params;
      ` + SPHERE_TF_HELPERS + String.raw`
      const rSq = R * R;
      const dCoeff = a * a + b * b + c * c - rSq;
      const eqS = fmtSphereGen(-2 * a, -2 * b, -2 * c, dCoeff);
      const planeD = k - (A * a + B * b + C * c);
      const nSq = A * A + B * B + C * C;
      const planeEq = u.formatPlaneEq(A, B, C, planeD);

      const dLatex = fmtSqrtFrac(k * k, nSq);
      const rCircleNum = rSq * nSq - k * k;
      const rCircleTrueLatex = fmtSqrtFrac(rCircleNum, nSq);
      const rCircleShownLatex = flagD === 1 ? rCircleTrueLatex : fmtSqrtFrac(rCircleNum + nSq, nSq);

      const mOffset = flagC === 1 ? [R + 1, 1, 0] : [-Math.min(a, R - 2), 1, 2];
      const xM = a + mOffset[0], yM = b + mOffset[1], zM = c + mOffset[2];
      const imSq = mOffset[0] * mOffset[0] + mOffset[1] * mOffset[1] + mOffset[2] * mOffset[2];
      const mOutside = imSq > rSq;

      const tfStatements = [
        { key: 'a', text: 'Tâm của mặt cầu $(S)$ là điểm $I' + u.formatCoord3D(a, b, c) + '$.', isTrue: true },
        { key: 'b', text: 'Bán kính của mặt cầu $(S)$ là $R = ' + R + '$.', isTrue: true },
        { key: 'c', text: 'Điểm $M' + u.formatCoord3D(xM, yM, zM) + '$ nằm ngoài mặt cầu $(S)$.', isTrue: mOutside },
        {
          key: 'd',
          text: 'Mặt phẳng $(P): ' + planeEq + '$ cắt mặt cầu $(S)$ theo một đường tròn có bán kính bằng $' + rCircleShownLatex + '$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem: 'Trong hệ trục $Oxyz$, cho mặt cầu $(S)$ có phương trình $' + eqS + '$. Xét tính đúng - sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đúng. Tâm của mặt cầu $(S)$ là điểm $I' + u.formatCoord3D(a, b, c) + '$.',
          'b) Đúng. Bán kính của mặt cầu $(S)$ là $R = \\sqrt{' + rSq + '} = ' + R + '$.',
          'c) ' + (mOutside ? 'Đúng' : 'Sai') + '. Ta có $IM = \\sqrt{' + imSq + '} ' + (mOutside ? '> ' : '< ') + R + '$ nên điểm $M$ nằm ' + (mOutside ? 'ngoài' : 'trong') + ' mặt cầu $(S)$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Khoảng cách $d(I, (P)) = ' + dLatex + ' < ' + R + '$. Bán kính đường tròn giao tuyến là $r = \\sqrt{R^2 - d^2} = ' + rCircleTrueLatex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên (P) không cắt (S)', params: { a: 5, b: 4, c: 0, R: 6, A: 1, B: 0, C: 0, k: 8, flagC: 0, flagD: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12', params: { a: 5, b: 4, c: 0, R: 9, A: -4, B: 5, C: 0, k: 3, flagC: 0, flagD: 1 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Trạm thu phát sóng điện thoại di động đặt tại I(xI; yI; zI)
  t12_b17_d13_telecom_tower_sphere_tf: {
    id: 't12_b17_d13_telecom_tower_sphere_tf',
    name: 'Bài toán thực tế trạm thu phát sóng di động và vùng phủ sóng hình cầu',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Ứng dụng thực tế phương trình mặt cầu',
    description:
      'Trạm phát sóng đặt tại I(xI; yI; h/100) với bán kính phủ sóng R km. Đánh giá 4 mệnh đề về phương trình mặt cầu và khả năng thu sóng tại hai vị trí.',
    conditionSummary: 'R >= 4, người dùng và điểm C không nằm sát biên vùng phủ sóng hoặc ranh giới làm tròn .xx5',
    paramSpecs: [
      { name: 'xI', label: 'Tọa độ x_I (km)', min: 3, max: 8 },
      { name: 'yI', label: 'Tọa độ y_I (km)', min: 3, max: 8 },
      { name: 'hCent', label: 'Độ cao 100·z_I (×10 m)', min: 3, max: 9 },
      { name: 'R', label: 'Bán kính phủ sóng R (km)', min: 5, max: 9 },
      { name: 'duy', label: 'Độ lệch tung độ người dùng', min: 2, max: 5 },
      { name: 'dcx', label: 'Độ lệch x của điểm C', min: 1, max: 4 },
      { name: 'dcy', label: 'Độ lệch y của điểm C', min: 1, max: 4 },
      { name: 'flagA', label: 'Khẳng định a đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagC', label: 'Điểm C trong đề là trong (1) / ngoài (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { R, duy, dcx, dcy, hCent } = params;
      if (R < 5 || hCent <= 0) return { valid: false, reason: 'Bán kính và độ cao trạm phải dương' };
      const distU = Math.sqrt(duy * duy + (hCent / 100) * (hCent / 100));
      const distC = Math.sqrt(dcx * dcx + dcy * dcy + 0.0009);
      if (Math.abs(distU - R) < 0.2 || Math.abs(distC - R) < 0.2) {
        return { valid: false, reason: 'Tránh điểm nằm quá sát biên mặt cầu' };
      }
      if (Math.abs(((distC * 100) % 1) - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xI, yI, hCent, R, duy, dcx, dcy, flagA, flagC } = params;
      const zI = hCent / 100;
      const zIStr = u.formatNumberVN(zI, 2);
      const yU = yI - duy;
      const distU = Math.sqrt(duy * duy + zI * zI);
      const distUStr = distU.toFixed(2).replace('.', ',');
      const uInside = distU <= R;

      const xC = xI - dcx, yC = yI - dcy;
      const zC = Math.max(0.01, (hCent - 3) / 100);
      const zCStr = u.formatNumberVN(zC, 2);
      const dz = zC - zI;
      const distC = Math.sqrt(dcx * dcx + dcy * dcy + dz * dz);
      const distCRounded = Number(distC.toFixed(2));
      const distCStr = distCRounded.toFixed(2).replace('.', ',');
      const cInside = distC < R;
      const cOutside = distC > R;

      const aIsTrue = flagA === 1 ? !uInside : !uInside; // Statement always asks "không thể sử dụng dịch vụ"
      const cClaimOutside = flagC === 0;
      const cIsTrue = cClaimOutside ? cOutside : cInside;

      const tfStatements = [
        {
          key: 'a',
          text: 'Nếu người dùng điện thoại ở vị trí có tọa độ $(' + xI + ';\\, ' + yU + ';\\, 0)$ thì không thể sử dụng dịch vụ của trạm thu phát sóng đó.',
          isTrue: !uInside,
        },
        {
          key: 'b',
          text: 'Phương trình mặt cầu $(S)$ để mô tả ranh giới bên ngoài của vùng phủ sóng trong không gian là $(x - ' + xI + ')^2 + (y - ' + yI + ')^2 + (z - ' + zIStr + ')^2 = ' + (R * R) + '$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Điểm $C(' + xC + ';\\, ' + yC + ';\\, ' + zCStr + ')$ nằm ' + (cClaimOutside ? 'ngoài' : 'trong') + ' mặt cầu $(S)$.',
          isTrue: cIsTrue,
        },
        {
          key: 'd',
          text: '$IC = ' + distCStr + '$ (kết quả làm tròn đến hàng phần trăm).',
          isTrue: true,
        },
      ];
      return {
        stem:
          'Trong không gian $Oxyz$ (đơn vị trên mỗi trục tính theo kilômét), một trạm thu phát sóng điện thoại di động được đặt ở vị trí $I(' +
          xI +
          ';\\, ' +
          yI +
          ';\\, ' +
          zIStr +
          ')$. Trạm thu phát sóng đó được thiết kế với bán kính phủ sóng là $' +
          R +
          '\\text{ km}$. Xét tính đúng - sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) ' + (!uInside ? 'Đúng' : 'Sai') + '. Khoảng cách từ người dùng đến trạm phát sóng là $\\sqrt{(' + xI + '-' + xI + ')^2 + (' + yU + '-' + yI + ')^2 + (0-' + zIStr + ')^2} \\approx ' + distUStr + (uInside ? ' < ' : ' > ') + R + '$, nên người dùng ' + (uInside ? 'có thể' : 'không thể') + ' sử dụng dịch vụ.',
          'b) Đúng. Phương trình mặt cầu tâm $I(' + xI + ';\\, ' + yI + ';\\, ' + zIStr + ')$, bán kính $R = ' + R + '$ là $(x - ' + xI + ')^2 + (y - ' + yI + ')^2 + (z - ' + zIStr + ')^2 = ' + (R * R) + '$.',
          'c) ' + (cIsTrue ? 'Đúng' : 'Sai') + '. Ta có $IC = \\sqrt{(' + xC + '-' + xI + ')^2 + (' + yC + '-' + yI + ')^2 + (' + zCStr + '-' + zIStr + ')^2} \\approx ' + distCStr + (cInside ? ' < ' : ' > ') + R + '$, nên điểm $C$ nằm ' + (cInside ? 'trong' : 'ngoài') + ' mặt cầu $(S)$.',
          'd) Đúng. Giá trị $IC \\approx ' + distCStr + '$ km.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều cao zI = 0', params: { xI: 5, yI: 6, hCent: 0, R: 6, duy: 4, dcx: 3, dcy: 1, flagA: 0, flagC: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13', params: { xI: 5, yI: 6, hCent: 5, R: 6, duy: 4, dcx: 3, dcy: 1, flagA: 0, flagC: 0 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Đúng-sai mặt cầu và mặt phẳng cắt nhau: tâm I, R, d(I,P), r giao tuyến, tâm H
  t12_b17_d14_sphere_plane_center_h_tf: {
    id: 't12_b17_d14_sphere_plane_center_h_tf',
    name: 'Mặt cầu cắt mặt phẳng: khoảng cách, bán kính và tâm đường tròn giao tuyến',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Giao tuyến mặt cầu và mặt phẳng',
    description:
      'Cho mặt cầu (S) và mặt phẳng (P). Đánh giá 4 mệnh đề về tâm và bán kính (S), khoảng cách d(I, (P)), bán kính đường tròn giao tuyến và tọa độ tâm H đường tròn giao tuyến.',
    conditionSummary: 'A, B, C ≠ 0 và 0 < d(I, (P)) < R',
    paramSpecs: [
      { name: 'a', label: 'Tâm I_x', min: -3, max: 3 },
      { name: 'b', label: 'Tâm I_y', min: -3, max: 3 },
      { name: 'c', label: 'Tâm I_z', min: -3, max: 3 },
      { name: 'A', label: 'Pháp tuyến A', min: 1, max: 5 },
      { name: 'B', label: 'Pháp tuyến B', min: -4, max: 4, allowZero: false },
      { name: 'C', label: 'Pháp tuyến C', min: -4, max: 4, allowZero: false },
      { name: 'num', label: 'Giá trị |n·I + D|', min: 2, max: 8 },
      { name: 'extra', label: 'R^2 - floor(d^2)', min: 12, max: 90 },
      { name: 'flagC', label: 'r đúng (1) / sai (0)', min: 0, max: 1 },
      { name: 'flagD', label: 'H đúng (1) / sai (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { A, B, C, num, extra } = params;
      if (A === 0 || B === 0 || C === 0 || num <= 0) return { valid: false, reason: 'Các hệ số phải khác 0' };
      const nSq = A * A + B * B + C * C;
      if (num * num >= nSq * (Math.ceil((num * num) / nSq) + extra)) return { valid: false, reason: 'Không thỏa điều kiện cắt' };
      if (extra < 8) return { valid: false, reason: 'R phải lớn hơn hẳn d(I,(P))' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, A, B, C, num, extra, flagC, flagD } = params;
      ` + SPHERE_TF_HELPERS + String.raw`
      const nSq = A * A + B * B + C * C;
      const rSq = Math.ceil((num * num) / nSq) + extra;
      const dCoeff = a * a + b * b + c * c - rSq;
      const eqS = fmtSphereGen(-2 * a, -2 * b, -2 * c, dCoeff);

      // Set n.I + D = num => t = -num / nSq
      const planeD = num - (A * a + B * b + C * c);
      const planeEq = u.formatPlaneEq(A, B, C, planeD);
      const rLatex = fmtSqrtInt(rSq);
      const dLatex = fmtSqrtFrac(num * num, nSq);
      const rCirNum = rSq * nSq - num * num;
      const rCirTrue = fmtSqrtFrac(rCirNum, nSq);
      const rCirShown = flagC === 1 ? rCirTrue : fmtSqrtFrac(rCirNum + nSq, nSq);

      const hx = u.simplifyFrac(a * nSq - num * A, nSq);
      const hy = u.simplifyFrac(b * nSq - num * B, nSq);
      const hz = u.simplifyFrac(c * nSq - num * C, nSq);
      const hyShown = flagD === 1 ? hy : u.simplifyFrac(b * nSq - (num + 1) * B, nSq);
      const hzShown = flagD === 1 ? hz : u.simplifyFrac(c * nSq - (num + 1) * C, nSq);
      const hFrac = u.simplifyFrac(-num, nSq);

      const tfStatements = [
        {
          key: 'a',
          text: 'Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(a, b, c) + '$ và bán kính $R = ' + rLatex + '$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Khoảng cách từ tâm $I$ đến mặt phẳng $(P)$ bằng $' + dLatex + '$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Mặt phẳng $(P)$ cắt mặt cầu $(S)$ theo một đường tròn có bán kính bằng $' + rCirShown + '$.',
          isTrue: flagC === 1,
        },
        {
          key: 'd',
          text: 'Mặt phẳng $(P)$ cắt mặt cầu $(S)$ theo một đường tròn có tâm là điểm $H\\left(' + hx.latex + ';\\, ' + hyShown.latex + ';\\, ' + hzShown.latex + '\\right)$.',
          isTrue: flagD === 1,
        },
      ];
      return {
        stem: 'Trong hệ trục $Oxyz$, cho mặt cầu $(S): ' + eqS + '$ và mặt phẳng $(P): ' + planeEq + '$. Xét tính đúng - sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Đúng. Mặt cầu $(S)$ có tâm $I' + u.formatCoord3D(a, b, c) + '$ và bán kính $R = \\sqrt{' + rSq + '} = ' + rLatex + '$.',
          'b) Đúng. Khoảng cách $d(I, (P)) = \\dfrac{|' + A + '\\cdot(' + a + ') + (' + B + ')\\cdot(' + b + ') + (' + C + ')\\cdot(' + c + ')' + u.formatTrailingConst(planeD) + '|}{\\sqrt{' + nSq + '}} = ' + dLatex + '$.',
          'c) ' + (flagC === 1 ? 'Đúng' : 'Sai') + '. Vì $d(I, (P)) < R$, bán kính đường tròn giao tuyến là $r = \\sqrt{R^2 - d^2} = ' + rCirTrue + '$.',
          'd) ' + (flagD === 1 ? 'Đúng' : 'Sai') + '. Đường thẳng $IH$ qua $I$, VTCP $\\overrightarrow{n_P} = ' + u.formatCoord3D(A, B, C) + '$ cắt $(P)$ tại $t = ' + hFrac.latex + ' \\Rightarrow H\\left(' + hx.latex + ';\\, ' + hy.latex + ';\\, ' + hz.latex + '\\right)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A = 0', params: { a: 2, b: -2, c: -1, A: 0, B: 2, C: -2, num: 6, extra: 118, flagC: 0, flagD: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14', params: { a: 2, b: -2, c: -1, A: 5, B: 2, C: -2, num: 6, extra: 118, flagC: 0, flagD: 0 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Bài toán thực tế ra đa kiểm soát không lưu theo dõi máy bay
  t12_b17_d15_radar_aircraft_tf: {
    id: 't12_b17_d15_radar_aircraft_tf',
    name: 'Bài toán thực tế ra đa phát hiện và theo dõi quỹ đạo máy bay (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế mặt cầu và đường thẳng',
    description:
      'Đài kiểm soát không lưu tại O(0;0;0) có tầm quét bán kính R km. Máy bay xuất phát tại A chuyển động thẳng với vận tốc (vx; vy; 0). Xét phương trình mặt cầu, khoảng cách ngắn nhất và khoảng thời gian máy bay đi vào/ra vùng phủ sóng.',
    conditionSummary: 'Đường bay cắt vùng quét của ra đa (d(O, d) < R - 30), hai nghiệm thời gian t1 < t2 đều dương và không sát số nguyên',
    paramSpecs: [
      { name: 'R', label: 'Tầm quét ra đa R (km)', min: 550, max: 750, step: 50 },
      { name: 'ax', label: 'x_A (km)', min: -1400, max: -900, step: 100 },
      { name: 'ay', label: 'y_A (km)', min: -500, max: 300, step: 100 },
      { name: 'z0', label: 'Độ cao bay z_0 (km)', min: 20, max: 60, step: 10 },
      { name: 'vx', label: 'Vận tốc v_x (km/h)', min: 60, max: 100, step: 10 },
      { name: 'vy', label: 'Vận tốc v_y (km/h)', min: 40, max: 80, step: 10 },
    ],
    validateCode: `
      const { R, ax, ay, z0, vx, vy } = params;
      if (R <= 100 || vx <= 0 || vy <= 0 || z0 <= 0) return { valid: false, reason: 'Các thông số ra đa và vận tốc phải dương' };
      const aCoef = vx * vx + vy * vy;
      const bCoef = 2 * (ax * vx + ay * vy);
      const cCoef = ax * ax + ay * ay + z0 * z0 - R * R;
      const disc = bCoef * bCoef - 4 * aCoef * cCoef;
      if (disc <= 0) return { valid: false, reason: 'Đường bay không cắt mặt cầu ra đa' };
      const t1 = (-bCoef - Math.sqrt(disc)) / (2 * aCoef);
      const t2 = (-bCoef + Math.sqrt(disc)) / (2 * aCoef);
      if (t1 <= 1.05 || t2 <= t1 + 1.5) return { valid: false, reason: 'Cần t1 > 1 và thời gian nằm trong vùng quét đủ lớn' };
      if (Math.abs(t1 - Math.round(t1)) < 0.006 || Math.abs(t2 - Math.round(t2)) < 0.006) {
        return { valid: false, reason: 'Tránh t1 hoặc t2 quá sát đầu mút nguyên của khoảng' };
      }
      const dMin = Math.sqrt(ax * ax + ay * ay + z0 * z0 - (bCoef * bCoef) / (4 * aCoef));
      if (dMin >= R - 30) return { valid: false, reason: 'Cần máy bay đi sâu vào vùng quét ít nhất 30 km' };
      if (Math.abs(((dMin * 100) % 1) - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, ax, ay, z0, vx, vy } = params;
      const aCoef = vx * vx + vy * vy;
      const bCoef = 2 * (ax * vx + ay * vy);
      const cCoef = ax * ax + ay * ay + z0 * z0 - R * R;
      const disc = bCoef * bCoef - 4 * aCoef * cCoef;
      const t1 = (-bCoef - Math.sqrt(disc)) / (2 * aCoef);
      const t2 = (-bCoef + Math.sqrt(disc)) / (2 * aCoef);
      const t1Str = t1.toFixed(2).replace('.', ',');
      const t2Str = t2.toFixed(2).replace('.', ',');
      const dMin = Math.sqrt(ax * ax + ay * ay + z0 * z0 - (bCoef * bCoef) / (4 * aCoef));
      const dMinStr = Number(dMin.toFixed(2)).toFixed(2).replace('.', ',');

      const wrongR = R + 50;
      const loC = Math.floor(t2), hiC = loC + 1;
      const loB = Math.floor(t1), hiB = loB + 1;

      const xLine = u.formatLinear(vx, ax, 't');
      const yLine = u.formatLinear(vy, ay, 't');
      const xCExpr = u.formatLinear(vx, ax, 'c');
      const yCExpr = u.formatLinear(vy, ay, 'c');
      const xBExpr = u.formatLinear(vx, ax, 'b');
      const yBExpr = u.formatLinear(vy, ay, 'b');

      const tfStatements = [
        {
          key: 'a',
          text: 'Phương trình mặt cầu mô tả ranh giới bên ngoài vùng phát sóng của đài kiểm soát không lưu là $x^2 + y^2 + z^2 = ' + wrongR + '^2$.',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Khoảng cách ngắn nhất (làm tròn đến hàng phần trăm) giữa máy bay và đài kiểm soát không lưu là $' + dMinStr + '$ km.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Giả sử $C(' + xCExpr + ';\\, ' + yCExpr + ';\\, ' + z0 + ')$ là vị trí mà máy bay bay ra khỏi màn hình ra đa. Khi đó $c \\in [' + loC + ';\\, ' + hiC + ']$.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Giả sử $B(' + xBExpr + ';\\, ' + yBExpr + ';\\, ' + z0 + ')$ là vị trí sớm nhất mà máy bay xuất hiện trên màn hình ra đa. Khi đó $b \\in [' + loB + ';\\, ' + hiB + ']$.',
          isTrue: true,
        },
      ];
      return {
        stem:
          'Trong không gian với hệ trục tọa độ $Oxyz$ (đơn vị trên mỗi trục là kilômét), đài kiểm soát không lưu ở vị trí $O(0;\\, 0;\\, 0)$ và được thiết kế phát hiện máy bay ở khoảng cách tối đa $' +
          R +
          '\\text{ km}$. Một máy bay đang ở vị trí $A' +
          u.formatCoord3D(ax, ay, z0) +
          '$, chuyển động theo đường thẳng $d$ có phương trình $\\left\\{\\begin{array}{l}x = ' +
          xLine +
          ' \\\\ y = ' +
          yLine +
          ' \\\\ z = ' +
          z0 +
          '\\end{array}\\right.$ ($t \\in \\mathbb{R}$) và hướng về đài kiểm soát không lưu. Xét tính đúng - sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key.toUpperCase() + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Vùng phát hiện của ra đa là mặt cầu tâm $O(0;\\, 0;\\, 0)$, bán kính $' + R + '$ km nên phương trình là $x^2 + y^2 + z^2 = ' + R + '^2$.',
          'b) Đúng. Điểm $M(t)(' + xLine + ';\\, ' + yLine + ';\\, ' + z0 + ') \\in d$ có khoảng cách ngắn nhất tới $O$ bằng $d(O, d) \\approx ' + dMinStr + '$ km.',
          'c) Đúng. Giải phương trình $OM^2 = ' + R + '^2 \\Leftrightarrow ' + aCoef + 't^2' + u.formatTerm(bCoef, 't', false) + u.formatTrailingConst(cCoef) + ' = 0$ được $t_1 \\approx ' + t1Str + '$ và $t_2 \\approx ' + t2Str + '$. Máy bay bay ra khỏi màn hình tại $c = t_2 \\approx ' + t2Str + ' \\in [' + loC + ';\\, ' + hiC + ']$.',
          'd) Đúng. Máy bay bắt đầu xuất hiện trên màn hình tại $b = t_1 \\approx ' + t1Str + ' \\in [' + loB + ';\\, ' + hiB + ']$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tầm quét quá nhỏ không cắt đường bay', params: { R: 200, ax: -1200, ay: -300, z0: 40, vx: 80, vy: 60 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15', params: { R: 650, ax: -1200, ay: -300, z0: 40, vx: 80, vy: 60 }, expectedValid: true },
    ],
  },
};
