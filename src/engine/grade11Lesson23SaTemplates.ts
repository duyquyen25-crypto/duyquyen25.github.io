import { MathTemplate } from '../types/math';

export const G11_B23_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D35 (Q35): Chóp tứ giác đều S.ABCD cạnh đáy u, cạnh bên l -> S_{hình chiếu ΔSAB trên (ABCD)}
  t11_b23_d35_reg_pyr_proj_tri_base_sa: {
    id: 't11_b23_d35_reg_pyr_proj_tri_base_sa',
    name: 'Diện tích hình chiếu của mặt bên lên mặt đáy chóp tứ giác đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp tứ giác đều S.ABCD cạnh đáy u, cạnh bên ℓ. Tính diện tích hình chiếu vuông góc của tam giác SAB lên (ABCD).',
    conditionSummary: 'u ∈ [2; 12], ℓ ∈ [3; 18], ℓ > u/√2 + 0,5',
    paramSpecs: [
      { name: 'u', label: 'Cạnh đáy hình vuông u', min: 2, max: 12 },
      { name: 'ell', label: 'Độ dài cạnh bên ℓ', min: 3, max: 18 },
    ],
    validateCode: `
      const { u: edge, ell } = params;
      if (edge < 2 || edge > 12 || ell < 3 || ell > 18) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (ell <= edge / Math.SQRT2 + 0.5) {
        return { valid: false, reason: 'Cạnh bên phải lớn hơn nửa đường chéo đáy để tồn tại chóp đều' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, ell } = params;
      const area = (edge * edge) / 4;
      const ansStr = Number.isInteger(area)
        ? String(area)
        : String(area).replace('.', ',');

      return {
        stem: 'Cho hình chóp đều $S.ABCD$ có đáy là hình vuông cạnh bằng $' + edge + '$, các cạnh bên đều bằng $' + ell + '$. Tính diện tích hình chiếu vuông góc của tam giác $SAB$ trên mặt phẳng $(ABCD)$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', center: 'O' },
        },
        shortAnswer: ansStr,
        numericValue: area,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $O = AC \\cap BD$. Vì $S.ABCD$ là hình chóp tứ giác đều nên $SO \\perp (ABCD)$.',
          'Hình chiếu vuông góc của tam giác $SAB$ trên mặt phẳng $(ABCD)$ là tam giác $OAB$.',
          'Do $ABCD$ là hình vuông cạnh $' + edge + '$ nên $OAB$ là tam giác vuông cân tại $O$, có diện tích $S_{OAB} = \\dfrac{AB^2}{4} = \\dfrac{' + edge + '^2}{4} = ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ℓ ≤ u/√2 (u=6, ℓ=4)', params: { u: 6, ell: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 (1)', params: { u: 2, ell: 6 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Chóp đều S.ABCD cạnh đáy 2√q, cạnh bên l -> S_{hình chiếu ΔOBC trên (SBC)}
  t11_b23_d36_reg_pyr_proj_tri_face_sa: {
    id: 't11_b23_d36_reg_pyr_proj_tri_face_sa',
    name: 'Diện tích hình chiếu của ΔOBC lên mặt bên (SBC) trong chóp đều (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp đều S.ABCD đáy cạnh 2√q, cạnh bên ℓ. Tính diện tích hình chiếu của ΔOBC lên (SBC), làm tròn hàng phần mười.',
    conditionSummary: 'qIdx ∈ [0; 6] (q ∈ {2,3,5,6,7,10,11}), ℓ ∈ [4; 10], ℓ² ≥ q + 2',
    paramSpecs: [
      { name: 'qIdx', label: 'Chỉ số dưới căn cạnh đáy 2√q (0..6)', min: 0, max: 6 },
      { name: 'ell', label: 'Độ dài cạnh bên ℓ', min: 4, max: 10 },
    ],
    validateCode: `
      const { qIdx, ell } = params;
      const Q_VALS = [2, 3, 5, 6, 7, 10, 11];
      if (qIdx < 0 || qIdx > 6 || ell < 4 || ell > 10) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const q = Q_VALS[qIdx];
      if (ell * ell < q + 2) {
        return { valid: false, reason: 'Cạnh bên quá nhỏ để tồn tại hình chóp đều' };
      }
      const area = (q * Math.sqrt(q)) / Math.sqrt(ell * ell - q);
      const frac = (area * 10) - Math.floor(area * 10);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .05' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { qIdx, ell } = params;
      const Q_VALS = [2, 3, 5, 6, 7, 10, 11];
      const q = Q_VALS[qIdx];
      const sm2 = ell * ell - q;

      const simplifyRad = (n) => {
        let out = 1, rem = n;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) { out *= k; rem /= k * k; }
        }
        return rem === 1
          ? String(out)
          : (out === 1 ? '' : String(out)) + '\\sqrt{' + rem + '}';
      };

      const smTex = simplifyRad(sm2);
      const hmExact = q / Math.sqrt(sm2);
      const areaExact = (q * Math.sqrt(q)) / Math.sqrt(sm2);
      const areaRounded = Math.round(areaExact * 10) / 10;
      const ansStr = areaRounded.toFixed(1).replace('.', ',');

      const fmtApprox = (x) => (Math.round(x * 100) / 100).toFixed(2).replace('.', ',');
      const rSm = (() => {
        let out = 1, rem = sm2;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) { out *= k; rem /= k * k; }
        }
        return { out, rem };
      })();
      const areaTeX = rSm.rem === 1
        ? '\\dfrac{' + q + '\\sqrt{' + q + '}}{' + rSm.out + '} = ' + ansStr
        : '\\dfrac{' + q + '\\sqrt{' + q + '}}{' + smTex + '} \\approx ' + ansStr;

      return {
        stem: 'Cho hình chóp đều $S.ABCD$ có đáy là hình vuông cạnh bằng $2\\sqrt{' + q + '}$, các cạnh bên đều bằng $' + ell + '$. Gọi $O$ là giao điểm của $AC$ và $BD$. Tính diện tích hình chiếu vuông góc của tam giác $OBC$ trên mặt phẳng $(SBC)$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_quad_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', center: 'O' },
        },
        shortAnswer: ansStr,
        numericValue: areaRounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $SO \\perp (ABCD)$. Gọi $M$ là trung điểm của $BC$, kẻ $OH \\perp SM$ ($H \\in SM$). Vì $BC \\perp (SOM) \\Rightarrow BC \\perp OH$, suy ra $OH \\perp (SBC)$.',
          'Hình chiếu vuông góc của tam giác $OBC$ trên $(SBC)$ là tam giác $HBC$.',
          'Ta có $OM = \\sqrt{' + q + '}$, $SM = \\sqrt{SB^2 - MB^2} = \\sqrt{' + ell + '^2 - ' + q + '} = ' + smTex + '$.',
          'Xét tam giác $SOM$ vuông tại $O$: $HM = \\dfrac{OM^2}{SM} = \\dfrac{' + q + '}{' + smTex + '} \\approx ' + fmtApprox(hmExact) + '$.',
          'Vậy $S_{HBC} = \\dfrac{1}{2} \\cdot BC \\cdot HM = \\dfrac{1}{2} \\cdot 2\\sqrt{' + q + '} \\cdot \\dfrac{' + q + '}{' + smTex + '} = ' + areaTeX + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q=10, ℓ=3 (ℓ ngoài miền)', params: { qIdx: 5, ell: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (2,5)', params: { qIdx: 2, ell: 5 }, expectedValid: true },
    ],
  },
};
