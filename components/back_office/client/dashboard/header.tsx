import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useClientStore } from "@/lib/store-user";

const Header = () => {
  const user = {
    name: "RAHANDRIMIRAY Celicin",
    email: "rahandrimiray@gmail.com",
    avatar: "/path-to-avatar.jpg",
  };

  const { client, loadClient } = useClientStore();

  useEffect(() => {
    if (!client) {
      loadClient();
    }
  }, [client, loadClient]);

  const handleLogout = () => {
    document.cookie = "client=; Max-Age=0; path=/;";
    window.location.href = "/login-client";
  };

  return (
    <div className="mb-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center space-x-6">
        <Avatar className="h-14 w-14 border-2 border-blue-400 dark:border-purple-400 transition-colors hover:border-blue-500">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-blue-400 text-white font-bold">
            {client?.candidat_nom
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {client?.candidat_nom}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            exemple@gmail.com
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors duration-300"
        onClick={handleLogout}>
        Déconnexion
      </Button>
    </div>
  );
};

export default Header;
