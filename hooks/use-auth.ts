/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getCurrentUser, getToken, logout } from '@/lib/services/authentications/user';
import { User } from '@/lib/types/authentications/user.types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export function useAuth() {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Initialize token
  useEffect(() => {
    const currentToken = getToken();
    setToken(currentToken);
    setIsInitialized(true);
  }, []);

  // Fetch user data only if we have a token
  const { data: userData, error: fetchError } = useSWR(
    token ? '/api/users/me' : null,
    getCurrentUser,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      shouldRetryOnError: false,
      onSuccess: (data) => {
        setUser(data);
        setError(null);
        setLoading(false);
      },
      onError: (err) => {
        console.error('Error fetching user:', err);
        setUser(null);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    }
  );

  // Update user when userData changes
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  // Handle fetch error
  useEffect(() => {
    if (fetchError && isInitialized) {
      setError('Failed to fetch user data');
      setUser(null);
    }
  }, [fetchError, isInitialized]);

  // Update loading state
  useEffect(() => {
    if (isInitialized) {
      if (!token) {
        setLoading(false);
      } else if (userData || fetchError) {
        setLoading(false);
      }
    }
  }, [isInitialized, token, userData, fetchError]);

  const handleLogout = async () => {
    try {
      setError(null);
      await logout();

      setUser(null);
      setToken(null);

      router.push('/login');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
      console.error('Error during logout:', err);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('Failed to refresh user data');
      console.error('Error refreshing user:', err);
    }
  };

  return {
    user,
    loading,
    error,
    token,
    isInitialized,
    logout: handleLogout,
    refreshUser
  };
}

export function useUserData() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    '/api/users/me',
    getCurrentUser,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      dedupingInterval: 5000,
    }
  );

  return {
    userData: data,
    isLoading,
    isError: error,
    refreshUserData: mutate
  };
}