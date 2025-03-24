import api from '@/lib/services/api';
import { Candidate, AddReferentPayload, ApiResponse } from '@/lib/types/candidats/candidate.types';
import axios from 'axios';

// Error handling wrapper
const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
    throw error;
  }
};

// Get all candidates
export const getAllCandidates = async (): Promise<Candidate[]> => {
  return handleRequest(api.get('/api/candidats'));
};

// Get candidate by ID
export const getCandidateById = async (id: number): Promise<Candidate> => {
  return handleRequest(api.get(`/api/candidats/${id}`));
};

// Delete candidate
export const deleteCandidate = async (id: number): Promise<ApiResponse> => {
  return handleRequest(api.delete(`/api/candidats/${id}`));
};

// Add referent to candidate
export const addReferentToCandidate = async (candidateId: number, payload: AddReferentPayload): Promise<ApiResponse> => {
  return handleRequest(api.post(`/api/candidats/${candidateId}/referents`, payload));
};

// Remove referent from candidate
export const removeReferentFromCandidate = async (candidateId: number, payload: AddReferentPayload): Promise<ApiResponse> => {
  return handleRequest(api.delete(`/api/candidats/${candidateId}/referents`, { data: payload }));
};

// Get candidate full info by ID
export const getCandidateFullInfoById = async (id: number): Promise<string> => {
  return handleRequest(api.get(`/api/candidats/full-info/by-id/${id}`));
};

// Get candidate full info by email
export const getCandidateFullInfoByEmail = async (email: string): Promise<string> => {
  return handleRequest(api.get(`/api/candidats/full-info/by-email/${email}`));
};