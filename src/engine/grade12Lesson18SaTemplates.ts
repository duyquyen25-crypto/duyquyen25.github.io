import { MathTemplate } from '../types/math';

const PROB_SA_HELPERS = String.raw`
  const fmtDec2 = (val) => (Math.round(val * 100) / 100).toFixed(2).replace('.', ',');
  const round2 = (val) => Math.round(val * 100) / 100;
  const comb = (n, k) => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) res = (res * (n - i + 1)) / i;
    return Math.round(res);
  };
`;

export const G12_B18_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D23 (Q23): Cho P(A), P(B), P(AB), tính P(\overline{A}|B)
  t12_b18_d23_comp_cond_prob_sa: {
    id: 't12_b18_d23_comp_cond_prob_sa',
    name: 'Tính xác suất P(\\overline{A}|B) từ P(A), P(B), P(AB) (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Tính chất phần bù của xác suất có điều kiện',
    description: 'Cho P(A), P(B) và P(AB). Tính P(\\overline{A}|B) = 1 - P(AB)/P(B) làm tròn đến hàng phần trăm.',
    conditionSummary: 'P(AB) < min(P(A), P(B)) và P(A) + P(B) - P(AB) <= 1; tránh biên .xx5',
    paramSpecs: [
      { name: 'pAInt', label: '100*P(A)', min: 35, max: 85 },
      { name: 'pBInt', label: '100*P(B)', min: 40, max: 85 },
      { name: 'pABInt', label: '100*P(AB)', min: 15, max: 70 },
    ],
    validateCode: `
      const { pAInt, pBInt, pABInt } = params;
      if (pABInt >= Math.min(pAInt, pBInt) - 2 || pAInt + pBInt - pABInt > 99) {
        return { valid: false, reason: 'Cần P(AB) < min(P(A), P(B)) và P(A ∪ B) <= 1' };
      }
      const pA_BExact = pABInt / pBInt;
      const ansExact = 1 - pA_BExact;
      const ansViaRound = 1 - Math.round(pA_BExact * 100) / 100;
      if (Math.round(ansExact * 100) !== Math.round(ansViaRound * 100)) {
        return { valid: false, reason: 'Tránh lệch 0,01 giữa làm tròn trung gian và tính thẳng' };
      }
      if (Math.abs(((ansExact * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAInt, pBInt, pABInt } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const pA = pAInt / 100, pB = pBInt / 100, pAB = pABInt / 100;
      const pAgivenB = round2(pABInt / pBInt);
      const ansR = round2(1 - pABInt / pBInt);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Cho hai biến cố $A$ và $B$ có $P(A) = ' +
          fmtDec2(pA) +
          '$, $P(B) = ' +
          fmtDec2(pB) +
          '$, $P(AB) = ' +
          fmtDec2(pAB) +
          '$. Tính xác suất $P(\\overline{A}|B)$ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Ta có $P(A|B) = \\dfrac{P(AB)}{P(B)} = \\dfrac{' + fmtDec2(pAB) + '}{' + fmtDec2(pB) + '} \\approx ' + fmtDec2(pAgivenB) + '$.',
          'Suy ra $P(\\overline{A}|B) = 1 - P(A|B) = 1 - ' + fmtDec2(pAgivenB) + ' = ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(AB) >= P(B)', params: { pAInt: 70, pBInt: 50, pABInt: 55 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q23', params: { pAInt: 70, pBInt: 75, pABInt: 62 }, expectedValid: true },
    ],
  },

  // D24 (Q24): Lớp học chơi bóng chuyền hoặc cờ vua (Trả lời ngắn)
  t12_b18_d24_class_two_sports_sa: {
    id: 't12_b18_d24_class_two_sports_sa',
    name: 'Xác suất học sinh chơi hai môn thể thao trong lớp (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Xác suất có điều kiện qua tập hợp',
    description:
      'Lớp có N học sinh, nA chơi bóng chuyền, nB chơi cờ vua. Tính xác suất học sinh chơi bóng chuyền biết đã chơi cờ vua (làm tròn hàng phần trăm).',
    conditionSummary: 'nA < N, nB < N, nA + nB > N + 1 và tránh biên .xx5',
    paramSpecs: [
      { name: 'N', label: 'Sĩ số lớp N', min: 22, max: 44 },
      { name: 'nA', label: 'Số HS chơi bóng chuyền', min: 12, max: 32 },
      { name: 'nB', label: 'Số HS chơi cờ vua', min: 12, max: 32 },
    ],
    validateCode: `
      const { N, nA, nB } = params;
      if (nA >= N || nB >= N || nA + nB <= N + 1) {
        return { valid: false, reason: 'Cần nA < N, nB < N và nA + nB >= N + 2' };
      }
      const val = (nA + nB - N) / nB;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { N, nA, nB } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const both = nA + nB - N;
      const ansFrac = u.simplifyFrac(both, nB);
      const ansR = round2(both / nB);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Lớp 12A6 có $' +
          N +
          '$ học sinh, mỗi học sinh biết chơi ít nhất một trong hai môn bóng chuyền hoặc cờ vua. Biết rằng có $' +
          nA +
          '$ học sinh biết chơi bóng chuyền và $' +
          nB +
          '$ học sinh biết chơi cờ vua. Chọn ngẫu nhiên $1$ học sinh của lớp. Tính xác suất học sinh được chọn biết chơi bóng chuyền, biết rằng học sinh đó biết chơi cờ vua (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$ là biến cố "Học sinh được chọn biết chơi bóng chuyền", $B$ là biến cố "Học sinh được chọn biết chơi cờ vua".',
          'Số học sinh biết chơi cả hai môn là $' + nA + ' + ' + nB + ' - ' + N + ' = ' + both + '$.',
          'Ta có $P(AB) = \\dfrac{' + both + '}{' + N + '}$ và $P(B) = \\dfrac{' + nB + '}{' + N + '}$.',
          'Xác suất cần tính là $P(A|B) = \\dfrac{P(AB)}{P(B)} = \\dfrac{' + both + '}{' + nB + '} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nA + nB <= N', params: { N: 30, nA: 15, nB: 15 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q24', params: { N: 29, nA: 17, nB: 19 }, expectedValid: true },
    ],
  },

  // D25 (Q25): Chuyển 1 bi từ hộp 1 sang hộp 2 -> 2 bi lấy ra CÙNG MÀU
  t12_b18_d25_transfer_same_color_sa: {
    id: 't12_b18_d25_transfer_same_color_sa',
    name: 'Chuyển bi giữa hai hộp rồi lấy tiếp, tính xác suất hai bi cùng màu',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức xác suất toàn phần cơ bản (chuyển bi hai hộp)',
    description:
      'Hộp 1 có g1 xanh, r1 đỏ; hộp 2 có g2 xanh, r2 đỏ. Chuyển 1 bi từ hộp 1 sang hộp 2 rồi lấy 1 bi từ hộp 2. Tính xác suất 2 bi lấy ra cùng màu.',
    conditionSummary: 'g1, r1, g2, r2 >= 2; tránh biên .xx5',
    paramSpecs: [
      { name: 'g1', label: 'Xanh hộp 1', min: 3, max: 12 },
      { name: 'r1', label: 'Đỏ hộp 1', min: 3, max: 12 },
      { name: 'g2', label: 'Xanh hộp 2', min: 3, max: 12 },
      { name: 'r2', label: 'Đỏ hộp 2', min: 3, max: 12 },
    ],
    validateCode: `
      const { g1, r1, g2, r2 } = params;
      if (g1 < 2 || r1 < 2 || g2 < 2 || r2 < 2) return { valid: false, reason: 'Số bi mỗi màu phải >= 2' };
      const val = (g1 * (g2 + 1) + r1 * (r2 + 1)) / ((g1 + r1) * (g2 + r2 + 1));
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { g1, r1, g2, r2 } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const t1 = g1 + r1;
      const t2New = g2 + r2 + 1;
      const pX = u.simplifyFrac(g1, t1);
      const pNX = u.simplifyFrac(r1, t1);
      // Y = bi thu hai mau do
      const pYGivenX = u.simplifyFrac(r2, t2New);
      const pNYGivenX = u.simplifyFrac(g2 + 1, t2New);
      const pYGivenNX = u.simplifyFrac(r2 + 1, t2New);
      const ansFrac = u.simplifyFrac(g1 * (g2 + 1) + r1 * (r2 + 1), t1 * t2New);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Hộp thứ nhất có $' +
          g1 +
          '$ viên bi xanh và $' +
          r1 +
          '$ viên bi đỏ. Hộp thứ hai có $' +
          g2 +
          '$ viên bi xanh và $' +
          r2 +
          '$ viên bi đỏ. Các viên bi có cùng kích thước và khối lượng. Lấy ra ngẫu nhiên $1$ viên bi từ hộp thứ nhất chuyển sang hộp thứ hai. Sau đó lại lấy ra ngẫu nhiên $1$ viên bi từ hộp thứ hai. Tính xác suất để hai viên bi lấy ra có cùng màu (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $X$ là biến cố "Viên bi lấy ra từ hộp thứ nhất màu xanh", $Y$ là biến cố "Viên bi lấy ra từ hộp thứ hai màu đỏ".',
          'Ta có $P(X) = ' + pX.latex + '$, $P(\\overline{X}) = ' + pNX.latex + '$; $P(\\overline{Y}|X) = 1 - ' + pYGivenX.latex + ' = ' + pNYGivenX.latex + '$ và $P(Y|\\overline{X}) = ' + pYGivenNX.latex + '$.',
          'Xác suất hai viên bi cùng màu là $P(X\\overline{Y}) + P(\\overline{X}Y) = ' + pX.latex + '\\cdot ' + pNYGivenX.latex + ' + ' + pNX.latex + '\\cdot ' + pYGivenNX.latex + ' = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hộp thiếu bi', params: { g1: 1, r1: 5, g2: 5, r2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q25', params: { g1: 9, r1: 5, g2: 5, r2: 9 }, expectedValid: true },
    ],
  },

  // D26 (Q26): Chuyển 1 bi từ hộp 1 sang hộp 2 -> 2 bi lấy ra KHÁC MÀU
  t12_b18_d26_transfer_diff_color_sa: {
    id: 't12_b18_d26_transfer_diff_color_sa',
    name: 'Chuyển bi giữa hai hộp rồi lấy tiếp, tính xác suất hai bi khác màu',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân và cộng xác suất (chuyển bi hai hộp)',
    description:
      'Hộp 1 có g1 xanh, r1 đỏ; hộp 2 có g2 xanh, r2 đỏ. Chuyển 1 bi từ hộp 1 sang hộp 2 rồi lấy 1 bi từ hộp 2. Tính xác suất 2 bi lấy ra khác màu.',
    conditionSummary: 'g1, r1, g2, r2 >= 2; tránh biên .xx5',
    paramSpecs: [
      { name: 'g1', label: 'Xanh hộp 1', min: 3, max: 12 },
      { name: 'r1', label: 'Đỏ hộp 1', min: 3, max: 12 },
      { name: 'g2', label: 'Xanh hộp 2', min: 3, max: 12 },
      { name: 'r2', label: 'Đỏ hộp 2', min: 3, max: 12 },
    ],
    validateCode: `
      const { g1, r1, g2, r2 } = params;
      if (g1 < 2 || r1 < 2 || g2 < 2 || r2 < 2) return { valid: false, reason: 'Số bi mỗi màu phải >= 2' };
      const val = (g1 * r2 + r1 * g2) / ((g1 + r1) * (g2 + r2 + 1));
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { g1, r1, g2, r2 } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const t1 = g1 + r1;
      const t2New = g2 + r2 + 1;
      const pX = u.simplifyFrac(g1, t1);
      const pNX = u.simplifyFrac(r1, t1);
      const pYGivenX = u.simplifyFrac(r2, t2New);
      const pNYGivenNX = u.simplifyFrac(g2, t2New);
      const ansFrac = u.simplifyFrac(g1 * r2 + r1 * g2, t1 * t2New);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Hộp thứ nhất có $' +
          g1 +
          '$ viên bi xanh và $' +
          r1 +
          '$ viên bi đỏ. Hộp thứ hai có $' +
          g2 +
          '$ viên bi xanh và $' +
          r2 +
          '$ viên bi đỏ. Các viên bi có cùng kích thước và khối lượng. Lấy ra ngẫu nhiên $1$ viên bi từ hộp thứ nhất chuyển sang hộp thứ hai. Sau đó lại lấy ra ngẫu nhiên $1$ viên bi từ hộp thứ hai. Tính xác suất để hai viên bi lấy ra khác màu (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $X$ là biến cố "Viên bi lấy ra từ hộp thứ nhất màu xanh", $Y$ là biến cố "Viên bi lấy ra từ hộp thứ hai màu đỏ".',
          'Ta có $P(X) = ' + pX.latex + '$, $P(\\overline{X}) = ' + pNX.latex + '$; $P(Y|X) = ' + pYGivenX.latex + '$ và $P(\\overline{Y}|\\overline{X}) = ' + pNYGivenNX.latex + '$.',
          'Xác suất hai viên bi khác màu là $P(XY) + P(\\overline{X}\\overline{Y}) = ' + pX.latex + '\\cdot ' + pYGivenX.latex + ' + ' + pNX.latex + '\\cdot ' + pNYGivenNX.latex + ' = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên hộp thiếu bi', params: { g1: 5, r1: 1, g2: 5, r2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q26', params: { g1: 8, r1: 6, g2: 10, r2: 7 }, expectedValid: true },
    ],
  },

  // D27 (Q27): Chọn 3 bạn trong nhóm m nam f nữ -> cùng giới tính biết ít nhất 1 nam
  t12_b18_d27_pick3_same_gender_given_male_sa: {
    id: 't12_b18_d27_pick3_same_gender_given_male_sa',
    name: 'Xác suất chọn 3 học sinh cùng giới tính biết có ít nhất 1 bạn nam',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Xác suất có điều kiện kết hợp tổ hợp',
    description:
      'Nhóm có m học sinh nam và f học sinh nữ. Chọn đồng thời 3 bạn. Tính xác suất 3 bạn cùng giới tính biết có ít nhất 1 nam (làm tròn hàng phần trăm).',
    conditionSummary: 'm >= 4, f >= 4; tránh biên .xx5',
    paramSpecs: [
      { name: 'm', label: 'Số học sinh nam', min: 5, max: 12 },
      { name: 'f', label: 'Số học sinh nữ', min: 5, max: 12 },
    ],
    validateCode: `
      const { m, f } = params;
      if (m < 4 || f < 4) return { valid: false, reason: 'Số nam và nữ đều phải >= 4' };
      const cTot = ((m + f) * (m + f - 1) * (m + f - 2)) / 6;
      const cFem = (f * (f - 1) * (f - 2)) / 6;
      const cMale = (m * (m - 1) * (m - 2)) / 6;
      const val = cMale / (cTot - cFem);
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m, f } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const tot = m + f;
      const nOmega = comb(tot, 3);
      const nFem3 = comb(f, 3);
      const nB = nOmega - nFem3;
      const nAB = comb(m, 3);
      const ansFrac = u.simplifyFrac(nAB, nB);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một nhóm $' +
          m +
          '$ học sinh nam và $' +
          f +
          '$ học sinh nữ tham gia lao động trên sân trường. Giáo viên chọn ngẫu nhiên đồng thời $3$ bạn trong nhóm đi trực nhật. Tính xác suất để các bạn được chọn có cùng giới tính, biết rằng có ít nhất $1$ bạn nam được chọn (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Số cách chọn $3$ bạn tùy ý là $n(\\Omega) = C_{' + tot + '}^3 = ' + nOmega + '$.',
          'Gọi $A$: "3 bạn được chọn cùng giới tính", $B$: "3 bạn được chọn có ít nhất 1 bạn nam".',
          'Ta có $n(B) = C_{' + tot + '}^3 - C_{' + f + '}^3 = ' + nOmega + ' - ' + nFem3 + ' = ' + nB + '$ và $n(AB) = C_{' + m + '}^3 = ' + nAB + '$.',
          'Vậy $P(A|B) = \\dfrac{n(AB)}{n(B)} = \\dfrac{' + nAB + '}{' + nB + '} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên m < 4', params: { m: 3, f: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q27', params: { m: 8, f: 8 }, expectedValid: true },
    ],
  },

  // D28 (Q28): Bảng thống kê 2x2 thị lực - giới tính
  t12_b18_d28_table_refraction_sa: {
    id: 't12_b18_d28_table_refraction_sa',
    name: 'Tính xác suất có điều kiện từ bảng thống kê thị lực (kèm bảng 2×2)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Đọc bảng dữ liệu hai chiều và xác suất có điều kiện',
    description:
      'Khảo sát thị lực học sinh theo bảng 2 chiều (Có/Không tật khúc xạ theo Nữ/Nam). Biết học sinh có tật khúc xạ, tính xác suất là nam.',
    conditionSummary: 'Các ô dữ liệu dương; tránh biên .xx5',
    paramSpecs: [
      { name: 'a11', label: 'Nữ có tật khúc xạ', min: 10, max: 30 },
      { name: 'a12', label: 'Nam có tật khúc xạ', min: 10, max: 30 },
      { name: 'a21', label: 'Nữ không tật', min: 18, max: 50 },
      { name: 'a22', label: 'Nam không tật', min: 40, max: 110 },
    ],
    validateCode: `
      const { a11, a12, a21, a22 } = params;
      if (a11 < 5 || a12 < 5 || a21 < 5 || a22 < 5) return { valid: false, reason: 'Số lượng mỗi ô >= 5' };
      const val = a12 / (a11 + a12);
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a11, a12, a21, a22 } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const total = a11 + a12 + a21 + a22;
      const totRef = a11 + a12;
      const ansFrac = u.simplifyFrac(a12, totRef);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Khảo sát thị lực của $' +
          total +
          '$ học sinh, ta thu được bảng số liệu sau. Chọn ngẫu nhiên một bạn trong $' +
          total +
          '$ học sinh trên. Biết rằng bạn đó có tật khúc xạ, tính xác suất bạn đó là học sinh nam (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Thị lực / Giới tính',
          row2Label: 'Có tật khúc xạ',
          intervals: ['Nữ', 'Nam'],
          frequencies: [a11, a12],
          extraRows: [{ label: 'Không có tật khúc xạ', values: [a21, a22] }],
        },
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$ là biến cố "Học sinh nam", $B$ là biến cố "Có tật khúc xạ".',
          'Tổng số học sinh có tật khúc xạ là $' + a11 + ' + ' + a12 + ' = ' + totRef + '$, trong đó có $' + a12 + '$ học sinh nam.',
          'Vậy $P(A|B) = \\dfrac{' + a12 + '}{' + totRef + '} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên ô bằng 0', params: { a11: 0, a12: 12, a21: 24, a22: 89 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q28', params: { a11: 15, a12: 12, a21: 24, a22: 89 }, expectedValid: true },
    ],
  },

  // D29 (Q29): Bảng thử nghiệm thuốc M và N (kèm bảng 2x2)
  t12_b18_d29_table_drug_trial_sa: {
    id: 't12_b18_d29_table_drug_trial_sa',
    name: 'Tính xác suất có điều kiện từ bảng thử nghiệm hai loại thuốc (kèm bảng 2×2)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Đọc bảng dữ liệu hai chiều và xác suất có điều kiện',
    description:
      'Thử nghiệm điều trị bệnh bằng hai loại thuốc M và N. Chọn ngẫu nhiên một bệnh nhân, biết khỏi bệnh, tính xác suất uống thuốc M.',
    conditionSummary: 'Các ô số liệu > 100; tránh biên .xx5',
    paramSpecs: [
      { name: 'm1', label: 'Khỏi bệnh dùng M', min: 500, max: 900 },
      { name: 'n1', label: 'Khỏi bệnh dùng N', min: 250, max: 550 },
      { name: 'm2', label: 'Không khỏi dùng M', min: 400, max: 750 },
      { name: 'n2', label: 'Không khỏi dùng N', min: 180, max: 450 },
    ],
    validateCode: `
      const { m1, n1, m2, n2 } = params;
      if (m1 < 100 || n1 < 100 || m2 < 100 || n2 < 100) return { valid: false, reason: 'Số liệu phải >= 100' };
      const val = m1 / (m1 + n1);
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { m1, n1, m2, n2 } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const totM = m1 + m2;
      const totN = n1 + n2;
      const total = totM + totN;
      const totCured = m1 + n1;
      const ansFrac = u.simplifyFrac(m1, totCured);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một công ty dược phẩm muốn so sánh tác dụng điều trị bệnh $B$ của hai loại thuốc $M$ và $N$. Công ty tiến hành thử nghiệm với $' +
          total +
          '$ bệnh nhân mắc bệnh $B$, trong đó $' +
          totM +
          '$ bệnh nhân dùng thuốc $\\mathrm{M}$, $' +
          totN +
          '$ bệnh nhân còn lại dùng thuốc $\\mathrm{N}$. Kết quả thu được như bảng sau. Chọn ngẫu nhiên một bệnh nhân trong số $' +
          total +
          '$ bệnh nhân thử nghiệm sau khi uống thuốc. Tính xác suất để bệnh nhân đó uống thuốc $M$, biết rằng bệnh nhân đó khỏi bệnh (kết quả làm tròn đến hàng phần trăm).',
        diagram: {
          kind: 'frequency_table',
          row1Label: 'Kết quả / Uống thuốc',
          row2Label: 'Khỏi bệnh',
          intervals: ['M', 'N'],
          frequencies: [m1, n1],
          extraRows: [{ label: 'Không khỏi bệnh', values: [m2, n2] }],
        },
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tổng số bệnh nhân khỏi bệnh là $' + m1 + ' + ' + n1 + ' = ' + totCured + '$, trong đó có $' + m1 + '$ người dùng thuốc $M$.',
          'Xác suất cần tìm là $P = \\dfrac{' + m1 + '}{' + totCured + '} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên số liệu nhỏ', params: { m1: 50, n1: 50, m2: 100, n2: 100 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29', params: { m1: 710, n1: 379, m2: 642, n2: 269 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Lấy 1 bi rồi lấy 2 bi (tính xác suất bạn 1 lấy bi vàng biết bạn 2 lấy ít nhất 1 bi vàng)
  t12_b18_d30_bayes_balls_1_then_2_sa: {
    id: 't12_b18_d30_bayes_balls_1_then_2_sa',
    name: 'Tính xác suất hậu nghiệm bài toán lấy 1 bi rồi lấy 2 bi (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Công thức Bayes trong bài toán lấy bi liên tiếp',
    description:
      'Hộp có p bi tím và y bi vàng. Phúc lấy 1 bi không hoàn lại, Vy lấy 2 bi. Biết Vy lấy được ít nhất 1 bi vàng, tính xác suất Phúc đã lấy bi vàng.',
    conditionSummary: 'p >= 4, y >= 4; tránh biên .xx5',
    paramSpecs: [
      { name: 'p', label: 'Số bi tím', min: 5, max: 13 },
      { name: 'y', label: 'Số bi vàng', min: 5, max: 13 },
    ],
    validateCode: `
      const { p, y } = params;
      if (p < 4 || y < 4) return { valid: false, reason: 'Số bi mỗi màu phải >= 4' };
      const N = p + y;
      const cP2 = (p * (p - 1)) / 2;
      const cN1_2 = ((N - 1) * (N - 2)) / 2;
      const cN_2 = (N * (N - 1)) / 2;
      const pAB = (y * (cN1_2 - cP2)) / (N * cN1_2);
      const pB = (cN_2 - cP2) / cN_2;
      const val = pAB / pB;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p, y } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const N = p + y;
      const cP2 = comb(p, 2);
      const cP1_2 = comb(p - 1, 2);
      const cN1_2 = comb(N - 1, 2);
      const cN_2 = comb(N, 2);
      const pA = u.simplifyFrac(y, N);
      const pNA = u.simplifyFrac(p, N);
      const pBGivenA = u.simplifyFrac(cN1_2 - cP2, cN1_2);
      const pBGivenNA = u.simplifyFrac(cN1_2 - cP1_2, cN1_2);
      const pB = u.simplifyFrac(cN_2 - cP2, cN_2);
      const ansFrac = u.simplifyFrac(y * (cN1_2 - cP2) * cN_2, N * cN1_2 * (cN_2 - cP2));
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một hộp có chứa $' +
          p +
          '$ viên bi màu tím và $' +
          y +
          '$ viên bi màu vàng (các viên bi có cùng kích thước và khối lượng, được đánh số khác nhau). Bạn Phúc lấy ngẫu nhiên $1$ viên bi từ trong hộp và không hoàn lại, tiếp đó bạn Vy lấy ngẫu nhiên $2$ viên bi từ trong hộp. Biết rằng bạn Vy lấy được ít nhất một viên bi màu vàng, tính xác suất bạn Phúc lấy được một viên bi màu vàng (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$ là biến cố "Phúc lấy được $1$ viên bi màu vàng" ($P(A) = ' + pA.latex + '$, $P(\\overline{A}) = ' + pNA.latex + '$), $B$ là biến cố "Vy lấy được ít nhất một viên bi màu vàng".',
          'Nếu $A$ xảy ra thì còn $' + p + '$ tím, $' + (y - 1) + '$ vàng: $P(B|A) = 1 - \\dfrac{C_{' + p + '}^2}{C_{' + (N - 1) + '}^2} = ' + pBGivenA.latex + '$.',
          'Nếu $\\overline{A}$ xảy ra thì còn $' + (p - 1) + '$ tím, $' + y + '$ vàng: $P(B|\\overline{A}) = 1 - \\dfrac{C_{' + (p - 1) + '}^2}{C_{' + (N - 1) + '}^2} = ' + pBGivenNA.latex + '$.',
          'Ta có $P(B) = 1 - \\dfrac{C_{' + p + '}^2}{C_{' + N + '}^2} = ' + pB.latex + '$. Theo công thức Bayes: $P(A|B) = \\dfrac{P(A)P(B|A)}{P(B)} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên số bi quá ít', params: { p: 2, y: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30', params: { p: 9, y: 9 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Khảo sát việc làm sinh viên sau tốt nghiệp (công thức nhân với nhánh \overline{G})
  t12_b18_d31_grad_employment_mult_sa: {
    id: 't12_b18_d31_grad_employment_mult_sa',
    name: 'Tính xác suất sinh viên không loại giỏi có việc làm đúng chuyên ngành',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất trong thực tế',
    description:
      'Tỉ lệ sinh viên tốt nghiệp loại giỏi là pG%, có việc đúng chuyên ngành của loại giỏi là pDG% và loại khác là pDK%. Tính P(\\overline{G} ∩ D).',
    conditionSummary: 'pG ∈ [10; 45], pDG ∈ [70; 96], pDK ∈ [30; 80], tránh biên .xx5',
    paramSpecs: [
      { name: 'pG', label: 'Tỉ lệ loại giỏi (%)', min: 12, max: 40 },
      { name: 'pDG', label: 'Đúng ngành (Giỏi, %)', min: 75, max: 96 },
      { name: 'pDK', label: 'Đúng ngành (Khác, %)', min: 35, max: 80 },
    ],
    validateCode: `
      const { pG, pDG, pDK } = params;
      if (pG < 10 || pG > 50 || pDG <= pDK || pDK < 20) {
        return { valid: false, reason: 'Cần tỉ lệ giỏi <= 50% và tỉ lệ đúng ngành loại giỏi > loại khác' };
      }
      const val = ((100 - pG) * pDK) / 10000;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pG, pDG, pDK } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const pK = 100 - pG;
      const ans = (pK * pDK) / 10000;
      const ansR = round2(ans);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một trường đại học tiến hành khảo sát tình trạng việc làm sau khi tốt nghiệp của sinh viên. Kết quả khảo sát cho thấy tỉ lệ người tìm được việc làm đúng chuyên ngành là $' +
          pDG +
          '\\%$ đối với sinh viên tốt nghiệp loại giỏi và $' +
          pDK +
          '\\%$ đối với sinh viên tốt nghiệp loại khác. Tỉ lệ sinh viên tốt nghiệp loại giỏi là $' +
          pG +
          '\\%$. Chọn ngẫu nhiên một sinh viên đã tốt nghiệp của trường. Tính xác suất sinh viên đó không tốt nghiệp loại giỏi và được việc làm đúng chuyên ngành (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $G$ là biến cố "Sinh viên tốt nghiệp loại giỏi", $K = \\overline{G}$ là biến cố "Sinh viên tốt nghiệp loại khác", $D$ là biến cố "Được việc làm đúng chuyên ngành".',
          'Ta có $P(K) = 1 - P(G) = 1 - ' + fmtDec2(pG / 100) + ' = ' + fmtDec2(pK / 100) + '$ và $P(D|K) = ' + fmtDec2(pDK / 100) + '$.',
          'Xác suất cần tìm là $P(KD) = P(K) \\cdot P(D|K) = ' + fmtDec2(pK / 100) + ' \\cdot ' + fmtDec2(pDK / 100) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên pDG <= pDK', params: { pG: 20, pDG: 50, pDK: 60 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31', params: { pG: 22, pDG: 93, pDK: 58 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Bạn 1 lấy 1 bi đỏ, bạn 2 lấy 1 xanh và 1 đỏ
  t12_b18_d32_draw1_red_then_1green1red_sa: {
    id: 't12_b18_d32_draw1_red_then_1green1red_sa',
    name: 'Tính xác suất bạn 1 lấy bi đỏ và bạn 2 lấy 1 bi xanh, 1 bi đỏ',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức nhân xác suất trong bài toán lấy bi',
    description:
      'Hộp có g bi xanh và r bi đỏ. Thảo lấy 1 bi không hoàn lại, Phương lấy 2 bi. Tính xác suất Thảo lấy bi đỏ và Phương lấy 1 xanh, 1 đỏ.',
    conditionSummary: 'g >= 3, r >= 3; tránh biên .xx5',
    paramSpecs: [
      { name: 'g', label: 'Số bi xanh', min: 4, max: 14 },
      { name: 'r', label: 'Số bi đỏ', min: 4, max: 14 },
    ],
    validateCode: `
      const { g, r } = params;
      if (g < 3 || r < 3) return { valid: false, reason: 'Số bi xanh và đỏ phải >= 3' };
      const N = g + r;
      const val = (r * 2 * g * (r - 1)) / (N * (N - 1) * (N - 2));
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { g, r } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const N = g + r;
      const numWays = g * (r - 1);
      const tot2Ways = comb(N - 1, 2);
      const p1 = u.simplifyFrac(r, N);
      const p2 = u.simplifyFrac(numWays, tot2Ways);
      const ansFrac = u.simplifyFrac(r * numWays, N * tot2Ways);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Một hộp có chứa $' +
          g +
          '$ viên bi màu xanh và $' +
          r +
          '$ viên bi màu đỏ (các viên bi có cùng kích thước và khối lượng, được đánh số khác nhau). Bạn Thảo lấy ngẫu nhiên $1$ viên bi từ trong hộp và không hoàn lại, tiếp đó bạn Phương lấy ngẫu nhiên $2$ viên bi từ trong hộp. Tính xác suất để bạn Thảo lấy được $1$ viên bi màu đỏ và bạn Phương lấy được $1$ viên bi màu xanh và $1$ viên bi màu đỏ (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Xác suất để Thảo lấy được $1$ viên bi màu đỏ là $P_1 = \\dfrac{' + r + '}{' + N + '} = ' + p1.latex + '$.',
          'Sau khi Thảo lấy $1$ bi đỏ, trong hộp còn $' + g + '$ bi xanh và $' + (r - 1) + '$ bi đỏ (tổng $' + (N - 1) + '$ viên bi).',
          'Xác suất Phương lấy được $1$ xanh và $1$ đỏ là $P_2 = \\dfrac{C_{' + g + '}^1 \\cdot C_{' + (r - 1) + '}^1}{C_{' + (N - 1) + '}^2} = \\dfrac{' + numWays + '}{' + tot2Ways + '} = ' + p2.latex + '$.',
          'Vậy xác suất cần tìm là $P = P_1 \\cdot P_2 = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên g < 3', params: { g: 2, r: 7 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32', params: { g: 10, r: 7 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Hệ phương trình P(A|\overline{B}), P(B|\overline{A}), P(AB) -> giá thịt lợn và gạo
  t12_b18_d33_cond_system_union_goods_sa: {
    id: 't12_b18_d33_cond_system_union_goods_sa',
    name: 'Lập hệ phương trình xác suất tìm P(A ∪ B) — bài toán giá hàng hóa',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hệ phương trình xác suất có điều kiện',
    description:
      'Biết xác suất thịt lợn giảm giá khi gạo không giảm, xác suất gạo giảm khi thịt lợn không giảm và xác suất cả hai cùng giảm. Tính xác suất có ít nhất một mặt hàng giảm giá.',
    conditionSummary: '0 < p1/q1 < 1, 0 < p2/q2 < 1, gcd = 1, c ∈ [0,12; 0,40]; tránh biên .xx5',
    paramSpecs: [
      { name: 'p1', label: 'Tử số P(A|B\')', min: 1, max: 5 },
      { name: 'q1', label: 'Mẫu số P(A|B\')', min: 2, max: 8 },
      { name: 'p2', label: 'Tử số P(B|A\')', min: 1, max: 5 },
      { name: 'q2', label: 'Mẫu số P(B|A\')', min: 4, max: 10 },
      { name: 'cInt', label: '100*P(AB)', min: 12, max: 35 },
    ],
    validateCode: `
      const { p1, q1, p2, q2, cInt } = params;
      if (p1 <= 0 || p1 >= q1 || p2 <= 0 || p2 >= q2 || u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) {
        return { valid: false, reason: 'Phân số xác suất điều kiện phải tối giản và thuộc (0; 1)' };
      }
      if (cInt < 10 || cInt > 45) return { valid: false, reason: 'P(AB) ngoài miền hợp lý' };
      const a = p1 / q1, b = p2 / q2, c = cInt / 100;
      const pUnion = 1 - ((1 - a) * (1 - b) * (1 - c)) / (1 - a * b);
      if (Math.abs(((pUnion * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, q1, p2, q2, cInt } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const cFrac = u.simplifyFrac(cInt, 100);
      const aFrac = u.simplifyFrac(p1, q1);
      const bFrac = u.simplifyFrac(p2, q2);
      // Exact rational solve for P(A), P(B), P(A U B)
      const denCommon = q1 * q2 - p1 * p2;
      const pANum = cInt * (q1 - p1) * q2 + 100 * p1 * (q2 - p2);
      const pADen = 100 * denCommon;
      const pBNum = cInt * (q2 - p2) * q1 + 100 * p2 * (q1 - p1);
      const pBDen = 100 * denCommon;
      const pAFrac = u.simplifyFrac(pANum, pADen);
      const pBFrac = u.simplifyFrac(pBNum, pBDen);
      const pUnionNum = 100 * denCommon - (100 - cInt) * (q1 - p1) * (q2 - p2);
      const pUnionFrac = u.simplifyFrac(pUnionNum, 100 * denCommon);
      const ansR = round2(pUnionFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Quan sát hai hàng hoá thịt lợn và gạo, người ta nhận thấy trong mỗi ngày giao dịch, nếu gạo không giảm giá thì thịt lợn giảm giá với xác suất $' +
          aFrac.latex +
          '$. Ngược lại, nếu thịt lợn không giảm giá thì gạo giảm giá với xác suất $' +
          bFrac.latex +
          '$. Hơn nữa, xác suất để cả thịt lợn và gạo giảm giá trong cùng một ngày là $' +
          fmtDec2(cInt / 100) +
          '$. Tính xác suất để có ít nhất một trong hai hàng hoá thịt lợn và gạo giảm giá trong một ngày giao dịch (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Thịt lợn giảm giá", $B$: "Gạo giảm giá". Ta có $P(A|\\overline{B}) = ' + aFrac.latex + '$, $P(B|\\overline{A}) = ' + bFrac.latex + '$ và $P(AB) = ' + cFrac.latex + '$.',
          'Vì $P(A) = P(AB) + P(A|\\overline{B})(1 - P(B))$ và $P(B) = P(AB) + P(B|\\overline{A})(1 - P(A))$, ta có hệ:',
          '$\\left\\{\\begin{array}{l} P(A) + ' + aFrac.latex + ' P(B) = ' + cFrac.latex + ' + ' + aFrac.latex + ' \\\\ P(B) + ' + bFrac.latex + ' P(A) = ' + cFrac.latex + ' + ' + bFrac.latex + ' \\end{array}\\right. \\Rightarrow \\left\\{\\begin{array}{l} P(A) = ' + pAFrac.latex + ' \\\\ P(B) = ' + pBFrac.latex + ' \\end{array}\\right.$.',
          'Vậy xác suất cần tìm là $P(A \\cup B) = P(A) + P(B) - P(AB) = ' + pAFrac.latex + ' + ' + pBFrac.latex + ' - ' + cFrac.latex + ' = ' + pUnionFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên phân số >= 1', params: { p1: 5, q1: 4, p2: 1, q2: 5, cInt: 22 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33', params: { p1: 1, q1: 2, p2: 1, q2: 9, cInt: 22 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Hệ phương trình xác suất P(A|\overline{B}), P(B|\overline{A}), P(AB) -> khẩu trang & vaccine
  t12_b18_d34_cond_system_union_pandemic_sa: {
    id: 't12_b18_d34_cond_system_union_pandemic_sa',
    name: 'Lập hệ phương trình xác suất tìm P(A ∪ B) — bài toán phòng dịch',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hệ phương trình xác suất có điều kiện',
    description:
      'Khảo sát ý thức phòng dịch (tiêm vaccine và đeo khẩu trang): biết P(A|\\overline{B}), P(B|\\overline{A}) và P(AB). Tính xác suất có ít nhất một biện pháp.',
    conditionSummary: '0 < p1/q1 < 1, 0 < p2/q2 < 1, gcd = 1, c ∈ [0,15; 0,40]; tránh biên .xx5',
    paramSpecs: [
      { name: 'p1', label: 'Tử số P(A|B\')', min: 2, max: 5 },
      { name: 'q1', label: 'Mẫu số P(A|B\')', min: 6, max: 9 },
      { name: 'p2', label: 'Tử số P(B|A\')', min: 2, max: 5 },
      { name: 'q2', label: 'Mẫu số P(B|A\')', min: 6, max: 9 },
      { name: 'cInt', label: '100*P(AB)', min: 15, max: 38 },
    ],
    validateCode: `
      const { p1, q1, p2, q2, cInt } = params;
      if (p1 <= 0 || p1 >= q1 || p2 <= 0 || p2 >= q2 || u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) {
        return { valid: false, reason: 'Phân số xác suất điều kiện phải tối giản và thuộc (0; 1)' };
      }
      if (cInt < 10 || cInt > 45) return { valid: false, reason: 'P(AB) ngoài miền' };
      const a = p1 / q1, b = p2 / q2, c = cInt / 100;
      const pUnion = 1 - ((1 - a) * (1 - b) * (1 - c)) / (1 - a * b);
      if (Math.abs(((pUnion * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, q1, p2, q2, cInt } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const cFrac = u.simplifyFrac(cInt, 100);
      const aFrac = u.simplifyFrac(p1, q1);
      const bFrac = u.simplifyFrac(p2, q2);
      const denCommon = q1 * q2 - p1 * p2;
      const pAFrac = u.simplifyFrac(cInt * (q1 - p1) * q2 + 100 * p1 * (q2 - p2), 100 * denCommon);
      const pBFrac = u.simplifyFrac(cInt * (q2 - p2) * q1 + 100 * p2 * (q1 - p1), 100 * denCommon);
      const pUnionNum = 100 * denCommon - (100 - cInt) * (q1 - p1) * (q2 - p2);
      const pUnionFrac = u.simplifyFrac(pUnionNum, 100 * denCommon);
      const ansR = round2(pUnionFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Trong một cuộc khảo sát về ý thức phòng dịch, người ta thấy rằng: nếu một người không đeo khẩu trang thì xác suất người đó đã tiêm vaccine là $' +
          aFrac.latex +
          '$; nếu một người không tiêm vaccine thì xác suất người đó đeo khẩu trang là $' +
          bFrac.latex +
          '$ và xác suất để một người vừa tiêm vaccine và vừa đeo khẩu trang là $' +
          fmtDec2(cInt / 100) +
          '$. Tính xác suất để người đó có ít nhất một trong hai biện pháp phòng dịch (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Người đó đã tiêm vaccine", $B$: "Người đó đeo khẩu trang". Ta có $P(A|\\overline{B}) = ' + aFrac.latex + '$, $P(B|\\overline{A}) = ' + bFrac.latex + '$ và $P(AB) = ' + cFrac.latex + '$.',
          'Từ $P(A) = P(AB) + P(A|\\overline{B})(1 - P(B))$ và $P(B) = P(AB) + P(B|\\overline{A})(1 - P(A))$, giải hệ phương trình tuyến tính được $P(A) = ' + pAFrac.latex + '$ và $P(B) = ' + pBFrac.latex + '$.',
          'Vậy xác suất có ít nhất một biện pháp phòng dịch là $P(A \\cup B) = P(A) + P(B) - P(AB) = ' + pAFrac.latex + ' + ' + pBFrac.latex + ' - ' + cFrac.latex + ' = ' + pUnionFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên không tối giản', params: { p1: 2, q1: 4, p2: 5, q2: 6, cInt: 27 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34', params: { p1: 5, q1: 8, p2: 5, q2: 6, cInt: 27 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Hệ phương trình xác suất P(A|\overline{B}), P(B|\overline{A}), P(AB) -> bóng bàn & cầu lông
  t12_b18_d35_cond_system_union_sports_sa: {
    id: 't12_b18_d35_cond_system_union_sports_sa',
    name: 'Lập hệ phương trình xác suất tìm P(A ∪ B) — nhóm học sinh chơi thể thao',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hệ phương trình xác suất có điều kiện',
    description:
      'Trong nhóm học sinh: biết xác suất chơi cầu lông khi không chơi bóng bàn, xác suất chơi bóng bàn khi không chơi cầu lông và xác suất chơi cả hai môn. Tính xác suất chơi ít nhất một môn.',
    conditionSummary: '0 < p1/q1 < 1, 0 < p2/q2 < 1, gcd = 1, c ∈ [0,12; 0,40]; tránh biên .xx5',
    paramSpecs: [
      { name: 'p1', label: 'Tử số P(A|B\')', min: 1, max: 5 },
      { name: 'q1', label: 'Mẫu số P(A|B\')', min: 3, max: 8 },
      { name: 'p2', label: 'Tử số P(B|A\')', min: 1, max: 4 },
      { name: 'q2', label: 'Mẫu số P(B|A\')', min: 3, max: 8 },
      { name: 'cInt', label: '100*P(AB)', min: 14, max: 35 },
    ],
    validateCode: `
      const { p1, q1, p2, q2, cInt } = params;
      if (p1 <= 0 || p1 >= q1 || p2 <= 0 || p2 >= q2 || u.gcd(p1, q1) !== 1 || u.gcd(p2, q2) !== 1) {
        return { valid: false, reason: 'Phân số xác suất điều kiện phải tối giản và thuộc (0; 1)' };
      }
      if (cInt < 10 || cInt > 45) return { valid: false, reason: 'P(AB) ngoài miền' };
      const a = p1 / q1, b = p2 / q2, c = cInt / 100;
      const pUnion = 1 - ((1 - a) * (1 - b) * (1 - c)) / (1 - a * b);
      if (Math.abs(((pUnion * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1, q1, p2, q2, cInt } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const cFrac = u.simplifyFrac(cInt, 100);
      const aFrac = u.simplifyFrac(p1, q1);
      const bFrac = u.simplifyFrac(p2, q2);
      const denCommon = q1 * q2 - p1 * p2;
      const pAFrac = u.simplifyFrac(cInt * (q1 - p1) * q2 + 100 * p1 * (q2 - p2), 100 * denCommon);
      const pBFrac = u.simplifyFrac(cInt * (q2 - p2) * q1 + 100 * p2 * (q1 - p1), 100 * denCommon);
      const pUnionNum = 100 * denCommon - (100 - cInt) * (q1 - p1) * (q2 - p2);
      const pUnionFrac = u.simplifyFrac(pUnionNum, 100 * denCommon);
      const ansR = round2(pUnionFrac.value);
      const shortAnswer = fmtDec2(ansR);
      return {
        stem:
          'Trong một nhóm học sinh, người ta thấy rằng: nếu một học sinh không chơi bóng bàn thì xác suất học sinh đó chơi cầu lông là $' +
          aFrac.latex +
          '$; nếu một học sinh không chơi cầu lông thì xác suất học sinh đó chơi bóng bàn là $' +
          bFrac.latex +
          '$ và xác suất để một học sinh vừa chơi bóng bàn vừa chơi cầu lông là $' +
          fmtDec2(cInt / 100) +
          '$. Tính xác suất để học sinh đó tham gia ít nhất một trong hai môn thể thao trên (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Học sinh chơi cầu lông", $B$: "Học sinh chơi bóng bàn". Ta có $P(A|\\overline{B}) = ' + aFrac.latex + '$, $P(B|\\overline{A}) = ' + bFrac.latex + '$ và $P(AB) = ' + cFrac.latex + '$.',
          'Từ hệ phương trình $\\left\\{\\begin{array}{l} P(A) + ' + aFrac.latex + ' P(B) = ' + cFrac.latex + ' + ' + aFrac.latex + ' \\\\ P(B) + ' + bFrac.latex + ' P(A) = ' + cFrac.latex + ' + ' + bFrac.latex + ' \\end{array}\\right.$, suy ra $P(A) = ' + pAFrac.latex + '$ và $P(B) = ' + pBFrac.latex + '$.',
          'Vậy xác suất tham gia ít nhất một môn là $P(A \\cup B) = P(A) + P(B) - P(AB) = ' + pAFrac.latex + ' + ' + pBFrac.latex + ' - ' + cFrac.latex + ' = ' + pUnionFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p2 >= q2', params: { p1: 3, q1: 4, p2: 5, q2: 5, cInt: 22 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35', params: { p1: 3, q1: 4, p2: 1, q2: 5, cInt: 22 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Kỳ thi 2 vòng — biết bị loại tính xác suất qua vòng 1 trượt vòng 2
  t12_b18_d36_two_round_exam_elim_sa: {
    id: 't12_b18_d36_two_round_exam_elim_sa',
    name: 'Xác suất qua vòng 1 nhưng trượt vòng 2 khi biết thí sinh bị loại',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Xác suất có điều kiện trong bài toán hai giai đoạn',
    description:
      'Kỳ thi gồm hai vòng. Xác suất qua vòng 1 là p1, nếu qua vòng 1 xác suất qua vòng 2 là p2. Biết thí sinh bị loại, tính xác suất qua vòng 1 nhưng không qua vòng 2.',
    conditionSummary: 'p1, p2 ∈ [0,50; 0,92]; tránh biên .xx5',
    paramSpecs: [
      { name: 'p1Int', label: '100*P(vòng 1)', min: 55, max: 90 },
      { name: 'p2Int', label: '100*P(vòng 2 | vòng 1)', min: 55, max: 90 },
    ],
    validateCode: `
      const { p1Int, p2Int } = params;
      if (p1Int < 40 || p1Int > 95 || p2Int < 40 || p2Int > 95) return { valid: false, reason: 'Xác suất qua vòng ngoài miền' };
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const pFail2Only = p1 * (1 - p2);
      const pElim = 1 - p1 * p2;
      const val = pFail2Only / pElim;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p1Int, p2Int } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const p1 = p1Int / 100, p2 = p2Int / 100;
      const pPass1Fail2 = p1 * (1 - p2);
      const pElim = 1 - p1 * p2;
      const ansFrac = u.simplifyFrac(p1Int * (100 - p2Int), 10000 - p1Int * p2Int);
      const ansR = round2(ansFrac.value);
      const shortAnswer = fmtDec2(ansR);
      const fmtDec4 = (v) => String(Number(v.toFixed(4))).replace('.', ',');
      return {
        stem:
          'Một kỳ thi có hai vòng. Thí sinh đỗ nếu vượt qua được cả hai vòng. Bạn Lan tham dự kỳ thi này. Xác suất để Lan qua được vòng 1 là $' +
          fmtDec2(p1) +
          '$. Nếu qua được vòng 1 thì xác suất để Lan qua được vòng 2 là $' +
          fmtDec2(p2) +
          '$. Lan được thông báo là bị loại. Tính xác suất để Lan qua được vòng 1 nhưng không qua được vòng 2 (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Lan qua vòng 1", $B$: "Lan qua vòng 2". Ta có $P(A) = ' + fmtDec2(p1) + '$ và $P(B|A) = ' + fmtDec2(p2) + '$.',
          'Xác suất Lan qua vòng 1 nhưng trượt vòng 2 là $P(A\\overline{B}) = ' + fmtDec2(p1) + ' \\cdot (1 - ' + fmtDec2(p2) + ') = ' + fmtDec4(pPass1Fail2) + '$.',
          'Xác suất Lan bị loại là $P(\\text{trượt}) = 1 - P(AB) = 1 - ' + fmtDec2(p1) + ' \\cdot ' + fmtDec2(p2) + ' = ' + fmtDec4(pElim) + '$.',
          'Vậy xác suất cần tìm là $P(A\\overline{B}|\\text{trượt}) = \\dfrac{' + fmtDec4(pPass1Fail2) + '}{' + fmtDec4(pElim) + '} = ' + ansFrac.latex + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên p1 quá thấp', params: { p1Int: 20, p2Int: 80 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36', params: { p1Int: 83, p2Int: 82 }, expectedValid: true },
    ],
  },

  // D37 (Q37): Tính P(A \cup B) biết P(A), P(B), P(B|A) (xem phim buổi tối)
  t12_b18_d37_watch_movie_union_sa: {
    id: 't12_b18_d37_watch_movie_union_sa',
    name: 'Tính xác suất P(A ∪ B) từ P(A), P(B) và P(B|A)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Công thức cộng và nhân xác suất',
    description:
      'Biết xác suất Nam xem phim P(A), em gái xem phim P(B) và P(B|A). Tính xác suất ít nhất một trong hai người xem phim.',
    conditionSummary: 'P(A)P(B|A) < P(B) và P(A) + P(B) - P(AB) < 1; tránh biên .xx5',
    paramSpecs: [
      { name: 'pAInt', label: '100*P(A)', min: 35, max: 80 },
      { name: 'pBInt', label: '100*P(B)', min: 40, max: 85 },
      { name: 'pBAInt', label: '100*P(B|A)', min: 50, max: 95 },
    ],
    validateCode: `
      const { pAInt, pBInt, pBAInt } = params;
      const pA = pAInt / 100, pB = pBInt / 100, pBA = pBAInt / 100;
      const pAB = pA * pBA;
      if (pAB >= pB - 0.02 || pA + pB - pAB >= 0.99) {
        return { valid: false, reason: 'Cần P(AB) < P(B) và P(A ∪ B) < 1' };
      }
      const val = pA + pB - pAB;
      if (Math.abs(((val * 100) % 1) - 0.5) < 0.005) return { valid: false, reason: 'Tránh ranh giới .xx5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pAInt, pBInt, pBAInt } = params;
      ` + PROB_SA_HELPERS + String.raw`
      const pA = pAInt / 100, pB = pBInt / 100, pBA = pBAInt / 100;
      const pAB = pA * pBA;
      const pUnion = pA + pB - pAB;
      const ansR = round2(pUnion);
      const shortAnswer = fmtDec2(ansR);
      const fmtDec3 = (v) => String(Number(v.toFixed(4))).replace('.', ',');
      const pBAStr = pBAInt % 10 === 0 ? (pBAInt / 100).toFixed(1).replace('.', ',') : fmtDec2(pBA);
      return {
        stem:
          'Trong một ngày bất kì, xác suất để bạn Nam xem phim buổi tối là $' +
          fmtDec2(pA) +
          '$ và em gái của Nam xem phim buổi tối là $' +
          fmtDec2(pB) +
          '$. Biết rằng xác suất em gái của Nam xem phim buổi tối khi Nam xem phim buổi tối là $' +
          pBAStr +
          '$. Tính xác suất để ít nhất một trong hai người xem phim buổi tối (kết quả làm tròn đến hàng phần trăm).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Gọi $A$: "Nam xem phim buổi tối", $B$: "Em gái của Nam xem phim buổi tối". Ta có $P(A) = ' + fmtDec2(pA) + '$, $P(B) = ' + fmtDec2(pB) + '$, $P(B|A) = ' + pBAStr + '$.',
          'Suy ra $P(A \\cap B) = P(A) \\cdot P(B|A) = ' + fmtDec2(pA) + ' \\cdot ' + pBAStr + ' = ' + fmtDec3(pAB) + '$.',
          'Xác suất cần tìm là $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = ' + fmtDec2(pA) + ' + ' + fmtDec2(pB) + ' - ' + fmtDec3(pAB) + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên P(AB) >= P(B)', params: { pAInt: 80, pBInt: 50, pBAInt: 80 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37', params: { pAInt: 68, pBInt: 71, pBAInt: 90 }, expectedValid: true },
    ],
  },
};
