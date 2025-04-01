'use client'

import { offreService } from '@/lib/services/offres/offres';
import { CreateOffreDto, Offre } from '@/lib/types/offres/offres.type';
import { useState } from 'react';
import useSWR from 'swr';
import { useAuth } from './use-auth';

export function useOffres() {
  const [isLoadings, setIsLoadings] = useState(false);
  const [errors, setErrors] = useState<Error | null>(null);
  const { token } = useAuth();

  const { data, error, isLoading, mutate } = useSWR<Offre[]>(
    'offres',
    offreService.getAll
  );

  const createOffre = async (data: CreateOffreDto): Promise<Offre> => {
    setIsLoadings(true);
    setErrors(null);
    try {
      const result = await offreService.create(data, token);
      return result;
    } catch (err) {
      setErrors(err as Error);
      throw err;
    } finally {
      setIsLoadings(false);
    }
  };

  return {
    createOffre,
    offres: data,
    isLoading,
    isLoadings,
    isError: error,
    mutate,
    errors,
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