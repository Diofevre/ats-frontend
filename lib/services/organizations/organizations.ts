import type {
  Organization,
  CreateOrganizationDto,
  UpdateOrganizationDto,
  OrganizationUser,
  OrganizationOffre,
} from '@/lib/types/organization/organizations.type';
import api from '../api';
import { PostCariere } from '@/lib/types/postcarieres';


export const OrganizationService = {
  getAll: async (): Promise<Organization[]> => {
    const { data } = await api.get('/api/organisations');
    return data;
  },

  getById: async (id: number): Promise<Organization> => {
    const { data } = await api.get(`/api/organisations/${id}`);
    return data;
  },

  create: async (organization: CreateOrganizationDto): Promise<Organization> => {
    const { data } = await api.post('/api/organisations', organization);
    return data;
  },

  update: async (id: number, organization: UpdateOrganizationDto): Promise<Organization> => {
    const { data } = await api.put(`/api/organisations/${id}`, organization);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/organisations/${id}`);
  },

  getOffres: async (id: number): Promise<OrganizationOffre[]> => {
    const { data } = await api.get(`/api/organisations/${id}/offres`);
    return data;
  },

  getPostCarieres: async (id: number): Promise<PostCariere[]> => {
    const { data } = await api.get(`/api/organisations/${id}/postcarieres`);
    return data;
  },

  getUsers: async (id: number): Promise<OrganizationUser[]> => {
    const { data } = await api.get(`/api/organisations/${id}/users`);
    return data;
  },
};