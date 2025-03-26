import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
} from 'lucide-react';

export const ADMIN_SERVERS = [
  { id: 'ats', name: 'ATS System', initial: 'ATS' },
] as const;

export const ADMIN_ROUTES = {
  dashboard: {
    path: '/admin',
    label: 'Tableau de bord',
    icon: LayoutDashboard,
    subMenu: [
      {
        path: '/admin/calendrier',
        label: 'Calendrier',
        icon: Calendar,
      },
      {
        path: '/admin/candidats',
        label: 'Candidats',
        icon: Users,
      },
    ],
  },
  jobs: {
    path: '/admin/offres',
    label: 'Gestion des offres',
    icon: Briefcase,
  },
  postulations: {
    path: '/admin/postulations',
    label: 'Gestion des postulations',
    icon: Briefcase,
  },
  applications: {
    path: '/admin/candidatures',
    label: 'Candidatures',
    icon: FileText,
  },
  reports: {
    path: '/admin/reports',
    label: 'Rapports',
    icon: BarChart3,
  },
  settings: {
    path: '/admin/settings',
    label: 'Paramètres',
    icon: Settings,
  },
} as const;

export const USER_STATUS = {
  online: 'bg-[#23A559]',
  idle: 'bg-[#F0B232]',
  dnd: 'bg-[#F23F43]',
  offline: 'bg-[#80848E]',
} as const;