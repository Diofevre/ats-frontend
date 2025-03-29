'use client'

import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/hooks/use-notifications';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function NotificationBell() {
  const { notifications, unreadCount, removeNotification, markAsRead, isLoading } = useNotifications();

  const handleNotificationClick = async (id: number) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    try {
      await removeNotification(id);
      toast.success('Notification supprimée');
    } catch (error) {
      console.log(error);
      toast.error('Erreur lors de la suppression de la notification');
    }
  };

  const NotificationSkeleton = () => (
    <div className="p-4 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-2 w-1/4" />
        </div>
      ))}
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          title='Notifications'
          className="p-2 hover:bg-[#35363C] rounded-md group"
        >
          <Bell className="h-4 w-4 text-[#949BA4]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 ml-[72px]">
        {isLoading ? (
          <NotificationSkeleton />
        ) : notifications?.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Aucune notification</div>
        ) : (
          notifications?.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex flex-col items-start p-4 space-y-1 cursor-pointer ${
                !notification.est_lu ? 'bg-gray-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.titre}</p>
                  <p className="text-sm text-gray-600">{notification.contenu}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(notification.created_at), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                  onClick={(e) => handleDelete(e, notification.id)}
                >
                  ×
                </Button>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}