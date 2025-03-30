'use client'

import React, { useEffect } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOrganization } from '@/hooks/use-organization';

interface ServerListProps {
  activeServer: string;
  setActiveServer: (serverId: string) => void;
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

export default function ServerList({ 
  activeServer, 
  setActiveServer, 
  setIsCreateModalOpen 
}: ServerListProps) {
  const { 
    organizations, 
    isLoadingOrganizations, 
    isErrorOrganizations,
    deleteOrganization 
  } = useOrganization();

  // Automatically select first server when organizations load
  useEffect(() => {
    if (organizations && organizations.length > 0 && !activeServer) {
      setActiveServer(organizations[0].id.toString());
    }
  }, [organizations, activeServer, setActiveServer]);

  const handleDeleteOrganization = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette organisation ?')) {
      try {
        await deleteOrganization(id);
        // If we deleted the active server, select the first remaining one
        if (activeServer === id.toString() && organizations && organizations.length > 1) {
          const remainingOrgs = organizations.filter(org => org.id !== id);
          if (remainingOrgs.length > 0) {
            setActiveServer(remainingOrgs[0].id.toString());
          }
        }
      } catch (error) {
        console.error('Error deleting organization:', error);
      }
    }
  };

  return (
    <div className="w-[72px] bg-[#1E1F22] flex flex-col items-center py-3 space-y-2 h-screen">
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="w-12 h-12 rounded-[24px] bg-[#23A559] hover:bg-[#248046] flex items-center justify-center transition-all duration-200 mb-2"
        title="Ajouter une organisation"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      <div className="w-8 h-[2px] bg-[#313338] rounded-full mb-2" />

      <div className="flex-1 overflow-y-auto w-full px-2">
        {isLoadingOrganizations ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        ) : isErrorOrganizations ? (
          <div className="flex justify-center py-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
        ) : !organizations || organizations.length === 0 ? (
          <div className="flex flex-col items-center py-4 px-2 text-center">
            <span className="text-sm text-gray-400">
              Ajoutez votre première organisation
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Cliquez sur le + ci-dessus
            </span>
          </div>
        ) : (
          <div className="space-y-2 ml-1 mt-1.5">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => setActiveServer(org.id.toString())}
                className={cn(
                  "w-12 h-12 rounded-[24px] flex items-center justify-center transition-all duration-200 group relative",
                  activeServer === org.id.toString()
                    ? "bg-[#2C9CC6] rounded-[16px]"
                    : "bg-[#313338] hover:bg-[#2C9CC6] hover:rounded-[16px]"
                )}
                title={org.nom}
              >
                <span className="text-white font-semibold text-sm">
                  {org.nom.substring(0, 2).toUpperCase()}
                </span>

                {/* Indicator bar */}
                <div className={cn(
                  "absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200",
                  activeServer === org.id.toString() ? "h-8" : "h-2 group-hover:h-8",
                  activeServer === org.id.toString() ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} style={{ transform: 'translateX(-50%)' }} />

                {/* Delete button - only shows on hover */}
                <button
                  onClick={(e) => handleDeleteOrganization(org.id, e)}
                  className="absolute top-0 right-0 -mr-1 -mt-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200 text-xs flex"
                  title="Supprimer l'organisation"
                >
                  ×
                </button>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}