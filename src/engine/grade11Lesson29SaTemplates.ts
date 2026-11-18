import { MathTemplate } from '../types/math';

export const G11_B29_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D21 (Q21): Hai phần mềm diệt virus, tính xác suất phát hiện virus ít nhất 1 lần
  t11_b29_d21_antivirus_at_least_one_sa: {
    id: 't11_b29_d21_antivirus_at_least_one_sa',
    name: 'Xác suất phát hiện virus ít nhất một lần khi dùng hai phần mềm',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai phần mềm diệt virus độc lập với xác suất phát hiện p₁, p₂. Tính xác suất phát hiện ít nhất một lần.',
    conditionSummary: 'p1Int ∈ [60; 96], p2Int ∈ [55; 95]',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(phần mềm 1)', min: 60, max: 96 },
      { name: 'p2Int', label: '100·P(phần mềm 2)', min: 55, max: 95 },
    ],
    validateCode: `
      const { p1Int, p2Int } = params;
      if (!Number.isInteger(p1Int) || p1Int < 60 || p1Int > 96) return { valid: false, reason: 'p1Int ngoài miền [60; 96]' };
      if (!Number.isInteger(p2Int) || p2Int < 55 || p2Int > 95) return { valid: false, reason: 'p2Int ngoài miền [55; 95]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int } = params;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const qBoth = Number((q1 * q2).toFixed(4));
      const ans = Math.round((1 - qBoth) * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một người dùng thử hai phần mềm chống virus. Với phần mềm thứ nhất, xác suất phát hiện virus là $' + fmt2(p1) + '$, với phần mềm thứ hai, xác suất phát hiện virus là $' + fmt2(p2) + '$. Người dùng sử dụng lần lượt cả hai phần mềm một cách độc lập. Tính xác suất người dùng phát hiện được virus ít nhất một lần (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Xác suất không phát hiện virus của phần mềm thứ nhất và thứ hai lần lượt là $1 - ' + fmt2(p1) + ' = ' + fmt2(q1) + '$ và $1 - ' + fmt2(p2) + ' = ' + fmt2(q2) + '$.',
          'Vì hai lần kiểm tra độc lập nên xác suất không phát hiện virus cả hai lần là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' = ' + qBoth.toFixed(4).replace('.', ',') + '$.',
          'Xác suất phát hiện virus ít nhất một lần là $1 - ' + qBoth.toFixed(4).replace('.', ',') + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 50', params: { p1Int: 50, p2Int: 77 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q21 (0,93 và 0,77 -> 0,98)', params: { p1Int: 93, p2Int: 77 }, expectedValid: true },
    ],
  },

  // D22 (Q22): Mặt nạ dưỡng da & máy xông hơi, tính xác suất cải thiện ít nhất 1 lần
  t11_b29_d22_skincare_at_least_one_sa: {
    id: 't11_b29_d22_skincare_at_least_one_sa',
    name: 'Xác suất cải thiện làn da ít nhất một lần với hai dịch vụ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai dịch vụ chăm sóc da độc lập với xác suất cải thiện p₁, p₂. Tính xác suất cải thiện ít nhất một lần.',
    conditionSummary: 'p1Int ∈ [55; 95], p2Int ∈ [55; 95]',
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
      const ans = Math.round((1 - qBoth) * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một khách hàng trải nghiệm dịch vụ chăm sóc da. Khi sử dụng mặt nạ dưỡng da, xác suất cải thiện làn da là $' + fmt2(p1) + '$ còn khi sử dụng máy xông hơi da mặt, xác suất cải thiện là $' + fmt2(p2) + '$. Khách hàng sử dụng độc lập cả hai dịch vụ này một lần. Tính xác suất khách hàng cải thiện làn da ít nhất một lần (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Xác suất không cải thiện của hai dịch vụ lần lượt là $' + fmt2(q1) + '$ và $' + fmt2(q2) + '$.',
          'Xác suất cả hai dịch vụ đều không cải thiện làn da là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' = ' + qBoth.toFixed(4).replace('.', ',') + '$.',
          'Xác suất cải thiện làn da ít nhất một lần là $1 - ' + qBoth.toFixed(4).replace('.', ',') + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p2Int = 50', params: { p1Int: 80, p2Int: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q22 (0,80 và 0,77 -> 0,95)', params: { p1Int: 80, p2Int: 77 }, expectedValid: true },
    ],
  },

  // D23 (Q23): Hệ thống cảnh báo va chạm & phanh tự động
  t11_b29_d23_driving_safety_at_least_one_sa: {
    id: 't11_b29_d23_driving_safety_at_least_one_sa',
    name: 'Xác suất tránh tai nạn ít nhất một lần khi dùng hai hệ thống an toàn',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Hai hệ thống an toàn ô tô hoạt động độc lập với xác suất tránh tai nạn p₁, p₂. Tính xác suất tránh được ít nhất một lần.',
    conditionSummary: 'p1Int ∈ [60; 95], p2Int ∈ [60; 95]',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(cảnh báo va chạm)', min: 60, max: 95 },
      { name: 'p2Int', label: '100·P(phanh tự động)', min: 60, max: 95 },
    ],
    validateCode: `
      const { p1Int, p2Int } = params;
      if (!Number.isInteger(p1Int) || p1Int < 60 || p1Int > 95) return { valid: false, reason: 'p1Int ngoài miền [60; 95]' };
      if (!Number.isInteger(p2Int) || p2Int < 60 || p2Int > 95) return { valid: false, reason: 'p2Int ngoài miền [60; 95]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int } = params;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const qBoth = Number((q1 * q2).toFixed(4));
      const ans = Math.round((1 - qBoth) * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một người lái xe ô tô đi qua hai đoạn đường. Nếu bật hệ thống cảnh báo va chạm, xác suất tránh được tai nạn là $' + fmt2(p1) + '$ còn nếu chỉ dùng hệ thống phanh tự động, xác suất tránh được tai nạn là $' + fmt2(p2) + '$. Người lái xe sử dụng lần lượt hai hệ thống này một cách độc lập trên hai đoạn đường. Tính xác suất người đó tránh được tai nạn ít nhất một lần (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Xác suất không tránh được tai nạn ở mỗi hệ thống lần lượt là $' + fmt2(q1) + '$ và $' + fmt2(q2) + '$.',
          'Xác suất không tránh được tai nạn ở cả hai lần là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' = ' + qBoth.toFixed(4).replace('.', ',') + '$.',
          'Xác suất tránh được tai nạn ít nhất một lần là $1 - ' + qBoth.toFixed(4).replace('.', ',') + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1Int = 55', params: { p1Int: 55, p2Int: 84 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23 (0,81 và 0,84 -> 0,97)', params: { p1Int: 81, p2Int: 84 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Đề trắc nghiệm N câu gồm 3 mức độ, tính xác suất làm trọn vẹn đề
  t11_b29_d24_exam_all_three_levels_sa: {
    id: 't11_b29_d24_exam_all_three_levels_sa',
    name: 'Xác suất làm trọn vẹn đề trắc nghiệm gồm ba mức độ độc lập',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Tính xác suất học sinh làm trọn vẹn đề thi khi khả năng hoàn thành mỗi mức độ (nhận biết, thông hiểu, vận dụng) độc lập là p₁, p₂, p₃.',
    conditionSummary: 'n1 ∈ [5; 15], n2 ∈ [8; 18], n3 ∈ [15; 30], p1Int ∈ [60; 95], p2Int ∈ [55; 90], p3Int ∈ [35; 75]',
    paramSpecs: [
      { name: 'n1', label: 'Số câu nhận biết', min: 5, max: 15 },
      { name: 'n2', label: 'Số câu thông hiểu', min: 8, max: 18 },
      { name: 'n3', label: 'Số câu vận dụng', min: 15, max: 30 },
      { name: 'p1Int', label: '100·P(nhận biết)', min: 60, max: 95 },
      { name: 'p2Int', label: '100·P(thông hiểu)', min: 55, max: 90 },
      { name: 'p3Int', label: '100·P(vận dụng)', min: 35, max: 75 },
    ],
    validateCode: `
      const { n1, n2, n3, p1Int, p2Int, p3Int } = params;
      if (!Number.isInteger(n1) || n1 < 5 || n1 > 15) return { valid: false, reason: 'n1 ngoài miền [5; 15]' };
      if (!Number.isInteger(n2) || n2 < 8 || n2 > 18) return { valid: false, reason: 'n2 ngoài miền [8; 18]' };
      if (!Number.isInteger(n3) || n3 < 15 || n3 > 30) return { valid: false, reason: 'n3 ngoài miền [15; 30]' };
      if (!Number.isInteger(p1Int) || p1Int < 60 || p1Int > 95) return { valid: false, reason: 'p1Int ngoài miền [60; 95]' };
      if (!Number.isInteger(p2Int) || p2Int < 55 || p2Int > 90) return { valid: false, reason: 'p2Int ngoài miền [55; 90]' };
      if (!Number.isInteger(p3Int) || p3Int < 35 || p3Int > 75) return { valid: false, reason: 'p3Int ngoài miền [35; 75]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, n3, p1Int, p2Int, p3Int } = params;
      const total = n1 + n2 + n3;
      const p1 = p1Int / 100, p2 = p2Int / 100, p3 = p3Int / 100;
      const ans = Math.round(p1 * p2 * p3 * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một đề trắc nghiệm có $' + total + '$ câu hỏi gồm $' + n1 + '$ câu mức độ nhận biết, $' + n2 + '$ câu mức độ thông hiểu và $' + n3 + '$ câu mức độ vận dụng. Xác suất để bạn Thảo làm hết các câu mức độ nhận biết là $' + fmt2(p1) + '$; làm hết các câu mức độ thông hiểu là $' + fmt2(p2) + '$; và làm hết các câu mức độ vận dụng là $' + fmt2(p3) + '$ (độc lập nhau). Tính xác suất để bạn Thảo làm trọn vẹn $' + total + '$ câu (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $A, B, C$ lần lượt là các biến cố bạn Thảo làm hết các câu mức độ nhận biết, thông hiểu và vận dụng.',
          'Ta có $P(A) = ' + fmt2(p1) + ', P(B) = ' + fmt2(p2) + ', P(C) = ' + fmt2(p3) + '$.',
          'Vì các biến cố độc lập nên $P(A \\cap B \\cap C) = P(A)P(B)P(C) = ' + fmt2(p1) + ' \\cdot ' + fmt2(p2) + ' \\cdot ' + fmt2(p3) + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p3Int = 30', params: { n1: 7, n2: 10, n3: 28, p1Int: 75, p2Int: 77, p3Int: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24 (0,75·0,77·0,57 -> 0,33)', params: { n1: 7, n2: 10, n3: 28, p1Int: 75, p2Int: 77, p3Int: 57 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Xác suất lây bệnh truyền nhiễm qua hai lần tiếp xúc (có/không đeo khẩu trang)
  t11_b29_d25_mask_infection_prob_sa: {
    id: 't11_b29_d25_mask_infection_prob_sa',
    name: 'Xác suất lây bệnh truyền nhiễm khi tiếp xúc hai lần có và không đeo khẩu trang',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Tiếp xúc người bệnh hai lần độc lập (1 lần không đeo khẩu trang xác suất lây p₁, 1 lần có đeo xác suất lây p₂). Tính xác suất bị lây.',
    conditionSummary: 'p1Int ∈ [60; 95], p2Int ∈ [2; 25]',
    paramSpecs: [
      { name: 'p1Int', label: '100·P(lây khi không đeo khẩu trang)', min: 60, max: 95 },
      { name: 'p2Int', label: '100·P(lây khi có đeo khẩu trang)', min: 2, max: 25 },
    ],
    validateCode: `
      const { p1Int, p2Int } = params;
      if (!Number.isInteger(p1Int) || p1Int < 60 || p1Int > 95) return { valid: false, reason: 'p1Int ngoài miền [60; 95]' };
      if (!Number.isInteger(p2Int) || p2Int < 2 || p2Int > 25) return { valid: false, reason: 'p2Int ngoài miền [2; 25]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int } = params;
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const q1 = (100 - p1Int) / 100, q2 = (100 - p2Int) / 100;
      const qBoth = Number((q1 * q2).toFixed(4));
      const ans = Math.round((1 - qBoth) * 100) / 100;
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một bệnh truyền nhiễm có xác suất lây bệnh là $' + fmt2(p1) + '$ nếu tiếp xúc với người bệnh mà không đeo khẩu trang và là $' + fmt2(p2) + '$ nếu tiếp xúc với người bệnh mà có đeo khẩu trang. Ông Nam tiếp xúc với người bệnh hai lần độc lập, trong đó có một lần không đeo khẩu trang và một lần có đeo khẩu trang. Xác suất ông Nam bị bệnh do lây từ người bệnh đã tiếp xúc là bao nhiêu? (kết quả làm tròn đến hàng phần trăm)',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Xác suất không bị lây trong lần không đeo khẩu trang là $1 - ' + fmt2(p1) + ' = ' + fmt2(q1) + '$, trong lần có đeo khẩu trang là $1 - ' + fmt2(p2) + ' = ' + fmt2(q2) + '$.',
          'Do hai lần tiếp xúc độc lập nên xác suất không bị lây cả hai lần là $' + fmt2(q1) + ' \\cdot ' + fmt2(q2) + ' = ' + qBoth.toFixed(4).replace('.', ',') + '$.',
          'Xác suất ông Nam bị lây bệnh là $1 - ' + qBoth.toFixed(4).replace('.', ',') + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p2Int = 30', params: { p1Int: 86, p2Int: 30 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25 (0,86 và 0,05 -> 0,87)', params: { p1Int: 86, p2Int: 5 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Trò chơi gồm n ô, có đúng 1 ô may mắn, mở không hoàn lại ở lần thứ k
  t11_b29_d26_lucky_box_kth_try_sa: {
    id: 't11_b29_d26_lucky_box_kth_try_sa',
    name: 'Xác suất mở được ô may mắn ở lần thứ k (mở không hoàn lại)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng xác suất',
    description: 'Trò chơi gồm n ô giống nhau với đúng 1 ô may mắn. Tính xác suất mở được ô may mắn ở lần thử thứ k.',
    conditionSummary: 'n ∈ [5; 20], k ∈ [2; 4], k < n',
    paramSpecs: [
      { name: 'n', label: 'Tổng số ô lựa chọn n', min: 5, max: 20 },
      { name: 'k', label: 'Thứ tự lần mở k', min: 2, max: 4 },
    ],
    validateCode: `
      const { n, k } = params;
      if (!Number.isInteger(n) || n < 5 || n > 20) return { valid: false, reason: 'n ngoài miền [5; 20]' };
      if (!Number.isInteger(k) || k < 2 || k > 4) return { valid: false, reason: 'k ngoài miền [2; 4]' };
      if (k >= n) return { valid: false, reason: 'Cần k < n' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, k } = params;
      const ans = Math.round((1 / n) * 100) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      const factors = [];
      for (let i = 0; i < k - 1; i++) {
        factors.push('\\dfrac{' + (n - 1 - i) + '}{' + (n - i) + '}');
      }
      factors.push('\\dfrac{1}{' + (n - k + 1) + '}');

      return {
        stem: 'Một trò chơi gồm $' + n + '$ ô lựa chọn, bề ngoài của chúng giống hệt nhau và chỉ có đúng một ô may mắn. Người chơi thử ngẫu nhiên từng ô (mỗi ô chỉ mở một lần). Tính xác suất để người đó mở được ô may mắn ở lần thứ $' + k + '$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Để mở được ô may mắn ở lần thứ $' + k + '$, người chơi phải không mở trúng ô may mắn ở $' + (k - 1) + '$ lần đầu và mở trúng ở lần thứ $' + k + '$.',
          'Theo quy tắc nhân xác suất, xác suất cần tìm là: $P = ' + factors.join(' \\cdot ') + ' = \\dfrac{1}{' + n + '} \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 4', params: { n: 4, k: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26 (n=10, k=2 -> 0,10)', params: { n: 10, k: 2 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Hai hộp bi xanh và đỏ, biết tổng số bi N và xác suất lấy 2 bi xanh, tính a + b của P(2 đỏ)
  t11_b29_d27_two_urns_red_balls_sa: {
    id: 't11_b29_d27_two_urns_red_balls_sa',
    name: 'Bài toán ngược xác suất lấy hai bi đỏ từ hai hộp bi xanh đỏ',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho tổng số bi của hai hộp, biết hộp 1 nhiều bi hơn hộp 2 và số bi xanh hộp 1 nhiều hơn hộp 2, cùng xác suất lấy 2 bi xanh. Tính a + b với xác suất lấy 2 bi đỏ là phân số tối giản a/b.',
    conditionSummary: 'n2 ∈ [4; 8], d ∈ [1; 4] (n1 = n2 + d), x2 ∈ [2; n2 - 1], x1 ∈ [x2 + 1; n1 - 1], nghiệm duy nhất',
    paramSpecs: [
      { name: 'n2', label: 'Số bi hộp thứ hai n₂', min: 4, max: 8 },
      { name: 'd', label: 'Hiệu số bi hai hộp (n₁ - n₂)', min: 1, max: 4 },
      { name: 'x2', label: 'Số bi xanh hộp hai x₂', min: 2, max: 7 },
      { name: 'x1', label: 'Số bi xanh hộp một x₁', min: 3, max: 11 },
    ],
    validateCode: `
      const { n2, d, x2, x1 } = params;
      if (!Number.isInteger(n2) || n2 < 4 || n2 > 8) return { valid: false, reason: 'n2 ngoài miền [4; 8]' };
      if (!Number.isInteger(d) || d < 1 || d > 4) return { valid: false, reason: 'd ngoài miền [1; 4]' };
      const n1 = n2 + d;
      if (!Number.isInteger(x2) || x2 < 2 || x2 >= n2) return { valid: false, reason: 'Cần 2 ≤ x2 < n2' };
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

      const pairsTex = [];
      for (let a2 = n2 - 2; a2 >= 1 && pairsTex.length < 6; a2--) {
        // list descending a1 from N-1 or symmetric pairs n1>n2
      }
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
          'Gọi hộp thứ nhất có $n_1$ bi ($x_1$ bi xanh), hộp thứ hai có $n_2$ bi ($x_2$ bi xanh). Ta có $n_1 + n_2 = ' + N + ', n_1 > n_2, x_1 > x_2$.',
          'Các cặp $(n_1; n_2)$ khả dĩ là ' + allPairs.join(', ') + '. Thử điều kiện $\\dfrac{x_1 x_2}{n_1 n_2} = ' + gFrac.latex + '$ với $1 \\le x_1 < n_1, 1 \\le x_2 < n_2, x_1 > x_2$, ta được nghiệm duy nhất $(n_1; n_2) = (' + n1 + '; ' + n2 + ')$ và $(x_1; x_2) = (' + x1 + '; ' + x2 + ')$.',
          'Số bi đỏ ở hai hộp lần lượt là $' + n1 + ' - ' + x1 + ' = ' + r1 + '$ và $' + n2 + ' - ' + x2 + ' = ' + r2 + '$.',
          'Xác suất lấy được $2$ bi đỏ là $\\dfrac{' + r1 + '}{' + n1 + '} \\cdot \\dfrac{' + r2 + '}{' + n2 + '} = ' + redFrac.latex + ' \\Rightarrow a = ' + redFrac.num + ', b = ' + redFrac.den + '$. Vậy $a + b = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x1 ≤ x2', params: { n2: 6, d: 2, x2: 5, x1: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27 (n2=6, d=2, x2=5, x1=7 -> 49)', params: { n2: 6, d: 2, x2: 5, x1: 7 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Thí nghiệm 3 hạt giống X, Y, Z: biết P(ít nhất 1), P(cả 3) và P(Z), tìm P(X Ȳ Z̄)
  t11_b29_d28_three_seeds_only_x_sa: {
    id: 't11_b29_d28_three_seeds_only_x_sa',
    name: 'Tính xác suất duy nhất hạt giống X nảy mầm từ xác suất hợp và giao',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Cho ba hạt giống X, Y, Z nảy mầm độc lập với xác suất x > y và z cho trước. Biết P(ít nhất 1) và P(cả 3), tính xác suất chỉ duy nhất X nảy mầm.',
    conditionSummary: 'x = x20/20, y = y20/20, z = z10/10 (x > y) sao cho P(XYZ) và P(X ∪ Y ∪ Z) là số thập phân đúng đến hàng phần trăm',
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
      if ((x20 * y20 * z10) % 40 !== 0 || ((20 - x20) * (20 - y20) * (10 - z10)) % 40 !== 0) {
        return { valid: false, reason: 'Cần P(XYZ) và P(ít nhất 1) là số thập phân đúng 2 chữ số' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x20, y20, z10 } = params;
      const x = x20 / 20, y = y20 / 20, z = z10 / 10;
      const pAll = (x20 * y20 * z10) / 4000;
      const pNone = ((20 - x20) * (20 - y20) * (10 - z10)) / 4000;
      const pUnion = 1 - pNone;
      const xy = Number((x * y).toFixed(2));
      const oneMinusX_oneMinusY = Number(((1 - x) * (1 - y)).toFixed(2));
      const xPlusY = Number((x + y).toFixed(2));
      const ans = Math.round(x * (1 - y) * (1 - z) * 100) / 100;

      const fmtTrim = (v) => String(Number(v.toFixed(2))).replace('.', ',');
      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Một nhóm học sinh làm thí nghiệm gieo ba loại hạt giống $X, Y$ và $Z$ độc lập với nhau. Xác suất để ba loại hạt giống $X, Y$ và $Z$ nảy mầm tương ứng là $x, y$ và $' + fmtTrim(z) + '$ ($x > y$). Biết rằng xác suất để ít nhất một trong ba hạt giống nảy mầm là $' + fmt2(pUnion) + '$ và xác suất để cả ba hạt giống đều nảy mầm là $' + fmt2(pAll) + '$. Tính xác suất để chỉ có duy nhất hạt giống $X$ nảy mầm (làm tròn kết quả đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $P(XYZ) = ' + fmtTrim(z) + 'xy = ' + fmt2(pAll) + ' \\Rightarrow xy = ' + fmt2(xy) + '$.',
          'Mặt khác $1 - (1 - x)(1 - y)(1 - ' + fmtTrim(z) + ') = ' + fmt2(pUnion) + ' \\Rightarrow (1 - x)(1 - y) = ' + fmt2(oneMinusX_oneMinusY) + ' \\Rightarrow 1 - (x + y) + xy = ' + fmt2(oneMinusX_oneMinusY) + ' \\Rightarrow x + y = ' + fmt2(xPlusY) + '$.',
          'Vì $x > y$ nên giải hệ $x + y = ' + fmt2(xPlusY) + ', xy = ' + fmt2(xy) + '$ được $x = ' + fmt2(x) + ', y = ' + fmt2(y) + '$.',
          'Xác suất chỉ có duy nhất hạt giống $X$ nảy mầm là $x(1 - y)(1 - ' + fmtTrim(z) + ') = ' + fmt2(x) + ' \\cdot ' + fmt2(1 - y) + ' \\cdot ' + fmtTrim(1 - z) + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x ≤ y', params: { x20: 10, y20: 12, z10: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28 (0,75; 0,40; 0,6 -> 0,18)', params: { x20: 15, y20: 8, z10: 6 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Ba mô-đun trí tuệ nhân tạo X, Y, Z: biết P(ít nhất 1), P(cả 3) và P(Z), tìm P(X Ȳ Z̄)
  t11_b29_d29_ai_modules_only_x_sa: {
    id: 't11_b29_d29_ai_modules_only_x_sa',
    name: 'Tính xác suất duy nhất mô-đun X hoạt động thành công',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Kiểm tra ba mô-đun AI X, Y, Z hoạt động độc lập với xác suất thành công x > y và z. Biết P(ít nhất 1) và P(cả 3), tính xác suất chỉ mô-đun X thành công.',
    conditionSummary: 'x = x20/20, y = y20/20, z = z10/10 (x > y) sao cho P(XYZ) và P(X ∪ Y ∪ Z) là số thập phân đúng đến hàng phần trăm',
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
      if ((x20 * y20 * z10) % 40 !== 0 || ((20 - x20) * (20 - y20) * (10 - z10)) % 40 !== 0) {
        return { valid: false, reason: 'Cần P(XYZ) và P(ít nhất 1) là số thập phân đúng 2 chữ số' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x20, y20, z10 } = params;
      const x = x20 / 20, y = y20 / 20, z = z10 / 10;
      const pAll = (x20 * y20 * z10) / 4000;
      const pNone = ((20 - x20) * (20 - y20) * (10 - z10)) / 4000;
      const pUnion = 1 - pNone;
      const xy = Number((x * y).toFixed(2));
      const oneMinusX_oneMinusY = Number(((1 - x) * (1 - y)).toFixed(2));
      const xPlusY = Number((x + y).toFixed(2));
      const ans = Math.round(x * (1 - y) * (1 - z) * 100) / 100;

      const fmt2 = (v) => v.toFixed(2).replace('.', ',');
      const ansStr = fmt2(ans);

      return {
        stem: 'Người ta làm thí nghiệm kiểm tra khả năng hoạt động thành công độc lập của ba mô-đun trí tuệ nhân tạo $X, Y$ và $Z$. Xác suất để các mô-đun $X, Y$ và $Z$ hoạt động thành công tương ứng là $x, y$ và $' + fmt2(z) + '$ ($x > y$). Biết rằng xác suất để ít nhất một trong ba mô-đun hoạt động thành công là $' + fmt2(pUnion) + '$ và xác suất để cả ba mô-đun đều hoạt động thành công là $' + fmt2(pAll) + '$. Tính xác suất để chỉ có duy nhất mô-đun $X$ hoạt động thành công (làm tròn kết quả đến hàng phần trăm).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Ta có $P(XYZ) = ' + fmt2(z) + 'xy = ' + fmt2(pAll) + ' \\Rightarrow xy = ' + fmt2(xy) + '$.',
          'Mặt khác $1 - (1 - x)(1 - y)(1 - ' + fmt2(z) + ') = ' + fmt2(pUnion) + ' \\Rightarrow (1 - x)(1 - y) = ' + fmt2(oneMinusX_oneMinusY) + ' \\Rightarrow x + y = ' + fmt2(xPlusY) + '$.',
          'Do đó $x, y$ là hai nghiệm của phương trình $t^2 - ' + fmt2(xPlusY) + 't + ' + fmt2(xy) + ' = 0$. Vì $x > y$ nên $x = ' + fmt2(x) + ', y = ' + fmt2(y) + '$.',
          'Xác suất chỉ có duy nhất mô-đun $X$ hoạt động thành công là $x(1 - y)(1 - ' + fmt2(z) + ') = ' + fmt2(x) + ' \\cdot ' + fmt2(1 - y) + ' \\cdot ' + fmt2(1 - z) + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chia hết không chẵn phần trăm', params: { x20: 11, y20: 7, z10: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (0,60; 0,50; 0,60 -> 0,12)', params: { x20: 12, y20: 10, z10: 6 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Gieo xúc xắc chọn hộp I hoặc II rồi rút 1 bi đỏ (Công thức xác suất toàn phần cơ bản dùng cộng + nhân)
  t11_b29_d30_die_select_urn_sa: {
    id: 't11_b29_d30_die_select_urn_sa',
    name: 'Xác suất lấy được bi đỏ qua phép thử hai bước (gieo xúc xắc chọn hộp)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức cộng xác suất',
    description: 'Gieo một con xúc xắc để chọn hộp I hoặc hộp II rồi lấy ngẫu nhiên 1 viên bi. Tính xác suất lấy được viên bi màu đỏ.',
    conditionSummary: 'condIdx ∈ [0; 2], r1, b1, r2, b2 ∈ [2; 12]',
    paramSpecs: [
      { name: 'condIdx', label: 'Điều kiện mặt xúc xắc chọn hộp I (0..2)', min: 0, max: 2 },
      { name: 'r1', label: 'Số bi đỏ hộp I', min: 2, max: 10 },
      { name: 'b1', label: 'Số bi xanh hộp I', min: 2, max: 10 },
      { name: 'r2', label: 'Số bi đỏ hộp II', min: 2, max: 10 },
      { name: 'b2', label: 'Số bi xanh hộp II', min: 3, max: 12 },
    ],
    validateCode: `
      const { condIdx, r1, b1, r2, b2 } = params;
      if (!Number.isInteger(condIdx) || condIdx < 0 || condIdx > 2) return { valid: false, reason: 'condIdx ngoài miền [0; 2]' };
      for (const v of [r1, b1, r2]) {
        if (!Number.isInteger(v) || v < 2 || v > 10) return { valid: false, reason: 'Số bi ngoài miền [2; 10]' };
      }
      if (!Number.isInteger(b2) || b2 < 3 || b2 > 12) return { valid: false, reason: 'b2 ngoài miền [3; 12]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { condIdx, r1, b1, r2, b2 } = params;
      const CONDS = [
        { k: 1, text: 'được mặt $4$ chấm' },
        { k: 2, text: 'được mặt có số chấm chia hết cho $3$' },
        { k: 3, text: 'được mặt có số chấm chẵn' },
      ];
      const cond = CONDS[condIdx];
      const n1 = r1 + b1, n2 = r2 + b2;
      const pA = u.simplifyFrac(cond.k, 6);
      const pNotA = u.simplifyFrac(6 - cond.k, 6);
      const pC = u.simplifyFrac(r1, n1);
      const pD = u.simplifyFrac(r2, n2);

      // P = (k * r1) / (6 * n1) + ((6 - k) * r2) / (6 * n2)
      const totNum = cond.k * r1 * n2 + (6 - cond.k) * r2 * n1;
      const totDen = 6 * n1 * n2;
      const pTot = u.simplifyFrac(totNum, totDen);
      const ans = Math.round((totNum / totDen) * 100) / 100;
      const ansStr = ans.toFixed(2).replace('.', ',');

      return {
        stem: 'Có $2$ hộp, hộp I đựng $' + r1 + '$ viên bi màu đỏ và $' + b1 + '$ viên bi màu xanh, hộp II đựng $' + r2 + '$ viên bi màu đỏ và $' + b2 + '$ viên bi màu xanh. Gieo một con xúc xắc cân đối đồng chất, nếu ' + cond.text + ' thì lấy một viên bi từ hộp I, nếu ra mặt khác thì lấy một viên bi từ hộp II. Xác suất để lấy được viên bi màu đỏ bằng bao nhiêu (làm tròn kết quả đến hàng phần trăm)?',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr,
        solutionSteps: [
          'Gọi $A$ là biến cố chọn hộp I, ta có $P(A) = ' + pA.latex + '$ và $P(\\overline{A}) = ' + pNotA.latex + '$.',
          'Xác suất lấy được bi đỏ nếu chọn từ hộp I là $P(C) = ' + pC.latex + '$, nếu chọn từ hộp II là $P(D) = ' + pD.latex + '$.',
          'Vì hai biến cố xung khắc $AC$ và $\\overline{A}D$ hợp thành biến cố lấy được bi đỏ nên xác suất cần tìm là $P = P(A)P(C) + P(\\overline{A})P(D) = ' + pA.latex + ' \\cdot ' + pC.latex + ' + ' + pNotA.latex + ' \\cdot ' + pD.latex + ' = ' + pTot.latex + ' \\approx ' + ansStr + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên condIdx = 3', params: { condIdx: 3, r1: 6, b1: 3, r2: 5, b2: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (r1=6,b1=3,r2=5,b2=11 -> 0,37)', params: { condIdx: 0, r1: 6, b1: 3, r2: 5, b2: 11 }, expectedValid: true },
    ],
  },
};
