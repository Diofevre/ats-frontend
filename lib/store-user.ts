import { create } from "zustand";
import { getDecryptedCookie } from "./get-cookie";

export type ClientData = {
  candidat_nom: string;
  message: string;
  success: boolean;
  token_candidat: string;
};

type ClientStore = {
  client: ClientData | null;
  loadClient: () => void;
};

export const useClientStore = create<ClientStore>((set) => ({
  client: null,
  loadClient: () => {
    if (typeof window === "undefined") return;

    const clientData = getDecryptedCookie<ClientData>("client");
    if (clientData) {
      set({ client: clientData });
    } else {
      console.error("Aucune donnée valide trouvée dans le cookie 'client'");
      set({ client: null });
    }
  },
}));
