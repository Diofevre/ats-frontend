'use client'

import { Question, CreateQuestionDto, UpdateQuestionDto } from '@/lib/types/question-reponse-admin';
import { questionService } from '@/lib/services/question-response-admin/questionService';
import useSWR from 'swr';
import { useCallback } from 'react';

export const useQuestions = (processusId: number) => {
  const {
    data: questions,
    error,
    isLoading,
    mutate
  } = useSWR<Question[]>(
    processusId ? `/api/processus/${processusId}/questions` : null,
    () => questionService.getByProcessus(processusId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0
    }
  );

  const fetchQuestions = useCallback(async () => {
    try {
      const data = await questionService.getByProcessus(processusId);
      await mutate(data, false);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred');
    }
  }, [processusId, mutate]);

  const createQuestion = async (data: CreateQuestionDto) => {
    try {
      const newQuestion = await questionService.create(data);
      await mutate(
        questions ? [...questions, newQuestion] : [newQuestion],
        false
      );
      return newQuestion;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create question');
    }
  };

  const updateQuestion = async (id: number, data: UpdateQuestionDto) => {
    try {
      const updatedQuestion = await questionService.update(id, data);
      await mutate(
        questions?.map(q => q.id === id ? updatedQuestion : q),
        false
      );
      return updatedQuestion;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update question');
    }
  };

  const deleteQuestion = async (id: number) => {
    try {
      await questionService.delete(id);
      await mutate(
        questions?.filter(q => q.id !== id),
        false
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete question');
    }
  };

  return {
    questions: questions || [],
    loading: isLoading,
    error: error?.message || null,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    mutate
  };
};