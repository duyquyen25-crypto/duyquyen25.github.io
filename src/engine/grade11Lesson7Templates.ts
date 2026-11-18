import { MathTemplate } from '../types/math';
import { G11_B7_MC_TEMPLATES } from './grade11Lesson7McTemplates';
import { G11_B7_TF_TEMPLATES } from './grade11Lesson7TfTemplates';
import { G11_B7_SA_TEMPLATES } from './grade11Lesson7SaTemplates';

export const G11_B7_MC_LIST: MathTemplate[] = Object.values(G11_B7_MC_TEMPLATES);
export const G11_B7_TF_LIST: MathTemplate[] = Object.values(G11_B7_TF_TEMPLATES);
export const G11_B7_SA_LIST: MathTemplate[] = Object.values(G11_B7_SA_TEMPLATES);

export const G11_B7_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B7_MC_TEMPLATES,
  ...G11_B7_TF_TEMPLATES,
  ...G11_B7_SA_TEMPLATES,
};
