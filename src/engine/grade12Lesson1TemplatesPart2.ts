import { MathTemplate } from '../types/math';

export const G12_B1_TEMPLATES_PART2: Record<string, MathTemplate> = {
  // =========================================================================
  // PHẦN II: ĐÚNG - SAI (TF: Dạng 27 - Dạng 34)
  // =========================================================================

  // Dạng 27 [TF - Hiểu]: BBT hàm số trên R có 3 cực trị (+,-,+, -) — đơn điệu, so sánh f(x) & nghiệm f'(ax+b)=0
  t12_b1_d27_bbt_4_composite_tf: {
    id: 't12_b1_d27_bbt_4_composite_tf',
    name: 'Dạng 27: Đọc tính đơn điệu, so sánh giá trị và nghiệm f\'(ax+b)=0 từ BBT 3 cực trị (nhánh +,-,+,-)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đơn điệu & Cực trị — BBT 3 cực trị',
    description:
      'Cho BBT trên R với 3 điểm cực trị x1 < x2 < x3 và dấu f\'(x): +, 0, -, 0, +, 0, -. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'gap1 >= 1, gap2 >= 1, y2 < min(y1, y3), kMul >= 2',
    paramSpecs: [
      { name: 'x1', label: 'Cực trị x1', min: -5, max: 0 },
      { name: 'gap1', label: 'Khoảng x2 - x1', min: 2, max: 5 },
      { name: 'gap2', label: 'Khoảng x3 - x2', min: 1, max: 5 },
      { name: 'y1', label: 'Giá trị CĐ1 y1', min: -12, max: 2 },
      { name: 'y2', label: 'Giá trị CT y2', min: -18, max: -4 },
      { name: 'y3', label: 'Giá trị CĐ2 y3', min: -10, max: 6 },
      { name: 'kMul', label: 'Hệ số a trong f\'(ax+b)', min: 2, max: 5 },
      { name: 'kAdd', label: 'Hệ số b trong f\'(ax+b)', min: -4, max: 4 },
    ],
    validateCode: `
      const { gap1, gap2, y1, y2, y3, kMul } = params;
      if (gap1 < 1 || gap2 < 1) return { valid: false, reason: 'Ba điểm cực trị phải phân biệt tăng dần' };
      if (y2 >= y1 || y2 >= y3) return { valid: false, reason: 'Giá trị cực tiểu y2 phải nhỏ hơn cả y1 và y3' };
      if (kMul < 2) return { valid: false, reason: 'Cần kMul >= 2 để phương trình đạo hàm hàm hợp có hệ số góc rõ ràng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap1, gap2, y1, y2, y3, kMul, kAdd } = params;
      const x2 = x1 + gap1;
      const x3 = x2 + gap2;
      const xTestHi = x3 + 2;
      const isCTrue = Math.abs(kAdd) % 2 === 1;
      const cText = isCTrue
        ? '$f(' + xTestHi + ') < f(' + x3 + ')$'
        : '$f(' + xTestHi + ') > f(' + x3 + ')$';

      const r1 = u.simplifyFrac(x1 - kAdd, kMul);
      const r2 = u.simplifyFrac(x2 - kAdd, kMul);
      const r3 = u.simplifyFrac(x3 - kAdd, kMul);
      const isDTrue = Math.abs(kAdd) % 3 === 0;
      let dCand = r2;
      if (!isDTrue) {
        let numShift = 1;
        while (true) {
          const cand = u.simplifyFrac(x1 - kAdd - numShift, 2 * kMul);
          if (
            Math.abs(cand.value - r1.value) > 1e-6 &&
            Math.abs(cand.value - r2.value) > 1e-6 &&
            Math.abs(cand.value - r3.value) > 1e-6
          ) {
            dCand = cand;
            break;
          }
          numShift++;
        }
      }
      const linExpr = u.formatLinear(kMul, kAdd);

      const tfStatements = [
        { key: 'a', text: 'Hàm số đồng biến trên khoảng $(-\\infty;\\, ' + x2 + ')$.', isTrue: false },
        { key: 'b', text: 'Hàm số nghịch biến trên khoảng $(' + x1 + ';\\, +\\infty)$.', isTrue: false },
        { key: 'c', text: cText, isTrue: isCTrue },
        {
          key: 'd',
          text: 'Phương trình $f\'(' + linExpr + ') = 0$ nhận $x = ' + dCand.latex + '$ làm nghiệm.',
          isTrue: isDTrue,
        },
      ];

      return {
        stem: 'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng biến thiên như hình vẽ. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "f'(x)",
          funcLabel: 'f(x)',
          xNodes: ['-\\infty', '' + x1, '' + x2, '' + x3, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
          ],
          yNodes: [
            { kind: 'single', pos: 'bot', value: '-\\infty' },
            { kind: 'single', pos: 'top', value: '' + y1 },
            { kind: 'single', pos: 'bot', value: '' + y2 },
            { kind: 'single', pos: 'top', value: '' + y3 },
            { kind: 'single', pos: 'bot', value: '-\\infty' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Dựa vào BBT, hàm số đồng biến trên các khoảng $(-\\infty;\\, ' + x1 + ')$ và $(' + x2 + ';\\, ' + x3 + ')$, không đồng biến trên toàn $(-\\infty;\\, ' + x2 + ')$.',
          'b) Sai. Hàm số nghịch biến trên các khoảng $(' + x1 + ';\\, ' + x2 + ')$ và $(' + x3 + ';\\, +\\infty)$, không nghịch biến trên toàn $(' + x1 + ';\\, +\\infty)$.',
          'c) ' + (isCTrue ? 'Đúng' : 'Sai') + '. Trên khoảng $(' + x3 + ';\\, +\\infty)$ hàm số nghịch biến và $' + xTestHi + ' > ' + x3 + '$ nên $f(' + xTestHi + ') < f(' + x3 + ')$.',
          'd) ' + (isDTrue ? 'Đúng' : 'Sai') + '. Ta có $f\'(' + linExpr + ') = 0 \\Leftrightarrow ' + linExpr + ' \\in \\{' + x1 + ';\\, ' + x2 + ';\\, ' + x3 + '\\} \\Leftrightarrow x \\in \\{' + r1.latex + ';\\, ' + r2.latex + ';\\, ' + r3.latex + '\\}$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (-2, 1, 2; f\'(3x-1)=0)',
        params: { x1: -2, gap1: 3, gap2: 1, y1: -10, y2: -14, y3: -8, kMul: 3, kAdd: -1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi y2 >= y1',
        params: { x1: -2, gap1: 3, gap2: 1, y1: -10, y2: -8, y3: -5, kMul: 3, kAdd: -1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 28 [TF - Hiểu]: BBT chữ W 3 cực trị (-,+, -,+) — đơn điệu, so sánh & nghiệm f'(ax+b)=0
  t12_b1_d28_bbt_w_composite_tf: {
    id: 't12_b1_d28_bbt_w_composite_tf',
    name: 'Dạng 28: Đọc tính đơn điệu, so sánh f(x) và nghiệm f\'(ax+b)=0 từ BBT chữ W (-,+,-,+)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đơn điệu & Cực trị — BBT chữ W',
    description:
      'Cho BBT trên R với 3 điểm cực trị x1 < x2 < x3 và dấu f\'(x): -, 0, +, 0, -, 0, +. Xét 4 mệnh đề Đúng/Sai.',
    conditionSummary: 'gap1 >= 1, gap2 >= 1, yMax > max(yMin1, yMin2), kMul >= 2',
    paramSpecs: [
      { name: 'x1', label: 'Cực trị x1', min: 1, max: 6 },
      { name: 'gap1', label: 'Khoảng x2 - x1', min: 2, max: 5 },
      { name: 'gap2', label: 'Khoảng x3 - x2', min: 2, max: 6 },
      { name: 'yMin1', label: 'Giá trị CT1', min: -14, max: -4 },
      { name: 'yMax', label: 'Giá trị CĐ', min: -5, max: 6 },
      { name: 'yMin2', label: 'Giá trị CT2', min: -14, max: -4 },
      { name: 'kMul', label: 'Hệ số a trong f\'(ax+b)', min: 2, max: 5 },
      { name: 'kAdd', label: 'Hệ số b trong f\'(ax+b)', min: -4, max: 4 },
    ],
    validateCode: `
      const { gap1, gap2, yMin1, yMax, yMin2, kMul } = params;
      if (gap1 < 1 || gap2 < 1) return { valid: false, reason: 'Cần x1 < x2 < x3' };
      if (yMax <= yMin1 || yMax <= yMin2) return { valid: false, reason: 'Giá trị cực đại yMax phải lớn hơn yMin1 và yMin2' };
      if (kMul < 2) return { valid: false, reason: 'kMul phải >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap1, gap2, yMin1, yMax, yMin2, kMul, kAdd } = params;
      const x2 = x1 + gap1;
      const x3 = x2 + gap2;
      const isBTrue = Math.abs(x1) % 2 === 0;
      const bText = isBTrue ? '$f(' + x1 + ') < f(' + x2 + ')$' : '$f(' + x1 + ') > f(' + x2 + ')$';

      const r1 = u.simplifyFrac(x1 - kAdd, kMul);
      const r2 = u.simplifyFrac(x2 - kAdd, kMul);
      const r3 = u.simplifyFrac(x3 - kAdd, kMul);
      let wrongCand = u.simplifyFrac(x2 - kAdd - 1, kMul);
      let guard = 1;
      while (
        Math.abs(wrongCand.value - r1.value) < 1e-6 ||
        Math.abs(wrongCand.value - r2.value) < 1e-6 ||
        Math.abs(wrongCand.value - r3.value) < 1e-6
      ) {
        guard++;
        wrongCand = u.simplifyFrac(x2 - kAdd - guard, kMul);
      }
      const linExpr = u.formatLinear(kMul, kAdd);

      const tfStatements = [
        { key: 'a', text: 'Hàm số nghịch biến trên khoảng $(' + x2 + ';\\, +\\infty)$.', isTrue: false },
        { key: 'b', text: bText, isTrue: isBTrue },
        {
          key: 'c',
          text: 'Phương trình $f\'(' + linExpr + ') = 0$ nhận $x = ' + wrongCand.latex + '$ làm nghiệm.',
          isTrue: false,
        },
        { key: 'd', text: 'Hàm số đồng biến trên khoảng $(-\\infty;\\, ' + x2 + ')$.', isTrue: false },
      ];

      return {
        stem: 'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng biến thiên như hình vẽ. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "f'(x)",
          funcLabel: 'f(x)',
          xNodes: ['-\\infty', '' + x1, '' + x2, '' + x3, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ],
          yNodes: [
            { kind: 'single', pos: 'top', value: '+\\infty' },
            { kind: 'single', pos: 'bot', value: '' + yMin1 },
            { kind: 'single', pos: 'top', value: '' + yMax },
            { kind: 'single', pos: 'bot', value: '' + yMin2 },
            { kind: 'single', pos: 'top', value: '+\\infty' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Hàm số nghịch biến trên các khoảng $(-\\infty;\\, ' + x1 + ')$ và $(' + x2 + ';\\, ' + x3 + ')$.',
          'b) ' + (isBTrue ? 'Đúng' : 'Sai') + '. Vì hàm số đồng biến trên $(' + x1 + ';\\, ' + x2 + ')$ nên $f(' + x1 + ') < f(' + x2 + ')$.',
          'c) Sai. Giải $f\'(' + linExpr + ') = 0 \\Leftrightarrow x \\in \\{' + r1.latex + ';\\, ' + r2.latex + ';\\, ' + r3.latex + '\\}$, không chứa $x = ' + wrongCand.latex + '$.',
          'd) Sai. Hàm số đồng biến trên các khoảng $(' + x1 + ';\\, ' + x2 + ')$ và $(' + x3 + ';\\, +\\infty)$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (5, 8, 13; f\'(3x-1)=0)',
        params: { x1: 5, gap1: 3, gap2: 5, yMin1: -10, yMax: -4, yMin2: -10, kMul: 3, kAdd: -1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi yMax <= yMin1',
        params: { x1: 5, gap1: 3, gap2: 5, yMin1: -4, yMax: -4, yMin2: -10, kMul: 3, kAdd: -1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 29 [TF - Hiểu]: Bảng xét dấu f'(x) (chỉ 2 dòng x, f'(x)) — nghiệm f'(ax+b)=0, đơn điệu & so sánh
  t12_b1_d29_bsd_w_composite_tf: {
    id: 't12_b1_d29_bsd_w_composite_tf',
    name: 'Dạng 29: Bảng xét dấu f\'(x) (3 nghiệm) — nghiệm f\'(ax+b)=0, đơn điệu & so sánh f(x)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Đơn điệu — Bảng xét dấu f\'(x)',
    description:
      'Cho bảng xét dấu f\'(x) trên R (chỉ 2 dòng) có 3 nghiệm x1 < x2 < x3 với dấu -, 0, +, 0, -, 0, +. Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'gap1 >= 1, gap2 >= 1, kMul >= 2',
    paramSpecs: [
      { name: 'x1', label: 'Nghiệm x1', min: 1, max: 5 },
      { name: 'gap1', label: 'Khoảng x2 - x1', min: 2, max: 5 },
      { name: 'gap2', label: 'Khoảng x3 - x2', min: 2, max: 5 },
      { name: 'kMul', label: 'Hệ số a trong f\'(ax+b)', min: 2, max: 6 },
      { name: 'kAdd', label: 'Hệ số b trong f\'(ax+b)', min: -4, max: 6 },
    ],
    validateCode: `
      const { gap1, gap2, kMul } = params;
      if (gap1 < 1 || gap2 < 1) return { valid: false, reason: 'Ba nghiệm phải phân biệt tăng dần' };
      if (kMul < 2) return { valid: false, reason: 'Cần kMul >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap1, gap2, kMul, kAdd } = params;
      const x2 = x1 + gap1;
      const x3 = x2 + gap2;
      const r1 = u.simplifyFrac(x1 - kAdd, kMul);
      const r2 = u.simplifyFrac(x2 - kAdd, kMul);
      const r3 = u.simplifyFrac(x3 - kAdd, kMul);

      let wrongCand = u.simplifyFrac(x3 - kAdd + 3, kMul);
      let guard = 1;
      while (
        Math.abs(wrongCand.value - r1.value) < 1e-6 ||
        Math.abs(wrongCand.value - r2.value) < 1e-6 ||
        Math.abs(wrongCand.value - r3.value) < 1e-6
      ) {
        guard++;
        wrongCand = u.simplifyFrac(x3 - kAdd + 3 + guard, kMul);
      }

      const linExpr = u.formatLinear(kMul, kAdd);
      const tfStatements = [
        {
          key: 'a',
          text: 'Phương trình $f\'(' + linExpr + ') = 0$ nhận $x = ' + wrongCand.latex + '$ làm nghiệm.',
          isTrue: false,
        },
        { key: 'b', text: 'Hàm số nghịch biến trên khoảng $(-\\infty;\\, ' + x2 + ')$.', isTrue: false },
        { key: 'c', text: '$f(' + x1 + ') < f(' + x2 + ')$.', isTrue: true },
        { key: 'd', text: 'Hàm số đồng biến trên khoảng $(' + x1 + ';\\, +\\infty)$.', isTrue: false },
      ];

      return {
        stem: 'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của $f\'(x)$ như hình vẽ. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "f'(x)",
          xNodes: ['-\\infty', '' + x1, '' + x2, '' + x3, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. $f\'(' + linExpr + ') = 0 \\Leftrightarrow x \\in \\{' + r1.latex + ';\\, ' + r2.latex + ';\\, ' + r3.latex + '\\}$.',
          'b) Sai. Hàm số nghịch biến trên $(-\\infty;\\, ' + x1 + ')$ và $(' + x2 + ';\\, ' + x3 + ')$.',
          'c) Đúng. Trên khoảng $(' + x1 + ';\\, ' + x2 + ')$ có $f\'(x) > 0$ nên hàm đồng biến, suy ra $f(' + x1 + ') < f(' + x2 + ')$.',
          'd) Sai. Hàm số đồng biến trên $(' + x1 + ';\\, ' + x2 + ')$ và $(' + x3 + ';\\, +\\infty)$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (3, 6, 8; f\'(6x+4)=0)',
        params: { x1: 3, gap1: 3, gap2: 2, kMul: 6, kAdd: 4 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi gap1 = 0',
        params: { x1: 3, gap1: 0, gap2: 2, kMul: 6, kAdd: 4 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 30 [TF - Biết]: Bảng xét dấu f'(x) (3 nghiệm) — nhận biết đơn điệu và cực đại/cực tiểu
  t12_b1_d30_bsd_w_extrema_tf: {
    id: 't12_b1_d30_bsd_w_extrema_tf',
    name: 'Dạng 30: Bảng xét dấu f\'(x) (3 nghiệm) — đơn điệu, điểm cực trị và giá trị cực trị',
    category: 'TF',
    level: 'Biết',
    topicTag: 'Cực trị — Bảng xét dấu f\'(x)',
    description:
      'Cho bảng xét dấu f\'(x) có 3 nghiệm x1 < x2 < x3 với dấu -, 0, +, 0, -, 0, +. Xét 4 khẳng định về khoảng đồng/nghịch biến, giá trị cực tiểu và điểm cực đại.',
    conditionSummary: 'gap1 >= 1, gap2 >= 1, mode in {0, 1}',
    paramSpecs: [
      { name: 'x1', label: 'Nghiệm x1', min: -3, max: 4 },
      { name: 'gap1', label: 'Khoảng x2 - x1', min: 2, max: 5 },
      { name: 'gap2', label: 'Khoảng x3 - x2', min: 2, max: 6 },
      { name: 'mode', label: 'Biến thể khẳng định đúng/sai (0 hoặc 1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { gap1, gap2, mode } = params;
      if (gap1 < 1 || gap2 < 1) return { valid: false, reason: 'Cần x1 < x2 < x3 phân biệt' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap1, gap2, mode } = params;
      const x2 = x1 + gap1;
      const x3 = x2 + gap2;
      const cTrue = mode === 1;
      const tfStatements = [
        { key: 'a', text: 'Hàm số nghịch biến trên khoảng $(-\\infty;\\, ' + x2 + ')$.', isTrue: false },
        { key: 'b', text: '$f(' + x1 + ') > f(' + x2 + ')$.', isTrue: false },
        {
          key: 'c',
          text: cTrue
            ? '$f(' + x3 + ')$ là giá trị cực tiểu của hàm số đã cho.'
            : '$f(' + x2 + ')$ là giá trị cực tiểu của hàm số đã cho.',
          isTrue: cTrue,
        },
        { key: 'd', text: 'Điểm cực đại của hàm số đã cho là $x = ' + x1 + '$.', isTrue: false },
      ];

      return {
        stem: 'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của $f\'(x)$ như hình vẽ. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "f'(x)",
          xNodes: ['-\\infty', '' + x1, '' + x2, '' + x3, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Hàm số nghịch biến trên các khoảng $(-\\infty;\\, ' + x1 + ')$ và $(' + x2 + ';\\, ' + x3 + ')$.',
          'b) Sai. Trên khoảng $(' + x1 + ';\\, ' + x2 + ')$ có $f\'(x) > 0$ nên $f(' + x1 + ') < f(' + x2 + ')$.',
          'c) ' + (cTrue ? 'Đúng' : 'Sai') + '. Vì $f\'(x)$ đổi dấu từ $-$ sang $+$ tại $x = ' + x1 + '$ và $x = ' + x3 + '$, nên hàm số đạt cực tiểu tại $x = ' + x1 + '$ và $x = ' + x3 + '$, còn $f(' + x2 + ')$ là giá trị cực đại.',
          'd) Sai. Vì $f\'(x)$ đổi dấu từ $+$ sang $-$ tại $x = ' + x2 + '$ nên điểm cực đại là $x = ' + x2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (1, 4, 8)', params: { x1: 1, gap1: 3, gap2: 4, mode: 0 }, expectedValid: true },
      { label: 'Biên cực trị âm (-3, 0, 4)', params: { x1: -3, gap1: 3, gap2: 4, mode: 1 }, expectedValid: true },
      { label: 'Biên lỗi gap2 = 0', params: { x1: 1, gap1: 3, gap2: 0, mode: 0 }, expectedValid: false },
    ],
  },

  // Dạng 31 [TF - Hiểu]: Khảo sát tính chất hàm bậc ba (TXĐ, đạo hàm, khoảng đơn điệu, cực trị)
  t12_b1_d31_cubic_4prop_tf: {
    id: 't12_b1_d31_cubic_4prop_tf',
    name: 'Dạng 31: Khảo sát 4 tính chất của hàm số bậc ba (TXĐ, đạo hàm, đơn điệu, cực trị)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Khảo sát hàm bậc ba',
    description:
      'Cho hàm số y = ax^3 + bx^2 + cx + d (a ∈ {-1, 1}, hai cực trị nguyên x1 < x2). Xét 4 khẳng định Đúng/Sai.',
    conditionSummary: 'a ∈ {-1, 1}, x1 < x2 và x1 + x2 chẵn để các hệ số b, c nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số bậc ba a', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'x1', label: 'Điểm cực trị x1', min: -5, max: 2 },
      { name: 'x2', label: 'Điểm cực trị x2', min: -3, max: 5 },
      { name: 'd', label: 'Hệ số tự do d', min: -6, max: 6 },
    ],
    validateCode: `
      const { a, x1, x2 } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'a chỉ nhận -1 hoặc 1' };
      if (x1 >= x2) return { valid: false, reason: 'Cần hai cực trị phân biệt x1 < x2' };
      if ((x1 + x2) % 2 !== 0) return { valid: false, reason: 'Cần x1 + x2 chẵn để hệ số b nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2, d } = params;
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const poly = u.formatPoly([a, b, c, d]);
      const deriv = u.formatQuadratic(3 * a, 2 * b, c);
      const yAt1 = a * Math.pow(x1, 3) + b * Math.pow(x1, 2) + c * x1 + d;
      const yAt2 = a * Math.pow(x2, 3) + b * Math.pow(x2, 2) + c * x2 + d;
      const yCT = a > 0 ? yAt2 : yAt1;
      const yCD = a > 0 ? yAt1 : yAt2;
      const wrongBound = Math.abs(x2) + 2;
      const innerMono = a < 0 ? 'đồng biến' : 'nghịch biến';

      const tfStatements = [
        { key: 'a', text: 'Tập xác định của hàm số là $(-\\infty;\\, ' + wrongBound + ')$.', isTrue: false },
        { key: 'b', text: 'Hàm số có đạo hàm là $y\' = ' + deriv + '$.', isTrue: true },
        { key: 'c', text: 'Hàm số ' + innerMono + ' trên khoảng $(' + x1 + ';\\, ' + x2 + ')$.', isTrue: true },
        { key: 'd', text: 'Giá trị cực tiểu của hàm số là $y = ' + yCT + '$.', isTrue: true },
      ];

      return {
        stem: 'Cho hàm số $y = ' + poly + '$. Xét tính đúng-sai của các khẳng định sau.',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Hàm số đã cho là hàm đa thức nên có tập xác định là $\\mathbb{R}$.',
          'b) Đúng. Lấy đạo hàm từng hạng tử ta được $y\' = ' + deriv + '$.',
          'c) Đúng. $y\' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$. Vì hệ số bậc hai của $y\'$ là $' + (3 * a) + (a < 0 ? ' < 0$' : ' > 0$') + ' nên hàm số ' + innerMono + ' trên khoảng $(' + x1 + ';\\, ' + x2 + ')$.',
          'd) Đúng. Tính giá trị tại hai điểm cực trị: $y_{\\text{CĐ}} = ' + yCD + '$, $y_{\\text{CT}} = ' + yCT + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (-x^3 - 6x^2 - 9x - 3)', params: { a: -1, x1: -3, x2: -1, d: -3 }, expectedValid: true },
      { label: 'Biên a = 1 đối xứng (-2, 2)', params: { a: 1, x1: -2, x2: 2, d: 1 }, expectedValid: true },
      { label: 'Biên lỗi x1 + x2 lẻ', params: { a: 1, x1: 0, x2: 1, d: 0 }, expectedValid: false },
    ],
  },

  // Dạng 32 [TF - Hiểu]: Khảo sát tính chất hàm phân thức (x^2 + bx + c)/(x - x0)
  t12_b1_d32_rat21_4prop_tf: {
    id: 't12_b1_d32_rat21_4prop_tf',
    name: 'Dạng 32: Khảo sát 4 tính chất hàm phân thức (x² + bx + c)/(x - x0)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Khảo sát hàm phân thức bậc 2/bậc 1',
    description:
      'Cho hàm số y = (x^2 + bx + c)/(x - x0) có 2 cực trị nguyên x1 = x0 - k và x2 = x0 + k. Xét 4 khẳng định về TXĐ, đạo hàm, đơn điệu và cực trị.',
    conditionSummary: 'k >= 1, x0 != 0 để mẫu khác x và phân biệt rõ dấu ±x0',
    paramSpecs: [
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -6, max: 6, allowZero: false },
      { name: 'b', label: 'Hệ số b của tử thức', min: -8, max: 8 },
      { name: 'k', label: 'Bán kính cực trị k', min: 1, max: 4 },
    ],
    validateCode: `
      const { x0, k } = params;
      if (x0 === 0) return { valid: false, reason: 'Chọn x0 != 0 để giữ dạng mẫu (x - x0)' };
      if (k < 1) return { valid: false, reason: 'Cần k >= 1 để có 2 cực trị phân biệt' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x0, b, k } = params;
      const c = k * k - x0 * x0 - b * x0;
      const x1 = x0 - k;
      const x2 = x0 + k;
      const numExpr = u.formatQuadratic(1, b, c);
      const denExpr = u.formatShift('x', -x0);
      const derivNum = u.formatQuadratic(1, -2 * x0, x0 * x0 - k * k);

      const tfStatements = [
        { key: 'a', text: 'Tập xác định của hàm số là $\\mathbb{R} \\setminus \\{' + (-x0) + '\\}$.', isTrue: false },
        { key: 'b', text: 'Hàm số có đạo hàm là $y\' = \\dfrac{' + derivNum + '}{' + denExpr + '}$.', isTrue: false },
        { key: 'c', text: 'Hàm số nghịch biến trên khoảng $(' + x2 + ';\\, +\\infty)$.', isTrue: false },
        { key: 'd', text: 'Điểm cực tiểu của hàm số là $x = ' + x1 + '$.', isTrue: false },
      ];

      return {
        stem: 'Cho hàm số $y = \\dfrac{' + numExpr + '}{' + denExpr + '}$. Xét tính đúng-sai của các khẳng định sau.',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Hàm số xác định khi $' + denExpr + ' \\neq 0 \\Leftrightarrow x \\neq ' + x0 + '$, suy ra $D = \\mathbb{R} \\setminus \\{' + x0 + '\\}$.',
          'b) Sai. Đạo hàm đúng phải có mẫu bình phương: $y\' = \\dfrac{' + derivNum + '}{(' + denExpr + ')^2}$.',
          'c) Sai. Giải $y\' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$. Trên $(' + x2 + ';\\, +\\infty)$ có $y\' > 0$ nên hàm số đồng biến (nghịch biến trên $(' + x1 + ';\\, ' + x0 + ')$ và $(' + x0 + ';\\, ' + x2 + ')$).',
          'd) Sai. Hàm số đạt cực đại tại $x = ' + x1 + '$ và đạt cực tiểu tại $x = ' + x2 + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (x0 = 5, b = -5, k = 2)', params: { x0: 5, b: -5, k: 2 }, expectedValid: true },
      { label: 'Biên lỗi x0 = 0', params: { x0: 0, b: 2, k: 2 }, expectedValid: false },
    ],
  },

  // Dạng 33 [TF - Vận dụng]: Hàm phân thức (ax + b)/(x - m) chứa tham số m
  t12_b1_d33_rat11_param_tf: {
    id: 't12_b1_d33_rat11_param_tf',
    name: 'Dạng 33: Khảo sát hàm phân thức bậc 1/bậc 1 chứa tham số m: f(x) = (ax + b)/(x - m)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Đơn điệu — Phân thức chứa tham số m',
    description:
      'Cho hàm số f(x) = (ax + b)/(x - m) (a < 0) với m là tham số. Xét 4 mệnh đề về đạo hàm, cực trị, điều kiện đồng biến/nghịch biến trên khoảng xác định và trên (k; +∞).',
    conditionSummary: 'a <= -1, b != 0, kBound > floor(-b/a) để tồn tại các giá trị nguyên của m',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (âm)', min: -7, max: -1 },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'kBound', label: 'Đầu mút k trong (k; +∞)', min: 2, max: 9 },
    ],
    validateCode: `
      const { a, b, kBound } = params;
      if (a >= 0) return { valid: false, reason: 'Chọn a < 0 để hệ số m trong đạo hàm dương chuẩn' };
      if (b === 0) return { valid: false, reason: 'Chọn b != 0 để có phân thức tổng quát' };
      const threshold = -b / a;
      if (kBound <= Math.floor(threshold)) return { valid: false, reason: 'Cần kBound > floor(-b/a) để có ít nhất 1 nghiệm nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, kBound } = params;
      const numExpr = u.formatLinear(a, b);
      const p = -a; // > 0, so f'(x) = (p*m - b)/(x - m)^2
      const derivNumTrue = u.formatLinear(p, -b, 'm');
      const derivNumWrong = u.formatLinear(p, b, 'm');
      const m0 = u.simplifyFrac(b, p); // Note: b/p = -b/a
      const trueCount = kBound - Math.floor(m0.value);
      const wrongCount = trueCount + 5;

      const tfStatements = [
        {
          key: 'a',
          text: 'Hàm số có đạo hàm là $f\'(x) = \\dfrac{' + derivNumWrong + '}{(x - m)^2}$.',
          isTrue: false,
        },
        {
          key: 'b',
          text: 'Hàm số không có cực trị với mọi $m \\neq ' + m0.latex + '$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Với mọi $m > ' + m0.latex + '$ thì hàm số nghịch biến trên các khoảng xác định.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Số các giá trị nguyên của $m$ để hàm số đồng biến trên khoảng $(' + kBound + ';\\, +\\infty)$ là $' + wrongCount + '$.',
          isTrue: false,
        },
      ];

      return {
        stem: 'Cho hàm số $f(x) = \\dfrac{' + numExpr + '}{x - m}$ với $m$ là tham số. Xét tính đúng-sai của các khẳng định sau.',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Ta có $f\'(x) = \\dfrac{' + derivNumTrue + '}{(x - m)^2}$.',
          'b) Đúng. Với mọi $m \\neq ' + m0.latex + '$, đạo hàm $f\'(x)$ luôn giữ nguyên một dấu trên từng khoảng xác định nên hàm số không có cực trị.',
          'c) Sai. Khi $m > ' + m0.latex + '$ thì $' + derivNumTrue + ' > 0$, nên hàm số đồng biến trên các khoảng xác định.',
          'd) Sai. Hàm số đồng biến trên $(' + kBound + ';\\, +\\infty) \\Leftrightarrow ' + derivNumTrue + ' > 0$ và $m \\notin (' + kBound + ';\\, +\\infty) \\Leftrightarrow ' + m0.latex + ' < m \\le ' + kBound + '$. Có đúng $' + trueCount + '$ giá trị nguyên của $m$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (-5x - 3)/(x - m), k = 5', params: { a: -5, b: -3, kBound: 5 }, expectedValid: true },
      { label: 'Biên lỗi b = 0', params: { a: -4, b: 0, kBound: 5 }, expectedValid: false },
    ],
  },

  // Dạng 34 [TF - Vận dụng]: Bảng xét dấu f'(x) (3 nghiệm) — cực trị & đơn điệu hàm hợp y = f(ax + b)
  t12_b1_d34_bsd_composite_mono_tf: {
    id: 't12_b1_d34_bsd_composite_mono_tf',
    name: 'Dạng 34: Bảng xét dấu f\'(x) — tìm cực trị và khoảng đơn điệu hàm hợp y = f(ax + b)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Hàm hợp — Bảng xét dấu f\'(x)',
    description:
      'Cho bảng xét dấu f\'(x) với 3 nghiệm x1 < x2 < x3 (dấu -, 0, +, 0, -, 0, +). Xét tính đơn điệu và cực trị của f(x) và hàm hợp y = f(px + q) với p < 0.',
    conditionSummary: 'gap1 >= 1, gap2 >= 1, p <= -2',
    paramSpecs: [
      { name: 'x1', label: 'Nghiệm x1', min: -8, max: 0 },
      { name: 'gap1', label: 'Khoảng x2 - x1', min: 1, max: 4 },
      { name: 'gap2', label: 'Khoảng x3 - x2', min: 1, max: 4 },
      { name: 'p', label: 'Hệ số p âm trong f(px + q)', min: -4, max: -2 },
      { name: 'q', label: 'Hằng số q trong f(px + q)', min: -9, max: 5 },
    ],
    validateCode: `
      const { gap1, gap2, p } = params;
      if (gap1 < 1 || gap2 < 1) return { valid: false, reason: 'Cần x1 < x2 < x3 phân biệt' };
      if (p > -2) return { valid: false, reason: 'Chọn p <= -2 để hàm hợp đổi chiều biến thiên rõ ràng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, gap1, gap2, p, q } = params;
      const x2 = x1 + gap1;
      const x3 = x2 + gap2;
      const innerExpr = u.formatLinear(p, q);
      // Since p < 0: roots of p*x + q = x_i satisfy r1 < r2 < r3 where r1 = (x3-q)/p, r2 = (x2-q)/p, r3 = (x1-q)/p
      const r1 = u.simplifyFrac(x3 - q, p);
      const r2 = u.simplifyFrac(x2 - q, p);
      const r3 = u.simplifyFrac(x1 - q, p);

      let wrongFrac = u.simplifyFrac(Math.abs(q) + 2, Math.abs(p) + 3);
      let guard = 1;
      while (
        Math.abs(wrongFrac.value - r1.value) < 1e-6 ||
        Math.abs(wrongFrac.value - r2.value) < 1e-6 ||
        Math.abs(wrongFrac.value - r3.value) < 1e-6
      ) {
        guard++;
        wrongFrac = u.simplifyFrac(Math.abs(q) + 2 + guard, Math.abs(p) + 3);
      }

      const tfStatements = [
        { key: 'a', text: 'Hàm số đồng biến trên khoảng $(' + x1 + ';\\, +\\infty)$.', isTrue: false },
        { key: 'b', text: 'Điểm cực tiểu của hàm số đã cho là $x = ' + x1 + '$.', isTrue: true },
        {
          key: 'c',
          text: 'Hàm số $y = f(' + innerExpr + ')$ đạt cực trị tại điểm $x = ' + wrongFrac.latex + '$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Hàm số $y = f(' + innerExpr + ')$ đồng biến trên khoảng $(' + r3.latex + ';\\, +\\infty)$.',
          isTrue: true,
        },
      ];

      return {
        stem: 'Cho hàm số $y = f(x)$ xác định trên $\\mathbb{R}$ và có bảng xét dấu của $f\'(x)$ như hình vẽ. Xét tính đúng sai của các khẳng định sau?',
        diagram: {
          kind: 'variation_table',
          derivLabel: "f'(x)",
          xNodes: ['-\\infty', '' + x1, '' + x2, '' + x3, '+\\infty'],
          derivTokens: [
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '-' },
            { type: 'node', kind: '0' },
            { type: 'sign', value: '+' },
          ],
        },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai. Hàm số $y = f(x)$ đồng biến trên $(' + x1 + ';\\, ' + x2 + ')$ và $(' + x3 + ';\\, +\\infty)$.',
          'b) Đúng. Tại $x = ' + x1 + '$, $f\'(x)$ đổi dấu từ $-$ sang $+$ nên đây là điểm cực tiểu.',
          'c) Sai. $[f(' + innerExpr + ')]\' = ' + p + 'f\'(' + innerExpr + ') = 0 \\Leftrightarrow ' + innerExpr + ' \\in \\{' + x1 + ';\\, ' + x2 + ';\\, ' + x3 + '\\} \\Leftrightarrow x \\in \\{' + r1.latex + ';\\, ' + r2.latex + ';\\, ' + r3.latex + '\\}$.',
          'd) Đúng. Vì hệ số $' + p + ' < 0$, $y\' > 0 \\Leftrightarrow f\'(' + innerExpr + ') < 0 \\Leftrightarrow ' + innerExpr + ' < ' + x1 + '$ hoặc $' + x2 + ' < ' + innerExpr + ' < ' + x3 + ' \\Leftrightarrow x > ' + r3.latex + '$ hoặc $' + r1.latex + ' < x < ' + r2.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (-5, -3, -1; y = f(-2x - 7))',
        params: { x1: -5, gap1: 2, gap2: 2, p: -2, q: -7 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi p = -1',
        params: { x1: -5, gap1: 2, gap2: 2, p: -1, q: -7 },
        expectedValid: false,
      },
    ],
  },

  // =========================================================================
  // PHẦN III: TRẢ LỜI NGẮN (SA: Dạng 35 - Dạng 44)
  // =========================================================================

  // Dạng 35 [SA - Vận dụng]: Đếm giá trị nguyên m ∈ (-L; L) để f(x) = (ax+b)/(m-cx) đơn điệu trên từng khoảng xác định
  t12_b1_d35_rat11_param_allR_sa: {
    id: 't12_b1_d35_rat11_param_allR_sa',
    name: 'Dạng 35: Đếm giá trị nguyên của m để hàm (ax+b)/(m-cx) đồng biến/nghịch biến trên từng khoảng xác định',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đơn điệu — Phân thức chứa tham số m',
    description:
      'Cho f(x) = (ax + b)/(m - cx). Tìm số giá trị nguyên của tham số m ∈ (-L; L) để hàm số đồng biến (hoặc nghịch biến) trên từng khoảng xác định.',
    conditionSummary: 'a >= 1, c >= 1, b != 0, L >= 30',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 5 },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6, allowZero: false },
      { name: 'c', label: 'Hệ số c ở mẫu (m - cx)', min: 1, max: 4 },
      { name: 'L', label: 'Biên khoảng (-L; L)', min: 30, max: 80, step: 10 },
      { name: 'mode', label: 'Chiều (1: đồng biến, 0: nghịch biến)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, c, L, mode } = params;
      if (a <= 0 || c <= 0) return { valid: false, reason: 'Cần a > 0 và c > 0' };
      if (b === 0) return { valid: false, reason: 'Cần b != 0' };
      if (L < 30) return { valid: false, reason: 'Khoảng (-L; L) phải đủ rộng (L >= 30)' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, L, mode } = params;
      // f(x) = (ax + b)/(m - cx) -> f'(x) = (a(m-cx) - (ax+b)(-c))/(m-cx)^2 = (a*m + b*c)/(m-cx)^2
      const numExpr = u.formatLinear(a, b);
      const denExpr = 'm - ' + (c === 1 ? 'x' : c + 'x');
      const derivNum = u.formatLinear(a, b * c, 'm');
      const m0 = u.simplifyFrac(-b * c, a);
      const isInc = mode === 1;
      const askWord = isInc ? 'đồng biến' : 'nghịch biến';

      let minM = -L + 1;
      let maxM = L - 1;
      if (isInc) {
        minM = Math.max(-L + 1, Math.floor(m0.value) + 1);
      } else {
        maxM = Math.min(L - 1, Math.ceil(m0.value) - 1);
      }
      const count = Math.max(0, maxM - minM + 1);

      return {
        stem:
          'Cho hàm số $f(x) = \\dfrac{' +
          numExpr +
          '}{' +
          denExpr +
          '}$ với $m$ là tham số. Tìm số giá trị nguyên của $m$ thuộc khoảng $(- ' +
          L +
          ';\\, ' +
          L +
          ')$ để hàm số ' +
          askWord +
          ' trên các khoảng xác định.',
        shortAnswer: '' + count,
        numericValue: count,
        answerSummary: '' + count,
        solutionSteps: [
          'Tập xác định: $D = \\mathbb{R} \\setminus \\left\\{\\dfrac{m}{' + c + '}\\right\\}$.',
          'Đạo hàm: $f\'(x) = \\dfrac{' + derivNum + '}{(' + denExpr + ')^2}$.',
          'Hàm số ' + askWord + ' trên từng khoảng xác định $\\Leftrightarrow ' + derivNum + ' ' + (isInc ? '> 0' : '< 0') + ' \\Leftrightarrow m ' + (isInc ? '> ' : '< ') + m0.latex + '$.',
          'Kết hợp $m \\in \\mathbb{Z} \\cap (-' + L + ';\\, ' + L + ')$ ta có $' + minM + ' \\le m \\le ' + maxM + '$, gồm $' + count + '$ giá trị nguyên.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (2x - 4)/(m - 3x), (-60; 60)',
        params: { a: 2, b: -4, c: 3, L: 60, mode: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi b = 0',
        params: { a: 2, b: 0, c: 3, L: 60, mode: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 36 [SA - Vận dụng]: Đếm giá trị nguyên m ∈ (-L; L) để (ax+b)/(x-m) đơn điệu trên (-∞; k) hoặc (k; +∞)
  t12_b1_d36_rat11_param_interval_sa: {
    id: 't12_b1_d36_rat11_param_interval_sa',
    name: 'Dạng 36: Đếm giá trị nguyên của m để hàm (ax+b)/(x-m) đơn điệu trên khoảng (-∞; k) hoặc (k; +∞)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đơn điệu — Tham số trên khoảng cho trước',
    description:
      'Cho f(x) = (ax + b)/(x - m) (a < 0). Tìm số giá trị nguyên của m ∈ (-L; L) để hàm số đồng biến hoặc nghịch biến trên khoảng (-∞; k) hoặc (k; +∞).',
    conditionSummary: 'a <= -1, b != 0, giao khoảng nghiệm với (-L; L) khác rỗng',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (âm)', min: -5, max: -1 },
      { name: 'b', label: 'Hệ số b', min: -8, max: 8, allowZero: false },
      { name: 'k', label: 'Đầu mút khoảng k', min: -25, max: 25 },
      { name: 'L', label: 'Biên khoảng (-L; L)', min: 60, max: 120, step: 10 },
      { name: 'side', label: 'Khoảng (0: (-∞; k), 1: (k; +∞))', min: 0, max: 1 },
      { name: 'dir', label: 'Chiều (0: nghịch biến, 1: đồng biến)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, b, k, L, side, dir } = params;
      if (a >= 0) return { valid: false, reason: 'Chọn a < 0' };
      if (b === 0) return { valid: false, reason: 'Chọn b != 0' };
      if (L < 40) return { valid: false, reason: 'L phải >= 40' };
      const p = -a;
      const thresh = b / p;
      const loDeriv = dir === 1 ? Math.floor(thresh) + 1 : -L + 1;
      const hiDeriv = dir === 1 ? L - 1 : Math.ceil(thresh) - 1;
      const loSide = side === 0 ? k : -L + 1;
      const hiSide = side === 0 ? L - 1 : k;
      const lo = Math.max(loDeriv, loSide);
      const hi = Math.min(hiDeriv, hiSide);
      if (lo > hi) return { valid: false, reason: 'Tập giá trị m rỗng với bộ k, side, dir này' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, k, L, side, dir } = params;
      const p = -a; // > 0, f'(x) = (p*m - b)/(x - m)^2
      const numExpr = u.formatLinear(a, b);
      const derivNum = u.formatLinear(p, -b, 'm');
      const m0 = u.simplifyFrac(b, p);
      const isInc = dir === 1;
      const askWord = isInc ? 'đồng biến' : 'nghịch biến';
      const intervalStr = side === 0 ? '(-\\infty;\\, ' + k + ')' : '(' + k + ';\\, +\\infty)';

      const loDeriv = isInc ? Math.floor(m0.value) + 1 : -L + 1;
      const hiDeriv = isInc ? L - 1 : Math.ceil(m0.value) - 1;
      const loSide = side === 0 ? k : -L + 1;
      const hiSide = side === 0 ? L - 1 : k;
      const lo = Math.max(loDeriv, loSide);
      const hi = Math.min(hiDeriv, hiSide);
      const count = hi - lo + 1;

      const condDerivLatex = isInc ? derivNum + ' > 0' : derivNum + ' < 0';
      const solDerivLatex = isInc ? 'm > ' + m0.latex : 'm < ' + m0.latex;
      const solDomainLatex = side === 0 ? 'm \\ge ' + k : 'm \\le ' + k;

      return {
        stem:
          'Cho hàm số $f(x) = \\dfrac{' +
          numExpr +
          '}{x - m}$ với $m$ là tham số. Tìm số giá trị nguyên của $m$ thuộc khoảng $(- ' +
          L +
          ';\\, ' +
          L +
          ')$ để hàm số ' +
          askWord +
          ' trên khoảng $' +
          intervalStr +
          '$.',
        shortAnswer: '' + count,
        numericValue: count,
        answerSummary: '' + count,
        solutionSteps: [
          'Tập xác định: $D = \\mathbb{R} \\setminus \\{m\\}$. Đạo hàm: $f\'(x) = \\dfrac{' + derivNum + '}{(x - m)^2}$.',
          'Hàm số ' + askWord + ' trên $' + intervalStr + '$ khi và chỉ khi $' + condDerivLatex + '$ và $m \\notin ' + intervalStr + '$.',
          'Giải hệ điều kiện ta được $' + solDerivLatex + '$ và $' + solDomainLatex + '$, suy ra $' + lo + ' \\le m \\le ' + hi + '$ (với $m \\in \\mathbb{Z} \\cap (-' + L + ';\\, ' + L + ')$).',
          'Số các giá trị nguyên thỏa mãn là $' + count + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (-x - 5)/(x - m), (-infty; -19)',
        params: { a: -1, b: -5, k: -19, L: 110, side: 0, dir: 0 },
        expectedValid: true,
      },
      {
        label: 'Biên tập nghiệm rỗng',
        params: { a: -1, b: -10, k: 5, L: 60, side: 0, dir: 0 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 37 [SA - Vận dụng]: Ngưỡng tham số m <= a để y = -x^3 + 3kx^2 + (m + p)x + q nghịch biến trên (c; +∞)
  t12_b1_d37_cubic_param_interval_sa: {
    id: 't12_b1_d37_cubic_param_interval_sa',
    name: 'Dạng 37: Tìm ngưỡng tham số m để hàm bậc ba nghịch biến trên khoảng (c; +∞)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đơn điệu — Cô lập tham số m trên khoảng',
    description:
      'Biết rằng với m <= a thì hàm số y = -x^3 + 3kx^2 + (m + p)x + q nghịch biến trên khoảng (c; +∞). Tìm a.',
    conditionSummary: 'k > c để đỉnh parabol g(x) = 3x^2 - 6kx nằm trong (c; +∞)',
    paramSpecs: [
      { name: 'k', label: 'Tham số định tâm k (hệ số x^2 là 3k)', min: 1, max: 5 },
      { name: 'p', label: 'Độ lệch p trong (m + p)x', min: -5, max: 5 },
      { name: 'q', label: 'Hằng số tự do q', min: -6, max: 6 },
      { name: 'c', label: 'Đầu mút c trong (c; +∞)', min: -6, max: 2 },
    ],
    validateCode: `
      const { k, c } = params;
      if (k <= c) return { valid: false, reason: 'Cần k > c để cực tiểu của 3x^2 - 6kx nằm trong khoảng (c; +∞)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, p, q, c } = params;
      const b2 = 3 * k;
      const cubicPrefix = u.formatPoly([-1, b2, 0, 0]).replace(/\+ 0x\^\{2\}|\+ 0x/g, '');
      const paramCoeff = p === 0 ? 'mx' : '(' + u.formatLinear(1, p, 'm') + ')x';
      const funcExpr = cubicPrefix + ' + ' + paramCoeff + u.formatTrailingConst(q);
      const derivPrefix = u.formatPoly([-3, 6 * k, 0]);
      const derivExpr = derivPrefix + ' + ' + (p === 0 ? 'm' : u.formatLinear(1, p, 'm'));
      const gExpr = u.formatQuadratic(3, -6 * k, 0);
      const gDeriv = u.formatLinear(6, -6 * k);
      const minG = -3 * k * k;
      const ans = minG - p;

      return {
        stem:
          'Biết rằng với $m \\le a$ thì hàm số $y = ' +
          funcExpr +
          '$ nghịch biến trên khoảng $(' +
          c +
          ';\\, +\\infty)$. Tìm $a$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: 'a = ' + ans,
        solutionSteps: [
          'Đặt $K = (' + c + ';\\, +\\infty)$. Ta có $y\' = ' + derivExpr + '$.',
          'Hàm số nghịch biến trên $K \\Leftrightarrow y\' \\le 0,\\, \\forall x \\in K \\Leftrightarrow ' + (p === 0 ? 'm' : u.formatLinear(1, p, 'm')) + ' \\le ' + gExpr + ',\\, \\forall x \\in K$.',
          'Xét $g(x) = ' + gExpr + '$ trên $K = (' + c + ';\\, +\\infty)$ có $g\'(x) = ' + gDeriv + ' = 0 \\Leftrightarrow x = ' + k + ' \\in K$.',
          'Suy ra $\\min_{x \\in K} g(x) = g(' + k + ') = ' + minG + '$. Do đó $' + (p === 0 ? 'm' : u.formatLinear(1, p, 'm')) + ' \\le ' + minG + ' \\Leftrightarrow m \\le ' + ans + '$. Vậy $a = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (-x^3 + 3x^2 + (m+2)x + 3 trên (-3; +infty))',
        params: { k: 1, p: 2, q: 3, c: -3 },
        expectedValid: true,
      },
      {
        label: 'Biên p = 0',
        params: { k: 2, p: 0, q: -1, c: 0 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi k <= c',
        params: { k: 1, p: 2, q: 3, c: 2 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 38 [SA - Hiểu]: Tính P = u*x1 + v*x2 với x1 là điểm CT, x2 là điểm CĐ của hàm bậc ba
  t12_b1_d38_cubic_extrema_x_sa: {
    id: 't12_b1_d38_cubic_extrema_x_sa',
    name: 'Dạng 38: Tính P = u.x₁ + v.x₂ với x₁, x₂ là điểm cực tiểu, cực đại của hàm bậc ba',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Cực trị hàm bậc ba',
    description:
      'Cho hàm số y = ax^3 + bx^2 + cx + d đạt cực tiểu tại x1 và cực đại tại x2. Tính biểu thức P = u.x1 + v.x2.',
    conditionSummary: 'a ∈ {-1, 1}, xA < xB, xA + xB chẵn, u != 0, v != 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'xA', label: 'Điểm cực trị thứ nhất', min: -5, max: 2 },
      { name: 'xB', label: 'Điểm cực trị thứ hai', min: -3, max: 5 },
      { name: 'd', label: 'Hệ số tự do d', min: -5, max: 5 },
      { name: 'uCoef', label: 'Hệ số u của x1', min: -3, max: 4, allowZero: false },
      { name: 'vCoef', label: 'Hệ số v của x2', min: -3, max: 4, allowZero: false },
    ],
    validateCode: `
      const { a, xA, xB, uCoef, vCoef } = params;
      if (a !== 1 && a !== -1) return { valid: false, reason: 'a phải là -1 hoặc 1' };
      if (xA >= xB) return { valid: false, reason: 'Cần xA < xB' };
      if ((xA + xB) % 2 !== 0) return { valid: false, reason: 'Cần xA + xB chẵn để hệ số nguyên' };
      if (uCoef === 0 || vCoef === 0) return { valid: false, reason: 'u và v phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, xA, xB, d, uCoef, vCoef } = params;
      const b = (-3 * a * (xA + xB)) / 2;
      const c = 3 * a * xA * xB;
      const poly = u.formatPoly([a, b, c, d]);
      const deriv = u.formatQuadratic(3 * a, 2 * b, c);
      const x1 = a > 0 ? xB : xA; // CT
      const x2 = a > 0 ? xA : xB; // CD
      const pExpr = u.formatTerm(uCoef, 'x_1', true) + u.formatTerm(vCoef, 'x_2', false);
      const ans = uCoef * x1 + vCoef * x2;

      return {
        stem:
          'Cho hàm số $y = f(x) = ' +
          poly +
          '$ đạt cực tiểu tại điểm $x = x_1$ và đạt cực đại tại điểm $x = x_2$. Tính $P = ' +
          pExpr +
          '$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: 'P = ' + ans,
        solutionSteps: [
          'Ta có $f\'(x) = ' + deriv + '$.',
          'Giải $f\'(x) = 0 \\Leftrightarrow x = ' + xA + '$ hoặc $x = ' + xB + '$.',
          'Lập bảng biến thiên (với hệ số bậc ba $a = ' + a + '$), hàm số đạt cực tiểu tại $x_1 = ' + x1 + '$ và đạt cực đại tại $x_2 = ' + x2 + '$.',
          'Vậy $P = ' + pExpr + ' = ' + uCoef + '\\cdot(' + x1 + ') ' + (vCoef >= 0 ? '+ ' + vCoef : '- ' + Math.abs(vCoef)) + '\\cdot(' + x2 + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x^3 - 3x^2 + 2, P = x1 - x2)',
        params: { a: 1, xA: 0, xB: 2, d: 2, uCoef: 1, vCoef: -1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi xA + xB lẻ',
        params: { a: 1, xA: 0, xB: 1, d: 2, uCoef: 1, vCoef: -1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 39 [SA - Vận dụng]: Tính P = u*y1 + v*y2 theo GTCT y1, GTCĐ y2 của hàm bậc ba (hệ số bán nguyên)
  t12_b1_d39_cubic_extrema_y_sa: {
    id: 't12_b1_d39_cubic_extrema_y_sa',
    name: 'Dạng 39: Tính P = u.y₁ + v.y₂ theo giá trị cực tiểu y₁ và cực đại y₂ của hàm bậc ba',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hàm bậc ba — Giá trị cực trị',
    description:
      'Cho hàm số y = x^3 + (b/2)x^2 + cx + d có giá trị cực tiểu y1 và cực đại y2 (b lẻ). Tính P = u.y1 + v.y2 (làm tròn đến hàng phần mười).',
    conditionSummary: 'xA < xB và xA + xB lẻ để b/2 là phân số tối giản',
    paramSpecs: [
      { name: 'xA', label: 'Điểm cực đại xA', min: -5, max: 3 },
      { name: 'xB', label: 'Điểm cực tiểu xB', min: -4, max: 5 },
      { name: 'd', label: 'Hệ số tự do d', min: -5, max: 5 },
      { name: 'uCoef', label: 'Hệ số u của y1', min: -4, max: 4, allowZero: false },
      { name: 'vCoef', label: 'Hệ số v của y2', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { xA, xB, uCoef, vCoef } = params;
      if (xA >= xB) return { valid: false, reason: 'Cần xA < xB' };
      if ((xA + xB) % 2 === 0) return { valid: false, reason: 'Chọn xA + xB lẻ để xuất hiện phân số b/2 tối giản' };
      if (uCoef === 0 || vCoef === 0) return { valid: false, reason: 'u và v phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, xB, d, uCoef, vCoef } = params;
      const bNum = -3 * (xA + xB); // odd integer
      const c = 3 * xA * xB;
      const x1 = xB; // CT (since a = 1 > 0)
      const x2 = xA; // CD
      const y1Twice = 2 * Math.pow(x1, 3) + bNum * Math.pow(x1, 2) + 2 * c * x1 + 2 * d;
      const y2Twice = 2 * Math.pow(x2, 3) + bNum * Math.pow(x2, 2) + 2 * c * x2 + 2 * d;
      const y1Frac = u.simplifyFrac(y1Twice, 2);
      const y2Frac = u.simplifyFrac(y2Twice, 2);
      const pFrac = u.simplifyFrac(uCoef * y1Twice + vCoef * y2Twice, 2);
      const ansRounded = Number(pFrac.value.toFixed(1));
      const ansStr = u.formatNumberVN(ansRounded, 1);

      const bSignTerm = bNum > 0 ? ' + \\frac{' + bNum + ' x^2}{2}' : ' - \\frac{' + Math.abs(bNum) + ' x^2}{2}';
      const cxPart = u.formatTerm(c, 'x', false);
      const dPart = u.formatTrailingConst(d);
      const funcExpr = 'x^3' + bSignTerm + cxPart + dPart;
      const deriv = u.formatQuadratic(3, bNum, c);
      const pExpr = u.formatTerm(uCoef, 'y_1', true) + u.formatTerm(vCoef, 'y_2', false);

      return {
        stem:
          'Cho hàm số $y = f(x) = ' +
          funcExpr +
          '$ có giá trị cực tiểu bằng $y_1$ và giá trị cực đại bằng $y_2$. Tính $P = ' +
          pExpr +
          '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ansRounded,
        answerSummary: 'P = ' + ansStr,
        solutionSteps: [
          'Ta có $f\'(x) = ' + deriv + ' = 0 \\Leftrightarrow x = ' + xA + '$ hoặc $x = ' + xB + '$.',
          'Hàm số đạt cực tiểu tại $x_1 = ' + x1 + '$ và đạt cực đại tại $x_2 = ' + x2 + '$.',
          'Tính giá trị cực trị: $y_1 = f(' + x1 + ') = ' + y1Frac.latex + '$, $y_2 = f(' + x2 + ') = ' + y2Frac.latex + '$.',
          'Khi đó $P = ' + pExpr + ' = ' + pFrac.latex + ' = ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (xA = -4, xB = -3, d = 1, P = -3y1 + y2)',
        params: { xA: -4, xB: -3, d: 1, uCoef: -3, vCoef: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi xA + xB chẵn',
        params: { xA: -4, xB: -2, d: 1, uCoef: -3, vCoef: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 40 [SA - Hiểu]: Tính P = u*x1 + v*x2 với x1 là điểm CT, x2 là điểm CĐ của hàm phân thức bậc 2/bậc 1
  t12_b1_d40_rat21_extrema_x_sa: {
    id: 't12_b1_d40_rat21_extrema_x_sa',
    name: 'Dạng 40: Tính P = u.x₁ + v.x₂ theo điểm cực tiểu x₁ và cực đại x₂ của hàm (sx² + bx + c)/(x - x0)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Cực trị hàm phân thức bậc 2/bậc 1',
    description:
      'Cho hàm số y = (s*x^2 + b*x + c)/(x - x0) có điểm cực tiểu x1 và cực đại x2. Tính P = u.x1 + v.x2.',
    conditionSummary: 's ∈ {-1, 1}, k >= 1, u != 0, v != 0',
    paramSpecs: [
      { name: 's', label: 'Dấu s (-1 hoặc 1)', min: -1, max: 1, step: 2, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -20, max: 20 },
      { name: 'b', label: 'Hệ số b của tử thức', min: -25, max: 25 },
      { name: 'k', label: 'Bán kính cực trị k', min: 1, max: 5 },
      { name: 'uCoef', label: 'Hệ số u', min: -4, max: 4, allowZero: false },
      { name: 'vCoef', label: 'Hệ số v', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { s, k, uCoef, vCoef } = params;
      if (s !== 1 && s !== -1) return { valid: false, reason: 's phải là -1 hoặc 1' };
      if (k < 1) return { valid: false, reason: 'k phải >= 1' };
      if (uCoef === 0 || vCoef === 0) return { valid: false, reason: 'u và v phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s, x0, b, k, uCoef, vCoef } = params;
      const c = -b * x0 - s * (x0 * x0 - k * k);
      const xA = x0 - k;
      const xB = x0 + k;
      const x1 = s > 0 ? xB : xA; // CT
      const x2 = s > 0 ? xA : xB; // CD
      const numExpr = u.formatQuadratic(s, b, c);
      const denExpr = u.formatShift('x', -x0);
      const derivInner = u.formatQuadratic(1, -2 * x0, x0 * x0 - k * k);
      const derivSign = s < 0 ? '-' : '';
      const pExpr = u.formatTerm(uCoef, 'x_1', true) + u.formatTerm(vCoef, 'x_2', false);
      const ans = uCoef * x1 + vCoef * x2;

      return {
        stem:
          'Cho hàm số $y = f(x) = \\dfrac{' +
          numExpr +
          '}{' +
          denExpr +
          '}$ có điểm cực tiểu $x = x_1$ và điểm cực đại bằng $x = x_2$. Tính $P = ' +
          pExpr +
          '$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: 'P = ' + ans,
        solutionSteps: [
          'Ta có $f\'(x) = ' + derivSign + '\\dfrac{' + derivInner + '}{(' + denExpr + ')^2}$.',
          'Giải $f\'(x) = 0 \\Leftrightarrow x = ' + xA + '$ hoặc $x = ' + xB + '$.',
          'Lập bảng biến thiên, hàm số đạt cực tiểu tại $x_1 = ' + x1 + '$ và đạt cực đại tại $x_2 = ' + x2 + '$.',
          'Vậy $P = ' + pExpr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (-x^2 - 19x - 1)/(x + 19)',
        params: { s: -1, x0: -19, b: -19, k: 1, uCoef: -3, vCoef: -2 },
        expectedValid: true,
      },
      {
        label: 'Biên x0 = 0 (mẫu là x)',
        params: { s: 1, x0: 0, b: 2, k: 3, uCoef: 2, vCoef: 1 },
        expectedValid: true,
      },
    ],
  },

  // Dạng 41 [SA - Vận dụng]: Tính P = u*y1 + v*y2 theo GTCT y1, GTCĐ y2 của hàm phân thức bậc 2/bậc 1
  t12_b1_d41_rat21_extrema_y_sa: {
    id: 't12_b1_d41_rat21_extrema_y_sa',
    name: 'Dạng 41: Tính P = u.y₁ + v.y₂ theo giá trị cực tiểu y₁ và cực đại y₂ của hàm phân thức bậc 2/bậc 1',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hàm phân thức — Giá trị cực trị',
    description:
      'Cho hàm số y = (s*x^2 + b*x + c)/(x - x0) có GTCT y1 và GTCĐ y2. Tính P = u.y1 + v.y2.',
    conditionSummary: 's ∈ {-3..3}\\{0}, k >= 1, u != 0, v != 0',
    paramSpecs: [
      { name: 's', label: 'Hệ số bậc hai s', min: -3, max: 3, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -18, max: 18 },
      { name: 'b', label: 'Hệ số b của tử thức', min: -36, max: 36 },
      { name: 'k', label: 'Bán kính cực trị k', min: 1, max: 5 },
      { name: 'uCoef', label: 'Hệ số u của y1', min: -4, max: 4, allowZero: false },
      { name: 'vCoef', label: 'Hệ số v của y2', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { s, k, uCoef, vCoef } = params;
      if (s === 0) return { valid: false, reason: 's = 0 suy biến thành hàm nhất biến không có cực trị' };
      if (k < 1) return { valid: false, reason: 'k phải >= 1' };
      if (uCoef === 0 || vCoef === 0) return { valid: false, reason: 'u và v phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s, x0, b, k, uCoef, vCoef } = params;
      const c = -b * x0 - s * (x0 * x0 - k * k);
      const xA = x0 - k;
      const xB = x0 + k;
      const x1 = s > 0 ? xB : xA; // CT
      const x2 = s > 0 ? xA : xB; // CD
      // At critical points, N/D = N'/D' = 2sx + b
      const y1 = 2 * s * x1 + b;
      const y2 = 2 * s * x2 + b;
      const ans = uCoef * y1 + vCoef * y2;

      const numExpr = u.formatQuadratic(s, b, c);
      const denExpr = u.formatShift('x', -x0);
      const derivNum = u.formatQuadratic(s, -2 * s * x0, s * (x0 * x0 - k * k));
      const pExpr = u.formatTerm(uCoef, 'y_1', true) + u.formatTerm(vCoef, 'y_2', false);

      return {
        stem:
          'Cho hàm số $y = f(x) = \\dfrac{' +
          numExpr +
          '}{' +
          denExpr +
          '}$ có giá trị cực tiểu bằng $y_1$ và giá trị cực đại bằng $y_2$. Tính $P = ' +
          pExpr +
          '$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: 'P = ' + ans,
        solutionSteps: [
          'Ta có $f\'(x) = \\dfrac{' + derivNum + '}{(' + denExpr + ')^2} = 0 \\Leftrightarrow x = ' + xA + '$ hoặc $x = ' + xB + '$.',
          'Hàm số đạt cực tiểu tại $x_1 = ' + x1 + '$ với $y_1 = f(' + x1 + ') = ' + y1 + '$ và đạt cực đại tại $x_2 = ' + x2 + '$ với $y_2 = f(' + x2 + ') = ' + y2 + '$.',
          'Vậy $P = ' + pExpr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (2x^2 - 34x + 18)/(x - 17)',
        params: { s: 2, x0: 17, b: -34, k: 3, uCoef: -2, vCoef: 1 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi s = 0',
        params: { s: 0, x0: 5, b: 3, k: 2, uCoef: 1, vCoef: 1 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 42 [SA - Vận dụng]: Đường thẳng qua 2 điểm cực trị A, B của đồ thị hàm bậc ba
  t12_b1_d42_cubic_line_extrema_sa: {
    id: 't12_b1_d42_cubic_line_extrema_sa',
    name: 'Dạng 42: Đường thẳng đi qua hai điểm cực trị A, B của đồ thị hàm bậc ba',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng qua hai điểm cực trị — Hàm bậc ba',
    description:
      'Đồ thị hàm số y = x^3 + (b/2)x^2 + cx + d có 2 cực trị A, B. Đường thẳng AB có phương trình y = ax + b. Tính u.a + v.b.',
    conditionSummary: 'x1 < x2, x1 + x2 lẻ để b/2 tối giản, u != 0, v != 0',
    paramSpecs: [
      { name: 'x1', label: 'Điểm cực trị x1', min: -3, max: 5 },
      { name: 'x2', label: 'Điểm cực trị x2', min: -2, max: 6 },
      { name: 'd', label: 'Hệ số tự do d', min: -5, max: 5 },
      { name: 'uCoef', label: 'Hệ số u của a', min: -4, max: 4, allowZero: false },
      { name: 'vCoef', label: 'Hệ số v của b', min: -5, max: 5, allowZero: false },
    ],
    validateCode: `
      const { x1, x2, uCoef, vCoef } = params;
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2' };
      if ((x1 + x2) % 2 === 0) return { valid: false, reason: 'Chọn x1 + x2 lẻ để hệ số b/2 là phân số tối giản' };
      if (uCoef === 0 || vCoef === 0) return { valid: false, reason: 'u và v phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, x2, d, uCoef, vCoef } = params;
      const bNum = -3 * (x1 + x2); // odd
      const c = 3 * x1 * x2;
      const y1Twice = 2 * Math.pow(x1, 3) + bNum * Math.pow(x1, 2) + 2 * c * x1 + 2 * d;
      const y2Twice = 2 * Math.pow(x2, 3) + bNum * Math.pow(x2, 2) + 2 * c * x2 + 2 * d;
      const y1Frac = u.simplifyFrac(y1Twice, 2);
      const y2Frac = u.simplifyFrac(y2Twice, 2);

      // Slope aLine = (y2 - y1)/(x2 - x1)
      const aLine = u.simplifyFrac(y2Twice - y1Twice, 2 * (x2 - x1));
      // bLine = y1 - aLine * x1 = (y1Twice * aLine.den - 2 * aLine.num * x1) / (2 * aLine.den)
      const bLine = u.simplifyFrac(y1Twice * aLine.den - 2 * aLine.num * x1, 2 * aLine.den);
      const ansFrac = u.simplifyFrac(uCoef * aLine.num * bLine.den + vCoef * bLine.num * aLine.den, aLine.den * bLine.den);
      const ansRounded = Number(ansFrac.value.toFixed(1));
      const ansStr = u.formatNumberVN(ansRounded, 1);

      const bSignTerm = bNum > 0 ? ' + \\frac{' + bNum + ' x^2}{2}' : ' - \\frac{' + Math.abs(bNum) + ' x^2}{2}';
      const funcExpr = 'x^3' + bSignTerm + u.formatTerm(c, 'x', false) + u.formatTrailingConst(d);
      const deriv = u.formatQuadratic(3, bNum, c);
      const targetExpr = u.formatTerm(uCoef, 'a', true) + u.formatTerm(vCoef, 'b', false);

      return {
        stem:
          'Đồ thị hàm số $y = f(x) = ' +
          funcExpr +
          '$ có các điểm cực trị là $A, B$. Đường thẳng đi qua $A$ và $B$ có phương trình $y = ax + b$. Tính $' +
          targetExpr +
          '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ansRounded,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $f\'(x) = ' + deriv + ' = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Tọa độ hai điểm cực trị là $A(' + x1 + ';\\, ' + y1Frac.latex + ')$ và $B(' + x2 + ';\\, ' + y2Frac.latex + ')$.',
          'Hệ số góc đường thẳng $AB$: $a = \\dfrac{' + y2Frac.latex + ' - (' + y1Frac.latex + ')}{' + x2 + ' - (' + x1 + ')} = ' + aLine.latex + '$.',
          'Phương trình đường thẳng $AB$: $y = ' + aLine.latex + 'x' + (bLine.value >= 0 ? ' + ' + bLine.latex : ' - ' + u.simplifyFrac(-bLine.num, bLine.den).latex) + '$, suy ra $b = ' + bLine.latex + '$. Vậy $' + targetExpr + ' = ' + ansFrac.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (x1 = 4, x2 = 5, d = 2, -2a - 4b)',
        params: { x1: 4, x2: 5, d: 2, uCoef: -2, vCoef: -4 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi x1 + x2 chẵn',
        params: { x1: 2, x2: 4, d: 2, uCoef: -2, vCoef: -4 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 43 [SA - Vận dụng]: Đường thẳng qua 2 điểm cực trị A, B của hàm phân thức bậc 2/bậc 1
  t12_b1_d43_rat21_line_extrema_sa: {
    id: 't12_b1_d43_rat21_line_extrema_sa',
    name: 'Dạng 43: Đường thẳng đi qua hai điểm cực trị A, B của đồ thị hàm phân thức bậc 2/bậc 1',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Đường thẳng qua hai điểm cực trị — Phân thức',
    description:
      'Đồ thị hàm số y = (sx^2 + bx + c)/(x - x0) có các điểm cực trị A, B. Đường thẳng AB có phương trình y = ax + b. Tính u.a + v.b.',
    conditionSummary: 's != 0, k >= 1, u != 0, v != 0',
    paramSpecs: [
      { name: 's', label: 'Hệ số bậc hai s', min: -3, max: 3, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -10, max: 12 },
      { name: 'b', label: 'Hệ số b của tử thức', min: -16, max: 16 },
      { name: 'k', label: 'Bán kính cực trị k', min: 1, max: 4 },
      { name: 'uCoef', label: 'Hệ số u của a', min: -4, max: 4, allowZero: false },
      { name: 'vCoef', label: 'Hệ số v của b', min: -4, max: 4, allowZero: false },
    ],
    validateCode: `
      const { s, k, uCoef, vCoef } = params;
      if (s === 0) return { valid: false, reason: 's phải khác 0' };
      if (k < 1) return { valid: false, reason: 'k phải >= 1' };
      if (uCoef === 0 || vCoef === 0) return { valid: false, reason: 'u và v phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s, x0, b, k, uCoef, vCoef } = params;
      const c = -b * x0 - s * (x0 * x0 - k * k);
      const x1 = x0 - k;
      const x2 = x0 + k;
      // Line through extrema of (sx^2+bx+c)/(x-x0) is always y = 2s*x + b
      const aLine = 2 * s;
      const bLine = b;
      const y1 = aLine * x1 + bLine;
      const y2 = aLine * x2 + bLine;
      const ans = uCoef * aLine + vCoef * bLine;

      const numExpr = u.formatQuadratic(s, b, c);
      const denExpr = u.formatShift('x', -x0);
      const derivNum = u.formatQuadratic(s, -2 * s * x0, s * (x0 * x0 - k * k));
      const lineEq = 'y = ' + u.formatLinear(aLine, bLine);
      const targetExpr = u.formatTerm(uCoef, 'a', true) + u.formatTerm(vCoef, 'b', false);

      return {
        stem:
          'Đồ thị hàm số $y = f(x) = \\dfrac{' +
          numExpr +
          '}{' +
          denExpr +
          '}$ có các điểm cực trị là $A, B$. Đường thẳng đi qua $A$ và $B$ có phương trình $y = ax + b$. Tính $' +
          targetExpr +
          '$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '' + ans,
        solutionSteps: [
          'Ta có $f\'(x) = \\dfrac{' + derivNum + '}{(' + denExpr + ')^2} = 0 \\Leftrightarrow x = ' + x1 + '$ hoặc $x = ' + x2 + '$.',
          'Tọa độ hai điểm cực trị là $A(' + x1 + ';\\, ' + y1 + ')$ và $B(' + x2 + ';\\, ' + y2 + ')$.',
          'Đường thẳng đi qua $A$ và $B$ có phương trình $' + lineEq + '$, suy ra $a = ' + aLine + ',\\, b = ' + bLine + '$.',
          'Vậy $' + targetExpr + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên theo đề gốc (-2x^2 + 14x - 2)/(x - 7)',
        params: { s: -2, x0: 7, b: 14, k: 1, uCoef: 3, vCoef: -2 },
        expectedValid: true,
      },
      {
        label: 'Biên lỗi s = 0',
        params: { s: 0, x0: 7, b: 14, k: 1, uCoef: 3, vCoef: -2 },
        expectedValid: false,
      },
    ],
  },

  // Dạng 44 [SA - Vận dụng]: Khoảng cách AB giữa 2 cực trị và OB từ cực tiểu đến gốc tọa độ O
  t12_b1_d44_rat21_dist_extrema_sa: {
    id: 't12_b1_d44_rat21_dist_extrema_sa',
    name: 'Dạng 44: Tính d² + d₁² với d = AB (hai cực trị) và d₁ = OB (từ điểm cực tiểu đến O)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực trị hàm phân thức — Khoảng cách hình học',
    description:
      'Cho hàm số y = (sx^2 + p)/(x - x0) có đồ thị (C). Gọi d là khoảng cách giữa hai điểm cực trị và d1 là khoảng cách từ điểm cực tiểu đến gốc tọa độ O. Tính d^2 + d1^2.',
    conditionSummary: 's != 0, k >= 1, k != |x0| để tử thức có dạng sx^2 + p với p != 0',
    paramSpecs: [
      { name: 's', label: 'Hệ số bậc hai s', min: -3, max: 3, allowZero: false },
      { name: 'x0', label: 'Tiệm cận đứng x0', min: -4, max: 4 },
      { name: 'k', label: 'Bán kính cực trị k', min: 1, max: 4 },
    ],
    validateCode: `
      const { s, x0, k } = params;
      if (s === 0) return { valid: false, reason: 's phải khác 0' };
      if (k < 1) return { valid: false, reason: 'k phải >= 1' };
      if (k === Math.abs(x0)) return { valid: false, reason: 'Chọn k != |x0| để p != 0 đúng dạng sx^2 + p' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { s, x0, k } = params;
      const p = s * (k * k - x0 * x0);
      const xA = x0 - k;
      const xB = x0 + k;
      const yA = 2 * s * xA;
      const yB = 2 * s * xB;
      // Local min is xB if s > 0, else xA if s < 0
      const xMin = s > 0 ? xB : xA;
      const yMin = s > 0 ? yB : yA;
      const dSq = (xB - xA) * (xB - xA) + (yB - yA) * (yB - yA);
      const d1Sq = xMin * xMin + yMin * yMin;
      const ans = dSq + d1Sq;

      const numExpr = u.formatQuadratic(s, 0, p);
      const denExpr = u.formatShift('x', -x0);
      const derivNum = u.formatQuadratic(s, -2 * s * x0, -p);

      return {
        stem:
          'Cho hàm số $y = \\dfrac{' +
          numExpr +
          '}{' +
          denExpr +
          '}$ có đồ thị $(C)$. Gọi $d$ là khoảng cách giữa hai điểm cực trị của $(C)$ và $d_1$ là khoảng cách từ điểm cực tiểu của $(C)$ đến gốc tọa độ. Giá trị của $d^2 + d_1^2$ bằng bao nhiêu?',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: '' + ans,
        solutionSteps: [
          'Ta có $y\' = \\dfrac{' + derivNum + '}{(' + denExpr + ')^2} = 0 \\Leftrightarrow x = ' + xA + '$ hoặc $x = ' + xB + '$.',
          'Hai điểm cực trị của $(C)$ là $(' + xA + ';\\, ' + yA + ')$ và $(' + xB + ';\\, ' + yB + ')$, trong đó điểm cực tiểu là $B(' + xMin + ';\\, ' + yMin + ')$.',
          'Bình phương khoảng cách giữa hai cực trị: $d^2 = (' + xB + ' - (' + xA + '))^2 + (' + yB + ' - (' + yA + '))^2 = ' + dSq + '$.',
          'Bình phương khoảng cách từ điểm cực tiểu đến gốc $O$: $d_1^2 = (' + xMin + ')^2 + (' + yMin + ')^2 = ' + d1Sq + '$. Suy ra $d^2 + d_1^2 = ' + dSq + ' + ' + d1Sq + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên theo đề gốc (2x^2 + 6)/(x - 1)', params: { s: 2, x0: 1, k: 2 }, expectedValid: true },
      { label: 'Biên s âm, x0 = 0', params: { s: -1, x0: 0, k: 2 }, expectedValid: true },
      { label: 'Biên lỗi k = |x0|', params: { s: 2, x0: 2, k: 2 }, expectedValid: false },
    ],
  },
};
