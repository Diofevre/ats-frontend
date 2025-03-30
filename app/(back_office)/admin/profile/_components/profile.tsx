/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Camera, Phone, Mail, User as UserIcon, Building2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { updateProfile } from '@/lib/services/authentications/user';
import ProfileSkeleton from './SkeletonProfile';

type FormData = {
  name: string;
  email: string;
  phone: string;
  profile?: File;
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

export default function UserProfile({ user, loading, refreshUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
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
      toast.success("Vos informations ont été mises à jour avec succès.");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la mise à jour de vos informations.");
    } finally {
      setUpdating(false);
    }
  };

  const formFields: FormField[] = [
    { icon: UserIcon, label: 'Nom', key: 'name', type: 'text' },
    { icon: Mail, label: 'Email', key: 'email', type: 'email' },
    { icon: Phone, label: 'Téléphone', key: 'phone', type: 'tel' }
  ];

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="space-y-8">
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
              onClick={() => setIsEditing(false)}
              className="h-9 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={updating}
              className="h-9 px-4 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
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
              <img
                src={isEditing ? (previewUrl || user?.profile || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop') : (user?.profile || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop')}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-all border border-gray-200">
                <Camera className="w-4 h-4 text-gray-600" />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
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