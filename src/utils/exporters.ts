import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { jsPDF } from 'jspdf';
import { toCanvas } from 'html-to-image';
import {
  ExamPaper,
  ExamQuestionInstance,
  FunctionPlotDiagram,
  GeometryFigureDiagram,
  QuestionDiagramSpec,
  VariationTableDiagram,
} from '../types/math';
import { upgradeTopLevelFractions } from '../engine/mathUtils';

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Converts LaTeX-embedded Vietnamese text into clean Unicode math notation for Word (.docx) & CSV.
 */
export function latexToReadableUnicode(input: string): string {
  if (!input) return '';
  let s = input.replace(/\$\$/g, '').replace(/\$/g, '');
  s = s
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)')
    .replace(/\\sqrt\{([^{}]+)\}/g, '√($1)')
    .replace(/\\overrightarrow\{([^{}]+)\}/g, 'vectơ $1')
    .replace(/\\vec\{([^{}]+)\}/g, 'vectơ $1')
    .replace(/\\widehat\{([^{}]+)\}/g, 'góc $1')
    .replace(/\\overline\{([^{}]+)\}/g, '$1 ngang')
    .replace(/\\text\{([^{}]+)\}/g, '$1')
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    .replace(/\\int_\{([^{}]+)\}\^\{([^{}]+)\}/g, '∫[$1 → $2]')
    .replace(/\\lim_\{([^{}]+)\}/g, 'lim($1)')
    .replace(/\\to/g, '→')
    .replace(/\\infty/g, '∞')
    .replace(/\\pi/g, 'π')
    .replace(/\\alpha/g, 'α')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\\mathbb\{R\}/g, 'ℝ')
    .replace(/\\cap/g, '∩')
    .replace(/\\cup/g, '∪')
    .replace(/\\in/g, '∈')
    .replace(/\\neq/g, '≠')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\pm/g, '±')
    .replace(/\\cdot/g, '·')
    .replace(/\\approx/g, '≈')
    .replace(/\\Rightarrow/g, '⇒')
    .replace(/\\Leftrightarrow/g, '⇔')
    .replace(/\\circ/g, '°')
    .replace(/\\,/g, ' ')
    .replace(/\\%/g, '%')
    .replace(/\\sin/g, 'sin')
    .replace(/\\cos/g, 'cos')
    .replace(/\\tan/g, 'tan')
    .replace(/\\log_\{([^{}]+)\}/g, 'log_$1')
    .replace(/\\max_\{([^{}]+)\}/g, 'max_($1)')
    .replace(/\\sum/g, 'Σ')
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\{([^{}]+)\}/g, '$1')
    .replace(/\\/g, '');
  return s.replace(/\s+/g, ' ').trim();
}

// =====================================================================
// SHARED UNICODE -> LATEX MATH CONVERSION & DISPLAY FRACTION UPGRADER
// =====================================================================
const UNICODE_MATH_MAP: Array<[RegExp, string]> = [
  [/√\(([^)]+)\)/g, '\\sqrt{$1}'],
  [/√(\d+)/g, '\\sqrt{$1}'],
  [/√/g, '\\sqrt{}'],
  [/²/g, '^2'],
  [/³/g, '^3'],
  [/°/g, '^\\circ'],
  [/≈/g, '\\approx '],
  [/≤/g, '\\le '],
  [/≥/g, '\\ge '],
  [/≠/g, '\\neq '],
  [/±/g, '\\pm '],
  [/×/g, '\\times '],
  [/÷/g, '\\div '],
  [/·/g, '\\cdot '],
  [/∞/g, '\\infty '],
  [/∈/g, '\\in '],
  [/∉/g, '\\notin '],
  [/⊂/g, '\\subset '],
  [/∩/g, '\\cap '],
  [/∪/g, '\\cup '],
  [/∅/g, '\\emptyset '],
  [/ℝ/g, '\\mathbb{R}'],
  [/ℤ/g, '\\mathbb{Z}'],
  [/ℕ/g, '\\mathbb{N}'],
  [/ℚ/g, '\\mathbb{Q}'],
  [/Δ/g, '\\Delta '],
  [/Ω/g, '\\Omega '],
  [/π/g, '\\pi '],
  [/α/g, '\\alpha '],
  [/β/g, '\\beta '],
  [/γ/g, '\\gamma '],
  [/θ/g, '\\theta '],
  [/φ/g, '\\varphi '],
  [/ω/g, '\\omega '],
  [/→/g, '\\to '],
  [/⇒/g, '\\Rightarrow '],
  [/⇔/g, '\\Leftrightarrow '],
  [/∀/g, '\\forall '],
  [/∃/g, '\\exists '],
  [/⊥/g, '\\perp '],
  [/∥/g, '\\parallel '],
  [/∠/g, '\\angle '],
  [/∑/g, '\\sum '],
  [/∫/g, '\\int '],
];

function replaceUnicodeInMath(mathChunk: string): string {
  let out = mathChunk.replace(/−/g, '-');
  for (const [re, cmd] of UNICODE_MATH_MAP) {
    out = out.replace(re, cmd);
  }
  return upgradeTopLevelFractions(out);
}

function convertUnicodeMathOutsideInWord(textChunk: string): string {
  let out = textChunk.replace(/−/g, '-');
  for (const [re, cmd] of UNICODE_MATH_MAP) {
    // Keep middle dot · untouched in prose separators
    if (re.source === '·') continue;
    out = out.replace(re, (_m, g1) => {
      const rendered = g1 !== undefined ? cmd.replace('$1', g1) : cmd;
      return `$${rendered.trim()}$`;
    });
  }
  return out.replace(/\$\$/g, ' ');
}

/**
 * Ensures all mathematical formulas in Word (.docx) output remain in clean scientific LaTeX
 * wrapped inside $...$ pairs with full-size \dfrac top-level fractions
 * (compatible with MathType / Word TeX toggle workflows).
 */
export function formatWordLatexText(input: string): string {
  if (!input) return '';
  const normalized = input
    .replace(/\$\$([\s\S]*?)\$\$/g, '$$$1$$')
    .replace(/\\\[([\s\S]*?)\\\]/g, '$$$1$$')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');

  const parts = normalized.split(/(?<!\\)\$/);
  const rebuilt = parts.map((part, idx) =>
    idx % 2 === 1
      ? `$${replaceUnicodeInMath(part)}$`
      : convertUnicodeMathOutsideInWord(part)
  );
  return rebuilt.join('').replace(/\s+/g, ' ').trim();
}

export function formatWordLatexAnswer(input: string): string {
  if (!input) return '';
  const rawTrimmed = input
    .replace(/\$\$([\s\S]*?)\$\$/g, '$$$1$$')
    .replace(/\\\[([\s\S]*?)\\\]/g, '$$$1$$')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$')
    .replace(/\s+/g, ' ')
    .trim();
  if (!rawTrimmed) return '';
  // True/False answer keys like "a:Đ, b:S, c:Đ, d:Đ" are plain grading keys
  if (/^[a-d]:[ĐS](,\s*[a-d]:[ĐS])*$/i.test(rawTrimmed)) {
    return rawTrimmed;
  }
  if (rawTrimmed.includes('$')) {
    return formatWordLatexText(rawTrimmed);
  }
  const normalized = rawTrimmed
    .replace(/√\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/√(\d+)/g, '\\sqrt{$1}')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/°/g, '^\\circ')
    .replace(/≈/g, '\\approx ')
    .replace(/−/g, '-')
    .replace(/_CĐ/g, '_{\\text{CĐ}}')
    .replace(/_CT/g, '_{\\text{CT}}')
    .replace(/S_(\d+)/g, 'S_{$1}');

  const nghiemMatch = normalized.match(/^(-?\d+)\s+nghiệm$/i);
  if (nghiemMatch) {
    return `$${nghiemMatch[1]}$ nghiệm`;
  }
  const cmMatch = normalized.match(/^(.+?)\s+cm$/i);
  if (cmMatch) {
    return formatWordLatexText(`$${cmMatch[1]}\\text{ cm}$`);
  }
  return formatWordLatexText(`$${normalized.replace(/,\s+/g, ',\\; ')}$`);
}

// =====================================================================
// LATEX (.tex) SANITIZERS FOR PDFLATEX / MIKTEX / TEXLIVE
// =====================================================================
function escapeAndConvertTextChunk(textChunk: string): string {
  let out = textChunk
    .replace(/—/g, '---')
    .replace(/–/g, '--')
    .replace(/−/g, '-')
    .replace(/(^|[^\\])%/g, '$1\\%')
    .replace(/(^|[^\\])&/g, '$1\\&')
    .replace(/(^|[^\\])#/g, '$1\\#')
    .replace(/(^|[^\\])_/g, '$1\\_');

  for (const [re, cmd] of UNICODE_MATH_MAP) {
    out = out.replace(re, (_m, g1) => {
      const rendered = g1 !== undefined ? cmd.replace('$1', g1) : cmd;
      return `$${rendered.trim()}$`;
    });
  }
  // Merge adjacent $...$$...$ produced by consecutive Unicode symbols (e.g. "s² ≈")
  out = out.replace(/\$\$/g, ' ');
  return out;
}

export function escapePlainTex(input: string): string {
  if (!input) return '';
  return escapeAndConvertTextChunk(input).replace(/\s+/g, ' ').trim();
}

export function formatTexContent(input: string): string {
  if (!input) return '';
  const normalized = input
    .replace(/\$\$([\s\S]*?)\$\$/g, '$$$1$$')
    .replace(/\\\[([\s\S]*?)\\\]/g, '$$$1$$')
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');

  const parts = normalized.split(/(?<!\\)\$/);
  const rebuilt = parts.map((part, idx) =>
    idx % 2 === 1 ? `$${replaceUnicodeInMath(part)}$` : escapeAndConvertTextChunk(part)
  );
  return rebuilt.join('').replace(/\s+/g, ' ').trim();
}

export function formatTexAnswer(input: string): string {
  if (!input) return '';
  const wrapped = formatWordLatexAnswer(input);
  return formatTexContent(wrapped);
}

// =====================================================================
// 1. EXPORT LATEX (.tex) — SUPPORTS 'amsmath' & 'ex_test' (VIỆT NAM)
// =====================================================================
export type TexExportFormat = 'amsmath' | 'ex_test';

function buildExamHeaderTex(exam: ExamPaper): string[] {
  return [
    '\\begin{center}',
    `  \\textbf{\\large ${escapePlainTex(exam.schoolName)}} \\\\`,
    `  \\textbf{\\LARGE ${escapePlainTex(exam.title)}} \\\\`,
    `  \\textit{Môn: ${escapePlainTex(exam.subject)} --- ${escapePlainTex(exam.gradeLabel)} --- Thời gian: ${exam.durationMinutes} phút} \\\\`,
    `  \\textbf{Mã đề: ${escapePlainTex(exam.code)}}`,
    '\\end{center}',
    '\\hrule\\vspace{0.4cm}',
    '',
  ];
}

function evalPlotCurveForTex(diagram: FunctionPlotDiagram, x: number): number | null {
  const c = diagram.coeffs;
  if (diagram.curveType === 'cubic') {
    const [a = 0, b = 0, cc = 0, d = 0] = c;
    return a * x * x * x + b * x * x + cc * x + d;
  }
  const [a = 0, b = 0, cc = 0, d = 1, e = 0] = c;
  const denom = d * x + e;
  if (Math.abs(denom) < 1e-6) return null;
  return (a * x * x + b * x + cc) / denom;
}

function buildTikzPlotFormula(diagram: FunctionPlotDiagram): string {
  const c = diagram.coeffs;
  if (diagram.curveType === 'cubic') {
    const [a = 0, b = 0, cc = 0, d = 0] = c;
    return `(${a})*(\\x)^3+(${b})*(\\x)^2+(${cc})*(\\x)+(${d})`;
  }
  const [a = 0, b = 0, cc = 0, d = 1, e = 0] = c;
  return `((${a})*(\\x)^2+(${b})*(\\x)+(${cc}))/((${d})*(\\x)+(${e}))`;
}

function findSafePlotDomains(
  diagram: FunctionPlotDiagram,
  startX: number,
  endX: number
): Array<[number, number]> {
  const segments: Array<[number, number]> = [];
  const steps = 160;
  let segStart: number | null = null;
  let prevX = startX;
  for (let i = 0; i <= steps; i++) {
    const x = startX + ((endX - startX) * i) / steps;
    const y = evalPlotCurveForTex(diagram, x);
    const ok = y !== null && Number.isFinite(y) && y >= diagram.yMin - 0.8 && y <= diagram.yMax + 0.8;
    if (ok && segStart === null) {
      segStart = x;
    } else if (!ok && segStart !== null) {
      if (prevX - segStart > 0.05) segments.push([Number(segStart.toFixed(2)), Number(prevX.toFixed(2))]);
      segStart = null;
    }
    prevX = x;
  }
  if (segStart !== null && endX - segStart > 0.05) {
    segments.push([Number(segStart.toFixed(2)), Number(endX.toFixed(2))]);
  }
  return segments;
}

function diagramToTexLines(diagram?: QuestionDiagramSpec): string[] {
  if (!diagram) return [];

  if (diagram.kind === 'variation_table') {
    const n = diagram.xNodes.length;
    const totalCols = n * 2 - 1;
    const colSpec = `c|${'c'.repeat(totalCols)}`;

    const xCells: string[] = [];
    const derivCells: string[] = [];
    for (let i = 0; i < n; i++) {
      xCells.push(diagram.xNodes[i]);
      if (i === 0 || i === n - 1) {
        derivCells.push('');
      } else {
        const nodeTok = diagram.derivTokens[i * 2 - 1];
        derivCells.push(nodeTok?.type === 'node' && nodeTok.kind === 'd' ? '\\parallel' : '0');
      }
      if (i < n - 1) {
        xCells.push('');
        const signTok = diagram.derivTokens[i * 2];
        derivCells.push(
          signTok?.type === 'sign'
            ? signTok.value === 'hatched'
              ? '///'
              : signTok.value
            : ''
        );
      }
    }

    const rows: string[] = [
      `x & ${xCells.join(' & ')} \\\\ \\hline`,
      `${diagram.derivLabel} & ${derivCells.join(' & ')} \\\\`,
    ];

    if (diagram.yNodes && diagram.funcLabel && diagram.yNodes.length === n) {
      const yCells: string[] = [];
      for (let i = 0; i < n; i++) {
        const yn = diagram.yNodes[i];
        if (yn.kind === 'asymptote') {
          yCells.push(`${yn.leftVal} \\;\\parallel\\; ${yn.rightVal}`);
        } else {
          yCells.push(yn.value);
        }
        if (i < n - 1) {
          const signTok = diagram.derivTokens[i * 2];
          if (signTok?.type === 'sign' && signTok.value === 'hatched') {
            yCells.push('///');
          } else {
            yCells.push(signTok?.type === 'sign' && signTok.value === '+' ? '\\nearrow' : '\\searrow');
          }
        }
      }
      rows.push(`\\hline ${diagram.funcLabel} & ${yCells.join(' & ')} \\\\`);
    }

    return [
      '$$',
      `\\begin{array}{${colSpec}}`,
      ...rows.map((r) => `  ${r}`),
      '\\end{array}',
      '$$',
    ];
  }

  if (diagram.kind === 'frequency_table') {
    const colSpec = `|c|${diagram.intervals.map(() => 'c|').join('')}`;
    const row1 = `  ${formatTexContent(diagram.row1Label)} & ${diagram.intervals.map((iv) => formatTexContent(iv)).join(' & ')} \\\\ \\hline`;
    const row2 = `  ${formatTexContent(diagram.row2Label)} & ${diagram.frequencies.map((f) => formatTexContent(String(f))).join(' & ')} \\\\ \\hline`;
    const extra = (diagram.extraRows || []).map(
      (r) => `  ${formatTexContent(r.label)} & ${r.values.map((v) => formatTexContent(String(v))).join(' & ')} \\\\ \\hline`
    );
    return [
      '\\begin{center}',
      `\\begin{tabular}{${colSpec}}`,
      '  \\hline',
      row1,
      row2,
      ...extra,
      '\\end{tabular}',
      '\\end{center}',
    ];
  }

  if (diagram.kind === 'prob_tree') {
    const e1 = diagram.event1;
    const e2 = diagram.event2;
    const lbl = (val: string | undefined, pos: 'above' | 'below') =>
      val ? ` node[pos=0.5,sloped,${pos}]{$${val}$}` : '';
    return [
      '\\begin{center}',
      '\\begin{tikzpicture}[>=stealth,scale=0.85]',
      `  \\draw[->] (0,0)--(2.2,1.6)${lbl(diagram.p1, 'above')};`,
      `  \\draw[->] (0,0)--(2.2,-1.6)${lbl(diagram.p1Comp, 'below')};`,
      `  \\draw (2.2,1.15) rectangle (3.3,2.05) node[pos=0.5]{$${e1}$};`,
      `  \\draw (2.2,-2.05) rectangle (3.3,-1.15) node[pos=0.5]{$\\overline{${e1}}$};`,
      `  \\draw[->] (3.3,1.6)--(5.2,2.45)${lbl(diagram.p2Given1, 'above')};`,
      `  \\draw[->] (3.3,1.6)--(5.2,0.75)${lbl(diagram.p2CompGiven1, 'below')};`,
      `  \\draw[->] (3.3,-1.6)--(5.2,-0.75)${lbl(diagram.p2Given1Comp, 'above')};`,
      `  \\draw[->] (3.3,-1.6)--(5.2,-2.45)${lbl(diagram.p2CompGiven1Comp, 'below')};`,
      `  \\draw (5.2,2.0) rectangle (6.2,2.9) node[pos=0.5]{$${e2}$};`,
      `  \\draw (5.2,0.3) rectangle (6.2,1.2) node[pos=0.5]{$\\overline{${e2}}$};`,
      `  \\draw (5.2,-1.2) rectangle (6.2,-0.3) node[pos=0.5]{$${e2}$};`,
      `  \\draw (5.2,-2.9) rectangle (6.2,-2.0) node[pos=0.5]{$\\overline{${e2}}$};`,
      '\\end{tikzpicture}',
      '\\end{center}',
    ];
  }

  if (diagram.kind === 'geometry_figure') {
    const { figureType, params } = diagram;
    if (figureType === 'semicircle_rect') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=1]',
        '  \\def\\R{2}',
        '  \\coordinate (O) at (0,0);',
        '  \\coordinate (AA) at (-1.2856,0);',
        '  \\coordinate (BB) at (1.2856,0);',
        '  \\coordinate (C) at (1.2856,1.5321);',
        '  \\coordinate (D) at (-1.2856,1.5321);',
        '  \\draw (-\\R,0) arc(180:0:\\R)--cycle;',
        '  \\draw[fill=cyan!20] (BB)--(C)--(D)--(AA)--cycle;',
        '  \\fill (O) circle (1.4pt) node[below] {\\footnotesize $O$};',
        '  \\fill (AA) circle (1.4pt) node[below] {\\footnotesize $A$};',
        '  \\fill (BB) circle (1.4pt) node[below] {\\footnotesize $B$};',
        '  \\node[above right] at (C) {\\footnotesize $C$};',
        '  \\node[above left] at (D) {\\footnotesize $D$};',
        `  \\node at (0.85,1.85) {\\footnotesize $R = ${params.R}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'box_cut') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.85]',
        '  \\draw (0,0) rectangle (5,3);',
        '  \\draw (0,0) rectangle (1,1) (0,2) rectangle (1,3) (4,2) rectangle (5,3) (4,0) rectangle (5,1);',
        '  \\draw[dashed] (1,1) rectangle (4,2);',
        '  \\draw (0,0.5) node[left] {\\footnotesize $x$} (0.5,0) node[below] {\\footnotesize $x$};',
        '  \\draw (0,2.5) node[left] {\\footnotesize $x$} (0.5,3) node[above] {\\footnotesize $x$};',
        '  \\draw (4.5,0) node[below] {\\footnotesize $x$} (5,0.5) node[right] {\\footnotesize $x$};',
        '  \\draw (5,2.5) node[right] {\\footnotesize $x$} (4.5,3) node[above] {\\footnotesize $x$};',
        `  \\draw[<->] (-0.8,0)--(-0.8,3) node[midway,left] {\\footnotesize $${params.W}$ cm};`,
        `  \\draw[<->] (0,-0.7)--(5,-0.7) node[midway,below] {\\footnotesize $${params.L}$ cm};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'square_box_cut') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.72]',
        '  \\fill[gray!25] (0,0) rectangle (1,1) (0,4) rectangle (1,5) (4,0) rectangle (5,1) (4,4) rectangle (5,5);',
        '  \\draw[dashed] (1,1) rectangle (4,4);',
        '  \\draw (0,0) rectangle (5,5);',
        '  \\draw (0,0.5) node[left] {\\footnotesize $x$} (0.5,0) node[below] {\\footnotesize $x$};',
        `  \\draw[<->] (0,-0.7)--(5,-0.7) node[midway,below] {\\footnotesize $${params.a}$ cm};`,
        '  \\node at (6.2,2.5) {$\\rightarrow$};',
        '  \\draw (7.4,1.6)--(10.4,1.6)--(11.4,2.4)--(8.4,2.4)--cycle;',
        '  \\draw (7.4,1.6)--(7.4,2.8)--(10.4,2.8)--(10.4,1.6);',
        '  \\draw (10.4,2.8)--(11.4,3.6)--(11.4,2.4);',
        '  \\draw[dashed] (8.4,2.4)--(8.4,3.6)--(11.4,3.6);',
        '  \\draw (7.4,2.8)--(8.4,3.6);',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'hexagon_pyramid_cut') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=0.65]',
        '  \\foreach \\i/\\n in {0/D, 60/E, 120/F, 180/A, 240/B, 300/C} \\path (\\i:4) coordinate (\\n);',
        '  \\path (0,0) coordinate (O);',
        '  \\foreach \\i/\\m in {30/1, 90/2, 150/3, 210/4, 270/5, 330/6} \\path (\\i:1.6) coordinate (A\\m);',
        '  \\path (-1.3856,0) coordinate (M);',
        '  \\draw[dashed] (A)--(D) (B)--(E) (C)--(F);',
        '  \\draw[dashed] (A1)--(A2)--(A3)--(A4)--(A5)--(A6)--cycle;',
        '  \\draw (A)--(B)--(C)--(D)--(E)--(F)--cycle;',
        '  \\foreach \\i/\\j in {A/A3, A/A4, B/A4, B/A5, C/A5, C/A6, D/A6, D/A1, E/A1, E/A2, F/A2, F/A3} \\draw (\\i)--(\\j);',
        '  \\foreach \\p/\\g in {A/180,B/-135,C/-45,D/0,E/45,F/135,M/135,O/30} \\fill (\\p) circle (1.2pt) +(\\g:0.4) node {\\footnotesize $\\p$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'lantern_frame') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.65]',
        '  \\coordinate (A) at (0,0); \\coordinate (B) at (0,-2); \\coordinate (C) at (2.2,-2); \\coordinate (D) at (2.2,0);',
        '  \\coordinate (S1) at (-1.4,-3.6); \\coordinate (S2) at (3.6,-3.6);',
        '  \\draw (A)--(B)--(C)--(D)--(A) node[above,midway] {\\footnotesize $x$};',
        '  \\draw[dashed] (A)--(C) (B)--(D);',
        '  \\draw (A)--(S1) node[below left] {\\footnotesize $S$} --(C) (D)--(S2) node[below right] {\\footnotesize $S$} --(B);',
        '  \\node[above left] at (A) {\\footnotesize $A$}; \\node[below left] at (B) {\\footnotesize $B$};',
        '  \\node[below right] at (C) {\\footnotesize $C$}; \\node[above right] at (D) {\\footnotesize $D$};',
        '  \\node at (4.8,-1.5) {$\\rightarrow$};',
        '  \\coordinate (B2) at (6,-2.4); \\coordinate (A2) at (7.3,-1.2); \\coordinate (C2) at (9.4,-2.4); \\coordinate (D2) at (10.7,-1.2);',
        '  \\coordinate (S3) at (8.35,1.6); \\coordinate (O2) at (8.35,-1.8);',
        '  \\draw (S3)--(B2)--(C2)--(D2)--cycle (S3)--(C2);',
        '  \\draw[dashed] (S3)--(A2)--(B2)--(D2)--(A2)--(C2) (S3)--(O2);',
        '  \\node[above] at (S3) {\\footnotesize $S$}; \\node[left] at (A2) {\\footnotesize $A$};',
        '  \\node[below left] at (B2) {\\footnotesize $B$}; \\node[below right] at (C2) {\\footnotesize $C$};',
        '  \\node[right] at (D2) {\\footnotesize $D$}; \\node[below] at (O2) {\\footnotesize $O$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'shore_island_path' || figureType === 'power_island_path') {
      const isPower = figureType === 'power_island_path';
      const midLbl = isPower ? 'M' : 'D';
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=0.75]',
        '  \\coordinate (A) at (0,0); \\coordinate (D) at (4,0); \\coordinate (B) at (6,0); \\coordinate (C) at (6,2.8);',
        '  \\draw (A)--(B)--(C)--cycle (D)--(C);',
        '  \\draw (5.7,0)--(5.7,0.3)--(6,0.3);',
        '  \\node[below] at (A) {\\footnotesize $A$};',
        `  \\node[below] at (D) {\\footnotesize $${midLbl}$};`,
        '  \\node[below] at (B) {\\footnotesize $B$};',
        '  \\node[above] at (C) {\\footnotesize $C$};',
        `  \\draw[<->] (0,-0.8)--(6,-0.8) node[midway,below] {\\footnotesize $${params.L}$ km};`,
        isPower
          ? '  \\draw[<->] (4,-0.3)--(6,-0.3) node[midway,below] {\\footnotesize $x$};'
          : '  \\draw[<->] (0,-0.3)--(4,-0.3) node[midway,below] {\\footnotesize $x$};',
        `  \\draw[<->] (6.5,0)--(6.5,2.8) node[midway,right] {\\footnotesize $${params.h}$ km};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'rect_pool_path') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.68]',
        '  \\draw (0,0) rectangle (8,4);',
        '  \\draw[very thick] (0,4)--(5.2,4);',
        '  \\draw[thick] (5.2,4)--(8,0);',
        '  \\node[above left] at (0,4) {\\footnotesize $A$};',
        '  \\node[below left] at (0,0) {\\footnotesize $D$};',
        '  \\node[below right] at (8,0) {\\footnotesize $C$};',
        '  \\node[above right] at (8,4) {\\footnotesize $B$};',
        '  \\node[above] at (5.2,4) {\\footnotesize $X$};',
        `  \\node at (4,-0.5) {\\footnotesize $${params.L}$ m};`,
        `  \\node[left] at (0,2) {\\footnotesize $${params.W}$ m};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'two_poles_wire') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.72]',
        '  \\draw[thick] (-0.5,0)--(7.5,0);',
        '  \\draw[very thick] (0,0)--(0,1.4) (7,0)--(7,3.4);',
        '  \\draw (2.2,0)--(0,1.4) (2.2,0)--(7,3.4);',
        '  \\fill (2.2,0) circle (1.5pt) node[below] {\\footnotesize chốt};',
        `  \\node[left] at (0,0.7) {\\footnotesize $${params.h1}$ m};`,
        `  \\node[right] at (7,1.7) {\\footnotesize $${params.h2}$ m};`,
        '  \\draw[<->] (0,-0.4)--(2.2,-0.4) node[midway,below] {\\footnotesize $x$ m};',
        `  \\draw[<->] (0,-1.0)--(7,-1.0) node[midway,below] {\\footnotesize $${params.L}$ m};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'trapezoid_square') {
      const a = params.a ?? 10;
      const p = params.p ?? 3;
      const q = params.q ?? 4;
      const np = Number(((p / a) * 5).toFixed(2));
      const nq = Number((5 - (q / a) * 5).toFixed(2));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.75]',
        '  \\coordinate (D) at (0,0); \\coordinate (C) at (5,0); \\coordinate (B) at (5,5); \\coordinate (A) at (0,5);',
        `  \\coordinate (N) at (${np},5); \\coordinate (P) at (5,${nq}); \\coordinate (M) at (0,2.75); \\coordinate (Q) at (3,0);`,
        '  \\draw (A)--(B)--(C)--(D)--cycle;',
        '  \\draw[fill=cyan!15] (M)--(N)--(P)--(Q)--cycle;',
        `  \\path (A)--(N) node[midway,above] {\\footnotesize ${p} cm};`,
        `  \\path (B)--(P) node[midway,right] {\\footnotesize ${q} cm};`,
        '  \\node[above left] at (A) {\\footnotesize $A$}; \\node[above right] at (B) {\\footnotesize $B$};',
        '  \\node[below right] at (C) {\\footnotesize $C$}; \\node[below left] at (D) {\\footnotesize $D$};',
        '  \\node[above] at (N) {\\footnotesize $N$}; \\node[right] at (P) {\\footnotesize $P$};',
        '  \\node[left] at (M) {\\footnotesize $M$}; \\node[below] at (Q) {\\footnotesize $Q$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'semicircle_boat_path') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=1]',
        '  \\draw[thick] (-2,0) arc (180:0:2)--cycle;',
        '  \\coordinate (P) at (-2,0); \\coordinate (R) at (2,0); \\coordinate (O) at (0,0); \\coordinate (Q) at (1,1.732);',
        '  \\draw[thick] (P)--(Q);',
        '  \\fill (P) circle (1.2pt) node[below] {\\footnotesize $P$};',
        '  \\fill (R) circle (1.2pt) node[below] {\\footnotesize $R$};',
        '  \\fill (O) circle (1.2pt) node[below] {\\footnotesize $O$};',
        '  \\fill (Q) circle (1.2pt) node[above right] {\\footnotesize $Q$};',
        `  \\node at (-1,-0.4) {\\footnotesize $R=${params.R}$ km};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'ladder_wall_prop') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=0.8]',
        '  \\coordinate (B) at (0,0); \\coordinate (A) at (0,4); \\coordinate (C) at (5,0);',
        '  \\coordinate (H) at (1,0); \\coordinate (M) at (1,3.2); \\coordinate (K) at (0,3.2);',
        '  \\draw[thick] (A)--(B)--(C)--cycle (M)--(H);',
        '  \\draw[dashed] (K)--(M);',
        '  \\draw (0.2,0)--(0.2,0.2)--(0,0.2) (1.2,0)--(1.2,0.2)--(1,0.2);',
        '  \\node[above] at (A) {\\footnotesize $A$}; \\node[below] at (B) {\\footnotesize $B$};',
        '  \\node[below right] at (C) {\\footnotesize $C$}; \\node[below] at (H) {\\footnotesize $H$};',
        '  \\node[above right] at (M) {\\footnotesize $M$}; \\node[left] at (K) {\\footnotesize $K$};',
        `  \\node[right] at (1,1.6) {\\footnotesize ${String(params.h).replace('.', ',')} m};`,
        `  \\node[below] at (0.5,-0.25) {\\footnotesize ${String(params.d).replace('.', ',')} m};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'parabola_pond_bridge') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.72]',
        '  \\draw (0,0)--(6,0)--(6,6)--(0,6)--cycle;',
        '  \\draw[thick,samples=80,smooth,domain=0:2] plot(\\x,{4-(\\x)^2});',
        '  \\draw (4,3) circle (1); \\fill (4,3) circle (1.4pt);',
        '  \\draw[dashed] (0,3)--(4,3) (4,0)--(4,3);',
        '  \\node[below left] at (0,0) {\\footnotesize $O$}; \\node[left] at (0,4) {\\footnotesize $A$};',
        '  \\node[below] at (2,0) {\\footnotesize $B$}; \\node[below] at (6,0) {\\footnotesize $C$};',
        '  \\node[above right] at (6,6) {\\footnotesize $D$}; \\node[left] at (0,6) {\\footnotesize $E$};',
        '  \\node[above right] at (4,3) {\\footnotesize $I$};',
        `  \\node[below] at (1,0) {\\footnotesize $${params.b0}$ m};`,
        `  \\node[above] at (2,3) {\\footnotesize $${params.xI}$ m};`,
        `  \\node[right] at (4,1.5) {\\footnotesize $${params.yI}$ m};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'box_3d') {
      const variant = params.variant ?? 0;
      const isCube = variant === 2;
      const widthX = isCube ? 2.2 : 3.0;
      const tLabels =
        variant === 3
          ? ['E', 'F', 'G', 'H']
          : variant === 1
          ? ["A'", "B'", "C'", "D'"]
          : ['A_1', 'B_1', 'C_1', 'D_1'];
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.82]',
        `  \\coordinate (A) at (0,0); \\coordinate (B) at (-1,-1); \\coordinate (C) at (${widthX - 1},-1); \\coordinate (D) at (${widthX},0);`,
        `  \\coordinate (T1) at (0,2); \\coordinate (T2) at (-1,1); \\coordinate (T3) at (${widthX - 1},1); \\coordinate (T4) at (${widthX},2);`,
        '  \\draw[dashed] (B)--(A)--(D) (T1)--(A);',
        '  \\draw (T1)--(T2)--(T3)--(T4)--(T1) (T2)--(B) (T3)--(C) (T4)--(D) (B)--(C)--(D);',
        '  \\node[left] at (A) {\\footnotesize $A$}; \\node[left] at (B) {\\footnotesize $B$};',
        '  \\node[right] at (C) {\\footnotesize $C$}; \\node[right] at (D) {\\footnotesize $D$};',
        `  \\node[left] at (T1) {\\footnotesize $${tLabels[0]}$}; \\node[left] at (T2) {\\footnotesize $${tLabels[1]}$};`,
        `  \\node[right] at (T3) {\\footnotesize $${tLabels[2]}$}; \\node[right] at (T4) {\\footnotesize $${tLabels[3]}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'reg_tetra_3d') {
      const apexLbl = (params.apexVariant ?? 0) === 0 ? 'S' : 'A';
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.72]',
        '  \\coordinate (B) at (0,0); \\coordinate (C) at (1.2,-1.8); \\coordinate (D) at (4,0); \\coordinate (P) at (1.3,2.9);',
        '  \\draw[dashed] (B)--(D);',
        '  \\draw (B)--(C)--(D) (P)--(B) (P)--(C) (P)--(D);',
        `  \\node[above] at (P) {\\footnotesize $${apexLbl}$};`,
        '  \\node[left] at (B) {\\footnotesize $B$}; \\node[below] at (C) {\\footnotesize $C$}; \\node[right] at (D) {\\footnotesize $D$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'pyramid_perp_base_3d') {
      if ((params.variant ?? 0) === 1) {
        return [
          '\\begin{center}',
          '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.82]',
          '  \\coordinate (S) at (0,0); \\coordinate (B) at (4,0); \\coordinate (A) at (1,-1.5); \\coordinate (C) at (0,2.8);',
          '  \\coordinate (M) at (0.5,0.65); \\coordinate (H) at (2.25,0.325);',
          '  \\draw (S)--(A)--(B)--(C)--cycle (C)--(A) (B)--(M);',
          '  \\draw[dashed] (S)--(B) (S)--(M) (S)--(H);',
          '  \\draw (0,0.28)--(0.28,0.28)--(0.28,0);',
          '  \\node[left] at (S) {\\footnotesize $S$}; \\node[below] at (A) {\\footnotesize $A$};',
          '  \\node[right] at (B) {\\footnotesize $B$}; \\node[above] at (C) {\\footnotesize $C$};',
          '  \\node[left] at (M) {\\footnotesize $M$}; \\node[above right] at (H) {\\footnotesize $H$};',
          '\\end{tikzpicture}',
          '\\end{center}',
        ];
      }
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.75]',
        '  \\coordinate (A) at (0,0); \\coordinate (B) at (1.2,-1.8); \\coordinate (C) at (4.2,0); \\coordinate (S) at (0,3.4);',
        '  \\draw[dashed] (A)--(C);',
        '  \\draw (A)--(B)--(C) (S)--(A) (S)--(B) (S)--(C);',
        '  \\draw (0,0.3)--(0.3,0.3)--(0.3,0);',
        '  \\node[above] at (S) {\\footnotesize $S$}; \\node[left] at (A) {\\footnotesize $A$};',
        '  \\node[below] at (B) {\\footnotesize $B$}; \\node[right] at (C) {\\footnotesize $C$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'lamp_3cables_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.8]',
        '  \\coordinate (O) at (0,0); \\coordinate (A) at (-2.4,2.1); \\coordinate (B) at (0.7,2.5); \\coordinate (C) at (2.4,2.0); \\coordinate (L) at (0,-1.0);',
        '  \\draw[dashed] (A)--(C);',
        '  \\draw (O)--(A)--(B)--(C)--(O) (O)--(B) (O)--(L);',
        '  \\draw[fill=yellow!25] (0,-1.45) circle (0.45);',
        '  \\draw (0,-1.45) circle (0.25);',
        '  \\node[left] at (A) {\\footnotesize $A$}; \\node[above] at (B) {\\footnotesize $B$};',
        '  \\node[right] at (C) {\\footnotesize $C$}; \\node[below left] at (O) {\\footnotesize $O$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'crane_car_frame_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=0.72]',
        '  \\coordinate (E) at (0,4.8);',
        '  \\coordinate (A) at (-2.6,1.6); \\coordinate (B) at (-0.6,0.7); \\coordinate (C) at (2.6,2.0); \\coordinate (D) at (0.6,2.9);',
        '  \\fill[gray!20] (-3.0,-1.6)--(2.2,-1.6)--(3.5,-0.9)--(-1.7,-0.9)--cycle;',
        '  \\draw (-3.0,-1.6)--(2.2,-1.6)--(3.5,-0.9)--(-1.7,-0.9)--cycle;',
        '  \\draw[fill=cyan!25] (-1.8,-1.2)--(-1.3,-0.6)--(0.8,-0.55)--(1.6,-1.05)--(1.8,-1.25)--cycle;',
        '  \\fill[black] (-1.2,-1.35) circle (0.22) (1.1,-1.25) circle (0.22);',
        '  \\draw[blue!80!black,thick] (A)--(B)--(C)--(D)--cycle;',
        '  \\draw[blue!80!black] (A)--(-2.6,-1.4) (B)--(-0.6,-1.6) (C)--(2.6,-1.1) (D)--(0.6,-0.9);',
        '  \\draw (E)--(A) (E)--(B) (E)--(C) (E)--(D);',
        '  \\draw[->,blue!80!black,thick] (-1.17,3.36)--(-1.69,2.72);',
        '  \\draw[->,blue!80!black,thick] (-0.27,2.95)--(-0.39,2.13);',
        '  \\draw[->,blue!80!black,thick] (1.17,3.54)--(1.69,2.98);',
        '  \\draw[->,blue!80!black,thick] (0.27,3.94)--(0.39,3.56);',
        '  \\fill (E) circle (2pt);',
        '  \\node[left] at (E) {\\footnotesize $E$}; \\node[left] at (A) {\\footnotesize $A$};',
        '  \\node[below left] at (B) {\\footnotesize $B$}; \\node[right] at (C) {\\footnotesize $C$}; \\node[above left] at (D) {\\footnotesize $D$};',
        '  \\node[above left] at (-1.5,3.1) {\\footnotesize $\\vec{F}_1$};',
        '  \\node[left] at (-0.4,2.4) {\\footnotesize $\\vec{F}_2$};',
        '  \\node[above right] at (1.4,3.2) {\\footnotesize $\\vec{F}_3$};',
        '  \\node[right] at (0.35,3.7) {\\footnotesize $\\vec{F}_4$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'chandelier_4chains_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.76]',
        '  \\coordinate (S) at (0,3.8);',
        '  \\coordinate (A) at (-2.6,0); \\coordinate (B) at (0.8,0.4); \\coordinate (C) at (2.6,0); \\coordinate (D) at (-0.8,-0.4);',
        '  \\draw[fill=orange!25,thick] (0,0) ellipse (2.6 and 0.45);',
        '  \\draw[thick,dashed] (S)--(A) (S)--(B) (S)--(C) (S)--(D);',
        '  \\fill[brown!70!black] (-0.4,3.75) rectangle (0.4,4.0);',
        '  \\node[above left] at (S) {\\footnotesize $S$};',
        '  \\node[left] at (A) {\\footnotesize $A$}; \\node[above right] at (B) {\\footnotesize $B$};',
        '  \\node[right] at (C) {\\footnotesize $C$}; \\node[below] at (D) {\\footnotesize $D$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'three_perp_forces_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=1.15]',
        '  \\coordinate (O) at (0,0); \\coordinate (a) at (0,1.4); \\coordinate (b) at (1.6,0); \\coordinate (c) at (-1.1,-1.0);',
        '  \\draw[->] (O)--(a) node[midway,left] {\\footnotesize $\\vec{F}_1$};',
        '  \\draw[->] (O)--(b) node[midway,above] {\\footnotesize $\\vec{F}_2$};',
        '  \\draw[->] (O)--(c) node[midway,above left] {\\footnotesize $\\vec{F}_3$};',
        '  \\draw (0,0.22)--(0.22,0.22)--(0.22,0);',
        '  \\draw (-0.18,-0.16)--(-0.18,0.06)--(0,0.22);',
        '  \\draw (0.22,0)--(0.04,-0.16)--(-0.18,-0.16);',
        '  \\node[above left] at (O) {\\footnotesize $O$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'cuboid_axes_vertex_3d') {
      const variant = params.variant ?? 0;
      const tLabels = variant === 1 ? ['A_1', 'B_1', 'C_1', 'D_1'] : ["A'", "B'", "C'", "D'"];
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=0.82]',
        '  \\coordinate (A) at (0,0); \\coordinate (B) at (-1.1,-0.9); \\coordinate (C) at (2.3,-0.9); \\coordinate (D) at (3.4,0);',
        '  \\coordinate (T1) at (0,2.2); \\coordinate (T2) at (-1.1,1.3); \\coordinate (T3) at (2.3,1.3); \\coordinate (T4) at (3.4,2.2);',
        '  \\draw[dashed] (B)--(A)--(D) (T1)--(A);',
        '  \\draw (T1)--(T2)--(T3)--(T4)--(T1) (T2)--(B) (T3)--(C) (T4)--(D) (B)--(C)--(D);',
        '  \\draw[->] (B)--(-2.1,-1.7) node[below right] {\\footnotesize $x$};',
        '  \\draw[->] (D)--(4.6,0) node[above] {\\footnotesize $y$};',
        '  \\draw[->] (T1)--(0,3.2) node[right] {\\footnotesize $z$};',
        '  \\draw (0,0.28)--(0.28,0.28)--(0.28,0);',
        '  \\draw (0.32,0)--(0.08,-0.22)--(-0.24,-0.22);',
        '  \\node[above left] at (A) {\\footnotesize $O\\equiv A$};',
        '  \\node[above left] at (B) {\\footnotesize $B$};',
        '  \\node[below right] at (C) {\\footnotesize $C$};',
        '  \\node[above] at (D) {\\footnotesize $D$};',
        `  \\node[left] at (T1) {\\footnotesize $${tLabels[0]}$}; \\node[left] at (T2) {\\footnotesize $${tLabels[1]}$};`,
        `  \\node[right] at (T3) {\\footnotesize $${tLabels[2]}$}; \\node[above right] at (T4) {\\footnotesize $${tLabels[3]}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'cube_axes_center_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=0.82]',
        '  \\coordinate (P) at (0,0); \\coordinate (Q) at (0,2.4);',
        '  \\coordinate (A) at (-1.9,0.55); \\coordinate (B) at (-1.5,-0.6); \\coordinate (C) at (1.9,-0.55); \\coordinate (D) at (1.5,0.6);',
        '  \\coordinate (A1) at (-1.9,2.95); \\coordinate (B1) at (-1.5,1.8); \\coordinate (C1) at (1.9,1.85); \\coordinate (D1) at (1.5,3.0);',
        '  \\draw[dashed] (B)--(A)--(D) (A1)--(A) (A)--(C) (B)--(D) (A1)--(C1) (B1)--(D1) (P)--(Q);',
        '  \\draw (A1)--(B1)--(C1)--(D1)--(A1) (B1)--(B) (C1)--(C) (D1)--(D) (B)--(C)--(D);',
        '  \\draw[->] (B)--(-2.45,-0.98) node[below] {\\footnotesize $x$};',
        '  \\draw[->] (C)--(2.85,-0.82) node[below] {\\footnotesize $y$};',
        '  \\draw[->] (Q)--(0,3.55) node[right] {\\footnotesize $z$};',
        '  \\node[left] at (A) {\\footnotesize $A$}; \\node[below left] at (B) {\\footnotesize $B$};',
        '  \\node[below right] at (C) {\\footnotesize $C$}; \\node[right] at (D) {\\footnotesize $D$};',
        "  \\node[left] at (A1) {\\footnotesize $A'$}; \\node[left] at (B1) {\\footnotesize $B'$};",
        "  \\node[right] at (C1) {\\footnotesize $C'$}; \\node[right] at (D1) {\\footnotesize $D'$};",
        "  \\node[below] at (P) {\\footnotesize $O\\equiv P$}; \\node[above right] at (Q) {\\footnotesize $P'$};",
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'airport_plane_3d') {
      const alpha = params.alpha ?? 59;
      const beta = params.beta ?? 44;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,scale=0.82]',
        '  \\coordinate (O) at (0,0); \\coordinate (A) at (-1.4,-1.0); \\coordinate (B) at (3.2,0);',
        '  \\coordinate (H) at (1.8,-1.0); \\coordinate (C) at (0,2.4); \\coordinate (P) at (1.8,1.4);',
        '  \\draw[->] (O)--(-2.4,-1.7) node[above left] {\\footnotesize $x$};',
        '  \\draw[->] (O)--(4.4,0) node[above] {\\footnotesize $y$};',
        '  \\draw[->] (O)--(0,3.3) node[right] {\\footnotesize $z$};',
        '  \\draw[->,thick] (O)--(-0.63,-0.45) node[above left] {\\footnotesize $\\vec{i}$};',
        '  \\draw[->,thick] (O)--(1.0,0) node[above] {\\footnotesize $\\vec{j}$};',
        '  \\draw[->,thick] (O)--(0,0.95) node[left] {\\footnotesize $\\vec{k}$};',
        '  \\draw[dashed] (A)--(H)--(B) (P)--(H) (P)--(C);',
        '  \\draw (O)--(H); \\draw[->,thick] (O)--(P);',
        `  \\draw (-0.42,-0.3) arc (215:331:0.52); \\node[below] at (-0.05,-0.52) {\\scriptsize $${alpha}^\\circ$};`,
        `  \\draw (0.58,-0.32) arc (-29:38:0.65); \\node[right] at (0.68,0.16) {\\scriptsize $${beta}^\\circ$};`,
        '  \\node[above left] at (O) {\\footnotesize $O$}; \\node[left] at (A) {\\footnotesize $A$};',
        '  \\node[above] at (B) {\\footnotesize $B$}; \\node[left] at (C) {\\footnotesize $C$};',
        '  \\node[below right] at (H) {\\footnotesize $H$}; \\node[above right] at (P) {\\footnotesize $P$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'atc_radar_tower_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[>=stealth,line join=round,line cap=round,scale=0.82]',
        '  \\draw[fill=cyan!25] (-0.2,0) rectangle (0.2,3.4);',
        '  \\draw[fill=yellow!70] (-0.4,3.4) rectangle (0.4,3.9);',
        '  \\draw[fill=red!80] (-0.48,3.9)--(0,4.2)--(0.48,3.9)--cycle;',
        '  \\coordinate (O) at (0,0);',
        '  \\draw[->,thick,red] (O)--(3.0,0) node[above] {\\footnotesize $y$};',
        '  \\draw[->,thick,red] (O)--(0,4.8) node[right] {\\footnotesize $z$};',
        '  \\draw[->,thick,red] (O)--(-1.7,-1.0) node[left] {\\footnotesize $x$};',
        '  \\fill[red] (O) circle (2.2pt) node[below right] {\\footnotesize $O$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'grid_points_cone_3d') {
      const x0 = params.x0 ?? 1;
      const y0 = params.y0 ?? 2;
      const z0 = params.z0 ?? 3;
      const a = params.a ?? 2;
      const b = params.b ?? 3;
      const xMaxG = Math.max(3, x0 + a);
      const yMaxG = Math.max(5, y0 + b);
      const zMaxG = Math.max(6, z0 + b);
      const pX = (x: number, y: number) => Number((y - 0.5 * x).toFixed(2));
      const pY = (x: number, z: number) => Number((z - 0.866 * x).toFixed(2));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.68,line join=round,line cap=round,>=stealth]',
        `  \\foreach \\x in {1,...,${yMaxG}} { \\draw[thin,gray!45] (\\x,0)--(\\x,${zMaxG}); \\draw[thin,gray!45] (\\x,0)--(${Number((0 - 0.5 * xMaxG).toFixed(2))}+\\x,${Number((-0.866 * xMaxG).toFixed(2))}); }`,
        `  \\foreach \\y in {1,...,${xMaxG}} { \\draw[thin,gray!45] (-0.5*\\y,-0.866*\\y)--(${yMaxG}-0.5*\\y,-0.866*\\y); \\draw[thin,gray!45] (-0.5*\\y,-0.866*\\y)--(-0.5*\\y,${zMaxG}-0.866*\\y); }`,
        `  \\foreach \\z in {1,...,${zMaxG}} { \\draw[thin,gray!45] (0,\\z)--(${yMaxG},\\z); \\draw[thin,gray!45] (0,\\z)--(${pX(xMaxG, 0)},\\z${pY(xMaxG, 0)}); }`,
        `  \\draw[thick,->] (0,0)--(${yMaxG + 0.8},0) node[above] {\\footnotesize $y$};`,
        `  \\draw[thick,->] (0,0)--(${pX(xMaxG + 0.8, 0)},${pY(xMaxG + 0.8, 0)}) node[right] {\\footnotesize $x$};`,
        `  \\draw[thick,->] (0,0)--(0,${zMaxG + 0.8}) node[right] {\\footnotesize $z$};`,
        `  \\coordinate (S) at (${pX(x0, y0)},${pY(x0, z0)});`,
        `  \\coordinate (A) at (${pX(x0 + a, y0)},${pY(x0 + a, z0)});`,
        `  \\coordinate (B) at (${pX(x0, y0 + b)},${pY(x0, z0)});`,
        `  \\coordinate (C) at (${pX(x0, y0)},${pY(x0, z0 + b)});`,
        `  \\draw[dashed] (S)--(${pX(x0, y0)},${pY(x0, 0)}) (A)--(${pX(x0 + a, y0)},${pY(x0 + a, 0)}) (B)--(${pX(x0, y0 + b)},${pY(x0, 0)}) (S)--(0,${z0}) (C)--(0,${z0 + b});`,
        '  \\draw[thick] (A)--(S)--(B) (S)--(C);',
        '  \\fill (S) circle (2pt) (A) circle (2pt) (B) circle (2pt) (C) circle (2pt);',
        `  \\node[below left] at (0,0) {\\footnotesize $O$}; \\node[left] at (0,${z0}) {\\footnotesize ${z0}}; \\node[left] at (0,${z0 + b}) {\\footnotesize ${z0 + b}};`,
        `  \\node[left] at (A) {\\footnotesize $A$}; \\node[above right] at (B) {\\footnotesize $B$};`,
        `  \\node[above right] at (S) {\\footnotesize $S(${x0};${y0};${z0})$};`,
        `  \\node[above right] at (C) {\\footnotesize $C(${x0};${y0};${z0 + b})$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'cuboid_OABC_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.68,line join=round,line cap=round,>=stealth]',
        '  \\coordinate (O) at (0,0); \\coordinate (C) at (2.8,-0.45); \\coordinate (A) at (-1.8,-1.2); \\coordinate (B) at (1.0,-1.65);',
        '  \\coordinate (O1) at (0,3.2); \\coordinate (C1) at (2.8,2.75); \\coordinate (A1) at (-1.8,2.0); \\coordinate (B1) at (1.0,1.55);',
        '  \\draw[->] (A)--(-3.0,-2.0) node[left] {\\footnotesize $x$};',
        '  \\draw[->] (C)--(4.2,-0.68) node[below] {\\footnotesize $y$};',
        '  \\draw[->] (O1)--(0,4.2) node[left] {\\footnotesize $z$};',
        '  \\draw (A)--(B)--(C)--(C1)--(O1)--(A1)--cycle (A1)--(B1)--(B) (B1)--(C1);',
        '  \\draw[dashed] (A)--(O)--(C) (O)--(O1);',
        '  \\foreach \\p in {O,A,B,C,O1,A1,B1,C1} \\fill (\\p) circle (1.8pt);',
        '  \\node[above left] at (O) {\\footnotesize $O$}; \\node[above left] at (A) {\\footnotesize $A$};',
        '  \\node[below] at (B) {\\footnotesize $B$}; \\node[above right] at (C) {\\footnotesize $C$};',
        "  \\node[left] at (O1) {\\footnotesize $O'$}; \\node[above left] at (A1) {\\footnotesize $A'$};",
        "  \\node[right] at (B1) {\\footnotesize $B'$}; \\node[above] at (C1) {\\footnotesize $C'$};",
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'two_drones_3d') {
      const xA = params.xA ?? 7;
      const yA = params.yA ?? -8;
      const xB = params.xB ?? 2;
      const yB = params.yB ?? 7;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.58,line join=round,line cap=round,>=stealth]',
        '  \\draw[->] (-2.0,0)--(7.5,0) node[below] {\\footnotesize $x$};',
        '  \\draw[->] (-3.5,-3.5)--(3.8,3.8) node[right] {\\footnotesize $y$};',
        '  \\draw[->] (0,0)--(0,6.2) node[right] {\\footnotesize $z$};',
        '  \\node[below right] at (0,0) {\\footnotesize $O$};',
        '  \\draw[dashed] (2.4,1.6)--(2.4,-3.0) (5.4,0)--(2.4,-3.0)--(-3.0,-3.0);',
        '  \\fill (2.4,1.6) circle (2.2pt) node[above right] {\\footnotesize $A$};',
        `  \\node[below] at (5.4,0) {\\footnotesize $${xA}$}; \\node[above left] at (-3.0,-3.0) {\\footnotesize $${yA}$};`,
        '  \\draw[dashed] (4.2,5.6)--(4.2,2.6) (1.6,0)--(4.2,2.6)--(2.6,2.6);',
        '  \\fill (4.2,5.6) circle (2.2pt) node[above left] {\\footnotesize $B$};',
        `  \\node[below] at (1.6,0) {\\footnotesize $${xB}$}; \\node[above left] at (2.6,2.6) {\\footnotesize $${yB}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'kingfisher_fish_3d') {
      const variant = params.variant ?? 0;
      if (variant === 1) {
        return [
          '\\begin{center}',
          '\\begin{tikzpicture}[scale=0.82,line join=round,line cap=round,>=stealth]',
          '  \\fill[cyan!18] (0,0)--(3.8,0)--(2.4,-1.4)--(-1.4,-1.4)--cycle;',
          '  \\draw[->] (0,0)--(4.4,0) node[below] {\\footnotesize $y$};',
          '  \\draw[->] (0,0)--(-1.8,-1.8) node[left] {\\footnotesize $x$};',
          '  \\draw[->] (0,0)--(0,2.8) node[right] {\\footnotesize $z$};',
          '  \\coordinate (A) at (0.5,-1.0); \\coordinate (B) at (1.0,-0.5); \\coordinate (C) at (2.8,1.5);',
          '  \\draw[dashed] (A)--(B); \\draw[thick] (B)--(C);',
          '  \\fill (0,0) circle (1.4pt) node[below right] {\\footnotesize $O$};',
          '  \\fill (A) circle (1.6pt) node[left] {\\footnotesize $A$};',
          '  \\fill (B) circle (1.6pt) node[right] {\\footnotesize $B$};',
          '  \\fill (C) circle (1.6pt) node[above right] {\\footnotesize $C$};',
          '\\end{tikzpicture}',
          '\\end{center}',
        ];
      }
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.82,line join=round,line cap=round,>=stealth]',
        '  \\fill[cyan!18] (0,0)--(4.2,0)--(2.8,-1.4)--(-1.4,-1.4)--cycle;',
        '  \\draw[->] (0,0)--(4.6,0) node[below] {\\footnotesize $y$};',
        '  \\draw[->] (0,0)--(-1.8,-1.8) node[left] {\\footnotesize $x$};',
        '  \\draw[->] (0,0)--(0,2.8) node[right] {\\footnotesize $z$};',
        '  \\coordinate (A) at (-0.6,2.1); \\coordinate (B) at (3.2,2.2); \\coordinate (C) at (1.0,-0.8);',
        '  \\draw[thick] (A)--(C); \\draw[dashed] (B)--(C);',
        '  \\fill (0,0) circle (1.4pt) node[below right] {\\footnotesize $O$};',
        '  \\fill (A) circle (1.6pt) node[left] {\\footnotesize $A$};',
        '  \\fill (B) circle (1.6pt) node[right] {\\footnotesize $B$};',
        '  \\fill (C) circle (1.6pt) node[below] {\\footnotesize $C$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'plane_flight_path_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.95,line join=round,line cap=round,>=stealth]',
        '  \\draw[dashed] (0,0)--(3.8,1.4);',
        '  \\draw[->,thick] (3.8,1.4)--(5.0,1.84);',
        '  \\fill (0,0) circle (1.6pt) node[above] {\\footnotesize $F$};',
        '  \\fill (3.8,1.4) circle (1.6pt) node[above] {\\footnotesize $E$};',
        '  \\fill (5.0,1.84) circle (1.6pt) node[above] {\\footnotesize $M$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_signed_area_plot') {
      const a = params.a ?? -1;
      const b = params.b ?? 4;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.82,line join=round,line cap=round,>=stealth]',
        `  \\draw[->] (${a - 0.6},0)--(${b + 0.8},0) node[below] {\\footnotesize $x$};`,
        '  \\draw[->] (0,-1.5)--(0,3.2) node[left] {\\footnotesize $y$};',
        `  \\fill[gray!25] (${a},0)--plot[samples=40,domain=${a}:0] (\\x,{(\\x)*(\\x-(${a}))*4/(${a}*${a})})--(0,0)--cycle;`,
        `  \\fill[gray!25] (0,0)--plot[samples=60,domain=0:${b}] (\\x,{(-\\x)*(\\x-${b})*9.6/(${b}*${b})})--(${b},0)--cycle;`,
        `  \\draw[blue,very thick,domain=${a}:0,samples=40] plot (\\x,{(\\x)*(\\x-(${a}))*4/(${a}*${a})});`,
        `  \\draw[blue,very thick,domain=0:${b},samples=60] plot (\\x,{(-\\x)*(\\x-${b})*9.6/(${b}*${b})});`,
        `  \\fill (0,0) circle (1.4pt) node[below right] {\\footnotesize $O$};`,
        `  \\fill (${a},0) circle (1.4pt) node[above left] {\\footnotesize $${a}$};`,
        `  \\fill (${b},0) circle (1.4pt) node[below] {\\footnotesize $${b}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_two_parabolas_area') {
      const p = params.p ?? -2;
      const q = params.q ?? 4;
      const c = params.c ?? -1;
      const b = params.b ?? 3;
      const yMin = Math.max(-7, Math.floor(c - (p * p) / 4 - 1));
      const yMax = Math.min(12, Math.ceil(c + (q * q) / 4 + 1));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.72,line join=round,line cap=round,>=stealth]',
        `  \\draw[->] (-1.2,0)--(${b + 1.2},0) node[below] {\\footnotesize $x$};`,
        `  \\draw[->] (0,${yMin})--(0,${yMax}) node[left] {\\footnotesize $y$};`,
        '  \\begin{scope}',
        `    \\clip (-1.2,${yMin}) rectangle (${b + 1.2},${yMax});`,
        `    \\fill[gray!25] plot[samples=50,domain=0:${b}] (\\x,{(\\x)^2+(${p})*(\\x)+(${c})})--plot[samples=50,domain=${b}:0] (\\x,{-(\\x)^2+(${q})*(\\x)+(${c})})--cycle;`,
        `    \\draw[thick,domain=-1.2:${b + 1.2},samples=80] plot (\\x,{(\\x)^2+(${p})*(\\x)+(${c})});`,
        `    \\draw[thick,blue,domain=-1.2:${b + 1.2},samples=80] plot (\\x,{-(\\x)^2+(${q})*(\\x)+(${c})});`,
        `    \\draw[dashed] (${b},0)--(${b},{(${b})^2+(${p})*(${b})+(${c})});`,
        '  \\end{scope}',
        `  \\node[below right] at (0,0) {\\footnotesize $O$};`,
        `  \\node[below] at (${b},0) {\\footnotesize $${b}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_parabola_line_area') {
      const p = params.p ?? 4;
      const k = params.k ?? 1;
      const b = params.b ?? 5;
      const yMin = Math.max(-8, Math.floor(-(p * p) / 4 - 1));
      const yMax = Math.min(14, Math.ceil(k * b + 1.5));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.7,line join=round,line cap=round,>=stealth]',
        `  \\draw[->] (-1,0)--(${b + 1.2},0) node[below] {\\footnotesize $x$};`,
        `  \\draw[->] (0,${yMin})--(0,${yMax}) node[left] {\\footnotesize $y$};`,
        '  \\begin{scope}',
        `    \\clip (-1,${yMin}) rectangle (${b + 1.2},${yMax});`,
        `    \\fill[gray!25] plot[samples=60,domain=0:${b}] (\\x,{(\\x)^2-(${p})*(\\x)})--(${b},${k * b})--(0,0)--cycle;`,
        `    \\draw[thick,domain=-1:${b + 1.2},samples=80] plot (\\x,{(\\x)^2-(${p})*(\\x)});`,
        `    \\draw[thick,blue,domain=-1:${b + 1.2}] plot (\\x,{(${k})*(\\x)});`,
        `    \\draw[dashed] (${b},0)--(${b},${k * b});`,
        '  \\end{scope}',
        `  \\node[below right] at (0,0) {\\footnotesize $O$};`,
        `  \\node[below] at (${b},0) {\\footnotesize $${b}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_curved_triangle') {
      const xv = params.xv ?? 1;
      const xm = params.xm ?? 4;
      const xr = params.xr ?? 5;
      const ym = params.ym ?? 9;
      const xMin = Math.min(0, xv) - 0.8;
      const xMax = xr + 1;
      const yMax = ym + 1.5;
      const slope = Number((ym / Math.max(0.1, xr - xm)).toFixed(3));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.58,line join=round,line cap=round,>=stealth]',
        `  \\draw[->] (${xMin},0)--(${xMax},0) node[below] {\\footnotesize $x$};`,
        `  \\draw[->] (0,-1)--(0,${yMax}) node[right] {\\footnotesize $y$};`,
        `  \\fill[gray!25] (${xv},0)--plot[samples=40,domain=${xv}:${xm}] (\\x,{(\\x-(${xv}))^2})--(${xr},0)--cycle;`,
        `  \\draw[thick,domain=${xv - 0.5}:${xm + 0.5},samples=60] plot (\\x,{(\\x-(${xv}))^2});`,
        `  \\draw[thick,blue,domain=${xm - 0.4}:${xr + 0.3}] plot (\\x,{${slope}*(${xr}-\\x)});`,
        `  \\draw[dashed] (${xm},0)--(${xm},${ym});`,
        `  \\node[below left] at (0,0) {\\footnotesize $O$};`,
        xv !== 0 ? `  \\node[below] at (${xv},0) {\\footnotesize $${xv}$};` : '',
        xm !== 0 ? `  \\node[below] at (${xm},0) {\\footnotesize $${xm}$};` : '',
        `  \\node[below] at (${xr},0) {\\footnotesize $${xr}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ].filter(Boolean);
    }
    if (figureType === 'l13_two_curves_H') {
      const b = params.b ?? 2;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.72,line join=round,line cap=round,>=stealth]',
        '  \\draw[->] (-1,0)--(4.2,0) node[right] {\\footnotesize $x$};',
        '  \\draw[->] (0,-0.8)--(0,6.2) node[above] {\\footnotesize $y$};',
        '  \\fill[gray!25] plot[samples=50,domain=0:3] (\\x,{-((\\x-2)^2-5.8)})--plot[samples=30,domain=3:0] (\\x,{0.8*\\x+1.5})--cycle;',
        '  \\draw[thick,domain=-0.4:3.8,samples=80] plot (\\x,{-((\\x-2)^2-5.8)});',
        '  \\draw[thick,blue] (-0.4,1.18)--(3.8,4.54);',
        '  \\draw[dashed] (3,4.8)--(3,0) node[below] {\\footnotesize $' + b + '$};',
        '  \\node[below left] at (0,0) {\\footnotesize $O$};',
        '  \\node at (1.7,4.0) {\\footnotesize $(H)$};',
        '  \\node at (1.8,6.1) {\\footnotesize $y=f(x)$};',
        '  \\node[right] at (3.4,4.2) {\\footnotesize $y=g(x)$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_frustum_tank') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.85,line join=round]',
        '  \\fill[blue!20] (-1,0)--(1,0)--(1.5,1.5)--(-1.5,1.5)--cycle;',
        '  \\draw[blue] (-1.5,1.5)--(1.5,1.5);',
        '  \\draw[thick] (-2,3)--(-1,0)--(1,0)--(2,3);',
        '  \\draw[dashed] (-2,3)--(2,3);',
        `  \\draw[<->] (-1,-0.3)--(1,-0.3) node[midway,below]{\\footnotesize $a=${params.a}$ m};`,
        `  \\draw[<->] (-2,3.3)--(2,3.3) node[midway,above]{\\footnotesize $b=${params.b}$ m};`,
        `  \\draw[<->] (2.5,0)--(2.5,3) node[midway,right]{\\footnotesize $H=${params.H}$ m};`,
        '  \\draw[<->] (-2.3,0)--(-2.3,1.5) node[midway,left]{\\footnotesize $h(t)$};',
        `  \\draw[->,cyan,thick] (0.3,3.8)--(0.3,2.2) node[pos=0,right]{\\footnotesize $Q=${params.Q}$ m$^3$/phút};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_circle_two_parabolas') {
      const R = params.R ?? 8;
      const d = params.d ?? 2;
      const axesVariant = params.axesVariant ?? 1;
      const hFrac = Number((Math.max(0.5, R - d) / R).toFixed(3));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.65,line join=round,line cap=round,>=stealth]',
        '  \\def\\r{4}',
        `  \\def\\h{${Number((4 * hFrac).toFixed(3))}}`,
        '  \\fill[green!15] plot[domain=-4:4,samples=80] (\\x,{\\h-(\\h/16)*(\\x)^2})--plot[domain=4:-4,samples=80] (\\x,{-\\h+(\\h/16)*(\\x)^2})--cycle;',
        '  \\draw[thick] (0,0) circle (\\r);',
        '  \\draw[thick] (-\\r,0)--(\\r,0);',
        '  \\draw[very thick,green!60!black,domain=-4:4,samples=80] plot (\\x,{\\h-(\\h/16)*(\\x)^2});',
        '  \\draw[very thick,green!60!black,domain=-4:4,samples=80] plot (\\x,{-\\h+(\\h/16)*(\\x)^2});',
        axesVariant === 1
          ? '  \\draw[->] (-4.8,0)--(4.9,0) node[below] {\\footnotesize $x$}; \\draw[->] (0,-4.8)--(0,4.9) node[left] {\\footnotesize $y$};'
          : `  \\node[below] at (0,0) {\\footnotesize $${2 * R}$ m};`,
        `  \\draw[<->,dashed] (0,-\\h)--(0,-4) node[midway,right] {\\footnotesize $${d}$ m};`,
        axesVariant === 1
          ? '  \\fill (0,-\\h) circle (1.5pt) node[above left] {\\footnotesize $I$}; \\node[below left] at (-4,0) {\\footnotesize $B$}; \\node[above right] at (4,0) {\\footnotesize $A$};'
          : '  \\node[left] at (-4,0) {\\footnotesize $A$}; \\node[right] at (4,0) {\\footnotesize $B$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_parabolic_gate_2cords') {
      const ww = params.w ?? 3;
      const HH = params.H ?? 8;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.6,line join=round,line cap=round,>=stealth]',
        '  \\draw[->] (-3.8,0)--(4.4,0) node[above] {\\footnotesize $x$};',
        '  \\draw[->] (0,-6.6)--(0,0.9) node[right] {\\footnotesize $y$};',
        '  \\draw[thick,domain=-3:3,samples=100] plot (\\x,{-(6/9)*(\\x)^2});',
        '  \\draw[blue] (-1.89,-2.38)--(1.89,-2.38);',
        '  \\draw[orange] (-2.38,-3.78)--(2.38,-3.78);',
        '  \\draw[dashed] (-3,0)--(-3,-6) (1.89,0)--(1.89,-2.38) (2.38,0)--(2.38,-3.78);',
        `  \\node[above right] at (0,0) {\\footnotesize $O$}; \\node[above] at (-3,0) {\\footnotesize $-${ww}$}; \\node[left] at (0,-6) {\\footnotesize $-${HH}$};`,
        '  \\node[left] at (-1.89,-2.38) {\\footnotesize $A$}; \\node[right] at (1.89,-2.38) {\\footnotesize $B$};',
        '  \\node[left] at (-2.38,-3.78) {\\footnotesize $C$}; \\node[right] at (2.38,-3.78) {\\footnotesize $D$};',
        `  \\draw[<->] (-3,-6.4)--(3,-6.4) node[midway,below] {\\footnotesize $${2 * ww}$ m};`,
        `  \\draw[<->] (3.4,-6)--(3.4,0) node[midway,right] {\\footnotesize $${HH}$ m};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_square_4parabolas_cut') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.48,line join=round,line cap=round]',
        '  \\fill[black!85] (0,0) rectangle (10,10);',
        '  \\fill[white] (2.5,0)--plot[domain=2.5:7.5,samples=60] (\\x,{-16/25*(\\x-2.5)^2+16/5*(\\x-2.5)})--(7.5,0)--cycle;',
        '  \\fill[white] (2.5,10)--plot[domain=2.5:7.5,samples=60] (\\x,{16/25*(\\x-2.5)^2-16/5*(\\x-2.5)+10})--(7.5,10)--cycle;',
        '  \\fill[white] (0,2.5)--plot[domain=2.5:7.5,samples=60] ({-16/25*(\\x-2.5)^2+16/5*(\\x-2.5)},\\x)--(0,7.5)--cycle;',
        '  \\fill[white] (10,2.5)--plot[domain=2.5:7.5,samples=60] ({10-( -16/25*(\\x-2.5)^2+16/5*(\\x-2.5) )},\\x)--(10,7.5)--cycle;',
        '  \\draw[dashed,red] (6,5)--(10,5) (10,2.5)--(10,7.5);',
        '  \\node[above left] at (6,5) {\\footnotesize $O$}; \\node[right] at (10,7.5) {\\footnotesize $A$};',
        '  \\node[right] at (10,2.5) {\\footnotesize $B$}; \\node[right] at (10,5) {\\footnotesize $H$};',
        `  \\node[below] at (5,-0.2) {\\footnotesize Cạnh $${params.L}$ cm};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_square_4petals') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.85,line join=round,line cap=round]',
        '  \\foreach \\i in {0,90,180,270}',
        '    \\draw[rotate=\\i,fill=gray!50,smooth,samples=60] (0,0)--plot[domain=0:2] (\\x,{0.5*(\\x)^2})--plot[domain=2:0] (\\x,{sqrt(2*\\x)})--cycle;',
        '  \\draw (-2,-2) rectangle (2,2);',
        `  \\node[below] at (0,-2.1) {\\footnotesize Cạnh $${params.a}$ cm};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_double_parabola_arch') {
      const W2 = params.W2 ?? 7;
      const H2 = params.H2 ?? 5;
      const W1 = params.W1 ?? 4;
      const H1 = params.H1 ?? 3;
      const hwOut = 3;
      const hwIn = Number((hwOut * (W1 / Math.max(1, W2))).toFixed(2));
      const hIn = Number((4 * (H1 / Math.max(1, H2))).toFixed(2));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.75,line join=round,line cap=round]',
        `  \\fill[gray!30] (-${hwOut},0)--plot[domain=-${hwOut}:${hwOut},samples=80] (\\x,{4*(1-(\\x/${hwOut})^2)})--(${hwOut},0)--(${hwIn},0)--plot[domain=${hwIn}:-${hwIn},samples=60] (\\x,{${hIn}*(1-(\\x/${hwIn})^2)})--(-${hwIn},0)--cycle;`,
        `  \\draw[thick,domain=-${hwOut}:${hwOut},samples=80] plot (\\x,{4*(1-(\\x/${hwOut})^2)});`,
        `  \\draw[thick,domain=-${hwIn}:${hwIn},samples=60] plot (\\x,{${hIn}*(1-(\\x/${hwIn})^2)});`,
        `  \\draw (-${hwOut},0)--(${hwOut},0);`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_rect_inscribed_parabola') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.75,line join=round,line cap=round]',
        '  \\fill[blue!15] (0,0)--plot[domain=0:6,samples=80] (\\x,{(3.2/9)*(\\x)*(6-\\x)})--(6,0)--cycle;',
        '  \\draw[thick] (0,0) rectangle (6,3.2);',
        '  \\draw[thick,blue,domain=0:6,samples=80] plot (\\x,{(3.2/9)*(\\x)*(6-\\x)});',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_rect_two_side_parabolas') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.52,line join=round,line cap=round]',
        '  \\fill[blue!15] (0,0)--(10,0)--plot[domain=0:5,samples=50] ({10-3*(1-((\\x-2.5)/2.5)^2)},\\x)--(10,5)--(0,5)--plot[domain=5:0,samples=50] ({3*(1-((\\x-2.5)/2.5)^2)},\\x)--cycle;',
        '  \\draw[thick] (0,0) rectangle (10,5);',
        '  \\draw[thick,blue] plot[domain=0:5,samples=50] ({3*(1-((\\x-2.5)/2.5)^2)},\\x);',
        '  \\draw[thick,blue] plot[domain=0:5,samples=50] ({10-3*(1-((\\x-2.5)/2.5)^2)},\\x);',
        '  \\draw[dashed] (5,-0.5)--(5,5.5);',
        '  \\fill[blue] (3,2.5) circle (2pt) node[right] {\\footnotesize $I$};',
        '  \\node[below left] at (0,0) {\\footnotesize $A$}; \\node[below right] at (10,0) {\\footnotesize $B$};',
        '  \\node[above right] at (10,5) {\\footnotesize $C$}; \\node[above left] at (0,5) {\\footnotesize $D$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_ellipse_two_parabolas') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.72,line join=round,line cap=round]',
        '  \\fill[orange!30] plot[domain=120:240,samples=60,variable=\\t] ({4*cos(\\t)},{2*sin(\\t)})--plot[domain=-1.732:1.732,samples=40,variable=\\y] ({-2/3*\\y*\\y},\\y)--cycle;',
        '  \\fill[orange!30] plot[domain=-60:60,samples=60,variable=\\t] ({4*cos(\\t)},{2*sin(\\t)})--plot[domain=1.732:-1.732,samples=40,variable=\\y] ({2/3*\\y*\\y},\\y)--cycle;',
        '  \\draw[red,thick] (0,0) ellipse (4 and 2);',
        '  \\draw[thick,domain=-1.732:1.732,samples=60,variable=\\y] plot ({-2/3*\\y*\\y},\\y);',
        '  \\draw[thick,domain=-1.732:1.732,samples=60,variable=\\y] plot ({2/3*\\y*\\y},\\y);',
        '  \\node[left] at (-4,0) {\\footnotesize $A_1$}; \\node[right] at (4,0) {\\footnotesize $A_2$};',
        '  \\node[above] at (0,2) {\\footnotesize $B_2$}; \\node[below] at (0,-2) {\\footnotesize $B_1$};',
        '  \\node[above left] at (-2,1.732) {\\footnotesize $M$}; \\node[above right] at (2,1.732) {\\footnotesize $N$};',
        '  \\node[below left] at (-2,-1.732) {\\footnotesize $Q$}; \\node[below right] at (2,-1.732) {\\footnotesize $P$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l13_vase_profile') {
      const L = params.L ?? 5;
      const r = params.r ?? 1;
      const eX = Number((((L - r) / L) * 5).toFixed(2));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.85,line join=round,line cap=round]',
        '  \\draw (0,0) rectangle (5,2.5);',
        `  \\fill[gray!25] (0,1)--plot[domain=0:${eX},samples=40] (\\x,{sqrt(1.5625*2 - (\\x-${eX / 2})^2)*0.8 + 0.6})--(${eX},1)--(5,1)--(5,0)--(0,0)--cycle;`,
        `  \\draw[thick] (0,1)--(${eX},1.8)--(5,1);`,
        `  \\draw[dashed] (0,1)--(5,1) (${eX},0)--(${eX},1.8);`,
        '  \\node[below left] at (0,0) {\\footnotesize $A$}; \\node[below right] at (5,0) {\\footnotesize $B$};',
        '  \\node[above right] at (5,2.5) {\\footnotesize $C$}; \\node[above left] at (0,2.5) {\\footnotesize $D$};',
        `  \\node[left] at (0,1) {\\footnotesize $M$}; \\node[above] at (${eX},1.8) {\\footnotesize $N$};`,
        `  \\node[right] at (5,1) {\\footnotesize $P$}; \\node[below] at (${eX},0) {\\footnotesize $E$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l14_stadium_frustum_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[>=stealth,scale=0.95]',
        '  \\def\\a{2.5}',
        '  \\path (0:0) coordinate (O) (20:\\a) coordinate (A) (150:\\a) coordinate (D) (75:.7*\\a) coordinate (G)',
        '    ($(O)+(75:1.5*\\a)$) coordinate (S) ($(S)!.7!(O)$) coordinate (B) ($(S)!.7!(A)$) coordinate (C)',
        '    ($(S)!.7!(G)$) coordinate (F) ($(S)!.7!(D)$) coordinate (E)',
        '    ($(O)!1.3!(A)$) coordinate (Ax) ($(O)!1.3!(D)$) coordinate (Dy) ($(O)+(90:\\a)$) coordinate (Iz);',
        '  \\draw[dashed] (A)--(G)--(D) (F)--(G);',
        '  \\draw (A)--(O)--(D) (B)--(C)--(F)--(E)--cycle (E)--(D) (B)--(O) (C)--(A);',
        '  \\draw[->] (A)--(Ax) node[below] {$x$};',
        '  \\draw[->] (D)--(Dy) node[left] {$y$};',
        '  \\draw[->] (O)--(Iz) node[left] {$z$};',
        '  \\foreach \\x/\\g in {A/-90,B/-25,C/0,D/-90,E/180,F/90,G/25,O/-90}',
        '    \\fill[black] (\\x) circle (1pt) ($(\\g:3mm)+(\\x)$) node {\\footnotesize $\\x$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l14_trapezoid_yard_2d') {
      const ab = params.ab ?? 8;
      const ad = params.ad ?? 4;
      const bc = params.bc ?? 8;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.5, font=\\footnotesize, line join=round, line cap=round, >=stealth]',
        '  \\path (0,0) coordinate (A) (9,0) coordinate (B) (9,-6) coordinate (C) (0,-5) coordinate (D);',
        '  \\draw[thick] (A)--(B)--(C)--(D)--cycle;',
        `  \\node[above] at ($(A)!0.5!(B)$) {$${ab}$ m};`,
        `  \\node[right] at ($(B)!0.5!(C)$) {$${bc}$ m};`,
        `  \\node[left] at ($(A)!0.5!(D)$) {$${ad}$ m};`,
        '  \\foreach \\i/\\g in {A/90,B/90,C/-90,D/-90} {\\draw[fill=black] (\\i) circle (1pt) ($(\\i)+(\\g:4mm)$) node {$\\i$};}',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l14_camera_cone_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[>=stealth,font=\\footnotesize,scale=0.7]',
        '  \\def\\d{10} \\def\\r{4} \\def\\a{3} \\def\\b{1} \\def\\h{3}',
        '  \\path (-170:2/3*\\d) coordinate (P1) ++(0:\\d) coordinate (P2) ++(40:\\r) coordinate (P3) ($(P1)+(P3)-(P2)$) coordinate (P4);',
        '  \\draw (P4)--(P1)--(P2)--(P3)--cycle;',
        '  \\pgfmathsetmacro\\g{asin(\\b/\\h)}',
        '  \\pgfmathsetmacro\\xo{\\a*cos(\\g)}',
        '  \\pgfmathsetmacro\\yo{\\b*sin(\\g)}',
        '  \\draw[dashed] (\\xo,\\yo) arc (\\g:180-\\g:{\\a} and {\\b}) (180:\\a) node[left]{$B$} -- (0:\\a) node[right]{$C$} (90:\\h) node[above]{$A$} -- (0:0) node[below]{$O$};',
        '  \\draw (90:\\h) -- (-\\xo,\\yo) arc (180-\\g:360+\\g:{\\a} and {\\b}) -- cycle;',
        '  \\node[below left] at (-5.3,-0.5) {$P$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l14_museum_box_pane_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line cap=round,line join=round,>=stealth,font=\\footnotesize]',
        '  \\path (0,0) coordinate (O) (-1,-1) coordinate (A) (3,0) coordinate (C) (2,-1) coordinate (B);',
        '  \\foreach \\x/\\y in {O/D,A/E,B/F,C/G} {\\coordinate (\\y) at ($(\\x)+(0,3)$);}',
        '  \\path ($(A)!0.4!(E)$) coordinate (P) ($(C)!0.6!(G)$) coordinate (Q);',
        '  \\fill[yellow!40] (O)--(P)--(F)--(Q)--cycle;',
        '  \\draw (E)--(D)--(G)--(F)--(E)--(A)--(B)--(C)--(G) (B)--(F)--(P) (F)--(Q);',
        '  \\draw[dashed] (A)--(O)--(C) (P)--(O)--(D) (O)--(Q);',
        '  \\foreach \\i/\\g in {O/-90, A/180, B/-30, C/0, D/180, E/180, F/90, G/0, P/180, Q/0}',
        '    {\\draw ($(\\i)+(\\g:3mm)$) node {$\\i$}; \\fill[black] (\\i) circle (1pt);}',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l15_signal_line_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.72,line join=round,line cap=round]',
        '  \\draw[blue,dashed,thick] (-3,-2.5)--( -3,3.2) node[above] {\\footnotesize $d$};',
        '  \\draw[thick] (2,2.1)--(2.35,1.5)--(1.65,1.5)--cycle;',
        '  \\draw[thick] (2,2.1) circle (0.28);',
        '  \\node[above] at (2,2.4) {\\footnotesize $P$};',
        '  \\draw[orange,thick] (-3,2.1)--(2,2.1);',
        '  \\draw[orange,dashed,thick] (-3,-1.6)--(2,2.1);',
        '  \\draw (-3,1.85)--(-2.75,1.85)--(-2.75,2.1);',
        '  \\fill[orange] (-3,2.1) circle (1.8pt) node[left] {\\footnotesize $I$};',
        '  \\fill (-3,-1.6) circle (1.8pt) node[left] {\\footnotesize $A$};',
        '  \\foreach \\r in {0.45,0.75,1.05,1.35} {\\draw[cyan!70!blue,thick,opacity=0.45] (2,2.1) circle (\\r);}',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l15_cube_two_ants_3d') {
      const a = params.a ?? 10;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round,line cap=round,scale=0.72]',
        '  \\coordinate (B) at (0,0); \\coordinate (C) at (4.5,0); \\coordinate (A) at (1.5,1.3); \\coordinate (D) at (6,1.3);',
        '  \\coordinate (B1) at (0,4); \\coordinate (C1) at (4.5,4); \\coordinate (A1) at (1.5,5.3); \\coordinate (D1) at (6,5.3);',
        '  \\draw[dashed] (A)--(B) (A)--(D) (A)--(A1);',
        '  \\draw[dashed,orange!80!black,thick] (A)--(D1);',
        '  \\draw[dashed,brown!70!black,thick] (D)--(B);',
        '  \\draw[thick] (B)--(C)--(D) (B)--(B1) (C)--(C1) (D)--(D1) (B1)--(C1)--(D1)--(A1)--cycle;',
        '  \\fill[yellow!80!orange,draw=orange!80!black] (2.6,2.3) circle (3.2pt);',
        '  \\fill[brown!50!black] (4.7,1.0) circle (3.2pt);',
        '  \\node[below left] at (B) {\\footnotesize $B$}; \\node[below right] at (C) {\\footnotesize $C$};',
        '  \\node[left] at (A) {\\footnotesize $A$}; \\node[right] at (D) {\\footnotesize $D$};',
        "  \\node[above left] at (B1) {\\footnotesize $B'$}; \\node[right] at (C1) {\\footnotesize $C'$};",
        "  \\node[above left] at (A1) {\\footnotesize $A'$}; \\node[above right] at (D1) {\\footnotesize $D'$};",
        `  \\node[below] at (2.8,-0.45) {\\footnotesize Hình lập phương cạnh $${a}$ cm};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l17_earth_tangent_orbit_3d') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.65,line join=round, line cap=round,>=stealth]',
        '  \\coordinate (O) at (0,0);',
        '  \\coordinate (K) at (2.8,0);',
        '  \\coordinate (H) at (0,1.05);',
        '  \\coordinate (B) at (2.6,1.05);',
        '  \\coordinate (A) at (1.3,1.35);',
        '  \\coordinate (M) at (4.6,1.05);',
        '  \\draw[thick] (O) circle (2.8);',
        '  \\draw (A)--(M);',
        '  \\draw (2.8,0) arc (0:-180:2.8 and 0.55);',
        '  \\draw[dashed] (2.8,0) arc (0:180:2.8 and 0.55);',
        '  \\draw (2.6,1.05) arc (0:-180:2.6 and 0.35);',
        '  \\draw[dashed] (2.6,1.05) arc (0:180:2.6 and 0.35);',
        '  \\draw[dashed] (O)--(H)--(A);',
        '  \\fill[black] (O) circle (1.3pt) node[below] {\\footnotesize $O$};',
        '  \\fill[black] (H) circle (1.3pt) node[left] {\\footnotesize $H$};',
        '  \\fill[black] (A) circle (1.3pt) node[above] {\\footnotesize $A$};',
        '  \\fill[black] (M) circle (1.3pt) node[above] {\\footnotesize $M$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b1_unit_circle_point') {
      const deg = params.deg ?? 180;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=1.15,>=stealth,font=\\footnotesize]',
        '  \\draw[->] (-1.55,0)--(1.6,0) node[below]{$x$};',
        '  \\draw[->] (0,-1.55)--(0,1.6) node[left]{$y$};',
        '  \\draw[thick] (0,0) circle (1);',
        '  \\fill (0,0) circle (1.2pt) node[below left]{$O$};',
        '  \\node[below right] at (1,0) {$1$}; \\node[below left] at (-1,0) {$-1$};',
        '  \\node[above right] at (0,1) {$1$}; \\node[below right] at (0,-1) {$-1$};',
        `  \\fill[red] (${deg}:1) circle (2.2pt);`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b1_unit_circle_axes') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.75,>=stealth,font=\\footnotesize,line join=round,line cap=round]',
        '  \\draw[very thick] (0,0) circle (2 cm);',
        '  \\draw[->] (-2.8,0)--(2.8,0) node[below]{$x$};',
        '  \\draw[->] (0,-2.8)--(0,2.8) node[left]{$y$};',
        '  \\fill (0,0) circle (1.5pt) node[below left]{$O$};',
        '  \\fill (2,0) circle (1.5pt) node[above right]{$A$};',
        '  \\fill (-2,0) circle (1.5pt) node[above left]{$A\'$};',
        '  \\fill (0,2) circle (1.5pt) node[above right]{$B$};',
        '  \\fill (0,-2) circle (1.5pt) node[below left]{$B\'$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b1_unit_circle_quad_sym') {
      const baseDeg = params.baseDeg ?? 60;
      const showArc = (params.showArc ?? 1) === 1;
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.75,>=stealth,font=\\footnotesize,line join=round,line cap=round]',
        '  \\draw[very thick] (0,0) circle (2 cm);',
        '  \\draw[->] (-2.8,0)--(2.8,0) node[below]{$x$};',
        '  \\draw[->] (0,-2.8)--(0,2.8) node[left]{$y$};',
        '  \\fill (0,0) coordinate (O) circle (1.5pt) node[below left]{$O$};',
        `  \\fill (${baseDeg}:2) coordinate (M) circle (1.5pt) node[above right]{$M$};`,
        `  \\fill (${180 - baseDeg}:2) circle (1.5pt) node[above left]{$N$};`,
        `  \\fill (${-180 + baseDeg}:2) circle (1.5pt) node[below left]{$P$};`,
        `  \\fill (${-baseDeg}:2) circle (1.5pt) node[below right]{$Q$};`,
        ...(showArc
          ? [
              '  \\draw[dashed] (O)--(M);',
              `  \\draw[->,thin] (1,0) arc (0:${baseDeg}:1);`,
              `  \\node at (${Math.round(baseDeg / 2)}:1.45) {\\scriptsize $${baseDeg}^\\circ$};`,
            ]
          : []),
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b10_tetra_3d') {
      const lbl = diagram.labels || {};
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.7]',
        `  \\coordinate (A) at (0,0) node at (A) [left] {$${lbl.vL || 'A'}$};`,
        `  \\coordinate (C) at (1,-2) node at (C) [below] {$${lbl.vF || 'C'}$};`,
        `  \\coordinate (D) at (4,0) node at (D) [right] {$${lbl.vR || 'D'}$};`,
        `  \\coordinate (S) at (1,3) node at (S) [above] {$${lbl.apex || 'S'}$};`,
        '  \\draw[dashed] (A)--(D);',
        '  \\draw (A)--(C) (C)--(D) (S)--(A) (S)--(C) (S)--(D);',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b10_para_pyramid_3d') {
      const lbl = diagram.labels || {};
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line join=round, line cap=round,thick,scale=0.6]',
        `  \\coordinate (A) at (0,0); \\node at (A) [left]{$${lbl.vBL || 'A'}$};`,
        `  \\coordinate (D) at (-2,-2); \\node at (D) [left]{$${lbl.vFL || 'D'}$};`,
        `  \\coordinate (B) at (5,0); \\node at (B) [right]{$${lbl.vBR || 'B'}$};`,
        `  \\coordinate (C) at ($(B)+(D)-(A)$); \\node at (C) [below]{$${lbl.vFR || 'C'}$};`,
        `  \\coordinate (S) at (0,5); \\node at (S) [above]{$${lbl.apex || 'S'}$};`,
        '  \\draw (S)--(B) (S)--(C) (B)--(C) (S)--(D) (C)--(D);',
        '  \\draw[dashed,thin] (S)--(A) (A)--(D) (A)--(B);',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b10_quad_pyramid_3d') {
      const lbl = diagram.labels || {};
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[line cap=round,line join=round,>=stealth,x=0.7cm,y=0.7cm]',
        '  \\draw (0,0)--(2,-2) (5,0)--(3,3) (3,3)--(0,0) (3,3)--(4,-1.5) (3,3)--(2,-2) (4,-1.5)--(2,-2) (4,-1.5)--(5,0);',
        '  \\draw[dashed] (0,0)--(5,0);',
        `  \\node[above left] at (0,0) {$${lbl.vBL || 'A'}$};`,
        `  \\node[below left] at (2,-2) {$${lbl.vFL || 'D'}$};`,
        `  \\node[above right] at (5,0) {$${lbl.vBR || 'B'}$};`,
        `  \\node[below right] at (4,-1.5) {$${lbl.vFR || 'C'}$};`,
        `  \\node[above] at (3,3) {$${lbl.apex || 'S'}$};`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b13_prism_3d') {
      const lbl = diagram.labels || {};
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.7]',
        `  \\coordinate (A) at (0,0) node at (A) [left] {$${lbl.vL || 'A'}$};`,
        `  \\coordinate (B) at (2,-1) node at (B) [below] {$${lbl.vF || 'B'}$};`,
        `  \\coordinate (C) at (4,0) node at (C) [right] {$${lbl.vR || 'C'}$};`,
        `  \\coordinate (A1) at (1,4) node at (A1) [above] {$${lbl.tL || 'A_1'}$};`,
        `  \\coordinate (B1) at (3,3) node at (B1) [above] {$${lbl.tF || 'B_1'}$};`,
        `  \\coordinate (C1) at (5,4) node at (C1) [above] {$${lbl.tR || 'C_1'}$};`,
        '  \\draw[dashed] (A)--(C);',
        '  \\draw (A)--(B)--(C) (A1)--(B1)--(C1)--(A1) (A)--(A1) (B)--(B1) (C)--(C1);',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b15_nested_squares') {
      const b = Number((1 / Math.max(2, params.ratioDen ?? 2)).toFixed(3));
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.75]',
        `  \\def\\a{3}\\def\\b{${b}}\\def\\levels{8}`,
        '  \\coordinate (A0) at (0,0); \\coordinate (B0) at (\\a,0); \\coordinate (C0) at (\\a,\\a); \\coordinate (D0) at (0,\\a);',
        '  \\draw (A0)--(B0)--(C0)--(D0)--cycle;',
        '  \\foreach \\i in {1,...,\\levels} {',
        '    \\coordinate (A\\i) at ($(A\\the\\numexpr\\i-1\\relax)!\\b!(B\\the\\numexpr\\i-1\\relax)$);',
        '    \\coordinate (B\\i) at ($(B\\the\\numexpr\\i-1\\relax)!\\b!(C\\the\\numexpr\\i-1\\relax)$);',
        '    \\coordinate (C\\i) at ($(C\\the\\numexpr\\i-1\\relax)!\\b!(D\\the\\numexpr\\i-1\\relax)$);',
        '    \\coordinate (D\\i) at ($(D\\the\\numexpr\\i-1\\relax)!\\b!(A\\the\\numexpr\\i-1\\relax)$);',
        '    \\draw (A\\i)--(B\\i)--(C\\i)--(D\\i)--cycle;',
        '  }',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b15_nested_triangles') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.8]',
        '  \\def\\a{4}',
        '  \\coordinate (A) at (\\a/2,{\\a*sqrt(3)/2}); \\coordinate (B) at (0,0); \\coordinate (C) at (\\a,0);',
        '  \\draw (A)--(B)--(C)--cycle;',
        '  \\coordinate (A1) at ($(B)!0.5!(C)$); \\coordinate (B1) at ($(C)!0.5!(A)$); \\coordinate (C1) at ($(A)!0.5!(B)$);',
        '  \\draw[fill=gray!20] (A1)--(B1)--(C1)--cycle;',
        '  \\coordinate (A2) at ($(B1)!0.5!(C1)$); \\coordinate (B2) at ($(C1)!0.5!(A1)$); \\coordinate (C2) at ($(A1)!0.5!(B1)$);',
        '  \\draw[fill=gray!35] (A2)--(B2)--(C2)--cycle;',
        '  \\node[above] at (A) {\\scriptsize $A$}; \\node[left] at (B) {\\scriptsize $B$}; \\node[right] at (C) {\\scriptsize $C$};',
        '  \\node[below] at (A1) {\\scriptsize $A_1$}; \\node[right] at (B1) {\\scriptsize $B_1$}; \\node[left] at (C1) {\\scriptsize $C_1$};',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b15_nested_circles') {
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[scale=0.75]',
        '  \\begin{scope}\\fill[blue!25](0,0)circle(1.4);\\draw(0,0)circle(1.4);\\node at(0,-1.8){a)};\\end{scope}',
        '  \\begin{scope}[xshift=3.8cm]\\fill[blue!25](0,0)circle(1.4);\\foreach\\x in{-0.7,0.7}{\\fill[yellow!30](\\x,0)circle(0.7);\\draw(\\x,0)circle(0.7);}\\draw(0,0)circle(1.4);\\node at(0,-1.8){b)};\\end{scope}',
        '  \\begin{scope}[xshift=7.6cm]\\fill[blue!25](0,0)circle(1.4);\\foreach\\x in{-0.7,0.7}{\\fill[yellow!30](\\x,0)circle(0.7);\\draw(\\x,0)circle(0.7);}\\foreach\\x in{-1.05,-0.35,0.35,1.05}{\\fill[green!30](\\x,0)circle(0.35);\\draw(\\x,0)circle(0.35);}\\draw(0,0)circle(1.4);\\node at(0,-1.8){c)};\\end{scope}',
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    if (figureType === 'l11_b20_exp_log_plot') {
      const fnType = params.fnType ?? 0;
      const b = Math.max(2, params.base ?? 2);
      const isExp = fnType <= 2;
      const ptX = fnType <= 2 ? 1 : fnType === 3 ? b : Number((1 / b).toFixed(4));
      const ptY = fnType === 0 ? b : fnType === 1 ? Number((1 / b).toFixed(4)) : fnType === 2 ? Number(Math.sqrt(b).toFixed(3)) : 1;
      const plotExpr =
        fnType === 0
          ? `${b}^(\\x)`
          : fnType === 1
          ? `(${b})^(-\\x)`
          : fnType === 2
          ? `(${Math.sqrt(b).toFixed(3)})^(\\x)`
          : fnType === 3
          ? `ln(\\x)/ln(${b})`
          : `ln(\\x)/ln(1/${b})`;
      const xLbl = fnType <= 2 ? '1' : fnType === 3 ? String(b) : `\\frac{1}{${b}}`;
      const yLbl = fnType === 0 ? String(b) : fnType === 1 ? `\\frac{1}{${b}}` : fnType === 2 ? `\\sqrt{${b}}` : '1';
      return [
        '\\begin{center}',
        '\\begin{tikzpicture}[>=stealth, scale=0.85]',
        `  \\draw[->] (${isExp ? -2.3 : -0.8},0) -- (${isExp ? 2.3 : Math.max(3.6, b + 0.8)},0) node[below] {$x$};`,
        `  \\draw[->] (0,${isExp ? -0.8 : -1.8}) -- (0,${isExp ? Math.max(3.8, ptY + 0.9) : 2.2}) node[left] {$y$};`,
        '  \\draw[fill=black] (0,0) node[below right]{$O$} circle (1pt);',
        isExp
          ? '  \\draw (0,1) node[above left]{$1$};'
          : '  \\draw (1,0) node[below]{$1$};',
        `  \\draw (${ptX},0) node[below]{$${xLbl}$};`,
        `  \\draw (0,${ptY}) node[left]{$${yLbl}$};`,
        `  \\draw[fill=black] (${ptX},${ptY}) circle (1.5pt);`,
        `  \\draw[dashed] (0,${ptY}) -- (${ptX},${ptY}) -- (${ptX},0);`,
        `  \\draw[color=blue,thick,smooth,samples=120,domain=${isExp ? '-2:2' : `0.02:${Math.max(3.4, b + 0.5)}`}] plot (\\x,{${plotExpr}});`,
        '\\end{tikzpicture}',
        '\\end{center}',
      ];
    }
    return [
      '\\begin{center}',
      '\\begin{tikzpicture}[line join=round, line cap=round,scale=0.85]',
      '  \\fill[cyan!10] (0,-2.4) rectangle (3,2.4);',
      '  \\draw[thick] (0,-2.4)--(0,2.4) (3,-2.4)--(3,2.4);',
      '  \\coordinate (A) at (-2,1.2); \\coordinate (H) at (0,1.2);',
      '  \\coordinate (E) at (0,-0.2); \\coordinate (F) at (3,-0.2);',
      '  \\coordinate (K) at (3,-1.4); \\coordinate (B) at (5,-1.4);',
      '  \\draw[very thick] (E)--(F);',
      '  \\draw (A)--(E) (F)--(B) (A)--(H) (B)--(K);',
      '  \\draw (0,0.95)--(-0.25,0.95)--(-0.25,1.2);',
      '  \\draw (3,-1.15)--(3.25,-1.15)--(3.25,-1.4);',
      '  \\node[left] at (A) {\\footnotesize $A$};',
      '  \\node[right] at (B) {\\footnotesize $B$};',
      '  \\node[above left] at (H) {\\footnotesize $H$};',
      '  \\node[below left] at (E) {\\footnotesize $E$};',
      '  \\node[above right] at (F) {\\footnotesize $F$};',
      '  \\node[below right] at (K) {\\footnotesize $K$};',
      '\\end{tikzpicture}',
      '\\end{center}',
    ];
  }

  // Function plot using standard TikZ (only added to preamble when plots exist)
  const { xMin, xMax, yMin, yMax, xTicks, yTicks, verticalAsymptote, obliqueAsymptote } = diagram;
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;
  const scale = Number(Math.min(6.0 / Math.max(1, xRange), 4.6 / Math.max(1, yRange)).toFixed(2));

  const lines: string[] = [
    '\\begin{center}',
    `\\begin{tikzpicture}[line join=round, line cap=round,>=stealth,thick,scale=${scale}]`,
    `\\draw[gray!20] (${xMin},${yMin}) grid (${xMax},${yMax});`,
    `\\draw[->] (${xMin},0)--(${xMax},0) node[below left] {$x$};`,
    `\\draw[->] (0,${yMin})--(0,${yMax}) node[below left] {$y$};`,
    '\\draw (0,0) node[below left] {\\footnotesize $O$};',
  ];

  const validXTicks = xTicks.filter((t) => t !== 0 && t > xMin && t < xMax);
  if (validXTicks.length > 0) {
    lines.push(
      `\\foreach \\x in {${validXTicks.join(',')}} \\draw[thin] (\\x,2pt)--(\\x,-2pt) node[below] {\\footnotesize $\\x$};`
    );
  }
  const validYTicks = yTicks.filter((t) => t !== 0 && t > yMin && t < yMax);
  if (validYTicks.length > 0) {
    lines.push(
      `\\foreach \\y in {${validYTicks.join(',')}} \\draw[thin] (2pt,\\y)--(-2pt,\\y) node[left] {\\footnotesize $\\y$};`
    );
  }

  lines.push('\\begin{scope}');
  lines.push(`\\clip (${xMin},${yMin}) rectangle (${xMax},${yMax});`);
  if (diagram.curveType === 'polyline' && diagram.points && diagram.points.length >= 2) {
    const coordStr = diagram.points.map(([px, py]) => `(${px},${py})`).join(' ');
    lines.push(`\\draw[blue,thick] plot coordinates{${coordStr}};`);
    if (diagram.highlightPoints && diagram.highlightPoints.length > 0) {
      diagram.highlightPoints.forEach((pt) => {
        const pos = pt.y >= 0 ? 'above' : 'below';
        const lbl = pt.label ? ` node[${pos}] {\\footnotesize $${pt.label}$}` : '';
        lines.push(`\\fill (${pt.x},${pt.y}) circle (1.5pt)${lbl};`);
      });
    }
  } else {
    const formula = buildTikzPlotFormula(diagram);
    const domains: Array<[number, number]> = [];
    if (verticalAsymptote !== undefined && verticalAsymptote > xMin && verticalAsymptote < xMax) {
      domains.push(...findSafePlotDomains(diagram, xMin, verticalAsymptote - 0.15));
      domains.push(...findSafePlotDomains(diagram, verticalAsymptote + 0.15, xMax));
    } else {
      domains.push(...findSafePlotDomains(diagram, xMin, xMax));
    }
    if (verticalAsymptote !== undefined) {
      lines.push(`\\draw[dashed] (${verticalAsymptote},${yMin})--(${verticalAsymptote},${yMax});`);
    }
    if (obliqueAsymptote) {
      lines.push(
        `\\draw[samples=40,domain=${xMin}:${xMax},dashed,variable=\\x] plot (\\x,{(${obliqueAsymptote.m})*(\\x)+(${obliqueAsymptote.q})});`
      );
    }
    domains.forEach(([d1, d2]) => {
      lines.push(
        `\\draw[samples=120,domain=${d1}:${d2},smooth,variable=\\x] plot (\\x,{${formula}});`
      );
    });
  }
  lines.push('\\end{scope}');
  lines.push('\\end{tikzpicture}');
  lines.push('\\end{center}');
  return lines;
}

function buildExamTexBody(exam: ExamPaper, includeSolutions: boolean): string[] {
  const mc = exam.questions.filter((q) => q.category === 'MC');
  const tf = exam.questions.filter((q) => q.category === 'TF');
  const sa = exam.questions.filter((q) => q.category === 'SA');
  const es = exam.questions.filter((q) => q.category === 'ES');

  const lines: string[] = [...buildExamHeaderTex(exam)];

  const appendSection = (title: string, items: ExamQuestionInstance[]) => {
    if (items.length === 0) return;
    lines.push(`\\section*{${escapePlainTex(title)}}`);
    items.forEach((q, idx) => {
      lines.push(
        `\\noindent\\textbf{Câu ${idx + 1}} (${q.points} điểm - \\textit{${escapePlainTex(q.level)}}). ${formatTexContent(q.content.stem)}`
      );
      if (q.content.diagram) {
        lines.push(...diagramToTexLines(q.content.diagram));
      }
      if (q.category === 'MC' && q.content.options) {
        lines.push('\\begin{multicols}{2}');
        lines.push('\\begin{enumerate}[label=\\textbf{\\Alph*.}, leftmargin=*, itemsep=0.25em]');
        q.content.options.forEach((opt) => lines.push(`  \\item ${formatTexContent(opt)}`));
        lines.push('\\end{enumerate}');
        lines.push('\\end{multicols}');
        lines.push('\\vspace{0.15cm}');
        lines.push('');
      } else if (q.category === 'TF' && q.content.tfStatements) {
        lines.push('\\begin{enumerate}[label=\\textbf{\\alph*)}, leftmargin=*, itemsep=0.25em]');
        q.content.tfStatements.forEach((st) => {
          lines.push(`  \\item ${formatTexContent(st.text)}`);
          if (st.diagram) lines.push(...diagramToTexLines(st.diagram));
        });
        lines.push('\\end{enumerate}');
        lines.push('\\vspace{0.15cm}');
        lines.push('');
      } else {
        // Explicit paragraph break so SA and ES questions always start on a new line
        lines.push('');
        lines.push('\\vspace{0.25cm}');
        lines.push('');
      }
    });
  };

  appendSection('PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn', mc);
  appendSection('PHẦN II. Câu trắc nghiệm đúng sai', tf);
  appendSection('PHẦN III. Câu trắc nghiệm trả lời ngắn', sa);
  appendSection('PHẦN IV. Phần tự luận', es);

  if (includeSolutions) {
    lines.push('\\newpage');
    lines.push(`\\section*{ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM --- MÃ ĐỀ ${escapePlainTex(exam.code)}}`);
    exam.questions.forEach((q, idx) => {
      const ans =
        q.category === 'MC'
          ? String.fromCharCode(65 + (q.content.correctIndex ?? 0))
          : formatTexAnswer(q.content.answerSummary);
      lines.push(
        `\\noindent\\textbf{Câu ${idx + 1} (${q.category} - ${q.points} điểm):} Đáp án: ${ans}.`
      );
      lines.push('\\begin{itemize}[leftmargin=*, itemsep=0.2em]');
      q.content.solutionSteps.forEach((step) => lines.push(`  \\item ${formatTexContent(step)}`));
      lines.push('\\end{itemize}');
      lines.push('');
    });
  }

  return lines;
}

function formatExTestSolutionLines(
  q: ExamQuestionInstance,
  includeAnswerSummary = false
): string[] {
  const steps = q.content.solutionSteps
    .map((step) => formatTexContent(step))
    .filter((s) => s.length > 0)
    .map((s) => `\\textbullet\\ ${s}`);

  if (includeAnswerSummary && q.content.answerSummary) {
    steps.push(`\\textit{Đáp số:} ${formatTexAnswer(q.content.answerSummary)}`);
  }

  if (steps.length === 0) return [];
  const out: string[] = ['\\loigiai{'];
  steps.forEach((step, idx) => {
    out.push(idx < steps.length - 1 ? `  ${step}\\\\` : `  ${step}`);
  });
  out.push('}');
  return out;
}

function buildExTestExamBody(
  exam: ExamPaper,
  includeSolutions: boolean,
  resetCounters = false
): string[] {
  const mc = exam.questions.filter((q) => q.category === 'MC');
  const tf = exam.questions.filter((q) => q.category === 'TF');
  const sa = exam.questions.filter((q) => q.category === 'SA');
  const es = exam.questions.filter((q) => q.category === 'ES');

  const safeCode = exam.code.replace(/[^A-Za-z0-9_-]/g, '') || '101';
  const lines: string[] = [];

  if (resetCounters) {
    lines.push('\\setcounter{ex}{0}');
  }

  lines.push(...buildExamHeaderTex(exam));
  lines.push(`\\Opensolutionfile{ans}[ans_${safeCode}]`);
  lines.push('');

  if (mc.length > 0) {
    lines.push(`\\section*{${escapePlainTex('PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn')}}`);
    lines.push('\\setcounter{ex}{0}');
    mc.forEach((q) => {
      lines.push('\\begin{ex}');
      lines.push(formatTexContent(q.content.stem));
      if (q.content.diagram) lines.push(...diagramToTexLines(q.content.diagram));
      if (q.content.options && q.content.options.length > 0) {
        lines.push('\\choice');
        const correctIdx = q.content.correctIndex ?? 0;
        q.content.options.forEach((opt, idx) => {
          const prefix = idx === correctIdx ? '\\True ' : '';
          lines.push(`{${prefix}${formatTexContent(opt)}}`);
        });
      }
      lines.push(...formatExTestSolutionLines(q, false));
      lines.push('\\end{ex}');
      lines.push('');
    });
  }

  if (tf.length > 0) {
    lines.push(`\\section*{${escapePlainTex('PHẦN II. Câu trắc nghiệm đúng sai')}}`);
    lines.push('\\setcounter{ex}{0}');
    tf.forEach((q) => {
      lines.push('\\begin{ex}');
      lines.push(formatTexContent(q.content.stem));
      if (q.content.diagram) lines.push(...diagramToTexLines(q.content.diagram));
      if (q.content.tfStatements && q.content.tfStatements.length > 0) {
        lines.push('\\choiceTF');
        q.content.tfStatements.forEach((st) => {
          const prefix = st.isTrue ? '\\True ' : '';
          if (st.diagram) {
            lines.push(`{${prefix}${formatTexContent(st.text)}`);
            lines.push(...diagramToTexLines(st.diagram));
            lines.push('}');
          } else {
            lines.push(`{${prefix}${formatTexContent(st.text)}}`);
          }
        });
      }
      lines.push(...formatExTestSolutionLines(q, false));
      lines.push('\\end{ex}');
      lines.push('');
    });
  }

  if (sa.length > 0) {
    lines.push(`\\section*{${escapePlainTex('PHẦN III. Câu trắc nghiệm trả lời ngắn')}}`);
    lines.push('\\setcounter{ex}{0}');
    sa.forEach((q) => {
      const saAns = formatTexAnswer(q.content.shortAnswer || q.content.answerSummary);
      lines.push('\\begin{ex}');
      lines.push(formatTexContent(q.content.stem));
      if (q.content.diagram) lines.push(...diagramToTexLines(q.content.diagram));
      lines.push(`\\shortans{${saAns}}`);
      lines.push(...formatExTestSolutionLines(q, false));
      lines.push('\\end{ex}');
      lines.push('');
    });
  }

  if (es.length > 0) {
    lines.push(`\\section*{${escapePlainTex('PHẦN IV. Phần tự luận')}}`);
    lines.push('\\setcounter{ex}{0}');
    es.forEach((q) => {
      lines.push('\\begin{ex}');
      lines.push(formatTexContent(q.content.stem));
      if (q.content.diagram) lines.push(...diagramToTexLines(q.content.diagram));
      lines.push(...formatExTestSolutionLines(q, true));
      lines.push('\\end{ex}');
      lines.push('');
    });
  }

  lines.push('\\Closesolutionfile{ans}');
  if (includeSolutions) {
    lines.push(
      `\\IfFileExists{ans_${safeCode}.tex}{\\ifdefined\\inputansbox\\subsection*{Bảng đáp án nhanh --- Mã đề ${escapePlainTex(exam.code)}}\\inputansbox{6}{ans_${safeCode}}\\fi}{}`
    );
  }
  lines.push('');

  return lines;
}

const TEX_PREAMBLE_BASE = [
  '\\documentclass[12pt,a4paper]{article}',
  '\\usepackage[utf8]{inputenc}',
  '\\usepackage[T5]{fontenc}',
  '\\usepackage[vietnamese]{babel}',
  '\\usepackage{amsmath,amssymb,geometry,enumitem,multicol}',
  '\\geometry{top=2cm,bottom=2cm,left=2cm,right=2cm}',
  '\\everymath{\\displaystyle}',
  '\\setlength{\\parindent}{0pt}',
  '\\setlength{\\parskip}{0.25em}',
  '\\setlength{\\columnsep}{0.8cm}',
];

function buildExTestPreamble(includeSolutions: boolean): string[] {
  const modeOpt = includeSolutions ? 'loigiai' : 'dethi';
  return [
    '\\documentclass[12pt,a4paper]{article}',
    '\\usepackage[utf8]{inputenc}',
    '\\usepackage[T5]{fontenc}',
    '\\usepackage[vietnamese]{babel}',
    '\\usepackage{amsmath,amssymb,geometry,multicol}',
    `\\usepackage[${modeOpt}]{ex_test}`,
    '\\geometry{top=2cm,bottom=2cm,left=2cm,right=2cm}',
    '\\everymath{\\displaystyle}',
    '\\setlength{\\parindent}{0pt}',
    '\\setlength{\\parskip}{0.25em}',
    '\\setlength{\\columnsep}{0.8cm}',
  ];
}

export function generateTexSource(
  exams: ExamPaper[],
  includeSolutions: boolean,
  format: TexExportFormat = 'amsmath'
): string {
  if (exams.length === 0) return '';
  const headerComment =
    exams.length === 1
      ? `% Đề thi sinh tự động từ EduMath 2018 (${format === 'ex_test' ? 'Chuẩn ex_test Việt Nam' : 'LaTeX chuẩn amsmath'})`
      : `% Bộ ${exams.length} đề thi sinh tự động từ EduMath 2018 (${format === 'ex_test' ? 'Chuẩn ex_test Việt Nam' : 'LaTeX chuẩn amsmath'})`;

  const isTikzKind = (d?: QuestionDiagramSpec) =>
    d?.kind === 'function_plot' || d?.kind === 'geometry_figure' || d?.kind === 'prob_tree';
  const hasTikzDiagram = exams.some((ex) =>
    ex.questions.some(
      (q) =>
        isTikzKind(q.content.diagram) ||
        q.content.tfStatements?.some((st) => isTikzKind(st.diagram))
    )
  );
  const basePreamble =
    format === 'ex_test' ? buildExTestPreamble(includeSolutions) : [...TEX_PREAMBLE_BASE];
  const preamble = hasTikzDiagram
    ? [
        ...basePreamble.slice(0, 5),
        '\\usepackage{tikz}',
        ...basePreamble.slice(5),
      ]
    : basePreamble;

  const lines: string[] = [headerComment, ...preamble, '', '\\begin{document}', ''];

  exams.forEach((exam, idx) => {
    if (idx > 0) lines.push('\\newpage');
    if (format === 'ex_test') {
      lines.push(...buildExTestExamBody(exam, includeSolutions, idx > 0));
    } else {
      lines.push(...buildExamTexBody(exam, includeSolutions));
    }
  });

  lines.push('\\end{document}');
  return lines.join('\n');
}

export function exportExamToTex(
  exam: ExamPaper,
  includeSolutions: boolean,
  format: TexExportFormat = 'amsmath'
) {
  const source = generateTexSource([exam], includeSolutions, format);
  const blob = new Blob([source], { type: 'application/x-tex;charset=utf-8' });
  const suffix = format === 'ex_test' ? '_ex_test' : '';
  triggerDownload(blob, `De_Thi_Toan_Ma_${exam.code}${suffix}.tex`);
}

export function exportAllExamsToTex(
  exams: ExamPaper[],
  includeSolutions: boolean,
  format: TexExportFormat = 'amsmath'
) {
  if (exams.length === 0) return;
  const source = generateTexSource(exams, includeSolutions, format);
  const blob = new Blob([source], { type: 'application/x-tex;charset=utf-8' });
  const suffix = format === 'ex_test' ? '_ex_test' : '';
  triggerDownload(blob, `Bo_${exams.length}_De_Thi_Toan${suffix}.tex`);
}

// =====================================================================
// 2. EXPORT WORD (.docx) — PRESERVING RAW LATEX INSIDE $...$
// =====================================================================
function getGeometryFigureDescription(gf: GeometryFigureDiagram): string {
  const figureMap: Record<GeometryFigureDiagram['figureType'], string> = {
    semicircle_rect: '[Hình minh họa: Hình bán nguyệt ghép hình chữ nhật]',
    box_cut: '[Hình minh họa: Tấm tôn hình chữ nhật cắt 4 góc tạo hộp không nắp]',
    river_bridge: '[Hình minh họa: Tuyến đường nối hai điểm qua cây cầu bắc vuông góc bờ sông]',
    square_box_cut: '[Hình minh họa: Tấm bìa hình vuông cắt 4 góc tạo hộp không nắp]',
    hexagon_pyramid_cut: '[Hình minh họa: Lục giác đều cắt 6 góc gấp thành hình chóp lục giác đều]',
    lantern_frame: '[Hình minh họa: Khung đèn lồng hình hộp đứng đáy vuông]',
    shore_island_path: '[Hình minh họa: Quãng đường bờ biển kết hợp đường thủy tới đảo]',
    power_island_path: '[Hình minh họa: Tuyến dây điện nối từ bờ biển ra đảo]',
    rect_pool_path: '[Hình minh họa: Đường đi ven bể bơi hình chữ nhật và đoạn cắt ngang]',
    two_poles_wire: '[Hình minh họa: Dây cáp nối đỉnh hai cột điện qua một điểm trên mặt đất]',
    trapezoid_square: '[Hình minh họa: Dây thép uốn thành hình vuông và hình thang cân]',
    semicircle_boat_path: '[Hình minh họa: Chuyển động kết hợp chèo thuyền và chạy bộ dọc nửa đường tròn]',
    ladder_wall_prop: '[Hình minh họa: Thang trượt tựa tường và mặt đất]',
    parabola_pond_bridge: '[Hình minh họa: Hai cung parabol thiết kế cầu nối trên mặt hồ]',
    box_3d: '[Hình minh họa 3D: Hình hộp]',
    reg_tetra_3d: '[Hình minh họa 3D: Tứ diện đều]',
    pyramid_perp_base_3d: '[Hình minh họa 3D: Hình chóp có cạnh bên vuông góc với đáy]',
    lamp_3cables_3d: '[Hình minh họa 3D: Đèn treo bởi ba dây cáp đối xứng]',
    crane_car_frame_3d: '[Hình minh họa 3D: Hệ cáp cẩu giữ khung xe]',
    chandelier_4chains_3d: '[Hình minh họa 3D: Đèn chùm treo bởi bốn dây xích]',
    three_perp_forces_3d: '[Hình minh họa 3D: Ba lực đôi một vuông góc tác dụng tại một điểm]',
    cuboid_axes_vertex_3d: '[Hình minh họa 3D: Hệ trục Oxyz gắn tại đỉnh hình hộp chữ nhật]',
    cube_axes_center_3d: '[Hình minh họa 3D: Hệ trục Oxyz gắn tại tâm hình lập phương]',
    airport_plane_3d: '[Hình minh họa 3D: Tọa độ máy bay cất cánh trong không gian Oxyz]',
    atc_radar_tower_3d: '[Hình minh họa 3D: Trạm kiểm soát không lưu Oxyz và máy bay]',
    grid_points_cone_3d: '[Hình minh họa 3D: Các điểm lưới trên hệ trục Oxyz]',
    cuboid_OABC_3d: '[Hình minh họa 3D: Hình hộp chữ nhật OABC.O\'A\'B\'C\' trong hệ Oxyz]',
    two_drones_3d: '[Hình minh họa 3D: Quỹ đạo hai thiết bị bay trong không gian Oxyz]',
    kingfisher_fish_3d: '[Hình minh họa 3D: Chuyển động chim bói cá và cá trong hệ Oxyz]',
    plane_flight_path_3d: '[Hình minh họa 3D: Đường bay thẳng giữa hai trạm rada trong hệ Oxyz]',
    l13_signed_area_plot: '[Hình minh họa: Miền phẳng giới hạn bởi đồ thị $y = f(x)$ và trục hoành trên đoạn $[a;b]$]',
    l13_two_parabolas_area: '[Hình minh họa: Miền phẳng giới hạn bởi hai đường parabol cắt nhau]',
    l13_parabola_line_area: '[Hình minh họa: Miền phẳng giới hạn bởi parabol và đường thẳng cắt nhau]',
    l13_curved_triangle: '[Hình minh họa: Miền phẳng tam giác cong giới hạn bởi parabol, đường thẳng và trục $Ox$]',
    l13_two_curves_H: '[Hình minh họa: Hình phẳng $H$ giới hạn bởi hai đường cong đối xứng và đoạn giới hạn]',
    l13_frustum_tank: '[Hình minh họa: Bể nước dạng chỏm/hình nón cụt đặt thẳng đứng]',
    l13_circle_two_parabolas: '[Hình minh họa: Hình tròn chia thành hai phần bởi hai cung parabol đối xứng]',
    l13_parabolic_gate_2cords: '[Hình minh họa: Cổng chào parabol chia thành phần tô màu và hai phần không tô]',
    l13_square_4parabolas_cut: '[Hình minh họa: Hình vuông cắt gọt bởi các cung parabol]',
    l13_square_4petals: '[Hình minh họa: Hoa văn bốn cánh đối xứng trong hình vuông tạo bởi các cung parabol]',
    l13_double_parabola_arch: '[Hình minh họa: Cổng vòm giới hạn bởi hai parabol đồng tâm lồng nhau]',
    l13_rect_inscribed_parabola: '[Hình minh họa: Hình chữ nhật có hai đường cong parabol đối xứng cắt hai cạnh]',
    l13_rect_two_side_parabolas: '[Hình minh họa: Hình chữ nhật với hai phần tô màu giới hạn bởi hai cung parabol hai bên]',
    l13_ellipse_two_parabolas: '[Hình minh họa: Hình elip kết hợp hai cung parabol đối xứng]',
    l13_vase_profile: '[Hình minh họa: Thiết diện bình gốm/lọ hoa xoay quanh trục $Ox$]',
    l14_stadium_frustum_3d: '[Hình minh họa 3D: Sân vận động hình chóp cụt $OAGD.BCFE$ gắn hệ trục $Oxyz$]',
    l14_trapezoid_yard_2d: '[Hình minh họa: Sân hình thang vuông $ABCD$ tại $A, B$ với kích thước các cạnh]',
    l14_camera_cone_3d: '[Hình minh họa 3D: Camera đặt tại $A$ chiếu thẳng xuống mặt phẳng $(P)$ tạo vùng quan sát hình tròn đường kính $BC$]',
    l14_museum_box_pane_3d: '[Hình minh họa 3D: Khung kính hình hộp chữ nhật $OABC.DEFG$ chứa tấm kính $OPFQ$]',
    l15_signal_line_3d: '[Hình minh họa 3D: Trạm phát tín hiệu $P$ và người cầm máy dò di chuyển dọc đường thẳng $d$]',
    l15_cube_two_ants_3d: '[Hình minh họa 3D: Hình lập phương $ABCD.A\'B\'C\'D\'$ và hai chú kiến chuyển động dọc đường chéo $AD\'$ và $DB$]',
    l17_earth_tangent_orbit_3d: '[Hình minh họa 3D: Mặt cầu Trái Đất tâm $O$, đường tròn vĩ tuyến và quỹ đạo tiếp tuyến $AM$ của tàu vũ trụ]',
    l11_b1_unit_circle_point: '[Hình minh họa: Đường tròn lượng giác trong mặt phẳng $Oxy$ đánh dấu điểm biểu diễn góc lượng giác]',
    l11_b1_unit_circle_axes: '[Hình minh họa: Đường tròn lượng giác trong mặt phẳng $Oxy$ với bốn điểm $A, A\', B, B\'$]',
    l11_b1_unit_circle_quad_sym: '[Hình minh họa: Đường tròn lượng giác trong mặt phẳng $Oxy$ với bốn điểm đối xứng $M, N, P, Q$]',
    l11_b10_tetra_3d: '[Hình minh họa 3D: Tứ diện với các điểm phụ trên cạnh]',
    l11_b10_para_pyramid_3d: '[Hình minh họa 3D: Hình chóp đáy hình bình hành]',
    l11_b10_quad_pyramid_3d: '[Hình minh họa 3D: Hình chóp tứ giác]',
    l11_b13_prism_3d: '[Hình minh họa 3D: Hình lăng trụ tam giác]',
    l11_b15_nested_squares: '[Hình minh họa: Chuỗi hình vuông lồng nhau vô hạn]',
    l11_b15_nested_triangles: '[Hình minh họa: Chuỗi tam giác đều nối trung điểm vô hạn]',
    l11_b15_nested_circles: '[Hình minh họa: Quy trình cắt các hình tròn chồng lên nhau vô hạn]',
    l11_b20_exp_log_plot: '[Hình minh họa: Đồ thị hàm số mũ / hàm số lôgarit trên hệ trục tọa độ $Oxy$]',
  };
  return figureMap[gf.figureType] ?? `[Hình minh họa: ${gf.figureType}]`;
}

export function buildExamDocxChildren(
  exam: ExamPaper,
  includeSolutions: boolean,
  startWithPageBreak = false
): (Paragraph | Table)[] {
  const mc = exam.questions.filter((q) => q.category === 'MC');
  const tf = exam.questions.filter((q) => q.category === 'TF');
  const sa = exam.questions.filter((q) => q.category === 'SA');
  const es = exam.questions.filter((q) => q.category === 'ES');

  const children: (Paragraph | Table)[] = [
    new Paragraph({
      pageBreakBefore: startWithPageBreak,
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: exam.schoolName.toUpperCase(), bold: true, size: 22 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: exam.title.toUpperCase(), bold: true, size: 28 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: `Môn: ${exam.subject} · ${exam.gradeLabel} · Thời gian: ${exam.durationMinutes} phút · Mã đề: ${exam.code}`,
          italics: true,
          size: 22,
        }),
      ],
    }),
  ];

  const addQuestionGroup = (heading: string, list: ExamQuestionInstance[]) => {
    if (list.length === 0) return;
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 220, after: 120 },
        children: [new TextRun({ text: heading, bold: true, size: 24 })],
      })
    );

    list.forEach((q, idx) => {
      children.push(
        new Paragraph({
          spacing: { before: 100, after: 60 },
          children: [
            new TextRun({ text: `Câu ${idx + 1} (${q.points} đ · ${q.level}): `, bold: true, size: 22 }),
            new TextRun({ text: formatWordLatexText(q.content.stem), size: 22 }),
          ],
        })
      );

      if (q.content.diagram?.kind === 'variation_table') {
        const vt = q.content.diagram;
        const n = vt.xNodes.length;
        const xRowCells = [
          '$x$',
          ...vt.xNodes.flatMap((xn, i) => (i < n - 1 ? [`$${xn}$`, ''] : [`$${xn}$`])),
        ];
        const derivRowCells = [`$${vt.derivLabel}$`];
        for (let i = 0; i < n; i++) {
          if (i === 0 || i === n - 1) derivRowCells.push('');
          else {
            const nt = vt.derivTokens[i * 2 - 1];
            derivRowCells.push(nt?.type === 'node' && nt.kind === 'd' ? '$||$' : '$0$');
          }
          if (i < n - 1) {
            const st = vt.derivTokens[i * 2];
            derivRowCells.push(
              st?.type === 'sign' ? (st.value === 'hatched' ? '///' : `$${st.value}$`) : ''
            );
          }
        }
        const vtRows: TableRow[] = [xRowCells, derivRowCells].map(
          (rowVals) =>
            new TableRow({
              children: rowVals.map(
                (val) =>
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: formatWordLatexText(val), size: 19 })],
                      }),
                    ],
                  })
              ),
            })
        );
        if (vt.yNodes && vt.funcLabel && vt.yNodes.length === n) {
          const yRowCells = [`$${vt.funcLabel}$`];
          for (let i = 0; i < n; i++) {
            const yn = vt.yNodes[i];
            yRowCells.push(
              yn.kind === 'asymptote' ? `$${yn.leftVal} \\parallel ${yn.rightVal}$` : `$${yn.value}$`
            );
            if (i < n - 1) {
              const st = vt.derivTokens[i * 2];
              yRowCells.push(
                st?.type === 'sign' && st.value === 'hatched'
                  ? '///'
                  : st?.type === 'sign' && st.value === '+'
                  ? '$\\nearrow$'
                  : '$\\searrow$'
              );
            }
          }
          vtRows.push(
            new TableRow({
              children: yRowCells.map(
                (val) =>
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [new TextRun({ text: formatWordLatexText(val), size: 19 })],
                      }),
                    ],
                  })
              ),
            })
          );
        }
        children.push(
          new Table({
            width: { size: 92, type: WidthType.PERCENTAGE },
            rows: vtRows,
          })
        );
      } else if (q.content.diagram?.kind === 'function_plot') {
        const fp = q.content.diagram;
        const ptsDesc =
          fp.curveType === 'polyline' && fp.points
            ? fp.points.map(([px, py]) => `$(${px};\\, ${py})$`).join(', ')
            : (fp.highlightPoints || []).map((pt) => `$(${pt.x};\\, ${pt.y})$`).join(', ');
        const obliqueOrHorizDesc = fp.obliqueAsymptote
          ? fp.obliqueAsymptote.m === 0
            ? `, TCN $y = ${fp.obliqueAsymptote.q}$`
            : `, TCX $y = ${fp.obliqueAsymptote.m === 1 ? '' : fp.obliqueAsymptote.m}x${fp.obliqueAsymptote.q === 0 ? '' : fp.obliqueAsymptote.q > 0 ? `+${fp.obliqueAsymptote.q}` : fp.obliqueAsymptote.q}$`
          : '';
        const asymDesc =
          fp.verticalAsymptote !== undefined
            ? ` (TCĐ $x = ${fp.verticalAsymptote}$${obliqueOrHorizDesc})`
            : '';
        children.push(
          new Paragraph({
            indent: { left: 360 },
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `[Đồ thị ${fp.curveLabel ? `$${fp.curveLabel}$` : 'hàm số'}${asymDesc}${ptsDesc ? `, các điểm đặc trưng: ${ptsDesc}` : ''}]`,
                italics: true,
                size: 20,
              }),
            ],
          })
        );
      } else if (q.content.diagram?.kind === 'geometry_figure') {
        const desc = getGeometryFigureDescription(q.content.diagram);
        children.push(
          new Paragraph({
            indent: { left: 360 },
            spacing: { after: 60 },
            children: [new TextRun({ text: desc, italics: true, size: 20 })],
          })
        );
      } else if (q.content.diagram?.kind === 'frequency_table') {
        const ft = q.content.diagram;
        const allRows = [
          [ft.row1Label, ...ft.intervals],
          [ft.row2Label, ...ft.frequencies.map((v) => String(v))],
          ...(ft.extraRows || []).map((r) => [r.label, ...r.values.map((v) => String(v))]),
        ];
        const ftRows = allRows.map(
          (rowVals, rIdx) =>
            new TableRow({
              children: rowVals.map(
                (val, cIdx) =>
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: cIdx === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
                        children: [new TextRun({ text: formatWordLatexText(val), bold: rIdx === 0 || cIdx === 0, size: 20 })],
                      }),
                    ],
                  })
              ),
            })
        );
        children.push(
          new Table({
            width: { size: 95, type: WidthType.PERCENTAGE },
            rows: ftRows,
          })
        );
      } else if (q.content.diagram?.kind === 'prob_tree') {
        const pt = q.content.diagram;
        const parts: string[] = [];
        if (pt.p1) parts.push(`$P(${pt.event1}) = ${pt.p1}$`);
        if (pt.p1Comp) parts.push(`$P(\\overline{${pt.event1}}) = ${pt.p1Comp}$`);
        if (pt.p2Given1) parts.push(`$P(${pt.event2}|${pt.event1}) = ${pt.p2Given1}$`);
        if (pt.p2CompGiven1) parts.push(`$P(\\overline{${pt.event2}}|${pt.event1}) = ${pt.p2CompGiven1}$`);
        if (pt.p2Given1Comp) parts.push(`$P(${pt.event2}|\\overline{${pt.event1}}) = ${pt.p2Given1Comp}$`);
        if (pt.p2CompGiven1Comp) parts.push(`$P(\\overline{${pt.event2}}|\\overline{${pt.event1}}) = ${pt.p2CompGiven1Comp}$`);
        children.push(
          new Paragraph({
            indent: { left: 360 },
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: formatWordLatexText(`[Sơ đồ cây biến cố $${pt.event1},\\, ${pt.event2}$: ${parts.join(', ')}]`),
                italics: true,
                size: 20,
              }),
            ],
          })
        );
      }

      if (q.category === 'MC' && q.content.options) {
        q.content.options.forEach((opt, oIdx) => {
          children.push(
            new Paragraph({
              indent: { left: 360 },
              spacing: { after: 40 },
              children: [
                new TextRun({ text: `${String.fromCharCode(65 + oIdx)}. `, bold: true, size: 21 }),
                new TextRun({ text: formatWordLatexText(opt), size: 21 }),
              ],
            })
          );
        });
      }

      if (q.category === 'TF' && q.content.tfStatements) {
        q.content.tfStatements.forEach((st) => {
          children.push(
            new Paragraph({
              indent: { left: 360 },
              spacing: { after: 40 },
              children: [
                new TextRun({ text: `${st.key}) `, bold: true, size: 21 }),
                new TextRun({ text: formatWordLatexText(st.text), size: 21 }),
              ],
            })
          );
          if (st.diagram?.kind === 'variation_table') {
            const vt = st.diagram;
            const n = vt.xNodes.length;
            const xRowCells = [
              '$x$',
              ...vt.xNodes.flatMap((xn, i) => (i < n - 1 ? [`$${xn}$`, ''] : [`$${xn}$`])),
            ];
            const derivRowCells = [`$${vt.derivLabel}$`];
            for (let i = 0; i < n; i++) {
              if (i === 0 || i === n - 1) derivRowCells.push('');
              else {
                const nt = vt.derivTokens[i * 2 - 1];
                derivRowCells.push(nt?.type === 'node' && nt.kind === 'd' ? '$||$' : '$0$');
              }
              if (i < n - 1) {
                const stTok = vt.derivTokens[i * 2];
                derivRowCells.push(stTok?.type === 'sign' ? `$${stTok.value}$` : '');
              }
            }
            const vtRows: TableRow[] = [xRowCells, derivRowCells].map(
              (rowVals) =>
                new TableRow({
                  children: rowVals.map(
                    (val) =>
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: formatWordLatexText(val), size: 19 })],
                          }),
                        ],
                      })
                  ),
                })
            );
            if (vt.yNodes && vt.funcLabel && vt.yNodes.length === n) {
              const yRowCells = [`$${vt.funcLabel}$`];
              for (let i = 0; i < n; i++) {
                const yn = vt.yNodes[i];
                yRowCells.push(
                  yn.kind === 'asymptote' ? `$${yn.leftVal} \\parallel ${yn.rightVal}$` : `$${yn.value}$`
                );
                if (i < n - 1) {
                  const stTok = vt.derivTokens[i * 2];
                  yRowCells.push(stTok?.type === 'sign' && stTok.value === '+' ? '$\\nearrow$' : '$\\searrow$');
                }
              }
              vtRows.push(
                new TableRow({
                  children: yRowCells.map(
                    (val) =>
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: formatWordLatexText(val), size: 19 })],
                          }),
                        ],
                      })
                  ),
                })
              );
            }
            children.push(
              new Table({
                width: { size: 88, type: WidthType.PERCENTAGE },
                rows: vtRows,
              })
            );
          } else if (st.diagram?.kind === 'function_plot') {
            const fp = st.diagram;
            const obliqueOrHorizDesc = fp.obliqueAsymptote
              ? fp.obliqueAsymptote.m === 0
                ? `, TCN $y = ${fp.obliqueAsymptote.q}$`
                : `, TCX $y = ${fp.obliqueAsymptote.m === 1 ? '' : fp.obliqueAsymptote.m}x${fp.obliqueAsymptote.q === 0 ? '' : fp.obliqueAsymptote.q > 0 ? `+${fp.obliqueAsymptote.q}` : fp.obliqueAsymptote.q}$`
              : '';
            const asymDesc =
              fp.verticalAsymptote !== undefined
                ? ` (TCĐ $x = ${fp.verticalAsymptote}$${obliqueOrHorizDesc})`
                : '';
            children.push(
              new Paragraph({
                indent: { left: 540 },
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: `[Đồ thị ${fp.curveLabel ? `$${fp.curveLabel}$` : 'hàm số'}${asymDesc}]`,
                    italics: true,
                    size: 19,
                  }),
                ],
              })
            );
          } else if (st.diagram?.kind === 'geometry_figure') {
            children.push(
              new Paragraph({
                indent: { left: 540 },
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: getGeometryFigureDescription(st.diagram),
                    italics: true,
                    size: 19,
                  }),
                ],
              })
            );
          }
        });
      }
    });
  };

  addQuestionGroup('PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN', mc);
  addQuestionGroup('PHẦN II. TRẮC NGHIỆM ĐÚNG - SAI', tf);
  addQuestionGroup('PHẦN III. TRẢ LỜI NGẮN', sa);
  addQuestionGroup('PHẦN IV. TỰ LUẬN', es);

  if (includeSolutions) {
    children.push(
      new Paragraph({
        pageBreakBefore: true,
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 140 },
        children: [
          new TextRun({
            text: `ĐÁP ÁN & HƯỚNG DẪN CHẤM CHI TIẾT — MÃ ĐỀ ${exam.code}`,
            bold: true,
            size: 26,
          }),
        ],
      })
    );

    const tableRows = [
      new TableRow({
        children: ['Câu', 'Dạng', 'Mức độ', 'Đáp án chuẩn', 'Điểm'].map(
          (h) =>
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })],
            })
        ),
      }),
      ...exam.questions.map((q, idx) => {
        const ans =
          q.category === 'MC'
            ? String.fromCharCode(65 + (q.content.correctIndex ?? 0))
            : formatWordLatexAnswer(q.content.answerSummary);
        return new TableRow({
          children: [`${idx + 1}`, q.category, q.level, ans, `${q.points}`].map(
            (val) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: val, size: 20 })] })],
              })
          ),
        });
      }),
    ];

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: tableRows,
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
          left: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
          right: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E1' },
          insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
          insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
        },
      })
    );

    exam.questions.forEach((q, idx) => {
      children.push(
        new Paragraph({
          spacing: { before: 140, after: 40 },
          children: [
            new TextRun({ text: `Hướng dẫn Câu ${idx + 1} (${q.category} · ${q.points}đ):`, bold: true, size: 21 }),
          ],
        })
      );
      q.content.solutionSteps.forEach((step) => {
        children.push(
          new Paragraph({
            indent: { left: 280 },
            spacing: { after: 30 },
            children: [
              new TextRun({ text: `• ${formatWordLatexText(step)}`, size: 20 }),
            ],
          })
        );
      });
    });
  }

  return children;
}

export async function exportExamToDocx(exam: ExamPaper, includeSolutions: boolean) {
  const children = buildExamDocxChildren(exam, includeSolutions, false);
  const doc = new Document({
    sections: [{ children }],
  });
  const blob = await Packer.toBlob(doc);
  triggerDownload(blob, `De_Thi_Toan_Ma_${exam.code}.docx`);
}

export async function exportAllExamsToDocx(exams: ExamPaper[], includeSolutions: boolean) {
  if (exams.length === 0) return;
  const children: (Paragraph | Table)[] = [];
  exams.forEach((exam, idx) => {
    children.push(...buildExamDocxChildren(exam, includeSolutions, idx > 0));
  });
  const doc = new Document({
    sections: [{ children }],
  });
  const blob = await Packer.toBlob(doc);
  triggerDownload(blob, `Bo_${exams.length}_De_Thi_Toan_LaTeX.docx`);
}

// =====================================================================
// 3. EXPORT PDF (.pdf) FROM A4 RENDERED DOM WITH SMART BLOCK PAGINATION
// =====================================================================
export async function exportElementToPdf(element: HTMLElement, filename: string) {
  const rootRect = element.getBoundingClientRect();
  const domWidth = rootRect.width || element.scrollWidth || 820;
  const domHeight = rootRect.height || element.scrollHeight || 1100;

  // Collect atomic block boundaries relative to element top so pages never slice mid-formula or duplicate lines
  const blockNodes = Array.from(element.querySelectorAll<HTMLElement>('[data-pdf-block]'));
  const blocks = blockNodes
    .map((node) => {
      const r = node.getBoundingClientRect();
      return {
        top: Math.max(0, r.top - rootRect.top),
        bottom: Math.min(domHeight, r.bottom - rootRect.top),
        isHeading: node.hasAttribute('data-pdf-heading'),
      };
    })
    .filter((b) => b.bottom > b.top + 2)
    .sort((a, b) => a.top - b.top);

  const sourceCanvas = await toCanvas(element, {
    quality: 0.98,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    style: {
      border: 'none',
      boxShadow: 'none',
    },
  });

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const marginX = 8;
  const marginTop = 8;
  const marginBottom = 11;
  const contentWidthMm = pageWidth - marginX * 2;
  const maxPageContentHeightMm = pageHeight - marginTop - marginBottom;
  const maxSliceDomH = (maxPageContentHeightMm * domWidth) / contentWidthMm;

  // Compute non-overlapping DOM Y-slices aligned to block boundaries
  const slices: Array<{ startY: number; endY: number }> = [];
  let curY = 0;

  while (curY < domHeight - 2) {
    const limitY = curY + maxSliceDomH;
    if (limitY >= domHeight - 2) {
      slices.push({ startY: curY, endY: domHeight });
      break;
    }

    let lastFitIdx = -1;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].bottom <= limitY && blocks[i].bottom > curY + 24) {
        lastFitIdx = i;
      }
    }

    // Avoid orphan section heading at the very bottom of a page
    if (
      lastFitIdx > 0 &&
      blocks[lastFitIdx].isHeading &&
      blocks[lastFitIdx - 1].bottom > curY + 24
    ) {
      lastFitIdx--;
    }

    let endY = limitY;
    if (lastFitIdx >= 0) {
      const fitBottom = blocks[lastFitIdx].bottom;
      const nextBlock = blocks[lastFitIdx + 1];
      const midpoint = nextBlock ? (fitBottom + nextBlock.top) / 2 : fitBottom + 4;
      endY = Math.min(limitY, Math.max(fitBottom + 1, midpoint));
    }

    if (endY <= curY + 10) {
      endY = Math.min(domHeight, limitY);
    }

    slices.push({ startY: curY, endY });
    curY = endY;
  }

  const scaleY = sourceCanvas.height / domHeight;
  const sliceCanvas = document.createElement('canvas');
  const ctx = sliceCanvas.getContext('2d');

  slices.forEach((slice, idx) => {
    const srcY = Math.max(0, Math.round(slice.startY * scaleY));
    const srcEnd = Math.min(sourceCanvas.height, Math.round(slice.endY * scaleY));
    const srcH = Math.max(1, srcEnd - srcY);

    sliceCanvas.width = sourceCanvas.width;
    sliceCanvas.height = srcH;

    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(
        sourceCanvas,
        0,
        srcY,
        sourceCanvas.width,
        srcH,
        0,
        0,
        sourceCanvas.width,
        srcH
      );
    }

    const sliceDataUrl = sliceCanvas.toDataURL('image/png');
    const sliceHeightMm = (srcH * contentWidthMm) / sourceCanvas.width;

    if (idx > 0) pdf.addPage();
    pdf.addImage(sliceDataUrl, 'PNG', marginX, marginTop, contentWidthMm, sliceHeightMm);

    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text(`Trang ${idx + 1}/${slices.length}`, pageWidth - marginX, pageHeight - 5, {
      align: 'right',
    });
  });

  pdf.save(filename);
}

// =====================================================================
// 4. EXPORT MATRIX & ANALYTICS TO CSV (EXCEL UTF-8 BOM)
// =====================================================================
export function exportRowsToCsv(headers: string[], rows: Array<Array<string | number>>, filename: string) {
  const escapeCell = (v: string | number) => {
    const s = String(v ?? '');
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  const csvContent =
    '\uFEFF' +
    [headers.map(escapeCell).join(','), ...rows.map((r) => r.map(escapeCell).join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, filename);
}

// =====================================================================
// 5. EXPORT CLASS COMPETENCY REPORT TO WORD (.docx)
// =====================================================================
export interface ClassReportExportPayload {
  className: string;
  teacherName: string;
  studentCount: number;
  avgScore: number;
  passRate: number;
  goodRate: number;
  topicStats: Array<{
    topic: string;
    attempts: number;
    avgPercent: number;
    statusLabel: string;
  }>;
  levelStats: Array<{ level: string; avgPercent: number }>;
  studentRows: Array<{
    code: string;
    name: string;
    latestScore: number;
    avgScore: number;
    weakestTopic: string;
    classification: string;
  }>;
}

export async function exportClassReportToDocx(report: ClassReportExportPayload) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: `BÁO CÁO CHI TIẾT NĂNG LỰC HỌC TẬP LỚP ${report.className}`,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 220 },
            children: [
              new TextRun({
                text: `Giáo viên phụ trách: ${report.teacherName} · Sĩ số có dữ liệu: ${report.studentCount} học sinh · Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`,
                italics: true,
                size: 21,
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
            children: [new TextRun({ text: 'I. TỔNG QUAN KẾT QUẢ LỚP HỌC', bold: true, size: 24 })],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: `Điểm trung bình chung (thang 10): ${report.avgScore.toFixed(2)} | Tỉ lệ đạt (>= 5.0): ${report.passRate.toFixed(1)}% | Tỉ lệ Khá - Giỏi (>= 8.0): ${report.goodRate.toFixed(1)}%`,
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
            children: [new TextRun({ text: 'II. MỨC ĐỘ ĐẠT THEO CHỦ ĐỀ KIẾN THỨC', bold: true, size: 24 })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: ['Chủ đề / Nội dung', 'Lượt đánh giá', 'Mức đạt (%)', 'Nhận xét'].map(
                  (h) =>
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })],
                    })
                ),
              }),
              ...report.topicStats.map(
                (t) =>
                  new TableRow({
                    children: [t.topic, `${t.attempts}`, `${t.avgPercent.toFixed(1)}%`, t.statusLabel].map(
                      (val) =>
                        new TableCell({
                          children: [new Paragraph({ children: [new TextRun({ text: val, size: 20 })] })],
                        })
                    ),
                  })
              ),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 100 },
            children: [new TextRun({ text: 'III. THỐNG KÊ TỪNG HỌC SINH', bold: true, size: 24 })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: ['Mã HS', 'Họ và tên', 'Điểm gần nhất', 'Điểm TB', 'Chủ đề cần củng cố', 'Xếp loại'].map(
                  (h) =>
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })],
                    })
                ),
              }),
              ...report.studentRows.map(
                (s) =>
                  new TableRow({
                    children: [
                      s.code,
                      s.name,
                      s.latestScore.toFixed(2),
                      s.avgScore.toFixed(2),
                      s.weakestTopic,
                      s.classification,
                    ].map(
                      (val) =>
                        new TableCell({
                          children: [new Paragraph({ children: [new TextRun({ text: val, size: 19 })] })],
                        })
                    ),
                  })
              ),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  triggerDownload(blob, `Bao_Cao_Nang_Luc_Lop_${report.className}.docx`);
}
