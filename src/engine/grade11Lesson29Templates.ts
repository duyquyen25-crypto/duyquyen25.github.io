import { MathTemplate } from '../types/math';
import { G11_B29_MC_TEMPLATES } from './grade11Lesson29McTemplates';
import { G11_B29_TF_TEMPLATES } from './grade11Lesson29TfTemplates';
import { G11_B29_SA_TEMPLATES } from './grade11Lesson29SaTemplates';
import { G11_B29_ADD_MC_TEMPLATES } from './grade11Lesson29AddMcTemplates';
import { G11_B29_ADD_TF_TEMPLATES } from './grade11Lesson29AddTfTemplates';
import { G11_B29_ADD_SA_PART1 } from './grade11Lesson29AddSaPart1';
import { G11_B29_ADD_SA_PART2 } from './grade11Lesson29AddSaPart2';

export const G11_B29_MC_LIST: MathTemplate[] = [
  ...Object.values(G11_B29_ADD_MC_TEMPLATES),
  ...Object.values(G11_B29_MC_TEMPLATES),
];
export const G11_B29_TF_LIST: MathTemplate[] = [
  ...Object.values(G11_B29_ADD_TF_TEMPLATES),
  ...Object.values(G11_B29_TF_TEMPLATES),
];
export const G11_B29_SA_LIST: MathTemplate[] = [
  ...Object.values(G11_B29_ADD_SA_PART1),
  ...Object.values(G11_B29_ADD_SA_PART2),
  ...Object.values(G11_B29_SA_TEMPLATES),
];

export const G11_B29_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B29_ADD_MC_TEMPLATES,
  ...G11_B29_ADD_TF_TEMPLATES,
  ...G11_B29_ADD_SA_PART1,
  ...G11_B29_ADD_SA_PART2,
  ...G11_B29_MC_TEMPLATES,
  ...G11_B29_TF_TEMPLATES,
  ...G11_B29_SA_TEMPLATES,
};
