import useSWR from "swr";
import axios from "axios";
import { OffreType } from "@/lib/types/offres/offres.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

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
