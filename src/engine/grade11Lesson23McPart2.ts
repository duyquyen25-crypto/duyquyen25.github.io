import { MathTemplate } from '../types/math';

export const G11_B23_MC_PART2: Record<string, MathTemplate> = {
  // D15 (Q15): Chóp S.CAB đáy đều, SC ⊥ đáy, G là hình chiếu của A trên SB -> SB ⊥ (GAN)
  t11_b23_d15_tri_pyr_equi_two_step_perp_mc: {
    id: 't11_b23_d15_tri_pyr_equi_two_step_perp_mc',
    name: 'Chứng minh cạnh bên vuông góc mặt phẳng qua 2 bước (Chóp tam giác)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Chứng minh cạnh bên SB vuông góc mặt phẳng (GAN) trong hình chóp có đáy là tam giác đều.',
    conditionSummary: 'rot ∈ [0; 2]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: C, 1: A, 2: B)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 2) return { valid: false, reason: 'rot ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          name: 'S.CAB', altV: 'C', m1: 'M', e1: 'AB', m2: 'N', e2: 'CB', m3: 'P', e3: 'CA',
          projFrom: 'A', onLine: 'SB', projPt: 'G', vL: 'C', vF: 'A', vR: 'B',
          correct: '$SB \\perp (GAN)$',
          wrongs: ['$SB \\perp (SCA)$', '$CB \\perp (SCA)$', '$CA \\perp (SBP)$'],
          sol: 'Ta có $AN \\perp CB$ và $AN \\perp SC$ (do $SC \\perp (CAB)$) nên $AN \\perp (SCB) \\Rightarrow SB \\perp AN$. Lại có $SB \\perp AG$ (giả thiết), suy ra $SB \\perp (GAN)$.',
        },
        {
          name: 'S.ABC', altV: 'A', m1: 'M', e1: 'BC', m2: 'N', e2: 'AC', m3: 'P', e3: 'AB',
          projFrom: 'B', onLine: 'SC', projPt: 'H', vL: 'A', vF: 'B', vR: 'C',
          correct: '$SC \\perp (BHN)$',
          wrongs: ['$SC \\perp (SAB)$', '$BC \\perp (SAB)$', '$AB \\perp (SCM)$'],
          sol: 'Ta có $BN \\perp AC$ và $BN \\perp SA$ (do $SA \\perp (ABC)$) nên $BN \\perp (SAC) \\Rightarrow SC \\perp BN$. Lại có $SC \\perp BH$ (giả thiết), suy ra $SC \\perp (BHN)$.',
        },
        {
          name: 'S.BCA', altV: 'B', m1: 'M', e1: 'CA', m2: 'N', e2: 'BA', m3: 'P', e3: 'BC',
          projFrom: 'C', onLine: 'SA', projPt: 'K', vL: 'B', vF: 'C', vR: 'A',
          correct: '$SA \\perp (CKN)$',
          wrongs: ['$SA \\perp (SBC)$', '$CA \\perp (SBC)$', '$BC \\perp (SAM)$'],
          sol: 'Ta có $CN \\perp BA$ và $CN \\perp SB$ (do $SB \\perp (BCA)$) nên $CN \\perp (SBA) \\Rightarrow SA \\perp CN$. Lại có $SA \\perp CK$ (giả thiết), suy ra $SA \\perp (CKN)$.',
        },
      ];
      const item = CASES[rot];
      const base = item.name.slice(2);
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $' + item.name + '$ có đáy là tam giác đều, $S' + item.altV + ' \\perp (' + base + ')$. Gọi $' + item.m1 + ', ' + item.m2 + ', ' + item.m3 + '$ lần lượt là trung điểm của $' + item.e1 + ', ' + item.e2 + ', ' + item.e3 + '$. Gọi $' + item.projPt + '$ là hình chiếu vuông góc của $' + item.projFrom + '$ trên đường thẳng $' + item.onLine + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 3', params: { rot: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (SB⊥(GAN))', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Hai đường thẳng vuông góc trong hình lập phương ABCD.EFGH
  t11_b23_d16_cube_efgh_perp_lines_mc: {
    id: 't11_b23_d16_cube_efgh_perp_lines_mc',
    name: 'Hai đường thẳng vuông góc trong hình lập phương ABCD.EFGH',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Nhận biết cặp đường thẳng vuông góc trong hình lập phương ABCD.EFGH.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Bộ khẳng định (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: '$CG \\perp CD$',
          wrongs: ['$BH \\perp BD$', '$FG \\perp AD$', '$AE \\perp FC$'],
          sol: 'Vì $CDHG$ là hình vuông nên $CG \\perp CD$.',
        },
        {
          correct: '$AE \\perp BD$',
          wrongs: ['$BH \\perp AC$', '$EG \\perp AD$', '$AB \\perp CG$'],
          sol: 'Vì $AE \\perp (ABCD)$ và $BD \\subset (ABCD)$ nên $AE \\perp BD$.',
        },
        {
          correct: '$EG \\perp FH$',
          wrongs: ['$BF \\perp ED$', '$AB \\perp EF$', '$AC \\perp BG$'],
          sol: 'Vì $EFGH$ là hình vuông nên hai đường chéo $EG \\perp FH$.',
        },
        {
          correct: '$AB \\perp FG$',
          wrongs: ['$BC \\perp EH$', '$AC \\perp EF$', '$DG \\perp BF$'],
          sol: 'Vì $FG \\parallel BC$ và $AB \\perp BC$ nên $AB \\perp FG$.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình lập phương $ABCD.EFGH$. Khẳng định nào sau đây đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 3 },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (CG⊥CD)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Hai đường thẳng vuông góc trong hình lập phương ABCD.A_1B_1C_1D_1
  t11_b23_d17_cube_a1b1_perp_lines_mc: {
    id: 't11_b23_d17_cube_a1b1_perp_lines_mc',
    name: 'Hai đường thẳng vuông góc trong hình lập phương ABCD.A₁B₁C₁D₁',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Nhận biết cặp đường thẳng vuông góc trong hình lập phương ABCD.A₁B₁C₁D₁.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Bộ khẳng định (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: '$BC_1 \\perp A_1B_1$',
          wrongs: ['$BD \\perp A_1D_1$', '$B_1C \\perp B_1D_1$', '$B_1C_1 \\perp AD$'],
          sol: 'Vì $A_1B_1 \\perp (BCC_1B_1)$ và $BC_1 \\subset (BCC_1B_1)$ nên $BC_1 \\perp A_1B_1$.',
        },
        {
          correct: '$AD_1 \\perp AB$',
          wrongs: ['$AC \\perp AD$', '$B_1D_1 \\perp A_1D_1$', '$C_1D \\perp CD_1$'],
          sol: 'Vì $AB \\perp (ADD_1A_1)$ và $AD_1 \\subset (ADD_1A_1)$ nên $AD_1 \\perp AB$.',
        },
        {
          correct: '$AC \\perp B_1D_1$',
          wrongs: ['$AB_1 \\perp BC$', '$AC_1 \\perp BD_1$', '$AA_1 \\perp CC_1$'],
          sol: 'Vì $B_1D_1 \\parallel BD$ và $AC \\perp BD$ nên $AC \\perp B_1D_1$.',
        },
        {
          correct: '$CD_1 \\perp AD$',
          wrongs: ['$BD_1 \\perp AC_1$', '$A_1C_1 \\perp A_1B_1$', '$BC \\perp B_1C_1$'],
          sol: 'Vì $AD \\perp (CDD_1C_1)$ và $CD_1 \\subset (CDD_1C_1)$ nên $CD_1 \\perp AD$.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình lập phương $ABCD.A_1B_1C_1D_1$. Khẳng định nào sau đây đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 2 },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (BC₁⊥A₁B₁)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Hai đường thẳng vuông góc trong hình hộp đứng ABCD.A'B'C'D' đáy chữ nhật
  t11_b23_d18_rect_box_perp_lines_mc: {
    id: 't11_b23_d18_rect_box_perp_lines_mc',
    name: 'Hai đường thẳng vuông góc trong hình hộp đứng đáy chữ nhật',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Nhận biết cặp đường thẳng vuông góc trong hình hộp đứng ABCD.A\'B\'C\'D\' có đáy là hình chữ nhật.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Bộ khẳng định (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: "$BC' \\perp C'D'$",
          wrongs: ["$B'D' \\perp AC$", "$DA' \\perp A'B$", "$AA' \\perp CC'$"],
          sol: "Vì $C'D' \\perp (BCC'B')$ và $BC' \\subset (BCC'B')$ nên $BC' \\perp C'D'$.",
        },
        {
          correct: "$AD' \\perp A'B'$",
          wrongs: ["$A'C' \\perp BD$", "$B'C \\perp BC'$", "$BB' \\perp DD'$"],
          sol: "Vì $A'B' \\perp (ADD'A')$ và $AD' \\subset (ADD'A')$ nên $AD' \\perp A'B'$.",
        },
        {
          correct: "$CD' \\perp BC$",
          wrongs: ["$AC \\perp BD$", "$A'B \\perp B'C$", "$AB \\perp CD$"],
          sol: "Vì $BC \\perp (CDD'C')$ và $CD' \\subset (CDD'C')$ nên $CD' \\perp BC$.",
        },
        {
          correct: "$AB' \\perp AD$",
          wrongs: ["$AC' \\perp BD$", "$BD \\perp A'D'$", "$AD \\perp BC$"],
          sol: "Vì $AD \\perp (ABB'A')$ và $AB' \\subset (ABB'A')$ nên $AB' \\perp AD$.",
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: "Cho hình hộp đứng $ABCD.A'B'C'D'$ có đáy là hình chữ nhật. Khẳng định nào sau đây đúng?",
        diagram: {
          kind: 'geometry_figure',
          figureType: 'box_3d',
          params: { variant: 1 },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (BC\'⊥C\'D\')', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Chóp S.CAB đáy đều, SC ⊥ đáy, G hình chiếu C trên SM -> CG ⊥ SB
  t11_b23_d19_tri_pyr_equi_line_perp_edge_mc: {
    id: 't11_b23_d19_tri_pyr_equi_line_perp_edge_mc',
    name: 'Chứng minh đường cao tam giác mặt trung gian vuông góc cạnh bên',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Chứng minh CG ⊥ SB bằng cách chứng minh CG ⊥ (SAB) trong chóp đáy tam giác đều.',
    conditionSummary: 'rot ∈ [0; 2]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: C, 1: A, 2: B)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 2) return { valid: false, reason: 'rot ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          name: 'S.CAB', altV: 'C', m1: 'M', e1: 'AB', m2: 'N', e2: 'CB', m3: 'P', e3: 'CA',
          projPt: 'G', onLine: 'SM', sideFace: 'SAB', vL: 'C', vF: 'A', vR: 'B',
          correct: '$CG \\perp SB$',
          wrongs: ['$SN \\perp CA$', '$SN \\perp AB$', '$SP \\perp CB$'],
          sol: 'Ta có $AB \\perp CM$ và $AB \\perp SC$ (do $SC \\perp (CAB)$) nên $AB \\perp (SCM) \\Rightarrow CG \\perp AB$. Lại có $CG \\perp SM$ (giả thiết), suy ra $CG \\perp (SAB) \\Rightarrow CG \\perp SB$.',
        },
        {
          name: 'S.ABC', altV: 'A', m1: 'M', e1: 'BC', m2: 'N', e2: 'AC', m3: 'P', e3: 'AB',
          projPt: 'H', onLine: 'SM', sideFace: 'SBC', vL: 'A', vF: 'B', vR: 'C',
          correct: '$AH \\perp SC$',
          wrongs: ['$SN \\perp AB$', '$SN \\perp BC$', '$SP \\perp AC$'],
          sol: 'Ta có $BC \\perp AM$ và $BC \\perp SA$ (do $SA \\perp (ABC)$) nên $BC \\perp (SAM) \\Rightarrow AH \\perp BC$. Lại có $AH \\perp SM$ (giả thiết), suy ra $AH \\perp (SBC) \\Rightarrow AH \\perp SC$.',
        },
        {
          name: 'S.BCA', altV: 'B', m1: 'M', e1: 'CA', m2: 'N', e2: 'BA', m3: 'P', e3: 'BC',
          projPt: 'K', onLine: 'SM', sideFace: 'SCA', vL: 'B', vF: 'C', vR: 'A',
          correct: '$BK \\perp SA$',
          wrongs: ['$SN \\perp BC$', '$SN \\perp CA$', '$SP \\perp BA$'],
          sol: 'Ta có $CA \\perp BM$ và $CA \\perp SB$ (do $SB \\perp (BCA)$) nên $CA \\perp (SBM) \\Rightarrow BK \\perp CA$. Lại có $BK \\perp SM$ (giả thiết), suy ra $BK \\perp (SCA) \\Rightarrow BK \\perp SA$.',
        },
      ];
      const item = CASES[rot];
      const base = item.name.slice(2);
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho hình chóp $' + item.name + '$ có đáy là tam giác đều, $S' + item.altV + ' \\perp (' + base + ')$. Gọi $' + item.m1 + ', ' + item.m2 + ', ' + item.m3 + '$ lần lượt là trung điểm của $' + item.e1 + ', ' + item.e2 + ', ' + item.e3 + '$. Gọi $' + item.projPt + '$ là hình chiếu vuông góc của $' + item.altV + '$ trên đường thẳng $' + item.onLine + '$. Tìm khẳng định đúng?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 3', params: { rot: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (CG⊥SB)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Hình chiếu điểm P (trung điểm CD) trên mặt phẳng (SAB) là H (trung điểm AB)
  t11_b23_d20_proj_point_square_mid_mc: {
    id: 't11_b23_d20_proj_point_square_mid_mc',
    name: 'Tìm hình chiếu của trung điểm cạnh đối lên mặt bên (Chóp đáy vuông)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Tìm hình chiếu vuông góc của trung điểm cạnh đối diện lên mặt bên chứa đường cao.',
    conditionSummary: 'setIdx ∈ [0; 3]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu & vị trí đường cao (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 3) return { valid: false, reason: 'setIdx ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx } = params;
      const CASES = [
        {
          alt: 'SA', pLbl: 'P', hLbl: 'H', e1: 'CD', e2: 'AB', plane: 'SAB',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', w1: 'S', w2: 'A', w3: 'B',
          sol: 'Ta có $PH \\perp AB$ (vì $PH \\parallel AD$ và $AD \\perp AB$) và $PH \\perp SA$ (do $SA \\perp (ABCD)$), suy ra $PH \\perp (SAB)$. Do đó hình chiếu của điểm $P$ trên $(SAB)$ là điểm $H$.',
        },
        {
          alt: 'SA', pLbl: 'M', hLbl: 'N', e1: 'BC', e2: 'AD', plane: 'SAD',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', w1: 'S', w2: 'A', w3: 'D',
          sol: 'Ta có $MN \\perp AD$ và $MN \\perp SA$ (do $SA \\perp (ABCD)$), suy ra $MN \\perp (SAD)$. Do đó hình chiếu của điểm $M$ trên $(SAD)$ là điểm $N$.',
        },
        {
          alt: 'SC', pLbl: 'E', hLbl: 'F', e1: 'AB', e2: 'CD', plane: 'SCD',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B', w1: 'S', w2: 'C', w3: 'D',
          sol: 'Ta có $EF \\perp CD$ và $EF \\perp SC$ (do $SC \\perp (ABCD)$), suy ra $EF \\perp (SCD)$. Do đó hình chiếu của điểm $E$ trên $(SCD)$ là điểm $F$.',
        },
        {
          alt: 'SB', pLbl: 'I', hLbl: 'K', e1: 'AD', e2: 'BC', plane: 'SBC',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A', w1: 'S', w2: 'B', w3: 'C',
          sol: 'Ta có $IK \\perp BC$ và $IK \\perp SB$ (do $SB \\perp (ABCD)$), suy ra $IK \\perp (SBC)$. Do đó hình chiếu của điểm $I$ trên $(SBC)$ là điểm $K$.',
        },
      ];
      const item = CASES[setIdx];
      const correct = 'Điểm $' + item.hLbl + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $' + item.alt + ' \\perp (ABCD)$. Gọi $' + item.pLbl + ', ' + item.hLbl + '$ lần lượt là trung điểm của $' + item.e1 + ', ' + item.e2 + '$. Tìm hình chiếu của điểm $' + item.pLbl + '$ trên mặt phẳng $(' + item.plane + ')$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 4', params: { setIdx: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (H)', params: { setIdx: 0 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Hình chiếu của đỉnh A lên mặt phẳng (SBC) trong chóp đáy chữ nhật
  t11_b23_d21_proj_point_rect_edge_mc: {
    id: 't11_b23_d21_proj_point_rect_edge_mc',
    name: 'Tìm hình chiếu vuông góc của đỉnh đáy lên mặt bên (Chóp đáy chữ nhật)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp đáy hình chữ nhật, SB ⊥ (ABCD). Tìm hình chiếu của đỉnh đáy lên mặt bên vuông góc.',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Vị trí đường cao bên (0: SB, 1: SA, 2: SC, 3: SD)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          alt: 'SB', midLbl: 'H', midEdge: 'BC', projPt: 'A', plane: 'SBC', ans: 'B', w1: 'H', w2: 'S', w3: 'C',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
          sol: 'Ta có $AB \\perp BC$ và $AB \\perp SB$ (do $SB \\perp (ABCD)$) $\\Rightarrow AB \\perp (SBC)$. Do đó hình chiếu của điểm $A$ trên mặt phẳng $(SBC)$ là điểm $B$.',
        },
        {
          alt: 'SA', midLbl: 'M', midEdge: 'AD', projPt: 'B', plane: 'SAD', ans: 'A', w1: 'M', w2: 'S', w3: 'D',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
          sol: 'Ta có $BA \\perp AD$ và $BA \\perp SA$ (do $SA \\perp (ABCD)$) $\\Rightarrow BA \\perp (SAD)$. Do đó hình chiếu của điểm $B$ trên mặt phẳng $(SAD)$ là điểm $A$.',
        },
        {
          alt: 'SC', midLbl: 'N', midEdge: 'CD', projPt: 'B', plane: 'SCD', ans: 'C', w1: 'N', w2: 'S', w3: 'D',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
          sol: 'Ta có $BC \\perp CD$ và $BC \\perp SC$ (do $SC \\perp (ABCD)$) $\\Rightarrow BC \\perp (SCD)$. Do đó hình chiếu của điểm $B$ trên mặt phẳng $(SCD)$ là điểm $C$.',
        },
        {
          alt: 'SD', midLbl: 'K', midEdge: 'AD', projPt: 'C', plane: 'SAD', ans: 'D', w1: 'K', w2: 'S', w3: 'A',
          vBL: 'D', vFL: 'A', vFR: 'B', vBR: 'C',
          sol: 'Ta có $CD \\perp AD$ và $CD \\perp SD$ (do $SD \\perp (ABCD)$) $\\Rightarrow CD \\perp (SAD)$. Do đó hình chiếu của điểm $C$ trên mặt phẳng $(SAD)$ là điểm $D$.',
        },
      ];
      const item = CASES[rot];
      const correct = 'Điểm $' + item.ans + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $' + item.alt + ' \\perp (ABCD)$. Gọi $' + item.midLbl + '$ là trung điểm của $' + item.midEdge + '$. Tìm hình chiếu của điểm $' + item.projPt + '$ trên mặt phẳng $(' + item.plane + ')$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (B)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Chóp S.ABC vuông tại A, SC ⊥ (ABC), M hình chiếu A trên CB -> chiếu A lên (SCB) là M
  t11_b23_d22_proj_point_tri_right_mc: {
    id: 't11_b23_d22_proj_point_tri_right_mc',
    name: 'Tìm hình chiếu của đỉnh đáy lên mặt đối diện (Chóp tam giác vuông)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Tìm hình chiếu của đỉnh A lên mặt phẳng (SCB) trong chóp S.ABC có SC ⊥ (ABC) và AM ⊥ CB.',
    conditionSummary: 'rot ∈ [0; 2]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh góc vuông đáy (0: A, 1: B, 2: C)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 2) return { valid: false, reason: 'rot ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          rightV: 'A', altV: 'C', hyp: 'CB', midEdge: 'CA', projPt: 'M', midPt: 'F', plane: 'SCB',
          vL: 'C', vF: 'A', vR: 'B', w1: 'F', w2: 'C', w3: 'B',
          sol: 'Ta có $AM \\perp CB$ (giả thiết) và $AM \\perp SC$ (do $SC \\perp (ABC)$) $\\Rightarrow AM \\perp (SCB)$. Do đó hình chiếu của điểm $A$ trên mặt phẳng $(SCB)$ là điểm $M$.',
        },
        {
          rightV: 'B', altV: 'A', hyp: 'AC', midEdge: 'AB', projPt: 'H', midPt: 'E', plane: 'SAC',
          vL: 'A', vF: 'B', vR: 'C', w1: 'E', w2: 'A', w3: 'C',
          sol: 'Ta có $BH \\perp AC$ (giả thiết) và $BH \\perp SA$ (do $SA \\perp (ABC)$) $\\Rightarrow BH \\perp (SAC)$. Do đó hình chiếu của điểm $B$ trên mặt phẳng $(SAC)$ là điểm $H$.',
        },
        {
          rightV: 'C', altV: 'B', hyp: 'AB', midEdge: 'CB', projPt: 'K', midPt: 'N', plane: 'SAB',
          vL: 'B', vF: 'C', vR: 'A', w1: 'N', w2: 'B', w3: 'A',
          sol: 'Ta có $CK \\perp AB$ (giả thiết) và $CK \\perp SB$ (do $SB \\perp (ABC)$) $\\Rightarrow CK \\perp (SAB)$. Do đó hình chiếu của điểm $C$ trên mặt phẳng $(SAB)$ là điểm $K$.',
        },
      ];
      const item = CASES[rot];
      const correct = 'Điểm $' + item.projPt + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác vuông tại $' + item.rightV + '$, $S' + item.altV + ' \\perp (ABC)$. Gọi $' + item.projPt + '$ là hình chiếu vuông góc của điểm $' + item.rightV + '$ trên đường thẳng $' + item.hyp + '$. Gọi $' + item.midPt + '$ là trung điểm của cạnh $' + item.midEdge + '$. Tìm hình chiếu của điểm $' + item.rightV + '$ trên mặt phẳng $(' + item.plane + ')$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 3', params: { rot: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (M)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Chóp S.ABC đều, SA ⊥ (ABC), I trung điểm AB -> chiếu C lên (SAB) là I
  t11_b23_d23_proj_point_tri_equi_mid_mc: {
    id: 't11_b23_d23_proj_point_tri_equi_mid_mc',
    name: 'Tìm hình chiếu của đỉnh đáy lên mặt bên (Chóp đáy tam giác đều)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABC đáy đều, SA ⊥ (ABC), tìm hình chiếu của C trên mặt phẳng (SAB).',
    conditionSummary: 'rot ∈ [0; 2]',
    paramSpecs: [
      { name: 'rot', label: 'Đỉnh chân đường cao (0: A, 1: B, 2: C)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 2) return { valid: false, reason: 'rot ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'A', m1: 'I', e1: 'AB', m2: 'Q', e2: 'AC', pt: 'C', plane: 'SAB',
          vL: 'A', vF: 'B', vR: 'C', w1: 'Q', w2: 'S', w3: 'A',
          sol: 'Vì tam giác $ABC$ đều và $I$ là trung điểm $AB$ nên $CI \\perp AB$. Lại có $CI \\perp SA$ (do $SA \\perp (ABC)$) $\\Rightarrow CI \\perp (SAB)$. Do đó hình chiếu của điểm $C$ trên $(SAB)$ là điểm $I$.',
        },
        {
          altV: 'B', m1: 'M', e1: 'BC', m2: 'N', e2: 'AB', pt: 'A', plane: 'SBC',
          vL: 'B', vF: 'C', vR: 'A', w1: 'N', w2: 'S', w3: 'B',
          sol: 'Vì tam giác $ABC$ đều và $M$ là trung điểm $BC$ nên $AM \\perp BC$. Lại có $AM \\perp SB$ (do $SB \\perp (ABC)$) $\\Rightarrow AM \\perp (SBC)$. Do đó hình chiếu của điểm $A$ trên $(SBC)$ là điểm $M$.',
        },
        {
          altV: 'C', m1: 'E', e1: 'AC', m2: 'F', e2: 'BC', pt: 'B', plane: 'SAC',
          vL: 'C', vF: 'A', vR: 'B', w1: 'F', w2: 'S', w3: 'C',
          sol: 'Vì tam giác $ABC$ đều và $E$ là trung điểm $AC$ nên $BE \\perp AC$. Lại có $BE \\perp SC$ (do $SC \\perp (ABC)$) $\\Rightarrow BE \\perp (SAC)$. Do đó hình chiếu của điểm $B$ trên $(SAC)$ là điểm $E$.',
        },
      ];
      const item = CASES[rot];
      const correct = 'Điểm $' + item.m1 + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABC$ có đáy là tam giác đều, $S' + item.altV + ' \\perp (ABC)$. Gọi $' + item.m1 + ', ' + item.m2 + '$ lần lượt là trung điểm của các cạnh $' + item.e1 + '$ và $' + item.e2 + '$. Tìm hình chiếu của điểm $' + item.pt + '$ trên mặt phẳng $(' + item.plane + ')$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_tetra_3d',
          params: {},
          labels: { apex: 'S', vL: item.vL, vF: item.vF, vR: item.vR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 3', params: { rot: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (I)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Hình chiếu của tâm đáy O lên mặt bên (SCD) qua đường trung bình tam giác ACI
  t11_b23_d24_proj_center_O_to_SCD_mc: {
    id: 't11_b23_d24_proj_center_O_to_SCD_mc',
    name: 'Tìm hình chiếu của tâm đáy O lên mặt bên không chứa đường cao',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy vuông tâm O, SA ⊥ (ABCD), I là hình chiếu A trên SD, H là trung điểm CI. Tìm hình chiếu của O trên (SCD).',
    conditionSummary: 'setIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu điểm phụ (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx } = params;
      const SETS = [
        { I: 'I', H: 'H', lineOn: 'SD', face: 'SCD', opp: 'B', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        { I: 'K', H: 'M', lineOn: 'SB', face: 'SBC', opp: 'D', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        { I: 'E', H: 'F', lineOn: 'SD', face: 'SCD', opp: 'B', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
      ];
      const s = SETS[setIdx];
      const edgeBase = s.face.slice(1);
      const sideFace = 'SA' + s.lineOn.slice(1);
      const correct = 'Điểm $' + s.H + '$';
      const wrongs = ['Điểm $' + s.I + '$', 'Điểm $C$', 'Điểm $S$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông tâm $O$, $SA \\perp (ABCD)$. Gọi $' + s.I + '$ là hình chiếu của $A$ trên đường thẳng $' + s.lineOn + '$. Gọi $' + s.H + '$ là trung điểm của đoạn thẳng $C' + s.I + '$. Tìm hình chiếu của điểm $O$ trên mặt phẳng $(' + s.face + ')$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: { showDiags: 1 },
          labels: { apex: 'S', vBL: s.vBL, vFL: s.vFL, vFR: s.vFR, vBR: s.vBR, center: 'O' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $A' + s.I + ' \\perp ' + s.lineOn + '$ (theo giả thiết). Lại có $' + edgeBase + ' \\perp A' + s.lineOn.slice(1) + '$ và $' + edgeBase + ' \\perp SA \\Rightarrow ' + edgeBase + ' \\perp (' + sideFace + ') \\Rightarrow ' + edgeBase + ' \\perp A' + s.I + '$.',
          'Suy ra $A' + s.I + ' \\perp (' + s.face + ')$. Vì $O, ' + s.H + '$ lần lượt là trung điểm của $AC, C' + s.I + '$ nên $O' + s.H + ' \\parallel A' + s.I + ' \\Rightarrow O' + s.H + ' \\perp (' + s.face + ')$. Vậy hình chiếu của $O$ trên $(' + s.face + ')$ là điểm $' + s.H + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (H)', params: { setIdx: 0 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), hình chiếu A trên SD là N -> chiếu A trên (SCD) là N
  t11_b23_d25_proj_point_rect_to_SCD_mc: {
    id: 't11_b23_d25_proj_point_rect_to_SCD_mc',
    name: 'Tìm hình chiếu của chân đường cao A lên mặt bên (SCD)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy chữ nhật, SA ⊥ (ABCD), N và K là hình chiếu của A trên SD và SE. Tìm hình chiếu của A trên (SCD).',
    conditionSummary: 'setIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ ký hiệu & mặt bên (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 2) return { valid: false, reason: 'setIdx ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx } = params;
      const CASES = [
        {
          midLbl: 'E', midEdge: 'CD', p1: 'N', p2: 'K', l1: 'SD', l2: 'SE', face: 'SCD', otherV: 'C', edge3: 'D',
          sol: 'Ta có $AN \\perp SD$ (theo giả thiết). Do $CD \\perp AD$ và $CD \\perp SA \\Rightarrow CD \\perp (SAD) \\Rightarrow CD \\perp AN$. Suy ra $AN \\perp (SCD)$, nên hình chiếu của $A$ trên $(SCD)$ là điểm $N$.',
        },
        {
          midLbl: 'M', midEdge: 'BC', p1: 'H', p2: 'I', l1: 'SB', l2: 'SM', face: 'SBC', otherV: 'C', edge3: 'B',
          sol: 'Ta có $AH \\perp SB$ (theo giả thiết). Do $BC \\perp AB$ và $BC \\perp SA \\Rightarrow BC \\perp (SAB) \\Rightarrow BC \\perp AH$. Suy ra $AH \\perp (SBC)$, nên hình chiếu của $A$ trên $(SBC)$ là điểm $H$.',
        },
        {
          midLbl: 'P', midEdge: 'CD', p1: 'H', p2: 'Q', l1: 'SD', l2: 'SP', face: 'SCD', otherV: 'C', edge3: 'D',
          sol: 'Ta có $AH \\perp SD$ (theo giả thiết). Do $CD \\perp AD$ và $CD \\perp SA \\Rightarrow CD \\perp (SAD) \\Rightarrow CD \\perp AH$. Suy ra $AH \\perp (SCD)$, nên hình chiếu của $A$ trên $(SCD)$ là điểm $H$.',
        },
      ];
      const item = CASES[setIdx];
      const correct = 'Điểm $' + item.p1 + '$';
      const wrongs = ['Điểm $' + item.otherV + '$', 'Điểm $S$', 'Điểm $' + item.edge3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$. Gọi $' + item.midLbl + '$ là trung điểm của $' + item.midEdge + '$. Gọi $' + item.p1 + ', ' + item.p2 + '$ lần lượt là hình chiếu của điểm $A$ trên các đường thẳng $' + item.l1 + '$ và $' + item.l2 + '$. Tìm hình chiếu của điểm $A$ trên mặt phẳng $(' + item.face + ')$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (N)', params: { setIdx: 0 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Hình chiếu của đường thẳng SC (hoặc SB, SD) trên mặt phẳng đáy (ABCD)
  t11_b23_d26_proj_line_SC_on_base_mc: {
    id: 't11_b23_d26_proj_line_SC_on_base_mc',
    name: 'Tìm hình chiếu vuông góc của cạnh bên lên mặt phẳng đáy',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy vuông có một cạnh bên vuông góc với đáy. Tìm hình chiếu của cạnh bên khác lên mặt đáy.',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Cặp cạnh chiếu & đường cao (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'A', midEdge: 'AB', projLine: 'SC', ans: 'AC', w1: 'SA', w2: 'BC', w3: 'EC',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
          sol: 'Điểm $S$ có hình chiếu vuông góc trên $(ABCD)$ là $A$, điểm $C$ có hình chiếu trên $(ABCD)$ là $C$. Do đó hình chiếu của đường thẳng $SC$ trên $(ABCD)$ là $AC$.',
        },
        {
          altV: 'A', midEdge: 'AD', projLine: 'SB', ans: 'AB', w1: 'SA', w2: 'BC', w3: 'EB',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
          sol: 'Điểm $S$ có hình chiếu trên $(ABCD)$ là $A$, điểm $B$ có hình chiếu trên $(ABCD)$ là $B$. Do đó hình chiếu của đường thẳng $SB$ trên $(ABCD)$ là $AB$.',
        },
        {
          altV: 'B', midEdge: 'BC', projLine: 'SD', ans: 'BD', w1: 'SB', w2: 'CD', w3: 'ED',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
          sol: 'Điểm $S$ có hình chiếu trên $(ABCD)$ là $B$, điểm $D$ có hình chiếu trên $(ABCD)$ là $D$. Do đó hình chiếu của đường thẳng $SD$ trên $(ABCD)$ là $BD$.',
        },
        {
          altV: 'C', midEdge: 'CD', projLine: 'SA', ans: 'CA', w1: 'SC', w2: 'DA', w3: 'EA',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B',
          sol: 'Điểm $S$ có hình chiếu trên $(ABCD)$ là $C$, điểm $A$ có hình chiếu trên $(ABCD)$ là $A$. Do đó hình chiếu của đường thẳng $SA$ trên $(ABCD)$ là $CA$.',
        },
      ];
      const item = CASES[rot];
      const correct = '$' + item.ans + '$';
      const wrongs = ['$' + item.w1 + '$', '$' + item.w2 + '$', '$' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $S' + item.altV + ' \\perp (ABCD)$. Gọi $E$ là trung điểm của $' + item.midEdge + '$. Tìm hình chiếu của đường thẳng $' + item.projLine + '$ trên mặt phẳng $(ABCD)$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (AC)', params: { rot: 0 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Hình chiếu của đường chéo đáy CA lên mặt bên (SCD)
  t11_b23_d27_proj_line_CA_on_SCD_mc: {
    id: 't11_b23_d27_proj_line_CA_on_SCD_mc',
    name: 'Tìm hình chiếu của đường chéo đáy lên mặt bên chứa đường cao',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đường thẳng vuông góc với mặt phẳng',
    description: 'Cho hình chóp S.ABCD đáy vuông, SC ⊥ (ABCD). Tìm hình chiếu của đường thẳng CA trên (SCD).',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Mặt phẳng chiếu & đường chéo (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'C', midEdge: 'CD', projLine: 'CA', plane: 'SCD', ans: 'CD',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B', w1: 'EA', w2: 'SE', w3: 'DA',
          sol: 'Điểm $C$ có hình chiếu trên $(SCD)$ là điểm $C$. Vì $AD \\perp CD$ và $AD \\perp SC \\Rightarrow AD \\perp (SCD)$ nên hình chiếu của $A$ trên $(SCD)$ là $D$. Do đó hình chiếu của $CA$ trên $(SCD)$ là $CD$.',
        },
        {
          altV: 'C', midEdge: 'CB', projLine: 'CA', plane: 'SCB', ans: 'CB',
          vBL: 'C', vFL: 'D', vFR: 'A', vBR: 'B', w1: 'EA', w2: 'SE', w3: 'BA',
          sol: 'Điểm $C$ có hình chiếu trên $(SCB)$ là $C$. Vì $AB \\perp BC$ và $AB \\perp SC \\Rightarrow AB \\perp (SCB)$ nên hình chiếu của $A$ trên $(SCB)$ là $B$. Do đó hình chiếu của $CA$ trên $(SCB)$ là $CB$.',
        },
        {
          altV: 'A', midEdge: 'AD', projLine: 'AC', plane: 'SAD', ans: 'AD',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', w1: 'EC', w2: 'SE', w3: 'CD',
          sol: 'Điểm $A$ có hình chiếu trên $(SAD)$ là $A$. Vì $CD \\perp AD$ và $CD \\perp SA \\Rightarrow CD \\perp (SAD)$ nên hình chiếu của $C$ trên $(SAD)$ là $D$. Do đó hình chiếu của $AC$ trên $(SAD)$ là $AD$.',
        },
        {
          altV: 'A', midEdge: 'AB', projLine: 'AC', plane: 'SAB', ans: 'AB',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D', w1: 'EC', w2: 'SE', w3: 'BC',
          sol: 'Điểm $A$ có hình chiếu trên $(SAB)$ là $A$. Vì $CB \\perp AB$ và $CB \\perp SA \\Rightarrow CB \\perp (SAB)$ nên hình chiếu của $C$ trên $(SAB)$ là $B$. Do đó hình chiếu của $AC$ trên $(SAB)$ là $AB$.',
        },
      ];
      const item = CASES[rot];
      const correct = '$' + item.ans + '$';
      const wrongs = ['$' + item.w1 + '$', '$' + item.w2 + '$', '$' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $S' + item.altV + ' \\perp (ABCD)$. Gọi $E$ là trung điểm của $' + item.midEdge + '$. Tìm hình chiếu của đường thẳng $' + item.projLine + '$ trên mặt phẳng $(' + item.plane + ')$?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (CD)', params: { rot: 0 }, expectedValid: true },
    ],
  },
};
