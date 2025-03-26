import useSWR from 'swr';
import { toast } from 'sonner';
import { candidatesService } from '@/lib/services/candidats/candidats';
import { Candidate } from '@/lib/types/candidats/candidate.types';

export function useCandidates() {
  const {
    data: candidates,
    error,
    isLoading,
    mutate
  } = useSWR<Candidate[]>('/api/candidats', candidatesService.getAll);

  const deleteCandidate = async (id: number) => {
    try {
      await candidatesService.delete(id);
      await mutate();
      toast.success('Candidat supprimé avec succès');
    } catch (error) {
      console.log(error);
      toast.error('Impossible de supprimer le candidat');
    }
  };

  return {
    candidates,
    isLoading,
    isError: error,
    deleteCandidate,
    refresh: mutate
  };
}

export function useCandidate(id: number | null) {
  const {
    data: candidate,
    error,
    isLoading,
    mutate
  } = useSWR(
    id ? `/api/candidats/${id}` : null,
    () => id ? candidatesService.getById(id) : null
  );

  const removeReferent = async (referentId: number) => {
    if (!id) return;
    
    try {
      await candidatesService.removeReferent(id, { referent_id: referentId });
      await mutate();
      toast.success('Référent retiré avec succès');
    } catch (error) {
      console.log(error);
      toast.error('Impossible de retirer le référent');
    }
  };

  return {
    candidate,
    isLoading,
    isError: error,
    removeReferent,
    refresh: mutate
  };
}