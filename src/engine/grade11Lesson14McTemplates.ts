import { MathTemplate } from '../types/math';

export const G11_B14_MC_TEMPLATES: Record<string, MathTemplate> = {
  // D01 (Q1): Tính chất đúng của phép chiếu song song
  t11_b14_d01_parallel_proj_properties_true_mc: {
    id: 't11_b14_d01_parallel_proj_properties_true_mc',
    name: 'Nhận biết tính chất bảo toàn của phép chiếu song song (Tìm khẳng định đúng)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu song song',
    description: 'Kiểm tra các tính chất cơ bản của phép chiếu song song: bảo toàn thứ tự ba điểm thẳng hàng, sự thẳng hàng, tỉ số độ dài trên đường thẳng song song/trùng nhau.',
    conditionSummary: 'mode ∈ [0; 3] (4 mệnh đề chuẩn SGK)',
    paramSpecs: [
      { name: 'mode', label: 'Dạng tính chất chuẩn (0..3)', min: 0, max: 3 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 3) {
        return { valid: false, reason: 'mode ngoài miền [0; 3]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song bảo toàn tính vuông góc',
            'Phép chiếu song song bảo toàn góc trong tam giác',
            'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng trùng nhau',
          ],
          sol: 'Phép chiếu song song giữ nguyên sự thẳng hàng và bảo toàn thứ tự của ba điểm thẳng hàng. Nó không bảo toàn góc hay tính vuông góc.',
        },
        {
          correct: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
          wrongs: [
            'Phép chiếu song song luôn bảo toàn độ dài mọi đoạn thẳng',
            'Phép chiếu song song bảo toàn số đo của mọi góc trong không gian',
            'Hình chiếu song song của hai đường thẳng cắt nhau luôn là hai đường thẳng vuông góc',
          ],
          sol: 'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự của chúng.',
        },
        {
          correct: 'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng nằm trên hai đường thẳng song song hoặc cùng một đường thẳng',
          wrongs: [
            'Phép chiếu song song bảo toàn diện tích của mọi tam giác',
            'Phép chiếu song song bảo toàn chu vi của mọi đa giác phẳng',
            'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng bất kì',
          ],
          sol: 'Phép chiếu song song bảo toàn tỉ số độ dài của hai đoạn thẳng nằm trên cùng một đường thẳng hoặc trên hai đường thẳng song song.',
        },
        {
          correct: 'Hình chiếu song song của hai đường thẳng song song (không song song phương chiếu) là hai đường thẳng song song hoặc trùng nhau',
          wrongs: [
            'Hình chiếu song song của hai đường thẳng chéo nhau luôn cắt nhau',
            'Hình chiếu song song của một đường thẳng bất kì luôn là một đường thẳng',
            'Phép chiếu song song bảo toàn tính trực giao giữa hai đường thẳng',
          ],
          sol: 'Khi hai đường thẳng song song không có phương trùng với phương chiếu, hình chiếu song song của chúng song song hoặc trùng nhau.',
        },
      ];
      const m = MODES[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(m.correct, m.wrongs, rng);

      return {
        stem: 'Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: m.correct,
        solutionSteps: [m.sol],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = 4', params: { mode: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q1 (bảo toàn thứ tự 3 điểm thẳng hàng)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D02 (Q2): Tìm khẳng định sai về tính chất phép chiếu song song
  t11_b14_d02_parallel_proj_properties_false_mc: {
    id: 't11_b14_d02_parallel_proj_properties_false_mc',
    name: 'Nhận biết giới hạn bảo toàn của phép chiếu song song (Tìm khẳng định sai)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu song song',
    description: 'Phân biệt các tính chất đúng của phép chiếu song song với phát biểu sai (bảo toàn tỉ số đoạn thẳng bất kì, bảo toàn độ dài/góc).',
    conditionSummary: 'mode ∈ [0; 2] (3 dạng phát biểu sai thường gặp)',
    paramSpecs: [
      { name: 'mode', label: 'Biến thể mệnh đề sai (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) {
        return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const TRUE_POOL = [
        'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng',
        'Hình chiếu song song của hai đường thẳng song song (không song song phương chiếu) là hai đường thẳng song song hoặc trùng nhau',
        'Phép chiếu song song bảo toàn thứ tự của ba điểm thẳng hàng',
      ];
      const FALSE_POOL = [
        {
          stmt: 'Phép chiếu song song không làm thay đổi tỉ số độ dài của hai đoạn thẳng bất kì',
          reason: 'Phép chiếu song song chỉ bảo toàn tỉ số độ dài của hai đoạn thẳng nằm trên cùng một đường thẳng hoặc trên hai đường thẳng song song; với hai đoạn thẳng bất kì không song song, tỉ số độ dài có thể thay đổi.',
        },
        {
          stmt: 'Phép chiếu song song luôn bảo toàn độ dài của đoạn thẳng',
          reason: 'Độ dài hình chiếu song song phụ thuộc vào góc giữa đoạn thẳng và mặt phẳng chiếu, nói chung khác độ dài ban đầu (thậm chí bằng $0$ nếu đoạn thẳng song song với phương chiếu).',
        },
        {
          stmt: 'Phép chiếu song song luôn bảo toàn số đo góc của hai đường thẳng cắt nhau',
          reason: 'Phép chiếu song song nói chung không bảo toàn số đo góc hay tính vuông góc của hai đường thẳng cắt nhau.',
        },
      ];
      const f = FALSE_POOL[mode];
      const { options, correctIndex } = u.buildUniqueMcOptions(f.stmt, TRUE_POOL, rng);

      return {
        stem: 'Khẳng định nào sau đây **sai**?',
        options,
        correctIndex,
        answerSummary: f.stmt + ' (sai)',
        solutionSteps: [f.reason],
      };
    `,
    boundaryCases: [
      { label: 'Biên mode = -1', params: { mode: -1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q2 (tỉ số độ dài hai đoạn thẳng bất kì)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D03 (Q3): Hình chiếu song song của các hình phẳng (hình chữ nhật, hình vuông, hình thoi, đoạn thẳng)
  t11_b14_d03_parallel_proj_shapes_mc: {
    id: 't11_b14_d03_parallel_proj_shapes_mc',
    name: 'Hình chiếu song song của đoạn thẳng và các tứ giác đặc biệt',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu song song',
    description: 'Xác định hình ảnh đúng của hình chữ nhật, hình thoi, hình vuông, đoạn thẳng qua phép chiếu song song.',
    conditionSummary: 'mode ∈ [0; 2] (3 đa giác đặc biệt)',
    paramSpecs: [
      { name: 'mode', label: 'Đa giác gốc (0: hình chữ nhật, 1: hình thoi, 2: hình bình hành)', min: 0, max: 2 },
    ],
    validateCode: `
      if (params.mode < 0 || params.mode > 2) {
        return { valid: false, reason: 'mode ngoài miền [0; 2]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { mode } = params;
      const MODES = [
        {
          correct: 'Hình chiếu song song của hình chữ nhật (mặt phẳng chứa nó không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình vuông luôn là một hình vuông',
            'Hình chiếu song song của một đoạn thẳng luôn là một đoạn thẳng',
            'Hình chiếu song song của hình thoi luôn là một hình thoi',
          ],
          sol: 'Phép chiếu song song bảo toàn tính song song nên hình chiếu của hình chữ nhật (trong trường hợp mặt phẳng không song song phương chiếu) là hình bình hành; còn đoạn thẳng song song phương chiếu sẽ có hình chiếu là một điểm.',
        },
        {
          correct: 'Hình chiếu song song của hình thoi (mặt phẳng chứa nó không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình chữ nhật luôn là một hình chữ nhật',
            'Hình chiếu song song của tam giác đều luôn là một tam giác đều',
            'Hình chiếu song song của một đoạn thẳng luôn có độ dài bằng đoạn thẳng ban đầu',
          ],
          sol: 'Hình chiếu song song của hình thoi nói chung là một hình bình hành (có thể trở thành hình chữ nhật hoặc hình vuông tùy phương chiếu, không nhất thiết giữ nguyên độ dài cạnh bằng nhau).',
        },
        {
          correct: 'Hình chiếu song song của hình vuông (mặt phẳng chứa nó không song song phương chiếu) là một hình bình hành',
          wrongs: [
            'Hình chiếu song song của hình vuông luôn có hai đường chéo vuông góc nhau',
            'Hình chiếu song song của tam giác cân luôn là một tam giác cân',
            'Hình chiếu song song của hình thang luôn là một hình chữ nhật',
          ],
          sol: 'Hình vuông là hình bình hành đặc biệt; qua phép chiếu song song theo phương không song song với mặt phẳng chứa hình vuông, ảnh thu được là một hình bình hành.',
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
      { label: 'Mẫu chuẩn Q3 (hình chữ nhật -> hình bình hành)', params: { mode: 0 }, expectedValid: true },
    ],
  },

  // D04 (Q4): Hình chiếu song song của một đỉnh lăng trụ lên mặt phẳng đáy theo phương cạnh bên
  t11_b14_d04_prism_point_projection_onto_base_mc: {
    id: 't11_b14_d04_prism_point_projection_onto_base_mc',
    name: 'Tìm ảnh của một đỉnh hình lăng trụ lên mặt đáy qua phép chiếu song song theo phương cạnh bên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phép chiếu song song',
    description: 'Cho hình lăng trụ ABC.A\'B\'C\'. Tìm hình chiếu song song của một đỉnh đáy này lên mặt đáy kia theo phương của một cạnh bên.',
    conditionSummary: 'setIdx ∈ [0; 2], vIdx ∈ [0; 2], dirOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'vIdx', label: 'Đỉnh được chiếu (0..2)', min: 0, max: 2 },
      { name: 'dirOpt', label: 'Chiều chiếu (0: đáy dưới->trên, 1: trên->dưới)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, vIdx, dirOpt } = params;
      if (setIdx < 0 || setIdx > 2 || vIdx < 0 || vIdx > 2 || (dirOpt !== 0 && dirOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, vIdx, dirOpt } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"] },
        { b: ['A', 'B', 'C'], t: ['A_1', 'B_1', 'C_1'] },
        { b: ['M', 'N', 'P'], t: ["M'", "N'", "P'"] },
      ];
      const s = SETS[setIdx];
      const srcPt = dirOpt === 0 ? s.b[vIdx] : s.t[vIdx];
      const imgPt = dirOpt === 0 ? s.t[vIdx] : s.b[vIdx];
      const targetPlane = (dirOpt === 0 ? s.t : s.b).join('');

      const dirIdx = (vIdx + 2) % 3;
      const projDir = s.b[dirIdx] + s.t[dirIdx];

      const other1 = dirOpt === 0 ? s.t[(vIdx + 1) % 3] : s.b[(vIdx + 1) % 3];
      const other2 = dirOpt === 0 ? s.t[(vIdx + 2) % 3] : s.b[(vIdx + 2) % 3];
      const sameSide = dirOpt === 0 ? s.b[(vIdx + 1) % 3] : s.t[(vIdx + 1) % 3];

      const correct = 'Điểm $' + imgPt + '$';
      const wList = ['Điểm $' + other1 + '$', 'Điểm $' + other2 + '$', 'Điểm $' + sameSide + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => 'Điểm $' + s.b[j % 3] + '$ (' + j + ')'
      );

      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + srcPt + '$ lên mặt phẳng $(' + targetPlane + ')$ theo phương $' + projDir + '$ là điểm nào?',
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
          'Vì các cạnh bên của hình lăng trụ song song với nhau nên $' + srcPt + imgPt + ' \\parallel ' + projDir + '$.',
          'Mà $' + imgPt + ' \\in (' + targetPlane + ')$ nên hình chiếu song song của điểm $' + srcPt + '$ lên $(' + targetPlane + ')$ theo phương $' + projDir + '$ là điểm $' + imgPt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vIdx = 3', params: { setIdx: 0, vIdx: 3, dirOpt: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4 (ABC.A\'B\'C\', chiếu B theo AA\' -> B\')', params: { setIdx: 0, vIdx: 1, dirOpt: 0 }, expectedValid: true },
    ],
  },

  // D05 (Q5): Hình chiếu song song của một đỉnh lăng trụ lên mặt bên đối diện theo phương cạnh đáy
  t11_b14_d05_prism_point_projection_onto_lateral_mc: {
    id: 't11_b14_d05_prism_point_projection_onto_lateral_mc',
    name: 'Tìm ảnh của một đỉnh lên mặt bên đối diện theo phương cạnh đáy trong hình lăng trụ',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Phép chiếu song song',
    description: 'Cho hình lăng trụ ABC.DEF. Tìm hình chiếu song song của đỉnh F lên mặt bên (ABED) theo phương cạnh đáy BC.',
    conditionSummary: 'setIdx ∈ [0; 2], faceOpt ∈ [0; 2], endOpt ∈ {0, 1}',
    paramSpecs: [
      { name: 'setIdx', label: 'Bộ tên đỉnh lăng trụ (0..2)', min: 0, max: 2 },
      { name: 'faceOpt', label: 'Mặt bên chiếu lên (0..2)', min: 0, max: 2 },
      { name: 'endOpt', label: 'Đỉnh thuộc cạnh bên đối (0: đáy trên, 1: đáy dưới)', min: 0, max: 1 },
    ],
    validateCode: `
      const { setIdx, faceOpt, endOpt } = params;
      if (setIdx < 0 || setIdx > 2 || faceOpt < 0 || faceOpt > 2 || (endOpt !== 0 && endOpt !== 1)) {
        return { valid: false, reason: 'Tham số ngoài miền' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { setIdx, faceOpt, endOpt } = params;
      const SETS = [
        { b: ['A', 'B', 'C'], t: ['D', 'E', 'F'] },
        { b: ['A', 'B', 'C'], t: ["A'", "B'", "C'"] },
        { b: ['M', 'N', 'P'], t: ['D', 'E', 'F'] },
      ];
      const s = SETS[setIdx];
      const b0 = s.b[faceOpt], b1 = s.b[(faceOpt + 1) % 3], b2 = s.b[(faceOpt + 2) % 3];
      const t0 = s.t[faceOpt], t1 = s.t[(faceOpt + 1) % 3], t2 = s.t[(faceOpt + 2) % 3];

      const latPlane = b0 + b1 + t1 + t0;
      const srcPt = endOpt === 0 ? t2 : b2;
      const projDir = endOpt === 0 ? b1 + b2 : t0 + t2;
      const imgPt = endOpt === 0 ? t1 : b0;
      const parSeg = endOpt === 0 ? t2 + t1 : b2 + b0;

      const d1 = endOpt === 0 ? b2 : t2;
      const d2 = endOpt === 0 ? t0 : t1;
      const d3 = b1;

      const correct = 'Điểm $' + imgPt + '$';
      const wList = ['Điểm $' + d1 + '$', 'Điểm $' + d2 + '$', 'Điểm $' + d3 + '$'];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        wList,
        rng,
        (j) => 'Điểm $' + s.b[j % 3] + '$ (' + j + ')'
      );

      return {
        stem: 'Cho hình lăng trụ $' + s.b.join('') + '.' + s.t.join('') + '$. Hình chiếu song song của điểm $' + srcPt + '$ lên mặt phẳng $(' + latPlane + ')$ theo phương $' + projDir + '$ là điểm nào?',
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
          'Vì hai mặt đáy của hình lăng trụ song song với nhau và các cạnh bên song song nên $' + parSeg + ' \\parallel ' + projDir + '$.',
          'Mà $' + imgPt + ' \\in (' + latPlane + ')$ nên đường thẳng qua $' + srcPt + '$ song song với $' + projDir + '$ cắt mặt phẳng $(' + latPlane + ')$ tại điểm $' + imgPt + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên faceOpt = 3', params: { setIdx: 0, faceOpt: 3, endOpt: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q5 (ABC.DEF, chiếu F lên (ABED) theo BC -> E)', params: { setIdx: 0, faceOpt: 0, endOpt: 0 }, expectedValid: true },
    ],
  },
};
