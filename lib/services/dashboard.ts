import { DashboardResponse } from '../types/dashboard';
import api from './api';

export const getDashboardData = async (): Promise<DashboardResponse> => {
  try {
    const { data } = await api.get<DashboardResponse>('/api/users/dashboard');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch dashboard data');
  }
};