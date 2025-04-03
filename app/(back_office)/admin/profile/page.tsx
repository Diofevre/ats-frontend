'use client'

import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import UserProfile from './_components/profile';
import InvitationList from './_components/invitation-list';
import InvitationModal from './_components/modal-invite';
import { Link } from 'lucide-react';

export default function Profile() {
  const { user, loading, refreshUser } = useAuth();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const organisationIds = user?.organisations?.map(org => org.id) ?? [];

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 space-y-12">
        <UserProfile user={user} loading={loading} refreshUser={refreshUser} />

        {user?.role === 'ADMINISTRATEUR' ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 uppercase">Invitations</h2>
                <p className="mt-1 text-sm text-gray-500">Gérez les invitations de votre organisation</p>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="flex items-center h-9 px-6 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Link className='h-4 w-4 mr-2' />
                Inviter
              </button>
            </div>

            <InvitationList organisationId={organisationIds} />
          </>
        ) : (
          <></>
        )}
      </main>

      <InvitationModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}