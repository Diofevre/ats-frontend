'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FormRegister from '@/components/authentications/register/FormRegister';
import { toast } from 'sonner';
import { register } from '@/lib/services/authentications/user';

const Register = () => {
  const router = useRouter();

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    profile: File | undefined;
  }) => {
    try {
      await register(formData);
      toast.success('Registration successful! Please check your email for verification code.');
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to register');
    }
  };

  const handleSocialLogin = () => {
    toast.error('Social login is not implemented yet');
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full">
        <FormRegister
          onSubmit={handleSubmit}
          onSocialLogin={handleSocialLogin}
        />

        <div className="w-full max-w-md mx-auto">
          <div className="text-center">
            <button
              onClick={() => router.push('/login')}
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              Already have an account? Sign in
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
    </div>
  );
};

export default Register;