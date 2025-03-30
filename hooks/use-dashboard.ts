'use client'

import { getDashboardData } from '@/lib/services/dashboard';
import { DashboardResponse } from '@/lib/types/dashboard';
import useSWR from 'swr';

export const useDashboard = () => {
  const { data, error, isLoading } = useSWR<DashboardResponse>(
    '/api/users/dashboard',
    getDashboardData
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};