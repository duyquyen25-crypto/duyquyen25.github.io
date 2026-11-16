import { G12_B15_MC_TEMPLATES } from './grade12Lesson15McTemplates';
import { G12_B15_TF_TEMPLATES } from './grade12Lesson15TfTemplates';
import { G12_B15_SA_TEMPLATES } from './grade12Lesson15SaTemplates';

export const G12_B15_MC_LIST = Object.values(G12_B15_MC_TEMPLATES);
export const G12_B15_TF_LIST = Object.values(G12_B15_TF_TEMPLATES);
export const G12_B15_SA_LIST = Object.values(G12_B15_SA_TEMPLATES);

export const G12_B15_TEMPLATES = {
  ...G12_B15_MC_TEMPLATES,
  ...G12_B15_TF_TEMPLATES,
  ...G12_B15_SA_TEMPLATES,
};
