import { MathTemplate } from '../types/math';

export const G11_B6_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D12 (Q12): Phân tích CSC khi biết u_1 và d (Đúng/Sai)
  t11_b6_d12_basic_properties_tf: {
    id: 't11_b6_d12_basic_properties_tf',
    name: 'Phân tích số hạng, vị trí, tổng S_m và công thức tổng quát của CSC (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho cấp số cộng biết u_1 và d. Xét tính đúng/sai về u_p, chỉ số của giá trị V, tổng S_m và công thức u_n.',
    conditionSummary: 'u1 ∈ [-10; 10], d ∈ [-8; 8] \\ {0}, p ∈ [20; 45], q ∈ [18; 40], m ∈ [12; 25]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -10, max: 10 },
      { name: 'd', label: 'Công sai d', min: -8, max: 8, allowZero: false },
      { name: 'p', label: 'Chỉ số ý (a) p', min: 20, max: 45 },
      { name: 'q', label: 'Chỉ số ý (b) q', min: 18, max: 40 },
      { name: 'm', label: 'Số hạng tính tổng m', min: 12, max: 25 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { u1, d, p, q, m, aTrue, bTrue, cTrue, dTrue } = params;
      if (d === 0 || d < -8 || d > 8 || u1 < -10 || u1 > 10) return { valid: false, reason: 'u1 hoặc d ngoài miền' };
      if (p < 20 || p > 45 || q < 18 || q > 40 || m < 12 || m > 25) return { valid: false, reason: 'Chỉ số ngoài miền' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, p, q, m, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const up = u1 + (p - 1) * d;
      const shownUp = aIs ? up : up + d;

      const uq = u1 + (q - 1) * d;
      const shownQ = bIs ? q : q + 3;

      const sm = (m * (2 * u1 + (m - 1) * d)) / 2;
      const shownSm = cIs ? sm : sm + m;

      const c0 = u1 - d;
      const rightUn = u.formatLinear(d, c0, 'n');
      const wrongUn = u.formatLinear(d, c0 - 1, 'n');
      const shownUn = dIs ? rightUn : wrongUn;

      const tfStatements = [
        { key: 'a', text: '$u_{' + p + '} = ' + shownUp + '$', isTrue: aIs },
        { key: 'b', text: 'Số $' + uq + '$ là số hạng thứ $' + shownQ + '$ của $(u_n)$', isTrue: bIs },
        { key: 'c', text: 'Tổng của $' + m + '$ số hạng đầu tiên của $(u_n)$ bằng $' + shownSm + '$', isTrue: cIs },
        { key: 'd', text: '$u_n = ' + shownUn + '$', isTrue: dIs },
      ];

      return {
        stem: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $u_{' + p + '} = ' + u1 + ' + ' + (p - 1) + ' \\cdot (' + d + ') = ' + up + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $' + uq + ' = ' + u1 + ' + (n - 1) \\cdot (' + d + ') \\Rightarrow n = ' + q + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $S_{' + m + '} = \\frac{' + m + '}{2}\\left[2 \\cdot (' + u1 + ') + ' + (m - 1) + ' \\cdot (' + d + ')\\right] = ' + sm + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $u_n = ' + u1 + ' + (n - 1) \\cdot (' + d + ') = ' + rightUn + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: -3, d: 0, p: 39, q: 36, m: 17, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (u1=-3, d=-1; Đ Đ Đ S)', params: { u1: -3, d: -1, p: 39, q: 36, m: 17, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Phân tích CSC khi biết u_p và u_q (Đúng/Sai)
  t11_b6_d13_two_terms_properties_tf: {
    id: 't11_b6_d13_two_terms_properties_tf',
    name: 'Phân tích CSC khi biết hai số hạng u_p và u_q (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho cấp số cộng biết u_p và u_q. Xét tính đúng/sai về (u_1, d), vị trí số hạng, tổng S_m và công thức u_n.',
    conditionSummary: 'u1 ∈ [-12; 12], d ∈ [-12; 18] \\ {0}, 6 ≤ p < q ≤ 20, k ∈ [22; 38], m ∈ [15; 30]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -12, max: 12 },
      { name: 'd', label: 'Công sai d', min: -12, max: 18, allowZero: false },
      { name: 'p', label: 'Chỉ số p', min: 6, max: 12 },
      { name: 'q', label: 'Chỉ số q (> p)', min: 14, max: 20 },
      { name: 'k', label: 'Chỉ số k ý (b)', min: 22, max: 38 },
      { name: 'm', label: 'Số hạng tính tổng m', min: 15, max: 30 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { u1, d, p, q, k, m, aTrue, bTrue, cTrue, dTrue } = params;
      if (d === 0 || d < -12 || d > 18 || u1 < -12 || u1 > 12) return { valid: false, reason: 'u1 hoặc d ngoài miền' };
      if (p < 6 || q > 20 || p >= q || k < 22 || k > 38 || m < 15 || m > 30) return { valid: false, reason: 'Chỉ số ngoài miền' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, p, q, k, m, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const up = u1 + (p - 1) * d;
      const uq = u1 + (q - 1) * d;
      const uk = u1 + (k - 1) * d;
      const sm = (m * (2 * u1 + (m - 1) * d)) / 2;

      const shownU1 = aIs ? u1 : u1 + 3;
      const shownD = aIs ? d : d + 2;
      const shownK = bIs ? k : k + 5;
      const wrongSm = u.simplifyFrac(2 * sm + m * 7, 2);
      const shownSm = cIs ? String(sm) : wrongSm.latex;
      const rightUn = u.formatLinear(d, u1 - d, 'n');
      const wrongUn = u.formatLinear(d, u1, 'n');
      const shownUn = dIs ? rightUn : wrongUn;

      const tfStatements = [
        { key: 'a', text: '$u_1 = ' + shownU1 + ',\\; d = ' + shownD + '$', isTrue: aIs },
        { key: 'b', text: 'Số $' + uk + '$ là số hạng thứ $' + shownK + '$ của $(u_n)$', isTrue: bIs },
        { key: 'c', text: 'Tổng của $' + m + '$ số hạng đầu tiên của $(u_n)$ bằng $' + shownSm + '$', isTrue: cIs },
        { key: 'd', text: '$u_n = ' + shownUn + '$', isTrue: dIs },
      ];

      return {
        stem: 'Cho cấp số cộng $(u_n)$ có $u_{' + p + '} = ' + up + '$ và $u_{' + q + '} = ' + uq + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Giải hệ $u_1 + ' + (p - 1) + 'd = ' + up + ',\\; u_1 + ' + (q - 1) + 'd = ' + uq + ' \\Rightarrow u_1 = ' + u1 + ',\\; d = ' + d + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $' + uk + ' = ' + u1 + ' + (n - 1) \\cdot (' + d + ') \\Rightarrow n = ' + k + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $S_{' + m + '} = \\frac{' + m + '}{2}\\left[2 \\cdot (' + u1 + ') + ' + (m - 1) + ' \\cdot (' + d + ')\\right] = ' + sm + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $u_n = ' + rightUn + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p >= q', params: { u1: -7, d: 15, p: 15, q: 15, k: 32, m: 25, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (u11=143, u16=218; Đ S S Đ)', params: { u1: -7, d: 15, p: 11, q: 16, k: 32, m: 25, aTrue: 1, bTrue: 0, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Phân tích CSC khi biết u_1 và S_{n0} (Đúng/Sai)
  t11_b6_d14_u1_sum_properties_tf: {
    id: 't11_b6_d14_u1_sum_properties_tf',
    name: 'Phân tích CSC khi biết u_1 và tổng S_{n0} (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Cấp số cộng',
    description: 'Cho cấp số cộng biết u_1 và S_{n0}. Xét tính đúng/sai về công sai d, số hạng u_p, tổng S_m và công thức u_n.',
    conditionSummary: 'u1 ∈ [-12; 15], d ∈ [-10; 10] \\ {0}, n0 ∈ [9; 19], p ∈ [20; 35], m ∈ [30; 50]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -12, max: 15 },
      { name: 'd', label: 'Công sai d', min: -10, max: 10, allowZero: false },
      { name: 'n0', label: 'Số hạng của S_{n0}', min: 9, max: 19 },
      { name: 'p', label: 'Chỉ số p ý (b)', min: 20, max: 35 },
      { name: 'm', label: 'Số hạng tính tổng m ý (c)', min: 30, max: 50 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { u1, d, n0, p, m, aTrue, bTrue, cTrue, dTrue } = params;
      if (d === 0 || d < -10 || d > 10 || u1 < -12 || u1 > 15) return { valid: false, reason: 'u1 hoặc d ngoài miền' };
      if (n0 < 9 || n0 > 19 || p < 20 || p > 35 || m < 30 || m > 50) return { valid: false, reason: 'Chỉ số ngoài miền' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, n0, p, m, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const sn0 = (n0 * (2 * u1 + (n0 - 1) * d)) / 2;
      const up = u1 + (p - 1) * d;
      const sm = (m * (2 * u1 + (m - 1) * d)) / 2;

      const shownD = aIs ? d : d + 1;
      const shownUp = bIs ? up : up + d;
      const wrongSm = u.simplifyFrac(2 * sm - m * 9, 2);
      const shownSm = cIs ? String(sm) : wrongSm.latex;
      const rightUn = u.formatLinear(d, u1 - d, 'n');
      const wrongUn = u.formatLinear(d, u1, 'n');
      const shownUn = dIs ? rightUn : wrongUn;

      const tfStatements = [
        { key: 'a', text: '$d = ' + shownD + '$', isTrue: aIs },
        { key: 'b', text: '$u_{' + p + '} = ' + shownUp + '$', isTrue: bIs },
        { key: 'c', text: 'Tổng của $' + m + '$ số hạng đầu tiên của $(u_n)$ bằng $' + shownSm + '$', isTrue: cIs },
        { key: 'd', text: '$u_n = ' + shownUn + '$', isTrue: dIs },
      ];

      return {
        stem: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và tổng của $' + n0 + '$ số hạng đầu tiên $S_{' + n0 + '} = ' + sn0 + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $S_{' + n0 + '} = \\frac{' + n0 + '}{2}\\left[2 \\cdot (' + u1 + ') + ' + (n0 - 1) + 'd\\right] = ' + sn0 + ' \\Rightarrow d = ' + d + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $u_{' + p + '} = ' + u1 + ' + ' + (p - 1) + ' \\cdot (' + d + ') = ' + up + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $S_{' + m + '} = \\frac{' + m + '}{2}\\left[2 \\cdot (' + u1 + ') + ' + (m - 1) + ' \\cdot (' + d + ')\\right] = ' + sm + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $u_n = ' + rightUn + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { u1: 9, d: 0, n0: 13, p: 28, m: 45, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (u1=9, S13=-273; S S S S)', params: { u1: 9, d: -5, n0: 13, p: 28, m: 45, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D15 (Q15): Bài toán thực tế khấu hao giá trị máy theo năm (Đúng/Sai)
  t11_b6_d15_depreciation_tf: {
    id: 't11_b6_d15_depreciation_tf',
    name: 'Bài toán thực tế khấu hao giá trị máy móc theo năm (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế cấp số cộng',
    description: 'Giá máy ban đầu V0 giảm D mỗi năm. Xét tính đúng/sai về giá trị sau năm thứ 3, công sai, ngưỡng năm thứ k và số năm tối thiểu còn dưới một nửa giá trị ban đầu.',
    conditionSummary: 'V0 ∈ [400; 950], D ∈ [15; 50], k ∈ [8; 16], V0 - (k + 2)D > 0',
    paramSpecs: [
      { name: 'V0', label: 'Giá trị mới mua V0 (triệu)', min: 400, max: 950 },
      { name: 'D', label: 'Mức giảm mỗi năm D (triệu)', min: 15, max: 50 },
      { name: 'k', label: 'Số năm ý (c) k', min: 8, max: 16 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { V0, D, k, aTrue, bTrue, cTrue, dTrue } = params;
      if (V0 < 400 || V0 > 950 || D < 15 || D > 50 || k < 8 || k > 16) return { valid: false, reason: 'Tham số ngoài miền' };
      if (V0 - (k + 2) * D <= 0) return { valid: false, reason: 'Giá trị máy phải dương sau k+2 năm' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { V0, D, k, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const u1 = V0 - D;
      const u3 = V0 - 3 * D;
      const shownU3 = aIs ? u3 : u3 - D;
      const shownD = bIs ? -D : D;

      const uk = V0 - k * D;
      const threshC = cIs ? uk + 15 : uk - 19;

      // V0 - n*D < V0/2 <=> n > V0/(2D)
      const nMin = Math.floor(V0 / (2 * D)) + 1;
      const shownNMin = dIs ? nMin : Math.max(2, nMin - 3);
      const ratioVal = (V0 / (2 * D)).toFixed(2).replace('.', ',');

      const tfStatements = [
        { key: 'a', text: '$u_3 = ' + shownU3 + '$', isTrue: aIs },
        { key: 'b', text: 'Dãy số $(u_n)$ là một cấp số cộng có công sai $d = ' + shownD + '$', isTrue: bIs },
        { key: 'c', text: 'Giá chiếc máy sau $' + k + '$ năm sử dụng nhỏ hơn $' + threshC + '$ triệu đồng', isTrue: cIs },
        { key: 'd', text: 'Sau ít nhất $' + shownNMin + '$ năm thì giá chiếc máy nhỏ hơn một nửa giá trị ban đầu', isTrue: dIs },
      ];

      return {
        stem:
          'Giá của một cái máy phục vụ sản xuất lúc mới mua là $' +
          V0 +
          '$ triệu đồng. Cứ sau mỗi năm sử dụng, giá của chiếc máy đó giảm $' +
          D +
          '$ triệu đồng. Gọi $u_n$ (triệu đồng) là giá của chiếc máy sau năm thứ $n$ sử dụng. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $(u_n)$ là cấp số cộng với $u_1 = ' + V0 + ' - ' + D + ' = ' + u1 + '$ và $d = -' + D + '$. Do đó $u_3 = ' + u3 + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Công sai của cấp số cộng là $d = -' + D + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Giá máy sau $' + k + '$ năm sử dụng là $u_{' + k + '} = ' + uk + '$ triệu đồng (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) $u_n < \\frac{' + V0 + '}{2} \\Leftrightarrow ' + V0 + ' - ' + D + 'n < ' + (V0 / 2) + ' \\Leftrightarrow n > ' + ratioVal + '$. Vậy sau ít nhất $' + nMin + '$ năm (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên máy âm giá trị', params: { V0: 400, D: 40, k: 12, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (V0=704, D=25, k=13; S S S S)', params: { V0: 704, D: 25, k: 13, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
