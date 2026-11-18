import { MathTemplate } from '../types/math';
import { G11_B18_MC_TEMPLATES } from './grade11Lesson18McTemplates';
import { G11_B18_TF_TEMPLATES } from './grade11Lesson18TfTemplates';
import { G11_B18_SA_TEMPLATES } from './grade11Lesson18SaTemplates';

export const G11_B18_MC_LIST: MathTemplate[] = Object.values(G11_B18_MC_TEMPLATES);
export const G11_B18_TF_LIST: MathTemplate[] = Object.values(G11_B18_TF_TEMPLATES);
export const G11_B18_SA_LIST: MathTemplate[] = Object.values(G11_B18_SA_TEMPLATES);

export const G11_B18_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B18_MC_TEMPLATES,
  ...G11_B18_TF_TEMPLATES,
  ...G11_B18_SA_TEMPLATES,
};
