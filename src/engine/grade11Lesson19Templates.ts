import { MathTemplate } from '../types/math';
import { G11_B19_MC_TEMPLATES } from './grade11Lesson19McTemplates';
import { G11_B19_TF_TEMPLATES } from './grade11Lesson19TfTemplates';
import { G11_B19_SA_TEMPLATES } from './grade11Lesson19SaTemplates';

export const G11_B19_MC_LIST: MathTemplate[] = Object.values(G11_B19_MC_TEMPLATES);
export const G11_B19_TF_LIST: MathTemplate[] = Object.values(G11_B19_TF_TEMPLATES);
export const G11_B19_SA_LIST: MathTemplate[] = Object.values(G11_B19_SA_TEMPLATES);

export const G11_B19_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B19_MC_TEMPLATES,
  ...G11_B19_TF_TEMPLATES,
  ...G11_B19_SA_TEMPLATES,
};
