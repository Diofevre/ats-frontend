import api from '@/lib/services/api';
import { Notification, DeleteNotificationResponse } from '@/lib/types/notifications/notification.types';
import axios from 'axios';

const NOTIFICATIONS_KEY = '/api/notifications';

// Error handling wrapper
const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
    throw error;
  }
};

// Get all notifications
export const getAllNotifications = async (): Promise<Notification[]> => {
  return handleRequest(api.get(NOTIFICATIONS_KEY));
};

// Delete a notification
export const deleteNotification = async (id: number): Promise<DeleteNotificationResponse> => {
  return handleRequest(api.delete(`${NOTIFICATIONS_KEY}/${id}`));
};

// Mark notification as read (if needed in the future)
export const markNotificationAsRead = async (id: number): Promise<Notification> => {
  return handleRequest(api.patch(`${NOTIFICATIONS_KEY}/${id}`, { est_lu: true }));
};