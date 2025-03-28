/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react';
import { useProcessus } from '@/hooks/use-processus-admin';
import { CreateProcessusDto } from '@/lib/types/processus-admin/processus-admin';
import { ProcessusCard } from './_components/card';
import { ProcessusForm } from './_components/form';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { JsonQuizForm } from './_components/json-quizz';

const ProcessusSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-4"></div>
    <div className="space-y-3">
      <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded-full w-4/6"></div>
      <div className="h-3 bg-gray-200 rounded-full w-3/6"></div>
    </div>
    <div className="mt-6 flex justify-end">
      <div className="h-8 bg-gray-200 rounded-full w-24"></div>
    </div>
  </div>
);

const Processus = () => {
  const { processus, isLoading, isError, createProcessus, deleteProcessus, addQuizz } = useProcessus();
  const [showForm, setShowForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [selectedProcessusId, setSelectedProcessusId] = useState<string | null>(null);

  const handleCreate = async (data: CreateProcessusDto) => {
    try {
      await createProcessus(data);
      setShowForm(false);
    } catch (error) {
      console.error('Erreur lors de la création du processus:', error);
    }
  };

  const handleShowQuizForm = (processusId: string) => {
    setSelectedProcessusId(processusId);
    setShowQuizForm(true);
  };

  const handleSubmitQuiz = async (processusId: string, quiz: any) => {
    try {
      await addQuizz(processusId, quiz);
      setShowQuizForm(false);
      setSelectedProcessusId(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du quiz:", error);
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Erreur</div>
          <p className="text-gray-600">Une erreur est survenue lors du chargement des données.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-[#1E1F22] uppercase">Liste des Processus</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2.5 bg-[#1E1F22] text-white rounded-[12px] hover:bg-[#313338] transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter Processus
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ProcessusSkeleton key={index} />
            ))}
          </div>
        ) : processus?.length === 0 ? (
          <div className="p-12 text-center max-w-2xl mx-auto">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <Image 
                src="/processus.png"
                alt="Aucun processus"
                layout="fill"
                objectFit="contain"
                className="opacity-80"
              />
            </div>
            <h2 className="text-xl font-semibold text-[#1E1F22] mb-2">Aucun processus</h2>
            <p className="text-gray-600 text-lg">Commencez par créer votre premier processus</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processus?.map((item) => (
              <ProcessusCard
                key={item.id}
                processus={item}
                onDelete={deleteProcessus}
                onAddQuiz={() => handleShowQuizForm(item.id)}
              />
            ))}
          </div>
        )}

        {showForm && (
          <ProcessusForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showQuizForm && selectedProcessusId && (
          <JsonQuizForm
            processusId={selectedProcessusId}
            onSubmit={handleSubmitQuiz}
            onCancel={() => {
              setShowQuizForm(false);
              setSelectedProcessusId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Processus;