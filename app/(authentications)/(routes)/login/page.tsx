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
      router.push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-cyan-50 relative flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e533_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e533_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,#000_70%,transparent_110%)]" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Login Form */}
          <FormLogin
            onSubmit={handleSubmit}
            onForgotPassword={handleForgotPassword}
          />

        {/* <div className="text-center mb-6">
          <button
            onClick={() => router.push('/register')}
            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
          >
            Don&apos;t have an account? <span className="underline">Sign up</span>
          </button>
        </div> */}

        {/* Terms and Privacy */}
        <p className="text-center text-sm text-gray-500">
          By clicking continue, you agree to our{' '}
          <a href="#" className="text-cyan-600 hover:text-cyan-700 underline decoration-dotted">
            Terms of Service
          </a>{' '}
          and acknowledge that you have read our{' '}
          <a href="#" className="text-cyan-600 hover:text-cyan-700 underline decoration-dotted">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;