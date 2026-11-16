import { MathTemplate } from '../types/math';

const PROB_MC_HELPERS = String.raw`
  const fmtDec2 = (val) => (Math.round(val * 100) / 100).toFixed(2).replace('.', ',');
  const round2 = (val) => Math.round(val * 100) / 100;
  const clampDec2 = (v) => Math.min(0.99, Math.max(0.01, round2(v)));
  const fmtMcDec = (val) => '$' + fmtDec2(val) + '$';
  const genFakeDec = (baseVal, k) => {
    const offsets = [0.11, -0.13, 0.19, -0.09, 0.23, -0.17, 0.07, -0.21];
    const v = clampDec2(baseVal + offsets[(k - 1) % offsets.length] + Math.floor((k - 1) / offsets.length) * 0.05);
    return fmtMcDec(v);
  };
`;

export const G12_B18_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Nhận biết công thức đúng về xác suất có điều kiện
  t12_b18_d01_cond_prob_identity_mc: {
    id: 't12_b18_d01_cond_prob_identity_mc',
    name: 'Nhận biết công thức và tính chất xác suất có điều kiện',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khái niệm và công thức xác suất có điều kiện',
    description:
      'Cho hai biến cố với điều kiện xác suất khác 0. Chọn khẳng định đúng về công thức hoặc tính chất của xác suất có điều kiện.',
    conditionSummary: 'Cặp tên biến cố hợp lệ (0..3) và chỉ số dạng công thức đúng (0..2)',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp biến cố (0..3)', min: 0, max: 3 },
      { name: 'variant', label: 'Dạng công thức đúng (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { pairIdx, variant } = params;
      if (pairIdx < 0 || pairIdx > 3 || variant < 0 || variant > 2) {
        return { valid: false, reason: 'Tham số biến thể ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, variant } = params;
      const pairs = [
        ['A', 'C'],
        ['A', 'B'],
        ['E', 'F'],
        ['X', 'Y'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const truePool = [
        '$P(\\overline{' + E1 + '}|' + E2 + ') = 1 - P(' + E1 + '|' + E2 + ')$',
        '$P(' + E1 + E2 + ') = P(' + E2 + ')\\cdot P(' + E1 + '|' + E2 + ')$',
        '$P(' + E1 + '|' + E2 + ') = \\dfrac{P(' + E1 + E2 + ')}{P(' + E2 + ')}$',
      ];
      const correct = truePool[variant];
      const distractors = [
        '$P(' + E1 + '|' + E2 + ') = \\dfrac{P(' + E1 + ' \\cup ' + E2 + ')}{P(' + E2 + ')}$',
        '$P(' + E1 + E2 + ') = P(' + E1 + ')P(' + E2 + ')$',
        '$P(' + E1 + '|' + E2 + ') = P(' + E1 + ') - P(' + E2 + ')$',
        '$P(\\overline{' + E1 + '}|' + E2 + ') = 1 - P(' + E1 + ')$',
        '$P(' + E1 + '|' + E2 + ') = \\dfrac{P(' + E2 + ')}{P(' + E1 + E2 + ')}$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (k) => '$P(' + E1 + '|' + E2 + ') = ' + k + ' + P(' + E1 + ')$'
      );
      return {
        stem:
          'Cho $' +
          E1 +
          ', ' +
          E2 +
          '$ là các biến cố trong đó $P(' +
          E2 +
          ') > 0$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Với mọi hai biến cố $' + E1 + ', ' + E2 + '$ thỏa $P(' + E2 + ') > 0$, ta luôn có $P(' + E1 + '|' + E2 + ') = \\dfrac{P(' + E1 + E2 + ')}{P(' + E2 + ')}$ và $P(\\overline{' + E1 + '}|' + E2 + ') = 1 - P(' + E1 + '|' + E2 + ')$.',
          'Công thức $P(' + E1 + E2 + ') = P(' + E1 + ')P(' + E2 + ')$ chỉ đúng khi $' + E1 + ', ' + E2 + '$ độc lập.',
          'Vậy khẳng định đúng là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ngoài miền variant', params: { pairIdx: 0, variant: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1', params: { pairIdx: 0, variant: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Tính P(F|B) biết P(B) và P(BF)
  t12_b18_d02_cond_prob_from_joint_mc: {
    id: 't12_b18_d02_cond_prob_from_joint_mc',
    name: 'Tính xác suất có điều kiện P(F|B) biết P(B) và P(BF)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức xác suất có điều kiện',
    description: 'Cho P(B) và P(BF) dưới dạng số thập phân. Tính P(F|B) làm tròn đến hàng phần trăm.',
    conditionSummary: '0,05 <= P(BF) < P(B) <= 0,95; tránh ranh giới làm tròn .xx5',
    paramSpecs: [
      { name: 'pBInt', label: '100*P(B)', min: 25, max: 90 },
      { name: 'pJointInt', label: '100*P(BF)', min: 8, max: 75 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pBInt, pJointInt } = params;
      if (pBInt < 20 || pBInt > 95 || pJointInt < 5 || pJointInt >= pBInt) {
        return { valid: false, reason: 'Cần 0 < P(BF) < P(B) < 1' };
      }
      const val = pJointInt / pBInt;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần trăm .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pBInt, pJointInt, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['B', 'F'],
        ['A', 'B'],
        ['E', 'D'],
        ['M', 'N'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pB = pBInt / 100;
      const pJoint = pJointInt / 100;
      const ans = pJointInt / pBInt;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(pJoint / (1 - pB))),
          fmtMcDec(clampDec2(pB * pJoint)),
          fmtMcDec(clampDec2(pB - pJoint)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$ và $' +
          E2 +
          '$ có $P(' +
          E1 +
          ') = ' +
          fmtDec2(pB) +
          '$ và $P(' +
          E1 +
          E2 +
          ') = ' +
          fmtDec2(pJoint) +
          '$. Tính xác suất $P(' +
          E2 +
          '|' +
          E1 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức xác suất có điều kiện: $P(' + E2 + '|' + E1 + ') = \\dfrac{P(' + E2 + E1 + ')}{P(' + E1 + ')} = \\dfrac{' + fmtDec2(pJoint) + '}{' + fmtDec2(pB) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(BF) >= P(B)', params: { pBInt: 30, pJointInt: 35, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2', params: { pBInt: 31, pJointInt: 23, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Tính P(B|A) khi B và A độc lập
  t12_b18_d03_cond_prob_indep_mc: {
    id: 't12_b18_d03_cond_prob_indep_mc',
    name: 'Tính xác suất có điều kiện của hai biến cố độc lập',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Biến cố độc lập và xác suất có điều kiện',
    description: 'Cho hai biến cố độc lập B và A biết P(B). Tính P(B|A).',
    conditionSummary: '0,10 <= P(B) <= 0,90 và P(B) ≠ 0,50 để các phương án nhiễu phân biệt rõ',
    paramSpecs: [
      { name: 'pBInt', label: '100*P(B)', min: 15, max: 85 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pBInt } = params;
      if (pBInt < 10 || pBInt > 90 || pBInt === 50) {
        return { valid: false, reason: 'P(B) thuộc [0,10; 0,90] và khác 0,50 để 1 - P(B) ≠ P(B)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pBInt, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['B', 'A'],
        ['A', 'C'],
        ['E', 'F'],
        ['X', 'Y'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pB = pBInt / 100;
      const correct = fmtMcDec(pB);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - pB)),
          fmtMcDec(clampDec2(pB * pB)),
          fmtMcDec(clampDec2(pB / 2)),
          fmtMcDec(clampDec2(1 - pB * pB)),
        ],
        rng,
        (k) => genFakeDec(pB, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$ và $' +
          E2 +
          '$ độc lập có $P(' +
          E1 +
          ') = ' +
          fmtDec2(pB) +
          '$. Tính xác suất $P(' +
          E1 +
          '|' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + E1 + '$ và $' + E2 + '$ là hai biến cố độc lập nên $P(' + E1 + E2 + ') = P(' + E1 + ')P(' + E2 + ')$.',
          'Do đó $P(' + E1 + '|' + E2 + ') = \\dfrac{P(' + E1 + E2 + ')}{P(' + E2 + ')} = \\dfrac{P(' + E1 + ')P(' + E2 + ')}{P(' + E2 + ')} = P(' + E1 + ') = ' + fmtDec2(pB) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(B) = 0,50 (trùng phần bù)', params: { pBInt: 50, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3', params: { pBInt: 59, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Tính P(ED) biết P(E) và P(D|E)
  t12_b18_d04_joint_from_cond_mc: {
    id: 't12_b18_d04_joint_from_cond_mc',
    name: 'Tính xác suất giao P(ED) bằng công thức nhân xác suất',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Công thức nhân xác suất',
    description: 'Cho P(E) và P(D|E). Áp dụng công thức nhân xác suất để tính P(ED) làm tròn hàng phần trăm.',
    conditionSummary: 'P(E), P(D|E) ∈ [0,15; 0,90] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pEInt', label: '100*P(E)', min: 20, max: 85 },
      { name: 'pDgivenEInt', label: '100*P(D|E)', min: 15, max: 85 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pEInt, pDgivenEInt } = params;
      if (pEInt < 15 || pEInt > 95 || pDgivenEInt < 10 || pDgivenEInt > 95) {
        return { valid: false, reason: 'Xác suất thành phần ngoài miền' };
      }
      const prod = (pEInt * pDgivenEInt) / 10000;
      if (Math.abs(((prod * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pEInt, pDgivenEInt, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['E', 'D'],
        ['A', 'B'],
        ['C', 'D'],
        ['M', 'K'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pE = pEInt / 100;
      const pDE = pDgivenEInt / 100;
      const ans = pE * pDE;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(pE + pDE - ansR)),
          fmtMcDec(clampDec2(pE * (1 - pDE))),
          fmtMcDec(clampDec2(Math.min(0.95, pDE / pE))),
          fmtMcDec(clampDec2(Math.abs(pE - pDE) || 0.14)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$ và $' +
          E2 +
          '$ có $P(' +
          E1 +
          ') = ' +
          fmtDec2(pE) +
          '$ và $P(' +
          E2 +
          '|' +
          E1 +
          ') = ' +
          fmtDec2(pDE) +
          '$. Tính xác suất $P(' +
          E1 +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ công thức $P(' + E2 + '|' + E1 + ') = \\dfrac{P(' + E2 + E1 + ')}{P(' + E1 + ')}$, suy ra:',
          '$P(' + E1 + E2 + ') = P(' + E1 + ') \\cdot P(' + E2 + '|' + E1 + ') = ' + fmtDec2(pE) + ' \\cdot ' + fmtDec2(pDE) + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất quá nhỏ', params: { pEInt: 5, pDgivenEInt: 15, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4', params: { pEInt: 38, pDgivenEInt: 15, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Tính P(\overline{D}|E) biết P(E) và P(ED)
  t12_b18_d05_comp_cond_from_joint_mc: {
    id: 't12_b18_d05_comp_cond_from_joint_mc',
    name: 'Tính xác suất biến cố đối có điều kiện P(\\overline{D}|E) từ P(E) và P(ED)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Tính chất phần bù của xác suất có điều kiện',
    description: 'Cho P(E) và P(ED). Tính P(\\overline{D}|E) = 1 - P(ED)/P(E) làm tròn đến hàng phần trăm.',
    conditionSummary: '0,08 <= P(ED) < P(E) <= 0,95; tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pEInt', label: '100*P(E)', min: 30, max: 90 },
      { name: 'pJointInt', label: '100*P(ED)', min: 10, max: 75 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pEInt, pJointInt } = params;
      if (pEInt < 25 || pEInt > 95 || pJointInt < 8 || pJointInt >= pEInt) {
        return { valid: false, reason: 'Cần 0 < P(ED) < P(E) < 1' };
      }
      const pCond = pJointInt / pEInt;
      const ans = 1 - pCond;
      if (Math.abs(((ans * 100) % 1) - 0.5) < 0.005 || Math.abs(ans - pCond) < 0.02) {
        return { valid: false, reason: 'Tránh ranh giới .xx5 hoặc trùng với P(D|E)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pEInt, pJointInt, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['E', 'D'],
        ['A', 'B'],
        ['C', 'F'],
        ['X', 'Y'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pE = pEInt / 100;
      const pJoint = pJointInt / 100;
      const pDgivenE = pJointInt / pEInt;
      const ans = 1 - pDgivenE;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(pDgivenE)),
          fmtMcDec(clampDec2(pE - pJoint)),
          fmtMcDec(clampDec2(1 - pJoint)),
          fmtMcDec(clampDec2(1 - pE)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$ và $' +
          E2 +
          '$ có $P(' +
          E1 +
          ') = ' +
          fmtDec2(pE) +
          '$ và $P(' +
          E1 +
          E2 +
          ') = ' +
          fmtDec2(pJoint) +
          '$. Tính xác suất $P(\\overline{' +
          E2 +
          '}|' +
          E1 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $P(' + E2 + '|' + E1 + ') = \\dfrac{P(' + E2 + E1 + ')}{P(' + E1 + ')} = \\dfrac{' + fmtDec2(pJoint) + '}{' + fmtDec2(pE) + '}$.',
          'Suy ra $P(\\overline{' + E2 + '}|' + E1 + ') = 1 - P(' + E2 + '|' + E1 + ') = 1 - \\dfrac{' + fmtDec2(pJoint) + '}{' + fmtDec2(pE) + '} = \\dfrac{' + fmtDec2(pE - pJoint) + '}{' + fmtDec2(pE) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(ED) > P(E)', params: { pEInt: 40, pJointInt: 55, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5', params: { pEInt: 59, pJointInt: 45, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Tính P(\overline{A}B) biết P(B) và P(A|B)
  t12_b18_d06_not_a_and_b_mc: {
    id: 't12_b18_d06_not_a_and_b_mc',
    name: 'Tính xác suất P(\\overline{A}B) từ P(B) và P(A|B)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức nhân và biến cố xung khắc',
    description: 'Cho P(B) và P(A|B). Tính xác suất P(\\overline{A}B) = P(B) - P(AB) làm tròn hàng phần trăm.',
    conditionSummary: 'P(B), P(A|B) ∈ [0,15; 0,85], phép tính trực tiếp và làm tròn trung gian trùng khớp',
    paramSpecs: [
      { name: 'pBInt', label: '100*P(B)', min: 20, max: 85 },
      { name: 'pAgivenBInt', label: '100*P(A|B)', min: 15, max: 80 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pBInt, pAgivenBInt } = params;
      if (pBInt < 15 || pBInt > 90 || pAgivenBInt < 10 || pAgivenBInt > 90) {
        return { valid: false, reason: 'Xác suất ngoài miền' };
      }
      const pABExact = (pBInt * pAgivenBInt) / 10000;
      const pNotABExact = (pBInt / 100) - pABExact;
      const pNotABViaRound = (pBInt / 100) - Math.round(pABExact * 100) / 100;
      if (Math.round(pNotABExact * 100) !== Math.round(pNotABViaRound * 100)) {
        return { valid: false, reason: 'Tránh sai lệch 0,01 giữa làm tròn trung gian và tính thẳng' };
      }
      if (Math.abs(((pNotABExact * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pBInt, pAgivenBInt, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['A', 'B'],
        ['C', 'D'],
        ['E', 'F'],
        ['M', 'N'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pB = pBInt / 100;
      const pA_B = pAgivenBInt / 100;
      const pAB = round2(pB * pA_B);
      const ansR = round2(pB * (1 - pA_B));
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(pAB)),
          fmtMcDec(clampDec2(1 - pA_B)),
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(pB + pAB)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$ và $' +
          E2 +
          '$ có $P(' +
          E2 +
          ') = ' +
          fmtDec2(pB) +
          '$, $P(' +
          E1 +
          '|' +
          E2 +
          ') = ' +
          fmtDec2(pA_B) +
          '$. Tính xác suất $P(\\overline{' +
          E1 +
          '}' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Theo công thức nhân xác suất: $P(' + E1 + E2 + ') = P(' + E2 + ') \\cdot P(' + E1 + '|' + E2 + ') = ' + fmtDec2(pB) + ' \\cdot ' + fmtDec2(pA_B) + ' \\approx ' + fmtDec2(pAB) + '$.',
          'Vì $\\overline{' + E1 + '}' + E2 + '$ và $' + E1 + E2 + '$ là hai biến cố xung khắc và hợp của chúng là $' + E2 + '$, nên:',
          '$P(\\overline{' + E1 + '}' + E2 + ') = P(' + E2 + ') - P(' + E1 + E2 + ') = ' + fmtDec2(pB) + ' - ' + fmtDec2(pAB) + ' = ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất ngoài miền', params: { pBInt: 5, pAgivenBInt: 30, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6', params: { pBInt: 43, pAgivenBInt: 32, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Đảo điều kiện P(F|A) biết P(F), P(A), P(A|F)
  t12_b18_d07_bayes_swap_cond_mc: {
    id: 't12_b18_d07_bayes_swap_cond_mc',
    name: 'Tính xác suất điều kiện ngược P(F|A) biết P(F), P(A) và P(A|F)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đổi vai trò điều kiện (Công thức Bayes cơ bản)',
    description: 'Cho P(F), P(A) và P(A|F). Tính P(F|A) = P(F)P(A|F)/P(A) làm tròn đến hàng phần trăm.',
    conditionSummary: 'P(FA) = P(F)P(A|F) < P(A), P(F) + P(A) - P(FA) <= 1 và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pFInt', label: '100*P(F)', min: 25, max: 80 },
      { name: 'pAInt', label: '100*P(A)', min: 25, max: 80 },
      { name: 'pAgivenFInt', label: '100*P(A|F)', min: 10, max: 70 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pFInt, pAInt, pAgivenFInt } = params;
      const pF = pFInt / 100, pA = pAInt / 100, pAF = pAgivenFInt / 100;
      const pFA = pF * pAF;
      if (pFA >= pA - 0.02 || pF + pA - pFA > 0.99) {
        return { valid: false, reason: 'Cần P(FA) < P(A) và P(F ∪ A) <= 1' };
      }
      const val = pFA / pA;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pFInt, pAInt, pAgivenFInt, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['F', 'A'],
        ['A', 'B'],
        ['C', 'D'],
        ['E', 'M'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pF = pFInt / 100;
      const pA = pAInt / 100;
      const pAF = pAgivenFInt / 100;
      const pFAExact = pF * pAF;
      const ansR = round2(pFAExact / pA);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(pFAExact)),
          fmtMcDec(clampDec2(pAF)),
          fmtMcDec(clampDec2((pF * pA) / 1)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$ và $' +
          E2 +
          '$ có $P(' +
          E1 +
          ') = ' +
          fmtDec2(pF) +
          '$; $P(' +
          E2 +
          ') = ' +
          fmtDec2(pA) +
          '$ và $P(' +
          E2 +
          '|' +
          E1 +
          ') = ' +
          fmtDec2(pAF) +
          '$. Tính xác suất $P(' +
          E1 +
          '|' +
          E2 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $P(' + E1 + E2 + ') = P(' + E1 + ') \\cdot P(' + E2 + '|' + E1 + ') = ' + fmtDec2(pF) + ' \\cdot ' + fmtDec2(pAF) + ' = ' + String(Number(pFAExact.toFixed(4))).replace('.', ',') + '$.',
          'Suy ra $P(' + E1 + '|' + E2 + ') = \\dfrac{P(' + E1 + E2 + ')}{P(' + E2 + ')} = \\dfrac{' + String(Number(pFAExact.toFixed(4))).replace('.', ',') + '}{' + fmtDec2(pA) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(FA) >= P(A)', params: { pFInt: 80, pAInt: 25, pAgivenFInt: 70, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7', params: { pFInt: 61, pAInt: 44, pAgivenFInt: 16, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Tính P(D|B) biết P(B), P(D) và P(B \cup D)
  t12_b18_d08_cond_from_union_mc: {
    id: 't12_b18_d08_cond_from_union_mc',
    name: 'Tính xác suất có điều kiện P(D|B) từ công thức cộng P(B ∪ D)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Công thức cộng và xác suất có điều kiện',
    description: 'Cho P(B), P(D) và P(B ∪ D). Tính P(D|B) làm tròn đến hàng phần trăm.',
    conditionSummary: 'max(P(B), P(D)) < P(B ∪ D) < min(1, P(B) + P(D)); tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pBInt', label: '100*P(B)', min: 30, max: 75 },
      { name: 'pDInt', label: '100*P(D)', min: 25, max: 70 },
      { name: 'pUnionInt', label: '100*P(B ∪ D)', min: 55, max: 96 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { pBInt, pDInt, pUnionInt } = params;
      if (pUnionInt <= Math.max(pBInt, pDInt) + 1 || pUnionInt >= Math.min(99, pBInt + pDInt - 1)) {
        return { valid: false, reason: 'Cần max(P(B), P(D)) < P(B ∪ D) < min(1, P(B)+P(D))' };
      }
      const pBD = pBInt + pDInt - pUnionInt;
      const val = pBD / pBInt;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pBInt, pDInt, pUnionInt, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['B', 'D'],
        ['A', 'B'],
        ['E', 'F'],
        ['X', 'Y'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const pB = pBInt / 100;
      const pD = pDInt / 100;
      const pU = pUnionInt / 100;
      const pBD = (pBInt + pDInt - pUnionInt) / 100;
      const ansR = round2((pBInt + pDInt - pUnionInt) / pBInt);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2(pBD / pD)),
          fmtMcDec(clampDec2(1 - ansR)),
          fmtMcDec(clampDec2(pBD)),
          fmtMcDec(clampDec2(pD)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho hai biến cố $' +
          E1 +
          '$ và $' +
          E2 +
          '$ có $P(' +
          E1 +
          ') = ' +
          fmtDec2(pB) +
          '$; $P(' +
          E2 +
          ') = ' +
          fmtDec2(pD) +
          '$ và $P(' +
          E1 +
          ' \\cup ' +
          E2 +
          ') = ' +
          fmtDec2(pU) +
          '$. Tính xác suất $P(' +
          E2 +
          '|' +
          E1 +
          ')$ (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $P(' + E2 + E1 + ') = P(' + E1 + ') + P(' + E2 + ') - P(' + E1 + ' \\cup ' + E2 + ') = ' + fmtDec2(pB) + ' + ' + fmtDec2(pD) + ' - ' + fmtDec2(pU) + ' = ' + fmtDec2(pBD) + '$.',
          'Suy ra $P(' + E2 + '|' + E1 + ') = \\dfrac{P(' + E2 + E1 + ')}{P(' + E1 + ')} = \\dfrac{' + fmtDec2(pBD) + '}{' + fmtDec2(pB) + '} \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên giao âm P(B ∪ D) >= P(B) + P(D)', params: { pBInt: 40, pDInt: 30, pUnionInt: 75, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8', params: { pBInt: 52, pDInt: 36, pUnionInt: 80, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Lấy lần lượt 2 viên bi không hoàn lại (khác màu)
  t12_b18_d09_balls_no_replace_diff_mc: {
    id: 't12_b18_d09_balls_no_replace_diff_mc',
    name: 'Xác suất lấy được bi thứ hai khác màu bi thứ nhất (không hoàn lại)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài toán lấy bi không hoàn lại',
    description:
      'Một hộp có a bi màu vàng và b bi màu hồng. Lấy ngẫu nhiên lần lượt 2 viên bi không hoàn lại. Tính xác suất bi thứ hai màu hồng biết bi thứ nhất màu vàng.',
    conditionSummary: 'a >= 2, b >= 2 để mỗi màu có đủ bi và kết quả phân số tối giản chuẩn xác',
    paramSpecs: [
      { name: 'a', label: 'Số bi vàng', min: 5, max: 20 },
      { name: 'b', label: 'Số bi hồng', min: 5, max: 20 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 2 || b < 2) return { valid: false, reason: 'Mỗi màu phải có ít nhất 2 viên bi' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const n = a + b;
      const ans = u.simplifyFrac(b, n - 1);
      const f1 = u.simplifyFrac(b, n);
      const f2 = u.simplifyFrac(b - 1, n - 1);
      const f3 = u.simplifyFrac(a - 1, n - 1);
      const f4 = u.simplifyFrac(a, n - 1);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + f1.latex + '$', '$' + f2.latex + '$', '$' + f3.latex + '$', '$' + f4.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(b + k, n + k + 1).latex + '$'
      );
      return {
        stem:
          'Một hộp có $' +
          n +
          '$ viên bi cùng kích thước và khối lượng, trong đó có $' +
          a +
          '$ viên bi màu vàng và $' +
          b +
          '$ viên bi màu hồng. Lấy ngẫu nhiên lần lượt $2$ viên bi và không hoàn lại. Tính xác suất để lấy được viên bi thứ hai có màu hồng, biết rằng viên bi thứ nhất có màu vàng.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Gọi $A$ là biến cố "Lấy được viên bi thứ hai có màu hồng", $B$ là biến cố "Lấy được viên bi thứ nhất có màu vàng".',
          'Khi biến cố $B$ xảy ra (đã lấy ra $1$ viên bi màu vàng), trong hộp còn lại $' + (n - 1) + '$ viên bi, trong đó vẫn còn $' + b + '$ viên bi màu hồng.',
          'Vậy xác suất cần tính là $P(A|B) = \\dfrac{' + b + '}{' + (n - 1) + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên thiếu bi', params: { a: 1, b: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9', params: { a: 15, b: 13 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Câu lạc bộ hai môn thể thao (chọn 1 thành viên, biết chơi môn 2 tính P chơi môn 1)
  t12_b18_d10_club_two_sports_mc: {
    id: 't12_b18_d10_club_two_sports_mc',
    name: 'Xác suất thành viên CLB biết chơi cả hai môn khi đã biết chơi một môn',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Xác suất có điều kiện qua tập hợp',
    description:
      'CLB có N thành viên đều chơi ít nhất một trong hai môn bóng bàn hoặc cầu lông. Tính xác suất người chơi cầu lông cũng biết chơi bóng bàn.',
    conditionSummary: 'nA < N, nB < N và nA + nB > N để phần giao dương',
    paramSpecs: [
      { name: 'N', label: 'Tổng thành viên N', min: 20, max: 45 },
      { name: 'nA', label: 'Số người chơi bóng bàn', min: 10, max: 35 },
      { name: 'nB', label: 'Số người chơi cầu lông', min: 12, max: 35 },
    ],
    validateCode: `
      const { N, nA, nB } = params;
      if (nA >= N || nB >= N || nA + nB <= N + 1) {
        return { valid: false, reason: 'Cần nA < N, nB < N và nA + nB >= N + 2' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { N, nA, nB } = params;
      const both = nA + nB - N;
      const ans = u.simplifyFrac(both, nB);
      const f1 = u.simplifyFrac(both, N);
      const f2 = u.simplifyFrac(both, nA);
      const f3 = u.simplifyFrac(nB - both, nB);
      const f4 = u.simplifyFrac(both + 1, nB + 1);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + f1.latex + '$', '$' + f2.latex + '$', '$' + f3.latex + '$', '$' + f4.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(both + k, nB + 2 * k).latex + '$'
      );
      return {
        stem:
          'Câu lạc bộ thể thao của nhà trường gồm $' +
          N +
          '$ thành viên, mỗi thành viên biết chơi ít nhất một trong hai môn bóng bàn hoặc cầu lông. Biết rằng có $' +
          nA +
          '$ thành viên biết chơi bóng bàn và $' +
          nB +
          '$ thành viên biết chơi cầu lông. Chọn ngẫu nhiên $1$ thành viên của câu lạc bộ. Tính xác suất thành viên được chọn biết chơi bóng bàn, biết rằng thành viên đó biết chơi cầu lông.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Gọi $A$ là biến cố "Thành viên được chọn biết chơi cầu lông", $B$ là biến cố "Thành viên được chọn biết chơi bóng bàn".',
          'Số thành viên của câu lạc bộ biết chơi cả hai môn là $' + nA + ' + ' + nB + ' - ' + N + ' = ' + both + '$.',
          'Trong số $' + nB + '$ thành viên biết chơi cầu lông, có đúng $' + both + '$ thành viên biết chơi bóng bàn. Vậy $P(B|A) = \\dfrac{' + both + '}{' + nB + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên không có người chơi cả 2 môn', params: { N: 30, nA: 15, nB: 15 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10', params: { N: 28, nA: 18, nB: 19 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Lấy 2 bi không hoàn lại (cùng màu xanh)
  t12_b18_d11_balls_no_replace_same_mc: {
    id: 't12_b18_d11_balls_no_replace_same_mc',
    name: 'Xác suất lấy được bi thứ hai cùng màu với bi thứ nhất (không hoàn lại)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Bài toán lấy bi không hoàn lại',
    description: 'Hộp có a bi xanh và b bi vàng. Hạnh lấy 1 bi không trả lại, sau đó An lấy 1 bi. Tính xác suất cả 2 lấy bi xanh dạng P(A|B).',
    conditionSummary: 'a >= 4, b >= 4',
    paramSpecs: [
      { name: 'a', label: 'Số bi xanh', min: 5, max: 20 },
      { name: 'b', label: 'Số bi vàng', min: 5, max: 22 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a < 3 || b < 2) return { valid: false, reason: 'Số lượng bi mỗi màu phải đủ lớn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b } = params;
      const n = a + b;
      const ans = u.simplifyFrac(a - 1, n - 1);
      const f1 = u.simplifyFrac(a - 1, n);
      const f2 = u.simplifyFrac(a, n - 1);
      const f3 = u.simplifyFrac(b, n - 1);
      const f4 = u.simplifyFrac(a, n);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + f1.latex + '$', '$' + f2.latex + '$', '$' + f3.latex + '$', '$' + f4.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(a - 1 + k, n + 2 * k).latex + '$'
      );
      return {
        stem:
          'Một hộp có $' +
          a +
          '$ viên bi xanh và $' +
          b +
          '$ viên bi vàng, các viên bi có cùng kích thước và khối lượng. Bạn Hạnh lấy ngẫu nhiên một viên bi trong hộp, không trả lại. Sau đó bạn An lấy ngẫu nhiên một viên bi trong hộp đó. Gọi $A$ là biến cố: "An lấy được viên bi xanh"; $B$ là biến cố: "Hạnh lấy được viên bi xanh". Tính xác suất $P(A|B)$.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Biến cố $B$ xảy ra tức là Hạnh đã lấy được $1$ viên bi xanh.',
          'Khi đó trong hộp còn lại $' + (n - 1) + '$ viên bi gồm $' + (a - 1) + '$ viên bi xanh và $' + b + '$ viên bi vàng.',
          'Vậy xác suất cần tính là $P(A|B) = \\dfrac{' + (a - 1) + '}{' + (n - 1) + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a < 3', params: { a: 2, b: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11', params: { a: 12, b: 17 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Chuyển 1 viên bi từ hộp 1 sang hộp 2 rồi lấy 1 viên từ hộp 2
  t12_b18_d12_transfer_ball_mc: {
    id: 't12_b18_d12_transfer_ball_mc',
    name: 'Xác suất có điều kiện khi chuyển bi giữa hai hộp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Xác suất có điều kiện qua bài toán hai hộp bi',
    description:
      'Hộp 1 có r1 đỏ, w1 trắng; hộp 2 có r2 đỏ, w2 trắng. Chuyển 1 bi từ hộp 1 sang hộp 2 rồi lấy 1 bi từ hộp 2. Tính xác suất lần 2 lấy bi trắng biết lần 1 lấy bi đỏ.',
    conditionSummary: 'r1, w1, r2, w2 >= 2',
    paramSpecs: [
      { name: 'r1', label: 'Đỏ hộp 1', min: 4, max: 15 },
      { name: 'w1', label: 'Trắng hộp 1', min: 4, max: 15 },
      { name: 'r2', label: 'Đỏ hộp 2', min: 4, max: 15 },
      { name: 'w2', label: 'Trắng hộp 2', min: 4, max: 15 },
    ],
    validateCode: `
      const { r1, w1, r2, w2 } = params;
      if (r1 < 2 || w1 < 2 || r2 < 2 || w2 < 2) return { valid: false, reason: 'Mỗi loại bi cần >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, w1, r2, w2 } = params;
      const tot2New = r2 + w2 + 1;
      const ans = u.simplifyFrac(w2, tot2New);
      const f1 = u.simplifyFrac(w2, r2 + w2);
      const f2 = u.simplifyFrac(w2 + 1, tot2New);
      const f3 = u.simplifyFrac(r2 + 1, tot2New);
      const f4 = u.simplifyFrac(w1, r1 + w1);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + f1.latex + '$', '$' + f2.latex + '$', '$' + f3.latex + '$', '$' + f4.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(w2 + k, tot2New + 2 * k).latex + '$'
      );
      return {
        stem:
          'Hộp thứ nhất chứa $' +
          r1 +
          '$ viên bi đỏ và $' +
          w1 +
          '$ bi trắng. Hộp thứ hai chứa $' +
          r2 +
          '$ viên bi đỏ và $' +
          w2 +
          '$ bi trắng. Các viên bi có cùng kích thước và khối lượng. Bạn Hạnh lấy ra ngẫu nhiên $1$ viên bi từ hộp thứ nhất bỏ vào hộp thứ hai, sau đó lại lấy ra ngẫu nhiên $1$ viên bi từ hộp thứ hai. Tính xác suất để viên bi lấy ra ở lần thứ hai là viên bi trắng, biết viên bi lấy ra ở lần thứ nhất là viên bi đỏ.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Gọi $A$ là biến cố "Viên bi lấy ra ở lần thứ hai là viên bi trắng", $B$ là biến cố "Viên bi lấy ra ở lần thứ nhất là viên bi đỏ".',
          'Khi $B$ xảy ra, hộp thứ nhất chuyển $1$ viên bi đỏ sang hộp thứ hai nên lúc này hộp thứ hai có $' + (r2 + 1) + '$ bi đỏ và $' + w2 + '$ bi trắng (tổng $' + tot2New + '$ viên bi).',
          'Vậy xác suất cần tính là $P(A|B) = \\dfrac{' + w2 + '}{' + tot2New + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hộp rỗng', params: { r1: 0, w1: 5, r2: 5, w2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12', params: { r1: 12, w1: 10, r2: 10, w2: 9 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Xác suất có điều kiện từ dữ liệu phần trăm lồng nhau
  t12_b18_d13_percent_subgroup_cond_mc: {
    id: 't12_b18_d13_percent_subgroup_cond_mc',
    name: 'Tính xác suất có điều kiện từ tỉ lệ phần trăm nhóm con',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Xác suất có điều kiện trong thống kê khách hàng',
    description:
      'Có pA% khách mua hàng là nữ giới và pAB% là nữ giới trên k tuổi. Tính xác suất người mua trên k tuổi biết là nữ giới.',
    conditionSummary: '10 <= pAB < pA <= 92',
    paramSpecs: [
      { name: 'pA', label: 'Tỉ lệ nữ giới (%)', min: 35, max: 85 },
      { name: 'pAB', label: 'Tỉ lệ nữ trên tuổi (%)', min: 15, max: 70 },
      { name: 'age', label: 'Mốc tuổi', min: 30, max: 50, step: 2 },
    ],
    validateCode: `
      const { pA, pAB } = params;
      if (pAB < 10 || pAB >= pA - 3 || pA > 95) {
        return { valid: false, reason: 'Cần 10 <= P(AB) < P(A) <= 95' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pA, pAB, age } = params;
      const ans = u.simplifyFrac(pAB, pA);
      const f1 = u.simplifyFrac(pA - pAB, pA);
      const f2 = u.simplifyFrac(pAB, 100);
      const f3 = u.simplifyFrac(pAB, pA + 3);
      const f4 = u.simplifyFrac(pA - pAB, 100);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + f1.latex + '$', '$' + f2.latex + '$', '$' + f3.latex + '$', '$' + f4.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(pAB + k, pA + 2 * k + 1).latex + '$'
      );
      const pAStr = (pA / 100).toFixed(2).replace('.', ',');
      const pABStr = (pAB / 100).toFixed(2).replace('.', ',');
      return {
        stem:
          'Một công ty bán đồng hồ thể thao đa năng nhận thấy có $' +
          pA +
          '\\%$ số người mua hàng là nữ giới và có $' +
          pAB +
          '\\%$ số người mua hàng là nữ giới trên $' +
          age +
          '$ tuổi. Biết một người mua đồng hồ thể thao đa năng là nữ giới, tính xác suất để người đó trên $' +
          age +
          '$ tuổi.',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Gọi $A$ là biến cố "Người mua là nữ giới" và $B$ là biến cố "Người mua trên $' + age + '$ tuổi". Ta cần tính $P(B|A)$.',
          'Theo giả thiết, $P(A) = ' + pAStr + '$ và $P(AB) = ' + pABStr + '$.',
          'Vậy $P(B|A) = \\dfrac{P(AB)}{P(A)} = \\dfrac{' + pABStr + '}{' + pAStr + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pAB >= pA', params: { pA: 45, pAB: 50, age: 44 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13', params: { pA: 58, pAB: 45, age: 44 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Công thức nhân xác suất từ phần trăm có điều kiện
  t12_b18_d14_percent_vip_mult_mc: {
    id: 't12_b18_d14_percent_vip_mult_mc',
    name: 'Tính xác suất đồng thời từ phần trăm điều kiện (khách hàng VIP)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ứng dụng công thức nhân xác suất',
    description:
      'Trang TMĐT có pA% khách hàng VIP, trong đó pBA% mua hàng mỗi tháng. Tính xác suất khách vừa VIP vừa mua hàng mỗi tháng.',
    conditionSummary: 'pA ∈ [15; 75], pBA ∈ [20; 90], tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'pA', label: 'Tỉ lệ VIP (%)', min: 15, max: 70 },
      { name: 'pBA', label: 'Tỉ lệ VIP mua hàng (%)', min: 25, max: 90 },
    ],
    validateCode: `
      const { pA, pBA } = params;
      if (pA < 10 || pA > 85 || pBA < 15 || pBA > 95) return { valid: false, reason: 'Phần trăm ngoài miền' };
      const prod = (pA * pBA) / 10000;
      if (Math.abs(((prod * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pA, pBA } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const ans = (pA * pBA) / 10000;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const pAStr = (pA / 100).toFixed(2).replace('.', ',');
      const pBAStr = (pBA / 100).toFixed(2).replace('.', ',');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2((pA * (100 - pBA)) / 10000)),
          fmtMcDec(clampDec2((pA + pBA) / 100)),
          fmtMcDec(clampDec2(((100 - pA) * pBA) / 10000)),
          fmtMcDec(clampDec2(pBA / 100)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Một trang thương mại điện tử thống kê có $' +
          pA +
          '\\%$ khách hàng là thành viên VIP. Trong số đó có $' +
          pBA +
          '\\%$ sẽ mua hàng ít nhất một lần mỗi tháng. Chọn ngẫu nhiên một khách hàng. Tính xác suất người đó là thành viên VIP và có mua hàng mỗi tháng (kết quả làm tròn đến hàng phần trăm).',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Gọi $A$ là biến cố "Khách hàng là thành viên VIP", $B$ là biến cố "Khách hàng mua hàng ít nhất một lần mỗi tháng".',
          'Ta có $P(A) = ' + pAStr + '$ và $P(B|A) = ' + pBAStr + '$.',
          'Áp dụng công thức nhân xác suất: $P(AB) = P(A) \\cdot P(B|A) = ' + pAStr + ' \\cdot ' + pBAStr + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn sát .xx5', params: { pA: 25, pBA: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14', params: { pA: 28, pBA: 69 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Sơ đồ cây — cho P(X), P(D|X), P(\overline{D}|\overline{X}), tính P(\overline{X}\overline{D})
  t12_b18_d15_tree_notA_notB_top_mc: {
    id: 't12_b18_d15_tree_notA_notB_top_mc',
    name: 'Tính P(\\overline{X}\\overline{D}) từ sơ đồ cây (cho nhánh trên tầng 1)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Sơ đồ cây xác suất',
    description:
      'Cho sơ đồ cây hai biến cố X, D với P(X), P(D|X) và P(\\overline{D}|\\overline{X}). Tính P(\\overline{X}\\overline{D}) làm tròn đến hàng phần trăm.',
    conditionSummary: 'Xác suất trên các nhánh thuộc [0,15; 0,88] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1', label: '100*P(X)', min: 25, max: 78 },
      { name: 'p21', label: '100*P(D|X)', min: 15, max: 80 },
      { name: 'p2c1c', label: '100*P(D\'|X\')', min: 35, max: 90 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { p1, p21, p2c1c } = params;
      if (p1 < 10 || p1 > 90 || p21 < 10 || p21 > 90 || p2c1c < 10 || p2c1c > 95) {
        return { valid: false, reason: 'Xác suất trên nhánh ngoài miền' };
      }
      const val = ((100 - p1) * p2c1c) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, p21, p2c1c, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['X', 'D'],
        ['A', 'D'],
        ['M', 'K'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1Comp = 100 - p1;
      const p2Comp1 = 100 - p21;
      const p2Given1Comp = 100 - p2c1c;
      const ans = (p1Comp * p2c1c) / 10000;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2((p1 * p21) / 10000)),
          fmtMcDec(clampDec2((p1 * p2Comp1) / 10000)),
          fmtMcDec(clampDec2((p1Comp * p2Given1Comp) / 10000)),
          fmtMcDec(clampDec2((p1 * p2c1c) / 10000)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P\\left(\\overline{' +
          E1 +
          '}\\,\\overline{' +
          E2 +
          '}\\right)$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1: fmtDec2(p1 / 100),
          p2Given1: fmtDec2(p21 / 100),
          p2CompGiven1Comp: fmtDec2(p2c1c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây, ta có $P(' + E1 + ') = ' + fmtDec2(p1 / 100) + ' \\Rightarrow P(\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p1 / 100) + ' = ' + fmtDec2(p1Comp / 100) + '$.',
          'Nhánh dưới tại tầng 2 cho $P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = ' + fmtDec2(p2c1c / 100) + '$.',
          'Vậy $P(\\overline{' + E1 + '}\\,\\overline{' + E2 + '}) = P(\\overline{' + E1 + '}) \\cdot P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = ' + fmtDec2(p1Comp / 100) + ' \\cdot ' + fmtDec2(p2c1c / 100) + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn .xx5', params: { p1: 50, p21: 20, p2c1c: 25, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15', params: { p1: 63, p21: 32, p2c1c: 85, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Sơ đồ cây — cho P(A), P(\overline{E}|A), P(\overline{E}|\overline{A}), tính P(\overline{A}E)
  t12_b18_d16_tree_notA_B_top_mc: {
    id: 't12_b18_d16_tree_notA_B_top_mc',
    name: 'Tính P(\\overline{A}E) từ sơ đồ cây (cho nhánh đối tầng 2)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Sơ đồ cây xác suất',
    description:
      'Cho sơ đồ cây hai biến cố A, E với P(A), P(\\overline{E}|A) và P(\\overline{E}|\\overline{A}). Tính P(\\overline{A}E) làm tròn hàng phần trăm.',
    conditionSummary: 'Xác suất trên các nhánh thuộc [0,15; 0,94] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1', label: '100*P(A)', min: 25, max: 75 },
      { name: 'p2c1', label: '100*P(E\'|A)', min: 25, max: 94 },
      { name: 'p2c1c', label: '100*P(E\'|A\')', min: 25, max: 85 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { p1, p2c1, p2c1c } = params;
      if (p1 < 10 || p1 > 90 || p2c1 < 10 || p2c1 > 95 || p2c1c < 10 || p2c1c > 90) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const val = ((100 - p1) * (100 - p2c1c)) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, p2c1, p2c1c, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['A', 'E'],
        ['X', 'E'],
        ['B', 'D'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1Comp = 100 - p1;
      const p21Comp = 100 - p2c1c;
      const p21 = 100 - p2c1;
      const ans = (p1Comp * p21Comp) / 10000;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2((p1 * p21) / 10000)),
          fmtMcDec(clampDec2((p1 * p2c1) / 10000)),
          fmtMcDec(clampDec2((p1Comp * p2c1c) / 10000)),
          fmtMcDec(clampDec2((p1 * p21Comp) / 10000)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P\\left(\\overline{' +
          E1 +
          '}' +
          E2 +
          '\\right)$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1: fmtDec2(p1 / 100),
          p2CompGiven1: fmtDec2(p2c1 / 100),
          p2CompGiven1Comp: fmtDec2(p2c1c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây: $P(\\overline{' + E1 + '}) = 1 - P(' + E1 + ') = 1 - ' + fmtDec2(p1 / 100) + ' = ' + fmtDec2(p1Comp / 100) + '$.',
          'Tại nhánh $\\overline{' + E1 + '}$, ta có $P(' + E2 + '|\\overline{' + E1 + '}) = 1 - P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p2c1c / 100) + ' = ' + fmtDec2(p21Comp / 100) + '$.',
          'Vậy $P(\\overline{' + E1 + '}' + E2 + ') = P(\\overline{' + E1 + '}) \\cdot P(' + E2 + '|\\overline{' + E1 + '}) = ' + fmtDec2(p1Comp / 100) + ' \\cdot ' + fmtDec2(p21Comp / 100) + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên xác suất quá nhỏ', params: { p1: 5, p2c1: 50, p2c1c: 50, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16', params: { p1: 58, p2c1: 92, p2c1c: 57, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Sơ đồ cây — cho P(\overline{B}), P(E|B), P(\overline{E}|\overline{B}), tính P(\overline{B}\overline{E})
  t12_b18_d17_tree_notA_notB_bot_mc: {
    id: 't12_b18_d17_tree_notA_notB_bot_mc',
    name: 'Tính P(\\overline{B}\\overline{E}) từ sơ đồ cây (cho nhánh dưới tầng 1)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Sơ đồ cây xác suất',
    description:
      'Cho sơ đồ cây hai biến cố B, E với P(\\overline{B}), P(E|B) và P(\\overline{E}|\\overline{B}). Tính P(\\overline{B}\\overline{E}) làm tròn hàng phần trăm.',
    conditionSummary: 'Xác suất các nhánh hợp lệ và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1Comp', label: '100*P(B\')', min: 20, max: 75 },
      { name: 'p21', label: '100*P(E|B)', min: 5, max: 75 },
      { name: 'p2c1c', label: '100*P(E\'|B\')', min: 25, max: 85 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { p1Comp, p21, p2c1c } = params;
      if (p1Comp < 10 || p1Comp > 90 || p21 < 5 || p21 > 90 || p2c1c < 10 || p2c1c > 95) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const val = (p1Comp * p2c1c) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Comp, p21, p2c1c, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['B', 'E'],
        ['C', 'E'],
        ['A', 'F'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1 = 100 - p1Comp;
      const p2Comp1 = 100 - p21;
      const p21Comp = 100 - p2c1c;
      const ans = (p1Comp * p2c1c) / 10000;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2((p1 * p21) / 10000)),
          fmtMcDec(clampDec2((p1 * p2Comp1) / 10000)),
          fmtMcDec(clampDec2((p1Comp * p21Comp) / 10000)),
          fmtMcDec(clampDec2((p1 * p2c1c) / 10000)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P\\left(\\overline{' +
          E1 +
          '}\\,\\overline{' +
          E2 +
          '}\\right)$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1Comp: fmtDec2(p1Comp / 100),
          p2Given1: fmtDec2(p21 / 100),
          p2CompGiven1Comp: fmtDec2(p2c1c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây, đọc trực tiếp được $P(\\overline{' + E1 + '}) = ' + fmtDec2(p1Comp / 100) + '$ và $P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = ' + fmtDec2(p2c1c / 100) + '$.',
          'Vậy $P(\\overline{' + E1 + '}\\,\\overline{' + E2 + '}) = P(\\overline{' + E1 + '}) \\cdot P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = ' + fmtDec2(p1Comp / 100) + ' \\cdot ' + fmtDec2(p2c1c / 100) + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn .xx5', params: { p1Comp: 25, p21: 10, p2c1c: 50, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17', params: { p1Comp: 34, p21: 7, p2c1c: 66, pairIdx: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Sơ đồ cây — cho P(\overline{C}), P(\overline{B}|C), P(B|\overline{C}), tính P(\overline{C}\overline{B})
  t12_b18_d18_tree_notA_notB_mixed_mc: {
    id: 't12_b18_d18_tree_notA_notB_mixed_mc',
    name: 'Tính P(\\overline{C}\\overline{B}) từ sơ đồ cây (cho nhánh đối chéo)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Sơ đồ cây xác suất',
    description:
      'Cho sơ đồ cây hai biến cố C, B với P(\\overline{C}), P(\\overline{B}|C) và P(B|\\overline{C}). Tính P(\\overline{C}\\overline{B}) làm tròn hàng phần trăm.',
    conditionSummary: 'Xác suất nhánh thuộc [0,15; 0,90] và tránh biên làm tròn .xx5',
    paramSpecs: [
      { name: 'p1Comp', label: '100*P(C\')', min: 20, max: 75 },
      { name: 'p2c1', label: '100*P(B\'|C)', min: 25, max: 90 },
      { name: 'p21c', label: '100*P(B|C\')', min: 15, max: 75 },
      { name: 'pairIdx', label: 'Cặp tên biến cố (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { p1Comp, p2c1, p21c } = params;
      if (p1Comp < 10 || p1Comp > 90 || p2c1 < 10 || p2c1 > 95 || p21c < 10 || p21c > 90) {
        return { valid: false, reason: 'Xác suất nhánh ngoài miền' };
      }
      const p2c1c = 100 - p21c;
      const val = (p1Comp * p2c1c) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Comp, p2c1, p21c, pairIdx } = params;
      ` + PROB_MC_HELPERS + String.raw`
      const pairs = [
        ['C', 'B'],
        ['A', 'D'],
        ['E', 'M'],
      ];
      const [E1, E2] = pairs[pairIdx];
      const p1 = 100 - p1Comp;
      const p21 = 100 - p2c1;
      const p2c1c = 100 - p21c;
      const ans = (p1Comp * p2c1c) / 10000;
      const ansR = round2(ans);
      const correct = fmtMcDec(ansR);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          fmtMcDec(clampDec2((p1Comp * p21c) / 10000)),
          fmtMcDec(clampDec2((p1 * p2c1) / 10000)),
          fmtMcDec(clampDec2((p1 * p21) / 10000)),
          fmtMcDec(clampDec2(1 - ansR)),
        ],
        rng,
        (k) => genFakeDec(ansR, k)
      );
      return {
        stem:
          'Cho các biến cố $' +
          E1 +
          ', ' +
          E2 +
          '$ có sơ đồ cây như hình vẽ. Tính xác suất $P\\left(\\overline{' +
          E1 +
          '}\\,\\overline{' +
          E2 +
          '}\\right)$ (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'prob_tree',
          event1: E1,
          event2: E2,
          p1Comp: fmtDec2(p1Comp / 100),
          p2CompGiven1: fmtDec2(p2c1 / 100),
          p2Given1Comp: fmtDec2(p21c / 100),
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ sơ đồ cây, ta có $P(\\overline{' + E1 + '}) = ' + fmtDec2(p1Comp / 100) + '$ và $P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = 1 - P(' + E2 + '|\\overline{' + E1 + '}) = 1 - ' + fmtDec2(p21c / 100) + ' = ' + fmtDec2(p2c1c / 100) + '$.',
          'Vậy $P(\\overline{' + E1 + '}\\,\\overline{' + E2 + '}) = P(\\overline{' + E1 + '}) \\cdot P(\\overline{' + E2 + '}|\\overline{' + E1 + '}) = ' + fmtDec2(p1Comp / 100) + ' \\cdot ' + fmtDec2(p2c1c / 100) + ' \\approx ' + fmtDec2(ansR) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên làm tròn .xx5', params: { p1Comp: 25, p2c1: 30, p21c: 50, pairIdx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18', params: { p1Comp: 41, p2c1: 83, p21c: 25, pairIdx: 0 }, expectedValid: true },
    ],
  },
};
