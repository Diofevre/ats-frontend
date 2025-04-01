import useSWR from "swr";
import axios from "axios";
import {
  CandidatsType,
  PostulationType,
} from "@/lib/types/client/client.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcherProtected = ([url, token]: [string, string]) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export const useMyProfile = (token: string | undefined) => {
  const url = `${API_URL}/api/candidats/profile/me`;
  const { data, error, mutate } = useSWR(
    token ? [url, token] : null,
    fetcherProtected
  );

  return {
    myProfile: data as CandidatsType,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useMyPostulation = (token: string | undefined) => {
  const url = `${API_URL}/api/candidats/postulations/list`;
  const { data, error, mutate } = useSWR(
    token ? [url, token] : null,
    fetcherProtected
  );

  return {
    myPostulations: data as PostulationType[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useMyStats = (token: string | undefined) => {
  const url = `${API_URL}/api/candidats/dashboard/stats`;
  const { data, error, mutate } = useSWR(
    token ? [url, token] : null,
    fetcherProtected
  );

  return {
    myStats: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
