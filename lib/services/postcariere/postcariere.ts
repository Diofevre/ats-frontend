import { CreatePostCariereDto, PostCariere, UpdatePostCariereDto } from "@/lib/types/postcarieres";
import api from "../api";

export const PostCariereService = {
  getAll: async (): Promise<PostCariere[]> => {
    const { data } = await api.get('/api/postcarrieres');
    return data;
  },

  getById: async (id: number): Promise<PostCariere> => {
    const { data } = await api.get(`/api/postcarrieres/${id}`);
    return data;
  },

  create: async (postCariere: CreatePostCariereDto): Promise<PostCariere> => {
    const { data } = await api.post('/api/postcarrieres', postCariere);
    return data;
  },

  update: async (id: number, postCariere: UpdatePostCariereDto): Promise<PostCariere> => {
    const { data } = await api.put(`/api/postcarrieres/${id}`, postCariere);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/postcarrieres/${id}`);
  },
};