import { MathTemplate } from '../types/math';
import { G11_B32_MC_PART1 } from './grade11Lesson32McPart1';
import { G11_B32_MC_PART2 } from './grade11Lesson32McPart2';
import { G11_B32_MC_PART3 } from './grade11Lesson32McPart3';
import { G11_B32_MC_PART4 } from './grade11Lesson32McPart4';
import { G11_B32_SA_PART1 } from './grade11Lesson32SaPart1';
import { G11_B32_SA_PART2 } from './grade11Lesson32SaPart2';
import { G11_B32_ES_TEMPLATES } from './grade11Lesson32EsTemplates';

export const G11_B32_MC_LIST: MathTemplate[] = [
  ...Object.values(G11_B32_MC_PART1),
  ...Object.values(G11_B32_MC_PART2),
  ...Object.values(G11_B32_MC_PART3),
  ...Object.values(G11_B32_MC_PART4),
];

export const G11_B32_SA_LIST: MathTemplate[] = [
  ...Object.values(G11_B32_SA_PART1),
  ...Object.values(G11_B32_SA_PART2),
];

export const G11_B32_ES_LIST: MathTemplate[] = Object.values(G11_B32_ES_TEMPLATES);

export const G11_B32_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B32_MC_PART1,
  ...G11_B32_MC_PART2,
  ...G11_B32_MC_PART3,
  ...G11_B32_MC_PART4,
  ...G11_B32_SA_PART1,
  ...G11_B32_SA_PART2,
  ...G11_B32_ES_TEMPLATES,
};
