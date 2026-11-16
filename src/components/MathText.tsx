import React, { useMemo } from 'react';
import katex from 'katex';
import { upgradeTopLevelFractions } from '../engine/mathUtils';

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Renders mixed Vietnamese prose and inline ($...$) or block ($$...$$) LaTeX expressions using KaTeX.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!text) return '';
    // Split by $$...$$ first, then $...$
    const segments = text.split(/(\$\$[\s\S]*?\$\$|\$(?:\\.|[^$])+\$)/g);
    return segments
      .map((seg) => {
        if (seg.startsWith('$$') && seg.endsWith('$$')) {
          const expr = seg.slice(2, -2).trim();
          try {
            return katex.renderToString(expr, { displayMode: true, throwOnError: false });
          } catch {
            return escapeHtml(seg);
          }
        }
        if (seg.startsWith('$') && seg.endsWith('$')) {
          const expr = upgradeTopLevelFractions(seg.slice(1, -1).trim());
          try {
            return katex.renderToString(expr, { displayMode: false, throwOnError: false });
          } catch {
            return escapeHtml(seg);
          }
        }
        return escapeHtml(seg);
      })
      .join('');
  }, [text]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br/>');
}
