import { MathTemplate } from '../types/math';
import { G11_B26_MC_TEMPLATES } from './grade11Lesson26McTemplates';
import { G11_B26_TF_TEMPLATES } from './grade11Lesson26TfTemplates';
import { G11_B26_SA_TEMPLATES } from './grade11Lesson26SaTemplates';

export const G11_B26_MC_LIST: MathTemplate[] = Object.values(G11_B26_MC_TEMPLATES);
export const G11_B26_TF_LIST: MathTemplate[] = Object.values(G11_B26_TF_TEMPLATES);
export const G11_B26_SA_LIST: MathTemplate[] = Object.values(G11_B26_SA_TEMPLATES);

export const G11_B26_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B26_MC_TEMPLATES,
  ...G11_B26_TF_TEMPLATES,
  ...G11_B26_SA_TEMPLATES,
};
