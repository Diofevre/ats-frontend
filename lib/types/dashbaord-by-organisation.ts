export interface Offre {
  id: number;
  titre: string;
  postulationCount?: number;
  createdAt?: string;
}

export interface ProcessusByType {
  tache: number;
  visioConference: number;
  questionnaire: number;
}

export interface PostulationsBySource {
  linkedin: number;
  indeed: number;
  jooble: number;
  francetravail: number;
  messager: number;
  whatsapp: number;
  instagram: number;
  telegram: number;
  twitter: number;
  quebecSite: number;
}

export interface OrganisationDashboard {
  id: number;
  name: string;
  totalUsers: number;
  totalModerators: number;
  totalAdmins: number;
  totalActiveUsers: number;
  totalVerifiedUsers: number;
  totalOffres: number;
  top3OffresByPostulations: Offre[];
  last3Offres: Offre[];
  totalPostulations: number;
  minPostulationsPerOffer: number;
  maxPostulationsPerOffer: number;
  avgPostulationsPerOffer: number;
  avgSalary: number;
  totalProcessus: number;
  processusByType: ProcessusByType;
  avgProcessusDuree: number;
  postulationsBySource: PostulationsBySource;
  totalInvitations: number;
  pendingInvitations: number;
  totalPostCarriere: number;
}