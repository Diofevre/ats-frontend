/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  Sparkles,
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
import Nothings from "../nothings";

const searchSchema = z.object({
  text: z.string().nullable().default(null),
  pays: z.string().nullable().default(null),
  type_emploi: z.string().nullable().default(null),
});

type SearchFormData = z.infer<typeof searchSchema>;

const Hero = () => {
  const [filters, setFilters] = useState<OffreFilters>({
    text: undefined,
    pays: undefined,
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
      text: null,
      pays: null,
      type_emploi: null,
    },
  });

  const onSubmit = (data: SearchFormData) => {
    const text: string | undefined = data.text ?? undefined;
    const pays: string | undefined = data.pays ?? undefined;
    const type_emploi: string | undefined = data.type_emploi ?? undefined;
    setFilters({
      text,
      pays,
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
      className="container mx-auto py-16 md:py-28">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-white">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Nouvelles opportunités</span>
          </div>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Rejoignez notre équipe et{" "}
            <motion.span
              initial={{ color: "#FFFFFF" }}
              animate={{ color: ["#FFFFFF", "#E2E8F0", "#FFFFFF"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block">
              développez
            </motion.span>{" "}
            votre potentiel
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-white/80">
            Trouvez l&apos;opportunité qui vous correspond et construisez votre
            avenir professionnel avec nous.
          </motion.p>
          <Link href="/offres-lists">
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-[12px] mt-8 px-8 h-12 bg-white text-black/80 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transform transition-all">
              Voir Plus +
            </motion.button>
          </Link>
        </motion.div>
        <motion.div variants={scaleIn} className="hidden md:block relative">
          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-3xl opacity-20"></div>
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Équipe au travail"
            className="rounded-3xl shadow-2xl relative z-10"
          />
        </motion.div>
      </div>

      <motion.div
        variants={fadeInUp}
        className="mt-24 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-4 gap-4 items-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
              size={20}
            />
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Titre du poste"
                  className="w-full pl-10 pr-4 h-12 bg-white/10 border-white/20 rounded-xl text-white placeholder:text-white/80 focus:border-transparent"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              )}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 z-10"
              size={20}
            />
            <Controller
              name="pays"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}>
                  <SelectTrigger className="w-full pl-10 h-12 bg-white/10 border-white/20 rounded-xl text-white">
                    <SelectValue placeholder="Toutes les emplacements" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#4BB3DA] border-white/20 text-white">
                    <SelectItem value="All">Tout</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Madagascar">Madagascar</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative flex items-center">
            <Briefcase
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 z-10"
              size={20}
            />
            <Controller
              name="type_emploi"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}>
                  <SelectTrigger className="w-full pl-10 h-12 bg-white/10 border-white/20 rounded-xl text-white">
                    <SelectValue placeholder="Type d'emplois" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#4BB3DA] border-white/20 text-white">
                    <SelectItem value="All">Tout</SelectItem>
                    <SelectItem value="CDI">CDI</SelectItem>
                    <SelectItem value="CDD">CDD</SelectItem>
                    <SelectItem value="STAGE">Stage</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center">
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-white text-black/80 hover:bg-white/90 transition-all">
              Rechercher
            </Button>
          </motion.div>
        </form>
      </motion.div>

      <motion.div variants={staggerChildren} className="mt-12 space-y-4">
        {!hasSearched ? (
          <>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-center text-white/60">
              Faites une recherche pour voir les offres disponibles
            </p>
          </>
          
        ) : isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : mockJobs && mockJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {mockJobs.map((job: OffreType) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}>
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                      <div className="flex-1 space-y-4">
                        <div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}>
                            <Badge
                              variant="secondary"
                              className="mb-2 bg-white/20 text-white hover:bg-white/30">
                              {job.status}
                            </Badge>
                          </motion.div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {job.titre}
                          </h3>
                          <div className="text-lg font-medium text-white">
                            {`${job.salaire} ${job.devise}`}
                          </div>
                          <p className="text-sm text-white/80">
                            {job.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center text-white/80">
                            <MapPin className="h-5 w-5 mr-2 text-white/60 flex-shrink-0" />
                            {`${job.lieu}, ${job.pays}`}
                          </motion.div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center text-white/80">
                            <Briefcase className="h-5 w-5 mr-2 text-white/60 flex-shrink-0" />
                            {job.type_emploi}
                          </motion.div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center text-white/80">
                            <Calendar className="h-5 w-5 mr-2 text-white/60 flex-shrink-0" />
                            {job.created_at ? new Date(job.created_at).toLocaleDateString() : "Date non disponible"}
                          </motion.div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center text-white/80 col-span-2">
                            <Users className="h-5 w-5 mr-2 text-white/60 flex-shrink-0" />
                            {`${job.nombre_requis} poste(s)`}
                          </motion.div>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-3 md:min-w-[140px]">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}>
                          <Link href={`/offres-lists/${job.id}/postuler`}>
                            <Button className="flex-1 bg-white text-black hover:bg-white/90 rounded-xl w-full h-10">
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
                              className="flex-1 border-white/20 text-black hover:bg-white/10 rounded-xl w-full h-10">
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
          <Nothings 
            title="Offre(s)"
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Hero;