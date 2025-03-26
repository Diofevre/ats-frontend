'use client';

import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Servers sidebar */}
      <div className="w-[72px] bg-[#1E1F22] flex flex-col items-center py-3 space-y-2">
        {/* Servers */}
        <div className="mb-2">
          {ADMIN_SERVERS.map((server, index) => (
            <React.Fragment key={server.id}>
              <button
                onClick={() => setActiveServer(server.id)}
                className={cn(
                  "w-12 h-12 rounded-[24px] flex items-center justify-center transition-all duration-200 group relative mb-2",
                  activeServer === server.id 
                    ? "bg-[#5865F2] rounded-[16px]" 
                    : "bg-[#313338] hover:bg-[#5865F2] hover:rounded-[16px]"
                )}
              >
                <span className="text-white font-semibold text-sm">
                  {server.initial}
                </span>
                
                {/* Server Indicator */}
                <div className={cn(
                  "absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200",
                  activeServer === server.id ? "h-8" : "h-2 group-hover:h-8",
                  activeServer === server.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )} style={{ transform: 'translateX(-50%)' }} />
              </button>
              
              {index === 0 && (
                <>
                  <button title='Ajout' className="w-12 h-12 rounded-[24px] bg-[#313338] flex items-center justify-center hover:bg-[#3BA55C] hover:rounded-[16px] transition-all duration-200 group mb-2">
                    <Plus className="w-6 h-6 text-[#3BA55C] group-hover:text-white transition-colors" />
                  </button>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Channels sidebar */}
      <div className={cn(
        "w-60 bg-[#2B2D31] transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Server name header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-[#1E1F22] shadow-sm">
          <h2 className="font-semibold text-white uppercase">ATS System</h2>
        </div>

        {/* Navigation Categories */}
        <div className="p-2 text-[#949BA4]">
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
                    onClick={() => router.push(item.path)}
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
                      onClick={() => router.push(route.path)}
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
  );
}