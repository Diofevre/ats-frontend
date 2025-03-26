'use client'

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateOffreDto, Devise, Offre, Status } from '@/lib/types/offres/offres.type';
import React from 'react';

interface OffreFormProps {
  initialData?: Offre;
  onSubmit: (data: CreateOffreDto) => Promise<void>;
  onCancel: () => void;
}

export function OffreForm({ initialData, onSubmit, onCancel }: OffreFormProps) {
  const [formData, setFormData] = React.useState<CreateOffreDto>({
    titre: initialData?.titre || '',
    description: initialData?.description || '',
    date_limite: initialData?.date_limite?.split('T')[0] || '',
    status: initialData?.status || 'OUVERT',
    nombre_requis: initialData?.nombre_requis || 1,
    lieu: initialData?.lieu || '',
    pays: initialData?.pays || '',
    type_emploi: initialData?.type_emploi || '',
    salaire: initialData?.salaire || '',
    devise: initialData?.devise || 'EURO',
    horaire_ouverture: initialData?.horaire_ouverture || '09:00:00',
    horaire_fermeture: initialData?.horaire_fermeture || '17:00:00',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const devises: Devise[] = ['EURO', 'DOLLAR', 'DOLLAR_CANADIEN', 'LIVRE', 'YEN', 'ROUPIE', 'ARIARY'];
  const statuses: Status[] = ['OUVERT', 'FERME'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <Input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date limite</label>
            <Input
              type="date"
              name="date_limite"
              value={formData.date_limite}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 h-12 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre requis</label>
            <Input
              type="number"
              name="nombre_requis"
              value={formData.nombre_requis}
              onChange={handleChange}
              min="1"
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lieu</label>
            <Input
              type="text"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pays</label>
            <Input
              type="text"
              name="pays"
              value={formData.pays}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type d&apos;emploi</label>
            <Input
              type="text"
              name="type_emploi"
              value={formData.type_emploi}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Salaire</label>
            <Input
              type="text"
              name="salaire"
              value={formData.salaire}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor='devise' className="block text-sm font-medium text-gray-700">Devise</label>
            <select
              id='devise'
              name="devise"
              value={formData.devise}
              onChange={handleChange}
              required
              className="mt-1 h-12 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {devises.map(devise => (
                <option key={devise} value={devise}>{devise}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Horaire d&apos;ouverture</label>
            <Input
              type="time"
              name="horaire_ouverture"
              value={formData.horaire_ouverture.slice(0, 5)}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Horaire de fermeture</label>
            <Input
              type="time"
              name="horaire_fermeture"
              value={formData.horaire_fermeture.slice(0, 5)}
              onChange={handleChange}
              required
              className="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[12px] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-[#2C9CC6] border border-transparent rounded-[12px] hover:bg-[#2C9CC6]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
}