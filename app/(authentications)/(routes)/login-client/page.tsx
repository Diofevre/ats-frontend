"use client";

import React, { useState } from "react";
import LoginClient from "@/components/authentications/login_client/FormLogin";
import { initiateGoogleLogin } from "@/lib/services/client/auth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider: string) => {
    if (provider === "google") {
      try {
        setIsLoading(true);
        console.log("Initialisation de la connexion Google...");
        const url = await initiateGoogleLogin();
        window.location.href = url;
      } catch (err) {
        setIsLoading(false);
        console.log(
          "Erreur lors de la connexion Google. Veuillez réessayer." + err
        );
      }
    } else {
      console.log("Ce fournisseur n'est pas encore implémenté");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-cyan-50 relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e533_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e533_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 w-full max-w-md">
        <LoginClient onSocialLogin={handleSocialLogin} isLoading={isLoading} />

        <p className="text-center text-sm text-gray-500 mt-4">
          En continuant, vous acceptez nos{" "}
          <a
            href="/terms"
            className="text-cyan-600 hover:text-cyan-700 underline decoration-dotted">
            Conditions d&apos;utilisation
          </a>{" "}
          et reconnaissez avoir lu notre{" "}
          <a
            href="/privacy"
            className="text-cyan-600 hover:text-cyan-700 underline decoration-dotted">
            Politique de confidentialité
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
