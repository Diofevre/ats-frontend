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
  MessageSquare,
  Loader2
} from 'lucide-react';
import { useOffres } from '@/hooks/use-offre-details';

const OffreId = () => {
  const [offreId, setOffreId] = useState<number | null>(null);

  useEffect(() => {
    // Extract offer ID from URL
    const path = window.location.pathname;
    const matches = path.match(/\/organizations\/\d+\/offres\/(\d+)/);
    if (matches && matches[1]) {
      setOffreId(parseInt(matches[1], 10));
    }
  }, []);

  const { offre, isLoading, isError } = useOffres(offreId || 0);

  const handleBack = () => {
    window.history.back();
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

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Erreur</div>
          <p className="text-gray-600">Une erreur est survenue lors du chargement de l&apos;offre.</p>
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

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <span
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
        >
          ⟵
          Retour aux offres
        </span>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img
                  src={offre.image_url || 'https://via.placeholder.com/150'}
                  alt={offre.titre}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="ml-6">
                  <h1 className="text-3xl font-bold text-[#1E1F22]">{offre.titre}</h1>
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

          {/* Main Content */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">Description du poste</h2>
                <p className="text-gray-600 whitespace-pre-line">{offre.description}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Processus de recrutement</h2>
                <div className="space-y-4">
                  {offre.processus.map((etape) => (
                    <div key={etape.id} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-[#1E1F22]">{etape.titre}</h3>
                      <p className="text-sm text-gray-600 mt-1">{etape.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Durée: {etape.duree} minutes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Candidatures ({offre.postulations.length})</h2>
                <div className="space-y-4">
                  {offre.postulations.map((postulation) => (
                    <div key={postulation.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                      <div className="flex items-center">
                        <img
                          src={postulation.candidat.image}
                          alt={postulation.candidat.nom}
                          className="w-12 h-12 rounded-full object-cover"
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
                            Note: {postulation.note}/5
                          </span>
                        </div>
                      </div>
                      {postulation.remarques.length > 0 && (
                        <div className="mt-4 pl-16">
                          <p className="text-sm text-gray-600">
                            <MessageSquare className="w-4 h-4 inline mr-1" />
                            {postulation.remarques[0].text}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Job Info */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffreId;