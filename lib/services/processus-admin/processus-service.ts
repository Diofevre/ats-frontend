import { Processus, CreateProcessusDto, AddQuizzDto } from "@/lib/types/processus-admin/processus-admin";
import api from "../api";

export const ProcessusService = {
  getAll: async (): Promise<Processus[]> => {
    const { data } = await api.get('/api/processus');
    return data;
  },

  getById: async (id: string): Promise<Processus> => {
    const { data } = await api.get(`/api/processus/${id}`);
    return data;
  },

  create: async (processus: CreateProcessusDto): Promise<Processus> => {
    const { data } = await api.post('/api/processus', processus);
    return data;
  },

  update: async (id: string, processus: Partial<Processus>): Promise<Processus> => {
    const { data } = await api.put(`/api/processus/${id}`, processus);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/processus/${id}`);
  },

  addQuizz: async (id: string, quizz: AddQuizzDto): Promise<void> => {
    await api.post(`/api/processus/${id}/quizz`, quizz);
  },
};