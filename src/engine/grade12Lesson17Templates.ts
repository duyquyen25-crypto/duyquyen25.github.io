import { MathTemplate } from '../types/math';
import { G12_B17_MC_TEMPLATES } from './grade12Lesson17McTemplates';
import { G12_B17_TF_TEMPLATES } from './grade12Lesson17TfTemplates';
import { G12_B17_SA_TEMPLATES } from './grade12Lesson17SaTemplates';

export const G12_B17_MC_LIST: MathTemplate[] = Object.values(G12_B17_MC_TEMPLATES);
export const G12_B17_TF_LIST: MathTemplate[] = Object.values(G12_B17_TF_TEMPLATES);
export const G12_B17_SA_LIST: MathTemplate[] = Object.values(G12_B17_SA_TEMPLATES);

export const G12_B17_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B17_MC_TEMPLATES,
  ...G12_B17_TF_TEMPLATES,
  ...G12_B17_SA_TEMPLATES,
};
