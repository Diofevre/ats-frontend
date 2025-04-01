import { Search } from 'lucide-react'
import React from 'react'

interface Props {
  title: string
}

const Nothings = ({ title } : Props) => {
  return (
    <div className="px-6 py-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">Aucun {title} correspondant</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
        Essayez d&apos;ajuster votre requête de recherche ou vos filtres pour trouver ce que vous cherchez.
      </p>
    </div>
  )
}

export default Nothings
