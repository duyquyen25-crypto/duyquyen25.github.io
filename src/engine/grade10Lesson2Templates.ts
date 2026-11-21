import { MathTemplate } from '../types/math';
import { G10_B2_MC_PART1_TEMPLATES } from './grade10Lesson2McPart1Templates';
import { G10_B2_MC_PART2_TEMPLATES } from './grade10Lesson2McPart2Templates';
import { G10_B2_TF_TEMPLATES } from './grade10Lesson2TfTemplates';
import { G10_B2_SA_TEMPLATES } from './grade10Lesson2SaTemplates';

export const G10_B2_MC_LIST: MathTemplate[] = [
  ...Object.values(G10_B2_MC_PART1_TEMPLATES),
  ...Object.values(G10_B2_MC_PART2_TEMPLATES),
];
export const G10_B2_TF_LIST: MathTemplate[] = Object.values(G10_B2_TF_TEMPLATES);
export const G10_B2_SA_LIST: MathTemplate[] = Object.values(G10_B2_SA_TEMPLATES);
