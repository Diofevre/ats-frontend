import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="group animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]"></div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-6 w-48 bg-gray-200 rounded"></div>
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton;