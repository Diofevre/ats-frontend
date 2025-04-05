import { Processus } from "./processus/processus";

export interface Question {
  id: number;
  label: string;
  processus_id: number;
  reponses: Reponse[];
  processus?: Processus;
}

export interface Reponse {
  id: number;
  label: string;
  is_true: boolean;
  question_id: number;
  question?: string;
}

export interface CreateQuestionDto {
  label: string;
  processus_id: number;
}

export interface UpdateQuestionDto {
  label: string;
}

export interface CreateReponseDto {
  label: string;
  is_true: boolean;
  question_id: number;
}

export interface UpdateReponseDto {
  label: string;
  is_true: boolean;
}