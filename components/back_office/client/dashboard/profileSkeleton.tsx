"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen mt-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase">Mon profil</h2>
        <Skeleton className="h-10 w-28 rounded-lg bg-gray-200" />
      </div>

      <Card className="bg-white border border-gray-200 rounded-xl">
        <CardHeader className="border-b border-gray-100 px-6 py-4">
          <Skeleton className="h-6 w-48 bg-gray-200 rounded" />
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="flex items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 bg-gray-200 rounded" />
              <Skeleton className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
              <Skeleton className="h-5 w-72 bg-gray-200 rounded" />
              <Skeleton className="h-5 w-16 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
              <Skeleton className="h-5 w-40 bg-gray-200 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-56 bg-gray-200 rounded" />
              <Skeleton className="h-4 w-64 bg-gray-200 rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
