export interface Organization {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  users: number[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrganizationDto {
  nom: string;
  adresse: string;
  ville: string;
}

export interface UpdateOrganizationDto {
  nom?: string;
  adresse?: string;
  ville?: string;
  users?: number[];
}

export interface OrganizationUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationOffre {
  id: number;
  titre: string;
  user_id: number;
  image_url: string;
  description: string;
  date_limite: string;
  status: string;
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
}