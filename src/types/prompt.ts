export type PromptSpecification = {
  contexto: string;
  requisitos: string[];
  nao_requisitos: string[];
  criterios_aceite: string[];
  contrato: string;
  plano_teste: string[];
};

export type PromptGenerationResult = {
  specification: PromptSpecification;
  finalPrompt: string;
};

export type TaskFormValues = {
  taskDescription: string;
};
