'use client'

import { CandidateDetails } from '@/components/back_office/candidats/details';
import { CandidatesList } from '@/components/back_office/candidats/list';
import { useCandidates } from '@/hooks/use-candidats';
import { useState } from 'react';

export default function CandidatesPage() {
  const { candidates, isLoading, deleteCandidate } = useCandidates();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className='min-h-screen'>
      <div className="container mx-auto">
          {/* Enhanced Sticky Header */}
          <div className="sticky top-0 z-10 mb-8 bg-white/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent uppercase">
                    Offres d&apos;emploi
                  </h1>
                  <div className="hidden sm:block h-8 w-[1px] bg-gray-200"></div>
                  <span className="hidden sm:block text-sm text-gray-500">
                    Gestion des candidats
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <CandidatesList
            candidates={candidates}
            isLoading={isLoading}
            onDelete={deleteCandidate}
            onView={setSelectedId}
          />

        <CandidateDetails
          candidateId={selectedId}
          isOpen={!!selectedId}
          onClose={() => setSelectedId(null)}
        />
      </div>
    </div>
  );
}