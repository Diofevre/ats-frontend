import { CreateReponseDto, Reponse, UpdateReponseDto } from '@/lib/types/question-reponse-admin';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const reponseService = {
  create: async (data: CreateReponseDto): Promise<Reponse> => {
    const response = await fetch(`${API_URL}/api/reponses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to create response');
    return response.json();
  },

  getByQuestion: async (questionId: number): Promise<Reponse[]> => {
    const response = await fetch(`${API_URL}/api/reponses/question/${questionId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch responses');
    return response.json();
  },

  update: async (id: number, data: UpdateReponseDto): Promise<Reponse> => {
    const response = await fetch(`${API_URL}/api/reponses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to update response');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/api/reponses/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to delete response');
  }
};