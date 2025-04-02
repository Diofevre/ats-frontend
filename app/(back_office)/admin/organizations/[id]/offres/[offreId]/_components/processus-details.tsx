/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react';
import { Loader2, Plus, Play, ChevronUp, ChevronDown, Trash2, FileText, Clock, ArrowUpDown, X, Upload } from 'lucide-react';

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

interface Processus {
  id: number;
  titre: string;
  type: TypeProcessus;
  description: string;
  duree: number;
}

interface Question {
  label: string;
  reponses: {
    label: string;
    is_true: boolean;
  }[];
}

type TypeProcessus = 'VISIO_CONFERENCE' | 'TACHE' | 'QUESTIONNAIRE';

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const ProcessSection = ({
  processus,
  isEditing,
  onCreateProcess,
  onDeleteProcess,
  onMoveProcess,
  onStartProcess,
  onViewChange
}: ProcessSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingProcess, setIsCreatingProcess] = useState(false);
  const [processError, setProcessError] = useState('');
  const [uploadingQuizId, setUploadingQuizId] = useState<number | null>(null);
  const [movingProcessId, setMovingProcessId] = useState<number | null>(null);
  const [newProcess, setNewProcess] = useState<CreateProcessDto>({
    titre: '',
    type: 'QUESTIONNAIRE',
    description: '',
    duree: 30
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, processId: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingQuizId(processId);
      setProcessError('');
      
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const questions = JSON.parse(event.target?.result as string);
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/processus/${processId}/quizz`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(questions),
            });
            if (!response.ok) throw new Error('Failed to upload questions');
          } catch (error) {
            console.log(error);
            setProcessError('Erreur lors de l\'upload des questions');
          }
        } catch (error) {
          console.log(error);
          setProcessError('Le fichier JSON est invalide');
        } finally {
          setUploadingQuizId(null);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleMoveProcess = async (id: number, direction: 'up' | 'down') => {
    setMovingProcessId(id);
    try {
      await onMoveProcess(id, direction);
    } finally {
      setMovingProcessId(null);
    }
  };

  const handleCreateProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingProcess(true);
    setProcessError('');

    try {
      await onCreateProcess(newProcess);
      setNewProcess({
        titre: '',
        type: 'QUESTIONNAIRE',
        description: '',
        duree: 30
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating process:', err);
      setProcessError('Une erreur est survenue lors de la création du processus.');
    } finally {
      setIsCreatingProcess(false);
    }
  };

  const getProcessTypeLabel = (type: TypeProcessus) => {
    switch (type) {
      case 'VISIO_CONFERENCE':
        return 'Entretien';
      case 'TACHE':
        return 'Test technique';
      case 'QUESTIONNAIRE':
        return 'Questionnaire';
      default:
        return type;
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Processus de recrutement</h2>
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-[12px] hover:bg-[#2C9CC6]/80 transition-colors text-xs"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une étape
            </button>
          )}
          <button
            onClick={onViewChange}
            className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-[12px] hover:bg-[#2C9CC6]/80 transition-colors text-xs"
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Gérer le processus
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleCreateProcess} className="p-6">
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
                <option value="VISIO_CONFERENCE">Entretien</option>
                <option value="TACHE">Test technique</option>
                <option value="QUESTIONNAIRE">Questionnaire</option>
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

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isCreatingProcess}
              className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-lg hover:bg-[#2C9CC6]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      </Modal>

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
                  {etape.type === 'QUESTIONNAIRE' && (
                    <>
                      <input
                        type="file"
                        accept=".json"
                        id={`upload-${etape.id}`}
                        onChange={(e) => handleFileUpload(e, etape.id)}
                        className="hidden"
                      />
                      <button
                        onClick={() => document.getElementById(`upload-${etape.id}`)?.click()}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Uploader les questions"
                        disabled={uploadingQuizId === etape.id}
                      >
                        {uploadingQuizId === etape.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onStartProcess(etape.id)}
                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                    title="Démarrer"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveProcess(etape.id, 'up')}
                    disabled={index === 0 || movingProcessId === etape.id}
                    className={`p-1 ${index === 0 || movingProcessId === etape.id ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Déplacer vers le haut"
                  >
                    {movingProcessId === etape.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleMoveProcess(etape.id, 'down')}
                    disabled={index === processus.length - 1 || movingProcessId === etape.id}
                    className={`p-1 ${index === processus.length - 1 || movingProcessId === etape.id ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Déplacer vers le bas"
                  >
                    {movingProcessId === etape.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
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

export default ProcessSection;
export type { TypeProcessus, Question };