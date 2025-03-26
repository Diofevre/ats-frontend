import { Processus, Question } from "@/lib/types/processus/processus";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
}

export const ProcessusService = {
  getAll: () => fetcher<Processus[]>('/api/processus'),
  getById: (id: number) => fetcher<Processus>(`/api/processus/${id}`),
  create: async (data: Omit<Processus, 'id' | 'created_at' | 'updated_at' | 'statut'>) => {
    const response = await fetch(`${API_BASE_URL}/api/processus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  update: async (id: number, data: Partial<Processus>) => {
    const response = await fetch(`${API_BASE_URL}/api/processus/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (id: number) => {
    await fetch(`${API_BASE_URL}/api/processus/${id}`, { method: 'DELETE' });
  },
  submitQuizz: async (id: number, questions: Question[]) => {
    const response = await fetch(`${API_BASE_URL}/api/processus/${id}/quizz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questions),
    });
    return response.json();
  },
};