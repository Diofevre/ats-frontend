'use client'

import { offreService } from '@/lib/services/offres/offres';
import { Offres } from '@/lib/types/offre-details';
import useSWR from 'swr';

export function useOffresDetails(id: number) {
  const { data, error, isLoading, mutate } = useSWR<Offres>(
    id ? `offres/${id}/details` : null,
    () => offreService.getDetailsById(id)
  );

  return {
    offre: data,
    isLoading,
    isError: error,
    mutate,
  };
}