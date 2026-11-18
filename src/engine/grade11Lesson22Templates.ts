import { MathTemplate } from '../types/math';
import { G11_B22_MC_TEMPLATES } from './grade11Lesson22McTemplates';
import { G11_B22_TF_TEMPLATES } from './grade11Lesson22TfTemplates';

export const G11_B22_MC_LIST: MathTemplate[] = Object.values(G11_B22_MC_TEMPLATES);
export const G11_B22_TF_LIST: MathTemplate[] = Object.values(G11_B22_TF_TEMPLATES);

export const G11_B22_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B22_MC_TEMPLATES,
  ...G11_B22_TF_TEMPLATES,
};
