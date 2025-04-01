'use client'

import React, { useState } from 'react';
import { Loader2, Plus, Search, X } from 'lucide-react';
import { CreateProcessusDto, ProcessusType } from '@/lib/types/processus-admin/processus-admin';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOffres } from '@/hooks/use-offre';

interface ProcessusFormProps {
  onSubmit: (data: CreateProcessusDto) => Promise<void>;
  onCancel: () => void;
}

export const ProcessusForm: React.FC<ProcessusFormProps> = ({ onSubmit, onCancel }) => {
  const { offres, isLoading: offresLoading } = useOffres();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateProcessusDto>({
    offre_id: '',
    titre: '',
    type: 'QUESTIONNAIRE',
    description: '',
    duree: 60,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  const selectedOffer = offres?.find(offre => offre.id.toString() === formData.offre_id);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl relative">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-[#1E1F22]">Nouveau Processus</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              id="titre"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent transition-shadow"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Offre
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between px-4 py-2.5 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent transition-shadow"
                  disabled={loading || offresLoading}
                >
                  {selectedOffer ? selectedOffer.titre : "Sélectionner une offre..."}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-[calc(100vw-4rem)] sm:w-[30rem] p-0" 
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <Command>
                  <CommandInput 
                    placeholder="Rechercher une offre..." 
                    className="h-12 text-base"
                  />
                  <CommandEmpty className="py-6 text-sm text-gray-500 text-center">
                    Aucune offre trouvée.
                  </CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-auto p-2">
                    {offres?.map((offre) => (
                      <CommandItem
                        key={offre.id}
                        value={offre.titre}
                        onSelect={() => {
                          setFormData({ ...formData, offre_id: offre.id.toString() });
                          setOpen(false);
                        }}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                      >
                        <span className={cn(
                          "flex w-full truncate text-base",
                          formData.offre_id === offre.id.toString() && "font-medium"
                        )}>
                          {offre.titre}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ProcessusType })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent transition-shadow"
              disabled={loading}
            >
              <option value="VISIO_CONFERENCE">Visioconférence</option>
              <option value="QUIZ">Quiz</option>
              <option value="EXERCICE">Exercice</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent transition-shadow resize-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="duree" className="block text-sm font-medium text-gray-700 mb-1">
              Durée (minutes)
            </label>
            <input
              type="number"
              id="duree"
              value={formData.duree}
              onChange={(e) => setFormData({ ...formData, duree: parseInt(e.target.value) })}
              min="1"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#1E1F22] focus:border-transparent transition-shadow"
              required
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[12px] hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-5 py-2.5 bg-[#1E1F22] text-white rounded-[12px] hover:bg-[#313338] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className='flex items-center gap-2'>
                  <Plus className='w-5 h-5' />
                  Créer
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};