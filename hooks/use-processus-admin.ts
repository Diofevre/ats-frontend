'use client'

import { ProcessusService } from '@/lib/services/processus-admin/processus-service';
import { AddQuizzDto, CreateProcessusDto, Processus, ProcessusDetail } from '@/lib/types/processus-admin/processus-admin';
import useSWR from 'swr';

const PROCESSUS_KEY = 'processus';
const PROCESSUS_DETAIL_KEY = 'processus-detail';

export function useProcessusById(id: string) {
  const { data, error } = useSWR<ProcessusDetail>(
    id ? `${PROCESSUS_DETAIL_KEY}-${id}` : null,
    () => ProcessusService.getById(id)
  );

  return {
    processusDetail: data,
    isLoading: !error && !data,
    isError: error
  };
}

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
    mutate();
  };

  const startProcessus = async (id: string) => {
    await ProcessusService.start(id);
    mutate();
  };

  const startInacheve = async (id: string) => {
    await ProcessusService.startInacheve(id);
    mutate();
  };

  const startForCandidat = async (id: string) => {
    await ProcessusService.startForCandidat(id);
    mutate();
  };

  const makeTop = async (id: string) => {
    await ProcessusService.makeTop(id);
    mutate();
  };

  const makeBottom = async (id: string) => {
    await ProcessusService.makeBottom(id);
    mutate();
  };

  const reverseOrder = async (id1: string, id2: string) => {
    await ProcessusService.reverseOrder(id1, id2);
    mutate();
  };

  const terminateProcessus = async (id: string) => {
    await ProcessusService.terminate(id);
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
    startProcessus,
    startInacheve,
    startForCandidat,
    makeTop,
    makeBottom,
    reverseOrder,
    terminateProcessus,
  };
}