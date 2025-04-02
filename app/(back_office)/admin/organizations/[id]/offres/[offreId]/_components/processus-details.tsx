/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react';
import { Loader2, Plus, Play, ChevronUp, ChevronDown, Trash2, FileText, Clock, ArrowUpDown } from 'lucide-react';
import { Processus, TypeProcessus } from '@/lib/types/offre-details';

interface ProcessSectionProps {
  processus: Processus[];
  isEditing: boolean;
  onCreateProcess: (process: CreateProcessDto) => Promise<void>;
  onDeleteProcess: (id: number) => Promise<void>;
  onMoveProcess: (id: number, direction: 'up' | 'down') => Promise<void>;
  onStartProcess: (id: number) => Promise<void>;
  onViewChange?: () => void;
}

interface CreateProcessDto {
  titre: string;
  type: TypeProcessus;
  description: string;
  duree: number;
}

export const ProcessSection = ({
  processus,
  isEditing,
  onCreateProcess,
  onDeleteProcess,
  onMoveProcess,
  onStartProcess,
  onViewChange
}: ProcessSectionProps) => {
  const [isCreatingProcess, setIsCreatingProcess] = useState(false);
  const [processError, setProcessError] = useState('');
  const [newProcess, setNewProcess] = useState<CreateProcessDto>({
    titre: '',
    type: 'ENTRETIEN',
    description: '',
    duree: 30
  });

  const handleCreateProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingProcess(true);
    setProcessError('');

    try {
      await onCreateProcess(newProcess);
      setNewProcess({
        titre: '',
        type: 'ENTRETIEN',
        description: '',
        duree: 30
      });
    } catch (err) {
      console.error('Error creating process:', err);
      setProcessError('Une erreur est survenue lors de la création du processus.');
    } finally {
      setIsCreatingProcess(false);
    }
  };

  const getProcessTypeLabel = (type: TypeProcessus) => {
    switch (type) {
      case 'ENTRETIEN':
        return 'Entretien';
      case 'TEST':
        return 'Test technique';
      case 'TACHE':
        return 'Tâche pratique';
      default:
        return type;
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Processus de recrutement</h2>
        <button
          onClick={onViewChange}
          className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-[12px] hover:bg-[#2C9CC6]/80 transition-colors text-xs"
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Gérer le processus
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleCreateProcess} className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4">Ajouter une étape</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                value={newProcess.titre}
                onChange={(e) => setNewProcess({ ...newProcess, titre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newProcess.type}
                onChange={(e) => setNewProcess({ ...newProcess, type: e.target.value as TypeProcessus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ENTRETIEN">Entretien</option>
                <option value="TEST">Test technique</option>
                <option value="TACHE">Tâche pratique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newProcess.description}
                onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée (minutes)
              </label>
              <input
                type="number"
                value={newProcess.duree}
                onChange={(e) => setNewProcess({ ...newProcess, duree: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
            </div>
          </div>

          {processError && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
              {processError}
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isCreatingProcess}
              className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-lg hover:bg-[#2C9CC6]/80 transition-colors"
            >
              {isCreatingProcess ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {isCreatingProcess ? 'Création...' : 'Ajouter l\'étape'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {processus.map((etape, index) => (
          <div key={etape.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <FileText className="w-4 h-4 mr-1" />
                    {getProcessTypeLabel(etape.type)}
                  </span>
                  <h4 className="text-lg font-medium text-gray-900 ml-3">{etape.titre}</h4>
                </div>
                <p className="mt-1 text-sm text-gray-500">{etape.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{etape.duree} minutes</span>
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onStartProcess(etape.id)}
                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                    title="Démarrer"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onMoveProcess(etape.id, 'up')}
                    disabled={index === 0}
                    className={`p-1 ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Déplacer vers le haut"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onMoveProcess(etape.id, 'down')}
                    disabled={index === processus.length - 1}
                    className={`p-1 ${index === processus.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Déplacer vers le bas"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteProcess(etape.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};