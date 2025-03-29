'use client'

import React from 'react';
import { Video, FileQuestion, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Processus } from '@/lib/types/processus/processus';

interface ProcessusCardProps {
  processus: Processus;
  onClick?: () => void;
}

const statusConfig = {
  'A_VENIR': {
    color: 'bg-amber-50 text-amber-700 border border-amber-200',
    label: 'À venir'
  },
  'EN_COURS': {
    color: 'bg-blue-50 text-blue-700 border border-blue-200',
    label: 'En cours'
  },
  'TERMINE': {
    color: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    label: 'Terminé'
  },
};

export const ProcessusCard: React.FC<ProcessusCardProps> = ({ processus, onClick }) => {
  const icon = processus.type === 'VISIO_CONFERENCE' ? Video : FileQuestion;
  const status = statusConfig[processus.statut];

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-lg p-5 border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer h-full"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-gray-50 rounded-md group-hover:bg-gray-100 transition-colors">
            {React.createElement(icon, { 
              className: "w-5 h-5 text-gray-700" 
            })}
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-gray-900 leading-tight">
              {processus.titre}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {processus.description}
            </p>
          </div>
        </div>
        <span className={cn(
          'px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap',
          status.color
        )}>
          {status.label}
        </span>
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{processus.duree} min</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{new Date(processus.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};