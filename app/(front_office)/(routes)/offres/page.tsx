'use client'

import React from 'react'
import { Search, MapPin, Briefcase, Calendar, Building2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import { mockJobs } from '@/lib/front_office/constants'

const Offres = () => {
  const router = useRouter()

  return (
    <div className="py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Offres d&apos;emploi en vedette
            </h1>
            <p className="text-lg text-gray-600">
              Trouvez l&apos;opportunité de carrière idéale parmi 10 000 offres d&apos;emploi.
            </p>
          </div>

          <div className="space-y-6">
            {mockJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="space-y-4">
                      <div>
                        <Badge variant="secondary" className="mb-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {job.category}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <div className="text-lg font-medium text-blue-600">
                          {job.salary}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {job.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                          {job.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-3 md:min-w-[140px]">
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-[12px]"
                        onClick={() => router.push(`/offres/${job.id}/postuler`)}
                      >
                        Postuler
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 rounded-[12px]"
                        onClick={() => router.push(`/offres/${job.id}`)}
                      >
                        Détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Card className="shadow-md">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Rechercher un emploi
                  </h2>
                  <p className="text-sm text-gray-600">
                    Affinez votre recherche pour trouver le poste idéal
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      placeholder="Titre du poste, entreprise..."
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      placeholder="Ville ou région"
                      className="pl-10"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-[12px]">
                    Rechercher
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offres