import { MathTemplate } from '../types/math';
import { G11_B6_MC_TEMPLATES } from './grade11Lesson6McTemplates';
import { G11_B6_TF_TEMPLATES } from './grade11Lesson6TfTemplates';
import { G11_B6_SA_TEMPLATES } from './grade11Lesson6SaTemplates';

export const G11_B6_MC_LIST: MathTemplate[] = Object.values(G11_B6_MC_TEMPLATES);
export const G11_B6_TF_LIST: MathTemplate[] = Object.values(G11_B6_TF_TEMPLATES);
export const G11_B6_SA_LIST: MathTemplate[] = Object.values(G11_B6_SA_TEMPLATES);

export const G11_B6_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B6_MC_TEMPLATES,
  ...G11_B6_TF_TEMPLATES,
  ...G11_B6_SA_TEMPLATES,
};
