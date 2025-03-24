'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NotificationIcons } from './admin_header/NotificatinsIcons';
import { SearchBar } from './admin_header/SearchBar';
import { ProfileMenu } from './admin_header/ProfileMenu';

interface AdminHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function AdminHeader({ toggleSidebar, isSidebarOpen }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 right-0 left-0 bg-[#2C9CC6] z-50">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Toggle Button with Animation */}
        <button
          title="Toggle Sidebar"
          onClick={toggleSidebar}
          className={cn(
            "p-2 rounded-xl text-white hover:bg-white hover:text-[#2C9CC6] focus:outline-none transition-all duration-300 hover:shadow-lg",
            isSidebarOpen && "transform rotate-180"
          )}
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-6 ml-auto">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="h-8 w-px bg-white/20 rounded-full" /> {/* Vertical Divider */}
          <NotificationIcons />
          <div className="h-8 w-px bg-white/20 rounded-full" /> {/* Vertical Divider */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}