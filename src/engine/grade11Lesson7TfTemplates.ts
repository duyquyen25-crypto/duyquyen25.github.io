import { MathTemplate } from '../types/math';

export const G11_B7_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D06 (Q6): Phân tích cấp số nhân khi biết hai số hạng liên tiếp u_p và u_{p+1} (Đúng/Sai)
  t11_b7_d06_two_terms_properties_tf: {
    id: 't11_b7_d06_two_terms_properties_tf',
    name: 'Phân tích công bội, số hạng u_k, tổng S_m và công thức u_n của CSN (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Cấp số nhân',
    description: 'Cho hai số hạng liên tiếp u_p và u_{p+1}. Xét tính đúng/sai về công bội q, số hạng u_k, tổng S_m và công thức u_n.',
    conditionSummary: 'u1 ∈ [-5; 5] \\ {0}, q = qNum/qDen tối giản (qDen ∈ [2; 4]), p ∈ [3; 5], k ∈ [7; 11], m ∈ [3; 5]',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -5, max: 5, allowZero: false },
      { name: 'qNum', label: 'Tử số công bội qNum', min: -3, max: 3, allowZero: false },
      { name: 'qDen', label: 'Mẫu số công bội qDen', min: 2, max: 4 },
      { name: 'p', label: 'Chỉ số p', min: 3, max: 5 },
      { name: 'k', label: 'Chỉ số k ý (b)', min: 7, max: 11 },
      { name: 'm', label: 'Số hạng tính tổng m', min: 3, max: 5 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { u1, qNum, qDen, p, k, m, aTrue, bTrue, cTrue, dTrue } = params;
      if (u1 === 0 || u1 < -5 || u1 > 5) return { valid: false, reason: 'u1 ngoài miền' };
      if (qNum === 0 || Math.abs(qNum) > 3 || qDen < 2 || qDen > 4) {
        return { valid: false, reason: 'Công bội q ngoài miền' };
      }
      if (Math.abs(qNum) === qDen || u.gcd(Math.abs(qNum), qDen) !== 1) {
        return { valid: false, reason: 'q không hợp lệ hoặc chưa tối giản' };
      }
      if (p < 3 || p > 5 || k < 7 || k > 11 || m < 3 || m > 5) {
        return { valid: false, reason: 'Chỉ số p, k, m ngoài miền' };
      }
      for (const flag of [aTrue, bTrue, cTrue, dTrue]) {
        if (flag !== 0 && flag !== 1) return { valid: false, reason: 'Cờ đúng/sai phải là 0 hoặc 1' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, qNum, qDen, p, k, m, aTrue, bTrue, cTrue, dTrue } = params;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;

      const qFrac = u.simplifyFrac(qNum, qDen);
      const qWrongFrac = u.simplifyFrac(-qNum, qDen);

      const upFrac = u.simplifyFrac(u1 * Math.pow(qNum, p - 1), Math.pow(qDen, p - 1));
      const up1Frac = u.simplifyFrac(u1 * Math.pow(qNum, p), Math.pow(qDen, p));

      const ukFrac = u.simplifyFrac(u1 * Math.pow(qNum, k - 1), Math.pow(qDen, k - 1));
      const ukWrongFrac = u.simplifyFrac(-u1 * Math.pow(qNum, k - 1), Math.pow(qDen, k - 1));

      const smNum = u1 * (Math.pow(qNum, m) - Math.pow(qDen, m));
      const smDen = Math.pow(qDen, m - 1) * (qNum - qDen);
      const smFrac = u.simplifyFrac(smNum, smDen);
      const smWrongFrac = u.simplifyFrac(smFrac.num + smFrac.den, smFrac.den);

      const u1Str = u1 < 0 ? '(' + u1 + ')' : String(u1);
      const qBase = '\\left(' + qFrac.latex + '\\right)';
      const rightFormula = '$u_n = ' + u1Str + ' \\cdot ' + qBase + '^{n-1}$';
      const wrongFormula = '$u_n = ' + u1Str + ' \\cdot ' + qBase + '^{n}$';

      const tfStatements = [
        { key: 'a', text: 'Công bội của $(u_n)$ là $q = ' + (aIs ? qFrac.latex : qWrongFrac.latex) + '$', isTrue: aIs },
        { key: 'b', text: '$u_{' + k + '} = ' + (bIs ? ukFrac.latex : ukWrongFrac.latex) + '$', isTrue: bIs },
        { key: 'c', text: 'Tổng của $' + m + '$ số hạng đầu tiên của $(u_n)$ bằng $' + (cIs ? smFrac.latex : smWrongFrac.latex) + '$', isTrue: cIs },
        { key: 'd', text: dIs ? rightFormula : wrongFormula, isTrue: dIs },
      ];

      return {
        stem: 'Cho cấp số nhân $(u_n)$ có $u_{' + p + '} = ' + upFrac.latex + '$ và $u_{' + (p + 1) + '} = ' + up1Frac.latex + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) $q = \\frac{u_{' + (p + 1) + '}}{u_{' + p + '}} = ' + qFrac.latex + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Ta có $u_1 = \\frac{u_{' + p + '}}{q^{' + (p - 1) + '}} = ' + u1 + '$, suy ra $u_{' + k + '} = ' + u1Str + ' \\cdot ' + qBase + '^{' + (k - 1) + '} = ' + ukFrac.latex + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) $S_{' + m + '} = ' + u1Str + ' \\cdot \\frac{' + qBase + '^{' + m + '} - 1}{' + qFrac.latex + ' - 1} = ' + smFrac.latex + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Số hạng tổng quát $u_n = ' + u1Str + ' \\cdot ' + qBase + '^{n-1}$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q chưa tối giản', params: { u1: -3, qNum: 2, qDen: 4, p: 4, k: 11, m: 3, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (u4=-8/9, u5=-16/27; Đ Đ Đ Đ)', params: { u1: -3, qNum: 2, qDen: 3, p: 4, k: 11, m: 3, aTrue: 1, bTrue: 1, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
