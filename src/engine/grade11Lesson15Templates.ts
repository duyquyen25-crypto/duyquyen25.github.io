import { MathTemplate } from '../types/math';
import { G11_B15_MC_TEMPLATES } from './grade11Lesson15McTemplates';
import { G11_B15_TF_TEMPLATES } from './grade11Lesson15TfTemplates';
import { G11_B15_SA_TEMPLATES } from './grade11Lesson15SaTemplates';

export const G11_B15_MC_LIST: MathTemplate[] = Object.values(G11_B15_MC_TEMPLATES);
export const G11_B15_TF_LIST: MathTemplate[] = Object.values(G11_B15_TF_TEMPLATES);
export const G11_B15_SA_LIST: MathTemplate[] = Object.values(G11_B15_SA_TEMPLATES);

export const G11_B15_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B15_MC_TEMPLATES,
  ...G11_B15_TF_TEMPLATES,
  ...G11_B15_SA_TEMPLATES,
};
