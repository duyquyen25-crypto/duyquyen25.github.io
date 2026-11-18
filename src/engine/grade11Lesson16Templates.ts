import { MathTemplate } from '../types/math';
import { G11_B16_MC_TEMPLATES } from './grade11Lesson16McTemplates';
import { G11_B16_TF_TEMPLATES } from './grade11Lesson16TfTemplates';
import { G11_B16_SA_TEMPLATES } from './grade11Lesson16SaTemplates';

export const G11_B16_MC_LIST: MathTemplate[] = Object.values(G11_B16_MC_TEMPLATES);
export const G11_B16_TF_LIST: MathTemplate[] = Object.values(G11_B16_TF_TEMPLATES);
export const G11_B16_SA_LIST: MathTemplate[] = Object.values(G11_B16_SA_TEMPLATES);

export const G11_B16_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B16_MC_TEMPLATES,
  ...G11_B16_TF_TEMPLATES,
  ...G11_B16_SA_TEMPLATES,
};
