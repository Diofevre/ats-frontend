import { Processus, CreateProcessusDto, AddQuizzDto, ProcessusDetail } from "@/lib/types/processus-admin/processus-admin";
import api from "../api";

export const ProcessusService = {
  getAll: async (): Promise<Processus[]> => {
    const { data } = await api.get('/api/processus');
    return data;
  },

  getById: async (id: string): Promise<ProcessusDetail> => {
    const { data } = await api.get(`/api/processus/${id}/details`);
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

  start: async (id: string): Promise<void> => {
    await api.post(`/api/processus/${id}/start`);
  },

  startInacheve: async (id: string): Promise<void> => {
    await api.post(`/api/processus/${id}/start-inacheve`);
  },

  startForCandidat: async (id: string): Promise<void> => {
    await api.post(`/api/processus/${id}/start-for-candidat`);
  },

  makeTop: async (id: string): Promise<void> => {
    await api.put(`/api/processus/${id}/make-top`);
  },

  makeBottom: async (id: string): Promise<void> => {
    await api.put(`/api/processus/${id}/make-bottom`);
  },

  reverseOrder: async (id1: string, id2: string): Promise<void> => {
    await api.put(`/api/processus/${id1}/reverse-order/${id2}`);
  },
};