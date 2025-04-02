/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Postulation, ProcessusPassage } from '@/lib/types/offre-details';

interface CandidateDetailsProps {
  postulation: Postulation;
  onClose: () => void;
}

export const CandidateDetails = ({ postulation, onClose }: CandidateDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Détails du candidat</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Profile Section */}
          <div className="flex items-start space-x-4">
            <img
              src={postulation.candidat.image}
              alt={postulation.candidat.nom}
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/processus.png";
              }}
            />
            <div>
              <h3 className="text-lg font-semibold">{postulation.candidat.nom}</h3>
              <div className="flex items-center text-gray-500 mt-1">
                <Mail className="w-4 h-4 mr-1" />
                <span>{postulation.candidat.email}</span>
              </div>
              <div className="flex items-center text-gray-500 mt-1">
                <Phone className="w-4 h-4 mr-1" />
                <span>{postulation.candidat.telephone}</span>
              </div>
            </div>
          </div>

          {/* Process Progress Section */}
          <div>
            <h4 className="font-medium mb-4">Progression du processus</h4>
            <div className="space-y-4">
              {postulation.processus_passer.map((process: ProcessusPassage) => (
                <div key={process.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Étape {process.processus_id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      process.statut === 'TERMINE' 
                        ? 'bg-green-100 text-green-800'
                        : process.statut === 'EN_COURS'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {process.statut}
                    </span>
                  </div>
                  {process.score > 0 && (
                    <div className="text-sm text-gray-500 mt-2">
                      Score: {process.score}
                    </div>
                  )}
                  <div className="mt-3 space-y-2">
                    {process.lien_web && (
                      <a 
                        href={process.lien_web}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        Lien web
                      </a>
                    )}
                    {process.lien_fichier && (
                      <a 
                        href={process.lien_fichier}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        Fichier attaché
                      </a>
                    )}
                    {process.lien_vision && (
                      <a 
                        href={process.lien_vision}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        Lien visioconférence
                      </a>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Créé le: {new Date(process.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};