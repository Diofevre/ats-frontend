/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { useOffres } from '@/hooks/use-offre';
import { Briefcase, MapPin, Clock, Plus, Pencil, Trash2, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { CreateOffreDto, Offre, UpdateOffreDto } from '@/lib/types/offres/offres.type';
import { OffreForm } from '@/components/back_office/offre/form';
import { offreService } from '@/lib/services/offres/offres';
import OffreSkeleton from './_components/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 10;

const Offres = () => {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const { offres, isLoading, isError, mutate } = useOffres();
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingOffre, setEditingOffre] = React.useState<Offre | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<'TOUS' | 'OUVERT' | 'FERME'>('TOUS');
  const [currentPage, setCurrentPage] = React.useState(1);

  // All hooks are now called unconditionally at the top level
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
    Math.ceil(filteredOffres.length / ITEMS_PER_PAGE)
  , [filteredOffres]);

  const paginatedOffres = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOffres.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOffres, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  React.useEffect(() => {
    if (!authLoading && !token) {
      console.error("No token available. User is not authenticated.");
      router.push('/login');
      toast.error('Veuillez vous connecter pour accéder à cette page.');
    }
  }, [authLoading, token, router]);

  const handleCreate = async (data: CreateOffreDto) => {
    try {
      await offreService.create(data, token);
      await mutate();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Une erreur est survenue lors de la création de l\'offre.');
    }
  };

  const handleUpdate = async (data: UpdateOffreDto) => {
    if (!editingOffre) return;
    try {
      await offreService.update(editingOffre.id, data, token);
      await mutate();
      setEditingOffre(null);
    } catch (error) {
      console.error('Error updating offer:', error);
      alert('Une erreur est survenue lors de la modification de l\'offre.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return;
    try {
      await offreService.delete(id, token);
      await mutate();
    } catch (error) {
      console.error('Error deleting offer:', error);
      alert('Une erreur est survenue lors de la suppression de l\'offre.');
    }
  };

  if (isError) {
    return (
      <OffreSkeleton />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent uppercase">
                  Offres d&apos;emploi
                </h1>
                <div className="hidden sm:block h-8 w-[1px] bg-gray-200"></div>
                <span className="hidden sm:block text-sm text-gray-500">
                  Gestion des offres
                </span>
              </div>
              <button
                onClick={() => setIsFormOpen(true)}
                className="group relative inline-flex items-center px-6 py-2.5 bg-[#1E1F22] text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 active:scale-95"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1E1F22] via-[#313338] to-[#1E1F22] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Plus className="w-4 h-4 mr-2 relative z-10 transition-transform group-hover:rotate-90 duration-300" />
                <span className="relative z-10 font-medium">Ajouter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 mt-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher par titre, description, lieu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <label htmlFor="filterStatus" className="sr-only">Filtrer par statut</label>
                <select
                  id="filterStatus"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'TOUS' | 'OUVERT' | 'FERME')}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="TOUS">Tous les statuts</option>
                  <option value="OUVERT">Ouvert</option>
                  <option value="FERME">Fermé</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Offre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Salaire
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horaires
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date limite
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                    <OffreSkeleton key={index} />
                  ))
                ) : (
                  <>
                    {paginatedOffres?.map((offre) => (
                      <tr key={offre.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={offre.image_url || '/image_offre_default.jpg'}
                              alt={offre.titre}
                              className="h-12 w-12 rounded-lg object-cover shadow-sm"
                              onError={(e) => (e.currentTarget.src = '/image_offre_default.jpg')}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{offre.titre}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{offre.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{offre.lieu}, {offre.pays}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{offre.type_emploi} - {offre.salaire} {offre.devise}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{offre.horaire_ouverture} - {offre.horaire_fermeture}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            offre.status === 'OUVERT' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {offre.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(offre.date_limite).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              title="Modifier"
                              onClick={() => setEditingOffre(offre)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              title="Supprimer"
                              onClick={() => handleDelete(offre.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!isLoading && filteredOffres?.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          Aucune offre disponible
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Affichage de{' '}
                    <span className="font-medium">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span>
                    {' '}à{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredOffres?.length || 0)}
                    </span>
                    {' '}sur{' '}
                    <span className="font-medium">{filteredOffres?.length}</span>
                    {' '}résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Précédent</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === index + 1
                            ? 'z-10 bg-[#1E1F22] border-[#1E1F22] text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Suivant</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {(isFormOpen || editingOffre) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold p-4">
                {editingOffre ? 'Modifier l\'offre' : 'Nouvelle offre'}
              </h2>
              <OffreForm
                initialData={editingOffre || undefined}
                onSubmit={editingOffre ? handleUpdate : handleCreate}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingOffre(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Offres;