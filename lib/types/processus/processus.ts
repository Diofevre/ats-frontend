export type ProcessusType = 'VISIO_CONFERENCE' | 'QUESTIONNAIRE' | 'TACHE';

export type Reponse = {
  label: string;
  is_true: boolean;
};

export type Question = {
  label: string;
  reponses: Reponse[];
};

export interface Processus {
  id: number;
  offre_id: number;
  titre: string;
  type: ProcessusType;
  description: string;
  statut: 'A_VENIR' | 'EN_COURS' | 'TERMINE';
  duree: number;
  start_at: string;
  created_at: string;
  updated_at: string;
}