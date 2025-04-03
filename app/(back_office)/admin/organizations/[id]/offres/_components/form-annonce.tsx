'use client'

import React, { useState, useMemo } from 'react'; 
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOrganization } from '@/hooks/use-organization';
import { CreateOffreDto, Devise, Offre, TypeTemps } from '@/lib/types/offres/offres.type';
import { Edit, X, Loader2 } from 'lucide-react'; 
import Image from 'next/image'; 
import { Combobox } from './combobox';
import { FileUpload } from '@/components/file-upload';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button'; 

interface OffreFormProps {
  initialData?: Offre;
  onSubmit: (data: CreateOffreDto | Offre) => Promise<void>;
  onCancel?: () => void;
}

// Renamed component to OffreForm for clarity
export default function OffreForm({ initialData, onSubmit }: OffreFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { organizations, isLoadingOrganizations } = useOrganization();

  const [formData, setFormData] = useState<CreateOffreDto | Offre>({
    organisation_id: initialData?.organisation_id || '',
    titre: initialData?.titre || '',
    description: initialData?.description || '',
    date_limite: initialData?.date_limite ? new Date(initialData.date_limite).toISOString().split('T')[0] : '',
    nombre_requis: initialData?.nombre_requis || 1,
    lieu: initialData?.lieu || '',
    pays: initialData?.pays || '',
    type_emploi: initialData?.type_emploi || '',
    type_temps: initialData?.type_temps || 'PLEIN_TEMPS',
    salaire: initialData?.salaire || '',
    devise: initialData?.devise || 'EURO',
    horaire_ouverture: initialData?.horaire_ouverture || '09:00',
    horaire_fermeture: initialData?.horaire_fermeture || '17:00',
    image_url: initialData?.image_url || '',
    ...(initialData && { id: initialData.id }),
  });

  const organizationOptions = useMemo(() => {
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
  // ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.organisation_id) {
      toast.error('Veuillez sélectionner une organisation');
      return;
    }
    if (!formData.type_emploi) {
      toast.error('Veuillez sélectionner un type d\'emploi');
      return;
    }
    if (!formData.type_temps) {
      toast.error('Veuillez sélectionner un type de temps');
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSend = {
          ...formData,
          horaire_ouverture: `${formData.horaire_ouverture}:00`,
          horaire_fermeture: `${formData.horaire_fermeture}:00`,
      };
      await onSubmit(dataToSend);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Une erreur est survenue lors de la soumission du formulaire');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    const processedValue = type === 'number' ? parseInt(value, 10) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: processedValue }));
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

  const handleImageUpload = (fileUrl: string) => {
    setFormData(prev => ({ ...prev, image_url: fileUrl }));
    toast.info("Image sélectionnée. N'oubliez pas de sauvegarder l'offre."); 
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            {initialData ? "Modifier l'offre" : "Créer une nouvelle offre"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {initialData ? "Mettez à jour les détails de l'offre." : "Remplissez les informations ci-dessous."}
          </p>
        </div>
        <span className='flex items-center text-gray-600 hover:text-gray-900 mb-6 cursor-pointer'
          onClick={handleBack}
        >
          ⟵ Retour
        </span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Organisation *</label>
        {isLoadingOrganizations ? (
          <div className="h-10 flex items-center px-3 bg-gray-100 rounded-md border border-gray-200">
            <span className="text-sm text-gray-500 animate-pulse">Chargement...</span>
          </div>
        ) : (
          <Combobox
            value={formData.organisation_id.toString()}
            onChange={handleOrganizationChange}
            options={organizationOptions}
            placeholder="Sélectionnez une organisation"
            emptyMessage="Aucune organisation trouvée"
          />
        )}
      </div>

      <div>
        <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre *</label>
        <Input
          id="titre"
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          required
          className="mt-1"
          placeholder="Ex: Développeur Web Fullstack"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image de l&apos;offre</label>
        {formData.image_url ? (
          <div className="relative group aspect-video w-full max-w-sm border border-gray-200 rounded-lg overflow-hidden">
            <Image
              src={formData.image_url}
              alt="Aperçu de l'offre"
              fill
              className="object-cover"
              onError={() => {
                toast.error("Impossible de charger l'aperçu de l'image. L'URL est peut-être invalide.");
              }}
              unoptimized
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1.5 right-1.5 p-1 bg-white rounded-full shadow-md opacity-70 group-hover:opacity-100 transition-opacity hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              aria-label="Supprimer l'image"
            >
              <X className="h-4 w-4 text-red-600" />
            </button>
          </div>
        ) : (
          <FileUpload
            onUpload={handleImageUpload}
            accept="image"
            className="w-full max-w-sm" 
          />
        )}
        <p className="mt-2 text-xs text-gray-500">Téléchargez une image représentative (logo, bannière...). Max 5MB.</p>
      </div>


      <div>
        <label htmlFor='description' className="block text-sm font-medium text-gray-700">Description *</label>
        <Textarea
          id='description'
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
          className="mt-1"
          placeholder="Décrivez le poste, les missions, le profil recherché..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5 pt-2">
        <div>
          <label htmlFor='date_limite' className="block text-sm font-medium text-gray-700">Date limite *</label>
          <Input
            id='date_limite'
            type="date"
            name="date_limite"
            value={formData.date_limite}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor='nombre_requis' className="block text-sm font-medium text-gray-700">Nombre de postes</label>
          <Input
            id='nombre_requis'
            type="number"
            name="nombre_requis"
            value={formData.nombre_requis}
            onChange={handleChange}
            min="1"
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor='lieu' className="block text-sm font-medium text-gray-700">Lieu *</label>
          <Input
            id='lieu'
            type="text"
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="Ex: Paris, France"
          />
        </div>

        <div>
          <label htmlFor='pays' className="block text-sm font-medium text-gray-700">Pays *</label>
          <Input
            id='pays'
            type="text"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            required
            className="mt-1"
            placeholder="Ex: France"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type d&apos;emploi *</label>
          <Combobox
            value={formData.type_emploi}
            onChange={handleTypeEmploiChange}
            options={typeEmploiOptions}
            placeholder="Sélectionnez..."
            emptyMessage="Aucun type trouvé"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Temps de travail *</label>
          <Combobox
            value={formData.type_temps}
            onChange={handleTypeTempsChange}
            options={typeTempsOptions}
            placeholder="Sélectionnez..."
            emptyMessage="Aucun type trouvé"
          />
        </div>

        <div>
          <label htmlFor='salaire' className="block text-sm font-medium text-gray-700">Salaire</label>
          <Input
            id='salaire'
            type="text"
            name="salaire"
            value={formData.salaire}
            onChange={handleChange}
            className="mt-1"
            placeholder="Ex: 45000 ou Selon profil"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
          <Combobox
            value={formData.devise}
            onChange={handleDeviseChange}
            options={deviseOptions}
            placeholder="Sélectionnez..."
            emptyMessage="Aucune devise trouvée"
          />
        </div>

        <div>
          <label htmlFor='horaire_ouverture' className="block text-sm font-medium text-gray-700">Horaire début</label>
          <Input
            id='horaire_ouverture'
            type="time"
            name="horaire_ouverture"
            value={formData.horaire_ouverture}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor='horaire_fermeture' className="block text-sm font-medium text-gray-700">Horaire fin</label>
          <Input
            id='horaire_fermeture'
            type="time"
            name="horaire_fermeture"
            value={formData.horaire_fermeture}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-5">
        <Button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 text-white min-w-[120px] rounded-full"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : initialData ? (
            <Edit className="w-4 h-4 mr-2" />
          ) : null}
          {isSubmitting ? 'Sauvegarde...' : initialData ? 'Mettre à jour' : '⟶ Suivant'}
        </Button>
      </div>
    </form>
  );
}