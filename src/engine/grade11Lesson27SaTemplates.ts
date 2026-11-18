import { MathTemplate } from '../types/math';
import { G11_B27_SA_PART1 } from './grade11Lesson27SaPart1';
import { G11_B27_SA_PART2 } from './grade11Lesson27SaPart2';

export const G11_B27_SA_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B27_SA_PART1,
  ...G11_B27_SA_PART2,
};
