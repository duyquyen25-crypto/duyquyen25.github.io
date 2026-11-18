import { MathTemplate } from '../types/math';

export const G11_B25_MC_PART1: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất phép chiếu song song (Khẳng định đúng)
  t11_b25_d01_proj_prop_correct_mc: {
    id: 't11_b25_d01_proj_prop_correct_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Nhận biết khẳng định đúng về tính chất bảo toàn của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Phép chiếu song song biến hai đường thẳng song song luôn thành hai đường thẳng song song',
            'Phép chiếu song song bảo toàn diện tích',
            'Phép chiếu song song bảo toàn hình dạng của một hình',
          ],
          sol: 'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau là khẳng định đúng.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và bảo toàn thứ tự của chúng',
          wrongs: [
            'Phép chiếu song song bảo toàn góc giữa hai đường thẳng',
            'Phép chiếu song song bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song có thể biến đường tròn thành một điểm',
          ],
          sol: 'Phép chiếu song song bảo toàn tính thẳng hàng và thứ tự của ba điểm thẳng hàng.',
        },
        {
          correct: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song',
          wrongs: [
            'Phép chiếu song song bảo toàn diện tích tam giác',
            'Phép chiếu song song luôn bảo toàn chu vi đa giác',
            'Phép chiếu song song biến hai đường thẳng chéo nhau thành hai đường thẳng chéo nhau',
          ],
          sol: 'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng hoặc trên hai đường thẳng song song.',
        },
        {
          correct: 'Phép chiếu song song biến trung điểm đoạn thẳng (không song song phương chiếu) thành trung điểm của hình chiếu',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song luôn biến hình chữ nhật thành hình chữ nhật',
            'Phép chiếu song song biến tam giác đều luôn thành tam giác đều',
          ],
          sol: 'Do bảo toàn thứ tự và tỉ số độ dài đoạn thẳng, phép chiếu song song bảo toàn trung điểm của đoạn thẳng.',
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
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Tính chất phép chiếu song song (Khẳng định sai)
  t11_b25_d02_proj_prop_wrong_mc: {
    id: 't11_b25_d02_proj_prop_wrong_mc',
    name: 'Tính chất phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Nhận biết khẳng định sai về tính chất của phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 3]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề sai (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song bảo toàn hình dạng của một hình',
          wrongs: [
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          ],
          sol: 'Phép chiếu song song nói chung không bảo toàn hình dạng và kích thước của một hình nên khẳng định đã cho sai.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn tính vuông góc',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Hình chiếu song song của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau',
          ],
          sol: 'Phép chiếu song song không bảo toàn góc nên không bảo toàn tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song có thể biến đường tròn thành một điểm',
          wrongs: [
            'Phép chiếu song song có thể biến đường tròn thành một đoạn thẳng',
            'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
            'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng trên cùng đường thẳng',
          ],
          sol: 'Hình chiếu song song của đường tròn là đường tròn, đường elip hoặc đoạn thẳng, không thể là một điểm.',
        },
        {
          correct: 'Phép chiếu song song bảo toàn diện tích của đa giác',
          wrongs: [
            'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
            'Phép chiếu song song có thể biến đường tròn thành đường elip',
            'Hình chiếu song song của hình bình hành (mặt phẳng không chứa phương chiếu) là một hình bình hành',
          ],
          sol: 'Phép chiếu song song nói chung làm thay đổi độ dài và diện tích của hình phẳng.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Khẳng định nào sau đây sai?',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = -1', params: { mode: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của hình vuông và các đa giác
  t11_b25_d03_proj_square_quad_mc: {
    id: 't11_b25_d03_proj_square_quad_mc',
    name: 'Hình chiếu song song của hình vuông và đa giác',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Nhận biết hình chiếu song song của hình vuông (khi mặt phẳng chứa hình vuông không song song phương chiếu) là hình bình hành.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể câu hỏi (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hình vuông (trên mặt phẳng không chứa phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình thang luôn là một hình chữ nhật',
            'Hình chiếu song song của hình vuông luôn là một hình vuông',
            'Hình chiếu song song của một đoạn thẳng luôn là một đoạn thẳng',
          ],
          sol: 'Vì phép chiếu song song bảo toàn tính song song của các cặp cạnh đối, hình chiếu của hình vuông (khi mặt phẳng hình vuông không song song phương chiếu) là một hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của hình chữ nhật (trên mặt phẳng không chứa phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn là một hình thoi',
            'Hình chiếu song song của một đường tròn có thể là một điểm',
            'Hình chiếu song song của tam giác đều luôn là một tam giác đều',
          ],
          sol: 'Các cặp cạnh đối song song của hình chữ nhật được bảo toàn qua phép chiếu song song nên hình chiếu là hình bình hành.',
        },
        {
          correct: 'Hình chiếu song song của một tam giác (trên mặt phẳng không chứa phương chiếu) là một tam giác',
          wrongs: [
            'Hình chiếu song song của tam giác vuông luôn là tam giác vuông',
            'Hình chiếu song song của hình thang luôn là hình thang cân',
            'Hình chiếu song song của hình vuông luôn là hình thoi',
          ],
          sol: 'Khi mặt phẳng chứa tam giác không song song với phương chiếu, hình chiếu của tam giác luôn là một tam giác.',
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
      { label: 'Mẫu chuẩn Q3', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Chiếu C lên (A_1B_1C_1) theo phương BB_1 trong lăng trụ ABC.A_1B_1C_1
  t11_b25_d04_prism_proj_c_bb1_mc: {
    id: 't11_b25_d04_prism_proj_c_bb1_mc',
    name: 'Hình chiếu song song đỉnh C lên mặt đáy trên (A₁B₁C₁) theo phương cạnh bên BB₁',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Tìm hình chiếu song song của đỉnh đáy dưới lên mặt đáy trên của lăng trụ theo phương cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 1], caseIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0: ABC.A₁B₁C₁, 1: ABC.A\'B\'C\')', min: 0, max: 1 },
      { name: 'caseIdx', label: 'Đỉnh chiếu (0: C, 1: B, 2: A)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 1 || params.caseIdx < 0 || params.caseIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, caseIdx } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1' },
        { A: 'A', B: 'B', C: 'C', A1: "A'", B1: "B'", C1: "C'" },
      ];
      const s = SETS[setIdx];
      const topPlane = s.A1 + s.B1 + s.C1;
      const CASES = [
        { pt: s.C, dir: s.B + s.B1, ans: s.C1, w1: s.B1, w2: s.A, w3: s.C },
        { pt: s.B, dir: s.A + s.A1, ans: s.B1, w1: s.A1, w2: s.C, w3: s.B },
        { pt: s.A, dir: s.C + s.C1, ans: s.A1, w1: s.C1, w2: s.B, w3: s.A },
      ];
      const item = CASES[caseIdx];
      const correct = 'Điểm $' + item.ans + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình lăng trụ $' + s.A + s.B + s.C + '.' + topPlane + '$. Hình chiếu song song của điểm $' + item.pt + '$ lên mặt phẳng $(' + topPlane + ')$ theo phương $' + item.dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + item.pt + item.ans + ' \\parallel ' + item.dir + '$ và $' + item.ans + ' \\in (' + topPlane + ')$ nên hình chiếu là điểm $' + item.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx = 3', params: { setIdx: 0, caseIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (C₁)', params: { setIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Chiếu C lên (A_1B_1C_1) theo phương AA_1 trong lăng trụ ABC.A_1B_1C_1
  t11_b25_d05_prism_proj_c_aa1_mc: {
    id: 't11_b25_d05_prism_proj_c_aa1_mc',
    name: 'Hình chiếu song song đỉnh C lên mặt đáy trên (A₁B₁C₁) theo phương AA₁',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Tìm hình chiếu song song của một đỉnh lên mặt đáy còn lại theo phương cạnh bên AA₁.',
    conditionSummary: 'setIdx ∈ [0; 1], caseIdx ∈ [0; 2]',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh (0: ABC.A₁B₁C₁, 1: MNP.M₁N₁P₁)', min: 0, max: 1 },
      { name: 'caseIdx', label: 'Đỉnh & mặt đáy (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.setIdx < 0 || params.setIdx > 1 || params.caseIdx < 0 || params.caseIdx > 2) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, caseIdx } = params;
      const SETS = [
        { A: 'A', B: 'B', C: 'C', A1: 'A_1', B1: 'B_1', C1: 'C_1' },
        { A: 'M', B: 'N', C: 'P', A1: 'M_1', B1: 'N_1', C1: 'P_1' },
      ];
      const s = SETS[setIdx];
      const bot = s.A + s.B + s.C;
      const top = s.A1 + s.B1 + s.C1;
      const CASES = [
        { pt: s.C, plane: top, dir: s.A + s.A1, ans: s.C1, w1: s.B, w2: s.B1, w3: s.A },
        { pt: s.C1, plane: bot, dir: s.A + s.A1, ans: s.C, w1: s.B1, w2: s.B, w3: s.A1 },
        { pt: s.B1, plane: bot, dir: s.C + s.C1, ans: s.B, w1: s.A, w2: s.C, w3: s.A1 },
      ];
      const item = CASES[caseIdx];
      const correct = 'Điểm $' + item.ans + '$';
      const wrongs = ['Điểm $' + item.w1 + '$', 'Điểm $' + item.w2 + '$', 'Điểm $' + item.w3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình lăng trụ $' + bot + '.' + top + '$. Hình chiếu song song của điểm $' + item.pt + '$ lên mặt phẳng $(' + item.plane + ')$ theo phương $' + item.dir + '$ là điểm nào?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b13_prism_3d',
          params: {},
          labels: { vL: s.A, vF: s.B, vR: s.C, tL: s.A1, tF: s.B1, tR: s.C1 },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + item.pt + item.ans + ' \\parallel ' + item.dir + '$ và $' + item.ans + ' \\in (' + item.plane + ')$ nên hình chiếu là điểm $' + item.ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên caseIdx = 3', params: { setIdx: 0, caseIdx: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (C₁)', params: { setIdx: 0, caseIdx: 0 }, expectedValid: true },
    ],
  },

  // D06 (Q6): Tính góc phẳng nhị diện [A, CD, S] trong chóp S.ABCD đáy vuông
  t11_b25_d06_dihedral_a_cd_s_square_mc: {
    id: 't11_b25_d06_dihedral_a_cd_s_square_mc',
    name: 'Tính góc phẳng nhị diện [A, CD, S] (Chóp đáy hình vuông)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy hình vuông cạnh u·a, SA ⊥ (ABCD), SA = √q·a, SD = √(u²+q)·a. Tính góc nhị diện [A, CD, S].',
    conditionSummary: 'u ∈ [1; 5], q ∈ [2; 12]',
    paramSpecs: [
      { name: 'u', label: 'Hệ số cạnh đáy AB = u·a', min: 1, max: 5 },
      { name: 'q', label: 'Biểu thức đường cao SA = √q·a', min: 2, max: 12 },
    ],
    validateCode: `
      const { u: edge, q } = params;
      if (edge < 1 || edge > 5 || q < 2 || q > 12) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      const p = edge * edge + q;
      const deg = Math.asin(Math.sqrt(q / p)) * 180 / Math.PI;
      const frac = (deg * 100) - Math.floor(deg * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, q } = params;
      const p = edge * edge + q;
      const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) { out *= k; rem /= k * k; }
        }
        return { out, rem };
      };
      const fmtRad = (r) => r.rem === 1 ? String(r.out) : (r.out === 1 ? '' : String(r.out)) + '\\sqrt{' + r.rem + '}';

      const rSA = rad(q);
      const rSD = rad(p);
      const rProd = rad(q * p);
      const g = gcd(rProd.out, p);
      const sN = rProd.out / g, sD = p / g;
      const sinTex = rProd.rem === 1
        ? '\\dfrac{' + sN + '}{' + sD + '}'
        : '\\dfrac{' + (sN === 1 ? '' : String(sN)) + '\\sqrt{' + rProd.rem + '}}{' + sD + '}';

      const deg = Math.round((Math.asin(Math.sqrt(q / p)) * 180 / Math.PI) * 100) / 100;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const candidates = [
        Math.round((deg + 10.60) * 100) / 100,
        Math.round((deg + 15.70) * 100) / 100,
        Math.round((deg + 4.10) * 100) / 100,
        Math.max(5, Math.round((deg - 6.30) * 100) / 100),
      ].map((v) => (v >= 89.5 ? Math.max(4, Math.round((deg - 5.40) * 100) / 100) : v));
      const seen = new Set([fmt2(deg)]);
      const wrongs = [];
      for (const c of candidates) {
        const s = fmt2(c);
        if (!seen.has(s) && wrongs.length < 3) {
          seen.add(s);
          wrongs.push('$' + s + '^\\circ$');
        }
      }

      const correct = '$' + fmt2(deg) + '^\\circ$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      const abTex = edge === 1 ? 'a' : edge + 'a';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $SA \\perp (ABCD)$, $AB = ' + abTex + '$, $SD = ' + fmtRad(rSD) + 'a$, $SA = ' + fmtRad(rSA) + 'a$. Tính số đo góc phẳng nhị diện $[A, CD, S]$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $AD \\perp CD$ và $CD \\perp SA \\Rightarrow CD \\perp SD$. Do đó $[A, CD, S] = \\widehat{SDA}$.',
          '$\\sin \\widehat{SDA} = \\dfrac{SA}{SD} = \\dfrac{' + fmtRad(rSA) + 'a}{' + fmtRad(rSD) + 'a} = ' + sinTex + ' \\Rightarrow \\widehat{SDA} \\approx ' + fmt2(deg) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = 0', params: { u: 0, q: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6 (40,89°)', params: { u: 2, q: 3 }, expectedValid: true },
    ],
  },

  // D07 (Q7): Tính góc phẳng nhị diện [A, CD, S] trong chóp S.ABCD đáy chữ nhật
  t11_b25_d07_dihedral_a_cd_s_rect_mc: {
    id: 't11_b25_d07_dihedral_a_cd_s_rect_mc',
    name: 'Tính góc phẳng nhị diện [A, CD, S] (Chóp đáy hình chữ nhật)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy hình chữ nhật, SA ⊥ (ABCD), AB = u·a, SD = √(d²+q)·a, SA = √q·a. Tính [A, CD, S].',
    conditionSummary: 'u ∈ [2; 6], d ∈ [3; 9] (d ≠ u), q ∈ [2; 9]',
    paramSpecs: [
      { name: 'u', label: 'Cạnh AB = u·a', min: 2, max: 6 },
      { name: 'd', label: 'Cạnh AD ẩn = d·a', min: 3, max: 9 },
      { name: 'q', label: 'Biểu thức đường cao SA = √q·a', min: 2, max: 9 },
    ],
    validateCode: `
      const { u: edge, d, q } = params;
      if (edge < 2 || edge > 6 || d < 3 || d > 9 || q < 2 || q > 9) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (edge === d) return { valid: false, reason: 'Cạnh hình chữ nhật AB phải khác AD' };
      const p = d * d + q;
      const deg = Math.asin(Math.sqrt(q / p)) * 180 / Math.PI;
      const frac = (deg * 100) - Math.floor(deg * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: edge, d, q } = params;
      const p = d * d + q;
      const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) { out *= k; rem /= k * k; }
        }
        return { out, rem };
      };
      const fmtRad = (r) => r.rem === 1 ? String(r.out) : (r.out === 1 ? '' : String(r.out)) + '\\sqrt{' + r.rem + '}';

      const rSA = rad(q);
      const rSD = rad(p);
      const rProd = rad(q * p);
      const g = gcd(rProd.out, p);
      const sN = rProd.out / g, sD = p / g;
      const sinTex = rProd.rem === 1
        ? '\\dfrac{' + sN + '}{' + sD + '}'
        : '\\dfrac{' + (sN === 1 ? '' : String(sN)) + '\\sqrt{' + rProd.rem + '}}{' + sD + '}';

      const deg = Math.round((Math.asin(Math.sqrt(q / p)) * 180 / Math.PI) * 100) / 100;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const candidates = [
        Math.round((deg + 1.20) * 100) / 100,
        Math.round((deg + 16.80) * 100) / 100,
        Math.round((deg + 12.10) * 100) / 100,
        Math.max(3, Math.round((deg - 4.10) * 100) / 100),
      ].map((v) => (v >= 89.5 ? Math.max(3, Math.round((deg - 7.50) * 100) / 100) : v));
      const seen = new Set([fmt2(deg)]);
      const wrongs = [];
      for (const c of candidates) {
        const s = fmt2(c);
        if (!seen.has(s) && wrongs.length < 3) {
          seen.add(s);
          wrongs.push('$' + s + '^\\circ$');
        }
      }

      const correct = '$' + fmt2(deg) + '^\\circ$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$, $AB = ' + edge + 'a$, $SD = ' + fmtRad(rSD) + 'a$, $SA = ' + fmtRad(rSA) + 'a$. Tính số đo góc phẳng nhị diện $[A, CD, S]$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $AD \\perp CD$ và $CD \\perp SA \\Rightarrow CD \\perp SD$. Do đó $[A, CD, S] = \\widehat{SDA}$.',
          '$\\sin \\widehat{SDA} = \\dfrac{SA}{SD} = \\dfrac{' + fmtRad(rSA) + 'a}{' + fmtRad(rSD) + 'a} = ' + sinTex + ' \\Rightarrow \\widehat{SDA} \\approx ' + fmt2(deg) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên AB = AD (d=4, u=4)', params: { u: 4, d: 4, q: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7 (12,22°)', params: { u: 4, d: 8, q: 3 }, expectedValid: true },
    ],
  },

  // D08 (Q8): Tính góc phẳng nhị diện [A, BD, S] trong chóp S.ABCD đáy chữ nhật
  t11_b25_d08_dihedral_a_bd_s_rect_mc: {
    id: 't11_b25_d08_dihedral_a_bd_s_rect_mc',
    name: 'Tính góc phẳng nhị diện [A, BD, S] (Chóp đáy hình chữ nhật)',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy hình chữ nhật cạnh u·a, v·a, đường cao SA = √q·a. Tính số đo góc phẳng nhị diện [A, BD, S].',
    conditionSummary: 'u ∈ [1; 5], v ∈ [2; 7] (u ≠ v), q ∈ [2; 11]',
    paramSpecs: [
      { name: 'u', label: 'Hệ số cạnh AB = u·a', min: 1, max: 5 },
      { name: 'v', label: 'Hệ số cạnh AD = v·a', min: 2, max: 7 },
      { name: 'q', label: 'Biểu thức đường cao SA = √q·a', min: 2, max: 11 },
    ],
    validateCode: `
      const { u: s1, v: s2, q } = params;
      if (s1 < 1 || s1 > 5 || s2 < 2 || s2 > 7 || q < 2 || q > 11) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      if (s1 === s2) return { valid: false, reason: 'Đáy là hình chữ nhật nên AB ≠ AD' };
      const ah = (s1 * s2) / Math.sqrt(s1 * s1 + s2 * s2);
      const deg = Math.atan(Math.sqrt(q) / ah) * 180 / Math.PI;
      const frac = (deg * 100) - Math.floor(deg * 100);
      if (Math.abs(frac - 0.5) < 0.04) {
        return { valid: false, reason: 'Tránh ranh giới làm tròn .xx5 độ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u: s1, v: s2, q } = params;
      const sum2 = s1 * s1 + s2 * s2;
      const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
      const rad = (n) => {
        let out = 1, rem = n;
        for (let k = 2; k * k <= rem; k++) {
          while (rem % (k * k) === 0) { out *= k; rem /= k * k; }
        }
        return { out, rem };
      };
      const fmtRad = (r) => r.rem === 1 ? String(r.out) : (r.out === 1 ? '' : String(r.out)) + '\\sqrt{' + r.rem + '}';

      const rSA = rad(q);
      const rSum = rad(sum2);
      const gAH = gcd(s1 * s2 * rSum.out, sum2);
      const ahN = (s1 * s2 * rSum.out) / gAH, ahD = sum2 / gAH;
      const ahTex = rSum.rem === 1
        ? (ahD === 1 ? String(ahN) : '\\dfrac{' + ahN + '}{' + ahD + '}')
        : '\\dfrac{' + (ahN === 1 ? '' : String(ahN)) + '\\sqrt{' + rSum.rem + '}}{' + ahD + '}';

      const rProd = rad(q * sum2);
      const gTan = gcd(rProd.out, s1 * s2);
      const tN = rProd.out / gTan, tD = (s1 * s2) / gTan;
      const tanTex = rProd.rem === 1
        ? (tD === 1 ? String(tN) : '\\dfrac{' + tN + '}{' + tD + '}')
        : (tD === 1 ? (tN === 1 ? '' : String(tN)) + '\\sqrt{' + rProd.rem + '}' : '\\dfrac{' + (tN === 1 ? '' : String(tN)) + '\\sqrt{' + rProd.rem + '}}{' + tD + '}');

      const ah = (s1 * s2) / Math.sqrt(sum2);
      const deg = Math.round((Math.atan(Math.sqrt(q) / ah) * 180 / Math.PI) * 100) / 100;
      const fmt2 = (x) => x.toFixed(2).replace('.', ',');
      const candidates = [
        Math.round((deg + 7.30) * 100) / 100,
        Math.round((deg + 12.70) * 100) / 100,
        Math.round((deg + 19.90) * 100) / 100,
        Math.max(4, Math.round((deg - 6.40) * 100) / 100),
      ].map((v) => (v >= 89.5 ? Math.max(4, Math.round((deg - 9.20) * 100) / 100) : v));
      const seen = new Set([fmt2(deg)]);
      const wrongs = [];
      for (const c of candidates) {
        const s = fmt2(c);
        if (!seen.has(s) && wrongs.length < 3) {
          seen.add(s);
          wrongs.push('$' + s + '^\\circ$');
        }
      }

      const correct = '$' + fmt2(deg) + '^\\circ$';
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      const abTex = s1 === 1 ? 'a' : s1 + 'a';
      const adTex = s2 === 1 ? 'a' : s2 + 'a';

      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình chữ nhật, $SA \\perp (ABCD)$, $AB = ' + abTex + '$, $AD = ' + adTex + '$, $SA = ' + fmtRad(rSA) + 'a$. Tính số đo góc phẳng nhị diện $[A, BD, S]$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D' },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Dựng $AH \\perp BD$, kết hợp $BD \\perp SA \\Rightarrow SH \\perp BD$. Do đó $[A, BD, S] = \\widehat{SHA}$.',
          'Ta có $AH = \\dfrac{AB \\cdot AD}{\\sqrt{AB^2 + AD^2}} = ' + ahTex + 'a$.',
          '$\\tan \\widehat{SHA} = \\dfrac{SA}{AH} = ' + tanTex + ' \\Rightarrow \\widehat{SHA} \\approx ' + fmt2(deg) + '^\\circ$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u = v = 3', params: { u: 3, v: 3, q: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8 (55,55°)', params: { u: 1, v: 4, q: 2 }, expectedValid: true },
    ],
  },

  // D09 (Q9): Điều kiện hai mặt phẳng vuông góc (Lí thuyết)
  t11_b25_d09_two_planes_perp_cond_mc: {
    id: 't11_b25_d09_two_planes_perp_cond_mc',
    name: 'Điều kiện để hai mặt phẳng vuông góc (Lí thuyết)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Nhận biết mệnh đề đúng về điều kiện hai mặt phẳng vuông góc dựa vào đường thẳng vuông góc.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Cho $c \\perp \\Delta, c \\subset (\\alpha)$. Mọi mặt phẳng $(\\beta)$ chứa $\\Delta$ và vuông góc với $c$ thì $(\\beta) \\perp (\\alpha)$',
          wrongs: [
            'Cho $c \\perp \\Delta$. Mọi mặt phẳng chứa $\\Delta$ đều vuông góc với $c$',
            'Nếu $c \\perp \\Delta$ và $(\\alpha)$ chứa $c$, $(\\beta)$ chứa $\\Delta$ thì $(\\alpha) \\perp (\\beta)$',
            'Cho $c, \\Delta$. Mọi mặt phẳng $(\\alpha)$ chứa $b$ trong đó $b \\perp c, b \\perp \\Delta$ thì đều vuông góc với mặt phẳng $(c, \\Delta)$',
          ],
          sol: 'Nếu mặt phẳng $(\\beta)$ vuông góc với đường thẳng $c$ và $c \\subset (\\alpha)$ thì $(\\beta) \\perp (\\alpha)$ (theo định lí dấu hiệu nhận biết hai mặt phẳng vuông góc).',
        },
        {
          correct: 'Nếu một mặt phẳng chứa một đường thẳng vuông góc với mặt phẳng kia thì hai mặt phẳng đó vuông góc với nhau',
          wrongs: [
            'Nếu hai mặt phẳng chứa hai đường thẳng vuông góc với nhau thì hai mặt phẳng đó vuông góc',
            'Nếu đường thẳng $a \\subset (\\alpha)$ vuông góc với giao tuyến của $(\\alpha)$ và $(\\beta)$ thì $a \\perp (\\beta)$',
            'Hai mặt phẳng cùng vuông góc với một mặt phẳng thứ ba thì song song với nhau',
          ],
          sol: 'Đây là định lí cơ bản về điều kiện đủ để hai mặt phẳng vuông góc.',
        },
        {
          correct: 'Nếu hai mặt phẳng vuông góc với nhau thì bất kì đường thẳng nào nằm trong mặt phẳng này và vuông góc với giao tuyến đều vuông góc với mặt phẳng kia',
          wrongs: [
            'Nếu hai mặt phẳng vuông góc với nhau thì mọi đường thẳng thuộc mặt phẳng này đều vuông góc với mặt phẳng kia',
            'Hai mặt phẳng phân biệt cùng vuông góc với một mặt phẳng thì vuông góc với nhau',
            'Nếu $(\\alpha) \\perp (\\beta)$ và $d \\perp (\\alpha)$ thì $d \\parallel (\\beta)$',
          ],
          sol: 'Theo tính chất hai mặt phẳng vuông góc, đường thẳng nằm trong một mặt phẳng và vuông góc với giao tuyến sẽ vuông góc với mặt phẳng còn lại.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Hãy chọn mệnh đề đúng trong các mệnh đề sau đây:',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q9', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D10 (Q10): Quan hệ song song/vuông góc giữa mặt phẳng và đường thẳng (Lí thuyết)
  t11_b25_d10_parallel_perp_relations_mc: {
    id: 't11_b25_d10_parallel_perp_relations_mc',
    name: 'Quan hệ song song và vuông góc trong không gian (Mệnh đề đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Nhận biết mệnh đề đúng về mặt phẳng và đường thẳng cùng vuông góc với một đường thẳng.',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Một mặt phẳng $(\\gamma)$ và một đường thẳng $l$ không nằm trong $(\\gamma)$ cùng vuông góc với đường thẳng $\\Delta$ thì $(\\gamma)$ song song với $l$',
          wrongs: [
            'Hai mặt phẳng $(\\gamma)$ và $(P)$ cùng vuông góc với mặt phẳng $(\\beta)$ thì $(\\gamma)$ và $(P)$ cắt nhau',
            'Hai đường thẳng $l, \\Delta$ phân biệt cùng vuông góc với đường thẳng $d$ thì $l$ song song $\\Delta$',
            'Hai mặt phẳng $(\\gamma)$ và $(P)$ cùng vuông góc với mặt phẳng $(\\beta)$ thì $(\\gamma)$ và $(P)$ song song',
          ],
          sol: 'Mặt phẳng $(\\gamma)$ và đường thẳng $l \\not\\subset (\\gamma)$ cùng vuông góc với một đường thẳng $\\Delta$ thì $l \\parallel (\\gamma)$.',
        },
        {
          correct: 'Hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau',
          wrongs: [
            'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau',
            'Hai mặt phẳng phân biệt cùng vuông góc với một mặt phẳng thứ ba thì song song với nhau',
            'Một đường thẳng và một mặt phẳng cùng song song với một đường thẳng thì song song với nhau',
          ],
          sol: 'Hai mặt phẳng phân biệt cùng vuông góc với một đường thẳng thì song song với nhau.',
        },
        {
          correct: 'Nếu hai mặt phẳng cắt nhau cùng vuông góc với mặt phẳng thứ ba thì giao tuyến của chúng vuông góc với mặt phẳng thứ ba đó',
          wrongs: [
            'Nếu hai mặt phẳng cắt nhau cùng vuông góc với một đường thẳng thì có vô số giao tuyến',
            'Hai đường thẳng cùng vuông góc với một đường thẳng luôn song song với nhau',
            'Nếu đường thẳng $a$ song song mặt phẳng $(P)$ và $b \\perp a$ thì $b \\perp (P)$',
          ],
          sol: 'Đây là hệ quả quan trọng của hai mặt phẳng vuông góc: giao tuyến của hai mặt phẳng cùng vuông góc với mặt thứ ba thì vuông góc với mặt thứ ba.',
        },
      ];
      const item = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(item.correct, item.wrongs, rng);
      return {
        stem: 'Hãy chọn mệnh đề đúng trong các mệnh đề sau đây:',
        options,
        correctIndex,
        answerSummary: item.correct,
        solutionSteps: [item.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q10', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D11 (Q11): Quan hệ giữa các đường thẳng và mặt phẳng (Lí thuyết)
  t11_b25_d11_parallel_planes_perp_mc: {
    id: 't11_b25_d11_parallel_planes_perp_mc',
    name: 'Mối liên hệ giữa song song và vuông góc của các mặt phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho các đường thẳng và mặt phẳng phân biệt, xác định mệnh đề đúng: (Q)//(α) và (Q)⊥(γ) => (α)⊥(γ).',
    conditionSummary: 'mode ∈ [0; 2]',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể ký hiệu & mệnh đề (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const SETS = [
        { b: 'b', c: 'c', l: 'l', Q: 'Q', A: '\\alpha', G: '\\gamma' },
        { b: 'a', c: 'b', l: 'd', Q: 'P', A: 'R', G: '\\beta' },
        { b: 'm', c: 'n', l: 'd', Q: '\\alpha', A: '\\beta', G: 'P' },
      ];
      const s = SETS[mode];
      const correct = 'Nếu $(' + s.Q + ') \\parallel (' + s.A + ')$ và $(' + s.Q + ') \\perp (' + s.G + ')$ thì $(' + s.A + ') \\perp (' + s.G + ')$';
      const wrongs = [
        'Nếu $' + s.b + ' \\subset (' + s.Q + '), ' + s.c + ' \\subset (' + s.A + ')$ và $' + s.b + ' \\perp ' + s.c + '$ thì $(' + s.Q + ') \\perp (' + s.A + ')$',
        'Nếu $' + s.b + ' \\perp ' + s.c + '$ và $' + s.c + ' \\subset (' + s.Q + ')$ thì $' + s.b + ' \\perp (' + s.Q + ')$',
        'Nếu $' + s.b + ' \\parallel (' + s.Q + ')$ và $' + s.b + ' \\perp (' + s.A + ')$ thì $(' + s.Q + ') \\perp (' + s.A + ')$',
      ];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho các đường thẳng $' + s.b + ', ' + s.c + ', ' + s.l + '$ và các mặt phẳng $(' + s.Q + '), (' + s.A + '), (' + s.G + ')$ phân biệt. Hãy chọn mệnh đề đúng trong các mệnh đề sau đây:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mặt phẳng vuông góc với một trong hai mặt phẳng song song thì cũng vuông góc với mặt phẳng còn lại nên nếu $(' + s.Q + ') \\parallel (' + s.A + ')$ và $(' + s.Q + ') \\perp (' + s.G + ')$ thì $(' + s.A + ') \\perp (' + s.G + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 3', params: { mode: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q11', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D12 (Q12): Tìm góc giữa mặt bên (SCD) và mặt đáy (ABCD) (chóp đáy vuông SB ⊥ đáy)
  t11_b25_d12_angle_side_base_square_mc: {
    id: 't11_b25_d12_angle_side_base_square_mc',
    name: 'Xác định góc giữa mặt bên và mặt đáy (Chóp đáy hình vuông)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Hai mặt phẳng vuông góc',
    description: 'Cho hình chóp S.ABCD đáy hình vuông, SB ⊥ (ABCD). Xác định góc giữa mặt bên đối diện (SCD) hoặc (SAD) và đáy.',
    conditionSummary: 'rot ∈ [0; 3]',
    paramSpecs: [
      { name: 'rot', label: 'Vị trí đường cao & mặt bên (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.rot < 0 || params.rot > 3) return { valid: false, reason: 'rot ngoài miền [0; 3]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { rot } = params;
      const CASES = [
        {
          altV: 'B', face: 'SCD', inter: 'CD', basePerp: 'BC', edgeSlope: 'SC',
          ans: 'SCB', w1: 'BDC', w2: 'SCA', w3: 'SDA',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
        },
        {
          altV: 'B', face: 'SAD', inter: 'AD', basePerp: 'BA', edgeSlope: 'SA',
          ans: 'SAB', w1: 'BDA', w2: 'SAC', w3: 'SCD',
          vBL: 'B', vFL: 'C', vFR: 'D', vBR: 'A',
        },
        {
          altV: 'A', face: 'SCD', inter: 'CD', basePerp: 'AD', edgeSlope: 'SD',
          ans: 'SDA', w1: 'ACD', w2: 'SCB', w3: 'SBD',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
        {
          altV: 'A', face: 'SBC', inter: 'BC', basePerp: 'AB', edgeSlope: 'SB',
          ans: 'SBA', w1: 'BCA', w2: 'SCA', w3: 'SCD',
          vBL: 'A', vFL: 'B', vFR: 'C', vBR: 'D',
        },
      ];
      const item = CASES[rot];
      const correct = '$\\widehat{' + item.ans + '}$';
      const wrongs = ['$\\widehat{' + item.w1 + '}$', '$\\widehat{' + item.w2 + '}$', '$\\widehat{' + item.w3 + '}$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(correct, wrongs, rng);
      return {
        stem: 'Cho hình chóp $S.ABCD$ có đáy là hình vuông, $S' + item.altV + ' \\perp (ABCD)$. Tìm góc giữa mặt phẳng $(' + item.face + ')$ và mặt phẳng $(ABCD)$.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l11_b10_para_pyramid_3d',
          params: {},
          labels: { apex: 'S', vBL: item.vBL, vFL: item.vFL, vFR: item.vFR, vBR: item.vBR },
        },
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $(' + item.face + ') \\cap (ABCD) = ' + item.inter + '$. Trong $(ABCD)$ có $' + item.inter + ' \\perp ' + item.basePerp + '$, lại có $' + item.inter + ' \\perp S' + item.altV + ' \\Rightarrow ' + item.inter + ' \\perp ' + item.edgeSlope + '$.',
          'Suy ra góc $\\left((' + item.face + '), (ABCD)\\right) = (' + item.edgeSlope + ', ' + item.basePerp + ') = \\widehat{' + item.ans + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rot = 4', params: { rot: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q12 (∠SCB)', params: { rot: 0 }, expectedValid: true },
    ],
  },
};
