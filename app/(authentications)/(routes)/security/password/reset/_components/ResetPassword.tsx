'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff, KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { resetPassword } from '@/lib/services/authentications/user';

const formSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof formSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [encryptedToken, setEncryptedToken] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    try {
      // Get verification token from query parameters
      const verificationToken = searchParams.get('verification');
      
      if (!verificationToken) {
        throw new Error('Token de réinitialisation manquant');
      }
      
      setEncryptedToken(verificationToken);
    } catch (error) {
      console.error('Error getting reset token:', error);
      form.setError('root', {
        type: 'manual',
        message: 'Token de réinitialisation invalide ou manquant',
      });
    }
  }, [searchParams, form]);

  const onSubmit = async (data: FormData) => {
    if (!encryptedToken) {
      form.setError('root', {
        type: 'manual',
        message: 'Token de réinitialisation invalide ou expiré',
      });
      return;
    }

    try {
      setIsLoading(true);
      
      await resetPassword({
        encryptedToken,
        newPassword: data.newPassword,
      });
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      form.setError('root', {
        type: 'manual',
        message: 'Une erreur est survenue lors de la réinitialisation du mot de passe',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-cyan-50 relative flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e533_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e533_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,#000_70%,transparent_110%)]" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-cyan-100 mb-6">
            <KeyRound className="h-8 w-8 text-cyan-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Réinitialisation du mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choisissez un nouveau mot de passe sécurisé
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-green-900">
              Mot de passe modifié avec succès !
            </h3>
            <p className="mt-2 text-sm text-green-700">
              Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
            </p>
            <p className="mt-4 text-sm text-green-600">
              Redirection vers la page de connexion...
            </p>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    {...form.register('newPassword')}
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                      form.formState.errors.newPassword
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {form.formState.errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {form.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    {...form.register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                      form.formState.errors.confirmPassword
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {form.formState.errors.root && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-600">
                  {form.formState.errors.root.message}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Link
                href="/login"
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                Retour à la connexion
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-[12px] uppercase text-sm w-full h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Réinitialiser le mot de passe'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}