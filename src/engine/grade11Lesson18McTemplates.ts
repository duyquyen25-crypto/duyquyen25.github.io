import { MathTemplate } from '../types/math';

export const G11_B18_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Khẳng định đúng về ảnh hai đường thẳng song song qua phép chiếu song song
  t11_b18_d01_proj_prop_correct_mc: {
    id: 't11_b18_d01_proj_prop_correct_mc',
    name: 'Nhận biết khẳng định đúng về ảnh hai đường thẳng song song qua phép chiếu song song',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Nhận biết tính chất của phép chiếu song song (biến hai đường thẳng song song thành song song hoặc trùng nhau).',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể khẳng định đúng (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song bảo toàn hình dạng của một hình',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song (không trùng phương chiếu) là hai đường thẳng song song hoặc trùng nhau.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song bảo toàn số đo mọi góc',
            'Phép chiếu song song biến hai đường thẳng vuông góc thành hai đường thẳng vuông góc',
          ],
          sol: 'Qua phép chiếu song song, ba điểm thẳng hàng biến thành ba điểm thẳng hàng và thứ tự của chúng được bảo toàn.',
        },
        {
          correct: 'Phép chiếu song song biến ba đường thẳng đồng quy (nằm trong mặt phẳng không song song phương chiếu) thành ba đường thẳng đồng quy',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn chu vi tam giác',
            'Phép chiếu song song biến đường tròn thành một điểm',
            'Phép chiếu song song biến mọi hình bình hành thành hình chữ nhật',
          ],
          sol: 'Ba đường thẳng đồng quy qua phép chiếu song song (không đồng phẳng với phương chiếu) vẫn cho ảnh là ba đường thẳng đồng quy.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (hai đường thẳng song song)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Khẳng định sai về phép chiếu song song biến đường tròn thành một điểm
  t11_b18_d02_proj_prop_wrong_mc: {
    id: 't11_b18_d02_proj_prop_wrong_mc',
    name: 'Nhận biết khẳng định sai về ảnh đường tròn qua phép chiếu song song',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Phân biệt khẳng định sai trong các tính chất của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề sai (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const TRUE_STMTS = [
        'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
        'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
        'Phép chiếu song song biến ba đường thẳng đồng quy (trong mặt phẳng cắt phương chiếu) thành ba đường thẳng đồng quy',
      ];
      const FALSE_STMTS = [
        {
          stmt: 'Phép chiếu song song có thể biến đường tròn thành một điểm',
          sol: 'Hình chiếu song song của đường tròn là đường tròn/elip hoặc suy biến thành một đoạn thẳng (khi mặt phẳng chứa đường tròn song song phương chiếu), không thể là một điểm.',
        },
        {
          stmt: 'Phép chiếu song song luôn bảo toàn độ dài của đoạn thẳng',
          sol: 'Phép chiếu song song không bảo toàn độ dài đoạn thẳng.',
        },
        {
          stmt: 'Phép chiếu song song luôn bảo toàn góc giữa hai đường thẳng',
          sol: 'Phép chiếu song song không bảo toàn số đo góc.',
        },
      ];
      const f = FALSE_STMTS[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(f.stmt, TRUE_STMTS, rng);
      return {
        stem: 'Khẳng định nào sau đây **sai**?',
        options,
        correctIndex,
        answerSummary: f.stmt + ' (sai)',
        solutionSteps: [f.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = -1', params: { mode: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (đường tròn thành một điểm)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của hình vuông là hình bình hành
  t11_b18_d03_proj_square_parallelogram_mc: {
    id: 't11_b18_d03_proj_square_parallelogram_mc',
    name: 'Hình chiếu song song của hình vuông và các tứ giác đặc biệt (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Nhận biết ảnh của hình vuông là hình bình hành qua phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể (0: hình vuông, 1: hình thoi, 2: hình chữ nhật)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hình vuông là một hình bình hành (khi mặt phẳng chứa nó không song song phương chiếu)',
          wrongs: [
            'Hình chiếu song song của một đoạn thẳng luôn là một đoạn thẳng',
            'Hình chiếu song song của tam giác đều thành một tam giác đều',
            'Hình chiếu song song của hình thoi luôn cho một hình thoi',
          ],
          sol: 'Vì phép chiếu song song bảo toàn tính song song nên hình vuông chiếu xuống thành hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình thoi là một hình bình hành (khi mặt phẳng chứa nó không song song phương chiếu)',
          wrongs: [
            'Hình chiếu song song của hình thoi luôn là một hình thoi',
            'Hình chiếu song song của tam giác vuông luôn là tam giác vuông',
            'Hình chiếu song song của một đường thẳng luôn là một đường thẳng',
          ],
          sol: 'Các cặp cạnh đối song song được bảo toàn qua phép chiếu song song nên ảnh của hình thoi là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình chữ nhật là một hình bình hành (khi mặt phẳng chứa nó không song song phương chiếu)',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn là hình chữ nhật',
            'Hình chiếu song song của hình vuông luôn có hai cạnh kề bằng nhau',
            'Hình chiếu song song của tam giác cân luôn là tam giác cân',
          ],
          sol: 'Hình chữ nhật có các cặp cạnh đối song song nên ảnh qua phép chiếu song song là hình bình hành.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3 (hình vuông -> hình bình hành)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Chiếu đỉnh lăng trụ ABC.DEF lên mặt bên (ACFD) theo phương BC
  t11_b18_d04_prism_proj_lateral_mc: {
    id: 't11_b18_d04_prism_proj_lateral_mc',
    name: 'Hình chiếu song song của đỉnh lăng trụ ABC.DEF lên mặt bên theo cạnh đáy',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Tìm hình chiếu song song của đỉnh tầng trên lên mặt bên đối diện theo phương cạnh đáy.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Cấu hình chiếu lên mặt bên (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, vIdx } = params;
      if (setIdx < 0 || setIdx > 2 || vIdx < 0 || vIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, vIdx } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ['D', 'E', 'F'] },
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"] },
        { b: ['M', 'N', 'P'], t: ['M_1', 'N_1', 'P_1'] },
      ];
      const s = SETS[setIdx];
      // vIdx = 0 -> Q4 gốc: E lên (ACFD) theo phương BC -> F
      const CASES = [
        { src: s.t[1], img: s.t[2], face: s.b[0] + s.b[2] + s.t[2] + s.t[0], dir: s.b[1] + s.b[2], w1: s.b[0], w2: s.b[2], w3: s.t[0] },
        { src: s.t[0], img: s.t[1], face: s.b[1] + s.b[2] + s.t[2] + s.t[1], dir: s.b[0] + s.b[1], w1: s.b[0], w2: s.b[1], w3: s.t[2] },
        { src: s.t[2], img: s.t[0], face: s.b[0] + s.b[1] + s.t[1] + s.t[0], dir: s.b[2] + s.b[0], w1: s.b[2], w2: s.b[0], w3: s.t[1] },
      ];
      const c = CASES[vIdx];
      const correct = 'Điểm $' + c.img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + c.w1 + '$', 'Điểm $' + c.w2 + '$', 'Điểm $' + c.w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + c.src + '$ lên mặt phẳng $(' + c.face + ')$ theo phương $' + c.dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.b[0], vF: s.b[1], vR: s.b[2], tL: s.t[0], tF: s.t[1], tR: s.t[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + c.src + c.img + ' \\parallel ' + c.dir + '$ và $' + c.img + ' \\in (' + c.face + ')$ nên hình chiếu là điểm $' + c.img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { setIdx: 0, vIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (E lên (ACFD) theo BC -> F)', params: { setIdx: 0, vIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu đỉnh lăng trụ ABC.DEF lên đáy (ABC) theo phương FC
  t11_b18_d05_prism_proj_base_mc: {
    id: 't11_b18_d05_prism_proj_base_mc',
    name: 'Hình chiếu song song của đỉnh lăng trụ ABC.DEF lên mặt đáy theo phương cạnh bên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Tìm hình chiếu song song của đỉnh tầng trên lên mặt đáy (ABC) theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh được chiếu (0: D, 1: E, 2: F)', min: 0, max: 2 },
    ],
    validateCode: `
      const { setIdx, vIdx } = params;
      if (setIdx < 0 || setIdx > 2 || vIdx < 0 || vIdx > 2) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, vIdx } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ['D', 'E', 'F'] },
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"] },
        { b: ['P', 'Q', 'R'], t: ['S', 'T', 'U'] },
      ];
      const s = SETS[setIdx];
      const src = s.t[vIdx];
      const img = s.b[vIdx];
      const dirIdx = (vIdx + 1) % 3;
      const dir = s.t[dirIdx] + s.b[dirIdx];
      const base = s.b.join('');

      const w1 = s.t[(vIdx + 1) % 3];
      const w2 = s.b[(vIdx + 2) % 3];
      const w3 = s.t[vIdx];

      const correct = 'Điểm $' + img + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['Điểm $' + w1 + '$', 'Điểm $' + w2 + '$', 'Điểm $' + w3 + '$'],
        rng
      );
      return {
        stem: 'Cho hình lăng trụ $' + base + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + src + '$ lên mặt phẳng $(' + base + ')$ theo phương $' + dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.b[0], vF: s.b[1], vR: s.b[2], tL: s.t[0], tF: s.t[1], tR: s.t[2] },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Do $' + src + img + ' \\parallel ' + dir + '$ và $' + img + ' \\in (' + base + ')$ nên hình chiếu là điểm $' + img + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên setIdx = 3', params: { setIdx: 3, vIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (E lên (ABC) theo FC -> B)', params: { setIdx: 0, vIdx: 1 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Nhận biết tính chất đúng của lũy thừa với số mũ thực
  t11_b18_d06_exp_identity_mc: {
    id: 't11_b18_d06_exp_identity_mc',
    name: 'Nhận biết công thức tính chất của luỹ thừa với số mũ thực',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Nhận diện đúng các đẳng thức về luỹ thừa với số mũ thực a^α · a^γ, (a^α)^γ, (ab)^α.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Tính chất kiểm tra (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          vars: 'a, b, \\alpha, \\gamma',
          cond: 'a > 0, b > 0',
          correct: '$(a^{\\alpha})^{\\gamma} = a^{\\alpha \\gamma}$',
          wrongs: [
            '$a^{\\alpha - \\gamma} = a^{\\alpha} - a^{\\gamma}$',
            '$a^{\\alpha + \\gamma} = a^{\\alpha} + a^{\\gamma}$',
            '$(ab)^{\\alpha} = a^{b^{\\alpha}}$',
          ],
          sol: 'Theo tính chất luỹ thừa với số mũ thực: $(a^{\\alpha})^{\\gamma} = a^{\\alpha \\gamma}$ với $a > 0$.',
        },
        {
          vars: 'a, b, \\alpha, \\beta',
          cond: 'a > 0, b > 0',
          correct: '$a^{\\alpha} \\cdot a^{\\beta} = a^{\\alpha + \\beta}$',
          wrongs: [
            '$a^{\\alpha} \\cdot a^{\\beta} = a^{\\alpha\\beta}$',
            '$\\left(\\dfrac{a}{b}\\right)^{\\alpha} = a^{\\alpha} - b^{\\alpha}$',
            '$\\dfrac{a^{\\alpha}}{a^{\\beta}} = a^{\\frac{\\alpha}{\\beta}}$',
          ],
          sol: 'Khi nhân hai luỹ thừa cùng cơ số dương ta giữ nguyên cơ số và cộng các số mũ: $a^{\\alpha} \\cdot a^{\\beta} = a^{\\alpha + \\beta}$.',
        },
        {
          vars: 'x, y, \\alpha, \\beta',
          cond: 'x > 0, y > 0',
          correct: '$(xy)^{\\alpha} = x^{\\alpha} \\cdot y^{\\alpha}$',
          wrongs: [
            '$(x + y)^{\\alpha} = x^{\\alpha} + y^{\\alpha}$',
            '$x^{\\alpha} + x^{\\beta} = x^{\\alpha + \\beta}$',
            '$(x^{\\alpha})^{\\beta} = x^{\\alpha + \\beta}$',
          ],
          sol: 'Luỹ thừa của một tích bằng tích các luỹ thừa: $(xy)^{\\alpha} = x^{\\alpha} \\cdot y^{\\alpha}$.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Cho các số thực $' + item.vars + '$ thỏa mãn $' + item.cond + '$. Tìm khẳng định đúng trong các khẳng định sau:',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 ((a^α)^γ = a^(αγ))', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Rút gọn tích hai lũy thừa cùng cơ số số mũ phân số
  t11_b18_d07_exp_mul_frac_mc: {
    id: 't11_b18_d07_exp_mul_frac_mc',
    name: 'Rút gọn biểu thức tích hai luỹ thừa số mũ hữu tỉ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Tính b^{p1/q1} · b^{p2/q2} với b > 0.',
    conditionSummary: 'p1 ∈ [2; 11], q1 ∈ {7, 11, 13, 19}, p2 ∈ [1; 7], q2 ∈ {5, 7, 13}, q1 ≠ q2',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến cơ số (0: b, 1: a, 2: x)', min: 0, max: 2 },
      { name: 'p1', label: 'Tử số mũ 1', min: 2, max: 11 },
      { name: 'q1Idx', label: 'Mẫu số mũ 1 (0..3)', min: 0, max: 3 },
      { name: 'p2', label: 'Tử số mũ 2', min: 1, max: 7 },
      { name: 'q2Idx', label: 'Mẫu số mũ 2 (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { vIdx, p1, q1Idx, p2, q2Idx } = params;
      if (vIdx < 0 || vIdx > 2 || q1Idx < 0 || q1Idx > 3 || q2Idx < 0 || q2Idx > 2) {
        return { valid: false, reason: 'Chỉ số ngoài miền' };
      }
      const Q1S = [19, 13, 11, 7];
      const Q2S = [13, 7, 5];
      const q1 = Q1S[q1Idx], q2 = Q2S[q2Idx];
      if (q1 === q2 || u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) return { valid: false, reason: 'Mẫu trùng hoặc phân số chưa tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, p1, q1Idx, p2, q2Idx } = params;
      const VARS = ['b', 'a', 'x'];
      const Q1S = [19, 13, 11, 7];
      const Q2S = [13, 7, 5];
      const v = VARS[vIdx], q1 = Q1S[q1Idx], q2 = Q2S[q2Idx];

      const f1 = u.simplifyFrac(p1, q1);
      const f2 = u.simplifyFrac(p2, q2);
      const ans = u.simplifyFrac(p1 * q2 + p2 * q1, q1 * q2);
      const w1 = u.simplifyFrac(Math.abs(p1 * q2 - p2 * q1) || 1, q1 * q2);
      const w2 = u.simplifyFrac(p1 * p2, q1 * q2);
      const w3 = u.simplifyFrac(p1 + p2, q1);

      const fmtPow = (f) => '$' + v + '^{' + f.latex + '}$';
      const correct = fmtPow(ans);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtPow(w1), fmtPow(w2), fmtPow(w3), fmtPow(u.simplifyFrac(p1 + p2, q1 + q2))],
        rng,
        (t) => fmtPow(u.simplifyFrac(ans.num + t, ans.den))
      );
      return {
        stem: 'Rút gọn biểu thức $P = ' + v + '^{' + f1.latex + '} \\cdot ' + v + '^{' + f2.latex + '}$ với $' + v + ' > 0$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$P = ' + v + '^{' + f1.latex + ' + ' + f2.latex + '} = ' + v + '^{' + ans.latex + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q1 = q2', params: { vIdx: 0, p1: 3, q1Idx: 1, p2: 5, q2Idx: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (b^(10/19) · b^(5/13) -> b^(225/247))', params: { vIdx: 0, p1: 10, q1Idx: 0, p2: 5, q2Idx: 0 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Rút gọn x^m · root[n](x^k)
  t11_b18_d08_pow_mul_root_mc: {
    id: 't11_b18_d08_pow_mul_root_mc',
    name: 'Biểu diễn biểu thức x^m · ⁿ√(x^k) dưới dạng luỹ thừa số mũ hữu tỉ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Đưa x^m · root[n](x^k) về dạng x^{(mn+k)/n}.',
    conditionSummary: 'm ∈ [2; 9], n ∈ [3; 7], k ∈ [1; n - 1], gcd(k, n) = 1',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến (0: x, 1: a, 2: b)', min: 0, max: 2 },
      { name: 'm', label: 'Số mũ nguyên m', min: 2, max: 9 },
      { name: 'n', label: 'Bậc căn n', min: 3, max: 7 },
      { name: 'k', label: 'Số mũ dưới căn k', min: 1, max: 5 },
    ],
    validateCode: `
      const { vIdx, m, n, k } = params;
      if (vIdx < 0 || vIdx > 2 || m < 2 || n < 3 || k < 1 || k >= n) return { valid: false, reason: 'Tham số ngoài miền' };
      if (u.gcd(k, n) !== 1) return { valid: false, reason: 'Cần gcd(k, n) = 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, m, n, k } = params;
      const v = ['x', 'a', 'b'][vIdx];
      const ans = u.simplifyFrac(m * n + k, n);
      const w1 = u.simplifyFrac(m * k + n, n);
      const w2 = u.simplifyFrac(m * n + k, 2 * n);
      const w3 = u.simplifyFrac(m * k + n, 2 * n);

      const fmtPow = (f) => '$' + v + '^{' + f.latex + '}$';
      const correct = fmtPow(ans);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtPow(w1), fmtPow(w2), fmtPow(w3)],
        rng,
        (t) => fmtPow(u.simplifyFrac(ans.num + t, ans.den))
      );
      const rootPart = k === 1 ? '\\sqrt[' + n + ']{' + v + '}' : '\\sqrt[' + n + ']{' + v + '^{' + k + '}}';
      return {
        stem: 'Cho số thực dương $' + v + ' > 0, ' + v + ' \\ne 1$ và biểu thức $P = ' + v + '^{' + m + '}' + rootPart + '$. Tìm khẳng định đúng.',
        options,
        correctIndex,
        answerSummary: '$P = ' + v + '^{' + ans.latex + '}$',
        solutionSteps: [
          '$P = ' + v + '^{' + m + '} \\cdot ' + v + '^{\\frac{' + k + '}{' + n + '}} = ' + v + '^{' + m + ' + \\frac{' + k + '}{' + n + '}} = ' + v + '^{' + ans.latex + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k >= n', params: { vIdx: 0, m: 7, n: 5, k: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (x^7 · ⁵√(x^2) -> x^(37/5))', params: { vIdx: 0, m: 7, n: 5, k: 2 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Rút gọn thương hai tích lũy thừa hữu tỉ (a^{p1/q1} · a^{p2/q2}) / a^{p3/q3}
  t11_b18_d09_exp_mul_div_frac_mc: {
    id: 't11_b18_d09_exp_mul_div_frac_mc',
    name: 'Rút gọn biểu thức tích và thương các luỹ thừa số mũ hữu tỉ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Tính (a^{p1/q1} · a^{p2/q2}) / a^{p3/q3} với a > 0.',
    conditionSummary: 'p1/q1 + p2/q2 - p3/q3 > 0, các phân số tối giản',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến cơ số (0: a, 1: b, 2: x)', min: 0, max: 2 },
      { name: 'p1', label: 'Tử số mũ 1', min: 3, max: 11 },
      { name: 'p2', label: 'Tử số mũ 2', min: 1, max: 5 },
      { name: 'p3', label: 'Tử số mũ ở mẫu', min: 1, max: 5 },
      { name: 'qIdx', label: 'Bộ mẫu số (q1, q2, q3) (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { vIdx, p1, p2, p3, qIdx } = params;
      if (vIdx < 0 || vIdx > 2 || qIdx < 0 || qIdx > 2) return { valid: false, reason: 'Chỉ số ngoài miền' };
      const QS = [[13, 6, 9], [11, 4, 6], [7, 6, 9]];
      const [q1, q2, q3] = QS[qIdx];
      if (u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1 || u.gcd(p3, q3) !== 1) {
        return { valid: false, reason: 'Phân số phải tối giản' };
      }
      const val = p1 / q1 + p2 / q2 - p3 / q3;
      if (val <= 0) return { valid: false, reason: 'Số mũ tổng hợp phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, p1, p2, p3, qIdx } = params;
      const v = ['a', 'b', 'x'][vIdx];
      const QS = [[13, 6, 9], [11, 4, 6], [7, 6, 9]];
      const [q1, q2, q3] = QS[qIdx];

      const L = u.lcm(u.lcm(q1, q2), q3);
      const t1 = p1 * (L / q1);
      const t2 = p2 * (L / q2);
      const t3 = p3 * (L / q3);

      const ans = u.simplifyFrac(t1 + t2 - t3, L);
      const w1 = u.simplifyFrac(t1 + t2 + t3, L);
      const w2 = u.simplifyFrac(Math.abs(t1 - t2 - t3) || 1, L);
      const w3 = u.simplifyFrac(Math.abs(t1 - t2 + t3) || 1, L);

      const f1 = u.simplifyFrac(p1, q1);
      const f2 = u.simplifyFrac(p2, q2);
      const f3 = u.simplifyFrac(p3, q3);

      const fmtPow = (f) => '$' + v + '^{' + f.latex + '}$';
      const correct = fmtPow(ans);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtPow(w1), fmtPow(w2), fmtPow(w3)],
        rng,
        (t) => fmtPow(u.simplifyFrac(ans.num + t, ans.den))
      );
      return {
        stem: 'Rút gọn biểu thức $P = \\dfrac{' + v + '^{' + f1.latex + '} \\cdot ' + v + '^{' + f2.latex + '}}{' + v + '^{' + f3.latex + '}}$ với $' + v + ' > 0$.',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$P = ' + v + '^{' + f1.latex + ' + ' + f2.latex + ' - ' + f3.latex + '} = ' + v + '^{' + ans.latex + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên qIdx = 3', params: { vIdx: 0, p1: 9, p2: 1, p3: 2, qIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9 (9/13 + 1/6 - 2/9 = 149/234)', params: { vIdx: 0, p1: 9, p2: 1, p3: 2, qIdx: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Đổi căn bậc n của y^m sang số mũ hữu tỉ
  t11_b18_d10_root_to_frac_exp_mc: {
    id: 't11_b18_d10_root_to_frac_exp_mc',
    name: 'Chuyển đổi căn bậc n của luỹ thừa sang dạng số mũ hữu tỉ',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Viết root[n](y^m) = y^{m/n} với y > 0.',
    conditionSummary: 'n ∈ [3; 8], m ∈ [5; 19], gcd(m, n) = 1, m > n',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến (0: y, 1: x, 2: a)', min: 0, max: 2 },
      { name: 'n', label: 'Bậc căn n', min: 3, max: 8 },
      { name: 'm', label: 'Số mũ trong căn m', min: 5, max: 19 },
    ],
    validateCode: `
      const { vIdx, n, m } = params;
      if (vIdx < 0 || vIdx > 2 || n < 3 || m <= n || u.gcd(m, n) !== 1) return { valid: false, reason: 'Tham số ngoài miền' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, n, m } = params;
      const v = ['y', 'x', 'a'][vIdx];
      const ans = u.simplifyFrac(m, n);
      const w1 = u.simplifyFrac(m * n, 1);
      const w2 = u.simplifyFrac(n, m);
      const w3 = u.simplifyFrac(m + n, 1);

      const fmtP = (f) => '$P = ' + v + '^{' + f.latex + '}$';
      const correct = fmtP(ans);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtP(w1), fmtP(w2), fmtP(w3)],
        rng
      );
      return {
        stem: 'Cho biểu thức $P = \\sqrt[' + n + ']{' + v + '^{' + m + '}}$ với $' + v + ' > 0$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức $\\sqrt[n]{' + v + '^m} = ' + v + '^{\\frac{m}{n}}$, ta có $P = \\sqrt[' + n + ']{' + v + '^{' + m + '}} = ' + v + '^{' + ans.latex + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m <= n', params: { vIdx: 0, n: 5, m: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10 (⁴√(y^17) -> y^(17/4))', params: { vIdx: 0, n: 4, m: 17 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Căn lồng hai lớp √[n1]{x^k · √[n2]{x^m}}
  t11_b18_d11_nested_two_roots_mc: {
    id: 't11_b18_d11_nested_two_roots_mc',
    name: 'Rút gọn biểu thức căn thức lồng hai lớp dưới dạng luỹ thừa',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Tính root[n1](x^k · root[n2](x^m)) = x^{(k*n2 + m)/(n1*n2)}.',
    conditionSummary: 'n1 ∈ [3; 6], n2 ∈ [2; 5], k ∈ [1; 4], m ∈ [1; 3], m < n2',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến (0: x, 1: a, 2: b)', min: 0, max: 2 },
      { name: 'n1', label: 'Bậc căn ngoài n1', min: 3, max: 6 },
      { name: 'k', label: 'Số mũ k ở lớp ngoài', min: 1, max: 4 },
      { name: 'n2', label: 'Bậc căn trong n2', min: 2, max: 5 },
      { name: 'm', label: 'Số mũ m trong căn trong', min: 1, max: 3 },
    ],
    validateCode: `
      const { vIdx, n1, k, n2, m } = params;
      if (vIdx < 0 || vIdx > 2 || n1 < 3 || k < 1 || n2 < 2 || m < 1 || m >= n2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, n1, k, n2, m } = params;
      const v = ['x', 'a', 'b'][vIdx];
      const innerExp = k * n2 + m;
      const ans = u.simplifyFrac(innerExp, n1 * n2);
      const w1 = u.simplifyFrac(innerExp + 18, n1 + n2 + 2);
      const w2 = u.simplifyFrac(innerExp + 4, n1 + n2);
      const w3 = u.simplifyFrac(k + m, n1 * n2);

      const powOuter = k === 1 ? v : v + '^{' + k + '}';
      const powInner = m === 1 ? v : v + '^{' + m + '}';
      const innerRoot = n2 === 2 ? '\\sqrt{' + powInner + '}' : '\\sqrt[' + n2 + ']{' + powInner + '}';
      const expr = '\\sqrt[' + n1 + ']{' + powOuter + ' \\cdot ' + innerRoot + '}';

      const fmtP = (f) => '$P = ' + v + '^{' + f.latex + '}$';
      const correct = fmtP(ans);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtP(w1), fmtP(w2), fmtP(w3)],
        rng,
        (t) => fmtP(u.simplifyFrac(ans.num + t, ans.den))
      );
      return {
        stem: 'Cho biểu thức $P = ' + expr + '$ với $' + v + ' > 0$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$P = ' + v + '^{\\left(' + k + ' + \\frac{' + m + '}{' + n2 + '}\\right) \\cdot \\frac{1}{' + n1 + '}} = ' + v + '^{' + ans.latex + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m >= n2', params: { vIdx: 0, n1: 4, k: 3, n2: 3, m: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11 (⁴√(x^3 · ⁴√x) -> x^(13/16))', params: { vIdx: 0, n1: 4, k: 3, n2: 4, m: 1 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Căn lồng ba lớp √[n1]{b^a1 · √[n2]{b^a2 · √[n3]{b^a3}}}
  t11_b18_d12_nested_three_roots_mc: {
    id: 't11_b18_d12_nested_three_roots_mc',
    name: 'Rút gọn biểu thức căn thức lồng ba lớp dưới dạng luỹ thừa',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Tính root[n1](b^a1 · root[n2](b^a2 · root[n3](b^a3))) với b > 0.',
    conditionSummary: 'n1 ∈ [4; 7], n2 ∈ [3; 5], n3 ∈ [2; 3], a1 ∈ [1; 2], a2 ∈ [1; 3], a3 ∈ [1; 3]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến (0: b, 1: a, 2: x)', min: 0, max: 2 },
      { name: 'n1', label: 'Bậc căn ngoài cùng n1', min: 4, max: 7 },
      { name: 'n2', label: 'Bậc căn giữa n2', min: 3, max: 5 },
      { name: 'n3', label: 'Bậc căn trong cùng n3', min: 2, max: 3 },
      { name: 'a1', label: 'Số mũ lớp ngoài a1', min: 1, max: 2 },
      { name: 'a2', label: 'Số mũ lớp giữa a2', min: 1, max: 3 },
      { name: 'a3', label: 'Số mũ trong cùng a3', min: 1, max: 3 },
    ],
    validateCode: `
      const { vIdx, n1, n2, n3, a1, a2, a3 } = params;
      if (vIdx < 0 || vIdx > 2 || n1 < 4 || n2 < 3 || n3 < 2 || a1 < 1 || a2 < 1 || a3 < 1) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, n1, n2, n3, a1, a2, a3 } = params;
      const v = ['b', 'a', 'x'][vIdx];
      const num = a1 * n2 * n3 + a2 * n3 + a3;
      const den = n1 * n2 * n3;
      const ans = u.simplifyFrac(num, den);
      const w1 = u.simplifyFrac(ans.num, ans.den + 8);
      const w2 = u.simplifyFrac(a1 + a2 + a3, n1 * n2 * n3);
      const w3 = u.simplifyFrac(num, 1);

      const p1 = a1 === 1 ? v : v + '^{' + a1 + '}';
      const p2 = a2 === 1 ? v : v + '^{' + a2 + '}';
      const p3 = a3 === 1 ? v : v + '^{' + a3 + '}';
      const r3 = n3 === 2 ? '\\sqrt{' + p3 + '}' : '\\sqrt[' + n3 + ']{' + p3 + '}';
      const expr = '\\sqrt[' + n1 + ']{' + p1 + ' \\cdot \\sqrt[' + n2 + ']{' + p2 + ' \\cdot ' + r3 + '}}';

      const fmtP = (f) => '$P = ' + v + '^{' + f.latex + '}$';
      const correct = fmtP(ans);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [fmtP(w1), fmtP(w2), fmtP(w3)],
        rng,
        (t) => fmtP(u.simplifyFrac(ans.num + t, ans.den))
      );
      return {
        stem: 'Cho biểu thức $P = ' + expr + '$ với $' + v + ' > 0$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          '$P = ' + v + '^{\\left(\\left(' + a2 + ' + \\frac{' + a3 + '}{' + n3 + '}\\right)\\frac{1}{' + n2 + '} + ' + a1 + '\\right)\\frac{1}{' + n1 + '}} = ' + v + '^{' + ans.latex + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n3 = 1', params: { vIdx: 0, n1: 6, n2: 4, n3: 1, a1: 1, a2: 2, a3: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (b^(5/16))', params: { vIdx: 0, n1: 6, n2: 4, n3: 2, a1: 1, a2: 2, a3: 3 }, expectedValid: true },
    ],
  },

  // D13 (Q13): Tìm bậc căn k trong biểu thức căn lồng ba lớp khi biết kết quả y^{p/q}
  t11_b18_d13_nested_roots_find_k_mc: {
    id: 't11_b18_d13_nested_roots_find_k_mc',
    name: 'Tìm bậc căn k trong biểu thức căn lồng ba lớp cho trước kết quả luỹ thừa',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Luỹ thừa với số mũ thực',
    description: 'Cho P = root[n1](y^a1 · root[n2](y^a2 · root[k](y^a3))) = y^{p/q}. Tìm số nguyên dương k.',
    conditionSummary: 'n1 ∈ [5; 8], n2 ∈ [4; 7], a1 = 1, a2 ∈ [2; 5], a3 ∈ [2; 4], k ∈ [3; 11]',
    paramSpecs: [
      { name: 'vIdx', label: 'Tên biến (0: y, 1: x, 2: a)', min: 0, max: 2 },
      { name: 'n1', label: 'Bậc căn ngoài n1', min: 5, max: 8 },
      { name: 'n2', label: 'Bậc căn giữa n2', min: 4, max: 7 },
      { name: 'a2', label: 'Số mũ lớp giữa a2', min: 2, max: 5 },
      { name: 'a3', label: 'Số mũ trong cùng a3', min: 2, max: 4 },
      { name: 'k', label: 'Bậc căn k cần tìm', min: 3, max: 11 },
    ],
    validateCode: `
      const { vIdx, n1, n2, a2, a3, k } = params;
      if (vIdx < 0 || vIdx > 2 || n1 < 5 || n2 < 4 || a2 < 2 || a3 < 2 || k < 3) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { vIdx, n1, n2, a2, a3, k } = params;
      const v = ['y', 'x', 'a'][vIdx];
      const num = 1 * n2 * k + a2 * k + a3;
      const den = n1 * n2 * k;
      const target = u.simplifyFrac(num, den);

      const expr = '\\sqrt[' + n1 + ']{' + v + ' \\cdot \\sqrt[' + n2 + ']{' + v + '^{' + a2 + '} \\cdot \\sqrt[k]{' + v + '^{' + a3 + '}}}}';
      const correct = '$k = ' + k + '$';
      const wrongs = [
        '$k = ' + (k + 5) + '$',
        '$k = ' + (k + 2) + '$',
        'Không tồn tại',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho biểu thức $P = ' + expr + '$ với $' + v + ' > 0$. Tìm $k$ để $P = ' + v + '^{' + target.latex + '}$.',
        options,
        correctIndex,
        answerSummary: '$k = ' + k + '$',
        solutionSteps: [
          'Ta có $P = ' + v + '^{\\left(\\left(' + a2 + ' + \\frac{' + a3 + '}{k}\\right)\\frac{1}{' + n2 + '} + 1\\right)\\frac{1}{' + n1 + '}}$.',
          'Cho số mũ bằng $' + target.latex + '$: $\\frac{1}{' + n1 + '}\\left(1 + \\frac{' + a2 + '}{' + n2 + '} + \\frac{' + a3 + '}{' + n2 + 'k}\\right) = ' + target.latex + ' \\Rightarrow k = ' + k + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 2', params: { vIdx: 0, n1: 7, n2: 6, a2: 5, a3: 3, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q13 (n1=7, n2=6, a2=5, a3=3, k=8 -> 13/48)', params: { vIdx: 0, n1: 7, n2: 6, a2: 5, a3: 3, k: 8 }, expectedValid: true },
    ],
  },
};
