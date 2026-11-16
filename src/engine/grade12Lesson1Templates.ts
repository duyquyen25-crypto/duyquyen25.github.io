import { MathTemplate } from '../types/math';
import { G12_B1_TEMPLATES_PART1 } from './grade12Lesson1TemplatesPart1';
import { G12_B1_TEMPLATES_PART2 } from './grade12Lesson1TemplatesPart2';

export const G12_B1_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B1_TEMPLATES_PART1,
  ...G12_B1_TEMPLATES_PART2,
};

// Ordered arrays matching exact order of the 44 questions (26 MC, 8 TF, 10 SA)
export const G12_B1_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B1_TEMPLATES_PART1);

export const G12_B1_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B1_TEMPLATES_PART2).filter(
  (t) => t.category === 'TF'
);

export const G12_B1_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B1_TEMPLATES_PART2).filter(
  (t) => t.category === 'SA'
);
