'use client'

import { Reponse, CreateReponseDto, UpdateReponseDto } from '@/lib/types/question-reponse-admin';
import { reponseService } from '@/lib/services/question-response-admin/reponseService';
import useSWR from 'swr';
import { useCallback } from 'react';

export const useReponses = (questionId: number) => {
  const {
    data: reponses,
    error,
    isLoading,
    mutate
  } = useSWR<Reponse[]>(
    questionId ? `/api/questions/${questionId}/reponses` : null,
    () => reponseService.getByQuestion(questionId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0
    }
  );

  const fetchReponses = useCallback(async () => {
    try {
      const data = await reponseService.getByQuestion(questionId);
      await mutate(data, false);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred');
    }
  }, [questionId, mutate]);

  const createReponse = async (data: CreateReponseDto) => {
    try {
      const newReponse = await reponseService.create(data);
      await mutate(
        reponses ? [...reponses, newReponse] : [newReponse],
        false
      );
      return newReponse;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create response');
    }
  };

  const updateReponse = async (id: number, data: UpdateReponseDto) => {
    try {
      const updatedReponse = await reponseService.update(id, data);
      await mutate(
        reponses?.map(r => r.id === id ? updatedReponse : r),
        false
      );
      return updatedReponse;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update response');
    }
  };

  const deleteReponse = async (id: number) => {
    try {
      await reponseService.delete(id);
      await mutate(
        reponses?.filter(r => r.id !== id),
        false
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete response');
    }
  };

  return {
    reponses: reponses || [],
    loading: isLoading,
    error: error?.message || null,
    fetchReponses,
    createReponse,
    updateReponse,
    deleteReponse,
    mutate
  };
};