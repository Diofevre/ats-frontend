import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Postulation = async (
  cv: string,
  lettre_motivation: string | null,
  email: string,
  nom: string,
  telephone: string | undefined,
  offre_id: string | undefined,
  source_site: string,
  hasReferent: string | undefined
) => {
  try {
    const res = await axios.post(`${API_URL}/api/postulations`, {
      cv,
      lettre_motivation,
      email,
      nom,
      telephone,
      offre_id,
      source_site,
      hasReferent,
    });
    return res.data;
  } catch (error) {
    console.error("signin failed", error);
    throw error;
  }
};
