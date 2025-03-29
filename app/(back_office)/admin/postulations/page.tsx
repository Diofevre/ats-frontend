'use client'

import React, { useState, useMemo } from 'react';
import { AlertCircle, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProcessus } from '@/hooks/use-processus';
import { ProcessusSkeleton } from './_components/skeleton';
import { ProcessusCard } from './_components/card';

const STATUT_OPTIONS = [
  { value: 'ALL', label: 'Tous les statuts' },
  { value: 'A_VENIR', label: 'À venir' },
  { value: 'EN_COURS', label: 'En cours' },
  { value: 'TERMINE', label: 'Terminé' },
];

const ITEMS_PER_PAGE = 5;

const Postulations: React.FC = () => {
  const { processus, isLoading, isError } = useProcessus();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProcessus = useMemo(() => {
    if (!processus) return [];
    
    return processus.filter(item => {
      const matchesSearch = item.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'ALL' || item.statut === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [processus, searchQuery, selectedStatus]);

  const totalPages = Math.ceil(filteredProcessus.length / ITEMS_PER_PAGE);
  
  const paginatedProcessus = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProcessus.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProcessus, currentPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isError) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 p-4 rounded-lg flex items-center text-red-800">
            <AlertCircle className="w-5 h-5 mr-2" />
            Une erreur est survenue lors du chargement des processus.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl space-y-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent uppercase">
                  Postulations
                </h1>
                <div className="hidden sm:block h-8 w-[1px] bg-gray-200"></div>
                <span className="hidden sm:block text-sm text-gray-500">
                  Suivez l&apos;évolution de vos processus de recrutement
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher par titre ou description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              {STATUT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          {!isLoading && (
            <div className="text-sm text-gray-500">
              {filteredProcessus.length} résultat{filteredProcessus.length !== 1 ? 's' : ''} trouvé{filteredProcessus.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {isLoading ? (
            <ProcessusSkeleton />
          ) : paginatedProcessus.length > 0 ? (
            <>
              <div className="space-y-4">
                {paginatedProcessus.map((item) => (
                  <ProcessusCard
                    key={item.id}
                    processus={item}
                    onClick={() => console.log('Clicked processus:', item.id)}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === pageNumber
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun processus ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Postulations;