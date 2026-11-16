import { MathTemplate } from '../types/math';
import { G12_B11_MC_TEMPLATES as MC_RECORD } from './grade12Lesson11McTemplates';
import { G12_B11_TF_SA_TEMPLATES } from './grade12Lesson11TfSaTemplates';

export const G12_B11_TEMPLATES: Record<string, MathTemplate> = {
  ...MC_RECORD,
  ...G12_B11_TF_SA_TEMPLATES,
};

export const G12_B11_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B11_TEMPLATES).filter(
  (t) => t.category === 'MC'
);
export const G12_B11_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B11_TEMPLATES).filter(
  (t) => t.category === 'TF'
);
export const G12_B11_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B11_TEMPLATES).filter(
  (t) => t.category === 'SA'
);
