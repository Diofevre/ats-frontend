'use client'

import { PostCariereService } from '@/lib/services/postcariere/postcariere';
import { CreatePostCariereDto, PostCariere, UpdatePostCariereDto } from '@/lib/types/postcarieres';
import useSWR from 'swr';

// Define fetcher types
type Fetcher<T> = (url: string) => Promise<T>;

// Create type-safe fetcher functions
const fetchPostCariere: Fetcher<PostCariere | null> = async (url) => {
  const id = url.split('-')[1];
  return id ? await PostCariereService.getById(parseInt(id)) : null;
};

const fetchPostCarieres: Fetcher<PostCariere[]> = async () => {
  return await PostCariereService.getAll();
};

export function usePostCariere(id?: number) {
  const {
    data: postCariere,
    error: postCariereError,
    mutate: mutatePostCariere,
  } = useSWR<PostCariere | null>(
    id ? `postcariere-${id}` : null,
    fetchPostCariere
  );

  const {
    data: postCarieres,
    error: postCarieresError,
    mutate: mutatePostCarieres,
  } = useSWR<PostCariere[]>('postcarieres', fetchPostCarieres);

  const createPostCariere = async (data: CreatePostCariereDto) => {
    const newPostCariere = await PostCariereService.create(data);
    await mutatePostCarieres((prev) => [...(prev || []), newPostCariere]);
    return newPostCariere;
  };

  const updatePostCariere = async (postCariereId: number, data: UpdatePostCariereDto) => {
    const updatedPostCariere = await PostCariereService.update(postCariereId, data);
    await mutatePostCariere();
    await mutatePostCarieres((prev) =>
      prev?.map((post) => (post.id === postCariereId ? updatedPostCariere : post))
    );
    return updatedPostCariere;
  };

  const deletePostCariere = async (postCariereId: number) => {
    await PostCariereService.delete(postCariereId);
    await mutatePostCarieres((prev) => prev?.filter((post) => post.id !== postCariereId));
  };

  return {
    // Single post cariere data and operations
    postCariere,
    isLoading: id ? !postCariereError && !postCariere : false,
    isError: postCariereError,
    updatePostCariere,
    deletePostCariere,

    // List of post carieres
    postCarieres,
    isLoadingPostCarieres: !postCarieresError && !postCarieres,
    isErrorPostCarieres: postCarieresError,
    createPostCariere,

    // Mutate functions for manual updates
    mutatePostCariere,
    mutatePostCarieres,
  };
}