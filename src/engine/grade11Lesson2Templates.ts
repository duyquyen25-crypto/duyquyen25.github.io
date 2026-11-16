import { MathTemplate } from '../types/math';
import { G11_B2_MC_TEMPLATES } from './grade11Lesson2McTemplates';
import { G11_B2_TF_TEMPLATES } from './grade11Lesson2TfTemplates';
import { G11_B2_SA_TEMPLATES } from './grade11Lesson2SaTemplates';

export const G11_B2_MC_LIST: MathTemplate[] = Object.values(G11_B2_MC_TEMPLATES);
export const G11_B2_TF_LIST: MathTemplate[] = Object.values(G11_B2_TF_TEMPLATES);
export const G11_B2_SA_LIST: MathTemplate[] = Object.values(G11_B2_SA_TEMPLATES);

export const G11_B2_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B2_MC_TEMPLATES,
  ...G11_B2_TF_TEMPLATES,
  ...G11_B2_SA_TEMPLATES,
};
