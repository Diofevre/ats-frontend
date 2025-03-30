'use client'

import React, { useState } from 'react';
import { ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { ORGANIZATION_ROUTES } from '@/lib/constants/back_office/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useOrganization } from '@/hooks/use-organization';
import UserInfo from './UserInfo';

interface ChannelListProps {
  isOpen: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  activeServer: string;
}

export default function ChannelList({ 
  isOpen, 
  setIsMobileMenuOpen,
  activeServer
}: ChannelListProps) {
  const router = useRouter();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['dashboard']);
  
  const { 
    organization,
    isLoading,
    isError,
    users,
    offres,
    postCarieres,
    isLoadingUsers,
    isLoadingOffres,
    isLoadingPostCarieres
  } = useOrganization(activeServer ? parseInt(activeServer) : undefined);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isLoading) {
    return (
      <div className="w-60 bg-[#2B2D31] h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-60 bg-[#2B2D31] h-screen flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-red-500" />
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="w-60 bg-[#2B2D31] h-screen flex items-center justify-center text-center p-4">
        <p className="text-[#949BA4]">Sélectionnez une organisation pour voir ses détails</p>
      </div>
    );
  }

  const sections = [
    {
      id: 'dashboard',
      label: 'TABLEAU DE BORD',
      route: ORGANIZATION_ROUTES.dashboard,
      count: null
    },
    {
      id: 'users',
      label: 'UTILISATEURS',
      route: ORGANIZATION_ROUTES.users,
      count: isLoadingUsers ? null : users?.length
    },
    {
      id: 'offres',
      label: 'OFFRES',
      route: ORGANIZATION_ROUTES.offres,
      count: isLoadingOffres ? null : offres?.length
    },
    {
      id: 'postcarieres',
      label: 'POST-CARRIERES',
      route: ORGANIZATION_ROUTES.postcarieres,
      count: isLoadingPostCarieres ? null : postCarieres?.length
    }
  ];

  return (
    <div className={cn(
      "w-60 bg-[#2B2D31] h-screen",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#1E1F22]">
        <h2 className="font-semibold text-white uppercase truncate" title={organization.nom}>
          {organization.nom}
        </h2>
      </div>

      <div className="p-2 text-[#949BA4] overflow-y-auto h-[calc(100vh-64px)]">
        {sections.map(section => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleCategory(section.id)}
              className="flex items-center px-1 mb-1 w-full hover:text-white group"
            >
              <ChevronDown className={cn(
                "w-3 h-3 mr-1 transition-transform",
                expandedCategories.includes(section.id) ? "transform rotate-0" : "transform -rotate-90"
              )} />
              <span className="text-xs font-semibold tracking-wide">
                {section.label} {section.count !== null && `(${section.count})`}
              </span>
            </button>

            {expandedCategories.includes(section.id) && (
              <div className="space-y-0.5">
                <button 
                  onClick={() => {
                    router.push(`/admin/organizations/${organization.id}${section.route.path}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-2 py-1.5 rounded text-[#949BA4] hover:bg-[#35363C] hover:text-white group"
                >
                  <section.route.icon className="w-5 h-5 mr-1.5 text-[#949BA4] group-hover:text-white" />
                  <span className="text-sm">{section.route.label}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <UserInfo />
    </div>
  );
}