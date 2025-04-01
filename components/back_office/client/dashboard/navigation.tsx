"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavClient } from "@/lib/constants/back_office/constants";
import { Home, User, FileText } from "lucide-react";

const Navigation = () => {
  const pathName = usePathname();

  const getIcon = (label: string) => {
    switch (label) {
      case "Accueil":
        return <Home size={20} />;
      case "Profile":
        return <User size={20} />;
      case "Candidatures":
        return <FileText size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-16 my-5 bg-[#1e1f22] flex items-center px-4">
      <nav className="flex items-center gap-2">
        {NavClient.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "h-10 px-4 rounded-lg flex items-center gap-2 group relative transition-all",
              pathName.startsWith(link.href)
                ? "bg-[#5865f2] text-white"
                : "bg-[#2b2d31] text-gray-400 hover:bg-[#5865f2] hover:text-white"
            )}>
            {getIcon(link.label)}
            <span className="text-sm font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
