import { MathTemplate } from '../types/math';

export const G11_B30_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D15 (Q15): Hai phần mềm chống virus
  t11_b30_d15_antivirus_at_least_one_sa: {
    id: 't11_b30_d15_antivirus_at_least_one_sa',
    name: 'Xác suất phát hiện virus ít nhất một lần khi dùng hai phần mềm',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Hai phần mềm diệt virus độc lập với xác suất phát hiện p₁, p₂. Tính xác suất phát hiện virus ít nhất một lần.',
    conditionSummary: 'p1Int, p2Int ∈ [55; 95]',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(phần mềm 1)', min: 55, max: 95 },
      { name: 'p2Int', label: '100·P(phần mềm 2)', min: 55, max: 95 },
    ],
    validateCode: `
      const { p1Int, p2Int } = params;
      if (!Number.isInteger(p1Int) || p1Int < 55 || p1Int > 95) return { valid: false, reason: 'p1Int ngoài miền [55; 95]' };
      if (!Number.isInteger(p2Int) || p2Int < 55 || p2Int > 95) return { valid: false, reason: 'p2Int ngoài miền [55; 95]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int } = params;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const qBoth = Number((q1 * q2).toFixed(4));
      const ans = Math.round((1 - qBoth) * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một người dùng thử hai phần mềm chống virus. Với phần mềm thứ nhất, xác suất phát hiện virus là $' + fmt2(p1) + '$, với phần mềm thứ hai, xác suất phát hiện virus là $' + fmt2(p2) + '$. Người dùng sử dụng lần lượt cả hai phần mềm một cách độc lập. Tính xác suất người dùng phát hiện được virus ít nhất một lần (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Xác suất không phát hiện virus của hai phần mềm lần lượt là $1 - ' + fmt2(p1) + ' = ' + fmt2(q1) + '$ và $1 - ' + fmt2(p2) + ' = ' + fmt2(q2) + '$.',
          'Vì hai lần sử dụng độc lập nên xác suất không phát hiện virus cả hai lần là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' = ' + qBoth.toFixed(4).replace('.', ',') + '$.',
          'Xác suất phát hiện virus ít nhất một lần là $1 - ' + qBoth.toFixed(4).replace('.', ',') + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 40', params: { p1Int: 40, p2Int: 76 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q15 (0,79 và 0,76 -> 0,95)', params: { p1Int: 79, p2Int: 76 }, expectedValid: true },
    ],
  },

  // D16 (Q16): Dịch vụ chăm sóc da (mặt nạ & máy xông hơi)
  t11_b30_d16_skincare_at_least_one_sa: {
    id: 't11_b30_d16_skincare_at_least_one_sa',
    name: 'Xác suất cải thiện làn da ít nhất một lần với hai dịch vụ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Hai dịch vụ chăm sóc da độc lập với xác suất cải thiện p₁, p₂. Tính xác suất cải thiện làn da ít nhất một lần.',
    conditionSummary: 'p1Int, p2Int ∈ [55; 95]',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(mặt nạ)', min: 55, max: 95 },
      { name: 'p2Int', label: '100·P(xông hơi)', min: 55, max: 95 },
    ],
    validateCode: `
      const { p1Int, p2Int } = params;
      if (!Number.isInteger(p1Int) || p1Int < 55 || p1Int > 95) return { valid: false, reason: 'p1Int ngoài miền [55; 95]' };
      if (!Number.isInteger(p2Int) || p2Int < 55 || p2Int > 95) return { valid: false, reason: 'p2Int ngoài miền [55; 95]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int } = params;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const qBoth = Number((q1 * q2).toFixed(4));
      const ans = Math.round((1 - qBoth) * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một khách hàng trải nghiệm dịch vụ chăm sóc da. Khi sử dụng mặt nạ dưỡng da, xác suất cải thiện làn da là $' + fmt2(p1) + '$ còn khi sử dụng máy xông hơi da mặt, xác suất cải thiện là $' + fmt2(p2) + '$. Khách hàng sử dụng độc lập cả hai dịch vụ này một lần. Tính xác suất khách hàng cải thiện làn da ít nhất một lần (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Xác suất không cải thiện làn da của hai dịch vụ lần lượt là $' + fmt2(q1) + '$ và $' + fmt2(q2) + '$.',
          'Vì hai lần sử dụng độc lập nên xác suất không cải thiện làn da cả hai lần là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' = ' + qBoth.toFixed(4).replace('.', ',') + '$.',
          'Xác suất cải thiện làn da ít nhất một lần là $1 - ' + qBoth.toFixed(4).replace('.', ',') + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p2Int = 45', params: { p1Int: 76, p2Int: 45 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q16 (0,76 và 0,78 -> 0,95)', params: { p1Int: 76, p2Int: 78 }, expectedValid: true },
    ],
  },

  // D17 (Q17): Hệ thống cảnh báo va chạm & phanh tự động
  t11_b30_d17_driving_safety_at_least_one_sa: {
    id: 't11_b30_d17_driving_safety_at_least_one_sa',
    name: 'Xác suất tránh tai nạn ít nhất một lần khi dùng hai hệ thống an toàn',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Hai hệ thống an toàn ô tô hoạt động độc lập với xác suất tránh tai nạn p₁, p₂. Tính xác suất tránh được ít nhất một lần.',
    conditionSummary: 'p1Int, p2Int ∈ [55; 95]',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(cảnh báo va chạm)', min: 55, max: 95 },
      { name: 'p2Int', label: '100·P(phanh tự động)', min: 55, max: 95 },
    ],
    validateCode: `
      const { p1Int, p2Int } = params;
      if (!Number.isInteger(p1Int) || p1Int < 55 || p1Int > 95) return { valid: false, reason: 'p1Int ngoài miền [55; 95]' };
      if (!Number.isInteger(p2Int) || p2Int < 55 || p2Int > 95) return { valid: false, reason: 'p2Int ngoài miền [55; 95]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int } = params;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const qBoth = Number((q1 * q2).toFixed(4));
      const ans = Math.round((1 - qBoth) * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một người lái xe ô tô đi qua hai đoạn đường. Nếu bật hệ thống cảnh báo va chạm, xác suất tránh được tai nạn là $' + fmt2(p1) + '$ còn nếu chỉ dùng hệ thống phanh tự động, xác suất tránh được tai nạn là $' + fmt2(p2) + '$. Người lái xe sử dụng lần lượt hai hệ thống này một cách độc lập trên hai đoạn đường. Tính xác suất người đó tránh được tai nạn ít nhất một lần (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Xác suất không tránh được tai nạn ở mỗi hệ thống lần lượt là $' + fmt2(q1) + '$ và $' + fmt2(q2) + '$.',
          'Vì hai lần sử dụng độc lập nên xác suất không tránh được tai nạn cả hai lần là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' = ' + qBoth.toFixed(4).replace('.', ',') + '$.',
          'Xác suất tránh được tai nạn ít nhất một lần là $1 - ' + qBoth.toFixed(4).replace('.', ',') + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 50', params: { p1Int: 50, p2Int: 82 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q17 (0,73 và 0,82 -> 0,95)', params: { p1Int: 73, p2Int: 82 }, expectedValid: true },
    ],
  },

  // D18 (Q18): Đề trắc nghiệm N câu gồm 3 mức độ, tính xác suất làm trọn vẹn đề
  t11_b30_d18_exam_all_three_levels_sa: {
    id: 't11_b30_d18_exam_all_three_levels_sa',
    name: 'Xác suất làm trọn vẹn đề trắc nghiệm gồm ba mức độ độc lập',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Tính xác suất học sinh làm trọn vẹn đề thi khi khả năng hoàn thành từng phần nhận biết, thông hiểu, vận dụng độc lập là p₁, p₂, p₃.',
    conditionSummary: 'n1 ∈ [5; 15], n2 ∈ [6; 18], n3 ∈ [15; 38], p1Int ∈ [60; 95], p2Int ∈ [55; 90], p3Int ∈ [35; 75]',
    paramSpecs: [
      { name: 'n1', label: 'Số câu nhận biết', min: 5, max: 15 },
      { name: 'n2', label: 'Số câu thông hiểu', min: 6, max: 18 },
      { name: 'n3', label: 'Số câu vận dụng', min: 15, max: 38 },
      { name: 'p1Int', label: '100·P(nhận biết)', min: 60, max: 95 },
      { name: 'p2Int', label: '100·P(thông hiểu)', min: 55, max: 90 },
      { name: 'p3Int', label: '100·P(vận dụng)', min: 35, max: 75 },
    ],
    validateCode: `
      const { n1, n2, n3, p1Int, p2Int, p3Int } = params;
      if (!Number.isInteger(n1) || n1 < 5 || n1 > 15) return { valid: false, reason: 'n1 ngoài miền [5; 15]' };
      if (!Number.isInteger(n2) || n2 < 6 || n2 > 18) return { valid: false, reason: 'n2 ngoài miền [6; 18]' };
      if (!Number.isInteger(n3) || n3 < 15 || n3 > 38) return { valid: false, reason: 'n3 ngoài miền [15; 38]' };
      if (!Number.isInteger(p1Int) || p1Int < 60 || p1Int > 95) return { valid: false, reason: 'p1Int ngoài miền [60; 95]' };
      if (!Number.isInteger(p2Int) || p2Int < 55 || p2Int > 90) return { valid: false, reason: 'p2Int ngoài miền [55; 90]' };
      if (!Number.isInteger(p3Int) || p3Int < 35 || p3Int > 75) return { valid: false, reason: 'p3Int ngoài miền [35; 75]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, n3, p1Int, p2Int, p3Int } = params;
      const total = n1 + n2 + n3;
      const p1 = p1Int / 100, p2 = p2Int / 100, p3 = p3Int / 100;
      const ans = Math.round(p1 * p2 * p3 * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một đề trắc nghiệm có $' + total + '$ câu hỏi gồm $' + n1 + '$ câu mức độ nhận biết, $' + n2 + '$ câu mức độ thông hiểu và $' + n3 + '$ câu mức độ vận dụng. Xác suất để bạn An làm hết các câu mức độ nhận biết là $' + fmt2(p1) + '$; làm hết câu mức độ thông hiểu là $' + fmt2(p2) + '$; và làm hết câu mức độ vận dụng là $' + fmt2(p3) + '$ (độc lập nhau). Tính xác suất để bạn An làm trọn vẹn $' + total + '$ câu (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $A, B, C$ lần lượt là các biến cố An làm hết các câu mức độ nhận biết, thông hiểu và vận dụng.',
          'Ta có $P(A) = ' + fmt2(p1) + ',\\, P(B) = ' + fmt2(p2) + ',\\, P(C) = ' + fmt2(p3) + '$.',
          'Vì các biến cố độc lập nên $P(A \\cap B \\cap C) = P(A)P(B)P(C) = ' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p3Int = 30', params: { n1: 7, n2: 7, n3: 36, p1Int: 83, p2Int: 75, p3Int: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q18 (0,83·0,75·0,51 -> 0,32)', params: { n1: 7, n2: 7, n3: 36, p1Int: 83, p2Int: 75, p3Int: 51 }, expectedValid: true },
    ],
  },

  // D19 (Q19): Lây bệnh truyền nhiễm qua 2 lần tiếp xúc (có và không đeo khẩu trang)
  t11_b30_d19_mask_infection_prob_sa: {
    id: 't11_b30_d19_mask_infection_prob_sa',
    name: 'Xác suất lây bệnh truyền nhiễm khi tiếp xúc hai lần có và không đeo khẩu trang',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Tiếp xúc người bệnh hai lần độc lập (1 lần không đeo khẩu trang xác suất lây p₁, 1 lần có đeo xác suất lây p₂). Tính xác suất bị lây bệnh.',
    conditionSummary: 'nameIdx ∈ [0; 2], p1Int ∈ [60; 95], p2Int ∈ [2; 25]',
    paramSpecs: [
      { name: 'nameIdx', label: 'Tên nhân vật (0..2)', min: 0, max: 2 },
      { name: 'p1Int', label: '100·P(lây không đeo khẩu trang)', min: 60, max: 95 },
      { name: 'p2Int', label: '100·P(lây có đeo khẩu trang)', min: 2, max: 25 },
    ],
    validateCode: `
      const { nameIdx, p1Int, p2Int } = params;
      if (!Number.isInteger(nameIdx) || nameIdx < 0 || nameIdx > 2) return { valid: false, reason: 'nameIdx ngoài miền [0; 2]' };
      if (!Number.isInteger(p1Int) || p1Int < 60 || p1Int > 95) return { valid: false, reason: 'p1Int ngoài miền [60; 95]' };
      if (!Number.isInteger(p2Int) || p2Int < 2 || p2Int > 25) return { valid: false, reason: 'p2Int ngoài miền [2; 25]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { nameIdx, p1Int, p2Int } = params;
      const NAMES = ['Ông Hiếu', 'Ông Nam', 'Ông Minh'];
      const person = NAMES[nameIdx];
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const qBoth = Number((q1 * q2).toFixed(4));
      const ans = Math.round((1 - qBoth) * 100 + 1e-9) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một bệnh truyền nhiễm có xác suất lây bệnh là $' + fmt2(p1) + '$ nếu tiếp xúc với người bệnh mà không đeo khẩu trang và là $' + fmt2(p2) + '$ nếu tiếp xúc với người bệnh mà có đeo khẩu trang. ' + person + ' tiếp xúc với người bệnh hai lần độc lập, trong đó có một lần không đeo khẩu trang và một lần có đeo khẩu trang. Xác suất ' + person.toLowerCase().replace('ông ', 'ông ') + ' bị bệnh do lây từ người bệnh đã tiếp xúc là bao nhiêu? (kết quả làm tròn đến hàng phần trăm)',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Xác suất không bị lây trong lần không đeo khẩu trang là $1 - ' + fmt2(p1) + ' = ' + fmt2(q1) + '$, trong lần có đeo khẩu trang là $1 - ' + fmt2(p2) + ' = ' + fmt2(q2) + '$.',
          'Do hai lần tiếp xúc độc lập nên xác suất không bị lây cả hai lần là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' = ' + qBoth.toFixed(4).replace('.', ',') + '$.',
          'Xác suất bị lây bệnh ít nhất một lần là $1 - ' + qBoth.toFixed(4).replace('.', ',') + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p2Int = 30', params: { nameIdx: 0, p1Int: 89, p2Int: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q19 (0,89 và 0,15 -> 0,91)', params: { nameIdx: 0, p1Int: 89, p2Int: 15 }, expectedValid: true },
    ],
  },

  // D20 (Q20): Trò chơi n ô, đúng 1 ô may mắn, mở không hoàn lại ở lần thứ k
  t11_b30_d20_lucky_box_kth_try_sa: {
    id: 't11_b30_d20_lucky_box_kth_try_sa',
    name: 'Xác suất mở được ô may mắn ở lần thứ k (mở không hoàn lại)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất',
    description: 'Trò chơi gồm n ô giống nhau với đúng 1 ô may mắn. Tính xác suất mở được ô may mắn ở lần thử thứ k.',
    conditionSummary: 'n ∈ [5; 20], k ∈ [2; 18], k < n',
    paramSpecs: [
      { name: 'n', label: 'Tổng số ô lựa chọn n', min: 5, max: 20 },
      { name: 'k', label: 'Thứ tự lần mở k', min: 2, max: 18 },
    ],
    validateCode: `
      const { n, k } = params;
      if (!Number.isInteger(n) || n < 5 || n > 20) return { valid: false, reason: 'n ngoài miền [5; 20]' };
      if (!Number.isInteger(k) || k < 2 || k > 18) return { valid: false, reason: 'k ngoài miền [2; 18]' };
      if (k >= n) return { valid: false, reason: 'Cần k < n' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, k } = params;
      const ans = Math.floor((200 + n) / (2 * n)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      let missChain = '';
      if (k <= 9) {
        const missFactors = [];
        for (let i = 0; i < k - 1; i++) {
          missFactors.push('\\dfrac{' + (n - 1 - i) + '}{' + (n - i) + '}');
        }
        missChain = missFactors.join(' \\cdot ');
      } else {
        missChain = '\\dfrac{' + (n - 1) + '}{' + n + '} \\cdot \\dfrac{' + (n - 2) + '}{' + (n - 1) + '} \\cdots \\dfrac{' + (n - k + 1) + '}{' + (n - k + 2) + '}';
      }
      const hitFactor = '\\dfrac{1}{' + (n - k + 1) + '}';

      return {
        stem: 'Một trò chơi gồm $' + n + '$ ô lựa chọn, bề ngoài của chúng giống hệt nhau và chỉ có đúng một ô may mắn. Người chơi thử ngẫu nhiên từng ô (mỗi ô chỉ mở một lần). Tính xác suất để người đó mở được ô may mắn ở lần thứ $' + k + '$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Để mở được ô may mắn ở lần thứ $' + k + '$, người chơi phải không trúng trong $' + (k - 1) + '$ lần đầu và mở trúng ở lần thứ $' + k + '$.',
          'Xác suất không trúng ở $' + (k - 1) + '$ lần đầu là: $' + missChain + '$.',
          'Xác suất trúng ở lần thứ $' + k + '$ là $' + hitFactor + '$. Theo quy tắc nhân xác suất ta được $P = \\dfrac{1}{' + n + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k ≥ n', params: { n: 10, k: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q20 (n=10, k=9 -> 0,10)', params: { n: 10, k: 9 }, expectedValid: true },
    ],
  },

  // D21 (Q21): Hai hộp bi xanh đỏ, biết tổng N và P(2 xanh), tính a + b của P(2 đỏ) = a/b
  t11_b30_d21_two_urns_red_balls_sa: {
    id: 't11_b30_d21_two_urns_red_balls_sa',
    name: 'Bài toán ngược xác suất lấy hai bi đỏ từ hai hộp bi xanh đỏ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Cho tổng số bi của hai hộp, biết hộp 1 nhiều bi hơn hộp 2 và số bi xanh hộp 1 nhiều hơn hộp 2, cùng xác suất lấy 2 bi xanh. Tính a + b với xác suất lấy 2 bi đỏ là phân số tối giản a/b.',
    conditionSummary: 'n2 ∈ [3; 8], d ∈ [1; 4] (n1 = n2 + d), 1 ≤ x2 < n2, x2 < x1 < n1, nghiệm duy nhất',
    paramSpecs: [
      { name: 'n2', label: 'Số bi hộp thứ hai n₂', min: 3, max: 8 },
      { name: 'd', label: 'Hiệu số bi hai hộp (n₁ - n₂)', min: 1, max: 4 },
      { name: 'x2', label: 'Số bi xanh hộp hai x₂', min: 1, max: 7 },
      { name: 'x1', label: 'Số bi xanh hộp một x₁', min: 2, max: 11 },
    ],
    validateCode: `
      const { n2, d, x2, x1 } = params;
      if (!Number.isInteger(n2) || n2 < 3 || n2 > 8) return { valid: false, reason: 'n2 ngoài miền [3; 8]' };
      if (!Number.isInteger(d) || d < 1 || d > 4) return { valid: false, reason: 'd ngoài miền [1; 4]' };
      const n1 = n2 + d;
      if (!Number.isInteger(x2) || x2 < 1 || x2 >= n2) return { valid: false, reason: 'Cần 1 ≤ x2 < n2' };
      if (!Number.isInteger(x1) || x1 <= x2 || x1 >= n1) return { valid: false, reason: 'Cần x2 < x1 < n1' };

      const N = n1 + n2;
      const g = u.gcd(x1 * x2, n1 * n2);
      const num = (x1 * x2) / g;
      const den = (n1 * n2) / g;

      let matches = 0;
      for (let a2 = 1; a2 < N; a2++) {
        const a1 = N - a2;
        if (a1 <= a2) continue;
        for (let y2 = 1; y2 < a2; y2++) {
          for (let y1 = y2 + 1; y1 < a1; y1++) {
            if (y1 * y2 * den === num * a1 * a2) matches++;
          }
        }
      }
      if (matches !== 1) return { valid: false, reason: 'Dữ kiện chưa xác định duy nhất bộ (n₁, n₂, x₁, x₂)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n2, d, x2, x1 } = params;
      const n1 = n2 + d;
      const N = n1 + n2;
      const gFrac = u.simplifyFrac(x1 * x2, n1 * n2);
      const r1 = n1 - x1, r2 = n2 - x2;
      const redFrac = u.simplifyFrac(r1 * r2, n1 * n2);
      const ans = redFrac.num + redFrac.den;

      const allPairs = [];
      for (let a1 = Math.floor(N / 2) + 1; a1 <= N - 1; a1++) {
        allPairs.push('(' + a1 + '; ' + (N - a1) + ')');
      }

      return {
        stem: 'Cho hai hộp đựng bi, đựng hai loại bi là bi xanh và bi đỏ, tổng số bi của cả hai hộp là $' + N + '$ bi và hộp thứ nhất đựng nhiều bi hơn hộp thứ hai, đồng thời số bi xanh ở hộp một nhiều hơn số bi xanh ở hộp hai. Lấy ngẫu nhiên từ mỗi hộp một bi. Nếu xác suất để lấy được $2$ bi xanh là $' + gFrac.latex + '$ thì xác suất để lấy được $2$ bi đỏ là $\\dfrac{a}{b}$ với $\\dfrac{a}{b}$ là phân số tối giản. Tính $a + b$.',
        shortAnswer: String(ans),
        numericValue: ans,
        answerSummary: String(ans),
        solutionSteps: [
          'Gọi hộp thứ nhất có $n_1$ bi ($x_1$ bi xanh), hộp thứ hai có $n_2$ bi ($x_2$ bi xanh). Ta có $n_1 + n_2 = ' + N + ',\\, n_1 > n_2,\\, x_1 > x_2$.',
          'Các cặp $(n_1; n_2)$ khả dĩ là ' + allPairs.join(', ') + '. Thử điều kiện $\\dfrac{x_1 x_2}{n_1 n_2} = ' + gFrac.latex + '$ với $1 \\le x_1 < n_1,\\, 1 \\le x_2 < n_2,\\, x_1 > x_2$, ta được nghiệm duy nhất $(n_1; n_2) = (' + n1 + '; ' + n2 + ')$ và $(x_1; x_2) = (' + x1 + '; ' + x2 + ')$.',
          'Số bi đỏ ở hai hộp lần lượt là $' + n1 + ' - ' + x1 + ' = ' + r1 + '$ và $' + n2 + ' - ' + x2 + ' = ' + r2 + '$.',
          'Xác suất lấy được $2$ bi đỏ là $\\dfrac{' + r1 + '}{' + n1 + '} \\cdot \\dfrac{' + r2 + '}{' + n2 + '} = ' + redFrac.latex + ' \\Rightarrow a = ' + redFrac.num + ',\\, b = ' + redFrac.den + '$. Vậy $a + b = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 ≤ x2', params: { n2: 4, d: 2, x2: 3, x1: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (n2=4, d=2, x2=2, x1=5 -> 13)', params: { n2: 4, d: 2, x2: 2, x1: 5 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Ba hạt giống X, Y, Z nảy mầm, tìm P(X Ȳ Z̄)
  t11_b30_d22_three_seeds_only_x_sa: {
    id: 't11_b30_d22_three_seeds_only_x_sa',
    name: 'Tính xác suất duy nhất hạt giống X nảy mầm từ xác suất hợp và giao',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Ba hạt giống X, Y, Z nảy mầm độc lập với xác suất x > y và z cho trước. Biết P(ít nhất 1) và P(cả 3), tính xác suất chỉ duy nhất X nảy mầm.',
    conditionSummary: 'x = x20/20, y = y20/20, z = z10/10 (x > y) sao cho P(XYZ) và P(ít nhất 1) có tối đa 3 chữ số thập phân',
    paramSpecs: [
      { name: 'x20', label: '20·x (x = x20/20)', min: 10, max: 18 },
      { name: 'y20', label: '20·y (y = y20/20)', min: 6, max: 17 },
      { name: 'z10', label: '10·z (z = z10/10)', min: 4, max: 7 },
    ],
    validateCode: `
      const { x20, y20, z10 } = params;
      if (!Number.isInteger(x20) || x20 < 10 || x20 > 18) return { valid: false, reason: 'x20 ngoài miền [10; 18]' };
      if (!Number.isInteger(y20) || y20 < 6 || y20 > 17) return { valid: false, reason: 'y20 ngoài miền [6; 17]' };
      if (!Number.isInteger(z10) || z10 < 4 || z10 > 7) return { valid: false, reason: 'z10 ngoài miền [4; 7]' };
      if (x20 <= y20) return { valid: false, reason: 'Cần x > y' };
      if ((x20 * y20 * z10) % 4 !== 0 || ((20 - x20) * (20 - y20) * (10 - z10)) % 4 !== 0) {
        return { valid: false, reason: 'Cần P(XYZ) và P(ít nhất 1) là số thập phân hữu hạn tối đa 3 chữ số' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x20, y20, z10 } = params;
      const x = x20 / 20, y = y20 / 20, z = z10 / 10;
      const pAll = (x20 * y20 * z10) / 4000;
      const pNone = ((20 - x20) * (20 - y20) * (10 - z10)) / 4000;
      const pUnion = Number((1 - pNone).toFixed(3));
      const xy = Number((x * y).toFixed(3));
      const oneMinusX_oneMinusY = Number(((1 - x) * (1 - y)).toFixed(3));
      const xPlusY = Number((x + y).toFixed(2));
      const ans = Math.round(x * (1 - y) * (1 - z) * 100 + 1e-9) / 100;

      const fmtTrim3 = (v) => u.formatNumberVN(Number(v.toFixed(3)), 3);
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một nhóm học sinh làm thí nghiệm gieo ba loại hạt giống $X, Y$ và $Z$ độc lập với nhau. Xác suất để ba loại hạt giống $X, Y$ và $Z$ nảy mầm tương ứng là $x, y$ và $' + fmtTrim3(z) + '$ ($x > y$). Biết rằng xác suất để ít nhất một trong ba hạt giống nảy mầm là $' + fmtTrim3(pUnion) + '$ và xác suất để cả ba hạt giống đều nảy mầm là $' + fmtTrim3(pAll) + '$. Tính xác suất để chỉ có duy nhất hạt giống $X$ nảy mầm (làm tròn kết quả đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $P(XYZ) = ' + fmtTrim3(z) + 'xy = ' + fmtTrim3(pAll) + ' \\Rightarrow xy = ' + fmtTrim3(xy) + '$.',
          'Mặt khác $1 - (1 - x)(1 - y)(1 - ' + fmtTrim3(z) + ') = ' + fmtTrim3(pUnion) + ' \\Rightarrow (1 - x)(1 - y) = ' + fmtTrim3(oneMinusX_oneMinusY) + ' \\Rightarrow 1 - x - y + xy = ' + fmtTrim3(oneMinusX_oneMinusY) + ' \\Rightarrow x + y = ' + fmt2(xPlusY) + '$.',
          'Vì $x > y$ nên giải hệ $x + y = ' + fmt2(xPlusY) + ',\\, xy = ' + fmtTrim3(xy) + '$ được $x = ' + fmt2(x) + ',\\, y = ' + fmt2(y) + '$.',
          'Xác suất chỉ có duy nhất hạt giống $X$ nảy mầm là $x(1 - y)(1 - ' + fmtTrim3(z) + ') = ' + fmt2(x) + ' \\cdot ' + fmt2(1 - y) + ' \\cdot ' + fmtTrim3(1 - z) + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x ≤ y', params: { x20: 10, y20: 12, z10: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (0,85; 0,50; 0,6 -> 0,17)', params: { x20: 17, y20: 10, z10: 6 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Ba cảm biến nhà thông minh X, Y, Z, tìm P(X Ȳ Z̄)
  t11_b30_d23_smart_home_sensors_only_x_sa: {
    id: 't11_b30_d23_smart_home_sensors_only_x_sa',
    name: 'Tính xác suất duy nhất cảm biến X hoạt động thành công',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Kiểm tra ba cảm biến nhà thông minh X, Y, Z hoạt động độc lập với xác suất x > y và z. Biết P(ít nhất 1) và P(cả 3), tính xác suất chỉ cảm biến X thành công.',
    conditionSummary: 'x = x20/20, y = y20/20, z = z10/10 (x > y) sao cho P(XYZ) và P(ít nhất 1) có tối đa 3 chữ số thập phân',
    paramSpecs: [
      { name: 'x20', label: '20·x (x = x20/20)', min: 10, max: 18 },
      { name: 'y20', label: '20·y (y = y20/20)', min: 6, max: 17 },
      { name: 'z10', label: '10·z (z = z10/10)', min: 4, max: 7 },
    ],
    validateCode: `
      const { x20, y20, z10 } = params;
      if (!Number.isInteger(x20) || x20 < 10 || x20 > 18) return { valid: false, reason: 'x20 ngoài miền [10; 18]' };
      if (!Number.isInteger(y20) || y20 < 6 || y20 > 17) return { valid: false, reason: 'y20 ngoài miền [6; 17]' };
      if (!Number.isInteger(z10) || z10 < 4 || z10 > 7) return { valid: false, reason: 'z10 ngoài miền [4; 7]' };
      if (x20 <= y20) return { valid: false, reason: 'Cần x > y' };
      if ((x20 * y20 * z10) % 4 !== 0 || ((20 - x20) * (20 - y20) * (10 - z10)) % 4 !== 0) {
        return { valid: false, reason: 'Cần P(XYZ) và P(ít nhất 1) là số thập phân hữu hạn tối đa 3 chữ số' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x20, y20, z10 } = params;
      const x = x20 / 20, y = y20 / 20, z = z10 / 10;
      const pAll = (x20 * y20 * z10) / 4000;
      const pNone = ((20 - x20) * (20 - y20) * (10 - z10)) / 4000;
      const pUnion = Number((1 - pNone).toFixed(3));
      const xy = Number((x * y).toFixed(3));
      const oneMinusX_oneMinusY = Number(((1 - x) * (1 - y)).toFixed(3));
      const xPlusY = Number((x + y).toFixed(2));
      const ans = Math.round(x * (1 - y) * (1 - z) * 100 + 1e-9) / 100;

      const fmtTrim3 = (v) => u.formatNumberVN(Number(v.toFixed(3)), 3);
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Người ta làm thí nghiệm kiểm tra khả năng hoạt động thành công của ba cảm biến trong hệ thống nhà thông minh $X, Y$ và $Z$ (độc lập nhau). Xác suất để các cảm biến $X, Y$ và $Z$ hoạt động thành công tương ứng là $x, y$ và $' + fmt2(z) + '$ ($x > y$). Biết rằng xác suất để ít nhất một trong ba cảm biến hoạt động thành công là $' + fmtTrim3(pUnion) + '$ và xác suất để cả ba cảm biến đều hoạt động thành công là $' + fmtTrim3(pAll) + '$. Tính xác suất để chỉ có duy nhất cảm biến $X$ hoạt động thành công (làm tròn kết quả đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $P(XYZ) = ' + fmt2(z) + 'xy = ' + fmtTrim3(pAll) + ' \\Rightarrow xy = ' + fmtTrim3(xy) + '$.',
          'Mặt khác $1 - (1 - x)(1 - y)(1 - ' + fmt2(z) + ') = ' + fmtTrim3(pUnion) + ' \\Rightarrow (1 - x)(1 - y) = ' + fmtTrim3(oneMinusX_oneMinusY) + ' \\Rightarrow x + y = ' + fmt2(xPlusY) + '$.',
          'Do đó $x, y$ là hai nghiệm của phương trình $t^2 - ' + fmt2(xPlusY) + 't + ' + fmtTrim3(xy) + ' = 0$. Vì $x > y$ nên $x = ' + fmt2(x) + ',\\, y = ' + fmt2(y) + '$.',
          'Xác suất chỉ có duy nhất cảm biến $X$ hoạt động thành công là $x(1 - y)(1 - ' + fmt2(z) + ') = ' + fmt2(x) + ' \\cdot ' + fmt2(1 - y) + ' \\cdot ' + fmt2(1 - z) + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên không chẵn 3 chữ số', params: { x20: 11, y20: 7, z10: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (0,65; 0,50; 0,60 -> 0,13)', params: { x20: 13, y20: 10, z10: 6 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Gieo xúc xắc chọn hộp I hoặc II rồi rút 1 quả cầu đỏ
  t11_b30_d24_die_select_urn_sa: {
    id: 't11_b30_d24_die_select_urn_sa',
    name: 'Xác suất lấy được quả cầu đỏ qua phép thử gieo xúc xắc chọn hộp',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức nhân xác suất',
    description: 'Gieo một con xúc xắc để chọn hộp I hoặc hộp II rồi lấy ngẫu nhiên 1 quả cầu. Tính xác suất lấy được quả cầu màu đỏ.',
    conditionSummary: 'condIdx ∈ [0; 2], r1, b1, r2, b2 ∈ [2; 12]',
    paramSpecs: [
      { name: 'condIdx', label: 'Điều kiện mặt xúc xắc chọn hộp I (0..2)', min: 0, max: 2 },
      { name: 'r1', label: 'Số cầu đỏ hộp I', min: 2, max: 12 },
      { name: 'b1', label: 'Số cầu xanh hộp I', min: 2, max: 12 },
      { name: 'r2', label: 'Số cầu đỏ hộp II', min: 2, max: 12 },
      { name: 'b2', label: 'Số cầu xanh hộp II', min: 2, max: 12 },
    ],
    validateCode: `
      const { condIdx, r1, b1, r2, b2 } = params;
      if (!Number.isInteger(condIdx) || condIdx < 0 || condIdx > 2) return { valid: false, reason: 'condIdx ngoài miền [0; 2]' };
      for (const v of [r1, b1, r2, b2]) {
        if (!Number.isInteger(v) || v < 2 || v > 12) return { valid: false, reason: 'Số quả cầu ngoài miền [2; 12]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { condIdx, r1, b1, r2, b2 } = params;
      const CONDS = [
        { k: 1, text: 'được mặt $1$ chấm' },
        { k: 2, text: 'được mặt có số chấm chia hết cho $3$' },
        { k: 3, text: 'được mặt có số chấm chẵn' },
      ];
      const cond = CONDS[condIdx];
      const n1 = r1 + b1, n2 = r2 + b2;
      const pA = u.simplifyFrac(cond.k, 6);
      const pNotA = u.simplifyFrac(6 - cond.k, 6);
      const pC = u.simplifyFrac(r1, n1);
      const pD = u.simplifyFrac(r2, n2);

      const totNum = cond.k * r1 * n2 + (6 - cond.k) * r2 * n1;
      const totDen = 6 * n1 * n2;
      const pTot = u.simplifyFrac(totNum, totDen);
      const ans = Math.floor((200 * totNum + totDen) / (2 * totDen)) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Có $2$ hộp, hộp I đựng $' + r1 + '$ quả cầu màu đỏ và $' + b1 + '$ quả cầu màu xanh, hộp II đựng $' + r2 + '$ quả cầu màu đỏ và $' + b2 + '$ quả cầu màu xanh. Gieo một con xúc xắc cân đối đồng chất, nếu ' + cond.text + ' thì lấy một quả cầu từ hộp I, nếu mặt khác thì lấy một quả cầu từ hộp II. Xác suất để lấy được quả cầu màu đỏ bằng bao nhiêu (làm tròn kết quả đến hàng phần trăm)?',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $A$ là biến cố chọn hộp I, ta có $P(A) = ' + pA.latex + '$ và $P(\\overline{A}) = ' + pNotA.latex + '$.',
          'Xác suất lấy được quả cầu đỏ từ hộp I là $P(C) = ' + pC.latex + '$, từ hộp II là $P(D) = ' + pD.latex + '$.',
          'Áp dụng công thức cộng và nhân xác suất: $P(B) = P(A)P(C) + P(\\overline{A})P(D) = ' + pA.latex + ' \\cdot ' + pC.latex + ' + ' + pNotA.latex + ' \\cdot ' + pD.latex + ' = ' + pTot.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên condIdx = 3', params: { condIdx: 3, r1: 7, b1: 10, r2: 3, b2: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (r1=7,b1=10,r2=3,b2=9 -> 0,28)', params: { condIdx: 0, r1: 7, b1: 10, r2: 3, b2: 9 }, expectedValid: true },
    ],
  },
};
