import useSWR from 'swr';
import { Notification } from '@/lib/types/notifications/notification.types';
import { deleteNotification } from '@/lib/services/notifications/notifications';

const NOTIFICATIONS_KEY = '/api/notifications';

export function useNotifications() {
  const { data: notifications, error, mutate } = useSWR<Notification[]>(NOTIFICATIONS_KEY, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const isLoading = !notifications && !error;
  const unreadCount = notifications?.filter(n => !n.est_lu).length || 0;

  const removeNotification = async (id: number) => {
    try {
      await deleteNotification(id);
      // Optimistically update the UI
      mutate(
        notifications?.filter(n => n.id !== id),
        false
      );
    } catch (error) {
      // If there's an error, revalidate to get the correct state
      mutate();
      throw error;
    }
  };

  const markAsRead = async (id: number) => {
    try {
      // Optimistically update the UI
      mutate(
        notifications?.map(n => 
          n.id === id ? { ...n, est_lu: true } : n
        ),
        false
      );
    } catch (error) {
      // If there's an error, revalidate to get the correct state
      mutate();
      throw error;
    }
  };

  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    removeNotification,
    markAsRead,
    refresh: mutate
  };
}