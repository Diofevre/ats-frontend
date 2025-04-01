export type CandidatsType = {
  created_at: string;
  email: string;
  id: number;
  image: string;
  is_email_active: boolean;
  nom: string;
  telephone: string | null;
  updated_at: string;
};

export type PostulationType = {
  cv: string;
  date_soumission: string;
  etape_actuelle: string;
  id: number;
  lettre_motivation: string;
  source_site: string;
  telephone: string;
  offre: OffreType;
};

export type OffreType = {
  createur: {
    email: string;
    id: number;
    nom: string;
  };
  date_limite: string;
  description: string;
  devise: string;
  id: number;
  lieu: string;
  pays: string;
  salaire: string;
  status: string;
  titre: string;
  type_emploi: string;
};

type EtapesActuelleType = {
  accepte: number;
  en_revision: number;
  entretien: number;
  rejete: number;
  soumis: number;
};

type PostulationsScoreType = {
  nombre_processus: number;
  offre_titre: string;
  postulation_id: number;
  score_total: number;
};

export type StatClientType = {
  etapes_actuelles: EtapesActuelleType;
  nombre_postulations: number;
  nombre_referents: number;
  postulations_scores: PostulationsScoreType[];
};
