import useSWR from "swr";
import axios from "axios";
import { OffreType } from "@/lib/types/offres/offres.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

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
