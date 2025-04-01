/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";

interface FormLoginProps {
  onSocialLogin: (provider: string) => void;
}

const LoginClient: React.FC<FormLoginProps> = ({ onSocialLogin }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="mb-8 text-center pt-8">
        <img
          src="/ats.png"
          alt="Luxury Hotel"
          className="w-20 h-20 mx-auto object-cover"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">Bienvenue</h2>
        <p className="mt-2 text-gray-600">Connectez-vous pour continuer</p>
      </div>

      <div className="p-8 pt-0">
        <div className="space-y-4 mb-8">
          <button
            onClick={() => onSocialLogin("google")}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl text-gray-700 bg-white border border-gray-300 transition-all hover:bg-gray-50 hover:shadow-md active:scale-95">
            <FcGoogle className="w-5 h-5" />
            <span className="font-medium">Continuer avec Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
