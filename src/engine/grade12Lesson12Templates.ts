import { MathTemplate } from '../types/math';
import { G12_B12_MC_TEMPLATES as MC_RECORD } from './grade12Lesson12McTemplates';
import { G12_B12_TF_SA_TEMPLATES } from './grade12Lesson12TfSaTemplates';

export const G12_B12_TEMPLATES: Record<string, MathTemplate> = {
  ...MC_RECORD,
  ...G12_B12_TF_SA_TEMPLATES,
};

export const G12_B12_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B12_TEMPLATES).filter(
  (t) => t.category === 'MC'
);
export const G12_B12_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B12_TEMPLATES).filter(
  (t) => t.category === 'TF'
);
export const G12_B12_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B12_TEMPLATES).filter(
  (t) => t.category === 'SA'
);
