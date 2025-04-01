'use client'

import { usePostCariere } from '@/hooks/use-postcariere';
import { useParams } from 'next/navigation';
import PostCariereForm from '../../_components/PCForm';

export default function EditPostCarierePage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const { postCariere, isLoading } = usePostCariere(id);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!postCariere) {
    return <div className="text-center">Post not found</div>;
  }

  return <PostCariereForm initialData={postCariere} isEditing />;
}