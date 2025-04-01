import { ProcessusByType } from '@/lib/types/dashbaord-by-organisation';
import React from 'react';

interface ProcessusChartProps {
  data: ProcessusByType;
  total: number;
}

export const ProcessusChart: React.FC<ProcessusChartProps> = ({ data, total }) => {
  const getPercentage = (value: number) => ((value / total) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Distribution des Processus</h3>
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize">{key}</span>
              <span>{getPercentage(value)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${getPercentage(value)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};