export interface PostCariere {
  id: number;
  titre: string;
  contenu: string;
  images: string[];
  organisation_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePostCariereDto {
  titre: string;
  contenu: string;
  organisation_id: number;
  images: string[];
}

export interface UpdatePostCariereDto {
  titre?: string;
  contenu?: string;
  organisation_id?: number;
  images?: string[];
}