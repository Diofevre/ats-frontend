'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreatePostCariereDto, UpdatePostCariereDto, PostCariere } from '@/lib/types/postcarieres';
import { usePostCariere } from '@/hooks/use-postcariere';
import { useOrganization } from '@/hooks/use-organization';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, Loader2, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { Combobox } from '../../offres/_components/combobox';
import { FileUpload } from '@/components/file-upload';

interface PostCariereFormProps {
  initialData?: PostCariere;
  isEditing?: boolean;
}

const PostCariereForm = ({ initialData, isEditing }: PostCariereFormProps) => {
  const router = useRouter();
  const { createPostCariere, updatePostCariere } = usePostCariere();
  const { organizations, isLoadingOrganizations } = useOrganization();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreatePostCariereDto | UpdatePostCariereDto>(
    initialData || {
      titre: '',
      contenu: '',
      organisation_id: 0,
      images: []
    }
  );

  const [previewImages, setPreviewImages] = useState<string[]>(
    initialData?.images || []
  );

  const organizationOptions = React.useMemo(() => {
    return organizations?.map(org => ({
      value: org.id.toString(),
      label: org.nom
    })) || [];
  }, [organizations]);

  const handleImageUpload = (fileUrl: string) => {
    setPreviewImages(prev => [...prev, fileUrl]);
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), fileUrl]
    }));
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organisation_id) {
      toast.error("Please select an organization");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && initialData) {
        await updatePostCariere(initialData.id, formData as UpdatePostCariereDto);
        toast.success("Post updated successfully");
      } else {
        await createPostCariere(formData as CreatePostCariereDto);
        toast.success("Post created successfully");
      }

      router.push(`/admin/organizations/${formData.organisation_id}/postcarieres`);
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error("Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingOrganizations) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-6">
                <div className="h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          ⟵
          Back to Career Posts
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-gray-900 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {isEditing ? 'Edit Career Post' : 'Create New Career Post'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {isEditing ? 'Update the details of your career post' : 'Create a new career opportunity post'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
              <Combobox
                value={formData.organisation_id?.toString() || ''}
                onChange={(value) => setFormData({ ...formData, organisation_id: parseInt(value) })}
                options={organizationOptions}
                placeholder="Select an organization"
                emptyMessage="No organizations found"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 
                  focus:ring-gray-900 transition-colors placeholder-gray-400 text-gray-900"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={formData.contenu}
                onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-1 
                  focus:ring-gray-900 transition-colors placeholder-gray-400 text-gray-900 min-h-[160px]"
                placeholder="Describe the career opportunity..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Images <span className="text-gray-400">(Max 5 images, 5MB each)</span>
              </label>
              
              {previewImages.length < 5 && (
                <FileUpload
                  onUpload={handleImageUpload}
                  accept="image"
                  className="mb-4"
                />
              )}

              {previewImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {previewImages.map((image, index) => (
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

            <div className="flex items-center gap-2 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 h-11"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className="px-6 py-3 rounded-full h-11"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCariereForm;