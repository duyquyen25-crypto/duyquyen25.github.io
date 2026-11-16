import { MathTemplate } from '../types/math';

const TRIG11_B1_SA_HELPERS = String.raw`
  const round1 = (val) => Math.round(val * 10) / 10;
  const fmtDec1 = (val) => {
    const r = round1(val);
    if (Number.isInteger(r)) return String(r);
    return String(r).replace('.', ',');
  };
  const fmtPiFrac = (num, den) => {
    const f = u.simplifyFrac(num, den);
    if (f.num === 0) return '0';
    if (f.den === 1) {
      if (f.num === 1) return '\\pi';
      if (f.num === -1) return '-\\pi';
      return f.num + '\\pi';
    }
    const sign = f.num < 0 ? '-' : '';
    const absN = Math.abs(f.num);
    return sign + '\\frac{' + (absN === 1 ? '' : absN) + '\\pi}{' + f.den + '}';
  };
  const simplifyRad = (rad) => {
    const rAbs = Math.abs(Math.round(rad));
    if (rAbs === 0) return { k: 0, r: 1 };
    let k = 1, rem = rAbs;
    for (let d = 2; d * d <= rem; d++) {
      while (rem % (d * d) === 0) {
        k *= d;
        rem /= d * d;
      }
    }
    return { k, r: rem };
  };
  const gcd = (x, y) => {
    let a = Math.abs(Math.round(x));
    let b = Math.abs(Math.round(y));
    while (b !== 0) { const t = b; b = a % b; a = t; }
    return a || 1;
  };
  const fmtRadFrac = (coef, rad, den) => {
    if (coef === 0 || rad === 0) return '0';
    let s = simplifyRad(rad);
    let c = coef * s.k;
    let d = den;
    if (d < 0) { c = -c; d = -d; }
    const g = gcd(c, d);
    c /= g;
    d /= g;
    if (s.r === 1) {
      return u.simplifyFrac(c, d).latex;
    }
    const sign = c < 0 ? '-' : '';
    const absC = Math.abs(c);
    const numStr = (absC === 1 ? '' : String(absC)) + '\\sqrt{' + s.r + '}';
    if (d === 1) return sign + numStr;
    return sign + '\\frac{' + numStr + '}{' + d + '}';
  };
  const fmtIntervalHalfPi = (m) => {
    const left = m === 0 ? '0' : fmtPiFrac(m, 2);
    const right = (m + 1) === 0 ? '0' : fmtPiFrac(m + 1, 2);
    return '\\left( ' + left + '; ' + right + ' \\right)';
  };
`;

export const G11_B1_SA_TEMPLATES: Record<string, MathTemplate> = {
  // D29 (Q29): Bánh xe quay n1 vòng trong t1 giây -> góc radian trong t2 giây
  t11_b1_d29_wheel_angle_rad_sa: {
    id: 't11_b1_d29_wheel_angle_rad_sa',
    name: 'Tính góc quay radian của bánh xe theo thời gian (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Ứng dụng số đo góc radian',
    description: 'Bánh xe quay được n1 vòng trong t1 giây. Tính góc (radian) quay được trong t2 giây (làm tròn hàng phần chục).',
    conditionSummary: 'n1, t1, t2 >= 2, tránh ranh giới làm tròn .x5',
    paramSpecs: [
      { name: 'n1', label: 'Số vòng quay n1', min: 3, max: 12 },
      { name: 't1', label: 'Thời gian quay t1 (giây)', min: 2, max: 8 },
      { name: 't2', label: 'Thời gian cần tính t2 (giây)', min: 5, max: 18 },
    ],
    validateCode: `
      const { n1, t1, t2 } = params;
      if (n1 < 1 || t1 < 1 || t2 < 2) return { valid: false, reason: 'Tham số thời gian phải dương' };
      const rad = (n1 / t1) * t2 * 2 * Math.PI;
      if (Math.abs(((rad * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n1, t1, t2 } = params;
      ` + TRIG11_B1_SA_HELPERS + String.raw`
      const rps = u.simplifyFrac(n1, t1);
      const turnsFrac = u.simplifyFrac(n1 * t2, t1);
      const radFrac = u.simplifyFrac(2 * n1 * t2, t1);
      const val = radFrac.value * Math.PI;
      const ansR = round1(val);
      const shortAnswer = fmtDec1(ansR);
      return {
        stem:
          'Một bánh xe của một loại xe quay được $' +
          n1 +
          '$ vòng trong $' +
          t1 +
          '$ giây. Tính góc theo rađian mà bánh xe quay được trong $' +
          t2 +
          '$ giây (kết quả làm tròn đến hàng phần chục).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Một giây bánh xe quay được số vòng là: $' + rps.latex + '$.',
          'Một vòng quay ứng với góc $2\\pi$. Sau $' + t2 + '$ giây có $' + rps.latex + '\\cdot ' + t2 + ' = ' + turnsFrac.latex + '$ vòng quay ứng với góc $' + fmtPiFrac(radFrac.num, radFrac.den) + ' \\approx ' + shortAnswer + '$ rad.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên t1 = 0', params: { n1: 4, t1: 0, t2: 10 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q29 (4 vòng/4s, 10s)', params: { n1: 4, t1: 4, t2: 10 }, expectedValid: true },
    ],
  },

  // D30 (Q30): Bánh xe bán kính R (cm) quay n1 vòng trong t1 giây -> quãng đường (m) trong t2 giây
  t11_b1_d30_wheel_distance_m_sa: {
    id: 't11_b1_d30_wheel_distance_m_sa',
    name: 'Tính quãng đường (m) bánh xe lăn theo bán kính và tốc độ quay (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng độ dài cung tròn',
    description: 'Bánh xe bán kính R (cm) quay được n1 vòng trong t1 giây. Tính độ dài quãng đường (m) xe đi được trong t2 giây.',
    conditionSummary: 'R ∈ [25; 75] cm, n1, t1, t2 >= 2, tránh biên làm tròn .x5',
    paramSpecs: [
      { name: 'R', label: 'Bán kính R (cm)', min: 30, max: 70, step: 5 },
      { name: 'n1', label: 'Số vòng quay n1', min: 4, max: 14 },
      { name: 't1', label: 'Thời gian quay t1 (giây)', min: 3, max: 9 },
      { name: 't2', label: 'Thời gian t2 (giây)', min: 4, max: 12 },
    ],
    validateCode: `
      const { R, n1, t1, t2 } = params;
      if (R < 10 || n1 < 1 || t1 < 1 || t2 < 1) return { valid: false, reason: 'Tham số dương không hợp lệ' };
      const dist = (n1 / t1) * t2 * 2 * Math.PI * (R / 100);
      if (Math.abs(((dist * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { R, n1, t1, t2 } = params;
      ` + TRIG11_B1_SA_HELPERS + String.raw`
      const rps = u.simplifyFrac(n1, t1);
      const rMeters = u.simplifyFrac(R, 100);
      const circCoeff = u.simplifyFrac(2 * R, 100);
      const distCoeff = u.simplifyFrac(n1 * t2 * 2 * R, t1 * 100);
      const val = distCoeff.value * Math.PI;
      const ansR = round1(val);
      const shortAnswer = fmtDec1(ansR);
      return {
        stem:
          'Một bánh xe của một loại xe có bán kính $' +
          R +
          '$ cm và quay được $' +
          n1 +
          '$ vòng trong $' +
          t1 +
          '$ giây. Tính độ dài quãng đường (theo đơn vị mét) xe đi được trong $' +
          t2 +
          '$ giây (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Một giây bánh xe quay được số vòng là: $' + rps.latex + '$.',
          'Một vòng quay ứng với quãng đường $2\\pi\\cdot \\dfrac{' + R + '}{100} = ' + fmtPiFrac(circCoeff.num, circCoeff.den) + '$ m.',
          'Sau $' + t2 + '$ giây quãng đường đi được là: $' + rps.latex + '\\cdot ' + t2 + '\\cdot ' + fmtPiFrac(circCoeff.num, circCoeff.den) + ' = ' + fmtPiFrac(distCoeff.num, distCoeff.den) + ' \\approx ' + shortAnswer + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên R = 0', params: { R: 0, n1: 9, t1: 6, t2: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q30 (R=50, 9 vòng/6s, 5s)', params: { R: 50, n1: 9, t1: 6, t2: 5 }, expectedValid: true },
    ],
  },

  // D31 (Q31): Máy kéo bánh xe trước đường kính D (cm), tốc độ v vòng/phút -> quãng đường (km) trong t phút
  t11_b1_d31_tractor_distance_km_sa: {
    id: 't11_b1_d31_tractor_distance_km_sa',
    name: 'Tính quãng đường (km) máy kéo di chuyển theo đường kính bánh xe (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Ứng dụng độ dài cung tròn',
    description: 'Máy kéo bánh xe trước đường kính D (cm) quay v vòng/phút. Tính quãng đường (km) đi được trong t phút (làm tròn hàng phần mười).',
    conditionSummary: 'D ∈ [60; 120] cm, v ∈ [10; 25] vòng/phút, t ∈ [8; 25] phút, tránh biên .x5',
    paramSpecs: [
      { name: 'D', label: 'Đường kính bánh trước D (cm)', min: 64, max: 110, step: 2 },
      { name: 'v', label: 'Tốc độ v (vòng/phút)', min: 12, max: 24 },
      { name: 't', label: 'Thời gian t (phút)', min: 10, max: 25 },
    ],
    validateCode: `
      const { D, v, t } = params;
      if (D <= 0 || v <= 0 || t <= 0) return { valid: false, reason: 'Tham số dương không hợp lệ' };
      const km = (v * t * D * Math.PI) / 100000;
      if (km < 0.2) return { valid: false, reason: 'Quãng đường quá nhỏ' };
      if (Math.abs(((km * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { D, v, t } = params;
      ` + TRIG11_B1_SA_HELPERS + String.raw`
      const r = D / 2;
      const turns = v * t;
      const cmCoeff = turns * D;
      const kmExact = (cmCoeff * Math.PI) / 100000;
      const ansR = round1(kmExact);
      const shortAnswer = fmtDec1(ansR);
      return {
        stem:
          'Một máy kéo nông nghiệp với bánh xe trước có đường kính là $' +
          D +
          '$ cm, xe chuyển động với vận tốc không đổi trên một đoạn đường thẳng. Biết rằng vận tốc của bánh xe trước trong chuyển động này là $' +
          v +
          '$ vòng/phút. Tính quãng đường mà máy kéo đi được (bằng km) trong $' +
          t +
          '$ phút (làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chu vi của bánh trước là $2\\pi \\cdot ' + r + ' = ' + D + '\\pi$ cm.',
          'Trong $' + t + '$ phút bánh xe trước chuyển động được $' + v + '\\cdot ' + t + ' = ' + turns + '$ vòng.',
          'Quãng đường đi được là $' + turns + '\\cdot ' + D + '\\pi = ' + cmCoeff + '\\pi$ cm $= ' + (cmCoeff / 100000) + '\\pi$ km $\\approx ' + shortAnswer + '$ km.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên D = 0', params: { D: 0, v: 14, t: 12 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q31 (D=86, 14 vòng/phút, 12 phút)', params: { D: 86, v: 14, t: 12 }, expectedValid: true },
    ],
  },

  // D32 (Q32): Quạt trần quay n vòng/phút theo chiều dương -> sau t giây quay góc aπ rad, tìm a
  t11_b1_d32_ceiling_fan_angle_sa: {
    id: 't11_b1_d32_ceiling_fan_angle_sa',
    name: 'Tính số đo góc aπ mà cánh quạt quay được theo tốc độ vòng/phút (Trả lời ngắn)',
    category: 'SA',
    level: 'Biết',
    topicTag: 'Ứng dụng tốc độ góc',
    description: 'Quạt trần quay tốc độ n vòng/phút theo chiều dương. Sau t giây cánh quạt quay được góc aπ radian. Tìm a.',
    conditionSummary: 'n ∈ [60; 180], t ∈ [3; 15], n·t chia hết cho 30 để a là số nguyên',
    paramSpecs: [
      { name: 'n', label: 'Tốc độ quay n (vòng/phút)', min: 60, max: 180, step: 6 },
      { name: 't', label: 'Thời gian t (giây)', min: 3, max: 15 },
    ],
    validateCode: `
      const { n, t } = params;
      if (n <= 0 || t <= 0 || (n * t) % 30 !== 0) {
        return { valid: false, reason: 'Cần (n·t) chia hết cho 30 để hệ số a nguyên đẹp' };
      }
      return { valid: true };
    `,
    generateCode: String.raw`
      const { n, t } = params;
      const a = (n * t) / 30;
      const shortAnswer = String(a);
      const omegaFrac = u.simplifyFrac(n, 30);
      return {
        stem:
          'Một chiếc quạt trần $5$ cánh quay với tốc độ $' +
          n +
          '$ vòng trong một phút. Chọn chiều quay của quạt là chiều dương. Sau $' +
          t +
          '$ giây, cánh quạt quay được một góc có số đo là $a\\pi$ radian. Tìm $a$.',
        shortAnswer,
        numericValue: a,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Tốc độ góc của quạt là $\\omega = ' + n + '\\cdot \\dfrac{2\\pi}{60} = ' + omegaFrac.latex + '\\pi\\;(\\text{rad/s})$.',
          'Sau $' + t + '$ giây, cánh quạt quay được góc $\\alpha = \\omega\\cdot ' + t + ' = \\dfrac{' + n + '\\cdot ' + t + '}{30}\\pi = ' + a + '\\pi\\;\\text{rad}$. Vậy $a = ' + a + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a không nguyên', params: { n: 96, t: 4 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q32 (96 vòng/phút, 5s)', params: { n: 96, t: 5 }, expectedValid: true },
    ],
  },

  // D33 (Q33): Kim phút & kim giờ đồng hồ lớn trong m phút -> tính tổng x + y (làm tròn hàng phần mười)
  t11_b1_d33_clock_hands_arc_sum_sa: {
    id: 't11_b1_d33_clock_hands_arc_sum_sa',
    name: 'Tính tổng độ dài cung tròn kim phút và kim giờ vạch nên (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Ứng dụng độ dài cung tròn',
    description: 'Cho chiều dài kim phút l1 và kim giờ l2 (m). Trong m phút, tính tổng độ dài cung tròn x + y mà hai đầu kim vạch nên.',
    conditionSummary: 'l2 < l1, m ∈ {10, 15, 20, 25, 30, 40, 45}, tránh biên làm tròn .x5',
    paramSpecs: [
      { name: 'l1Cm', label: 'Chiều dài kim phút (cm)', min: 140, max: 240, step: 2 },
      { name: 'l2Cm', label: 'Chiều dài kim giờ (cm)', min: 90, max: 180, step: 1 },
      { name: 'mIdx', label: 'Khoảng thời gian (0:10, 1:15, 2:20, 3:30, 4:45 phút)', min: 0, max: 4 },
    ],
    validateCode: `
      const { l1Cm, l2Cm, mIdx } = params;
      if (l2Cm >= l1Cm - 15) return { valid: false, reason: 'Kim phút phải dài hơn kim giờ rõ rệt' };
      const ms = [10, 15, 20, 30, 45];
      const mins = ms[mIdx];
      if (!mins) return { valid: false, reason: 'Chỉ số phút không hợp lệ' };
      const l1 = l1Cm / 100, l2 = l2Cm / 100;
      const x = 2 * Math.PI * l1 * (mins / 60);
      const y = 2 * Math.PI * l2 * (mins / 720);
      const sum = x + y;
      if (Math.abs(((sum * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { l1Cm, l2Cm, mIdx } = params;
      ` + TRIG11_B1_SA_HELPERS + String.raw`
      const ms = [10, 15, 20, 30, 45];
      const mins = ms[mIdx];
      const l1 = l1Cm / 100;
      const l2 = l2Cm / 100;
      const x = 2 * Math.PI * l1 * (mins / 60);
      const y = 2 * Math.PI * l2 * (mins / 720);
      const sum = x + y;
      const ansR = round1(sum);
      const shortAnswer = fmtDec1(ansR);
      const fmt2VN = (v) => String(v.toFixed(2)).replace('.', ',');
      const fmt3VN = (v) => String(v.toFixed(3)).replace('.', ',');
      return {
        stem:
          'Kim phút và kim giờ của một chiếc đồng hồ lớn theo thứ tự dài $' +
          fmt2VN(l1) +
          '$ m và $' +
          fmt2VN(l2) +
          '$ m. Hỏi trong $' +
          mins +
          '$ phút, mũi kim phút vạch nên cung tròn có độ dài $x$ (m), mũi kim giờ vạch nên cung tròn có độ dài $y$ (m). Tính $x + y$ (chỉ làm tròn kết quả cuối cùng đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Trong $' + mins + '$ phút, kim phút quay được $\\dfrac{' + mins + '}{60}$ vòng nên $x = 2\\pi\\cdot ' + fmt2VN(l1) + '\\cdot \\dfrac{' + mins + '}{60} \\approx ' + fmt3VN(x) + '$ m.',
          'Trong $' + mins + '$ phút, kim giờ quay được $\\dfrac{' + mins + '}{720}$ vòng nên $y = 2\\pi\\cdot ' + fmt2VN(l2) + '\\cdot \\dfrac{' + mins + '}{720} \\approx ' + fmt3VN(y) + '$ m.',
          'Do đó $x + y \\approx ' + shortAnswer + '$ m.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên kim giờ dài hơn kim phút', params: { l1Cm: 140, l2Cm: 160, mIdx: 1 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q33 (1,96m & 1,47m, 15 phút)', params: { l1Cm: 196, l2Cm: 147, mIdx: 1 }, expectedValid: true },
    ],
  },

  // D34 (Q34): Cho cos α = a/b với α ∈ góc phần tư -> tính sin α làm tròn hàng phần mười
  t11_b1_d34_sin_decimal_from_cos_sa: {
    id: 't11_b1_d34_sin_decimal_from_cos_sa',
    name: 'Tính giá trị sin α gần đúng khi biết cos α (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hệ thức lượng giác cơ bản',
    description: 'Cho cos α và khoảng góc phần tư. Tính sin α làm tròn đến hàng phần mười.',
    conditionSummary: '1 <= a < b <= 15, gcd(a, b) = 1, tránh biên làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Tử số |cos α|', min: 2, max: 11 },
      { name: 'b', label: 'Mẫu số b', min: 5, max: 15 },
      { name: 'm', label: 'Khoảng (mπ/2; (m+1)π/2)', min: 0, max: 3 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a <= 0 || a >= b) return { valid: false, reason: 'Cần 0 < a < b' };
      let x = a, y = b;
      while (y !== 0) { const t = y; y = x % y; x = t; }
      if (x !== 1) return { valid: false, reason: 'Cần gcd(a, b) = 1' };
      const val = Math.sqrt(b * b - a * a) / b;
      if (Math.abs(((val * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, m } = params;
      ` + TRIG11_B1_SA_HELPERS + String.raw`
      const q = (((m % 4) + 4) % 4) + 1;
      const cosSign = (q === 1 || q === 4) ? 1 : -1;
      const sinSign = (q === 1 || q === 2) ? 1 : -1;
      const cosLatex = u.simplifyFrac(cosSign * a, b).latex;
      const diff = b * b - a * a;
      const sinRad = fmtRadFrac(sinSign, diff, b);
      const val = sinSign * Math.sqrt(diff) / b;
      const ansR = round1(val);
      const shortAnswer = fmtDec1(ansR);
      const intervalStr = fmtIntervalHalfPi(m);
      return {
        stem:
          'Cho góc lượng giác $\\alpha$ thỏa mãn $\\cos \\alpha = ' +
          cosLatex +
          ',\\, \\alpha \\in ' +
          intervalStr +
          '$. Tính $\\sin\\alpha$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vì $\\alpha \\in ' + intervalStr + '$ nên $\\sin\\alpha ' + (sinSign > 0 ? '> 0' : '< 0') + '$.',
          '$\\sin\\alpha = ' + (sinSign > 0 ? '' : '-') + '\\sqrt{1 - \\dfrac{' + (a * a) + '}{' + (b * b) + '}} = ' + sinRad + ' \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 7, b: 7, m: 0 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q34 (cos = 2/7, (0; π/2))', params: { a: 2, b: 7, m: 0 }, expectedValid: true },
    ],
  },

  // D35 (Q35): Cho cos α âm -> tính tan α làm tròn hàng phần mười
  t11_b1_d35_tan_decimal_from_cos_sa: {
    id: 't11_b1_d35_tan_decimal_from_cos_sa',
    name: 'Tính giá trị tan α gần đúng khi biết cos α và góc phần tư (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hệ thức lượng giác cơ bản',
    description: 'Cho cos α và khoảng góc phần tư. Tính tan α làm tròn đến hàng phần mười.',
    conditionSummary: '3 <= a < b <= 18, gcd(a, b) = 1, tránh biên làm tròn .x5',
    paramSpecs: [
      { name: 'a', label: 'Tử số |cos α|', min: 5, max: 15 },
      { name: 'b', label: 'Mẫu số b', min: 7, max: 18 },
      { name: 'm', label: 'Khoảng (mπ/2; (m+1)π/2)', min: 1, max: 5 },
    ],
    validateCode: `
      const { a, b } = params;
      if (a <= 0 || a >= b) return { valid: false, reason: 'Cần 0 < a < b' };
      let x = a, y = b;
      while (y !== 0) { const t = y; y = x % y; x = t; }
      if (x !== 1) return { valid: false, reason: 'Cần gcd(a, b) = 1' };
      const val = Math.sqrt(b * b - a * a) / a;
      if (Math.abs(((val * 10) % 1) - 0.5) < 0.03) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { a, b, m } = params;
      ` + TRIG11_B1_SA_HELPERS + String.raw`
      const q = (((m % 4) + 4) % 4) + 1;
      const cosSign = (q === 1 || q === 4) ? 1 : -1;
      const sinSign = (q === 1 || q === 2) ? 1 : -1;
      const tanSign = sinSign * cosSign;
      const cosLatex = u.simplifyFrac(cosSign * a, b).latex;
      const diff = b * b - a * a;
      const sinRad = fmtRadFrac(sinSign, diff, b);
      const val = tanSign * (Math.sqrt(diff) / a);
      const ansR = round1(val);
      const shortAnswer = fmtDec1(ansR);
      const intervalStr = fmtIntervalHalfPi(m);
      return {
        stem:
          'Cho góc lượng giác $\\alpha$ thỏa mãn $\\cos \\alpha = ' +
          cosLatex +
          ',\\, \\alpha \\in ' +
          intervalStr +
          '$. Tính $\\tan\\alpha$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Vì $\\alpha \\in ' + intervalStr + '$ nên $\\sin\\alpha ' + (sinSign > 0 ? '> 0' : '< 0') + '$.',
          '$\\sin\\alpha = ' + (sinSign > 0 ? '' : '-') + '\\sqrt{1 - \\dfrac{' + (a * a) + '}{' + (b * b) + '}} = ' + sinRad + '$.',
          '$\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = (' + sinRad + ') : (' + cosLatex + ') \\approx ' + shortAnswer + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên a >= b', params: { a: 16, b: 16, m: 5 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q35 (cos = -13/16, (5π/2; 3π))', params: { a: 13, b: 16, m: 5 }, expectedValid: true },
    ],
  },

  // D36 (Q36): Cho tan x = t -> tính (a cos x + b sin x)/(c cos x + d sin x) làm tròn hàng phần mười
  t11_b1_d36_homog_deg1_expr_sa: {
    id: 't11_b1_d36_homog_deg1_expr_sa',
    name: 'Tính giá trị biểu thức phân thức bậc nhất theo sin x, cos x khi biết tan x (Trả lời ngắn)',
    category: 'SA',
    level: 'Hiểu',
    topicTag: 'Hệ thức lượng giác cơ bản',
    description: 'Cho tan x = t. Tính giá trị P = (a·cos x + b·sin x)/(c·cos x + d·sin x) làm tròn đến hàng phần mười.',
    conditionSummary: 't ≠ 0, c + d·t ≠ 0, tránh biên làm tròn .x5',
    paramSpecs: [
      { name: 't', label: 'Giá trị tan x', min: -5, max: 6 },
      { name: 'a', label: 'Hệ số a của cos x (tử)', min: 1, max: 6 },
      { name: 'b', label: 'Hệ số b của sin x (tử)', min: 1, max: 7 },
      { name: 'c', label: 'Hệ số c của cos x (mẫu)', min: 1, max: 5 },
      { name: 'd', label: 'Hệ số d của sin x (mẫu)', min: 1, max: 5 },
    ],
    validateCode: `
      const { t, a, b, c, d } = params;
      if (t === 0) return { valid: false, reason: 't = 0 tầm thường' };
      const den = c + d * t;
      if (den === 0) return { valid: false, reason: 'Mẫu số bằng 0' };
      const val = (a + b * t) / den;
      if (Math.abs(((Math.abs(val) * 10) % 1) - 0.5) < 0.02) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { t, a, b, c, d } = params;
      ` + TRIG11_B1_SA_HELPERS + String.raw`
      const fmtLin = (c1, c2) => {
        const s1 = c1 === 1 ? '\\cos x' : c1 + '\\cos x';
        const s2 = c2 === 1 ? ' + \\sin x' : ' + ' + c2 + '\\sin x';
        return s1 + s2;
      };
      const frac = u.simplifyFrac(a + b * t, c + d * t);
      const ansR = round1(frac.value);
      const shortAnswer = fmtDec1(ansR);
      const exprTex = '\\frac{' + fmtLin(a, b) + '}{' + fmtLin(c, d) + '}';
      return {
        stem:
          'Cho góc lượng giác $x$ thỏa mãn $\\tan x = ' +
          t +
          '$. Tính giá trị biểu thức $P = ' +
          exprTex +
          '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chia cả tử và mẫu của $P$ cho $\\cos x \\neq 0$:',
          '$P = ' + exprTex + ' = \\frac{' + (b === 1 ? '' : b) + '\\tan x + ' + a + '}{' + (d === 1 ? '' : d) + '\\tan x + ' + c + '} = ' + frac.latex + (frac.isInteger ? '' : ' \\approx ' + shortAnswer) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên mẫu c + d*t = 0', params: { t: -1, a: 1, b: 5, c: 2, d: 2 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q36 (tan x = 4)', params: { t: 4, a: 1, b: 5, c: 2, d: 2 }, expectedValid: true },
    ],
  },

  // D37 (Q37): Cho tan x = t -> tính (a sin^2 x + b sin x cos x)/(c sin^2 x + d cos^2 x) làm tròn hàng phần mười
  t11_b1_d37_homog_deg2_expr_sa: {
    id: 't11_b1_d37_homog_deg2_expr_sa',
    name: 'Tính giá trị biểu thức thuần nhất bậc hai theo sin x, cos x khi biết tan x (Trả lời ngắn)',
    category: 'SA',
    level: 'Vận dụng',
    topicTag: 'Hệ thức lượng giác cơ bản',
    description: 'Cho tan x = t. Tính giá trị P = (a·sin²x + b·sin x cos x)/(c·sin²x + d·cos²x) làm tròn đến hàng phần mười.',
    conditionSummary: 't ≠ 0, c·t² + d ≠ 0, tránh biên làm tròn .x5',
    paramSpecs: [
      { name: 't', label: 'Giá trị tan x', min: -5, max: 5 },
      { name: 'a', label: 'Hệ số a của sin²x (tử)', min: 2, max: 8 },
      { name: 'b', label: 'Hệ số b của sin x cos x (tử)', min: 2, max: 8 },
      { name: 'c', label: 'Hệ số c của sin²x (mẫu)', min: -5, max: -1 },
      { name: 'd', label: 'Hệ số d của cos²x (mẫu)', min: -5, max: -1 },
    ],
    validateCode: `
      const { t, a, b, c, d } = params;
      if (t === 0) return { valid: false, reason: 't = 0 tầm thường' };
      const den = c * t * t + d;
      if (den === 0) return { valid: false, reason: 'Mẫu số bằng 0' };
      const num = a * t * t + b * t;
      if (num === 0) return { valid: false, reason: 'Tử số bằng 0 quá tầm thường' };
      const val = num / den;
      if (Math.abs(((Math.abs(val) * 10) % 1) - 0.5) < 0.02) return { valid: false, reason: 'Tránh ranh giới làm tròn .x5' };
      return { valid: true };
    `,
    generateCode: String.raw`
      const { t, a, b, c, d } = params;
      ` + TRIG11_B1_SA_HELPERS + String.raw`
      const frac = u.simplifyFrac(a * t * t + b * t, c * t * t + d);
      const ansR = round1(frac.value);
      const shortAnswer = fmtDec1(ansR);
      const fmtDenTrig = (c1, c2) => {
        const s1 = c1 === -1 ? '-\\sin^2 x' : c1 + '\\sin^2 x';
        const s2 = c2 < 0 ? (c2 === -1 ? '-\\cos^2 x' : '-' + Math.abs(c2) + '\\cos^2 x') : ('+' + (c2 === 1 ? '' : c2) + '\\cos^2 x');
        return s1 + s2;
      };
      const exprTex = '\\dfrac{' + a + '\\sin^2 x +' + b + '\\sin x\\cos x}{' + fmtDenTrig(c, d) + '}';
      const tanForm = '\\dfrac{' + a + '\\tan^2 x+' + b + '\\tan x}{' + c + '\\tan^2 x ' + (d < 0 ? d : '+' + d) + '}';
      return {
        stem:
          'Cho góc lượng giác $x$ thỏa mãn $\\tan x = ' +
          t +
          '$. Tính giá trị biểu thức $P = ' +
          exprTex +
          '$ (kết quả làm tròn đến hàng phần mười).',
        shortAnswer,
        numericValue: ansR,
        answerSummary: shortAnswer,
        solutionSteps: [
          'Chia cả tử và mẫu của $P$ cho $\\cos^2 x \\neq 0$:',
          '$P = ' + exprTex + ' = ' + tanForm + ' = ' + frac.latex + (frac.isInteger ? '' : ' \\approx ' + shortAnswer) + '$.',
        ],
      };
    `,
    boundaryCases: [
      { label: 'Biên tử bằng 0 (at + b = 0)', params: { t: -1, a: 6, b: 6, c: -2, d: -3 }, expectedValid: false },
      { label: 'Mẫu chuẩn Q37 (tan x = 3)', params: { t: 3, a: 6, b: 6, c: -2, d: -3 }, expectedValid: true },
    ],
  },
};
