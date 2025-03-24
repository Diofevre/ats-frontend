import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const Postulation = async (formData: unknown) => {
  try {
    const res = await axios.post(`${API_URL}/api/postulations`, formData, {
      headers: {
        "Content-Type": "mutipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("signin failed", error);
    throw error;
  }
};
