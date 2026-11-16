import { MathTemplate } from '../types/math';
import { G12_B13_MC_TEMPLATES as G12_B13_MC_RECORD } from './grade12Lesson13McTemplates';
import { G12_B13_TF_TEMPLATES as G12_B13_TF_RECORD } from './grade12Lesson13TfTemplates';
import { G12_B13_SA_TEMPLATES as G12_B13_SA_RECORD } from './grade12Lesson13SaTemplates';

export const G12_B13_TEMPLATES: Record<string, MathTemplate> = {
  ...G12_B13_MC_RECORD,
  ...G12_B13_TF_RECORD,
  ...G12_B13_SA_RECORD,
};

export const G12_B13_MC_TEMPLATES: MathTemplate[] = Object.values(G12_B13_MC_RECORD);
export const G12_B13_TF_TEMPLATES: MathTemplate[] = Object.values(G12_B13_TF_RECORD);
export const G12_B13_SA_TEMPLATES: MathTemplate[] = Object.values(G12_B13_SA_RECORD);
