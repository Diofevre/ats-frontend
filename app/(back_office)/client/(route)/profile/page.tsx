"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Edit2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useClientStore } from "@/lib/store-user";
import { useMyProfile } from "@/lib/services/client/client";
import ProfileSkeleton from "@/components/back_office/client/dashboard/profileSkeleton";

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);

  const { client, loadClient } = useClientStore();

  useEffect(() => {
    if (!client) {
      loadClient();
    }
  }, [client, loadClient]);

  const { myProfile, isLoading } = useMyProfile(client?.token_candidat);

  const [userData, setUserData] = useState(myProfile);
  const [tempUserData, setTempUserData] = useState(myProfile);

  useEffect(() => {
    if (myProfile && !isLoading) {
      setUserData(myProfile);
      setTempUserData(myProfile);
    }
  }, [myProfile, isLoading]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempUserData(userData);
  };

  const handleSave = () => {
    setUserData(tempUserData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempUserData(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempUserData((prev) => ({
      ...prev,
      [name]: value || null,
    }));
  };

  if (isLoading || !userData) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="container mx-auto py-8 rounded-xl min-h-screen">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase">
          Mon profil
        </h2>
        {!isEditing ? (
          <Button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 rounded-[12px] px-6 py-2 h-10 text-sm font-medium transition-all duration-200 hover:ring-2 hover:ring-blue-200">
            <Edit2 className="h-4 w-4" />
            Modifier
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2 rounded-[12px] px-6 py-2 h-10 text-sm font-medium transition-all duration-200 hover:ring-2 hover:ring-green-200">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 flex items-center gap-2 rounded-[12px] px-4 py-2 h-10 text-sm font-medium transition-all duration-200">
              <X className="h-4 w-4" />
              Annuler
            </Button>
          </div>
        )}
      </div>

      {/* Carte Profil */}
      <Card className="bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-blue-300">
        <CardHeader className="border-b border-gray-100 px-6 py-4">
          <CardTitle className="text-xl font-semibold text-gray-800 uppercase">
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Avatar et Nom */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-blue-500 rounded-full transition-all duration-200 hover:border-blue-600">
              <AvatarImage src={userData.image} alt={userData.nom} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-xl">
                {userData.nom
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                {userData.nom}
              </h3>
              <p className="text-sm text-gray-500">ID: {userData.id}</p>
            </div>
          </div>

          {/* Détails */}
          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-gray-700 font-medium">
                    Nom complet
                  </Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={tempUserData.nom}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 h-12 text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={tempUserData.email}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 h-12 text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="telephone"
                    className="text-gray-700 font-medium">
                    Téléphone
                  </Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    value={tempUserData.telephone || ""}
                    onChange={handleChange}
                    placeholder="Non spécifié"
                    className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 h-12  text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-blue-300"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">{userData.email}</span>
                {userData.is_email_active && (
                  <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-0.5 rounded-full">
                    Vérifié
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">
                  {userData.telephone || "Non spécifié"}
                </span>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  Créé le :{" "}
                  <span className="text-gray-700">
                    {new Date(userData.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  Mis à jour le :{" "}
                  <span className="text-gray-700">
                    {new Date(userData.updated_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
