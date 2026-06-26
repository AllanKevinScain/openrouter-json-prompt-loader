import { useMutation } from '@tanstack/react-query';
import { generatePrompt } from '../services/openRouter';

export const useGeneratePrompt = () => {
  return useMutation({
    mutationFn: generatePrompt,
  });
};
