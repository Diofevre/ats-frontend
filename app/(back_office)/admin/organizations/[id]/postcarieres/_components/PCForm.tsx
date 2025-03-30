'use client'

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CreatePostCariereDto, UpdatePostCariereDto, PostCariere } from '@/lib/types/postcarieres';
import { usePostCariere } from '@/hooks/use-postcariere';
import Image from 'next/image';
import { useOrganization } from '@/hooks/use-organization';
import { Button } from '@/components/ui/button';

interface PostCariereFormProps {
  initialData?: PostCariere;
  isEditing?: boolean;
}

const PostCariereForm = ({ initialData, isEditing }: PostCariereFormProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createPostCariere, updatePostCariere } = usePostCariere();
  const { organizations, isLoadingOrganizations } = useOrganization();

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviewImages: string[] = [];
    const newImages: string[] = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          newPreviewImages.push(reader.result);
          setPreviewImages([...previewImages, ...newPreviewImages]);
        }
      };
      reader.readAsDataURL(file);
      newImages.push(URL.createObjectURL(file));
    });

    setFormData({
      ...formData,
      images: [...(formData.images || []), ...newImages]
    });
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
    try {
      if (isEditing && initialData) {
        await updatePostCariere(initialData.id, formData as UpdatePostCariereDto);
      } else {
        await createPostCariere(formData as CreatePostCariereDto);
      }
      router.push('/admin/organizations/${formData.organisation_id}/postcarrieres');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  if (isLoadingOrganizations) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto rounded-[20px]">
        <h2 className="text-xl font-bold mb-6 uppercase">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              className="w-full px-4 py-3 rounded-[12px] border border-gray-300 focus:border-[#1E1F22] focus:ring-1 focus:ring-[#1E1F22] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
            <textarea
              value={formData.contenu}
              onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
              className="w-full px-4 py-3 rounded-[12px] border border-gray-300 focus:border-[#1E1F22] focus:ring-1 focus:ring-[#1E1F22] transition-colors"
              rows={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Organization</label>
            <select
              value={formData.organisation_id}
              onChange={(e) => setFormData({ ...formData, organisation_id: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-[12px] border border-gray-300 focus:border-[#1E1F22] focus:ring-1 focus:ring-[#1E1F22] transition-colors"
              required
            >
              <option value="">Select an organization</option>
              {organizations?.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className='border'
                variant='ghost'
              >
                Upload Images
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Preview ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1E1F22] text-white rounded-[12px] hover:bg-[#313338] transition-colors"
            >
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
            <Button
              type="button"
              onClick={() => router.back()}
              variant='ghost'
              className='mt-1'
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCariereForm;