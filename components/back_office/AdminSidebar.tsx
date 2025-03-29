'use client';

import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { ADMIN_ROUTES, ADMIN_SERVERS } from '@/lib/constants/back_office/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import UserInfo from './UserInfo';

interface AdminSidebarProps {
  isOpen: boolean;
}

export default function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const router = useRouter();
  const [activeServer, setActiveServer] = useState('ats');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['dashboard']);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1E1F22] text-white hover:bg-[#313338]"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 flex transition-transform duration-300 ease-in-out z-40",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0" // Always visible on large screens
      )}>
        {/* Servers sidebar */}
        <div className="w-[72px] bg-[#1E1F22] flex flex-col items-center py-3 space-y-2 h-screen">
          {/* Servers */}
          <div className="mb-2">
            {ADMIN_SERVERS.map((server) => (
              <React.Fragment key={server.id}>
                <button
                  onClick={() => setActiveServer(server.id)}
                  className={cn(
                    "w-12 h-12 rounded-[24px] flex items-center justify-center transition-all duration-200 group relative mb-2",
                    activeServer === server.id 
                      ? "bg-[#2C9CC6] rounded-[16px]" 
                      : "bg-[#313338] hover:bg-[#2C9CC6] hover:rounded-[16px]"
                  )}
                >
                  <span className="text-black font-semibold text-sm">
                    {server.initial}
                  </span>
                  
                  {/* Server Indicator */}
                  <div className={cn(
                    "absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200",
                    activeServer === server.id ? "h-8" : "h-2 group-hover:h-8",
                    activeServer === server.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )} style={{ transform: 'translateX(-50%)' }} />
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Channels sidebar */}
        <div className={cn(
          "w-60 bg-[#2B2D31] h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          {/* Server name header */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-[#1E1F22]">
            <h2 className="font-semibold text-white uppercase">ATS System</h2>
          </div>

          {/* Navigation Categories - Scrollable area */}
          <div className="p-2 text-[#949BA4] overflow-y-auto h-[calc(100vh-64px)]">
            {/* Dashboard with submenu */}
            <div className="mb-4">
              <button
                onClick={() => toggleCategory('dashboard')}
                className="flex items-center px-1 mb-1 w-full hover:text-white group"
              >
                <ChevronDown className={cn(
                  "w-3 h-3 mr-1 transition-transform",
                  expandedCategories.includes('dashboard') ? "transform rotate-0" : "transform -rotate-90"
                )} />
                <span className="text-xs font-semibold tracking-wide">
                  TABLEAU DE BORD
                </span>
              </button>

              {expandedCategories.includes('dashboard') && (
                <div className="space-y-0.5">
                  <button className="flex items-center w-full px-2 py-1.5 rounded text-[#949BA4] hover:bg-[#35363C] hover:text-white group">
                    <ADMIN_ROUTES.dashboard.icon className="w-5 h-5 mr-1.5 text-[#949BA4] group-hover:text-white" />
                    <span className="text-sm">{ADMIN_ROUTES.dashboard.label}</span>
                  </button>
                  {ADMIN_ROUTES.dashboard.subMenu.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        router.push(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-2 py-1.5 rounded text-[#949BA4] hover:bg-[#35363C] hover:text-white group"
                    >
                      <item.icon className="w-5 h-5 mr-1.5 text-[#949BA4] group-hover:text-white" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Other Categories */}
            <div className="mb-4">
              <button
                onClick={() => toggleCategory('main')}
                className="flex items-center px-1 mb-1 w-full hover:text-white group"
              >
                <ChevronDown className={cn(
                  "w-3 h-3 mr-1 transition-transform",
                  expandedCategories.includes('main') ? "transform rotate-0" : "transform -rotate-90"
                )} />
                <span className="text-xs font-semibold tracking-wide">
                  GESTION
                </span>
              </button>

              {expandedCategories.includes('main') && (
                <div className="space-y-0.5">
                  {Object.entries(ADMIN_ROUTES)
                    .filter(([key]) => key !== 'dashboard' && key !== 'settings')
                    .map(([, route]) => (
                      <button
                        key={route.path}
                        onClick={() => {
                          router.push(route.path);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-2 py-1.5 rounded text-[#949BA4] hover:bg-[#35363C] hover:text-white group"
                      >
                        <route.icon className="w-5 h-5 mr-1.5 text-[#949BA4] group-hover:text-white" />
                        <span className="text-sm">{route.label}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          <UserInfo />
        </div>
      </div>
    </>
  );
}