// User Types
export interface UserStats {
  total: number;
  admins: number;
  moderators: number;
}

// Organisation Types
export interface Organisation {
  id: number;
  name: string;
}

export interface OrganisationWithUsers extends Organisation {
  userCount: number;
}

export interface OrganisationWithOffres extends Organisation {
  offreCount: number;
}

export interface OrganisationStats {
  total: number;
  topByUsers: OrganisationWithUsers[];
  topByOffres: OrganisationWithOffres[];
}

// Offre Types
export interface Offre {
  id: number;
  title: string;
  postulationCount: number;
}

export interface OffreStats {
  total: number;
  minRequired: number;
  maxRequired: number;
  topByPostulations: Offre[];
  avgPostulationsPerOffer: number;
}

// Candidate Types
export interface Candidate {
  id: number;
  name: string;
  email: string;
  postulationCount: number;
}

export interface CandidateStats {
  total: number;
  minPerOffer: number;
  maxPerOffer: number;
  topByPostulations: Candidate[];
}

// Dashboard Response Type
export interface DashboardResponse {
  users: UserStats;
  organisations: OrganisationStats;
  offres: OffreStats;
  candidates: CandidateStats;
}