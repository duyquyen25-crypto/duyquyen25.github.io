import { MathTemplate } from '../types/math';
import { G11_C6_END_MC_TEMPLATES } from './grade11Chapter6EndMcTemplates';
import { G11_C6_END_TF_TEMPLATES } from './grade11Chapter6EndTfTemplates';
import { G11_C6_END_SA_TEMPLATES } from './grade11Chapter6EndSaTemplates';

export const G11_C6_END_MC_LIST: MathTemplate[] = Object.values(G11_C6_END_MC_TEMPLATES);
export const G11_C6_END_TF_LIST: MathTemplate[] = Object.values(G11_C6_END_TF_TEMPLATES);
export const G11_C6_END_SA_LIST: MathTemplate[] = Object.values(G11_C6_END_SA_TEMPLATES);

export const G11_C6_END_TEMPLATES: Record<string, MathTemplate> = {
  ...G11_C6_END_MC_TEMPLATES,
  ...G11_C6_END_TF_TEMPLATES,
  ...G11_C6_END_SA_TEMPLATES,
};
