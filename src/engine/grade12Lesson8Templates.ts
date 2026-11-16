import { MathTemplate } from '../types/math';
import { G12_B8_PART1_TEMPLATES } from './grade12Lesson8TemplatesPart1';
import { G12_B8_PART2_TEMPLATES } from './grade12Lesson8TemplatesPart2';
import { G12_B8_PART3_TEMPLATES } from './grade12Lesson8TemplatesPart3';

export const G12_B8_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B8_PART1_TEMPLATES,
  ...G12_B8_PART2_TEMPLATES,
  ...G12_B8_PART3_TEMPLATES,
};

export const G12_B8_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B8_PART1_TEMPLATES);
export const G12_B8_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B8_PART2_TEMPLATES);
export const G12_B8_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B8_PART3_TEMPLATES);
