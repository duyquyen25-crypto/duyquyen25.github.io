import { MathTemplate } from '../types/math';
import { G11_B24_MC_TEMPLATES } from './grade11Lesson24McTemplates';
import { G11_B24_TF_TEMPLATES } from './grade11Lesson24TfTemplates';
import { G11_B24_SA_TEMPLATES } from './grade11Lesson24SaTemplates';

export const G11_B24_MC_LIST: MathTemplate[] = Object.values(G11_B24_MC_TEMPLATES);
export const G11_B24_TF_LIST: MathTemplate[] = Object.values(G11_B24_TF_TEMPLATES);
export const G11_B24_SA_LIST: MathTemplate[] = Object.values(G11_B24_SA_TEMPLATES);

export const G11_B24_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B24_MC_TEMPLATES,
  ...G11_B24_TF_TEMPLATES,
  ...G11_B24_SA_TEMPLATES,
};
