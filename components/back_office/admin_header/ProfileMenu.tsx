/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export function ProfileMenu() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-indigo-100 animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <button
        title="Profile Menu"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="flex items-center space-x-2 focus:outline-none group"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 mt-1">
          {user?.profile ? (
            <img
              src={user.profile}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="w-6 h-6 text-indigo-600" />
          )}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">
            {user?.name?.split(" ")[0]}
          </p>
          <p className="text-xs text-indigo-100">{user?.role}</p>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white transition-transform duration-300",
            showProfileMenu && "transform rotate-180"
          )}
        />
      </button>

      {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out">
          <div className="py-1">
            <Link
              href="/admin/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
            >
              Mon profil
            </Link>
            <Link
              href="/admin/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
            >
              Paramètres
            </Link>
            <div className="border-t border-gray-100">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}