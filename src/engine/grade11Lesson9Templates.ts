import { MathTemplate } from '../types/math';
import { G11_B9_MC_TEMPLATES } from './grade11Lesson9McTemplates';
import { G11_B9_TF_TEMPLATES } from './grade11Lesson9TfTemplates';
import { G11_B9_SA_TEMPLATES } from './grade11Lesson9SaTemplates';

export const G11_B9_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B9_MC_TEMPLATES,
  ...G11_B9_TF_TEMPLATES,
  ...G11_B9_SA_TEMPLATES,
};

export const G11_B9_MC_LIST: MathTemplate[] = Object.values(G11_B9_MC_TEMPLATES);
export const G11_B9_TF_LIST: MathTemplate[] = Object.values(G11_B9_TF_TEMPLATES);
export const G11_B9_SA_LIST: MathTemplate[] = Object.values(G11_B9_SA_TEMPLATES);
