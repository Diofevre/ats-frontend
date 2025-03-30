import React from 'react'

const ProcessusSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-100 rounded-md w-1/3 animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-100 rounded-full animate-pulse"></div>
        </div>
        
        {/* Content */}
        <div className="space-y-3 pt-4">
          <div className="h-4 bg-gray-100 rounded-md w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded-md w-4/6 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded-md w-3/6 animate-pulse"></div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-6">
          <div className="h-4 bg-gray-100 rounded-md w-1/4 animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-20 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessusSkeleton