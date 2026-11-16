import { MathTemplate } from '../types/math';

export const G12_B5_TEMPLATES_PART2: Record<string, MathTemplate> = {
  // Dạng 28 (Q28)
  t12_b5_d28_open_tank_dim_sa: {
    id: 't12_b5_d28_open_tank_dim_sa',
    name: 'Tối ưu kích thước đáy bể nước hình hộp chữ nhật không nắp',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu vật liệu xây dựng',
    description:
      'Bể chứa nước hình hộp chữ nhật không nắp có thể tích V, một cạnh đáy bằng a. Tìm cạnh đáy còn lại x để diện tích xây dựng nhỏ nhất (làm tròn hàng phần mười).',
    conditionSummary: 'a = a10/10 > 0, V = v10/10 > 0',
    paramSpecs: [
      { name: 'a10', label: 'Cạnh đáy đã biết · 10 (m)', min: 9, max: 24 },
      { name: 'v10', label: 'Thể tích V · 10 (m³)', min: 28, max: 85 },
    ],
    validateCode: `
      const { a10, v10 } = params;
      if (a10 <= 0 || a10 > 200 || v10 <= 0 || v10 > 2000) return { valid: false, reason: 'Kích thước và thể tích phải dương hợp lý' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a10, v10 } = params;
      const a = Number((a10 / 10).toFixed(1));
      const V = Number((v10 / 10).toFixed(1));
      const twoV = Number((2 * V).toFixed(1));
      const xOpt = Math.sqrt(twoV / a);
      const ans = Number(xOpt.toFixed(1));
      const aStr = u.formatNumberVN(a, 1);
      const vStr = u.formatNumberVN(V, 1);
      const twoVStr = u.formatNumberVN(twoV, 1);
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem:
          'Ông Dũng dự định xây một cái bể chứa nước có dạng hình hộp chữ nhật không nắp. Biết đáy bể có một chiều bằng $' +
          aStr +
          '\\text{ m}$ và bể có thể tích là $' +
          vStr +
          '\\text{ m}^3$. Để diện tích xây dựng bể (4 mặt xung quanh và đáy) ít nhất thì chiều còn lại của đáy bể bằng bao nhiêu mét (kết quả làm tròn đến hàng phần mười)?',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' m',
        solutionSteps: [
          'Gọi $x$ (m) là chiều còn lại của đáy bể và $h$ (m) là chiều cao bể ($x > 0, h > 0$).',
          'Từ $V = ' + aStr + 'xh = ' + vStr + ' \\Rightarrow h = \\frac{' + vStr + '}{' + aStr + 'x}$.',
          'Diện tích xây dựng là $S(x) = 2xh + 2\\cdot' + aStr + 'h + ' + aStr + 'x = ' + aStr + 'x + \\frac{' + twoVStr + '}{x} + \\frac{' + twoVStr + '}{' + aStr + '}$.',
          "Giải $S'(x) = " + aStr + ' - \\frac{' + twoVStr + '}{x^2} = 0 \\Leftrightarrow x = \\sqrt{\\frac{' + twoVStr + '}{' + aStr + '}} \\approx ' + ansStr + '\\text{ m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (chia cho 0)', params: { a10: 0, v10: 39 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=1,1m, V=3,9m³ -> 2,7 m', params: { a10: 11, v10: 39 }, expectedValid: true },
    ],
  },

  // Dạng 29 (Q29)
  t12_b5_d29_classroom_paint_dim_sa: {
    id: 't12_b5_d29_classroom_paint_dim_sa',
    name: 'Tối ưu chiều dài phòng học để diện tích sơn tường và trần nhỏ nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu vật liệu xây dựng',
    description:
      'Phòng học hình hộp chữ nhật thể tích V, chiều rộng a, sơn 4 mặt xung quanh và trần (không sơn nền). Tìm chiều dài x để diện tích sơn nhỏ nhất.',
    conditionSummary: 'a = a10/10 ∈ [4; 8] m, V ∈ [180; 480] m³',
    paramSpecs: [
      { name: 'a10', label: 'Chiều rộng phòng · 10 (m)', min: 40, max: 80, step: 5 },
      { name: 'V', label: 'Thể tích phòng (m³)', min: 200, max: 420, step: 5 },
    ],
    validateCode: `
      const { a10, V } = params;
      if (a10 <= 0 || a10 > 300 || V <= 0 || V > 5000) return { valid: false, reason: 'Chiều rộng và thể tích phải dương hợp lý' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a10, V } = params;
      const a = Number((a10 / 10).toFixed(1));
      const twoA = Number((2 * a).toFixed(1));
      const twoV = 2 * V;
      const xOpt = Math.sqrt(twoV / a);
      const ans = Number(xOpt.toFixed(1));
      const aStr = u.formatNumberVN(a, 1);
      const twoAStr = u.formatNumberVN(twoA, 1);
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem:
          'Một trường học dự định xây một phòng học dạng hình hộp chữ nhật không có vách ngăn. Biết nền phòng học có chiều rộng bằng $' +
          aStr +
          '\\text{ m}$ và phòng học có thể tích là $' +
          V +
          '\\text{ m}^3$. Hãy tính chiều dài phòng học để diện tích sơn tường (4 mặt xung quanh và trần, không kể nền) là ít nhất (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' m',
        solutionSteps: [
          'Gọi $x, h$ (m) lần lượt là chiều dài và chiều cao phòng học ($x > 0, h > 0$).',
          'Ta có $V = ' + aStr + 'xh = ' + V + ' \\Rightarrow h = \\frac{' + V + '}{' + aStr + 'x}$.',
          'Diện tích cần sơn là $S(x) = h(2x + ' + twoAStr + ') + ' + aStr + 'x = ' + aStr + 'x + \\frac{' + twoV + '}{x} + \\frac{' + twoV + '}{' + aStr + '}$.',
          "Giải $S'(x) = " + aStr + ' - \\frac{' + twoV + '}{x^2} = 0 \\Leftrightarrow x = \\sqrt{\\frac{' + twoV + '}{' + aStr + '}} \\approx ' + ansStr + '\\text{ m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên chiều rộng = 0', params: { a10: 0, V: 325 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=5,5m, V=325m³ -> 10,9 m', params: { a10: 55, V: 325 }, expectedValid: true },
    ],
  },

  // Dạng 30 (Q30)
  t12_b5_d30_truck_bed_dim_sa: {
    id: 't12_b5_d30_truck_bed_dim_sa',
    name: 'Tối ưu chiều dài thùng xe tải hở 2 mặt (trên và sau)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu vật liệu cơ khí',
    description:
      'Thùng xe tải hình hộp chữ nhật hở mặt trên và mặt sau, chiều rộng a, thể tích V. Tìm chiều dài x để diện tích tôn làm thùng ít nhất (làm tròn hàng phần mười).',
    conditionSummary: 'a = a10/10 ∈ [2,0; 3,5] m, V ∈ [15; 45] m³',
    paramSpecs: [
      { name: 'a10', label: 'Chiều rộng thùng · 10 (m)', min: 20, max: 35 },
      { name: 'V', label: 'Thể tích thùng V (m³)', min: 15, max: 40 },
    ],
    validateCode: `
      const { a10, V } = params;
      if (a10 <= 0 || a10 > 200 || V <= 0 || V > 1000) return { valid: false, reason: 'Chiều rộng và thể tích phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a10, V } = params;
      const a = Number((a10 / 10).toFixed(1));
      const twoV = 2 * V;
      const xOpt = Math.sqrt(V / a);
      const ans = Number(xOpt.toFixed(1));
      const aStr = u.formatNumberVN(a, 1);
      const ansStr = u.formatNumberVN(ans, 1);

      return {
        stem:
          'Một hãng vận tải thiết kế thùng xe tải hình hộp chữ nhật (để trống mặt phía trên và mặt đằng sau). Chiều rộng của thùng bằng $' +
          aStr +
          '\\text{ m}$ và thể tích thùng là $' +
          V +
          '\\text{ m}^3$. Hãy tính chiều dài của thùng xe để diện tích tôn làm các mặt thùng xe là ít nhất (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' m',
        solutionSteps: [
          'Gọi $x, h$ (m) lần lượt là chiều dài và chiều cao của thùng xe ($x > 0, h > 0$).',
          'Thể tích thùng: $V = ' + aStr + 'xh = ' + V + ' \\Rightarrow h = \\frac{' + V + '}{' + aStr + 'x}$.',
          'Vì thùng để trống mặt trên và mặt sau nên chỉ còn mặt đáy, $2$ mặt bên và $1$ mặt trước: $S(x) = 2xh + ' + aStr + 'h + ' + aStr + 'x = ' + aStr + 'x + \\frac{' + V + '}{x} + \\frac{' + twoV + '}{' + aStr + '}$.',
          "Giải $S'(x) = " + aStr + ' - \\frac{' + V + '}{x^2} = 0 \\Leftrightarrow x = \\sqrt{\\frac{' + V + '}{' + aStr + '}} \\approx ' + ansStr + '\\text{ m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a10: 0, V: 23 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=2,7m, V=23m³ -> 2,9 m', params: { a10: 27, V: 23 }, expectedValid: true },
    ],
  },

  // Dạng 31 (Q31)
  t12_b5_d31_sq_box_side_from_area_sa: {
    id: 't12_b5_d31_sq_box_side_from_area_sa',
    name: 'Tìm cạnh đáy hộp chữ nhật không nắp đáy vuông biết diện tích bề mặt S',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu thể tích từ diện tích cho trước',
    description:
      'Hộp không nắp đáy vuông cạnh x, tổng diện tích bề mặt S cm². Tìm cạnh đáy x để thể tích hộp lớn nhất (làm tròn đến hàng phần mười).',
    conditionSummary: 'S ∈ [20; 300] cm²',
    paramSpecs: [
      { name: 'S', label: 'Diện tích bề mặt S (cm²)', min: 30, max: 140, step: 2 },
    ],
    validateCode: `
      const { S } = params;
      if (S <= 0 || S > 2000) return { valid: false, reason: 'Diện tích bề mặt S phải thuộc (0; 2000]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { S } = params;
      const xOpt = Math.sqrt(S / 3);
      const ans = Number(xOpt.toFixed(1));
      const ansStr = u.formatNumberVN(ans, 1);
      const sOver4 = u.simplifyFrac(S, 4);
      const sOver3 = u.simplifyFrac(S, 3);

      return {
        stem:
          'Một nhà sản xuất muốn thiết kế một chiếc hộp có dạng hình hộp chữ nhật không có nắp, có đáy là hình vuông và diện tích bề mặt bằng $' +
          S +
          '\\text{ cm}^2$. Tìm độ dài cạnh đáy (cm) để thể tích chiếc hộp là lớn nhất (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' cm',
        solutionSteps: [
          'Gọi $x$ (cm) là cạnh đáy hình vuông, $h$ (cm) là chiều cao hộp ($0 < x < \\sqrt{' + S + '}$).',
          'Từ $S = x^2 + 4xh = ' + S + ' \\Rightarrow h = \\frac{' + S + ' - x^2}{4x}$.',
          'Thể tích hộp là $V(x) = x^2 h = \\frac{' + S + 'x - x^3}{4}$.',
          "Đạo hàm $V'(x) = -" + '\\frac{3x^2}{4} + ' + sOver4.latex + ' = 0 \\Leftrightarrow x = \\sqrt{' + sOver3.latex + '} \\approx ' + ansStr + '\\text{ cm}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên S = 0', params: { S: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc S = 56 cm² -> 4,3 cm', params: { S: 56 }, expectedValid: true },
    ],
  },

  // Dạng 32 (Q32)
  t12_b5_d32_sq_box_max_vol_sa: {
    id: 't12_b5_d32_sq_box_max_vol_sa',
    name: 'Tìm thể tích lớn nhất của hộp chữ nhật không nắp đáy vuông biết S',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu thể tích từ diện tích cho trước',
    description:
      'Hộp không nắp đáy vuông, diện tích bề mặt S cm². Tính thể tích lớn nhất V_max đạt được (làm tròn đến hàng phần mười).',
    conditionSummary: 'S ∈ [20; 300] cm²',
    paramSpecs: [
      { name: 'S', label: 'Diện tích bề mặt S (cm²)', min: 36, max: 160, step: 2 },
    ],
    validateCode: `
      const { S } = params;
      if (S <= 0 || S > 2000) return { valid: false, reason: 'Diện tích bề mặt S phải thuộc (0; 2000]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { S } = params;
      const xOpt = Math.sqrt(S / 3);
      const vMax = (S * xOpt) / 6;
      const ans = Number(vMax.toFixed(1));
      const ansStr = u.formatNumberVN(ans, 1);
      const sOver4 = u.simplifyFrac(S, 4);
      const sOver3 = u.simplifyFrac(S, 3);

      return {
        stem:
          'Một nhà sản xuất muốn thiết kế một chiếc hộp có dạng hình hộp chữ nhật không có nắp, có đáy là hình vuông và diện tích bề mặt bằng $' +
          S +
          '\\text{ cm}^2$. Tìm thể tích lớn nhất ($\\text{cm}^3$) mà chiếc hộp đạt được (kết quả làm tròn đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' cm³',
        solutionSteps: [
          'Gọi $x$ (cm) là cạnh đáy hình vuông ($0 < x < \\sqrt{' + S + '}$), chiều cao $h = \\frac{' + S + ' - x^2}{4x}$.',
          'Thể tích chiếc hộp là $V(x) = x^2 h = \\frac{' + S + 'x - x^3}{4}$.',
          "Giải $V'(x) = -\\frac{3x^2}{4} + " + sOver4.latex + ' = 0 \\Rightarrow x = \\sqrt{' + sOver3.latex + '}$.',
          'Thể tích lớn nhất là $V_{\\max} = V\\left(\\sqrt{' + sOver3.latex + '}\\right) = \\frac{' + S + '}{6}\\sqrt{' + sOver3.latex + '} \\approx ' + ansStr + '\\text{ cm}^3$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên S = 0', params: { S: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc S = 68 cm² -> 54 cm³', params: { S: 68 }, expectedValid: true },
    ],
  },

  // Dạng 33 (Q33)
  t12_b5_d33_printers_opt_sa: {
    id: 't12_b5_d33_printers_opt_sa',
    name: 'Tìm số máy in để tổng chi phí in ấn thấp nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu chi phí rời rạc theo biến nguyên',
    description:
      'Xưởng có M máy in, năng suất r ấn phẩm/giờ, cài đặt C1/máy, kỹ sư C2/giờ, đơn hàng Q = r·H ấn phẩm. Tìm số máy nguyên tối ưu.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5',
    paramSpecs: [
      { name: 'maxM', label: 'Số máy hiện có M', min: 14, max: 22 },
      { name: 'rate', label: 'Năng suất/máy (ấn phẩm/h)', min: 15, max: 35, step: 5 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 240, max: 380, step: 20 },
      { name: 'c1k', label: 'Phí cài đặt/máy (nghìn đ)', min: 38, max: 58 },
      { name: 'c2k', label: 'Phí kỹ sư/giờ (nghìn đ)', min: 20, max: 38 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60 || rate <= 0 || rate > 500 || hours <= 0 || hours > 3000) return { valid: false, reason: 'Tham số ngoài miền chuẩn' };
      if (c1k <= 0 || c2k <= 0 || c1k > 2000 || c2k > 2000) return { valid: false, reason: 'Chi phí phải dương' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cực tiểu ngoài [4; M - 0.5]' };
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => c1k * x + (hours * c2k) / x;
      if (fl !== cl && Math.abs(f(fl) - f(cl)) < 1e-4) return { valid: false, reason: 'Chi phí hai điểm nguyên lân cận bằng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { maxM, rate, hours, c1k, c2k } = params;
      const Q = rate * hours;
      const C1 = c1k * 1000;
      const C2 = c2k * 1000;
      const K = hours * C2;
      const xCont = Math.sqrt(K / C1);
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => C1 * x + K / x;
      const xBest = f(fl) <= f(cl) ? fl : cl;

      return {
        stem:
          'Một xưởng in có $' +
          maxM +
          '$ máy in được cài đặt tự động và được giám sát bởi một kỹ sư, mỗi máy in có thể in được $' +
          rate +
          '$ ấn phẩm trong $1$ giờ. Chi phí cài đặt và bảo dưỡng cho mỗi máy in cho một đợt hàng là $' +
          C1 +
          '$ đồng. Chi phí trả cho kỹ sư giám sát là $' +
          C2 +
          '$ đồng/giờ. Đợt hàng này xưởng in nhận $' +
          Q +
          '$ ấn phẩm. Tìm số máy in cần sử dụng để tổng chi phí in ấn là thấp nhất.',
        shortAnswer: '' + xBest,
        numericValue: xBest,
        answerSummary: xBest + ' máy in',
        solutionSteps: [
          'Gọi $x$ là số máy in sử dụng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' + maxM + '$). Thời gian in là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ giờ.',
          'Tổng chi phí: $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$.',
          "Giải $f'(x) = 0 \\Leftrightarrow x = \\sqrt{\\frac{" + K + '}{' + C1 + '}} \\approx ' + u.formatNumberVN(xCont, 1) + '$.',
          'So sánh $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, suy ra số máy tối ưu là $' + xBest + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1k = 0', params: { maxM: 16, rate: 20, hours: 300, c1k: 0, c2k: 24 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (16 máy, 300h, 46k, 24k -> 13 máy)', params: { maxM: 16, rate: 20, hours: 300, c1k: 46, c2k: 24 }, expectedValid: true },
    ],
  },

  // Dạng 34 (Q34)
  t12_b5_d34_harvesters_opt_sa: {
    id: 't12_b5_d34_harvesters_opt_sa',
    name: 'Tìm số máy gặt lúa để tổng chi phí thấp nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu chi phí rời rạc theo biến nguyên',
    description:
      'Nông trại có M máy gặt, năng suất r kg/giờ, phí vận hành C1/máy, kỹ sư C2/giờ, tổng Q = r·H kg lúa. Tìm số máy nguyên tối ưu.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5',
    paramSpecs: [
      { name: 'maxM', label: 'Số máy gặt M', min: 15, max: 22 },
      { name: 'rate', label: 'Năng suất/máy (kg/h)', min: 28, max: 48, step: 2 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 240, max: 360, step: 20 },
      { name: 'c1k', label: 'Phí vận hành/máy (nghìn đ)', min: 55, max: 80 },
      { name: 'c2k', label: 'Phí kỹ sư/giờ (nghìn đ)', min: 40, max: 62 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60 || rate <= 0 || rate > 500 || hours <= 0 || hours > 3000) return { valid: false, reason: 'Tham số ngoài miền chuẩn' };
      if (c1k <= 0 || c2k <= 0 || c1k > 2000 || c2k > 2000) return { valid: false, reason: 'Chi phí phải dương' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cực tiểu ngoài [4; M - 0.5]' };
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => c1k * x + (hours * c2k) / x;
      if (fl !== cl && Math.abs(f(fl) - f(cl)) < 1e-4) return { valid: false, reason: 'Hai điểm nguyên có chi phí bằng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { maxM, rate, hours, c1k, c2k } = params;
      const Q = rate * hours;
      const C1 = c1k * 1000;
      const C2 = c2k * 1000;
      const K = hours * C2;
      const xCont = Math.sqrt(K / C1);
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => C1 * x + K / x;
      const xBest = f(fl) <= f(cl) ? fl : cl;

      return {
        stem:
          'Một nông trại có $' +
          maxM +
          '$ máy gặt lúa tự động và được giám sát bởi một kỹ sư, mỗi máy gặt có thể gặt được $' +
          rate +
          '$ kg lúa trong $1$ giờ. Chi phí vận hành cho mỗi máy gặt cho một vụ là $' +
          C1 +
          '$ đồng. Chi phí thuê kỹ sư giám sát là $' +
          C2 +
          '$ đồng/giờ. Vụ lúa này cần gặt $' +
          Q +
          '$ kg lúa. Hỏi nên sử dụng bao nhiêu máy để tổng chi phí thấp nhất?',
        shortAnswer: '' + xBest,
        numericValue: xBest,
        answerSummary: xBest + ' máy',
        solutionSteps: [
          'Gọi $x$ là số máy gặt cần dùng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' + maxM + '$). Thời gian gặt là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ giờ.',
          'Tổng chi phí: $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$.',
          "Giải $f'(x) = 0 \\Leftrightarrow x = \\sqrt{\\frac{" + K + '}{' + C1 + '}} \\approx ' + u.formatNumberVN(xCont, 1) + '$.',
          'Kiểm tra $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, suy ra nên dùng $' + xBest + '$ máy.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c2k = 0', params: { maxM: 17, rate: 38, hours: 300, c1k: 64, c2k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (17 máy, 300h, 64k, 54k -> 16 máy)', params: { maxM: 17, rate: 38, hours: 300, c1k: 64, c2k: 54 }, expectedValid: true },
    ],
  },

  // Dạng 35 (Q35)
  t12_b5_d35_trucks_opt_sa: {
    id: 't12_b5_d35_trucks_opt_sa',
    name: 'Tìm số xe tải sử dụng để tổng chi phí vận chuyển nhỏ nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu chi phí rời rạc theo biến nguyên',
    description:
      'Công ty vận tải có M xe tải, tải trọng r tấn/giờ, phí chuẩn bị C1/xe, điều phối C2/giờ, cần chở Q = r·H tấn hàng. Tìm số xe tối ưu.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5',
    paramSpecs: [
      { name: 'maxM', label: 'Số xe tải M', min: 15, max: 24 },
      { name: 'rate', label: 'Tải trọng (tấn/h)', min: 4, max: 10 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 380, max: 540, step: 20 },
      { name: 'c1k', label: 'Phí khấu hao/xe (nghìn đ)', min: 120, max: 175 },
      { name: 'c2k', label: 'Phí điều phối/giờ (nghìn đ)', min: 70, max: 105 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60 || rate <= 0 || rate > 100 || hours <= 0 || hours > 3000) return { valid: false, reason: 'Tham số ngoài miền chuẩn' };
      if (c1k <= 0 || c2k <= 0 || c1k > 2000 || c2k > 2000) return { valid: false, reason: 'Chi phí phải dương' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cực tiểu ngoài [4; M - 0.5]' };
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => c1k * x + (hours * c2k) / x;
      if (fl !== cl && Math.abs(f(fl) - f(cl)) < 1e-4) return { valid: false, reason: 'Hai điểm nguyên có chi phí bằng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { maxM, rate, hours, c1k, c2k } = params;
      const Q = rate * hours;
      const C1 = c1k * 1000;
      const C2 = c2k * 1000;
      const K = hours * C2;
      const xCont = Math.sqrt(K / C1);
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => C1 * x + K / x;
      const xBest = f(fl) <= f(cl) ? fl : cl;

      return {
        stem:
          'Một công ty vận tải có $' +
          maxM +
          '$ xe tải, mỗi xe có thể chở được $' +
          rate +
          '$ tấn hàng trong $1$ giờ. Chi phí chuẩn bị và khấu hao mỗi xe cho một chuyến là $' +
          C1 +
          '$ đồng. Chi phí thuê nhân viên điều phối là $' +
          C2 +
          '$ đồng/giờ. Công ty cần vận chuyển $' +
          Q +
          '$ tấn hàng. Hãy tìm số xe tải cần sử dụng để chi phí nhỏ nhất.',
        shortAnswer: '' + xBest,
        numericValue: xBest,
        answerSummary: xBest + ' xe tải',
        solutionSteps: [
          'Gọi $x$ là số xe tải sử dụng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' + maxM + '$). Thời gian vận chuyển là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ giờ.',
          'Tổng chi phí: $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$.',
          "Giải $f'(x) = 0 \\Leftrightarrow x = \\sqrt{\\frac{" + K + '}{' + C1 + '}} \\approx ' + u.formatNumberVN(xCont, 1) + '$.',
          'So sánh $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, suy ra số xe cần dùng là $' + xBest + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên rate = 0', params: { maxM: 19, rate: 0, hours: 490, c1k: 147, c2k: 93 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (19 xe, 490h, 147k, 93k -> 18 xe)', params: { maxM: 19, rate: 5, hours: 490, c1k: 147, c2k: 93 }, expectedValid: true },
    ],
  },

  // Dạng 36 (Q36)
  t12_b5_d36_servers_opt_sa: {
    id: 't12_b5_d36_servers_opt_sa',
    name: 'Tìm số máy chủ (server) để tổng chi phí chạy tác vụ thấp nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu chi phí rời rạc theo biến nguyên',
    description:
      'Trung tâm dữ liệu có M máy chủ, xử lý r tác vụ/giờ, điện năng C1/máy, kỹ sư C2/giờ, cần xử lý Q = r·H tác vụ. Tìm số máy chủ tối ưu.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5',
    paramSpecs: [
      { name: 'maxM', label: 'Số máy chủ M', min: 12, max: 20 },
      { name: 'rate', label: 'Tác vụ/giờ mỗi máy', min: 650, max: 850, step: 8 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 180, max: 260, step: 10 },
      { name: 'c1k', label: 'Phí điện/máy (nghìn đ)', min: 190, max: 260 },
      { name: 'c2k', label: 'Phí kỹ sư/giờ (nghìn đ)', min: 110, max: 165 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60 || rate <= 0 || rate > 5000 || hours <= 0 || hours > 3000) return { valid: false, reason: 'Tham số ngoài miền chuẩn' };
      if (c1k <= 0 || c2k <= 0 || c1k > 3000 || c2k > 3000) return { valid: false, reason: 'Chi phí phải dương' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cực tiểu ngoài [4; M - 0.5]' };
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => c1k * x + (hours * c2k) / x;
      if (fl !== cl && Math.abs(f(fl) - f(cl)) < 1e-4) return { valid: false, reason: 'Hai điểm nguyên có chi phí bằng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { maxM, rate, hours, c1k, c2k } = params;
      const Q = rate * hours;
      const C1 = c1k * 1000;
      const C2 = c2k * 1000;
      const K = hours * C2;
      const xCont = Math.sqrt(K / C1);
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => C1 * x + K / x;
      const xBest = f(fl) <= f(cl) ? fl : cl;

      return {
        stem:
          'Một trung tâm dữ liệu có $' +
          maxM +
          '$ máy chủ (server). Mỗi máy xử lý được $' +
          rate +
          '$ tác vụ trong $1$ giờ. Chi phí điện năng cho mỗi máy trong một đợt chạy là $' +
          C1 +
          '$ đồng. Chi phí thuê kỹ sư giám sát hệ thống là $' +
          C2 +
          '$ đồng/giờ. Đợt này cần xử lý $' +
          Q +
          '$ tác vụ. Trung tâm dữ liệu nên dùng bao nhiêu máy chủ để tổng chi phí thấp nhất?',
        shortAnswer: '' + xBest,
        numericValue: xBest,
        answerSummary: xBest + ' máy chủ',
        solutionSteps: [
          'Gọi $x$ là số máy chủ dùng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' + maxM + '$). Thời gian xử lý là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ giờ.',
          'Tổng chi phí: $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$.',
          "Giải $f'(x) = 0 \\Leftrightarrow x = \\sqrt{\\frac{" + K + '}{' + C1 + '}} \\approx ' + u.formatNumberVN(xCont, 1) + '$.',
          'So sánh $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, suy ra dùng $' + xBest + '$ máy chủ.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1k = 0', params: { maxM: 14, rate: 766, hours: 210, c1k: 0, c2k: 146 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (14 server, 210h, 219k, 146k -> 12 máy)', params: { maxM: 14, rate: 766, hours: 210, c1k: 219, c2k: 146 }, expectedValid: true },
    ],
  },

  // Dạng 37 (Q37)
  t12_b5_d37_lab_machines_opt_sa: {
    id: 't12_b5_d37_lab_machines_opt_sa',
    name: 'Tìm số máy xét nghiệm bệnh viện cần dùng để chi phí ít nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu chi phí rời rạc theo biến nguyên',
    description:
      'Bệnh viện có M máy xét nghiệm, xử lý r mẫu/giờ, phí bảo dưỡng C1/máy, kỹ thuật viên C2/giờ, tổng Q = r·H mẫu. Tìm số máy tối ưu.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5',
    paramSpecs: [
      { name: 'maxM', label: 'Số máy xét nghiệm M', min: 15, max: 24 },
      { name: 'rate', label: 'Số mẫu/giờ mỗi máy', min: 4, max: 9 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 280, max: 400, step: 20 },
      { name: 'c1k', label: 'Phí bảo dưỡng/máy (nghìn đ)', min: 60, max: 90 },
      { name: 'c2k', label: 'Phí KTV/giờ (nghìn đ)', min: 45, max: 70 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60 || rate <= 0 || rate > 100 || hours <= 0 || hours > 3000) return { valid: false, reason: 'Tham số ngoài miền chuẩn' };
      if (c1k <= 0 || c2k <= 0 || c1k > 2000 || c2k > 2000) return { valid: false, reason: 'Chi phí phải dương' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cực tiểu ngoài [4; M - 0.5]' };
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => c1k * x + (hours * c2k) / x;
      if (fl !== cl && Math.abs(f(fl) - f(cl)) < 1e-4) return { valid: false, reason: 'Hai điểm nguyên có chi phí bằng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { maxM, rate, hours, c1k, c2k } = params;
      const Q = rate * hours;
      const C1 = c1k * 1000;
      const C2 = c2k * 1000;
      const K = hours * C2;
      const xCont = Math.sqrt(K / C1);
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => C1 * x + K / x;
      const xBest = f(fl) <= f(cl) ? fl : cl;

      return {
        stem:
          'Một bệnh viện có $' +
          maxM +
          '$ máy xét nghiệm tự động. Mỗi máy xét nghiệm được $' +
          rate +
          '$ mẫu trong $1$ giờ. Chi phí bảo dưỡng và khử khuẩn mỗi máy cho một ca trực là $' +
          C1 +
          '$ đồng. Chi phí thuê kỹ thuật viên giám sát là $' +
          C2 +
          '$ đồng/giờ. Trong ngày bệnh viện nhận $' +
          Q +
          '$ mẫu xét nghiệm. Hỏi cần sử dụng bao nhiêu máy để tổng chi phí là ít nhất?',
        shortAnswer: '' + xBest,
        numericValue: xBest,
        answerSummary: xBest + ' máy xét nghiệm',
        solutionSteps: [
          'Gọi $x$ là số máy xét nghiệm sử dụng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' + maxM + '$). Thời gian thực hiện là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ giờ.',
          'Tổng chi phí: $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$.',
          "Giải $f'(x) = 0 \\Leftrightarrow x = \\sqrt{\\frac{" + K + '}{' + C1 + '}} \\approx ' + u.formatNumberVN(xCont, 1) + '$.',
          'Kiểm tra $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, suy ra cần dùng $' + xBest + '$ máy.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c2k = 0', params: { maxM: 18, rate: 5, hours: 340, c1k: 70, c2k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (18 máy, 340h, 70k, 55k -> 16 máy)', params: { maxM: 18, rate: 5, hours: 340, c1k: 70, c2k: 55 }, expectedValid: true },
    ],
  },

  // Dạng 38 (Q38)
  t12_b5_d38_towel_price_opt_sa: {
    id: 't12_b5_d38_towel_price_opt_sa',
    name: 'Tối ưu giá tăng cho cơ sở sản xuất khăn mặt (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu lợi nhuận kinh doanh',
    description:
      'Bán khăn giá p0, vốn c0, sản lượng n0 chiếc/tháng. Tăng 1 nghìn đồng giảm r chiếc. Tìm mức tăng x (nghìn đồng) để lợi nhuận tối đa.',
    conditionSummary: 'n0 = r·(L0 + 2·xOpt), L0 = p0 - c0 > 0, xOpt ≥ 2',
    paramSpecs: [
      { name: 'c0', label: 'Vốn sản xuất (nghìn đ)', min: 10, max: 20 },
      { name: 'l0', label: 'Lãi ban đầu (nghìn đ)', min: 8, max: 16 },
      { name: 'r', label: 'Số khăn giảm mỗi 1k tăng', min: 30, max: 70, step: 5 },
      { name: 'xOpt', label: 'Mức tăng tối ưu (nghìn đ)', min: 4, max: 12 },
    ],
    validateCode: `
      const { c0, l0, r, xOpt } = params;
      if (c0 <= 0 || c0 > 500 || l0 <= 0 || l0 > 500 || r <= 0 || r > 500 || xOpt < 2 || xOpt > 50) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, l0, r, xOpt } = params;
      const p0 = c0 + l0;
      const n0 = r * (l0 + 2 * xOpt);
      const b1 = n0 - r * l0;
      const cConst = n0 * l0;
      const fPoly = u.formatQuadratic(-r, b1, cConst);
      const fDeriv = u.formatLinear(-2 * r, b1);

      return {
        stem:
          'Một cơ sở sản xuất khăn mặt đang bán mỗi chiếc khăn với giá $' +
          (p0 * 1000) +
          '$ đồng một chiếc và mỗi tháng cơ sở bán được trung bình $' +
          n0 +
          '$ chiếc khăn. Người quản lý thấy rằng nếu từ mức giá $' +
          (p0 * 1000) +
          '$ đồng mà cứ tăng giá thêm $1000$ đồng thì mỗi tháng sẽ bán ít hơn $' +
          r +
          '$ chiếc. Biết vốn sản xuất một chiếc khăn không đổi là $' +
          (c0 * 1000) +
          '$ đồng. Tìm số tiền cần tăng (đơn vị: nghìn đồng) để lợi nhuận hàng tháng là cao nhất.',
        shortAnswer: '' + xOpt,
        numericValue: xOpt,
        answerSummary: xOpt + ' nghìn đồng',
        solutionSteps: [
          'Gọi $x$ (nghìn đồng) là số tiền tăng thêm cho mỗi chiếc khăn. Số khăn bán được là $' + n0 + ' - ' + r + 'x$, tiền lãi mỗi khăn là $' + l0 + ' + x$ (nghìn đồng).',
          'Tổng lợi nhuận: $f(x) = (' + n0 + ' - ' + r + 'x)(' + l0 + ' + x) = ' + fPoly + '$ (nghìn đồng).',
          "Giải $f'(x) = " + fDeriv + ' = 0 \\Leftrightarrow x = ' + xOpt + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên l0 = 0', params: { c0: 13, l0: 0, r: 50, xOpt: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (giá 25k, vốn 13k, 1200 chiếc -> tăng 6k)', params: { c0: 13, l0: 12, r: 50, xOpt: 6 }, expectedValid: true },
    ],
  },

  // Dạng 39 (Q39)
  t12_b5_d39_coffee_price_opt_sa: {
    id: 't12_b5_d39_coffee_price_opt_sa',
    name: 'Tối ưu giá tăng cho quán cà phê để lợi nhuận ngày lớn nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu lợi nhuận kinh doanh',
    description:
      'Quán cà phê bán giá p0, chi phí c0, bán n0 cốc/ngày. Tăng d nghìn giảm q = d·r cốc. Tìm mức tăng x (nghìn đồng) tối ưu.',
    conditionSummary: 'n0 = r·(L0 + 2·xOpt), L0 = p0 - c0 > 0',
    paramSpecs: [
      { name: 'c0', label: 'Chi phí mỗi cốc (nghìn đ)', min: 22, max: 38 },
      { name: 'l0', label: 'Lãi ban đầu (nghìn đ)', min: 5, max: 14 },
      { name: 'd', label: 'Bước tăng giá (nghìn đ)', min: 2, max: 4 },
      { name: 'r', label: 'Số cốc giảm mỗi 1k tăng', min: 3, max: 8 },
      { name: 'xOpt', label: 'Mức tăng tối ưu (nghìn đ)', min: 5, max: 13 },
    ],
    validateCode: `
      const { c0, l0, d, r, xOpt } = params;
      if (c0 <= 0 || c0 > 500 || l0 <= 0 || l0 > 500 || d < 1 || d > 20 || r < 1 || r > 50 || xOpt < 2 || xOpt > 40) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, l0, d, r, xOpt } = params;
      const p0 = c0 + l0;
      const q = d * r;
      const n0 = r * (l0 + 2 * xOpt);
      const b1 = n0 - r * l0;
      const cConst = n0 * l0;
      const fPoly = u.formatQuadratic(-r, b1, cConst);
      const fDeriv = u.formatLinear(-2 * r, b1);

      return {
        stem:
          'Một quán cà phê đang bán mỗi cốc cà phê với giá $' +
          (p0 * 1000) +
          '$ đồng một cốc, mỗi ngày bán trung bình được $' +
          n0 +
          '$ cốc. Sau khi khảo sát thị trường, người quản lý thấy rằng nếu tăng giá mỗi cốc thêm $' +
          (d * 1000) +
          '$ đồng thì lượng tiêu thụ giảm $' +
          q +
          '$ cốc/ngày. Biết chi phí cho mỗi cốc cà phê là $' +
          (c0 * 1000) +
          '$ đồng. Hỏi quán nên tăng giá bao nhiêu (đơn vị: nghìn đồng) để lợi nhuận mỗi ngày là lớn nhất?',
        shortAnswer: '' + xOpt,
        numericValue: xOpt,
        answerSummary: xOpt + ' nghìn đồng',
        solutionSteps: [
          'Gọi $x$ (nghìn đồng) là mức giá tăng thêm. Khi đó lượng tiêu thụ là $' + n0 + ' - ' + r + 'x$ cốc, lãi mỗi cốc là $' + l0 + ' + x$ (nghìn đồng).',
          'Tổng lợi nhuận: $f(x) = (' + n0 + ' - ' + r + 'x)(' + l0 + ' + x) = ' + fPoly + '$ (nghìn đồng).',
          "Giải $f'(x) = " + fDeriv + ' = 0 \\Leftrightarrow x = ' + xOpt + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c0 = 0', params: { c0: 0, l0: 6, d: 2, r: 5, xOpt: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (giá 38k, vốn 32k, 120 cốc -> tăng 9k)', params: { c0: 32, l0: 6, d: 2, r: 5, xOpt: 9 }, expectedValid: true },
    ],
  },

  // Dạng 40 (Q40)
  t12_b5_d40_cinema_ticket_opt_sa: {
    id: 't12_b5_d40_cinema_ticket_opt_sa',
    name: 'Tối ưu giá tăng vé xem phim để lợi nhuận suất chiếu cao nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu lợi nhuận kinh doanh',
    description:
      'Rạp chiếu phim bán vé giá p0, chi phí c0, trung bình n0 khán giả/suất. Tăng d nghìn giảm q = d·r khách. Tìm mức tăng x (nghìn đồng) tối ưu.',
    conditionSummary: 'n0 = r·(L0 + 2·xOpt), L0 = p0 - c0 > 0',
    paramSpecs: [
      { name: 'c0', label: 'Chi phí phục vụ/khách (nghìn đ)', min: 25, max: 45 },
      { name: 'l0', label: 'Lãi ban đầu/vé (nghìn đ)', min: 20, max: 35 },
      { name: 'd', label: 'Bước tăng giá vé (nghìn đ)', min: 2, max: 5 },
      { name: 'r', label: 'Giảm khách mỗi 1k tăng', min: 4, max: 10 },
      { name: 'xOpt', label: 'Mức tăng tối ưu (nghìn đ)', min: 4, max: 12 },
    ],
    validateCode: `
      const { c0, l0, d, r, xOpt } = params;
      if (c0 <= 0 || c0 > 500 || l0 <= 0 || l0 > 500 || d < 1 || d > 20 || r < 1 || r > 50 || xOpt < 2 || xOpt > 40) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, l0, d, r, xOpt } = params;
      const p0 = c0 + l0;
      const q = d * r;
      const n0 = r * (l0 + 2 * xOpt);
      const b1 = n0 - r * l0;
      const cConst = n0 * l0;
      const fPoly = u.formatQuadratic(-r, b1, cConst);
      const fDeriv = u.formatLinear(-2 * r, b1);

      return {
        stem:
          'Một rạp chiếu phim bán vé với giá $' +
          (p0 * 1000) +
          '$ đồng một vé, trung bình mỗi suất có $' +
          n0 +
          '$ khán giả. Kết quả khảo sát thị trường cho thấy, nếu tăng giá vé thêm $' +
          (d * 1000) +
          '$ đồng thì số khán giả giảm $' +
          q +
          '$ người. Biết chi phí phục vụ cố định cho mỗi khán giả là $' +
          (c0 * 1000) +
          '$ đồng. Hãy xác định số tiền cần tăng (đơn vị: nghìn đồng) để lợi nhuận từ một suất chiếu đạt mức cao nhất.',
        shortAnswer: '' + xOpt,
        numericValue: xOpt,
        answerSummary: xOpt + ' nghìn đồng',
        solutionSteps: [
          'Gọi $x$ (nghìn đồng) là số tiền tăng giá mỗi vé. Số khán giả mỗi suất là $' + n0 + ' - ' + r + 'x$, tiền lãi mỗi vé là $' + l0 + ' + x$ (nghìn đồng).',
          'Tổng lợi nhuận: $f(x) = (' + n0 + ' - ' + r + 'x)(' + l0 + ' + x) = ' + fPoly + '$ (nghìn đồng).',
          "Giải $f'(x) = " + fDeriv + ' = 0 \\Leftrightarrow x = ' + xOpt + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên l0 = 0', params: { c0: 34, l0: 0, d: 2, r: 5, xOpt: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (giá 62k, vốn 34k, 200 vé -> tăng 6k)', params: { c0: 34, l0: 28, d: 2, r: 5, xOpt: 6 }, expectedValid: true },
    ],
  },

  // Dạng 41 (Q41)
  t12_b5_d41_tourist_ticket_opt_sa: {
    id: 't12_b5_d41_tourist_ticket_opt_sa',
    name: 'Tối ưu giá tăng vé khu du lịch để lợi nhuận ngày cao nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu lợi nhuận kinh doanh',
    description:
      'Khu du lịch bán vé giá p0, chi phí c0, có n0 khách/ngày. Tăng d nghìn đồng giảm q = d·r khách/ngày. Tìm mức tăng x (nghìn đồng) tối ưu.',
    conditionSummary: 'n0 = r·(L0 + 2·xOpt), L0 = p0 - c0 > 0',
    paramSpecs: [
      { name: 'c0', label: 'Chi phí phục vụ/khách (nghìn đ)', min: 25, max: 45 },
      { name: 'l0', label: 'Lãi ban đầu/vé (nghìn đ)', min: 30, max: 52 },
      { name: 'd', label: 'Bước tăng giá vé (nghìn đ)', min: 2, max: 5 },
      { name: 'r', label: 'Giảm khách mỗi 1k tăng', min: 15, max: 30, step: 5 },
      { name: 'xOpt', label: 'Mức tăng tối ưu (nghìn đ)', min: 5, max: 14 },
    ],
    validateCode: `
      const { c0, l0, d, r, xOpt } = params;
      if (c0 <= 0 || c0 > 500 || l0 <= 0 || l0 > 500 || d < 1 || d > 20 || r < 1 || r > 100 || xOpt < 2 || xOpt > 40) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, l0, d, r, xOpt } = params;
      const p0 = c0 + l0;
      const q = d * r;
      const n0 = r * (l0 + 2 * xOpt);
      const b1 = n0 - r * l0;
      const cConst = n0 * l0;
      const fPoly = u.formatQuadratic(-r, b1, cConst);
      const fDeriv = u.formatLinear(-2 * r, b1);

      return {
        stem:
          'Một khu du lịch bán vé vào cổng giá $' +
          (p0 * 1000) +
          '$ đồng một vé, trung bình có $' +
          n0 +
          '$ khách/ngày. Ban quản lý dự định tăng giá vé, khảo sát cho thấy nếu giá vé tăng thêm $' +
          (d * 1000) +
          '$ đồng thì số lượng khách giảm $' +
          q +
          '$ người/ngày. Biết chi phí phục vụ cho mỗi khách là $' +
          (c0 * 1000) +
          '$ đồng. Hãy xác định số tiền cần tăng (đơn vị: nghìn đồng) để lợi nhuận trong ngày là cao nhất.',
        shortAnswer: '' + xOpt,
        numericValue: xOpt,
        answerSummary: xOpt + ' nghìn đồng',
        solutionSteps: [
          'Gọi $x$ (nghìn đồng) là số tiền cần tăng mỗi vé. Lượng khách mỗi ngày là $' + n0 + ' - ' + r + 'x$ người, tiền lãi mỗi vé là $' + l0 + ' + x$ (nghìn đồng).',
          'Tổng lợi nhuận: $f(x) = (' + n0 + ' - ' + r + 'x)(' + l0 + ' + x) = ' + fPoly + '$ (nghìn đồng).',
          "Giải $f'(x) = " + fDeriv + ' = 0 \\Leftrightarrow x = ' + xOpt + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c0 = 0', params: { c0: 0, l0: 42, d: 3, r: 20, xOpt: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (giá 73k, vốn 31k, 1120 khách -> tăng 7k)', params: { c0: 31, l0: 42, d: 3, r: 20, xOpt: 7 }, expectedValid: true },
    ],
  },

  // Dạng 42 (Q42)
  t12_b5_d42_tshirt_price_opt_sa: {
    id: 't12_b5_d42_tshirt_price_opt_sa',
    name: 'Tối ưu giá tăng áo thun để lợi nhuận hàng tháng lớn nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu lợi nhuận kinh doanh',
    description:
      'Xưởng sản xuất bán áo thun giá p0, vốn c0, tiêu thụ n0 chiếc/tháng. Tăng d nghìn đồng giảm q = d·r chiếc. Tìm số tiền cần tăng x (nghìn đồng).',
    conditionSummary: 'n0 = r·(L0 + 2·xOpt), L0 = p0 - c0 > 0',
    paramSpecs: [
      { name: 'c0', label: 'Chi phí sản xuất/áo (nghìn đ)', min: 45, max: 75 },
      { name: 'l0', label: 'Lãi ban đầu/áo (nghìn đ)', min: 50, max: 80 },
      { name: 'd', label: 'Bước tăng giá (nghìn đ)', min: 4, max: 6 },
      { name: 'r', label: 'Giảm áo mỗi 1k tăng', min: 8, max: 14 },
      { name: 'xOpt', label: 'Mức tăng tối ưu (nghìn đ)', min: 8, max: 18 },
    ],
    validateCode: `
      const { c0, l0, d, r, xOpt } = params;
      if (c0 <= 0 || c0 > 500 || l0 <= 0 || l0 > 500 || d < 1 || d > 20 || r < 1 || r > 50 || xOpt < 2 || xOpt > 50) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, l0, d, r, xOpt } = params;
      const p0 = c0 + l0;
      const q = d * r;
      const n0 = r * (l0 + 2 * xOpt);
      const b1 = n0 - r * l0;
      const cConst = n0 * l0;
      const fPoly = u.formatQuadratic(-r, b1, cConst);
      const fDeriv = u.formatLinear(-2 * r, b1);

      return {
        stem:
          'Một xưởng sản xuất bán một chiếc áo thun với giá $' +
          (p0 * 1000) +
          '$ đồng, mỗi tháng bán trung bình $' +
          n0 +
          '$ chiếc. Khảo sát cho thấy nếu tăng giá bán thêm $' +
          (d * 1000) +
          '$ đồng thì số lượng tiêu thụ giảm $' +
          q +
          '$ chiếc. Biết chi phí sản xuất một chiếc áo là $' +
          (c0 * 1000) +
          '$ đồng. Hãy tìm số tiền (nghìn đồng) cần tăng để lợi nhuận hàng tháng lớn nhất.',
        shortAnswer: '' + xOpt,
        numericValue: xOpt,
        answerSummary: xOpt + ' nghìn đồng',
        solutionSteps: [
          'Gọi $x$ (nghìn đồng) là số tiền tăng giá mỗi chiếc áo. Số áo bán ra là $' + n0 + ' - ' + r + 'x$ chiếc, lãi mỗi chiếc là $' + l0 + ' + x$ (nghìn đồng).',
          'Tổng lợi nhuận: $f(x) = (' + n0 + ' - ' + r + 'x)(' + l0 + ' + x) = ' + fPoly + '$ (nghìn đồng).',
          "Giải $f'(x) = " + fDeriv + ' = 0 \\Leftrightarrow x = ' + xOpt + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên l0 = 0', params: { c0: 59, l0: 0, d: 5, r: 10, xOpt: 16 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (giá 125k, vốn 59k, 980 áo -> tăng 16k)', params: { c0: 59, l0: 66, d: 5, r: 10, xOpt: 16 }, expectedValid: true },
    ],
  },

  // Dạng 43 (Q43)
  t12_b5_d43_private_jet_passengers_sa: {
    id: 't12_b5_d43_private_jet_passengers_sa',
    name: 'Tìm số hành khách tối ưu cho chuyến bay giảm giá theo nhóm',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu lợi nhuận rời rạc (Hàng không)',
    description:
      'Giá vé niêm yết p0 USD, chi phí cố định F0 + c0·n. Nếu có n hành khách (5 ≤ n ≤ M) thì giảm k·n% giá vé. Tìm số hành khách n để lợi nhuận cao nhất.',
    conditionSummary: 'n_opt ∈ [5; M], lợi nhuận dương và duy nhất tại số nguyên n*',
    paramSpecs: [
      { name: 'p0h', label: 'Giá vé niêm yết (trăm USD)', min: 90, max: 140 },
      { name: 'f0h', label: 'Phí cố định (trăm USD)', min: 35, max: 65 },
      { name: 'c0h', label: 'Phí mỗi khách (trăm USD)', min: 10, max: 22 },
      { name: 'k', label: 'Hệ số giảm k (%)', min: 2, max: 4 },
      { name: 'maxM', label: 'Sức chứa tối đa M', min: 20, max: 28 },
    ],
    validateCode: `
      const { p0h, f0h, c0h, k, maxM } = params;
      if (p0h < 30 || p0h > 500 || f0h <= 0 || f0h > 500 || c0h <= 0 || c0h >= p0h) return { valid: false, reason: 'Giá vé và chi phí không hợp lệ' };
      if (k < 1 || k > 10 || maxM < 12 || maxM > 60) return { valid: false, reason: 'Tỷ lệ giảm và sức chứa ngoài miền' };
      const nCont = (50 * (p0h - c0h)) / (k * p0h);
      if (nCont < 6 || nCont > maxM - 1) return { valid: false, reason: 'Số khách tối ưu cần thuộc [6; M - 1]' };
      const fl = Math.floor(nCont);
      const cl = Math.ceil(nCont);
      const p = (n) => p0h * 100 * n * (1 - (k * n) / 100) - (f0h * 100 + c0h * 100 * n);
      if (Math.max(p(fl), p(cl)) <= 0) return { valid: false, reason: 'Lợi nhuận tối đa phải dương' };
      if (fl !== cl && Math.abs(p(fl) - p(cl)) < 1e-4) return { valid: false, reason: 'Hai giá trị nguyên có cùng lợi nhuận' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p0h, f0h, c0h, k, maxM } = params;
      const p0 = p0h * 100;
      const F0 = f0h * 100;
      const c0 = c0h * 100;
      const a2 = k * p0h; // since -(p0 * k / 100) = -(k * p0h)
      const b1 = p0 - c0;
      const nCont = b1 / (2 * a2);
      const fl = Math.floor(nCont);
      const cl = Math.ceil(nCont);
      const calcP = (n) => -a2 * n * n + b1 * n - F0;
      const nBest = calcP(fl) >= calcP(cl) ? fl : cl;
      const disc5 = 5 * k;

      return {
        stem:
          'Hãng hàng không đưa vào khai thác dịch vụ máy bay riêng. Giá vé niêm yết là $' +
          p0 +
          '$ USD/người. Mỗi chuyến bay tốn $' +
          F0 +
          '$ USD chi phí cố định và thêm $' +
          c0 +
          '$ USD cho mỗi hành khách. Hãng áp dụng chính sách giảm giá theo số lượng khách: nếu chuyến bay có $5$ người thì mỗi hành khách được giảm $' +
          disc5 +
          '\\%$ giá vé; ứng với $n$ người thì mức giảm là $' +
          k +
          'n\\%$. Máy bay chở tối đa $' +
          maxM +
          '$ hành khách (chỉ khai thác từ $5$ hành khách trở lên). Hỏi lợi nhuận của hãng đạt lớn nhất khi có bao nhiêu hành khách?',
        shortAnswer: '' + nBest,
        numericValue: nBest,
        answerSummary: nBest + ' hành khách',
        solutionSteps: [
          'Gọi $n$ là số hành khách ($n \\in \\mathbb{N},\\, 5 \\le n \\le ' + maxM + '$). Doanh thu $R(n) = ' + p0 + 'n\\left(1 - \\frac{' + k + 'n}{100}\\right)$ và chi phí $C(n) = ' + F0 + ' + ' + c0 + 'n$.',
          'Lợi nhuận: $P(n) = -' + a2 + 'n^2 + ' + b1 + 'n - ' + F0 + '$.',
          'Parabol quay bề lõm xuống dưới có đỉnh tại $n_0 = \\frac{' + b1 + '}{' + (2 * a2) + '} \\approx ' + u.formatNumberVN(nCont, 2) + '$.',
          (fl === cl
            ? 'Suy ra lợi nhuận đạt lớn nhất khi có $n = ' + nBest + '$ hành khách.'
            : 'Vì $n$ nguyên nên đối chiếu $P(' + fl + ') = ' + calcP(fl) + '$ và $P(' + cl + ') = ' + calcP(cl) + '$, chọn $n = ' + nBest + '$ hành khách.'),
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (không có chính sách giảm)', params: { p0h: 111, f0h: 47, c0h: 15, k: 0, maxM: 24 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (p0=11100, F0=4700, c0=1500, k=3 -> 14 khách)', params: { p0h: 111, f0h: 47, c0h: 15, k: 3, maxM: 24 }, expectedValid: true },
    ],
  },

  // Dạng 44 (Q44)
  t12_b5_d44_factory_workhours_sa: {
    id: 't12_b5_d44_factory_workhours_sa',
    name: 'Tối ưu số giờ làm việc tuần tại nhà máy có phế phẩm bậc hai',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu sản xuất công nghiệp (hàm bậc ba rời rạc)',
    description:
      'Tuần chuẩn h0 giờ có w0 công nhân, năng suất q0 sp/giờ. Mỗi lần tăng 2 giờ giảm dw công nhân và giảm dq năng suất; phế phẩm P(x) = (a·x² + b·x)/4. Tìm số giờ làm việc tối ưu.',
    conditionSummary: 'k* nguyên dương ∈ [1; 10] là nghiệm cực đại duy nhất của sản phẩm đạt chuẩn F(k)',
    paramSpecs: [
      { name: 'h0', label: 'Giờ chuẩn h0 (giờ/tuần)', min: 34, max: 38 },
      { name: 'w0', label: 'Số công nhân ban đầu', min: 90, max: 120, step: 3 },
      { name: 'q0', label: 'Năng suất ban đầu (sp/h)', min: 135, max: 170, step: 3 },
      { name: 'dw', label: 'Giảm công nhân mỗi lần tăng', min: 2, max: 3 },
      { name: 'dq', label: 'Giảm năng suất mỗi lần tăng', min: 3, max: 5 },
    ],
    validateCode: `
      const { h0, w0, q0, dw, dq } = params;
      if (h0 < 20 || h0 > 60 || w0 < 20 || w0 > 500 || q0 < 20 || q0 > 500 || dw < 1 || dw > 20 || dq < 1 || dq > 30) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      const F = (k) => {
        const x = h0 + 2 * k;
        return (w0 - dw * k) * x * (q0 - dq * k) - (5 * x * x + 42 * x) / 4;
      };
      const kMax = Math.min(Math.floor((w0 - 1) / dw), Math.floor((q0 - 1) / dq));
      if (kMax < 3) return { valid: false, reason: 'Miền k quá hẹp' };
      let bestK = 0;
      let bestVal = F(0);
      let tie = false;
      for (let k = 1; k <= kMax; k++) {
        const val = F(k);
        if (val > bestVal + 1e-6) {
          bestVal = val;
          bestK = k;
          tie = false;
        } else if (Math.abs(val - bestVal) <= 1e-6) {
          tie = true;
        }
      }
      if (tie || bestK < 1 || bestK > 12) return { valid: false, reason: 'Cần cực đại duy nhất tại k ∈ [1; 12]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h0, w0, q0, dw, dq } = params;
      const F = (k) => {
        const x = h0 + 2 * k;
        return (w0 - dw * k) * x * (q0 - dq * k) - (5 * x * x + 42 * x) / 4;
      };
      const kMax = Math.min(Math.floor((w0 - 1) / dw), Math.floor((q0 - 1) / dq));
      let bestK = 0;
      let bestVal = F(0);
      for (let k = 1; k <= kMax; k++) {
        const val = F(k);
        if (val > bestVal) {
          bestVal = val;
          bestK = k;
        }
      }
      const xBest = h0 + 2 * bestK;

      return {
        stem:
          'Theo thống kê tại một nhà máy $X$, nếu áp dụng tuần làm việc $' +
          h0 +
          '$ giờ thì mỗi tuần có $' +
          w0 +
          '$ công nhân đi làm và mỗi công nhân làm được $' +
          q0 +
          '$ sản phẩm trong một giờ. Nếu tăng thời gian làm việc thêm $2$ giờ mỗi tuần thì sẽ có $' +
          dw +
          '$ công nhân nghỉ việc và năng suất lao động giảm $' +
          dq +
          '$ sản phẩm/công nhân/giờ. Ngoài ra, số phế phẩm mỗi tuần ước tính là $P(x) = \\frac{5x^2 + 42x}{4}$, với $x$ là thời gian làm việc trong một tuần (giờ). Nhà máy cần áp dụng thời gian làm việc mỗi tuần bao nhiêu giờ để số sản phẩm đạt yêu cầu thu được là lớn nhất?',
        shortAnswer: '' + xBest,
        numericValue: xBest,
        answerSummary: xBest + ' giờ/tuần',
        solutionSteps: [
          'Gọi $k$ ($k \\in \\mathbb{N}$) là số lần tăng thêm $2$ giờ mỗi tuần ($x = ' + h0 + ' + 2k$).',
          'Số công nhân là $' + w0 + ' - ' + dw + 'k > 0$, năng suất là $' + q0 + ' - ' + dq + 'k > 0$.',
          'Số sản phẩm đạt yêu cầu: $F(k) = (' + w0 + ' - ' + dw + 'k)(' + h0 + ' + 2k)(' + q0 + ' - ' + dq + 'k) - \\frac{5(' + h0 + ' + 2k)^2 + 42(' + h0 + ' + 2k)}{4}$.',
          'Khảo sát các giá trị nguyên $0 \\le k \\le ' + kMax + '$, hàm $F(k)$ đạt giá trị lớn nhất tại $k = ' + bestK + ' \\Rightarrow x = ' + h0 + ' + 2\\cdot' + bestK + ' = ' + xBest + '$ (giờ).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dw = 0 (công nhân không giảm)', params: { h0: 35, w0: 103, q0: 153, dw: 0, dq: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (35h, 103 CN, 153 sp/h -> 41 giờ)', params: { h0: 35, w0: 103, q0: 153, dw: 2, dq: 4 }, expectedValid: true },
    ],
  },

  // Dạng 45 (Q45)
  t12_b5_d45_hotel_island_cost_sa: {
    id: 't12_b5_d45_hotel_island_cost_sa',
    name: 'Tối ưu quãng đường bộ kết hợp đường thủy từ khách sạn ra đảo (Pytago)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài toán cực trị hình học - chi phí di chuyển',
    description:
      'Đảo C cách bờ biển AB một đoạn BC = h, AB = L. Đi bộ trên AD với phí c_l và đường thủy DC với phí c_w (bộ Pytago c_l² + m² = c_w²). Tìm AD = x để chi phí nhỏ nhất.',
    conditionSummary: 'Bộ Pytago (c_l, m, c_w), h = m·t, L > c_l·t + 4 để kết quả x nguyên dương đẹp',
    paramSpecs: [
      { name: 'tripIdx', label: 'Bộ Pytago (0..3)', min: 0, max: 3 },
      { name: 't', label: 'Hệ số nhân t cho h', min: 1, max: 3 },
      { name: 'L', label: 'Khoảng cách bờ biển AB (km)', min: 28, max: 60, step: 2 },
    ],
    validateCode: `
      const { tripIdx, t, L } = params;
      if (tripIdx < 0 || tripIdx > 3 || t < 1 || t > 10 || L <= 0 || L > 200) return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      const triples = [[3,4,5], [5,12,13], [8,15,17], [6,8,10]];
      const [cl] = triples[tripIdx];
      if (L <= cl * t + 3) return { valid: false, reason: 'Cần bờ biển AB > BD tối ưu + 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { tripIdx, t, L } = params;
      const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]];
      const [cl, m, cw] = triples[tripIdx];
      const h = m * t;
      const dbOpt = cl * t;
      const xAns = L - dbOpt;

      return {
        stem:
          'Một người cần đi từ khách sạn $A$ bên bờ biển đến hòn đảo $C$. Biết rằng khoảng cách từ đảo $C$ đến bờ biển là $BC = ' +
          h +
          '$ km, khoảng cách từ khách sạn $A$ đến điểm $B$ trên bờ biển gần đảo $C$ nhất là $' +
          L +
          '$ km. Người đó có thể đi đường bộ từ $A$ đến điểm $D$ trên đoạn $AB$, sau đó đi đường thủy từ $D$ đến $C$. Biết kinh phí đi đường thủy là $' +
          cw +
          '$ USD/km, đường bộ là $' +
          cl +
          '$ USD/km. Hỏi người đó phải đi đường bộ một khoảng bằng bao nhiêu kilômét để tổng kinh phí nhỏ nhất?',
        diagram: { kind: 'geometry_figure', figureType: 'shore_island_path', params: { L, h } },
        shortAnswer: '' + xAns,
        numericValue: xAns,
        answerSummary: xAns + ' km',
        solutionSteps: [
          'Đặt $AD = x$ km ($0 \\le x \\le ' + L + '$), suy ra $DB = ' + L + ' - x$ và quãng đường thủy $DC = \\sqrt{(' + L + ' - x)^2 + ' + h + '^2}$.',
          'Tổng kinh phí: $F(x) = ' + cl + 'x + ' + cw + '\\sqrt{(' + L + ' - x)^2 + ' + h + '^2}$.',
          "Giải $F'(x) = " + cl + ' - \\frac{' + cw + '(' + L + ' - x)}{\\sqrt{(' + L + ' - x)^2 + ' + h + '^2}} = 0 \\Leftrightarrow (' + cw + '^2 - ' + cl + '^2)(' + L + ' - x)^2 = ' + cl + '^2 \\cdot ' + h + '^2$.',
          'Suy ra $' + m + '(' + L + ' - x) = ' + cl + '\\cdot' + h + ' \\Rightarrow ' + L + ' - x = ' + dbOpt + ' \\Rightarrow x = ' + xAns + '$ km.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tripIdx ngoài [0..3]', params: { tripIdx: 5, t: 2, L: 36 }, expectedValid: false },
      { label: 'Biên L quá nhỏ so với h', params: { tripIdx: 1, t: 3, L: 12 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (3,4,5), h=8, AB=36 -> AD = 30 km', params: { tripIdx: 0, t: 2, L: 36 }, expectedValid: true },
    ],
  },

  // Dạng 46 (Q46)
  t12_b5_d46_power_cable_island_sa: {
    id: 't12_b5_d46_power_cable_island_sa',
    name: 'Tối ưu vị trí nối đường dây điện từ đất liền ra hòn đảo',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài toán cực trị hình học - hạ tầng kỹ thuật',
    description:
      'Bờ biển AB dài L km, đảo C cách bờ BC = h km. Nối dây đất liền chi phí c_l, dây dưới biển chi phí c_w (triệu đồng/km). Tính BM = x tối ưu (làm tròn hàng đơn vị).',
    conditionSummary: 'c_w > c_l > 0, 0 < x_opt < L - 1, tránh vùng mập mờ ±0,08 quanh .5 khi làm tròn',
    paramSpecs: [
      { name: 'L', label: 'Độ dài bờ biển AB (km)', min: 14, max: 30 },
      { name: 'h', label: 'Khoảng cách đảo BC (km)', min: 4, max: 10 },
      { name: 'cl', label: 'Chi phí đất liền (triệu đ/km)', min: 18, max: 32 },
      { name: 'diff', label: 'Chênh lệch c_w - c_l (triệu đ/km)', min: 4, max: 12 },
    ],
    validateCode: `
      const { L, h, cl, diff } = params;
      if (L < 5 || L > 200 || h <= 0 || h > 100 || cl <= 0 || cl > 200 || diff <= 0 || diff > 200) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      const cw = cl + diff;
      const xOpt = (cl * h) / Math.sqrt(cw * cw - cl * cl);
      if (xOpt <= 0.5 || xOpt >= L - 0.5) return { valid: false, reason: 'Điểm nối M tối ưu phải nằm trong đoạn AB' };
      const frac = xOpt - Math.floor(xOpt);
      if (Math.abs(frac - 0.5) < 0.025) return { valid: false, reason: 'Tránh giá trị sát ngưỡng làm tròn ,5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L, h, cl, diff } = params;
      const cw = cl + diff;
      const xOpt = (cl * h) / Math.sqrt(cw * cw - cl * cl);
      const ans = Math.round(xOpt);

      return {
        stem:
          'Một đường dây điện được nối từ một nhà máy điện ở $A$ đến một hòn đảo ở $C$ (như hình vẽ). Biết $BC = ' +
          h +
          '$ km là khoảng cách từ đảo $C$ đến bờ biển $AB$ ($BC \\perp AB$) và bờ biển $AB$ có độ dài là $' +
          L +
          '$ km. Tổng chi phí lắp đặt cho $1$ km dây điện trên biển là $' +
          cw +
          '$ triệu đồng, còn trên đất liền là $' +
          cl +
          '$ triệu đồng. Xác định điểm $M$ trên đoạn $AB$ nối dây từ đất liền ra đảo sao cho tổng chi phí lắp đặt nhỏ nhất. Tính khoảng cách $BM$ (đơn vị km, kết quả làm tròn đến hàng đơn vị).',
        diagram: { kind: 'geometry_figure', figureType: 'power_island_path', params: { L, h } },
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: ans + ' km',
        solutionSteps: [
          'Đặt $BM = x$ km ($0 \\le x \\le ' + L + '$), suy ra $MA = ' + L + ' - x$ và $MC = \\sqrt{x^2 + ' + h + '^2}$.',
          'Tổng chi phí lắp đặt: $F(x) = ' + cl + '(' + L + ' - x) + ' + cw + '\\sqrt{x^2 + ' + h + '^2}$.',
          "Giải $F'(x) = -" + cl + ' + \\frac{' + cw + 'x}{\\sqrt{x^2 + ' + h + '^2}} = 0 \\Leftrightarrow (' + cw + '^2 - ' + cl + '^2)x^2 = ' + cl + '^2 \\cdot ' + h + '^2$.',
          'Suy ra $x = \\frac{' + cl + ' \\cdot ' + h + '}{\\sqrt{' + cw + '^2 - ' + cl + '^2}} \\approx ' + u.formatNumberVN(xOpt, 2) + '\\text{ km} \\approx ' + ans + '\\text{ km}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên diff = 0 (c_w = c_l gây chia cho 0)', params: { L: 18, h: 5, cl: 25, diff: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc AB=18, BC=5, cl=25, cw=30 -> 8 km', params: { L: 18, h: 5, cl: 25, diff: 5 }, expectedValid: true },
    ],
  },

  // Dạng 47 (Q47)
  t12_b5_d47_triathlete_pool_sa: {
    id: 't12_b5_d47_triathlete_pool_sa',
    name: 'Tối ưu quãng đường chạy và bơi quanh bể bơi hình chữ nhật nhanh nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài toán cực trị thời gian chuyển động',
    description:
      'Bể bơi chữ nhật rộng W m, dài L m. Xuất phát A chạy tới X trên cạnh AB với vận tốc vr km/h rồi bơi XC với vận tốc vs km/h. Tính AX gần đúng (hàng đơn vị).',
    conditionSummary: 'vr > vs > 0, 10 < x_opt < L - 10, tránh sát ngưỡng làm tròn ,5',
    paramSpecs: [
      { name: 'W', label: 'Chiều rộng bể W (m)', min: 300, max: 520, step: 7 },
      { name: 'L', label: 'Chiều dài bể L (m)', min: 620, max: 900, step: 7 },
      { name: 'vr', label: 'Vận tốc chạy (km/h)', min: 24, max: 42, step: 3 },
      { name: 'vs', label: 'Vận tốc bơi (km/h)', min: 5, max: 10 },
    ],
    validateCode: `
      const { W, L, vr, vs } = params;
      if (W < 50 || W > 2000 || L < 100 || L > 5000 || vr <= 0 || vr > 100 || vs <= 0 || vs >= vr) {
        return { valid: false, reason: 'Kích thước bể hoặc vận tốc không hợp lệ (cần vr > vs)' };
      }
      const xOpt = L - (W * vs) / Math.sqrt(vr * vr - vs * vs);
      if (xOpt <= 10 || xOpt >= L - 10) return { valid: false, reason: 'Điểm X tối ưu phải nằm trong (10; L - 10)' };
      const frac = xOpt - Math.floor(xOpt);
      if (Math.abs(frac - 0.5) < 0.02) return { valid: false, reason: 'Tránh sát ngưỡng làm tròn ,5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { W, L, vr, vs } = params;
      const vrM = Number(((vr * 1000) / 60).toFixed(2));
      const vsM = Number(((vs * 1000) / 60).toFixed(2));
      const xOpt = L - (W * vs) / Math.sqrt(vr * vr - vs * vs);
      const ans = Math.round(xOpt);
      const vrMStr = u.formatNumberVN(vrM, 2);
      const vsMStr = u.formatNumberVN(vsM, 2);

      return {
        stem:
          'Một vận động viên thể thao hai môn phối hợp luyện tập với một bể bơi hình chữ nhật $ABCD$ rộng $' +
          W +
          '$ m, dài $' +
          L +
          '$ m. Vận động viên xuất phát từ điểm $A$, chạy dọc bờ đến điểm $X$ trên cạnh $AB$ (đối diện với $CD$) rồi bơi từ $X$ đến $C$. Biết vận tốc chạy là $' +
          vr +
          '$ km/h và vận tốc bơi là $' +
          vs +
          '$ km/h. Hỏi nên chọn điểm $X$ cách $A$ gần bằng bao nhiêu mét để vận động viên đến $C$ nhanh nhất (làm tròn kết quả đến hàng đơn vị)?',
        diagram: { kind: 'geometry_figure', figureType: 'rect_pool_path', params: { W, L } },
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: ans + ' m',
        solutionSteps: [
          'Đặt $AX = x$ m ($0 \\le x \\le ' + L + '$), khi đó $XB = ' + L + ' - x$ và $XC = \\sqrt{(' + L + ' - x)^2 + ' + W + '^2}$.',
          'Đổi vận tốc sang m/phút: chạy $v_{\\text{chạy}} = ' + vrMStr + '$ m/phút, bơi $v_{\\text{bơi}} = ' + vsMStr + '$ m/phút.',
          'Tổng thời gian: $T(x) = \\frac{x}{' + vrMStr + '} + \\frac{\\sqrt{(' + L + ' - x)^2 + ' + W + '^2}}{' + vsMStr + '}$.',
          "Giải $T'(x) = 0$ thu được $x = " + L + ' - \\frac{' + W + ' \\cdot ' + vs + '}{\\sqrt{' + vr + '^2 - ' + vs + '^2}} \\approx ' + u.formatNumberVN(xOpt, 2) + '\\text{ m} \\approx ' + ans + '\\text{ m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vr = vs (mẫu căn bằng 0)', params: { W: 411, L: 717, vr: 10, vs: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (411x717, vr=36, vs=7 -> 636 m)', params: { W: 411, L: 717, vr: 36, vs: 7 }, expectedValid: true },
    ],
  },

  // Dạng 48 (Q48)
  t12_b5_d48_profit_threshold_sa: {
    id: 't12_b5_d48_profit_threshold_sa',
    name: 'Tìm sản lượng tối thiểu để lợi nhuận vượt ngưỡng M triệu đồng',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bất phương trình lợi nhuận kinh tế',
    description:
      'Doanh thu F(x) = -0,01x² + r1·x (nghìn đồng), chi phí bình quân G(x) = C0/x + c1 (nghìn đồng), 1 ≤ x ≤ Xmax. Tìm số sản phẩm nguyên nhỏ nhất để lợi nhuận > M triệu.',
    conditionSummary: 'Đỉnh parabol lợi nhuận có P_max > 1000·M, P(1) < 1000·M, tồn tại x_min ∈ [2; Xmax]',
    paramSpecs: [
      { name: 'r1', label: 'Hệ số doanh thu r1', min: 270, max: 340, step: 5 },
      { name: 'c1', label: 'Biến phí đơn vị c1', min: 200, max: 245, step: 5 },
      { name: 'c0k', label: 'Chi phí cố định (triệu đ)', min: 18, max: 32 },
      { name: 'targetM', label: 'Ngưỡng lợi nhuận (triệu đ)', min: 70, max: 115, step: 2 },
    ],
    validateCode: `
      const { r1, c1, c0k, targetM } = params;
      if (r1 <= c1 + 40 || r1 > 1000 || c1 <= 0 || c0k <= 0 || c0k > 500 || targetM <= 0 || targetM > 1000) {
        return { valid: false, reason: 'Tham số doanh thu, chi phí hoặc mục tiêu ngoài miền hợp lệ' };
      }
      const b = r1 - c1;
      const C0 = c0k * 1000;
      const targetK = targetM * 1000;
      const disc = b * b - 0.04 * (C0 + targetK);
      if (disc <= 16) return { valid: false, reason: 'Lợi nhuận tối đa không đủ lớn so với ngưỡng yêu cầu' };
      const rLow = (b - Math.sqrt(disc)) / 0.02;
      const xMin = Math.floor(rLow) + 1;
      const xMax = Math.ceil(50 * b) + 100;
      if (xMin < 10 || xMin >= xMax) return { valid: false, reason: 'Nghiệm x_min ngoài đoạn hợp lệ' };
      const P = (x) => -0.01 * x * x + b * x - C0;
      if (!(P(xMin) > targetK && P(xMin - 1) <= targetK)) return { valid: false, reason: 'Kiểm tra biên bất phương trình chưa thỏa mãn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, c1, c0k, targetM } = params;
      const b = r1 - c1;
      const C0 = c0k * 1000;
      const targetK = targetM * 1000;
      const xMax = Math.ceil(50 * b) + 100;
      const disc = b * b - 0.04 * (C0 + targetK);
      const rLow = (b - Math.sqrt(disc)) / 0.02;
      const xMin = Math.floor(rLow) + 1;

      return {
        stem:
          'Nếu một doanh nghiệp sản xuất $x$ sản phẩm trong một tháng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' +
          xMax +
          '$) thì doanh thu nhận được khi bán hết số sản phẩm đó là $F(x) = -0,01x^2 + ' +
          r1 +
          'x$ (nghìn đồng), trong khi chi phí sản xuất bình quân cho mỗi sản phẩm là $G(x) = \\frac{' +
          C0 +
          '}{x} + ' +
          c1 +
          '$ (nghìn đồng). Giả sử số sản phẩm làm ra luôn được bán hết. Trong một tháng, doanh nghiệp cần sản xuất ít nhất bao nhiêu sản phẩm để lợi nhuận thu được lớn hơn $' +
          targetM +
          '$ triệu đồng?',
        shortAnswer: '' + xMin,
        numericValue: xMin,
        answerSummary: xMin + ' sản phẩm',
        solutionSteps: [
          'Chi phí toàn phần: $xG(x) = ' + C0 + ' + ' + c1 + 'x$ (nghìn đồng).',
          'Hàm lợi nhuận: $P(x) = F(x) - xG(x) = -0,01x^2 + ' + b + 'x - ' + C0 + '$ (nghìn đồng).',
          'Yêu cầu bài toán: $P(x) > ' + targetK + ' \\Leftrightarrow -0,01x^2 + ' + b + 'x - ' + (C0 + targetK) + ' > 0 \\Leftrightarrow ' + u.formatNumberVN(rLow, 2) + ' < x < ' + u.formatNumberVN((b + Math.sqrt(disc)) / 0.02, 2) + '$.',
          'Với $x \\in \\mathbb{N}^* \\cap [1;\\, ' + xMax + ']$, giá trị nhỏ nhất thỏa mãn là $x = ' + xMin + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ngưỡng lợi nhuận quá cao không thể đạt', params: { r1: 290, c1: 220, c0k: 23, targetM: 250 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (r1=290, c1=220, C0=23k, M=98 -> 3113 sp)', params: { r1: 290, c1: 220, c0k: 23, targetM: 98 }, expectedValid: true },
    ],
  },

  // Dạng 49 (Q49)
  t12_b5_d49_vat_factory_profit_sa: {
    id: 't12_b5_d49_vat_factory_profit_sa',
    name: 'Tối ưu lợi nhuận nhà máy sau thuế giá trị gia tăng 5% (hàm bậc ba)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu lợi nhuận có thuế VAT',
    description:
      'Đơn giá bán p(x) = p0 - 0,01x² (triệu/tấn), chi phí C(x) = (num/den)x + F0, thuế VAT 5% doanh thu. Tìm lợi nhuận cao nhất sau thuế (làm tròn hàng đơn vị).',
    conditionSummary: 'Thiết lập (19/20)p0 - c1 = (57/2000)x0² để điểm cực đại x0 nguyên đẹp ∈ [35; 75]',
    paramSpecs: [
      { name: 'p0', label: 'Giá cơ sở p0 (triệu đ/tấn)', min: 95, max: 145 },
      { name: 'x0', label: 'Sản lượng tối ưu x0 (tấn)', min: 40, max: 65, step: 5 },
      { name: 'f0', label: 'Chi phí cố định F0 (triệu đ)', min: 60, max: 140 },
    ],
    validateCode: `
      const { p0, x0, f0 } = params;
      if (p0 < 30 || p0 > 500 || x0 < 10 || x0 > 150 || f0 <= 0 || f0 > 1000) return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      const diffNum = 100 * p0 - 3 * x0 * x0;
      if (diffNum < 1000) return { valid: false, reason: 'Cần 100·p0 - 3·x0² ≥ 1000 để biên chi phí dương rõ' };
      const c1Val = (19 * diffNum) / 2000;
      const lMax = (19 / 20) * (p0 * x0 - 0.01 * x0 * x0 * x0) - (c1Val * x0 + f0);
      if (lMax <= 100) return { valid: false, reason: 'Lợi nhuận phải lớn hơn 100 triệu' };
      const frac = lMax - Math.floor(lMax);
      if (Math.abs(frac - 0.5) < 0.06) return { valid: false, reason: 'Tránh giá trị sát ngưỡng làm tròn ,5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p0, x0, f0 } = params;
      const xMax = x0 + 35;
      const diffNum = 100 * p0 - 3 * x0 * x0;
      const c1Frac = u.simplifyFrac(19 * diffNum, 2000);
      const linProfitFrac = u.simplifyFrac(57 * x0 * x0, 2000);
      const lMax = (19 / 20) * (p0 * x0 - 0.01 * x0 * x0 * x0) - (c1Frac.value * x0 + f0);
      const ans = Math.round(lMax);

      return {
        stem:
          'Nhà máy $A$ chuyên sản xuất một loại sản phẩm cho nhà máy $B$ với đơn đặt hàng tối đa $' +
          xMax +
          '$ tấn sản phẩm mỗi tháng. Nếu số lượng đặt hàng là $x$ tấn sản phẩm thì giá bán cho mỗi tấn là $p(x) = ' +
          p0 +
          ' - 0,01x^2$ (triệu đồng). Chi phí để nhà máy $A$ sản xuất $x$ tấn sản phẩm trong một tháng là $C(x) = \\frac{' +
          c1Frac.num +
          'x}{' +
          c1Frac.den +
          '} + ' +
          f0 +
          '$ (triệu đồng), thuế giá trị gia tăng phải đóng là $5\\%$ tổng doanh thu. Hỏi mỗi tháng nhà máy $A$ thu được lợi nhuận cao nhất bao nhiêu triệu đồng (sau khi đã trừ thuế, làm tròn đến hàng đơn vị)?',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: ans + ' triệu đồng',
        solutionSteps: [
          'Doanh thu $R(x) = x(' + p0 + ' - 0,01x^2) = ' + p0 + 'x - 0,01x^3$ (triệu đồng). Phần doanh thu còn lại sau thuế $5\\%$ là $\\frac{19}{20} R(x)$.',
          'Lợi nhuận: $L(x) = \\frac{19}{20}(' + p0 + 'x - 0,01x^3) - \\left(' + c1Frac.latex + 'x + ' + f0 + '\\right) = -\\frac{19}{2000}x^3 + ' + linProfitFrac.latex + 'x - ' + f0 + '$.',
          "Đạo hàm $L'(x) = -\\frac{57}{2000}x^2 + " + linProfitFrac.latex + ' = 0 \\Leftrightarrow x = ' + x0 + ' \\in (0;\\, ' + xMax + ']$.',
          'Vì $L\'\'(x) < 0$ với $x > 0$, lợi nhuận cực đại là $L(' + x0 + ') \\approx ' + ans + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p0 quá nhỏ so với x0', params: { p0: 60, x0: 60, f0: 99 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (p0=113, x0=55, F0=99 -> 3062 triệu)', params: { p0: 113, x0: 55, f0: 99 }, expectedValid: true },
    ],
  },

  // Dạng 50 (Q50)
  t12_b5_d50_tourist_car_revenue_sa: {
    id: 't12_b5_d50_tourist_car_revenue_sa',
    name: 'Tối ưu doanh thu chuyến xe ô tô du lịch theo sức chứa tối đa',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực đại hàm số trên nửa khoảng bị chặn',
    description:
      'Xe sức chứa tối đa M người, giá mỗi người (A - x)²/2 nghìn đồng khi chở x người (0 < x ≤ M ≤ A/3). Tính số tiền nhiều nhất (triệu đồng, làm tròn hàng phần trăm).',
    conditionSummary: 'M ∈ [10; 18], A ≥ 3·M để hàm P(x) = x(A - x)²/2 đồng biến đến tận M',
    paramSpecs: [
      { name: 'M', label: 'Sức chứa tối đa M (khách)', min: 12, max: 17 },
      { name: 'extraA', label: 'Khoảng dư A - 3M', min: 2, max: 12 },
    ],
    validateCode: `
      const { M, extraA } = params;
      if (M < 4 || M > 50 || extraA < 0 || extraA > 100) return { valid: false, reason: 'Sức chứa M và tham số A không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { M, extraA } = params;
      const A = 3 * M + extraA;
      const G = M + 5;
      const pMaxK = (M * (A - M) * (A - M)) / 2;
      const pMaxMil = Number((pMaxK / 1000).toFixed(2));
      const ansStr = u.formatNumberVN(pMaxMil, 2);

      return {
        stem:
          'Một xe ô tô chở khách du lịch có sức chứa tối đa là $' +
          M +
          '$ hành khách. Trong một khu du lịch, một đoàn khách gồm $' +
          G +
          '$ người muốn thuê xe về khách sạn. Lái xe đưa ra thỏa thuận: nếu một chuyến xe chở $x$ người ($0 < x \\le ' +
          M +
          '$) thì giá tiền cho mỗi người là $\\frac{(' +
          A +
          ' - x)^2}{2}$ (nghìn đồng). Hỏi lái xe có thể thu được nhiều nhất bao nhiêu triệu đồng từ một chuyến chở khách (làm tròn kết quả đến hàng phần trăm)?',
        shortAnswer: ansStr,
        numericValue: pMaxMil,
        answerSummary: ansStr + ' triệu đồng',
        solutionSteps: [
          'Gọi $x$ là số hành khách trong một chuyến ($0 < x \\le ' + M + '$). Doanh thu là $P(x) = \\frac{x(' + A + ' - x)^2}{2}$ (nghìn đồng).',
          "Đạo hàm $P'(x) = \\frac{(" + A + ' - x)(' + A + ' - 3x)}{2} > 0$ với mọi $x \\in (0;\\, ' + M + ']$ (vì $' + M + ' \\le \\frac{' + A + '}{3}$).',
          'Suy ra $P(x)$ đồng biến trên $(0;\\, ' + M + ']$, đạt giá trị lớn nhất tại $x = ' + M + '$ với $P_{\\max} = ' + u.formatNumberVN(pMaxK, 1) + '$ nghìn đồng $\\approx ' + ansStr + '$ triệu đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M = 0 (xe không chở được khách)', params: { M: 0, extraA: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (M=15, A=50 -> 9,19 triệu)', params: { M: 15, extraA: 5 }, expectedValid: true },
    ],
  },

  // Dạng 51 (Q51)
  t12_b5_d51_two_poles_wire_sa: {
    id: 't12_b5_d51_two_poles_wire_sa',
    name: 'Tìm vị trí chốt dây giữa hai chiếc cọc để tổng độ dài dây ngắn nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Cực tiểu tổng khoảng cách hình học',
    description:
      'Hai cọc cao h1 và h2 = k·h1 đặt cách nhau L = (k + 1)·m. Chốt đặt cách chân cọc ngắn đoạn x. Tìm x để tổng độ dài hai dây tới đỉnh hai cọc ngắn nhất.',
    conditionSummary: 'h2 = k·h1, L = (k + 1)·m để nghiệm tối ưu x = m nguyên chính xác',
    paramSpecs: [
      { name: 'h1', label: 'Chiều cao cọc ngắn h1 (m)', min: 6, max: 14 },
      { name: 'k', label: 'Tỉ số chiều cao k = h2/h1', min: 2, max: 4 },
      { name: 'm', label: 'Khoảng cách tối ưu x = m (m)', min: 4, max: 10 },
    ],
    validateCode: `
      const { h1, k, m } = params;
      if (h1 <= 0 || h1 > 100 || k < 2 || k > 10 || m <= 0 || m > 100) return { valid: false, reason: 'Chiều cao và khoảng cách ngoài miền hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h1, k, m } = params;
      const h2 = k * h1;
      const L = (k + 1) * m;
      const h1Sq = h1 * h1;
      const h2Sq = h2 * h2;
      const ratioFrac = u.simplifyFrac(1, k);

      return {
        stem:
          'Có hai chiếc cọc thẳng đứng có chiều cao lần lượt là $' +
          h1 +
          '$ m và $' +
          h2 +
          '$ m, đặt cách nhau $' +
          L +
          '$ m. Chúng được buộc bởi hai sợi dây căng từ một cái chốt trên mặt đất nằm giữa hai chân cọc tới đỉnh của mỗi cọc. Gọi $x$ (m) là khoảng cách từ chốt đến chân cọc ngắn. Tìm $x$ để tổng độ dài hai sợi dây là ngắn nhất.',
        diagram: { kind: 'geometry_figure', figureType: 'two_poles_wire', params: { h1, h2, L } },
        shortAnswer: '' + m,
        numericValue: m,
        answerSummary: 'x = ' + m + ' m',
        solutionSteps: [
          'Tổng độ dài hai sợi dây là $f(x) = \\sqrt{x^2 + ' + h1Sq + '} + \\sqrt{(' + L + ' - x)^2 + ' + h2Sq + '}$ với $0 < x < ' + L + '$.',
          "Đạo hàm $f'(x) = \\frac{x}{\\sqrt{x^2 + " + h1Sq + '}} - \\frac{' + L + ' - x}{\\sqrt{(' + L + ' - x)^2 + ' + h2Sq + '}} = 0$.',
          'Bình phương hai vế và rút gọn ta được $\\frac{x^2}{(' + L + ' - x)^2} = \\frac{' + h1Sq + '}{' + h2Sq + '} \\Rightarrow \\frac{x}{' + L + ' - x} = ' + ratioFrac.latex + ' \\Leftrightarrow x = ' + m + '$ (m).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k < 2 (cọc không phân biệt)', params: { h1: 9, k: 1, m: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (h1=9, h2=27, L=20 -> x = 5 m)', params: { h1: 9, k: 3, m: 5 }, expectedValid: true },
    ],
  },

  // Dạng 52 (Q52)
  t12_b5_d52_fish_pond_sa: {
    id: 't12_b5_d52_fish_pond_sa',
    name: 'Tìm số cá giống cần thả để tổng sản lượng thu hoạch cao nhất (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu sản lượng nông nghiệp',
    description:
      'Ao diện tích S m², mật độ d con/m², thu tổng N0·w0 kg. Giảm k con thì mỗi con tăng dw kg. Tính số cá giống cần thả để tổng khối lượng thu được lớn nhất.',
    conditionSummary: 'Số lần giảm nguyên tối ưu x* ∈ [10; 150] và N_best > 20',
    paramSpecs: [
      { name: 'area', label: 'Diện tích ao S (m²)', min: 45, max: 75 },
      { name: 'dens', label: 'Mật độ (con/m²)', min: 15, max: 23 },
      { name: 'w0Ten', label: 'Khối lượng 1 con · 10 (kg)', min: 10, max: 13 },
      { name: 'k', label: 'Số con giảm mỗi lần k', min: 5, max: 9 },
      { name: 'dwTen', label: 'Mức tăng trọng · 10 (kg)', min: 3, max: 6 },
    ],
    validateCode: `
      const { area, dens, w0Ten, k, dwTen } = params;
      if (area < 10 || area > 500 || dens < 5 || dens > 100 || w0Ten < 5 || w0Ten > 50 || k < 1 || k > 30 || dwTen < 1 || dwTen > 20) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      const N0 = area * dens;
      const w0 = w0Ten / 10;
      const dw = dwTen / 10;
      const xCont = (N0 * dw - k * w0) / (2 * k * dw);
      if (xCont < 5 || N0 - k * Math.ceil(xCont) <= 20) return { valid: false, reason: 'Số lần giảm không hợp lệ' };
      const fl = Math.floor(xCont);
      const cl = Math.ceil(xCont);
      const m = (x) => (N0 - k * x) * (w0 + dw * x);
      if (fl !== cl && Math.abs(m(fl) - m(cl)) < 1e-6) return { valid: false, reason: 'Hai điểm nguyên có sản lượng bằng nhau' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { area, dens, w0Ten, k, dwTen } = params;
      const N0 = area * dens;
      const w0 = w0Ten / 10;
      const dw = dwTen / 10;
      const W0 = Number((N0 * w0).toFixed(1));
      const xCont = (N0 * dw - k * w0) / (2 * k * dw);
      const fl = Math.floor(xCont);
      const cl = Math.ceil(xCont);
      const calcM = (x) => (N0 - k * x) * (w0 + dw * x);
      const xBest = calcM(fl) >= calcM(cl) ? fl : cl;
      const nBest = N0 - k * xBest;

      const a2 = Number((-k * dw).toFixed(2));
      const b1 = Number((N0 * dw - k * w0).toFixed(2));
      const c0 = Number(W0.toFixed(2));
      const mExpr = u.formatNumberVN(a2, 2) + 'x^2 + ' + u.formatNumberVN(b1, 2) + 'x + ' + u.formatNumberVN(c0, 2);

      return {
        stem:
          'Bác Hùng có một cái ao có diện tích $' +
          area +
          '\\text{ m}^2$ để nuôi cá. Vụ vừa qua bác nuôi với mật độ $' +
          dens +
          '$ con/$\\text{m}^2$ và thu được tất cả $' +
          u.formatNumberVN(W0, 1) +
          '$ kg cá thành phẩm. Theo kinh nghiệm, bác thấy cứ thả giảm đi $' +
          k +
          '$ con thì mỗi con cá thu được tăng thêm $' +
          u.formatNumberVN(dw, 1) +
          '$ kg. Hỏi vụ tới bác phải mua bao nhiêu con cá giống để đạt tổng khối lượng cá thành phẩm cao nhất (giả sử không có hao hụt)?',
        shortAnswer: '' + nBest,
        numericValue: nBest,
        answerSummary: nBest + ' con cá giống',
        solutionSteps: [
          'Số cá ban đầu là $' + dens + ' \\cdot ' + area + ' = ' + N0 + '$ con, khối lượng trung bình mỗi con là $\\frac{' + u.formatNumberVN(W0, 1) + '}{' + N0 + '} = ' + u.formatNumberVN(w0, 1) + '$ kg.',
          'Gọi $x$ ($x \\in \\mathbb{N}$) là số lần giảm $' + k + '$ con. Tổng sản lượng thu được là $M(x) = (' + N0 + ' - ' + k + 'x)(' + u.formatNumberVN(w0, 1) + ' + ' + u.formatNumberVN(dw, 1) + 'x) = ' + mExpr + '$.',
          'Đỉnh parabol là $x_0 \\approx ' + u.formatNumberVN(xCont, 1) + '$. Với $x$ nguyên, kiểm tra giá trị cực đại đạt tại $x = ' + xBest + '$.',
          'Số lượng cá giống cần mua là $N = ' + N0 + ' - ' + k + ' \\cdot ' + xBest + ' = ' + nBest + '$ (con).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { area: 58, dens: 19, w0Ten: 11, k: 0, dwTen: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (S=58, d=19, w0=1.1, k=7, dw=0.5 -> 556 con)', params: { area: 58, dens: 19, w0Ten: 11, k: 7, dwTen: 5 }, expectedValid: true },
    ],
  },

  // Dạng 53 (Q53)
  t12_b5_d53_restaurant_overtime_sa: {
    id: 't12_b5_d53_restaurant_overtime_sa',
    name: 'Tối ưu số nhân viên tăng ca của nhà hàng có tiền thưởng và tiền tip',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu lợi nhuận vận hành doanh nghiệp',
    description:
      'Nhà hàng có N nhân viên, lương cố định w USD/tháng. Mỗi người tăng ca làm lương mọi người tăng ca tăng thêm 2% và mang về T USD tip. Xác định số nhân viên KHÔNG tăng ca để lợi nhuận lớn nhất.',
    conditionSummary: 'x0 = 25·T/w ∈ [10; N - 5], chọn số nguyên x* tối ưu và trả về N - x*',
    paramSpecs: [
      { name: 'N', label: 'Tổng số nhân viên N', min: 90, max: 130 },
      { name: 'w', label: 'Lương cố định w (USD)', min: 280, max: 380, step: 3 },
      { name: 'f0k', label: 'Chi phí cơ sở (nghìn USD)', min: 8, max: 14 },
      { name: 'r0k', label: 'Doanh thu nền (nghìn USD)', min: 35, max: 52 },
      { name: 'tip', label: 'Tiền tip mỗi NV tăng ca (USD)', min: 850, max: 1150, step: 50 },
    ],
    validateCode: `
      const { N, w, f0k, r0k, tip } = params;
      if (N < 15 || N > 500 || w < 50 || w > 2000 || f0k <= 0 || r0k <= 0 || tip <= 0 || tip > 5000) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      const xCont = (25 * tip) / w;
      if (xCont < 8 || xCont > N - 4) return { valid: false, reason: 'Số nhân viên tăng ca tối ưu phải thuộc [8; N - 4]' };
      const fl = Math.floor(xCont);
      const cl = Math.ceil(xCont);
      const R0 = r0k * 1000;
      const F0 = f0k * 1000;
      const P = (x) => (R0 - w * N - F0) + tip * x - (0.02 * w) * x * x;
      if (fl !== cl && Math.abs(P(fl) - P(cl)) < 1e-4) return { valid: false, reason: 'Hai số nguyên lân cận có cùng lợi nhuận' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { N, w, f0k, r0k, tip } = params;
      const R0 = r0k * 1000;
      const F0 = f0k * 1000;
      const cConst = R0 - w * N - F0;
      const a2 = Number((0.02 * w).toFixed(2));
      const xCont = (25 * tip) / w;
      const fl = Math.floor(xCont);
      const cl = Math.ceil(xCont);
      const calcP = (x) => cConst + tip * x - a2 * x * x;
      const xBest = calcP(fl) >= calcP(cl) ? fl : cl;
      const nonOvertime = N - xBest;

      const constTerm = cConst === 0 ? '' : cConst > 0 ? ' + ' + cConst : ' - ' + Math.abs(cConst);
      const pExpr = '-' + u.formatNumberVN(a2, 2) + 'x^2 + ' + tip + 'x' + constTerm;

      return {
        stem:
          'Một nhà hàng có tổng cộng $' +
          N +
          '$ nhân viên và chi trả mức lương cố định cho mỗi nhân viên là $' +
          w +
          '$ USD/tháng. Vì lượng khách đông, chủ nhà hàng khuyến khích nhân viên tăng ca: nếu có $x$ nhân viên tăng ca thì lương cho mỗi người tăng ca sẽ được tăng thêm $2x\\%$. Tiền điện nước và duy trì cơ sở vật chất cố định là $' +
          F0 +
          '$ USD/tháng. Doanh thu trung bình từ khách hàng là $' +
          R0 +
          '$ USD/tháng và mỗi nhân viên tăng ca mang về tiền tip trung bình $' +
          tip +
          '$ USD/tháng (tính vào doanh thu). Xác định số nhân viên không tăng ca cần có để lợi nhuận của nhà hàng đạt giá trị lớn nhất.',
        shortAnswer: '' + nonOvertime,
        numericValue: nonOvertime,
        answerSummary: nonOvertime + ' nhân viên không tăng ca',
        solutionSteps: [
          'Gọi $x$ ($x \\in \\mathbb{N},\\, 0 \\le x \\le ' + N + '$) là số nhân viên tăng ca; số nhân viên không tăng ca là $' + N + ' - x$.',
          'Doanh thu $R(x) = ' + R0 + ' + ' + tip + 'x$; chi phí $C(x) = (' + N + ' - x)\\cdot' + w + ' + x\\cdot' + w + '\\left(1 + \\frac{2x}{100}\\right) + ' + F0 + '$.',
          'Lợi nhuận: $P(x) = R(x) - C(x) = ' + pExpr + '$.',
          'Đỉnh parabol là $x_0 = \\frac{' + tip + '}{' + u.formatNumberVN(2 * a2, 2) + '} \\approx ' + u.formatNumberVN(xCont, 1) + '$. Kiểm tra giá trị nguyên lân cận chọn $x = ' + xBest + '$, nên số nhân viên không tăng ca là $' + N + ' - ' + xBest + ' = ' + nonOvertime + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên w = 0 (chia cho 0)', params: { N: 106, w: 0, f0k: 10, r0k: 39, tip: 1000 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (N=106, w=321, F0=10k, R0=39k, tip=1000 -> 28 NV)', params: { N: 106, w: 321, f0k: 10, r0k: 39, tip: 1000 }, expectedValid: true },
    ],
  },

  // Dạng 54 (Q54)
  t12_b5_d54_homestay_pricing_sa: {
    id: 't12_b5_d54_homestay_pricing_sa',
    name: 'Tối ưu giá phòng Homestay theo bước điều chỉnh giá nguyên (hàm bậc ba)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu giá dịch vụ lưu trú (hàm bậc ba rời rạc)',
    description:
      'Homestay giá p0, k0 khách, ở t0 ngày. Mỗi bước tăng 0,25 triệu giảm dk khách và 1 ngày lưu trú (giảm giá thì tăng tương ứng). Biết chi phí c0 và giá trần pMax, tìm mức giá tối ưu (làm tròn hàng phần mười).',
    conditionSummary: 'Đánh giá trên mọi bước nguyên x thỏa mãn p0 + 0,25x ∈ [c0; pMax], k(x) ≥ 1, t(x) ≥ 1',
    paramSpecs: [
      { name: 'p020', label: 'Giá ban đầu · 20 (triệu đ)', min: 22, max: 30 },
      { name: 'k0', label: 'Số lượt khách ban đầu', min: 52, max: 80 },
      { name: 't0', label: 'Số ngày lưu trú ban đầu', min: 4, max: 7 },
      { name: 'dk', label: 'Giảm khách mỗi bước tăng giá', min: 4, max: 7 },
      { name: 'c020', label: 'Chi phí vận hành · 20 (triệu đ)', min: 14, max: 19 },
    ],
    validateCode: `
      const { p020, k0, t0, dk, c020 } = params;
      if (p020 <= c020 + 2 || p020 > 100 || c020 <= 0 || k0 < 10 || k0 > 500 || t0 < 2 || t0 > 20 || dk < 1 || dk > 30) {
        return { valid: false, reason: 'Tham số định giá Homestay ngoài miền hợp lệ' };
      }
      const p0 = p020 / 20;
      const c0 = c020 / 20;
      const pMax = 2.4;
      if (p0 > pMax - 0.3) return { valid: false, reason: 'Giá ban đầu phải thấp hơn giá trần ít nhất 0,3 triệu' };
      const xMin = Math.ceil((c0 - p0) / 0.25);
      const xMax = Math.min(Math.floor((pMax - p0) / 0.25), Math.floor((k0 - 1) / dk), t0 - 1);
      if (xMax < xMin + 1) return { valid: false, reason: 'Miền bước giá nguyên quá hẹp' };
      const P = (x) => (p0 + 0.25 * x - c0) * (k0 - dk * x) * (t0 - x);
      let bestX = xMin;
      let bestP = P(xMin);
      let tie = false;
      for (let x = xMin + 1; x <= xMax; x++) {
        const val = P(x);
        if (val > bestP + 1e-6) {
          bestP = val;
          bestX = x;
          tie = false;
        } else if (Math.abs(val - bestP) <= 1e-6) {
          tie = true;
        }
      }
      if (tie || bestP <= 0) return { valid: false, reason: 'Cần giá trị cực đại duy nhất và lợi nhuận dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p020, k0, t0, dk, c020 } = params;
      const p0 = Number((p020 / 20).toFixed(2));
      const c0 = Number((c020 / 20).toFixed(2));
      const pMax = 2.4;
      const xMin = Math.ceil((c0 - p0) / 0.25);
      const xMax = Math.min(Math.floor((pMax - p0) / 0.25), Math.floor((k0 - 1) / dk), t0 - 1);

      const calcP = (x) => (p0 + 0.25 * x - c0) * (k0 - dk * x) * (t0 - x);
      let bestX = xMin;
      let bestVal = calcP(xMin);
      for (let x = xMin + 1; x <= xMax; x++) {
        const val = calcP(x);
        if (val > bestVal) {
          bestVal = val;
          bestX = x;
        }
      }
      const pOpt = Number((p0 + 0.25 * bestX).toFixed(1));
      const pOptExact = Number((p0 + 0.25 * bestX).toFixed(2));
      const pOptStr = u.formatNumberVN(pOpt, 1);

      // Expand P(x) = (m0 + 0.25x)(k0 - dk*x)(t0 - x) cleanly with zero +- signs
      const m0 = Number((p0 - c0).toFixed(2));
      const A3 = Number((0.25 * dk).toFixed(4));
      const A2 = Number((m0 * dk - 0.25 * (k0 + dk * t0)).toFixed(4));
      const A1 = Number((0.25 * k0 * t0 - m0 * (k0 + dk * t0)).toFixed(4));
      const A0 = Number((m0 * k0 * t0).toFixed(4));
      const fmtTerm = (coef, sym, first) => {
        if (Math.abs(coef) < 1e-9) return '';
        const absStr = u.formatNumberVN(Math.abs(coef), 3);
        const sign = coef < 0 ? (first ? '-' : ' - ') : (first ? '' : ' + ');
        return sign + (absStr === '1' && sym ? '' : absStr) + sym;
      };
      const terms = [];
      [
        [A3, 'x^3'],
        [A2, 'x^2'],
        [A1, 'x'],
        [A0, ''],
      ].forEach(([coef, sym]) => {
        const part = fmtTerm(coef, sym, terms.length === 0);
        if (part) terms.push(part);
      });
      const polyStr = terms.join('') || '0';

      return {
        stem:
          'Một Homestay đang áp dụng mức giá cho thuê là $' +
          u.formatNumberVN(p0, 2) +
          '$ triệu đồng/người/ngày. Tại mức giá này, trung bình mỗi tháng Homestay đón $' +
          k0 +
          '$ lượt khách và mỗi khách lưu trú $' +
          t0 +
          '$ ngày. Chủ Homestay thấy rằng cứ tăng giá thêm $0,25$ triệu đồng/người/ngày thì số khách giảm $' +
          dk +
          '$ người và thời gian lưu trú trung bình giảm $1$ ngày (ngược lại nếu giảm giá thì các chỉ số tăng tương ứng). Biết chi phí vận hành mỗi khách một ngày là $' +
          u.formatNumberVN(c0, 2) +
          '$ triệu đồng và giá trần không vượt quá $' +
          u.formatNumberVN(pMax, 1) +
          '$ triệu đồng/người/ngày. Hỏi Homestay nên áp dụng mức giá nào (triệu đồng/người/ngày) để lợi nhuận cao nhất (kết quả làm tròn đến hàng phần mười)?',
        shortAnswer: pOptStr,
        numericValue: pOpt,
        answerSummary: pOptStr + ' triệu đồng/người/ngày',
        solutionSteps: [
          'Gọi $x$ ($x \\in \\mathbb{Z}$) là số bước điều chỉnh giá (mỗi bước $0,25$ triệu). Khi đó $p(x) = ' + u.formatNumberVN(p0, 2) + ' + 0,25x$, số khách $k(x) = ' + k0 + ' - ' + dk + 'x$, số ngày lưu trú $t(x) = ' + t0 + ' - x$.',
          'Điều kiện: $' + u.formatNumberVN(c0, 2) + ' \\le p(x) \\le ' + u.formatNumberVN(pMax, 1) + '$, $k(x) \\ge 1$, $t(x) \\ge 1 \\Rightarrow ' + xMin + ' \\le x \\le ' + xMax + '$.',
          'Lợi nhuận tháng: $P(x) = (p(x) - ' + u.formatNumberVN(c0, 2) + ')k(x)t(x) = ' + polyStr + '$.',
          'Xét các giá trị nguyên $x \\in [' + xMin + ';\\, ' + xMax + ']$, lợi nhuận lớn nhất đạt tại $x = ' + bestX + ' \\Rightarrow p = ' + u.formatNumberVN(p0, 2) + ' + 0,25\\cdot(' + bestX + ') = ' + u.formatNumberVN(pOptExact, 2) + ' \\approx ' + pOptStr + '$ triệu đồng/người/ngày.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên giá vốn ≥ giá bán (c0 ≥ p0)', params: { p020: 25, k0: 63, t0: 5, dk: 5, c020: 25 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (p0=1.25, k0=63, t0=5, dk=5, c0=0.85 -> 1,5 triệu)', params: { p020: 25, k0: 63, t0: 5, dk: 5, c020: 17 }, expectedValid: true },
    ],
  },
};
