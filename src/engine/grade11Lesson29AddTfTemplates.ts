import { MathTemplate } from '../types/math';

export const G11_B29_ADD_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D39 (Q9): Khảo sát sở thích học sinh trong lớp (đọc sách & chơi game) - Đúng/Sai
  t11_b29_d39_class_hobbies_tf: {
    id: 't11_b29_d39_class_hobbies_tf',
    name: 'Khảo sát sở thích đọc sách và chơi game trong lớp (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Lớp có n học sinh, biết số bạn thích đọc sách, thích chơi game và thích cả hai. Xét 4 mệnh đề Đúng/Sai về xác suất.',
    conditionSummary: 'nTotal ∈ [28; 45], nA, nB ∈ [10; 26], nAB ∈ [2; 12], nAB + 1 < min(nA, nB), nA + nB - nAB < nTotal',
    paramSpecs: [
      { name: 'classIdx', label: 'Tên lớp (0..3)', min: 0, max: 3 },
      { name: 'nTotal', label: 'Tổng số học sinh', min: 28, max: 45 },
      { name: 'nA', label: 'Số bạn thích đọc sách', min: 10, max: 26 },
      { name: 'nB', label: 'Số bạn thích chơi game', min: 10, max: 26 },
      { name: 'nAB', label: 'Số bạn thích cả hai', min: 2, max: 12 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { classIdx, nTotal, nA, nB, nAB, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(classIdx) || classIdx < 0 || classIdx > 3) return { valid: false, reason: 'classIdx ngoài miền [0; 3]' };
      if (!Number.isInteger(nTotal) || nTotal < 28 || nTotal > 45) return { valid: false, reason: 'nTotal ngoài miền [28; 45]' };
      if (!Number.isInteger(nA) || nA < 10 || nA > 26) return { valid: false, reason: 'nA ngoài miền [10; 26]' };
      if (!Number.isInteger(nB) || nB < 10 || nB > 26) return { valid: false, reason: 'nB ngoài miền [10; 26]' };
      if (!Number.isInteger(nAB) || nAB < 2 || nAB > 12) return { valid: false, reason: 'nAB ngoài miền [2; 12]' };
      if (nA <= nAB + 1 || nB <= nAB + 1) return { valid: false, reason: 'Cần nA > nAB + 1 và nB > nAB + 1' };
      if (nA + nB - nAB >= nTotal) return { valid: false, reason: 'Cần nA + nB - nAB < nTotal để có học sinh không thích cả hai' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { classIdx, nTotal, nA, nB, nAB, aTrue, bTrue, cTrue, dTrue } = params;
      const CLASSES = ['11A1', '11A2', '11A3', '11A4'];
      const clsName = CLASSES[classIdx];
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const onlyA = nA - nAB;
      const nUnion = nA + nB - nAB;
      const nNeither = nTotal - nUnion;

      const fA = u.simplifyFrac(nB, nTotal);
      const fB = u.simplifyFrac(onlyA, nTotal);
      const fC = u.simplifyFrac(nUnion, nTotal);
      const fD = u.simplifyFrac(nNeither, nTotal);

      const makeWrongFrac = (trueNum, den, offsets) => {
        const trueLatex = u.simplifyFrac(trueNum, den).latex;
        for (const off of offsets) {
          const cand = trueNum + off;
          if (cand > 0 && cand < den) {
            const l = u.simplifyFrac(cand, den).latex;
            if (l !== trueLatex) return l;
          }
        }
        for (let k = 1; k < den; k++) {
          const l = u.simplifyFrac(k, den).latex;
          if (l !== trueLatex) return l;
        }
        return '\\frac{1}{2}';
      };

      const wA = makeWrongFrac(nB, nTotal, [3, -3, 2, -2, 1]);
      const wB = makeWrongFrac(onlyA, nTotal, [3, -3, 4, -2, 1]);
      const wC = makeWrongFrac(nUnion, nTotal, [-4, 2, -3, 1]);
      const wD = nTotal === 34 && nNeither === 5 ? '\\frac{11}{20}' : makeWrongFrac(nNeither, nTotal, [4, 6, -2, 3, 1]);

      const tfStatements = [
        { key: 'a', text: '$P(B) = ' + (aIs ? fA.latex : wA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất chọn được bạn chỉ thích đọc sách là $' + (bIs ? fB.latex : wB) + '$', isTrue: bIs },
        { key: 'c', text: '$P(A \\cup B) = ' + (cIs ? fC.latex : wC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất chọn được bạn không thích cả đọc sách và chơi game là $' + (dIs ? fD.latex : wD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Lớp ' + clsName + ' có $' + nTotal + '$ học sinh. Trong đó có $' + nA + '$ bạn thích đọc sách, có $' + nB + '$ bạn thích chơi game, có $' + nAB + '$ bạn thích cả hai. Đồng thời có các bạn không thích cả đọc sách và chơi game. Chọn ngẫu nhiên một học sinh của lớp. Gọi $A$ là biến cố "Học sinh được chọn thích đọc sách", $B$ là biến cố "Học sinh được chọn thích chơi game". Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $n(\\Omega) = ' + nTotal + '$, $n(B) = ' + nB + ' \\Rightarrow P(B) = \\dfrac{' + nB + '}{' + nTotal + '}' + (fA.den !== nTotal ? ' = ' + fA.latex : '') + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Số bạn chỉ thích đọc sách là $n(C) = ' + nA + ' - ' + nAB + ' = ' + onlyA + ' \\Rightarrow P(C) = \\dfrac{' + onlyA + '}{' + nTotal + '}' + (fB.den !== nTotal ? ' = ' + fB.latex : '') + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $n(A \\cup B) = ' + nA + ' + ' + nB + ' - ' + nAB + ' = ' + nUnion + ' \\Rightarrow P(A \\cup B) = \\dfrac{' + nUnion + '}{' + nTotal + '}' + (fC.den !== nTotal ? ' = ' + fC.latex : '') + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Số bạn không thích cả hai môn là $n(D) = ' + nTotal + ' - ' + nUnion + ' = ' + nNeither + ' \\Rightarrow P(D) = \\dfrac{' + nNeither + '}{' + nTotal + '}' + (fD.den !== nTotal ? ' = ' + fD.latex : '') + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nA + nB - nAB ≥ nTotal', params: { classIdx: 2, nTotal: 30, nA: 20, nB: 18, nAB: 4, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (34; 15; 19; 5 -> Đ Đ Đ S)', params: { classIdx: 2, nTotal: 34, nA: 15, nB: 19, nAB: 5, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D40 (Q10): Khảo sát phương tiện đi làm (xe máy và xe buýt) - Đúng/Sai
  t11_b29_d40_commute_survey_tf: {
    id: 't11_b29_d40_commute_survey_tf',
    name: 'Khảo sát phương tiện đi làm bằng xe máy và xe buýt (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Khảo sát n người về việc đi xe máy, đi xe buýt, đi cả hai hoặc không đi phương tiện nào trong hai loại trên. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'nTotal ∈ [30; 50], nA ∈ [12; 30], nB ∈ [10; 28], nAB ∈ [2; 12], nAB + 1 < min(nA, nB), nA + nB - nAB < nTotal',
    paramSpecs: [
      { name: 'nTotal', label: 'Số người được khảo sát', min: 30, max: 50 },
      { name: 'nA', label: 'Số người đi xe máy', min: 12, max: 30 },
      { name: 'nB', label: 'Số người đi xe buýt', min: 10, max: 28 },
      { name: 'nAB', label: 'Số người dùng cả hai', min: 2, max: 12 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { nTotal, nA, nB, nAB, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(nTotal) || nTotal < 30 || nTotal > 50) return { valid: false, reason: 'nTotal ngoài miền [30; 50]' };
      if (!Number.isInteger(nA) || nA < 12 || nA > 30) return { valid: false, reason: 'nA ngoài miền [12; 30]' };
      if (!Number.isInteger(nB) || nB < 10 || nB > 28) return { valid: false, reason: 'nB ngoài miền [10; 28]' };
      if (!Number.isInteger(nAB) || nAB < 2 || nAB > 12) return { valid: false, reason: 'nAB ngoài miền [2; 12]' };
      if (nA <= nAB + 1 || nB <= nAB + 1) return { valid: false, reason: 'Cần nA > nAB + 1 và nB > nAB + 1' };
      if (nA + nB - nAB >= nTotal) return { valid: false, reason: 'Cần nA + nB - nAB < nTotal' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { nTotal, nA, nB, nAB, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const onlyA = nA - nAB;
      const nUnion = nA + nB - nAB;
      const nNeither = nTotal - nUnion;

      const fA = u.simplifyFrac(nA, nTotal);
      const fB = u.simplifyFrac(onlyA, nTotal);
      const fC = u.simplifyFrac(nUnion, nTotal);
      const fD = u.simplifyFrac(nNeither, nTotal);

      const makeWrongFrac = (trueNum, den, offsets) => {
        const trueLatex = u.simplifyFrac(trueNum, den).latex;
        for (const off of offsets) {
          const cand = trueNum + off;
          if (cand > 0 && cand < den) {
            const l = u.simplifyFrac(cand, den).latex;
            if (l !== trueLatex) return l;
          }
        }
        for (let k = 1; k < den; k++) {
          const l = u.simplifyFrac(k, den).latex;
          if (l !== trueLatex) return l;
        }
        return '\\frac{1}{2}';
      };

      const wA = makeWrongFrac(nA, nTotal, [3, -3, 2, -2, 1]);
      const wB = makeWrongFrac(onlyA, nTotal, [4, -3, 2, -2, 1]);
      const wC = makeWrongFrac(nUnion, nTotal, [-4, 2, -3, 1]);
      const wD = makeWrongFrac(nNeither, nTotal, [3, 5, -2, 2, 1]);

      const tfStatements = [
        { key: 'a', text: '$P(A) = ' + (aIs ? fA.latex : wA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất chọn được người chỉ đi xe máy là $' + (bIs ? fB.latex : wB) + '$', isTrue: bIs },
        { key: 'c', text: '$P(A \\cup B) = ' + (cIs ? fC.latex : wC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất chọn được người không đi cả hai phương tiện đã cho là $' + (dIs ? fD.latex : wD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Một nhóm nghiên cứu tiến hành khảo sát $' + nTotal + '$ người về phương tiện họ thường sử dụng để đi làm. Trong đó có $' + nA + '$ người thường đi xe máy, có $' + nB + '$ người thường đi xe buýt, có $' + nAB + '$ người sử dụng cả hai phương tiện. Đồng thời có những người không sử dụng hai phương tiện này. Chọn ngẫu nhiên một người đã khảo sát. Gọi $A$ là biến cố "Người được chọn thường đi xe máy", $B$ là biến cố "Người được chọn thường đi xe buýt". Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $n(\\Omega) = ' + nTotal + '$, $n(A) = ' + nA + ' \\Rightarrow P(A) = \\dfrac{' + nA + '}{' + nTotal + '}' + (fA.den !== nTotal ? ' = ' + fA.latex : '') + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Số người chỉ đi xe máy là $n(C) = ' + nA + ' - ' + nAB + ' = ' + onlyA + ' \\Rightarrow P(C) = \\dfrac{' + onlyA + '}{' + nTotal + '}' + (fB.den !== nTotal ? ' = ' + fB.latex : '') + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $n(A \\cup B) = ' + nA + ' + ' + nB + ' - ' + nAB + ' = ' + nUnion + ' \\Rightarrow P(A \\cup B) = \\dfrac{' + nUnion + '}{' + nTotal + '}' + (fC.den !== nTotal ? ' = ' + fC.latex : '') + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Số người không đi cả hai phương tiện đã cho là $n(D) = ' + nTotal + ' - ' + nUnion + ' = ' + nNeither + ' \\Rightarrow P(D) = \\dfrac{' + nNeither + '}{' + nTotal + '}' + (fD.den !== nTotal ? ' = ' + fD.latex : '') + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nAB ≥ nB', params: { nTotal: 37, nA: 20, nB: 10, nAB: 10, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (37; 20; 15; 6 -> Đ Đ Đ Đ)', params: { nTotal: 37, nA: 20, nB: 15, nAB: 6, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D41 (Q11): Khảo sát khách du lịch biển và núi - Đúng/Sai
  t11_b29_d41_travel_survey_tf: {
    id: 't11_b29_d41_travel_survey_tf',
    name: 'Khảo sát khách du lịch biển và du lịch núi (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Khảo sát n khách hàng về việc đi du lịch biển, du lịch núi, đi cả hai nơi hoặc chưa đi cả hai. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'nTotal ∈ [28; 50], nA ∈ [12; 30], nB ∈ [10; 28], nAB ∈ [2; 12], nAB + 1 < min(nA, nB), nA + nB - nAB < nTotal',
    paramSpecs: [
      { name: 'nTotal', label: 'Số khách hàng khảo sát', min: 28, max: 50 },
      { name: 'nA', label: 'Số người đi du lịch biển', min: 12, max: 30 },
      { name: 'nB', label: 'Số người đi du lịch núi', min: 10, max: 28 },
      { name: 'nAB', label: 'Số người đi cả hai nơi', min: 2, max: 12 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { nTotal, nA, nB, nAB, aTrue, bTrue, cTrue, dTrue } = params;
      if (!Number.isInteger(nTotal) || nTotal < 28 || nTotal > 50) return { valid: false, reason: 'nTotal ngoài miền [28; 50]' };
      if (!Number.isInteger(nA) || nA < 12 || nA > 30) return { valid: false, reason: 'nA ngoài miền [12; 30]' };
      if (!Number.isInteger(nB) || nB < 10 || nB > 28) return { valid: false, reason: 'nB ngoài miền [10; 28]' };
      if (!Number.isInteger(nAB) || nAB < 2 || nAB > 12) return { valid: false, reason: 'nAB ngoài miền [2; 12]' };
      if (nA <= nAB + 1 || nB <= nAB + 1) return { valid: false, reason: 'Cần nA > nAB + 1 và nB > nAB + 1' };
      if (nA + nB - nAB >= nTotal) return { valid: false, reason: 'Cần nA + nB - nAB < nTotal' };
      for (const f of [aTrue, bTrue, cTrue, dTrue]) {
        if (f !== 0 && f !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { nTotal, nA, nB, nAB, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1, bIs = bTrue === 1, cIs = cTrue === 1, dIs = dTrue === 1;

      const onlyB = nB - nAB;
      const nUnion = nA + nB - nAB;
      const nNeither = nTotal - nUnion;

      const fA = u.simplifyFrac(nA, nTotal);
      const fB = u.simplifyFrac(onlyB, nTotal);
      const fC = u.simplifyFrac(nUnion, nTotal);
      const fD = u.simplifyFrac(nNeither, nTotal);

      const makeWrongFrac = (trueNum, den, offsets) => {
        const trueLatex = u.simplifyFrac(trueNum, den).latex;
        for (const off of offsets) {
          const cand = trueNum + off;
          if (cand > 0 && cand < den) {
            const l = u.simplifyFrac(cand, den).latex;
            if (l !== trueLatex) return l;
          }
        }
        for (let k = 1; k < den; k++) {
          const l = u.simplifyFrac(k, den).latex;
          if (l !== trueLatex) return l;
        }
        return '\\frac{1}{2}';
      };

      const wA = nTotal === 35 && nA === 19 ? '\\frac{21}{50}' : makeWrongFrac(nA, nTotal, [3, -3, 2, -2, 1]);
      const wB = makeWrongFrac(onlyB, nTotal, [3, -2, 4, -3, 1]);
      const wC = nTotal === 35 && nUnion === 27 ? '\\frac{13}{20}' : makeWrongFrac(nUnion, nTotal, [-4, 2, -3, 1]);
      const wD = nTotal === 35 && nNeither === 8 ? '\\frac{7}{50}' : makeWrongFrac(nNeither, nTotal, [3, 5, -2, 2, 1]);

      const tfStatements = [
        { key: 'a', text: '$P(A) = ' + (aIs ? fA.latex : wA) + '$', isTrue: aIs },
        { key: 'b', text: 'Xác suất chọn được người chỉ đi du lịch núi là $' + (bIs ? fB.latex : wB) + '$', isTrue: bIs },
        { key: 'c', text: '$P(A \\cup B) = ' + (cIs ? fC.latex : wC) + '$', isTrue: cIs },
        { key: 'd', text: 'Xác suất chọn được người chưa đi cả hai loại hình du lịch là $' + (dIs ? fD.latex : wD) + '$', isTrue: dIs },
      ];

      return {
        stem: 'Một công ty du lịch khảo sát $' + nTotal + '$ khách hàng về địa điểm họ đã đi trong năm vừa qua. Kết quả khảo sát có $' + nA + '$ người đã đi du lịch biển, có $' + nB + '$ người đã đi du lịch núi, có $' + nAB + '$ người đã đi cả hai nơi. Đồng thời có những người chưa đi du lịch biển và chưa đi du lịch núi. Chọn ngẫu nhiên một người đã khảo sát. Gọi $A$ là biến cố "Người được chọn đã đi du lịch biển", $B$ là biến cố "Người được chọn đã đi du lịch núi". Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $n(\\Omega) = ' + nTotal + '$, $n(A) = ' + nA + ' \\Rightarrow P(A) = \\dfrac{' + nA + '}{' + nTotal + '}' + (fA.den !== nTotal ? ' = ' + fA.latex : '') + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Số người chỉ đi du lịch núi là $n(C) = ' + nB + ' - ' + nAB + ' = ' + onlyB + ' \\Rightarrow P(C) = \\dfrac{' + onlyB + '}{' + nTotal + '}' + (fB.den !== nTotal ? ' = ' + fB.latex : '') + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $n(A \\cup B) = ' + nA + ' + ' + nB + ' - ' + nAB + ' = ' + nUnion + ' \\Rightarrow P(A \\cup B) = \\dfrac{' + nUnion + '}{' + nTotal + '}' + (fC.den !== nTotal ? ' = ' + fC.latex : '') + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Số người chưa đi cả hai loại hình du lịch là $n(D) = ' + nTotal + ' - ' + nUnion + ' = ' + nNeither + ' \\Rightarrow P(D) = \\dfrac{' + nNeither + '}{' + nTotal + '}' + (fD.den !== nTotal ? ' = ' + fD.latex : '') + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nAB ≥ nA', params: { nTotal: 35, nA: 8, nB: 16, nAB: 8, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (35; 19; 16; 8 -> S Đ S S)', params: { nTotal: 35, nA: 19, nB: 16, nAB: 8, aTrue: 0, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
