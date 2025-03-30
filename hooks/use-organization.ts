'use client'

import useSWR from 'swr';
import type {
  Organization,
  CreateOrganizationDto,
  UpdateOrganizationDto,
  OrganizationUser,
  OrganizationOffre,
} from '@/lib/types/organization/organizations.type';
import { OrganizationService } from '@/lib/services/organizations/organizations';
import { PostCariere } from '@/lib/types/postcarieres';

// Define fetcher types
type Fetcher<T> = (url: string) => Promise<T>;

// Create type-safe fetcher functions
const fetchOrganization: Fetcher<Organization | null> = async (url) => {
  const id = url.split('-')[1];
  return id ? await OrganizationService.getById(parseInt(id)) : null;
};

const fetchOrganizations: Fetcher<Organization[]> = async () => {
  return await OrganizationService.getAll();
};

const fetchUsers: Fetcher<OrganizationUser[] | null> = async (url) => {
  const id = url.split('-')[1];
  return id ? await OrganizationService.getUsers(parseInt(id)) : null;
};

const fetchOffres: Fetcher<OrganizationOffre[] | null> = async (url) => {
  const id = url.split('-')[1];
  return id ? await OrganizationService.getOffres(parseInt(id)) : null;
};

const fetchPostCarieres: Fetcher<PostCariere[] | null> = async (url) => {
  const id = url.split('-')[1];
  return id ? await OrganizationService.getPostCarieres(parseInt(id)) : null;
};

export function useOrganization(id?: number) {
  const {
    data: organization,
    error: organizationError,
    mutate: mutateOrganization,
  } = useSWR<Organization | null>(
    id ? `organization-${id}` : null,
    fetchOrganization
  );

  const {
    data: organizations,
    error: organizationsError,
    mutate: mutateOrganizations,
  } = useSWR<Organization[]>('organizations', fetchOrganizations);

  const {
    data: users,
    error: usersError,
    mutate: mutateUsers,
  } = useSWR<OrganizationUser[] | null>(
    id ? `organization-${id}-users` : null,
    fetchUsers
  );

  const {
    data: offres,
    error: offresError,
    mutate: mutateOffres,
  } = useSWR<OrganizationOffre[] | null>(
    id ? `organization-${id}-offres` : null,
    fetchOffres
  );

  const {
    data: postCarieres,
    error: postCarieresError,
    mutate: mutatePostCarieres,
  } = useSWR<PostCariere[] | null>(
    id ? `organization-${id}-postcarieres` : null,
    fetchPostCarieres
  );

  const createOrganization = async (data: CreateOrganizationDto) => {
    const newOrganization = await OrganizationService.create(data);
    await mutateOrganizations((prev) => [...(prev || []), newOrganization]);
    return newOrganization;
  };

  const updateOrganization = async (organizationId: number, data: UpdateOrganizationDto) => {
    const updatedOrganization = await OrganizationService.update(organizationId, data);
    await mutateOrganization();
    await mutateOrganizations((prev) =>
      prev?.map((org) => (org.id === organizationId ? updatedOrganization : org))
    );
    return updatedOrganization;
  };

  const deleteOrganization = async (organizationId: number) => {
    await OrganizationService.delete(organizationId);
    await mutateOrganizations((prev) => prev?.filter((org) => org.id !== organizationId));
  };

  return {
    // Single organization data and operations
    organization,
    isLoading: id ? !organizationError && !organization : false,
    isError: organizationError,
    updateOrganization,
    deleteOrganization,

    // List of organizations
    organizations,
    isLoadingOrganizations: !organizationsError && !organizations,
    isErrorOrganizations: organizationsError,
    createOrganization,

    // Related data
    users,
    isLoadingUsers: id ? !usersError && !users : false,
    isErrorUsers: usersError,

    offres,
    isLoadingOffres: id ? !offresError && !offres : false,
    isErrorOffres: offresError,

    postCarieres,
    isLoadingPostCarieres: id ? !postCarieresError && !postCarieres : false,
    isErrorPostCarieres: postCarieresError,

    // Mutate functions for manual updates
    mutateOrganization,
    mutateOrganizations,
    mutateUsers,
    mutateOffres,
    mutatePostCarieres,
  };
}