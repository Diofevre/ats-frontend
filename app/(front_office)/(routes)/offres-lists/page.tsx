"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  Frown,
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OffreFilters, useAllOffres } from "@/lib/services/offres/offres";
import { OffreType } from "@/lib/types/offres/offres.type";
import JobListSkeleton from "@/components/offres/jobCardSkeleton";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const searchSchema = z.object({
  titre: z.string().nullable().default(null),
  pays: z.string().nullable().default(null),
});

type SearchFormData = z.infer<typeof searchSchema>;

const NoJobsFound: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center py-12">
    <Frown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Aucune offre trouvée
    </h3>
    <p className="text-gray-600">
      Essayez d&apos;ajuster vos critères de recherche pour trouver des
      opportunités.
    </p>
  </motion.div>
);

const OffresLists = () => {
  const [filters, setFilters] = useState<OffreFilters>({
    text: undefined,
    pays: undefined,
  });

  const { mockJobs, isLoading } = useAllOffres(filters);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      titre: null,
      pays: null,
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const text: string | undefined = data.titre ?? undefined;
    const pays: string | undefined = data.pays ?? undefined;
    setFilters({ text, pays });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Offres d&apos;emploi en vedette
            </h1>
            <p className="text-lg">
              Trouvez l&apos;opportunité de carrière idéale parmi 10 000 offres
              d&apos;emploi.
            </p>
          </motion.div>

          {isLoading ? (
            <JobListSkeleton />
          ) : Array.isArray(mockJobs) && mockJobs.length === 0 ? (
            <NoJobsFound />
          ) : (
            <motion.div variants={containerVariants} className="space-y-6">
              {mockJobs?.map((job: OffreType) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}>
                  <Card className="hover:shadow-xl transition-all duration-300 rounded-[12px]">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div className="space-y-4">
                          <div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}>
                              <Badge
                                variant="secondary"
                                className="mb-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
                                {job.status}
                              </Badge>
                            </motion.div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {job.titre}
                            </h3>
                            <div className="text-lg font-medium text-blue-600">
                              {`${job.salaire} ${job.devise}`}
                            </div>
                            <p className="text-sm text-gray-600">
                              {job.description}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              {`${job.lieu}, ${job.pays}`}
                            </motion.div>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center text-gray-600">
                              <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                              {job.type_emploi}
                            </motion.div>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              {job.created_at ? new Date(job.created_at).toLocaleDateString() : "Date inconnue"}
                            </motion.div>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center text-gray-600">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              {`${job.nombre_requis} poste(s)`}
                            </motion.div>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-3 md:min-w-[140px]">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            <Link href={`/offres-lists/${job.id}/postuler`}>
                              <Button className="flex-1 bg-blue-600/90 hover:bg-blue-700 rounded-[12px] w-full h-10">
                                Postuler
                              </Button>
                            </Link>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            <Link
                              href={`/offres-lists/${encodeURIComponent(
                                JSON.stringify(job?.id)
                              )}/details`}
                              className="outline-none">
                              <Button
                                variant="outline"
                                className="flex-1 rounded-[12px] w-full h-10">
                                Détails
                              </Button>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Search Sidebar */}
        <motion.div variants={sidebarVariants} className="lg:col-span-1">
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Controller
                      name="titre"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Titre du poste, entreprise..."
                          className="pl-10 h-12"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      )}
                    />
                    {errors.titre && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.titre.message}
                      </p>
                    )}
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Controller
                      name="pays"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="text"
                          placeholder="Ville ou région"
                          className="pl-10 h-12"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      )}
                    />
                    {errors.pays && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pays.message}
                      </p>
                    )}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600/90 hover:bg-blue-700 rounded-[12px] h-12">
                      Rechercher
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OffresLists;
