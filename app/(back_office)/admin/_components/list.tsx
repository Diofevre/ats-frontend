import React from 'react';

interface TopListProps {
  title: string;
  items: Array<{
    name?: string;
    title?: string;
    count: number;
  }>;
  countLabel: string;
}

export const TopList = ({ title, items, countLabel }: TopListProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100">
        {title}
      </h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center cursor-pointer justify-between group hover:bg-gray-50 -mx-6 px-6 py-2 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-200">
                {item.name || item.title}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-semibold text-gray-700">
                {item.count}
              </span>
              <span className="text-sm text-gray-500">
                {countLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};