import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonAdmin = () => {
  return (
    <div className="flex bg-background">
      {/* Skeleton Sidebar */}
      <div className="fixed left-0 top-0 min-h-screen w-64 bg-card border-r border-border/40 shadow-sm">
        <div className="p-6">
          {/* Logo area */}
          <div className="flex items-center gap-3 mb-8">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-32" />
          </div>

          {/* Navigation items */}
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <Skeleton className="h-9 w-9 rounded-lg" /> {/* Icon */}
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-28" /> {/* Menu text */}
                  {i === 0 && <Skeleton className="h-3 w-20" />} {/* Subtitle for first item */}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="absolute bottom-6 left-6 right-6">
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* Skeleton Main Content */}
      <main className="flex-grow min-h-screen ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header section */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-[180px]" /> {/* Page title */}
              <Skeleton className="h-4 w-[240px]" /> {/* Breadcrumb */}
            </div>
            <Skeleton className="h-10 w-[120px] rounded-lg" /> {/* Action button */}
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border/40 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
                  <Skeleton className="h-3 w-16" /> {/* Label */}
                </div>
                <Skeleton className="h-7 w-24 mb-2" /> {/* Value */}
                <Skeleton className="h-3 w-32" /> {/* Subtitle */}
              </div>
            ))}
          </div>

          {/* Main content area */}
          <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="p-6 border-b border-border/40">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-[140px]" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-9 w-[180px] rounded-lg" />
                  <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
              </div>
            </div>
            {/* Table content */}
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 group animate-pulse">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[160px]" />
                    </div>
                    <Skeleton className="h-8 w-[100px] rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SkeletonAdmin