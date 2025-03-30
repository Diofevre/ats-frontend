/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Search, ChevronLeft, ChevronRight, Loader2, Building2 } from 'lucide-react';
import { useOrganization } from '@/hooks/use-organization';

const ITEMS_PER_PAGE = 10;

const Offres = () => {
  const [organizationId, setOrganizationId] = useState<number | null>(null);
  const { offres, isLoadingOffres, isErrorOffres, organization } = useOrganization(organizationId || undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'TOUS' | 'OUVERT' | 'FERME'>('TOUS');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/organizations\/(\d+)/);
    if (matches && matches[1]) {
      setOrganizationId(parseInt(matches[1], 10));
    }
  }, []);

  const handleOffreClick = (offreId: number) => {
    window.location.href = `/admin/organizations/${organizationId}/offres/${offreId}`;
  };

  const filteredOffres = React.useMemo(() => {
    if (!offres) return [];
    
    return offres.filter(offre => {
      const matchesSearch = 
        offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.pays.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.type_emploi.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'TOUS' || offre.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [offres, searchTerm, filterStatus]);

  const totalPages = React.useMemo(() => 
    Math.ceil((filteredOffres?.length || 0) / ITEMS_PER_PAGE)
  , [filteredOffres]);

  const paginatedOffres = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOffres.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOffres, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  if (!organizationId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <div className="text-xl font-semibold text-gray-800 mb-2">Organisation non trouvée</div>
          <p className="text-gray-600">Veuillez vérifier l&apos;URL et réessayer.</p>
        </div>
      </div>
    );
  }

  if (isErrorOffres) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-xl font-semibold text-red-600 mb-2">Erreur</div>
          <p className="text-gray-600">Une erreur est survenue lors du chargement des offres.</p>
        </div>
      </div>
    );
  }

  if (isLoadingOffres) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1E1F22] mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement des offres...</p>
        </div>
      </div>
    );
  }

  if (!offres || offres.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="rounded-xl p-8 max-w-md w-full text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <div className="text-xl font-semibold text-gray-800 mb-2">Aucune offre disponible</div>
          <p className="text-gray-600">Cette organisation n&apos;a pas encore publié d&apos;offres d&apos;emploi.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 uppercase">Annonces d&apos;emploi</h1>
              {organization && (
                <p className="text-sm text-gray-500">{organization.nom}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une offre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'TOUS' | 'OUVERT' | 'FERME')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="TOUS">Tous les statuts</option>
                <option value="OUVERT">Ouvert</option>
                <option value="FERME">Fermé</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedOffres.map((offre) => (
            <div 
              key={offre.id} 
              onClick={() => handleOffreClick(offre.id)}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              {offre.image_url && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={offre.image_url}
                    alt={offre.titre}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{offre.titre}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{offre.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{offre.lieu}, {offre.pays}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{offre.type_emploi} - {offre.salaire} {offre.devise}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{offre.horaire_ouverture} - {offre.horaire_fermeture}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    offre.status === 'OUVERT' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {offre.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Date limite: {new Date(offre.date_limite).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-1" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg ${
                    currentPage === index + 1
                      ? 'z-10 bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Offres;