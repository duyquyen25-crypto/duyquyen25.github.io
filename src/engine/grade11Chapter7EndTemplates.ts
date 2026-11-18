import { MathTemplate } from '../types/math';
import { G11_C7_END_MC_TEMPLATES } from './grade11Chapter7EndMcTemplates';
import { G11_C7_END_TF_TEMPLATES } from './grade11Chapter7EndTfTemplates';

export const G11_C7_END_MC_LIST: MathTemplate[] = Object.values(G11_C7_END_MC_TEMPLATES);
export const G11_C7_END_TF_LIST: MathTemplate[] = Object.values(G11_C7_END_TF_TEMPLATES);

export const G11_C7_END_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_C7_END_MC_TEMPLATES,
  ...G11_C7_END_TF_TEMPLATES,
};
