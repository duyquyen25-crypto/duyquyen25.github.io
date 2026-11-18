import { MathTemplate } from '../types/math';
import { G11_B26_SA_PART1 } from './grade11Lesson26SaPart1';
import { G11_B26_SA_PART2 } from './grade11Lesson26SaPart2';

export const G11_B26_SA_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B26_SA_PART1,
  ...G11_B26_SA_PART2,
};
