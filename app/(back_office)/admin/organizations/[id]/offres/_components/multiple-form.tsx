'use client'

import React, { useState } from 'react';
import { CreateOffreDto, Offre } from '@/lib/types/offres/offres.type';
import { StepIndicator } from './step-indicator';
import { Preview } from './preview';
import { useOffres } from '@/hooks/use-offre';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import OffreForm from './form-annonce';

const STEPS = ['Offre d\'emploi', 'Aperçu'];

export function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [offreData, setOffreData] = useState<CreateOffreDto | null>(null);
  const { createOffre, isLoadings } = useOffres();

  // Get ID from URL
  const { id } = useParams();
  const organizationId = Number(id);

  const handleOffreSubmit = async (data: CreateOffreDto | Offre) => {
    try {
      setOffreData(data as CreateOffreDto);
      setCurrentStep(1);
    } catch (error) {
      console.error('Erreur lors de la validation de l\'offre:', error);
      toast.error('Une erreur est survenue lors de la validation de l\'offre');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    try {
      if (!offreData) {
        throw new Error('Données manquantes');
      }

      await createOffre(offreData);

      setOffreData(null);
      setCurrentStep(0);
      
      toast.success('Offre créée avec succès !');
      router.push(`/admin/organizations/${organizationId}/offres`)
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error('Une erreur est survenue lors de la création de l\'offre');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <StepIndicator currentStep={currentStep} steps={STEPS} />

      <div className="mt-8">
        {/* Étape 0: Formulaire */}
        {currentStep === 0 && (
          <OffreForm
            initialData={offreData}
            mode='create'
            onSubmit={handleOffreSubmit}
          />
        )}

        {/* Étape 1: Aperçu */}
        {currentStep === 1 && offreData && (
          <Preview
            offreData={offreData}
            onBack={handleBack}
            onFinish={handleFinish}
            isLoading={isLoadings}
          />
        )}
      </div>
    </div>
  );
}