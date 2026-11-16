import { MathTemplate } from '../types/math';

const TRIG11_B3_TF_HELPERS = String.raw`
  const gcd = (x, y) => {
    let a = Math.abs(Math.round(x));
    let b = Math.abs(Math.round(y));
    while (b !== 0) { const t = b; b = a % b; a = t; }
    return a || 1;
  };
  const fmtPiFrac = (num, den) => {
    const f = u.simplifyFrac(num, den);
    if (f.num === 0) return '0';
    if (f.den === 1) {
      if (f.num === 1) return '\\pi';
      if (f.num === -1) return '-\\pi';
      return f.num + '\\pi';
    }
    const sign = f.num < 0 ? '-' : '';
    const absN = Math.abs(f.num);
    return sign + '\\frac{' + (absN === 1 ? '' : absN) + '\\pi}{' + f.den + '}';
  };
  const fmtMulVar = (k, v) => (k === 1 ? v : String(k) + v);
`;

export const G11_B3_TF_TEMPLATES: Record<string, MathTemplate> = {
  // D16 (Q16): y = c + a cos(bx) hoặc c + a sin(bx) -> TXĐ, GTLN, GTNN, Tập giá trị
  t11_b3_d16_basic_trig_properties_tf: {
    id: 't11_b3_d16_basic_trig_properties_tf',
    name: 'Phân tích tập xác định, GTLN, GTNN và tập giá trị của y = c + a cos(bx) (Đúng/Sai)',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Hàm số lượng giác',
    description: 'Cho y = c + a cos(bx) hoặc c + a sin(bx). Xét tính đúng/sai của 4 mệnh đề về TXĐ, GTLN, GTNN và tập giá trị.',
    conditionSummary: 'a ∈ [-6; 6] \\ {0}, b ∈ [1; 5], c ∈ [-6; 8]',
    paramSpecs: [
      { name: 'c', label: 'Hằng số c', min: -6, max: 8 },
      { name: 'a', label: 'Biên độ a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số góc b', min: 1, max: 5 },
      { name: 'fnIdx', label: 'Hàm (0: cos, 1: sin)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, fnIdx } = params;
      if (a === 0 || b < 1) return { valid: false, reason: 'a != 0 và b >= 1' };
      if (fnIdx !== 0 && fnIdx !== 1) return { valid: false, reason: 'fnIdx không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, a, b, fnIdx, aTrue, bTrue, cTrue, dTrue } = params;
      ` + TRIG11_B3_TF_HELPERS + String.raw`
      const fnName = fnIdx === 0 ? '\\cos' : '\\sin';
      const arg = fmtMulVar(b, 'x');
      const trigTerm = fnName + '(' + arg + ')';
      const signedA = a === 1 ? ' + ' + trigTerm : a === -1 ? ' - ' + trigTerm : a > 0 ? ' + ' + a + trigTerm : ' - ' + Math.abs(a) + trigTerm;
      const expr = String(c) + signedA;
      const maxV = c + Math.abs(a);
      const minV = c - Math.abs(a);
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;
      const maxShown = bIs ? maxV : maxV + 2;
      const minShown = cIs ? minV : minV - 1;
      const rangeShown = dIs ? '[' + minV + ';\\, ' + maxV + ']' : '[' + (minV - 2) + ';\\, ' + (maxV + 2) + ']';
      const domShown = aIs ? 'D = \\mathbb{R}' : 'D = [-1;\\, 1]';
      const tfStatements = [
        { key: 'a', text: 'Hàm số có tập xác định là $' + domShown + '$.', isTrue: aIs },
        { key: 'b', text: 'Giá trị lớn nhất của hàm số bằng $' + maxShown + '$.', isTrue: bIs },
        { key: 'c', text: 'Giá trị nhỏ nhất của hàm số bằng $' + minShown + '$.', isTrue: cIs },
        { key: 'd', text: 'Tập giá trị của hàm số là $T = ' + rangeShown + '$.', isTrue: dIs },
      ];
      return {
        stem: 'Cho hàm số $y = ' + expr + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Tập xác định của hàm số là $D = \\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $-1 \\le ' + trigTerm + ' \\le 1$ nên $' + minV + ' \\le y \\le ' + maxV + '$, suy ra GTLN bằng $' + maxV + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Giá trị nhỏ nhất của hàm số bằng $' + minV + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tập giá trị của hàm số là $T = [' + minV + ';\\, ' + maxV + ']$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { c: 2, a: 0, b: 2, fnIdx: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (2 - cos 2x; Đ Đ S Đ)', params: { c: 2, a: -1, b: 2, fnIdx: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D17 (Q17): y = c + a sin^2(x + pπ/q) -> TXĐ, GTLN, GTNN, Tập giá trị
  t11_b3_d17_sq_shifted_properties_tf: {
    id: 't11_b3_d17_sq_shifted_properties_tf',
    name: 'Phân tích tập xác định, GTLN, GTNN của y = c + a sin²(x + φ) (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm số lượng giác',
    description: 'Cho y = c + a sin²(x + pπ/q) hoặc cos². Xét tính đúng/sai của 4 mệnh đề về TXĐ, GTLN, GTNN, tập giá trị.',
    conditionSummary: 'a ∈ [-8; 8] \\ {0}, c ∈ [-6; 10], 1 ≤ p < q ≤ 10, gcd(p, q) = 1',
    paramSpecs: [
      { name: 'c', label: 'Hằng số c', min: -6, max: 10 },
      { name: 'a', label: 'Hệ số a', min: -8, max: 8, allowZero: false },
      { name: 'p', label: 'Tử số pha p', min: 1, max: 5 },
      { name: 'q', label: 'Mẫu số pha q', min: 3, max: 10 },
      { name: 'fnIdx', label: 'Hàm (0: sin², 1: cos²)', min: 0, max: 1 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, p, q, fnIdx } = params;
      if (a === 0 || p < 1 || q < 2) return { valid: false, reason: 'Tham số ngoài miền' };
      if (fnIdx !== 0 && fnIdx !== 1) return { valid: false, reason: 'fnIdx không hợp lệ' };
      let x = p, y = q;
      while (y !== 0) { const t = y; y = x % y; x = t; }
      if (x !== 1) return { valid: false, reason: 'p/q chưa tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, a, p, q, fnIdx, aTrue, bTrue, cTrue, dTrue } = params;
      ` + TRIG11_B3_TF_HELPERS + String.raw`
      const fnName = fnIdx === 0 ? '\\sin^2' : '\\cos^2';
      const phi = fmtPiFrac(p, q);
      const trigSq = fnName + '\\left(x + ' + phi + '\\right)';
      const signedA = a === 1 ? ' + ' + trigSq : a === -1 ? ' - ' + trigSq : a > 0 ? ' + ' + a + trigSq : ' - ' + Math.abs(a) + trigSq;
      const expr = String(c) + signedA;
      const maxV = c + Math.max(0, a);
      const minV = c + Math.min(0, a);
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;
      const domShown = aIs ? 'D = \\mathbb{R}' : 'D = \\mathbb{R}\\setminus\\{0\\}';
      const maxShown = bIs ? maxV : maxV + 3;
      const minShown = cIs ? minV : minV - 2;
      const rangeShown = dIs ? '[' + minV + ';\\, ' + maxV + ']' : '[' + (minV - 3) + ';\\, ' + (maxV + 3) + ']';
      const tfStatements = [
        { key: 'a', text: 'Hàm số có tập xác định là $' + domShown + '$.', isTrue: aIs },
        { key: 'b', text: 'Giá trị lớn nhất của hàm số bằng $' + maxShown + '$.', isTrue: bIs },
        { key: 'c', text: 'Giá trị nhỏ nhất của hàm số bằng $' + minShown + '$.', isTrue: cIs },
        { key: 'd', text: 'Tập giá trị của hàm số là $T = ' + rangeShown + '$.', isTrue: dIs },
      ];
      return {
        stem: 'Cho hàm số $y = ' + expr + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Tập xác định của hàm số là $D = \\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Vì $0 \\le ' + trigSq + ' \\le 1$ nên $' + minV + ' \\le y \\le ' + maxV + '$, giá trị lớn nhất bằng $' + maxV + '$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Giá trị nhỏ nhất của hàm số bằng $' + minV + '$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tập giá trị là $T = [' + minV + ';\\, ' + maxV + ']$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { c: 4, a: 0, p: 3, q: 10, fnIdx: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (4 - 6sin²(x + 3π/10); Đ Đ S S)', params: { c: 4, a: -6, p: 3, q: 10, fnIdx: 0, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D18 (Q18): y = c + a sin(bx) (c != 0) -> TXĐ, tính chẵn lẻ, tập giá trị, giao trục tung
  t11_b3_d18_parity_range_y_intercept_tf: {
    id: 't11_b3_d18_parity_range_y_intercept_tf',
    name: 'Xét tập xác định, tính chẵn lẻ, tập giá trị và giao điểm trục tung (Đúng/Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Hàm số lượng giác',
    description: 'Cho y = c + a sin(bx) với c ≠ 0. Xét 4 mệnh đề về tập xác định, tính chẵn lẻ, tập giá trị và tung độ giao điểm trục tung.',
    conditionSummary: 'a, c ∈ [-7; 7] \\ {0}, b ∈ [1; 5]',
    paramSpecs: [
      { name: 'c', label: 'Hằng số c', min: -6, max: 7, allowZero: false },
      { name: 'a', label: 'Biên độ a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số góc b', min: 1, max: 5 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c } = params;
      if (a === 0 || c === 0 || b < 1) return { valid: false, reason: 'Cần a, c khác 0 và b >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c, a, b, aTrue, bTrue, cTrue, dTrue } = params;
      ` + TRIG11_B3_TF_HELPERS + String.raw`
      const arg = fmtMulVar(b, 'x');
      const trigTerm = '\\sin(' + arg + ')';
      const signedA = a === 1 ? ' + ' + trigTerm : a === -1 ? ' - ' + trigTerm : a > 0 ? ' + ' + a + trigTerm : ' - ' + Math.abs(a) + trigTerm;
      const expr = String(c) + signedA;
      const minV = c - Math.abs(a);
      const maxV = c + Math.abs(a);
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;
      const domShown = aIs ? 'D = \\mathbb{R}' : 'D = \\mathbb{R}\\setminus\\{0\\}';
      const parityText = bIs
        ? 'Hàm số đã cho là hàm số không chẵn, không lẻ.'
        : 'Hàm số đã cho là hàm số lẻ.';
      const rangeShown = cIs ? '[' + minV + ';\\, ' + maxV + ']' : '[' + (minV - 2) + ';\\, ' + (maxV + 4) + ']';
      const yIntShown = dIs ? c : c + Math.abs(a);
      const tfStatements = [
        { key: 'a', text: 'Tập xác định của hàm số là $' + domShown + '$.', isTrue: aIs },
        { key: 'b', text: parityText, isTrue: bIs },
        { key: 'c', text: 'Tập giá trị của hàm số đã cho là $T = ' + rangeShown + '$.', isTrue: cIs },
        { key: 'd', text: 'Đồ thị cắt trục tung tại điểm có tung độ bằng $' + yIntShown + '$.', isTrue: dIs },
      ];
      return {
        stem: 'Cho hàm số $y = ' + expr + '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Tập xác định của hàm số là $D = \\mathbb{R}$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Với $f(x) = ' + expr + '$, ta có $f(-x) = ' + c + (a > 0 ? ' - ' + (Math.abs(a) === 1 ? '' : Math.abs(a)) : ' + ' + (Math.abs(a) === 1 ? '' : Math.abs(a))) + trigTerm + '$ nên $f(-x) \\ne f(x)$ và $f(-x) \\ne -f(x)$ (vì $c = ' + c + ' \\ne 0$). Vậy hàm không chẵn, không lẻ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Do $-1 \\le ' + trigTerm + ' \\le 1$ nên $' + minV + ' \\le y \\le ' + maxV + '$, tập giá trị là $[' + minV + ';\\, ' + maxV + ']$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Cho $x = 0 \\Rightarrow y = ' + c + '$, nên giao điểm với trục tung có tung độ bằng $' + c + '$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { c: 0, a: -2, b: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (3 - 2sin 3x; Đ Đ S Đ)', params: { c: 3, a: -2, b: 3, aTrue: 1, bTrue: 1, cTrue: 0, dTrue: 1 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Dao động điều hòa y = A cos(2x)
  t11_b3_d19_harmonic_cosine_tf: {
    id: 't11_b3_d19_harmonic_cosine_tf',
    name: 'Dao động điều hòa y = A cos(2x) và tổng hợp dao động (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế hàm số lượng giác',
    description: 'Cho dao động điều hòa y = A cos(2x) (A chẵn). Xét giá trị tại 2π/3, tập giá trị, công thức nhân đôi và tổng hợp hai dao động cùng phương.',
    conditionSummary: 'A ∈ [12; 48], A chia hết cho 2',
    paramSpecs: [
      { name: 'k', label: 'Biên độ A = 2k', min: 6, max: 24 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { k } = params;
      if (k < 4) return { valid: false, reason: 'Cần k >= 4 (A >= 8)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, aTrue, bTrue, cTrue, dTrue } = params;
      const A = 2 * k;
      const yAtVal = -k;
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;
      const yAtShown = aIs ? yAtVal : yAtVal + 2;
      const rangeShown = bIs ? '\\left[-' + A + ';\\, ' + A + '\\right]' : '\\left[0;\\, ' + A + '\\right]';
      const formShown = cIs
        ? 'y = ' + A + '\\left(\\cos^2 x - \\sin^2 x\\right)'
        : 'y = ' + A + '\\left(\\sin^2 x - \\cos^2 x\\right)';
      const sumShown = dIs
        ? 'y = ' + k + '\\left(\\sqrt{6} - \\sqrt{2}\\right)\\cos\\left(2x + \\frac{5\\pi}{12}\\right)'
        : 'y = ' + k + '\\left(\\sqrt{6} + \\sqrt{2}\\right)\\cos\\left(2x + \\frac{5\\pi}{12}\\right)';
      const tfStatements = [
        { key: 'a', text: 'Giá trị của hàm số tại $x = \\frac{2\\pi}{3}$ bằng $' + yAtShown + '$.', isTrue: aIs },
        { key: 'b', text: 'Tập giá trị của hàm số là $' + rangeShown + '$.', isTrue: bIs },
        { key: 'c', text: 'Hàm số có thể viết dưới dạng $' + formShown + '$.', isTrue: cIs },
        {
          key: 'd',
          text:
            'Một dao động điều hòa khác cùng phương là $y = ' +
            A +
            '\\cos\\left(2x + \\frac{5\\pi}{6}\\right)$. Khi đó tổng hợp hai dao động là $' +
            sumShown +
            '$.',
          isTrue: dIs,
        },
      ];
      return {
        stem: 'Cho dao động điều hòa có phương trình $y = ' + A + '\\cos 2x$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Ta có $y\\left(\\frac{2\\pi}{3}\\right) = ' + A + '\\cos\\frac{4\\pi}{3} = ' + yAtVal + '$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Do $-1 \\le \\cos 2x \\le 1$ nên $-' + A + ' \\le y \\le ' + A + '$, tập giá trị là $\\left[-' + A + ';\\, ' + A + '\\right]$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Theo công thức nhân đôi: $' + A + '\\cos 2x = ' + A + '(\\cos^2 x - \\sin^2 x)$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tổng hợp hai dao động: $y = ' + A + '\\cos 2x + ' + A + '\\cos\\left(2x + \\frac{5\\pi}{6}\\right) = ' + (2 * A) + '\\cos\\left(2x + \\frac{5\\pi}{12}\\right)\\cos\\left(-\\frac{5\\pi}{12}\\right) = ' + k + '\\left(\\sqrt{6} - \\sqrt{2}\\right)\\cos\\left(2x + \\frac{5\\pi}{12}\\right)$ (ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k nhỏ', params: { k: 2, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (A = 36; S S S S)', params: { k: 18, aTrue: 0, bTrue: 0, cTrue: 0, dTrue: 0 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Dao động điều hòa y = A sin(2x)
  t11_b3_d20_harmonic_sine_tf: {
    id: 't11_b3_d20_harmonic_sine_tf',
    name: 'Dao động điều hòa y = A sin(2x) và tổng hợp dao động (Đúng/Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế hàm số lượng giác',
    description: 'Cho dao động điều hòa y = A sin(2x). Xét giá trị tại x = 0, tập giá trị, công thức nhân đôi 2A sin x cos x và tổng hợp hai dao động cùng phương.',
    conditionSummary: 'A ∈ [15; 50]',
    paramSpecs: [
      { name: 'A', label: 'Biên độ A', min: 15, max: 50 },
      { name: 'aTrue', label: 'Ý (a) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'bTrue', label: 'Ý (b) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'cTrue', label: 'Ý (c) đúng/sai (0/1)', min: 0, max: 1 },
      { name: 'dTrue', label: 'Ý (d) đúng/sai (0/1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { A } = params;
      if (A < 10) return { valid: false, reason: 'Cần A >= 10' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, aTrue, bTrue, cTrue, dTrue } = params;
      const ampHalf = u.simplifyFrac(A, 2);
      const aIs = aTrue === 1;
      const bIs = bTrue === 1;
      const cIs = cTrue === 1;
      const dIs = dTrue === 1;
      const y0Shown = aIs ? 0 : A;
      const rangeShown = bIs ? '\\left[-' + A + ';\\, ' + A + '\\right]' : '\\left[0;\\, ' + A + '\\right]';
      const formShown = cIs ? 'y = ' + (2 * A) + '\\sin x\\cos x' : 'y = ' + A + '\\sin x\\cos x';
      const coefParen = A % 2 === 0
        ? String(A / 2) + '\\left(\\sqrt{6} - \\sqrt{2}\\right)'
        : '\\frac{' + A + '\\left(\\sqrt{6} - \\sqrt{2}\\right)}{2}';
      const wrongCoefParen = A % 2 === 0
        ? String(A / 2) + '\\left(\\sqrt{6} + \\sqrt{2}\\right)'
        : '\\frac{' + A + '\\left(\\sqrt{6} + \\sqrt{2}\\right)}{2}';
      const sumShown = dIs
        ? 'y = ' + coefParen + '\\sin\\left(2x + \\frac{5\\pi}{12}\\right)'
        : 'y = ' + wrongCoefParen + '\\sin\\left(2x + \\frac{5\\pi}{12}\\right)';
      const tfStatements = [
        { key: 'a', text: 'Giá trị của hàm số tại $x = 0$ bằng $' + y0Shown + '$.', isTrue: aIs },
        { key: 'b', text: 'Tập giá trị của hàm số là $' + rangeShown + '$.', isTrue: bIs },
        { key: 'c', text: 'Hàm số có thể viết dưới dạng $' + formShown + '$.', isTrue: cIs },
        {
          key: 'd',
          text:
            'Một dao động điều hòa khác cùng phương là $y = ' +
            A +
            '\\sin\\left(2x + \\frac{5\\pi}{6}\\right)$. Khi đó tổng hợp hai dao động là $' +
            sumShown +
            '$.',
          isTrue: dIs,
        },
      ];
      return {
        stem: 'Cho dao động điều hòa có phương trình $y = ' + A + '\\sin 2x$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Ta có $y(0) = ' + A + '\\sin 0 = 0$ (ý a ' + (aIs ? 'đúng' : 'sai') + ').',
          'b) Do $-1 \\le \\sin 2x \\le 1$ nên $-' + A + ' \\le y \\le ' + A + '$, tập giá trị là $\\left[-' + A + ';\\, ' + A + '\\right]$ (ý b ' + (bIs ? 'đúng' : 'sai') + ').',
          'c) Áp dụng $\\sin 2x = 2\\sin x\\cos x$ ta có $y = ' + (2 * A) + '\\sin x\\cos x$ (ý c ' + (cIs ? 'đúng' : 'sai') + ').',
          'd) Tổng hợp hai dao động: $y = ' + A + '\\sin 2x + ' + A + '\\sin\\left(2x + \\frac{5\\pi}{6}\\right) = ' + (2 * A) + '\\sin\\left(2x + \\frac{5\\pi}{12}\\right)\\cos\\left(-\\frac{5\\pi}{12}\\right) = ' + coefParen + '\\sin\\left(2x + \\frac{5\\pi}{12}\\right)$ (do $\\cos\\frac{5\\pi}{12} = \\frac{\\sqrt{6} - \\sqrt{2}}{4}$, ý d ' + (dIs ? 'đúng' : 'sai') + ').',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên A < 10', params: { A: 5, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (A = 37; Đ S Đ Đ)', params: { A: 37, aTrue: 1, bTrue: 0, cTrue: 1, dTrue: 1 }, expectedValid: true },
    ],
  },
};
