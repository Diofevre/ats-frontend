export type Devise = 'EURO' | 'DOLLAR' | 'DOLLAR_CANADIEN' | 'LIVRE' | 'YEN' | 'ROUPIE' | 'ARIARY';
export type Status = 'OUVERT' | 'FERME';

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
  updated_at: string;
  user_id: number;
};

export interface Offre {
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
  salaire: string;
  devise: Devise;
  horaire_ouverture: string;
  horaire_fermeture: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOffreDto {
  titre: string;
  description: string;
  date_limite: string;
  status: Status;
  nombre_requis?: number;
  lieu: string;
  pays: string;
  type_emploi: string;
  salaire: string;
  devise: Devise;
  horaire_ouverture: string;
  horaire_fermeture: string;
  image_url?: string;
}

export interface UpdateOffreDto extends Partial<CreateOffreDto> {
  id?: number;
}