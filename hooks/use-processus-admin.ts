'use client'

import { ProcessusService } from '@/lib/services/processus-admin/processus-service';
import { AddQuizzDto, CreateProcessusDto, Processus } from '@/lib/types/processus-admin/processus-admin';
import useSWR from 'swr';

const PROCESSUS_KEY = 'processus';

export function useProcessus() {
  const { data: processus, error, mutate } = useSWR<Processus[]>(
    PROCESSUS_KEY,
    ProcessusService.getAll
  );

  const createProcessus = async (data: CreateProcessusDto) => {
    const newProcessus = await ProcessusService.create(data);
    mutate([...(processus || []), newProcessus]);
    return newProcessus;
  };

  const updateProcessus = async (id: string, data: Partial<Processus>) => {
    const updatedProcessus = await ProcessusService.update(id, data);
    mutate(
      processus?.map((p) => (p.id === id ? updatedProcessus : p))
    );
    return updatedProcessus;
  };

  const deleteProcessus = async (id: string) => {
    await ProcessusService.delete(id);
    mutate(processus?.filter((p) => p.id !== id));
  };

  const addQuizz = async (id: string, quizz: AddQuizzDto) => {
    await ProcessusService.addQuizz(id, quizz);
    // Optionally refetch the processus data after adding quiz
    mutate();
  };

  return {
    processus,
    isLoading: !error && !processus,
    isError: error,
    createProcessus,
    updateProcessus,
    deleteProcessus,
    addQuizz,
  };
}