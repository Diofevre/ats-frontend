import React from 'react';
import { Calendar } from 'lucide-react';
import { Offre } from '@/lib/types/dashbaord-by-organisation';

interface OffresListProps {
  title: string;
  offres: Offre[];
  showPostulations?: boolean;
}

export const OffresList: React.FC<OffresListProps> = ({ title, offres, showPostulations }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {offres.map((offre) => (
          <div key={offre.id} className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{offre.titre}</h4>
              {offre.createdAt && (
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(offre.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
            {showPostulations && (
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                {offre.postulationCount} postulations
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};