'use client';

import React from 'react';
import Link from 'next/link';
import { usePostCariere } from '@/hooks/use-postcariere';
import { useParams } from 'next/navigation';
import Nothings from '@/components/nothings';
import { Briefcase, Trash2, Eye, Plus } from 'lucide-react';

const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
    <div className="space-y-2 mb-6">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
    <div className="flex space-x-3">
      <div className="h-9 bg-gray-200 rounded-xl w-28"></div>
      <div className="h-9 bg-gray-200 rounded-xl w-28"></div>
    </div>
  </div>
);

const PostCarieresList = () => {
  const { postCarieres, isLoadingPostCarieres, deletePostCariere } = usePostCariere();
  const params = useParams();
  const organizationId = params.id;

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePostCariere(id);
    }
  };

  if (isLoadingPostCarieres) {
    return (
      <div className="min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-full w-36 animate-pulse"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Briefcase className="h-6 w-6" />
            Career Posts
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and publish career opportunities
          </p>
        </div>
        <Link 
          href={`/admin/organizations/${organizationId}/postcarieres/create`}
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-800 
            transition-all duration-200 font-medium shadow-sm hover:shadow-md active:transform active:scale-95 text-xs lg:text-sm"
        >
          <Plus className="h-4 w-4" />
          Create Post
        </Link>
      </div>

      {(!postCarieres || postCarieres.length === 0) ? (
        <Nothings title='Carrieres' />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {postCarieres.map((post) => (
            <div 
              key={post.id} 
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200
                hover:border-gray-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 
                group-hover:opacity-100 transition-opacity duration-200" 
              />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
                  {post.titre}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.contenu}
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/organizations/${organizationId}/postcarieres/${post.id}/edit`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 
                      text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200
                      font-medium text-sm group/button"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-red-200 
                      text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200
                      font-medium text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCarieresList;