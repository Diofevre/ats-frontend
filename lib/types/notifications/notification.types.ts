export interface Notification {
  id: number;
  titre: string;
  contenu: string;
  est_lu: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationResponse {
  data: Notification[];
  error: string | null;
}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}