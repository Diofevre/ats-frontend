import { Candidate, AddReferentPayload, ApiResponse } from '@/lib/types/candidats/candidate.types';
import api from '../api';
import axios from 'axios';

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Une erreur est survenue');
    }
    throw error;
  }
};

export const candidatesService = {
  getAll: () => handleRequest<Candidate[]>(api.get('/api/candidats')),
  
  getById: (id: number) => handleRequest<Candidate>(api.get(`/api/candidats/${id}`)),
  
  delete: (id: number) => handleRequest<ApiResponse>(api.delete(`/api/candidats/${id}`)),
  
  addReferent: (candidateId: number, payload: AddReferentPayload) => 
    handleRequest<ApiResponse>(api.post(`/api/candidats/${candidateId}/referents`, payload)),
  
  removeReferent: (candidateId: number, payload: AddReferentPayload) => 
    handleRequest<ApiResponse>(api.delete(`/api/candidats/${candidateId}/referents`, { data: payload })),
  
  getFullInfoById: (id: number) => 
    handleRequest<string>(api.get(`/api/candidats/full-info/by-id/${id}`)),
  
  getFullInfoByEmail: (email: string) => 
    handleRequest<string>(api.get(`/api/candidats/full-info/by-email/${email}`))
};