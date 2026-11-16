import { MathTemplate } from '../types/math';
import { G11_B3_MC_TEMPLATES } from './grade11Lesson3McTemplates';
import { G11_B3_TF_TEMPLATES } from './grade11Lesson3TfTemplates';
import { G11_B3_SA_TEMPLATES } from './grade11Lesson3SaTemplates';

export const G11_B3_MC_LIST: MathTemplate[] = Object.values(G11_B3_MC_TEMPLATES);
export const G11_B3_TF_LIST: MathTemplate[] = Object.values(G11_B3_TF_TEMPLATES);
export const G11_B3_SA_LIST: MathTemplate[] = Object.values(G11_B3_SA_TEMPLATES);

export const G11_B3_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B3_MC_TEMPLATES,
  ...G11_B3_TF_TEMPLATES,
  ...G11_B3_SA_TEMPLATES,
};
