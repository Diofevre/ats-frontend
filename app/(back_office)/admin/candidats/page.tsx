'use client'

import { CandidateDetails } from '@/components/back_office/candidats/details';
import { CandidatesList } from '@/components/back_office/candidats/list';
import { WelcomeHeader } from '@/components/back_office/candidats/welcome';
import { useCandidates } from '@/hooks/use-candidats';
import { useState } from 'react';

export default function CandidatesPage() {
  const { candidates, isLoading, deleteCandidate } = useCandidates();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="container mx-auto py-10 space-y-8">
      <WelcomeHeader />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des Candidats</h1>
        </div>
        
        <CandidatesList
          candidates={candidates}
          isLoading={isLoading}
          onDelete={deleteCandidate}
          onView={setSelectedId}
        />
      </div>

      <CandidateDetails
        candidateId={selectedId}
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}