'use client'

import React from 'react';
import Link from 'next/link';
import { usePostCariere } from '@/hooks/use-postcariere';
import { useParams } from 'next/navigation';

const PostCarieresList = () => {
  const { postCarieres, isLoadingPostCarieres, deletePostCariere } = usePostCariere();
  const params = useParams();
  const organizationId = params.id;

  if (isLoadingPostCarieres) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold uppercase">Post Carrieres</h1>
        <Link 
          href={`/admin/organizations/${organizationId}/postcarieres/create`}
          className="bg-[#1E1F22] text-white px-4 py-2.5 rounded-[12px] hover:bg-[#313338]"
        >
          Create New Post
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {postCarieres?.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{post.titre}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.contenu}</p>
            <div className="flex space-x-2">
              <Link
                href={`/postcarrieres/${post.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
              <button
                onClick={() => deletePostCariere(post.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCarieresList;