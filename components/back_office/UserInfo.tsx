/* eslint-disable @next/next/no-img-element */
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Settings, UserCircle, LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import NotificationBell from './Notifications';

const UserInfo = () => {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  if (authLoading) {
    return (
      <div className="absolute bottom-0 left-0 right-0 h-[52px] px-2 flex items-center bg-[#2B2D31]">
        <div className="flex items-center flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#35363C] animate-pulse" />
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#35363C] animate-pulse border-2 border-[#232428]" />
          </div>
          <div className="ml-2 flex-1 min-w-0">
            <div className="w-20 h-3 bg-[#35363C] animate-pulse rounded" />
            <div className="w-16 h-2 bg-[#35363C] animate-pulse rounded mt-1" />
          </div>
        </div>
        <div className="flex space-x-1 flex-shrink-0">
          <div className="w-8 h-8 bg-[#35363C] animate-pulse rounded-md" />
          <div className="w-8 h-8 bg-[#35363C] animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[52px] px-2 flex items-center bg-[#2B2D31]">
      <div className="flex items-center flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            {user?.profile ? (
              <img
                src={user.profile}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <UserCircle className="w-6 h-6 text-indigo-600" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#23A559] border-2 border-[#232428]" />
        </div>
        <div className="ml-2 flex-1 min-w-0">
          <div className="text-xs font-medium text-white truncate">
            {user?.name?.split(" ")[0]}
          </div>
          <div className="text-xs text-[#949BA4] lowercase truncate">#{user?.role}</div>
        </div>
      </div>
      <div className="flex flex-shrink-0">
        <NotificationBell />
        <button
          title="Settings"
          className="p-2 hover:bg-[#35363C] rounded-md group"
          onClick={() => router.push('/admin/profile')}
        >
          <Settings className="w-4 h-4 text-[#949BA4] group-hover:text-white" />
        </button>
        <button
          title="Logout"
          className="p-2 hover:bg-[#35363C] rounded-md group"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" /> 
          ) : (
            <LogOut className="w-4 h-4 text-[#949BA4] group-hover:text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserInfo;