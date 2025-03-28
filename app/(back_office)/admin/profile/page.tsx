/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useAuth, useUserData } from '@/hooks/use-auth';
import { Camera, Phone, Mail, User as UserIcon, Building2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateProfile } from '@/lib/services/authentications/user';
import { toast } from 'sonner';
import { format, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';

function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-start space-x-6 mb-12">
        <div className="w-24 h-24 bg-gray-200"></div>
        <div className="space-y-3">
          <div className="h-6 w-48 bg-gray-200"></div>
          <div className="h-4 w-32 bg-gray-200"></div>
        </div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center py-4 border-b border-gray-100">
            <div className="w-5 h-5 bg-gray-200 mr-3"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 mb-2"></div>
              <div className="h-5 w-48 bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Profile() {
  const { refreshUser } = useAuth();
  const { userData, isLoading, refreshUserData } = useUserData();
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
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        profile: undefined,
      });
    }
  }, [userData]);

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
      await Promise.all([refreshUser(), refreshUserData()]);
      setIsEditing(false);
      toast.success("Vos informations ont été mises à jour avec succès.")
    } catch (error) {
      console.log(error);
      toast.error("Une erreur s'est produite lors de la mise à jour de vos informations.");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isValid(date) ? format(date, 'dd MMMM yyyy', { locale: fr }) : '-';
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-[12px]">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-medium text-gray-900">Mon Profil</h1>
                <p className="mt-1 text-sm text-gray-500">Gérez vos informations personnelles</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-sm text-gray-600 ml-2">Profil actif</span>
                </div>
              </div>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-900 text-white hover:bg-gray-800 h-11 px-8 rounded-[24px]"
                >
                  ⟶
                  Modifier
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-gray-200 h-11 px-8 rounded-[24px]"
                    onClick={() => setIsEditing(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={updating}
                    className="bg-gray-900 text-white hover:bg-gray-800 h-11 px-8 rounded-[24px]"
                  >
                    {updating ? (
                      <span className="mr-2 animate-spin">⟳</span>
                    ) : (
                      <span>
                        ⟶
                      </span>
                    )}
                    Enregistrer
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="p-8">
            {isLoading ? (
              <ProfileSkeleton />
            ) : (
              <>
                <div className="flex items-start space-x-6 mb-12">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 overflow-hidden border border-gray-200 rounded-[12px]">
                      <img
                        src={isEditing ? (previewUrl || userData?.profile || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop') : (userData?.profile || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop')}
                        alt={userData?.name}
                        className="w-full h-full object-cover rounded-[12px]"
                      />
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 p-2 bg-white cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                        <Camera className="w-4 h-4 text-gray-600" />
                        <input placeholder='change_image' type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{userData?.name}</h2>
                    <div className="flex items-center mt-2 text-gray-500">
                      <div className="flex items-center justify-center w-6 h-6 bg-gray-100 mr-2">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{userData?.role}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {isEditing ? (
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 flex items-center justify-center">
                            <UserIcon className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="pl-12 h-11 bg-gray-50 border-gray-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 flex items-center justify-center">
                            <Mail className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-12 h-11 bg-gray-50 border-gray-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 flex items-center justify-center">
                            <Phone className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-12 h-11 bg-gray-50 border-gray-200"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {[
                        { icon: UserIcon, label: 'Nom', value: userData?.name },
                        { icon: Mail, label: 'Email', value: userData?.email },
                        { icon: Phone, label: 'Téléphone', value: userData?.phone },
                        { 
                          icon: Calendar, 
                          label: 'Membre depuis', 
                          value: formatDate(userData?.created_at)
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
                          <div className="w-8 h-8 bg-gray-100 flex items-center justify-center mr-3 rounded-[12px]">
                            <item.icon className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="mt-1 text-gray-900 font-medium">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}