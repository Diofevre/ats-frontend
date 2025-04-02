import { offreService } from '@/lib/services/offres/offres';
import { Offres } from '@/lib/types/offre-details';
import useSWR from 'swr';

export function useOffresDetails(id: number) {
  const { data, error, isLoading, mutate } = useSWR<Offres>(
    id ? `offres/${id}/details` : null,
    async () => {
      try {
        return await offreService.getDetailsById(id);
      } catch (error) {
        // Transform error to be more user-friendly
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch offer details');
      }
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    offre: data,
    isLoading,
    isError: error instanceof Error ? error.message : error,
    mutate,
  };
}