/* eslint-disable @next/next/no-img-element */
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Bell, Settings, UserCircle } from 'lucide-react'
import React from 'react'

const UserInfo = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-indigo-100 animate-pulse" />
    );
  }

  return (
    <div>
      {/* User area */}
      <div className="absolute bottom-0 left-0 right-0 h-[52px] px-2 flex items-center">
          <div className="flex items-center flex-1">
            <div className="relative">
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
            <div className="ml-2">
              <div className="text-xs font-medium text-white">
                {user?.name?.split(" ")[0]}
              </div>
              <div className="text-xs text-[#949BA4] lowercase">#{user?.role}</div>
            </div>
          </div>
          <div className="flex space-x-1">
            <button title='Head' className="p-2 hover:bg-[#35363C] rounded-md group">
              <Bell className="w-4 h-4 text-[#949BA4] group-hover:text-white" />
            </button>
            <button title='Settings' className="p-2 hover:bg-[#35363C] rounded-md group">
              <Settings className="w-4 h-4 text-[#949BA4] group-hover:text-white" />
            </button>
          </div>
        </div>
    </div>
  )
}

export default UserInfo