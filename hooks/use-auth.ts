/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import api from '@/lib/services/api';
import { getCurrentUser, getToken, logout } from '@/lib/services/authentications/user';
import { UpdateProfilePayload, User } from '@/lib/types/authentications/user.types';
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
  const { data: userData, error: fetchError,mutate } = useSWR(
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

  const updateUser = async (userId: string, payload: UpdateProfilePayload) => {
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      await api.put(`/api/users/${userId}`, formData);
      await mutate(); // Refresh the users list
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update user');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await api.delete(`/api/users/${userId}`);
      await mutate(); // Refresh the users list
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete user');
    }
  };

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
    refreshUser,
    deleteUser,
    updateUser
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