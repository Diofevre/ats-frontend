import { Suspense } from "react";
import AuthCallbackGoogle from "./authCallback";

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-600">Chargement...</div>
        </div>
      }>
      <AuthCallbackGoogle />
    </Suspense>
  );
}
