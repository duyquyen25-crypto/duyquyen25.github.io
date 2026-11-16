import { MathTemplate } from '../types/math';
import { G12_B2_TEMPLATES_PART1 } from './grade12Lesson2TemplatesPart1';
import { G12_B2_TEMPLATES_PART2 } from './grade12Lesson2TemplatesPart2';

export const G12_B2_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B2_TEMPLATES_PART1,
  ...G12_B2_TEMPLATES_PART2,
};

// Ordered arrays matching exact order of the 32 questions (12 MC, 7 TF, 13 SA)
export const G12_B2_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B2_TEMPLATES_PART1);

export const G12_B2_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B2_TEMPLATES_PART2).filter(
  (t) => t.category === 'TF'
);

export const G12_B2_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B2_TEMPLATES_PART2).filter(
  (t) => t.category === 'SA'
);
