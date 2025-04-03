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
  OtpResendConfirmationPayload,
  RoleUpdatePayload,
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

// User Authentication
export const register = async (payload: RegisterPayload): Promise<{ email: string; message: string }> => {
  return handleRequest(api.post('/api/users/register', payload));
};

// Confirm Registration OTP
export const confirmRegistration = async (payload: OtpConfirmPayload): Promise<OtpConfirmResponse> => {
  return handleRequest(api.post('/api/users/confirm', payload));
};

// Confirm Resend OTP
export const otpResendOtp = async (payload: OtpResendConfirmationPayload): Promise<{ email: string; message: string }> => {
  return handleRequest(api.post('/api/users/resend-otp', payload));
};

// Login
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await handleRequest<LoginResponse>(api.post('/api/users/login', payload));
  localStorage.setItem('token', response.token);
  return response;
};

// Logout
export const logout = async (): Promise<{ message: string }> => {
  const response = await handleRequest<{ message: string }>(
    api.put('/api/users/logout')
  );
  
  localStorage.removeItem('token');
  return response;
};

// Password Reset
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<{ message: string }> => {
  return handleRequest(api.post('/api/users/forgot-password', payload));
};

// Reset Password
export const resetPassword = async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
  return handleRequest(api.post('/api/users/reset-password', payload));
};

// User Profile
export const getCurrentUser = async (): Promise<User> => {
  return handleRequest(api.get('/api/users/me'));
};

// Update Profile
export const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
  return handleRequest(api.put('/api/users/me', payload));
};

// Update Role Users
export const updateRoleUsers = async (id: number, payload: RoleUpdatePayload): Promise<User> => {
  if (payload.role === 'MODERATEUR' && (!payload.organisations || payload.organisations.length === 0)) {
    throw new Error('Les organisations doivent être spécifiées pour un Modérateur');
  }
  
  return handleRequest(api.put(`/api/users/${id}/change/role`, payload));
};

// Admin Only
export const getAllUsers = async (): Promise<User[]> => {
  return handleRequest(api.get('/api/users'));
};

// Utility functions
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// Get Token
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};