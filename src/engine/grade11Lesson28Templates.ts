import { MathTemplate } from '../types/math';
import { G11_B28_MC_TEMPLATES } from './grade11Lesson28McTemplates';
import { G11_B28_TF_TEMPLATES } from './grade11Lesson28TfTemplates';

export const G11_B28_MC_LIST: MathTemplate[] = Object.values(G11_B28_MC_TEMPLATES);
export const G11_B28_TF_LIST: MathTemplate[] = Object.values(G11_B28_TF_TEMPLATES);

export const G11_B28_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B28_MC_TEMPLATES,
  ...G11_B28_TF_TEMPLATES,
};
