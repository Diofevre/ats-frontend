import useSWR from "swr";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const startProcecus = async (id: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/processus/${id}/start`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Échec de démarrer le processus", err);
    throw err;
  }
};

export const submitTacheLink = async (
  link: string,
  id: number,
  token: string
) => {
  console.log(link);
  try {
    const response = await axios.post(
      `${API_URL}/api/processus/${id}/submit/tache`,
      { link },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Échec de soumetre le tache lien", err);
    throw err;
  }
};

export const submitTacheFile = async (
  formData: FormData,
  id: number,
  token: string
) => {
  console.log(token);
  try {
    const response = await axios.post(
      `${API_URL}/api/processus/${id}/submit/tache`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Échec de soumetre le tache fichier", err);
    throw err;
  }
};

export const useQuizById = (id: number | undefined) => {
  const { data, error, mutate } = useSWR(
    id ? `${API_URL}/api/processus/${id}` : null,
    fetcher
  );

  return {
    quiz: data,
    isLoading: id && !error && !data,
    isError: error,
    mutate,
  };
};
