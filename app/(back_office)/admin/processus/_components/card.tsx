'use client'

import React, { useState } from 'react';
import { Clock, Video, Pencil, Trash2, Plus } from 'lucide-react';
import { Processus } from '@/lib/types/processus-admin/processus-admin';

interface ProcessusCardProps {
  processus: Processus;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAddQuiz?: (id: string) => void;
}

export const ProcessusCard: React.FC<ProcessusCardProps> = ({
  processus,
  onEdit,
  onDelete,
  onAddQuiz,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    if (onDelete) {
      try {
        await onDelete(processus.id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#1E1F22] mb-2">{processus.titre}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{processus.description}</p>
            </div>
            <div className="flex space-x-2 ml-4">
              {onEdit && (
                <button
                  onClick={() => onEdit(processus.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  title="Modifier"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Video className="w-4 h-4 mr-2 text-gray-400" />
              <span>{processus.type}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span>{processus.duree} minutes</span>
            </div>
          </div>

          <div className="flex justify-end">
            {onAddQuiz && (
              <button
                onClick={() => onAddQuiz(processus.id)}
                className="inline-flex items-center text-[#1E1F22] hover:text-[#313338] font-medium text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#1E1F22] mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce processus ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};