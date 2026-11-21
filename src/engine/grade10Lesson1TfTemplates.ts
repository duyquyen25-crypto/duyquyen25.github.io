import { MathTemplate } from '../types/math';

export const G10_B1_TF_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 10 (Q10 - TF): Xét tính đúng-sai của 4 khẳng định số học (chia hết, chính phương, chẵn lẻ, vô tỉ)
  t10_b1_d10_arith_props_tf: {
    id: 't10_b1_d10_arith_props_tf',
    name: 'Xét tính đúng-sai các khẳng định về chia hết, số chính phương, chẵn lẻ và số vô tỉ',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Tính đúng sai của mệnh đề số học',
    description:
      'Đánh giá 4 khẳng định về tính đúng-sai của các mệnh đề: chia hết, số chính phương, số lẻ và căn bậc hai vô tỉ.',
    conditionSummary: 'd in [3;9], kDiv >= 2, sqBase >= 11, oddVal lẻ, irratVal không chính phương, mode in 0..3',
    paramSpecs: [
      { name: 'd', label: 'Số chia d', min: 3, max: 9 },
      { name: 'kDiv', label: 'Thương k (numA = d·k)', min: 2, max: 18 },
      { name: 'sqBase', label: 'Căn của số chính phương', min: 11, max: 75 },
      { name: 'oddVal', label: 'Số lẻ', min: 5, max: 99, step: 2 },
      { name: 'irratVal', label: 'Số dưới dấu căn không chính phương', min: 2, max: 95 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { d, kDiv, sqBase, oddVal, irratVal, mode } = params;
      if (!Number.isInteger(d) || d < 2 || d > 15) return { valid: false, reason: 'Số chia d phải thuộc [2; 15]' };
      if (!Number.isInteger(kDiv) || kDiv < 2 || kDiv > 30) return { valid: false, reason: 'kDiv phải thuộc [2; 30]' };
      if (!Number.isInteger(sqBase) || sqBase < 5 || sqBase > 95) return { valid: false, reason: 'sqBase phải thuộc [5; 95]' };
      if (!Number.isInteger(oddVal) || oddVal < 1 || oddVal > 199 || oddVal % 2 === 0) return { valid: false, reason: 'oddVal phải là số lẻ dương <= 199' };
      if (!Number.isInteger(irratVal) || irratVal < 2 || irratVal > 150) return { valid: false, reason: 'irratVal phải thuộc [2; 150]' };
      const r = Math.round(Math.sqrt(irratVal));
      if (r * r === irratVal) return { valid: false, reason: 'irratVal không được là số chính phương' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d, kDiv, sqBase, oddVal, irratVal, mode } = params;
      const numA = d * kDiv;
      const sqVal = sqBase * sqBase;
      // mode=0 reproduces exact Q10: S - Đ - Đ - Đ
      const patterns = [
        [false, true, true, true],
        [true, false, true, false],
        [true, true, false, true],
        [false, false, true, true],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: 'Mệnh đề "$' + numA + '$ chia hết cho $' + d + '$" là mệnh đề ' + (aTrue ? 'đúng.' : 'sai.'),
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Mệnh đề "$' + sqVal + '$ là số chính phương" là mệnh đề ' + (bTrue ? 'đúng.' : 'sai.'),
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Mệnh đề "$' + oddVal + '$ là số lẻ" là mệnh đề ' + (cTrue ? 'đúng.' : 'sai.'),
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Mệnh đề "$\\sqrt{' + irratVal + '}$ là số vô tỉ" là mệnh đề ' + (dTrue ? 'đúng.' : 'sai.'),
          isTrue: dTrue,
        },
      ];

      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Vì $' + numA + ' = ' + d + ' \\cdot ' + kDiv + '$ nên $' + numA + '$ chia hết cho $' + d + '$ (mệnh đề trong ngoặc là mệnh đề đúng).',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Vì $' + sqVal + ' = ' + sqBase + '^2$ nên $' + sqVal + '$ là số chính phương (mệnh đề trong ngoặc là mệnh đề đúng).',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Số $' + oddVal + '$ không chia hết cho $2$ nên là số lẻ (mệnh đề trong ngoặc là mệnh đề đúng).',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Vì $' + irratVal + '$ không phải là số chính phương nên $\\sqrt{' + irratVal + '}$ là số vô tỉ (mệnh đề trong ngoặc là mệnh đề đúng).',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên irratVal là số chính phương (36)',
        params: { d: 5, kDiv: 5, sqBase: 51, oddVal: 13, irratVal: 36, mode: 0 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q10: 25⋮5, 2601=51², 13 lẻ, √34 vô tỉ (S-Đ-Đ-Đ)',
        params: { d: 5, kDiv: 5, sqBase: 51, oddVal: 13, irratVal: 34, mode: 0 },
        expectedValid: true,
      },
    ],
  },

  // Dạng 11 (Q11 - TF): Bất đẳng thức số, hợp số, phủ định bất đẳng thức, và mệnh đề với ∀x ∈ R
  t10_b1_d11_mixed_quantifier_tf: {
    id: 't10_b1_d11_mixed_quantifier_tf',
    name: 'Xét tính đúng-sai mệnh đề số học, phủ định và mệnh đề lượng từ bậc hai',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Mệnh đề, phủ định và lượng từ',
    description:
      'Xét 4 mệnh đề: so sánh hiệu hai số, kiểm tra hợp số (phân tích thừa số nguyên tố), phủ định bất đẳng thức và bất đẳng thức bậc hai đúng với mọi số thực x.',
    conditionSummary: 'a1 > a2 > 0, bVal hợp số trong [12; 400], c1 < c2 < 0, uCoeff in [2;6], vConst in [1;7], rConst in [1;5]',
    paramSpecs: [
      { name: 'a1', label: 'Số bị trừ a1', min: 60, max: 250 },
      { name: 'a2', label: 'Số trừ a2 (< a1)', min: 40, max: 230 },
      { name: 'bVal', label: 'Hợp số bVal', min: 15, max: 350 },
      { name: 'c1', label: 'Số âm c1', min: -30, max: -8 },
      { name: 'c2', label: 'Số âm c2 (> c1)', min: -20, max: -1 },
      { name: 'uCoeff', label: 'Hệ số u trong (ux - v)²', min: 2, max: 5 },
      { name: 'vConst', label: 'Hằng số v trong (ux - v)²', min: 1, max: 6 },
      { name: 'rConst', label: 'Hằng số dương r', min: 1, max: 5 },
      { name: 'linB', label: 'Hệ số x vế phải', min: 1, max: 6 },
      { name: 'linC', label: 'Hằng số vế phải', min: 1, max: 9 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a1, a2, bVal, c1, c2, uCoeff, vConst, rConst, linB, linC, mode } = params;
      if (!Number.isInteger(a1) || !Number.isInteger(a2) || a2 <= 0 || a1 <= a2 || a1 > 500) {
        return { valid: false, reason: 'Cần 0 < a2 < a1 <= 500' };
      }
      if (!Number.isInteger(bVal) || bVal < 12 || bVal > 500) {
        return { valid: false, reason: 'bVal phải nằm trong [12; 500]' };
      }
      let isPrime = true;
      for (let d = 2; d * d <= bVal; d++) {
        if (bVal % d === 0) { isPrime = false; break; }
      }
      if (isPrime) return { valid: false, reason: 'bVal phải là hợp số (không phải số nguyên tố)' };
      if (!Number.isInteger(c1) || !Number.isInteger(c2) || c1 >= c2 || c2 >= 0 || c1 < -100) {
        return { valid: false, reason: 'Cần -100 <= c1 < c2 < 0' };
      }
      if (!Number.isInteger(uCoeff) || uCoeff < 2 || uCoeff > 6) return { valid: false, reason: 'uCoeff phải thuộc [2; 6]' };
      if (!Number.isInteger(vConst) || vConst < 1 || vConst > 8) return { valid: false, reason: 'vConst phải thuộc [1; 8]' };
      if (!Number.isInteger(rConst) || rConst < 1 || rConst > 9) return { valid: false, reason: 'rConst phải thuộc [1; 9]' };
      if (!Number.isInteger(linB) || linB < 1 || linB > 10) return { valid: false, reason: 'linB phải thuộc [1; 10]' };
      if (!Number.isInteger(linC) || linC < 1 || linC > 15) return { valid: false, reason: 'linC phải thuộc [1; 15]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, a2, bVal, c1, c2, uCoeff, vConst, rConst, linB, linC, mode } = params;
      // mode=0 reproduces exact Q11: S - Đ - S - Đ
      const patterns = [
        [false, true, false, true],
        [true, true, false, false],
        [false, false, true, true],
        [true, false, true, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      // Factorize bVal cleanly
      let tmp = bVal;
      const parts = [];
      for (let f = 2; f * f <= tmp; f++) {
        let cnt = 0;
        while (tmp % f === 0) { tmp = Math.floor(tmp / f); cnt++; }
        if (cnt > 0) parts.push(cnt === 1 ? String(f) : f + '^{' + cnt + '}');
      }
      if (tmp > 1) parts.push(String(tmp));
      const factorStr = parts.join(' \\cdot ');

      const signedR = dTrue ? rConst : -rConst;
      const A = uCoeff * uCoeff;
      const Bdiff = -2 * uCoeff * vConst;
      const Cdiff = vConst * vConst + signedR;
      const Blhs = Bdiff + linB;
      const Clhs = Cdiff + linC;
      const lhsStr = u.formatQuadratic(A, Blhs, Clhs, 'x');
      const rhsStr = u.formatLinear(linB, linC, 'x');
      const diffStr = u.formatQuadratic(A, Bdiff, Cdiff, 'x');
      const linInner = u.formatLinear(uCoeff, -vConst, 'x');
      const sqForm = '(' + linInner + ')^2' + (signedR > 0 ? ' + ' + signedR : ' - ' + Math.abs(signedR));
      const xVertex = u.simplifyFrac(vConst, uCoeff);

      const tfStatements = [
        {
          key: 'a',
          text: '$' + a1 + ' - ' + a2 + (aTrue ? ' > 0$.' : ' \\le 0$.'),
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: '$' + bVal + '$ ' + (bTrue ? 'không phải là số nguyên tố.' : 'là số nguyên tố.'),
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: 'Mệnh đề phủ định của "$' + c1 + ' \\le ' + c2 + '$" là "$' + c1 + (cTrue ? ' > ' : ' = ') + c2 + '$".',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: '$\\forall x \\in \\mathbb{R}: ' + lhsStr + ' \\ge ' + rhsStr + '$.',
          isTrue: dTrue,
        },
      ];

      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem: 'Xét tính đúng-sai của các mệnh đề và mệnh đề chứa biến sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Vì $' + a1 + ' - ' + a2 + ' = ' + (a1 - a2) + ' > 0$.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Vì $' + bVal + ' = ' + factorStr + '$ là hợp số nên $' + bVal + '$ không phải là số nguyên tố.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Mệnh đề phủ định của "$' + c1 + ' \\le ' + c2 + '$" là "$' + c1 + ' > ' + c2 + '$".',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Xét hiệu $(' + lhsStr + ') - (' + rhsStr + ') = ' + diffStr + ' = ' + sqForm + '$. ' +
            (dTrue
              ? 'Vì $(' + linInner + ')^2 + ' + rConst + ' \\ge ' + rConst + ' > 0$ với mọi $x \\in \\mathbb{R}$ nên bất đẳng thức luôn đúng.'
              : 'Khi chọn $x = ' + xVertex.latex + '$ thì hiệu bằng $-' + rConst + ' < 0$, nên mệnh đề sai.'),
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên bVal là số nguyên tố (97)',
        params: { a1: 182, a2: 172, bVal: 97, c1: -14, c2: -4, uCoeff: 4, vConst: 4, rConst: 1, linB: 1, linC: 5, mode: 0 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q11: 182-172<=0, 220 hợp số, -14<=-4, 16x²-31x+22>=x+5 (S-Đ-S-Đ)',
        params: { a1: 182, a2: 172, bVal: 220, c1: -14, c2: -4, uCoeff: 4, vConst: 4, rConst: 1, linB: 1, linC: 5, mode: 0 },
        expectedValid: true,
      },
    ],
  },

  // Dạng 12 (Q12 - TF): Mệnh đề chứa biến đa thức bậc hai P(n) và đếm số nguyên chia hết
  t10_b1_d12_poly_divisible_tf: {
    id: 't10_b1_d12_poly_divisible_tf',
    name: 'Xét tính đúng-sai với đa thức P(n) và bài toán phân thức nhận giá trị nguyên',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Mệnh đề chứa biến và tính chia hết nguyên',
    description:
      'Cho P(n) = -k(n - n0)² - c0 với n nguyên. Xét 4 khẳng định về dấu của P(n0), P(n1), biểu thức P(ma) - P(a) và số giá trị nguyên n để (P(n) - s)/(n - n0) nguyên.',
    conditionSummary: 'k in [1;5], n0 in [1;4], c0 in [1;5], s in [1;9], R = c0 + s in [2;18], n1 != n0, m in [2;5]',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 1, max: 5 },
      { name: 'n0', label: 'Điểm đỉnh n0', min: 1, max: 4 },
      { name: 'c0', label: 'Hằng số c0', min: 1, max: 5 },
      { name: 's', label: 'Số trừ s', min: 1, max: 9 },
      { name: 'n1', label: 'Giá trị kiểm tra n1 (khác n0)', min: 3, max: 8 },
      { name: 'm', label: 'Hệ số nhân m trong P(ma) - P(a)', min: 2, max: 5 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { k, n0, c0, s, n1, m, mode } = params;
      if (!Number.isInteger(k) || k < 1 || k > 6) return { valid: false, reason: 'k phải thuộc [1; 6]' };
      if (!Number.isInteger(n0) || n0 < 1 || n0 > 5) return { valid: false, reason: 'n0 phải thuộc [1; 5]' };
      if (!Number.isInteger(c0) || c0 < 1 || c0 > 6) return { valid: false, reason: 'c0 phải thuộc [1; 6]' };
      if (!Number.isInteger(s) || s < 1 || s > 12) return { valid: false, reason: 's phải thuộc [1; 12]' };
      const R = c0 + s;
      if (R < 2 || R > 18) return { valid: false, reason: 'R = c0 + s phải thuộc [2; 18]' };
      if (!Number.isInteger(n1) || n1 < 2 || n1 > 10 || n1 === n0) return { valid: false, reason: 'n1 phải thuộc [2; 10] và khác n0' };
      if (!Number.isInteger(m) || m < 2 || m > 6) return { valid: false, reason: 'm phải thuộc [2; 6]' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, n0, c0, s, n1, m, mode } = params;
      // P(n) = -k(n - n0)^2 - c0 = A n^2 + B n + C
      const A = -k;
      const B = 2 * k * n0;
      const C = -(k * n0 * n0 + c0);
      const polyN = u.formatQuadratic(A, B, C, 'n');

      const val0 = -c0;
      const val1 = -k * (n1 - n0) * (n1 - n0) - c0;

      const diffA = A * (m * m - 1);
      const diffB = B * (m - 1);
      const exactDiff = u.formatQuadratic(diffA, diffB, 0, 'a');
      const wrongDiff = u.formatQuadratic(diffA, diffB, 3, 'a');

      const R = c0 + s;
      const validNs = [];
      for (let d = 1; d <= R; d++) {
        if (R % d === 0) {
          validNs.push(n0 - d);
          validNs.push(n0 + d);
        }
      }
      validNs.sort((x, y) => x - y);
      const totalDivs = validNs.length;

      // mode=0 reproduces exact Q12: Đ - Đ - S - Đ
      const patterns = [
        [true, true, false, true],
        [true, false, true, false],
        [false, true, false, true],
        [false, true, true, false],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const shownCount = dTrue ? totalDivs : totalDivs + 2;
      const pMaStr = u.formatQuadratic(A * m * m, B * m, C, 'a');
      const pAStr = u.formatQuadratic(A, B, C, 'a');
      const denStr = 'n - ' + n0;

      const tfStatements = [
        {
          key: 'a',
          text: '$P(' + n0 + ')$ ' + (aTrue ? 'không phải là số dương.' : 'là số dương.'),
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: '$P(' + n1 + ') ' + (bTrue ? '\\le 0$.' : '> 0$.'),
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: '$P(' + m + 'a) - P(a) = ' + (cTrue ? exactDiff : wrongDiff) + '$.',
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: 'Số các số nguyên $n$ để $\\dfrac{P(n) - ' + s + '}{' + denStr + '}$ là số nguyên là $' + shownCount + '$.',
          isTrue: dTrue,
        },
      ];

      const answerSummary = tfStatements.map((st) => st.key + ') ' + (st.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem: 'Cho $P(n) = ' + polyN + '$ với $n$ là số nguyên. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Ta có $P(' + n0 + ') = ' + val0 + ' < 0$, nên $P(' + n0 + ')$ không phải là số dương.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Ta có $P(' + n1 + ') = ' + val1 + ' \\le 0$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Ta có $P(' + m + 'a) - P(a) = (' + pMaStr + ') - (' + pAStr + ') = ' + exactDiff + '$.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Ta biến đổi $A = \\dfrac{P(n) - ' + s + '}{' + denStr + '} = \\dfrac{-' + (k === 1 ? '' : k) + '(' + denStr + ')^2 - ' + R + '}{' + denStr + '} = -' + (k === 1 ? '' : k) + '(' + denStr + ') - \\dfrac{' + R + '}{' + denStr + '}$. Để $A \\in \\mathbb{Z}$ thì $(' + denStr + ')$ là ước nguyên của $' + R + '$, suy ra $n \\in \\{' + validNs.join(';\\, ') + '\\}$. Vậy có đúng $' + totalDivs + '$ số nguyên $n$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên n1 = n0',
        params: { k: 3, n0: 1, c0: 1, s: 3, n1: 1, m: 4, mode: 0 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q12: P(n) = -3n² + 6n - 4, (P(n)-3)/(n-1) có 6 nghiệm (Đ-Đ-S-Đ)',
        params: { k: 3, n0: 1, c0: 1, s: 3, n1: 6, m: 4, mode: 0 },
        expectedValid: true,
      },
    ],
  },

  // Dạng 13 (Q13 - TF): Phân biệt mệnh đề và câu không phải mệnh đề
  t10_b1_d13_identify_prop_tf: {
    id: 't10_b1_d13_identify_prop_tf',
    name: 'Phân biệt mệnh đề toán học và câu không phải mệnh đề',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Nhận biết mệnh đề',
    description:
      'Xét tính đúng-sai của 4 khẳng định phân loại đâu là mệnh đề toán học (đẳng thức số học, tính chất hình học) và đâu là câu cảm thán/lời chúc/câu hỏi.',
    conditionSummary: 'p in [1; 15], q in [2; 18], p != q, wishIdx in 0..5, quadIdx in 0..3, triIdx in 0..3, mode in 0..3',
    paramSpecs: [
      { name: 'p', label: 'Số bị trừ p', min: 1, max: 15 },
      { name: 'q', label: 'Số trừ q (khác p)', min: 2, max: 18 },
      { name: 'wishIdx', label: 'Câu không phải mệnh đề (0..5)', min: 0, max: 5 },
      { name: 'quadIdx', label: 'Tính chất tứ giác (0..3)', min: 0, max: 3 },
      { name: 'triIdx', label: 'Tính chất tam giác (0..3)', min: 0, max: 3 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { p, q, wishIdx, quadIdx, triIdx, mode } = params;
      if (!Number.isInteger(p) || p < 1 || p > 50) return { valid: false, reason: 'p phải thuộc [1; 50]' };
      if (!Number.isInteger(q) || q < 1 || q > 50 || p === q) return { valid: false, reason: 'q phải thuộc [1; 50] và khác p' };
      if (!Number.isInteger(wishIdx) || wishIdx < 0 || wishIdx > 5) return { valid: false, reason: 'wishIdx phải thuộc 0..5' };
      if (!Number.isInteger(quadIdx) || quadIdx < 0 || quadIdx > 3) return { valid: false, reason: 'quadIdx phải thuộc 0..3' };
      if (!Number.isInteger(triIdx) || triIdx < 0 || triIdx > 3) return { valid: false, reason: 'triIdx phải thuộc 0..3' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, wishIdx, quadIdx, triIdx, mode } = params;
      const diff = p - q;
      const nonProps = [
        { text: 'Chúc bạn học tốt', kind: 'lời chúc' },
        { text: 'Hôm nay trời đẹp quá!', kind: 'câu cảm thán' },
        { text: 'Bạn đã làm xong bài tập Toán chưa?', kind: 'câu hỏi' },
        { text: 'Hãy giữ trật tự trong giờ học!', kind: 'câu mệnh lệnh' },
        { text: 'Chúc mừng bạn đạt điểm cao!', kind: 'lời chúc mừng' },
        { text: 'Mấy giờ rồi bạn ơi?', kind: 'câu hỏi' },
      ];
      const quadProps = [
        'Hình chữ nhật có hai đường chéo cắt nhau tại trung điểm mỗi đường',
        'Hình vuông có bốn góc đều là góc vuông',
        'Hình thoi có hai đường chéo vuông góc với nhau',
        'Hình bình hành có các cặp cạnh đối bằng nhau',
      ];
      const triProps = [
        'Tam giác có hai đường cao bằng nhau là tam giác cân',
        'Tổng ba góc trong một tam giác bằng $180^\\circ$',
        'Tam giác đều có ba góc bằng nhau và bằng $60^\\circ$',
        'Tam giác cân có hai góc ở đáy bằng nhau',
      ];
      const np = nonProps[wishIdx];
      const qp = quadProps[quadIdx];
      const tp = triProps[triIdx];

      // mode=0: S - S - S - Đ (strictly consistent with Q13's mathematical proof)
      const patterns = [
        [false, false, false, true],
        [true, true, false, true],
        [false, true, true, false],
        [true, false, true, true],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const tfStatements = [
        {
          key: 'a',
          text: 'Khẳng định "$' + p + ' - ' + q + ' = ' + diff + '$" ' + (aTrue ? 'là mệnh đề.' : 'không phải là mệnh đề.'),
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Câu nói "' + np.text + '" ' + (bTrue ? 'không phải là mệnh đề.' : 'là mệnh đề.'),
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: '"' + qp + '" ' + (cTrue ? 'là mệnh đề.' : 'không phải là mệnh đề.'),
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: '"' + tp + '" ' + (dTrue ? 'là mệnh đề.' : 'không phải là mệnh đề.'),
          isTrue: dTrue,
        },
      ];

      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Khẳng định "$' + p + ' - ' + q + ' = ' + diff + '$" xác định được tính đúng sai (đây là một mệnh đề đúng), nên nó là một mệnh đề.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Câu nói "' + np.text + '" là ' + np.kind + ', không thể xác định tính đúng hoặc sai nên không phải là mệnh đề.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': Phát biểu "' + qp + '" xác định được tính đúng sai (là mệnh đề đúng), nên đây là một mệnh đề.',
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': Phát biểu "' + tp + '" xác định được tính đúng sai (là mệnh đề đúng), nên đây là một mệnh đề.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q', params: { p: 4, q: 4, wishIdx: 0, quadIdx: 0, triIdx: 0, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13: 2-4=-2, Chúc bạn học tốt, HCN, Tam giác cân (S-S-S-Đ)', params: { p: 2, q: 4, wishIdx: 0, quadIdx: 0, triIdx: 0, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14 - TF): Xét tính đúng-sai về số hữu tỉ/vô tỉ và tính chất hình học
  t10_b1_d14_irrat_geo_tf: {
    id: 't10_b1_d14_irrat_geo_tf',
    name: 'Xét tính đúng-sai mệnh đề về số hữu tỉ, số vô tỉ và hình học phẳng',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Mệnh đề số học và hình học',
    description:
      'Đánh giá tính đúng-sai của 4 mệnh đề: phân số tối giản là số hữu tỉ, căn bậc hai không chính phương là số vô tỉ, và hai mệnh đề hình học về tứ giác/tam giác.',
    conditionSummary: 'gcd(num, den) = 1, den >= 2, rad không phải số chính phương, geoTrueIdx & geoFalseIdx in 0..4',
    paramSpecs: [
      { name: 'num', label: 'Tử số phân số', min: 1, max: 15 },
      { name: 'den', label: 'Mẫu số phân số (>= 2, nguyên tố cùng nhau với num)', min: 2, max: 16 },
      { name: 'rad', label: 'Số dưới dấu căn không chính phương', min: 2, max: 47 },
      { name: 'geoTrueIdx', label: 'Mệnh đề hình học đúng (0..4)', min: 0, max: 4 },
      { name: 'geoFalseIdx', label: 'Mệnh đề hình học sai (0..4)', min: 0, max: 4 },
      { name: 'mode', label: 'Biến thể Đ/S (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      const { num, den, rad, geoTrueIdx, geoFalseIdx, mode } = params;
      if (!Number.isInteger(num) || num < 1 || num > 30) return { valid: false, reason: 'num phải thuộc [1; 30]' };
      if (!Number.isInteger(den) || den < 2 || den > 30) return { valid: false, reason: 'den phải thuộc [2; 30]' };
      if (u.gcd(num, den) !== 1) return { valid: false, reason: 'Phân số num/den phải tối giản (gcd = 1)' };
      if (!Number.isInteger(rad) || rad < 2 || rad > 90) return { valid: false, reason: 'rad phải thuộc [2; 90]' };
      const r = Math.round(Math.sqrt(rad));
      if (r * r === rad) return { valid: false, reason: 'rad không được là số chính phương' };
      if (!Number.isInteger(geoTrueIdx) || geoTrueIdx < 0 || geoTrueIdx > 4) return { valid: false, reason: 'geoTrueIdx phải thuộc 0..4' };
      if (!Number.isInteger(geoFalseIdx) || geoFalseIdx < 0 || geoFalseIdx > 4) return { valid: false, reason: 'geoFalseIdx phải thuộc 0..4' };
      if (!Number.isInteger(mode) || mode < 0 || mode > 3) return { valid: false, reason: 'mode phải thuộc 0..3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { num, den, rad, geoTrueIdx, geoFalseIdx, mode } = params;
      const geoTrueList = [
        { stmt: 'Hình vuông có hai đường chéo vuông góc.', why: 'Hình vuông vừa là hình chữ nhật vừa là hình thoi nên hai đường chéo vuông góc.' },
        { stmt: 'Hình thoi có bốn cạnh bằng nhau.', why: 'Theo định nghĩa, hình thoi là tứ giác có bốn cạnh bằng nhau.' },
        { stmt: 'Hình chữ nhật có hai đường chéo bằng nhau.', why: 'Hai đường chéo của hình chữ nhật luôn bằng nhau và cắt nhau tại trung điểm mỗi đường.' },
        { stmt: 'Tam giác đều có ba góc bằng $60^\\circ$.', why: 'Tam giác đều có ba góc bằng nhau và tổng bằng $180^\\circ$ nên mỗi góc bằng $60^\\circ$.' },
        { stmt: 'Mọi hình vuông đều là hình chữ nhật.', why: 'Hình vuông có bốn góc vuông nên thỏa mãn định nghĩa hình chữ nhật.' },
      ];
      const geoFalseList = [
        { stmt: 'Tam giác có một góc bằng $60^\\circ$ là tam giác đều.', why: 'Một tam giác bất kì có góc $60^\\circ$ chưa chắc đều (chẳng hạn tam giác có ba góc $60^\\circ, 50^\\circ, 70^\\circ$).' },
        { stmt: 'Tứ giác có hai đường chéo bằng nhau là hình chữ nhật.', why: 'Hình thang cân cũng có hai đường chéo bằng nhau nhưng không phải hình chữ nhật.' },
        { stmt: 'Tứ giác có hai đường chéo vuông góc là hình thoi.', why: 'Tứ giác có hai đường chéo vuông góc chưa chắc cắt nhau tại trung điểm mỗi đường.' },
        { stmt: 'Tam giác có hai góc nhọn là tam giác đều.', why: 'Mọi tam giác đều có ít nhất hai góc nhọn nhưng không nhất thiết là tam giác đều.' },
        { stmt: 'Hình bình hành có hai đường chéo bằng nhau là hình vuông.', why: 'Hình bình hành có hai đường chéo bằng nhau chỉ suy ra là hình chữ nhật, chưa chắc là hình vuông.' },
      ];
      const gt = geoTrueList[geoTrueIdx];
      const gf = geoFalseList[geoFalseIdx];

      // mode=0 reproduces exact Q14: S - Đ - Đ - S
      const patterns = [
        [false, true, true, false],
        [true, false, true, false],
        [false, true, false, true],
        [true, true, false, true],
      ];
      const [aTrue, bTrue, cTrue, dTrue] = patterns[mode];

      const cItem = cTrue ? gt : gf;
      const dItem = dTrue ? gt : gf;
      // Avoid identical statements for c and d if cTrue === dTrue
      const dFinal =
        cTrue === dTrue
          ? (dTrue ? geoTrueList[(geoTrueIdx + 1) % geoTrueList.length] : geoFalseList[(geoFalseIdx + 1) % geoFalseList.length])
          : dItem;

      const tfStatements = [
        {
          key: 'a',
          text: 'Số $\\dfrac{' + num + '}{' + den + '}$ là ' + (aTrue ? 'số hữu tỉ.' : 'số vô tỉ.'),
          isTrue: aTrue,
        },
        {
          key: 'b',
          text: 'Số $\\sqrt{' + rad + '}$ là ' + (bTrue ? 'số vô tỉ.' : 'số hữu tỉ.'),
          isTrue: bTrue,
        },
        {
          key: 'c',
          text: cItem.stmt,
          isTrue: cTrue,
        },
        {
          key: 'd',
          text: dFinal.stmt,
          isTrue: dTrue,
        },
      ];

      const answerSummary = tfStatements.map((s) => s.key + ') ' + (s.isTrue ? 'Đúng' : 'Sai')).join(' · ');
      return {
        stem: 'Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary,
        solutionSteps: [
          'a) ' + (aTrue ? 'Đúng' : 'Sai') + ': Số $\\dfrac{' + num + '}{' + den + '}$ viết được dưới dạng phân số của hai số nguyên nên là số hữu tỉ.',
          'b) ' + (bTrue ? 'Đúng' : 'Sai') + ': Vì $' + rad + '$ không phải số chính phương nên $\\sqrt{' + rad + '}$ là số vô tỉ.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + ': ' + cItem.why,
          'd) ' + (dTrue ? 'Đúng' : 'Sai') + ': ' + dFinal.why,
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên phân số chưa tối giản (4/8)',
        params: { num: 4, den: 8, rad: 2, geoTrueIdx: 0, geoFalseIdx: 0, mode: 0 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q14: 3/8 vô tỉ, √2 vô tỉ, hình vuông, tam giác 60° (S-Đ-Đ-S)',
        params: { num: 3, den: 8, rad: 2, geoTrueIdx: 0, geoFalseIdx: 0, mode: 0 },
        expectedValid: true,
      },
    ],
  },
};
