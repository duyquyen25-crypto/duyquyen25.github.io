import { MathTemplate } from '../types/math';

export const G12_B5_TEMPLATES_PART1: Record<string, MathTemplate> = {
  // =====================================================================
  // PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (4 DẠNG: DẠNG 1 -> DẠNG 4)
  // =====================================================================

  // Dạng 1 (Q1)
  t12_b5_d01_marginal_cost_mc: {
    id: 't12_b5_d01_marginal_cost_mc',
    name: 'Tìm hàm chi phí biên C\'(x) từ hàm chi phí bậc hai',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ứng dụng đạo hàm trong kinh tế',
    description:
      'Cho hàm chi phí sản xuất bậc hai C(x) = a·x² + b·x + c (a > 0). Xác định hàm chi phí biên C\'(x).',
    conditionSummary: 'k ∈ [20; 120] (a = 0,001·k > 0), b ∈ [10; 120], c ∈ [200; 5000]',
    paramSpecs: [
      { name: 'k', label: 'Hệ số a·1000', min: 30, max: 95 },
      { name: 'b', label: 'Hệ số b', min: 20, max: 90 },
      { name: 'c', label: 'Chi phí cố định c', min: 500, max: 3500, step: 17 },
    ],
    validateCode: `
      const { k, b, c } = params;
      if (k <= 0 || k > 500) return { valid: false, reason: 'Hệ số bậc hai phải dương và k ≤ 500' };
      if (b <= 0 || b > 500) return { valid: false, reason: 'Hệ số b phải dương và b ≤ 500' };
      if (c <= 0 || c > 20000) return { valid: false, reason: 'Chi phí cố định c phải dương và c ≤ 20000' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, b, c } = params;
      const a = Number((k * 0.001).toFixed(3));
      const twoA = Number((2 * a).toFixed(3));
      const aStr = u.formatNumberVN(a, 3);
      const twoAStr = u.formatNumberVN(twoA, 3);
      const costExpr = aStr + 'x^2 + ' + b + 'x + ' + c;
      const correct = "$C'(x) = " + twoAStr + 'x + ' + b + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [
          "$C'(x) = " + aStr + 'x + ' + c + '$',
          "$C'(x) = " + aStr + 'x^2 + ' + b + 'x$',
          "$C'(x) = " + aStr + 'x^2 + ' + b + '$',
        ],
        rng,
        (step) => "$C'(x) = " + twoAStr + 'x + ' + (b + step * 3) + '$'
      );
      return {
        stem: 'Giả sử chi phí để sản xuất $x$ đơn vị hàng hóa $Z$ là $C(x) = ' + costExpr + '$. Khi đó hàm chi phí biên tương ứng là:',
        options,
        correctIndex,
        answerSummary: "C'(x) = " + twoAStr + 'x + ' + b,
        solutionSteps: [
          'Hàm chi phí biên là đạo hàm bậc nhất của hàm chi phí $C(x)$.',
          "Ta có $C'(x) = (" + costExpr + ")' = " + twoAStr + 'x + ' + b + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên suy biến k = 0 (mất bậc hai)', params: { k: 0, b: 61, c: 2382 }, expectedValid: false },
      { label: 'Biên c = 0 (không hợp lệ)', params: { k: 78, b: 61, c: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc k = 78, b = 61, c = 2382', params: { k: 78, b: 61, c: 2382 }, expectedValid: true },
    ],
  },

  // Dạng 2 (Q2)
  t12_b5_d02_bacteria_max_time_mc: {
    id: 't12_b5_d02_bacteria_max_time_mc',
    name: 'Tìm thời điểm (giây) số lượng vi khuẩn đạt cực đại (hàm bậc ba)',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Bài toán cực đại thực tiễn (Sinh học)',
    description:
      'Số vi khuẩn theo thời gian t (phút) là N(t) = N0 + b·t² - c·t³ trên [0; T]. Tìm thời gian (đổi ra giây) để số vi khuẩn lớn nhất.',
    conditionSummary: 'c ∈ [2; 8], t0 ∈ [5; 22], (3·c·t0) chẵn để b = 3·c·t0/2 nguyên, T > t0',
    paramSpecs: [
      { name: 'n0', label: 'Số vi khuẩn ban đầu', min: 100000, max: 300000, step: 1357 },
      { name: 'c', label: 'Hệ số c của t³', min: 2, max: 6 },
      { name: 't0', label: 'Thời điểm cực đại (phút)', min: 6, max: 20 },
      { name: 'extra', label: 'Khoảng dư T - t0', min: 6, max: 18 },
    ],
    validateCode: `
      const { n0, c, t0, extra } = params;
      if (n0 <= 0 || n0 > 1000000) return { valid: false, reason: 'Số vi khuẩn ban đầu không hợp lệ' };
      if (c <= 0 || c > 20) return { valid: false, reason: 'Hệ số c phải thuộc [1; 20]' };
      if (t0 < 2 || t0 > 40) return { valid: false, reason: 'Thời điểm t0 phải thuộc [2; 40] phút' };
      if (extra < 1 || extra > 40) return { valid: false, reason: 'Khoảng dư T - t0 phải dương và ≤ 40' };
      if ((3 * c * t0) % 2 !== 0) return { valid: false, reason: 'Cần 3·c·t0 chẵn để hệ số b nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n0, c, t0, extra } = params;
      const b = (3 * c * t0) / 2;
      const T = t0 + extra;
      const twoB = 2 * b;
      const threeC = 3 * c;
      const secAns = t0 * 60;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + secAns + '$',
        ['$' + ((t0 + 4) * 60) + '$', '$' + ((t0 + 1) * 60) + '$', '$' + Math.max(60, (t0 - 1) * 60) + '$'],
        rng,
        (step) => '$' + ((t0 + step * 2) * 60) + '$'
      );
      return {
        stem:
          'Một loại vi khuẩn được tiêm một loại thuốc kích thích sự sinh sản. Sau $t$ phút, số vi khuẩn được xác định theo công thức $N(t) = ' +
          n0 +
          ' + ' +
          b +
          't^2 - ' +
          c +
          't^3$ ($0 \\le t \\le ' +
          T +
          '$). Hỏi sau bao nhiêu giây thì số vi khuẩn lớn nhất?',
        options,
        correctIndex,
        answerSummary: secAns + ' giây',
        solutionSteps: [
          "Ta có $N'(t) = " + twoB + 't - ' + threeC + 't^2 = t(' + twoB + ' - ' + threeC + 't)$.',
          "Giải $N'(t) = 0 \\Leftrightarrow t = 0$ hoặc $t = \\frac{" + twoB + '}{' + threeC + '} = ' + t0 + '$ (thuộc $[0;\\, ' + T + ']$).',
          "Với $0 < t < " + t0 + "$ thì $N'(t) > 0$; với $" + t0 + " < t \\le " + T + "$ thì $N'(t) < 0$. Do đó $N(t)$ đạt giá trị lớn nhất tại $t = " + t0 + "$ phút.",
          'Đổi ra giây: $t = ' + t0 + ' \\cdot 60 = ' + secAns + '$ (giây).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b không nguyên (c lẻ, t0 lẻ)', params: { n0: 200000, c: 3, t0: 7, extra: 10 }, expectedValid: false },
      { label: 'Biên T ≤ t0 (extra = 0)', params: { n0: 200000, c: 4, t0: 14, extra: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (t0 = 14 phút = 840 giây)', params: { n0: 217737, c: 4, t0: 14, extra: 16 }, expectedValid: true },
    ],
  },

  // Dạng 3 (Q3)
  t12_b5_d03_vertical_throw_vel_mc: {
    id: 't12_b5_d03_vertical_throw_vel_mc',
    name: 'Tính vận tốc tức thời của vật ném thẳng đứng lên trên',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ý nghĩa cơ học của đạo hàm',
    description:
      'Vật phóng thẳng đứng với độ cao h(t) = v0·t - 4,9·t². Tính vận tốc v(t0) = h\'(t0) tại thời điểm t0.',
    conditionSummary: 'v0 ∈ [50; 120], t0 ∈ [2; 10] thỏa mãn v(t0) = v0 - 9,8·t0 > 2',
    paramSpecs: [
      { name: 'v10', label: 'Vận tốc đầu v0·10', min: 520, max: 1150, step: 2 },
      { name: 't0', label: 'Thời điểm t0 (giây)', min: 2, max: 9 },
    ],
    validateCode: `
      const { v10, t0 } = params;
      if (v10 <= 0 || v10 > 5000) return { valid: false, reason: 'Vận tốc ban đầu phải dương và ≤ 500 m/s' };
      if (t0 <= 0 || t0 > 50) return { valid: false, reason: 'Thời điểm t0 phải thuộc (0; 50]' };
      const v0 = v10 / 10;
      if (v0 - 9.8 * t0 <= 2) return { valid: false, reason: 'Cần v(t0) > 2 m/s để vật còn đang đi lên với vận tốc dương rõ ràng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { v10, t0 } = params;
      const v0 = Number((v10 / 10).toFixed(1));
      const vAns = Number((v0 - 9.8 * t0).toFixed(1));
      const v0Str = u.formatNumberVN(v0, 1);
      const ansStr = u.formatNumberVN(vAns, 1);
      const d1 = u.formatNumberVN(Number((vAns - 2.9).toFixed(1)), 1);
      const d2 = u.formatNumberVN(Number((vAns - 2.0).toFixed(1)), 1);
      const d3 = u.formatNumberVN(Number((vAns + 4.9).toFixed(1)), 1);
      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ansStr + '$',
        ['$' + d1 + '$', '$' + d2 + '$', '$' + d3 + '$'],
        rng,
        (step) => '$' + u.formatNumberVN(Number((vAns + step * 1.5).toFixed(1)), 1) + '$'
      );
      return {
        stem:
          'Một vật được phóng thẳng đứng lên trên từ mặt đất với tốc độ ban đầu là $' +
          v0Str +
          '\\text{ m/s}$, độ cao của vật sau $t$ giây được cho bởi công thức $h(t) = ' +
          v0Str +
          't - 4,9t^2$. Vận tốc của vật sau $' +
          t0 +
          '$ giây bằng:',
        options,
        correctIndex,
        answerSummary: ansStr + ' m/s',
        solutionSteps: [
          "Vận tốc của vật sau $t$ giây là $v(t) = h'(t) = " + v0Str + ' - 9,8t$.',
          'Thay $t = ' + t0 + '$ vào ta được $v(' + t0 + ') = ' + v0Str + ' - 9,8 \\cdot ' + t0 + ' = ' + ansStr + '\\text{ m/s}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t0 = 0 (chưa bay)', params: { v10: 906, t0: 0 }, expectedValid: false },
      { label: 'Biên vật đã rơi xuống (v(t0) ≤ 2)', params: { v10: 500, t0: 6 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc v0 = 90,6, t0 = 8', params: { v10: 906, t0: 8 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4)
  t12_b5_d04_fungi_exp_growth_mc: {
    id: 't12_b5_d04_fungi_exp_growth_mc',
    name: 'Tính tốc độ tăng trưởng quần thể sinh học hàm mũ P(t) = P0·e^(kt)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Ý nghĩa thực tiễn của đạo hàm hàm mũ',
    description:
      'Số lượng quần thể nấm được mô hình hóa bởi P(t) = P0·e^(kt). Tính tốc độ tăng trưởng P\'(t0) tại thời điểm t0 (làm tròn hàng phần mười).',
    conditionSummary: 'P0 ∈ [50; 400], k = k100/100 ∈ [0,15; 0,60], t0 ∈ [1; 8] để e^(kt) không tràn số',
    paramSpecs: [
      { name: 'p0', label: 'Số lượng ban đầu P0', min: 80, max: 200, step: 2 },
      { name: 'k100', label: 'Hệ số mũ k·100', min: 18, max: 45 },
      { name: 't0', label: 'Thời điểm t0 (giờ)', min: 2, max: 6 },
    ],
    validateCode: `
      const { p0, k100, t0 } = params;
      if (p0 < 10 || p0 > 1000) return { valid: false, reason: 'P0 phải thuộc [10; 1000]' };
      if (k100 < 5 || k100 > 80) return { valid: false, reason: 'k100 phải thuộc [5; 80] để mô hình thực tế và tránh tràn số e^(kt)' };
      if (t0 < 1 || t0 > 12) return { valid: false, reason: 'Thời điểm t0 phải thuộc [1; 12] giờ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { p0, k100, t0 } = params;
      const k = Number((k100 / 100).toFixed(2));
      const coeff = Number((p0 * k).toFixed(2));
      const rate = p0 * k * Math.exp(k * t0);
      const ansRounded = Number(rate.toFixed(1));
      const fmt1 = (x) => Number(x.toFixed(1)).toFixed(1).replace('.', ',');
      const kStr = u.formatNumberVN(k, 2);
      const coeffStr = u.formatNumberVN(coeff, 2);
      const ansStr = fmt1(ansRounded);

      const { options, correctIndex } = u.buildUniqueMcOptions(
        '$' + ansStr + '$ tế bào/giờ',
        [
          '$' + fmt1(ansRounded * 0.86) + '$ tế bào/giờ',
          '$' + fmt1(ansRounded - 8) + '$ tế bào/giờ',
          '$' + fmt1(ansRounded * 0.58) + '$ tế bào/giờ',
        ],
        rng,
        (step) => '$' + fmt1(ansRounded + step * 6.5) + '$ tế bào/giờ'
      );
      return {
        stem:
          'Giả sử số lượng của một quần thể nấm $A$ tại môi trường nuôi cấy trong phòng thí nghiệm được mô hình hóa bằng hàm số $P(t) = ' +
          p0 +
          'e^{' +
          kStr +
          't}$, trong đó thời gian $t$ được tính bằng giờ. Tại thời điểm $t = ' +
          t0 +
          '$ giờ, tốc độ tăng trưởng của quần thể nấm $A$ (làm tròn đến hàng phần mười) là:',
        options,
        correctIndex,
        answerSummary: ansStr + ' tế bào/giờ',
        solutionSteps: [
          "Tốc độ tăng trưởng của quần thể nấm tại thời điểm $t$ là $P'(t) = " + p0 + ' \\cdot ' + kStr + ' e^{' + kStr + 't} = ' + coeffStr + 'e^{' + kStr + 't}$.',
          "Tại thời điểm $t = " + t0 + "$ giờ: $P'(" + t0 + ") = " + coeffStr + 'e^{' + kStr + ' \\cdot ' + t0 + '} \\approx ' + ansStr + '$ tế bào/giờ.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t0 = 0 hoặc k100 quá lớn gây tràn số', params: { p0: 124, k100: 1000, t0: 50 }, expectedValid: false },
      { label: 'Biên P0 = 0', params: { p0: 0, k100: 34, t0: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc P0 = 124, k = 0,34, t0 = 4', params: { p0: 124, k100: 34, t0: 4 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // PHẦN II. TRẮC NGHIỆM ĐÚNG - SAI (15 DẠNG: DẠNG 5 -> DẠNG 19)
  // =====================================================================

  // Dạng 5 (Q5)
  t12_b5_d05_motion_quad_tf: {
    id: 't12_b5_d05_motion_quad_tf',
    name: 'Khảo sát chuyển động thẳng bậc hai (vận tốc, gia tốc, quãng đường, GTLN)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Ứng dụng đạo hàm trong vật lý',
    description:
      'Cho phương trình tọa độ s(t) = a·t² + b·t + c (a > 0, b < 0). Đánh giá vận tốc, gia tốc, tổng quãng đường có đổi chiều chuyển động và vận tốc lớn nhất trên đoạn thời gian.',
    conditionSummary: 'a ∈ [1; 3], b ∈ [-9; -2], t3 > -b/(2a), t1 ∈ [5; 12], ta < tb',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 1, max: 3 },
      { name: 'bAbs', label: 'Giá trị -b', min: 3, max: 9 },
      { name: 'c', label: 'Vị trí đầu c', min: 2, max: 12 },
      { name: 't3', label: 'Thời gian đi quãng đường (s)', min: 10, max: 16 },
    ],
    validateCode: `
      const { a, bAbs, c, t3 } = params;
      if (a <= 0 || a > 10) return { valid: false, reason: 'Hệ số a phải thuộc [1; 10]' };
      if (bAbs <= 0 || bAbs > 30) return { valid: false, reason: 'Cần b < 0 và -b ≤ 30 để vật có đổi chiều trong (0; t3)' };
      const tTurn = bAbs / (2 * a);
      if (t3 <= tTurn + 1 || t3 > 40) return { valid: false, reason: 'Cần t3 > -b/(2a) + 1 để khảo sát quãng đường có đổi chiều' };
      if (c < 0 || c > 100) return { valid: false, reason: 'c phải thuộc [0; 100]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, bAbs, c, t3 } = params;
      const b = -bAbs;
      const poly = u.formatQuadratic(a, b, c, 't');
      const vExpr = u.formatLinear(2 * a, b, 't');
      const tTurn = bAbs / (2 * a);
      const t1 = Math.max(4, Math.ceil(tTurn) + 5);
      const vAtT1 = 2 * a * t1 + b;
      const t2 = 1;
      const acc = 2 * a;

      const s0 = c;
      const sTurn = a * tTurn * tTurn + b * tTurn + c;
      const sT3 = a * t3 * t3 + b * t3 + c;
      const totalDist = Number((Math.abs(sTurn - s0) + Math.abs(sT3 - sTurn)).toFixed(1));
      const distStr = u.formatNumberVN(totalDist, 1);

      const ta = Math.max(3, Math.ceil(tTurn) + 2);
      const tb = ta + 3;
      const vTa = 2 * a * ta + b;
      const vTb = 2 * a * tb + b;

      const tfStatements = [
        {
          key: 'a',
          text: 'Vận tốc chuyển động của vật tại thời điểm $t = ' + t1 + '$ là $' + vAtT1 + '$ m/s.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Gia tốc chuyển động của vật tại thời điểm $t = ' + t2 + '$ là $' + acc + '$ $\\text{m/s}^2$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Quãng đường vật đi được sau $' + t3 + '$ giây kể từ khi bắt đầu chuyển động là $' + distStr + '$ m.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Vận tốc lớn nhất vật đạt được trong khoảng thời gian từ $t = ' + ta + '$ đến $t = ' + tb + '$ là $' + vTa + '$ m/s.',
          isTrue: false,
        },
      ];

      return {
        stem:
          'Một vật chuyển động thẳng không đều xác định bởi phương trình $s(t) = ' +
          poly +
          '$, trong đó $s$ tính bằng mét và $t$ tính bằng giây. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((st) => st.key + ':' + (st.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          "a) Đúng: $v(t) = s'(t) = " + vExpr + ' \\Rightarrow v(' + t1 + ') = ' + vAtT1 + '\\text{ m/s}$.',
          "b) Đúng: $a(t) = v'(t) = " + acc + '\\text{ m/s}^2$ không đổi nên $a(' + t2 + ') = ' + acc + '\\text{ m/s}^2$.',
          'c) Đúng: $v(t) = 0 \\Leftrightarrow t = ' + u.formatNumberVN(tTurn, 2) + '\\text{ s} \\in (0;\\, ' + t3 + ')$. Vật đổi chiều tại $t = ' + u.formatNumberVN(tTurn, 2) + '$, nên quãng đường đi được là $|s(' + u.formatNumberVN(tTurn, 2) + ') - s(0)| + |s(' + t3 + ') - s(' + u.formatNumberVN(tTurn, 2) + ')| = ' + distStr + '\\text{ m}$.',
          'd) Sai: Hàm $v(t) = ' + vExpr + '$ đồng biến trên $\\mathbb{R}$ nên trên $[' + ta + ';\\, ' + tb + ']$, vận tốc lớn nhất đạt tại $t = ' + tb + '$ là $v(' + tb + ') = ' + vTb + '\\text{ m/s}$ (không phải $' + vTa + '\\text{ m/s}$).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (không phải bậc hai)', params: { a: 0, bAbs: 5, c: 7, t3: 13 }, expectedValid: false },
      { label: 'Biên t3 ≤ t_đổi_chiều', params: { a: 1, bAbs: 10, c: 4, t3: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc s(t) = t² - 5t + 7, t3 = 13', params: { a: 1, bAbs: 5, c: 7, t3: 13 }, expectedValid: true },
    ],
  },

  // Dạng 6 (Q6)
  t12_b5_d06_square_box_cut_tf: {
    id: 't12_b5_d06_square_box_cut_tf',
    name: 'Bài toán cắt 4 góc tấm bìa hình vuông gấp hộp không nắp (Đúng-Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Tối ưu thể tích hình học thực tế',
    description:
      'Từ tấm bìa hình vuông cạnh a, cắt 4 hình vuông cạnh x ở bốn góc rồi gấp thành hộp không nắp. Xét điều kiện x, hàm V(x), khoảng đồng biến và thể tích lớn nhất.',
    conditionSummary: 'a ∈ [12; 36] (ưu tiên chia hết cho 3 hoặc chẵn để số liệu đẹp)',
    paramSpecs: [
      { name: 'a', label: 'Cạnh tấm bìa a (cm)', min: 12, max: 33, step: 3 },
      { name: 'mode', label: 'Biến thể mệnh đề (0..1)', min: 0, max: 1 },
    ],
    validateCode: `
      const { a, mode } = params;
      if (a < 6 || a > 80) return { valid: false, reason: 'Cạnh tấm bìa a phải thuộc [6; 80] cm' };
      if (mode !== 0 && mode !== 1) return { valid: false, reason: 'mode chỉ nhận 0 hoặc 1' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, mode } = params;
      const halfA = u.simplifyFrac(a, 2);
      const xOpt = u.simplifyFrac(a, 6);
      const safeCut = Math.max(1, Math.floor(a / 2) - 1);
      const invalidCut = Math.ceil(a / 2) + 2;
      const askCondTrue = mode === 0;
      const mCut = askCondTrue ? safeCut : invalidCut;

      const c3 = 4;
      const c2 = -4 * a;
      const c1 = a * a;
      const vPoly = u.formatPoly([c3, c2, c1, 0]);
      const vDeriv = u.formatQuadratic(12, -8 * a, a * a);
      const incEnd = Math.max(1, Math.floor((a - 1) / 6));
      const vMax = u.simplifyFrac(2 * a * a * a, 27);

      const tfStatements = [
        {
          key: 'a',
          text: 'Nếu cắt ở mỗi góc hình vuông có cạnh nhỏ hơn $' + mCut + '\\text{ cm}$ (với $x > 0$) thì luôn tạo được chiếc hộp có dạng hình hộp chữ nhật.',
          isTrue: askCondTrue,
        },
        {
          key: 'b',
          text: 'Thể tích của chiếc hộp được mô tả bởi hàm số $V(x) = ' + vPoly + '$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Thể tích của hộp tăng dần khi độ dài cạnh $x$ thay đổi trong khoảng $(0;\\, ' + incEnd + ')$ cm.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Thể tích chiếc hộp đạt giá trị lớn nhất bằng $' + vMax.latex + '\\text{ cm}^3$.',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Từ một tấm bìa carton hình vuông có độ dài cạnh bằng $' +
          a +
          '\\text{ cm}$, người ta cắt bốn hình vuông bằng nhau ở bốn góc rồi gập thành một chiếc hộp có dạng hình hộp chữ nhật không có nắp (minh họa qua hình vẽ). Gọi $x\\text{ (cm)}$ là độ dài cạnh của các hình vuông nhỏ được cắt ở bốn góc của tấm bìa. Xét tính đúng-sai của các khẳng định sau:',
        diagram: { kind: 'geometry_figure', figureType: 'square_box_cut', params: { a } },
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'Điều kiện để gấp được hình hộp chữ nhật không nắp là $0 < 2x < ' + a + ' \\Leftrightarrow 0 < x < ' + halfA.latex + '$' + (askCondTrue ? ' (nên $0 < x < ' + mCut + '$ thỏa mãn, ý a đúng).' : ' (nên khi $x \\ge ' + halfA.latex + '$ không gấp được hộp, ý a sai).'),
          'Đáy hộp là hình vuông cạnh $(' + a + ' - 2x)$ và chiều cao là $x$, suy ra $V(x) = x(' + a + ' - 2x)^2 = ' + vPoly + '$ (ý b đúng).',
          "Đạo hàm $V'(x) = " + vDeriv + ' = 0 \\Leftrightarrow x = ' + xOpt.latex + '$ hoặc $x = ' + halfA.latex + '$. Với $x \\in (0;\\, ' + xOpt.latex + ')$ thì $V\'(x) > 0$, nên $V(x)$ đồng biến trên $(0;\\, ' + incEnd + ')$ (ý c đúng).',
          'Thể tích lớn nhất đạt tại $x = ' + xOpt.latex + '$ là $V_{\\max} = V\\left(' + xOpt.latex + '\\right) = ' + vMax.latex + '\\text{ cm}^3$ (ý d đúng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a quá nhỏ (a = 2)', params: { a: 2, mode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc cạnh a = 21 cm', params: { a: 21, mode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7)
  t12_b5_d07_avg_cost_rational_tf: {
    id: 't12_b5_d07_avg_cost_rational_tf',
    name: 'Khảo sát hàm chi phí trung bình C(x) = (ax² + b)/x (Đúng-Sai)',
    category: 'TF',
    level: 'Hiểu',
    topicTag: 'Tối ưu chi phí trung bình',
    description:
      'Cho chi phí trung bình C(x) = (a·x² + b)/x (nghìn đồng). Kiểm tra giá trị tại x0, công thức đạo hàm, khoảng nghịch biến và giá trị nhỏ nhất.',
    conditionSummary: 'a ∈ [4; 14], b ∈ [120; 360], x0 ∈ [10; 25]',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: 5, max: 13 },
      { name: 'b', label: 'Hệ số b', min: 150, max: 350, step: 7 },
      { name: 'x0', label: 'Sản lượng x0 (kg)', min: 12, max: 24 },
    ],
    validateCode: `
      const { a, b, x0 } = params;
      if (a <= 0 || a > 50) return { valid: false, reason: 'Hệ số a phải thuộc [1; 50]' };
      if (b <= 10 || b > 5000) return { valid: false, reason: 'Hệ số b phải thuộc (10; 5000]' };
      if (x0 <= 0 || x0 > 200) return { valid: false, reason: 'x0 phải dương và ≤ 200' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, x0 } = params;
      const cX0 = Number(((a * x0 * x0 + b) / x0).toFixed(1));
      const cX0Wrong = Number((cX0 + 2).toFixed(1));
      const xMinPos = Math.sqrt(b / a);
      const decBound = Math.max(1, Math.floor(xMinPos) - 1);
      const minVal = Number((2 * Math.sqrt(a * b)).toFixed(1));

      const tfStatements = [
        {
          key: 'a',
          text: 'Chi phí trung bình cho một sản phẩm khi sản xuất $' + x0 + '$ kilôgam là $' + u.formatNumberVN(cX0Wrong, 1) + '$ (nghìn đồng).',
          isTrue: false,
        },
        {
          key: 'b',
          text: "Đạo hàm của hàm số đã cho là $C'(x) = \\frac{" + a + 'x^2 - ' + b + '}{x}$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Chi phí trung bình cho một sản phẩm giảm dần khi $0 < x < ' + decBound + '$.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Chi phí trung bình cho một sản phẩm nhỏ nhất bằng $' + u.formatNumberVN(minVal, 1) + '$ (nghìn đồng).',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Nếu trong một ngày, một xưởng sản xuất được $x$ kilôgam sản phẩm ($x > 0$) thì chi phí trung bình (tính bằng nghìn đồng) cho một sản phẩm được tính bởi công thức $C(x) = \\frac{' +
          a +
          'x^2 + ' +
          b +
          '}{x}$. Xét tính đúng-sai của các khẳng định sau (các kết quả làm tròn đến hàng phần mười):',
        tfStatements,
        answerSummary: tfStatements.map((s) => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
        solutionSteps: [
          'a) Sai: $C(' + x0 + ') = \\frac{' + a + '\\cdot' + x0 + '^2 + ' + b + '}{' + x0 + '} \\approx ' + u.formatNumberVN(cX0, 1) + '$ (nghìn đồng), không phải $' + u.formatNumberVN(cX0Wrong, 1) + '$.',
          "b) Sai: $C(x) = " + a + 'x + \\frac{' + b + '}{x} \\Rightarrow C\'(x) = ' + a + ' - \\frac{' + b + '}{x^2} = \\frac{' + a + 'x^2 - ' + b + '}{x^2}$ (mẫu là $x^2$, không phải $x$).',
          "c) Đúng: $C'(x) = 0 \\Leftrightarrow x = \\sqrt{\\frac{" + b + '}{' + a + '}} \\approx ' + u.formatNumberVN(xMinPos, 2) + '$. Với $0 < x < \\sqrt{\\frac{' + b + '}{' + a + '}}$ thì $C\'(x) < 0$, nên hàm giảm dần trên $(0;\\, ' + decBound + ')$.',
          'd) Đúng: $\\min_{x > 0} C(x) = C\\left(\\sqrt{\\frac{' + b + '}{' + a + '}}\\right) = 2\\sqrt{' + a + '\\cdot' + b + '} \\approx ' + u.formatNumberVN(minVal, 1) + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (chia cho 0 ở nghiệm)', params: { a: 0, b: 261, x0: 19 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a = 9, b = 261, x0 = 19', params: { a: 9, b: 261, x0: 19 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8)
  t12_b5_d08_rect_box_surface_tf: {
    id: 't12_b5_d08_rect_box_surface_tf',
    name: 'Tối ưu diện tích toàn phần hình hộp chữ nhật biết thể tích V và chiều cao h',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu vật liệu hình học không gian',
    description:
      'Hình hộp chữ nhật thể tích V = A·h, chiều cao h, hai cạnh đáy x, y. Kiểm tra 4 khẳng định về y(x), diện tích toàn phần S(x), S\'(x) và giá trị x tối ưu.',
    conditionSummary: 'A ∈ [20; 80] (diện tích đáy), h ∈ [8; 25], A ≠ k²-1 để kiểm tra sai số',
    paramSpecs: [
      { name: 'area', label: 'Diện tích đáy A = x·y', min: 25, max: 72 },
      { name: 'h', label: 'Chiều cao h (cm)', min: 10, max: 22 },
    ],
    validateCode: `
      const { area, h } = params;
      if (area < 4 || area > 500) return { valid: false, reason: 'Diện tích đáy phải thuộc [4; 500]' };
      if (h < 2 || h > 100) return { valid: false, reason: 'Chiều cao h phải thuộc [2; 100]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { area, h } = params;
      const V = area * h;
      const twoA = 2 * area;
      const twoH = 2 * h;
      const twoV = 2 * V;
      const xOpt = Math.sqrt(area);
      const sMin = Number((twoA + 4 * h * xOpt).toFixed(2));

      const tfStatements = [
        { key: 'a', text: '$y = \\frac{' + V + '}{x}$.', isTrue: false },
        {
          key: 'b',
          text: 'Diện tích toàn phần của chiếc hộp là $S(x) = ' + twoA + ' + ' + h + 'x + \\frac{' + twoV + '}{x}$.',
          isTrue: false,
        },
        {
          key: 'c',
          text: "$S'(x) = \\frac{" + h + 'x^2 - ' + V + '}{x^2}$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Chi phí vật liệu làm hộp nhỏ nhất khi $x = \\sqrt{' + (area + 1) + '}$ cm.',
          isTrue: false,
        },
      ];

      return {
        stem:
          'Người ta chế tạo một chiếc hộp chữ nhật có thể tích $' +
          V +
          '\\text{ cm}^3$, chiều cao là $' +
          h +
          '\\text{ cm}$. Gọi $x, y$ là các kích thước còn lại của đáy chiếc hộp với $x > 0, y > 0$. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng phần trăm):',
        tfStatements,
        answerSummary: 'a:S, b:S, c:S, d:S',
        solutionSteps: [
          'a) Sai: Thể tích $V = ' + h + 'xy = ' + V + ' \\Rightarrow y = \\frac{' + area + '}{x}$ (không phải $\\frac{' + V + '}{x}$).',
          'b) Sai: Diện tích toàn phần $S(x) = 2xy + 2\\cdot' + h + 'x + 2\\cdot' + h + 'y = ' + twoA + ' + ' + twoH + 'x + \\frac{' + twoV + '}{x}$.',
          "c) Sai: Đạo hàm đúng là $S'(x) = " + twoH + ' - \\frac{' + twoV + '}{x^2} = \\frac{' + twoH + 'x^2 - ' + twoV + '}{x^2}$.',
          "d) Sai: $S'(x) = 0 \\Leftrightarrow x = \\sqrt{" + area + '} \\approx ' + u.formatNumberVN(xOpt, 2) + '\\text{ cm}$ (khi đó $S_{\\min} \\approx ' + u.formatNumberVN(sMin, 2) + '\\text{ cm}^2$), không phải $\\sqrt{' + (area + 1) + '}$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên h = 0 (thể tích bằng 0)', params: { area: 40, h: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc A = 40, h = 17 (V = 680)', params: { area: 40, h: 17 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9)
  t12_b5_d09_bacteria_rational_tf: {
    id: 't12_b5_d09_bacteria_rational_tf',
    name: 'Khảo sát số lượng vi khuẩn theo thời gian N(t) = a·t/(t² + b) + N0 (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng đạo hàm hàm phân thức (Sinh học)',
    description:
      'Số vi khuẩn N(t) = a·t/(t² + b) + N0. Đánh giá số lượng tại t0, đạo hàm N\'(t), tính đơn điệu và giá trị lớn nhất làm tròn hàng đơn vị.',
    conditionSummary: 'N0 ∈ [600; 2000], a ∈ [80; 300], b ∈ [100; 450] với a/(2√b) ≥ 2 để N_max rõ nét',
    paramSpecs: [
      { name: 'n0', label: 'Số vi khuẩn ban đầu N0', min: 800, max: 1800, step: 11 },
      { name: 'a', label: 'Hệ số tử a', min: 110, max: 250 },
      { name: 'b', label: 'Hệ số mẫu b', min: 140, max: 360, step: 7 },
      { name: 't0', label: 'Thời điểm kiểm tra t0 (s)', min: 2, max: 5 },
    ],
    validateCode: `
      const { n0, a, b, t0 } = params;
      if (n0 < 10 || n0 > 10000) return { valid: false, reason: 'N0 phải thuộc [10; 10000]' };
      if (a <= 0 || a > 2000) return { valid: false, reason: 'Hệ số a phải thuộc [1; 2000]' };
      if (b < 25 || b > 2000) return { valid: false, reason: 'Hệ số b phải thuộc [25; 2000]' };
      if (t0 < 1 || t0 > 20) return { valid: false, reason: 't0 phải thuộc [1; 20]' };
      if (a / (2 * Math.sqrt(b)) < 2.2) return { valid: false, reason: 'Cần biên độ tăng trưởng ≥ 2,2 để N_max khác biệt rõ khi làm tròn' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n0, a, b, t0 } = params;
      const ab = a * b;
      const tOpt = Math.sqrt(b);
      const nAtT0 = Math.round((a * t0) / (t0 * t0 + b) + n0);
      const nMax = Math.round(n0 + a / (2 * tOpt));
      const tCheckDec = Math.max(3, Math.floor(tOpt) - 1);

      const tfStatements = [
        {
          key: 'a',
          text: 'Số lượng vi khuẩn sau $' + t0 + '$ giây bằng $' + nAtT0 + '$ (con).',
          isTrue: true,
        },
        {
          key: 'b',
          text: "Đạo hàm của hàm số là $N'(t) = \\frac{-" + a + 't^2 + ' + ab + '}{(t^2 + ' + b + ')^2}$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Số lượng vi khuẩn giảm dần khi $0 < t < ' + tCheckDec + '$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Số lượng vi khuẩn đạt lớn nhất bằng $' + nMax + '$ (con).',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Trong một thí nghiệm y học, người ta cấy $' +
          n0 +
          '$ vi khuẩn vào môi trường dinh dưỡng. Bằng thực nghiệm, người ta xác định được số lượng vi khuẩn thay đổi theo thời gian bởi công thức $N(t) = \\frac{' +
          a +
          't}{t^2 + ' +
          b +
          '} + ' +
          n0 +
          '$ (con), trong đó $t$ là thời gian tính bằng giây. Xét tính đúng-sai của các khẳng định sau (kết quả làm tròn đến hàng đơn vị):',
        tfStatements,
        answerSummary: 'a:Đ, b:Đ, c:S, d:Đ',
        solutionSteps: [
          'a) Đúng: Thay $t = ' + t0 + '$ ta có $N(' + t0 + ') = \\frac{' + a * t0 + '}{' + (t0 * t0 + b) + '} + ' + n0 + ' \\approx ' + nAtT0 + '$ (con).',
          "b) Đúng: $N'(t) = \\frac{" + a + '(t^2 + ' + b + ') - ' + a + 't \\cdot 2t}{(t^2 + ' + b + ')^2} = \\frac{-' + a + 't^2 + ' + ab + '}{(t^2 + ' + b + ')^2}$.',
          "c) Sai: Giải $N'(t) = 0 \\Leftrightarrow t = \\sqrt{" + b + '} \\approx ' + u.formatNumberVN(tOpt, 2) + '$. Trên khoảng $(0;\\, \\sqrt{' + b + '})$ thì $N\'(t) > 0$, nên số lượng vi khuẩn tăng dần khi $0 < t < ' + tCheckDec + '$.',
          'd) Đúng: $N_{\\max} = N(\\sqrt{' + b + '}) = \\frac{' + a + '}{2\\sqrt{' + b + '}} + ' + n0 + ' \\approx ' + nMax + '$ (con).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0 (chia cho 0 tại t = 0)', params: { n0: 1031, a: 127, b: 0, t0: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc N0 = 1031, a = 127, b = 294', params: { n0: 1031, a: 127, b: 294, t0: 2 }, expectedValid: true },
    ],
  },

  // Dạng 10 (Q10)
  t12_b5_d10_printers_opt_tf: {
    id: 't12_b5_d10_printers_opt_tf',
    name: 'Tối ưu số lượng máy in hoạt động để chi phí thấp nhất (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu rời rạc theo biến nguyên',
    description:
      'Xưởng in có M máy in, năng suất r ấn phẩm/giờ, phí cài đặt C1/máy, phí kỹ sư C2/giờ, tổng Q = r·H ấn phẩm. Kiểm tra 4 khẳng định tìm số máy nguyên tối ưu.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5 để x* nguyên thuộc [2; M] và duy nhất',
    paramSpecs: [
      { name: 'maxM', label: 'Tổng số máy in M', min: 16, max: 24 },
      { name: 'rate', label: 'Năng suất/máy (ấn phẩm/h)', min: 20, max: 40, step: 5 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 240, max: 400, step: 20 },
      { name: 'c1k', label: 'Phí cài đặt/máy (nghìn đ)', min: 35, max: 55 },
      { name: 'c2k', label: 'Phí kỹ sư/giờ (nghìn đ)', min: 25, max: 45 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60) return { valid: false, reason: 'Số máy M phải thuộc [6; 60]' };
      if (rate <= 0 || rate > 200 || hours <= 0 || hours > 2000) return { valid: false, reason: 'Năng suất và H không hợp lệ' };
      if (c1k <= 0 || c2k <= 0 || c1k > 1000 || c2k > 1000) return { valid: false, reason: 'Chi phí phải dương và ≤ 1000 nghìn đồng' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cần điểm cực tiểu thuộc [4; M - 0.5]' };
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => c1k * x + (hours * c2k) / x;
      if (fl !== cl && Math.abs(f(fl) - f(cl)) < 1e-4) return { valid: false, reason: 'Hai giá trị nguyên lân cận có chi phí bằng nhau' };
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
      const wrongC1 = C1 + 97;

      const tfStatements = [
        { key: 'a', text: 'Chi phí cài đặt và bảo dưỡng cho đợt hàng là $' + wrongC1 + 'x$ (đồng).', isTrue: false },
        { key: 'b', text: 'Thời gian cần dùng để in hết $' + Q + '$ ấn phẩm là $\\frac{' + hours + '}{x}$ (giờ).', isTrue: true },
        { key: 'c', text: 'Chi phí trả cho kỹ sư giám sát là $\\frac{' + K + '}{x}$ (đồng).', isTrue: true },
        { key: 'd', text: 'Số máy in để tổng chi phí nhỏ nhất là $' + xBest + '$.', isTrue: true },
      ];

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
          '$ ấn phẩm. Gọi $x$ là số lượng máy in cần sử dụng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' +
          maxM +
          '$). Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:S, b:Đ, c:Đ, d:Đ',
        solutionSteps: [
          'a) Sai: Chi phí cài đặt và bảo dưỡng cho $x$ máy là $' + C1 + 'x$ (đồng).',
          'b) Đúng: Mỗi giờ $x$ máy in được $' + rate + 'x$ ấn phẩm, nên thời gian in là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ (giờ).',
          'c) Đúng: Tiền công kỹ sư giám sát là $\\frac{' + hours + '}{x} \\cdot ' + C2 + ' = \\frac{' + K + '}{x}$ (đồng).',
          'd) Đúng: Xét $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$ có $f\'(x) = 0 \\Leftrightarrow x = \\sqrt{\\frac{' + K + '}{' + C1 + '}} \\approx ' + u.formatNumberVN(xCont, 1) + '$. So sánh $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, chi phí nhỏ nhất tại $x = ' + xBest + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1k = 0 (chi phí bằng 0)', params: { maxM: 20, rate: 30, hours: 340, c1k: 0, c2k: 33 }, expectedValid: false },
      { label: 'Biên điểm tối ưu vượt quá số máy M', params: { maxM: 10, rate: 30, hours: 500, c1k: 20, c2k: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (20 máy, 340h, 41k, 33k -> 17 máy)', params: { maxM: 20, rate: 30, hours: 340, c1k: 41, c2k: 33 }, expectedValid: true },
    ],
  },

  // Dạng 11 (Q11)
  t12_b5_d11_harvesters_opt_tf: {
    id: 't12_b5_d11_harvesters_opt_tf',
    name: 'Tối ưu số lượng máy gặt lúa để chi phí thấp nhất (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu rời rạc theo biến nguyên',
    description:
      'Nông trại có M máy gặt, năng suất r kg/giờ, phí vận hành C1/máy, phí kỹ sư C2/giờ, tổng Q = r·H kg lúa. Kiểm tra 4 khẳng định tìm số máy tối ưu.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5 để x* nguyên thuộc [2; M]',
    paramSpecs: [
      { name: 'maxM', label: 'Tổng số máy gặt M', min: 15, max: 24 },
      { name: 'rate', label: 'Năng suất/máy (kg/h)', min: 30, max: 55, step: 3 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 250, max: 420, step: 20 },
      { name: 'c1k', label: 'Phí vận hành/máy (nghìn đ)', min: 55, max: 85 },
      { name: 'c2k', label: 'Phí kỹ sư/giờ (nghìn đ)', min: 38, max: 62 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60) return { valid: false, reason: 'Số máy M phải thuộc [6; 60]' };
      if (rate <= 0 || rate > 200 || hours <= 0 || hours > 2000) return { valid: false, reason: 'Năng suất và H không hợp lệ' };
      if (c1k <= 0 || c2k <= 0 || c1k > 1000 || c2k > 1000) return { valid: false, reason: 'Chi phí phải dương và ≤ 1000' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cần điểm cực tiểu thuộc [4; M - 0.5]' };
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
      const wrongC1 = C1 - 91;

      const tfStatements = [
        { key: 'a', text: 'Chi phí vận hành cho vụ lúa là $' + wrongC1 + 'x$ (đồng).', isTrue: false },
        { key: 'b', text: 'Thời gian cần dùng để gặt hết $' + Q + '$ kg lúa là $\\frac{' + hours + '}{x}$ (giờ).', isTrue: true },
        { key: 'c', text: 'Chi phí thuê kỹ sư giám sát là $\\frac{' + K + '}{x}$ (đồng).', isTrue: true },
        { key: 'd', text: 'Số máy gặt để tổng chi phí nhỏ nhất là $' + xBest + '$.', isTrue: true },
      ];

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
          '$ kg lúa. Gọi $x$ là số lượng máy gặt cần sử dụng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' +
          maxM +
          '$). Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:S, b:Đ, c:Đ, d:Đ',
        solutionSteps: [
          'a) Sai: Chi phí vận hành cho $x$ máy gặt là $' + C1 + 'x$ (đồng).',
          'b) Đúng: Thời gian gặt hết $' + Q + '$ kg lúa là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ (giờ).',
          'c) Đúng: Chi phí thuê kỹ sư giám sát là $\\frac{' + hours + '}{x} \\cdot ' + C2 + ' = \\frac{' + K + '}{x}$ (đồng).',
          'd) Đúng: Tổng chi phí $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$ đạt cực tiểu liên tục tại $x \\approx ' + u.formatNumberVN(xCont, 1) + '$. Kiểm tra $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, suy ra số máy tối ưu là $x = ' + xBest + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên M quá nhỏ (M = 4)', params: { maxM: 4, rate: 42, hours: 330, c1k: 70, c2k: 50 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (18 máy, 330h, 70k, 50k -> 15 máy)', params: { maxM: 18, rate: 42, hours: 330, c1k: 70, c2k: 50 }, expectedValid: true },
    ],
  },

  // Dạng 12 (Q12)
  t12_b5_d12_trucks_opt_tf: {
    id: 't12_b5_d12_trucks_opt_tf',
    name: 'Tối ưu số lượng xe tải vận chuyển để chi phí thấp nhất (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu rời rạc theo biến nguyên',
    description:
      'Công ty vận tải có M xe tải, mỗi xe chở r tấn/giờ, phí chuẩn bị C1/xe, điều phối C2/giờ, tổng Q = r·H tấn hàng. Kiểm tra 4 khẳng định.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5 để số xe tối ưu x* ∈ [2; M]',
    paramSpecs: [
      { name: 'maxM', label: 'Tổng số xe tải M', min: 16, max: 24 },
      { name: 'rate', label: 'Tải trọng r (tấn/h)', min: 5, max: 12 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 360, max: 560, step: 20 },
      { name: 'c1k', label: 'Phí chuẩn bị/xe (nghìn đ)', min: 110, max: 160 },
      { name: 'c2k', label: 'Phí điều phối/giờ (nghìn đ)', min: 65, max: 95 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60) return { valid: false, reason: 'Số xe M phải thuộc [6; 60]' };
      if (rate <= 0 || rate > 100 || hours <= 0 || hours > 3000) return { valid: false, reason: 'Tải trọng và H không hợp lệ' };
      if (c1k <= 0 || c2k <= 0 || c1k > 1000 || c2k > 1000) return { valid: false, reason: 'Chi phí phải dương và ≤ 1000' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cần điểm cực tiểu thuộc [4; M - 0.5]' };
      const fl = Math.max(1, Math.floor(xCont));
      const cl = Math.min(maxM, Math.ceil(xCont));
      const f = (x) => c1k * x + (hours * c2k) / x;
      if (fl !== cl && Math.abs(f(fl) - f(cl)) < 1e-4) return { valid: false, reason: 'Hai điểm nguyên lân cận có chi phí bằng nhau' };
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
      const wrongK = K + 6;

      const tfStatements = [
        { key: 'a', text: 'Chi phí chuẩn bị và khấu hao cho chuyến hàng là $' + C1 + 'x$ (đồng).', isTrue: true },
        { key: 'b', text: 'Thời gian cần dùng để vận chuyển hết $' + Q + '$ tấn hàng là $\\frac{' + hours + '}{x}$ (giờ).', isTrue: true },
        { key: 'c', text: 'Chi phí thuê nhân viên điều phối là $\\frac{' + wrongK + '}{x}$ (đồng).', isTrue: false },
        { key: 'd', text: 'Số xe tải để tổng chi phí nhỏ nhất là $' + xBest + '$.', isTrue: true },
      ];

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
          '$ tấn hàng. Gọi $x$ là số lượng xe tải cần sử dụng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' +
          maxM +
          '$). Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:Đ, b:Đ, c:S, d:Đ',
        solutionSteps: [
          'a) Đúng: Chi phí chuẩn bị và khấu hao cho $x$ xe tải là $' + C1 + 'x$ (đồng).',
          'b) Đúng: Thời gian vận chuyển hết $' + Q + '$ tấn hàng là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ (giờ).',
          'c) Sai: Chi phí thuê điều phối đúng là $\\frac{' + hours + '}{x} \\cdot ' + C2 + ' = \\frac{' + K + '}{x}$ (đồng).',
          'd) Đúng: Xét $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$, nghiệm cực tiểu là $x = \\sqrt{\\frac{' + K + '}{' + C1 + '}} \\approx ' + u.formatNumberVN(xCont, 1) + '$. Đối chiếu $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, chọn $x = ' + xBest + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c2k = 0', params: { maxM: 19, rate: 8, hours: 480, c1k: 139, c2k: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (19 xe, 480h, 139k, 80k -> 17 xe)', params: { maxM: 19, rate: 8, hours: 480, c1k: 139, c2k: 80 }, expectedValid: true },
    ],
  },

  // Dạng 13 (Q13)
  t12_b5_d13_servers_opt_tf: {
    id: 't12_b5_d13_servers_opt_tf',
    name: 'Tối ưu số lượng máy chủ (server) để chi phí thấp nhất (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu rời rạc theo biến nguyên',
    description:
      'Trung tâm dữ liệu có M máy chủ, xử lý r tác vụ/giờ, chi phí điện năng C1/máy, giám sát C2/giờ, tổng Q = r·H tác vụ. Kiểm tra 4 khẳng định.',
    conditionSummary: '4 ≤ √(H·C2/C1) ≤ M - 0.5 để số server tối ưu x* ∈ [2; M]',
    paramSpecs: [
      { name: 'maxM', label: 'Tổng số máy chủ M', min: 11, max: 18 },
      { name: 'rate', label: 'Tác vụ/giờ mỗi máy', min: 650, max: 850, step: 6 },
      { name: 'hours', label: 'Hệ số H = Q/r', min: 160, max: 260, step: 10 },
      { name: 'c1k', label: 'Phí điện năng/máy (nghìn đ)', min: 200, max: 280 },
      { name: 'c2k', label: 'Phí kỹ sư/giờ (nghìn đ)', min: 100, max: 150 },
    ],
    validateCode: `
      const { maxM, rate, hours, c1k, c2k } = params;
      if (maxM < 6 || maxM > 60) return { valid: false, reason: 'Số máy chủ M phải thuộc [6; 60]' };
      if (rate <= 0 || rate > 5000 || hours <= 0 || hours > 2000) return { valid: false, reason: 'Tốc độ xử lý và H không hợp lệ' };
      if (c1k <= 0 || c2k <= 0 || c1k > 2000 || c2k > 2000) return { valid: false, reason: 'Chi phí phải dương và ≤ 2000' };
      const xCont = Math.sqrt((hours * c2k) / c1k);
      if (xCont < 4 || xCont > maxM - 0.5) return { valid: false, reason: 'Cần điểm cực tiểu thuộc [4; M - 0.5]' };
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
      const wrongH = hours + 19;
      const wrongK = K + 9;

      const tfStatements = [
        { key: 'a', text: 'Chi phí điện năng cho đợt chạy này là $' + C1 + 'x$ (đồng).', isTrue: true },
        { key: 'b', text: 'Thời gian cần dùng để xử lý hết $' + Q + '$ tác vụ là $\\frac{' + wrongH + '}{x}$ (giờ).', isTrue: false },
        { key: 'c', text: 'Chi phí thuê kỹ sư giám sát hệ thống cho đợt chạy là $\\frac{' + wrongK + '}{x}$ (đồng).', isTrue: false },
        { key: 'd', text: 'Số máy chủ để tổng chi phí nhỏ nhất là $' + xBest + '$.', isTrue: true },
      ];

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
          '$ đồng/giờ. Đợt chạy này cần xử lý $' +
          Q +
          '$ tác vụ. Gọi $x$ là số lượng máy chủ cần sử dụng ($x \\in \\mathbb{N}^*,\\, 1 \\le x \\le ' +
          maxM +
          '$). Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:Đ, b:S, c:S, d:Đ',
        solutionSteps: [
          'a) Đúng: Chi phí điện năng là $' + C1 + 'x$ (đồng).',
          'b) Sai: Thời gian xử lý đúng là $\\frac{' + Q + '}{' + rate + 'x} = \\frac{' + hours + '}{x}$ (giờ), không phải $\\frac{' + wrongH + '}{x}$.',
          'c) Sai: Chi phí thuê kỹ sư đúng là $\\frac{' + hours + '}{x} \\cdot ' + C2 + ' = \\frac{' + K + '}{x}$ (đồng).',
          'd) Đúng: Xét $f(x) = ' + C1 + 'x + \\frac{' + K + '}{x}$ đạt cực tiểu tại $x \\approx ' + u.formatNumberVN(xCont, 1) + '$. So sánh $f(' + fl + ') = ' + Math.round(f(fl)) + '$ và $f(' + cl + ') = ' + Math.round(f(cl)) + '$, chọn $x = ' + xBest + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c1k = 0', params: { maxM: 12, rate: 752, hours: 210, c1k: 0, c2k: 115 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (12 server, 210h, 236k, 115k -> 10 máy)', params: { maxM: 12, rate: 752, hours: 210, c1k: 236, c2k: 115 }, expectedValid: true },
    ],
  },

  // Dạng 14 (Q14)
  t12_b5_d14_ad_profit_cubic_tf: {
    id: 't12_b5_d14_ad_profit_cubic_tf',
    name: 'Phân tích hàm lợi nhuận quảng cáo bậc ba P(x) = -(k/10)x³ + bx² + c (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Bài toán cực trị hàm bậc ba trong kinh tế',
    description:
      'Lợi nhuận P(x) = -(k/10)x³ + b·x² + c (nghìn USD) với 0 ≤ x ≤ Xmax. Kiểm tra khoảng tăng, tính duy nhất của phương án đạt P_max, số cực trị và giá trị P_max (triệu USD).',
    conditionSummary: 'x0 = 20·b/(3k) ∈ (0; Xmax) là điểm cực đại duy nhất trên [0; Xmax]',
    paramSpecs: [
      { name: 'k', label: 'Hệ số k trong -(k/10)x³', min: 1, max: 4 },
      { name: 'x0', label: 'Mức chi tối ưu x0', min: 20, max: 50, step: 10 },
      { name: 'c', label: 'Lợi nhuận nền c (nghìn USD)', min: 12000, max: 45000, step: 200 },
    ],
    validateCode: `
      const { k, x0, c } = params;
      if (k < 1 || k > 10) return { valid: false, reason: 'k phải thuộc [1; 10]' };
      if (x0 < 10 || x0 > 100) return { valid: false, reason: 'x0 phải thuộc [10; 100]' };
      if (c < 0 || c > 200000) return { valid: false, reason: 'c không hợp lệ' };
      if ((3 * k * x0) % 20 !== 0) return { valid: false, reason: 'Cần 3·k·x0 chia hết cho 20 để b nguyên' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { k, x0, c } = params;
      const b = (3 * k * x0) / 20;
      const xMax = 2 * x0;
      const fLead = u.simplifyFrac(-k, 10);
      const dLead = u.simplifyFrac(-3 * k, 10);
      const pMaxK = Math.round(-(k / 10) * x0 * x0 * x0 + b * x0 * x0 + c);
      const pMaxMil = u.simplifyFrac(pMaxK, 1000);

      const tfStatements = [
        {
          key: 'a',
          text: 'Lợi nhuận của công ty tăng khi số tiền chi cho quảng cáo tăng trên khoảng $(0;\\, ' + x0 + ')$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Có hai phương án chi tiền giúp công ty thu được lợi nhuận bằng $' + pMaxK + '$ nghìn USD.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Hàm số $P = P(x)$ có hai điểm cực trị trên khoảng $(0;\\, ' + xMax + ')$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Lợi nhuận tối đa mà công ty thu được bằng $' + pMaxMil.latex + '$ triệu USD.',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Lợi nhuận thu được $P$ (nghìn USD) của một công ty khi dùng số tiền $x$ (nghìn USD) chi cho quảng cáo được cho bởi công thức $P(x) = ' +
          fLead.latex +
          'x^3 + ' +
          b +
          'x^2 + ' +
          c +
          '$ với $0 \\le x \\le ' +
          xMax +
          '$. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:Đ, b:S, c:S, d:Đ',
        solutionSteps: [
          "a) Đúng: $P'(x) = " + dLead.latex + 'x^2 + ' + (2 * b) + 'x = x\\left(' + (2 * b) + dLead.latex + 'x\\right)$. Giải $P\'(x) > 0$ trên $(0;\\, ' + xMax + ')$ được $0 < x < ' + x0 + '$.',
          'b) Sai: Trên $[0;\\, ' + xMax + ']$, hàm số đạt cực đại duy nhất tại $x = ' + x0 + '$ và $P(' + x0 + ') = ' + pMaxK + '$ nghìn USD, nên phương trình $P(x) = ' + pMaxK + '$ chỉ có $1$ nghiệm.',
          "c) Sai: $P'(x) = 0 \\Leftrightarrow x = 0$ hoặc $x = " + x0 + '$. Trên khoảng $(0;\\, ' + xMax + ')$ hàm số chỉ có $1$ điểm cực trị là $x = ' + x0 + '$.',
          'd) Đúng: Lợi nhuận tối đa là $P(' + x0 + ') = ' + pMaxK + '$ nghìn USD $= ' + pMaxMil.latex + '$ triệu USD.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b không nguyên (k = 1, x0 = 10)', params: { k: 1, x0: 10, c: 20000 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc k = 3, x0 = 40, c = 39800', params: { k: 3, x0: 40, c: 39800 }, expectedValid: true },
    ],
  },

  // Dạng 15 (Q15)
  t12_b5_d15_coffee_price_increase_tf: {
    id: 't12_b5_d15_coffee_price_increase_tf',
    name: 'Bài toán quán cà phê tăng giá bán tối ưu lợi nhuận (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu doanh thu và lợi nhuận bán hàng',
    description:
      'Quán cà phê bán giá p0 (nghìn), vốn c0 (nghìn), bán n0 cốc/ngày. Tăng d nghìn giảm q cốc. Xét 4 khẳng định về lãi/cốc, lượng giảm, sản lượng mới và mức tăng tối ưu.',
    conditionSummary: 'n0 = r·(L0 + 2·xOpt) với r = q/d nguyên dương, L0 = p0 - c0 > 0, xOpt ∈ [4; 15]',
    paramSpecs: [
      { name: 'c0', label: 'Chi phí mỗi cốc (nghìn đ)', min: 12, max: 25 },
      { name: 'l0', label: 'Lãi ban đầu mỗi cốc (nghìn đ)', min: 6, max: 14 },
      { name: 'd', label: 'Bước tăng giá (nghìn đ)', min: 2, max: 4 },
      { name: 'r', label: 'Giảm cốc mỗi 1 nghìn tăng', min: 3, max: 8 },
      { name: 'xOpt', label: 'Mức tăng tối ưu (nghìn đ)', min: 5, max: 12 },
    ],
    validateCode: `
      const { c0, l0, d, r, xOpt } = params;
      if (c0 <= 0 || c0 > 200 || l0 <= 0 || l0 > 100) return { valid: false, reason: 'Chi phí và lãi ban đầu phải dương' };
      if (d < 1 || d > 20 || r < 1 || r > 50) return { valid: false, reason: 'Bước tăng và độ nhạy cầu không hợp lệ' };
      if (xOpt < 2 || xOpt > 30) return { valid: false, reason: 'xOpt phải thuộc [2; 30]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, l0, d, r, xOpt } = params;
      const p0 = c0 + l0;
      const q = d * r;
      const n0 = r * (l0 + 2 * xOpt);
      const wrongR = r + 5;
      const a2 = -r;
      const b1 = n0 - r * l0;
      const cConst = n0 * l0;
      const fPoly = u.formatQuadratic(a2, b1, cConst);
      const fDeriv = u.formatLinear(2 * a2, b1);

      const tfStatements = [
        {
          key: 'a',
          text: 'Nếu bán với giá $' + (p0 * 1000) + '$ đồng thì tiền lãi mỗi cốc cà phê là $' + (l0 * 1000) + '$ đồng.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Nếu tăng giá mỗi cốc cà phê thêm $x$ (nghìn đồng) thì số lượng tiêu thụ giảm đi $' + wrongR + 'x$ cốc/ngày.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Nếu tăng giá mỗi cốc cà phê thêm $x$ (nghìn đồng) thì số lượng bán ra mỗi ngày là $' + n0 + ' - ' + r + 'x$ cốc.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Để lợi nhuận thu về cao nhất cần tăng thêm $' + xOpt + '$ (nghìn đồng) mỗi cốc cà phê.',
          isTrue: true,
        },
      ];

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
          '$ đồng. Gọi số tiền cần tăng giá mỗi cốc cà phê là $x$ (đơn vị: nghìn đồng). Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:Đ, b:S, c:Đ, d:Đ',
        solutionSteps: [
          'a) Đúng: Tiền lãi mỗi cốc ban đầu là $' + (p0 * 1000) + ' - ' + (c0 * 1000) + ' = ' + (l0 * 1000) + '$ đồng.',
          'b) Sai: Tăng $' + d + '$ nghìn đồng giảm $' + q + '$ cốc nên tăng $x$ nghìn đồng thì giảm $\\frac{' + q + 'x}{' + d + '} = ' + r + 'x$ cốc/ngày.',
          'c) Đúng: Số lượng bán ra mỗi ngày sau khi tăng giá là $' + n0 + ' - ' + r + 'x$ (cốc).',
          'd) Đúng: Lợi nhuận $f(x) = (' + n0 + ' - ' + r + 'x)(' + l0 + ' + x) = ' + fPoly + '$. Giải $f\'(x) = ' + fDeriv + ' = 0 \\Leftrightarrow x = ' + xOpt + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên l0 = 0 (không có lãi ban đầu)', params: { c0: 14, l0: 0, d: 2, r: 4, xOpt: 8 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (giá 23k, vốn 14k, 100 cốc -> tăng 8k)', params: { c0: 14, l0: 9, d: 2, r: 4, xOpt: 8 }, expectedValid: true },
    ],
  },

  // Dạng 16 (Q16)
  t12_b5_d16_tshirt_price_increase_tf: {
    id: 't12_b5_d16_tshirt_price_increase_tf',
    name: 'Bài toán xưởng sản xuất áo thun tăng giá bán tối ưu lợi nhuận (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu doanh thu và lợi nhuận bán hàng',
    description:
      'Xưởng áo thun bán giá p0, vốn c0, tiêu thụ n0 chiếc/tháng. Tăng d nghìn đồng làm giảm q chiếc. Đánh giá 4 khẳng định về lãi/chiếc, lượng giảm, sản lượng và mức tăng tối ưu.',
    conditionSummary: 'n0 = r·(L0 + 2·xOpt), r = q/d nguyên dương, L0 = p0 - c0 > 0',
    paramSpecs: [
      { name: 'c0', label: 'Chi phí mỗi chiếc (nghìn đ)', min: 40, max: 65 },
      { name: 'l0', label: 'Lãi ban đầu (nghìn đ)', min: 45, max: 75 },
      { name: 'd', label: 'Bước tăng giá (nghìn đ)', min: 4, max: 6 },
      { name: 'r', label: 'Giảm áo mỗi 1 nghìn tăng', min: 6, max: 12 },
      { name: 'xOpt', label: 'Mức tăng tối ưu (nghìn đ)', min: 6, max: 16 },
    ],
    validateCode: `
      const { c0, l0, d, r, xOpt } = params;
      if (c0 <= 0 || c0 > 500 || l0 <= 0 || l0 > 500) return { valid: false, reason: 'Chi phí và lãi ban đầu phải dương' };
      if (d < 1 || d > 50 || r < 1 || r > 50) return { valid: false, reason: 'Bước tăng và độ nhạy cầu không hợp lệ' };
      if (xOpt < 2 || xOpt > 40) return { valid: false, reason: 'xOpt phải thuộc [2; 40]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { c0, l0, d, r, xOpt } = params;
      const p0 = c0 + l0;
      const q = d * r;
      const n0 = r * (l0 + 2 * xOpt);
      const a2 = -r;
      const b1 = n0 - r * l0;
      const cConst = n0 * l0;
      const fPoly = u.formatQuadratic(a2, b1, cConst);
      const fDeriv = u.formatLinear(2 * a2, b1);

      const tfStatements = [
        {
          key: 'a',
          text: 'Nếu bán với giá $' + (p0 * 1000) + '$ đồng thì tiền lãi mỗi chiếc áo là $' + (l0 * 1000) + '$ đồng.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Nếu tăng giá mỗi chiếc áo thêm $x$ (nghìn đồng) thì số lượng tiêu thụ giảm đi $' + r + 'x$ chiếc áo.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Nếu tăng giá mỗi chiếc áo thêm $x$ (nghìn đồng) thì số lượng bán ra mỗi tháng là $' + n0 + ' - ' + r + 'x$ chiếc áo.',
          isTrue: true,
        },
        {
          key: 'd',
          text: 'Để lợi nhuận thu về cao nhất cần tăng thêm $' + xOpt + '$ (nghìn đồng) mỗi chiếc áo.',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Một xưởng sản xuất bán áo thun với giá $' +
          (p0 * 1000) +
          '$ đồng một chiếc, mỗi tháng bán trung bình $' +
          n0 +
          '$ chiếc. Khảo sát cho thấy nếu giá bán tăng thêm $' +
          (d * 1000) +
          '$ đồng thì số lượng tiêu thụ giảm $' +
          q +
          '$ chiếc. Biết chi phí sản xuất một chiếc áo là $' +
          (c0 * 1000) +
          '$ đồng. Gọi số tiền cần tăng giá mỗi chiếc áo là $x$ (nghìn đồng). Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:Đ, b:Đ, c:Đ, d:Đ',
        solutionSteps: [
          'a) Đúng: Tiền lãi mỗi chiếc áo là $' + (p0 * 1000) + ' - ' + (c0 * 1000) + ' = ' + (l0 * 1000) + '$ đồng.',
          'b) Đúng: Tăng $' + d + '$ nghìn đồng thì giảm $' + q + '$ chiếc, nên tăng $x$ nghìn đồng giảm $\\frac{' + q + 'x}{' + d + '} = ' + r + 'x$ chiếc áo.',
          'c) Đúng: Tổng số áo bán ra mỗi tháng là $' + n0 + ' - ' + r + 'x$ chiếc áo.',
          'd) Đúng: Tổng lợi nhuận $f(x) = (' + n0 + ' - ' + r + 'x)(' + l0 + ' + x) = ' + fPoly + '$. Ta có $f\'(x) = ' + fDeriv + ' = 0 \\Leftrightarrow x = ' + xOpt + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c0 = 0', params: { c0: 0, l0: 69, d: 5, r: 10, xOpt: 9 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (giá 118k, vốn 49k, 870 chiếc -> tăng 9k)', params: { c0: 49, l0: 69, d: 5, r: 10, xOpt: 9 }, expectedValid: true },
    ],
  },

  // Dạng 17 (Q17)
  t12_b5_d17_fish_pond_tf: {
    id: 't12_b5_d17_fish_pond_tf',
    name: 'Bài toán nuôi cá giảm mật độ tối ưu sản lượng (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu sản lượng nông nghiệp',
    description:
      'Ao diện tích S m², mật độ d con/m², thu sản lượng N0·w0 kg. Giảm x lần k con giúp mỗi con tăng dw kg. Kiểm tra 4 khẳng định tìm lượng cá thả tối ưu.',
    conditionSummary: 'S ∈ [30; 90], d ∈ [12; 25], k ∈ [3; 9], dw ∈ {0,2; 0,3; 0,4; 0,5}, x_opt ≥ 10',
    paramSpecs: [
      { name: 'area', label: 'Diện tích ao S (m²)', min: 40, max: 80, step: 2 },
      { name: 'dens', label: 'Mật độ (con/m²)', min: 14, max: 22 },
      { name: 'w0Ten', label: 'Khối lượng 1 con · 10 (kg)', min: 10, max: 14 },
      { name: 'k', label: 'Số con giảm mỗi bước k', min: 4, max: 8 },
      { name: 'dwTen', label: 'Mức tăng trọng · 10 (kg)', min: 2, max: 5 },
    ],
    validateCode: `
      const { area, dens, w0Ten, k, dwTen } = params;
      if (area < 10 || area > 500 || dens < 5 || dens > 100) return { valid: false, reason: 'Diện tích hoặc mật độ không hợp lệ' };
      if (w0Ten < 5 || w0Ten > 50 || k < 1 || k > 30 || dwTen < 1 || dwTen > 20) return { valid: false, reason: 'Tham số sinh trưởng ngoài miền chuẩn' };
      const N0 = area * dens;
      const w0 = w0Ten / 10;
      const dw = dwTen / 10;
      const xCont = (N0 * dw - k * w0) / (2 * k * dw);
      if (xCont < 5 || N0 - k * Math.ceil(xCont) <= 10) return { valid: false, reason: 'Số lần giảm không hợp lệ' };
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
      const wrongN0 = N0 + 19;
      const wrongNBest = nBest + 5;

      const a2 = Number((-k * dw).toFixed(2));
      const b1 = Number((N0 * dw - k * w0).toFixed(2));
      const c0 = Number(W0.toFixed(2));
      const mExpr = u.formatNumberVN(a2, 2) + 'x^2 + ' + u.formatNumberVN(b1, 2) + 'x + ' + u.formatNumberVN(c0, 2);

      const tfStatements = [
        { key: 'a', text: 'Số cá của vụ vừa qua mà bác Vinh thả là $' + wrongN0 + '$ con.', isTrue: false },
        { key: 'b', text: 'Sau $x$ lần giảm đi $' + k + '$ con thì số cá thả mới là $' + N0 + ' - ' + k + 'x$.', isTrue: true },
        {
          key: 'c',
          text: 'Sau $x$ lần giảm đi $' + k + '$ con thì đến khi thu hoạch khối lượng mỗi con cá là $' + u.formatNumberVN(dw, 1) + 'x$ (kg).',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Để vụ tới thu được tổng sản lượng cá lớn nhất thì số lượng cá bác cần thả là $' + wrongNBest + '$ con.',
          isTrue: false,
        },
      ];

      return {
        stem:
          'Bác Vinh có một cái ao có diện tích $' +
          area +
          '\\text{ m}^2$ để nuôi cá. Vụ vừa qua bác nuôi với mật độ $' +
          dens +
          '$ con/$\\text{m}^2$ và thu được tất cả $' +
          u.formatNumberVN(W0, 1) +
          '$ kg cá thành phẩm. Theo kinh nghiệm nuôi cá, bác thấy cứ thả giảm đi $' +
          k +
          '$ con thì mỗi con cá thành phẩm thu được tăng thêm $' +
          u.formatNumberVN(dw, 1) +
          '$ kg. Gọi $x$ là số lần giảm đi $' +
          k +
          '$ con. Xét tính đúng-sai của các khẳng định sau:',
        tfStatements,
        answerSummary: 'a:S, b:Đ, c:S, d:S',
        solutionSteps: [
          'a) Sai: Số cá vụ vừa qua bác Vinh thả là $' + dens + ' \\cdot ' + area + ' = ' + N0 + '$ (con).',
          'b) Đúng: Giảm $x$ lần, mỗi lần $' + k + '$ con nên số cá thả mới là $' + N0 + ' - ' + k + 'x$ (con).',
          'c) Sai: Khối lượng trung bình mỗi con vụ trước là $\\frac{' + u.formatNumberVN(W0, 1) + '}{' + N0 + '} = ' + u.formatNumberVN(w0, 1) + '$ kg, nên khối lượng mới mỗi con là $(' + u.formatNumberVN(w0, 1) + ' + ' + u.formatNumberVN(dw, 1) + 'x)$ kg.',
          'd) Sai: Tổng sản lượng $M(x) = (' + N0 + ' - ' + k + 'x)(' + u.formatNumberVN(w0, 1) + ' + ' + u.formatNumberVN(dw, 1) + 'x) = ' + mExpr + '$. Đạt cực đại tại $x \\approx ' + u.formatNumberVN(xCont, 1) + ' \\Rightarrow x_{\\text{nguyên}} = ' + xBest + '$, nên số cá cần thả là $' + N0 + ' - ' + k + ' \\cdot ' + xBest + ' = ' + nBest + '$ con.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên k = 0', params: { area: 60, dens: 18, w0Ten: 12, k: 0, dwTen: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (S=60, d=18, w0=1.2, k=5, dw=0.3 -> 550 con)', params: { area: 60, dens: 18, w0Ten: 12, k: 5, dwTen: 3 }, expectedValid: true },
    ],
  },

  // Dạng 18 (Q18)
  t12_b5_d18_hexagon_pyramid_tf: {
    id: 't12_b5_d18_hexagon_pyramid_tf',
    name: 'Bài toán cắt tấm bìa lục giác đều gấp khối chóp lục giác đều (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu thể tích khối chóp đa giác đều',
    description:
      'Từ lục giác đều ABCDEF cạnh a, cắt 6 tam giác cân quanh lục giác đều nhỏ bên trong có khoảng cách tâm đến cạnh OM = x rồi gấp thành khối chóp lục giác đều.',
    conditionSummary: 'a ∈ [4; 12] chẵn để biểu thức cạnh đáy, đường cao và thể tích lớn nhất đẹp',
    paramSpecs: [
      { name: 'a', label: 'Cạnh lục giác đều a (cm)', min: 4, max: 12, step: 2 },
    ],
    validateCode: `
      const { a } = params;
      if (a < 2 || a > 40) return { valid: false, reason: 'Cạnh lục giác đều a phải thuộc [2; 40] cm' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a } = params;
      const aSq = a * a;
      const twoA = 2 * a;
      const wrongA = a + 2;
      const vMaxCoeff = u.simplifyFrac(8 * a * a * a, 375);
      const vMaxLatex = (vMaxCoeff.num === 1 ? '' : vMaxCoeff.num) + '\\sqrt{15}' + (vMaxCoeff.den === 1 ? '' : '');
      const vMaxFull = vMaxCoeff.den === 1 ? vMaxLatex : '\\frac{' + (vMaxCoeff.num === 1 ? '' : vMaxCoeff.num) + '\\sqrt{15}}{' + vMaxCoeff.den + '}';
      const xOpt = u.simplifyFrac(2 * a, 5);

      const tfStatements = [
        {
          key: 'a',
          text: 'Cạnh đáy của khối chóp lục giác đều bằng $\\frac{2x\\sqrt{3}}{3}$ (cm).',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Thể tích lớn nhất của khối chóp lục giác đều có thể đạt được là $' + vMaxFull + '\\text{ (cm}^3\\text{)}$.',
          isTrue: true,
        },
        {
          key: 'c',
          text: 'Đường cao của khối chóp lục giác đều bằng $\\sqrt{' + aSq + ' - ' + a + 'x}$ (cm).',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Tam giác $OAB$ đều có cạnh bằng $' + a + '$ cm.',
          isTrue: true,
        },
      ];

      return {
        stem:
          'Từ một tấm bìa mỏng hình lục giác đều $ABCDEF$ cạnh $' +
          a +
          '$ cm, bên trong có một lục giác đều nhỏ hơn. Các đường chéo $AD, BE, CF$ cắt nhau tại $O$, cắt cạnh lục giác đều nhỏ tại $M$. Đặt $OM = x$ (cm, $0 < x < ' +
          u.simplifyFrac(a, 2).latex +
          '$). Người ta cắt bỏ $6$ tam giác cân ở phía ngoài rồi gấp lên sao cho các đỉnh $A, B, C, D, E, F$ trùng nhau tạo thành một khối chóp lục giác đều. Xét tính đúng-sai của các khẳng định sau:',
        diagram: { kind: 'geometry_figure', figureType: 'hexagon_pyramid_cut', params: { a } },
        tfStatements,
        answerSummary: 'a:Đ, b:Đ, c:S, d:Đ',
        solutionSteps: [
          'a) Đúng: Đáy khối chóp là lục giác đều có khoảng cách từ tâm $O$ đến cạnh bằng $OM = x$, nên độ dài cạnh đáy là $b = 2x\\tan 30^\\circ = \\frac{2x\\sqrt{3}}{3}$ (cm).',
          'b) Đúng: Diện tích đáy $B = 6 \\cdot \\frac{1}{2} b \\cdot x = 2\\sqrt{3}x^2$, trung đoạn mặt bên là $AM = ' + a + ' - x$, đường cao $h = \\sqrt{(' + a + ' - x)^2 - x^2} = \\sqrt{' + aSq + ' - ' + twoA + 'x}$. Thể tích $V(x) = \\frac{2\\sqrt{3}}{3} x^2\\sqrt{' + aSq + ' - ' + twoA + 'x}$ đạt cực đại tại $x = ' + xOpt.latex + '$ cho $V_{\\max} = ' + vMaxFull + '\\text{ cm}^3$.',
          'c) Sai: Như đã tính ở trên, đường cao khối chóp là $h = \\sqrt{' + aSq + ' - ' + twoA + 'x}$ (cm), không phải $\\sqrt{' + aSq + ' - ' + a + 'x}$.',
          'd) Đúng: Vì $ABCDEF$ là lục giác đều cạnh $' + a + '$ cm nên $OA = OB = AB = ' + a + '$ cm, suy ra $\\triangle OAB$ đều cạnh $' + a + '$ cm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a = 0 (suy biến)', params: { a: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a = 4 cm (V_max = 512√15 / 375)', params: { a: 4 }, expectedValid: true },
    ],
  },

  // Dạng 19 (Q19)
  t12_b5_d19_lantern_pyramid_tf: {
    id: 't12_b5_d19_lantern_pyramid_tf',
    name: 'Bài toán uốn dây đồng làm đèn lồng chóp tứ giác đều (Đúng-Sai)',
    category: 'TF',
    level: 'Vận dụng',
    topicTag: 'Tối ưu thể tích khung dây hình chóp đều',
    description:
      'Sợi dây đồng dài 4L dm uốn làm 4 cạnh đáy (hình vuông cạnh x) và 4 cạnh bên bằng nhau l = L - x của chóp tứ giác đều S.ABCD. Đánh giá 4 khẳng định.',
    conditionSummary: 'L ∈ [5; 12] dm (tổng dây 20..48 dm), chọn x0 chẵn thỏa mãn (L - x0)² > x0²/2',
    paramSpecs: [
      { name: 'L', label: 'Nửa tổng cạnh L = (dây)/4 (dm)', min: 6, max: 11 },
    ],
    validateCode: `
      const { L } = params;
      if (L < 4 || L > 30) return { valid: false, reason: 'Tham số L phải thuộc [4; 30] dm' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { L } = params;
      const totalWire = 4 * L;
      // Pick even x0 such that (L - x0)^2 - x0^2 / 2 > 0 (since 2*x0 < 2*L/(1 + 1/sqrt(2)) ≈ 0.5857*L)
      let x0 = Math.floor(0.55 * L);
      if (x0 % 2 !== 0) x0 = Math.max(2, x0 - 1);
      const hSqAtX0 = (L - x0) * (L - x0) - (x0 * x0) / 2;
      const hValAtX0 = Math.sqrt(hSqAtX0);
      const hTrueStr = Number.isInteger(hValAtX0) ? '' + hValAtX0 : '\\sqrt{' + hSqAtX0 + '}';
      const hWrong = Number.isInteger(hValAtX0) ? '' + (hValAtX0 + 2) : '' + Math.ceil(hValAtX0 + 1);

      const xEq = Number((L / 2).toFixed(1));
      const areaEqCoeff = u.simplifyFrac(L * L, 4);
      const wrongAreaCoeff = areaEqCoeff.isInteger ? areaEqCoeff.num + 1 : Math.floor(areaEqCoeff.value) + 1;

      const xOpt = ((5 - Math.sqrt(13)) * L) / 3;
      const xOptWrong = Number((xOpt - 1.23).toFixed(2));
      const xOptStr = u.formatNumberVN(Number(xOpt.toFixed(2)), 2);
      const xOptWrongStr = u.formatNumberVN(xOptWrong, 2);

      const tfStatements = [
        {
          key: 'a',
          text: 'Độ dài cạnh bên của khung đèn bằng $(' + L + ' - x)$ dm với $0 < x < ' + L + '$.',
          isTrue: true,
        },
        {
          key: 'b',
          text: 'Khi $x = ' + x0 + '$ thì độ dài đường cao của khung đèn là $' + hWrong + '$ dm.',
          isTrue: false,
        },
        {
          key: 'c',
          text: 'Khi các cạnh bằng nhau thì diện tích giấy màu cần dùng là $' + wrongAreaCoeff + '\\sqrt{3}$ $\\text{dm}^2$.',
          isTrue: false,
        },
        {
          key: 'd',
          text: 'Thể tích phần không gian của đèn lồng lớn nhất khi $x \\approx ' + xOptWrongStr + '$ dm.',
          isTrue: false,
        },
      ];

      return {
        stem:
          'Bạn An làm đèn lồng bằng cách dùng một sợi dây đồng dài $' +
          totalWire +
          '$ dm cắt thành ba đoạn để uốn làm khung đèn. Đoạn thứ nhất uốn thành hình vuông $ABCD$ có cạnh bằng $x$ (dm) để làm đáy, hai đoạn còn lại có độ dài bằng nhau uốn thành các đường gấp khúc $ASC$ và $BSD$. Khung đèn hoàn thiện là hình chóp tứ giác đều $S.ABCD$ và bề mặt xung quanh được dán giấy màu (không dán mặt đáy). Xét tính đúng-sai của các khẳng định sau:',
        diagram: { kind: 'geometry_figure', figureType: 'lantern_frame', params: { L } },
        tfStatements,
        answerSummary: 'a:Đ, b:S, c:S, d:S',
        solutionSteps: [
          'a) Đúng: Khung có $4$ cạnh đáy bằng $x$ và $4$ cạnh bên bằng $l$. Do $4x + 4l = ' + totalWire + '$ nên $l = ' + L + ' - x$ ($0 < x < ' + L + '$).',
          'b) Sai: Chiều cao khối chóp là $h = \\sqrt{(' + L + ' - x)^2 - \\frac{x^2}{2}}$. Tại $x = ' + x0 + '$ ta được $h = ' + hTrueStr + '$ dm (không phải $' + hWrong + '$ dm).',
          'c) Sai: Khi tất cả các cạnh bằng nhau thì $x = ' + L + ' - x \\Leftrightarrow x = ' + u.formatNumberVN(xEq, 1) + '$ dm. Diện tích $4$ mặt bên tam giác đều là $S = 4 \\cdot \\frac{x^2\\sqrt{3}}{4} = ' + areaEqCoeff.latex + '\\sqrt{3}$ $\\text{dm}^2$.',
          'd) Sai: $V(x) = \\frac{1}{3} x^2 \\sqrt{(' + L + ' - x)^2 - \\frac{x^2}{2}}$. Khảo sát $g(x) = x^4\\left(\\frac{1}{2}x^2 - ' + (2 * L) + 'x + ' + (L * L) + '\\right)$ trên $(0;\\, ' + L + ')$, đạo hàm triệt tiêu tại $x = \\frac{' + (5 * L) + ' - \\sqrt{' + (13 * L * L) + '}}{3} \\approx ' + xOptStr + '$ dm.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên L quá nhỏ (L = 2)', params: { L: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc L = 7 (tổng dây 28 dm, x_opt ≈ 3,25 dm)', params: { L: 7 }, expectedValid: true },
    ],
  },

  // =====================================================================
  // PHẦN III. TRẢ LỜI NGẮN (35 DẠNG: DẠNG 20 -> DẠNG 54)
  // Dạng 20 -> Dạng 27 trong Part 1
  // =====================================================================

  // Dạng 20 (Q20)
  t12_b5_d20_avg_cost_limit_sa: {
    id: 't12_b5_d20_avg_cost_limit_sa',
    name: 'Tìm giới hạn chi phí trung bình khi sản lượng rất lớn (x → +∞)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Giới hạn thực tiễn của chi phí trung bình',
    description:
      'Tổng chi phí T(x) = F0 + c·x (chi phí thiết lập ban đầu F0 và chi phí biên c). Tính lim_{x -> +∞} T(x)/x.',
    conditionSummary: 'F0 > 0, c > 0 nguyên',
    paramSpecs: [
      { name: 'f0k', label: 'Chi phí thiết lập (nghìn USD)', min: 20, max: 85 },
      { name: 'c', label: 'Chi phí nguyên liệu/sp (USD)', min: 4, max: 25 },
    ],
    validateCode: `
      const { f0k, c } = params;
      if (f0k <= 0 || f0k > 500 || c <= 0 || c > 200) return { valid: false, reason: 'Chi phí F0 và c phải dương hợp lý' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { f0k, c } = params;
      const F0 = f0k * 1000;
      return {
        stem:
          'Tại một công ty sản xuất máy bay mô hình, công ty phải chi $' +
          F0 +
          '$ USD để thiết lập dây chuyền sản xuất ban đầu. Sau đó, cứ sản xuất được một sản phẩm đồ chơi, công ty phải chi trả $' +
          c +
          '$ USD cho nguyên liệu thô và nhân công. Gọi $x\\, (x \\ge 1)$ là số máy bay mô hình đã sản xuất và $T(x)$ (USD) là tổng chi phí, $M(x) = \\frac{T(x)}{x}$ là chi phí trung bình cho mỗi sản phẩm. Khi $x$ đủ lớn ($x \\to +\\infty$) thì chi phí trung bình (USD) cho mỗi sản phẩm là bao nhiêu?',
        shortAnswer: '' + c,
        numericValue: c,
        answerSummary: c + ' USD',
        solutionSteps: [
          'Tổng chi phí sản xuất $x$ sản phẩm là $T(x) = ' + F0 + ' + ' + c + 'x$.',
          'Chi phí trung bình cho mỗi sản phẩm là $M(x) = \\frac{' + F0 + ' + ' + c + 'x}{x} = ' + c + ' + \\frac{' + F0 + '}{x}$.',
          'Khi $x \\to +\\infty$, $\\lim_{x \\to +\\infty} M(x) = \\lim_{x \\to +\\infty}\\left(' + c + ' + \\frac{' + F0 + '}{x}\\right) = ' + c + '$ (USD).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c = 0', params: { f0k: 43, c: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc F0 = 43000, c = 8', params: { f0k: 43, c: 8 }, expectedValid: true },
    ],
  },

  // Dạng 21 (Q21)
  t12_b5_d21_cubic_avg_cost_val_sa: {
    id: 't12_b5_d21_cubic_avg_cost_val_sa',
    name: 'Tính chi phí trung bình từ hàm tổng chi phí bậc ba tại x0',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Chi phí trung bình trong kinh tế',
    description:
      'Cho hàm tổng chi phí bậc ba C(x) = a·x³ - b·x² + c·x + d (nghìn đồng). Tính chi phí trung bình C(x0)/x0 làm tròn đến hàng đơn vị.',
    conditionSummary: 'a = a1000/1000 > 0, b = b10/10 > 0, x0 ≥ 10, C(x) > 0',
    paramSpecs: [
      { name: 'a1000', label: 'Hệ số a·1000', min: 55, max: 115 },
      { name: 'b10', label: 'Hệ số b·10', min: 12, max: 32 },
      { name: 'c', label: 'Hệ số c', min: 18, max: 45 },
      { name: 'd', label: 'Hằng số d', min: 1200, max: 3200, step: 37 },
      { name: 'x0', label: 'Số lượng x0', min: 18, max: 30 },
    ],
    validateCode: `
      const { a1000, b10, c, d, x0 } = params;
      if (a1000 <= 0 || a1000 > 500 || b10 <= 0 || b10 > 100) return { valid: false, reason: 'Hệ số a, b phải dương và trong miền hợp lý' };
      if (c <= 0 || c > 200 || d <= 0 || d > 20000) return { valid: false, reason: 'Hệ số c, d phải dương' };
      if (x0 < 5 || x0 > 100) return { valid: false, reason: 'x0 phải thuộc [5; 100]' };
      const a = a1000 / 1000;
      const b = b10 / 10;
      const val = a * x0 * x0 - b * x0 + c + d / x0;
      if (val <= 0) return { valid: false, reason: 'Chi phí trung bình phải dương' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a1000, b10, c, d, x0 } = params;
      const a = Number((a1000 / 1000).toFixed(3));
      const b = Number((b10 / 10).toFixed(1));
      const avg = a * x0 * x0 - b * x0 + c + d / x0;
      const ans = Math.round(avg);
      const cExpr = u.formatNumberVN(a, 3) + 'x^3 - ' + u.formatNumberVN(b, 1) + 'x^2 + ' + c + 'x + ' + d;

      return {
        stem:
          'Giả sử chi phí để sản xuất $x$ đơn vị hàng hóa $Y$ là $C(x) = ' +
          cExpr +
          '$ (nghìn đồng). Tính chi phí trung bình (nghìn đồng) để sản xuất $' +
          x0 +
          '$ đơn vị hàng hóa $Y$ (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: '' + ans,
        numericValue: ans,
        answerSummary: ans + ' nghìn đồng',
        solutionSteps: [
          'Hàm chi phí trung bình là $\\overline{C}(x) = \\frac{C(x)}{x} = \\frac{' + cExpr + '}{x}$.',
          'Thay $x = ' + x0 + '$ ta có $\\overline{C}(' + x0 + ') = ' + u.formatNumberVN(a, 3) + '\\cdot' + x0 + '^2 - ' + u.formatNumberVN(b, 1) + '\\cdot' + x0 + ' + ' + c + ' + \\frac{' + d + '}{' + x0 + '} \\approx ' + ans + '$ (nghìn đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên x0 = 0 (chia cho 0)', params: { a1000: 87, b10: 21, c: 29, d: 2361, x0: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (a=0.087, b=2.1, c=29, d=2361, x0=24 -> 127)', params: { a1000: 87, b10: 21, c: 29, d: 2361, x0: 24 }, expectedValid: true },
    ],
  },

  // Dạng 22 (Q22)
  t12_b5_d22_fuel_optimal_speed_sa: {
    id: 't12_b5_d22_fuel_optimal_speed_sa',
    name: 'Tìm tốc độ trung bình để tiết kiệm chi phí xăng nhất',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tối ưu chi phí nhiên liệu giao thông',
    description:
      'Chi phí xăng C(v) = a·v/k + b/(k·v) với 0 < v ≤ Vmax. Thiết lập b = a·v0² để đạt cực tiểu tại tốc độ nguyên đẹp v0.',
    conditionSummary: 'gcd(a, k) = 1, v0 ∈ [45; 85], Vmax ≥ v0 + 20',
    paramSpecs: [
      { name: 'a', label: 'Hệ số tử a', min: 2, max: 7 },
      { name: 'k', label: 'Mẫu số k', min: 3, max: 9 },
      { name: 'v0', label: 'Tốc độ tối ưu v0 (km/h)', min: 45, max: 85 },
    ],
    validateCode: `
      const { a, k, v0 } = params;
      if (a <= 0 || a > 20 || k <= 1 || k > 20) return { valid: false, reason: 'Hệ số a, k không hợp lệ' };
      if (v0 < 20 || v0 > 130) return { valid: false, reason: 'Tốc độ tối ưu v0 phải thuộc [20; 130] km/h' };
      if (u.gcd(a, k) !== 1) return { valid: false, reason: 'Cần gcd(a, k) = 1 để phân số tối giản' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, k, v0 } = params;
      const b = a * v0 * v0;
      const vMax = Math.max(120, v0 + 40);
      const t1 = u.simplifyFrac(a, k);
      const t2 = u.simplifyFrac(b, k);
      const cExpr = '\\frac{' + a + 'v}{' + k + '} + \\frac{' + b + '}{' + k + 'v}';
      const minCost = u.simplifyFrac(2 * a * v0, k);

      return {
        stem:
          'Giả sử chi phí tiền xăng $C$ (nghìn đồng) phụ thuộc vào tốc độ trung bình $v$ (km/h), được tính theo công thức $C(v) = ' +
          cExpr +
          '$ với $0 < v \\le ' +
          vMax +
          '$. Tài xế xe tải cần lái xe với tốc độ trung bình (km/h) bằng bao nhiêu để tiết kiệm tiền xăng nhất?',
        shortAnswer: '' + v0,
        numericValue: v0,
        answerSummary: v0 + ' km/h',
        solutionSteps: [
          "Đạo hàm $C'(v) = " + t1.latex + ' - \\frac{' + b + '}{' + k + 'v^2} = \\frac{' + a + 'v^2 - ' + b + '}{' + k + 'v^2}$.',
          "Giải $C'(v) = 0$ với $v > 0$: $v^2 = \\frac{" + b + '}{' + a + '} = ' + (v0 * v0) + ' \\Leftrightarrow v = ' + v0 + ' \\in (0;\\, ' + vMax + ']$.',
          "Trên $(0;\\, " + v0 + ')$ thì $C\'(v) < 0$, trên $(' + v0 + ';\\, ' + vMax + ']$ thì $C\'(v) > 0$, nên chi phí nhỏ nhất bằng $' + minCost.latex + '$ nghìn đồng khi $v = ' + v0 + '$ km/h.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên gcd(a, k) ≠ 1', params: { a: 4, k: 6, v0: 60 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc a=5, k=7, v0=68 (b = 23120)', params: { a: 5, k: 7, v0: 68 }, expectedValid: true },
    ],
  },

  // Dạng 23 (Q23)
  t12_b5_d23_stone_avg_cost_min_sa: {
    id: 't12_b5_d23_stone_avg_cost_min_sa',
    name: 'Tìm sản lượng x để chi phí trung bình xưởng đá thấp nhất',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Tối ưu sản lượng công nghiệp',
    description:
      'Chi phí sản xuất đá C(x) = F0 + c1·x + c2·x² (0 < x ≤ Xmax). Tìm sản lượng x để chi phí trung bình C(x)/x nhỏ nhất (làm tròn đến hàng phần mười).',
    conditionSummary: 'F0 ∈ [3; 12], c2 ∈ [0,001; 0,006], điểm cực tiểu x0 = √(F0/c2) ≤ Xmax',
    paramSpecs: [
      { name: 'f0', label: 'Chi phí cố định (triệu đ)', min: 4, max: 12 },
      { name: 'c1Ten', label: 'Biến phí bậc 1 · 10', min: 2, max: 8 },
      { name: 'c2Th', label: 'Hệ số bảo dưỡng · 1000', min: 2, max: 5 },
    ],
    validateCode: `
      const { f0, c1Ten, c2Th } = params;
      if (f0 <= 0 || f0 > 100 || c1Ten <= 0 || c1Ten > 50 || c2Th <= 0 || c2Th > 50) {
        return { valid: false, reason: 'Các hệ số chi phí phải dương và hợp lý' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { f0, c1Ten, c2Th } = params;
      const c1 = Number((c1Ten / 10).toFixed(1));
      const c2 = Number((c2Th / 1000).toFixed(3));
      const xSq = Math.round((f0 * 1000) / c2Th);
      const xCont = Math.sqrt(f0 / c2);
      const xMax = Math.ceil(xCont) + 15;
      const ans = Number(xCont.toFixed(1));
      const ansStr = u.formatNumberVN(ans, 1);
      const c1Str = u.formatNumberVN(c1, 1);
      const c2Str = u.formatNumberVN(c2, 3);
      const xSqFrac = u.simplifyFrac(f0 * 1000, c2Th);

      return {
        stem:
          'Tại một xưởng sản xuất sản phẩm từ đá, chi phí để sản xuất $x\\text{ (m}^3\\text{)}$ sản phẩm mỗi tháng là $C(x) = ' +
          f0 +
          ' + ' +
          c1Str +
          'x + ' +
          c2Str +
          'x^2$ (triệu đồng) với $0 < x \\le ' +
          xMax +
          '$. Chi phí trung bình là $\\overline{C}(x) = \\frac{C(x)}{x}$. Mỗi tháng xưởng cần sản xuất bao nhiêu mét khối sản phẩm để chi phí trung bình là thấp nhất (làm tròn đến hàng phần mười)?',
        shortAnswer: ansStr,
        numericValue: ans,
        answerSummary: ansStr + ' m³',
        solutionSteps: [
          'Chi phí trung bình trên mỗi mét khối sản phẩm là $\\overline{C}(x) = \\frac{' + f0 + '}{x} + ' + c1Str + ' + ' + c2Str + 'x$.',
          "Đạo hàm $\\overline{C}'(x) = -\\frac{" + f0 + '}{x^2} + ' + c2Str + ' = 0 \\Leftrightarrow x^2 = ' + xSqFrac.latex + ' \\Rightarrow x = \\sqrt{' + xSqFrac.latex + '} \\approx ' + ansStr + '\\text{ (m}^3\\text{)}$ (thỏa mãn $0 < x \\le ' + xMax + '$).',
          'Lập bảng biến thiên trên $(0;\\, ' + xMax + ']$, ta kết luận chi phí trung bình thấp nhất khi sản xuất $x \\approx ' + ansStr + '\\text{ m}^3$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c2Th = 0 (chia cho 0)', params: { f0: 6, c1Ten: 3, c2Th: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc f0=6, c1=0.3, c2=0.002 -> x ≈ 54,8', params: { f0: 6, c1Ten: 3, c2Th: 2 }, expectedValid: true },
    ],
  },

  // Dạng 24 (Q24)
  t12_b5_d24_tuition_max_revenue_sa: {
    id: 't12_b5_d24_tuition_max_revenue_sa',
    name: 'Tìm số học sinh để doanh thu học phí đạt lớn nhất',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Cực đại hàm doanh thu bậc hai',
    description:
      'Mỗi học sinh nộp học phí (A - B·x) nghìn đồng khi lớp có x học sinh. Thiết lập A = 2·B·x0 để tổng học phí đạt cực đại tại số nguyên x0.',
    conditionSummary: 'B ∈ [6; 22], x0 ∈ [25; 65] nguyên dương',
    paramSpecs: [
      { name: 'b', label: 'Hệ số giảm học phí B', min: 7, max: 20 },
      { name: 'x0', label: 'Số học sinh tối ưu x0', min: 25, max: 60 },
    ],
    validateCode: `
      const { b, x0 } = params;
      if (b <= 0 || b > 100 || x0 < 5 || x0 > 200) return { valid: false, reason: 'Tham số B và x0 không hợp lệ' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { b, x0 } = params;
      const A = 2 * b * x0;
      const maxRevVnd = b * x0 * x0 * 1000;
      return {
        stem:
          'Một trung tâm dạy các lớp học kỹ năng sống thu học phí cho mỗi học sinh được tính theo quy luật: nếu lớp có $x$ học sinh thì mỗi em nộp học phí là $' +
          A +
          ' - ' +
          b +
          'x$ (nghìn đồng). Hỏi lớp nên có bao nhiêu học sinh để trung tâm thu được nhiều học phí nhất?',
        shortAnswer: '' + x0,
        numericValue: x0,
        answerSummary: x0 + ' học sinh',
        solutionSteps: [
          'Tổng học phí thu được khi lớp có $x$ học sinh là $f(x) = x(' + A + ' - ' + b + 'x) = -' + b + 'x^2 + ' + A + 'x$ (nghìn đồng).',
          "Đạo hàm $f'(x) = " + A + ' - ' + (2 * b) + 'x = 0 \\Leftrightarrow x = ' + x0 + '$.',
          'Vì parabol có hệ số bậc hai âm nên $f(x)$ đạt giá trị lớn nhất là $' + maxRevVnd + '$ đồng khi lớp có $' + x0 + '$ học sinh.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên B = 0', params: { b: 0, x0: 46 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc B=13, x0=46 (A = 1196)', params: { b: 13, x0: 46 }, expectedValid: true },
    ],
  },

  // Dạng 25 (Q25)
  t12_b5_d25_construction_avg_cost_val_sa: {
    id: 't12_b5_d25_construction_avg_cost_val_sa',
    name: 'Tìm chi phí trung bình nhỏ nhất tại xí nghiệp vật liệu xây dựng',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Giá trị nhỏ nhất hàm chi phí trung bình',
    description:
      'Tổng chi phí C(x) = F0 + c1·x + c2·x² với 0 < x ≤ Xmax. Tính giá trị nhỏ nhất của chi phí trung bình C(x)/x (làm tròn đến hàng phần trăm).',
    conditionSummary: 'F0 ∈ [3; 10], c1 ∈ [0,3; 1,2], c2 ∈ [0,002; 0,009], đảm bảo x0 = √(F0/c2) ≤ Xmax',
    paramSpecs: [
      { name: 'f0', label: 'Chi phí cố định (triệu đ)', min: 3, max: 9 },
      { name: 'c1Ten', label: 'Hệ số c1·10', min: 4, max: 11 },
      { name: 'c2Th', label: 'Hệ số c2·1000', min: 3, max: 8 },
    ],
    validateCode: `
      const { f0, c1Ten, c2Th } = params;
      if (f0 <= 0 || f0 > 100 || c1Ten <= 0 || c1Ten > 50 || c2Th <= 0 || c2Th > 50) {
        return { valid: false, reason: 'Các hệ số chi phí phải dương và hợp lý' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { f0, c1Ten, c2Th } = params;
      const c1 = Number((c1Ten / 10).toFixed(1));
      const c2 = Number((c2Th / 1000).toFixed(3));
      const xCont = Math.sqrt(f0 / c2);
      const xMax = Math.ceil(xCont) + 14;
      const minCost = Number((c1 + 2 * Math.sqrt(f0 * c2)).toFixed(2));
      const minStr = u.formatNumberVN(minCost, 2);
      const c1Str = u.formatNumberVN(c1, 1);
      const c2Str = u.formatNumberVN(c2, 3);
      const xSqFrac = u.simplifyFrac(f0 * 1000, c2Th);

      return {
        stem:
          'Tại một xí nghiệp chuyên sản xuất vật liệu xây dựng, nếu trong một ngày xí nghiệp sản xuất $x\\text{ (m}^3\\text{)}$ sản phẩm thì tổng chi phí (triệu đồng) gồm $' +
          f0 +
          '$ triệu đồng cố định, $' +
          c1Str +
          '$ triệu đồng cho mỗi mét khối sản phẩm và $' +
          c2Str +
          'x^2$ triệu đồng bảo dưỡng máy móc. Biết mỗi ngày xí nghiệp sản xuất tối đa $' +
          xMax +
          '\\text{ m}^3$ sản phẩm. Tìm chi phí trung bình (triệu đồng) trên mỗi mét khối sản phẩm thấp nhất (làm tròn đến hàng phần trăm).',
        shortAnswer: minStr,
        numericValue: minCost,
        answerSummary: minStr + ' triệu đồng',
        solutionSteps: [
          'Tổng chi phí: $C(x) = ' + f0 + ' + ' + c1Str + 'x + ' + c2Str + 'x^2$ với $0 < x \\le ' + xMax + '$.',
          'Chi phí trung bình: $\\overline{C}(x) = \\frac{' + f0 + '}{x} + ' + c1Str + ' + ' + c2Str + 'x$.',
          "Giải $\\overline{C}'(x) = -\\frac{" + f0 + '}{x^2} + ' + c2Str + ' = 0 \\Rightarrow x = \\sqrt{' + xSqFrac.latex + '} \\approx ' + u.formatNumberVN(xCont, 1) + ' \\le ' + xMax + '$.',
          'Vậy chi phí trung bình thấp nhất là $\\overline{C}\\left(\\sqrt{' + xSqFrac.latex + '}\\right) = ' + c1Str + ' + 2\\sqrt{' + f0 + ' \\cdot ' + c2Str + '} \\approx ' + minStr + '$ (triệu đồng).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên c2Th = 0', params: { f0: 4, c1Ten: 6, c2Th: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc f0=4, c1=0.6, c2=0.006 -> 0,91', params: { f0: 4, c1Ten: 6, c2Th: 6 }, expectedValid: true },
    ],
  },

  // Dạng 26 (Q26)
  t12_b5_d26_oil_wells_integer_sa: {
    id: 't12_b5_d26_oil_wells_integer_sa',
    name: 'Tìm số giếng dầu cần khai thác thêm để sản lượng đạt lớn nhất',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Tối ưu nguyên hàm bậc hai trong công nghiệp',
    description:
      'Có w0 giếng dầu, mỗi giếng cho q0 thùng/ngày. Khai thác thêm 1 giếng thì mỗi giếng giảm d thùng/ngày. Tìm số giếng nguyên cần thêm để sản lượng lớn nhất.',
    conditionSummary: 'w0 ∈ [5; 14], q0 ∈ [100; 220], d ∈ [3; 7], đảm bảo cực đại nguyên dương duy nhất',
    paramSpecs: [
      { name: 'w0', label: 'Số giếng ban đầu w0', min: 6, max: 12 },
      { name: 'q0', label: 'Sản lượng/giếng ban đầu', min: 120, max: 200, step: 2 },
      { name: 'd', label: 'Mức giảm mỗi giếng thêm', min: 3, max: 6 },
    ],
    validateCode: `
      const { w0, q0, d } = params;
      if (w0 < 2 || w0 > 50 || q0 < 20 || q0 > 1000 || d < 1 || d > 50) return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      const xCont = (q0 - w0 * d) / (2 * d);
      if (xCont < 3 || xCont > 100) return { valid: false, reason: 'Số giếng cần thêm phải ≥ 3' };
      const fl = Math.floor(xCont);
      const cl = Math.ceil(xCont);
      const f = (x) => (w0 + x) * (q0 - d * x);
      if (fl !== cl && f(fl) === f(cl)) return { valid: false, reason: 'Hai giá trị nguyên lân cận có cùng sản lượng' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { w0, q0, d } = params;
      const xCont = (q0 - w0 * d) / (2 * d);
      const fl = Math.floor(xCont);
      const cl = Math.ceil(xCont);
      const f = (x) => (w0 + x) * (q0 - d * x);
      const xBest = f(fl) >= f(cl) ? fl : cl;
      const a2 = -d;
      const b1 = q0 - w0 * d;
      const c0 = w0 * q0;
      const fPoly = u.formatQuadratic(a2, b1, c0);
      const fDeriv = u.formatLinear(2 * a2, b1);
      const xFrac = u.simplifyFrac(b1, 2 * d);

      return {
        stem:
          'Một công ty tiến hành khai thác $' +
          w0 +
          '$ giếng dầu trong khu vực được chỉ định. Trung bình mỗi giếng dầu chiết xuất được $' +
          q0 +
          '$ thùng dầu mỗi ngày. Nếu cứ khai thác thêm $1$ giếng thì lượng dầu mỗi giếng chiết xuất hằng ngày sẽ giảm $' +
          d +
          '$ thùng. Hỏi công ty cần khai thác thêm bao nhiêu giếng dầu để tổng sản lượng dầu chiết xuất mỗi ngày đạt lớn nhất?',
        shortAnswer: '' + xBest,
        numericValue: xBest,
        answerSummary: xBest + ' giếng',
        solutionSteps: [
          'Gọi $x$ là số giếng dầu khai thác thêm ($x \\in \\mathbb{N}^*$). Sản lượng mỗi ngày là $f(x) = (' + w0 + ' + x)(' + q0 + ' - ' + d + 'x) = ' + fPoly + '$ (thùng).',
          "Đạo hàm $f'(x) = " + fDeriv + ' = 0 \\Leftrightarrow x = ' + xFrac.latex + (xFrac.isInteger ? '' : ' \\approx ' + u.formatNumberVN(xCont, 2)) + '$.',
          (fl === cl
            ? 'Suy ra tổng sản lượng đạt lớn nhất tại $x = ' + xBest + '$ giếng.'
            : 'Vì $x$ nguyên nên so sánh $f(' + fl + ') = ' + f(fl) + '$ và $f(' + cl + ') = ' + f(cl) + '$, suy ra công ty nên khai thác thêm $' + xBest + '$ giếng dầu.'),
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên d = 0', params: { w0: 8, q0: 154, d: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc (w0=8, q0=154, d=4 -> 15 giếng)', params: { w0: 8, q0: 154, d: 4 }, expectedValid: true },
    ],
  },

  // Dạng 27 (Q27)
  t12_b5_d27_bacteria_max_count_sa: {
    id: 't12_b5_d27_bacteria_max_count_sa',
    name: 'Tìm số lượng vi khuẩn lớn nhất theo hàm phân thức N(t)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Giá trị lớn nhất hàm phân thức (Sinh học)',
    description:
      'Số lượng vi khuẩn N(t) = a·t/(t² + b) + N0 (t ≥ 0). Tính số lượng vi khuẩn lớn nhất làm tròn đến hàng đơn vị.',
    conditionSummary: 'N0 ∈ [600; 2500], a ∈ [120; 300], b ∈ [120; 350], a/(2√b) ≥ 2',
    paramSpecs: [
      { name: 'n0', label: 'Số vi khuẩn ban đầu N0', min: 900, max: 2000, step: 13 },
      { name: 'a', label: 'Hệ số tử a', min: 140, max: 280 },
      { name: 'b', label: 'Hệ số mẫu b', min: 130, max: 320, step: 7 },
    ],
    validateCode: `
      const { n0, a, b } = params;
      if (n0 < 10 || n0 > 10000 || a <= 0 || a > 2000 || b < 25 || b > 2000) {
        return { valid: false, reason: 'Tham số ngoài miền hợp lệ' };
      }
      if (a / (2 * Math.sqrt(b)) < 2.2) return { valid: false, reason: 'Cần phần gia tăng tối đa ≥ 2,2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n0, a, b } = params;
      const ab = a * b;
      const tOpt = Math.sqrt(b);
      const nMax = Math.round(n0 + a / (2 * tOpt));

      return {
        stem:
          'Trong một thí nghiệm y học, người ta cấy $' +
          n0 +
          '$ vi khuẩn vào môi trường dinh dưỡng. Bằng thực nghiệm, người ta xác định được số lượng vi khuẩn thay đổi theo thời gian bởi công thức $N(t) = \\frac{' +
          a +
          't}{t^2 + ' +
          b +
          '} + ' +
          n0 +
          '$ (con), trong đó $t$ là thời gian tính bằng giây ($t \\ge 0$). Tính số lượng vi khuẩn lớn nhất kể từ khi thực hiện cấy vào môi trường dinh dưỡng (kết quả làm tròn đến hàng đơn vị).',
        shortAnswer: '' + nMax,
        numericValue: nMax,
        answerSummary: nMax + ' con',
        solutionSteps: [
          "Đạo hàm $N'(t) = \\frac{" + a + '(t^2 + ' + b + ') - ' + a + 't\\cdot 2t}{(t^2 + ' + b + ')^2} = \\frac{-' + a + 't^2 + ' + ab + '}{(t^2 + ' + b + ')^2}$.',
          "Giải $N'(t) = 0$ với $t \\ge 0$ ta được $t = \\sqrt{" + b + '} \\approx ' + u.formatNumberVN(tOpt, 2) + '$ giây.',
          'Lập bảng biến thiên suy ra $N_{\\max} = N(\\sqrt{' + b + '}) = ' + n0 + ' + \\frac{' + a + '}{2\\sqrt{' + b + '}} \\approx ' + nMax + '$ (con).',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { n0: 1421, a: 162, b: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn đề gốc N0=1421, a=162, b=217 -> 1426', params: { n0: 1421, a: 162, b: 217 }, expectedValid: true },
    ],
  },
};
