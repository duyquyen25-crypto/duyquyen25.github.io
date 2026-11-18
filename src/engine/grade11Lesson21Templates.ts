import { MathTemplate } from '../types/math';
import { G11_B21_MC_TEMPLATES } from './grade11Lesson21McTemplates';
import { G11_B21_TF_TEMPLATES } from './grade11Lesson21TfTemplates';
import { G11_B21_SA_TEMPLATES } from './grade11Lesson21SaTemplates';
import { G11_B21_ES_TEMPLATES } from './grade11Lesson21EsTemplates';

export const G11_B21_MC_LIST: MathTemplate[] = Object.values(G11_B21_MC_TEMPLATES);
export const G11_B21_TF_LIST: MathTemplate[] = Object.values(G11_B21_TF_TEMPLATES);
export const G11_B21_SA_LIST: MathTemplate[] = Object.values(G11_B21_SA_TEMPLATES);
export const G11_B21_ES_LIST: MathTemplate[] = Object.values(G11_B21_ES_TEMPLATES);

export const G11_B21_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B21_MC_TEMPLATES,
  ...G11_B21_TF_TEMPLATES,
  ...G11_B21_SA_TEMPLATES,
  ...G11_B21_ES_TEMPLATES,
};
