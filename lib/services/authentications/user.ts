/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/lib/services/api';
import {
  User,
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  OtpConfirmPayload,
  OtpConfirmResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  UpdateProfilePayload,
} from '@/lib/types/authentications/user.types';
import axios from 'axios';

// Error handling wrapper
const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
    throw error;
  }
};

// Helper function to create FormData
const createFormData = (payload: any): FormData => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value as string | Blob);
    }
  });
  return formData;
};

// User Authentication
export const register = async (payload: RegisterPayload): Promise<{ email: string; message: string }> => {
  const formData = createFormData(payload);
  return handleRequest(api.post('/api/users/register', formData));
};

export const confirmRegistration = async (payload: OtpConfirmPayload): Promise<OtpConfirmResponse> => {
  return handleRequest(api.post('/api/users/confirm', payload));
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await handleRequest<LoginResponse>(api.post('/api/users/login', payload));
  localStorage.setItem('token', response.token);
  return response;
};

export const logout = async (): Promise<{ message: string }> => {
  const response: { message: string } = await handleRequest(api.post('/api/users/logout'));
  localStorage.removeItem('token');
  return response;
};

// Password Reset
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<{ message: string }> => {
  return handleRequest(api.post('/api/users/forgot-password', payload));
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
  return handleRequest(api.post('/api/users/reset-password', payload));
};

// User Profile
export const getCurrentUser = async (): Promise<User> => {
  return handleRequest(api.get('/api/users/me'));
};

export const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
  const formData = createFormData(payload);
  return handleRequest(api.put('/api/users/me', formData));
};

// Admin Only
export const getAllUsers = async (): Promise<User[]> => {
  return handleRequest(api.get('/api/users'));
};

// Utility functions
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};