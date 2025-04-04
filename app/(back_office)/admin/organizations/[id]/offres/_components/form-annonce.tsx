'use client'

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOrganization } from '@/hooks/use-organization';
import { CreateOffreDto, Offre, TypeEmploi } from '@/lib/types/offres/offres.type';
import { createOffreSchema, updateOffreSchema, type CreateOffreSchema } from '@/lib/schemas/offre';
import { Edit, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { Combobox } from './combobox';
import { FileUpload } from '@/components/file-upload';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from 'next/navigation';

interface OffreFormProps {
  initialData?: Offre;
  onSubmit: (data: CreateOffreDto | Offre) => Promise<void>;
  onCancel?: () => void;
}

export default function OffreForm({ initialData, onSubmit }: OffreFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { organizations, isLoadingOrganizations } = useOrganization();

  const { id } = useParams();
  const organizationId = Number(id);

  const form = useForm<CreateOffreSchema>({
    resolver: zodResolver(initialData ? updateOffreSchema : createOffreSchema),
    defaultValues: {
      organisation_id: initialData?.organisation_id || organizationId.toString(),
      titre: initialData?.titre || '',
      description: initialData?.description || '',
      date_limite: initialData?.date_limite ? new Date(initialData.date_limite).toISOString().split('T')[0] : '',
      nombre_requis: initialData?.nombre_requis || 1,
      lieu: initialData?.lieu || '',
      pays: initialData?.pays || '',
      type_emploi: (initialData?.type_emploi as TypeEmploi) || 'CDI',
      type_temps: initialData?.type_temps || 'PLEIN_TEMPS',
      salaire: initialData?.salaire || '',
      devise: initialData?.devise || 'EURO',
      image_url: initialData?.image_url || '',
      ...(initialData && { id: initialData.id }),
    },
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
  ];

  const typeTempsOptions = [
    { value: 'PLEIN_TEMPS', label: 'Temps plein' },
    { value: 'TEMPS_PARTIEL', label: 'Temps partiel' },
  ];

  const deviseOptions = [
    { value: 'EURO', label: 'Euro (€)' },
    { value: 'DOLLAR', label: 'Dollar ($)' },
    { value: 'DOLLAR_CANADIEN', label: 'Dollar Canadien (CAD)' },
    { value: 'LIVRE', label: 'Livre Sterling (£)' },
    { value: 'YEN', label: 'Yen (¥)' },
    { value: 'ROUPIE', label: 'Roupie (₹)' },
    { value: 'ARIARY', label: 'Ariary (Ar)' },
  ];

  const onFormSubmit = async (formData: CreateOffreSchema) => {
    try {
      setIsSubmitting(true);
      if (initialData) {
        await onSubmit({
          ...initialData,
          ...formData,
        });
        toast.success("Offre modifiée avec succès");
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Une erreur est survenue lors de la soumission du formulaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (fileUrl: string) => {
    form.setValue('image_url', fileUrl);
    toast.info("Image sélectionnée. N'oubliez pas de sauvegarder l'offre.");
  };

  const removeImage = () => {
    form.setValue('image_url', '');
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6 max-w-4xl mx-auto bg-white">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 uppercase">
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

        {/* Form fields */}
        <FormField
          control={form.control}
          name="organisation_id"
          render={({ field }) => (
            <FormItem className='hidden'>
              <FormLabel>Organisation *</FormLabel>
              <FormControl>
                {isLoadingOrganizations ? (
                  <div className="h-10 flex items-center px-3 bg-gray-100 rounded-md border border-gray-200">
                    <span className="text-sm text-gray-500 animate-pulse">Chargement...</span>
                  </div>
                ) : (
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    options={organizationOptions}
                    placeholder="Sélectionnez une organisation"
                    emptyMessage="Aucune organisation trouvée"
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="titre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Développeur Web Fullstack"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel className="block text-sm font-medium text-gray-700 mb-2">Image de l&apos;offre</FormLabel>
          {form.watch('image_url') ? (
            <div className="relative group aspect-video w-full max-w-sm border border-gray-200 rounded-lg overflow-hidden">
              <Image
                src={form.watch('image_url') || ''}
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez le poste, les missions, le profil recherché..."
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5 pt-2">
          <FormField
            control={form.control}
            name="date_limite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date limite *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nombre_requis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de postes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lieu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu *</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Paris, France" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays *</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: France" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type_emploi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d&apos;emploi *</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    options={typeEmploiOptions}
                    placeholder="Sélectionnez..."
                    emptyMessage="Aucun type trouvé"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type_temps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temps de travail *</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    options={typeTempsOptions}
                    placeholder="Sélectionnez..."
                    emptyMessage="Aucun type trouvé"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salaire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salaire</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 45000 ou Selon profil" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="devise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Devise</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    options={deviseOptions}
                    placeholder="Sélectionnez..."
                    emptyMessage="Aucune devise trouvée"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
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
                <span>En cours...</span>
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
          </Button>
        </div>
      </form>
    </Form>
  );
}