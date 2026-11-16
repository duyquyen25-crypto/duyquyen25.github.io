import { G12_B14_MC_TEMPLATES } from './grade12Lesson14McTemplates';
import { G12_B14_TF_TEMPLATES } from './grade12Lesson14TfTemplates';
import { G12_B14_SA_TEMPLATES } from './grade12Lesson14SaTemplates';

export const G12_B14_MC_LIST = Object.values(G12_B14_MC_TEMPLATES);
export const G12_B14_TF_LIST = Object.values(G12_B14_TF_TEMPLATES);
export const G12_B14_SA_LIST = Object.values(G12_B14_SA_TEMPLATES);

export const G12_B14_TEMPLATES = {
  ...G12_B14_MC_TEMPLATES,
  ...G12_B14_TF_TEMPLATES,
  ...G12_B14_SA_TEMPLATES,
};
