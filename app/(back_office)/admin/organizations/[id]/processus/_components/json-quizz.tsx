'use client'

import React, { useState } from 'react';
import { AddQuizzDto } from '@/lib/types/processus-admin/processus-admin';

interface JsonQuizFormProps {
  processusId: string;
  onSubmit: (processusId: string, quiz: AddQuizzDto) => Promise<void>;
  onCancel: () => void;
}

export const JsonQuizForm = ({ processusId, onSubmit, onCancel }: JsonQuizFormProps) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const parsedJson = JSON.parse(jsonInput);
      
      // Validate the structure
      if (!Array.isArray(parsedJson.questions)) {
        throw new Error('Le JSON doit contenir un tableau "questions"');
      }

      for (const question of parsedJson.questions) {
        if (!question.label || !Array.isArray(question.reponses)) {
          throw new Error('Chaque question doit avoir un label et un tableau de réponses');
        }

        for (const reponse of question.reponses) {
          if (typeof reponse.label !== 'string' || typeof reponse.is_true !== 'boolean') {
            throw new Error('Chaque réponse doit avoir un label (string) et is_true (boolean)');
          }
        }
      }

      await onSubmit(processusId, parsedJson);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Format JSON invalide');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-[#1E1F22] mb-4">Ajouter un Quiz (JSON)</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JSON du Quiz
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent"
              placeholder={`{
                "questions": [
                  {
                    "label": "Question 1",
                    "reponses": [
                      {
                        "label": "Réponse 1",
                        "is_true": true
                      },
                      {
                        "label": "Réponse 2",
                        "is_true": false
                      }
                    ]
                  }
                ]
              }`}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1E1F22] text-white rounded-md hover:bg-[#313338] transition-colors"
            >
              Ajouter le Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};