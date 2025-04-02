import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { User, Role } from '@/lib/types/authentications/user.types';
import { useOrganization } from '@/hooks/use-organization';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (userId: number, data: { role: string; organisations: number[] }) => Promise<void>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onUpdate }) => {
  const [role, setRole] = useState<string>(user.role);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { organizations } = useOrganization();

  // Initialize selected organizations from user data
  useEffect(() => {
    if (user.organisations) {
      setSelectedOrganizations(user.organisations.map(org => org.id.toString()));
    }
  }, [user.organisations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      // Convert selected organizations to numbers
      const organizationIds = selectedOrganizations.map(id => parseInt(id));
  
      // Validate organization selection for MODERATEUR
      if (role === 'MODERATEUR' && organizationIds.length === 0) {
        throw new Error('Veuillez sélectionner au moins une organisation pour le rôle de modérateur');
      }
  
      const payload = {
        role: role as Role,
        organisations: organizationIds
      };
  
      await onUpdate(user.id, payload);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la mise à jour du rôle');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleOrganizationChange = (orgId: string) => {
    setSelectedOrganizations(prev => {
      if (prev.includes(orgId)) {
        return prev.filter(id => id !== orgId);
      }
      return [...prev, orgId];
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le rôle de l&apos;utilisateur</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nom
              </label>
              <input
                type="text"
                value={user.name}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Rôle</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMINISTRATEUR">Administrateur</SelectItem>
                  <SelectItem value="MODERATEUR">Modérateur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === 'MODERATEUR' && (
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Organisations</label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {organizations?.map(org => (
                    <label key={org.id} className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedOrganizations.includes(org.id.toString())}
                        onChange={() => handleOrganizationChange(org.id.toString())}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{org.nom}</span>
                    </label>
                  ))}
                  {(!organizations || organizations.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-2">
                      Aucune organisation disponible
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Statut
              </label>
              <input
                type="text"
                value={user.is_active ? 'Actif' : 'Inactif'}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <DialogFooter>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-[12px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading || (role === user.role && selectedOrganizations.length === 0)}
              className="inline-flex items-center justify-center rounded-[12px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                'Enregistrer'
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;