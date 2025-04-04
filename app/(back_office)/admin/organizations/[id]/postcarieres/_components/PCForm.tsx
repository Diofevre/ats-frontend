'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CreatePostCariereDto, UpdatePostCariereDto, PostCariere } from '@/lib/types/postcarieres';
import { usePostCariere } from '@/hooks/use-postcariere';
import { useOrganization } from '@/hooks/use-organization';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, Loader2, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { Combobox } from '../../offres/_components/combobox';
import { FileUpload } from '@/components/file-upload';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCariereSchema, PostCariereFormValues } from '@/lib/schemas/postcariere';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PostCariereFormProps {
  initialData?: PostCariere;
  isEditing?: boolean;
}

const PostCariereForm = ({ initialData, isEditing }: PostCariereFormProps) => {
  const router = useRouter();
  const { createPostCariere, updatePostCariere } = usePostCariere();
  const { organizations } = useOrganization();

  const { id } = useParams();
  const organizationId = Number(id);

  const form = useForm<PostCariereFormValues>({
    resolver: zodResolver(postCariereSchema),
    defaultValues: {
      titre: initialData?.titre || '',
      contenu: initialData?.contenu || '',
      organisation_id: initialData?.organisation_id || organizationId,
      images: initialData?.images || [],
    }
  });

  const organizationOptions = React.useMemo(() => {
    return organizations?.map(org => ({
      value: org.id.toString(),
      label: org.nom
    })) || [];
  }, [organizations]);

  const handleImageUpload = (fileUrl: string) => {
    const currentImages = form.getValues('images') || [];
    form.setValue('images', [...currentImages, fileUrl], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues('images');
    form.setValue('images', currentImages.filter((_, i) => i !== index), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  // This function is called when the form is submitted
  const onSubmit = async (data: PostCariereFormValues) => {
    try {
      const formData = {
        ...data,
        images: data.images || [],
        organisation_id: organizationId
      };

      if (isEditing && initialData) {
        await updatePostCariere(initialData.id, formData as UpdatePostCariereDto);
        toast.success("Post mis à jour avec succès");
      } else {
        await createPostCariere(formData as CreatePostCariereDto);
        toast.success("Post créé avec succès");
      }

      router.push(`/admin/organizations/${formData.organisation_id}/postcarieres`);
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error("Échec de l'enregistrement du post");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 group"
        >
          ⟵
          Retour
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-gray-900 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 uppercase">
              {isEditing ? `Modifier l'offre de carrière` : 'Créer une nouvelle offre de carrière'}
            </h1>
            <p className="text-sm text-gray-500 mt-1 uppercase">
              {isEditing ? 'Mettre à jour les détails de votre offre de carrière' : 'Créer une nouvelle opportunité de carrière'}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className='hidden'>
              <FormField
                control={form.control}
                name="organisation_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organisation</FormLabel>
                    <FormControl>
                      <Combobox
                        value={field.value.toString()}
                        onChange={(value) => field.onChange(parseInt(value))}
                        options={organizationOptions}
                        placeholder="Sélectionner une organisation"
                        emptyMessage="Aucune organisation trouvée"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="titre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Entrez le titre du post"
                      className="rounded-xl h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contenu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenu</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Décrivez l'opportunité de carrière..."
                      className="rounded-xl min-h-[160px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Images <span className="text-gray-400">(Max 5 images, 5MB chacune)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {(field.value?.length || 0) < 5 && (
                        <FileUpload
                          onUpload={handleImageUpload}
                          accept="image"
                        />
                      )}

                      {field.value && field.value.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {field.value.map((image, index) => (
                            <div key={index} className="relative group aspect-video">
                              <Image
                                src={image}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="rounded-xl object-cover"
                                unoptimized
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm opacity-0 
                                  group-hover:opacity-100 transition-opacity hover:bg-red-50"
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2 pt-6">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 h-11"
              >
                {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {form.formState.isSubmitting ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className="px-6 py-3 rounded-full h-11"
              >
                Annuler
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostCariereForm;