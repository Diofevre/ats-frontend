'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useInvitations } from '@/hooks/use-invitations';
import type { UserRole } from '@/lib/types/invitations';
import { useOrganization } from '@/hooks/use-organization';
import { Combobox } from '../../organizations/[id]/offres/_components/combobox';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleOptions = [
  { value: 'MODERATEUR', label: 'Modérateur' },
  { value: 'ADMINISTRATEUR', label: 'Administrateur' },
];

export default function InvitationModal({ isOpen, onClose }: InvitationModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('MODERATEUR');
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { sendInvitation } = useInvitations();
  const { organizations, isLoadingOrganizations, isErrorOrganizations } = useOrganization();

  const organizationOptions = organizations?.map(org => ({
    value: org.id.toString(),
    label: org.nom
  })) || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrganizationId) {
      toast.error("Veuillez sélectionner une organisation");
      return;
    }

    try {
      setIsSubmitting(true);
      await sendInvitation({
        invitee_email: email,
        organisation_id: Number(selectedOrganizationId),
        role,
      });
      toast.success("L'invitation a été envoyée avec succès");
      onClose();
      setEmail('');
      setRole('MODERATEUR');
      setSelectedOrganizationId('');
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'envoi de l'invitation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-40 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl shadow-black/10 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Inviter un membre</h3>
            <p className="text-sm text-gray-500 mt-1">Ajoutez un nouveau membre à votre équipe</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organisation
            </label>
            <Combobox
              options={organizationOptions}
              value={selectedOrganizationId}
              onChange={setSelectedOrganizationId}
              placeholder="Sélectionner une organisation"
              emptyMessage={
                isLoadingOrganizations
                  ? "Chargement des organisations..."
                  : isErrorOrganizations
                  ? "Erreur lors du chargement des organisations"
                  : "Aucune organisation trouvée"
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-9 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              placeholder="exemple@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <Combobox
              options={roleOptions}
              value={role}
              onChange={(value) => setRole(value as UserRole)}
              placeholder="Sélectionner un rôle"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoadingOrganizations}
              className="h-9 px-4 text-sm font-medium text-white bg-blue-600 rounded-[12px] hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "En cours..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}