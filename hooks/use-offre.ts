'use client'

import { offreService } from '@/lib/services/offres/offres';
import { Offre } from '@/lib/types/offres/offres.type';
import useSWR from 'swr';

export function useOffres() {
  const { data, error, isLoading, mutate } = useSWR<Offre[]>(
    'offres',
    offreService.getAll
  );

  return {
    offres: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useOffre(id: number) {
  const { data, error, isLoading, mutate } = useSWR<Offre>(
    id ? `offres/${id}` : null,
    () => offreService.getById(id)
  );

  return {
    offre: data,
    isLoading,
    isError: error,
    mutate,
  };
}