import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { DEFAULT_OPENROUTER_MODEL_ID } from '../../constants/openrouter-models';
import { fetchPromptGeneration } from './fetch-openrouter';

export const useGeneratePrompt = (model: string = DEFAULT_OPENROUTER_MODEL_ID) => {
  const taskDescriptionRef = useRef('');

  const query = useQuery({
    queryKey: ['generate-prompt', model],
    queryFn: () => fetchPromptGeneration(taskDescriptionRef.current, model),
    enabled: false,
    retry: false,
  });

  const generate = (taskDescription: string) => {
    taskDescriptionRef.current = taskDescription;
    void query.refetch();
  };

  return { ...query, generate };
};
