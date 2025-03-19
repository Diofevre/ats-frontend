/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface FormLoginProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  onSocialLogin: (provider: string) => void;
  onForgotPassword: () => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ onSubmit, onSocialLogin, onForgotPassword }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <img 
          src="/ats.png"
          alt="Luxury Hotel"
          className="w-20 h-20 mx-auto object-cover"
        />
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-light text-center text-blue-900 mb-8">
          Welcome back
        </h2>

        <div className="space-y-3 mb-8">
          <button
            onClick={() => onSocialLogin('google')}
            className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl text-gray-700 bg-white border transition-colors hover:bg-gray-50"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-gray-500 bg-white">Or continue with</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        {...field}
                        type="email"
                        disabled={isLoading}
                        className="pl-10 pr-3 py-6 rounded-xl focus:ring-2 focus:ring-emerald-500/80"
                        placeholder="Email address"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        {...field}
                        type="password"
                        disabled={isLoading}
                        className="pl-10 pr-3 py-6 rounded-xl focus:ring-2 focus:ring-emerald-500/80"
                        placeholder="Password"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <button 
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="rounded-[12px] uppercase w-full h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "CONTINUE"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default FormLogin;