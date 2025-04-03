'use client'

import React from 'react';
import { Check } from 'lucide-react';
import { CreateOffreDto } from '@/lib/types/offres/offres.type';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PreviewProps {
  offreData: CreateOffreDto | null;
  onBack?: () => void;
  onFinish: () => void;
  isLoading: boolean;
}

export function Preview({ offreData, onFinish, isLoading }: PreviewProps) {
  if (!offreData) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1E1F22]">Aperçu de l&apos;annonce</h2>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4 text-[#1E1F22]">Détails de l&apos;offre</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Titre</p>
              <p className="mt-1">{offreData.titre}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Type d&apos;emploi</p>
              <p className="mt-1">{offreData.type_emploi}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="mt-1 whitespace-pre-wrap">{offreData.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Lieu</p>
              <p className="mt-1">{offreData.lieu}, {offreData.pays}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Salaire</p>
              <p className="mt-1">{offreData.salaire} {offreData.devise}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Horaires</p>
              <p className="mt-1">{offreData.horaire_ouverture} - {offreData.horaire_fermeture}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date limite</p>
              <p className="mt-1">{offreData.date_limite}</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={onFinish}
          className="flex items-center h-11 rounded-full px-6"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Ajout en cours...
            </>
          ) : (
            <>
              <Check className="w-5 h-5 mr-1" />
              Ajout de l&apos;annonce
            </>
          )}
        </Button>
      </div>
    </div>
  );
}