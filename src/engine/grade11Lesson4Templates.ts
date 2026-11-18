import { MathTemplate } from '../types/math';
import { G11_B4_MC_TEMPLATES } from './grade11Lesson4McTemplates';
import { G11_B4_TF_TEMPLATES } from './grade11Lesson4TfTemplates';
import { G11_B4_SA_TEMPLATES } from './grade11Lesson4SaTemplates';

export const G11_B4_MC_LIST: MathTemplate[] = Object.values(G11_B4_MC_TEMPLATES);
export const G11_B4_TF_LIST: MathTemplate[] = Object.values(G11_B4_TF_TEMPLATES);
export const G11_B4_SA_LIST: MathTemplate[] = Object.values(G11_B4_SA_TEMPLATES);

export const G11_B4_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B4_MC_TEMPLATES,
  ...G11_B4_TF_TEMPLATES,
  ...G11_B4_SA_TEMPLATES,
};
