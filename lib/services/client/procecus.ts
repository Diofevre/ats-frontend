import useSWR from "swr";
import axios from "axios";

interface QuizAnswer {
  question: number;
  reponse: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const fetcherProtected = ([url, token]: [string, string]) =>
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

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

export const useProcessusByIdProces = (id: number | undefined) => {
  const { data, error, mutate } = useSWR(
    id ? `${API_URL}/api/processus/${id}` : null,
    fetcher
  );

  return {
    proces: data,
    isLoading: id && !error && !data,
    isError: error,
    mutate,
  };
};

export const submitQuiz = async (
  id: number,
  submit: QuizAnswer[],
  token: string
) => {
  console.log(submit);
  try {
    const response = await axios.post(
      `${API_URL}/api/processus/${id}/submit/quizz`,
      { submit },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Échec de soumettre le quiz :", err);
    throw err;
  }
};

export const useProccecusPassed = (id: number, token: string | undefined) => {
  const url = `${API_URL}/api/processus/${id}/is-passed`;
  const { data, error, mutate } = useSWR(
    token ? [url, token] : null,
    fetcherProtected
  );

  return {
    passedProcessus: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const usePostulationDetail = (id: number | undefined) => {
  const { data, error, mutate } = useSWR(
    id ? `${API_URL}/api/postulations/${id}/details` : null,
    fetcher
  );

  return {
    detailPostulation: data,
    isLoading: id && !error && !data,
    isError: error,
    mutate,
  };
};
