import { MathTemplate } from '../types/math';
import { G12_B18_MC_TEMPLATES } from './grade12Lesson18McTemplates';
import { G12_B18_TF_TEMPLATES } from './grade12Lesson18TfTemplates';
import { G12_B18_SA_TEMPLATES } from './grade12Lesson18SaTemplates';

export const G12_B18_MC_LIST: MathTemplate[] = Object.values(G12_B18_MC_TEMPLATES);
export const G12_B18_TF_LIST: MathTemplate[] = Object.values(G12_B18_TF_TEMPLATES);
export const G12_B18_SA_LIST: MathTemplate[] = Object.values(G12_B18_SA_TEMPLATES);

export const G12_B18_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B18_MC_TEMPLATES,
  ...G12_B18_TF_TEMPLATES,
  ...G12_B18_SA_TEMPLATES,
};
