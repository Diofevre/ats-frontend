"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OffreFilters, useAllOffres } from "@/lib/services/offres/offres";
import { OffreType } from "@/lib/types/offres/offres.type";
import Link from "next/link";

// Schéma Zod pour le formulaire de recherche
const searchSchema = z.object({
  titre: z.string().nullable().default(null),
  lieu: z.string().nullable().default(null),
  type_emploi: z.string().nullable().default(null),
});

type SearchFormData = z.infer<typeof searchSchema>;

const Hero = () => {
  const [filters, setFilters] = useState<OffreFilters>({
    titre: undefined,
    lieu: undefined,
    type_emploi: undefined,
  });

  const [hasSearched, setHasSearched] = useState(false);

  const { mockJobs, isLoading } = useAllOffres(filters);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      titre: null,
      lieu: null,
      type_emploi: null,
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const titre: string | undefined = data.titre ?? undefined;
    const lieu: string | undefined = data.lieu ?? undefined;
    const type_emploi: string | undefined = data.type_emploi ?? undefined;
    setFilters({
      titre,
      lieu,
      type_emploi,
    });
    setHasSearched(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="py-12">
      <div className="grid  md:grid-cols-2 gap-8 items-center">
        <motion.div variants={fadeInUp} className="space-y-6">
          <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Rejoignez notre équipe et{" "}
            <motion.span
              initial={{ color: "#4AC9B5" }}
              animate={{ color: ["#4AC9B5", "#3DB4A2", "#4AC9B5"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block">
              développez
            </motion.span>{" "}
            votre potentiel
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-white">
            Trouvez l&apos;opportunité qui vous correspond et construisez votre
            avenir professionnel avec nous.
          </motion.p>
          <Link href={"/offres-lists"}>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-[24px] px-8 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transform transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30">
              Voir nos offres d&apos;emploi
            </motion.button>
          </Link>
        </motion.div>
        <motion.div variants={scaleIn} className="hidden md:block">
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
        className="mt-24 bg-white p-8 rounded-[12px] border">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-4 gap-4 items-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center">
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
                  placeholder="Titre du poste"
                  className="w-full pl-10 pr-4 h-12 border rounded-lg focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              )}
            />
            {errors.titre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.titre.message}
              </p>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" // Centrage précis
              size={20}
            />
            <Controller
              name="lieu"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}>
                  <SelectTrigger className="w-full pl-10 pr-4 h-12 border rounded-lg focus:ring-0 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Toutes les emplacements" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paris">Paris</SelectItem>
                    <SelectItem value="Lyon">Lyon</SelectItem>
                    <SelectItem value="Marseille">Marseille</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.lieu && (
              <p className="text-red-500 text-sm mt-1">{errors.lieu.message}</p>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center">
            <Briefcase
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" // Centrage précis
              size={20}
            />
            <Controller
              name="type_emploi"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}>
                  <SelectTrigger className="w-full pl-10 pr-4 h-12 border rounded-lg focus:ring-0 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Type d'emplois" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdi">CDI</SelectItem>
                    <SelectItem value="cdd">CDD</SelectItem>
                    <SelectItem value="stage">Stage</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type_emploi && (
              <p className="text-red-500 text-sm mt-1">
                {errors.type_emploi.message}
              </p>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center" // Ajout pour aligner le bouton
          >
            <Button
              type="submit"
              className="w-full h-12 rounded-[12px] px-6 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 font-semibold shadow-xl shadow-cyan-500/20 transition-all">
              Valider
            </Button>
          </motion.div>
        </form>
      </motion.div>
      <motion.div variants={staggerChildren} className="mt-6 space-y-4">
        {!hasSearched ? (
          <p className="text-center text-gray-600">
            Faites une recherche pour voir les offres.
          </p>
        ) : isLoading ? (
          <p className="text-center text-gray-600">Chargement des offres...</p>
        ) : mockJobs && mockJobs.length > 0 ? (
          <div className="grid grid-cols-2 gap-8">
            {mockJobs.map((job: OffreType) => (
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
                            {new Date(job.created_at).toLocaleDateString()}
                          </motion.div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {`${job.horaire_ouverture} - ${job.horaire_fermeture}`}
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
          </div>
        ) : (
          <p className="text-center text-gray-600">Aucune offre trouvée.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Hero;
