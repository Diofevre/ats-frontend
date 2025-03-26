'use client';

import React, { useState } from 'react';
import { Mail, Bell, Trash2, X } from 'lucide-react';
import useSWR, { mutate } from 'swr';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: number;
  titre: string;
  contenu: string;
  est_lu: boolean;
  created_at: string;
  updated_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export function NotificationIcons() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: notifications = [], error, isLoading } = useSWR<Notification[]>(
    `${API_URL}/api/notifications`,
    fetcher,
    {
      refreshInterval: 30000,
      fallbackData: []
    }
  );

  const unreadCount = Array.isArray(notifications) 
    ? notifications.filter(n => !n.est_lu).length 
    : 0;

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
      // Optimistically update the UI
      mutate(
        `${API_URL}/api/notifications`, 
        notifications.filter(n => n.id !== id),
        false
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button className="relative p-2 text-white hover:text-indigo-600 focus:outline-none transition-colors duration-300">
          <Mail className="w-6 h-6" />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white transform scale-100 hover:scale-110 transition-transform duration-300">
            3
          </span>
        </button>

        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-white hover:text-indigo-600 focus:outline-none transition-colors duration-300"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white transform scale-100 hover:scale-110 transition-transform duration-300">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Notifications</h3>
            <button
              title='Close Notifications'
              onClick={() => setShowNotifications(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              // Skeleton Loading
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 border-b border-gray-100 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : error ? (
              <div className="p-4 text-red-500 text-center">
                Failed to load notifications
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.est_lu ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {notification.titre}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.contenu}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <button
                      title='Delete Notification'
                      onClick={() => handleDelete(notification.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}