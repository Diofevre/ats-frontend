'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/back_office/AdminSidebar';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar fixe */}
      <div className="fixed left-0 top-0 min-h-screen overflow-y-auto">
        <AdminSidebar isOpen={sidebarOpen} />
      </div>

      {/* Contenu principal */}
      <main
        className={cn(
          "flex-grow min-h-screen transition-all duration-300 ml-64",
        )}
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-4 lg:p-4">
          {children}
        </div>
      </main>
    </div>
  );
}
