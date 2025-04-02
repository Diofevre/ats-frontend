export type Devise = 'EURO' | 'DOLLAR' | 'DOLLAR_CANADIEN' | 'LIVRE' | 'YEN' | 'ROUPIE' | 'ARIARY';
export type Status = 'OUVERT' | 'FERME' | 'CREE';
export type TypeTemps = 'PLEIN_TEMPS' | 'TEMPS_PARTIEL';

export type OffreType = {
  created_at: string;
  date_limite: string;
  description: string;
  devise: string;
  horaire_fermeture: string;
  horaire_ouverture: string;
  id: number;
  image_url: string;
  lieu: string;
  nombre_requis: number;
  pays: string;
  salaire: string;
  status: string;
  titre: string;
  type_emploi: string;
  type_temps: TypeTemps;
  updated_at: string;
  user_id: number;
  organisation_id: string;
};

export interface Offre {
  organisation_id: string;
  id: number;
  titre: string;
  user_id: number;
  image_url: string;
  description: string;
  date_limite: string;
  status: Status;
  nombre_requis: number;
  lieu: string;
  pays: string;
  type_emploi: string;
  type_temps: TypeTemps;
  salaire: string;
  devise: Devise;
  horaire_ouverture: string;
  horaire_fermeture: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOffreDto {
  organisation_id: string;
  titre: string;
  description: string;
  date_limite: string;
  nombre_requis?: number;
  lieu: string;
  pays: string;
  type_emploi: string;
  type_temps: TypeTemps;
  salaire: string;
  devise: Devise;
  horaire_ouverture: string;
  horaire_fermeture: string;
  image_url?: string;
}

export interface UpdateOffreDto extends Partial<CreateOffreDto> {
  id?: number;
}