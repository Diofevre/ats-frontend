import useSWR from "swr";
import axios from "axios";
import { OffreType, CreateOffreDto, Offre, UpdateOffreDto } from "@/lib/types/offres/offres.type";
import { Offres } from "@/lib/types/offre-details";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the authorization header
const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export interface OffreFilters {
  text?: string;
  status?: string;
  minNombreRequis?: number;
  lieu?: string;
  pays?: string;
  type_emploi?: string;
  salaire?: number;
  devise?: string;
  date_publication?: string;
}

const buildUrl = (baseUrl: string, filters: OffreFilters): string => {
  const url = new URL(`${baseUrl}/filter`);
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.minNombreRequis)
    params.append("minNombreRequis", filters.minNombreRequis.toString());
  if (filters.pays) params.append("pays", filters.pays);
  if (filters.type_emploi) params.append("type_emploi", filters.type_emploi);
  if (filters.salaire) params.append("salaire", filters.salaire.toString());
  if (filters.devise) params.append("devise", filters.devise);
  if (filters.date_publication)
    params.append("date_publication", filters.date_publication);
  if (filters.text) params.append("text", filters.text);
  if (filters) url.search = params.toString();
  return url.toString();
};

export const useAllOffres = (filters: OffreFilters) => {
  const baseUrl = `${API_URL}/api/offres`;
  const urlWithFilters = buildUrl(baseUrl, filters);

  console.log(urlWithFilters);

  const { data, error, mutate } = useSWR(urlWithFilters, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 2000,
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

  create: async (offre: CreateOffreDto, token: string | null): Promise<Offre> => {
    setAuthHeader(token);
    try {
      const response = await api.post<Offre>('/api/offres', offre);
      return response.data;
    } finally {
      setAuthHeader(null); // Clear token after request
    }
  },

  update: async (id: number, offre: UpdateOffreDto, token: string | null): Promise<Offre> => {
    setAuthHeader(token);
    try {
      const response = await api.put<Offre>(`/api/offres/${id}`, offre);
      return response.data;
    } finally {
      setAuthHeader(null); // Clear token after request
    }
  },

  delete: async (id: number, token: string | null): Promise<void> => {
    setAuthHeader(token);
    try {
      await api.delete(`/api/offres/${id}`);
    } finally {
      setAuthHeader(null); // Clear token after request
    }
  },

  getDetailsById: async (id: number): Promise<Offres> => {
    const response = await api.get<Offres>(`/api/offres/${id}/details`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  publish: async (id: number, token: string | null): Promise<Offre> => {
    setAuthHeader(token);
    try {
      const response = await api.put<Offre>(`/api/offres/${id}/publish`);
      return response.data;
    } finally {
      setAuthHeader(null); // Clear token after request
    }
  },

  fermer: async (id: number, token: string | null): Promise<Offre> => {
    setAuthHeader(token);
    try {
      const response = await api.post<Offre>(`/api/offres/${id}/fermer`);
      return response.data;
    } finally {
      setAuthHeader(null); // Clear token after request
    }
  },
};