"use client";

import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useClientStore } from "@/lib/store-user";
import { useMyProfile } from "@/lib/services/client/client";
import HeaderSkeleton from "./headerSkeleton";
import { LogOut } from "lucide-react";

const Header = () => {
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
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between transition-all duration-200 hover:border-blue-300">
      {/* Profil */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12 border-2 border-blue-500 rounded-full transition-all duration-200 hover:border-blue-600">
          <AvatarImage
            src={myProfile?.image || "/assets/images/profile.png"}
            alt={myProfile?.nom}
          />
          <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-lg">
            {myProfile?.nom
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            {myProfile?.nom}
          </h2>
          <p className="text-sm text-gray-500">{myProfile?.email}</p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full p-2 transition-colors duration-200"
        onClick={handleLogout}
        aria-label="Se déconnecter">
        <LogOut size={20} />
      </Button>
    </div>
  );
};

export default Header;
