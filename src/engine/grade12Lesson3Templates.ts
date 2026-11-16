import { MathTemplate } from '../types/math';
import { G12_B3_TEMPLATES_PART1 } from './grade12Lesson3TemplatesPart1';
import { G12_B3_TEMPLATES_PART2 } from './grade12Lesson3TemplatesPart2';

export const G12_B3_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B3_TEMPLATES_PART1,
  ...G12_B3_TEMPLATES_PART2,
};

// Ordered arrays matching exact order of the 31 questions (17 MC, 8 TF, 6 SA)
export const G12_B3_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B3_TEMPLATES_PART1);

export const G12_B3_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B3_TEMPLATES_PART2).filter(
  (t) => t.category === 'TF'
);

export const G12_B3_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B3_TEMPLATES_PART2).filter(
  (t) => t.category === 'SA'
);
