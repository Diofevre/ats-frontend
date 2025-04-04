/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import { usePostCariere } from '@/hooks/use-postcariere';
import Nothings from '@/components/nothings';
import { Trash2, Plus, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import RefreshButton from '@/components/refresh';
import CardSkeleton from './skeleton-postcarrieres';

interface Props {
  organizationId: number
}

const PostCarieresList = ({ organizationId } : Props) => {
  const { postCarieres, isLoadingPostCarieres, deletePostCariere, mutatePostCarieres } = usePostCariere(organizationId);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await mutatePostCarieres();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePostCariere(id);
    }
  };

  if (isLoadingPostCarieres) {
    return (
      <div className="min-h-screen max-w-6xl mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <RefreshButton isRefreshing={true} />
        </div>
        <div className="space-y-16">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  const filteredPostCarieres = postCarieres?.filter(post => post.organisation_id === organizationId);

  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold uppercase">Posts de Carrière</h1>
        <div className="flex items-center gap-4">
          <RefreshButton 
            isRefreshing={isRefreshing}
            onClick={handleRefresh}
          />
        </div>
      </div>

      {(!filteredPostCarieres || filteredPostCarieres.length === 0) ? (
        <div className="flex flex-col items-center justify-center">
          <Nothings title="Carrières" />
          <Link
            href={`/admin/organizations/${organizationId}/postcarieres/create`}
            className="inline-flex items-center gap-2 bg-[#1E1F22] text-white px-6 py-2.5 rounded-full 
              hover:bg-[#313338] transition-all duration-200 font-medium"
          >
            <Plus className="h-4 w-4" />
            Create Post
          </Link>
        </div>
      ) : (
        <div className="space-y-16">
          {filteredPostCarieres.map((post) => (
            <div key={post.id} className="group">
              <div className="flex flex-col md:flex-row gap-8">
                {post.images?.[0] && (
                  <div className="md:w-1/3 overflow-hidden rounded-lg">
                    <img 
                      src={post.images[0]} 
                      alt={post.titre}
                      className="w-full h-full object-cover aspect-[4/3]"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>Posted {new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                    {post.titre}
                  </h3>
                  <div className="prose prose-lg max-w-none mb-8">
                    <div className="text-gray-600">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({...props}) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
                          h1: ({...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                          h2: ({...props}) => <h2 className="text-xl font-bold mb-3" {...props} />,
                          ul: ({...props}) => <ul className="list-disc pl-4 mb-4 space-y-2" {...props} />,
                          ol: ({...props}) => <ol className="list-decimal pl-4 mb-4 space-y-2" {...props} />,
                          li: ({...props}) => <li className="leading-relaxed" {...props} />,
                          a: ({...props}) => (
                            <a 
                              className="text-blue-600 hover:text-blue-800" 
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {post.contenu}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/organizations/${organizationId}/postcarieres/${post.id}/edit`}
                      prefetch={false}
                      className="inline-flex items-center gap-2 transition-colors duration-200 text-sm font-medium underline underline-offset-4 hover:text-blue-500"
                    >
                      ⟶
                      Modifier les informations de l&apos;organisation.
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="inline-flex items-center justify-center p-2.5 text-gray-500 hover:text-red-600
                        transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCarieresList;