/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react';
import { Camera, Phone, Mail, User as UserIcon, Building2, Calendar, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { updateProfile } from '@/lib/services/authentications/user';
import ProfileSkeleton from './SkeletonProfile';
import { FileUpload } from '@/components/file-upload';

type FormData = {
  name: string;
  email: string;
  phone: string;
  profile?: string;
};

type FormField = {
  icon: typeof UserIcon;
  label: string;
  key: keyof Omit<FormData, 'profile'>;
  type: 'text' | 'email' | 'tel';
};

interface UserProfileProps {
  user: any;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 relative p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default function UserProfile({ user, loading, refreshUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    profile: '',
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
      });
      setPreviewUrl(user.profile || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await updateProfile(formData);
      await refreshUser();
      setIsEditing(false);
      toast.success("Vos informations ont été mises à jour avec succès.");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la mise à jour de vos informations.");
    } finally {
      setUpdating(false);
    }
  };

  const handleProfileUpload = async (fileUrl: string) => {
    try {
      setPreviewUrl(fileUrl);
      setFormData(prev => ({ ...prev, profile: fileUrl }));
      
      // Mise à jour immédiate du profil avec la nouvelle URL
      await updateProfile({ profile: fileUrl });
      await refreshUser();
      
      setIsUploadModalOpen(false);
      toast.success("Photo de profil mise à jour avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour de la photo de profil");
    }
  };

  const formFields: FormField[] = [
    { icon: UserIcon, label: 'Nom', key: 'name', type: 'text' },
    { icon: Mail, label: 'Email', key: 'email', type: 'email' },
    { icon: Phone, label: 'Téléphone', key: 'phone', type: 'tel' }
  ];

  if (loading) return <ProfileSkeleton />;

  const displayImage = isEditing ? (previewUrl || user?.profile) : user?.profile;

  return (
    <div className="space-y-8">
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Modifier la photo de profil</h3>
          <FileUpload
            onUpload={handleProfileUpload}
            accept="image"
          />
        </div>
      </Modal>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 uppercase">Informations personnelles</h2>
          <p className="mt-1 text-sm text-gray-500">Mettez à jour vos informations de profil</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="h-9 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Modifier
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsEditing(false);
                setPreviewUrl(user?.profile || '');
                setFormData({
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  profile: user.profile,
                });
              }}
              className="h-9 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={updating}
              className="h-9 px-6 text-sm font-medium text-gray-900 border border-gray-200 rounded-full hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              {updating ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="absolute -bottom-2 -right-2 p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-all border border-gray-200"
              >
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900">{user?.name}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Building2 className="w-4 h-4 mr-1.5" />
              <span>{user?.role}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {isEditing ? (
            <div className="grid gap-6">
              {formFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <field.icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type={field.type}
                      value={formData[field.key]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full h-9 pl-9 pr-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {[
                { icon: UserIcon, label: 'Nom', value: user?.name },
                { icon: Mail, label: 'Email', value: user?.email },
                { icon: Phone, label: 'Téléphone', value: user?.phone },
                { 
                  icon: Calendar, 
                  label: 'Membre depuis', 
                  value: user?.created_at ? format(new Date(user.created_at), 'dd MMMM yyyy', { locale: fr }) : '-'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg">
                    <item.icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}