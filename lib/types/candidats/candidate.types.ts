export interface Referent {
  id: number;
  email: string;
  nom: string;
  telephone: string;
  recommendation: string;
  statut: string;
}

export interface CandidateReferent {
  referent: Referent;
}

export interface Candidate {
  id: number;
  email: string;
  nom: string;
  telephone: string;
  image: string;
  created_at: string;
  updated_at: string;
  referents: CandidateReferent[];
}

export interface AddReferentPayload {
  referent_id: number;
}

export interface ApiResponse {
  message: string;
}