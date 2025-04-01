'use client'

import React, { useState } from 'react';
import { Building2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOrganization } from '@/hooks/use-organization';

interface CreateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrganizationFormData {
  nom: string;
  adresse: string;
  ville: string;
}

export default function CreateOrganizationModal({ 
  isOpen, 
  onClose 
}: CreateOrganizationModalProps) {
  const { createOrganization } = useOrganization();
  const [formData, setFormData] = useState<OrganizationFormData>({
    nom: '',
    adresse: '',
    ville: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await createOrganization(formData);
      onClose();
      setFormData({ nom: '', adresse: '', ville: '' });
    } catch (error) {
      console.error('Error creating organization:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Building2 className="w-6 h-6 text-[#1E1F22] mr-2" />
              <h2 className="text-xl font-semibold text-[#1E1F22]">
                Nouvelle organisation
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l&apos;organisation
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent"
                placeholder="Entrez le nom"
              />
            </div>

            <div>
              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent"
                placeholder="Entrez l'adresse"
              />
            </div>

            <div>
              <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                type="text"
                id="ville"
                name="ville"
                value={formData.ville}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent"
                placeholder="Entrez la ville"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E1F22]"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-white bg-[#1E1F22] rounded-md",
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#313338] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E1F22]"
                )}
              >
                {isSubmitting ? 'Création...' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}