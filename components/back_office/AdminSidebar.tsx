'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ADMIN_ROUTES } from '@/lib/constants/back_office/constants';

interface AdminSidebarProps {
  isOpen: boolean;
}

export default function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const [showDashboardSubmenu, setShowDashboardSubmenu] = useState(true);

  const isActive = (path: string) => pathname === path;

  const NavLink = ({ path, label, icon: Icon }: { path: string; label: string; icon: React.ElementType }) => (
    <Link
      href={path}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden",
        isActive(path) 
          ? "bg-white text-[#2C9CC6] shadow-lg" 
          : "text-white hover:bg-white/20"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110",
        isActive(path) ? "text-[#2C9CC6]" : "text-white"
      )} />
      <span className="relative z-10">{label}</span>
      {!isActive(path) && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}
    </Link>
  );

  const SubNavLink = ({ path, label, icon: Icon }: { path: string; label: string; icon: React.ElementType }) => (
    <Link
      href={path}
      className={cn(
        "flex items-center px-4 py-2.5 text-sm rounded-xl transition-all duration-300 group relative overflow-hidden",
        isActive(path) 
          ? "bg-white text-[#2C9CC6] shadow-lg" 
          : "text-white/90 hover:bg-white/20"
      )}
    >
      <Icon className={cn(
        "w-4 h-4 mr-3 transition-transform duration-300 group-hover:scale-110",
        isActive(path) ? "text-[#2C9CC6]" : "text-white/90"
      )} />
      <span className="relative z-10">{label}</span>
      {!isActive(path) && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}
    </Link>
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-[280px] bg-[#2C9CC6] transition-all duration-300 ease-in-out transform z-20 shadow-xl",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6 px-4 space-y-2">
          {/* Logo */}
          <div className="px-3 py-4 mb-8">
            <Link href="/admin" className="block transition-transform duration-300 hover:scale-105">
              <Image
                src="/ats.png"
                alt="Logo"
                width={140}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Dashboard Section with Submenu */}
          <div className="mb-4">
            <button
              onClick={() => setShowDashboardSubmenu(!showDashboardSubmenu)}
              className={cn(
                "flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden",
                isActive(ADMIN_ROUTES.dashboard.path) 
                  ? "bg-white text-[#2C9CC6] shadow-lg" 
                  : "text-white hover:bg-white/20"
              )}
            >
              <ADMIN_ROUTES.dashboard.icon className={cn(
                "w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110",
                isActive(ADMIN_ROUTES.dashboard.path) ? "text-[#2C9CC6]" : "text-white"
              )} />
              <span className="relative z-10">{ADMIN_ROUTES.dashboard.label}</span>
              <ChevronDown className={cn(
                "w-4 h-4 ml-auto transition-transform duration-300",
                showDashboardSubmenu && "transform rotate-180",
                isActive(ADMIN_ROUTES.dashboard.path) ? "text-[#2C9CC6]" : "text-white"
              )} />
              {!isActive(ADMIN_ROUTES.dashboard.path) && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              )}
            </button>

            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              showDashboardSubmenu ? "max-h-48 mt-2" : "max-h-0"
            )}>
              <div className="ml-4 space-y-1">
                {ADMIN_ROUTES.dashboard.subMenu.map((item) => (
                  <SubNavLink key={item.path} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Main Navigation Items */}
          <div className="space-y-1.5">
            {Object.entries(ADMIN_ROUTES)
              .filter(([key]) => key !== 'dashboard' && key !== 'settings')
              .map(([, route]) => (
                <NavLink key={route.path} {...route} />
              ))}
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 bg-[#2C9CC6]/80 backdrop-blur-sm">
          <NavLink {...ADMIN_ROUTES.settings} />
        </div>
      </div>
    </aside>
  );
}