'use client'

import React, { useState, useMemo } from 'react';
import { 
  Loader2, 
  Search, 
  X, 
  Phone, 
  Mail, 
  Circle,
  ShieldCheck,
  UserCog,
  Pencil
} from 'lucide-react';
import { useOrganization } from '@/hooks/use-organization';
import Nothings from '@/components/nothings';
import { User } from '@/lib/types/authentications/user.types';
import EditUserModal from './modalUser';
import { useAuth } from '@/hooks/use-auth';

interface UsersProps {
  organizationId: number;
}

const UsersList: React.FC<UsersProps> = ({ organizationId }) => {
  const { users, isLoadingUsers, isErrorUsers } = useOrganization(organizationId);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { updateUser } = useAuth();

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase().trim();
    return users.filter((user) => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      (user.phone && user.phone.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  const getRoleBadgeStyles = (role: string) => {
    const lowercaseRole = role.toLowerCase();
    if (lowercaseRole === 'administrateur') {
      return {
        containerClass: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20',
        icon: ShieldCheck,
      };
    }
    return {
      containerClass: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
      icon: UserCog,
    };
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (userId: string, data: { name: string; role: string; is_active: boolean }) => {
    await updateUser(userId, data);
    setEditingUser(null);
  };

  if (isLoadingUsers) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />
          <p className="mt-2 text-sm text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isErrorUsers) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4 py-6 bg-red-50 rounded-2xl">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-red-900">Error Loading Users</h3>
          <p className="mt-2 text-sm text-red-600">Please try again later or contact support if the problem persists.</p>
        </div>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <Nothings 
        title='Users'
      />
    );
  }

  return (
    <>
      <span
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
      >
        ⟵
        Retour aux carrieres
      </span>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 uppercase">
                Organization Users
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage and view all users in your organization
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or role..."
                className="block w-full pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
          {filteredUsers.length > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <Circle className="h-2 w-2 fill-current" />
              <span>
                Showing <span className="font-medium text-gray-900">{filteredUsers.length}</span> of{' '}
                <span className="font-medium text-gray-900">{users.length}</span> users
              </span>
            </div>
          )}
        </div>

        {filteredUsers.length === 0 ? (
          <Nothings title='users' />
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredUsers.map((user) => {
              const roleStyles = getRoleBadgeStyles(user.role);
              const RoleIcon = roleStyles.icon;

              return (
                <li 
                  key={user.id} 
                  className="hover:bg-gray-50/50 transition duration-200"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-start sm:items-center flex-col sm:flex-row sm:justify-between gap-4">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-200">
                            <span className="text-blue-700 font-semibold text-lg">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                            user.is_active ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center gap-3">
                            <h4 className="text-sm font-semibold text-gray-900">{user.name}</h4>
                            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                              user.is_active 
                                ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' 
                                : 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10'
                            }`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3.5 w-3.5" />
                              <span>{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-1.5">
                                <Phone className="h-3.5 w-3.5" />
                                <span>{user.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${roleStyles.containerClass}`}>
                          <RoleIcon className="h-3.5 w-3.5" />
                          {user.role}
                        </div>
                        <button
                          onClick={() => handleEditUser({
                            ...user,
                            role: user.role.toUpperCase() as "ADMINISTRATEUR" | "MODERATEUR",
                          })}
                          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}
    </>
  );
};

export default UsersList;