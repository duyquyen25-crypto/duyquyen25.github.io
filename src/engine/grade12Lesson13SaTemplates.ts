import { MathTemplate } from '../types/math';

export const G12_B13_SA_TEMPLATES: Record<string, MathTemplate> = {
  // =====================================================================
  // BÀI 13. ỨNG DỤNG HÌNH HỌC CỦA TÍCH PHÂN — PHẦN III: 22 DẠNG TRẢ LỜI NGẮN (D45..D66)
  // =====================================================================

  // Dạng 45 (Q45): Diện tích hình phẳng giới hạn bởi hàm phân thức (k - x)/(-a x - b) và hai trục
  t12_b13_d45_homographic_axes_area_sa: {
    id: 't12_b13_d45_homographic_axes_area_sa',
    name: 'Tính diện tích hình phẳng giới hạn bởi đồ thị phân thức y = (k - x)/(-ax - b) và hai trục tọa độ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Diện tích hình phẳng',
    description: 'Tìm hoành độ giao điểm với Ox là x = k rồi tính ∫_0^k |(k-x)/(-ax-b)|dx, làm tròn hàng phần trăm.',
    conditionSummary: 'k >= 2, a >= 1, b >= 2',
    paramSpecs: [
      { name: 'k', label: 'Hoành độ giao điểm Ox (k)', min: 2, max: 6 },
      { name: 'a', label: 'Hệ số a', min: 1, max: 3 },
      { name: 'b', label: 'Hằng số b', min: 2, max: 6 },
    ],
    validateCode: `
      const { k, a, b } = params;
      if (k < 2 || a < 1 || b < 2) return { valid: false, reason: 'Cần k >= 2, a >= 1, b >= 2' };
      const val = ((a * k + b) * Math.log((a * k + b) / b) - a * k) / (a * a);
      const frac = Math.abs((val * 100) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn phần trăm' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, a, b } = params;
      const numDen = a * k + b;
      const val = (numDen * Math.log(numDen / b) - a * k) / (a * a);
      const rounded = Math.round(val * 100) / 100;
      const shortAnswer = u.formatNumberVN(rounded, 2);
      const denomStr = (-a === -1 ? '-x' : '-' + a + 'x') + ' - ' + b;
      const asymFr = u.simplifyFrac(-b, a);
      const asymTex = asymFr.den === 1 ? '' + asymFr.num : '-\\frac{' + Math.abs(asymFr.num) + '}{' + asymFr.den + '}';
      return {
        stem: 'Gọi $S$ là hình phẳng giới hạn bởi đồ thị hàm số $(H):\\, y=\\dfrac{' + k + ' - x}{' + denomStr + '}$ và các trục tọa độ. Tính diện tích hình phẳng $S$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Điều kiện: $x \\ne ' + asymTex + '$.',
          'Hoành độ giao điểm của $(H)$ và trục $Ox$ là nghiệm của $\\frac{' + k + ' - x}{' + denomStr + '} = 0 \\Leftrightarrow x = ' + k + '$.',
          'Diện tích hình phẳng là $S = \\int \\limits_{0}^{' + k + '} \\left|\\frac{' + k + ' - x}{' + denomStr + '}\\right|\\mathrm{\\,d}x = \\int \\limits_{0}^{' + k + '} \\frac{' + k + ' - x}{' + a + 'x + ' + b + '}\\mathrm{\\,d}x \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { k: 4, a: 0, b: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q45 (4-x)/(-2x-3)', params: { k: 4, a: 2, b: 3 }, expectedValid: true },
    ],
  },

  // Dạng 46 (Q46): Diện tích giới hạn bởi đường thẳng và parabol (làm tròn phần mười)
  t12_b13_d46_quad_line_area_sa: {
    id: 't12_b13_d46_quad_line_area_sa',
    name: 'Tính diện tích hình phẳng giới hạn bởi đường thẳng và parabol (trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Diện tích hình phẳng',
    description: 'Giải phương trình hoành độ giao điểm x1 < x2 rồi tính ∫_{x1}^{x2} |f(x)-g(x)|dx.',
    conditionSummary: 'k >= 2, x1 >= 0, hiệu x2 - x1 ∈ {2, 3, 4}',
    paramSpecs: [
      { name: 'k', label: 'Hệ số độ cong k', min: 2, max: 5 },
      { name: 'x1', label: 'Nghiệm x1', min: 0, max: 3 },
      { name: 'span', label: 'Hiệu x2 - x1', min: 2, max: 4 },
      { name: 'm', label: 'Hệ số góc đường thẳng m', min: 2, max: 6 },
    ],
    validateCode: `
      if (params.k < 2 || params.span < 2) return { valid: false, reason: 'Cần k >= 2 và span >= 2' };
      const val = (params.k * Math.pow(params.span, 3)) / 6;
      const frac = Math.abs((val * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, x1, span, m } = params;
      const x2 = x1 + span;
      const n = 3;
      // g(x) = m*x + n; f(x) - g(x) = -k(x-x1)(x-x2) = -k*x^2 + k*(x1+x2)*x - k*x1*x2
      const b2 = k * (x1 + x2) + m;
      const c2 = n - k * x1 * x2;
      const lineStr = u.formatLinear(m, n);
      const quadStr = u.formatQuadratic(-k, b2, c2);
      const diffStr = u.formatQuadratic(-k, k * (x1 + x2), -k * x1 * x2);
      const val = (k * Math.pow(span, 3)) / 6;
      const rounded = Math.round(val * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      return {
        stem: 'Tính diện tích của hình phẳng giới hạn bởi đường thẳng $y=' + lineStr + '$ và đồ thị hàm số $y=' + quadStr + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Xét phương trình hoành độ giao điểm: $' + quadStr + ' = ' + lineStr + ' \\Leftrightarrow ' + diffStr + ' = 0 \\Leftrightarrow x=' + x1 + ',\\, x=' + x2 + '$.',
          'Diện tích hình phẳng là $S = \\int \\limits_{' + x1 + '}^{' + x2 + '} |' + diffStr + '|\\mathrm{\\,d}x = \\frac{' + k + '\\cdot (' + x2 + ' - ' + x1 + ')^3}{6} = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên span < 2', params: { k: 3, x1: 2, span: 1, m: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q46 k=3, [2;4], m=5', params: { k: 3, x1: 2, span: 2, m: 5 }, expectedValid: true },
    ],
  },

  // Dạng 47 (Q47): Diện tích giới hạn bởi đồ thị bậc ba và parabol (3 giao điểm r1 < r2 < r3)
  t12_b13_d47_cubic_quad_area_sa: {
    id: 't12_b13_d47_cubic_quad_area_sa',
    name: 'Tính diện tích hình phẳng giới hạn bởi đồ thị bậc ba và parabol',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Diện tích hình phẳng',
    description: 'Giải phương trình bậc ba tìm 3 giao điểm r1 < r2 < r3 và tính tổng hai tích phân |f(x)-g(x)|.',
    conditionSummary: 'r1 < r2 < r3 nguyên phân biệt',
    paramSpecs: [
      { name: 'r1', label: 'Nghiệm r1', min: -3, max: -1 },
      { name: 'r2', label: 'Nghiệm r2', min: 0, max: 2 },
      { name: 'r3', label: 'Nghiệm r3', min: 3, max: 5 },
    ],
    validateCode: `
      const { r1, r2, r3 } = params;
      if (!(r1 < r2 && r2 < r3)) return { valid: false, reason: 'Cần r1 < r2 < r3' };
      const s2 = -(r1 + r2 + r3);
      const s1 = r1 * r2 + r2 * r3 + r3 * r1;
      const s0 = -r1 * r2 * r3;
      const F = (x) => Math.pow(x, 4) / 4 + (s2 * Math.pow(x, 3)) / 3 + (s1 * x * x) / 2 + s0 * x;
      const area = Math.abs(F(r2) - F(r1)) + Math.abs(F(r3) - F(r2));
      const frac = Math.abs((area * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r1, r2, r3 } = params;
      const s2 = -(r1 + r2 + r3);
      const s1 = r1 * r2 + r2 * r3 + r3 * r1;
      const s0 = -r1 * r2 * r3;
      // Chọn g(x) = x^2 - 4x + 1 -> f(x) = x^3 + (s2+1)x^2 + (s1-4)x + (s0+1)
      const fPoly = u.formatPoly([1, s2 + 1, s1 - 4, s0 + 1]);
      const gPoly = u.formatQuadratic(1, -4, 1);
      const diffPoly = u.formatPoly([1, s2, s1, s0]);
      const F12 = (x) => 3 * Math.pow(x, 4) + 4 * s2 * Math.pow(x, 3) + 6 * s1 * x * x + 12 * s0 * x;
      const a1Fr = u.simplifyFrac(Math.abs(F12(r2) - F12(r1)), 12);
      const a2Fr = u.simplifyFrac(Math.abs(F12(r3) - F12(r2)), 12);
      const area = a1Fr.value + a2Fr.value;
      const rounded = Math.round(area * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const a1Tex = a1Fr.den === 1 ? '' + a1Fr.num : '\\frac{' + a1Fr.num + '}{' + a1Fr.den + '}';
      const a2Tex = a2Fr.den === 1 ? '' + a2Fr.num : '\\frac{' + a2Fr.num + '}{' + a2Fr.den + '}';
      return {
        stem: 'Tính diện tích hình phẳng giới hạn bởi đồ thị các hàm số $y=' + fPoly + '$ và $y=' + gPoly + '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Xét phương trình: $' + fPoly + ' = ' + gPoly + ' \\Leftrightarrow ' + diffPoly + ' = 0 \\Leftrightarrow x=' + r1 + ',\\, x=' + r2 + ',\\, x=' + r3 + '$.',
          'Diện tích hình phẳng là $S = \\int \\limits_{' + r1 + '}^{' + r2 + '} |' + diffPoly + '|\\mathrm{\\,d}x + \\int \\limits_{' + r2 + '}^{' + r3 + '} |' + diffPoly + '|\\mathrm{\\,d}x = ' + a1Tex + ' + ' + a2Tex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên trùng nghiệm r2 = r3', params: { r1: -2, r2: 2, r3: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q47 r=(-2, 1, 3)', params: { r1: -2, r2: 1, r3: 3 }, expectedValid: true },
    ],
  },

  // Dạng 48 (Q48): Diện tích tam giác cong đỉnh (-a;0), giao tại (0; a^2), cắt Ox tại c (có hình)
  t12_b13_d48_curved_triangle_sa: {
    id: 't12_b13_d48_curved_triangle_sa',
    name: 'Tính diện tích tam giác cong giới hạn bởi parabol, đường thẳng và trục Ox (có hình)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Diện tích qua đồ thị',
    description: 'Tính diện tích tam giác cong y = (x + a)^2, y = a^2 - (a^2/c)x và trục Ox.',
    conditionSummary: 'a >= 2, c >= 2 nguyên dương',
    paramSpecs: [
      { name: 'a', label: 'Tham số dịch a (đỉnh -a)', min: 2, max: 4 },
      { name: 'c', label: 'Giao điểm Ox dương c', min: 2, max: 5 },
    ],
    validateCode: `
      const { a, c } = params;
      if (a < 2 || c < 2) return { valid: false, reason: 'Cần a >= 2 và c >= 2' };
      const val = (a * a * a) / 3 + (a * a * c) / 2;
      const frac = Math.abs((val * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, c } = params;
      const ym = a * a;
      const paraPoly = u.formatQuadratic(1, 2 * a, ym);
      const slFr = u.simplifyFrac(ym, c);
      const slTex = slFr.den === 1 ? (slFr.num === 1 ? 'x' : slFr.num + 'x') : '\\frac{' + slFr.num + ' x}{' + slFr.den + '}';
      const lineStr = ym + ' - ' + slTex;
      const s1Fr = u.simplifyFrac(ym * a, 3);
      const s2Fr = u.simplifyFrac(ym * c, 2);
      const area = s1Fr.value + s2Fr.value;
      const rounded = Math.round(area * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const s1Tex = s1Fr.den === 1 ? '' + s1Fr.num : '\\frac{' + s1Fr.num + '}{' + s1Fr.den + '}';
      const s2Tex = s2Fr.den === 1 ? '' + s2Fr.num : '\\frac{' + s2Fr.num + '}{' + s2Fr.den + '}';
      return {
        stem: 'Gọi tam giác cong là hình phẳng giới hạn bởi đồ thị các hàm số $y=' + lineStr + '$, $y=' + paraPoly + '$ và $y=0$ (phần gạch chéo trong hình vẽ dưới đây). Tính diện tích của tam giác cong đã cho (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_curved_triangle',
          params: { xv: -a, xm: 0, xr: c, ym },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Hai đồ thị $y=' + paraPoly + '$ và $y=' + lineStr + '$ cắt nhau tại hoành độ dương nhất là $x=0$.',
          'Diện tích tam giác cong là $S = \\int \\limits_{-' + a + '}^{0} (' + paraPoly + ')\\mathrm{\\,d}x + \\int \\limits_{0}^{' + c + '} (' + lineStr + ')\\mathrm{\\,d}x = ' + s1Tex + ' + ' + s2Tex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a < 2', params: { a: 1, c: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q48 a=3, c=2', params: { a: 3, c: 2 }, expectedValid: true },
    ],
  },

  // Dạng 49 (Q49): Hoa văn hình vuông cạnh L khoét 4 cung parabol (có hình)
  t12_b13_d49_square_4parabolas_cut_sa: {
    id: 't12_b13_d49_square_4parabolas_cut_sa',
    name: 'Tính diện tích hoa văn hình vuông khoét 4 phần hình parabol (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tính diện tích bề mặt còn lại S = L^2 - 4 * (2/3 * AB * OH), tính S/K làm tròn hàng phần mười.',
    conditionSummary: 'L >= 8, AB < L, 2*OH < L',
    paramSpecs: [
      { name: 'L', label: 'Cạnh hình vuông L (cm)', min: 9, max: 14 },
      { name: 'ab', label: 'Chiều rộng đáy parabol AB (cm)', min: 5, max: 8 },
      { name: 'oh', label: 'Chiều sâu khoét OH (cm)', min: 1, max: 3 },
      { name: 'K', label: 'Số chia K', min: 10, max: 15, step: 5 },
    ],
    validateCode: `
      const { L, ab, oh, K } = params;
      if (ab >= L || 2 * oh >= L - 1 || K < 10) return { valid: false, reason: 'Cần AB < L và 2*OH < L - 1' };
      const s = L * L - (8 * ab * oh) / 3;
      if (s <= 0) return { valid: false, reason: 'Diện tích còn lại phải dương' };
      const ans = s / K;
      const frac = Math.abs((ans * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L, ab, oh, K } = params;
      const sOneFr = u.simplifyFrac(2 * ab * oh, 3);
      const sNum = 3 * L * L - 8 * ab * oh;
      const sFr = u.simplifyFrac(sNum, 3);
      const ans = sFr.value / K;
      const rounded = Math.round(ans * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const sOneTex = sOneFr.den === 1 ? '' + sOneFr.num : '\\frac{' + sOneFr.num + '}{' + sOneFr.den + '}';
      const sTex = sFr.den === 1 ? '' + sFr.num : '\\frac{' + sFr.num + '}{' + sFr.den + '}';
      return {
        stem: 'Một hoa văn trang trí được tạo ra từ một miếng bìa hình vuông cạnh bằng $' + L + '$ cm bằng cách khoét đi bốn phần bằng nhau có hình dạng parabol như hình vẽ bên. Biết $AB=' + ab + '$ cm, $OH=' + oh + '$ cm. Gọi $S$ là diện tích của bề mặt hoa văn đó (đơn vị: $\\mathrm{cm^2}$). Tính $\\dfrac{S}{' + K + '}$ (kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_square_4parabolas_cut',
          params: { L, AB: ab, OH: oh },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Mỗi phần parabol bị khoét có diện tích $S_0 = \\frac{2}{3}\\cdot AB\\cdot OH = \\frac{2}{3}\\cdot ' + ab + '\\cdot ' + oh + ' = ' + sOneTex + '\\,(\\mathrm{cm^2})$.',
          'Diện tích bề mặt hoa văn là $S = ' + L + '^2 - 4S_0 = ' + sTex + '\\,(\\mathrm{cm^2})$.',
          'Suy ra $\\frac{S}{' + K + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên 2*OH quá lớn', params: { L: 8, ab: 6, oh: 4, K: 15 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q49 L=11, AB=7, OH=1, K=15', params: { L: 11, ab: 7, oh: 1, K: 15 }, expectedValid: true },
    ],
  },

  // Dạng 50 (Q50): Bông hoa 4 cánh tạo bởi 4 parabol trong hình vuông cạnh a (có hình)
  t12_b13_d50_square_4petals_sa: {
    id: 't12_b13_d50_square_4petals_sa',
    name: 'Tính diện tích hoa văn 4 cánh tạo bởi các parabol trong hình vuông (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tính diện tích 4 cánh đối xứng bằng 8 * ∫_0^{a/2} (x - (2/a)x^2)dx = a^2 / 3.',
    conditionSummary: 'a chẵn từ 4 đến 16 sao cho a^2/3 không sát mốc .x5',
    paramSpecs: [
      { name: 'halfA', label: 'Nửa cạnh hình vuông a/2 (cm)', min: 2, max: 8 },
    ],
    validateCode: `
      const a = 2 * params.halfA;
      if (params.halfA < 2) return { valid: false, reason: 'Cần a >= 4' };
      const val = (a * a) / 3;
      const frac = Math.abs((val * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { halfA } = params;
      const a = 2 * halfA;
      const sFr = u.simplifyFrac(a * a, 3);
      const rounded = Math.round(sFr.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const mFr = u.simplifyFrac(1, halfA);
      const mTex = mFr.den === 1 ? '' : '\\frac{1}{' + mFr.den + '}';
      const sTex = sFr.den === 1 ? '' + sFr.num : '\\frac{' + sFr.num + '}{' + sFr.den + '}';
      return {
        stem: 'Một viên gạch hoa hình vuông có cạnh bằng $' + a + '$ cm. Người ta thiết kế sử dụng 4 đường parabol cùng chung đỉnh tại tâm của viên gạch và đi qua hai đỉnh kề nhau của viên gạch để tạo thành bông hoa như hình vẽ. Tính diện tích của bông hoa (phần tô đậm trong hình vẽ, đơn vị $\\mathrm{cm^2}$, kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_square_4petals',
          params: { a },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chọn hệ trục $Oxy$ với gốc $O$ là tâm hình vuông; nửa cánh hoa ở góc phần tư thứ nhất nằm giữa đường thẳng $y=x$ và parabol $y=mx^2$ đi qua $(' + halfA + ';' + halfA + ') \\Rightarrow m = ' + mTex + '$.',
          'Diện tích bông hoa là $S = 8\\int \\limits_{0}^{' + halfA + '} \\left(x - ' + mTex + 'x^2\\right)\\mathrm{\\,d}x = ' + sTex + ' \\approx ' + shortAnswer + '\\,(\\mathrm{cm^2})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên halfA < 2', params: { halfA: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q50 cạnh a=4', params: { halfA: 2 }, expectedValid: true },
    ],
  },

  // Dạng 51 (Q51): Chi phí trang trí khu đất tròn bằng 2 parabol đối xứng (có hình)
  t12_b13_d51_circle_2parabolas_cost_sa: {
    id: 't12_b13_d51_circle_2parabolas_cost_sa',
    name: 'Tính chi phí trang trí khu đất hình tròn và hai parabol (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tính diện tích miền giữa 2 parabol S_p = 8Rh/3 và phần tròn còn lại, nhân đơn giá để tính tổng chi phí (nghìn đồng).',
    conditionSummary: 'R ∈ [3..7], d ∈ [1..2], R - d >= 1',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (m)', min: 3, max: 7 },
      { name: 'd', label: 'Khoảng cách đỉnh đến mép d (m)', min: 1, max: 2 },
      { name: 'c1', label: 'Tiền trồng hoa (nghìn đ/m^2)', min: 45, max: 75, step: 3 },
      { name: 'c2', label: 'Tiền lát gạch (nghìn đ/m^2)', min: 85, max: 115, step: 2 },
    ],
    validateCode: `
      const { R, d, c1, c2 } = params;
      if (R < 3 || d < 1 || R - d < 1) return { valid: false, reason: 'Cần R >= 3 và R - d >= 1' };
      const sP = (8 * R * (R - d)) / 3;
      const sR = Math.PI * R * R - sP;
      const cost = sP * c1 + sR * c2;
      if (Math.abs((cost % 1) - 0.5) < 0.01) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, d, c1, c2 } = params;
      const diam = 2 * R;
      const h = R - d;
      const spFr = u.simplifyFrac(8 * R * h, 3);
      const sP = spFr.value;
      const sR = Math.PI * R * R - sP;
      const costExact = sP * c1 + sR * c2;
      const rounded = Math.round(costExact);
      const shortAnswer = String(rounded);
      const spTex = spFr.den === 1 ? '' + spFr.num : '\\frac{' + spFr.num + '}{' + spFr.den + '}';
      return {
        stem: 'Một khu đất có dạng hình tròn đường kính $AB=' + diam + '\\,\\mathrm{m}$. Người ta trang trí khu vực này bằng hai đường Parabol đối xứng nhau qua $AB$, nằm trong hình tròn, đi qua các điểm $A,\\, B$ và có đỉnh cách mép hình tròn $' + d + '\\,\\mathrm{m}$. Phần giới hạn bởi 2 parabol được trồng hoa với tiền công $' + c1 + '$ nghìn đồng/$\\mathrm{m^2}$, phần còn lại được lát gạch với tiền công $' + c2 + '$ nghìn đồng/$\\mathrm{m^2}$. Tính tổng tiền công cần chi để trồng hoa và lát gạch (đơn vị: nghìn đồng, kết quả làm tròn đến hàng đơn vị).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_circle_two_parabolas',
          params: { R, d, axesVariant: 0 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chiều cao mỗi cung parabol so với đường kính $AB$ là $h = ' + R + ' - ' + d + ' = ' + h + '\\,\\mathrm{m}$.',
          'Diện tích phần giới hạn bởi 2 parabol là $S_p = 2\\cdot \\frac{2}{3}\\cdot ' + diam + '\\cdot ' + h + ' = ' + spTex + '\\,\\mathrm{m^2}$, phần còn lại $S_r = ' + (R * R) + '\\pi - ' + spTex + '\\,\\mathrm{m^2}$.',
          'Tổng chi phí: $T = ' + spTex + '\\cdot ' + c1 + ' + (' + (R * R) + '\\pi - ' + spTex + ')\\cdot ' + c2 + ' \\approx ' + shortAnswer + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R <= d', params: { R: 2, d: 2, c1: 51, c2: 93 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q51 R=3, d=2, c1=51, c2=93', params: { R: 3, d: 2, c1: 51, c2: 93 }, expectedValid: true },
    ],
  },

  // Dạng 52 (Q52): Cổng chào vòm giới hạn bởi hai parabol (có hình)
  t12_b13_d52_double_parabola_arch_sa: {
    id: 't12_b13_d52_double_parabola_arch_sa',
    name: 'Tính diện tích cổng chào giới hạn bởi hai đường parabol lồng nhau (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tính S = (2/3)(W2*H2 - W1*H1) với W1 = W2 - 2*margin, làm tròn hàng phần mười.',
    conditionSummary: 'W2 >= 6, H2 > H1 >= 2, marginTenths ∈ {10, 15, 20}',
    paramSpecs: [
      { name: 'W2', label: 'Chiều rộng ngoài W2 (m)', min: 6, max: 10 },
      { name: 'H2', label: 'Chiều cao ngoài H2 (m)', min: 5, max: 8 },
      { name: 'H1', label: 'Chiều cao trong H1 (m)', min: 2, max: 4 },
      { name: 'mTenths', label: 'Khoảng cách 2 chân (×0,1 m)', min: 10, max: 20, step: 5 },
    ],
    validateCode: `
      const { W2, H2, H1, mTenths } = params;
      const margin = mTenths / 10;
      const W1 = W2 - 2 * margin;
      if (W1 < 2 || H2 <= H1) return { valid: false, reason: 'Cần W1 >= 2 và H2 > H1' };
      const val = (2 / 3) * (W2 * H2 - W1 * H1);
      const frac = Math.abs((val * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { W2, H2, H1, mTenths } = params;
      const margin = mTenths / 10;
      const W1 = W2 - 2 * margin;
      // Dùng số nguyên bằng cách nhân 10 cho W1
      const w1T = Math.round(W1 * 10);
      const sNum = 2 * (10 * W2 * H2 - w1T * H1);
      const sFr = u.simplifyFrac(sNum, 30);
      const rounded = Math.round(sFr.value * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const s2Fr = u.simplifyFrac(2 * W2 * H2, 3);
      const s1Fr = u.simplifyFrac(2 * w1T * H1, 30);
      const s2Tex = s2Fr.den === 1 ? '' + s2Fr.num : '\\frac{' + s2Fr.num + '}{' + s2Fr.den + '}';
      const s1Tex = s1Fr.den === 1 ? '' + s1Fr.num : '\\frac{' + s1Fr.num + '}{' + s1Fr.den + '}';
      return {
        stem: 'Một cổng chào trang trí có hình dạng vòm, được giới hạn bởi hai đường parabol có cùng trục đối xứng thẳng đứng. Parabol phía ngoài có bề lõm hướng xuống, khoảng cách giữa hai chân cổng là $' + W2 + '\\,\\mathrm{m}$ và đỉnh cách mặt đất $' + H2 + '\\,\\mathrm{m}$. Parabol phía trong có bề lõm hướng xuống, đỉnh cách mặt đất $' + H1 + '\\,\\mathrm{m}$; hai chân của vòm trong nằm trên mặt đất và mỗi chân cách chân tương ứng của vòm ngoài $' + u.formatNumberVN(margin, 1) + '\\,\\mathrm{m}$ (tham khảo hình vẽ). Tính diện tích phần ốp kim loại giới hạn giữa hai đường parabol (đơn vị: $\\mathrm{m^2}$, kết quả làm tròn đến hàng phần mười).',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_double_parabola_arch',
          params: { W2, H2, W1, H1 },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Diện tích giới hạn bởi parabol ngoài là $S_2 = \\frac{2}{3}\\cdot ' + W2 + '\\cdot ' + H2 + ' = ' + s2Tex + '\\,\\mathrm{m^2}$.',
          'Bề rộng chân vòm trong là $' + W2 + ' - 2\\cdot ' + u.formatNumberVN(margin, 1) + ' = ' + u.formatNumberVN(W1, 1) + '\\,\\mathrm{m}$, nên diện tích phần trong là $S_1 = \\frac{2}{3}\\cdot ' + u.formatNumberVN(W1, 1) + '\\cdot ' + H1 + ' = ' + s1Tex + '\\,\\mathrm{m^2}$.',
          'Diện tích phần ốp kim loại là $S = S_2 - S_1 \\approx ' + shortAnswer + '\\,\\mathrm{m^2}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên H2 <= H1', params: { W2: 7, H2: 4, H1: 4, mTenths: 15 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q52 W2=7, H2=5, H1=3, margin=1.5', params: { W2: 7, H2: 5, H1: 3, mTenths: 15 }, expectedValid: true },
    ],
  },

  // Dạng 53 (Q53): Chi phí trồng cỏ hình parabol nội tiếp hình chữ nhật diện tích A (có hình)
  t12_b13_d53_rect_inscribed_parabola_sa: {
    id: 't12_b13_d53_rect_inscribed_parabola_sa',
    name: 'Tính chi phí trồng cỏ hình parabol nội tiếp hình chữ nhật (có hình)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Biết diện tích HCN là A thì diện tích hình parabol đỉnh trung điểm cạnh là (2/3)A, tính tiền theo triệu đồng.',
    conditionSummary: 'area chia hết cho 3 hoặc tùy ý, đơn giá c (nghìn đ/m^2)',
    paramSpecs: [
      { name: 'area', label: 'Diện tích khu đất (m^2)', min: 150, max: 360, step: 3 },
      { name: 'costK', label: 'Chi phí trồng cỏ (nghìn đ/m^2)', min: 180, max: 300, step: 15 },
    ],
    validateCode: `
      const { area, costK } = params;
      if (area < 100 || costK < 100) return { valid: false, reason: 'Tham số quá nhỏ' };
      const valM = (2 * area * costK) / 3000;
      if (Math.abs((valM % 1) - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { area, costK } = params;
      const valM = (2 * area * costK) / 3000;
      const rounded = Math.round(valM);
      const shortAnswer = String(rounded);
      return {
        stem: 'Một khu đất hình chữ nhật có diện tích $' + area + '\\,\\mathrm{m^2}$. Người ta muốn trồng cỏ trên phần đất có hình một parabol sao cho đỉnh của parabol trùng với trung điểm một cạnh của hình chữ nhật và đi qua hai đỉnh đối diện như hình vẽ bên. Biết chi phí trồng cỏ là $' + costK + '$ nghìn đồng/$\\mathrm{m^2}$. Hỏi chi phí trồng cỏ cần có là bao nhiêu triệu đồng (kết quả làm tròn đến hàng đơn vị)?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_rect_inscribed_parabola',
          params: { area },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Nếu hình chữ nhật có hai kích thước $m, n\\,(mn = ' + area + ')$ thì parabol có diện tích $S = \\frac{2}{3}mn = \\frac{2}{3}\\cdot ' + area + '\\,\\mathrm{m^2}$.',
          'Số tiền trồng cỏ cần là $\\frac{2}{3}\\cdot ' + area + '\\cdot ' + costK + '\\,\\text{nghìn đồng} \\approx ' + shortAnswer + '$ triệu đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên diện tích quá nhỏ', params: { area: 30, costK: 225 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q53 area=219, cost=225', params: { area: 219, costK: 225 }, expectedValid: true },
    ],
  },

  // Dạng 54 (Q54): Công viên HCN có 2 miền parabol ở hai cạnh đối diện (có hình)
  t12_b13_d54_rect_two_side_parabolas_sa: {
    id: 't12_b13_d54_rect_two_side_parabolas_sa',
    name: 'Tính chi phí công viên chữ nhật với hai phần parabol ở hai đầu (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tính S1 = 2*(2/3)*W*p, S2 = W*L - S1, tổng tiền tính theo triệu đồng làm tròn hàng đơn vị.',
    conditionSummary: 'W bội 3 để S1 nguyên, 2*p < L',
    paramSpecs: [
      { name: 'wMult', label: 'Chiều rộng W = 3 * wMult (m)', min: 6, max: 11 },
      { name: 'L', label: 'Chiều dài L (m)', min: 45, max: 66, step: 3 },
      { name: 'p', label: 'Khoảng lấn vào trong p (m)', min: 8, max: 14 },
      { name: 'c1', label: 'Giá trồng cỏ (nghìn đ/m^2)', min: 110, max: 160, step: 10 },
      { name: 'c2', label: 'Giá lát gạch (nghìn đ/m^2)', min: 95, max: 130, step: 5 },
    ],
    validateCode: `
      const { wMult, L, p, c1, c2 } = params;
      const W = 3 * wMult;
      if (2 * p >= L - 4) return { valid: false, reason: 'Cần 2p < L - 4 để hai parabol không cắt nhau' };
      const s1 = (4 * W * p) / 3;
      const s2 = W * L - s1;
      const totalM = (s1 * c1 + s2 * c2) / 1000;
      if (Math.abs((totalM % 1) - 0.5) < 0.04) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { wMult, L, p, c1, c2 } = params;
      const W = 3 * wMult;
      const s1 = 4 * wMult * p;
      const sTotal = W * L;
      const s2 = sTotal - s1;
      const costM = (s1 * c1 + s2 * c2) / 1000;
      const rounded = Math.round(costM);
      const shortAnswer = String(rounded);
      return {
        stem: 'Một công viên hình chữ nhật có chiều rộng $' + W + '\\,\\mathrm{m}$ và chiều dài $' + L + '\\,\\mathrm{m}$. Người ta chia công viên thành hai phần (gạch chéo và không gạch chéo). Phần không gạch chéo gồm hai phần có diện tích bằng nhau, mỗi phần giới hạn bởi một cung parabol và một cạnh chiều rộng (như hình vẽ), khoảng cách từ đỉnh $I$ của parabol bên trái đến cạnh $AD$ bằng $' + p + '\\,\\mathrm{m}$. Hai phần parabol đó được trồng cỏ với giá $' + (c1 * 1000) + '$ đồng/$\\mathrm{m^2}$, phần gạch chéo còn lại được lát gạch với giá $' + (c2 * 1000) + '$ đồng/$\\mathrm{m^2}$. Tính tổng số tiền (triệu đồng) làm tròn đến hàng đơn vị.',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_rect_two_side_parabolas',
          params: { W, L, p },
        },
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Diện tích phần trồng cỏ gồm hai parabol bằng nhau: $S_1 = 2\\cdot \\frac{2}{3}\\cdot ' + W + '\\cdot ' + p + ' = ' + s1 + '\\,\\mathrm{m^2}$.',
          'Diện tích phần lát gạch là $S_2 = ' + L + '\\cdot ' + W + ' - ' + s1 + ' = ' + s2 + '\\,\\mathrm{m^2}$.',
          'Tổng chi phí cần chi là $\\frac{' + s1 + '\\cdot ' + c1 + ' + ' + s2 + '\\cdot ' + c2 + '}{1000} \\approx ' + shortAnswer + '$ triệu đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai parabol giao nhau', params: { wMult: 9, L: 20, p: 10, c1: 128, c2: 107 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q54 W=27, L=57, p=10', params: { wMult: 9, L: 57, p: 10, c1: 128, c2: 107 }, expectedValid: true },
    ],
  },

  // Dạng 55 (Q55): Mảnh vườn Elip cắt bởi 2 parabol tạo HCN có MN = a (có hình) — đã sửa công thức chuẩn xác!
  t12_b13_d55_ellipse_two_parabolas_sa: {
    id: 't12_b13_d55_ellipse_two_parabolas_sa',
    name: 'Tính chi phí mảnh vườn Elip và hai parabol đối xứng qua tâm (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Với Elip bán trục a, b và hai parabol có đỉnh tại tâm O cắt Elip tại HCN cạnh MN = a, tính diện tích phần tô đậm và phần còn lại để suy ra tổng chi phí (nghìn đồng).',
    conditionSummary: 'a >= 2, b >= 2, a > b',
    paramSpecs: [
      { name: 'a', label: 'Bán trục lớn a (MN = a)', min: 4, max: 8, step: 2 },
      { name: 'b', label: 'Bán trục nhỏ b', min: 2, max: 4 },
      { name: 'c1', label: 'Giá trồng hoa (nghìn đ/m^2)', min: 400, max: 650, step: 50 },
      { name: 'c2', label: 'Giá trồng rau (nghìn đ/m^2)', min: 40, max: 80, step: 10 },
    ],
    validateCode: `
      const { a, b, c1, c2 } = params;
      if (a <= b || b < 2) return { valid: false, reason: 'Cần a > b >= 2' };
      const sShaded = a * b * ((2 * Math.PI) / 3 + Math.sqrt(3) / 6);
      const sUnshaded = Math.PI * a * b - sShaded;
      const total = sShaded * c1 + sUnshaded * c2;
      if (Math.abs((total % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c1, c2 } = params;
      const ab = a * b;
      const sShaded = ab * ((2 * Math.PI) / 3 + Math.sqrt(3) / 6);
      const sUnshaded = Math.PI * ab - sShaded;
      const totalThous = Math.round(sShaded * c1 + sUnshaded * c2);
      const shortAnswer = String(totalThous);
      const halfA = a / 2;
      const b2 = b * b;
      const pFr = u.simplifyFrac(2 * a, 3 * b2);
      const pTex = pFr.den === 1 ? (pFr.num === 1 ? '' : '' + pFr.num) : '\\frac{' + pFr.num + '}{' + pFr.den + '}';
      return {
        stem: 'Mảnh vườn nhà ông An có dạng hình elip với trục lớn $A_1A_2=' + (2 * a) + '\\,\\mathrm{m}$, trục nhỏ $B_1B_2=' + (2 * b) + '\\,\\mathrm{m}$ như hình vẽ. Ông dùng $2$ đường Parabol có đỉnh là tâm đối xứng của elip, cắt elip tại $4$ điểm $M,\\, N,\\, P,\\, Q$ sao cho tứ giác $MNPQ$ là hình chữ nhật có $MN=' + a + '\\,\\mathrm{m}$. Phần tô đậm (hai miền ngoài parabol) dùng để trồng hoa với chi phí $' + (c1 * 1000) + '$ đồng/$\\mathrm{m^2}$, phần còn lại dùng để trồng rau với chi phí $' + (c2 * 1000) + '$ đồng/$\\mathrm{m^2}$. Hỏi tổng số tiền ông An phải chi là bao nhiêu nghìn đồng (làm tròn đến hàng đơn vị nghìn đồng)?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_ellipse_two_parabolas',
          params: { a, b },
        },
        shortAnswer,
        numericValue: totalThous,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Elip $(E): \\frac{x^2}{' + (a * a) + '} + \\frac{y^2}{' + b2 + '} = 1$ có diện tích $S_{(E)} = \\pi ab = ' + ab + '\\pi\\,\\mathrm{m^2}$.',
          'Do $MN = ' + a + '$ nên hoành độ $N$ là $x_N = ' + halfA + '$, suy ra tung độ $y_N = ' + (b === 2 ? '\\sqrt{3}' : '\\frac{' + b + '\\sqrt{3}}{2}') + '$. Parabol qua $O(0;0)$ và $N$ là $x = ' + pTex + 'y^2$.',
          'Diện tích phần tô đậm là $S_{\\text{hoa}} = 4\\int_0^{y_N}\\left(' + a + '\\sqrt{1 - \\frac{y^2}{' + b2 + '}} - ' + pTex + 'y^2\\right)\\mathrm{\\,d}y = ' + ab + '\\left(\\frac{2\\pi}{3} + \\frac{\\sqrt{3}}{6}\\right)\\,\\mathrm{m^2}$.',
          'Diện tích trồng rau là $S_{\\text{rau}} = S_{(E)} - S_{\\text{hoa}} = ' + ab + '\\left(\\frac{\\pi}{3} - \\frac{\\sqrt{3}}{6}\\right)\\,\\mathrm{m^2}$. Tổng chi phí khoảng $' + shortAnswer + '$ nghìn đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a <= b', params: { a: 4, b: 4, c1: 600, c2: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q55 a=4, b=2', params: { a: 4, b: 2, c1: 600, c2: 50 }, expectedValid: true },
    ],
  },

  // Dạng 56 (Q56): Thể tích tròn xoay giữa parabol và đường thẳng cắt nhau tại 0 và r > 0, tính V/D
  t12_b13_d56_rev_quad_line_div_sa: {
    id: 't12_b13_d56_rev_quad_line_div_sa',
    name: 'Tính V/D của khối tròn xoay giới hạn bởi đường thẳng và parabol',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Thể tích khối tròn xoay',
    description: 'Tính V = π ∫_{0}^{r} |f^2(x) - g^2(x)|dx khi f(x), g(x) >= 0 trên [0; r], chia cho hằng số D và làm tròn hàng phần mười.',
    conditionSummary: 'k >= 2, r ∈ {1, 2}, m > k*r để hàm luôn dương trên [0; r]',
    paramSpecs: [
      { name: 'k', label: 'Hệ số bậc hai k', min: 2, max: 4 },
      { name: 'r', label: 'Giao điểm dương r', min: 1, max: 2 },
      { name: 'm', label: 'Hệ số góc đường thẳng m', min: 10, max: 22, step: 3 },
      { name: 'c', label: 'Tung độ gốc c', min: 15, max: 30, step: 5 },
      { name: 'D', label: 'Số chia D', min: 6, max: 12, step: 2 },
    ],
    validateCode: `
      const { k, r, m, c, D } = params;
      if (k < 2 || m <= k * r || c < 10) return { valid: false, reason: 'Cần k >= 2 và m > k*r' };
      // Đảm bảo f(x) >= 0 và g(x) >= 0 trên [0; r] -> luôn đúng với m, c > 0 và k*x^2 + (m - kr)*x + c > 0
      const d = k * r;
      const g2 = m;
      const g3 = c;
      const f2 = m - k * r;
      const f3 = c;
      // Compute exact integral by Simpson on [0, r] (polynomial deg 4 -> Simpson exact!)
      const p4 = (x) => {
        const fx = k * x * x + f2 * x + f3;
        const gx = g2 * x + g3;
        return Math.abs(fx * fx - gx * gx);
      };
      const intVal = (r / 6) * (p4(0) + 4 * p4(r / 2) + p4(r));
      const val = (Math.PI * intVal) / D;
      const frac = Math.abs((val * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, r, m, c, D } = params;
      const f2 = m - k * r;
      const lineStr = u.formatLinear(m, c);
      const quadStr = u.formatQuadratic(k, f2, c);
      const diffStr = u.formatQuadratic(k, -k * r, 0);
      // Tích phân đa thức bậc 4: f^2(x) - g^2(x) không đổi dấu trên [0; r], mẫu chung 30
      // (k x^2 + f2 x + c)^2 - (m x + c)^2 = k^2 x^4 + 2 k f2 x^3 + (f2^2 + 2 k c - m^2) x^2 + 2 c (f2 - m) x
      const c4 = k * k;
      const c3 = 2 * k * f2;
      const c2 = f2 * f2 + 2 * k * c - m * m;
      const c1 = 2 * c * (f2 - m);
      const num30 = Math.abs(6 * c4 * Math.pow(r, 5) + 15 * (c3 / 2) * Math.pow(r, 4) + 10 * c2 * Math.pow(r, 3) + 15 * c1 * r * r);
      const vFr = u.simplifyFrac(num30, 30);
      const ans = (Math.PI * vFr.value) / D;
      const rounded = Math.round(ans * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const vTex = vFr.den === 1 ? vFr.num + '\\pi' : '\\frac{' + vFr.num + '}{' + vFr.den + '}\\pi';
      return {
        stem: 'Gọi $V$ là thể tích của khối tròn xoay khi quay hình phẳng giới hạn bởi đường thẳng $y=' + lineStr + '$ và đồ thị hàm số $y=' + quadStr + '$ quanh trục $Ox$. Tính $\\dfrac{V}{' + D + '}$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Xét phương trình hoành độ giao điểm: $' + quadStr + ' = ' + lineStr + ' \\Leftrightarrow ' + diffStr + ' = 0 \\Leftrightarrow x=0,\\, x=' + r + '$.',
          'Do cả hai đồ thị nằm phía trên $Ox$ trên $[0;' + r + ']$, thể tích là $V = \\pi\\int \\limits_{0}^{' + r + '} \\left|(' + quadStr + ')^2 - (' + lineStr + ')^2\\right|\\mathrm{\\,d}x = ' + vTex + '$.',
          'Suy ra $\\frac{V}{' + D + '} \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m <= k*r', params: { k: 3, r: 2, m: 4, c: 20, D: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q56 k=3, r=1, m=21, c=29', params: { k: 3, r: 1, m: 21, c: 29, D: 8 }, expectedValid: true },
    ],
  },

  // Dạng 57 (Q57): Chi phí sản xuất bình hoa tròn xoay ghép cung tròn và parabol tiếp xúc (có hình)
  t12_b13_d57_vase_profile_cost_sa: {
    id: 't12_b13_d57_vase_profile_cost_sa',
    name: 'Tính chi phí sản xuất bình hoa tròn xoay ghép cung tròn và parabol (có hình)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Lập phương trình cung tròn MN và cung parabol NP có cùng tiếp tuyến tại N, tính V = V1 + V2 rồi nhân chi phí đơn vị.',
    conditionSummary: 'r ∈ {1, 2}, 3*r <= L <= 5*r + 1 để giữ hình dáng chuẩn và g(x) > 0',
    paramSpecs: [
      { name: 'r', label: 'Độ dài AM = BE = r (dm)', min: 1, max: 2 },
      { name: 'L', label: 'Chiều cao bình AB = L (dm)', min: 4, max: 8 },
      { name: 'costK', label: 'Chi phí (nghìn đồng/dm^3)', min: 120, max: 180, step: 15 },
    ],
    validateCode: `
      const { r, L, costK } = params;
      if (L < 3 * r || L > 5 * r) return { valid: false, reason: 'Cần 3r <= L <= 5r' };
      const k = (L - r) / 2;
      const v1 = Math.PI * ((L - r) * r * r + Math.pow(L - r, 3) / 6);
      const v2 = Math.PI * (r * r * r - (k * r * r) / 3 + (k * k * r) / 30);
      const cost = (v1 + v2) * costK;
      if (Math.abs((cost % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r, L, costK } = params;
      const xE = L - r;
      const kFr = u.simplifyFrac(xE, 2);
      const kVal = xE / 2;
      const rSq = r * r + kVal * kVal;
      const v1Num = 6 * xE * r * r + Math.pow(xE, 3);
      const v1Fr = u.simplifyFrac(v1Num, 6);
      // v2 / pi = r^3 - k*r^2/3 + k^2*r/30 (with k = xE/2) -> * 120: 120 r^3 - 20 xE r^2 + xE^2 r
      const v2Num = 120 * r * r * r - 20 * xE * r * r + xE * xE * r;
      const v2Fr = u.simplifyFrac(v2Num, 120);
      const vTotNum = 20 * v1Num + v2Num;
      const vTotFr = u.simplifyFrac(vTotNum, 120);
      const costTotal = Math.round(Math.PI * vTotFr.value * costK);
      const shortAnswer = String(costTotal);

      const kTex = kFr.den === 1 ? '' + kFr.num : '\\frac{' + kFr.num + '}{' + kFr.den + '}';
      const rSqFr = u.simplifyFrac(4 * r * r + xE * xE, 4);
      const rSqTex = rSqFr.den === 1 ? '' + rSqFr.num : '\\frac{' + rSqFr.num + '}{' + rSqFr.den + '}';
      const v1Tex = v1Fr.den === 1 ? v1Fr.num + '\\pi' : '\\frac{' + v1Fr.num + '\\pi}{' + v1Fr.den + '}';
      const v2Tex = v2Fr.den === 1 ? v2Fr.num + '\\pi' : '\\frac{' + v2Fr.num + '\\pi}{' + v2Fr.den + '}';
      const vTotTex = vTotFr.den === 1 ? vTotFr.num + '\\pi' : '\\frac{' + vTotFr.num + '\\pi}{' + vTotFr.den + '}';
      const alphaFr = u.simplifyFrac(xE, 2 * r * r);
      const alphaTex = alphaFr.den === 1 ? '' + alphaFr.num : '\\frac{' + alphaFr.num + '}{' + alphaFr.den + '}';
      return {
        stem: 'Một người thợ gốm muốn thiết kế một chiếc bình hoa bằng cách quay hình $(H)$ (phần gạch chéo trong hình vẽ) quanh trục $AB$. Hình phẳng $(H)$ nằm trong hình chữ nhật $ABCD$, giới hạn bởi các đoạn $AM,\\, BP$ ($M\\in AD,\\, P\\in BC,\\, MP\\parallel CD$), cung tròn $MN$ (có tâm $I$ là trung điểm $AE$) và cung parabol $NP$. Biết $AB=' + L + '\\,\\mathrm{dm}$, $AM=BE=' + r + '\\,\\mathrm{dm}$, tiếp tuyến của cung tròn và cung parabol tại $N$ trùng nhau. Biết chi phí sản xuất trung bình là $' + (costK * 1000) + '$ đồng trên mỗi $\\mathrm{dm^3}$. Hỏi chi phí sản xuất một chiếc bình hoa là bao nhiêu nghìn đồng (làm tròn đến hàng đơn vị)?',
        diagram: {
          kind: 'geometry_figure',
          figureType: 'l13_vase_profile',
          params: { L, r },
        },
        shortAnswer,
        numericValue: costTotal,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chọn hệ trục với $A\\equiv O(0;0),\\, B(' + L + ';0),\\, E(' + xE + ';0),\\, I(' + kTex + ';0)$. Cung tròn $MN$ có $y^2 = ' + rSqTex + ' - (x - ' + kTex + ')^2$, suy ra $V_1 = \\pi\\int_0^{' + xE + '} f^2(x)\\mathrm{\\,d}x = ' + v1Tex + '\\,(\\mathrm{dm^3})$.',
          'Parabol qua $N(' + xE + ';' + r + '),\\, P(' + L + ';' + r + ')$ có dạng $g(x)=a(x-' + xE + ')(x-' + L + ')+' + r + '$. Tiếp tuyến trùng tại $N\\Rightarrow g\'(' + xE + ')=f\'(' + xE + ')\\Rightarrow a=' + alphaTex + '$.',
          'Thể tích phần parabol là $V_2 = \\pi\\int_{' + xE + '}^{' + L + '} g^2(x)\\mathrm{\\,d}x = ' + v2Tex + '\\,(\\mathrm{dm^3})$. Tổng $V = ' + vTotTex + '\\,(\\mathrm{dm^3})$.',
          'Chi phí sản xuất một chiếc bình hoa là $\\approx ' + shortAnswer + '$ nghìn đồng.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên L quá nhỏ', params: { r: 2, L: 4, costK: 150 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q57 L=5, r=1, cost=150', params: { r: 1, L: 5, costK: 150 }, expectedValid: true },
    ],
  },

  // Dạng 58 (Q58): Quãng đường chuyển động vận tốc bậc nhất v(t) = at + b (trả lời ngắn)
  t12_b13_d58_dist_linear_v_sa: {
    id: 't12_b13_d58_dist_linear_v_sa',
    name: 'Tính quãng đường từ t1 đến t2 khi biết v(t) = at + b (trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tính S = ∫_{t1}^{t2} (at + b)dt.',
    conditionSummary: 'a chẵn để tích phân luôn nguyên, 1 <= t1 < t2',
    paramSpecs: [
      { name: 'ha', label: 'Nửa gia tốc a/2', min: 2, max: 6 },
      { name: 'b', label: 'Vận tốc đầu b (m/s)', min: 2, max: 12 },
      { name: 't1', label: 'Thời điểm t1 (s)', min: 1, max: 5 },
      { name: 'dt', label: 'Khoảng t2 - t1 (s)', min: 3, max: 8 },
    ],
    validateCode: `
      if (params.ha < 2 || params.dt < 2) return { valid: false, reason: 'Cần ha >= 2 và dt >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { ha, b, t1, dt } = params;
      const a = 2 * ha;
      const t2 = t1 + dt;
      const dist = (ha * t2 * t2 + b * t2) - (ha * t1 * t1 + b * t1);
      const shortAnswer = String(dist);
      const vStr = u.formatLinear(a, b).replace(/x/g, 't');
      return {
        stem: 'Một vật chuyển động với vận tốc $v(t)=' + vStr + '\\mathrm{\\,(m/s)}$, với thời gian $t$ tính bằng giây. Tính quãng đường vật đi được (đơn vị: mét) trong khoảng thời gian từ $t=' + t1 + '$ đến $t=' + t2 + '$.',
        shortAnswer,
        numericValue: dist,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Quãng đường vật đi được là $S = \\int \\limits_{' + t1 + '}^{' + t2 + '} (' + vStr + ')\\mathrm{\\,d}t = (' + ha + 't^2 + ' + b + 't)\\Big|_{' + t1 + '}^{' + t2 + '} = ' + dist + '\\,\\mathrm{m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dt = 1', params: { ha: 3, b: 5, t1: 4, dt: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q58 v=6t+5 trên [4; 11]', params: { ha: 3, b: 5, t1: 4, dt: 7 }, expectedValid: true },
    ],
  },

  // Dạng 59 (Q59): Quãng đường với vận tốc bậc hai v(t) = -3k t^2 + 2p t + v0
  t12_b13_d59_dist_quad_v_sa: {
    id: 't12_b13_d59_dist_quad_v_sa',
    name: 'Tính quãng đường khi biết vận tốc bậc hai v(t) = -3kt^2 + 2pt + v0',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tính S = ∫_0^T (-3k t^2 + 2p t + v0)dt = -k T^3 + p T^2 + v0 T.',
    conditionSummary: 'v(t) >= 0 trên toàn đoạn [0; T]',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k', min: 1, max: 3 },
      { name: 'p', label: 'Hệ số p', min: 6, max: 12 },
      { name: 'v0', label: 'Vận tốc đầu v0 (m/s)', min: 15, max: 30 },
      { name: 'T', label: 'Thời điểm cuối T (s)', min: 3, max: 5 },
    ],
    validateCode: `
      const { k, p, v0, T } = params;
      if (-3 * k * T * T + 2 * p * T + v0 <= 0) return { valid: false, reason: 'Cần v(T) > 0 để chuyển động cùng chiều trên [0; T]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, p, v0, T } = params;
      const vStr = u.formatQuadratic(-3 * k, 2 * p, v0).replace(/x/g, 't');
      const dist = -k * Math.pow(T, 3) + p * T * T + v0 * T;
      const shortAnswer = String(dist);
      return {
        stem: 'Một vật chuyển động với vận tốc $v(t)=' + vStr + '\\mathrm{\\,(m/s)}$, với thời gian $t$ tính bằng giây. Tính quãng đường vật đi được (đơn vị: mét) trong khoảng thời gian từ $t=0$ đến $t=' + T + '$.',
        shortAnswer,
        numericValue: dist,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Do $v(t) > 0$ trên $[0;' + T + ']$, quãng đường vật đi được là:',
          '$S = \\int \\limits_{0}^{' + T + '} (' + vStr + ')\\mathrm{\\,d}t = (-' + (k === 1 ? '' : k) + 't^3 + ' + p + 't^2 + ' + v0 + 't)\\Big|_{0}^{' + T + '} = ' + dist + '\\,\\mathrm{m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v(T) <= 0', params: { k: 3, p: 6, v0: 15, T: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q59 v=-3t^2+18t+21 trên [0;4]', params: { k: 1, p: 9, v0: 21, T: 4 }, expectedValid: true },
    ],
  },

  // Dạng 60 (Q60): Vận tốc đầu v0, gia tốc không đổi a, quãng đường từ t1 đến t2
  t12_b13_d60_dist_const_accel_sa: {
    id: 't12_b13_d60_dist_const_accel_sa',
    name: 'Tính quãng đường khi biết gia tốc không đổi a và vận tốc đầu',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tìm v(t) = at + v0 rồi tính ∫_{t1}^{t2} (at + v0)dt.',
    conditionSummary: 't2 - t1 chẵn hoặc a chẵn để đáp số nguyên',
    paramSpecs: [
      { name: 'v0', label: 'Vận tốc đầu v0 (m/s)', min: 2, max: 8 },
      { name: 'a', label: 'Gia tốc không đổi a (m/s^2)', min: 2, max: 6 },
      { name: 't1', label: 'Thời điểm t1 (s)', min: 4, max: 8 },
      { name: 'halfDt', label: 'Nửa khoảng (t2 - t1)/2', min: 2, max: 5 },
    ],
    validateCode: `
      if (params.v0 < 1 || params.a < 1 || params.halfDt < 2) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v0, a, t1, halfDt } = params;
      const t2 = t1 + 2 * halfDt;
      const dist = (a * (t2 * t2 - t1 * t1)) / 2 + v0 * (t2 - t1);
      const shortAnswer = String(dist);
      const vStr = u.formatLinear(a, v0).replace(/x/g, 't');
      return {
        stem: 'Một vật đang chuyển động đều với vận tốc $' + v0 + '\\mathrm{\\,m/s}$ thì tăng tốc với gia tốc $a(t)=' + a + '\\mathrm{\\,(m/s^2)}$, thời gian $t$ tính bằng giây. Tính quãng đường vật đi được (đơn vị: mét) trong khoảng thời gian từ $t=' + t1 + '$ đến $t=' + t2 + '$ kể từ khi bắt đầu tăng tốc.',
        shortAnswer,
        numericValue: dist,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$v(t) = \\int ' + a + '\\mathrm{\\,d}t = ' + a + 't + C$. Do $v(0) = ' + v0 + ' \\Rightarrow C = ' + v0 + ' \\Rightarrow v(t) = ' + vStr + '$.',
          'Quãng đường đi được là $S = \\int \\limits_{' + t1 + '}^{' + t2 + '} (' + vStr + ')\\mathrm{\\,d}t = ' + dist + '\\,\\mathrm{m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên halfDt < 2', params: { v0: 3, a: 3, t1: 7, halfDt: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q60 v0=3, a=3, [7; 15]', params: { v0: 3, a: 3, t1: 7, halfDt: 4 }, expectedValid: true },
    ],
  },

  // Dạng 61 (Q61): Vận tốc đầu v0, gia tốc bậc nhất a(t) = p - 6t, tính quãng đường trên [0; T]
  t12_b13_d61_dist_quad_accel_sa: {
    id: 't12_b13_d61_dist_quad_accel_sa',
    name: 'Tính quãng đường trên [0; T] khi biết gia tốc a(t) = p - 6t (làm tròn nguyên)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Bài toán chuyển động',
    description: 'Tìm v(t) = -3t^2 + pt + v0 rồi tính ∫_0^T v(t)dt, làm tròn đến hàng đơn vị.',
    conditionSummary: 'v(t) > 0 trên [0; T]',
    paramSpecs: [
      { name: 'v0', label: 'Vận tốc đầu v0 (m/s)', min: 20, max: 40, step: 2 },
      { name: 'p', label: 'Hệ số p', min: 6, max: 14 },
      { name: 'T', label: 'Thời gian T (s)', min: 2, max: 4 },
    ],
    validateCode: `
      const { v0, p, T } = params;
      if (-3 * T * T + p * T + v0 <= 0) return { valid: false, reason: 'Cần v(T) > 0' };
      const dist = -0.75 * Math.pow(T, 4) + (p * Math.pow(T, 3)) / 6 + v0 * T;
      if (Math.abs((dist % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng đơn vị' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v0, p, T } = params;
      const distExact = -0.75 * Math.pow(T, 4) + (p * Math.pow(T, 3)) / 6 + v0 * T;
      const rounded = Math.round(distExact);
      const shortAnswer = String(rounded);
      const vStr = u.formatQuadratic(-3, p, v0).replace(/x/g, 't');
      return {
        stem: 'Một vật chuyển động đều với vận tốc $' + v0 + '\\mathrm{\\,(m/s)}$ thì thay đổi chuyển động với gia tốc $a(t)=' + p + ' - 6t\\mathrm{\\,(m/s^2)}$, thời gian $t$ tính bằng giây. Tính quãng đường vật đi được (đơn vị: mét) trong khoảng thời gian từ $t=0$ đến $t=' + T + '$ (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          '$v(t) = \\int (' + p + ' - 6t)\\mathrm{\\,d}t = -3t^2 + ' + p + 't + C$. Từ $v(0) = ' + v0 + ' \\Rightarrow v(t) = ' + vStr + '$.',
          'Quãng đường đi được là $S = \\int \\limits_{0}^{' + T + '} (' + vStr + ')\\mathrm{\\,d}t \\approx ' + shortAnswer + '\\,\\mathrm{m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên v(T) <= 0', params: { v0: 4, p: 6, T: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q61 v0=30, p=9, T=3', params: { v0: 30, p: 9, T: 3 }, expectedValid: true },
    ],
  },

  // Dạng 62 (Q62): Chất điểm B đuổi kịp A (xuất phát chậm hơn d giây)
  t12_b13_d62_two_particles_catch_up_sa: {
    id: 't12_b13_d62_two_particles_catch_up_sa',
    name: 'Bài toán chất điểm B chuyển động nhanh dần đều đuổi kịp chất điểm A',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài toán chuyển động',
    description: 'Tính s_A = ∫_0^{d+TB} v_A(t)dt, cân bằng s_B = (1/2)a TB^2 để suy ra vận tốc v_B = a TB tại thời điểm đuổi kịp.',
    conditionSummary: 'd ∈ [5..8], TB ∈ [10..16], m ∈ [9..13]',
    paramSpecs: [
      { name: 'd', label: 'B xuất phát chậm hơn d (s)', min: 5, max: 8 },
      { name: 'TB', label: 'Thời gian B chạy đến khi gặp TB (s)', min: 10, max: 16 },
      { name: 'm', label: 'Tử số m của (m/18)t', min: 9, max: 13 },
    ],
    validateCode: `
      const { d, TB, m } = params;
      if (d < 5 || TB < 10 || m < 9) return { valid: false, reason: 'Tham số quá nhỏ' };
      const T = d + TB;
      const sA = Math.pow(T, 3) / 900 + (m * T * T) / 36;
      const vB = (2 * sA) / TB;
      const frac = Math.abs((vB * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d, TB, m } = params;
      const T = d + TB;
      const sAFr = u.simplifyFrac(Math.pow(T, 3) + 25 * m * T * T, 900);
      const aFr = u.simplifyFrac(2 * sAFr.num, sAFr.den * TB * TB);
      const vBExact = (2 * sAFr.value) / TB;
      const rounded = Math.round(vBExact * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);
      const mFr = u.simplifyFrac(m, 18);
      const mTex = '\\frac{' + mFr.num + '}{' + mFr.den + '}';
      const sATex = sAFr.den === 1 ? '' + sAFr.num : '\\frac{' + sAFr.num + '}{' + sAFr.den + '}';
      const aTex = aFr.den === 1 ? '' + aFr.num : '\\frac{' + aFr.num + '}{' + aFr.den + '}';
      return {
        stem: 'Một chất điểm $A$ xuất phát từ $O$, chuyển động thẳng với vận tốc $v_A(t)=\\dfrac{1}{300}t^2+' + mTex + 't\\,(\\mathrm{m/s})$, trong đó $t$ (giây) là thời gian tính từ lúc $A$ bắt đầu chuyển động. Từ trạng thái nghỉ, chất điểm $B$ cũng xuất phát từ $O$, chuyển động thẳng cùng hướng với $A$ nhưng chậm hơn $' + d + '$ giây so với $A$ và có gia tốc không đổi bằng $a\\,(\\mathrm{m/s^2})$. Sau khi $B$ xuất phát được $' + TB + '$ giây thì đuổi kịp $A$. Vận tốc của $B$ tại thời điểm đuổi kịp $A$ bằng bao nhiêu $\\mathrm{m/s}$ (kết quả làm tròn đến hàng phần mười)?',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Khi $B$ đuổi kịp $A$, thời gian chuyển động của $A$ là $t=' + d + '+' + TB + '=' + T + '$ giây.',
          'Quãng đường $A$ đi được là $s_A = \\int_0^{' + T + '}\\left(\\frac{1}{300}t^2+' + mTex + 't\\right)\\mathrm{\\,d}t = ' + sATex + '\\,\\mathrm{m}$.',
          'Do $s_B = \\frac{1}{2}a\\cdot ' + TB + '^2 = s_A \\Rightarrow a = ' + aTex + '\\,\\mathrm{m/s^2}$.',
          'Vận tốc của $B$ lúc đuổi kịp là $v_B = a\\cdot ' + TB + ' \\approx ' + shortAnswer + '\\,\\mathrm{m/s}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên TB < 10', params: { d: 7, TB: 8, m: 11 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q62 d=7, TB=14, m=11', params: { d: 7, TB: 14, m: 11 }, expectedValid: true },
    ],
  },

  // Dạng 63 (Q63): Khí cầu hạ cánh với v(t) = p*t - t^2 từ độ cao H
  t12_b13_d63_balloon_landing_v_sa: {
    id: 't12_b13_d63_balloon_landing_v_sa',
    name: 'Tính vận tốc khí cầu khi tiếp đất từ hàm vận tốc v(t) = pt - t^2',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Bài toán chuyển động',
    description: 'Giải ∫_0^T (pt - t^2)dt = H tìm T (chọn T bội 3, p > T để v(T) > 0) rồi tính v(T).',
    conditionSummary: 'T ∈ {3, 6, 9}, p >= T + 1, H = p*T^2/2 - T^3/3 nguyên dương',
    paramSpecs: [
      { name: 'k', label: 'Hệ số T = 3 * k (phút)', min: 2, max: 3 },
      { name: 'dv', label: 'Chênh lệch p - T', min: 1, max: 4 },
    ],
    validateCode: `
      if (params.k < 2 || params.dv < 1) return { valid: false, reason: 'Cần k >= 2 và dv >= 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, dv } = params;
      const T = 3 * k;
      const p = T + dv;
      const H = (p * T * T) / 2 - Math.pow(T, 3) / 3;
      const vLand = (p - T) * T;
      const shortAnswer = String(vLand);
      const pHalfTex = p % 2 === 0 ? '' + (p / 2) : '\\frac{' + p + '}{2}';
      return {
        stem: 'Tại một nơi không có gió, một chiếc khí cầu đang đứng yên ở độ cao $' + H + '$ mét so với mặt đất đã được phi công cài đặt chế độ chuyển động đi xuống theo phương thẳng đứng với vận tốc $v(t)=' + p + 't - t^2\\,(\\mathrm{m/phút})$, trong đó $t$ (phút) là thời gian tính từ lúc bắt đầu chuyển động ($0\\le t\\le ' + p + '$). Tính vận tốc của khí cầu khi bắt đầu tiếp đất (đơn vị: m/phút).',
        shortAnswer,
        numericValue: vLand,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Thời điểm $T\\in(0;' + p + ']$ khí cầu tiếp đất thỏa mãn $\\int_0^T (' + p + 't - t^2)\\mathrm{\\,d}t = ' + H + ' \\Leftrightarrow ' + pHalfTex + 'T^2 - \\frac{1}{3}T^3 = ' + H + '$.',
          'Giải phương trình thu được $T = ' + T + '$ (phút).',
          'Vận tốc khi tiếp đất là $v(' + T + ') = ' + p + '\\cdot ' + T + ' - ' + T + '^2 = ' + vLand + '\\,(\\mathrm{m/phút})$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên dv = 0', params: { k: 2, dv: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q63 T=6, p=7 (H=54)', params: { k: 2, dv: 1 }, expectedValid: true },
    ],
  },

  // Dạng 64 (Q64): Tốc độ thay đổi lượng vi khuẩn trong nước hồ bơi
  t12_b13_d64_bacteria_pool_sa: {
    id: 't12_b13_d64_bacteria_pool_sa',
    name: 'Tính thời điểm xử lý nước hồ bơi từ tốc độ tăng vi khuẩn',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tính N(t) = N0 + ∫_0^t M/(1 + (p/q)u)^2 du = N0 + Mt/(1 + (p/q)t) rồi giải N(t) = N_max.',
    conditionSummary: 'q = p + 1 (hoặc q - p chia hết q) để t = q/(q - p) nguyên',
    paramSpecs: [
      { name: 'n0', label: 'Số vi khuẩn ban đầu N0', min: 300, max: 600, step: 50 },
      { name: 'mMult', label: 'Hệ số M = 100 * mMult', min: 30, max: 50 },
      { name: 'p', label: 'Tử số p của tỉ số p/q', min: 2, max: 5 },
    ],
    validateCode: `
      if (params.n0 < 200 || params.mMult < 20 || params.p < 2) return { valid: false, reason: 'Tham số không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n0, mMult, p } = params;
      const M = 100 * mMult;
      const q = p + 1;
      const nMax = n0 + M;
      const tAns = q; // N(t) = n0 + M*t/(1 + (p/q)t) = n0 + M => t/(1 + (p/q)t) = 1 => t(1 - p/q) = 1 => t = q
      const shortAnswer = String(tAns);
      const fracTex = '\\frac{' + p + '}{' + q + '}';
      const mqFr = u.simplifyFrac(M * q, p);
      const mqTex = mqFr.den === 1 ? '' + mqFr.num : '\\frac{' + mqFr.num + '}{' + mqFr.den + '}';
      return {
        stem: 'Tốc độ thay đổi của số lượng vi khuẩn trong $1\\,\\mathrm{ml}$ nước ở hồ bơi tại thời điểm $t$ (ngày) kể từ lúc hồ nước được xử lý được mô hình bởi hàm số $f(t)=\\dfrac{' + M + '}{\\left(1+' + fracTex + 't\\right)^2}\\,(\\text{con/ngày}),\\, t\\ge 0$. Biết rằng số lượng vi khuẩn ban đầu là $' + n0 + '$ con trên mỗi $\\mathrm{ml}$ nước và mức độ an toàn cho người sử dụng hồ bơi là số vi khuẩn phải dưới $' + nMax + '$ con trên mỗi $\\mathrm{ml}$ nước. Hỏi sau bao nhiêu ngày thì người ta phải xử lí và thay nước mới cho hồ bơi?',
        shortAnswer,
        numericValue: tAns,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Lượng vi khuẩn tại thời điểm $t$ là $N(t) = ' + n0 + ' + \\int_0^t \\frac{' + M + '}{\\left(1+' + fracTex + 'u\\right)^2}\\mathrm{\\,d}u = ' + n0 + ' + ' + mqTex + '\\left(1 - \\frac{1}{1+' + fracTex + 't}\\right) = ' + n0 + ' + \\frac{' + M + 't}{1+' + fracTex + 't}$.',
          'Giải $N(t) = ' + nMax + ' \\Leftrightarrow \\frac{' + M + 't}{1+' + fracTex + 't} = ' + M + ' \\Leftrightarrow t = ' + q + '$ (ngày).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p < 2', params: { n0: 400, mMult: 41, p: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q64 N0=400, M=4100, p/q=2/3', params: { n0: 400, mMult: 41, p: 2 }, expectedValid: true },
    ],
  },

  // Dạng 65 (Q65): Hiệu suất của tim F = A / ∫_0^T c(t)dt
  t12_b13_d65_cardiac_output_sa: {
    id: 't12_b13_d65_cardiac_output_sa',
    name: 'Tính hiệu suất của tim qua tích phân nồng độ chất chỉ thị màu',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng thực tế tích phân',
    description: 'Tính F = A / ∫_0^T (1/T)t(T-t)dt = 6A / T^2 dưới dạng phân số tối giản a/b rồi tính a + b.',
    conditionSummary: 'A ∈ [4..10], T ∈ [6..12]',
    paramSpecs: [
      { name: 'A', label: 'Lượng chất chỉ thị màu A (mg)', min: 4, max: 10 },
      { name: 'T', label: 'Thời gian tan sạch T (s)', min: 6, max: 12 },
    ],
    validateCode: `
      if (params.A < 4 || params.T < 6) return { valid: false, reason: 'Cần A >= 4 và T >= 6' };
      const fr = u.simplifyFrac(6 * params.A, params.T * params.T);
      if (fr.isInteger) return { valid: false, reason: 'Cần F là phân số có mẫu b >= 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { A, T } = params;
      const intFr = u.simplifyFrac(T * T, 6);
      const fFr = u.simplifyFrac(6 * A, T * T);
      const ans = fFr.num + fFr.den;
      const shortAnswer = String(ans);
      const intTex = intFr.den === 1 ? '' + intFr.num : '\\frac{' + intFr.num + '}{' + intFr.den + '}';
      return {
        stem: 'Hiệu suất của tim là lưu lượng máu được bơm bởi tim trên một đơn vị thời gian. Để đo hiệu suất của tim, người ta bơm $' + A + '$ mg chất chỉ thị màu vào tâm nhĩ phải; biết nồng độ chất chỉ thị màu là $c(t)=\\dfrac{1}{' + T + '}t(' + T + '-t)$ với $0\\le t\\le ' + T + '$ (giây). Hiệu suất của tim được xác định bởi $F=\\dfrac{A}{\\int_0^{' + T + '} c(t)\\mathrm{\\,d}t}\\,(\\text{l/s})$ bằng $\\dfrac{a}{b}$ ($\\dfrac{a}{b}$ là phân số tối giản, $a,b\\in\\mathbb{N}^*$). Tính $a+b$.',
        shortAnswer,
        numericValue: ans,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tính tích phân: $\\int_0^{' + T + '} \\frac{1}{' + T + '}t(' + T + '-t)\\mathrm{\\,d}t = ' + intTex + '$.',
          'Hiệu suất tim: $F = \\frac{' + A + '}{' + intTex + '} = \\frac{' + fFr.num + '}{' + fFr.den + '}$.',
          'Vậy $a+b = ' + fFr.num + ' + ' + fFr.den + ' = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên F nguyên (A=6, T=6)', params: { A: 6, T: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q65 A=6, T=8', params: { A: 6, T: 8 }, expectedValid: true },
    ],
  },

  // Dạng 66 (Q66): Độ dài cung parabol quỹ đạo quả bóng L = ∫ √(1 + (h')^2) dt
  t12_b13_d66_parabolic_arc_length_sa: {
    id: 't12_b13_d66_parabolic_arc_length_sa',
    name: 'Tính độ dài quỹ đạo cung parabol của quả bóng bằng tích phân',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng nâng cao tích phân',
    description: 'Tìm parabol h(t) = at^2 + bt + c qua 3 điểm (0, h0), (1, h1), (2, h2), tìm khoảng t để h(t) >= h0 và tính độ dài cung ∫ √(1 + (h\')^2)dt.',
    conditionSummary: 'h1 > h0, h2 > h0, h1 > (h0 + h2)/2 để parabol úp xuống (a < 0)',
    paramSpecs: [
      { name: 'h0T', label: 'Độ cao ban đầu (×0,1 m)', min: 6, max: 12, step: 2 },
      { name: 'h1T', label: 'Độ cao lúc t=1s (×0,1 m)', min: 65, max: 85, step: 5 },
      { name: 'h2T', label: 'Độ cao lúc t=2s (×0,1 m)', min: 50, max: 70, step: 5 },
    ],
    validateCode: `
      const { h0T, h1T, h2T } = params;
      const aT = (h2T - 2 * h1T + h0T) / 2;
      const bT = h1T - h0T - aT;
      if (aT >= -10 || bT <= 0 || h2T <= h0T) return { valid: false, reason: 'Cần parabol úp (a < -1) và h2 > h0' };
      const a = aT / 10, b = bT / 10;
      const tEnd = -b / a;
      // Exact arc length integral of sqrt(1 + (2at + b)^2) on [0, -b/a] (symmetric: 2 * int_0^{b} sqrt(1 + u^2) du / |2a|)
      const F = (u) => 0.5 * (u * Math.sqrt(1 + u * u) + Math.asinh(u));
      const L = F(b) / Math.abs(a);
      const frac = Math.abs((L * 10) % 1 - 0.5);
      if (frac < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn hàng phần mười' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { h0T, h1T, h2T } = params;
      const h0 = h0T / 10, h1 = h1T / 10, h2 = h2T / 10;
      const a2 = h2T - 2 * h1T + h0T; // = 20 * a (h'(t) = 2at + b = (a2 * t + b10)/10)
      const aFr = u.simplifyFrac(a2, 20);
      const b10 = 10 * (h1T - h0T) - 5 * a2; // wait: a + b = (h1T - h0T)/10 -> 20a + 20b = 2(h1T - h0T) -> 20b = 2(h1T - h0T) - a2
      const bFr = u.simplifyFrac(2 * (h1T - h0T) - a2, 20);
      const aVal = aFr.value;
      const bVal = bFr.value;
      const tEndFr = u.simplifyFrac(-bFr.num * aFr.den, bFr.den * aFr.num);
      const F = (uVal) => 0.5 * (uVal * Math.sqrt(1 + uVal * uVal) + Math.asinh(uVal));
      const LExact = F(bVal) / Math.abs(aVal);
      const rounded = Math.round(LExact * 10) / 10;
      const shortAnswer = u.formatNumberVN(rounded, 1);

      const aTex = '-\\frac{' + Math.abs(aFr.num) + '}{' + aFr.den + '}';
      const bTex = bFr.den === 1 ? '' + bFr.num : '\\frac{' + bFr.num + '}{' + bFr.den + '}';
      const tEndTex = tEndFr.den === 1 ? '' + tEndFr.num : '\\frac{' + tEndFr.num + '}{' + tEndFr.den + '}';
      const derivStr = u.formatNumberVN(bVal, 2) + ' - ' + u.formatNumberVN(Math.abs(2 * aVal), 2) + 't';
      return {
        stem: 'Khi một quả bóng được đá lên, quỹ đạo độ cao là một parabol $h(t)=at^2+bt+c$ ($t$ tính bằng giây, $h$ tính bằng mét). Giả thiết quả bóng được đá từ độ cao $' + u.formatNumberVN(h0, 1) + '\\,\\mathrm{m}$; sau $1$ giây đạt độ cao $' + u.formatNumberVN(h1, 1) + '\\,\\mathrm{m}$; sau $2$ giây ở độ cao $' + u.formatNumberVN(h2, 1) + '\\,\\mathrm{m}$. Tính quãng đường quả bóng đi được trong khoảng thời gian có độ cao không thấp hơn $' + u.formatNumberVN(h0, 1) + '\\,\\mathrm{m}$ (đơn vị mét, làm tròn đến hàng phần mười), biết độ dài cung $h(t)$ từ $t_1$ đến $t_2$ là $L=\\int_{t_1}^{t_2}\\sqrt{1+(h\'(t))^2}\\mathrm{\\,d}t$.',
        shortAnswer,
        numericValue: rounded,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Từ $h(0)=' + u.formatNumberVN(h0, 1) + ',\\, h(1)=' + u.formatNumberVN(h1, 1) + ',\\, h(2)=' + u.formatNumberVN(h2, 1) + '$ suy ra $a=' + aTex + ',\\, b=' + bTex + ',\\, c=' + u.formatNumberVN(h0, 1) + '$.',
          'Điều kiện $h(t) \\ge ' + u.formatNumberVN(h0, 1) + ' \\Leftrightarrow 0 \\le t \\le ' + tEndTex + '$.',
          'Có $h\'(t) = ' + derivStr + '$, suy ra $L = \\int_0^{' + tEndTex + '} \\sqrt{1 + (' + derivStr + ')^2}\\mathrm{\\,d}t \\approx ' + shortAnswer + '\\,\\mathrm{m}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên không đi lên tại t=1', params: { h0T: 8, h1T: 20, h2T: 60 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q66 h0=0.8, h1=7.5, h2=6', params: { h0T: 8, h1T: 75, h2T: 60 }, expectedValid: true },
    ],
  },
};
