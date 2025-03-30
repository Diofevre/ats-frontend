'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/back_office/AdminSidebar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import SkeletonAdmin from '@/components/SkeletonAdmin';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen] = useState(true);
  const { user, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || error)) {
      router.push('/login');
    }
  }, [user, loading, error, router]);

  if (loading) {
    return <SkeletonAdmin />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background bg-gray-50">
      {/* Sidebar container - fixed on desktop, sliding on mobile */}
      <div className="fixed left-0 top-0 h-screen z-40">
        <AdminSidebar isOpen={sidebarOpen} />
      </div>

      {/* Main content area - responsive padding based on sidebar state */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 ",
          "min-h-screen w-full",
          // Responsive margin for sidebar
          "lg:ml-[332px]", // 72px (server bar) + 260px (channel bar)
          // Padding for content
          "p-4 sm:p-6 lg:p-8",
          // Ensure content starts below mobile header on small screens
          "pt-16 lg:pt-8"
        )}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}