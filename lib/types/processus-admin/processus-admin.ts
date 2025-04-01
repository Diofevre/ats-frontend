export type ProcessusType = 'VISIO_CONFERENCE' | 'QUESTIONNAIRE' | 'TACHE';
export type StatusType = 'A_VENIR' | 'EN_COURS' | 'TERMINE';

export interface Reponse {
  label: string;
  is_true: boolean;
}

export interface Question {
  label: string;
  reponses: Reponse[];
}

export interface Candidat {
  id: number;
  nom: string;
  email: string;
}

export interface Postulation {
  id: number;
  date_soumission: string;
  candidat: Candidat;
}

export interface Offre {
  id: number;
  titre: string;
  description: string;
}

export interface ProcessusDetail {
  id: number;
  titre: string;
  statut: StatusType;
  offre: Offre;
  postulations: Postulation[];
}

export interface Processus {
  id: string;
  offre_id: string;
  titre: string;
  type: ProcessusType;
  description: string;
  statut: StatusType;
  duree: number;
  ordre: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProcessusDto {
  offre_id: string;
  titre: string;
  type: ProcessusType;
  description: string;
  duree: number;
}

export interface AddQuizzDto {
  questions: Question[];
}