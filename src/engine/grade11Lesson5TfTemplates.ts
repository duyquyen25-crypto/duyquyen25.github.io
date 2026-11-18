import { MathTemplate } from '../types/math';

export const G11_B5_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D13 (Q13): Dãy số u_n = a^n + c (Đúng/Sai)
  t11_b5_d13_exp_seq_properties_tf: {
    id: 't11_b5_d13_exp_seq_properties_tf',
    name: 'Phân tích số hạng, tính tăng giảm và bị chặn của dãy u_n = a^n + c (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Dãy số tăng, giảm và bị chặn',
    description: 'Cho dãy số u_n = a^n + c. Xét tính đúng/sai của 4 mệnh đề về giá trị số hạng, hiệu số hạng, tính đơn điệu và bị chặn dưới.',
    conditionSummary: 'a ∈ [2; 6], c ∈ [-9; 9] \\ {0}, kIdx ∈ {3, 4}, mIdx ∈ {5, 6}',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 6 },
      { name: 'c', label: 'Hằng số c', min: -9, max: 9, allowZero: false },
      { name: 'kIdx', label: 'Chỉ số ý (a) (3 hoặc 4)', min: 3, max: 4 },
      { name: 'mIdx', label: 'Chỉ số ý (b) (5 hoặc 6)', min: 5, max: 6 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, c, kIdx, mIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (a < 2 || a > 6 || c === 0 || c < -9 || c > 9) return { valid: false, reason: 'a hoặc c ngoài miền' };
      if ((kIdx !== 3 && kIdx !== 4) || (mIdx !== 5 && mIdx !== 6)) return { valid: false, reason: 'Chỉ số ngoài miền' };
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c, kIdx, mIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const uVal = (n) => Math.pow(a, n) + c;
      const uk = uVal(kIdx);
      const shownUk = aIs ? uk : uk + 3;

      const diff = uVal(mIdx) - uVal(1);
      const shownDiff = bIs ? diff : diff + 4;

      const u1 = uVal(1);
      const tfStatements = [
        { key: 'a', text: '$u_{' + kIdx + '} = ' + shownUk + '$', isTrue: aIs },
        { key: 'b', text: '$u_{' + mIdx + '} - u_1 = ' + shownDiff + '$', isTrue: bIs },
        { key: 'c', text: cIs ? '$(u_n)$ là dãy số tăng' : '$(u_n)$ là dãy số giảm', isTrue: cIs },
        { key: 'd', text: dIs ? '$(u_n)$ bị chặn dưới' : '$(u_n)$ không bị chặn dưới', isTrue: dIs },
      ];

      const expr = a + '^n' + u.formatTrailingConst(c);
      return {
        stem: 'Cho dãy số $(u_n)$ có số hạng tổng quát $u_n = ' + expr + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Ta có $u_{' + kIdx + '} = ' + a + '^' + kIdx + u.formatTrailingConst(c) + ' = ' + uk + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $u_{' + mIdx + '} - u_1 = ' + uVal(mIdx) + ' - (' + u1 + ') = ' + diff + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $u_{n+1} - u_n = ' + a + '^n(' + a + ' - 1) > 0,\\; \\forall n \\ge 1$ nên dãy số tăng (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $u_n \\ge u_1 = ' + u1 + '$ với mọi $n \\ge 1$ nên dãy số bị chặn dưới (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 1', params: { a: 1, c: 3, kIdx: 4, mIdx: 6, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (5^n + 3; S S Đ S)', params: { a: 5, c: 3, kIdx: 4, mIdx: 6, aTrue: 0, bTrue: 0, cTrue: 1, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D14 (Q14): Dãy số u_n = c + p/n (Đúng/Sai)
  t11_b5_d14_reciprocal_seq_properties_tf: {
    id: 't11_b5_d14_reciprocal_seq_properties_tf',
    name: 'Phân tích số hạng, tính đơn điệu và bị chặn của dãy u_n = c + p/n (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Dãy số tăng, giảm và dãy số bị chặn',
    description: 'Cho dãy số u_n = c + p/n. Xét tính đúng/sai về u_1, u_m, tính tăng/giảm và tính bị chặn dưới.',
    conditionSummary: 'c ∈ [-8; 8] \\ {0}, p ∈ [1; 8], mIdx ∈ [6; 15]',
    paramSpecs: [
      { name: 'c', label: 'Hằng số c', min: -8, max: 8, allowZero: false },
      { name: 'p', label: 'Tử số p', min: 1, max: 8 },
      { name: 'mIdx', label: 'Chỉ số ý (b) m', min: 6, max: 15 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { c, p, mIdx, aTrue, bTrue, cTrue, dTrue } = params;
      if (c === 0 || c < -8 || c > 8 || p < 1 || p > 8 || mIdx < 6 || mIdx > 15) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, p, mIdx, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const u1 = c + p;
      const shownU1 = aIs ? u1 : u1 + 2;

      const um = u.simplifyFrac(c * mIdx + p, mIdx);
      const wrongUm = u.simplifyFrac(c * mIdx + p + 1, mIdx);
      const shownUm = bIs ? um.latex : wrongUm.latex;

      const tfStatements = [
        { key: 'a', text: '$u_1 = ' + shownU1 + '$', isTrue: aIs },
        { key: 'b', text: '$u_{' + mIdx + '} = ' + shownUm + '$', isTrue: bIs },
        { key: 'c', text: cIs ? '$(u_n)$ là một dãy số giảm' : '$(u_n)$ là một dãy số tăng', isTrue: cIs },
        { key: 'd', text: dIs ? 'Dãy số $(u_n)$ bị chặn dưới bởi $' + c + '$' : 'Dãy số $(u_n)$ không bị chặn dưới', isTrue: dIs },
      ];

      const expr = c + ' + \\frac{' + p + '}{n}';
      return {
        stem: 'Cho dãy số $(u_n)$, biết $u_n = ' + expr + ',\\; \\forall n \\in \\mathbb{N}^*,\\; n \\ge 1$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Ta có $u_1 = ' + c + ' + ' + p + ' = ' + u1 + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) $u_{' + mIdx + '} = ' + c + ' + \\frac{' + p + '}{' + mIdx + '} = ' + um.latex + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $u_{n+1} - u_n = -\\frac{' + p + '}{n(n+1)} < 0$ nên dãy số là dãy số giảm (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Vì $u_n = ' + expr + ' > ' + c + '$ với mọi $n \\ge 1$ nên dãy số bị chặn dưới bởi $' + c + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 0', params: { c: -2, p: 0, mIdx: 12, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q14 (-2 + 2/n; Đ Đ S S)', params: { c: -2, p: 2, mIdx: 12, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },
};
