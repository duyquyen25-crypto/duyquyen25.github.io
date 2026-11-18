import { MathTemplate } from '../types/math';
import { G11_B20_MC_TEMPLATES } from './grade11Lesson20McTemplates';
import { G11_B20_TF_TEMPLATES } from './grade11Lesson20TfTemplates';
import { G11_B20_SA_TEMPLATES } from './grade11Lesson20SaTemplates';

export const G11_B20_MC_LIST: MathTemplate[] = Object.values(G11_B20_MC_TEMPLATES);
export const G11_B20_TF_LIST: MathTemplate[] = Object.values(G11_B20_TF_TEMPLATES);
export const G11_B20_SA_LIST: MathTemplate[] = Object.values(G11_B20_SA_TEMPLATES);

export const G11_B20_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B20_MC_TEMPLATES,
  ...G11_B20_TF_TEMPLATES,
  ...G11_B20_SA_TEMPLATES,
};
