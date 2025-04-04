'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RefreshButtonProps {
  isRefreshing?: boolean;
  onClick?: () => void;
}

const RefreshButton = ({ isRefreshing, onClick }: RefreshButtonProps) => {
  const router = useRouter();

  const handleRefresh = () => {
    if (onClick) {
      onClick();
    } else {
      router.refresh();
    }
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="relative overflow-hidden bg-gradient-to-r from-[#1E1F22] to-[#1E1F22]/80 hover:from-[#313338] hover:to-[#313338]/80 
        text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform transition-all duration-200 
        hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <span className="flex items-center gap-2">
        <RotateCw 
          className={`h-4 w-4 transition-transform ${
            isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
          }`} 
        />
        <span className="font-medium">
          {isRefreshing ? 'Actualisation...' : 'Actualiser'}
        </span>
      </span>
      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-200" />
    </Button>
  );
};

export default RefreshButton;