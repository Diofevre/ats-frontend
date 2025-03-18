'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Briefcase, MapPin, Calendar, Upload } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { mockJobs } from '@/lib/front_office/constants'

const ApplicationForm = () => {
  const params = useParams()
  const router = useRouter()
  const job = mockJobs.find(job => job.id === Number(params.id))

  if (!job) {
    return <div>Offre non trouvée</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 rounded-[12px]">
      <div className="container mx-auto py-8 px-4">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux offres
        </button>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Job Header */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center space-x-2 text-blue-600 text-sm font-medium mb-4">
              <Briefcase className="h-4 w-4" />
              <span>Offre d&apos;emploi</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {job.title}
            </h1>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Localisation</p>
                  <p className="text-sm">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Type de poste</p>
                  <p className="text-sm">{job.type}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Date de début</p>
                  <p className="text-sm">{job.startDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Comment avez-vous découvert cette opportunité ?</h2>
                  <p className="text-sm text-gray-500 mb-4">Aidez-nous à comprendre votre parcours</p>
                  <Select>
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue placeholder="Sélectionnez une option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="website">Site web de l&apos;entreprise</SelectItem>
                      <SelectItem value="referral">Recommandation</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations personnelles</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700">Nom</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Votre nom" 
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700">Prénoms</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Vos prénoms" 
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700">Courriel</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="votre@email.com" 
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700">Téléphone</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+33 6 12 34 56 78" 
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Documents</h2>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="cv" className="text-gray-700 mb-2 block">CV (PDF, DOC ou DOCX)</Label>
                      <div className="mt-2">
                        <label htmlFor="cv" className="relative block group">
                          <div className="flex items-center justify-center w-full px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="space-y-1 text-center">
                              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                              <div className="text-sm text-gray-600">
                                <span className="font-semibold text-blue-600">Cliquez pour télécharger</span> ou glissez-déposez
                              </div>
                              <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max. 5MB)</p>
                            </div>
                          </div>
                          <Input 
                            id="cv" 
                            type="file" 
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="coverLetter" className="text-gray-700">Lettre de motivation (optionnel)</Label>
                      <Textarea 
                        id="coverLetter" 
                        placeholder="Votre lettre de motivation..."
                        className="mt-2 h-32 resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="motivation" className="text-gray-700">Pourquoi souhaitez-vous rejoindre notre équipe ? (optionnel)</Label>
                      <Textarea 
                        id="motivation" 
                        placeholder="Partagez vos motivations..."
                        className="mt-2 h-32 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t flex lg:flex-row flex-col">
                  <div className="flex items-center mb-8 space-x-2">
                    <Label htmlFor="privacy" className="text-sm text-gray-500">
                      En soumettant ce formulaire, j&apos;accepte que mes informations soient traitées conformément à la politique de confidentialité.
                    </Label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button 
                      variant="outline" 
                      className="px-6 rounded-[12px]"
                      onClick={() => router.back()}
                    >
                      Annuler
                    </Button>
                    <Button className="px-6 bg-blue-600 hover:bg-blue-700 rounded-[12px]">
                      Soumettre ma candidature
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm