import React from 'react';
import { Video, FileQuestion, Clock, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { Processus } from '@/lib/types/processus/processus';

interface ProcessusCardProps {
  processus: Processus;
  onClick?: () => void;
}

const statusColors = {
  'A_VENIR': 'bg-yellow-100 text-yellow-800',
  'EN_COURS': 'bg-blue-100 text-blue-800',
  'TERMINE': 'bg-green-100 text-green-800',
};

export const ProcessusCard: React.FC<ProcessusCardProps> = ({ processus, onClick }) => {
  const icon = processus.type === 'VISIO_CONFERENCE' ? Video : FileQuestion;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            {React.createElement(icon, { className: "w-5 h-5 text-indigo-600" })}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{processus.titre}</h3>
            <p className="text-sm text-gray-500">{processus.description}</p>
          </div>
        </div>
        <span className={clsx(
          'px-2.5 py-0.5 rounded-full text-xs font-medium',
          statusColors[processus.statut]
        )}>
          {processus.statut.replace('_', ' ')}
        </span>
      </div>
      
      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {processus.duree} min
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(processus.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};