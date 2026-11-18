import { MathTemplate } from '../types/math';
import { G11_B10_MC_TEMPLATES } from './grade11Lesson10McTemplates';
import { G11_B10_TF_TEMPLATES } from './grade11Lesson10TfTemplates';
import { G11_B10_ES_TEMPLATES } from './grade11Lesson10EsTemplates';

export const G11_B10_MC_LIST: MathTemplate[] = Object.values(G11_B10_MC_TEMPLATES);
export const G11_B10_TF_LIST: MathTemplate[] = Object.values(G11_B10_TF_TEMPLATES);
export const G11_B10_ES_LIST: MathTemplate[] = Object.values(G11_B10_ES_TEMPLATES);

export const G11_B10_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_B10_MC_TEMPLATES,
  ...G11_B10_TF_TEMPLATES,
  ...G11_B10_ES_TEMPLATES,
};
