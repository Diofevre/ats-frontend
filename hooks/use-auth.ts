/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getCurrentUser, getToken, logout } from '@/lib/services/authentications/user';
import { User } from '@/lib/types/authentications/user.types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getToken());
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setError(null);
      const userData = await getCurrentUser();
      setUser(userData);
      setToken(getToken());
    } catch (err) {
      setError('Failed to fetch user data');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setError(null);
      await logout();
      setUser(null);
      setToken(null);
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
      console.error('Error during logout:', err);
    }
  };

  return {
    user,
    loading,
    error,
    token,
    logout: handleLogout,
    refreshUser: fetchUser,
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