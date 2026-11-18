import { MathTemplate } from '../types/math';
import { G11_B12_MC_TEMPLATES } from './grade11Lesson12McTemplates';
import { G11_B12_TF_TEMPLATES } from './grade11Lesson12TfTemplates';
import { G11_B12_SA_TEMPLATES } from './grade11Lesson12SaTemplates';

export const G11_B12_MC_LIST: MathTemplate[] = Object.values(G11_B12_MC_TEMPLATES);
export const G11_B12_TF_LIST: MathTemplate[] = Object.values(G11_B12_TF_TEMPLATES);
export const G11_B12_SA_LIST: MathTemplate[] = Object.values(G11_B12_SA_TEMPLATES);

export const G11_B12_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B12_MC_TEMPLATES,
  ...G11_B12_TF_TEMPLATES,
  ...G11_B12_SA_TEMPLATES,
};
