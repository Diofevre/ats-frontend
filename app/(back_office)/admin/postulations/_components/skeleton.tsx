import React from 'react';

export const ProcessusSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className="bg-white rounded-lg p-5 border border-gray-200 h-full"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-md"></div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-gray-100 rounded w-2/5"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                </div>
                <div className="w-20 h-6 bg-gray-100 rounded-full"></div>
              </div>
              <div className="flex gap-4 pt-2">
                <div className="h-4 bg-gray-100 rounded w-24"></div>
                <div className="h-4 bg-gray-100 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};