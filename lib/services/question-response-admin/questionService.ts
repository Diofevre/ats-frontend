import { CreateQuestionDto, Question, UpdateQuestionDto } from '@/lib/types/question-reponse-admin';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const questionService = {
  create: async (data: CreateQuestionDto): Promise<Question> => {
    const response = await fetch(`${API_URL}/api/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to create question');
    return response.json();
  },

  getAll: async (): Promise<Question[]> => {
    const response = await fetch(`${API_URL}/api/questions`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch questions');
    return response.json();
  },

  getByProcessus: async (processusId: number): Promise<Question[]> => {
    const response = await fetch(`${API_URL}/api/questions/processus/${processusId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch questions');
    return response.json();
  },

  update: async (id: number, data: UpdateQuestionDto): Promise<Question> => {
    const response = await fetch(`${API_URL}/api/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to update question');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/api/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to delete question');
  }
};