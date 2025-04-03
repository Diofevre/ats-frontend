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
    profile: string;
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
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-cyan-50 relative flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e533_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e533_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,#000_70%,transparent_110%)]" />
      
      <div className="relative z-10 w-full max-w-md">
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