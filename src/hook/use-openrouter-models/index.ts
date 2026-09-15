import { useQuery } from '@tanstack/react-query';
import { fetchFreeModels } from './fetch-free-models';

export function useOpenRouterModels(apiKey: string) {
  return useQuery({
    queryKey: ['openrouter-free-models', apiKey],
    queryFn: () => fetchFreeModels(apiKey),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
