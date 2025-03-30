"use client";

import { Badge } from "@/components/ui/badge";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, Mail, MapPin, Phone, Edit2, Save } from "lucide-react";

// Mock user data
const mockUser = {
  id: "user1",
  nom: "Martin",
  prenom: "Sophie",
  email: "sophie.martin@example.com",
  telephone: "+33 6 12 34 56 78",
  adresse: "15 Rue de la Paix",
  ville: "Paris",
  pays: "France",
  code_postal: "75001",
  titre: "Développeuse Frontend",
  bio: "Développeuse passionnée avec 5 ans d'expérience en développement web frontend. Spécialisée en React, Next.js et TypeScript.",
  competences: ["React", "TypeScript", "Next.js", "CSS", "HTML", "JavaScript"],
  experience: "5 ans",
  education: "Master en Informatique, Université de Paris",
  avatar: "/placeholder.svg?height=100&width=100",
};

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const [tempUserData, setTempUserData] = useState(mockUser);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mon profil</h2>
        {!isEditing ? (
          <Button onClick={handleEdit} className="flex items-center gap-2">
            <Edit2 className="h-4 w-4" />
            Modifier
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={userData.avatar}
                  alt={`${userData.prenom} ${userData.nom}`}
                />
                <AvatarFallback>{`${userData.prenom.charAt(
                  0
                )}${userData.nom.charAt(0)}`}</AvatarFallback>
              </Avatar>
            </motion.div>

            <h3 className="text-xl font-bold">{`${userData.prenom} ${userData.nom}`}</h3>
            <p className="text-blue-600 font-medium mb-4">{userData.titre}</p>

            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{userData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{userData.telephone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{`${userData.adresse}, ${userData.code_postal} ${userData.ville}, ${userData.pays}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{`${userData.experience} d'expérience`}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Détails du profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isEditing ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      id="prenom"
                      name="prenom"
                      value={tempUserData.prenom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      id="nom"
                      name="nom"
                      value={tempUserData.nom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={tempUserData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      value={tempUserData.telephone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titre">Titre professionnel</Label>
                    <Input
                      id="titre"
                      name="titre"
                      value={tempUserData.titre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Expérience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={tempUserData.experience}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={tempUserData.bio}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Éducation</Label>
                  <Input
                    id="education"
                    name="education"
                    value={tempUserData.education}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Biographie</h3>
                  <p className="text-gray-600">{userData.bio}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Compétences</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.competences.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Éducation</h3>
                  <p className="text-gray-600">{userData.education}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
