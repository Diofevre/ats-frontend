"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyGoogleCode } from "@/lib/services/client/auth";

const AuthCallbackGoogle = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      if (code) {
        try {
          const res = await verifyGoogleCode(code);
          console.log(res);
          router.push("/client/candidature");
        } catch (err) {
          console.error("Erreur lors de la vérification du code Google :", err);
          router.push("/login-client");
        }
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-600">Chargement...</div>
    </div>
  );
};

export default AuthCallbackGoogle;
