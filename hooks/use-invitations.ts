'use client'

import useSWR from 'swr';
import type {
  SendInvitationPayload,
  ConfirmInvitationPayload,
  AcceptInvitationPayload,
  RemoveInvitationPayload,
  InvitationQueueResponse,
} from '@/lib/types/invitations';
import { invitationService } from '@/lib/services/invitations';

// Define fetcher types
type Fetcher<T> = (url: string) => Promise<T>;

// Create type-safe fetcher functions
const fetchInvitationQueue: Fetcher<InvitationQueueResponse> = async () => {
  return await invitationService.getQueue();
};

export const useInvitations = () => {
  const {
    data,
    error,
    isLoading,
    mutate: mutateQueue,
  } = useSWR<InvitationQueueResponse>(
    'invitation-queue',
    fetchInvitationQueue
  );

  const sendInvitation = async (payload: SendInvitationPayload) => {
    await invitationService.send(payload);
    await mutateQueue();
  };

  const confirmInvitation = async (payload: ConfirmInvitationPayload) => {
    await invitationService.confirm(payload);
    await mutateQueue();
  };

  const acceptInvitation = async (payload: AcceptInvitationPayload) => {
    await invitationService.accept(payload);
    await mutateQueue();
  };

  const removeInvitation = async (payload: RemoveInvitationPayload) => {
    await invitationService.remove(payload);
    await mutateQueue();
  };

  const cancelInvitation = async (invitationId: number) => {
    await invitationService.cancel(invitationId);
    await mutateQueue();
  };

  return {
    // Queue data and operations
    invitations: data?.invitations ?? [],
    isLoading,
    isError: error,
    
    // Invitation operations
    sendInvitation,
    confirmInvitation,
    acceptInvitation,
    removeInvitation,
    cancelInvitation,

    // Mutate function for manual updates
    mutateQueue,
  };
};