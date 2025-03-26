import useSWR from "swr";
import axios from "axios";
import { OffreType, CreateOffreDto, Offre, UpdateOffreDto } from "@/lib/types/offres/offres.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAllOffres = () => {
  const { data, error, mutate } = useSWR(`${API_URL}/api/offres`, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    mockJobs: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useOneOffre = (id: number | undefined) => {
  const { data, error, mutate } = useSWR(
    id ? `${API_URL}/api/offres/${id}` : null,
    fetcher
  );

  return {
    mockJob: data as OffreType,
    isLoading: id && !error && !data,
    isError: error,
    mutate,
  };
};

export const offreService = {
  getAll: async (): Promise<Offre[]> => {
    const response = await api.get<Offre[]>('/api/offres');
    return response.data;
  },

  getById: async (id: number): Promise<Offre> => {
    const response = await api.get<Offre>(`/api/offres/${id}`);
    return response.data;
  },

  create: async (offre: CreateOffreDto): Promise<Offre> => {
    const response = await api.post<Offre>('/api/offres', offre);
    return response.data;
  },

  update: async (id: number, offre: UpdateOffreDto): Promise<Offre> => {
    const response = await api.put<Offre>(`/api/offres/${id}`, offre);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/offres/${id}`);
  },
};