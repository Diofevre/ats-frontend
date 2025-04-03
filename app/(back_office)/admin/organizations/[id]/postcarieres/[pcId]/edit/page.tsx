'use client'

import { useParams } from 'next/navigation';
import PostCariereForm from '../../_components/PCForm';
import Nothings from '@/components/nothings';
import { usePostCariere } from '@/hooks/use-postcariere';

export default function EditPostCarierePage() {
  const params = useParams();

  // Parse parameters with safety checks
  const organizationId = typeof params.id === 'string' 
    ? parseInt(params.id) 
    : Array.isArray(params.id) 
      ? parseInt(params.id[0]) 
      : NaN;

  const postId = typeof params.pcId === 'string' 
    ? parseInt(params.pcId) 
    : Array.isArray(params.pcId) 
      ? parseInt(params.pcId[0]) 
      : NaN;

  const { postCarieres, isLoadingPostCarieres } = usePostCariere(organizationId);

  if (isLoadingPostCarieres) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const postCariere = postCarieres?.find(post => post.id === postId);


  if (!postCariere) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Nothings 
          title="Post introuvable" 
        />
      </div>
    );
  }

  return <PostCariereForm initialData={postCariere} isEditing />;
}