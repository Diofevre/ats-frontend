import { useState } from 'react';
// import { userService } from '../services/api';s
import { RoleUpdatePayload } from '@/lib/types/authentications/user.types';
import { updateRoleUsers } from '@/lib/services/authentications/user';

interface UseUserRoleReturn {
  updateRole: (userId: number, payload: RoleUpdatePayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useUserRole = (): UseUserRoleReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRole = async (userId: number, payload: RoleUpdatePayload) => {
    try {
      setIsLoading(true);
      setError(null);
      await updateRoleUsers(userId, payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateRole,
    isLoading,
    error,
  };
};