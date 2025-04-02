'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavClient } from "@/lib/constants/back_office/constants";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathName = usePathname();

  return (
    <div className="w-full bg-white border-b mt-4">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center gap-3 h-14">
          {NavClient.map((link, index) => {
            const Icon = link.icon;
            const isActive = pathName.startsWith(link.href);
            
            return (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "h-14 px-4 rounded-none border-b-2 gap-2 transition-all duration-200",
                  isActive
                    ? "border-blue-500 text-blue-600 bg-blue-50/50 hover:bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                )}
                onClick={() => window.location.href = link.href}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{link.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};