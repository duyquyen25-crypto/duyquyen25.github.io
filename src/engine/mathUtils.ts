export interface SimplifiedFraction {
  num: number;
  den: number;
  value: number;
  isInteger: boolean;
  latex: string;
  text: string;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export function simplifyFrac(num: number, den: number): SimplifiedFraction {
  if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) {
    throw new Error('Mẫu số bằng 0 hoặc giá trị không xác định');
  }
  let n = Math.round(num);
  let d = Math.round(den);
  if (d < 0) {
    n = -n;
    d = -d;
  }
  if (n === 0) {
    return { num: 0, den: 1, value: 0, isInteger: true, latex: '0', text: '0' };
  }
  const g = gcd(n, d);
  n = n / g;
  d = d / g;
  const isInteger = d === 1;
  const latex = isInteger ? `${n}` : n < 0 ? `-\\frac{${Math.abs(n)}}{${d}}` : `\\frac{${n}}{${d}}`;
  const text = isInteger ? `${n}` : `${n}/${d}`;
  return { num: n, den: d, value: n / d, isInteger, latex, text };
}

/**
 * Formats a single term `coeff * symbol` cleanly in Vietnamese math notation.
 * Handles coeff = 0, 1, -1 and leading/non-leading sign automatically.
 */
export function formatTerm(coeff: number, symbol: string, isFirst: boolean): string {
  if (coeff === 0) return '';
  const absVal = Math.abs(coeff);
  const sign = coeff < 0 ? (isFirst ? '-' : ' - ') : isFirst ? '' : ' + ';
  if (!symbol) {
    return `${sign}${absVal}`;
  }
  const coeffStr = absVal === 1 ? '' : `${absVal}`;
  return `${sign}${coeffStr}${symbol}`;
}

/**
 * Formats a polynomial from highest degree to constant:
 * formatPoly([1, 0, -3, 2], 'x') -> "x^3 - 3x + 2"
 */
export function formatPoly(coeffs: number[], varName = 'x'): string {
  const deg = coeffs.length - 1;
  const parts: string[] = [];
  for (let i = 0; i < coeffs.length; i++) {
    const c = coeffs[i];
    if (c === 0) continue;
    const power = deg - i;
    const sym = power === 0 ? '' : power === 1 ? varName : `${varName}^{${power}}`;
    parts.push(formatTerm(c, sym, parts.length === 0));
  }
  return parts.length > 0 ? parts.join('') : '0';
}

export function formatLinear(a: number, b: number, varName = 'x'): string {
  return formatPoly([a, b], varName);
}

export function formatQuadratic(a: number, b: number, c: number, varName = 'x'): string {
  return formatPoly([a, b, c], varName);
}

/** Formats signed constant inside expressions like `(x - 3)` or `(x + 2)` or `x` */
export function formatShift(varName: string, shift: number): string {
  if (shift === 0) return varName;
  return shift > 0 ? `${varName} + ${shift}` : `${varName} - ${Math.abs(shift)}`;
}

/** Formats signed number with explicit sign when appended, e.g. `+ 3` or `- 2` or empty if 0 */
export function formatTrailingConst(c: number): string {
  if (c === 0) return '';
  return c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
}

export function formatCoord3D(x: number, y: number, z: number): string {
  return `(${x};\\, ${y};\\, ${z})`;
}

export function formatPlaneEq(a: number, b: number, c: number, d: number): string {
  const parts: string[] = [];
  const t1 = formatTerm(a, 'x', parts.length === 0);
  if (t1) parts.push(t1);
  const t2 = formatTerm(b, 'y', parts.length === 0);
  if (t2) parts.push(t2);
  const t3 = formatTerm(c, 'z', parts.length === 0);
  if (t3) parts.push(t3);
  const t4 = formatTerm(d, '', parts.length === 0);
  if (t4) parts.push(t4);
  return `${parts.join('') || '0'} = 0`;
}

export function formatNumberVN(val: number, maxDecimals = 2): string {
  if (Number.isInteger(val)) return `${val}`;
  const rounded = Number(val.toFixed(maxDecimals));
  return `${rounded}`.replace('.', ',');
}

/** Deterministic PRNG (Mulberry32) */
export function createSeededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randInt(rng: () => number, min: number, max: number, step = 1): number {
  if (step <= 0) step = 1;
  const count = Math.floor((max - min) / step) + 1;
  if (count <= 1) return min;
  return min + Math.floor(rng() * count) * step;
}

export function shuffleWithRng<T>(items: T[], rng: () => number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Ensures 4 MC options are strictly distinct and shuffles them while tracking correctIndex */
export function buildUniqueMcOptions(
  correctOption: string,
  candidateDistractors: string[],
  rng: () => number,
  fallbackGenerator?: (idx: number) => string
): { options: string[]; correctIndex: number } {
  const seen = new Set<string>([correctOption.trim()]);
  const distractors: string[] = [];

  for (const cand of candidateDistractors) {
    const norm = cand.trim();
    if (!seen.has(norm) && norm.length > 0) {
      seen.add(norm);
      distractors.push(cand);
      if (distractors.length === 3) break;
    }
  }

  let guard = 1;
  while (distractors.length < 3 && guard < 30) {
    const fallback = fallbackGenerator ? fallbackGenerator(guard) : `${correctOption} + ${guard}`;
    const norm = fallback.trim();
    if (!seen.has(norm)) {
      seen.add(norm);
      distractors.push(fallback);
    }
    guard++;
  }

  let scaleExp = 2;
  while (distractors.length < 3 && scaleExp <= 18) {
    const scaledStep = Math.pow(10, scaleExp);
    const fallback = fallbackGenerator
      ? fallbackGenerator(scaledStep)
      : `${correctOption} + ${scaledStep}`;
    const norm = fallback.trim();
    if (!seen.has(norm)) {
      seen.add(norm);
      distractors.push(fallback);
    }
    scaleExp++;
  }

  const tagged = [
    { text: correctOption, isCorrect: true },
    ...distractors.slice(0, 3).map((text) => ({ text, isCorrect: false })),
  ];
  const shuffled = shuffleWithRng(tagged, rng);
  return {
    options: shuffled.map((x) => x.text),
    correctIndex: shuffled.findIndex((x) => x.isCorrect),
  };
}

/**
 * Parses Vietnamese/English student short answers into a numeric value when possible
 * Supports: "1,5", "1.5", "-3/4", " 0.75 "
 */
export function parseStudentNumeric(raw: string): number | null {
  if (!raw) return null;
  const cleaned = raw.trim().replace(/\s+/g, '').replace(/,/g, '.');
  if (!cleaned) return null;

  if (/^[+-]?\d+(\.\d+)?\/[+-]?\d+(\.\d+)?$/.test(cleaned)) {
    const [numStr, denStr] = cleaned.split('/');
    const num = Number(numStr);
    const den = Number(denStr);
    if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
      return num / den;
    }
    return null;
  }

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function compareShortAnswer(studentRaw: string, expectedRaw: string, expectedNum?: number): boolean {
  const sTrim = studentRaw.trim().replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();
  const eTrim = expectedRaw.trim().replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();
  if (!sTrim) return false;
  if (sTrim === eTrim) return true;

  const sNum = parseStudentNumeric(studentRaw);
  const eNum = expectedNum !== undefined ? expectedNum : parseStudentNumeric(expectedRaw);
  if (sNum !== null && eNum !== null) {
    return Math.abs(sNum - eNum) <= 0.015;
  }
  return false;
}

export function comb(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  const kk = Math.min(k, n - k);
  let res = 1;
  for (let i = 1; i <= kk; i++) {
    res = (res * (n - kk + i)) / i;
  }
  return Math.round(res);
}

/**
 * Upgrades top-level `\frac` inside inline math to `\dfrac` for standard, legible display sizing,
 * while keeping `\frac` compact inside exponents (`^{...}`), subscripts (`_{...}`), and nested fractions.
 */
export function upgradeTopLevelFractions(mathChunk: string): string {
  if (!mathChunk || !mathChunk.includes('\\frac')) return mathChunk;

  let out = '';
  const braceStack: Array<{ kind: 'compact' | 'normal'; childFracArgs: number }> = [];
  let topLevelFracArgs = 0;
  let pendingCompact = false;

  let i = 0;
  while (i < mathChunk.length) {
    const ch = mathChunk[i];

    if (ch === '\\') {
      if (mathChunk[i + 1] === '{' || mathChunk[i + 1] === '}' || mathChunk[i + 1] === '\\') {
        out += mathChunk.slice(i, i + 2);
        i += 2;
        continue;
      }
      const cmdMatch = mathChunk.slice(i).match(/^\\([a-zA-Z]+)/);
      if (cmdMatch) {
        const cmd = cmdMatch[1];
        if (cmd === 'frac') {
          const inCompact = braceStack.some((b) => b.kind === 'compact');
          out += inCompact ? '\\frac' : '\\dfrac';
          if (braceStack.length === 0) {
            topLevelFracArgs += 2;
          } else {
            braceStack[braceStack.length - 1].childFracArgs += 2;
          }
          pendingCompact = false;
          i += 5;
          continue;
        }
        if (cmd === 'dfrac' || cmd === 'tfrac') {
          out += '\\' + cmd;
          if (braceStack.length === 0) {
            topLevelFracArgs += 2;
          } else {
            braceStack[braceStack.length - 1].childFracArgs += 2;
          }
          pendingCompact = false;
          i += cmd.length + 1;
          continue;
        }
        out += '\\' + cmd;
        i += cmd.length + 1;
        continue;
      }
    }

    if (ch === '^' || ch === '_') {
      pendingCompact = true;
      out += ch;
      i++;
      continue;
    }

    if (ch === '{') {
      const parentFracArgs =
        braceStack.length === 0
          ? topLevelFracArgs
          : braceStack[braceStack.length - 1].childFracArgs;

      if (parentFracArgs > 0) {
        if (braceStack.length === 0) topLevelFracArgs--;
        else braceStack[braceStack.length - 1].childFracArgs--;
        braceStack.push({ kind: 'compact', childFracArgs: 0 });
        pendingCompact = false;
      } else if (pendingCompact) {
        braceStack.push({ kind: 'compact', childFracArgs: 0 });
        pendingCompact = false;
      } else {
        braceStack.push({ kind: 'normal', childFracArgs: 0 });
      }
      out += ch;
      i++;
      continue;
    }

    if (ch === '}') {
      if (braceStack.length > 0) braceStack.pop();
      out += ch;
      i++;
      continue;
    }

    if (!/\s/.test(ch)) {
      pendingCompact = false;
    }

    out += ch;
    i++;
  }

  return out;
}

export const mathUtilsContext = {
  gcd,
  lcm,
  simplifyFrac,
  formatTerm,
  formatPoly,
  formatLinear,
  formatQuadratic,
  formatShift,
  formatTrailingConst,
  formatCoord3D,
  formatPlaneEq,
  formatNumberVN,
  buildUniqueMcOptions,
  comb,
};
