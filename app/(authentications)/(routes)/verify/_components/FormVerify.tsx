'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { Loader2 } from "lucide-react";
import { toast } from 'sonner';
import { confirmRegistration } from '@/lib/services/authentications/user';

const formSchema = z.object({
  otp: z.string().min(6, "OTP must be at least 6 characters"),
});

const FormVerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!email) {
      toast.error('Email is required for verification');
      return;
    }

    setIsLoading(true);
    try {
      await confirmRegistration({ email, otp: values.otp });
      toast.success('Email verified successfully!');
      router.push('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    router.push('/register');
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-blue-900">Verify your email</h2>
          <p className="text-gray-600 mt-2">
            We&apos;ve sent a verification code to<br />
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="text-center py-6 text-lg tracking-widest rounded-xl"
                        placeholder="Enter verification code"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the code?{' '}
              <button
                type="button"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
                onClick={() => {
                  // Handle resend logic here
                  toast.info('Resend functionality not implemented yet');
                }}
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormVerifyPage;