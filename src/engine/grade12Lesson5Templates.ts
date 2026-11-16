import { MathTemplate } from '../types/math';
import { G12_B5_TEMPLATES_PART1 } from './grade12Lesson5TemplatesPart1';
import { G12_B5_TEMPLATES_PART2 } from './grade12Lesson5TemplatesPart2';

export const G12_B5_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B5_TEMPLATES_PART1,
  ...G12_B5_TEMPLATES_PART2,
};

// Ordered arrays matching exact order of the 54 questions (4 MC, 15 TF, 35 SA)
export const G12_B5_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B5_TEMPLATES_PART1).filter(
  (t) => t.category === 'MC'
);

export const G12_B5_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B5_TEMPLATES_PART1).filter(
  (t) => t.category === 'TF'
);

export const G12_B5_SA_TEMPLATES: MathTemplate[] = [
  ...Object.values(G12_B5_TEMPLATES_PART1).filter((t) => t.category === 'SA'),
  ...Object.values(G12_B5_TEMPLATES_PART2).filter((t) => t.category === 'SA'),
];
