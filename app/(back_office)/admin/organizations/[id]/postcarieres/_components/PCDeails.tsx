/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePostCariere } from '@/hooks/use-postcariere';

interface PostCariereDetailsProps {
  id: number;
}

const PostCariereDetails = ({ id }: PostCariereDetailsProps) => {
  const router = useRouter();
  const { postCariere, isLoading, deletePostCariere } = usePostCariere(id);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!postCariere) {
    return <div className="text-center">Post not found</div>;
  }

  const handleDelete = async () => {
    try {
      await deletePostCariere(id);
      router.push('/postcarrieres');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{postCariere.titre}</h1>
        <p className="text-gray-600 mb-6">{postCariere.contenu}</p>
        
        {postCariere.images && postCariere.images.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {postCariere.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Link
            href={`/postcarrieres/${id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <Link
            href="/postcarrieres"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCariereDetails;