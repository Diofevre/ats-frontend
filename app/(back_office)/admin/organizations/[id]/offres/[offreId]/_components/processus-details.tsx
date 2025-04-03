/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react';
import { Loader2, Plus, Play, Trash2, FileText, Clock, ArrowUpDown, X, Upload, CheckCircle } from 'lucide-react';
import { Processus, StatusOffre } from '@/lib/types/offre-details';
import { Combobox } from '../../_components/combobox';

interface ProcessSectionProps {
  processus: Processus[];
  isEditing: boolean;
  offreStatus: StatusOffre;
  onCreateProcess: (process: CreateProcessDto) => Promise<void>;
  onDeleteProcess: (id: number) => Promise<void>;
  onStartProcess: (id: number) => Promise<void>;
  onTerminateProcess?: (id: number) => Promise<void>;
  onViewChange?: () => void;
}

interface CreateProcessDto {
  titre: string;
  type: TypeProcessus;
  description: string;
  duree: number;
  start_at: string;
}

interface Question {
  label: string;
  reponses: {
    label: string;
    is_true: boolean;
  }[];
}

type TypeProcessus = 'VISIO_CONFERENCE' | 'TACHE' | 'QUESTIONNAIRE';

const processTypeOptions = [
  { value: 'VISIO_CONFERENCE', label: 'Entretien' },
  { value: 'TACHE', label: 'Test technique' },
  { value: 'QUESTIONNAIRE', label: 'Questionnaire' }
];

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
  offreStatus,
  isEditing,
  onCreateProcess,
  onDeleteProcess,
  onStartProcess,
  onTerminateProcess,
  onViewChange
}: ProcessSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingProcess, setIsCreatingProcess] = useState(false);
  const [processError, setProcessError] = useState('');
  const [uploadingQuizId, setUploadingQuizId] = useState<number | null>(null);
  const [startingProcessId, setStartingProcessId] = useState<number | null>(null);
  const [terminatingProcessId, setTerminatingProcessId] = useState<number | null>(null);
  const [deletingProcessId, setDeletingProcessId] = useState<number | null>(null);
  const [newProcess, setNewProcess] = useState<CreateProcessDto>({
    titre: '',
    type: 'QUESTIONNAIRE',
    description: '',
    duree: 30,
    start_at: new Date().toISOString().slice(0, 16),
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

  const handleStartProcess = async (id: number) => {
    setStartingProcessId(id);
    try {
      await onStartProcess(id);
    } finally {
      setStartingProcessId(null);
    }
  };

  const handleDeleteProcess = async (id: number) => {
    setDeletingProcessId(id);
    try {
      await onDeleteProcess(id);
    } finally {
      setDeletingProcessId(null);
    }
  };

  const handleCreateProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingProcess(true);
    setProcessError('');

    try {
      // Create a new object with the formatted date
      const processData = {
        ...newProcess,
        start_at: new Date(newProcess.start_at).toISOString(), // Convert to ISO string
      };

      await onCreateProcess(processData);
      setNewProcess({
        titre: '',
        type: 'QUESTIONNAIRE',
        description: '',
        duree: 30,
        start_at: new Date().toISOString().slice(0, 16),
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating process:', err);
      setProcessError('Une erreur est survenue lors de la création du processus.');
    } finally {
      setIsCreatingProcess(false);
    }
  };

  const handleTerminateProcess = async (id: number) => {
    if (!onTerminateProcess) return;
    setTerminatingProcessId(id);
    try {
      await onTerminateProcess(id);
    } finally {
      setTerminatingProcessId(null);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'A_VENIR':
        return 'bg-gray-100 text-gray-800';
      case 'EN_COURS':
        return 'bg-blue-100 text-blue-800';
      case 'TERMINE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non défini';
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shouldShowStartButton = (etape: Processus) => {
    return offreStatus === 'FERME' && etape.statut === 'A_VENIR';
  };

  const shouldShowUploadButton = (etape: Processus) => {
    return offreStatus === 'CREE';
  };

  const shouldShowTerminateButton = (etape: Processus) => {
    return offreStatus === 'FERME' && etape.statut === 'EN_COURS';
  };

  const shouldShowDeleteButton = (etape: Processus) => {
    return offreStatus === 'CREE';
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold uppercase">Processus de recrutement</h2>
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
              <Combobox
                options={processTypeOptions}
                value={newProcess.type}
                onChange={(value) => setNewProcess({ ...newProcess, type: value as TypeProcessus })}
                placeholder="Sélectionner un type"
              />
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
                Date et heure de début
              </label>
              <input
                type="datetime-local"
                value={newProcess.start_at}
                onChange={(e) => setNewProcess({ ...newProcess, start_at: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            {offreStatus === 'CREE' && (
              <button
                type="submit"
                disabled={isCreatingProcess}
                className="inline-flex items-center px-4 py-2 bg-[#2C9CC6] text-white rounded-full text-xs hover:bg-[#2C9CC6]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingProcess ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {isCreatingProcess ? 'Création...' : 'Ajouter l\'étape'}
              </button>
              )}
          </div>
        </form>
      </Modal>

      <div className="space-y-4">
        {processus.map((etape) => (
          <div key={etape.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <FileText className="w-3 h-3 mr-1" />
                    {getProcessTypeLabel(etape.type)}
                  </span>
                  <h4 className="text-lg font-medium text-gray-900 ml-3">{etape.titre}</h4>
                </div>
                <p className="mt-1 text-sm text-gray-500">{etape.description}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{etape.duree} minutes</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Début: {formatDate(etape.start_at)}
                  </div>
                </div>
                <div className="mt-2 flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(etape.statut)}`}>
                    { 
                      etape.statut === 'A_VENIR' ? 'À venir' : 
                      etape.statut === 'EN_COURS' ? 'En cours' : 
                      etape.statut === 'TERMINE' ? 'Terminé' : etape.statut
                    }
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center space-x-2">
                  {etape.type === 'QUESTIONNAIRE' && shouldShowUploadButton(etape) && (
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
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
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
                  {shouldShowStartButton(etape) && (
                    <button
                      onClick={() => handleStartProcess(etape.id)}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50"
                      title="Démarrer"
                      disabled={startingProcessId === etape.id}
                    >
                      {startingProcessId === etape.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  {shouldShowTerminateButton(etape) && (
                    <button
                      onClick={() => handleTerminateProcess(etape.id)}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50"
                      title="Terminer"
                      disabled={terminatingProcessId === etape.id}
                    >
                      {terminatingProcessId === etape.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  {shouldShowDeleteButton(etape) && (
                    <button
                      onClick={() => handleDeleteProcess(etape.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      title="Supprimer"
                      disabled={deletingProcessId === etape.id}
                    >
                      {deletingProcessId === etape.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  )}
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