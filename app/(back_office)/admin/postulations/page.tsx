'use client'

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useProcessus } from '@/hooks/use-processus';
import { ProcessusSkeleton } from '@/components/back_office/processus/skeleton';
import { ProcessusCard } from '@/components/back_office/processus/card';

const Postulations: React.FC = () => {
  const { processus, isLoading, isError } = useProcessus();

  if (isError) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 p-4 rounded-lg flex items-center text-red-800">
            <AlertCircle className="w-5 h-5 mr-2" />
            Une erreur est survenue lors du chargement des processus.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 uppercase">Mes Postulations</h1>
          <p className="text-sm text-gray-500">
            Suivez l&apos;évolution de vos processus de recrutement
          </p>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <ProcessusSkeleton />
          ) : (
            processus?.map((item) => (
              <ProcessusCard
                key={item.id}
                processus={item}
                onClick={() => console.log('Clicked processus:', item.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Postulations;