/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface Processus {
  id: number;
  titre: string;
  type: string;
  description: string;
  statut: string;
  offre_id: number;
  duree: number;
  created_at: string;
  updated_at: string;
  questions: any[];
}

export interface Candidat {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  image: string;
}

export interface Admin {
  id: number;
  name: string;
}

export interface Remarque {
  id: number;
  admin: Admin;
  postulation_id: number;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface Postulation {
  id: number;
  candidat: Candidat;
  offre_id: number;
  date_soumission: string;
  etape_actuelle: string;
  cv: string;
  lettre_motivation: string;
  telephone: string;
  source_site: string;
  note: number;
  created_at: string;
  updated_at: string;
  remarques: Remarque[];
}

export interface Offres {
  id: number;
  titre: string;
  user: User;
  organisation: Organisation;
  image_url: string;
  description: string;
  date_limite: string;
  status: 'OUVERT' | 'FERME';
  nombre_requis: number;
  lieu: string;
  pays: string;
  type_emploi: string;
  salaire: string;
  devise: string;
  horaire_ouverture: string;
  horaire_fermeture: string;
  created_at: string;
  updated_at: string;
  processus: Processus[];
  postulations: Postulation[];
}