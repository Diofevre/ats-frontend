'use client'

import React from 'react'
import { Search, MapPin, Briefcase, Calendar, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import { mockJobs } from '@/lib/front_office/constants'

const OffresLists = () => {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const sidebarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-12"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Offres d&apos;emploi en vedette
            </h1>
            <p className="text-lg">
              Trouvez l&apos;opportunité de carrière idéale parmi 10 000 offres d&apos;emploi.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="space-y-6"
          >
            {mockJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 rounded-[12px]">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="space-y-4">
                        <div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge variant="secondary" className="mb-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
                              {job.category}
                            </Badge>
                          </motion.div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {job.title}
                          </h3>
                          <div className="text-lg font-medium text-blue-600">
                            {job.salary}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div 
                            whileHover={{ x: 5 }}
                            className="flex items-center text-gray-600"
                          >
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {job.location}
                          </motion.div>
                          <motion.div 
                            whileHover={{ x: 5 }}
                            className="flex items-center text-gray-600"
                          >
                            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                            {job.type}
                          </motion.div>
                          <motion.div 
                            whileHover={{ x: 5 }}
                            className="flex items-center text-gray-600"
                          >
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {job.date}
                          </motion.div>
                          <motion.div 
                            whileHover={{ x: 5 }}
                            className="flex items-center text-gray-600"
                          >
                            <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                            {job.company}
                          </motion.div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-3 md:min-w-[140px]">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-[12px] w-full h-10"
                            onClick={() => router.push(`/offres-lists/${job.id}/postuler`)}
                          >
                            Postuler
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outline" 
                            className="flex-1 rounded-[12px] w-full h-10"
                            onClick={() => router.push(`/offres-lists/${job.id}`)}
                          >
                            Détails
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Search Sidebar */}
        <motion.div 
          variants={sidebarVariants}
          className="lg:col-span-1"
        >
          <div className="sticky top-4">
            <Card className="shadow-md rounded-[12px]">
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
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      placeholder="Titre du poste, entreprise..."
                      className="pl-10 h-12"
                    />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      type="text"
                      placeholder="Ville ou région"
                      className="pl-10 h-12"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-[12px] h-12">
                      Rechercher
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default OffresLists;