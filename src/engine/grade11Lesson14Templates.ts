import { MathTemplate } from '../types/math';
import { G11_B14_MC_TEMPLATES } from './grade11Lesson14McTemplates';
import { G11_B14_TF_TEMPLATES } from './grade11Lesson14TfTemplates';

export const G11_B14_MC_LIST: MathTemplate[] = Object.values(G11_B14_MC_TEMPLATES);
export const G11_B14_TF_LIST: MathTemplate[] = Object.values(G11_B14_TF_TEMPLATES);

export const G11_B14_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B14_MC_TEMPLATES,
  ...G11_B14_TF_TEMPLATES,
};
