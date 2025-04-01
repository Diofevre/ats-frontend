/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Lock, Mail, Loader2 } from 'lucide-react';
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
  onForgotPassword: () => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ onSubmit, onForgotPassword }) => {
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
      <div className="p-8">
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
                className="text-sm text-cyan-600 hover:text-cyan-600/80"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="rounded-[12px] uppercase w-full h-12 bg-[#2C9CC6] text-black hover:bg-[#2C9CC6]/80 font-semibold transform transition-all"
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