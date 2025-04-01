'use client'

import { OrganisationDashboard } from '@/lib/types/dashbaord-by-organisation';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized access');
    }
    throw new Error('Failed to fetch dashboard data');
  }

  return response.json();
};

export const useOrganisationDashboard = (id: number) => {
  const { data, error, isLoading } = useSWR<OrganisationDashboard>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/organisations/${id}/dashboard`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // Refresh every 30 seconds
    }
  );

  return {
    dashboard: data,
    loading: isLoading,
    error: error?.message ?? null,
  };
};