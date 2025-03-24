'use client';

import { useState } from 'react';
import AdminHeader from '@/components/back_office/AdminHeader';
import AdminSidebar from '@/components/back_office/AdminSidebar';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <AdminHeader 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        isSidebarOpen={sidebarOpen}
      />
      <AdminSidebar isOpen={sidebarOpen} />
      <main className={cn(
        "pt-16 min-h-screen transition-all duration-300",
        sidebarOpen ? "md:pl-64" : "md:pl-0"
      )}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}