/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="py-12"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          variants={fadeInUp}
          className="space-y-6"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Rejoignez notre équipe et{' '}
            <motion.span
              initial={{ color: '#4AC9B5' }}
              animate={{ color: ['#4AC9B5', '#3DB4A2', '#4AC9B5'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className='inline-block'
            >
              développez
            </motion.span>{' '}
            votre potentiel
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-white"
          >
            Trouvez l&apos;opportunité qui vous correspond et construisez votre avenir professionnel avec nous.
          </motion.p>
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/offres')}
            className="bg-[#D24848] text-white px-8 py-2.5 rounded-[12px] text-sm hover:bg-[#D24848] transition-colors"
          >
            Voir nos offres d&apos;emploi
          </motion.button>
        </motion.div>
        <motion.div
          variants={scaleIn}
          className="hidden md:block"
        >
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Équipe au travail"
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
      
      <motion.div
        variants={fadeInUp}
        className="mt-24 bg-white p-8 rounded-[12px] border"
      >
        <div className="grid md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center"
          >
            <Search className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Titre du poste"
              className="w-full pl-10 h-12 pr-4 border rounded-lg focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center"
          >
            <MapPin className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
            <Select>
              <SelectTrigger className="w-full pl-10 pr-4 border rounded-lg h-12">
                <SelectValue placeholder="Toutes les emplacements" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="lyon">Lyon</SelectItem>
                <SelectItem value="marseille">Marseille</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <Briefcase className="absolute inset-y-0 left-3 my-auto text-gray-400" size={20} />
            <Select>
              <SelectTrigger className="w-full pl-10 pr-4 border rounded-lg h-12">
                <SelectValue placeholder="Type d'emplois" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cdi">CDI</SelectItem>
                <SelectItem value="cdd">CDD</SelectItem>
                <SelectItem value="stage">Stage</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition-colors h-12 w-full">
              Valider
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;