"use client";

import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useClientStore } from "@/lib/store-user";
import { useMyProfile } from "@/lib/services/client/client";
import HeaderSkeleton from "./headerSkeleton";
import { LogOut } from "lucide-react";

export const Header = () => {
  const { client, loadClient } = useClientStore();

  useEffect(() => {
    if (!client) {
      loadClient();
    }
  }, [client, loadClient]);

  const { myProfile, isLoading } = useMyProfile(client?.token_candidat);

  const handleLogout = () => {
    document.cookie = "client=; Max-Age=0; path=/;";
    window.location.href = "/login-client";
  };

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <header className="w-full bg-white border border-gray-100 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 ring-2 ring-blue-500/20 transition-all duration-300 hover:ring-blue-500/40">
              <AvatarImage
                src={myProfile?.image || "/assets/images/profile.png"}
                alt={myProfile?.nom}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium">
                {myProfile?.nom
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-gray-900 uppercase">
                {myProfile?.nom}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {myProfile?.email}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 px-6"
            >
              <LogOut className="h-3 w-3" />
              <span className="text-sm">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};