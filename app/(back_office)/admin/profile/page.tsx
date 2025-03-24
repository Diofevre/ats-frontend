/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Camera, Loader2, Phone, Mail, User as UserIcon, Building2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateProfile } from '@/lib/services/authentications/user';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Profile() {
  const { user, loading, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profile: undefined as File | undefined,
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile: undefined,
      });
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await updateProfile(formData);
      await refreshUser();
      setIsEditing(false);
      toast.success("Vos informations ont été mises à jour avec succès.")
    } catch (error) {
      console.log(error);
      toast.error("Une erreur s'est produite lors de la mise à jour de vos informations.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="mt-2 text-gray-600">Gérez vos informations personnelles et vos préférences</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Banner */}
          <div className="h-48 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20 relative z-10">
              {/* Profile Image and Name Section */}
              <div className="flex flex-col items-center md:items-start md:flex-row md:space-x-6">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                    <img
                      src={isEditing ? (previewUrl || user?.profile || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop') : (user?.profile || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop')}
                      alt={user?.name}
                      className="w-full h-full object-cover transition duration-200 group-hover:scale-105"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 bg-white text-gray-700 p-2 rounded-xl cursor-pointer hover:bg-gray-50 shadow-lg transition-all duration-200 border border-gray-200">
                      <Camera className="w-5 h-5" />
                      <input
                        placeholder='Profile'
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>

                {/* Name and Role */}
                <div className="mt-4 md:mt-24 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                  <div className="flex items-center mt-2 space-x-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 font-medium">{user?.role}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 md:mt-0">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="rounded-[12px] h-12 border-none bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                  >
                    Modifier le profil
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="rounded-[12px] h-12 border-none bg-gradient-to-r from-red-400 to-pink-400 text-white hover:from-red-300 hover:to-pink-300 font-semibold shadow-xl shadow-pink-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={updating}
                      className="rounded-[12px] h-12 border-none bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                    >
                      {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Enregistrer
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* User Details Section */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations personnelles</h3>
              {isEditing ? (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nom</label>
                    <div className="relative">
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-10 h-11 border-gray-200"
                      />
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 h-11 border-gray-200"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Téléphone</label>
                    <div className="relative">
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 h-11 border-gray-200"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-cyan-50/50 to-blue-50/50 border border-cyan-100">
                    <UserIcon className="h-5 w-5 text-cyan-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nom</p>
                      <p className="mt-1 font-medium text-gray-900">{user?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-cyan-50/50 to-blue-50/50 border border-cyan-100">
                    <Mail className="h-5 w-5 text-cyan-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 font-medium text-gray-900">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-cyan-50/50 to-blue-50/50 border border-cyan-100">
                    <Phone className="h-5 w-5 text-cyan-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Téléphone</p>
                      <p className="mt-1 font-medium text-gray-900">{user?.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-cyan-50/50 to-blue-50/50 border border-cyan-100">
                    <Calendar className="h-5 w-5 text-cyan-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Membre depuis</p>
                      <p className="mt-1 font-medium text-gray-900">
                        {format(new Date(user?.created_at || ''), 'dd MMMM yyyy', { locale: fr })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}