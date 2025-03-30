import { z } from 'zod';

export const UserRole = z.enum(['MODERATEUR', 'ADMINISTRATEUR']);
export type UserRole = z.infer<typeof UserRole>;

export const InvitationSchema = z.object({
  id: z.number(),
  inviter_id: z.number(),
  invitee_email: z.string().email(),
  organisation_id: z.number(),
  role: UserRole,
  token: z.string(),
  expires_at: z.string().datetime(),
  created_at: z.string().datetime(),
});

export type Invitation = z.infer<typeof InvitationSchema>;

export interface SendInvitationPayload {
  invitee_email: string;
  organisation_id: number;
  role: UserRole;
}

export interface ConfirmInvitationPayload {
  token: string;
  email: string;
}

export interface AcceptInvitationPayload {
  token: string;
  name: string;
  password: string;
  phone: string;
}

export interface RemoveInvitationPayload {
  user_id: number;
  organisation_id: number;
}

export interface InvitationQueueResponse {
  invitations: Invitation[];
}