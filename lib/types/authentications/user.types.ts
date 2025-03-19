export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile?: string;
  role: 'ADMIN' | 'MODERATEUR';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  profile?: File;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  role: string;
  token: string;
}

export interface OtpConfirmPayload {
  email: string;
  otp: string;
}

export interface OtpConfirmResponse {
  email: string;
  token: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  profile?: File;
  role?: string;
}