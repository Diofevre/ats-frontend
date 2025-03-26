/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Lock, Mail, User, Phone, Upload } from 'lucide-react';
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
import { Loader2 } from "lucide-react"; // Import the Loader2 icon

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  profile: z.any().optional(),
});

interface FormRegisterProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    profile: File | undefined;
  }) => void;
  onSocialLogin: (provider: string) => void;
}

const FormRegister: React.FC<FormRegisterProps> = ({ onSubmit, onSocialLogin }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('profile', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await onSubmit({
        ...values,
        profile: values.profile as File | undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <img
          src="/ats.png"
          alt="Luxury Hotel"
          className="w-20 h-20 mx-auto object-cover"
        />
      </div>

      <div className="p-8">
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
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <label htmlFor="profile" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    id="profile"
                    name="profile"
                    className="hidden"
                    accept="image/*"
                    placeholder='Profile'
                    onChange={handleProfileChange}
                  />
                </label>
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="pl-10 pr-3 py-6 rounded-xl focus:ring-2 focus:ring-emerald-500/80"
                        placeholder="Full Name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        {...field}
                        type="tel"
                        disabled={isLoading}
                        className="pl-10 pr-3 py-6 rounded-xl focus:ring-2 focus:ring-emerald-500/80"
                        placeholder="Phone number"
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

            <Button
              type="submit"
              size="lg"
              className="rounded-[12px] uppercase w-full h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default FormRegister;