'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader2, X } from 'lucide-react';
import type { Invitation } from '@/lib/types/invitations';
import { invitationService } from '@/lib/services/invitations';

interface InvitationListProps {
  organisationId: number | null;
}

export default function InvitationList({ organisationId } : InvitationListProps) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredInvitations = invitations.filter(
    (invitation) => invitation.organisation_id === organisationId
  );

  const fetchInvitations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await invitationService.getQueue();
      // The response is directly an array of invitations
      if (Array.isArray(response)) {
        setInvitations(response);
      } else if (response?.invitations) {
        setInvitations(response.invitations);
      } else {
        setInvitations([]);
      }
    } catch (error) {
      console.error('Failed to fetch invitations:', error);
      setError('Failed to load invitations');
      setInvitations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelInvitation = async (invitationId: number) => {
    try {
      await invitationService.cancel(invitationId);
      // Refresh the invitations list after cancellation
      fetchInvitations();
    } catch (error) {
      console.error('Failed to cancel invitation:', error);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

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
            className="p-1 text-gray-400 hover:text-gray-500"
            title="Annuler l'invitation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}