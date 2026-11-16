import {
  GeneratedQuestionContent,
  MathTemplate,
  StressTestItemResult,
  StressTestReport,
} from '../types/math';
import { createSeededRng, mathUtilsContext, randInt } from './mathUtils';

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export function evaluateTemplateValidator(
  template: MathTemplate,
  params: Record<string, number>
): ValidationResult {
  try {
    const fn = new Function('params', 'u', template.validateCode) as (
      p: Record<string, number>,
      u: typeof mathUtilsContext
    ) => ValidationResult;
    const res = fn(params, mathUtilsContext);
    if (!res || typeof res.valid !== 'boolean') {
      return { valid: false, reason: 'Hàm kiểm tra không trả về { valid: boolean }' };
    }
    return res;
  } catch (err) {
    return {
      valid: false,
      reason: `Lỗi ngoại lệ khi kiểm tra điều kiện: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

export function evaluateTemplateGenerator(
  template: MathTemplate,
  params: Record<string, number>,
  seed: number
): GeneratedQuestionContent {
  const rng = createSeededRng(seed);
  const fn = new Function('params', 'u', 'rng', template.generateCode) as (
    p: Record<string, number>,
    u: typeof mathUtilsContext,
    r: () => number
  ) => Omit<GeneratedQuestionContent, 'params'>;
  const result = fn(params, mathUtilsContext, rng);
  return {
    ...result,
    params: { ...params },
  };
}

export function sampleParamsFromSpecs(
  template: MathTemplate,
  rng: () => number
): Record<string, number> {
  const params: Record<string, number> = {};
  for (const spec of template.paramSpecs) {
    let val = randInt(rng, spec.min, spec.max, spec.step ?? 1);
    if (spec.allowZero === false && val === 0 && (spec.min < 0 || spec.max > 0)) {
      val = spec.max > 0 ? 1 : -1;
    }
    params[spec.name] = val;
  }
  return params;
}

/**
 * Generates a guaranteed-valid concrete instance by sampling parameters and checking validateCode.
 */
export function generateValidInstance(
  template: MathTemplate,
  seed: number,
  maxAttempts = 300
): { content: GeneratedQuestionContent; attempts: number } {
  const rng = createSeededRng(seed);
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const params = sampleParamsFromSpecs(template, rng);
    const check = evaluateTemplateValidator(template, params);
    if (check.valid) {
      const content = evaluateTemplateGenerator(template, params, seed + attempt * 7919);
      return { content, attempts: attempt };
    }
  }
  throw new Error(
    `Không tìm được bộ tham số thỏa mãn điều kiện sau ${maxAttempts} lần thử cho dạng "${template.name}". Hãy kiểm tra lại miền giá trị hoặc ràng buộc.`
  );
}

/**
 * Checks mathematical & formatting invariants on any generated output.
 */
export function auditGeneratedInvariants(
  template: MathTemplate,
  content: GeneratedQuestionContent
): string[] {
  const errors: string[] = [];

  const textFields: Array<{ label: string; value: string }> = [
    { label: 'Đề bài', value: content.stem },
    { label: 'Đáp án tóm tắt', value: content.answerSummary },
    ...content.solutionSteps.map((s, idx) => ({ label: `Lời giải bước ${idx + 1}`, value: s })),
  ];

  if (content.options) {
    content.options.forEach((opt, i) => {
      textFields.push({ label: `Phương án ${String.fromCharCode(65 + i)}`, value: opt });
    });
  }
  if (content.tfStatements) {
    content.tfStatements.forEach((st) => {
      textFields.push({ label: `Ý ${st.key}`, value: st.text });
    });
  }

  for (const field of textFields) {
    const v = field.value;
    if (!v || typeof v !== 'string' || !v.trim()) {
      errors.push(`${field.label} bị rỗng`);
      continue;
    }
    if (/\bNaN\b|\bInfinity\b|\bundefined\b|\bnull\b/i.test(v)) {
      errors.push(`${field.label} chứa giá trị lỗi (${v.match(/\bNaN\b|\bInfinity\b|\bundefined\b|\bnull\b/i)?.[0]})`);
    }
    if (/(\+\s*-|-\s*-|\+\s*\+)/.test(v.replace(/\\pm/g, ''))) {
      errors.push(`${field.label} chứa dấu kép chưa rút gọn (+- hoặc --)`);
    }
    if (/\\frac\{[^}]+\}\{0\}/.test(v)) {
      errors.push(`${field.label} có phép chia cho 0`);
    }
    // Check balanced $ math delimiters
    const dollarCount = (v.match(/(?<!\\)\$/g) || []).length;
    if (dollarCount % 2 !== 0) {
      errors.push(`${field.label} bị lẻ dấu $ LaTeX`);
    }
  }

  if (template.category === 'MC') {
    if (!content.options || content.options.length !== 4) {
      errors.push('Câu nhiều lựa chọn (MC) phải có đúng 4 phương án A, B, C, D');
    } else {
      const normalized = content.options.map((o) => o.replace(/\s+/g, '').toLowerCase());
      const uniqueCount = new Set(normalized).size;
      if (uniqueCount < 4) {
        errors.push('Có phương án nhiễu trùng lặp nhau trong câu MC');
      }
      if (
        content.correctIndex === undefined ||
        content.correctIndex < 0 ||
        content.correctIndex > 3
      ) {
        errors.push('Chỉ số đáp án đúng không hợp lệ');
      }
    }
  }

  if (template.category === 'TF') {
    if (!content.tfStatements || content.tfStatements.length !== 4) {
      errors.push('Câu Đúng - Sai (TF) phải có đúng 4 mệnh đề a, b, c, d');
    } else {
      const keys = content.tfStatements.map((s) => s.key).join(',');
      if (keys !== 'a,b,c,d') {
        errors.push('Thứ tự mệnh đề TF phải là a, b, c, d');
      }
    }
  }

  if (template.category === 'SA') {
    if (!content.shortAnswer || !content.shortAnswer.trim()) {
      errors.push('Câu trả lời ngắn (SA) thiếu đáp án chuẩn hóa');
    }
    if (content.numericValue !== undefined && !Number.isFinite(content.numericValue)) {
      errors.push('Giá trị số của đáp án SA không hữu hạn');
    }
  }

  if (template.category === 'ES') {
    if (!content.rubric || content.rubric.length === 0) {
      errors.push('Câu tự luận (ES) thiếu biểu điểm chi tiết');
    }
  }

  return errors;
}

/**
 * Executes comprehensive edge-case, boundary, and 100-trial randomized stress testing.
 */
export function runTemplateStressTest(
  template: MathTemplate,
  randomTrialCount = 100
): StressTestReport {
  const boundaryResults: StressTestItemResult[] = [];
  const invariantFailures: StressTestItemResult[] = [];

  // 1. Explicit boundary & degenerate test cases
  template.boundaryCases.forEach((bc, idx) => {
    const check = evaluateTemplateValidator(template, bc.params);
    let passedInvariant = true;
    const invariantErrors: string[] = [];
    let sampleStem: string | undefined;
    let sampleAnswer: string | undefined;

    if (check.valid !== bc.expectedValid) {
      passedInvariant = false;
      invariantErrors.push(
        bc.expectedValid
          ? `Trường hợp biên hợp lệ bị từ chối nhầm (${check.reason || 'không rõ lý do'})`
          : `Trường hợp suy biến/lỗi logic không bị chặn bởi điều kiện ràng buộc`
      );
    }

    if (check.valid) {
      try {
        const content = evaluateTemplateGenerator(template, bc.params, 9001 + idx * 13);
        sampleStem = content.stem;
        sampleAnswer = content.answerSummary;
        const errs = auditGeneratedInvariants(template, content);
        if (errs.length > 0) {
          passedInvariant = false;
          invariantErrors.push(...errs);
        }
      } catch (err) {
        passedInvariant = false;
        invariantErrors.push(
          `Ngoại lệ khi sinh đề tại biên: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    const res: StressTestItemResult = {
      id: `boundary_${idx}`,
      label: bc.label,
      kind: 'boundary',
      params: bc.params,
      valid: check.valid,
      reason: check.reason,
      passedInvariant,
      invariantErrors,
      sampleStem,
      sampleAnswer,
    };
    boundaryResults.push(res);
    if (!passedInvariant) invariantFailures.push(res);
  });

  // 2. Randomized trials across full parameter domain (including zeros)
  const rng = createSeededRng(20261113);
  let validRandomGenerated = 0;
  let rejectedInvalidRandom = 0;

  for (let i = 0; i < randomTrialCount; i++) {
    const params: Record<string, number> = {};
    for (const spec of template.paramSpecs) {
      params[spec.name] = randInt(rng, spec.min, spec.max, spec.step ?? 1);
    }
    const check = evaluateTemplateValidator(template, params);
    if (!check.valid) {
      rejectedInvalidRandom++;
      continue;
    }
    validRandomGenerated++;

    try {
      const content = evaluateTemplateGenerator(template, params, 50000 + i * 31);
      const errs = auditGeneratedInvariants(template, content);
      if (errs.length > 0) {
        invariantFailures.push({
          id: `random_${i}`,
          label: `Mẫu ngẫu nhiên #${i + 1}`,
          kind: 'random',
          params,
          valid: true,
          passedInvariant: false,
          invariantErrors: errs,
          sampleStem: content.stem,
          sampleAnswer: content.answerSummary,
        });
      }
    } catch (err) {
      invariantFailures.push({
        id: `random_${i}`,
        label: `Mẫu ngẫu nhiên #${i + 1}`,
        kind: 'random',
        params,
        valid: true,
        passedInvariant: false,
        invariantErrors: [
          `Ngoại lệ runtime: ${err instanceof Error ? err.message : String(err)}`,
        ],
      });
    }
  }

  return {
    templateId: template.id,
    totalRandomTrials: randomTrialCount,
    validRandomGenerated,
    rejectedInvalidRandom,
    boundaryResults,
    invariantFailures,
    passedAll: invariantFailures.length === 0 && validRandomGenerated > 0,
    executedAt: new Date().toLocaleTimeString('vi-VN'),
  };
}

export type BoundaryExpectation = 'auto' | 'valid' | 'invalid';

export interface CustomBoundaryTestResult {
  params: Record<string, number>;
  status: 'passed' | 'blocked' | 'error' | 'mismatch';
  valid: boolean;
  reason?: string;
  content: GeneratedQuestionContent | null;
  errors: string[];
  executedAt: string;
}

export function runCustomBoundaryTest(
  template: MathTemplate,
  params: Record<string, number>,
  expectation: BoundaryExpectation = 'auto'
): CustomBoundaryTestResult {
  const executedAt = new Date().toLocaleTimeString('vi-VN');
  const paramEntries = Object.entries(params);
  for (const [k, v] of paramEntries) {
    if (typeof v !== 'number' || Number.isNaN(v)) {
      return {
        params,
        status: 'error',
        valid: false,
        content: null,
        errors: [`Tham số "${k}" không phải là số hợp lệ.`],
        executedAt,
      };
    }
  }

  let validatorFn: (p: Record<string, number>, u: typeof mathUtilsContext) => ValidationResult;
  try {
    validatorFn = new Function('params', 'u', template.validateCode) as typeof validatorFn;
  } catch (err) {
    return {
      params,
      status: 'error',
      valid: false,
      content: null,
      errors: [
        `Lỗi cú pháp trong hàm validate: ${err instanceof Error ? err.message : String(err)}`,
      ],
      executedAt,
    };
  }

  let check: ValidationResult;
  try {
    check = validatorFn(params, mathUtilsContext);
    if (!check || typeof check.valid !== 'boolean') {
      return {
        params,
        status: 'error',
        valid: false,
        content: null,
        errors: ['Hàm validate không trả về đối tượng { valid: boolean }.'],
        executedAt,
      };
    }
  } catch (err) {
    return {
      params,
      status: 'error',
      valid: false,
      content: null,
      errors: [
        `Lỗi thực thi trong hàm validate: ${err instanceof Error ? err.message : String(err)}`,
      ],
      executedAt,
    };
  }

  if (!check.valid) {
    const mismatch = expectation === 'valid';
    return {
      params,
      status: mismatch ? 'mismatch' : 'blocked',
      valid: false,
      reason: check.reason || 'Vi phạm điều kiện ràng buộc',
      content: null,
      errors: mismatch
        ? [
            `Kỳ vọng bộ tham số hợp lệ nhưng đã bị chặn (${check.reason || 'không có lý do'}).`,
          ]
        : [],
      executedAt,
    };
  }

  try {
    const content = evaluateTemplateGenerator(template, params, 9991);
    const invariantErrors = auditGeneratedInvariants(template, content);
    if (invariantErrors.length > 0) {
      return {
        params,
        status: 'error',
        valid: true,
        content,
        errors: invariantErrors,
        executedAt,
      };
    }
    const mismatch = expectation === 'invalid';
    return {
      params,
      status: mismatch ? 'mismatch' : 'passed',
      valid: true,
      content,
      errors: mismatch
        ? ['Kỳ vọng bộ tham số suy biến bị chặn nhưng hàm validate đã cho phép đi qua.']
        : [],
      executedAt,
    };
  } catch (err) {
    return {
      params,
      status: 'error',
      valid: true,
      content: null,
      errors: [
        `Lỗi thực thi trong hàm sinh đề (generate): ${err instanceof Error ? err.message : String(err)}`,
      ],
      executedAt,
    };
  }
}

export interface EdgeSweepCaseResult {
  label: string;
  result: CustomBoundaryTestResult;
}

export function runEdgeSweepTest(template: MathTemplate): EdgeSweepCaseResult[] {
  const specs = template.paramSpecs;
  if (specs.length === 0) return [];

  const cases: Array<{ label: string; params: Record<string, number> }> = [];
  const baseMid = (): Record<string, number> => {
    const obj: Record<string, number> = {};
    for (const s of specs) {
      let mid = Math.round((s.min + s.max) / 2);
      if (s.allowZero === false && mid === 0) mid = s.max > 0 ? 1 : -1;
      obj[s.name] = mid;
    }
    return obj;
  };

  // 1. All zeros
  const allZero: Record<string, number> = {};
  specs.forEach((s) => (allZero[s.name] = 0));
  cases.push({ label: 'Tất cả tham số = 0', params: allZero });

  // 2. Single zero per parameter
  specs.forEach((s) => {
    const p = baseMid();
    p[s.name] = 0;
    cases.push({ label: `Biên ${s.name} = 0`, params: p });
  });

  // 3. Negative values
  const allNeg: Record<string, number> = {};
  specs.forEach((s, idx) => (allNeg[s.name] = -(idx + 1) * 5));
  cases.push({ label: 'Giá trị âm (-5, -10, ...)', params: allNeg });

  // 4. Extremely large positive & negative values
  const hugePos: Record<string, number> = {};
  specs.forEach((s, idx) => (hugePos[s.name] = 100000 + idx * 1000));
  cases.push({ label: 'Số cực lớn dương (~10^5)', params: hugePos });

  const hugeNeg: Record<string, number> = {};
  specs.forEach((s, idx) => (hugeNeg[s.name] = -(100000 + idx * 1000)));
  cases.push({ label: 'Số cực lớn âm (~-10^5)', params: hugeNeg });

  // 5. Configured Min / Max boundaries
  const allMin: Record<string, number> = {};
  const allMax: Record<string, number> = {};
  specs.forEach((s) => {
    allMin[s.name] = s.min;
    allMax[s.name] = s.max;
  });
  cases.push({ label: 'Biên dưới (Min cấu hình)', params: allMin });
  cases.push({ label: 'Biên trên (Max cấu hình)', params: allMax });

  return cases.map((c) => ({
    label: c.label,
    result: runCustomBoundaryTest(template, c.params, 'auto'),
  }));
}

