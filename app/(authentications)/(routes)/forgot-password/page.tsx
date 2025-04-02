'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { forgotPassword } from '@/lib/services/authentications/user';

const formSchema = z.object({
  email: z.string().email('Adresse email invalide'),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await forgotPassword({ email: data.email });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      form.setError('email', {
        type: 'manual',
        message: 'Une erreur est survenue lors de l\'envoi de l\'email',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen w-full bg-gradient-to-br from-white to-cyan-50 relative flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e533_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e533_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,#000_70%,transparent_110%)]" />
        
        {/* Main */}
        <div className='relative z-10 w-full max-w-md'>
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Réinitialisation du mot de passe
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mt-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-green-900">
                Email envoyé avec succès !
              </h3>
              <p className="mt-2 text-sm text-green-700">
                Vérifiez votre boîte de réception pour les instructions de réinitialisation.
              </p>
              <p className="mt-4 text-sm text-green-600">
                Redirection vers la page de connexion...
              </p>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Adresse email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...form.register('email')}
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-4 border ${
                        form.formState.errors.email
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:z-10 sm:text-sm`}
                      placeholder="Adresse email"
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/login"
                  className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
                >
                  Retour à la connexion
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center rounded-[12px] uppercase text-xs w-full h-12 bg-[#2C9CC6] hover:bg-[#2C9CC6]/80 text-slate-900 font-semibold transform transition-all"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <span>
                      Envoyer les instructions
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
  );
};

export default ForgotPassword;