export type TypeTemps = 'PLEIN_TEMPS' | 'TEMPS_PARTIEL';
export type StatusOffre = 'CREE' | 'OUVERT' | 'FERME';
export type TypeProcessus = 'VISIO_CONFERENCE' | 'TACHE' | 'QUESTIONNAIRE';
export type StatusProcessus = 'A_VENIR' | 'EN_COURS' | 'TERMINE';
export type Devise = 'EURO' | 'USD' | 'GBP';
export type TypeEmploi = 'CDI' | 'CDD' | 'STAGE' | 'ALTERNANCE';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Organisation {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
}

export interface ProcessusPassage {
  id: number;
  processus_id: number;
  postulation_id: number;
  statut: StatusProcessus;
  score: number;
  lien_web?: string;
  lien_fichier?: string;
  lien_vision?: string;
  created_at: string;
  updated_at: string;
}

export interface Processus {
  id: number;
  titre: string;
  type: TypeProcessus;
  description: string;
  statut: StatusProcessus;
  offre_id: number;
  duree: number;
  start_at: string;
  created_at: string;
  updated_at: string;
}

export interface Candidat {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  image: string;
}

export interface Postulation {
  id: number;
  candidat: Candidat;
  processus_passer: ProcessusPassage[];
}

export interface Offres {
  id: number;
  titre: string;
  user: User;
  organisation: Organisation;
  image_url: string;
  description: string;
  date_limite: string;
  status: StatusOffre;
  nombre_requis: number;
  lieu: string;
  pays: string;
  type_emploi: TypeEmploi;
  type_temps: TypeTemps;
  salaire: string;
  devise: Devise;
  created_at: string;
  updated_at: string;
  processus: Processus[];
  postulations: Postulation[];
}

// Response types for API calls
export interface CreateOffreDto extends Omit<Offres, 
  'id' | 'created_at' | 'updated_at' | 'processus' | 'postulations' | 'user'
> {
  user_id: number;
}

export interface UpdateOffreDto extends Partial<CreateOffreDto> {
  id: number;
}

export interface OffreResponse {
  data: Offres;
  message: string;
}

export interface OffresResponse {
  data: Offres[];
  message: string;
}

export interface DeleteOffreResponse {
  message: string;
  success: boolean;
}