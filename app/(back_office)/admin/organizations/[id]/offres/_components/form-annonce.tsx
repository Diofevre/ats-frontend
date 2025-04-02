'use client'

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOrganization } from '@/hooks/use-organization';
import { CreateOffreDto, Devise, Offre, TypeTemps } from '@/lib/types/offres/offres.type';
import { Edit, ImageIcon, Plus, Upload } from 'lucide-react';
import React, { useRef } from 'react';
import { Combobox } from '../_components/combobox';

interface OffreFormProps {
  initialData?: Offre;
  onSubmit: (data: CreateOffreDto | Offre) => Promise<void>;
  onCancel: () => void;
}

export default function CreateForm({ initialData, onSubmit }: OffreFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { organizations, isLoadingOrganizations } = useOrganization();
  
  const [formData, setFormData] = React.useState<CreateOffreDto>({
    organisation_id: initialData?.organisation_id || '',
    titre: initialData?.titre || '',
    description: initialData?.description || '',
    date_limite: initialData?.date_limite?.split('T')[0] || '',
    nombre_requis: initialData?.nombre_requis || 1,
    lieu: initialData?.lieu || '',
    pays: initialData?.pays || '',
    type_emploi: initialData?.type_emploi || '',
    type_temps: initialData?.type_temps || 'PLEIN_TEMPS',
    salaire: initialData?.salaire || '',
    devise: initialData?.devise || 'EURO',
    horaire_ouverture: initialData?.horaire_ouverture || '09:00:00',
    horaire_fermeture: initialData?.horaire_fermeture || '17:00:00',
    image_url: initialData?.image_url || '',
  });

  const organizationOptions = React.useMemo(() => {
    return organizations?.map(org => ({
      value: org.id.toString(),
      label: org.nom
    })) || [];
  }, [organizations]);

  const typeEmploiOptions = [
    { value: 'CDI', label: 'CDI' },
    { value: 'CDD', label: 'CDD' },
    { value: 'STAGE', label: 'Stage' },
    { value: 'ALTERNANCE', label: 'Alternance' },
    { value: 'FREELANCE', label: 'Freelance' },
    { value: 'INTERIM', label: 'Intérim' },
  ];

  const typeTempsOptions = [
    { value: 'PLEIN_TEMPS', label: 'Temps plein' },
    { value: 'TEMPS_PARTIEL', label: 'Temps partiel' },
  ];

  const deviseOptions = [
    { value: 'EURO', label: 'Euro (€)' },
    { value: 'DOLLAR', label: 'Dollar ($)' },
    { value: 'DOLLAR_CANADIEN', label: 'Dollar Canadien (C$)' },
    { value: 'LIVRE', label: 'Livre Sterling (£)' },
    { value: 'YEN', label: 'Yen (¥)' },
    { value: 'ROUPIE', label: 'Roupie (₹)' },
    { value: 'ARIARY', label: 'Ariary (Ar)' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.organisation_id) {
      alert('Veuillez sélectionner une organisation');
      return;
    }

    if (!formData.type_emploi) {
      alert('Veuillez sélectionner un type d\'emploi');
      return;
    }

    if (!formData.type_temps) {
      alert('Veuillez sélectionner un type d\'emploi');
      return;
    }

    setIsSubmitting(true);
    try {
      if (initialData) {
        await onSubmit({
          ...initialData,
          ...formData,
        });
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue lors de la création de l\'offre');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'image_url') {
      setImageError(false);
    }
  };

  const handleOrganizationChange = (value: string) => {
    setFormData(prev => ({ ...prev, organisation_id: value }));
  };

  const handleTypeEmploiChange = (value: string) => {
    setFormData(prev => ({ ...prev, type_emploi: value }));
  };

  const handleTypeTempsChange = (value: string) => {
    setFormData(prev => ({ ...prev, type_temps: value as TypeTemps }));
  };

  const handleDeviseChange = (value: string) => {
    setFormData(prev => ({ ...prev, devise: value as Devise }));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, image_url: result }));
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 uppercase">CRÉATION DE L&apos;ANNONCE</h2>
          <p className="mt-1 text-sm text-gray-500">Organisez et gérez vos annonces facilement.</p>
        </div>

        {initialData ? (
          <>
          </>
        ) : (
          <span
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
          >
            ⟵
            Retour aux offres
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
          {isLoadingOrganizations ? (
            <div className="h-12 flex items-center px-3 bg-gray-50 rounded-md">
              <span className="text-sm text-gray-500">Chargement des organisations...</span>
            </div>
          ) : (
            <Combobox
              value={formData.organisation_id}
              onChange={handleOrganizationChange}
              options={organizationOptions}
              placeholder="Sélectionnez une organisation"
              emptyMessage="Aucune organisation trouvée"
            />
          )}
        </div>

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
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <Input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            placeholder='file'
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div 
            className="mt-2 cursor-pointer"
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
          >
            {formData.image_url ? (
              imageError ? (
                <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg border border-dashed border-gray-300 hover:bg-gray-50 transition-colors">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Image non valide</p>
                    <p className="mt-1 text-xs text-gray-400">Cliquez pour télécharger une image</p>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.image_url}
                    alt="Aperçu de l'image"
                    onError={handleImageError}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg border border-dashed border-gray-300 hover:bg-gray-50 transition-colors">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Aucune image sélectionnée</p>
                  <p className="mt-1 text-xs text-gray-400">Cliquez pour télécharger une image</p>
                </div>
              </div>
            )}
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date limite</label>
            <Input
              type="date"
              name="date_limite"
              value={formData.date_limite}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre requis</label>
            <Input
              type="number"
              name="nombre_requis"
              value={formData.nombre_requis}
              onChange={handleChange}
              min="1"
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lieu</label>
            <Input
              type="text"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pays</label>
            <Input
              type="text"
              name="pays"
              value={formData.pays}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type d&apos;emploi</label>
            <Combobox
              value={formData.type_emploi}
              onChange={handleTypeEmploiChange}
              options={typeEmploiOptions}
              placeholder="Sélectionnez un type d'emploi"
              emptyMessage="Aucun type trouvé"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat</label>
            <Combobox
              value={formData.type_temps}
              onChange={handleTypeTempsChange}
              options={typeTempsOptions}
              placeholder="Sélectionnez un type d'emploi"
              emptyMessage="Aucun type trouvé"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Salaire</label>
            <Input
              type="text"
              name="salaire"
              value={formData.salaire}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
            <Combobox
              value={formData.devise}
              onChange={handleDeviseChange}
              options={deviseOptions}
              placeholder="Sélectionnez une devise"
              emptyMessage="Aucune devise trouvée"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Heure d&apos;ouverture du travail</label>
            <Input
              type="time"
              name="horaire_ouverture"
              value={formData.horaire_ouverture.slice(0, 5)}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Heure de fermeture du travail</label>
            <Input
              type="time"
              name="horaire_fermeture"
              value={formData.horaire_fermeture.slice(0, 5)}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        {initialData && (
          <button
            type="button"
            onClick={handleBack}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[12px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-[#1E1F22] border border-transparent rounded-[12px] hover:bg-[#313338] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Création en cours...</span>
            </>
          ) : initialData ? (
            <>
              <Edit className="w-4 h-4 mr-2" />
              <span>Modifier</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              <span>Créer</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}