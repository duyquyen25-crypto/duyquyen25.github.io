import { MathTemplate } from '../types/math';
import { EXTRA_TEMPLATES_10_11 } from './templateLibraryExtra';
import { G12_B1_TEMPLATES } from './grade12Lesson1Templates';
import { G12_B2_TEMPLATES } from './grade12Lesson2Templates';
import { G12_B3_TEMPLATES } from './grade12Lesson3Templates';
import { G12_B4_TEMPLATES } from './grade12Lesson4Templates';
import { G12_B5_TEMPLATES } from './grade12Lesson5Templates';
import { G12_C1_END_TEMPLATES } from './grade12Chapter1EndTemplates';
import { G12_B6_TEMPLATES } from './grade12Lesson6Templates';
import { G12_B7_TEMPLATES } from './grade12Lesson7Templates';
import { G12_B8_TEMPLATES } from './grade12Lesson8Templates';
import { G12_B9_TEMPLATES } from './grade12Lesson9Templates';
import { G12_B10_TEMPLATES } from './grade12Lesson10Templates';
import { G12_B11_TEMPLATES } from './grade12Lesson11Templates';
import { G12_B12_TEMPLATES } from './grade12Lesson12Templates';
import { G12_B13_TEMPLATES } from './grade12Lesson13Templates';
import { G12_B14_TEMPLATES } from './grade12Lesson14Templates';
import { G12_B15_TEMPLATES } from './grade12Lesson15Templates';
import { G12_B16_TEMPLATES } from './grade12Lesson16Templates';
import { G12_B17_TEMPLATES } from './grade12Lesson17Templates';
import { G12_B18_TEMPLATES } from './grade12Lesson18Templates';
import { G12_B19_TEMPLATES } from './grade12Lesson19Templates';
import { G11_B1_TEMPLATES } from './grade11Lesson1Templates';
import { G11_B2_TEMPLATES } from './grade11Lesson2Templates';
import { G11_B3_TEMPLATES } from './grade11Lesson3Templates';

export const TEMPLATE_LIBRARY: Record<string, MathTemplate> = {
  // =====================================================================
  // TOÁN 10 - CHƯƠNG TRÌNH GDPT 2018
  // =====================================================================
  t10_set_intersection: {
    id: 't10_set_intersection',
    name: 'Tìm giao của hai khoảng/nửa khoảng trên trục số',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Mệnh đề và tập hợp',
    description: 'Cho hai tập hợp số A = (a; b] và B = [c; d). Xác định tập hợp A ∩ B.',
    conditionSummary: 'a < c < b < d để đảm bảo giao khác rỗng và không suy biến thành một điểm',
    paramSpecs: [
      { name: 'a', label: 'Đầu mút a', min: -8, max: 0 },
      { name: 'b', label: 'Đầu mút b', min: -2, max: 8 },
      { name: 'c', label: 'Đầu mút c', min: -5, max: 5 },
      { name: 'd', label: 'Đầu mút d', min: 1, max: 12 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (a >= b) return { valid: false, reason: 'Tập A = (a; b] rỗng hoặc không hợp lệ vì a >= b' };
      if (c >= d) return { valid: false, reason: 'Tập B = [c; d) rỗng hoặc không hợp lệ vì c >= d' };
      if (!(a < c && c < b && b < d)) {
        return { valid: false, reason: 'Cần a < c < b < d để giao A ∩ B là đoạn [c; b] đúng chuẩn' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const correct = '$[' + c + ';\\, ' + b + ']$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$(' + a + ';\\, ' + d + ')$',
          '$(' + c + ';\\, ' + b + ')$',
          '$(' + a + ';\\, ' + c + ')$',
          '$[' + c + ';\\, ' + d + ')$',
        ],
        rng,
        (k) => '$[' + (c - k) + ';\\, ' + (b + k) + ']$'
      );
      return {
        stem: 'Cho hai tập hợp $A = (' + a + ';\\, ' + b + ']$ và $B = [' + c + ';\\, ' + d + ')$. Tập hợp $A \\cap B$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Biểu diễn $A = (' + a + ';\\, ' + b + ']$ và $B = [' + c + ';\\, ' + d + ')$ trên trục số.',
          'Vì $' + a + ' < ' + c + ' < ' + b + ' < ' + d + '$, phần chung của hai tập hợp bắt đầu từ $' + c + '$ (lấy dấu ngoặc vuông vì $' + c + ' \\in A$ và $' + c + ' \\in B$) đến $' + b + '$ (lấy dấu ngoặc vuông vì $' + b + ' \\in A$ và $' + b + ' \\in B$).',
          'Vậy $A \\cap B = [' + c + ';\\, ' + b + ']$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên suy biến a = b (tập A rỗng)', params: { a: 2, b: 2, c: 3, d: 5 }, expectedValid: false },
      { label: 'Biên c = b (giao chỉ còn 1 điểm)', params: { a: -2, b: 3, c: 3, d: 6 }, expectedValid: false },
      { label: 'Biên chứa số 0 và số âm', params: { a: -4, b: 0, c: -1, d: 3 }, expectedValid: true },
    ],
  },

  t10_quad_ineq_tf: {
    id: 't10_quad_ineq_tf',
    name: 'Xét dấu và nghiệm bất phương trình bậc hai',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Bất phương trình bậc hai',
    description: 'Cho tam thức f(x) = a(x - x1)(x - x2). Đánh giá tính đúng/sai của 4 mệnh đề về dấu, cực trị và tập nghiệm.',
    conditionSummary: 'a ≠ 0, hai nghiệm nguyên phân biệt x1 < x2',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 3, allowZero: false },
      { name: 'x1', label: 'Nghiệm x1', min: -5, max: 2 },
      { name: 'x2', label: 'Nghiệm x2', min: -1, max: 6 },
    ],
    validateCode: `
      const { a, x1, x2 } = params;
      if (a === 0) return { valid: false, reason: 'Hệ số a = 0 làm suy biến thành bậc nhất' };
      if (x1 >= x2) return { valid: false, reason: 'Cần hai nghiệm phân biệt x1 < x2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2 } = params;
      const b = -a * (x1 + x2);
      const c = a * x1 * x2;
      const poly = u.formatQuadratic(a, b, c);
      const delta = b * b - 4 * a * c;
      const mid = u.simplifyFrac(x1 + x2, 2);
      const valAtMid = a * (mid.value - x1) * (mid.value - x2);
      const aPositive = a > 0;
      const testPoint = x1 + 1 < x2 ? x1 + 1 : 0;
      const valAtZero = c;
      const zeroInBetween = x1 < 0 && 0 < x2;

      const tfStatements = [
        {
          key: 'a',
          text: 'Phương trình $f(x) = 0$ có hai nghiệm phân biệt là $x = ' + x1 + '$ và $x = ' + x2 + '$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Biệt thức $\\Delta = ' + delta + '$ và đồ thị hàm số $y = f(x)$ có bề lõm quay lên trên.',
          isTrue: aPositive,
        },
        {
          key: 'c',
          text: 'Tập nghiệm của bất phương trình $f(x) < 0$ là khoảng $(' + x1 + ';\\, ' + x2 + ')$.',
          isTrue: aPositive,
        },
        {
          key: 'd',
          text: 'Giá trị $f(' + x1 + ') + f(0) = ' + c + '$.',
          isTrue: true,
        },
      ];

      const keyStr = tfStatements.map(s => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', ');
      return {
        stem: 'Cho tam thức bậc hai $f(x) = ' + poly + '$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: keyStr,
        solutionSteps: [
          'Giải $f(x) = 0 \\Leftrightarrow ' + poly + ' = 0$ có $\\Delta = ' + delta + ' > 0$, thu được hai nghiệm $x_1 = ' + x1 + ',\\, x_2 = ' + x2 + '$ (ý a đúng).',
          'Hệ số $a = ' + a + (aPositive ? ' > 0$' : ' < 0$') + ' nên bề lõm parabol quay ' + (aPositive ? 'lên trên' : 'xuống dưới') + ' (ý b ' + (aPositive ? 'đúng' : 'sai') + ').',
          'Áp dụng định lí dấu tam thức bậc hai: $f(x)$ trái dấu với $a$ trong khoảng $(' + x1 + ';\\, ' + x2 + ')$, do đó $f(x) < 0 \\Leftrightarrow ' + (aPositive ? 'x \\in (' + x1 + ';\\, ' + x2 + ')' : 'x \\in (-\\infty; ' + x1 + ') \\cup (' + x2 + '; +\\infty)') + '$ (ý c ' + (aPositive ? 'đúng' : 'sai') + ').',
          'Ta có $f(' + x1 + ') = 0$ và $f(0) = ' + c + '$, suy ra tổng bằng $' + c + '$ (ý d đúng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên suy biến a = 0', params: { a: 0, x1: -1, x2: 3 }, expectedValid: false },
      { label: 'Biên nghiệm kép x1 = x2', params: { a: 1, x1: 2, x2: 2 }, expectedValid: false },
      { label: 'Biên a = -1 và nghiệm âm/dương đối xứng', params: { a: -1, x1: -2, x2: 2 }, expectedValid: true },
    ],
  },

  t10_parabola_vertex_sa: {
    id: 't10_parabola_vertex_sa',
    name: 'Tính tung độ đỉnh của Parabol',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Hàm số bậc hai',
    description: 'Cho parabol y = a(x - h)^2 + k (khai triển). Tính giá trị biểu thức liên quan đến tọa độ đỉnh I(x_I; y_I).',
    conditionSummary: 'a ≠ 0 để đồ thị là parabol (không suy biến thành đường thẳng)',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'h', label: 'Hoành độ đỉnh h', min: -5, max: 5 },
      { name: 'k', label: 'Tung độ đỉnh k', min: -8, max: 8 },
    ],
    validateCode: `
      if (params.a === 0) return { valid: false, reason: 'a = 0 suy biến thành đường thẳng nằm ngang' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h, k } = params;
      const b = -2 * a * h;
      const c = a * h * h + k;
      const poly = u.formatQuadratic(a, b, c);
      const ans = 2 * h + k;
      return {
        stem: 'Biết parabol $(P): y = ' + poly + '$ có đỉnh $I(x_I;\\, y_I)$. Tính giá trị biểu thức $T = 2x_I + y_I$.',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: 'T = ' + ans,
        solutionSteps: [
          'Hoành độ đỉnh là $x_I = -\\frac{b}{2a} = -\\frac{' + b + '}{' + (2 * a) + '} = ' + h + '$.',
          'Thay $x_I = ' + h + '$ vào phương trình parabol: $y_I = ' + a + '\\cdot(' + h + ')^2' + (b !== 0 ? u.formatTrailingConst(b * h) : '') + u.formatTrailingConst(c) + ' = ' + k + '$.',
          'Khi đó $T = 2(' + h + ') + (' + k + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, h: 1, k: 2 }, expectedValid: false },
      { label: 'Biên h = 0, k = 0 (đỉnh gốc tọa độ)', params: { a: 2, h: 0, k: 0 }, expectedValid: true },
      { label: 'Biên a = -1, h < 0, k < 0', params: { a: -1, h: -3, k: -4 }, expectedValid: true },
    ],
  },

  t10_cosine_rule_es: {
    id: 't10_cosine_rule_es',
    name: 'Giải tam giác bằng định lý Cosin và tính diện tích',
    category: 'ES',
    level: 'Vận dụng',
    topicTag: 'Hệ thức lượng trong tam giác',
    description: 'Cho tam giác ABC biết hai cạnh b, c và góc xen giữa A = 60° hoặc 120°. Tính cạnh a và diện tích tam giác.',
    conditionSummary: 'b > 0, c > 0 và thỏa mãn tam giác không suy biến',
    paramSpecs: [
      { name: 'b', label: 'Cạnh AC = b', min: 3, max: 12 },
      { name: 'c', label: 'Cạnh AB = c', min: 3, max: 12 },
      { name: 'degIdx', label: 'Góc (0: 60°, 1: 120°)', min: 0, max: 1 },
    ],
    validateCode: `
      const { b, c, degIdx } = params;
      if (b <= 0 || c <= 0) return { valid: false, reason: 'Độ dài cạnh phải dương' };
      if (degIdx !== 0 && degIdx !== 1) return { valid: false, reason: 'Góc chỉ nhận 60° hoặc 120°' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, c, degIdx } = params;
      const deg = degIdx === 0 ? 60 : 120;
      const cosVal = degIdx === 0 ? 0.5 : -0.5;
      const aSq = b * b + c * c - 2 * b * c * cosVal;
      const areaCoeff = u.simplifyFrac(b * c, 4);
      return {
        stem: 'Cho tam giác $ABC$ có $AC = ' + b + '$, $AB = ' + c + '$ và $\\widehat{A} = ' + deg + '^\\circ$. Tính độ dài cạnh $BC$ và diện tích tam giác $ABC$.',
        answerSummary: 'BC = √' + aSq + ', S = ' + areaCoeff.text + '√3',
        rubric: [
          { description: 'Áp dụng đúng định lý Cosin tính BC^2', points: 0.4 },
          { description: 'Rút gọn đúng độ dài BC = √' + aSq, points: 0.2 },
          { description: 'Tính đúng diện tích S = 1/2 bc sin A', points: 0.4 },
        ],
        solutionSteps: [
          'Áp dụng định lí côsin trong tam giác $ABC$: $BC^2 = AB^2 + AC^2 - 2\\cdot AB \\cdot AC \\cdot \\cos ' + deg + '^\\circ = ' + c + '^2 + ' + b + '^2 - 2\\cdot' + c + '\\cdot' + b + '\\cdot(' + (degIdx === 0 ? '\\frac{1}{2}' : '-\\frac{1}{2}') + ') = ' + aSq + '$.',
          'Suy ra $BC = \\sqrt{' + aSq + '}$ (đvđd).',
          'Diện tích tam giác $ABC$ là $S = \\frac{1}{2} AB\\cdot AC \\cdot \\sin ' + deg + '^\\circ = \\frac{1}{2}\\cdot' + c + '\\cdot' + b + '\\cdot\\frac{\\sqrt{3}}{2} = ' + areaCoeff.latex + '\\sqrt{3}$ (đvdt).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh b = 0 (suy biến)', params: { b: 0, c: 5, degIdx: 0 }, expectedValid: false },
      { label: 'Biên tam giác cân b = c với góc 60°', params: { b: 4, c: 4, degIdx: 0 }, expectedValid: true },
      { label: 'Biên góc tù 120°', params: { b: 5, c: 8, degIdx: 1 }, expectedValid: true },
    ],
  },

  t10_probability_balls_mc: {
    id: 't10_probability_balls_mc',
    name: 'Tính xác suất chọn bi khác màu bằng tổ hợp',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đại số tổ hợp & Xác suất',
    description: 'Chọn ngẫu nhiên 2 viên bi từ hộp gồm r bi đỏ và b bi xanh. Tính xác suất lấy được 2 viên bi khác màu.',
    conditionSummary: 'r ≥ 1, b ≥ 1 và tổng số bi r + b ≥ 3 để không gian mẫu đủ lớn và xác suất thuộc (0; 1)',
    paramSpecs: [
      { name: 'r', label: 'Số bi đỏ r', min: 2, max: 8 },
      { name: 'b', label: 'Số bi xanh b', min: 2, max: 8 },
    ],
    validateCode: `
      const { r, b } = params;
      if (r < 1 || b < 1) return { valid: false, reason: 'Phải có ít nhất 1 bi đỏ và 1 bi xanh' };
      if (r + b < 3) return { valid: false, reason: 'Tổng số bi phải >= 3 để tránh xác suất bằng 1 tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { r, b } = params;
      const total = r + b;
      const omega = u.comb(total, 2);
      const fav = r * b;
      const p = u.simplifyFrac(fav, omega);
      const comp = u.simplifyFrac(omega - fav, omega);
      const sameRed = u.simplifyFrac(u.comb(r, 2) + u.comb(b, 2) + 1, omega + 1);
      const fake1 = u.simplifyFrac(r + b - 1, omega);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + p.latex + '$',
        ['$' + comp.latex + '$', '$' + sameRed.latex + '$', '$' + fake1.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(fav + k, omega + k * 3 + 1).latex + '$'
      );
      return {
        stem: 'Một hộp có $' + r + '$ viên bi đỏ và $' + b + '$ viên bi xanh. Lấy ngẫu nhiên đồng thời $2$ viên bi từ hộp. Xác suất để lấy được $2$ viên bi khác màu là:',
        options,
        correctIndex,
        answerSummary: p.text,
        solutionSteps: [
          'Số phần tử của không gian mẫu: $n(\\Omega) = C_{' + total + '}^2 = ' + omega + '$.',
          'Số cách chọn $2$ bi khác màu ($1$ đỏ và $1$ xanh): $n(A) = C_{' + r + '}^1 \\cdot C_{' + b + '}^1 = ' + fav + '$.',
          'Xác suất cần tìm: $P(A) = \\frac{' + fav + '}{' + omega + '} = ' + p.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r = 0 (không có bi đỏ)', params: { r: 0, b: 4 }, expectedValid: false },
      { label: 'Biên tổng 2 bi r=1, b=1 (xác suất = 1)', params: { r: 1, b: 1 }, expectedValid: false },
      { label: 'Biên r = 2, b = 2', params: { r: 2, b: 2 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // TOÁN 11 - CHƯƠNG TRÌNH GDPT 2018
  // =====================================================================
  t11_trig_deg_to_rad_mc: {
    id: 't11_trig_deg_to_rad_mc',
    name: 'Đổi số đo góc từ độ sang radian',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Giá trị lượng giác của góc lượng giác',
    description: 'Đổi góc α = k * 15° (với k khác 0) sang đơn vị radian dưới dạng phân số tối giản của π.',
    conditionSummary: 'k ≠ 0 để tránh góc 0° tầm thường',
    paramSpecs: [{ name: 'k', label: 'Bội số k của 15°', min: -11, max: 11, allowZero: false }],
    validateCode: `
      if (params.k === 0) return { valid: false, reason: 'k = 0 tạo góc 0°, không phù hợp câu trắc nghiệm đổi phân số π' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const deg = params.k * 15;
      const frac = u.simplifyFrac(deg, 180);
      const formatPi = (n, d) => {
        if (d === 1) return n === 1 ? '\\pi' : n === -1 ? '-\\pi' : n + '\\pi';
        const sign = n < 0 ? '-' : '';
        const absN = Math.abs(n);
        return sign + '\\frac{' + (absN === 1 ? '' : absN) + '\\pi}{' + d + '}';
      };
      const correct = '$' + formatPi(frac.num, frac.den) + '$';
      const f1 = u.simplifyFrac(deg, 360);
      const f2 = u.simplifyFrac(deg + 15, 180);
      const f3 = u.simplifyFrac(-deg, 180);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        ['$' + formatPi(f1.num, f1.den) + '$', '$' + formatPi(f2.num, f2.den) + '$', '$' + formatPi(f3.num, f3.den) + '$'],
        rng,
        (step) => '$' + formatPi(frac.num + step, frac.den + 1) + '$'
      );
      return {
        stem: 'Đổi số đo của góc $\\alpha = ' + deg + '^\\circ$ sang đơn vị radian ta được:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Áp dụng công thức đổi: $\\alpha_{\\text{rad}} = \\frac{\\pi}{180} \\cdot ' + deg + '$.',
          'Rút gọn phân số $\\frac{' + deg + '}{180}$ ta được kết quả ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (góc 0 độ)', params: { k: 0 }, expectedValid: false },
      { label: 'Biên góc vuông k = 6 (90 độ)', params: { k: 6 }, expectedValid: true },
      { label: 'Biên góc âm k = -4 (-60 độ)', params: { k: -4 }, expectedValid: true },
    ],
  },

  t11_trig_quadrant_tf: {
    id: 't11_trig_quadrant_tf',
    name: 'Xác định dấu và tính giá trị lượng giác theo góc phần tư',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Giá trị lượng giác của góc lượng giác',
    description: 'Cho sin α = p/q (bộ Pytago) và góc α thuộc một cung phần tư. Đánh giá 4 mệnh đề về cos α, tan α, sin 2α.',
    conditionSummary: 'Sử dụng bộ Pytago chuẩn (3,4,5), (5,12,13), (8,15,17) nên sin^2 + cos^2 = 1 chính xác tuyệt đối',
    paramSpecs: [
      { name: 'tripleIdx', label: 'Bộ Pytago (0..2)', min: 0, max: 2 },
      { name: 'quadrant', label: 'Góc phần tư (1..4)', min: 1, max: 4 },
    ],
    validateCode: `
      const { tripleIdx, quadrant } = params;
      if (tripleIdx < 0 || tripleIdx > 2) return { valid: false, reason: 'Chỉ số bộ Pytago phải từ 0 đến 2' };
      if (![1, 2, 3, 4].includes(quadrant)) return { valid: false, reason: 'Góc phần tư phải thuộc {1, 2, 3, 4}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [8, 15, 17],
      ];
      const [a, b, c] = triples[params.tripleIdx];
      const q = params.quadrant;
      const sinSign = q <= 2 ? 1 : -1;
      const cosSign = q === 1 || q === 4 ? 1 : -1;
      const sinF = u.simplifyFrac(sinSign * a, c);
      const cosF = u.simplifyFrac(cosSign * b, c);
      const tanF = u.simplifyFrac(sinSign * a, cosSign * b);
      const sin2F = u.simplifyFrac(2 * sinSign * a * cosSign * b, c * c);
      const rangeLabels = {
        1: '0 < \\alpha < \\frac{\\pi}{2}',
        2: '\\frac{\\pi}{2} < \\alpha < \\pi',
        3: '\\pi < \\alpha < \\frac{3\\pi}{2}',
        4: '\\frac{3\\pi}{2} < \\alpha < 2\\pi',
      };
      const tfStatements = [
        { key: 'a', text: '$\\cos \\alpha ' + (cosSign > 0 ? '> 0' : '< 0') + '$.', isTrue: true },
        { key: 'b', text: '$\\cos \\alpha = ' + cosF.latex + '$.', isTrue: true },
        { key: 'c', text: '$\\tan \\alpha = ' + u.simplifyFrac(Math.abs(a), Math.abs(b)).latex + '$.', isTrue: sinSign * cosSign > 0 },
        { key: 'd', text: '$\\sin 2\\alpha = ' + sin2F.latex + '$.', isTrue: true },
      ];
      return {
        stem: 'Cho $\\sin \\alpha = ' + sinF.latex + '$ với $' + rangeLabels[q] + '$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map(s => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Vì $' + rangeLabels[q] + '$ (góc phần tư thứ ' + q + ') nên $\\cos \\alpha ' + (cosSign > 0 ? '> 0' : '< 0') + '$ (ý a đúng).',
          'Từ $\\cos^2 \\alpha = 1 - \\sin^2 \\alpha = 1 - \\frac{' + (a * a) + '}{' + (c * c) + '} = \\frac{' + (b * b) + '}{' + (c * c) + '}$, suy ra $\\cos \\alpha = ' + cosF.latex + '$ (ý b đúng).',
          'Ta có $\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha} = ' + tanF.latex + '$ (ý c ' + (sinSign * cosSign > 0 ? 'đúng' : 'sai') + ').',
          'Áp dụng công thức nhân đôi: $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = ' + sin2F.latex + '$ (ý d đúng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên góc phần tư không hợp lệ (q = 0)', params: { tripleIdx: 0, quadrant: 0 }, expectedValid: false },
      { label: 'Biên góc phần tư thứ III (cả sin và cos âm)', params: { tripleIdx: 1, quadrant: 3 }, expectedValid: true },
    ],
  },

  t11_arc_length_sa: {
    id: 't11_arc_length_sa',
    name: 'Tính độ dài cung tròn trên đường tròn',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lượng giác của góc lượng giác',
    description: 'Tính độ dài cung tròn bán kính R (cm) có số đo góc ở tâm α (độ). Làm tròn đến hàng phần mười.',
    conditionSummary: 'R > 0 và 0 < deg < 360',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (cm)', min: 4, max: 30 },
      { name: 'deg', label: 'Số đo góc (độ)', min: 15, max: 300, step: 15 },
    ],
    validateCode: `
      const { R, deg } = params;
      if (R <= 0) return { valid: false, reason: 'Bán kính R phải dương' };
      if (deg <= 0 || deg >= 360) return { valid: false, reason: 'Góc ở tâm phải thuộc (0°; 360°)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, deg } = params;
      const rad = (deg * Math.PI) / 180;
      const len = Number((R * rad).toFixed(1));
      const ansStr = u.formatNumberVN(len, 1);
      const frac = u.simplifyFrac(R * deg, 180);
      return {
        stem: 'Một bánh xe hình tròn có bán kính $R = ' + R + '\\text{ cm}$. Độ dài của cung tròn có số đo $' + deg + '^\\circ$ trên bánh xe là bao nhiêu centimét? (Làm tròn kết quả đến hàng phần mười).',
        shortAnswer: ansStr,
        numericValue: len,
        answerSummary: ansStr + ' cm',
        solutionSteps: [
          'Đổi số đo góc sang radian: $\\alpha = ' + deg + '^\\circ = \\frac{' + deg + '\\pi}{180}\\text{ rad}$.',
          'Áp dụng công thức độ dài cung tròn: $l = R\\cdot \\alpha = ' + R + ' \\cdot \\frac{' + deg + '\\pi}{180} = ' + frac.latex + '\\pi \\approx ' + ansStr + '\\text{ cm}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên bán kính R = 0', params: { R: 0, deg: 60 }, expectedValid: false },
      { label: 'Biên góc = 360°', params: { R: 10, deg: 360 }, expectedValid: false },
      { label: 'Biên góc 15° nhỏ nhất', params: { R: 12, deg: 15 }, expectedValid: true },
    ],
  },

  t11_trig_eq_roots_sa: {
    id: 't11_trig_eq_roots_sa',
    name: 'Đếm số nghiệm phương trình lượng giác trên đoạn [0; kπ]',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Phương trình lượng giác cơ bản',
    description: 'Đếm số nghiệm của phương trình sin(mx) = 1/2 hoặc -1/2 trên đoạn [0; kπ].',
    conditionSummary: 'm ≥ 1, k ≥ 1 là số nguyên dương; đếm chính xác cả hai đầu mút [0; kπ]',
    paramSpecs: [
      { name: 'm', label: 'Hệ số góc m', min: 1, max: 4 },
      { name: 'k', label: 'Giới hạn kπ', min: 1, max: 4 },
      { name: 'sign', label: 'Dấu VP (-1 hoặc 1)', min: -1, max: 1, allowZero: false },
    ],
    validateCode: `
      const { m, k, sign } = params;
      if (m < 1 || k < 1) return { valid: false, reason: 'm và k phải nguyên dương >= 1' };
      if (sign !== 1 && sign !== -1) return { valid: false, reason: 'Dấu vế phải chỉ nhận 1 hoặc -1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, k, sign } = params;
      // sin(mx) = 1/2 -> mx = pi/6 + 2n*pi or 5pi/6 + 2n*pi
      // sin(mx) = -1/2 -> mx = -pi/6 + 2n*pi or 7pi/6 + 2n*pi
      // mx in [0, m*k*pi], so count full cycles of 2pi and remainder
      const upper = m * k; // in units of pi
      let count = 0;
      const baseAngles = sign === 1 ? [1/6, 5/6] : [7/6, 11/6];
      for (let n = 0; n <= upper; n++) {
        for (const a of baseAngles) {
          const val = a + 2 * n;
          if (val >= 0 && val <= upper + 1e-9) count++;
        }
      }
      const rhs = sign === 1 ? '\\frac{1}{2}' : '-\\frac{1}{2}';
      const arg = m === 1 ? 'x' : m + 'x';
      const upperLabel = k === 1 ? '\\pi' : k + '\\pi';
      return {
        stem: 'Phương trình $\\sin ' + arg + ' = ' + rhs + '$ có bao nhiêu nghiệm thuộc đoạn $[0;\\, ' + upperLabel + ']$?',
        shortAnswer: '' + count,
        numericValue: count,
        answerSummary: count + ' nghiệm',
        solutionSteps: [
          'Đặt $t = ' + arg + '$. Với $x \\in [0;\\, ' + upperLabel + ']$ thì $t \\in [0;\\, ' + upper + '\\pi]$.',
          'Phương trình trở thành $\\sin t = ' + rhs + '$. Trên mỗi chu kì độ dài $2\\pi$ phương trình có $2$ nghiệm.',
          'Liệt kê các nghiệm $t \\in [0;\\, ' + upper + '\\pi]$ ta đếm được đúng $' + count + '$ nghiệm thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên sign = 0 (không đúng cấu trúc ±1/2)', params: { m: 2, k: 2, sign: 0 }, expectedValid: false },
      { label: 'Biên m = 1, k = 1 trên [0; π]', params: { m: 1, k: 1, sign: 1 }, expectedValid: true },
      { label: 'Biên trên [0; π] với sin x = -1/2 (0 nghiệm)', params: { m: 1, k: 1, sign: -1 }, expectedValid: true },
    ],
  },

  t11_arith_seq_mc: {
    id: 't11_arith_seq_mc',
    name: 'Tìm số hạng và tổng n số hạng đầu của Cấp số cộng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Cấp số cộng',
    description: 'Cho cấp số cộng (u_n) biết u_1 và công sai d ≠ 0. Tính tổng S_n của n số hạng đầu.',
    conditionSummary: 'd ≠ 0 (tránh dãy hằng), n ≥ 3',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -8, max: 10 },
      { name: 'd', label: 'Công sai d', min: -5, max: 6, allowZero: false },
      { name: 'n', label: 'Số lượng n', min: 5, max: 20 },
    ],
    validateCode: `
      if (params.d === 0) return { valid: false, reason: 'Công sai d = 0 làm cấp số cộng suy biến thành dãy hằng' };
      if (params.n < 3) return { valid: false, reason: 'Số lượng n phải >= 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, d, n } = params;
      const un = u1 + (n - 1) * d;
      const sn = (n * (2 * u1 + (n - 1) * d)) / 2;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + sn + '$',
        ['$' + (sn + n * d) + '$', '$' + (sn - d) + '$', '$' + (n * (u1 + d)) + '$'],
        rng,
        (k) => '$' + (sn + k * 3) + '$'
      );
      return {
        stem: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1 = ' + u1 + '$ và công sai $d = ' + d + '$. Tổng của $' + n + '$ số hạng đầu tiên $S_{' + n + '}$ bằng:',
        options,
        correctIndex,
        answerSummary: 'S_' + n + ' = ' + sn,
        solutionSteps: [
          'Áp dụng công thức $S_n = \\frac{n[2u_1 + (n-1)d]}{2}$.',
          'Thay $n = ' + n + ',\\, u_1 = ' + u1 + ',\\, d = ' + d + '$ ta có $S_{' + n + '} = \\frac{' + n + '[2(' + u1 + ') + ' + (n - 1) + '\\cdot(' + d + ')]}{2} = ' + sn + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0 (dãy hằng)', params: { u1: 3, d: 0, n: 10 }, expectedValid: false },
      { label: 'Biên u1 = 0, d < 0', params: { u1: 0, d: -2, n: 8 }, expectedValid: true },
    ],
  },

  t11_geom_seq_es: {
    id: 't11_geom_seq_es',
    name: 'Tìm số hạng đầu, công bội và tổng của Cấp số nhân',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Cấp số nhân',
    description: 'Cho cấp số nhân (u_n) biết u_2 và u_5 (hoặc u_4). Tìm u_1, công bội q và tính tổng S_n.',
    conditionSummary: 'u1 ≠ 0 và q ∉ {0, 1, -1} để tránh dãy suy biến hoặc chia cho (1 - q) = 0',
    paramSpecs: [
      { name: 'u1', label: 'Số hạng đầu u1', min: -4, max: 5, allowZero: false },
      { name: 'q', label: 'Công bội q', min: -3, max: 3, allowZero: false },
      { name: 'n', label: 'Số số hạng n', min: 4, max: 7 },
    ],
    validateCode: `
      const { u1, q, n } = params;
      if (u1 === 0) return { valid: false, reason: 'u1 = 0 làm cấp số nhân toàn số 0' };
      if (q === 0 || q === 1 || q === -1) return { valid: false, reason: 'q ∈ {0, 1, -1} làm công thức S_n suy biến hoặc mất tính phân biệt' };
      if (n < 3) return { valid: false, reason: 'Cần n >= 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { u1, q, n } = params;
      const u2 = u1 * q;
      const u5 = u1 * Math.pow(q, 4);
      // Note: u5 / u2 = q^3 has unique real root q!
      const sn = (u1 * (1 - Math.pow(q, n))) / (1 - q);
      return {
        stem: 'Cho cấp số nhân $(u_n)$ có $u_2 = ' + u2 + '$ và $u_5 = ' + u5 + '$. Tìm công bội $q$, số hạng đầu $u_1$ và tính tổng $S_{' + n + '}$ của $' + n + '$ số hạng đầu tiên.',
        answerSummary: 'q = ' + q + ', u_1 = ' + u1 + ', S_' + n + ' = ' + sn,
        rubric: [
          { description: 'Lập tỉ số u_5 / u_2 = q^3 và tìm đúng q = ' + q, points: 0.4 },
          { description: 'Tìm đúng số hạng đầu u_1 = ' + u1, points: 0.2 },
          { description: 'Tính đúng tổng S_' + n + ' = ' + sn, points: 0.4 },
        ],
        solutionSteps: [
          'Ta có $u_5 = u_2 \\cdot q^3 \\Rightarrow q^3 = \\frac{u_5}{u_2} = \\frac{' + u5 + '}{' + u2 + '} = ' + Math.pow(q, 3) + ' \\Rightarrow q = ' + q + '$.',
          'Từ $u_2 = u_1 \\cdot q \\Rightarrow u_1 = \\frac{' + u2 + '}{' + q + '} = ' + u1 + '$.',
          'Tổng $' + n + '$ số hạng đầu: $S_{' + n + '} = u_1 \\cdot \\frac{1 - q^{' + n + '}}{1 - q} = ' + u1 + ' \\cdot \\frac{1 - (' + q + ')^{' + n + '}}{1 - (' + q + ')} = ' + sn + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên q = 1 (mẫu 1 - q = 0)', params: { u1: 2, q: 1, n: 5 }, expectedValid: false },
      { label: 'Biên u1 = 0 (chia cho u2 = 0)', params: { u1: 0, q: 2, n: 5 }, expectedValid: false },
      { label: 'Biên q = -2 (cấp số nhân đan dấu)', params: { u1: 3, q: -2, n: 5 }, expectedValid: true },
    ],
  },

  t11_limit_zero_over_zero_mc: {
    id: 't11_limit_zero_over_zero_mc',
    name: 'Tính giới hạn dạng vô định 0/0 của hàm phân thức',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Giới hạn hàm số',
    description: 'Tính lim_{x -> x0} (a(x - x0)(x - r)) / (x - x0) đảm bảo tử số triệt tiêu đúng nghiệm mẫu.',
    conditionSummary: 'a ≠ 0 và x0 ≠ r để tránh tử số thành hằng 0 hoặc nghiệm kép không phân biệt',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 3, allowZero: false },
      { name: 'x0', label: 'Điểm giới hạn x0', min: -4, max: 5 },
      { name: 'r', label: 'Nghiệm thứ hai r', min: -5, max: 5 },
    ],
    validateCode: `
      if (params.a === 0) return { valid: false, reason: 'a = 0 làm tử thức đồng nhất bằng 0' };
      if (params.x0 === params.r) return { valid: false, reason: 'x0 = r làm kết quả giới hạn bằng 0 quá tầm thường' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x0, r } = params;
      const b = -a * (x0 + r);
      const c = a * x0 * r;
      const numPoly = u.formatQuadratic(a, b, c);
      const denPoly = u.formatShift('x', -x0);
      const ans = a * (x0 - r);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans + '$',
        ['$' + (-ans) + '$', '$' + (a * (x0 + r)) + '$', '$0$'],
        rng,
        (k) => '$' + (ans + k * 2) + '$'
      );
      return {
        stem: 'Giá trị của giới hạn $\\lim_{x \\to ' + x0 + '} \\frac{' + numPoly + '}{' + denPoly + '}$ bằng:',
        options,
        correctIndex,
        answerSummary: '' + ans,
        solutionSteps: [
          'Khi $x \\to ' + x0 + '$, cả tử và mẫu đều tiến tới $0$ (dạng vô định $0/0$).',
          'Phân tích tử thức thành nhân tử: $' + numPoly + ' = ' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + denPoly + ')(' + u.formatShift('x', -r) + ')$.',
          'Rút gọn nhân tử $(' + denPoly + ')$: $\\lim_{x \\to ' + x0 + '} ' + (a === 1 ? '' : a === -1 ? '-' : a) + '(' + u.formatShift('x', -r) + ') = ' + a + '(' + x0 + (r >= 0 ? ' - ' + r : ' + ' + Math.abs(r)) + ') = ' + ans + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (tử số bằng 0)', params: { a: 0, x0: 2, r: 3 }, expectedValid: false },
      { label: 'Biên x0 = 0 (mẫu là x)', params: { a: 2, x0: 0, r: -3 }, expectedValid: true },
    ],
  },

  t11_log_eq_sa: {
    id: 't11_log_eq_sa',
    name: 'Giải phương trình lôgarit cơ bản có điều kiện xác định',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Hàm số mũ và lôgarit',
    description: 'Giải phương trình log_a(bx + c) = k. Kiểm tra điều kiện 0 < a ≠ 1 và b ≠ 0.',
    conditionSummary: 'a ∈ {2, 3, 4, 5}, b ≠ 0, k ∈ {1, 2, 3}, đảm bảo biểu thức dưới logarit > 0 tại nghiệm',
    paramSpecs: [
      { name: 'a', label: 'Cơ số a', min: 2, max: 5 },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4, allowZero: false },
      { name: 'c', label: 'Hằng số c', min: -6, max: 6 },
      { name: 'k', label: 'Số mũ k', min: 1, max: 3 },
    ],
    validateCode: `
      const { a, b, k } = params;
      if (a <= 1) return { valid: false, reason: 'Cơ số logarit phải a > 0 và a ≠ 1' };
      if (b === 0) return { valid: false, reason: 'b = 0 làm mất ẩn x' };
      if (k < 1 || k > 3) return { valid: false, reason: 'k ngoài phạm vi cho số đẹp' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, k } = params;
      const rhsVal = Math.pow(a, k);
      const frac = u.simplifyFrac(rhsVal - c, b);
      const expr = u.formatLinear(b, c);
      const ansText = frac.isInteger ? '' + frac.num : u.formatNumberVN(frac.value, 2);
      return {
        stem: 'Tìm nghiệm của phương trình $\\log_{' + a + '}(' + expr + ') = ' + k + '$ (nếu là số thập phân, làm tròn đến hàng phần trăm).',
        shortAnswer: frac.text,
        numericValue: frac.value,
        answerSummary: 'x = ' + frac.text,
        solutionSteps: [
          'Điều kiện xác định: $' + expr + ' > 0$.',
          'Phương trình tương đương với $' + expr + ' = ' + a + '^{' + k + '} = ' + rhsVal + '$ (luôn thỏa mãn điều kiện $> 0$ vì $' + rhsVal + ' > 0$).',
          'Giải ra $x = ' + frac.latex + '$' + (frac.isInteger ? '.' : ' $\\approx ' + ansText + '$.'),
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cơ số a = 1 (không xác định log_1)', params: { a: 1, b: 2, c: 1, k: 2 }, expectedValid: false },
      { label: 'Biên b = 0 (mất biến x)', params: { a: 2, b: 0, c: 4, k: 2 }, expectedValid: false },
      { label: 'Biên hệ số b âm', params: { a: 3, b: -2, c: 1, k: 2 }, expectedValid: true },
    ],
  },

  t11_tangent_line_mc: {
    id: 't11_tangent_line_mc',
    name: 'Viết phương trình tiếp tuyến của đồ thị hàm bậc ba',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Đạo hàm',
    description: 'Cho đồ thị (C): y = ax^3 + bx + c. Viết phương trình tiếp tuyến tại điểm có hoành độ x0.',
    conditionSummary: 'a ≠ 0 để đồ thị là đường cong bậc ba thực sự',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -2, max: 2, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4 },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5 },
      { name: 'x0', label: 'Hoành độ x0', min: -2, max: 2 },
    ],
    validateCode: `
      if (params.a === 0) return { valid: false, reason: 'a = 0 làm suy biến thành đường thẳng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0 } = params;
      const poly = u.formatPoly([a, 0, b, c]);
      const y0 = a * Math.pow(x0, 3) + b * x0 + c;
      const slope = 3 * a * x0 * x0 + b;
      const intercept = y0 - slope * x0;
      const lineEq = 'y = ' + u.formatLinear(slope, intercept);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + lineEq + '$',
        [
          '$y = ' + u.formatLinear(slope, intercept + 2) + '$',
          '$y = ' + u.formatLinear(slope + 1, y0 - (slope + 1) * x0) + '$',
          '$y = ' + u.formatLinear(-slope, y0 + slope * x0) + '$',
        ],
        rng,
        (k) => '$y = ' + u.formatLinear(slope, intercept - k * 2) + '$'
      );
      return {
        stem: 'Phương trình tiếp tuyến của đồ thị hàm số $y = ' + poly + '$ tại điểm có hoành độ $x_0 = ' + x0 + '$ là:',
        options,
        correctIndex,
        answerSummary: lineEq,
        solutionSteps: [
          'Tính tung độ tiếp điểm: $y_0 = y(' + x0 + ') = ' + y0 + '$.',
          "Đạo hàm $y' = " + u.formatQuadratic(3 * a, 0, b) + " \\Rightarrow k = y'(" + x0 + ") = " + slope + "$.",
          'Phương trình tiếp tuyến: $y = ' + slope + '(x ' + (x0 >= 0 ? '- ' + x0 : '+ ' + Math.abs(x0)) + ') ' + (y0 >= 0 ? '+ ' + y0 : '- ' + Math.abs(y0)) + ' \\Leftrightarrow ' + lineEq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 2, c: 1, x0: 1 }, expectedValid: false },
      { label: 'Biên hệ số góc k = 0 (tiếp tuyến nằm ngang)', params: { a: 1, b: -3, c: 2, x0: 1 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // TOÁN 12 - CHƯƠNG TRÌNH GDPT 2018
  // =====================================================================
  t12_cubic_extrema_mc: {
    id: 't12_cubic_extrema_mc',
    name: 'Tìm điểm cực trị của hàm số bậc ba',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ứng dụng đạo hàm khảo sát hàm số',
    description: 'Xây dựng hàm bậc ba từ hai điểm cực trị nguyên x1 < x2: y\' = 3a(x - x1)(x - x2). Đảm bảo hệ số nguyên đẹp.',
    conditionSummary: 'a ∈ {-1, 1}, x1 < x2 và (x1 + x2) chẵn hoặc chia hết phù hợp để hệ số nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -2, max: 2, allowZero: false },
      { name: 'x1', label: 'Điểm cực trị x1', min: -4, max: 2 },
      { name: 'x2', label: 'Điểm cực trị x2', min: -2, max: 4 },
      { name: 'd', label: 'Hệ số tự do d', min: -5, max: 5 },
    ],
    validateCode: `
      const { a, x1, x2 } = params;
      if (a === 0) return { valid: false, reason: 'a = 0 suy biến thành hàm bậc hai' };
      if (x1 >= x2) return { valid: false, reason: 'Cần x1 < x2 để hàm có đúng 2 cực trị phân biệt' };
      // Ensure integral coefficients for b = -3a(x1+x2)/2
      if (((3 * a * (x1 + x2)) % 2) !== 0) {
        return { valid: false, reason: 'Chọn x1 + x2 chẵn (hoặc a chẵn) để hệ số b nguyên' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, x1, x2, d } = params;
      // y' = 3a(x - x1)(x - x2) = 3a x^2 - 3a(x1+x2)x + 3a x1 x2
      // y = a x^3 - (3a(x1+x2)/2) x^2 + 3a x1 x2 x + d
      const b = (-3 * a * (x1 + x2)) / 2;
      const c = 3 * a * x1 * x2;
      const poly = u.formatPoly([a, b, c, d]);
      const y1 = a * Math.pow(x1, 3) + b * Math.pow(x1, 2) + c * x1 + d;
      const y2 = a * Math.pow(x2, 3) + b * Math.pow(x2, 2) + c * x2 + d;
      const xCD = a > 0 ? x1 : x2;
      const xCT = a > 0 ? x2 : x1;
      const yCD = a > 0 ? y1 : y2;

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$x = ' + xCD + '$',
        ['$x = ' + xCT + '$', '$x = ' + yCD + '$', '$x = ' + (xCD + 1) + '$'],
        rng,
        (k) => '$x = ' + (xCD - k - 1) + '$'
      );
      return {
        stem: 'Cho hàm số $y = ' + poly + '$. Điểm cực đại của hàm số đã cho là:',
        options,
        correctIndex,
        answerSummary: 'x_CĐ = ' + xCD,
        solutionSteps: [
          "Tập xác định $D = \\mathbb{R}$. Đạo hàm $y' = " + u.formatQuadratic(3 * a, 2 * b, c) + "$.",
          "Giải $y' = 0 \\Leftrightarrow x = " + x1 + "$ hoặc $x = " + x2 + "$.",
          "Vì hệ số bậc ba $a = " + a + (a > 0 ? " > 0$" : " < 0$") + " nên $y'$ đổi dấu từ dương sang âm tại $x = " + xCD + "$. Vậy điểm cực đại của hàm số là $x = " + xCD + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (không phải bậc ba)', params: { a: 0, x1: -1, x2: 1, d: 2 }, expectedValid: false },
      { label: 'Biên x1 = x2 (không có cực trị)', params: { a: 1, x1: 2, x2: 2, d: 0 }, expectedValid: false },
      { label: 'Biên hệ số đối xứng x1 = -2, x2 = 2', params: { a: 1, x1: -2, x2: 2, d: 1 }, expectedValid: true },
    ],
  },

  t12_rational_asymptote_tf: {
    id: 't12_rational_asymptote_tf',
    name: 'Tiệm cận và tính đơn điệu của hàm phân thức (ax+b)/(cx+d)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Ứng dụng đạo hàm khảo sát hàm số',
    description: 'Kiểm tra chặt chẽ điều kiện c ≠ 0 và ad - bc ≠ 0 để hàm không suy biến thành hàm hằng.',
    conditionSummary: 'c ≠ 0 và ad - bc ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -4, max: 4, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -6, max: 6 },
      { name: 'c', label: 'Hệ số c', min: -3, max: 3, allowZero: false },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6 },
    ],
    validateCode: `
      const { a, b, c, d } = params;
      if (c === 0) return { valid: false, reason: 'c = 0 làm mất mẫu biến x, suy biến thành hàm bậc nhất' };
      if (a * d - b * c === 0) return { valid: false, reason: 'ad - bc = 0 làm tử tỉ lệ với mẫu, hàm suy biến thành hàm hằng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, d } = params;
      const num = u.formatLinear(a, b);
      const den = u.formatLinear(c, d);
      const vAsym = u.simplifyFrac(-d, c);
      const hAsym = u.simplifyFrac(a, c);
      const det = a * d - b * c;
      const isIncreasing = det > 0;
      const yInt = d !== 0 ? u.simplifyFrac(b, d) : null;

      const tfStatements = [
        { key: 'a', text: 'Đồ thị hàm số có đường tiệm cận đứng là $x = ' + vAsym.latex + '$.', isTrue: true },
        { key: 'b', text: 'Đồ thị hàm số có đường tiệm cận ngang là $y = ' + hAsym.latex + '$.', isTrue: true },
        { key: 'c', text: 'Hàm số đồng biến trên từng khoảng xác định.', isTrue: isIncreasing },
        {
          key: 'd',
          text: yInt ? 'Đồ thị cắt trục tung tại điểm có tung độ bằng $' + yInt.latex + '$.' : 'Đồ thị đi qua gốc tọa độ $O(0; 0)$.',
          isTrue: yInt ? true : b === 0,
        },
      ];
      return {
        stem: 'Cho hàm số $y = \\frac{' + num + '}{' + den + '}$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: tfStatements.map(s => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Nghiệm của mẫu số $' + den + ' = 0 \\Leftrightarrow x = ' + vAsym.latex + '$ (vì $ad - bc = ' + det + ' \\neq 0$ nên đây là tiệm cận đứng, ý a đúng).',
          'Giới hạn $\\lim_{x \\to \\pm\\infty} y = ' + hAsym.latex + '$ nên $y = ' + hAsym.latex + '$ là tiệm cận ngang (ý b đúng).',
          "Đạo hàm $y' = \\frac{" + det + "}{(" + den + ")^2}$ mang dấu " + (isIncreasing ? "dương" : "âm") + " nên hàm số " + (isIncreasing ? "đồng biến" : "nghịch biến") + " trên từng khoảng xác định (ý c " + (isIncreasing ? "đúng" : "sai") + ").",
          yInt ? 'Với $x = 0 \\Rightarrow y = ' + yInt.latex + '$ (ý d đúng).' : 'Với $x = 0$ mẫu bằng $0$ nên đồ thị không cắt trục tung (ý d sai).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0 (chia cho hằng số)', params: { a: 2, b: 1, c: 0, d: 3 }, expectedValid: false },
      { label: 'Biên suy biến ad - bc = 0 (2x+4)/(x+2)', params: { a: 2, b: 4, c: 1, d: 2 }, expectedValid: false },
      { label: 'Biên d = 0 (tiệm cận đứng x = 0)', params: { a: 2, b: 3, c: 1, d: 0 }, expectedValid: true },
    ],
  },

  t12_max_min_interval_sa: {
    id: 't12_max_min_interval_sa',
    name: 'Tìm giá trị lớn nhất của hàm bậc ba trên đoạn [p; q]',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng đạo hàm khảo sát hàm số',
    description: 'Tìm GTLN M của hàm số y = x^3 - 3m^2 x + c trên đoạn [p; q] với p < q.',
    conditionSummary: 'm ≠ 0 và p < q',
    paramSpecs: [
      { name: 'm', label: 'Tham số m', min: 1, max: 3 },
      { name: 'c', label: 'Hằng số c', min: -5, max: 5 },
      { name: 'p', label: 'Đầu mút p', min: -3, max: 0 },
      { name: 'q', label: 'Đầu mút q', min: 1, max: 4 },
    ],
    validateCode: `
      if (params.m <= 0) return { valid: false, reason: 'Cần m >= 1' };
      if (params.p >= params.q) return { valid: false, reason: 'Đoạn [p; q] phải thỏa mãn p < q' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, c, p, q } = params;
      const f = (x) => Math.pow(x, 3) - 3 * m * m * x + c;
      const candidates = [p, q];
      if (-m >= p && -m <= q) candidates.push(-m);
      if (m >= p && m <= q) candidates.push(m);
      const maxVal = Math.max(...candidates.map(f));
      const poly = u.formatPoly([1, 0, -3 * m * m, c]);
      return {
        stem: 'Tìm giá trị lớn nhất của hàm số $y = ' + poly + '$ trên đoạn $[' + p + ';\\, ' + q + ']$.',
        shortAnswer: '' + maxVal,
        numericValue: maxVal,
        answerSummary: 'M = ' + maxVal,
        solutionSteps: [
          "Đạo hàm $y' = 3x^2 - " + (3 * m * m) + " = 0 \\Leftrightarrow x = \\pm " + m + "$.",
          'Các điểm tới hạn nằm trong đoạn $[' + p + ';\\, ' + q + ']$ cùng hai đầu mút là $x \\in \\{' + candidates.join(',\\, ') + '\\}$.',
          'Tính giá trị tại các điểm trên: ' + candidates.map(x => '$y(' + x + ') = ' + f(x) + '$').join(', ') + '.',
          'Vậy $\\max_{[' + p + ';\\, ' + q + ']} y = ' + maxVal + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = q (đoạn suy biến 1 điểm)', params: { m: 1, c: 2, p: 1, q: 1 }, expectedValid: false },
      { label: 'Biên p > q (đoạn nghịch đảo)', params: { m: 1, c: 0, p: 3, q: 1 }, expectedValid: false },
      { label: 'Biên chứa đúng hai cực trị', params: { m: 1, c: 2, p: -2, q: 2 }, expectedValid: true },
    ],
  },

  t12_integral_poly_mc: {
    id: 't12_integral_poly_mc',
    name: 'Tính tích phân xác định của hàm đa thức bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm và tích phân',
    description: 'Tính ∫_α^β (3ax^2 + 2bx + c) dx = [ax^3 + bx^2 + cx]_α^β cho kết quả luôn nguyên đẹp.',
    conditionSummary: 'α < β và không phải tất cả hệ số a, b, c đều bằng 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a (của x^3)', min: -2, max: 3 },
      { name: 'b', label: 'Hệ số b (của x^2)', min: -3, max: 3 },
      { name: 'c', label: 'Hệ số c (của x)', min: -4, max: 4 },
      { name: 'alpha', label: 'Cận dưới α', min: -2, max: 1 },
      { name: 'beta', label: 'Cận trên β', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b, c, alpha, beta } = params;
      if (alpha >= beta) return { valid: false, reason: 'Cận tích phân phải thỏa mãn α < β' };
      if (a === 0 && b === 0 && c === 0) return { valid: false, reason: 'Hàm dưới dấu tích phân đồng nhất bằng 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, alpha, beta } = params;
      const integrand = u.formatQuadratic(3 * a, 2 * b, c);
      const F = (x) => a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x;
      const val = F(beta) - F(alpha);
      const anti = u.formatPoly([a, b, c, 0]);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + val + '$',
        ['$' + (-val) + '$', '$' + (val + 2) + '$', '$' + (F(beta) + F(alpha)) + '$'],
        rng,
        (k) => '$' + (val + k * 3 + 1) + '$'
      );
      return {
        stem: 'Tính tích phân $I = \\int_{' + alpha + '}^{' + beta + '} \\left(' + integrand + '\\right)\\,dx$.',
        options,
        correctIndex,
        answerSummary: 'I = ' + val,
        solutionSteps: [
          'Một nguyên hàm của $f(x) = ' + integrand + '$ là $F(x) = ' + anti + '$.',
          'Khi đó $I = F(' + beta + ') - F(' + alpha + ') = (' + F(beta) + ') - (' + F(alpha) + ') = ' + val + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cận α = β (tích phân bằng 0)', params: { a: 1, b: 2, c: 1, alpha: 1, beta: 1 }, expectedValid: false },
      { label: 'Biên tất cả hệ số bằng 0', params: { a: 0, b: 0, c: 0, alpha: 0, beta: 2 }, expectedValid: false },
      { label: 'Biên a = 0 (hàm bậc nhất)', params: { a: 0, b: 2, c: -3, alpha: -1, beta: 2 }, expectedValid: true },
    ],
  },

  t12_integral_area_sa: {
    id: 't12_integral_area_sa',
    name: 'Tính diện tích hình phẳng giới hạn bởi Parabol và trục hoành',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng tích phân',
    description: 'Tính diện tích hình phẳng giới hạn bởi y = a(x - r1)(x - r2) và Ox. Công thức nhanh |a|(r2 - r1)^3 / 6.',
    conditionSummary: 'a ≠ 0 và hai nghiệm phân biệt r1 < r2',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 3, allowZero: false },
      { name: 'r1', label: 'Nghiệm r1', min: -3, max: 1 },
      { name: 'r2', label: 'Nghiệm r2', min: 0, max: 4 },
    ],
    validateCode: `
      if (params.a === 0) return { valid: false, reason: 'a = 0 không tạo hình phẳng kín' };
      if (params.r1 >= params.r2) return { valid: false, reason: 'Cần hai nghiệm phân biệt r1 < r2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, r1, r2 } = params;
      const b = -a * (r1 + r2);
      const c = a * r1 * r2;
      const poly = u.formatQuadratic(a, b, c);
      const areaFrac = u.simplifyFrac(Math.abs(a) * Math.pow(r2 - r1, 3), 6);
      const rounded = Number(areaFrac.value.toFixed(2));
      return {
        stem: 'Diện tích hình phẳng giới hạn bởi đồ thị hàm số $y = ' + poly + '$ và trục hoành bằng bao nhiêu? (Nếu là số thập phân, làm tròn đến hàng phần trăm).',
        shortAnswer: areaFrac.text,
        numericValue: rounded,
        answerSummary: areaFrac.text + (areaFrac.isInteger ? '' : ' ≈ ' + u.formatNumberVN(rounded, 2)),
        solutionSteps: [
          'Phương trình hoành độ giao điểm: $' + poly + ' = 0 \\Leftrightarrow x = ' + r1 + '$ hoặc $x = ' + r2 + '$.',
          'Diện tích hình phẳng: $S = \\int_{' + r1 + '}^{' + r2 + '} |' + poly + '|\\,dx = \\frac{|' + a + '|(' + r2 + ' - (' + r1 + '))^3}{6} = ' + areaFrac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên r1 = r2 (không giới hạn miền kín)', params: { a: 1, r1: 2, r2: 2 }, expectedValid: false },
      { label: 'Biên khoảng cách nghiệm = 3, a = -2 (kết quả nguyên)', params: { a: -2, r1: -1, r2: 2 }, expectedValid: true },
    ],
  },

  t12_oxyz_plane_3pts_es: {
    id: 't12_oxyz_plane_3pts_es',
    name: 'Viết phương trình mặt phẳng đi qua 3 điểm trong không gian Oxyz',
    category: 'ES',
    level: 'Hiểu',
    topicTag: 'Phương pháp tọa độ trong không gian Oxyz',
    description: 'Cho 3 điểm A, B, C. Kiểm tra điều kiện tích có hướng [AB, AC] ≠ 0 để 3 điểm không thẳng hàng.',
    conditionSummary: 'Vectơ AB × AC ≠ (0; 0; 0) đảm bảo A, B, C không thẳng hàng',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -3, max: 3 },
      { name: 'yA', label: 'y_A', min: -3, max: 3 },
      { name: 'zA', label: 'z_A', min: -3, max: 3 },
      { name: 'dx1', label: 'x_B - x_A', min: -3, max: 3 },
      { name: 'dy1', label: 'y_B - y_A', min: -3, max: 3 },
      { name: 'dz1', label: 'z_B - z_A', min: -3, max: 3 },
      { name: 'dx2', label: 'x_C - x_A', min: -3, max: 3 },
      { name: 'dy2', label: 'y_C - y_A', min: -3, max: 3 },
      { name: 'dz2', label: 'z_C - z_A', min: -3, max: 3 },
    ],
    validateCode: `
      const { dx1, dy1, dz1, dx2, dy2, dz2 } = params;
      const nx = dy1 * dz2 - dz1 * dy2;
      const ny = dz1 * dx2 - dx1 * dz2;
      const nz = dx1 * dy2 - dy1 * dx2;
      if (nx === 0 && ny === 0 && nz === 0) {
        return { valid: false, reason: 'Ba điểm A, B, C thẳng hàng ([AB, AC] = 0), không xác định duy nhất mặt phẳng' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, dx1, dy1, dz1, dx2, dy2, dz2 } = params;
      const xB = xA + dx1, yB = yA + dy1, zB = zA + dz1;
      const xC = xA + dx2, yC = yA + dy2, zC = zA + dz2;
      let nx = dy1 * dz2 - dz1 * dy2;
      let ny = dz1 * dx2 - dx1 * dz2;
      let nz = dx1 * dy2 - dy1 * dx2;
      const g = u.gcd(u.gcd(Math.abs(nx), Math.abs(ny)), Math.abs(nz));
      nx /= g; ny /= g; nz /= g;
      if (nx < 0 || (nx === 0 && ny < 0) || (nx === 0 && ny === 0 && nz < 0)) {
        nx = -nx; ny = -ny; nz = -nz;
      }
      const d = -(nx * xA + ny * yA + nz * zA);
      const planeEq = u.formatPlaneEq(nx, ny, nz, d);
      return {
        stem: 'Trong không gian $Oxyz$, viết phương trình mặt phẳng $(P)$ đi qua ba điểm $A' + u.formatCoord3D(xA, yA, zA) + '$, $B' + u.formatCoord3D(xB, yB, zB) + '$ và $C' + u.formatCoord3D(xC, yC, zC) + '$.',
        answerSummary: planeEq,
        rubric: [
          { description: 'Tính đúng hai vectơ chỉ phương AB và AC', points: 0.3 },
          { description: 'Tính đúng vectơ pháp tuyến n = [AB, AC]', points: 0.4 },
          { description: 'Viết đúng phương trình tổng quát mặt phẳng (P)', points: 0.3 },
        ],
        solutionSteps: [
          'Ta có $\\overrightarrow{AB} = ' + u.formatCoord3D(dx1, dy1, dz1) + '$ và $\\overrightarrow{AC} = ' + u.formatCoord3D(dx2, dy2, dz2) + '$.',
          'Một vectơ pháp tuyến của mặt phẳng $(P)$ là $\\vec{n} = \\frac{1}{' + g + '}[\\overrightarrow{AB}, \\overrightarrow{AC}] = ' + u.formatCoord3D(nx, ny, nz) + ' \\neq \\vec{0}$.',
          'Phương trình mặt phẳng $(P)$ đi qua $A' + u.formatCoord3D(xA, yA, zA) + '$ là: $' + planeEq + '$.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên 3 điểm thẳng hàng (AC = 2*AB)',
        params: { xA: 1, yA: 0, zA: 2, dx1: 1, dy1: 2, dz1: -1, dx2: 2, dy2: 4, dz2: -2 },
        expectedValid: false,
      },
      {
        label: 'Biên B trùng A (vectơ AB = 0)',
        params: { xA: 0, yA: 0, zA: 0, dx1: 0, dy1: 0, dz1: 0, dx2: 1, dy2: 2, dz2: 3 },
        expectedValid: false,
      },
      {
        label: 'Biên mặt phẳng song song trục Oz (nz = 0)',
        params: { xA: 1, yA: 2, zA: 0, dx1: 0, dy1: 0, dz1: 3, dx2: 2, dy2: -1, dz2: 0 },
        expectedValid: true,
      },
    ],
  },

  t12_oxyz_dist_point_plane_mc: {
    id: 't12_oxyz_dist_point_plane_mc',
    name: 'Tính khoảng cách từ điểm đến mặt phẳng trong Oxyz',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương pháp tọa độ trong không gian Oxyz',
    description: 'Tính d(M, (P)) với bộ pháp tuyến Pytago không gian (1,2,2), (2,3,6), (1,4,8) để mẫu căn luôn nguyên!',
    conditionSummary: '|n| > 0 (bộ Pytago 3D chuẩn có độ dài 3, 7, 9)',
    paramSpecs: [
      { name: 'tripleIdx', label: 'Bộ pháp tuyến 3D (0..2)', min: 0, max: 2 },
      { name: 'xM', label: 'x_M', min: -4, max: 4 },
      { name: 'yM', label: 'y_M', min: -4, max: 4 },
      { name: 'zM', label: 'z_M', min: -4, max: 4 },
      { name: 'd', label: 'Hệ số tự do d', min: -8, max: 8 },
    ],
    validateCode: `
      const { tripleIdx } = params;
      if (tripleIdx < 0 || tripleIdx > 2) return { valid: false, reason: 'Chỉ số bộ pháp tuyến phải thuộc 0..2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const normals = [
        [1, 2, 2, 3],
        [2, -3, 6, 7],
        [1, 4, -8, 9],
      ];
      const [a, b, c, normLen] = normals[params.tripleIdx];
      const { xM, yM, zM, d } = params;
      const numVal = Math.abs(a * xM + b * yM + c * zM + d);
      const frac = u.simplifyFrac(numVal, normLen);
      const planeEq = u.formatPlaneEq(a, b, c, d);
      const fake1 = u.simplifyFrac(numVal + 1, normLen);
      const fake2 = u.simplifyFrac(numVal, normLen + 1);
      const fake3 = u.simplifyFrac(Math.abs(numVal - 2) + 1, normLen);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + frac.latex + '$',
        ['$' + fake1.latex + '$', '$' + fake2.latex + '$', '$' + fake3.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(numVal + k + 2, normLen).latex + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, khoảng cách từ điểm $M' + u.formatCoord3D(xM, yM, zM) + '$ đến mặt phẳng $(P): ' + planeEq + '$ bằng:',
        options,
        correctIndex,
        answerSummary: frac.text,
        solutionSteps: [
          'Áp dụng công thức khoảng cách: $d(M, (P)) = \\frac{|' + a + '\\cdot(' + xM + ') + (' + b + ')\\cdot(' + yM + ') + (' + c + ')\\cdot(' + zM + ') + (' + d + ')|}{\\sqrt{' + a + '^2 + (' + b + ')^2 + (' + c + ')^2}}$.',
          'Thu được $d(M, (P)) = \\frac{' + numVal + '}{' + normLen + '} = ' + frac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên điểm M nằm trên mặt phẳng (khoảng cách = 0)', params: { tripleIdx: 0, xM: 1, yM: 1, zM: 1, d: -5 }, expectedValid: true },
      { label: 'Biên chỉ số ngoài miền', params: { tripleIdx: 5, xM: 0, yM: 0, zM: 0, d: 1 }, expectedValid: false },
    ],
  },

  t12_cond_prob_bayes_sa: {
    id: 't12_cond_prob_bayes_sa',
    name: 'Tính xác suất toàn phần và công thức Bayes',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Xác suất có điều kiện',
    description: 'Hai phân xưởng I, II sản xuất tỉ lệ p% và (100-p)%, tỉ lệ phế phẩm tương ứng e1%, e2%. Tính xác suất chọn được phế phẩm thuộc phân xưởng I.',
    conditionSummary: '0 < p < 100 và e1, e2 > 0 để mẫu số P(B) > 0',
    paramSpecs: [
      { name: 'p', label: 'Tỉ lệ phân xưởng I (%)', min: 20, max: 80, step: 10 },
      { name: 'e1', label: 'Tỉ lệ lỗi PX I (%)', min: 1, max: 6 },
      { name: 'e2', label: 'Tỉ lệ lỗi PX II (%)', min: 1, max: 6 },
    ],
    validateCode: `
      const { p, e1, e2 } = params;
      if (p <= 0 || p >= 100) return { valid: false, reason: 'Tỉ lệ phân chia p phải thuộc (0; 100)' };
      if (e1 <= 0 || e2 <= 0) return { valid: false, reason: 'Tỉ lệ phế phẩm phải dương để xác suất mẫu khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, e1, e2 } = params;
      const p1 = p / 100;
      const p2 = (100 - p) / 100;
      const num = p * e1;
      const den = p * e1 + (100 - p) * e2;
      const frac = u.simplifyFrac(num, den);
      const ansRounded = Number(frac.value.toFixed(2));
      const ansText = u.formatNumberVN(ansRounded, 2);
      return {
        stem: 'Một nhà máy có hai phân xưởng I và II. Phân xưởng I sản xuất $' + p + '\\%$ tổng sản phẩm, phân xưởng II sản xuất $' + (100 - p) + '\\%$ tổng sản phẩm. Tỉ lệ sản phẩm lỗi của phân xưởng I là $' + e1 + '\\%$, của phân xưởng II là $' + e2 + '\\%$. Chọn ngẫu nhiên một sản phẩm và thấy nó bị lỗi. Tính xác suất để sản phẩm đó do phân xưởng I sản xuất (làm tròn đến hàng phần trăm).',
        shortAnswer: ansText,
        numericValue: ansRounded,
        answerSummary: frac.text + ' ≈ ' + ansText,
        solutionSteps: [
          'Gọi $A$ là biến cố sản phẩm do phân xưởng I sản xuất ($P(A) = ' + u.formatNumberVN(p1, 2) + ',\\, P(\\overline{A}) = ' + u.formatNumberVN(p2, 2) + '$) và $B$ là biến cố sản phẩm bị lỗi.',
          'Xác suất toàn phần: $P(B) = P(A)P(B|A) + P(\\overline{A})P(B|\\overline{A}) = ' + u.formatNumberVN(p1, 2) + '\\cdot' + u.formatNumberVN(e1 / 100, 2) + ' + ' + u.formatNumberVN(p2, 2) + '\\cdot' + u.formatNumberVN(e2 / 100, 2) + ' = ' + u.formatNumberVN(den / 10000, 4) + '$.',
          'Theo công thức Bayes: $P(A|B) = \\frac{P(A)P(B|A)}{P(B)} = ' + frac.latex + ' \\approx ' + ansText + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p = 100% (chỉ có 1 phân xưởng)', params: { p: 100, e1: 2, e2: 3 }, expectedValid: false },
      { label: 'Biên e1 = 0 và e2 = 0 (chia cho 0)', params: { p: 60, e1: 0, e2: 0 }, expectedValid: false },
      { label: 'Biên e1 = e2 (xác suất hậu nghiệm = p%)', params: { p: 40, e1: 3, e2: 3 }, expectedValid: true },
    ],
  },

  t12_grouped_stats_sa: {
    id: 't12_grouped_stats_sa',
    name: 'Tính số trung bình và phương sai mẫu số liệu ghép nhóm',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Số đặc trưng đo mức độ phân tán',
    description: 'Cho bảng tần số ghép nhóm 4 lớp [0;2), [2;4), [4;6), [6;8) với tần số nguyên dương. Tính phương sai mẫu s^2.',
    conditionSummary: 'Tổng tần số N > 0 và có ít nhất 2 nhóm có tần số dương để mẫu không suy biến',
    paramSpecs: [
      { name: 'n1', label: 'Tần số [0;2)', min: 1, max: 10 },
      { name: 'n2', label: 'Tần số [2;4)', min: 2, max: 12 },
      { name: 'n3', label: 'Tần số [4;6)', min: 2, max: 12 },
      { name: 'n4', label: 'Tần số [6;8)', min: 1, max: 10 },
    ],
    validateCode: `
      const { n1, n2, n3, n4 } = params;
      if (n1 < 0 || n2 < 0 || n3 < 0 || n4 < 0) return { valid: false, reason: 'Tần số không thể âm' };
      const total = n1 + n2 + n3 + n4;
      if (total <= 1) return { valid: false, reason: 'Tổng tần số N phải > 1' };
      const nonZeroGroups = [n1, n2, n3, n4].filter(n => n > 0).length;
      if (nonZeroGroups < 2) return { valid: false, reason: 'Cần ít nhất 2 nhóm có dữ liệu' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, n3, n4 } = params;
      const freqs = [n1, n2, n3, n4];
      const mids = [1, 3, 5, 7];
      const N = n1 + n2 + n3 + n4;
      const mean = freqs.reduce((acc, f, idx) => acc + f * mids[idx], 0) / N;
      const variance = freqs.reduce((acc, f, idx) => acc + f * Math.pow(mids[idx] - mean, 2), 0) / N;
      const roundedVar = Number(variance.toFixed(2));
      const ansText = u.formatNumberVN(roundedVar, 2);
      return {
        stem: 'Thống kê thời gian tự học (giờ/tuần) của ' + N + ' học sinh thu được các nhóm $[0;2),\\, [2;4),\\, [4;6),\\, [6;8)$ với tần số lần lượt là $' + n1 + ',\\, ' + n2 + ',\\, ' + n3 + ',\\, ' + n4 + '$. Phương sai $s^2$ của mẫu số liệu ghép nhóm trên bằng bao nhiêu? (Làm tròn đến hàng phần trăm).',
        shortAnswer: ansText,
        numericValue: roundedVar,
        answerSummary: 's² ≈ ' + ansText,
        solutionSteps: [
          'Giá trị đại diện của các nhóm lần lượt là $c_1 = 1,\\, c_2 = 3,\\, c_3 = 5,\\, c_4 = 7$.',
          'Số trung bình: $\\overline{x} = \\frac{1\\cdot' + n1 + ' + 3\\cdot' + n2 + ' + 5\\cdot' + n3 + ' + 7\\cdot' + n4 + '}{' + N + '} = ' + u.formatNumberVN(mean, 3) + '$.',
          'Phương sai của mẫu số liệu ghép nhóm: $s^2 = \\frac{1}{' + N + '}\\sum n_i(c_i - \\overline{x})^2 \\approx ' + ansText + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tất cả tần số bằng 0 (chia cho 0)', params: { n1: 0, n2: 0, n3: 0, n4: 0 }, expectedValid: false },
      { label: 'Biên chỉ có 1 nhóm (phương sai = 0)', params: { n1: 5, n2: 0, n3: 0, n4: 0 }, expectedValid: false },
      { label: 'Biên phân bố đối xứng', params: { n1: 2, n2: 6, n3: 6, n4: 2 }, expectedValid: true },
    ],
  },

  t10_vector_dot_mc: {
    id: 't10_vector_dot_mc',
    name: 'Tính tích vô hướng và góc giữa hai vectơ trong mặt phẳng',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Vectơ trong mặt phẳng tọa độ',
    description: 'Cho hai vectơ u(x1; y1) và v(x2; y2) khác vectơ-không. Tính tích vô hướng u.v.',
    conditionSummary: 'u ≠ 0 và v ≠ 0 để hai vectơ không suy biến thành vectơ-không',
    paramSpecs: [
      { name: 'x1', label: 'Hoành độ x1', min: -6, max: 6 },
      { name: 'y1', label: 'Tung độ y1', min: -6, max: 6 },
      { name: 'x2', label: 'Hoành độ x2', min: -6, max: 6 },
      { name: 'y2', label: 'Tung độ y2', min: -6, max: 6 },
    ],
    validateCode: `
      const { x1, y1, x2, y2 } = params;
      if (x1 === 0 && y1 === 0) return { valid: false, reason: 'Vectơ u = (0; 0) suy biến' };
      if (x2 === 0 && y2 === 0) return { valid: false, reason: 'Vectơ v = (0; 0) suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, x2, y2 } = params;
      const dot = x1 * x2 + y1 * y2;
      const cross = x1 * y2 - x2 * y1;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + dot + '$',
        ['$' + cross + '$', '$' + (x1 + x2 + y1 + y2) + '$', '$' + (-dot) + '$'],
        rng,
        (k) => '$' + (dot + k * 2 + 1) + '$'
      );
      return {
        stem: 'Trong mặt phẳng tọa độ $Oxy$, cho hai vectơ $\\vec{u} = (' + x1 + ';\\, ' + y1 + ')$ và $\\vec{v} = (' + x2 + ';\\, ' + y2 + ')$. Tích vô hướng $\\vec{u} \\cdot \\vec{v}$ bằng:',
        options,
        correctIndex,
        answerSummary: '' + dot,
        solutionSteps: [
          'Áp dụng biểu thức tọa độ tích vô hướng: $\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2$.',
          'Thay số: $\\vec{u} \\cdot \\vec{v} = (' + x1 + ')\\cdot(' + x2 + ') + (' + y1 + ')\\cdot(' + y2 + ') = ' + dot + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vectơ u = (0; 0)', params: { x1: 0, y1: 0, x2: 2, y2: 3 }, expectedValid: false },
      { label: 'Biên hai vectơ vuông góc (tích vô hướng = 0)', params: { x1: 2, y1: 3, x2: -3, y2: 2 }, expectedValid: true },
    ],
  },

  t11_prob_indep_tf: {
    id: 't11_prob_indep_tf',
    name: 'Quy tắc cộng và nhân xác suất cho hai biến cố độc lập',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Quy tắc tính xác suất',
    description: 'Cho hai biến cố độc lập A và B với P(A) = p/10, P(B) = q/10. Đánh giá 4 mệnh đề về P(AB), P(A∪B), P(A̅B̅).',
    conditionSummary: '0 < P(A) < 1 và 0 < P(B) < 1',
    paramSpecs: [
      { name: 'p', label: '10 * P(A)', min: 2, max: 8 },
      { name: 'q', label: '10 * P(B)', min: 2, max: 8 },
    ],
    validateCode: `
      const { p, q } = params;
      if (p <= 0 || p >= 10 || q <= 0 || q >= 10) return { valid: false, reason: 'Xác suất phải thuộc khoảng (0; 1)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, q } = params;
      const pA = p / 10;
      const pB = q / 10;
      const pAB = Number((pA * pB).toFixed(2));
      const pUnion = Number((pA + pB - pAB).toFixed(2));
      const pNone = Number(((1 - pA) * (1 - pB)).toFixed(2));
      const wrongUnion = Number((pA + pB).toFixed(2));

      const tfStatements = [
        { key: 'a', text: '$P(AB) = ' + u.formatNumberVN(pAB, 2) + '$.', isTrue: true },
        { key: 'b', text: '$P(A \\cup B) = ' + u.formatNumberVN(wrongUnion, 2) + '$.', isTrue: false },
        { key: 'c', text: 'Xác suất để cả hai biến cố $A$ và $B$ đều không xảy ra bằng $' + u.formatNumberVN(pNone, 2) + '$.', isTrue: true },
        { key: 'd', text: 'Xác suất để có đúng một trong hai biến cố xảy ra bằng $' + u.formatNumberVN(pUnion - pAB, 2) + '$.', isTrue: true },
      ];
      return {
        stem: 'Cho hai biến cố độc lập $A$ và $B$ biết $P(A) = ' + u.formatNumberVN(pA, 1) + '$ và $P(B) = ' + u.formatNumberVN(pB, 1) + '$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:Đ, b:S, c:Đ, d:Đ',
        solutionSteps: [
          'Do $A, B$ độc lập nên $P(AB) = P(A)P(B) = ' + u.formatNumberVN(pAB, 2) + '$ (ý a đúng).',
          'Theo quy tắc cộng: $P(A \\cup B) = P(A) + P(B) - P(AB) = ' + u.formatNumberVN(pUnion, 2) + ' \\neq ' + u.formatNumberVN(wrongUnion, 2) + '$ (ý b sai).',
          'Xác suất cả hai không xảy ra: $P(\\overline{A}\\overline{B}) = (1 - P(A))(1 - P(B)) = ' + u.formatNumberVN(pNone, 2) + '$ (ý c đúng).',
          'Xác suất có đúng một biến cố xảy ra: $P(A \\cup B) - P(AB) = ' + u.formatNumberVN(pUnion - pAB, 2) + '$ (ý d đúng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(A) = 0 (biến cố không thể)', params: { p: 0, q: 5 }, expectedValid: false },
      { label: 'Biên P(B) = 1 (biến cố chắc chắn)', params: { p: 4, q: 10 }, expectedValid: false },
      { label: 'Biên đối xứng P(A) = P(B) = 0.5', params: { p: 5, q: 5 }, expectedValid: true },
    ],
  },

  t12_integral_tf: {
    id: 't12_integral_tf',
    name: 'Tính chất nguyên hàm và tích phân hàm số liên tục',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Nguyên hàm và tích phân',
    description: 'Cho tích phân ∫_a^b f(x)dx = I1 và ∫_b^c f(x)dx = I2 (với a < b < c). Kiểm tra 4 khẳng định về tính chất tuyến tính & nối cận.',
    conditionSummary: 'a < b < c và k ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Cận a', min: -3, max: 1 },
      { name: 'b', label: 'Cận b', min: 0, max: 4 },
      { name: 'c', label: 'Cận c', min: 2, max: 7 },
      { name: 'I1', label: 'Giá trị I1', min: -6, max: 8 },
      { name: 'I2', label: 'Giá trị I2', min: -6, max: 8 },
      { name: 'k', label: 'Hệ số k', min: 2, max: 4 },
    ],
    validateCode: `
      const { a, b, c, k } = params;
      if (!(a < b && b < c)) return { valid: false, reason: 'Cần cận thỏa mãn a < b < c' };
      if (k === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, I1, I2, k } = params;
      const sumAC = I1 + I2;
      const revBA = -I1;
      const linComb = k * I1 + (b - a) * 2;
      const tfStatements = [
        { key: 'a', text: '$\\int_{' + b + '}^{' + a + '} f(x)\\,dx = ' + revBA + '$.', isTrue: true },
        { key: 'b', text: '$\\int_{' + a + '}^{' + c + '} f(x)\\,dx = ' + sumAC + '$.', isTrue: true },
        { key: 'c', text: '$\\int_{' + a + '}^{' + b + '} [' + k + 'f(x) + 2]\\,dx = ' + linComb + '$.', isTrue: true },
        { key: 'd', text: '$\\int_{' + a + '}^{' + c + '} 2f(x)\\,dx = ' + (sumAC + 2) + '$.', isTrue: false },
      ];
      return {
        stem: 'Cho hàm số $f(x)$ liên tục trên $\\mathbb{R}$ thỏa mãn $\\int_{' + a + '}^{' + b + '} f(x)\\,dx = ' + I1 + '$ và $\\int_{' + b + '}^{' + c + '} f(x)\\,dx = ' + I2 + '$. Xét tính đúng sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:Đ, b:Đ, c:Đ, d:S',
        solutionSteps: [
          'Đổi cận làm đổi dấu tích phân: $\\int_{' + b + '}^{' + a + '} f(x)\\,dx = ' + (I1 < 0 ? '-(' + I1 + ')' : '-' + I1) + ' = ' + revBA + '$ (ý a đúng).',
          'Tính chất cộng cận: $\\int_{' + a + '}^{' + c + '} f(x)\\,dx = ' + I1 + ' + (' + I2 + ') = ' + sumAC + '$ (ý b đúng).',
          'Tính chất tuyến tính: $' + k + '\\int_{' + a + '}^{' + b + '} f(x)\\,dx + \\int_{' + a + '}^{' + b + '} 2\\,dx = ' + k + '\\cdot(' + I1 + ') + 2(' + b + ' - (' + a + ')) = ' + linComb + '$ (ý c đúng).',
          'Ta có $\\int_{' + a + '}^{' + c + '} 2f(x)\\,dx = 2(' + sumAC + ') = ' + (2 * sumAC) + ' \\neq ' + (sumAC + 2) + '$ (ý d sai).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = b (hai cận trùng nhau)', params: { a: 1, b: 1, c: 4, I1: 2, I2: 3, k: 2 }, expectedValid: false },
      { label: 'Biên I1 = -I2 (tích phân triệt tiêu)', params: { a: 0, b: 2, c: 5, I1: 4, I2: -4, k: 3 }, expectedValid: true },
    ],
  },

  t12_b4_graph_survey_mc: {
    id: 't12_b4_graph_survey_mc',
    name: 'Tìm tâm đối xứng của đồ thị hàm số bậc ba',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Khảo sát sự biến thiên và vẽ đồ thị',
    description: 'Cho đồ thị hàm số y = ax^3 + bx^2 + cx + d. Xác định tọa độ tâm đối xứng I(x_I; y_I) với y\'\'(x_I) = 0.',
    conditionSummary: 'a ≠ 0 và b chia hết cho 3a để hoành độ điểm uốn nguyên',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -2, max: 2, allowZero: false },
      { name: 'h', label: 'Hoành độ tâm uốn h', min: -3, max: 3 },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5 },
      { name: 'd', label: 'Hệ số d', min: -6, max: 6 },
    ],
    validateCode: `
      if (params.a === 0) return { valid: false, reason: 'a = 0 suy biến thành hàm bậc hai (không có tâm đối xứng)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, h, c, d } = params;
      const b = -3 * a * h;
      const poly = u.formatPoly([a, b, c, d]);
      const yI = a * Math.pow(h, 3) + b * Math.pow(h, 2) + c * h + d;
      const correct = '$I(' + h + ';\\, ' + yI + ')$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$I(' + (-h) + ';\\, ' + yI + ')$',
          '$I(' + h + ';\\, ' + (-yI) + ')$',
          '$I(' + (h + 1) + ';\\, ' + (yI + 2) + ')$',
        ],
        rng,
        (k) => '$I(' + (h + k + 1) + ';\\, ' + (yI - k) + ')$'
      );
      return {
        stem: 'Tâm đối xứng của đồ thị hàm số $y = ' + poly + '$ có tọa độ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          "Đạo hàm cấp một $y' = " + u.formatQuadratic(3 * a, 2 * b, c) + "$ và đạo hàm cấp hai $y'' = " + u.formatLinear(6 * a, 2 * b) + "$.",
          "Giải $y'' = 0 \\Leftrightarrow x_I = " + h + "$. Thay vào hàm số được $y_I = " + yI + "$.",
          'Vậy tâm đối xứng của đồ thị là $I(' + h + ';\\, ' + yI + ')$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (không phải bậc ba)', params: { a: 0, h: 1, c: 2, d: 3 }, expectedValid: false },
      { label: 'Biên h = 0 (tâm đối xứng nằm trên Oy)', params: { a: 1, h: 0, c: -3, d: 2 }, expectedValid: true },
    ],
  },

  t12_b5_optimization_sa: {
    id: 't12_b5_optimization_sa',
    name: 'Bài toán tối ưu thực tiễn — Thể tích hộp chữ nhật lớn nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng đạo hàm giải quyết vấn đề thực tiễn',
    description: 'Từ tấm bìa hình vuông cạnh L (cm), cắt bốn góc bốn hình vuông bằng nhau cạnh x (cm) rồi gập thành hộp không nắp. Tìm x để thể tích hộp lớn nhất.',
    conditionSummary: 'L = 6k > 0 để nghiệm tối ưu x = L/6 luôn nguyên dương và thỏa mãn 0 < x < L/2',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k (cạnh L = 6k)', min: 2, max: 12 },
    ],
    validateCode: `
      if (params.k <= 0) return { valid: false, reason: 'Cạnh tấm bìa L = 6k phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const L = 6 * params.k;
      const xOpt = params.k;
      const maxVol = xOpt * Math.pow(L - 2 * xOpt, 2);
      return {
        stem: 'Từ một tấm bìa hình vuông có cạnh bằng $' + L + '\\text{ cm}$, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau có cạnh $x\\text{ (cm)}$ rồi gấp lại thành một chiếc hộp chữ nhật không nắp. Giá trị của $x$ (tính bằng cm) để thể tích chiếc hộp thu được lớn nhất là bao nhiêu?',
        shortAnswer: '' + xOpt,
        numericValue: xOpt,
        answerSummary: '$x = ' + xOpt + '\\text{ cm}$',
        solutionSteps: [
          'Điều kiện cạnh hình vuông cắt bỏ: $0 < x < ' + (L / 2) + '$.',
          'Thể tích chiếc hộp là $V(x) = x(' + L + ' - 2x)^2 = 4x^3 - ' + (4 * L) + 'x^2 + ' + (L * L) + 'x$.',
          "Đạo hàm $V'(x) = 12x^2 - " + (8 * L) + "x + " + (L * L) + " = 0 \\Leftrightarrow x = " + xOpt + "$ (nhận) hoặc $x = " + (L / 2) + "$ (loại).",
          'Lập bảng biến thiên trên $(0;\\, ' + (L / 2) + ')$, thể tích đạt cực đại $V_{\\max} = ' + maxVol + '\\text{ cm}^3$ tại $x = ' + xOpt + '\\text{ cm}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0 (tấm bìa cạnh 0)', params: { k: 0 }, expectedValid: false },
      { label: 'Biên k = 2 (tấm bìa cạnh 12 cm)', params: { k: 2 }, expectedValid: true },
    ],
  },

  t12_b6_space_vector_mc: {
    id: 't12_b6_space_vector_mc',
    name: 'Tính tích vô hướng các vectơ trong hình lập phương',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Vectơ trong không gian',
    description: 'Cho hình lập phương ABCD.A\'B\'C\'D\' cạnh a > 0. Tính tích vô hướng giữa hai vectơ đường chéo/cạnh.',
    conditionSummary: 'Cạnh hình lập phương a > 0',
    paramSpecs: [
      { name: 'a', label: 'Độ dài cạnh a', min: 2, max: 12 },
      { name: 'mode', label: 'Cặp vectơ (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      if (params.a <= 0) return { valid: false, reason: 'Cạnh hình lập phương phải a > 0' };
      if (params.mode !== 0 && params.mode !== 1) return { valid: false, reason: 'Chỉ số cặp vectơ phải là 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, mode } = params;
      const ans = a * a;
      const pairLabel = mode === 0 ? "\\overrightarrow{AB} \\cdot \\overrightarrow{AC'}" : "\\overrightarrow{AD} \\cdot \\overrightarrow{D'B}";
      const realAns = mode === 0 ? ans : -ans;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + realAns + '$',
        ['$' + (-realAns) + '$', '$' + (2 * ans) + '$', '$0$'],
        rng,
        (k) => '$' + (realAns + k * a) + '$'
      );
      return {
        stem: "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $" + a + "$. Giá trị của tích vô hướng $" + pairLabel + "$ bằng:",
        options,
        correctIndex,
        answerSummary: '$' + realAns + '$',
        solutionSteps: [
          mode === 0
            ? "Phân tích $\\overrightarrow{AC'} = \\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'}$. Do các cạnh đôi một vuông góc nên $\\overrightarrow{AB} \\cdot \\overrightarrow{AD} = 0$ và $\\overrightarrow{AB} \\cdot \\overrightarrow{AA'} = 0$."
            : "Phân tích $\\overrightarrow{D'B} = \\overrightarrow{D'D} + \\overrightarrow{DA} + \\overrightarrow{AB} = -\\overrightarrow{AA'} - \\overrightarrow{AD} + \\overrightarrow{AB}$.",
          mode === 0
            ? "Suy ra $\\overrightarrow{AB} \\cdot \\overrightarrow{AC'} = AB^2 = " + a + "^2 = " + realAns + "$."
            : "Do $AD \\perp AA'$ và $AD \\perp AB$ nên $\\overrightarrow{AD} \\cdot \\overrightarrow{D'B} = -AD^2 = -" + a + "^2 = " + realAns + "$.",
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên cạnh a = 0 (lập phương suy biến)', params: { a: 0, mode: 0 }, expectedValid: false },
      { label: 'Biên cạnh a = 2', params: { a: 2, mode: 0 }, expectedValid: true },
    ],
  },

  t12_b7_coord_projection_mc: {
    id: 't12_b7_coord_projection_mc',
    name: 'Tìm tọa độ hình chiếu vuông góc và điểm đối xứng trong Oxyz',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Hệ trục toạ độ trong không gian',
    description: 'Cho điểm M(x; y; z) có ít nhất 2 tọa độ khác 0. Tìm hình chiếu vuông góc lên mặt phẳng tọa độ (Oxy), (Oyz) hoặc (Oxz).',
    conditionSummary: 'Ít nhất 2 tọa độ khác 0 để tránh hình chiếu trùng gốc tọa độ gây nhiễu trùng lặp',
    paramSpecs: [
      { name: 'x', label: 'Hoành độ x', min: -7, max: 7 },
      { name: 'y', label: 'Tung độ y', min: -7, max: 7 },
      { name: 'z', label: 'Cao độ z', min: -7, max: 7 },
      { name: 'planeIdx', label: 'Mặt phẳng (0:Oxy, 1:Oyz, 2:Oxz)', min: 0, max: 2 },
    ],
    validateCode: `
      const { x, y, z, planeIdx } = params;
      if (x === 0 || y === 0 || z === 0) return { valid: false, reason: 'Tránh tọa độ bằng 0 để hình chiếu và các phương án nhiễu hoàn toàn phân biệt' };
      if (![0, 1, 2].includes(planeIdx)) return { valid: false, reason: 'Chỉ số mặt phẳng phải từ 0 đến 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x, y, z, planeIdx } = params;
      const planes = ['(Oxy)', '(Oyz)', '(Oxz)'];
      const coords = [
        [x, y, 0],
        [0, y, z],
        [x, 0, z],
      ];
      const [px, py, pz] = coords[planeIdx];
      const correct = '$' + u.formatCoord3D(px, py, pz) + '$';
      const fakes = coords
        .filter((_, idx) => idx !== planeIdx)
        .map(c => '$' + u.formatCoord3D(c[0], c[1], c[2]) + '$');
      fakes.push('$' + u.formatCoord3D(-px, -py, -pz) + '$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        fakes,
        rng,
        (k) => '$' + u.formatCoord3D(px + k, py, pz) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, hình chiếu vuông góc của điểm $M' + u.formatCoord3D(x, y, z) + '$ trên mặt phẳng $' + planes[planeIdx] + '$ có tọa độ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Hình chiếu vuông góc của điểm $M(x;\\, y;\\, z)$ lên mặt phẳng $' + planes[planeIdx] + '$ giữ nguyên hai tọa độ thuộc mặt phẳng và cho tọa độ còn lại bằng $0$.',
          'Vậy tọa độ hình chiếu là $' + u.formatCoord3D(px, py, pz) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên có tọa độ bằng 0 (trùng mặt phẳng)', params: { x: 0, y: 2, z: 3, planeIdx: 1 }, expectedValid: false },
      { label: 'Biên tọa độ âm', params: { x: -3, y: 4, z: -5, planeIdx: 2 }, expectedValid: true },
    ],
  },

  t12_b8_vector_ops_sa: {
    id: 't12_b8_vector_ops_sa',
    name: 'Tính độ dài tổ hợp tuyến tính hai vectơ trong Oxyz',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Biểu thức toạ độ của các phép toán vectơ',
    description: 'Cho hai vectơ u và v trong Oxyz. Tính bình phương độ dài |au + bv|^2 (luôn cho số nguyên chính xác).',
    conditionSummary: 'a ≠ 0, b ≠ 0 và u, v khác vectơ-không',
    paramSpecs: [
      { name: 'x1', label: 'u_x', min: -4, max: 4 },
      { name: 'y1', label: 'u_y', min: -4, max: 4 },
      { name: 'z1', label: 'u_z', min: -4, max: 4 },
      { name: 'x2', label: 'v_x', min: -4, max: 4 },
      { name: 'y2', label: 'v_y', min: -4, max: 4 },
      { name: 'z2', label: 'v_z', min: -4, max: 4 },
      { name: 'k', label: 'Hệ số k', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { x1, y1, z1, x2, y2, z2, k } = params;
      if (k === 0) return { valid: false, reason: 'Hệ số k phải khác 0' };
      if (x1 === 0 && y1 === 0 && z1 === 0) return { valid: false, reason: 'Vectơ u = 0 suy biến' };
      if (x2 === 0 && y2 === 0 && z2 === 0) return { valid: false, reason: 'Vectơ v = 0 suy biến' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { x1, y1, z1, x2, y2, z2, k } = params;
      const rx = x1 + k * x2;
      const ry = y1 + k * y2;
      const rz = z1 + k * z2;
      const normSq = rx * rx + ry * ry + rz * rz;
      const expr = k === 1 ? '\\vec{u} + \\vec{v}' : k === -1 ? '\\vec{u} - \\vec{v}' : k > 0 ? '\\vec{u} + ' + k + '\\vec{v}' : '\\vec{u} - ' + Math.abs(k) + '\\vec{v}';
      return {
        stem: 'Trong không gian $Oxyz$, cho $\\vec{u} = ' + u.formatCoord3D(x1, y1, z1) + '$ và $\\vec{v} = ' + u.formatCoord3D(x2, y2, z2) + '$. Tính bình phương độ dài $|' + expr + '|^2$.',
        shortAnswer: '' + normSq,
        numericValue: normSq,
        answerSummary: '$' + normSq + '$',
        solutionSteps: [
          'Tìm tọa độ vectơ $\\vec{w} = ' + expr + ' = ' + u.formatCoord3D(rx, ry, rz) + '$.',
          'Khi đó $|\\vec{w}|^2 = (' + rx + ')^2 + (' + ry + ')^2 + (' + rz + ')^2 = ' + normSq + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên vectơ u = (0; 0; 0)', params: { x1: 0, y1: 0, z1: 0, x2: 1, y2: 2, z2: 3, k: 2 }, expectedValid: false },
      { label: 'Biên hai vectơ triệt tiêu về (0;0;0)', params: { x1: 2, y1: -2, z1: 4, x2: 1, y2: -1, z2: 2, k: -2 }, expectedValid: true },
    ],
  },

  t12_b9_range_iqr_sa: {
    id: 't12_b9_range_iqr_sa',
    name: 'Tính khoảng tứ phân vị Δ_Q của mẫu số liệu ghép nhóm',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Khoảng biến thiên và khoảng tứ phân vị',
    description: 'Cho 4 nhóm liên tiếp độ dài bằng nhau với tổng tần số N = 4k chia hết cho 4, đảm bảo Q1 nằm ở nhóm 2 và Q3 nằm ở nhóm 3.',
    conditionSummary: 'n1 < N/4 < n1 + n2 và n1 + n2 < 3N/4 <= n1 + n2 + n3 để tính Q1, Q3 rõ ràng không suy biến',
    paramSpecs: [
      { name: 'n1', label: 'Tần số [0;10)', min: 2, max: 6 },
      { name: 'n2', label: 'Tần số [10;20)', min: 6, max: 14 },
      { name: 'n3', label: 'Tần số [20;30)', min: 6, max: 14 },
      { name: 'n4', label: 'Tần số [30;40)', min: 2, max: 6 },
    ],
    validateCode: `
      const { n1, n2, n3, n4 } = params;
      if (n1 <= 0 || n2 <= 0 || n3 <= 0 || n4 <= 0) return { valid: false, reason: 'Mọi nhóm đầu/cuối phải có tần số dương' };
      const N = n1 + n2 + n3 + n4;
      if (N % 4 !== 0) return { valid: false, reason: 'Chọn tổng N chia hết cho 4 để tính tứ phân vị chuẩn xác' };
      const q1Pos = N / 4;
      const q3Pos = (3 * N) / 4;
      if (!(n1 < q1Pos && q1Pos < n1 + n2)) return { valid: false, reason: 'Q1 phải rơi vào nhóm 2' };
      if (!(n1 + n2 < q3Pos && q3Pos < n1 + n2 + n3)) return { valid: false, reason: 'Q3 phải rơi vào nhóm 3' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, n2, n3, n4 } = params;
      const N = n1 + n2 + n3 + n4;
      const Q1 = 10 + ((N / 4 - n1) / n2) * 10;
      const Q3 = 20 + (((3 * N) / 4 - (n1 + n2)) / n3) * 10;
      const iqr = Number((Q3 - Q1).toFixed(2));
      const ansText = u.formatNumberVN(iqr, 2);
      return {
        stem: 'Cho mẫu số liệu ghép nhóm gồm 4 nhóm $[0;10),\\, [10;20),\\, [20;30),\\, [30;40)$ có tần số tương ứng là $' + n1 + ',\\, ' + n2 + ',\\, ' + n3 + ',\\, ' + n4 + '$. Khoảng tứ phân vị $\\Delta_Q$ của mẫu số liệu ghép nhóm trên bằng bao nhiêu? (Làm tròn đến hàng phần trăm).',
        shortAnswer: ansText,
        numericValue: iqr,
        answerSummary: '$\\Delta_Q \\approx ' + ansText + '$',
        solutionSteps: [
          'Cỡ mẫu $N = ' + N + '$. Vị trí $Q_1$ ứng với $\\frac{N}{4} = ' + (N / 4) + '$ thuộc nhóm $[10; 20)$.',
          'Tính $Q_1 = 10 + \\frac{' + (N / 4) + ' - ' + n1 + '}{' + n2 + '} \\cdot 10 = ' + u.formatNumberVN(Q1, 2) + '$.',
          'Vị trí $Q_3$ ứng với $\\frac{3N}{4} = ' + ((3 * N) / 4) + '$ thuộc nhóm $[20; 30)$, tính $Q_3 = 20 + \\frac{' + ((3 * N) / 4) + ' - ' + (n1 + n2) + '}{' + n3 + '} \\cdot 10 = ' + u.formatNumberVN(Q3, 2) + '$.',
          'Khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1 \\approx ' + ansText + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tần số bằng 0 ở nhóm đầu (khoảng biến thiên sai lệch)', params: { n1: 0, n2: 8, n3: 8, n4: 4 }, expectedValid: false },
      { label: 'Biên N = 24 chia hết cho 4', params: { n1: 3, n2: 9, n3: 9, n4: 3 }, expectedValid: true },
    ],
  },

  t12_b11_antiderivative_mc: {
    id: 't12_b11_antiderivative_mc',
    name: 'Tìm nguyên hàm F(x) thỏa mãn điều kiện ban đầu F(x0) = y0',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Nguyên hàm',
    description: 'Cho f(x) = 3ax^2 + 2bx + c và F(x0) = y0. Tìm công thức đúng của nguyên hàm F(x).',
    conditionSummary: 'a ≠ 0 để f(x) là hàm bậc hai đầy đủ',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -3, max: 3, allowZero: false },
      { name: 'b', label: 'Hệ số b', min: -4, max: 4 },
      { name: 'c', label: 'Hệ số c', min: -5, max: 5 },
      { name: 'x0', label: 'Điểm x0', min: -1, max: 2 },
      { name: 'y0', label: 'Giá trị y0', min: -4, max: 6 },
    ],
    validateCode: `
      if (params.a === 0) return { valid: false, reason: 'a = 0 làm giảm bậc hàm số' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, x0, y0 } = params;
      const fx = u.formatQuadratic(3 * a, 2 * b, c);
      const valAtX0 = a * Math.pow(x0, 3) + b * Math.pow(x0, 2) + c * x0;
      const C = y0 - valAtX0;
      const correctPoly = u.formatPoly([a, b, c, C]);
      const fake1 = u.formatPoly([a, b, c, C + 2]);
      const fake2 = u.formatPoly([a, b, c, C - 3]);
      const fake3 = u.formatPoly([3 * a, 2 * b, c, C]);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$F(x) = ' + correctPoly + '$',
        ['$F(x) = ' + fake1 + '$', '$F(x) = ' + fake2 + '$', '$F(x) = ' + fake3 + '$'],
        rng,
        (k) => '$F(x) = ' + u.formatPoly([a, b, c, C + k + 4]) + '$'
      );
      return {
        stem: 'Biết $F(x)$ là một nguyên hàm của hàm số $f(x) = ' + fx + '$ và thỏa mãn $F(' + x0 + ') = ' + y0 + '$. Khẳng định nào sau đây đúng?',
        options,
        correctIndex,
        answerSummary: '$F(x) = ' + correctPoly + '$',
        solutionSteps: [
          'Họ nguyên hàm của $f(x)$ là $F(x) = ' + u.formatPoly([a, b, c, 0]) + ' + C$.',
          'Từ $F(' + x0 + ') = ' + y0 + ' \\Rightarrow ' + valAtX0 + ' + C = ' + y0 + ' \\Rightarrow C = ' + C + '$.',
          'Vậy $F(x) = ' + correctPoly + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0', params: { a: 0, b: 2, c: 1, x0: 0, y0: 3 }, expectedValid: false },
      { label: 'Biên C = 0 tại F(1)', params: { a: 1, b: -2, c: 3, x0: 1, y0: 2 }, expectedValid: true },
    ],
  },

  t12_b15_line_eq_mc: {
    id: 't12_b15_line_eq_mc',
    name: 'Viết phương trình chính tắc đường thẳng đi qua hai điểm trong Oxyz',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình đường thẳng trong không gian',
    description: 'Cho hai điểm A, B. Kiểm tra AB có tất cả thành phần khác 0 để tồn tại phương trình chính tắc không chia cho 0.',
    conditionSummary: 'xB ≠ xA, yB ≠ yA, zB ≠ zA (không thành phần nào của vectơ chỉ phương bằng 0)',
    paramSpecs: [
      { name: 'xA', label: 'x_A', min: -4, max: 4 },
      { name: 'yA', label: 'y_A', min: -4, max: 4 },
      { name: 'zA', label: 'z_A', min: -4, max: 4 },
      { name: 'u1', label: 'u_x', min: -3, max: 3, allowZero: false },
      { name: 'u2', label: 'u_y', min: -3, max: 3, allowZero: false },
      { name: 'u3', label: 'u_z', min: -3, max: 3, allowZero: false },
    ],
    validateCode: `
      const { u1, u2, u3 } = params;
      if (u1 === 0 || u2 === 0 || u3 === 0) {
        return { valid: false, reason: 'Thành phần vectơ chỉ phương bằng 0 không viết được dạng chính tắc chia mẫu' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { xA, yA, zA, u1, u2, u3 } = params;
      const xB = xA + u1, yB = yA + u2, zB = zA + u3;
      const fmtCanon = (px, py, pz, vx, vy, vz) =>
        '\\frac{' + u.formatShift('x', -px) + '}{' + vx + '} = \\frac{' + u.formatShift('y', -py) + '}{' + vy + '} = \\frac{' + u.formatShift('z', -pz) + '}{' + vz + '}';
      const correct = '$' + fmtCanon(xA, yA, zA, u1, u2, u3) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$' + fmtCanon(-xA, -yA, -zA, u1, u2, u3) + '$',
          '$' + fmtCanon(xA, yA, zA, u1, -u2, u3) + '$',
          '$' + fmtCanon(xA, yA, zA, u1 === -1 ? 2 : u1 + 1, u2, u3) + '$',
        ],
        rng,
        (k) => '$' + fmtCanon(xA + k, yA, zA, u1, u2, u3) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, phương trình chính tắc của đường thẳng $AB$ đi qua hai điểm $A' + u.formatCoord3D(xA, yA, zA) + '$ và $B' + u.formatCoord3D(xB, yB, zB) + '$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Đường thẳng $AB$ nhận $\\overrightarrow{AB} = ' + u.formatCoord3D(u1, u2, u3) + '$ làm một vectơ chỉ phương.',
          'Phương trình chính tắc đi qua $A' + u.formatCoord3D(xA, yA, zA) + '$ là ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên u1 = 0 (mẫu chia cho 0)', params: { xA: 1, yA: 2, zA: 3, u1: 0, u2: 2, u3: -1 }, expectedValid: false },
      { label: 'Biên tọa độ gốc O(0;0;0)', params: { xA: 0, yA: 0, zA: 0, u1: 1, u2: -2, u3: 3 }, expectedValid: true },
    ],
  },

  t12_b16_angle_space_sa: {
    id: 't12_b16_angle_space_sa',
    name: 'Tính cosin góc giữa hai mặt phẳng trong không gian Oxyz',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức tính góc trong không gian',
    description: 'Sử dụng hai vectơ pháp tuyến Pytago 3D có độ dài nguyên (3, 7, 9) để tính cos((P), (Q)) dưới dạng phân số tối giản.',
    conditionSummary: 'Hai mặt phẳng không trùng/song song tầm thường và |n1|, |n2| > 0',
    paramSpecs: [
      { name: 'idx1', label: 'Bộ pháp tuyến 1 (0..2)', min: 0, max: 2 },
      { name: 'idx2', label: 'Bộ pháp tuyến 2 (0..2)', min: 0, max: 2 },
      { name: 'd1', label: 'Hệ số d1', min: -5, max: 5 },
      { name: 'd2', label: 'Hệ số d2', min: -5, max: 5 },
    ],
    validateCode: `
      const { idx1, idx2 } = params;
      if (idx1 < 0 || idx1 > 2 || idx2 < 0 || idx2 > 2) return { valid: false, reason: 'Chỉ số bộ pháp tuyến ngoài phạm vi' };
      if (idx1 === idx2) return { valid: false, reason: 'Hai mặt phẳng song song hoặc trùng nhau (góc 0°)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const normals = [
        [1, 2, 2, 3],
        [2, -3, 6, 7],
        [1, 4, -8, 9],
      ];
      const [a1, b1, c1, l1] = normals[params.idx1];
      const [a2, b2, c2, l2] = normals[params.idx2];
      const { d1, d2 } = params;
      const dot = Math.abs(a1 * a2 + b1 * b2 + c1 * c2);
      const frac = u.simplifyFrac(dot, l1 * l2);
      const rounded = Number(frac.value.toFixed(2));
      const p1 = u.formatPlaneEq(a1, b1, c1, d1);
      const p2 = u.formatPlaneEq(a2, b2, c2, d2);
      return {
        stem: 'Trong không gian $Oxyz$, cho hai mặt phẳng $(P): ' + p1 + '$ và $(Q): ' + p2 + '$. Tính côsin của góc giữa hai mặt phẳng $(P)$ và $(Q)$ (kết quả viết dưới dạng phân số tối giản hoặc làm tròn đến hàng phần trăm).',
        shortAnswer: frac.text,
        numericValue: rounded,
        answerSummary: '$' + frac.latex + '$',
        solutionSteps: [
          'Vectơ pháp tuyến của $(P)$ và $(Q)$ lần lượt là $\\vec{n}_1 = ' + u.formatCoord3D(a1, b1, c1) + '$ ($|\\vec{n}_1| = ' + l1 + '$) và $\\vec{n}_2 = ' + u.formatCoord3D(a2, b2, c2) + '$ ($|\\vec{n}_2| = ' + l2 + '$).',
          'Áp dụng công thức: $\\cos((P), (Q)) = \\frac{|\\vec{n}_1 \\cdot \\vec{n}_2|}{|\\vec{n}_1|\\cdot|\\vec{n}_2|} = \\frac{' + dot + '}{' + (l1 * l2) + '} = ' + frac.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hai mặt phẳng song song (idx1 = idx2)', params: { idx1: 1, idx2: 1, d1: 2, d2: -3 }, expectedValid: false },
      { label: 'Biên hai mặt phẳng cắt nhau', params: { idx1: 0, idx2: 1, d1: 1, d2: -4 }, expectedValid: true },
    ],
  },

  t12_b17_sphere_eq_mc: {
    id: 't12_b17_sphere_eq_mc',
    name: 'Tìm tâm và bán kính mặt cầu từ phương trình khai triển',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Phương trình mặt cầu',
    description: 'Cho mặt cầu x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 với R > 0 nguyên. Kiểm tra a^2 + b^2 + c^2 - d = R^2 > 0.',
    conditionSummary: 'Bán kính R > 0 đảm bảo phương trình xác định mặt cầu thực sự',
    paramSpecs: [
      { name: 'a', label: 'Hoành độ tâm a', min: -4, max: 4 },
      { name: 'b', label: 'Tung độ tâm b', min: -4, max: 4 },
      { name: 'c', label: 'Cao độ tâm c', min: -4, max: 4 },
      { name: 'R', label: 'Bán kính R', min: 1, max: 7 },
    ],
    validateCode: `
      if (params.R <= 0) return { valid: false, reason: 'Bán kính mặt cầu phải R > 0' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, c, R } = params;
      const d = a * a + b * b + c * c - R * R;
      const terms = [
        'x^2 + y^2 + z^2',
        u.formatTerm(-2 * a, 'x', false),
        u.formatTerm(-2 * b, 'y', false),
        u.formatTerm(-2 * c, 'z', false),
        u.formatTerm(d, '', false),
      ].filter(Boolean).join('');
      const correct = '$I' + u.formatCoord3D(a, b, c) + ',\\; R = ' + R + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          '$I' + u.formatCoord3D(-a, -b, -c) + ',\\; R = ' + R + '$',
          '$I' + u.formatCoord3D(a, b, c) + ',\\; R = ' + (R * R) + '$',
          '$I' + u.formatCoord3D(2 * a, 2 * b, 2 * c) + ',\\; R = ' + (R + 1) + '$',
        ],
        rng,
        (k) => '$I' + u.formatCoord3D(a, b, c) + ',\\; R = ' + (R + k + 1) + '$'
      );
      return {
        stem: 'Trong không gian $Oxyz$, mặt cầu $(S): ' + terms + ' = 0$ có tâm $I$ và bán kính $R$ là:',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phương trình có dạng $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với $a = ' + a + ',\\, b = ' + b + ',\\, c = ' + c + ',\\, d = ' + d + '$.',
          'Kiểm tra $a^2 + b^2 + c^2 - d = ' + (R * R) + ' > 0$. Vậy tâm $I' + u.formatCoord3D(a, b, c) + '$ và bán kính $R = \\sqrt{' + (R * R) + '} = ' + R + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R = 0 (suy biến thành điểm)', params: { a: 1, b: 2, c: -1, R: 0 }, expectedValid: false },
      { label: 'Biên tâm tại gốc O(0; 0; 0)', params: { a: 0, b: 0, c: 0, R: 3 }, expectedValid: true },
    ],
  },

  t12_b18_cond_prob_mc: {
    id: 't12_b18_cond_prob_mc',
    name: 'Tính xác suất có điều kiện P(A|B) từ các biến cố',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Xác suất có điều kiện',
    description: 'Cho P(B) và P(AB) thỏa mãn 0 < P(AB) <= P(B) < 1. Tính xác suất có điều kiện P(A|B).',
    conditionSummary: 'P(B) > 0 và P(AB) <= P(B) để xác suất có điều kiện nằm trong (0; 1]',
    paramSpecs: [
      { name: 'numAB', label: 'Tử số 10*P(AB)', min: 1, max: 5 },
      { name: 'numB', label: 'Tử số 10*P(B)', min: 3, max: 9 },
    ],
    validateCode: `
      const { numAB, numB } = params;
      if (numB <= 0 || numB >= 10) return { valid: false, reason: 'P(B) phải thuộc (0; 1)' };
      if (numAB <= 0 || numAB >= numB) return { valid: false, reason: 'Cần 0 < P(AB) < P(B) để P(A|B) thuộc (0; 1)' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { numAB, numB } = params;
      const pAB = u.formatNumberVN(numAB / 10, 1);
      const pB = u.formatNumberVN(numB / 10, 1);
      const ans = u.simplifyFrac(numAB, numB);
      const fake1 = u.simplifyFrac(numB - numAB, numB);
      const fake2 = u.simplifyFrac(numAB * numB, 100);
      const fake3 = u.simplifyFrac(numAB + 1, numB + 1);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ans.latex + '$',
        ['$' + fake1.latex + '$', '$' + fake2.latex + '$', '$' + fake3.latex + '$'],
        rng,
        (k) => '$' + u.simplifyFrac(numAB + k, numB + k + 2).latex + '$'
      );
      return {
        stem: 'Cho hai biến cố $A$ và $B$ có $P(B) = ' + pB + '$ và $P(AB) = ' + pAB + '$. Xác suất có điều kiện $P(A|B)$ bằng:',
        options,
        correctIndex,
        answerSummary: '$' + ans.latex + '$',
        solutionSteps: [
          'Áp dụng công thức xác suất có điều kiện với $P(B) = ' + pB + ' > 0$: $P(A|B) = \\frac{P(AB)}{P(B)}$.',
          'Thay số: $P(A|B) = \\frac{' + pAB + '}{' + pB + '} = ' + ans.latex + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(B) = 0 (chia cho 0)', params: { numAB: 1, numB: 0 }, expectedValid: false },
      { label: 'Biên P(AB) > P(B) (vô lý xác suất > 1)', params: { numAB: 6, numB: 4 }, expectedValid: false },
      { label: 'Biên hợp lệ P(AB) = 0.2, P(B) = 0.5', params: { numAB: 2, numB: 5 }, expectedValid: true },
    ],
  },
  ...EXTRA_TEMPLATES_10_11,
  ...G12_B1_TEMPLATES,
  ...G12_B2_TEMPLATES,
  ...G12_B3_TEMPLATES,
  ...G12_B4_TEMPLATES,
  ...G12_B5_TEMPLATES,
  ...G12_C1_END_TEMPLATES,
  ...G12_B6_TEMPLATES,
  ...G12_B7_TEMPLATES,
  ...G12_B8_TEMPLATES,
  ...G12_B9_TEMPLATES,
  ...G12_B10_TEMPLATES,
  ...G12_B11_TEMPLATES,
  ...G12_B12_TEMPLATES,
  ...G12_B13_TEMPLATES,
  ...G12_B14_TEMPLATES,
  ...G12_B15_TEMPLATES,
  ...G12_B16_TEMPLATES,
  ...G12_B17_TEMPLATES,
  ...G12_B18_TEMPLATES,
  ...G12_B19_TEMPLATES,
  ...G11_B1_TEMPLATES,
  ...G11_B2_TEMPLATES,
  ...G11_B3_TEMPLATES,
};
