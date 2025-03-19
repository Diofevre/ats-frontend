/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FormLogin from '@/components/authentications/login/FormLogin';
import { toast } from 'sonner';
import { login } from '@/lib/services/authentications/user';

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials);
      toast.success('Successfully logged in!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    }
  };

  const handleSocialLogin = () => {
    toast.error('Social login is not implemented yet');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <FormLogin
        onSubmit={handleSubmit}
        onSocialLogin={handleSocialLogin}
        onForgotPassword={handleForgotPassword}
      />

      <div className="w-full max-w-md">
        <div className="text-center">
          <button
            onClick={() => router.push('/register')}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Don&apos;t have an account? Sign up
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          By clicking continue, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>{' '}
          and acknowledge that you have read our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

export default Login;