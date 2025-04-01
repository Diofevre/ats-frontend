/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";

interface FormLoginProps {
  onSocialLogin: (provider: string) => void;
  isLoading?: boolean;
}

const LoginClient: React.FC<FormLoginProps> = ({
  onSocialLogin,
  isLoading,
}) => {
  return (
    <div className="w-full max-w-md overflow-hidden">
      <div className="mb-8 text-center pt-8">
        {/* ATS Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ATS Portal</h1>
          <p className="text-sm text-gray-500 mt-2">Applicant Tracking System</p>
        </div>
      </div>

      <div className="p-8 pt-0">
        <div className="space-y-4 mb-8">
          <button
            onClick={() => onSocialLogin("google")}
            disabled={isLoading} // Désactiver le bouton pendant le chargement
            className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl text-gray-700 bg-white border border-gray-300 transition-all hover:bg-gray-50 hover:shadow-md active:scale-95 ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}>
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-cyan-600 rounded-full animate-spin" />
            ) : (
              <FcGoogle className="w-5 h-5" />
            )}
            <span className="font-medium">
              {isLoading ? "Chargement..." : "Continuer avec Google"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
