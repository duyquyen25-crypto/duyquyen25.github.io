import { MathTemplate } from '../types/math';
import { G11_B29_MC_PART1 } from './grade11Lesson29McPart1';
import { G11_B29_MC_PART2 } from './grade11Lesson29McPart2';

export const G11_B29_MC_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B29_MC_PART1,
  ...G11_B29_MC_PART2,
};
