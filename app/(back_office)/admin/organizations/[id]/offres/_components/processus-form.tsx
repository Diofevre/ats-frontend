'use client'

import React, { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { CreateProcessusDto } from '@/lib/types/processus-admin/processus-admin';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ProcessusFormProps {
  onSubmit: (data: CreateProcessusDto) => Promise<void>;
  onCancel: () => void;
  offreId: string;
}

export const ProcessusForm: React.FC<ProcessusFormProps> = ({ onSubmit, onCancel, offreId }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateProcessusDto>({
    offre_id: offreId,
    titre: '',
    type: 'VISIO_CONFERENCE',
    description: '',
    duree: 60,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duree' ? parseInt(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 uppercase">CRÉATION DU PROCESSUS</h2>
          <p className="mt-1 text-sm text-gray-500">Définissez les étapes du processus de recrutement.</p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          ⟵ Retour
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <Input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3"
          >
            <option value="VISIO_CONFERENCE">Visioconférence</option>
            <option value="QUIZ">Quiz</option>
            <option value="EXERCICE">Exercice</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Durée (minutes)</label>
          <Input
            type="number"
            name="duree"
            value={formData.duree}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-[#1E1F22] border border-transparent rounded-[12px] hover:bg-[#313338] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              <span>Création en cours...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              <span>Suivant</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};