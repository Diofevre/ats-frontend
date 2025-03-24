/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getCurrentUser, logout } from '@/lib/services/authentications/user';
import { User } from '@/lib/types/authentications/user.types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setError(null);
      const userData = await getCurrentUser();
      setUser(userData);
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
    logout: handleLogout,
    refreshUser: fetchUser,
  };
}