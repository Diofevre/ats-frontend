'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ConfirmInvitation } from '../_components/ConfirmInvitation';

export const dynamic = "force-dynamic";

function ConfirmInvitationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Lien d&apos;invitation invalide</h2>
          <p className="mt-2 text-gray-600">Le lien que vous avez utilisé est invalide ou a expiré.</p>
        </div>
      </div>
    );
  }

  return <ConfirmInvitation token={token} />;
}

export default function ConfirmInvitationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ConfirmInvitationContent />
    </Suspense>
  );
}