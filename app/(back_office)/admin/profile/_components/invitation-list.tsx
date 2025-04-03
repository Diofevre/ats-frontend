'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader2, X } from 'lucide-react';
import type { Invitation } from '@/lib/types/invitations';
import { invitationService } from '@/lib/services/invitations';
import { useRouter } from 'next/navigation';

interface InvitationListProps {
  organisationId: number[];
}

export default function InvitationList({ organisationId }: InvitationListProps) {
  const router = useRouter();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingIds, setCancellingIds] = useState<number[]>([]);

  const filteredInvitations = invitations.filter(
    (invitation) => organisationId.includes(invitation.organisation_id)
  );

  const fetchInvitations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await invitationService.getQueue();

      if (Array.isArray(response)) {
        setInvitations(response);
      } else if (response?.invitations) {
        setInvitations(response.invitations);
      } else {
        setInvitations([]);
      }

      router.refresh();
    } catch (error) {
      console.error('Failed to fetch invitations:', error);
      setError('Failed to load invitations');
      setInvitations([]);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleCancelInvitation = async (invitationId: number) => {
    try {
      setCancellingIds((prev) => [...prev, invitationId]);
      await invitationService.cancel(invitationId);
      
      await fetchInvitations();
    } catch (error) {
      console.error('Failed to cancel invitation:', error);
    } finally {
      setCancellingIds((prev) => prev.filter((id) => id !== invitationId));
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (filteredInvitations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Aucune invitation en attente</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredInvitations.map((invitation: Invitation) => (
        <div
          key={invitation.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="text-sm font-medium text-gray-900">
              {invitation.invitee_email}
            </p>
            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
              <span>{invitation.role}</span>
              <span>•</span>
              <span>
                Expire le{' '}
                {format(new Date(invitation.expires_at), 'dd MMMM yyyy', {
                  locale: fr,
                })}
              </span>
            </div>
          </div>
          <button
            onClick={() => handleCancelInvitation(invitation.id)}
            disabled={cancellingIds.includes(invitation.id)}
            className="p-1 text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Annuler l'invitation"
          >
            {cancellingIds.includes(invitation.id) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}