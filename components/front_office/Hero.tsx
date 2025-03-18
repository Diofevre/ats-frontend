/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Rejoignez notre équipe et <span className='text-[#4AC9B5]'>développez</span> votre potentiel
          </h1>
          <p className="text-lg text-gray-600">
            Trouvez l&apos;opportunité qui vous correspond et construisez votre avenir professionnel avec nous.
          </p>
          <button onClick={() => router.push('/offres')} className="bg-blue-600 text-white px-8 py-2.5 rounded-[12px] text-lg hover:bg-blue-700 transition-colors">
            Voir nos offres d&apos;emploi
          </button>
        </div>
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Équipe au travail"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
      
      {/* Filtres */}
      <div className="mt-12 bg-white p-6 rounded-lg border">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative flex items-center">
            <Search className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Titre du poste"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative flex items-center">
            <MapPin className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
            <Select>
              <SelectTrigger className="w-full pl-10 pr-4 border rounded-lg">
                <SelectValue placeholder="Toutes les emplacements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="lyon">Lyon</SelectItem>
                <SelectItem value="marseille">Marseille</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Briefcase className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
            <Select>
              <SelectTrigger className="w-full pl-10 pr-4 border rounded-lg">
                <SelectValue placeholder="Type d'emplois" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cdi">CDI</SelectItem>
                <SelectItem value="cdd">CDD</SelectItem>
                <SelectItem value="stage">Stage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Valider
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;