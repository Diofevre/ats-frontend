import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
} from 'lucide-react';

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