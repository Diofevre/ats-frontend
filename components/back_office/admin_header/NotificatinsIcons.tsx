'use client';

import React from 'react';
import { Mail, Bell } from 'lucide-react';

export function NotificationIcons() {
  return (
    <>
      <button className="relative p-2 text-white hover:text-indigo-600 focus:outline-none transition-colors duration-300">
        <Mail className="w-6 h-6" />
        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white transform scale-100 hover:scale-110 transition-transform duration-300">
          3
        </span>
      </button>

      <button className="relative p-2 text-white hover:text-indigo-600 focus:outline-none transition-colors duration-300">
        <Bell className="w-6 h-6" />
        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white transform scale-100 hover:scale-110 transition-transform duration-300">
          5
        </span>
      </button>
    </>
  );
}