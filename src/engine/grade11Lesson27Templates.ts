import { MathTemplate } from '../types/math';
import { G11_B27_MC_TEMPLATES } from './grade11Lesson27McTemplates';
import { G11_B27_TF_TEMPLATES } from './grade11Lesson27TfTemplates';
import { G11_B27_SA_TEMPLATES } from './grade11Lesson27SaTemplates';

export const G11_B27_MC_LIST: MathTemplate[] = Object.values(G11_B27_MC_TEMPLATES);
export const G11_B27_TF_LIST: MathTemplate[] = Object.values(G11_B27_TF_TEMPLATES);
export const G11_B27_SA_LIST: MathTemplate[] = Object.values(G11_B27_SA_TEMPLATES);

export const G11_B27_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B27_MC_TEMPLATES,
  ...G11_B27_TF_TEMPLATES,
  ...G11_B27_SA_TEMPLATES,
};
