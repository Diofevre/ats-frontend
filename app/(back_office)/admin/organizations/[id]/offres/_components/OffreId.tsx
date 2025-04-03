/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  Building, 
  Mail,
  Loader2,
  Edit,
  Send,
  X,
  Eye,
  UserPlus
} from 'lucide-react';
import { useOffresDetails } from '@/hooks/use-offre-details';
import { UpdateOffreDto, Offre, Devise, TypeTemps } from '@/lib/types/offres/offres.type';
import { offreService } from '@/lib/services/offres/offres';
import { useAuth } from '@/hooks/use-auth';
import { useOffres } from '@/hooks/use-offre';
import CreateForm from './form-annonce';
import { useProcessus } from '@/hooks/use-processus-admin';
import { useParams, useRouter } from 'next/navigation';
import { Postulation, TypeProcessus } from '@/lib/types/offre-details';
import { CandidateDetails } from '../[offreId]/_components/candidats-details';
import { ProcessusType } from '@/lib/types/processus-admin/processus-admin';
import ProcessSection from '../[offreId]/_components/processus-details';

interface CreateProcessusDto {
  titre: string;
  type: TypeProcessus;
  description: string;
  duree: number;
}

const OffreId = () => {
  const router = useRouter();
  const { token } = useAuth();
  const [offreId, setOffreId] = useState<number | null>(null);
  const [editingOffre, setEditingOffre] = React.useState<Offre | null>(null);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedView, setSelectedView] = useState<'details' | 'process' | 'candidates'>('details');
  const [selectedCandidate, setSelectedCandidate] = useState<Postulation | null>(null);
  const { mutate } = useOffres();
  const { createProcessus, deleteProcessus, startProcessus } = useProcessus();
  const { offre, isLoading } = useOffresDetails(offreId || 0);

  const { id } = useParams();
  const organizationId = Number(id);

  useEffect(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/organizations\/\d+\/offres\/(\d+)/);
    if (matches && matches[1]) {
      setOffreId(parseInt(matches[1], 10));
    }
  }, []);

  const handleCreateProcess = async (processData: CreateProcessusDto) => {
    if (!offreId) return;

    try {
      await createProcessus({
        offre_id: String(offreId),
        ...processData,
        type: processData.type as unknown as ProcessusType,
        start_at: new Date().toISOString()
      });
      await mutate();
    } catch (err) {
      console.error('Error creating process:', err);
      throw err;
    }
  };

  const handleDeleteProcess = async (processId: number) => {
    try {
      await deleteProcessus(String(processId));
      await mutate();
    } catch (err) {
      console.error('Error deleting process:', err);
      throw err;
    }
  };

  const handleStartProcess = async (processId: number) => {
    try {
      await startProcessus(String(processId));
      await mutate();
    } catch (err) {
      console.error('Error starting process:', err);
      throw err;
    }
  };

  const handleUpdate = async (data: UpdateOffreDto) => {
    if (!editingOffre) return;
    try {
      await offreService.update(editingOffre.id, data, token);
      await mutate();
      setEditingOffre(null);
      
      router.push(`/admin/organizations/${organizationId}/offres`)
    } catch (error) {
      console.error('Error updating offer:', error);
      alert('Une erreur est survenue lors de la modification de l\'offre.');
    }
  };

  const handlePublish = async () => {
    if (!offreId || !token) return;
    setIsPublishing(true);
    try {
      await offreService.publish(offreId, token);
      await mutate();
    } catch (error) {
      console.error('Error publishing offer:', error);
      alert('Une erreur est survenue lors de la publication de l\'offre.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleFermer = async () => {
    if (!offreId || !token) return;
    setIsClosing(true);
    try {
      await offreService.fermer(offreId, token);
      await mutate();
    } catch (error) {
      console.error('Error closing offer:', error);
      alert('Une erreur est survenue lors de la fermeture de l\'offre.');
    } finally {
      setIsClosing(false);
    }
  };

  const handleBack = () => {
    if (selectedView !== 'details') {
      setSelectedView('details');
    } else {
      window.history.back();
    }
  };

  const handleEdit = () => {
    if (offre) {
      const offreToEdit: Offre = {
        ...offre,
        organisation_id: offre.organisation.id.toString(),
        user_id: offre.user?.id ?? 0,
        devise: offre.devise as Devise,
        type_temps: offre.type_temps as TypeTemps,
      };
      setEditingOffre(offreToEdit);
    }
  };

  if (!offreId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Erreur</div>
          <p className="text-gray-600">Offre non trouvée.</p>
        </div>
      </div>
    );
  }

  if (isLoading || !offre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1E1F22] mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement de l&apos;offre...</p>
        </div>
      </div>
    );
  }

  const renderCandidatesSection = () => (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Candidatures ({offre.postulations.length})</h2>
        <button
          onClick={() => setSelectedView('candidates')}
          className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-[12px] hover:bg-[#2C9CC6]/80 transition-colors text-xs"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Gérer les candidats
        </button>
      </div>
      <div className="space-y-4">
        {offre.postulations.map((postulation) => (
          <div key={postulation.id} className="bg-white border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center">
              <img
                src={postulation.candidat.image}
                alt={postulation.candidat.nom}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => (e.currentTarget.src = "/processus.png")}
              />
              <div className="ml-4">
                <h3 className="font-medium text-[#1E1F22]">{postulation.candidat.nom}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{postulation.candidat.email}</span>
                </div>
              </div>
              <div className="ml-auto">
                <span className="text-sm font-medium text-gray-500">
                  Note: A-Venir/5
                </span>
              </div>
            </div>
            {/* {postulation.remarques.length > 0 && ( */}
              <div className="mt-4 pl-16">
                <p className="text-sm text-gray-600">
                  {/* {postulation.remarques[0].text} */}
                  TODO: Postulation remaque a venir
                </p>
              </div>
            {/* )} */}
            {selectedView === 'candidates' && (
              <div className="mt-4 pl-16">
                <button
                  onClick={() => setSelectedCandidate(postulation)}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Voir détails
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <span
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
            aria-label="Retour aux offres"
          >
            ⟵ {selectedView === 'details' ? 'Retour aux offres' : 'Retour aux détails'}
          </span>
          <div className="flex flex-row items-center gap-2 mb-4">
            {selectedView === 'details' && (
              <>
                {offre.status === 'CREE' && (
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing || (offre.status as string) === 'OUVERT'}
                    className={`inline-flex items-center px-4 py-2 rounded-[12px] transition-colors text-xs ${
                      (offre.status as string) === 'OUVERT'
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    aria-label="Publier"
                  >
                    {isPublishing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isPublishing ? 'Publication...' : 'Publier'}
                  </button>
                )}
                
                <button
                  onClick={handleFermer}
                  disabled={isClosing || offre.status === 'FERME'}
                  className={`inline-flex items-center px-4 py-2 rounded-[12px] transition-colors text-xs ${
                    offre.status === 'FERME' || isClosing
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  aria-label="Fermer"
                >
                  {isClosing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <X className="w-4 h-4 mr-2" />
                  )}
                  {isClosing ? 'Fermeture...' : offre.status === 'FERME' ? 'Fermé' : 'Fermer'}
                </button>

                {offre.status === 'CREE' && (
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-[12px] hover:bg-[#2C9CC6]/80 transition-colors text-xs"
                    aria-label="Modifier"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {selectedView === 'details' && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={offre.image_url || 'https://via.placeholder.com/150'}
                    alt={offre.titre}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="ml-6">
                    <h1 className="text-2xl font-bold text-[#1E1F22] uppercase">{offre.titre}</h1>
                    <p className="text-gray-500 mt-2">{offre.organisation.nom}</p>
                    <div className="flex items-center mt-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        offre.status === 'OUVERT' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {offre.status}
                      </span>
                      <span className="ml-4 text-sm text-gray-500">
                        Publié le {new Date(offre.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {selectedView === 'details' && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Description du poste</h2>
                  <p className="text-gray-600 whitespace-pre-line">{offre.description}</p>
                </section>
              )}

              {selectedView === 'process' ? (
                <ProcessSection
                  processus={offre.processus}
                  isEditing={true}
                  offreStatus={offre.status}
                  onCreateProcess={handleCreateProcess}
                  onDeleteProcess={handleDeleteProcess}
                  onStartProcess={handleStartProcess}
                />
              ) : selectedView === 'candidates' ? (
                renderCandidatesSection()
              ) : (
                <>
                  <ProcessSection
                    processus={offre.processus}
                    offreStatus={offre.status}
                    isEditing={false}
                    onCreateProcess={handleCreateProcess}
                    onDeleteProcess={handleDeleteProcess}
                    onStartProcess={handleStartProcess}
                    onViewChange={() => setSelectedView('process')}
                  />
                  {renderCandidatesSection()}
                </>
              )}
            </div>

            {selectedView === 'details' && (
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Informations clés</h3>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="ml-3 text-gray-600">{offre.lieu}, {offre.pays}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-5 h-5 text-gray-400" />
                          <span className="ml-3 text-gray-600">{offre.type_emploi}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-gray-400" />
                          <span className="ml-3 text-gray-600">{offre.nombre_requis} poste(s)</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="ml-3 text-gray-600">
                            {offre.horaire_ouverture} - {offre.horaire_fermeture}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-500">Rémunération</h3>
                      <p className="mt-2 text-2xl font-semibold text-[#1E1F22]">
                        {offre.salaire} {offre.devise}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-500">Date limite</h3>
                      <div className="mt-2 flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                        {new Date(offre.date_limite).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <Building className="w-5 h-5 text-gray-400" />
                          <span className="ml-3 text-gray-600">{offre.organisation.nom}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="ml-3 text-gray-600">{offre.organisation.adresse}, {offre.organisation.ville}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {editingOffre && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <CreateForm
                initialData={editingOffre}
                onSubmit={handleUpdate}
                onCancel={() => setEditingOffre(null)}
              />
            </div>
          </div>
        </div>
      )}

      {selectedCandidate && (
        <CandidateDetails
          postulation={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
};

export default OffreId;