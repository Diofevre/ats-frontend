import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const initiateGoogleLogin = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/candidats/auth-dev/google`
    );
    return response.data.redirect_url;
  } catch (err) {
    console.error(
      "Erreur lors de l'initialisation de la connexion Google:",
      err
    );
    throw err;
  }
};

export const verifyGoogleCode = async (code: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/candidats/auth-dev/google/verify`,
      { code }
    );

    const dataString = JSON.stringify(response.data);

    const cookieOptions = [
      `client=${encodeURIComponent(dataString)}`,
      "path=/",
    ];

    if (typeof document !== "undefined") {
      document.cookie = cookieOptions.join("; ");
    }

    return response.data;
  } catch (err) {
    console.error("Échec de la vérification du code Google:", err);
    throw err;
  }
};
