/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useMemo } from 'react';
import { useProcessus } from '@/hooks/use-processus-admin';
import { CreateProcessusDto } from '@/lib/types/processus-admin/processus-admin';
import { ProcessusCard } from './_components/card';
import { ProcessusForm } from './_components/form';
import { Plus, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { JsonQuizForm } from './_components/json-quizz';
import ProcessusSkeleton from './_components/skeleton';

const ITEMS_PER_PAGE = 6; // 6 items pour une grille 3x2

const Processus = () => {
  const { processus, isLoading, isError, createProcessus, deleteProcessus, addQuizz } = useProcessus();
  const [showForm, setShowForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [selectedProcessusId, setSelectedProcessusId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrer les processus en fonction de la recherche
  const filteredProcessus = useMemo(() => {
    if (!processus) return [];
    
    return processus.filter(item => 
      item.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [processus, searchQuery]);

  // Calculer la pagination
  const totalPages = Math.ceil((filteredProcessus?.length || 0) / ITEMS_PER_PAGE);
  
  const paginatedProcessus = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProcessus.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProcessus, currentPage]);

  // Reset la page quand la recherche change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreate = async (data: CreateProcessusDto) => {
    try {
      await createProcessus(data);
      setShowForm(false);
    } catch (error) {
      console.error('Erreur lors de la création du processus:', error);
    }
  };

  const handleShowQuizForm = (processusId: string) => {
    setSelectedProcessusId(processusId);
    setShowQuizForm(true);
  };

  const handleSubmitQuiz = async (processusId: string, quiz: any) => {
    try {
      await addQuizz(processusId, quiz);
      setShowQuizForm(false);
      setSelectedProcessusId(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du quiz:", error);
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Erreur</div>
          <p className="text-gray-600">Une erreur est survenue lors du chargement des données.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Sticky Header with Search */}
        <div className="sticky top-0 z-10 mb-8 bg-white/80 backdrop-blur-xl space-y-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent uppercase">
                  Offres d&apos;emploi
                </h1>
                <div className="hidden sm:block h-8 w-[1px] bg-gray-200"></div>
                <span className="hidden sm:block text-sm text-gray-500">
                  Liste des Processus
                </span>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="group relative inline-flex items-center px-6 py-2.5 bg-[#1E1F22] text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 active:scale-95"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1E1F22] via-[#313338] to-[#1E1F22] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Plus className="w-4 h-4 mr-2 relative z-10 transition-transform group-hover:rotate-90 duration-300" />
                <span className="relative z-10 font-medium">Ajouter</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par titre ou description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent transition-all"
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

          {/* Results Count */}
          {!isLoading && (
            <div className="text-sm text-gray-500">
              {filteredProcessus.length} résultat{filteredProcessus.length !== 1 ? 's' : ''} trouvé{filteredProcessus.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ProcessusSkeleton key={index} />
            ))}
          </div>
        ) : filteredProcessus.length === 0 ? (
          <div className="p-12 text-center max-w-2xl mx-auto">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <Image 
                src="/processus.png"
                alt="Aucun processus"
                layout="fill"
                objectFit="contain"
                className="opacity-80"
              />
            </div>
            <h2 className="text-xl font-semibold text-[#1E1F22] mb-2">
              {searchQuery ? "Aucun résultat trouvé" : "Aucun processus"}
            </h2>
            <p className="text-gray-600 text-lg">
              {searchQuery 
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par créer votre premier processus"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProcessus.map((item) => (
                <ProcessusCard
                  key={item.id}
                  processus={item}
                  onDelete={deleteProcessus}
                  onAddQuiz={() => handleShowQuizForm(item.id)}
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
                          ? 'bg-[#1E1F22] text-white'
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
        )}

        {showForm && (
          <ProcessusForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showQuizForm && selectedProcessusId && (
          <JsonQuizForm
            processusId={selectedProcessusId}
            onSubmit={handleSubmitQuiz}
            onCancel={() => {
              setShowQuizForm(false);
              setSelectedProcessusId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Processus;