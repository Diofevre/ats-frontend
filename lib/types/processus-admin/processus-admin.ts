export type ProcessusType = 'VISIO_CONFERENCE' | 'QUESTIONNAIRE' | 'TACHE'
export type StatusType = 'A_VENIR' | 'EN_COURS' | 'TERMINE'

export interface Reponse {
  label: string;
  is_true: boolean;
}

export interface Question {
  label: string;
  reponses: Reponse[];
}

export interface Processus {
  id: string;
  offre_id: string;
  titre: string;
  type: ProcessusType;
  description: string;
  statut: StatusType;
  duree: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProcessusDto {
  offre_id: string;
  titre: string;
  type: string;
  description: string;
  duree: number;
}

export interface AddQuizzDto {
  questions: Question[];
}