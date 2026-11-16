import { MathTemplate } from '../types/math';

export const G12_B1_TEMPLATES_PART1: Record<string, MathTemplate> = {
  // Dạng 1 [MC - Biết]: Đọc khoảng đơn điệu từ bảng xét dấu f'(x) (gián đoạn tại x0, không đổi dấu)
  t12_b1_d01_bsd_tc_mc: {
    id: 't12_b1_d01_bsd_tc_mc',
    name: 'Dạng 1: Xét tính đơn điệu từ bảng xét dấu f\'(x) có điểm gián đoạn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đơn điệu — Bảng xét dấu',
    description:
      'Cho hàm số y = f(x) xác định với mọi x ≠ x0 có bảng xét dấu f\'(x) cùng dấu hai bên x0. Xác định khoảng đồng biến/nghịch biến.',
    conditionSummary: 'x0 nguyên ∈ [-5; 5], dir ∈ {0, 1} quyết định đồng biến (+) hay nghịch biến (-)',
    paramSpecs: [
      { name: 'x0', label: 'Điểm gián đoạn x0', min: -4, max: 4 },
      { name: 'dir', label: 'Chiều dấu (0: -, 1: +)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x0, dir } = params;
      if (!Number.isInteger(x0)) return { valid: false, reason: 'x0 phải là số nguyên' };
      if (dir !== 0 && dir !== 1) return { valid: false, reason: 'dir chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, dir } = params;
      const sign = dir === 1 ? '+' : '-';
      const askWord = dir === 1 ? 'đồng biến' : 'nghịch biến';
      const rightInterval = '$(-\\infty;\\, ' + (x0 - 1) + ')$';
      const correct = rightInterval;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(-\\infty;\\, ' + (x0 + 1) + ')$',
          '$(' + (x0 - 3) + ';\\, +\\infty)$',
          '$(-\\infty;\\, +\\infty)$',
          '$(' + (x0 - 1) + ';\\, ' + (x0 + 2) + ')$',
        ],
        rng,
        (k) => '$(' + (x0 - 1 - k) + ';\\, ' + (x0 + 1 + k) + ')$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định với mọi $x \\neq ' +
          x0 +
          '$ và có bảng xét dấu $f\'(x)$ như hình vẽ dưới đây. Hàm số ' +
          askWord +
          ' trên khoảng nào trong các khoảng sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          xNodes: ['-\\infty', '' + x0, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: sign },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: sign },
          ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ bảng xét dấu, $y\'$ luôn mang dấu $' + sign + '$ trên mỗi khoảng $(-\\infty;\\, ' + x0 + ')$ và $(' + x0 + ';\\, +\\infty)$.',
          'Vì $(-\\infty;\\, ' + (x0 - 1) + ') \\subset (-\\infty;\\, ' + x0 + ')$ không chứa điểm gián đoạn $x = ' + x0 + '$ nên hàm số đã cho ' + askWord + ' trên khoảng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 0 (gián đoạn tại gốc O)', params: { x0: 0, dir: 0 }, expectedValid: true },
      { label: 'Biên x0 âm, hàm đồng biến', params: { x0: -3, dir: 1 }, expectedValid: true },
      { label: 'Biên lỗi dir = 2', params: { x0: 0, dir: 2 }, expectedValid: false },
    ],
  },

  // Dạng 2 [MC - Biết]: Đọc khoảng đơn điệu từ bảng biến thiên 2 cực trị trên R
  t12_b1_d02_bbt_b3_dbnb_mc: {
    id: 't12_b1_d02_bbt_b3_dbnb_mc',
    name: 'Dạng 2: Xét tính đơn điệu từ bảng biến thiên hàm số xác định trên R',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đơn điệu — Bảng biến thiên',
    description: 'Cho BBT trên R có 2 cực trị x1 < x2. Xác định khoảng đồng biến hoặc nghịch biến.',
    conditionSummary: 'x1 < x2, (aSign = -1 => y1 < y2; aSign = 1 => y1 > y2)',
    paramSpecs: [
      { name: 'x1', label: 'Điểm cực trị x1', min: -6, max: 1 },
      { name: 'gap', label: 'Khoảng cách x2 - x1', min: 2, max: 12 },
      { name: 'yBase', label: 'Mức giá trị y1', min: -8, max: 10 },
      { name: 'yDiff', label: 'Độ chênh |y2 - y1|', min: 2, max: 12 },
      { name: 'aSign', label: 'Dấu hệ số bậc ba (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { x1, gap, yDiff, aSign } = params;
      if (gap < 2) return { valid: false, reason: 'Cần gap >= 2 để hai điểm cực trị cách nhau rõ ràng' };
      if (yDiff <= 0) return { valid: false, reason: 'Giá trị cực đại và cực tiểu phải phân biệt' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign chỉ nhận -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap, yBase, yDiff, aSign } = params;
      const x2 = x1 + gap;
      const isPos = aSign === 1;
      const y1 = yBase;
      const y2 = isPos ? yBase - yDiff : yBase + yDiff;
      const askMono = isPos ? 'đồng biến' : 'nghịch biến';
      const correct = '$(' + x2 + ';\\, +\\infty)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(-\\infty;\\, ' + x2 + ')$',
          '$(' + x1 + ';\\, +\\infty)$',
          '$(' + x1 + ';\\, ' + x2 + ')$',
          '$(-\\infty;\\, +\\infty)$',
        ],
        rng,
        (k) => '$(' + (x2 + k) + ';\\, +\\infty)$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định với mọi $x \\in \\mathbb{R}$ có bảng biến thiên như hình vẽ dưới đây. Hàm số ' +
          askMono +
          ' trên khoảng nào trong các khoảng sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: isPos
            ? [
                { type: 'sign', value: '+' },
                { type: 'node', kind: '0' },
                { type: 'sign', value: '-' },
                { type: 'node', kind: '0' },
                { type: 'sign', value: '+' },
              ]
            : [
                { type: 'sign', value: '-' },
                { type: 'node', kind: '0' },
                { type: 'sign', value: '+' },
                { type: 'node', kind: '0' },
                { type: 'sign', value: '-' },
              ],
          yNodes: isPos
            ? [
                { kind: 'single', pos: 'bot', value: '-\\infty' },
                { kind: 'single', pos: 'top', value: '' + y1 },
                { kind: 'single', pos: 'bot', value: '' + y2 },
                { kind: 'single', pos: 'top', value: '+\\infty' },
              ]
            : [
                { kind: 'single', pos: 'top', value: '+\\infty' },
                { kind: 'single', pos: 'bot', value: '' + y1 },
                { kind: 'single', pos: 'top', value: '' + y2 },
                { kind: 'single', pos: 'bot', value: '-\\infty' },
              ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dựa vào bảng biến thiên, trên khoảng $(' + x2 + ';\\, +\\infty)$ đạo hàm $y\' ' + (isPos ? '> 0$' : '< 0$') + ' (mũi tên đi ' + (isPos ? 'lên' : 'xuống') + ').',
          'Do đó hàm số đã cho ' + askMono + ' trên khoảng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cực trị tại x1 = -4, x2 = 8', params: { x1: -4, gap: 12, yBase: 5, yDiff: 8, aSign: -1 }, expectedValid: true },
      { label: 'Biên lỗi yDiff = 0', params: { x1: -1, gap: 4, yBase: 0, yDiff: 0, aSign: 1 }, expectedValid: false },
    ],
  },

  // Dạng 3 [MC - Biết]: Đọc khoảng đơn điệu từ BBT hàm phân thức 1/1 với TCĐ phân số -p/q
  t12_b1_d03_bbt_pt11_frac_mc: {
    id: 't12_b1_d03_bbt_pt11_frac_mc',
    name: 'Dạng 3: Đơn điệu từ BBT hàm phân thức (tiệm cận đứng phân số)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đơn điệu — Bảng biến thiên',
    description: 'Cho BBT xác định với mọi x ≠ -p/q, dấu không đổi hai bên tiệm cận đứng. Tìm khoảng đơn điệu.',
    conditionSummary: 'q >= 2, p != 0, gcd(|p|, q) = 1',
    paramSpecs: [
      { name: 'p', label: 'Tử số p (x0 = -p/q)', min: -7, max: 7, allowZero: false },
      { name: 'q', label: 'Mẫu số q', min: 2, max: 5 },
      { name: 'c', label: 'Tiệm cận ngang y = c', min: -4, max: 4 },
      { name: 'dir', label: 'Chiều dấu (0: -, 1: +)', min: 0, max: 1 },
    ],
    validateCode: `
      const { p, q, dir } = params;
      if (p === 0) return { valid: false, reason: 'p = 0 làm x0 thành số nguyên 0' };
      if (q < 2) return { valid: false, reason: 'Cần q >= 2 để x0 là phân số' };
      if (u.gcd(Math.abs(p), q) !== 1) return { valid: false, reason: 'Phân số p/q chưa tối giản' };
      if (dir !== 0 && dir !== 1) return { valid: false, reason: 'dir phải là 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, c, dir } = params;
      const frac = u.simplifyFrac(-p, q);
      const isPos = dir === 1;
      const sign = isPos ? '+' : '-';
      const askWord = isPos ? 'đồng biến' : 'nghịch biến';
      const rightStart = Math.ceil(frac.value + 0.01) + 1;
      const leftBoundBad = Math.floor(frac.value) - 2;
      const correct = '$(' + rightStart + ';\\, +\\infty)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(-\\infty;\\, +\\infty)$',
          '$(-\\infty;\\, ' + rightStart + ')$',
          '$(' + leftBoundBad + ';\\, +\\infty)$',
          '$(' + (rightStart - 3) + ';\\, ' + (rightStart + 1) + ')$',
        ],
        rng,
        (k) => '$(' + (rightStart + k) + ';\\, +\\infty)$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định với mọi $x \\neq ' +
          frac.latex +
          '$ có bảng biến thiên như hình vẽ dưới đây. Hàm số ' +
          askWord +
          ' trên khoảng nào trong các khoảng sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', frac.latex, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: sign },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: sign },
          ],
          yNodes: isPos
            ? [
                { kind: 'single', pos: 'bot', value: '' + c },
                { kind: 'asymptote', leftPos: 'top', leftVal: '+\\infty', rightPos: 'bot', rightVal: '-\\infty' },
                { kind: 'single', pos: 'top', value: '' + c },
              ]
            : [
                { kind: 'single', pos: 'top', value: '' + c },
                { kind: 'asymptote', leftPos: 'bot', leftVal: '-\\infty', rightPos: 'top', rightVal: '+\\infty' },
                { kind: 'single', pos: 'bot', value: '' + c },
              ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số không xác định tại $x = ' + frac.latex + '$ và $y\' ' + (isPos ? '> 0$' : '< 0$') + ' trên từng khoảng $(-\\infty;\\, ' + frac.latex + ')$ và $(' + frac.latex + ';\\, +\\infty)$.',
          'Khoảng $(' + rightStart + ';\\, +\\infty) \\subset (' + frac.latex + ';\\, +\\infty)$ nên hàm số ' + askWord + ' trên khoảng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = -4/3, c = -1', params: { p: 4, q: 3, c: -1, dir: 0 }, expectedValid: true },
      { label: 'Biên lỗi phân số chưa tối giản (p=2, q=4)', params: { p: 2, q: 4, c: 1, dir: 1 }, expectedValid: false },
    ],
  },

  // Dạng 4 [MC - Biết]: Đọc khoảng đơn điệu từ BBT hàm phân thức bậc 2/bậc 1 (2 cực trị, 1 TCĐ)
  t12_b1_d04_bbt_pt21_mc: {
    id: 't12_b1_d04_bbt_pt21_mc',
    name: 'Dạng 4: Đơn điệu từ BBT hàm có 2 cực trị và 1 điểm gián đoạn',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đơn điệu — Bảng biến thiên',
    description: 'Cho BBT xác định với x ≠ x0, cực trị tại x1 < x0 < x2. Xác định khoảng đồng biến/nghịch biến.',
    conditionSummary: 'k >= 2, x1 = x0 - k, x2 = x0 + k, y1 != y2',
    paramSpecs: [
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -3, max: 4 },
      { name: 'k', label: 'Bán kính cực trị k', min: 2, max: 6 },
      { name: 'y1', label: 'Giá trị tại x1', min: -6, max: 4 },
      { name: 'y2', label: 'Giá trị tại x2', min: -12, max: 2 },
      { name: 'aSign', label: 'Dấu hệ số a (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { k, y1, y2, aSign } = params;
      if (k < 2) return { valid: false, reason: 'Cần k >= 2 để hai nhánh chứa nhiều số nguyên' };
      if (aSign === -1 && y1 <= y2) return { valid: false, reason: 'Với aSign = -1 cần y1 > y2' };
      if (aSign === 1 && y1 >= y2) return { valid: false, reason: 'Với aSign = 1 cần y1 < y2' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, k, y1, y2, aSign } = params;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const isPos = aSign === 1;
      const askWord = isPos ? 'nghịch biến' : 'đồng biến';
      const correct = '$(' + x1 + ';\\, ' + x0 + ')$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + x0 + ';\\, +\\infty)$',
          '$(' + (x1 - 3) + ';\\, ' + (x2 + 2) + ')$',
          '$(' + x2 + ';\\, +\\infty)$',
          '$(-\\infty;\\, ' + x1 + ')$',
        ],
        rng,
        (j) => '$(' + (x1 - j) + ';\\, ' + (x2 + j) + ')$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định với mọi $x \\neq ' +
          x0 +
          '$ có bảng biến thiên như hình vẽ dưới đây. Hàm số ' +
          askWord +
          ' trên khoảng nào trong các khoảng sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x1, '' + x0, '' + x2, '+\\infty'],
          derivTokens: isPos
            ? [
                { type: 'sign', value: '+' },
                { type: 'node', kind: 'z' },
                { type: 'sign', value: '-' },
                { type: 'node', kind: 'd' },
                { type: 'sign', value: '-' },
                { type: 'node', kind: 'z' },
                { type: 'sign', value: '+' },
              ]
            : [
                { type: 'sign', value: '-' },
                { type: 'node', kind: 'z' },
                { type: 'sign', value: '+' },
                { type: 'node', kind: 'd' },
                { type: 'sign', value: '+' },
                { type: 'node', kind: 'z' },
                { type: 'sign', value: '-' },
              ],
          yNodes: isPos
            ? [
                { kind: 'single', pos: 'bot', value: '-\\infty' },
                { kind: 'single', pos: 'top', value: '' + y1 },
                { kind: 'asymptote', leftPos: 'bot', leftVal: '-\\infty', rightPos: 'top', rightVal: '+\\infty' },
                { kind: 'single', pos: 'bot', value: '' + y2 },
                { kind: 'single', pos: 'top', value: '+\\infty' },
              ]
            : [
                { kind: 'single', pos: 'top', value: '+\\infty' },
                { kind: 'single', pos: 'bot', value: '' + y1 },
                { kind: 'asymptote', leftPos: 'top', leftVal: '+\\infty', rightPos: 'bot', rightVal: '-\\infty' },
                { kind: 'single', pos: 'top', value: '' + y2 },
                { kind: 'single', pos: 'bot', value: '-\\infty' },
              ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$y\' = 0 \\Leftrightarrow x = ' + x1 + ',\\, x = ' + x2 + '$.',
          'Từ bảng biến thiên, trên hai khoảng $(' + x1 + ';\\, ' + x0 + ')$ và $(' + x0 + ';\\, ' + x2 + ')$ đạo hàm mang dấu $' + (isPos ? '-' : '+') + '$.',
          'Do đó hàm số ' + askWord + ' trên khoảng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên đối xứng quanh x0 = 2', params: { x0: 2, k: 3, y1: -3, y2: -11, aSign: -1 }, expectedValid: true },
      { label: 'Biên lỗi y1 <= y2 khi aSign = -1', params: { x0: 2, k: 3, y1: -11, y2: -3, aSign: -1 }, expectedValid: false },
      { label: 'Biên chuẩn aSign = -1, y1 > y2', params: { x0: 2, k: 3, y1: 5, y2: -11, aSign: -1 }, expectedValid: true },
    ],
  },

  // Dạng 5 [MC - Biết]: Đọc khoảng đơn điệu từ BBT hàm phân thức bậc 1/bậc 1 (TCĐ nguyên)
  t12_b1_d05_bbt_pt11_int_mc: {
    id: 't12_b1_d05_bbt_pt11_int_mc',
    name: 'Dạng 5: Đơn điệu từ BBT hàm phân thức (tiệm cận đứng nguyên)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đơn điệu — Bảng biến thiên',
    description: 'Cho BBT xác định với x ≠ x0 (nguyên), tiệm cận ngang y = c. Xác định khoảng đơn điệu.',
    conditionSummary: 'x0 ∈ [-6; 6], dir ∈ {0, 1}',
    paramSpecs: [
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -5, max: 6 },
      { name: 'c', label: 'Tiệm cận ngang y = c', min: -5, max: 6 },
      { name: 'dir', label: 'Chiều dấu (0: -, 1: +)', min: 0, max: 1 },
    ],
    validateCode: `
      const { dir } = params;
      if (dir !== 0 && dir !== 1) return { valid: false, reason: 'dir chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, c, dir } = params;
      const isPos = dir === 1;
      const sign = isPos ? '+' : '-';
      const askWord = isPos ? 'đồng biến' : 'nghịch biến';
      const correct = '$(' + (x0 + 1) + ';\\, +\\infty)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + (x0 - 1) + ';\\, +\\infty)$',
          '$(-\\infty;\\, +\\infty)$',
          '$(-\\infty;\\, ' + (x0 + 3) + ')$',
          '$(' + (x0 - 2) + ';\\, ' + (x0 + 2) + ')$',
        ],
        rng,
        (k) => '$(' + (x0 + 1 + k) + ';\\, +\\infty)$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định với mọi $x \\neq ' +
          x0 +
          '$ có bảng biến thiên như hình vẽ dưới đây. Hàm số ' +
          askWord +
          ' trên khoảng nào trong các khoảng sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x0, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: sign },
            { type: 'node', kind: 'd' },
            { type: 'sign', value: sign },
          ],
          yNodes: isPos
            ? [
                { kind: 'single', pos: 'bot', value: '' + c },
                { kind: 'asymptote', leftPos: 'top', leftVal: '+\\infty', rightPos: 'bot', rightVal: '-\\infty' },
                { kind: 'single', pos: 'top', value: '' + c },
              ]
            : [
                { kind: 'single', pos: 'top', value: '' + c },
                { kind: 'asymptote', leftPos: 'bot', leftVal: '-\\infty', rightPos: 'top', rightVal: '+\\infty' },
                { kind: 'single', pos: 'bot', value: '' + c },
              ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Trên khoảng $(' + x0 + ';\\, +\\infty)$, $y\' ' + (isPos ? '> 0$' : '< 0$') + ' nên hàm số ' + askWord + ' trên $(' + x0 + ';\\, +\\infty)$.',
          'Vì $(' + (x0 + 1) + ';\\, +\\infty) \\subset (' + x0 + ';\\, +\\infty)$ nên chọn đáp án ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 5, c = 5', params: { x0: 5, c: 5, dir: 0 }, expectedValid: true },
      { label: 'Biên x0 = 0', params: { x0: 0, c: -2, dir: 1 }, expectedValid: true },
    ],
  },

  // Dạng 6 [MC - Biết]: Suy luận tính đơn điệu từ giả thiết dấu của f'(x) trên hai khoảng rời nhau
  t12_b1_d06_sign_interval_mc: {
    id: 't12_b1_d06_sign_interval_mc',
    name: 'Dạng 6: Nhận biết khoảng đơn điệu từ điều kiện dấu f\'(x) trên hai khoảng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Định lí đơn điệu',
    description: 'Cho f\'(x) < 0 trên (a; b) và f\'(x) > 0 trên (c; d) với b < c. Tìm khẳng định đúng.',
    conditionSummary: 'a < b < c < d',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút a', min: -6, max: -1 },
      { name: 'len1', label: 'Độ dài (a; b)', min: 2, max: 5 },
      { name: 'gap', label: 'Khoảng trống b đến c', min: 1, max: 4 },
      { name: 'len2', label: 'Độ dài (c; d)', min: 2, max: 5 },
    ],
    validateCode: `
      const { len1, gap, len2 } = params;
      if (len1 < 2 || gap < 1 || len2 < 2) {
        return { valid: false, reason: 'Cần hai khoảng có độ dài >= 2 và tách biệt (gap >= 1)' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, len1, gap, len2 } = params;
      const b = a + len1;
      const c = b + gap;
      const d = c + len2;
      const correct = '$f(x)$ nghịch biến trên khoảng $(' + a + ';\\, ' + b + ')$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$f(x)$ nghịch biến trên khoảng $(' + a + ';\\, ' + d + ')$',
          '$f(x)$ đồng biến trên khoảng $(' + a + ';\\, ' + (b + 1) + ')$',
          '$f(x)$ nghịch biến trên khoảng $(' + c + ';\\, ' + (d + 2) + ')$',
          '$f(x)$ đồng biến trên khoảng $(' + a + ';\\, ' + c + ')$',
        ],
        rng,
        (k) => '$f(x)$ nghịch biến trên khoảng $(' + (a - k) + ';\\, ' + (d + k) + ')$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ có đạo hàm trên $\\mathbb{R}$ và thỏa mãn $f\'(x) < 0,\\, \\forall x \\in (' +
          a +
          ';\\, ' +
          b +
          ')$ và $f\'(x) > 0,\\, \\forall x \\in (' +
          c +
          ';\\, ' +
          d +
          ')$. Tìm khẳng định đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$f\'(x) < 0,\\, \\forall x \\in (' + a + ';\\, ' + b + ')$ suy ra $f(x)$ nghịch biến trên khoảng $(' + a + ';\\, ' + b + ')$.',
          '$f\'(x) > 0,\\, \\forall x \\in (' + c + ';\\, ' + d + ')$ suy ra $f(x)$ đồng biến trên khoảng $(' + c + ';\\, ' + d + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chuẩn (-3;1) và (3;7)', params: { a: -3, len1: 4, gap: 2, len2: 4 }, expectedValid: true },
      { label: 'Biên suy biến gap = 0', params: { a: -2, len1: 3, gap: 0, len2: 3 }, expectedValid: false },
    ],
  },

  // Dạng 7 [MC - Hiểu]: Khoảng đơn điệu của hàm bậc ba y = ax^3 + bx^2 + cx + d
  t12_b1_d07_cubic_mono_mc: {
    id: 't12_b1_d07_cubic_mono_mc',
    name: 'Dạng 7: Tìm khoảng đồng biến/nghịch biến của hàm số bậc ba',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đơn điệu — Hàm bậc ba',
    description: 'Cho hàm bậc ba y = a x^3 + b x^2 + c x + d có y\' = 0 có 2 nghiệm nguyên. Tìm khoảng đơn điệu.',
    conditionSummary: 'x1 < x2, (x1 + x2) chẵn để hệ số đa thức nguyên, a ∈ {-1, 1}',
    paramSpecs: [
      { name: 'x1', label: 'Nghiệm x1 của y\'', min: -4, max: 2 },
      { name: 'step', label: 'Nửa hiệu k (x2 = x1 + 2k)', min: 1, max: 4 },
      { name: 'd', label: 'Hằng số tự do d', min: -9, max: 9 },
      { name: 'aSign', label: 'Hệ số bậc 3 (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { step, aSign } = params;
      if (step <= 0) return { valid: false, reason: 'Cần step >= 1 để có hai nghiệm phân biệt' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, step, d, aSign } = params;
      const x2 = x1 + 2 * step;
      // y' = 3*aSign*(x - x1)*(x - x2) = 3*aSign*x^2 - 3*aSign*(x1+x2)x + 3*aSign*x1*x2
      const a = aSign;
      const b = -aSign * 3 * (x1 + x2) / 2;
      const c = aSign * 3 * x1 * x2;
      const poly = u.formatPoly([a, b, c, d]);
      const dPoly = u.formatQuadratic(3 * a, 2 * b, c);
      const isPos = aSign === 1;
      const askWord = isPos ? 'đồng biến' : 'nghịch biến';
      const correct = '$(-\\infty;\\, ' + x1 + ')$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + x1 + ';\\, +\\infty)$',
          '$(' + x1 + ';\\, ' + x2 + ')$',
          '$(-\\infty;\\, ' + x2 + ')$',
          '$(-\\infty;\\, +\\infty)$',
        ],
        rng,
        (k) => '$(' + (x1 - k) + ';\\, ' + (x2 + k) + ')$'
      );
      return {
        stem:
          'Cho hàm số $y = ' +
          poly +
          '$. Hàm số ' +
          askWord +
          ' trên khoảng nào trong các khoảng sau đây?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đạo hàm $f\'(x) = ' + dPoly + '$.',
          '$f\'(x) = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Vì hệ số $a = ' + a + (isPos ? ' > 0$' : ' < 0$') + ' nên hàm số ' + askWord + ' trên các khoảng $(-\\infty;\\, ' + x1 + ')$ và $(' + x2 + ';\\, +\\infty)$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = 1, x2 = 3', params: { x1: 1, step: 1, d: 9, aSign: 1 }, expectedValid: true },
      { label: 'Biên lỗi step = 0', params: { x1: 1, step: 0, d: 2, aSign: 1 }, expectedValid: false },
    ],
  },

  // Dạng 8 [MC - Hiểu]: Khoảng đơn điệu của hàm phân thức bậc nhất/bậc nhất y = (ax+b)/(cx+d)
  t12_b1_d08_rat11_mono_mc: {
    id: 't12_b1_d08_rat11_mono_mc',
    name: 'Dạng 8: Tìm khoảng đồng biến/nghịch biến của hàm phân thức bậc 1/bậc 1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đơn điệu — Phân thức 1/1',
    description: 'Cho y = (ax + b)/(cx + d) với ad - bc ≠ 0, c ≠ 0. Xác định khoảng đồng biến hoặc nghịch biến.',
    conditionSummary: 'c != 0, ad - bc != 0, x0 = -d/c là số nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -9, max: 9 },
      { name: 'c', label: 'Hệ số c', min: -4, max: 4, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0 = -d/c', min: -6, max: 6 },
    ],
    validateCode: `
      const { a, b, c, x0 } = params;
      if (c === 0) return { valid: false, reason: 'Mẫu số suy biến thành hằng số (c = 0)' };
      const d = -c * x0;
      const det = a * d - b * c;
      if (det === 0) return { valid: false, reason: 'Tử và mẫu tỉ lệ (ad - bc = 0), hàm suy biến thành hằng số' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0 } = params;
      const d = -c * x0;
      const det = a * d - b * c;
      const numStr = u.formatLinear(a, b);
      const denStr = u.formatLinear(c, d);
      const isInc = det > 0;
      const askWord = isInc ? 'đồng biến' : 'nghịch biến';
      const rightStart = x0 + 2;
      const correct = '$(' + rightStart + ';\\, +\\infty)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(-\\infty;\\, +\\infty)$',
          '$(-\\infty;\\, ' + (x0 + 1) + ')$',
          '$(' + (x0 - 1) + ';\\, +\\infty)$',
          '$(' + (x0 - 3) + ';\\, ' + (x0 + 3) + ')$',
        ],
        rng,
        (k) => '$(' + (rightStart + k) + ';\\, +\\infty)$'
      );
      return {
        stem:
          'Cho hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$. Hàm số ' +
          askWord +
          ' trên khoảng nào trong các khoảng sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập xác định $D = \\mathbb{R} \\setminus \\{' + x0 + '\\}$.',
          'Đạo hàm $y\' = \\dfrac{' + det + '}{(' + denStr + ')^2} ' + (isInc ? '> 0' : '< 0') + ',\\, \\forall x \\neq ' + x0 + '$.',
          'Hàm số ' + askWord + ' trên các khoảng $(-\\infty;\\, ' + x0 + ')$ và $(' + x0 + ';\\, +\\infty)$, suy ra ' + askWord + ' trên ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y = (4x-8)/(-2x-10)', params: { a: 4, b: -8, c: -2, x0: -5 }, expectedValid: true },
      { label: 'Biên suy biến ad - bc = 0', params: { a: 2, b: 4, c: 1, x0: -2 }, expectedValid: false },
    ],
  },

  // Dạng 9 [MC - Hiểu]: Khoảng đơn điệu của hàm phân thức bậc 2/bậc 1
  t12_b1_d09_rat21_mono_mc: {
    id: 't12_b1_d09_rat21_mono_mc',
    name: 'Dạng 9: Tìm khoảng đồng biến/nghịch biến của hàm phân thức bậc 2/bậc 1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đơn điệu — Phân thức 2/1',
    description: 'Cho hàm phân thức bậc 2/bậc 1 có hai cực trị nguyên x0 ± k. Xác định khoảng đơn điệu.',
    conditionSummary: 's ∈ {-2, -1, 1, 2}, k >= 2',
    paramSpecs: [
      { name: 's', label: 'Hệ số bậc 2 tử số s', min: -2, max: 2, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -5, max: 6 },
      { name: 'k', label: 'Khoảng cách cực trị k', min: 2, max: 5 },
      { name: 'm', label: 'Hệ số tự do phụ m', min: -4, max: 4 },
    ],
    validateCode: `
      const { s, k } = params;
      if (s === 0) return { valid: false, reason: 's = 0 suy biến thành bậc nhất/bậc nhất' };
      if (k < 2) return { valid: false, reason: 'Cần k >= 2 để hai nhánh (x1; x0) và (x0; x2) rõ ràng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s, x0, k, m } = params;
      // y = s*(x - x0) + m + s*k^2/(x - x0) => y' = s * ((x - x0)^2 - k^2) / (x - x0)^2
      const a2 = s;
      const b1 = -2 * s * x0 + m;
      const c0 = s * x0 * x0 - m * x0 + s * k * k;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const numStr = u.formatQuadratic(a2, b1, c0);
      const denStr = u.formatShift('x', -x0);
      const derivNumInner = u.formatQuadratic(1, -2 * x0, x0 * x0 - k * k);
      const askWord = s < 0 ? 'đồng biến' : 'nghịch biến';
      const correct = '$(' + x1 + ';\\, ' + x0 + ')$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(-\\infty;\\, ' + x1 + ')$',
          '$(' + x1 + ';\\, ' + x2 + ')$',
          '$(' + x0 + ';\\, +\\infty)$',
          '$(' + x2 + ';\\, +\\infty)$',
        ],
        rng,
        (j) => '$(' + (x1 - j) + ';\\, ' + (x2 + j) + ')$'
      );
      return {
        stem:
          'Cho hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$. Hàm số ' +
          askWord +
          ' trên khoảng nào trong các khoảng sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Tập xác định $D = \\mathbb{R} \\setminus \\{' + x0 + '\\}$.',
          'Đạo hàm $y\' = \\dfrac{' + (s === 1 ? '' : s === -1 ? '-' : s) + '(' + derivNumInner + ')}{(' + denStr + ')^2} = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Trên các khoảng $(' + x1 + ';\\, ' + x0 + ')$ và $(' + x0 + ';\\, ' + x2 + ')$, $y\' ' + (s < 0 ? '> 0$' : '< 0$') + ' nên hàm số ' + askWord + ' trên khoảng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y = (-2x^2+10x-18)/(x-5)', params: { s: -2, x0: 5, k: 3, m: -10 }, expectedValid: true },
      { label: 'Biên lỗi s = 0', params: { s: 0, x0: 2, k: 3, m: 1 }, expectedValid: false },
    ],
  },

  // Dạng 10 [MC - Hiểu]: Khoảng đơn điệu của hàm phân thức y = ax/(x^2 + k)
  t12_b1_d10_frac_quad_denom_mc: {
    id: 't12_b1_d10_frac_quad_denom_mc',
    name: 'Dạng 10: Đơn điệu của hàm số y = ax / (x² + k)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đơn điệu — Hàm hữu tỉ',
    description: 'Cho y = ax/(x^2 + k) với k > 0 không chính phương. Xác định khoảng đồng biến hoặc nghịch biến.',
    conditionSummary: 'a != 0, k >= 2 và sqrt(k) vô tỉ để đáp án dạng (-√k; √k)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -9, max: 9, allowZero: false },
      { name: 'k', label: 'Hằng số mẫu k', min: 2, max: 11 },
    ],
    validateCode: `
      const { a, k } = params;
      if (a === 0) return { valid: false, reason: 'a = 0 làm hàm suy biến thành hàm hằng y = 0' };
      if (k <= 0) return { valid: false, reason: 'k <= 0 làm mẫu thức có nghiệm hoặc không xác định trên R' };
      if (Number.isInteger(Math.sqrt(k))) return { valid: false, reason: 'Chọn k không chính phương để nghiệm cực trị chứa căn thức' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k } = params;
      const isPos = a > 0;
      const askWord = isPos ? 'đồng biến' : 'nghịch biến';
      const sqrtStr = '\\sqrt{' + k + '}';
      const correct = '$(-' + sqrtStr + ';\\, ' + sqrtStr + ')$';
      const numExpr = a === 1 ? 'x' : a === -1 ? '-x' : a + 'x';
      const derivNum = u.formatQuadratic(-a, 0, a * k);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + (-Math.abs(a)) + ';\\, +\\infty)$',
          '$(-\\infty;\\, ' + k + ')$',
          '$(-\\infty;\\, -' + sqrtStr + ')$',
          '$(' + sqrtStr + ';\\, +\\infty)$',
        ],
        rng,
        (j) => '$(-\\infty;\\, ' + (k + j) + ')$'
      );
      return {
        stem:
          'Cho hàm số $y = \\dfrac{' +
          numExpr +
          '}{x^2 + ' +
          k +
          '}$. Hàm số ' +
          askWord +
          ' trên khoảng nào trong các khoảng sau?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hàm số xác định trên $\\mathbb{R}$.',
          'Đạo hàm $f\'(x) = \\dfrac{' + derivNum + '}{(x^2 + ' + k + ')^2} = 0 \\Leftrightarrow x = -' + sqrtStr + '$ hoặc $x = ' + sqrtStr + '$.',
          'Xét dấu $f\'(x)$ thu được hàm số ' + askWord + ' trên khoảng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y = 7x/(x^2 + 5)', params: { a: 7, k: 5 }, expectedValid: true },
      { label: 'Biên lỗi k = 0 (mẫu có nghiệm x=0)', params: { a: 3, k: 0 }, expectedValid: false },
      { label: 'Biên lỗi k = -4 (mẫu có 2 nghiệm)', params: { a: 3, k: -4 }, expectedValid: false },
    ],
  },

  // Dạng 11 [MC - Biết]: Đọc khoảng đơn điệu từ đồ thị hàm số bậc ba
  t12_b1_d11_graph_cubic_mono_mc: {
    id: 't12_b1_d11_graph_cubic_mono_mc',
    name: 'Dạng 11: Tìm khoảng đồng biến/nghịch biến từ đồ thị hàm bậc ba',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Đơn điệu — Đồ thị hàm bậc ba',
    description: 'Cho đồ thị đường cong hàm bậc ba có 2 cực trị nguyên x1 < x2. Xác định khoảng đơn điệu.',
    conditionSummary: 'x1 < x2, x2 - x1 >= 2, đồ thị nằm gọn trong khung hiển thị',
    paramSpecs: [
      { name: 'x1', label: 'Hoành độ cực trị trái x1', min: -2, max: 1 },
      { name: 'x2', label: 'Hoành độ cực trị phải x2', min: 0, max: 3 },
      { name: 'aSign', label: 'Dấu hệ số bậc ba (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'dShift', label: 'Dịch chuyển đứng', min: -2, max: 2 },
    ],
    validateCode: `
      const { x1, x2, aSign } = params;
      if (x2 - x1 < 2) return { valid: false, reason: 'Cần x2 - x1 >= 2 để khoảng cực trị dễ quan sát trên đồ thị' };
      if ((x1 + x2) % 2 !== 0) return { valid: false, reason: 'Chọn x1 + x2 chẵn để hệ số gọn' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, aSign, dShift } = params;
      const a = aSign;
      const b = -aSign * 1.5 * (x1 + x2);
      const c = aSign * 3 * x1 * x2;
      const f = (x) => a * x * x * x + b * x * x + c * x + dShift;
      const y1 = f(x1);
      const y2 = f(x2);
      const minY = Math.min(-4, Math.floor(Math.min(y1, y2)) - 2);
      const maxY = Math.max(5, Math.ceil(Math.max(y1, y2)) + 2);
      const isPos = aSign === 1;
      const askWord = isPos ? 'đồng biến' : 'nghịch biến';
      const correct = '$(' + (x2 + 1) + ';\\, +\\infty)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + x1 + ';\\, ' + x2 + ')$',
          '$(' + x1 + ';\\, +\\infty)$',
          '$(-\\infty;\\, ' + x2 + ')$',
          '$(-\\infty;\\, +\\infty)$',
        ],
        rng,
        (k) => '$(' + (x2 + 1 + k) + ';\\, +\\infty)$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ là hàm số bậc ba có đồ thị là đường cong trong hình dưới đây. Hàm số đã cho ' +
          askWord +
          ' trên khoảng nào dưới đây?',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [a, b, c, dShift],
          xMin: -4,
          xMax: 5,
          yMin: Math.max(-9, minY),
          yMax: Math.min(9, maxY),
          xTicks: [-3, -2, -1, 1, 2, 3, 4],
          yTicks: [-2, -1, 1, 2],
          highlightPoints: [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
          ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dựa vào đồ thị ta thấy hàm số đạt cực trị tại $x = ' + x1 + '$ và $x = ' + x2 + '$.',
          'Đồ thị đi ' + (isPos ? 'lên' : 'xuống') + ' trên các khoảng $(-\\infty;\\, ' + x1 + ')$ và $(' + x2 + ';\\, +\\infty)$.',
          'Vì $(' + (x2 + 1) + ';\\, +\\infty) \\subset (' + x2 + ';\\, +\\infty)$ nên hàm số ' + askWord + ' trên ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cực trị x1 = 0, x2 = 2', params: { x1: 0, x2: 2, aSign: -1, dShift: -2 }, expectedValid: true },
      { label: 'Biên lỗi x1 = x2', params: { x1: 1, x2: 1, aSign: 1, dShift: 0 }, expectedValid: false },
    ],
  },

  // Dạng 12 [MC - Hiểu]: Khoảng đơn điệu khi biết f'(x) = (a1 x + b1)(a2 x + b2)
  t12_b1_d12_fprime_factored2_mc: {
    id: 't12_b1_d12_fprime_factored2_mc',
    name: 'Dạng 12: Xét đơn điệu khi cho biểu thức đạo hàm dạng tích bậc hai',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đơn điệu — Bảng xét dấu f\'(x)',
    description: 'Cho f\'(x) = (a1 x + b1)(a2 x + b2) có 2 nghiệm phân biệt. Xác định khoảng đồng biến/nghịch biến.',
    conditionSummary: 'a1 != 0, a2 != 0, hai nghiệm r1 != r2',
    paramSpecs: [
      { name: 'a1', label: 'Hệ số a1', min: -3, max: 3, allowZero: false },
      { name: 'b1', label: 'Hệ số b1', min: -6, max: 6 },
      { name: 'a2', label: 'Hệ số a2', min: -5, max: 5, allowZero: false },
      { name: 'b2', label: 'Hệ số b2', min: -6, max: 6 },
    ],
    validateCode: `
      const { a1, b1, a2, b2 } = params;
      if (a1 === 0 || a2 === 0) return { valid: false, reason: 'a1, a2 phải khác 0 để là nhị thức bậc nhất' };
      const r1 = -b1 / a1;
      const r2 = -b2 / a2;
      if (Math.abs(r1 - r2) < 0.25) return { valid: false, reason: 'Hai nghiệm quá gần nhau hoặc trùng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1, b1, a2, b2 } = params;
      const f1 = u.simplifyFrac(-b1, a1);
      const f2 = u.simplifyFrac(-b2, a2);
      const left = f1.value < f2.value ? f1 : f2;
      const right = f1.value < f2.value ? f2 : f1;
      const prodLead = a1 * a2;
      const isLeadPos = prodLead > 0;
      const askWord = isLeadPos ? 'đồng biến' : 'nghịch biến';
      const rightInt = Math.ceil(right.value + 0.01) + 2;
      const correct = '$(' + rightInt + ';\\, +\\infty)$';
      const expr1 = u.formatLinear(a1, b1);
      const expr2 = u.formatLinear(a2, b2);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(-\\infty;\\, ' + right.latex + ')$',
          '$(' + left.latex + ';\\, ' + right.latex + ')$',
          '$(' + left.latex + ';\\, +\\infty)$',
          '$(-\\infty;\\, +\\infty)$',
        ],
        rng,
        (k) => '$(' + (rightInt + k) + ';\\, +\\infty)$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đạo hàm $f\'(x) = (' +
          expr1 +
          ')(' +
          expr2 +
          ')$. Hàm số đã cho ' +
          askWord +
          ' trên khoảng nào dưới đây?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Giải $f\'(x) = 0 \\Leftrightarrow x = ' + left.latex + '$ hoặc $x = ' + right.latex + '$.',
          'Hệ số bậc hai khi khai triển là $a = ' + prodLead + (isLeadPos ? ' > 0$' : ' < 0$') + ', nên $f\'(x)$ mang dấu $' + (isLeadPos ? '+' : '-') + '$ trên $(-\\infty;\\, ' + left.latex + ')$ và $(' + right.latex + ';\\, +\\infty)$.',
          'Do $(' + rightInt + ';\\, +\\infty) \\subset (' + right.latex + ';\\, +\\infty)$, hàm số ' + askWord + ' trên ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên f\'(x) = (5-x)(-5x-3)', params: { a1: -1, b1: 5, a2: -5, b2: -3 }, expectedValid: true },
      { label: 'Biên suy biến nghiệm kép', params: { a1: 1, b1: -2, a2: 2, b2: -4 }, expectedValid: false },
    ],
  },

  // Dạng 13 [MC - Hiểu]: Xét tính đơn điệu của y = f(x) dựa vào đồ thị của f'(x)
  t12_b1_d13_graph_fprime_mono_mc: {
    id: 't12_b1_d13_graph_fprime_mono_mc',
    name: 'Dạng 13: Tìm khoảng đơn điệu của hàm số f(x) từ đồ thị f\'(x)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đơn điệu — Đồ thị f\'(x)',
    description: 'Cho đồ thị f\'(x) bậc ba cắt trục hoành tại 3 điểm r1 < r2 < 0. Tìm khoảng đồng biến/nghịch biến của f(x).',
    conditionSummary: 'r1 < r2 < 0, aSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'r1', label: 'Nghiệm âm nhỏ r1', min: -4, max: -2 },
      { name: 'r2', label: 'Nghiệm âm lớn r2', min: -2, max: -1 },
      { name: 'aSign', label: 'Chiều nhánh phải (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { r1, r2, aSign } = params;
      if (r1 >= r2 || r2 >= 0) return { valid: false, reason: 'Cần ba nghiệm phân biệt r1 < r2 < 0' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, r2, aSign } = params;
      // f'(x) = 0.4 * aSign * (x - r1)(x - r2)(x - 0)
      const k = 0.4 * aSign;
      const c3 = k;
      const c2 = -k * (r1 + r2);
      const c1 = k * r1 * r2;
      const isRightNeg = aSign === -1;
      const askWord = isRightNeg ? 'nghịch biến' : 'đồng biến';
      const correct = '$(0;\\, +\\infty)$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(-\\infty;\\, ' + r1 + ')$',
          '$(' + r2 + ';\\, +\\infty)$',
          '$(' + r2 + ';\\, 0)$',
          '$(' + r1 + ';\\, 0)$',
        ],
        rng,
        (j) => '$(' + j + ';\\, +\\infty)$'
      );
      return {
        stem:
          'Cho hàm số $f(x)$ liên tục trên $\\mathbb{R}$ có đồ thị $f\'(x)$ như hình sau. Hàm số $y = f(x)$ ' +
          askWord +
          ' trên khoảng nào dưới đây?',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [c3, c2, c1, 0],
          xMin: -5,
          xMax: 2.5,
          yMin: -2.2,
          yMax: 2.5,
          xTicks: [r1, r2],
          yTicks: [],
          strokeColor: '#c026d3',
          curveLabel: "y = f'(x)",
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dựa vào đồ thị $f\'(x)$, đường cong cắt trục hoành tại $x = ' + r1 + ',\\, x = ' + r2 + ',\\, x = 0$.',
          'Trên khoảng $(0;\\, +\\infty)$, đồ thị $f\'(x)$ nằm hoàn toàn ' + (isRightNeg ? 'phía dưới' : 'phía trên') + ' trục hoành nên $f\'(x) ' + (isRightNeg ? '< 0$' : '> 0$') + '.',
          'Suy ra $y = f(x)$ ' + askWord + ' trên khoảng ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên đồ thị cắt tại -3, -2, 0', params: { r1: -3, r2: -2, aSign: -1 }, expectedValid: true },
      { label: 'Biên lỗi r1 = r2', params: { r1: -2, r2: -2, aSign: -1 }, expectedValid: false },
    ],
  },

  // Dạng 14 [MC - Vận dụng]: Tìm tham số m để hàm bậc ba đồng biến trên R
  t12_b1_d14_param_cubic_monoR_mc: {
    id: 't12_b1_d14_param_cubic_monoR_mc',
    name: 'Dạng 14: Tham số m để hàm số bậc ba đồng biến trên (-∞; +∞)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Đơn điệu — Chứa tham số m',
    description: 'Cho f(x) = (1/3)x^3 + ((m+p)/2)x^2 + (qm+r)x + c. Tìm tập giá trị m để hàm số đồng biến trên R.',
    conditionSummary: 'Delta của bất phương trình m^2 + B*m + C <= 0 dương và không chính phương',
    paramSpecs: [
      { name: 'p', label: 'Tham số dịch p', min: -3, max: 4 },
      { name: 'q', label: 'Hệ số m ở x (q)', min: 2, max: 6 },
      { name: 'r', label: 'Hằng số r ở x', min: -3, max: 4 },
    ],
    validateCode: `
      const { p, q, r } = params;
      // f'(x) = x^2 + (m+p)x + (qm + r) >= 0 <=> (m+p)^2 - 4(qm+r) <= 0
      // <=> m^2 + (2p - 4q)m + (p^2 - 4r) <= 0
      // halfB = p - 2q; disc = (p - 2q)^2 - (p^2 - 4r) = 4q^2 - 4pq + 4r
      const discQuarter = q * q - p * q + r;
      if (discQuarter <= 1) return { valid: false, reason: 'Cần discQuarter > 1 để khoảng nghiệm không suy biến' };
      if (Number.isInteger(Math.sqrt(discQuarter))) return { valid: false, reason: 'Chọn để biểu thức nghiệm chứa căn thức đặc trưng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q, r } = params;
      const center = 2 * q - p;
      const rad = q * q - p * q + r;
      // Factor out perfect squares from rad: rad = k^2 * sf
      let outer = 1;
      let inner = rad;
      for (let f = Math.floor(Math.sqrt(rad)); f >= 2; f--) {
        if (inner % (f * f) === 0) {
          outer *= f;
          inner /= f * f;
        }
      }
      const sqrtPart = outer === 1 ? '\\sqrt{' + inner + '}' : outer + '\\sqrt{' + inner + '}';
      const low = center + ' - ' + sqrtPart;
      const high = center + ' + ' + sqrtPart;
      const mPlusP = u.formatShift('m', p);
      const qmPlusR = u.formatLinear(q, r, 'm');
      const B = 2 * p - 4 * q;
      const C = p * p - 4 * r;
      const ineqPoly = u.formatQuadratic(1, B, C, 'm');
      const correct = '$' + low + ' \\le m \\le ' + high + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + low + ' < m < ' + high + '$',
          '$m \\le ' + low + '$ hoặc $m \\ge ' + high + '$',
          '$m < ' + low + '$ hoặc $m > ' + high + '$',
          '$' + (center - 1) + ' - ' + sqrtPart + ' \\le m \\le ' + (center - 1) + ' + ' + sqrtPart + '$',
        ],
        rng,
        (j) => '$' + (center + j) + ' - ' + sqrtPart + ' \\le m \\le ' + (center + j) + ' + ' + sqrtPart + '$'
      );
      return {
        stem:
          'Cho hàm số $f(x) = \\dfrac{1}{3}x^3 + \\left(\\dfrac{' +
          mPlusP +
          '}{2}\\right)x^2 + (' +
          qmPlusR +
          ')x + (4m - 5)$. Tìm tất cả các giá trị của tham số $m$ để hàm số đã cho đồng biến trên khoảng $(-\\infty;\\, +\\infty)$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $f\'(x) = x^2 + (' + mPlusP + ')x + (' + qmPlusR + ')$.',
          'Hàm số đồng biến trên $\\mathbb{R} \\Leftrightarrow f\'(x) \\ge 0,\\, \\forall x \\in \\mathbb{R} \\Leftrightarrow \\Delta = (' + mPlusP + ')^2 - 4(' + qmPlusR + ') \\le 0$.',
          'Rút gọn được $' + ineqPoly + ' \\le 0 \\Leftrightarrow ' + low + ' \\le m \\le ' + high + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chuẩn p=1, q=5, r=1', params: { p: 1, q: 5, r: 1 }, expectedValid: true },
      { label: 'Biên suy biến rad <= 0', params: { p: 3, q: 2, r: -1 }, expectedValid: false },
    ],
  },

  // Dạng 15 [MC - Biết]: Tìm điểm cực đại/cực tiểu từ BBT trên R
  t12_b1_d15_bbt_extrema_x_mc: {
    id: 't12_b1_d15_bbt_extrema_x_mc',
    name: 'Dạng 15: Tìm điểm cực đại / cực tiểu từ bảng biến thiên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cực trị — Bảng biến thiên',
    description: 'Cho BBT hàm số xác định trên R có 2 điểm cực trị. Tìm hoành độ điểm cực đại (hoặc cực tiểu).',
    conditionSummary: 'x1 < x2, y1 != y2, 4 giá trị phân biệt giữa x1, x2, y1, y2 để tránh trùng đáp án nhiễu',
    paramSpecs: [
      { name: 'x1', label: 'Điểm cực trị x1', min: -5, max: 2 },
      { name: 'gap', label: 'Khoảng cách x2 - x1', min: 2, max: 6 },
      { name: 'y1', label: 'Giá trị y1', min: -10, max: 12 },
      { name: 'yDiff', label: 'Độ lệch |y2 - y1|', min: 1, max: 9 },
      { name: 'askMax', label: 'Hỏi cực đại (1) hay cực tiểu (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x1, gap, y1, yDiff } = params;
      if (gap < 1 || yDiff < 1) return { valid: false, reason: 'Cần hai cực trị phân biệt' };
      const x2 = x1 + gap;
      const y2 = y1 - yDiff;
      if (new Set([x1, x2, y1, y2]).size < 4) {
        return { valid: false, reason: 'Bốn số x1, x2, y1, y2 phải đôi một khác nhau để 4 đáp án không trùng' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap, y1, yDiff, askMax } = params;
      const x2 = x1 + gap;
      const y2 = y1 - yDiff;
      // + , 0 , - , 0 , +  => CĐ tại x1 (y1), CT tại x2 (y2)
      const targetX = askMax === 1 ? x1 : x2;
      const otherX = askMax === 1 ? x2 : x1;
      const label = askMax === 1 ? 'điểm cực đại' : 'điểm cực tiểu';
      const correct = '$x = ' + targetX + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + otherX + '$', '$x = ' + y1 + '$', '$x = ' + y2 + '$'],
        rng,
        (k) => '$x = ' + (targetX + k + 10) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng biến thiên như hình vẽ sau. Tìm ' +
          label +
          ' của hàm số $y = f(x)$.',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ],
          yNodes: [
            { kind: 'single', pos: 'bot', value: '-\\infty' },
            { kind: 'single', pos: 'top', value: '' + y1 },
            { kind: 'single', pos: 'bot', value: '' + y2 },
            { kind: 'single', pos: 'top', value: '+\\infty' },
          ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ bảng biến thiên, $y\'$ đổi dấu từ ' + (askMax === 1 ? 'dương sang âm' : 'âm sang dương') + ' qua $x = ' + targetX + '$.',
          'Vậy ' + label + ' của hàm số $y = f(x)$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = 0, x2 = 5, y1 = -8, y2 = -9', params: { x1: 0, gap: 5, y1: -8, y2: -9, yDiff: 1, askMax: 1 }, expectedValid: true },
      { label: 'Biên lỗi yDiff = 0', params: { x1: 0, gap: 3, y1: 4, yDiff: 0, askMax: 1 }, expectedValid: false },
    ],
  },

  // Dạng 16 [MC - Biết]: Tìm giá trị cực tiểu/cực đại từ BBT trên R
  t12_b1_d16_bbt_extrema_y_mc: {
    id: 't12_b1_d16_bbt_extrema_y_mc',
    name: 'Dạng 16: Tìm giá trị cực đại / cực tiểu từ bảng biến thiên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cực trị — Bảng biến thiên',
    description: 'Cho BBT trên R. Phân biệt khái niệm "giá trị cực đại / giá trị cực tiểu" y với điểm cực trị x.',
    conditionSummary: 'x1 < x2, y1 > y2, cả 4 số x1, x2, y1, y2 đôi một khác nhau',
    paramSpecs: [
      { name: 'x1', label: 'Điểm cực đại x1', min: -6, max: 1 },
      { name: 'gap', label: 'Khoảng cách x2 - x1', min: 1, max: 5 },
      { name: 'y1', label: 'Giá trị cực đại y1', min: 2, max: 16 },
      { name: 'yDiff', label: 'Chênh lệch y1 - y2', min: 3, max: 18 },
      { name: 'askMin', label: 'Hỏi giá trị cực tiểu (1) hay cực đại (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { x1, gap, y1, yDiff } = params;
      if (gap < 1 || yDiff < 1) return { valid: false, reason: 'Cần hai cực trị phân biệt' };
      const x2 = x1 + gap;
      const y2 = y1 - yDiff;
      if (new Set([x1, x2, y1, y2]).size < 4) return { valid: false, reason: 'x1, x2, y1, y2 phải đôi một khác nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap, y1, yDiff, askMin } = params;
      const x2 = x1 + gap;
      const y2 = y1 - yDiff;
      const targetY = askMin === 1 ? y2 : y1;
      const otherY = askMin === 1 ? y1 : y2;
      const label = askMin === 1 ? 'giá trị cực tiểu' : 'giá trị cực đại';
      const correct = '$y = ' + targetY + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$y = ' + otherY + '$', '$y = ' + x1 + '$', '$y = ' + x2 + '$', '$y = ' + (otherY + 1) + '$'],
        rng,
        (k) => '$y = ' + (targetY + k + 10) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng biến thiên như hình vẽ sau. Tìm ' +
          label +
          ' của hàm số $y = f(x)$.',
        diagram: {
          kind: 'variation_table',
          derivLabel: "y'",
          funcLabel: 'y',
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ],
          yNodes: [
            { kind: 'single', pos: 'bot', value: '-\\infty' },
            { kind: 'single', pos: 'top', value: '' + y1 },
            { kind: 'single', pos: 'bot', value: '' + y2 },
            { kind: 'single', pos: 'top', value: '+\\infty' },
          ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Từ bảng biến thiên, hàm số đạt ' + (askMin === 1 ? 'cực tiểu tại $x = ' + x2 + '$' : 'cực đại tại $x = ' + x1 + '$') + '.',
          'Suy ra ' + label + ' của hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = -3, x2 = -2, y1 = 14, y2 = -1', params: { x1: -3, gap: 1, y1: 14, yDiff: 15, askMin: 1 }, expectedValid: true },
      { label: 'Biên lỗi trùng x và y', params: { x1: -2, gap: 3, y1: 1, yDiff: 3, askMin: 1 }, expectedValid: false },
    ],
  },

  // Dạng 17 [MC - Biết]: Tìm điểm cực đại từ đồ thị hàm phân thức bậc 2/bậc 1
  t12_b1_d17_graph_rat21_extrema_mc: {
    id: 't12_b1_d17_graph_rat21_extrema_mc',
    name: 'Dạng 17: Tìm điểm cực trị từ đồ thị hàm phân thức bậc 2/bậc 1',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cực trị — Đồ thị phân thức',
    description: 'Cho đồ thị hàm phân thức có tiệm cận đứng x = x0, cực đại tại x0 - k và cực tiểu tại x0 + k.',
    conditionSummary: 'k ∈ [2; 4], x0 ∈ [-4; 2]',
    paramSpecs: [
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -4, max: 2 },
      { name: 'k', label: 'Bán kính cực trị k', min: 2, max: 4 },
      { name: 'm', label: 'Hệ số góc TCX (1 hoặc -1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { k, m } = params;
      if (k < 2) return { valid: false, reason: 'Cần k >= 2' };
      if (m !== 1 && m !== -1) return { valid: false, reason: 'm phải là 1 hoặc -1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, k, m } = params;
      // y = m*x + m*k^2/(x - x0) => y' = m * (1 - k^2/(x - x0)^2)
      // At x1 = x0 - k (left of asymptote): if m > 0 => CĐ, if m < 0 => CT
      // At x2 = x0 + k (right of asymptote): if m > 0 => CT, if m < 0 => CĐ
      const a2 = m;
      const b1 = -m * x0;
      const c0 = m * k * k;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const f = (x) => m * x + (m * k * k) / (x - x0);
      const y1 = f(x1);
      const y2 = f(x2);
      const xMaxTarget = m > 0 ? x1 : x2;
      const xMinTarget = m > 0 ? x2 : x1;
      const minX = x1 - 4;
      const maxX = x2 + 4;
      const minY = Math.min(-6, Math.min(y1, y2) - 5);
      const maxY = Math.max(6, Math.max(y1, y2) + 5);
      const xTicks = [];
      for (let t = Math.ceil(minX / 2) * 2; t <= maxX; t += 2) xTicks.push(t);
      const yTicks = [];
      for (let t = Math.ceil(minY / 2) * 2; t <= maxY; t += 2) yTicks.push(t);
      const correct = '$x = ' + xMaxTarget + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + x0 + '$', '$x = ' + xMinTarget + '$', '$x = ' + (xMaxTarget + 2) + '$', '$x = ' + (x0 + 1) + '$'],
        rng,
        (j) => '$x = ' + (xMaxTarget + j + 4) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ có đồ thị như hình vẽ. Điểm cực đại của hàm số đã cho là:',
        diagram: {
          kind: 'function_plot',
          curveType: 'rational_2_1',
          coeffs: [a2, b1, c0, 1, -x0],
          xMin: minX,
          xMax: maxX,
          yMin: minY,
          yMax: maxY,
          xTicks,
          yTicks,
          verticalAsymptote: x0,
          obliqueAsymptote: { m, q: 0 },
          highlightPoints: [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
          ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Quan sát nhánh đồ thị bên ' + (m > 0 ? 'trái' : 'phải') + ' tiệm cận đứng $x = ' + x0 + '$, đồ thị đạt đỉnh cực đại tại điểm có hoành độ $x = ' + xMaxTarget + '$.',
          'Vậy điểm cực đại của hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = -3, k = 4', params: { x0: -3, k: 4, m: 1 }, expectedValid: true },
      { label: 'Biên lỗi k = 1', params: { x0: 0, k: 1, m: 1 }, expectedValid: false },
    ],
  },

  // Dạng 18 [MC - Biết]: Tìm điểm cực đại từ đồ thị hàm bậc ba (đã chuẩn hóa chính xác 100%)
  t12_b1_d18_graph_cubic_extrema_mc: {
    id: 't12_b1_d18_graph_cubic_extrema_mc',
    name: 'Dạng 18: Tìm điểm cực đại / cực tiểu từ đồ thị hàm bậc ba',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cực trị — Đồ thị hàm bậc ba',
    description: 'Cho đồ thị hàm bậc ba có 2 điểm cực trị nguyên x1 < x2. Xác định điểm cực đại từ đồ thị.',
    conditionSummary: 'x1 < x2, x2 - x1 >= 1, chuẩn dấu aSign cho đáp án & lời giải đồng bộ 100%',
    paramSpecs: [
      { name: 'x1', label: 'Cực trị trái x1', min: -3, max: 1 },
      { name: 'gap', label: 'Khoảng cách x2 - x1', min: 1, max: 3 },
      { name: 'aSign', label: 'Hệ số bậc ba (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'dShift', label: 'Dịch đứng d', min: -2, max: 2 },
    ],
    validateCode: `
      const { gap, aSign } = params;
      if (gap < 1) return { valid: false, reason: 'Cần hai cực trị phân biệt' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap, aSign, dShift } = params;
      const x2 = x1 + gap;
      // y' = aSign * (x - x1)(x - x2) => y = (aSign/3)*x^3 - (aSign/2)*(x1+x2)*x^2 + aSign*x1*x2*x + dShift
      const a = aSign / 3;
      const b = (-aSign * (x1 + x2)) / 2;
      const c = aSign * x1 * x2;
      const f = (x) => a * x * x * x + b * x * x + c * x + dShift;
      const y1 = Number(f(x1).toFixed(2));
      const y2 = Number(f(x2).toFixed(2));
      // If aSign > 0: y' is +,0,-,0,+ => CĐ at x1, CT at x2
      // If aSign < 0: y' is -,0,+,0,- => CT at x1, CĐ at x2
      const xMaxPt = aSign > 0 ? x1 : x2;
      const xMinPt = aSign > 0 ? x2 : x1;
      const correct = '$x = ' + xMaxPt + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + xMinPt + '$', '$x = ' + (x1 - 1) + '$', '$x = ' + (x2 + 1) + '$', '$x = ' + (x2 + 2) + '$'],
        rng,
        (k) => '$x = ' + (xMaxPt + k + 3) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ là hàm số bậc ba có đồ thị là đường cong trong hình dưới đây. Hàm số đã cho có điểm cực đại là:',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [a, b, c, dShift],
          xMin: -4.5,
          xMax: 4.5,
          yMin: Math.min(-4, Math.floor(Math.min(y1, y2)) - 2),
          yMax: Math.max(4, Math.ceil(Math.max(y1, y2)) + 2),
          xTicks: [-3, -2, -1, 1, 2, 3],
          yTicks: [-1, 1],
          highlightPoints: [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
          ],
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dựa vào đồ thị ta thấy hai điểm cực trị có hoành độ là $x = ' + x1 + '$ và $x = ' + x2 + '$.',
          'Đồ thị đạt đỉnh lồi (cực đại) tại điểm có hoành độ ' + correct + ' (và đạt cực tiểu tại $x = ' + xMinPt + '$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên aSign = -1, x1 = -2, x2 = -1 (CĐ tại x=-1)', params: { x1: -2, gap: 1, aSign: -1, dShift: -2 }, expectedValid: true },
      { label: 'Biên lỗi gap = 0', params: { x1: 0, gap: 0, aSign: 1, dShift: 0 }, expectedValid: false },
    ],
  },

  // Dạng 19 [MC - Biết]: Đếm số điểm cực trị từ bảng xét dấu f'(x) (có điểm không đổi dấu)
  t12_b1_d19_bsd_count_extrema_mc: {
    id: 't12_b1_d19_bsd_count_extrema_mc',
    name: 'Dạng 19: Đếm số điểm cực trị từ bảng xét dấu f\'(x)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cực trị — Bảng xét dấu',
    description: 'Cho bảng xét dấu f\'(x) có 2 hoặc 3 nghiệm nhưng chỉ một phần đổi dấu. Đếm số điểm cực trị.',
    conditionSummary: 'x1 < x2, có 1 nghiệm đổi dấu và 1 nghiệm giữ nguyên dấu => 1 điểm cực trị',
    paramSpecs: [
      { name: 'x1', label: 'Nghiệm x1', min: -5, max: 0 },
      { name: 'gap', label: 'Khoảng cách x2 - x1', min: 1, max: 5 },
      { name: 'flipFirst', label: 'Đổi dấu tại x1 (1) hay x2 (0)', min: 0, max: 1 },
    ],
    validateCode: `
      const { gap } = params;
      if (gap < 1) return { valid: false, reason: 'Hai điểm x1, x2 phải phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap, flipFirst } = params;
      const x2 = x1 + gap;
      const tokens =
        flipFirst === 1
          ? [
              { type: 'sign', value: '-' },
              { type: 'node', kind: '0' },
              { type: 'sign', value: '+' },
              { type: 'node', kind: '0' },
              { type: 'sign', value: '+' },
            ]
          : [
              { type: 'sign', value: '+' },
              { type: 'node', kind: '0' },
              { type: 'sign', value: '+' },
              { type: 'node', kind: '0' },
              { type: 'sign', value: '-' },
            ];
      const activeX = flipFirst === 1 ? x1 : x2;
      const deadX = flipFirst === 1 ? x2 : x1;
      const correct = '$1$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$3$', '$2$', '$0$'],
        rng,
        (k) => '$' + (k + 3) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ liên tục với mọi $x \\in \\mathbb{R}$ và có bảng xét dấu $f\'(x)$ như hình vẽ dưới đây. Số điểm cực trị của hàm số $y = f(x)$ là:',
        diagram: {
          kind: 'variation_table',
          derivLabel: "f'(x)",
          xNodes: ['-\\infty', '' + x1, '' + x2, '+\\infty'],
          derivTokens: tokens,
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Qua điểm $x = ' + activeX + '$, $f\'(x)$ đổi dấu nên $x = ' + activeX + '$ là một điểm cực trị.',
          'Qua điểm $x = ' + deadX + '$, $f\'(x)$ không đổi dấu nên không phải là điểm cực trị.',
          'Vậy hàm số $y = f(x)$ có $1$ điểm cực trị.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = -2, x2 = 0', params: { x1: -2, gap: 2, flipFirst: 1 }, expectedValid: true },
      { label: 'Biên lỗi x1 = x2', params: { x1: 1, gap: 0, flipFirst: 0 }, expectedValid: false },
    ],
  },

  // Dạng 20 [MC - Hiểu]: Đếm số điểm cực tiểu / cực đại khi cho f'(x) tích 3 nhị thức
  t12_b1_d20_fprime_3roots_count_mc: {
    id: 't12_b1_d20_fprime_3roots_count_mc',
    name: 'Dạng 20: Đếm số điểm cực tiểu / cực đại từ đạo hàm f\'(x) tích 3 nghiệm',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cực trị — Biểu thức đạo hàm',
    description: 'Cho f\'(x) = s(x - r1)(x - r2)(x - r3) với 3 nghiệm phân biệt. Đếm số điểm cực tiểu (hoặc cực đại).',
    conditionSummary: 'r1 < r2 < r3, s ∈ {-1, 1}',
    paramSpecs: [
      { name: 'r1', label: 'Nghiệm r1', min: -5, max: 0 },
      { name: 'd1', label: 'Bước r2 - r1', min: 1, max: 3 },
      { name: 'd2', label: 'Bước r3 - r2', min: 1, max: 3 },
      { name: 's', label: 'Dấu hệ số cao nhất (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { d1, d2, s } = params;
      if (d1 < 1 || d2 < 1) return { valid: false, reason: 'Cần ba nghiệm phân biệt r1 < r2 < r3' };
      if (s !== 1 && s !== -1) return { valid: false, reason: 's phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, d1, d2, s } = params;
      const r2 = r1 + d1;
      const r3 = r2 + d2;
      const fExpr =
        (s === -1 ? '-' : '') +
        '(' +
        u.formatShift('x', -r1) +
        ')(' +
        u.formatShift('x', -r2) +
        ')(' +
        u.formatShift('x', -r3) +
        ')';
      // If s = 1: signs (-, +, -, +) => CT at r1, r3 (count = 2), CĐ at r2 (count = 1)
      // If s = -1: signs (+, -, +, -) => CĐ at r1, r3 (count = 2), CT at r2 (count = 1)
      const countCT = s === 1 ? 2 : 1;
      const correct = '$' + countCT + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$0$', '$' + (s === 1 ? 1 : 2) + '$', '$3$'],
        rng,
        (k) => '$' + (k + 3) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có $f\'(x) = ' +
          fExpr +
          '$. Số điểm cực tiểu của hàm số $y = f(x)$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$f\'(x) = 0$ có ba nghiệm đơn phân biệt $x = ' + r1 + ',\\, x = ' + r2 + ',\\, x = ' + r3 + '$.',
          s === 1
            ? 'Xét dấu $f\'(x)$ thu được dấu lần lượt $(-, +, -, +)$ nên hàm số đạt cực tiểu tại $x = ' + r1 + '$ và $x = ' + r3 + '$ ($2$ điểm cực tiểu).'
            : 'Xét dấu $f\'(x)$ thu được dấu lần lượt $(+, -, +, -)$ nên hàm số chỉ đạt cực tiểu tại $x = ' + r2 + '$ ($1$ điểm cực tiểu).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nghiệm -3, -2, -1 với s = 1', params: { r1: -3, d1: 1, d2: 1, s: 1 }, expectedValid: true },
      { label: 'Biên lỗi trùng nghiệm d1 = 0', params: { r1: -2, d1: 0, d2: 2, s: 1 }, expectedValid: false },
    ],
  },

  // Dạng 21 [MC - Hiểu]: Tìm điểm cực đại/cực tiểu khi f'(x) chứa nhân tử mũ chẵn
  t12_b1_d21_fprime_even_power_mc: {
    id: 't12_b1_d21_fprime_even_power_mc',
    name: 'Dạng 21: Tìm điểm cực trị khi f\'(x) có nghiệm bội chẵn và bội lẻ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cực trị — Bội nghiệm f\'(x)',
    description: 'Cho f\'(x) = s(x - r1)(x - r2)^4(x - r3)^2. Chỉ nghiệm bội lẻ r1 mới là cực trị.',
    conditionSummary: 'r1, r2, r3 đôi một khác nhau, s ∈ {-1, 1}',
    paramSpecs: [
      { name: 'r1', label: 'Nghiệm bội lẻ r1', min: -6, max: 4 },
      { name: 'r2', label: 'Nghiệm bội 4 r2', min: -6, max: 4 },
      { name: 'r3', label: 'Nghiệm bội 2 r3', min: -6, max: 4 },
      { name: 's', label: 'Dấu hệ số (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { r1, r2, r3, s } = params;
      if (new Set([r1, r2, r3]).size < 3) {
        return { valid: false, reason: 'r1, r2, r3 phải đôi một khác nhau' };
      }
      if (s !== 1 && s !== -1) return { valid: false, reason: 's phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, r2, r3, s } = params;
      const fExpr =
        (s === -1 ? '-' : '') +
        '(' +
        u.formatShift('x', -r1) +
        ')(' +
        u.formatShift('x', -r2) +
        ')^4(' +
        u.formatShift('x', -r3) +
        ')^2';
      // If s = -1: for x < r1, f' > 0; for x > r1, f' < 0 => r1 is cực đại
      // If s = 1: for x < r1, f' < 0; for x > r1, f' > 0 => r1 is cực tiểu
      const askLabel = s === -1 ? 'Điểm cực đại' : 'Điểm cực tiểu';
      const correct = '$x = ' + r1 + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + r2 + '$', '$x = ' + r3 + '$', '$x = ' + (r1 + 1) + '$', '$x = ' + (r1 - 1) + '$'],
        rng,
        (k) => '$x = ' + (r1 + k + 5) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ có $f\'(x) = ' +
          fExpr +
          '$. ' +
          askLabel +
          ' của hàm số $y = f(x)$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hai nghiệm $x = ' + r2 + '$ (bội $4$) và $x = ' + r3 + '$ (bội $2$) là nghiệm bội chẵn nên $f\'(x)$ không đổi dấu qua chúng.',
          'Qua nghiệm đơn $x = ' + r1 + '$, $f\'(x)$ đổi dấu từ ' + (s === -1 ? 'dương sang âm' : 'âm sang dương') + ' nên ' + askLabel.toLowerCase() + ' là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chuẩn r1=-2, r2=-4, r3=-6, s=-1', params: { r1: -2, r2: -4, r3: -6, s: -1 }, expectedValid: true },
      { label: 'Biên lỗi trùng r1 = r2', params: { r1: -2, r2: -2, r3: 1, s: -1 }, expectedValid: false },
    ],
  },

  // Dạng 22 [MC - Hiểu]: Đếm số điểm cực đại của f(x) dựa vào đồ thị f'(x)
  t12_b1_d22_graph_fprime_extrema_mc: {
    id: 't12_b1_d22_graph_fprime_extrema_mc',
    name: 'Dạng 22: Đếm số điểm cực đại / cực tiểu của f(x) từ đồ thị f\'(x)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cực trị — Đồ thị f\'(x)',
    description: 'Cho đồ thị f\'(x) cắt trục hoành tại 0, r2, r3 (0 < r2 < r3). Đếm số điểm cực đại của hàm số y = f(x).',
    conditionSummary: '0 < r2 < r3, r3 <= 6, aSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'r2', label: 'Nghiệm dương thứ nhất r2', min: 1, max: 3 },
      { name: 'd', label: 'Khoảng cách r3 - r2', min: 2, max: 3 },
      { name: 'aSign', label: 'Chiều đồ thị f\'(x) (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { r2, d, aSign } = params;
      if (r2 < 1 || d < 1) return { valid: false, reason: 'Cần 0 < r2 < r3' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r2, d, aSign } = params;
      const r3 = r2 + d;
      const k = 0.2 * aSign;
      const c3 = k;
      const c2 = -k * (r2 + r3);
      const c1 = k * r2 * r3;
      // If aSign = 1: f'(x) goes (-, +, -, +) => CĐ at r2 (1 point)
      // If aSign = -1: f'(x) goes (+, -, +, -) => CĐ at 0 and r3 (2 points)
      const countCD = aSign === 1 ? 1 : 2;
      const correct = '$' + countCD + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$0$', '$' + (aSign === 1 ? 2 : 1) + '$', '$3$'],
        rng,
        (j) => '$' + (j + 3) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x)$ liên tục trên $\\mathbb{R}$ và có đồ thị $f\'(x)$ như hình vẽ. Số điểm cực đại của hàm số $y = f(x)$ là:',
        diagram: {
          kind: 'function_plot',
          curveType: 'cubic',
          coeffs: [c3, c2, c1, 0],
          xMin: -2,
          xMax: r3 + 2,
          yMin: -5,
          yMax: 4,
          xTicks: [r2, r3],
          yTicks: [],
          strokeColor: '#c026d3',
          curveLabel: "y = f'(x)",
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đồ thị $f\'(x)$ cắt trục hoành tại ba điểm phân biệt $x = 0,\\, x = ' + r2 + ',\\, x = ' + r3 + '$.',
          aSign === 1
            ? 'Qua $x = ' + r2 + '$, $f\'(x)$ đổi dấu từ dương sang âm (cực đại); qua $0$ và $' + r3 + '$ đổi từ âm sang dương (cực tiểu). Vậy có $1$ điểm cực đại.'
            : 'Qua $x = 0$ và $x = ' + r3 + '$, $f\'(x)$ đổi dấu từ dương sang âm (cực đại). Vậy có $2$ điểm cực đại.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r2=2, r3=5, aSign=1', params: { r2: 2, d: 3, aSign: 1 }, expectedValid: true },
      { label: 'Biên lỗi d=0', params: { r2: 2, d: 0, aSign: 1 }, expectedValid: false },
    ],
  },

  // Dạng 23 [MC - Hiểu]: Tìm điểm cực tiểu của hàm bậc ba y = x^3/3 + bx^2 + cx + d
  t12_b1_d23_cubic_extrema_x_mc: {
    id: 't12_b1_d23_cubic_extrema_x_mc',
    name: 'Dạng 23: Tìm điểm cực tiểu / cực đại của hàm số bậc ba',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cực trị — Hàm bậc ba',
    description: 'Cho hàm bậc ba y = ±x^3/3 + bx^2 + cx + d với đạo hàm có 2 nghiệm nguyên. Tìm điểm cực tiểu.',
    conditionSummary: 'x1 < x2, x1 + x2 chẵn, aSign ∈ {-1, 1}',
    paramSpecs: [
      { name: 'x1', label: 'Nghiệm x1', min: -5, max: 2 },
      { name: 'step', label: 'Nửa hiệu k (x2 = x1 + 2k)', min: 1, max: 4 },
      { name: 'd', label: 'Hằng số tự do d', min: -6, max: 6 },
      { name: 'aSign', label: 'Dấu bậc 3 (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { step, aSign } = params;
      if (step < 1) return { valid: false, reason: 'Cần step >= 1 để có hai điểm cực trị' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, step, d, aSign } = params;
      const x2 = x1 + 2 * step;
      // y' = aSign*(x - x1)*(x - x2) = aSign*x^2 - aSign*(x1+x2)x + aSign*x1*x2
      const b2 = (-aSign * (x1 + x2)) / 2;
      const c1 = aSign * x1 * x2;
      const leadStr = aSign === 1 ? '\\dfrac{x^3}{3}' : '-\\dfrac{x^3}{3}';
      const restPoly = u.formatPoly([b2, c1, d]);
      const restFormatted = restPoly === '0' ? '' : b2 > 0 || (b2 === 0 && c1 > 0) || (b2 === 0 && c1 === 0 && d > 0) ? ' + ' + restPoly : ' ' + restPoly;
      const derivStr = u.formatQuadratic(aSign, -aSign * (x1 + x2), aSign * x1 * x2);
      const xCT = aSign === 1 ? x2 : x1;
      const xCD = aSign === 1 ? x1 : x2;
      const correct = '$x = ' + xCT + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + xCD + '$', '$x = ' + (xCT + 5) + '$', '$x = ' + (xCD - 4) + '$'],
        rng,
        (k) => '$x = ' + (xCT - k - 3) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x) = ' +
          leadStr +
          restFormatted +
          '$. Điểm cực tiểu của hàm số đã cho là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $f\'(x) = ' + derivStr + '$.',
          '$f\'(x) = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Lập bảng biến thiên với hệ số $a = ' + (aSign === 1 ? '\\dfrac{1}{3} > 0' : '-\\dfrac{1}{3} < 0') + '$, điểm cực tiểu của hàm số là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 = -3, x2 = -1, d = 2', params: { x1: -3, step: 1, d: 2, aSign: 1 }, expectedValid: true },
      { label: 'Biên lỗi step = 0', params: { x1: 0, step: 0, d: 0, aSign: 1 }, expectedValid: false },
    ],
  },

  // Dạng 24 [MC - Hiểu]: Tìm giá trị cực tiểu của hàm bậc ba hệ số nguyên
  t12_b1_d24_cubic_extrema_y_mc: {
    id: 't12_b1_d24_cubic_extrema_y_mc',
    name: 'Dạng 24: Tìm giá trị cực tiểu / cực đại của hàm số bậc ba',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cực trị — Hàm bậc ba',
    description: 'Cho hàm bậc ba hệ số nguyên có 2 cực trị nguyên. Tính giá trị cực tiểu.',
    conditionSummary: 'x1 < x2, (x1 + x2) chẵn hoặc dùng hệ số dẫn 2x^3 (x1+x2 bất kỳ)',
    paramSpecs: [
      { name: 'x1', label: 'Nghiệm x1', min: -4, max: 2 },
      { name: 'gap', label: 'Khoảng cách x2 - x1', min: 1, max: 3 },
      { name: 'd', label: 'Hằng số tự do d', min: -5, max: 5 },
      { name: 'aSign', label: 'Dấu bậc 3 (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
    ],
    validateCode: `
      const { gap, aSign } = params;
      if (gap < 1) return { valid: false, reason: 'Cần hai cực trị phân biệt' };
      if (aSign !== 1 && aSign !== -1) return { valid: false, reason: 'aSign phải là -1 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap, d, aSign } = params;
      const x2 = x1 + gap;
      // f'(x) = 6*aSign*(x-x1)(x-x2) => f(x) = 2*aSign*x^3 - 3*aSign*(x1+x2)x^2 + 6*aSign*x1*x2*x + d
      const a = 2 * aSign;
      const b = -3 * aSign * (x1 + x2);
      const c = 6 * aSign * x1 * x2;
      const poly = u.formatPoly([a, b, c, d]);
      const dPoly = u.formatQuadratic(3 * a, 2 * b, c);
      const f = (x) => a * x * x * x + b * x * x + c * x + d;
      const xCT = aSign === 1 ? x2 : x1;
      const yCT = f(xCT);
      const yCD = f(aSign === 1 ? x1 : x2);
      const correct = '$' + yCT + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + x1 + '$', '$' + x2 + '$', '$' + yCD + '$', '$' + (yCT + 3) + '$'],
        rng,
        (k) => '$' + (yCT - k - 2) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = f(x) = ' +
          poly +
          '$. Giá trị cực tiểu của hàm số đã cho là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đạo hàm $f\'(x) = ' + dPoly + ' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Từ bảng biến thiên, hàm số đạt cực tiểu tại $x = ' + xCT + '$.',
          'Giá trị cực tiểu là $y_{\\text{CT}} = f(' + xCT + ') = ' + yCT + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y = -2x^3 - 9x^2 - 12x', params: { x1: -2, gap: 1, d: 0, aSign: -1 }, expectedValid: true },
      { label: 'Biên lỗi gap = 0', params: { x1: 1, gap: 0, d: 2, aSign: 1 }, expectedValid: false },
    ],
  },

  // Dạng 25 [MC - Hiểu]: Tìm điểm cực đại của hàm phân thức bậc 2/bậc 1 (đồng bộ chuẩn dấu 100%)
  t12_b1_d25_rat21_extrema_x_mc: {
    id: 't12_b1_d25_rat21_extrema_x_mc',
    name: 'Dạng 25: Tìm điểm cực đại / cực tiểu của hàm phân thức bậc 2/bậc 1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cực trị — Phân thức 2/1',
    description: 'Cho y = (ax^2+bx+c)/(x-x0) có 2 cực trị nguyên x0 ± k. Tìm điểm cực đại chính xác.',
    conditionSummary: 's ∈ {-2, -1, 1, 2}, k >= 1',
    paramSpecs: [
      { name: 's', label: 'Hệ số s', min: -2, max: 2, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -6, max: 14 },
      { name: 'k', label: 'Khoảng cách cực trị k', min: 1, max: 4 },
    ],
    validateCode: `
      const { s, k } = params;
      if (s === 0) return { valid: false, reason: 's phải khác 0' };
      if (k < 1) return { valid: false, reason: 'Cần k >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s, x0, k } = params;
      // y = s*(x - x0) + s*k^2/(x - x0) => y' = s*((x - x0)^2 - k^2)/(x - x0)^2
      const a2 = s;
      const b1 = -2 * s * x0;
      const c0 = s * (x0 * x0 + k * k);
      const x1 = x0 - k;
      const x2 = x0 + k;
      const numStr = u.formatQuadratic(a2, b1, c0);
      const denStr = u.formatShift('x', -x0);
      const innerQ = u.formatQuadratic(1, -2 * x0, x0 * x0 - k * k);
      // If s > 0: + (x1) - | - (x2) +  => CĐ at x1, CT at x2
      // If s < 0: - (x1) + | + (x2) -  => CT at x1, CĐ at x2
      const xCD = s > 0 ? x1 : x2;
      const xCT = s > 0 ? x2 : x1;
      const correct = '$x = ' + xCD + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$x = ' + xCT + '$', '$x = ' + x0 + '$', '$x = ' + (x2 + 5) + '$', '$x = ' + (x1 - 1) + '$'],
        rng,
        (j) => '$x = ' + (xCD + j + 7) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$. Điểm cực đại của hàm số đã cho là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đạo hàm $y\' = \\dfrac{' + (s === 1 ? '' : s === -1 ? '-' : s) + '(' + innerQ + ')}{(' + denStr + ')^2} = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          s > 0
            ? 'Xét dấu $y\'$: dương trên $(-\\infty;\\, ' + x1 + ')$, âm trên $(' + x1 + ';\\, ' + x0 + ')$ và $(' + x0 + ';\\, ' + x2 + ')$, dương trên $(' + x2 + ';\\, +\\infty)$. Do đó điểm cực đại là ' + correct + '.'
            : 'Xét dấu $y\'$: âm trên $(-\\infty;\\, ' + x1 + ')$, dương trên $(' + x1 + ';\\, ' + x0 + ')$ và $(' + x0 + ';\\, ' + x2 + ')$, âm trên $(' + x2 + ';\\, +\\infty)$. Do đó điểm cực đại là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y = (-2x^2+28x-8)/(x-14) chuẩn dấu', params: { s: -2, x0: 14, k: 2 }, expectedValid: true },
      { label: 'Biên lỗi s = 0', params: { s: 0, x0: 4, k: 2 }, expectedValid: false },
    ],
  },

  // Dạng 26 [MC - Hiểu]: Tìm giá trị cực tiểu của hàm phân thức bậc 2/bậc 1
  t12_b1_d26_rat21_extrema_y_mc: {
    id: 't12_b1_d26_rat21_extrema_y_mc',
    name: 'Dạng 26: Tìm giá trị cực tiểu / cực đại của hàm phân thức bậc 2/bậc 1',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Cực trị — Phân thức 2/1',
    description: 'Cho y = (ax^2+bx+c)/(x-x0) có 2 cực trị nguyên. Tính giá trị cực tiểu chính xác.',
    conditionSummary: 's ∈ {-2, -1, 1, 2}, k >= 1, yCT != yCD',
    paramSpecs: [
      { name: 's', label: 'Hệ số s', min: -2, max: 2, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -5, max: 10 },
      { name: 'k', label: 'Khoảng cách cực trị k', min: 1, max: 4 },
      { name: 'm', label: 'Hằng số dịch dọc m', min: -4, max: 4 },
    ],
    validateCode: `
      const { s, k } = params;
      if (s === 0) return { valid: false, reason: 's phải khác 0' };
      if (k < 1) return { valid: false, reason: 'Cần k >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s, x0, k, m } = params;
      // y = s*(x - x0) + m + s*k^2/(x - x0)
      const a2 = s;
      const b1 = -2 * s * x0 + m;
      const c0 = s * (x0 * x0 + k * k) - m * x0;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const yAt = (x) => s * (x - x0) + m + (s * k * k) / (x - x0);
      const xCT = s > 0 ? x2 : x1;
      const xCD = s > 0 ? x1 : x2;
      const yCT = yAt(xCT);
      const yCD = yAt(xCD);
      const numStr = u.formatQuadratic(a2, b1, c0);
      const denStr = u.formatShift('x', -x0);
      const innerQ = u.formatQuadratic(1, -2 * x0, x0 * x0 - k * k);
      const correct = '$' + yCT + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + yCD + '$', '$' + xCT + '$', '$' + xCD + '$', '$' + (yCT - 4) + '$'],
        rng,
        (j) => '$' + (yCT + j + 6) + '$'
      );
      return {
        stem:
          'Cho hàm số $y = \\dfrac{' +
          numStr +
          '}{' +
          denStr +
          '}$. Giá trị cực tiểu của hàm số đã cho là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đạo hàm $y\' = \\dfrac{' + (s === 1 ? '' : s === -1 ? '-' : s) + '(' + innerQ + ')}{(' + denStr + ')^2} = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Lập bảng biến thiên, hàm số đạt cực tiểu tại $x = ' + xCT + '$.',
          'Giá trị cực tiểu là $y_{\\text{CT}} = f(' + xCT + ') = ' + yCT + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên y = (-2x^2+16x-8)/(x-8)', params: { s: -2, x0: 8, k: 2, m: -16 }, expectedValid: true },
      { label: 'Biên lỗi s = 0', params: { s: 0, x0: 3, k: 2, m: 0 }, expectedValid: false },
    ],
  },
};
