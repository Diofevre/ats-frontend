/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { 
  Camera, Phone, Mail, User as UserIcon, Building2, Calendar,
  Bell, Globe, Shield, Trash2, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useAuth, useUserData } from '@/hooks/use-auth';
import { updateProfile } from '@/lib/services/authentications/user';
import { toast } from 'sonner';
import { format, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import clsx from 'clsx';

function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-start space-x-6 mb-12">
        <div className="w-24 h-24 bg-gray-200 rounded-[12px]"></div>
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

function SettingsSection({ title, description, children, className }: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("border border-gray-200 rounded-[12px] overflow-hidden mb-6 bg-white shadow-sm transition-all hover:shadow-md", className)}>
      <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
}

function ToggleSwitch({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={enabled} onChange={(e) => onChange(e.target.checked)} />
        <div className={clsx(
          "block w-14 h-8 rounded-full transition-colors duration-300",
          enabled ? "bg-gray-900" : "bg-gray-200 group-hover:bg-gray-300"
        )}>
          <div className={clsx(
            "absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-sm",
            enabled ? "translate-x-6" : "translate-x-0"
          )} />
        </div>
      </div>
      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
    </label>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
      <div className={clsx(
        "w-2 h-2 rounded-full",
        active ? "bg-emerald-400" : "bg-gray-400"
      )} />
      <span className="text-sm text-gray-600">
        {active ? "Profil actif" : "Profil inactif"}
      </span>
    </div>
  );
}

function Button({ 
  children, 
  variant = "primary",
  disabled = false,
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: "primary" | "secondary" | "danger" 
}) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2",
        variant === "primary" && "bg-gray-900 text-white hover:bg-gray-800",
        variant === "secondary" && "border border-gray-200 text-gray-700 hover:bg-gray-50",
        variant === "danger" && "text-red-600 hover:bg-red-50",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Profile() {
  const { refreshUser } = useAuth();
  const { userData, isLoading, refreshUserData } = useUserData();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profile: undefined as File | undefined,
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [notifications, setNotifications] = useState({
    emailNotifs: true,
    pushNotifs: false,
    weeklyDigest: true,
    marketingEmails: false
  });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'fr',
    timezone: 'Europe/Paris'
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    sessionTimeout: '30'
  });

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
      toast.success("Vos informations ont été mises à jour avec succès.", {
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la mise à jour de vos informations.", {
        icon: <AlertCircle className="w-4 h-4 text-red-500" />
      });
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isValid(date) ? format(date, 'dd MMMM yyyy', { locale: fr }) : '-';
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: UserIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'preferences', label: 'Préférences', icon: Globe }
  ];

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      // Handle account deletion
      console.log('Account deletion requested');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Tabs Navigation */}
        <div className="flex space-x-1 bg-white p-1 rounded-[12px] border border-gray-200 mb-6 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-[8px] flex-1 transition-all duration-200",
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Profile Section */}
        {activeTab === 'profile' && (
          <SettingsSection
            title="Informations personnelles"
            description="Gérez vos informations de profil"
          >
            <div className="flex items-center justify-between mb-8">
              <StatusBadge active={true} />
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <span>Modifier</span>
                  <span>⟶</span>
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={updating}
                  >
                    {updating ? (
                      <span className="animate-spin">⟳</span>
                    ) : (
                      <span>⟶</span>
                    )}
                    <span>Enregistrer</span>
                  </Button>
                </div>
              )}
            </div>

            {isLoading ? (
              <ProfileSkeleton />
            ) : (
              <>
                <div className="flex items-start space-x-6 mb-12">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 overflow-hidden border border-gray-200 rounded-[12px] shadow-sm">
                      <img
                        src={isEditing ? (previewUrl || userData?.profile || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop') : (userData?.profile || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop')}
                        alt={userData?.name}
                        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      />
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 p-2 bg-white cursor-pointer hover:bg-gray-50 transition-all duration-200 border border-gray-200 rounded-lg shadow-sm hover:shadow">
                        <Camera className="w-4 h-4 text-gray-600" />
                        <input placeholder='file' type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{userData?.name}</h2>
                    <div className="flex items-center mt-2 text-gray-500">
                      <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-lg mr-2">
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
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                            <UserIcon className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <input
                            placeholder='text'
                            type="text"
                            className="w-full pl-12 h-11 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Mail className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <input
                            placeholder='email'
                            type="email"
                            className="w-full pl-12 h-11 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Phone className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <input
                            placeholder='tel'
                            type="tel"
                            className="w-full pl-12 h-11 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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
                          <div className="w-8 h-8 bg-gray-100 flex items-center justify-center mr-3 rounded-lg">
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
          </SettingsSection>
        )}

        {/* Notifications Section */}
        {activeTab === 'notifications' && (
          <SettingsSection
            title="Paramètres de notification"
            description="Gérez vos préférences de notification"
          >
            <div className="space-y-6">
              <ToggleSwitch
                label="Notifications par email"
                enabled={notifications.emailNotifs}
                onChange={(value) => setNotifications(prev => ({ ...prev, emailNotifs: value }))}
              />
              <ToggleSwitch
                label="Notifications push"
                enabled={notifications.pushNotifs}
                onChange={(value) => setNotifications(prev => ({ ...prev, pushNotifs: value }))}
              />
              <ToggleSwitch
                label="Résumé hebdomadaire"
                enabled={notifications.weeklyDigest}
                onChange={(value) => setNotifications(prev => ({ ...prev, weeklyDigest: value }))}
              />
              <ToggleSwitch
                label="Emails marketing"
                enabled={notifications.marketingEmails}
                onChange={(value) => setNotifications(prev => ({ ...prev, marketingEmails: value }))}
              />
            </div>
          </SettingsSection>
        )}

        {/* Security Section */}
        {activeTab === 'security' && (
          <>
            <SettingsSection
              title="Sécurité du compte"
              description="Gérez les paramètres de sécurité de votre compte"
            >
              <div className="space-y-6">
                <ToggleSwitch
                  label="Authentification à deux facteurs"
                  enabled={securitySettings.twoFactor}
                  onChange={(value) => setSecuritySettings(prev => ({ ...prev, twoFactor: value }))}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Délai d&apos;expiration de session
                  </label>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 heure</option>
                    <option value="120">2 heures</option>
                  </select>
                </div>
              </div>
            </SettingsSection>

            <SettingsSection
              title="Supprimer le compte"
              description="Supprimez définitivement votre compte et toutes vos données"
              className="border-red-100"
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Une fois que vous supprimez votre compte, il n&apos;y a pas de retour en arrière. Soyez certain.
                </p>
                <Button
                  variant="danger"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Supprimer mon compte</span>
                </Button>
              </div>
            </SettingsSection>
          </>
        )}

        {/* Preferences Section */}
        {activeTab === 'preferences' && (
          <SettingsSection
            title="Préférences"
            description="Personnalisez votre expérience"
          >
            <div className="space-y-6">
              <ToggleSwitch
                label="Mode sombre"
                enabled={preferences.darkMode}
                onChange={(value) => setPreferences(prev => ({ ...prev, darkMode: value }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Langue
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuseau horaire
                </label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                >
                  <option value="Europe/Paris">Europe/Paris</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  <option value="Australia/Sydney">Australia/Sydney</option>
                </select>
              </div>
            </div>
          </SettingsSection>
        )}
      </div>
    </div>
  );
}