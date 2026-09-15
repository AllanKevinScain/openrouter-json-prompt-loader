import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import type { TaskFormValues } from '../../schemas/task-form.schema';
import type { FreeModelOption } from '../../types/hooks/use-openrouter-models.type';
import { fetchPromptGeneration } from './fetch-openrouter';
import { prepareTaskInput } from './prepare-task-input';

export const useGeneratePrompt = (apiKey: string, model: FreeModelOption | undefined) => {
  const taskValuesRef = useRef<TaskFormValues | null>(null);

  const query = useQuery({
    queryKey: ['generate-prompt', model?.id],
    queryFn: async () => {
      if (!model) {
        throw new Error('Escolha um modelo gratuito compatível com JSON.');
      }
      if (!taskValuesRef.current) {
        throw new Error('Não há dados da tarefa para gerar o prompt.');
      }

      const taskInput = await prepareTaskInput(taskValuesRef.current);
      return fetchPromptGeneration(taskInput, apiKey, model);
    },
    enabled: false,
    retry: false,
  });

  const generate = (values: TaskFormValues) => {
    taskValuesRef.current = values;
    void query.refetch();
  };

  return { ...query, generate };
};
