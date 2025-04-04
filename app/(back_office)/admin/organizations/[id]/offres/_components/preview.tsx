'use client';

import React from 'react';
import { Check, MapPin, Calendar, Users, BadgeEuro } from 'lucide-react';
import { CreateOffreDto } from '@/lib/types/offres/offres.type';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from "@/components/ui/badge";

interface PreviewProps {
  offreData: CreateOffreDto | null;
  onBack: () => void;
  onFinish: () => void;
  isLoading: boolean;
}

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
};

const getDeviseSymbol = (devise: string) => {
  const symbols: { [key: string]: string } = {
    'EURO': '€',
    'DOLLAR': '$',
    'DOLLAR_CANADIEN': 'CAD',
    'LIVRE': '£',
    'YEN': '¥',
    'ROUPIE': '₹',
    'ARIARY': 'Ar'
  };
  return symbols[devise] || devise;
};

const getTypeEmploiColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'CDI': 'bg-green-100 text-green-800',
    'CDD': 'bg-blue-100 text-blue-800',
    'STAGE': 'bg-purple-100 text-purple-800',
    'ALTERNANCE': 'bg-indigo-100 text-indigo-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

export function Preview({ offreData, onBack, onFinish, isLoading }: PreviewProps) {
  if (!offreData) return null;

  const hasSalary = offreData.salaire && offreData.salaire.length > 0;

  return (
    <div className="max-w-4xl mx-auto min-h-screen pb-10">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span
            className='flex items-center text-gray-600 hover:text-blue-600 cursor-pointer'
            onClick={onBack}
          >
            ⟵ Retour
          </span>
          <Button
            onClick={onFinish}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-[12px] px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Publication en cours...</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Publier l&apos;offre</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {offreData.image_url && (
            <div className="relative w-full h-64">
              <Image
                src={offreData.image_url}
                alt="Image de l'offre"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary" className={`${getTypeEmploiColor(offreData.type_emploi)}`}>
                  {offreData.type_emploi}
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  {offreData.type_temps === 'PLEIN_TEMPS' ? 'Temps plein' : 'Temps partiel'}
                </Badge>
              </div>

              <h2 className="text-3xl font-bold text-gray-900">{offreData.titre}</h2>
              
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 pt-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{offreData.lieu}, {offreData.pays}</span>
                </div>
                {hasSalary && (
                  <div className="flex items-center">
                    <BadgeEuro className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{offreData.salaire} {getDeviseSymbol(offreData.devise)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Date limite de candidature</p>
                  <p className="text-gray-900 font-medium">{formatDate(offreData.date_limite)}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                <Users className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Postes à pourvoir</p>
                  <p className="text-gray-900 font-medium">{offreData.nombre_requis}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold text-gray-900">Description du poste</h3>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{offreData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}