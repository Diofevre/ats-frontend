import api from './api';
import type {
  SendInvitationPayload,
  ConfirmInvitationPayload,
  AcceptInvitationPayload,
  RemoveInvitationPayload,
  InvitationQueueResponse,
} from '@/lib/types/invitations';

export const invitationService = {
  send: async (payload: SendInvitationPayload): Promise<void> => {
    const { data } = await api.post('/api/users/invitation/send', payload);
    return data;
  },

  confirm: async (payload: ConfirmInvitationPayload): Promise<void> => {
    const { data } = await api.post('/api/users/invitation/confirm', payload);
    return data;
  },

  accept: async (payload: AcceptInvitationPayload): Promise<void> => {
    const { data } = await api.post('/api/users/invitation/accept', payload);
    return data;
  },

  remove: async (payload: RemoveInvitationPayload): Promise<void> => {
    const { data } = await api.post('/api/users/invitation/remove', payload);
    return data;
  },

  getQueue: async (): Promise<InvitationQueueResponse> => {
    const { data } = await api.get('/api/users/invitation/queue/list');
    return data;
  },

  cancel: async (invitationId: number): Promise<void> => {
    const { data } = await api.delete(`/api/users/invitation/cancel/${invitationId}`);
    return data;
  },
} as const;