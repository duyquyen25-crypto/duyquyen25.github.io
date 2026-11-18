import { MathTemplate } from '../types/math';
import { G11_B11_MC_TEMPLATES } from './grade11Lesson11McTemplates';
import { G11_B11_TF_TEMPLATES } from './grade11Lesson11TfTemplates';

export const G11_B11_MC_LIST: MathTemplate[] = Object.values(G11_B11_MC_TEMPLATES);
export const G11_B11_TF_LIST: MathTemplate[] = Object.values(G11_B11_TF_TEMPLATES);

export const G11_B11_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B11_MC_TEMPLATES,
  ...G11_B11_TF_TEMPLATES,
};
