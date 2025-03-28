'use client'

import { ProcessusService } from '@/lib/services/processus/processus';
import { Processus } from '@/lib/types/processus/processus';
import useSWR from 'swr';

export function useProcessus() {
  const { data, error, isLoading, mutate } = useSWR<Processus[]>(
    '/processus',
    ProcessusService.getAll
  );

  return {
    processus: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useProcessusById(id: number) {
  const { data, error, isLoading, mutate } = useSWR<Processus>(
    id ? `/processus/${id}` : null,
    () => ProcessusService.getById(id)
  );

  return {
    processus: data,
    isLoading,
    isError: error,
    mutate,
  };
}