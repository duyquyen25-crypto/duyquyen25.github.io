import { MathTemplate } from '../types/math';
import { G11_B30_MC_TEMPLATES } from './grade11Lesson30McTemplates';
import { G11_B30_TF_TEMPLATES } from './grade11Lesson30TfTemplates';
import { G11_B30_SA_TEMPLATES } from './grade11Lesson30SaTemplates';

export const G11_B30_MC_LIST: MathTemplate[] = Object.values(G11_B30_MC_TEMPLATES);
export const G11_B30_TF_LIST: MathTemplate[] = Object.values(G11_B30_TF_TEMPLATES);
export const G11_B30_SA_LIST: MathTemplate[] = Object.values(G11_B30_SA_TEMPLATES);

export const G11_B30_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B30_MC_TEMPLATES,
  ...G11_B30_TF_TEMPLATES,
  ...G11_B30_SA_TEMPLATES,
};
