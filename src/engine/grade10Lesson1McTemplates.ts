import { MathTemplate } from '../types/math';

export const G10_B1_MC_TEMPLATES: Record<string, MathTemplate> = {
  // Dạng 1 (Q1 - MC): Nhận biết mệnh đề đúng trong các phát biểu
  t10_b1_d01_true_prop_mc: {
    id: 't10_b1_d01_true_prop_mc',
    name: 'Nhận biết mệnh đề đúng trong các phát biểu',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khái niệm mệnh đề và tính đúng sai',
    description:
      'Phân biệt mệnh đề đúng với mệnh đề sai (phương trình bậc hai, tính chia hết) và câu không phải mệnh đề.',
    conditionSummary: 'nNat nguyên dương, bEq >= 1, divA không chia hết cho divB (divB > divA > 0)',
    paramSpecs: [
      { name: 'nNat', label: 'Số tự nhiên đúng', min: 2, max: 95 },
      { name: 'bEq', label: 'Hệ số b của x^2 + bx = 0', min: 1, max: 15 },
      { name: 'divA', label: 'Số bị chia (sai)', min: 3, max: 25 },
      { name: 'divB', label: 'Số chia (sai, > divA)', min: 8, max: 40 },
      { name: 'personIdx', label: 'Ngữ cảnh câu cảm tính (0..5)', min: 0, max: 5 },
      { name: 'natMode', label: 'Loại khẳng định đúng (0..2)', min: 0, max: 2 },
    ],
    validateCode: `
      const { nNat, bEq, divA, divB, personIdx, natMode } = params;
      if (!Number.isInteger(nNat) || nNat < 1 || nNat > 200) {
        return { valid: false, reason: 'Số tự nhiên nNat phải là số nguyên trong [1; 200]' };
      }
      if (!Number.isInteger(bEq) || bEq < 1 || bEq > 30) {
        return { valid: false, reason: 'Hệ số bEq phải là số nguyên dương trong [1; 30]' };
      }
      if (!Number.isInteger(divA) || !Number.isInteger(divB) || divA < 2 || divB <= divA || divB > 100) {
        return { valid: false, reason: 'Cần 2 <= divA < divB <= 100 để phép chia hết sai' };
      }
      if (divA % divB === 0) {
        return { valid: false, reason: 'divA không được chia hết cho divB' };
      }
      if (!Number.isInteger(personIdx) || personIdx < 0 || personIdx > 5) {
        return { valid: false, reason: 'Chỉ số ngữ cảnh phải nằm trong 0..5' };
      }
      if (!Number.isInteger(natMode) || natMode < 0 || natMode > 2) {
        return { valid: false, reason: 'Chế độ khẳng định đúng phải nằm trong 0..2' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { nNat, bEq, divA, divB, personIdx, natMode } = params;
      const subjectiveList = [
        'Bạn Hương thích học môn Vật Lí',
        'Bạn Minh thích học môn Hóa Học',
        'Bạn Lan rất yêu thích môn Ngữ Văn',
        'Bạn Nam học giỏi nhất lớp',
        'Hôm nay thời tiết thật dễ chịu!',
        'Bạn Trang thích đọc sách khoa học',
      ];
      const natLabels = ['là số tự nhiên', 'là số nguyên dương', 'là số nguyên'];
      const correct = '$' + nNat + '$ ' + natLabels[natMode];
      const eqLatex = u.formatQuadratic(1, bEq, 0) + ' = 0';
      const w1 = 'Phương trình $' + eqLatex + '$ vô nghiệm';
      const w2 = subjectiveList[personIdx];
      const w3 = '$' + divA + '$ chia hết cho $' + divB + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => '$' + (divA + step) + '$ chia hết cho $' + (divB + divA + step) + '$'
      );
      return {
        stem: 'Trong các phát biểu sau, phát biểu nào là mệnh đề đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phát biểu "' + w1 + '" là mệnh đề sai vì phương trình có hai nghiệm phân biệt $x = 0$ và $x = -' + bEq + '$.',
          'Phát biểu "' + w2 + '" không phải là mệnh đề toán học vì không xác định được tính đúng sai khách quan.',
          'Phát biểu "' + w3 + '" là mệnh đề sai vì $' + divA + ' < ' + divB + '$ nên $' + divA + '$ không chia hết cho $' + divB + '$.',
          'Khẳng định "' + correct + '" là mệnh đề đúng.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên bEq = 0 (suy biến)',
        params: { nNat: 7, bEq: 0, divA: 9, divB: 20, personIdx: 0, natMode: 0 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q1: 7 là số tự nhiên',
        params: { nNat: 7, bEq: 2, divA: 9, divB: 20, personIdx: 0, natMode: 0 },
        expectedValid: true,
      },
    ],
  },

  // Dạng 2 (Q2 - MC): Nhận biết mệnh đề sai trong các phát biểu
  t10_b1_d02_false_prop_mc: {
    id: 't10_b1_d02_false_prop_mc',
    name: 'Nhận biết mệnh đề sai trong các phát biểu',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Khái niệm mệnh đề và tính đúng sai',
    description:
      'Chọn mệnh đề sai giữa các mệnh đề đúng về chia hết, nghiệm phương trình bậc hai và tập số hữu tỉ.',
    conditionSummary: 'd in [2; 9], kMul >= 10, aQuad in [1; 4], 1 <= r1 < r2 <= 10, qNum nguyên dương',
    paramSpecs: [
      { name: 'd', label: 'Số chia d', min: 2, max: 9 },
      { name: 'kMul', label: 'Thương nguyên k', min: 15, max: 650 },
      { name: 'aQuad', label: 'Hệ số a phương trình bậc hai', min: 1, max: 4 },
      { name: 'r1', label: 'Nghiệm thứ nhất r1', min: 1, max: 5 },
      { name: 'r2', label: 'Nghiệm thứ hai r2 (> r1)', min: 2, max: 9 },
      { name: 'qNum', label: 'Số hữu tỉ nguyên', min: 11, max: 150 },
      { name: 'geoIdx', label: 'Phát biểu địa lí sai (0..7)', min: 0, max: 7 },
    ],
    validateCode: `
      const { d, kMul, aQuad, r1, r2, qNum, geoIdx } = params;
      if (!Number.isInteger(d) || d < 2 || d > 9) {
        return { valid: false, reason: 'Số chia d phải nằm trong [2; 9]' };
      }
      if (!Number.isInteger(kMul) || kMul < 10 || kMul > 1000) {
        return { valid: false, reason: 'Thương kMul phải nằm trong [10; 1000]' };
      }
      if (!Number.isInteger(aQuad) || aQuad < 1 || aQuad > 5) {
        return { valid: false, reason: 'Hệ số aQuad phải nằm trong [1; 5]' };
      }
      if (!Number.isInteger(r1) || !Number.isInteger(r2) || r1 < 1 || r2 <= r1 || r2 > 12) {
        return { valid: false, reason: 'Hai nghiệm phải nguyên dương và r1 < r2 <= 12' };
      }
      if (!Number.isInteger(qNum) || qNum < 1 || qNum > 500) {
        return { valid: false, reason: 'Số hữu tỉ qNum phải nằm trong [1; 500]' };
      }
      if (!Number.isInteger(geoIdx) || geoIdx < 0 || geoIdx > 7) {
        return { valid: false, reason: 'Chỉ số phát biểu địa lí phải nằm trong 0..7' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { d, kMul, aQuad, r1, r2, qNum, geoIdx } = params;
      const falseGeoStatements = [
        'Tỉnh Điện Biên thuộc miền Nam nước Việt Nam',
        'Thủ đô Hà Nội thuộc miền Nam nước Việt Nam',
        'Thành phố Hồ Chí Minh thuộc miền Bắc nước Việt Nam',
        'Tỉnh Cà Mau nằm ở cực Bắc nước Việt Nam',
        'Tỉnh Hà Giang thuộc vùng Đồng bằng sông Cửu Long',
        'Tỉnh Lào Cai thuộc miền Nam nước Việt Nam',
        'Thành phố Đà Nẵng thuộc vùng Tây Bắc nước Việt Nam',
        'Tỉnh Sơn La nằm ở vùng Đông Nam Bộ nước Việt Nam',
      ];
      const N = d * kMul;
      const bCoef = -aQuad * (r1 + r2);
      const cCoef = aQuad * r1 * r2;
      const eqLatex = u.formatQuadratic(aQuad, bCoef, cCoef) + ' = 0';
      const correct = falseGeoStatements[geoIdx];
      const t1 = '$' + N + '$ chia hết cho $' + d + '$';
      const t2 = 'Phương trình $' + eqLatex + '$ có $2$ nghiệm phân biệt';
      const t3 = '$' + qNum + '$ là số hữu tỉ';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [t1, t2, t3],
        rng,
        (step) => '$' + (qNum + step) + '$ là số nguyên'
      );
      return {
        stem: 'Trong các phát biểu sau, phát biểu nào là mệnh đề sai?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Vì $' + N + ' = ' + d + ' \\cdot ' + kMul + '$ nên "' + t1 + '" là mệnh đề đúng.',
          'Phương trình $' + eqLatex + '$ có hai nghiệm phân biệt $x = ' + r1 + '$ và $x = ' + r2 + '$ nên "' + t2 + '" là mệnh đề đúng.',
          'Mọi số nguyên đều là số hữu tỉ nên "' + t3 + '" là mệnh đề đúng.',
          'Khẳng định "' + correct + '" là mệnh đề sai.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên r1 = r2 (nghiệm kép)',
        params: { d: 5, kMul: 625, aQuad: 2, r1: 4, r2: 4, qNum: 79, geoIdx: 0 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q2: Điện Biên thuộc miền Nam',
        params: { d: 5, kMul: 625, aQuad: 2, r1: 3, r2: 5, qNum: 79, geoIdx: 0 },
        expectedValid: true,
      },
    ],
  },

  // Dạng 3 (Q3 - MC): Phủ định của mệnh đề số học cơ bản
  t10_b1_d03_negate_arith_mc: {
    id: 't10_b1_d03_negate_arith_mc',
    name: 'Tìm mệnh đề phủ định của mệnh đề số học cơ bản',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Mệnh đề phủ định',
    description:
      'Xác định mệnh đề phủ định của phát biểu số học về tính chẵn/lẻ, nguyên tố, hợp số, chia hết hoặc số hữu tỉ.',
    conditionSummary: 'n nguyên trong [2; 99], propIdx trong 0..5, kDiv trong [3; 9]',
    paramSpecs: [
      { name: 'n', label: 'Số nguyên n', min: 2, max: 98 },
      { name: 'propIdx', label: 'Tính chất (0:chẵn, 1:lẻ, 2:nguyên tố, 3:chia hết, 4:hữu tỉ, 5:hợp số)', min: 0, max: 5 },
      { name: 'kDiv', label: 'Số chia k (khi propIdx = 3)', min: 3, max: 9 },
    ],
    validateCode: `
      const { n, propIdx, kDiv } = params;
      if (!Number.isInteger(n) || n < 2 || n > 200) {
        return { valid: false, reason: 'Số n phải là số nguyên trong [2; 200]' };
      }
      if (!Number.isInteger(propIdx) || propIdx < 0 || propIdx > 5) {
        return { valid: false, reason: 'Loại tính chất phải nằm trong 0..5' };
      }
      if (!Number.isInteger(kDiv) || kDiv < 2 || kDiv > 15) {
        return { valid: false, reason: 'Số chia kDiv phải nằm trong [2; 15]' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, propIdx, kDiv } = params;
      const bank = [
        {
          stmt: '$' + n + '$ là số chẵn',
          neg: '$' + n + '$ là số lẻ',
          distractors: ['$' + n + '$ không phải là hợp số', '$' + n + '$ là số vô tỉ', '$' + n + '$ là số nguyên tố'],
          explain: 'Trong tập số nguyên, số không phải số chẵn chính là số lẻ.',
        },
        {
          stmt: '$' + n + '$ là số lẻ',
          neg: '$' + n + '$ là số chẵn',
          distractors: ['$' + n + '$ là số nguyên tố', '$' + n + '$ là số vô tỉ', '$' + n + '$ là hợp số'],
          explain: 'Trong tập số nguyên, số không phải số lẻ chính là số chẵn.',
        },
        {
          stmt: '$' + n + '$ là số nguyên tố',
          neg: '$' + n + '$ không phải là số nguyên tố',
          distractors: ['$' + n + '$ là số chẵn', '$' + n + '$ là số vô tỉ', '$' + n + '$ là số tự nhiên'],
          explain: 'Để phủ định mệnh đề khẳng định tính chất, ta thêm từ "không phải" trước vị ngữ.',
        },
        {
          stmt: '$' + n + '$ chia hết cho $' + kDiv + '$',
          neg: '$' + n + '$ không chia hết cho $' + kDiv + '$',
          distractors: ['$' + n + '$ là bội của $' + kDiv + '$', '$' + n + '$ chia hết cho $' + (kDiv + 1) + '$', '$' + n + '$ là số lẻ'],
          explain: 'Phủ định của quan hệ chia hết là quan hệ không chia hết.',
        },
        {
          stmt: '$' + n + '$ là số hữu tỉ',
          neg: '$' + n + '$ là số vô tỉ',
          distractors: ['$' + n + '$ là số nguyên', '$' + n + '$ là số chẵn', '$' + n + '$ là số tự nhiên'],
          explain: 'Trong tập số thực, số không phải số hữu tỉ là số vô tỉ.',
        },
        {
          stmt: '$' + n + '$ là hợp số',
          neg: '$' + n + '$ không phải là hợp số',
          distractors: ['$' + n + '$ là số lẻ', '$' + n + '$ là số vô tỉ', '$' + n + '$ là số chẵn'],
          explain: 'Phủ định của khẳng định "$' + n + '$ là hợp số" là "$' + n + '$ không phải là hợp số".',
        },
      ];
      const item = bank[propIdx];
      const { options, correctIndex } = u.buildUniqueMcOptions(
        item.neg,
        item.distractors,
        rng,
        (step) => '$' + n + '$ lớn hơn $' + (n + step) + '$'
      );
      return {
        stem: 'Phủ định của mệnh đề "' + item.stmt + '" là',
        options,
        correctIndex,
        answerSummary: item.neg,
        solutionSteps: [
          item.explain,
          'Vậy mệnh đề phủ định của mệnh đề đã cho là: "' + item.neg + '".',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên n = 0', params: { n: 0, propIdx: 0, kDiv: 3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q3: 4 là số chẵn -> 4 là số lẻ', params: { n: 4, propIdx: 0, kDiv: 3 }, expectedValid: true },
    ],
  },

  // Dạng 4 (Q4 - MC): Mệnh đề phủ định của mệnh đề chứa lượng từ
  t10_b1_d04_negate_quantifier_mc: {
    id: 't10_b1_d04_negate_quantifier_mc',
    name: 'Tìm mệnh đề phủ định của mệnh đề chứa lượng từ (∀, ∃)',
    category: 'MC',
    level: 'Biết',
    topicTag: 'Mệnh đề chứa lượng từ',
    description:
      'Phủ định mệnh đề chứa kí hiệu ∀ hoặc ∃ gắn với bất đẳng thức bậc nhất hoặc bậc hai trên các tập số N, Z, R, Q.',
    conditionSummary: 'qType in {0,1}, setIdx in 0..3, a in [1;12], b != 0, relIdx in 0..3, deg in {1,2}',
    paramSpecs: [
      { name: 'qType', label: 'Lượng từ gốc (0: ∃, 1: ∀)', min: 0, max: 1 },
      { name: 'setIdx', label: 'Tập số (0:N, 1:Z, 2:R, 3:Q)', min: 0, max: 3 },
      { name: 'a', label: 'Hệ số a', min: 1, max: 12 },
      { name: 'b', label: 'Hằng số b (khác 0)', min: -15, max: 15, allowZero: false },
      { name: 'relIdx', label: 'Dấu gốc (0:>, 1:<, 2:>=, 3:<=)', min: 0, max: 3 },
      { name: 'deg', label: 'Bậc biểu thức (1: bậc nhất, 2: bậc hai)', min: 1, max: 2 },
    ],
    validateCode: `
      const { qType, setIdx, a, b, relIdx, deg } = params;
      if (!Number.isInteger(qType) || qType < 0 || qType > 1) return { valid: false, reason: 'qType phải thuộc {0, 1}' };
      if (!Number.isInteger(setIdx) || setIdx < 0 || setIdx > 3) return { valid: false, reason: 'setIdx phải thuộc 0..3' };
      if (!Number.isInteger(a) || a < 1 || a > 20) return { valid: false, reason: 'Hệ số a phải thuộc [1; 20]' };
      if (!Number.isInteger(b) || b === 0 || Math.abs(b) > 30) return { valid: false, reason: 'Hằng số b khác 0 và |b| <= 30' };
      if (!Number.isInteger(relIdx) || relIdx < 0 || relIdx > 3) return { valid: false, reason: 'relIdx phải thuộc 0..3' };
      if (!Number.isInteger(deg) || deg < 1 || deg > 2) return { valid: false, reason: 'Bậc biểu thức phải là 1 hoặc 2' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { qType, setIdx, a, b, relIdx, deg } = params;
      const origQ = qType === 0 ? '\\exists' : '\\forall';
      const negQ = qType === 0 ? '\\forall' : '\\exists';
      const sets = ['\\mathbb{N}', '\\mathbb{Z}', '\\mathbb{R}', '\\mathbb{Q}'];
      const setSym = sets[setIdx];
      const rels = ['>', '<', '\\ge', '\\le'];
      const negRelIdxMap = [3, 2, 1, 0];
      const origRel = rels[relIdx];
      const negRel = rels[negRelIdxMap[relIdx]];
      const expr = deg === 1 ? u.formatLinear(a, b, 'x') : u.formatQuadratic(1, a, b, 'x');
      const origProp = origQ + ' x \\in ' + setSym + ': ' + expr + ' ' + origRel + ' 0';
      const correct = '$' + negQ + ' x \\in ' + setSym + ': ' + expr + ' ' + negRel + ' 0$';
      const distractors = rels
        .filter((r) => r !== negRel)
        .map((r) => '$' + negQ + ' x \\in ' + setSym + ': ' + expr + ' ' + r + ' 0$');
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        distractors,
        rng,
        (step) => '$' + origQ + ' x \\in ' + setSym + ': ' + expr + ' ' + rels[step % 4] + ' 0$'
      );
      return {
        stem: 'Mệnh đề phủ định của mệnh đề "$' + origProp + '$" là',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Phủ định của lượng từ "$' + origQ + '$" là "$' + negQ + '$", và phủ định của dấu "$' + origRel + '$" là "$' + negRel + '$".',
          'Do đó mệnh đề phủ định là: ' + correct + '.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên b = 0', params: { qType: 0, setIdx: 0, a: 7, b: 0, relIdx: 0, deg: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q4: ∃x∈N: 7x + 5 > 0', params: { qType: 0, setIdx: 0, a: 7, b: 5, relIdx: 0, deg: 1 }, expectedValid: true },
    ],
  },

  // Dạng 5 (Q5 - MC): Nhận biết mệnh đề kéo theo P => Q đúng
  t10_b1_d05_implication_true_mc: {
    id: 't10_b1_d05_implication_true_mc',
    name: 'Xác định mệnh đề kéo theo (P ⇒ Q) đúng',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Mệnh đề kéo theo',
    description:
      'Trong bốn mệnh đề kéo theo "Nếu P thì Q", chọn mệnh đề đúng (ba mệnh đề nhiễu đều có dạng Đúng ⇒ Sai).',
    conditionSummary: 'oddTrue, oddTrue2 lẻ; even1, even2 chẵn; các chỉ số số nguyên tố hợp lệ',
    paramSpecs: [
      { name: 'nInt', label: 'Số nguyên (nhiễu 1)', min: 12, max: 98 },
      { name: 'pCompIdx', label: 'Chỉ số số nguyên tố (nhiễu 1, 0..14)', min: 0, max: 14 },
      { name: 'pPrime2Idx', label: 'Chỉ số số nguyên tố (nhiễu 2, 0..14)', min: 0, max: 14 },
      { name: 'even1', label: 'Số chẵn (nhiễu 2)', min: 4, max: 60, step: 2 },
      { name: 'oddTrue', label: 'Số lẻ (đáp án đúng)', min: 5, max: 79, step: 2 },
      { name: 'pTrueIdx', label: 'Chỉ số số nguyên tố đúng (0..11)', min: 0, max: 11 },
      { name: 'oddTrue2', label: 'Số lẻ (nhiễu 3)', min: 7, max: 79, step: 2 },
      { name: 'even2', label: 'Số chẵn (nhiễu 3)', min: 6, max: 64, step: 2 },
    ],
    validateCode: `
      const { nInt, pCompIdx, pPrime2Idx, even1, oddTrue, pTrueIdx, oddTrue2, even2 } = params;
      if (!Number.isInteger(nInt) || nInt < 2 || nInt > 200) return { valid: false, reason: 'nInt không hợp lệ' };
      if (!Number.isInteger(pCompIdx) || pCompIdx < 0 || pCompIdx > 14) return { valid: false, reason: 'pCompIdx phải thuộc 0..14' };
      if (!Number.isInteger(pPrime2Idx) || pPrime2Idx < 0 || pPrime2Idx > 14) return { valid: false, reason: 'pPrime2Idx phải thuộc 0..14' };
      if (!Number.isInteger(pTrueIdx) || pTrueIdx < 0 || pTrueIdx > 11) return { valid: false, reason: 'pTrueIdx phải thuộc 0..11' };
      if (!Number.isInteger(even1) || even1 < 2 || even1 > 100 || even1 % 2 !== 0) return { valid: false, reason: 'even1 phải là số chẵn dương <= 100' };
      if (!Number.isInteger(even2) || even2 < 2 || even2 > 100 || even2 % 2 !== 0) return { valid: false, reason: 'even2 phải là số chẵn dương <= 100' };
      if (!Number.isInteger(oddTrue) || oddTrue < 3 || oddTrue > 100 || oddTrue % 2 === 0) return { valid: false, reason: 'oddTrue phải là số lẻ dương <= 100' };
      if (!Number.isInteger(oddTrue2) || oddTrue2 < 3 || oddTrue2 > 100 || oddTrue2 % 2 === 0) return { valid: false, reason: 'oddTrue2 phải là số lẻ dương <= 100' };
      if (oddTrue === oddTrue2 && even1 === even2) return { valid: false, reason: 'Tránh trùng số giữa các phương án' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { nInt, pCompIdx, pPrime2Idx, even1, oddTrue, pTrueIdx, oddTrue2, even2 } = params;
      const bigPrimes = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
      const smallPrimes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];
      const pComp = bigPrimes[pCompIdx];
      const pPrime2 = bigPrimes[pPrime2Idx];
      const pTrue = smallPrimes[pTrueIdx];

      const correct = 'Nếu $' + oddTrue + '$ là số lẻ thì $' + pTrue + '$ là số nguyên tố';
      const w1 = 'Nếu $' + nInt + '$ là số nguyên thì $' + pComp + '$ là hợp số';
      const w2 = 'Nếu $' + pPrime2 + '$ là số nguyên tố thì $' + even1 + '$ là số lẻ';
      const w3 = 'Nếu $' + oddTrue2 + '$ là số lẻ thì $' + even2 + '$ là số lẻ';

      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => 'Nếu $' + (oddTrue2 + 2 * step) + '$ là số lẻ thì $' + (even2 + 2 * step) + '$ là số lẻ'
      );
      return {
        stem: 'Trong các mệnh đề kéo theo sau, mệnh đề nào là mệnh đề đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mệnh đề kéo theo $P \\Rightarrow Q$ chỉ sai khi $P$ đúng và $Q$ sai.',
          'Xét các phương án sai: $' + pComp + '$ là số nguyên tố (không phải hợp số); $' + even1 + '$ và $' + even2 + '$ là số chẵn (không phải số lẻ), nên cả ba mệnh đề này đều có dạng Đúng $\\Rightarrow$ Sai.',
          'Mệnh đề "' + correct + '" có giả thiết đúng ($' + oddTrue + '$ là số lẻ) và kết luận đúng ($' + pTrue + '$ là số nguyên tố), nên đây là mệnh đề đúng.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên oddTrue là số chẵn',
        params: { nInt: 80, pCompIdx: 13, pPrime2Idx: 4, even1: 16, oddTrue: 26, pTrueIdx: 2, oddTrue2: 25, even2: 26 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q5: Nếu 27 là số lẻ thì 7 là số nguyên tố',
        params: { nInt: 80, pCompIdx: 13, pPrime2Idx: 4, even1: 16, oddTrue: 27, pTrueIdx: 2, oddTrue2: 25, even2: 26 },
        expectedValid: true,
      },
    ],
  },

  // Dạng 6 (Q6 - MC): Phát biểu mệnh đề tương đương P <=> Q
  t10_b1_d06_equivalence_geom_mc: {
    id: 't10_b1_d06_equivalence_geom_mc',
    name: 'Phát biểu mệnh đề tương đương (P ⇔ Q) trong hình học',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Mệnh đề tương đương',
    description:
      'Cho hai mệnh đề hình học P và Q gắn với tên tứ giác/tam giác động. Xác định cách phát biểu đúng mệnh đề tương đương P ⇔ Q.',
    conditionSummary: 'shapeIdx in 0..5, nameIdx in 0..7, wordMode in {0, 1}',
    paramSpecs: [
      { name: 'shapeIdx', label: 'Cặp mệnh đề hình học (0..5)', min: 0, max: 5 },
      { name: 'nameIdx', label: 'Tên đỉnh hình (0..7)', min: 0, max: 7 },
      { name: 'wordMode', label: 'Cách phát biểu (0: ĐK cần và đủ, 1: khi và chỉ khi)', min: 0, max: 1 },
    ],
    validateCode: `
      const { shapeIdx, nameIdx, wordMode } = params;
      if (!Number.isInteger(shapeIdx) || shapeIdx < 0 || shapeIdx > 5) return { valid: false, reason: 'shapeIdx phải thuộc 0..5' };
      if (!Number.isInteger(nameIdx) || nameIdx < 0 || nameIdx > 7) return { valid: false, reason: 'nameIdx phải thuộc 0..7' };
      if (!Number.isInteger(wordMode) || wordMode < 0 || wordMode > 1) return { valid: false, reason: 'wordMode phải thuộc {0, 1}' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { shapeIdx, nameIdx, wordMode } = params;
      const quadNames = ['BJKN', 'ABCD', 'MNPQ', 'EFGH', 'HKLM', 'PQRS', 'DEFG', 'XYZT'];
      const triNames = ['ABC', 'MNP', 'DEF', 'HKL', 'IJK', 'PQR', 'XYZ', 'UVW'];
      const qv = quadNames[nameIdx];
      const tv = triNames[nameIdx];
      const configs = [
        {
          intro: 'tứ giác $' + qv + '$',
          subj: 'Tứ giác $' + qv + '$',
          pron: 'tứ giác đó',
          pronShort: 'nó',
          pPred: 'là hình thoi',
          pNeg: 'không là hình thoi',
          qPred: 'có hai đường chéo vuông góc',
        },
        {
          intro: 'tứ giác $' + qv + '$',
          subj: 'Tứ giác $' + qv + '$',
          pron: 'tứ giác đó',
          pronShort: 'nó',
          pPred: 'là hình bình hành',
          pNeg: 'không là hình bình hành',
          qPred: 'có các cặp cạnh đối song song',
        },
        {
          intro: 'tứ giác $' + qv + '$',
          subj: 'Tứ giác $' + qv + '$',
          pron: 'tứ giác đó',
          pronShort: 'nó',
          pPred: 'là hình chữ nhật',
          pNeg: 'không là hình chữ nhật',
          qPred: 'là hình bình hành có hai đường chéo bằng nhau',
        },
        {
          intro: 'tam giác $' + tv + '$',
          subj: 'Tam giác $' + tv + '$',
          pron: 'tam giác đó',
          pronShort: 'nó',
          pPred: 'là tam giác đều',
          pNeg: 'không là tam giác đều',
          qPred: 'có ba cạnh bằng nhau',
        },
        {
          intro: 'tam giác $' + tv + '$',
          subj: 'Tam giác $' + tv + '$',
          pron: 'tam giác đó',
          pronShort: 'nó',
          pPred: 'là tam giác vuông',
          pNeg: 'không là tam giác vuông',
          qPred: 'có một góc bằng $90^\\circ$',
        },
        {
          intro: 'tứ giác $' + qv + '$',
          subj: 'Tứ giác $' + qv + '$',
          pron: 'tứ giác đó',
          pronShort: 'nó',
          pPred: 'là hình vuông',
          pNeg: 'không là hình vuông',
          qPred: 'là hình chữ nhật có hai đường chéo vuông góc',
        },
      ];
      const c = configs[shapeIdx];
      const correct =
        wordMode === 0
          ? c.subj + ' ' + c.pPred + ' là điều kiện cần và đủ để ' + c.pron + ' ' + c.qPred
          : c.subj + ' ' + c.pPred + ' khi và chỉ khi ' + c.pron + ' ' + c.qPred;
      const w1 = c.subj + ' ' + c.qPred + ' thì ' + c.pronShort + ' ' + c.pPred;
      const w2 = 'Nếu ' + c.intro + ' ' + c.qPred + ' thì ' + c.pronShort + ' ' + c.pNeg;
      const w3 = c.subj + ' ' + c.qPred + ' là điều kiện cần để ' + c.pronShort + ' ' + c.pPred;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => 'Nếu ' + c.intro + ' ' + c.pPred + ' thì ' + c.pronShort + ' ' + c.qPred + ' (' + step + ')'
      );
      return {
        stem:
          'Cho ' + c.intro + '. Xét hai mệnh đề:\n' +
          '$P$: "' + c.subj + ' ' + c.pPred + '".\n' +
          '$Q$: "' + c.subj + ' ' + c.qPred + '".\n' +
          'Mệnh đề nào sau đây là mệnh đề $P \\Leftrightarrow Q$?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mệnh đề $P \\Leftrightarrow Q$ là mệnh đề tương đương, được phát biểu dưới dạng "$P$ là điều kiện cần và đủ để có $Q$" hoặc "$P$ khi và chỉ khi $Q$".',
          'Do đó mệnh đề đúng là: "' + correct + '".',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên shapeIdx âm', params: { shapeIdx: -1, nameIdx: 0, wordMode: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q6: Tứ giác BJKN hình thoi <=> hai đường chéo vuông góc', params: { shapeIdx: 0, nameIdx: 0, wordMode: 0 }, expectedValid: true },
    ],
  },

  // Dạng 7 (Q7 - MC): Tìm mệnh đề đảo của mệnh đề kéo theo hình học
  t10_b1_d07_converse_geom_mc: {
    id: 't10_b1_d07_converse_geom_mc',
    name: 'Tìm mệnh đề đảo (Q ⇒ P) của mệnh đề kéo theo hình học',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Mệnh đề đảo',
    description:
      'Cho mệnh đề kéo theo "Nếu P thì Q" gắn với một tứ giác có tên đỉnh thay đổi động. Xác định mệnh đề đảo "Nếu Q thì P".',
    conditionSummary: 'pairIdx in 0..5, nameIdx in 0..7',
    paramSpecs: [
      { name: 'pairIdx', label: 'Cặp tính chất tứ giác (0..5)', min: 0, max: 5 },
      { name: 'nameIdx', label: 'Tên tứ giác (0..7)', min: 0, max: 7 },
    ],
    validateCode: `
      const { pairIdx, nameIdx } = params;
      if (!Number.isInteger(pairIdx) || pairIdx < 0 || pairIdx > 5) return { valid: false, reason: 'pairIdx phải thuộc 0..5' };
      if (!Number.isInteger(nameIdx) || nameIdx < 0 || nameIdx > 7) return { valid: false, reason: 'nameIdx phải thuộc 0..7' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pairIdx, nameIdx } = params;
      const quadNames = ['GHIJ', 'ABCD', 'MNPQ', 'EFGH', 'HKLM', 'PQRS', 'IJKL', 'XYZT'];
      const v = quadNames[nameIdx];
      const pairs = [
        { p: 'là hình chữ nhật', pNeg: 'không là hình chữ nhật', q: 'có hai đường chéo bằng nhau', qNeg: 'không có hai đường chéo bằng nhau' },
        { p: 'là hình thoi', pNeg: 'không là hình thoi', q: 'có hai đường chéo vuông góc', qNeg: 'không có hai đường chéo vuông góc' },
        { p: 'là hình vuông', pNeg: 'không là hình vuông', q: 'là hình chữ nhật', qNeg: 'không là hình chữ nhật' },
        { p: 'là hình bình hành', pNeg: 'không là hình bình hành', q: 'có hai đường chéo cắt nhau tại trung điểm mỗi đường', qNeg: 'không có hai đường chéo cắt nhau tại trung điểm mỗi đường' },
        { p: 'là hình thang cân', pNeg: 'không là hình thang cân', q: 'có hai đường chéo bằng nhau', qNeg: 'không có hai đường chéo bằng nhau' },
        { p: 'là hình vuông', pNeg: 'không là hình vuông', q: 'có bốn cạnh bằng nhau', qNeg: 'không có bốn cạnh bằng nhau' },
      ];
      const item = pairs[pairIdx];
      const subj = 'tứ giác $' + v + '$';
      const origStmt = 'Nếu ' + subj + ' ' + item.p + ' thì ' + subj + ' ' + item.q;
      const correct = 'Nếu ' + subj + ' ' + item.q + ' thì ' + subj + ' ' + item.p;
      const w1 = 'Nếu ' + subj + ' ' + item.qNeg + ' thì ' + subj + ' ' + item.pNeg;
      const w2 = 'Nếu ' + subj + ' ' + item.q + ' thì ' + subj + ' ' + item.pNeg;
      const w3 = 'Mệnh đề đã cho không có mệnh đề đảo';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => 'Nếu ' + subj + ' ' + item.pNeg + ' thì ' + subj + ' ' + item.qNeg + ' (' + step + ')'
      );
      return {
        stem: 'Cho ' + subj + '. Xét mệnh đề: "' + origStmt + '". Mệnh đề nào sau đây là mệnh đề đảo?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mệnh đề đã cho có dạng $P \\Rightarrow Q$ với $P$: "' + subj + ' ' + item.p + '" và $Q$: "' + subj + ' ' + item.q + '".',
          'Mệnh đề đảo của $P \\Rightarrow Q$ là $Q \\Rightarrow P$, tức là: "' + correct + '".',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên nameIdx vượt miền', params: { pairIdx: 0, nameIdx: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q7: Tứ giác GHIJ hình chữ nhật => hai đường chéo bằng nhau', params: { pairIdx: 0, nameIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 8 (Q8 - MC): Phát biểu mệnh đề đảo bằng thuật ngữ "điều kiện cần / điều kiện đủ"
  t10_b1_d08_converse_cond_mc: {
    id: 't10_b1_d08_converse_cond_mc',
    name: 'Phát biểu mệnh đề đảo bằng "điều kiện cần / điều kiện đủ"',
    category: 'MC',
    level: 'Hiểu',
    topicTag: 'Điều kiện cần và điều kiện đủ',
    description:
      'Chuyển mệnh đề đảo Q ⇒ P của mệnh đề "Nếu P thì Q" sang phát biểu tương đương dùng thuật ngữ điều kiện đủ.',
    conditionSummary: 'stmtIdx in 0..5',
    paramSpecs: [
      { name: 'stmtIdx', label: 'Mệnh đề gốc (0..5)', min: 0, max: 5 },
    ],
    validateCode: `
      const { stmtIdx } = params;
      if (!Number.isInteger(stmtIdx) || stmtIdx < 0 || stmtIdx > 5) {
        return { valid: false, reason: 'Chỉ số mệnh đề phải nằm trong 0..5' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { stmtIdx } = params;
      const items = [
        {
          pCap: 'Một tam giác có một góc bằng $90^\\circ$',
          pLow: 'một tam giác có một góc bằng $90^\\circ$',
          qCap: 'Tam giác đó là tam giác vuông',
          qLow: 'tam giác đó là tam giác vuông',
        },
        {
          pCap: 'Một tam giác có ba cạnh bằng nhau',
          pLow: 'một tam giác có ba cạnh bằng nhau',
          qCap: 'Tam giác đó là tam giác đều',
          qLow: 'tam giác đó là tam giác đều',
        },
        {
          pCap: 'Một tứ giác có bốn góc vuông',
          pLow: 'một tứ giác có bốn góc vuông',
          qCap: 'Tứ giác đó là hình chữ nhật',
          qLow: 'tứ giác đó là hình chữ nhật',
        },
        {
          pCap: 'Số tự nhiên $n$ có chữ số tận cùng bằng $0$',
          pLow: 'số tự nhiên $n$ có chữ số tận cùng bằng $0$',
          qCap: 'Số $n$ chia hết cho $5$',
          qLow: 'số $n$ chia hết cho $5$',
        },
        {
          pCap: 'Số nguyên $n$ chia hết cho $4$',
          pLow: 'số nguyên $n$ chia hết cho $4$',
          qCap: 'Số $n$ là số chẵn',
          qLow: 'số $n$ là số chẵn',
        },
        {
          pCap: 'Một tam giác có hai cạnh bằng nhau',
          pLow: 'một tam giác có hai cạnh bằng nhau',
          qCap: 'Tam giác đó là tam giác cân',
          qLow: 'tam giác đó là tam giác cân',
        },
      ];
      const it = items[stmtIdx];
      const correct = it.qCap + ' là điều kiện đủ để ' + it.pLow;
      const w1 = it.qCap + ' là điều kiện cần để ' + it.pLow;
      const w2 = it.pCap + ' là điều kiện đủ để ' + it.qLow;
      const w3 = it.qCap + ' là điều kiện cần và đủ để ' + it.pLow;
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [w1, w2, w3],
        rng,
        (step) => it.pCap + ' là điều kiện cần để ' + it.qLow + ' (' + step + ')'
      );
      return {
        stem:
          'Phát biểu nào sau đây là mệnh đề đảo của mệnh đề: "Nếu ' +
          it.pLow +
          ' thì ' +
          it.qLow +
          '"?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Mệnh đề đã cho có dạng $P \\Rightarrow Q$ nên mệnh đề đảo là $Q \\Rightarrow P$: "Nếu ' + it.qLow + ' thì ' + it.pLow + '".',
          'Trong mệnh đề kéo theo $Q \\Rightarrow P$, giả thiết $Q$ là điều kiện đủ để có kết luận $P$.',
          'Do đó phát biểu tương đương của mệnh đề đảo là: "' + correct + '".',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên stmtIdx = 10', params: { stmtIdx: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q8: Tam giác có góc 90° => tam giác vuông', params: { stmtIdx: 0 }, expectedValid: true },
    ],
  },

  // Dạng 9 (Q9 - MC): Đếm số tự nhiên x < M để mệnh đề chứa biến bậc hai chia hết cho p đúng
  t10_b1_d09_divisible_count_mc: {
    id: 't10_b1_d09_divisible_count_mc',
    name: 'Đếm số tự nhiên x < M để mệnh đề chứa biến chia hết cho số nguyên tố p đúng',
    category: 'MC',
    level: 'Vận dụng',
    topicTag: 'Mệnh đề chứa biến',
    description:
      'Cho P(x): "(ax² + bx + c) chia hết cho p" với a, c chia hết cho số nguyên tố p và b không chia hết cho p. Đếm số tự nhiên x < M để P(x) là mệnh đề đúng.',
    conditionSummary: 'p ∈ {3,5,7,11}, 1 <= rem < p, kA >= 1, kB >= 1, kC >= 10, M in [100; 5000]',
    paramSpecs: [
      { name: 'pIdx', label: 'Số nguyên tố p (0:3, 1:5, 2:7, 3:11)', min: 0, max: 3 },
      { name: 'kA', label: 'Hệ số kA (a = kA·p)', min: 1, max: 4 },
      { name: 'kB', label: 'Thương kB (b = kB·p + rem)', min: 2, max: 12 },
      { name: 'rem', label: 'Số dư rem của b chia p (1..p-1)', min: 1, max: 10 },
      { name: 'kC', label: 'Thương kC (c = kC·p)', min: 100, max: 1200 },
      { name: 'M', label: 'Cận trên M (x < M)', min: 250, max: 3000 },
    ],
    validateCode: `
      const { pIdx, kA, kB, rem, kC, M } = params;
      if (!Number.isInteger(pIdx) || pIdx < 0 || pIdx > 3) return { valid: false, reason: 'pIdx phải thuộc 0..3' };
      const primes = [3, 5, 7, 11];
      const p = primes[pIdx];
      if (!Number.isInteger(kA) || kA < 1 || kA > 10) return { valid: false, reason: 'kA phải thuộc [1; 10]' };
      if (!Number.isInteger(kB) || kB < 1 || kB > 25) return { valid: false, reason: 'kB phải thuộc [1; 25]' };
      if (!Number.isInteger(rem) || rem < 1 || rem >= p) return { valid: false, reason: 'Số dư rem phải thỏa 1 <= rem < p' };
      if (!Number.isInteger(kC) || kC < 10 || kC > 2000) return { valid: false, reason: 'kC phải thuộc [10; 2000]' };
      if (!Number.isInteger(M) || M < 100 || M > 6000) return { valid: false, reason: 'Cận trên M phải thuộc [100; 6000]' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { pIdx, kA, kB, rem, kC, M } = params;
      const primes = [3, 5, 7, 11];
      const p = primes[pIdx];
      const a = kA * p;
      const b = kB * p + rem;
      const c = kC * p;
      const expr = u.formatQuadratic(a, b, c, 'x');
      const ans = Math.floor((M - 1) / p) + 1;
      const lastX = (ans - 1) * p;
      const correct = '$' + ans + '$';
      const d1 = '$' + (ans + 20) + '$';
      const d2 = '$' + Math.max(1, ans - 50) + '$';
      const d3 = '$' + (ans + 50) + '$';
      const { options, correctIndex } = u.buildUniqueMcOptions(
        correct,
        [d1, d2, d3],
        rng,
        (step) => '$' + (ans + step * 10) + '$'
      );
      return {
        stem:
          'Cho mệnh đề chứa biến $P(x)$: "$(' +
          expr +
          ')$ chia hết cho $' +
          p +
          '$". Hỏi có bao nhiêu số tự nhiên $x$ nhỏ hơn $' +
          M +
          '$ để mệnh đề chứa biến thành mệnh đề đúng?',
        options,
        correctIndex,
        answerSummary: correct,
        solutionSteps: [
          'Ta có $' + expr + ' \\,\\vdots\\, ' + p + '$. Vì $' + a + 'x^2$, $' + (kB * p) + 'x$ và $' + c + '$ đều chia hết cho $' + p + '$ nên điều kiện tương đương với $' + rem + 'x \\,\\vdots\\, ' + p + '$.',
          'Vì $' + p + '$ là số nguyên tố và $' + rem + '$ không chia hết cho $' + p + '$ nên $x \\,\\vdots\\, ' + p + '$.',
          'Với $x \\in \\mathbb{N}$ và $x < ' + M + '$, ta có $x \\in \\{0;\\, ' + p + ';\\, ' + (2 * p) + ';\\, \\ldots;\\, ' + lastX + '\\}$.',
          'Số giá trị của $x$ là $\\left\\lfloor \\frac{' + (M - 1) + '}{' + p + '} \\right\\rfloor + 1 = ' + ans + '$. Vậy có $' + ans + '$ số tự nhiên $x$ thỏa mãn.',
        ],
      };
    `,
    boundaryCases: [
      {
        label: 'Biên rem = p (chia hết cho p)',
        params: { pIdx: 1, kA: 1, kB: 7, rem: 5, kC: 965, M: 2299 },
        expectedValid: false,
      },
      {
        label: 'Mẫu chuẩn Q9: 5x² + 37x + 4825 ⋮ 5, x < 2299 -> 460',
        params: { pIdx: 1, kA: 1, kB: 7, rem: 2, kC: 965, M: 2299 },
        expectedValid: true,
      },
    ],
  },
};
