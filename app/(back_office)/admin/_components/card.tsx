import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <span className="ml-2 text-sm font-medium text-gray-500">total</span>
          </div>
        </div>
      </div>
    </div>
  );
};