import {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  FileText,
  User,
  Brain,
  LineChart
} from 'lucide-react';

export const ORGANIZATION_ROUTES = {
  dashboard: {
    path: '/dashboard',
    label: 'Vue d\'ensemble',
    icon: LayoutDashboard,
  },
  users: {
    path: '/users',
    label: 'Gestion des utilisateurs',
    icon: Users,
  },
  offres: {
    path: '/offres',
    label: 'Gestion des offres',
    icon: Briefcase,
  },
  postcarieres: {
    path: '/postcarieres',
    label: 'Gestion des post-carrières',
    icon: GraduationCap,
  },
} as const;

export const USER_STATUS = {
  online: 'bg-[#23A559]',
  idle: 'bg-[#F0B232]',
  dnd: 'bg-[#F23F43]',
  offline: 'bg-[#80848E]',
} as const;

export const NavClient = [
  {
    href: "/client/candidature",
    label: "Mes candidatures",
    icon: FileText
  },
  {
    href: "/client/profile",
    label: "Mon profil",
    icon: User
  },
  {
    href: "/client/quiz",
    label: "Evaluation",
    icon: Brain
  },
  {
    href: "/client/progress",
    label: "Ma progression",
    icon: LineChart
  }
];