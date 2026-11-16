import { MathTemplate } from '../types/math';
import { G12_B4_TEMPLATES_PART1 } from './grade12Lesson4TemplatesPart1';
import { G12_B4_TEMPLATES_PART2 } from './grade12Lesson4TemplatesPart2';

export const G12_B4_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B4_TEMPLATES_PART1,
  ...G12_B4_TEMPLATES_PART2,
};

// Ordered arrays matching exact order of the 26 questions (12 MC, 7 TF, 7 SA)
export const G12_B4_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B4_TEMPLATES_PART1);

export const G12_B4_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B4_TEMPLATES_PART2).filter(
  (t) => t.category === 'TF'
);

export const G12_B4_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B4_TEMPLATES_PART2).filter(
  (t) => t.category === 'SA'
);
