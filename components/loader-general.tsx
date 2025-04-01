import React from 'react'

const LoaderGeneral = () => {
  return (
    <div className="min-h-screen bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="animate-pulse text-gray-600">
        <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

export default LoaderGeneral