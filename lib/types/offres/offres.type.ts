export type TypeTemps = "PLEIN_TEMPS" | "TEMPS_PARTIEL";

export type Devise = "EURO" | "DOLLAR" | "DOLLAR_CANADIEN" | "LIVRE" | "YEN" | "ROUPIE" | "ARIARY";

export type TypeEmploi = "CDI" | "CDD" | "STAGE" | "ALTERNANCE";

export interface CreateOffreDto {
  organisation_id: string;
  titre: string;
  description: string;
  date_limite: string;
  nombre_requis: number;
  lieu: string;
  pays: string;
  type_emploi: TypeEmploi;
  type_temps: TypeTemps;
  salaire?: string;
  devise: Devise;
  image_url?: string;
}

export interface Offre extends CreateOffreDto {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateOffreDto extends CreateOffreDto {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export interface OffreType extends Offre {
  user_id: string;
  status: string;
}