import React from 'react'

const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex items-start space-x-6">
        <div className="w-24 h-24 bg-gray-100 rounded-lg"></div>
        <div className="space-y-3 flex-1">
          <div className="h-6 bg-gray-100 rounded w-48"></div>
          <div className="h-4 bg-gray-100 rounded w-32"></div>
        </div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-100 rounded w-24"></div>
              <div className="h-5 bg-gray-100 rounded w-48"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileSkeleton